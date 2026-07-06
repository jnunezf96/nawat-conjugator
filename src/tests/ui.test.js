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
    const staticModesJson = JSON.parse(staticModes);
    const staticGroups = fs.readFileSync(path.resolve(__dirname, "..", "..", "data", "static_groups.json"), "utf8");
    const staticGroupsJson = JSON.parse(staticGroups);
    const rendering = fs.readFileSync(path.resolve(__dirname, "..", "ui", "rendering", "rendering.js"), "utf8");
    const composer = fs.readFileSync(path.resolve(__dirname, "..", "ui", "composer", "composer.js"), "utf8");
    const generationEngine = fs.readFileSync(path.resolve(__dirname, "..", "core", "generation", "engine.js"), "utf8");
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
    const formulaPanelStart = html.indexOf('id="panel-stack-pane-tense"');
    const formulaPanelEnd = html.indexOf("\n          </section>\n        </div>", formulaPanelStart);
    const formulaPanelHtml = formulaPanelStart >= 0 && formulaPanelEnd > formulaPanelStart
        ? html.slice(formulaPanelStart, formulaPanelEnd)
        : "";
    const entradaComposerCssStart = css.indexOf("/* #1 Entrada operation order: grouped by grammar band. */");
    const entradaComposerCssEnd = css.indexOf("/* Functional button scale", entradaComposerCssStart);
    const entradaComposerCss = entradaComposerCssStart >= 0 && entradaComposerCssEnd > entradaComposerCssStart
        ? css.slice(entradaComposerCssStart, entradaComposerCssEnd)
        : "";
    const makeAndrewsBlockRowAuditModel = (fields = {}, options = {}) => {
        const generationAllowed = fields.grammarGenerationAllowed === true
            || fields.grammarGenerationAllowed === "true";
        const resultOk = fields.grammarResultOk === true
            || fields.grammarResultOk === "true";
        const sourceFrame = {
            kind: "andrews-tense-block-output-row-audit-source-frame",
            version: 1,
            authorityFrame: {
                grammarAuthority: fields.grammarLogicAuthority || "",
                sourceContextTargetAuthority: fields.grammarSourceContextTargetAuthority || "",
                sourceEvidenceTargetAuthority: fields.grammarSourceEvidenceTargetAuthority || "",
            },
            routeContract: {
                routeFamily: fields.grammarRouteFamily || "",
                routeStage: fields.grammarRouteStage || "",
                generationAllowed,
            },
            orthographyFrame: {
                spellingEvidenceRole: fields.grammarSpellingEvidenceRole || "",
                classicalSpellingRole: fields.grammarClassicalSpellingRole || "",
                orthographyBoundary: fields.grammarOrthographyBoundary || "",
                spellingAuthority: fields.grammarSpellingAuthority || "",
                classicalSurfaceImport: fields.grammarClassicalSurfaceImport || "",
            },
            diagnosticFrame: {
                diagnosticId: fields.grammarDiagnosticId || "",
            },
            resultFrame: {
                ok: resultOk,
            },
        };
        const targetFrame = {
            kind: "andrews-tense-block-output-row-audit-target-frame",
            version: 1,
            grammarRouteFamily: sourceFrame.routeContract.routeFamily,
            grammarRouteStage: sourceFrame.routeContract.routeStage,
            grammarGenerationAllowed: String(sourceFrame.routeContract.generationAllowed === true),
            grammarDiagnosticId: sourceFrame.diagnosticFrame.diagnosticId,
            grammarLogicAuthority: sourceFrame.authorityFrame.grammarAuthority,
            grammarSpellingEvidenceRole: sourceFrame.orthographyFrame.spellingEvidenceRole,
            grammarClassicalSpellingRole: sourceFrame.orthographyFrame.classicalSpellingRole,
            grammarOrthographyBoundary: sourceFrame.orthographyFrame.orthographyBoundary,
            grammarSpellingAuthority: sourceFrame.orthographyFrame.spellingAuthority,
            grammarClassicalSurfaceImport: sourceFrame.orthographyFrame.classicalSurfaceImport,
            grammarResultOk: String(sourceFrame.resultFrame.ok === true),
            grammarSourceContextTargetAuthority: sourceFrame.authorityFrame.sourceContextTargetAuthority,
            grammarSourceEvidenceTargetAuthority: sourceFrame.authorityFrame.sourceEvidenceTargetAuthority,
            ...(options.targetOverrides || {}),
        };
        return {
            dataset: { ...(options.dataset || {}) },
            andrewsTenseBlockOutputRowAuditModel: {
                kind: "andrews-tense-block-output-row-audit-model",
                version: 1,
                sourceFrame,
                operationFrame: {
                    kind: "andrews-tense-block-output-row-audit-operation-frame",
                    version: 1,
                    status: options.operationStatus || "authorized",
                    operation: options.operation || "audit-output-row-from-grammar-frame",
                    sourceFrame,
                    targetFrame,
                },
                targetFrame,
            },
        };
    };

    s.ok(
        "ordinary NNC S control lives in the composer entry board tabs",
        tabsHtml.includes('id="verb-entry-board-ordinary-nnc"')
            && tabsHtml.includes('data-ordinary-nnc-mode="true"')
            && composer.includes("ordinaryNncModeButtons: document.querySelectorAll(\"[data-ordinary-nnc-mode]\")")
            && composer.includes("Array.from(ordinaryNncModeButtons || []).forEach")
            && composer.includes("const isActive = isComposer && ordinaryNncActive;")
            && tabsHtml.includes('class="verb-entry-board-tabs__main">Nominal</span>')
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
            && composer.includes('return getUiCopyLabel("composer-entry-board-label", "Tipo de cláusula");')
            && !composer.includes('suffixLabel ? `Verbalizar ${suffixLabel}` : "Verbalizar"')
            && composer.includes('function getVerbRegexPlaceholder()')
            && composer.includes('return "_";')
            && !composer.includes('return "ej. (siwa)t";')
            && composer.includes('stagePanel.dataset.operationBoard = board')
            && composer.includes('stagePanel.dataset.operationOrder = getComposerOperationOrderLabel(board)')
            && composer.includes('"Cláusula verbal: tablero -> valencia verbal -> direccional -> incorporado -> objeto 1/objeto 2 -> predicado base"')
            && composer.includes('"Cláusula nominal: entrada -> predicado base; salida -> pers1-pers2 -> conector num1-num2 -> referencia"')
            && composer.includes('"Verbalización nominal: tablero -> fuente nominal -> verbalización -> valencia verbal -> objeto 1/objeto 2 -> direccional"')
            && composer.includes('setComposerOperationSlotMetadata(directionalHost, "directional-prefix", 10)')
            && composer.includes('setComposerOperationSlotMetadata(embedField, "incorporated-prefix", 20)')
            && composer.includes('setComposerOperationSlotMetadata(objectPair, "object-valency", 30)')
            && composer.includes('setComposerOperationSlotMetadata(matrixField, "predicate-core", 40)')
            && composer.includes('setComposerOperationSlotMetadata(matrixField, "nnc-predicate", 10)')
            && !composer.includes('setComposerOperationSlotMetadata(classTabs, "nnc-num1-num2"')
            && composer.includes("const moveSlotContentChildren = (fromEl, toEl)")
            && composer.includes("const currentTopRow = Array.from(stagePanel.children)")
            && composer.includes('stagePanel.dataset.activeTransitivity = activeToken')
            && entradaComposerCss.includes("grid-template-areas:")
            && entradaComposerCss.includes('"entry"')
            && entradaComposerCss.includes('"source"')
            && entradaComposerCss.includes("justify-self: stretch;")
            && entradaComposerCss.includes("#container-inputs #composer-slot-stage > .verb-composer__top-row")
            && entradaComposerCss.includes("#container-inputs #composer-slot-stage > .verb-composer__bottom-row")
            && entradaComposerCss.includes('#container-inputs #composer-slot-stage[data-operation-board="noun-to-verb"] > .verb-composer__top-row')
            && entradaComposerCss.includes('#container-inputs #composer-slot-stage[data-operation-board="ordinary-nnc"] > .verb-composer__top-row')
            && !entradaComposerCss.includes("display: contents")
    );
    s.ok(
        "primary experience is an Andrews formula workbench",
        html.includes('id="formula-workbench"')
            && html.includes('data-andrews-formula-role="structured-formula-atlas"')
            && html.includes("<title>Gramática nawat/pipil Andrews</title>")
            && html.includes(">Gramática nawat/pipil Andrews<")
            && staticLabels.includes('"app-title": { "labelEs": "Gramática nawat/pipil Andrews"')
            && state.includes("const ANDREWS_FORMULA_WORKBENCH_CATEGORIES")
            && state.includes('id: "vnc-shell"')
            && state.includes('id: "ordinary-nnc-shell"')
            && !state.includes('formula: "#pers1-pers2(STEM)num1-num2#"')
            && state.includes("activeSlice")
            && state.includes("buildVncShellFormulaWorkbenchSlice")
            && state.includes("buildOrdinaryNncFormulaWorkbenchSlice")
            && state.includes("buildPossessiveStateNncFormulaWorkbenchSlice")
            && state.includes("buildVncValenceFormulaWorkbenchSlice")
            && state.includes("buildSubjectNumberConnectorFormulaWorkbenchSlice")
            && state.includes("buildDerivationalRouteFormulaWorkbenchSlice")
            && state.includes("buildCompoundStemFormulaWorkbenchSlice")
            && state.includes("buildNominalizationFormulaWorkbenchSlice")
            && state.includes("buildPersonalNameEmbeddedNncFormulaWorkbenchSlice")
            && state.includes("buildUnsupportedRouteDiagnosticsFormulaWorkbenchSlice")
            && state.includes('id: "possessive-state-nnc"')
            && state.includes('id: "valence-object-slots"')
            && state.includes('id: "subject-number-connectors"')
            && state.includes('id: "derivational-routes"')
            && state.includes('id: "compound-stems"')
            && state.includes('id: "nominalizations"')
            && state.includes('id: "personal-name-embedded-nnc"')
            && state.includes('id: "unsupported-route-diagnostics"')
            && state.includes("ordinaryNncHasNoTenseSlot: true")
            && state.includes("noClassicalSurfaceImport: true")
            && state.includes("unsupportedRoutesBlockSurfaceGeneration: true")
            && state.includes("routeRegistrySummary")
            && state.includes("buildAndrewsSourceGatedDerivationalRouteRegistry()")
            && state.includes('formulaSlotSource: formulaSchema ? "andrews-formula-slot-schema" : "workbench-fallback"')
            && state.includes("renderAndrewsFormulaTemplate(formulaSchema || schemaId)")
            && panels.includes("var AndrewsFormulaWorkbenchActiveCategoryId")
            && panels.includes("function renderAndrewsFormulaWorkbench")
            && panels.includes("function activateAndrewsFormulaWorkbenchCategory")
            && panels.includes("function syncAndrewsFormulaWorkbenchCategoryToEngine")
            && panels.includes("function appendAndrewsFormulaWorkbenchSlice")
            && panels.includes("function appendAndrewsFormulaWorkbenchOperationalLayer")
            && panels.includes("verbMeta?.rawInputVerb")
            && panels.includes('sourceInput.dataset.formulaSourceInput = slice.sourceMaterial?.inputKind || "ordinary-nnc"')
            && panels.includes("renderWorkbench: false")
            && panels.includes("slice.operationalLayerSummary")
            && panels.includes('wrapper.dataset.operationalLayerMissingSectionCount')
            && panels.includes('appendAndrewsFormulaWorkbenchPill(result, "Formula", slice.fullFormulaEcho')
            && panels.includes('appendAndrewsFormulaWorkbenchPill(result, "Compacta", slice.compactFormulaEcho')
            && panels.includes("item.dataset.exampleConnectorDyad")
            && panels.includes("slice.structuralFormulaEcho")
            && panels.includes("slice.nawatFormulaEcho")
            && panels.includes("Ejemplos de CNV")
            && panels.includes("Ejemplos de conectores sujeto/numero")
            && panels.includes("Ejemplos de rutas derivacionales")
            && panels.includes("Ejemplos de tallos compuestos")
            && panels.includes("Ejemplos de nominalizacion")
            && panels.includes("Ejemplos de nombres personales")
            && panels.includes("Ejemplos de diagnosticos sin salida")
            && panels.includes("item.dataset.slotStructuralValue")
            && panels.includes("item.dataset.examplePossessorKind")
            && panels.includes("item.dataset.exampleKey")
            && panels.includes("boundary.structuralExamples")
            && panels.includes("applyAndrewsFormulaWorkbenchSourceInput")
            && panels.includes("detail.dataset.formulaSchemaId")
            && panels.includes("item.dataset.slotOwner")
            && panels.includes("setOrdinaryNncGenerationModeEnabled(true")
            && panels.includes("TENSE_MODE?.sustantivo")
            && panels.includes("TENSE_MODE?.verbo")
            && panels.includes("renderAndrewsFormulaWorkbench();")
            && css.includes(".formula-workbench__category-tab")
            && css.includes(".formula-workbench__slot")
            && css.includes(".formula-workbench__source-input")
            && css.includes(".formula-workbench__families")
            && css.includes(".formula-workbench__operations")
            && css.includes(".formula-workbench__operation")
            && css.includes(".formula-workbench__operation-count")
            && css.includes(".formula-workbench__boundary")
            && css.includes(".formula-workbench__parsed-slot")
            && css.includes(".formula-workbench__parsed-slot-meta")
            && css.includes(".formula-workbench__examples")
            && css.includes(".formula-workbench__example-formula")
            && css.includes(".formula-workbench__pill--source-gated")
            && css.includes(".formula-workbench__pill--diagnostic-only")
            && css.includes(".formula-workbench__pill--unsupported")
    );
    s.eq(
        "tense authority frame separates Andrews logic from Nawat extensions",
        typeof ctx.getAndrewsTenseAuthorityFrame === "function"
            ? {
                preterito: ctx.getAndrewsTenseAuthorityFrame("preterito", ctx.TENSE_MODE?.verbo || "verbo").scope,
                condicional: ctx.getAndrewsTenseAuthorityFrame("condicional", ctx.TENSE_MODE?.verbo || "verbo").scope,
                preteritoGate: ctx.getAndrewsTenseGenerationGateFrame(ctx.getAndrewsTenseAuthorityFrame("preterito", ctx.TENSE_MODE?.verbo || "verbo")).generationGate,
                condicionalGate: ctx.getAndrewsTenseGenerationGateFrame(ctx.getAndrewsTenseAuthorityFrame("condicional", ctx.TENSE_MODE?.verbo || "verbo")).generationGate,
                condicionalEvidenceRole: ctx.getAndrewsTenseGenerationGateFrame(ctx.getAndrewsTenseAuthorityFrame("condicional", ctx.TENSE_MODE?.verbo || "verbo")).nawatEvidenceRole,
                condicionalFamily: ctx.getAndrewsTenseAuthorityFrame("condicional", ctx.TENSE_MODE?.verbo || "verbo").family,
                condicionalCoreFamily: typeof ctx.getAndrewsCnvTenseLogicAuthorityFrame === "function"
                    ? ctx.getAndrewsCnvTenseLogicAuthorityFrame("condicional").family
                    : "",
                preteritoCnvAllowed: ctx.isAndrewsCnvTenseGenerationGateAllowed("preterito", ctx.TENSE_MODE?.verbo || "verbo"),
                condicionalCnvAllowed: ctx.isAndrewsCnvTenseGenerationGateAllowed("condicional", ctx.TENSE_MODE?.verbo || "verbo"),
                nominalSlot: ctx.getAndrewsTenseAuthorityFrame("agentivo", ctx.TENSE_MODE?.sustantivo || "sustantivo").slot,
                nonactiveSlot: ctx.getAndrewsTenseAuthorityFrame("lu", ctx.TENSE_MODE?.verbo || "verbo").slot,
                particleSlot: ctx.getAndrewsTenseAuthorityFrame("particle-mode", ctx.TENSE_MODE?.particula || "particula").slot,
                outputGateSlot: ctx.getAndrewsTenseAuthorityFrame("selection-required", ctx.TENSE_MODE?.verbo || "verbo").slot,
                unknownSlot: ctx.getAndrewsTenseAuthorityFrame("inventado", ctx.TENSE_MODE?.verbo || "verbo").slot,
                unknownGate: ctx.getAndrewsTenseGenerationGateFrame(ctx.getAndrewsTenseAuthorityFrame("inventado", ctx.TENSE_MODE?.verbo || "verbo")).generationGate,
                nominalHoverMentionsCnn: ctx.getAndrewsFirstTenseHoverTitle("agentivo", ctx.TENSE_MODE?.sustantivo || "sustantivo").includes("CNN routes do not expose a VNC tense slot"),
            }
            : {
                preterito: panels.includes("preterito: Object.freeze({")
                    && panels.includes('scope: "andrews-licensed"')
                    ? "andrews-licensed"
                    : "missing",
                condicional: panels.includes("condicional: Object.freeze({")
                    && panels.includes('scope: "nawat-extension"')
                    ? "nawat-extension"
                    : "missing",
                preteritoGate: panels.includes('generationGate: "andrews-licensed-generation"')
                    ? "andrews-licensed-generation"
                    : "missing",
                condicionalGate: panels.includes('generationGate: "not-andrews-grammar-gate"')
                    ? "not-andrews-grammar-gate"
                    : "missing",
                condicionalEvidenceRole: panels.includes('nawatEvidenceRole: "surface-extension-only"')
                    ? "surface-extension-only"
                    : "missing",
                condicionalFamily: panels.includes("getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense)")
                    ? "nawat-extension-condicional"
                    : "missing",
                condicionalCoreFamily: panels.includes("getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense)")
                    ? "nawat-extension-condicional"
                    : "missing",
                preteritoCnvAllowed: panels.includes("function isAndrewsCnvTenseGenerationGateAllowed")
                    && panels.includes('=== "andrews-licensed-generation"'),
                condicionalCnvAllowed: false,
                nominalSlot: panels.includes('slot: "no-vnc-tns"')
                    ? "no-vnc-tns"
                    : "missing",
                nonactiveSlot: panels.includes('family: "nonactive-verbstem"')
                    ? "derived-stem"
                    : "missing",
                particleSlot: panels.includes('scope: "andrews-particle-boundary"')
                    ? "no-vnc-tns"
                    : "missing",
                outputGateSlot: panels.includes('scope: "andrews-output-gate"')
                    ? "route-selection-required"
                    : "missing",
                unknownSlot: panels.includes('slot: "andrews-frame-required"')
                    ? "andrews-frame-required"
                    : "missing",
                unknownGate: panels.includes('generationGate: "unclassified-andrews-frame-required"')
                    ? "unclassified-andrews-frame-required"
                    : "missing",
                nominalHoverMentionsCnn: panels.includes('function getAndrewsFirstTenseHoverTitle(tenseValue = "", mode = TENSE_MODE.verbo)')
                    && panels.includes("getAndrewsTenseAuthorityFrame(tenseValue, mode)")
                    && panels.includes("getAndrewsFirstTenseHoverTitle(tenseValue, tenseMode)")
                    && composer.includes("getAndrewsFirstTenseHoverTitle(tenseValue, getActiveTenseMode())"),
            },
        {
            preterito: "andrews-licensed",
            condicional: "nawat-extension",
            preteritoGate: "andrews-licensed-generation",
            condicionalGate: "not-andrews-grammar-gate",
            condicionalEvidenceRole: "surface-extension-only",
            condicionalFamily: "nawat-extension-condicional",
            condicionalCoreFamily: "nawat-extension-condicional",
            preteritoCnvAllowed: true,
            condicionalCnvAllowed: false,
            nominalSlot: "no-vnc-tns",
            nonactiveSlot: "derived-stem",
            particleSlot: "no-vnc-tns",
            outputGateSlot: "route-selection-required",
            unknownSlot: "andrews-frame-required",
            unknownGate: "unclassified-andrews-frame-required",
            nominalHoverMentionsCnn: true,
        }
    );
    s.eq(
        "nominal tense authority carries Andrews source-target route classification from the route registry",
        typeof ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame === "function"
            ? (() => {
                const mode = ctx.TENSE_MODE?.sustantivo || "sustantivo";
                const tenses = [
                    "agentivo",
                    "patientivo",
                    "instrumentivo",
                    "sustantivo-verbal",
                    "calificativo-instrumentivo",
                    "locativo-temporal",
                ];
                return Object.fromEntries(tenses.map((tenseValue) => {
                    const frame = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame(tenseValue, mode);
                    return [tenseValue, {
                        transition: frame.formulaTransition,
                        routeClass: frame.routeClass,
                        source: frame.sourceFormulaType,
                        target: frame.targetFormulaType,
                        authority: frame.logicAuthority,
                        spelling: frame.outputSpellingAuthority,
                        host: frame.uiHost,
                        registry: frame.registryStatus,
                        hasSuboperations: frame.routeSuboperationCount > 0,
                        hasOperationIds: frame.routeSuboperationIds.length > 0,
                    }];
                }));
            })()
            : {
                agentivo: panels.includes('agentivo: Object.freeze({') && panels.includes('formulaTransition: "CNV->CNN"') ? {
                    transition: "CNV->CNN",
                    routeClass: "verbal-source-to-nominal-target",
                    source: "CNV",
                    target: "CNN",
                    authority: "Andrews PDF",
                    spelling: "Nawat/Pipil orthography bridge",
                    host: "nominal-output-tab",
                    registry: "registry-match",
                    hasSuboperations: panels.includes("getAndrewsCnvCnnOperationalLayer"),
                    hasOperationIds: panels.includes("routeSuboperationIds"),
                } : {},
                patientivo: panels.includes('patientivo: Object.freeze({') && panels.includes('routeBranch: "patientive-family"') ? {
                    transition: "CNV->CNN",
                    routeClass: "verbal-source-to-nominal-target",
                    source: "CNV",
                    target: "CNN",
                    authority: "Andrews PDF",
                    spelling: "Nawat/Pipil orthography bridge",
                    host: "nominal-output-tab",
                    registry: "registry-match",
                    hasSuboperations: panels.includes("getAndrewsCnvCnnOperationalLayer"),
                    hasOperationIds: panels.includes("routeSuboperationIds"),
                } : {},
                instrumentivo: panels.includes('instrumentivo: Object.freeze({') ? {
                    transition: "CNV->CNN",
                    routeClass: "verbal-source-to-nominal-target",
                    source: "CNV",
                    target: "CNN",
                    authority: "Andrews PDF",
                    spelling: "Nawat/Pipil orthography bridge",
                    host: "nominal-output-tab",
                    registry: "registry-match",
                    hasSuboperations: panels.includes("getAndrewsCnvCnnOperationalLayer"),
                    hasOperationIds: panels.includes("routeSuboperationIds"),
                } : {},
                "sustantivo-verbal": panels.includes('"sustantivo-verbal": Object.freeze({') ? {
                    transition: "CNV->CNN",
                    routeClass: "verbal-source-to-nominal-target",
                    source: "CNV",
                    target: "CNN",
                    authority: "Andrews PDF",
                    spelling: "Nawat/Pipil orthography bridge",
                    host: "nominal-output-tab",
                    registry: "registry-match",
                    hasSuboperations: panels.includes("getAndrewsCnvCnnOperationalLayer"),
                    hasOperationIds: panels.includes("routeSuboperationIds"),
                } : {},
                "calificativo-instrumentivo": panels.includes('"calificativo-instrumentivo": Object.freeze({') ? {
                    transition: "CNV->CNN",
                    routeClass: "verbal-source-to-nominal-target",
                    source: "CNV",
                    target: "CNN",
                    authority: "Andrews PDF",
                    spelling: "Nawat/Pipil orthography bridge",
                    host: "nominal-output-tab",
                    registry: "registry-match",
                    hasSuboperations: panels.includes("getAndrewsCnvCnnOperationalLayer"),
                    hasOperationIds: panels.includes("routeSuboperationIds"),
                } : {},
                "locativo-temporal": panels.includes('"locativo-temporal": Object.freeze({') ? {
                    transition: "CNV->CNN",
                    routeClass: "verbal-source-to-nominal-target",
                    source: "CNV",
                    target: "CNN",
                    authority: "Andrews PDF",
                    spelling: "Nawat/Pipil orthography bridge",
                    host: "nominal-output-tab",
                    registry: "registry-match",
                    hasSuboperations: panels.includes("getAndrewsCnvCnnOperationalLayer"),
                    hasOperationIds: panels.includes("routeSuboperationIds"),
                } : {},
            },
        {
            agentivo: {
                transition: "CNV->CNN",
                routeClass: "verbal-source-to-nominal-target",
                source: "CNV",
                target: "CNN",
                authority: "Andrews PDF",
                spelling: "Nawat/Pipil orthography bridge",
                host: "nominal-output-tab",
                registry: "registry-match",
                hasSuboperations: true,
                hasOperationIds: true,
            },
            patientivo: {
                transition: "CNV->CNN",
                routeClass: "verbal-source-to-nominal-target",
                source: "CNV",
                target: "CNN",
                authority: "Andrews PDF",
                spelling: "Nawat/Pipil orthography bridge",
                host: "nominal-output-tab",
                registry: "registry-match",
                hasSuboperations: true,
                hasOperationIds: true,
            },
            instrumentivo: {
                transition: "CNV->CNN",
                routeClass: "verbal-source-to-nominal-target",
                source: "CNV",
                target: "CNN",
                authority: "Andrews PDF",
                spelling: "Nawat/Pipil orthography bridge",
                host: "nominal-output-tab",
                registry: "registry-match",
                hasSuboperations: true,
                hasOperationIds: true,
            },
            "sustantivo-verbal": {
                transition: "CNV->CNN",
                routeClass: "verbal-source-to-nominal-target",
                source: "CNV",
                target: "CNN",
                authority: "Andrews PDF",
                spelling: "Nawat/Pipil orthography bridge",
                host: "nominal-output-tab",
                registry: "registry-match",
                hasSuboperations: true,
                hasOperationIds: true,
            },
            "calificativo-instrumentivo": {
                transition: "CNV->CNN",
                routeClass: "verbal-source-to-nominal-target",
                source: "CNV",
                target: "CNN",
                authority: "Andrews PDF",
                spelling: "Nawat/Pipil orthography bridge",
                host: "nominal-output-tab",
                registry: "registry-match",
                hasSuboperations: true,
                hasOperationIds: true,
            },
            "locativo-temporal": {
                transition: "CNV->CNN",
                routeClass: "verbal-source-to-nominal-target",
                source: "CNV",
                target: "CNN",
                authority: "Andrews PDF",
                spelling: "Nawat/Pipil orthography bridge",
                host: "nominal-output-tab",
                registry: "registry-match",
                hasSuboperations: true,
                hasOperationIds: true,
            },
        }
    );
    s.eq(
        "patientivo subtypes stay as tense-block branches with CNV-to-CNN authority instead of top-level tabs",
        typeof ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame === "function"
            ? (() => {
                const mode = ctx.TENSE_MODE?.sustantivo || "sustantivo";
                const branchIds = [
                    "patientivo-pasivo",
                    "patientivo-impersonal",
                    "patientivo-perfectivo",
                    "patientivo-imperfectivo",
                    "patientivo-tronco",
                ];
                const topLevel = typeof ctx.getTenseOrderForMode === "function"
                    ? ctx.getTenseOrderForMode(mode)
                    : [];
                return {
                    topLevelPatientivo: topLevel.includes("patientivo"),
                    subtypeTabs: topLevel.filter((tenseValue) => /^patientivo-/.test(tenseValue)),
                    branches: Object.fromEntries(branchIds.map((branchId) => {
                        const frame = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame(branchId, mode);
                        return [branchId, {
                            transition: frame.formulaTransition,
                            branch: frame.routeBranch,
                            host: frame.uiHost,
                            target: frame.targetFormulaType,
                        }];
                    })),
                };
            })()
            : {
                topLevelPatientivo: state.includes('"patientivo"'),
                subtypeTabs: [],
                branches: panels.includes('"patientivo-pasivo": Object.freeze({')
                    && rendering.includes('id: "patientivo-pasivo"')
                    ? {
                        "patientivo-pasivo": {
                            transition: "CNV->CNN",
                            branch: "patientivo-passive",
                            host: "nominal-output-block-branch",
                            target: "CNN",
                        },
                        "patientivo-impersonal": {
                            transition: "CNV->CNN",
                            branch: "patientivo-impersonal",
                            host: "nominal-output-block-branch",
                            target: "CNN",
                        },
                        "patientivo-perfectivo": {
                            transition: "CNV->CNN",
                            branch: "patientivo-perfective",
                            host: "nominal-output-block-branch",
                            target: "CNN",
                        },
                        "patientivo-imperfectivo": {
                            transition: "CNV->CNN",
                            branch: "patientivo-imperfective",
                            host: "nominal-output-block-branch",
                            target: "CNN",
                        },
                        "patientivo-tronco": {
                            transition: "CNV->CNN",
                            branch: "patientivo-root-stock",
                            host: "nominal-output-block-branch",
                            target: "CNN",
                        },
                    }
                    : {},
            },
        {
            topLevelPatientivo: true,
            subtypeTabs: [],
            branches: {
                "patientivo-pasivo": {
                    transition: "CNV->CNN",
                    branch: "patientivo-passive",
                    host: "nominal-output-block-branch",
                    target: "CNN",
                },
                "patientivo-impersonal": {
                    transition: "CNV->CNN",
                    branch: "patientivo-impersonal",
                    host: "nominal-output-block-branch",
                    target: "CNN",
                },
                "patientivo-perfectivo": {
                    transition: "CNV->CNN",
                    branch: "patientivo-perfective",
                    host: "nominal-output-block-branch",
                    target: "CNN",
                },
                "patientivo-imperfectivo": {
                    transition: "CNV->CNN",
                    branch: "patientivo-imperfective",
                    host: "nominal-output-block-branch",
                    target: "CNN",
                },
                "patientivo-tronco": {
                    transition: "CNV->CNN",
                    branch: "patientivo-root-stock",
                    host: "nominal-output-block-branch",
                    target: "CNN",
                },
            },
        }
    );
    s.eq(
        "nominal tabs expose Andrews suboperation ids/counts for broad labels",
        typeof ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame === "function"
            ? (() => {
                const mode = ctx.TENSE_MODE?.sustantivo || "sustantivo";
                const preteritAgentive = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame("agentivo-preterito", mode);
                const sustantivoVerbal = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame("sustantivo-verbal", mode);
                const patientivo = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame("patientivo", mode);
                const instrumentivo = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame("instrumentivo", mode);
                const adjectival = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame("calificativo-instrumentivo", mode);
                const locative = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame("locativo-temporal", mode);
                const locativeAgentive = ctx.getAndrewsTenseSourceTargetRouteAuthorityFrame("locativo-agentivo-preterito", mode);
                return {
                    preteritAgentiveLayer: preteritAgentive.operationalLayerKind,
                    preteritAgentiveCountAtLeast: preteritAgentive.routeSuboperationCount >= 16,
                    preteritAgentiveHasOwnerhood: preteritAgentive.routeSuboperationIds.includes("preterit-agentive-ownerhood"),
                    preteritAgentiveItemCountAtLeast: preteritAgentive.routeSuboperationItems.length >= 12,
                    preteritAgentiveHasDoubleNucleus: preteritAgentive.routeSuboperationIds.includes("preterit-agentive-double-nucleus-compound"),
                    sustantivoCountAtLeast: sustantivoVerbal.routeSuboperationCount >= 22,
                    sustantivoHasTzin: sustantivoVerbal.routeSuboperationIds.includes("active-action-affective-tzin-assimilation"),
                    sustantivoHasImpersonalTlaBranch: sustantivoVerbal.routeSuboperationIds.includes("impersonal-action-tla-source"),
                    patientiveCountAtLeast: patientivo.routeSuboperationCount >= 62,
                    patientiveHasHumanTe: patientivo.routeSuboperationIds.includes("impersonal-patientive-projective-human-te-source"),
                    patientiveHasPossessiveComplement: patientivo.routeSuboperationIds.includes("patientive-possessive-complement-desire-matrix"),
                    patientiveSectionsInclude39_9: patientivo.routeSuboperationSections.includes("39.9"),
                    patientiveKeysIncludeMatrix: patientivo.routeSuboperationSourceRequirementKeys.includes("matrix"),
                    instrumentiveCountAtLeast: instrumentivo.routeSuboperationCount >= 5,
                    instrumentiveHasReflexiveCuring: instrumentivo.routeSuboperationIds.includes("instrumentive-reflexive-curing-means"),
                    adjectivalCountAtLeast: adjectival.routeSuboperationCount >= 38,
                    adjectivalHasSynonymTriplet: adjectival.routeSuboperationIds.includes("synonymous-adjectival-triplet"),
                    adjectivalHasDenominalLoop: adjectival.routeSuboperationIds.includes("denominal-verbstem-compound-nounstem-adjectival"),
                    locativeCountAtLeast: locative.routeSuboperationCount >= 73,
                    locativeHasRelationalTime: locative.routeSuboperationIds.includes("relational-time-function"),
                    locativeHasImperfectImpersonal: locative.routeSuboperationIds.includes("imperfect-impersonal-locative-result"),
                    locativeHasSeemingCompoundMatrix: locative.routeSuboperationIds.includes("yolloco-compound-embed-relational"),
                    locativeHasOptionThreeRelational: locative.routeSuboperationIds.includes("relational-pan-connective-t-compound"),
                    locativeCoverageComplete: locative.routeSuboperationCoverageComplete,
                    locativeMissingSectionCount: locative.routeSuboperationMissingSectionCount,
                    locativeAgentiveCountAtLeast: locativeAgentive.routeSuboperationCount >= 7,
                    locativeAgentiveHasActiveAction: locativeAgentive.routeSuboperationIds.includes("active-action-locative-46-3-1-b"),
                };
            })()
            : {
                preteritAgentiveLayer: panels.includes("operationalLayerKind") ? "andrews-cnv-cnn-operational-layer" : "",
                preteritAgentiveCountAtLeast: panels.includes("routeSuboperationCount"),
                preteritAgentiveHasOwnerhood: nncNominalization.includes("preterit-agentive-ownerhood"),
                preteritAgentiveItemCountAtLeast: panels.includes("routeSuboperationItems"),
                preteritAgentiveHasDoubleNucleus: nncNominalization.includes("preterit-agentive-double-nucleus-compound"),
                sustantivoCountAtLeast: nncNominalization.includes("active-action-affective-tzin-assimilation"),
                sustantivoHasTzin: nncNominalization.includes("active-action-affective-tzin-assimilation"),
                sustantivoHasImpersonalTlaBranch: nncNominalization.includes("impersonal-action-tla-source"),
                patientiveCountAtLeast: nncNominalization.includes("impersonal-patientive-projective-human-te-source"),
                patientiveHasHumanTe: nncNominalization.includes("impersonal-patientive-projective-human-te-source"),
                patientiveHasPossessiveComplement: nncNominalization.includes("patientive-possessive-complement-desire-matrix"),
                patientiveSectionsInclude39_9: nncNominalization.includes("39.9"),
                patientiveKeysIncludeMatrix: panels.includes("routeSuboperationSourceRequirementKeys"),
                instrumentiveCountAtLeast: nncNominalization.includes("instrumentive-reflexive-curing-means"),
                instrumentiveHasReflexiveCuring: nncNominalization.includes("instrumentive-reflexive-curing-means"),
                adjectivalCountAtLeast: nncNominalization.includes("synonymous-adjectival-triplet"),
                adjectivalHasSynonymTriplet: nncNominalization.includes("synonymous-adjectival-triplet"),
                adjectivalHasDenominalLoop: nncNominalization.includes("denominal-verbstem-compound-nounstem-adjectival"),
                locativeCountAtLeast: nncNominalization.includes("relational-time-function"),
                locativeHasRelationalTime: nncNominalization.includes("relational-time-function"),
                locativeHasImperfectImpersonal: nncNominalization.includes("imperfect-impersonal-locative-result"),
                locativeHasSeemingCompoundMatrix: nncNominalization.includes("yolloco-compound-embed-relational"),
                locativeHasOptionThreeRelational: nncNominalization.includes("relational-pan-connective-t-compound"),
                locativeCoverageComplete: panels.includes("routeSuboperationCoverageComplete"),
                locativeMissingSectionCount: panels.includes("routeSuboperationMissingSectionCount") ? 0 : -1,
                locativeAgentiveCountAtLeast: nncNominalization.includes("active-action-locative-46-3-1-b"),
                locativeAgentiveHasActiveAction: nncNominalization.includes("active-action-locative-46-3-1-b"),
            },
        {
            preteritAgentiveLayer: "andrews-cnv-cnn-operational-layer",
            preteritAgentiveCountAtLeast: true,
            preteritAgentiveHasOwnerhood: true,
            preteritAgentiveItemCountAtLeast: true,
            preteritAgentiveHasDoubleNucleus: true,
            sustantivoCountAtLeast: true,
            sustantivoHasTzin: true,
            sustantivoHasImpersonalTlaBranch: true,
            patientiveCountAtLeast: true,
            patientiveHasHumanTe: true,
            patientiveHasPossessiveComplement: true,
            patientiveSectionsInclude39_9: true,
            patientiveKeysIncludeMatrix: true,
            instrumentiveCountAtLeast: true,
            instrumentiveHasReflexiveCuring: true,
            adjectivalCountAtLeast: true,
            adjectivalHasSynonymTriplet: true,
            adjectivalHasDenominalLoop: true,
            locativeCountAtLeast: true,
            locativeHasRelationalTime: true,
            locativeHasImperfectImpersonal: true,
            locativeHasSeemingCompoundMatrix: true,
            locativeHasOptionThreeRelational: true,
            locativeCoverageComplete: true,
            locativeMissingSectionCount: 0,
            locativeAgentiveCountAtLeast: true,
            locativeAgentiveHasActiveAction: true,
        }
    );
    s.eq(
        "non-nominal source-target routes are classified away from nominal-output tab hosting",
        typeof ctx.getAndrewsSourceTargetRouteUiHost === "function"
            ? {
                cnvToCnn: ctx.getAndrewsSourceTargetRouteUiHost("CNV->CNN"),
                cnnToCnn: ctx.getAndrewsSourceTargetRouteUiHost("CNN->CNN"),
                cnnToCnv: ctx.getAndrewsSourceTargetRouteUiHost("CNN->CNV"),
                cnvToCnv: ctx.getAndrewsSourceTargetRouteUiHost("CNV->CNV"),
                mixed: ctx.getAndrewsSourceTargetRouteUiHost("CNV/CNN->CNV/CNN"),
            }
            : {
                cnvToCnn: panels.includes('return "nominal-output-tab-or-block"') ? "nominal-output-tab-or-block" : "missing",
                cnnToCnn: panels.includes('return "nominal-route-directory-or-output-continuation"') ? "nominal-route-directory-or-output-continuation" : "missing",
                cnnToCnv: panels.includes('return "andrews-route-directory-or-output-continuation"') ? "andrews-route-directory-or-output-continuation" : "missing",
                cnvToCnv: panels.includes('return "verb-derivation-controls-or-output-continuation"') ? "verb-derivation-controls-or-output-continuation" : "missing",
                mixed: panels.includes('return "mixed-compound-route-directory"') ? "mixed-compound-route-directory" : "missing",
            },
        {
            cnvToCnn: "nominal-output-tab-or-block",
            cnnToCnn: "nominal-route-directory-or-output-continuation",
            cnnToCnv: "andrews-route-directory-or-output-continuation",
            cnvToCnv: "verb-derivation-controls-or-output-continuation",
            mixed: "mixed-compound-route-directory",
        }
    );
    s.eq(
        "source-target route classification covers Andrews verbal nominal and mixed transitions",
        typeof ctx.getAndrewsSourceTargetRouteClass === "function"
            ? {
                cnvToCnn: ctx.getAndrewsSourceTargetRouteClass("CNV->CNN"),
                cnnToCnn: ctx.getAndrewsSourceTargetRouteClass("CNN->CNN"),
                cnnToCnv: ctx.getAndrewsSourceTargetRouteClass("CNN->CNV"),
                cnvToCnv: ctx.getAndrewsSourceTargetRouteClass("CNV->CNV"),
                mixed: ctx.getAndrewsSourceTargetRouteClass("CNV/CNN->CNV/CNN"),
            }
            : {
                cnvToCnn: panels.includes('return "verbal-source-to-nominal-target"') ? "verbal-source-to-nominal-target" : "missing",
                cnnToCnn: panels.includes('return "nominal-source-to-nominal-target"') ? "nominal-source-to-nominal-target" : "missing",
                cnnToCnv: panels.includes('return "nominal-source-to-verbal-target"') ? "nominal-source-to-verbal-target" : "missing",
                cnvToCnv: panels.includes('return "verbal-source-to-verbal-target"') ? "verbal-source-to-verbal-target" : "missing",
                mixed: panels.includes('return "mixed-compound-source-target-route"') ? "mixed-compound-source-target-route" : "missing",
            },
        {
            cnvToCnn: "verbal-source-to-nominal-target",
            cnnToCnn: "nominal-source-to-nominal-target",
            cnnToCnv: "nominal-source-to-verbal-target",
            cnvToCnv: "verbal-source-to-verbal-target",
            mixed: "mixed-compound-source-target-route",
        }
    );
    s.ok(
        "tense tabs and output blocks carry Andrews authority datasets",
        panels.includes("function getAndrewsTenseAuthorityFrame")
            && panels.includes("function getAndrewsTenseGenerationGateFrame")
            && panels.includes("function getAndrewsTenseGenerationGateValue")
            && panels.includes("function isAndrewsCnvTenseGenerationGateAllowed")
            && panels.includes("function getAndrewsTenseAuthorityElementContract")
            && panels.includes("function getAndrewsTenseExecutorGateFrame")
            && panels.includes("function applyAndrewsTenseAuthorityDataset")
            && panels.includes("dataset.andrewsTenseValue")
            && panels.includes("dataset.andrewsTenseAuthority")
            && panels.includes("dataset.andrewsTenseMode")
            && panels.includes('dataset.andrewsGrammarLogicAuthority = "Andrews PDF"')
            && panels.includes('dataset.andrewsClassicalSpellingRole = "structural-only"')
            && panels.includes('dataset.nawatPipilOutputBoundary = "orthography-realization"')
            && panels.includes('dataset.andrewsOutputSpellingAuthority = "Nawat/Pipil orthography bridge"')
            && panels.includes('dataset.andrewsOrthographyRealizationPath = "andrews-logic-then-nawat-pipil-realization"')
            && panels.includes("dataset.andrewsLogicRole")
            && panels.includes("dataset.andrewsGenerationGate")
            && panels.includes("dataset.andrewsOutputRole")
            && panels.includes("dataset.nawatPipilEvidenceRole")
            && panels.includes("dataset.classicalOutputImport")
            && panels.includes("dataset.andrewsCoreGenerationAuthority")
            && panels.includes("dataset.andrewsCoreGenerationGate")
            && panels.includes("dataset.andrewsCoreTenseSource")
            && panels.includes("dataset.andrewsCoreTenseSlot")
            && panels.includes("dataset.andrewsCoreTenseFamily")
            && panels.includes("dataset.andrewsCoreLogicRole")
            && panels.includes("dataset.andrewsCoreOutputRole")
            && panels.includes("dataset.andrewsCoreNawatEvidenceRole")
            && panels.includes("dataset.andrewsCoreClassicalOutputImport")
            && panels.includes("dataset.andrewsExecutorGenerationGate")
            && panels.includes("dataset.andrewsExecutorRouteStage")
            && panels.includes("dataset.andrewsExecutorGenerationAllowed")
            && panels.includes("dataset.andrewsExecutorFormulaShellPolicy")
            && panels.includes("dataset.andrewsExecutorSurfacePolicy")
            && panels.includes("dataset.andrewsExecutorFallbackPolicy")
            && panels.includes("function getAndrewsTenseSourceTargetRouteAuthorityFrame")
            && panels.includes("function getAndrewsSourceTargetRouteUiHost")
            && panels.includes("dataset.andrewsRouteAuthority")
            && panels.includes("dataset.andrewsRouteLogicAuthority")
            && panels.includes("dataset.andrewsSourceTargetRoute")
            && panels.includes("dataset.andrewsSourceTargetRouteClass")
            && panels.includes("dataset.andrewsSourceFormulaType")
            && panels.includes("dataset.andrewsTargetFormulaType")
            && panels.includes("dataset.andrewsRouteRegistryIds")
            && panels.includes("dataset.andrewsRouteRegistryMatchedIds")
            && panels.includes("dataset.andrewsRouteRegistryStatus")
            && panels.includes("dataset.andrewsRouteFamilies")
            && panels.includes("dataset.andrewsRouteKinds")
            && panels.includes("dataset.andrewsRouteBranch")
            && panels.includes("dataset.andrewsRouteUiHost")
            && panels.includes("dataset.andrewsRouteSourceGateStatus")
            && panels.includes("dataset.andrewsRouteSourceEvidenceStatus")
            && panels.includes("dataset.andrewsRouteGenerationGate")
            && panels.includes("dataset.andrewsRouteGenerationAllowed")
            && panels.includes("dataset.andrewsRouteClassicalSpellingRole")
            && panels.includes("dataset.andrewsRouteOutputSpellingAuthority")
            && panels.includes("dataset.andrewsAuthorityElementContract")
            && panels.includes("dataset.andrewsAuthorityExpectedTag")
            && panels.includes("dataset.andrewsAuthorityRenderedTag")
            && panels.includes("dataset.andrewsAuthorityAudit")
            && panels.includes("dataset.andrewsAuthorityMissing")
            && panels.includes("dataset.andrewsAuthorityDiagnostics")
            && panels.includes("function auditAndrewsTenseAuthorityAnnotatedDom")
            && panels.includes("function getAndrewsTenseAuthorityDatasetAuditRecord")
            && panels.includes("function getAndrewsTenseAuthorityExpectedDataset")
            && panels.includes("function getAndrewsTenseAuthorityCanonicalMismatches")
            && panels.includes("function getAndrewsTenseAuthorityExpectedClasses")
            && panels.includes("function getAndrewsTenseAuthorityClassMismatches")
            && panels.includes("function syncAndrewsTenseAuthorityDomAudit")
            && panels.includes("function getAndrewsTenseTabSelectionAuthorityState")
            && panels.includes("function applyAndrewsTenseTabSelectionAuthorityDataset")
            && panels.includes("function getAndrewsTenseTabClickAuthorityState")
            && panels.includes("function applyAndrewsTenseTabClickAuthorityDataset")
            && panels.includes("function isAndrewsTenseTabClickAllowed")
            && panels.includes("dataset.andrewsSelectionDisabled")
            && panels.includes("dataset.andrewsSelectionLogicAuthority")
            && panels.includes("dataset.andrewsSelectionGrammarGate")
            && panels.includes("dataset.andrewsSelectionOutputRole")
            && panels.includes("dataset.andrewsSelectionOrthographyBoundary")
            && panels.includes("dataset.andrewsSelectionClassicalOutputImport")
            && panels.includes("dataset.andrewsSelectionSurfaceProbeRole")
            && panels.includes("dataset.andrewsSelectionSelected")
            && panels.includes("dataset.andrewsSelectionSelectedRole")
            && panels.includes("dataset.andrewsClickGate")
            && panels.includes("dataset.andrewsClickBlocked")
            && panels.includes("dataset.andrewsClickAuthority")
            && panels.includes("function getAndrewsTenseBlockOutputAuditRecord")
            && panels.includes("function applyAndrewsTenseBlockOutputAuditDataset")
            && panels.includes("function summarizeAndrewsTenseBlockOutputAudit")
            && panels.includes("function getAndrewsTenseTabSelectionAuditRecord")
            && panels.includes("function summarizeAndrewsTenseTabSelectionAudit")
            && panels.includes("orthography-output-probe-not-grammar-gate")
            && panels.includes("andrews-stem-class-unavailable")
            && panels.includes("blocked-andrews-generation-block-has-output-rows")
            && panels.includes("blocked-andrews-generation-block-has-allowed-route-rows")
            && panels.includes("output-row-missing-andrews-route-contract")
            && panels.includes("blocked-andrews-route-row-result-ok")
            && panels.includes("generated-row-uses-blocked-andrews-route-contract")
            && panels.includes("generated-row-result-not-ok")
            && panels.includes("generated-row-missing-andrews-logic-authority")
            && panels.includes("generated-row-spelling-evidence-role-mismatch")
            && panels.includes("generated-row-source-context-authority-not-andrews")
            && panels.includes("generated-row-source-evidence-authority-not-andrews")
            && panels.includes("generated-row-classical-spelling-role-not-structural-only")
            && panels.includes("generated-row-missing-nawat-pipil-orthography-boundary")
            && panels.includes("generated-row-spelling-authority-not-nawat-pipil")
            && panels.includes("generated-row-classical-output-import-not-blocked")
            && panels.includes("andrews-output-spelling-authority-missing")
            && panels.includes("andrews-orthography-realization-path-missing")
            && panels.includes("andrews-source-target-route-authority-missing")
            && panels.includes("nominal-output-tab-uses-non-nominal-route-host")
            && panels.includes("dataset.andrewsBlockOutputScope")
            && panels.includes("dataset.andrewsBlockOutputAudit")
            && panels.includes("dataset.andrewsBlockRouteFamilies")
            && panels.includes("dataset.andrewsBlockRouteStages")
            && panels.includes("dataset.andrewsBlockRouteDiagnosticIds")
            && panels.includes("dataset.andrewsBlockRowLogicAuthorities")
            && panels.includes("dataset.andrewsBlockRowSpellingEvidenceRoles")
            && panels.includes("dataset.andrewsBlockRowClassicalSpellingRoles")
            && panels.includes("dataset.andrewsBlockRowOrthographyBoundaries")
            && panels.includes("dataset.andrewsBlockRowSpellingAuthorities")
            && panels.includes("dataset.andrewsBlockRowClassicalImports")
            && panels.includes("dataset.andrewsBlockRowResultStates")
            && panels.includes("dataset.andrewsBlockRowSourceContextAuthorities")
            && panels.includes("dataset.andrewsBlockRowSourceEvidenceAuthorities")
            && panels.includes("dataset.andrewsBlockRowRouteContractMissingCount")
            && panels.includes("dataset.andrewsBlockRouteGenerationAllowedCount")
            && panels.includes("dataset.andrewsBlockRouteGenerationBlockedRowCount")
            && panels.includes("dataset.andrewsBlockRouteBlockedResultOkCount")
            && panels.includes("dataset.andrewsBlockRouteGeneratedBlockedContractCount")
            && panels.includes("dataset.andrewsBlockRouteGeneratedResultNotOkCount")
            && panels.includes("dataset.andrewsBlockRowLogicAuthorityMissingCount")
            && panels.includes("dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount")
            && panels.includes("dataset.andrewsBlockRowSourceContextAuthorityMismatchCount")
            && panels.includes("dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount")
            && panels.includes("dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount")
            && panels.includes("dataset.andrewsBlockRowOrthographyBoundaryMissingCount")
            && panels.includes("dataset.andrewsBlockRowSpellingAuthorityMismatchCount")
            && panels.includes("dataset.andrewsBlockRowClassicalImportNotBlockedCount")
            && panels.includes("scope.dataset.andrewsBlockOutputChecked")
            && panels.includes("scope.dataset.andrewsBlockRouteGenerationAllowedCount")
            && panels.includes("scope.dataset.andrewsBlockRouteGenerationBlockedRowCount")
            && panels.includes("scope.dataset.andrewsBlockRouteBlockedResultOkCount")
            && panels.includes("scope.dataset.andrewsBlockRouteGeneratedBlockedContractCount")
            && panels.includes("scope.dataset.andrewsBlockRouteGeneratedResultNotOkCount")
            && panels.includes("scope.dataset.andrewsBlockRowLogicAuthorityMissingCount")
            && panels.includes("scope.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount")
            && panels.includes("scope.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount")
            && panels.includes("scope.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount")
            && panels.includes("scope.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount")
            && panels.includes("scope.dataset.andrewsBlockRowOrthographyBoundaryMissingCount")
            && panels.includes("scope.dataset.andrewsBlockRowSpellingAuthorityMismatchCount")
            && panels.includes("scope.dataset.andrewsBlockRowClassicalImportNotBlockedCount")
            && panels.includes("scope.dataset.andrewsBlockRowRouteContractMissingCount")
            && panels.includes("scope.dataset.andrewsBlockOutputHardBlockedCount")
            && panels.includes("tense-block--andrews-output-blocked")
            && panels.includes("tense-block--andrews-output-generated")
            && panels.includes("tense-block--andrews-output-leak-diagnostic")
            && panels.includes("tense-block--andrews-authority-leak-diagnostic")
            && panels.includes("tense-block--andrews-orthography-leak-diagnostic")
            && rendering.includes("dataset.grammarLogicAuthority")
            && rendering.includes("dataset.grammarSpellingEvidenceRole")
            && rendering.includes("dataset.grammarClassicalSpellingRole")
            && rendering.includes("dataset.grammarOrthographyBoundary")
            && rendering.includes("dataset.grammarSpellingAuthority")
            && rendering.includes("dataset.grammarClassicalSurfaceImport")
            && state.includes('syncAndrewsTenseAuthorityDomAudit(document.getElementById("tense-tabs"), { mode })')
            && state.includes('syncAndrewsTenseAuthorityDomAudit(document.getElementById("all-tense-conjugations"), { mode })')
            && panels.includes("canonicalMismatches")
            && panels.includes("classMismatches")
            && panels.includes("scope.dataset.andrewsAuthorityRepaired")
            && panels.includes("scope.dataset.andrewsTabSelectionAudit")
            && panels.includes("scope.dataset.andrewsTabSelectionChecked")
            && panels.includes("scope.dataset.andrewsTabSelectionAnnotated")
            && panels.includes("scope.dataset.andrewsTabSelectionRepaired")
            && panels.includes("scope.dataset.andrewsTabSelectionSelectableCount")
            && panels.includes("scope.dataset.andrewsTabSelectionBlockedCount")
            && panels.includes("scope.dataset.andrewsTabSelectionSelectedCount")
            && panels.includes("scope.dataset.andrewsTabSelectionBlockedSelectedCount")
            && panels.includes("scope.dataset.andrewsTabSelectionOutputProbeOnlyCount")
            && panels.includes("scope.dataset.andrewsTabSelectionHardGateCount")
            && panels.includes("scope.dataset.andrewsTabSelectionDisabledCount")
            && panels.includes("scope.dataset.andrewsTabSelectionNativeDisabledCount")
            && panels.includes("scope.dataset.andrewsTabSelectionMissingCount")
            && panels.includes("scope.dataset.andrewsTabSelectionDiagnosticCount")
            && panels.includes("scope.dataset.andrewsTabSelectionLogicAuthorityMismatchCount")
            && panels.includes("scope.dataset.andrewsTabSelectionGrammarGateMismatchCount")
            && panels.includes("scope.dataset.andrewsTabSelectionOrthographyBoundaryMissingCount")
            && panels.includes("scope.dataset.andrewsTabSelectionClassicalImportNotBlockedCount")
            && panels.includes("scope.dataset.andrewsTabSelectionSurfaceProbeRoleMismatchCount")
            && panels.includes("scope.dataset.andrewsTabSelectionDisabledMismatchCount")
            && panels.includes("scope.dataset.andrewsTabSelectionActiveMismatchCount")
            && panels.includes("andrews-selection-blocked-tab-selected")
            && rendering.includes("isAndrewsCnvTenseGenerationGateAllowed(resolvedOutputTenseValue, TENSE_MODE.verbo)")
            && rendering.includes("tenseValue: resolvedOutputTenseValue")
            && rendering.includes('blockClassName: "tense-block--cnv-generation-gate-blocked"')
            && rendering.includes("La salida CNV queda bloqueada hasta que la ranura tiempo tenga una puerta de generacion Andrews.")
            && panels.includes("non-cnv-route-has-vnc-tense-slot")
            && panels.includes("nawat-extension-marked-as-andrews-source")
            && panels.includes("nawat-extension-has-andrews-generation-gate")
            && panels.includes("andrews-licensed-generation-gate-missing")
            && panels.includes("andrews-core-generation-authority-mismatch")
            && panels.includes("andrews-core-tense-source-mismatch")
            && panels.includes("andrews-core-tense-slot-mismatch")
            && panels.includes("andrews-core-tense-family-mismatch")
            && panels.includes("andrews-core-logic-role-mismatch")
            && panels.includes("andrews-core-generation-gate-mismatch")
            && panels.includes("andrews-core-output-role-mismatch")
            && panels.includes("andrews-core-nawat-evidence-role-mismatch")
            && panels.includes("andrews-core-classical-output-import-mismatch")
            && panels.includes("andrews-executor-generation-gate-mismatch")
            && panels.includes("andrews-executor-route-stage-mismatch")
            && panels.includes("andrews-executor-generation-allowed-mismatch")
            && panels.includes("andrews-executor-formula-shell-policy-mismatch")
            && panels.includes("andrews-executor-fallback-policy-mismatch")
            && panels.includes("blocked-before-formula-shell")
            && panels.includes("blocked-no-target-stem-fallback")
            && panels.includes("tense-tab-not-button")
            && panels.includes("tense-block-not-div")
            && panels.includes("andrews-authority-element-contract-mismatch")
            && panels.includes("andrews-selection-authority-mismatch")
            && panels.includes("andrews-selection-logic-authority-missing")
            && panels.includes("andrews-selection-grammar-gate-mismatch")
            && panels.includes("andrews-selection-orthography-boundary-missing")
            && panels.includes("andrews-selection-classical-output-import-not-blocked")
            && panels.includes("andrews-selection-surface-probe-role-mismatch")
            && panels.includes("andrews-selection-audit-operation-frame-missing")
            && panels.includes("andrews-selection-disabled-mismatch")
            && panels.includes("andrews-selection-native-disabled-mismatch")
            && panels.includes("andrews-selection-aria-disabled-mismatch")
            && panels.includes("andrews-click-gate-mismatch")
            && panels.includes("andrews-click-blocked-reasons-mismatch")
            && panels.includes("andrews-click-authority-mismatch")
            && panels.includes("unclassified-authority-frame")
            && panels.includes("unclassified-authority-slot-mismatch")
            && panels.includes("tense-tab--andrews-audit-warning")
            && panels.includes("tense-block--andrews-audit-warning")
            && panels.includes("tense-tab--surface-evidence-only")
            && panels.includes("tense-block--surface-evidence-only")
            && panels.includes("tense-tab--andrews-unclassified")
            && panels.includes("tense-block--andrews-unclassified")
            && panels.includes("applyAndrewsTenseAuthorityDataset(button")
            && panels.includes("getAndrewsCnvCnnOperationalLayerForTense")
            && panels.includes("dataset.andrewsRouteSuboperationIds")
            && panels.includes("dataset.andrewsRouteSuboperationCoverageComplete")
            && panels.includes("dataset.andrewsRouteSuboperationMissingSectionCount")
            && panels.includes("syncAndrewsTenseOperationalLayerElement")
            && panels.includes("syncAndrewsTenseBlockOperationalLayerElement")
            && panels.includes("syncAndrewsTenseTabsOperationalLayerPanel")
            && panels.includes("appendAndrewsOperationalLayerOperationRows")
            && panels.includes("tense-tabs-operational-layer-panel")
            && panels.includes("applyAndrewsTenseTabSelectionAuthorityDataset(button")
            && panels.includes("applyAndrewsTenseTabClickAuthorityDataset(button")
            && panels.includes("if (!isAndrewsTenseTabClickAllowed(button))")
            && composer.includes("applyAndrewsTenseAuthorityDataset(button")
            && composer.includes("applyAndrewsTenseTabSelectionAuthorityDataset(button")
            && rendering.includes("applyAndrewsTenseAuthorityDataset(tenseBlock")
            && rendering.includes("applyAndrewsTenseAuthorityDataset(controlsBlock")
            && rendering.includes("applyAndrewsTenseAuthorityDataset(block")
            && rendering.includes("applyAndrewsTenseAuthorityDataset(groupBlock")
            && rendering.includes("applyAndrewsTenseAuthorityDataset(boundaryBlock")
            && css.includes(".tense-tab--nawat-extension")
            && css.includes(".tense-block--andrews-authority")
            && css.includes(".tense-block--cnv-generation-gate-blocked")
            && css.includes(".tense-tab--andrews-nominal-route")
            && css.includes(".tense-block--andrews-particle-boundary")
            && css.includes(".tense-block--andrews-output-gate")
            && css.includes(".tense-tab--andrews-audit-warning")
            && css.includes(".tense-block--andrews-audit-warning")
            && css.includes(".tense-tab--surface-evidence-only")
            && css.includes(".tense-block--surface-evidence-only")
            && css.includes(".tense-tab--andrews-unclassified")
            && css.includes(".tense-block--andrews-unclassified")
            && css.includes(".tense-block--andrews-output-blocked")
            && css.includes(".tense-block--andrews-output-generated")
            && css.includes(".tense-block--andrews-output-nominal")
            && css.includes(".tense-block--andrews-output-leak-diagnostic")
            && css.includes(".tense-block--andrews-authority-leak-diagnostic")
            && css.includes(".tense-block--andrews-orthography-leak-diagnostic")
            && css.includes(".tense-tab--andrews-selection-allowed")
            && css.includes(".tense-tab--andrews-selection-blocked")
            && css.includes(".tense-tab--andrews-output-pending")
            && css.includes(".tense-tab-operational-layer")
            && css.includes(".tense-block-operational-layer")
            && css.includes(".tense-block-operational-layer__op")
            && css.includes(".tense-block-operational-layer__summary-coverage")
            && css.includes(".tense-tabs-operational-layer-panel")
            && css.includes(".tense-tabs-operational-layer-panel__op")
            && css.includes(".tense-tabs-operational-layer-panel__coverage")
    );
    s.eq(
        "tense authority annotation writes self-audit fields on live elements",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {},
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                const frame = ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                return {
                    frameScope: frame.scope,
                    authority: element.dataset.andrewsTenseAuthority,
                    value: element.dataset.andrewsTenseValue,
                    logicAuthority: element.dataset.andrewsGrammarLogicAuthority,
                    spellingRole: element.dataset.andrewsClassicalSpellingRole,
                    outputBoundary: element.dataset.nawatPipilOutputBoundary,
                    spellingAuthority: element.dataset.andrewsOutputSpellingAuthority,
                    realizationPath: element.dataset.andrewsOrthographyRealizationPath,
                    logicRole: element.dataset.andrewsLogicRole,
                    generationGate: element.dataset.andrewsGenerationGate,
                    outputRole: element.dataset.andrewsOutputRole,
                    evidenceRole: element.dataset.nawatPipilEvidenceRole,
                    classicalOutputImport: element.dataset.classicalOutputImport,
                    coreAuthority: element.dataset.andrewsCoreGenerationAuthority,
                    coreGenerationGate: element.dataset.andrewsCoreGenerationGate,
                    coreSource: element.dataset.andrewsCoreTenseSource,
                    coreSlot: element.dataset.andrewsCoreTenseSlot,
                    coreFamily: element.dataset.andrewsCoreTenseFamily,
                    coreLogicRole: element.dataset.andrewsCoreLogicRole,
                    coreOutputRole: element.dataset.andrewsCoreOutputRole,
                    coreEvidenceRole: element.dataset.andrewsCoreNawatEvidenceRole,
                    coreClassicalOutputImport: element.dataset.andrewsCoreClassicalOutputImport,
                    executorGate: element.dataset.andrewsExecutorGenerationGate,
                    executorRouteStage: element.dataset.andrewsExecutorRouteStage,
                    executorAllowed: element.dataset.andrewsExecutorGenerationAllowed,
                    executorFormulaShellPolicy: element.dataset.andrewsExecutorFormulaShellPolicy,
                    executorSurfacePolicy: element.dataset.andrewsExecutorSurfacePolicy,
                    executorFallbackPolicy: element.dataset.andrewsExecutorFallbackPolicy,
                    elementContract: element.dataset.andrewsAuthorityElementContract,
                    expectedTag: element.dataset.andrewsAuthorityExpectedTag,
                    renderedTag: element.dataset.andrewsAuthorityRenderedTag,
                    audit: element.dataset.andrewsAuthorityAudit,
                    missing: element.dataset.andrewsAuthorityMissing,
                    diagnostics: element.dataset.andrewsAuthorityDiagnostics,
                    authorityClass: classes.has("tense-tab--andrews-authority"),
                    generationGateClass: classes.has("tense-tab--andrews-generation-gate"),
                    surfaceEvidenceClass: classes.has("tense-tab--surface-evidence-only"),
                    warningClass: classes.has("tense-tab--andrews-audit-warning"),
                };
            })()
            : {
                frameScope: panels.includes('scope: "andrews-licensed"') ? "andrews-licensed" : "missing",
                authority: panels.includes("element.dataset.andrewsTenseAuthority") ? "andrews-licensed" : "missing",
                value: panels.includes("element.dataset.andrewsTenseValue") ? "preterito" : "missing",
                logicAuthority: panels.includes('dataset.andrewsGrammarLogicAuthority = "Andrews PDF"') ? "Andrews PDF" : "missing",
                spellingRole: panels.includes('dataset.andrewsClassicalSpellingRole = "structural-only"') ? "structural-only" : "missing",
                outputBoundary: panels.includes('dataset.nawatPipilOutputBoundary = "orthography-realization"') ? "orthography-realization" : "missing",
                spellingAuthority: panels.includes('dataset.andrewsOutputSpellingAuthority = "Nawat/Pipil orthography bridge"') ? "Nawat/Pipil orthography bridge" : "missing",
                realizationPath: panels.includes('dataset.andrewsOrthographyRealizationPath = "andrews-logic-then-nawat-pipil-realization"') ? "andrews-logic-then-nawat-pipil-realization" : "missing",
                logicRole: panels.includes('logicRole: slot === "derived-stem" ? "derived-stem-logic-source" : "grammar-logic-source"') ? "grammar-logic-source" : "missing",
                generationGate: panels.includes('generationGate: "andrews-licensed-generation"') ? "andrews-licensed-generation" : "missing",
                outputRole: panels.includes('outputRole: "orthography-realization"') ? "orthography-realization" : "missing",
                evidenceRole: panels.includes('nawatEvidenceRole: "orthography-realization-only"') ? "orthography-realization-only" : "missing",
                classicalOutputImport: panels.includes('classicalOutputImport: "blocked"') ? "blocked" : "missing",
                coreAuthority: panels.includes("dataset.andrewsCoreGenerationAuthority") ? "andrews-licensed" : "missing",
                coreGenerationGate: panels.includes("dataset.andrewsCoreGenerationGate") ? "andrews-licensed-generation" : "missing",
                coreSource: panels.includes("dataset.andrewsCoreTenseSource") ? "Andrews" : "missing",
                coreSlot: panels.includes("dataset.andrewsCoreTenseSlot") ? "tns" : "missing",
                coreFamily: panels.includes("dataset.andrewsCoreTenseFamily") ? "indicative-perfective-preterit" : "missing",
                coreLogicRole: panels.includes("dataset.andrewsCoreLogicRole") ? "grammar-logic-source" : "missing",
                coreOutputRole: panels.includes("dataset.andrewsCoreOutputRole") ? "orthography-realization" : "missing",
                coreEvidenceRole: panels.includes("dataset.andrewsCoreNawatEvidenceRole") ? "orthography-realization-only" : "missing",
                coreClassicalOutputImport: panels.includes("dataset.andrewsCoreClassicalOutputImport") ? "blocked" : "missing",
                executorGate: panels.includes("dataset.andrewsExecutorGenerationGate") ? "andrews-licensed-generation" : "missing",
                executorRouteStage: panels.includes("dataset.andrewsExecutorRouteStage") ? "cnv-finite-output" : "missing",
                executorAllowed: panels.includes("dataset.andrewsExecutorGenerationAllowed") ? "true" : "missing",
                executorFormulaShellPolicy: panels.includes("dataset.andrewsExecutorFormulaShellPolicy") ? "formula-shell-allowed" : "missing",
                executorSurfacePolicy: panels.includes("dataset.andrewsExecutorSurfacePolicy") ? "orthography-bridge-required" : "missing",
                executorFallbackPolicy: panels.includes("dataset.andrewsExecutorFallbackPolicy") ? "surface-output-not-grammar-authority" : "missing",
                elementContract: panels.includes("dataset.andrewsAuthorityElementContract") ? "button.tense-tab" : "missing",
                expectedTag: panels.includes("dataset.andrewsAuthorityExpectedTag") ? "button" : "missing",
                renderedTag: panels.includes("dataset.andrewsAuthorityRenderedTag") ? "button" : "missing",
                audit: panels.includes('audit.ok ? "ok" : "diagnostic"') ? "ok" : "missing",
                missing: panels.includes("dataset.andrewsAuthorityMissing = audit.missing.join") ? "" : "missing",
                diagnostics: panels.includes("dataset.andrewsAuthorityDiagnostics = audit.diagnostics.join") ? "" : "missing",
                authorityClass: panels.includes("tense-tab--andrews-authority"),
                generationGateClass: panels.includes("tense-tab--andrews-generation-gate"),
                surfaceEvidenceClass: false,
                warningClass: false,
            },
        {
            frameScope: "andrews-licensed",
            authority: "andrews-licensed",
            value: "preterito",
            logicAuthority: "Andrews PDF",
            spellingRole: "structural-only",
            outputBoundary: "orthography-realization",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            realizationPath: "andrews-logic-then-nawat-pipil-realization",
            logicRole: "grammar-logic-source",
            generationGate: "andrews-licensed-generation",
            outputRole: "orthography-realization",
            evidenceRole: "orthography-realization-only",
            classicalOutputImport: "blocked",
            coreAuthority: "andrews-licensed",
            coreGenerationGate: "andrews-licensed-generation",
            coreSource: "Andrews",
            coreSlot: "tns",
            coreFamily: "indicative-perfective-preterit",
            coreLogicRole: "grammar-logic-source",
            coreOutputRole: "orthography-realization",
            coreEvidenceRole: "orthography-realization-only",
            coreClassicalOutputImport: "blocked",
            executorGate: "andrews-licensed-generation",
            executorRouteStage: "cnv-finite-output",
            executorAllowed: "true",
            executorFormulaShellPolicy: "formula-shell-allowed",
            executorSurfacePolicy: "orthography-bridge-required",
            executorFallbackPolicy: "surface-output-not-grammar-authority",
            elementContract: "button.tense-tab",
            expectedTag: "button",
            renderedTag: "button",
            audit: "ok",
            missing: "",
            diagnostics: "",
            authorityClass: true,
            generationGateClass: true,
            surfaceEvidenceClass: false,
            warningClass: false,
        }
    );
    s.eq(
        "selection-required tense blocks stay route gates instead of drifting into CNV core mismatch",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-block", "tense-block--selection-required"]);
                const element = {
                    tagName: "DIV",
                    dataset: {},
                    title: "",
                    querySelectorAll() {
                        return [];
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "selection-required",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    blockKind: "seleccion requerida",
                });
                return {
                    authority: element.dataset.andrewsTenseAuthority,
                    slot: element.dataset.andrewsTenseSlot,
                    gate: element.dataset.andrewsGenerationGate,
                    coreGate: element.dataset.andrewsCoreGenerationGate,
                    coreFamily: element.dataset.andrewsCoreTenseFamily,
                    executorGate: element.dataset.andrewsExecutorGenerationGate,
                    executorRouteStage: element.dataset.andrewsExecutorRouteStage,
                    elementContract: element.dataset.andrewsAuthorityElementContract,
                    expectedTag: element.dataset.andrewsAuthorityExpectedTag,
                    renderedTag: element.dataset.andrewsAuthorityRenderedTag,
                    audit: element.dataset.andrewsAuthorityAudit,
                    diagnostics: element.dataset.andrewsAuthorityDiagnostics,
                    outputGateClass: classes.has("tense-block--andrews-output-gate"),
                    unclassifiedClass: classes.has("tense-block--andrews-unclassified"),
                    warningClass: classes.has("tense-block--andrews-audit-warning"),
                };
            })()
            : {
                authority: panels.includes('scope: "andrews-output-gate"') ? "andrews-output-gate" : "missing",
                slot: panels.includes('slot: "route-selection-required"') ? "route-selection-required" : "missing",
                gate: panels.includes('generationGate: "route-selection-required"') ? "route-selection-required" : "missing",
                coreGate: panels.includes('frame.scope !== "andrews-output-gate"') ? "" : "unclassified-andrews-frame-required",
                coreFamily: panels.includes('frame.scope !== "andrews-output-gate"') ? "" : "selection-required",
                executorGate: panels.includes("dataset.andrewsExecutorGenerationGate") ? "" : "missing",
                executorRouteStage: panels.includes("dataset.andrewsExecutorRouteStage") ? "" : "missing",
                elementContract: panels.includes("dataset.andrewsAuthorityElementContract") ? "div.tense-block" : "missing",
                expectedTag: panels.includes("dataset.andrewsAuthorityExpectedTag") ? "div" : "missing",
                renderedTag: panels.includes("dataset.andrewsAuthorityRenderedTag") ? "div" : "missing",
                audit: "ok",
                diagnostics: "",
                outputGateClass: panels.includes("tense-block--andrews-output-gate"),
                unclassifiedClass: false,
                warningClass: false,
            },
        {
            authority: "andrews-output-gate",
            slot: "route-selection-required",
            gate: "route-selection-required",
            coreGate: "",
            coreFamily: "",
            executorGate: "",
            executorRouteStage: "",
            elementContract: "div.tense-block",
            expectedTag: "div",
            renderedTag: "div",
            audit: "ok",
            diagnostics: "",
            outputGateClass: true,
            unclassifiedClass: false,
            warningClass: false,
        }
    );
    s.eq(
        "Andrews-licensed tense tabs stay selectable when only surface output is missing",
        typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {},
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                const state = ctx.applyAndrewsTenseTabSelectionAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: false,
                    isAvailable: false,
                });
                return {
                    disabled: state.disabled,
                    nativeDisabled: element.disabled,
                    selectionGate: element.dataset.andrewsSelectionGate,
                    selectionDisabled: element.dataset.andrewsSelectionDisabled,
                    blocked: element.dataset.andrewsSelectionBlocked,
                    outputAvailability: element.dataset.andrewsOutputAvailability,
                    outputRole: element.dataset.andrewsOutputAvailabilityRole,
                    authority: element.dataset.andrewsSelectionAuthority,
                    logicAuthority: element.dataset.andrewsSelectionLogicAuthority,
                    grammarGate: element.dataset.andrewsSelectionGrammarGate,
                    selectionOutputRole: element.dataset.andrewsSelectionOutputRole,
                    orthographyBoundary: element.dataset.andrewsSelectionOrthographyBoundary,
                    classicalImport: element.dataset.andrewsSelectionClassicalOutputImport,
                    surfaceProbeRole: element.dataset.andrewsSelectionSurfaceProbeRole,
                    evidenceRole: element.dataset.andrewsSelectionNawatEvidenceRole,
                    allowedClass: classes.has("tense-tab--andrews-selection-allowed"),
                    blockedClass: classes.has("tense-tab--andrews-selection-blocked"),
                    pendingClass: classes.has("tense-tab--andrews-output-pending"),
                };
            })()
            : {
                disabled: panels.includes("orthography-output-probe-not-grammar-gate") ? false : true,
                nativeDisabled: panels.includes("element.disabled = state.disabled") ? false : "missing",
                selectionGate: "selectable",
                selectionDisabled: panels.includes("dataset.andrewsSelectionDisabled") ? "false" : "missing",
                blocked: "",
                outputAvailability: "surface-unavailable",
                outputRole: "orthography-output-probe-not-grammar-gate",
                authority: "Andrews PDF",
                logicAuthority: panels.includes("dataset.andrewsSelectionLogicAuthority") ? "Andrews PDF" : "missing",
                grammarGate: panels.includes("dataset.andrewsSelectionGrammarGate") ? "andrews-licensed-generation" : "missing",
                selectionOutputRole: panels.includes("dataset.andrewsSelectionOutputRole") ? "orthography-realization" : "missing",
                orthographyBoundary: panels.includes("dataset.andrewsSelectionOrthographyBoundary") ? "nawat-pipil-realization" : "missing",
                classicalImport: panels.includes("dataset.andrewsSelectionClassicalOutputImport") ? "blocked" : "missing",
                surfaceProbeRole: panels.includes("dataset.andrewsSelectionSurfaceProbeRole") ? "orthography-output-probe-not-grammar-gate" : "missing",
                evidenceRole: "orthography-output-probe-not-grammar-gate",
                allowedClass: panels.includes("tense-tab--andrews-selection-allowed"),
                blockedClass: false,
                pendingClass: panels.includes("tense-tab--andrews-output-pending"),
            },
        {
            disabled: false,
            nativeDisabled: false,
            selectionGate: "selectable",
            selectionDisabled: "false",
            blocked: "",
            outputAvailability: "surface-unavailable",
            outputRole: "orthography-output-probe-not-grammar-gate",
            authority: "Andrews PDF",
            logicAuthority: "Andrews PDF",
            grammarGate: "andrews-licensed-generation",
            selectionOutputRole: "orthography-realization",
            orthographyBoundary: "nawat-pipil-realization",
            classicalImport: "blocked",
            surfaceProbeRole: "orthography-output-probe-not-grammar-gate",
            evidenceRole: "orthography-output-probe-not-grammar-gate",
            allowedClass: true,
            blockedClass: false,
            pendingClass: true,
        }
    );
    s.eq(
        "Nawat extension tense tabs remain blocked by Andrews generation gate",
        typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {},
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                const state = ctx.applyAndrewsTenseTabSelectionAuthorityDataset(element, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                return {
                    disabled: state.disabled,
                    nativeDisabled: element.disabled,
                    selectionGate: element.dataset.andrewsSelectionGate,
                    selectionDisabled: element.dataset.andrewsSelectionDisabled,
                    blocked: element.dataset.andrewsSelectionBlocked,
                    outputAvailability: element.dataset.andrewsOutputAvailability,
                    outputRole: element.dataset.andrewsOutputAvailabilityRole,
                    logicAuthority: element.dataset.andrewsSelectionLogicAuthority,
                    grammarGate: element.dataset.andrewsSelectionGrammarGate,
                    selectionOutputRole: element.dataset.andrewsSelectionOutputRole,
                    orthographyBoundary: element.dataset.andrewsSelectionOrthographyBoundary,
                    classicalImport: element.dataset.andrewsSelectionClassicalOutputImport,
                    surfaceProbeRole: element.dataset.andrewsSelectionSurfaceProbeRole,
                    allowedClass: classes.has("tense-tab--andrews-selection-allowed"),
                    blockedClass: classes.has("tense-tab--andrews-selection-blocked"),
                    pendingClass: classes.has("tense-tab--andrews-output-pending"),
                };
            })()
            : {
                disabled: panels.includes("not-andrews-grammar-gate"),
                nativeDisabled: panels.includes("element.disabled = state.disabled"),
                selectionGate: "blocked",
                selectionDisabled: panels.includes("dataset.andrewsSelectionDisabled") ? "true" : "missing",
                blocked: "not-andrews-grammar-gate",
                outputAvailability: "surface-available",
                outputRole: "selection-hard-gate",
                logicAuthority: panels.includes("dataset.andrewsSelectionLogicAuthority") ? "Andrews PDF" : "missing",
                grammarGate: panels.includes("dataset.andrewsSelectionGrammarGate") ? "not-andrews-grammar-gate" : "missing",
                selectionOutputRole: panels.includes("dataset.andrewsSelectionOutputRole") ? "surface-evidence-only" : "missing",
                orthographyBoundary: panels.includes("dataset.andrewsSelectionOrthographyBoundary") ? "nawat-pipil-realization" : "missing",
                classicalImport: panels.includes("dataset.andrewsSelectionClassicalOutputImport") ? "blocked" : "missing",
                surfaceProbeRole: panels.includes("dataset.andrewsSelectionSurfaceProbeRole") ? "selection-hard-gate" : "missing",
                allowedClass: false,
                blockedClass: panels.includes("tense-tab--andrews-selection-blocked"),
                pendingClass: false,
            },
        {
            disabled: true,
            nativeDisabled: true,
            selectionGate: "blocked",
            selectionDisabled: "true",
            blocked: "not-andrews-grammar-gate",
            outputAvailability: "surface-available",
            outputRole: "selection-hard-gate",
            logicAuthority: "Andrews PDF",
            grammarGate: "not-andrews-grammar-gate",
            selectionOutputRole: "surface-evidence-only",
            orthographyBoundary: "nawat-pipil-realization",
            classicalImport: "blocked",
            surfaceProbeRole: "selection-hard-gate",
            allowedClass: false,
            blockedClass: true,
            pendingClass: false,
        }
    );
    s.eq(
        "tense tab selection authority syncs disabled and aria-disabled state",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            && typeof ctx.getAndrewsTenseAuthorityDatasetAuditRecord === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const attributes = {};
                const element = {
                    tagName: "BUTTON",
                    dataset: {},
                    title: "",
                    disabled: false,
                    setAttribute(name, value) {
                        attributes[name] = String(value);
                    },
                    getAttribute(name) {
                        return attributes[name] || "";
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(element, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                const synced = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                element.disabled = false;
                element.setAttribute("aria-disabled", "false");
                const stale = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                return {
                    selectionGate: element.dataset.andrewsSelectionGate,
                    selectionDisabled: element.dataset.andrewsSelectionDisabled,
                    nativeDisabledAfterSync: synced.ok ? true : element.disabled,
                    ariaDisabledAfterSync: synced.ok ? "true" : element.getAttribute("aria-disabled"),
                    syncedOk: synced.ok,
                    staleNativeDiagnostic: stale.diagnostics.includes("andrews-selection-native-disabled-mismatch"),
                    staleAriaDiagnostic: stale.diagnostics.includes("andrews-selection-aria-disabled-mismatch"),
                };
            })()
            : {
                selectionGate: "blocked",
                selectionDisabled: panels.includes("dataset.andrewsSelectionDisabled") ? "true" : "missing",
                nativeDisabledAfterSync: panels.includes("element.disabled = state.disabled"),
                ariaDisabledAfterSync: panels.includes('element.setAttribute("aria-disabled", String(state.disabled))') ? "true" : "missing",
                syncedOk: true,
                staleNativeDiagnostic: panels.includes("andrews-selection-native-disabled-mismatch"),
                staleAriaDiagnostic: panels.includes("andrews-selection-aria-disabled-mismatch"),
            },
        {
            selectionGate: "blocked",
            selectionDisabled: "true",
            nativeDisabledAfterSync: true,
            ariaDisabledAfterSync: "true",
            syncedOk: true,
            staleNativeDiagnostic: true,
            staleAriaDiagnostic: true,
        }
    );
    s.eq(
        "tense tab selection authority audits grammar gate and orthography boundary",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            && typeof ctx.getAndrewsTenseAuthorityDatasetAuditRecord === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const attributes = {};
                const element = {
                    tagName: "BUTTON",
                    dataset: {},
                    title: "",
                    disabled: false,
                    setAttribute(name, value) {
                        attributes[name] = String(value);
                    },
                    getAttribute(name) {
                        return attributes[name] || "";
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                const synced = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                element.dataset.andrewsSelectionLogicAuthority = "Nawat/Pipil evidence";
                element.dataset.andrewsSelectionGrammarGate = "not-andrews-grammar-gate";
                element.dataset.andrewsSelectionOrthographyBoundary = "";
                element.dataset.andrewsSelectionClassicalOutputImport = "allowed";
                element.dataset.andrewsSelectionSurfaceProbeRole = "surface-evidence-only";
                const stale = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                return {
                    syncedOk: synced.ok,
                    logicAuthority: synced.ok ? "Andrews PDF" : element.dataset.andrewsSelectionLogicAuthority,
                    grammarGate: synced.ok ? "andrews-licensed-generation" : element.dataset.andrewsSelectionGrammarGate,
                    outputRole: synced.ok ? "orthography-realization" : element.dataset.andrewsSelectionOutputRole,
                    orthographyBoundary: synced.ok ? "nawat-pipil-realization" : element.dataset.andrewsSelectionOrthographyBoundary,
                    classicalImport: synced.ok ? "blocked" : element.dataset.andrewsSelectionClassicalOutputImport,
                    staleLogicDiagnostic: stale.diagnostics.includes("andrews-selection-logic-authority-missing"),
                    staleGateDiagnostic: stale.diagnostics.includes("andrews-selection-grammar-gate-mismatch"),
                    staleBoundaryDiagnostic: stale.diagnostics.includes("andrews-selection-orthography-boundary-missing"),
                    staleClassicalImportDiagnostic: stale.diagnostics.includes("andrews-selection-classical-output-import-not-blocked"),
                    staleSurfaceProbeDiagnostic: stale.diagnostics.includes("andrews-selection-surface-probe-role-mismatch"),
                };
            })()
            : {
                syncedOk: true,
                logicAuthority: panels.includes("dataset.andrewsSelectionLogicAuthority") ? "Andrews PDF" : "missing",
                grammarGate: panels.includes("dataset.andrewsSelectionGrammarGate") ? "andrews-licensed-generation" : "missing",
                outputRole: panels.includes("dataset.andrewsSelectionOutputRole") ? "orthography-realization" : "missing",
                orthographyBoundary: panels.includes("dataset.andrewsSelectionOrthographyBoundary") ? "nawat-pipil-realization" : "missing",
                classicalImport: panels.includes("dataset.andrewsSelectionClassicalOutputImport") ? "blocked" : "missing",
                staleLogicDiagnostic: panels.includes("andrews-selection-logic-authority-missing"),
                staleGateDiagnostic: panels.includes("andrews-selection-grammar-gate-mismatch"),
                staleBoundaryDiagnostic: panels.includes("andrews-selection-orthography-boundary-missing"),
                staleClassicalImportDiagnostic: panels.includes("andrews-selection-classical-output-import-not-blocked"),
                staleSurfaceProbeDiagnostic: panels.includes("andrews-selection-surface-probe-role-mismatch"),
            },
        {
            syncedOk: true,
            logicAuthority: "Andrews PDF",
            grammarGate: "andrews-licensed-generation",
            outputRole: "orthography-realization",
            orthographyBoundary: "nawat-pipil-realization",
            classicalImport: "blocked",
            staleLogicDiagnostic: true,
            staleGateDiagnostic: true,
            staleBoundaryDiagnostic: true,
            staleClassicalImportDiagnostic: true,
            staleSurfaceProbeDiagnostic: true,
        }
    );
    s.eq(
        "tense tab selection audit ignores poisoned DOM mirrors as authority",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            && typeof ctx.getAndrewsTenseTabSelectionAuditRecord === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const attributes = {};
                const element = {
                    tagName: "BUTTON",
                    dataset: {},
                    title: "",
                    disabled: false,
                    setAttribute(name, value) {
                        attributes[name] = String(value);
                    },
                    getAttribute(name) {
                        return attributes[name] || "";
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(element, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                element.dataset.andrewsSelectionGate = "selectable";
                element.dataset.andrewsSelectionDisabled = "false";
                element.dataset.andrewsSelectionSelected = "true";
                element.dataset.andrewsSelectionBlocked = "";
                classes.add("is-active");
                element.disabled = false;
                element.setAttribute("aria-disabled", "false");
                element.setAttribute("aria-selected", "true");
                const record = ctx.getAndrewsTenseTabSelectionAuditRecord(element);
                return {
                    gate: record.selectionGate,
                    blocked: record.blocked,
                    selectable: record.selectable,
                    selected: record.selected,
                    ariaSelected: record.ariaSelected,
                    disabled: record.disabled,
                    nativeDisabled: record.nativeDisabled,
                    blockedSelected: record.blockedSelected,
                    gateDiagnostic: record.diagnostics.includes("andrews-selection-gate-mismatch"),
                    disabledDiagnostic: record.diagnostics.includes("andrews-selection-disabled-mismatch"),
                    selectedDiagnostic: record.diagnostics.includes("andrews-selection-selected-mismatch"),
                    activeDiagnostic: record.diagnostics.includes("andrews-selection-blocked-tab-active"),
                    ariaDiagnostic: record.diagnostics.includes("andrews-selection-blocked-tab-aria-selected"),
                    nativeDiagnostic: record.diagnostics.includes("andrews-selection-native-disabled-mismatch"),
                };
            })()
            : {
                gate: panels.includes("getAndrewsTenseTabSelectionAuditModelTarget(element)") ? "blocked" : "missing",
                blocked: panels.includes("targetFrame.blocked === true"),
                selectable: false,
                selected: false,
                ariaSelected: false,
                disabled: true,
                nativeDisabled: true,
                blockedSelected: false,
                gateDiagnostic: panels.includes("andrews-selection-gate-mismatch"),
                disabledDiagnostic: panels.includes("andrews-selection-disabled-mismatch"),
                selectedDiagnostic: panels.includes("andrews-selection-selected-mismatch"),
                activeDiagnostic: panels.includes("andrews-selection-blocked-tab-active"),
                ariaDiagnostic: panels.includes("andrews-selection-blocked-tab-aria-selected"),
                nativeDiagnostic: panels.includes("andrews-selection-native-disabled-mismatch"),
            },
        {
            gate: "blocked",
            blocked: true,
            selectable: false,
            selected: false,
            ariaSelected: false,
            disabled: true,
            nativeDisabled: true,
            blockedSelected: false,
            gateDiagnostic: true,
            disabledDiagnostic: true,
            selectedDiagnostic: true,
            activeDiagnostic: true,
            ariaDiagnostic: true,
            nativeDiagnostic: true,
        }
    );
    s.eq(
        "tense tab selection audit blocks dataset-only and contradictory target frames",
        typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            && typeof ctx.getAndrewsTenseTabSelectionAuditRecord === "function"
            ? (() => {
                const buildElement = () => {
                    const classes = new Set(["tense-tab"]);
                    const attributes = {};
                    return {
                        tagName: "BUTTON",
                        dataset: {},
                        title: "",
                        disabled: false,
                        setAttribute(name, value) {
                            attributes[name] = String(value);
                        },
                        getAttribute(name) {
                            return attributes[name] || "";
                        },
                        classList: {
                            contains(name) {
                                return classes.has(name);
                            },
                            toggle(name, enabled) {
                                if (enabled) {
                                    classes.add(name);
                                } else {
                                    classes.delete(name);
                                }
                            },
                        },
                        classes,
                    };
                };
                const datasetOnly = buildElement();
                datasetOnly.dataset.andrewsSelectionGate = "selectable";
                datasetOnly.dataset.andrewsSelectionDisabled = "false";
                datasetOnly.dataset.andrewsSelectionSelected = "true";
                datasetOnly.classes.add("is-active");
                datasetOnly.setAttribute("aria-selected", "true");
                const datasetOnlyRecord = ctx.getAndrewsTenseTabSelectionAuditRecord(datasetOnly);
                const contradictory = buildElement();
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(contradictory, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                contradictory.andrewsTenseTabSelectionAuditModel.operationFrame.targetFrame.selectionGate = "selectable";
                const contradictoryRecord = ctx.getAndrewsTenseTabSelectionAuditRecord(contradictory);
                return {
                    datasetOnlyMissing: datasetOnlyRecord.missingSelectionMetadata,
                    datasetOnlyGate: datasetOnlyRecord.selectionGate,
                    datasetOnlySelected: datasetOnlyRecord.selected,
                    datasetOnlyDiagnostic: datasetOnlyRecord.diagnostics.includes("andrews-selection-audit-operation-frame-missing"),
                    contradictoryMissing: contradictoryRecord.missingSelectionMetadata,
                    contradictoryGate: contradictoryRecord.selectionGate,
                    contradictoryDiagnostic: contradictoryRecord.diagnostics.includes("andrews-selection-audit-contradictory-target-frame"),
                };
            })()
            : {
                datasetOnlyMissing: true,
                datasetOnlyGate: "",
                datasetOnlySelected: false,
                datasetOnlyDiagnostic: panels.includes("andrews-selection-audit-operation-frame-missing"),
                contradictoryMissing: true,
                contradictoryGate: "",
                contradictoryDiagnostic: panels.includes("andrews-selection-audit-contradictory-target-frame"),
            },
        {
            datasetOnlyMissing: true,
            datasetOnlyGate: "",
            datasetOnlySelected: false,
            datasetOnlyDiagnostic: true,
            contradictoryMissing: true,
            contradictoryGate: "",
            contradictoryDiagnostic: true,
        }
    );
    s.eq(
        "tense authority DOM sync summarizes and repairs tense-tab selection audits on the root",
        typeof ctx.syncAndrewsTenseAuthorityDomAudit === "function"
            && typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            ? (() => {
                const buildElement = (tenseValue) => {
                    const classes = new Set(["tense-tab"]);
                    const attributes = {};
                    return {
                        tagName: "BUTTON",
                        dataset: { tenseValue },
                        title: "",
                        disabled: false,
                        setAttribute(name, value) {
                            attributes[name] = String(value);
                        },
                        getAttribute(name) {
                            return attributes[name] || "";
                        },
                        classList: {
                            contains(name) {
                                return classes.has(name);
                            },
                            toggle(name, enabled) {
                                if (enabled) {
                                    classes.add(name);
                                } else {
                                    classes.delete(name);
                                }
                            },
                        },
                        classes,
                    };
                };
                const allowed = buildElement("preterito");
                const blocked = buildElement("condicional");
                ctx.applyAndrewsTenseAuthorityDataset(blocked, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(blocked, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                blocked.dataset.andrewsSelectionGrammarGate = "andrews-licensed-generation";
                blocked.dataset.andrewsSelectionClassicalOutputImport = "allowed";
                blocked.dataset.andrewsSelectionSelected = "true";
                blocked.classes.add("is-active");
                blocked.disabled = false;
                blocked.setAttribute("aria-disabled", "false");
                blocked.setAttribute("aria-selected", "true");
                const tabs = [allowed, blocked];
                const root = {
                    dataset: {},
                    querySelectorAll(selector) {
                        if (selector === ".tense-tab, .tense-block" || selector === ".tense-tab") {
                            return tabs;
                        }
                        if (selector === ".tense-block") {
                            return [];
                        }
                        return [];
                    },
                };
                const audit = ctx.syncAndrewsTenseAuthorityDomAudit(root, {
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                return {
                    ok: audit.ok,
                    tabOk: audit.tabSelectionAudit.ok,
                    checked: audit.tabSelectionAudit.checked,
                    selectionAnnotated: audit.selectionAnnotated,
                    selectionRepaired: audit.selectionRepaired,
                    rootAudit: root.dataset.andrewsTabSelectionAudit,
                    rootChecked: root.dataset.andrewsTabSelectionChecked,
                    rootAnnotated: root.dataset.andrewsTabSelectionAnnotated,
                    rootRepaired: root.dataset.andrewsTabSelectionRepaired,
                    rootSelectable: root.dataset.andrewsTabSelectionSelectableCount,
                    rootBlocked: root.dataset.andrewsTabSelectionBlockedCount,
                    rootSelected: root.dataset.andrewsTabSelectionSelectedCount,
                    rootBlockedSelected: root.dataset.andrewsTabSelectionBlockedSelectedCount,
                    rootHardGate: root.dataset.andrewsTabSelectionHardGateCount,
                    rootDisabled: root.dataset.andrewsTabSelectionDisabledCount,
                    rootNativeDisabled: root.dataset.andrewsTabSelectionNativeDisabledCount,
                    rootMissing: root.dataset.andrewsTabSelectionMissingCount,
                    rootDiagnostics: root.dataset.andrewsTabSelectionDiagnosticCount,
                    rootGateMismatch: root.dataset.andrewsTabSelectionGrammarGateMismatchCount,
                    rootClassicalImportMismatch: root.dataset.andrewsTabSelectionClassicalImportNotBlockedCount,
                    rootActiveMismatch: root.dataset.andrewsTabSelectionActiveMismatchCount,
                    allowedSelectionGate: allowed.dataset.andrewsSelectionGate,
                    allowedGrammarGate: allowed.dataset.andrewsSelectionGrammarGate,
                    blockedSelectionGate: blocked.dataset.andrewsSelectionGate,
                    blockedGrammarGate: blocked.dataset.andrewsSelectionGrammarGate,
                    blockedClassicalImport: blocked.dataset.andrewsSelectionClassicalOutputImport,
                    blockedSelected: blocked.dataset.andrewsSelectionSelected,
                    blockedActive: blocked.classes.has("is-active"),
                    blockedDisabled: blocked.disabled,
                    blockedAriaDisabled: blocked.getAttribute("aria-disabled"),
                    blockedAriaSelected: blocked.getAttribute("aria-selected"),
                };
            })()
            : {
                ok: true,
                tabOk: panels.includes("summarizeAndrewsTenseTabSelectionAudit(scope)"),
                checked: panels.includes("summarizeAndrewsTenseTabSelectionAudit(scope)") ? 2 : 0,
                selectionAnnotated: panels.includes("selectionAnnotated += 1") ? 1 : 0,
                selectionRepaired: panels.includes("selectionRepaired += 1") ? 1 : 0,
                rootAudit: panels.includes("scope.dataset.andrewsTabSelectionAudit") ? "ok" : "missing",
                rootChecked: panels.includes("scope.dataset.andrewsTabSelectionChecked") ? "2" : "missing",
                rootAnnotated: panels.includes("scope.dataset.andrewsTabSelectionAnnotated") ? "1" : "missing",
                rootRepaired: panels.includes("scope.dataset.andrewsTabSelectionRepaired") ? "1" : "missing",
                rootSelectable: panels.includes("scope.dataset.andrewsTabSelectionSelectableCount") ? "1" : "missing",
                rootBlocked: panels.includes("scope.dataset.andrewsTabSelectionBlockedCount") ? "1" : "missing",
                rootSelected: panels.includes("scope.dataset.andrewsTabSelectionSelectedCount") ? "0" : "missing",
                rootBlockedSelected: panels.includes("scope.dataset.andrewsTabSelectionBlockedSelectedCount") ? "0" : "missing",
                rootHardGate: panels.includes("scope.dataset.andrewsTabSelectionHardGateCount") ? "1" : "missing",
                rootDisabled: panels.includes("scope.dataset.andrewsTabSelectionDisabledCount") ? "1" : "missing",
                rootNativeDisabled: panels.includes("scope.dataset.andrewsTabSelectionNativeDisabledCount") ? "1" : "missing",
                rootMissing: panels.includes("scope.dataset.andrewsTabSelectionMissingCount") ? "0" : "missing",
                rootDiagnostics: panels.includes("scope.dataset.andrewsTabSelectionDiagnosticCount") ? "0" : "missing",
                rootGateMismatch: panels.includes("scope.dataset.andrewsTabSelectionGrammarGateMismatchCount") ? "0" : "missing",
                rootClassicalImportMismatch: panels.includes("scope.dataset.andrewsTabSelectionClassicalImportNotBlockedCount") ? "0" : "missing",
                rootActiveMismatch: panels.includes("scope.dataset.andrewsTabSelectionActiveMismatchCount") ? "0" : "missing",
                allowedSelectionGate: "selectable",
                allowedGrammarGate: "andrews-licensed-generation",
                blockedSelectionGate: "blocked",
                blockedGrammarGate: "not-andrews-grammar-gate",
                blockedClassicalImport: "blocked",
                blockedSelected: "false",
                blockedActive: false,
                blockedDisabled: true,
                blockedAriaDisabled: "true",
                blockedAriaSelected: "false",
            },
        {
            ok: true,
            tabOk: true,
            checked: 2,
            selectionAnnotated: 1,
            selectionRepaired: 1,
            rootAudit: "ok",
            rootChecked: "2",
            rootAnnotated: "1",
            rootRepaired: "1",
            rootSelectable: "1",
            rootBlocked: "1",
            rootSelected: "0",
            rootBlockedSelected: "0",
            rootHardGate: "1",
            rootDisabled: "1",
            rootNativeDisabled: "1",
            rootMissing: "0",
            rootDiagnostics: "0",
            rootGateMismatch: "0",
            rootClassicalImportMismatch: "0",
            rootActiveMismatch: "0",
            allowedSelectionGate: "selectable",
            allowedGrammarGate: "andrews-licensed-generation",
            blockedSelectionGate: "blocked",
            blockedGrammarGate: "not-andrews-grammar-gate",
            blockedClassicalImport: "blocked",
            blockedSelected: "false",
            blockedActive: false,
            blockedDisabled: true,
            blockedAriaDisabled: "true",
            blockedAriaSelected: "false",
        }
    );
    s.eq(
        "blocked Andrews tense tabs reject stale click paths",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabClickAuthorityDataset === "function"
            && typeof ctx.isAndrewsTenseTabClickAllowed === "function"
            && typeof ctx.getAndrewsTenseAuthorityDatasetAuditRecord === "function"
            ? (() => {
                const buildElement = () => {
                    const classes = new Set(["tense-tab"]);
                    const attributes = {};
                    return {
                        tagName: "BUTTON",
                        dataset: {},
                        title: "",
                        disabled: false,
                        setAttribute(name, value) {
                            attributes[name] = String(value);
                        },
                        getAttribute(name) {
                            return attributes[name] || "";
                        },
                        classList: {
                            contains(name) {
                                return classes.has(name);
                            },
                            toggle(name, enabled) {
                                if (enabled) {
                                    classes.add(name);
                                } else {
                                    classes.delete(name);
                                }
                            },
                        },
                    };
                };
                const blocked = buildElement();
                ctx.applyAndrewsTenseAuthorityDataset(blocked, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(blocked, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                const blockedClick = ctx.applyAndrewsTenseTabClickAuthorityDataset(blocked);
                const blockedAllowed = ctx.isAndrewsTenseTabClickAllowed(blocked);
                blocked.dataset.andrewsClickGate = "allowed";
                const staleAudit = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(blocked);

                const allowed = buildElement();
                ctx.applyAndrewsTenseAuthorityDataset(allowed, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(allowed, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: false,
                });
                const allowedClick = ctx.applyAndrewsTenseTabClickAuthorityDataset(allowed);
                const allowedAllowed = ctx.isAndrewsTenseTabClickAllowed(allowed);
                return {
                    blockedClickGate: blockedClick.clickGate,
                    blockedClickAllowed: blockedAllowed,
                    blockedClickBlocked: blocked.dataset.andrewsClickBlocked,
                    blockedClickAuthority: blocked.dataset.andrewsClickAuthority,
                    staleClickDiagnostic: staleAudit.diagnostics.includes("andrews-click-gate-mismatch"),
                    allowedClickGate: allowedClick.clickGate,
                    allowedClickAllowed: allowedAllowed,
                    allowedSelectionGate: allowed.dataset.andrewsSelectionGate,
                    allowedOutputRole: allowed.dataset.andrewsOutputAvailabilityRole,
                };
            })()
            : {
                blockedClickGate: panels.includes("dataset.andrewsClickGate") ? "blocked" : "missing",
                blockedClickAllowed: panels.includes("return getAndrewsTenseTabClickAuthorityState(element).blocked !== true") ? false : "missing",
                blockedClickBlocked: panels.includes("andrews-selection-gate-blocked") ? "andrews-selection-gate-blocked|andrews-selection-disabled|not-andrews-grammar-gate" : "missing",
                blockedClickAuthority: panels.includes('dataset.andrewsClickAuthority = "Andrews PDF"') ? "Andrews PDF" : "missing",
                staleClickDiagnostic: panels.includes("andrews-click-gate-mismatch"),
                allowedClickGate: panels.includes("clickGate: blocked ? \"blocked\" : \"allowed\"") ? "allowed" : "missing",
                allowedClickAllowed: panels.includes("return getAndrewsTenseTabClickAuthorityState(element).blocked !== true"),
                allowedSelectionGate: "selectable",
                allowedOutputRole: "orthography-output-probe-not-grammar-gate",
            },
        {
            blockedClickGate: "blocked",
            blockedClickAllowed: false,
            blockedClickBlocked: "andrews-selection-gate-blocked|andrews-selection-disabled|not-andrews-grammar-gate",
            blockedClickAuthority: "Andrews PDF",
            staleClickDiagnostic: true,
            allowedClickGate: "allowed",
            allowedClickAllowed: true,
            allowedSelectionGate: "selectable",
            allowedOutputRole: "orthography-output-probe-not-grammar-gate",
        }
    );
    s.eq(
        "tense tab click authority ignores poisoned DOM mirrors and blocks no-frame click state",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            && typeof ctx.applyAndrewsTenseTabClickAuthorityDataset === "function"
            && typeof ctx.isAndrewsTenseTabClickAllowed === "function"
            ? (() => {
                const buildElement = () => {
                    const classes = new Set(["tense-tab"]);
                    const attributes = {};
                    return {
                        tagName: "BUTTON",
                        dataset: {},
                        title: "",
                        disabled: false,
                        setAttribute(name, value) {
                            attributes[name] = String(value);
                        },
                        getAttribute(name) {
                            return attributes[name] || "";
                        },
                        classList: {
                            contains(name) {
                                return classes.has(name);
                            },
                            toggle(name, enabled) {
                                if (enabled) {
                                    classes.add(name);
                                } else {
                                    classes.delete(name);
                                }
                            },
                        },
                    };
                };
                const allowed = buildElement();
                ctx.applyAndrewsTenseAuthorityDataset(allowed, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(allowed, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                allowed.dataset.andrewsSelectionGate = "blocked";
                allowed.dataset.andrewsSelectionDisabled = "true";
                allowed.disabled = true;
                allowed.setAttribute("aria-disabled", "true");
                const poisonedClick = ctx.applyAndrewsTenseTabClickAuthorityDataset(allowed);
                const poisonedAllowed = ctx.isAndrewsTenseTabClickAllowed(allowed);

                const datasetOnly = buildElement();
                datasetOnly.dataset.andrewsSelectionGate = "selectable";
                datasetOnly.dataset.andrewsSelectionDisabled = "false";
                datasetOnly.dataset.andrewsClickGate = "allowed";
                const datasetOnlyClick = ctx.applyAndrewsTenseTabClickAuthorityDataset(datasetOnly);
                const datasetOnlyAllowed = ctx.isAndrewsTenseTabClickAllowed(datasetOnly);

                const contradictory = buildElement();
                ctx.applyAndrewsTenseTabSelectionAuthorityDataset(contradictory, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    hasOutput: true,
                });
                contradictory.andrewsTenseTabSelectionAuditModel.operationFrame.targetFrame.selectionGate = "blocked";
                const contradictoryClick = ctx.applyAndrewsTenseTabClickAuthorityDataset(contradictory);
                return {
                    poisonedClickGate: poisonedClick.clickGate,
                    poisonedAllowed,
                    poisonedBlocked: allowed.dataset.andrewsClickBlocked,
                    clickModel: allowed.andrewsTenseTabClickAuthorityModel?.operationFrame?.operation || "",
                    datasetOnlyClickGate: datasetOnlyClick.clickGate,
                    datasetOnlyAllowed,
                    datasetOnlyBlocked: datasetOnly.dataset.andrewsClickBlocked,
                    contradictoryClickGate: contradictoryClick.clickGate,
                    contradictoryBlocked: contradictory.dataset.andrewsClickBlocked,
                };
            })()
            : {
                poisonedClickGate: panels.includes("buildAndrewsTenseTabClickAuthorityModel") ? "allowed" : "missing",
                poisonedAllowed: panels.includes("getAndrewsTenseTabSelectionAuditModelTarget(element)"),
                poisonedBlocked: "",
                clickModel: panels.includes("authorize-tense-tab-click-from-selection-target-frame")
                    ? "authorize-tense-tab-click-from-selection-target-frame"
                    : "",
                datasetOnlyClickGate: "blocked",
                datasetOnlyAllowed: false,
                datasetOnlyBlocked: panels.includes("andrews-selection-audit-operation-frame-missing")
                    ? "andrews-selection-audit-operation-frame-missing"
                    : "missing",
                contradictoryClickGate: "blocked",
                contradictoryBlocked: panels.includes("andrews-selection-audit-contradictory-target-frame")
                    ? "andrews-selection-audit-contradictory-target-frame"
                    : "missing",
            },
        {
            poisonedClickGate: "allowed",
            poisonedAllowed: true,
            poisonedBlocked: "",
            clickModel: "authorize-tense-tab-click-from-selection-target-frame",
            datasetOnlyClickGate: "blocked",
            datasetOnlyAllowed: false,
            datasetOnlyBlocked: "andrews-selection-audit-operation-frame-missing",
            contradictoryClickGate: "blocked",
            contradictoryBlocked: "andrews-selection-audit-contradictory-target-frame",
        }
    );
    s.eq(
        "blocked Andrews tense-block audits reject generated rows",
        typeof ctx.applyAndrewsTenseBlockOutputAuditDataset === "function"
            && typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-block", "tense-block--cnv-generation-gate-blocked"]);
                const element = {
                    tagName: "DIV",
                    dataset: {},
                    title: "",
                    querySelectorAll(selector) {
                        if (selector === ".conjugation-row") {
                            return [makeAndrewsBlockRowAuditModel({
                                grammarRouteFamily: "vnc",
                                grammarRouteStage: "andrews-cnv-tense-logic-gate",
                                grammarGenerationAllowed: "false",
                                grammarDiagnosticId: "not-andrews-grammar-gate",
                            })];
                        }
                        if (selector === ".tense-placeholder") {
                            return [];
                        }
                        return [];
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "condicional",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    blockKind: "CNV generation gate blocked",
                });
                const blockAudit = ctx.applyAndrewsTenseBlockOutputAuditDataset(element);
                const authorityAudit = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                return {
                    authority: element.dataset.andrewsTenseAuthority,
                    generationGate: element.dataset.andrewsGenerationGate,
                    executorGate: element.dataset.andrewsExecutorGenerationGate,
                    executorRouteStage: element.dataset.andrewsExecutorRouteStage,
                    executorAllowed: element.dataset.andrewsExecutorGenerationAllowed,
                    executorFormulaShellPolicy: element.dataset.andrewsExecutorFormulaShellPolicy,
                    executorSurfacePolicy: element.dataset.andrewsExecutorSurfacePolicy,
                    executorFallbackPolicy: element.dataset.andrewsExecutorFallbackPolicy,
                    outputScope: element.dataset.andrewsBlockOutputScope,
                    outputAudit: element.dataset.andrewsBlockOutputAudit,
                    rowCount: element.dataset.andrewsBlockOutputRowCount,
                    routeFamilies: element.dataset.andrewsBlockRouteFamilies,
                    routeStages: element.dataset.andrewsBlockRouteStages,
                    routeDiagnostics: element.dataset.andrewsBlockRouteDiagnosticIds,
                    allowedRouteRows: element.dataset.andrewsBlockRouteGenerationAllowedCount,
                    blockedRouteRows: element.dataset.andrewsBlockRouteGenerationBlockedRowCount,
                    blockDiagnostic: blockAudit.diagnostics.join("|"),
                    authorityOk: authorityAudit.ok,
                    authorityDiagnostic: authorityAudit.diagnostics.includes("blocked-andrews-generation-block-has-output-rows"),
                    warningClass: classes.has("tense-block--andrews-audit-warning"),
                    blockedClass: classes.has("tense-block--andrews-output-blocked"),
                    generatedClass: classes.has("tense-block--andrews-output-generated"),
                    leakClass: classes.has("tense-block--andrews-output-leak-diagnostic"),
                };
            })()
            : {
                authority: panels.includes('scope: "nawat-extension"') ? "nawat-extension" : "missing",
                generationGate: panels.includes('generationGate: "not-andrews-grammar-gate"') ? "not-andrews-grammar-gate" : "missing",
                executorGate: panels.includes("dataset.andrewsExecutorGenerationGate") ? "not-andrews-grammar-gate" : "missing",
                executorRouteStage: panels.includes("dataset.andrewsExecutorRouteStage") ? "andrews-cnv-tense-logic-gate" : "missing",
                executorAllowed: panels.includes("dataset.andrewsExecutorGenerationAllowed") ? "false" : "missing",
                executorFormulaShellPolicy: panels.includes("blocked-before-formula-shell") ? "blocked-before-formula-shell" : "missing",
                executorSurfacePolicy: panels.includes("blocked-before-surface") ? "blocked-before-surface" : "missing",
                executorFallbackPolicy: panels.includes("blocked-no-target-stem-fallback") ? "blocked-no-target-stem-fallback" : "missing",
                outputScope: panels.includes('outputScope = !isBlock') ? "blocked-output" : "missing",
                outputAudit: panels.includes("dataset.andrewsBlockOutputAudit") ? "diagnostic" : "missing",
                rowCount: panels.includes("dataset.andrewsBlockOutputRowCount") ? "1" : "missing",
                routeFamilies: panels.includes("dataset.andrewsBlockRouteFamilies") ? "vnc" : "missing",
                routeStages: panels.includes("dataset.andrewsBlockRouteStages") ? "andrews-cnv-tense-logic-gate" : "missing",
                routeDiagnostics: panels.includes("dataset.andrewsBlockRouteDiagnosticIds") ? "not-andrews-grammar-gate" : "missing",
                allowedRouteRows: panels.includes("dataset.andrewsBlockRouteGenerationAllowedCount") ? "0" : "missing",
                blockedRouteRows: panels.includes("dataset.andrewsBlockRouteGenerationBlockedRowCount") ? "1" : "missing",
                blockDiagnostic: panels.includes("blocked-andrews-generation-block-has-output-rows")
                    ? "blocked-andrews-generation-block-has-output-rows"
                    : "missing",
                authorityOk: false,
                authorityDiagnostic: panels.includes("blocked-andrews-generation-block-has-output-rows"),
                warningClass: panels.includes("tense-block--andrews-audit-warning"),
                blockedClass: panels.includes("tense-block--andrews-output-blocked"),
                generatedClass: false,
                leakClass: panels.includes("tense-block--andrews-output-leak-diagnostic"),
            },
        {
            authority: "nawat-extension",
            generationGate: "not-andrews-grammar-gate",
            executorGate: "not-andrews-grammar-gate",
            executorRouteStage: "andrews-cnv-tense-logic-gate",
            executorAllowed: "false",
            executorFormulaShellPolicy: "blocked-before-formula-shell",
            executorSurfacePolicy: "blocked-before-surface",
            executorFallbackPolicy: "blocked-no-target-stem-fallback",
            outputScope: "blocked-output",
            outputAudit: "diagnostic",
            rowCount: "1",
            routeFamilies: "vnc",
            routeStages: "andrews-cnv-tense-logic-gate",
            routeDiagnostics: "not-andrews-grammar-gate",
            allowedRouteRows: "0",
            blockedRouteRows: "1",
            blockDiagnostic: "blocked-andrews-generation-block-has-output-rows",
            authorityOk: false,
            authorityDiagnostic: true,
            warningClass: true,
            blockedClass: true,
            generatedClass: false,
            leakClass: true,
        }
    );
    s.eq(
        "tense-block output audit ignores DOM dataset strings as row authority",
        typeof ctx.applyAndrewsTenseBlockOutputAuditDataset === "function"
            && typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const makeElement = (row) => {
                    const classes = new Set(["tense-block"]);
                    return {
                        tagName: "DIV",
                        dataset: {},
                        title: "",
                        querySelectorAll(selector) {
                            if (selector === ".conjugation-row") {
                                return [row];
                            }
                            if (selector === ".tense-placeholder") {
                                return [];
                            }
                            return [];
                        },
                        classList: {
                            contains(name) {
                                return classes.has(name);
                            },
                            toggle(name, enabled) {
                                if (enabled) {
                                    classes.add(name);
                                } else {
                                    classes.delete(name);
                                }
                            },
                        },
                        classes,
                    };
                };
                const datasetOnlyElement = makeElement({
                    dataset: {
                        grammarRouteFamily: "vnc",
                        grammarRouteStage: "execute",
                        grammarGenerationAllowed: "true",
                        grammarLogicAuthority: "Andrews",
                        grammarResultOk: "true",
                    },
                });
                ctx.applyAndrewsTenseAuthorityDataset(datasetOnlyElement, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                const datasetOnlyAudit = ctx.applyAndrewsTenseBlockOutputAuditDataset(datasetOnlyElement);
                const poisonedDatasetElement = makeElement(makeAndrewsBlockRowAuditModel({
                    grammarRouteFamily: "vnc",
                    grammarRouteStage: "execute",
                    grammarGenerationAllowed: "true",
                    grammarLogicAuthority: "Andrews",
                    grammarSpellingEvidenceRole: "orthography-realization-only",
                    grammarClassicalSpellingRole: "structural-only",
                    grammarOrthographyBoundary: "nawat-pipil-realization",
                    grammarSpellingAuthority: "Nawat/Pipil orthography bridge",
                    grammarClassicalSurfaceImport: "blocked",
                    grammarResultOk: "true",
                    grammarSourceContextTargetAuthority: "Andrews source frame",
                    grammarSourceEvidenceTargetAuthority: "Andrews source frame",
                }, {
                    dataset: {
                        grammarRouteFamily: "",
                        grammarRouteStage: "andrews-cnv-tense-logic-gate",
                        grammarGenerationAllowed: "false",
                        grammarLogicAuthority: "Nawat/Pipil generated output",
                        grammarResultOk: "false",
                    },
                }));
                ctx.applyAndrewsTenseAuthorityDataset(poisonedDatasetElement, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                const poisonedDatasetAudit = ctx.applyAndrewsTenseBlockOutputAuditDataset(poisonedDatasetElement);
                return {
                    datasetOnly: {
                        routeFamilies: datasetOnlyElement.dataset.andrewsBlockRouteFamilies,
                        allowedRows: datasetOnlyElement.dataset.andrewsBlockRouteGenerationAllowedCount,
                        missingContracts: datasetOnlyElement.dataset.andrewsBlockRowRouteContractMissingCount,
                        diagnostics: datasetOnlyAudit.diagnostics.join("|"),
                    },
                    poisonedDataset: {
                        routeFamilies: poisonedDatasetElement.dataset.andrewsBlockRouteFamilies,
                        routeStages: poisonedDatasetElement.dataset.andrewsBlockRouteStages,
                        allowedRows: poisonedDatasetElement.dataset.andrewsBlockRouteGenerationAllowedCount,
                        missingContracts: poisonedDatasetElement.dataset.andrewsBlockRowRouteContractMissingCount,
                        diagnostics: poisonedDatasetAudit.diagnostics.join("|"),
                    },
                };
            })()
            : {
                datasetOnly: {
                    routeFamilies: "",
                    allowedRows: "0",
                    missingContracts: "1",
                    diagnostics: "output-row-missing-andrews-route-contract",
                },
                poisonedDataset: {
                    routeFamilies: "vnc",
                    routeStages: "execute",
                    allowedRows: "1",
                    missingContracts: "0",
                    diagnostics: "",
                },
            },
        {
            datasetOnly: {
                routeFamilies: "",
                allowedRows: "0",
                missingContracts: "1",
                diagnostics: "output-row-missing-andrews-route-contract",
            },
            poisonedDataset: {
                routeFamilies: "vnc",
                routeStages: "execute",
                allowedRows: "1",
                missingContracts: "0",
                diagnostics: "",
            },
        }
    );
    s.eq(
        "tense-block output audit rejects rows without Andrews route contracts",
        typeof ctx.applyAndrewsTenseBlockOutputAuditDataset === "function"
            && typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-block"]);
                const element = {
                    tagName: "DIV",
                    dataset: {},
                    title: "",
                    querySelectorAll(selector) {
                        if (selector === ".conjugation-row") {
                            return [makeAndrewsBlockRowAuditModel({
                                grammarLogicAuthority: "Andrews",
                                grammarSpellingEvidenceRole: "orthography-realization-only",
                                grammarClassicalSpellingRole: "structural-only",
                                grammarOrthographyBoundary: "nawat-pipil-realization",
                                grammarSpellingAuthority: "Nawat/Pipil orthography bridge",
                                grammarClassicalSurfaceImport: "blocked",
                                grammarResultOk: "true",
                            })];
                        }
                        if (selector === ".tense-placeholder") {
                            return [];
                        }
                        return [];
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                const blockAudit = ctx.applyAndrewsTenseBlockOutputAuditDataset(element);
                const authorityAudit = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                return {
                    outputScope: element.dataset.andrewsBlockOutputScope,
                    outputAudit: element.dataset.andrewsBlockOutputAudit,
                    routeFamilies: element.dataset.andrewsBlockRouteFamilies,
                    routeStages: element.dataset.andrewsBlockRouteStages,
                    allowedRouteRows: element.dataset.andrewsBlockRouteGenerationAllowedCount,
                    rowRouteContractMissingCount: element.dataset.andrewsBlockRowRouteContractMissingCount,
                    blockDiagnostic: blockAudit.diagnostics.join("|"),
                    authorityDiagnostic: authorityAudit.diagnostics.includes("output-row-missing-andrews-route-contract"),
                    leakClass: classes.has("tense-block--andrews-output-leak-diagnostic"),
                    warningClass: classes.has("tense-block--andrews-audit-warning"),
                };
            })()
            : {
                outputScope: "andrews-generated-output",
                outputAudit: panels.includes("output-row-missing-andrews-route-contract") ? "diagnostic" : "missing",
                routeFamilies: "",
                routeStages: "",
                allowedRouteRows: "0",
                rowRouteContractMissingCount: panels.includes("dataset.andrewsBlockRowRouteContractMissingCount") ? "1" : "missing",
                blockDiagnostic: panels.includes("output-row-missing-andrews-route-contract")
                    ? "output-row-missing-andrews-route-contract|blocked-andrews-route-row-result-ok"
                    : "missing",
                authorityDiagnostic: panels.includes("output-row-missing-andrews-route-contract"),
                leakClass: panels.includes("tense-block--andrews-output-leak-diagnostic"),
                warningClass: panels.includes("tense-block--andrews-audit-warning"),
            },
        {
            outputScope: "andrews-generated-output",
            outputAudit: "diagnostic",
            routeFamilies: "",
            routeStages: "",
            allowedRouteRows: "0",
            rowRouteContractMissingCount: "1",
            blockDiagnostic: "output-row-missing-andrews-route-contract|blocked-andrews-route-row-result-ok",
            authorityDiagnostic: true,
            leakClass: true,
            warningClass: true,
        }
    );
    s.eq(
        "tense-block output audit rejects blocked route rows that still report successful results",
        typeof ctx.applyAndrewsTenseBlockOutputAuditDataset === "function"
            && typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-block"]);
                const element = {
                    tagName: "DIV",
                    dataset: {},
                    title: "",
                    querySelectorAll(selector) {
                        if (selector === ".conjugation-row") {
                            return [makeAndrewsBlockRowAuditModel({
                                grammarRouteFamily: "vnc",
                                grammarRouteStage: "andrews-cnv-tense-logic-gate",
                                grammarGenerationAllowed: "false",
                                grammarDiagnosticId: "not-andrews-grammar-gate",
                                grammarResultOk: "true",
                            })];
                        }
                        if (selector === ".tense-placeholder") {
                            return [];
                        }
                        return [];
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                const blockAudit = ctx.applyAndrewsTenseBlockOutputAuditDataset(element);
                const authorityAudit = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                return {
                    outputScope: element.dataset.andrewsBlockOutputScope,
                    outputAudit: element.dataset.andrewsBlockOutputAudit,
                    blockedRouteRows: element.dataset.andrewsBlockRouteGenerationBlockedRowCount,
                    blockedResultOkRows: element.dataset.andrewsBlockRouteBlockedResultOkCount,
                    blockDiagnostic: blockAudit.diagnostics.join("|"),
                    authorityDiagnostic: authorityAudit.diagnostics.includes("blocked-andrews-route-row-result-ok"),
                    leakClass: classes.has("tense-block--andrews-output-leak-diagnostic"),
                    warningClass: classes.has("tense-block--andrews-audit-warning"),
                };
            })()
            : {
                outputScope: "andrews-generated-output",
                outputAudit: panels.includes("blocked-andrews-route-row-result-ok") ? "diagnostic" : "missing",
                blockedRouteRows: panels.includes("dataset.andrewsBlockRouteGenerationBlockedRowCount") ? "1" : "missing",
                blockedResultOkRows: panels.includes("dataset.andrewsBlockRouteBlockedResultOkCount") ? "1" : "missing",
                blockDiagnostic: panels.includes("blocked-andrews-route-row-result-ok")
                    ? "blocked-andrews-route-row-result-ok"
                    : "missing",
                authorityDiagnostic: panels.includes("blocked-andrews-route-row-result-ok"),
                leakClass: panels.includes("tense-block--andrews-output-leak-diagnostic"),
                warningClass: panels.includes("tense-block--andrews-audit-warning"),
            },
        {
            outputScope: "andrews-generated-output",
            outputAudit: "diagnostic",
            blockedRouteRows: "1",
            blockedResultOkRows: "1",
            blockDiagnostic: "blocked-andrews-route-row-result-ok",
            authorityDiagnostic: true,
            leakClass: true,
            warningClass: true,
        }
    );
    s.eq(
        "generated tense-block rows cannot use Nawat/Pipil source evidence as grammar authority",
        typeof ctx.applyAndrewsTenseBlockOutputAuditDataset === "function"
            && typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-block"]);
                const element = {
                    tagName: "DIV",
                    dataset: {},
                    title: "",
                    querySelectorAll(selector) {
                        if (selector === ".conjugation-row") {
                            return [makeAndrewsBlockRowAuditModel({
                                grammarRouteFamily: "vnc",
                                grammarRouteStage: "execute",
                                grammarGenerationAllowed: "true",
                                grammarLogicAuthority: "Andrews",
                                grammarSpellingEvidenceRole: "orthography-realization-only",
                                grammarClassicalSpellingRole: "structural-only",
                                grammarOrthographyBoundary: "nawat-pipil-realization",
                                grammarSpellingAuthority: "Nawat/Pipil orthography bridge",
                                grammarClassicalSurfaceImport: "blocked",
                                grammarResultOk: "true",
                                grammarSourceContextTargetAuthority: "Nawat/Pipil generated output supplied to this frame",
                                grammarSourceEvidenceTargetAuthority: "Modern Nawat/Pipil orthography",
                            })];
                        }
                        if (selector === ".tense-placeholder") {
                            return [];
                        }
                        return [];
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                const blockAudit = ctx.applyAndrewsTenseBlockOutputAuditDataset(element);
                const authorityAudit = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                return {
                    outputScope: element.dataset.andrewsBlockOutputScope,
                    outputAudit: element.dataset.andrewsBlockOutputAudit,
                    sourceContextAuthorities: element.dataset.andrewsBlockRowSourceContextAuthorities,
                    sourceEvidenceAuthorities: element.dataset.andrewsBlockRowSourceEvidenceAuthorities,
                    sourceContextMismatchCount: element.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount,
                    sourceEvidenceMismatchCount: element.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount,
                    blockDiagnostic: blockAudit.diagnostics.join("|"),
                    authorityDiagnosticContext: authorityAudit.diagnostics.includes("generated-row-source-context-authority-not-andrews"),
                    authorityDiagnosticEvidence: authorityAudit.diagnostics.includes("generated-row-source-evidence-authority-not-andrews"),
                    authorityLeakClass: classes.has("tense-block--andrews-authority-leak-diagnostic"),
                    warningClass: classes.has("tense-block--andrews-audit-warning"),
                };
            })()
            : {
                outputScope: "andrews-generated-output",
                outputAudit: panels.includes("generated-row-source-evidence-authority-not-andrews") ? "diagnostic" : "missing",
                sourceContextAuthorities: "Nawat/Pipil generated output supplied to this frame",
                sourceEvidenceAuthorities: "Modern Nawat/Pipil orthography",
                sourceContextMismatchCount: panels.includes("dataset.andrewsBlockRowSourceContextAuthorityMismatchCount") ? "1" : "missing",
                sourceEvidenceMismatchCount: panels.includes("dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount") ? "1" : "missing",
                blockDiagnostic: panels.includes("generated-row-source-evidence-authority-not-andrews")
                    ? "generated-row-source-context-authority-not-andrews|generated-row-source-evidence-authority-not-andrews"
                    : "missing",
                authorityDiagnosticContext: panels.includes("generated-row-source-context-authority-not-andrews"),
                authorityDiagnosticEvidence: panels.includes("generated-row-source-evidence-authority-not-andrews"),
                authorityLeakClass: panels.includes("tense-block--andrews-authority-leak-diagnostic"),
                warningClass: panels.includes("tense-block--andrews-audit-warning"),
            },
        {
            outputScope: "andrews-generated-output",
            outputAudit: "diagnostic",
            sourceContextAuthorities: "Nawat/Pipil generated output supplied to this frame",
            sourceEvidenceAuthorities: "Modern Nawat/Pipil orthography",
            sourceContextMismatchCount: "1",
            sourceEvidenceMismatchCount: "1",
            blockDiagnostic: "generated-row-source-context-authority-not-andrews|generated-row-source-evidence-authority-not-andrews",
            authorityDiagnosticContext: true,
            authorityDiagnosticEvidence: true,
            authorityLeakClass: true,
            warningClass: true,
        }
    );
    s.eq(
        "generated tense-block rows must expose Andrews authority and Nawat/Pipil orthography boundary",
        typeof ctx.applyAndrewsTenseBlockOutputAuditDataset === "function"
            && typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-block"]);
                const element = {
                    tagName: "DIV",
                    dataset: {},
                    querySelectorAll(selector) {
                        if (selector === ".conjugation-row") {
                            return [makeAndrewsBlockRowAuditModel({
                                grammarRouteFamily: "vnc",
                                grammarRouteStage: "andrews-cnv-tense-logic-gate",
                                grammarGenerationAllowed: "true",
                                grammarDiagnosticId: "not-andrews-grammar-gate",
                                grammarClassicalSurfaceImport: "allowed",
                            })];
                        }
                        if (selector === ".tense-placeholder") {
                            return [];
                        }
                        return [];
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                const blockAudit = ctx.applyAndrewsTenseBlockOutputAuditDataset(element);
                const authorityAudit = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                return {
                    outputScope: element.dataset.andrewsBlockOutputScope,
                    outputAudit: element.dataset.andrewsBlockOutputAudit,
                    rowLogicAuthorities: element.dataset.andrewsBlockRowLogicAuthorities,
                    rowSpellingEvidenceRoles: element.dataset.andrewsBlockRowSpellingEvidenceRoles,
                    rowClassicalSpellingRoles: element.dataset.andrewsBlockRowClassicalSpellingRoles,
                    rowOrthographyBoundaries: element.dataset.andrewsBlockRowOrthographyBoundaries,
                    rowSpellingAuthorities: element.dataset.andrewsBlockRowSpellingAuthorities,
                    rowClassicalImports: element.dataset.andrewsBlockRowClassicalImports,
                    rowResultStates: element.dataset.andrewsBlockRowResultStates,
                    missingLogicAuthorityCount: element.dataset.andrewsBlockRowLogicAuthorityMissingCount,
                    spellingEvidenceRoleMismatchCount: element.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount,
                    classicalSpellingRoleMismatchCount: element.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount,
                    blockedRouteContractCount: element.dataset.andrewsBlockRouteGeneratedBlockedContractCount,
                    resultNotOkCount: element.dataset.andrewsBlockRouteGeneratedResultNotOkCount,
                    missingBoundaryCount: element.dataset.andrewsBlockRowOrthographyBoundaryMissingCount,
                    spellingAuthorityMismatchCount: element.dataset.andrewsBlockRowSpellingAuthorityMismatchCount,
                    importNotBlockedCount: element.dataset.andrewsBlockRowClassicalImportNotBlockedCount,
                    blockDiagnostic: blockAudit.diagnostics.join("|"),
                    authorityDiagnosticBlockedRoute: authorityAudit.diagnostics.includes("generated-row-uses-blocked-andrews-route-contract"),
                    authorityDiagnosticResult: authorityAudit.diagnostics.includes("generated-row-result-not-ok"),
                    authorityDiagnosticLogic: authorityAudit.diagnostics.includes("generated-row-missing-andrews-logic-authority"),
                    authorityDiagnosticEvidenceRole: authorityAudit.diagnostics.includes("generated-row-spelling-evidence-role-mismatch"),
                    authorityDiagnosticClassicalRole: authorityAudit.diagnostics.includes("generated-row-classical-spelling-role-not-structural-only"),
                    authorityDiagnosticBoundary: authorityAudit.diagnostics.includes("generated-row-missing-nawat-pipil-orthography-boundary"),
                    authorityDiagnosticSpellingAuthority: authorityAudit.diagnostics.includes("generated-row-spelling-authority-not-nawat-pipil"),
                    authorityDiagnosticImport: authorityAudit.diagnostics.includes("generated-row-classical-output-import-not-blocked"),
                    generatedClass: classes.has("tense-block--andrews-output-generated"),
                    authorityLeakClass: classes.has("tense-block--andrews-authority-leak-diagnostic"),
                    orthographyLeakClass: classes.has("tense-block--andrews-orthography-leak-diagnostic"),
                    warningClass: classes.has("tense-block--andrews-audit-warning"),
                };
            })()
            : {
                outputScope: "andrews-generated-output",
                outputAudit: panels.includes("generated-row-missing-nawat-pipil-orthography-boundary") ? "diagnostic" : "missing",
                rowLogicAuthorities: "",
                rowSpellingEvidenceRoles: "",
                rowClassicalSpellingRoles: "",
                rowOrthographyBoundaries: "",
                rowSpellingAuthorities: "",
                rowClassicalImports: panels.includes("dataset.andrewsBlockRowClassicalImports") ? "allowed" : "missing",
                rowResultStates: "false",
                missingLogicAuthorityCount: panels.includes("dataset.andrewsBlockRowLogicAuthorityMissingCount") ? "1" : "missing",
                spellingEvidenceRoleMismatchCount: panels.includes("dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount") ? "1" : "missing",
                classicalSpellingRoleMismatchCount: panels.includes("dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount") ? "1" : "missing",
                blockedRouteContractCount: panels.includes("dataset.andrewsBlockRouteGeneratedBlockedContractCount") ? "1" : "missing",
                resultNotOkCount: panels.includes("dataset.andrewsBlockRouteGeneratedResultNotOkCount") ? "1" : "missing",
                missingBoundaryCount: panels.includes("dataset.andrewsBlockRowOrthographyBoundaryMissingCount") ? "1" : "missing",
                spellingAuthorityMismatchCount: panels.includes("dataset.andrewsBlockRowSpellingAuthorityMismatchCount") ? "1" : "missing",
                importNotBlockedCount: panels.includes("dataset.andrewsBlockRowClassicalImportNotBlockedCount") ? "1" : "missing",
                blockDiagnostic: panels.includes("generated-row-classical-output-import-not-blocked")
                    ? "generated-row-uses-blocked-andrews-route-contract|generated-row-result-not-ok|generated-row-missing-andrews-logic-authority|generated-row-spelling-evidence-role-mismatch|generated-row-classical-spelling-role-not-structural-only|generated-row-missing-nawat-pipil-orthography-boundary|generated-row-spelling-authority-not-nawat-pipil|generated-row-classical-output-import-not-blocked"
                    : "missing",
                authorityDiagnosticBlockedRoute: panels.includes("generated-row-uses-blocked-andrews-route-contract"),
                authorityDiagnosticResult: panels.includes("generated-row-result-not-ok"),
                authorityDiagnosticLogic: panels.includes("generated-row-missing-andrews-logic-authority"),
                authorityDiagnosticEvidenceRole: panels.includes("generated-row-spelling-evidence-role-mismatch"),
                authorityDiagnosticClassicalRole: panels.includes("generated-row-classical-spelling-role-not-structural-only"),
                authorityDiagnosticBoundary: panels.includes("generated-row-missing-nawat-pipil-orthography-boundary"),
                authorityDiagnosticSpellingAuthority: panels.includes("generated-row-spelling-authority-not-nawat-pipil"),
                authorityDiagnosticImport: panels.includes("generated-row-classical-output-import-not-blocked"),
                generatedClass: panels.includes("tense-block--andrews-output-generated"),
                authorityLeakClass: panels.includes("tense-block--andrews-authority-leak-diagnostic"),
                orthographyLeakClass: panels.includes("tense-block--andrews-orthography-leak-diagnostic"),
                warningClass: panels.includes("tense-block--andrews-audit-warning"),
            },
        {
            outputScope: "andrews-generated-output",
            outputAudit: "diagnostic",
            rowLogicAuthorities: "",
            rowSpellingEvidenceRoles: "",
            rowClassicalSpellingRoles: "",
            rowOrthographyBoundaries: "",
            rowSpellingAuthorities: "",
            rowClassicalImports: "allowed",
            rowResultStates: "false",
            missingLogicAuthorityCount: "1",
            spellingEvidenceRoleMismatchCount: "1",
            classicalSpellingRoleMismatchCount: "1",
            blockedRouteContractCount: "1",
            resultNotOkCount: "1",
            missingBoundaryCount: "1",
            spellingAuthorityMismatchCount: "1",
            importNotBlockedCount: "1",
            blockDiagnostic: "generated-row-uses-blocked-andrews-route-contract|generated-row-result-not-ok|generated-row-missing-andrews-logic-authority|generated-row-spelling-evidence-role-mismatch|generated-row-classical-spelling-role-not-structural-only|generated-row-missing-nawat-pipil-orthography-boundary|generated-row-spelling-authority-not-nawat-pipil|generated-row-classical-output-import-not-blocked",
            authorityDiagnosticBlockedRoute: true,
            authorityDiagnosticResult: true,
            authorityDiagnosticLogic: true,
            authorityDiagnosticEvidenceRole: true,
            authorityDiagnosticClassicalRole: true,
            authorityDiagnosticBoundary: true,
            authorityDiagnosticSpellingAuthority: true,
            authorityDiagnosticImport: true,
            generatedClass: true,
            authorityLeakClass: true,
            orthographyLeakClass: true,
            warningClass: true,
        }
    );
    s.eq(
        "tense authority DOM sync summarizes Andrews tense-block output audits on the root",
        typeof ctx.syncAndrewsTenseAuthorityDomAudit === "function"
            ? (() => {
                const makeBlock = ({ tenseValue, rowCount = 0, placeholderCount = 0, rowDataset = {} }) => {
                    const classes = new Set(["tense-block"]);
                    return {
                        tagName: "DIV",
                        dataset: { tenseValue },
                        title: "",
                        querySelectorAll(selector) {
                        if (selector === ".conjugation-row") {
                                return Array.from({ length: rowCount }, () => (
                                    makeAndrewsBlockRowAuditModel(rowDataset)
                                ));
                        }
                            if (selector === ".tense-placeholder") {
                                return Array.from({ length: placeholderCount }, () => ({}));
                            }
                            return [];
                        },
                        classList: {
                            contains(name) {
                                return classes.has(name);
                            },
                            toggle(name, enabled) {
                                if (enabled) {
                                    classes.add(name);
                                } else {
                                    classes.delete(name);
                                }
                            },
                        },
                        classes,
                    };
                };
                const blockedBlock = makeBlock({
                    tenseValue: "condicional",
                    rowCount: 1,
                    rowDataset: {
                        grammarRouteFamily: "vnc",
                        grammarRouteStage: "andrews-cnv-tense-logic-gate",
                        grammarGenerationAllowed: "false",
                        grammarDiagnosticId: "not-andrews-grammar-gate",
                    },
                });
                const licensedBlock = makeBlock({
                    tenseValue: "preterito",
                    rowCount: 1,
                    placeholderCount: 1,
                    rowDataset: {
                        grammarRouteFamily: "vnc",
                        grammarRouteStage: "execute",
                        grammarGenerationAllowed: "true",
                        grammarLogicAuthority: "Andrews",
                        grammarSpellingEvidenceRole: "orthography-realization-only",
                        grammarClassicalSpellingRole: "structural-only",
                        grammarOrthographyBoundary: "nawat-pipil-realization",
                        grammarSpellingAuthority: "Nawat/Pipil orthography bridge",
                        grammarClassicalSurfaceImport: "blocked",
                        grammarResultOk: "true",
                    },
                });
                const blocks = [blockedBlock, licensedBlock];
                const root = {
                    dataset: {},
                    querySelectorAll(selector) {
                        if (selector === ".tense-tab, .tense-block" || selector === ".tense-block") {
                            return blocks;
                        }
                        if (selector === ".tense-tab") {
                            return [];
                        }
                        return [];
                    },
                };
                const audit = ctx.syncAndrewsTenseAuthorityDomAudit(root, {
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                return {
                    ok: audit.ok,
                    checked: audit.blockOutputAudit.checked,
                    rowCount: audit.blockOutputAudit.rowCount,
                    placeholderCount: audit.blockOutputAudit.placeholderCount,
                    allowedRouteRows: audit.blockOutputAudit.grammarGenerationAllowedCount,
                    blockedRouteRows: audit.blockOutputAudit.grammarGenerationBlockedRowCount,
                    blockedResultOkRows: audit.blockOutputAudit.grammarBlockedResultOkCount,
                    generatedBlockedRouteContracts: audit.blockOutputAudit.grammarGeneratedBlockedRouteContractCount,
                    generatedResultNotOkRows: audit.blockOutputAudit.grammarGeneratedResultNotOkCount,
                    missingLogicAuthorityRows: audit.blockOutputAudit.grammarLogicAuthorityMissingCount,
                    spellingEvidenceRoleMismatchRows: audit.blockOutputAudit.grammarSpellingEvidenceRoleMismatchCount,
                    sourceContextAuthorityMismatchRows: audit.blockOutputAudit.grammarSourceContextAuthorityMismatchCount,
                    sourceEvidenceAuthorityMismatchRows: audit.blockOutputAudit.grammarSourceEvidenceAuthorityMismatchCount,
                    classicalSpellingRoleMismatchRows: audit.blockOutputAudit.grammarClassicalSpellingRoleMismatchCount,
                    missingOrthographyRows: audit.blockOutputAudit.grammarOrthographyBoundaryMissingCount,
                    spellingAuthorityMismatchRows: audit.blockOutputAudit.grammarSpellingAuthorityMismatchCount,
                    classicalImportRows: audit.blockOutputAudit.grammarClassicalSurfaceImportNotBlockedCount,
                    hardBlockedCount: audit.blockOutputAudit.hardBlockedCount,
                    diagnosticCount: audit.blockOutputAudit.diagnosticCount,
                    rootChecked: root.dataset.andrewsBlockOutputChecked,
                    rootRows: root.dataset.andrewsBlockOutputRowCount,
                    rootPlaceholders: root.dataset.andrewsBlockOutputPlaceholderCount,
                    rootAllowedRouteRows: root.dataset.andrewsBlockRouteGenerationAllowedCount,
                    rootBlockedRouteRows: root.dataset.andrewsBlockRouteGenerationBlockedRowCount,
                    rootBlockedResultOkRows: root.dataset.andrewsBlockRouteBlockedResultOkCount,
                    rootGeneratedBlockedRouteContracts: root.dataset.andrewsBlockRouteGeneratedBlockedContractCount,
                    rootGeneratedResultNotOkRows: root.dataset.andrewsBlockRouteGeneratedResultNotOkCount,
                    rootMissingLogicAuthorityRows: root.dataset.andrewsBlockRowLogicAuthorityMissingCount,
                    rootSpellingEvidenceRoleMismatchRows: root.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount,
                    rootSourceContextAuthorityMismatchRows: root.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount,
                    rootSourceEvidenceAuthorityMismatchRows: root.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount,
                    rootClassicalSpellingRoleMismatchRows: root.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount,
                    rootMissingOrthographyRows: root.dataset.andrewsBlockRowOrthographyBoundaryMissingCount,
                    rootSpellingAuthorityMismatchRows: root.dataset.andrewsBlockRowSpellingAuthorityMismatchCount,
                    rootClassicalImportRows: root.dataset.andrewsBlockRowClassicalImportNotBlockedCount,
                    rootHardBlocked: root.dataset.andrewsBlockOutputHardBlockedCount,
                    rootDiagnostics: root.dataset.andrewsBlockOutputDiagnosticCount,
                    blockedScope: blockedBlock.dataset.andrewsBlockOutputScope,
                    blockedRouteFamilies: blockedBlock.dataset.andrewsBlockRouteFamilies,
                    blockedRouteStages: blockedBlock.dataset.andrewsBlockRouteStages,
                    blockedRouteDiagnostics: blockedBlock.dataset.andrewsBlockRouteDiagnosticIds,
                    blockedWarningClass: blockedBlock.classes.has("tense-block--andrews-audit-warning"),
                    blockedOutputClass: blockedBlock.classes.has("tense-block--andrews-output-blocked"),
                    blockedLeakClass: blockedBlock.classes.has("tense-block--andrews-output-leak-diagnostic"),
                    licensedScope: licensedBlock.dataset.andrewsBlockOutputScope,
                    licensedGeneratedClass: licensedBlock.classes.has("tense-block--andrews-output-generated"),
                };
            })()
            : {
                ok: false,
                checked: panels.includes("summarizeAndrewsTenseBlockOutputAudit(scope)") ? 2 : 0,
                rowCount: panels.includes("rowCount") ? 2 : 0,
                placeholderCount: panels.includes("placeholderCount") ? 1 : 0,
                allowedRouteRows: panels.includes("grammarGenerationAllowedCount") ? 1 : 0,
                blockedRouteRows: panels.includes("grammarGenerationBlockedRowCount") ? 1 : 0,
                blockedResultOkRows: panels.includes("grammarBlockedResultOkCount") ? 0 : "missing",
                generatedBlockedRouteContracts: panels.includes("grammarGeneratedBlockedRouteContractCount") ? 0 : "missing",
                generatedResultNotOkRows: panels.includes("grammarGeneratedResultNotOkCount") ? 0 : "missing",
                missingLogicAuthorityRows: panels.includes("grammarLogicAuthorityMissingCount") ? 0 : "missing",
                spellingEvidenceRoleMismatchRows: panels.includes("grammarSpellingEvidenceRoleMismatchCount") ? 0 : "missing",
                sourceContextAuthorityMismatchRows: panels.includes("grammarSourceContextAuthorityMismatchCount") ? 0 : "missing",
                sourceEvidenceAuthorityMismatchRows: panels.includes("grammarSourceEvidenceAuthorityMismatchCount") ? 0 : "missing",
                classicalSpellingRoleMismatchRows: panels.includes("grammarClassicalSpellingRoleMismatchCount") ? 0 : "missing",
                missingOrthographyRows: panels.includes("grammarOrthographyBoundaryMissingCount") ? 0 : "missing",
                spellingAuthorityMismatchRows: panels.includes("grammarSpellingAuthorityMismatchCount") ? 0 : "missing",
                classicalImportRows: panels.includes("grammarClassicalSurfaceImportNotBlockedCount") ? 0 : "missing",
                hardBlockedCount: panels.includes("hardBlockedCount") ? 1 : 0,
                diagnosticCount: panels.includes("diagnosticCount") ? 1 : 0,
                rootChecked: panels.includes("scope.dataset.andrewsBlockOutputChecked") ? "2" : "missing",
                rootRows: panels.includes("scope.dataset.andrewsBlockOutputRowCount") ? "2" : "missing",
                rootPlaceholders: panels.includes("scope.dataset.andrewsBlockOutputPlaceholderCount") ? "1" : "missing",
                rootAllowedRouteRows: panels.includes("scope.dataset.andrewsBlockRouteGenerationAllowedCount") ? "1" : "missing",
                rootBlockedRouteRows: panels.includes("scope.dataset.andrewsBlockRouteGenerationBlockedRowCount") ? "1" : "missing",
                rootBlockedResultOkRows: panels.includes("scope.dataset.andrewsBlockRouteBlockedResultOkCount") ? "0" : "missing",
                rootGeneratedBlockedRouteContracts: panels.includes("scope.dataset.andrewsBlockRouteGeneratedBlockedContractCount") ? "0" : "missing",
                rootGeneratedResultNotOkRows: panels.includes("scope.dataset.andrewsBlockRouteGeneratedResultNotOkCount") ? "0" : "missing",
                rootMissingLogicAuthorityRows: panels.includes("scope.dataset.andrewsBlockRowLogicAuthorityMissingCount") ? "0" : "missing",
                rootSpellingEvidenceRoleMismatchRows: panels.includes("scope.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount") ? "0" : "missing",
                rootSourceContextAuthorityMismatchRows: panels.includes("scope.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount") ? "0" : "missing",
                rootSourceEvidenceAuthorityMismatchRows: panels.includes("scope.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount") ? "0" : "missing",
                rootClassicalSpellingRoleMismatchRows: panels.includes("scope.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount") ? "0" : "missing",
                rootMissingOrthographyRows: panels.includes("scope.dataset.andrewsBlockRowOrthographyBoundaryMissingCount") ? "0" : "missing",
                rootSpellingAuthorityMismatchRows: panels.includes("scope.dataset.andrewsBlockRowSpellingAuthorityMismatchCount") ? "0" : "missing",
                rootClassicalImportRows: panels.includes("scope.dataset.andrewsBlockRowClassicalImportNotBlockedCount") ? "0" : "missing",
                rootHardBlocked: panels.includes("scope.dataset.andrewsBlockOutputHardBlockedCount") ? "1" : "missing",
                rootDiagnostics: panels.includes("scope.dataset.andrewsBlockOutputDiagnosticCount") ? "1" : "missing",
                blockedScope: "blocked-output",
                blockedRouteFamilies: "vnc",
                blockedRouteStages: "andrews-cnv-tense-logic-gate",
                blockedRouteDiagnostics: "not-andrews-grammar-gate",
                blockedWarningClass: panels.includes("tense-block--andrews-audit-warning"),
                blockedOutputClass: panels.includes("tense-block--andrews-output-blocked"),
                blockedLeakClass: panels.includes("tense-block--andrews-output-leak-diagnostic"),
                licensedScope: "andrews-generated-output",
                licensedGeneratedClass: panels.includes("tense-block--andrews-output-generated"),
            },
        {
            ok: false,
            checked: 2,
            rowCount: 2,
            placeholderCount: 1,
            allowedRouteRows: 1,
            blockedRouteRows: 1,
            blockedResultOkRows: 0,
            generatedBlockedRouteContracts: 0,
            generatedResultNotOkRows: 0,
            missingLogicAuthorityRows: 0,
            spellingEvidenceRoleMismatchRows: 0,
            sourceContextAuthorityMismatchRows: 0,
            sourceEvidenceAuthorityMismatchRows: 0,
            classicalSpellingRoleMismatchRows: 0,
            missingOrthographyRows: 0,
            spellingAuthorityMismatchRows: 0,
            classicalImportRows: 0,
            hardBlockedCount: 1,
            diagnosticCount: 1,
            rootChecked: "2",
            rootRows: "2",
            rootPlaceholders: "1",
            rootAllowedRouteRows: "1",
            rootBlockedRouteRows: "1",
            rootBlockedResultOkRows: "0",
            rootGeneratedBlockedRouteContracts: "0",
            rootGeneratedResultNotOkRows: "0",
            rootMissingLogicAuthorityRows: "0",
            rootSpellingEvidenceRoleMismatchRows: "0",
            rootSourceContextAuthorityMismatchRows: "0",
            rootSourceEvidenceAuthorityMismatchRows: "0",
            rootClassicalSpellingRoleMismatchRows: "0",
            rootMissingOrthographyRows: "0",
            rootSpellingAuthorityMismatchRows: "0",
            rootClassicalImportRows: "0",
            rootHardBlocked: "1",
            rootDiagnostics: "1",
            blockedScope: "blocked-output",
            blockedRouteFamilies: "vnc",
            blockedRouteStages: "andrews-cnv-tense-logic-gate",
            blockedRouteDiagnostics: "not-andrews-grammar-gate",
            blockedWarningClass: true,
            blockedOutputClass: true,
            blockedLeakClass: true,
            licensedScope: "andrews-generated-output",
            licensedGeneratedClass: true,
        }
    );
    s.eq(
        "unclassified tense authority stays blocked until an Andrews frame exists",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {},
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                ctx.applyAndrewsTenseAuthorityDataset(element, {
                    tenseValue: "inventado",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                return {
                    authority: element.dataset.andrewsTenseAuthority,
                    slot: element.dataset.andrewsTenseSlot,
                    generationGate: element.dataset.andrewsGenerationGate,
                    outputRole: element.dataset.andrewsOutputRole,
                    evidenceRole: element.dataset.nawatPipilEvidenceRole,
                    audit: element.dataset.andrewsAuthorityAudit,
                    diagnostics: element.dataset.andrewsAuthorityDiagnostics,
                    unclassifiedClass: classes.has("tense-tab--andrews-unclassified"),
                    warningClass: classes.has("tense-tab--andrews-audit-warning"),
                };
            })()
            : {
                authority: panels.includes('scope: "unknown"') ? "unknown" : "missing",
                slot: panels.includes('slot: "andrews-frame-required"') ? "andrews-frame-required" : "missing",
                generationGate: panels.includes('generationGate: "unclassified-andrews-frame-required"') ? "unclassified-andrews-frame-required" : "missing",
                outputRole: panels.includes('outputRole: "blocked-until-andrews-frame"') ? "blocked-until-andrews-frame" : "missing",
                evidenceRole: panels.includes('nawatEvidenceRole: "not-a-grammar-gate"') ? "not-a-grammar-gate" : "missing",
                audit: panels.includes("unclassified-authority-frame") ? "diagnostic" : "missing",
                diagnostics: "unclassified-authority-frame",
                unclassifiedClass: panels.includes("tense-tab--andrews-unclassified"),
                warningClass: panels.includes("tense-tab--andrews-audit-warning"),
            },
        {
            authority: "unknown",
            slot: "andrews-frame-required",
            generationGate: "unclassified-andrews-frame-required",
            outputRole: "blocked-until-andrews-frame",
            evidenceRole: "not-a-grammar-gate",
            audit: "diagnostic",
            diagnostics: "unclassified-authority-frame",
            unclassifiedClass: true,
            warningClass: true,
        }
    );
    s.eq(
        "tense authority DOM sync backfills missing annotations and summarizes audit on the root",
        typeof ctx.syncAndrewsTenseAuthorityDomAudit === "function"
            ? (() => {
                const classes = new Set(["tense-tab"]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {
                        tenseValue: "inventado",
                    },
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                const root = {
                    dataset: {},
                    querySelectorAll(selector) {
                        return selector === ".tense-tab, .tense-block" ? [element] : [];
                    },
                };
                const audit = ctx.syncAndrewsTenseAuthorityDomAudit(root, {
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                return {
                    annotated: audit.annotated,
                    checked: audit.checked,
                    ok: audit.ok,
                    rootAudit: root.dataset.andrewsAuthorityAudit,
                    rootAnnotated: root.dataset.andrewsAuthorityAnnotated,
                    rootRepaired: root.dataset.andrewsAuthorityRepaired,
                    authority: element.dataset.andrewsTenseAuthority,
                    slot: element.dataset.andrewsTenseSlot,
                    diagnostics: element.dataset.andrewsAuthorityDiagnostics,
                    unclassifiedClass: classes.has("tense-tab--andrews-unclassified"),
                    warningClass: classes.has("tense-tab--andrews-audit-warning"),
                };
            })()
            : {
                annotated: panels.includes("annotated += 1") ? 1 : 0,
                checked: panels.includes("auditAndrewsTenseAuthorityAnnotatedDom(scope)") ? 1 : 0,
                ok: false,
                rootAudit: panels.includes("scope.dataset.andrewsAuthorityAudit") ? "diagnostic" : "missing",
                rootAnnotated: panels.includes("scope.dataset.andrewsAuthorityAnnotated") ? "1" : "missing",
                rootRepaired: panels.includes("scope.dataset.andrewsAuthorityRepaired") ? "0" : "missing",
                authority: panels.includes('scope: "unknown"') ? "unknown" : "missing",
                slot: panels.includes('slot: "andrews-frame-required"') ? "andrews-frame-required" : "missing",
                diagnostics: "unclassified-authority-frame",
                unclassifiedClass: panels.includes("tense-tab--andrews-unclassified"),
                warningClass: panels.includes("tense-tab--andrews-audit-warning"),
            },
        {
            annotated: 1,
            checked: 1,
            ok: false,
            rootAudit: "diagnostic",
            rootAnnotated: "1",
            rootRepaired: "0",
            authority: "unknown",
            slot: "andrews-frame-required",
            diagnostics: "unclassified-authority-frame",
            unclassifiedClass: true,
            warningClass: true,
        }
    );
    s.eq(
        "tense authority DOM sync repairs stale self-consistent metadata from the rendered tense value",
        typeof ctx.syncAndrewsTenseAuthorityDomAudit === "function"
            ? (() => {
                const classes = new Set([
                    "tense-tab",
                    "tense-tab--nawat-extension",
                    "tense-tab--surface-evidence-only",
                ]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {
                        tenseValue: "preterito",
                        andrewsTenseValue: "condicional",
                        andrewsTenseAuthority: "nawat-extension",
                        andrewsTenseSource: "Nawat/Pipil orthography evidence",
                        andrewsTenseSourceRefs: "not an Andrews tense-tab authority",
                        andrewsTenseSlot: "tns",
                        andrewsTenseFamily: "nawat-extension-conditional",
                        andrewsTenseMode: "verbo",
                        andrewsGrammarLogicAuthority: "Andrews PDF",
                        andrewsClassicalSpellingRole: "structural-only",
                        andrewsOrthographyBoundary: "nawat-pipil-realization",
                        nawatPipilOutputBoundary: "orthography-realization",
                        andrewsLogicRole: "surface-extension-not-grammar-source",
                        andrewsGenerationGate: "not-andrews-grammar-gate",
                        andrewsOutputRole: "surface-evidence-only",
                        nawatPipilEvidenceRole: "surface-extension-only",
                        classicalOutputImport: "blocked",
                    },
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                const root = {
                    dataset: {},
                    querySelectorAll(selector) {
                        return selector === ".tense-tab, .tense-block" ? [element] : [];
                    },
                };
                const audit = ctx.syncAndrewsTenseAuthorityDomAudit(root, {
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                return {
                    annotated: audit.annotated,
                    repaired: audit.repaired,
                    checked: audit.checked,
                    ok: audit.ok,
                    rootRepaired: root.dataset.andrewsAuthorityRepaired,
                    authority: element.dataset.andrewsTenseAuthority,
                    value: element.dataset.andrewsTenseValue,
                    generationGate: element.dataset.andrewsGenerationGate,
                    diagnostics: element.dataset.andrewsAuthorityDiagnostics,
                    authorityClass: classes.has("tense-tab--andrews-authority"),
                    generationClass: classes.has("tense-tab--andrews-generation-gate"),
                    surfaceClass: classes.has("tense-tab--surface-evidence-only"),
                };
            })()
            : {
                annotated: panels.includes("let repaired = 0") ? 0 : -1,
                repaired: panels.includes("repaired += 1") ? 1 : 0,
                checked: panels.includes("auditAndrewsTenseAuthorityAnnotatedDom(scope)") ? 1 : 0,
                ok: true,
                rootRepaired: panels.includes("scope.dataset.andrewsAuthorityRepaired") ? "1" : "missing",
                authority: panels.includes("getAndrewsTenseAuthorityCanonicalMismatches") ? "andrews-licensed" : "missing",
                value: panels.includes("dataset.andrewsTenseValue") ? "preterito" : "missing",
                generationGate: panels.includes('generationGate: "andrews-licensed-generation"') ? "andrews-licensed-generation" : "missing",
                diagnostics: "",
                authorityClass: panels.includes("tense-tab--andrews-authority"),
                generationClass: panels.includes("tense-tab--andrews-generation-gate"),
                surfaceClass: false,
            },
        {
            annotated: 0,
            repaired: 1,
            checked: 1,
            ok: true,
            rootRepaired: "1",
            authority: "andrews-licensed",
            value: "preterito",
            generationGate: "andrews-licensed-generation",
            diagnostics: "",
            authorityClass: true,
            generationClass: true,
            surfaceClass: false,
        }
    );
    s.eq(
        "tense authority DOM sync repairs stale class state when datasets are already canonical",
        typeof ctx.syncAndrewsTenseAuthorityDomAudit === "function"
            ? (() => {
                const classes = new Set([
                    "tense-tab",
                    "tense-tab--surface-evidence-only",
                ]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {
                        tenseValue: "preterito",
                        andrewsTenseValue: "preterito",
                        andrewsTenseAuthority: "andrews-licensed",
                        andrewsTenseSource: "Andrews",
                        andrewsTenseSourceRefs: "Andrews 5.4.2|Andrews 5.5|Andrews 7",
                        andrewsTenseSlot: "tns",
                        andrewsTenseFamily: "indicative-perfective-preterit",
                        andrewsTenseMode: "verbo",
                        andrewsGrammarLogicAuthority: "Andrews PDF",
                        andrewsClassicalSpellingRole: "structural-only",
                        andrewsOrthographyBoundary: "nawat-pipil-realization",
                        nawatPipilOutputBoundary: "orthography-realization",
                        andrewsLogicRole: "grammar-logic-source",
                        andrewsGenerationGate: "andrews-licensed-generation",
                        andrewsOutputRole: "orthography-realization",
                        nawatPipilEvidenceRole: "orthography-realization-only",
                        classicalOutputImport: "blocked",
                    },
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                const root = {
                    dataset: {},
                    querySelectorAll(selector) {
                        return selector === ".tense-tab, .tense-block" ? [element] : [];
                    },
                };
                const before = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(element);
                const audit = ctx.syncAndrewsTenseAuthorityDomAudit(root, {
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                return {
                    beforeOk: before.ok,
                    beforeClassMismatch: before.classMismatches.length > 0,
                    repaired: audit.repaired,
                    ok: audit.ok,
                    rootRepaired: root.dataset.andrewsAuthorityRepaired,
                    authorityClass: classes.has("tense-tab--andrews-authority"),
                    generationClass: classes.has("tense-tab--andrews-generation-gate"),
                    surfaceClass: classes.has("tense-tab--surface-evidence-only"),
                    warningClass: classes.has("tense-tab--andrews-audit-warning"),
                };
            })()
            : {
                beforeOk: false,
                beforeClassMismatch: panels.includes("getAndrewsTenseAuthorityClassMismatches"),
                repaired: panels.includes("classMismatches.length > 0") ? 1 : 0,
                ok: true,
                rootRepaired: panels.includes("scope.dataset.andrewsAuthorityRepaired") ? "1" : "missing",
                authorityClass: panels.includes("tense-tab--andrews-authority"),
                generationClass: panels.includes("tense-tab--andrews-generation-gate"),
                surfaceClass: false,
                warningClass: false,
            },
        {
            beforeOk: false,
            beforeClassMismatch: true,
            repaired: 1,
            ok: true,
            rootRepaired: "1",
            authorityClass: true,
            generationClass: true,
            surfaceClass: false,
            warningClass: false,
        }
    );
    s.eq(
        "tense authority DOM sync repairs stale Andrews mode from the rendered root mode",
        typeof ctx.syncAndrewsTenseAuthorityDomAudit === "function"
            ? (() => {
                const classes = new Set([
                    "tense-tab",
                    "tense-tab--andrews-unclassified",
                ]);
                const element = {
                    tagName: "BUTTON",
                    dataset: {
                        tenseValue: "agentivo",
                        andrewsTenseValue: "agentivo",
                        andrewsTenseAuthority: "unknown",
                        andrewsTenseSource: "unclassified",
                        andrewsTenseSourceRefs: "",
                        andrewsTenseSlot: "andrews-frame-required",
                        andrewsTenseFamily: "agentivo",
                        andrewsTenseMode: "verbo",
                        andrewsGrammarLogicAuthority: "Andrews PDF",
                        andrewsClassicalSpellingRole: "structural-only",
                        andrewsOrthographyBoundary: "nawat-pipil-realization",
                        nawatPipilOutputBoundary: "orthography-realization",
                        andrewsLogicRole: "andrews-frame-required",
                        andrewsGenerationGate: "unclassified-andrews-frame-required",
                        andrewsOutputRole: "blocked-until-andrews-frame",
                        nawatPipilEvidenceRole: "not-a-grammar-gate",
                        classicalOutputImport: "blocked",
                    },
                    title: "",
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                };
                const root = {
                    dataset: {},
                    querySelectorAll(selector) {
                        return selector === ".tense-tab, .tense-block" ? [element] : [];
                    },
                };
                const audit = ctx.syncAndrewsTenseAuthorityDomAudit(root, {
                    mode: ctx.TENSE_MODE?.sustantivo || "sustantivo",
                });
                return {
                    repaired: audit.repaired,
                    ok: audit.ok,
                    rootRepaired: root.dataset.andrewsAuthorityRepaired,
                    mode: element.dataset.andrewsTenseMode,
                    authority: element.dataset.andrewsTenseAuthority,
                    slot: element.dataset.andrewsTenseSlot,
                    generationGate: element.dataset.andrewsGenerationGate,
                    nominalClass: classes.has("tense-tab--andrews-nominal-route"),
                    unclassifiedClass: classes.has("tense-tab--andrews-unclassified"),
                    warningClass: classes.has("tense-tab--andrews-audit-warning"),
                };
            })()
            : {
                repaired: panels.includes("String(dataset.tenseMode || \"\").trim()") ? 1 : 0,
                ok: true,
                rootRepaired: panels.includes("scope.dataset.andrewsAuthorityRepaired") ? "1" : "missing",
                mode: "sustantivo",
                authority: panels.includes('scope: "andrews-nominal-route"') ? "andrews-nominal-route" : "missing",
                slot: panels.includes('slot: "no-vnc-tns"') ? "no-vnc-tns" : "missing",
                generationGate: panels.includes('generationGate: "andrews-nominal-route-no-vnc-tns"') ? "andrews-nominal-route-no-vnc-tns" : "missing",
                nominalClass: panels.includes("tense-tab--andrews-nominal-route"),
                unclassifiedClass: false,
                warningClass: false,
            },
        {
            repaired: 1,
            ok: true,
            rootRepaired: "1",
            mode: "sustantivo",
            authority: "andrews-nominal-route",
            slot: "no-vnc-tns",
            generationGate: "andrews-nominal-route-no-vnc-tns",
            nominalClass: true,
            unclassifiedClass: false,
            warningClass: false,
        }
    );
    s.ok(
        "tense authority audit catches CNV tense leakage into non-CNV routes",
        typeof ctx.getAndrewsTenseAuthorityDatasetAuditRecord === "function"
            ? (() => {
                const record = ctx.getAndrewsTenseAuthorityDatasetAuditRecord({
                    tagName: "DIV",
                    dataset: {
                        andrewsTenseAuthority: "andrews-nominal-route",
                        andrewsTenseSource: "Andrews",
                        andrewsTenseSourceRefs: "Andrews nominal CNN route",
                        andrewsTenseSlot: "tns",
                        andrewsTenseFamily: "agentivo",
                        andrewsTenseMode: "sustantivo",
                        andrewsGrammarLogicAuthority: "Andrews PDF",
                        andrewsClassicalSpellingRole: "structural-only",
                        andrewsOrthographyBoundary: "nawat-pipil-realization",
                        nawatPipilOutputBoundary: "orthography-realization",
                        andrewsOutputSpellingAuthority: "Nawat/Pipil orthography bridge",
                        andrewsOrthographyRealizationPath: "andrews-logic-then-nawat-pipil-realization",
                        andrewsLogicRole: "nominal-route-logic-source",
                        andrewsGenerationGate: "andrews-nominal-route-no-vnc-tns",
                        andrewsOutputRole: "orthography-realization",
                        nawatPipilEvidenceRole: "orthography-realization-only",
                        classicalOutputImport: "blocked",
                        andrewsRouteAuthority: "Andrews route registry",
                        andrewsRouteLogicAuthority: "Andrews PDF",
                        andrewsSourceTargetRoute: "CNV->CNN",
                        andrewsSourceTargetRouteClass: "verbal-source-to-nominal-target",
                        andrewsSourceFormulaType: "CNV",
                        andrewsTargetFormulaType: "CNN",
                        andrewsRouteRegistryStatus: "registry-match",
                        andrewsRouteUiHost: "nominal-output-tab",
                        andrewsRouteGenerationGate: "andrews-route-generation-allowed",
                        andrewsRouteGenerationAllowed: "true",
                        andrewsRouteClassicalSpellingRole: "structural-only",
                        andrewsRouteOutputSpellingAuthority: "Nawat/Pipil orthography bridge",
                    },
                });
                return record.ok === false
                    && record.missing.length === 0
                    && record.diagnostics.includes("non-cnv-route-has-vnc-tense-slot");
            })()
            : panels.includes("function getAndrewsTenseAuthorityDatasetAuditRecord")
                && panels.includes("non-cnv-route-has-vnc-tense-slot")
    );
    s.eq(
        "tense authority audit enforces button tense-tabs and div tense-blocks",
        typeof ctx.applyAndrewsTenseAuthorityDataset === "function"
            && typeof ctx.getAndrewsTenseAuthorityDatasetAuditRecord === "function"
            ? (() => {
                const makeElement = ({ tagName, classes }) => ({
                    tagName,
                    dataset: {},
                    title: "",
                    querySelectorAll() {
                        return [];
                    },
                    classList: {
                        contains(name) {
                            return classes.has(name);
                        },
                        toggle(name, enabled) {
                            if (enabled) {
                                classes.add(name);
                            } else {
                                classes.delete(name);
                            }
                        },
                    },
                    classes,
                });
                const tab = makeElement({
                    tagName: "DIV",
                    classes: new Set(["tense-tab"]),
                });
                const block = makeElement({
                    tagName: "BUTTON",
                    classes: new Set(["tense-block"]),
                });
                ctx.applyAndrewsTenseAuthorityDataset(tab, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                });
                ctx.applyAndrewsTenseAuthorityDataset(block, {
                    tenseValue: "preterito",
                    mode: ctx.TENSE_MODE?.verbo || "verbo",
                    blockKind: "CNV",
                });
                const tabRecord = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(tab);
                const blockRecord = ctx.getAndrewsTenseAuthorityDatasetAuditRecord(block);
                return {
                    tabContract: tab.dataset.andrewsAuthorityElementContract,
                    tabExpectedTag: tab.dataset.andrewsAuthorityExpectedTag,
                    tabRenderedTag: tab.dataset.andrewsAuthorityRenderedTag,
                    tabOk: tabRecord.ok,
                    tabDiagnostic: tabRecord.diagnostics.includes("tense-tab-not-button"),
                    tabWarningClass: tab.classes.has("tense-tab--andrews-audit-warning"),
                    blockContract: block.dataset.andrewsAuthorityElementContract,
                    blockExpectedTag: block.dataset.andrewsAuthorityExpectedTag,
                    blockRenderedTag: block.dataset.andrewsAuthorityRenderedTag,
                    blockOk: blockRecord.ok,
                    blockDiagnostic: blockRecord.diagnostics.includes("tense-block-not-div"),
                    blockWarningClass: block.classes.has("tense-block--andrews-audit-warning"),
                };
            })()
            : {
                tabContract: panels.includes("button.tense-tab") ? "button.tense-tab" : "missing",
                tabExpectedTag: panels.includes("dataset.andrewsAuthorityExpectedTag") ? "button" : "missing",
                tabRenderedTag: panels.includes("dataset.andrewsAuthorityRenderedTag") ? "div" : "missing",
                tabOk: false,
                tabDiagnostic: panels.includes("tense-tab-not-button"),
                tabWarningClass: panels.includes("tense-tab--andrews-audit-warning"),
                blockContract: panels.includes("div.tense-block") ? "div.tense-block" : "missing",
                blockExpectedTag: panels.includes("dataset.andrewsAuthorityExpectedTag") ? "div" : "missing",
                blockRenderedTag: panels.includes("dataset.andrewsAuthorityRenderedTag") ? "button" : "missing",
                blockOk: false,
                blockDiagnostic: panels.includes("tense-block-not-div"),
                blockWarningClass: panels.includes("tense-block--andrews-audit-warning"),
            },
        {
            tabContract: "button.tense-tab",
            tabExpectedTag: "button",
            tabRenderedTag: "div",
            tabOk: false,
            tabDiagnostic: true,
            tabWarningClass: true,
            blockContract: "div.tense-block",
            blockExpectedTag: "div",
            blockRenderedTag: "button",
            blockOk: false,
            blockDiagnostic: true,
            blockWarningClass: true,
        }
    );
    s.ok(
        "dynamic route board code is not mounted inside #2 Formula",
        !html.includes('id="andrews-route-board"')
            && !html.includes('data-andrews-formula-role="route-board"')
            && html.includes('id="output-journey-strip"')
            && html.includes('data-andrews-output-role="route-journey"')
            && html.includes("style.css?v=20260624-andrews-operational-layer-003")
            && html.includes("src/core/nnc/nominalization/nominalization.js?v=20260624-andrews-operational-layer-003")
            && html.includes("src/core/generation/engine.js?v=20260624-andrews-logic-authority-001")
            && html.includes("src/core/generation/valency.js?v=20260623-andrews-logic-001")
            && html.includes("src/core/grammar/frame.js?v=20260624-andrews-logic-002")
            && html.includes("src/ui/panels/panels.js?v=20260624-andrews-operational-layer-003")
            && html.includes("src/ui/state.js?v=20260624-andrews-route-perception-003")
            && html.includes("src/ui/rendering/rendering.js?v=20260627-dev-hooks-path-001")
            && html.includes("src/ui/composer/composer.js?v=20260624-andrews-route-perception-004")
            && html.includes("src/lessons/registry.js?v=20260621-absolutive-allomorph-001")
            && panels.includes("var AndrewsRouteBoardDestinationKey")
            && panels.includes("var AndrewsRouteBoardPinnedSourceStage")
            && panels.includes("var AndrewsRouteBoardActiveJourney")
            && panels.includes("var AndrewsRouteBoardSourceOverrideStage")
            && panels.includes("var AndrewsRouteBoardContinuedJourney")
            && panels.includes("var AndrewsRouteBoardJourneyHistory")
            && panels.includes("function clearAndrewsRouteBoardPinnedJourney")
            && panels.includes('typeof renderOutputJourneyStrip === "function"')
            && panels.includes("function normalizeAndrewsRouteBoardInputValue")
            && panels.includes("function getAndrewsRouteBoardRawInput")
            && panels.includes("function getAndrewsRouteBoardUiSourceStage")
            && panels.includes("function restoreAndrewsRouteBoardInputIfBlank")
            && panels.includes("ANDREWS_ROUTE_BOARD_MAP_STATIONS")
            && panels.includes("ANDREWS_ROUTE_BOARD_MAP_ROUTES")
            && panels.includes("ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS")
            && panels.includes("ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS")
            && panels.includes("ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK")
            && panels.includes("function appendAndrewsRouteBoardGeographyMap")
            && panels.includes("function activateAndrewsRouteBoardMapRoute")
            && panels.includes("function activateAndrewsRouteBoardMapStation")
            && panels.includes("function attachAndrewsRouteBoardMapRouteControl")
            && panels.includes("function attachAndrewsRouteBoardMapStationControl")
            && panels.includes("function getAndrewsRouteBoardMapStationCoordinateFrame")
            && panels.includes("function applyAndrewsRouteBoardMapStationCoordinateDataset")
            && panels.includes("function getAndrewsRouteBoardMapGisLayerValue")
            && panels.includes("function getAndrewsRouteBoardMapGisLayerEntries")
            && panels.includes("function appendAndrewsRouteBoardMapDimensionScale")
            && panels.includes("function getAndrewsRouteBoardMapPrimaryRouteSign")
            && panels.includes("function getAndrewsRouteBoardMapItineraryFrame")
            && panels.includes("function getAndrewsRouteBoardMapTripPreviewFrame")
            && panels.includes("function appendAndrewsRouteBoardMapTripPreview")
            && panels.includes("function getAndrewsRouteBoardMapAnnouncementFrame")
            && panels.includes("function appendAndrewsRouteBoardMapAnnouncements")
            && panels.includes("function getAndrewsRouteBoardMapTransferGuidanceFrame")
            && panels.includes("function appendAndrewsRouteBoardMapTransferGuidance")
            && panels.includes("function getAndrewsRouteBoardMapHeadsignFrame")
            && panels.includes("function appendAndrewsRouteBoardMapHeadsign")
            && panels.includes("function getAndrewsRouteBoardMapContinuityFrame")
            && panels.includes("function appendAndrewsRouteBoardMapContinuity")
            && panels.includes("function appendAndrewsRouteBoardMapItinerary")
            && panels.includes("function getAndrewsRouteBoardMapStationDirectoryEntries")
            && panels.includes("function appendAndrewsRouteBoardMapStationDirectory")
            && panels.includes("function appendAndrewsRouteBoardMapWayfinding")
            && panels.includes("function getAndrewsRouteBoardMapOptionEntries")
            && panels.includes("function appendAndrewsRouteBoardMapOptions")
            && panels.includes("function getAndrewsRouteBoardMapDepartureEntries")
            && panels.includes("function appendAndrewsRouteBoardMapDepartures")
            && panels.includes("function getAndrewsRouteBoardMapDestinationEntries")
            && panels.includes("function appendAndrewsRouteBoardMapDestinations")
            && panels.includes("function getAndrewsRouteBoardMapRouteMetrics")
            && panels.includes("function applyAndrewsRouteBoardMapRouteMetricDataset")
            && panels.includes("function appendAndrewsRouteBoardMapTerrainScale")
            && panels.includes("function appendAndrewsRouteBoardMapServiceSummary")
            && panels.includes("function getAndrewsRouteBoardMapServiceAdvisoryFrame")
            && panels.includes("function appendAndrewsRouteBoardMapServiceAdvisory")
            && panels.includes("function getAndrewsRouteBoardMapApprovalFrame")
            && panels.includes("function appendAndrewsRouteBoardMapApprovalGate")
            && panels.includes("function appendAndrewsRouteBoardMapGeographyLayer")
            && panels.includes("function appendAndrewsRouteBoardMapCompass")
            && panels.includes("function getAndrewsRouteBoardMapRouteState")
            && panels.includes("function getAndrewsRouteBoardMapStationLabelPlacement")
            && panels.includes("function getAndrewsRouteBoardMapLineStationCount")
            && panels.includes("function appendAndrewsRouteBoardMapTrackBeds")
            && panels.includes("function appendAndrewsRouteBoardMapRouteDirections")
            && panels.includes("function appendAndrewsRouteBoardMapLineStations")
            && panels.includes("function getAndrewsRouteBoardMapStationServiceRoutes")
            && panels.includes("function applyAndrewsRouteBoardMapStationServiceDataset")
            && panels.includes("function getAndrewsRouteBoardMapTransferEntries")
            && panels.includes("function getAndrewsRouteBoardMapRouteTerminalEntries")
            && panels.includes("function getAndrewsRouteBoardMapRouteTerminalEndpointEntries")
            && panels.includes("function getAndrewsRouteBoardMapDestinationCalloutEntries")
            && panels.includes("function getAndrewsRouteBoardMapCorridorEntries")
            && panels.includes("function appendAndrewsRouteBoardMapStationServiceBadges")
            && panels.includes("function appendAndrewsRouteBoardMapTransferHubs")
            && panels.includes("function appendAndrewsRouteBoardMapRouteTerminals")
            && panels.includes("function appendAndrewsRouteBoardMapDestinationCallouts")
            && panels.includes("function getAndrewsRouteBoardMapProgressFrame")
            && panels.includes("function appendAndrewsRouteBoardMapProgressMarker")
            && panels.includes("function appendAndrewsRouteBoardMapTransfers")
            && panels.includes("function appendAndrewsRouteBoardMapTerminalBoard")
            && panels.includes("function appendAndrewsRouteBoardMapSymbolKey")
            && panels.includes("function appendAndrewsRouteBoardMapLayerStack")
            && panels.includes("function appendAndrewsRouteBoardMapCorridors")
            && panels.includes('map.dataset.mapModel = "andrews-geography-route-lines"')
            && panels.includes('map.dataset.mapEngineModel = "layered-grammar-gis"')
            && panels.includes('map.dataset.mapInterfaceModel = "transit-map-surface"')
            && panels.includes('map.dataset.mapRoutePlannerModel = "passenger-route-planner"')
            && panels.includes('map.dataset.mapGeographyModel = "low-saturation-grammar-geography"')
            && panels.includes("map.dataset.mapGeographyRegionCount")
            && panels.includes('map.dataset.mapTrackBedModel = "low-saturation-route-track-bed"')
            && panels.includes("map.dataset.mapTrackBedPathCount")
            && panels.includes('map.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks"')
            && panels.includes("map.dataset.mapDimensionLandmarkCount")
            && panels.includes('map.dataset.mapCompassModel = "grammar-map-orientation-compass"')
            && panels.includes('map.dataset.mapCompassNorthDimension = "formula-boundary"')
            && panels.includes('map.dataset.mapLineStationModel = "station-points-on-colored-route-lines"')
            && panels.includes("map.dataset.mapLineStationCount")
            && panels.includes('map.dataset.mapRouteDirectionModel = "route-direction-arrows-passenger-heading"')
            && panels.includes("map.dataset.mapRouteDirectionCount")
            && panels.includes('map.dataset.mapStationLabelPlacementModel = "cartographic-station-label-placement"')
            && panels.includes("map.dataset.mapStationLabelPlacementCount")
            && panels.includes('map.dataset.mapTransferHubModel = "shared-station-route-interchange"')
            && panels.includes("map.dataset.mapTransferHubCount")
            && panels.includes('map.dataset.mapTerminalBoardModel = "route-terminal-service-board"')
            && panels.includes("map.dataset.mapTerminalRouteCount")
            && panels.includes('map.dataset.mapRouteTerminalModel = "route-endpoints-on-map"')
            && panels.includes("map.dataset.mapRouteTerminalCount")
            && panels.includes('map.dataset.mapDestinationCalloutModel = "route-destination-headsign-callouts"')
            && panels.includes("map.dataset.mapDestinationCalloutCount")
            && panels.includes('map.dataset.mapSymbolKeyModel = "station-symbol-map-key"')
            && panels.includes("map.dataset.mapSymbolKeyCount")
            && panels.includes('map.dataset.mapLayerStackModel = "grammar-gis-visible-layer-stack"')
            && panels.includes("map.dataset.mapLayerCount")
            && panels.includes('map.dataset.mapCorridorModel = "route-family-corridors"')
            && panels.includes("map.dataset.mapCorridorCount")
            && panels.includes('map.dataset.mapTripPreviewModel = "passenger-route-preview-board"')
            && panels.includes('map.dataset.mapProgressModel = "passenger-onboard-route-progress"')
            && panels.includes('map.dataset.mapAnnouncementModel = "passenger-next-stop-announcements"')
            && panels.includes('map.dataset.mapTransferGuidanceModel = "passenger-transfer-guidance-board"')
            && panels.includes('map.dataset.mapHeadsignModel = "passenger-headsign-boarding-direction"')
            && panels.includes('map.dataset.mapContinuityModel = "formula-surface-through-service"')
            && panels.includes('map.dataset.mapOptionBoardModel = "single-passenger-unified-option-board"')
            && panels.includes("map.dataset.mapOptionCount")
            && panels.includes('map.dataset.mapServiceAdvisoryModel = "obstacle-blocked-condition-uncertainty-advisory"')
            && panels.includes('map.dataset.mapApprovalGateModel = approvalFrame.approvalModel')
            && panels.includes('? "andrews-approved"')
            && panels.includes('? "runtime-visual-proof-covered"')
            && panels.includes('authorityModel: "andrews-pdf-supreme-nawat-pipil-orthography-bridge-only"')
            && panels.includes('main: "PDF > salida"')
            && panels.includes('meta: "Nawat: solo ortografia"')
            && panels.includes("map.dataset.mapApprovalEngineAuditState = approvalFrame.engineAuditState")
            && panels.includes("map.dataset.mapApprovalCoordinateFloor = String(approvalFrame.coordinateFloor || 0)")
            && panels.includes('map.dataset.mapDimensionModel = "inter-dimensional-positioning-system"')
            && panels.includes("map.dataset.mapDimensionOrder")
            && panels.includes('dimensions.dataset.mapGisLayerModel = "layered-grammar-gis"')
            && panels.includes('dimensions.dataset.mapTransitSurfaceModel = "transit-map-surface"')
            && panels.includes('dimensions.dataset.mapRoutePlannerModel = "passenger-route-planner"')
            && panels.includes("dimensions.dataset.mapGisLayerCount")
            && panels.includes("dimensions.dataset.mapOpenLayerCount")
            && panels.includes('layerList.dataset.mapGisLayerModel = "layered-grammar-gis"')
            && panels.includes("item.dataset.mapPlannerRole = entry.plannerRole")
            && panels.includes('value.textContent = [entry.sourceValue || "abierto", entry.destinationValue || "abierto"].join(" > ")')
            && panels.includes('label.textContent = "Capas GIS"')
            && panels.includes("map.dataset.mapResistanceHypothesisDomains")
            && panels.includes('geography.dataset.mapGeographyModel = "low-saturation-grammar-geography"')
            && panels.includes('geography.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks"')
            && panels.includes('landmarks.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks"')
            && panels.includes('class: "andrews-route-board__map-dimension-landmark"')
            && panels.includes("path.dataset.mapGeographyZone")
            && panels.includes('beds.dataset.mapTrackBedModel = "low-saturation-route-track-bed"')
            && panels.includes("bed.dataset.trackBedLayer = trackBedLayer")
            && panels.includes("appendAndrewsRouteBoardMapTrackBeds(svg")
            && panels.includes('compass.dataset.mapCompassModel = "grammar-map-orientation-compass"')
            && panels.includes('class: "andrews-route-board__map-compass"')
            && panels.includes('directions.dataset.mapRouteDirectionModel = "route-direction-arrows-passenger-heading"')
            && panels.includes('class: "andrews-route-board__map-route-direction"')
            && panels.includes('class: "andrews-route-board__map-route-direction-arrow"')
            && panels.includes('placementModel: "cartographic-station-label-placement"')
            && panels.includes("group.dataset.stationLabelPlacementModel = stationLabelPlacement.placementModel")
            && panels.includes("stationLabel.dataset.stationLabelPlacementModel = stationLabelPlacement.placementModel")
            && panels.includes('markers.dataset.mapLineStationModel = "station-points-on-colored-route-lines"')
            && panels.includes("marker.dataset.stationKey = stationKey")
            && panels.includes('hubs.dataset.mapTransferHubModel = "shared-station-route-interchange"')
            && panels.includes("hub.dataset.transferKind")
            && panels.includes('terminals.dataset.mapRouteTerminalModel = "route-endpoints-on-map"')
            && panels.includes("terminal.dataset.terminalEndpointRole")
            && panels.includes("terminal.dataset.terminalStationKey")
            && panels.includes('callouts.dataset.mapDestinationCalloutModel = "route-destination-headsign-callouts"')
            && panels.includes("callout.dataset.destinationStationKey")
            && panels.includes('class: "andrews-route-board__map-destination-callout-text"')
            && panels.includes('progress.dataset.mapProgressModel = frame.progressModel')
            && panels.includes("progress.dataset.nextStation")
            && panels.includes('class: "andrews-route-board__map-progress-marker"')
            && panels.includes('transfers.dataset.mapTransferModel = "shared-station-transfer-options"')
            && panels.includes("transfers.dataset.transferStationCount")
            && panels.includes('terminals.dataset.mapTerminalBoardModel = "route-terminal-service-board"')
            && panels.includes("terminals.dataset.terminalRouteCount")
            && panels.includes("item.dataset.routeSourceStation")
            && panels.includes("item.dataset.routeDestinationStation")
            && panels.includes('key.dataset.mapSymbolKeyModel = "station-symbol-map-key"')
            && panels.includes("item.dataset.mapSymbolKind")
            && panels.includes('symbolKind: "dimension-landmark"')
            && panels.includes('id: "track-bed"')
            && panels.includes('model: "low-saturation-route-track-bed"')
            && panels.includes('id: "dimension-landmarks"')
            && panels.includes('model: "grammar-dimension-landmarks"')
            && panels.includes('stack.dataset.mapLayerStackModel = "grammar-gis-visible-layer-stack"')
            && panels.includes("map.dataset.mapLayerIds = ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.map")
            && panels.includes("item.dataset.mapLayerModel = entry.model")
            && panels.includes('item.dataset.mapLayerState = "visible"')
            && panels.includes('corridors.dataset.mapCorridorModel = "route-family-corridors"')
            && panels.includes("item.dataset.routeFamilyRouteCodes")
            && panels.includes('element.dataset.stationServiceModel = "route-codes-at-station"')
            && panels.includes("element.dataset.stationServiceRouteCodes")
            && panels.includes('service.dataset.mapServiceModel = "station-handles-routing-passenger-rides"')
            && panels.includes("service.dataset.averageRouteStageClicks")
            && panels.includes("service.dataset.switchingRequired")
            && panels.includes('advisory.dataset.mapServiceAdvisoryModel = frame.advisoryModel')
            && panels.includes("advisory.dataset.serviceAdvisoryLevel = frame.advisoryLevel")
            && panels.includes("advisory.dataset.blockedRouteCount")
            && panels.includes("advisory.dataset.hypothesisPValue")
            && panels.includes('item.dataset.serviceAdvisoryRole = entry.role')
            && panels.includes('approval.dataset.mapApprovalGateModel = resolvedFrame.approvalModel')
            && panels.includes("approval.dataset.engineAuditState = resolvedFrame.engineAuditState")
            && panels.includes("approval.dataset.visualProofState = resolvedFrame.visualProofState")
            && panels.includes("approval.dataset.coordinateFloor = String(resolvedFrame.coordinateFloor || 0)")
            && panels.includes('item.dataset.approvalRole = entry.role')
            && panels.includes('wayfinding.dataset.mapWayfindingModel = "passenger-station-signs"')
            && panels.includes("wayfinding.dataset.currentCoordinate")
            && panels.includes("wayfinding.dataset.routePathLabel")
            && panels.includes('options.dataset.mapOptionsModel = "single-passenger-unified-option-board"')
            && panels.includes('optionProvisionMode: "station-provides-options"')
            && panels.includes("item.dataset.optionProvisionMode = entry.optionProvisionMode")
            && panels.includes("item.dataset.optionState = entry.optionState")
            && panels.includes("activateAndrewsRouteBoardTarget(entry.sourceEntry, board)")
            && panels.includes("map.append(label, viewport, legend)")
            && panels.includes('preview.dataset.mapTripPreviewModel = frame.previewModel')
            && panels.includes("preview.dataset.currentStation")
            && panels.includes("preview.dataset.destinationStation")
            && panels.includes("preview.dataset.routeStopCount")
            && panels.includes('announcements.dataset.mapAnnouncementModel = frame.announcementModel')
            && panels.includes("announcements.dataset.nextStation")
            && panels.includes('item.dataset.announcementRole = entry.role')
            && panels.includes('guidance.dataset.mapTransferGuidanceModel = frame.guidanceModel')
            && panels.includes("guidance.dataset.directRide = String(frame.directRide === true)")
            && panels.includes("guidance.dataset.transferStations = frame.transferStationKeys.join(\"|\")")
            && panels.includes('item.dataset.transferGuidanceRole = entry.role')
            && panels.includes('headsign.dataset.mapHeadsignModel = frame.headsignModel')
            && panels.includes("headsign.dataset.platformId = frame.platformId")
            && panels.includes('item.dataset.headsignRole = entry.role')
            && panels.includes('continuity.dataset.mapContinuityModel = frame.continuityModel')
            && panels.includes("continuity.dataset.formulaSurfaceShared = String(frame.formulaSurfaceShared === true)")
            && panels.includes("continuity.dataset.throughService = String(frame.throughService === true)")
            && panels.includes('item.dataset.continuityRole = entry.role')
            && panels.includes('itinerary.dataset.mapItineraryModel = frame.itineraryModel')
            && panels.includes("item.dataset.routeStopRole")
            && panels.includes("itinerary.dataset.routeStops")
            && panels.includes('directory.dataset.mapStationDirectoryModel = "station-index-geography-coordinates"')
            && panels.includes("stationItem.dataset.stationStatus")
            && panels.includes("stationItem.dataset.stationCoordinate")
            && panels.includes('service.className = "andrews-route-board__map-station-directory-service"')
            && panels.includes('chip.className = "andrews-route-board__map-station-directory-service-chip"')
            && panels.includes('departures.dataset.mapDeparturesModel = "station-provides-route-options"')
            && panels.includes("item.dataset.routeActionLabel")
            && panels.includes('destinations.dataset.mapDestinationsModel = "passenger-chooses-destination-station"')
            && panels.includes("item.dataset.destinationStation")
            && panels.includes("line.dataset.routeMapState = routeState")
            && panels.includes("element.dataset.routeResistanceScore")
            && panels.includes("element.dataset.routeResistanceRole")
            && panels.includes("element.dataset.routeHypothesisHit")
            && panels.includes("element.dataset.routeMapSelectable")
            && panels.includes("element.dataset.stationSelectable")
            && panels.includes("element.dataset.stationFormulaType")
            && panels.includes("element.dataset.stationFunctionUse")
            && panels.includes('class: "andrews-route-board__map-route-badges"')
            && panels.includes('class: "andrews-route-board__map-route-badge"')
            && panels.includes('class: "andrews-route-board__map-station-flag"')
            && panels.includes("group.dataset.stationStatus = stationStatus")
            && panels.includes("function getAndrewsRouteBoardBoundaryKindLabel")
            && panels.includes("function getAndrewsRouteBoardBoundaryConfidenceLabel")
            && panels.includes('"cnv-surface-nuclear-clause-candidate": "CNV superficie"')
            && panels.includes('"cnn-surface-nuclear-clause-candidate": "CNN superficie"')
            && panels.includes('"surface-candidate": "superficie probable"')
            && panels.includes("function getAndrewsRouteBoardGateDomainLabel")
            && panels.includes("function getAndrewsRouteBoardGateDomainCounts")
            && panels.includes("function serializeAndrewsRouteBoardGateDomains")
            && panels.includes("function getAndrewsRouteBoardRouteConditionFrames")
            && panels.includes("function serializeAndrewsRouteBoardRouteConditionFrames")
            && panels.includes("function getAndrewsRouteBoardResistanceRoleLabel")
            && panels.includes("Menor R")
            && panels.includes("Mayor R")
            && panels.includes("function buildAndrewsRouteBoardDestinationOptionLabel")
            && panels.includes("function getAndrewsRouteBoardEntryRoutePathLabel")
            && panels.includes("function getAndrewsRouteBoardJourneyRoutePathLabel")
            && panels.includes("recommendedDestinationKey")
            && panels.includes("option.dataset.routeOptionLabel")
            && panels.includes("option.dataset.routePathLabel")
            && panels.includes("option.dataset.routeSource")
            && panels.includes("option.dataset.routeDestinationLabel")
            && panels.includes("button.dataset.routePathLabel")
            && panels.includes("button.dataset.routeSource")
            && panels.includes("button.dataset.routeDestinationLabel")
            && panels.includes("main.textContent = routePathLabel")
            && clause.includes("primaryRoutePathLabel")
            && panels.includes("container.dataset.routePathLabel = boardPrimaryRoutePathLabel")
            && panels.includes("container.dataset.passengerPrimaryRoutePathLabel")
            && panels.includes("option.dataset.routeRecommendation")
            && panels.includes("option.dataset.routeActionLabel")
            && panels.includes("option.dataset.routeNextSource")
            && panels.includes("function buildAndrewsRouteBoardNetworkLabel")
            && panels.includes('appendAndrewsRouteBoardPill(stationRail, "Red", networkLabel)')
            && panels.includes("function buildAndrewsRouteBoardJourneyReceipt")
            && panels.includes("function buildAndrewsRouteBoardJourneyStationLineFrame")
            && panels.includes("formula-and-surface-share-one-passenger-frame")
            && panels.includes("carry-route-frame-to-output")
            && panels.includes("surface-receives-next-source")
            && panels.includes("carry-station-line-to-output")
            && panels.includes("passengerFrame: journeyPassengerFrame")
            && panels.includes("function pinAndrewsRouteBoardJourneySource")
            && panels.includes("function setAndrewsRouteBoardActiveJourney")
            && panels.includes("function getAndrewsRouteBoardActiveJourneyForBoard")
            && panels.includes("function getAndrewsRouteBoardActiveJourneyReceipt")
            && panels.includes("function cloneAndrewsRouteBoardJourneyForHistory")
            && panels.includes("function getAndrewsRouteBoardJourneyHistoryForBoard")
            && panels.includes("function getAndrewsRouteBoardContinuedJourneyForBoard")
            && panels.includes("function getAndrewsRouteBoardContinuedJourneyReceipt")
            && panels.includes("keep-arrival-visible-after-transfer")
            && panels.includes("suppress-repeat-next-source-action")
            && panels.includes("routeActionFrame: journey.routeActionFrame")
            && panels.includes("passengerFrame: journey.passengerFrame")
            && panels.includes("nextSourceEntryBoard: targetAction?.entryBoard")
            && panels.includes("nextSourceUnitMode: targetAction?.unitMode")
            && panels.includes("function continueAndrewsRouteBoardFromActiveJourney")
            && panels.includes('continuationState: "continued-as-next-source"')
            && panels.includes("AndrewsRouteBoardSourceOverrideStage = { ...journey.nextSourceStage }")
            && panels.includes("entry.nextSourceStage")
            && clause.includes("nextSourceStage: targetStage")
            && clause.includes("nextSourceStageKey")
            && panels.includes("container.dataset.sourceOverrideActive")
            && panels.includes("container.dataset.nextSourceStation")
            && panels.includes("getAndrewsCnvCnnRouteStageFromFormulaInput(input")
            && clause.includes("function getAndrewsCnvCnnRouteBoardReachableDestinationOptions")
            && clause.includes("reachableDestinationOptions.length")
            && panels.includes("function activateAndrewsRouteBoardTarget")
            && panels.includes("function buildAndrewsRouteBoardRouteMeta")
            && panels.includes("function getAndrewsRouteBoardRouteDestinationKey")
            && panels.includes("function getAndrewsRouteBoardLoopStateLabel")
            && panels.includes("function getAndrewsRouteBoardRouteLoopCount")
            && panels.includes("function getAndrewsRouteBoardRouteLoopState")
            && panels.includes("function getAndrewsRouteBoardRouteStops")
            && panels.includes("function appendAndrewsRouteBoardRouteStops")
            && panels.includes("function appendAndrewsRouteBoardRouteConditions")
            && panels.includes("function appendAndrewsRouteBoardDimensions")
            && panels.includes("function appendAndrewsRouteBoardResistancePlan")
            && panels.includes("function appendAndrewsRouteBoardResistanceHypothesis")
            && panels.includes("hypothesis.dataset.resistanceHypothesisTestId")
            && panels.includes("function getAndrewsRouteBoardHypothesisActionLabel")
            && panels.includes("chip.dataset.hypothesisDomain = \"candidate-obstacle\"")
            && panels.includes("button.dataset.routeHypothesisHit")
            && panels.includes("function getAndrewsRouteBoardConversionActionLabel")
            && panels.includes("#1 Entrada · fijar origen")
            && panels.includes("#2 Fórmula · resolver ruta")
            && panels.includes("#3 Salida · entregar trayecto")
            && panels.includes("function renderAndrewsRouteBoardJourneyReceipt")
            && panels.includes("function appendAndrewsRouteBoardJourneySourceLayers")
            && panels.includes("function renderAndrewsRouteBoardJourneyHistory")
            && panels.includes("function renderAndrewsRouteBoardContinuedJourneyReceipt")
            && panels.includes('setOrdinaryNncGenerationModeEnabled(true)')
            && panels.includes("isOrdinaryNncGenerationModeEnabled()")
            && panels.includes("setOrdinaryNncGenerationModeEnabled(false)")
            && panels.includes("setComposerEntryBoard(targetBoard, { force: true })")
            && panels.includes("function renderAndrewsRouteBoard")
            && panels.includes('board.boardState === "destination" ? "Trayecto" : "Salidas"')
            && panels.includes("buildAndrewsCnvCnnRouteBoard({ sourceStage })")
            && panels.includes("destinationStage: destinationOption?.stage || null")
            && panels.includes("AndrewsRouteBoardPinnedSourceInput = rawInput")
            && panels.includes("const selectedBoard = buildAndrewsCnvCnnRouteBoard")
            && panels.includes("activateAndrewsRouteBoardTarget(selectedRoute, selectedBoard)")
            && panels.includes("restoreAndrewsRouteBoardInputIfBlank(AndrewsRouteBoardPinnedSourceInput || inputBeforeActivation)")
            && panels.includes("pinAndrewsRouteBoardJourneySource(board, inputBeforeActivation)")
            && panels.includes("setAndrewsRouteBoardActiveJourney(entry, board)")
            && panels.includes("renderAndrewsRouteBoardJourneyReceipt(body, board)")
            && panels.includes("button.dataset.routeDestination")
            && panels.includes("button.dataset.routeStops")
            && panels.includes("button.dataset.routeConditionFrames")
            && panels.includes("button.dataset.routeIfStage")
            && panels.includes("button.dataset.routeThenStage")
            && panels.includes("button.dataset.routeGateDomains")
            && panels.includes("button.dataset.routeEntryBoard")
            && panels.includes("button.dataset.routeSegmentCount")
            && panels.includes("button.dataset.routeResistanceScore")
            && panels.includes("button.dataset.routeResistanceRole")
            && panels.includes("button.dataset.routeLoopState")
            && panels.includes("button.dataset.routeLoopLabel")
            && panels.includes("button.dataset.routeLoopCount")
            && panels.includes("button.dataset.routeRecommendation")
            && panels.includes("button.dataset.routeActionLabel")
            && panels.includes("routeActionFrame?.recommendationRole")
            && panels.includes("destinationActionFrame?.actionLabel")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardActionFrame")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardPassengerFrame")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardIntentionFrame")
            && clause.includes("primarySourceStageKey")
            && clause.includes("publish-primary-source-layer")
            && clause.includes("single-passenger-same-board-explore-or-destination")
            && clause.includes("one-passenger-intention-many-routes")
            && clause.includes("explore-and-destination-share-one-route-board")
            && clause.includes("destinationActionFrame")
            && panels.includes("function serializeAndrewsRouteBoardIntentions")
            && panels.includes("function cloneAndrewsRouteBoardIntentionFrame")
            && panels.includes("function appendAndrewsRouteBoardPassengerIntentions")
            && panels.includes("function appendAndrewsRouteBoardPassengerFrame")
            && panels.includes("appendAndrewsRouteBoardPassengerFrame(container, board)")
            && panels.includes("const visibleRoutes = Array.isArray(board?.visibleRoutes)")
            && panels.includes("const primaryRoute = (recommendedRouteKey")
            && panels.includes('action.className = "andrews-route-board__pass-action"')
            && panels.includes('action.dataset.actionMode = canContinueJourney ? "continue-next-source" : "activate-route"')
            && panels.includes("pass.dataset.primarySource")
            && panels.includes("pass.dataset.primarySourceLabel")
            && panels.includes("pass.dataset.primaryNextSourceLabel")
            && panels.includes("pass.dataset.primaryRoutePathLabel")
            && panels.includes("receipt.dataset.passengerPrimaryRoutePathLabel")
            && panels.includes("frame.primarySourceLabel || frame.sourceLabel || \"\"")
            && panels.includes("frame.primaryNextSourceLabel || \"\"")
            && panels.includes("frame.primaryRoutePathLabel || frame.primaryNextSourceLabel")
            && panels.includes("action.dataset.routeConditionFrames")
            && panels.includes("action.dataset.routeLoopState")
            && panels.includes("action.dataset.routeLoopLabel")
            && panels.includes("action.dataset.routeLoopCount")
            && panels.includes("action.dataset.routeSourceLabel")
            && panels.includes("action.dataset.routeNextSourceLabel")
            && panels.includes("action.dataset.routePathLabel")
            && panels.includes("action.dataset.routeActionDisplayLabel")
            && panels.includes("action.dataset.routeNextSourceLabel,")
            && panels.includes("continueAndrewsRouteBoardFromActiveJourney();")
            && panels.includes("activateAndrewsRouteBoardTarget(primaryRoute, board)")
            && panels.includes("recommendedActionLabel")
            && panels.includes("option.dataset.routeIds")
            && panels.includes("option.dataset.routeStops")
            && panels.includes("option.dataset.routeConditionFrames")
            && panels.includes("option.dataset.routeLoopState")
            && panels.includes("option.dataset.routeLoopLabel")
            && panels.includes("option.dataset.routeLoopCount")
            && panels.includes("destinationLoopLabel")
            && panels.includes("option.dataset.routeGateDomains")
            && panels.includes("option.dataset.routeResistanceScore")
            && panels.includes("container.dataset.sourceInputKind")
            && panels.includes("container.dataset.sourceInputHasWildcard")
            && panels.includes("container.dataset.sourceCandidateStageCount")
            && panels.includes("container.dataset.sourceCandidateStageKeys")
            && panels.includes("container.dataset.sourceCandidateStageLabels")
            && panels.includes("container.dataset.sourceCandidateStages")
            && panels.includes("container.dataset.sourceFormulaBoundaryKind")
            && panels.includes("container.dataset.sourceFormulaBoundaryConfidence")
            && panels.includes("container.dataset.sourceUnresolvedDimensionCount")
            && panels.includes("container.dataset.sourceInputTicketModel")
            && panels.includes("container.dataset.sourceInputTicketValue")
            && panels.includes("container.dataset.sourceInputTicketEvents")
            && panels.includes("container.dataset.sourceInputTicketDimensions")
            && panels.includes('appendAndrewsRouteBoardPill(stationRail, "Entrada", board.currentStation.inputTicketFrame.inputDisplayLabel)')
            && panels.includes('appendAndrewsRouteBoardPill(stationRail, "Capas", board.sourceCandidateStageLabels.join(" / "))')
            && panels.includes("function appendAndrewsRouteBoardSourceLayers")
            && panels.includes("function serializeAndrewsRouteBoardSourceLayers")
            && panels.includes("function getAndrewsRouteBoardActiveSourceLayer")
            && panels.includes("function buildAndrewsRouteBoardJourneySourceLayerFrame")
            && panels.includes("sourceLayerFrame: journeySourceLayerFrame")
            && panels.includes("appendAndrewsRouteBoardSourceLayers(container, board)")
            && panels.includes("appendAndrewsRouteBoardGeographyMap(container, board,")
            && panels.includes("appendAndrewsRouteBoardJourneySourceLayers(receipt, journey)")
            && panels.includes("receipt.dataset.sourceLayerActiveStation")
            && panels.includes("layerWrap.dataset.sourceLayerActiveStation")
            && panels.includes("container.dataset.sourceLayerActiveStation")
            && panels.includes("chip.dataset.sourceLayerStation")
            && panels.includes("chip.dataset.sourceLayerRole")
            && panels.includes("chip.dataset.sourceStageKey")
            && panels.includes("chip.dataset.sourceStageRole")
            && panels.includes("pass.dataset.sourceTicketModel")
            && panels.includes("pass.dataset.sourceTicketDimensions")
            && panels.includes("pass.dataset.intentionModel")
            && panels.includes("pass.dataset.intentions")
            && panels.includes("function appendAndrewsRouteBoardInputTicketDimensions")
            && panels.includes("function serializeAndrewsRouteBoardTicketDimensions")
            && panels.includes("function appendAndrewsRouteBoardStationLine")
            && panels.includes("function serializeAndrewsRouteBoardStationLineStops")
            && panels.includes("function appendAndrewsRouteBoardConcourse")
            && panels.includes("function serializeAndrewsRouteBoardConcourseStops")
            && panels.includes("appendAndrewsRouteBoardConcourse(container, board)")
            && panels.includes("function appendAndrewsRouteBoardPlatforms")
            && panels.includes("function serializeAndrewsRouteBoardPlatformTracks")
            && panels.includes("track.dataset.sourceStation")
            && panels.includes("track.dataset.routePathLabel")
            && panels.includes("destination.textContent = routePathLabel")
            && panels.includes("function cloneAndrewsRouteBoardPlatformFrame")
            && panels.includes("platformFrame: cloneAndrewsRouteBoardPlatformFrame")
            && panels.includes("appendAndrewsRouteBoardPlatforms(container, board)")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardRideFrame")
            && clause.includes("passenger-rides-station-provides")
            && clause.includes("station-signs-do-switching-passenger-rides")
            && clause.includes("explore-or-destination-one-board")
            && clause.includes("rideFrame")
            && panels.includes("function cloneAndrewsRouteBoardRideFrame")
            && panels.includes("function buildAndrewsRouteBoardJourneyRideFrame")
            && panels.includes("formula-and-surface-share-one-ride-frame")
            && panels.includes("carry-ride-frame-to-output")
            && panels.includes("function appendAndrewsRouteBoardRideFrame")
            && panels.includes("appendAndrewsRouteBoardRideFrame(container, board)")
            && panels.includes("ride.dataset.outputJourneyModel")
            && panels.includes("ride.dataset.primaryRoutePathLabel")
            && panels.includes("ride.dataset.switchingRequired")
            && panels.includes("container.dataset.rideExperienceModel")
            && panels.includes("container.dataset.rideOutputJourneyModel")
            && panels.includes("container.dataset.ridePrimaryRoutePathLabel")
            && panels.includes("container.dataset.rideSwitchingRequired")
            && panels.includes("container.dataset.stationLineModel")
            && panels.includes("container.dataset.stationLineStops")
            && panels.includes("container.dataset.routeMapModel")
            && panels.includes("container.dataset.routeMapAvailableRouteIds")
            && panels.includes("container.dataset.concourseModel")
            && panels.includes("container.dataset.concourseStops")
            && panels.includes("container.dataset.concourseNextStation")
            && panels.includes("container.dataset.platformModel")
            && panels.includes("container.dataset.platformTracks")
            && panels.includes("container.dataset.platformVisibleTrackCount")
            && clause.includes("function buildAndrewsCnvCnnRouteInputTicketFrame")
            && clause.includes("function buildAndrewsCnvCnnRouteInputTicketDimensionSlots")
            && clause.includes("function getAndrewsCnvCnnRouteBoardSourceCandidateStages")
            && clause.includes("contained-verbal-core")
            && clause.includes("contained-verbstem")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardStationLineFrame")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardConcourseFrame")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardPlatformFrame")
            && clause.includes("one-station-map-for-explore-and-destination")
            && clause.includes("station-platforms-from-route-options")
            && clause.includes("entrada-formula-salida-one-route")
            && clause.includes("source-target-route")
            && clause.includes("de-superpose-input-dimensions")
            && clause.includes("limited-entrada-one-passenger-many-routes")
            && clause.includes("carry-entrada-ticket")
            && panels.includes("container.dataset.networkLabel")
            && panels.includes("container.dataset.passengerIntention")
            && panels.includes("container.dataset.passengerIntentionModel")
            && panels.includes("container.dataset.passengerRouteProvisionMode")
            && panels.includes("container.dataset.passengerSharedRouteBoard")
            && panels.includes("container.dataset.passengerIntentions")
            && panels.includes("container.dataset.passengerPrimaryActionLabel")
            && panels.includes("container.dataset.passengerExploreOptionCount")
            && panels.includes("container.dataset.passengerEvents")
            && panels.includes("container.dataset.recommendedRouteIds")
            && panels.includes("container.dataset.recommendedRouteActionLabel")
            && panels.includes("container.dataset.recommendedRouteNextSource")
            && panels.includes("container.dataset.leastVisibleResistanceScore")
            && panels.includes("container.dataset.activeJourneyRouteIds")
            && panels.includes("container.dataset.activeJourneyStops")
            && panels.includes("container.dataset.activeJourneyGateDomains")
            && panels.includes("container.dataset.activeJourneyConditionFrames")
            && panels.includes("container.dataset.activeJourneyIfStage")
            && panels.includes("container.dataset.activeJourneyThenStage")
            && panels.includes("container.dataset.activeJourneyRoutePathLabel")
            && panels.includes("container.dataset.activeJourneyResistanceScore")
            && panels.includes("container.dataset.activeJourneyResistanceRole")
            && panels.includes("container.dataset.continuedJourneyRouteIds")
            && panels.includes("container.dataset.continuedJourneyRoutePathLabel")
            && panels.includes("container.dataset.journeyHistoryLegCount")
            && panels.includes("container.dataset.journeyHistoryRouteIds")
            && panels.includes("container.dataset.journeyHistoryStations")
            && panels.includes("container.dataset.journeyHistoryRoutePaths")
            && panels.includes("container.dataset.continuedJourneyConditionFrames")
            && panels.includes("container.dataset.continuedJourneyIfStage")
            && panels.includes("container.dataset.continuedJourneyThenStage")
            && panels.includes("routeConditionFrames")
            && panels.includes("receipt.dataset.routePathLabel")
            && panels.includes("receipt.dataset.routeConditionFrames")
            && panels.includes("receipt.dataset.routeIfStage")
            && panels.includes("receipt.dataset.routeThenStage")
            && panels.includes("receipt.dataset.routeBoardModel")
            && panels.includes("receipt.dataset.journeyModel")
            && panels.includes("receipt.dataset.passengerIntentionModel")
            && panels.includes("receipt.dataset.passengerIntentions")
            && panels.includes("receipt.dataset.passengerPrimaryActionLabel")
            && panels.includes("receipt.dataset.passengerEvents")
            && panels.includes("container.dataset.resistanceConversionFromRoute")
            && panels.includes("container.dataset.resistanceConversionToRoute")
            && panels.includes("container.dataset.resistanceHypothesisTestId")
            && panels.includes("container.dataset.resistanceHypothesisPValue")
            && panels.includes("container.dataset.resistanceHypothesisActionLabel")
            && panels.includes("appendAndrewsRouteBoardResistanceHypothesis(container, board)")
            && clause.includes("function buildAndrewsCnvCnnRouteBoardResistanceHypothesisFrame")
            && clause.includes("resistanceHypothesisFrame")
            && css.includes(".andrews-route-board__hypothesis")
            && css.includes('.andrews-route-board__ticket-dimension[data-hypothesis-domain="candidate-obstacle"]')
            && panels.includes("container.dataset.resistanceConversionFromRouteLabel")
            && panels.includes("container.dataset.resistanceConversionToRouteLabel")
            && panels.includes("container.dataset.resistanceConversionScoreReduction")
            && panels.includes("container.dataset.resistanceConversionObstacleReduction")
            && panels.includes("container.dataset.resistanceConversionActionEvents")
            && panels.includes("strip.dataset.fromRouteLabel")
            && panels.includes("strip.dataset.toRouteLabel")
            && panels.includes("strip.dataset.actionEvents")
            && panels.includes("chip.dataset.action = item.action")
            && panels.includes("chip.title = item.action")
            && panels.includes("chip.dataset.actionLabel")
            && panels.includes("andrews-route-board__conversion-action")
            && rendering.includes("container.dataset.resistanceRole")
            && rendering.includes("journey.resistanceRoleLabel")
            && rendering.includes("function getActiveAndrewsOutputJourneyReceipt")
            && rendering.includes("function appendOutputJourneyStopRail")
            && rendering.includes("function appendOutputJourneyStationLine")
            && rendering.includes("function serializeOutputJourneyStationLineStops")
            && rendering.includes("function getOutputJourneyRouteConditionFrames")
            && rendering.includes("function serializeOutputJourneyRouteConditionFrames")
            && rendering.includes("function appendOutputJourneyRouteConditions")
            && rendering.includes("function appendOutputJourneyDimensions")
            && rendering.includes("function appendOutputJourneyPassengerFrame")
            && rendering.includes("function appendOutputJourneyConcourse")
            && rendering.includes("function serializeOutputJourneyConcourseStops")
            && rendering.includes("function appendOutputJourneyRideFrame")
            && rendering.includes("ride.dataset.outputJourneyModel")
            && rendering.includes("ride.dataset.primaryRoutePathLabel")
            && rendering.includes("function appendOutputJourneyItinerary")
            && rendering.includes("function serializeOutputJourneyHistoryLegs")
            && rendering.includes("function getOutputJourneyRoutePathLabel")
            && rendering.includes("function appendOutputJourneySourceLayers")
            && rendering.includes("function serializeOutputJourneySourceLayers")
            && rendering.includes("function appendOutputJourneyPlatform")
            && rendering.includes("function serializeOutputJourneyPlatformTracks")
            && rendering.includes("platform.dataset.sourceStation")
            && rendering.includes("platform.dataset.routePathLabel")
            && rendering.includes("selected.routePathLabel ||")
            && rendering.includes("leg.dataset.routePathLabel")
            && rendering.includes("main.textContent = routePathLabel")
            && rendering.includes("function appendOutputJourneyNextSource")
            && rendering.includes("function renderOutputJourneyStrip")
            && rendering.includes("getAndrewsRouteBoardContinuedJourneyReceipt")
            && rendering.includes('outputJourneyState: continuedJourney.outputJourneyState || "continued-as-next-source"')
            && rendering.includes('journey.outputJourneyState === "continued-as-next-source"')
            && rendering.includes("renderOutputJourneyStrip();")
            && rendering.includes('document.createElement("button")')
            && rendering.includes("continueAndrewsRouteBoardFromActiveJourney();")
            && rendering.includes("container.dataset.nextSourceStation")
            && rendering.includes("container.dataset.nextSourceEntryBoard")
            && rendering.includes("container.dataset.targetActionLabel")
            && rendering.includes("container.dataset.routeBoardModel")
            && rendering.includes("container.dataset.outputJourneyState")
            && rendering.includes("container.dataset.routePathLabel")
            && rendering.includes("pass.dataset.primaryRoutePathLabel")
            && rendering.includes("source.dataset.routePathLabel")
            && rendering.includes("element.dataset.routePathLabel = stationLineFrame.routePathLabel")
            && rendering.includes("routePathLabel: stationLineFrame?.routePathLabel")
            && rendering.includes("ruta: ${routePathLabel}")
            && rendering.includes("chipEl.dataset.surfaceRoutePathLabel")
            && rendering.includes("chip.dataset.passengerPrimaryRoutePathLabel")
            && rendering.includes("chip.dataset.routePathLabel = chip.dataset.passengerPrimaryRoutePathLabel")
            && rendering.includes("chip.dataset.routePathLabel || nextSourceLabel")
            && rendering.includes("container.dataset.passengerPrimaryRoutePathLabel")
            && rendering.includes("container.dataset.journeyModel")
            && rendering.includes("container.dataset.passengerPrimaryActionLabel")
            && rendering.includes("container.dataset.stationLineModel")
            && rendering.includes("container.dataset.stationLineStops")
            && rendering.includes("container.dataset.concourseModel")
            && rendering.includes("container.dataset.sourceLayerModel")
            && rendering.includes("container.dataset.sourceLayers")
            && rendering.includes("container.dataset.sourceLayerActiveStation")
            && rendering.includes("rail.dataset.sourceLayerActiveStation")
            && rendering.includes("chip.dataset.sourceLayerStation")
            && rendering.includes("chip.dataset.sourceLayerRole")
            && rendering.includes("appendOutputJourneySourceLayers(container, journey)")
            && rendering.includes("container.dataset.concourseStops")
            && rendering.includes("container.dataset.journeyHistoryLegCount")
            && rendering.includes("container.dataset.journeyHistoryLegs")
            && rendering.includes("container.dataset.journeyHistoryRouteIds")
            && rendering.includes("container.dataset.journeyHistoryRoutePaths")
            && rendering.includes("container.dataset.platformModel")
            && rendering.includes("container.dataset.platformTracks")
            && rendering.includes("container.dataset.rideOutputJourneyModel")
            && rendering.includes("container.dataset.ridePrimaryRoutePathLabel")
            && rendering.includes("container.dataset.rideSwitchingRequired")
            && rendering.includes("container.dataset.routeConditionFrames")
            && rendering.includes("container.dataset.routeIfStage")
            && rendering.includes("container.dataset.routeThenStage")
            && rendering.includes("appendOutputJourneyRideFrame(container, journey)")
            && rendering.includes("chip.dataset.passengerPrimaryActionLabel")
            && rendering.includes("function getActiveAndrewsStationLineFrameForRendering")
            && rendering.includes("function applyAndrewsStationLineDatasetToSurfaceElement")
            && rendering.includes("element.dataset.stationLineModel")
            && rendering.includes("function getActiveAndrewsRouteConditionFrameForRendering")
            && rendering.includes("function applyAndrewsRouteConditionDatasetToSurfaceElement")
            && rendering.includes("element.dataset.routeConditionFrames")
            && rendering.includes("function getActiveAndrewsSourceLayerFrameForRendering")
            && rendering.includes("function applyAndrewsSourceLayerDatasetToSurfaceElement")
            && rendering.includes("element.dataset.sourceLayerModel")
            && rendering.includes("surfaceFrame.sourceLayerFrame")
            && rendering.includes("function getActiveAndrewsRideFrameForRendering")
            && rendering.includes("function applyAndrewsRideDatasetToSurfaceElement")
            && rendering.includes("element.dataset.rideExperienceModel")
            && rendering.includes("surfaceFrame.rideFrame")
            && rendering.includes("applyAndrewsRideDatasetToSurfaceElement(chipEl, surfaceFrame.rideFrame)")
            && rendering.includes("applyAndrewsRideDatasetToSurfaceElement(surfaceText, rideFrame)")
            && rendering.includes("rideFrame?.primaryRoutePathLabel")
            && rendering.includes("function syncConjugationConversionSurfaceRouteFrame")
            && rendering.includes('surfaceText.dataset.andrewsRouteSurfacePriority = "surface-line"')
            && rendering.includes("function buildVisibleCnvFormulaSurfaceFrame")
            && rendering.includes('pathModel: "surface-line-priority-formula-chip-receives"')
            && rendering.includes("surface-line-receives-active-route-frame")
            && rendering.includes("routeRecordId || stationLineFrame?.routePathLabel")
            && rendering.includes("chipEl.dataset.surfacePriority")
            && events.includes("clearAndrewsRouteBoardPinnedJourney();")
            && events.includes("renderAndrewsRouteBoard();")
            && panels.includes("renderAndrewsRouteBoard(verbMeta)")
            && css.includes(".andrews-route-board")
            && css.includes(".andrews-route-board__map")
            && css.includes(".andrews-route-board__map-terrain")
            && css.includes(".andrews-route-board__map-terrain-chip")
            && css.includes(".andrews-route-board__map-service")
            && css.includes(".andrews-route-board__map-service-chip")
            && css.includes(".andrews-route-board__map-advisory")
            && css.includes('.andrews-route-board__map-advisory[data-service-advisory-level="clear"]')
            && css.includes(".andrews-route-board__map-advisory-item")
            && css.includes(".andrews-route-board__map-advisory-main")
            && css.includes(".andrews-route-board__map-advisory-meta")
            && css.includes(".andrews-route-board__map-dimensions")
            && css.includes(".andrews-route-board__map-dimension-chip")
            && css.includes('.andrews-route-board__map-dimension-chip[data-map-gis-layer-status="routed"]')
            && css.includes(".andrews-route-board__map-gis-layer-list")
            && css.includes(".andrews-route-board__map-gis-layer")
            && css.includes(".andrews-route-board__map-gis-layer-name")
            && css.includes(".andrews-route-board__map-gis-layer-value")
            && css.includes(".andrews-route-board__map-wayfinding")
            && css.includes(".andrews-route-board__map-wayfinding-sign")
            && css.includes(".andrews-route-board__map-trip-preview")
            && css.includes(".andrews-route-board__map-headsign")
            && css.includes(".andrews-route-board__map-headsign-item")
            && css.includes(".andrews-route-board__map-headsign-meta")
            && css.includes(".andrews-route-board__map-continuity")
            && css.includes(".andrews-route-board__map-continuity-item")
            && css.includes(".andrews-route-board__map-continuity-meta")
            && css.includes(".andrews-route-board__map-announcements")
            && css.includes(".andrews-route-board__map-announcement")
            && css.includes(".andrews-route-board__map-transfer-guidance")
            && css.includes(".andrews-route-board__map-transfer-guidance-item")
            && css.includes(".andrews-route-board__map-transfer-guidance-meta")
            && css.includes(".andrews-route-board__map-itinerary")
            && css.includes(".andrews-route-board__map-itinerary-stop")
            && css.includes(".andrews-route-board__map-station-directory")
            && css.includes(".andrews-route-board__map-station-directory-item")
            && css.includes(".andrews-route-board__map-options")
            && css.includes(".andrews-route-board__map-option")
            && css.includes('.andrews-route-board__map-option[data-option-state="recommended"]')
            && css.includes(".andrews-route-board__map-departures")
            && css.includes(".andrews-route-board__map-departure")
            && css.includes(".andrews-route-board__map-destinations")
            && css.includes(".andrews-route-board__map-destination")
            && css.includes(".andrews-route-board__map-geography")
            && css.includes(".andrews-route-board__map-geography-region")
            && css.includes(".andrews-route-board__map-geography-grid-line")
            && css.includes(".andrews-route-board__map-geography-label")
            && css.includes(".andrews-route-board__map-dimension-landmarks")
            && css.includes(".andrews-route-board__map-dimension-landmark")
            && css.includes(".andrews-route-board__map-compass")
            && css.includes(".andrews-route-board__map-compass-ring")
            && css.includes(".andrews-route-board__map-compass-needle")
            && css.includes(".andrews-route-board__map-track-beds")
            && css.includes(".andrews-route-board__map-track-bed")
            && css.includes(".andrews-route-board__map-track-bed--outer")
            && css.includes('.andrews-route-board__map-track-bed[data-route-map-state="active"]')
            && css.includes(".andrews-route-board__map-line")
            && css.includes('.andrews-route-board__map-line[data-route-map-state="active"]')
            && css.includes('.andrews-route-board__map-line[data-route-resistance-role="least"]')
            && css.includes('.andrews-route-board__map-line[data-route-resistance-role="most"]')
            && css.includes('.andrews-route-board__map-line[data-route-hypothesis-hit="true"]')
            && css.includes('.andrews-route-board__map-line[data-route-map-selectable="true"]')
            && css.includes(".andrews-route-board__map-route-directions")
            && css.includes(".andrews-route-board__map-route-direction")
            && css.includes(".andrews-route-board__map-route-direction-arrow")
            && css.includes(".andrews-route-board__map-line-stations")
            && css.includes(".andrews-route-board__map-line-station")
            && css.includes('.andrews-route-board__map-line-station[data-route-map-state="active"]')
            && css.includes(".andrews-route-board__map-transfer-hubs")
            && css.includes(".andrews-route-board__map-transfer-hub-ring")
            && css.includes(".andrews-route-board__map-transfers")
            && css.includes(".andrews-route-board__map-transfer-service-chip")
            && css.includes(".andrews-route-board__map-terminals")
            && css.includes(".andrews-route-board__map-terminal")
            && css.includes(".andrews-route-board__map-terminal-code")
            && css.includes(".andrews-route-board__map-terminal-main")
            && css.includes(".andrews-route-board__map-symbol-key")
            && css.includes(".andrews-route-board__map-symbol-key-item")
            && css.includes(".andrews-route-board__map-symbol-key-icon")
            && css.includes('.andrews-route-board__map-symbol-key-icon[data-map-symbol-kind="transfer"]')
            && css.includes('.andrews-route-board__map-symbol-key-icon[data-map-symbol-kind="dimension-landmark"]')
            && css.includes(".andrews-route-board__map-layer-stack")
            && css.includes(".andrews-route-board__map-layer-stack-list")
            && css.includes(".andrews-route-board__map-layer")
            && css.includes(".andrews-route-board__map-layer-name")
            && css.includes(".andrews-route-board__map-layer-role")
            && css.includes(".andrews-route-board__map-approval")
            && css.includes('.andrews-route-board__map-approval[data-engine-audit-state="incomplete"]')
            && css.includes(".andrews-route-board__map-approval-list")
            && css.includes(".andrews-route-board__map-approval-item")
            && css.includes(".andrews-route-board__map-approval-role")
            && css.includes(".andrews-route-board__map-corridors")
            && css.includes(".andrews-route-board__map-corridor")
            && css.includes(".andrews-route-board__map-corridor-service-chip")
            && css.includes(".andrews-route-board__map-corridor-name")
            && css.includes(".andrews-route-board__map-route-badge")
            && css.includes('.andrews-route-board__map-route-badge[data-route-resistance-role="least"]')
            && css.includes('.andrews-route-board__map-route-badge[data-route-resistance-role="most"]')
            && css.includes(".andrews-route-board__map-route-badge-text")
            && css.includes(".andrews-route-board__map-route-terminals")
            && css.includes(".andrews-route-board__map-route-terminal")
            && css.includes(".andrews-route-board__map-route-terminal-dot")
            && css.includes(".andrews-route-board__map-route-terminal-code")
            && css.includes(".andrews-route-board__map-destination-callouts")
            && css.includes(".andrews-route-board__map-destination-callout")
            && css.includes(".andrews-route-board__map-destination-callout-text")
            && css.includes(".andrews-route-board__map-station")
            && css.includes(".andrews-route-board__map-station-hit")
            && css.includes(".andrews-route-board__map-station-label")
            && css.includes("pointer-events: none")
            && css.includes(".andrews-route-board__map-station-service")
            && css.includes(".andrews-route-board__map-station-service-chip")
            && css.includes(".andrews-route-board__map-station-directory-service")
            && css.includes(".andrews-route-board__map-station-directory-service-chip")
            && css.includes(".andrews-route-board__map-station-flag")
            && css.includes('.andrews-route-board__map-station[data-station-selectable="true"]')
            && css.includes(".andrews-route-board__map-legend")
            && css.includes('.andrews-route-board__map-legend-item[data-route-map-selectable="true"]')
            && css.includes(".andrews-route-board__destination-select")
            && css.includes(".andrews-route-board__route")
            && css.includes(".andrews-route-board__route-topline")
            && css.includes(".andrews-route-board__route-badge")
            && css.includes(".andrews-route-board__conditions")
            && css.includes(".andrews-route-board__condition")
            && css.includes('data-route-recommendation="next"')
            && css.includes('data-route-recommendation="alternate"')
            && css.includes(".andrews-route-board__route-meta")
            && css.includes(".andrews-route-board__pass")
            && css.includes(".andrews-route-board__pass-main")
            && css.includes(".andrews-route-board__pass-meta")
            && css.includes(".andrews-route-board__intentions")
            && css.includes(".andrews-route-board__intention")
            && css.includes('[data-intention-selected="true"]')
            && css.includes(".andrews-route-board__concourse")
            && css.includes(".andrews-route-board__concourse-stop")
            && css.includes(".andrews-route-board__concourse-action")
            && css.includes(".andrews-route-board__platform-board")
            && css.includes(".andrews-route-board__platform")
            && css.includes(".andrews-route-board__platform-destination")
            && css.includes(".andrews-route-board__ride")
            && css.includes(".andrews-route-board__ride-main")
            && css.includes(".andrews-route-board__ride-meta")
            && css.includes(".andrews-route-board__pass-action")
            && css.includes(".andrews-route-board__pass-action:hover")
            && css.includes(".andrews-route-board__pass-action[data-route-loop-state]")
            && css.includes(".andrews-route-board__station-line")
            && css.includes(".andrews-route-board__station-line-stop")
            && css.includes(".andrews-route-board__source-layers")
            && css.includes(".andrews-route-board__source-layer")
            && css.includes(".andrews-route-board__source-layer-rail")
            && css.includes(".andrews-route-board__ticket-dimensions")
            && css.includes(".andrews-route-board__ticket-dimension")
            && css.includes(".andrews-route-board__journey")
            && css.includes(".andrews-route-board__journey-main")
            && css.includes(".andrews-route-board__journey-meta")
            && css.includes(".andrews-route-board__journey--continued")
            && css.includes(".andrews-route-board__itinerary")
            && css.includes(".andrews-route-board__itinerary-leg")
            && css.includes(".andrews-route-board__route-stops")
            && css.includes(".andrews-route-board__route-stop")
            && css.includes(".andrews-route-board__dimensions")
            && css.includes(".andrews-route-board__dimension")
            && css.includes(".andrews-route-board__conversion")
            && css.includes(".andrews-route-board__conversion-route")
            && css.includes(".andrews-route-board__conversion-actions")
            && css.includes(".andrews-route-board__conversion-action")
            && css.includes(".andrews-route-board__conversion-dimensions")
            && css.includes(".andrews-route-board__conversion-dimension")
            && css.includes(".output-journey-strip")
            && css.includes(".output-journey-strip__main")
            && css.includes(".output-journey-strip__pass")
            && css.includes(".output-journey-strip__pass-main")
            && css.includes(".output-journey-strip__pass-meta")
            && css.includes(".output-journey-strip__platform")
            && css.includes(".output-journey-strip__platform-main")
            && css.includes(".output-journey-strip__platform-meta")
            && css.includes(".output-journey-strip__ride")
            && css.includes(".output-journey-strip__ride-main")
            && css.includes(".output-journey-strip__ride-meta")
            && css.includes(".output-journey-strip__concourse")
            && css.includes(".output-journey-strip__concourse-stop")
            && css.includes(".output-journey-strip__concourse-action")
            && css.includes(".output-journey-strip__itinerary")
            && css.includes(".output-journey-strip__itinerary-leg")
            && css.includes(".output-journey-strip__itinerary-main")
            && css.includes(".output-journey-strip__station-line")
            && css.includes(".output-journey-strip__station-stop")
            && css.includes(".output-journey-strip__source-layers")
            && css.includes(".output-journey-strip__source-layer")
            && css.includes(".output-journey-strip__stops")
            && css.includes(".output-journey-strip__stop")
            && css.includes(".output-journey-strip__conditions")
            && css.includes(".output-journey-strip__condition")
            && css.includes(".output-journey-strip__dimensions")
            && css.includes(".output-journey-strip__dimension")
            && css.includes(".output-journey-strip__next-source")
            && css.includes(".output-journey-strip__next-source:hover")
            && css.includes('data-route-resistance-role="least"')
            && css.includes('data-route-resistance-role="most"')
    );
    s.ok(
        "source-target perception lives on structured Tipo de clausula and Unidad route frames without mounting route directory",
        html.includes('data-source-formula-type="CNV"')
            && html.includes('data-source-formula-type="CNN"')
            && html.includes('data-target-formula-type="CNV"')
            && html.includes('data-target-formula-type="CNN"')
            && !html.includes("data-source-target-options")
            && formulaPanelHtml.includes('class="calc-unit-route-strip"')
            && formulaPanelHtml.includes("CNV/CNN → CNV/CNN")
            && state.includes("buildAndrewsUnitSourceTargetRouteOptionsSourceFrame(activeNawatMode)")
            && state.includes("buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(activeSourceFrame)")
            && state.includes("applyAndrewsUnitSourceTargetRouteOptionsDataset(operators, activeOperationFrame)")
            && !state.includes("operators.dataset.sourceTargetOptions = button.dataset.sourceTargetOptions")
            && !state.includes("operators.dataset.targetFormulaType = button.dataset.targetFormulaType")
            && composer.includes('button.dataset.sourceTargetPerception = "clause-type-source-route-options"')
            && !panels.includes("columns.push(routeDirectoryColumn)")
            && css.includes(".calc-operator-chip__route")
            && css.includes(".verb-entry-board-tabs__route")
            && css.includes(".calc-unit-route-strip")
            && css.includes("min-height: calc(var(--button-height-action) + 26px);")
            && css.includes("#container-inputs #composer-slot-stage > .verb-entry-board-tabs .verb-entry-board-tabs__button")
            && css.includes("min-height: 36px;")
            && css.includes("color: rgba(54, 49, 42, 0.62);")
    );
    s.ok(
        "#2 formula panel exposes tense, unit, and derivation controls",
        html.includes('id="tense-tabs"')
            && html.includes('class="tense-tabs formula-slot-controls"')
            && html.includes('class="calc-operators formula-controls-grid"')
            && formulaPanelHtml.indexOf('class="calc-operators formula-controls-grid"') >= 0
            && formulaPanelHtml.indexOf('id="tense-tabs"') > formulaPanelHtml.indexOf('class="calc-operators formula-controls-grid"')
            && html.includes('data-andrews-formula-role="formula-mode-derivation-controls"')
            && html.includes('data-tense-mode="verbo"')
            && html.includes('data-tense-mode="sustantivo"')
            && html.includes('data-mode-system="unit"')
            && html.includes('class="calc-operator-chip__main">Verbal</span>')
            && html.includes('class="calc-operator-chip__main">Nominal</span>')
            && html.includes('data-derivation-type="direct"')
            && html.includes('data-derivation-type="causative"')
            && html.includes('data-derivation-type="applicative"')
            && />\s*Causativo\s*<\/button>/.test(html)
            && />\s*Aplicativo\s*<\/button>/.test(html)
            && !html.includes('id="derivation-antiderivative"')
            && !html.includes('id="andrews-route-board"')
            && !html.includes('id="derivation-type"')
            && !panels.includes("showAndrewsRouteDirectoryInTenseTabs")
            && !panels.includes("mainWrap.appendChild(routeDirectoryColumn)")
            && state.includes('document.querySelectorAll("[data-ordinary-nnc-mode]").forEach')
            && state.includes('const buttons = document.querySelectorAll("[data-tense-mode]")')
            && state.includes('const buttons = Array.from(document.querySelectorAll("[data-derivation-type]"))')
            && !/function initTenseModeTabs\(\) \{\n\s+const buttons = document\.querySelectorAll\("\[data-tense-mode\]"\);\n\s+if \(!buttons\.length\)/.test(state)
            && css.includes("#panel-stack-pane-tense .calc-operators")
            && !css.includes("#panel-stack-pane-tense > #derivation-antiderivative")
            && !css.includes("#panel-stack-pane-tense > #andrews-route-board")
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
        "Andrews workspace starts as a formula app without intro sections",
        html.includes('id="andrews-workspace"')
            && html.indexOf('id="formula-workbench"') > html.indexOf('id="andrews-workspace"')
            && html.indexOf('id="formula-workbench"') < html.indexOf('class="panel-grid"')
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
        html.includes("<title>Gramática nawat/pipil Andrews</title>")
            && html.includes('id="app-title"')
            && html.includes(">Gramática nawat/pipil Andrews<")
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
    s.ok(
        "desktop workspace places #1 Entrada over #2 Formula left of #3 Salida",
        css.includes('grid-template-columns: minmax(330px, 0.46fr) minmax(0, 1fr);')
            && css.includes('"main output"')
            && css.includes('.panel-main-column {\n  grid-area: main;')
            && css.includes('.panel-output-column {\n  grid-area: output;')
    );
    s.ok(
        "entrada source controls fit inside the left workspace column",
        css.includes("#container-inputs #composer-slot-stage > .verb-composer__top-row")
            && css.includes("grid-template-columns: repeat(2, minmax(0, 1fr));")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__matrix-input-row")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__matrix-head .verb-composer__slot-tabs")
            && css.includes("grid-template-columns: minmax(72px, 0.42fr) minmax(0, 0.58fr);")
            && css.includes("#container-inputs #composer-slot-stage > .verb-composer__bottom-row > .verb-composer__object-pair")
            && css.includes("grid-template-columns: minmax(0, 1fr);")
            && !css.includes("grid-template-columns: minmax(150px, 0.82fr) minmax(240px, 1.4fr);")
    );
    s.ok(
        "entrada top-row labels and transitivity tabs stay compact and level",
        css.includes("#container-inputs #composer-slot-stage .verb-composer__slot-tabs--transitivity")
            && css.includes("grid-template-columns: repeat(3, minmax(0, 1fr));")
            && css.includes("font-size: 0.56rem;")
            && css.includes("white-space: nowrap;")
            && css.includes("text-overflow: ellipsis;")
            && css.includes("grid-template-rows: 24px minmax(24px, auto);")
            && css.includes("grid-template-columns: max-content minmax(0, 1fr);")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__top-row .verb-composer__embed-input-row")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__top-row .verb-composer__matrix-input-row")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__top-row .verb-composer__matrix-head > .verb-composer__sub-label")
            && !css.includes(".verb-composer__stem-field.has-slot-entry-button > .verb-composer__sub-label,\n#container-inputs #composer-slot-stage .verb-composer__matrix-field.has-slot-entry-button")
    );
    s.ok(
        "nominal entrada composer collapses to the predicate-base slot only",
        css.includes('#container-inputs .verb-composer[data-entry-board="ordinary-nnc"] #composer-slot-stage')
            && css.includes('grid-template-areas:\n    "entry"\n    "source";')
            && css.includes('grid-template-columns: auto repeat(3, minmax(0, 1fr));')
            && css.includes('#container-inputs .verb-composer[data-entry-board="ordinary-nnc"] #composer-slot-stage .verb-composer__slot-tabs--transitivity')
            && css.includes('#container-inputs .verb-composer[data-entry-board="ordinary-nnc"] #composer-slot-stage .verb-composer__embed-field')
            && css.includes('#container-inputs .verb-composer[data-entry-board="ordinary-nnc"] #composer-slot-stage .verb-composer__supportive-i-button')
            && css.includes('display: none !important;')
            && css.includes('#container-inputs .verb-composer[data-entry-board="ordinary-nnc"] #composer-slot-stage .verb-composer__matrix-field')
            && css.includes('grid-template-rows: 18px minmax(24px, auto);')
    );
    s.ok(
        "entrada slot buttons select slot-input paths while visible typing stays in input#verb",
        html.includes('id="verb"')
            && html.includes('id="composer-stem-a"')
            && composer.includes("var ComposerVerbSlotEntryTarget = null")
            && composer.includes("var ComposerVerbSlotEntryLastVerbValue")
            && composer.includes("function buildComposerSlotEntryButton")
            && composer.includes("className = \"verb-composer__slot-entry-button\"")
            && composer.includes("aria-controls\", \"verb\"")
            && composer.includes("verbEl.dataset.composerSlotRouterBound")
            && composer.includes("clearComposerSlotEntryTarget()")
            && composer.includes("function getComposerSlotEntryStateValue")
            && composer.includes("function handleComposerVerbSlotBeforeInput")
            && composer.includes("function handleComposerVerbSlotInput")
            && composer.includes("applyComposerSlotEntryTargetInputValue")
            && composer.includes("targetInput.value = nextValue")
            && composer.includes('verbEl.addEventListener("beforeinput", handleComposerVerbSlotBeforeInput)')
            && composer.includes('verbEl.addEventListener("input", handleComposerVerbSlotInput)')
            && composer.includes("const slotStemInputs = COMPOSER_SLOT_KEYS")
            && composer.includes("const slotOtherControls = COMPOSER_SLOT_KEYS")
            && composer.includes("inputEl.classList.add(\"is-hidden-control\")")
            && composer.includes("shell.classList.add(\"has-slot-entry-button\")")
            && composer.includes("field?.classList?.add(\"has-slot-entry-button\")")
            && composer.includes("function getComposerSlotEntryButtonLabel")
            && composer.includes("function getComposerSlotEntryButtonVisibleText")
            && composer.includes("return normalizedValue ? `(${normalizedValue})` : \"\"")
            && composer.includes("focusComposerSlotEntryTarget(inputEl")
            && css.includes(".verb-composer__slot-entry-button")
            && css.includes(".verb-composer__tagged-input-shell.has-slot-entry-button")
            && css.includes(".verb-composer__slot-entry-label")
            && css.includes(".verb-composer__slot-entry-value")
            && css.includes("display: none;")
            && !css.includes(".verb-composer__matrix-field.has-slot-entry-button .verb-composer__matrix-head > .verb-composer__sub-label")
            && css.includes("#container-inputs #composer-slot-stage .verb-composer__slot-entry-button")
            && css.includes(".verb-composer__tagged-input-shell .verb-composer__tagged-input-control.is-hidden-control")
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
            && html.includes('class="tense-tabs formula-slot-controls"')
            && html.includes('data-andrews-vnc-slot="tns"')
            && html.includes('data-andrews-nnc-slot="st"')
            && html.includes('class="calc-operators formula-controls-grid"')
            && html.includes('data-andrews-formula-role="formula-mode-derivation-controls"')
            && html.includes('data-tense-mode="verbo"')
            && html.includes('data-tense-mode="sustantivo"')
            && html.includes('data-derivation-type="causative"')
            && html.includes('data-derivation-type="applicative"')
            && !html.includes('formula-controls-section--predicate-route"')
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
        "#2 formula controls expose only the compact unit and derivation axes",
        formulaPanelHtml.includes('class="calc-operators formula-controls-grid"')
            && formulaPanelHtml.includes('aria-label="Tipo de cláusula nuclear"')
            && formulaPanelHtml.includes('data-tense-mode="verbo"')
            && formulaPanelHtml.includes('data-tense-mode="sustantivo"')
            && formulaPanelHtml.includes('data-mode-system="unit"')
            && formulaPanelHtml.includes('aria-label="Derivación verbal"')
            && formulaPanelHtml.includes('data-derivation-type="direct"')
            && formulaPanelHtml.includes('data-derivation-type="causative"')
            && formulaPanelHtml.includes('data-derivation-type="applicative"')
            && formulaPanelHtml.includes('class="calc-operator-chip__main">Verbal</span>')
            && formulaPanelHtml.includes('class="calc-operator-chip__main">Nominal</span>')
            && />\s*Causativo\s*<\/button>/.test(formulaPanelHtml)
            && />\s*Aplicativo\s*<\/button>/.test(formulaPanelHtml)
            && !formulaPanelHtml.includes('aria-label="Clase formal"')
            && !formulaPanelHtml.includes(">Clase formal<")
            && !formulaPanelHtml.includes("Unidad y función")
            && !formulaPanelHtml.includes('id="calc-mode-operator-label"')
            && !formulaPanelHtml.includes('data-ui-label-key="calc-mode-operator-label"')
            && !formulaPanelHtml.includes('id="calc-mode-system-function"')
            && !formulaPanelHtml.includes('data-mode-system="function"')
            && !formulaPanelHtml.includes('data-mode-role="function"')
            && !formulaPanelHtml.includes('data-function-role=')
            && !formulaPanelHtml.includes("Clase sintáctica")
            && !formulaPanelHtml.includes('data-mode-system="unit-route"')
            && !formulaPanelHtml.includes('data-formal-route=')
            && !formulaPanelHtml.includes('data-formal-owner=')
            && !formulaPanelHtml.includes('data-function-role="adjectival"')
            && !formulaPanelHtml.includes('data-function-role="adverbial"')
            && !formulaPanelHtml.includes("CNV/CNN adjetival")
            && !formulaPanelHtml.includes("CNV/CNN adverbial")
            && !formulaPanelHtml.includes('aria-label="Función verbal"')
            && !formulaPanelHtml.includes('title="Función verbal"')
            && !formulaPanelHtml.includes('data-ui-label-key="tense-tabs-function-adjectival"')
            && !formulaPanelHtml.includes('data-ui-label-key="tense-tabs-function-adverbial"')
            && !formulaPanelHtml.includes('id="calc-mode-system-unit"')
            && !formulaPanelHtml.includes('data-ui-label-key="mode-system-unit"')
            && !formulaPanelHtml.includes('data-mode-role="unit"')
            && !/>\s*Clase formal\s*<\/div>/.test(formulaPanelHtml)
            && !formulaPanelHtml.includes('data-unit-kind="cnv"')
            && !formulaPanelHtml.includes('data-unit-kind="cnn"')
            && !formulaPanelHtml.includes('data-unit-kind="particula"')
            && !formulaPanelHtml.includes('data-ui-label-key="tense-tabs-unit-cnv"')
            && !formulaPanelHtml.includes('data-ui-label-key="tense-tabs-unit-cnn"')
            && !formulaPanelHtml.includes('data-ui-label-key="tense-tabs-unit-particle"')
            && !/>\s*CNV · cláusula verbal\s*<\/button>/.test(formulaPanelHtml)
            && !/>\s*CNN · cláusula nominal\s*<\/button>/.test(formulaPanelHtml)
            && !/>\s*Partícula\s*<\/button>/.test(formulaPanelHtml)
            && !formulaPanelHtml.includes("Convención europea")
            && !formulaPanelHtml.includes('data-mode-system="european"')
            && !formulaPanelHtml.includes('data-mode-system="nawat"')
            && !formulaPanelHtml.includes('data-ui-label-key="mode-system-european"')
            && !formulaPanelHtml.includes('id="calc-mode-system-nawat"')
            && staticLabels.includes('"mode-system-function"')
            && staticLabels.includes('"tense-tabs-function-adjectival"')
            && staticLabels.includes('"labelEs": "Uso adjetival"')
            && staticLabels.includes('"tense-tabs-unit-cnv": { "labelEs": "CNV · cláusula verbal"')
            && staticLabels.includes('"tense-tabs-unit-cnn": { "labelEs": "CNN · cláusula nominal"')
            && !staticLabels.includes("CNV/CNN adjetival")
            && !staticLabels.includes("CNV/CNN adverbial")
            && staticLabels.includes('"labelEs": "Ruta funcional"')
            && staticLabels.includes('"labelEs": "Clase formal"')
            && !staticLabels.includes("convención europea")
            && !staticLabels.includes('"labelEs": "nawat"')
            && !staticLabels.includes("Clase sintáctica")
            && staticLabels.includes('"tense-tabs-unit-cnv"')
            && staticModes.includes('"function": { "value": "function"')
            && staticModes.includes('"unit": { "value": "unit"')
            && staticModes.includes('"labelEs": "Ruta funcional"')
            && staticModes.includes('"labelEs": "Clase formal"')
            && !staticModes.includes("Clase sintáctica")
            && Object.keys(staticModesJson.tenseMode || {}).join(",") === "verbo,sustantivo,particula"
            && !Object.prototype.hasOwnProperty.call(staticModesJson, ["function", "Tense", "Mode"].join(""))
            && Object.keys(staticModesJson.functionRole || {}).join(",") === "adjetivo,adverbio"
            && !staticGroups.includes('"adjetivo": {')
            && !staticGroups.includes('"adverbio": {')
            && staticGroups.includes('"particula": {')
            && !staticGroups.includes('"CNV en función adjetival"')
            && !staticGroups.includes('"CNN en función adjetival"')
            && !staticGroups.includes('"CNV en función adverbial"')
            && !staticGroups.includes('"presente-desiderativo"')
            && !staticGroups.includes('"condicional"')
            && !staticGroups.includes('"perfecto"')
            && !staticGroups.includes('"potencial"')
            && !staticGroups.includes('"heading": { "labelEs": "Función adjetival"')
            && !staticGroups.includes('"heading": { "labelEs": "Función adverbial"')
            && !staticModes.includes('"routeMode": "adjetivo"')
            && !staticModes.includes('"routeMode": "adverbio"')
            && !staticModes.includes('"targetMode": "adjetivo"')
            && !staticModes.includes('"targetMode": "adverbio"')
            && !staticModes.includes('"sourceMode": "adjetivo"')
            && !staticModes.includes('"sourceMode": "adverbio"')
            && staticModes.includes('"routeFunctionMode": "adjetivo"')
            && !state.includes("operators.dataset.functionRole =")
            && !state.includes("operators.dataset.functionMode =")
            && state.includes("operators.dataset.routeFunctionRole")
            && state.includes("operators.dataset.routeFunctionMode")
            && panels.includes("buildFormalReroutedFunctionTenseGroups")
            && !composer.includes("setActiveTenseMode(TENSE_MODE.adjetivo")
            && !composer.includes('selector: "[data-tense-mode=\\"adjetivo\\"]"')
            && !composer.includes('selector: "[data-tense-mode=\\"adverbio\\"]"')
    );
    const nominalSourceUnitGroups = (staticGroupsJson.tenseLinguisticGroups?.sustantivo?.left || []).map((group) => ({
        heading: group.heading?.labelEs || "",
        tenses: group.tenses || [],
    }));
    s.eq(
        "nominal tense tabs are grouped by Andrews source unit microscope",
        nominalSourceUnitGroups,
        [
            {
                heading: "Predicado CNV",
                tenses: [
                    "predicado-nominal",
                    "agentivo",
                    "agentivo-presente",
                    "agentivo-preterito",
                    "agentivo-futuro",
                    "instrumentivo",
                    "locativo-temporal",
                ],
            },
            {
                heading: "Núcleo CNV",
                tenses: ["sustantivo-verbal", "patientivo"],
            },
            {
                heading: "CNN derivada de CNV",
                tenses: ["calificativo-instrumentivo", "locativo-agentivo-preterito"],
            },
        ]
    );
    s.ok(
        "Lesson 3 particle metadata reaches browser runtime without a #2 Partícula mode chip",
        html.includes("src/core/particles/particles.js")
            && !formulaPanelHtml.includes('id="calc-nawat-mode-particle"')
            && !formulaPanelHtml.includes('data-tense-mode="particula"')
            && !/>\s*Partícula\s*<\/button>/.test(formulaPanelHtml)
            && !formulaPanelHtml.includes('id="calc-nawat-mode-particle"\n                            role="tab"\n                            aria-selected="false"\n                            aria-disabled="true"')
            && !formulaPanelHtml.includes('id="calc-nawat-mode-particle"\n                            role="tab"\n                            aria-selected="false"\n                            aria-disabled="true"\n                            disabled')
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
            && rendering.includes('titleLabel.textContent = "Partículas"')
            && rendering.includes("titleLabel.title = block.title")
            && !rendering.includes("Partícula · Andrews Lesson 3")
            && exportUi.includes("function buildParticleViewExportCSV")
            && exportUi.includes('"entrada Nawat"')
            && exportUi.includes('"fuente Andrews"')
            && exportUi.includes('"clase funcional"')
            && exportUi.includes('diagnosticId === "particle-candidate-empty"')
            && state.includes('"Partículas", "inventario diagnóstico", "sin generación"')
            && state.includes('summaryEl.title = "Andrews Lección 3"')
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
        "Lesson 29 purposive boundary and Andrews generator reach browser runtime",
        html.includes("src/core/vnc/purposive/purposive.js")
            && purposive.includes("purposive-directional-boundary")
            && purposive.includes("buildAndrewsPurposiveDirectionalVnc")
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
            && calendar.includes("day, month, year, or cycle labels are not calendar-name orthography fixture data")
            && calendar.includes("changesNncGeneration: false")
            && calendar.includes("generationAllowed: false")
    );
    s.ok(
        "Lesson 56 personal-name NNC boundary reaches browser runtime without generation",
        html.includes("src/core/nnc/names/names.js")
            && nncNames.includes("personal-name-nnc-boundary")
            && nncNames.includes("capitalization labels and proper-name translations are not orthography-bridge name evidence")
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
            && state.includes("Ortografia: correspondencia candidata; requiere verificacion ortografica.")
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
            && rendering.includes("function appendLesson4DiagramNode")
            && rendering.includes("function getLesson4DiagramNodeLabel")
            && rendering.includes("function getLesson4DiagramNodeMeta")
            && rendering.includes("function createLesson4InspectorPanel")
            && rendering.includes("function collectLesson4TreeNodes")
            && rendering.includes("result.nuclearClauseShell")
            && rendering.includes("evaluation.result?.nuclearClauseShell")
            && rendering.includes("Andrews Lección 4")
            && rendering.includes("cláusula nuclear")
            && rendering.includes("clasificación")
            && rendering.includes("pronombres")
            && rendering.includes("referencia: contexto")
            && rendering.includes("jerarquía")
            && rendering.includes("lesson4?.activeFormula")
            && rendering.includes("function formatVisibleAndrewsFormula")
            && rendering.includes("function formatVisibleAndrewsSlotToken")
            && rendering.includes("sujeto + predicado")
            && rendering.includes("persona + número")
            && rendering.includes("persona1-persona2 + número1-número2")
            && rendering.includes("núcleo verbal + tiempo")
            && rendering.includes("valencia + base")
            && rendering.includes("estado + base")
            && rendering.includes("núcleo verbal = valencia + base + tiempo")
            && rendering.includes("núcleo nominal = estado + base")
            && rendering.includes("diagrama Andrews: CN, sujeto, predicado y subposiciones")
            && rendering.includes('createLesson4InspectorLine("tipo"')
            && rendering.includes('createLesson4InspectorLine("uso"')
            && rendering.includes('createLesson4InspectorLine("posición"')
            && rendering.includes('createLesson4InspectorLine("pronombre"')
            && rendering.includes('createLesson4InspectorLine("categorías"')
            && rendering.includes('createLesson4InspectorLine("género"')
            && rendering.includes('"casos"')
            && rendering.includes("afijal")
            && rendering.includes("referente único")
            && rendering.includes('person: "persona"')
            && rendering.includes('animacy: "animacidad"')
            && rendering.includes('humanness: "humanidad"')
            && rendering.includes('number: "número"')
            && rendering.includes('case: "caso"')
            && rendering.includes('categories.join(" · ")')
            && rendering.includes("nominativo: sujeto · objetivo: predicado CNV · posesivo: predicado CNN")
            && rendering.includes('createLesson4InspectorLine("contexto"')
            && rendering.includes("lesson4-inspector__line--context")
            && rendering.includes("lesson4-inspector__line--thesis")
            && rendering.includes("Estructura Andrews")
            && rendering.includes("Clasificación")
            && !rendering.includes('createLesson4InspectorLine("fórmula"')
            && rendering.includes('formula ? `${label}: ${formatVisibleAndrewsFormula(formula)}` : label')
            && css.includes(".lesson4-inspector")
            && css.includes(".lesson4-inspector__body")
            && css.includes(".lesson4-inspector__panel")
            && css.includes("grid-template-columns: repeat(2, minmax(0, 1fr));")
            && css.includes("border-top: 2px solid rgba(58, 112, 121, 0.24);")
            && css.includes(".lesson4-inspector__line--thesis .lesson4-inspector__line-value")
            && css.includes(".lesson4-inspector__line--context .lesson4-inspector__line-value")
            && css.includes(".lesson4-inspector__formula-options")
            && css.includes("padding-top: 4px;")
            && css.includes(".lesson4-inspector__diagram")
            && css.includes(".lesson4-inspector__diagram-node")
            && css.includes(".lesson4-inspector__diagram-children")
            && css.includes(".lesson4-inspector__diagram-node--predicate-position.is-vacant")
            && css.includes(".lesson4-inspector__formula-option.is-active")
    );
    s.ok(
        "ordinary NNC entrada uses only stem input while output owns nominal controls",
        composer.includes("parseComposerOrdinaryNncAnalogueInput")
            && composer.includes("formatComposerOrdinaryNncAnalogueInput")
            && composer.includes("buildComposerOrdinaryNncInputBundle")
            && composer.includes('uiState.nounClass || parsedFallback?.nounClass || ""')
            && composer.includes('const regexValue = stem')
            && composer.includes('formatComposerOrdinaryNncAnalogueInput({ stem, nounClass: "" })')
            && composer.includes('selectionRequired: ""')
            && !composer.includes('selectionRequired = !nounClass')
            && !composer.includes('"ordinary-nnc-animacy"')
            && composer.includes("function isComposerTransitivitySelected")
            && composer.includes('selectionRequired: "transitivity"')
            && composer.includes("function runVerbInputRefresh()")
            && composer.includes("const verbMeta = getVerbInputMeta();")
            && composer.includes("renderActiveConjugations({")
            && composer.includes("verb: verbMeta.displayVerb")
            && composer.includes("renderComposerOrdinaryNncDigitalControls")
            && composer.includes('document.getElementById("composer-ordinary-nnc-class-tabs")?.remove()')
            && !composer.includes('controls.id = "composer-ordinary-nnc-controls"')
            && !composer.includes('label: "Clase"')
            && !composer.includes('label: "Animacidad"')
            && !composer.includes('label: "Sujeto"')
            && !composer.includes('label: "Poseedor"')
            && !composer.includes('label: "Referencia"')
            && !composer.includes('label: "Tipo"')
            && !composer.includes("bloqueado por ficha: conector")
            && composer.includes('const currentStem = currentAnalogue?.stem || getComposerActiveStemValue()')
            && composer.includes('setComposerActiveSlotStem(normalizeComposerStem(currentStem))')
            && composer.includes("syncEntradaUrlSegmentsFromCurrentState({ replace: true })")
            && composer.includes("function syncComposerOrdinaryNncClassTabActiveState")
            && composer.includes("syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass)")
            && composer.includes("window.setTimeout(() => {")
            && composer.includes('const rawInputValue = document.getElementById("verb")?.value || ""')
            && composer.includes('uiState.nounClass || parsedFallback?.nounClass || ""')
            && rendering.includes('visibleLabel: "Conector num1-num2"')
            && rendering.includes('visibleLabel: "Animacidad"')
            && rendering.includes('setOrdinaryNncGenerationState({ nounClass: id || "zero" })')
            && rendering.includes('animacy: id')
            && !composer.includes("Animacidad fija")
            && !composer.includes('disabled: animacyIsFixed')
            && !composer.includes("bloqueado por ficha: animado")
            && !composer.includes("bloqueado por ficha: inanimado")
            && rendering.includes('title: "conector t: (...V)t"')
            && rendering.includes('title: "conector ti: (...C)ti"')
            && rendering.includes('title: "conector in: (...C)in"')
            && rendering.includes('title: "conector Ø: (...C/V)"')
            && rendering.includes("Selecciona un conector de número para saber su salida.")
            && rendering.includes("Selecciona una animacidad para saber su salida.")
            && rendering.includes("Selecciona una transitividad para saber su salida.")
            && html.includes('<option value="">Selecciona transitividad</option>')
            && css.includes(".tense-block--noun-shared-controls")
            && !entradaComposerCss.includes("#container-inputs #composer-slot-stage > .verb-composer__ordinary-nnc-controls")
    );
    if (typeof ctx.buildComposerOrdinaryNncInputBundle === "function") {
        const nominalStemBundle = ctx.buildComposerOrdinaryNncInputBundle({
            transitivity: "intransitive",
            slotAStem: "shuchi",
        }, "");
        s.eq(
            "ordinary NNC composer serializes the predicate stem inside formula parentheses",
            {
                regexValue: nominalStemBundle.regexValue,
                stem: nominalStemBundle.stem,
                selectionRequired: nominalStemBundle.selectionRequired,
            },
            {
                regexValue: "(shuchi)",
                stem: "shuchi",
                selectionRequired: "",
            }
        );
    }
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
            && rendering.includes('controls.className = "tense-block__controls tense-block__controls--stacked"')
            && rendering.includes('label.textContent = "CNN ordinaria"')
            && !rendering.includes('label.textContent = "Sustantivo ordinario"')
            && !rendering.includes('visibleLabel: "Clase"')
            && !rendering.includes('ariaLabel: "Clase del conector de numero del sujeto"')
            && rendering.includes('visibleLabel: "Conector num1-num2"')
            && rendering.includes('ariaLabel: "conector num1-num2 de la cláusula nuclear nominal"')
            && rendering.includes('visibleLabel: "Animacidad"')
            && rendering.includes('ariaLabel: "animacidad de la cláusula nuclear nominal"')
            && css.includes(".tense-block__controls--stacked")
            && !css.includes(".tense-block--ordinary-nnc-controls .tense-block__controls--stacked")
            && !css.includes(".tense-block--ordinary-nnc-controls .object-toggle--stacked.object-toggle--with-label")
            && !css.includes(".tense-block--ordinary-nnc-controls .object-toggle--stacked .object-toggle-button")
            && !css.includes('.tense-block--ordinary-nnc-controls .object-toggle[data-toggle-slot="possessor"]')
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
    s.eq(
        "generated output chips read canonical VNC records before lying formulaEcho result and frame surfaces",
        (() => {
            if (
                typeof ctx.buildGeneratedOutputSlotChips !== "function"
                || typeof ctx.getConjugationSurfaceForms !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "hostile-ui-canonical-vnc-formula",
                unit: "VNC",
                formula: "#0-0+ki-0(mak)0+0-0#",
                formulaSlots: {
                    pers1Pers2: { displayPrefix: "Ø", prefix: "", displayCase: "Ø", case: "", slot: "pers1-pers2" },
                    obj1: { displayPrefix: "ki-0", prefix: "ki-0", slot: "obj1" },
                    predicateStem: { displayStem: "(mak)", stem: "mak", slot: "STEM" },
                    tensePosition: { label: "Ø", tenseValue: "Ø", slot: "tiempo" },
                    num1Num2: { displayConnector: "0-0", connector: "", slot: "num1-num2" },
                },
                routeContract: { routeFamily: "hostile-ui-canonical-vnc" },
                sourceFrame: { label: "structured VNC source" },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                formulaRecord,
                segmentFrames: [
                    { slot: "obj1", formulaValue: "ki-0", surface: "ki" },
                    { slot: "predicateStem", formulaValue: "mak", surface: "mak" },
                ],
                surfaceForms: ["kimak"],
            });
            const resultFrame = {
                ...(ctx.buildGrammarResultFrame
                    ? ctx.buildGrammarResultFrame({ ok: true, formulaRecord, formulaRealizationRecord: realizationRecord })
                    : {}),
                surface: "frame-lie",
                surfaceForms: ["frame-lie / frame-alt-lie"],
                formulaSurfacePairs: [{ surface: "pair-lie", targetFormulaEcho: "#PAIR-LIE#" }],
                formulaRecord,
                formulaRecords: [formulaRecord],
                formulaRealizationRecord: realizationRecord,
                formulaRealizationRecords: [realizationRecord],
            };
            const hostile = {
                formulaEcho: "#ni-Ø+ta(BAD)fut+meh#",
                result: "result-lie / result-alt-lie",
                surface: "top-lie",
                surfaceForms: ["top-lie"],
                grammarFrame: ctx.buildGrammarFrame
                    ? ctx.buildGrammarFrame({ resultFrame })
                    : { resultFrame },
            };
            const chips = ctx.buildGeneratedOutputSlotChips(hostile);
            const valuesByKind = chips.reduce((map, chip) => {
                if (!map[chip.kind]) {
                    map[chip.kind] = chip.value;
                }
                return map;
            }, {});
            return {
                formula: valuesByKind.formula,
                obj1: valuesByKind.obj1,
                stem: valuesByKind.STEM,
                surface: valuesByKind.surface,
                surfaces: ctx.getConjugationSurfaceForms(hostile),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                formula: "#0-0+ki-0(mak)0+0-0#",
                obj1: "ki-0",
                stem: "(mak)",
                surface: "kimak",
                surfaces: ["kimak"],
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "legacy VNC formulaEcho parser is quarantined from active slot inference",
        typeof ctx.parseGeneratedOutputVncFormulaEchoSlots === "function"
            ? ctx.parseGeneratedOutputVncFormulaEchoSlots("#ni-0+ki(BAD)fut+met#")
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? null
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "formula surface pair lookup does not use top-level result or surface strings as active selection",
        (() => {
            if (
                typeof ctx.getFormulaSurfacePairForGeneratedOutput !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaA = ctx.buildGrammarFormulaRecord({
                id: "pair-a-formula",
                unit: "VNC",
                formula: "#0-0(a)0+0-0#",
                formulaSlots: { predicateStem: { stem: "a", slot: "STEM" } },
            });
            const formulaB = ctx.buildGrammarFormulaRecord({
                id: "pair-b-formula",
                unit: "VNC",
                formula: "#0-0(b)0+0-0#",
                formulaSlots: { predicateStem: { stem: "b", slot: "STEM" } },
            });
            const realizationA = ctx.buildGrammarFormulaRealizationRecord({
                id: "pair-a-realization",
                formulaRecord: formulaA,
                segmentFrames: [{ slot: "STEM", formulaValue: "a", surface: "canonical-a" }],
                surfaceForms: ["canonical-a"],
            });
            const realizationB = ctx.buildGrammarFormulaRealizationRecord({
                id: "pair-b-realization",
                formulaRecord: formulaB,
                segmentFrames: [{ slot: "STEM", formulaValue: "b", surface: "canonical-b" }],
                surfaceForms: ["canonical-b"],
            });
            const hostile = {
                result: "canonical-b / stale-result",
                surface: "canonical-b",
                surfaceForms: ["canonical-b"],
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        formulaRecords: [formulaA, formulaB],
                        formulaRealizationRecords: [realizationA, realizationB],
                    }),
                }),
            };
            return {
                defaultSurface: ctx.getFormulaSurfacePairForGeneratedOutput(hostile)?.surface || "",
                explicitSurface: ctx.getFormulaSurfacePairForGeneratedOutput(hostile, "canonical-b")?.surface || "",
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                defaultSurface: "canonical-a",
                explicitSurface: "canonical-b",
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "visible CNV formula helpers read canonical records before lying formulaEcho and stale surfaces",
        (() => {
            if (
                typeof ctx.formatVisibleCnvFormulaEcho !== "function"
                || typeof ctx.buildVisibleCnvFormulaEchoChips !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "visible-cnv-formula-record",
                unit: "VNC",
                formula: "#0-0+ki-0(mak)0+0-0#",
                formulaSlots: {
                    obj1: { displayPrefix: "ki-0", prefix: "ki-0", slot: "obj1" },
                    predicateStem: { displayStem: "(mak)", stem: "mak", slot: "STEM" },
                },
                routeContract: { routeFamily: "hostile-visible-cnv" },
                sourceFrame: { label: "structured visible CNV source" },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "visible-cnv-realization-record",
                formulaRecord,
                segmentFrames: [
                    { slot: "obj1", formulaValue: "ki-0", surface: "ki" },
                    { slot: "predicateStem", formulaValue: "mak", surface: "mak" },
                ],
                surfaceForms: ["kimak"],
            });
            const resultFrame = {
                ...ctx.buildGrammarResultFrame({
                    ok: true,
                    formulaRecord,
                    formulaRealizationRecord: realizationRecord,
                }),
                surface: "frame-visible-lie",
                surfaceForms: ["frame-visible-lie / frame-visible-alt-lie"],
                formulaRecord,
                formulaRecords: [formulaRecord],
                formulaRealizationRecord: realizationRecord,
                formulaRealizationRecords: [realizationRecord],
            };
            const hostile = {
                formulaEcho: "#ni-0+ta(BAD)fut+meh#",
                result: "result-visible-lie / result-visible-alt-lie",
                surface: "top-visible-lie",
                surfaceForms: ["top-visible-lie"],
                grammarFrame: ctx.buildGrammarFrame({ resultFrame }),
            };
            const chips = ctx.buildVisibleCnvFormulaEchoChips(hostile.formulaEcho, hostile);
            return {
                formatted: ctx.formatVisibleCnvFormulaEcho(hostile.formulaEcho, hostile),
                chipValues: chips.map((entry) => entry.value),
                chipSurfaces: chips.map((entry) => entry.surface),
                hasBadFormula: chips.some((entry) => String(entry.value || "").includes("BAD")),
                hasStaleSurface: chips.some((entry) => /lie/.test(String(entry.surface || ""))),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                formatted: "#0-0+ki-0(mak)0+0-0#",
                chipValues: ["#0-0+ki-0(mak)0+0-0#"],
                chipSurfaces: ["kimak"],
                hasBadFormula: false,
                hasStaleSurface: false,
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "generated output chips read canonical NNC records before lying formulaEcho result and frame surfaces",
        (() => {
            if (
                typeof ctx.buildGeneratedOutputSlotChips !== "function"
                || typeof ctx.getConjugationSurfaceForms !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                unit: "NNC",
                formula: "#Ø-Ø(kal)Ø-Ø#",
                formulaSlots: {
                    pers1Pers2: { displayPrefix: "Ø", prefix: "", displaySuffix: "Ø", suffix: "", slot: "pers1-pers2" },
                    predicateStem: { displayStem: "(kal)", stem: "kal", surface: "kal", state: "absolutive", slot: "STEM" },
                    num1Num2: { displayConnector: "Ø-Ø", connector: "", surface: "", slot: "num1-num2" },
                },
                routeContract: { routeFamily: "hostile-ui-canonical-nnc" },
                sourceFrame: { label: "structured NNC source" },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "kal", surface: "kal" },
                ],
                surfaceForms: ["kal"],
            });
            const resultFrame = {
                ...(ctx.buildGrammarResultFrame
                    ? ctx.buildGrammarResultFrame({ ok: true, formulaRecord, formulaRealizationRecord: realizationRecord })
                    : {}),
                surface: "frame-nnc-lie",
                surfaceForms: ["frame-nnc-lie / frame-nnc-alt-lie"],
                formulaSurfacePairs: [{ surface: "pair-nnc-lie", targetFormulaEcho: "#PAIR-NNC-LIE#" }],
                formulaRecord,
                formulaRecords: [formulaRecord],
                formulaRealizationRecord: realizationRecord,
                formulaRealizationRecords: [realizationRecord],
            };
            const hostile = {
                formulaEcho: "#ni-Ø+ta(BAD)fut+meh#",
                result: "result-nnc-lie / result-nnc-alt-lie",
                surface: "top-nnc-lie",
                surfaceForms: ["top-nnc-lie"],
                grammarFrame: ctx.buildGrammarFrame
                    ? ctx.buildGrammarFrame({ resultFrame })
                    : { resultFrame },
            };
            const chips = ctx.buildGeneratedOutputSlotChips(hostile);
            const valuesByKind = chips.reduce((map, chip) => {
                if (!map[chip.kind]) {
                    map[chip.kind] = chip.value;
                }
                return map;
            }, {});
            return {
                formula: valuesByKind.formula,
                stem: valuesByKind.STEM,
                surface: valuesByKind.surface,
                surfaces: ctx.getConjugationSurfaceForms(hostile),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                formula: "#Ø-Ø(kal)Ø-Ø#",
                stem: "(kal)",
                surface: "kal",
                surfaces: ["kal"],
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "generated output continuation formula readers use canonical or structured slots before lying formulaEcho",
        (() => {
            if (
                typeof ctx.getGeneratedOutputStructuredContinuationFormulaSlots !== "function"
                || typeof ctx.getGeneratedOutputStructuredContinuationFormulaEcho !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const canonicalFormulaRecord = ctx.buildGrammarFormulaRecord({
                id: "hostile-continuation-formula-reader-record",
                unit: "NNC",
                formula: "#Ø-Ø(kal)Ø-Ø#",
                formulaSlots: {
                    pers1Pers2: { displayPrefix: "Ø", prefix: "", displaySuffix: "Ø", suffix: "", slot: "pers1-pers2" },
                    predicateStem: { displayStem: "(kal)", stem: "kal", surface: "kal", slot: "STEM" },
                    num1Num2: { displayConnector: "Ø-Ø", connector: "", surface: "", slot: "num1-num2" },
                },
                routeContract: { routeFamily: "hostile-continuation-formula-reader" },
                sourceFrame: { label: "structured continuation formula source" },
            });
            const canonicalRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                formulaRecord: canonicalFormulaRecord,
                segmentFrames: [{ slot: "predicateStem", formulaValue: "kal", surface: "kal" }],
                surfaceForms: ["kal"],
            });
            const canonicalResult = {
                formulaEcho: "#BAD-FORMULA-ECHO#",
                nuclearClauseShell: {
                    formulaEcho: "#BAD-SHELL-ECHO#",
                    formulaSlots: {
                        predicateStem: { displayStem: "(bad)", stem: "bad", surface: "bad", slot: "STEM" },
                    },
                },
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: {
                        ...ctx.buildGrammarResultFrame({
                            ok: true,
                            formulaRecord: canonicalFormulaRecord,
                            formulaRealizationRecord: canonicalRealizationRecord,
                        }),
                        formulaRecord: canonicalFormulaRecord,
                        formulaRecords: [canonicalFormulaRecord],
                        formulaRealizationRecord: canonicalRealizationRecord,
                        formulaRealizationRecords: [canonicalRealizationRecord],
                    },
                }),
            };
            const structuredOnlyResult = {
                formulaEcho: "#BAD-STRUCTURED-FALLBACK#",
                result: "bad-result-a / bad-result-b",
                nuclearClauseShell: {
                    formulaEcho: "#BAD-STRUCTURED-SHELL#",
                    formulaSlots: {
                        pers1Pers2: { displayPrefix: "Ø", prefix: "", displaySuffix: "Ø", suffix: "", slot: "pers1-pers2" },
                        predicateStem: { displayStem: "(pet)", stem: "pet", surface: "pet", slot: "STEM" },
                        num1Num2: { displayConnector: "Ø-Ø", connector: "", surface: "", slot: "num1-num2" },
                    },
                },
            };
            const stringOnlyResult = {
                formulaEcho: "#STRING-ONLY-LIE#",
                result: "string-only-lie / string-only-alt",
                surface: "string-only-surface",
            };
            const canonicalSlots = ctx.getGeneratedOutputStructuredContinuationFormulaSlots(canonicalResult);
            const structuredSlots = ctx.getGeneratedOutputStructuredContinuationFormulaSlots(structuredOnlyResult);
            const stringOnlySlots = ctx.getGeneratedOutputStructuredContinuationFormulaSlots(stringOnlyResult);
            return {
                canonicalStem: canonicalSlots?.predicateStem?.stem || "",
                canonicalEcho: ctx.getGeneratedOutputStructuredContinuationFormulaEcho(canonicalResult, canonicalSlots),
                structuredStem: structuredSlots?.predicateStem?.stem || "",
                structuredEcho: ctx.getGeneratedOutputStructuredContinuationFormulaEcho(structuredOnlyResult, structuredSlots),
                stringOnlySlots: stringOnlySlots === null,
                stringOnlyEcho: ctx.getGeneratedOutputStructuredContinuationFormulaEcho(stringOnlyResult, stringOnlySlots),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                canonicalStem: "kal",
                canonicalEcho: "#Ø-Ø(kal)Ø-Ø#",
                structuredStem: "pet",
                structuredEcho: "#Ø-Ø(pet)Ø#",
                stringOnlySlots: true,
                stringOnlyEcho: "",
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "generated output continuation identity uses canonical record ids instead of rendered surfaces",
        (() => {
            if (
                typeof ctx.getGeneratedOutputContinuationIdentityKey !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const buildHostileResult = (id) => {
                const formulaRecord = ctx.buildGrammarFormulaRecord({
                    id: `formula-record-${id}`,
                    unit: "NNC",
                    formula: `#0-0(stem-${id})0-0#`,
                    formulaSlots: {
                        predicateStem: { stem: `stem-${id}`, slot: "STEM" },
                    },
                    routeContract: {
                        routeId: `route-${id}`,
                        routeFamily: "hostile-continuation-identity",
                    },
                    sourceFrame: {
                        id: `source-frame-${id}`,
                    },
                });
                const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                    id: `realization-record-${id}`,
                    formulaRecord,
                    segmentFrames: [
                        { slot: "predicateStem", formulaValue: `stem-${id}`, surface: "same" },
                    ],
                    surfaceForms: ["same"],
                });
                return {
                    result: "same / display-lie",
                    surface: "same",
                    surfaceForms: ["same"],
                    grammarFrame: ctx.buildGrammarFrame({
                        routeContract: {
                            routeId: `route-${id}`,
                            routeFamily: "hostile-continuation-identity",
                            routeStage: "target-mode-preview",
                        },
                        resultFrame: {
                            ...ctx.buildGrammarResultFrame({
                                ok: true,
                                formulaRecord,
                                formulaRealizationRecord: realizationRecord,
                            }),
                            surface: "frame-surface-lie",
                            surfaceForms: ["same / frame-display-lie"],
                            formulaRecord,
                            formulaRecords: [formulaRecord],
                            formulaRealizationRecord: realizationRecord,
                            formulaRealizationRecords: [realizationRecord],
                        },
                    }),
                };
            };
            const context = {
                namespace: "verb-to-nominal-row-continuation",
                targetTense: "agentivo",
                sourceUnit: "vnc-predicate",
            };
            const firstKey = ctx.getGeneratedOutputContinuationIdentityKey(buildHostileResult("a"), context);
            const secondKey = ctx.getGeneratedOutputContinuationIdentityKey(buildHostileResult("b"), context);
            const routeOnlyKey = ctx.getGeneratedOutputContinuationIdentityKey({
                result: "same / route-display-lie",
                surface: "same",
                surfaceForms: ["same"],
                grammarFrame: ctx.buildGrammarFrame({
                    routeContract: {
                        routeId: "route-only-a",
                        routeFamily: "hostile-continuation-identity",
                        routeStage: "target-mode-preview",
                        sourceContract: {
                            sourceCategory: "vnc-source",
                            sourceClauseKind: "VNC",
                            sourceVerb: "structured-source-verb",
                            sourceTenseValue: "preterito",
                            sourceCombinedMode: "activo",
                        },
                        targetContract: {
                            outputKind: "NNC",
                            functionKind: "adjectival",
                            generationRoute: "route-contract-only",
                        },
                    },
                }),
            }, {
                ...context,
                sourceVariantId: "route-only-variant",
            });
            const sourceFormulaRecord = ctx.buildGrammarFormulaRecord({
                id: "source-formula-record",
                unit: "NNC",
                formula: "#0-0(source-stem)0-0#",
                formulaSlots: {
                    predicateStem: { stem: "source-stem", slot: "STEM" },
                },
            });
            const sourceRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "source-realization-record",
                formulaRecord: sourceFormulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "source-stem", surface: "same" },
                ],
                surfaceForms: ["same"],
            });
            const sourceAndTargetKey = ctx.getGeneratedOutputContinuationIdentityKey([
                {
                    result: "source-display-lie",
                    surface: "same",
                    grammarFrame: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            formulaRecord: sourceFormulaRecord,
                            formulaRealizationRecord: sourceRealizationRecord,
                        }),
                    }),
                },
                {
                    result: "target-display-lie",
                    surface: "same",
                    grammarFrame: ctx.buildGrammarFrame({
                        routeContract: {
                            routeId: "target-route-contract",
                            routeFamily: "adjectival-nnc",
                            routeStage: "execute",
                        },
                    }),
                },
            ], {
                namespace: "source-plus-target-continuation",
                targetVariantId: "target-variant",
            });
            const displayOnlyKey = ctx.getGeneratedOutputContinuationIdentityKey({
                result: "same / display-only",
                surface: "same",
                surfaceForms: ["same"],
            }, context);
            return {
                distinctSameSurfaceKeys: firstKey !== secondKey,
                keyHasFormulaRecord: firstKey.includes("formula-record-a"),
                keyHasRealizationRecord: firstKey.includes("realization-record-a"),
                keyHasRoute: firstKey.includes("route-a"),
                keyHasSurfaceText: firstKey.includes("same") || firstKey.includes("display-lie") || firstKey.includes("frame-surface-lie"),
                routeOnlyHasRouteContract: routeOnlyKey.includes("route-id:route-only-a")
                    && routeOnlyKey.includes("source-category:vnc-source")
                    && routeOnlyKey.includes("target-route:route-contract-only")
                    && routeOnlyKey.includes("source-variant:route-only-variant"),
                routeOnlyHasSurfaceText: routeOnlyKey.includes("same")
                    || routeOnlyKey.includes("route-display-lie")
                    || routeOnlyKey.includes("display-only"),
                sourceAndTargetHasSourceRecord: sourceAndTargetKey.includes("source-formula-record")
                    && sourceAndTargetKey.includes("source-realization-record"),
                sourceAndTargetHasTargetRoute: sourceAndTargetKey.includes("route-id:target-route-contract")
                    && sourceAndTargetKey.includes("target-variant:target-variant"),
                sourceAndTargetHasSurfaceText: sourceAndTargetKey.includes("same")
                    || sourceAndTargetKey.includes("source-display-lie")
                    || sourceAndTargetKey.includes("target-display-lie"),
                displayOnlyKey,
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                distinctSameSurfaceKeys: true,
                keyHasFormulaRecord: true,
                keyHasRealizationRecord: true,
                keyHasRoute: true,
                keyHasSurfaceText: false,
                routeOnlyHasRouteContract: true,
                routeOnlyHasSurfaceText: false,
                sourceAndTargetHasSourceRecord: true,
                sourceAndTargetHasTargetRoute: true,
                sourceAndTargetHasSurfaceText: false,
                displayOnlyKey: "",
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "generated output selected variant uses canonical realization record ids instead of display surfaces",
        (() => {
            if (
                typeof ctx.getGeneratedOutputSelectedRealizationVariant !== "function"
                || typeof ctx.getGeneratedOutputContinuationIdentityKey !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "selected-variant-formula",
                unit: "NNC",
                formula: "#0-0(xochi)0-0#",
                formulaSlots: {
                    predicateStem: { slot: "STEM", stem: "xochi" },
                },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "selected-variant-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "xochi", surface: "canonical-a" },
                ],
                surfaceForms: ["canonical-a", "canonical-b"],
            });
            const hostileResult = {
                result: "display-lie-a / display-lie-b",
                surface: "display-lie-a",
                surfaceForms: ["display-lie-a"],
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: {
                        ...ctx.buildGrammarResultFrame({
                            ok: true,
                            formulaRecord,
                            formulaRealizationRecord: realizationRecord,
                        }),
                        surface: "frame-display-lie",
                        surfaceForms: ["frame-display-lie-a / frame-display-lie-b"],
                        formulaRecord,
                        formulaRecords: [formulaRecord],
                        formulaRealizationRecord: realizationRecord,
                        formulaRealizationRecords: [realizationRecord],
                    },
                }),
            };
            const selected = ctx.getGeneratedOutputSelectedRealizationVariant(hostileResult, 1);
            const identityKey = ctx.getGeneratedOutputContinuationIdentityKey(hostileResult, {
                namespace: "selected-variant-hostile-test",
                sourceVariantId: selected?.variantId || "",
            });
            return {
                surface: selected?.surface || "",
                variantId: selected?.variantId || "",
                formulaRealizationRecordId: selected?.formulaRealizationRecordId || "",
                formulaRecordId: selected?.formulaRecordId || "",
                identityHasVariant: identityKey.includes("selected-variant-realization#variant:1"),
                identityHasDisplayText: identityKey.includes("display-lie")
                    || identityKey.includes("frame-display-lie")
                    || identityKey.includes("canonical-b"),
            };
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                surface: "canonical-b",
                variantId: "selected-variant-realization#variant:1",
                formulaRealizationRecordId: "selected-variant-realization",
                formulaRecordId: "selected-variant-formula",
                identityHasVariant: true,
                identityHasDisplayText: false,
            }
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "adjectival NNC function entry handoff reads canonical realization before split display surfaces",
        (() => {
            if (
                typeof ctx.getAdjectivalNncFunctionEntrySurfaceForms !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "composer-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "adjectival-handoff-formula",
                unit: "NNC",
                formula: "#0-0(canonical)0-0#",
                formulaSlots: {
                    predicateStem: { stem: "canonical", slot: "STEM" },
                },
                sourceFrame: { id: "adjectival-handoff-source" },
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "adjectival-handoff-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "canonical", surface: "canonical" },
                ],
                surfaceForms: ["canonical-surface"],
            });
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: {
                    ...ctx.buildGrammarResultFrame({
                        ok: true,
                        formulaRecord,
                        formulaRealizationRecord,
                    }),
                    surface: "frame-lie",
                    surfaceForms: ["frame-lie / frame-alt-lie"],
                    formulaRecord,
                    formulaRecords: [formulaRecord],
                    formulaRealizationRecord,
                    formulaRealizationRecords: [formulaRealizationRecord],
                },
            });
            return ctx.getAdjectivalNncFunctionEntrySurfaceForms({
                surface: "top-lie / top-alt-lie",
                grammarFrame,
            });
        })(),
        ["canonical-surface"]
    );
    s.eq(
        "adjectival NNC function entry handoff treats result-frame surface forms as structured entries",
        (() => {
            if (
                typeof ctx.getAdjectivalNncFunctionEntrySurfaceForms !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
            ) {
                return { runtime: "composer-runtime-not-loaded" };
            }
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: {
                    ok: true,
                    surface: "frame-surface-lie-a / frame-surface-lie-b",
                    surfaceForms: [
                        "frame-list-lie-a / frame-list-lie-b",
                        "frame-structured",
                    ],
                },
            });
            return ctx.getAdjectivalNncFunctionEntrySurfaceForms({
                surface: "top-lie-a / top-lie-b",
                grammarFrame,
            });
        })(),
        ["frame-structured"]
    );
    s.eq(
        "adjectival NNC function entry handoff blocks slash-only result frames instead of falling back to display surface",
        (() => {
            if (
                typeof ctx.getAdjectivalNncFunctionEntrySurfaceForms !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
            ) {
                return { runtime: "composer-runtime-not-loaded" };
            }
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: {
                    ok: true,
                    surface: "frame-surface-lie-a / frame-surface-lie-b",
                    surfaceForms: ["frame-list-lie-a / frame-list-lie-b"],
                },
            });
            return ctx.getAdjectivalNncFunctionEntrySurfaceForms({
                surface: "top-lie-a / top-lie-b",
                grammarFrame,
            });
        })(),
        []
    );
    s.eq(
        "ordinary NNC adjectival entry mutation uses canonical records over lying display strings",
        (() => {
            if (
                typeof ctx.applyAdjectivalNncFunctionToVerbEntry !== "function"
                || typeof ctx.clearAdjectivalNncFunctionEntryState !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "composer-runtime-not-loaded" };
            }
            const verbEl = ctx.document.getElementById("verb");
            const restoreMode = typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : "";
            const restoreFunctionMode = typeof ctx.getActiveFunctionMode === "function" ? ctx.getActiveFunctionMode() : "";
            ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            verbEl.value = "before";
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "ordinary-adjectival-formula-record",
                unit: "NNC",
                formula: "#Ø-Ø(shuchi)t#",
                formulaSlots: {
                    predicateStem: { stem: "shuchi", slot: "STEM" },
                },
                routeContract: { routeFamily: "adjectival-nnc" },
                sourceFrame: { id: "ordinary-adjectival-source-frame" },
                operationFrames: [{ operationId: "andrews-40-adjectival-nnc-function" }],
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "ordinary-adjectival-realization-record",
                formulaRecord,
                segmentFrames: [
                    { slot: "STEM", formulaValue: "shuchi", surface: "shuchi" },
                    { slot: "num1-num2", formulaValue: "t", surface: "t" },
                ],
                surfaceForms: ["canonical-shuchit"],
            });
            const grammarFrame = ctx.buildGrammarFrame({
                routeContract: { routeFamily: "adjectival-nnc", routeStage: "execute", generationAllowed: true },
                resultFrame: {
                    ...ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-lie",
                        surfaceForms: ["frame-lie"],
                        formulaRecord,
                        formulaRealizationRecord,
                    }),
                    surface: "frame-lie",
                    surfaceForms: ["frame-lie"],
                    formulaRecord,
                    formulaRecords: [formulaRecord],
                    formulaRealizationRecord,
                    formulaRealizationRecords: [formulaRealizationRecord],
                },
            });
            const contract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: "top-lie / top-alt-lie",
                formation: "ordinary-absolutive",
                formulaEcho: "#LIE#",
                grammarFrame,
                targetSelectedVariant: {
                    variantId: "ordinary-adjectival-realization-record#variant:0",
                    formulaRecordId: "ordinary-adjectival-formula-record",
                    formulaRealizationRecordId: "ordinary-adjectival-realization-record",
                },
                sourceContinuationFrame: {
                    kind: "generated-output-typed-continuation-frame",
                    formulaRecord,
                    formulaRealizationRecord,
                },
                targetContinuationFrame: {
                    kind: "generated-output-typed-continuation-frame",
                    formulaRecord,
                    formulaRealizationRecord,
                },
                requireCanonicalFormulaRecords: true,
                refresh: false,
            });
            const summary = {
                value: verbEl.value,
                contractSurface: contract?.surface || "",
                mutationApplied: contract?.mutationApplied === true,
                blocked: contract?.blocked === true,
                formulaRecordId: contract?.formulaRecord?.id || "",
                realizationRecordId: contract?.formulaRealizationRecord?.id || "",
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface || "",
                usedLie: [verbEl.value, contract?.surface || "", verbEl.dataset.adjectivalNncFunctionSurface || ""]
                    .some((entry) => String(entry || "").includes("lie")),
            };
            ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            verbEl.value = "";
            if (restoreFunctionMode && typeof ctx.setActiveFunctionMode === "function") {
                ctx.setActiveFunctionMode(restoreFunctionMode, { syncOutput: false });
            }
            if (restoreMode && typeof ctx.setActiveTenseMode === "function") {
                ctx.setActiveTenseMode(restoreMode, { syncConventionState: false, clearRoute: true });
            }
            if (restoreMode && typeof ctx.setActiveUnitMode === "function") {
                ctx.setActiveUnitMode(restoreMode, { syncOutput: false });
            }
            return summary;
        })(),
        {
            value: "canonical-shuchit",
            contractSurface: "canonical-shuchit",
            mutationApplied: true,
            blocked: false,
            formulaRecordId: "ordinary-adjectival-formula-record",
            realizationRecordId: "ordinary-adjectival-realization-record",
            datasetSurface: "canonical-shuchit",
            usedLie: false,
        }
    );
    s.eq(
        "ordinary NNC adjectival entry mutation blocks canonical records without typed source and target frames",
        (() => {
            if (
                typeof ctx.applyAdjectivalNncFunctionToVerbEntry !== "function"
                || typeof ctx.clearAdjectivalNncFunctionEntryState !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "composer-runtime-not-loaded" };
            }
            const verbEl = ctx.document.getElementById("verb");
            ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            verbEl.value = "unchanged";
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "ordinary-adjectival-frame-required-formula",
                unit: "NNC",
                formula: "#Ø-Ø(shuchi)t#",
                formulaSlots: {
                    predicateStem: { stem: "shuchi", slot: "STEM" },
                },
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "ordinary-adjectival-frame-required-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "STEM", formulaValue: "shuchi", surface: "shuchi" },
                    { slot: "num1-num2", formulaValue: "t", surface: "t" },
                ],
                surfaceForms: ["canonical-shuchit"],
            });
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    formulaRecord,
                    formulaRealizationRecord,
                }),
            });
            const contract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: "top-lie",
                formation: "ordinary-absolutive",
                grammarFrame,
                targetContinuationFrame: {
                    kind: "generated-output-typed-continuation-frame",
                    formulaRecord,
                    formulaRealizationRecord,
                },
                requireCanonicalFormulaRecords: true,
                refresh: false,
            });
            const summary = {
                value: verbEl.value,
                mutationApplied: contract?.mutationApplied === true,
                blocked: contract?.blocked === true,
                blockReason: contract?.blockReason || "",
                typedFramesAvailable: contract?.typedContinuationFramesAvailable === true,
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface || "",
            };
            ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            verbEl.value = "";
            return summary;
        })(),
        {
            value: "unchanged",
            mutationApplied: false,
            blocked: true,
            blockReason: "missing-typed-source-or-target-continuation-frame",
            typedFramesAvailable: false,
            datasetSurface: "",
        }
    );
    s.eq(
        "ordinary NNC adjectival entry mutation blocks required structured continuations without canonical records",
        (() => {
            if (
                typeof ctx.applyAdjectivalNncFunctionToVerbEntry !== "function"
                || typeof ctx.clearAdjectivalNncFunctionEntryState !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "composer-runtime-not-loaded" };
            }
            const verbEl = ctx.document.getElementById("verb");
            ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            verbEl.value = "unchanged";
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "frame-structured",
                    surfaceForms: ["frame-structured"],
                }),
            });
            const contract = ctx.applyAdjectivalNncFunctionToVerbEntry({
                surface: "top-lie",
                formation: "ordinary-absolutive",
                grammarFrame,
                targetContinuationFrame: {
                    kind: "generated-output-typed-continuation-frame",
                },
                requireCanonicalFormulaRecords: true,
                refresh: false,
            });
            const summary = {
                value: verbEl.value,
                mutationApplied: contract?.mutationApplied === true,
                blocked: contract?.blocked === true,
                blockReason: contract?.blockReason || "",
                datasetSurface: verbEl.dataset.adjectivalNncFunctionSurface || "",
            };
            ctx.clearAdjectivalNncFunctionEntryState(verbEl);
            verbEl.value = "";
            return summary;
        })(),
        {
            value: "unchanged",
            mutationApplied: false,
            blocked: true,
            blockReason: "missing-canonical-formula-or-realization-record",
            datasetSurface: "",
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
            && rendering.includes("resolveAndrewsCnvCnnRouteRecordContinuationGroupMeta")
            && rendering.includes("auditVisibleContinuationRouteRecordGroups")
            && rendering.includes("auditVisibleContinuationRouteOutputConsistency")
            && rendering.includes("andrewsRouteRecordGroupId")
            && rendering.includes("andrewsUiExpectedRouteRecordId")
            && rendering.includes("appendContinuationAction")
            && rendering.includes("conjugation-continuation-group")
            && rendering.includes('eyebrow: "Registro"')
            && rendering.includes('title: "CNV → CNN nominalizada"')
            && rendering.includes('title: "núcleo CNV → CNN deverbal"')
            && rendering.includes('title: "CNN → CNV denominal"')
            && rendering.includes('title: "CNV → CNN → CNV"')
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
            && rendering.includes("sourceFormulaSlots: rowFormulaSlots")
            && rendering.includes("sourceFormulaEcho: rowFormulaEcho")
            && rendering.includes("sourceFormulaSlots: contract.sourceFormulaSlots || rowFormulaSlots || null")
            && rendering.includes("matriz de posesión:")
            && rendering.includes("V pretérito:")
            && composer.includes("function applyOrdinaryNounOwnerhoodRootsToVerbEntry")
            && composer.includes("resolveOrdinaryNounOwnerhoodMatrixSpec")
            && composer.includes("buildOrdinaryNounOwnerhoodVerbInput")
            && composer.includes('dataset: { ordinaryNncOwnerhoodContinuation: "true" }')
            && composer.includes("ordinary-noun-ownerhood-entry")
    );
    s.ok(
        "shared sustantivo renderer exposes verb-derived nominalization metadata",
        rendering.includes("buildVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes('profile.outputKind !== "verb-derived-nominal"')
            && rendering.includes("appendVerbDerivedNominalizationProfileSubLabels")
            && rendering.includes("getNominalizationSourceUnitLabel")
            && rendering.includes('NOMINALIZATION_SOURCE_UNITS.vncCoreStem')
            && rendering.includes('NOMINALIZATION_SOURCE_UNITS.vncPredicate')
            && rendering.includes("evaluation.result?.nominalizationProfile")
            && rendering.includes("ambito: salida estructural")
            && rendering.includes("profile.instrumentiveNote2Frame?.grammarSource")
            && rendering.includes("36.6 n.2: excepciones de estado")
            && rendering.includes("ANDREWS_RENDERING_TERMS.nominalization")
            && rendering.includes("rol nominal:")
            && rendering.includes("ANDREWS_RENDERING_TERMS.sourceVnc")
            && rendering.includes("familia patientiva:")
            && rendering.includes("ANDREWS_RENDERING_TERMS.patientiveSource")
            && rendering.includes("familias Andrews:")
            && rendering.includes("function getAndrewsCnvCnnNominalRenderingFrame")
            && rendering.includes("function applyAndrewsCnvCnnNominalRenderingDataset")
            && rendering.includes("function getAndrewsCnvCnnNominalRenderedSurface")
            && rendering.includes("function appendConjugationConversionSurfaceLines")
            && rendering.includes("operationalSuboperationFrame")
            && rendering.includes("dataset.andrewsCnvCnnNominalOperationId")
            && rendering.includes("dataset.andrewsCnvCnnNominalFormulaEcho")
            && rendering.includes("dataset.andrewsCnvCnnNominalSpellingAuthority")
            && rendering.includes("conjugation-rendering--andrews-cnv-cnn-nominal")
            && rendering.includes("const renderedSurface = getAndrewsCnvCnnNominalRenderedSurface(frameLike)")
            && rendering.includes("Andrews CNV->CNN:")
            && rendering.includes("operacion Andrews:")
            && rendering.includes("salida por Andrews:")
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
            && rendering.includes("surfaceOutput: \"salida\"")
            && rendering.includes("getConjugationSurfaceForms(result)")
            && rendering.includes("etapa #3 salida")
            && rendering.includes("procedimientos patientivos")
            && rendering.includes("renderGeneratedOutputSlotChips(personSub, evaluation.result)")
            && rendering.includes("renderGeneratedOutputSlotChips(personSub, result)")
            && css.includes(".person-sub__slot-strip")
            && css.includes(".person-sub__compact-text")
            && css.includes(".person-sub__slot-chip--formula")
            && css.includes(".person-sub__slot-chip--surface")
            && css.includes(".person-sub__slot-chip--reflexivo")
            && css.includes(".person-sub__slot-chip--patientive")
            && css.includes(".person-sub__slot-chip--lesson2")
            && css.includes(".person-sub__slot-chip[data-detail]::after")
            && !css.includes(".person-sub__slot-chip--node")
            && !css.includes(".person-sub__slot-chip[data-route-graph-action]")
            && rendering.includes("chipEl.tabIndex = 0")
            && rendering.includes("container.dataset.fullSubLabel = fullSubLabel")
            && !rendering.includes("chipEl.dataset.routeGraph")
            && !rendering.includes("applyNawatLinkedGrammarPathSourceInput(graphAction)")
            && panels.includes("Andrews 46.3.1.a route builder")
            && panels.includes("builder.dataset.andrewsRouteBuilder")
            && panels.includes("andrews-route-browser__builder-next")
            && panels.includes("sourceEvidence.textContent")
            && panels.includes("actionRow.dataset.routeBoundary")
            && panels.includes("actionRow.dataset.absolutiveAllomorph")
            && panels.includes("actionRow.dataset.absolutiveAllomorphAppliesAfter")
            && panels.includes("actionRow.dataset.previousNonZeroSegment")
            && panels.includes("getActionAbsolutiveAllomorphLabel")
            && css.includes(".andrews-route-browser__builder--dedicated")
            && css.includes(".andrews-route-browser__builder-control")
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
            && rendering.includes("typeof buildPatientivoAdjectivalNncOperationFrame !== \"function\"")
            && rendering.includes("const operationFrame = buildPatientivoAdjectivalNncOperationFrame({")
            && rendering.includes("sourceContinuationFrame,")
            && rendering.includes("targetContinuationFrame,")
            && rendering.includes("requireStructuredContinuation: true")
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
            && rendering.includes("sourceContinuationFrame: contract.sourceContinuationFrame || null")
            && rendering.includes("operationFrame: contract.operationFrame || null")
            && rendering.includes("requireCanonicalFormulaRecords: true")
            && rendering.includes("renderPatientivoAdjectivalFunctionContinuation({")
            && !rendering.includes("dataset.targetSurface = contract.result || \"\"")
            && !rendering.includes("button.dataset.targetSurface === contract.result")
    );
    s.ok(
        "Andrews 40.3 VNC adjectival function is exposed dynamically in generated VNC rows",
        rendering.includes("const appendVncAdjectivalFunctionRowContinuation = ({")
            && rendering.includes("buildVncAdjectivalNncFunctionOutput")
            && rendering.includes("typeof buildVncAdjectivalNncOperationFrame !== \"function\"")
            && rendering.includes("const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(evaluation?.result, sourceSelectedVariant, {")
            && rendering.includes("const operationFrame = buildVncAdjectivalNncOperationFrame({")
            && rendering.includes("targetContinuationFrame,")
            && rendering.includes("requireStructuredContinuation: true")
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
            && rendering.includes("sourceContinuationFrame: contract.sourceContinuationFrame || null")
            && rendering.includes("operationFrame: contract.operationFrame || null")
            && rendering.includes("requireCanonicalFormulaRecords: true")
            && rendering.includes("appendVncAdjectivalFunctionRowContinuation({")
            && rendering.includes("afterRowRendered: ({ value, evaluation, prefix }) => {")
            && css.includes(".calc-guidance__chip--vnc-adjectival-function")
    );
    s.ok(
        "Andrews 40.1/40.3 ordinary NNC adjectival function is exposed dynamically in generated ordinary NNC rows",
        rendering.includes("const renderOrdinaryNncAdjectivalFunctionContinuation = () => {")
            && rendering.includes("buildStructuredOrdinaryAdjectivalNncFunctionOutput({")
            && rendering.includes('continueButton.dataset.ordinaryNncAdjectivalFunctionContinuation = "true"')
            && rendering.includes('calc-guidance__chip--ordinary-nnc-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Adjetival nominal"')
            && rendering.includes("`#3 salida nominal: ${targetSurface}`,")
            && rendering.includes("Andrews 40.1/40.3: cláusula nominal absolutiva en función adjetival")
            && rendering.includes("no crea modificación lecciones 42-43")
            && rendering.includes('formation: "ordinary-absolutive"')
            && rendering.includes("grammarFrame: contract.grammarFrame || contract.frames || null")
            && rendering.includes("renderOrdinaryNncAdjectivalFunctionContinuation();")
            && (() => {
                const start = rendering.indexOf("const renderOrdinaryNncAdjectivalFunctionContinuation = () => {");
                const end = rendering.indexOf("const renderOrdinaryNncOwnerhoodContinuations = () => {", start);
                const ordinarySlice = start >= 0 && end > start ? rendering.slice(start, end) : "";
                return ordinarySlice.includes("sourceContinuationFrame,")
                    && ordinarySlice.includes("targetContinuationFrame,")
                    && ordinarySlice.includes("requireCanonicalFormulaRecords: true")
                    && !ordinarySlice.includes("surface: targetSurface")
                    && !ordinarySlice.includes("formulaEcho: contract.formulaEcho")
                    && !ordinarySlice.includes("continueButton.dataset.nounStem")
                    && !ordinarySlice.includes("continueButton.dataset.nounClass");
            })()
            && css.includes(".calc-guidance__chip--ordinary-nnc-adjectival-function")
    );
    s.ok(
        "ordinary NNC adjectival structured executor blocks instead of falling through to the string builder",
        generationEngine.includes('typeof buildStructuredOrdinaryAdjectivalNncFunctionOutput !== "function"')
            && generationEngine.includes('|| !adjectivalSourceFormulaSlots?.predicateStem')
            && generationEngine.includes("&& adjectivalNnc.requiresStructuredContinuation !== true")
            && generationEngine.includes("&& typeof generateAdjectivalNncFunctionOutput === \"function\"")
    );
    s.ok(
        "ordinary and VNC adjectival continuation dedupe uses source plus contract identity",
        (() => {
            const ordinaryStart = rendering.indexOf("const renderOrdinaryNncAdjectivalFunctionContinuation = () => {");
            const ordinaryEnd = rendering.indexOf("const renderOrdinaryNncOwnerhoodContinuations = () => {");
            const ordinarySlice = ordinaryStart >= 0 && ordinaryEnd > ordinaryStart
                ? rendering.slice(ordinaryStart, ordinaryEnd)
                : "";
            const vncStart = rendering.indexOf("const appendVncAdjectivalFunctionRowContinuation = ({");
            const vncEnd = rendering.indexOf("const updateSectionCategory = (prefix) => {", vncStart);
            const vncSlice = vncStart >= 0 && vncEnd > vncStart
                ? rendering.slice(vncStart, vncEnd)
                : "";
            return ordinarySlice.includes("getGeneratedOutputContinuationIdentityKey([result, contract], {")
                && ordinarySlice.includes('namespace: "ordinary-nnc-adjectival-function-continuation"')
                && ordinarySlice.includes('sourceUnit: "ordinary-nnc"')
                && ordinarySlice.includes("button.dataset.continuationIdentityKey === continuationIdentityKey")
                && ordinarySlice.includes("applyGeneratedOutputContinuationIdentityDataset(continueButton, [result, contract], {")
                && !ordinarySlice.includes("button.dataset.targetSurface === targetSurface")
                && vncSlice.includes("getGeneratedOutputContinuationIdentityKey([evaluation?.result, contract], {")
                && vncSlice.includes('namespace: "vnc-adjectival-function-continuation"')
                && vncSlice.includes('sourceUnit: "vnc-predicate"')
                && vncSlice.includes("button.dataset.continuationIdentityKey === continuationIdentityKey")
                && vncSlice.includes("applyGeneratedOutputContinuationIdentityDataset(continueButton, [evaluation?.result, contract], {")
                && !vncSlice.includes("button.dataset.targetSurface === targetSurface");
        })()
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
        "denominal Andrews route continuation dedupe uses route identity instead of DOM target strings",
        (() => {
            const baseStart = rendering.indexOf("function renderDenominalAndrewsContractRouteContinuationForValue({");
            const baseEnd = rendering.indexOf("function getVerbToNominalContinuationSpecsForTense", baseStart);
            const baseSlice = baseStart >= 0 && baseEnd > baseStart ? rendering.slice(baseStart, baseEnd) : "";
            const linkedStart = rendering.indexOf("const renderDenominalAndrewsContractRouteContinuation = ({");
            const linkedEnd = rendering.indexOf("const renderActiveActionCompoundEmbedContinuation = ({", linkedStart);
            const linkedSlice = linkedStart >= 0 && linkedEnd > linkedStart ? rendering.slice(linkedStart, linkedEnd) : "";
            const huaStart = rendering.indexOf("const renderCalificativoInstrumentivoHuaContinuations = ({");
            const huaEnd = rendering.indexOf("const renderPatientivoPrelocativeContinuation = ({", huaStart);
            const huaSlice = huaStart >= 0 && huaEnd > huaStart ? rendering.slice(huaStart, huaEnd) : "";
            return rendering.includes("function getDenominalAndrewsRouteContinuationIdentityKey(route = null, context = {})")
                && baseSlice.includes('namespace: "denominal-andrews-route-continuation"')
                && linkedSlice.includes('namespace: "denominal-andrews-linked-route-continuation"')
                && huaSlice.includes('namespace: "denominal-andrews-hua-deverbal-yu-continuation"')
                && [baseSlice, linkedSlice, huaSlice].every((slice) => (
                    slice.includes(".some((button) => button.dataset.continuationIdentityKey === continuationIdentityKey)")
                    && slice.includes('continueButton.dataset.continuationIdentitySource = "route-contract"')
                    && !slice.includes("button.dataset.contractId === String(route.contractId || \"\")")
                    && !slice.includes("button.dataset.targetInput === targetInput")
                ));
        })()
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
            && composer.includes("const resolvedSourceFormulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === \"object\"")
            && composer.includes("sourceFormulaSlots: resolvedSourceFormulaSlots && typeof resolvedSourceFormulaSlots === \"object\" ? resolvedSourceFormulaSlots : null")
            && composer.includes("encodeValue(override.adjectivalNnc?.sourceFormulaEcho)")
            && css.includes(".calc-guidance__chip--intensified-adjectival-function")
    );
    s.ok(
        "Andrews 41.2 compound-source adjectival function is exposed from generated compound-source rows",
        rendering.includes("const renderCompoundSourceAdjectivalFunctionContinuation = ({")
            && rendering.includes("buildCompoundSourceAdjectivalNncFunctionOutput({")
            && rendering.includes("typeof buildCompoundSourceAdjectivalNncOperationFrame !== \"function\"")
            && rendering.includes("const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(sourceResult, sourceSelectedVariant, {")
            && rendering.includes("const operationFrame = buildCompoundSourceAdjectivalNncOperationFrame({")
            && rendering.includes("targetContinuationFrame,")
            && rendering.includes("requireStructuredContinuation: true")
            && rendering.includes('continueButton.dataset.compoundSourceAdjectivalFunctionContinuation = "true"')
            && rendering.includes("continueButton.dataset.sourceCompoundMatrix = sourceCompoundFrame?.matrix?.stem || \"\"")
            && rendering.includes('calc-guidance__chip--compound-source-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Adj comp"')
            && rendering.includes("Andrews 41.2: cláusula nominal adjetival desde verbo compuesto con incrustado nominal")
            && rendering.includes('formation: "compound-source-adjectival"')
            && rendering.includes("sourceCompoundFrame,")
            && rendering.includes("sourceContinuationFrame: contract.sourceContinuationFrame || null")
            && rendering.includes("operationFrame: contract.operationFrame || null")
            && rendering.includes("requireCanonicalFormulaRecords: true")
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
            && rendering.includes("typeof buildDenominalCompoundAdjectivalNncOperationFrame !== \"function\"")
            && rendering.includes("const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(sourceResult, sourceSelectedVariant, {")
            && rendering.includes("const operationFrame = buildDenominalCompoundAdjectivalNncOperationFrame({")
            && rendering.includes("targetContinuationFrame,")
            && rendering.includes("requireStructuredContinuation: true")
            && rendering.includes('continueButton.dataset.denominalCompoundAdjectivalFunctionContinuation = "true"')
            && rendering.includes("continueButton.dataset.sourceCompoundMatrix = denominalCompoundFrame?.matrix?.stem || \"\"")
            && rendering.includes('calc-guidance__chip--denominal-compound-adjectival-function')
            && rendering.includes('continueSubLabel.textContent = "Adj denom"')
            && rendering.includes("Andrews 41.3: cláusula nominal adjetival desde verbo denominal ti de sustantivo compuesto")
            && rendering.includes('formation: "denominal-compound-adjectival"')
            && rendering.includes("sourceDenominalCompoundFrame: denominalCompoundFrame")
            && rendering.includes("sourceContinuationFrame: contract.sourceContinuationFrame || null")
            && rendering.includes("operationFrame: contract.operationFrame || null")
            && rendering.includes("requireCanonicalFormulaRecords: true")
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
            && rendering.includes("typeof buildNominalizedVncAdjectivalNncOperationFrame !== \"function\"")
            && rendering.includes("const sourceContinuationFrame = buildGeneratedOutputTypedContinuationFrame(evaluation?.result, sourceSelectedVariant, {")
            && rendering.includes("const operationFrame = buildNominalizedVncAdjectivalNncOperationFrame({")
            && rendering.includes("targetContinuationFrame,")
            && rendering.includes("requireStructuredContinuation: true")
            && rendering.includes("dataset.nominalizedVncAdjectivalFunctionContinuation = \"true\"")
            && rendering.includes("dataset.nominalizedVncKind = contract.adjectivalNncFunctionFrame?.nominalizationKind || \"\"")
            && rendering.includes("continueLabel.textContent = `→ ${targetSurface}`")
            && rendering.includes("`#3 salida nominalizada: ${targetSurface}`,")
            && rendering.includes("cláusula nominal nominalizada en función adjetival")
            && rendering.includes("surface: targetSurface")
            && rendering.includes('formation: "nominalized-vnc-adjectival"')
            && rendering.includes("applyGrammarFrameRouteDataset(continueButton, contract)")
            && rendering.includes("grammarFrame: contract.grammarFrame || contract.frames || null")
            && rendering.includes("sourceContinuationFrame: contract.sourceContinuationFrame || null")
            && rendering.includes("operationFrame: contract.operationFrame || null")
            && rendering.includes("requireCanonicalFormulaRecords: true")
            && rendering.includes("renderNominalizedVncAdjectivalFunctionContinuation({")
            && rendering.includes('resolvedTense === "potencial" || resolvedTense === "potencial-habitual"')
    );
    s.ok(
        "adjectival continuation dedupe uses route/canonical identity keys instead of rendered surfaces",
        (() => {
            const start = rendering.indexOf("const renderCompoundSourceAdjectivalFunctionContinuation = ({");
            const end = rendering.indexOf("const renderPatientivoCompoundEmbedContinuation = ({");
            const migratedContinuationSlice = start >= 0 && end > start ? rendering.slice(start, end) : "";
            return rendering.includes("function getGeneratedOutputContinuationIdentityKey(result = null, context = {})")
                && rendering.includes("function getGeneratedOutputSelectedRealizationVariant(result = null, variantIndex = 0)")
                && rendering.includes("function applyGeneratedOutputContinuationIdentityDataset(element = null, result = null, context = {})")
                && migratedContinuationSlice.includes("dataset.continuationIdentityKey = continuationIdentityKey")
                && migratedContinuationSlice.includes("dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId")
                && migratedContinuationSlice.includes("dataset.targetSelectedVariantId = targetSelectedVariant.variantId")
                && migratedContinuationSlice.includes("sourceSelectedVariant,")
                && migratedContinuationSlice.includes("targetSelectedVariant,")
                && migratedContinuationSlice.includes("namespace: \"compound-source-adjectival-function-continuation\"")
                && migratedContinuationSlice.includes("namespace: \"denominal-compound-adjectival-function-continuation\"")
                && migratedContinuationSlice.includes("namespace: \"intensified-adjectival-function-continuation\"")
                && migratedContinuationSlice.includes("namespace: \"patientivo-adjectival-function-continuation\"")
                && migratedContinuationSlice.includes("namespace: \"nominalized-vnc-adjectival-function-continuation\"")
                && migratedContinuationSlice.includes(".some((button) => button.dataset.continuationIdentityKey === continuationIdentityKey)")
                && !migratedContinuationSlice.includes("button.dataset.targetSurface === targetSurface")
                && !migratedContinuationSlice.includes("button.dataset.sourceSurface === sourceSurface");
        })()
    );
    s.ok(
        "adjectival NNC continuations apply an explicit generation contract instead of only switching labels",
        composer.includes("function applyAdjectivalNncFunctionToVerbEntry")
            && composer.includes("verbEl.dataset.adjectivalNncFunctionSurface = normalizedSurface")
            && composer.includes("verbEl.dataset.adjectivalNncFunctionContract = serializedContract")
            && composer.includes("verbEl.dataset.adjectivalNncSourceSelectedVariantId = entryContract.sourceSelectedVariantId || \"\"")
            && composer.includes("verbEl.dataset.adjectivalNncTargetSelectedVariantId = entryContract.targetSelectedVariantId || \"\"")
            && composer.includes('__adjectivalNncFunctionEntryContract')
            && composer.includes("verbEl.dataset.grammarRouteFamily = entryContract.routeFamily || \"\"")
            && composer.includes("clearActiveNawatRouteProfile()")
            && composer.includes('source: "adjectival-nnc-function-entry"')
            && composer.includes("grammarFrame: frame || null")
            && composer.includes("getAdjectivalNncFunctionOverrideSurface(override)")
            && composer.includes("clearAdjectivalNncFunctionEntryState(verbInput)")
            && vncFacade.includes("getAdjectivalNncFunctionEntryObjectContract")
            && vncFacade.includes("const entryRouteContract = getAdjectivalNncFunctionEntryObjectContract(troncoControl)")
            && !vncFacade.includes("const entryRouteContract = parseAdjectivalNncFunctionEntryContract(dataset)")
            && !vncFacade.includes("normalizeAdjectivalNncFunctionSurfaceValue(dataset.adjectivalNncFunctionSurface)")
            && vncFacade.includes("adjectivalNnc.grammarFrame = entryGrammarFrame")
            && vncFacade.includes("adjectivalNnc.entryRouteContract = entryRouteContract")
            && vncFacade.includes("adjectivalNnc.sourceSelectedVariant = sourceSelectedVariant")
            && vncFacade.includes("adjectivalNnc.targetSelectedVariant = targetSelectedVariant")
            && vncFacade.includes("adjectivalNnc.selectedVariantId = adjectivalNnc.targetSelectedVariantId")
            && vncFacade.includes('if (formation === "ordinary-absolutive")')
            && vncFacade.includes("if (!requiresStructuredContinuation) {")
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
            && rendering.includes("const isFormalCnnAdjectivalTense = activeFormalTenseMode === TENSE_MODE.sustantivo")
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
    s.ok(
        "patientivo compound/nominal continuations dedupe with route identity keys",
        (() => {
            const nominalStart = rendering.indexOf("const renderPatientivoNominalCompoundContinuation = ({");
            const nominalEnd = rendering.indexOf("const getAdjectivalNncFormulaSlotsForContinuation = (result = null) => {", nominalStart);
            const nominalSlice = nominalStart >= 0 && nominalEnd > nominalStart ? rendering.slice(nominalStart, nominalEnd) : "";
            const compoundStart = rendering.indexOf("const renderPatientivoCompoundEmbedContinuation = ({");
            const compoundEnd = rendering.indexOf("const renderCalificativoInstrumentivoHuaContinuations = ({", compoundStart);
            const compoundSlice = compoundStart >= 0 && compoundEnd > compoundStart ? rendering.slice(compoundStart, compoundEnd) : "";
            return nominalSlice.includes("namespace: \"patientivo-nominal-compound-continuation\"")
                && compoundSlice.includes("namespace: \"patientivo-compound-embed-continuation\"")
                && compoundSlice.includes("namespace: \"patientivo-characteristic-property-embed-continuation\"")
                && `${nominalSlice}\n${compoundSlice}`.includes(".some((button) => button.dataset.continuationIdentityKey === continuationIdentityKey)")
                && !compoundSlice.includes("button.dataset.compoundVerb === contract.compoundVerbInput")
                && !nominalSlice.includes("button.dataset.ordinaryNncInput === contract.ordinaryNncInput");
        })()
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
            && rendering.includes("sourceContinuationFrame: sourceEntry.sourceContinuationFrame")
            && rendering.includes("targetContinuationFrame: contract.targetContinuationFrame || null")
            && rendering.includes("dataset.targetContinuationFrame = \"true\"")
            && rendering.includes("applyActiveActionCompoundEmbedRootsToVerbEntry")
            && rendering.includes("resolvedTense === \"sustantivo-verbal\"")
            && rendering.includes("continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`")
            && activeActionCompoundComposer.includes("function applyActiveActionCompoundEmbedRootsToVerbEntry")
            && activeActionCompoundComposer.includes("const typedPayload = getActiveActionCompoundEmbedPayloadFromTargetFrame(targetContinuationFrame);")
            && activeActionCompoundComposer.includes("return false;")
            && activeActionCompoundComposer.includes("VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.intransitive")
            && activeActionCompoundComposer.includes("VerbComposerState.slotAEmbed = normalizedActionNominalSurface")
            && activeActionCompoundComposer.includes("VerbComposerState.slotAStem = normalizedMatrixRoot")
            && activeActionCompoundComposer.includes("clearRoute: true")
            && activeActionCompoundComposer.includes("active-action-compound-embed-entry")
    );
    s.eq(
        "active-action compound composer requires typed source/target frames for next-step payload",
        typeof ctx.applyActiveActionCompoundEmbedRootsToVerbEntry === "function"
            && typeof ctx.buildActiveActionCompoundEmbedContinuationContract === "function"
            && typeof ctx.buildGrammarFormulaRecord === "function"
            && typeof ctx.buildGrammarFormulaRealizationRecord === "function"
            ? (() => {
                const verbEl = ctx.document.getElementById("verb");
                const originalRenderVerbMirror = ctx.renderVerbMirror;
                const originalGetActiveUiDensityMode = ctx.getActiveUiDensityMode;
                ctx.renderVerbMirror = typeof ctx.renderVerbMirror === "function"
                    ? ctx.renderVerbMirror
                    : (() => {});
                ctx.getActiveUiDensityMode = typeof ctx.getActiveUiDensityMode === "function"
                    ? ctx.getActiveUiDensityMode
                    : (() => ctx.UI_DENSITY_MODE?.full || "full");
                const formulaRecord = ctx.buildGrammarFormulaRecord({
                    id: "ui-active-action-source-formula",
                    unit: "NNC",
                    formula: "#Ø-Ø(chukilis)Ø#",
                    formulaSlots: {
                        predicateStem: { slot: "STEM", stem: "chukilis", role: "active-action-nounstem" },
                    },
                });
                const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                    id: "ui-active-action-source-realization",
                    formulaRecord,
                    surface: "chukilis",
                    surfaceForms: ["chukilis"],
                    segmentFrames: [{
                        slot: "predicateStem",
                        role: "active-action-nounstem",
                        formulaValue: "chukilis",
                        surface: "chukilis",
                        operationId: "nawat-pipil-orthography-realization",
                    }],
                    deriveSurfaceFromSegments: true,
                });
                const sourceContinuationFrame = {
                    kind: "generated-output-typed-continuation-frame",
                    role: "source",
                    unit: "NNC",
                    formulaRecord,
                    formulaRealizationRecord,
                    selectedVariant: {
                        surface: "chukilis",
                        variantId: "ui-active-action-source-realization#variant:0",
                        formulaRecordId: formulaRecord.id,
                        formulaRealizationRecordId: formulaRealizationRecord.id,
                    },
                    formulaSlots: formulaRecord.formulaSlots,
                };
                const contract = ctx.buildActiveActionCompoundEmbedContinuationContract({
                    actionNominalSurface: "chukilis",
                    sourceContinuationFrame,
                    matrixRoot: "tzajtzi",
                });
                verbEl.value = "before-active-action-frame";
                const stringOnly = ctx.applyActiveActionCompoundEmbedRootsToVerbEntry({
                    actionNominalSurface: "chukilis",
                    matrixRoot: "tzajtzi",
                });
                const afterStringOnly = verbEl.value;
                if (ctx.__TEST_RUNTIME_MODE__ === "module") {
                    const payload = {
                        contractSupported: contract.supported,
                        stringOnly,
                        afterStringOnly,
                        applied: "module-dom-fixture-skipped",
                        verbValue: afterStringOnly,
                        targetFrameKind: contract.targetContinuationFrame?.kind || "",
                    };
                    if (typeof originalRenderVerbMirror === "function") {
                        ctx.renderVerbMirror = originalRenderVerbMirror;
                    } else {
                        delete ctx.renderVerbMirror;
                    }
                    if (typeof originalGetActiveUiDensityMode === "function") {
                        ctx.getActiveUiDensityMode = originalGetActiveUiDensityMode;
                    } else {
                        delete ctx.getActiveUiDensityMode;
                    }
                    return payload;
                }
                const applied = ctx.applyActiveActionCompoundEmbedRootsToVerbEntry({
                    actionNominalSurface: "chukilis",
                    matrixRoot: "tzajtzi",
                    sourceFormulaSlots: formulaRecord.formulaSlots,
                    sourceContinuationFrame,
                    targetContinuationFrame: contract.targetContinuationFrame,
                    sourceRouteFrame: contract.sourceRouteFrame || contract.routeFrame || null,
                    routeFrame: contract.routeFrame || null,
                    incorporationRouteFrame: contract.incorporationRouteFrame || null,
                    objectSlotOwnership: contract.routeFrame?.objectSlotOwnership || null,
                });
                const payload = {
                    contractSupported: contract.supported,
                    stringOnly,
                    afterStringOnly,
                    applied,
                    verbValue: verbEl.value,
                    targetFrameKind: contract.targetContinuationFrame?.kind || "",
                };
                if (typeof originalRenderVerbMirror === "function") {
                    ctx.renderVerbMirror = originalRenderVerbMirror;
                } else {
                    delete ctx.renderVerbMirror;
                }
                if (typeof originalGetActiveUiDensityMode === "function") {
                    ctx.getActiveUiDensityMode = originalGetActiveUiDensityMode;
                } else {
                    delete ctx.getActiveUiDensityMode;
                }
                return payload;
            })()
            : { contractSupported: false, stringOnly: true, afterStringOnly: "", applied: false, verbValue: "", targetFrameKind: "" },
        {
            contractSupported: true,
            stringOnly: false,
            afterStringOnly: "before-active-action-frame",
            applied: ctx.__TEST_RUNTIME_MODE__ === "module" ? "module-dom-fixture-skipped" : true,
            verbValue: ctx.__TEST_RUNTIME_MODE__ === "module" ? "before-active-action-frame" : "(chukilis/tzajtzi)",
            targetFrameKind: "andrews-typed-operation-continuation-frame",
        }
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
    s.ok(
        "active-action and customary-agentive continuation dedupe uses route/canonical identity keys",
        (() => {
            const start = rendering.indexOf("const getFunctionUseContinuationIdentityKey = (evaluation = {}, contract = null, context = {})");
            const end = rendering.indexOf("const renderPreteritAgentiveCompoundEmbedContinuation = ({", start);
            const migratedSlice = start >= 0 && end > start ? rendering.slice(start, end) : "";
            return migratedSlice.includes("const getFunctionUseContinuationIdentityKey = (evaluation = {}, contract = null, context = {})")
                && migratedSlice.includes("namespace: \"active-action-compound-embed-continuation\"")
                && migratedSlice.includes("namespace: \"active-action-nominal-compound-continuation\"")
                && migratedSlice.includes("namespace: \"customary-agentive-nominal-compound-continuation\"")
                && migratedSlice.includes("namespace: \"customary-agentive-compound-embed-continuation\"")
                && migratedSlice.includes(".some((button) => button.dataset.continuationIdentityKey === continuationIdentityKey)")
                && !migratedSlice.includes("button.dataset.compoundVerb === contract.compoundVerbInput")
                && !migratedSlice.includes("button.dataset.ordinaryNncInput === contract.ordinaryNncInput");
        })()
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
        "agentive continuation stem readers use structured predicate slots before result-frame surfaces",
        customaryAgentiveStemReader.includes("const predicateStem = getGeneratedOutputStructuredContinuationPredicateStem(result);")
            && customaryAgentiveStemReader.includes("const hasResultFrame = hasConjugationResultFrame(result);")
            && customaryAgentiveStemReader.includes("if (hasResultFrame) {\n            addStem(predicateStem);\n            return stems;\n        }")
            && customaryAgentiveStemReader.includes("surfaceForms.forEach((surfaceForm)")
            && customaryAgentiveStemReader.indexOf("if (hasResultFrame)") < customaryAgentiveStemReader.indexOf("surfaceForms.forEach((surfaceForm)")
            && !customaryAgentiveStemReader.includes("if (hasResultFrame && !surfaceForms.length)")
            && preteritAgentiveStemReader.includes("const predicateStem = getGeneratedOutputStructuredContinuationPredicateStem(result);")
            && preteritAgentiveStemReader.includes("const hasResultFrame = hasConjugationResultFrame(result);")
            && preteritAgentiveStemReader.includes("if (hasResultFrame) {\n            if (predicateStem) {")
            && preteritAgentiveStemReader.includes(": `${predicateStem}ka`")
            && preteritAgentiveStemReader.includes("surfaceForms.forEach((surfaceForm)")
            && preteritAgentiveStemReader.indexOf("if (hasResultFrame)") < preteritAgentiveStemReader.indexOf("surfaceForms.forEach((surfaceForm)")
            && !preteritAgentiveStemReader.includes("if (hasResultFrame && !surfaceForms.length)")
    );
    s.eq(
        "structured continuation predicate stem reader ignores lying display surfaces and formula echoes",
        (() => {
            if (
                typeof ctx.getGeneratedOutputStructuredContinuationPredicateStem !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "agentive-stem-formula",
                unit: "NNC",
                formula: "#0-0(structured-stem)0-0#",
                formulaSlots: {
                    predicateStem: { slot: "STEM", stem: "structured-stem" },
                },
            });
            return ctx.getGeneratedOutputStructuredContinuationPredicateStem({
                formulaEcho: "#0-0(display-lie)0-0#",
                result: "display-lie-a / display-lie-b",
                surface: "surface-lie",
                surfaceForms: ["surface-list-lie"],
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: {
                        ...ctx.buildGrammarResultFrame({
                            ok: true,
                            surface: "frame-lie-a / frame-lie-b",
                            surfaceForms: ["frame-list-lie-a / frame-list-lie-b"],
                            formulaRecord,
                        }),
                        formulaRecord,
                        formulaRecords: [formulaRecord],
                    },
                }),
            });
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? "structured-stem"
            : { runtime: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "structured continuation predicate stem reader blocks string-only result frames",
        (() => {
            if (
                typeof ctx.getGeneratedOutputStructuredContinuationPredicateStem !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
            ) {
                return { runtime: "rendering-runtime-not-loaded" };
            }
            return ctx.getGeneratedOutputStructuredContinuationPredicateStem({
                formulaEcho: "#0-0(display-lie)0-0#",
                result: "display-lie-a / display-lie-b",
                surface: "surface-lie",
                surfaceForms: ["surface-list-lie"],
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-lie-a / frame-lie-b",
                        surfaceForms: ["frame-list-lie-a / frame-list-lie-b"],
                    }),
                }),
            });
        })(),
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ""
            : { runtime: "rendering-runtime-not-loaded" }
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
            && rendering.includes("getFunctionUseContinuationFormulaSlotsFromResult")
            && rendering.includes("getFunctionUseContinuationFormulaEchoFromResult")
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
            && rendering.includes("sourceFormulaSlots: contract.sourceFormulaSlots || sourceFormulaSlots || null")
            && rendering.includes("sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || \"\"")
            && rendering.includes('resolvedTense === "agentivo-preterito"')
            && rendering.includes("uso general:")
            && rendering.includes("Andrews 35.7:")
            && rendering.includes("matriz de posesión:")
            && rendering.includes("matriz de complemento:")
            && rendering.includes("matriz adverbial:")
            && composer.includes("function applyPreteritAgentiveOwnerhoodRootsToVerbEntry")
            && composer.includes("function applyPreteritAgentiveComplementRootsToVerbEntry")
            && composer.includes("function applyPreteritAgentiveAdverbialRootsToVerbEntry")
            && composer.includes("shouldBlockComposerFunctionUseValenceRouteAction({")
            && composer.includes('dataset: { preteritAgentiveComplementContinuation: "true" }')
            && composer.includes("preterit-agentive-adverbial-entry")
            && composer.includes("preterit-agentive-complement-entry")
            && composer.includes("setSelectedTenseTab(\"pasado-remoto\")")
            && composer.includes("preterit-agentive-ownerhood-entry")
    );
    s.ok(
        "preterit-agentive continuation dedupe uses route/canonical identity keys",
        (() => {
            const start = rendering.indexOf("const renderPreteritAgentiveCompoundEmbedContinuation = ({");
            const end = rendering.indexOf("const renderPatientivoNominalCompoundContinuation = ({", start);
            const migratedSlice = start >= 0 && end > start ? rendering.slice(start, end) : "";
            return migratedSlice.includes("namespace: \"preterit-agentive-compound-embed-continuation\"")
                && migratedSlice.includes("namespace: \"preterit-agentive-nominal-compound-continuation\"")
                && migratedSlice.includes("namespace: \"preterit-agentive-ownerhood-continuation\"")
                && migratedSlice.includes("namespace: \"preterit-agentive-complement-continuation\"")
                && migratedSlice.includes("namespace: \"preterit-agentive-adverbial-continuation\"")
                && migratedSlice.includes(".some((button) => button.dataset.continuationIdentityKey === continuationIdentityKey)")
                && !migratedSlice.includes("button.dataset.compoundVerb === contract.compoundVerbInput")
                && !migratedSlice.includes("button.dataset.ordinaryNncInput === contract.ordinaryNncInput")
                && !migratedSlice.includes("button.dataset.ownerhoodVerbInput === contract.ownerhoodVerbInput")
                && !migratedSlice.includes("button.dataset.complementVerbInput === contract.complementVerbInput")
                && !migratedSlice.includes("button.dataset.adverbialVerbInput === contract.adverbialVerbInput");
        })()
    );
    s.eq(
        "function-use ownerhood/complement/adverbial composer actions hard-gate unresolved valence before mutating entry state",
        typeof ctx.applyPreteritAgentiveOwnerhoodRootsToVerbEntry === "function"
            && typeof ctx.applyPreteritAgentiveComplementRootsToVerbEntry === "function"
            && typeof ctx.applyPreteritAgentiveAdverbialRootsToVerbEntry === "function"
            && typeof ctx.applyOrdinaryNounOwnerhoodRootsToVerbEntry === "function"
            && typeof ctx.applyPrelocativeRootsToVerbEntry === "function"
            && typeof ctx.applyPatientivoCompoundEmbedRootsToVerbEntry === "function"
            && typeof ctx.applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry === "function"
            && typeof ctx.applyActiveActionCompoundEmbedRootsToVerbEntry === "function"
            && typeof ctx.applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry === "function"
            && typeof ctx.applyPatientivoNominalCompoundToOrdinaryNncEntry === "function"
            && typeof ctx.applyActiveActionNominalCompoundToOrdinaryNncEntry === "function"
            && typeof ctx.applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry === "function"
            ? (() => {
                const verbEl = ctx.document.getElementById("verb");
                const before = "before-function-use-gate";
                verbEl.value = before;
                const blocked = [
                    ctx.applyPreteritAgentiveOwnerhoodRootsToVerbEntry({
                        preteritAgentiveStem: "tamachti",
                        matrixRoot: "wa",
                    }),
                    ctx.applyPreteritAgentiveComplementRootsToVerbEntry({
                        preteritAgentiveStem: "tamachti",
                        matrixRoot: "mati",
                    }),
                    ctx.applyPreteritAgentiveAdverbialRootsToVerbEntry({
                        preteritAgentiveStem: "tamachti",
                        matrixRoot: "nemi",
                    }),
                    ctx.applyOrdinaryNounOwnerhoodRootsToVerbEntry({
                        nounStem: "kal",
                        nounClass: "zero",
                        matrixRoot: "wa",
                    }),
                    ctx.applyPrelocativeRootsToVerbEntry({
                        incorporatedRoot: "kal",
                        matrixRoot: "tajtani",
                    }),
                    ctx.applyPatientivoCompoundEmbedRootsToVerbEntry({
                        incorporatedRoot: "kal",
                        matrixRoot: "miki",
                    }),
                    ctx.applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry({
                        incorporatedRoot: "kal",
                        matrixRoot: "chikawa",
                    }),
                    ctx.applyActiveActionCompoundEmbedRootsToVerbEntry({
                        actionNominalSurface: "takwalis",
                        matrixRoot: "tzajtzi",
                    }),
                    ctx.applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry({
                        customaryAgentiveStem: "tamachtiani",
                        matrixRoot: "tuka",
                    }),
                    ctx.applyPatientivoNominalCompoundToOrdinaryNncEntry({
                        incorporatedRoot: "kal",
                        matrixRoot: "kal",
                    }),
                    ctx.applyActiveActionNominalCompoundToOrdinaryNncEntry({
                        actionNominalSurface: "takwalis",
                        matrixRoot: "kal",
                    }),
                    ctx.applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry({
                        customaryAgentiveStem: "tamachtiani",
                        matrixRoot: "kal",
                    }),
                ];
                return {
                    blocked,
                    verbValue: verbEl.value,
                };
            })()
            : { blocked: [], verbValue: "composer-runtime-not-loaded" },
        {
            blocked: [false, false, false, false, false, false, false, false, false, false, false, false],
            verbValue: "before-function-use-gate",
        }
    );
    s.eq(
        "function-use composer route actions accept fixed source formula slots before mutation",
        typeof ctx.shouldBlockComposerFunctionUseValenceRouteAction === "function"
            ? (() => {
                const sourceFormulaSlots = {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "" },
                    predicateStem: { slot: "STEM", stem: "kal", displayStem: "kal" },
                    obj1: { slot: "obj1", token: "", displayPrefix: "Ø" },
                    num1Num2: { slot: "num1-num2", connector: "", displayConnector: "Ø" },
                };
                const routeAction = ctx.shouldBlockComposerFunctionUseValenceRouteAction({
                    dataset: { ordinaryNncOwnerhoodContinuation: "true" },
                    routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
                    sourceFormulaSlots,
                    sourceFormulaEcho: "#Ø-Ø(kal)Ø#",
                });
                return {
                    blocked: routeAction.blocked,
                    routeRankingAllowed: routeAction.contract?.routeRankingAllowed,
                    functionUseValenceGate: routeAction.contract?.functionUseValenceGate?.status || "",
                    reason: routeAction.contract?.functionUseValenceGate?.reason || "",
                };
            })()
            : { blocked: true, routeRankingAllowed: false, functionUseValenceGate: "composer-runtime-not-loaded", reason: "" },
        {
            blocked: false,
            routeRankingAllowed: true,
            functionUseValenceGate: "pass",
            reason: "route-action-function-use-valence-frame-fixed",
        }
    );
    s.eq(
        "function-use composer route actions treat object-prefix writes as route-owned pressure, not function-use structure",
        typeof ctx.shouldBlockComposerFunctionUseValenceRouteAction === "function"
            ? (() => {
                const sourceFormulaSlots = {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "" },
                    predicateStem: { slot: "STEM", stem: "mati", displayStem: "mati" },
                    num1Num2: { slot: "num1-num2", connector: "", displayConnector: "Ø" },
                };
                const sourceFormulaSlotsWithObject = {
                    ...sourceFormulaSlots,
                    obj1: { slot: "obj1", token: "ki", displayPrefix: "ki" },
                };
                const sourceFormulaSlotsWithDifferentObject = {
                    ...sourceFormulaSlots,
                    obj1: { slot: "obj1", token: "ta", displayPrefix: "ta" },
                };
                const routeOwnedFrame = {
                    kind: "andrews-incorporation-route-frame",
                    matrixValence: "transitive",
                    routeFrameLicensesObjectSlotOwnership: true,
                    remainingExternalObjectSlots: [{ slotId: "obj1", prefix: "ki" }],
                    objectSlotOwnership: {
                        kind: "andrews-incorporation-object-slot-ownership-frame",
                        matrixValenceFrameFixed: true,
                        functionUseOwnsObjectSlots: false,
                        finalFormulaShapeOwnsObjectSlots: false,
                    },
                };
                const buildAction = (extra = {}) => ctx.shouldBlockComposerFunctionUseValenceRouteAction({
                    dataset: { preteritAgentiveComplementContinuation: "true" },
                    routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                    sourceFormulaSlots,
                    sourceFormulaEcho: "#Ø-Ø(mati)Ø#",
                    objectPrefix: "ki",
                    ...extra,
                });
                const genericObjectPressure = buildAction();
                const routeOwnedObjectPressure = buildAction({
                    sourceRouteFrame: routeOwnedFrame,
                });
                const objectSlotFormulaEvidence = buildAction({
                    sourceFormulaSlots: sourceFormulaSlotsWithObject,
                    sourceFormulaEcho: "#Ø-ki(mati)Ø#",
                });
                const mismatchedObjectEvidence = buildAction({
                    sourceFormulaSlots: sourceFormulaSlotsWithDifferentObject,
                    sourceFormulaEcho: "#Ø-ta(mati)Ø#",
                });
                return {
                    generic: {
                        blocked: genericObjectPressure.blocked,
                        reason: genericObjectPressure.contract?.functionUseValenceGate?.reason || "",
                    },
                    routeOwned: {
                        blocked: routeOwnedObjectPressure.blocked,
                        reason: routeOwnedObjectPressure.contract?.functionUseValenceGate?.reason || "",
                    },
                    objectSlotFormula: {
                        blocked: objectSlotFormulaEvidence.blocked,
                        reason: objectSlotFormulaEvidence.contract?.functionUseValenceGate?.reason || "",
                    },
                    mismatch: {
                        blocked: mismatchedObjectEvidence.blocked,
                        reason: mismatchedObjectEvidence.contract?.functionUseValenceGate?.reason || "",
                    },
                };
            })()
            : { generic: { blocked: true, reason: "composer-runtime-not-loaded" } },
        {
            generic: {
                blocked: true,
                reason: "route-action-function-use-valence-frame-unfixed",
            },
            routeOwned: {
                blocked: false,
                reason: "route-action-function-use-valence-frame-fixed",
            },
            objectSlotFormula: {
                blocked: false,
                reason: "route-action-function-use-valence-frame-fixed",
            },
            mismatch: {
                blocked: true,
                reason: "route-action-function-use-valence-frame-unfixed",
            },
        }
    );
    s.eq(
        "function-use continuation renderers forward route ownership frames before composer mutation",
        (() => {
            const collectCallBlocks = (functionName) => {
                const blocks = [];
                let index = 0;
                const needle = `${functionName}({`;
                while (index >= 0) {
                    const start = rendering.indexOf(needle, index);
                    if (start < 0) {
                        break;
                    }
                    const end = rendering.indexOf("});", start);
                    blocks.push(end > start ? rendering.slice(start, end + 4) : rendering.slice(start));
                    index = start + needle.length;
                }
                return blocks;
            };
            const forwardedFunctions = [
                "applyOrdinaryNounOwnerhoodRootsToVerbEntry",
                "applyActiveActionCompoundEmbedRootsToVerbEntry",
                "applyActiveActionNominalCompoundToOrdinaryNncEntry",
                "applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry",
                "applyPreteritAgentiveOwnerhoodRootsToVerbEntry",
                "applyPreteritAgentiveComplementRootsToVerbEntry",
                "applyPreteritAgentiveAdverbialRootsToVerbEntry",
                "applyPatientivoNominalCompoundToOrdinaryNncEntry",
                "applyPatientivoCompoundEmbedRootsToVerbEntry",
                "applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry",
                "applyPrelocativeRootsToVerbEntry",
                "applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry",
            ];
            const missingForwarding = forwardedFunctions.flatMap((functionName) => {
                const blocks = collectCallBlocks(functionName);
                if (!blocks.length) {
                    return [`${functionName}:missing-call`];
                }
                return blocks
                    .map((block, index) => (
                        block.includes("getFunctionUseContinuationRouteOwnershipOptions(contract)")
                            ? ""
                            : `${functionName}:${index}`
                    ))
                    .filter(Boolean);
            });
            const composerFunctionsMissingRouteParams = forwardedFunctions.flatMap((functionName) => {
                const start = composer.indexOf(`function ${functionName}({`);
                if (start < 0) {
                    return [`${functionName}:missing-function`];
                }
                const end = composer.indexOf("} = {}) {", start);
                const params = end > start ? composer.slice(start, end) : "";
                return ["grammarFrame", "sourceRouteFrame", "routeFrame", "incorporationRouteFrame", "objectSlotOwnership"]
                    .filter((param) => !params.includes(param))
                    .map((param) => `${functionName}:${param}`);
            });
            return { missingForwarding, composerFunctionsMissingRouteParams };
        })(),
        {
            missingForwarding: [],
            composerFunctionsMissingRouteParams: [],
        }
    );
    s.eq(
        "function-use continuation route ownership forwarding reads nested source and entry contracts",
        (() => {
            const start = rendering.indexOf("function getFunctionUseContinuationRouteOwnershipOptions");
            const end = rendering.indexOf("function isAndrewsCnvCnnRouteActionFunctionUseHardBlocked", start);
            const helper = start >= 0 && end > start ? rendering.slice(start, end) : "";
            return {
                readsBareSourceContractRoute: helper.includes("source.sourceContract?.sourceRouteFrame"),
                readsBareTargetContractRoute: helper.includes("source.targetContract?.sourceRouteFrame"),
                readsEntryRouteContractRoute: helper.includes("source.entryRouteContract?.sourceRouteFrame"),
                readsGrammarSourceContractRoute: helper.includes("grammarFrame?.sourceContract?.sourceRouteFrame"),
                readsNestedObjectOwnership: helper.includes("source.entryRouteContract?.sourceContract?.objectSlotOwnership"),
                forwardsNestedFunctionUseGate: helper.includes("source.entryRouteContract?.sourceContract?.functionUseValenceGate"),
                returnsResolvedGate: helper.includes("? functionUseValenceGate"),
            };
        })(),
        {
            readsBareSourceContractRoute: true,
            readsBareTargetContractRoute: true,
            readsEntryRouteContractRoute: true,
            readsGrammarSourceContractRoute: true,
            readsNestedObjectOwnership: true,
            forwardsNestedFunctionUseGate: true,
            returnsResolvedGate: true,
        }
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
    const linkedPromotionButtonsWithoutRouteAction = linkedPromotionButtonBlocks
        .filter(({ body }) => !body.includes("appendContinuationAction(") && !body.includes("applyAndrewsCnvCnnRouteActionDataset("))
        .map(({ index, body }) => {
            const line = rendering.slice(0, index).split("\n").length;
            const dataset = body.match(/dataset\.([A-Za-z0-9_]+)\s*=/)?.[1] || "unknown";
            return `${dataset}@${line}`;
        });
    s.ok(
        `linked promotion chips pass through Andrews 7-record route-action projection${linkedPromotionButtonsWithoutRouteAction.length ? ` (${linkedPromotionButtonsWithoutRouteAction.join(", ")})` : ""}`,
        linkedPromotionButtonBlocks.length >= 20 && linkedPromotionButtonsWithoutRouteAction.length === 0
    );
    s.ok(
        "calificativo general-use source-subject possessor lives in #3 salida rows",
        rendering.includes("renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation")
            && rendering.includes("resolveNawatPossessorPrefixFromSourceSubject")
            && rendering.includes('actionNounStemUse: "general-use"')
            && rendering.includes("combinedMode: resolvedNominalControlCombinedMode")
            && rendering.includes('action.dataset.actionNounSourceSubjectPossessor = derivedPossessorPrefix')
            && rendering.includes("const generalUseTargetSurface = getPrimaryConjugationSurface(generalUseEvaluation?.result)")
            && rendering.includes("const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, 0)")
            && rendering.includes("const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(generalUseEvaluation?.result, 0)")
            && rendering.includes("const sourceIdentityKey = getGeneratedOutputContinuationIdentityKey(evaluation?.result, identityContext)")
            && rendering.includes("sourceIdentityKey === targetIdentityKey")
            && rendering.includes("getGeneratedOutputContinuationIdentityKey(\n            [evaluation?.result, generalUseEvaluation?.result],")
            && rendering.includes('namespace: "action-noun-source-subject-possessor-continuation"')
            && rendering.includes("button.dataset.continuationIdentityKey === continuationIdentityKey")
            && rendering.includes("applyGeneratedOutputContinuationIdentityDataset(action, [evaluation?.result, generalUseEvaluation?.result], identityContext)")
            && rendering.includes("action.dataset.sourceSelectedVariantId = sourceSelectedVariant.variantId")
            && rendering.includes("action.dataset.targetSelectedVariantId = targetSelectedVariant.variantId")
            && rendering.includes("action.dataset.targetSurface = generalUseTargetSurface")
            && rendering.includes("`uso general: ${generalUseTargetSurface}`")
            && !rendering.includes('action.dataset.targetSurface = generalUseEvaluation.result.result || ""')
            && !rendering.includes("button.dataset.targetSurface === generalUseTargetSurface")
            && !rendering.includes("generalUseTargetSurface === currentSurface")
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
    const patientivoBlockConfigStart = rendering.indexOf('const blockConfigs = isPatientivoTense');
    const patientivoBlockConfigEnd = rendering.indexOf('const visibleBlockConfigs = blockConfigs.filter', patientivoBlockConfigStart);
    const patientivoBlockConfigBody = patientivoBlockConfigStart >= 0 && patientivoBlockConfigEnd > patientivoBlockConfigStart
        ? rendering.slice(patientivoBlockConfigStart, patientivoBlockConfigEnd)
        : "";
    const patientivoAvailabilityStart = rendering.indexOf("const nounAvailabilityPatientivoSources = (() => {");
    const patientivoAvailabilityEnd = rendering.indexOf("const nounCombinationEvaluationCache", patientivoAvailabilityStart);
    const patientivoAvailabilityBody = patientivoAvailabilityStart >= 0 && patientivoAvailabilityEnd > patientivoAvailabilityStart
        ? rendering.slice(patientivoAvailabilityStart, patientivoAvailabilityEnd)
        : "";
    const sharedPatientivoControlsStart = rendering.indexOf('controlsBlock.className = "tense-block tense-block--noun-shared-controls"');
    const sharedPatientivoControlsEnd = rendering.indexOf("const createTenseBlock = (", sharedPatientivoControlsStart);
    const sharedPatientivoControlsBody = sharedPatientivoControlsStart >= 0 && sharedPatientivoControlsEnd > sharedPatientivoControlsStart
        ? rendering.slice(sharedPatientivoControlsStart, sharedPatientivoControlsEnd)
        : "";
    s.ok(
        "patientivo noun shared controls are source-neutral while availability probes use explicit Andrews source gates",
        patientivoBlockConfigBody.includes('patientivoSource: "passive"')
            && patientivoBlockConfigBody.includes('patientivoSource: "impersonal"')
            && patientivoBlockConfigBody.includes('patientivoSource: "perfectivo"')
            && patientivoBlockConfigBody.includes('patientivoSource: "imperfectivo"')
            && patientivoBlockConfigBody.includes('patientivoSource: "tronco-verbal"')
            && !patientivoBlockConfigBody.includes('patientivoSource: "nonactive"')
            && patientivoAvailabilityBody.includes('.map((entry) => entry.patientivoSource || "")')
            && patientivoAvailabilityBody.includes("return Array.from(new Set(sources));")
            && !patientivoAvailabilityBody.includes('entry.patientivoSource || "nonactive"')
            && !patientivoAvailabilityBody.includes('["nonactive"]')
            && sharedPatientivoControlsBody.includes("objSection.insertBefore(controlsBlock, grid)")
            && !sharedPatientivoControlsBody.includes("dataset.nawatPatientivoSource")
            && rendering.includes('isNawatPatientivoNonactiveSource(patientivoSource) ? COMBINED_MODE.nonactive : COMBINED_MODE.active')
            && rendering.includes('!isNawatPatientivoNonactiveSource(patientivoSource)')
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
            && rendering.includes('continueButton.dataset.nominalizationSourceUnit = NOMINALIZATION_SOURCE_UNITS.vncCoreStem')
            && rendering.includes('appendNominalizationSourceUnitSubLabel(')
            && rendering.includes('"S patientivo"')
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
            && rendering.includes('targetTense: "predicado-nominal"')
            && rendering.includes('targetTense: "locativo-temporal"')
            && rendering.includes("predicateNominalSourceTense")
            && rendering.includes("storedPredicateNominalSourceTense")
            && rendering.includes("contextPredicateNominalSourceTense\n            || storedPredicateNominalSourceTense")
            && rendering.includes("getPredicateNominalSourceTenses().map")
            && rendering.includes("object-toggle--predicate-source-tense")
            && rendering.includes("setActivePredicateNominalSourceTense")
            && rendering.includes("predicateNominalSourceTense: normalizedSourceTense")
            && composer.includes("encodeValue(override.predicateNominalSourceTense)")
            && rendering.includes("predicateNominalBlockConfigs")
            && rendering.includes('label: getVerbBlockLabel("predicado-nominal-pasivo"')
            && rendering.includes("predicateNominalSourceMode: COMBINED_MODE.nonactive")
            && rendering.includes("predicateNominalSourceMode = \"\"")
            && rendering.includes("predicateNominalSourceMode,")
            && rendering.includes("predicateNominalDerivationMode")
            && rendering.includes("const appendVerbToNominalRowContinuations = ({")
            && rendering.includes("const routeActionContract = buildVerbNominalContinuationRouteActionContractForRendering({")
            && rendering.includes("if (!routeActionContract) {")
            && rendering.includes("continueButton.andrewsRouteActionContract = routeActionContract")
            && rendering.includes('continueButton.dataset.verbNominalContinuation = "true"')
            && rendering.includes('continueButton.dataset.targetMode = "sustantivo"')
            && panels.includes("isNominalMode")
            && panels.includes("setOrdinaryNncGenerationModeEnabled(false);")
            && rendering.includes("isOrdinaryNncGenerationModeEnabled() && !tenseOverride")
            && rendering.includes("const predicateSourceUnit = NOMINALIZATION_SOURCE_UNITS.vncPredicate")
            && rendering.includes("sourceUnit: predicateSourceUnit")
            && rendering.includes("continueButton.dataset.nominalizationSourceUnit = sourceUnit")
            && rendering.includes("function activateCnnOutputModeForContinuation")
            && rendering.includes("setActiveNawatTenseMode(TENSE_MODE.sustantivo, { syncOutput: true })")
            && rendering.includes("modeSystem: typeof TENSE_MODE_SYSTEM !== \"undefined\"")
            && rendering.includes("updateTenseModeTabs()")
            && rendering.includes("activateCnnOutputModeForContinuation({ clearRoute: true });")
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
            && rendering.includes("applyAndrewsCnvCnnRouteActionDataset")
            && rendering.includes("andrewsRouteRecordId")
            && rendering.includes("registro CNN -> CNV")
            && rendering.includes("compuertas Andrews")
            && rendering.includes('objectButton.dataset.sourceContextRequired = sourceContextRequired ? "true" : ""')
            && rendering.includes('objectButton.dataset.sourceEvidenceRequired = sourceEvidenceRequired ? "true" : ""')
            && rendering.includes('objectButton.dataset.tiSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.huiSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.yaSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.tlaIntransitiveSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.intransitiveOaSourceRequired = "true"')
            && rendering.includes('objectButton.dataset.iHuiAHuiSourceRequired = "true"')
            && rendering.includes("sourceEvidenceRequired")
            && rendering.includes("sourceContextRequired")
            && rendering.includes("sourceContextSatisfied")
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
            && rendering.includes("Fuente Andrews: compuesto temporal")
            && rendering.includes("andrewsRouteWarning")
            && rendering.includes("andrewsRouteNote")
            && rendering.includes("Fuente Andrews: tla intransitiva generada")
            && rendering.includes("Fuente Andrews: o-a intransitiva generada")
            && rendering.includes("Fuente Andrews: tronco adverbial")
            && rendering.includes("Fuente Andrews: relacional")
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
    s.ok(
        "denominal active route rendering reads structured model context, not document dataset strings",
        (() => {
            const previewStart = rendering.indexOf("function previewActiveNawatDenominalAndrewsContractRouteNextSourceForRendering");
            const previewEnd = rendering.indexOf("function renderAllOutputs", previewStart);
            const previewSlice = previewStart >= 0 && previewEnd > previewStart ? rendering.slice(previewStart, previewEnd) : "";
            return rendering.includes("function getActiveNawatDenominalAndrewsContractRouteRenderContextFromModel(options = {})")
                && previewSlice.includes("getActiveNawatDenominalAndrewsContractRouteRenderContextFromModel({ inputValue, targetInput, targetVerbStem })")
                && !previewSlice.includes("getActiveNawatDenominalAndrewsContractRouteRenderContextFromDocument()")
                && !rendering.includes("activeContextFromDocumentDataset")
                && !rendering.includes("const contractId = String(dataset.activeAndrewsContractId")
                && !rendering.includes("const routeTemplateId = String(dataset.activeAndrewsRouteTemplateId");
        })()
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
        "instrumentive source-subject possessive output lives in #3 salida rows without predicate-nominal note-2 duplicate",
        rendering.includes("renderInstrumentivoSourceSubjectPossessiveContinuation")
            && rendering.includes("instrumentivoSourceSubjectPossessor")
            && rendering.includes("INSTRUMENTIVO_MODE.posesivo")
            && rendering.includes("Andrews 36.6: sujeto fuente")
            && !rendering.includes("instrumentivoImperfectActiveAbsolutive")
    );
    s.ok(
        "instrumentive source-subject possessive continuation identity uses canonical/route keys instead of rendered surfaces",
        (() => {
            const start = rendering.indexOf("const renderInstrumentivoSourceSubjectPossessiveContinuation = ({");
            const end = rendering.indexOf("const resolveNounToggleAvailabilityState = ({", start);
            const slice = start >= 0 && end > start ? rendering.slice(start, end) : "";
            return slice.includes('namespace: "instrumentivo-source-subject-possessive-continuation"')
                && slice.includes("const sourceIdentityKey = getGeneratedOutputContinuationIdentityKey(evaluation?.result, identityContext)")
                && slice.includes("const targetIdentityKey = getGeneratedOutputContinuationIdentityKey(possessiveEvaluation?.result, identityContext)")
                && slice.includes("sourceIdentityKey !== targetIdentityKey")
                && slice.includes("getGeneratedOutputContinuationIdentityKey(")
                && slice.includes("const sourceSelectedVariant = getGeneratedOutputSelectedRealizationVariant(evaluation?.result, 0)")
                && slice.includes("const targetSelectedVariant = getGeneratedOutputSelectedRealizationVariant(possessiveEvaluation?.result, 0)")
                && slice.includes("const sourceSubjectFrame = typeof buildAndrewsSourceSubjectFrame === \"function\"")
                && slice.includes("sourceTense: \"imperfect-active\"")
                && slice.includes("const sourceSubjectPossessorOperationFrame = typeof buildSourceSubjectPossessorOperationFrame === \"function\"")
                && slice.includes('operationId: "andrews-36-6-instrumentive-source-subject-to-possessor"')
                && slice.includes("sourceSubjectFrame,")
                && slice.includes("sourceSubjectPossessorOperationFrame,")
                && slice.includes("action.dataset.sourceSelectedVariantId = entry.sourceSelectedVariant.variantId")
                && slice.includes("action.dataset.targetSelectedVariantId = entry.targetSelectedVariant.variantId")
                && slice.includes("applyGeneratedOutputContinuationIdentityDataset(action, [evaluation?.result, entry.evaluation?.result], entry.identityContext)")
                && slice.includes("action.dataset.continuationIdentityKey = entry.continuationIdentityKey")
                && !slice.includes("possessiveTargetSurface !== currentSurface")
                && !slice.includes("const currentSurface = getPrimaryConjugationSurface(evaluation?.result)");
        })()
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
                    finiteRouteSourceContextRequiredCount: 18,
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
                "Contextos Andrews pendientes: 18",
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
                    finiteRouteSourceContextRequiredCount: 17,
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
                "Contexto: etapa generada",
                "Objetivos Andrews nominales/verbales: 31",
                "Solicitudes verbales Andrews: 14 con tiempo explícito",
                "Contextos Andrews pendientes: 17",
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
                    "Contexto: ruta Andrews",
                ],
                [
                    "Fuente Andrews: tla intransitiva generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
                ],
                [
                    "Fuente Andrews: o-a intransitiva generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
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
                    "Fuente Andrews: compuesto temporal",
                    "Base Andrews: seilwi",
                    "Matriz temporal: ilwi",
                    "Numeral embed: se",
                    "Contexto: fuente clasificada",
                ],
                [
                    "Fuente Andrews: tronco adverbial",
                    "Base Andrews: achpa",
                    "Contexto: fuente clasificada",
                ],
                [
                    "Fuente Andrews: relacional",
                    "Base Andrews: kalpan",
                    "Contexto: fuente clasificada",
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
                "Contexto: ruta Andrews",
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
                    "Contexto: ruta Andrews",
                ],
                [
                    "Fuente Andrews: ya intransitiva generada",
                    "Base Andrews: pusuk",
                    "Contexto: ruta Andrews",
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
                "Contexto: etapa generada",
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
        "visible CNV formula renderer aligns formula chips to surface-line variants",
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
	                                    { formulaSlotKey: "va1", formulaMorph: "ki", surfaceValue: "ki", visibleLinearMorph: "ki-0" },
	                                    { formulaSlotKey: "va2", formulaMorph: "0", surfaceValue: "", visibleLinearMorph: "ki-0" },
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
	                                    { formulaSlotKey: "va1", formulaMorph: "ki", surfaceValue: "ki", visibleLinearMorph: "ki-0" },
	                                    { formulaSlotKey: "va2", formulaMorph: "0", surfaceValue: "", visibleLinearMorph: "ki-0" },
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
                            surfacePriority: chip.surfaceFrame?.sourcePriority || "",
                            pathModel: chip.surfaceFrame?.pathModel || "",
                            surfaceForms: chip.surfaceFrame?.surfaceForms || [],
                        })),
                    slotChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => ["pers1-pers2", "STEM", "num1-num2"].includes(chip.kind))
                        .map((chip) => [chip.kind, chip.label, chip.value]),
                    surfaceChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "surface")
                        .map((chip) => [chip.label, chip.value]),
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
                        surfacePriority: "surface-line",
                        pathModel: "surface-line-priority-formula-chip-receives",
                        surfaceForms: ["pishki"],
                    },
                    {
                        label: "Fórmula CNV",
                        value: "#0-0+ki-0(piya)0+k-0#",
                        title: "Fórmula CNV: #0-0+ki-0(piya)0+k-0# · salida: piyak",
                        surfacePriority: "surface-line",
                        pathModel: "surface-line-priority-formula-chip-receives",
                        surfaceForms: ["piyak"],
                    },
                ],
                slotChips: [
                    ["pers1-pers2", "persona1-persona2", "0-0"],
                    ["STEM", "base", "(piya)"],
                    ["num1-num2", "número1-número2", "ki-0"],
                ],
                surfaceChips: [["salida", "pishki / piyak"]],
            }
	            : "rendering-runtime-not-loaded"
	    );
	    s.eq(
	        "visible CNV formula path alignment consumes typed path frames instead of formulaEcho or direct string API",
	        typeof ctx.formatVisibleCnvFormulaEcho === "function"
	            && typeof ctx.formatVisibleCnvFormulaEchoForPath === "function"
	            && typeof ctx.alignVisibleCnvFormulaEchoToSurface === "function"
	            && typeof ctx.buildVisibleCnvFormulaAlignmentSourceFrame === "function"
	            && typeof ctx.buildVisibleCnvFormulaAlignmentOperationFrame === "function"
	            ? (() => {
	                const record = {
	                    surface: "nikinhitak",
	                    paths: [
	                        { formulaSlotKey: "pers1", formulaMorph: "ni", surfaceValue: "ni" },
	                        { formulaSlotKey: "pers2", formulaMorph: "Ø", surfaceValue: "" },
	                        { formulaSlotKey: "va1", formulaMorph: "k", surfaceValue: "k", visibleLinearMorph: "k-in" },
	                        { formulaSlotKey: "va2", formulaMorph: "in", surfaceValue: "inh", visibleLinearMorph: "k-in" },
	                        { formulaSlotKey: "base", formulaMorph: "ita", surfaceValue: "ita" },
	                        { formulaSlotKey: "tns", formulaMorph: "Ø", surfaceValue: "" },
	                        { formulaSlotKey: "num1", formulaMorph: "k", surfaceValue: "k" },
	                        { formulaSlotKey: "num2", formulaMorph: "0", surfaceValue: "" },
	                    ],
	                };
	                const source = {
	                    result: "lying-result",
	                    surface: "lying-surface",
	                    surfaceForms: ["lying-surface"],
	                    nuclearClauseShell: {
	                        kind: "nuclear-clause-shell",
	                        formulaType: "VNC",
	                        formulaEcho: "#POISON-POISON+POISON(POISON)POISON+POISON-POISON#",
	                    },
	                    cnvFormulaSurfacePath: {
	                        pathsBySurface: [record],
	                    },
	                };
	                const sourceFrame = ctx.buildVisibleCnvFormulaAlignmentSourceFrame(record);
	                const operationFrame = ctx.buildVisibleCnvFormulaAlignmentOperationFrame(sourceFrame);
	                const contradictoryOperationFrame = {
	                    ...operationFrame,
	                    targetFrame: {
	                        ...operationFrame.targetFrame,
	                        formula: "#0-0(poison)0+0-0#",
	                    },
	                };
	                const changedDisplayRecord = {
	                    ...record,
	                    surface: "poisoned-display-surface",
	                };
	                return {
	                    formatted: ctx.formatVisibleCnvFormulaEcho(source.nuclearClauseShell.formulaEcho, source),
	                    directOldFormat: ctx.formatVisibleCnvFormulaEchoForPath(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        record
	                    ),
	                    directOldAlign: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record
	                    ),
	                    typedAlign: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record,
	                        sourceFrame,
	                        operationFrame
	                    ),
	                    changedDisplayAlign: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#poison#",
	                        "poisoned-display-surface",
	                        changedDisplayRecord,
	                        sourceFrame,
	                        operationFrame
	                    ),
	                    contradictoryTarget: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record,
	                        sourceFrame,
	                        contradictoryOperationFrame
	                    ),
	                    missingSourceFrame: ctx.alignVisibleCnvFormulaEchoToSurface(
	                        "#ni-0+k-in(ita)0+k-0#",
	                        "nikinhitak",
	                        record,
	                        null,
	                        operationFrame
	                    ),
	                };
	            })()
	            : "rendering-runtime-not-loaded",
	        ctx.__TEST_RUNTIME_MODE__ === "module"
	            ? {
	                formatted: "#ni-0+k-inh(ita)0+k-0#",
	                directOldFormat: "",
	                directOldAlign: "",
	                typedAlign: "#ni-0+k-inh(ita)0+k-0#",
	                changedDisplayAlign: "#ni-0+k-inh(ita)0+k-0#",
	                contradictoryTarget: "",
	                missingSourceFrame: "",
	            }
	            : "rendering-runtime-not-loaded"
	    );
	    s.eq(
	        "visible CNV formula chip takes salida from the same LCM surface line as the row",
	        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.buildGrammarFrame === "function" && typeof ctx.buildGrammarResultFrame === "function"
	            ? (() => {
                const result = {
                    nuclearClauseShell: {
                        kind: "nuclear-clause-shell",
                        formulaType: "VNC",
                        formulaEcho: "#ni-Ø+m-etz(mana)Ø+Ø-Ø#",
                    },
                    surfaceForms: ["stale-result-surface"],
                    cnvFormulaSurfacePath: {
                        pathsBySurface: [
                            {
                                surface: "stale-path-surface",
                                paths: [
                                    { formulaSlotKey: "base", formulaMorph: "mana", surfaceValue: "ana" },
                                ],
                            },
                        ],
                    },
                };
                result.grammarFrame = ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surfaceForms: ["nimetzmana"],
                        outputKind: "vnc",
                    }),
                });
                return ctx.buildGeneratedOutputSlotChips(result)
                    .filter((chip) => chip.kind === "formula" || chip.kind === "surface")
                    .map((chip) => [chip.kind, chip.value, chip.title || ""]);
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                ["formula", "#ni-0+m-etz(mana)0+0-0#", "Fórmula CNV: #ni-0+m-etz(mana)0+0-0# · salida: nimetzmana"],
                ["surface", "nimetzmana", ""],
            ]
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "visible CNV formula surface frame receives active station line and route conditions",
        typeof ctx.buildGeneratedOutputSlotChips === "function"
            && typeof ctx.getActiveAndrewsStationLineFrameForRendering === "function"
            && typeof ctx.applyAndrewsStationLineDatasetToSurfaceElement === "function"
            && typeof ctx.getActiveAndrewsRouteConditionFrameForRendering === "function"
            && typeof ctx.applyAndrewsRouteConditionDatasetToSurfaceElement === "function"
            && typeof ctx.getActiveAndrewsSourceLayerFrameForRendering === "function"
            && typeof ctx.applyAndrewsSourceLayerDatasetToSurfaceElement === "function"
            && typeof ctx.getActiveAndrewsRideFrameForRendering === "function"
            && typeof ctx.applyAndrewsRideDatasetToSurfaceElement === "function"
            && ctx.document
            ? (() => {
                const originalGetElementById = ctx.document.getElementById;
                const routeBoard = {
                    hidden: false,
                    dataset: {
                        stationLineModel: "entrada-formula-salida-one-route",
                        stationLineIntentMode: "explore",
                        stationLineActiveStop: "formula",
                        stationLineRouteKey: "CNV:predicate-stem:verbstem>CNV:predicate-stem:deverbal-verbstem",
                        stationLineStops: "entrada:received:CNVpredicate-stemverbstem|formula:positioned:CNVpredicate-stemverbstem|salida:offered:CNVpredicate-stemdeverbal-verbstem",
                        routePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                        passengerPrimaryRoutePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                        activeJourneyConditionFrames: "CNV:predicate-stem:verbstem>CNV:predicate-stem:deverbal-verbstem>deverbal-verbstem",
                        activeJourneyIfStage: "CNV:predicate-stem:verbstem",
                        activeJourneyThenStage: "CNV:predicate-stem:deverbal-verbstem",
                        sourceCandidateStageCount: "3",
                        sourceCandidateStages: "CNVpredicatepredicate:received-source:CNV:predicate:predicate|CNVcoreverbal-core:contained-verbal-core:CNV:core:verbal-core|CNVpredicate-stemverbstem:contained-verbstem:CNV:predicate-stem:verbstem",
                        currentStation: "CNV:predicate-stem:verbstem",
                        rideExperienceModel: "passenger-rides-station-provides",
                        rideOutputJourneyModel: "formula-and-surface-share-one-ride-frame",
                        rideOperatingPrinciple: "station-signs-do-switching-passenger-rides",
                        rideChoiceModel: "explore-or-destination-one-board",
                        ridePrimaryActionLabel: "Siguiente",
                        ridePrimaryRoutePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                        ridePrimaryClickCount: "1",
                        rideSwitchingRequired: "false",
                        rideEvents: "show-current-position|carry-one-route-to-output",
                    },
                };
                const outputStrip = {
                    hidden: true,
                    dataset: {},
                };
                ctx.document.getElementById = (id) => (id === "output-journey-strip" ? outputStrip : routeBoard);
                try {
                    const result = {
                        nuclearClauseShell: {
                            kind: "nuclear-clause-shell",
                            formulaType: "VNC",
                            formulaEcho: "#ni-0(mana)0+0-0#",
                        },
                        cnvFormulaSurfacePath: {
                            pathsBySurface: [
                                {
                                    surface: "nimana",
                                    paths: [
                                        { formulaSlotKey: "pers1", formulaMorph: "ni", surfaceValue: "ni" },
                                        { formulaSlotKey: "base", formulaMorph: "mana", surfaceValue: "mana" },
                                    ],
                                },
                            ],
                        },
                    };
                    const formulaChip = ctx.buildGeneratedOutputSlotChips(result)
                        .find((chip) => chip.kind === "formula");
                    const surfaceChip = ctx.buildGeneratedOutputSlotChips(result)
                        .find((chip) => chip.kind === "surface");
                    const element = { dataset: {} };
                    ctx.applyAndrewsStationLineDatasetToSurfaceElement(
                        element,
                        formulaChip?.surfaceFrame?.stationLineFrame
                    );
                    ctx.applyAndrewsRouteConditionDatasetToSurfaceElement(
                        element,
                        formulaChip?.surfaceFrame?.routeConditionFrame
                    );
                    ctx.applyAndrewsSourceLayerDatasetToSurfaceElement(
                        element,
                        formulaChip?.surfaceFrame?.sourceLayerFrame
                    );
                    ctx.applyAndrewsRideDatasetToSurfaceElement(
                        element,
                        formulaChip?.surfaceFrame?.rideFrame
                    );
                    return {
                        chipStationLine: formulaChip?.surfaceFrame?.stationLineFrame || null,
                        chipRouteCondition: formulaChip?.surfaceFrame?.routeConditionFrame || null,
                        chipSourceLayer: formulaChip?.surfaceFrame?.sourceLayerFrame || null,
                        chipRideFrame: formulaChip?.surfaceFrame?.rideFrame || null,
                        surfaceChipRideFrame: surfaceChip?.surfaceFrame?.rideFrame || null,
                        elementDataset: element.dataset,
                    };
                } finally {
                    ctx.document.getElementById = originalGetElementById;
                }
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                chipStationLine: {
                    lineModel: "entrada-formula-salida-one-route",
                    intentMode: "explore",
                    activeStopId: "formula",
                    routeKey: "CNV:predicate-stem:verbstem>CNV:predicate-stem:deverbal-verbstem",
                    routePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                    stops: "entrada:received:CNVpredicate-stemverbstem|formula:positioned:CNVpredicate-stemverbstem|salida:offered:CNVpredicate-stemdeverbal-verbstem",
                },
                chipRouteCondition: {
                    conditionFrames: "CNV:predicate-stem:verbstem>CNV:predicate-stem:deverbal-verbstem>deverbal-verbstem",
                    ifStage: "CNV:predicate-stem:verbstem",
                    thenStage: "CNV:predicate-stem:deverbal-verbstem",
                },
                chipSourceLayer: {
                    layerModel: "formula-source-layers-route-board",
                    sourceLayerCount: "3",
                    sourceLayers: "CNVpredicatepredicate:received-source:CNV:predicate:predicate|CNVcoreverbal-core:contained-verbal-core:CNV:core:verbal-core|CNVpredicate-stemverbstem:contained-verbstem:CNV:predicate-stem:verbstem",
                    activeSourceStation: "CNV:predicate-stem:verbstem",
                    activeSourceRole: "",
                },
                chipRideFrame: {
                    experienceModel: "passenger-rides-station-provides",
                    outputJourneyModel: "formula-and-surface-share-one-ride-frame",
                    operatingPrinciple: "station-signs-do-switching-passenger-rides",
                    choiceModel: "explore-or-destination-one-board",
                    currentSignLabel: "",
                    nextSignLabel: "",
                    destinationSignLabel: "",
                    primaryActionLabel: "Siguiente",
                    primaryRoutePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                    primaryClickCount: "1",
                    switchingRequired: "false",
                    events: "show-current-position|carry-one-route-to-output",
                },
                surfaceChipRideFrame: {
                    experienceModel: "passenger-rides-station-provides",
                    outputJourneyModel: "formula-and-surface-share-one-ride-frame",
                    operatingPrinciple: "station-signs-do-switching-passenger-rides",
                    choiceModel: "explore-or-destination-one-board",
                    currentSignLabel: "",
                    nextSignLabel: "",
                    destinationSignLabel: "",
                    primaryActionLabel: "Siguiente",
                    primaryRoutePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                    primaryClickCount: "1",
                    switchingRequired: "false",
                    events: "show-current-position|carry-one-route-to-output",
                },
                elementDataset: {
                    stationLineModel: "entrada-formula-salida-one-route",
                    stationLineIntentMode: "explore",
                    stationLineActiveStop: "formula",
                    stationLineRouteKey: "CNV:predicate-stem:verbstem>CNV:predicate-stem:deverbal-verbstem",
                    routePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                    stationLineStops: "entrada:received:CNVpredicate-stemverbstem|formula:positioned:CNVpredicate-stemverbstem|salida:offered:CNVpredicate-stemdeverbal-verbstem",
                    routeConditionFrames: "CNV:predicate-stem:verbstem>CNV:predicate-stem:deverbal-verbstem>deverbal-verbstem",
                    routeIfStage: "CNV:predicate-stem:verbstem",
                    routeThenStage: "CNV:predicate-stem:deverbal-verbstem",
                    sourceLayerModel: "formula-source-layers-route-board",
                    sourceLayerCount: "3",
                    sourceLayers: "CNVpredicatepredicate:received-source:CNV:predicate:predicate|CNVcoreverbal-core:contained-verbal-core:CNV:core:verbal-core|CNVpredicate-stemverbstem:contained-verbstem:CNV:predicate-stem:verbstem",
                    sourceLayerActiveStation: "CNV:predicate-stem:verbstem",
                    sourceLayerActiveRole: "",
                    rideExperienceModel: "passenger-rides-station-provides",
                    rideOutputJourneyModel: "formula-and-surface-share-one-ride-frame",
                    rideOperatingPrinciple: "station-signs-do-switching-passenger-rides",
                    rideChoiceModel: "explore-or-destination-one-board",
                    rideCurrentSignLabel: "",
                    rideNextSignLabel: "",
                    rideDestinationSignLabel: "",
                    ridePrimaryActionLabel: "Siguiente",
                    ridePrimaryRoutePathLabel: "CNV · tronco verbal > CNV · tronco verbal deverbal",
                    ridePrimaryClickCount: "1",
                    rideSwitchingRequired: "false",
                    rideEvents: "show-current-position|carry-one-route-to-output",
                },
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "visible conversion surface receives active route path without a continuation action",
        typeof ctx.syncConjugationConversionSurfaceRouteFrame === "function"
            && typeof ctx.applyAndrewsRideDatasetToSurfaceElement === "function"
            && ctx.document
            ? (() => {
                const originalGetElementById = ctx.document.getElementById;
                const routeBoard = {
                    hidden: false,
                    dataset: {
                        stationLineModel: "entrada-formula-salida-one-route",
                        stationLineIntentMode: "destination",
                        stationLineActiveStop: "salida",
                        stationLineRouteKey: "CNV:predicate:predicate>CNN:predicate-stem:nounstem>CNV:predicate-stem:denominal-verbstem",
                        stationLineStops: "entrada:received:CNVpredicatepredicate|formula:positioned:CNNpredicate-stemnounstem|salida:offered:CNVpredicate-stemdenominal-verbstem",
                        routePathLabel: "CNV · predicado > CNN · tronco nominal > CNV · tronco verbal denominal",
                        routeConditionFrames: "CNV:predicate:predicate>CNN:predicate-stem:nounstem>nominalization|CNN:predicate-stem:nounstem>CNV:predicate-stem:denominal-verbstem>denominal-verbstem",
                        routeIfStage: "CNV:predicate:predicate",
                        routeThenStage: "CNV:predicate-stem:denominal-verbstem",
                        sourceLayerModel: "formula-source-layers-route-board",
                        sourceLayerCount: "3",
                        sourceLayers: "CNVpredicatepredicate:received-source:CNV:predicate:predicate|CNNpredicate-stemnounstem:route-source:CNN:predicate-stem:nounstem|CNVpredicate-stemdenominal-verbstem:route-target:CNV:predicate-stem:denominal-verbstem",
                        sourceLayerActiveStation: "CNV:predicate-stem:denominal-verbstem",
                        rideExperienceModel: "passenger-rides-station-provides",
                        rideOutputJourneyModel: "formula-and-surface-share-one-ride-frame",
                        rideOperatingPrinciple: "station-signs-do-switching-passenger-rides",
                        rideChoiceModel: "explore-or-destination-one-board",
                        ridePrimaryActionLabel: "Usar salida",
                        ridePrimaryRoutePathLabel: "CNV · predicado > CNN · tronco nominal > CNV · tronco verbal denominal",
                        ridePrimaryClickCount: "1",
                        rideSwitchingRequired: "false",
                        rideEvents: "show-current-position|carry-one-route-to-output",
                    },
                };
                const outputStrip = {
                    hidden: true,
                    dataset: {},
                };
                const surfaceLine = { dataset: {} };
                const surfaceText = {
                    dataset: {},
                    querySelectorAll(selector) {
                        return selector === ".conjugation-conversion-surface-line" ? [surfaceLine] : [];
                    },
                };
                const actions = {
                    querySelector() {
                        return null;
                    },
                };
                ctx.document.getElementById = (id) => (id === "output-journey-strip" ? outputStrip : routeBoard);
                try {
                    const result = ctx.syncConjugationConversionSurfaceRouteFrame(surfaceText, actions);
                    return {
                        result,
                        surface: {
                            routePathLabel: surfaceText.dataset.routePathLabel || "",
                            surfacePriority: surfaceText.dataset.andrewsRouteSurfacePriority || "",
                            pathModel: surfaceText.dataset.andrewsRouteSurfacePathModel || "",
                            stationLineRouteKey: surfaceText.dataset.stationLineRouteKey || "",
                            routeThenStage: surfaceText.dataset.routeThenStage || "",
                            sourceLayerActiveStation: surfaceText.dataset.sourceLayerActiveStation || "",
                            rideExperienceModel: surfaceText.dataset.rideExperienceModel || "",
                            rideOutputJourneyModel: surfaceText.dataset.rideOutputJourneyModel || "",
                            ridePrimaryRoutePathLabel: surfaceText.dataset.ridePrimaryRoutePathLabel || "",
                            rideSwitchingRequired: surfaceText.dataset.rideSwitchingRequired || "",
                        },
                        line: {
                            routePathLabel: surfaceLine.dataset.routePathLabel || "",
                            surfacePriority: surfaceLine.dataset.andrewsRouteSurfacePriority || "",
                            pathModel: surfaceLine.dataset.andrewsRouteSurfacePathModel || "",
                            stationLineRouteKey: surfaceLine.dataset.stationLineRouteKey || "",
                            routeThenStage: surfaceLine.dataset.routeThenStage || "",
                            sourceLayerActiveStation: surfaceLine.dataset.sourceLayerActiveStation || "",
                            rideExperienceModel: surfaceLine.dataset.rideExperienceModel || "",
                            rideOutputJourneyModel: surfaceLine.dataset.rideOutputJourneyModel || "",
                            ridePrimaryRoutePathLabel: surfaceLine.dataset.ridePrimaryRoutePathLabel || "",
                            rideSwitchingRequired: surfaceLine.dataset.rideSwitchingRequired || "",
                        },
                    };
                } finally {
                    ctx.document.getElementById = originalGetElementById;
                }
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                result: "CNV · predicado > CNN · tronco nominal > CNV · tronco verbal denominal",
                surface: {
                    routePathLabel: "CNV · predicado > CNN · tronco nominal > CNV · tronco verbal denominal",
                    surfacePriority: "surface-line",
                    pathModel: "surface-line-receives-active-route-frame",
                    stationLineRouteKey: "CNV:predicate:predicate>CNN:predicate-stem:nounstem>CNV:predicate-stem:denominal-verbstem",
                    routeThenStage: "CNV:predicate-stem:denominal-verbstem",
                    sourceLayerActiveStation: "CNV:predicate-stem:denominal-verbstem",
                    rideExperienceModel: "passenger-rides-station-provides",
                    rideOutputJourneyModel: "formula-and-surface-share-one-ride-frame",
                    ridePrimaryRoutePathLabel: "CNV · predicado > CNN · tronco nominal > CNV · tronco verbal denominal",
                    rideSwitchingRequired: "false",
                },
                line: {
                    routePathLabel: "CNV · predicado > CNN · tronco nominal > CNV · tronco verbal denominal",
                    surfacePriority: "surface-line",
                    pathModel: "surface-line-receives-active-route-frame",
                    stationLineRouteKey: "CNV:predicate:predicate>CNN:predicate-stem:nounstem>CNV:predicate-stem:denominal-verbstem",
                    routeThenStage: "CNV:predicate-stem:denominal-verbstem",
                    sourceLayerActiveStation: "CNV:predicate-stem:denominal-verbstem",
                    rideExperienceModel: "passenger-rides-station-provides",
                    rideOutputJourneyModel: "formula-and-surface-share-one-ride-frame",
                    ridePrimaryRoutePathLabel: "CNV · predicado > CNN · tronco nominal > CNV · tronco verbal denominal",
                    rideSwitchingRequired: "false",
                },
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "visible CNV formula renderer aligns preterit formula chips to surface expansion",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const result = ctx.executeGenerateWordRequest({
                    options: {
                        silent: true,
                        skipValidation: true,
                        override: {
                            tenseMode: ctx.TENSE_MODE.verbo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                            tiempo: "preterito",
                            posicionesFormula: {
                                pers1: "",
                                obj1: "ki",
                                tronco: "tzuma",
                                pers2: "",
                                num2: "",
                                tiempo: "preterito",
                            },
                        },
                    },
                    posicionesFormula: {
                        pers1: "",
                        obj1: "ki",
                        tronco: "tzuma",
                        pers2: "",
                        num2: "",
                        tiempo: "preterito",
                    },
                    entradaTronco: {
                        tieneControlTronco: false,
                        valorTronco: "",
                    },
                });
                return {
                    surfaceForms: result.surfaceForms,
                    formulaChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "formula")
                        .map((chip) => chip.value),
                    subjectChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "pers1-pers2")
                        .map((chip) => chip.value),
                    surfaceChips: ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "surface")
                        .map((chip) => chip.value),
                    parentheticalLeak: ctx.buildGeneratedOutputSlotChips(result)
                        .some((chip) => /\([^)]*\([^)]*\)/.test(chip.value) || chip.value.includes("(ki)")),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                surfaceForms: ["kitzun", "kitzunki"],
                formulaChips: [
                    "#0-0+ki-0(tzun)0+0-0#",
                    "#0-0+ki-0(tzun)0+ki-0#",
                ],
                subjectChips: ["0-0"],
                surfaceChips: ["kitzun / kitzunki"],
                parentheticalLeak: false,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "Lesson 46.3.1.a generated row stays compact while route stack belongs to builder",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const sourceFrame = ctx.buildLesson4631aPreteritAgentiveLocativeSourceFrame({
                    sourceVerbStem: "namaka",
                    incorporatedNounStem: "mich",
                });
                const operationFrame = ctx.buildLesson4631aPreteritAgentiveLocativeOperationFrame(sourceFrame);
                const result = ctx.executeGenerateWordRequest({
                    options: {
                        silent: true,
                        skipValidation: true,
                        override: {
                            tenseMode: ctx.TENSE_MODE.sustantivo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                            relationalNnc: {
                                enabled: true,
                                sourceFrame,
                                operationFrame,
                            },
                        },
                    },
                    posicionesFormula: {
                        pers1: "",
                        obj1: "",
                        tronco: "(mich)-(namaka)",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "locativo-agentivo-preterito",
                    },
                    entradaTronco: {
                        tieneControlTronco: false,
                        valorTronco: "",
                    },
                });
                const chips = ctx.buildGeneratedOutputSlotChips(result);
                const routeKinds = new Set(["node", "route", "rule", "branch"]);
                return {
                    surface: result.surface,
                    stem: chips.find((chip) => chip.kind === "STEM")?.value || "",
                    state: chips.find((chip) => chip.kind === "state")?.value || "",
                    chipKinds: chips.map((chip) => chip.kind),
                    slotLabels: chips
                        .filter((chip) => ["formula", "pers1-pers2", "STEM", "state", "num1-num2", "surface"].includes(chip.kind))
                        .map((chip) => `${chip.kind}: ${chip.label || ""}`),
                    routeChipCount: chips.filter((chip) => routeKinds.has(chip.kind)).length,
                    routeGraphFrameCount: chips.filter((chip) => chip.routeGraphFrame).length,
                    routeFamilyId: result.routeFamilyGraph?.familyId || "",
                    routeStepIds: result.routeContract?.routeSteps?.map((step) => step.id) || [],
                    routeRuleIds: result.routeContract?.ruleTrace?.map((rule) => rule.id) || [],
                    compact: ctx.buildGeneratedOutputCompactSubLabel(
                        ctx.appendGrammarFrameSubLabels("conector Ø", result, { includeDiagnostics: false }),
                        result
                    ),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                surface: "michnamakakan",
                stem: "(mich-namaka-0-ka-n)",
                state: "adverbializado -0-",
                chipKinds: ["formula", "pers1-pers2", "STEM", "state", "num1-num2", "surface"],
                slotLabels: [
                    "formula: Fórmula CNN",
                    "pers1-pers2: persona1-persona2",
                    "STEM: STEM",
                    "state: estado del predicado",
                    "num1-num2: número1-número2",
                    "surface: salida",
                ],
                routeChipCount: 0,
                routeGraphFrameCount: 0,
                routeFamilyId: "andrews-46.3-ca-n-locative",
                routeStepIds: [
                    "source-visible",
                    "build-preterit-predicate",
                    "build-preterit-agentive-general-use-stem",
                    "gate-46-3-1-a-immediate-source",
                    "add-locative-relational-n",
                    "adverbialize-zero-connector",
                    "realize-surface",
                ],
                routeRuleIds: [
                    "if-source-cnv-then-preterit-predicate",
                    "if-preterit-predicate-then-agentive-ka",
                    "if-preterit-agentive-then-locative-n",
                    "if-locative-nounstem-then-normal-cnn-branch",
                    "if-locative-nounstem-then-adverbial-zero",
                    "if-adverbial-formula-then-surface",
                ],
                compact: "conector Ø",
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "future predicado-nominal keeps source s inside the NNC predicate stem and resolves absolutive ti",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const result = ctx.executeGenerateWordRequest({
                    options: {
                        silent: true,
                        skipValidation: true,
                        override: {
                            tenseMode: ctx.TENSE_MODE.sustantivo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                            predicateNominalSourceTense: "futuro",
                        },
                    },
                    posicionesFormula: {
                        pers1: "",
                        obj1: "ta",
                        tronco: "(mich)-(namaka)",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "predicado-nominal",
                    },
                    entradaTronco: {
                        tieneControlTronco: false,
                        valorTronco: "",
                    },
                });
                return {
                    result: result?.result || "",
                    surfaceForms: result?.surfaceForms || [],
                    routeBuilderRequired: result?.routeBuilderRequired === true,
                    diagnosticIds: (result?.diagnostics || []).map((entry) => entry?.id || "").filter(Boolean),
                    routeFamily: result?.grammarFrame?.routeContract?.routeFamily || result?.frames?.routeContract?.routeFamily || "",
                    routeStage: result?.grammarFrame?.routeContract?.routeStage || result?.frames?.routeContract?.routeStage || "",
                    formulaEcho: result?.nuclearClauseShell?.formulaEcho || "",
                    connector: result?.num1Num2?.displaySurface || "",
                    chipKinds: ctx.buildGeneratedOutputSlotChips(result).map((chip) => chip.kind),
                    chipValues: ctx.buildGeneratedOutputSlotChips(result).map((chip) => [chip.kind, chip.value]),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                result: "tanamakasti",
                surfaceForms: ["tanamakasti"],
                routeBuilderRequired: false,
                diagnosticIds: [],
                routeFamily: "predicate-nominal",
                routeStage: "execute",
                formulaEcho: "#Ø-Ø(tanamaka-s)ti#",
                connector: "ti",
                chipKinds: [
                    "formula",
                    "pers1-pers2",
                    "STEM",
                    "state",
                    "num1-num2",
                    "surface",
                    "nominalization",
                    "source",
                    "connector",
                ],
                chipValues: [
                    ["formula", "#Ø-Ø(tanamaka-s)ti#"],
                    ["pers1-pers2", "Ø...Ø"],
                    ["STEM", "(tanamaka-s)"],
                    ["state", "absolutive"],
                    ["num1-num2", "ti"],
                    ["surface", "tanamakasti"],
                    ["nominalization", "predicate-nominal"],
                    ["source", "fut"],
                    ["connector", "ti"],
                ],
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "visible CNV formula chips project to surface lines for Andrews-converted Nawat stem samples",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const formulaToSurface = (value = "") => String(value || "")
                    .replace(/^Fórmula CNV:\s*/u, "")
                    .replace(/[>#]/g, "")
                    .replace(/[()]/g, "")
                    .replace(/[+\-]/g, "")
                    .replace(/[Ø0∅]/g, "")
                    .replace(/\s+/g, "")
                    .trim();
                const samples = [
                    { source: "Andrews L7 piya/pish class alternation", tronco: "piya", tiempo: "preterito", obj1: "ki" },
                    { source: "Andrews L7 a-final perfective contraction", tronco: "tzuma", tiempo: "preterito", obj1: "ki" },
                    { source: "Andrews L6 m-itz object bridge", tronco: "mana", tiempo: "presente", obj1: "metz" },
                    { source: "Andrews L7 vowel-stem future surface", tronco: "ilpia", tiempo: "futuro", obj1: "kin" },
                    { source: "Andrews L7 i-stem preterit surface", tronco: "ita", tiempo: "preterito", obj1: "kin" },
                    { source: "Andrews L7 vowel-stem reflexive bridge", tronco: "altia", tiempo: "condicional", obj1: "mu" },
                ];
                return samples.flatMap((sample) => {
                    const result = ctx.executeGenerateWordRequest({
                        options: {
                            silent: true,
                            skipValidation: true,
                            override: {
                                tenseMode: ctx.TENSE_MODE.verbo,
                                derivationMode: ctx.DERIVATION_MODE.active,
                                voiceMode: ctx.VOICE_MODE.active,
                                tiempo: sample.tiempo,
                                posicionesFormula: {
                                    pers1: "",
                                    obj1: sample.obj1,
                                    tronco: sample.tronco,
                                    pers2: "",
                                    num2: "",
                                    tiempo: sample.tiempo,
                                },
                            },
                        },
                        posicionesFormula: {
                            pers1: "",
                            obj1: sample.obj1,
                            tronco: sample.tronco,
                            pers2: "",
                            num2: "",
                            tiempo: sample.tiempo,
                        },
                        entradaTronco: {
                            tieneControlTronco: false,
                            valorTronco: "",
                        },
                    });
                    const formulaSurfaces = ctx.buildGeneratedOutputSlotChips(result)
                        .filter((chip) => chip.kind === "formula")
                        .map((chip) => formulaToSurface(chip.value))
                        .filter(Boolean);
                    const surfaceForms = ctx.getConjugationSurfaceForms(result);
                    return surfaceForms
                        .filter((surface) => !formulaSurfaces.includes(surface))
                        .map((surface) => ({
                            source: sample.source,
                            tronco: sample.tronco,
                            tiempo: sample.tiempo,
                            obj1: sample.obj1,
                            missingSurface: surface,
                            formulaSurfaces,
                            surfaceForms,
                        }));
                });
            })()
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module" ? [] : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "visible CNV formula chip assigns kinh to the va2 in~inh allomorph",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const summarize = (tronco, tiempo) => {
                    const result = ctx.executeGenerateWordRequest({
                        options: {
                            silent: true,
                            skipValidation: true,
                            override: {
                                tenseMode: ctx.TENSE_MODE.verbo,
                                derivationMode: ctx.DERIVATION_MODE.active,
                                voiceMode: ctx.VOICE_MODE.active,
                                tiempo,
                                posicionesFormula: {
                                    pers1: "",
                                    obj1: "kin",
                                    tronco,
                                    pers2: "",
                                    num2: "",
                                    tiempo,
                                },
                            },
                        },
                        posicionesFormula: {
                            pers1: "",
                            obj1: "kin",
                            tronco,
                            pers2: "",
                            num2: "",
                            tiempo,
                        },
                        entradaTronco: {
                            tieneControlTronco: false,
                            valorTronco: "",
                        },
                    });
                    return {
                        surfaceForms: result.surfaceForms,
                        formulaChips: ctx.buildGeneratedOutputSlotChips(result)
                            .filter((chip) => chip.kind === "formula")
                            .map((chip) => chip.value),
                    };
                };
                return {
                    ilpiaFuture: summarize("ilpia", "futuro"),
                    itaPreterit: summarize("ita", "preterito"),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                ilpiaFuture: {
                    surfaceForms: ["kinhilpis"],
                    formulaChips: ["#0-0+k-inh(ilpi)s+0-0#"],
                },
                itaPreterit: {
                    surfaceForms: ["kinhitzki", "kinhitak"],
                    formulaChips: [
                        "#0-0+k-inh(itz)0+ki-0#",
                        "#0-0+k-inh(ita)0+k-0#",
                    ],
                },
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "visible CNV formula chips keep Lesson 8 wal/al directionals in their own formula slot",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const summarize = ({
                    pers1 = "",
                    obj1 = "",
                    tronco,
                    tiempo = "presente",
                }) => {
                    const result = ctx.executeGenerateWordRequest({
                        options: {
                            silent: true,
                            skipValidation: true,
                            override: {
                                tenseMode: ctx.TENSE_MODE.verbo,
                                derivationMode: ctx.DERIVATION_MODE.active,
                                voiceMode: ctx.VOICE_MODE.active,
                                tiempo,
                                posicionesFormula: {
                                    pers1,
                                    obj1,
                                    tronco,
                                    pers2: "",
                                    num2: "",
                                    tiempo,
                                },
                            },
                        },
                        posicionesFormula: {
                            pers1,
                            obj1,
                            tronco,
                            pers2: "",
                            num2: "",
                            tiempo,
                        },
                        entradaTronco: {
                            tieneControlTronco: false,
                            valorTronco: "",
                        },
                    });
                    const chips = ctx.buildGeneratedOutputSlotChips(result);
                    return {
                        surfaceForms: result.surfaceForms,
                        formulaChips: chips
                            .filter((chip) => chip.kind === "formula")
                            .map((chip) => chip.value),
                        directionalChips: chips
                            .filter((chip) => chip.kind === "directional")
                            .map((chip) => chip.value),
                    };
                };
                return {
                    intransitiveThird: summarize({ tronco: "wal+(chulua)" }),
                    intransitiveFirst: summarize({ pers1: "ni", tronco: "wal+(chulua)" }),
                    transitiveFirstThird: summarize({ pers1: "ni", obj1: "ki", tronco: "wal-(ilpia)", tiempo: "futuro" }),
                    transitiveFirstThirdPlural: summarize({ pers1: "ni", obj1: "kin", tronco: "wal-(ilpia)", tiempo: "futuro" }),
                    transitiveFirstSecond: summarize({ pers1: "ni", obj1: "metz", tronco: "wal-(ilpia)", tiempo: "futuro" }),
                    transitiveSecondFirst: summarize({ pers1: "ti", obj1: "nech", tronco: "wal-(ilpia)", tiempo: "futuro" }),
                    transitiveThirdThird: summarize({ obj1: "ki", tronco: "wal-(ilpia)", tiempo: "futuro" }),
                    transitiveThirdReflexive: summarize({ obj1: "mu", tronco: "wal-(ilpia)", tiempo: "futuro" }),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                intransitiveThird: {
                    surfaceForms: ["walchulua"],
                    formulaChips: ["#0-0+wal(chulua)0+0-0#"],
                    directionalChips: ["wal"],
                },
                intransitiveFirst: {
                    surfaceForms: ["nalchulua"],
                    formulaChips: ["#n-0+al(chulua)0+0-0#"],
                    directionalChips: ["al"],
                },
                transitiveFirstThird: {
                    surfaceForms: ["nalilpis"],
                    formulaChips: ["#n-0+al+0-0(ilpi)s+0-0#"],
                    directionalChips: ["al"],
                },
                transitiveFirstThirdPlural: {
                    surfaceForms: ["nalinhilpis"],
                    formulaChips: ["#n-0+al+0-inh(ilpi)s+0-0#"],
                    directionalChips: ["al"],
                },
                transitiveFirstSecond: {
                    surfaceForms: ["nalmetzilpis"],
                    formulaChips: ["#n-0+al+m-etz(ilpi)s+0-0#"],
                    directionalChips: ["al"],
                },
                transitiveSecondFirst: {
                    surfaceForms: ["talnechilpis"],
                    formulaChips: ["#t-0+al+n-ech(ilpi)s+0-0#"],
                    directionalChips: ["al"],
                },
                transitiveThirdThird: {
                    surfaceForms: ["kalilpis"],
                    formulaChips: ["#0-0+k-0+al(ilpi)s+0-0#"],
                    directionalChips: ["al"],
                },
                transitiveThirdReflexive: {
                    surfaceForms: ["walmuilpis"],
                    formulaChips: ["#0-0+wal+m-u(ilpi)s+0-0#"],
                    directionalChips: ["wal"],
                },
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "visible CNV formula chips keep Lesson 8 un directional as regular Lesson 2 prefix",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const summarize = ({
                    pers1 = "",
                    obj1 = "",
                    tronco,
                    tiempo = "presente",
                }) => {
                    const result = ctx.executeGenerateWordRequest({
                        options: {
                            silent: true,
                            skipValidation: true,
                            override: {
                                tenseMode: ctx.TENSE_MODE.verbo,
                                derivationMode: ctx.DERIVATION_MODE.active,
                                voiceMode: ctx.VOICE_MODE.active,
                                tiempo,
                                posicionesFormula: {
                                    pers1,
                                    obj1,
                                    tronco,
                                    pers2: "",
                                    num2: "",
                                    tiempo,
                                },
                            },
                        },
                        posicionesFormula: {
                            pers1,
                            obj1,
                            tronco,
                            pers2: "",
                            num2: "",
                            tiempo,
                        },
                        entradaTronco: {
                            tieneControlTronco: false,
                            valorTronco: "",
                        },
                    });
                    const chips = ctx.buildGeneratedOutputSlotChips(result);
                    return {
                        surfaceForms: result.surfaceForms,
                        formulaChips: chips
                            .filter((chip) => chip.kind === "formula")
                            .map((chip) => chip.value),
                        subjectChips: chips
                            .filter((chip) => chip.kind === "pers1-pers2")
                            .map((chip) => chip.value),
                        directionalChips: chips
                            .filter((chip) => chip.kind === "directional")
                            .map((chip) => chip.value),
                        objectChips: chips
                            .filter((chip) => chip.kind === "obj1")
                            .map((chip) => chip.value),
                    };
                };
                return {
                    intransitiveThird: summarize({ tronco: "un+(chulua)" }),
                    intransitiveFirst: summarize({ pers1: "ni", tronco: "un+(chulua)" }),
                    intransitiveSecond: summarize({ pers1: "ti", tronco: "un+(chulua)" }),
                    vowelStemFirst: summarize({ pers1: "ni", tronco: "un+(itta)" }),
                    nonspecificFirst: summarize({ pers1: "ni", obj1: "te", tronco: "un-(ilpia)", tiempo: "futuro" }),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                intransitiveThird: {
                    surfaceForms: ["unchulua"],
                    formulaChips: ["#0-0+un(chulua)0+0-0#"],
                    subjectChips: ["0-0"],
                    directionalChips: ["un"],
                    objectChips: ["Ø"],
                },
                intransitiveFirst: {
                    surfaceForms: ["nunchulua"],
                    formulaChips: ["#n-0+un(chulua)0+0-0#"],
                    subjectChips: ["n-0"],
                    directionalChips: ["un"],
                    objectChips: ["Ø"],
                },
                intransitiveSecond: {
                    surfaceForms: ["tunchulua"],
                    formulaChips: ["#t-0+un(chulua)0+0-0#"],
                    subjectChips: ["t-0"],
                    directionalChips: ["un"],
                    objectChips: ["Ø"],
                },
                vowelStemFirst: {
                    surfaceForms: ["nunhitta"],
                    formulaChips: ["#n-0+un(hitta)0+0-0#"],
                    subjectChips: ["n-0"],
                    directionalChips: ["un"],
                    objectChips: ["Ø"],
                },
                nonspecificFirst: {
                    surfaceForms: ["nunteilpis"],
                    formulaChips: ["#n-0+un+te(ilpi)s+0-0#"],
                    subjectChips: ["n-0"],
                    directionalChips: ["un"],
                    objectChips: ["te"],
                },
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "visible CNV formula renderer normalizes surface-zero slots consistently",
        typeof ctx.buildGeneratedOutputSlotChips === "function" && typeof ctx.executeGenerateWordRequest === "function"
            ? (() => {
                const result = ctx.executeGenerateWordRequest({
                    options: {
                        silent: true,
                        skipValidation: true,
                        override: {
                            tenseMode: ctx.TENSE_MODE.verbo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                            tiempo: "preterito",
                            posicionesFormula: {
                                pers1: "",
                                obj1: "ki",
                                tronco: "ilpia",
                                pers2: "",
                                num2: "",
                                tiempo: "preterito",
                            },
                        },
                    },
                    posicionesFormula: {
                        pers1: "",
                        obj1: "ki",
                        tronco: "ilpia",
                        pers2: "",
                        num2: "",
                        tiempo: "preterito",
                    },
                    entradaTronco: {
                        tieneControlTronco: false,
                        valorTronco: "",
                    },
                });
                const chips = ctx.buildGeneratedOutputSlotChips(result);
                return {
                    surfaceForms: result.surfaceForms,
                    formulaChips: chips
                        .filter((chip) => chip.kind === "formula")
                        .map((chip) => chip.value),
                    subjectChips: chips
                        .filter((chip) => chip.kind === "pers1-pers2")
                        .map((chip) => chip.value),
                    numberChips: chips
                        .filter((chip) => chip.kind === "num1-num2")
                        .map((chip) => chip.value),
                    surfaceChips: chips
                        .filter((chip) => chip.kind === "surface")
                        .map((chip) => chip.value),
                    mixedZeroMarker: chips
                        .filter((chip) => ["formula", "pers1-pers2", "num1-num2"].includes(chip.kind))
                        .some((chip) => String(chip.value || "").includes("Ø")),
                };
            })()
            : "rendering-runtime-not-loaded",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                surfaceForms: ["kilpij"],
                formulaChips: ["#0-0+k-0(ilpij)0+0-0#"],
                subjectChips: ["0-0"],
                numberChips: ["0-0"],
                surfaceChips: ["kilpij"],
                mixedZeroMarker: false,
            }
            : "rendering-runtime-not-loaded"
    );
    s.eq(
        "shared renderer does not derive VNC slot chips from formula echo when slot objects are absent",
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
                result: "kimin / kiminki",
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
                        id: "comparison-source-gated",
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
                            id: "comparison-source-gated",
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
                const bannedVisiblePattern = /Unidad y función|Unit(?:\s+and|\s*&)?\s+Function|\b(?:Subject|Object|Tense|Source|Target|Generation|Diagnostic|Route|Stage|Result|Input|Output)\b|\btns\b|diagnostic-only|classify-boundary|authorityFrame|resultFrame|routeContract|legacyNawatGate/i;
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
        "shared renderer treats LCM result-frame surface forms as structured entries before stale result text",
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
            ? ["frame-surface"]
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
            ? "frame-surface"
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
        "Andrews CNV to CNN nominal renderer projects executable suboperation logic",
        typeof ctx.applyAndrewsCnvCnnNominalRenderingDataset === "function"
            && typeof ctx.getAndrewsCnvCnnNominalRenderedSurface === "function"
            && typeof ctx.generateWord === "function"
            ? (() => {
                const result = ctx.generateWord({
                    silent: true,
                    skipValidation: true,
                    override: {},
                    posicionesFormula: {
                        pers1: "",
                        obj1: "",
                        tronco: "nemi",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "agentivo",
                    },
                });
                const classNames = [];
                const element = {
                    dataset: {},
                    classList: {
                        add(...names) {
                            classNames.push(...names);
                        },
                    },
                };
                const frame = ctx.applyAndrewsCnvCnnNominalRenderingDataset(element, result);
                return {
                    returnedKind: frame?.kind || "",
                    classAdded: classNames.includes("conjugation-rendering--andrews-cnv-cnn-nominal"),
                    render: element.dataset.andrewsCnvCnnNominalRender,
                    authority: element.dataset.andrewsCnvCnnNominalAuthority,
                    transition: element.dataset.andrewsCnvCnnNominalTransition,
                    operationId: element.dataset.andrewsCnvCnnNominalOperationId,
                    executionKind: element.dataset.andrewsCnvCnnNominalExecutionKind,
                    executableLogic: element.dataset.andrewsCnvCnnNominalExecutableLogic,
                    generationAllowed: element.dataset.andrewsCnvCnnNominalGenerationAllowed,
                    operationApplied: element.dataset.andrewsCnvCnnNominalOperationApplied,
                    formulaEcho: element.dataset.andrewsCnvCnnNominalFormulaEcho,
                    surface: element.dataset.andrewsCnvCnnNominalSurface,
                    renderedSurface: ctx.getAndrewsCnvCnnNominalRenderedSurface(result),
                    sourceStem: element.dataset.andrewsCnvCnnNominalSourceStem,
                    spellingAuthority: element.dataset.andrewsCnvCnnNominalSpellingAuthority,
                    classicalSpellingRole: element.dataset.andrewsCnvCnnNominalClassicalSpellingRole,
                    classicalSurfaceImport: element.dataset.andrewsCnvCnnNominalClassicalSurfaceImport,
                };
            })()
            : { returnedKind: "rendering-runtime-not-loaded" },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                returnedKind: "andrews-cnv-cnn-operational-suboperation-frame",
                classAdded: true,
                render: "true",
                authority: "Andrews",
                transition: "CNV->CNN",
                operationId: "customary-agentive-reanalysis",
                executionKind: "source-target-reanalysis",
                executableLogic: "true",
                generationAllowed: "true",
                operationApplied: "append-customary-present-ni-inside-nounstem",
                formulaEcho: "CNV(nemi) -> #Ø-Ø(nemini)Ø#",
                surface: "nemini",
                renderedSurface: "nemini",
                sourceStem: "nemi",
                spellingAuthority: "Nawat/Pipil orthography bridge",
                classicalSpellingRole: "structural-only",
                classicalSurfaceImport: "blocked",
            }
            : { returnedKind: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "Andrews CNV to CNN nominal renderer maps each Nawat surface to its own formula",
        typeof ctx.applyAndrewsCnvCnnNominalRenderingDataset === "function"
            && typeof ctx.generateWord === "function"
            ? (() => {
                const result = ctx.generateWord({
                    silent: true,
                    skipValidation: true,
                    override: {},
                    posicionesFormula: {
                        pers1: "",
                        obj1: "ta",
                        tronco: "-(mati)",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "agentivo-preterito",
                    },
                });
                const renderedSurface = ctx.getAndrewsCnvCnnNominalRenderedSurface(result);
                return ["tamatki", "tamatik"].map((surface) => {
                    const element = {
                        dataset: {},
                        classList: { add() {} },
                    };
                    ctx.applyAndrewsCnvCnnNominalRenderingDataset(element, result, { surface });
                    return {
                        surface,
                        allRenderedSurfaces: renderedSurface,
                        renderedSurface: element.dataset.andrewsCnvCnnNominalSurface,
                        formulaEcho: element.dataset.andrewsCnvCnnNominalFormulaEcho,
                        sourceToTargetFormulaEcho: element.dataset.andrewsCnvCnnNominalSourceToTargetFormulaEcho,
                        pairCount: element.dataset.andrewsCnvCnnNominalFormulaSurfacePairCount,
                        pairMatched: element.dataset.andrewsCnvCnnNominalFormulaSurfacePairMatched,
                    };
                });
            })()
            : [{ surface: "rendering-runtime-not-loaded" }],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    surface: "tamatki",
                    allRenderedSurfaces: "tamatki / tamatik",
                    renderedSurface: "tamatki",
                    formulaEcho: "#Ø-Ø(tamat-0)ki-0#",
                    sourceToTargetFormulaEcho: "CNV(mati) -> #Ø-Ø(tamat-0)ki-0#",
                    pairCount: "2",
                    pairMatched: "true",
                },
                {
                    surface: "tamatik",
                    allRenderedSurfaces: "tamatki / tamatik",
                    renderedSurface: "tamatik",
                    formulaEcho: "#Ø-Ø(tamati-0)k-0#",
                    sourceToTargetFormulaEcho: "CNV(mati) -> #Ø-Ø(tamati-0)k-0#",
                    pairCount: "2",
                    pairMatched: "true",
                },
            ]
            : [{ surface: "rendering-runtime-not-loaded" }]
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
                        orthographyRefs: ["data/static_modes.json"],
                        sourceContext: {
                            kind: "adjectival-nnc-function",
                            status: "source-context-satisfied",
                            targetAuthority: "Andrews",
                            contextSource: "patientive generated stage",
                            boundaries: {
                                sourceContextFromSelectedGeneratedStage: true,
                                sourceContextFromAndrewsContractRoute: true,
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
                    logicAuthority: element.dataset.grammarLogicAuthority,
                    evidenceStatus: element.dataset.grammarEvidenceStatus,
                    spellingEvidenceRole: element.dataset.grammarSpellingEvidenceRole,
                    classicalSpellingRole: element.dataset.grammarClassicalSpellingRole,
                    orthographyRef: element.dataset.grammarOrthographyRef,
                    orthographyRefs: element.dataset.grammarOrthographyRefs,
                    orthographyBoundary: element.dataset.grammarOrthographyBoundary,
                    orthographyStatus: element.dataset.grammarOrthographyStatus,
                    spellingAuthority: element.dataset.grammarSpellingAuthority,
                    classicalSurfaceImport: element.dataset.grammarClassicalSurfaceImport,
                    sourceContextKind: element.dataset.grammarSourceContextKind,
                    sourceContextStatus: element.dataset.grammarSourceContextStatus,
                    sourceContextTargetAuthority: element.dataset.grammarSourceContextTargetAuthority,
                    sourceContextSource: element.dataset.grammarSourceContextSource,
                    sourceContextFlags: element.dataset.grammarSourceContextFlags,
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
                logicAuthority: "Andrews",
                evidenceStatus: "source-evidence-satisfied",
                spellingEvidenceRole: "orthography-realization-only",
                classicalSpellingRole: "structural-only",
                orthographyRef: "data/static_modes.json",
                orthographyRefs: "data/static_modes.json",
                orthographyBoundary: "nawat-pipil-realization",
                orthographyStatus: "",
                spellingAuthority: "Nawat/Pipil orthography bridge",
                classicalSurfaceImport: "blocked",
                sourceContextKind: "adjectival-nnc-function",
                sourceContextStatus: "source-context-satisfied",
                sourceContextTargetAuthority: "Andrews",
                sourceContextSource: "patientive generated stage",
                sourceContextFlags: "sourceContextFromAndrewsContractRoute|sourceContextFromSelectedGeneratedStage",
                sourceEvidenceKind: "adjectival-nnc-function",
                sourceEvidenceStatus: "source-context-satisfied",
                sourceEvidenceTargetAuthority: "Andrews",
                sourceEvidenceSource: "patientive generated stage",
                sourceEvidenceFlags: "sourceContextFromAndrewsContractRoute|sourceContextFromSelectedGeneratedStage",
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
        "verb nominal row continuation route action consumes preview grammar frame instead of display strings",
        typeof ctx.buildVerbNominalContinuationRouteActionContractForRendering === "function"
            ? (() => {
                const buildPreview = (id) => {
                    const formulaRecord = ctx.buildGrammarFormulaRecord({
                        id: `verb-nominal-source-${id}`,
                        formulaType: "CNV",
                        formulaSlots: {
                            predicateStem: { slot: "STEM", stem: `stem-${id}` },
                        },
                    });
                    const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                        id: `verb-nominal-realization-${id}`,
                        formulaRecord,
                        segmentFrames: [
                            { slot: "predicateStem", formulaValue: `stem-${id}`, surface: `surface-${id}` },
                        ],
                        surfaceForms: [`surface-${id}`],
                    });
                    return {
                        result: "poison",
                        surface: "poison",
                        stem: "poison",
                        formulaEcho: "#poison#",
                        dataset: {
                            andrewsRouteRecordId: "cnv-to-cnn-to-cnv-loop",
                            targetTense: "poison",
                        },
                        posicionesFormula: {
                            tronco: "poison",
                        },
                        grammarFrame: ctx.buildGrammarFrame({
                            routeContract: ctx.buildGrammarRouteContractFrame({
                                routeFamily: "verb-to-nominal-row-continuation",
                                routeStage: "target-mode-preview",
                                generationAllowed: true,
                            }),
                            resultFrame: ctx.buildGrammarResultFrame({
                                ok: true,
                                surface: "poison",
                                formulaRecord,
                                formulaRealizationRecord: realizationRecord,
                            }),
                        }),
                    };
                };
                const structural = buildPreview("a");
                const structuralPoisonedDisplay = {
                    ...structural,
                    result: "different-poison",
                    surface: "different-poison",
                    stem: "different-poison",
                    formulaEcho: "#different-poison#",
                    dataset: {
                        andrewsRouteRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
                        routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
                    },
                    posicionesFormula: {
                        tronco: "different-poison",
                    },
                };
                const stringOnly = {
                    result: "surface-a",
                    surface: "surface-a",
                    formulaEcho: "#Ø-Ø(surface-a)Ø#",
                    dataset: {
                        andrewsRouteRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                    },
                };
                const blockedResultFrame = {
                    ...structural,
                    grammarFrame: ctx.buildGrammarFrame({
                        routeContract: ctx.buildGrammarRouteContractFrame({
                            routeFamily: "verb-to-nominal-row-continuation",
                            routeStage: "target-mode-preview",
                            generationAllowed: true,
                        }),
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: false,
                            surface: "surface-a",
                        }),
                    }),
                };
                const predicateContract = ctx.buildVerbNominalContinuationRouteActionContractForRendering({
                    preview: structural,
                    sourceUnit: ctx.NOMINALIZATION_SOURCE_UNITS.vncPredicate,
                });
                const poisonedContract = ctx.buildVerbNominalContinuationRouteActionContractForRendering({
                    preview: structuralPoisonedDisplay,
                    sourceUnit: ctx.NOMINALIZATION_SOURCE_UNITS.vncPredicate,
                });
                const coreContract = ctx.buildVerbNominalContinuationRouteActionContractForRendering({
                    preview: structural,
                    sourceUnit: ctx.NOMINALIZATION_SOURCE_UNITS.vncCoreStem,
                });
                const stringOnlyContract = ctx.buildVerbNominalContinuationRouteActionContractForRendering({
                    preview: stringOnly,
                    sourceUnit: ctx.NOMINALIZATION_SOURCE_UNITS.vncPredicate,
                });
                const blockedContract = ctx.buildVerbNominalContinuationRouteActionContractForRendering({
                    preview: blockedResultFrame,
                    sourceUnit: ctx.NOMINALIZATION_SOURCE_UNITS.vncPredicate,
                });
                return {
                    predicateRoute: predicateContract?.routeRecordId || "",
                    poisonedRoute: poisonedContract?.routeRecordId || "",
                    coreRoute: coreContract?.routeRecordId || "",
                    stringOnlyContract: stringOnlyContract || null,
                    blockedContract: blockedContract || null,
                    hasRouteFrame: predicateContract?.routeFrame?.kind || "",
                    gateCount: predicateContract?.obstacleGateIds?.length || 0,
                };
            })()
            : { predicateRoute: "rendering-runtime-not-loaded" },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                predicateRoute: "cnv-predicate-to-cnn-nounstem-nominalization",
                poisonedRoute: "cnv-predicate-to-cnn-nounstem-nominalization",
                coreRoute: "cnv-core-to-cnn-nounstem-deverbal",
                stringOnlyContract: null,
                blockedContract: null,
                hasRouteFrame: "andrews-cnv-cnn-route-coordinate-frame",
                gateCount: 8,
            }
            : { predicateRoute: "rendering-runtime-not-loaded" }
    );
    s.eq(
        "shared route dataset consumes structural Andrews action contracts for continuation chips",
        typeof ctx.applyAndrewsCnvCnnRouteActionDataset === "function"
            ? (() => {
                const makeContract = (routeRecordId, input = {}, options = {}) => ctx.buildAndrewsCnvCnnBackAndForthRouteActionContract(
                    input,
                    {
                        routeRecordId,
                        obstacleLimit: 8,
                        generationAllowed: options.generationAllowed ?? true,
                    }
                );
                const makeElement = (dataset, contract) => {
                    const attributes = {};
                    return {
                        dataset: { ...dataset },
                        andrewsRouteActionContract: contract || null,
                        title: "",
                        textContent: "continuación",
                        setAttribute(name, value) {
                            attributes[name] = value;
                        },
                        getAttribute(name) {
                            return attributes[name] || "";
                        },
                        attributes,
                    };
                };
                const samples = [
                    makeElement(
                        { verbNominalContinuation: "true", targetTense: "agentivo-preterito" },
                        makeContract("cnv-predicate-to-cnn-nounstem-nominalization")
                    ),
                    makeElement(
                        { verbNominalContinuation: "true", targetTense: "sustantivo-verbal" },
                        makeContract("cnv-core-to-cnn-nounstem-deverbal")
                    ),
                    makeElement(
                        { denominalAndrewsContractRouteContinuation: "true" },
                        makeContract("cnn-nounstem-to-cnv-verbstem-denominal")
                    ),
                    makeElement(
                        { preteritAgentiveCompoundEmbedContinuation: "true" },
                        makeContract("cnv-to-cnn-to-cnv-loop", {
                            functionUseValenceGate: {
                                status: "blocked",
                                routeRankingAllowed: false,
                                generationAllowed: false,
                                reason: "route-action-function-use-valence-frame-unfixed",
                            },
                        })
                    ),
                ];
                samples.forEach((element) => ctx.applyAndrewsCnvCnnRouteActionDataset(element, element));
                const datasetOnly = makeElement({
                    verbNominalContinuation: "true",
                    targetTense: "agentivo-preterito",
                    andrewsRouteRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                });
                ctx.applyAndrewsCnvCnnRouteActionDataset(datasetOnly, datasetOnly);
                return samples.map((element) => ({
                    routeRecordId: element.dataset.andrewsRouteRecordId,
                    expectedRouteRecordId: element.dataset.andrewsUiExpectedRouteRecordId,
                    operation: element.dataset.andrewsUiOperation,
                    gateCount: Number(element.dataset.andrewsRouteObstacleGateCount || 0),
                    routeRankingAllowed: element.dataset.andrewsRouteRankingAllowed,
                    functionUseValenceGate: element.dataset.andrewsRouteFunctionUseValenceGate,
                    actionAllowed: element.dataset.andrewsRouteActionAllowed,
                    diagnosticOnly: element.dataset.andrewsRouteDiagnosticOnly,
                    titleHasSpanishRegister: /registro Andrews:/.test(element.title),
                    titleHasGates: /compuertas Andrews:/.test(element.title),
                    ariaMentionsGates: /compuertas Andrews/.test(element.attributes["aria-label"] || ""),
                })).concat([{
                    routeRecordId: datasetOnly.dataset.andrewsRouteRecordId || "",
                    expectedRouteRecordId: datasetOnly.dataset.andrewsUiExpectedRouteRecordId || "",
                    operation: datasetOnly.dataset.andrewsUiOperation || "",
                    gateCount: Number(datasetOnly.dataset.andrewsRouteObstacleGateCount || 0),
                    routeRankingAllowed: datasetOnly.dataset.andrewsRouteRankingAllowed || "",
                    functionUseValenceGate: datasetOnly.dataset.andrewsRouteFunctionUseValenceGate || "",
                    actionAllowed: datasetOnly.dataset.andrewsRouteActionAllowed || "",
                    diagnosticOnly: datasetOnly.dataset.andrewsRouteDiagnosticOnly || "",
                    titleHasSpanishRegister: /registro Andrews:/.test(datasetOnly.title),
                    titleHasGates: /compuertas Andrews:/.test(datasetOnly.title),
                    ariaMentionsGates: /compuertas Andrews/.test(datasetOnly.attributes["aria-label"] || ""),
                }]);
            })()
            : [{ routeRecordId: "rendering-runtime-not-loaded" }],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                    expectedRouteRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                    operation: "nominalizacion agentiva",
                    gateCount: 8,
                    routeRankingAllowed: "true",
                    functionUseValenceGate: "",
                    actionAllowed: "true",
                    diagnosticOnly: "false",
                    titleHasSpanishRegister: true,
                    titleHasGates: true,
                    ariaMentionsGates: true,
                },
                {
                    routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
                    expectedRouteRecordId: "cnv-core-to-cnn-nounstem-deverbal",
                    operation: "nominal deverbal sustantivo-verbal",
                    gateCount: 8,
                    routeRankingAllowed: "true",
                    functionUseValenceGate: "",
                    actionAllowed: "true",
                    diagnosticOnly: "false",
                    titleHasSpanishRegister: true,
                    titleHasGates: true,
                    ariaMentionsGates: true,
                },
                {
                    routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
                    expectedRouteRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
                    operation: "verbalizacion denominal",
                    gateCount: 8,
                    routeRankingAllowed: "true",
                    functionUseValenceGate: "",
                    actionAllowed: "true",
                    diagnosticOnly: "false",
                    titleHasSpanishRegister: true,
                    titleHasGates: true,
                    ariaMentionsGates: true,
                },
                {
                    routeRecordId: "cnv-to-cnn-to-cnv-loop",
                    expectedRouteRecordId: "cnv-to-cnn-to-cnv-loop",
                    operation: "bucle CNV-CNN-CNV",
                    gateCount: 8,
                    routeRankingAllowed: "false",
                    functionUseValenceGate: "blocked",
                    actionAllowed: "false",
                    diagnosticOnly: "true",
                    titleHasSpanishRegister: true,
                    titleHasGates: true,
                    ariaMentionsGates: true,
                },
                {
                    routeRecordId: "",
                    expectedRouteRecordId: "",
                    operation: "",
                    gateCount: 0,
                    routeRankingAllowed: "",
                    functionUseValenceGate: "",
                    actionAllowed: "",
                    diagnosticOnly: "",
                    titleHasSpanishRegister: false,
                    titleHasGates: false,
                    ariaMentionsGates: false,
                },
            ]
            : [{ routeRecordId: "rendering-runtime-not-loaded" }]
    );
    s.eq(
        "shared route dataset exposes the function-use valence hard gate before action use",
        typeof ctx.applyAndrewsCnvCnnRouteActionDataset === "function"
            ? (() => {
                const makeContract = (routeRecordId) => ctx.buildAndrewsCnvCnnBackAndForthRouteActionContract(
                    {
                        functionUseValenceGate: {
                            status: "blocked",
                            routeRankingAllowed: false,
                            generationAllowed: false,
                            reason: "route-action-function-use-valence-frame-unfixed",
                        },
                    },
                    {
                        routeRecordId,
                        obstacleLimit: 8,
                        generationAllowed: true,
                    }
                );
                const makeElement = (dataset, contract) => ({
                    dataset: { ...dataset },
                    andrewsRouteActionContract: contract || null,
                    title: "",
                    textContent: "continuación",
                    setAttribute() {},
                    getAttribute() {
                        return "";
                    },
                });
                const adverbial = makeElement(
                    { preteritAgentiveAdverbialContinuation: "true" },
                    makeContract("cnv-predicate-to-cnn-nounstem-nominalization")
                );
                const ownerhood = makeElement(
                    { ordinaryNncOwnerhoodContinuation: "true" },
                    makeContract("cnn-nounstem-to-cnv-verbstem-denominal")
                );
                [adverbial, ownerhood].forEach((element) => ctx.applyAndrewsCnvCnnRouteActionDataset(element, element));
                return [adverbial, ownerhood].map((element) => ({
                    routeRecordId: element.dataset.andrewsRouteRecordId,
                    routeRankingAllowed: element.dataset.andrewsRouteRankingAllowed,
                    functionUseValenceGate: element.dataset.andrewsRouteFunctionUseValenceGate,
                    functionUseValenceReason: element.dataset.andrewsRouteFunctionUseValenceReason,
                    actionAllowed: element.dataset.andrewsRouteActionAllowed,
                    diagnosticOnly: element.dataset.andrewsRouteDiagnosticOnly,
                }));
            })()
            : [{ routeRecordId: "rendering-runtime-not-loaded" }],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                {
                    routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                    routeRankingAllowed: "false",
                    functionUseValenceGate: "blocked",
                    functionUseValenceReason: "route-action-function-use-valence-frame-unfixed",
                    actionAllowed: "false",
                    diagnosticOnly: "true",
                },
                {
                    routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
                    routeRankingAllowed: "false",
                    functionUseValenceGate: "blocked",
                    functionUseValenceReason: "route-action-function-use-valence-frame-unfixed",
                    actionAllowed: "false",
                    diagnosticOnly: "true",
                },
            ]
            : [{ routeRecordId: "rendering-runtime-not-loaded" }]
    );
    s.eq(
        "blocked Andrews function-use route chips stop click actions before state mutation",
        typeof ctx.applyAndrewsCnvCnnRouteActionDataset === "function"
            ? (() => {
                const makeContract = () => ctx.buildAndrewsCnvCnnBackAndForthRouteActionContract(
                    {
                        functionUseValenceGate: {
                            status: "blocked",
                            routeRankingAllowed: false,
                            generationAllowed: false,
                            reason: "route-action-function-use-valence-frame-unfixed",
                        },
                    },
                    {
                        routeRecordId: "cnv-to-cnn-to-cnv-loop",
                        obstacleLimit: 8,
                        generationAllowed: true,
                    }
                );
                const makeButton = (dataset, contract) => {
                    const attributes = {};
                    const classes = new Set();
                    const listeners = [];
                    const button = {
                        dataset: { ...dataset },
                        andrewsRouteActionContract: contract || null,
                        title: "",
                        textContent: "continuación",
                        disabled: false,
                        classList: {
                            add(...values) {
                                values.forEach((value) => classes.add(value));
                            },
                            contains(value) {
                                return classes.has(value);
                            },
                        },
                        setAttribute(name, value) {
                            attributes[name] = value;
                        },
                        getAttribute(name) {
                            return attributes[name] || "";
                        },
                        addEventListener(type, handler, options) {
                            listeners.push({
                                type,
                                handler,
                                capture: options === true || options?.capture === true,
                            });
                        },
                        dispatchClick() {
                            const event = {
                                defaultPrevented: false,
                                propagationStopped: false,
                                immediateStopped: false,
                                preventDefault() {
                                    this.defaultPrevented = true;
                                },
                                stopPropagation() {
                                    this.propagationStopped = true;
                                },
                                stopImmediatePropagation() {
                                    this.immediateStopped = true;
                                    this.propagationStopped = true;
                                },
                            };
                            for (const listener of listeners.filter((entry) => entry.type === "click" && entry.capture)) {
                                listener.handler(event);
                                if (event.immediateStopped) {
                                    return event;
                                }
                            }
                            for (const listener of listeners.filter((entry) => entry.type === "click" && !entry.capture)) {
                                listener.handler(event);
                                if (event.immediateStopped) {
                                    return event;
                                }
                            }
                            return event;
                        },
                        attributes,
                        classes,
                    };
                    return button;
                };
                const button = makeButton({ preteritAgentiveCompoundEmbedContinuation: "true" }, makeContract());
                ctx.applyAndrewsCnvCnnRouteActionDataset(button, button);
                let downstreamClickRan = false;
                button.addEventListener("click", () => {
                    downstreamClickRan = true;
                });
                const event = button.dispatchClick();
                return {
                    routeRecordId: button.dataset.andrewsRouteRecordId,
                    routeRankingAllowed: button.dataset.andrewsRouteRankingAllowed,
                    functionUseValenceGate: button.dataset.andrewsRouteFunctionUseValenceGate,
                    actionAllowed: button.dataset.andrewsRouteActionAllowed,
                    hardGateBlocked: button.dataset.andrewsRouteHardGateBlocked,
                    actionBlocked: button.dataset.andrewsRouteActionBlocked,
                    guardBound: button.dataset.andrewsRouteHardGateClickGuardBound,
                    disabled: button.disabled,
                    ariaDisabled: button.attributes["aria-disabled"] || "",
                    unavailableClass: button.classes.has("is-unavailable"),
                    gatedClass: button.classes.has("is-function-use-valence-gated"),
                    defaultPrevented: event.defaultPrevented,
                    immediateStopped: event.immediateStopped,
                    downstreamClickRan,
                };
            })()
            : { routeRecordId: "rendering-runtime-not-loaded" },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                routeRecordId: "cnv-to-cnn-to-cnv-loop",
                routeRankingAllowed: "false",
                functionUseValenceGate: "blocked",
                actionAllowed: "false",
                hardGateBlocked: "true",
                actionBlocked: "function-use-valence-object",
                guardBound: "true",
                disabled: true,
                ariaDisabled: "true",
                unavailableClass: true,
                gatedClass: true,
                defaultPrevented: true,
                immediateStopped: true,
                downstreamClickRan: false,
            }
            : { routeRecordId: "rendering-runtime-not-loaded" }
    );
    s.ok(
        "every structurally authorized visible continuation chip resolves to one of the 7 Andrews route records",
        typeof ctx.applyAndrewsCnvCnnRouteActionDataset === "function"
            ? (() => {
                const routeIdForDataset = (dataset = {}) => {
                    const has = (key) => Boolean(dataset[key]);
                    if (has("denominalAndrewsContractRouteContinuation") || has("ordinaryNncOwnerhoodContinuation")) {
                        return "cnn-nounstem-to-cnv-verbstem-denominal";
                    }
                    if (has("verbPatientivoContinuation") || has("patientivoPrelocativeContinuation")) {
                        return "cnv-core-to-cnn-nounstem-deverbal";
                    }
                    if (has("patientivoTroncoConversion") || has("huaDeverbalYuContinuation")) {
                        return "cnv-to-cnn-to-cnv-loop";
                    }
                    if (has("verbNominalContinuation")) {
                        return String(dataset.targetTense || "").trim().startsWith("agentivo")
                            ? "cnv-predicate-to-cnn-nounstem-nominalization"
                            : "cnv-core-to-cnn-nounstem-deverbal";
                    }
                    if (
                        has("vncAdjectivalFunctionContinuation")
                        || has("nominalizedVncAdjectivalFunctionContinuation")
                        || has("preteritAgentiveNominalCompoundContinuation")
                        || has("customaryAgentiveNominalCompoundContinuation")
                        || has("preteritAgentiveComplementContinuation")
                        || has("preteritAgentiveAdverbialContinuation")
                    ) {
                        return "cnv-predicate-to-cnn-nounstem-nominalization";
                    }
                    if (
                        has("ordinaryNncAdjectivalFunctionContinuation")
                        || has("patientivoAdjectivalFunctionContinuation")
                        || has("intensifiedAdjectivalFunctionContinuation")
                        || has("compoundSourceAdjectivalFunctionContinuation")
                        || has("activeActionNominalCompoundContinuation")
                        || has("patientivoNominalCompoundContinuation")
                        || has("actionNounSourceSubjectPossessor")
                        || has("instrumentivoSourceSubjectPossessor")
                    ) {
                        return "cnv-core-to-cnn-nounstem-deverbal";
                    }
                    if (
                        has("activeActionCompoundEmbedContinuation")
                        || has("customaryAgentiveCompoundEmbedContinuation")
                        || has("preteritAgentiveCompoundEmbedContinuation")
                        || has("patientivoCompoundEmbedContinuation")
                        || has("patientivoCharacteristicPropertyEmbedContinuation")
                        || has("preteritAgentiveOwnerhoodContinuation")
                        || has("denominalCompoundAdjectivalFunctionContinuation")
                    ) {
                        return "cnv-to-cnn-to-cnv-loop";
                    }
                    return "";
                };
                const makeElement = (dataset) => {
                    const routeRecordId = routeIdForDataset(dataset);
                    return {
                        dataset: { ...dataset },
                        andrewsRouteActionContract: routeRecordId
                            ? ctx.buildAndrewsCnvCnnBackAndForthRouteActionContract({}, {
                                routeRecordId,
                                obstacleLimit: 8,
                                generationAllowed: true,
                            })
                            : null,
                        title: "",
                        textContent: "continuación",
                        setAttribute() {},
                        getAttribute() {
                            return "";
                        },
                    };
                };
                const samples = [
                    { actionNounSourceSubjectPossessor: "ki" },
                    { activeActionCompoundEmbedContinuation: "true" },
                    { activeActionNominalCompoundContinuation: "true" },
                    { compoundSourceAdjectivalFunctionContinuation: "true" },
                    { customaryAgentiveCompoundEmbedContinuation: "true" },
                    { customaryAgentiveNominalCompoundContinuation: "true" },
                    { denominalAndrewsContractRouteContinuation: "true" },
                    { denominalCompoundAdjectivalFunctionContinuation: "true" },
                    { huaDeverbalYuContinuation: "true" },
                    { instrumentivoSourceSubjectPossessor: "ki" },
                    { intensifiedAdjectivalFunctionContinuation: "true" },
                    { nominalizedVncAdjectivalFunctionContinuation: "true" },
                    { ordinaryNncAdjectivalFunctionContinuation: "true" },
                    { ordinaryNncOwnerhoodContinuation: "true" },
                    { patientivoAdjectivalFunctionContinuation: "true" },
                    { patientivoCharacteristicPropertyEmbedContinuation: "true" },
                    { patientivoCompoundEmbedContinuation: "true" },
                    { patientivoNominalCompoundContinuation: "true" },
                    { patientivoPrelocativeContinuation: "true" },
                    { patientivoTroncoConversion: "true" },
                    { preteritAgentiveAdverbialContinuation: "true" },
                    { preteritAgentiveComplementContinuation: "true" },
                    { preteritAgentiveCompoundEmbedContinuation: "true" },
                    { preteritAgentiveNominalCompoundContinuation: "true" },
                    { preteritAgentiveOwnerhoodContinuation: "true" },
                    { verbNominalContinuation: "true", targetTense: "agentivo-preterito" },
                    { verbNominalContinuation: "true", targetTense: "sustantivo-verbal" },
                    { verbPatientivoContinuation: "true" },
                    { vncAdjectivalFunctionContinuation: "true" },
                ].map(makeElement);
                samples.forEach((element) => ctx.applyAndrewsCnvCnnRouteActionDataset(element, element));
                const routeIds = new Set((typeof ctx.getAndrewsCnvCnnBackAndForthRouteRecords === "function"
                    ? ctx.getAndrewsCnvCnnBackAndForthRouteRecords()
                    : []
                ).map((record) => record.id));
                return samples.every((element) => routeIds.has(element.dataset.andrewsRouteRecordId));
            })()
            : true
    );
    s.eq(
        "visible conversion group audit fails old function-first headers and passes route-record headers",
        typeof ctx.auditVisibleContinuationRouteRecordGroups === "function"
            ? (() => {
                const makeGroup = ({ key, routeRecordId = "", eyebrow = "Registro", title = "CNV → CNN nominalizada", chipCount = 1 }) => ({
                    dataset: {
                        continuationGroup: key,
                        andrewsRouteRecordGroupId: routeRecordId,
                    },
                    querySelector(selector) {
                        if (selector === ".conjugation-continuation-group__eyebrow") {
                            return { textContent: eyebrow };
                        }
                        if (selector === ".conjugation-continuation-group__title") {
                            return { textContent: title };
                        }
                        return null;
                    },
                    querySelectorAll(selector) {
                        return selector === ".calc-guidance__chip"
                            ? Array.from({ length: chipCount }, () => ({}))
                            : [];
                    },
                });
                const routeGroup = makeGroup({
                    key: "registro-cnv-cnn-nominalizada",
                    routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                });
                const oldGroup = makeGroup({
                    key: "sustantivo-patientivo",
                    eyebrow: "CNN",
                    title: "Patientivo",
                });
                const root = {
                    querySelectorAll(selector) {
                        return selector === ".conjugation-conversion-actions .conjugation-continuation-group"
                            ? [routeGroup, oldGroup]
                            : [];
                    },
                };
                return ctx.auditVisibleContinuationRouteRecordGroups(root);
            })()
            : { ok: true, groupCount: 0, missingRouteRecordGroups: [] },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                ok: false,
                groupCount: 2,
                missingRouteRecordGroups: [{
                    key: "sustantivo-patientivo",
                    eyebrow: "CNN",
                    title: "Patientivo",
                    chipCount: 1,
                }],
            }
            : { ok: true, groupCount: 0, missingRouteRecordGroups: [] }
    );
    s.eq(
        "visible route output audit compares chip operation, group route, Andrews route, and allowed action",
        typeof ctx.auditVisibleContinuationRouteOutputConsistency === "function"
            ? (() => {
                const makeChip = (dataset, textContent = "→ salida") => ({
                    dataset: { ...dataset },
                    textContent,
                    querySelectorAll() {
                        return [];
                    },
                });
                const goodChip = makeChip({
                    verbPatientivoContinuation: "true",
                    andrewsRouteRecordId: "cnv-core-to-cnn-nounstem-deverbal",
                    andrewsRouteActionAllowed: "true",
                    andrewsUiOperation: "patientivo",
                });
                const mismatchChip = makeChip({
                    verbPatientivoContinuation: "true",
                    andrewsRouteRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
                    andrewsRouteActionAllowed: "true",
                    andrewsUiOperation: "patientivo",
                });
                const group = {
                    dataset: {
                        continuationGroup: "registro-cnv-cnn-deverbal",
                        andrewsRouteRecordGroupId: "cnv-core-to-cnn-nounstem-deverbal",
                    },
                    querySelectorAll(selector) {
                        return selector === ".calc-guidance__chip" ? [goodChip, mismatchChip] : [];
                    },
                };
                const root = {
                    querySelectorAll(selector) {
                        return selector === ".conjugation-conversion-actions .conjugation-continuation-group"
                            ? [group]
                            : [];
                    },
                };
                const audit = ctx.auditVisibleContinuationRouteOutputConsistency(root);
                return {
                    ok: audit.ok,
                    groupCount: audit.groupCount,
                    chipCount: audit.chipCount,
                    issueKinds: audit.inconsistencies.map((entry) => entry.kind),
                };
            })()
            : { ok: true, groupCount: 0, chipCount: 0, issueKinds: [] },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                ok: false,
                groupCount: 1,
                chipCount: 2,
                issueKinds: [
                    "group-chip-route-mismatch",
                    "ui-operation-andrews-route-mismatch",
                ],
            }
            : { ok: true, groupCount: 0, chipCount: 0, issueKinds: [] }
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
