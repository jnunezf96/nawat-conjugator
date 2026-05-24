// Native wrapper generated from src/ui/panels/panels.js.

export function createUiPanelsApi(targetObject = globalThis) {
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
        return `verb|v4|${targetObject.getValence4ComboSignature({
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker
        })}`;
      }
      if (numericValency === 3) {
        const normalized = targetObject.resolveDisplayValencePrefixes({
          objectPrefix,
          indirectObjectMarker,
          derivationType
        });
        const mainline = normalizePrefixForComboPalette(normalized.objectPrefix || "", {
          collapseProjective: true
        });
        const shuntline = normalizePrefixForComboPalette(normalized.indirectObjectMarker || "", {
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
        targetObject.setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.active);
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
      }
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
        entries: entries.filter(entry => entry.label === "Tip"),
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
      const isTransitive = targetObject.isNonactiveTransitiveVerb(targetObject.getCurrentObjectPrefix(), verbMeta);
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
      const transitivity = targetObject.isNonactiveTransitiveVerb(objectPrefix, verbMeta) ? "transitive" : "intransitive";
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
    function isConjugationResultVisible({
      result,
      subjectPrefix,
      subjectSuffix,
      objectPrefix,
      comboObjectPrefix,
      enforceInvalidCombo = true,
      hideReflexive = false
    }) {
      if (!result || !result.result || result.result === "—") {
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
              skipTransitivityValidation: true,
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
          overridePayload.subjectPrefix = subjectOverride.subjectPrefix;
          overridePayload.subjectSuffix = subjectOverride.subjectSuffix;
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
      const resolvedPatientivoSource = isPatientivo ? patientivoSource || "nonactive" : null;
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
          if (useReduplicatedSingularSurface && result?.result) {
            const prefixChain = targetObject.buildPrefixedChain({
                subjectPrefix: selection.subjectPrefix,
                possessivePrefix: possessorPrefix,
                objectPrefix: targetObject.composeProjectiveObjectPrefix({
                  objectPrefix: resolvedObjectPrefix,
                  markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                  subjectPrefix: selection.subjectPrefix
                }),
                verb: ""
              });
            result = {
              ...result,
              result: targetObject.reduplicateConjugationDisplay(result.result, {
                prefixChain
              })
            };
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
        const valence4Violation = (context.nounObjectSlotStates?.length || 0) >= 3 && !targetObject.isValidValence4Combo({
          objectPrefix: resolvedObjectPrefix,
          indirectObjectMarker: resolvedIndirectObjectMarker,
          thirdObjectMarker: resolvedThirdObjectMarker
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
      }) => !context.showNonanimateOnly || targetObject.isNonanimateSubject(selection.subjectPrefix, selection.subjectSuffix));
      const possessorSelections = Array.isArray(context.visiblePossessorValues) && context.visiblePossessorValues.length ? context.visiblePossessorValues : [""];
      const objectSlotModels = buildNominalAvailabilityObjectSlotModels(context.nounObjectSlotStates);
      const patientivoSources = context.resolvedTense === "patientivo" ? ["nonactive", "perfectivo", "imperfectivo", "tronco-verbal"] : [null];
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
      if (tenseMode === targetObject.TENSE_MODE.verbo && targetObject.getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.both) {
        targetObject.setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.both, {
          syncCombinedMode: false
        });
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
      const nounVisibleTenses = isNominalMode ? Array.from(new Set([...nounActiveTenses, ...nounNonactiveTenses])) : [];
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
      const modeGroups = targetObject.TENSE_LINGUISTIC_GROUPS[tenseMode] || targetObject.TENSE_LINGUISTIC_GROUPS.verbo;
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
          const isTransitive = targetObject.isValencyFilled(targetObject.getCurrentObjectPrefix(), verbMeta);
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
        const hasOutput = (() => {
          if ((tenseMode === targetObject.TENSE_MODE.verbo || isNominalMode) && !resolvedCombinedMode) {
            const activeRecord = unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(targetObject.COMBINED_MODE.active)?.get(tenseValue) ?? resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.active) : resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.active);
            const nonactiveRecord = unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(targetObject.COMBINED_MODE.nonactive)?.get(tenseValue) ?? resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.nonactive) : resolveTenseAvailabilityRecord(tenseValue, targetObject.COMBINED_MODE.nonactive);
            if (activeRecord === null && nonactiveRecord === null) {
              return null;
            }
            const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord);
            const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord);
            button.dataset.availabilityState = activeRecord?.availabilityState || nonactiveRecord?.availabilityState || "";
            return activeOutput === true || nonactiveOutput === true;
          }
          const availabilityRecord = unifiedAvailabilityMatrix instanceof Map ? unifiedAvailabilityMatrix.get(resolvedCombinedMode || currentCombinedMode)?.get(tenseValue) ?? resolveTenseAvailabilityRecord(tenseValue, resolvedCombinedMode || currentCombinedMode) : resolveTenseAvailabilityRecord(tenseValue, resolvedCombinedMode || currentCombinedMode);
          button.dataset.availabilityState = availabilityRecord?.availabilityState || "";
          return resolveTenseAvailabilityHasOutput(availabilityRecord);
        })();
        const isBlockedNominalTense = blockedNominalTenseSet.has(tenseValue);
        if (hasOutput === false || isBlockedNominalTense) {
          button.classList.add("is-empty");
        }
        const label = targetObject.document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], isNawat, tenseValue);
        button.appendChild(label);
        button.disabled = endsWithConsonant || hasOutput === false || isBlockedNominalTense;
        button.addEventListener("click", () => {
          const currentSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
            tenseMode
          });
          const wasActive = currentSelectionState.group === targetObject.CONJUGATION_GROUPS.tense && tenseValue === currentSelectionState.tenseValue && (!resolvedCombinedMode || targetObject.getCombinedMode() === resolvedCombinedMode);
          if (resolvedCombinedMode && targetObject.getCombinedMode() !== resolvedCombinedMode) {
            targetObject.setCombinedMode(resolvedCombinedMode);
            targetObject.updateCombinedModeTabs();
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
          targetObject.preserveViewportAnchorPosition(button, () => {
            renderTenseTabs();
            rerenderActiveConjugations(tenseValue);
          });
        });
        return button;
      };
      const mainWrap = targetObject.document.createElement("div");
      mainWrap.className = "tense-tabs-main";
      mainWrap.setAttribute("role", "tablist");
      mainWrap.setAttribute("aria-label", targetObject.getLocalizedLabel({
        labelEs: "Tiempos principales",
        labelNa: "Tiempos principales"
      }, isNawat, "Tiempos principales"));
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
          labelEs: "Universal",
          labelNa: "Universal"
        }, isNawat, "Universal"));
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
            const hasOutput = resolveTenseAvailabilityHasOutput(activeRecord) === true || resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
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
            button.textContent = classDetail ? targetObject.getLocalizedLabel(classDetail.label, isNawat, tenseValue) : tenseValue;
            button.setAttribute("aria-selected", String(button.classList.contains("is-active")));
            button.disabled = endsWithConsonant || !available || hasOutput === false;
            button.addEventListener("click", () => {
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
    api.isConjugationResultVisible = isConjugationResultVisible;
    api.buildVerbModeGenerateOverride = buildVerbModeGenerateOverride;
    api.buildTenseAvailabilityRecord = buildTenseAvailabilityRecord;
    api.resolveTenseAvailabilityHasOutput = resolveTenseAvailabilityHasOutput;
    api.resolveTenseAvailabilityIsAvailable = resolveTenseAvailabilityIsAvailable;
    api.resolveActiveVerbTenseAvailabilityRecord = resolveActiveVerbTenseAvailabilityRecord;
    api.resolveNonactiveVerbTenseAvailabilityRecord = resolveNonactiveVerbTenseAvailabilityRecord;
    api.buildUnifiedVerbTenseAvailabilityMatrix = buildUnifiedVerbTenseAvailabilityMatrix;
    api.getSubjectlessNominalSelectionEntry = getSubjectlessNominalSelectionEntry;
    api.buildNominalAvailabilityObjectSlotModels = buildNominalAvailabilityObjectSlotModels;
    api.resolveNominalCombinationAvailabilityRecord = resolveNominalCombinationAvailabilityRecord;
    api.resolveLocativoTemporalTenseAvailabilityRecord = resolveLocativoTemporalTenseAvailabilityRecord;
    api.resolveNominalTenseAvailabilityRecord = resolveNominalTenseAvailabilityRecord;
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
    const api = createUiPanelsApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
