"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("ui");
    const html = fs.readFileSync(path.resolve(__dirname, "..", "..", "index.html"), "utf8");
    const css = fs.readFileSync(path.resolve(__dirname, "..", "..", "style.css"), "utf8");
    const rendering = fs.readFileSync(path.resolve(__dirname, "..", "ui", "rendering", "rendering.js"), "utf8");
    const composer = fs.readFileSync(path.resolve(__dirname, "..", "ui", "composer", "composer.js"), "utf8");
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

    s.ok(
        "ordinary NNC S control lives in the composer entry board tabs",
        tabsHtml.includes('id="verb-entry-board-ordinary-nnc"')
            && tabsHtml.includes('data-ordinary-nnc-mode="true"')
            && />\s*S\s*<\/button>/.test(tabsHtml)
    );
    s.ok(
        "ordinary NNC S control is labeled as a nominal clause",
        tabsHtml.includes('aria-label="Tablero NNC/S: clausula nominal"')
            && tabsHtml.includes('title="NNC/S: clausula nominal"')
    );
    s.no(
        "ordinary NNC is not rendered as a Nawat mode operator chip",
        html.includes('id="calc-nawat-mode-ordinary-nnc"')
            || nawatModeHtml.includes('data-ordinary-nnc-mode="true"')
    );
    s.ok(
        "entry board tabs reserve columns for V, S, and S->V",
        css.includes("grid-template-columns: repeat(3, minmax(44px, 1fr));")
            && css.includes("grid-template-columns: auto minmax(24px, auto) minmax(24px, auto) minmax(38px, auto);")
            && /#container-inputs #composer-slot-stage > \.verb-entry-board-tabs\s*\{[^}]*grid-column: 1;[^}]*justify-self: start;/s.test(css)
    );
    s.ok(
        "Andrews workspace frames the all-lesson map and grammar stages",
        html.includes('id="andrews-workspace"')
            && html.includes('class="andrews-contract-strip"')
            && html.includes('data-contract-layer="andrews"')
            && html.includes('data-andrews-stage="source"')
            && html.includes('data-andrews-stage="route-controls"')
            && html.includes('data-andrews-stage="output"')
            && css.includes(".andrews-workspace")
            && css.includes("grid-template-rows: auto auto minmax(0, 1fr);")
            && css.includes("grid-template-columns: repeat(6, minmax(0, 1fr));")
            && css.includes("grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));")
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
        "ordinary NNC composer tag is not labeled as a plain sustantivo",
        composer.includes('matrixInputTag.textContent = ordinaryNncActive')
            && composer.includes('? "NNC"')
            && composer.includes('activeBoard === COMPOSER_ENTRY_BOARD.nounToVerb ? "Sustantivo" : "Verbo"')
            && composer.includes('matrixLabel.textContent = ordinaryNncActive ? "Tronco predicado" : "Raíz matriz"')
    );
    s.ok(
        "Lesson 1 concept registry reaches browser runtime without generation",
        html.includes("src/core/concepts/concepts.js")
            && concepts.includes("concept-glossary-metadata")
            && concepts.includes("generationAllowed: false")
            && concepts.includes("concept glossary is not generation")
    );
    s.ok(
        "Lesson 3 particle metadata reaches browser runtime while particle mode stays placeholder",
        html.includes("src/core/particles/particles.js")
            && html.includes('id="calc-nawat-mode-particle"')
            && html.includes('calc-operator-chip--placeholder')
            && html.includes('aria-disabled="true"')
            && html.includes("disabled")
            && particles.includes("particle-inventory-boundary")
            && particles.includes("particle placement metadata is not particle generation")
            && particles.includes("generationAllowed: false")
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
            && adverbial.includes("legacy adverbio word output is not a full Lesson 44 engine")
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
            && composer.includes("classifyOrthographyInput(verbInputSource.parseValue || verbInputSource.rawValue || \"\")")
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
            && clause.includes("Clausula ${formulaType}")
            && clause.includes("NUCLEAR_CLAUSE_FORMULA_TYPE.vnc")
            && clause.includes("NUCLEAR_CLAUSE_FORMULA_TYPE.nnc")
    );
    s.ok(
        "Lesson 4 nuclear clause shell labels reach generated output rows",
        rendering.includes("function buildNuclearClauseShellSubLabels")
            && rendering.includes("function appendNuclearClauseShellSubLabels")
            && rendering.includes("result.nuclearClauseShell")
            && rendering.includes("evaluation.result?.nuclearClauseShell")
            && rendering.includes('formula ? `${label}: ${formula}` : label')
    );
    s.ok(
        "ordinary NNC entrada uses analogue input and digital composer controls",
        composer.includes("parseComposerOrdinaryNncAnalogueInput")
            && composer.includes("formatComposerOrdinaryNncAnalogueInput")
            && composer.includes("buildComposerOrdinaryNncInputBundle")
            && composer.includes('parsedFallback?.nounClass || uiState.nounClass || ""')
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
            && composer.includes('label: animacyIsFixed ? "Animacidad fija" : "Animacidad"')
            && !composer.includes('label: "Sujeto"')
            && !composer.includes('label: "Poseedor"')
            && !composer.includes('label: "Referencia"')
            && !composer.includes('label: "Tipo"')
            && composer.includes('classTabs.setAttribute("aria-label", "Conector num1-num2 de la clausula nominal")')
            && composer.includes('classTabs.dataset.lockedByFixture = fixedClass ? "true" : "false"')
            && composer.includes('button.dataset.lockedByFixture = "true"')
            && composer.includes('button.disabled = true')
            && composer.includes('disabled: animacyIsFixed && fixtureAnimacy !== "inanimate"')
            && composer.includes('disabled: animacyIsFixed && fixtureAnimacy !== "animate"')
            && composer.includes('title: "clase t: (...V)t"')
            && composer.includes('title: "clase ti: (...C)ti"')
            && composer.includes('title: "clase in: (...C)in"')
            && composer.includes('title: "clase Ø: (...C/V)"')
            && rendering.includes("Selecciona un conector num1-num2 para saber su salida.")
            && rendering.includes("Selecciona una animacidad para saber su salida.")
            && rendering.includes("Selecciona una transitividad para saber su salida.")
            && html.includes('<option value="">Selecciona transitividad</option>')
            && css.includes(".verb-composer__ordinary-nnc-controls")
            && css.includes(".verb-composer__ordinary-nnc-class-tabs")
            && css.includes("#container-inputs #composer-slot-stage > .verb-composer__ordinary-nnc-controls")
    );
    s.ok(
        "ordinary NNC output uses a nominal-clause block with shared controls",
        rendering.includes("tense-block tense-block--noun-shared-controls tense-block--ordinary-nnc-controls")
            && rendering.includes("tense-block tense-block--ordinary-nnc")
            && rendering.includes('label.textContent = "Clausula nominal"')
            && !rendering.includes('label.textContent = "Sustantivo ordinario"')
            && !rendering.includes('visibleLabel: "Clase"')
            && !rendering.includes('ariaLabel: "Clase del conector de numero del sujeto"')
            && !rendering.includes('visibleLabel: "Animacidad"')
            && rendering.includes('visibleLabel: "Sujeto"')
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
            && rendering.includes('`clase ${rowNounClassLabel}`')
            && rendering.includes("result.nncBasic?.subject?.affixLabel")
            && rendering.includes("rowCategoryProfile")
            && rendering.includes("rowCategoryProfile?.predicateState?.label")
            && rendering.includes("rowCategoryProfile?.animacy?.label")
            && rendering.includes("rowCategoryProfile?.reference?.label")
            && rendering.includes("rowCategoryProfile?.possessiveState")
            && rendering.includes("Estado del predicado:")
            && rendering.includes("Animacidad:")
            && rendering.includes("Referencia:")
            && rendering.includes('Conector ${rowConnectorSlot.slot || "num1-num2"}:')
            && rendering.includes("Marcacion posesiva:")
            && rendering.includes("rowFormulaSlots")
            && rendering.includes("buildOrdinaryNncFormulaEchoFromSlots(rowFormulaSlots)")
            && rendering.includes("Formula NNC:")
            && rendering.includes("rowConnectorSlotLabel")
            && rendering.includes('"num1-num2"')
            && rendering.includes("rowPredicateFormula")
            && rendering.includes("result.nncBasic?.predicate?.formula || result.predicateFormula")
            && rendering.includes("getConjugationNoOutputDisplay")
            && rendering.includes("conjugation-value--no-output")
            && rendering.includes('`poseedor ${result.possessor?.prefix || state.possessor || "nu"}`')
            && rendering.includes("personLabel.textContent = `Sujeto ${result.nncBasic?.subject?.affixLabel || getOrdinaryNncSubjectMarkerLabel(rowSubject)}`")
    );
    s.ok(
        "shared sustantivo renderer labels subject number connectors",
        rendering.includes("buildNominalSubjectConnectorSubLabel")
            && rendering.includes('subjectNumberConnector')
            && rendering.includes('nominalClauseFrame?.subject?.numberConnector')
            && rendering.includes('return `conector ${connectorSurface || "Ø"}`;')
            && rendering.includes("appendNominalSubjectConnectorSubLabel(basePersonSub, subjectConnectorLabel)")
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
            && rendering.includes("resolveContinuationActionGroupMeta")
            && rendering.includes("appendContinuationAction")
            && rendering.includes("conjugation-continuation-group")
            && rendering.includes('eyebrow: "Sustantivo"')
            && rendering.includes('title: "Patientivo"')
            && rendering.includes('eyebrow: "Adjetivo"')
            && rendering.includes('title: "Compuesto"')
            && css.includes(".calc-guidance__chips")
            && css.includes("grid-template-columns: repeat(auto-fit, minmax(min(100%, 7.5rem), max-content));")
            && css.includes(".conjugation-conversion-actions")
            && css.includes("grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));")
            && css.includes(".conjugation-continuation-group__header")
            && css.includes(".conjugation-continuation-group__chips")
            && css.includes(".calc-guidance__chip--mode-adjetivo")
            && css.includes(".conjugation-conversion-actions .calc-guidance__chip")
            && css.includes("@container (max-width: 360px)")
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
            && rendering.includes("Ambito: estructural")
            && rendering.includes("Nominalizacion:")
            && rendering.includes("Rol nominal:")
            && rendering.includes("Fuente VNC:")
            && rendering.includes("Familia patientiva:")
            && rendering.includes("Fuente patientiva:")
            && rendering.includes("Familias Andrews:")
            && rendering.includes("Etapa salida:")
            && rendering.includes("Taxonomia patientiva: parcial")
            && rendering.includes("Funcion adjetival:")
            && rendering.includes("Modificacion: no modelada")
    );
    s.ok(
        "patientivo pre-locative continuation is driven from generated row output",
        rendering.includes("renderPatientivoPrelocativeContinuation")
            && rendering.includes("dataset.patientivoPrelocativeContinuation = \"true\"")
            && rendering.includes("continueLabel.textContent = `→ ${previewSurface || prelocativeVerbInput}`")
            && rendering.includes("const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation)")
            && rendering.includes("resolvePatientivoSourceSurfaceForContinuation")
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
            && rendering.includes("continueSubLabel.textContent = \"Adj NNC\"")
            && rendering.includes("const targetSurface = getPrimaryConjugationSurface(contract);")
            && rendering.includes("continueButton.dataset.targetSurface = targetSurface;")
            && rendering.includes("continueLabel.textContent = `→ ${targetSurface}`")
            && rendering.includes("`#3 salida patientiva: ${targetSurface}`,")
            && rendering.includes("Andrews 40.4: NNC patientiva en funcion adjetival")
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
        "Andrews 40.5-40.8 nominalized VNC adjectival function is exposed dynamically in #3 salida",
        rendering.includes("renderNominalizedVncAdjectivalFunctionContinuation")
            && rendering.includes("buildNominalizedVncAdjectivalNncFunctionOutput")
            && rendering.includes("dataset.nominalizedVncAdjectivalFunctionContinuation = \"true\"")
            && rendering.includes("dataset.nominalizedVncKind = contract.adjectivalNncFunctionFrame?.nominalizationKind || \"\"")
            && rendering.includes("continueLabel.textContent = `→ ${targetSurface}`")
            && rendering.includes("`#3 salida nominalizada: ${targetSurface}`,")
            && rendering.includes("NNC nominalizada en funcion adjetival")
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
            && composer.includes('source: "adjectival-nnc-function-entry"')
            && composer.includes("grammarFrame: frame || null")
            && composer.includes("getAdjectivalNncFunctionOverrideSurface(override)")
            && composer.includes("clearAdjectivalNncFunctionEntryState(verbInput)")
            && vncFacade.includes("parseAdjectivalNncFunctionEntryContract")
            && vncFacade.includes("adjectivalNnc.grammarFrame = entryGrammarFrame")
            && vncFacade.includes("adjectivalNnc.entryRouteContract = entryRouteContract")
            && vncFacade.includes("resolveAdjectivalNncFunctionOverrideFromInput")
            && vncFacade.includes('tense: "adjectival-nnc"')
            && vncFacade.includes("adjectivalNnc")
            && composer.includes("override.adjectivalNnc?.nominalizedSurface")
            && !composer.includes("encodeValue(override.adjectivalNnc?.surface)")
            && !rendering.includes("override?.adjectivalNnc?.surface")
    );
    s.ok(
        "applied adjectival NNC function entries render their explicit contract block instead of the default potential tab",
        rendering.includes("function renderAdjectivalNncFunctionConjugations")
            && rendering.includes("resolveAdjectivalNncFunctionOverrideFromInput(verbInput)")
            && rendering.includes('tenseBlock.dataset.tenseBlock = "adjetivo-nnc-funcion"')
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
        "reduplicated noun/adjective combination gates read LCM primary surfaces before legacy result text",
        rendering.includes("useReduplicatedSingularSurface && getPrimaryConjugationSurface(result)")
            && panels.includes("useReduplicatedSingularSurface && getPanelConjugationRenderableSurface(result)")
            && !rendering.includes("useReduplicatedSingularSurface && result?.result")
            && !panels.includes("useReduplicatedSingularSurface && result?.result")
    );
    s.ok(
        "patientivo salida hides separate output guidance because continuations live in generated rows",
        rendering.includes("const isPatientivoSalidaMode = activeTenseMode === TENSE_MODE.sustantivo")
            && rendering.includes('selectionState.tenseValue === "patientivo"')
            && rendering.includes('renderOutputGuidancePanel({ verb: isPatientivoSalidaMode ? "" : renderVerb });')
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
            && rendering.includes("denominalAndrewsContractRouteContinuation")
            && rendering.includes("activateNawatDenominalAndrewsContractRouteTarget")
            && rendering.includes("finiteGenerationRequiresObjectPrefix")
            && rendering.includes("objectPrefixRequired")
            && rendering.includes("sourceEvidenceRequired")
            && rendering.includes("sourceEvidenceSatisfied")
            && rendering.includes("tiSourceRequired")
            && rendering.includes("huiSourceRequired")
            && rendering.includes("yaSourceRequired")
            && rendering.includes("tlaIntransitiveSourceRequired")
            && rendering.includes("intransitiveOaSourceRequired")
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
            && rendering.includes("Fuente Andrews: compuesto temporal confirmado")
            && rendering.includes("andrewsRouteWarning")
            && rendering.includes("andrewsRouteNote")
            && rendering.includes("Fuente Andrews: tla intransitiva generada")
            && rendering.includes("Fuente Andrews: o-a intransitiva generada")
            && rendering.includes("Fuente Andrews: tronco adverbial confirmado")
            && rendering.includes("Fuente Andrews: relacional confirmado")
            && css.includes(".calc-guidance__chip--denominal-andrews")
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
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-pattern")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-minority")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-needs-confirmation")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-source-final-class-contract")
            && css.includes(".calc-guidance__chip--denominal-andrews.is-traditional-spelling-ambiguous")
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
            && rendering.includes("Adverbial nuclear:")
            && rendering.includes("Alcance: adverbio heredado")
    );
    s.ok(
        "shared sustantivo renderer exposes relational NNC boundary metadata without generation",
        rendering.includes("buildRelationalNncBoundaryFrameSubLabels")
            && rendering.includes("appendRelationalNncBoundaryFrameSubLabels")
            && rendering.includes("evaluation.result?.relationalNncBoundaryFrame")
            && rendering.includes("Relacional NNC:")
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
            && rendering.includes("Adjuncion:")
            && rendering.includes("Evidencia adjuncion: no confirmada")
    );
    const expectedVerbDerivedNominalizationLabels = [
        "Ambito: estructural",
        "Nominalizacion: adjetivo",
        "Rol nominal: propiedad",
        "Fuente VNC: ipan muchiwki",
        "Funcion adjetival: predicado",
        "Modificacion: no modelada",
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
        "Ambito: estructural",
        "Nominalizacion: patientivo",
        "Rol nominal: paciente/resultado",
        "Familia patientiva: perfectivo",
        "Fuente patientiva: tronco perfectivo activo",
        "Familias Andrews: perfectivo activo",
        "Etapa salida: #3 salida",
        "Taxonomia patientiva: parcial",
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
                "Ambito: estructural",
                "Nominalizacion: paciente potencial",
                "Rol nominal: paciente potencial",
                "Fuente VNC: ipan muchiwas",
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
                "Familia denominal: VT -na",
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
                    targetUnmodeledContractCount: 1,
                    nawatOnlyRouteFamilies: ["vt-na"],
                },
                isCompleteLesson54_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: VI -iwi",
                "Verbalizador denominal: -iwi",
                "Contratos Andrews pendientes: 24",
                "Rutas Nawat sin contrato Andrews: vt-na",
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
                "Familia denominal: VI -ti",
                "Verbalizador denominal: -ti",
                "Objetivos Andrews NNC/VNC: 31",
                "Solicitudes VNC Andrews: 13 con tiempo explícito",
                "Solicitudes VNC Andrews con objeto: 3",
                "Clases VNC Andrews: 11",
                "Fuentes Andrews pendientes: 18",
                "Avisos Andrews VNC: 1",
                "Notas Andrews VNC: 20",
                "Entradas VNC Andrews: (pusukwi), (pusuk)-(ta), (pusuk)-(ia)",
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
                "Familia denominal: VI -iwi",
                "Verbalizador denominal: -iwi",
                "Fuente Andrews: i-hui/a-hui generada",
                "Base Andrews: pusuk",
                "Evidencia: etapa generada",
                "Objetivos Andrews NNC/VNC: 31",
                "Solicitudes VNC Andrews: 14 con tiempo explícito",
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
                "Fuente Andrews: NNC posesivo generado",
                "Base Andrews: nukal",
                "Poseedor fuente: nu",
                "Evidencia: salida NNC",
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
                "Fuente Andrews: tronco NNC generado",
                "Base Andrews: shuchi",
                "Fuente Nawat: shuchit",
                "Evidencia: salida NNC",
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
        "shared renderer reads linked grammar stage labels from LCM result frames before legacy stage fields",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "legacy-stage-surface",
                inputValue: "legacy-input",
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "legacy-source",
                    displaySurface: "legacy-display",
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
        "shared renderer suppresses linked grammar legacy labels for an empty LCM result frame",
        typeof ctx.buildNawatLinkedGrammarStageSubLabels === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? ctx.buildNawatLinkedGrammarStageSubLabels({
                surface: "legacy-stage-surface",
                inputValue: "legacy-input",
                renderVerb: "legacy-render",
                nextSource: {
                    canBecomeSource: true,
                    sourceVerb: "legacy-source",
                    displaySurface: "legacy-display",
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
                "Siguiente salida: vi-ti · fuente → (pusukti)",
                "Siguiente salida: vt-na · destino → (pusuktina)",
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
                "Trayecto: vi-ti · verbalizador → vi-iwi · verbalizador",
                "Fuente actual: (pusuktiiwi)",
                "Opciones siguientes: 32",
                "Siguiente salida: vt-na · destino → (pusuktiiwin)",
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
                    linkedAppendableChoiceLabel: "Siguiente salida: vt-na · destino → (pusuktina)",
                    sublabel: "Siguiente fuente: (pusukti) · Continuaciones: 8 · Siguiente salida: vt-na · destino → (pusuktina)",
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
                displayLabel: "Clausula VNC",
                formula: "#subject-object(PREDICATE)-tense#",
                formulaEcho: "#ni-ki(nemi)-presente#",
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Clausula VNC: #subject-object(PREDICATE)-tense#", "Formula VNC: #ni-ki(nemi)-presente#"]
            : ["rendering-runtime-not-loaded"]
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
            ? ["Clase de tronco: C", "Diagnostico de tronco: open syllable non-u ia/ua adds class C"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer formats diagnostic VNC valency frame labels",
        typeof ctx.buildVncValencyFrameSubLabels === "function"
            ? ctx.buildVncValencyFrameSubLabels({
                kind: "vnc-valency-frame",
                valencyLabel: "transitiva",
                object: { displayPrefix: "ki" },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Valencia VNC: transitiva", "Objeto VNC: ki"]
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
                    baseObjectPrefix: "ki",
                    selectedObjectPrefix: "",
                },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? ["Voz derivada: pasivo/impersonal", "Valencia derivada: 2->1", "Objeto base: ki->Ø"]
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
            ? ["Derivacion VNC: causativa", "Valencia derivada: 1->2", "Tronco derivado: nemtia"]
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
            ? ["Compuesto VNC: kwi", "Incrustado: outer-lexical shuchi"]
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
                boundaries: { legacyAdverbioSurfaceOnly: true },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Adverbial nuclear: manera",
                "Fuente VNC: mati",
                "Valencia fuente: transitiva",
                "Grado: primer grado",
                "Dominio: manera",
                "Alcance: adverbio heredado",
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
                "Relacional NNC: no confirmado",
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
                "Adjuncion: no confirmada",
                "Unidad adjunta: locativo-temporal generado",
                "Evidencia adjuncion: no confirmada",
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
                "Estado LCM: bloqueado",
                "Ruta LCM: comparison / classify-boundary",
                "Generacion LCM: no autorizada",
	                "Andrews: Andrews Lesson 53",
	                "Evidencia: diagnostic-only",
	                "Realizacion Nawat: pendiente",
	                "Falla LCM: authority / authorityFrame",
	                "Diagnostico LCM: comparison-needs-nawat-clause-evidence",
	            ]
            : ["rendering-runtime-not-loaded"]
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
            ? ["Realizacion Nawat: frame-render-a"]
            : ["rendering-runtime-not-loaded"]
    );
    s.eq(
        "shared renderer reads LCM result-frame surface forms before legacy result text",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "legacy-form",
                surface: "legacy-surface",
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
        "shared renderer does not let top-level surface hide surface-form variants",
        typeof ctx.getConjugationSurfaceForms === "function"
            ? ctx.getConjugationSurfaceForms({
                result: "legacy-form",
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
                result: "legacy-form",
                surface: "legacy-surface",
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
        "rendering display paths consume LCM display surfaces instead of legacy result text",
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
            && exportUi.includes('"ruta LCM"')
            && exportUi.includes("row.grammarRouteFamily")
            && exportUi.includes("row.grammarDiagnosticLayer")
            && rendering.includes("applyGrammarFrameRouteDataset(row, evaluation.result)")
            && rendering.includes("getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset)")
            && rendering.includes("grammarMetadata = {}")
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
                        hasRouteHeader: csv.includes("ruta LCM"),
                        hasDiagnosticHeader: csv.includes("capa fallida"),
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
                hasDiagnosticHeader: false,
                hasRouteValue: false,
                hasDiagnosticValue: false,
            },
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? {
                hasRouteHeader: true,
                hasDiagnosticHeader: true,
                hasRouteValue: true,
                hasDiagnosticValue: true,
            }
            : {
                hasRouteHeader: false,
                hasDiagnosticHeader: false,
                hasRouteValue: false,
                hasDiagnosticValue: false,
            }
    );
    s.ok(
        "panel visibility reader checks LCM framed surfaces before legacy result text",
        panels.includes("function getPanelConjugationRenderableSurface")
            && panels.includes('if (!getPanelConjugationRenderableSurface(result))')
            && !panels.includes('if (!result || !result.result || result.result === "—")')
    );
    s.eq(
        "panel visibility accepts LCM result-frame surface when legacy result is empty",
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
        "panel visibility accepts LCM result-frame surface forms when legacy result is empty",
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
                "Capa oracional: diagnostica",
                "Negacion: negative",
                "Pregunta: yes-no",
                "Enfasis: focus",
                "Modo oracional: command",
            ]
            : ["rendering-runtime-not-loaded"]
    );
    s.ok(
        "curriculum map visually separates lesson index from engine categories",
        css.includes(".book-map__architecture-note")
            && css.includes(".book-map__missing-category")
    );

    return s;
}

module.exports = { run };
