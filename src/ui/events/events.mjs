// Native wrapper generated from src/ui/events.js.

export function createUiEventsApi(targetObject = globalThis) {
    // === Event Wiring ===
    // Keyboard navigation (kept minimal now that radios are removed)
    targetObject.document.addEventListener("keydown", event => {
      const verbEl = targetObject.document.getElementById("verb");
      const activeElement = targetObject.document.activeElement;
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
      if (isDeleteLikeKey && !event.ctrlKey && !event.metaKey && !targetObject.shouldLetNativeDeleteBehavior(activeElement)) {
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
        const setCombinedModeShortcut = mode => {
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
            objectPrefix: targetObject.getCurrentObjectPrefix()
          });
          return true;
        };
        const clickTarget = selector => {
          const button = targetObject.document.querySelector(selector);
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
        const handled = targetObject.ALT_SHORTCUT_DEFINITIONS.some(definition => {
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
        targetObject.generateNuclearClauseSurface();
        event.preventDefault();
      } else {
        targetObject.LastComposerEscapeTs = 0;
        targetObject.LastComposerSpaceTs = 0;
      }
    });
    function applyVerbEntryInputNow() {
      const verbEl = targetObject.document.getElementById("verb");
      if (!verbEl) {
        return;
      }
      verbEl.dispatchEvent(new targetObject.Event("input", {
        bubbles: true
      }));
      targetObject.scheduleVerbInputRefresh(verbEl.value, {
        immediate: true,
        source: "manual-entry"
      });
      targetObject.focusVisibleVerbSurfaceAtEnd();
    }
    async function loadStaticBootstrapData() {
      const runtimeConfig = typeof globalThis !== "undefined" && globalThis.__NAWAT_RUNTIME_CONFIG__ && typeof globalThis.__NAWAT_RUNTIME_CONFIG__ === "object" ? globalThis.__NAWAT_RUNTIME_CONFIG__ : null;
      const loaderGroups = runtimeConfig?.bootstrapLoaderGroups || {
        essential: ["loadStaticConstants", "loadStaticDirectionalRules", "loadStaticLabels"],
        deferred: ["loadStaticOptions", "loadStaticGroups", "loadStaticOrders", "loadStaticRules", "loadStaticDerivationalRules", "loadStaticValenceNeutral", "loadStaticPhonology", "loadStaticAllomorphyRules", "loadStaticModes", "loadStaticNnc", "loadStaticMisc", "loadStaticSuppletives", "loadStaticRedup", "loadStaticSuppletivePaths"]
      };
      const runLoaderGroup = async (loaderNames = []) => Promise.all(loaderNames.map(async loaderName => {
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
        await targetObject.installDeveloperHooksIfEnabled();
        targetObject.setBrowserClasses();
        targetObject.initZoomFontLock();
        targetObject.initUiScaleControl();
        targetObject.initUiDensityControl();
        targetObject.initLanguageSwitch();
        if (typeof targetObject.initCurriculumMap === "function") {
          targetObject.initCurriculumMap();
        }
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
        initInlineComposerFormulaPatch();
        targetObject.initVerbComposer();
        if (typeof targetObject.initEntradaUrlSegments === "function") {
          targetObject.initEntradaUrlSegments();
        }
        targetObject.initVerbScreenCalculator();
        targetObject.initCalcInputModeButtons();
        targetObject.enforceNoAutofillOnTextboxes(targetObject.document);
        const verbEl = targetObject.document.getElementById("verb");
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
              targetObject.mutateConjugationSelectionState({
                classFilter: null
              });
              verbEl.dataset.lastClassVerb = parsedVerb.verb;
            }
            if (!targetObject.VerbComposerState.isApplying) {
              targetObject.syncComposerStateFromVerbInput(verbEl.value);
              targetObject.renderVerbComposerFromState();
            }
            if (!targetObject.VerbComposerState.isApplying && typeof targetObject.clearAndrewsRouteBoardPinnedJourney === "function") {
              targetObject.clearAndrewsRouteBoardPinnedJourney();
            }
            if (typeof targetObject.renderAndrewsRouteBoard === "function") {
              targetObject.renderAndrewsRouteBoard();
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
        const verbEntryApplyButton = targetObject.document.getElementById("verb-entry-apply");
        if (verbEntryApplyButton) {
          verbEntryApplyButton.addEventListener("click", event => {
            event.preventDefault();
            applyVerbEntryInputNow();
          });
        }
        if (verbMirrorContent) {
          verbMirrorContent.addEventListener("beforeinput", targetObject.handleVerbMirrorBeforeInput);
          verbMirrorContent.addEventListener("paste", event => {
            if (!targetObject.isVerbInputModeComposer()) {
              return;
            }
            event.preventDefault();
          });
          verbMirrorContent.addEventListener("drop", event => {
            if (!targetObject.isVerbInputModeComposer()) {
              return;
            }
            event.preventDefault();
          });
          verbMirrorContent.addEventListener("cut", event => {
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
        targetObject.generateNuclearClauseSurface();
      })();
      return uiRuntimeInitializationPromise;
    }
    let IsRefreshingInlineComposerFormulaControls = false;
    function disableInlineComposerFormulaPatch() {
      const composer = targetObject.document.getElementById("verb-composer");
      if (!composer) {
        return;
      }
      composer.dataset.inlineFormulaPatch = "disabled";
      composer.classList.remove("verb-composer--inline-formula");
      const inlineStyle = targetObject.document.getElementById("inline-composer-formula-style");
      if (inlineStyle) {
        inlineStyle.remove();
      }
      const transitivitySelect = targetObject.document.getElementById("composer-transitivity");
      if (transitivitySelect) {
        transitivitySelect.classList.add("is-hidden-control");
        transitivitySelect.hidden = true;
        transitivitySelect.setAttribute("aria-hidden", "true");
        transitivitySelect.setAttribute("tabindex", "-1");
      }
    }
    function initInlineComposerFormulaPatch() {
      disableInlineComposerFormulaPatch();
    }
    function installInlineComposerFormulaStyles() {
      if (targetObject.document.getElementById("inline-composer-formula-style")) {
        return;
      }
      const style = targetObject.document.createElement("style");
      style.id = "inline-composer-formula-style";
      style.textContent = `
            .verb-composer--inline-formula,
            .verb-composer--inline-formula .verb-composer__formula-row {
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
            .verb-composer--inline-formula .verb-composer__top-row,
            .verb-composer--inline-formula .verb-composer__stem-boundary {
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
            .verb-composer--inline-formula .verb-composer__top-row::before,
            .verb-composer--inline-formula .verb-composer__stem-boundary::before {
                content: "(base)";
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
            .verb-composer--inline-formula .verb-composer__slot-tabs,
            .verb-composer--inline-formula #composer-directional-chips,
            .verb-composer--inline-formula #composer-valence-a-chips,
            .verb-composer--inline-formula #composer-valence-chips,
            .verb-composer--inline-formula #composer-valence-2-chips,
            .verb-composer--inline-formula [data-composer-serial-type-chips] {
                display: none !important;
            }
            .verb-composer--inline-formula .verb-composer__checkbox {
                margin: 0;
                align-self: center;
            }
            @media (max-width: 720px) {
                .verb-composer--inline-formula,
                .verb-composer--inline-formula .verb-composer__formula-row,
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
      targetObject.document.head.appendChild(style);
    }
    function getInlineComposerActiveSlot() {
      if (typeof targetObject.getComposerActiveSlotFromState === "function") {
        return targetObject.getComposerActiveSlotFromState();
      }
      const transitivity = String(targetObject.VerbComposerState?.transitivity || "");
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
        return "c";
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        return "b";
      }
      return "a";
    }
    function getInlineComposerFormulaValenceSelect(elements = targetObject.getVerbComposerElements()) {
      const transitivity = String(targetObject.VerbComposerState?.transitivity || "");
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
        return elements.valenceSelectSecondary || null;
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        return elements.valenceSelect || null;
      }
      return elements.valenceSelectIntransitive || null;
    }
    function getInlineComposerFormulaControls() {
      const elements = typeof targetObject.getVerbComposerElements === "function" ? targetObject.getVerbComposerElements() : {};
      const activeSlot = getInlineComposerActiveSlot();
      const activeRefs = elements.slots?.[activeSlot] || {};
      return {
        elements,
        activeSlot,
        panel: elements.panel || targetObject.document.getElementById("verb-composer"),
        stagePanel: targetObject.document.getElementById("composer-slot-stage"),
        transitivitySelect: elements.transitivitySelect || targetObject.document.getElementById("composer-transitivity"),
        valenceSelect: getInlineComposerFormulaValenceSelect(elements),
        embedInput: activeRefs.embedInput || null,
        stemInput: activeRefs.stemInput || null,
        objectInput: activeRefs.objectInput || null,
        directionalSelect: elements.directionalSelect || targetObject.document.getElementById("composer-directional"),
        supportiveICheckbox: elements.supportiveICheckbox || targetObject.document.getElementById("composer-supportive-i"),
        activeRefs
      };
    }
    function getInlineComposerFormulaValenceValue(state = targetObject.VerbComposerState) {
      const transitivity = String(state?.transitivity || "");
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
        return state?.valenceSecondary || "";
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        return state?.valence || "";
      }
      return state?.valenceIntransitive || "";
    }
    function getInlineComposerFormulaViewModel() {
      const activeSlot = getInlineComposerActiveSlot();
      const stateKeys = targetObject.getComposerSlotStateKeys(activeSlot);
      return {
        activeSlot,
        transitivity: targetObject.VerbComposerState.transitivity || "",
        valence: getInlineComposerFormulaValenceValue(targetObject.VerbComposerState),
        embed: targetObject.VerbComposerState[stateKeys.embed] || "",
        stem: targetObject.VerbComposerState[stateKeys.stem] || "",
        objectEmbed: targetObject.VerbComposerState[stateKeys.objectEmbed] || "",
        directional: targetObject.VerbComposerState.directionalPrefix || "",
        supportive: targetObject.hasSupportiveMarkerValue(targetObject.getComposerSupportiveMarker())
      };
    }
    function setInlineComposerVisibleLabel(inputEl, labelText = "") {
      if (!inputEl || !labelText) {
        return;
      }
      const field = inputEl.closest(".verb-composer__stem-field, .verb-composer__bottom-field, .verb-composer__valence-main");
      const label = field?.querySelector(".verb-composer__sub-label") || null;
      if (label) {
        label.textContent = labelText;
      }
    }
    function setInlineComposerTaggedLabel(inputEl, labelText = "") {
      if (!inputEl || !labelText) {
        return;
      }
      const shell = inputEl.closest(".verb-composer__tagged-input-shell");
      const tag = shell?.querySelector(".verb-composer__tagged-input-tag") || null;
      if (tag) {
        tag.textContent = labelText;
      }
    }
    function syncInlineComposerFormulaLabels(viewModel = getInlineComposerFormulaViewModel(), controls = getInlineComposerFormulaControls()) {
      const transitivity = String(viewModel.transitivity || "");
      const isBitransitive = transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive;
      const isTransitive = transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive;
      const embedLabel = isBitransitive ? "Incorporado de matriz bitransitiva" : isTransitive ? "Incorporado de matriz transitiva" : "Incorporado de matriz intransitiva";
      const objectLabel = isBitransitive ? "Objeto incorporado doble" : isTransitive ? "Objeto incorporado" : "Objeto incorporado";
      const valenceLabel = isBitransitive ? "Objeto / valencia doble" : isTransitive ? "Objeto indefinido" : "Objeto indefinido";
      setInlineComposerVisibleLabel(controls.embedInput, embedLabel);
      setInlineComposerVisibleLabel(controls.objectInput, objectLabel);
      setInlineComposerVisibleLabel(controls.stemInput, "Raíz matriz");
      setInlineComposerTaggedLabel(controls.embedInput, "Incorporado");
      setInlineComposerTaggedLabel(controls.objectInput, "Objeto");
      setInlineComposerTaggedLabel(controls.stemInput, "Verbo");
      if (controls.embedInput) {
        controls.embedInput.placeholder = "Elemento incorporado";
        controls.embedInput.setAttribute("aria-label", embedLabel);
      }
      if (controls.objectInput) {
        controls.objectInput.placeholder = "Objeto incorporado";
        controls.objectInput.setAttribute("aria-label", objectLabel);
      }
      if (controls.stemInput) {
        controls.stemInput.placeholder = "Raíz matriz";
        controls.stemInput.setAttribute("aria-label", "Raíz matriz");
      }
      if (controls.valenceSelect) {
        const valenceField = controls.valenceSelect.closest(".verb-composer__valence-main, .verb-composer__bottom-field");
        const valenceVisibleLabel = valenceField?.querySelector(".verb-composer__sub-label") || null;
        if (valenceVisibleLabel) {
          valenceVisibleLabel.textContent = valenceLabel;
        }
        controls.valenceSelect.setAttribute("aria-label", valenceLabel);
      }
    }
    function syncInlineComposerFormulaRowClasses() {
      const controls = getInlineComposerFormulaControls();
      const stagePanel = controls.stagePanel;
      if (stagePanel) {
        stagePanel.classList.add("verb-composer__formula-row");
        stagePanel.setAttribute("role", "group");
        stagePanel.setAttribute("aria-label", "Fórmula verbal");
      }
      targetObject.document.querySelectorAll(".verb-composer__top-row").forEach(row => {
        row.classList.toggle("verb-composer__stem-boundary", row.closest("#composer-slot-stage") !== null);
      });
    }
    function removeInlineComposerPresentationControls() {
      ["#composer-directional-chips", "#composer-valence-a-chips", "#composer-valence-chips", "#composer-valence-2-chips", "[data-composer-serial-type-chips]"].forEach(selector => {
        targetObject.document.querySelectorAll(selector).forEach(element => element.remove());
      });
      targetObject.document.querySelectorAll("#verb-composer .verb-composer__slot-tabs").forEach(tabList => {
        if (tabList.querySelector("[data-composer-transitivity]")) {
          tabList.remove();
        }
      });
    }
    function exposeInlineComposerNativeControls() {
      ["composer-transitivity", "composer-directional", "composer-valence-a", "composer-valence", "composer-valence-2"].forEach(id => {
        const control = targetObject.document.getElementById(id);
        if (!control) {
          return;
        }
        control.classList.remove("is-hidden-control");
        control.hidden = false;
        control.removeAttribute("aria-hidden");
        control.removeAttribute("tabindex");
      });
      const transitivitySelect = targetObject.document.getElementById("composer-transitivity");
      if (transitivitySelect && !transitivitySelect.querySelector('option[value=""]')) {
        const placeholder = targetObject.document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Transitividad";
        if (typeof transitivitySelect.insertBefore === "function") {
          transitivitySelect.insertBefore(placeholder, transitivitySelect.firstElementChild || null);
        } else if (typeof transitivitySelect.appendChild === "function") {
          transitivitySelect.appendChild(placeholder);
        }
      }
    }
    function applyInlineComposerFormulaDom() {
      removeInlineComposerPresentationControls();
      exposeInlineComposerNativeControls();
      syncInlineComposerFormulaRowClasses();
      syncInlineComposerFormulaLabels();
    }
    function syncInlineComposerFormulaValenceStateFromControl(selectEl) {
      const value = selectEl?.value || "";
      const transitivity = String(targetObject.VerbComposerState.transitivity || "");
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive) {
        targetObject.VerbComposerState.valenceSecondary = value;
        targetObject.VerbComposerState.valence = "";
        targetObject.VerbComposerState.valenceIntransitive = "";
        return;
      }
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive) {
        targetObject.VerbComposerState.valence = value;
        targetObject.VerbComposerState.valenceSecondary = "";
        targetObject.VerbComposerState.valenceIntransitive = "";
        return;
      }
      targetObject.VerbComposerState.valenceIntransitive = targetObject.normalizeComposerSecondaryValenceSurfaceToken(value);
      targetObject.VerbComposerState.valence = "";
      targetObject.VerbComposerState.valenceSecondary = "";
    }
    function collectInlineComposerFormulaStateFromControls({
      preserveSupportiveState = false
    } = {}) {
      if (IsRefreshingInlineComposerFormulaControls) {
        return;
      }
      const controls = getInlineComposerFormulaControls();
      const nextTransitivity = controls.transitivitySelect?.value || "";
      if (targetObject.COMPOSER_TRANSITIVITY_ORDER.includes(nextTransitivity)) {
        targetObject.VerbComposerState.transitivity = nextTransitivity;
      } else if (!targetObject.isComposerTransitivitySelected()) {
        targetObject.VerbComposerState.transitivity = "";
      }
      const activeSlot = getInlineComposerActiveSlot();
      const stateKeys = targetObject.getComposerSlotStateKeys(activeSlot);
      const previousStem = targetObject.normalizeComposerStem(targetObject.VerbComposerState[stateKeys.stem] || "");
      const nextEmbed = targetObject.normalizeComposerEmbedValue(controls.embedInput?.value || "");
      let nextStem = targetObject.getComposerCanonicalStemFromInputValue(controls.stemInput?.value || "", activeSlot);
      if (!nextStem && nextEmbed && previousStem) {
        nextStem = previousStem;
      }
      targetObject.VerbComposerState[stateKeys.embed] = nextEmbed;
      targetObject.VerbComposerState[stateKeys.stem] = nextStem;
      targetObject.VerbComposerState[stateKeys.objectEmbed] = targetObject.normalizeComposerEmbedValue(controls.objectInput?.value || "");
      syncInlineComposerFormulaValenceStateFromControl(controls.valenceSelect);
      targetObject.VerbComposerState.directionalPrefix = controls.directionalSelect?.value || "";
      targetObject.syncComposerActiveStemAndEmbedFromState();
      targetObject.VerbComposerState.syllableMode = targetObject.getComposerStemSyllableCount(targetObject.getComposerActiveStemValue()) === 1 ? targetObject.COMPOSER_SYLLABLE_MODE.monosyllable : targetObject.COMPOSER_SYLLABLE_MODE.multisyllable;
      const supportiveRequested = Boolean(controls.supportiveICheckbox?.checked);
      const currentSupportiveMarker = targetObject.getComposerSupportiveMarker();
      const candidateSupportiveMarker = targetObject.getComposerSupportiveMarkerCandidate();
      if (supportiveRequested) {
        targetObject.VerbComposerState.supportiveMarker = candidateSupportiveMarker || (preserveSupportiveState ? currentSupportiveMarker : "") || "";
      } else {
        targetObject.VerbComposerState.supportiveMarker = "";
      }
    }
    function refreshInlineComposerControlsFromState() {
      const controls = getInlineComposerFormulaControls();
      const viewModel = getInlineComposerFormulaViewModel();
      IsRefreshingInlineComposerFormulaControls = true;
      try {
        if (controls.transitivitySelect) {
          controls.transitivitySelect.value = viewModel.transitivity || "";
          controls.transitivitySelect.dataset.previousTransitivity = viewModel.transitivity || "";
        }
        if (controls.valenceSelect) {
          controls.valenceSelect.value = viewModel.valence || "";
        }
        if (controls.embedInput) {
          controls.embedInput.value = targetObject.normalizeComposerEmbedValue(viewModel.embed || "");
        }
        if (controls.stemInput) {
          const templateSuffix = typeof targetObject.getComposerStemInputTemplateSuffix === "function" ? targetObject.getComposerStemInputTemplateSuffix(controls.stemInput, viewModel.activeSlot) : "";
          controls.stemInput.value = typeof targetObject.formatComposerStemForInputDisplay === "function" ? targetObject.formatComposerStemForInputDisplay(targetObject.normalizeComposerStem(viewModel.stem || ""), {
            slotKey: viewModel.activeSlot,
            preferSplitFromStem: true,
            templateSuffix,
            surfaceValue: targetObject.COMPOSER_TEMPLATE_SURFACE_BY_SLOT[viewModel.activeSlot] || ""
          }) : targetObject.normalizeComposerStem(viewModel.stem || "");
        }
        if (controls.objectInput) {
          controls.objectInput.value = targetObject.normalizeComposerEmbedValue(viewModel.objectEmbed || "");
        }
        if (controls.directionalSelect) {
          controls.directionalSelect.value = viewModel.directional || "";
        }
        if (controls.supportiveICheckbox) {
          controls.supportiveICheckbox.checked = Boolean(viewModel.supportive);
        }
        applyInlineComposerFormulaDom();
      } finally {
        IsRefreshingInlineComposerFormulaControls = false;
      }
    }
    function bindInlineComposerTransitivitySelect() {
      const select = targetObject.document.getElementById("composer-transitivity");
      if (!select || select.dataset.inlineFormulaBound === "true") {
        return;
      }
      select.dataset.inlineFormulaBound = "true";
      select.dataset.previousTransitivity = select.value || (typeof targetObject.VerbComposerState === "object" ? targetObject.VerbComposerState.transitivity || "" : "");
      const rememberPrevious = () => {
        if (IsRefreshingInlineComposerFormulaControls) {
          return;
        }
        select.dataset.previousTransitivity = (typeof targetObject.VerbComposerState === "object" ? targetObject.VerbComposerState.transitivity || "" : "") || select.value || "";
      };
      select.addEventListener("pointerdown", rememberPrevious, {
        passive: true
      });
      select.addEventListener("focus", rememberPrevious);
      select.addEventListener("keydown", rememberPrevious);
      select.addEventListener("change", () => {
        if (IsRefreshingInlineComposerFormulaControls) {
          return;
        }
        const nextToken = select.value || "";
        const previousToken = select.dataset.previousTransitivity || "";
        if (!targetObject.COMPOSER_TRANSITIVITY_ORDER.includes(nextToken)) {
          return;
        }
        if (previousToken && previousToken !== nextToken) {
          if (typeof targetObject.transposeComposerSlotTextboxes === "function") {
            targetObject.transposeComposerSlotTextboxes(previousToken, nextToken);
          }
          if (typeof targetObject.carryComposerEmbedVisibilityAcrossTransitivity === "function") {
            targetObject.carryComposerEmbedVisibilityAcrossTransitivity(previousToken, nextToken);
          }
        }
        select.dataset.previousTransitivity = nextToken;
      });
    }
    function wrapInlineComposerStateProjection() {
      if (typeof targetObject.window !== "undefined" && targetObject.window.__NAWAT_INLINE_FORMULA_RENDER_WRAP__) {
        return;
      }
      if (typeof targetObject.window !== "undefined") {
        targetObject.window.__NAWAT_INLINE_FORMULA_RENDER_WRAP__ = true;
      }
      if (typeof targetObject.collectComposerStateFromControls === "function") {
        const originalCollectComposerStateFromControls = targetObject.collectComposerStateFromControls;
        targetObject.collectComposerStateFromControls = function collectComposerStateFromInlineFormulaWrapper(...args) {
          const panel = targetObject.document.getElementById("verb-composer");
          if (panel?.classList?.contains("verb-composer--inline-formula")) {
            return collectInlineComposerFormulaStateFromControls(...args);
          }
          return originalCollectComposerStateFromControls.apply(this, args);
        };
      }
      if (typeof targetObject.onVerbComposerControlChange === "function") {
        const originalOnVerbComposerControlChange = targetObject.onVerbComposerControlChange;
        targetObject.onVerbComposerControlChange = function onVerbComposerControlChangeInlineFormulaWrapper(...args) {
          if (IsRefreshingInlineComposerFormulaControls) {
            return;
          }
          return originalOnVerbComposerControlChange.apply(this, args);
        };
      }
      if (typeof targetObject.renderVerbComposerFromState === "function") {
        const originalRenderVerbComposerFromState = targetObject.renderVerbComposerFromState;
        targetObject.renderVerbComposerFromState = function renderVerbComposerFromStateInlineFormulaWrapper(...args) {
          const result = originalRenderVerbComposerFromState.apply(this, args);
          refreshInlineComposerControlsFromState();
          return result;
        };
      }
      if (typeof targetObject.syncComposerSlotPanelVisibility === "function") {
        const originalSyncComposerSlotPanelVisibility = targetObject.syncComposerSlotPanelVisibility;
        targetObject.syncComposerSlotPanelVisibility = function syncComposerSlotPanelVisibilityInlineFormulaWrapper(...args) {
          const result = originalSyncComposerSlotPanelVisibility.apply(this, args);
          applyInlineComposerFormulaDom();
          return result;
        };
      }
    }

    // Auto-generate on load and while typing
    if (!(typeof targetObject.window !== "undefined" && targetObject.window.__NAWAT_BOOTSTRAP_MANAGED__)) {
      targetObject.document.addEventListener("DOMContentLoaded", () => {
        void initializeUiRuntime();
      }, {
        once: true
      });
    }

    const api = {};
    api.applyVerbEntryInputNow = applyVerbEntryInputNow;
    api.loadStaticBootstrapData = loadStaticBootstrapData;
    Object.defineProperty(api, "uiRuntimeInitializationPromise", {
        configurable: true,
        enumerable: true,
        get() { return uiRuntimeInitializationPromise; },
        set(value) { uiRuntimeInitializationPromise = value; },
    });
    api.initializeUiRuntime = initializeUiRuntime;
    Object.defineProperty(api, "IsRefreshingInlineComposerFormulaControls", {
        configurable: true,
        enumerable: true,
        get() { return IsRefreshingInlineComposerFormulaControls; },
        set(value) { IsRefreshingInlineComposerFormulaControls = value; },
    });
    api.disableInlineComposerFormulaPatch = disableInlineComposerFormulaPatch;
    api.initInlineComposerFormulaPatch = initInlineComposerFormulaPatch;
    api.installInlineComposerFormulaStyles = installInlineComposerFormulaStyles;
    api.getInlineComposerActiveSlot = getInlineComposerActiveSlot;
    api.getInlineComposerFormulaValenceSelect = getInlineComposerFormulaValenceSelect;
    api.getInlineComposerFormulaControls = getInlineComposerFormulaControls;
    api.getInlineComposerFormulaValenceValue = getInlineComposerFormulaValenceValue;
    api.getInlineComposerFormulaViewModel = getInlineComposerFormulaViewModel;
    api.setInlineComposerVisibleLabel = setInlineComposerVisibleLabel;
    api.setInlineComposerTaggedLabel = setInlineComposerTaggedLabel;
    api.syncInlineComposerFormulaLabels = syncInlineComposerFormulaLabels;
    api.syncInlineComposerFormulaRowClasses = syncInlineComposerFormulaRowClasses;
    api.removeInlineComposerPresentationControls = removeInlineComposerPresentationControls;
    api.exposeInlineComposerNativeControls = exposeInlineComposerNativeControls;
    api.applyInlineComposerFormulaDom = applyInlineComposerFormulaDom;
    api.syncInlineComposerFormulaValenceStateFromControl = syncInlineComposerFormulaValenceStateFromControl;
    api.collectInlineComposerFormulaStateFromControls = collectInlineComposerFormulaStateFromControls;
    api.refreshInlineComposerControlsFromState = refreshInlineComposerControlsFromState;
    api.bindInlineComposerTransitivitySelect = bindInlineComposerTransitivitySelect;
    api.wrapInlineComposerStateProjection = wrapInlineComposerStateProjection;
    return api;
}

export function installUiEventsGlobals(targetObject = globalThis) {
    const api = createUiEventsApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
