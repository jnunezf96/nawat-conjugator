export function createUiEventsApi(targetObject = globalThis) {
    let uiRuntimeInitializationPromise = null;

    function bindGlobalKeydownHandler() {
        const documentObject = targetObject.document;
        if (!documentObject || targetObject.__NAWAT_KEYDOWN_BOUND__ === true) {
            return;
        }
        documentObject.addEventListener("keydown", (event) => {
            const verbEl = documentObject.getElementById("verb");
            const activeElement = documentObject.activeElement;
            if (targetObject.handleVerbTextboxTabShortcut(event)) {
                return;
            }
            if (!event.altKey && !event.ctrlKey && !event.metaKey && event.key === "Escape") {
                targetObject.LastComposerSpaceTs = 0;
                if (targetObject.closeEscapeManagedOverlay(event)) {
                    targetObject.LastComposerEscapeTs = 0;
                    event.preventDefault();
                    return;
                }
            }
            const isDeleteLikeKey = event.key === "Backspace" || event.key === "Delete";
            if (
                isDeleteLikeKey
                && !event.ctrlKey
                && !event.metaKey
                && !targetObject.shouldLetNativeDeleteBehavior(activeElement)
            ) {
                targetObject.LastComposerEscapeTs = 0;
                targetObject.LastComposerSpaceTs = 0;
                if (event.altKey) {
                    targetObject.runScreenCalculatorAC();
                    event.preventDefault();
                    return;
                }
                if (event.shiftKey) {
                    targetObject.runScreenCalculatorCE();
                    event.preventDefault();
                    return;
                }
                targetObject.runScreenCalculatorDEL();
                event.preventDefault();
                return;
            }
            if (event.altKey && !event.ctrlKey && !event.metaKey) {
                const altNavKey = event.key;
                const isBackward = altNavKey === "ArrowLeft";
                const isForward = altNavKey === "ArrowRight";
                if (isBackward || isForward) {
                    targetObject.LastComposerEscapeTs = 0;
                    targetObject.LastComposerSpaceTs = 0;
                    if (targetObject.runScreenCalculatorCycleTransitivity(isBackward ? -1 : 1)) {
                        event.preventDefault();
                        return;
                    }
                }
                const setCombinedModeShortcut = (mode) => {
                    if (!Object.values(targetObject.COMBINED_MODE).includes(mode)) {
                        return false;
                    }
                    if (targetObject.getCombinedMode() === mode) {
                        return true;
                    }
                    targetObject.setCombinedMode(mode);
                    targetObject.updateCombinedModeTabs();
                    targetObject.renderTenseTabs();
                    const verbMeta = targetObject.getVerbInputMeta();
                    targetObject.renderActiveConjugations({
                        verb: verbMeta.displayVerb,
                        objectPrefix: targetObject.getCurrentObjectPrefix(),
                    });
                    return true;
                };
                const clickTarget = (selector) => {
                    const button = documentObject.querySelector(selector);
                    if (!button || typeof button.click !== "function") {
                        return false;
                    }
                    if (button.disabled) {
                        return false;
                    }
                    if (button.hasAttribute("hidden") || button.closest("[hidden]")) {
                        return false;
                    }
                    if (typeof targetObject.window !== "undefined" && typeof targetObject.window.getComputedStyle === "function") {
                        const style = targetObject.window.getComputedStyle(button);
                        if (style.display === "none" || style.visibility === "hidden") {
                            return false;
                        }
                    }
                    button.click();
                    return true;
                };
                const isVerbMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
                const isComposerMode = targetObject.isVerbInputModeComposer();
                const handled = targetObject.ALT_SHORTCUT_DEFINITIONS.some((definition) => {
                    if (!targetObject.matchesAltShortcutKey(event, definition.key)) {
                        return false;
                    }
                    if (definition.requireVerbMode && !isVerbMode) {
                        return false;
                    }
                    if (definition.requireComposerMode && !isComposerMode) {
                        return false;
                    }
                    if (definition.action === "set-combined-mode-active") {
                        return setCombinedModeShortcut(targetObject.COMBINED_MODE.active);
                    }
                    if (definition.action === "set-combined-mode-nonactive") {
                        return setCombinedModeShortcut(targetObject.COMBINED_MODE.nonactive);
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
                if (targetObject.shouldLetNativeSpaceBehavior(activeElement)) {
                    targetObject.LastComposerEscapeTs = 0;
                    targetObject.LastComposerSpaceTs = 0;
                    return;
                }
                targetObject.LastComposerEscapeTs = 0;
                targetObject.LastComposerSpaceTs = 0;
                const preferredTarget = verbEl;
                if (preferredTarget === verbEl && targetObject.focusVisibleVerbSurfaceAtEnd()) {
                    event.preventDefault();
                    return;
                }
                if (targetObject.focusTextInputAtEnd(verbEl)) {
                    event.preventDefault();
                    return;
                }
            } else if (event.key === "Escape") {
                targetObject.LastComposerSpaceTs = 0;
                const handledComposerClear = targetObject.handleComposerDoubleEscapeShortcut(event);
                if (verbEl) {
                    verbEl.blur();
                }
                event.preventDefault();
                if (handledComposerClear) {
                    return;
                }
            } else if (event.key === "Enter") {
                if (targetObject.shouldLetNativeEnterSelectControl(activeElement)) {
                    targetObject.LastComposerEscapeTs = 0;
                    targetObject.LastComposerSpaceTs = 0;
                    return;
                }
                targetObject.LastComposerEscapeTs = 0;
                targetObject.LastComposerSpaceTs = 0;
                targetObject.cancelDeferredToggleAvailabilityPass();
                targetObject.cancelScheduledVerbInputRefresh();
                targetObject.generateWord();
                event.preventDefault();
            } else {
                targetObject.LastComposerEscapeTs = 0;
                targetObject.LastComposerSpaceTs = 0;
            }
        });
        targetObject.__NAWAT_KEYDOWN_BOUND__ = true;
    }

    function applyVerbEntryInputNow() {
        const verbEl = targetObject.document.getElementById("verb");
        if (!verbEl) {
            return;
        }
        verbEl.dispatchEvent(new targetObject.Event("input", { bubbles: true }));
        targetObject.scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "manual-entry",
        });
        targetObject.focusVisibleVerbSurfaceAtEnd();
    }

    async function loadStaticBootstrapData() {
        const runtimeConfig = (
            typeof targetObject !== "undefined"
            && targetObject.__NAWAT_RUNTIME_CONFIG__
            && typeof targetObject.__NAWAT_RUNTIME_CONFIG__ === "object"
        ) ? targetObject.__NAWAT_RUNTIME_CONFIG__ : null;
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
            const loader = typeof targetObject !== "undefined" ? targetObject[loaderName] : null;
            if (typeof loader !== "function") {
                throw new Error(`Missing static bootstrap loader: ${loaderName}`);
            }
            return loader();
        }));
        await runLoaderGroup(loaderGroups.essential);
        await runLoaderGroup(loaderGroups.deferred);
    }

    async function initializeUiRuntime() {
        if (uiRuntimeInitializationPromise) {
            return uiRuntimeInitializationPromise;
        }
        uiRuntimeInitializationPromise = (async () => {
            const documentObject = targetObject.document;
            await loadStaticBootstrapData();
            await targetObject.installDeveloperHooksIfEnabled();
            targetObject.setBrowserClasses();
            targetObject.initZoomFontLock();
            targetObject.initUiScaleControl();
            targetObject.initUiDensityControl();
            targetObject.initLanguageSwitch();
            targetObject.initTutorialPanel();
            targetObject.initKeyboardLegendPopover();
            targetObject.initLeftPanelStackTabs();
            targetObject.initPanelEdgeNavigation();
            targetObject.initTenseModeTabs();
            targetObject.initCombinedModeTabs();
            targetObject.initVerbSourceScopeControl();
            targetObject.initDerivationTypeControl();
            targetObject.initToggleLockControl();
            targetObject.initViewExport();
            targetObject.initCausativeReport();
            targetObject.initVerbComposer();
            targetObject.initVerbScreenCalculator();
            targetObject.initCalcInputModeButtons();
            targetObject.enforceNoAutofillOnTextboxes(documentObject);
            const verbEl = documentObject.getElementById("verb");
            const verbMirrorContent = targetObject.getVerbMirrorContent();
            if (verbEl) {
                const initialDisplayValue = targetObject.serializeRegexInputValue(verbEl.value || "");
                if (initialDisplayValue && initialDisplayValue !== verbEl.value) {
                    verbEl.value = initialDisplayValue;
                }
                verbEl.dataset.prevValue = verbEl.value || "";
                const initialParts = targetObject.getSearchParts(verbEl.value);
                const initialBase = initialParts.trimmedBase;
                const initialValue = initialBase || verbEl.value;
                verbEl.dataset.lastClassVerb = targetObject.parseVerbInput(initialValue).verb;
                if (initialBase) {
                    targetObject.rememberNonSearchValue(initialParts);
                } else if (!initialParts.hasQuery) {
                    targetObject.VerbInputState.lastNonSearchValue = verbEl.value;
                }
                verbEl.addEventListener("beforeinput", targetObject.handleVerbBeforeInput);
                verbEl.addEventListener("input", () => {
                    if (verbEl.value.includes("/-") || verbEl.value.includes("-/")) {
                        verbEl.value = verbEl.dataset.prevValue || "";
                    } else {
                        verbEl.dataset.prevValue = verbEl.value;
                    }
                    if (!targetObject.VerbComposerState.isApplying) {
                        const normalizedValue = targetObject.serializeRegexInputValue(verbEl.value);
                        if (normalizedValue !== verbEl.value) {
                            verbEl.value = normalizedValue;
                            verbEl.dataset.prevValue = normalizedValue;
                        }
                    }
                    targetObject.renderVerbMirror();
                    const searchParts = targetObject.getSearchParts(verbEl.value);
                    targetObject.rememberNonSearchValue(searchParts);
                    const parsedVerb = targetObject.parseVerbInput(targetObject.getSearchInputBase(verbEl.value));
                    if (verbEl.dataset.lastClassVerb !== parsedVerb.verb) {
                        targetObject.mutateConjugationSelectionState({ classFilter: null });
                        verbEl.dataset.lastClassVerb = parsedVerb.verb;
                    }
                    if (!targetObject.VerbComposerState.isApplying) {
                        targetObject.syncComposerStateFromVerbInput(verbEl.value);
                        targetObject.renderVerbComposerFromState();
                    }
                    targetObject.scheduleVerbInputRefresh(verbEl.value);
                });
                verbEl.addEventListener("focus", () => {
                    targetObject.window.setTimeout(() => {
                        targetObject.applyVerbInputWritableSelection(verbEl);
                    }, 0);
                });
                verbEl.addEventListener("mouseup", () => {
                    targetObject.applyVerbInputWritableSelection(verbEl);
                });
                verbEl.addEventListener("scroll", () => {
                    targetObject.renderVerbMirror();
                });
            }
            const verbEntryApplyButton = documentObject.getElementById("verb-entry-apply");
            if (verbEntryApplyButton) {
                verbEntryApplyButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    applyVerbEntryInputNow();
                });
            }
            if (verbMirrorContent) {
                verbMirrorContent.addEventListener("beforeinput", targetObject.handleVerbMirrorBeforeInput);
                verbMirrorContent.addEventListener("paste", (event) => {
                    if (!targetObject.isVerbInputModeComposer()) {
                        return;
                    }
                    event.preventDefault();
                });
                verbMirrorContent.addEventListener("drop", (event) => {
                    if (!targetObject.isVerbInputModeComposer()) {
                        return;
                    }
                    event.preventDefault();
                });
                verbMirrorContent.addEventListener("cut", (event) => {
                    if (!targetObject.isVerbInputModeComposer()) {
                        return;
                    }
                    event.preventDefault();
                });
            }
            targetObject.window.addEventListener("resize", () => {
                targetObject.renderVerbMirror();
            });
            targetObject.renderTenseTabs();
            targetObject.renderVerbMirror();
            targetObject.loadVerbLexiconData().then(() => {
                targetObject.updateVerbDisambiguation();
            });
            targetObject.generateWord();
        })();
        return uiRuntimeInitializationPromise;
    }

    function bindLegacyDomContentLoaded() {
        const documentObject = targetObject.document;
        if (
            !documentObject
            || targetObject.__NAWAT_BOOTSTRAP_MANAGED__
            || targetObject.__NAWAT_DOMCONTENTLOADED_BOUND__ === true
        ) {
            return;
        }
        documentObject.addEventListener("DOMContentLoaded", () => {
            void initializeUiRuntime();
        }, { once: true });
        targetObject.__NAWAT_DOMCONTENTLOADED_BOUND__ = true;
    }

    return {
        bindGlobalKeydownHandler,
        applyVerbEntryInputNow,
        loadStaticBootstrapData,
        initializeUiRuntime,
        bindLegacyDomContentLoaded,
    };
}

export function installUiEventsGlobals(targetObject = globalThis) {
    const api = createUiEventsApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    api.bindGlobalKeydownHandler();
    api.bindLegacyDomContentLoaded();
    return api;
}
