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
    const state = fs.readFileSync(path.resolve(__dirname, "..", "ui", "state.js"), "utf8");
    const concepts = fs.readFileSync(path.resolve(__dirname, "..", "core", "concepts", "concepts.js"), "utf8");
    const nncCompound = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "compound", "compound.js"), "utf8");
    const nncAdjectival = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "adjectival", "adjectival.js"), "utf8");
    const nncNominalization = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "nominalization", "nominalization.js"), "utf8");
    const nncNumerals = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "numerals", "numerals.js"), "utf8");
    const nncRelational = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "relational", "relational.js"), "utf8");
    const nncPlaceGentilic = fs.readFileSync(path.resolve(__dirname, "..", "core", "nnc", "place_gentilic", "place_gentilic.js"), "utf8");
    const particles = fs.readFileSync(path.resolve(__dirname, "..", "core", "particles", "particles.js"), "utf8");
    const sentence = fs.readFileSync(path.resolve(__dirname, "..", "core", "sentence", "sentence.js"), "utf8");
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
            && rendering.includes('value.textContent = result.diagnostics?.[0]?.message || "—"')
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
            && rendering.includes("buildPatientivoPrelocativeContinuationContract")
            && rendering.includes("getPatientivoPrelocativeMatrixInventory")
            && rendering.includes("conjugation-conversion-actions")
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
    s.ok(
        "patientivo salida hides the route rail because continuations live in generated rows",
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
    s.ok(
        "shared sustantivo renderer exposes denominal route-family metadata without generation",
        rendering.includes("buildDenominalFamilyProfileSubLabels")
            && rendering.includes('profile.outputKind !== "denominal-route"')
            && rendering.includes("appendDenominalFamilyProfileSubLabels")
            && rendering.includes("evaluation.result?.denominalFamilyProfile")
            && rendering.includes("Familia denominal:")
            && rendering.includes("Verbalizador denominal:")
            && rendering.includes("Cobertura denominal: parcial")
    );
    const guidancePanelStart = rendering.indexOf("function renderOutputGuidancePanel({ verb = \"\" } = {}) {");
    const guidancePanelEnd = rendering.indexOf("function resolveRenderableVerbValue", guidancePanelStart);
    const guidancePanelBody = guidancePanelStart >= 0 && guidancePanelEnd > guidancePanelStart
        ? rendering.slice(guidancePanelStart, guidancePanelEnd)
        : "";
    s.ok(
        "output route rail is dormant because continuations belong in #3 salida rows",
        guidancePanelBody.includes("hidePanel();")
            && guidancePanelBody.includes("hidePanel();\n    return;")
            && rendering.includes('renderOutputGuidancePanel({ verb: "" });')
            && rendering.includes('message: "Selecciona una transitividad para saber su salida."')
    );
    s.ok(
        "Nawat linked stages stay as row-action plumbing, not a separate route rail",
        rendering.includes("buildNawatLinkedGrammarStageSubLabels")
            && rendering.includes("getNawatLinkedGrammarCompactRouteLabel")
            && rendering.includes("formatNawatLinkedGrammarCompactChoiceLabel")
            && rendering.includes("buildNawatLinkedGrammarSelectionSummarySubLabels")
            && rendering.includes("attachNawatLinkedGrammarStagesToRailStations")
            && rendering.includes("buildNawatLinkedGrammarPathStages(activeRoute")
            && rendering.includes("linkedNextSource")
            && rendering.includes("Siguiente fuente:")
            && rendering.includes("Salida de etapa:")
            && rendering.includes("Continuaciones:")
            && rendering.includes("Opciones siguientes:")
            && rendering.includes("Siguiente salida:")
            && html.indexOf('class="output-meta-strip"') >= 0
            && html.indexOf('id="conversion-rail-block"') > html.indexOf('class="output-meta-strip"')
            && html.includes('aria-label="Trayecto de salida"')
            && rendering.includes("previewNawatLinkedGrammarPathNextSource")
            && rendering.includes("buildSelectionSummary")
            && rendering.includes("linkedAppendableChoiceLabel")
            && rendering.includes("linkedAppendableSelectionCount")
            && rendering.includes("linkedAppendableActivation")
            && rendering.includes("linkedAppendableAction")
            && rendering.includes("appendActiveNawatLinkedGrammarPathSelection")
            && rendering.includes("choice.dataset.linkedPathAppended")
            && rendering.includes("calc-guidance__linked-path-summary")
            && rendering.includes("calc-guidance__linked-path-group--status")
            && rendering.includes("calc-guidance__linked-path-group--choices")
            && rendering.includes("calc-guidance__linked-path-group--actions")
            && rendering.includes("buildNawatLinkedGrammarSelectedPathSubLabels")
            && rendering.includes("buildNawatLinkedGrammarPathExecutionSubLabels")
            && rendering.includes("buildNawatLinkedGrammarPromotedSourceSubLabels")
            && rendering.includes("getNawatLinkedGrammarAppendableSelections")
            && rendering.includes("getFirstNawatLinkedGrammarAppendableSelection")
            && rendering.includes("getNawatLinkedGrammarPathExecutionSourceOptions")
            && rendering.includes("executeActiveNawatLinkedGrammarPathSelections")
            && rendering.includes("promoteActiveNawatLinkedGrammarPathExecutionStepSource")
            && rendering.includes("promoteActiveNawatLinkedGrammarPathExecutionFinalSource")
            && rendering.includes("removeLastActiveNawatLinkedGrammarPathSelection")
            && rendering.includes("clearActiveNawatLinkedGrammarPathSelections")
            && rendering.includes("generar trayecto")
            && rendering.includes("usar salida")
            && rendering.includes("usar etapa")
            && rendering.includes("atrás")
            && rendering.includes("borrar")
            && rendering.includes("syncInput: true")
            && rendering.includes("linkedPathAppendSummary")
            && rendering.includes("linkedPathChoiceIndex")
            && rendering.includes("linkedPathPromoteStep")
            && rendering.includes("linkedPathBack")
            && rendering.includes("linkedPathClear")
            && rendering.includes("renderPatientivoCompoundEmbedContinuation({")
            && rendering.includes("renderPatientivoNominalCompoundContinuation({")
            && rendering.includes("renderPatientivoCharacteristicPropertyEmbedContinuation({")
            && css.includes(".calc-guidance__linked-path-group")
            && css.includes(".calc-guidance__linked-path-group--choices")
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
        "shared renderer formats denominal route-family labels as display-only metadata",
        typeof ctx.buildDenominalFamilyProfileSubLabels === "function"
            ? ctx.buildDenominalFamilyProfileSubLabels({
                outputKind: "denominal-route",
                routeFamily: "vt-na",
                verbalizer: "-na",
                isCompleteLesson54_55: false,
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Familia denominal: VT -na",
                "Verbalizador denominal: -na",
                "Cobertura denominal: parcial",
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
                        generated: { primarySurface: "nipusukti" },
                    },
                    {
                        status: "executed",
                        generated: { primarySurface: "nipusuktiiwi" },
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
        "linked rail append action stores selected next route without activating the current station",
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
    const linkedRailActionCalls = [];
    const linkedRailActionStations = typeof ctx.attachNawatLinkedGrammarStagesToRailStations === "function"
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
                    linkedRailActionCalls.push(args);
                    return { ok: true };
                },
            }
        )
        : [];
    if (linkedRailActionStations[0]?.action) {
        linkedRailActionStations[0].action("anchor-node");
    }
    s.eq(
        "linked rail stage action preserves original route source while exposing next source",
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? linkedRailActionCalls.map(([routeKey, stationKey, options]) => ({
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
                boundaries: { legacyAdverbioSurfaceOnly: true },
            })
            : ["rendering-runtime-not-loaded"],
        ctx.__TEST_RUNTIME_MODE__ === "module"
            ? [
                "Adverbial nuclear: manera",
                "Fuente VNC: mati",
                "Valencia fuente: transitiva",
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
