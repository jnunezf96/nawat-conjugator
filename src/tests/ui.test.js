"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run() {
    const s = createSuite("ui");
    const html = fs.readFileSync(path.resolve(__dirname, "..", "..", "index.html"), "utf8");
    const css = fs.readFileSync(path.resolve(__dirname, "..", "..", "style.css"), "utf8");
    const rendering = fs.readFileSync(path.resolve(__dirname, "..", "ui", "rendering", "rendering.js"), "utf8");
    const composer = fs.readFileSync(path.resolve(__dirname, "..", "ui", "composer", "composer.js"), "utf8");
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
        "ordinary NNC entrada uses analogue input and digital composer controls",
        composer.includes("parseComposerOrdinaryNncAnalogueInput")
            && composer.includes("formatComposerOrdinaryNncAnalogueInput")
            && composer.includes("buildComposerOrdinaryNncInputBundle")
            && composer.includes('parsedFallback?.nounClass || uiState.nounClass || "zero"')
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

    return s;
}

module.exports = { run };
