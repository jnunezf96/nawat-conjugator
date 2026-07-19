"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function createProjectionControl() {
    const classList = {
        add() {},
        remove() {},
        toggle() {},
        contains() { return false; },
    };
    const label = { textContent: "" };
    const field = {
        querySelector() { return label; },
    };
    return {
        value: "",
        checked: false,
        hidden: false,
        disabled: false,
        readOnly: false,
        dataset: {},
        classList,
        label,
        setAttribute(name, value) {
            this[name] = String(value);
        },
        removeAttribute(name) {
            delete this[name];
        },
        addEventListener() {},
        closest() {
            return field;
        },
        querySelector() {
            return null;
        },
    };
}

function installProjectionDomFixture(ctx) {
    const restoreState = {
        getElementById: ctx.document.getElementById,
        querySelector: ctx.document.querySelector,
        querySelectorAll: ctx.document.querySelectorAll,
        getVerbComposerElements: ctx.getVerbComposerElements,
        getComposerActiveSlotFromState: ctx.getComposerActiveSlotFromState,
        getComposerStemInputTemplateSuffix: ctx.getComposerStemInputTemplateSuffix,
        formatComposerStemForInputDisplay: ctx.formatComposerStemForInputDisplay,
    };
    const controls = {
        panel: createProjectionControl(),
        stagePanel: createProjectionControl(),
        transitivitySelect: createProjectionControl(),
        valenceA: createProjectionControl(),
        valenceB: createProjectionControl(),
        valenceC: createProjectionControl(),
        embedC: createProjectionControl(),
        stemC: createProjectionControl(),
        objectC: createProjectionControl(),
        directional: createProjectionControl(),
        supportive: createProjectionControl(),
    };
    controls.panel.classList.contains = (className) => className === "verb-composer--inline-formula";
    controls.transitivitySelect.value = ctx.COMPOSER_TRANSITIVITY.bitransitive;
    const byId = {
        "verb-composer": controls.panel,
        "composer-slot-stage": controls.stagePanel,
        "composer-transitivity": controls.transitivitySelect,
        "composer-valence-a": controls.valenceA,
        "composer-valence": controls.valenceB,
        "composer-valence-2": controls.valenceC,
        "composer-valence-embed-2": controls.embedC,
        "composer-stem-c": controls.stemC,
        "composer-valence-left-2": controls.objectC,
        "composer-directional": controls.directional,
        "composer-supportive-i": controls.supportive,
    };
    ctx.document.getElementById = (id) => byId[id] || createProjectionControl();
    ctx.document.querySelector = () => null;
    ctx.document.querySelectorAll = () => [];
    ctx.getVerbComposerElements = () => ({
        panel: controls.panel,
        slots: {
            c: {
                embedInput: controls.embedC,
                stemInput: controls.stemC,
                objectInput: controls.objectC,
            },
        },
        transitivitySelect: controls.transitivitySelect,
        valenceSelectIntransitive: controls.valenceA,
        valenceSelect: controls.valenceB,
        valenceSelectSecondary: controls.valenceC,
        directionalSelect: controls.directional,
        supportiveICheckbox: controls.supportive,
    });
    ctx.getComposerActiveSlotFromState = () => "c";
    ctx.getComposerStemInputTemplateSuffix = () => "";
    ctx.formatComposerStemForInputDisplay = (value) => value;
    controls.restore = () => {
        ctx.document.getElementById = restoreState.getElementById;
        ctx.document.querySelector = restoreState.querySelector;
        ctx.document.querySelectorAll = restoreState.querySelectorAll;
        ctx.getVerbComposerElements = restoreState.getVerbComposerElements;
        ctx.getComposerActiveSlotFromState = restoreState.getComposerActiveSlotFromState;
        ctx.getComposerStemInputTemplateSuffix = restoreState.getComposerStemInputTemplateSuffix;
        ctx.formatComposerStemForInputDisplay = restoreState.formatComposerStemForInputDisplay;
    };
    return controls;
}

function run(ctx = {}) {
    const s = createSuite("inline composer projection");
    const eventsPath = path.resolve(__dirname, "..", "ui", "events", "events.mjs");
    const events = fs.readFileSync(eventsPath, "utf8").replace(/\btargetObject\./gu, "");

    s.ok(
        "inline formula layout patch is disabled before composer event binding",
        events.includes("function disableInlineComposerFormulaPatch()")
            && events.includes("initInlineComposerFormulaPatch();")
            && events.indexOf("initInlineComposerFormulaPatch();") < events.indexOf("initVerbComposer();")
            && events.includes('composer.dataset.inlineFormulaPatch = "disabled"')
            && events.includes('composer.classList.remove("verb-composer--inline-formula")')
            && events.includes('transitivitySelect.classList.add("is-hidden-control")')
    );
    s.ok(
        "inline formula projection has a recursion guard",
        events.includes("let IsRefreshingInlineComposerFormulaControls = false;")
            && events.includes("if (IsRefreshingInlineComposerFormulaControls) {")
    );
    s.ok(
        "inline formula view model derives from canonical VerbComposerState keys",
        events.includes("function getInlineComposerFormulaViewModel()")
            && events.includes("const stateKeys = getComposerSlotStateKeys(activeSlot);")
            && events.includes("embed: VerbComposerState[stateKeys.embed] || \"\"")
            && events.includes("stem: VerbComposerState[stateKeys.stem] || \"\"")
            && events.includes("objectEmbed: VerbComposerState[stateKeys.objectEmbed] || \"\"")
    );
    s.ok(
        "programmatic state changes project through the render boundary",
        events.includes("renderVerbComposerFromState = function renderVerbComposerFromStateInlineFormulaWrapper")
            && events.includes("refreshInlineComposerControlsFromState();")
    );
    s.ok(
        "transitivity-aware valence writeback clears inactive state keys",
        events.includes("function syncInlineComposerFormulaValenceStateFromControl")
            && events.includes("VerbComposerState.valenceSecondary = value;")
            && events.includes("VerbComposerState.valence = \"\";")
            && events.includes("VerbComposerState.valenceIntransitive = \"\";")
    );
    s.ok(
        "chip pruning is targeted and does not delete ordinary NNC chip generators",
        events.includes('"#composer-directional-chips"')
            && events.includes('"#composer-valence-a-chips"')
            && events.includes('"#composer-valence-chips"')
            && events.includes('"#composer-valence-2-chips"')
            && events.includes('"[data-composer-serial-type-chips]"')
            && !events.includes('document.querySelectorAll(".verb-composer__chips")')
    );
    s.ok(
        "inline formula placeholder insertion tolerates light DOM test fixtures",
        events.includes('typeof transitivitySelect.insertBefore === "function"')
            && events.includes('typeof transitivitySelect.appendChild === "function"')
    );

    if (typeof ctx.refreshInlineComposerControlsFromState === "function") {
        const controls = installProjectionDomFixture(ctx);
        try {
            ctx.VerbComposerState.transitivity = ctx.COMPOSER_TRANSITIVITY.bitransitive;
            ctx.VerbComposerState.valenceSecondary = "te+ta";
            ctx.VerbComposerState.valence = "ta";
            ctx.VerbComposerState.valenceIntransitive = "ta";
            ctx.VerbComposerState.slotCEmbed = "takwal";
            ctx.VerbComposerState.slotCStem = "maka";
            ctx.VerbComposerState.valenceEmbedSecondary = "nexti";
            ctx.VerbComposerState.directionalPrefix = "wal";
            ctx.VerbComposerState.supportiveMarker = "";
            ctx.refreshInlineComposerControlsFromState();
            s.eq("programmatic bitransitive state projects transitivity", controls.transitivitySelect.value, ctx.COMPOSER_TRANSITIVITY.bitransitive);
            s.eq("programmatic bitransitive state projects valence", controls.valenceC.value, "te+ta");
            s.eq("programmatic bitransitive state projects incorporated element", controls.embedC.value, "takwal");
            s.eq("programmatic bitransitive state projects matrix stem", controls.stemC.value, "maka");
            s.eq("programmatic bitransitive state projects object embed", controls.objectC.value, "nexti");
            s.eq("programmatic bitransitive state projects directional", controls.directional.value, "wal");
        } finally {
            controls.restore();
        }
    } else {
        s.ok(
            "module runtime keeps static projection fixture coverage",
            events.includes("function refreshInlineComposerControlsFromState()")
                && events.includes("function collectInlineComposerFormulaStateFromControls")
        );
    }

    return s;
}

module.exports = { run };
