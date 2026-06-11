// === Event Wiring ===
// Keyboard navigation (kept minimal now that radios are removed)
document.addEventListener("keydown", (event) => {
    const verbEl = document.getElementById("verb");
    const activeElement = document.activeElement;
    if (handleVerbTextboxTabShortcut(event)) {
        return;
    }
    if (!event.altKey && !event.ctrlKey && !event.metaKey && event.key === "Escape") {
        LastComposerSpaceTs = 0;
        if (closeEscapeManagedOverlay(event)) {
            LastComposerEscapeTs = 0;
            event.preventDefault();
            return;
        }
    }
    const isDeleteLikeKey = event.key === "Backspace" || event.key === "Delete";
    if (
        isDeleteLikeKey
        && !event.ctrlKey
        && !event.metaKey
        && !shouldLetNativeDeleteBehavior(activeElement)
    ) {
        LastComposerEscapeTs = 0;
        LastComposerSpaceTs = 0;
        if (event.altKey) {
            runScreenCalculatorAC();
            event.preventDefault();
            return;
        }
        if (event.shiftKey) {
            runScreenCalculatorCE();
            event.preventDefault();
            return;
        }
        runScreenCalculatorDEL();
        event.preventDefault();
        return;
    }
    if (event.altKey && !event.ctrlKey && !event.metaKey) {
        const altNavKey = event.key;
        const isBackward = altNavKey === "ArrowLeft";
        const isForward = altNavKey === "ArrowRight";
        if (isBackward || isForward) {
            LastComposerEscapeTs = 0;
            LastComposerSpaceTs = 0;
            if (runScreenCalculatorCycleTransitivity(isBackward ? -1 : 1)) {
                event.preventDefault();
                return;
            }
        }
        const setCombinedModeShortcut = (mode) => {
            if (!Object.values(COMBINED_MODE).includes(mode)) {
                return false;
            }
            if (getCombinedMode() === mode) {
                return true;
            }
            setCombinedMode(mode);
            updateCombinedModeTabs();
            renderTenseTabs();
            const verbMeta = getVerbInputMeta();
            renderActiveConjugations({
                verb: verbMeta.displayVerb,
                objectPrefix: getCurrentObjectPrefix(),
            });
            return true;
        };
        const clickTarget = (selector) => {
            const button = document.querySelector(selector);
            if (!button || typeof button.click !== "function") {
                return false;
            }
            if (button.disabled) {
                return false;
            }
            if (button.hasAttribute("hidden") || button.closest("[hidden]")) {
                return false;
            }
            if (typeof window !== "undefined" && typeof window.getComputedStyle === "function") {
                const style = window.getComputedStyle(button);
                if (style.display === "none" || style.visibility === "hidden") {
                    return false;
                }
            }
            button.click();
            return true;
        };
        const isVerbMode = getActiveTenseMode() === TENSE_MODE.verbo;
        const isComposerMode = isVerbInputModeComposer();
        const handled = ALT_SHORTCUT_DEFINITIONS.some((definition) => {
            if (!matchesAltShortcutKey(event, definition.key)) {
                return false;
            }
            if (definition.requireVerbMode && !isVerbMode) {
                return false;
            }
            if (definition.requireComposerMode && !isComposerMode) {
                return false;
            }
            if (definition.action === "set-combined-mode-active") {
                return setCombinedModeShortcut(COMBINED_MODE.active);
            }
            if (definition.action === "set-combined-mode-nonactive") {
                return setCombinedModeShortcut(COMBINED_MODE.nonactive);
            }
            if (definition.selector) {
                return clickTarget(definition.selector);
            }
            return false;
        });
        if (handled) {
            event.preventDefault();
            return;
        }
    }
    if (!event.altKey && !event.ctrlKey && !event.metaKey && event.key === " ") {
        if (shouldLetNativeSpaceBehavior(activeElement)) {
            LastComposerEscapeTs = 0;
            LastComposerSpaceTs = 0;
            return;
        }
        LastComposerEscapeTs = 0;
        LastComposerSpaceTs = 0;
        const preferredTarget = verbEl;
        if (preferredTarget === verbEl && focusVisibleVerbSurfaceAtEnd()) {
            event.preventDefault();
            return;
        }
        if (focusTextInputAtEnd(verbEl)) {
            event.preventDefault();
            return;
        }
    } else if (event.key === "Escape") {
        LastComposerSpaceTs = 0;
        const handledComposerClear = handleComposerDoubleEscapeShortcut(event);
        if (verbEl) {
            verbEl.blur();
        }
        event.preventDefault();
        if (handledComposerClear) {
            return;
        }
    } else if (event.key === "Enter") {
        if (shouldLetNativeEnterSelectControl(activeElement)) {
            LastComposerEscapeTs = 0;
            LastComposerSpaceTs = 0;
            return;
        }
        LastComposerEscapeTs = 0;
        LastComposerSpaceTs = 0;
        cancelDeferredToggleAvailabilityPass();
        cancelScheduledVerbInputRefresh();
        generateWord();
        event.preventDefault();
    } else {
        LastComposerEscapeTs = 0;
        LastComposerSpaceTs = 0;
    }
});

function applyVerbEntryInputNow() {
    const verbEl = document.getElementById("verb");
    if (!verbEl) {
        return;
    }
    verbEl.dispatchEvent(new Event("input", { bubbles: true }));
    scheduleVerbInputRefresh(verbEl.value, {
        immediate: true,
        source: "manual-entry",
    });
    focusVisibleVerbSurfaceAtEnd();
}

async function loadStaticBootstrapData() {
    const runtimeConfig = (
        typeof globalThis !== "undefined"
        && globalThis.__NAWAT_RUNTIME_CONFIG__
        && typeof globalThis.__NAWAT_RUNTIME_CONFIG__ === "object"
    ) ? globalThis.__NAWAT_RUNTIME_CONFIG__ : null;
    const loaderGroups = runtimeConfig?.bootstrapLoaderGroups || {
        essential: [
            "loadStaticConstants",
            "loadStaticDirectionalRules",
            "loadStaticLabels",
        ],
        deferred: [
            "loadStaticOptions",
            "loadStaticGroups",
            "loadStaticOrders",
            "loadStaticRules",
            "loadStaticDerivationalRules",
            "loadStaticValenceNeutral",
            "loadStaticPhonology",
            "loadStaticAllomorphyRules",
            "loadStaticModes",
            "loadStaticNnc",
            "loadStaticMisc",
            "loadStaticSuppletives",
            "loadStaticRedup",
            "loadStaticSuppletivePaths",
        ],
    };
    const runLoaderGroup = async (loaderNames = []) => Promise.all(loaderNames.map(async (loaderName) => {
        const loader = typeof globalThis !== "undefined" ? globalThis[loaderName] : null;
        if (typeof loader !== "function") {
            throw new Error(`Missing static bootstrap loader: ${loaderName}`);
        }
        return loader();
    }));
    await runLoaderGroup(loaderGroups.essential);
    await runLoaderGroup(loaderGroups.deferred);
}

let uiRuntimeInitializationPromise = null;

async function initializeUiRuntime() {
    if (uiRuntimeInitializationPromise) {
        return uiRuntimeInitializationPromise;
    }
    uiRuntimeInitializationPromise = (async () => {
        await loadStaticBootstrapData();
        await installDeveloperHooksIfEnabled();
        setBrowserClasses();
        initZoomFontLock();
        initUiScaleControl();
        initUiDensityControl();
        initLanguageSwitch();
        if (typeof initCurriculumMap === "function") {
            initCurriculumMap();
        }
        initTutorialPanel();
        initKeyboardLegendPopover();
        initLeftPanelStackTabs();
        initPanelEdgeNavigation();
        initTenseModeTabs();
        initCombinedModeTabs();
        initVerbSourceScopeControl();
        initDerivationTypeControl();
        initToggleLockControl();
        initViewExport();
        initCausativeReport();
        initInlineComposerFormulaPatch();
        initVerbComposer();
        initVerbScreenCalculator();
        initCalcInputModeButtons();
        enforceNoAutofillOnTextboxes(document);
        const verbEl = document.getElementById("verb");
        const verbMirrorContent = getVerbMirrorContent();
        if (verbEl) {
            const initialDisplayValue = serializeRegexInputValue(verbEl.value || "");
            if (initialDisplayValue && initialDisplayValue !== verbEl.value) {
                verbEl.value = initialDisplayValue;
            }
            verbEl.dataset.prevValue = verbEl.value || "";
            const initialParts = getSearchParts(verbEl.value);
            const initialBase = initialParts.trimmedBase;
            const initialValue = initialBase || verbEl.value;
            verbEl.dataset.lastClassVerb = parseVerbInput(initialValue).verb;
            if (initialBase) {
                rememberNonSearchValue(initialParts);
            } else if (!initialParts.hasQuery) {
                VerbInputState.lastNonSearchValue = verbEl.value;
            }
            verbEl.addEventListener("beforeinput", handleVerbBeforeInput);
            verbEl.addEventListener("input", () => {
                if (verbEl.value.includes("/-") || verbEl.value.includes("-/")) {
                    verbEl.value = verbEl.dataset.prevValue || "";
                } else {
                    verbEl.dataset.prevValue = verbEl.value;
                }
                if (!VerbComposerState.isApplying) {
                    const normalizedValue = serializeRegexInputValue(verbEl.value);
                    if (normalizedValue !== verbEl.value) {
                        verbEl.value = normalizedValue;
                        verbEl.dataset.prevValue = normalizedValue;
                    }
                }
                renderVerbMirror();
                const searchParts = getSearchParts(verbEl.value);
                rememberNonSearchValue(searchParts);
                const parsedVerb = parseVerbInput(getSearchInputBase(verbEl.value));
                if (verbEl.dataset.lastClassVerb !== parsedVerb.verb) {
                    mutateConjugationSelectionState({ classFilter: null });
                    verbEl.dataset.lastClassVerb = parsedVerb.verb;
                }
                if (!VerbComposerState.isApplying) {
                    syncComposerStateFromVerbInput(verbEl.value);
                    renderVerbComposerFromState();
                }
                scheduleVerbInputRefresh(verbEl.value);
            });
            verbEl.addEventListener("focus", () => {
                window.setTimeout(() => {
                    applyVerbInputWritableSelection(verbEl);
                }, 0);
            });
            verbEl.addEventListener("mouseup", () => {
                applyVerbInputWritableSelection(verbEl);
            });
            verbEl.addEventListener("scroll", () => {
                renderVerbMirror();
            });
        }
        const verbEntryApplyButton = document.getElementById("verb-entry-apply");
        if (verbEntryApplyButton) {
            verbEntryApplyButton.addEventListener("click", (event) => {
                event.preventDefault();
                applyVerbEntryInputNow();
            });
        }
        if (verbMirrorContent) {
            verbMirrorContent.addEventListener("beforeinput", handleVerbMirrorBeforeInput);
            verbMirrorContent.addEventListener("paste", (event) => {
                if (!isVerbInputModeComposer()) {
                    return;
                }
                event.preventDefault();
            });
            verbMirrorContent.addEventListener("drop", (event) => {
                if (!isVerbInputModeComposer()) {
                    return;
                }
                event.preventDefault();
            });
            verbMirrorContent.addEventListener("cut", (event) => {
                if (!isVerbInputModeComposer()) {
                    return;
                }
                event.preventDefault();
            });
        }
        window.addEventListener("resize", () => {
            renderVerbMirror();
        });
        renderTenseTabs();
        renderVerbMirror();
        loadVerbLexiconData().then(() => {
            updateVerbDisambiguation();
        });
        generateWord();
    })();
    return uiRuntimeInitializationPromise;
}

function initInlineComposerFormulaPatch() {
    const composer = document.getElementById("verb-composer");
    if (!composer || composer.dataset.inlineFormulaPatch === "true") {
        return;
    }
    composer.dataset.inlineFormulaPatch = "true";
    composer.classList.add("verb-composer--inline-formula");
    installInlineComposerFormulaStyles();
    applyInlineComposerFormulaDom();
    bindInlineComposerTransitivitySelect();
    wrapInlineComposerRenderPasses();
}

function installInlineComposerFormulaStyles() {
    if (document.getElementById("inline-composer-formula-style")) {
        return;
    }
    const style = document.createElement("style");
    style.id = "inline-composer-formula-style";
    style.textContent = `
        .verb-composer--inline-formula {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.55rem;
        }
        .verb-composer--inline-formula #composer-transitivity,
        .verb-composer--inline-formula .verb-composer__select:not(.is-hidden-control) {
            display: inline-flex;
            width: auto;
            min-width: 8rem;
            max-width: 14rem;
        }
        .verb-composer--inline-formula #composer-slot-stage {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.55rem;
            min-width: 0;
        }
        .verb-composer--inline-formula .verb-composer__slot-panel,
        .verb-composer--inline-formula #composer-slot-stage.is-active-slot {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            flex-wrap: wrap;
            gap: 0.55rem;
            width: auto;
            min-width: 0;
        }
        .verb-composer--inline-formula .verb-composer__top-row {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin: 0;
            padding: 0.7rem 0.65rem 0.5rem;
            border: 1px solid rgba(23, 33, 29, 0.28);
            border-radius: 0.85rem;
            background: rgba(255, 255, 255, 0.55);
        }
        .verb-composer--inline-formula .verb-composer__top-row::before {
            content: "(STEM)";
            position: absolute;
            top: -0.72rem;
            left: 0.75rem;
            padding: 0 0.32rem;
            border-radius: 999px;
            background: var(--paper, #f6f8f3);
            color: var(--ink-soft, #43534d);
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.06em;
        }
        .verb-composer--inline-formula .verb-composer__bottom-row,
        .verb-composer--inline-formula .verb-composer__object-pair,
        .verb-composer--inline-formula #composer-directional-field {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin: 0;
        }
        .verb-composer--inline-formula .verb-composer__stem-field,
        .verb-composer--inline-formula .verb-composer__bottom-field,
        .verb-composer--inline-formula .verb-composer__valence-main {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            width: auto;
            min-width: 0;
        }
        .verb-composer--inline-formula .verb-composer__input {
            width: min(11rem, 42vw);
        }
        .verb-composer--inline-formula .verb-composer__slot-tabs:has([data-composer-transitivity]),
        .verb-composer--inline-formula .verb-composer__chips:is(#composer-directional-chips, #composer-valence-a-chips, #composer-valence-chips, #composer-valence-2-chips),
        .verb-composer--inline-formula [data-composer-serial-type-chips] {
            display: none !important;
        }
        .verb-composer--inline-formula .verb-composer__checkbox {
            margin: 0;
            align-self: center;
        }
        @media (max-width: 720px) {
            .verb-composer--inline-formula,
            .verb-composer--inline-formula #composer-slot-stage,
            .verb-composer--inline-formula .verb-composer__slot-panel,
            .verb-composer--inline-formula .verb-composer__top-row,
            .verb-composer--inline-formula .verb-composer__bottom-row,
            .verb-composer--inline-formula .verb-composer__object-pair {
                align-items: stretch;
            }
            .verb-composer--inline-formula #composer-transitivity,
            .verb-composer--inline-formula .verb-composer__select:not(.is-hidden-control),
            .verb-composer--inline-formula .verb-composer__input {
                width: 100%;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}

function applyInlineComposerFormulaDom() {
    removeInlineComposerPresentationControls();
    exposeInlineComposerNativeControls();
}

function removeInlineComposerPresentationControls() {
    [
        "#composer-directional-chips",
        "#composer-valence-a-chips",
        "#composer-valence-chips",
        "#composer-valence-2-chips",
        "[data-composer-serial-type-chips]",
    ].forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => element.remove());
    });
    document.querySelectorAll("#verb-composer .verb-composer__slot-tabs").forEach((tabList) => {
        if (tabList.querySelector("[data-composer-transitivity]")) {
            tabList.remove();
        }
    });
}

function exposeInlineComposerNativeControls() {
    [
        "composer-transitivity",
        "composer-directional",
        "composer-valence-a",
        "composer-valence",
        "composer-valence-2",
    ].forEach((id) => {
        const control = document.getElementById(id);
        if (!control) {
            return;
        }
        control.classList.remove("is-hidden-control");
        control.hidden = false;
        control.removeAttribute("aria-hidden");
        control.removeAttribute("tabindex");
    });
    const transitivitySelect = document.getElementById("composer-transitivity");
    if (transitivitySelect && !transitivitySelect.querySelector('option[value=""]')) {
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Transitividad";
        transitivitySelect.insertBefore(placeholder, transitivitySelect.firstElementChild || null);
    }
}

function bindInlineComposerTransitivitySelect() {
    const select = document.getElementById("composer-transitivity");
    if (!select || select.dataset.inlineFormulaBound === "true") {
        return;
    }
    select.dataset.inlineFormulaBound = "true";
    select.dataset.previousTransitivity = select.value || (typeof VerbComposerState === "object" ? VerbComposerState.transitivity || "" : "");
    const rememberPrevious = () => {
        select.dataset.previousTransitivity = select.value || (typeof VerbComposerState === "object" ? VerbComposerState.transitivity || "" : "");
    };
    select.addEventListener("pointerdown", rememberPrevious, { passive: true });
    select.addEventListener("focus", rememberPrevious);
    select.addEventListener("keydown", rememberPrevious);
    select.addEventListener("change", () => {
        const nextToken = select.value || "";
        const previousToken = (
            typeof VerbComposerState === "object"
            && COMPOSER_TRANSITIVITY_ORDER.includes(VerbComposerState.transitivity)
        ) ? VerbComposerState.transitivity : (select.dataset.previousTransitivity || "");
        if (!COMPOSER_TRANSITIVITY_ORDER.includes(nextToken)) {
            return;
        }
        if (previousToken && previousToken !== nextToken) {
            if (typeof transposeComposerSlotTextboxes === "function") {
                transposeComposerSlotTextboxes(previousToken, nextToken);
            }
            if (typeof carryComposerEmbedVisibilityAcrossTransitivity === "function") {
                carryComposerEmbedVisibilityAcrossTransitivity(previousToken, nextToken);
            }
        }
        select.dataset.previousTransitivity = nextToken;
    });
}

function wrapInlineComposerRenderPasses() {
    if (typeof window !== "undefined" && window.__NAWAT_INLINE_FORMULA_RENDER_WRAP__) {
        return;
    }
    if (typeof window !== "undefined") {
        window.__NAWAT_INLINE_FORMULA_RENDER_WRAP__ = true;
    }
    if (typeof renderVerbComposerFromState === "function") {
        const originalRenderVerbComposerFromState = renderVerbComposerFromState;
        renderVerbComposerFromState = function renderVerbComposerFromStateInlineFormulaWrapper(...args) {
            const result = originalRenderVerbComposerFromState.apply(this, args);
            applyInlineComposerFormulaDom();
            return result;
        };
    }
    if (typeof syncComposerSlotPanelVisibility === "function") {
        const originalSyncComposerSlotPanelVisibility = syncComposerSlotPanelVisibility;
        syncComposerSlotPanelVisibility = function syncComposerSlotPanelVisibilityInlineFormulaWrapper(...args) {
            const result = originalSyncComposerSlotPanelVisibility.apply(this, args);
            applyInlineComposerFormulaDom();
            return result;
        };
    }
}

// Auto-generate on load and while typing
if (!(typeof window !== "undefined" && window.__NAWAT_BOOTSTRAP_MANAGED__)) {
    document.addEventListener("DOMContentLoaded", () => {
        void initializeUiRuntime();
    }, { once: true });
}
