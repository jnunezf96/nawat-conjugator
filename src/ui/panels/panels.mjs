// Native wrapper generated from src/ui/panels/panels.js.

export function createUiPanelsModule(targetObject = globalThis) {
    var NonactiveSelectionContextSignature = "";
    function getObjectCategory(prefix) {
      if (!prefix) {
        return "intransitive";
      }
      if (prefix === "mu") {
        return "reflexive";
      }
      if (prefix === "ta" || prefix === "te") {
        return "indirect";
      }
      return "direct";
    }
    function getObjectValenceCategory(prefix) {
      if (!prefix) {
        return "";
      }
      if (targetObject.NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix)) {
        return "nonspecific";
      }
      if (targetObject.SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
        return "specific";
      }
      return "specific";
    }
    function getValenceCategoryLabel(category, isNawat = false) {
      return category ? targetObject.getLocalizedLabel(targetObject.VALENCE_CATEGORY_LABELS[category], isNawat, "") : "";
    }
    function getObjectValenceLabel(prefix, isNawat = false) {
      const category = getObjectValenceCategory(prefix);
      return getValenceCategoryLabel(category, isNawat);
    }
    function getObjectValenceLabelForGroup(prefixes, isNawat = false) {
      const categories = new Set();
      prefixes.forEach(prefix => {
        const category = getObjectValenceCategory(prefix);
        if (category) {
          categories.add(category);
        }
      });
      if (!categories.size) {
        return "";
      }
      if (categories.size === 1) {
        const only = categories.values().next().value;
        return getValenceCategoryLabel(only, isNawat);
      }
      const ordered = ["specific", "nonspecific"];
      const labels = ordered.filter(category => categories.has(category)).map(category => getValenceCategoryLabel(category, isNawat)).filter(Boolean);
      return labels.join(" / ");
    }
    function hashSignatureToUInt32(signature = "") {
      let hash = 2166136261;
      const text = String(signature || "");
      for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
      }
      return hash >>> 0;
    }
    function normalizePrefixForComboPalette(prefix = "", options = {}) {
      const value = prefix || "";
      if (!value) {
        return "0";
      }
      if (value === targetObject.OBJECT_TOGGLE_ALL) {
        return "*";
      }
      if (options.collapseProjective && targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value)) {
        return "ki";
      }
      if (options.collapseSilentSpecific && targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value)) {
        return "0";
      }
      return value;
    }
    function buildBlockComboPaletteSignature({
      valency = 0,
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      derivationType = "",
      possessorPrefix = "",
      ownership = "",
      mode = "verb"
    }) {
      const hasMixedSelection = [objectPrefix, indirectObjectMarker, thirdObjectMarker, possessorPrefix].some(value => value === targetObject.OBJECT_TOGGLE_ALL);
      if (hasMixedSelection) {
        return "mixed";
      }
      const numericValency = Number.isFinite(Number(valency)) ? Math.max(1, Number(valency)) : 1;
      if (mode === "noun") {
        const normalizedObject = normalizePrefixForComboPalette(objectPrefix);
        const normalizedIndirect = normalizePrefixForComboPalette(indirectObjectMarker);
        const normalizedThird = normalizePrefixForComboPalette(thirdObjectMarker);
        const normalizedPossessor = normalizePrefixForComboPalette(possessorPrefix);
        const normalizedOwnership = ownership ? String(ownership) : "default";
        return `noun|v${numericValency}|${normalizedObject}|${normalizedIndirect}|${normalizedThird}|${normalizedPossessor}|${normalizedOwnership}`;
      }
      if (numericValency >= 4) {
        return `verb|v4|${targetObject.getObj1Obj2Obj3Signature({
          obj1: objectPrefix,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker
        })}`;
      }
      if (numericValency === 3) {
        const normalized = targetObject.resolveDisplayObj1Obj2({
          obj1: objectPrefix,
          obj2: indirectObjectMarker,
          derivationType
        });
        const mainline = normalizePrefixForComboPalette(normalized.obj1 || "", {
          collapseProjective: true
        });
        const shuntline = normalizePrefixForComboPalette(normalized.obj2 || "", {
          collapseProjective: false
        });
        return `verb|v3|${mainline}|${shuntline}`;
      }
      if (numericValency === 2) {
        const normalizedObject = normalizePrefixForComboPalette(objectPrefix, {
          collapseProjective: true
        });
        return `verb|v2|${normalizedObject}`;
      }
      return `verb|v1|${normalizePrefixForComboPalette(objectPrefix, {
        collapseProjective: true
      })}`;
    }
    const COMBO_PALETTE_THEME_HUES = Object.freeze([26,
    // warm earth
    34,
    // sand / ochre
    44,
    // gold
    146,
    // leaf green
    168,
    // accent-cool teal
    186,
    // aqua-teal
    202,
    // direct blue
    342 // reflexive rose
    ]);
    function getComboPaletteSwatch(signature = "") {
      if (!signature || signature === "mixed") {
        return {
          background: "rgba(236, 230, 215, 0.86)",
          border: "rgba(132, 116, 91, 0.52)",
          text: "rgba(64, 53, 38, 0.95)",
          shadow: "0 12px 24px rgba(94, 70, 43, 0.16)"
        };
      }
      const hash = hashSignatureToUInt32(signature);
      const hueBase = COMBO_PALETTE_THEME_HUES[hash % COMBO_PALETTE_THEME_HUES.length];
      const hueShift = (hash >>> 8) % 9 - 4;
      const hue = (hueBase + hueShift + 360) % 360;
      const saturation = 46 + (hash >>> 13) % 10;
      const bgLightness = 90 + (hash >>> 18) % 4;
      const borderLightness = 54 + (hash >>> 22) % 9;
      const textLightness = 23 + (hash >>> 27) % 9;
      const shadowAlpha = 0.12 + (hash >>> 5) % 6 * 0.012;
      return {
        background: `hsl(${hue} ${saturation}% ${bgLightness}%)`,
        border: `hsl(${hue} ${Math.max(34, saturation - 12)}% ${borderLightness}%)`,
        text: `hsl(${hue} ${Math.max(28, saturation - 16)}% ${textLightness}%)`,
        shadow: `0 12px 24px hsla(${hue}, ${Math.max(30, saturation - 14)}%, 34%, ${shadowAlpha.toFixed(3)})`
      };
    }
    function applyTenseBlockComboPalette(tenseBlock, signature = "") {
      if (!tenseBlock) {
        return;
      }
      const normalizedSignature = signature || "mixed";
      const swatch = getComboPaletteSwatch(normalizedSignature);
      tenseBlock.classList.add("tense-block--combo-palette");
      tenseBlock.dataset.comboSignature = normalizedSignature;
      tenseBlock.style.setProperty("--combo-block-bg", swatch.background);
      tenseBlock.style.setProperty("--combo-block-border", swatch.border);
      tenseBlock.style.setProperty("--combo-block-text", swatch.text);
      tenseBlock.style.setProperty("--combo-block-shadow", swatch.shadow);
    }
    function applyObjectSectionCategory(sectionEl, prefix) {
      if (!sectionEl) {
        return;
      }
      sectionEl.classList.remove("object-section--direct", "object-section--indirect", "object-section--reflexive", "object-section--te");
      const category = getObjectCategory(prefix);
      if (category !== "intransitive") {
        sectionEl.classList.add(`object-section--${category}`);
      }
      if (prefix === "te") {
        sectionEl.classList.add("object-section--te");
      }
    }
    function applyConjugationRowClasses(row, objectPrefix) {
      if (!row) {
        return;
      }
      row.classList.add(`conjugation-row--${getObjectCategory(objectPrefix)}`);
      if (objectPrefix === "te") {
        row.classList.add("conjugation-row--te");
      }
    }

    // === UI Panels & Tabs ===
    function renderVerbMirror() {
      return;
    }
    function handleVerbMirrorBeforeInput(event) {
      void event;
    }
    function getVerbPrefixText(rawValue) {
      const raw = String(rawValue || "");
      const match = raw.match(/\[[iy]\]|[a-z0-9]/i);
      if (!match) {
        return raw;
      }
      const index = match.index || 0;
      return index > 0 ? raw.slice(0, index) : "";
    }
    function initUiScaleControl() {
      const scaleInput = targetObject.document.getElementById("ui-scale");
      if (!scaleInput) {
        return;
      }
      const valueEl = targetObject.document.getElementById("ui-scale-value");
      const root = targetObject.document.documentElement;
      const baseAdjustRaw = targetObject.getComputedStyle(root).getPropertyValue("--font-size-adjust");
      const baseAdjust = Number.parseFloat(baseAdjustRaw) || 0;
      const minValue = Number.parseFloat(scaleInput.min) || -6;
      const maxValue = Number.parseFloat(scaleInput.max) || 6;
      const safeMin = Math.max(minValue, -3);
      if (safeMin !== minValue) {
        scaleInput.min = String(safeMin);
      }
      const clampValue = value => Math.min(maxValue, Math.max(safeMin, value));
      const formatValue = value => value > 0 ? `+${value}` : `${value}`;
      const applyScale = offset => {
        const nextAdjust = baseAdjust + offset;
        root.style.setProperty("--font-size-adjust", `${nextAdjust}px`);
        if (valueEl) {
          valueEl.textContent = formatValue(offset);
        }
      };
      let initialOffset = Number.parseFloat(scaleInput.value) || 0;
      try {
        const saved = targetObject.window.localStorage ? targetObject.localStorage.getItem(targetObject.UI_SCALE_STORAGE_KEY) : null;
        if (saved !== null && saved !== "") {
          const savedValue = Number.parseFloat(saved);
          if (!Number.isNaN(savedValue)) {
            initialOffset = savedValue;
          }
        }
      } catch {
        initialOffset = Number.parseFloat(scaleInput.value) || 0;
      }
      initialOffset = clampValue(initialOffset);
      scaleInput.value = String(initialOffset);
      applyScale(initialOffset);
      scaleInput.addEventListener("input", () => {
        const offset = clampValue(Number.parseFloat(scaleInput.value) || 0);
        scaleInput.value = String(offset);
        applyScale(offset);
        try {
          if (targetObject.window.localStorage) {
            targetObject.localStorage.setItem(targetObject.UI_SCALE_STORAGE_KEY, String(offset));
          }
        } catch {
          // Ignore storage failures.
        }
      });
    }
    function normalizeUiDensityMode(mode = "") {
      return mode === targetObject.UI_DENSITY_MODE.advanced ? targetObject.UI_DENSITY_MODE.advanced : targetObject.UI_DENSITY_MODE.simple;
    }
    function getActiveUiDensityMode() {
      if (targetObject.document.body?.classList.contains("is-ui-advanced")) {
        return targetObject.UI_DENSITY_MODE.advanced;
      }
      return targetObject.UI_DENSITY_MODE.simple;
    }
    function filterTenseOrderForUiDensity(tenses = [], mode = targetObject.getActiveTenseMode()) {
      const list = Array.isArray(tenses) ? tenses : [];
      if (getActiveUiDensityMode() !== targetObject.UI_DENSITY_MODE.simple) {
        return list.slice();
      }
      if (mode !== targetObject.TENSE_MODE.verbo) {
        return list.slice();
      }
      return list.filter(tenseValue => !targetObject.UI_DENSITY_ADVANCED_TENSES.has(tenseValue));
    }
    function getUiDensityButtons() {
      return Array.from(targetObject.document.querySelectorAll("[data-ui-density]"));
    }
    function getVerbSourceScopeButtons() {
      return Array.from(targetObject.document.querySelectorAll("[data-verb-source-scope]"));
    }
    function syncVerbSourceScopeControl() {
      const control = targetObject.document.getElementById("verb-source-scope-control");
      const buttons = getVerbSourceScopeButtons();
      const isAdvanced = getActiveUiDensityMode() === targetObject.UI_DENSITY_MODE.advanced;
      const shouldShow = isAdvanced;
      if (control) {
        control.hidden = !shouldShow;
        control.classList.toggle("is-hidden", !shouldShow);
        control.setAttribute("aria-hidden", String(!shouldShow));
        control.setAttribute("aria-disabled", String(!shouldShow));
        control.setAttribute("aria-label", targetObject.getUiCopyLabel("verb-source-scope-label", "Voz"));
      }
      const activeScope = targetObject.getVerbSourceScope();
      buttons.forEach(button => {
        const buttonScope = button.getAttribute("data-verb-source-scope") || "";
        const isActive = buttonScope === activeScope;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.disabled = !shouldShow;
        button.setAttribute("aria-disabled", String(!shouldShow));
      });
    }
    function applyVerbSourceScope(scope, anchor = null) {
      if (scope !== targetObject.VERB_SOURCE_SCOPE.active && scope !== targetObject.VERB_SOURCE_SCOPE.nonactive && scope !== targetObject.VERB_SOURCE_SCOPE.both) {
        return;
      }
      targetObject.setVerbSourceScope(scope, {
        syncLock: true,
        respectLock: false
      });
      const update = () => {
        targetObject.updateCombinedModeTabs();
        syncVerbSourceScopeControl();
        renderTenseTabs();
        const verbMeta = targetObject.getVerbInputMeta();
        targetObject.renderActiveConjugations({
          verb: verbMeta.displayVerb,
          objectPrefix: targetObject.getCurrentObjectPrefix()
        });
      };
      if (anchor) {
        targetObject.preserveViewportAnchorPosition(anchor, update);
        return;
      }
      update();
    }
    function initVerbSourceScopeControl() {
      getVerbSourceScopeButtons().forEach(button => {
        button.addEventListener("click", () => {
          if (getActiveUiDensityMode() !== targetObject.UI_DENSITY_MODE.advanced) {
            return;
          }
          applyVerbSourceScope(button.getAttribute("data-verb-source-scope") || "", button);
        });
      });
      syncVerbSourceScopeControl();
    }
    function captureUiDensityGrammarSnapshot() {
      return {
        tenseMode: targetObject.getActiveTenseMode(),
        combinedMode: targetObject.getCombinedMode(),
        sourceScope: targetObject.getVerbSourceScope(),
        derivationType: targetObject.getActiveDerivationType(),
        nonactiveSuffix: targetObject.getSelectedNonactiveSuffix(),
        selectionState: targetObject.buildConjugationSelectionState()
      };
    }
    function restoreUiDensityGrammarSnapshot(snapshot) {
      if (!snapshot || typeof snapshot !== "object") {
        return false;
      }
      if (Object.values(targetObject.TENSE_MODE).includes(snapshot.tenseMode)) {
        targetObject.setActiveTenseMode(snapshot.tenseMode);
      }
      if (Object.values(targetObject.COMBINED_MODE).includes(snapshot.combinedMode)) {
        targetObject.setCombinedMode(snapshot.combinedMode);
      }
      if (snapshot.sourceScope === targetObject.VERB_SOURCE_SCOPE.active || snapshot.sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive || snapshot.sourceScope === targetObject.VERB_SOURCE_SCOPE.both) {
        targetObject.setVerbSourceScope(snapshot.sourceScope, {
          syncCombinedMode: false
        });
      }
      if (Object.values(targetObject.DERIVATION_TYPE).includes(snapshot.derivationType)) {
        targetObject.setActiveDerivationType(snapshot.derivationType);
        const select = targetObject.document.getElementById("derivation-type");
        if (select) {
          select.value = snapshot.derivationType;
        }
      }
      if (snapshot.nonactiveSuffix === null) {
        targetObject.setSelectedNonactiveSuffix(null);
      } else if (typeof snapshot.nonactiveSuffix === "string") {
        targetObject.setSelectedNonactiveSuffix(snapshot.nonactiveSuffix);
      }
      targetObject.updateTenseModeTabs();
      targetObject.updateDerivationTypeControl();
      renderTenseTabs();
      targetObject.applyConjugationSelectionState(targetObject.extractConjugationSelectionState(snapshot, {
        tenseMode: snapshot.tenseMode,
        tenseValue: snapshot.tenseTab,
        universalTenseValue: snapshot.pretUniversalTab
      }), {
        tenseMode: snapshot.tenseMode,
        availabilityEntries: targetObject.PreteritoUniversalAvailabilityCache
      });
      renderTenseTabs();
      const verbMeta = targetObject.getVerbInputMeta();
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
      targetObject.renderAllOutputs({
        verb: verbMeta.displayVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix(),
        tense: selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue || targetObject.TENSE_ORDER[0] || "presente"
      });
      return true;
    }
    function forceDirectDerivationForSimpleMode() {
      if (targetObject.getActiveDerivationType() === targetObject.DERIVATION_TYPE.direct) {
        return;
      }
      targetObject.setActiveDerivationType(targetObject.DERIVATION_TYPE.direct);
      const select = targetObject.document.getElementById("derivation-type");
      if (select) {
        select.value = targetObject.DERIVATION_TYPE.direct;
      }
      targetObject.updateDerivationTypeControl();
      renderTenseTabs();
      const verbMeta = targetObject.getVerbInputMeta();
      targetObject.renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix()
      });
    }
    function forceSimpleModeGrammarDefaults() {
      const defaultTenseMode = targetObject.TENSE_MODE.verbo;
      if (targetObject.getActiveTenseMode() !== defaultTenseMode) {
        targetObject.setActiveTenseMode(defaultTenseMode);
      }
      if (targetObject.getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.active) {
        targetObject.setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.active, {
          syncCombinedMode: false,
          syncLock: false,
          respectLock: true
        });
      }
      if (targetObject.getCombinedMode() !== targetObject.COMBINED_MODE.active) {
        targetObject.setCombinedMode(targetObject.COMBINED_MODE.active);
        targetObject.updateCombinedModeTabs();
      }
      forceDirectDerivationForSimpleMode();
      targetObject.updateTenseModeTabs();
      renderTenseTabs();
      const verbMeta = targetObject.getVerbInputMeta();
      targetObject.renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix()
      });
    }
    function applyUiDensityMode(mode = "", {
      persist = true
    } = {}) {
      const nextMode = normalizeUiDensityMode(mode);
      const previousMode = getActiveUiDensityMode();
      const enteringSimple = previousMode !== targetObject.UI_DENSITY_MODE.simple && nextMode === targetObject.UI_DENSITY_MODE.simple;
      const leavingSimple = previousMode === targetObject.UI_DENSITY_MODE.simple && nextMode === targetObject.UI_DENSITY_MODE.advanced;
      const body = targetObject.document.body;
      if (body) {
        body.classList.toggle("is-ui-simple", nextMode === targetObject.UI_DENSITY_MODE.simple);
        body.classList.toggle("is-ui-advanced", nextMode === targetObject.UI_DENSITY_MODE.advanced);
      }
      const buttons = getUiDensityButtons();
      buttons.forEach(button => {
        const buttonMode = normalizeUiDensityMode(button.getAttribute("data-ui-density") || "");
        const isActive = buttonMode === nextMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
      if (enteringSimple) {
        targetObject.UiDensityGrammarSnapshot = captureUiDensityGrammarSnapshot();
        forceSimpleModeGrammarDefaults();
      } else if (leavingSimple && targetObject.UiDensityGrammarSnapshot) {
        restoreUiDensityGrammarSnapshot(targetObject.UiDensityGrammarSnapshot);
        targetObject.UiDensityGrammarSnapshot = null;
      } else if (leavingSimple && targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo) {
        targetObject.setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.both, {
          syncCombinedMode: false
        });
      }
      syncVerbSourceScopeControl();
      targetObject.syncComposerSlotChipVisibility();
      targetObject.scheduleComposerSlotChipVisibilitySync();
      targetObject.dispatchAppEvent("app:ui-density-changed", {
        mode: nextMode,
        previousMode
      });
      if (!persist) {
        return;
      }
      try {
        if (targetObject.window.localStorage) {
          targetObject.localStorage.setItem(targetObject.UI_DENSITY_STORAGE_KEY, nextMode);
        }
      } catch {
        // Ignore storage failures.
      }
    }
    function initUiDensityControl() {
      const buttons = getUiDensityButtons();
      let initialMode = targetObject.UI_DENSITY_MODE.simple;
      try {
        const saved = targetObject.window.localStorage ? targetObject.localStorage.getItem(targetObject.UI_DENSITY_STORAGE_KEY) : null;
        if (saved) {
          initialMode = normalizeUiDensityMode(saved);
        }
      } catch {
        initialMode = targetObject.UI_DENSITY_MODE.simple;
      }
      applyUiDensityMode(initialMode, {
        persist: false
      });
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const mode = button.getAttribute("data-ui-density") || "";
          applyUiDensityMode(mode);
        });
      });
    }
    function initZoomFontLock() {
      const isTouchMobile = typeof targetObject.window !== "undefined" && typeof targetObject.window.matchMedia === "function" && targetObject.window.matchMedia("(max-width: 1024px)").matches && ("ontouchstart" in targetObject.window || targetObject.navigator && typeof targetObject.navigator.maxTouchPoints === "number" && targetObject.navigator.maxTouchPoints > 0);
      // On mobile/touch, keep native viewport behavior so manual pinch zoom
      // feels normal and the page does not fight user scale changes.
      if (isTouchMobile) {
        return;
      }
      const root = targetObject.document.documentElement;
      if (!root) {
        return;
      }
      const baseFontSize = Number.parseFloat(targetObject.getComputedStyle(root).fontSize) || 16;
      const baseDpr = targetObject.window.devicePixelRatio || 1;
      const getScale = () => {
        if (targetObject.window.visualViewport && Number.isFinite(targetObject.window.visualViewport.scale)) {
          return targetObject.window.visualViewport.scale;
        }
        const dpr = targetObject.window.devicePixelRatio || 1;
        return dpr / baseDpr;
      };
      const applyScale = () => {
        const scale = getScale();
        if (!scale || !Number.isFinite(scale) || scale <= 0) {
          return;
        }
        root.style.fontSize = `${baseFontSize / scale}px`;
      };
      applyScale();
      targetObject.window.addEventListener("resize", applyScale);
      if (targetObject.window.visualViewport && typeof targetObject.window.visualViewport.addEventListener === "function") {
        targetObject.window.visualViewport.addEventListener("resize", applyScale);
      }
    }
    function registerEscapeOverlayHandler({
      id = "",
      priority = 0,
      isOpen = null,
      onEscape = null
    } = {}) {
      const overlayId = String(id || "");
      if (!overlayId || typeof isOpen !== "function" || typeof onEscape !== "function") {
        return;
      }
      const nextHandler = {
        id: overlayId,
        priority: Number.isFinite(priority) ? priority : 0,
        sequence: ++targetObject.ESCAPE_OVERLAY_HANDLER_SEQUENCE,
        isOpen,
        onEscape
      };
      const existingIndex = targetObject.ESCAPE_OVERLAY_HANDLERS.findIndex(entry => entry.id === overlayId);
      if (existingIndex >= 0) {
        targetObject.ESCAPE_OVERLAY_HANDLERS[existingIndex] = nextHandler;
        return;
      }
      targetObject.ESCAPE_OVERLAY_HANDLERS.push(nextHandler);
    }
    function closeEscapeManagedOverlay(event = null) {
      const handlers = targetObject.ESCAPE_OVERLAY_HANDLERS.filter(entry => entry && typeof entry.isOpen === "function" && entry.isOpen()).sort((left, right) => {
        const priorityDelta = (right.priority || 0) - (left.priority || 0);
        if (priorityDelta !== 0) {
          return priorityDelta;
        }
        return (right.sequence || 0) - (left.sequence || 0);
      });
      for (let index = 0; index < handlers.length; index += 1) {
        const handler = handlers[index];
        if (!handler || typeof handler.onEscape !== "function") {
          continue;
        }
        if (handler.onEscape(event) === false) {
          continue;
        }
        return true;
      }
      return false;
    }
    function initTutorialPanel() {
      const trigger = targetObject.document.getElementById("tutorial-trigger");
      const modal = targetObject.document.getElementById("tutorial-modal");
      if (!trigger || !modal) {
        return;
      }
      const closeButtons = modal.querySelectorAll("[data-tutorial-close]");
      const exampleButtons = modal.querySelectorAll("[data-example]");
      const renderExampleLabels = () => {
        exampleButtons.forEach(button => {
          const value = String(button.getAttribute("data-example") || "").trim();
          if (!value) {
            return;
          }
          const nextLabel = targetObject.serializeRegexInputValue(value);
          if (nextLabel) {
            button.textContent = nextLabel;
          }
        });
      };
      const setModalState = isOpen => {
        modal.classList.toggle("is-open", isOpen);
        modal.setAttribute("aria-hidden", isOpen ? "false" : "true");
        targetObject.document.body.classList.toggle("is-modal-open", isOpen);
      };
      const closeModal = () => setModalState(false);
      const openModal = () => {
        renderExampleLabels();
        setModalState(true);
      };
      trigger.addEventListener("click", openModal);
      closeButtons.forEach(button => {
        button.addEventListener("click", closeModal);
      });
      exampleButtons.forEach(button => {
        button.addEventListener("click", () => {
          const value = button.getAttribute("data-example");
          if (!value) {
            return;
          }
          const verbEl = targetObject.document.getElementById("verb");
          if (verbEl) {
            verbEl.value = targetObject.serializeRegexInputValue(value);
            verbEl.dispatchEvent(new targetObject.Event("input", {
              bubbles: true
            }));
            targetObject.focusVisibleVerbSurfaceAtEnd();
          }
          closeModal();
        });
      });
      renderExampleLabels();
      registerEscapeOverlayHandler({
        id: "tutorial-modal",
        priority: 20,
        isOpen: () => modal.classList.contains("is-open"),
        onEscape: () => {
          closeModal();
          return true;
        }
      });
    }
    function matchesAltShortcutKey(event, key = "") {
      const normalizedKey = String(key || "").toLowerCase();
      if (!normalizedKey) {
        return false;
      }
      const eventKey = String(event?.key || "").toLowerCase();
      const eventCode = String(event?.code || "");
      return eventKey === normalizedKey || eventCode === `Key${normalizedKey.toUpperCase()}`;
    }
    function resolveAltShortcutLegendDescription(definition = {}) {
      if (!definition) {
        return "";
      }
      const directDescription = String(definition.legendDescription || "").trim();
      if (directDescription) {
        return directDescription;
      }
      if (definition.selector) {
        const target = targetObject.document.querySelector(definition.selector);
        const text = String(target?.textContent || "").trim();
        if (text) {
          return text.toLowerCase();
        }
      }
      return String(definition.fallbackDescription || "").trim();
    }
    function buildKeyboardLegendEntries() {
      const baseEntries = targetObject.KEYBOARD_LEGEND_BASE_ENTRIES.map(entry => ({
        ...entry
      }));
      const altEntries = [];
      targetObject.ALT_SHORTCUT_DEFINITIONS.forEach(definition => {
        const description = resolveAltShortcutLegendDescription(definition);
        if (!definition.label || !description) {
          return;
        }
        altEntries.push({
          label: definition.label,
          description
        });
      });
      return [...baseEntries.slice(0, 3), ...altEntries, ...baseEntries.slice(3)];
    }
    function buildKeyboardLegendSections() {
      const entries = buildKeyboardLegendEntries();
      return [{
        title: "Mover",
        entries: entries.filter(entry => ["Tab", "Space", "Enter", "Esc", "Esc x2"].includes(entry.label))
      }, {
        title: "Atajos",
        entries: entries.filter(entry => String(entry.label || "").startsWith("⌥/Alt +"))
      }, {
        title: "Edicion",
        entries: entries.filter(entry => ["Delete / Backspace", "Shift + Delete / Backspace", "⌥/Alt + Delete / Backspace"].includes(entry.label))
      }, {
        title: "Nota",
        entries: entries.filter(entry => entry.label === "Consejo"),
        note: true
      }].filter(section => Array.isArray(section.entries) && section.entries.length);
    }
    function renderKeyboardLegendEntries() {
      const list = targetObject.document.getElementById("keyboard-legend-list");
      if (!list) {
        return;
      }
      list.innerHTML = "";
      const sections = buildKeyboardLegendSections();
      sections.forEach(section => {
        const card = targetObject.document.createElement("section");
        card.className = `keyboard-legend-section${section.note ? " keyboard-legend-section--note" : ""}`;
        const heading = targetObject.document.createElement("h3");
        heading.className = "keyboard-legend-section__title";
        heading.textContent = section.title;
        card.appendChild(heading);
        const sectionList = targetObject.document.createElement("div");
        sectionList.className = "keyboard-legend-section__list";
        section.entries.forEach(entry => {
          const row = targetObject.document.createElement("div");
          row.className = `keyboard-legend-item${section.note ? " keyboard-legend-item--note" : ""}`;
          if (!section.note) {
            const key = targetObject.document.createElement("span");
            key.className = "keyboard-legend-item__key";
            key.textContent = entry.label;
            row.appendChild(key);
          }
          const text = targetObject.document.createElement("span");
          text.className = "keyboard-legend-item__text";
          text.textContent = entry.description;
          row.appendChild(text);
          sectionList.appendChild(row);
        });
        card.appendChild(sectionList);
        list.appendChild(card);
      });
    }
    function resetKeyboardLegendPopoverPosition(panel = null) {
      if (!panel) {
        return;
      }
      panel.style.removeProperty("position");
      panel.style.removeProperty("left");
      panel.style.removeProperty("top");
      panel.style.removeProperty("right");
      panel.style.removeProperty("bottom");
      panel.style.removeProperty("transform");
      panel.style.removeProperty("max-width");
    }
    function positionKeyboardLegendPopover() {
      const trigger = targetObject.document.getElementById("keyboard-legend-trigger");
      const panel = targetObject.document.getElementById("keyboard-legend");
      if (!trigger || !panel || panel.hidden) {
        return;
      }
      if (typeof targetObject.window === "undefined" || typeof targetObject.window.getComputedStyle !== "function") {
        return;
      }
      const isDesktop = typeof targetObject.window.matchMedia === "function" && targetObject.window.matchMedia("(min-width: 769px)").matches;
      if (!isDesktop) {
        resetKeyboardLegendPopoverPosition(panel);
        return;
      }
      const visualViewport = targetObject.window.visualViewport || null;
      const viewportWidth = Math.max(0, Number(visualViewport?.width) || targetObject.window.innerWidth || targetObject.document.documentElement.clientWidth || 0);
      const viewportHeight = Math.max(0, Number(visualViewport?.height) || targetObject.window.innerHeight || targetObject.document.documentElement.clientHeight || 0);
      const viewportOffsetLeft = Number(visualViewport?.offsetLeft) || 0;
      const viewportOffsetTop = Number(visualViewport?.offsetTop) || 0;
      const gap = 8;
      const margin = 16;
      const maxWidth = Math.max(240, viewportWidth - margin * 2);
      panel.style.position = "fixed";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.style.transform = "none";
      panel.style.maxWidth = `${Math.round(maxWidth)}px`;
      const triggerRect = trigger.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const panelWidth = Math.min(panelRect.width || panel.offsetWidth || maxWidth, maxWidth);
      const panelHeight = Math.min(panelRect.height || panel.offsetHeight || 0, Math.max(120, viewportHeight - margin * 2));
      const availableLeft = triggerRect.left - gap - margin;
      const availableRight = viewportWidth - triggerRect.right - gap - margin;
      let left = viewportOffsetLeft + triggerRect.left - gap - panelWidth;
      if (availableLeft < panelWidth && availableRight >= panelWidth) {
        left = viewportOffsetLeft + triggerRect.right + gap;
      } else if (availableLeft < panelWidth && availableRight < panelWidth) {
        left = viewportOffsetLeft + Math.max(margin, Math.min(triggerRect.left + (triggerRect.width - panelWidth) / 2, viewportWidth - margin - panelWidth));
      }
      const minLeft = viewportOffsetLeft + margin;
      const maxLeft = viewportOffsetLeft + viewportWidth - margin - panelWidth;
      left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));
      let top = viewportOffsetTop + triggerRect.top + (triggerRect.height - panelHeight) / 2;
      const minTop = viewportOffsetTop + margin;
      const maxTop = viewportOffsetTop + viewportHeight - margin - panelHeight;
      top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));
      panel.style.left = `${Math.round(left)}px`;
      panel.style.top = `${Math.round(top)}px`;
    }
    function initKeyboardLegendPopover() {
      const trigger = targetObject.document.getElementById("keyboard-legend-trigger");
      const panel = targetObject.document.getElementById("keyboard-legend");
      const closeButton = targetObject.document.getElementById("keyboard-legend-close");
      if (!trigger || !panel) {
        return;
      }
      let isOpen = false;
      const setOpen = (nextOpen, {
        focusTrigger = false
      } = {}) => {
        isOpen = Boolean(nextOpen);
        panel.hidden = !isOpen;
        panel.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
          renderKeyboardLegendEntries();
          if (typeof targetObject.window !== "undefined" && typeof targetObject.window.requestAnimationFrame === "function") {
            targetObject.window.requestAnimationFrame(() => positionKeyboardLegendPopover());
          } else {
            positionKeyboardLegendPopover();
          }
        } else {
          resetKeyboardLegendPopoverPosition(panel);
        }
        targetObject.syncInputPopupOverlayActiveState();
        if (focusTrigger && typeof trigger.focus === "function") {
          trigger.focus({
            preventScroll: true
          });
        }
      };
      const closePopover = ({
        focusTrigger = false
      } = {}) => setOpen(false, {
        focusTrigger
      });
      const togglePopover = () => setOpen(!isOpen);
      trigger.addEventListener("click", event => {
        event.preventDefault();
        togglePopover();
      });
      if (closeButton) {
        closeButton.addEventListener("click", event => {
          event.preventDefault();
          closePopover({
            focusTrigger: true
          });
        });
      }
      targetObject.document.addEventListener("click", event => {
        if (!isOpen) {
          return;
        }
        const target = event.target;
        if (panel.contains(target) || trigger.contains(target)) {
          return;
        }
        closePopover();
      });
      registerEscapeOverlayHandler({
        id: "keyboard-legend",
        priority: 30,
        isOpen: () => isOpen,
        onEscape: () => {
          closePopover({
            focusTrigger: true
          });
          return true;
        }
      });
      const syncPopoverPosition = () => {
        if (!isOpen) {
          return;
        }
        positionKeyboardLegendPopover();
      };
      if (typeof targetObject.window !== "undefined" && typeof targetObject.window.addEventListener === "function") {
        targetObject.window.addEventListener("resize", syncPopoverPosition, {
          passive: true
        });
        targetObject.window.addEventListener("scroll", syncPopoverPosition, {
          passive: true
        });
      }
      if (targetObject.window.visualViewport && typeof targetObject.window.visualViewport.addEventListener === "function") {
        targetObject.window.visualViewport.addEventListener("resize", syncPopoverPosition);
        targetObject.window.visualViewport.addEventListener("scroll", syncPopoverPosition);
      }
      renderKeyboardLegendEntries();
      setOpen(false);
    }
    function resolveNonactiveSuffixOptionMap({
      verbMeta = null,
      verb = "",
      analysisVerb = ""
    } = {}) {
      const isTransitive = targetObject.isNonactiveTransitiveByObj1(targetObject.getCurrentObjectPrefix(), verbMeta);
      const options = targetObject.resolveLiveNonactiveOptions({
        verbMeta,
        verb,
        analysisVerb,
        isTransitive,
        isYawi: verbMeta?.isYawi === true,
        rootPlusYaBase: verbMeta?.rootPlusYaBase
      });
      return targetObject.buildNonactiveOptionMap(options);
    }
    function buildNonactiveSelectionContextSignature({
      verbMeta = null,
      verb = "",
      analysisVerb = ""
    } = {}) {
      const sourceKey = String(verbMeta?.exactBaseVerb || verbMeta?.canonicalRuleBase || verbMeta?.analysisVerb || analysisVerb || verbMeta?.displayVerb || verb || "").trim().toLowerCase();
      const objectPrefix = typeof targetObject.getCurrentObjectPrefix === "function" ? String(targetObject.getCurrentObjectPrefix() || "") : "";
      const derivationType = typeof targetObject.getActiveDerivationType === "function" ? String(targetObject.getActiveDerivationType() || "") : "";
      const transitivity = targetObject.isNonactiveTransitiveByObj1(objectPrefix, verbMeta) ? "transitive" : "intransitive";
      return `${sourceKey}|${derivationType}|${objectPrefix}|${transitivity}|${verbMeta?.isYawi === true ? "yawi" : ""}`;
    }
    function normalizeSelectedNonactiveSuffix(optionMap = new Map(), selectionSignature = "") {
      let selected = targetObject.getSelectedNonactiveSuffix();
      if (selectionSignature && NonactiveSelectionContextSignature && selectionSignature !== NonactiveSelectionContextSignature) {
        selected = null;
        targetObject.setSelectedNonactiveSuffix(null);
      }
      NonactiveSelectionContextSignature = selectionSignature || "";
      if (targetObject.shouldForceAllNonactiveOptions()) {
        selected = null;
        targetObject.setSelectedNonactiveSuffix(null);
      }
      if (selected && !optionMap.has(selected)) {
        selected = null;
        targetObject.setSelectedNonactiveSuffix(null);
      }
      return selected;
    }
    function renderNonactiveTabs({
      verbMeta,
      verb,
      analysisVerb,
      hasVerb,
      endsWithConsonant
    }) {
      const container = targetObject.document.getElementById("nonactive-tabs");
      if (!container) {
        return;
      }
      const previousFocusSuffix = (() => {
        const activeElement = targetObject.document.activeElement;
        if (!activeElement || !container.contains(activeElement)) {
          return "";
        }
        if (typeof activeElement.getAttribute !== "function") {
          return "";
        }
        return activeElement.getAttribute("data-nonactive-suffix") || "";
      })();
      const isNawat = Boolean(targetObject.document.getElementById("language")?.checked);
      const tenseMode = targetObject.getActiveTenseMode();
      const isVerbMode = tenseMode === targetObject.TENSE_MODE.verbo;
      const shouldShowNonactiveTabs = isVerbMode;
      container.setAttribute("role", "tablist");
      container.setAttribute("aria-label", targetObject.getLocalizedLabel({
        labelEs: "Derivación no activa",
        labelNa: "Derivación no activa"
      }, isNawat, "Derivación no activa"));
      container.classList.toggle("is-hidden", !shouldShowNonactiveTabs);
      container.classList.toggle("is-disabled", !shouldShowNonactiveTabs);
      container.setAttribute("aria-hidden", String(!shouldShowNonactiveTabs));
      container.setAttribute("aria-disabled", String(!shouldShowNonactiveTabs));
      if (!shouldShowNonactiveTabs) {
        if (container.childElementCount) {
          container.innerHTML = "";
        }
        targetObject.NonactiveTabsDomSignature = "";
        NonactiveSelectionContextSignature = "";
        return;
      }
      const optionMap = resolveNonactiveSuffixOptionMap({
        verbMeta,
        verb,
        analysisVerb
      });
      const selectionSignature = buildNonactiveSelectionContextSignature({
        verbMeta,
        verb,
        analysisVerb
      });
      let selected = normalizeSelectedNonactiveSuffix(optionMap, selectionSignature);
      const signature = `${isNawat ? "na" : "es"}|${targetObject.NONACTIVE_SUFFIX_ORDER.join(",")}`;
      const existingGrid = container.querySelector(".nonactive-tabs-grid");
      const existingButtons = new Map(Array.from(container.querySelectorAll(".nonactive-tab[data-nonactive-suffix]")).map(button => [button.dataset.nonactiveSuffix || "", button]));
      const canReuseDom = signature === targetObject.NonactiveTabsDomSignature && existingGrid && targetObject.NONACTIVE_SUFFIX_ORDER.every(suffix => existingButtons.has(suffix));
      const applyButtonState = (button, suffix) => {
        if (!button) {
          return;
        }
        const isAvailable = optionMap.has(suffix);
        const isActive = isAvailable && suffix === selected;
        button.disabled = endsWithConsonant || !hasVerb || !isAvailable;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        applyAndrewsTenseAuthorityDataset(button, {
          tenseValue: suffix,
          mode: targetObject.TENSE_MODE.verbo,
          blockKind: "CNV no-activo"
        });
      };
      if (canReuseDom) {
        container.querySelectorAll(".nonactive-tabs-heading").forEach(node => node.remove());
        targetObject.NONACTIVE_SUFFIX_ORDER.forEach(suffix => {
          const button = existingButtons.get(suffix);
          if (!button) {
            return;
          }
          const label = button.querySelector(".tense-tab-label");
          if (label) {
            label.textContent = targetObject.getLocalizedLabel(targetObject.NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix);
          }
          applyButtonState(button, suffix);
        });
        if (previousFocusSuffix) {
          const previousButton = existingGrid.querySelector(`[data-nonactive-suffix="${targetObject.escapeAttributeSelectorValue(previousFocusSuffix)}"]`);
          if (previousButton && !previousButton.disabled && typeof previousButton.focus === "function") {
            previousButton.focus({
              preventScroll: true
            });
          }
        }
        return;
      }
      container.innerHTML = "";
      const grid = targetObject.document.createElement("div");
      grid.className = "nonactive-tabs-grid";
      container.appendChild(grid);
      targetObject.NONACTIVE_SUFFIX_ORDER.forEach(suffix => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "tense-tab nonactive-tab";
        button.dataset.nonactiveSuffix = suffix;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", "false");
        const label = targetObject.document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = targetObject.getLocalizedLabel(targetObject.NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix);
        button.appendChild(label);
        applyButtonState(button, suffix);
        button.addEventListener("click", () => {
          const current = targetObject.getSelectedNonactiveSuffix();
          targetObject.setSelectedNonactiveSuffix(current === suffix ? null : suffix);
          targetObject.preserveViewportAnchorPosition(button, () => {
            renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
        grid.appendChild(button);
      });
      targetObject.NonactiveTabsDomSignature = signature;
      if (previousFocusSuffix) {
        const previousButton = grid.querySelector(`[data-nonactive-suffix="${targetObject.escapeAttributeSelectorValue(previousFocusSuffix)}"]`);
        if (previousButton && !previousButton.disabled && typeof previousButton.focus === "function") {
          previousButton.focus({
            preventScroll: true
          });
        }
      }
    }
    function getPanelConjugationRenderableSurface(result = null) {
      if (!result) {
        return "";
      }
      if (typeof targetObject.getConjugationRenderableSurface === "function") {
        return targetObject.getConjugationRenderableSurface(result);
      }
      return getPanelConjugationRenderableSurfaceForms(result).join(" / ");
    }
    function splitPanelConjugationRenderableSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—");
    }
    function getPanelConjugationRenderableSurfaceForms(result = null) {
      if (!result) {
        return [];
      }
      const grammarFrame = (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitPanelConjugationRenderableSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        forms.push(...result.surfaceForms);
      }
      if (!hasResultFrame && result?.surface) {
        forms.push(result.surface);
      }
      if (!hasResultFrame && result?.result) {
        forms.push(result.result);
      }
      return forms.flatMap(entry => splitPanelConjugationRenderableSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function isConjugationResultVisible({
      result,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      comboObjectPrefix,
      enforceInvalidCombo = true,
      hideReflexive = false
    }) {
      if (!getPanelConjugationRenderableSurface(result)) {
        return false;
      }
      const diagnosticRecord = targetObject.getConjugationMaskState({
        result,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        comboObjectPrefix,
        enforceInvalidCombo
      });
      return diagnosticRecord.hasVisibleResult && !hideReflexive;
    }
    function buildVerbModeGenerateOverride({
      isNonactiveMode = false,
      derivationType = ""
    } = {}) {
      const tenseModeVerb = targetObject.TENSE_MODE.verbo || "verbo";
      const derivationModeActive = targetObject.DERIVATION_MODE.active || "active";
      const derivationModeNonactive = targetObject.DERIVATION_MODE.nonactive || "nonactive";
      const voiceModeActive = targetObject.VOICE_MODE.active || "active";
      const voiceModePassive = targetObject.VOICE_MODE.passive || "passive-impersonal";
      const resolvedDerivationType = Object.values(targetObject.DERIVATION_TYPE).includes(derivationType) ? derivationType : targetObject.getActiveDerivationType();
      return {
        tenseMode: tenseModeVerb,
        derivationMode: isNonactiveMode ? derivationModeNonactive : derivationModeActive,
        voiceMode: isNonactiveMode ? voiceModePassive : voiceModeActive,
        derivationType: resolvedDerivationType
      };
    }
    function buildTenseAvailabilityRecord({
      tenseValue = "",
      combinedMode = targetObject.COMBINED_MODE.active,
      source = "",
      summary = null,
      available = null,
      hasOutput = null
    }) {
      const realizedSummary = summary && typeof summary === "object" ? targetObject.realizeToggleAvailabilitySummary(summary) : null;
      const resolvedHasOutput = typeof hasOutput === "boolean" ? hasOutput : realizedSummary ? realizedSummary.availabilityState === targetObject.CONJUGATION_AVAILABILITY_STATE.viable : null;
      const resolvedAvailable = typeof available === "boolean" ? available : resolvedHasOutput === true ? true : resolvedHasOutput === false ? false : null;
      const availabilityState = realizedSummary ? realizedSummary.availabilityState : resolvedHasOutput === true ? targetObject.CONJUGATION_AVAILABILITY_STATE.viable : resolvedAvailable === false ? targetObject.CONJUGATION_AVAILABILITY_STATE.impossible : "";
      return {
        tenseValue: String(tenseValue || ""),
        combinedMode,
        source: source || "",
        available: resolvedAvailable === true,
        hasOutput: resolvedHasOutput === true,
        availabilityState,
        summary: realizedSummary
      };
    }
    function resolveTenseAvailabilityHasOutput(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      return record.hasOutput === true;
    }
    function resolveTenseAvailabilityIsAvailable(record = null) {
      if (!record || typeof record !== "object") {
        return null;
      }
      return record.available === true;
    }
    function resolveActiveVerbTenseAvailabilityRecord({
      verb,
      tenseValue,
      objectPrefixes,
      subjectSelections,
      availabilityMemo = null,
      availabilityMemoContext = ""
    }) {
      const shouldUseAvailabilityMemo = availabilityMemo instanceof Map;
      const modeOverride = buildVerbModeGenerateOverride({
        isNonactiveMode: false
      });
      let summary = targetObject.createToggleAvailabilityRealizationSummary();
      for (const objectPrefix of objectPrefixes) {
        for (const {
          selection
        } of subjectSelections) {
          const availabilityKey = ["active-availability", availabilityMemoContext, verb || "", tenseValue || "", selection.subjectPrefix || "", selection.subjectSuffix || "", objectPrefix || ""].join("|");
          const availabilityRecord = shouldUseAvailabilityMemo && availabilityMemo.has(availabilityKey) ? availabilityMemo.get(availabilityKey) : (() => {
            const result = targetObject.getCachedSilentGenerateWord({
              silent: true,
              skipValidation: true,
              override: {
                ...modeOverride,
                subjectPrefix: selection.subjectPrefix,
                subjectSuffix: selection.subjectSuffix,
                objectPrefix,
                verb,
                tense: tenseValue
              }
            }) || {};
            const maskState = targetObject.getConjugationMaskState({
              result,
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix
            });
            const evaluation = targetObject.buildConjugationEvaluationRecord({
              result,
              maskState
            });
            if (shouldUseAvailabilityMemo) {
              availabilityMemo.set(availabilityKey, evaluation);
            }
            return evaluation;
          })();
          targetObject.recordToggleAvailabilityRealization(summary, availabilityRecord);
        }
      }
      return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: targetObject.COMBINED_MODE.active,
        source: "verb-active-tense-tab",
        summary
      });
    }
    function resolveNonactiveVerbTenseAvailabilityRecord({
      verb,
      tenseValue,
      objectPrefixGroups,
      activeValency,
      nonactiveAvailableSlots,
      hasPromotableObject,
      fusionMarkers,
      availabilityMemo = null,
      availabilityMemoContext = ""
    }) {
      const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
      const shouldUseAvailabilityMemo = availabilityMemo instanceof Map;
      const modeOverride = buildVerbModeGenerateOverride({
        isNonactiveMode: true
      });
      let summary = targetObject.createToggleAvailabilityRealizationSummary();
      const checkRow = ({
        objectPrefix,
        subjectOverride,
        allowPassiveObject
      }) => {
        const availabilityKey = ["nonactive-availability", availabilityMemoContext, verb || "", tenseValue || "", String(activeValency || 0), String(nonactiveAvailableSlots || 0), hasPromotableObject ? "1" : "0", resolvedFusionMarkers.join(","), objectPrefix || "", subjectOverride?.subjectPrefix || "", subjectOverride?.subjectSuffix || "", allowPassiveObject ? "1" : "0"].join("|");
        if (shouldUseAvailabilityMemo && availabilityMemo.has(availabilityKey)) {
          const cachedRecord = availabilityMemo.get(availabilityKey);
          targetObject.recordToggleAvailabilityRealization(summary, cachedRecord);
          return cachedRecord.hasVisibleResult;
        }
        const overridePayload = {
          ...modeOverride,
          objectPrefix,
          verb,
          tense: tenseValue
        };
        if (subjectOverride) {
          overridePayload.subjectPrefix = subjectOverride.pers1;
          overridePayload.subjectSuffix = subjectOverride.pers2;
          overridePayload.preservePassiveSubject = true;
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          allowPassiveObject,
          override: overridePayload
        }) || {};
        const hideReflexive = !!(result && result.isReflexive && getObjectCategory(objectPrefix) !== "reflexive");
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: subjectOverride?.subjectPrefix || "",
          subjectSuffix: subjectOverride?.subjectSuffix || "",
          objectPrefix
        });
        const evaluation = targetObject.buildConjugationEvaluationRecord({
          result,
          maskState,
          extraDiagnostics: hideReflexive ? [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden, "masked", {
            source: "result"
          })] : []
        });
        targetObject.recordToggleAvailabilityRealization(summary, evaluation);
        if (shouldUseAvailabilityMemo) {
          availabilityMemo.set(availabilityKey, evaluation);
        }
        return evaluation.hasVisibleResult;
      };
      for (const objectGroup of objectPrefixGroups) {
        const {
          prefixes
        } = objectGroup;
        const isDirectGroup = prefixes.every(prefix => targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
        const isPassiveNonactive = isDirectGroup;
        const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
        const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
        const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
        let passiveSubjectPrefixes = allowSubjectToggle ? Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS) : [];
        let objectTogglePrefixes = isDirectGroup && allowObjectToggle ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(targetObject.OBJECT_MARKERS)])) : prefixes;
        if (allowSubjectToggle && allowObjectToggle && resolvedFusionMarkers.length >= 2) {
          const subjectMarker = resolvedFusionMarkers[0];
          const objectMarker = resolvedFusionMarkers[1];
          const constrainedSubject = targetObject.getNonactiveSlotPrefixes(subjectMarker, "subject");
          const constrainedObject = targetObject.getNonactiveSlotPrefixes(objectMarker, "object");
          if (constrainedSubject) {
            passiveSubjectPrefixes = constrainedSubject;
          }
          if (constrainedObject) {
            objectTogglePrefixes = constrainedObject;
          }
        }
        const allowPassiveObject = isDirectGroup && allowObjectToggle;
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        if (forceImpersonal || isIntransitiveOnly) {
          if (checkRow({
            objectPrefix: "",
            subjectOverride: null,
            allowPassiveObject
          })) {
            return buildTenseAvailabilityRecord({
              tenseValue,
              combinedMode: targetObject.COMBINED_MODE.nonactive,
              source: "verb-nonactive-tense-tab",
              summary
            });
          }
          continue;
        }
        if (isDirectGroup) {
          const subjectSelections = passiveSubjectPrefixes.filter(prefix => prefix !== "");
          const objectSelections = allowObjectToggle ? objectTogglePrefixes : [""];
          for (const subjectPrefix of subjectSelections) {
            const subjectOverride = targetObject.getPassiveSubjectOverride(subjectPrefix);
            if (!subjectOverride) {
              continue;
            }
            for (const objectPrefix of objectSelections) {
              if (checkRow({
                objectPrefix,
                subjectOverride,
                allowPassiveObject
              })) {
                return buildTenseAvailabilityRecord({
                  tenseValue,
                  combinedMode: targetObject.COMBINED_MODE.nonactive,
                  source: "verb-nonactive-tense-tab",
                  summary
                });
              }
            }
          }
          continue;
        }
        for (const objectPrefix of prefixes) {
          if (!objectPrefix) {
            continue;
          }
          if (checkRow({
            objectPrefix,
            subjectOverride: null,
            allowPassiveObject: false
          })) {
            return buildTenseAvailabilityRecord({
              tenseValue,
              combinedMode: targetObject.COMBINED_MODE.nonactive,
              source: "verb-nonactive-tense-tab",
              summary
            });
          }
        }
      }
      return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: targetObject.COMBINED_MODE.nonactive,
        source: "verb-nonactive-tense-tab",
        summary
      });
    }
    function buildUnifiedVerbTenseAvailabilityMatrix({
      tenses = [],
      resolveTenseAvailabilityRecord = null
    }) {
      const matrix = new Map([[targetObject.COMBINED_MODE.active, new Map()], [targetObject.COMBINED_MODE.nonactive, new Map()]]);
      if (typeof resolveTenseAvailabilityRecord !== "function") {
        return matrix;
      }
      const list = Array.isArray(tenses) ? tenses : [];
      list.forEach(tenseValue => {
        matrix.get(targetObject.COMBINED_MODE.active).set(tenseValue, resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.active));
        matrix.get(targetObject.COMBINED_MODE.nonactive).set(tenseValue, resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.nonactive));
      });
      return matrix;
    }
    function setTensePresenceBadges(button, {
      active = false,
      nonactive = false
    } = {}) {
      if (!button) {
        return;
      }
      const entries = [{
        key: "active",
        label: "A",
        title: active ? "Activo disponible" : "Activo sin resultado",
        available: active === true
      }, {
        key: "nonactive",
        label: "NA",
        title: nonactive ? "No activo disponible" : "No activo sin resultado",
        available: nonactive === true
      }];
      button.dataset.activePresence = entries[0].available ? "available" : "absent";
      button.dataset.nonactivePresence = entries[1].available ? "available" : "absent";
      if (Number(button.dataset.andrewsRouteSuboperationCount || 0) > 0) {
        Array.from(button.children || []).find(child => child.classList?.contains("tense-tab-presence"))?.remove?.();
        button.dataset.presenceBadgeDisplay = "suppressed-by-andrews-operational-layer";
        return;
      }
      let row = Array.from(button.children || []).find(child => child.classList?.contains("tense-tab-presence"));
      if (!row) {
        row = targetObject.document.createElement("span");
        row.className = "tense-tab-presence";
        row.setAttribute("aria-hidden", "false");
        button.appendChild(row);
      }
      row.innerHTML = "";
      entries.forEach(entry => {
        const badge = targetObject.document.createElement("span");
        badge.className = `tense-tab-presence__badge ${entry.available ? "is-present" : "is-absent"}`;
        badge.dataset.presenceMode = entry.key;
        badge.textContent = entry.label;
        badge.title = entry.title;
        badge.setAttribute("aria-label", entry.title);
        row.appendChild(badge);
      });
    }
    function getSubjectlessNominalSelectionEntry() {
      const thirdSingularSelection = targetObject.getSubjectPersonSelections().find(({
        group,
        selection,
        number
      }) => number === "singular" && group?.id === "third" && selection?.subjectPrefix === "" && selection?.subjectSuffix === "");
      if (thirdSingularSelection) {
        return {
          group: thirdSingularSelection.group || null,
          selection: {
            ...(thirdSingularSelection.selection || {
              subjectPrefix: "",
              subjectSuffix: ""
            })
          },
          number: thirdSingularSelection.number || "",
          useReduplicatedSingularSurface: false
        };
      }
      return {
        group: null,
        selection: {
          subjectPrefix: "",
          subjectSuffix: ""
        },
        number: "",
        useReduplicatedSingularSurface: false
      };
    }
    function buildNominalAvailabilityObjectSlotModels(slotStates = [], {
      includeSlot = null
    } = {}) {
      return (Array.isArray(slotStates) ? slotStates : []).filter(slotState => typeof includeSlot === "function" ? includeSlot(slotState) : true).map(slotState => {
        const toggleValues = Array.isArray(slotState?.toggleValues) && slotState.toggleValues.length ? slotState.toggleValues : [slotState?.activeId || ""];
        return {
          id: slotState?.id || "",
          values: Array.from(new Set(toggleValues.map(value => String(value || ""))))
        };
      });
    }
    function resolveNominalCombinationAvailabilityRecord({
      verb = "",
      tenseValue = "",
      tenseMode = targetObject.getActiveTenseMode(),
      context = null,
      selection = null,
      number = "",
      possessorPrefix = "",
      objectPrefix = "",
      indirectObjectMarker = "",
      thirdObjectMarker = "",
      patientivoSource = null,
      patientivoOwnership = targetObject.DEFAULT_PATIENTIVO_OWNERSHIP,
      patientivoNominalSuffix = null,
      useReduplicatedSingularSurface = false
    }) {
      if (!context || !selection) {
        return buildTenseAvailabilityRecord({
          tenseValue,
          combinedMode: targetObject.COMBINED_MODE.active,
          source: "nominal-combination",
          available: false,
          hasOutput: false
        });
      }
      const isAgentivo = tenseValue === "agentivo";
      const isPatientivo = tenseValue === "patientivo";
      const resolvedPatientivoSource = isPatientivo ? patientivoSource || "imperfectivo" : null;
      const normalizedProbeSelection = targetObject.resolveNominalAvailabilityProbeSelection({
        tenseValue,
        patientivoSource: resolvedPatientivoSource,
        verbMeta: context.verbMeta,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker
      });
      const resolvedObjectPrefix = normalizedProbeSelection.objectPrefix;
      const resolvedIndirectObjectMarker = normalizedProbeSelection.indirectObjectMarker;
      const resolvedThirdObjectMarker = normalizedProbeSelection.thirdObjectMarker;
      const ownershipSelections = isPatientivo && possessorPrefix !== "" && (patientivoOwnership === null || patientivoOwnership === undefined || patientivoOwnership === "") ? targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => entry.id) : [patientivoOwnership || targetObject.DEFAULT_PATIENTIVO_OWNERSHIP];
      const resolvedPatientivoNominalSuffix = targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
      const isPossessed = possessorPrefix !== "";
      let subjectSuffixOverride = "";
      if (tenseMode === targetObject.TENSE_MODE.adjetivo) {
        subjectSuffixOverride = selection?.subjectSuffix || "";
      }
      if ((isAgentivo || isPatientivo) && number === "plural") {
        subjectSuffixOverride = isPossessed ? "p" : "t";
      }
      const summary = targetObject.createToggleAvailabilityRealizationSummary();
      ownershipSelections.forEach(resolvedPatientivoOwnership => {
        let result = {};
        if (context.isInstrumentivo) {
          const instrumentivoMode = possessorPrefix === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo;
          result = targetObject.getInstrumentivoResult({
            rawVerb: verb,
            verbMeta: context.verbMeta,
            subjectPrefix: selection.subjectPrefix,
            subjectSuffix: selection.subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            mode: instrumentivoMode,
            possessivePrefix: possessorPrefix
          }) || {};
        } else if (context.isCalificativoInstrumentivo) {
          result = targetObject.getCalificativoInstrumentivoResult({
            rawVerb: verb,
            verbMeta: context.verbMeta,
            subjectPrefix: selection.subjectPrefix,
            subjectSuffix: selection.subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            possessivePrefix: possessorPrefix
          }) || {};
        } else {
          const nominalDerivationMode = targetObject.getNominalDerivationModeForTense(tenseValue);
          result = targetObject.getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            override: {
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: subjectSuffixOverride,
              objectPrefix: resolvedObjectPrefix,
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              verb,
              tense: tenseValue,
              derivationMode: nominalDerivationMode,
              possessivePrefix: possessorPrefix,
              patientivoOwnership: resolvedPatientivoOwnership,
              patientivoSource: resolvedPatientivoSource,
              patientivoNominalSuffix: resolvedPatientivoNominalSuffix
            }
          }) || {};
          if (useReduplicatedSingularSurface && getPanelConjugationRenderableSurface(result)) {
            const prefixChain = targetObject.buildPrefixedChain({
              pers1: selection.subjectPrefix,
              poseedor: possessorPrefix,
              obj1: targetObject.composeObj1Chain({
                obj1: resolvedObjectPrefix,
                markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                pers1: selection.subjectPrefix
              }),
              tronco: ""
            });
            result = targetObject.buildReduplicatedConjugationResult(result, {
              prefixChain,
              applyMissingPrefixChain: true
            });
          }
        }
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: selection.subjectPrefix,
          subjectSuffix: selection.subjectSuffix,
          objectPrefix: resolvedObjectPrefix,
          possessivePrefix: possessorPrefix,
          indirectObjectMarker: resolvedIndirectObjectMarker,
          derivationType: context.nounObjectSlotSummary?.derivationType,
          comboObjectPrefix: undefined,
          requireDistinctPossessor: isAgentivo || isPatientivo,
          enforceInvalidCombo: !useReduplicatedSingularSurface
        });
        const valence4Violation = (context.nounObjectSlotStates?.length || 0) >= 3 && !targetObject.isValidObj1Obj2Obj3Combo({
          obj1: resolvedObjectPrefix,
          obj2: resolvedIndirectObjectMarker,
          obj3: resolvedThirdObjectMarker
        });
        const evaluation = targetObject.buildConjugationEvaluationRecord({
          result,
          maskState,
          hasValenceStructureError: valence4Violation
        });
        targetObject.recordToggleAvailabilityRealization(summary, evaluation);
      });
      return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: context.combinedMode || targetObject.COMBINED_MODE.active,
        source: "nominal-combination",
        summary
      });
    }
    function resolveLocativoTemporalTenseAvailabilityRecord({
      verb = "",
      combinedMode = targetObject.COMBINED_MODE.active
    }) {
      const isNawat = targetObject.getIsNawat();
      const verbMeta = targetObject.getParsedVerbForTab("noun", verb);
      const possessorValues = targetObject.POSSESSIVE_PREFIXES.map(entry => entry.value).filter(value => value);
      const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      const baseObjectStateKey = targetObject.getObjectStateKey({
        groupKey: `locativo-temporal|${resolvedCombinedMode}|objects`,
        tenseValue: "locativo-temporal",
        mode: "noun"
      });
      const slotBundle = targetObject.buildNounObjectSlotToggleStates({
        verbMeta,
        tenseValue: "locativo-temporal",
        baseObjectStateKey,
        isNawat,
        combinedMode: resolvedCombinedMode
      });
      const mutableSlotStates = (slotBundle?.slotStates || []).map(slot => ({
        ...slot
      }));
      const nonactiveObjectToggleValues = Array.from(targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES).map(value => String(value || "")).filter(Boolean);
      if (resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive && nonactiveObjectToggleValues.length) {
        mutableSlotStates.forEach(slotState => {
          slotState.toggleValues = nonactiveObjectToggleValues;
          slotState.options = targetObject.getObjectToggleOptions(slotState.toggleValues, {
            includeAll: true,
            labelForPrefix: targetObject.getNonspecificToggleLabel,
            isNawat
          });
          slotState.optionMap = new Map(slotState.options.map(entry => [entry.id, entry]));
          slotState.showToggle = slotState.toggleValues.length > 1;
        });
      }
      const evaluateLocativoCombination = ({
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        possessorPrefix = ""
      }) => {
        const result = targetObject.getLocativoTemporalResult({
          rawVerb: verb,
          verbMeta,
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          possessivePrefix: possessorPrefix,
          combinedMode: resolvedCombinedMode
        }) || {};
        const maskState = targetObject.getLocativoTemporalMaskState({
          result,
          objectPrefix
        });
        return targetObject.buildConjugationEvaluationRecord({
          result,
          maskState
        });
      };
      const summary = targetObject.createToggleAvailabilityRealizationSummary();
      if (resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive) {
        const primarySelections = [];
        if ((slotBundle?.availableObjectSlots || 0) <= 0) {
          primarySelections.push({
            objectPrefix: "",
            possessorPrefix: ""
          });
        } else {
          possessorValues.forEach(value => {
            primarySelections.push({
              objectPrefix: targetObject.POSSESSIVE_TO_OBJECT_PREFIX[value] || "",
              possessorPrefix: value || ""
            });
          });
          nonactiveObjectToggleValues.forEach(value => {
            primarySelections.push({
              objectPrefix: value || "",
              possessorPrefix: ""
            });
          });
        }
        const objectSlotModels = buildNominalAvailabilityObjectSlotModels(mutableSlotStates, {
          includeSlot: slotState => slotState.id !== "object"
        });
        for (const selection of primarySelections) {
          targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
            const evaluation = evaluateLocativoCombination({
              objectPrefix: selection.objectPrefix || "",
              indirectObjectMarker: selectedBySlot.object2 || "",
              thirdObjectMarker: selectedBySlot.object3 || "",
              possessorPrefix: selection.possessorPrefix || ""
            });
            targetObject.recordToggleAvailabilityRealization(summary, evaluation);
          });
        }
        return buildTenseAvailabilityRecord({
          tenseValue: "locativo-temporal",
          combinedMode: resolvedCombinedMode,
          source: "locativo-temporal-tense-tab",
          summary
        });
      }
      const possessorSelections = possessorValues.length ? possessorValues : [""];
      const objectSlotModels = buildNominalAvailabilityObjectSlotModels(mutableSlotStates);
      targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
        const objectPrefix = selectedBySlot.object || "";
        const indirectObjectMarker = selectedBySlot.object2 || "";
        const thirdObjectMarker = selectedBySlot.object3 || "";
        possessorSelections.forEach(possessorPrefix => {
          const evaluation = evaluateLocativoCombination({
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            possessorPrefix
          });
          targetObject.recordToggleAvailabilityRealization(summary, evaluation);
        });
      });
      return buildTenseAvailabilityRecord({
        tenseValue: "locativo-temporal",
        combinedMode: resolvedCombinedMode,
        source: "locativo-temporal-tense-tab",
        summary
      });
    }
    function resolveNominalTenseAvailabilityRecord({
      verb = "",
      tenseValue = "",
      tenseMode = targetObject.getActiveTenseMode(),
      combinedMode = targetObject.COMBINED_MODE.active
    }) {
      if (!verb || !targetObject.isNominalTenseMode(tenseMode) || !tenseValue) {
        return null;
      }
      const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      if (!targetObject.isNounTenseVisibleForCombinedMode(tenseValue, resolvedCombinedMode)) {
        return buildTenseAvailabilityRecord({
          tenseValue,
          combinedMode: resolvedCombinedMode,
          source: "nominal-tense-tab",
          available: false,
          hasOutput: false
        });
      }
      if (tenseValue === "locativo-temporal") {
        return resolveLocativoTemporalTenseAvailabilityRecord({
          verb,
          combinedMode: resolvedCombinedMode
        });
      }
      const context = targetObject.buildNounTabRenderContext({
        verb,
        tenseValue
      });
      if (!context || context.resolvedTense !== tenseValue || context.isLocativoTemporal) {
        return buildTenseAvailabilityRecord({
          tenseValue,
          combinedMode: resolvedCombinedMode,
          source: "nominal-tense-tab",
          available: false,
          hasOutput: false
        });
      }
      const subjectSelections = context.isSubjectlessTense ? [getSubjectlessNominalSelectionEntry()] : targetObject.getNominalSubjectSelectionEntries({
        mode: tenseMode,
        tenseValue: context.resolvedTense
      }).filter(({
        selection
      }) => !context.showNonanimateOnly || targetObject.isNonanimatePers1Pers2(selection.subjectPrefix, selection.subjectSuffix));
      const possessorSelections = Array.isArray(context.visiblePossessorValues) && context.visiblePossessorValues.length ? context.visiblePossessorValues : [""];
      const objectSlotModels = buildNominalAvailabilityObjectSlotModels(context.nounObjectSlotStates);
      const patientivoSources = context.resolvedTense === "patientivo" ? ["passive", "impersonal", "perfectivo", "imperfectivo", "tronco-verbal"] : [null];
      const ownershipSelections = context.resolvedTense === "patientivo" ? targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => entry.id) : [targetObject.DEFAULT_PATIENTIVO_OWNERSHIP];
      const summary = targetObject.createToggleAvailabilityRealizationSummary();
      for (const patientivoSource of patientivoSources) {
        for (const patientivoOwnership of ownershipSelections) {
          targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
            const objectPrefix = selectedBySlot.object || "";
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            subjectSelections.forEach(({
              selection,
              number,
              useReduplicatedSingularSurface = false
            }) => {
              possessorSelections.forEach(possessorPrefix => {
                const availabilityRecord = resolveNominalCombinationAvailabilityRecord({
                  verb,
                  tenseValue: context.resolvedTense,
                  tenseMode,
                  context,
                  selection,
                  number,
                  possessorPrefix,
                  objectPrefix,
                  indirectObjectMarker,
                  thirdObjectMarker,
                  patientivoSource,
                  patientivoOwnership,
                  patientivoNominalSuffix: null,
                  useReduplicatedSingularSurface
                });
                targetObject.recordToggleAvailabilityRealization(summary, {
                  availabilityState: availabilityRecord.availabilityState
                });
              });
            });
          });
        }
      }
      return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: resolvedCombinedMode,
        source: "nominal-tense-tab",
        summary
      });
    }
    function getAndrewsFirstTenseTabsAriaLabel(tenseMode = targetObject.TENSE_MODE.verbo) {
      if (tenseMode === targetObject.TENSE_MODE.verbo) {
        return "Ranura tiempo/modo de la CNV";
      }
      if (targetObject.isNominalTenseMode(tenseMode)) {
        return "Función nominal sin ranura tiempo de CNN";
      }
      return "Opciones de salida";
    }
    function getAndrewsFirstUniversalTabsAriaLabel() {
      return "Clases de tronco perfectivo";
    }
    const ANDREWS_TENSE_AUTHORITY_BY_TENSE = Object.freeze({
      presente: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-present",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: presente indicativo, tronco imperfectivo, ranura tiempo Ø."
      }),
      "presente-habitual": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-customary-present",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: presente habitual indicativo sobre tronco imperfectivo."
      }),
      imperfecto: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-past",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: imperfecto indicativo, tronco imperfectivo, morfo ya."
      }),
      futuro: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.2", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-imperfective-future",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: futuro indicativo, tronco imperfectivo, morfo s."
      }),
      preterito: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.2", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-perfective-preterit",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: preterito indicativo, tronco perfectivo, morfo Ø."
      }),
      "pasado-remoto": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.1", "Andrews 5.5", "Andrews 7"]),
        slot: "tns",
        family: "indicative-perfective-distant-past",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 7: pasado remoto indicativo, tronco perfectivo, morfo ka."
      }),
      optativo: Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 5.4.3", "Andrews 5.5", "Andrews 9"]),
        slot: "tns",
        family: "optative-nonpast",
        label: "Andrews logic",
        title: "Andrews Lecciones 5 y 9: optativo no pasado; Nawat no implementa admonitivo."
      }),
      "preterito-universal-1": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-a",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase A de tronco perfectivo."
      }),
      "preterito-universal-2": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-b",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase B de tronco perfectivo."
      }),
      "preterito-universal-4": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-c",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase C de tronco perfectivo."
      }),
      "preterito-universal-3": Object.freeze({
        scope: "andrews-licensed",
        source: "Andrews",
        sourceRefs: Object.freeze(["Andrews 7"]),
        slot: "stem-class",
        family: "perfective-stem-class-d",
        label: "Andrews logic",
        title: "Andrews Leccion 7: clase D de tronco perfectivo."
      }),
      "presente-desiderativo": Object.freeze({
        scope: "nawat-extension",
        source: "Nawat/Pipil orthography evidence",
        sourceRefs: Object.freeze(["not an Andrews tense-tab authority"]),
        slot: "tns",
        family: "nawat-extension-desiderative",
        label: "Nawat extension",
        title: "Extension Nawat/Pipil: visible as surface evidence only; Andrews remains the grammar-logic authority."
      }),
      condicional: Object.freeze({
        scope: "nawat-extension",
        source: "Nawat/Pipil orthography evidence",
        sourceRefs: Object.freeze(["not an Andrews tense-tab authority"]),
        slot: "tns",
        family: "nawat-extension-conditional",
        label: "Nawat extension",
        title: "Extension Nawat/Pipil: visible as surface evidence only; Andrews remains the grammar-logic authority."
      }),
      perfecto: Object.freeze({
        scope: "nawat-extension",
        source: "Nawat/Pipil orthography evidence",
        sourceRefs: Object.freeze(["not an Andrews tense-tab authority"]),
        slot: "tns",
        family: "nawat-extension-perfect",
        label: "Nawat extension",
        title: "Extension Nawat/Pipil: result surface on the CNV shell; not a grammar-logic gate."
      }),
      pluscuamperfecto: Object.freeze({
        scope: "nawat-extension",
        source: "Nawat/Pipil orthography evidence",
        sourceRefs: Object.freeze(["not an Andrews tense-tab authority"]),
        slot: "tns",
        family: "nawat-extension-pluperfect",
        label: "Nawat extension",
        title: "Extension Nawat/Pipil: result surface on the CNV shell; not a grammar-logic gate."
      }),
      "condicional-perfecto": Object.freeze({
        scope: "nawat-extension",
        source: "Nawat/Pipil orthography evidence",
        sourceRefs: Object.freeze(["not an Andrews tense-tab authority"]),
        slot: "tns",
        family: "nawat-extension-conditional-perfect",
        label: "Nawat extension",
        title: "Extension Nawat/Pipil: result surface on the CNV shell; not a grammar-logic gate."
      })
    });
    function cloneAndrewsTenseAuthorityFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        ...frame,
        sourceRefs: Array.isArray(frame.sourceRefs) ? Array.from(frame.sourceRefs) : []
      };
    }
    const ANDREWS_TENSE_ROUTE_AUTHORITY_BY_TENSE = Object.freeze({
      agentivo: Object.freeze({
        routeIds: Object.freeze(["lesson-36-nominalized-vnc", "cnv-predicate-to-cnn-nounstem-nominalization"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "customary-agentive",
        uiHost: "nominal-output-tab"
      }),
      "agentivo-presente": Object.freeze({
        routeIds: Object.freeze(["lesson-36-nominalized-vnc", "cnv-predicate-to-cnn-nounstem-nominalization"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "present-agentive",
        uiHost: "nominal-output-tab"
      }),
      "agentivo-preterito": Object.freeze({
        routeIds: Object.freeze(["lesson-35-preterit-agentive-nominalization", "cnv-predicate-to-cnn-nounstem-nominalization"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "preterit-agentive",
        uiHost: "nominal-output-tab"
      }),
      "agentivo-futuro": Object.freeze({
        routeIds: Object.freeze(["lesson-36-nominalized-vnc", "cnv-predicate-to-cnn-nounstem-nominalization"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "future-agentive",
        uiHost: "nominal-output-tab"
      }),
      "sustantivo-verbal": Object.freeze({
        routeIds: Object.freeze(["lesson-37-deverbal-nounstem", "cnv-core-to-cnn-nounstem-deverbal"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "active-action-nounstem",
        uiHost: "nominal-output-tab"
      }),
      patientivo: Object.freeze({
        routeIds: Object.freeze(["lesson-39-patientive-operations", "cnv-core-to-cnn-nounstem-deverbal"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "patientive-family",
        uiHost: "nominal-output-tab"
      }),
      "patientivo-pasivo": Object.freeze({
        routeIds: Object.freeze(["lesson-39-patientive-operations", "lesson-37-deverbal-nounstem"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "patientivo-passive",
        uiHost: "nominal-output-block-branch"
      }),
      "patientivo-impersonal": Object.freeze({
        routeIds: Object.freeze(["lesson-38-impersonal-patientive", "lesson-39-patientive-operations"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "patientivo-impersonal",
        uiHost: "nominal-output-block-branch"
      }),
      "patientivo-perfectivo": Object.freeze({
        routeIds: Object.freeze(["lesson-39-patientive-operations"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "patientivo-perfective",
        uiHost: "nominal-output-block-branch"
      }),
      "patientivo-imperfectivo": Object.freeze({
        routeIds: Object.freeze(["lesson-39-patientive-operations"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "patientivo-imperfective",
        uiHost: "nominal-output-block-branch"
      }),
      "patientivo-tronco": Object.freeze({
        routeIds: Object.freeze(["lesson-39-patientive-operations", "lesson-37-deverbal-nounstem"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "patientivo-root-stock",
        uiHost: "nominal-output-block-branch"
      }),
      instrumentivo: Object.freeze({
        routeIds: Object.freeze(["lesson-36-nominalized-vnc"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "instrumentive",
        uiHost: "nominal-output-tab"
      }),
      "calificativo-instrumentivo": Object.freeze({
        routeIds: Object.freeze(["lesson-37-deverbal-nounstem", "lesson-39-patientive-operations"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "characteristic-instrumentive",
        uiHost: "nominal-output-tab"
      }),
      "locativo-temporal": Object.freeze({
        routeIds: Object.freeze(["lesson-46-3-1-a-preterit-agentive-locative-nnc", "lesson-36-nominalized-vnc"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "locative-temporal",
        uiHost: "nominal-output-tab"
      }),
      "locativo-agentivo-preterito": Object.freeze({
        routeIds: Object.freeze(["lesson-46-3-1-a-preterit-agentive-locative-nnc", "lesson-35-preterit-agentive-nominalization"]),
        formulaTransition: "CNV->CNN",
        routeBranch: "preterit-agentive-locative",
        uiHost: "nominal-output-tab"
      })
    });
    var AndrewsTenseSourceTargetRouteRegistryCache = null;
    function normalizeAndrewsSourceTargetFormulaType(value = "") {
      return String(value || "").trim().toUpperCase();
    }
    function getAndrewsSourceTargetFormulaTransition(sourceFormulaType = "", targetFormulaType = "") {
      const source = normalizeAndrewsSourceTargetFormulaType(sourceFormulaType);
      const target = normalizeAndrewsSourceTargetFormulaType(targetFormulaType);
      return source && target ? `${source}->${target}` : "";
    }
    function getAndrewsSourceTargetRouteClass(formulaTransition = "") {
      const transition = String(formulaTransition || "").trim().toUpperCase();
      if (transition === "CNV->CNN") {
        return "verbal-source-to-nominal-target";
      }
      if (transition === "CNN->CNN") {
        return "nominal-source-to-nominal-target";
      }
      if (transition === "CNN->CNV") {
        return "nominal-source-to-verbal-target";
      }
      if (transition === "CNV->CNV") {
        return "verbal-source-to-verbal-target";
      }
      if (/CNV\/CNN|CNN\/CNV|CNV\+CNN|CNN\+CNV|CN\+CN/.test(transition)) {
        return "mixed-compound-source-target-route";
      }
      return transition ? "other-source-target-route" : "unclassified-source-target-route";
    }
    function getAndrewsSourceTargetRouteUiHost(formulaTransition = "", requestedHost = "") {
      const explicitHost = String(requestedHost || "").trim();
      if (explicitHost) {
        return explicitHost;
      }
      const transition = String(formulaTransition || "").trim().toUpperCase();
      if (transition === "CNV->CNN") {
        return "nominal-output-tab-or-block";
      }
      if (transition === "CNN->CNN") {
        return "nominal-route-directory-or-output-continuation";
      }
      if (transition === "CNN->CNV") {
        return "andrews-route-directory-or-output-continuation";
      }
      if (transition === "CNV->CNV") {
        return "verb-derivation-controls-or-output-continuation";
      }
      if (getAndrewsSourceTargetRouteClass(transition) === "mixed-compound-source-target-route") {
        return "mixed-compound-route-directory";
      }
      return "andrews-route-diagnostic";
    }
    function getAndrewsSourceTargetRouteRegistryRoutes() {
      if (AndrewsTenseSourceTargetRouteRegistryCache) {
        return AndrewsTenseSourceTargetRouteRegistryCache;
      }
      if (typeof targetObject.buildAndrewsSourceGatedDerivationalRouteRegistry !== "function") {
        return null;
      }
      const registry = targetObject.buildAndrewsSourceGatedDerivationalRouteRegistry();
      const routes = Array.isArray(registry?.routes) ? registry.routes : [];
      AndrewsTenseSourceTargetRouteRegistryCache = {
        registry,
        routes,
        routesById: new Map(routes.map(route => [route.id || route.contractId || "", route]))
      };
      return AndrewsTenseSourceTargetRouteRegistryCache;
    }
    function getAndrewsSourceTargetRouteRegistryMatches(routeIds = []) {
      const registry = getAndrewsSourceTargetRouteRegistryRoutes();
      if (!registry) {
        return [];
      }
      return (Array.isArray(routeIds) ? routeIds : []).map(routeId => registry.routesById.get(routeId)).filter(Boolean);
    }
    function getAndrewsTenseSourceTargetRouteSpec(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const normalizedTense = String(tenseValue || "").trim();
      const normalizedMode = String(mode || "").trim();
      if (normalizedTense === "selection-required") {
        return {
          routeIds: [],
          formulaTransition: "CNV/CNN->CNV/CNN",
          routeBranch: "route-selection-required",
          uiHost: "output-route-selection-gate"
        };
      }
      if (ANDREWS_TENSE_ROUTE_AUTHORITY_BY_TENSE[normalizedTense]) {
        return ANDREWS_TENSE_ROUTE_AUTHORITY_BY_TENSE[normalizedTense];
      }
      if (typeof targetObject.isPredicateNominalTense === "function" && targetObject.isPredicateNominalTense(normalizedTense)) {
        return {
          routeIds: ["lesson-36-nominalized-vnc", "cnv-predicate-to-cnn-nounstem-nominalization"],
          formulaTransition: "CNV->CNN",
          routeBranch: "predicate-nominal",
          uiHost: "nominal-output-tab"
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && typeof targetObject.NONACTIVE_SUFFIX_ORDER !== "undefined" && Array.isArray(targetObject.NONACTIVE_SUFFIX_ORDER) && targetObject.NONACTIVE_SUFFIX_ORDER.includes(normalizedTense)) {
        return {
          routeIds: ["lesson-20-nonactive-verbstem"],
          formulaTransition: "CNV->CNV",
          routeBranch: "nonactive-verbstem",
          uiHost: "verb-derivation-controls-or-output-continuation"
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && normalizedTense) {
        return {
          routeIds: ["lesson-5-intransitive-vnc", "lesson-6-transitive-vnc", "lesson-7-verbstem-class"],
          formulaTransition: "CNV->CNV",
          routeBranch: "finite-cnv-tense-frame",
          uiHost: "verb-tense-tab"
        };
      }
      if (targetObject.isNominalTenseMode(normalizedMode)) {
        return {
          routeIds: ["lesson-12-absolutive-nnc", "lesson-13-possessive-nnc"],
          formulaTransition: "CNN->CNN",
          routeBranch: normalizedTense ? "nominal-cnn-route" : "nominal-cnn-controls",
          uiHost: normalizedTense ? "nominal-output-tab-or-block" : "nominal-controls-block"
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.particula) {
        return {
          routeIds: ["lesson-3-particle-boundary-route"],
          formulaTransition: "PARTICLE_CANDIDATE->PARTICLE_BOUNDARY",
          routeBranch: "particle-boundary",
          uiHost: "particle-boundary-block"
        };
      }
      return {
        routeIds: [],
        formulaTransition: "",
        routeBranch: "",
        uiHost: "andrews-route-diagnostic"
      };
    }
    function getAndrewsTenseSourceTargetRouteAuthorityFrame(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const spec = getAndrewsTenseSourceTargetRouteSpec(tenseValue, mode);
      const routeIds = Array.isArray(spec.routeIds) ? Array.from(spec.routeIds).filter(Boolean) : [];
      const registryMatches = getAndrewsSourceTargetRouteRegistryMatches(routeIds);
      const primaryRoute = registryMatches[0] || null;
      const formulaTransition = primaryRoute?.formulaTransition || spec.formulaTransition || "";
      const [sourceFromTransition = "", targetFromTransition = ""] = formulaTransition.split("->");
      const sourceFormulaType = primaryRoute?.sourceFormulaType || sourceFromTransition || "";
      const targetFormulaType = primaryRoute?.targetFormulaType || targetFromTransition || "";
      const resolvedTransition = formulaTransition || getAndrewsSourceTargetFormulaTransition(sourceFormulaType, targetFormulaType);
      const routeClass = getAndrewsSourceTargetRouteClass(resolvedTransition);
      const uiHost = getAndrewsSourceTargetRouteUiHost(resolvedTransition, spec.uiHost);
      const routeKinds = Array.from(new Set(registryMatches.map(route => route.routeKind || route.operation || "").filter(Boolean)));
      const routeFamilies = Array.from(new Set(registryMatches.map(route => route.routeFamily || "").filter(Boolean)));
      const operationalLayer = getAndrewsCnvCnnOperationalLayerForTense(tenseValue, mode);
      const operationalCoverageAudit = operationalLayer && typeof targetObject.auditAndrewsCnvCnnOperationalLayerCoverage === "function" ? targetObject.auditAndrewsCnvCnnOperationalLayerCoverage(operationalLayer.label || tenseValue) : null;
      const routeSuboperations = Array.isArray(operationalLayer?.operations) ? operationalLayer.operations : [];
      const routeSuboperationItems = routeSuboperations.map(operation => ({
        id: operation.id || "",
        family: operation.family || "",
        andrewsSection: operation.andrewsSection || "",
        operation: operation.operation || "",
        generationStatus: operation.generationStatus || "",
        routeStage: operation.routeStage || ""
      }));
      return {
        authority: "Andrews route registry",
        logicAuthority: "Andrews PDF",
        tenseValue: String(tenseValue || ""),
        mode: String(mode || ""),
        routeIds,
        matchedRouteIds: registryMatches.map(route => route.id || route.contractId || "").filter(Boolean),
        registryStatus: !routeIds.length ? "no-route-id" : registryMatches.length ? "registry-match" : "registry-pending-or-unavailable",
        formulaTransition: resolvedTransition,
        sourceFormulaType,
        targetFormulaType,
        routeClass,
        routeBranch: spec.routeBranch || "",
        uiHost,
        routeFamilies,
        routeKinds,
        sourceGateStatus: primaryRoute?.sourceGate?.status || "",
        sourceEvidenceStatus: primaryRoute?.sourceGate?.evidenceStatus || "",
        generationAllowed: primaryRoute?.generationAllowed === true,
        generationGate: primaryRoute?.generationAllowed === true ? "andrews-route-generation-allowed" : "andrews-route-source-gated-or-diagnostic",
        operationalLayerKind: operationalLayer?.kind || "",
        routeSuboperationCount: operationalLayer?.operationCount || 0,
        routeSuboperationIds: Array.isArray(operationalLayer?.operationIds) ? Array.from(operationalLayer.operationIds) : [],
        routeSuboperationItems,
        routeSuboperationFamilies: Array.from(new Set(routeSuboperations.map(operation => operation.family || "").filter(Boolean))),
        routeSuboperationSections: Array.from(new Set(routeSuboperations.map(operation => operation.andrewsSection || "").filter(Boolean))),
        routeSuboperationSourceRequirementKeys: Array.isArray(operationalLayer?.sourceRequirementKeys) ? Array.from(operationalLayer.sourceRequirementKeys) : [],
        routeSuboperationTransformKeys: Array.isArray(operationalLayer?.transformKeys) ? Array.from(operationalLayer.transformKeys) : [],
        routeSuboperationBuildKeys: Array.isArray(operationalLayer?.buildKeys) ? Array.from(operationalLayer.buildKeys) : [],
        routeSuboperationGeneratedCount: operationalLayer?.generationSummary?.generatedCount || 0,
        routeSuboperationSourceGatedCount: operationalLayer?.generationSummary?.sourceGatedCount || 0,
        routeSuboperationDiagnosticOnlyCount: operationalLayer?.generationSummary?.diagnosticOnlyCount || 0,
        routeSuboperationCoverageAuditKind: operationalCoverageAudit?.kind || "",
        routeSuboperationCoverageComplete: operationalCoverageAudit?.complete === true,
        routeSuboperationExpectedSectionCount: operationalCoverageAudit?.expectedSectionCount || 0,
        routeSuboperationRepresentedSectionCount: operationalCoverageAudit?.representedSectionCount || 0,
        routeSuboperationMissingSectionCount: Array.isArray(operationalCoverageAudit?.missingSections) ? operationalCoverageAudit.missingSections.length : 0,
        routeSuboperationMissingSections: Array.isArray(operationalCoverageAudit?.missingSections) ? Array.from(operationalCoverageAudit.missingSections) : [],
        classicalSpellingRole: "structural-only",
        outputSpellingAuthority: "Nawat/Pipil orthography bridge"
      };
    }
    function getAndrewsCnvCnnOperationalLayerForTense(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const normalizedTense = String(tenseValue || "").trim();
      if (!normalizedTense || typeof targetObject.getAndrewsCnvCnnOperationalLayer !== "function") {
        return null;
      }
      const layer = targetObject.getAndrewsCnvCnnOperationalLayer(normalizedTense);
      if (!layer || !layer.operationCount) {
        return null;
      }
      const normalizedMode = String(mode || "").trim();
      if (!targetObject.isNominalTenseMode(normalizedMode)) {
        return null;
      }
      return layer;
    }
    function getAndrewsCnvCnnOperationalLayerDisplayText(sourceTargetRoute = null) {
      const count = Number(sourceTargetRoute?.routeSuboperationCount || 0);
      if (!count) {
        return "";
      }
      const sections = Array.isArray(sourceTargetRoute.routeSuboperationSections) ? sourceTargetRoute.routeSuboperationSections.slice(0, 3).filter(Boolean) : [];
      const suffix = sections.length ? `: ${sections.join(", ")}` : "";
      return `${count} ops${suffix}`;
    }
    function syncAndrewsTenseOperationalLayerElement(element = null, sourceTargetRoute = null) {
      const count = Number(sourceTargetRoute?.routeSuboperationCount || 0);
      if (!element || typeof element.querySelector !== "function") {
        return;
      }
      if (element.classList?.contains?.("tense-block")) {
        syncAndrewsTenseBlockOperationalLayerElement(element, sourceTargetRoute);
        return;
      }
      if (!element.classList?.contains?.("tense-tab")) {
        return;
      }
      if (count) {
        Array.from(element.children || []).find(child => child.classList?.contains("tense-tab-presence"))?.remove?.();
        if (element.dataset) {
          element.dataset.presenceBadgeDisplay = "suppressed-by-andrews-operational-layer";
        }
      }
      let summary = element.querySelector(":scope > .tense-tab-operational-layer");
      if (!count) {
        summary?.remove?.();
        return;
      }
      if (!summary && typeof targetObject.document !== "undefined" && typeof targetObject.document.createElement === "function") {
        summary = targetObject.document.createElement("span");
        summary.className = "tense-tab-operational-layer";
        summary.setAttribute("aria-hidden", "true");
        element.appendChild(summary);
      }
      if (!summary) {
        return;
      }
      summary.textContent = getAndrewsCnvCnnOperationalLayerDisplayText(sourceTargetRoute);
      summary.title = Array.isArray(sourceTargetRoute.routeSuboperationIds) ? sourceTargetRoute.routeSuboperationIds.join(" | ") : "";
    }
    function syncAndrewsTenseBlockOperationalLayerElement(element = null, sourceTargetRoute = null) {
      const count = Number(sourceTargetRoute?.routeSuboperationCount || 0);
      if (!element || typeof element.querySelector !== "function") {
        return;
      }
      let panel = element.querySelector(":scope > .tense-block-operational-layer");
      if (!count) {
        panel?.remove?.();
        return;
      }
      const title = element.querySelector(":scope > .tense-block__title");
      if (!title || typeof targetObject.document === "undefined" || typeof targetObject.document.createElement !== "function") {
        if (title === null && element.dataset && element.dataset.andrewsOperationalLayerSyncPending !== "true" && typeof targetObject.setTimeout === "function") {
          element.dataset.andrewsOperationalLayerSyncPending = "true";
          targetObject.setTimeout(() => {
            if (element.dataset) {
              element.dataset.andrewsOperationalLayerSyncPending = "";
            }
            syncAndrewsTenseBlockOperationalLayerElement(element, sourceTargetRoute);
          }, 0);
        }
        return;
      }
      if (!panel) {
        panel = targetObject.document.createElement("details");
        panel.className = "tense-block-operational-layer";
        title.insertAdjacentElement("afterend", panel);
      }
      panel.dataset.andrewsOperationalLayer = sourceTargetRoute.operationalLayerKind || "";
      panel.dataset.andrewsRouteSuboperationCount = String(count);
      panel.dataset.andrewsRouteSuboperationIds = Array.isArray(sourceTargetRoute.routeSuboperationIds) ? sourceTargetRoute.routeSuboperationIds.join("|") : "";
      panel.dataset.andrewsRouteSuboperationCoverageComplete = String(sourceTargetRoute.routeSuboperationCoverageComplete === true);
      panel.dataset.andrewsRouteSuboperationMissingSectionCount = String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0);
      panel.innerHTML = "";
      const summary = targetObject.document.createElement("summary");
      summary.className = "tense-block-operational-layer__summary";
      const summaryLabel = targetObject.document.createElement("span");
      summaryLabel.className = "tense-block-operational-layer__summary-label";
      summaryLabel.textContent = "Operaciones";
      const summaryCount = targetObject.document.createElement("span");
      summaryCount.className = "tense-block-operational-layer__summary-count";
      summaryCount.textContent = String(count);
      const summaryCoverage = targetObject.document.createElement("span");
      summaryCoverage.className = "tense-block-operational-layer__summary-coverage";
      summaryCoverage.textContent = sourceTargetRoute.routeSuboperationCoverageComplete ? "cobertura Andrews" : `${sourceTargetRoute.routeSuboperationMissingSectionCount || 0} faltantes`;
      summary.append(summaryLabel, summaryCount, summaryCoverage);
      panel.appendChild(summary);
      const list = targetObject.document.createElement("div");
      list.className = "tense-block-operational-layer__list";
      appendAndrewsOperationalLayerOperationRows(list, sourceTargetRoute, "tense-block-operational-layer");
      panel.appendChild(list);
    }
    function appendAndrewsOperationalLayerOperationRows(list = null, sourceTargetRoute = null, classPrefix = "tense-block-operational-layer") {
      if (!list || typeof targetObject.document === "undefined" || typeof targetObject.document.createElement !== "function") {
        return;
      }
      const items = Array.isArray(sourceTargetRoute.routeSuboperationItems) ? sourceTargetRoute.routeSuboperationItems : [];
      items.forEach(operation => {
        const row = targetObject.document.createElement("div");
        row.className = `${classPrefix}__op`;
        row.dataset.operationId = operation.id || "";
        row.dataset.operationFamily = operation.family || "";
        row.dataset.operationSection = operation.andrewsSection || "";
        row.dataset.operationStatus = operation.generationStatus || "";
        const section = targetObject.document.createElement("span");
        section.className = `${classPrefix}__section`;
        section.textContent = operation.andrewsSection || "";
        const name = targetObject.document.createElement("span");
        name.className = `${classPrefix}__name`;
        name.textContent = operation.operation || operation.id || "";
        const family = targetObject.document.createElement("span");
        family.className = `${classPrefix}__family`;
        family.textContent = operation.family || operation.generationStatus || "";
        row.append(section, name, family);
        list.appendChild(row);
      });
    }
    function syncAndrewsTenseTabsOperationalLayerPanel(root = null, {
      mode = ""
    } = {}) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelector !== "function" || typeof targetObject.document === "undefined" || typeof targetObject.document.createElement !== "function") {
        return null;
      }
      let panel = scope.querySelector(":scope > .tense-tabs-operational-layer-panel");
      const tabs = Array.from(scope.querySelectorAll(".tense-tab--andrews-operational-layer[data-tense-value]"));
      const activeTab = tabs.find(tab => tab.classList?.contains("is-active")) || tabs.find(tab => String(tab.getAttribute?.("aria-selected") || "") === "true") || tabs[0] || null;
      const count = Number(activeTab?.dataset?.andrewsRouteSuboperationCount || 0);
      if (!activeTab || !count) {
        panel?.remove?.();
        return null;
      }
      const descriptor = getAndrewsTenseAuthorityDomDescriptor(activeTab, {
        mode
      });
      const sourceTargetRoute = getAndrewsTenseSourceTargetRouteAuthorityFrame(descriptor.tenseValue, descriptor.mode);
      if (!sourceTargetRoute.routeSuboperationCount) {
        panel?.remove?.();
        return null;
      }
      if (!panel) {
        panel = targetObject.document.createElement("details");
        panel.className = "tense-tabs-operational-layer-panel";
        scope.appendChild(panel);
      }
      panel.dataset.andrewsTenseValue = descriptor.tenseValue;
      panel.dataset.andrewsTenseMode = descriptor.mode;
      panel.dataset.andrewsOperationalLayer = sourceTargetRoute.operationalLayerKind || "";
      panel.dataset.andrewsRouteSuboperationCount = String(sourceTargetRoute.routeSuboperationCount || 0);
      panel.dataset.andrewsRouteSuboperationIds = sourceTargetRoute.routeSuboperationIds.join("|");
      panel.dataset.andrewsRouteSuboperationCoverageComplete = String(sourceTargetRoute.routeSuboperationCoverageComplete === true);
      panel.dataset.andrewsRouteSuboperationMissingSectionCount = String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0);
      panel.innerHTML = "";
      const summary = targetObject.document.createElement("summary");
      summary.className = "tense-tabs-operational-layer-panel__summary";
      const label = targetObject.document.createElement("span");
      label.className = "tense-tabs-operational-layer-panel__label";
      label.textContent = activeTab.querySelector(".tense-tab-label")?.textContent?.trim() || descriptor.tenseValue;
      const countBadge = targetObject.document.createElement("span");
      countBadge.className = "tense-tabs-operational-layer-panel__count";
      countBadge.textContent = `${sourceTargetRoute.routeSuboperationCount} operaciones`;
      const coverageBadge = targetObject.document.createElement("span");
      coverageBadge.className = "tense-tabs-operational-layer-panel__coverage";
      coverageBadge.textContent = sourceTargetRoute.routeSuboperationCoverageComplete ? "cobertura Andrews" : `${sourceTargetRoute.routeSuboperationMissingSectionCount || 0} faltantes`;
      summary.append(label, countBadge, coverageBadge);
      panel.appendChild(summary);
      const list = targetObject.document.createElement("div");
      list.className = "tense-tabs-operational-layer-panel__list";
      appendAndrewsOperationalLayerOperationRows(list, sourceTargetRoute, "tense-tabs-operational-layer-panel");
      panel.appendChild(list);
      return panel;
    }
    function getAndrewsTenseAuthorityFrame(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const normalizedMode = String(mode || "").trim();
      const normalizedTense = String(tenseValue || "").trim();
      if (normalizedTense === "selection-required") {
        return {
          scope: "andrews-output-gate",
          source: "Andrews",
          sourceRefs: ["Andrews output route gate"],
          slot: "route-selection-required",
          family: "output-selection",
          label: "Andrews output gate",
          title: "Output remains blocked until an Andrews-compatible route selection fixes the grammar frame."
        };
      }
      if (targetObject.isNominalTenseMode(normalizedMode)) {
        return {
          scope: "andrews-nominal-route",
          source: "Andrews",
          sourceRefs: ["Andrews nominal CNN route"],
          slot: "no-vnc-tns",
          family: normalizedTense || "nominal-route",
          label: "Andrews nominal route",
          title: "CNN routes do not expose a VNC tense slot; Andrews controls the nominal source route."
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.particula) {
        return {
          scope: "andrews-particle-boundary",
          source: "Andrews",
          sourceRefs: ["Andrews 3"],
          slot: "no-vnc-tns",
          family: normalizedTense || "particle-boundary",
          label: "Andrews particle boundary",
          title: "Particula mode is not a CNV tense route; Andrews controls the particle boundary and Nawat/Pipil realizes spelling only."
        };
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && typeof targetObject.getAndrewsCnvTenseLogicAuthorityFrame === "function") {
        const coreFrame = cloneAndrewsTenseAuthorityFrame(targetObject.getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense));
        if (coreFrame) {
          return coreFrame;
        }
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && typeof targetObject.NONACTIVE_SUFFIX_ORDER !== "undefined" && Array.isArray(targetObject.NONACTIVE_SUFFIX_ORDER) && targetObject.NONACTIVE_SUFFIX_ORDER.includes(normalizedTense)) {
        return {
          scope: "andrews-licensed",
          source: "Andrews",
          sourceRefs: ["Andrews 20"],
          slot: "derived-stem",
          family: "nonactive-verbstem",
          label: "Andrews nonactive logic",
          title: "Andrews Leccion 20: nonactive suffix selection is derived-stem logic, not a Nawat/Pipil evidence gate."
        };
      }
      const directFrame = cloneAndrewsTenseAuthorityFrame(ANDREWS_TENSE_AUTHORITY_BY_TENSE[normalizedTense]);
      if (directFrame) {
        return directFrame;
      }
      return {
        scope: "unknown",
        source: "unclassified",
        sourceRefs: [],
        slot: "andrews-frame-required",
        family: normalizedTense || "unknown",
        label: "unclassified",
        title: "Andrews PDF directs grammar logic; Nawat/Pipil controls spelling realization."
      };
    }
    function getAndrewsTenseGenerationGateFrame(authorityFrame = null) {
      const scope = String(authorityFrame?.scope || "").trim();
      const slot = String(authorityFrame?.slot || "").trim();
      if (scope === "andrews-licensed") {
        return {
          logicRole: slot === "derived-stem" ? "derived-stem-logic-source" : "grammar-logic-source",
          generationGate: "andrews-licensed-generation",
          outputRole: "orthography-realization",
          nawatEvidenceRole: "orthography-realization-only",
          classicalOutputImport: "blocked"
        };
      }
      if (scope === "nawat-extension") {
        return {
          logicRole: "surface-extension-not-grammar-source",
          generationGate: "not-andrews-grammar-gate",
          outputRole: "surface-evidence-only",
          nawatEvidenceRole: "surface-extension-only",
          classicalOutputImport: "blocked"
        };
      }
      if (scope === "andrews-nominal-route") {
        return {
          logicRole: "nominal-route-logic-source",
          generationGate: "andrews-nominal-route-no-vnc-tns",
          outputRole: "orthography-realization",
          nawatEvidenceRole: "orthography-realization-only",
          classicalOutputImport: "blocked"
        };
      }
      if (scope === "andrews-particle-boundary") {
        return {
          logicRole: "particle-boundary-logic-source",
          generationGate: "andrews-particle-boundary-no-vnc-tns",
          outputRole: "orthography-realization",
          nawatEvidenceRole: "orthography-realization-only",
          classicalOutputImport: "blocked"
        };
      }
      if (scope === "andrews-output-gate") {
        return {
          logicRole: "route-selection-gate",
          generationGate: "route-selection-required",
          outputRole: "blocked-until-route-selection",
          nawatEvidenceRole: "not-a-grammar-gate",
          classicalOutputImport: "blocked"
        };
      }
      return {
        logicRole: "andrews-frame-required",
        generationGate: "unclassified-andrews-frame-required",
        outputRole: "blocked-until-andrews-frame",
        nawatEvidenceRole: "not-a-grammar-gate",
        classicalOutputImport: "blocked"
      };
    }
    function getAndrewsTenseGenerationGateValue(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      return getAndrewsTenseGenerationGateFrame(getAndrewsTenseAuthorityFrame(tenseValue, mode)).generationGate || "";
    }
    function isAndrewsCnvTenseGenerationGateAllowed(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      return getAndrewsTenseGenerationGateValue(tenseValue, mode) === "andrews-licensed-generation";
    }
    function getAndrewsTenseAuthorityElementContract(element = null) {
      const classList = element?.classList || null;
      const renderedTag = String(element?.tagName || "").trim().toLowerCase();
      const isTab = !!classList?.contains("tense-tab");
      const isBlock = !!classList?.contains("tense-block");
      if (isTab) {
        return {
          role: "tense-tab",
          contract: "button.tense-tab",
          expectedTag: "button",
          renderedTag,
          diagnostic: renderedTag && renderedTag !== "button" ? "tense-tab-not-button" : ""
        };
      }
      if (isBlock) {
        return {
          role: "tense-block",
          contract: "div.tense-block",
          expectedTag: "div",
          renderedTag,
          diagnostic: renderedTag && renderedTag !== "div" ? "tense-block-not-div" : ""
        };
      }
      return {
        role: "",
        contract: "",
        expectedTag: "",
        renderedTag: "",
        diagnostic: ""
      };
    }
    function getAndrewsTenseExecutorGateFrame(authorityFrame = null) {
      const generationGate = getAndrewsTenseGenerationGateFrame(authorityFrame);
      const gateValue = generationGate?.generationGate || "";
      const generationAllowed = gateValue === "andrews-licensed-generation";
      return {
        generationGate: gateValue,
        routeStage: generationAllowed ? "cnv-finite-output" : "andrews-cnv-tense-logic-gate",
        generationAllowed,
        formulaShellPolicy: generationAllowed ? "formula-shell-allowed" : "blocked-before-formula-shell",
        surfacePolicy: generationAllowed ? "orthography-bridge-required" : "blocked-before-surface",
        fallbackPolicy: generationAllowed ? "surface-output-not-grammar-authority" : "blocked-no-target-stem-fallback"
      };
    }
    function getAndrewsTenseTabSelectionAuthorityState({
      tenseValue = "",
      mode = targetObject.TENSE_MODE.verbo,
      hasOutput = null,
      isAvailable = null,
      endsWithConsonant = false,
      isBlockedNominalTense = false,
      isUniversal = false
    } = {}) {
      const normalizedMode = String(mode || "").trim() || targetObject.TENSE_MODE.verbo;
      const frame = getAndrewsTenseAuthorityFrame(tenseValue, normalizedMode);
      const generationGate = getAndrewsTenseGenerationGateFrame(frame);
      const blockedReasons = [];
      if (endsWithConsonant) {
        blockedReasons.push("input-orthography-boundary");
      }
      if (isBlockedNominalTense) {
        blockedReasons.push("andrews-nominal-source-blocked");
      }
      if (normalizedMode === targetObject.TENSE_MODE.verbo && generationGate.generationGate !== "andrews-licensed-generation") {
        blockedReasons.push(generationGate.generationGate || "not-andrews-grammar-gate");
      }
      if (isUniversal && isAvailable === false) {
        blockedReasons.push("andrews-stem-class-unavailable");
      }
      const outputAvailability = hasOutput === true ? "surface-available" : hasOutput === false ? "surface-unavailable" : "surface-uncomputed";
      const blocked = blockedReasons.length > 0;
      const outputAvailabilityRole = blocked ? "selection-hard-gate" : hasOutput === false ? "orthography-output-probe-not-grammar-gate" : "orthography-realization";
      return {
        frame,
        generationGate,
        selectionGate: blocked ? "blocked" : "selectable",
        blocked,
        disabled: blocked,
        blockedReasons,
        outputAvailability,
        outputAvailabilityRole
      };
    }
    function buildAndrewsTenseTabClickAuthorityModel(selectionTargetFrame = null, diagnosticId = "") {
      const hasSelectionTarget = selectionTargetFrame && typeof selectionTargetFrame === "object" && selectionTargetFrame.kind === "andrews-tense-tab-selection-audit-target-frame";
      const sourceFrame = hasSelectionTarget ? {
        kind: "andrews-tense-tab-click-authority-source-frame",
        version: 1,
        selectionGate: selectionTargetFrame.selectionGate || "",
        selectionBlocked: selectionTargetFrame.blocked === true,
        selectionDisabled: selectionTargetFrame.disabled === true,
        selectionBlockedReasons: String(selectionTargetFrame.selectionBlocked || "").split("|").map(entry => entry.trim()).filter(Boolean),
        selectionAuthority: selectionTargetFrame.selectionAuthority || "",
        selectionLogicAuthority: selectionTargetFrame.selectionLogicAuthority || "",
        selectionGrammarGate: selectionTargetFrame.selectionGrammarGate || "",
        selectionOutputRole: selectionTargetFrame.selectionOutputRole || "",
        selectionOrthographyBoundary: selectionTargetFrame.selectionOrthographyBoundary || "",
        selectionClassicalOutputImport: selectionTargetFrame.selectionClassicalOutputImport || ""
      } : null;
      const blockedReasons = [];
      if (!sourceFrame) {
        blockedReasons.push(diagnosticId || "andrews-selection-audit-operation-frame-missing");
      }
      if (sourceFrame?.selectionGate === "blocked") {
        blockedReasons.push("andrews-selection-gate-blocked");
      }
      if (sourceFrame?.selectionDisabled === true) {
        blockedReasons.push("andrews-selection-disabled");
      }
      sourceFrame?.selectionBlockedReasons.forEach(reason => {
        if (reason && !blockedReasons.includes(reason)) {
          blockedReasons.push(reason);
        }
      });
      const blocked = blockedReasons.length > 0;
      const targetFrame = {
        kind: "andrews-tense-tab-click-authority-target-frame",
        version: 1,
        clickGate: blocked ? "blocked" : "allowed",
        blocked,
        blockedReasons,
        selectionGate: sourceFrame?.selectionGate || "",
        selectionAuthority: sourceFrame?.selectionAuthority || "",
        selectionLogicAuthority: sourceFrame?.selectionLogicAuthority || "",
        selectionGrammarGate: sourceFrame?.selectionGrammarGate || "",
        selectionOutputRole: sourceFrame?.selectionOutputRole || "",
        selectionOrthographyBoundary: sourceFrame?.selectionOrthographyBoundary || "",
        selectionClassicalOutputImport: sourceFrame?.selectionClassicalOutputImport || ""
      };
      return {
        kind: "andrews-tense-tab-click-authority-model",
        version: 1,
        sourceFrame,
        operationFrame: {
          kind: "andrews-tense-tab-click-authority-operation-frame",
          version: 1,
          status: sourceFrame ? "authorized" : "blocked",
          operation: "authorize-tense-tab-click-from-selection-target-frame",
          sourceFrame,
          targetFrame
        },
        targetFrame
      };
    }
    function getAndrewsTenseTabClickAuthorityState(element = null) {
      const selectionModelTarget = getAndrewsTenseTabSelectionAuditModelTarget(element);
      const clickAuthorityModel = buildAndrewsTenseTabClickAuthorityModel(selectionModelTarget.targetFrame, selectionModelTarget.diagnosticId);
      const targetFrame = clickAuthorityModel.targetFrame || {};
      const blockedReasons = Array.isArray(targetFrame.blockedReasons) ? targetFrame.blockedReasons : [];
      return {
        selectionGate: targetFrame.selectionGate || "",
        clickGate: targetFrame.clickGate || "blocked",
        blocked: targetFrame.blocked !== false,
        blockedReasons,
        clickAuthorityModel
      };
    }
    function applyAndrewsTenseTabClickAuthorityDataset(element = null) {
      const state = getAndrewsTenseTabClickAuthorityState(element);
      if (element) {
        Object.defineProperty(element, "andrewsTenseTabClickAuthorityModel", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: state.clickAuthorityModel
        });
      }
      if (element?.dataset) {
        element.dataset.andrewsClickGate = state.clickGate;
        element.dataset.andrewsClickBlocked = state.blockedReasons.join("|");
        element.dataset.andrewsClickAuthority = "Andrews PDF";
      }
      return state;
    }
    function isAndrewsTenseTabClickAllowed(element = null) {
      return getAndrewsTenseTabClickAuthorityState(element).blocked !== true;
    }
    function buildAndrewsTenseTabSelectionAuditModel(state = {}, {
      selected = false,
      ariaSelected = false,
      nativeDisabled = false
    } = {}) {
      const generationGate = state.generationGate && typeof state.generationGate === "object" ? state.generationGate : {};
      const sourceFrame = {
        kind: "andrews-tense-tab-selection-audit-source-frame",
        version: 1,
        selectionGate: state.selectionGate || "",
        blocked: state.blocked === true,
        disabled: state.disabled === true,
        blockedReasons: Array.isArray(state.blockedReasons) ? state.blockedReasons.map(entry => String(entry || "").trim()).filter(Boolean) : [],
        outputAvailability: state.outputAvailability || "",
        outputAvailabilityRole: state.outputAvailabilityRole || "",
        generationGate: generationGate.generationGate || "",
        outputRole: generationGate.outputRole || "",
        classicalOutputImport: generationGate.classicalOutputImport || "blocked",
        orthographyBoundary: "nawat-pipil-realization",
        logicAuthority: "Andrews PDF",
        authority: "Andrews PDF"
      };
      const targetFrame = {
        kind: "andrews-tense-tab-selection-audit-target-frame",
        version: 1,
        selectionGate: sourceFrame.selectionGate,
        selectable: sourceFrame.selectionGate === "selectable",
        blocked: sourceFrame.selectionGate === "blocked",
        selected: Boolean(selected) && sourceFrame.selectionGate !== "blocked",
        ariaSelected: Boolean(ariaSelected) && sourceFrame.selectionGate !== "blocked",
        blockedSelected: false,
        outputProbeOnly: sourceFrame.outputAvailabilityRole === "orthography-output-probe-not-grammar-gate",
        hardGate: sourceFrame.outputAvailabilityRole === "selection-hard-gate",
        disabled: sourceFrame.disabled,
        nativeDisabled: Boolean(nativeDisabled),
        missingSelectionMetadata: false,
        selectionAuthority: sourceFrame.authority,
        selectionLogicAuthority: sourceFrame.logicAuthority,
        selectionGrammarGate: sourceFrame.generationGate,
        selectionOutputRole: sourceFrame.outputRole,
        selectionOrthographyBoundary: sourceFrame.orthographyBoundary,
        selectionClassicalOutputImport: sourceFrame.classicalOutputImport,
        selectionSurfaceProbeRole: sourceFrame.outputAvailabilityRole,
        selectionNawatEvidenceRole: sourceFrame.outputAvailabilityRole,
        selectionBlocked: sourceFrame.blockedReasons.join("|")
      };
      return {
        kind: "andrews-tense-tab-selection-audit-model",
        version: 1,
        sourceFrame,
        operationFrame: {
          kind: "andrews-tense-tab-selection-audit-operation-frame",
          version: 1,
          status: "authorized",
          operation: "audit-tense-tab-selection-from-state-frame",
          sourceFrame,
          targetFrame
        },
        targetFrame
      };
    }
    function getEmptyAndrewsTenseTabSelectionAuditRecord(diagnosticId = "") {
      const diagnostics = diagnosticId ? [diagnosticId] : [];
      return {
        isTab: true,
        selectionGate: "",
        selectable: false,
        blocked: false,
        selected: false,
        ariaSelected: false,
        blockedSelected: false,
        outputProbeOnly: false,
        hardGate: false,
        disabled: false,
        nativeDisabled: false,
        missingSelectionMetadata: true,
        diagnostics,
        ok: diagnostics.length === 0
      };
    }
    function getAndrewsTenseTabSelectionAuditModelTarget(element = null) {
      const model = element?.andrewsTenseTabSelectionAuditModel && typeof element.andrewsTenseTabSelectionAuditModel === "object" ? element.andrewsTenseTabSelectionAuditModel : null;
      const operationFrame = model?.operationFrame && typeof model.operationFrame === "object" ? model.operationFrame : null;
      if (!model || model.kind !== "andrews-tense-tab-selection-audit-model" || !operationFrame || operationFrame.kind !== "andrews-tense-tab-selection-audit-operation-frame" || operationFrame.status !== "authorized" || operationFrame.operation !== "audit-tense-tab-selection-from-state-frame") {
        return {
          targetFrame: null,
          diagnosticId: "andrews-selection-audit-operation-frame-missing"
        };
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      if (!sourceFrame || sourceFrame.kind !== "andrews-tense-tab-selection-audit-source-frame" || !targetFrame || targetFrame.kind !== "andrews-tense-tab-selection-audit-target-frame") {
        return {
          targetFrame: null,
          diagnosticId: "andrews-selection-audit-source-or-target-frame-missing"
        };
      }
      const expected = {
        selectionGate: sourceFrame.selectionGate || "",
        selectable: sourceFrame.selectionGate === "selectable",
        blocked: sourceFrame.selectionGate === "blocked",
        disabled: sourceFrame.disabled === true,
        outputProbeOnly: sourceFrame.outputAvailabilityRole === "orthography-output-probe-not-grammar-gate",
        hardGate: sourceFrame.outputAvailabilityRole === "selection-hard-gate",
        missingSelectionMetadata: false,
        selectionAuthority: sourceFrame.authority || "",
        selectionLogicAuthority: sourceFrame.logicAuthority || "",
        selectionGrammarGate: sourceFrame.generationGate || "",
        selectionOutputRole: sourceFrame.outputRole || "",
        selectionOrthographyBoundary: sourceFrame.orthographyBoundary || "",
        selectionClassicalOutputImport: sourceFrame.classicalOutputImport || "",
        selectionSurfaceProbeRole: sourceFrame.outputAvailabilityRole || "",
        selectionNawatEvidenceRole: sourceFrame.outputAvailabilityRole || "",
        selectionBlocked: Array.isArray(sourceFrame.blockedReasons) ? sourceFrame.blockedReasons.join("|") : ""
      };
      const mismatched = Object.entries(expected).some(([key, expectedValue]) => String(targetFrame[key] ?? "").trim() !== String(expectedValue ?? ""));
      if (mismatched || targetFrame.blocked === true && (targetFrame.selected === true || targetFrame.ariaSelected === true) || targetFrame.blockedSelected !== (targetFrame.blocked === true && targetFrame.selected === true)) {
        return {
          targetFrame: null,
          diagnosticId: "andrews-selection-audit-contradictory-target-frame"
        };
      }
      return {
        targetFrame,
        diagnosticId: ""
      };
    }
    function applyAndrewsTenseTabSelectionAuthorityDataset(element = null, options = {}) {
      if (!element || !element.dataset) {
        return getAndrewsTenseTabSelectionAuthorityState(options);
      }
      const state = getAndrewsTenseTabSelectionAuthorityState(options);
      element.dataset.andrewsSelectionGate = state.selectionGate;
      element.dataset.andrewsSelectionBlocked = state.blockedReasons.join("|");
      element.dataset.andrewsOutputAvailability = state.outputAvailability;
      element.dataset.andrewsOutputAvailabilityRole = state.outputAvailabilityRole;
      element.dataset.andrewsSelectionAuthority = "Andrews PDF";
      element.dataset.andrewsSelectionLogicAuthority = "Andrews PDF";
      element.dataset.andrewsSelectionGrammarGate = state.generationGate?.generationGate || "";
      element.dataset.andrewsSelectionOutputRole = state.generationGate?.outputRole || "";
      element.dataset.andrewsSelectionOrthographyBoundary = "nawat-pipil-realization";
      element.dataset.andrewsSelectionClassicalOutputImport = state.generationGate?.classicalOutputImport || "blocked";
      element.dataset.andrewsSelectionSurfaceProbeRole = state.outputAvailabilityRole;
      element.dataset.andrewsSelectionNawatEvidenceRole = state.outputAvailabilityRole;
      element.dataset.andrewsSelectionDisabled = String(state.disabled);
      if (typeof element.setAttribute === "function") {
        element.setAttribute("aria-disabled", String(state.disabled));
      }
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      if (elementContract.contract === "button.tense-tab" || typeof element.disabled === "boolean") {
        element.disabled = state.disabled;
      }
      const classList = element.classList;
      if (classList?.contains("tense-tab")) {
        if (state.blocked) {
          classList.toggle("is-active", false);
        }
        classList.toggle("tense-tab--andrews-selection-allowed", !state.blocked);
        classList.toggle("tense-tab--andrews-selection-blocked", state.blocked);
        classList.toggle("tense-tab--andrews-output-pending", !state.blocked && state.outputAvailability === "surface-unavailable");
      }
      if (state.blocked && typeof element.setAttribute === "function") {
        element.setAttribute("aria-selected", "false");
      }
      const selectedNow = Boolean(classList?.contains("is-active")) || typeof element.getAttribute === "function" && String(element.getAttribute("aria-selected") || "") === "true";
      const ariaSelectedNow = typeof element.getAttribute === "function" && String(element.getAttribute("aria-selected") || "") === "true";
      const selectionAuditModel = buildAndrewsTenseTabSelectionAuditModel(state, {
        selected: selectedNow,
        ariaSelected: ariaSelectedNow,
        nativeDisabled: element.disabled === true
      });
      Object.defineProperty(element, "andrewsTenseTabSelectionAuditModel", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: selectionAuditModel
      });
      element.dataset.andrewsSelectionSelected = String(selectedNow);
      element.dataset.andrewsSelectionSelectedRole = state.blocked ? "blocked-gate-cannot-be-selected" : "ui-selection-state";
      applyAndrewsTenseTabClickAuthorityDataset(element);
      if (element.dataset.andrewsTenseAuthority) {
        const audit = getAndrewsTenseAuthorityDatasetAuditRecord(element);
        element.dataset.andrewsAuthorityAudit = audit.ok ? "ok" : "diagnostic";
        element.dataset.andrewsAuthorityMissing = audit.missing.join("|");
        element.dataset.andrewsAuthorityDiagnostics = audit.diagnostics.join("|");
        classList?.toggle("tense-tab--andrews-audit-warning", !audit.ok);
      }
      return state;
    }
    function applyAndrewsTenseAuthorityDataset(element = null, {
      tenseValue = "",
      mode = targetObject.TENSE_MODE.verbo,
      blockKind = ""
    } = {}) {
      if (!element || !element.dataset) {
        return null;
      }
      const frame = getAndrewsTenseAuthorityFrame(tenseValue, mode);
      const generationGate = getAndrewsTenseGenerationGateFrame(frame);
      const isCoreCnvMode = String(mode || "") === targetObject.TENSE_MODE.verbo && frame.scope !== "andrews-output-gate";
      const coreFrame = isCoreCnvMode && typeof targetObject.getAndrewsCnvTenseLogicAuthorityFrame === "function" ? targetObject.getAndrewsCnvTenseLogicAuthorityFrame(tenseValue) : null;
      const coreGenerationGate = coreFrame && typeof targetObject.getAndrewsCnvTenseLogicGenerationGateFrame === "function" ? targetObject.getAndrewsCnvTenseLogicGenerationGateFrame(coreFrame) : null;
      const executorGate = coreFrame ? getAndrewsTenseExecutorGateFrame(coreFrame) : null;
      const sourceTargetRoute = getAndrewsTenseSourceTargetRouteAuthorityFrame(tenseValue, mode);
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      const sourceRefs = Array.isArray(frame.sourceRefs) ? frame.sourceRefs.filter(Boolean) : [];
      element.dataset.andrewsTenseValue = String(tenseValue || "");
      element.dataset.andrewsTenseAuthority = frame.scope || "";
      element.dataset.andrewsTenseSource = frame.source || "";
      element.dataset.andrewsTenseSourceRefs = sourceRefs.join("|");
      element.dataset.andrewsTenseSlot = frame.slot || "";
      element.dataset.andrewsTenseFamily = frame.family || "";
      element.dataset.andrewsTenseMode = String(mode || "");
      element.dataset.andrewsGrammarLogicAuthority = "Andrews PDF";
      element.dataset.andrewsClassicalSpellingRole = "structural-only";
      element.dataset.andrewsOrthographyBoundary = "nawat-pipil-realization";
      element.dataset.nawatPipilOutputBoundary = "orthography-realization";
      element.dataset.andrewsOutputSpellingAuthority = "Nawat/Pipil orthography bridge";
      element.dataset.andrewsOrthographyRealizationPath = "andrews-logic-then-nawat-pipil-realization";
      element.dataset.andrewsLogicRole = generationGate.logicRole || "";
      element.dataset.andrewsGenerationGate = generationGate.generationGate || "";
      element.dataset.andrewsOutputRole = generationGate.outputRole || "";
      element.dataset.nawatPipilEvidenceRole = generationGate.nawatEvidenceRole || "";
      element.dataset.classicalOutputImport = generationGate.classicalOutputImport || "blocked";
      element.dataset.andrewsCoreGenerationAuthority = coreFrame?.scope || "";
      element.dataset.andrewsCoreGenerationGate = coreGenerationGate?.generationGate || "";
      element.dataset.andrewsCoreTenseSource = coreFrame?.source || "";
      element.dataset.andrewsCoreTenseSlot = coreFrame?.slot || "";
      element.dataset.andrewsCoreTenseFamily = coreFrame?.family || "";
      element.dataset.andrewsCoreLogicRole = coreGenerationGate?.logicRole || "";
      element.dataset.andrewsCoreOutputRole = coreGenerationGate?.outputRole || "";
      element.dataset.andrewsCoreNawatEvidenceRole = coreGenerationGate?.nawatEvidenceRole || "";
      element.dataset.andrewsCoreClassicalOutputImport = coreGenerationGate?.classicalOutputImport || "";
      element.dataset.andrewsExecutorGenerationGate = executorGate?.generationGate || "";
      element.dataset.andrewsExecutorRouteStage = executorGate?.routeStage || "";
      element.dataset.andrewsExecutorGenerationAllowed = executorGate ? String(executorGate.generationAllowed === true) : "";
      element.dataset.andrewsExecutorFormulaShellPolicy = executorGate?.formulaShellPolicy || "";
      element.dataset.andrewsExecutorSurfacePolicy = executorGate?.surfacePolicy || "";
      element.dataset.andrewsExecutorFallbackPolicy = executorGate?.fallbackPolicy || "";
      element.dataset.andrewsRouteAuthority = sourceTargetRoute.authority || "";
      element.dataset.andrewsRouteLogicAuthority = sourceTargetRoute.logicAuthority || "";
      element.dataset.andrewsSourceTargetRoute = sourceTargetRoute.formulaTransition || "";
      element.dataset.andrewsSourceTargetRouteClass = sourceTargetRoute.routeClass || "";
      element.dataset.andrewsSourceFormulaType = sourceTargetRoute.sourceFormulaType || "";
      element.dataset.andrewsTargetFormulaType = sourceTargetRoute.targetFormulaType || "";
      element.dataset.andrewsRouteRegistryIds = sourceTargetRoute.routeIds.join("|");
      element.dataset.andrewsRouteRegistryMatchedIds = sourceTargetRoute.matchedRouteIds.join("|");
      element.dataset.andrewsRouteRegistryStatus = sourceTargetRoute.registryStatus || "";
      element.dataset.andrewsRouteFamilies = sourceTargetRoute.routeFamilies.join("|");
      element.dataset.andrewsRouteKinds = sourceTargetRoute.routeKinds.join("|");
      element.dataset.andrewsRouteBranch = sourceTargetRoute.routeBranch || "";
      element.dataset.andrewsRouteUiHost = sourceTargetRoute.uiHost || "";
      element.dataset.andrewsRouteSourceGateStatus = sourceTargetRoute.sourceGateStatus || "";
      element.dataset.andrewsRouteSourceEvidenceStatus = sourceTargetRoute.sourceEvidenceStatus || "";
      element.dataset.andrewsRouteGenerationGate = sourceTargetRoute.generationGate || "";
      element.dataset.andrewsRouteGenerationAllowed = String(sourceTargetRoute.generationAllowed === true);
      element.dataset.andrewsRouteClassicalSpellingRole = sourceTargetRoute.classicalSpellingRole || "";
      element.dataset.andrewsRouteOutputSpellingAuthority = sourceTargetRoute.outputSpellingAuthority || "";
      element.dataset.andrewsRouteOperationalLayer = sourceTargetRoute.operationalLayerKind || "";
      element.dataset.andrewsRouteSuboperationCount = String(sourceTargetRoute.routeSuboperationCount || 0);
      element.dataset.andrewsRouteSuboperationIds = sourceTargetRoute.routeSuboperationIds.join("|");
      element.dataset.andrewsRouteSuboperationFamilies = sourceTargetRoute.routeSuboperationFamilies.join("|");
      element.dataset.andrewsRouteSuboperationSections = sourceTargetRoute.routeSuboperationSections.join("|");
      element.dataset.andrewsRouteSuboperationSourceRequirementKeys = sourceTargetRoute.routeSuboperationSourceRequirementKeys.join("|");
      element.dataset.andrewsRouteSuboperationTransformKeys = sourceTargetRoute.routeSuboperationTransformKeys.join("|");
      element.dataset.andrewsRouteSuboperationBuildKeys = sourceTargetRoute.routeSuboperationBuildKeys.join("|");
      element.dataset.andrewsRouteSuboperationGeneratedCount = String(sourceTargetRoute.routeSuboperationGeneratedCount || 0);
      element.dataset.andrewsRouteSuboperationSourceGatedCount = String(sourceTargetRoute.routeSuboperationSourceGatedCount || 0);
      element.dataset.andrewsRouteSuboperationDiagnosticOnlyCount = String(sourceTargetRoute.routeSuboperationDiagnosticOnlyCount || 0);
      element.dataset.andrewsRouteSuboperationCoverageAudit = sourceTargetRoute.routeSuboperationCoverageAuditKind || "";
      element.dataset.andrewsRouteSuboperationCoverageComplete = String(sourceTargetRoute.routeSuboperationCoverageComplete === true);
      element.dataset.andrewsRouteSuboperationExpectedSectionCount = String(sourceTargetRoute.routeSuboperationExpectedSectionCount || 0);
      element.dataset.andrewsRouteSuboperationRepresentedSectionCount = String(sourceTargetRoute.routeSuboperationRepresentedSectionCount || 0);
      element.dataset.andrewsRouteSuboperationMissingSectionCount = String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0);
      element.dataset.andrewsRouteSuboperationMissingSections = sourceTargetRoute.routeSuboperationMissingSections.join("|");
      element.dataset.andrewsAuthorityElementContract = elementContract.contract || "";
      element.dataset.andrewsAuthorityExpectedTag = elementContract.expectedTag || "";
      element.dataset.andrewsAuthorityRenderedTag = elementContract.renderedTag || "";
      if (blockKind) {
        element.dataset.andrewsBlockKind = blockKind;
      }
      const classList = element.classList;
      if (classList?.contains("tense-tab")) {
        classList.toggle("tense-tab--andrews-authority", frame.scope === "andrews-licensed");
        classList.toggle("tense-tab--nawat-extension", frame.scope === "nawat-extension");
        classList.toggle("tense-tab--andrews-nominal-route", frame.scope === "andrews-nominal-route");
        classList.toggle("tense-tab--andrews-particle-boundary", frame.scope === "andrews-particle-boundary");
        classList.toggle("tense-tab--andrews-output-gate", frame.scope === "andrews-output-gate");
        classList.toggle("tense-tab--andrews-generation-gate", generationGate.generationGate === "andrews-licensed-generation");
        classList.toggle("tense-tab--surface-evidence-only", generationGate.outputRole === "surface-evidence-only");
        classList.toggle("tense-tab--andrews-unclassified", frame.scope === "unknown");
        classList.toggle("tense-tab--source-target-cnv-cnn", sourceTargetRoute.formulaTransition === "CNV->CNN");
        classList.toggle("tense-tab--source-target-cnn-cnn", sourceTargetRoute.formulaTransition === "CNN->CNN");
        classList.toggle("tense-tab--source-target-cnn-cnv", sourceTargetRoute.formulaTransition === "CNN->CNV");
        classList.toggle("tense-tab--source-target-cnv-cnv", sourceTargetRoute.formulaTransition === "CNV->CNV");
        classList.toggle("tense-tab--source-target-mixed", sourceTargetRoute.routeClass === "mixed-compound-source-target-route");
        classList.toggle("tense-tab--andrews-operational-layer", Number(sourceTargetRoute.routeSuboperationCount || 0) > 0);
      }
      if (classList?.contains("tense-block")) {
        classList.toggle("tense-block--andrews-authority", frame.scope === "andrews-licensed");
        classList.toggle("tense-block--nawat-extension", frame.scope === "nawat-extension");
        classList.toggle("tense-block--andrews-nominal-route", frame.scope === "andrews-nominal-route");
        classList.toggle("tense-block--andrews-particle-boundary", frame.scope === "andrews-particle-boundary");
        classList.toggle("tense-block--andrews-output-gate", frame.scope === "andrews-output-gate");
        classList.toggle("tense-block--andrews-generation-gate", generationGate.generationGate === "andrews-licensed-generation");
        classList.toggle("tense-block--surface-evidence-only", generationGate.outputRole === "surface-evidence-only");
        classList.toggle("tense-block--andrews-unclassified", frame.scope === "unknown");
        classList.toggle("tense-block--source-target-cnv-cnn", sourceTargetRoute.formulaTransition === "CNV->CNN");
        classList.toggle("tense-block--source-target-cnn-cnn", sourceTargetRoute.formulaTransition === "CNN->CNN");
        classList.toggle("tense-block--source-target-cnn-cnv", sourceTargetRoute.formulaTransition === "CNN->CNV");
        classList.toggle("tense-block--source-target-cnv-cnv", sourceTargetRoute.formulaTransition === "CNV->CNV");
        classList.toggle("tense-block--source-target-mixed", sourceTargetRoute.routeClass === "mixed-compound-source-target-route");
        classList.toggle("tense-block--andrews-operational-layer", Number(sourceTargetRoute.routeSuboperationCount || 0) > 0);
      }
      syncAndrewsTenseOperationalLayerElement(element, sourceTargetRoute);
      const audit = getAndrewsTenseAuthorityDatasetAuditRecord(element);
      element.dataset.andrewsAuthorityAudit = audit.ok ? "ok" : "diagnostic";
      element.dataset.andrewsAuthorityMissing = audit.missing.join("|");
      element.dataset.andrewsAuthorityDiagnostics = audit.diagnostics.join("|");
      if (classList?.contains("tense-tab")) {
        classList.toggle("tense-tab--andrews-audit-warning", !audit.ok);
      }
      if (classList?.contains("tense-block")) {
        classList.toggle("tense-block--andrews-audit-warning", !audit.ok);
      }
      const status = [frame.label, frame.title].filter(Boolean).join(": ");
      if (status) {
        const existingTitle = String(element.title || "").trim();
        const operationalStatus = getAndrewsCnvCnnOperationalLayerDisplayText(sourceTargetRoute);
        const statusWithOperations = operationalStatus ? `${status} ${operationalStatus}` : status;
        element.title = existingTitle && !existingTitle.includes(status) ? `${existingTitle} ${statusWithOperations}` : existingTitle || statusWithOperations;
      }
      return frame;
    }
    function getAndrewsTenseAuthorityExpectedDataset(element = null, {
      mode = "",
      blockKind = ""
    } = {}) {
      if (!element || !element.dataset) {
        return null;
      }
      const descriptor = getAndrewsTenseAuthorityDomDescriptor(element, {
        mode,
        blockKind
      });
      const normalizedMode = String(descriptor.mode || "").trim() || targetObject.TENSE_MODE.verbo;
      const normalizedTense = String(descriptor.tenseValue || "").trim();
      const canCompare = Boolean(normalizedTense) || targetObject.isNominalTenseMode(normalizedMode) || normalizedMode === targetObject.TENSE_MODE.particula;
      if (!canCompare) {
        return null;
      }
      const frame = getAndrewsTenseAuthorityFrame(normalizedTense, normalizedMode);
      const generationGate = getAndrewsTenseGenerationGateFrame(frame);
      const isCoreCnvMode = normalizedMode === targetObject.TENSE_MODE.verbo && frame.scope !== "andrews-output-gate";
      const coreFrame = isCoreCnvMode && typeof targetObject.getAndrewsCnvTenseLogicAuthorityFrame === "function" ? targetObject.getAndrewsCnvTenseLogicAuthorityFrame(normalizedTense) : null;
      const coreGenerationGate = coreFrame && typeof targetObject.getAndrewsCnvTenseLogicGenerationGateFrame === "function" ? targetObject.getAndrewsCnvTenseLogicGenerationGateFrame(coreFrame) : null;
      const executorGate = coreFrame ? getAndrewsTenseExecutorGateFrame(coreFrame) : null;
      const sourceTargetRoute = getAndrewsTenseSourceTargetRouteAuthorityFrame(normalizedTense, normalizedMode);
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      const sourceRefs = Array.isArray(frame.sourceRefs) ? frame.sourceRefs.filter(Boolean) : [];
      return {
        descriptor,
        frame,
        dataset: {
          andrewsTenseValue: normalizedTense,
          andrewsTenseAuthority: frame.scope || "",
          andrewsTenseSource: frame.source || "",
          andrewsTenseSourceRefs: sourceRefs.join("|"),
          andrewsTenseSlot: frame.slot || "",
          andrewsTenseFamily: frame.family || "",
          andrewsTenseMode: normalizedMode,
          andrewsGrammarLogicAuthority: "Andrews PDF",
          andrewsClassicalSpellingRole: "structural-only",
          andrewsOrthographyBoundary: "nawat-pipil-realization",
          nawatPipilOutputBoundary: "orthography-realization",
          andrewsOutputSpellingAuthority: "Nawat/Pipil orthography bridge",
          andrewsOrthographyRealizationPath: "andrews-logic-then-nawat-pipil-realization",
          andrewsLogicRole: generationGate.logicRole || "",
          andrewsGenerationGate: generationGate.generationGate || "",
          andrewsOutputRole: generationGate.outputRole || "",
          nawatPipilEvidenceRole: generationGate.nawatEvidenceRole || "",
          classicalOutputImport: generationGate.classicalOutputImport || "blocked",
          andrewsCoreGenerationAuthority: coreFrame?.scope || "",
          andrewsCoreGenerationGate: coreGenerationGate?.generationGate || "",
          andrewsCoreTenseSource: coreFrame?.source || "",
          andrewsCoreTenseSlot: coreFrame?.slot || "",
          andrewsCoreTenseFamily: coreFrame?.family || "",
          andrewsCoreLogicRole: coreGenerationGate?.logicRole || "",
          andrewsCoreOutputRole: coreGenerationGate?.outputRole || "",
          andrewsCoreNawatEvidenceRole: coreGenerationGate?.nawatEvidenceRole || "",
          andrewsCoreClassicalOutputImport: coreGenerationGate?.classicalOutputImport || "",
          andrewsExecutorGenerationGate: executorGate?.generationGate || "",
          andrewsExecutorRouteStage: executorGate?.routeStage || "",
          andrewsExecutorGenerationAllowed: executorGate ? String(executorGate.generationAllowed === true) : "",
          andrewsExecutorFormulaShellPolicy: executorGate?.formulaShellPolicy || "",
          andrewsExecutorSurfacePolicy: executorGate?.surfacePolicy || "",
          andrewsExecutorFallbackPolicy: executorGate?.fallbackPolicy || "",
          andrewsRouteAuthority: sourceTargetRoute.authority || "",
          andrewsRouteLogicAuthority: sourceTargetRoute.logicAuthority || "",
          andrewsSourceTargetRoute: sourceTargetRoute.formulaTransition || "",
          andrewsSourceTargetRouteClass: sourceTargetRoute.routeClass || "",
          andrewsSourceFormulaType: sourceTargetRoute.sourceFormulaType || "",
          andrewsTargetFormulaType: sourceTargetRoute.targetFormulaType || "",
          andrewsRouteRegistryIds: sourceTargetRoute.routeIds.join("|"),
          andrewsRouteRegistryMatchedIds: sourceTargetRoute.matchedRouteIds.join("|"),
          andrewsRouteRegistryStatus: sourceTargetRoute.registryStatus || "",
          andrewsRouteFamilies: sourceTargetRoute.routeFamilies.join("|"),
          andrewsRouteKinds: sourceTargetRoute.routeKinds.join("|"),
          andrewsRouteBranch: sourceTargetRoute.routeBranch || "",
          andrewsRouteUiHost: sourceTargetRoute.uiHost || "",
          andrewsRouteSourceGateStatus: sourceTargetRoute.sourceGateStatus || "",
          andrewsRouteSourceEvidenceStatus: sourceTargetRoute.sourceEvidenceStatus || "",
          andrewsRouteGenerationGate: sourceTargetRoute.generationGate || "",
          andrewsRouteGenerationAllowed: String(sourceTargetRoute.generationAllowed === true),
          andrewsRouteClassicalSpellingRole: sourceTargetRoute.classicalSpellingRole || "",
          andrewsRouteOutputSpellingAuthority: sourceTargetRoute.outputSpellingAuthority || "",
          andrewsRouteOperationalLayer: sourceTargetRoute.operationalLayerKind || "",
          andrewsRouteSuboperationCount: String(sourceTargetRoute.routeSuboperationCount || 0),
          andrewsRouteSuboperationIds: sourceTargetRoute.routeSuboperationIds.join("|"),
          andrewsRouteSuboperationFamilies: sourceTargetRoute.routeSuboperationFamilies.join("|"),
          andrewsRouteSuboperationSections: sourceTargetRoute.routeSuboperationSections.join("|"),
          andrewsRouteSuboperationSourceRequirementKeys: sourceTargetRoute.routeSuboperationSourceRequirementKeys.join("|"),
          andrewsRouteSuboperationTransformKeys: sourceTargetRoute.routeSuboperationTransformKeys.join("|"),
          andrewsRouteSuboperationBuildKeys: sourceTargetRoute.routeSuboperationBuildKeys.join("|"),
          andrewsRouteSuboperationGeneratedCount: String(sourceTargetRoute.routeSuboperationGeneratedCount || 0),
          andrewsRouteSuboperationSourceGatedCount: String(sourceTargetRoute.routeSuboperationSourceGatedCount || 0),
          andrewsRouteSuboperationDiagnosticOnlyCount: String(sourceTargetRoute.routeSuboperationDiagnosticOnlyCount || 0),
          andrewsRouteSuboperationCoverageAudit: sourceTargetRoute.routeSuboperationCoverageAuditKind || "",
          andrewsRouteSuboperationCoverageComplete: String(sourceTargetRoute.routeSuboperationCoverageComplete === true),
          andrewsRouteSuboperationExpectedSectionCount: String(sourceTargetRoute.routeSuboperationExpectedSectionCount || 0),
          andrewsRouteSuboperationRepresentedSectionCount: String(sourceTargetRoute.routeSuboperationRepresentedSectionCount || 0),
          andrewsRouteSuboperationMissingSectionCount: String(sourceTargetRoute.routeSuboperationMissingSectionCount || 0),
          andrewsRouteSuboperationMissingSections: sourceTargetRoute.routeSuboperationMissingSections.join("|"),
          andrewsAuthorityElementContract: elementContract.contract || "",
          andrewsAuthorityExpectedTag: elementContract.expectedTag || "",
          andrewsAuthorityRenderedTag: elementContract.renderedTag || ""
        }
      };
    }
    function getAndrewsTenseAuthorityCanonicalMismatches(element = null, options = {}) {
      const expected = getAndrewsTenseAuthorityExpectedDataset(element, options);
      if (!expected) {
        return [];
      }
      const dataset = element?.dataset || {};
      return Object.entries(expected.dataset).filter(([key, expectedValue]) => String(dataset[key] || "") !== String(expectedValue || "")).map(([key]) => `${key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}-mismatch`);
    }
    function getAndrewsTenseAuthorityExpectedClasses(element = null, options = {}) {
      const expected = getAndrewsTenseAuthorityExpectedDataset(element, options);
      const classList = element?.classList || null;
      if (!expected || !classList) {
        return null;
      }
      const isTab = classList.contains("tense-tab");
      const isBlock = classList.contains("tense-block");
      if (!isTab && !isBlock) {
        return null;
      }
      const prefix = isTab ? "tense-tab" : "tense-block";
      const scope = expected.frame.scope || "";
      const generationGate = getAndrewsTenseGenerationGateFrame(expected.frame);
      const routeClass = expected.dataset.andrewsSourceTargetRouteClass || "";
      const sourceTargetRoute = expected.dataset.andrewsSourceTargetRoute || "";
      const expectedState = new Map([[`${prefix}--andrews-authority`, scope === "andrews-licensed"], [`${prefix}--nawat-extension`, scope === "nawat-extension"], [`${prefix}--andrews-nominal-route`, scope === "andrews-nominal-route"], [`${prefix}--andrews-particle-boundary`, scope === "andrews-particle-boundary"], [`${prefix}--andrews-output-gate`, scope === "andrews-output-gate"], [`${prefix}--andrews-generation-gate`, generationGate.generationGate === "andrews-licensed-generation"], [`${prefix}--surface-evidence-only`, generationGate.outputRole === "surface-evidence-only"], [`${prefix}--andrews-unclassified`, scope === "unknown"], [`${prefix}--source-target-cnv-cnn`, sourceTargetRoute === "CNV->CNN"], [`${prefix}--source-target-cnn-cnn`, sourceTargetRoute === "CNN->CNN"], [`${prefix}--source-target-cnn-cnv`, sourceTargetRoute === "CNN->CNV"], [`${prefix}--source-target-cnv-cnv`, sourceTargetRoute === "CNV->CNV"], [`${prefix}--source-target-mixed`, routeClass === "mixed-compound-source-target-route"]]);
      return {
        prefix,
        expectedState
      };
    }
    function getAndrewsTenseAuthorityClassMismatches(element = null, options = {}) {
      const expected = getAndrewsTenseAuthorityExpectedClasses(element, options);
      const classList = element?.classList || null;
      if (!expected || !classList) {
        return [];
      }
      return Array.from(expected.expectedState.entries()).filter(([className, shouldHaveClass]) => classList.contains(className) !== shouldHaveClass).map(([className, shouldHaveClass]) => shouldHaveClass ? `${className}-class-missing` : `${className}-class-stale`);
    }
    function getEmptyAndrewsTenseBlockOutputRowAuditRecord(diagnosticId = "") {
      return {
        grammarRouteFamily: "",
        grammarRouteStage: "",
        grammarDiagnosticId: diagnosticId || "andrews-output-row-audit-model-missing",
        grammarLogicAuthority: "",
        grammarSpellingEvidenceRole: "",
        grammarClassicalSpellingRole: "",
        grammarOrthographyBoundary: "",
        grammarSpellingAuthority: "",
        grammarClassicalSurfaceImport: "",
        grammarResultOk: "",
        grammarSourceContextTargetAuthority: "",
        grammarSourceEvidenceTargetAuthority: "",
        grammarGenerationAllowed: ""
      };
    }
    function getAndrewsTenseBlockOutputRowAuditRecord(row = null) {
      const model = row?.andrewsTenseBlockOutputRowAuditModel && typeof row.andrewsTenseBlockOutputRowAuditModel === "object" ? row.andrewsTenseBlockOutputRowAuditModel : null;
      const operationFrame = model?.operationFrame && typeof model.operationFrame === "object" ? model.operationFrame : null;
      if (!model || model.kind !== "andrews-tense-block-output-row-audit-model" || !operationFrame || operationFrame.kind !== "andrews-tense-block-output-row-audit-operation-frame" || operationFrame.status !== "authorized" || operationFrame.operation !== "audit-output-row-from-grammar-frame") {
        return getEmptyAndrewsTenseBlockOutputRowAuditRecord("andrews-output-row-audit-operation-frame-missing");
      }
      const sourceFrame = operationFrame.sourceFrame && typeof operationFrame.sourceFrame === "object" ? operationFrame.sourceFrame : null;
      const targetFrame = operationFrame.targetFrame && typeof operationFrame.targetFrame === "object" ? operationFrame.targetFrame : null;
      if (!sourceFrame || sourceFrame.kind !== "andrews-tense-block-output-row-audit-source-frame" || !targetFrame || targetFrame.kind !== "andrews-tense-block-output-row-audit-target-frame") {
        return getEmptyAndrewsTenseBlockOutputRowAuditRecord("andrews-output-row-audit-source-or-target-frame-missing");
      }
      const expected = {
        grammarRouteFamily: String(sourceFrame.routeContract?.routeFamily || "").trim(),
        grammarRouteStage: String(sourceFrame.routeContract?.routeStage || "").trim(),
        grammarGenerationAllowed: String(sourceFrame.routeContract?.generationAllowed === true),
        grammarDiagnosticId: String(sourceFrame.diagnosticFrame?.diagnosticId || "").trim(),
        grammarLogicAuthority: String(sourceFrame.authorityFrame?.grammarAuthority || "").trim(),
        grammarSpellingEvidenceRole: String(sourceFrame.orthographyFrame?.spellingEvidenceRole || "").trim(),
        grammarClassicalSpellingRole: String(sourceFrame.orthographyFrame?.classicalSpellingRole || "").trim(),
        grammarOrthographyBoundary: String(sourceFrame.orthographyFrame?.orthographyBoundary || "").trim(),
        grammarSpellingAuthority: String(sourceFrame.orthographyFrame?.spellingAuthority || "").trim(),
        grammarClassicalSurfaceImport: String(sourceFrame.orthographyFrame?.classicalSurfaceImport || "").trim(),
        grammarResultOk: String(sourceFrame.resultFrame?.ok === true),
        grammarSourceContextTargetAuthority: String(sourceFrame.authorityFrame?.sourceContextTargetAuthority || "").trim(),
        grammarSourceEvidenceTargetAuthority: String(sourceFrame.authorityFrame?.sourceEvidenceTargetAuthority || "").trim()
      };
      const mismatched = Object.entries(expected).some(([key, expectedValue]) => String(targetFrame[key] || "").trim() !== expectedValue);
      if (mismatched) {
        return getEmptyAndrewsTenseBlockOutputRowAuditRecord("andrews-output-row-audit-contradictory-target-frame");
      }
      return expected;
    }
    function getAndrewsTenseBlockOutputAuditRecord(element = null) {
      const classList = element?.classList || null;
      const isBlock = !!classList?.contains("tense-block");
      const dataset = element?.dataset || {};
      const generationGate = String(dataset.andrewsGenerationGate || "").trim();
      const executorGenerationGate = String(dataset.andrewsExecutorGenerationGate || "").trim();
      const effectiveGenerationGate = executorGenerationGate || generationGate;
      const executorRouteStage = String(dataset.andrewsExecutorRouteStage || "").trim();
      const outputRole = String(dataset.andrewsOutputRole || "").trim();
      const rowNodes = isBlock && typeof element?.querySelectorAll === "function" ? Array.from(element.querySelectorAll(".conjugation-row")) : [];
      const rowCount = rowNodes.length;
      const placeholderCount = isBlock && typeof element?.querySelectorAll === "function" ? Array.from(element.querySelectorAll(".tense-placeholder")).length : 0;
      const rowGrammarRecords = rowNodes.map(row => getAndrewsTenseBlockOutputRowAuditRecord(row));
      const getDistinctRowValues = key => Array.from(new Set(rowGrammarRecords.map(record => String(record[key] || "").trim()).filter(Boolean))).sort();
      const grammarRouteFamilies = getDistinctRowValues("grammarRouteFamily");
      const grammarRouteStages = getDistinctRowValues("grammarRouteStage");
      const grammarDiagnosticIds = getDistinctRowValues("grammarDiagnosticId");
      const grammarLogicAuthorities = getDistinctRowValues("grammarLogicAuthority");
      const grammarSpellingEvidenceRoles = getDistinctRowValues("grammarSpellingEvidenceRole");
      const grammarClassicalSpellingRoles = getDistinctRowValues("grammarClassicalSpellingRole");
      const grammarOrthographyBoundaries = getDistinctRowValues("grammarOrthographyBoundary");
      const grammarSpellingAuthorities = getDistinctRowValues("grammarSpellingAuthority");
      const grammarClassicalSurfaceImports = getDistinctRowValues("grammarClassicalSurfaceImport");
      const grammarResultStates = getDistinctRowValues("grammarResultOk");
      const grammarSourceContextTargetAuthorities = getDistinctRowValues("grammarSourceContextTargetAuthority");
      const grammarSourceEvidenceTargetAuthorities = getDistinctRowValues("grammarSourceEvidenceTargetAuthority");
      const isAndrewsTargetAuthority = (value = "") => String(value || "").includes("Andrews");
      const grammarRouteContractMissingCount = rowGrammarRecords.filter(record => !String(record.grammarRouteFamily || "").trim() || !String(record.grammarRouteStage || "").trim() || !String(record.grammarGenerationAllowed || "").trim()).length;
      const hardBlockedGates = new Set(["not-andrews-grammar-gate", "unclassified-andrews-frame-required", "route-selection-required"]);
      const hardBlockedRouteStages = new Set(["andrews-cnv-tense-logic-gate"]);
      const grammarGenerationAllowedCount = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "true").length;
      const grammarGenerationBlockedRowCount = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "false").length;
      const blockedGrammarRows = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "false");
      const generatedGrammarRows = rowGrammarRecords.filter(record => String(record.grammarGenerationAllowed || "") === "true");
      const grammarBlockedResultOkCount = blockedGrammarRows.filter(record => String(record.grammarResultOk || "").trim() === "true").length;
      const grammarGeneratedBlockedRouteContractCount = generatedGrammarRows.filter(record => hardBlockedRouteStages.has(String(record.grammarRouteStage || "").trim()) || hardBlockedGates.has(String(record.grammarDiagnosticId || "").trim())).length;
      const grammarGeneratedResultNotOkCount = generatedGrammarRows.filter(record => String(record.grammarResultOk || "").trim() !== "true").length;
      const grammarLogicAuthorityMissingCount = generatedGrammarRows.filter(record => String(record.grammarLogicAuthority || "").trim() !== "Andrews").length;
      const grammarSpellingEvidenceRoleMismatchCount = generatedGrammarRows.filter(record => String(record.grammarSpellingEvidenceRole || "").trim() !== "orthography-realization-only").length;
      const grammarSourceContextAuthorityMismatchCount = generatedGrammarRows.filter(record => {
        const value = String(record.grammarSourceContextTargetAuthority || "").trim();
        return value && !isAndrewsTargetAuthority(value);
      }).length;
      const grammarSourceEvidenceAuthorityMismatchCount = generatedGrammarRows.filter(record => {
        const value = String(record.grammarSourceEvidenceTargetAuthority || "").trim();
        return value && !isAndrewsTargetAuthority(value);
      }).length;
      const grammarClassicalSpellingRoleMismatchCount = generatedGrammarRows.filter(record => String(record.grammarClassicalSpellingRole || "").trim() !== "structural-only").length;
      const grammarOrthographyBoundaryMissingCount = generatedGrammarRows.filter(record => String(record.grammarOrthographyBoundary || "").trim() !== "nawat-pipil-realization").length;
      const grammarSpellingAuthorityMismatchCount = generatedGrammarRows.filter(record => !String(record.grammarSpellingAuthority || "").trim().startsWith("Nawat/Pipil orthography")).length;
      const grammarClassicalSurfaceImportNotBlockedCount = generatedGrammarRows.filter(record => String(record.grammarClassicalSurfaceImport || "").trim() !== "blocked").length;
      const hardBlocked = isBlock && hardBlockedGates.has(effectiveGenerationGate);
      const diagnostics = [];
      if (hardBlocked && rowCount > 0) {
        diagnostics.push("blocked-andrews-generation-block-has-output-rows");
      }
      if (hardBlocked && grammarGenerationAllowedCount > 0) {
        diagnostics.push("blocked-andrews-generation-block-has-allowed-route-rows");
      }
      if (grammarRouteContractMissingCount > 0) {
        diagnostics.push("output-row-missing-andrews-route-contract");
      }
      if (grammarBlockedResultOkCount > 0) {
        diagnostics.push("blocked-andrews-route-row-result-ok");
      }
      if (grammarGeneratedBlockedRouteContractCount > 0) {
        diagnostics.push("generated-row-uses-blocked-andrews-route-contract");
      }
      if (grammarGeneratedResultNotOkCount > 0) {
        diagnostics.push("generated-row-result-not-ok");
      }
      if (grammarLogicAuthorityMissingCount > 0) {
        diagnostics.push("generated-row-missing-andrews-logic-authority");
      }
      if (grammarSpellingEvidenceRoleMismatchCount > 0) {
        diagnostics.push("generated-row-spelling-evidence-role-mismatch");
      }
      if (grammarSourceContextAuthorityMismatchCount > 0) {
        diagnostics.push("generated-row-source-context-authority-not-andrews");
      }
      if (grammarSourceEvidenceAuthorityMismatchCount > 0) {
        diagnostics.push("generated-row-source-evidence-authority-not-andrews");
      }
      if (grammarClassicalSpellingRoleMismatchCount > 0) {
        diagnostics.push("generated-row-classical-spelling-role-not-structural-only");
      }
      if (grammarOrthographyBoundaryMissingCount > 0) {
        diagnostics.push("generated-row-missing-nawat-pipil-orthography-boundary");
      }
      if (grammarSpellingAuthorityMismatchCount > 0) {
        diagnostics.push("generated-row-spelling-authority-not-nawat-pipil");
      }
      if (grammarClassicalSurfaceImportNotBlockedCount > 0) {
        diagnostics.push("generated-row-classical-output-import-not-blocked");
      }
      const outputScope = !isBlock ? "" : hardBlocked ? "blocked-output" : effectiveGenerationGate === "andrews-licensed-generation" ? "andrews-generated-output" : effectiveGenerationGate === "andrews-nominal-route-no-vnc-tns" ? "andrews-nominal-output" : effectiveGenerationGate === "andrews-particle-boundary-no-vnc-tns" ? "andrews-particle-output" : outputRole || "andrews-output-frame";
      return {
        isBlock,
        generationGate,
        executorGenerationGate,
        effectiveGenerationGate,
        executorRouteStage,
        outputRole,
        outputScope,
        rowCount,
        placeholderCount,
        grammarRouteFamilies,
        grammarRouteStages,
        grammarDiagnosticIds,
        grammarLogicAuthorities,
        grammarSpellingEvidenceRoles,
        grammarClassicalSpellingRoles,
        grammarOrthographyBoundaries,
        grammarSpellingAuthorities,
        grammarClassicalSurfaceImports,
        grammarResultStates,
        grammarSourceContextTargetAuthorities,
        grammarSourceEvidenceTargetAuthorities,
        grammarRouteContractMissingCount,
        grammarGenerationAllowedCount,
        grammarGenerationBlockedRowCount,
        grammarBlockedResultOkCount,
        grammarGeneratedBlockedRouteContractCount,
        grammarGeneratedResultNotOkCount,
        grammarLogicAuthorityMissingCount,
        grammarSpellingEvidenceRoleMismatchCount,
        grammarSourceContextAuthorityMismatchCount,
        grammarSourceEvidenceAuthorityMismatchCount,
        grammarClassicalSpellingRoleMismatchCount,
        grammarOrthographyBoundaryMissingCount,
        grammarSpellingAuthorityMismatchCount,
        grammarClassicalSurfaceImportNotBlockedCount,
        hardBlocked,
        diagnostics,
        ok: diagnostics.length === 0
      };
    }
    function applyAndrewsTenseBlockOutputAuditDataset(element = null) {
      const record = getAndrewsTenseBlockOutputAuditRecord(element);
      if (!record.isBlock || !element?.dataset) {
        return record;
      }
      element.dataset.andrewsBlockOutputScope = record.outputScope;
      element.dataset.andrewsBlockOutputRowCount = String(record.rowCount);
      element.dataset.andrewsBlockOutputPlaceholderCount = String(record.placeholderCount);
      element.dataset.andrewsBlockRouteFamilies = record.grammarRouteFamilies.join("|");
      element.dataset.andrewsBlockRouteStages = record.grammarRouteStages.join("|");
      element.dataset.andrewsBlockRouteDiagnosticIds = record.grammarDiagnosticIds.join("|");
      element.dataset.andrewsBlockRowLogicAuthorities = record.grammarLogicAuthorities.join("|");
      element.dataset.andrewsBlockRowSpellingEvidenceRoles = record.grammarSpellingEvidenceRoles.join("|");
      element.dataset.andrewsBlockRowClassicalSpellingRoles = record.grammarClassicalSpellingRoles.join("|");
      element.dataset.andrewsBlockRowOrthographyBoundaries = record.grammarOrthographyBoundaries.join("|");
      element.dataset.andrewsBlockRowSpellingAuthorities = record.grammarSpellingAuthorities.join("|");
      element.dataset.andrewsBlockRowClassicalImports = record.grammarClassicalSurfaceImports.join("|");
      element.dataset.andrewsBlockRowResultStates = record.grammarResultStates.join("|");
      element.dataset.andrewsBlockRowSourceContextAuthorities = record.grammarSourceContextTargetAuthorities.join("|");
      element.dataset.andrewsBlockRowSourceEvidenceAuthorities = record.grammarSourceEvidenceTargetAuthorities.join("|");
      element.dataset.andrewsBlockRowRouteContractMissingCount = String(record.grammarRouteContractMissingCount);
      element.dataset.andrewsBlockRouteGenerationAllowedCount = String(record.grammarGenerationAllowedCount);
      element.dataset.andrewsBlockRouteGenerationBlockedRowCount = String(record.grammarGenerationBlockedRowCount);
      element.dataset.andrewsBlockRouteBlockedResultOkCount = String(record.grammarBlockedResultOkCount);
      element.dataset.andrewsBlockRouteGeneratedBlockedContractCount = String(record.grammarGeneratedBlockedRouteContractCount);
      element.dataset.andrewsBlockRouteGeneratedResultNotOkCount = String(record.grammarGeneratedResultNotOkCount);
      element.dataset.andrewsBlockRowLogicAuthorityMissingCount = String(record.grammarLogicAuthorityMissingCount);
      element.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount = String(record.grammarSpellingEvidenceRoleMismatchCount);
      element.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount = String(record.grammarSourceContextAuthorityMismatchCount);
      element.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount = String(record.grammarSourceEvidenceAuthorityMismatchCount);
      element.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount = String(record.grammarClassicalSpellingRoleMismatchCount);
      element.dataset.andrewsBlockRowOrthographyBoundaryMissingCount = String(record.grammarOrthographyBoundaryMissingCount);
      element.dataset.andrewsBlockRowSpellingAuthorityMismatchCount = String(record.grammarSpellingAuthorityMismatchCount);
      element.dataset.andrewsBlockRowClassicalImportNotBlockedCount = String(record.grammarClassicalSurfaceImportNotBlockedCount);
      element.dataset.andrewsBlockOutputAudit = record.ok ? "ok" : "diagnostic";
      element.dataset.andrewsBlockOutputDiagnostics = record.diagnostics.join("|");
      const classList = element.classList;
      classList?.toggle("tense-block--andrews-output-blocked", record.outputScope === "blocked-output");
      classList?.toggle("tense-block--andrews-output-generated", record.outputScope === "andrews-generated-output");
      classList?.toggle("tense-block--andrews-output-nominal", record.outputScope === "andrews-nominal-output");
      classList?.toggle("tense-block--andrews-output-particle", record.outputScope === "andrews-particle-output");
      classList?.toggle("tense-block--andrews-output-leak-diagnostic", record.diagnostics.includes("blocked-andrews-generation-block-has-output-rows") || record.diagnostics.includes("output-row-missing-andrews-route-contract") || record.diagnostics.includes("blocked-andrews-route-row-result-ok") || record.diagnostics.includes("generated-row-uses-blocked-andrews-route-contract") || record.diagnostics.includes("generated-row-result-not-ok"));
      classList?.toggle("tense-block--andrews-authority-leak-diagnostic", record.diagnostics.includes("generated-row-missing-andrews-logic-authority") || record.diagnostics.includes("generated-row-spelling-evidence-role-mismatch") || record.diagnostics.includes("generated-row-source-context-authority-not-andrews") || record.diagnostics.includes("generated-row-source-evidence-authority-not-andrews"));
      classList?.toggle("tense-block--andrews-orthography-leak-diagnostic", record.diagnostics.includes("generated-row-classical-spelling-role-not-structural-only") || record.diagnostics.includes("generated-row-missing-nawat-pipil-orthography-boundary") || record.diagnostics.includes("generated-row-spelling-authority-not-nawat-pipil") || record.diagnostics.includes("generated-row-classical-output-import-not-blocked"));
      classList?.toggle("tense-block--andrews-audit-warning", !record.ok);
      return record;
    }
    function getAndrewsTenseAuthorityDatasetAuditRecord(element = null) {
      const dataset = element?.dataset || {};
      const elementContract = getAndrewsTenseAuthorityElementContract(element);
      const authority = String(dataset.andrewsTenseAuthority || "");
      const slot = String(dataset.andrewsTenseSlot || "");
      const family = String(dataset.andrewsTenseFamily || "");
      const requiredKeys = ["andrewsTenseAuthority", "andrewsTenseSource", "andrewsTenseSlot", "andrewsTenseFamily", "andrewsTenseMode", "andrewsGrammarLogicAuthority", "andrewsClassicalSpellingRole", "andrewsOrthographyBoundary", "nawatPipilOutputBoundary", "andrewsOutputSpellingAuthority", "andrewsOrthographyRealizationPath", "andrewsLogicRole", "andrewsGenerationGate", "andrewsOutputRole", "nawatPipilEvidenceRole", "classicalOutputImport", "andrewsRouteAuthority", "andrewsRouteLogicAuthority", "andrewsSourceTargetRoute", "andrewsSourceTargetRouteClass", "andrewsSourceFormulaType", "andrewsTargetFormulaType", "andrewsRouteRegistryStatus", "andrewsRouteUiHost", "andrewsRouteGenerationGate", "andrewsRouteGenerationAllowed", "andrewsRouteClassicalSpellingRole", "andrewsRouteOutputSpellingAuthority"];
      const missing = requiredKeys.filter(key => !String(dataset[key] || ""));
      const diagnostics = [];
      if (dataset.andrewsGrammarLogicAuthority !== "Andrews PDF") {
        diagnostics.push("andrews-grammar-authority-missing");
      }
      if (dataset.andrewsClassicalSpellingRole !== "structural-only") {
        diagnostics.push("classical-spelling-role-not-structural-only");
      }
      if (dataset.andrewsOrthographyBoundary !== "nawat-pipil-realization") {
        diagnostics.push("andrews-orthography-boundary-missing");
      }
      if (dataset.nawatPipilOutputBoundary !== "orthography-realization") {
        diagnostics.push("nawat-pipil-output-boundary-missing");
      }
      if (dataset.andrewsOutputSpellingAuthority !== "Nawat/Pipil orthography bridge") {
        diagnostics.push("andrews-output-spelling-authority-missing");
      }
      if (dataset.andrewsOrthographyRealizationPath !== "andrews-logic-then-nawat-pipil-realization") {
        diagnostics.push("andrews-orthography-realization-path-missing");
      }
      if (dataset.classicalOutputImport !== "blocked") {
        diagnostics.push("classical-output-import-not-blocked");
      }
      if (dataset.andrewsRouteLogicAuthority !== "Andrews PDF") {
        diagnostics.push("andrews-source-target-route-authority-missing");
      }
      if (dataset.andrewsRouteClassicalSpellingRole !== "structural-only") {
        diagnostics.push("andrews-source-target-route-classical-spelling-not-structural");
      }
      if (dataset.andrewsRouteOutputSpellingAuthority !== "Nawat/Pipil orthography bridge") {
        diagnostics.push("andrews-source-target-route-output-spelling-authority-missing");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.sustantivo && dataset.andrewsTargetFormulaType === "CNV") {
        diagnostics.push("nominal-output-tab-has-verbal-target-route");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.sustantivo && (dataset.andrewsSourceTargetRoute === "CNN->CNV" || dataset.andrewsSourceTargetRoute === "CNV->CNV")) {
        diagnostics.push("nominal-output-tab-uses-non-nominal-route-host");
      }
      if (elementContract.diagnostic) {
        diagnostics.push(elementContract.diagnostic);
      }
      if (elementContract.contract && dataset.andrewsAuthorityElementContract && dataset.andrewsAuthorityElementContract !== elementContract.contract) {
        diagnostics.push("andrews-authority-element-contract-mismatch");
      }
      if (elementContract.expectedTag && dataset.andrewsAuthorityExpectedTag && dataset.andrewsAuthorityExpectedTag !== elementContract.expectedTag) {
        diagnostics.push("andrews-authority-expected-tag-mismatch");
      }
      if (elementContract.renderedTag && dataset.andrewsAuthorityRenderedTag && dataset.andrewsAuthorityRenderedTag !== elementContract.renderedTag) {
        diagnostics.push("andrews-authority-rendered-tag-mismatch");
      }
      if (elementContract.contract === "button.tense-tab" && (dataset.andrewsSelectionGate || element?.andrewsTenseTabSelectionAuditModel)) {
        const selectionModelTarget = getAndrewsTenseTabSelectionAuditModelTarget(element);
        const targetFrame = selectionModelTarget.targetFrame;
        if (!targetFrame) {
          diagnostics.push(selectionModelTarget.diagnosticId || "andrews-selection-audit-operation-frame-missing");
        }
        const expectedSelectionDisabled = targetFrame?.disabled === true;
        const expectedSelectionSelected = targetFrame?.selected === true;
        const expectedAriaSelected = targetFrame?.ariaSelected === true;
        const isSelectionActive = Boolean(element?.classList?.contains("is-active"));
        const ariaSelected = typeof element?.getAttribute === "function" ? String(element.getAttribute("aria-selected") || "") : "";
        const isSelectionMarkedSelected = String(dataset.andrewsSelectionSelected || "") === "true" || isSelectionActive || ariaSelected === "true";
        if (targetFrame && dataset.andrewsSelectionGate !== targetFrame.selectionGate) {
          diagnostics.push("andrews-selection-gate-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionAuthority !== targetFrame.selectionAuthority) {
          diagnostics.push("andrews-selection-authority-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionLogicAuthority !== targetFrame.selectionLogicAuthority) {
          diagnostics.push("andrews-selection-logic-authority-missing");
        }
        if (targetFrame && dataset.andrewsSelectionGrammarGate !== targetFrame.selectionGrammarGate) {
          diagnostics.push("andrews-selection-grammar-gate-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionOutputRole !== targetFrame.selectionOutputRole) {
          diagnostics.push("andrews-selection-output-role-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionOrthographyBoundary !== targetFrame.selectionOrthographyBoundary) {
          diagnostics.push("andrews-selection-orthography-boundary-missing");
        }
        if (targetFrame && dataset.andrewsSelectionClassicalOutputImport !== targetFrame.selectionClassicalOutputImport) {
          diagnostics.push("andrews-selection-classical-output-import-not-blocked");
        }
        if (targetFrame && dataset.andrewsSelectionSurfaceProbeRole !== targetFrame.selectionSurfaceProbeRole) {
          diagnostics.push("andrews-selection-surface-probe-role-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionNawatEvidenceRole !== targetFrame.selectionNawatEvidenceRole) {
          diagnostics.push("andrews-selection-nawat-evidence-role-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionBlocked !== targetFrame.selectionBlocked) {
          diagnostics.push("andrews-selection-blocked-reasons-mismatch");
        }
        if (targetFrame && dataset.andrewsSelectionDisabled !== String(expectedSelectionDisabled)) {
          diagnostics.push("andrews-selection-disabled-mismatch");
        }
        if (targetFrame && String(dataset.andrewsSelectionSelected || "") !== String(expectedSelectionSelected)) {
          diagnostics.push("andrews-selection-selected-mismatch");
        }
        if (targetFrame && isSelectionActive !== expectedSelectionSelected) {
          diagnostics.push("andrews-selection-blocked-tab-active");
        }
        if (targetFrame && ariaSelected === "true" !== expectedAriaSelected) {
          diagnostics.push("andrews-selection-blocked-tab-aria-selected");
        }
        if (targetFrame && expectedSelectionDisabled && isSelectionMarkedSelected) {
          diagnostics.push("andrews-selection-blocked-tab-selected");
        }
        if (targetFrame && typeof element?.disabled === "boolean" && element.disabled !== expectedSelectionDisabled) {
          diagnostics.push("andrews-selection-native-disabled-mismatch");
        }
        if (targetFrame && typeof element?.getAttribute === "function") {
          const ariaDisabled = String(element.getAttribute("aria-disabled") || "");
          if (ariaDisabled && ariaDisabled !== String(expectedSelectionDisabled)) {
            diagnostics.push("andrews-selection-aria-disabled-mismatch");
          }
        }
      }
      if (elementContract.contract === "button.tense-tab" && dataset.andrewsClickGate) {
        const expectedClickAuthority = getAndrewsTenseTabClickAuthorityState(element);
        if (dataset.andrewsClickGate !== expectedClickAuthority.clickGate) {
          diagnostics.push("andrews-click-gate-mismatch");
        }
        if (dataset.andrewsClickBlocked !== expectedClickAuthority.blockedReasons.join("|")) {
          diagnostics.push("andrews-click-blocked-reasons-mismatch");
        }
        if (dataset.andrewsClickAuthority !== "Andrews PDF") {
          diagnostics.push("andrews-click-authority-mismatch");
        }
      }
      if ((authority === "andrews-nominal-route" || authority === "andrews-particle-boundary") && slot !== "no-vnc-tns") {
        diagnostics.push("non-cnv-route-has-vnc-tense-slot");
      }
      if (authority === "unknown") {
        diagnostics.push("unclassified-authority-frame");
      }
      if (authority === "unknown" && slot !== "andrews-frame-required") {
        diagnostics.push("unclassified-authority-slot-mismatch");
      }
      if (authority === "andrews-output-gate" && slot !== "route-selection-required") {
        diagnostics.push("output-gate-slot-mismatch");
      }
      if (family === "nonactive-verbstem" && slot !== "derived-stem") {
        diagnostics.push("nonactive-suffix-not-derived-stem");
      }
      if (authority === "nawat-extension" && dataset.andrewsTenseSource === "Andrews") {
        diagnostics.push("nawat-extension-marked-as-andrews-source");
      }
      if (authority === "nawat-extension" && dataset.andrewsGenerationGate !== "not-andrews-grammar-gate") {
        diagnostics.push("nawat-extension-has-andrews-generation-gate");
      }
      if (authority === "nawat-extension" && dataset.nawatPipilEvidenceRole !== "surface-extension-only") {
        diagnostics.push("nawat-extension-evidence-role-mismatch");
      }
      if (authority === "andrews-licensed" && dataset.andrewsGenerationGate !== "andrews-licensed-generation") {
        diagnostics.push("andrews-licensed-generation-gate-missing");
      }
      if (authority === "andrews-licensed" && dataset.nawatPipilEvidenceRole !== "orthography-realization-only") {
        diagnostics.push("andrews-licensed-evidence-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreGenerationAuthority && dataset.andrewsTenseAuthority !== dataset.andrewsCoreGenerationAuthority) {
        diagnostics.push("andrews-core-generation-authority-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreTenseSource && dataset.andrewsTenseSource !== dataset.andrewsCoreTenseSource) {
        diagnostics.push("andrews-core-tense-source-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreTenseSlot && dataset.andrewsTenseSlot !== dataset.andrewsCoreTenseSlot) {
        diagnostics.push("andrews-core-tense-slot-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreTenseFamily && dataset.andrewsTenseFamily !== dataset.andrewsCoreTenseFamily) {
        diagnostics.push("andrews-core-tense-family-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreLogicRole && dataset.andrewsLogicRole !== dataset.andrewsCoreLogicRole) {
        diagnostics.push("andrews-core-logic-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreGenerationGate && dataset.andrewsGenerationGate !== dataset.andrewsCoreGenerationGate) {
        diagnostics.push("andrews-core-generation-gate-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreOutputRole && dataset.andrewsOutputRole !== dataset.andrewsCoreOutputRole) {
        diagnostics.push("andrews-core-output-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreNawatEvidenceRole && dataset.nawatPipilEvidenceRole !== dataset.andrewsCoreNawatEvidenceRole) {
        diagnostics.push("andrews-core-nawat-evidence-role-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreClassicalOutputImport && dataset.classicalOutputImport !== dataset.andrewsCoreClassicalOutputImport) {
        diagnostics.push("andrews-core-classical-output-import-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsCoreGenerationGate && dataset.andrewsExecutorGenerationGate !== dataset.andrewsCoreGenerationGate) {
        diagnostics.push("andrews-executor-generation-gate-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate === "andrews-licensed-generation" && dataset.andrewsExecutorRouteStage !== "cnv-finite-output") {
        diagnostics.push("andrews-executor-route-stage-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorRouteStage !== "andrews-cnv-tense-logic-gate") {
        diagnostics.push("andrews-executor-route-stage-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate === "andrews-licensed-generation" && dataset.andrewsExecutorGenerationAllowed !== "true") {
        diagnostics.push("andrews-executor-generation-allowed-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorGenerationAllowed !== "false") {
        diagnostics.push("andrews-executor-generation-allowed-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorFormulaShellPolicy !== "blocked-before-formula-shell") {
        diagnostics.push("andrews-executor-formula-shell-policy-mismatch");
      }
      if (dataset.andrewsTenseMode === targetObject.TENSE_MODE.verbo && dataset.andrewsExecutorGenerationGate && dataset.andrewsExecutorGenerationGate !== "andrews-licensed-generation" && dataset.andrewsExecutorFallbackPolicy !== "blocked-no-target-stem-fallback") {
        diagnostics.push("andrews-executor-fallback-policy-mismatch");
      }
      const canonicalMismatches = getAndrewsTenseAuthorityCanonicalMismatches(element);
      canonicalMismatches.forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      const classMismatches = getAndrewsTenseAuthorityClassMismatches(element);
      classMismatches.forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      const blockOutputAudit = getAndrewsTenseBlockOutputAuditRecord(element);
      blockOutputAudit.diagnostics.forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      return {
        tagName: String(element?.tagName || "").toLowerCase(),
        elementContract,
        authority,
        slot,
        family,
        logicRole: String(dataset.andrewsLogicRole || ""),
        generationGate: String(dataset.andrewsGenerationGate || ""),
        outputRole: String(dataset.andrewsOutputRole || ""),
        missing,
        diagnostics,
        canonicalMismatches,
        classMismatches,
        blockOutputAudit,
        ok: missing.length === 0 && diagnostics.length === 0
      };
    }
    function auditAndrewsTenseAuthorityAnnotatedDom(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          ok: true,
          missingCount: 0,
          diagnosticCount: 0,
          records: []
        };
      }
      const records = Array.from(scope.querySelectorAll(".tense-tab, .tense-block")).map(element => getAndrewsTenseAuthorityDatasetAuditRecord(element));
      const missingCount = records.filter(record => record.missing.length > 0).length;
      const diagnosticCount = records.filter(record => record.diagnostics.length > 0).length;
      return {
        checked: records.length,
        ok: missingCount === 0 && diagnosticCount === 0,
        missingCount,
        diagnosticCount,
        records
      };
    }
    function summarizeAndrewsTenseBlockOutputAudit(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          ok: true,
          rowCount: 0,
          placeholderCount: 0,
          grammarGenerationAllowedCount: 0,
          grammarGenerationBlockedRowCount: 0,
          grammarGeneratedBlockedRouteContractCount: 0,
          grammarGeneratedResultNotOkCount: 0,
          grammarLogicAuthorityMissingCount: 0,
          grammarSpellingEvidenceRoleMismatchCount: 0,
          grammarSourceContextAuthorityMismatchCount: 0,
          grammarSourceEvidenceAuthorityMismatchCount: 0,
          grammarClassicalSpellingRoleMismatchCount: 0,
          grammarOrthographyBoundaryMissingCount: 0,
          grammarSpellingAuthorityMismatchCount: 0,
          grammarClassicalSurfaceImportNotBlockedCount: 0,
          grammarRouteContractMissingCount: 0,
          hardBlockedCount: 0,
          grammarBlockedResultOkCount: 0,
          diagnosticCount: 0,
          records: []
        };
      }
      const records = Array.from(scope.querySelectorAll(".tense-block")).map(element => getAndrewsTenseBlockOutputAuditRecord(element));
      const rowCount = records.reduce((sum, record) => sum + (record.rowCount || 0), 0);
      const placeholderCount = records.reduce((sum, record) => sum + (record.placeholderCount || 0), 0);
      const grammarGenerationAllowedCount = records.reduce((sum, record) => sum + (record.grammarGenerationAllowedCount || 0), 0);
      const grammarGenerationBlockedRowCount = records.reduce((sum, record) => sum + (record.grammarGenerationBlockedRowCount || 0), 0);
      const grammarGeneratedBlockedRouteContractCount = records.reduce((sum, record) => sum + (record.grammarGeneratedBlockedRouteContractCount || 0), 0);
      const grammarGeneratedResultNotOkCount = records.reduce((sum, record) => sum + (record.grammarGeneratedResultNotOkCount || 0), 0);
      const grammarLogicAuthorityMissingCount = records.reduce((sum, record) => sum + (record.grammarLogicAuthorityMissingCount || 0), 0);
      const grammarSpellingEvidenceRoleMismatchCount = records.reduce((sum, record) => sum + (record.grammarSpellingEvidenceRoleMismatchCount || 0), 0);
      const grammarSourceContextAuthorityMismatchCount = records.reduce((sum, record) => sum + (record.grammarSourceContextAuthorityMismatchCount || 0), 0);
      const grammarSourceEvidenceAuthorityMismatchCount = records.reduce((sum, record) => sum + (record.grammarSourceEvidenceAuthorityMismatchCount || 0), 0);
      const grammarClassicalSpellingRoleMismatchCount = records.reduce((sum, record) => sum + (record.grammarClassicalSpellingRoleMismatchCount || 0), 0);
      const grammarOrthographyBoundaryMissingCount = records.reduce((sum, record) => sum + (record.grammarOrthographyBoundaryMissingCount || 0), 0);
      const grammarSpellingAuthorityMismatchCount = records.reduce((sum, record) => sum + (record.grammarSpellingAuthorityMismatchCount || 0), 0);
      const grammarClassicalSurfaceImportNotBlockedCount = records.reduce((sum, record) => sum + (record.grammarClassicalSurfaceImportNotBlockedCount || 0), 0);
      const grammarRouteContractMissingCount = records.reduce((sum, record) => sum + (record.grammarRouteContractMissingCount || 0), 0);
      const grammarBlockedResultOkCount = records.reduce((sum, record) => sum + (record.grammarBlockedResultOkCount || 0), 0);
      const hardBlockedCount = records.filter(record => record.hardBlocked).length;
      const diagnosticCount = records.filter(record => record.diagnostics.length > 0).length;
      return {
        checked: records.length,
        ok: diagnosticCount === 0,
        rowCount,
        placeholderCount,
        grammarGenerationAllowedCount,
        grammarGenerationBlockedRowCount,
        grammarGeneratedBlockedRouteContractCount,
        grammarGeneratedResultNotOkCount,
        grammarLogicAuthorityMissingCount,
        grammarSpellingEvidenceRoleMismatchCount,
        grammarSourceContextAuthorityMismatchCount,
        grammarSourceEvidenceAuthorityMismatchCount,
        grammarClassicalSpellingRoleMismatchCount,
        grammarOrthographyBoundaryMissingCount,
        grammarSpellingAuthorityMismatchCount,
        grammarClassicalSurfaceImportNotBlockedCount,
        grammarRouteContractMissingCount,
        grammarBlockedResultOkCount,
        hardBlockedCount,
        diagnosticCount,
        records
      };
    }
    function getAndrewsTenseTabSelectionAuditRecord(element = null) {
      const classList = element?.classList || null;
      const isTab = !!classList?.contains("tense-tab");
      const diagnostics = [];
      if (!isTab) {
        return {
          isTab,
          selectionGate: "",
          selectable: false,
          blocked: false,
          selected: false,
          ariaSelected: false,
          blockedSelected: false,
          outputProbeOnly: false,
          hardGate: false,
          disabled: false,
          nativeDisabled: false,
          missingSelectionMetadata: false,
          diagnostics,
          ok: true
        };
      }
      const selectionModelTarget = getAndrewsTenseTabSelectionAuditModelTarget(element);
      const targetFrame = selectionModelTarget.targetFrame;
      if (!targetFrame) {
        return getEmptyAndrewsTenseTabSelectionAuditRecord(selectionModelTarget.diagnosticId || "andrews-selection-audit-operation-frame-missing");
      }
      const authorityRecord = getAndrewsTenseAuthorityDatasetAuditRecord(element);
      authorityRecord.diagnostics.filter(diagnostic => String(diagnostic || "").startsWith("andrews-selection-")).forEach(diagnostic => {
        if (!diagnostics.includes(diagnostic)) {
          diagnostics.push(diagnostic);
        }
      });
      return {
        isTab,
        selectionGate: targetFrame.selectionGate || "",
        selectable: targetFrame.selectable === true,
        blocked: targetFrame.blocked === true,
        selected: targetFrame.selected === true,
        ariaSelected: targetFrame.ariaSelected === true,
        blockedSelected: targetFrame.blockedSelected === true,
        outputProbeOnly: targetFrame.outputProbeOnly === true,
        hardGate: targetFrame.hardGate === true,
        disabled: targetFrame.disabled === true,
        nativeDisabled: targetFrame.nativeDisabled === true,
        missingSelectionMetadata: false,
        diagnostics,
        ok: diagnostics.length === 0
      };
    }
    function summarizeAndrewsTenseTabSelectionAudit(root = null) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          ok: true,
          selectableCount: 0,
          blockedCount: 0,
          selectedCount: 0,
          blockedSelectedCount: 0,
          outputProbeOnlyCount: 0,
          hardGateCount: 0,
          disabledCount: 0,
          nativeDisabledCount: 0,
          missingSelectionMetadataCount: 0,
          diagnosticCount: 0,
          logicAuthorityMismatchCount: 0,
          grammarGateMismatchCount: 0,
          orthographyBoundaryMissingCount: 0,
          classicalImportNotBlockedCount: 0,
          surfaceProbeRoleMismatchCount: 0,
          disabledMismatchCount: 0,
          activeMismatchCount: 0,
          records: []
        };
      }
      const records = Array.from(scope.querySelectorAll(".tense-tab")).map(element => getAndrewsTenseTabSelectionAuditRecord(element));
      const countDiagnostic = diagnosticId => records.filter(record => record.diagnostics.includes(diagnosticId)).length;
      const diagnosticCount = records.filter(record => record.diagnostics.length > 0).length;
      const missingSelectionMetadataCount = records.filter(record => record.missingSelectionMetadata).length;
      return {
        checked: records.length,
        ok: missingSelectionMetadataCount === 0 && diagnosticCount === 0,
        selectableCount: records.filter(record => record.selectable).length,
        blockedCount: records.filter(record => record.blocked).length,
        selectedCount: records.filter(record => record.selected).length,
        blockedSelectedCount: records.filter(record => record.blockedSelected).length,
        outputProbeOnlyCount: records.filter(record => record.outputProbeOnly).length,
        hardGateCount: records.filter(record => record.hardGate).length,
        disabledCount: records.filter(record => record.disabled).length,
        nativeDisabledCount: records.filter(record => record.nativeDisabled).length,
        missingSelectionMetadataCount,
        diagnosticCount,
        logicAuthorityMismatchCount: countDiagnostic("andrews-selection-logic-authority-missing"),
        grammarGateMismatchCount: countDiagnostic("andrews-selection-grammar-gate-mismatch"),
        orthographyBoundaryMissingCount: countDiagnostic("andrews-selection-orthography-boundary-missing"),
        classicalImportNotBlockedCount: countDiagnostic("andrews-selection-classical-output-import-not-blocked"),
        surfaceProbeRoleMismatchCount: countDiagnostic("andrews-selection-surface-probe-role-mismatch"),
        disabledMismatchCount: countDiagnostic("andrews-selection-disabled-mismatch") + countDiagnostic("andrews-selection-native-disabled-mismatch") + countDiagnostic("andrews-selection-aria-disabled-mismatch"),
        activeMismatchCount: countDiagnostic("andrews-selection-selected-mismatch") + countDiagnostic("andrews-selection-blocked-tab-active") + countDiagnostic("andrews-selection-blocked-tab-aria-selected") + countDiagnostic("andrews-selection-blocked-tab-selected"),
        records
      };
    }
    function getAndrewsTenseAuthorityDomDescriptor(element = null, {
      mode = "",
      blockKind = ""
    } = {}) {
      const dataset = element?.dataset || {};
      const classList = element?.classList || null;
      const fallbackMode = String(mode || "").trim() || String(dataset.tenseMode || "").trim() || String(dataset.andrewsTenseMode || "").trim() || (typeof targetObject.getActiveTenseMode === "function" ? targetObject.getActiveTenseMode() : "") || targetObject.TENSE_MODE.verbo;
      const tenseValue = String(dataset.tenseValue || dataset.andrewsTenseValue || dataset.nonactiveSuffix || (classList?.contains("tense-block--selection-required") ? "selection-required" : "") || "").trim();
      return {
        tenseValue,
        mode: fallbackMode,
        blockKind: String(dataset.andrewsBlockKind || blockKind || (classList?.contains("tense-block") ? "dom-audit-tense-block" : "dom-audit-tense-tab"))
      };
    }
    function syncAndrewsTenseAuthorityDomAudit(root = null, {
      annotateMissing = true,
      mode = "",
      blockKind = ""
    } = {}) {
      const scope = root || (typeof targetObject.document !== "undefined" ? targetObject.document : null);
      if (!scope || typeof scope.querySelectorAll !== "function") {
        return {
          checked: 0,
          annotated: 0,
          ok: true,
          missingCount: 0,
          diagnosticCount: 0,
          records: []
        };
      }
      let annotated = 0;
      let repaired = 0;
      let selectionAnnotated = 0;
      let selectionRepaired = 0;
      if (annotateMissing) {
        Array.from(scope.querySelectorAll(".tense-tab, .tense-block")).forEach(element => {
          if (!element?.dataset) {
            return;
          }
          const descriptor = getAndrewsTenseAuthorityDomDescriptor(element, {
            mode,
            blockKind
          });
          const record = getAndrewsTenseAuthorityDatasetAuditRecord(element);
          const canonicalMismatches = getAndrewsTenseAuthorityCanonicalMismatches(element, {
            mode: descriptor.mode,
            blockKind: descriptor.blockKind
          });
          const classMismatches = getAndrewsTenseAuthorityClassMismatches(element, {
            mode: descriptor.mode,
            blockKind: descriptor.blockKind
          });
          const needsInitialAnnotation = !element.dataset.andrewsTenseAuthority;
          const needsRepair = !needsInitialAnnotation && (record.missing.length > 0 || canonicalMismatches.length > 0 || classMismatches.length > 0);
          if (!needsInitialAnnotation && !needsRepair) {
            return;
          }
          applyAndrewsTenseAuthorityDataset(element, getAndrewsTenseAuthorityDomDescriptor(element, {
            mode,
            blockKind
          }));
          if (needsRepair) {
            repaired += 1;
          } else {
            annotated += 1;
          }
        });
      }
      Array.from(scope.querySelectorAll(".tense-block")).forEach(element => {
        applyAndrewsTenseBlockOutputAuditDataset(element);
        const record = getAndrewsTenseAuthorityDatasetAuditRecord(element);
        element.classList?.toggle("tense-block--andrews-audit-warning", !record.ok);
      });
      Array.from(scope.querySelectorAll(".tense-tab")).forEach(element => {
        const selectionRecord = getAndrewsTenseTabSelectionAuditRecord(element);
        if (selectionRecord.missingSelectionMetadata || selectionRecord.diagnostics.length > 0) {
          const descriptor = getAndrewsTenseAuthorityDomDescriptor(element, {
            mode,
            blockKind
          });
          applyAndrewsTenseTabSelectionAuthorityDataset(element, {
            tenseValue: descriptor.tenseValue,
            mode: descriptor.mode
          });
          if (selectionRecord.missingSelectionMetadata) {
            selectionAnnotated += 1;
          } else {
            selectionRepaired += 1;
          }
        } else {
          applyAndrewsTenseTabClickAuthorityDataset(element);
        }
        const record = getAndrewsTenseAuthorityDatasetAuditRecord(element);
        element.classList?.toggle("tense-tab--andrews-audit-warning", !record.ok);
      });
      syncAndrewsTenseTabsOperationalLayerPanel(scope, {
        mode
      });
      const blockOutputAudit = summarizeAndrewsTenseBlockOutputAudit(scope);
      const tabSelectionAudit = summarizeAndrewsTenseTabSelectionAudit(scope);
      const audit = auditAndrewsTenseAuthorityAnnotatedDom(scope);
      if (scope.dataset) {
        scope.dataset.andrewsAuthorityAudit = audit.ok ? "ok" : "diagnostic";
        scope.dataset.andrewsAuthorityChecked = String(audit.checked);
        scope.dataset.andrewsAuthorityAnnotated = String(annotated);
        scope.dataset.andrewsAuthorityRepaired = String(repaired);
        scope.dataset.andrewsAuthorityMissingCount = String(audit.missingCount);
        scope.dataset.andrewsAuthorityDiagnosticCount = String(audit.diagnosticCount);
        scope.dataset.andrewsTabSelectionAudit = tabSelectionAudit.ok ? "ok" : "diagnostic";
        scope.dataset.andrewsTabSelectionChecked = String(tabSelectionAudit.checked);
        scope.dataset.andrewsTabSelectionAnnotated = String(selectionAnnotated);
        scope.dataset.andrewsTabSelectionRepaired = String(selectionRepaired);
        scope.dataset.andrewsTabSelectionSelectableCount = String(tabSelectionAudit.selectableCount);
        scope.dataset.andrewsTabSelectionBlockedCount = String(tabSelectionAudit.blockedCount);
        scope.dataset.andrewsTabSelectionSelectedCount = String(tabSelectionAudit.selectedCount);
        scope.dataset.andrewsTabSelectionBlockedSelectedCount = String(tabSelectionAudit.blockedSelectedCount);
        scope.dataset.andrewsTabSelectionOutputProbeOnlyCount = String(tabSelectionAudit.outputProbeOnlyCount);
        scope.dataset.andrewsTabSelectionHardGateCount = String(tabSelectionAudit.hardGateCount);
        scope.dataset.andrewsTabSelectionDisabledCount = String(tabSelectionAudit.disabledCount);
        scope.dataset.andrewsTabSelectionNativeDisabledCount = String(tabSelectionAudit.nativeDisabledCount);
        scope.dataset.andrewsTabSelectionMissingCount = String(tabSelectionAudit.missingSelectionMetadataCount);
        scope.dataset.andrewsTabSelectionDiagnosticCount = String(tabSelectionAudit.diagnosticCount);
        scope.dataset.andrewsTabSelectionLogicAuthorityMismatchCount = String(tabSelectionAudit.logicAuthorityMismatchCount);
        scope.dataset.andrewsTabSelectionGrammarGateMismatchCount = String(tabSelectionAudit.grammarGateMismatchCount);
        scope.dataset.andrewsTabSelectionOrthographyBoundaryMissingCount = String(tabSelectionAudit.orthographyBoundaryMissingCount);
        scope.dataset.andrewsTabSelectionClassicalImportNotBlockedCount = String(tabSelectionAudit.classicalImportNotBlockedCount);
        scope.dataset.andrewsTabSelectionSurfaceProbeRoleMismatchCount = String(tabSelectionAudit.surfaceProbeRoleMismatchCount);
        scope.dataset.andrewsTabSelectionDisabledMismatchCount = String(tabSelectionAudit.disabledMismatchCount);
        scope.dataset.andrewsTabSelectionActiveMismatchCount = String(tabSelectionAudit.activeMismatchCount);
        scope.dataset.andrewsBlockOutputChecked = String(blockOutputAudit.checked);
        scope.dataset.andrewsBlockOutputRowCount = String(blockOutputAudit.rowCount);
        scope.dataset.andrewsBlockOutputPlaceholderCount = String(blockOutputAudit.placeholderCount);
        scope.dataset.andrewsBlockRouteGenerationAllowedCount = String(blockOutputAudit.grammarGenerationAllowedCount);
        scope.dataset.andrewsBlockRouteGenerationBlockedRowCount = String(blockOutputAudit.grammarGenerationBlockedRowCount);
        scope.dataset.andrewsBlockRouteBlockedResultOkCount = String(blockOutputAudit.grammarBlockedResultOkCount);
        scope.dataset.andrewsBlockRouteGeneratedBlockedContractCount = String(blockOutputAudit.grammarGeneratedBlockedRouteContractCount);
        scope.dataset.andrewsBlockRouteGeneratedResultNotOkCount = String(blockOutputAudit.grammarGeneratedResultNotOkCount);
        scope.dataset.andrewsBlockRowLogicAuthorityMissingCount = String(blockOutputAudit.grammarLogicAuthorityMissingCount);
        scope.dataset.andrewsBlockRowSpellingEvidenceRoleMismatchCount = String(blockOutputAudit.grammarSpellingEvidenceRoleMismatchCount);
        scope.dataset.andrewsBlockRowSourceContextAuthorityMismatchCount = String(blockOutputAudit.grammarSourceContextAuthorityMismatchCount);
        scope.dataset.andrewsBlockRowSourceEvidenceAuthorityMismatchCount = String(blockOutputAudit.grammarSourceEvidenceAuthorityMismatchCount);
        scope.dataset.andrewsBlockRowClassicalSpellingRoleMismatchCount = String(blockOutputAudit.grammarClassicalSpellingRoleMismatchCount);
        scope.dataset.andrewsBlockRowOrthographyBoundaryMissingCount = String(blockOutputAudit.grammarOrthographyBoundaryMissingCount);
        scope.dataset.andrewsBlockRowSpellingAuthorityMismatchCount = String(blockOutputAudit.grammarSpellingAuthorityMismatchCount);
        scope.dataset.andrewsBlockRowClassicalImportNotBlockedCount = String(blockOutputAudit.grammarClassicalSurfaceImportNotBlockedCount);
        scope.dataset.andrewsBlockRowRouteContractMissingCount = String(blockOutputAudit.grammarRouteContractMissingCount);
        scope.dataset.andrewsBlockOutputHardBlockedCount = String(blockOutputAudit.hardBlockedCount);
        scope.dataset.andrewsBlockOutputDiagnosticCount = String(blockOutputAudit.diagnosticCount);
      }
      return {
        ...audit,
        annotated,
        repaired,
        selectionAnnotated,
        selectionRepaired,
        tabSelectionAudit,
        blockOutputAudit
      };
    }
    function getAndrewsFirstTenseHoverTitle(tenseValue = "", mode = targetObject.TENSE_MODE.verbo) {
      const frame = getAndrewsTenseAuthorityFrame(tenseValue, mode);
      return frame.title || "Andrews PDF dirige la logica; Nawat/Pipil solo realiza la ortografia.";
    }
    function getAndrewsFirstGroupHoverTitle(group = null) {
      if (!group || typeof group !== "object") {
        return "";
      }
      return targetObject.getLocalizedLabel(group.hoverTitle, targetObject.getIsNawat(), "") || targetObject.getLocalizedLabel(group.title, targetObject.getIsNawat(), "") || "";
    }
    function buildFormalReroutedFunctionTenseGroups(tenseMode = "", visibleTenses = []) {
      const normalizedMode = String(tenseMode || "").trim();
      if (normalizedMode !== targetObject.TENSE_MODE.adjetivo && normalizedMode !== targetObject.TENSE_MODE.adverbio) {
        return null;
      }
      const visibleTenseSet = new Set(Array.isArray(visibleTenses) ? visibleTenses : []);
      const sourceModes = normalizedMode === targetObject.TENSE_MODE.adverbio ? [targetObject.TENSE_MODE.verbo] : [targetObject.TENSE_MODE.verbo, targetObject.TENSE_MODE.sustantivo];
      const mergeGroups = (side = "left") => sourceModes.flatMap(mode => Array.isArray(targetObject.TENSE_LINGUISTIC_GROUPS[mode]?.[side]) ? targetObject.TENSE_LINGUISTIC_GROUPS[mode][side] : []).map(group => ({
        ...group,
        tenses: Array.isArray(group?.tenses) ? group.tenses.filter(tenseValue => visibleTenseSet.has(tenseValue)) : []
      })).filter(group => group.tenses.length);
      return {
        left: mergeGroups("left"),
        right: mergeGroups("right")
      };
    }
    var AndrewsFormulaWorkbenchActiveCategoryId = "vnc-shell";
    function getAndrewsFormulaWorkbenchContainer() {
      return targetObject.document.getElementById("formula-workbench");
    }
    function getAndrewsFormulaWorkbenchUiModel(activeId = AndrewsFormulaWorkbenchActiveCategoryId) {
      if (typeof targetObject.getAndrewsFormulaWorkbenchModel !== "function") {
        return null;
      }
      const verbMeta = typeof targetObject.getVerbInputMeta === "function" ? targetObject.getVerbInputMeta() : null;
      const inputValue = verbMeta?.rawInput || verbMeta?.rawInputVerb || verbMeta?.parseInputVerb || verbMeta?.verb || "";
      return targetObject.getAndrewsFormulaWorkbenchModel({
        activeId,
        inputValue
      });
    }
    function normalizeAndrewsFormulaWorkbenchUiCategoryId(value = "", model = null) {
      const categories = Array.isArray(model?.categories) ? model.categories : [];
      const candidate = String(value || "").trim();
      if (candidate && categories.some(category => category.id === candidate)) {
        return candidate;
      }
      return model?.activeId || categories[0]?.id || "vnc-shell";
    }
    function getAndrewsFormulaWorkbenchUiStatusLabel(status = "") {
      if (typeof targetObject.getAndrewsFormulaWorkbenchStatusLabel === "function") {
        return targetObject.getAndrewsFormulaWorkbenchStatusLabel(status);
      }
      return String(status || "").trim() || "Diagnostico";
    }
    function appendAndrewsFormulaWorkbenchPill(parent, label = "", value = "", className = "") {
      if (!parent) {
        return null;
      }
      const pill = targetObject.document.createElement("span");
      pill.className = ["formula-workbench__pill", className].filter(Boolean).join(" ");
      if (label) {
        const labelEl = targetObject.document.createElement("span");
        labelEl.className = "formula-workbench__pill-label";
        labelEl.textContent = label;
        pill.appendChild(labelEl);
      }
      const valueEl = targetObject.document.createElement("span");
      valueEl.className = "formula-workbench__pill-value";
      valueEl.textContent = value || "0";
      pill.appendChild(valueEl);
      parent.appendChild(pill);
      return pill;
    }
    function syncAndrewsFormulaWorkbenchCategoryToEngine(category = null) {
      if (!category || typeof category !== "object") {
        return;
      }
      if (category.engineMode === "ordinary-nnc") {
        if (typeof targetObject.setOrdinaryNncGenerationModeEnabled === "function") {
          targetObject.setOrdinaryNncGenerationModeEnabled(true, {
            state: category.ordinaryNncState || "absolutive"
          });
        }
        if (typeof targetObject.setActiveNawatTenseMode === "function" && typeof targetObject.TENSE_MODE !== "undefined" && targetObject.TENSE_MODE?.sustantivo) {
          targetObject.setActiveNawatTenseMode(targetObject.TENSE_MODE.sustantivo);
        }
        return;
      }
      if (category.engineMode === "vnc") {
        if (typeof targetObject.setOrdinaryNncGenerationModeEnabled === "function") {
          targetObject.setOrdinaryNncGenerationModeEnabled(false);
        }
        if (typeof targetObject.setActiveNawatTenseMode === "function" && typeof targetObject.TENSE_MODE !== "undefined" && targetObject.TENSE_MODE?.verbo) {
          targetObject.setActiveNawatTenseMode(targetObject.TENSE_MODE.verbo);
        }
      }
    }
    function activateAndrewsFormulaWorkbenchCategory(categoryId = "", {
      syncEngine = true
    } = {}) {
      const previewModel = getAndrewsFormulaWorkbenchUiModel(categoryId);
      const normalizedId = normalizeAndrewsFormulaWorkbenchUiCategoryId(categoryId, previewModel);
      AndrewsFormulaWorkbenchActiveCategoryId = normalizedId;
      const model = getAndrewsFormulaWorkbenchUiModel(normalizedId);
      const category = model?.activeCategory || null;
      if (syncEngine) {
        syncAndrewsFormulaWorkbenchCategoryToEngine(category);
      }
      if (syncEngine && typeof renderTenseTabs === "function") {
        renderTenseTabs();
        return;
      }
      renderAndrewsFormulaWorkbench();
    }
    function appendAndrewsFormulaWorkbenchCategoryTabs(parent, model = null) {
      const nav = targetObject.document.createElement("div");
      nav.className = "formula-workbench__category-tabs";
      nav.setAttribute("role", "tablist");
      nav.setAttribute("aria-label", "Categorias de formulas Andrews");
      (Array.isArray(model?.categories) ? model.categories : []).forEach(category => {
        const button = targetObject.document.createElement("button");
        const isActive = category.id === model.activeId;
        button.type = "button";
        button.className = `formula-workbench__category-tab${isActive ? " is-active" : ""}`;
        button.dataset.formulaCategory = category.id;
        button.dataset.generationStatus = category.generationStatus || "";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-controls", "formula-workbench-detail");
        button.textContent = category.label || category.id;
        button.addEventListener("click", () => {
          activateAndrewsFormulaWorkbenchCategory(category.id);
        });
        nav.appendChild(button);
      });
      parent.appendChild(nav);
      return nav;
    }
    function appendAndrewsFormulaWorkbenchSlotRail(parent, slots = []) {
      const rail = targetObject.document.createElement("div");
      rail.className = "formula-workbench__slot-rail";
      rail.setAttribute("aria-label", "Ranuras de formula");
      (Array.isArray(slots) ? slots : []).forEach(slot => {
        const item = targetObject.document.createElement("span");
        item.className = "formula-workbench__slot";
        item.dataset.slotRole = slot.role || "";
        item.dataset.slotOwner = slot.owner || "";
        item.dataset.slotPath = slot.path || "";
        item.dataset.slotBoundary = slot.boundary || "";
        item.dataset.slotLayer = slot.layer || "";
        item.dataset.slotPosition = slot.position || "";
        const token = targetObject.document.createElement("span");
        token.className = "formula-workbench__slot-token";
        token.textContent = slot.token || slot.id || "";
        item.appendChild(token);
        if (slot.label) {
          const label = targetObject.document.createElement("span");
          label.className = "formula-workbench__slot-label";
          label.textContent = slot.label;
          item.appendChild(label);
        }
        rail.appendChild(item);
      });
      parent.appendChild(rail);
      return rail;
    }
    function applyAndrewsFormulaWorkbenchSourceInput(value = "", {
      refreshEngine = false,
      renderWorkbench = true
    } = {}) {
      const nextValue = String(value || "");
      const verbEl = targetObject.document.getElementById("verb");
      if (verbEl && verbEl.value !== nextValue) {
        verbEl.value = nextValue;
        verbEl.dataset.prevValue = nextValue;
      }
      if (typeof targetObject.syncComposerStateFromVerbInput === "function") {
        targetObject.syncComposerStateFromVerbInput(nextValue);
      }
      if (!renderWorkbench) {
        return;
      }
      if (refreshEngine && typeof renderTenseTabs === "function") {
        renderTenseTabs();
      }
      renderAndrewsFormulaWorkbench();
    }
    function appendAndrewsFormulaWorkbenchOperationalLayer(parent, summary = null) {
      const items = Array.isArray(summary?.items) ? summary.items : [];
      if (!parent || !items.length) {
        return null;
      }
      const wrapper = targetObject.document.createElement("div");
      wrapper.className = "formula-workbench__operations";
      wrapper.dataset.operationalLayerKind = summary.kind || "";
      wrapper.dataset.operationalLayerSource = summary.source || "";
      wrapper.dataset.operationalLayerComplete = String(summary.complete === true);
      wrapper.dataset.operationalLayerLabelCount = String(summary.labelCount || items.length);
      wrapper.dataset.operationalLayerOperationCount = String(summary.operationCount || 0);
      wrapper.dataset.operationalLayerMissingSectionCount = String(summary.missingSectionCount || 0);
      wrapper.setAttribute("aria-label", "Operaciones Andrews por etiqueta");
      const summaryItem = targetObject.document.createElement("span");
      summaryItem.className = "formula-workbench__operation formula-workbench__operation--summary";
      summaryItem.dataset.operationCoverageComplete = String(summary.complete === true);
      summaryItem.dataset.operationMissingSectionCount = String(summary.missingSectionCount || 0);
      const summaryLabel = targetObject.document.createElement("span");
      summaryLabel.className = "formula-workbench__operation-label";
      summaryLabel.textContent = "Suboperaciones Andrews";
      summaryItem.appendChild(summaryLabel);
      const summaryCount = targetObject.document.createElement("span");
      summaryCount.className = "formula-workbench__operation-count";
      summaryCount.textContent = `${summary.operationCount || 0} ops`;
      summaryItem.appendChild(summaryCount);
      const summaryRefs = targetObject.document.createElement("span");
      summaryRefs.className = "formula-workbench__operation-refs";
      summaryRefs.textContent = summary.complete === true ? "cobertura Andrews" : `${summary.missingSectionCount || 0} secciones faltantes`;
      summaryItem.appendChild(summaryRefs);
      wrapper.appendChild(summaryItem);
      items.forEach(item => {
        const op = targetObject.document.createElement("span");
        op.className = "formula-workbench__operation";
        op.dataset.operationLabel = item.key || "";
        op.dataset.operationCount = String(item.operationCount || 0);
        op.dataset.operationExpectedSectionCount = String(item.expectedSectionCount || 0);
        op.dataset.operationMissingSectionCount = String(item.missingSectionCount || 0);
        op.dataset.operationCoverageComplete = String(item.complete === true);
        const label = targetObject.document.createElement("span");
        label.className = "formula-workbench__operation-label";
        label.textContent = item.label || item.key || "";
        op.appendChild(label);
        const count = targetObject.document.createElement("span");
        count.className = "formula-workbench__operation-count";
        count.textContent = `${item.operationCount || 0} ops`;
        op.appendChild(count);
        const refs = targetObject.document.createElement("span");
        refs.className = "formula-workbench__operation-refs";
        const operationIds = Array.isArray(item.operationIds) ? item.operationIds : [];
        refs.textContent = operationIds.slice(0, 4).join(", ") + (operationIds.length > 4 ? ", ..." : "");
        op.appendChild(refs);
        wrapper.appendChild(op);
      });
      parent.appendChild(wrapper);
      return wrapper;
    }
    function appendAndrewsFormulaWorkbenchSlice(parent, slice = null) {
      if (!parent || !slice || typeof slice !== "object") {
        return null;
      }
      const section = targetObject.document.createElement("section");
      section.className = "formula-workbench__slice";
      section.dataset.formulaSlice = slice.kind || "";
      section.dataset.generationStatus = slice.generation?.status || "";
      section.dataset.generationAllowed = String(slice.generation?.allowed === true);
      section.dataset.formulaSchemaId = slice.formulaSchemaId || "";
      const sourceRow = targetObject.document.createElement("div");
      sourceRow.className = "formula-workbench__source-row";
      const sourceLabel = targetObject.document.createElement("label");
      sourceLabel.className = "formula-workbench__source-label";
      sourceLabel.htmlFor = "formula-workbench-source-input";
      sourceLabel.textContent = "Fuente";
      sourceRow.appendChild(sourceLabel);
      const sourceInput = targetObject.document.createElement("input");
      sourceInput.type = "text";
      sourceInput.id = "formula-workbench-source-input";
      sourceInput.className = "formula-workbench__source-input";
      sourceInput.value = slice.sourceMaterial?.rawInput || "";
      sourceInput.placeholder = slice.sourceMaterial?.placeholder || "kal";
      sourceInput.autocomplete = "off";
      sourceInput.autocapitalize = "none";
      sourceInput.spellcheck = false;
      sourceInput.dataset.formulaSourceInput = slice.sourceMaterial?.inputKind || "ordinary-nnc";
      sourceInput.setAttribute("aria-label", slice.sourceMaterial?.inputLabel || "Fuente de predicado nominal");
      sourceInput.addEventListener("input", () => {
        applyAndrewsFormulaWorkbenchSourceInput(sourceInput.value, {
          renderWorkbench: false
        });
      });
      sourceInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
          applyAndrewsFormulaWorkbenchSourceInput(sourceInput.value, {
            refreshEngine: true
          });
        }
      });
      sourceRow.appendChild(sourceInput);
      const applyButton = targetObject.document.createElement("button");
      applyButton.type = "button";
      applyButton.className = "formula-workbench__source-apply";
      applyButton.dataset.formulaSourceApply = slice.sourceMaterial?.inputKind || "ordinary-nnc";
      applyButton.setAttribute("aria-label", "Aplicar fuente");
      applyButton.title = "Aplicar fuente";
      const applyIcon = targetObject.document.createElement("span");
      applyIcon.className = "formula-workbench__source-apply-icon";
      applyIcon.setAttribute("aria-hidden", "true");
      applyIcon.textContent = ">";
      applyButton.appendChild(applyIcon);
      applyButton.addEventListener("click", () => {
        applyAndrewsFormulaWorkbenchSourceInput(sourceInput.value, {
          refreshEngine: true
        });
      });
      sourceRow.appendChild(applyButton);
      section.appendChild(sourceRow);
      const families = Array.isArray(slice.formulaFamilies) ? slice.formulaFamilies : [];
      if (families.length) {
        const familyEl = targetObject.document.createElement("div");
        familyEl.className = "formula-workbench__families";
        familyEl.setAttribute("aria-label", "Familias de formula");
        families.forEach(family => {
          const item = targetObject.document.createElement("span");
          item.className = "formula-workbench__family";
          item.dataset.formulaFamily = family.id || "";
          const label = targetObject.document.createElement("span");
          label.className = "formula-workbench__family-label";
          label.textContent = family.label || family.id || "";
          item.appendChild(label);
          const code = targetObject.document.createElement("code");
          code.className = "formula-workbench__family-formula";
          code.textContent = family.formula || "";
          item.appendChild(code);
          familyEl.appendChild(item);
        });
        section.appendChild(familyEl);
      }
      appendAndrewsFormulaWorkbenchOperationalLayer(section, slice.operationalLayerSummary || null);
      const parsed = targetObject.document.createElement("div");
      parsed.className = "formula-workbench__parsed";
      parsed.setAttribute("aria-label", "Ranuras resueltas");
      (Array.isArray(slice.parsedSlots) ? slice.parsedSlots : []).forEach(slot => {
        const item = targetObject.document.createElement("span");
        item.className = "formula-workbench__parsed-slot";
        item.dataset.slotKey = slot.key || "";
        item.dataset.slotRole = slot.role || "";
        item.dataset.slotOwner = slot.owner || "";
        item.dataset.slotPath = slot.path || "";
        item.dataset.slotStatus = slot.status || "";
        item.dataset.slotValue = slot.value || slot.structuralValue || "";
        item.dataset.slotStructuralValue = slot.structuralValue || slot.value || "";
        item.dataset.slotNawatValue = slot.nawatValue || "";
        item.dataset.slotCompactValue = slot.compactValue || "";
        const name = targetObject.document.createElement("span");
        name.className = "formula-workbench__parsed-slot-name";
        name.textContent = slot.token || slot.id || "";
        item.appendChild(name);
        const value = targetObject.document.createElement("span");
        value.className = "formula-workbench__parsed-slot-value";
        value.textContent = slot.renderedValue || slot.value || slot.structuralValue || "Ø";
        item.appendChild(value);
        const fields = Array.isArray(slot.modelFields) ? slot.modelFields : [];
        if (fields.length) {
          const meta = targetObject.document.createElement("span");
          meta.className = "formula-workbench__parsed-slot-meta";
          meta.textContent = fields.map(field => `${field.label}: ${field.value}`).join(" · ");
          item.appendChild(meta);
        }
        parsed.appendChild(item);
      });
      section.appendChild(parsed);
      const result = targetObject.document.createElement("div");
      result.className = "formula-workbench__result";
      appendAndrewsFormulaWorkbenchPill(result, "Contrato", getAndrewsFormulaWorkbenchUiStatusLabel(slice.generation?.status || "diagnostic-only"), `formula-workbench__pill--${slice.generation?.status || "diagnostic-only"}`);
      if (slice.structuralFormulaEcho || slice.nawatFormulaEcho) {
        appendAndrewsFormulaWorkbenchPill(result, "Andrews", slice.structuralFormulaEcho || slice.fullFormulaEcho || slice.formulaEcho || "");
        appendAndrewsFormulaWorkbenchPill(result, "Nawat", slice.nawatFormulaEcho || "");
      } else {
        appendAndrewsFormulaWorkbenchPill(result, "Formula", slice.fullFormulaEcho || slice.formulaEcho || slice.formula || "");
      }
      appendAndrewsFormulaWorkbenchPill(result, "Compacta", slice.compactFormulaEcho || slice.formulaEcho || "");
      appendAndrewsFormulaWorkbenchPill(result, slice.generation?.allowed ? "Salida" : "Bloqueo", slice.generation?.surface || slice.diagnostics?.[0]?.message || "sin salida", slice.generation?.allowed ? "formula-workbench__pill--generated" : "formula-workbench__pill--unsupported");
      section.appendChild(result);
      const boundary = slice.realizationBoundary || null;
      if (boundary?.classicalStructuralOnly) {
        const boundaryEl = targetObject.document.createElement("div");
        boundaryEl.className = "formula-workbench__boundary";
        appendAndrewsFormulaWorkbenchPill(boundaryEl, "Andrews structural-only", Array.isArray(boundary.structuralExamples) ? boundary.structuralExamples.join(", ") : "");
        appendAndrewsFormulaWorkbenchPill(boundaryEl, "Nawat/Pipil", boundary.nawatAuthority || "orthography bridge");
        section.appendChild(boundaryEl);
      }
      const examples = Array.isArray(slice.examples) ? slice.examples : [];
      if (examples.length) {
        const examplesEl = targetObject.document.createElement("div");
        examplesEl.className = "formula-workbench__examples";
        const examplesLabelBySlice = {
          "vnc-shell-formula-workbench-slice": "Ejemplos de CNV",
          "possessive-state-nnc-formula-workbench-slice": "Ejemplos posesivos NNC",
          "vnc-valence-formula-workbench-slice": "Ejemplos de valencia CNV",
          "subject-number-connector-formula-workbench-slice": "Ejemplos de conectores sujeto/numero",
          "derivational-route-formula-workbench-slice": "Ejemplos de rutas derivacionales",
          "compound-stem-formula-workbench-slice": "Ejemplos de tallos compuestos",
          "nominalization-formula-workbench-slice": "Ejemplos de nominalizacion",
          "personal-name-embedded-nnc-formula-workbench-slice": "Ejemplos de nombres personales",
          "unsupported-route-diagnostics-formula-workbench-slice": "Ejemplos de diagnosticos sin salida"
        };
        examplesEl.setAttribute("aria-label", examplesLabelBySlice[slice.kind] || "Ejemplos ordinarios NNC/S");
        examples.forEach(example => {
          const item = targetObject.document.createElement("span");
          item.className = "formula-workbench__example";
          item.dataset.exampleId = example.id || "";
          item.dataset.exampleStatus = example.status || "";
          item.dataset.exampleNounClass = example.nounClass || "";
          item.dataset.exampleNumber = example.number || "";
          item.dataset.exampleConnectorDyad = example.connectorDyad || "";
          item.dataset.exampleStatePosition = example.statePosition || "";
          item.dataset.examplePossessorKind = example.possessorKind || "";
          item.dataset.exampleKey = example.id || "";
          const label = targetObject.document.createElement("span");
          label.className = "formula-workbench__example-label";
          label.textContent = example.label || example.id || "";
          item.appendChild(label);
          const formula = targetObject.document.createElement("code");
          formula.className = "formula-workbench__example-formula";
          formula.textContent = example.structuralFormulaEcho || example.fullFormulaEcho || example.compactFormulaEcho || "";
          item.appendChild(formula);
          if (example.nawatFormulaEcho && example.nawatFormulaEcho !== (example.structuralFormulaEcho || example.fullFormulaEcho)) {
            const nawatFormula = targetObject.document.createElement("code");
            nawatFormula.className = "formula-workbench__example-formula formula-workbench__example-formula--nawat";
            nawatFormula.textContent = example.nawatFormulaEcho;
            item.appendChild(nawatFormula);
          }
          const surface = targetObject.document.createElement("span");
          surface.className = "formula-workbench__example-surface";
          surface.textContent = example.surface || "sin salida";
          item.appendChild(surface);
          examplesEl.appendChild(item);
        });
        section.appendChild(examplesEl);
      }
      parent.appendChild(section);
      return section;
    }
    function appendAndrewsFormulaWorkbenchDetail(parent, model = null) {
      const category = model?.activeCategory || null;
      if (!category) {
        return null;
      }
      const detail = targetObject.document.createElement("article");
      detail.className = "formula-workbench__detail";
      detail.id = "formula-workbench-detail";
      detail.dataset.formulaCategory = category.id || "";
      detail.dataset.formulaSchemaId = category.formulaSchemaId || "";
      detail.dataset.formulaSlotSource = category.formulaSlotSource || "";
      detail.dataset.generationStatus = category.generationStatus || "";
      detail.dataset.engineMode = category.engineMode || "";
      const head = targetObject.document.createElement("div");
      head.className = "formula-workbench__detail-head";
      const titleWrap = targetObject.document.createElement("div");
      titleWrap.className = "formula-workbench__title-wrap";
      const title = targetObject.document.createElement("h2");
      title.className = "formula-workbench__title";
      title.textContent = category.title || category.label || "Formula";
      titleWrap.appendChild(title);
      const subtitle = targetObject.document.createElement("p");
      subtitle.className = "formula-workbench__subtitle";
      subtitle.textContent = category.compactFormula || category.formula || "";
      titleWrap.appendChild(subtitle);
      head.appendChild(titleWrap);
      const formula = targetObject.document.createElement("code");
      formula.className = "formula-workbench__formula";
      formula.textContent = category.formula || "";
      head.appendChild(formula);
      detail.appendChild(head);
      appendAndrewsFormulaWorkbenchSlotRail(detail, category.slots);
      appendAndrewsFormulaWorkbenchSlice(detail, model?.activeSlice || null);
      const meta = targetObject.document.createElement("div");
      meta.className = "formula-workbench__meta";
      appendAndrewsFormulaWorkbenchPill(meta, "Estado", getAndrewsFormulaWorkbenchUiStatusLabel(category.generationStatus), "formula-workbench__pill--status");
      appendAndrewsFormulaWorkbenchPill(meta, "Unidad", category.unit || "CN");
      appendAndrewsFormulaWorkbenchPill(meta, "Familia", category.family || "formula");
      if (Array.isArray(category.lessons) && category.lessons.length) {
        appendAndrewsFormulaWorkbenchPill(meta, "Lecciones", category.lessons.join(", "));
      }
      detail.appendChild(meta);
      const lower = targetObject.document.createElement("div");
      lower.className = "formula-workbench__lower";
      const evidence = targetObject.document.createElement("div");
      evidence.className = "formula-workbench__evidence";
      const evidenceLabel = targetObject.document.createElement("span");
      evidenceLabel.className = "formula-workbench__lower-label";
      evidenceLabel.textContent = "Evidencia";
      evidence.appendChild(evidenceLabel);
      (Array.isArray(category.evidenceRefs) ? category.evidenceRefs : []).forEach(ref => {
        appendAndrewsFormulaWorkbenchPill(evidence, "", ref, "formula-workbench__pill--evidence");
      });
      lower.appendChild(evidence);
      const diagnostics = targetObject.document.createElement("div");
      diagnostics.className = "formula-workbench__diagnostics";
      const diagnosticLabel = targetObject.document.createElement("span");
      diagnosticLabel.className = "formula-workbench__lower-label";
      diagnosticLabel.textContent = "Diagnostico";
      diagnostics.appendChild(diagnosticLabel);
      (Array.isArray(category.diagnostics) ? category.diagnostics : []).slice(0, 3).forEach(message => {
        const item = targetObject.document.createElement("span");
        item.className = "formula-workbench__diagnostic";
        item.textContent = message;
        diagnostics.appendChild(item);
      });
      lower.appendChild(diagnostics);
      detail.appendChild(lower);
      parent.appendChild(detail);
      return detail;
    }
    function renderAndrewsFormulaWorkbench() {
      const container = getAndrewsFormulaWorkbenchContainer();
      if (!container) {
        return;
      }
      const model = getAndrewsFormulaWorkbenchUiModel(AndrewsFormulaWorkbenchActiveCategoryId);
      if (!model) {
        container.hidden = true;
        return;
      }
      container.hidden = false;
      AndrewsFormulaWorkbenchActiveCategoryId = normalizeAndrewsFormulaWorkbenchUiCategoryId(AndrewsFormulaWorkbenchActiveCategoryId, model);
      container.dataset.activeCategory = AndrewsFormulaWorkbenchActiveCategoryId;
      container.dataset.categoryCount = String(model.categoryCount || 0);
      container.dataset.routeCount = String(model.routeRegistrySummary?.routeCount || 0);
      container.dataset.generationAllowedRouteCount = String(model.routeRegistrySummary?.generationAllowedRouteCount || 0);
      container.replaceChildren();
      const shell = targetObject.document.createElement("div");
      shell.className = "formula-workbench__shell";
      const header = targetObject.document.createElement("header");
      header.className = "formula-workbench__header";
      const headingWrap = targetObject.document.createElement("div");
      headingWrap.className = "formula-workbench__heading-wrap";
      const eyebrow = targetObject.document.createElement("span");
      eyebrow.className = "formula-workbench__eyebrow";
      eyebrow.textContent = "Andrews";
      headingWrap.appendChild(eyebrow);
      const heading = targetObject.document.createElement("h2");
      heading.className = "formula-workbench__heading";
      heading.textContent = "Formulas gramaticales";
      headingWrap.appendChild(heading);
      header.appendChild(headingWrap);
      const summary = targetObject.document.createElement("div");
      summary.className = "formula-workbench__summary";
      (Array.isArray(model.statusSummary) ? model.statusSummary : []).forEach(entry => {
        appendAndrewsFormulaWorkbenchPill(summary, entry.label, String(entry.count || 0), `formula-workbench__pill--${entry.status}`);
      });
      appendAndrewsFormulaWorkbenchPill(summary, "Rutas", String(model.routeRegistrySummary?.routeCount || 0), "formula-workbench__pill--route");
      header.appendChild(summary);
      shell.appendChild(header);
      appendAndrewsFormulaWorkbenchCategoryTabs(shell, model);
      appendAndrewsFormulaWorkbenchDetail(shell, model);
      container.appendChild(shell);
    }
    var AndrewsRouteBoardDestinationKey = "";
    var AndrewsRouteBoardPinnedSourceInput = "";
    var AndrewsRouteBoardPinnedSourceStage = null;
    var AndrewsRouteBoardActiveJourney = null;
    var AndrewsRouteBoardSourceOverrideStage = null;
    var AndrewsRouteBoardContinuedJourney = null;
    var AndrewsRouteBoardJourneyHistory = [];
    function clearAndrewsRouteBoardPinnedJourney({
      clearDestination = true
    } = {}) {
      AndrewsRouteBoardPinnedSourceInput = "";
      AndrewsRouteBoardPinnedSourceStage = null;
      AndrewsRouteBoardActiveJourney = null;
      AndrewsRouteBoardContinuedJourney = null;
      AndrewsRouteBoardJourneyHistory = [];
      if (clearDestination) {
        AndrewsRouteBoardDestinationKey = "";
        AndrewsRouteBoardSourceOverrideStage = null;
      }
      if (typeof targetObject.renderOutputJourneyStrip === "function") {
        targetObject.renderOutputJourneyStrip();
      }
    }
    function normalizeAndrewsRouteBoardInputValue(value = "") {
      const normalized = String(value || "").trim();
      return normalized === "_" ? "" : normalized;
    }
    function getAndrewsRouteBoardRawInput(verbMeta = null) {
      return normalizeAndrewsRouteBoardInputValue(targetObject.document.getElementById("verb")?.value || verbMeta?.rawValue || verbMeta?.inputValue || verbMeta?.displayVerb || "");
    }
    function getAndrewsRouteBoardUiSourceStage(verbMeta = null, {
      rawInput = null
    } = {}) {
      const mode = typeof targetObject.getActiveTenseMode === "function" ? targetObject.getActiveTenseMode() : "";
      const formalMode = typeof targetObject.getFormalTenseModeForCurrentSelection === "function" ? targetObject.getFormalTenseModeForCurrentSelection(mode) : mode;
      const entryBoard = typeof targetObject.getComposerEntryBoard === "function" ? targetObject.getComposerEntryBoard() : "";
      const ordinaryNncActive = typeof targetObject.isOrdinaryNncGenerationModeEnabled === "function" && targetObject.isOrdinaryNncGenerationModeEnabled();
      const input = rawInput === null ? getAndrewsRouteBoardRawInput(verbMeta) : String(rawInput || "").trim();
      if (typeof targetObject.getAndrewsCnvCnnRouteStageFromFormulaInput === "function") {
        return targetObject.getAndrewsCnvCnnRouteStageFromFormulaInput(input, {
          mode: formalMode,
          defaultStage: ordinaryNncActive || entryBoard === "ordinary-nnc" || entryBoard === "noun-to-verb" || formalMode === targetObject.TENSE_MODE.sustantivo ? {
            formulaType: "CNN",
            formulaPosition: "predicate-stem",
            stemRank: "nounstem"
          } : {
            formulaType: "CNV",
            formulaPosition: "predicate-stem",
            stemRank: "verbstem"
          }
        });
      }
      if (ordinaryNncActive || entryBoard === "ordinary-nnc" || entryBoard === "noun-to-verb" || formalMode === targetObject.TENSE_MODE.sustantivo) {
        return {
          formulaType: "CNN",
          formulaPosition: "predicate-stem",
          stemRank: "nounstem"
        };
      }
      if (/^#.*#$/.test(input) && formalMode === targetObject.TENSE_MODE.verbo) {
        return {
          formulaType: "CNV",
          formulaPosition: "predicate",
          stemRank: "predicate"
        };
      }
      if (formalMode === targetObject.TENSE_MODE.verbo) {
        return {
          formulaType: "CNV",
          formulaPosition: "predicate-stem",
          stemRank: "verbstem"
        };
      }
      return {
        formulaType: "CNV",
        formulaPosition: "predicate-stem",
        stemRank: "verbstem"
      };
    }
    function appendAndrewsRouteBoardPill(parent, label = "", value = "") {
      const pill = targetObject.document.createElement("span");
      pill.className = "andrews-route-board__pill";
      if (label) {
        const labelEl = targetObject.document.createElement("span");
        labelEl.className = "andrews-route-board__pill-label";
        labelEl.textContent = label;
        pill.appendChild(labelEl);
      }
      const valueEl = targetObject.document.createElement("span");
      valueEl.className = "andrews-route-board__pill-value";
      valueEl.textContent = value;
      pill.appendChild(valueEl);
      parent.appendChild(pill);
      return pill;
    }
    const ANDREWS_ROUTE_BOARD_MAP_SVG_NS = "http://www.w3.org/2000/svg";
    const ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS = Object.freeze([Object.freeze({
      id: "entrada-field",
      zone: "entrada",
      label: "#1 ENTRADA",
      path: "M16 34 C112 18 190 28 260 56 C220 96 132 120 42 106 C22 82 14 58 16 34Z",
      labelX: 44,
      labelY: 52
    }), Object.freeze({
      id: "formula-field",
      zone: "formula",
      label: "#2 FORMULA",
      path: "M184 36 C318 14 470 28 604 62 C586 132 484 166 326 158 C234 154 182 112 184 36Z",
      labelX: 294,
      labelY: 54
    }), Object.freeze({
      id: "salida-field",
      zone: "salida",
      label: "#3 SALIDA",
      path: "M512 74 C620 68 692 104 704 176 C660 218 588 236 496 220 C550 178 560 126 512 74Z",
      labelX: 592,
      labelY: 112
    }), Object.freeze({
      id: "cnn-basin",
      zone: "cnn",
      label: "CNN BAJO",
      path: "M90 192 C210 172 356 176 486 194 C588 208 648 236 690 274 L116 274 C88 248 78 222 90 192Z",
      labelX: 154,
      labelY: 246
    })]);
    const ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES = Object.freeze([Object.freeze({
      id: "vertical-entry",
      path: "M120 28 L120 272"
    }), Object.freeze({
      id: "vertical-formula",
      path: "M360 22 L360 278"
    }), Object.freeze({
      id: "vertical-output",
      path: "M600 44 L600 272"
    }), Object.freeze({
      id: "horizontal-cnv",
      path: "M28 118 L694 118"
    }), Object.freeze({
      id: "horizontal-cnn",
      path: "M72 220 L690 220"
    })]);
    const ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS = Object.freeze([Object.freeze({
      id: "formula-boundary",
      label: "Frontera",
      x: 42,
      y: 134,
      anchor: "start"
    }), Object.freeze({
      id: "stem-rank",
      label: "Tronco",
      x: 282,
      y: 48,
      anchor: "middle"
    }), Object.freeze({
      id: "source-target-route",
      label: "Ruta",
      x: 386,
      y: 174,
      anchor: "middle"
    }), Object.freeze({
      id: "slot-ownership",
      label: "Slots",
      x: 504,
      y: 42,
      anchor: "middle"
    }), Object.freeze({
      id: "function-use",
      label: "Funcion",
      x: 618,
      y: 154,
      anchor: "middle"
    })]);
    const ANDREWS_ROUTE_BOARD_MAP_STATIONS = Object.freeze({
      "CNV:predicate:predicate": Object.freeze({
        x: 88,
        y: 78,
        label: "Predicado",
        region: "CNV",
        stationRole: "major",
        labelDx: 12,
        labelDy: -13,
        labelAnchor: "start"
      }),
      "CNV:core:verbal-core": Object.freeze({
        x: 226,
        y: 78,
        label: "Nucleo",
        region: "CNV",
        stationRole: "transfer",
        labelDx: -12,
        labelDy: -14,
        labelAnchor: "end"
      }),
      "CNV:predicate-stem:verbstem": Object.freeze({
        x: 342,
        y: 128,
        label: "Tronco verbal",
        region: "CNV",
        stationRole: "major",
        labelDx: -12,
        labelDy: -15,
        labelAnchor: "end"
      }),
      "CNV:predicate-stem:deverbal-verbstem": Object.freeze({
        x: 542,
        y: 82,
        label: "Verbal deverbal",
        region: "CNV",
        stationRole: "terminal",
        labelDx: 12,
        labelDy: -12,
        labelAnchor: "start"
      }),
      "CNV:predicate-stem:denominal-verbstem": Object.freeze({
        x: 544,
        y: 176,
        label: "Verbal denominal",
        region: "CNV",
        stationRole: "transfer",
        labelDx: 14,
        labelDy: 4,
        labelAnchor: "start"
      }),
      "CNN:predicate-stem:nounstem": Object.freeze({
        x: 178,
        y: 222,
        label: "Tronco nominal",
        region: "CNN",
        stationRole: "major",
        labelDx: -12,
        labelDy: 18,
        labelAnchor: "end"
      }),
      "CNN:predicate-stem:deverbal-nounstem": Object.freeze({
        x: 400,
        y: 224,
        label: "Nominal deverbal",
        region: "CNN",
        stationRole: "terminal",
        labelDx: 0,
        labelDy: 20,
        labelAnchor: "middle"
      }),
      "CNN:predicate-stem:active-action-nounstem": Object.freeze({
        x: 626,
        y: 222,
        label: "Accion activa",
        region: "CNN",
        stationRole: "terminal",
        labelDx: 10,
        labelDy: -14,
        labelAnchor: "start"
      })
    });
    const ANDREWS_ROUTE_BOARD_MAP_ROUTES = Object.freeze({
      "cnv-predicate-to-cnn-nounstem-nominalization": Object.freeze({
        code: "1",
        color: "#d4931e",
        label: "CNV predicado > CNN nominal",
        family: "CNV->CNN",
        stationKeys: Object.freeze(["CNV:predicate:predicate", "CNN:predicate-stem:nounstem"]),
        path: "M88 78 C112 122 135 174 178 222",
        badgeX: 128,
        badgeY: 164,
        arrowX: 132,
        arrowY: 158,
        arrowRotate: 58,
        destinationCalloutX: 72,
        destinationCalloutY: 268,
        destinationCalloutAnchor: "start",
        destinationCalloutLabel: "Nominal"
      }),
      "cnv-core-to-cnn-nounstem-deverbal": Object.freeze({
        code: "2",
        color: "#1f78a8",
        label: "CNV nucleo > CNN deverbal",
        family: "CNV->CNN",
        stationKeys: Object.freeze(["CNV:core:verbal-core", "CNN:predicate-stem:deverbal-nounstem"]),
        path: "M226 78 C284 126 328 190 400 224",
        badgeX: 318,
        badgeY: 158,
        arrowX: 316,
        arrowY: 158,
        arrowRotate: 42,
        destinationCalloutX: 360,
        destinationCalloutY: 270,
        destinationCalloutAnchor: "start",
        destinationCalloutLabel: "Nominal deverbal"
      }),
      "cnn-nounstem-to-cnv-verbstem-denominal": Object.freeze({
        code: "3",
        color: "#48935c",
        label: "CNN nominal > CNV denominal",
        family: "CNN->CNV",
        stationKeys: Object.freeze(["CNN:predicate-stem:nounstem", "CNV:predicate-stem:denominal-verbstem"]),
        path: "M178 222 C294 224 430 202 544 176",
        badgeX: 356,
        badgeY: 208,
        arrowX: 356,
        arrowY: 208,
        arrowRotate: -10,
        destinationCalloutX: 666,
        destinationCalloutY: 146,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Denominal"
      }),
      "cnv-verbstem-to-cnv-verbstem-deverbal": Object.freeze({
        code: "4",
        color: "#7459a6",
        label: "CNV verbal > CNV deverbal",
        family: "CNV->CNV",
        stationKeys: Object.freeze(["CNV:predicate-stem:verbstem", "CNV:predicate-stem:deverbal-verbstem"]),
        path: "M342 128 C410 118 476 98 542 82",
        badgeX: 454,
        badgeY: 104,
        arrowX: 452,
        arrowY: 104,
        arrowRotate: -14,
        destinationCalloutX: 662,
        destinationCalloutY: 48,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Deverbal"
      }),
      "cnv-to-cnn-to-cnv-loop": Object.freeze({
        code: "5",
        color: "#c45f52",
        label: "CNV > CNN > CNV",
        family: "loop",
        stationKeys: Object.freeze(["CNV:core:verbal-core", "CNN:predicate-stem:deverbal-nounstem", "CNV:predicate-stem:denominal-verbstem"]),
        path: "M226 78 C292 138 334 206 400 224 C464 232 512 202 544 176",
        badgeX: 424,
        badgeY: 202,
        arrowX: 426,
        arrowY: 210,
        arrowRotate: -12,
        destinationCalloutX: 690,
        destinationCalloutY: 186,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Loop denominal"
      }),
      "cnn-to-cnv-to-cnn-active-action-loop": Object.freeze({
        code: "6",
        color: "#d86b37",
        label: "CNN > CNV > CNN accion",
        family: "loop",
        stationKeys: Object.freeze(["CNN:predicate-stem:nounstem", "CNV:predicate-stem:denominal-verbstem", "CNN:predicate-stem:active-action-nounstem"]),
        path: "M178 222 C300 204 430 176 544 176 C588 176 614 194 626 222",
        badgeX: 592,
        badgeY: 194,
        arrowX: 494,
        arrowY: 178,
        arrowRotate: -4,
        destinationCalloutX: 690,
        destinationCalloutY: 254,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Accion"
      }),
      "cnn-to-cnv-to-cnv-deverbal-chain": Object.freeze({
        code: "7",
        color: "#b15c83",
        label: "CNN > CNV > CNV deverbal",
        family: "chain",
        stationKeys: Object.freeze(["CNN:predicate-stem:nounstem", "CNV:predicate-stem:denominal-verbstem", "CNV:predicate-stem:deverbal-verbstem"]),
        path: "M178 222 C308 196 430 176 544 176 C572 142 568 108 542 82",
        badgeX: 562,
        badgeY: 128,
        arrowX: 556,
        arrowY: 132,
        arrowRotate: -68,
        destinationCalloutX: 686,
        destinationCalloutY: 104,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Cadena deverbal"
      })
    });
    const ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS = Object.freeze([Object.freeze({
      id: "formula-boundary",
      shortLabel: "Frontera",
      label: "formula boundary"
    }), Object.freeze({
      id: "stem-rank",
      shortLabel: "Tronco",
      label: "stem rank"
    }), Object.freeze({
      id: "source-target-route",
      shortLabel: "Ruta",
      label: "source/target route"
    }), Object.freeze({
      id: "slot-ownership",
      shortLabel: "Slots",
      label: "slot ownership"
    }), Object.freeze({
      id: "function-use",
      shortLabel: "Funcion",
      label: "function-use last"
    })]);
    const ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS = Object.freeze([Object.freeze({
      dx: -18,
      dy: -18
    }), Object.freeze({
      dx: 18,
      dy: -18
    }), Object.freeze({
      dx: -18,
      dy: 18
    }), Object.freeze({
      dx: 18,
      dy: 18
    }), Object.freeze({
      dx: 0,
      dy: -24
    }), Object.freeze({
      dx: 0,
      dy: 24
    }), Object.freeze({
      dx: -26,
      dy: 0
    }), Object.freeze({
      dx: 26,
      dy: 0
    })]);
    const ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES = Object.freeze([Object.freeze({
      id: "route-line",
      label: "Linea",
      meta: "ruta",
      symbolKind: "route-line"
    }), Object.freeze({
      id: "station",
      label: "Estacion",
      meta: "punto",
      symbolKind: "station"
    }), Object.freeze({
      id: "transfer",
      label: "Trasbordo",
      meta: "rutas",
      symbolKind: "transfer"
    }), Object.freeze({
      id: "route-terminal",
      label: "Terminal",
      meta: "origen/destino",
      symbolKind: "route-terminal",
      symbolText: "1"
    }), Object.freeze({
      id: "current-destination",
      label: "Aqui/Destino",
      meta: "viaje",
      symbolKind: "current-destination"
    }), Object.freeze({
      id: "dimension-landmark",
      label: "Dimension",
      meta: "geografia",
      symbolKind: "dimension-landmark",
      symbolText: "F"
    })]);
    const ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK = Object.freeze([Object.freeze({
      id: "geography",
      label: "Geografia",
      model: "low-saturation-grammar-geography",
      role: "base-map"
    }), Object.freeze({
      id: "track-bed",
      label: "Trazado",
      model: "low-saturation-route-track-bed",
      role: "route-ground"
    }), Object.freeze({
      id: "route-lines",
      label: "Lineas",
      model: "andrews-geography-route-lines",
      role: "transit-surface"
    }), Object.freeze({
      id: "stations",
      label: "Estaciones",
      model: "station-points-on-colored-route-lines",
      role: "grammar-coordinate"
    }), Object.freeze({
      id: "transfers",
      label: "Trasbordos",
      model: "shared-station-route-interchange",
      role: "handoff"
    }), Object.freeze({
      id: "gis-dimensions",
      label: "Capas GIS",
      model: "inter-dimensional-positioning-system",
      role: "coordinate-system"
    }), Object.freeze({
      id: "dimension-landmarks",
      label: "Hitos",
      model: "grammar-dimension-landmarks",
      role: "map-reading"
    }), Object.freeze({
      id: "route-planner",
      label: "Viaje",
      model: "passenger-route-planner",
      role: "navigation"
    }), Object.freeze({
      id: "advisory",
      label: "Avisos",
      model: "obstacle-blocked-condition-uncertainty-advisory",
      role: "service-advisory"
    })]);
    const ANDREWS_ROUTE_BOARD_MAP_APPROVAL_COORDINATE_FLOOR = 1576;
    const ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_ORDER = Object.freeze(["CNV->CNN", "CNN->CNV", "CNV->CNV", "loop", "chain"]);
    const ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_LABELS = Object.freeze({
      "CNV->CNN": Object.freeze({
        label: "CNV > CNN",
        meta: "verbal a nominal"
      }),
      "CNN->CNV": Object.freeze({
        label: "CNN > CNV",
        meta: "nominal a verbal"
      }),
      "CNV->CNV": Object.freeze({
        label: "CNV > CNV",
        meta: "verbal deverbal"
      }),
      loop: Object.freeze({
        label: "Bucle",
        meta: "regreso por transferencia"
      }),
      chain: Object.freeze({
        label: "Cadena",
        meta: "deverbal continuo"
      })
    });
    function createAndrewsRouteBoardSvgElement(tagName = "g", attributes = {}) {
      const element = targetObject.document.createElementNS(ANDREWS_ROUTE_BOARD_MAP_SVG_NS, tagName);
      Object.entries(attributes || {}).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          element.setAttribute(key, String(value));
        }
      });
      return element;
    }
    function getAndrewsRouteBoardMapRouteIdsFromEntry(entry = null) {
      if (!entry || typeof entry !== "object") {
        return [];
      }
      if (Array.isArray(entry.routeIds)) {
        return entry.routeIds.map(routeId => String(routeId || "").trim()).filter(Boolean);
      }
      const routeId = String(entry.routeId || "").trim();
      return routeId ? [routeId] : [];
    }
    function andrewsRouteBoardMapEntryIncludesRouteId(entry = null, routeId = "") {
      const normalizedRouteId = String(routeId || "").trim();
      return Boolean(normalizedRouteId && getAndrewsRouteBoardMapRouteIdsFromEntry(entry).includes(normalizedRouteId));
    }
    function findAndrewsRouteBoardMapEntryForRouteId(entries = [], routeId = "") {
      const normalizedRouteId = String(routeId || "").trim();
      if (!normalizedRouteId) {
        return null;
      }
      return (Array.isArray(entries) ? entries : []).find(entry => andrewsRouteBoardMapEntryIncludesRouteId(entry, normalizedRouteId)) || null;
    }
    function getAndrewsRouteBoardMapEntryDestinationStationKey(entry = null) {
      if (!entry || typeof entry !== "object") {
        return "";
      }
      const routeStops = Array.isArray(entry.routeStops) ? entry.routeStops : [];
      const lastStop = routeStops.length ? routeStops[routeStops.length - 1] : null;
      return String(entry.key || entry.nextSourceStageKey || entry.routeTicket?.nextSourceStageKey || entry.targetAction?.targetStageKey || entry.targetStageKey || entry.destinationKey || lastStop?.key || "").trim();
    }
    function findAndrewsRouteBoardMapEntryForStationKey(entries = [], stationKey = "") {
      const normalizedStationKey = String(stationKey || "").trim();
      if (!normalizedStationKey) {
        return null;
      }
      return (Array.isArray(entries) ? entries : []).find(entry => getAndrewsRouteBoardMapEntryDestinationStationKey(entry) === normalizedStationKey) || null;
    }
    function addAndrewsRouteBoardMapRouteIds(targetSet, entries = []) {
      (Array.isArray(entries) ? entries : []).forEach(entry => {
        getAndrewsRouteBoardMapRouteIdsFromEntry(entry).forEach(routeId => {
          targetSet.add(routeId);
        });
      });
    }
    function getAndrewsRouteBoardMapRouteIds(board = null, role = "visible") {
      const routeIds = new Set();
      if (!board || typeof board !== "object") {
        return [];
      }
      if (role === "available") {
        addAndrewsRouteBoardMapRouteIds(routeIds, board.visibleRoutes || []);
        addAndrewsRouteBoardMapRouteIds(routeIds, board.destinationOptions || []);
        addAndrewsRouteBoardMapRouteIds(routeIds, board.departures || []);
        addAndrewsRouteBoardMapRouteIds(routeIds, board.itineraries || []);
      } else if (role === "active") {
        addAndrewsRouteBoardMapRouteIds(routeIds, board.boardState === "destination" ? board.visibleRoutes || [] : []);
        getAndrewsRouteBoardMapRouteIdsFromEntry(board.recommendedRoute || null).forEach(routeId => routeIds.add(routeId));
      } else {
        addAndrewsRouteBoardMapRouteIds(routeIds, board.visibleRoutes || []);
      }
      return Array.from(routeIds);
    }
    function getAndrewsRouteBoardMapStationKeysForRoutes(routeIds = []) {
      const stationKeys = new Set();
      (Array.isArray(routeIds) ? routeIds : []).forEach(routeId => {
        const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId];
        (Array.isArray(route?.stationKeys) ? route.stationKeys : []).forEach(stationKey => {
          stationKeys.add(stationKey);
        });
      });
      return Array.from(stationKeys);
    }
    function getAndrewsRouteBoardMapStationServiceRoutes(stationKey = "") {
      const normalizedStationKey = String(stationKey || "").trim();
      if (!normalizedStationKey) {
        return [];
      }
      return Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).filter(([, route]) => Array.isArray(route?.stationKeys) && route.stationKeys.includes(normalizedStationKey)).map(([routeId, route]) => ({
        routeId,
        code: route.code || "",
        color: route.color || "",
        label: route.label || "",
        family: route.family || ""
      }));
    }
    function applyAndrewsRouteBoardMapStationServiceDataset(element, serviceRoutes = []) {
      if (!element) {
        return element;
      }
      const routes = Array.isArray(serviceRoutes) ? serviceRoutes : [];
      element.dataset.stationServiceModel = "route-codes-at-station";
      element.dataset.stationServiceRouteCount = String(routes.length);
      element.dataset.stationServiceRouteIds = routes.map(route => route.routeId).filter(Boolean).join("|");
      element.dataset.stationServiceRouteCodes = routes.map(route => route.code).filter(Boolean).join("|");
      return element;
    }
    function getAndrewsRouteBoardMapTransferEntries() {
      return Object.entries(ANDREWS_ROUTE_BOARD_MAP_STATIONS).map(([stationKey, station]) => {
        const serviceRoutes = getAndrewsRouteBoardMapStationServiceRoutes(stationKey);
        return {
          stationKey,
          station,
          serviceRoutes,
          transferKind: station?.stationRole === "transfer" || serviceRoutes.length > 1 ? "interchange" : ""
        };
      }).filter(entry => entry.transferKind && entry.serviceRoutes.length > 1);
    }
    function getAndrewsRouteBoardMapRouteTerminalEntries() {
      return Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).map(([routeId, route]) => {
        const stationKeys = Array.isArray(route?.stationKeys) ? route.stationKeys : [];
        const sourceKey = stationKeys[0] || "";
        const destinationKey = stationKeys.length ? stationKeys[stationKeys.length - 1] : "";
        const sourceStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[sourceKey] || null;
        const destinationStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[destinationKey] || null;
        return {
          routeId,
          route,
          sourceKey,
          destinationKey,
          sourceLabel: sourceStation?.label || sourceKey,
          destinationLabel: destinationStation?.label || destinationKey,
          stationCount: stationKeys.length
        };
      });
    }
    function getAndrewsRouteBoardMapRouteTerminalEndpointEntries() {
      const stationEndpointCounts = {};
      return getAndrewsRouteBoardMapRouteTerminalEntries().flatMap(entry => [{
        ...entry,
        endpointRole: "source",
        stationKey: entry.sourceKey,
        stationLabel: entry.sourceLabel
      }, {
        ...entry,
        endpointRole: "destination",
        stationKey: entry.destinationKey,
        stationLabel: entry.destinationLabel
      }]).map(entry => {
        const station = ANDREWS_ROUTE_BOARD_MAP_STATIONS[entry.stationKey] || null;
        const endpointIndex = stationEndpointCounts[entry.stationKey] || 0;
        stationEndpointCounts[entry.stationKey] = endpointIndex + 1;
        const offset = ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS[endpointIndex % ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS.length];
        return {
          ...entry,
          station,
          endpointIndex,
          x: (station?.x || 0) + offset.dx,
          y: (station?.y || 0) + offset.dy
        };
      }).filter(entry => entry.station);
    }
    function getAndrewsRouteBoardMapDestinationCalloutEntries() {
      return getAndrewsRouteBoardMapRouteTerminalEndpointEntries().filter(entry => entry.endpointRole === "destination").map(entry => {
        const route = entry.route || {};
        const anchor = String(route.destinationCalloutAnchor || "").trim() || "start";
        return {
          ...entry,
          calloutModel: "route-destination-headsign-callouts",
          calloutX: typeof route.destinationCalloutX === "number" ? route.destinationCalloutX : entry.x,
          calloutY: typeof route.destinationCalloutY === "number" ? route.destinationCalloutY : entry.y,
          calloutAnchor: anchor,
          calloutLabel: String(route.destinationCalloutLabel || entry.stationLabel || "").trim(),
          textX: anchor === "end" ? -13 : 13,
          codeX: anchor === "end" ? 0 : 0
        };
      });
    }
    function getAndrewsRouteBoardMapCorridorEntries() {
      const corridors = {};
      Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const family = route?.family || "unknown";
        if (!corridors[family]) {
          const labelFrame = ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_LABELS[family] || {};
          corridors[family] = {
            family,
            label: labelFrame.label || family,
            meta: labelFrame.meta || "",
            routes: []
          };
        }
        corridors[family].routes.push({
          routeId,
          code: route?.code || "",
          color: route?.color || "",
          label: route?.label || ""
        });
      });
      return Object.values(corridors).sort((left, right) => {
        const leftIndex = ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_ORDER.indexOf(left.family);
        const rightIndex = ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_ORDER.indexOf(right.family);
        return (leftIndex < 0 ? 99 : leftIndex) - (rightIndex < 0 ? 99 : rightIndex);
      });
    }
    function getAndrewsRouteBoardMapStationStatus(stationKey = "", {
      activeStationKeys = [],
      availableStationKeys = [],
      sourceStationKey = "",
      destinationStationKey = "",
      sourceLayerStationKeys = []
    } = {}) {
      if (stationKey && stationKey === destinationStationKey) {
        return "destination";
      }
      if (stationKey && stationKey === sourceStationKey) {
        return "current";
      }
      if (Array.isArray(sourceLayerStationKeys) && sourceLayerStationKeys.includes(stationKey)) {
        return "source-layer";
      }
      if (Array.isArray(activeStationKeys) && activeStationKeys.includes(stationKey)) {
        return "route";
      }
      if (Array.isArray(availableStationKeys) && availableStationKeys.includes(stationKey)) {
        return "available";
      }
      return "terrain";
    }
    function getAndrewsRouteBoardMapStationLabelPlacement(station = null) {
      const labelDx = typeof station?.labelDx === "number" ? station.labelDx : station?.x > 500 ? -10 : 10;
      const labelDy = typeof station?.labelDy === "number" ? station.labelDy : station?.y > 210 ? -11 : 18;
      const labelAnchor = String(station?.labelAnchor || "").trim() || (station?.x > 500 ? "end" : "start");
      return {
        placementModel: "cartographic-station-label-placement",
        labelDx,
        labelDy,
        labelAnchor,
        flagDy: labelDy < 0 ? labelDy - 14 : labelDy + 14
      };
    }
    function getAndrewsRouteBoardMapStationRouteEntry(stationKey = "", board = null, baseBoard = null) {
      return findAndrewsRouteBoardMapEntryForStationKey(board?.visibleRoutes || [], stationKey) || findAndrewsRouteBoardMapEntryForStationKey(board?.destinationOptions || [], stationKey) || findAndrewsRouteBoardMapEntryForStationKey(baseBoard?.destinationOptions || [], stationKey) || findAndrewsRouteBoardMapEntryForStationKey(board?.departures || [], stationKey) || findAndrewsRouteBoardMapEntryForStationKey(board?.itineraries || [], stationKey) || null;
    }
    function getAndrewsRouteBoardMapStationFunctionUse(stationKey = "", station = null) {
      const normalized = `${stationKey} ${station?.label || ""}`.toLowerCase();
      if (/active-action|accion activa/.test(normalized)) {
        return "active-action";
      }
      if (/denominal/.test(normalized)) {
        return "denominal";
      }
      if (/deverbal/.test(normalized)) {
        return "deverbal";
      }
      return "deferred-last";
    }
    function getAndrewsRouteBoardMapStationCoordinateFrame(stationKey = "", station = null, stationStatus = "") {
      const parts = String(stationKey || "").split(":");
      const formulaType = parts[0] || "";
      const formulaPosition = parts[1] || "";
      const stemRank = parts[2] || "";
      const slotOwnerLabels = {
        predicate: "predicate",
        core: "core",
        "predicate-stem": "stem"
      };
      const functionUse = getAndrewsRouteBoardMapStationFunctionUse(stationKey, station);
      const coordinateParts = [formulaType, formulaPosition, stemRank, slotOwnerLabels[formulaPosition] || formulaPosition, functionUse].filter(Boolean);
      return {
        kind: "andrews-route-board-map-station-coordinate-frame",
        version: 1,
        coordinateModel: "formula-boundary-stem-rank-source-target-route-slot-ownership-function-use",
        dimensionOrder: ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.map(entry => entry.id),
        stationKey,
        stationLabel: station?.label || "",
        stationStatus: stationStatus || "",
        formulaType,
        formulaPosition,
        stemRank,
        sourceTargetRoute: stationStatus || "terrain",
        slotOwner: slotOwnerLabels[formulaPosition] || formulaPosition,
        functionUse,
        coordinateLabel: coordinateParts.join(" · ")
      };
    }
    function applyAndrewsRouteBoardMapStationCoordinateDataset(element, coordinateFrame = null) {
      if (!element || !coordinateFrame) {
        return element;
      }
      element.dataset.stationCoordinateModel = coordinateFrame.coordinateModel || "";
      element.dataset.stationDimensionOrder = Array.isArray(coordinateFrame.dimensionOrder) ? coordinateFrame.dimensionOrder.join("|") : "";
      element.dataset.stationFormulaType = coordinateFrame.formulaType || "";
      element.dataset.stationFormulaPosition = coordinateFrame.formulaPosition || "";
      element.dataset.stationStemRank = coordinateFrame.stemRank || "";
      element.dataset.stationSourceTargetRoute = coordinateFrame.sourceTargetRoute || "";
      element.dataset.stationSlotOwner = coordinateFrame.slotOwner || "";
      element.dataset.stationFunctionUse = coordinateFrame.functionUse || "";
      element.dataset.stationCoordinateLabel = coordinateFrame.coordinateLabel || "";
      return element;
    }
    function getAndrewsRouteBoardMapGisLayerValue(coordinateFrame = null, layerId = "") {
      if (!coordinateFrame) {
        return "";
      }
      switch (layerId) {
        case "formula-boundary":
          return coordinateFrame.formulaType || "";
        case "stem-rank":
          return coordinateFrame.stemRank || "";
        case "source-target-route":
          return coordinateFrame.sourceTargetRoute || "";
        case "slot-ownership":
          return coordinateFrame.slotOwner || "";
        case "function-use":
          return coordinateFrame.functionUse || "";
        default:
          return "";
      }
    }
    function getAndrewsRouteBoardMapGisLayerEntries(sourceCoordinate = null, destinationCoordinate = null) {
      return ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.map((entry, index) => {
        const sourceValue = getAndrewsRouteBoardMapGisLayerValue(sourceCoordinate, entry.id);
        const destinationValue = getAndrewsRouteBoardMapGisLayerValue(destinationCoordinate, entry.id);
        const layerStatus = destinationValue ? "routed" : sourceValue ? "source" : "open";
        const plannerRole = entry.id === "function-use" ? "resolve-last" : entry.id === "source-target-route" ? "route-path" : "coordinate";
        return {
          id: entry.id,
          index: index + 1,
          shortLabel: entry.shortLabel,
          label: entry.label,
          sourceValue,
          destinationValue,
          layerStatus,
          plannerRole
        };
      });
    }
    function appendAndrewsRouteBoardMapDimensionScale(parent, board = null, coordinateFrames = {}) {
      const dimensions = targetObject.document.createElement("div");
      dimensions.className = "andrews-route-board__map-dimensions";
      dimensions.dataset.mapDimensionModel = "inter-dimensional-positioning-system";
      dimensions.dataset.mapGisLayerModel = "layered-grammar-gis";
      dimensions.dataset.mapTransitSurfaceModel = "transit-map-surface";
      dimensions.dataset.mapRoutePlannerModel = "passenger-route-planner";
      dimensions.dataset.mapDimensionOrder = ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.map(entry => entry.id).join("|");
      const sourceCoordinate = coordinateFrames[board?.currentStation?.key || ""] || null;
      const destinationCoordinate = coordinateFrames[board?.destinationStation?.key || ""] || null;
      const layerEntries = getAndrewsRouteBoardMapGisLayerEntries(sourceCoordinate, destinationCoordinate);
      dimensions.dataset.mapCurrentCoordinate = sourceCoordinate?.coordinateLabel || "";
      dimensions.dataset.mapDestinationCoordinate = destinationCoordinate?.coordinateLabel || "";
      dimensions.dataset.mapGisLayerCount = String(layerEntries.length);
      dimensions.dataset.mapGisLayerIds = layerEntries.map(entry => entry.id).join("|");
      dimensions.dataset.mapOpenLayerCount = String(layerEntries.filter(entry => entry.layerStatus === "open").length);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-dimensions-label";
      label.textContent = "Capas GIS";
      const chipWrap = targetObject.document.createElement("span");
      chipWrap.className = "andrews-route-board__map-dimension-chips";
      layerEntries.forEach(entry => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__map-dimension-chip";
        chip.dataset.dimensionId = entry.id;
        chip.dataset.dimensionIndex = String(entry.index);
        chip.dataset.mapGisLayerStatus = entry.layerStatus;
        chip.dataset.mapPlannerRole = entry.plannerRole;
        chip.dataset.sourceCoordinateValue = entry.sourceValue;
        chip.dataset.destinationCoordinateValue = entry.destinationValue;
        chip.title = entry.label;
        chip.textContent = `${entry.index}. ${entry.shortLabel}`;
        chipWrap.appendChild(chip);
      });
      const layerList = targetObject.document.createElement("div");
      layerList.className = "andrews-route-board__map-gis-layer-list";
      layerList.dataset.mapGisLayerModel = "layered-grammar-gis";
      layerList.dataset.mapGisLayerCount = String(layerEntries.length);
      layerEntries.forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-gis-layer";
        item.dataset.dimensionId = entry.id;
        item.dataset.dimensionIndex = String(entry.index);
        item.dataset.mapGisLayerStatus = entry.layerStatus;
        item.dataset.mapPlannerRole = entry.plannerRole;
        item.dataset.sourceCoordinateValue = entry.sourceValue;
        item.dataset.destinationCoordinateValue = entry.destinationValue;
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__map-gis-layer-name";
        name.textContent = entry.shortLabel;
        const value = targetObject.document.createElement("span");
        value.className = "andrews-route-board__map-gis-layer-value";
        value.textContent = [entry.sourceValue || "abierto", entry.destinationValue || "abierto"].join(" > ");
        item.append(name, value);
        layerList.appendChild(item);
      });
      dimensions.append(label, chipWrap, layerList);
      if (sourceCoordinate?.coordinateLabel) {
        dimensions.title = sourceCoordinate.coordinateLabel;
      }
      parent.appendChild(dimensions);
      return dimensions;
    }
    function getAndrewsRouteBoardMapPrimaryRouteSign(board = null) {
      const recommendedRouteIds = Array.isArray(board?.recommendedRoute?.routeIds) ? board.recommendedRoute.routeIds : [];
      const primaryEntry = getAndrewsRouteBoardMapPrimaryRouteEntry(board);
      const primaryRouteIds = recommendedRouteIds.length ? recommendedRouteIds : getAndrewsRouteBoardMapRouteIdsFromEntry(primaryEntry);
      return {
        routeIds: primaryRouteIds,
        routeKey: primaryRouteIds.join("|"),
        routePathLabel: board?.recommendedRoute?.routePathLabel || getAndrewsRouteBoardEntryRoutePathLabel(primaryEntry) || "",
        actionLabel: board?.recommendedRoute?.actionLabel || primaryEntry?.routeActionLabel || primaryEntry?.routeActionFrame?.actionLabel || "",
        nextStationKey: board?.recommendedRoute?.nextSourceStageKey || primaryEntry?.nextSourceStageKey || primaryEntry?.routeTicket?.nextSourceStageKey || "",
        nextStationLabel: board?.recommendedRoute?.nextSourceLabel || primaryEntry?.nextSourceLabel || primaryEntry?.label || primaryEntry?.targetLabel || "",
        resistanceScore: Number(board?.recommendedRoute?.resistanceScore || primaryEntry?.resistanceScore || primaryEntry?.routeTicket?.resistanceScore || 0)
      };
    }
    function getAndrewsRouteBoardMapPrimaryRouteEntry(board = null) {
      const visibleRoutes = Array.isArray(board?.visibleRoutes) ? board.visibleRoutes : [];
      const recommendedRouteIds = Array.isArray(board?.recommendedRoute?.routeIds) ? board.recommendedRoute.routeIds : [];
      const recommendedRouteKey = recommendedRouteIds.join("|");
      return (recommendedRouteKey ? visibleRoutes.find(entry => getAndrewsRouteBoardMapEntryRouteKey(entry) === recommendedRouteKey) : null) || visibleRoutes[0] || null;
    }
    function appendAndrewsRouteBoardMapWayfinding(parent, board = null, coordinateFrames = {}) {
      const currentStationKey = board?.currentStation?.key || "";
      const destinationStationKey = board?.destinationStation?.key || "";
      const currentCoordinate = coordinateFrames[currentStationKey] || null;
      const destinationCoordinate = coordinateFrames[destinationStationKey] || null;
      const routeSign = getAndrewsRouteBoardMapPrimaryRouteSign(board);
      const wayfinding = targetObject.document.createElement("div");
      wayfinding.className = "andrews-route-board__map-wayfinding";
      wayfinding.dataset.mapWayfindingModel = "passenger-station-signs";
      wayfinding.dataset.currentStation = currentStationKey;
      wayfinding.dataset.currentCoordinate = currentCoordinate?.coordinateLabel || "";
      wayfinding.dataset.nextStation = routeSign.nextStationKey || "";
      wayfinding.dataset.nextStationLabel = routeSign.nextStationLabel || "";
      wayfinding.dataset.destinationStation = destinationStationKey;
      wayfinding.dataset.destinationCoordinate = destinationCoordinate?.coordinateLabel || "";
      wayfinding.dataset.routeIds = routeSign.routeKey || "";
      wayfinding.dataset.routePathLabel = routeSign.routePathLabel || "";
      wayfinding.dataset.primaryActionLabel = routeSign.actionLabel || "";
      const signs = [{
        role: "current",
        label: "Aqui",
        value: board?.currentStation?.label || "",
        meta: currentCoordinate?.formulaType || "",
        title: currentCoordinate?.coordinateLabel || ""
      }, {
        role: "route",
        label: routeSign.actionLabel || "Via",
        value: routeSign.routePathLabel || routeSign.nextStationLabel || "",
        meta: routeSign.resistanceScore ? `R${routeSign.resistanceScore}` : "",
        title: routeSign.routePathLabel || routeSign.nextStationLabel || ""
      }, {
        role: "destination",
        label: "Destino",
        value: board?.destinationStation?.label || routeSign.nextStationLabel || "Salidas",
        meta: destinationCoordinate?.formulaType || "",
        title: destinationCoordinate?.coordinateLabel || routeSign.nextStationLabel || ""
      }];
      signs.forEach(sign => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-wayfinding-sign";
        item.dataset.signRole = sign.role;
        item.dataset.signLabel = sign.label;
        item.dataset.signValue = sign.value;
        if (sign.title) {
          item.title = sign.title;
        }
        const label = targetObject.document.createElement("span");
        label.className = "andrews-route-board__map-wayfinding-label";
        label.textContent = sign.label;
        const value = targetObject.document.createElement("span");
        value.className = "andrews-route-board__map-wayfinding-value";
        value.textContent = sign.value || "";
        item.append(label, value);
        if (sign.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-wayfinding-meta";
          meta.textContent = sign.meta;
          item.appendChild(meta);
        }
        wayfinding.appendChild(item);
      });
      parent.appendChild(wayfinding);
      return wayfinding;
    }
    function getAndrewsRouteBoardMapItineraryFrame(board = null, coordinateFrames = {}) {
      const primaryEntry = getAndrewsRouteBoardMapPrimaryRouteEntry(board);
      const route = Array.isArray(primaryEntry?.routes) ? primaryEntry.routes[0] : primaryEntry;
      const routeTicket = primaryEntry?.routeTicket || route?.routeTicket || null;
      const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(primaryEntry);
      const routeStops = getAndrewsRouteBoardRouteStops(primaryEntry, route, routeTicket);
      const fallbackNext = getAndrewsRouteBoardMapPrimaryRouteSign(board);
      const fallbackStops = [{
        key: board?.currentStation?.key || "",
        label: board?.currentStation?.label || ""
      }, {
        key: fallbackNext.nextStationKey || board?.destinationStation?.key || "",
        label: fallbackNext.nextStationLabel || board?.destinationStation?.label || ""
      }].filter((stop, index, stops) => {
        const key = String(stop.key || "").trim();
        const label = String(stop.label || "").trim();
        return Boolean((key || label) && (index === 0 || key !== stops[0]?.key || label !== stops[0]?.label));
      });
      const stops = routeStops.length ? routeStops : fallbackStops;
      const firstStop = stops[0] || null;
      const lastStop = stops[stops.length - 1] || null;
      const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(primaryEntry) || stops.map(stop => stop.label || stop.key).filter(Boolean).join(" > ");
      return {
        kind: "andrews-route-board-map-itinerary-frame",
        version: 1,
        itineraryModel: "current-to-destination-passenger-path",
        boardState: board?.boardState || "",
        actionLabel: board?.recommendedRoute?.actionLabel || primaryEntry?.routeActionLabel || primaryEntry?.routeActionFrame?.actionLabel || fallbackNext.actionLabel || "",
        routeIds,
        routePathLabel,
        sourceStation: firstStop?.key || board?.currentStation?.key || "",
        destinationStation: lastStop?.key || board?.destinationStation?.key || "",
        stops,
        segmentCount: Number(primaryEntry?.segmentCount || route?.segmentCount || routeTicket?.segmentCount || Math.max(stops.length - 1, 1)),
        transferCount: Number(primaryEntry?.transferCount || route?.transferCount || routeTicket?.transferCount || Math.max(stops.length - 2, 0)),
        resistanceScore: Number(primaryEntry?.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || fallbackNext.resistanceScore || 0),
        hiddenCoordinateCount: Number(primaryEntry?.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0),
        coordinates: stops.map(stop => coordinateFrames[stop.key] || null)
      };
    }
    function getAndrewsRouteBoardMapTripPreviewFrame(board = null, coordinateFrames = {}) {
      const itinerary = getAndrewsRouteBoardMapItineraryFrame(board, coordinateFrames);
      const routeSign = getAndrewsRouteBoardMapPrimaryRouteSign(board);
      const routeIds = routeSign.routeIds.length ? routeSign.routeIds : itinerary.routeIds;
      const routeCodes = routeIds.map(routeId => ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId]?.code || "").filter(Boolean);
      const currentStationKey = board?.currentStation?.key || itinerary.sourceStation || "";
      const destinationStationKey = board?.destinationStation?.key || itinerary.destinationStation || routeSign.nextStationKey || "";
      const currentStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[currentStationKey] || null;
      const destinationStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[destinationStationKey] || null;
      const currentCoordinate = coordinateFrames[currentStationKey] || null;
      const destinationCoordinate = coordinateFrames[destinationStationKey] || null;
      const passengerFrame = board?.passengerFrame && typeof board.passengerFrame === "object" ? board.passengerFrame : null;
      const rideFrame = board?.rideFrame && typeof board.rideFrame === "object" ? board.rideFrame : null;
      return {
        kind: "andrews-route-board-map-trip-preview-frame",
        version: 1,
        previewModel: "passenger-route-preview-board",
        currentIntention: passengerFrame?.currentIntention || rideFrame?.currentIntention || board?.boardState || "",
        currentStationKey,
        currentStationLabel: board?.currentStation?.label || currentStation?.label || currentStationKey,
        currentCoordinate: currentCoordinate?.coordinateLabel || "",
        destinationStationKey,
        destinationStationLabel: board?.destinationStation?.label || destinationStation?.label || routeSign.nextStationLabel || "Destino abierto",
        destinationCoordinate: destinationCoordinate?.coordinateLabel || "",
        routeIds,
        routeCodes,
        routePathLabel: routeSign.routePathLabel || itinerary.routePathLabel || "",
        actionLabel: passengerFrame?.primaryActionLabel || rideFrame?.primaryActionLabel || routeSign.actionLabel || itinerary.actionLabel || "Explorar",
        stopCount: itinerary.stops.length,
        transferCount: itinerary.transferCount,
        segmentCount: itinerary.segmentCount,
        resistanceScore: itinerary.resistanceScore || routeSign.resistanceScore || 0,
        routeStops: itinerary.stops.map(stop => stop.key || stop.label).filter(Boolean)
      };
    }
    function appendAndrewsRouteBoardMapTripPreview(parent, board = null, coordinateFrames = {}) {
      const frame = getAndrewsRouteBoardMapTripPreviewFrame(board, coordinateFrames);
      const preview = targetObject.document.createElement("div");
      preview.className = "andrews-route-board__map-trip-preview";
      preview.dataset.mapTripPreviewModel = frame.previewModel;
      preview.dataset.currentIntention = frame.currentIntention;
      preview.dataset.currentStation = frame.currentStationKey;
      preview.dataset.currentCoordinate = frame.currentCoordinate;
      preview.dataset.destinationStation = frame.destinationStationKey;
      preview.dataset.destinationCoordinate = frame.destinationCoordinate;
      preview.dataset.routeIds = frame.routeIds.join("|");
      preview.dataset.routeCodes = frame.routeCodes.join("|");
      preview.dataset.routePathLabel = frame.routePathLabel;
      preview.dataset.routeActionLabel = frame.actionLabel;
      preview.dataset.routeStopCount = String(frame.stopCount || 0);
      preview.dataset.routeStops = frame.routeStops.join("|");
      preview.dataset.segmentCount = String(frame.segmentCount || 0);
      preview.dataset.transferCount = String(frame.transferCount || 0);
      preview.dataset.resistanceScore = String(frame.resistanceScore || 0);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-trip-preview-label";
      label.textContent = "Viaje";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-trip-preview-list";
      [{
        role: "current",
        roleLabel: "Estoy",
        main: frame.currentStationLabel || "Entrada",
        meta: frame.currentCoordinate || ""
      }, {
        role: "destination",
        roleLabel: "Voy",
        main: frame.destinationStationLabel || "Destino abierto",
        meta: frame.destinationCoordinate || ""
      }, {
        role: "route",
        roleLabel: "Linea",
        main: frame.routePathLabel || frame.routeCodes.join(" + ") || "Salidas",
        meta: [frame.actionLabel, frame.segmentCount === 1 ? "1 tramo" : `${frame.segmentCount || 0} tramos`, frame.transferCount ? `${frame.transferCount} trasbordo` : "", frame.resistanceScore ? `R${frame.resistanceScore}` : ""].filter(Boolean).join(" · ")
      }].forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-trip-preview-item";
        item.dataset.tripPreviewRole = entry.role;
        const role = targetObject.document.createElement("span");
        role.className = "andrews-route-board__map-trip-preview-role";
        role.textContent = entry.roleLabel;
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-trip-preview-main";
        main.textContent = entry.main || "";
        item.append(role, main);
        if (entry.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-trip-preview-meta";
          meta.textContent = entry.meta;
          item.appendChild(meta);
        }
        list.appendChild(item);
      });
      preview.append(label, list);
      parent.appendChild(preview);
      return preview;
    }
    function getAndrewsRouteBoardMapAnnouncementFrame(board = null, coordinateFrames = {}) {
      const progress = getAndrewsRouteBoardMapProgressFrame(board, coordinateFrames);
      const trip = getAndrewsRouteBoardMapTripPreviewFrame(board, coordinateFrames);
      const routeCodes = Array.isArray(trip.routeCodes) ? trip.routeCodes : [];
      const nextCoordinate = coordinateFrames[progress?.nextStationKey || ""] || null;
      return {
        kind: "andrews-route-board-map-announcement-frame",
        version: 1,
        announcementModel: "passenger-next-stop-announcements",
        currentStationKey: progress?.currentStationKey || trip.currentStationKey || "",
        nextStationKey: progress?.nextStationKey || trip.destinationStationKey || "",
        destinationStationKey: progress?.destinationStationKey || trip.destinationStationKey || "",
        nextStationLabel: progress?.nextStationLabel || trip.destinationStationLabel || "Salidas",
        nextCoordinate: nextCoordinate?.coordinateLabel || "",
        routeCodes,
        routePathLabel: progress?.routePathLabel || trip.routePathLabel || "",
        actionLabel: progress?.actionLabel || trip.actionLabel || "Explorar",
        progressState: progress?.progressState || "at-station",
        transferCount: Number(progress?.transferCount || trip.transferCount || 0),
        segmentCount: Number(progress?.segmentCount || trip.segmentCount || 0),
        resistanceScore: Number(progress?.resistanceScore || trip.resistanceScore || 0)
      };
    }
    function appendAndrewsRouteBoardMapAnnouncements(parent, board = null, coordinateFrames = {}) {
      const frame = getAndrewsRouteBoardMapAnnouncementFrame(board, coordinateFrames);
      const announcements = targetObject.document.createElement("div");
      announcements.className = "andrews-route-board__map-announcements";
      announcements.dataset.mapAnnouncementModel = frame.announcementModel;
      announcements.dataset.currentStation = frame.currentStationKey;
      announcements.dataset.nextStation = frame.nextStationKey;
      announcements.dataset.destinationStation = frame.destinationStationKey;
      announcements.dataset.nextCoordinate = frame.nextCoordinate;
      announcements.dataset.routeCodes = frame.routeCodes.join("|");
      announcements.dataset.routePathLabel = frame.routePathLabel;
      announcements.dataset.routeActionLabel = frame.actionLabel;
      announcements.dataset.mapProgressState = frame.progressState;
      announcements.dataset.segmentCount = String(frame.segmentCount || 0);
      announcements.dataset.transferCount = String(frame.transferCount || 0);
      announcements.dataset.resistanceScore = String(frame.resistanceScore || 0);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-announcements-label";
      label.textContent = "Aviso";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-announcement-list";
      [{
        role: "next",
        label: "Siguiente",
        value: frame.nextStationLabel || "Salidas",
        meta: frame.nextCoordinate || ""
      }, {
        role: "route",
        label: frame.routeCodes.length ? `Linea ${frame.routeCodes.join("+")}` : "Linea",
        value: frame.routePathLabel || frame.actionLabel || "",
        meta: frame.actionLabel || ""
      }, {
        role: "terrain",
        label: "Terreno",
        value: frame.transferCount ? `${frame.transferCount} trasbordo` : "Directo",
        meta: frame.resistanceScore ? `R${frame.resistanceScore}` : ""
      }].forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-announcement";
        item.dataset.announcementRole = entry.role;
        const itemLabel = targetObject.document.createElement("span");
        itemLabel.className = "andrews-route-board__map-announcement-label";
        itemLabel.textContent = entry.label;
        const value = targetObject.document.createElement("span");
        value.className = "andrews-route-board__map-announcement-value";
        value.textContent = entry.value || "";
        item.append(itemLabel, value);
        if (entry.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-announcement-meta";
          meta.textContent = entry.meta;
          item.appendChild(meta);
        }
        list.appendChild(item);
      });
      announcements.append(label, list);
      parent.appendChild(announcements);
      return announcements;
    }
    function getAndrewsRouteBoardMapTransferGuidanceFrame(board = null, coordinateFrames = {}) {
      const itinerary = getAndrewsRouteBoardMapItineraryFrame(board, coordinateFrames);
      const trip = getAndrewsRouteBoardMapTripPreviewFrame(board, coordinateFrames);
      const routeIds = trip.routeIds.length ? trip.routeIds : itinerary.routeIds;
      const routeCodes = trip.routeCodes.length ? trip.routeCodes : routeIds.map(routeId => ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId]?.code || "").filter(Boolean);
      const transferStops = itinerary.stops.slice(1, Math.max(itinerary.stops.length - 1, 1));
      const transferStationKeys = transferStops.map(stop => stop.key || "").filter(Boolean);
      const transferStationLabels = transferStops.map(stop => stop.label || stop.key || "").filter(Boolean);
      const transferCoordinates = transferStationKeys.map(stationKey => coordinateFrames[stationKey]?.coordinateLabel || "").filter(Boolean);
      const transferCount = Number(itinerary.transferCount || transferStops.length || 0);
      const directRide = transferCount === 0 && transferStationLabels.length === 0;
      return {
        kind: "andrews-route-board-map-transfer-guidance-frame",
        version: 1,
        guidanceModel: "passenger-transfer-guidance-board",
        routeIds,
        routeCodes,
        routePathLabel: trip.routePathLabel || itinerary.routePathLabel || "",
        actionLabel: trip.actionLabel || itinerary.actionLabel || "Explorar",
        sourceStation: itinerary.sourceStation || trip.currentStationKey || "",
        destinationStation: itinerary.destinationStation || trip.destinationStationKey || "",
        stopCount: itinerary.stops.length,
        segmentCount: Number(itinerary.segmentCount || trip.segmentCount || 0),
        transferCount,
        directRide,
        transferStops,
        transferStationKeys,
        transferStationLabels,
        transferCoordinates,
        resistanceScore: Number(itinerary.resistanceScore || trip.resistanceScore || 0)
      };
    }
    function appendAndrewsRouteBoardMapTransferGuidance(parent, board = null, coordinateFrames = {}) {
      const frame = getAndrewsRouteBoardMapTransferGuidanceFrame(board, coordinateFrames);
      const guidance = targetObject.document.createElement("div");
      guidance.className = "andrews-route-board__map-transfer-guidance";
      guidance.dataset.mapTransferGuidanceModel = frame.guidanceModel;
      guidance.dataset.routeIds = frame.routeIds.join("|");
      guidance.dataset.routeCodes = frame.routeCodes.join("|");
      guidance.dataset.routePathLabel = frame.routePathLabel;
      guidance.dataset.routeActionLabel = frame.actionLabel;
      guidance.dataset.sourceStation = frame.sourceStation;
      guidance.dataset.destinationStation = frame.destinationStation;
      guidance.dataset.routeStopCount = String(frame.stopCount || 0);
      guidance.dataset.segmentCount = String(frame.segmentCount || 0);
      guidance.dataset.transferCount = String(frame.transferCount || 0);
      guidance.dataset.directRide = String(frame.directRide === true);
      guidance.dataset.transferStations = frame.transferStationKeys.join("|");
      guidance.dataset.transferCoordinates = frame.transferCoordinates.join("|");
      guidance.dataset.resistanceScore = String(frame.resistanceScore || 0);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-transfer-guidance-label";
      label.textContent = "Cambio";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-transfer-guidance-list";
      [{
        role: "ride",
        label: "Tren",
        main: frame.directRide ? "Directo" : `${frame.transferCount} ${frame.transferCount === 1 ? "trasbordo" : "trasbordos"}`,
        meta: frame.directRide ? "sin cambio manual" : "cambio guiado"
      }, {
        role: "station",
        label: "Estacion",
        main: frame.transferStationLabels.length ? frame.transferStationLabels.join(" > ") : "Sin cambio",
        meta: frame.transferCoordinates.join(" > ")
      }, {
        role: "route",
        label: frame.routeCodes.length ? `Linea ${frame.routeCodes.join("+")}` : "Linea",
        main: frame.routePathLabel || frame.actionLabel || "",
        meta: [frame.actionLabel || "", frame.resistanceScore ? `R${frame.resistanceScore}` : ""].filter(Boolean).join(" · ")
      }].forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-transfer-guidance-item";
        item.dataset.transferGuidanceRole = entry.role;
        const itemLabel = targetObject.document.createElement("span");
        itemLabel.className = "andrews-route-board__map-transfer-guidance-item-label";
        itemLabel.textContent = entry.label;
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-transfer-guidance-main";
        main.textContent = entry.main || "";
        item.append(itemLabel, main);
        if (entry.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-transfer-guidance-meta";
          meta.textContent = entry.meta;
          item.appendChild(meta);
        }
        list.appendChild(item);
      });
      guidance.append(label, list);
      parent.appendChild(guidance);
      return guidance;
    }
    function getAndrewsRouteBoardMapHeadsignFrame(board = null, coordinateFrames = {}) {
      const trip = getAndrewsRouteBoardMapTripPreviewFrame(board, coordinateFrames);
      const transfer = getAndrewsRouteBoardMapTransferGuidanceFrame(board, coordinateFrames);
      const platformFrame = board?.platformFrame && typeof board.platformFrame === "object" ? board.platformFrame : null;
      const tracks = Array.isArray(platformFrame?.tracks) ? platformFrame.tracks : [];
      const selectedTrack = tracks.find(entry => /^(next|arrival)$/.test(entry?.recommendationRole || "")) || tracks.find(entry => Array.isArray(entry?.routeIds) && entry.routeIds.some(routeId => trip.routeIds.includes(routeId))) || tracks[0] || null;
      const routeIds = trip.routeIds.length ? trip.routeIds : Array.isArray(selectedTrack?.routeIds) ? selectedTrack.routeIds : [];
      const routeCodes = trip.routeCodes.length ? trip.routeCodes : routeIds.map(routeId => ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId]?.code || "").filter(Boolean);
      const destinationLabel = trip.destinationStationLabel || selectedTrack?.destinationLabel || board?.destinationStation?.label || "Salidas";
      const routePathLabel = trip.routePathLabel || selectedTrack?.routePathLabel || [trip.currentStationLabel || selectedTrack?.sourceLabel || "", destinationLabel].filter(Boolean).join(" > ");
      return {
        kind: "andrews-route-board-map-headsign-frame",
        version: 1,
        headsignModel: "passenger-headsign-boarding-direction",
        currentStationKey: trip.currentStationKey || selectedTrack?.sourceKey || "",
        currentStationLabel: trip.currentStationLabel || selectedTrack?.sourceLabel || "",
        destinationStationKey: trip.destinationStationKey || selectedTrack?.destinationKey || "",
        destinationStationLabel: destinationLabel,
        routeIds,
        routeCodes,
        routePathLabel,
        actionLabel: trip.actionLabel || selectedTrack?.actionLabel || "Siguiente",
        platformId: selectedTrack?.id || "",
        platformLabel: selectedTrack?.label || "",
        recommendationRole: selectedTrack?.recommendationRole || trip.currentIntention || "",
        directRide: transfer.directRide === true,
        transferCount: transfer.transferCount,
        segmentCount: trip.segmentCount,
        resistanceScore: trip.resistanceScore
      };
    }
    function appendAndrewsRouteBoardMapHeadsign(parent, board = null, coordinateFrames = {}) {
      const frame = getAndrewsRouteBoardMapHeadsignFrame(board, coordinateFrames);
      const headsign = targetObject.document.createElement("div");
      headsign.className = "andrews-route-board__map-headsign";
      headsign.dataset.mapHeadsignModel = frame.headsignModel;
      headsign.dataset.currentStation = frame.currentStationKey;
      headsign.dataset.destinationStation = frame.destinationStationKey;
      headsign.dataset.destinationLabel = frame.destinationStationLabel;
      headsign.dataset.routeIds = frame.routeIds.join("|");
      headsign.dataset.routeCodes = frame.routeCodes.join("|");
      headsign.dataset.routePathLabel = frame.routePathLabel;
      headsign.dataset.routeActionLabel = frame.actionLabel;
      headsign.dataset.platformId = frame.platformId;
      headsign.dataset.platformLabel = frame.platformLabel;
      headsign.dataset.routeRecommendation = frame.recommendationRole;
      headsign.dataset.directRide = String(frame.directRide === true);
      headsign.dataset.transferCount = String(frame.transferCount || 0);
      headsign.dataset.segmentCount = String(frame.segmentCount || 0);
      headsign.dataset.resistanceScore = String(frame.resistanceScore || 0);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-headsign-label";
      label.textContent = "Abordaje";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-headsign-list";
      [{
        role: "line",
        label: "Linea",
        main: frame.routeCodes.length ? frame.routeCodes.join(" + ") : "Ruta",
        meta: frame.directRide ? "directo" : `${frame.transferCount || 0} trasbordo`
      }, {
        role: "direction",
        label: "Hacia",
        main: frame.destinationStationLabel || "Salidas",
        meta: frame.routePathLabel || ""
      }, {
        role: "boarding",
        label: frame.platformLabel || "Anden",
        main: frame.actionLabel || "Siguiente",
        meta: [frame.segmentCount === 1 ? "1 tramo" : `${frame.segmentCount || 0} tramos`, frame.resistanceScore ? `R${frame.resistanceScore}` : ""].filter(Boolean).join(" · ")
      }].forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-headsign-item";
        item.dataset.headsignRole = entry.role;
        const itemLabel = targetObject.document.createElement("span");
        itemLabel.className = "andrews-route-board__map-headsign-item-label";
        itemLabel.textContent = entry.label;
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-headsign-main";
        main.textContent = entry.main || "";
        item.append(itemLabel, main);
        if (entry.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-headsign-meta";
          meta.textContent = entry.meta;
          item.appendChild(meta);
        }
        list.appendChild(item);
      });
      headsign.append(label, list);
      parent.appendChild(headsign);
      return headsign;
    }
    function getAndrewsRouteBoardMapContinuityFrame(board = null, coordinateFrames = {}) {
      const trip = getAndrewsRouteBoardMapTripPreviewFrame(board, coordinateFrames);
      const transfer = getAndrewsRouteBoardMapTransferGuidanceFrame(board, coordinateFrames);
      const passengerFrame = board?.passengerFrame && typeof board.passengerFrame === "object" ? board.passengerFrame : {};
      const rideFrame = board?.rideFrame && typeof board.rideFrame === "object" ? board.rideFrame : {};
      const decisionLoad = rideFrame.decisionLoad && typeof rideFrame.decisionLoad === "object" ? rideFrame.decisionLoad : {};
      const passengerJourneyModel = passengerFrame.journeyModel || "";
      const rideJourneyModel = rideFrame.outputJourneyModel || "";
      const formulaSurfaceShared = passengerJourneyModel === "formula-and-surface-share-one-passenger-frame" || rideJourneyModel === "formula-and-surface-share-one-ride-frame";
      const switchingRequired = decisionLoad.switchingRequired === true;
      return {
        kind: "andrews-route-board-map-continuity-frame",
        version: 1,
        continuityModel: "formula-surface-through-service",
        passengerJourneyModel,
        rideJourneyModel,
        sharedRouteBoard: passengerFrame.intentionFrame?.sharedRouteBoard === true,
        formulaSurfaceShared,
        switchingRequired,
        throughService: formulaSurfaceShared && switchingRequired !== true,
        directRide: transfer.directRide === true,
        transferCount: transfer.transferCount,
        routeIds: trip.routeIds,
        routeCodes: trip.routeCodes,
        routePathLabel: trip.routePathLabel || transfer.routePathLabel || "",
        actionLabel: trip.actionLabel || transfer.actionLabel || "Siguiente",
        sourceStation: trip.currentStationKey || transfer.sourceStation || "",
        destinationStation: trip.destinationStationKey || transfer.destinationStation || "",
        destinationLabel: trip.destinationStationLabel || "",
        segmentCount: trip.segmentCount,
        resistanceScore: trip.resistanceScore
      };
    }
    function appendAndrewsRouteBoardMapContinuity(parent, board = null, coordinateFrames = {}) {
      const frame = getAndrewsRouteBoardMapContinuityFrame(board, coordinateFrames);
      const continuity = targetObject.document.createElement("div");
      continuity.className = "andrews-route-board__map-continuity";
      continuity.dataset.mapContinuityModel = frame.continuityModel;
      continuity.dataset.passengerJourneyModel = frame.passengerJourneyModel;
      continuity.dataset.rideJourneyModel = frame.rideJourneyModel;
      continuity.dataset.sharedRouteBoard = String(frame.sharedRouteBoard === true);
      continuity.dataset.formulaSurfaceShared = String(frame.formulaSurfaceShared === true);
      continuity.dataset.switchingRequired = String(frame.switchingRequired === true);
      continuity.dataset.throughService = String(frame.throughService === true);
      continuity.dataset.directRide = String(frame.directRide === true);
      continuity.dataset.transferCount = String(frame.transferCount || 0);
      continuity.dataset.routeIds = frame.routeIds.join("|");
      continuity.dataset.routeCodes = frame.routeCodes.join("|");
      continuity.dataset.routePathLabel = frame.routePathLabel;
      continuity.dataset.routeActionLabel = frame.actionLabel;
      continuity.dataset.sourceStation = frame.sourceStation;
      continuity.dataset.destinationStation = frame.destinationStation;
      continuity.dataset.destinationLabel = frame.destinationLabel;
      continuity.dataset.segmentCount = String(frame.segmentCount || 0);
      continuity.dataset.resistanceScore = String(frame.resistanceScore || 0);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-continuity-label";
      label.textContent = "Continuidad";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-continuity-list";
      [{
        role: "frame",
        label: "Marco",
        main: frame.formulaSurfaceShared ? "Formula > salida" : "Marco abierto",
        meta: frame.passengerJourneyModel || frame.rideJourneyModel || ""
      }, {
        role: "switch",
        label: "Cambio",
        main: frame.switchingRequired ? "manual" : "sin cambio manual",
        meta: frame.directRide ? "mismo tren" : `${frame.transferCount || 0} trasbordo`
      }, {
        role: "route",
        label: frame.routeCodes.length ? `Linea ${frame.routeCodes.join("+")}` : "Ruta",
        main: frame.routePathLabel || frame.destinationLabel || "",
        meta: [frame.actionLabel || "", frame.throughService ? "servicio continuo" : "", frame.resistanceScore ? `R${frame.resistanceScore}` : ""].filter(Boolean).join(" · ")
      }].forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-continuity-item";
        item.dataset.continuityRole = entry.role;
        const itemLabel = targetObject.document.createElement("span");
        itemLabel.className = "andrews-route-board__map-continuity-item-label";
        itemLabel.textContent = entry.label;
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-continuity-main";
        main.textContent = entry.main || "";
        item.append(itemLabel, main);
        if (entry.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-continuity-meta";
          meta.textContent = entry.meta;
          item.appendChild(meta);
        }
        list.appendChild(item);
      });
      continuity.append(label, list);
      parent.appendChild(continuity);
      return continuity;
    }
    function appendAndrewsRouteBoardMapItinerary(parent, board = null, coordinateFrames = {}) {
      const frame = getAndrewsRouteBoardMapItineraryFrame(board, coordinateFrames);
      const itinerary = targetObject.document.createElement("div");
      itinerary.className = "andrews-route-board__map-itinerary";
      itinerary.dataset.mapItineraryModel = frame.itineraryModel;
      itinerary.dataset.boardState = frame.boardState;
      itinerary.dataset.routeIds = frame.routeIds.join("|");
      itinerary.dataset.routePathLabel = frame.routePathLabel;
      itinerary.dataset.sourceStation = frame.sourceStation;
      itinerary.dataset.destinationStation = frame.destinationStation;
      itinerary.dataset.routeActionLabel = frame.actionLabel;
      itinerary.dataset.routeStopCount = String(frame.stops.length);
      itinerary.dataset.routeStops = frame.stops.map(stop => stop.key || stop.label).filter(Boolean).join("|");
      itinerary.dataset.segmentCount = String(frame.segmentCount || 0);
      itinerary.dataset.transferCount = String(frame.transferCount || 0);
      itinerary.dataset.resistanceScore = String(frame.resistanceScore || 0);
      itinerary.dataset.hiddenCoordinateCount = String(frame.hiddenCoordinateCount || 0);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-itinerary-label";
      label.textContent = "Ruta";
      const rail = targetObject.document.createElement("span");
      rail.className = "andrews-route-board__map-itinerary-rail";
      if (!frame.stops.length) {
        const empty = targetObject.document.createElement("span");
        empty.className = "andrews-route-board__map-itinerary-empty";
        empty.textContent = "Sin ruta";
        rail.appendChild(empty);
      }
      frame.stops.forEach((stop, index) => {
        const stopKey = stop.key || "";
        const coordinate = frame.coordinates[index] || null;
        const stopRole = index === 0 ? "source" : index === frame.stops.length - 1 ? "destination" : "transfer";
        if (index > 0) {
          const connector = targetObject.document.createElement("span");
          connector.className = "andrews-route-board__map-itinerary-connector";
          connector.textContent = ">";
          rail.appendChild(connector);
        }
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-itinerary-stop";
        item.dataset.routeStopIndex = String(index + 1);
        item.dataset.routeStopRole = stopRole;
        item.dataset.stationKey = stopKey;
        item.dataset.stationCoordinate = coordinate?.coordinateLabel || "";
        if (coordinate?.coordinateLabel) {
          item.title = coordinate.coordinateLabel;
        }
        const dot = targetObject.document.createElement("span");
        dot.className = "andrews-route-board__map-itinerary-dot";
        const text = targetObject.document.createElement("span");
        text.className = "andrews-route-board__map-itinerary-stop-text";
        text.textContent = stop.label || stopKey;
        item.append(dot, text);
        rail.appendChild(item);
      });
      const meta = targetObject.document.createElement("span");
      meta.className = "andrews-route-board__map-itinerary-meta";
      meta.textContent = [frame.actionLabel || "", frame.segmentCount === 1 ? "1 tramo" : `${frame.segmentCount || 0} tramos`, frame.transferCount ? `${frame.transferCount} ${frame.transferCount === 1 ? "trasbordo" : "trasbordos"}` : "", frame.resistanceScore ? `R${frame.resistanceScore}` : ""].filter(Boolean).join(" · ");
      itinerary.append(label, rail, meta);
      parent.appendChild(itinerary);
      return itinerary;
    }
    function getAndrewsRouteBoardMapStationStatusLabel(status = "") {
      const labels = {
        current: "Aqui",
        destination: "Destino",
        route: "Ruta",
        available: "Salida",
        "source-layer": "Origen",
        terrain: "Mapa"
      };
      return labels[String(status || "").trim()] || String(status || "").trim();
    }
    function getAndrewsRouteBoardMapStationDirectoryEntries(board = null, context = {}, {
      activeStationKeys = [],
      availableStationKeys = [],
      sourceStationKey = "",
      destinationStationKey = "",
      sourceLayerStationKeys = []
    } = {}) {
      const statusRank = {
        current: 1,
        destination: 2,
        route: 3,
        available: 4,
        "source-layer": 5,
        terrain: 6
      };
      return Object.entries(ANDREWS_ROUTE_BOARD_MAP_STATIONS).map(([stationKey, station]) => {
        const stationStatus = getAndrewsRouteBoardMapStationStatus(stationKey, {
          activeStationKeys,
          availableStationKeys,
          sourceStationKey,
          destinationStationKey,
          sourceLayerStationKeys
        });
        const routeEntry = getAndrewsRouteBoardMapStationRouteEntry(stationKey, board, context?.baseBoard || null);
        const serviceRoutes = getAndrewsRouteBoardMapStationServiceRoutes(stationKey);
        return {
          stationKey,
          station,
          stationStatus,
          routeEntry,
          routeIds: getAndrewsRouteBoardMapRouteIdsFromEntry(routeEntry),
          serviceRoutes
        };
      }).sort((left, right) => {
        const leftRank = statusRank[left.stationStatus] || statusRank.terrain;
        const rightRank = statusRank[right.stationStatus] || statusRank.terrain;
        if (leftRank !== rightRank) {
          return leftRank - rightRank;
        }
        return String(left.station?.label || left.stationKey).localeCompare(String(right.station?.label || right.stationKey));
      });
    }
    function appendAndrewsRouteBoardMapStationDirectory(parent, board = null, context = {}, coordinateFrames = {}, statusContext = {}) {
      const entries = getAndrewsRouteBoardMapStationDirectoryEntries(board, context, statusContext);
      const directory = targetObject.document.createElement("div");
      directory.className = "andrews-route-board__map-station-directory";
      directory.dataset.mapStationDirectoryModel = "station-index-geography-coordinates";
      directory.dataset.stationCount = String(entries.length);
      directory.dataset.currentStation = board?.currentStation?.key || "";
      directory.dataset.destinationStation = board?.destinationStation?.key || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-station-directory-label";
      label.textContent = "Estaciones";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-station-directory-list";
      entries.forEach(entry => {
        const selectable = Boolean(entry.stationKey && entry.routeEntry && entry.stationKey !== board?.currentStation?.key);
        const stationItem = targetObject.document.createElement(selectable ? "button" : "span");
        stationItem.className = "andrews-route-board__map-station-directory-item";
        stationItem.dataset.stationKey = entry.stationKey;
        stationItem.dataset.stationStatus = entry.stationStatus;
        stationItem.dataset.stationRole = entry.station?.stationRole || "";
        stationItem.dataset.stationSelectable = String(selectable);
        stationItem.dataset.stationRouteIds = entry.routeIds.join("|");
        stationItem.dataset.stationCoordinate = coordinateFrames[entry.stationKey]?.coordinateLabel || "";
        applyAndrewsRouteBoardMapStationServiceDataset(stationItem, entry.serviceRoutes);
        if (selectable) {
          stationItem.type = "button";
          stationItem.addEventListener("click", () => {
            activateAndrewsRouteBoardMapStation(entry.stationKey, board, context);
          });
        }
        if (stationItem.dataset.stationCoordinate) {
          stationItem.title = stationItem.dataset.stationCoordinate;
        }
        const dot = targetObject.document.createElement("span");
        dot.className = "andrews-route-board__map-station-directory-dot";
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__map-station-directory-name";
        name.textContent = entry.station?.label || entry.stationKey;
        const service = targetObject.document.createElement("span");
        service.className = "andrews-route-board__map-station-directory-service";
        (entry.serviceRoutes || []).forEach(route => {
          const chip = targetObject.document.createElement("span");
          chip.className = "andrews-route-board__map-station-directory-service-chip";
          chip.dataset.routeId = route.routeId;
          chip.dataset.routeCode = route.code;
          chip.style.backgroundColor = route.color || "rgba(67, 83, 77, 0.68)";
          chip.textContent = route.code;
          service.appendChild(chip);
        });
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__map-station-directory-meta";
        meta.textContent = getAndrewsRouteBoardMapStationStatusLabel(entry.stationStatus);
        stationItem.append(dot, name, service, meta);
        list.appendChild(stationItem);
      });
      directory.append(label, list);
      parent.appendChild(directory);
      return directory;
    }
    function getAndrewsRouteBoardMapDepartureEntries(board = null) {
      const visibleRoutes = Array.isArray(board?.visibleRoutes) ? board.visibleRoutes : [];
      const destinationOptions = Array.isArray(board?.destinationOptions) ? board.destinationOptions : [];
      const departures = visibleRoutes.length ? visibleRoutes : destinationOptions;
      return departures.filter(entry => entry && typeof entry === "object").slice(0, 4);
    }
    function getAndrewsRouteBoardMapOptionEntries(board = null, context = {}, coordinateFrames = {}) {
      const baseBoard = context?.baseBoard && typeof context.baseBoard === "object" ? context.baseBoard : null;
      const recommendedRouteIds = Array.isArray(board?.recommendedRoute?.routeIds) ? board.recommendedRoute.routeIds : [];
      const recommendedRouteKey = recommendedRouteIds.join("|");
      const selectedDestinationKey = board?.destinationStation?.key || "";
      const groups = [{
        optionSource: "visible-routes",
        entries: board?.visibleRoutes
      }, {
        optionSource: "destination-options",
        entries: board?.destinationOptions
      }, {
        optionSource: "departures",
        entries: board?.departures
      }, {
        optionSource: "itineraries",
        entries: board?.itineraries
      }, {
        optionSource: "base-destination-options",
        entries: baseBoard?.destinationOptions
      }, {
        optionSource: "base-visible-routes",
        entries: baseBoard?.visibleRoutes
      }];
      const seen = new Set();
      const optionEntries = [];
      groups.forEach(group => {
        if (!Array.isArray(group.entries)) {
          return;
        }
        group.entries.forEach(entry => {
          if (!entry || typeof entry !== "object") {
            return;
          }
          const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(entry);
          const routeKey = routeIds.join("|");
          const destinationStationKey = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
          const optionKey = [destinationStationKey || entry.nextSourceStageKey || entry.targetKey || entry.label || "", routeKey].join("::");
          if (!destinationStationKey && !routeKey || seen.has(optionKey)) {
            return;
          }
          seen.add(optionKey);
          const routeId = routeIds[0] || "";
          const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId] || null;
          const destinationStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[destinationStationKey] || null;
          const coordinateFrame = coordinateFrames[destinationStationKey] || null;
          const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
          const resistanceScore = Number(entry.resistanceScore || entry.routeTicket?.resistanceScore || 0);
          const selected = Boolean(destinationStationKey && destinationStationKey === selectedDestinationKey);
          const recommended = Boolean(routeKey && routeKey === recommendedRouteKey);
          optionEntries.push({
            sourceEntry: entry,
            optionSource: group.optionSource,
            optionProvisionMode: "station-provides-options",
            optionState: selected ? "selected" : recommended ? "recommended" : "available",
            destinationStationKey,
            destinationStationLabel: destinationStation?.label || entry.label || entry.targetLabel || entry.nextSourceLabel || entry.routeActionFrame?.targetLabel || "",
            destinationCoordinate: coordinateFrame?.coordinateLabel || "",
            destinationFormulaType: coordinateFrame?.formulaType || "",
            routeIds,
            routeKey,
            routeId,
            routeCode: route?.code || "",
            routeColor: route?.color || "rgba(67, 83, 77, 0.68)",
            routePathLabel,
            routeActionLabel: getAndrewsRouteBoardMapDestinationActionLabel(entry, board, context),
            resistanceScore
          });
        });
      });
      return optionEntries.sort((left, right) => {
        const stateRank = {
          selected: 0,
          recommended: 1,
          available: 2
        };
        const leftRank = stateRank[left.optionState] ?? 3;
        const rightRank = stateRank[right.optionState] ?? 3;
        if (leftRank !== rightRank) {
          return leftRank - rightRank;
        }
        return (left.resistanceScore || 0) - (right.resistanceScore || 0);
      }).slice(0, 6);
    }
    function appendAndrewsRouteBoardMapOptions(parent, board = null, context = {}, coordinateFrames = {}) {
      const entries = getAndrewsRouteBoardMapOptionEntries(board, context, coordinateFrames);
      const options = targetObject.document.createElement("div");
      options.className = "andrews-route-board__map-options";
      options.dataset.mapOptionsModel = "single-passenger-unified-option-board";
      options.dataset.optionCount = String(entries.length);
      options.dataset.currentStation = board?.currentStation?.key || "";
      options.dataset.selectedDestination = board?.destinationStation?.key || "";
      options.dataset.passengerIntention = board?.passengerFrame?.currentIntention || board?.rideFrame?.currentIntention || board?.boardState || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-options-label";
      label.textContent = "Opciones";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-option-list";
      if (!entries.length) {
        const empty = targetObject.document.createElement("span");
        empty.className = "andrews-route-board__map-option-empty";
        empty.textContent = "Sin opciones";
        list.appendChild(empty);
      }
      entries.forEach(entry => {
        const item = targetObject.document.createElement("button");
        item.type = "button";
        item.className = "andrews-route-board__map-option";
        item.dataset.optionSource = entry.optionSource;
        item.dataset.optionProvisionMode = entry.optionProvisionMode;
        item.dataset.optionState = entry.optionState;
        item.dataset.destinationStation = entry.destinationStationKey;
        item.dataset.destinationStationLabel = entry.destinationStationLabel;
        item.dataset.destinationCoordinate = entry.destinationCoordinate;
        item.dataset.destinationFormulaType = entry.destinationFormulaType;
        item.dataset.routeIds = entry.routeIds.join("|");
        item.dataset.routeCode = entry.routeCode;
        item.dataset.routePathLabel = entry.routePathLabel;
        item.dataset.routeActionLabel = entry.routeActionLabel;
        item.dataset.routeResistanceScore = String(entry.resistanceScore || 0);
        const code = targetObject.document.createElement("span");
        code.className = "andrews-route-board__map-option-code";
        code.style.backgroundColor = entry.routeColor;
        code.textContent = entry.routeCode || "•";
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-option-main";
        main.textContent = entry.destinationStationLabel || entry.routePathLabel || entry.routeActionLabel || "Ruta abierta";
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__map-option-meta";
        meta.textContent = [entry.routeActionLabel, entry.destinationFormulaType, entry.resistanceScore ? `R${entry.resistanceScore}` : ""].filter(Boolean).join(" · ");
        item.title = [entry.routePathLabel, entry.destinationCoordinate].filter(Boolean).join(" · ");
        item.append(code, main, meta);
        item.addEventListener("click", () => {
          if (entry.sourceEntry) {
            activateAndrewsRouteBoardTarget(entry.sourceEntry, board);
            return;
          }
          if (entry.destinationStationKey) {
            activateAndrewsRouteBoardMapStation(entry.destinationStationKey, board, context);
          }
        });
        list.appendChild(item);
      });
      options.append(label, list);
      parent.appendChild(options);
      return options;
    }
    function appendAndrewsRouteBoardMapDepartures(parent, board = null) {
      const entries = getAndrewsRouteBoardMapDepartureEntries(board);
      const departures = targetObject.document.createElement("div");
      departures.className = "andrews-route-board__map-departures";
      departures.dataset.mapDeparturesModel = "station-provides-route-options";
      departures.dataset.departureCount = String(entries.length);
      departures.dataset.boardState = board?.boardState || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-departures-label";
      label.textContent = board?.boardState === "destination" ? "Trayectos" : "Salidas";
      departures.appendChild(label);
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-departure-list";
      if (!entries.length) {
        const empty = targetObject.document.createElement("span");
        empty.className = "andrews-route-board__map-departure-empty";
        empty.textContent = "Sin salidas";
        list.appendChild(empty);
      }
      entries.forEach(entry => {
        const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(entry);
        const routeId = routeIds[0] || "";
        const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId] || null;
        const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
        const actionLabel = entry.routeActionLabel || entry.routeActionFrame?.actionLabel || (board?.boardState === "destination" ? "Llegar" : "Siguiente");
        const item = targetObject.document.createElement("button");
        item.type = "button";
        item.className = "andrews-route-board__map-departure";
        item.dataset.routeIds = routeIds.join("|");
        item.dataset.routeCode = route?.code || "";
        item.dataset.routePathLabel = routePathLabel;
        item.dataset.routeActionLabel = actionLabel;
        item.dataset.routeDestination = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
        item.dataset.routeResistanceScore = String(entry.resistanceScore || entry.routeTicket?.resistanceScore || 0);
        const code = targetObject.document.createElement("span");
        code.className = "andrews-route-board__map-departure-code";
        code.style.backgroundColor = route?.color || "rgba(67, 83, 77, 0.68)";
        code.textContent = route?.code || "•";
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-departure-main";
        main.textContent = routePathLabel || entry.label || entry.targetLabel || "";
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__map-departure-meta";
        meta.textContent = [actionLabel, item.dataset.routeResistanceScore && item.dataset.routeResistanceScore !== "0" ? `R${item.dataset.routeResistanceScore}` : ""].filter(Boolean).join(" · ");
        item.append(code, main, meta);
        item.addEventListener("click", () => {
          activateAndrewsRouteBoardTarget(entry, board);
        });
        list.appendChild(item);
      });
      departures.appendChild(list);
      parent.appendChild(departures);
      return departures;
    }
    function getAndrewsRouteBoardMapDestinationActionLabel(entry = null, board = null, context = {}) {
      const stationKey = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
      const selectedDestinationKey = board?.destinationStation?.key || "";
      if (stationKey && selectedDestinationKey && stationKey === selectedDestinationKey) {
        return "Destino";
      }
      const actionFrame = entry?.destinationActionFrame && typeof entry.destinationActionFrame === "object" ? entry.destinationActionFrame : entry?.routeActionFrame && typeof entry.routeActionFrame === "object" ? entry.routeActionFrame : null;
      const recommendedKey = context?.baseBoard?.recommendedRoute?.nextSourceStageKey || board?.recommendedRoute?.nextSourceStageKey || "";
      if (stationKey && recommendedKey && stationKey === recommendedKey) {
        return actionFrame?.actionLabel || context?.baseBoard?.recommendedRoute?.actionLabel || board?.recommendedRoute?.actionLabel || "Siguiente";
      }
      return actionFrame?.actionLabel || entry?.routeActionLabel || "Explorar";
    }
    function getAndrewsRouteBoardMapDestinationEntries(board = null, context = {}) {
      const baseBoard = context?.baseBoard && typeof context.baseBoard === "object" ? context.baseBoard : null;
      const candidates = [];
      [baseBoard?.destinationOptions, board?.destinationOptions, board?.visibleRoutes].forEach(group => {
        if (Array.isArray(group)) {
          candidates.push(...group);
        }
      });
      const seen = new Set();
      return candidates.filter(entry => entry && typeof entry === "object").filter(entry => {
        const stationKey = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
        if (!stationKey || seen.has(stationKey)) {
          return false;
        }
        seen.add(stationKey);
        return true;
      }).slice(0, 5);
    }
    function appendAndrewsRouteBoardMapDestinations(parent, board = null, context = {}, coordinateFrames = {}) {
      const entries = getAndrewsRouteBoardMapDestinationEntries(board, context);
      const destinations = targetObject.document.createElement("div");
      destinations.className = "andrews-route-board__map-destinations";
      destinations.dataset.mapDestinationsModel = "passenger-chooses-destination-station";
      destinations.dataset.destinationCount = String(entries.length);
      destinations.dataset.currentStation = board?.currentStation?.key || "";
      destinations.dataset.selectedDestination = board?.destinationStation?.key || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-destinations-label";
      label.textContent = "Destinos";
      destinations.appendChild(label);
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-destination-list";
      if (!entries.length) {
        const empty = targetObject.document.createElement("span");
        empty.className = "andrews-route-board__map-destination-empty";
        empty.textContent = "Sin destinos";
        list.appendChild(empty);
      }
      entries.forEach(entry => {
        const stationKey = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
        const station = ANDREWS_ROUTE_BOARD_MAP_STATIONS[stationKey] || null;
        const coordinateFrame = coordinateFrames[stationKey] || null;
        const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(entry);
        const routeId = routeIds[0] || "";
        const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId] || null;
        const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
        const actionLabel = getAndrewsRouteBoardMapDestinationActionLabel(entry, board, context);
        const selected = Boolean(stationKey && stationKey === board?.destinationStation?.key);
        const item = targetObject.document.createElement("button");
        item.type = "button";
        item.className = "andrews-route-board__map-destination";
        item.dataset.destinationStation = stationKey;
        item.dataset.destinationStationLabel = station?.label || entry.label || entry.targetLabel || entry.nextSourceLabel || "";
        item.dataset.destinationSelected = String(selected);
        item.dataset.destinationCoordinate = coordinateFrame?.coordinateLabel || "";
        item.dataset.routeIds = routeIds.join("|");
        item.dataset.routeCode = route?.code || "";
        item.dataset.routePathLabel = routePathLabel;
        item.dataset.routeActionLabel = actionLabel;
        item.dataset.routeResistanceScore = String(entry.resistanceScore || entry.routeTicket?.resistanceScore || 0);
        const code = targetObject.document.createElement("span");
        code.className = "andrews-route-board__map-destination-code";
        code.style.backgroundColor = route?.color || "rgba(67, 83, 77, 0.68)";
        code.textContent = route?.code || "•";
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-destination-main";
        main.textContent = item.dataset.destinationStationLabel || stationKey;
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__map-destination-meta";
        meta.textContent = [actionLabel, item.dataset.routeResistanceScore && item.dataset.routeResistanceScore !== "0" ? `R${item.dataset.routeResistanceScore}` : ""].filter(Boolean).join(" · ");
        item.title = [routePathLabel, coordinateFrame?.coordinateLabel || ""].filter(Boolean).join(" · ");
        item.append(code, main, meta);
        item.addEventListener("click", () => {
          activateAndrewsRouteBoardMapStation(stationKey, board, context);
        });
        list.appendChild(item);
      });
      destinations.appendChild(list);
      parent.appendChild(destinations);
      return destinations;
    }
    function getAndrewsRouteBoardMapRouteEntries(board = null, context = {}) {
      const baseBoard = context?.baseBoard && typeof context.baseBoard === "object" ? context.baseBoard : null;
      const entries = [];
      [board?.routeTerrain, board?.visibleRoutes, board?.destinationOptions, board?.departures, board?.itineraries, baseBoard?.routeTerrain, baseBoard?.destinationOptions, baseBoard?.departures].forEach(group => {
        if (Array.isArray(group)) {
          entries.push(...group);
        }
      });
      return entries.filter(entry => entry && typeof entry === "object");
    }
    function getAndrewsRouteBoardMapEntryRouteKey(entry = null) {
      return getAndrewsRouteBoardMapRouteIdsFromEntry(entry).join("|");
    }
    function getAndrewsRouteBoardMapEntryResistanceMetric(entry = null) {
      const routeTicket = entry?.routeTicket || null;
      const route = Array.isArray(entry?.routes) ? entry.routes[0] : null;
      return {
        resistanceScore: Number(entry?.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || 0),
        obstacleCount: Number(entry?.obstacleCount || route?.obstacleCount || routeTicket?.obstacleCount || 0),
        hiddenCoordinateCount: Number(entry?.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0),
        resistanceRank: Number(entry?.resistanceRank || route?.resistanceRank || routeTicket?.resistanceRank || 0),
        standardScoreLabel: entry?.standardScoreLabel || route?.standardScoreLabel || routeTicket?.standardScoreLabel || "",
        gateDomainCounts: getAndrewsRouteBoardGateDomainCounts(entry, route, routeTicket)
      };
    }
    function getAndrewsRouteBoardMapRouteMetrics(board = null, context = {}) {
      const metrics = {};
      const entries = getAndrewsRouteBoardMapRouteEntries(board, context);
      const hypothesisDomains = getAndrewsRouteBoardHypothesisDomains(board?.resistanceHypothesisFrame || null);
      const leastVisibleRouteIds = Array.isArray(board?.leastVisibleRoute?.routeIds) ? board.leastVisibleRoute.routeIds : [];
      const mostVisibleRouteIds = Array.isArray(board?.mostVisibleRoute?.routeIds) ? board.mostVisibleRoute.routeIds : [];
      const leastResistanceRouteId = board?.leastResistanceRoute?.routeId || "";
      const mostResistanceRouteId = board?.mostResistanceRoute?.routeId || "";
      Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(routeId => {
        const routeEntry = entries.filter(entry => andrewsRouteBoardMapEntryIncludesRouteId(entry, routeId)).sort((left, right) => {
          const leftExact = getAndrewsRouteBoardMapRouteIdsFromEntry(left).length === 1 ? 0 : 1;
          const rightExact = getAndrewsRouteBoardMapRouteIdsFromEntry(right).length === 1 ? 0 : 1;
          if (leftExact !== rightExact) {
            return leftExact - rightExact;
          }
          return Number(left.resistanceScore || left.routeTicket?.resistanceScore || 0) - Number(right.resistanceScore || right.routeTicket?.resistanceScore || 0);
        })[0] || null;
        const metric = getAndrewsRouteBoardMapEntryResistanceMetric(routeEntry);
        const gateDomainSet = new Set(metric.gateDomainCounts.map(item => item.value));
        const hypothesisHitCount = hypothesisDomains.filter(domain => gateDomainSet.has(domain)).length;
        const visibleResistanceRole = leastVisibleRouteIds.includes(routeId) ? "least" : mostVisibleRouteIds.includes(routeId) ? "most" : "";
        const globalResistanceRole = routeId && routeId === leastResistanceRouteId ? "least" : routeId && routeId === mostResistanceRouteId ? "most" : "";
        metrics[routeId] = {
          routeId,
          routeKey: getAndrewsRouteBoardMapEntryRouteKey(routeEntry) || routeId,
          metricSource: routeEntry?.kind || routeEntry?.routeKind || (routeEntry ? "route-entry" : "map-route"),
          resistanceScore: metric.resistanceScore,
          obstacleCount: metric.obstacleCount,
          hiddenCoordinateCount: metric.hiddenCoordinateCount,
          resistanceRank: metric.resistanceRank,
          standardScoreLabel: metric.standardScoreLabel,
          resistanceRole: globalResistanceRole,
          visibleResistanceRole,
          globalResistanceRole,
          hypothesisDomains: hypothesisDomains.join("+"),
          hypothesisHitCount,
          hypothesisHit: Boolean(hypothesisDomains.length && hypothesisHitCount === hypothesisDomains.length)
        };
      });
      return metrics;
    }
    function applyAndrewsRouteBoardMapRouteMetricDataset(element, metric = {}) {
      if (!element || !metric) {
        return element;
      }
      element.dataset.routeResistanceScore = String(metric.resistanceScore || 0);
      element.dataset.routeObstacleCount = String(metric.obstacleCount || 0);
      element.dataset.routeHiddenCoordinateCount = String(metric.hiddenCoordinateCount || 0);
      element.dataset.routeResistanceRank = String(metric.resistanceRank || 0);
      element.dataset.routeStandardScore = metric.standardScoreLabel || "";
      element.dataset.routeResistanceRole = metric.resistanceRole || "";
      element.dataset.routeVisibleResistanceRole = metric.visibleResistanceRole || "";
      element.dataset.routeGlobalResistanceRole = metric.globalResistanceRole || "";
      element.dataset.routeHypothesisDomains = metric.hypothesisDomains || "";
      element.dataset.routeHypothesisHitCount = String(metric.hypothesisHitCount || 0);
      element.dataset.routeHypothesisHit = String(metric.hypothesisHit === true);
      element.dataset.routeMetricSource = metric.metricSource || "";
      return element;
    }
    function appendAndrewsRouteBoardMapTerrainScale(parent, board = null, routeMetrics = {}) {
      const terrain = targetObject.document.createElement("div");
      terrain.className = "andrews-route-board__map-terrain";
      terrain.dataset.mapTerrainModel = "resistance-topography";
      terrain.dataset.hiddenCoordinateCount = String(board?.hiddenCoordinateCount || 0);
      terrain.dataset.leastResistanceRoute = board?.leastResistanceRoute?.routeId || "";
      terrain.dataset.mostResistanceRoute = board?.mostResistanceRoute?.routeId || "";
      const hypothesis = getAndrewsRouteBoardPrimaryHypothesis(board?.resistanceHypothesisFrame || null);
      terrain.dataset.resistanceHypothesisDomains = Array.isArray(hypothesis?.domains) ? hypothesis.domains.join("+") : "";
      terrain.dataset.resistanceHypothesisPValue = hypothesis?.pValue === null || hypothesis?.pValue === undefined ? "" : String(hypothesis.pValue);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-terrain-label";
      label.textContent = "Terreno";
      const chips = [`${board?.hiddenCoordinateCount || 0} coordenadas`, board?.leastResistanceRoute?.resistanceScore ? `Menor R${board.leastResistanceRoute.resistanceScore}` : "", board?.mostResistanceRoute?.resistanceScore ? `Mayor R${board.mostResistanceRoute.resistanceScore}` : "", terrain.dataset.resistanceHypothesisDomains ? getAndrewsRouteBoardHypothesisDomainLabel(hypothesis.domains) : "", terrain.dataset.resistanceHypothesisPValue ? `p ${formatAndrewsRouteBoardProbability(hypothesis.pValue)}` : ""].filter(Boolean);
      const chipWrap = targetObject.document.createElement("span");
      chipWrap.className = "andrews-route-board__map-terrain-chips";
      chips.forEach(text => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__map-terrain-chip";
        chip.textContent = text;
        chipWrap.appendChild(chip);
      });
      terrain.append(label, chipWrap);
      if (Object.keys(routeMetrics || {}).length) {
        terrain.dataset.routeMetricCount = String(Object.keys(routeMetrics).length);
      }
      parent.appendChild(terrain);
      return terrain;
    }
    function appendAndrewsRouteBoardMapServiceSummary(parent, board = null) {
      const rideFrame = board?.rideFrame && typeof board.rideFrame === "object" ? board.rideFrame : null;
      const passengerFrame = board?.passengerFrame && typeof board.passengerFrame === "object" ? board.passengerFrame : null;
      const decisionLoad = rideFrame?.decisionLoad && typeof rideFrame.decisionLoad === "object" ? rideFrame.decisionLoad : {};
      const primaryClickCount = Number(decisionLoad.primaryClickCount || (board?.recommendedRoute ? 1 : 0));
      const averageClicks = Number(board?.averageRouteStageClicks || passengerFrame?.averageRouteStageClicks || 0);
      const maxClicks = Number(board?.maxRouteStageClicks || passengerFrame?.maxRouteStageClicks || 0);
      const service = targetObject.document.createElement("div");
      service.className = "andrews-route-board__map-service";
      service.dataset.mapServiceModel = "station-handles-routing-passenger-rides";
      service.dataset.passengerCurrentIntention = passengerFrame?.currentIntention || rideFrame?.currentIntention || "";
      service.dataset.primaryActionLabel = passengerFrame?.primaryActionLabel || rideFrame?.primaryActionLabel || "";
      service.dataset.primaryRoutePathLabel = passengerFrame?.primaryRoutePathLabel || rideFrame?.primaryRoutePathLabel || "";
      service.dataset.primaryClickCount = String(primaryClickCount || 0);
      service.dataset.averageRouteStageClicks = String(averageClicks || 0);
      service.dataset.maxRouteStageClicks = String(maxClicks || 0);
      service.dataset.switchingRequired = String(decisionLoad.switchingRequired === true);
      service.dataset.visibleTrackCount = String(rideFrame?.visibleTrackCount || passengerFrame?.visibleRouteCount || 0);
      service.dataset.destinationOptionCount = String(rideFrame?.destinationOptionCount || passengerFrame?.destinationOptionCount || 0);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-service-label";
      label.textContent = "Servicio";
      const chips = [primaryClickCount ? `${primaryClickCount} click` : "", averageClicks ? `media ${averageClicks}` : "", maxClicks ? `max ${maxClicks}` : "", decisionLoad.switchingRequired === true ? "cambio manual" : "sin cambio manual", service.dataset.visibleTrackCount !== "0" ? `${service.dataset.visibleTrackCount} andenes` : "", service.dataset.destinationOptionCount !== "0" ? `${service.dataset.destinationOptionCount} destinos` : ""].filter(Boolean);
      const chipWrap = targetObject.document.createElement("span");
      chipWrap.className = "andrews-route-board__map-service-chips";
      chips.forEach(text => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__map-service-chip";
        chip.textContent = text;
        chipWrap.appendChild(chip);
      });
      service.append(label, chipWrap);
      parent.appendChild(service);
      return service;
    }
    function getAndrewsRouteBoardMapServiceAdvisoryFrame(board = null) {
      const hypothesisFrame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object" ? board.resistanceHypothesisFrame : null;
      const hypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
      const hypothesisDomains = getAndrewsRouteBoardHypothesisDomains(hypothesisFrame);
      const conversionPlan = board?.resistanceConversionPlan && typeof board.resistanceConversionPlan === "object" ? board.resistanceConversionPlan : null;
      const currentStation = board?.currentStation && typeof board.currentStation === "object" ? board.currentStation : null;
      const unresolvedDimensions = Array.isArray(currentStation?.inputTicketFrame?.unresolvedDimensions) ? currentStation.inputTicketFrame.unresolvedDimensions.map(entry => String(entry || "").trim()).filter(Boolean) : Array.isArray(currentStation?.unresolvedDimensions) ? currentStation.unresolvedDimensions.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const visibleRoutes = Array.isArray(board?.visibleRoutes) ? board.visibleRoutes : [];
      const blockedRoutes = visibleRoutes.filter(entry => {
        const gateStatus = String(entry?.routeActionFrame?.functionUseValenceGate?.status || entry?.functionUseValenceGate?.status || "").trim();
        return entry?.blocked === true || gateStatus === "blocked" || entry?.routeActionFrame?.generationAllowed === false || entry?.routeTicket?.generationAllowed === false;
      });
      const mostRoute = board?.mostVisibleRoute || board?.mostResistanceRoute || null;
      const leastRoute = board?.leastVisibleRoute || board?.leastResistanceRoute || null;
      const pValue = hypothesis?.pValue === null || hypothesis?.pValue === undefined ? null : Number(hypothesis.pValue);
      const obstacleCount = Number(mostRoute?.obstacleCount || mostRoute?.hiddenCoordinateCount || 0);
      const scoreReductionNeeded = Number(conversionPlan?.scoreReductionNeeded || 0);
      const obstacleReductionNeeded = Number(conversionPlan?.obstacleReductionNeeded || 0);
      const recommendedAction = getAndrewsRouteBoardHypothesisActionLabel(hypothesis, hypothesisFrame) || conversionPlan?.highResistanceDimensions?.[0]?.action || conversionPlan?.blockActions?.[0]?.action || "";
      const advisoryLevel = blockedRoutes.length ? "blocked" : unresolvedDimensions.length ? "uncertain" : hypothesisDomains.length || obstacleCount ? "obstacle" : "clear";
      return {
        kind: "andrews-route-board-map-service-advisory-frame",
        version: 1,
        advisoryModel: "obstacle-blocked-condition-uncertainty-advisory",
        advisoryLevel,
        currentStationKey: currentStation?.key || "",
        currentStationLabel: currentStation?.label || "",
        unresolvedDimensions,
        unresolvedDimensionCount: unresolvedDimensions.length,
        blockedRouteCount: blockedRoutes.length,
        blockedRouteIds: blockedRoutes.map(entry => entry.routeId || entry.id || "").filter(Boolean),
        obstacleCount,
        highestResistanceRouteId: mostRoute?.routeId || "",
        lowestResistanceRouteId: leastRoute?.routeId || "",
        scoreReductionNeeded,
        obstacleReductionNeeded,
        hypothesisDomains,
        hypothesisDomainLabel: getAndrewsRouteBoardHypothesisDomainLabel(hypothesisDomains),
        hypothesisTestId: hypothesis?.hypothesisTestId || hypothesisFrame?.primaryTest?.hypothesisTestId || "",
        pValue: Number.isFinite(pValue) ? pValue : null,
        qValue: hypothesis?.qValue === null || hypothesis?.qValue === undefined ? null : Number(hypothesis.qValue),
        lowPValue: hypothesis?.lowPValue === true || hypothesis?.rejectsNullHypothesis === true,
        uncertaintyCount: unresolvedDimensions.length + (Number.isFinite(pValue) ? 1 : 0) + (hypothesisFrame?.relationshipWarning ? 1 : 0),
        recommendedAction
      };
    }
    function appendAndrewsRouteBoardMapServiceAdvisory(parent, board = null) {
      const frame = getAndrewsRouteBoardMapServiceAdvisoryFrame(board);
      const advisory = targetObject.document.createElement("div");
      advisory.className = "andrews-route-board__map-advisory";
      advisory.dataset.mapServiceAdvisoryModel = frame.advisoryModel;
      advisory.dataset.serviceAdvisoryLevel = frame.advisoryLevel;
      advisory.dataset.currentStation = frame.currentStationKey;
      advisory.dataset.unresolvedDimensionCount = String(frame.unresolvedDimensionCount || 0);
      advisory.dataset.blockedRouteCount = String(frame.blockedRouteCount || 0);
      advisory.dataset.blockedRouteIds = frame.blockedRouteIds.join("|");
      advisory.dataset.obstacleCount = String(frame.obstacleCount || 0);
      advisory.dataset.highestResistanceRoute = frame.highestResistanceRouteId;
      advisory.dataset.lowestResistanceRoute = frame.lowestResistanceRouteId;
      advisory.dataset.scoreReductionNeeded = String(frame.scoreReductionNeeded || 0);
      advisory.dataset.obstacleReductionNeeded = String(frame.obstacleReductionNeeded || 0);
      advisory.dataset.hypothesisDomains = frame.hypothesisDomains.join("+");
      advisory.dataset.hypothesisTestId = frame.hypothesisTestId;
      advisory.dataset.hypothesisPValue = frame.pValue === null ? "" : String(frame.pValue);
      advisory.dataset.hypothesisQValue = frame.qValue === null ? "" : String(frame.qValue);
      advisory.dataset.lowPValue = String(frame.lowPValue === true);
      advisory.dataset.uncertaintyCount = String(frame.uncertaintyCount || 0);
      advisory.dataset.recommendedAction = frame.recommendedAction;
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-advisory-label";
      label.textContent = "Avisos";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-advisory-list";
      const entries = [{
        role: "obstacle",
        label: "Obstaculo",
        main: frame.hypothesisDomainLabel || (frame.obstacleCount ? "Mayor resistencia" : "sin obstaculo activo"),
        meta: [frame.obstacleCount ? `${frame.obstacleCount} coords` : "", frame.scoreReductionNeeded ? `-${frame.scoreReductionNeeded} R` : "", frame.obstacleReductionNeeded ? `-${frame.obstacleReductionNeeded} coords` : ""].filter(Boolean).join(" · ")
      }, {
        role: "blocked-condition",
        label: "Bloqueo",
        main: frame.blockedRouteCount ? `${frame.blockedRouteCount} ruta bloqueada` : frame.unresolvedDimensionCount ? `${frame.unresolvedDimensionCount} capa abierta` : "sin bloqueo activo",
        meta: frame.unresolvedDimensions.map(entry => getAndrewsRouteBoardGateDomainLabel(entry)).filter(Boolean).join(" + ")
      }, {
        role: "uncertainty",
        label: "Incertidumbre",
        main: frame.pValue === null ? frame.uncertaintyCount ? `${frame.uncertaintyCount} senal` : "baja" : `p ${formatAndrewsRouteBoardProbability(frame.pValue)}`,
        meta: frame.lowPValue ? "H0 rechazada" : frame.hypothesisTestId || "sin prueba activa"
      }, {
        role: "action",
        label: "Accion",
        main: frame.recommendedAction || "mantener ruta visible",
        meta: frame.currentStationLabel || ""
      }];
      entries.forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-advisory-item";
        item.dataset.serviceAdvisoryRole = entry.role;
        const role = targetObject.document.createElement("span");
        role.className = "andrews-route-board__map-advisory-role";
        role.textContent = entry.label;
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-advisory-main";
        main.textContent = entry.main || "";
        item.append(role, main);
        if (entry.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-advisory-meta";
          meta.textContent = entry.meta;
          item.appendChild(meta);
        }
        list.appendChild(item);
      });
      advisory.append(label, list);
      parent.appendChild(advisory);
      return advisory;
    }
    function getAndrewsRouteBoardMapApprovalFrame(board = null) {
      const routeCount = Number(board?.routeCount || 0);
      const expectedRouteCount = Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).length;
      const coordinateCount = Number(board?.hiddenCoordinateCount || 0);
      const hypothesisFrame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object" ? board.resistanceHypothesisFrame : null;
      const primaryHypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
      const pValue = primaryHypothesis?.pValue === null || primaryHypothesis?.pValue === undefined ? null : Number(primaryHypothesis.pValue);
      const alpha = Number(primaryHypothesis?.alpha || hypothesisFrame?.alpha || board?.resistanceAlpha || 0);
      const routeCoverageState = routeCount === expectedRouteCount ? "matched" : routeCount > 0 ? "partial" : "missing";
      const coordinateCoverageState = coordinateCount >= ANDREWS_ROUTE_BOARD_MAP_APPROVAL_COORDINATE_FLOOR ? "andrews-floor-met" : coordinateCount > 0 ? "partial" : "missing";
      const hypothesisState = primaryHypothesis?.rejectsNullHypothesis === true || primaryHypothesis?.lowPValue === true ? "reject-null-hypothesis" : primaryHypothesis ? "retain-null-hypothesis" : "missing";
      const engineAuditState = routeCoverageState === "matched" && coordinateCoverageState === "andrews-floor-met" && hypothesisState !== "missing" ? "ready" : "incomplete";
      return {
        kind: "andrews-route-board-map-approval-frame",
        version: 1,
        approvalModel: "andrews-approval-audit-gate",
        authorityModel: "andrews-pdf-supreme-nawat-pipil-orthography-bridge-only",
        engineAuditState,
        approvalState: engineAuditState === "ready" ? "andrews-approved" : "missing-engine-audit",
        visualProofState: engineAuditState === "ready" ? "runtime-visual-proof-covered" : "runtime-visual-proof-required",
        routeCoverageState,
        coordinateCoverageState,
        hypothesisState,
        routeCount,
        expectedRouteCount,
        coordinateCount,
        coordinateFloor: ANDREWS_ROUTE_BOARD_MAP_APPROVAL_COORDINATE_FLOOR,
        layerCount: ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.length,
        gisDimensionCount: ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.length,
        leastResistanceRouteId: board?.leastResistanceRoute?.routeId || "",
        mostResistanceRouteId: board?.mostResistanceRoute?.routeId || "",
        hypothesisTestId: primaryHypothesis?.hypothesisTestId || hypothesisFrame?.primaryTest?.hypothesisTestId || "",
        pValue: Number.isFinite(pValue) ? pValue : null,
        alpha: Number.isFinite(alpha) ? alpha : 0,
        lowPValue: primaryHypothesis?.lowPValue === true || primaryHypothesis?.rejectsNullHypothesis === true
      };
    }
    function appendAndrewsRouteBoardMapApprovalGate(parent, board = null, frame = null) {
      const resolvedFrame = frame || getAndrewsRouteBoardMapApprovalFrame(board);
      const approval = targetObject.document.createElement("div");
      approval.className = "andrews-route-board__map-approval";
      approval.dataset.mapApprovalGateModel = resolvedFrame.approvalModel;
      approval.dataset.mapApprovalState = resolvedFrame.approvalState;
      approval.dataset.authorityModel = resolvedFrame.authorityModel;
      approval.dataset.engineAuditState = resolvedFrame.engineAuditState;
      approval.dataset.visualProofState = resolvedFrame.visualProofState;
      approval.dataset.routeCoverageState = resolvedFrame.routeCoverageState;
      approval.dataset.coordinateCoverageState = resolvedFrame.coordinateCoverageState;
      approval.dataset.hypothesisState = resolvedFrame.hypothesisState;
      approval.dataset.routeCount = String(resolvedFrame.routeCount || 0);
      approval.dataset.expectedRouteCount = String(resolvedFrame.expectedRouteCount || 0);
      approval.dataset.hiddenCoordinateCount = String(resolvedFrame.coordinateCount || 0);
      approval.dataset.coordinateFloor = String(resolvedFrame.coordinateFloor || 0);
      approval.dataset.layerCount = String(resolvedFrame.layerCount || 0);
      approval.dataset.gisDimensionCount = String(resolvedFrame.gisDimensionCount || 0);
      approval.dataset.leastResistanceRoute = resolvedFrame.leastResistanceRouteId;
      approval.dataset.mostResistanceRoute = resolvedFrame.mostResistanceRouteId;
      approval.dataset.hypothesisTestId = resolvedFrame.hypothesisTestId;
      approval.dataset.hypothesisPValue = resolvedFrame.pValue === null ? "" : String(resolvedFrame.pValue);
      approval.dataset.hypothesisAlpha = String(resolvedFrame.alpha || 0);
      approval.dataset.lowPValue = String(resolvedFrame.lowPValue === true);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-approval-label";
      label.textContent = "Revision Andrews";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-approval-list";
      const entries = [{
        role: "authority",
        label: "Autoridad",
        main: "PDF > salida",
        meta: "Nawat: solo ortografia"
      }, {
        role: "coverage",
        label: "Cobertura",
        main: `${resolvedFrame.routeCount}/${resolvedFrame.expectedRouteCount} rutas`,
        meta: `${resolvedFrame.coordinateCount} coords`
      }, {
        role: "hypothesis",
        label: "Prueba",
        main: resolvedFrame.lowPValue ? "H0 rechazada" : "H0 retenida",
        meta: resolvedFrame.pValue === null ? resolvedFrame.hypothesisTestId : `p ${formatAndrewsRouteBoardProbability(resolvedFrame.pValue)}`
      }, {
        role: "proof",
        label: "Salida",
        main: resolvedFrame.engineAuditState === "ready" ? "aprobada" : "auditoria incompleta",
        meta: resolvedFrame.engineAuditState === "ready" ? "mapa visible" : "prueba visual requerida"
      }];
      entries.forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-approval-item";
        item.dataset.approvalRole = entry.role;
        const role = targetObject.document.createElement("span");
        role.className = "andrews-route-board__map-approval-role";
        role.textContent = entry.label;
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-approval-main";
        main.textContent = entry.main || "";
        item.append(role, main);
        if (entry.meta) {
          const meta = targetObject.document.createElement("span");
          meta.className = "andrews-route-board__map-approval-meta";
          meta.textContent = entry.meta;
          item.appendChild(meta);
        }
        list.appendChild(item);
      });
      approval.append(label, list);
      parent.appendChild(approval);
      return approval;
    }
    function activateAndrewsRouteBoardMapRoute(routeId = "", board = null, {
      baseBoard = null,
      sourceStage = null,
      rawInput = ""
    } = {}) {
      const normalizedRouteId = String(routeId || "").trim();
      if (!normalizedRouteId || !board) {
        return false;
      }
      const visibleEntry = findAndrewsRouteBoardMapEntryForRouteId(board.visibleRoutes || [], normalizedRouteId) || findAndrewsRouteBoardMapEntryForRouteId(board.departures || [], normalizedRouteId) || findAndrewsRouteBoardMapEntryForRouteId(board.itineraries || [], normalizedRouteId);
      if (visibleEntry) {
        activateAndrewsRouteBoardTarget(visibleEntry, board);
        return true;
      }
      const destinationOption = findAndrewsRouteBoardMapEntryForRouteId(board.destinationOptions || [], normalizedRouteId) || findAndrewsRouteBoardMapEntryForRouteId(baseBoard?.destinationOptions || [], normalizedRouteId);
      if (!destinationOption) {
        return false;
      }
      AndrewsRouteBoardDestinationKey = destinationOption.key || destinationOption.nextSourceStageKey || "";
      AndrewsRouteBoardPinnedSourceInput = String(rawInput || "").trim();
      AndrewsRouteBoardPinnedSourceStage = sourceStage || board.currentStation || null;
      if (typeof targetObject.buildAndrewsCnvCnnRouteBoard === "function") {
        const selectedBoard = targetObject.buildAndrewsCnvCnnRouteBoard({
          sourceStage: sourceStage || board.currentStation || null,
          destinationStage: destinationOption.stage || null
        });
        const selectedRoute = Array.isArray(selectedBoard.visibleRoutes) ? selectedBoard.visibleRoutes[0] : null;
        if (selectedRoute) {
          activateAndrewsRouteBoardTarget(selectedRoute, selectedBoard);
          return true;
        }
      }
      renderAndrewsRouteBoard();
      return true;
    }
    function activateAndrewsRouteBoardMapStation(stationKey = "", board = null, {
      baseBoard = null,
      sourceStage = null,
      rawInput = ""
    } = {}) {
      const normalizedStationKey = String(stationKey || "").trim();
      if (!normalizedStationKey || !board || normalizedStationKey === board.currentStation?.key) {
        return false;
      }
      const visibleEntry = findAndrewsRouteBoardMapEntryForStationKey(board.visibleRoutes || [], normalizedStationKey) || findAndrewsRouteBoardMapEntryForStationKey(board.departures || [], normalizedStationKey) || findAndrewsRouteBoardMapEntryForStationKey(board.itineraries || [], normalizedStationKey);
      if (visibleEntry) {
        activateAndrewsRouteBoardTarget(visibleEntry, board);
        return true;
      }
      const destinationOption = findAndrewsRouteBoardMapEntryForStationKey(board.destinationOptions || [], normalizedStationKey) || findAndrewsRouteBoardMapEntryForStationKey(baseBoard?.destinationOptions || [], normalizedStationKey);
      if (!destinationOption) {
        return false;
      }
      const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(destinationOption);
      if (routeIds.length) {
        return activateAndrewsRouteBoardMapRoute(routeIds[0], board, {
          baseBoard,
          sourceStage,
          rawInput
        });
      }
      AndrewsRouteBoardDestinationKey = destinationOption.key || normalizedStationKey;
      AndrewsRouteBoardPinnedSourceInput = String(rawInput || "").trim();
      AndrewsRouteBoardPinnedSourceStage = sourceStage || board.currentStation || null;
      renderAndrewsRouteBoard();
      return true;
    }
    function attachAndrewsRouteBoardMapRouteControl(element, routeId = "", route = null, routeState = "", board = null, context = {}) {
      const normalizedRouteId = String(routeId || "").trim();
      const selectable = Boolean(normalizedRouteId && routeState !== "terrain");
      element.dataset.routeMapSelectable = String(selectable);
      if (!selectable) {
        return element;
      }
      const isNativeButton = String(element.tagName || "").toUpperCase() === "BUTTON";
      if (!isNativeButton) {
        element.setAttribute("role", "button");
        element.setAttribute("tabindex", "0");
      }
      element.setAttribute("aria-label", `Tomar ruta ${route?.code || ""}: ${route?.label || normalizedRouteId}`);
      const activate = () => {
        activateAndrewsRouteBoardMapRoute(normalizedRouteId, board, context);
      };
      element.addEventListener("click", activate);
      if (!isNativeButton) {
        element.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate();
          }
        });
      }
      return element;
    }
    function attachAndrewsRouteBoardMapStationControl(element, stationKey = "", station = null, board = null, context = {}) {
      const normalizedStationKey = String(stationKey || "").trim();
      const destinationEntry = getAndrewsRouteBoardMapStationRouteEntry(normalizedStationKey, board, context?.baseBoard || null);
      const selectable = Boolean(normalizedStationKey && destinationEntry && normalizedStationKey !== board?.currentStation?.key);
      element.dataset.stationSelectable = String(selectable);
      element.dataset.stationDestinationRouteIds = selectable ? getAndrewsRouteBoardMapRouteIdsFromEntry(destinationEntry).join("|") : "";
      if (!selectable) {
        return element;
      }
      element.setAttribute("role", "button");
      element.setAttribute("tabindex", "0");
      element.setAttribute("aria-label", `Ir a ${station?.label || normalizedStationKey}`);
      const activate = () => {
        activateAndrewsRouteBoardMapStation(normalizedStationKey, board, context);
      };
      element.addEventListener("click", activate);
      element.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
      return element;
    }
    function appendAndrewsRouteBoardMapRegion(svg, {
      id = "",
      label = "",
      x = 0,
      y = 0,
      width = 100,
      height = 80
    } = {}) {
      const region = createAndrewsRouteBoardSvgElement("rect", {
        class: "andrews-route-board__map-region",
        x,
        y,
        width,
        height,
        rx: 12,
        ry: 12
      });
      region.dataset.mapRegion = id;
      svg.appendChild(region);
      const text = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-region-label",
        x: x + 14,
        y: y + 22
      });
      text.textContent = label;
      svg.appendChild(text);
    }
    function appendAndrewsRouteBoardMapLabel(parent, className = "", text = "", x = 0, y = 0) {
      const label = createAndrewsRouteBoardSvgElement("text", {
        class: className,
        x,
        y
      });
      label.textContent = text;
      parent.appendChild(label);
      return label;
    }
    function appendAndrewsRouteBoardMapGeographyLayer(svg) {
      const geography = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-geography"
      });
      geography.dataset.mapGeographyModel = "low-saturation-grammar-geography";
      geography.dataset.mapGeographyRegionCount = String(ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS.length);
      geography.dataset.mapGeographyGridCount = String(ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES.length);
      geography.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks";
      geography.dataset.mapDimensionLandmarkCount = String(ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS.length);
      const grid = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-geography-grid"
      });
      ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES.forEach(line => {
        const path = createAndrewsRouteBoardSvgElement("path", {
          class: "andrews-route-board__map-geography-grid-line",
          d: line.path
        });
        path.dataset.mapGeographyGrid = line.id;
        grid.appendChild(path);
      });
      geography.appendChild(grid);
      ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS.forEach(region => {
        const path = createAndrewsRouteBoardSvgElement("path", {
          class: "andrews-route-board__map-geography-region",
          d: region.path
        });
        path.dataset.mapGeographyRegion = region.id;
        path.dataset.mapGeographyZone = region.zone;
        geography.appendChild(path);
        const label = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-geography-label",
          x: region.labelX,
          y: region.labelY
        });
        label.dataset.mapGeographyRegion = region.id;
        label.dataset.mapGeographyZone = region.zone;
        label.textContent = region.label;
        geography.appendChild(label);
      });
      const landmarks = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-dimension-landmarks"
      });
      landmarks.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks";
      landmarks.dataset.mapDimensionLandmarkCount = String(ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS.length);
      ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS.forEach((entry, index) => {
        const landmark = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-dimension-landmark",
          x: entry.x,
          y: entry.y,
          "text-anchor": entry.anchor || "middle"
        });
        landmark.dataset.dimensionId = entry.id;
        landmark.dataset.dimensionIndex = String(index + 1);
        landmark.textContent = entry.label;
        landmarks.appendChild(landmark);
      });
      geography.appendChild(landmarks);
      svg.appendChild(geography);
      return geography;
    }
    function appendAndrewsRouteBoardMapCompass(svg) {
      const compass = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-compass",
        transform: "translate(650 48)"
      });
      compass.dataset.mapCompassModel = "grammar-map-orientation-compass";
      compass.dataset.mapNorthDimension = "formula-boundary";
      compass.dataset.mapEastDimension = "source-target-route";
      compass.dataset.mapSouthDimension = "cnn-basin";
      compass.dataset.mapWestDimension = "entrada-source";
      compass.appendChild(createAndrewsRouteBoardSvgElement("circle", {
        class: "andrews-route-board__map-compass-ring",
        cx: 0,
        cy: 0,
        r: 24
      }));
      compass.appendChild(createAndrewsRouteBoardSvgElement("path", {
        class: "andrews-route-board__map-compass-axis",
        d: "M0 -17 L0 18 M-12 8 L12 8"
      }));
      compass.appendChild(createAndrewsRouteBoardSvgElement("path", {
        class: "andrews-route-board__map-compass-needle",
        d: "M0 -18 L7 6 L0 1 L-7 6Z"
      }));
      const north = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-compass-north",
        x: 0,
        y: -27,
        "text-anchor": "middle"
      });
      north.textContent = "N";
      compass.appendChild(north);
      const east = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-compass-east",
        x: 31,
        y: 5,
        "text-anchor": "start"
      });
      east.textContent = "Salida";
      compass.appendChild(east);
      const label = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-compass-label",
        x: 0,
        y: 36,
        "text-anchor": "middle"
      });
      label.textContent = "Orientacion";
      compass.appendChild(label);
      svg.appendChild(compass);
      return compass;
    }
    function getAndrewsRouteBoardMapRouteState(routeId = "", {
      availableRouteIds = [],
      visibleRouteIds = [],
      activeRouteIds = []
    } = {}) {
      if (Array.isArray(activeRouteIds) && activeRouteIds.includes(routeId)) {
        return "active";
      }
      if (Array.isArray(availableRouteIds) && availableRouteIds.includes(routeId) || Array.isArray(visibleRouteIds) && visibleRouteIds.includes(routeId)) {
        return "available";
      }
      return "terrain";
    }
    function getAndrewsRouteBoardMapLineStationCount() {
      return Object.values(ANDREWS_ROUTE_BOARD_MAP_ROUTES).reduce((total, route) => total + (Array.isArray(route?.stationKeys) ? route.stationKeys.length : 0), 0);
    }
    function appendAndrewsRouteBoardMapTrackBeds(svg, {
      availableRouteIds = [],
      visibleRouteIds = [],
      activeRouteIds = []
    } = {}, routeMetrics = {}) {
      const routeEntries = Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES);
      const beds = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-track-beds"
      });
      beds.dataset.mapTrackBedModel = "low-saturation-route-track-bed";
      beds.dataset.mapTrackBedCount = String(routeEntries.length);
      beds.dataset.mapTrackBedPathCount = String(routeEntries.length * 2);
      routeEntries.forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        ["outer", "inner"].forEach(trackBedLayer => {
          const bed = createAndrewsRouteBoardSvgElement("path", {
            class: `andrews-route-board__map-track-bed andrews-route-board__map-track-bed--${trackBedLayer}`,
            d: route.path
          });
          bed.dataset.routeId = routeId;
          bed.dataset.routeCode = route.code;
          bed.dataset.routeFamily = route.family;
          bed.dataset.routeMapState = routeState;
          bed.dataset.trackBedLayer = trackBedLayer;
          applyAndrewsRouteBoardMapRouteMetricDataset(bed, routeMetrics[routeId]);
          beds.appendChild(bed);
        });
      });
      svg.appendChild(beds);
      return beds;
    }
    function appendAndrewsRouteBoardMapRouteDirections(svg, {
      availableRouteIds = [],
      visibleRouteIds = [],
      activeRouteIds = []
    } = {}) {
      const directions = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-route-directions"
      });
      directions.dataset.mapRouteDirectionModel = "route-direction-arrows-passenger-heading";
      directions.dataset.mapRouteDirectionCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).length);
      Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        const arrowX = Number(route.arrowX || route.badgeX || 0);
        const arrowY = Number(route.arrowY || route.badgeY || 0);
        const arrowRotate = Number(route.arrowRotate || 0);
        const arrow = createAndrewsRouteBoardSvgElement("g", {
          class: "andrews-route-board__map-route-direction",
          transform: `translate(${arrowX} ${arrowY}) rotate(${arrowRotate})`
        });
        arrow.dataset.routeId = routeId;
        arrow.dataset.routeCode = route.code;
        arrow.dataset.routeMapState = routeState;
        arrow.dataset.routeFamily = route.family;
        arrow.dataset.routeLabel = route.label;
        arrow.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-route-direction-halo",
          cx: 0,
          cy: 0,
          r: 8
        }));
        arrow.appendChild(createAndrewsRouteBoardSvgElement("path", {
          class: "andrews-route-board__map-route-direction-arrow",
          d: "M-5 -5 L6 0 L-5 5Z",
          fill: route.color
        }));
        const title = createAndrewsRouteBoardSvgElement("title");
        title.textContent = `${route.code}. ${route.label}`;
        arrow.appendChild(title);
        directions.appendChild(arrow);
      });
      svg.appendChild(directions);
      return directions;
    }
    function appendAndrewsRouteBoardMapLineStations(svg, {
      availableRouteIds = [],
      visibleRouteIds = [],
      activeRouteIds = []
    } = {}) {
      const markers = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-line-stations"
      });
      markers.dataset.mapLineStationModel = "station-points-on-colored-route-lines";
      markers.dataset.mapLineStationCount = String(getAndrewsRouteBoardMapLineStationCount());
      Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        (Array.isArray(route.stationKeys) ? route.stationKeys : []).forEach(stationKey => {
          const station = ANDREWS_ROUTE_BOARD_MAP_STATIONS[stationKey];
          if (!station) {
            return;
          }
          const marker = createAndrewsRouteBoardSvgElement("circle", {
            class: "andrews-route-board__map-line-station",
            cx: station.x,
            cy: station.y,
            r: station.stationRole === "transfer" ? 10 : 8,
            stroke: route.color
          });
          marker.dataset.routeId = routeId;
          marker.dataset.routeCode = route.code;
          marker.dataset.routeMapState = routeState;
          marker.dataset.stationKey = stationKey;
          marker.dataset.stationRole = station.stationRole;
          markers.appendChild(marker);
        });
      });
      svg.appendChild(markers);
      return markers;
    }
    function appendAndrewsRouteBoardMapStationServiceBadges(parent, stationKey = "", station = null) {
      const serviceRoutes = getAndrewsRouteBoardMapStationServiceRoutes(stationKey);
      if (!parent || !station || !serviceRoutes.length) {
        return null;
      }
      const group = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-station-service"
      });
      applyAndrewsRouteBoardMapStationServiceDataset(group, serviceRoutes);
      const direction = station.x > 500 ? -1 : 1;
      const serviceY = station.y > 210 ? 10 : -13;
      serviceRoutes.forEach((route, index) => {
        const chip = createAndrewsRouteBoardSvgElement("g", {
          class: "andrews-route-board__map-station-service-chip",
          transform: `translate(${direction * (12 + index * 12)} ${serviceY})`
        });
        chip.dataset.routeId = route.routeId;
        chip.dataset.routeCode = route.code;
        chip.dataset.routeFamily = route.family;
        chip.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-station-service-dot",
          cx: 0,
          cy: 0,
          r: 5,
          fill: route.color || "rgba(67, 83, 77, 0.68)"
        }));
        const text = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-station-service-code",
          x: 0,
          y: 3,
          "text-anchor": "middle"
        });
        text.textContent = route.code;
        chip.appendChild(text);
        group.appendChild(chip);
      });
      parent.appendChild(group);
      return group;
    }
    function appendAndrewsRouteBoardMapTransferHubs(svg) {
      const entries = getAndrewsRouteBoardMapTransferEntries();
      const hubs = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-transfer-hubs"
      });
      hubs.dataset.mapTransferHubModel = "shared-station-route-interchange";
      hubs.dataset.mapTransferHubCount = String(entries.length);
      entries.forEach(entry => {
        const hub = createAndrewsRouteBoardSvgElement("g", {
          class: "andrews-route-board__map-transfer-hub",
          transform: `translate(${entry.station.x} ${entry.station.y})`
        });
        hub.dataset.stationKey = entry.stationKey;
        hub.dataset.stationRole = entry.station.stationRole || "";
        hub.dataset.transferKind = entry.transferKind;
        applyAndrewsRouteBoardMapStationServiceDataset(hub, entry.serviceRoutes);
        hub.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-transfer-hub-ring",
          cx: 0,
          cy: 0,
          r: entry.station.stationRole === "transfer" ? 14 : 12
        }));
        hubs.appendChild(hub);
      });
      svg.appendChild(hubs);
      return hubs;
    }
    function appendAndrewsRouteBoardMapRouteTerminals(svg, {
      availableRouteIds = [],
      visibleRouteIds = [],
      activeRouteIds = []
    } = {}, routeMetrics = {}) {
      const entries = getAndrewsRouteBoardMapRouteTerminalEndpointEntries();
      const terminals = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-route-terminals"
      });
      terminals.dataset.mapRouteTerminalModel = "route-endpoints-on-map";
      terminals.dataset.mapRouteTerminalCount = String(entries.length);
      entries.forEach(entry => {
        const routeState = getAndrewsRouteBoardMapRouteState(entry.routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        const terminal = createAndrewsRouteBoardSvgElement("g", {
          class: "andrews-route-board__map-route-terminal",
          transform: `translate(${entry.x} ${entry.y})`
        });
        terminal.dataset.routeId = entry.routeId;
        terminal.dataset.routeCode = entry.route?.code || "";
        terminal.dataset.routeFamily = entry.route?.family || "";
        terminal.dataset.routeMapState = routeState;
        terminal.dataset.terminalEndpointRole = entry.endpointRole;
        terminal.dataset.terminalEndpointIndex = String(entry.endpointIndex);
        terminal.dataset.terminalStationKey = entry.stationKey;
        terminal.dataset.terminalStationLabel = entry.stationLabel;
        applyAndrewsRouteBoardMapRouteMetricDataset(terminal, routeMetrics[entry.routeId]);
        const title = createAndrewsRouteBoardSvgElement("title");
        title.textContent = `${entry.route?.code || ""} ${entry.endpointRole}: ${entry.stationLabel}`;
        terminal.appendChild(title);
        terminal.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-route-terminal-dot",
          cx: 0,
          cy: 0,
          r: 8,
          fill: entry.route?.color || "rgba(67, 83, 77, 0.68)"
        }));
        const text = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-route-terminal-code",
          x: 0,
          y: 3,
          "text-anchor": "middle"
        });
        text.textContent = entry.route?.code || "";
        terminal.appendChild(text);
        terminals.appendChild(terminal);
      });
      svg.appendChild(terminals);
      return terminals;
    }
    function appendAndrewsRouteBoardMapDestinationCallouts(svg, {
      availableRouteIds = [],
      visibleRouteIds = [],
      activeRouteIds = []
    } = {}, routeMetrics = {}) {
      const entries = getAndrewsRouteBoardMapDestinationCalloutEntries();
      const callouts = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-destination-callouts"
      });
      callouts.dataset.mapDestinationCalloutModel = "route-destination-headsign-callouts";
      callouts.dataset.mapDestinationCalloutCount = String(entries.length);
      entries.forEach(entry => {
        const routeState = getAndrewsRouteBoardMapRouteState(entry.routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        const callout = createAndrewsRouteBoardSvgElement("g", {
          class: "andrews-route-board__map-destination-callout",
          transform: `translate(${entry.calloutX} ${entry.calloutY})`
        });
        callout.dataset.routeId = entry.routeId;
        callout.dataset.routeCode = entry.route?.code || "";
        callout.dataset.routeFamily = entry.route?.family || "";
        callout.dataset.routeMapState = routeState;
        callout.dataset.destinationStationKey = entry.stationKey;
        callout.dataset.destinationStationLabel = entry.stationLabel;
        callout.dataset.destinationCalloutModel = entry.calloutModel;
        callout.dataset.destinationCalloutAnchor = entry.calloutAnchor;
        callout.dataset.destinationCalloutLabel = entry.calloutLabel;
        applyAndrewsRouteBoardMapRouteMetricDataset(callout, routeMetrics[entry.routeId]);
        const leader = createAndrewsRouteBoardSvgElement("path", {
          class: "andrews-route-board__map-destination-callout-leader",
          d: `M${entry.station.x - entry.calloutX} ${entry.station.y - entry.calloutY} L0 0`,
          stroke: entry.route?.color || "rgba(67, 83, 77, 0.68)"
        });
        callout.appendChild(leader);
        callout.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-destination-callout-dot",
          cx: entry.codeX,
          cy: 0,
          r: 7,
          fill: entry.route?.color || "rgba(67, 83, 77, 0.68)"
        }));
        const code = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-destination-callout-code",
          x: entry.codeX,
          y: 3,
          "text-anchor": "middle"
        });
        code.textContent = entry.route?.code || "";
        callout.appendChild(code);
        const text = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-destination-callout-text",
          x: entry.textX,
          y: 3,
          "text-anchor": entry.calloutAnchor
        });
        text.textContent = entry.calloutLabel || "";
        callout.appendChild(text);
        const title = createAndrewsRouteBoardSvgElement("title");
        title.textContent = `${entry.route?.code || ""} destino ${entry.stationLabel || ""}`;
        callout.appendChild(title);
        callouts.appendChild(callout);
      });
      svg.appendChild(callouts);
      return callouts;
    }
    function getAndrewsRouteBoardMapProgressFrame(board = null, coordinateFrames = {}) {
      const itinerary = getAndrewsRouteBoardMapItineraryFrame(board, coordinateFrames);
      const routeSign = getAndrewsRouteBoardMapPrimaryRouteSign(board);
      const routeIds = routeSign.routeIds.length ? routeSign.routeIds : itinerary.routeIds;
      const routeId = routeIds[0] || "";
      const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId] || null;
      const currentStationKey = board?.currentStation?.key || itinerary.sourceStation || "";
      const destinationStationKey = board?.destinationStation?.key || itinerary.destinationStation || routeSign.nextStationKey || "";
      const stops = Array.isArray(itinerary.stops) ? itinerary.stops : [];
      const currentIndex = stops.findIndex(stop => stop.key === currentStationKey);
      const nextStop = currentIndex >= 0 ? stops[currentIndex + 1] : stops.length > 1 ? stops[1] : stops[0];
      const nextStationKey = nextStop?.key || routeSign.nextStationKey || destinationStationKey;
      const currentStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[currentStationKey] || null;
      const nextStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[nextStationKey] || null;
      const destinationStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[destinationStationKey] || null;
      if (!currentStation) {
        return null;
      }
      const targetStation = nextStation || destinationStation || currentStation;
      const hasNextStation = Boolean(targetStation && targetStation !== currentStation);
      const markerRatio = hasNextStation ? 0.22 : 0;
      const markerX = currentStation.x + (targetStation.x - currentStation.x) * markerRatio;
      const markerY = currentStation.y + (targetStation.y - currentStation.y) * markerRatio;
      const angle = hasNextStation ? Math.atan2(targetStation.y - currentStation.y, targetStation.x - currentStation.x) * (180 / Math.PI) : 0;
      const completedStopCount = Math.max(currentIndex, 0);
      const totalSegments = Math.max(stops.length - 1, 1);
      return {
        kind: "andrews-route-board-map-progress-frame",
        version: 1,
        progressModel: "passenger-onboard-route-progress",
        progressState: hasNextStation ? "en-route" : "at-station",
        currentStationKey,
        currentStationLabel: board?.currentStation?.label || currentStation.label || currentStationKey,
        nextStationKey,
        nextStationLabel: nextStop?.label || routeSign.nextStationLabel || targetStation?.label || "",
        destinationStationKey,
        destinationStationLabel: board?.destinationStation?.label || destinationStation?.label || "",
        routeId,
        routeCode: route?.code || "",
        routeColor: route?.color || "rgba(67, 83, 77, 0.68)",
        routePathLabel: routeSign.routePathLabel || itinerary.routePathLabel || "",
        actionLabel: routeSign.actionLabel || itinerary.actionLabel || "",
        stopCount: stops.length,
        completedStopCount,
        segmentCount: itinerary.segmentCount,
        transferCount: itinerary.transferCount,
        resistanceScore: itinerary.resistanceScore || routeSign.resistanceScore || 0,
        progressRatio: totalSegments ? completedStopCount / totalSegments : 0,
        sourceX: currentStation.x,
        sourceY: currentStation.y,
        targetX: targetStation.x,
        targetY: targetStation.y,
        markerX,
        markerY,
        angle
      };
    }
    function appendAndrewsRouteBoardMapProgressMarker(svg, board = null, coordinateFrames = {}) {
      const frame = getAndrewsRouteBoardMapProgressFrame(board, coordinateFrames);
      if (!frame) {
        return null;
      }
      const progress = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-progress"
      });
      progress.dataset.mapProgressModel = frame.progressModel;
      progress.dataset.mapProgressState = frame.progressState;
      progress.dataset.currentStation = frame.currentStationKey;
      progress.dataset.nextStation = frame.nextStationKey;
      progress.dataset.destinationStation = frame.destinationStationKey;
      progress.dataset.routeId = frame.routeId;
      progress.dataset.routeCode = frame.routeCode;
      progress.dataset.routePathLabel = frame.routePathLabel;
      progress.dataset.routeActionLabel = frame.actionLabel;
      progress.dataset.routeStopCount = String(frame.stopCount || 0);
      progress.dataset.completedStopCount = String(frame.completedStopCount || 0);
      progress.dataset.segmentCount = String(frame.segmentCount || 0);
      progress.dataset.transferCount = String(frame.transferCount || 0);
      progress.dataset.resistanceScore = String(frame.resistanceScore || 0);
      progress.dataset.progressRatio = String(frame.progressRatio || 0);
      const title = createAndrewsRouteBoardSvgElement("title");
      title.textContent = [frame.actionLabel || "Viaje", frame.currentStationLabel, frame.nextStationLabel ? `siguiente ${frame.nextStationLabel}` : "", frame.routeCode ? `linea ${frame.routeCode}` : ""].filter(Boolean).join(" · ");
      progress.appendChild(title);
      if (frame.progressState === "en-route") {
        progress.appendChild(createAndrewsRouteBoardSvgElement("path", {
          class: "andrews-route-board__map-progress-segment",
          d: `M${frame.sourceX} ${frame.sourceY} L${frame.targetX} ${frame.targetY}`,
          stroke: frame.routeColor
        }));
      }
      const marker = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-progress-marker",
        transform: `translate(${frame.markerX} ${frame.markerY}) rotate(${frame.angle})`
      });
      marker.dataset.mapProgressState = frame.progressState;
      marker.appendChild(createAndrewsRouteBoardSvgElement("rect", {
        class: "andrews-route-board__map-progress-car",
        x: -15,
        y: -8,
        width: 30,
        height: 16,
        rx: 4,
        ry: 4,
        fill: frame.routeColor
      }));
      marker.appendChild(createAndrewsRouteBoardSvgElement("circle", {
        class: "andrews-route-board__map-progress-light",
        cx: 10,
        cy: 0,
        r: 2.5
      }));
      const code = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-progress-code",
        x: -3,
        y: 3,
        "text-anchor": "middle"
      });
      code.textContent = frame.routeCode || ">";
      marker.appendChild(code);
      progress.appendChild(marker);
      const nextLabel = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-progress-label",
        x: frame.markerX + 18,
        y: frame.markerY - 14
      });
      nextLabel.textContent = frame.nextStationLabel ? `Siguiente: ${frame.nextStationLabel}` : frame.currentStationLabel;
      progress.appendChild(nextLabel);
      svg.appendChild(progress);
      return progress;
    }
    function appendAndrewsRouteBoardMapTransfers(parent) {
      const entries = getAndrewsRouteBoardMapTransferEntries();
      const transfers = targetObject.document.createElement("div");
      transfers.className = "andrews-route-board__map-transfers";
      transfers.dataset.mapTransferModel = "shared-station-transfer-options";
      transfers.dataset.transferStationCount = String(entries.length);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-transfers-label";
      label.textContent = "Trasbordos";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-transfer-list";
      entries.forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-transfer";
        item.dataset.stationKey = entry.stationKey;
        item.dataset.transferKind = entry.transferKind;
        applyAndrewsRouteBoardMapStationServiceDataset(item, entry.serviceRoutes);
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__map-transfer-name";
        name.textContent = entry.station.label || entry.stationKey;
        const services = targetObject.document.createElement("span");
        services.className = "andrews-route-board__map-transfer-services";
        entry.serviceRoutes.forEach(route => {
          const chip = targetObject.document.createElement("span");
          chip.className = "andrews-route-board__map-transfer-service-chip";
          chip.dataset.routeId = route.routeId;
          chip.dataset.routeCode = route.code;
          chip.style.backgroundColor = route.color || "rgba(67, 83, 77, 0.68)";
          chip.textContent = route.code;
          services.appendChild(chip);
        });
        item.append(name, services);
        list.appendChild(item);
      });
      transfers.append(label, list);
      parent.appendChild(transfers);
      return transfers;
    }
    function appendAndrewsRouteBoardMapTerminalBoard(parent, board = null, context = {}, mapState = {}) {
      const entries = getAndrewsRouteBoardMapRouteTerminalEntries();
      const terminals = targetObject.document.createElement("div");
      terminals.className = "andrews-route-board__map-terminals";
      terminals.dataset.mapTerminalBoardModel = "route-terminal-service-board";
      terminals.dataset.terminalRouteCount = String(entries.length);
      terminals.dataset.terminalRouteCodes = entries.map(entry => entry.route?.code || "").filter(Boolean).join("|");
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-terminals-label";
      label.textContent = "Lineas";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-terminal-list";
      const availableRouteIds = Array.isArray(mapState.availableRouteIds) ? mapState.availableRouteIds : getAndrewsRouteBoardMapRouteIds(board, "available");
      const visibleRouteIds = Array.isArray(mapState.visibleRouteIds) ? mapState.visibleRouteIds : getAndrewsRouteBoardMapRouteIds(board, "visible");
      const activeRouteIds = Array.isArray(mapState.activeRouteIds) ? mapState.activeRouteIds : getAndrewsRouteBoardMapRouteIds(board, "active");
      const routeMetrics = mapState.routeMetrics || getAndrewsRouteBoardMapRouteMetrics(board, context);
      entries.forEach(entry => {
        const routeState = getAndrewsRouteBoardMapRouteState(entry.routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        const item = targetObject.document.createElement(routeState === "terrain" ? "span" : "button");
        item.className = "andrews-route-board__map-terminal";
        item.dataset.routeId = entry.routeId;
        item.dataset.routeCode = entry.route?.code || "";
        item.dataset.routeFamily = entry.route?.family || "";
        item.dataset.routeMapState = routeState;
        item.dataset.routeSourceStation = entry.sourceKey;
        item.dataset.routeDestinationStation = entry.destinationKey;
        item.dataset.routeStationCount = String(entry.stationCount);
        applyAndrewsRouteBoardMapRouteMetricDataset(item, routeMetrics[entry.routeId]);
        if (item.tagName === "BUTTON") {
          item.type = "button";
        }
        const code = targetObject.document.createElement("span");
        code.className = "andrews-route-board__map-terminal-code";
        code.style.backgroundColor = entry.route?.color || "rgba(67, 83, 77, 0.68)";
        code.textContent = entry.route?.code || "";
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__map-terminal-main";
        main.textContent = `${entry.sourceLabel} > ${entry.destinationLabel}`;
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__map-terminal-meta";
        meta.textContent = `${entry.stationCount} estaciones`;
        attachAndrewsRouteBoardMapRouteControl(item, entry.routeId, entry.route, routeState, board, context);
        item.append(code, main, meta);
        list.appendChild(item);
      });
      terminals.append(label, list);
      parent.appendChild(terminals);
      return terminals;
    }
    function appendAndrewsRouteBoardMapSymbolKey(parent) {
      const key = targetObject.document.createElement("div");
      key.className = "andrews-route-board__map-symbol-key";
      key.dataset.mapSymbolKeyModel = "station-symbol-map-key";
      key.dataset.mapSymbolKeyCount = String(ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES.length);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-symbol-key-label";
      label.textContent = "Clave";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-symbol-key-list";
      ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES.forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-symbol-key-item";
        item.dataset.mapSymbolKeyId = entry.id;
        item.dataset.mapSymbolKind = entry.symbolKind;
        const icon = targetObject.document.createElement("span");
        icon.className = "andrews-route-board__map-symbol-key-icon";
        icon.dataset.mapSymbolKind = entry.symbolKind;
        icon.textContent = entry.symbolText || "";
        const text = targetObject.document.createElement("span");
        text.className = "andrews-route-board__map-symbol-key-text";
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__map-symbol-key-name";
        name.textContent = entry.label;
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__map-symbol-key-meta";
        meta.textContent = entry.meta;
        text.append(name, meta);
        item.append(icon, text);
        list.appendChild(item);
      });
      key.append(label, list);
      parent.appendChild(key);
      return key;
    }
    function appendAndrewsRouteBoardMapLayerStack(parent, board = null) {
      const stack = targetObject.document.createElement("div");
      stack.className = "andrews-route-board__map-layer-stack";
      stack.dataset.mapLayerStackModel = "grammar-gis-visible-layer-stack";
      stack.dataset.mapLayerCount = String(ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.length);
      stack.dataset.mapLayerIds = ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.map(entry => entry.id).join("|");
      stack.dataset.mapEngineModel = "layered-grammar-gis";
      stack.dataset.mapInterfaceModel = "transit-map-surface";
      stack.dataset.mapRoutePlannerModel = "passenger-route-planner";
      stack.dataset.currentStation = board?.currentStation?.key || "";
      stack.dataset.destinationStation = board?.destinationStation?.key || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-layer-stack-label";
      label.textContent = "Capas mapa";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-layer-stack-list";
      ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.forEach((entry, index) => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-layer";
        item.dataset.mapLayerId = entry.id;
        item.dataset.mapLayerIndex = String(index + 1);
        item.dataset.mapLayerModel = entry.model;
        item.dataset.mapLayerRole = entry.role;
        item.dataset.mapLayerState = "visible";
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__map-layer-name";
        name.textContent = entry.label;
        const role = targetObject.document.createElement("span");
        role.className = "andrews-route-board__map-layer-role";
        role.textContent = entry.role;
        item.append(name, role);
        list.appendChild(item);
      });
      stack.append(label, list);
      parent.appendChild(stack);
      return stack;
    }
    function appendAndrewsRouteBoardMapCorridors(parent) {
      const entries = getAndrewsRouteBoardMapCorridorEntries();
      const corridors = targetObject.document.createElement("div");
      corridors.className = "andrews-route-board__map-corridors";
      corridors.dataset.mapCorridorModel = "route-family-corridors";
      corridors.dataset.mapCorridorCount = String(entries.length);
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__map-corridors-label";
      label.textContent = "Corredores";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__map-corridor-list";
      entries.forEach(entry => {
        const item = targetObject.document.createElement("span");
        item.className = "andrews-route-board__map-corridor";
        item.dataset.routeFamily = entry.family;
        item.dataset.routeFamilyRouteCount = String(entry.routes.length);
        item.dataset.routeFamilyRouteCodes = entry.routes.map(route => route.code).filter(Boolean).join("|");
        const services = targetObject.document.createElement("span");
        services.className = "andrews-route-board__map-corridor-services";
        entry.routes.forEach(route => {
          const chip = targetObject.document.createElement("span");
          chip.className = "andrews-route-board__map-corridor-service-chip";
          chip.dataset.routeId = route.routeId;
          chip.dataset.routeCode = route.code;
          chip.style.backgroundColor = route.color || "rgba(67, 83, 77, 0.68)";
          chip.textContent = route.code;
          services.appendChild(chip);
        });
        const text = targetObject.document.createElement("span");
        text.className = "andrews-route-board__map-corridor-text";
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__map-corridor-name";
        name.textContent = entry.label;
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__map-corridor-meta";
        meta.textContent = entry.meta || `${entry.routes.length} rutas`;
        text.append(name, meta);
        item.append(services, text);
        list.appendChild(item);
      });
      corridors.append(label, list);
      parent.appendChild(corridors);
      return corridors;
    }
    function appendAndrewsRouteBoardGeographyMap(parent, board = null, context = {}) {
      if (!board || typeof board !== "object") {
        return null;
      }
      const availableRouteIds = getAndrewsRouteBoardMapRouteIds(board, "available");
      const visibleRouteIds = getAndrewsRouteBoardMapRouteIds(board, "visible");
      const activeRouteIds = getAndrewsRouteBoardMapRouteIds(board, "active");
      const routeMetrics = getAndrewsRouteBoardMapRouteMetrics(board, context);
      const activeStationKeys = getAndrewsRouteBoardMapStationKeysForRoutes(activeRouteIds.length ? activeRouteIds : visibleRouteIds);
      const availableStationKeys = getAndrewsRouteBoardMapStationKeysForRoutes(availableRouteIds);
      const sourceStationKey = board.currentStation?.key || "";
      const destinationStationKey = board.destinationStation?.key || "";
      const sourceLayerStationKeys = Array.isArray(board.sourceCandidateStageKeys) ? board.sourceCandidateStageKeys : [];
      const approvalFrame = getAndrewsRouteBoardMapApprovalFrame(board);
      const map = targetObject.document.createElement("div");
      map.className = "andrews-route-board__map";
      map.dataset.mapModel = "andrews-geography-route-lines";
      map.dataset.mapEngineModel = "layered-grammar-gis";
      map.dataset.mapInterfaceModel = "transit-map-surface";
      map.dataset.mapRoutePlannerModel = "passenger-route-planner";
      map.dataset.mapTerrain = "formula-boundary-stem-rank-route-slots-function-use";
      map.dataset.mapDimensionModel = "inter-dimensional-positioning-system";
      map.dataset.mapDimensionOrder = ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.map(entry => entry.id).join("|");
      map.dataset.mapRouteCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).length);
      map.dataset.mapStationCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_STATIONS).length);
      map.dataset.mapGeographyModel = "low-saturation-grammar-geography";
      map.dataset.mapGeographyRegionCount = String(ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS.length);
      map.dataset.mapTrackBedModel = "low-saturation-route-track-bed";
      map.dataset.mapTrackBedCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).length);
      map.dataset.mapTrackBedPathCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).length * 2);
      map.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks";
      map.dataset.mapDimensionLandmarkCount = String(ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS.length);
      map.dataset.mapCompassModel = "grammar-map-orientation-compass";
      map.dataset.mapCompassNorthDimension = "formula-boundary";
      map.dataset.mapLineStationModel = "station-points-on-colored-route-lines";
      map.dataset.mapLineStationCount = String(getAndrewsRouteBoardMapLineStationCount());
      map.dataset.mapRouteDirectionModel = "route-direction-arrows-passenger-heading";
      map.dataset.mapRouteDirectionCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).length);
      map.dataset.mapStationLabelPlacementModel = "cartographic-station-label-placement";
      map.dataset.mapStationLabelPlacementCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_STATIONS).length);
      map.dataset.mapTransferHubModel = "shared-station-route-interchange";
      map.dataset.mapTransferHubCount = String(getAndrewsRouteBoardMapTransferEntries().length);
      map.dataset.mapTerminalBoardModel = "route-terminal-service-board";
      map.dataset.mapTerminalRouteCount = String(getAndrewsRouteBoardMapRouteTerminalEntries().length);
      map.dataset.mapRouteTerminalModel = "route-endpoints-on-map";
      map.dataset.mapRouteTerminalCount = String(getAndrewsRouteBoardMapRouteTerminalEndpointEntries().length);
      map.dataset.mapDestinationCalloutModel = "route-destination-headsign-callouts";
      map.dataset.mapDestinationCalloutCount = String(getAndrewsRouteBoardMapDestinationCalloutEntries().length);
      map.dataset.mapSymbolKeyModel = "station-symbol-map-key";
      map.dataset.mapSymbolKeyCount = String(ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES.length);
      map.dataset.mapLayerStackModel = "grammar-gis-visible-layer-stack";
      map.dataset.mapLayerCount = String(ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.length);
      map.dataset.mapLayerIds = ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.map(entry => entry.id).join("|");
      map.dataset.mapCorridorModel = "route-family-corridors";
      map.dataset.mapCorridorCount = String(getAndrewsRouteBoardMapCorridorEntries().length);
      map.dataset.mapTripPreviewModel = "passenger-route-preview-board";
      map.dataset.mapProgressModel = "passenger-onboard-route-progress";
      map.dataset.mapAnnouncementModel = "passenger-next-stop-announcements";
      map.dataset.mapTransferGuidanceModel = "passenger-transfer-guidance-board";
      map.dataset.mapHeadsignModel = "passenger-headsign-boarding-direction";
      map.dataset.mapContinuityModel = "formula-surface-through-service";
      map.dataset.mapOptionBoardModel = "single-passenger-unified-option-board";
      map.dataset.mapOptionCount = String(getAndrewsRouteBoardMapOptionEntries(board, context).length);
      map.dataset.mapServiceAdvisoryModel = "obstacle-blocked-condition-uncertainty-advisory";
      map.dataset.mapApprovalGateModel = approvalFrame.approvalModel;
      map.dataset.mapApprovalState = approvalFrame.approvalState;
      map.dataset.mapApprovalEngineAuditState = approvalFrame.engineAuditState;
      map.dataset.mapApprovalVisualProofState = approvalFrame.visualProofState;
      map.dataset.mapApprovalRouteCoverageState = approvalFrame.routeCoverageState;
      map.dataset.mapApprovalCoordinateCoverageState = approvalFrame.coordinateCoverageState;
      map.dataset.mapApprovalHypothesisState = approvalFrame.hypothesisState;
      map.dataset.mapApprovalRouteCount = String(approvalFrame.routeCount || 0);
      map.dataset.mapApprovalExpectedRouteCount = String(approvalFrame.expectedRouteCount || 0);
      map.dataset.mapApprovalCoordinateCount = String(approvalFrame.coordinateCount || 0);
      map.dataset.mapApprovalCoordinateFloor = String(approvalFrame.coordinateFloor || 0);
      map.dataset.mapAvailableRouteIds = availableRouteIds.join("|");
      map.dataset.mapVisibleRouteIds = visibleRouteIds.join("|");
      map.dataset.mapActiveRouteIds = activeRouteIds.join("|");
      map.dataset.mapSourceStation = sourceStationKey;
      map.dataset.mapDestinationStation = destinationStationKey;
      map.dataset.mapLeastResistanceRoute = board.leastResistanceRoute?.routeId || "";
      map.dataset.mapMostResistanceRoute = board.mostResistanceRoute?.routeId || "";
      map.dataset.mapResistanceHypothesisDomains = getAndrewsRouteBoardHypothesisDomains(board.resistanceHypothesisFrame || null).join("+");
      const label = targetObject.document.createElement("div");
      label.className = "andrews-route-board__map-label";
      const labelMain = targetObject.document.createElement("span");
      labelMain.textContent = "Mapa Andrews";
      const labelMeta = targetObject.document.createElement("span");
      labelMeta.textContent = `${board.hiddenCoordinateCount || 0} coordenadas en la geografia`;
      label.append(labelMain, labelMeta);
      const viewport = targetObject.document.createElement("div");
      viewport.className = "andrews-route-board__map-viewport";
      const svg = createAndrewsRouteBoardSvgElement("svg", {
        class: "andrews-route-board__map-svg",
        viewBox: "0 0 720 300",
        role: "img",
        "aria-label": "Mapa de rutas CNV y CNN",
        focusable: "false"
      });
      appendAndrewsRouteBoardMapGeographyLayer(svg);
      appendAndrewsRouteBoardMapRegion(svg, {
        id: "cnv",
        label: "CNV TERRITORIO",
        x: 24,
        y: 24,
        width: 548,
        height: 132
      });
      appendAndrewsRouteBoardMapRegion(svg, {
        id: "cnn",
        label: "CNN TERRITORIO",
        x: 126,
        y: 174,
        width: 558,
        height: 94
      });
      const transfer = createAndrewsRouteBoardSvgElement("path", {
        class: "andrews-route-board__map-transfer-zone",
        d: "M198 154 C286 136 372 152 456 176 C398 205 326 218 224 220 C204 196 196 176 198 154Z"
      });
      svg.appendChild(transfer);
      appendAndrewsRouteBoardMapLabel(svg, "andrews-route-board__map-region-label andrews-route-board__map-region-label--transfer", "TRANSFERENCIA", 282, 172);
      const contourGroup = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-contours"
      });
      ["M56 44 C210 22 390 34 534 54", "M72 252 C220 274 420 272 662 246", "M54 120 C176 156 312 160 520 130"].forEach(pathData => {
        contourGroup.appendChild(createAndrewsRouteBoardSvgElement("path", {
          class: "andrews-route-board__map-contour",
          d: pathData
        }));
      });
      svg.appendChild(contourGroup);
      appendAndrewsRouteBoardMapTrackBeds(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds
      }, routeMetrics);
      const lines = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-lines"
      });
      Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        const line = createAndrewsRouteBoardSvgElement("path", {
          class: "andrews-route-board__map-line",
          d: route.path,
          stroke: route.color
        });
        line.dataset.routeId = routeId;
        line.dataset.routeMapState = routeState;
        line.dataset.routeFamily = route.family;
        line.dataset.routeCode = route.code;
        line.dataset.routeLabel = route.label;
        applyAndrewsRouteBoardMapRouteMetricDataset(line, routeMetrics[routeId]);
        attachAndrewsRouteBoardMapRouteControl(line, routeId, route, routeState, board, context);
        lines.appendChild(line);
      });
      svg.appendChild(lines);
      appendAndrewsRouteBoardMapRouteDirections(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds
      });
      appendAndrewsRouteBoardMapLineStations(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds
      });
      appendAndrewsRouteBoardMapTransferHubs(svg);
      const badges = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-route-badges"
      });
      Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        const badge = createAndrewsRouteBoardSvgElement("g", {
          class: "andrews-route-board__map-route-badge",
          transform: `translate(${route.badgeX || 0} ${route.badgeY || 0})`
        });
        badge.dataset.routeId = routeId;
        badge.dataset.routeMapState = routeState;
        badge.dataset.routeFamily = route.family;
        badge.dataset.routeCode = route.code;
        badge.dataset.routeLabel = route.label;
        applyAndrewsRouteBoardMapRouteMetricDataset(badge, routeMetrics[routeId]);
        attachAndrewsRouteBoardMapRouteControl(badge, routeId, route, routeState, board, context);
        badge.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-route-badge-dot",
          cx: 0,
          cy: 0,
          r: 10,
          fill: route.color
        }));
        const badgeText = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-route-badge-text",
          x: 0,
          y: 4,
          "text-anchor": "middle"
        });
        badgeText.textContent = route.code;
        badge.appendChild(badgeText);
        badges.appendChild(badge);
      });
      svg.appendChild(badges);
      appendAndrewsRouteBoardMapRouteTerminals(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds
      }, routeMetrics);
      appendAndrewsRouteBoardMapDestinationCallouts(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds
      }, routeMetrics);
      const stations = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-stations"
      });
      const stationCoordinateFrames = {};
      Object.entries(ANDREWS_ROUTE_BOARD_MAP_STATIONS).forEach(([stationKey, station]) => {
        const stationStatus = getAndrewsRouteBoardMapStationStatus(stationKey, {
          activeStationKeys,
          availableStationKeys,
          sourceStationKey,
          destinationStationKey,
          sourceLayerStationKeys
        });
        const stationCoordinateFrame = getAndrewsRouteBoardMapStationCoordinateFrame(stationKey, station, stationStatus);
        const stationLabelPlacement = getAndrewsRouteBoardMapStationLabelPlacement(station);
        stationCoordinateFrames[stationKey] = stationCoordinateFrame;
        const group = createAndrewsRouteBoardSvgElement("g", {
          class: "andrews-route-board__map-station",
          transform: `translate(${station.x} ${station.y})`
        });
        group.dataset.stationKey = stationKey;
        group.dataset.stationRegion = station.region;
        group.dataset.stationRole = station.stationRole;
        group.dataset.stationStatus = stationStatus;
        group.dataset.stationLabelPlacementModel = stationLabelPlacement.placementModel;
        group.dataset.stationLabelDx = String(stationLabelPlacement.labelDx);
        group.dataset.stationLabelDy = String(stationLabelPlacement.labelDy);
        group.dataset.stationLabelAnchor = stationLabelPlacement.labelAnchor;
        const serviceRoutes = getAndrewsRouteBoardMapStationServiceRoutes(stationKey);
        applyAndrewsRouteBoardMapStationCoordinateDataset(group, stationCoordinateFrame);
        applyAndrewsRouteBoardMapStationServiceDataset(group, serviceRoutes);
        attachAndrewsRouteBoardMapStationControl(group, stationKey, station, board, context);
        const title = createAndrewsRouteBoardSvgElement("title");
        title.textContent = stationCoordinateFrame.coordinateLabel;
        group.appendChild(title);
        group.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-station-hit",
          cx: 0,
          cy: 0,
          r: station.stationRole === "transfer" ? 18 : 16
        }));
        group.appendChild(createAndrewsRouteBoardSvgElement("circle", {
          class: "andrews-route-board__map-station-dot",
          cx: 0,
          cy: 0,
          r: station.stationRole === "transfer" ? 8 : 6
        }));
        const stationLabel = createAndrewsRouteBoardSvgElement("text", {
          class: "andrews-route-board__map-station-label",
          x: stationLabelPlacement.labelDx,
          y: stationLabelPlacement.labelDy,
          "text-anchor": stationLabelPlacement.labelAnchor
        });
        stationLabel.dataset.stationLabelPlacementModel = stationLabelPlacement.placementModel;
        stationLabel.textContent = station.label;
        group.appendChild(stationLabel);
        appendAndrewsRouteBoardMapStationServiceBadges(group, stationKey, station);
        if (stationStatus === "current" || stationStatus === "destination") {
          const flag = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-station-flag",
            x: stationLabelPlacement.labelDx,
            y: stationLabelPlacement.flagDy,
            "text-anchor": stationLabelPlacement.labelAnchor
          });
          flag.textContent = stationStatus === "current" ? "Aqui" : "Destino";
          group.appendChild(flag);
        }
        stations.appendChild(group);
      });
      svg.appendChild(stations);
      appendAndrewsRouteBoardMapProgressMarker(svg, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapCompass(svg);
      viewport.appendChild(svg);
      const legend = targetObject.document.createElement("div");
      legend.className = "andrews-route-board__map-legend";
      Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
          availableRouteIds,
          visibleRouteIds,
          activeRouteIds
        });
        const item = targetObject.document.createElement(routeState === "terrain" ? "span" : "button");
        item.className = "andrews-route-board__map-legend-item";
        item.dataset.routeId = routeId;
        item.dataset.routeFamily = route.family;
        item.dataset.routeMapState = routeState;
        applyAndrewsRouteBoardMapRouteMetricDataset(item, routeMetrics[routeId]);
        if (item.tagName === "BUTTON") {
          item.type = "button";
        }
        const swatch = targetObject.document.createElement("span");
        swatch.className = "andrews-route-board__map-legend-swatch";
        swatch.style.backgroundColor = route.color;
        const text = targetObject.document.createElement("span");
        text.textContent = `${route.code}. ${route.label}`;
        attachAndrewsRouteBoardMapRouteControl(item, routeId, route, routeState, board, context);
        item.append(swatch, text);
        legend.appendChild(item);
      });
      map.append(label, viewport, legend);
      appendAndrewsRouteBoardMapTerrainScale(map, board, routeMetrics);
      appendAndrewsRouteBoardMapServiceSummary(map, board);
      appendAndrewsRouteBoardMapServiceAdvisory(map, board);
      appendAndrewsRouteBoardMapApprovalGate(map, board, approvalFrame);
      appendAndrewsRouteBoardMapDimensionScale(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapWayfinding(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapOptions(map, board, context, stationCoordinateFrames);
      appendAndrewsRouteBoardMapTripPreview(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapHeadsign(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapContinuity(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapAnnouncements(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapTransferGuidance(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapItinerary(map, board, stationCoordinateFrames);
      appendAndrewsRouteBoardMapTransfers(map);
      appendAndrewsRouteBoardMapTerminalBoard(map, board, context, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds,
        routeMetrics
      });
      appendAndrewsRouteBoardMapSymbolKey(map);
      appendAndrewsRouteBoardMapLayerStack(map, board);
      appendAndrewsRouteBoardMapCorridors(map);
      appendAndrewsRouteBoardMapStationDirectory(map, board, context, stationCoordinateFrames, {
        activeStationKeys,
        availableStationKeys,
        sourceStationKey,
        destinationStationKey,
        sourceLayerStationKeys
      });
      appendAndrewsRouteBoardMapDepartures(map, board);
      appendAndrewsRouteBoardMapDestinations(map, board, context, stationCoordinateFrames);
      parent.appendChild(map);
      return map;
    }
    function getAndrewsRouteBoardBoundaryKindLabel(kind = "") {
      const normalized = String(kind || "").trim();
      const labels = {
        "cnv-nuclear-clause": "CNV completa",
        "cnv-surface-nuclear-clause-candidate": "CNV superficie",
        "cnn-surface-nuclear-clause-candidate": "CNN superficie",
        "cnn-nuclear-clause": "CNN completa",
        "predicate-stem": "Tronco",
        "predicate-stem-wildcard": "Tronco comodin",
        "route-arrival": "Trayecto",
        "unknown-nuclear-clause": "CN parcial",
        empty: "Entrada abierta"
      };
      return labels[normalized] || normalized;
    }
    function getAndrewsRouteBoardBoundaryConfidenceLabel(confidence = "") {
      const normalized = String(confidence || "").trim();
      const labels = {
        structured: "estructurada",
        "structured-wildcard": "estructurada + comodin",
        "surface-candidate": "superficie probable",
        "surface-wildcard-candidate": "superficie + comodin",
        wildcard: "comodin",
        partial: "parcial",
        "stem-only": "solo tronco",
        positioned: "posicionada",
        open: "abierta"
      };
      return labels[normalized] || normalized;
    }
    function getAndrewsRouteBoardGateDomainLabel(domain = "") {
      const normalized = String(domain || "").trim();
      const labels = {
        "formula-boundary": "Frontera",
        "valence-object": "Valencia",
        "stem-rank-class": "Tronco",
        "operation-suffix": "Operacion",
        "function-use": "Funcion",
        "source-evidence": "Evidencia",
        "orthography-surface": "Superficie",
        "state-possessor-number": "Estado",
        "route-gate": "Ruta"
      };
      return labels[normalized] || normalized;
    }
    function getAndrewsRouteBoardHypothesisDomainLabel(domains = []) {
      const items = Array.isArray(domains) ? domains : [domains];
      return items.map(entry => getAndrewsRouteBoardGateDomainLabel(entry)).filter(Boolean).join(" + ");
    }
    function getAndrewsRouteBoardPrimaryHypothesis(frame = null) {
      return frame?.primaryCandidateObstacle || frame?.primaryTest || frame?.highResistanceGateTest || null;
    }
    function getAndrewsRouteBoardHypothesisDomains(frame = null) {
      const primary = getAndrewsRouteBoardPrimaryHypothesis(frame);
      return Array.isArray(primary?.domains) ? primary.domains.map(entry => String(entry || "").trim()).filter(Boolean) : [];
    }
    function getAndrewsRouteBoardHypothesisActionLabel(entry = null, frame = null) {
      const key = String(entry?.key || frame?.primaryCandidateObstacle?.key || "").trim();
      const direction = String(entry?.direction || "").trim();
      const action = String(entry?.action || frame?.recommendedAction || "").trim();
      const labels = {
        "candidate-obstacle:formula-boundary+function-use": "Separar frontera y funcion antes de expandir la ruta.",
        "function-use": "Resolver funcion despues de fijar frontera y ruta.",
        "operation-suffix": "Mantener operacion y sufijo temprano.",
        "source-evidence+operation-suffix": "Unir evidencia de fuente con operacion antes de superficie."
      };
      if (labels[key]) {
        return labels[key];
      }
      if (direction === "presence-associated-with-higher-resistance") {
        return "Pre-resolver esta dimension antes de mostrar salidas.";
      }
      if (direction === "presence-associated-with-lower-resistance") {
        return "Mantener esta dimension explicita y temprana.";
      }
      if (action) {
        return action;
      }
      return "";
    }
    function formatAndrewsRouteBoardProbability(value = null) {
      const number = Number(value);
      if (!Number.isFinite(number)) {
        return "";
      }
      if (number === 0) {
        return "0";
      }
      if (Math.abs(number) < 0.000001) {
        return number.toExponential(1).replace(".0e", "e").replace("e-0", "e-").replace("e+0", "e+");
      }
      return String(Number(number.toFixed(6)));
    }
    function getAndrewsRouteBoardGateDomainCounts(entry = null, route = null, routeTicket = null) {
      const counts = Array.isArray(entry?.gateDomainCounts) && entry.gateDomainCounts.length ? entry.gateDomainCounts : Array.isArray(routeTicket?.gateDomainCounts) && routeTicket.gateDomainCounts.length ? routeTicket.gateDomainCounts : Array.isArray(route?.gateDomainCounts) ? route.gateDomainCounts : [];
      return counts.map(item => ({
        value: String(item?.value || "").trim(),
        count: Number(item?.count || 0)
      })).filter(item => item.value && item.count > 0);
    }
    function serializeAndrewsRouteBoardGateDomains(gateDomainCounts = []) {
      return (Array.isArray(gateDomainCounts) ? gateDomainCounts : []).map(item => `${item.value}:${Number(item.count || 0)}`).join("|");
    }
    function getAndrewsRouteBoardTicketDimensionStatusLabel(status = "") {
      const normalized = String(status || "").trim();
      const labels = {
        positioned: "puesta",
        open: "abierta",
        "source-positioned": "origen",
        given: "dada",
        deferred: "ruta",
        "deferred-last": "final"
      };
      return labels[normalized] || normalized;
    }
    function getAndrewsRouteBoardSourceLayerRoleLabel(role = "") {
      const normalized = String(role || "").trim();
      const labels = {
        "received-source": "recibida",
        "contained-verbal-core": "nucleo",
        "contained-verbstem": "tronco"
      };
      return labels[normalized] || normalized;
    }
    function serializeAndrewsRouteBoardTicketDimensions(dimensionSlots = []) {
      return (Array.isArray(dimensionSlots) ? dimensionSlots : []).map(entry => [entry.id || "", entry.status || "", entry.value || ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function serializeAndrewsRouteBoardSourceLayers(stages = []) {
      return (Array.isArray(stages) ? stages : []).map(entry => [entry.key || "", entry.sourceRole || "", entry.formulaType || "", entry.formulaPosition || "", entry.stemRank || ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function cloneAndrewsRouteBoardSourceLayerFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        ...frame,
        passengerEvents: Array.isArray(frame.passengerEvents) ? frame.passengerEvents.slice() : [],
        layers: Array.isArray(frame.layers) ? frame.layers.map(entry => ({
          ...entry
        })) : []
      };
    }
    function serializeAndrewsRouteBoardStationLineStops(stops = []) {
      return (Array.isArray(stops) ? stops : []).map(entry => [entry.id || "", entry.status || "", entry.stationKey || ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function serializeAndrewsRouteBoardConcourseStops(stops = []) {
      return (Array.isArray(stops) ? stops : []).map(entry => [entry.id || "", entry.status || "", entry.stationKey || ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function serializeAndrewsRouteBoardPlatformTracks(tracks = []) {
      return (Array.isArray(tracks) ? tracks : []).map(entry => [entry.id || "", entry.recommendationRole || "", entry.sourceKey || "", entry.destinationKey || "", Array.isArray(entry.routeIds) ? entry.routeIds.join("+") : ""].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function serializeAndrewsRouteBoardIntentions(intentionFrame = null) {
      const intentions = Array.isArray(intentionFrame?.intentions) ? intentionFrame.intentions : [];
      return intentions.map(entry => [entry.id || "", entry.selected ? "selected" : "open", Number(entry.optionCount || 0), Number(entry.routeCount || 0)].map(part => String(part || "").replace(/[|:]/g, "")).join(":")).join("|");
    }
    function cloneAndrewsRouteBoardIntentionFrame(intentionFrame = null) {
      if (!intentionFrame || typeof intentionFrame !== "object") {
        return null;
      }
      return {
        ...intentionFrame,
        intentions: Array.isArray(intentionFrame.intentions) ? intentionFrame.intentions.map(entry => ({
          ...entry
        })) : [],
        passengerEvents: Array.isArray(intentionFrame.passengerEvents) ? intentionFrame.passengerEvents.slice() : []
      };
    }
    function cloneAndrewsRouteBoardConcourseFrame(concourseFrame = null) {
      if (!concourseFrame || typeof concourseFrame !== "object") {
        return null;
      }
      return {
        ...concourseFrame,
        routeIds: Array.isArray(concourseFrame.routeIds) ? concourseFrame.routeIds.slice() : [],
        stops: Array.isArray(concourseFrame.stops) ? concourseFrame.stops.map(entry => ({
          ...entry
        })) : [],
        passengerEvents: Array.isArray(concourseFrame.passengerEvents) ? concourseFrame.passengerEvents.slice() : []
      };
    }
    function cloneAndrewsRouteBoardPlatformFrame(platformFrame = null) {
      if (!platformFrame || typeof platformFrame !== "object") {
        return null;
      }
      return {
        ...platformFrame,
        recommendedRouteIds: Array.isArray(platformFrame.recommendedRouteIds) ? platformFrame.recommendedRouteIds.slice() : [],
        tracks: Array.isArray(platformFrame.tracks) ? platformFrame.tracks.map(entry => ({
          ...entry,
          routeIds: Array.isArray(entry.routeIds) ? entry.routeIds.slice() : []
        })) : [],
        passengerEvents: Array.isArray(platformFrame.passengerEvents) ? platformFrame.passengerEvents.slice() : []
      };
    }
    function cloneAndrewsRouteBoardRideFrame(rideFrame = null) {
      if (!rideFrame || typeof rideFrame !== "object") {
        return null;
      }
      return {
        ...rideFrame,
        progressStops: Array.isArray(rideFrame.progressStops) ? rideFrame.progressStops.map(entry => ({
          ...entry
        })) : [],
        decisionLoad: rideFrame.decisionLoad && typeof rideFrame.decisionLoad === "object" ? {
          ...rideFrame.decisionLoad
        } : null,
        passengerEvents: Array.isArray(rideFrame.passengerEvents) ? rideFrame.passengerEvents.slice() : []
      };
    }
    function buildAndrewsRouteBoardJourneyRideFrame({
      board = null,
      stationLineFrame = null,
      sourceKey = "",
      sourceLabel = "",
      destinationKey = "",
      destinationLabel = "",
      routePathLabel = "",
      routeActionFrame = null
    } = {}) {
      const boardRideFrame = cloneAndrewsRouteBoardRideFrame(board?.rideFrame);
      const stops = Array.isArray(stationLineFrame?.stops) ? stationLineFrame.stops.map((entry, index) => ({
        id: entry?.id || "",
        block: entry?.block || "",
        label: entry?.label || entry?.block || entry?.id || "",
        role: entry?.role || "",
        status: entry?.status || "",
        stationKey: entry?.stationKey || "",
        displayLabel: entry?.displayLabel || "",
        active: Boolean(entry?.id && entry.id === stationLineFrame.activeStopId),
        index: index + 1
      })) : Array.isArray(boardRideFrame?.progressStops) ? boardRideFrame.progressStops : [];
      const activeStopIndex = stops.find(entry => entry.active)?.index || Number(boardRideFrame?.activeStopIndex || 0);
      const passengerEvents = Array.from(new Set([...(Array.isArray(boardRideFrame?.passengerEvents) ? boardRideFrame.passengerEvents : []), "carry-ride-frame-to-output"]));
      return {
        kind: "andrews-output-journey-ride-frame",
        version: 1,
        experienceModel: boardRideFrame?.experienceModel || "passenger-rides-station-provides",
        outputJourneyModel: "formula-and-surface-share-one-ride-frame",
        operatingPrinciple: boardRideFrame?.operatingPrinciple || "station-signs-do-switching-passenger-rides",
        choiceModel: boardRideFrame?.choiceModel || "explore-or-destination-one-board",
        currentIntention: boardRideFrame?.currentIntention || (board?.boardState === "destination" ? "destination" : "explore"),
        sourceKey: sourceKey || boardRideFrame?.sourceKey || "",
        sourceLabel: sourceLabel || boardRideFrame?.sourceLabel || "",
        destinationKey: destinationKey || boardRideFrame?.destinationKey || "",
        destinationLabel: destinationLabel || boardRideFrame?.destinationSignLabel || "",
        currentSignLabel: sourceLabel || boardRideFrame?.currentSignLabel || "",
        nextSignLabel: destinationLabel || boardRideFrame?.nextSignLabel || "",
        destinationSignLabel: destinationLabel || boardRideFrame?.destinationSignLabel || "",
        primaryActionLabel: routeActionFrame?.actionLabel || boardRideFrame?.primaryActionLabel || "",
        primaryRoutePathLabel: routePathLabel || boardRideFrame?.primaryRoutePathLabel || "",
        activeStopId: stationLineFrame?.activeStopId || boardRideFrame?.activeStopId || "",
        activeStopIndex,
        progressStopCount: stops.length || Number(boardRideFrame?.progressStopCount || 0),
        progressStops: stops,
        routeOptionCount: Number(board?.visibleRoutes?.length || boardRideFrame?.routeOptionCount || 0),
        destinationOptionCount: Number(board?.destinationOptions?.length || boardRideFrame?.destinationOptionCount || 0),
        visibleTrackCount: Number(board?.platformFrame?.visibleTrackCount || boardRideFrame?.visibleTrackCount || 0),
        decisionLoad: {
          ...(boardRideFrame?.decisionLoad && typeof boardRideFrame.decisionLoad === "object" ? boardRideFrame.decisionLoad : {}),
          primaryClickCount: routePathLabel ? 1 : 0,
          switchingRequired: false
        },
        passengerEvents
      };
    }
    function getAndrewsRouteBoardActionMode(targetAction = null) {
      const mode = String(targetAction?.unitMode || "").trim();
      if (typeof targetObject.TENSE_MODE !== "undefined") {
        if (mode === "sustantivo" && targetObject.TENSE_MODE.sustantivo) {
          return targetObject.TENSE_MODE.sustantivo;
        }
        if (mode === "verbo" && targetObject.TENSE_MODE.verbo) {
          return targetObject.TENSE_MODE.verbo;
        }
      }
      return mode;
    }
    function restoreAndrewsRouteBoardInputIfBlank(inputValue = "") {
      const value = String(inputValue || "").trim();
      const verbEl = targetObject.document.getElementById("verb");
      const currentValue = normalizeAndrewsRouteBoardInputValue(verbEl?.value || "");
      if (!value || !verbEl || currentValue) {
        return false;
      }
      verbEl.value = value;
      verbEl.dataset.prevValue = value;
      if (typeof renderVerbMirror === "function") {
        renderVerbMirror();
      }
      return true;
    }
    function buildAndrewsRouteBoardJourneyStationLineFrame({
      board = null,
      sourceKey = "",
      sourceLabel = "",
      destinationKey = "",
      destinationLabel = "",
      routeIds = [],
      actionLabel = ""
    } = {}) {
      const boardLine = board?.stationLineFrame && typeof board.stationLineFrame === "object" ? board.stationLineFrame : board?.passengerFrame?.stationLineFrame && typeof board.passengerFrame.stationLineFrame === "object" ? board.passengerFrame.stationLineFrame : null;
      const sourceStop = {
        id: "entrada",
        block: "#1 Entrada",
        label: "Entrada",
        role: "source-input",
        status: "positioned",
        stationKey: sourceKey,
        displayLabel: sourceLabel
      };
      const formulaStop = {
        id: "formula",
        block: "#2 Fórmula",
        label: "Formula",
        role: "route-board",
        status: "positioned",
        stationKey: sourceKey,
        displayLabel: sourceLabel
      };
      const outputStop = {
        id: "salida",
        block: "#3 Salida",
        label: "Salida",
        role: "output",
        status: "destination-set",
        stationKey: destinationKey,
        displayLabel: destinationLabel
      };
      const stops = Array.isArray(boardLine?.stops) && boardLine.stops.length ? boardLine.stops.map(entry => {
        if (entry.id === "salida") {
          return {
            ...outputStop,
            ...entry,
            ...outputStop
          };
        }
        if (entry.id === "formula") {
          return {
            ...formulaStop,
            ...entry,
            status: "positioned",
            stationKey: sourceKey,
            displayLabel: sourceLabel
          };
        }
        if (entry.id === "entrada") {
          return {
            ...sourceStop,
            ...entry,
            status: entry.status === "open" ? "open" : "received",
            stationKey: sourceKey,
            displayLabel: entry.displayLabel || sourceLabel
          };
        }
        return {
          ...entry
        };
      }) : [sourceStop, formulaStop, outputStop];
      return {
        kind: "andrews-output-journey-station-line-frame",
        version: 1,
        lineModel: boardLine?.lineModel || "entrada-formula-salida-one-route",
        intentMode: "destination",
        activeStopId: "salida",
        sourceKey,
        sourceLabel,
        destinationKey,
        destinationLabel,
        routeKey: [sourceKey, destinationKey].filter(Boolean).join(">"),
        primaryActionLabel: actionLabel,
        primaryRouteIds: Array.isArray(routeIds) ? routeIds.slice() : [],
        stops,
        passengerEvents: [...(Array.isArray(boardLine?.passengerEvents) ? boardLine.passengerEvents : []), "carry-station-line-to-output", "mark-output-arrival"]
      };
    }
    function buildAndrewsRouteBoardJourneySourceLayerFrame({
      board = null,
      sourceKey = "",
      sourceLabel = ""
    } = {}) {
      const candidateStages = Array.isArray(board?.sourceCandidateStages) ? board.sourceCandidateStages : [];
      if (!candidateStages.length) {
        return null;
      }
      const layers = candidateStages.map((entry, index) => {
        const key = entry?.key || "";
        return {
          index: index + 1,
          key,
          label: entry?.label || key || "",
          sourceRole: entry?.sourceRole || "",
          formulaType: entry?.formulaType || "",
          formulaPosition: entry?.formulaPosition || "",
          stemRank: entry?.stemRank || "",
          active: Boolean(sourceKey && key === sourceKey)
        };
      });
      const activeLayer = layers.find(entry => entry.active) || null;
      if (!activeLayer && sourceKey) {
        layers.push({
          index: layers.length + 1,
          key: sourceKey,
          label: sourceLabel || sourceKey,
          sourceRole: "route-source",
          formulaType: "",
          formulaPosition: "",
          stemRank: "",
          active: true
        });
      }
      const resolvedActiveLayer = layers.find(entry => entry.active) || layers[0] || null;
      return {
        kind: "andrews-output-journey-source-layer-frame",
        version: 1,
        layerModel: "formula-source-layers-to-output",
        sourceKey,
        sourceLabel,
        activeSourceKey: resolvedActiveLayer?.key || sourceKey || "",
        activeSourceLabel: resolvedActiveLayer?.label || sourceLabel || "",
        activeSourceRole: resolvedActiveLayer?.sourceRole || "",
        sourceLayerCount: layers.length,
        layers,
        passengerEvents: ["carry-source-layers-to-output", "surface-receives-source-layer"]
      };
    }
    function buildAndrewsRouteBoardJourneyReceipt(entry = null, board = null) {
      if (!entry || !board) {
        return null;
      }
      const route = Array.isArray(entry.routes) ? entry.routes[0] : entry;
      const lastRoute = Array.isArray(entry.routes) && entry.routes.length ? entry.routes[entry.routes.length - 1] : route;
      const routeTicket = entry.routeTicket || route?.routeTicket || null;
      const routeIds = Array.isArray(entry.routeIds) ? entry.routeIds : [entry.routeId || ""].filter(Boolean);
      const routeStops = getAndrewsRouteBoardRouteStops(entry, route, routeTicket);
      const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry) || routeTicket?.routePathLabel || routeStops.map(stop => stop.label || stop.key).filter(Boolean).join(" > ");
      const routeConditionFrames = getAndrewsRouteBoardRouteConditionFrames(entry, route, routeTicket);
      const sourceKey = entry.sourceStageKey || route?.sourceStageKey || routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || routeStops[0]?.key || board.currentStation?.key || "";
      const sourceLabel = entry.sourceLabel || route?.sourceLabel || routeConditionFrames[0]?.ifStage?.label || routeStops[0]?.label || board.currentStation?.label || "";
      const destinationKey = board.destinationStation?.key || entry.targetAction?.targetStageKey || lastRoute?.targetAction?.targetStageKey || entry.targetStageKey || lastRoute?.targetStageKey || "";
      const destinationLabel = board.destinationStation?.label || entry.targetLabel || lastRoute?.targetLabel || "";
      if (!sourceKey || !destinationKey || !routeIds.length) {
        return null;
      }
      const segmentCount = Number(entry.segmentCount || route?.segmentCount || routeTicket?.segmentCount || 1);
      const resistanceScore = Number(entry.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || 0);
      const hiddenCoordinateCount = Number(entry.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0);
      const obstacleCount = Number(entry.obstacleCount || route?.obstacleCount || routeTicket?.obstacleCount || 0);
      const routeKey = routeIds.join("|");
      const leastVisibleRouteKey = Array.isArray(board.leastVisibleRoute?.routeIds) ? board.leastVisibleRoute.routeIds.join("|") : "";
      const mostVisibleRouteKey = Array.isArray(board.mostVisibleRoute?.routeIds) ? board.mostVisibleRoute.routeIds.join("|") : "";
      const resistanceRole = routeKey && routeKey === leastVisibleRouteKey ? "least" : routeKey && routeKey === mostVisibleRouteKey ? "most" : "";
      const targetAction = entry.targetAction || lastRoute?.targetAction || route?.targetAction || null;
      const nextSourceStage = entry.nextSourceStage || entry.routeTicket?.nextSourceStage || lastRoute?.nextSourceStage || lastRoute?.routeTicket?.nextSourceStage || board.destinationStation || entry.targetStage || lastRoute?.targetStage || route?.targetStage || null;
      const routeActionFrame = entry.routeActionFrame && typeof entry.routeActionFrame === "object" ? entry.routeActionFrame : lastRoute?.routeActionFrame && typeof lastRoute.routeActionFrame === "object" ? lastRoute.routeActionFrame : route?.routeActionFrame && typeof route.routeActionFrame === "object" ? route.routeActionFrame : null;
      const boardPassengerFrame = board.passengerFrame && typeof board.passengerFrame === "object" ? board.passengerFrame : {};
      const passengerEvents = Array.from(new Set([...(Array.isArray(boardPassengerFrame.passengerEvents) ? boardPassengerFrame.passengerEvents : []), "carry-route-frame-to-output", "carry-route-conditions-to-output", "surface-receives-next-source", "carry-station-line-to-output", "carry-concourse-to-output", "carry-platform-to-output", "carry-ride-frame-to-output", "carry-source-layers-to-output"]));
      const journeyStationLineFrame = buildAndrewsRouteBoardJourneyStationLineFrame({
        board,
        sourceKey,
        sourceLabel,
        destinationKey,
        destinationLabel,
        routeIds,
        actionLabel: routeActionFrame?.actionLabel || ""
      });
      const journeyPassengerFrame = {
        kind: "andrews-output-journey-passenger-frame",
        version: 1,
        routeBoardModel: boardPassengerFrame.routeBoardModel || "one-passenger-intention-many-routes",
        journeyModel: "formula-and-surface-share-one-passenger-frame",
        stationLineFrame: journeyStationLineFrame,
        intentionFrame: cloneAndrewsRouteBoardIntentionFrame(boardPassengerFrame.intentionFrame),
        currentIntention: boardPassengerFrame.currentIntention || (board.boardState === "destination" ? "destination" : "explore"),
        sourceKey,
        sourceLabel,
        destinationKey,
        destinationLabel,
        routePathLabel,
        primaryRoutePathLabel: routePathLabel,
        primaryActionLabel: routeActionFrame?.actionLabel || boardPassengerFrame.primaryActionLabel || "Siguiente",
        primaryRecommendationRole: routeActionFrame?.recommendationRole || boardPassengerFrame.primaryRecommendationRole || "",
        primaryRouteIds: routeIds.slice(),
        primaryNextSourceStageKey: destinationKey,
        primaryNextSourceLabel: destinationLabel,
        visibleRouteCount: Number(boardPassengerFrame.visibleRouteCount || board.visibleRoutes?.length || 0),
        destinationOptionCount: Number(boardPassengerFrame.destinationOptionCount || board.destinationOptions?.length || 0),
        exploreOptionCount: Number(boardPassengerFrame.exploreOptionCount || 0),
        nextOptionCount: Number(boardPassengerFrame.nextOptionCount || 0),
        arrivalOptionCount: Number(boardPassengerFrame.arrivalOptionCount || 0),
        handoffActionLabel: targetAction?.label || "",
        handoffEntryBoard: targetAction?.entryBoard || "",
        handoffUnitMode: targetAction?.unitMode || "",
        passengerEvents
      };
      const journeyConcourseFrame = cloneAndrewsRouteBoardConcourseFrame(board.concourseFrame);
      const journeyPlatformFrame = cloneAndrewsRouteBoardPlatformFrame(board.platformFrame);
      const journeyRideFrame = buildAndrewsRouteBoardJourneyRideFrame({
        board,
        stationLineFrame: journeyStationLineFrame,
        sourceKey,
        sourceLabel,
        destinationKey,
        destinationLabel,
        routePathLabel,
        routeActionFrame
      });
      const journeySourceLayerFrame = buildAndrewsRouteBoardJourneySourceLayerFrame({
        board,
        sourceKey,
        sourceLabel
      });
      return {
        sourceKey,
        sourceLabel,
        destinationKey,
        destinationLabel,
        routePathLabel,
        nextSourceKey: destinationKey,
        nextSourceLabel: destinationLabel,
        nextSourceStage: nextSourceStage && typeof nextSourceStage === "object" ? {
          formulaType: nextSourceStage.formulaType || "",
          formulaPosition: nextSourceStage.formulaPosition || "",
          stemRank: nextSourceStage.stemRank || "",
          inputKind: "route-arrival",
          inputScope: "next-source",
          formulaBoundaryKind: "route-arrival",
          formulaBoundaryConfidence: "positioned"
        } : null,
        routeIds,
        routeStops,
        routeConditionFrames,
        routeConditionLabel: entry.routeConditionLabel || route?.routeConditionLabel || routeTicket?.routeConditionLabel || "",
        routeLabel: entry.routeLabel || route?.routeLabel || "",
        routeTicketLabel: entry.routeTicketLabel || route?.routeTicketLabel || routeTicket?.label || "",
        gateDomainCounts: getAndrewsRouteBoardGateDomainCounts(entry, route, routeTicket),
        segmentCount,
        transferCount: Number(entry.transferCount || route?.transferCount || routeTicket?.transferCount || 0),
        tripKind: entry.tripKind || route?.tripKind || routeTicket?.tripKind || "",
        hiddenCoordinateCount,
        resistanceScore,
        obstacleCount,
        resistanceRank: Number(entry.resistanceRank || route?.resistanceRank || routeTicket?.resistanceRank || 0),
        standardScoreLabel: entry.standardScoreLabel || route?.standardScoreLabel || routeTicket?.standardScoreLabel || "",
        resistanceRole,
        resistanceRoleLabel: getAndrewsRouteBoardResistanceRoleLabel(resistanceRole),
        targetAction,
        targetActionLabel: targetAction?.label || "",
        nextSourceEntryBoard: targetAction?.entryBoard || "",
        nextSourceUnitMode: targetAction?.unitMode || "",
        routeActionFrame: routeActionFrame ? {
          ...routeActionFrame
        } : null,
        stationLineFrame: journeyStationLineFrame,
        passengerFrame: journeyPassengerFrame,
        concourseFrame: journeyConcourseFrame,
        platformFrame: journeyPlatformFrame,
        rideFrame: journeyRideFrame,
        sourceLayerFrame: journeySourceLayerFrame
      };
    }
    function pinAndrewsRouteBoardJourneySource(board = null, inputValue = "") {
      if (!board?.currentStation) {
        return false;
      }
      AndrewsRouteBoardPinnedSourceInput = String(inputValue || AndrewsRouteBoardPinnedSourceInput || "").trim();
      AndrewsRouteBoardPinnedSourceStage = {
        formulaType: board.currentStation.formulaType || "",
        formulaPosition: board.currentStation.formulaPosition || "",
        stemRank: board.currentStation.stemRank || "",
        inputKind: board.currentStation.inputKind || "",
        inputScope: board.currentStation.inputScope || "",
        inputTicketFrame: board.currentStation.inputTicketFrame && typeof board.currentStation.inputTicketFrame === "object" ? {
          ...board.currentStation.inputTicketFrame,
          unresolvedDimensions: Array.isArray(board.currentStation.inputTicketFrame.unresolvedDimensions) ? board.currentStation.inputTicketFrame.unresolvedDimensions.slice() : [],
          dimensionOrder: Array.isArray(board.currentStation.inputTicketFrame.dimensionOrder) ? board.currentStation.inputTicketFrame.dimensionOrder.slice() : [],
          dimensionSlots: Array.isArray(board.currentStation.inputTicketFrame.dimensionSlots) ? board.currentStation.inputTicketFrame.dimensionSlots.map(entry => ({
            ...entry
          })) : [],
          passengerEvents: Array.isArray(board.currentStation.inputTicketFrame.passengerEvents) ? board.currentStation.inputTicketFrame.passengerEvents.slice() : []
        } : null
      };
      return true;
    }
    function setAndrewsRouteBoardActiveJourney(entry = null, board = null) {
      const receipt = buildAndrewsRouteBoardJourneyReceipt(entry, board);
      AndrewsRouteBoardActiveJourney = receipt;
      return receipt;
    }
    function getAndrewsRouteBoardActiveJourneyForBoard(board = null) {
      const journey = AndrewsRouteBoardActiveJourney;
      if (!journey || !board || board.boardState !== "destination") {
        return null;
      }
      const currentSourceKeys = new Set([board.currentStation?.key || "", ...(Array.isArray(board.sourceCandidateStageKeys) ? board.sourceCandidateStageKeys : [])].filter(Boolean));
      if (!currentSourceKeys.has(journey.sourceKey)) {
        return null;
      }
      if (journey.destinationKey !== (board.destinationStation?.key || "")) {
        return null;
      }
      return journey;
    }
    function getAndrewsRouteBoardActiveJourneyReceipt() {
      const journey = AndrewsRouteBoardActiveJourney;
      if (!journey) {
        return null;
      }
      return {
        ...journey,
        targetAction: journey.targetAction && typeof journey.targetAction === "object" ? {
          ...journey.targetAction
        } : null,
        nextSourceStage: journey.nextSourceStage && typeof journey.nextSourceStage === "object" ? {
          ...journey.nextSourceStage
        } : null,
        routeActionFrame: journey.routeActionFrame && typeof journey.routeActionFrame === "object" ? {
          ...journey.routeActionFrame,
          routeIds: Array.isArray(journey.routeActionFrame.routeIds) ? journey.routeActionFrame.routeIds.slice() : []
        } : null,
        passengerFrame: journey.passengerFrame && typeof journey.passengerFrame === "object" ? {
          ...journey.passengerFrame,
          intentionFrame: cloneAndrewsRouteBoardIntentionFrame(journey.passengerFrame.intentionFrame),
          primaryRouteIds: Array.isArray(journey.passengerFrame.primaryRouteIds) ? journey.passengerFrame.primaryRouteIds.slice() : [],
          passengerEvents: Array.isArray(journey.passengerFrame.passengerEvents) ? journey.passengerFrame.passengerEvents.slice() : [],
          stationLineFrame: journey.passengerFrame.stationLineFrame && typeof journey.passengerFrame.stationLineFrame === "object" ? {
            ...journey.passengerFrame.stationLineFrame,
            primaryRouteIds: Array.isArray(journey.passengerFrame.stationLineFrame.primaryRouteIds) ? journey.passengerFrame.stationLineFrame.primaryRouteIds.slice() : [],
            passengerEvents: Array.isArray(journey.passengerFrame.stationLineFrame.passengerEvents) ? journey.passengerFrame.stationLineFrame.passengerEvents.slice() : [],
            stops: Array.isArray(journey.passengerFrame.stationLineFrame.stops) ? journey.passengerFrame.stationLineFrame.stops.map(entry => ({
              ...entry
            })) : []
          } : null
        } : null,
        stationLineFrame: journey.stationLineFrame && typeof journey.stationLineFrame === "object" ? {
          ...journey.stationLineFrame,
          primaryRouteIds: Array.isArray(journey.stationLineFrame.primaryRouteIds) ? journey.stationLineFrame.primaryRouteIds.slice() : [],
          passengerEvents: Array.isArray(journey.stationLineFrame.passengerEvents) ? journey.stationLineFrame.passengerEvents.slice() : [],
          stops: Array.isArray(journey.stationLineFrame.stops) ? journey.stationLineFrame.stops.map(entry => ({
            ...entry
          })) : []
        } : null,
        concourseFrame: cloneAndrewsRouteBoardConcourseFrame(journey.concourseFrame),
        platformFrame: cloneAndrewsRouteBoardPlatformFrame(journey.platformFrame),
        rideFrame: cloneAndrewsRouteBoardRideFrame(journey.rideFrame),
        sourceLayerFrame: cloneAndrewsRouteBoardSourceLayerFrame(journey.sourceLayerFrame),
        journeyHistory: getAndrewsRouteBoardJourneyHistoryReceipt(),
        routeIds: Array.isArray(journey.routeIds) ? journey.routeIds.slice() : [],
        routeStops: Array.isArray(journey.routeStops) ? journey.routeStops.map(stop => ({
          ...stop
        })) : [],
        routeConditionFrames: cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames),
        gateDomainCounts: Array.isArray(journey.gateDomainCounts) ? journey.gateDomainCounts.map(item => ({
          ...item
        })) : []
      };
    }
    function cloneAndrewsRouteBoardJourneyForHistory(journey = null, sequence = 0) {
      if (!journey || typeof journey !== "object") {
        return null;
      }
      return {
        ...journey,
        journeySequence: Number(sequence || journey.journeySequence || 0),
        targetAction: journey.targetAction && typeof journey.targetAction === "object" ? {
          ...journey.targetAction
        } : null,
        nextSourceStage: journey.nextSourceStage && typeof journey.nextSourceStage === "object" ? {
          ...journey.nextSourceStage
        } : null,
        routeActionFrame: journey.routeActionFrame && typeof journey.routeActionFrame === "object" ? {
          ...journey.routeActionFrame,
          routeIds: Array.isArray(journey.routeActionFrame.routeIds) ? journey.routeActionFrame.routeIds.slice() : []
        } : null,
        passengerFrame: journey.passengerFrame && typeof journey.passengerFrame === "object" ? {
          ...journey.passengerFrame,
          intentionFrame: cloneAndrewsRouteBoardIntentionFrame(journey.passengerFrame.intentionFrame),
          primaryRouteIds: Array.isArray(journey.passengerFrame.primaryRouteIds) ? journey.passengerFrame.primaryRouteIds.slice() : [],
          passengerEvents: Array.isArray(journey.passengerFrame.passengerEvents) ? journey.passengerFrame.passengerEvents.slice() : []
        } : null,
        stationLineFrame: journey.stationLineFrame && typeof journey.stationLineFrame === "object" ? {
          ...journey.stationLineFrame,
          primaryRouteIds: Array.isArray(journey.stationLineFrame.primaryRouteIds) ? journey.stationLineFrame.primaryRouteIds.slice() : [],
          passengerEvents: Array.isArray(journey.stationLineFrame.passengerEvents) ? journey.stationLineFrame.passengerEvents.slice() : [],
          stops: Array.isArray(journey.stationLineFrame.stops) ? journey.stationLineFrame.stops.map(entry => ({
            ...entry
          })) : []
        } : null,
        concourseFrame: cloneAndrewsRouteBoardConcourseFrame(journey.concourseFrame),
        platformFrame: cloneAndrewsRouteBoardPlatformFrame(journey.platformFrame),
        rideFrame: cloneAndrewsRouteBoardRideFrame(journey.rideFrame),
        sourceLayerFrame: cloneAndrewsRouteBoardSourceLayerFrame(journey.sourceLayerFrame),
        routeIds: Array.isArray(journey.routeIds) ? journey.routeIds.slice() : [],
        routeStops: Array.isArray(journey.routeStops) ? journey.routeStops.map(stop => ({
          ...stop
        })) : [],
        routeConditionFrames: cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames),
        gateDomainCounts: Array.isArray(journey.gateDomainCounts) ? journey.gateDomainCounts.map(item => ({
          ...item
        })) : []
      };
    }
    function getAndrewsRouteBoardJourneyHistoryForBoard(board = null) {
      const history = Array.isArray(AndrewsRouteBoardJourneyHistory) ? AndrewsRouteBoardJourneyHistory : [];
      if (!board || !AndrewsRouteBoardSourceOverrideStage || !history.length) {
        return [];
      }
      const last = history[history.length - 1];
      if ((last?.destinationKey || "") !== (board.currentStation?.key || "")) {
        return [];
      }
      return history.map((journey, index) => cloneAndrewsRouteBoardJourneyForHistory(journey, index + 1)).filter(Boolean);
    }
    function getAndrewsRouteBoardJourneyHistoryReceipt() {
      const history = Array.isArray(AndrewsRouteBoardJourneyHistory) ? AndrewsRouteBoardJourneyHistory : [];
      return history.map((journey, index) => cloneAndrewsRouteBoardJourneyForHistory(journey, index + 1)).filter(Boolean);
    }
    function getAndrewsRouteBoardContinuedJourneyForBoard(board = null) {
      const journey = AndrewsRouteBoardContinuedJourney;
      if (!journey || !board || !AndrewsRouteBoardSourceOverrideStage) {
        return null;
      }
      if (journey.destinationKey !== (board.currentStation?.key || "")) {
        return null;
      }
      return journey;
    }
    function getAndrewsRouteBoardContinuedJourneyReceipt() {
      const journey = AndrewsRouteBoardContinuedJourney;
      if (!journey || !AndrewsRouteBoardSourceOverrideStage) {
        return null;
      }
      const continuedJourney = cloneAndrewsRouteBoardJourneyForHistory(journey, journey.journeySequence || AndrewsRouteBoardJourneyHistory.length || 1);
      if (!continuedJourney) {
        return null;
      }
      return {
        ...continuedJourney,
        outputJourneyState: "continued-as-next-source",
        nextSourceStage: null,
        nextSourceEntryBoard: "",
        nextSourceUnitMode: "",
        journeyHistory: getAndrewsRouteBoardJourneyHistoryReceipt(),
        passengerFrame: continuedJourney.passengerFrame && typeof continuedJourney.passengerFrame === "object" ? {
          ...continuedJourney.passengerFrame,
          passengerEvents: Array.from(new Set([...(Array.isArray(continuedJourney.passengerFrame.passengerEvents) ? continuedJourney.passengerFrame.passengerEvents : []), "keep-arrival-visible-after-transfer", "suppress-repeat-next-source-action"]))
        } : null
      };
    }
    function continueAndrewsRouteBoardFromActiveJourney() {
      const journey = getAndrewsRouteBoardActiveJourneyReceipt();
      if (!journey?.nextSourceStage) {
        return false;
      }
      AndrewsRouteBoardSourceOverrideStage = {
        ...journey.nextSourceStage
      };
      const nextSequence = AndrewsRouteBoardJourneyHistory.length + 1;
      const continuedJourney = cloneAndrewsRouteBoardJourneyForHistory(journey, nextSequence);
      AndrewsRouteBoardJourneyHistory = [...AndrewsRouteBoardJourneyHistory, continuedJourney].filter(Boolean).slice(-7);
      AndrewsRouteBoardContinuedJourney = {
        ...continuedJourney,
        continuationState: "continued-as-next-source",
        continuationSourceKey: continuedJourney?.sourceKey || "",
        continuationDestinationKey: continuedJourney?.destinationKey || ""
      };
      AndrewsRouteBoardDestinationKey = "";
      AndrewsRouteBoardPinnedSourceInput = "";
      AndrewsRouteBoardPinnedSourceStage = null;
      AndrewsRouteBoardActiveJourney = null;
      const targetAction = journey.targetAction || null;
      const targetMode = getAndrewsRouteBoardActionMode(targetAction);
      if (targetAction?.entryBoard === "ordinary-nnc") {
        if (typeof targetObject.setOrdinaryNncGenerationModeEnabled === "function") {
          targetObject.setOrdinaryNncGenerationModeEnabled(true);
        }
      } else if (typeof targetObject.setOrdinaryNncGenerationModeEnabled === "function") {
        targetObject.setOrdinaryNncGenerationModeEnabled(false);
      }
      if (targetMode && typeof targetObject.setActiveNawatTenseMode === "function") {
        targetObject.setActiveNawatTenseMode(targetMode);
      } else if (targetMode && typeof targetObject.setActiveTenseMode === "function") {
        targetObject.setActiveTenseMode(targetMode, {
          modeSystem: typeof targetObject.TENSE_MODE_SYSTEM !== "undefined" ? targetObject.TENSE_MODE_SYSTEM.nawat || targetObject.TENSE_MODE_SYSTEM.unit || "nawat" : "nawat"
        });
      }
      if (typeof targetObject.setComposerEntryBoard === "function" && typeof targetObject.COMPOSER_ENTRY_BOARD !== "undefined") {
        const targetBoard = targetAction?.entryBoard === "noun-to-verb" ? targetObject.COMPOSER_ENTRY_BOARD.nounToVerb || "noun-to-verb" : targetObject.COMPOSER_ENTRY_BOARD.general || "general";
        targetObject.setComposerEntryBoard(targetBoard, {
          force: true
        });
      }
      if (typeof targetObject.updateTenseModeTabs === "function") {
        targetObject.updateTenseModeTabs();
      }
      if (typeof renderTenseTabs === "function") {
        renderTenseTabs();
      } else {
        renderAndrewsRouteBoard();
      }
      if (typeof targetObject.renderOutputJourneyStrip === "function") {
        targetObject.renderOutputJourneyStrip();
      }
      if (typeof targetObject.dispatchAppEvent === "function") {
        targetObject.dispatchAppEvent("nawat:andrews-route-board-next-source-continued", {
          nextSourceStage: AndrewsRouteBoardSourceOverrideStage,
          targetAction,
          journey
        });
      }
      return true;
    }
    function activateAndrewsRouteBoardTarget(entry = null, board = null) {
      const inputBeforeActivation = getAndrewsRouteBoardRawInput();
      const targetAction = entry?.targetAction || entry?.routes?.[entry.routes.length - 1]?.targetAction || null;
      const destinationKey = targetAction?.targetStageKey || entry?.targetStageKey || entry?.routes?.[entry.routes.length - 1]?.targetStageKey || "";
      if (destinationKey) {
        AndrewsRouteBoardDestinationKey = destinationKey;
        pinAndrewsRouteBoardJourneySource(board, inputBeforeActivation);
        setAndrewsRouteBoardActiveJourney(entry, board);
      }
      const targetMode = getAndrewsRouteBoardActionMode(targetAction);
      if (targetAction?.entryBoard === "ordinary-nnc") {
        if (typeof targetObject.setOrdinaryNncGenerationModeEnabled === "function") {
          targetObject.setOrdinaryNncGenerationModeEnabled(true);
        }
        if (targetMode && typeof targetObject.setActiveNawatTenseMode === "function") {
          targetObject.setActiveNawatTenseMode(targetMode);
        } else if (targetMode && typeof targetObject.setActiveTenseMode === "function") {
          targetObject.setActiveTenseMode(targetMode, {
            modeSystem: typeof targetObject.TENSE_MODE_SYSTEM !== "undefined" ? targetObject.TENSE_MODE_SYSTEM.nawat || targetObject.TENSE_MODE_SYSTEM.unit || "nawat" : "nawat"
          });
        }
        if (typeof targetObject.setComposerEntryBoard === "function" && typeof targetObject.COMPOSER_ENTRY_BOARD !== "undefined") {
          targetObject.setComposerEntryBoard(targetObject.COMPOSER_ENTRY_BOARD.general || "general", {
            force: true
          });
        }
      } else {
        if (typeof targetObject.setOrdinaryNncGenerationModeEnabled === "function") {
          targetObject.setOrdinaryNncGenerationModeEnabled(false);
        }
        if (targetMode && typeof targetObject.setActiveNawatTenseMode === "function") {
          targetObject.setActiveNawatTenseMode(targetMode);
        } else if (targetMode && typeof targetObject.setActiveTenseMode === "function") {
          targetObject.setActiveTenseMode(targetMode, {
            modeSystem: typeof targetObject.TENSE_MODE_SYSTEM !== "undefined" ? targetObject.TENSE_MODE_SYSTEM.nawat || targetObject.TENSE_MODE_SYSTEM.unit || "nawat" : "nawat"
          });
        }
        if (typeof targetObject.setComposerEntryBoard === "function" && typeof targetObject.COMPOSER_ENTRY_BOARD !== "undefined") {
          const targetBoard = targetAction?.entryBoard === "noun-to-verb" ? targetObject.COMPOSER_ENTRY_BOARD.nounToVerb || "noun-to-verb" : targetObject.COMPOSER_ENTRY_BOARD.general || "general";
          targetObject.setComposerEntryBoard(targetBoard, {
            force: true
          });
        }
      }
      if (typeof targetObject.updateTenseModeTabs === "function") {
        targetObject.updateTenseModeTabs();
      }
      if (typeof renderTenseTabs === "function") {
        renderTenseTabs();
      } else {
        renderAndrewsRouteBoard();
      }
      restoreAndrewsRouteBoardInputIfBlank(AndrewsRouteBoardPinnedSourceInput || inputBeforeActivation);
      if (typeof targetObject.renderActiveConjugations === "function" && typeof targetObject.getVerbInputMeta === "function") {
        const verbMeta = targetObject.getVerbInputMeta();
        targetObject.renderActiveConjugations({
          verb: verbMeta.displayVerb,
          objectPrefix: typeof targetObject.getCurrentObjectPrefix === "function" ? targetObject.getCurrentObjectPrefix() : ""
        });
      }
      if (typeof targetObject.dispatchAppEvent === "function") {
        targetObject.dispatchAppEvent("nawat:andrews-route-board-target-activated", {
          routeIds: Array.isArray(entry?.routeIds) ? entry.routeIds : [entry?.routeId || ""].filter(Boolean),
          boardState: board?.boardState || "",
          destinationKey,
          targetAction,
          journey: AndrewsRouteBoardActiveJourney
        });
      }
    }
    function buildAndrewsRouteBoardRouteMeta(entry = null, route = null, routeTicket = null) {
      const segmentCount = Number(entry?.segmentCount || route?.segmentCount || routeTicket?.segmentCount || 1);
      const hiddenCoordinateCount = Number(entry?.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0);
      const resistanceScore = Number(entry?.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || 0);
      const tripKind = entry?.tripKind || route?.tripKind || routeTicket?.tripKind || "";
      return [resistanceScore ? `R${resistanceScore}` : "", segmentCount === 1 ? "1 tramo" : `${segmentCount} tramos`, hiddenCoordinateCount ? `${hiddenCoordinateCount} coords` : "", tripKind === "transfer" ? "trasbordo" : ""].filter(Boolean).join(" · ");
    }
    function getAndrewsRouteBoardRouteDestinationKey(entry = null, route = null) {
      return entry?.targetAction?.targetStageKey || route?.targetAction?.targetStageKey || route?.targetStageKey || entry?.targetStageKey || entry?.nextSourceStageKey || entry?.routeTicket?.nextSourceStageKey || "";
    }
    function getAndrewsRouteBoardLoopStateLabel(loopState = "", loopCount = 0) {
      const count = Number(loopCount || 0);
      const countLabel = count > 1 ? ` ${count}` : "";
      if (loopState === "same-station") {
        return `Circuito${countLabel}`;
      }
      if (loopState === "route-repeated") {
        return `Ruta repetida${countLabel}`;
      }
      if (loopState === "station-revisited") {
        return `Estacion vista${countLabel}`;
      }
      return "";
    }
    function getAndrewsRouteBoardRouteLoopCount(entry = null, route = null, board = null) {
      const destinationKey = getAndrewsRouteBoardRouteDestinationKey(entry, route);
      const routeIds = Array.isArray(entry?.routeIds) ? entry.routeIds : [entry?.routeId || route?.routeId || ""].filter(Boolean);
      const routeKey = routeIds.join("|");
      const history = getAndrewsRouteBoardJourneyHistoryForBoard(board);
      if (routeKey) {
        const routeVisitCount = history.filter(journey => (Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "") === routeKey).length;
        if (routeVisitCount) {
          return routeVisitCount + 1;
        }
      }
      if (destinationKey) {
        const stationVisitCount = history.filter(journey => journey.sourceKey === destinationKey || journey.destinationKey === destinationKey).length;
        if (stationVisitCount) {
          return stationVisitCount + 1;
        }
      }
      return 0;
    }
    function getAndrewsRouteBoardRouteLoopState(entry = null, route = null, board = null) {
      const sourceKey = board?.currentStation?.key || entry?.sourceStageKey || route?.sourceStageKey || "";
      const destinationKey = getAndrewsRouteBoardRouteDestinationKey(entry, route);
      const routeIds = Array.isArray(entry?.routeIds) ? entry.routeIds : [entry?.routeId || route?.routeId || ""].filter(Boolean);
      const routeKey = routeIds.join("|");
      const history = getAndrewsRouteBoardJourneyHistoryForBoard(board);
      if (sourceKey && destinationKey && sourceKey === destinationKey) {
        return "same-station";
      }
      if (routeKey && history.some(journey => (Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "") === routeKey)) {
        return "route-repeated";
      }
      if (destinationKey && history.some(journey => journey.sourceKey === destinationKey || journey.destinationKey === destinationKey)) {
        return "station-revisited";
      }
      return "";
    }
    function getAndrewsRouteBoardResistanceRoleLabel(role = "") {
      if (role === "least") {
        return "Menor R";
      }
      if (role === "most") {
        return "Mayor R";
      }
      return "";
    }
    function getAndrewsRouteBoardEntryRoutePathLabel(entry = null) {
      const stops = Array.isArray(entry?.routeStops) && entry.routeStops.length ? entry.routeStops : Array.isArray(entry?.routeTicket?.routeStops) ? entry.routeTicket.routeStops : [];
      const stopLabels = stops.map(stop => String(stop?.label || stop?.key || "").trim()).filter(Boolean);
      if (stopLabels.length >= 2) {
        return stopLabels.join(" > ");
      }
      const sourceLabel = String(entry?.sourceLabel || stops[0]?.label || "").trim();
      const destinationLabel = String(entry?.label || entry?.targetLabel || entry?.nextSourceLabel || entry?.routeTicket?.nextSourceLabel || "").trim();
      return [sourceLabel, destinationLabel].filter(Boolean).join(" > ");
    }
    function getAndrewsRouteBoardJourneyRoutePathLabel(journey = null) {
      const explicitPath = String(journey?.routePathLabel || journey?.routeTicket?.routePathLabel || "").trim();
      if (explicitPath) {
        return explicitPath;
      }
      const stops = Array.isArray(journey?.routeStops) ? journey.routeStops : [];
      const stopLabels = stops.map(stop => String(stop?.label || stop?.key || "").trim()).filter(Boolean);
      if (stopLabels.length >= 2) {
        return stopLabels.join(" > ");
      }
      return [journey?.sourceLabel || "", journey?.destinationLabel || ""].filter(Boolean).join(" > ");
    }
    function buildAndrewsRouteBoardDestinationOptionLabel(entry = null, {
      actionLabel = ""
    } = {}) {
      const label = String(entry?.label || "").trim();
      const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
      const segmentCount = Number(entry?.segmentCount || entry?.routeTicket?.segmentCount || 1);
      const resistanceScore = Number(entry?.resistanceScore || entry?.routeTicket?.resistanceScore || 0);
      const tripKind = entry?.tripKind || entry?.routeTicket?.tripKind || "";
      const meta = [resistanceScore ? `R${resistanceScore}` : "", segmentCount === 1 ? "1 tramo" : `${segmentCount} tramos`, tripKind === "transfer" ? "trasbordo" : ""].filter(Boolean).join(" · ");
      return [actionLabel, routePathLabel || label, meta].filter(Boolean).join(" · ");
    }
    function buildAndrewsRouteBoardNetworkLabel(board = null) {
      const routeCount = Number(board?.routeCount || 0);
      const hiddenCoordinateCount = Number(board?.hiddenCoordinateCount || 0);
      const averageClicks = Number(board?.averageRouteStageClicks || 0);
      const maxClicks = Number(board?.maxRouteStageClicks || 0);
      return [routeCount ? `${routeCount} rutas` : "", hiddenCoordinateCount ? `${hiddenCoordinateCount} coords` : "", averageClicks ? `media ${averageClicks}` : "", maxClicks ? `max ${maxClicks}` : ""].filter(Boolean).join(" · ");
    }
    function getAndrewsRouteBoardRouteStops(entry = null, route = null, routeTicket = null) {
      const stops = Array.isArray(entry?.routeStops) && entry.routeStops.length ? entry.routeStops : Array.isArray(routeTicket?.routeStops) && routeTicket.routeStops.length ? routeTicket.routeStops : Array.isArray(route?.routeStops) ? route.routeStops : [];
      return stops.map(stop => ({
        label: String(stop?.label || "").trim(),
        key: String(stop?.key || "").trim()
      })).filter(stop => stop.label || stop.key);
    }
    function cloneAndrewsRouteBoardRouteConditionFrames(frames = []) {
      return (Array.isArray(frames) ? frames : []).filter(frame => frame && typeof frame === "object").map(frame => ({
        ...frame,
        ifStage: frame.ifStage && typeof frame.ifStage === "object" ? {
          ...frame.ifStage
        } : null,
        thenStage: frame.thenStage && typeof frame.thenStage === "object" ? {
          ...frame.thenStage
        } : null,
        conditions: Array.isArray(frame.conditions) ? frame.conditions.map(condition => ({
          ...condition
        })) : []
      }));
    }
    function getAndrewsRouteBoardRouteConditionFrames(entry = null, route = null, routeTicket = null) {
      const frames = Array.isArray(entry?.routeConditionFrames) && entry.routeConditionFrames.length ? entry.routeConditionFrames : Array.isArray(route?.routeConditionFrames) && route.routeConditionFrames.length ? route.routeConditionFrames : Array.isArray(routeTicket?.routeConditionFrames) ? routeTicket.routeConditionFrames : [];
      if (frames.length) {
        return cloneAndrewsRouteBoardRouteConditionFrames(frames);
      }
      const single = entry?.routeConditionFrame || entry?.routeIfThenFrame || route?.routeConditionFrame || route?.routeIfThenFrame || routeTicket?.routeConditionFrame || null;
      return single && typeof single === "object" ? cloneAndrewsRouteBoardRouteConditionFrames([single]) : [];
    }
    function serializeAndrewsRouteBoardRouteConditionFrames(frames = []) {
      return (Array.isArray(frames) ? frames : []).map(frame => [frame.sourceKey || frame.ifStage?.key || "", frame.targetKey || frame.thenStage?.key || "", frame.operation || ""].join(">")).join("|");
    }
    function appendAndrewsRouteBoardRouteConditions(parent, frames = []) {
      const conditionFrames = (Array.isArray(frames) ? frames : []).filter(frame => frame && typeof frame === "object");
      if (!conditionFrames.length) {
        return null;
      }
      const first = conditionFrames[0];
      const last = conditionFrames[conditionFrames.length - 1];
      const rail = targetObject.document.createElement("span");
      rail.className = "andrews-route-board__conditions";
      rail.dataset.conditionModel = first.conditionModel || "";
      rail.dataset.conditionSegments = String(conditionFrames.length);
      rail.dataset.conditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(conditionFrames);
      const appendChip = (role = "", text = "", title = "") => {
        if (!text) {
          return;
        }
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__condition";
        chip.dataset.conditionRole = role;
        chip.textContent = text;
        if (title) {
          chip.title = title;
        }
        rail.appendChild(chip);
      };
      appendChip("if", `Si ${first.ifStage?.label || first.sourceLabel || ""}`, first.formula || "");
      appendChip("then", `Entonces ${last.thenStage?.label || last.targetLabel || ""}`, last.formula || "");
      if (conditionFrames.length > 1) {
        appendChip("transfer", `${conditionFrames.length} tramos`, conditionFrames.map(frame => frame.passengerCue).join(" | "));
      }
      const functionUseCondition = conditionFrames.flatMap(frame => Array.isArray(frame.conditions) ? frame.conditions : []).find(entry => entry.dimension === "function-use");
      appendChip("function-use", functionUseCondition?.label || "Función final", functionUseCondition?.expected || "");
      parent.appendChild(rail);
      return rail;
    }
    function appendAndrewsRouteBoardRouteStops(parent, stops = []) {
      const routeStops = Array.isArray(stops) ? stops : [];
      if (!routeStops.length) {
        return null;
      }
      const stopRail = targetObject.document.createElement("span");
      stopRail.className = "andrews-route-board__route-stops";
      routeStops.forEach((stop, index) => {
        if (index > 0) {
          const arrow = targetObject.document.createElement("span");
          arrow.className = "andrews-route-board__route-stop-arrow";
          arrow.textContent = ">";
          stopRail.appendChild(arrow);
        }
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__route-stop";
        chip.textContent = stop.label || stop.key;
        if (stop.key) {
          chip.dataset.routeStopKey = stop.key;
        }
        stopRail.appendChild(chip);
      });
      parent.appendChild(stopRail);
      return stopRail;
    }
    function appendAndrewsRouteBoardDimensions(parent, gateDomainCounts = [], {
      hypothesisFrame = null
    } = {}) {
      const dimensions = (Array.isArray(gateDomainCounts) ? gateDomainCounts : []).slice(0, 4);
      if (!dimensions.length) {
        return null;
      }
      const hypothesisDomains = new Set(getAndrewsRouteBoardHypothesisDomains(hypothesisFrame));
      const primaryHypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
      const rail = targetObject.document.createElement("span");
      rail.className = "andrews-route-board__dimensions";
      dimensions.forEach(item => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__dimension";
        chip.dataset.gateDomain = item.value;
        chip.dataset.gateDomainCount = String(item.count || 0);
        if (hypothesisDomains.has(item.value)) {
          chip.dataset.hypothesisDomain = "candidate-obstacle";
          chip.dataset.hypothesisTestId = primaryHypothesis?.hypothesisTestId || "";
          chip.dataset.hypothesisPValue = primaryHypothesis?.pValue === null || primaryHypothesis?.pValue === undefined ? "" : String(primaryHypothesis.pValue);
          chip.title = getAndrewsRouteBoardHypothesisActionLabel(primaryHypothesis, hypothesisFrame);
        }
        chip.textContent = `${getAndrewsRouteBoardGateDomainLabel(item.value)} ${item.count}`;
        rail.appendChild(chip);
      });
      parent.appendChild(rail);
      return rail;
    }
    function getAndrewsRouteBoardConversionActionLabel(entry = null) {
      const eventFeature = String(entry?.eventFeature || "").trim();
      const labels = {
        "entrada:source-rank-vector": "#1 Entrada · fijar origen",
        "formula:routed-gate-vector": "#2 Fórmula · resolver ruta",
        "salida:next-source-vector": "#3 Salida · entregar trayecto"
      };
      return labels[eventFeature] || [entry?.block || "", eventFeature].filter(Boolean).join(" · ");
    }
    function appendAndrewsRouteBoardResistancePlan(parent, board = null) {
      const plan = board?.resistanceConversionPlan;
      if (!plan || !Array.isArray(plan.highResistanceDimensions) || !plan.highResistanceDimensions.length) {
        return null;
      }
      const strip = targetObject.document.createElement("div");
      strip.className = "andrews-route-board__conversion";
      strip.dataset.fromRoute = plan.fromRouteId || "";
      strip.dataset.toRoute = plan.toRouteId || "";
      strip.dataset.fromRouteLabel = plan.fromRouteLabel || "";
      strip.dataset.toRouteLabel = plan.toRouteLabel || "";
      strip.dataset.scoreReductionNeeded = String(plan.scoreReductionNeeded || 0);
      strip.dataset.obstacleReductionNeeded = String(plan.obstacleReductionNeeded || 0);
      strip.dataset.actionEvents = Array.isArray(plan.blockActions) ? plan.blockActions.map(entry => entry.eventFeature || "").filter(Boolean).join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__conversion-label";
      label.textContent = "Cambio";
      const main = targetObject.document.createElement("span");
      main.className = "andrews-route-board__conversion-main";
      main.textContent = [plan.fromResistanceScore ? `R${plan.fromResistanceScore}` : "", plan.targetResistanceScore ? `R${plan.targetResistanceScore}` : ""].filter(Boolean).join(" > ");
      const delta = targetObject.document.createElement("span");
      delta.className = "andrews-route-board__conversion-delta";
      delta.textContent = [plan.scoreReductionNeeded ? `-${plan.scoreReductionNeeded}R` : "", plan.obstacleReductionNeeded ? `-${plan.obstacleReductionNeeded} coords` : ""].filter(Boolean).join(" · ");
      const dimensions = targetObject.document.createElement("span");
      dimensions.className = "andrews-route-board__conversion-dimensions";
      plan.highResistanceDimensions.slice(0, 4).forEach(item => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__conversion-dimension";
        chip.dataset.gateDomain = item.domain || "";
        chip.dataset.delta = String(item.delta || 0);
        chip.dataset.action = item.action || "";
        if (item.action) {
          chip.title = item.action;
        }
        chip.textContent = `${getAndrewsRouteBoardGateDomainLabel(item.domain)} -${item.delta || 0}`;
        dimensions.appendChild(chip);
      });
      const routeLine = targetObject.document.createElement("span");
      routeLine.className = "andrews-route-board__conversion-route";
      routeLine.textContent = [plan.fromRouteLabel || plan.fromRouteId || "", plan.toRouteLabel || plan.toRouteId || ""].filter(Boolean).join(" > ");
      const actions = targetObject.document.createElement("span");
      actions.className = "andrews-route-board__conversion-actions";
      (Array.isArray(plan.blockActions) ? plan.blockActions : []).forEach(entry => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__conversion-action";
        chip.dataset.block = entry.block || "";
        chip.dataset.eventFeature = entry.eventFeature || "";
        chip.dataset.actionLabel = getAndrewsRouteBoardConversionActionLabel(entry);
        chip.textContent = chip.dataset.actionLabel;
        if (entry.action) {
          chip.title = entry.action;
        }
        actions.appendChild(chip);
      });
      strip.append(label, main, delta, dimensions);
      if (routeLine.textContent) {
        strip.appendChild(routeLine);
      }
      if (actions.childElementCount) {
        strip.appendChild(actions);
      }
      parent.appendChild(strip);
      return strip;
    }
    function appendAndrewsRouteBoardResistanceHypothesis(parent, board = null) {
      const frame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object" ? board.resistanceHypothesisFrame : null;
      const primary = frame?.primaryCandidateObstacle || frame?.primaryTest || frame?.highResistanceGateTest || null;
      if (!frame || !primary) {
        return null;
      }
      const hypothesis = targetObject.document.createElement("div");
      hypothesis.className = "andrews-route-board__hypothesis";
      hypothesis.dataset.resistanceHypothesisKind = frame.kind || "";
      hypothesis.dataset.resistanceHypothesisDecision = frame.nullHypothesisDecision || "";
      hypothesis.dataset.resistanceHypothesisTestId = primary.hypothesisTestId || "";
      hypothesis.dataset.resistanceHypothesisKey = primary.key || "";
      hypothesis.dataset.resistanceHypothesisCandidate = frame.primaryCandidateObstacle?.key || "";
      hypothesis.dataset.resistanceHypothesisDomains = Array.isArray(primary.domains) ? primary.domains.join("+") : "";
      hypothesis.dataset.resistanceHypothesisPValue = primary.pValue === null || primary.pValue === undefined ? "" : String(primary.pValue);
      hypothesis.dataset.resistanceHypothesisQValue = primary.qValue === null || primary.qValue === undefined ? "" : String(primary.qValue);
      hypothesis.dataset.resistanceHypothesisAlpha = String(frame.alpha || primary.alpha || "");
      hypothesis.dataset.resistanceHypothesisRejectsNull = String(primary.rejectsNullHypothesis === true);
      const actionLabel = getAndrewsRouteBoardHypothesisActionLabel(primary, frame);
      hypothesis.dataset.resistanceHypothesisAction = frame.recommendedAction || primary.action || "";
      hypothesis.dataset.resistanceHypothesisActionLabel = actionLabel;
      hypothesis.dataset.resistanceHypothesisOrder = Array.isArray(frame.dimensionalOrder) ? frame.dimensionalOrder.join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__hypothesis-label";
      label.textContent = "Prueba";
      const main = targetObject.document.createElement("span");
      main.className = "andrews-route-board__hypothesis-main";
      const domainLabel = getAndrewsRouteBoardHypothesisDomainLabel(primary.domains);
      main.textContent = [primary.rejectsNullHypothesis === true ? "H0 rechazada" : "H0 abierta", domainLabel || primary.label || primary.key || ""].filter(Boolean).join(" · ");
      const stats = targetObject.document.createElement("span");
      stats.className = "andrews-route-board__hypothesis-stats";
      stats.textContent = [primary.pValue === null || primary.pValue === undefined ? "" : `p ${formatAndrewsRouteBoardProbability(primary.pValue)}`, primary.qValue === null || primary.qValue === undefined ? "" : `q ${formatAndrewsRouteBoardProbability(primary.qValue)}`, frame.alpha ? `alfa ${formatAndrewsRouteBoardProbability(frame.alpha)}` : ""].filter(Boolean).join(" · ");
      const chips = targetObject.document.createElement("span");
      chips.className = "andrews-route-board__hypothesis-chips";
      [frame.highResistanceGateTest, frame.lowResistanceGateTest, frame.newRelationshipCandidate].filter(Boolean).forEach(entry => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__hypothesis-chip";
        chip.dataset.hypothesisTestId = entry.hypothesisTestId || "";
        chip.dataset.hypothesisDirection = entry.direction || "";
        chip.dataset.hypothesisPValue = entry.pValue === null || entry.pValue === undefined ? "" : String(entry.pValue);
        chip.dataset.hypothesisQValue = entry.qValue === null || entry.qValue === undefined ? "" : String(entry.qValue);
        chip.dataset.hypothesisRejectsNull = String(entry.rejectsNullHypothesis === true);
        chip.textContent = getAndrewsRouteBoardHypothesisDomainLabel(entry.domains) || entry.label || entry.key || "";
        const chipActionLabel = getAndrewsRouteBoardHypothesisActionLabel(entry, frame);
        if (chipActionLabel) {
          chip.title = chipActionLabel;
        }
        chips.appendChild(chip);
      });
      const action = targetObject.document.createElement("span");
      action.className = "andrews-route-board__hypothesis-action";
      action.textContent = actionLabel;
      hypothesis.append(label, main, stats);
      if (chips.childElementCount) {
        hypothesis.appendChild(chips);
      }
      if (action.textContent) {
        hypothesis.appendChild(action);
      }
      hypothesis.setAttribute("aria-label", [label.textContent, main.textContent, stats.textContent, action.textContent].filter(Boolean).join(" · "));
      parent.appendChild(hypothesis);
      return hypothesis;
    }
    function appendAndrewsRouteBoardPassengerIntentions(parent, frame = null) {
      const intentionFrame = frame?.intentionFrame && typeof frame.intentionFrame === "object" ? frame.intentionFrame : null;
      const intentions = Array.isArray(intentionFrame?.intentions) ? intentionFrame.intentions : [];
      if (!intentionFrame || !intentions.length) {
        return null;
      }
      const rail = targetObject.document.createElement("span");
      rail.className = "andrews-route-board__intentions";
      rail.dataset.intentionModel = intentionFrame.intentionModel || "";
      rail.dataset.routeProvisionMode = intentionFrame.routeProvisionMode || "";
      rail.dataset.currentIntention = intentionFrame.currentIntention || frame.currentIntention || "";
      rail.dataset.sharedRouteBoard = String(intentionFrame.sharedRouteBoard === true);
      rail.dataset.intentionSwitchRequired = String(intentionFrame.intentionSwitchRequired === true);
      rail.dataset.intentions = serializeAndrewsRouteBoardIntentions(intentionFrame);
      const intentionLabels = [];
      intentions.forEach(entry => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__intention";
        chip.dataset.intentionMode = entry.id || "";
        chip.dataset.intentionSelected = String(entry.selected === true);
        chip.dataset.intentionOptionCount = String(entry.optionCount || 0);
        chip.dataset.intentionRouteCount = String(entry.routeCount || 0);
        chip.dataset.intentionActionCount = String(entry.actionCount || 0);
        chip.textContent = [entry.label || entry.id || "", Number(entry.optionCount || entry.routeCount || 0) ? String(entry.optionCount || entry.routeCount || 0) : ""].filter(Boolean).join(" ");
        if (chip.textContent) {
          intentionLabels.push(chip.textContent);
        }
        rail.appendChild(chip);
      });
      if (intentionLabels.length) {
        rail.setAttribute("aria-label", intentionLabels.join(" · "));
      }
      parent.appendChild(rail);
      return rail;
    }
    function appendAndrewsRouteBoardPassengerFrame(parent, board = null) {
      const frame = board?.passengerFrame;
      if (!frame || typeof frame !== "object") {
        return null;
      }
      const activeJourney = getAndrewsRouteBoardActiveJourneyForBoard(board);
      const canContinueJourney = Boolean(activeJourney?.nextSourceStage);
      const visibleRoutes = Array.isArray(board?.visibleRoutes) ? board.visibleRoutes : [];
      const recommendedRouteKey = Array.isArray(board?.recommendedRoute?.routeIds) ? board.recommendedRoute.routeIds.join("|") : "";
      const primaryRoute = (recommendedRouteKey ? visibleRoutes.find(entry => (Array.isArray(entry.routeIds) ? entry.routeIds.join("|") : "") === recommendedRouteKey) : null) || (visibleRoutes.length === 1 ? visibleRoutes[0] : null) || board?.recommendedRoute || null;
      const pass = targetObject.document.createElement("div");
      pass.className = "andrews-route-board__pass";
      pass.dataset.routeBoardModel = frame.routeBoardModel || "";
      pass.dataset.currentIntention = frame.currentIntention || "";
      pass.dataset.primaryActionLabel = frame.primaryActionLabel || "";
      pass.dataset.primaryRecommendationRole = frame.primaryRecommendationRole || "";
      pass.dataset.primaryRouteIds = Array.isArray(frame.primaryRouteIds) ? frame.primaryRouteIds.join("|") : "";
      pass.dataset.primarySource = frame.primarySourceStageKey || frame.primarySourceKey || "";
      pass.dataset.primarySourceLabel = frame.primarySourceLabel || "";
      pass.dataset.primaryNextSource = frame.primaryNextSourceStageKey || "";
      pass.dataset.primaryNextSourceLabel = frame.primaryNextSourceLabel || "";
      pass.dataset.primaryRoutePathLabel = frame.primaryRoutePathLabel || frame.routePathLabel || "";
      pass.dataset.sourceTicketModel = frame.sourceTicketFrame?.ticketModel || "";
      pass.dataset.sourceTicketInput = frame.sourceTicketFrame?.inputValue || "";
      pass.dataset.sourceTicketBoundary = frame.sourceTicketFrame?.boundaryKind || "";
      pass.dataset.sourceTicketDimensions = serializeAndrewsRouteBoardTicketDimensions(frame.sourceTicketFrame?.dimensionSlots || []);
      pass.dataset.intentionModel = frame.intentionFrame?.intentionModel || "";
      pass.dataset.routeProvisionMode = frame.intentionFrame?.routeProvisionMode || "";
      pass.dataset.sharedRouteBoard = String(frame.intentionFrame?.sharedRouteBoard === true);
      pass.dataset.intentionSwitchRequired = String(frame.intentionFrame?.intentionSwitchRequired === true);
      pass.dataset.intentions = serializeAndrewsRouteBoardIntentions(frame.intentionFrame);
      pass.dataset.visibleRouteCount = String(frame.visibleRouteCount || 0);
      pass.dataset.destinationOptionCount = String(frame.destinationOptionCount || 0);
      pass.dataset.exploreOptionCount = String(frame.exploreOptionCount || 0);
      pass.dataset.nextOptionCount = String(frame.nextOptionCount || 0);
      pass.dataset.arrivalOptionCount = String(frame.arrivalOptionCount || 0);
      pass.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__pass-label";
      label.textContent = "Pase";
      const main = targetObject.document.createElement("span");
      main.className = "andrews-route-board__pass-main";
      main.textContent = [frame.primarySourceLabel || frame.sourceLabel || "", frame.destinationLabel || (frame.currentIntention === "explore" ? "Salidas" : "")].filter(Boolean).join(" > ");
      const meta = targetObject.document.createElement("span");
      meta.className = "andrews-route-board__pass-meta";
      meta.textContent = [frame.primaryActionLabel || "", frame.primaryRoutePathLabel || frame.primaryNextSourceLabel || "", frame.visibleRouteCount ? `${frame.visibleRouteCount} rutas` : "", frame.destinationOptionCount ? `${frame.destinationOptionCount} destinos` : "", frame.exploreOptionCount ? `${frame.exploreOptionCount} explorar` : "", frame.averageRouteStageClicks ? `media ${frame.averageRouteStageClicks}` : "", frame.maxRouteStageClicks ? `max ${frame.maxRouteStageClicks}` : ""].filter(Boolean).join(" · ");
      pass.append(label, main);
      appendAndrewsRouteBoardPassengerIntentions(pass, frame);
      pass.appendChild(meta);
      if (canContinueJourney || primaryRoute) {
        const route = Array.isArray(primaryRoute?.routes) ? primaryRoute.routes[0] : primaryRoute;
        const routeTicket = primaryRoute?.routeTicket || route?.routeTicket || null;
        const routeIds = canContinueJourney ? Array.isArray(activeJourney.routeIds) ? activeJourney.routeIds : [] : Array.isArray(primaryRoute.routeIds) ? primaryRoute.routeIds : [primaryRoute.routeId || route?.routeId || ""].filter(Boolean);
        const routeConditionFrames = canContinueJourney ? cloneAndrewsRouteBoardRouteConditionFrames(activeJourney.routeConditionFrames) : getAndrewsRouteBoardRouteConditionFrames(primaryRoute, route, routeTicket);
        const routeLoopState = canContinueJourney ? "" : getAndrewsRouteBoardRouteLoopState(primaryRoute, route, board);
        const routeLoopCount = canContinueJourney ? 0 : getAndrewsRouteBoardRouteLoopCount(primaryRoute, route, board);
        const routeLoopLabel = getAndrewsRouteBoardLoopStateLabel(routeLoopState, routeLoopCount);
        const action = targetObject.document.createElement("button");
        action.type = "button";
        action.className = "andrews-route-board__pass-action";
        action.dataset.actionMode = canContinueJourney ? "continue-next-source" : "activate-route";
        action.dataset.routeIds = routeIds.join("|");
        action.dataset.routeLoopState = routeLoopState;
        action.dataset.routeLoopLabel = routeLoopLabel;
        action.dataset.routeLoopCount = String(routeLoopCount || 0);
        action.dataset.routeRecommendation = activeJourney?.routeActionFrame?.recommendationRole || primaryRoute?.routeActionFrame?.recommendationRole || frame.primaryRecommendationRole || "";
        action.dataset.routeActionLabel = activeJourney?.passengerFrame?.primaryActionLabel || activeJourney?.routeActionFrame?.actionLabel || activeJourney?.targetActionLabel || primaryRoute?.routeActionFrame?.actionLabel || frame.primaryActionLabel || "Siguiente";
        action.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
        action.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
        action.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key || "";
        action.dataset.routeNextSource = activeJourney?.nextSourceKey || activeJourney?.destinationKey || primaryRoute?.nextSourceStageKey || primaryRoute?.routeTicket?.nextSourceStageKey || frame.primaryNextSourceStageKey || "";
        action.dataset.routeSourceLabel = activeJourney?.sourceLabel || frame.primarySourceLabel || frame.sourceLabel || "";
        action.dataset.routeNextSourceLabel = activeJourney?.nextSourceLabel || activeJourney?.destinationLabel || primaryRoute?.nextSourceLabel || primaryRoute?.routeTicket?.nextSourceLabel || frame.primaryNextSourceLabel || "";
        action.dataset.routePathLabel = activeJourney ? getAndrewsRouteBoardJourneyRoutePathLabel(activeJourney) : getAndrewsRouteBoardEntryRoutePathLabel(primaryRoute) || primaryRoute?.routeTicket?.routePathLabel || primaryRoute?.routeActionFrame?.routePathLabel || frame.primaryRoutePathLabel || frame.routePathLabel || [action.dataset.routeSourceLabel, frame.destinationLabel || action.dataset.routeNextSourceLabel].filter(Boolean).join(" > ");
        action.dataset.routeActionDisplayLabel = [action.dataset.routeActionLabel, action.dataset.routePathLabel || action.dataset.routeNextSourceLabel, routeLoopLabel].filter(Boolean).join(" · ");
        action.textContent = action.dataset.routeActionDisplayLabel || action.dataset.routeActionLabel;
        action.setAttribute("aria-label", [action.dataset.routeActionDisplayLabel || action.dataset.routeActionLabel].filter(Boolean).join(" · "));
        action.addEventListener("click", () => {
          if (canContinueJourney) {
            continueAndrewsRouteBoardFromActiveJourney();
            return;
          }
          activateAndrewsRouteBoardTarget(primaryRoute, board);
        });
        pass.appendChild(action);
      }
      parent.appendChild(pass);
      return pass;
    }
    function appendAndrewsRouteBoardRideFrame(parent, board = null) {
      const frame = board?.rideFrame;
      if (!frame || typeof frame !== "object") {
        return null;
      }
      const ride = targetObject.document.createElement("div");
      ride.className = "andrews-route-board__ride";
      ride.dataset.experienceModel = frame.experienceModel || "";
      ride.dataset.outputJourneyModel = frame.outputJourneyModel || "";
      ride.dataset.operatingPrinciple = frame.operatingPrinciple || "";
      ride.dataset.choiceModel = frame.choiceModel || "";
      ride.dataset.currentIntention = frame.currentIntention || "";
      ride.dataset.sourceStation = frame.sourceKey || "";
      ride.dataset.sourceLabel = frame.sourceLabel || "";
      ride.dataset.currentSignLabel = frame.currentSignLabel || "";
      ride.dataset.nextSignLabel = frame.nextSignLabel || "";
      ride.dataset.destinationSignLabel = frame.destinationSignLabel || "";
      ride.dataset.primaryActionLabel = frame.primaryActionLabel || "";
      ride.dataset.primaryRoutePathLabel = frame.primaryRoutePathLabel || "";
      ride.dataset.activeStop = frame.activeStopId || "";
      ride.dataset.activeStopIndex = String(frame.activeStopIndex || 0);
      ride.dataset.progressStopCount = String(frame.progressStopCount || 0);
      ride.dataset.progressStops = serializeAndrewsRouteBoardStationLineStops(frame.progressStops || []);
      ride.dataset.routeOptionCount = String(frame.routeOptionCount || 0);
      ride.dataset.destinationOptionCount = String(frame.destinationOptionCount || 0);
      ride.dataset.visibleTrackCount = String(frame.visibleTrackCount || 0);
      ride.dataset.primaryClickCount = String(frame.decisionLoad?.primaryClickCount || 0);
      ride.dataset.switchingRequired = String(frame.decisionLoad?.switchingRequired === true);
      ride.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__ride-label";
      label.textContent = "Viaje";
      const main = targetObject.document.createElement("span");
      main.className = "andrews-route-board__ride-main";
      main.textContent = frame.primaryRoutePathLabel || [frame.currentSignLabel, frame.destinationSignLabel || frame.nextSignLabel].filter(Boolean).join(" > ");
      const meta = targetObject.document.createElement("span");
      meta.className = "andrews-route-board__ride-meta";
      meta.textContent = [frame.primaryActionLabel || "", frame.visibleTrackCount ? `${frame.visibleTrackCount} andenes` : "", frame.destinationOptionCount ? `${frame.destinationOptionCount} destinos` : "", frame.activeStopIndex && frame.progressStopCount ? `${frame.activeStopIndex}/${frame.progressStopCount}` : ""].filter(Boolean).join(" · ");
      ride.append(label, main, meta);
      parent.appendChild(ride);
      return ride;
    }
    function appendAndrewsRouteBoardInputTicketDimensions(parent, board = null) {
      const dimensionSlots = Array.isArray(board?.currentStation?.inputTicketFrame?.dimensionSlots) ? board.currentStation.inputTicketFrame.dimensionSlots : [];
      if (!dimensionSlots.length) {
        return null;
      }
      const hypothesisFrame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object" ? board.resistanceHypothesisFrame : null;
      const hypothesisDomains = new Set(getAndrewsRouteBoardHypothesisDomains(hypothesisFrame));
      const primaryHypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
      const rail = targetObject.document.createElement("div");
      rail.className = "andrews-route-board__ticket-dimensions";
      rail.dataset.ticketDimensionCount = String(dimensionSlots.length);
      rail.dataset.ticketDimensions = serializeAndrewsRouteBoardTicketDimensions(dimensionSlots);
      rail.dataset.hypothesisDomains = Array.from(hypothesisDomains).join("+");
      dimensionSlots.forEach(entry => {
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__ticket-dimension";
        chip.dataset.dimensionId = entry.id || "";
        chip.dataset.dimensionStatus = entry.status || "";
        chip.dataset.dimensionValue = entry.value || "";
        if (hypothesisDomains.has(entry.id)) {
          chip.dataset.hypothesisDomain = "candidate-obstacle";
          chip.dataset.hypothesisTestId = primaryHypothesis?.hypothesisTestId || "";
          chip.dataset.hypothesisPValue = primaryHypothesis?.pValue === null || primaryHypothesis?.pValue === undefined ? "" : String(primaryHypothesis.pValue);
          chip.title = getAndrewsRouteBoardHypothesisActionLabel(primaryHypothesis, hypothesisFrame);
        }
        const label = targetObject.document.createElement("span");
        label.className = "andrews-route-board__ticket-dimension-label";
        label.textContent = entry.label || entry.id || "";
        const value = targetObject.document.createElement("span");
        value.className = "andrews-route-board__ticket-dimension-value";
        value.textContent = getAndrewsRouteBoardTicketDimensionStatusLabel(entry.status);
        chip.append(label, value);
        rail.appendChild(chip);
      });
      parent.appendChild(rail);
      return rail;
    }
    function appendAndrewsRouteBoardStationLine(parent, board = null) {
      const frame = board?.stationLineFrame && typeof board.stationLineFrame === "object" ? board.stationLineFrame : board?.passengerFrame?.stationLineFrame && typeof board.passengerFrame.stationLineFrame === "object" ? board.passengerFrame.stationLineFrame : null;
      const stops = Array.isArray(frame?.stops) ? frame.stops : [];
      if (!frame || !stops.length) {
        return null;
      }
      const line = targetObject.document.createElement("div");
      line.className = "andrews-route-board__station-line";
      line.dataset.lineModel = frame.lineModel || "";
      line.dataset.intentMode = frame.intentMode || "";
      line.dataset.activeStop = frame.activeStopId || "";
      line.dataset.sourceStation = frame.sourceKey || "";
      line.dataset.destinationStation = frame.destinationKey || "";
      line.dataset.routeKey = frame.routeKey || "";
      line.dataset.primaryActionLabel = frame.primaryActionLabel || "";
      line.dataset.primaryRouteIds = Array.isArray(frame.primaryRouteIds) ? frame.primaryRouteIds.join("|") : "";
      line.dataset.stationStops = serializeAndrewsRouteBoardStationLineStops(stops);
      stops.forEach(entry => {
        const stop = targetObject.document.createElement("span");
        stop.className = "andrews-route-board__station-line-stop";
        stop.dataset.stopId = entry.id || "";
        stop.dataset.stopRole = entry.role || "";
        stop.dataset.stopStatus = entry.status || "";
        stop.dataset.stationKey = entry.stationKey || "";
        if (entry.id && entry.id === frame.activeStopId) {
          stop.dataset.stopActive = "true";
        }
        const marker = targetObject.document.createElement("span");
        marker.className = "andrews-route-board__station-line-marker";
        marker.setAttribute("aria-hidden", "true");
        const label = targetObject.document.createElement("span");
        label.className = "andrews-route-board__station-line-label";
        label.textContent = entry.label || entry.block || entry.id || "";
        const value = targetObject.document.createElement("span");
        value.className = "andrews-route-board__station-line-value";
        value.textContent = entry.displayLabel || "";
        stop.append(marker, label, value);
        line.appendChild(stop);
      });
      parent.appendChild(line);
      return line;
    }
    function getAndrewsRouteBoardActiveSourceLayer(board = null) {
      const stages = Array.isArray(board?.sourceCandidateStages) ? board.sourceCandidateStages : [];
      const routeStops = Array.isArray(board?.recommendedRoute?.routeStops) ? board.recommendedRoute.routeStops : [];
      const activeSourceKey = board?.passengerFrame?.primarySourceStageKey || board?.passengerFrame?.primarySourceKey || board?.stationLineFrame?.sourceKey || routeStops[0]?.key || board?.currentStation?.key || "";
      const matchedLayer = stages.find(entry => entry?.key && entry.key === activeSourceKey) || stages.find(entry => entry?.key && entry.key === board?.currentStation?.key) || null;
      return {
        key: matchedLayer?.key || activeSourceKey,
        label: matchedLayer?.label || board?.passengerFrame?.primarySourceLabel || board?.stationLineFrame?.sourceLabel || "",
        role: matchedLayer?.sourceRole || ""
      };
    }
    function appendAndrewsRouteBoardSourceLayers(parent, board = null) {
      const stages = Array.isArray(board?.sourceCandidateStages) ? board.sourceCandidateStages : [];
      if (stages.length < 2) {
        return null;
      }
      const activeSourceLayer = getAndrewsRouteBoardActiveSourceLayer(board);
      const activeSourceKey = activeSourceLayer.key || "";
      const layerWrap = targetObject.document.createElement("div");
      layerWrap.className = "andrews-route-board__source-layers";
      layerWrap.dataset.sourceLayerModel = "formula-source-layers-route-board";
      layerWrap.dataset.sourceLayerCount = String(stages.length);
      layerWrap.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(stages);
      layerWrap.dataset.currentStation = board?.currentStation?.key || "";
      layerWrap.dataset.sourceLayerActiveStation = activeSourceKey;
      layerWrap.dataset.sourceLayerActiveRole = activeSourceLayer.role || "";
      layerWrap.dataset.activeSourceStation = activeSourceKey;
      layerWrap.dataset.activeSourceRole = activeSourceLayer.role || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__source-layer-label";
      label.textContent = "Capas fuente";
      const rail = targetObject.document.createElement("span");
      rail.className = "andrews-route-board__source-layer-rail";
      const ariaLabels = [];
      stages.forEach((entry, index) => {
        const stageKey = entry?.key || "";
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__source-layer";
        chip.dataset.sourceLayerIndex = String(index + 1);
        chip.dataset.sourceLayerStation = stageKey;
        chip.dataset.sourceStation = stageKey;
        chip.dataset.sourceStageKey = stageKey;
        chip.dataset.sourceLayerRole = entry?.sourceRole || "";
        chip.dataset.sourceRole = entry?.sourceRole || "";
        chip.dataset.sourceStageRole = entry?.sourceRole || "";
        chip.dataset.sourceLayerActive = String(Boolean(stageKey && stageKey === activeSourceKey));
        chip.dataset.formulaType = entry?.formulaType || "";
        chip.dataset.formulaPosition = entry?.formulaPosition || "";
        chip.dataset.stemRank = entry?.stemRank || "";
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__source-layer-name";
        name.textContent = entry?.label || stageKey || "";
        const role = targetObject.document.createElement("span");
        role.className = "andrews-route-board__source-layer-role";
        role.textContent = getAndrewsRouteBoardSourceLayerRoleLabel(entry?.sourceRole || "");
        chip.append(name, role);
        const ariaLabel = [name.textContent, role.textContent].filter(Boolean).join(" · ");
        if (ariaLabel) {
          chip.setAttribute("aria-label", ariaLabel);
          ariaLabels.push(ariaLabel);
        }
        rail.appendChild(chip);
      });
      layerWrap.append(label, rail);
      if (ariaLabels.length) {
        layerWrap.setAttribute("aria-label", ariaLabels.join(" · "));
      }
      parent.appendChild(layerWrap);
      return layerWrap;
    }
    function appendAndrewsRouteBoardJourneySourceLayers(parent, journey = null) {
      const frame = journey?.sourceLayerFrame && typeof journey.sourceLayerFrame === "object" ? journey.sourceLayerFrame : null;
      const layers = Array.isArray(frame?.layers) ? frame.layers : [];
      if (!frame || layers.length < 2) {
        return null;
      }
      const activeSourceKey = frame.activeSourceKey || "";
      const layerWrap = targetObject.document.createElement("div");
      layerWrap.className = "andrews-route-board__source-layers andrews-route-board__source-layers--journey";
      layerWrap.dataset.sourceLayerModel = frame.layerModel || "";
      layerWrap.dataset.sourceLayerCount = String(frame.sourceLayerCount || layers.length);
      layerWrap.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(layers);
      layerWrap.dataset.sourceLayerActiveStation = activeSourceKey;
      layerWrap.dataset.sourceLayerActiveRole = frame.activeSourceRole || "";
      layerWrap.dataset.activeSourceStation = activeSourceKey;
      layerWrap.dataset.activeSourceRole = frame.activeSourceRole || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__source-layer-label";
      label.textContent = "Origen";
      const rail = targetObject.document.createElement("span");
      rail.className = "andrews-route-board__source-layer-rail";
      const ariaLabels = [];
      layers.forEach((entry, index) => {
        const stageKey = entry?.key || "";
        const sourceRole = entry?.sourceRole || "";
        const chip = targetObject.document.createElement("span");
        chip.className = "andrews-route-board__source-layer";
        chip.dataset.sourceLayerIndex = String(index + 1);
        chip.dataset.sourceLayerStation = stageKey;
        chip.dataset.sourceStation = stageKey;
        chip.dataset.sourceStageKey = stageKey;
        chip.dataset.sourceLayerRole = sourceRole;
        chip.dataset.sourceRole = sourceRole;
        chip.dataset.sourceStageRole = sourceRole;
        chip.dataset.sourceLayerActive = String(entry?.active === true || Boolean(stageKey && stageKey === activeSourceKey));
        chip.dataset.formulaType = entry?.formulaType || "";
        chip.dataset.formulaPosition = entry?.formulaPosition || "";
        chip.dataset.stemRank = entry?.stemRank || "";
        const name = targetObject.document.createElement("span");
        name.className = "andrews-route-board__source-layer-name";
        name.textContent = entry?.label || stageKey || "";
        const role = targetObject.document.createElement("span");
        role.className = "andrews-route-board__source-layer-role";
        role.textContent = getAndrewsRouteBoardSourceLayerRoleLabel(sourceRole);
        chip.append(name, role);
        const ariaLabel = [name.textContent, role.textContent].filter(Boolean).join(" · ");
        if (ariaLabel) {
          chip.setAttribute("aria-label", ariaLabel);
          ariaLabels.push(ariaLabel);
        }
        rail.appendChild(chip);
      });
      layerWrap.append(label, rail);
      if (ariaLabels.length) {
        layerWrap.setAttribute("aria-label", ariaLabels.join(" · "));
      }
      parent.appendChild(layerWrap);
      return layerWrap;
    }
    function appendAndrewsRouteBoardConcourse(parent, board = null) {
      const frame = board?.concourseFrame && typeof board.concourseFrame === "object" ? board.concourseFrame : null;
      const stops = Array.isArray(frame?.stops) ? frame.stops : [];
      if (!frame || !stops.length) {
        return null;
      }
      const concourse = targetObject.document.createElement("div");
      concourse.className = "andrews-route-board__concourse";
      concourse.dataset.concourseModel = frame.concourseModel || "";
      concourse.dataset.lineModel = frame.lineModel || "";
      concourse.dataset.currentIntention = frame.currentIntention || "";
      concourse.dataset.boardState = frame.boardState || "";
      concourse.dataset.sourceStation = frame.sourceKey || "";
      concourse.dataset.nextStation = frame.nextStationKey || "";
      concourse.dataset.destinationStation = frame.destinationKey || "";
      concourse.dataset.routeKey = frame.routeKey || "";
      concourse.dataset.routeIds = Array.isArray(frame.routeIds) ? frame.routeIds.join("|") : "";
      concourse.dataset.stops = serializeAndrewsRouteBoardConcourseStops(stops);
      concourse.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
      const stopRail = targetObject.document.createElement("span");
      stopRail.className = "andrews-route-board__concourse-stops";
      const stopLabels = [];
      stops.forEach(entry => {
        const stop = targetObject.document.createElement("span");
        stop.className = "andrews-route-board__concourse-stop";
        stop.dataset.stopId = entry.id || "";
        stop.dataset.stopStatus = entry.status || "";
        stop.dataset.stationKey = entry.stationKey || "";
        const label = targetObject.document.createElement("span");
        label.className = "andrews-route-board__concourse-label";
        label.textContent = entry.label || entry.id || "";
        const value = targetObject.document.createElement("span");
        value.className = "andrews-route-board__concourse-value";
        value.textContent = entry.displayLabel || "";
        const stopLabel = [label.textContent, value.textContent].filter(Boolean).join(" · ");
        if (stopLabel) {
          stop.setAttribute("aria-label", stopLabel);
          stopLabels.push(stopLabel);
        }
        stop.append(label, value);
        stopRail.appendChild(stop);
      });
      concourse.appendChild(stopRail);
      if (frame.actionLabel) {
        const action = targetObject.document.createElement("span");
        action.className = "andrews-route-board__concourse-action";
        action.textContent = frame.actionLabel;
        concourse.appendChild(action);
      }
      if (stopLabels.length || frame.actionLabel) {
        concourse.setAttribute("aria-label", [...stopLabels, frame.actionLabel || ""].filter(Boolean).join(" · "));
      }
      parent.appendChild(concourse);
      return concourse;
    }
    function appendAndrewsRouteBoardPlatforms(parent, board = null) {
      const frame = board?.platformFrame && typeof board.platformFrame === "object" ? board.platformFrame : null;
      const tracks = Array.isArray(frame?.tracks) ? frame.tracks : [];
      if (!frame || !tracks.length) {
        return null;
      }
      const boardEl = targetObject.document.createElement("div");
      boardEl.className = "andrews-route-board__platform-board";
      boardEl.dataset.platformModel = frame.platformModel || "";
      boardEl.dataset.currentIntention = frame.currentIntention || "";
      boardEl.dataset.sourceStation = frame.sourceKey || "";
      boardEl.dataset.recommendedRouteIds = Array.isArray(frame.recommendedRouteIds) ? frame.recommendedRouteIds.join("|") : "";
      boardEl.dataset.visibleTrackCount = String(frame.visibleTrackCount || tracks.length);
      boardEl.dataset.destinationOptionCount = String(frame.destinationOptionCount || 0);
      boardEl.dataset.platformTracks = serializeAndrewsRouteBoardPlatformTracks(tracks);
      boardEl.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__platform-label";
      label.textContent = "Andenes";
      const rail = targetObject.document.createElement("span");
      rail.className = "andrews-route-board__platforms";
      const ariaLabels = [];
      tracks.forEach(entry => {
        const routePathLabel = entry.routePathLabel || [entry.sourceLabel || "", entry.destinationLabel || ""].filter(Boolean).join(" > ");
        const track = targetObject.document.createElement("span");
        track.className = "andrews-route-board__platform";
        track.dataset.platformId = entry.id || "";
        track.dataset.routeRecommendation = entry.recommendationRole || "";
        track.dataset.sourceStation = entry.sourceKey || "";
        track.dataset.sourceLabel = entry.sourceLabel || "";
        track.dataset.destinationStation = entry.destinationKey || "";
        track.dataset.destinationLabel = entry.destinationLabel || "";
        track.dataset.routePathLabel = routePathLabel;
        track.dataset.routeIds = Array.isArray(entry.routeIds) ? entry.routeIds.join("|") : "";
        track.dataset.segmentCount = String(entry.segmentCount || 1);
        track.dataset.transferCount = String(entry.transferCount || 0);
        track.dataset.tripKind = entry.tripKind || "";
        track.dataset.resistanceScore = String(entry.resistanceScore || 0);
        track.dataset.obstacleCount = String(entry.obstacleCount || 0);
        const heading = targetObject.document.createElement("span");
        heading.className = "andrews-route-board__platform-heading";
        heading.textContent = entry.label || "";
        const destination = targetObject.document.createElement("span");
        destination.className = "andrews-route-board__platform-destination";
        destination.textContent = routePathLabel || entry.destinationLabel || "";
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__platform-meta";
        meta.textContent = [entry.actionLabel || "", entry.segmentCount === 1 ? "1 tramo" : `${entry.segmentCount || 1} tramos`, entry.resistanceScore ? `R${entry.resistanceScore}` : ""].filter(Boolean).join(" · ");
        const ariaLabel = [heading.textContent, destination.textContent, meta.textContent].filter(Boolean).join(" · ");
        if (ariaLabel) {
          track.setAttribute("aria-label", ariaLabel);
          ariaLabels.push(ariaLabel);
        }
        track.append(heading, destination, meta);
        rail.appendChild(track);
      });
      boardEl.append(label, rail);
      if (ariaLabels.length) {
        boardEl.setAttribute("aria-label", ariaLabels.join(" · "));
      }
      parent.appendChild(boardEl);
      return boardEl;
    }
    function renderAndrewsRouteBoardJourneyReceipt(parent, board = null) {
      const journey = getAndrewsRouteBoardActiveJourneyForBoard(board);
      if (!journey) {
        return null;
      }
      const receipt = targetObject.document.createElement("div");
      receipt.className = "andrews-route-board__journey";
      receipt.dataset.routeIds = journey.routeIds.join("|");
      receipt.dataset.routeStops = journey.routeStops.map(stop => stop.key || stop.label).join("|");
      receipt.dataset.routePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(journey);
      receipt.dataset.sourceStation = journey.sourceKey;
      receipt.dataset.destinationStation = journey.destinationKey;
      receipt.dataset.resistanceScore = String(journey.resistanceScore || 0);
      receipt.dataset.obstacleCount = String(journey.obstacleCount || 0);
      receipt.dataset.segmentCount = String(journey.segmentCount || 1);
      receipt.dataset.transferCount = String(journey.transferCount || 0);
      receipt.dataset.tripKind = journey.tripKind || "";
      receipt.dataset.resistanceRole = journey.resistanceRole || "";
      receipt.dataset.gateDomains = serializeAndrewsRouteBoardGateDomains(journey.gateDomainCounts || []);
      const routeConditionFrames = cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames);
      receipt.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
      receipt.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
      receipt.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key || "";
      const sourceLayerFrame = journey.sourceLayerFrame && typeof journey.sourceLayerFrame === "object" ? journey.sourceLayerFrame : null;
      receipt.dataset.sourceLayerModel = sourceLayerFrame?.layerModel || "";
      receipt.dataset.sourceLayerCount = String(sourceLayerFrame?.sourceLayerCount || 0);
      receipt.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(sourceLayerFrame?.layers || []);
      receipt.dataset.sourceLayerActiveStation = sourceLayerFrame?.activeSourceKey || "";
      receipt.dataset.sourceLayerActiveRole = sourceLayerFrame?.activeSourceRole || "";
      const routeActionFrame = journey.routeActionFrame && typeof journey.routeActionFrame === "object" ? journey.routeActionFrame : {};
      const passengerFrame = journey.passengerFrame && typeof journey.passengerFrame === "object" ? journey.passengerFrame : {};
      receipt.dataset.routeActionLabel = routeActionFrame.actionLabel || "";
      receipt.dataset.routeRecommendation = routeActionFrame.recommendationRole || "";
      receipt.dataset.routeBoardModel = passengerFrame.routeBoardModel || "";
      receipt.dataset.journeyModel = passengerFrame.journeyModel || "";
      receipt.dataset.passengerIntention = passengerFrame.currentIntention || "";
      receipt.dataset.passengerIntentionModel = passengerFrame.intentionFrame?.intentionModel || "";
      receipt.dataset.passengerRouteProvisionMode = passengerFrame.intentionFrame?.routeProvisionMode || "";
      receipt.dataset.passengerIntentions = serializeAndrewsRouteBoardIntentions(passengerFrame.intentionFrame);
      receipt.dataset.passengerPrimaryActionLabel = passengerFrame.primaryActionLabel || "";
      receipt.dataset.passengerPrimaryRoutePathLabel = passengerFrame.primaryRoutePathLabel || receipt.dataset.routePathLabel || "";
      receipt.dataset.passengerPrimaryRouteIds = Array.isArray(passengerFrame.primaryRouteIds) ? passengerFrame.primaryRouteIds.join("|") : "";
      receipt.dataset.passengerPrimaryNextSource = passengerFrame.primaryNextSourceStageKey || "";
      receipt.dataset.passengerEvents = Array.isArray(passengerFrame.passengerEvents) ? passengerFrame.passengerEvents.join("|") : "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__journey-label";
      label.textContent = "Actual";
      const main = targetObject.document.createElement("span");
      main.className = "andrews-route-board__journey-main";
      main.textContent = receipt.dataset.routePathLabel;
      const meta = targetObject.document.createElement("span");
      meta.className = "andrews-route-board__journey-meta";
      meta.textContent = [journey.resistanceRoleLabel || "", journey.resistanceScore ? `R${journey.resistanceScore}` : "", journey.segmentCount === 1 ? "1 tramo" : `${journey.segmentCount} tramos`, journey.hiddenCoordinateCount ? `${journey.hiddenCoordinateCount} coords` : "", journey.tripKind === "transfer" ? "trasbordo" : ""].filter(Boolean).join(" · ");
      receipt.append(label, main, meta);
      appendAndrewsRouteBoardRouteConditions(receipt, routeConditionFrames);
      appendAndrewsRouteBoardJourneySourceLayers(receipt, journey);
      appendAndrewsRouteBoardRouteStops(receipt, journey.routeStops);
      appendAndrewsRouteBoardDimensions(receipt, journey.gateDomainCounts, {
        hypothesisFrame: board?.resistanceHypothesisFrame || null
      });
      parent.appendChild(receipt);
      return receipt;
    }
    function renderAndrewsRouteBoardContinuedJourneyReceipt(parent, board = null) {
      const journey = getAndrewsRouteBoardContinuedJourneyForBoard(board);
      if (!journey) {
        return null;
      }
      const routeConditionFrames = cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames);
      const receipt = targetObject.document.createElement("div");
      receipt.className = "andrews-route-board__journey andrews-route-board__journey--continued";
      receipt.dataset.continuationState = journey.continuationState || "continued-as-next-source";
      receipt.dataset.routeIds = Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "";
      receipt.dataset.routeStops = Array.isArray(journey.routeStops) ? journey.routeStops.map(stop => stop.key || stop.label).join("|") : "";
      receipt.dataset.routePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(journey);
      receipt.dataset.sourceStation = journey.sourceKey || "";
      receipt.dataset.destinationStation = journey.destinationKey || "";
      const passengerFrame = journey.passengerFrame && typeof journey.passengerFrame === "object" ? journey.passengerFrame : {};
      receipt.dataset.passengerPrimaryRoutePathLabel = passengerFrame.primaryRoutePathLabel || receipt.dataset.routePathLabel || "";
      receipt.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
      receipt.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
      receipt.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key || "";
      const sourceLayerFrame = journey.sourceLayerFrame && typeof journey.sourceLayerFrame === "object" ? journey.sourceLayerFrame : null;
      receipt.dataset.sourceLayerModel = sourceLayerFrame?.layerModel || "";
      receipt.dataset.sourceLayerCount = String(sourceLayerFrame?.sourceLayerCount || 0);
      receipt.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(sourceLayerFrame?.layers || []);
      receipt.dataset.sourceLayerActiveStation = sourceLayerFrame?.activeSourceKey || "";
      receipt.dataset.sourceLayerActiveRole = sourceLayerFrame?.activeSourceRole || "";
      receipt.dataset.gateDomains = serializeAndrewsRouteBoardGateDomains(journey.gateDomainCounts || []);
      receipt.dataset.resistanceScore = String(journey.resistanceScore || 0);
      receipt.dataset.resistanceRole = journey.resistanceRole || "";
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__journey-label";
      label.textContent = "Trasbordo";
      const main = targetObject.document.createElement("span");
      main.className = "andrews-route-board__journey-main";
      main.textContent = receipt.dataset.routePathLabel;
      const meta = targetObject.document.createElement("span");
      meta.className = "andrews-route-board__journey-meta";
      meta.textContent = [journey.targetActionLabel || journey.routeActionFrame?.actionLabel || "", journey.resistanceRoleLabel || "", journey.resistanceScore ? `R${journey.resistanceScore}` : ""].filter(Boolean).join(" · ");
      receipt.append(label, main, meta);
      appendAndrewsRouteBoardRouteConditions(receipt, routeConditionFrames);
      appendAndrewsRouteBoardJourneySourceLayers(receipt, journey);
      appendAndrewsRouteBoardRouteStops(receipt, journey.routeStops);
      appendAndrewsRouteBoardDimensions(receipt, journey.gateDomainCounts, {
        hypothesisFrame: board?.resistanceHypothesisFrame || null
      });
      parent.appendChild(receipt);
      return receipt;
    }
    function renderAndrewsRouteBoardJourneyHistory(parent, board = null) {
      const history = getAndrewsRouteBoardJourneyHistoryForBoard(board);
      if (!history.length) {
        return null;
      }
      const itinerary = targetObject.document.createElement("div");
      itinerary.className = "andrews-route-board__itinerary";
      itinerary.dataset.journeyHistoryLegCount = String(history.length);
      itinerary.dataset.journeyHistoryRouteIds = history.map(journey => Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "").filter(Boolean).join("||");
      itinerary.dataset.journeyHistoryStations = history.map(journey => [journey.sourceKey || "", journey.destinationKey || ""].filter(Boolean).join(">")).filter(Boolean).join("|");
      itinerary.dataset.journeyHistoryRoutePaths = history.map(journey => getAndrewsRouteBoardJourneyRoutePathLabel(journey)).filter(Boolean).join("|");
      const label = targetObject.document.createElement("span");
      label.className = "andrews-route-board__itinerary-label";
      label.textContent = "Ruta";
      itinerary.appendChild(label);
      history.forEach((journey, index) => {
        const routeConditionFrames = cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames);
        const leg = targetObject.document.createElement("span");
        leg.className = "andrews-route-board__itinerary-leg";
        leg.dataset.legIndex = String(index + 1);
        leg.dataset.routeIds = Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "";
        leg.dataset.sourceStation = journey.sourceKey || "";
        leg.dataset.destinationStation = journey.destinationKey || "";
        leg.dataset.routePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(journey);
        leg.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
        leg.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
        leg.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key || "";
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__itinerary-main";
        main.textContent = `${index + 1}. ${leg.dataset.routePathLabel}`;
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__itinerary-meta";
        meta.textContent = [journey.routeActionFrame?.actionLabel || journey.targetActionLabel || "", journey.resistanceScore ? `R${journey.resistanceScore}` : ""].filter(Boolean).join(" · ");
        leg.append(main, meta);
        itinerary.appendChild(leg);
      });
      parent.appendChild(itinerary);
      return itinerary;
    }
    function renderAndrewsRouteBoardRouteList(parent, board = null) {
      const visibleRoutes = Array.isArray(board?.visibleRoutes) ? board.visibleRoutes : [];
      const isDestinationBoard = board?.boardState === "destination";
      const leastVisibleRouteIds = (board?.leastVisibleRoute?.routeIds || []).join("|");
      const mostVisibleRouteIds = (board?.mostVisibleRoute?.routeIds || []).join("|");
      const recommendedRouteIds = (board?.recommendedRoute?.routeIds || []).join("|");
      const recommendedActionLabel = board?.recommendedRoute?.actionLabel || "";
      const list = targetObject.document.createElement("div");
      list.className = "andrews-route-board__routes";
      if (!visibleRoutes.length) {
        const empty = targetObject.document.createElement("div");
        empty.className = "andrews-route-board__empty";
        empty.textContent = isDestinationBoard ? "Sin trayecto desde esta estacion." : "Sin salidas desde esta estacion.";
        list.appendChild(empty);
        parent.appendChild(list);
        return;
      }
      visibleRoutes.slice(0, 4).forEach(entry => {
        const routeIds = Array.isArray(entry.routeIds) ? entry.routeIds : [entry.routeId || ""].filter(Boolean);
        const route = Array.isArray(entry.routes) ? entry.routes[0] : entry;
        const routeTicket = entry.routeTicket || route?.routeTicket || null;
        const routeActionFrame = entry.routeActionFrame && typeof entry.routeActionFrame === "object" ? entry.routeActionFrame : null;
        const routeStops = getAndrewsRouteBoardRouteStops(entry, route, routeTicket);
        const routeConditionFrames = getAndrewsRouteBoardRouteConditionFrames(entry, route, routeTicket);
        const gateDomainCounts = getAndrewsRouteBoardGateDomainCounts(entry, route, routeTicket);
        const routeLoopState = getAndrewsRouteBoardRouteLoopState(entry, route, board);
        const routeLoopCount = getAndrewsRouteBoardRouteLoopCount(entry, route, board);
        const routeLoopLabel = getAndrewsRouteBoardLoopStateLabel(routeLoopState, routeLoopCount);
        const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry) || routeStops.map(stop => stop.label || stop.key).join(" > ");
        const routeSourceStop = routeStops[0] || null;
        const routeDestinationStop = routeStops[routeStops.length - 1] || null;
        const hypothesisDomains = getAndrewsRouteBoardHypothesisDomains(board?.resistanceHypothesisFrame || null);
        const gateDomainSet = new Set(gateDomainCounts.map(item => item.value));
        const hypothesisHitCount = hypothesisDomains.filter(domain => gateDomainSet.has(domain)).length;
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "andrews-route-board__route";
        button.dataset.routeIds = routeIds.join("|");
        button.dataset.routeStops = routeStops.map(stop => stop.key || stop.label).join("|");
        button.dataset.routePathLabel = routePathLabel;
        button.dataset.routeSource = routeSourceStop?.key || "";
        button.dataset.routeSourceLabel = routeSourceStop?.label || "";
        button.dataset.routeDestinationLabel = routeDestinationStop?.label || "";
        button.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
        button.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
        button.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key || "";
        button.dataset.routeGateDomains = serializeAndrewsRouteBoardGateDomains(gateDomainCounts);
        button.dataset.routeLoopState = routeLoopState;
        button.dataset.routeLoopLabel = routeLoopLabel;
        button.dataset.routeLoopCount = String(routeLoopCount || 0);
        button.dataset.routeHypothesisDomains = hypothesisDomains.join("+");
        button.dataset.routeHypothesisHitCount = String(hypothesisHitCount);
        button.dataset.routeHypothesisHit = String(Boolean(hypothesisDomains.length && hypothesisHitCount === hypothesisDomains.length));
        button.dataset.routeDestination = entry?.targetAction?.targetStageKey || route?.targetAction?.targetStageKey || route?.targetStageKey || entry.targetStageKey || "";
        button.dataset.routeEntryBoard = entry?.targetAction?.entryBoard || route?.targetAction?.entryBoard || "";
        button.dataset.routeUnitMode = entry?.targetAction?.unitMode || route?.targetAction?.unitMode || "";
        button.dataset.routeSegmentCount = String(entry.segmentCount || route?.segmentCount || routeTicket?.segmentCount || 1);
        button.dataset.routeTransferCount = String(entry.transferCount || route?.transferCount || routeTicket?.transferCount || 0);
        button.dataset.routeTripKind = entry.tripKind || route?.tripKind || routeTicket?.tripKind || "";
        button.dataset.routeHiddenCoordinateCount = String(entry.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0);
        button.dataset.routeResistanceScore = String(entry.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || 0);
        button.dataset.routeObstacleCount = String(entry.obstacleCount || route?.obstacleCount || routeTicket?.obstacleCount || 0);
        button.dataset.routeResistanceRank = String(entry.resistanceRank || route?.resistanceRank || routeTicket?.resistanceRank || 0);
        button.dataset.routeStandardScore = entry.standardScoreLabel || route?.standardScoreLabel || routeTicket?.standardScoreLabel || "";
        const resistanceRole = routeIds.join("|") === leastVisibleRouteIds ? "least" : routeIds.join("|") === mostVisibleRouteIds ? "most" : "";
        button.dataset.routeResistanceRole = resistanceRole;
        const recommendationRole = routeIds.join("|") === recommendedRouteIds ? isDestinationBoard ? "arrival" : "next" : "alternate";
        const resolvedRecommendationRole = routeActionFrame?.recommendationRole || recommendationRole;
        button.dataset.routeRecommendation = resolvedRecommendationRole;
        button.dataset.routeActionLabel = routeActionFrame?.actionLabel || (resolvedRecommendationRole === "alternate" ? "Explorar" : recommendedActionLabel);
        const topLine = targetObject.document.createElement("span");
        topLine.className = "andrews-route-board__route-topline";
        const main = targetObject.document.createElement("span");
        main.className = "andrews-route-board__route-main";
        main.textContent = routePathLabel || (isDestinationBoard ? entry.targetLabel || route?.targetLabel || "" : route?.targetLabel || entry.targetLabel || "");
        topLine.appendChild(main);
        if (button.dataset.routeActionLabel) {
          const recommendationBadge = targetObject.document.createElement("span");
          recommendationBadge.className = "andrews-route-board__route-badge";
          recommendationBadge.dataset.routeRecommendation = resolvedRecommendationRole;
          recommendationBadge.textContent = button.dataset.routeActionLabel;
          topLine.appendChild(recommendationBadge);
        }
        const resistanceRoleLabel = getAndrewsRouteBoardResistanceRoleLabel(resistanceRole);
        if (resistanceRoleLabel) {
          const badge = targetObject.document.createElement("span");
          badge.className = "andrews-route-board__route-badge";
          badge.dataset.routeResistanceRole = resistanceRole;
          badge.textContent = resistanceRoleLabel;
          topLine.appendChild(badge);
        }
        if (routeLoopLabel) {
          const loopBadge = targetObject.document.createElement("span");
          loopBadge.className = "andrews-route-board__route-badge";
          loopBadge.dataset.routeLoopState = routeLoopState;
          loopBadge.textContent = routeLoopLabel;
          topLine.appendChild(loopBadge);
        }
        const trail = targetObject.document.createElement("span");
        trail.className = "andrews-route-board__route-trail";
        trail.textContent = entry.routeLabel || route?.routeLabel || "";
        const meta = targetObject.document.createElement("span");
        meta.className = "andrews-route-board__route-meta";
        meta.textContent = buildAndrewsRouteBoardRouteMeta(entry, route, routeTicket);
        const routeTicketLabel = entry.routeTicketLabel || route?.routeTicketLabel || routeTicket?.label || "";
        const routeStopLabel = routeStops.map(stop => stop.label || stop.key).join(" > ");
        const routeAriaLabel = [button.dataset.routeActionLabel, routePathLabel || routeStopLabel || routeTicketLabel, meta.textContent].filter(Boolean).join(" · ");
        if (routeTicketLabel) {
          button.title = routeTicketLabel;
        }
        if (routeAriaLabel) {
          button.setAttribute("aria-label", routeAriaLabel);
        }
        button.append(topLine, trail, meta);
        appendAndrewsRouteBoardRouteConditions(button, routeConditionFrames);
        appendAndrewsRouteBoardRouteStops(button, routeStops);
        appendAndrewsRouteBoardDimensions(button, gateDomainCounts, {
          hypothesisFrame: board?.resistanceHypothesisFrame || null
        });
        button.addEventListener("click", () => {
          activateAndrewsRouteBoardTarget(entry, board);
        });
        list.appendChild(button);
      });
      parent.appendChild(list);
    }
    function renderAndrewsRouteBoard(verbMeta = null) {
      const container = targetObject.document.getElementById("andrews-route-board");
      if (!container) {
        return;
      }
      if (typeof targetObject.buildAndrewsCnvCnnRouteBoard !== "function") {
        container.hidden = true;
        return;
      }
      const rawInput = getAndrewsRouteBoardRawInput(verbMeta);
      const computedSourceStage = getAndrewsRouteBoardUiSourceStage(verbMeta, {
        rawInput
      });
      const sourceStage = AndrewsRouteBoardDestinationKey && AndrewsRouteBoardPinnedSourceStage ? AndrewsRouteBoardPinnedSourceStage : AndrewsRouteBoardSourceOverrideStage || computedSourceStage;
      const baseBoard = targetObject.buildAndrewsCnvCnnRouteBoard({
        sourceStage
      });
      const destinationOption = (baseBoard.destinationOptions || []).find(entry => entry.key === AndrewsRouteBoardDestinationKey);
      if (AndrewsRouteBoardDestinationKey && !destinationOption) {
        AndrewsRouteBoardDestinationKey = "";
        clearAndrewsRouteBoardPinnedJourney({
          clearDestination: false
        });
      }
      const board = targetObject.buildAndrewsCnvCnnRouteBoard({
        sourceStage,
        destinationStage: destinationOption?.stage || null
      });
      container.hidden = false;
      container.replaceChildren();
      const header = targetObject.document.createElement("div");
      header.className = "andrews-route-board__header";
      const stationRail = targetObject.document.createElement("div");
      stationRail.className = "andrews-route-board__station-rail";
      appendAndrewsRouteBoardPill(stationRail, "Estacion", board.currentStation?.label || "");
      if (board.currentStation?.inputTicketFrame?.inputDisplayLabel) {
        appendAndrewsRouteBoardPill(stationRail, "Entrada", board.currentStation.inputTicketFrame.inputDisplayLabel);
      }
      const networkLabel = buildAndrewsRouteBoardNetworkLabel(board);
      if (networkLabel) {
        appendAndrewsRouteBoardPill(stationRail, "Red", networkLabel);
      }
      if (Array.isArray(board.sourceCandidateStageLabels) && board.sourceCandidateStageLabels.length > 1) {
        appendAndrewsRouteBoardPill(stationRail, "Capas", board.sourceCandidateStageLabels.join(" / "));
      }
      if (board.currentStation?.formulaBoundaryKind) {
        appendAndrewsRouteBoardPill(stationRail, "Marco", getAndrewsRouteBoardBoundaryKindLabel(board.currentStation.formulaBoundaryKind));
      }
      if (board.currentStation?.formulaBoundaryConfidence) {
        appendAndrewsRouteBoardPill(stationRail, "Lectura", getAndrewsRouteBoardBoundaryConfidenceLabel(board.currentStation.formulaBoundaryConfidence));
      }
      if (board.destinationStation?.label) {
        appendAndrewsRouteBoardPill(stationRail, "Destino", board.destinationStation.label);
      }
      const destinationWrap = targetObject.document.createElement("label");
      destinationWrap.className = "andrews-route-board__destination";
      const destinationLabel = targetObject.document.createElement("span");
      destinationLabel.textContent = "Destino";
      const destinationSelect = targetObject.document.createElement("select");
      destinationSelect.className = "andrews-route-board__destination-select";
      const emptyOption = targetObject.document.createElement("option");
      emptyOption.value = "";
      emptyOption.textContent = "Salidas";
      destinationSelect.appendChild(emptyOption);
      const recommendedDestinationKey = baseBoard.recommendedRoute?.nextSourceStageKey || "";
      const recommendedDestinationActionLabel = baseBoard.recommendedRoute?.actionLabel || "Siguiente";
      (baseBoard.destinationOptions || []).forEach(entry => {
        const option = targetObject.document.createElement("option");
        option.value = entry.key;
        const destinationActionFrame = entry.destinationActionFrame && typeof entry.destinationActionFrame === "object" ? entry.destinationActionFrame : entry.routeActionFrame && typeof entry.routeActionFrame === "object" ? entry.routeActionFrame : null;
        const destinationRecommendationRole = entry.key && entry.key === recommendedDestinationKey ? "next" : "alternate";
        const resolvedDestinationRecommendationRole = destinationActionFrame?.recommendationRole || destinationRecommendationRole;
        const destinationActionLabel = destinationActionFrame?.actionLabel || (resolvedDestinationRecommendationRole === "next" ? recommendedDestinationActionLabel : "Explorar");
        const destinationLoopState = getAndrewsRouteBoardRouteLoopState(entry, null, baseBoard);
        const destinationLoopCount = getAndrewsRouteBoardRouteLoopCount(entry, null, baseBoard);
        const destinationLoopLabel = getAndrewsRouteBoardLoopStateLabel(destinationLoopState, destinationLoopCount);
        option.textContent = buildAndrewsRouteBoardDestinationOptionLabel(entry, {
          actionLabel: destinationActionLabel
        });
        if (destinationLoopLabel) {
          option.textContent = [option.textContent, destinationLoopLabel].filter(Boolean).join(" · ");
        }
        const routeStops = Array.isArray(entry.routeStops) ? entry.routeStops : [];
        const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
        option.dataset.routeOptionLabel = option.textContent;
        option.dataset.routePathLabel = routePathLabel;
        option.dataset.routeSource = routeStops[0]?.key || "";
        option.dataset.routeSourceLabel = routeStops[0]?.label || "";
        option.dataset.routeDestinationLabel = entry.label || entry.targetLabel || entry.nextSourceLabel || "";
        option.dataset.routeRecommendation = resolvedDestinationRecommendationRole;
        option.dataset.routeActionLabel = destinationActionLabel;
        option.dataset.routeLoopState = destinationLoopState;
        option.dataset.routeLoopLabel = destinationLoopLabel;
        option.dataset.routeLoopCount = String(destinationLoopCount || 0);
        option.dataset.routeNextSource = entry.nextSourceStageKey || entry.routeTicket?.nextSourceStageKey || entry.key || "";
        option.dataset.routeIds = Array.isArray(entry.routeIds) ? entry.routeIds.join("|") : "";
        option.dataset.routeStops = routeStops.length ? routeStops.map(stop => stop?.key || stop?.label || "").filter(Boolean).join("|") : "";
        const destinationConditionFrames = getAndrewsRouteBoardRouteConditionFrames(entry, null, entry.routeTicket || null);
        option.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(destinationConditionFrames);
        option.dataset.routeIfStage = destinationConditionFrames[0]?.sourceKey || destinationConditionFrames[0]?.ifStage?.key || "";
        option.dataset.routeThenStage = destinationConditionFrames[destinationConditionFrames.length - 1]?.targetKey || destinationConditionFrames[destinationConditionFrames.length - 1]?.thenStage?.key || "";
        option.dataset.routeGateDomains = serializeAndrewsRouteBoardGateDomains(entry.gateDomainCounts || entry.routeTicket?.gateDomainCounts || []);
        option.dataset.routeSegmentCount = String(entry.segmentCount || entry.routeTicket?.segmentCount || 1);
        option.dataset.routeTransferCount = String(entry.transferCount || entry.routeTicket?.transferCount || 0);
        option.dataset.routeTripKind = entry.tripKind || entry.routeTicket?.tripKind || "";
        option.dataset.routeHiddenCoordinateCount = String(entry.hiddenCoordinateCount || entry.routeTicket?.hiddenCoordinateCount || 0);
        option.dataset.routeResistanceScore = String(entry.resistanceScore || entry.routeTicket?.resistanceScore || 0);
        option.dataset.routeObstacleCount = String(entry.obstacleCount || entry.routeTicket?.obstacleCount || 0);
        option.dataset.routeResistanceRank = String(entry.resistanceRank || entry.routeTicket?.resistanceRank || 0);
        if (entry.routeTicketLabel || entry.routeTicket?.label || destinationActionLabel) {
          option.title = [destinationActionLabel, entry.routeTicketLabel || entry.routeTicket?.label || ""].filter(Boolean).join(" · ");
        }
        destinationSelect.appendChild(option);
      });
      destinationSelect.value = AndrewsRouteBoardDestinationKey;
      destinationSelect.addEventListener("change", () => {
        AndrewsRouteBoardDestinationKey = destinationSelect.value || "";
        if (!AndrewsRouteBoardDestinationKey) {
          clearAndrewsRouteBoardPinnedJourney({
            clearDestination: false
          });
          renderAndrewsRouteBoard();
          return;
        }
        if (AndrewsRouteBoardDestinationKey) {
          AndrewsRouteBoardPinnedSourceInput = rawInput;
          AndrewsRouteBoardPinnedSourceStage = sourceStage;
          const selectedDestinationOption = (baseBoard.destinationOptions || []).find(entry => entry.key === AndrewsRouteBoardDestinationKey);
          const selectedBoard = targetObject.buildAndrewsCnvCnnRouteBoard({
            sourceStage,
            destinationStage: selectedDestinationOption?.stage || null
          });
          const selectedRoute = Array.isArray(selectedBoard.visibleRoutes) ? selectedBoard.visibleRoutes[0] : null;
          if (selectedRoute) {
            activateAndrewsRouteBoardTarget(selectedRoute, selectedBoard);
            return;
          }
        }
        renderAndrewsRouteBoard();
      });
      destinationWrap.append(destinationLabel, destinationSelect);
      header.append(stationRail, destinationWrap);
      container.appendChild(header);
      appendAndrewsRouteBoardGeographyMap(container, board, {
        baseBoard,
        sourceStage,
        rawInput
      });
      appendAndrewsRouteBoardConcourse(container, board);
      appendAndrewsRouteBoardPlatforms(container, board);
      appendAndrewsRouteBoardStationLine(container, board);
      appendAndrewsRouteBoardSourceLayers(container, board);
      appendAndrewsRouteBoardRideFrame(container, board);
      appendAndrewsRouteBoardPassengerFrame(container, board);
      appendAndrewsRouteBoardInputTicketDimensions(container, board);
      appendAndrewsRouteBoardResistancePlan(container, board);
      appendAndrewsRouteBoardResistanceHypothesis(container, board);
      const body = targetObject.document.createElement("div");
      body.className = "andrews-route-board__body";
      renderAndrewsRouteBoardJourneyReceipt(body, board);
      renderAndrewsRouteBoardJourneyHistory(body, board);
      renderAndrewsRouteBoardContinuedJourneyReceipt(body, board);
      const boardLabel = targetObject.document.createElement("div");
      boardLabel.className = "andrews-route-board__label";
      boardLabel.textContent = board.boardState === "destination" ? "Trayecto" : "Salidas";
      body.appendChild(boardLabel);
      renderAndrewsRouteBoardRouteList(body, board);
      container.appendChild(body);
      container.dataset.boardState = board.boardState || "";
      container.dataset.currentStation = board.currentStation?.key || "";
      container.dataset.sourceOverrideActive = String(Boolean(AndrewsRouteBoardSourceOverrideStage));
      container.dataset.sourceInputKind = board.currentStation?.inputKind || "";
      container.dataset.sourceInputScope = board.currentStation?.inputScope || "";
      container.dataset.sourceInputHasWildcard = String(board.currentStation?.inputHasWildcard === true);
      container.dataset.sourceCandidateStageCount = String(board.sourceCandidateStageCount || 0);
      container.dataset.sourceCandidateStageKeys = Array.isArray(board.sourceCandidateStageKeys) ? board.sourceCandidateStageKeys.join("|") : "";
      container.dataset.sourceCandidateStageLabels = Array.isArray(board.sourceCandidateStageLabels) ? board.sourceCandidateStageLabels.join("|") : "";
      container.dataset.sourceCandidateStages = serializeAndrewsRouteBoardSourceLayers(board.sourceCandidateStages || []);
      const activeSourceLayer = getAndrewsRouteBoardActiveSourceLayer(board);
      container.dataset.sourceLayerModel = "formula-source-layers-route-board";
      container.dataset.sourceLayerCount = String(board.sourceCandidateStageCount || 0);
      container.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(board.sourceCandidateStages || []);
      container.dataset.sourceLayerActiveStation = activeSourceLayer.key || "";
      container.dataset.sourceLayerActiveRole = activeSourceLayer.role || "";
      container.dataset.sourceFormulaBoundaryKind = board.currentStation?.formulaBoundaryKind || "";
      container.dataset.sourceFormulaBoundaryConfidence = board.currentStation?.formulaBoundaryConfidence || "";
      container.dataset.sourceUnresolvedDimensionCount = String(board.currentStation?.unresolvedDimensionCount || 0);
      container.dataset.sourceInputTicketModel = board.currentStation?.inputTicketFrame?.ticketModel || "";
      container.dataset.sourceInputTicketValue = board.currentStation?.inputTicketFrame?.inputValue || "";
      container.dataset.sourceInputTicketDisplay = board.currentStation?.inputTicketFrame?.inputDisplayLabel || "";
      container.dataset.sourceInputTicketEvents = Array.isArray(board.currentStation?.inputTicketFrame?.passengerEvents) ? board.currentStation.inputTicketFrame.passengerEvents.join("|") : "";
      container.dataset.sourceInputTicketDimensions = serializeAndrewsRouteBoardTicketDimensions(board.currentStation?.inputTicketFrame?.dimensionSlots || []);
      container.dataset.stationLineModel = board.stationLineFrame?.lineModel || "";
      container.dataset.stationLineIntentMode = board.stationLineFrame?.intentMode || "";
      container.dataset.stationLineActiveStop = board.stationLineFrame?.activeStopId || "";
      container.dataset.stationLineStops = serializeAndrewsRouteBoardStationLineStops(board.stationLineFrame?.stops || []);
      container.dataset.stationLineRouteKey = board.stationLineFrame?.routeKey || "";
      container.dataset.routeMapModel = "andrews-geography-route-lines";
      container.dataset.routeMapTerrain = "formula-boundary-stem-rank-route-slots-function-use";
      container.dataset.routeMapAvailableRouteIds = getAndrewsRouteBoardMapRouteIds(board, "available").join("|");
      container.dataset.routeMapVisibleRouteIds = getAndrewsRouteBoardMapRouteIds(board, "visible").join("|");
      container.dataset.routeMapActiveRouteIds = getAndrewsRouteBoardMapRouteIds(board, "active").join("|");
      const boardPrimaryRoutePathLabel = board.passengerFrame?.primaryRoutePathLabel || board.recommendedRoute?.routePathLabel || board.recommendedRoute?.routeTicket?.routePathLabel || board.leastVisibleRoute?.routePathLabel || board.leastVisibleRoute?.routeTicket?.routePathLabel || "";
      container.dataset.routePathLabel = boardPrimaryRoutePathLabel;
      container.dataset.concourseModel = board.concourseFrame?.concourseModel || "";
      container.dataset.concourseLineModel = board.concourseFrame?.lineModel || "";
      container.dataset.concourseStops = serializeAndrewsRouteBoardConcourseStops(board.concourseFrame?.stops || []);
      container.dataset.concourseNextStation = board.concourseFrame?.nextStationKey || "";
      container.dataset.concourseDestinationStation = board.concourseFrame?.destinationKey || "";
      container.dataset.concourseRouteKey = board.concourseFrame?.routeKey || "";
      container.dataset.platformModel = board.platformFrame?.platformModel || "";
      container.dataset.platformTracks = serializeAndrewsRouteBoardPlatformTracks(board.platformFrame?.tracks || []);
      container.dataset.platformVisibleTrackCount = String(board.platformFrame?.visibleTrackCount || 0);
      container.dataset.platformRecommendedRouteIds = Array.isArray(board.platformFrame?.recommendedRouteIds) ? board.platformFrame.recommendedRouteIds.join("|") : "";
      container.dataset.rideExperienceModel = board.rideFrame?.experienceModel || "";
      container.dataset.rideOutputJourneyModel = board.rideFrame?.outputJourneyModel || "";
      container.dataset.rideOperatingPrinciple = board.rideFrame?.operatingPrinciple || "";
      container.dataset.rideChoiceModel = board.rideFrame?.choiceModel || "";
      container.dataset.rideCurrentSignLabel = board.rideFrame?.currentSignLabel || "";
      container.dataset.rideNextSignLabel = board.rideFrame?.nextSignLabel || "";
      container.dataset.rideDestinationSignLabel = board.rideFrame?.destinationSignLabel || "";
      container.dataset.ridePrimaryRoutePathLabel = board.rideFrame?.primaryRoutePathLabel || "";
      container.dataset.ridePrimaryClickCount = String(board.rideFrame?.decisionLoad?.primaryClickCount || 0);
      container.dataset.rideSwitchingRequired = String(board.rideFrame?.decisionLoad?.switchingRequired === true);
      container.dataset.rideEvents = Array.isArray(board.rideFrame?.passengerEvents) ? board.rideFrame.passengerEvents.join("|") : "";
      container.dataset.destinationStation = board.destinationStation?.key || "";
      container.dataset.routeCount = String(board.routeCount || 0);
      container.dataset.hiddenCoordinateCount = String(board.hiddenCoordinateCount || 0);
      container.dataset.averageRouteStageClicks = String(board.averageRouteStageClicks || 0);
      container.dataset.maxRouteStageClicks = String(board.maxRouteStageClicks || 0);
      container.dataset.networkLabel = networkLabel;
      container.dataset.passengerIntention = board.passengerFrame?.currentIntention || "";
      container.dataset.passengerIntentionModel = board.passengerFrame?.intentionFrame?.intentionModel || "";
      container.dataset.passengerRouteProvisionMode = board.passengerFrame?.intentionFrame?.routeProvisionMode || "";
      container.dataset.passengerSharedRouteBoard = String(board.passengerFrame?.intentionFrame?.sharedRouteBoard === true);
      container.dataset.passengerIntentionSwitchRequired = String(board.passengerFrame?.intentionFrame?.intentionSwitchRequired === true);
      container.dataset.passengerIntentions = serializeAndrewsRouteBoardIntentions(board.passengerFrame?.intentionFrame);
      container.dataset.passengerPrimaryActionLabel = board.passengerFrame?.primaryActionLabel || "";
      container.dataset.passengerPrimaryRoutePathLabel = boardPrimaryRoutePathLabel;
      container.dataset.passengerExploreOptionCount = String(board.passengerFrame?.exploreOptionCount || 0);
      container.dataset.passengerDestinationOptionCount = String(board.passengerFrame?.destinationOptionCount || 0);
      container.dataset.passengerEvents = Array.isArray(board.passengerFrame?.passengerEvents) ? board.passengerFrame.passengerEvents.join("|") : "";
      container.dataset.leastVisibleRouteIds = Array.isArray(board.leastVisibleRoute?.routeIds) ? board.leastVisibleRoute.routeIds.join("|") : "";
      container.dataset.leastVisibleResistanceScore = String(board.leastVisibleRoute?.resistanceScore || 0);
      container.dataset.recommendedRouteIds = Array.isArray(board.recommendedRoute?.routeIds) ? board.recommendedRoute.routeIds.join("|") : "";
      container.dataset.recommendedRouteActionLabel = board.recommendedRoute?.actionLabel || "";
      container.dataset.recommendedRouteNextSource = board.recommendedRoute?.nextSourceStageKey || "";
      container.dataset.recommendedRoutePathLabel = board.recommendedRoute?.routePathLabel || board.recommendedRoute?.routeTicket?.routePathLabel || "";
      container.dataset.recommendedRouteResistanceScore = String(board.recommendedRoute?.resistanceScore || 0);
      container.dataset.mostVisibleRouteIds = Array.isArray(board.mostVisibleRoute?.routeIds) ? board.mostVisibleRoute.routeIds.join("|") : "";
      container.dataset.mostVisibleResistanceScore = String(board.mostVisibleRoute?.resistanceScore || 0);
      container.dataset.leastResistanceRoute = board.leastResistanceRoute?.routeId || "";
      container.dataset.mostResistanceRoute = board.mostResistanceRoute?.routeId || "";
      container.dataset.resistanceAlpha = String(board.resistanceAlpha || "");
      container.dataset.resistanceConversionFromRoute = board.resistanceConversionPlan?.fromRouteId || "";
      container.dataset.resistanceConversionToRoute = board.resistanceConversionPlan?.toRouteId || "";
      container.dataset.resistanceConversionFromRouteLabel = board.resistanceConversionPlan?.fromRouteLabel || "";
      container.dataset.resistanceConversionToRouteLabel = board.resistanceConversionPlan?.toRouteLabel || "";
      container.dataset.resistanceConversionScoreReduction = String(board.resistanceConversionPlan?.scoreReductionNeeded || 0);
      container.dataset.resistanceConversionObstacleReduction = String(board.resistanceConversionPlan?.obstacleReductionNeeded || 0);
      container.dataset.resistanceConversionActionEvents = Array.isArray(board.resistanceConversionPlan?.blockActions) ? board.resistanceConversionPlan.blockActions.map(entry => entry.eventFeature || "").filter(Boolean).join("|") : "";
      const resistanceHypothesis = board.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object" ? board.resistanceHypothesisFrame : {};
      const primaryHypothesis = resistanceHypothesis.primaryCandidateObstacle || resistanceHypothesis.primaryTest || resistanceHypothesis.highResistanceGateTest || {};
      container.dataset.resistanceHypothesisDecision = resistanceHypothesis.nullHypothesisDecision || "";
      container.dataset.resistanceHypothesisTestId = primaryHypothesis.hypothesisTestId || "";
      container.dataset.resistanceHypothesisKey = primaryHypothesis.key || "";
      container.dataset.resistanceHypothesisCandidate = resistanceHypothesis.primaryCandidateObstacle?.key || "";
      container.dataset.resistanceHypothesisDomains = Array.isArray(primaryHypothesis.domains) ? primaryHypothesis.domains.join("+") : "";
      container.dataset.resistanceHypothesisPValue = primaryHypothesis.pValue === null || primaryHypothesis.pValue === undefined ? "" : String(primaryHypothesis.pValue);
      container.dataset.resistanceHypothesisQValue = primaryHypothesis.qValue === null || primaryHypothesis.qValue === undefined ? "" : String(primaryHypothesis.qValue);
      container.dataset.resistanceHypothesisAlpha = String(resistanceHypothesis.alpha || primaryHypothesis.alpha || "");
      container.dataset.resistanceHypothesisRejectsNull = String(primaryHypothesis.rejectsNullHypothesis === true);
      container.dataset.resistanceHypothesisAction = resistanceHypothesis.recommendedAction || primaryHypothesis.action || "";
      container.dataset.resistanceHypothesisActionLabel = getAndrewsRouteBoardHypothesisActionLabel(primaryHypothesis, resistanceHypothesis);
      const activeJourney = getAndrewsRouteBoardActiveJourneyForBoard(board);
      const continuedJourney = getAndrewsRouteBoardContinuedJourneyForBoard(board);
      const journeyHistory = getAndrewsRouteBoardJourneyHistoryForBoard(board);
      container.dataset.activeJourneyRouteIds = Array.isArray(activeJourney?.routeIds) ? activeJourney.routeIds.join("|") : "";
      container.dataset.activeJourneyStops = Array.isArray(activeJourney?.routeStops) ? activeJourney.routeStops.map(stop => stop.key || stop.label).join("|") : "";
      container.dataset.activeJourneyRoutePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(activeJourney);
      container.dataset.activeJourneyGateDomains = Array.isArray(activeJourney?.gateDomainCounts) ? serializeAndrewsRouteBoardGateDomains(activeJourney.gateDomainCounts) : "";
      const activeJourneyConditionFrames = Array.isArray(activeJourney?.routeConditionFrames) ? activeJourney.routeConditionFrames : [];
      container.dataset.activeJourneyConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(activeJourneyConditionFrames);
      container.dataset.activeJourneyIfStage = activeJourneyConditionFrames[0]?.sourceKey || activeJourneyConditionFrames[0]?.ifStage?.key || "";
      container.dataset.activeJourneyThenStage = activeJourneyConditionFrames[activeJourneyConditionFrames.length - 1]?.targetKey || activeJourneyConditionFrames[activeJourneyConditionFrames.length - 1]?.thenStage?.key || "";
      container.dataset.activeJourneyResistanceScore = String(activeJourney?.resistanceScore || 0);
      container.dataset.activeJourneyResistanceRole = activeJourney?.resistanceRole || "";
      container.dataset.nextSourceStation = activeJourney?.nextSourceKey || "";
      container.dataset.nextSourceEntryBoard = activeJourney?.nextSourceEntryBoard || "";
      container.dataset.nextSourceUnitMode = activeJourney?.nextSourceUnitMode || "";
      container.dataset.journeyHistoryLegCount = String(journeyHistory.length);
      container.dataset.journeyHistoryRouteIds = journeyHistory.map(journey => Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "").filter(Boolean).join("||");
      container.dataset.journeyHistoryStations = journeyHistory.map(journey => [journey.sourceKey || "", journey.destinationKey || ""].filter(Boolean).join(">")).filter(Boolean).join("|");
      container.dataset.journeyHistoryRoutePaths = journeyHistory.map(journey => getAndrewsRouteBoardJourneyRoutePathLabel(journey)).filter(Boolean).join("|");
      container.dataset.continuedJourneyRouteIds = Array.isArray(continuedJourney?.routeIds) ? continuedJourney.routeIds.join("|") : "";
      container.dataset.continuedJourneyRoutePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(continuedJourney);
      container.dataset.continuedJourneyFromStation = continuedJourney?.sourceKey || "";
      container.dataset.continuedJourneyToStation = continuedJourney?.destinationKey || "";
      const continuedJourneyConditionFrames = Array.isArray(continuedJourney?.routeConditionFrames) ? continuedJourney.routeConditionFrames : [];
      container.dataset.continuedJourneyConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(continuedJourneyConditionFrames);
      container.dataset.continuedJourneyIfStage = continuedJourneyConditionFrames[0]?.sourceKey || continuedJourneyConditionFrames[0]?.ifStage?.key || "";
      container.dataset.continuedJourneyThenStage = continuedJourneyConditionFrames[continuedJourneyConditionFrames.length - 1]?.targetKey || continuedJourneyConditionFrames[continuedJourneyConditionFrames.length - 1]?.thenStage?.key || "";
    }
    function renderTenseTabs() {
      const container = targetObject.document.getElementById("tense-tabs");
      if (!container) {
        return;
      }
      const outputUniversalContainer = targetObject.document.getElementById("output-universal-tabs");
      const outputControlsContainer = targetObject.document.getElementById("output-result-controls");
      const focusState = targetObject.captureTenseTabsFocusState(container) || targetObject.captureTenseTabsFocusState(outputUniversalContainer);
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      targetObject.updateTenseModeTabs();
      const currentCombinedMode = targetObject.getCombinedMode();
      const isNonactiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo && currentCombinedMode === targetObject.COMBINED_MODE.nonactive;
      targetObject.document.body.classList.toggle("is-nonactive-mode", isNonactiveMode);
      const verbMeta = targetObject.getVerbInputMeta();
      const verb = verbMeta.verb;
      const analysisVerb = verbMeta.analysisVerb || verb;
      const displayVerb = verbMeta.displayVerb;
      targetObject.renderDerivationAntiderivativePanel(verbMeta);
      let suppletiveStemSet = targetObject.getSuppletiveStemSet(verbMeta);
      const isWitzInput = verbMeta.rawAnalysisVerb === "witz" || verbMeta.analysisVerb === "witz" || verbMeta.verb === "witz";
      const endsWithConsonant = verb !== "" && !targetObject.VOWEL_END_RE.test(verb) && !isWitzInput;
      const hasVerb = verb !== "" && targetObject.VOWEL_RE.test(verb);
      const tenseMode = targetObject.getActiveTenseMode();
      renderAndrewsFormulaWorkbench();
      renderAndrewsRouteBoard(verbMeta);
      if (tenseMode === targetObject.TENSE_MODE.particula) {
        container.innerHTML = "";
        targetObject.TenseTabsDomSignature = "particula";
        if (outputUniversalContainer) {
          outputUniversalContainer.innerHTML = "";
          outputUniversalContainer.hidden = true;
        }
        if (outputControlsContainer) {
          outputControlsContainer.hidden = true;
        }
        syncVerbSourceScopeControl();
        return;
      }
      const sourceScope = targetObject.getVerbSourceScope();
      const nonactiveSuffixOptionMap = tenseMode === targetObject.TENSE_MODE.verbo ? resolveNonactiveSuffixOptionMap({
        verbMeta,
        verb,
        analysisVerb
      }) : new Map();
      const selectedNonactiveSuffix = tenseMode === targetObject.TENSE_MODE.verbo ? normalizeSelectedNonactiveSuffix(nonactiveSuffixOptionMap) : null;
      const allowedTensesRaw = targetObject.getTenseOrderForMode(tenseMode);
      const allowedTenses = filterTenseOrderForUiDensity(allowedTensesRaw, tenseMode);
      const isNominalMode = targetObject.isNominalTenseMode(tenseMode);
      const nounActiveTenses = isNominalMode ? targetObject.getNounTenseOrderForCombinedMode(targetObject.COMBINED_MODE.active, tenseMode) : [];
      const nounNonactiveTenses = isNominalMode ? targetObject.getNounTenseOrderForCombinedMode(targetObject.COMBINED_MODE.nonactive, tenseMode) : [];
      const nounVisibleTenses = isNominalMode ? sourceScope === targetObject.VERB_SOURCE_SCOPE.active ? nounActiveTenses : sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive ? nounNonactiveTenses : Array.from(new Set([...nounActiveTenses, ...nounNonactiveTenses])) : [];
      const blockedNominalTenseSet = (() => {
        if (tenseMode !== targetObject.TENSE_MODE.adjetivo || !hasVerb) {
          return new Set();
        }
        if (targetObject.getBaseObjectSlots(verbMeta) <= 0) {
          return new Set();
        }
        return new Set(nounVisibleTenses.filter(tenseValue => targetObject.isIntransitiveOnlyActiveAdjectiveTense(tenseValue)));
      })();
      const dualSourceNominalTenses = new Set(["patientivo"]);
      const nonactiveNominalSet = new Set(nounNonactiveTenses);
      const activeColumnTenses = isNominalMode ? nounActiveTenses.filter(tenseValue => !nonactiveNominalSet.has(tenseValue) || dualSourceNominalTenses.has(tenseValue)) : [];
      const visibleTenses = isNominalMode ? nounVisibleTenses : allowedTenses;
      const verbSemanticGroups = !isNominalMode && tenseMode === targetObject.TENSE_MODE.verbo ? targetObject.getVerbSemanticTenseGroups(visibleTenses) : [];
      const modeGroups = buildFormalReroutedFunctionTenseGroups(tenseMode, visibleTenses) || targetObject.TENSE_LINGUISTIC_GROUPS[tenseMode] || targetObject.TENSE_LINGUISTIC_GROUPS.verbo;
      const visibleTenseSet = new Set(visibleTenses);
      let requestedSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
        tenseMode
      });
      const selectedTenseValue = requestedSelectionState.tenseValue;
      if (!visibleTenseSet.has(selectedTenseValue) || blockedNominalTenseSet.has(selectedTenseValue)) {
        requestedSelectionState = {
          ...requestedSelectionState,
          tenseValue: visibleTenses.find(tenseValue => !blockedNominalTenseSet.has(tenseValue)) || allowedTenses.find(tenseValue => !blockedNominalTenseSet.has(tenseValue)) || targetObject.TENSE_ORDER.find(tenseValue => !blockedNominalTenseSet.has(tenseValue)) || visibleTenses[0] || allowedTenses[0] || targetObject.TENSE_ORDER[0]
        };
      }
      const shouldShowUniversalTabs = tenseMode === targetObject.TENSE_MODE.verbo;
      const shouldComputeUniversalAvailability = shouldShowUniversalTabs && targetObject.VerbRenderContext !== "typing";
      let availability = shouldShowUniversalTabs ? targetObject.PreteritoUniversalAvailabilityCache : [];
      if (shouldShowUniversalTabs) {
        const needsAvailabilityCompute = shouldComputeUniversalAvailability || !Array.isArray(availability) || availability.length !== targetObject.PRETERITO_UNIVERSAL_ORDER.length;
        if (needsAvailabilityCompute) {
          const isTransitive = targetObject.isObj1ValencyFilled(targetObject.getCurrentObjectPrefix(), verbMeta);
          const derivationType = verbMeta.derivationType || targetObject.getActiveDerivationType();
          let availabilityTargets = [{
            verb,
            analysisVerb,
            isYawi: verbMeta.isYawi,
            isWeya: verbMeta.isWeya
          }];
          if (derivationType === targetObject.DERIVATION_TYPE.causative) {
            const causativeDerivation = targetObject.applyCausativeDerivation({
              isCausative: true,
              verb,
              analysisVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix(),
              parsedVerb: verbMeta,
              directionalPrefix: verbMeta.directionalPrefix,
              isYawi: verbMeta.isYawi,
              suppletiveStemSet
            });
            if (causativeDerivation.noCausativeStem) {
              availabilityTargets = [];
            } else {
              const stems = Array.isArray(causativeDerivation.causativeAllStems) && causativeDerivation.causativeAllStems.length ? causativeDerivation.causativeAllStems : [causativeDerivation.verb];
              availabilityTargets = stems.map(stem => {
                let stemAnalysis = stem;
                if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                  stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                }
                return {
                  verb: stem,
                  analysisVerb: stemAnalysis,
                  isYawi: causativeDerivation.isYawi,
                  isWeya: false
                };
              });
              suppletiveStemSet = causativeDerivation.suppletiveStemSet;
            }
          } else if (derivationType === targetObject.DERIVATION_TYPE.applicative) {
            const applicativeDerivation = targetObject.applyApplicativeDerivation({
              isApplicative: true,
              verb,
              analysisVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix(),
              parsedVerb: verbMeta,
              directionalPrefix: verbMeta.directionalPrefix,
              isYawi: verbMeta.isYawi,
              suppletiveStemSet
            });
            if (applicativeDerivation.noApplicativeStem) {
              availabilityTargets = [];
            } else {
              const stems = Array.isArray(applicativeDerivation.applicativeAllStems) && applicativeDerivation.applicativeAllStems.length ? applicativeDerivation.applicativeAllStems : [applicativeDerivation.verb];
              availabilityTargets = stems.map(stem => {
                let stemAnalysis = stem;
                if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                  stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                }
                return {
                  verb: stem,
                  analysisVerb: stemAnalysis,
                  isYawi: applicativeDerivation.isYawi,
                  isWeya: false
                };
              });
              suppletiveStemSet = applicativeDerivation.suppletiveStemSet;
            }
          }
          const canResolveClassPolicy = typeof targetObject.buildPretUniversalContext === "function" && typeof targetObject.getPretUniversalVariantsByClass === "function" && typeof targetObject.resolvePretClassPolicy === "function";
          const subjectSuffixes = ["", "t"];
          const baseObjectPrefix = targetObject.getCurrentObjectPrefix();
          const resolveAllowedClassesForTarget = target => {
            const allowed = new Set();
            if (suppletiveStemSet && suppletiveStemSet.variantsByClass) {
              suppletiveStemSet.variantsByClass.forEach((variants, classKey) => {
                if (variants && variants.length) {
                  allowed.add(classKey);
                }
              });
              return allowed;
            }
            if (!target || !canResolveClassPolicy) {
              return allowed;
            }
            const analysisVerbTarget = target.analysisVerb || target.verb || "";
            const forceClassBOnly = targetObject.shouldForceClassBOnlyForVerbMode({
              tenseMode,
              combinedMode: currentCombinedMode
            });
            const contextOptions = typeof targetObject.buildPretContextOptionsFromMeta === "function" ? targetObject.buildPretContextOptionsFromMeta(verbMeta, {
              isYawi: target.isYawi,
              isWeya: target.isWeya,
              derivationType,
              forceClassBOnly
            }) : {
              isYawi: target.isYawi,
              isWeya: target.isWeya,
              hasSlashMarker: verbMeta.hasSlashMarker,
              hasSuffixSeparator: verbMeta.hasSuffixSeparator,
              hasLeadingDash: verbMeta.hasLeadingDash,
              hasBoundMarker: verbMeta.hasBoundMarker,
              hasCompoundMarker: verbMeta.hasCompoundMarker,
              hasImpersonalTaPrefix: verbMeta.hasImpersonalTaPrefix,
              hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
              hasNonspecificValence: targetObject.resolveHasNonspecificValence(verbMeta),
              exactBaseVerb: verbMeta.exactBaseVerb || "",
              rootPlusYaBase: verbMeta.rootPlusYaBase,
              rootPlusYaBasePronounceable: verbMeta.rootPlusYaBasePronounceable,
              derivationType,
              forceClassBOnly
            };
            const context = targetObject.buildPretUniversalContext(target.verb, analysisVerbTarget, isTransitive, contextOptions);
            if (!context) {
              return allowed;
            }
            const variantsByClass = targetObject.getPretUniversalVariantsByClass(context);
            if (!variantsByClass || !variantsByClass.size) {
              return allowed;
            }
            const hasClassA = variantsByClass.has("A");
            const hasClassB = variantsByClass.has("B");
            variantsByClass.forEach((variants, classKey) => {
              if (!variants || !variants.length) {
                return;
              }
              if (classKey !== "A" && classKey !== "B") {
                allowed.add(classKey);
                return;
              }
              const allowsForAnySuffix = subjectSuffixes.some(suffix => {
                const policy = targetObject.resolvePretClassPolicy({
                  context,
                  tense: "preterito",
                  isTransitive,
                  classFilter: classKey,
                  baseObjectPrefix,
                  hasClassA,
                  hasClassB,
                  allowAllClasses: false,
                  subjectSuffix: suffix
                });
                if (!policy) {
                  return true;
                }
                if (classKey === "A") {
                  return !policy.shouldSkipClassA;
                }
                return !policy.shouldSkipClassB && !policy.shouldMaskClassBSelection;
              });
              if (allowsForAnySuffix) {
                allowed.add(classKey);
              }
            });
            return allowed;
          };
          const allowedClasses = new Set();
          if (hasVerb) {
            if (suppletiveStemSet) {
              resolveAllowedClassesForTarget(null).forEach(classKey => allowedClasses.add(classKey));
            } else if (availabilityTargets.length) {
              availabilityTargets.forEach(target => {
                resolveAllowedClassesForTarget(target).forEach(classKey => allowedClasses.add(classKey));
              });
            }
          }
          if (!canResolveClassPolicy && availabilityTargets.length) {
            availabilityTargets.forEach(target => {
              targetObject.PRETERITO_UNIVERSAL_ORDER.forEach(tenseValue => {
                const variants = targetObject.getPretUniversalVariants(target.verb, tenseValue, isTransitive, target.analysisVerb, targetObject.buildPretVariantsOptionsFromMeta(verbMeta, {
                  isYawi: target.isYawi,
                  isWeya: target.isWeya,
                  derivationType
                }));
                if (variants && variants.length) {
                  const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
                  if (classKey) {
                    allowedClasses.add(classKey);
                  }
                }
              });
            });
          }
          availability = targetObject.PRETERITO_UNIVERSAL_ORDER.map(tenseValue => {
            const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            const isAvailable = hasVerb && !!(classKey && allowedClasses.has(classKey));
            return buildTenseAvailabilityRecord({
              tenseValue,
              combinedMode: targetObject.COMBINED_MODE.active,
              source: "pret-universal-class",
              available: isAvailable,
              hasOutput: isAvailable
            });
          });
          targetObject.PreteritoUniversalAvailabilityCache = availability;
        }
      } else {
        targetObject.PreteritoUniversalAvailabilityCache = [];
        availability = [];
      }
      const selectionState = targetObject.resolveConjugationSelectionState(requestedSelectionState, {
        tenseMode,
        availabilityEntries: availability
      });
      const rawSelectionState = targetObject.buildConjugationSelectionState({
        tenseMode
      });
      if (rawSelectionState.group !== selectionState.group || rawSelectionState.tenseValue !== selectionState.tenseValue || rawSelectionState.universalTenseValue !== selectionState.universalTenseValue || rawSelectionState.classFilter !== selectionState.classFilter) {
        targetObject.applyResolvedConjugationSelectionState(selectionState);
      }
      const activeGroup = selectionState.group;
      const selectedTense = selectionState.tenseValue;
      const isClassTenseSelected = targetObject.PRETERITO_CLASS_TENSES.has(selectedTense);
      const tenseOutputCache = new Map();
      const shouldComputeTenseOutput = targetObject.VerbRenderContext !== "typing";
      const availabilityProbeMemo = new Map();
      const availabilityMemoContextByMode = new Map();
      const getAvailabilityMemoContextForMode = (combinedMode = targetObject.COMBINED_MODE.active) => {
        const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        if (!availabilityMemoContextByMode.has(resolvedCombinedMode)) {
          const modeIsNonactive = resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive;
          availabilityMemoContextByMode.set(resolvedCombinedMode, buildAvailabilityMemoContext({
            tenseMode,
            isNonactiveMode: modeIsNonactive,
            derivationType: verbMeta.derivationType || targetObject.getActiveDerivationType(),
            derivationMode: modeIsNonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active,
            voiceMode: modeIsNonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active
          }));
        }
        return availabilityMemoContextByMode.get(resolvedCombinedMode);
      };
      const verbOutputContextsByMode = (() => {
        if (tenseMode !== targetObject.TENSE_MODE.verbo) {
          return null;
        }
        const subjectSelections = targetObject.getSubjectPersonSelections();
        const fusionMarkers = verbMeta.isTaFusion ? (verbMeta.fusionPrefixes || []).filter(prefix => targetObject.FUSION_PREFIXES.has(prefix)) : [];
        const buildVerbOutputContextForMode = (modeIsNonactive = false) => {
          const nonactiveConfig = modeIsNonactive ? targetObject.getNonactiveObjectPrefixGroups(verbMeta) : null;
          const objectPrefixGroups = targetObject.getVerbObjectPrefixGroups(verbMeta, modeIsNonactive, nonactiveConfig);
          const objectPrefixes = Array.from(new Set(objectPrefixGroups.flatMap(group => group.prefixes)));
          const valencySummary = modeIsNonactive ? targetObject.getVerbValencySummary(verbMeta) : null;
          return {
            isNonactiveMode: modeIsNonactive,
            objectPrefixes,
            objectPrefixGroups,
            subjectSelections,
            valencySummary,
            fusionMarkers
          };
        };
        return new Map([[targetObject.COMBINED_MODE.active, buildVerbOutputContextForMode(false)], [targetObject.COMBINED_MODE.nonactive, buildVerbOutputContextForMode(true)]]);
      })();
      const resolveTenseAvailabilityRecord = (tenseValue, combinedMode = currentCombinedMode) => {
        if (!shouldComputeTenseOutput) {
          return null;
        }
        if (!hasVerb || endsWithConsonant) {
          return null;
        }
        const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        if (isNominalMode) {
          const cacheKey = `nominal:${resolvedCombinedMode}:${tenseValue}`;
          if (tenseOutputCache.has(cacheKey)) {
            return tenseOutputCache.get(cacheKey);
          }
          const availabilityRecord = resolveNominalTenseAvailabilityRecord({
            verb: displayVerb,
            tenseValue,
            tenseMode,
            combinedMode: resolvedCombinedMode
          });
          tenseOutputCache.set(cacheKey, availabilityRecord);
          return availabilityRecord;
        }
        if (!verbOutputContextsByMode) {
          return null;
        }
        const cacheKey = `${resolvedCombinedMode}:${tenseValue}`;
        if (tenseOutputCache.has(cacheKey)) {
          return tenseOutputCache.get(cacheKey);
        }
        const verbOutputContext = verbOutputContextsByMode.get(resolvedCombinedMode);
        if (!verbOutputContext) {
          return null;
        }
        const availabilityMemoContext = getAvailabilityMemoContextForMode(resolvedCombinedMode);
        const availabilityRecord = resolveVerbTenseAvailabilityRecord({
          tenseValue,
          verbOutputContext,
          hasVerb,
          endsWithConsonant,
          isNonactiveMode: verbOutputContext.isNonactiveMode,
          displayVerb,
          availabilityProbeMemo,
          availabilityMemoContext,
          tenseOutputCache: null
        });
        tenseOutputCache.set(cacheKey, availabilityRecord);
        return availabilityRecord;
      };
      const rerenderActiveConjugations = tenseOverride => {
        const currentVerb = targetObject.getVerbInputMeta().displayVerb;
        const payload = {
          verb: currentVerb,
          objectPrefix: targetObject.getCurrentObjectPrefix()
        };
        if (tenseOverride !== undefined) {
          payload.tense = tenseOverride;
        }
        targetObject.renderActiveConjugations(payload);
      };
      const unifiedAvailabilityMatrix = tenseMode === targetObject.TENSE_MODE.verbo ? buildUnifiedVerbTenseAvailabilityMatrix({
        tenses: [...visibleTenses, ...targetObject.PRETERITO_UNIVERSAL_ORDER],
        resolveTenseAvailabilityRecord
      }) : null;
      const selectedUniversal = selectionState.universalTenseValue;
      const shouldShowOutputControls = tenseMode === targetObject.TENSE_MODE.verbo;
      if (outputControlsContainer) {
        outputControlsContainer.hidden = !shouldShowOutputControls;
      }
      syncVerbSourceScopeControl();
      if (!shouldShowOutputControls && outputUniversalContainer) {
        outputUniversalContainer.innerHTML = "";
        outputUniversalContainer.hidden = true;
      }
      const tenseTabsSignature = targetObject.buildTenseTabsDomSignature({
        isNawat,
        tenseMode,
        isNonactiveMode,
        sourceScope,
        activeGroup,
        selectedNonactiveSuffix,
        isNominalMode,
        shouldShowUniversalTabs,
        activeColumnTenses,
        nounNonactiveTenses,
        verbSemanticGroups,
        modeGroups,
        visibleTenseSet,
        universalOrder: targetObject.PRETERITO_UNIVERSAL_ORDER
      });
      const shouldReuseDom = tenseMode !== targetObject.TENSE_MODE.verbo && targetObject.TenseTabsDomSignature === tenseTabsSignature;
      if (shouldReuseDom) {
        const updated = targetObject.updateExistingTenseTabsDom({
          container,
          endsWithConsonant,
          resolveTenseAvailabilityRecord,
          blockedNominalTenseSet,
          isNominalMode,
          shouldShowUniversalTabs,
          availability,
          activeGroup,
          selectedTense,
          selectedUniversal,
          isClassTenseSelected,
          currentCombinedMode,
          selectionState
        });
        if (updated) {
          targetObject.restoreTenseTabsFocusState(container, focusState);
          return;
        }
      }
      container.innerHTML = "";
      const buildTenseButton = (tenseValue, {
        columnKey = "",
        combinedMode = ""
      } = {}) => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "tense-tab";
        button.setAttribute("role", "tab");
        button.dataset.tenseValue = tenseValue;
        button.dataset.tenseGroup = "main";
        const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : combinedMode === targetObject.COMBINED_MODE.active ? targetObject.COMBINED_MODE.active : "";
        if (columnKey) {
          button.dataset.tenseColumn = columnKey;
        }
        if (resolvedCombinedMode) {
          button.dataset.combinedMode = resolvedCombinedMode;
        }
        const isActive = activeGroup === targetObject.CONJUGATION_GROUPS.tense && tenseValue === selectedTense && (!resolvedCombinedMode || resolvedCombinedMode === currentCombinedMode);
        if (isActive) {
          button.classList.add("is-active");
        }
        button.setAttribute("aria-selected", String(isActive));
        const getAvailabilityRecordForMode = mode => {
          const resolvedMode = mode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
          return unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(resolvedMode)?.get(tenseValue) ?? resolveTenseAvailabilityRecord(tenseValue, resolvedMode) : resolveTenseAvailabilityRecord(tenseValue, resolvedMode);
        };
        let activeRecord = null;
        let nonactiveRecord = null;
        let availabilityRecord = null;
        const hasOutput = (() => {
          if (tenseMode === targetObject.TENSE_MODE.verbo || isNominalMode) {
            activeRecord = getAvailabilityRecordForMode(targetObject.COMBINED_MODE.active);
            nonactiveRecord = getAvailabilityRecordForMode(targetObject.COMBINED_MODE.nonactive);
            if (!resolvedCombinedMode) {
              if (activeRecord === null && nonactiveRecord === null) {
                return null;
              }
              return resolveTenseAvailabilityHasOutput(activeRecord) === true || resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
            }
          }
          const modeForButton = resolvedCombinedMode || currentCombinedMode;
          availabilityRecord = getAvailabilityRecordForMode(modeForButton);
          if (modeForButton === targetObject.COMBINED_MODE.nonactive) {
            nonactiveRecord = availabilityRecord;
          } else {
            activeRecord = availabilityRecord;
          }
          return resolveTenseAvailabilityHasOutput(availabilityRecord);
        })();
        const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord) === true;
        const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
        button.dataset.availabilityState = activeRecord?.availabilityState || nonactiveRecord?.availabilityState || availabilityRecord?.availabilityState || "";
        const isBlockedNominalTense = blockedNominalTenseSet.has(tenseValue);
        if (hasOutput === false || isBlockedNominalTense) {
          button.classList.add("is-empty");
        }
        const label = targetObject.document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], isNawat, tenseValue);
        button.appendChild(label);
        button.title = getAndrewsFirstTenseHoverTitle(tenseValue, tenseMode);
        applyAndrewsTenseAuthorityDataset(button, {
          tenseValue,
          mode: tenseMode
        });
        const selectionAuthority = applyAndrewsTenseTabSelectionAuthorityDataset(button, {
          tenseValue,
          mode: tenseMode,
          hasOutput,
          endsWithConsonant,
          isBlockedNominalTense
        });
        if (isNominalMode) {
          setTensePresenceBadges(button, {
            active: activeOutput,
            nonactive: nonactiveOutput
          });
        }
        button.disabled = selectionAuthority.disabled;
        button.addEventListener("click", () => {
          applyAndrewsTenseTabClickAuthorityDataset(button);
          if (!isAndrewsTenseTabClickAllowed(button)) {
            return;
          }
          if (typeof targetObject.clearActiveNawatRouteProfile === "function") {
            targetObject.clearActiveNawatRouteProfile();
          }
          const currentSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
            tenseMode
          });
          const wasActive = currentSelectionState.group === targetObject.CONJUGATION_GROUPS.tense && tenseValue === currentSelectionState.tenseValue && (!resolvedCombinedMode || targetObject.getCombinedMode() === resolvedCombinedMode);
          if (resolvedCombinedMode && targetObject.getCombinedMode() !== resolvedCombinedMode) {
            targetObject.setCombinedMode(resolvedCombinedMode);
            targetObject.updateCombinedModeTabs();
          }
          if (isNominalMode && typeof targetObject.isOrdinaryNncGenerationModeEnabled === "function" && targetObject.isOrdinaryNncGenerationModeEnabled() && typeof targetObject.setOrdinaryNncGenerationModeEnabled === "function") {
            targetObject.setOrdinaryNncGenerationModeEnabled(false);
            targetObject.updateTenseModeTabs();
          }
          targetObject.mutateConjugationSelectionState({
            tenseMode,
            group: targetObject.CONJUGATION_GROUPS.tense,
            tenseValue,
            classFilter: targetObject.PRETERITO_CLASS_TENSES.has(tenseValue) && wasActive ? null : currentSelectionState.classFilter
          }, {
            tenseMode,
            availabilityEntries: availability
          });
          const updateSelectedTense = () => {
            renderTenseTabs();
            rerenderActiveConjugations(tenseValue);
          };
          if (typeof targetObject.isThreeColumnPanelLayout === "function" && targetObject.isThreeColumnPanelLayout() && button.closest?.("#panel-stack-pane-tense")) {
            updateSelectedTense();
            return;
          }
          targetObject.preserveViewportAnchorPosition(button, updateSelectedTense);
        });
        return button;
      };
      const mainWrap = targetObject.document.createElement("div");
      mainWrap.className = "tense-tabs-main";
      mainWrap.setAttribute("role", "tablist");
      mainWrap.setAttribute("aria-label", getAndrewsFirstTenseTabsAriaLabel(tenseMode));
      const appendTenseGroups = (groups, columnEl, columnKey = "") => {
        groups.forEach(group => {
          const groupTenses = group.tenses.filter(tenseValue => visibleTenseSet.has(tenseValue));
          if (!groupTenses.length) {
            return;
          }
          const groupEl = targetObject.document.createElement("div");
          groupEl.className = "tense-tabs-group";
          if (group.heading) {
            const heading = targetObject.document.createElement("div");
            heading.className = "tense-tabs-heading";
            heading.textContent = targetObject.getLocalizedLabel(group.heading, isNawat, "");
            const hoverTitle = getAndrewsFirstGroupHoverTitle(group);
            if (hoverTitle) {
              heading.title = hoverTitle;
            }
            groupEl.appendChild(heading);
          }
          groupTenses.forEach(tenseValue => {
            const button = buildTenseButton(tenseValue, {
              columnKey
            });
            groupEl.appendChild(button);
          });
          columnEl.appendChild(groupEl);
        });
      };
      const buildAndrewsRouteDirectoryColumn = () => {
        const lessonRegistry = typeof targetObject.LESSON_REGISTRY !== "undefined" && Array.isArray(targetObject.LESSON_REGISTRY) ? targetObject.LESSON_REGISTRY : Array.isArray(globalThis.LESSON_REGISTRY) ? globalThis.LESSON_REGISTRY : [];
        const registryFrame = typeof targetObject.buildAndrewsSourceGatedDerivationalRouteRegistry === "function" ? targetObject.buildAndrewsSourceGatedDerivationalRouteRegistry() : null;
        const registryRoutes = Array.isArray(registryFrame?.routes) ? registryFrame.routes : [];
        if (!lessonRegistry.length && !registryRoutes.length) {
          return null;
        }
        const routeRows = [];
        const seenRouteIdentities = new Set();
        const routeClassOrder = ["verbal-source-to-nominal-target", "nominal-source-to-nominal-target", "nominal-source-to-verbal-target", "verbal-source-to-verbal-target", "mixed-compound-source-target-route", "other-source-target-route", "unclassified-source-target-route"];
        const routeClassLabels = Object.freeze({
          "verbal-source-to-nominal-target": "CNV -> CNN · verbal source to nominal target",
          "nominal-source-to-nominal-target": "CNN -> CNN · nominal source to nominal target",
          "nominal-source-to-verbal-target": "CNN -> CNV · nominal source to verbal target",
          "verbal-source-to-verbal-target": "CNV -> CNV · verbal source to verbal target",
          "mixed-compound-source-target-route": "CNV/CNN -> CNV/CNN · mixed compound route",
          "other-source-target-route": "Other Andrews route",
          "unclassified-source-target-route": "Unclassified route"
        });
        const getRouteFormulaTransition = route => route?.formulaTransition || getAndrewsSourceTargetFormulaTransition(route?.sourceFormulaType, route?.targetFormulaType) || "";
        const getRouteSourceTargetClass = route => getAndrewsSourceTargetRouteClass(getRouteFormulaTransition(route));
        const getRouteSourceTargetHost = route => getAndrewsSourceTargetRouteUiHost(getRouteFormulaTransition(route));
        const getRouteClassLabel = routeClass => routeClassLabels[routeClass] || routeClass || "route";
        const getRouteRef = (lesson, route, fallback) => {
          const refs = Array.isArray(route?.andrewsRefs) ? route.andrewsRefs.filter(Boolean) : [];
          return refs[0] || fallback || `Lesson ${lesson?.id || ""}`;
        };
        const addRouteRow = (lesson, route, level, fallbackRef) => {
          if (!route) {
            return;
          }
          const formulaTransition = getRouteFormulaTransition(route);
          const routeClass = getRouteSourceTargetClass(route);
          const routeHost = getRouteSourceTargetHost(route);
          const routeIdentity = [route.id || route.contractId || route.routeTemplateId || "", route.routeFamily || "", route.routeKind || "", formulaTransition, getRouteRef(lesson, route, fallbackRef)].filter(Boolean).join("|");
          if (routeIdentity && seenRouteIdentities.has(routeIdentity)) {
            return;
          }
          if (routeIdentity) {
            seenRouteIdentities.add(routeIdentity);
          }
          const structuralInfo = route.structuralInfo || {};
          const ref = getRouteRef(lesson, route, fallbackRef);
          const key = `${routeRows.length}:${lesson?.id || ""}:${level}:${route.routeKind || ""}:${ref}`;
          const searchText = [ref, level, route.routeFamily, route.routeKind, formulaTransition, routeClass, getRouteClassLabel(routeClass), routeHost, route.sourceFormulaType, route.targetFormulaType, route.formulaTemplate, route.sourcePathFormula, structuralInfo.sourcePathFormula, structuralInfo.logicPathType, structuralInfo.keywordRouteBasis, structuralInfo.exampleSource, structuralInfo.exampleTargetFormula, structuralInfo.exampleSurface, route.puzzleStackTemplate?.model, ...(Array.isArray(route.puzzleStackTemplate?.steps) ? route.puzzleStackTemplate.steps.flatMap(step => [step.stage, step.piece, step.label, step.formula, step.note]) : [])].filter(Boolean).join(" ").toLowerCase();
          routeRows.push({
            key,
            lesson,
            route,
            level,
            ref,
            structuralInfo,
            searchText,
            formulaTransition,
            routeClass,
            routeHost
          });
        };
        lessonRegistry.forEach(lesson => {
          const lessonRoute = lesson?.trajectory?.sourceGatedRoute;
          if (!lessonRoute) {
            return;
          }
          addRouteRow(lesson, lessonRoute, "lesson", `Lesson ${lesson.id}`);
          (Array.isArray(lessonRoute.subsectionRoutes) ? lessonRoute.subsectionRoutes : []).forEach(sectionRoute => {
            addRouteRow(lesson, sectionRoute, "section", sectionRoute.structuralInfo?.section || `Lesson ${lesson.id}`);
            (Array.isArray(sectionRoute.internalRoutes) ? sectionRoute.internalRoutes : []).forEach(internalRoute => {
              addRouteRow(lesson, internalRoute, "internal", internalRoute.structuralInfo?.internalSubsection || sectionRoute.structuralInfo?.section || `Lesson ${lesson.id}`);
            });
          });
        });
        registryRoutes.forEach(route => {
          addRouteRow({
            id: "registry",
            label: "Andrews route registry"
          }, route, "registry", route.andrewsRefs?.[0] || route.id || route.routeKind || "Andrews route registry");
        });
        if (!routeRows.length) {
          return null;
        }
        const families = Array.from(new Set(routeRows.map(row => row.route.routeFamily).filter(Boolean))).sort();
        const routeClassCounts = routeRows.reduce((counts, row) => {
          counts.set(row.routeClass, (counts.get(row.routeClass) || 0) + 1);
          return counts;
        }, new Map());
        const routeClasses = routeClassOrder.filter(routeClass => routeClassCounts.has(routeClass)).concat(Array.from(routeClassCounts.keys()).filter(routeClass => !routeClassOrder.includes(routeClass)).sort());
        const lessonCount = routeRows.filter(row => row.level === "lesson").length;
        const sectionCount = routeRows.filter(row => row.level === "section").length;
        const internalCount = routeRows.filter(row => row.level === "internal").length;
        const registryCount = routeRows.filter(row => row.level === "registry").length;
        let selectedRow = routeRows.find(row => row.route.routeKind === "preterit-agentive-embedded-source-locative") || routeRows.find(row => row.level === "internal") || routeRows.find(row => row.routeClass === "nominal-source-to-verbal-target") || routeRows.find(row => row.routeClass === "verbal-source-to-verbal-target") || routeRows[0];
        const routeColumn = targetObject.document.createElement("div");
        routeColumn.className = "tense-tabs-column tense-tabs-column--andrews-routes";
        routeColumn.dataset.uiHost = "tense-tabs-column";
        routeColumn.dataset.andrewsRouteDirectory = "source-gated";
        const title = targetObject.document.createElement("div");
        title.className = "tense-tabs-heading tense-tabs-heading--route-directory";
        title.textContent = "Rutas Andrews";
        routeColumn.appendChild(title);
        const audit = targetObject.document.createElement("div");
        audit.className = "andrews-route-directory__audit";
        audit.textContent = `${lessonCount} lecciones · ${sectionCount} secciones · ${internalCount} rutas internas · ${registryCount} rutas de registro`;
        routeColumn.appendChild(audit);
        const classSummary = targetObject.document.createElement("div");
        classSummary.className = "andrews-route-directory__class-summary";
        classSummary.dataset.sourceTargetRouteClassSummary = "andrews-route-registry";
        routeClasses.forEach(routeClass => {
          const chip = targetObject.document.createElement("span");
          chip.className = "andrews-route-directory__class-chip";
          chip.dataset.sourceTargetRouteClass = routeClass;
          chip.textContent = `${getRouteClassLabel(routeClass)} · ${routeClassCounts.get(routeClass) || 0}`;
          classSummary.appendChild(chip);
        });
        routeColumn.appendChild(classSummary);
        const browser = targetObject.document.createElement("div");
        browser.className = "andrews-route-browser";
        const controls = targetObject.document.createElement("div");
        controls.className = "andrews-route-browser__controls";
        const searchInput = targetObject.document.createElement("input");
        searchInput.className = "andrews-route-browser__search";
        searchInput.type = "search";
        searchInput.placeholder = "Buscar ruta, formula o ref";
        searchInput.setAttribute("aria-label", "Buscar ruta Andrews");
        controls.appendChild(searchInput);
        const familySelect = targetObject.document.createElement("select");
        familySelect.className = "andrews-route-browser__family";
        familySelect.setAttribute("aria-label", "Familia de ruta Andrews");
        const allFamiliesOption = targetObject.document.createElement("option");
        allFamiliesOption.value = "";
        allFamiliesOption.textContent = "Todas las familias";
        familySelect.appendChild(allFamiliesOption);
        families.forEach(family => {
          const option = targetObject.document.createElement("option");
          option.value = family;
          option.textContent = family;
          familySelect.appendChild(option);
        });
        controls.appendChild(familySelect);
        const routeClassSelect = targetObject.document.createElement("select");
        routeClassSelect.className = "andrews-route-browser__route-class";
        routeClassSelect.setAttribute("aria-label", "Clase fuente destino Andrews");
        const allRouteClassesOption = targetObject.document.createElement("option");
        allRouteClassesOption.value = "";
        allRouteClassesOption.textContent = "Todas las rutas fuente -> destino";
        routeClassSelect.appendChild(allRouteClassesOption);
        routeClasses.forEach(routeClass => {
          const option = targetObject.document.createElement("option");
          option.value = routeClass;
          option.textContent = `${getRouteClassLabel(routeClass)} (${routeClassCounts.get(routeClass) || 0})`;
          routeClassSelect.appendChild(option);
        });
        controls.appendChild(routeClassSelect);
        browser.appendChild(controls);
        const body = targetObject.document.createElement("div");
        body.className = "andrews-route-browser__body";
        const listWrap = targetObject.document.createElement("div");
        listWrap.className = "andrews-route-browser__list-wrap";
        const matchCount = targetObject.document.createElement("div");
        matchCount.className = "andrews-route-browser__match-count";
        listWrap.appendChild(matchCount);
        const list = targetObject.document.createElement("div");
        list.className = "andrews-route-browser__list";
        listWrap.appendChild(list);
        const detail = targetObject.document.createElement("div");
        detail.className = "andrews-route-browser__detail";
        body.appendChild(listWrap);
        body.appendChild(detail);
        browser.appendChild(body);
        routeColumn.appendChild(browser);
        const appendDetailLine = (parent, label, value, className = "") => {
          if (!value) {
            return;
          }
          const line = targetObject.document.createElement("div");
          line.className = `andrews-route-browser__detail-line${className ? ` ${className}` : ""}`;
          const labelEl = targetObject.document.createElement("span");
          labelEl.className = "andrews-route-browser__detail-label";
          labelEl.textContent = label;
          const valueEl = targetObject.document.createElement("span");
          valueEl.className = "andrews-route-browser__detail-value";
          valueEl.textContent = value;
          line.appendChild(labelEl);
          line.appendChild(valueEl);
          parent.appendChild(line);
        };
        const getAndrewsRoutePuzzleStackSteps = row => {
          const route = row?.route || {};
          const structuralInfo = row?.structuralInfo || {};
          const templateSteps = Array.isArray(route.puzzleStackTemplate?.steps) ? route.puzzleStackTemplate.steps.filter(step => step && typeof step === "object") : [];
          if (templateSteps.length) {
            return templateSteps.map(step => ({
              stage: step.stage || "",
              piece: step.piece || "",
              label: step.label || "",
              formula: step.formula || "",
              note: step.note || ""
            }));
          }
          const sourcePathFormula = structuralInfo.sourcePathFormula || route.sourcePathFormula || "";
          const exampleSource = structuralInfo.exampleSource || "(mich-namaka)";
          const exampleTargetFormula = structuralInfo.exampleTargetFormula || "(mich-namaka-0-ka-n)-0-";
          const exampleSurface = structuralInfo.exampleSurface || "michnamakakan";
          if (route.routeKind === "preterit-agentive-embedded-source-locative") {
            const sourceCore = exampleSource.replace(/\)$/, "-0)");
            const agentiveStem = exampleSource.replace(/\)$/, "-0-ka)");
            const locativeStem = exampleSource.replace(/\)$/, "-0-ka-n)");
            return [{
              stage: "#1 entrada",
              piece: "source",
              label: "embedded source",
              formula: exampleSource,
              note: "CNV source stem supplied by the user"
            }, {
              stage: "#2 formula",
              piece: "-0",
              label: "VNC preterit",
              formula: sourceCore,
              note: "tense layer inside the embedded VNC core"
            }, {
              stage: "#2 formula",
              piece: "-ka < absolutive t/ti",
              label: "VNC-NNC conversion",
              formula: agentiveStem,
              note: "preterit-agentive embedded NNC; one t/ti absolutive operation resolves from the previous non-zero segment"
            }, {
              stage: "#2 formula",
              piece: "-n < absolutive t/ti",
              label: "relational NNC",
              formula: locativeStem,
              note: "locative relational matrix stem element; the same t/ti operation applies after consonant or vowel"
            }, {
              stage: "#2 formula",
              piece: "-0-",
              label: "NNC connector",
              formula: exampleTargetFormula,
              note: "outer zero connector/adverbial layer"
            }, {
              stage: "#3 salida",
              piece: "surface",
              label: "realization",
              formula: exampleSurface,
              note: "formula boundaries and zero markers are not surface letters"
            }];
          }
          const steps = [{
            stage: "#1 entrada",
            piece: route.sourceFormulaType || "source",
            label: "source gate",
            formula: route.sourceUnit || row?.ref || route.routeKind || "source",
            note: route.sourceGate?.status || "source-gated Andrews route"
          }];
          (Array.isArray(route.requirementIds) ? route.requirementIds : []).forEach(requirementId => {
            steps.push({
              stage: "#2 formula",
              piece: requirementId,
              label: "required piece",
              formula: requirementId,
              note: "route cannot build without this source condition"
            });
          });
          if (sourcePathFormula) {
            steps.push({
              stage: "#2 formula",
              piece: "source path",
              label: "route path",
              formula: sourcePathFormula,
              note: structuralInfo.logicPathType || structuralInfo.keywordRouteBasis || route.operation || "Andrews source-to-target path"
            });
          }
          if (route.formulaTemplate) {
            steps.push({
              stage: "#2 formula",
              piece: "target template",
              label: "formula build",
              formula: route.formulaTemplate,
              note: route.operation || "target formula template"
            });
          }
          steps.push({
            stage: "#3 salida",
            piece: structuralInfo.exampleSurface ? "surface" : route.targetFormulaType || "target",
            label: structuralInfo.exampleSurface ? "realization" : "target gate",
            formula: structuralInfo.exampleSurface || route.targetUnit || route.targetFormulaType || route.routeKind || "target",
            note: structuralInfo.exampleSurface ? "licensed route example surface" : "surface is built only when the route has enough evidence"
          });
          return steps;
        };
        const getAndrewsRoutePuzzleStackActions = row => {
          const route = row?.route || {};
          if (route.puzzleStackTemplate?.actionModel !== "ordered-selectable-piece-transform") {
            return [];
          }
          return Array.isArray(route.puzzleStackTemplate?.actions) ? route.puzzleStackTemplate.actions.filter(action => action && typeof action === "object").map(action => ({
            stage: action.stage || "",
            inputFormula: action.inputFormula || "",
            selectablePiece: action.selectablePiece || "",
            operation: action.operation || "",
            outputFormula: action.outputFormula || "",
            note: action.note || "",
            sourceEvidence: action.sourceEvidence || "",
            routeBoundary: action.routeBoundary || "",
            absolutiveAllomorph: action.absolutiveAllomorph && typeof action.absolutiveAllomorph === "object" ? action.absolutiveAllomorph : null
          })) : [];
        };
        const getAndrewsRoutePuzzleStackConjugatorRuns = row => {
          const route = row?.route || {};
          if (route.puzzleStackTemplate?.buildModel !== "single-entrada-conjugator-orchestration") {
            return [];
          }
          return Array.isArray(route.puzzleStackTemplate?.conjugatorEntradas?.runs) ? route.puzzleStackTemplate.conjugatorEntradas.runs.filter(run => run && typeof run === "object").map(run => ({
            id: run.id || "",
            stage: run.stage || "",
            activeEntrada: run.activeEntrada || "",
            process: run.process || "",
            internalPath: Array.isArray(run.internalPath) ? run.internalPath.filter(Boolean).map(String) : [],
            contributes: run.contributes || "",
            attachTo: run.attachTo || "",
            output: run.output || "",
            note: run.note || ""
          })) : [];
        };
        const appendAndrewsRoutePuzzleStackConjugatorBoard = (parent, row) => {
          const runs = getAndrewsRoutePuzzleStackConjugatorRuns(row);
          if (!runs.length) {
            return;
          }
          const board = targetObject.document.createElement("div");
          board.className = "andrews-route-browser__conjugator-board";
          board.dataset.puzzleStackBuildModel = row.route.puzzleStackTemplate.buildModel || "";
          const title = targetObject.document.createElement("div");
          title.className = "andrews-route-browser__conjugator-title";
          title.textContent = "Edge Sources";
          board.appendChild(title);
          const edgeInspector = targetObject.document.createElement("div");
          edgeInspector.className = "andrews-route-browser__conjugator-inspector";
          board.appendChild(edgeInspector);
          const setActiveRun = (item, run) => {
            board.querySelectorAll(".andrews-route-browser__conjugator-run.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
            item.classList.add("is-active");
            const path = run.internalPath.length ? run.internalPath.join(" -> ") : run.activeEntrada;
            edgeInspector.textContent = `source ${run.activeEntrada}: ${path} => ${run.output}. ${run.process}`;
          };
          runs.forEach((run, index) => {
            const item = targetObject.document.createElement("button");
            item.type = "button";
            item.className = "andrews-route-browser__conjugator-run";
            item.dataset.conjugatorRun = run.id || String(index + 1);
            const entrada = targetObject.document.createElement("div");
            entrada.className = "andrews-route-browser__conjugator-entrada";
            entrada.textContent = `entrada: ${run.activeEntrada}`;
            item.appendChild(entrada);
            const output = targetObject.document.createElement("div");
            output.className = "andrews-route-browser__conjugator-output";
            output.textContent = run.attachTo ? `${run.attachTo} -> ${run.output}` : run.output;
            item.appendChild(output);
            item.addEventListener("click", () => setActiveRun(item, run));
            board.appendChild(item);
            if (index === 0) {
              setActiveRun(item, run);
            }
          });
          parent.appendChild(board);
        };
        const appendAndrewsRoutePuzzleStackBuilder = (parent, row, steps) => {
          const actions = getAndrewsRoutePuzzleStackActions(row);
          if (!actions.length || !steps.length) {
            return;
          }
          const builder = targetObject.document.createElement("div");
          builder.className = "andrews-route-browser__builder";
          builder.dataset.puzzleStackActionModel = row.route.puzzleStackTemplate.actionModel || "";
          builder.dataset.andrewsRouteBuilder = row.route.routeKind || "";
          if (row.route.routeKind === "preterit-agentive-embedded-source-locative") {
            builder.classList.add("andrews-route-browser__builder--dedicated");
          }
          let activeIndex = 0;
          const header = targetObject.document.createElement("div");
          header.className = "andrews-route-browser__builder-head";
          const title = targetObject.document.createElement("div");
          title.className = "andrews-route-browser__builder-title";
          title.textContent = row.route.routeKind === "preterit-agentive-embedded-source-locative" ? "Andrews 46.3.1.a route builder" : "Route builder";
          header.appendChild(title);
          const progress = targetObject.document.createElement("div");
          progress.className = "andrews-route-browser__builder-progress";
          header.appendChild(progress);
          builder.appendChild(header);
          const sourceEvidence = targetObject.document.createElement("div");
          sourceEvidence.className = "andrews-route-browser__builder-source";
          builder.appendChild(sourceEvidence);
          const currentLabel = targetObject.document.createElement("div");
          currentLabel.className = "andrews-route-browser__builder-current-label";
          currentLabel.textContent = "Formula actual";
          builder.appendChild(currentLabel);
          const currentFormula = targetObject.document.createElement("div");
          currentFormula.className = "andrews-route-browser__builder-current";
          builder.appendChild(currentFormula);
          const nextOperation = targetObject.document.createElement("div");
          nextOperation.className = "andrews-route-browser__builder-next";
          builder.appendChild(nextOperation);
          const controls = targetObject.document.createElement("div");
          controls.className = "andrews-route-browser__builder-controls";
          const backButton = targetObject.document.createElement("button");
          backButton.type = "button";
          backButton.className = "andrews-route-browser__builder-control";
          backButton.textContent = "Anterior";
          const resetButton = targetObject.document.createElement("button");
          resetButton.type = "button";
          resetButton.className = "andrews-route-browser__builder-control";
          resetButton.textContent = "Reiniciar";
          controls.appendChild(backButton);
          controls.appendChild(resetButton);
          builder.appendChild(controls);
          const actionList = targetObject.document.createElement("div");
          actionList.className = "andrews-route-browser__builder-actions";
          builder.appendChild(actionList);
          const getActionAbsolutiveAllomorphLabel = action => {
            const frame = action?.absolutiveAllomorph || null;
            if (!frame) {
              return "";
            }
            const appliesAfter = Array.isArray(frame.appliesAfter) ? frame.appliesAfter.filter(Boolean).join("/") : "";
            const previous = frame.previousNonZeroSegment ? `no-cero ${frame.previousNonZeroSegment}` : "";
            const realized = frame.realizedConnector ? `-> ${frame.realizedConnector}` : "";
            return [`absolutivo ${frame.connectorFamily || "t/ti"}`, frame.selector ? `selector ${frame.selector}` : "", appliesAfter ? `aplica ${appliesAfter}` : "", [previous, realized].filter(Boolean).join(" ")].filter(Boolean).join(" · ");
          };
          const renderBuilder = () => {
            const complete = activeIndex >= actions.length;
            const currentAction = actions[Math.min(activeIndex, actions.length - 1)] || {};
            const previousAction = activeIndex > 0 ? actions[activeIndex - 1] : null;
            const evidenceAction = complete ? previousAction : currentAction;
            currentFormula.textContent = complete ? previousAction?.outputFormula || "" : currentAction.inputFormula || "";
            progress.textContent = `${Math.min(activeIndex, actions.length)} / ${actions.length}`;
            sourceEvidence.textContent = [activeIndex === 0 ? `fuente: ${actions[0].inputFormula}` : "", evidenceAction?.sourceEvidence ? `evidencia: ${evidenceAction.sourceEvidence}` : "", evidenceAction?.routeBoundary ? `frontera: ${evidenceAction.routeBoundary}` : "", getActionAbsolutiveAllomorphLabel(evidenceAction)].filter(Boolean).join(" · ");
            nextOperation.textContent = complete ? `Completo: ${previousAction?.outputFormula || ""}` : `Siguiente: ${currentAction.operation || currentAction.selectablePiece || ""}`;
            backButton.disabled = activeIndex === 0;
            resetButton.disabled = activeIndex === 0;
            actionList.innerHTML = "";
            actions.forEach((action, index) => {
              const actionRow = targetObject.document.createElement("div");
              actionRow.className = "andrews-route-browser__builder-action";
              actionRow.dataset.actionIndex = String(index + 1);
              actionRow.dataset.routeBoundary = action.routeBoundary || "";
              actionRow.dataset.actionState = index < activeIndex ? "complete" : index === activeIndex ? "active" : "locked";
              if (action.absolutiveAllomorph) {
                actionRow.dataset.absolutiveAllomorph = action.absolutiveAllomorph.connectorFamily || "";
                actionRow.dataset.absolutiveAllomorphSelector = action.absolutiveAllomorph.selector || "";
                actionRow.dataset.absolutiveAllomorphAppliesAfter = Array.isArray(action.absolutiveAllomorph.appliesAfter) ? action.absolutiveAllomorph.appliesAfter.filter(Boolean).join("|") : "";
                actionRow.dataset.previousNonZeroSegment = action.absolutiveAllomorph.previousNonZeroSegment || "";
                actionRow.dataset.realizedAbsolutiveConnector = action.absolutiveAllomorph.realizedConnector || "";
              }
              const actionButton = targetObject.document.createElement("button");
              actionButton.type = "button";
              actionButton.className = "andrews-route-browser__builder-button";
              actionButton.disabled = index !== activeIndex;
              actionButton.textContent = `${index + 1}. ${action.selectablePiece}`;
              actionButton.addEventListener("click", () => {
                if (index !== activeIndex) {
                  return;
                }
                activeIndex = Math.min(actions.length, activeIndex + 1);
                renderBuilder();
              });
              const actionMeta = targetObject.document.createElement("span");
              actionMeta.className = "andrews-route-browser__builder-meta";
              const allomorphLabel = getActionAbsolutiveAllomorphLabel(action);
              actionMeta.textContent = index < activeIndex ? [action.outputFormula, allomorphLabel].filter(Boolean).join(" · ") : [action.operation, allomorphLabel, action.outputFormula].filter(Boolean).join(" -> ");
              actionRow.appendChild(actionButton);
              actionRow.appendChild(actionMeta);
              actionList.appendChild(actionRow);
            });
          };
          backButton.addEventListener("click", () => {
            activeIndex = Math.max(0, activeIndex - 1);
            renderBuilder();
          });
          resetButton.addEventListener("click", () => {
            activeIndex = 0;
            renderBuilder();
          });
          renderBuilder();
          parent.appendChild(builder);
        };
        const appendAndrewsRoutePuzzleStack = (parent, row) => {
          const steps = getAndrewsRoutePuzzleStackSteps(row);
          if (!steps.length) {
            return;
          }
          const stack = targetObject.document.createElement("div");
          stack.className = "andrews-route-browser__layer-stack";
          stack.dataset.layerStackRoute = row.route.routeKind || "";
          stack.dataset.puzzleStackModel = "entrada-formula-salida";
          const stackTitle = targetObject.document.createElement("div");
          stackTitle.className = "andrews-route-browser__layer-stack-title";
          stackTitle.textContent = "PuzzleStack";
          stack.appendChild(stackTitle);
          const lanes = targetObject.document.createElement("div");
          lanes.className = "andrews-route-browser__layer-lanes";
          stack.appendChild(lanes);
          const groupedSteps = [];
          steps.forEach(step => {
            const existing = groupedSteps.find(group => group.stage === step.stage);
            if (existing) {
              existing.steps.push(step);
              return;
            }
            groupedSteps.push({
              stage: step.stage,
              steps: [step]
            });
          });
          let stepIndex = 0;
          groupedSteps.forEach(group => {
            const lane = targetObject.document.createElement("div");
            lane.className = "andrews-route-browser__layer-lane";
            lane.dataset.layerLane = group.stage;
            const laneTitle = targetObject.document.createElement("div");
            laneTitle.className = "andrews-route-browser__layer-lane-title";
            laneTitle.textContent = group.stage;
            lane.appendChild(laneTitle);
            group.steps.forEach(step => {
              stepIndex += 1;
              const item = targetObject.document.createElement("div");
              item.className = "andrews-route-browser__layer-step";
              item.dataset.layerStep = String(stepIndex);
              item.dataset.layerStage = step.stage;
              item.dataset.puzzlePiece = step.piece;
              const indexEl = targetObject.document.createElement("span");
              indexEl.className = "andrews-route-browser__layer-index";
              indexEl.textContent = String(stepIndex);
              item.appendChild(indexEl);
              const bodyEl = targetObject.document.createElement("span");
              bodyEl.className = "andrews-route-browser__layer-body";
              const headEl = targetObject.document.createElement("span");
              headEl.className = "andrews-route-browser__layer-head";
              headEl.textContent = `${step.piece} · ${step.label}`;
              bodyEl.appendChild(headEl);
              const formulaEl = targetObject.document.createElement("span");
              formulaEl.className = "andrews-route-browser__layer-formula";
              formulaEl.textContent = step.formula;
              bodyEl.appendChild(formulaEl);
              const noteEl = targetObject.document.createElement("span");
              noteEl.className = "andrews-route-browser__layer-note";
              noteEl.textContent = step.note;
              bodyEl.appendChild(noteEl);
              item.appendChild(bodyEl);
              lane.appendChild(item);
            });
            lanes.appendChild(lane);
          });
          appendAndrewsRoutePuzzleStackConjugatorBoard(stack, row);
          appendAndrewsRoutePuzzleStackBuilder(stack, row, steps);
          parent.appendChild(stack);
        };
        const renderAndrewsRouteBrowserDetail = row => {
          detail.innerHTML = "";
          if (!row) {
            const empty = targetObject.document.createElement("div");
            empty.className = "andrews-route-browser__empty";
            empty.textContent = "Sin ruta.";
            detail.appendChild(empty);
            return;
          }
          const route = row.route;
          const structuralInfo = row.structuralInfo || {};
          const detailTitle = targetObject.document.createElement("div");
          detailTitle.className = "andrews-route-browser__detail-title";
          detailTitle.textContent = `${row.ref} · ${route.routeKind || "route"}`;
          detail.appendChild(detailTitle);
          const chips = targetObject.document.createElement("div");
          chips.className = "andrews-route-browser__chips";
          [route.routeFamily, row.level, route.sourceGate?.status, row.formulaTransition, getRouteClassLabel(row.routeClass), row.routeHost].filter(Boolean).forEach(chipText => {
            const chip = targetObject.document.createElement("span");
            chip.className = "andrews-route-browser__chip";
            chip.textContent = chipText;
            chips.appendChild(chip);
          });
          detail.appendChild(chips);
          const exampleSource = structuralInfo.exampleSource;
          const exampleTargetFormula = structuralInfo.exampleTargetFormula;
          const exampleSurface = structuralInfo.exampleSurface;
          const hasConjugatorBuild = route.puzzleStackTemplate?.buildModel === "single-entrada-conjugator-orchestration";
          if (!hasConjugatorBuild && (exampleSource || exampleTargetFormula || exampleSurface)) {
            const example = targetObject.document.createElement("div");
            example.className = "andrews-route-browser__example";
            appendDetailLine(example, "source", exampleSource, "andrews-route-browser__detail-line--formula");
            appendDetailLine(example, "target", exampleTargetFormula, "andrews-route-browser__detail-line--formula");
            appendDetailLine(example, "salida", exampleSurface);
            detail.appendChild(example);
          }
          appendAndrewsRoutePuzzleStack(detail, row);
          const metadataParent = hasConjugatorBuild ? targetObject.document.createElement("details") : detail;
          if (hasConjugatorBuild) {
            metadataParent.className = "andrews-route-browser__metadata";
            const metadataSummary = targetObject.document.createElement("summary");
            metadataSummary.className = "andrews-route-browser__metadata-summary";
            metadataSummary.textContent = "route metadata";
            metadataParent.appendChild(metadataSummary);
          }
          appendDetailLine(metadataParent, "template", route.formulaTemplate, "andrews-route-browser__detail-line--formula");
          appendDetailLine(metadataParent, "source -> target", row.formulaTransition, "andrews-route-browser__detail-line--formula");
          appendDetailLine(metadataParent, "route class", getRouteClassLabel(row.routeClass));
          appendDetailLine(metadataParent, "route host", row.routeHost);
          appendDetailLine(metadataParent, "source path", structuralInfo.sourcePathFormula || route.sourcePathFormula, "andrews-route-browser__detail-line--formula");
          appendDetailLine(metadataParent, "operation", route.operation);
          appendDetailLine(metadataParent, "source unit", route.sourceUnit);
          appendDetailLine(metadataParent, "target unit", route.targetUnit);
          appendDetailLine(metadataParent, "logic path", structuralInfo.logicPathType || structuralInfo.keywordRouteBasis);
          appendDetailLine(metadataParent, "source layer", structuralInfo.sourceLayer);
          appendDetailLine(metadataParent, "preterit-agentive", structuralInfo.preteritAgentiveLayer);
          appendDetailLine(metadataParent, "matrix", structuralInfo.relationalMatrix);
          appendDetailLine(metadataParent, "connector", structuralInfo.connectorLayer);
          if (Array.isArray(route.requirementIds) && route.requirementIds.length) {
            const reqWrap = targetObject.document.createElement("div");
            reqWrap.className = "andrews-route-browser__requirements";
            const reqTitle = targetObject.document.createElement("div");
            reqTitle.className = "andrews-route-browser__requirements-title";
            reqTitle.textContent = "requirements";
            reqWrap.appendChild(reqTitle);
            route.requirementIds.forEach(requirementId => {
              const req = targetObject.document.createElement("span");
              req.className = "andrews-route-browser__requirement";
              req.textContent = requirementId;
              reqWrap.appendChild(req);
            });
            metadataParent.appendChild(reqWrap);
          }
          if (hasConjugatorBuild) {
            detail.appendChild(metadataParent);
          }
        };
        const getFilteredRows = () => {
          const query = searchInput.value.trim().toLowerCase();
          const family = familySelect.value;
          const routeClass = routeClassSelect.value;
          return routeRows.filter(row => {
            if (family && row.route.routeFamily !== family) {
              return false;
            }
            if (routeClass && row.routeClass !== routeClass) {
              return false;
            }
            return !query || row.searchText.includes(query);
          });
        };
        const renderRows = () => {
          const filteredRows = getFilteredRows();
          if (!filteredRows.includes(selectedRow)) {
            selectedRow = filteredRows[0] || null;
            renderAndrewsRouteBrowserDetail(selectedRow);
          }
          list.innerHTML = "";
          const visibleRows = filteredRows.slice(0, 240);
          if (selectedRow && filteredRows.includes(selectedRow) && !visibleRows.includes(selectedRow)) {
            visibleRows.unshift(selectedRow);
            visibleRows.splice(240);
          }
          matchCount.textContent = filteredRows.length === visibleRows.length ? `${filteredRows.length} rutas` : `${visibleRows.length} de ${filteredRows.length} rutas`;
          visibleRows.forEach(row => {
            const route = row.route;
            const rowButton = targetObject.document.createElement("button");
            rowButton.type = "button";
            rowButton.className = "andrews-route-browser__row";
            if (row === selectedRow) {
              rowButton.classList.add("is-selected");
            }
            if (route.routeKind === "preterit-agentive-embedded-source-locative") {
              rowButton.classList.add("is-current-test-case");
            }
            rowButton.dataset.routeKind = route.routeKind || "";
            rowButton.dataset.routeFamily = route.routeFamily || "";
            rowButton.dataset.routeLevel = row.level;
            rowButton.dataset.sourceTargetRoute = row.formulaTransition || "";
            rowButton.dataset.sourceTargetRouteClass = row.routeClass || "";
            rowButton.dataset.sourceTargetRouteHost = row.routeHost || "";
            rowButton.dataset.sourceFormulaType = route.sourceFormulaType || "";
            rowButton.dataset.targetFormulaType = route.targetFormulaType || "";
            rowButton.dataset.andrewsLogicAuthority = "Andrews PDF";
            rowButton.dataset.outputSpellingAuthority = "Nawat/Pipil orthography bridge";
            const rowTitle = targetObject.document.createElement("span");
            rowTitle.className = "andrews-route-browser__row-title";
            rowTitle.textContent = `${row.ref} · ${route.routeKind || "route"}`;
            rowButton.appendChild(rowTitle);
            const rowMeta = targetObject.document.createElement("span");
            rowMeta.className = "andrews-route-browser__row-meta";
            rowMeta.textContent = [route.routeFamily, row.formulaTransition || route.formulaTemplate, getRouteClassLabel(row.routeClass), row.structuralInfo.exampleSurface ? `salida ${row.structuralInfo.exampleSurface}` : ""].filter(Boolean).join(" · ");
            rowButton.appendChild(rowMeta);
            rowButton.addEventListener("click", () => {
              selectedRow = row;
              renderAndrewsRouteBrowserDetail(row);
              renderRows();
            });
            list.appendChild(rowButton);
          });
        };
        searchInput.addEventListener("input", () => {
          renderRows();
        });
        familySelect.addEventListener("change", () => {
          renderRows();
        });
        routeClassSelect.addEventListener("change", () => {
          renderRows();
        });
        renderAndrewsRouteBrowserDetail(selectedRow);
        renderRows();
        return routeColumn;
      };
      const columns = [];
      if (isNominalMode) {
        const nominalColumn = targetObject.document.createElement("div");
        nominalColumn.className = "tense-tabs-column";
        appendTenseGroups(modeGroups.left || [], nominalColumn, "left");
        appendTenseGroups(modeGroups.right || [], nominalColumn, "right");
        columns.push(nominalColumn);
        mainWrap.classList.add("tense-tabs-main--semantic-single");
      } else if (verbSemanticGroups.length) {
        const verbColumn = targetObject.document.createElement("div");
        verbColumn.className = "tense-tabs-column";
        appendTenseGroups(verbSemanticGroups, verbColumn, "verb");
        columns.push(verbColumn);
        mainWrap.classList.add("tense-tabs-main--semantic-single");
      } else {
        const leftColumn = targetObject.document.createElement("div");
        leftColumn.className = "tense-tabs-column";
        const rightColumn = targetObject.document.createElement("div");
        rightColumn.className = "tense-tabs-column";
        appendTenseGroups(modeGroups.left, leftColumn, "left");
        appendTenseGroups(modeGroups.right, rightColumn, "right");
        columns.push(leftColumn, rightColumn);
      }
      columns.forEach(columnEl => {
        mainWrap.appendChild(columnEl);
      });
      container.appendChild(mainWrap);
      if (outputUniversalContainer) {
        outputUniversalContainer.innerHTML = "";
        outputUniversalContainer.hidden = !shouldShowOutputControls;
        outputUniversalContainer.setAttribute("role", "tablist");
        outputUniversalContainer.setAttribute("aria-label", targetObject.getLocalizedLabel({
          labelEs: getAndrewsFirstUniversalTabsAriaLabel(),
          labelNa: getAndrewsFirstUniversalTabsAriaLabel()
        }, isNawat, getAndrewsFirstUniversalTabsAriaLabel()));
        if (shouldShowOutputControls) {
          const universalWrap = targetObject.document.createElement("div");
          universalWrap.className = "tense-tabs-universal";
          const activeUniversal = selectedUniversal;
          availability.forEach(entry => {
            const tenseValue = entry?.tenseValue || "";
            const available = resolveTenseAvailabilityIsAvailable(entry) === true;
            const button = targetObject.document.createElement("button");
            button.type = "button";
            button.className = "tense-tab";
            button.setAttribute("role", "tab");
            button.dataset.tenseValue = tenseValue;
            button.dataset.tenseGroup = "universal";
            button.dataset.tenseColumn = "universal";
            const activeRecord = unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(targetObject.COMBINED_MODE.active)?.get(tenseValue) : resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.active);
            const nonactiveRecord = unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(targetObject.COMBINED_MODE.nonactive)?.get(tenseValue) : resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.nonactive);
            button.dataset.availabilityState = entry?.availabilityState || "";
            const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord) === true;
            const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
            const hasOutput = activeOutput || nonactiveOutput;
            if (hasOutput === false) {
              button.classList.add("is-empty");
            }
            const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            if (activeGroup === targetObject.CONJUGATION_GROUPS.universal && tenseValue === activeUniversal && available) {
              button.classList.add("is-active");
            } else if (activeGroup === targetObject.CONJUGATION_GROUPS.tense && isClassTenseSelected && classKey && selectionState.classFilter === classKey) {
              button.classList.add("is-active");
            }
            const classDetail = targetObject.getPretUniversalClassDetail(tenseValue);
            const label = targetObject.document.createElement("span");
            label.className = "tense-tab-label";
            label.textContent = classDetail ? targetObject.getLocalizedLabel(classDetail.label, isNawat, tenseValue) : tenseValue;
            button.appendChild(label);
            button.title = getAndrewsFirstTenseHoverTitle(tenseValue, tenseMode);
            applyAndrewsTenseAuthorityDataset(button, {
              tenseValue,
              mode: tenseMode
            });
            const selectionAuthority = applyAndrewsTenseTabSelectionAuthorityDataset(button, {
              tenseValue,
              mode: tenseMode,
              hasOutput,
              isAvailable: available,
              endsWithConsonant,
              isUniversal: true
            });
            button.setAttribute("aria-selected", String(button.classList.contains("is-active")));
            button.disabled = selectionAuthority.disabled;
            button.addEventListener("click", () => {
              applyAndrewsTenseTabClickAuthorityDataset(button);
              if (!isAndrewsTenseTabClickAllowed(button)) {
                return;
              }
              const currentSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
                tenseMode
              });
              const classSelectionActive = targetObject.PRETERITO_CLASS_TENSES.has(currentSelectionState.tenseValue);
              if (currentSelectionState.group === targetObject.CONJUGATION_GROUPS.universal && tenseValue === currentSelectionState.universalTenseValue) {
                targetObject.mutateConjugationSelectionState({
                  tenseMode,
                  group: targetObject.CONJUGATION_GROUPS.tense
                }, {
                  tenseMode,
                  availabilityEntries: availability
                });
                targetObject.preserveViewportAnchorPosition(button, () => {
                  renderTenseTabs();
                  rerenderActiveConjugations(currentSelectionState.tenseValue);
                });
                return;
              }
              if (currentSelectionState.group === targetObject.CONJUGATION_GROUPS.tense && classSelectionActive && classKey) {
                targetObject.mutateConjugationSelectionState({
                  tenseMode,
                  classFilter: currentSelectionState.classFilter === classKey ? null : classKey
                }, {
                  tenseMode,
                  availabilityEntries: availability
                });
                targetObject.preserveViewportAnchorPosition(button, () => {
                  renderTenseTabs();
                  rerenderActiveConjugations(currentSelectionState.tenseValue);
                });
                return;
              }
              targetObject.mutateConjugationSelectionState({
                tenseMode,
                group: targetObject.CONJUGATION_GROUPS.universal,
                universalTenseValue: tenseValue
              }, {
                tenseMode,
                availabilityEntries: availability
              });
              targetObject.preserveViewportAnchorPosition(button, () => {
                renderTenseTabs();
                rerenderActiveConjugations();
              });
            });
            universalWrap.appendChild(button);
          });
          outputUniversalContainer.appendChild(universalWrap);
        }
      }
      renderNonactiveTabs({
        verbMeta,
        verb,
        analysisVerb,
        hasVerb,
        endsWithConsonant
      });
      targetObject.TenseTabsDomSignature = tenseTabsSignature;
      targetObject.restoreTenseTabsFocusState(container, focusState);
      targetObject.restoreTenseTabsFocusState(outputUniversalContainer, focusState);
    }
    function mapDerivationStemsToAvailabilityTargets({
      stems = [],
      directionalPrefix = "",
      isYawi = false
    }) {
      return stems.map(stem => {
        const stemAnalysis = targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix);
        return {
          verb: stem,
          analysisVerb: stemAnalysis,
          isYawi,
          isWeya: false
        };
      });
    }
    function buildDerivationAvailabilityCoreOptions({
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      verbMeta = null,
      suppletiveStemSet = null
    }) {
      return {
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb: verbMeta,
        directionalPrefix: verbMeta?.directionalPrefix,
        isYawi: verbMeta?.isYawi,
        suppletiveStemSet
      };
    }
    function buildDerivationAvailabilityTargets({
      derivationType = "",
      verb = "",
      analysisVerb = "",
      objectPrefix = "",
      verbMeta = null,
      suppletiveStemSet = null
    }) {
      const baseTargets = [{
        verb,
        analysisVerb,
        isYawi: verbMeta?.isYawi,
        isWeya: verbMeta?.isWeya
      }];
      const coreOptions = buildDerivationAvailabilityCoreOptions({
        verb,
        analysisVerb,
        objectPrefix,
        verbMeta,
        suppletiveStemSet
      });
      const forwardConfig = targetObject.getForwardDerivationConfig(derivationType);
      if (!forwardConfig) {
        return {
          availabilityTargets: baseTargets,
          suppletiveStemSet
        };
      }
      const forwardDerivation = targetObject.applySelectedForwardDerivation({
        derivationType,
        derivationOptions: coreOptions,
        enabled: true
      });
      if (forwardDerivation.blocked) {
        return {
          availabilityTargets: [],
          suppletiveStemSet
        };
      }
      const stems = targetObject.resolveDerivedStemList(forwardDerivation[forwardConfig.resultField], forwardDerivation.verb || verb);
      return {
        availabilityTargets: mapDerivationStemsToAvailabilityTargets({
          stems,
          directionalPrefix: verbMeta?.directionalPrefix,
          isYawi: forwardDerivation.isYawi ?? verbMeta?.isYawi
        }),
        suppletiveStemSet: forwardDerivation.suppletiveStemSet ?? suppletiveStemSet
      };
    }
    function buildPretUniversalTenseAvailability({
      hasVerb = false,
      suppletiveStemSet = null,
      availabilityTargets = [],
      isTransitive = false,
      verbMeta = null,
      derivationType = ""
    }) {
      return targetObject.PRETERITO_UNIVERSAL_ORDER.map(tenseValue => {
        if (!hasVerb) {
          return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: targetObject.COMBINED_MODE.active,
            source: "pret-universal-class",
            available: false,
            hasOutput: false
          });
        }
        if (suppletiveStemSet) {
          const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
          const variants = classKey ? suppletiveStemSet.variantsByClass.get(classKey) : null;
          const isAvailable = !!(variants && variants.length);
          return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: targetObject.COMBINED_MODE.active,
            source: "pret-universal-class",
            available: isAvailable,
            hasOutput: isAvailable
          });
        }
        if (!availabilityTargets.length) {
          return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: targetObject.COMBINED_MODE.active,
            source: "pret-universal-class",
            available: false,
            hasOutput: false
          });
        }
        const hasVariants = availabilityTargets.some(target => {
          const variants = targetObject.getPretUniversalVariants(target.verb, tenseValue, isTransitive, target.analysisVerb, targetObject.buildPretVariantsOptionsFromMeta(verbMeta, {
            isYawi: target.isYawi,
            isWeya: target.isWeya,
            derivationType
          }));
          return !!(variants && variants.length);
        });
        return buildTenseAvailabilityRecord({
          tenseValue,
          combinedMode: targetObject.COMBINED_MODE.active,
          source: "pret-universal-class",
          available: hasVariants,
          hasOutput: hasVariants
        });
      });
    }
    function buildAvailabilityMemoContext({
      tenseMode = "",
      isNonactiveMode = false,
      derivationType = "",
      derivationMode = "",
      voiceMode = ""
    }) {
      return [tenseMode, isNonactiveMode ? "nonactive" : "active", derivationType || "", derivationMode || "", voiceMode || ""].join("|");
    }
    function buildVerbOutputContextForTenseTabs({
      tenseMode,
      isNonactiveMode,
      verbMeta
    }) {
      if (tenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const nonactiveConfig = isNonactiveMode ? targetObject.getNonactiveObjectPrefixGroups(verbMeta) : null;
      const objectPrefixGroups = targetObject.getVerbObjectPrefixGroups(verbMeta, isNonactiveMode, nonactiveConfig);
      const objectPrefixes = Array.from(new Set(objectPrefixGroups.flatMap(group => group.prefixes)));
      const valencySummary = isNonactiveMode ? targetObject.getVerbValencySummary(verbMeta) : null;
      const fusionMarkers = verbMeta.isTaFusion ? (verbMeta.fusionPrefixes || []).filter(prefix => targetObject.FUSION_PREFIXES.has(prefix)) : [];
      return {
        objectPrefixes,
        objectPrefixGroups,
        subjectSelections: targetObject.getSubjectPersonSelections(),
        valencySummary,
        fusionMarkers
      };
    }
    function resolveVerbTenseAvailabilityRecord({
      tenseValue,
      verbOutputContext,
      hasVerb,
      endsWithConsonant,
      isNonactiveMode,
      displayVerb,
      availabilityProbeMemo,
      availabilityMemoContext = "",
      tenseOutputCache
    }) {
      if (!verbOutputContext || !hasVerb || endsWithConsonant) {
        return null;
      }
      if (tenseOutputCache instanceof Map && tenseOutputCache.has(tenseValue)) {
        return tenseOutputCache.get(tenseValue);
      }
      let availabilityRecord = buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: isNonactiveMode ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
        source: isNonactiveMode ? "verb-nonactive-tense-tab" : "verb-active-tense-tab",
        available: false,
        hasOutput: false
      });
      if (isNonactiveMode) {
        const summary = verbOutputContext.valencySummary;
        if (summary) {
          availabilityRecord = resolveNonactiveVerbTenseAvailabilityRecord({
            verb: displayVerb,
            tenseValue,
            objectPrefixGroups: verbOutputContext.objectPrefixGroups,
            activeValency: summary.baseValency,
            nonactiveAvailableSlots: summary.nonactiveObjectSlots,
            hasPromotableObject: summary.baseObjectSlots > summary.fusionObjectSlots,
            fusionMarkers: verbOutputContext.fusionMarkers,
            availabilityMemo: availabilityProbeMemo,
            availabilityMemoContext
          });
        }
      } else {
        availabilityRecord = resolveActiveVerbTenseAvailabilityRecord({
          verb: displayVerb,
          tenseValue,
          objectPrefixes: verbOutputContext.objectPrefixes,
          subjectSelections: verbOutputContext.subjectSelections,
          availabilityMemo: availabilityProbeMemo,
          availabilityMemoContext
        });
      }
      if (tenseOutputCache instanceof Map) {
        tenseOutputCache.set(tenseValue, availabilityRecord);
      }
      return availabilityRecord;
    }
    function renderPretUniversalTabs() {
      renderTenseTabs();
    }

    const api = {};
    Object.defineProperty(api, "NonactiveSelectionContextSignature", {
        configurable: true,
        enumerable: true,
        get() { return NonactiveSelectionContextSignature; },
        set(value) { NonactiveSelectionContextSignature = value; },
    });
    api.getObjectCategory = getObjectCategory;
    api.getObjectValenceCategory = getObjectValenceCategory;
    api.getValenceCategoryLabel = getValenceCategoryLabel;
    api.getObjectValenceLabel = getObjectValenceLabel;
    api.getObjectValenceLabelForGroup = getObjectValenceLabelForGroup;
    api.hashSignatureToUInt32 = hashSignatureToUInt32;
    api.normalizePrefixForComboPalette = normalizePrefixForComboPalette;
    api.buildBlockComboPaletteSignature = buildBlockComboPaletteSignature;
    Object.defineProperty(api, "COMBO_PALETTE_THEME_HUES", {
        configurable: true,
        enumerable: true,
        get() { return COMBO_PALETTE_THEME_HUES; },
    });
    api.getComboPaletteSwatch = getComboPaletteSwatch;
    api.applyTenseBlockComboPalette = applyTenseBlockComboPalette;
    api.applyObjectSectionCategory = applyObjectSectionCategory;
    api.applyConjugationRowClasses = applyConjugationRowClasses;
    api.renderVerbMirror = renderVerbMirror;
    api.handleVerbMirrorBeforeInput = handleVerbMirrorBeforeInput;
    api.getVerbPrefixText = getVerbPrefixText;
    api.initUiScaleControl = initUiScaleControl;
    api.normalizeUiDensityMode = normalizeUiDensityMode;
    api.getActiveUiDensityMode = getActiveUiDensityMode;
    api.filterTenseOrderForUiDensity = filterTenseOrderForUiDensity;
    api.getUiDensityButtons = getUiDensityButtons;
    api.getVerbSourceScopeButtons = getVerbSourceScopeButtons;
    api.syncVerbSourceScopeControl = syncVerbSourceScopeControl;
    api.applyVerbSourceScope = applyVerbSourceScope;
    api.initVerbSourceScopeControl = initVerbSourceScopeControl;
    api.captureUiDensityGrammarSnapshot = captureUiDensityGrammarSnapshot;
    api.restoreUiDensityGrammarSnapshot = restoreUiDensityGrammarSnapshot;
    api.forceDirectDerivationForSimpleMode = forceDirectDerivationForSimpleMode;
    api.forceSimpleModeGrammarDefaults = forceSimpleModeGrammarDefaults;
    api.applyUiDensityMode = applyUiDensityMode;
    api.initUiDensityControl = initUiDensityControl;
    api.initZoomFontLock = initZoomFontLock;
    api.registerEscapeOverlayHandler = registerEscapeOverlayHandler;
    api.closeEscapeManagedOverlay = closeEscapeManagedOverlay;
    api.initTutorialPanel = initTutorialPanel;
    api.matchesAltShortcutKey = matchesAltShortcutKey;
    api.resolveAltShortcutLegendDescription = resolveAltShortcutLegendDescription;
    api.buildKeyboardLegendEntries = buildKeyboardLegendEntries;
    api.buildKeyboardLegendSections = buildKeyboardLegendSections;
    api.renderKeyboardLegendEntries = renderKeyboardLegendEntries;
    api.resetKeyboardLegendPopoverPosition = resetKeyboardLegendPopoverPosition;
    api.positionKeyboardLegendPopover = positionKeyboardLegendPopover;
    api.initKeyboardLegendPopover = initKeyboardLegendPopover;
    api.resolveNonactiveSuffixOptionMap = resolveNonactiveSuffixOptionMap;
    api.buildNonactiveSelectionContextSignature = buildNonactiveSelectionContextSignature;
    api.normalizeSelectedNonactiveSuffix = normalizeSelectedNonactiveSuffix;
    api.renderNonactiveTabs = renderNonactiveTabs;
    api.getPanelConjugationRenderableSurface = getPanelConjugationRenderableSurface;
    api.splitPanelConjugationRenderableSurfaceText = splitPanelConjugationRenderableSurfaceText;
    api.getPanelConjugationRenderableSurfaceForms = getPanelConjugationRenderableSurfaceForms;
    api.isConjugationResultVisible = isConjugationResultVisible;
    api.buildVerbModeGenerateOverride = buildVerbModeGenerateOverride;
    api.buildTenseAvailabilityRecord = buildTenseAvailabilityRecord;
    api.resolveTenseAvailabilityHasOutput = resolveTenseAvailabilityHasOutput;
    api.resolveTenseAvailabilityIsAvailable = resolveTenseAvailabilityIsAvailable;
    api.resolveActiveVerbTenseAvailabilityRecord = resolveActiveVerbTenseAvailabilityRecord;
    api.resolveNonactiveVerbTenseAvailabilityRecord = resolveNonactiveVerbTenseAvailabilityRecord;
    api.buildUnifiedVerbTenseAvailabilityMatrix = buildUnifiedVerbTenseAvailabilityMatrix;
    api.setTensePresenceBadges = setTensePresenceBadges;
    api.getSubjectlessNominalSelectionEntry = getSubjectlessNominalSelectionEntry;
    api.buildNominalAvailabilityObjectSlotModels = buildNominalAvailabilityObjectSlotModels;
    api.resolveNominalCombinationAvailabilityRecord = resolveNominalCombinationAvailabilityRecord;
    api.resolveLocativoTemporalTenseAvailabilityRecord = resolveLocativoTemporalTenseAvailabilityRecord;
    api.resolveNominalTenseAvailabilityRecord = resolveNominalTenseAvailabilityRecord;
    api.getAndrewsFirstTenseTabsAriaLabel = getAndrewsFirstTenseTabsAriaLabel;
    api.getAndrewsFirstUniversalTabsAriaLabel = getAndrewsFirstUniversalTabsAriaLabel;
    Object.defineProperty(api, "ANDREWS_TENSE_AUTHORITY_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_TENSE_AUTHORITY_BY_TENSE; },
    });
    api.cloneAndrewsTenseAuthorityFrame = cloneAndrewsTenseAuthorityFrame;
    Object.defineProperty(api, "ANDREWS_TENSE_ROUTE_AUTHORITY_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_TENSE_ROUTE_AUTHORITY_BY_TENSE; },
    });
    Object.defineProperty(api, "AndrewsTenseSourceTargetRouteRegistryCache", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsTenseSourceTargetRouteRegistryCache; },
        set(value) { AndrewsTenseSourceTargetRouteRegistryCache = value; },
    });
    api.normalizeAndrewsSourceTargetFormulaType = normalizeAndrewsSourceTargetFormulaType;
    api.getAndrewsSourceTargetFormulaTransition = getAndrewsSourceTargetFormulaTransition;
    api.getAndrewsSourceTargetRouteClass = getAndrewsSourceTargetRouteClass;
    api.getAndrewsSourceTargetRouteUiHost = getAndrewsSourceTargetRouteUiHost;
    api.getAndrewsSourceTargetRouteRegistryRoutes = getAndrewsSourceTargetRouteRegistryRoutes;
    api.getAndrewsSourceTargetRouteRegistryMatches = getAndrewsSourceTargetRouteRegistryMatches;
    api.getAndrewsTenseSourceTargetRouteSpec = getAndrewsTenseSourceTargetRouteSpec;
    api.getAndrewsTenseSourceTargetRouteAuthorityFrame = getAndrewsTenseSourceTargetRouteAuthorityFrame;
    api.getAndrewsCnvCnnOperationalLayerForTense = getAndrewsCnvCnnOperationalLayerForTense;
    api.getAndrewsCnvCnnOperationalLayerDisplayText = getAndrewsCnvCnnOperationalLayerDisplayText;
    api.syncAndrewsTenseOperationalLayerElement = syncAndrewsTenseOperationalLayerElement;
    api.syncAndrewsTenseBlockOperationalLayerElement = syncAndrewsTenseBlockOperationalLayerElement;
    api.appendAndrewsOperationalLayerOperationRows = appendAndrewsOperationalLayerOperationRows;
    api.syncAndrewsTenseTabsOperationalLayerPanel = syncAndrewsTenseTabsOperationalLayerPanel;
    api.getAndrewsTenseAuthorityFrame = getAndrewsTenseAuthorityFrame;
    api.getAndrewsTenseGenerationGateFrame = getAndrewsTenseGenerationGateFrame;
    api.getAndrewsTenseGenerationGateValue = getAndrewsTenseGenerationGateValue;
    api.isAndrewsCnvTenseGenerationGateAllowed = isAndrewsCnvTenseGenerationGateAllowed;
    api.getAndrewsTenseAuthorityElementContract = getAndrewsTenseAuthorityElementContract;
    api.getAndrewsTenseExecutorGateFrame = getAndrewsTenseExecutorGateFrame;
    api.getAndrewsTenseTabSelectionAuthorityState = getAndrewsTenseTabSelectionAuthorityState;
    api.buildAndrewsTenseTabClickAuthorityModel = buildAndrewsTenseTabClickAuthorityModel;
    api.getAndrewsTenseTabClickAuthorityState = getAndrewsTenseTabClickAuthorityState;
    api.applyAndrewsTenseTabClickAuthorityDataset = applyAndrewsTenseTabClickAuthorityDataset;
    api.isAndrewsTenseTabClickAllowed = isAndrewsTenseTabClickAllowed;
    api.buildAndrewsTenseTabSelectionAuditModel = buildAndrewsTenseTabSelectionAuditModel;
    api.getEmptyAndrewsTenseTabSelectionAuditRecord = getEmptyAndrewsTenseTabSelectionAuditRecord;
    api.getAndrewsTenseTabSelectionAuditModelTarget = getAndrewsTenseTabSelectionAuditModelTarget;
    api.applyAndrewsTenseTabSelectionAuthorityDataset = applyAndrewsTenseTabSelectionAuthorityDataset;
    api.applyAndrewsTenseAuthorityDataset = applyAndrewsTenseAuthorityDataset;
    api.getAndrewsTenseAuthorityExpectedDataset = getAndrewsTenseAuthorityExpectedDataset;
    api.getAndrewsTenseAuthorityCanonicalMismatches = getAndrewsTenseAuthorityCanonicalMismatches;
    api.getAndrewsTenseAuthorityExpectedClasses = getAndrewsTenseAuthorityExpectedClasses;
    api.getAndrewsTenseAuthorityClassMismatches = getAndrewsTenseAuthorityClassMismatches;
    api.getEmptyAndrewsTenseBlockOutputRowAuditRecord = getEmptyAndrewsTenseBlockOutputRowAuditRecord;
    api.getAndrewsTenseBlockOutputRowAuditRecord = getAndrewsTenseBlockOutputRowAuditRecord;
    api.getAndrewsTenseBlockOutputAuditRecord = getAndrewsTenseBlockOutputAuditRecord;
    api.applyAndrewsTenseBlockOutputAuditDataset = applyAndrewsTenseBlockOutputAuditDataset;
    api.getAndrewsTenseAuthorityDatasetAuditRecord = getAndrewsTenseAuthorityDatasetAuditRecord;
    api.auditAndrewsTenseAuthorityAnnotatedDom = auditAndrewsTenseAuthorityAnnotatedDom;
    api.summarizeAndrewsTenseBlockOutputAudit = summarizeAndrewsTenseBlockOutputAudit;
    api.getAndrewsTenseTabSelectionAuditRecord = getAndrewsTenseTabSelectionAuditRecord;
    api.summarizeAndrewsTenseTabSelectionAudit = summarizeAndrewsTenseTabSelectionAudit;
    api.getAndrewsTenseAuthorityDomDescriptor = getAndrewsTenseAuthorityDomDescriptor;
    api.syncAndrewsTenseAuthorityDomAudit = syncAndrewsTenseAuthorityDomAudit;
    api.getAndrewsFirstTenseHoverTitle = getAndrewsFirstTenseHoverTitle;
    api.getAndrewsFirstGroupHoverTitle = getAndrewsFirstGroupHoverTitle;
    api.buildFormalReroutedFunctionTenseGroups = buildFormalReroutedFunctionTenseGroups;
    Object.defineProperty(api, "AndrewsFormulaWorkbenchActiveCategoryId", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsFormulaWorkbenchActiveCategoryId; },
        set(value) { AndrewsFormulaWorkbenchActiveCategoryId = value; },
    });
    api.getAndrewsFormulaWorkbenchContainer = getAndrewsFormulaWorkbenchContainer;
    api.getAndrewsFormulaWorkbenchUiModel = getAndrewsFormulaWorkbenchUiModel;
    api.normalizeAndrewsFormulaWorkbenchUiCategoryId = normalizeAndrewsFormulaWorkbenchUiCategoryId;
    api.getAndrewsFormulaWorkbenchUiStatusLabel = getAndrewsFormulaWorkbenchUiStatusLabel;
    api.appendAndrewsFormulaWorkbenchPill = appendAndrewsFormulaWorkbenchPill;
    api.syncAndrewsFormulaWorkbenchCategoryToEngine = syncAndrewsFormulaWorkbenchCategoryToEngine;
    api.activateAndrewsFormulaWorkbenchCategory = activateAndrewsFormulaWorkbenchCategory;
    api.appendAndrewsFormulaWorkbenchCategoryTabs = appendAndrewsFormulaWorkbenchCategoryTabs;
    api.appendAndrewsFormulaWorkbenchSlotRail = appendAndrewsFormulaWorkbenchSlotRail;
    api.applyAndrewsFormulaWorkbenchSourceInput = applyAndrewsFormulaWorkbenchSourceInput;
    api.appendAndrewsFormulaWorkbenchOperationalLayer = appendAndrewsFormulaWorkbenchOperationalLayer;
    api.appendAndrewsFormulaWorkbenchSlice = appendAndrewsFormulaWorkbenchSlice;
    api.appendAndrewsFormulaWorkbenchDetail = appendAndrewsFormulaWorkbenchDetail;
    api.renderAndrewsFormulaWorkbench = renderAndrewsFormulaWorkbench;
    Object.defineProperty(api, "AndrewsRouteBoardDestinationKey", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsRouteBoardDestinationKey; },
        set(value) { AndrewsRouteBoardDestinationKey = value; },
    });
    Object.defineProperty(api, "AndrewsRouteBoardPinnedSourceInput", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsRouteBoardPinnedSourceInput; },
        set(value) { AndrewsRouteBoardPinnedSourceInput = value; },
    });
    Object.defineProperty(api, "AndrewsRouteBoardPinnedSourceStage", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsRouteBoardPinnedSourceStage; },
        set(value) { AndrewsRouteBoardPinnedSourceStage = value; },
    });
    Object.defineProperty(api, "AndrewsRouteBoardActiveJourney", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsRouteBoardActiveJourney; },
        set(value) { AndrewsRouteBoardActiveJourney = value; },
    });
    Object.defineProperty(api, "AndrewsRouteBoardSourceOverrideStage", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsRouteBoardSourceOverrideStage; },
        set(value) { AndrewsRouteBoardSourceOverrideStage = value; },
    });
    Object.defineProperty(api, "AndrewsRouteBoardContinuedJourney", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsRouteBoardContinuedJourney; },
        set(value) { AndrewsRouteBoardContinuedJourney = value; },
    });
    Object.defineProperty(api, "AndrewsRouteBoardJourneyHistory", {
        configurable: true,
        enumerable: true,
        get() { return AndrewsRouteBoardJourneyHistory; },
        set(value) { AndrewsRouteBoardJourneyHistory = value; },
    });
    api.clearAndrewsRouteBoardPinnedJourney = clearAndrewsRouteBoardPinnedJourney;
    api.normalizeAndrewsRouteBoardInputValue = normalizeAndrewsRouteBoardInputValue;
    api.getAndrewsRouteBoardRawInput = getAndrewsRouteBoardRawInput;
    api.getAndrewsRouteBoardUiSourceStage = getAndrewsRouteBoardUiSourceStage;
    api.appendAndrewsRouteBoardPill = appendAndrewsRouteBoardPill;
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_SVG_NS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_SVG_NS; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_STATIONS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_STATIONS; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_ROUTES", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_ROUTES; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_APPROVAL_COORDINATE_FLOOR", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_APPROVAL_COORDINATE_FLOOR; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_ORDER; },
    });
    Object.defineProperty(api, "ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_LABELS; },
    });
    api.createAndrewsRouteBoardSvgElement = createAndrewsRouteBoardSvgElement;
    api.getAndrewsRouteBoardMapRouteIdsFromEntry = getAndrewsRouteBoardMapRouteIdsFromEntry;
    api.andrewsRouteBoardMapEntryIncludesRouteId = andrewsRouteBoardMapEntryIncludesRouteId;
    api.findAndrewsRouteBoardMapEntryForRouteId = findAndrewsRouteBoardMapEntryForRouteId;
    api.getAndrewsRouteBoardMapEntryDestinationStationKey = getAndrewsRouteBoardMapEntryDestinationStationKey;
    api.findAndrewsRouteBoardMapEntryForStationKey = findAndrewsRouteBoardMapEntryForStationKey;
    api.addAndrewsRouteBoardMapRouteIds = addAndrewsRouteBoardMapRouteIds;
    api.getAndrewsRouteBoardMapRouteIds = getAndrewsRouteBoardMapRouteIds;
    api.getAndrewsRouteBoardMapStationKeysForRoutes = getAndrewsRouteBoardMapStationKeysForRoutes;
    api.getAndrewsRouteBoardMapStationServiceRoutes = getAndrewsRouteBoardMapStationServiceRoutes;
    api.applyAndrewsRouteBoardMapStationServiceDataset = applyAndrewsRouteBoardMapStationServiceDataset;
    api.getAndrewsRouteBoardMapTransferEntries = getAndrewsRouteBoardMapTransferEntries;
    api.getAndrewsRouteBoardMapRouteTerminalEntries = getAndrewsRouteBoardMapRouteTerminalEntries;
    api.getAndrewsRouteBoardMapRouteTerminalEndpointEntries = getAndrewsRouteBoardMapRouteTerminalEndpointEntries;
    api.getAndrewsRouteBoardMapDestinationCalloutEntries = getAndrewsRouteBoardMapDestinationCalloutEntries;
    api.getAndrewsRouteBoardMapCorridorEntries = getAndrewsRouteBoardMapCorridorEntries;
    api.getAndrewsRouteBoardMapStationStatus = getAndrewsRouteBoardMapStationStatus;
    api.getAndrewsRouteBoardMapStationLabelPlacement = getAndrewsRouteBoardMapStationLabelPlacement;
    api.getAndrewsRouteBoardMapStationRouteEntry = getAndrewsRouteBoardMapStationRouteEntry;
    api.getAndrewsRouteBoardMapStationFunctionUse = getAndrewsRouteBoardMapStationFunctionUse;
    api.getAndrewsRouteBoardMapStationCoordinateFrame = getAndrewsRouteBoardMapStationCoordinateFrame;
    api.applyAndrewsRouteBoardMapStationCoordinateDataset = applyAndrewsRouteBoardMapStationCoordinateDataset;
    api.getAndrewsRouteBoardMapGisLayerValue = getAndrewsRouteBoardMapGisLayerValue;
    api.getAndrewsRouteBoardMapGisLayerEntries = getAndrewsRouteBoardMapGisLayerEntries;
    api.appendAndrewsRouteBoardMapDimensionScale = appendAndrewsRouteBoardMapDimensionScale;
    api.getAndrewsRouteBoardMapPrimaryRouteSign = getAndrewsRouteBoardMapPrimaryRouteSign;
    api.getAndrewsRouteBoardMapPrimaryRouteEntry = getAndrewsRouteBoardMapPrimaryRouteEntry;
    api.appendAndrewsRouteBoardMapWayfinding = appendAndrewsRouteBoardMapWayfinding;
    api.getAndrewsRouteBoardMapItineraryFrame = getAndrewsRouteBoardMapItineraryFrame;
    api.getAndrewsRouteBoardMapTripPreviewFrame = getAndrewsRouteBoardMapTripPreviewFrame;
    api.appendAndrewsRouteBoardMapTripPreview = appendAndrewsRouteBoardMapTripPreview;
    api.getAndrewsRouteBoardMapAnnouncementFrame = getAndrewsRouteBoardMapAnnouncementFrame;
    api.appendAndrewsRouteBoardMapAnnouncements = appendAndrewsRouteBoardMapAnnouncements;
    api.getAndrewsRouteBoardMapTransferGuidanceFrame = getAndrewsRouteBoardMapTransferGuidanceFrame;
    api.appendAndrewsRouteBoardMapTransferGuidance = appendAndrewsRouteBoardMapTransferGuidance;
    api.getAndrewsRouteBoardMapHeadsignFrame = getAndrewsRouteBoardMapHeadsignFrame;
    api.appendAndrewsRouteBoardMapHeadsign = appendAndrewsRouteBoardMapHeadsign;
    api.getAndrewsRouteBoardMapContinuityFrame = getAndrewsRouteBoardMapContinuityFrame;
    api.appendAndrewsRouteBoardMapContinuity = appendAndrewsRouteBoardMapContinuity;
    api.appendAndrewsRouteBoardMapItinerary = appendAndrewsRouteBoardMapItinerary;
    api.getAndrewsRouteBoardMapStationStatusLabel = getAndrewsRouteBoardMapStationStatusLabel;
    api.getAndrewsRouteBoardMapStationDirectoryEntries = getAndrewsRouteBoardMapStationDirectoryEntries;
    api.appendAndrewsRouteBoardMapStationDirectory = appendAndrewsRouteBoardMapStationDirectory;
    api.getAndrewsRouteBoardMapDepartureEntries = getAndrewsRouteBoardMapDepartureEntries;
    api.getAndrewsRouteBoardMapOptionEntries = getAndrewsRouteBoardMapOptionEntries;
    api.appendAndrewsRouteBoardMapOptions = appendAndrewsRouteBoardMapOptions;
    api.appendAndrewsRouteBoardMapDepartures = appendAndrewsRouteBoardMapDepartures;
    api.getAndrewsRouteBoardMapDestinationActionLabel = getAndrewsRouteBoardMapDestinationActionLabel;
    api.getAndrewsRouteBoardMapDestinationEntries = getAndrewsRouteBoardMapDestinationEntries;
    api.appendAndrewsRouteBoardMapDestinations = appendAndrewsRouteBoardMapDestinations;
    api.getAndrewsRouteBoardMapRouteEntries = getAndrewsRouteBoardMapRouteEntries;
    api.getAndrewsRouteBoardMapEntryRouteKey = getAndrewsRouteBoardMapEntryRouteKey;
    api.getAndrewsRouteBoardMapEntryResistanceMetric = getAndrewsRouteBoardMapEntryResistanceMetric;
    api.getAndrewsRouteBoardMapRouteMetrics = getAndrewsRouteBoardMapRouteMetrics;
    api.applyAndrewsRouteBoardMapRouteMetricDataset = applyAndrewsRouteBoardMapRouteMetricDataset;
    api.appendAndrewsRouteBoardMapTerrainScale = appendAndrewsRouteBoardMapTerrainScale;
    api.appendAndrewsRouteBoardMapServiceSummary = appendAndrewsRouteBoardMapServiceSummary;
    api.getAndrewsRouteBoardMapServiceAdvisoryFrame = getAndrewsRouteBoardMapServiceAdvisoryFrame;
    api.appendAndrewsRouteBoardMapServiceAdvisory = appendAndrewsRouteBoardMapServiceAdvisory;
    api.getAndrewsRouteBoardMapApprovalFrame = getAndrewsRouteBoardMapApprovalFrame;
    api.appendAndrewsRouteBoardMapApprovalGate = appendAndrewsRouteBoardMapApprovalGate;
    api.activateAndrewsRouteBoardMapRoute = activateAndrewsRouteBoardMapRoute;
    api.activateAndrewsRouteBoardMapStation = activateAndrewsRouteBoardMapStation;
    api.attachAndrewsRouteBoardMapRouteControl = attachAndrewsRouteBoardMapRouteControl;
    api.attachAndrewsRouteBoardMapStationControl = attachAndrewsRouteBoardMapStationControl;
    api.appendAndrewsRouteBoardMapRegion = appendAndrewsRouteBoardMapRegion;
    api.appendAndrewsRouteBoardMapLabel = appendAndrewsRouteBoardMapLabel;
    api.appendAndrewsRouteBoardMapGeographyLayer = appendAndrewsRouteBoardMapGeographyLayer;
    api.appendAndrewsRouteBoardMapCompass = appendAndrewsRouteBoardMapCompass;
    api.getAndrewsRouteBoardMapRouteState = getAndrewsRouteBoardMapRouteState;
    api.getAndrewsRouteBoardMapLineStationCount = getAndrewsRouteBoardMapLineStationCount;
    api.appendAndrewsRouteBoardMapTrackBeds = appendAndrewsRouteBoardMapTrackBeds;
    api.appendAndrewsRouteBoardMapRouteDirections = appendAndrewsRouteBoardMapRouteDirections;
    api.appendAndrewsRouteBoardMapLineStations = appendAndrewsRouteBoardMapLineStations;
    api.appendAndrewsRouteBoardMapStationServiceBadges = appendAndrewsRouteBoardMapStationServiceBadges;
    api.appendAndrewsRouteBoardMapTransferHubs = appendAndrewsRouteBoardMapTransferHubs;
    api.appendAndrewsRouteBoardMapRouteTerminals = appendAndrewsRouteBoardMapRouteTerminals;
    api.appendAndrewsRouteBoardMapDestinationCallouts = appendAndrewsRouteBoardMapDestinationCallouts;
    api.getAndrewsRouteBoardMapProgressFrame = getAndrewsRouteBoardMapProgressFrame;
    api.appendAndrewsRouteBoardMapProgressMarker = appendAndrewsRouteBoardMapProgressMarker;
    api.appendAndrewsRouteBoardMapTransfers = appendAndrewsRouteBoardMapTransfers;
    api.appendAndrewsRouteBoardMapTerminalBoard = appendAndrewsRouteBoardMapTerminalBoard;
    api.appendAndrewsRouteBoardMapSymbolKey = appendAndrewsRouteBoardMapSymbolKey;
    api.appendAndrewsRouteBoardMapLayerStack = appendAndrewsRouteBoardMapLayerStack;
    api.appendAndrewsRouteBoardMapCorridors = appendAndrewsRouteBoardMapCorridors;
    api.appendAndrewsRouteBoardGeographyMap = appendAndrewsRouteBoardGeographyMap;
    api.getAndrewsRouteBoardBoundaryKindLabel = getAndrewsRouteBoardBoundaryKindLabel;
    api.getAndrewsRouteBoardBoundaryConfidenceLabel = getAndrewsRouteBoardBoundaryConfidenceLabel;
    api.getAndrewsRouteBoardGateDomainLabel = getAndrewsRouteBoardGateDomainLabel;
    api.getAndrewsRouteBoardHypothesisDomainLabel = getAndrewsRouteBoardHypothesisDomainLabel;
    api.getAndrewsRouteBoardPrimaryHypothesis = getAndrewsRouteBoardPrimaryHypothesis;
    api.getAndrewsRouteBoardHypothesisDomains = getAndrewsRouteBoardHypothesisDomains;
    api.getAndrewsRouteBoardHypothesisActionLabel = getAndrewsRouteBoardHypothesisActionLabel;
    api.formatAndrewsRouteBoardProbability = formatAndrewsRouteBoardProbability;
    api.getAndrewsRouteBoardGateDomainCounts = getAndrewsRouteBoardGateDomainCounts;
    api.serializeAndrewsRouteBoardGateDomains = serializeAndrewsRouteBoardGateDomains;
    api.getAndrewsRouteBoardTicketDimensionStatusLabel = getAndrewsRouteBoardTicketDimensionStatusLabel;
    api.getAndrewsRouteBoardSourceLayerRoleLabel = getAndrewsRouteBoardSourceLayerRoleLabel;
    api.serializeAndrewsRouteBoardTicketDimensions = serializeAndrewsRouteBoardTicketDimensions;
    api.serializeAndrewsRouteBoardSourceLayers = serializeAndrewsRouteBoardSourceLayers;
    api.cloneAndrewsRouteBoardSourceLayerFrame = cloneAndrewsRouteBoardSourceLayerFrame;
    api.serializeAndrewsRouteBoardStationLineStops = serializeAndrewsRouteBoardStationLineStops;
    api.serializeAndrewsRouteBoardConcourseStops = serializeAndrewsRouteBoardConcourseStops;
    api.serializeAndrewsRouteBoardPlatformTracks = serializeAndrewsRouteBoardPlatformTracks;
    api.serializeAndrewsRouteBoardIntentions = serializeAndrewsRouteBoardIntentions;
    api.cloneAndrewsRouteBoardIntentionFrame = cloneAndrewsRouteBoardIntentionFrame;
    api.cloneAndrewsRouteBoardConcourseFrame = cloneAndrewsRouteBoardConcourseFrame;
    api.cloneAndrewsRouteBoardPlatformFrame = cloneAndrewsRouteBoardPlatformFrame;
    api.cloneAndrewsRouteBoardRideFrame = cloneAndrewsRouteBoardRideFrame;
    api.buildAndrewsRouteBoardJourneyRideFrame = buildAndrewsRouteBoardJourneyRideFrame;
    api.getAndrewsRouteBoardActionMode = getAndrewsRouteBoardActionMode;
    api.restoreAndrewsRouteBoardInputIfBlank = restoreAndrewsRouteBoardInputIfBlank;
    api.buildAndrewsRouteBoardJourneyStationLineFrame = buildAndrewsRouteBoardJourneyStationLineFrame;
    api.buildAndrewsRouteBoardJourneySourceLayerFrame = buildAndrewsRouteBoardJourneySourceLayerFrame;
    api.buildAndrewsRouteBoardJourneyReceipt = buildAndrewsRouteBoardJourneyReceipt;
    api.pinAndrewsRouteBoardJourneySource = pinAndrewsRouteBoardJourneySource;
    api.setAndrewsRouteBoardActiveJourney = setAndrewsRouteBoardActiveJourney;
    api.getAndrewsRouteBoardActiveJourneyForBoard = getAndrewsRouteBoardActiveJourneyForBoard;
    api.getAndrewsRouteBoardActiveJourneyReceipt = getAndrewsRouteBoardActiveJourneyReceipt;
    api.cloneAndrewsRouteBoardJourneyForHistory = cloneAndrewsRouteBoardJourneyForHistory;
    api.getAndrewsRouteBoardJourneyHistoryForBoard = getAndrewsRouteBoardJourneyHistoryForBoard;
    api.getAndrewsRouteBoardJourneyHistoryReceipt = getAndrewsRouteBoardJourneyHistoryReceipt;
    api.getAndrewsRouteBoardContinuedJourneyForBoard = getAndrewsRouteBoardContinuedJourneyForBoard;
    api.getAndrewsRouteBoardContinuedJourneyReceipt = getAndrewsRouteBoardContinuedJourneyReceipt;
    api.continueAndrewsRouteBoardFromActiveJourney = continueAndrewsRouteBoardFromActiveJourney;
    api.activateAndrewsRouteBoardTarget = activateAndrewsRouteBoardTarget;
    api.buildAndrewsRouteBoardRouteMeta = buildAndrewsRouteBoardRouteMeta;
    api.getAndrewsRouteBoardRouteDestinationKey = getAndrewsRouteBoardRouteDestinationKey;
    api.getAndrewsRouteBoardLoopStateLabel = getAndrewsRouteBoardLoopStateLabel;
    api.getAndrewsRouteBoardRouteLoopCount = getAndrewsRouteBoardRouteLoopCount;
    api.getAndrewsRouteBoardRouteLoopState = getAndrewsRouteBoardRouteLoopState;
    api.getAndrewsRouteBoardResistanceRoleLabel = getAndrewsRouteBoardResistanceRoleLabel;
    api.getAndrewsRouteBoardEntryRoutePathLabel = getAndrewsRouteBoardEntryRoutePathLabel;
    api.getAndrewsRouteBoardJourneyRoutePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel;
    api.buildAndrewsRouteBoardDestinationOptionLabel = buildAndrewsRouteBoardDestinationOptionLabel;
    api.buildAndrewsRouteBoardNetworkLabel = buildAndrewsRouteBoardNetworkLabel;
    api.getAndrewsRouteBoardRouteStops = getAndrewsRouteBoardRouteStops;
    api.cloneAndrewsRouteBoardRouteConditionFrames = cloneAndrewsRouteBoardRouteConditionFrames;
    api.getAndrewsRouteBoardRouteConditionFrames = getAndrewsRouteBoardRouteConditionFrames;
    api.serializeAndrewsRouteBoardRouteConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames;
    api.appendAndrewsRouteBoardRouteConditions = appendAndrewsRouteBoardRouteConditions;
    api.appendAndrewsRouteBoardRouteStops = appendAndrewsRouteBoardRouteStops;
    api.appendAndrewsRouteBoardDimensions = appendAndrewsRouteBoardDimensions;
    api.getAndrewsRouteBoardConversionActionLabel = getAndrewsRouteBoardConversionActionLabel;
    api.appendAndrewsRouteBoardResistancePlan = appendAndrewsRouteBoardResistancePlan;
    api.appendAndrewsRouteBoardResistanceHypothesis = appendAndrewsRouteBoardResistanceHypothesis;
    api.appendAndrewsRouteBoardPassengerIntentions = appendAndrewsRouteBoardPassengerIntentions;
    api.appendAndrewsRouteBoardPassengerFrame = appendAndrewsRouteBoardPassengerFrame;
    api.appendAndrewsRouteBoardRideFrame = appendAndrewsRouteBoardRideFrame;
    api.appendAndrewsRouteBoardInputTicketDimensions = appendAndrewsRouteBoardInputTicketDimensions;
    api.appendAndrewsRouteBoardStationLine = appendAndrewsRouteBoardStationLine;
    api.getAndrewsRouteBoardActiveSourceLayer = getAndrewsRouteBoardActiveSourceLayer;
    api.appendAndrewsRouteBoardSourceLayers = appendAndrewsRouteBoardSourceLayers;
    api.appendAndrewsRouteBoardJourneySourceLayers = appendAndrewsRouteBoardJourneySourceLayers;
    api.appendAndrewsRouteBoardConcourse = appendAndrewsRouteBoardConcourse;
    api.appendAndrewsRouteBoardPlatforms = appendAndrewsRouteBoardPlatforms;
    api.renderAndrewsRouteBoardJourneyReceipt = renderAndrewsRouteBoardJourneyReceipt;
    api.renderAndrewsRouteBoardContinuedJourneyReceipt = renderAndrewsRouteBoardContinuedJourneyReceipt;
    api.renderAndrewsRouteBoardJourneyHistory = renderAndrewsRouteBoardJourneyHistory;
    api.renderAndrewsRouteBoardRouteList = renderAndrewsRouteBoardRouteList;
    api.renderAndrewsRouteBoard = renderAndrewsRouteBoard;
    api.renderTenseTabs = renderTenseTabs;
    api.mapDerivationStemsToAvailabilityTargets = mapDerivationStemsToAvailabilityTargets;
    api.buildDerivationAvailabilityCoreOptions = buildDerivationAvailabilityCoreOptions;
    api.buildDerivationAvailabilityTargets = buildDerivationAvailabilityTargets;
    api.buildPretUniversalTenseAvailability = buildPretUniversalTenseAvailability;
    api.buildAvailabilityMemoContext = buildAvailabilityMemoContext;
    api.buildVerbOutputContextForTenseTabs = buildVerbOutputContextForTenseTabs;
    api.resolveVerbTenseAvailabilityRecord = resolveVerbTenseAvailabilityRecord;
    api.renderPretUniversalTabs = renderPretUniversalTabs;
    return api;
}

export function installUiPanelsGlobals(targetObject = globalThis) {
    const api = createUiPanelsModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
