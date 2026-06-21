// ui/panels/panels.js
// UI class helpers, panel management, tab navigation.
// Extracted from script.js (UI Class Helpers section + UI Panels & Tabs).
// Global-scope module.

"use strict";

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
    if (NONSPECIFIC_VALENCE_AFFIX_SET.has(prefix)) {
        return "nonspecific";
    }
    if (SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
        return "specific";
    }
    return "specific";
}

function getValenceCategoryLabel(category, isNawat = false) {
    return category ? getLocalizedLabel(VALENCE_CATEGORY_LABELS[category], isNawat, "") : "";
}

function getObjectValenceLabel(prefix, isNawat = false) {
    const category = getObjectValenceCategory(prefix);
    return getValenceCategoryLabel(category, isNawat);
}

function getObjectValenceLabelForGroup(prefixes, isNawat = false) {
    const categories = new Set();
    prefixes.forEach((prefix) => {
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
    const labels = ordered
        .filter((category) => categories.has(category))
        .map((category) => getValenceCategoryLabel(category, isNawat))
        .filter(Boolean);
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
    if (value === OBJECT_TOGGLE_ALL) {
        return "*";
    }
    if (options.collapseProjective && VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value)) {
        return "ki";
    }
    if (options.collapseSilentSpecific && VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value)) {
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
    mode = "verb",
}) {
    const hasMixedSelection = [
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        possessorPrefix,
    ].some((value) => value === OBJECT_TOGGLE_ALL);
    if (hasMixedSelection) {
        return "mixed";
    }
    const numericValency = Number.isFinite(Number(valency))
        ? Math.max(1, Number(valency))
        : 1;
    if (mode === "noun") {
        const normalizedObject = normalizePrefixForComboPalette(objectPrefix);
        const normalizedIndirect = normalizePrefixForComboPalette(indirectObjectMarker);
        const normalizedThird = normalizePrefixForComboPalette(thirdObjectMarker);
        const normalizedPossessor = normalizePrefixForComboPalette(possessorPrefix);
        const normalizedOwnership = ownership ? String(ownership) : "default";
        return `noun|v${numericValency}|${normalizedObject}|${normalizedIndirect}|${normalizedThird}|${normalizedPossessor}|${normalizedOwnership}`;
    }
    if (numericValency >= 4) {
        return `verb|v4|${getObj1Obj2Obj3Signature({
            obj1: objectPrefix,
            obj2: indirectObjectMarker,
            obj3: thirdObjectMarker,
        })}`;
    }
    if (numericValency === 3) {
        const normalized = resolveDisplayObj1Obj2({
            obj1: objectPrefix,
            obj2: indirectObjectMarker,
            derivationType,
        });
        const mainline = normalizePrefixForComboPalette(normalized.obj1 || "", {
            collapseProjective: true,
        });
        const shuntline = normalizePrefixForComboPalette(normalized.obj2 || "", {
            collapseProjective: false,
        });
        return `verb|v3|${mainline}|${shuntline}`;
    }
    if (numericValency === 2) {
        const normalizedObject = normalizePrefixForComboPalette(objectPrefix, {
            collapseProjective: true,
        });
        return `verb|v2|${normalizedObject}`;
    }
    return `verb|v1|${normalizePrefixForComboPalette(objectPrefix, { collapseProjective: true })}`;
}

const COMBO_PALETTE_THEME_HUES = Object.freeze([
    26,  // warm earth
    34,  // sand / ochre
    44,  // gold
    146, // leaf green
    168, // accent-cool teal
    186, // aqua-teal
    202, // direct blue
    342, // reflexive rose
]);

function getComboPaletteSwatch(signature = "") {
    if (!signature || signature === "mixed") {
        return {
            background: "rgba(236, 230, 215, 0.86)",
            border: "rgba(132, 116, 91, 0.52)",
            text: "rgba(64, 53, 38, 0.95)",
            shadow: "0 12px 24px rgba(94, 70, 43, 0.16)",
        };
    }
    const hash = hashSignatureToUInt32(signature);
    const hueBase = COMBO_PALETTE_THEME_HUES[hash % COMBO_PALETTE_THEME_HUES.length];
    const hueShift = ((hash >>> 8) % 9) - 4;
    const hue = (hueBase + hueShift + 360) % 360;
    const saturation = 46 + ((hash >>> 13) % 10);
    const bgLightness = 90 + ((hash >>> 18) % 4);
    const borderLightness = 54 + ((hash >>> 22) % 9);
    const textLightness = 23 + ((hash >>> 27) % 9);
    const shadowAlpha = 0.12 + (((hash >>> 5) % 6) * 0.012);
    return {
        background: `hsl(${hue} ${saturation}% ${bgLightness}%)`,
        border: `hsl(${hue} ${Math.max(34, saturation - 12)}% ${borderLightness}%)`,
        text: `hsl(${hue} ${Math.max(28, saturation - 16)}% ${textLightness}%)`,
        shadow: `0 12px 24px hsla(${hue}, ${Math.max(30, saturation - 14)}%, 34%, ${shadowAlpha.toFixed(3)})`,
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
    sectionEl.classList.remove(
        "object-section--direct",
        "object-section--indirect",
        "object-section--reflexive",
        "object-section--te"
    );
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
    const scaleInput = document.getElementById("ui-scale");
    if (!scaleInput) {
        return;
    }
    const valueEl = document.getElementById("ui-scale-value");
    const root = document.documentElement;
    const baseAdjustRaw = getComputedStyle(root).getPropertyValue("--font-size-adjust");
    const baseAdjust = Number.parseFloat(baseAdjustRaw) || 0;
    const minValue = Number.parseFloat(scaleInput.min) || -6;
    const maxValue = Number.parseFloat(scaleInput.max) || 6;
    const safeMin = Math.max(minValue, -3);
    if (safeMin !== minValue) {
        scaleInput.min = String(safeMin);
    }
    const clampValue = (value) => Math.min(maxValue, Math.max(safeMin, value));
    const formatValue = (value) => (value > 0 ? `+${value}` : `${value}`);
    const applyScale = (offset) => {
        const nextAdjust = baseAdjust + offset;
        root.style.setProperty("--font-size-adjust", `${nextAdjust}px`);
        if (valueEl) {
            valueEl.textContent = formatValue(offset);
        }
    };
    let initialOffset = Number.parseFloat(scaleInput.value) || 0;
    try {
        const saved = window.localStorage ? localStorage.getItem(UI_SCALE_STORAGE_KEY) : null;
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
            if (window.localStorage) {
                localStorage.setItem(UI_SCALE_STORAGE_KEY, String(offset));
            }
        } catch {
            // Ignore storage failures.
        }
    });
}

function normalizeUiDensityMode(mode = "") {
    return mode === UI_DENSITY_MODE.advanced
        ? UI_DENSITY_MODE.advanced
        : UI_DENSITY_MODE.simple;
}

function getActiveUiDensityMode() {
    if (document.body?.classList.contains("is-ui-advanced")) {
        return UI_DENSITY_MODE.advanced;
    }
    return UI_DENSITY_MODE.simple;
}

function filterTenseOrderForUiDensity(tenses = [], mode = getActiveTenseMode()) {
    const list = Array.isArray(tenses) ? tenses : [];
    if (getActiveUiDensityMode() !== UI_DENSITY_MODE.simple) {
        return list.slice();
    }
    if (mode !== TENSE_MODE.verbo) {
        return list.slice();
    }
    return list.filter((tenseValue) => !UI_DENSITY_ADVANCED_TENSES.has(tenseValue));
}

function getUiDensityButtons() {
    return Array.from(document.querySelectorAll("[data-ui-density]"));
}

function getVerbSourceScopeButtons() {
    return Array.from(document.querySelectorAll("[data-verb-source-scope]"));
}

function syncVerbSourceScopeControl() {
    const control = document.getElementById("verb-source-scope-control");
    const buttons = getVerbSourceScopeButtons();
    const isAdvanced = getActiveUiDensityMode() === UI_DENSITY_MODE.advanced;
    const shouldShow = isAdvanced;
    if (control) {
        control.hidden = !shouldShow;
        control.classList.toggle("is-hidden", !shouldShow);
        control.setAttribute("aria-hidden", String(!shouldShow));
        control.setAttribute("aria-disabled", String(!shouldShow));
        control.setAttribute("aria-label", getUiCopyLabel("verb-source-scope-label", "Voz"));
    }
    const activeScope = getVerbSourceScope();
    buttons.forEach((button) => {
        const buttonScope = button.getAttribute("data-verb-source-scope") || "";
        const isActive = buttonScope === activeScope;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.disabled = !shouldShow;
        button.setAttribute("aria-disabled", String(!shouldShow));
    });
}

function applyVerbSourceScope(scope, anchor = null) {
    if (
        scope !== VERB_SOURCE_SCOPE.active
        && scope !== VERB_SOURCE_SCOPE.nonactive
        && scope !== VERB_SOURCE_SCOPE.both
    ) {
        return;
    }
    setVerbSourceScope(scope, { syncLock: true, respectLock: false });
    const update = () => {
        updateCombinedModeTabs();
        syncVerbSourceScopeControl();
        renderTenseTabs();
        const verbMeta = getVerbInputMeta();
        renderActiveConjugations({
            verb: verbMeta.displayVerb,
            objectPrefix: getCurrentObjectPrefix(),
        });
    };
    if (anchor) {
        preserveViewportAnchorPosition(anchor, update);
        return;
    }
    update();
}

function initVerbSourceScopeControl() {
    getVerbSourceScopeButtons().forEach((button) => {
        button.addEventListener("click", () => {
            if (getActiveUiDensityMode() !== UI_DENSITY_MODE.advanced) {
                return;
            }
            applyVerbSourceScope(button.getAttribute("data-verb-source-scope") || "", button);
        });
    });
    syncVerbSourceScopeControl();
}

function captureUiDensityGrammarSnapshot() {
    return {
        tenseMode: getActiveTenseMode(),
        combinedMode: getCombinedMode(),
        sourceScope: getVerbSourceScope(),
        derivationType: getActiveDerivationType(),
        nonactiveSuffix: getSelectedNonactiveSuffix(),
        selectionState: buildConjugationSelectionState(),
    };
}

function restoreUiDensityGrammarSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== "object") {
        return false;
    }
    if (Object.values(TENSE_MODE).includes(snapshot.tenseMode)) {
        setActiveTenseMode(snapshot.tenseMode);
    }
    if (Object.values(COMBINED_MODE).includes(snapshot.combinedMode)) {
        setCombinedMode(snapshot.combinedMode);
    }
    if (
        snapshot.sourceScope === VERB_SOURCE_SCOPE.active
        || snapshot.sourceScope === VERB_SOURCE_SCOPE.nonactive
        || snapshot.sourceScope === VERB_SOURCE_SCOPE.both
    ) {
        setVerbSourceScope(snapshot.sourceScope, { syncCombinedMode: false });
    }
    if (Object.values(DERIVATION_TYPE).includes(snapshot.derivationType)) {
        setActiveDerivationType(snapshot.derivationType);
        const select = document.getElementById("derivation-type");
        if (select) {
            select.value = snapshot.derivationType;
        }
    }
    if (snapshot.nonactiveSuffix === null) {
        setSelectedNonactiveSuffix(null);
    } else if (typeof snapshot.nonactiveSuffix === "string") {
        setSelectedNonactiveSuffix(snapshot.nonactiveSuffix);
    }
    updateTenseModeTabs();
    updateDerivationTypeControl();
    renderTenseTabs();
    applyConjugationSelectionState(
        extractConjugationSelectionState(snapshot, {
            tenseMode: snapshot.tenseMode,
            tenseValue: snapshot.tenseTab,
            universalTenseValue: snapshot.pretUniversalTab,
        }),
        {
            tenseMode: snapshot.tenseMode,
            availabilityEntries: PreteritoUniversalAvailabilityCache,
        }
    );
    renderTenseTabs();
    const verbMeta = getVerbInputMeta();
    const selectionState = getCurrentResolvedConjugationSelectionState();
    renderAllOutputs({
        verb: verbMeta.displayVerb,
        objectPrefix: getCurrentObjectPrefix(),
        tense: selectionState.group === CONJUGATION_GROUPS.universal
            ? selectionState.universalTenseValue
            : (selectionState.tenseValue || TENSE_ORDER[0] || "presente"),
    });
    return true;
}

function forceDirectDerivationForSimpleMode() {
    if (getActiveDerivationType() === DERIVATION_TYPE.direct) {
        return;
    }
    setActiveDerivationType(DERIVATION_TYPE.direct);
    const select = document.getElementById("derivation-type");
    if (select) {
        select.value = DERIVATION_TYPE.direct;
    }
    updateDerivationTypeControl();
    renderTenseTabs();
    const verbMeta = getVerbInputMeta();
    renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: getCurrentObjectPrefix(),
    });
}

function forceSimpleModeGrammarDefaults() {
    const defaultTenseMode = TENSE_MODE.verbo;
    if (getActiveTenseMode() !== defaultTenseMode) {
        setActiveTenseMode(defaultTenseMode);
    }
    if (getVerbSourceScope() !== VERB_SOURCE_SCOPE.active) {
        setVerbSourceScope(VERB_SOURCE_SCOPE.active, {
            syncCombinedMode: false,
            syncLock: false,
            respectLock: true,
        });
    }
    if (getCombinedMode() !== COMBINED_MODE.active) {
        setCombinedMode(COMBINED_MODE.active);
        updateCombinedModeTabs();
    }
    forceDirectDerivationForSimpleMode();
    updateTenseModeTabs();
    renderTenseTabs();
    const verbMeta = getVerbInputMeta();
    renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: getCurrentObjectPrefix(),
    });
}

function applyUiDensityMode(mode = "", { persist = true } = {}) {
    const nextMode = normalizeUiDensityMode(mode);
    const previousMode = getActiveUiDensityMode();
    const enteringSimple = previousMode !== UI_DENSITY_MODE.simple && nextMode === UI_DENSITY_MODE.simple;
    const leavingSimple = previousMode === UI_DENSITY_MODE.simple && nextMode === UI_DENSITY_MODE.advanced;
    const body = document.body;
    if (body) {
        body.classList.toggle("is-ui-simple", nextMode === UI_DENSITY_MODE.simple);
        body.classList.toggle("is-ui-advanced", nextMode === UI_DENSITY_MODE.advanced);
    }
    const buttons = getUiDensityButtons();
    buttons.forEach((button) => {
        const buttonMode = normalizeUiDensityMode(button.getAttribute("data-ui-density") || "");
        const isActive = buttonMode === nextMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
    if (enteringSimple) {
        UiDensityGrammarSnapshot = captureUiDensityGrammarSnapshot();
        forceSimpleModeGrammarDefaults();
    } else if (leavingSimple && UiDensityGrammarSnapshot) {
        restoreUiDensityGrammarSnapshot(UiDensityGrammarSnapshot);
        UiDensityGrammarSnapshot = null;
    } else if (leavingSimple && getActiveTenseMode() === TENSE_MODE.verbo) {
        setVerbSourceScope(VERB_SOURCE_SCOPE.both, { syncCombinedMode: false });
    }
    syncVerbSourceScopeControl();
    syncComposerSlotChipVisibility();
    scheduleComposerSlotChipVisibilitySync();
    dispatchAppEvent("app:ui-density-changed", {
        mode: nextMode,
        previousMode,
    });
    if (!persist) {
        return;
    }
    try {
        if (window.localStorage) {
            localStorage.setItem(UI_DENSITY_STORAGE_KEY, nextMode);
        }
    } catch {
        // Ignore storage failures.
    }
}

function initUiDensityControl() {
    const buttons = getUiDensityButtons();
    let initialMode = UI_DENSITY_MODE.simple;
    try {
        const saved = window.localStorage ? localStorage.getItem(UI_DENSITY_STORAGE_KEY) : null;
        if (saved) {
            initialMode = normalizeUiDensityMode(saved);
        }
    } catch {
        initialMode = UI_DENSITY_MODE.simple;
    }
    applyUiDensityMode(initialMode, { persist: false });
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const mode = button.getAttribute("data-ui-density") || "";
            applyUiDensityMode(mode);
        });
    });
}

function initZoomFontLock() {
    const isTouchMobile = typeof window !== "undefined"
        && typeof window.matchMedia === "function"
        && window.matchMedia("(max-width: 1024px)").matches
        && (
            ("ontouchstart" in window)
            || (navigator && typeof navigator.maxTouchPoints === "number" && navigator.maxTouchPoints > 0)
        );
    // On mobile/touch, keep native viewport behavior so manual pinch zoom
    // feels normal and the page does not fight user scale changes.
    if (isTouchMobile) {
        return;
    }
    const root = document.documentElement;
    if (!root) {
        return;
    }
    const baseFontSize = Number.parseFloat(getComputedStyle(root).fontSize) || 16;
    const baseDpr = window.devicePixelRatio || 1;
    const getScale = () => {
        if (window.visualViewport && Number.isFinite(window.visualViewport.scale)) {
            return window.visualViewport.scale;
        }
        const dpr = window.devicePixelRatio || 1;
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
    window.addEventListener("resize", applyScale);
    if (window.visualViewport && typeof window.visualViewport.addEventListener === "function") {
        window.visualViewport.addEventListener("resize", applyScale);
    }
}

function registerEscapeOverlayHandler({
    id = "",
    priority = 0,
    isOpen = null,
    onEscape = null,
} = {}) {
    const overlayId = String(id || "");
    if (!overlayId || typeof isOpen !== "function" || typeof onEscape !== "function") {
        return;
    }
    const nextHandler = {
        id: overlayId,
        priority: Number.isFinite(priority) ? priority : 0,
        sequence: ++ESCAPE_OVERLAY_HANDLER_SEQUENCE,
        isOpen,
        onEscape,
    };
    const existingIndex = ESCAPE_OVERLAY_HANDLERS.findIndex((entry) => entry.id === overlayId);
    if (existingIndex >= 0) {
        ESCAPE_OVERLAY_HANDLERS[existingIndex] = nextHandler;
        return;
    }
    ESCAPE_OVERLAY_HANDLERS.push(nextHandler);
}

function closeEscapeManagedOverlay(event = null) {
    const handlers = ESCAPE_OVERLAY_HANDLERS
        .filter((entry) => entry && typeof entry.isOpen === "function" && entry.isOpen())
        .sort((left, right) => {
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
    const trigger = document.getElementById("tutorial-trigger");
    const modal = document.getElementById("tutorial-modal");
    if (!trigger || !modal) {
        return;
    }
    const closeButtons = modal.querySelectorAll("[data-tutorial-close]");
    const exampleButtons = modal.querySelectorAll("[data-example]");
    const renderExampleLabels = () => {
        exampleButtons.forEach((button) => {
            const value = String(button.getAttribute("data-example") || "").trim();
            if (!value) {
                return;
            }
            const nextLabel = serializeRegexInputValue(value);
            if (nextLabel) {
                button.textContent = nextLabel;
            }
        });
    };
    const setModalState = (isOpen) => {
        modal.classList.toggle("is-open", isOpen);
        modal.setAttribute("aria-hidden", isOpen ? "false" : "true");
        document.body.classList.toggle("is-modal-open", isOpen);
    };
    const closeModal = () => setModalState(false);
    const openModal = () => {
        renderExampleLabels();
        setModalState(true);
    };
    trigger.addEventListener("click", openModal);
    closeButtons.forEach((button) => {
        button.addEventListener("click", closeModal);
    });
    exampleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-example");
            if (!value) {
                return;
            }
            const verbEl = document.getElementById("verb");
            if (verbEl) {
                verbEl.value = serializeRegexInputValue(value);
                verbEl.dispatchEvent(new Event("input", { bubbles: true }));
                focusVisibleVerbSurfaceAtEnd();
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
        },
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
        const target = document.querySelector(definition.selector);
        const text = String(target?.textContent || "").trim();
        if (text) {
            return text.toLowerCase();
        }
    }
    return String(definition.fallbackDescription || "").trim();
}

function buildKeyboardLegendEntries() {
    const baseEntries = KEYBOARD_LEGEND_BASE_ENTRIES.map((entry) => ({ ...entry }));
    const altEntries = [];
    ALT_SHORTCUT_DEFINITIONS.forEach((definition) => {
        const description = resolveAltShortcutLegendDescription(definition);
        if (!definition.label || !description) {
            return;
        }
        altEntries.push({
            label: definition.label,
            description,
        });
    });
    return [
        ...baseEntries.slice(0, 3),
        ...altEntries,
        ...baseEntries.slice(3),
    ];
}

function buildKeyboardLegendSections() {
    const entries = buildKeyboardLegendEntries();
    return [
        {
            title: "Mover",
            entries: entries.filter((entry) => (
                ["Tab", "Space", "Enter", "Esc", "Esc x2"].includes(entry.label)
            )),
        },
        {
            title: "Atajos",
            entries: entries.filter((entry) => String(entry.label || "").startsWith("⌥/Alt +")),
        },
        {
            title: "Edicion",
            entries: entries.filter((entry) => (
                ["Delete / Backspace", "Shift + Delete / Backspace", "⌥/Alt + Delete / Backspace"].includes(entry.label)
            )),
        },
        {
            title: "Nota",
            entries: entries.filter((entry) => entry.label === "Consejo"),
            note: true,
        },
    ].filter((section) => Array.isArray(section.entries) && section.entries.length);
}

function renderKeyboardLegendEntries() {
    const list = document.getElementById("keyboard-legend-list");
    if (!list) {
        return;
    }
    list.innerHTML = "";
    const sections = buildKeyboardLegendSections();
    sections.forEach((section) => {
        const card = document.createElement("section");
        card.className = `keyboard-legend-section${section.note ? " keyboard-legend-section--note" : ""}`;
        const heading = document.createElement("h3");
        heading.className = "keyboard-legend-section__title";
        heading.textContent = section.title;
        card.appendChild(heading);

        const sectionList = document.createElement("div");
        sectionList.className = "keyboard-legend-section__list";

        section.entries.forEach((entry) => {
            const row = document.createElement("div");
            row.className = `keyboard-legend-item${section.note ? " keyboard-legend-item--note" : ""}`;

            if (!section.note) {
                const key = document.createElement("span");
                key.className = "keyboard-legend-item__key";
                key.textContent = entry.label;
                row.appendChild(key);
            }

            const text = document.createElement("span");
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
    const trigger = document.getElementById("keyboard-legend-trigger");
    const panel = document.getElementById("keyboard-legend");
    if (!trigger || !panel || panel.hidden) {
        return;
    }
    if (
        typeof window === "undefined"
        || typeof window.getComputedStyle !== "function"
    ) {
        return;
    }
    const isDesktop = typeof window.matchMedia === "function"
        && window.matchMedia("(min-width: 769px)").matches;
    if (!isDesktop) {
        resetKeyboardLegendPopoverPosition(panel);
        return;
    }
    const visualViewport = window.visualViewport || null;
    const viewportWidth = Math.max(
        0,
        Number(visualViewport?.width) || window.innerWidth || document.documentElement.clientWidth || 0
    );
    const viewportHeight = Math.max(
        0,
        Number(visualViewport?.height) || window.innerHeight || document.documentElement.clientHeight || 0
    );
    const viewportOffsetLeft = Number(visualViewport?.offsetLeft) || 0;
    const viewportOffsetTop = Number(visualViewport?.offsetTop) || 0;
    const gap = 8;
    const margin = 16;
    const maxWidth = Math.max(240, viewportWidth - (margin * 2));
    panel.style.position = "fixed";
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.transform = "none";
    panel.style.maxWidth = `${Math.round(maxWidth)}px`;

    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const panelWidth = Math.min(panelRect.width || panel.offsetWidth || maxWidth, maxWidth);
    const panelHeight = Math.min(
        panelRect.height || panel.offsetHeight || 0,
        Math.max(120, viewportHeight - (margin * 2))
    );
    const availableLeft = triggerRect.left - gap - margin;
    const availableRight = viewportWidth - triggerRect.right - gap - margin;
    let left = viewportOffsetLeft + triggerRect.left - gap - panelWidth;
    if (availableLeft < panelWidth && availableRight >= panelWidth) {
        left = viewportOffsetLeft + triggerRect.right + gap;
    } else if (availableLeft < panelWidth && availableRight < panelWidth) {
        left = viewportOffsetLeft + Math.max(
            margin,
            Math.min(
                triggerRect.left + ((triggerRect.width - panelWidth) / 2),
                viewportWidth - margin - panelWidth
            )
        );
    }
    const minLeft = viewportOffsetLeft + margin;
    const maxLeft = viewportOffsetLeft + viewportWidth - margin - panelWidth;
    left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));

    let top = viewportOffsetTop + triggerRect.top + ((triggerRect.height - panelHeight) / 2);
    const minTop = viewportOffsetTop + margin;
    const maxTop = viewportOffsetTop + viewportHeight - margin - panelHeight;
    top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));

    panel.style.left = `${Math.round(left)}px`;
    panel.style.top = `${Math.round(top)}px`;
}

function initKeyboardLegendPopover() {
    const trigger = document.getElementById("keyboard-legend-trigger");
    const panel = document.getElementById("keyboard-legend");
    const closeButton = document.getElementById("keyboard-legend-close");
    if (!trigger || !panel) {
        return;
    }
    let isOpen = false;
    const setOpen = (nextOpen, { focusTrigger = false } = {}) => {
        isOpen = Boolean(nextOpen);
        panel.hidden = !isOpen;
        panel.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
            renderKeyboardLegendEntries();
            if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
                window.requestAnimationFrame(() => positionKeyboardLegendPopover());
            } else {
                positionKeyboardLegendPopover();
            }
        } else {
            resetKeyboardLegendPopoverPosition(panel);
        }
        syncInputPopupOverlayActiveState();
        if (focusTrigger && typeof trigger.focus === "function") {
            trigger.focus({ preventScroll: true });
        }
    };
    const closePopover = ({ focusTrigger = false } = {}) => setOpen(false, { focusTrigger });
    const togglePopover = () => setOpen(!isOpen);
    trigger.addEventListener("click", (event) => {
        event.preventDefault();
        togglePopover();
    });
    if (closeButton) {
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            closePopover({ focusTrigger: true });
        });
    }
    document.addEventListener("click", (event) => {
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
            closePopover({ focusTrigger: true });
            return true;
        },
    });
    const syncPopoverPosition = () => {
        if (!isOpen) {
            return;
        }
        positionKeyboardLegendPopover();
    };
    if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
        window.addEventListener("resize", syncPopoverPosition, { passive: true });
        window.addEventListener("scroll", syncPopoverPosition, { passive: true });
    }
    if (window.visualViewport && typeof window.visualViewport.addEventListener === "function") {
        window.visualViewport.addEventListener("resize", syncPopoverPosition);
        window.visualViewport.addEventListener("scroll", syncPopoverPosition);
    }
    renderKeyboardLegendEntries();
    setOpen(false);
}

function resolveNonactiveSuffixOptionMap({
    verbMeta = null,
    verb = "",
    analysisVerb = "",
} = {}) {
    const isTransitive = isNonactiveTransitiveByObj1(getCurrentObjectPrefix(), verbMeta);
    const options = resolveLiveNonactiveOptions({
        verbMeta,
        verb,
        analysisVerb,
        isTransitive,
        isYawi: verbMeta?.isYawi === true,
        rootPlusYaBase: verbMeta?.rootPlusYaBase,
    });
    return buildNonactiveOptionMap(options);
}

function buildNonactiveSelectionContextSignature({
    verbMeta = null,
    verb = "",
    analysisVerb = "",
} = {}) {
    const sourceKey = String(
        verbMeta?.exactBaseVerb
        || verbMeta?.canonicalRuleBase
        || verbMeta?.analysisVerb
        || analysisVerb
        || verbMeta?.displayVerb
        || verb
        || ""
    ).trim().toLowerCase();
    const objectPrefix = typeof getCurrentObjectPrefix === "function"
        ? String(getCurrentObjectPrefix() || "")
        : "";
    const derivationType = typeof getActiveDerivationType === "function"
        ? String(getActiveDerivationType() || "")
        : "";
    const transitivity = isNonactiveTransitiveByObj1(objectPrefix, verbMeta) ? "transitive" : "intransitive";
    return `${sourceKey}|${derivationType}|${objectPrefix}|${transitivity}|${verbMeta?.isYawi === true ? "yawi" : ""}`;
}

function normalizeSelectedNonactiveSuffix(optionMap = new Map(), selectionSignature = "") {
    let selected = getSelectedNonactiveSuffix();
    if (
        selectionSignature
        && NonactiveSelectionContextSignature
        && selectionSignature !== NonactiveSelectionContextSignature
    ) {
        selected = null;
        setSelectedNonactiveSuffix(null);
    }
    NonactiveSelectionContextSignature = selectionSignature || "";
    if (shouldForceAllNonactiveOptions()) {
        selected = null;
        setSelectedNonactiveSuffix(null);
    }
    if (selected && !optionMap.has(selected)) {
        selected = null;
        setSelectedNonactiveSuffix(null);
    }
    return selected;
}

function renderNonactiveTabs({ verbMeta, verb, analysisVerb, hasVerb, endsWithConsonant }) {
    const container = document.getElementById("nonactive-tabs");
    if (!container) {
        return;
    }
    const previousFocusSuffix = (() => {
        const activeElement = document.activeElement;
        if (!activeElement || !container.contains(activeElement)) {
            return "";
        }
        if (typeof activeElement.getAttribute !== "function") {
            return "";
        }
        return activeElement.getAttribute("data-nonactive-suffix") || "";
    })();
    const isNawat = Boolean(document.getElementById("language")?.checked);
    const tenseMode = getActiveTenseMode();
    const isVerbMode = tenseMode === TENSE_MODE.verbo;
    const shouldShowNonactiveTabs = isVerbMode;
    container.setAttribute("role", "tablist");
    container.setAttribute(
        "aria-label",
        getLocalizedLabel(
            { labelEs: "Derivación no activa", labelNa: "Derivación no activa" },
            isNawat,
            "Derivación no activa"
        )
    );
    container.classList.toggle("is-hidden", !shouldShowNonactiveTabs);
    container.classList.toggle("is-disabled", !shouldShowNonactiveTabs);
    container.setAttribute("aria-hidden", String(!shouldShowNonactiveTabs));
    container.setAttribute("aria-disabled", String(!shouldShowNonactiveTabs));
    if (!shouldShowNonactiveTabs) {
        if (container.childElementCount) {
            container.innerHTML = "";
        }
        NonactiveTabsDomSignature = "";
        NonactiveSelectionContextSignature = "";
        return;
    }
    const optionMap = resolveNonactiveSuffixOptionMap({ verbMeta, verb, analysisVerb });
    const selectionSignature = buildNonactiveSelectionContextSignature({ verbMeta, verb, analysisVerb });
    let selected = normalizeSelectedNonactiveSuffix(optionMap, selectionSignature);
    const signature = `${isNawat ? "na" : "es"}|${NONACTIVE_SUFFIX_ORDER.join(",")}`;
    const existingGrid = container.querySelector(".nonactive-tabs-grid");
    const existingButtons = new Map(
        Array.from(container.querySelectorAll(".nonactive-tab[data-nonactive-suffix]"))
            .map((button) => [button.dataset.nonactiveSuffix || "", button])
    );
    const canReuseDom = (
        signature === NonactiveTabsDomSignature
        && existingGrid
        && NONACTIVE_SUFFIX_ORDER.every((suffix) => existingButtons.has(suffix))
    );
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
        container.querySelectorAll(".nonactive-tabs-heading").forEach((node) => node.remove());
        NONACTIVE_SUFFIX_ORDER.forEach((suffix) => {
            const button = existingButtons.get(suffix);
            if (!button) {
                return;
            }
            const label = button.querySelector(".tense-tab-label");
            if (label) {
                label.textContent = getLocalizedLabel(NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix);
            }
            applyButtonState(button, suffix);
        });
        if (previousFocusSuffix) {
            const previousButton = existingGrid.querySelector(
                `[data-nonactive-suffix="${escapeAttributeSelectorValue(previousFocusSuffix)}"]`
            );
            if (previousButton && !previousButton.disabled && typeof previousButton.focus === "function") {
                previousButton.focus({ preventScroll: true });
            }
        }
        return;
    }

    container.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "nonactive-tabs-grid";
    container.appendChild(grid);
    NONACTIVE_SUFFIX_ORDER.forEach((suffix) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tense-tab nonactive-tab";
        button.dataset.nonactiveSuffix = suffix;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", "false");
        const label = document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = getLocalizedLabel(NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix);
        button.appendChild(label);
        applyButtonState(button, suffix);
        button.addEventListener("click", () => {
            const current = getSelectedNonactiveSuffix();
            setSelectedNonactiveSuffix(current === suffix ? null : suffix);
            preserveViewportAnchorPosition(button, () => {
                renderTenseTabs();
                const verbMeta = getVerbInputMeta();
                renderActiveConjugations({
                    verb: verbMeta.displayVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                });
            });
        });
        grid.appendChild(button);
    });
    NonactiveTabsDomSignature = signature;
    if (previousFocusSuffix) {
        const previousButton = grid.querySelector(
            `[data-nonactive-suffix="${escapeAttributeSelectorValue(previousFocusSuffix)}"]`
        );
        if (previousButton && !previousButton.disabled && typeof previousButton.focus === "function") {
            previousButton.focus({ preventScroll: true });
        }
    }
}

function getPanelConjugationRenderableSurface(result = null) {
    if (!result) {
        return "";
    }
    if (typeof getConjugationRenderableSurface === "function") {
        return getConjugationRenderableSurface(result);
    }
    return getPanelConjugationRenderableSurfaceForms(result).join(" / ");
}

function splitPanelConjugationRenderableSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => String(entry || "").trim())
        .filter((entry) => entry && entry !== "—");
}

function getPanelConjugationRenderableSurfaceForms(result = null) {
    if (!result) {
        return [];
    }
    const grammarFrame = (
        (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null)
        || (result?.frames && typeof result.frames === "object" ? result.frames : null)
    );
    const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
    const hasResultFrame = Boolean(frameResult);
    const forms = [];
    if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
    }
    if (frameResult?.surface) {
        forms.push(frameResult.surface);
    }
    if (hasResultFrame) {
        return forms
            .flatMap((entry) => splitPanelConjugationRenderableSurfaceText(entry))
            .filter((entry, index, list) => entry && list.indexOf(entry) === index);
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
    return forms
        .flatMap((entry) => splitPanelConjugationRenderableSurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function isConjugationResultVisible({
    result,
    subjectPrefix,
    subjectSuffix,
    objectPrefix,
    comboObjectPrefix,
    enforceInvalidCombo = true,
    hideReflexive = false,
}) {
    if (!getPanelConjugationRenderableSurface(result)) {
        return false;
    }
    const diagnosticRecord = getConjugationMaskState({
        result,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        comboObjectPrefix,
        enforceInvalidCombo,
    });
    return diagnosticRecord.hasVisibleResult && !hideReflexive;
}

function buildVerbModeGenerateOverride({
    isNonactiveMode = false,
    derivationType = "",
} = {}) {
    const tenseModeVerb = TENSE_MODE.verbo || "verbo";
    const derivationModeActive = DERIVATION_MODE.active || "active";
    const derivationModeNonactive = DERIVATION_MODE.nonactive || "nonactive";
    const voiceModeActive = VOICE_MODE.active || "active";
    const voiceModePassive = VOICE_MODE.passive || "passive-impersonal";
    const resolvedDerivationType = Object.values(DERIVATION_TYPE).includes(derivationType)
        ? derivationType
        : getActiveDerivationType();
    return {
        tenseMode: tenseModeVerb,
        derivationMode: isNonactiveMode ? derivationModeNonactive : derivationModeActive,
        voiceMode: isNonactiveMode ? voiceModePassive : voiceModeActive,
        derivationType: resolvedDerivationType,
    };
}

function buildTenseAvailabilityRecord({
    tenseValue = "",
    combinedMode = COMBINED_MODE.active,
    source = "",
    summary = null,
    available = null,
    hasOutput = null,
}) {
    const realizedSummary = summary && typeof summary === "object"
        ? realizeToggleAvailabilitySummary(summary)
        : null;
    const resolvedHasOutput = typeof hasOutput === "boolean"
        ? hasOutput
        : (realizedSummary
            ? realizedSummary.availabilityState === CONJUGATION_AVAILABILITY_STATE.viable
            : null);
    const resolvedAvailable = typeof available === "boolean"
        ? available
        : (resolvedHasOutput === true ? true : (resolvedHasOutput === false ? false : null));
    const availabilityState = realizedSummary
        ? realizedSummary.availabilityState
        : (resolvedHasOutput === true
            ? CONJUGATION_AVAILABILITY_STATE.viable
            : (resolvedAvailable === false
                ? CONJUGATION_AVAILABILITY_STATE.impossible
                : ""));
    return {
        tenseValue: String(tenseValue || ""),
        combinedMode,
        source: source || "",
        available: resolvedAvailable === true,
        hasOutput: resolvedHasOutput === true,
        availabilityState,
        summary: realizedSummary,
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
    availabilityMemoContext = "",
}) {
    const shouldUseAvailabilityMemo = availabilityMemo instanceof Map;
    const modeOverride = buildVerbModeGenerateOverride({ isNonactiveMode: false });
    let summary = createToggleAvailabilityRealizationSummary();
    for (const objectPrefix of objectPrefixes) {
        for (const { selection } of subjectSelections) {
            const availabilityKey = [
                "active-availability",
                availabilityMemoContext,
                verb || "",
                tenseValue || "",
                selection.subjectPrefix || "",
                selection.subjectSuffix || "",
                objectPrefix || "",
            ].join("|");
            const availabilityRecord = shouldUseAvailabilityMemo && availabilityMemo.has(availabilityKey)
                ? availabilityMemo.get(availabilityKey)
                : (() => {
                    const result = getCachedSilentGenerateWord({
                        silent: true,
                        skipValidation: true,
                        override: {
                            ...modeOverride,
                            subjectPrefix: selection.subjectPrefix,
                            subjectSuffix: selection.subjectSuffix,
                            objectPrefix,
                            verb,
                            tense: tenseValue,
                        },
                    }) || {};
                    const maskState = getConjugationMaskState({
                        result,
                        subjectPrefix: selection.subjectPrefix,
                        subjectSuffix: selection.subjectSuffix,
                        objectPrefix,
                    });
                    const evaluation = buildConjugationEvaluationRecord({
                        result,
                        maskState,
                    });
                    if (shouldUseAvailabilityMemo) {
                        availabilityMemo.set(availabilityKey, evaluation);
                    }
                    return evaluation;
                })();
            recordToggleAvailabilityRealization(summary, availabilityRecord);
        }
    }
    return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: COMBINED_MODE.active,
        source: "verb-active-tense-tab",
        summary,
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
    availabilityMemoContext = "",
}) {
    const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
    const shouldUseAvailabilityMemo = availabilityMemo instanceof Map;
    const modeOverride = buildVerbModeGenerateOverride({ isNonactiveMode: true });
    let summary = createToggleAvailabilityRealizationSummary();
    const checkRow = ({ objectPrefix, subjectOverride, allowPassiveObject }) => {
        const availabilityKey = [
            "nonactive-availability",
            availabilityMemoContext,
            verb || "",
            tenseValue || "",
            String(activeValency || 0),
            String(nonactiveAvailableSlots || 0),
            hasPromotableObject ? "1" : "0",
            resolvedFusionMarkers.join(","),
            objectPrefix || "",
            subjectOverride?.subjectPrefix || "",
            subjectOverride?.subjectSuffix || "",
            allowPassiveObject ? "1" : "0",
        ].join("|");
        if (shouldUseAvailabilityMemo && availabilityMemo.has(availabilityKey)) {
            const cachedRecord = availabilityMemo.get(availabilityKey);
            recordToggleAvailabilityRealization(summary, cachedRecord);
            return cachedRecord.hasVisibleResult;
        }
        const overridePayload = {
            ...modeOverride,
            objectPrefix,
            verb,
            tense: tenseValue,
        };
        if (subjectOverride) {
            overridePayload.subjectPrefix = subjectOverride.pers1;
            overridePayload.subjectSuffix = subjectOverride.pers2;
            overridePayload.preservePassiveSubject = true;
        }
        const result = getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            allowPassiveObject,
            override: overridePayload,
        }) || {};
        const hideReflexive = !!(
            result
            && result.isReflexive
            && getObjectCategory(objectPrefix) !== "reflexive"
        );
        const maskState = getConjugationMaskState({
            result,
            subjectPrefix: subjectOverride?.subjectPrefix || "",
            subjectSuffix: subjectOverride?.subjectSuffix || "",
            objectPrefix,
        });
        const evaluation = buildConjugationEvaluationRecord({
            result,
            maskState,
            extraDiagnostics: hideReflexive
                ? [buildConjugationDiagnosticEntry(
                    CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden,
                    "masked",
                    { source: "result" }
                )]
                : [],
        });
        recordToggleAvailabilityRealization(summary, evaluation);
        if (shouldUseAvailabilityMemo) {
            availabilityMemo.set(availabilityKey, evaluation);
        }
        return evaluation.hasVisibleResult;
    };

    for (const objectGroup of objectPrefixGroups) {
        const { prefixes } = objectGroup;
        const isDirectGroup = prefixes.every((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
        const isPassiveNonactive = isDirectGroup;
        const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
        const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
        const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
        let passiveSubjectPrefixes = allowSubjectToggle
            ? Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS)
            : [];
        let objectTogglePrefixes = (isDirectGroup && allowObjectToggle)
            ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(OBJECT_MARKERS)]))
            : prefixes;
        if (allowSubjectToggle && allowObjectToggle && resolvedFusionMarkers.length >= 2) {
            const subjectMarker = resolvedFusionMarkers[0];
            const objectMarker = resolvedFusionMarkers[1];
            const constrainedSubject = getNonactiveSlotPrefixes(subjectMarker, "subject");
            const constrainedObject = getNonactiveSlotPrefixes(objectMarker, "object");
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
            if (checkRow({ objectPrefix: "", subjectOverride: null, allowPassiveObject })) {
                return buildTenseAvailabilityRecord({
                    tenseValue,
                    combinedMode: COMBINED_MODE.nonactive,
                    source: "verb-nonactive-tense-tab",
                    summary,
                });
            }
            continue;
        }
        if (isDirectGroup) {
            const subjectSelections = passiveSubjectPrefixes.filter((prefix) => prefix !== "");
            const objectSelections = allowObjectToggle ? objectTogglePrefixes : [""];
            for (const subjectPrefix of subjectSelections) {
                const subjectOverride = getPassiveSubjectOverride(subjectPrefix);
                if (!subjectOverride) {
                    continue;
                }
                for (const objectPrefix of objectSelections) {
                    if (checkRow({ objectPrefix, subjectOverride, allowPassiveObject })) {
                        return buildTenseAvailabilityRecord({
                            tenseValue,
                            combinedMode: COMBINED_MODE.nonactive,
                            source: "verb-nonactive-tense-tab",
                            summary,
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
            if (checkRow({ objectPrefix, subjectOverride: null, allowPassiveObject: false })) {
                return buildTenseAvailabilityRecord({
                    tenseValue,
                    combinedMode: COMBINED_MODE.nonactive,
                    source: "verb-nonactive-tense-tab",
                    summary,
                });
            }
        }
    }
    return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: COMBINED_MODE.nonactive,
        source: "verb-nonactive-tense-tab",
        summary,
    });
}

function buildUnifiedVerbTenseAvailabilityMatrix({
    tenses = [],
    resolveTenseAvailabilityRecord = null,
}) {
    const matrix = new Map([
        [COMBINED_MODE.active, new Map()],
        [COMBINED_MODE.nonactive, new Map()],
    ]);
    if (typeof resolveTenseAvailabilityRecord !== "function") {
        return matrix;
    }
    const list = Array.isArray(tenses) ? tenses : [];
    list.forEach((tenseValue) => {
        matrix.get(COMBINED_MODE.active).set(
            tenseValue,
            resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.active)
        );
        matrix.get(COMBINED_MODE.nonactive).set(
            tenseValue,
            resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.nonactive)
        );
    });
    return matrix;
}

function setTensePresenceBadges(button, {
    active = false,
    nonactive = false,
} = {}) {
    if (!button) {
        return;
    }
    const entries = [
        {
            key: "active",
            label: "A",
            title: active ? "Activo disponible" : "Activo sin resultado",
            available: active === true,
        },
        {
            key: "nonactive",
            label: "NA",
            title: nonactive ? "No activo disponible" : "No activo sin resultado",
            available: nonactive === true,
        },
    ];
    button.dataset.activePresence = entries[0].available ? "available" : "absent";
    button.dataset.nonactivePresence = entries[1].available ? "available" : "absent";
    let row = Array.from(button.children || [])
        .find((child) => child.classList?.contains("tense-tab-presence"));
    if (!row) {
        row = document.createElement("span");
        row.className = "tense-tab-presence";
        row.setAttribute("aria-hidden", "false");
        button.appendChild(row);
    }
    row.innerHTML = "";
    entries.forEach((entry) => {
        const badge = document.createElement("span");
        badge.className = `tense-tab-presence__badge ${entry.available ? "is-present" : "is-absent"}`;
        badge.dataset.presenceMode = entry.key;
        badge.textContent = entry.label;
        badge.title = entry.title;
        badge.setAttribute("aria-label", entry.title);
        row.appendChild(badge);
    });
}

function getSubjectlessNominalSelectionEntry() {
    const thirdSingularSelection = getSubjectPersonSelections().find(({ group, selection, number }) => (
        number === "singular"
        && group?.id === "third"
        && selection?.subjectPrefix === ""
        && selection?.subjectSuffix === ""
    ));
    if (thirdSingularSelection) {
        return {
            group: thirdSingularSelection.group || null,
            selection: {
                ...(thirdSingularSelection.selection || {
                    subjectPrefix: "",
                    subjectSuffix: "",
                }),
            },
            number: thirdSingularSelection.number || "",
            useReduplicatedSingularSurface: false,
        };
    }
    return {
        group: null,
        selection: {
            subjectPrefix: "",
            subjectSuffix: "",
        },
        number: "",
        useReduplicatedSingularSurface: false,
    };
}

function buildNominalAvailabilityObjectSlotModels(slotStates = [], {
    includeSlot = null,
} = {}) {
    return (Array.isArray(slotStates) ? slotStates : [])
        .filter((slotState) => (
            typeof includeSlot === "function" ? includeSlot(slotState) : true
        ))
        .map((slotState) => {
            const toggleValues = Array.isArray(slotState?.toggleValues) && slotState.toggleValues.length
                ? slotState.toggleValues
                : [slotState?.activeId || ""];
            return {
                id: slotState?.id || "",
                values: Array.from(new Set(toggleValues.map((value) => String(value || "")))),
            };
        });
}

function resolveNominalCombinationAvailabilityRecord({
    verb = "",
    tenseValue = "",
    tenseMode = getActiveTenseMode(),
    context = null,
    selection = null,
    number = "",
    possessorPrefix = "",
    objectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
    patientivoSource = null,
    patientivoOwnership = DEFAULT_PATIENTIVO_OWNERSHIP,
    patientivoNominalSuffix = null,
    useReduplicatedSingularSurface = false,
}) {
    if (!context || !selection) {
        return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: COMBINED_MODE.active,
            source: "nominal-combination",
            available: false,
            hasOutput: false,
        });
    }
    const isAgentivo = tenseValue === "agentivo";
    const isPatientivo = tenseValue === "patientivo";
    const resolvedPatientivoSource = isPatientivo
        ? (patientivoSource || "imperfectivo")
        : null;
    const normalizedProbeSelection = resolveNominalAvailabilityProbeSelection({
        tenseValue,
        patientivoSource: resolvedPatientivoSource,
        verbMeta: context.verbMeta,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
    });
    const resolvedObjectPrefix = normalizedProbeSelection.objectPrefix;
    const resolvedIndirectObjectMarker = normalizedProbeSelection.indirectObjectMarker;
    const resolvedThirdObjectMarker = normalizedProbeSelection.thirdObjectMarker;
    const ownershipSelections = (
        isPatientivo
        && possessorPrefix !== ""
        && (patientivoOwnership === null || patientivoOwnership === undefined || patientivoOwnership === "")
    )
        ? PATIENTIVO_OWNERSHIP_OPTIONS.map((entry) => entry.id)
        : [patientivoOwnership || DEFAULT_PATIENTIVO_OWNERSHIP];
    const resolvedPatientivoNominalSuffix = normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
    const isPossessed = possessorPrefix !== "";
    let subjectSuffixOverride = "";
    if (tenseMode === TENSE_MODE.adjetivo) {
        subjectSuffixOverride = selection?.subjectSuffix || "";
    }
    if ((isAgentivo || isPatientivo) && number === "plural") {
        subjectSuffixOverride = isPossessed ? "p" : "t";
    }
    const summary = createToggleAvailabilityRealizationSummary();
    ownershipSelections.forEach((resolvedPatientivoOwnership) => {
        let result = {};
        if (context.isInstrumentivo) {
            const instrumentivoMode = possessorPrefix === ""
                ? INSTRUMENTIVO_MODE.absolutivo
                : INSTRUMENTIVO_MODE.posesivo;
            result = getInstrumentivoResult({
                rawVerb: verb,
                verbMeta: context.verbMeta,
                subjectPrefix: selection.subjectPrefix,
                subjectSuffix: selection.subjectSuffix,
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                mode: instrumentivoMode,
                possessivePrefix: possessorPrefix,
            }) || {};
        } else if (context.isCalificativoInstrumentivo) {
            result = getCalificativoInstrumentivoResult({
                rawVerb: verb,
                verbMeta: context.verbMeta,
                subjectPrefix: selection.subjectPrefix,
                subjectSuffix: selection.subjectSuffix,
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                possessivePrefix: possessorPrefix,
            }) || {};
        } else {
            const nominalDerivationMode = getNominalDerivationModeForTense(tenseValue);
            result = getCachedSilentGenerateWord({
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
                    patientivoNominalSuffix: resolvedPatientivoNominalSuffix,
                },
            }) || {};
            if (useReduplicatedSingularSurface && getPanelConjugationRenderableSurface(result)) {
                const prefixChain = buildPrefixedChain({
                    pers1: selection.subjectPrefix,
                    poseedor: possessorPrefix,
                    obj1: composeObj1Chain({
                        obj1: resolvedObjectPrefix,
                        markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                        pers1: selection.subjectPrefix,
                    }),
                    tronco: "",
                });
                result = buildReduplicatedConjugationResult(result, {
                    prefixChain,
                    applyMissingPrefixChain: true,
                });
            }
        }
        const maskState = getConjugationMaskState({
            result,
            subjectPrefix: selection.subjectPrefix,
            subjectSuffix: selection.subjectSuffix,
            objectPrefix: resolvedObjectPrefix,
            possessivePrefix: possessorPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            derivationType: context.nounObjectSlotSummary?.derivationType,
            comboObjectPrefix: undefined,
            requireDistinctPossessor: isAgentivo || isPatientivo,
            enforceInvalidCombo: !useReduplicatedSingularSurface,
        });
        const valence4Violation = (context.nounObjectSlotStates?.length || 0) >= 3
            && !isValidObj1Obj2Obj3Combo({
                    obj1: resolvedObjectPrefix,
                    obj2: resolvedIndirectObjectMarker,
                    obj3: resolvedThirdObjectMarker,
                });
        const evaluation = buildConjugationEvaluationRecord({
            result,
            maskState,
            hasValenceStructureError: valence4Violation,
        });
        recordToggleAvailabilityRealization(summary, evaluation);
    });
    return buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: context.combinedMode || COMBINED_MODE.active,
        source: "nominal-combination",
        summary,
    });
}

function resolveLocativoTemporalTenseAvailabilityRecord({
    verb = "",
    combinedMode = COMBINED_MODE.active,
}) {
    const isNawat = getIsNawat();
    const verbMeta = getParsedVerbForTab("noun", verb);
    const possessorValues = POSSESSIVE_PREFIXES
        .map((entry) => entry.value)
        .filter((value) => value);
    const resolvedCombinedMode = combinedMode === COMBINED_MODE.nonactive
        ? COMBINED_MODE.nonactive
        : COMBINED_MODE.active;
    const baseObjectStateKey = getObjectStateKey({
        groupKey: `locativo-temporal|${resolvedCombinedMode}|objects`,
        tenseValue: "locativo-temporal",
        mode: "noun",
    });
    const slotBundle = buildNounObjectSlotToggleStates({
        verbMeta,
        tenseValue: "locativo-temporal",
        baseObjectStateKey,
        isNawat,
        combinedMode: resolvedCombinedMode,
    });
    const mutableSlotStates = (slotBundle?.slotStates || []).map((slot) => ({ ...slot }));
    const nonactiveObjectToggleValues = Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)
        .map((value) => String(value || ""))
        .filter(Boolean);
    if (resolvedCombinedMode === COMBINED_MODE.nonactive && nonactiveObjectToggleValues.length) {
        mutableSlotStates.forEach((slotState) => {
            slotState.toggleValues = nonactiveObjectToggleValues;
            slotState.options = getObjectToggleOptions(slotState.toggleValues, {
                includeAll: true,
                labelForPrefix: getNonspecificToggleLabel,
                isNawat,
            });
            slotState.optionMap = new Map(slotState.options.map((entry) => [entry.id, entry]));
            slotState.showToggle = slotState.toggleValues.length > 1;
        });
    }
    const evaluateLocativoCombination = ({
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        possessorPrefix = "",
    }) => {
        const result = getLocativoTemporalResult({
            rawVerb: verb,
            verbMeta,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            possessivePrefix: possessorPrefix,
            combinedMode: resolvedCombinedMode,
        }) || {};
        const maskState = getLocativoTemporalMaskState({
            result,
            objectPrefix,
        });
        return buildConjugationEvaluationRecord({
            result,
            maskState,
        });
    };
    const summary = createToggleAvailabilityRealizationSummary();
    if (resolvedCombinedMode === COMBINED_MODE.nonactive) {
        const primarySelections = [];
        if ((slotBundle?.availableObjectSlots || 0) <= 0) {
            primarySelections.push({
                objectPrefix: "",
                possessorPrefix: "",
            });
        } else {
            possessorValues.forEach((value) => {
                primarySelections.push({
                    objectPrefix: POSSESSIVE_TO_OBJECT_PREFIX[value] || "",
                    possessorPrefix: value || "",
                });
            });
            nonactiveObjectToggleValues.forEach((value) => {
                primarySelections.push({
                    objectPrefix: value || "",
                    possessorPrefix: "",
                });
            });
        }
        const objectSlotModels = buildNominalAvailabilityObjectSlotModels(mutableSlotStates, {
            includeSlot: (slotState) => slotState.id !== "object",
        });
        for (const selection of primarySelections) {
            iterateNounObjectSlotSelections(objectSlotModels, (selectedBySlot) => {
                const evaluation = evaluateLocativoCombination({
                    objectPrefix: selection.objectPrefix || "",
                    indirectObjectMarker: selectedBySlot.object2 || "",
                    thirdObjectMarker: selectedBySlot.object3 || "",
                    possessorPrefix: selection.possessorPrefix || "",
                });
                recordToggleAvailabilityRealization(summary, evaluation);
            });
        }
        return buildTenseAvailabilityRecord({
            tenseValue: "locativo-temporal",
            combinedMode: resolvedCombinedMode,
            source: "locativo-temporal-tense-tab",
            summary,
        });
    }
    const possessorSelections = possessorValues.length ? possessorValues : [""];
    const objectSlotModels = buildNominalAvailabilityObjectSlotModels(mutableSlotStates);
    iterateNounObjectSlotSelections(objectSlotModels, (selectedBySlot) => {
        const objectPrefix = selectedBySlot.object || "";
        const indirectObjectMarker = selectedBySlot.object2 || "";
        const thirdObjectMarker = selectedBySlot.object3 || "";
        possessorSelections.forEach((possessorPrefix) => {
            const evaluation = evaluateLocativoCombination({
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            possessorPrefix,
            });
            recordToggleAvailabilityRealization(summary, evaluation);
        });
    });
    return buildTenseAvailabilityRecord({
        tenseValue: "locativo-temporal",
        combinedMode: resolvedCombinedMode,
        source: "locativo-temporal-tense-tab",
        summary,
    });
}

function resolveNominalTenseAvailabilityRecord({
    verb = "",
    tenseValue = "",
    tenseMode = getActiveTenseMode(),
    combinedMode = COMBINED_MODE.active,
}) {
    if (!verb || !isNominalTenseMode(tenseMode) || !tenseValue) {
        return null;
    }
    const resolvedCombinedMode = combinedMode === COMBINED_MODE.nonactive
        ? COMBINED_MODE.nonactive
        : COMBINED_MODE.active;
    if (!isNounTenseVisibleForCombinedMode(tenseValue, resolvedCombinedMode)) {
        return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: resolvedCombinedMode,
            source: "nominal-tense-tab",
            available: false,
            hasOutput: false,
        });
    }
    if (tenseValue === "locativo-temporal") {
        return resolveLocativoTemporalTenseAvailabilityRecord({
            verb,
            combinedMode: resolvedCombinedMode,
        });
    }
    const context = buildNounTabRenderContext({ verb, tenseValue });
    if (!context || context.resolvedTense !== tenseValue || context.isLocativoTemporal) {
        return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: resolvedCombinedMode,
            source: "nominal-tense-tab",
            available: false,
            hasOutput: false,
        });
    }
    const subjectSelections = context.isSubjectlessTense
        ? [getSubjectlessNominalSelectionEntry()]
        : getNominalSubjectSelectionEntries({
            mode: tenseMode,
            tenseValue: context.resolvedTense,
        }).filter(({ selection }) => (
            !context.showNonanimateOnly
            || isNonanimatePers1Pers2(selection.subjectPrefix, selection.subjectSuffix)
        ));
    const possessorSelections = Array.isArray(context.visiblePossessorValues)
        && context.visiblePossessorValues.length
        ? context.visiblePossessorValues
        : [""];
    const objectSlotModels = buildNominalAvailabilityObjectSlotModels(context.nounObjectSlotStates);
    const patientivoSources = context.resolvedTense === "patientivo"
        ? ["passive", "impersonal", "perfectivo", "imperfectivo", "tronco-verbal"]
        : [null];
    const ownershipSelections = context.resolvedTense === "patientivo"
        ? PATIENTIVO_OWNERSHIP_OPTIONS.map((entry) => entry.id)
        : [DEFAULT_PATIENTIVO_OWNERSHIP];
    const summary = createToggleAvailabilityRealizationSummary();
    for (const patientivoSource of patientivoSources) {
        for (const patientivoOwnership of ownershipSelections) {
            iterateNounObjectSlotSelections(objectSlotModels, (selectedBySlot) => {
                const objectPrefix = selectedBySlot.object || "";
                const indirectObjectMarker = selectedBySlot.object2 || "";
                const thirdObjectMarker = selectedBySlot.object3 || "";
                subjectSelections.forEach(({
                    selection,
                    number,
                    useReduplicatedSingularSurface = false,
                }) => {
                    possessorSelections.forEach((possessorPrefix) => {
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
                        useReduplicatedSingularSurface,
                        });
                        recordToggleAvailabilityRealization(summary, {
                            availabilityState: availabilityRecord.availabilityState,
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
        summary,
    });
}

function getAndrewsFirstTenseTabsAriaLabel(tenseMode = TENSE_MODE.verbo) {
    if (tenseMode === TENSE_MODE.verbo) {
        return "Ranura tiempo/modo de la CNV";
    }
    if (isNominalTenseMode(tenseMode)) {
        return "Función nominal sin ranura tiempo de CNN";
    }
    return "Opciones de salida";
}

function getAndrewsFirstUniversalTabsAriaLabel() {
    return "Clases de tronco perfectivo";
}

function getAndrewsFirstTenseHoverTitle(tenseValue = "") {
    const titles = {
        presente: "Andrews Lecciones 5 y 7: presente indicativo, tronco imperfectivo, ranura tiempo Ø.",
        "presente-habitual": "Andrews Lecciones 5 y 7: presente habitual indicativo sobre tronco imperfectivo.",
        "presente-desiderativo": "Extensión Nawat/Pipil: la ruta conserva la arquitectura Andrews de CNV y ranura tiempo.",
        imperfecto: "Andrews Lecciones 5 y 7: imperfecto indicativo, tronco imperfectivo, morfo ya.",
        futuro: "Andrews Lecciones 5 y 7: futuro indicativo, tronco imperfectivo, morfo s.",
        condicional: "Extensión Nawat/Pipil: la ruta conserva la arquitectura Andrews de CNV y ranura tiempo.",
        preterito: "Andrews Lecciones 5 y 7: pretérito indicativo, tronco perfectivo, morfo Ø.",
        "pasado-remoto": "Andrews Lecciones 5 y 7: pasado remoto indicativo, tronco perfectivo, morfo ka.",
        perfecto: "Extensión Nawat/Pipil: resultado perfecto sobre la arquitectura Andrews de CNV.",
        pluscuamperfecto: "Extensión Nawat/Pipil: resultado pluscuamperfecto sobre la arquitectura Andrews de CNV.",
        "condicional-perfecto": "Extensión Nawat/Pipil: resultado condicional perfecto sobre la arquitectura Andrews de CNV.",
        optativo: "Andrews Lecciones 5 y 9: optativo no pasado; Nawat no implementa admonitivo.",
        "preterito-universal-1": "Andrews Lección 7: clase A de tronco perfectivo.",
        "preterito-universal-2": "Andrews Lección 7: clase B de tronco perfectivo.",
        "preterito-universal-4": "Andrews Lección 7: clase C de tronco perfectivo.",
        "preterito-universal-3": "Andrews Lección 7: clase D de tronco perfectivo.",
    };
    return titles[String(tenseValue || "").trim()] || "Andrews PDF dirige salida; Nawat/Pipil limita ortografia y preterito indicativo.";
}

function getAndrewsFirstGroupHoverTitle(group = null) {
    if (!group || typeof group !== "object") {
        return "";
    }
    return getLocalizedLabel(group.hoverTitle, getIsNawat(), "")
        || getLocalizedLabel(group.title, getIsNawat(), "")
        || "";
}

function buildFormalReroutedFunctionTenseGroups(tenseMode = "", visibleTenses = []) {
    const normalizedMode = String(tenseMode || "").trim();
    if (normalizedMode !== TENSE_MODE.adjetivo && normalizedMode !== TENSE_MODE.adverbio) {
        return null;
    }
    const visibleTenseSet = new Set(Array.isArray(visibleTenses) ? visibleTenses : []);
    const sourceModes = normalizedMode === TENSE_MODE.adverbio
        ? [TENSE_MODE.verbo]
        : [TENSE_MODE.verbo, TENSE_MODE.sustantivo];
    const mergeGroups = (side = "left") => sourceModes.flatMap((mode) => (
        Array.isArray(TENSE_LINGUISTIC_GROUPS[mode]?.[side])
            ? TENSE_LINGUISTIC_GROUPS[mode][side]
            : []
    )).map((group) => ({
        ...group,
        tenses: Array.isArray(group?.tenses)
            ? group.tenses.filter((tenseValue) => visibleTenseSet.has(tenseValue))
            : [],
    })).filter((group) => group.tenses.length);
    return {
        left: mergeGroups("left"),
        right: mergeGroups("right"),
    };
}

var AndrewsRouteBoardDestinationKey = "";
var AndrewsRouteBoardPinnedSourceInput = "";
var AndrewsRouteBoardPinnedSourceStage = null;
var AndrewsRouteBoardActiveJourney = null;
var AndrewsRouteBoardSourceOverrideStage = null;
var AndrewsRouteBoardContinuedJourney = null;
var AndrewsRouteBoardJourneyHistory = [];

function clearAndrewsRouteBoardPinnedJourney({
    clearDestination = true,
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
    if (typeof renderOutputJourneyStrip === "function") {
        renderOutputJourneyStrip();
    }
}

function normalizeAndrewsRouteBoardInputValue(value = "") {
    const normalized = String(value || "").trim();
    return normalized === "_" ? "" : normalized;
}

function getAndrewsRouteBoardRawInput(verbMeta = null) {
    return normalizeAndrewsRouteBoardInputValue(
        document.getElementById("verb")?.value
        || verbMeta?.rawValue
        || verbMeta?.inputValue
        || verbMeta?.displayVerb
        || ""
    );
}

function getAndrewsRouteBoardUiSourceStage(verbMeta = null, {
    rawInput = null,
} = {}) {
    const mode = typeof getActiveTenseMode === "function" ? getActiveTenseMode() : "";
    const formalMode = typeof getFormalTenseModeForCurrentSelection === "function"
        ? getFormalTenseModeForCurrentSelection(mode)
        : mode;
    const entryBoard = typeof getComposerEntryBoard === "function" ? getComposerEntryBoard() : "";
    const ordinaryNncActive = typeof isOrdinaryNncGenerationModeEnabled === "function"
        && isOrdinaryNncGenerationModeEnabled();
    const input = rawInput === null ? getAndrewsRouteBoardRawInput(verbMeta) : String(rawInput || "").trim();
    if (typeof getAndrewsCnvCnnRouteStageFromFormulaInput === "function") {
        return getAndrewsCnvCnnRouteStageFromFormulaInput(input, {
            mode: formalMode,
            defaultStage: (
                ordinaryNncActive
                || entryBoard === "ordinary-nnc"
                || entryBoard === "noun-to-verb"
                || formalMode === TENSE_MODE.sustantivo
            )
                ? {
                    formulaType: "CNN",
                    formulaPosition: "predicate-stem",
                    stemRank: "nounstem",
                }
                : {
                    formulaType: "CNV",
                    formulaPosition: "predicate-stem",
                    stemRank: "verbstem",
            },
        });
    }
    if (
        ordinaryNncActive
        || entryBoard === "ordinary-nnc"
        || entryBoard === "noun-to-verb"
        || formalMode === TENSE_MODE.sustantivo
    ) {
        return {
            formulaType: "CNN",
            formulaPosition: "predicate-stem",
            stemRank: "nounstem",
        };
    }
    if (/^#.*#$/.test(input) && formalMode === TENSE_MODE.verbo) {
        return {
            formulaType: "CNV",
            formulaPosition: "predicate",
            stemRank: "predicate",
        };
    }
    if (formalMode === TENSE_MODE.verbo) {
        return {
            formulaType: "CNV",
            formulaPosition: "predicate-stem",
            stemRank: "verbstem",
        };
    }
    return {
        formulaType: "CNV",
        formulaPosition: "predicate-stem",
        stemRank: "verbstem",
    };
}

function appendAndrewsRouteBoardPill(parent, label = "", value = "") {
    const pill = document.createElement("span");
    pill.className = "andrews-route-board__pill";
    if (label) {
        const labelEl = document.createElement("span");
        labelEl.className = "andrews-route-board__pill-label";
        labelEl.textContent = label;
        pill.appendChild(labelEl);
    }
    const valueEl = document.createElement("span");
    valueEl.className = "andrews-route-board__pill-value";
    valueEl.textContent = value;
    pill.appendChild(valueEl);
    parent.appendChild(pill);
    return pill;
}

const ANDREWS_ROUTE_BOARD_MAP_SVG_NS = "http://www.w3.org/2000/svg";

const ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS = Object.freeze([
    Object.freeze({
        id: "entrada-field",
        zone: "entrada",
        label: "#1 ENTRADA",
        path: "M16 34 C112 18 190 28 260 56 C220 96 132 120 42 106 C22 82 14 58 16 34Z",
        labelX: 44,
        labelY: 52,
    }),
    Object.freeze({
        id: "formula-field",
        zone: "formula",
        label: "#2 FORMULA",
        path: "M184 36 C318 14 470 28 604 62 C586 132 484 166 326 158 C234 154 182 112 184 36Z",
        labelX: 294,
        labelY: 54,
    }),
    Object.freeze({
        id: "salida-field",
        zone: "salida",
        label: "#3 SALIDA",
        path: "M512 74 C620 68 692 104 704 176 C660 218 588 236 496 220 C550 178 560 126 512 74Z",
        labelX: 592,
        labelY: 112,
    }),
    Object.freeze({
        id: "cnn-basin",
        zone: "cnn",
        label: "CNN BAJO",
        path: "M90 192 C210 172 356 176 486 194 C588 208 648 236 690 274 L116 274 C88 248 78 222 90 192Z",
        labelX: 154,
        labelY: 246,
    }),
]);

const ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES = Object.freeze([
    Object.freeze({ id: "vertical-entry", path: "M120 28 L120 272" }),
    Object.freeze({ id: "vertical-formula", path: "M360 22 L360 278" }),
    Object.freeze({ id: "vertical-output", path: "M600 44 L600 272" }),
    Object.freeze({ id: "horizontal-cnv", path: "M28 118 L694 118" }),
    Object.freeze({ id: "horizontal-cnn", path: "M72 220 L690 220" }),
]);

const ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS = Object.freeze([
    Object.freeze({
        id: "formula-boundary",
        label: "Frontera",
        x: 42,
        y: 134,
        anchor: "start",
    }),
    Object.freeze({
        id: "stem-rank",
        label: "Tronco",
        x: 282,
        y: 48,
        anchor: "middle",
    }),
    Object.freeze({
        id: "source-target-route",
        label: "Ruta",
        x: 386,
        y: 174,
        anchor: "middle",
    }),
    Object.freeze({
        id: "slot-ownership",
        label: "Slots",
        x: 504,
        y: 42,
        anchor: "middle",
    }),
    Object.freeze({
        id: "function-use",
        label: "Funcion",
        x: 618,
        y: 154,
        anchor: "middle",
    }),
]);

const ANDREWS_ROUTE_BOARD_MAP_STATIONS = Object.freeze({
    "CNV:predicate:predicate": Object.freeze({
        x: 88,
        y: 78,
        label: "Predicado",
        region: "CNV",
        stationRole: "major",
        labelDx: 12,
        labelDy: -13,
        labelAnchor: "start",
    }),
    "CNV:core:verbal-core": Object.freeze({
        x: 226,
        y: 78,
        label: "Nucleo",
        region: "CNV",
        stationRole: "transfer",
        labelDx: -12,
        labelDy: -14,
        labelAnchor: "end",
    }),
    "CNV:predicate-stem:verbstem": Object.freeze({
        x: 342,
        y: 128,
        label: "Tronco verbal",
        region: "CNV",
        stationRole: "major",
        labelDx: -12,
        labelDy: -15,
        labelAnchor: "end",
    }),
    "CNV:predicate-stem:deverbal-verbstem": Object.freeze({
        x: 542,
        y: 82,
        label: "Verbal deverbal",
        region: "CNV",
        stationRole: "terminal",
        labelDx: 12,
        labelDy: -12,
        labelAnchor: "start",
    }),
    "CNV:predicate-stem:denominal-verbstem": Object.freeze({
        x: 544,
        y: 176,
        label: "Verbal denominal",
        region: "CNV",
        stationRole: "transfer",
        labelDx: 14,
        labelDy: 4,
        labelAnchor: "start",
    }),
    "CNN:predicate-stem:nounstem": Object.freeze({
        x: 178,
        y: 222,
        label: "Tronco nominal",
        region: "CNN",
        stationRole: "major",
        labelDx: -12,
        labelDy: 18,
        labelAnchor: "end",
    }),
    "CNN:predicate-stem:deverbal-nounstem": Object.freeze({
        x: 400,
        y: 224,
        label: "Nominal deverbal",
        region: "CNN",
        stationRole: "terminal",
        labelDx: 0,
        labelDy: 20,
        labelAnchor: "middle",
    }),
    "CNN:predicate-stem:active-action-nounstem": Object.freeze({
        x: 626,
        y: 222,
        label: "Accion activa",
        region: "CNN",
        stationRole: "terminal",
        labelDx: 10,
        labelDy: -14,
        labelAnchor: "start",
    }),
});

const ANDREWS_ROUTE_BOARD_MAP_ROUTES = Object.freeze({
    "cnv-predicate-to-cnn-nounstem-nominalization": Object.freeze({
        code: "1",
        color: "#d4931e",
        label: "CNV predicado > CNN nominal",
        family: "CNV->CNN",
        stationKeys: Object.freeze([
            "CNV:predicate:predicate",
            "CNN:predicate-stem:nounstem",
        ]),
        path: "M88 78 C112 122 135 174 178 222",
        badgeX: 128,
        badgeY: 164,
        arrowX: 132,
        arrowY: 158,
        arrowRotate: 58,
        destinationCalloutX: 72,
        destinationCalloutY: 268,
        destinationCalloutAnchor: "start",
        destinationCalloutLabel: "Nominal",
    }),
    "cnv-core-to-cnn-nounstem-deverbal": Object.freeze({
        code: "2",
        color: "#1f78a8",
        label: "CNV nucleo > CNN deverbal",
        family: "CNV->CNN",
        stationKeys: Object.freeze([
            "CNV:core:verbal-core",
            "CNN:predicate-stem:deverbal-nounstem",
        ]),
        path: "M226 78 C284 126 328 190 400 224",
        badgeX: 318,
        badgeY: 158,
        arrowX: 316,
        arrowY: 158,
        arrowRotate: 42,
        destinationCalloutX: 360,
        destinationCalloutY: 270,
        destinationCalloutAnchor: "start",
        destinationCalloutLabel: "Nominal deverbal",
    }),
    "cnn-nounstem-to-cnv-verbstem-denominal": Object.freeze({
        code: "3",
        color: "#48935c",
        label: "CNN nominal > CNV denominal",
        family: "CNN->CNV",
        stationKeys: Object.freeze([
            "CNN:predicate-stem:nounstem",
            "CNV:predicate-stem:denominal-verbstem",
        ]),
        path: "M178 222 C294 224 430 202 544 176",
        badgeX: 356,
        badgeY: 208,
        arrowX: 356,
        arrowY: 208,
        arrowRotate: -10,
        destinationCalloutX: 666,
        destinationCalloutY: 146,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Denominal",
    }),
    "cnv-verbstem-to-cnv-verbstem-deverbal": Object.freeze({
        code: "4",
        color: "#7459a6",
        label: "CNV verbal > CNV deverbal",
        family: "CNV->CNV",
        stationKeys: Object.freeze([
            "CNV:predicate-stem:verbstem",
            "CNV:predicate-stem:deverbal-verbstem",
        ]),
        path: "M342 128 C410 118 476 98 542 82",
        badgeX: 454,
        badgeY: 104,
        arrowX: 452,
        arrowY: 104,
        arrowRotate: -14,
        destinationCalloutX: 662,
        destinationCalloutY: 48,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Deverbal",
    }),
    "cnv-to-cnn-to-cnv-loop": Object.freeze({
        code: "5",
        color: "#c45f52",
        label: "CNV > CNN > CNV",
        family: "loop",
        stationKeys: Object.freeze([
            "CNV:core:verbal-core",
            "CNN:predicate-stem:deverbal-nounstem",
            "CNV:predicate-stem:denominal-verbstem",
        ]),
        path: "M226 78 C292 138 334 206 400 224 C464 232 512 202 544 176",
        badgeX: 424,
        badgeY: 202,
        arrowX: 426,
        arrowY: 210,
        arrowRotate: -12,
        destinationCalloutX: 690,
        destinationCalloutY: 186,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Loop denominal",
    }),
    "cnn-to-cnv-to-cnn-active-action-loop": Object.freeze({
        code: "6",
        color: "#d86b37",
        label: "CNN > CNV > CNN accion",
        family: "loop",
        stationKeys: Object.freeze([
            "CNN:predicate-stem:nounstem",
            "CNV:predicate-stem:denominal-verbstem",
            "CNN:predicate-stem:active-action-nounstem",
        ]),
        path: "M178 222 C300 204 430 176 544 176 C588 176 614 194 626 222",
        badgeX: 592,
        badgeY: 194,
        arrowX: 494,
        arrowY: 178,
        arrowRotate: -4,
        destinationCalloutX: 690,
        destinationCalloutY: 254,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Accion",
    }),
    "cnn-to-cnv-to-cnv-deverbal-chain": Object.freeze({
        code: "7",
        color: "#b15c83",
        label: "CNN > CNV > CNV deverbal",
        family: "chain",
        stationKeys: Object.freeze([
            "CNN:predicate-stem:nounstem",
            "CNV:predicate-stem:denominal-verbstem",
            "CNV:predicate-stem:deverbal-verbstem",
        ]),
        path: "M178 222 C308 196 430 176 544 176 C572 142 568 108 542 82",
        badgeX: 562,
        badgeY: 128,
        arrowX: 556,
        arrowY: 132,
        arrowRotate: -68,
        destinationCalloutX: 686,
        destinationCalloutY: 104,
        destinationCalloutAnchor: "end",
        destinationCalloutLabel: "Cadena deverbal",
    }),
});

const ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS = Object.freeze([
    Object.freeze({
        id: "formula-boundary",
        shortLabel: "Frontera",
        label: "formula boundary",
    }),
    Object.freeze({
        id: "stem-rank",
        shortLabel: "Tronco",
        label: "stem rank",
    }),
    Object.freeze({
        id: "source-target-route",
        shortLabel: "Ruta",
        label: "source/target route",
    }),
    Object.freeze({
        id: "slot-ownership",
        shortLabel: "Slots",
        label: "slot ownership",
    }),
    Object.freeze({
        id: "function-use",
        shortLabel: "Funcion",
        label: "function-use last",
    }),
]);

const ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS = Object.freeze([
    Object.freeze({ dx: -18, dy: -18 }),
    Object.freeze({ dx: 18, dy: -18 }),
    Object.freeze({ dx: -18, dy: 18 }),
    Object.freeze({ dx: 18, dy: 18 }),
    Object.freeze({ dx: 0, dy: -24 }),
    Object.freeze({ dx: 0, dy: 24 }),
    Object.freeze({ dx: -26, dy: 0 }),
    Object.freeze({ dx: 26, dy: 0 }),
]);

const ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES = Object.freeze([
    Object.freeze({
        id: "route-line",
        label: "Linea",
        meta: "ruta",
        symbolKind: "route-line",
    }),
    Object.freeze({
        id: "station",
        label: "Estacion",
        meta: "punto",
        symbolKind: "station",
    }),
    Object.freeze({
        id: "transfer",
        label: "Trasbordo",
        meta: "rutas",
        symbolKind: "transfer",
    }),
    Object.freeze({
        id: "route-terminal",
        label: "Terminal",
        meta: "origen/destino",
        symbolKind: "route-terminal",
        symbolText: "1",
    }),
    Object.freeze({
        id: "current-destination",
        label: "Aqui/Destino",
        meta: "viaje",
        symbolKind: "current-destination",
    }),
    Object.freeze({
        id: "dimension-landmark",
        label: "Dimension",
        meta: "geografia",
        symbolKind: "dimension-landmark",
        symbolText: "F",
    }),
]);

const ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK = Object.freeze([
    Object.freeze({
        id: "geography",
        label: "Geografia",
        model: "low-saturation-grammar-geography",
        role: "base-map",
    }),
    Object.freeze({
        id: "track-bed",
        label: "Trazado",
        model: "low-saturation-route-track-bed",
        role: "route-ground",
    }),
    Object.freeze({
        id: "route-lines",
        label: "Lineas",
        model: "andrews-geography-route-lines",
        role: "transit-surface",
    }),
    Object.freeze({
        id: "stations",
        label: "Estaciones",
        model: "station-points-on-colored-route-lines",
        role: "grammar-coordinate",
    }),
    Object.freeze({
        id: "transfers",
        label: "Trasbordos",
        model: "shared-station-route-interchange",
        role: "handoff",
    }),
    Object.freeze({
        id: "gis-dimensions",
        label: "Capas GIS",
        model: "inter-dimensional-positioning-system",
        role: "coordinate-system",
    }),
    Object.freeze({
        id: "dimension-landmarks",
        label: "Hitos",
        model: "grammar-dimension-landmarks",
        role: "map-reading",
    }),
    Object.freeze({
        id: "route-planner",
        label: "Viaje",
        model: "passenger-route-planner",
        role: "navigation",
    }),
    Object.freeze({
        id: "advisory",
        label: "Avisos",
        model: "obstacle-blocked-condition-uncertainty-advisory",
        role: "service-advisory",
    }),
]);

const ANDREWS_ROUTE_BOARD_MAP_APPROVAL_COORDINATE_FLOOR = 1576;

const ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_ORDER = Object.freeze([
    "CNV->CNN",
    "CNN->CNV",
    "CNV->CNV",
    "loop",
    "chain",
]);

const ANDREWS_ROUTE_BOARD_MAP_CORRIDOR_LABELS = Object.freeze({
    "CNV->CNN": Object.freeze({
        label: "CNV > CNN",
        meta: "verbal a nominal",
    }),
    "CNN->CNV": Object.freeze({
        label: "CNN > CNV",
        meta: "nominal a verbal",
    }),
    "CNV->CNV": Object.freeze({
        label: "CNV > CNV",
        meta: "verbal deverbal",
    }),
    loop: Object.freeze({
        label: "Bucle",
        meta: "regreso por transferencia",
    }),
    chain: Object.freeze({
        label: "Cadena",
        meta: "deverbal continuo",
    }),
});

function createAndrewsRouteBoardSvgElement(tagName = "g", attributes = {}) {
    const element = document.createElementNS(ANDREWS_ROUTE_BOARD_MAP_SVG_NS, tagName);
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
        return entry.routeIds.map((routeId) => String(routeId || "").trim()).filter(Boolean);
    }
    const routeId = String(entry.routeId || "").trim();
    return routeId ? [routeId] : [];
}

function andrewsRouteBoardMapEntryIncludesRouteId(entry = null, routeId = "") {
    const normalizedRouteId = String(routeId || "").trim();
    return Boolean(
        normalizedRouteId
        && getAndrewsRouteBoardMapRouteIdsFromEntry(entry).includes(normalizedRouteId)
    );
}

function findAndrewsRouteBoardMapEntryForRouteId(entries = [], routeId = "") {
    const normalizedRouteId = String(routeId || "").trim();
    if (!normalizedRouteId) {
        return null;
    }
    return (Array.isArray(entries) ? entries : [])
        .find((entry) => andrewsRouteBoardMapEntryIncludesRouteId(entry, normalizedRouteId)) || null;
}

function getAndrewsRouteBoardMapEntryDestinationStationKey(entry = null) {
    if (!entry || typeof entry !== "object") {
        return "";
    }
    const routeStops = Array.isArray(entry.routeStops) ? entry.routeStops : [];
    const lastStop = routeStops.length ? routeStops[routeStops.length - 1] : null;
    return String(
        entry.key
        || entry.nextSourceStageKey
        || entry.routeTicket?.nextSourceStageKey
        || entry.targetAction?.targetStageKey
        || entry.targetStageKey
        || entry.destinationKey
        || lastStop?.key
        || ""
    ).trim();
}

function findAndrewsRouteBoardMapEntryForStationKey(entries = [], stationKey = "") {
    const normalizedStationKey = String(stationKey || "").trim();
    if (!normalizedStationKey) {
        return null;
    }
    return (Array.isArray(entries) ? entries : [])
        .find((entry) => getAndrewsRouteBoardMapEntryDestinationStationKey(entry) === normalizedStationKey) || null;
}

function addAndrewsRouteBoardMapRouteIds(targetSet, entries = []) {
    (Array.isArray(entries) ? entries : []).forEach((entry) => {
        getAndrewsRouteBoardMapRouteIdsFromEntry(entry).forEach((routeId) => {
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
        getAndrewsRouteBoardMapRouteIdsFromEntry(board.recommendedRoute || null).forEach((routeId) => routeIds.add(routeId));
    } else {
        addAndrewsRouteBoardMapRouteIds(routeIds, board.visibleRoutes || []);
    }
    return Array.from(routeIds);
}

function getAndrewsRouteBoardMapStationKeysForRoutes(routeIds = []) {
    const stationKeys = new Set();
    (Array.isArray(routeIds) ? routeIds : []).forEach((routeId) => {
        const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId];
        (Array.isArray(route?.stationKeys) ? route.stationKeys : []).forEach((stationKey) => {
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
    return Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES)
        .filter(([, route]) => Array.isArray(route?.stationKeys) && route.stationKeys.includes(normalizedStationKey))
        .map(([routeId, route]) => ({
            routeId,
            code: route.code || "",
            color: route.color || "",
            label: route.label || "",
            family: route.family || "",
        }));
}

function applyAndrewsRouteBoardMapStationServiceDataset(element, serviceRoutes = []) {
    if (!element) {
        return element;
    }
    const routes = Array.isArray(serviceRoutes) ? serviceRoutes : [];
    element.dataset.stationServiceModel = "route-codes-at-station";
    element.dataset.stationServiceRouteCount = String(routes.length);
    element.dataset.stationServiceRouteIds = routes.map((route) => route.routeId).filter(Boolean).join("|");
    element.dataset.stationServiceRouteCodes = routes.map((route) => route.code).filter(Boolean).join("|");
    return element;
}

function getAndrewsRouteBoardMapTransferEntries() {
    return Object.entries(ANDREWS_ROUTE_BOARD_MAP_STATIONS)
        .map(([stationKey, station]) => {
            const serviceRoutes = getAndrewsRouteBoardMapStationServiceRoutes(stationKey);
            return {
                stationKey,
                station,
                serviceRoutes,
                transferKind: station?.stationRole === "transfer" || serviceRoutes.length > 1
                    ? "interchange"
                    : "",
            };
        })
        .filter((entry) => entry.transferKind && entry.serviceRoutes.length > 1);
}

function getAndrewsRouteBoardMapRouteTerminalEntries() {
    return Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES)
        .map(([routeId, route]) => {
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
                stationCount: stationKeys.length,
            };
        });
}

function getAndrewsRouteBoardMapRouteTerminalEndpointEntries() {
    const stationEndpointCounts = {};
    return getAndrewsRouteBoardMapRouteTerminalEntries()
        .flatMap((entry) => [
            {
                ...entry,
                endpointRole: "source",
                stationKey: entry.sourceKey,
                stationLabel: entry.sourceLabel,
            },
            {
                ...entry,
                endpointRole: "destination",
                stationKey: entry.destinationKey,
                stationLabel: entry.destinationLabel,
            },
        ])
        .map((entry) => {
            const station = ANDREWS_ROUTE_BOARD_MAP_STATIONS[entry.stationKey] || null;
            const endpointIndex = stationEndpointCounts[entry.stationKey] || 0;
            stationEndpointCounts[entry.stationKey] = endpointIndex + 1;
            const offset = ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS[
                endpointIndex % ANDREWS_ROUTE_BOARD_MAP_TERMINAL_ENDPOINT_OFFSETS.length
            ];
            return {
                ...entry,
                station,
                endpointIndex,
                x: (station?.x || 0) + offset.dx,
                y: (station?.y || 0) + offset.dy,
            };
        })
        .filter((entry) => entry.station);
}

function getAndrewsRouteBoardMapDestinationCalloutEntries() {
    return getAndrewsRouteBoardMapRouteTerminalEndpointEntries()
        .filter((entry) => entry.endpointRole === "destination")
        .map((entry) => {
            const route = entry.route || {};
            const anchor = String(route.destinationCalloutAnchor || "").trim() || "start";
            return {
                ...entry,
                calloutModel: "route-destination-headsign-callouts",
                calloutX: typeof route.destinationCalloutX === "number"
                    ? route.destinationCalloutX
                    : entry.x,
                calloutY: typeof route.destinationCalloutY === "number"
                    ? route.destinationCalloutY
                    : entry.y,
                calloutAnchor: anchor,
                calloutLabel: String(route.destinationCalloutLabel || entry.stationLabel || "").trim(),
                textX: anchor === "end" ? -13 : 13,
                codeX: anchor === "end" ? 0 : 0,
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
                routes: [],
            };
        }
        corridors[family].routes.push({
            routeId,
            code: route?.code || "",
            color: route?.color || "",
            label: route?.label || "",
        });
    });
    return Object.values(corridors)
        .sort((left, right) => {
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
    sourceLayerStationKeys = [],
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
    const labelDx = typeof station?.labelDx === "number"
        ? station.labelDx
        : (station?.x > 500 ? -10 : 10);
    const labelDy = typeof station?.labelDy === "number"
        ? station.labelDy
        : (station?.y > 210 ? -11 : 18);
    const labelAnchor = String(station?.labelAnchor || "").trim()
        || (station?.x > 500 ? "end" : "start");
    return {
        placementModel: "cartographic-station-label-placement",
        labelDx,
        labelDy,
        labelAnchor,
        flagDy: labelDy < 0 ? labelDy - 14 : labelDy + 14,
    };
}

function getAndrewsRouteBoardMapStationRouteEntry(stationKey = "", board = null, baseBoard = null) {
    return findAndrewsRouteBoardMapEntryForStationKey(board?.visibleRoutes || [], stationKey)
        || findAndrewsRouteBoardMapEntryForStationKey(board?.destinationOptions || [], stationKey)
        || findAndrewsRouteBoardMapEntryForStationKey(baseBoard?.destinationOptions || [], stationKey)
        || findAndrewsRouteBoardMapEntryForStationKey(board?.departures || [], stationKey)
        || findAndrewsRouteBoardMapEntryForStationKey(board?.itineraries || [], stationKey)
        || null;
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
        "predicate-stem": "stem",
    };
    const functionUse = getAndrewsRouteBoardMapStationFunctionUse(stationKey, station);
    const coordinateParts = [
        formulaType,
        formulaPosition,
        stemRank,
        slotOwnerLabels[formulaPosition] || formulaPosition,
        functionUse,
    ].filter(Boolean);
    return {
        kind: "andrews-route-board-map-station-coordinate-frame",
        version: 1,
        coordinateModel: "formula-boundary-stem-rank-source-target-route-slot-ownership-function-use",
        dimensionOrder: ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.map((entry) => entry.id),
        stationKey,
        stationLabel: station?.label || "",
        stationStatus: stationStatus || "",
        formulaType,
        formulaPosition,
        stemRank,
        sourceTargetRoute: stationStatus || "terrain",
        slotOwner: slotOwnerLabels[formulaPosition] || formulaPosition,
        functionUse,
        coordinateLabel: coordinateParts.join(" · "),
    };
}

function applyAndrewsRouteBoardMapStationCoordinateDataset(element, coordinateFrame = null) {
    if (!element || !coordinateFrame) {
        return element;
    }
    element.dataset.stationCoordinateModel = coordinateFrame.coordinateModel || "";
    element.dataset.stationDimensionOrder = Array.isArray(coordinateFrame.dimensionOrder)
        ? coordinateFrame.dimensionOrder.join("|")
        : "";
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
        const layerStatus = destinationValue
            ? "routed"
            : sourceValue
                ? "source"
                : "open";
        const plannerRole = entry.id === "function-use"
            ? "resolve-last"
            : entry.id === "source-target-route"
                ? "route-path"
                : "coordinate";
        return {
            id: entry.id,
            index: index + 1,
            shortLabel: entry.shortLabel,
            label: entry.label,
            sourceValue,
            destinationValue,
            layerStatus,
            plannerRole,
        };
    });
}

function appendAndrewsRouteBoardMapDimensionScale(parent, board = null, coordinateFrames = {}) {
    const dimensions = document.createElement("div");
    dimensions.className = "andrews-route-board__map-dimensions";
    dimensions.dataset.mapDimensionModel = "inter-dimensional-positioning-system";
    dimensions.dataset.mapGisLayerModel = "layered-grammar-gis";
    dimensions.dataset.mapTransitSurfaceModel = "transit-map-surface";
    dimensions.dataset.mapRoutePlannerModel = "passenger-route-planner";
    dimensions.dataset.mapDimensionOrder = ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.map((entry) => entry.id).join("|");
    const sourceCoordinate = coordinateFrames[board?.currentStation?.key || ""] || null;
    const destinationCoordinate = coordinateFrames[board?.destinationStation?.key || ""] || null;
    const layerEntries = getAndrewsRouteBoardMapGisLayerEntries(sourceCoordinate, destinationCoordinate);
    dimensions.dataset.mapCurrentCoordinate = sourceCoordinate?.coordinateLabel || "";
    dimensions.dataset.mapDestinationCoordinate = destinationCoordinate?.coordinateLabel || "";
    dimensions.dataset.mapGisLayerCount = String(layerEntries.length);
    dimensions.dataset.mapGisLayerIds = layerEntries.map((entry) => entry.id).join("|");
    dimensions.dataset.mapOpenLayerCount = String(layerEntries.filter((entry) => entry.layerStatus === "open").length);
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-dimensions-label";
    label.textContent = "Capas GIS";
    const chipWrap = document.createElement("span");
    chipWrap.className = "andrews-route-board__map-dimension-chips";
    layerEntries.forEach((entry) => {
        const chip = document.createElement("span");
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
    const layerList = document.createElement("div");
    layerList.className = "andrews-route-board__map-gis-layer-list";
    layerList.dataset.mapGisLayerModel = "layered-grammar-gis";
    layerList.dataset.mapGisLayerCount = String(layerEntries.length);
    layerEntries.forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-gis-layer";
        item.dataset.dimensionId = entry.id;
        item.dataset.dimensionIndex = String(entry.index);
        item.dataset.mapGisLayerStatus = entry.layerStatus;
        item.dataset.mapPlannerRole = entry.plannerRole;
        item.dataset.sourceCoordinateValue = entry.sourceValue;
        item.dataset.destinationCoordinateValue = entry.destinationValue;
        const name = document.createElement("span");
        name.className = "andrews-route-board__map-gis-layer-name";
        name.textContent = entry.shortLabel;
        const value = document.createElement("span");
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
    const recommendedRouteIds = Array.isArray(board?.recommendedRoute?.routeIds)
        ? board.recommendedRoute.routeIds
        : [];
    const primaryEntry = getAndrewsRouteBoardMapPrimaryRouteEntry(board);
    const primaryRouteIds = recommendedRouteIds.length
        ? recommendedRouteIds
        : getAndrewsRouteBoardMapRouteIdsFromEntry(primaryEntry);
    return {
        routeIds: primaryRouteIds,
        routeKey: primaryRouteIds.join("|"),
        routePathLabel: board?.recommendedRoute?.routePathLabel
            || getAndrewsRouteBoardEntryRoutePathLabel(primaryEntry)
            || "",
        actionLabel: board?.recommendedRoute?.actionLabel
            || primaryEntry?.routeActionLabel
            || primaryEntry?.routeActionFrame?.actionLabel
            || "",
        nextStationKey: board?.recommendedRoute?.nextSourceStageKey
            || primaryEntry?.nextSourceStageKey
            || primaryEntry?.routeTicket?.nextSourceStageKey
            || "",
        nextStationLabel: board?.recommendedRoute?.nextSourceLabel
            || primaryEntry?.nextSourceLabel
            || primaryEntry?.label
            || primaryEntry?.targetLabel
            || "",
        resistanceScore: Number(board?.recommendedRoute?.resistanceScore || primaryEntry?.resistanceScore || primaryEntry?.routeTicket?.resistanceScore || 0),
    };
}

function getAndrewsRouteBoardMapPrimaryRouteEntry(board = null) {
    const visibleRoutes = Array.isArray(board?.visibleRoutes) ? board.visibleRoutes : [];
    const recommendedRouteIds = Array.isArray(board?.recommendedRoute?.routeIds)
        ? board.recommendedRoute.routeIds
        : [];
    const recommendedRouteKey = recommendedRouteIds.join("|");
    return (recommendedRouteKey
        ? visibleRoutes.find((entry) => getAndrewsRouteBoardMapEntryRouteKey(entry) === recommendedRouteKey)
        : null) || visibleRoutes[0] || null;
}

function appendAndrewsRouteBoardMapWayfinding(parent, board = null, coordinateFrames = {}) {
    const currentStationKey = board?.currentStation?.key || "";
    const destinationStationKey = board?.destinationStation?.key || "";
    const currentCoordinate = coordinateFrames[currentStationKey] || null;
    const destinationCoordinate = coordinateFrames[destinationStationKey] || null;
    const routeSign = getAndrewsRouteBoardMapPrimaryRouteSign(board);
    const wayfinding = document.createElement("div");
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
    const signs = [
        {
            role: "current",
            label: "Aqui",
            value: board?.currentStation?.label || "",
            meta: currentCoordinate?.formulaType || "",
            title: currentCoordinate?.coordinateLabel || "",
        },
        {
            role: "route",
            label: routeSign.actionLabel || "Via",
            value: routeSign.routePathLabel || routeSign.nextStationLabel || "",
            meta: routeSign.resistanceScore ? `R${routeSign.resistanceScore}` : "",
            title: routeSign.routePathLabel || routeSign.nextStationLabel || "",
        },
        {
            role: "destination",
            label: "Destino",
            value: board?.destinationStation?.label || routeSign.nextStationLabel || "Salidas",
            meta: destinationCoordinate?.formulaType || "",
            title: destinationCoordinate?.coordinateLabel || routeSign.nextStationLabel || "",
        },
    ];
    signs.forEach((sign) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-wayfinding-sign";
        item.dataset.signRole = sign.role;
        item.dataset.signLabel = sign.label;
        item.dataset.signValue = sign.value;
        if (sign.title) {
            item.title = sign.title;
        }
        const label = document.createElement("span");
        label.className = "andrews-route-board__map-wayfinding-label";
        label.textContent = sign.label;
        const value = document.createElement("span");
        value.className = "andrews-route-board__map-wayfinding-value";
        value.textContent = sign.value || "";
        item.append(label, value);
        if (sign.meta) {
            const meta = document.createElement("span");
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
    const fallbackStops = [
        {
            key: board?.currentStation?.key || "",
            label: board?.currentStation?.label || "",
        },
        {
            key: fallbackNext.nextStationKey || board?.destinationStation?.key || "",
            label: fallbackNext.nextStationLabel || board?.destinationStation?.label || "",
        },
    ].filter((stop, index, stops) => {
        const key = String(stop.key || "").trim();
        const label = String(stop.label || "").trim();
        return Boolean((key || label) && (index === 0 || key !== stops[0]?.key || label !== stops[0]?.label));
    });
    const stops = routeStops.length ? routeStops : fallbackStops;
    const firstStop = stops[0] || null;
    const lastStop = stops[stops.length - 1] || null;
    const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(primaryEntry)
        || stops.map((stop) => stop.label || stop.key).filter(Boolean).join(" > ");
    return {
        kind: "andrews-route-board-map-itinerary-frame",
        version: 1,
        itineraryModel: "current-to-destination-passenger-path",
        boardState: board?.boardState || "",
        actionLabel: board?.recommendedRoute?.actionLabel
            || primaryEntry?.routeActionLabel
            || primaryEntry?.routeActionFrame?.actionLabel
            || fallbackNext.actionLabel
            || "",
        routeIds,
        routePathLabel,
        sourceStation: firstStop?.key || board?.currentStation?.key || "",
        destinationStation: lastStop?.key || board?.destinationStation?.key || "",
        stops,
        segmentCount: Number(primaryEntry?.segmentCount || route?.segmentCount || routeTicket?.segmentCount || Math.max(stops.length - 1, 1)),
        transferCount: Number(primaryEntry?.transferCount || route?.transferCount || routeTicket?.transferCount || Math.max(stops.length - 2, 0)),
        resistanceScore: Number(primaryEntry?.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || fallbackNext.resistanceScore || 0),
        hiddenCoordinateCount: Number(primaryEntry?.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0),
        coordinates: stops.map((stop) => coordinateFrames[stop.key] || null),
    };
}

function getAndrewsRouteBoardMapTripPreviewFrame(board = null, coordinateFrames = {}) {
    const itinerary = getAndrewsRouteBoardMapItineraryFrame(board, coordinateFrames);
    const routeSign = getAndrewsRouteBoardMapPrimaryRouteSign(board);
    const routeIds = routeSign.routeIds.length ? routeSign.routeIds : itinerary.routeIds;
    const routeCodes = routeIds
        .map((routeId) => ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId]?.code || "")
        .filter(Boolean);
    const currentStationKey = board?.currentStation?.key || itinerary.sourceStation || "";
    const destinationStationKey = board?.destinationStation?.key
        || itinerary.destinationStation
        || routeSign.nextStationKey
        || "";
    const currentStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[currentStationKey] || null;
    const destinationStation = ANDREWS_ROUTE_BOARD_MAP_STATIONS[destinationStationKey] || null;
    const currentCoordinate = coordinateFrames[currentStationKey] || null;
    const destinationCoordinate = coordinateFrames[destinationStationKey] || null;
    const passengerFrame = board?.passengerFrame && typeof board.passengerFrame === "object"
        ? board.passengerFrame
        : null;
    const rideFrame = board?.rideFrame && typeof board.rideFrame === "object"
        ? board.rideFrame
        : null;
    return {
        kind: "andrews-route-board-map-trip-preview-frame",
        version: 1,
        previewModel: "passenger-route-preview-board",
        currentIntention: passengerFrame?.currentIntention || rideFrame?.currentIntention || board?.boardState || "",
        currentStationKey,
        currentStationLabel: board?.currentStation?.label || currentStation?.label || currentStationKey,
        currentCoordinate: currentCoordinate?.coordinateLabel || "",
        destinationStationKey,
        destinationStationLabel: board?.destinationStation?.label
            || destinationStation?.label
            || routeSign.nextStationLabel
            || "Destino abierto",
        destinationCoordinate: destinationCoordinate?.coordinateLabel || "",
        routeIds,
        routeCodes,
        routePathLabel: routeSign.routePathLabel || itinerary.routePathLabel || "",
        actionLabel: passengerFrame?.primaryActionLabel
            || rideFrame?.primaryActionLabel
            || routeSign.actionLabel
            || itinerary.actionLabel
            || "Explorar",
        stopCount: itinerary.stops.length,
        transferCount: itinerary.transferCount,
        segmentCount: itinerary.segmentCount,
        resistanceScore: itinerary.resistanceScore || routeSign.resistanceScore || 0,
        routeStops: itinerary.stops.map((stop) => stop.key || stop.label).filter(Boolean),
    };
}

function appendAndrewsRouteBoardMapTripPreview(parent, board = null, coordinateFrames = {}) {
    const frame = getAndrewsRouteBoardMapTripPreviewFrame(board, coordinateFrames);
    const preview = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-trip-preview-label";
    label.textContent = "Viaje";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-trip-preview-list";
    [
        {
            role: "current",
            roleLabel: "Estoy",
            main: frame.currentStationLabel || "Entrada",
            meta: frame.currentCoordinate || "",
        },
        {
            role: "destination",
            roleLabel: "Voy",
            main: frame.destinationStationLabel || "Destino abierto",
            meta: frame.destinationCoordinate || "",
        },
        {
            role: "route",
            roleLabel: "Linea",
            main: frame.routePathLabel || frame.routeCodes.join(" + ") || "Salidas",
            meta: [
                frame.actionLabel,
                frame.segmentCount === 1 ? "1 tramo" : `${frame.segmentCount || 0} tramos`,
                frame.transferCount ? `${frame.transferCount} trasbordo` : "",
                frame.resistanceScore ? `R${frame.resistanceScore}` : "",
            ].filter(Boolean).join(" · "),
        },
    ].forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-trip-preview-item";
        item.dataset.tripPreviewRole = entry.role;
        const role = document.createElement("span");
        role.className = "andrews-route-board__map-trip-preview-role";
        role.textContent = entry.roleLabel;
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-trip-preview-main";
        main.textContent = entry.main || "";
        item.append(role, main);
        if (entry.meta) {
            const meta = document.createElement("span");
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
        resistanceScore: Number(progress?.resistanceScore || trip.resistanceScore || 0),
    };
}

function appendAndrewsRouteBoardMapAnnouncements(parent, board = null, coordinateFrames = {}) {
    const frame = getAndrewsRouteBoardMapAnnouncementFrame(board, coordinateFrames);
    const announcements = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-announcements-label";
    label.textContent = "Aviso";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-announcement-list";
    [
        {
            role: "next",
            label: "Siguiente",
            value: frame.nextStationLabel || "Salidas",
            meta: frame.nextCoordinate || "",
        },
        {
            role: "route",
            label: frame.routeCodes.length ? `Linea ${frame.routeCodes.join("+")}` : "Linea",
            value: frame.routePathLabel || frame.actionLabel || "",
            meta: frame.actionLabel || "",
        },
        {
            role: "terrain",
            label: "Terreno",
            value: frame.transferCount ? `${frame.transferCount} trasbordo` : "Directo",
            meta: frame.resistanceScore ? `R${frame.resistanceScore}` : "",
        },
    ].forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-announcement";
        item.dataset.announcementRole = entry.role;
        const itemLabel = document.createElement("span");
        itemLabel.className = "andrews-route-board__map-announcement-label";
        itemLabel.textContent = entry.label;
        const value = document.createElement("span");
        value.className = "andrews-route-board__map-announcement-value";
        value.textContent = entry.value || "";
        item.append(itemLabel, value);
        if (entry.meta) {
            const meta = document.createElement("span");
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
    const routeCodes = (trip.routeCodes.length
        ? trip.routeCodes
        : routeIds.map((routeId) => ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId]?.code || "").filter(Boolean));
    const transferStops = itinerary.stops.slice(1, Math.max(itinerary.stops.length - 1, 1));
    const transferStationKeys = transferStops.map((stop) => stop.key || "").filter(Boolean);
    const transferStationLabels = transferStops
        .map((stop) => stop.label || stop.key || "")
        .filter(Boolean);
    const transferCoordinates = transferStationKeys
        .map((stationKey) => coordinateFrames[stationKey]?.coordinateLabel || "")
        .filter(Boolean);
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
        resistanceScore: Number(itinerary.resistanceScore || trip.resistanceScore || 0),
    };
}

function appendAndrewsRouteBoardMapTransferGuidance(parent, board = null, coordinateFrames = {}) {
    const frame = getAndrewsRouteBoardMapTransferGuidanceFrame(board, coordinateFrames);
    const guidance = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-transfer-guidance-label";
    label.textContent = "Cambio";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-transfer-guidance-list";
    [
        {
            role: "ride",
            label: "Tren",
            main: frame.directRide
                ? "Directo"
                : `${frame.transferCount} ${frame.transferCount === 1 ? "trasbordo" : "trasbordos"}`,
            meta: frame.directRide ? "sin cambio manual" : "cambio guiado",
        },
        {
            role: "station",
            label: "Estacion",
            main: frame.transferStationLabels.length ? frame.transferStationLabels.join(" > ") : "Sin cambio",
            meta: frame.transferCoordinates.join(" > "),
        },
        {
            role: "route",
            label: frame.routeCodes.length ? `Linea ${frame.routeCodes.join("+")}` : "Linea",
            main: frame.routePathLabel || frame.actionLabel || "",
            meta: [
                frame.actionLabel || "",
                frame.resistanceScore ? `R${frame.resistanceScore}` : "",
            ].filter(Boolean).join(" · "),
        },
    ].forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-transfer-guidance-item";
        item.dataset.transferGuidanceRole = entry.role;
        const itemLabel = document.createElement("span");
        itemLabel.className = "andrews-route-board__map-transfer-guidance-item-label";
        itemLabel.textContent = entry.label;
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-transfer-guidance-main";
        main.textContent = entry.main || "";
        item.append(itemLabel, main);
        if (entry.meta) {
            const meta = document.createElement("span");
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
    const platformFrame = board?.platformFrame && typeof board.platformFrame === "object"
        ? board.platformFrame
        : null;
    const tracks = Array.isArray(platformFrame?.tracks) ? platformFrame.tracks : [];
    const selectedTrack = tracks.find((entry) => /^(next|arrival)$/.test(entry?.recommendationRole || ""))
        || tracks.find((entry) => Array.isArray(entry?.routeIds) && entry.routeIds.some((routeId) => trip.routeIds.includes(routeId)))
        || tracks[0]
        || null;
    const routeIds = trip.routeIds.length
        ? trip.routeIds
        : (Array.isArray(selectedTrack?.routeIds) ? selectedTrack.routeIds : []);
    const routeCodes = trip.routeCodes.length
        ? trip.routeCodes
        : routeIds.map((routeId) => ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId]?.code || "").filter(Boolean);
    const destinationLabel = trip.destinationStationLabel
        || selectedTrack?.destinationLabel
        || board?.destinationStation?.label
        || "Salidas";
    const routePathLabel = trip.routePathLabel
        || selectedTrack?.routePathLabel
        || [
            trip.currentStationLabel || selectedTrack?.sourceLabel || "",
            destinationLabel,
        ].filter(Boolean).join(" > ");
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
        resistanceScore: trip.resistanceScore,
    };
}

function appendAndrewsRouteBoardMapHeadsign(parent, board = null, coordinateFrames = {}) {
    const frame = getAndrewsRouteBoardMapHeadsignFrame(board, coordinateFrames);
    const headsign = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-headsign-label";
    label.textContent = "Abordaje";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-headsign-list";
    [
        {
            role: "line",
            label: "Linea",
            main: frame.routeCodes.length ? frame.routeCodes.join(" + ") : "Ruta",
            meta: frame.directRide ? "directo" : `${frame.transferCount || 0} trasbordo`,
        },
        {
            role: "direction",
            label: "Hacia",
            main: frame.destinationStationLabel || "Salidas",
            meta: frame.routePathLabel || "",
        },
        {
            role: "boarding",
            label: frame.platformLabel || "Anden",
            main: frame.actionLabel || "Siguiente",
            meta: [
                frame.segmentCount === 1 ? "1 tramo" : `${frame.segmentCount || 0} tramos`,
                frame.resistanceScore ? `R${frame.resistanceScore}` : "",
            ].filter(Boolean).join(" · "),
        },
    ].forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-headsign-item";
        item.dataset.headsignRole = entry.role;
        const itemLabel = document.createElement("span");
        itemLabel.className = "andrews-route-board__map-headsign-item-label";
        itemLabel.textContent = entry.label;
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-headsign-main";
        main.textContent = entry.main || "";
        item.append(itemLabel, main);
        if (entry.meta) {
            const meta = document.createElement("span");
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
    const passengerFrame = board?.passengerFrame && typeof board.passengerFrame === "object"
        ? board.passengerFrame
        : {};
    const rideFrame = board?.rideFrame && typeof board.rideFrame === "object"
        ? board.rideFrame
        : {};
    const decisionLoad = rideFrame.decisionLoad && typeof rideFrame.decisionLoad === "object"
        ? rideFrame.decisionLoad
        : {};
    const passengerJourneyModel = passengerFrame.journeyModel || "";
    const rideJourneyModel = rideFrame.outputJourneyModel || "";
    const formulaSurfaceShared = passengerJourneyModel === "formula-and-surface-share-one-passenger-frame"
        || rideJourneyModel === "formula-and-surface-share-one-ride-frame";
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
        resistanceScore: trip.resistanceScore,
    };
}

function appendAndrewsRouteBoardMapContinuity(parent, board = null, coordinateFrames = {}) {
    const frame = getAndrewsRouteBoardMapContinuityFrame(board, coordinateFrames);
    const continuity = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-continuity-label";
    label.textContent = "Continuidad";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-continuity-list";
    [
        {
            role: "frame",
            label: "Marco",
            main: frame.formulaSurfaceShared ? "Formula > salida" : "Marco abierto",
            meta: frame.passengerJourneyModel || frame.rideJourneyModel || "",
        },
        {
            role: "switch",
            label: "Cambio",
            main: frame.switchingRequired ? "manual" : "sin cambio manual",
            meta: frame.directRide ? "mismo tren" : `${frame.transferCount || 0} trasbordo`,
        },
        {
            role: "route",
            label: frame.routeCodes.length ? `Linea ${frame.routeCodes.join("+")}` : "Ruta",
            main: frame.routePathLabel || frame.destinationLabel || "",
            meta: [
                frame.actionLabel || "",
                frame.throughService ? "servicio continuo" : "",
                frame.resistanceScore ? `R${frame.resistanceScore}` : "",
            ].filter(Boolean).join(" · "),
        },
    ].forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-continuity-item";
        item.dataset.continuityRole = entry.role;
        const itemLabel = document.createElement("span");
        itemLabel.className = "andrews-route-board__map-continuity-item-label";
        itemLabel.textContent = entry.label;
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-continuity-main";
        main.textContent = entry.main || "";
        item.append(itemLabel, main);
        if (entry.meta) {
            const meta = document.createElement("span");
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
    const itinerary = document.createElement("div");
    itinerary.className = "andrews-route-board__map-itinerary";
    itinerary.dataset.mapItineraryModel = frame.itineraryModel;
    itinerary.dataset.boardState = frame.boardState;
    itinerary.dataset.routeIds = frame.routeIds.join("|");
    itinerary.dataset.routePathLabel = frame.routePathLabel;
    itinerary.dataset.sourceStation = frame.sourceStation;
    itinerary.dataset.destinationStation = frame.destinationStation;
    itinerary.dataset.routeActionLabel = frame.actionLabel;
    itinerary.dataset.routeStopCount = String(frame.stops.length);
    itinerary.dataset.routeStops = frame.stops.map((stop) => stop.key || stop.label).filter(Boolean).join("|");
    itinerary.dataset.segmentCount = String(frame.segmentCount || 0);
    itinerary.dataset.transferCount = String(frame.transferCount || 0);
    itinerary.dataset.resistanceScore = String(frame.resistanceScore || 0);
    itinerary.dataset.hiddenCoordinateCount = String(frame.hiddenCoordinateCount || 0);
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-itinerary-label";
    label.textContent = "Ruta";
    const rail = document.createElement("span");
    rail.className = "andrews-route-board__map-itinerary-rail";
    if (!frame.stops.length) {
        const empty = document.createElement("span");
        empty.className = "andrews-route-board__map-itinerary-empty";
        empty.textContent = "Sin ruta";
        rail.appendChild(empty);
    }
    frame.stops.forEach((stop, index) => {
        const stopKey = stop.key || "";
        const coordinate = frame.coordinates[index] || null;
        const stopRole = index === 0
            ? "source"
            : (index === frame.stops.length - 1 ? "destination" : "transfer");
        if (index > 0) {
            const connector = document.createElement("span");
            connector.className = "andrews-route-board__map-itinerary-connector";
            connector.textContent = ">";
            rail.appendChild(connector);
        }
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-itinerary-stop";
        item.dataset.routeStopIndex = String(index + 1);
        item.dataset.routeStopRole = stopRole;
        item.dataset.stationKey = stopKey;
        item.dataset.stationCoordinate = coordinate?.coordinateLabel || "";
        if (coordinate?.coordinateLabel) {
            item.title = coordinate.coordinateLabel;
        }
        const dot = document.createElement("span");
        dot.className = "andrews-route-board__map-itinerary-dot";
        const text = document.createElement("span");
        text.className = "andrews-route-board__map-itinerary-stop-text";
        text.textContent = stop.label || stopKey;
        item.append(dot, text);
        rail.appendChild(item);
    });
    const meta = document.createElement("span");
    meta.className = "andrews-route-board__map-itinerary-meta";
    meta.textContent = [
        frame.actionLabel || "",
        frame.segmentCount === 1 ? "1 tramo" : `${frame.segmentCount || 0} tramos`,
        frame.transferCount ? `${frame.transferCount} ${frame.transferCount === 1 ? "trasbordo" : "trasbordos"}` : "",
        frame.resistanceScore ? `R${frame.resistanceScore}` : "",
    ].filter(Boolean).join(" · ");
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
        terrain: "Mapa",
    };
    return labels[String(status || "").trim()] || String(status || "").trim();
}

function getAndrewsRouteBoardMapStationDirectoryEntries(board = null, context = {}, {
    activeStationKeys = [],
    availableStationKeys = [],
    sourceStationKey = "",
    destinationStationKey = "",
    sourceLayerStationKeys = [],
} = {}) {
    const statusRank = {
        current: 1,
        destination: 2,
        route: 3,
        available: 4,
        "source-layer": 5,
        terrain: 6,
    };
    return Object.entries(ANDREWS_ROUTE_BOARD_MAP_STATIONS)
        .map(([stationKey, station]) => {
            const stationStatus = getAndrewsRouteBoardMapStationStatus(stationKey, {
                activeStationKeys,
                availableStationKeys,
                sourceStationKey,
                destinationStationKey,
                sourceLayerStationKeys,
            });
            const routeEntry = getAndrewsRouteBoardMapStationRouteEntry(stationKey, board, context?.baseBoard || null);
            const serviceRoutes = getAndrewsRouteBoardMapStationServiceRoutes(stationKey);
            return {
                stationKey,
                station,
                stationStatus,
                routeEntry,
                routeIds: getAndrewsRouteBoardMapRouteIdsFromEntry(routeEntry),
                serviceRoutes,
            };
        })
        .sort((left, right) => {
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
    const directory = document.createElement("div");
    directory.className = "andrews-route-board__map-station-directory";
    directory.dataset.mapStationDirectoryModel = "station-index-geography-coordinates";
    directory.dataset.stationCount = String(entries.length);
    directory.dataset.currentStation = board?.currentStation?.key || "";
    directory.dataset.destinationStation = board?.destinationStation?.key || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-station-directory-label";
    label.textContent = "Estaciones";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-station-directory-list";
    entries.forEach((entry) => {
        const selectable = Boolean(
            entry.stationKey
            && entry.routeEntry
            && entry.stationKey !== board?.currentStation?.key
        );
        const stationItem = document.createElement(selectable ? "button" : "span");
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
        const dot = document.createElement("span");
        dot.className = "andrews-route-board__map-station-directory-dot";
        const name = document.createElement("span");
        name.className = "andrews-route-board__map-station-directory-name";
        name.textContent = entry.station?.label || entry.stationKey;
        const service = document.createElement("span");
        service.className = "andrews-route-board__map-station-directory-service";
        (entry.serviceRoutes || []).forEach((route) => {
            const chip = document.createElement("span");
            chip.className = "andrews-route-board__map-station-directory-service-chip";
            chip.dataset.routeId = route.routeId;
            chip.dataset.routeCode = route.code;
            chip.style.backgroundColor = route.color || "rgba(67, 83, 77, 0.68)";
            chip.textContent = route.code;
            service.appendChild(chip);
        });
        const meta = document.createElement("span");
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
    return departures
        .filter((entry) => entry && typeof entry === "object")
        .slice(0, 4);
}

function getAndrewsRouteBoardMapOptionEntries(board = null, context = {}, coordinateFrames = {}) {
    const baseBoard = context?.baseBoard && typeof context.baseBoard === "object"
        ? context.baseBoard
        : null;
    const recommendedRouteIds = Array.isArray(board?.recommendedRoute?.routeIds)
        ? board.recommendedRoute.routeIds
        : [];
    const recommendedRouteKey = recommendedRouteIds.join("|");
    const selectedDestinationKey = board?.destinationStation?.key || "";
    const groups = [
        { optionSource: "visible-routes", entries: board?.visibleRoutes },
        { optionSource: "destination-options", entries: board?.destinationOptions },
        { optionSource: "departures", entries: board?.departures },
        { optionSource: "itineraries", entries: board?.itineraries },
        { optionSource: "base-destination-options", entries: baseBoard?.destinationOptions },
        { optionSource: "base-visible-routes", entries: baseBoard?.visibleRoutes },
    ];
    const seen = new Set();
    const optionEntries = [];
    groups.forEach((group) => {
        if (!Array.isArray(group.entries)) {
            return;
        }
        group.entries.forEach((entry) => {
            if (!entry || typeof entry !== "object") {
                return;
            }
            const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(entry);
            const routeKey = routeIds.join("|");
            const destinationStationKey = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
            const optionKey = [
                destinationStationKey || entry.nextSourceStageKey || entry.targetKey || entry.label || "",
                routeKey,
            ].join("::");
            if ((!destinationStationKey && !routeKey) || seen.has(optionKey)) {
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
                optionState: selected ? "selected" : (recommended ? "recommended" : "available"),
                destinationStationKey,
                destinationStationLabel: destinationStation?.label
                    || entry.label
                    || entry.targetLabel
                    || entry.nextSourceLabel
                    || entry.routeActionFrame?.targetLabel
                    || "",
                destinationCoordinate: coordinateFrame?.coordinateLabel || "",
                destinationFormulaType: coordinateFrame?.formulaType || "",
                routeIds,
                routeKey,
                routeId,
                routeCode: route?.code || "",
                routeColor: route?.color || "rgba(67, 83, 77, 0.68)",
                routePathLabel,
                routeActionLabel: getAndrewsRouteBoardMapDestinationActionLabel(entry, board, context),
                resistanceScore,
            });
        });
    });
    return optionEntries
        .sort((left, right) => {
            const stateRank = { selected: 0, recommended: 1, available: 2 };
            const leftRank = stateRank[left.optionState] ?? 3;
            const rightRank = stateRank[right.optionState] ?? 3;
            if (leftRank !== rightRank) {
                return leftRank - rightRank;
            }
            return (left.resistanceScore || 0) - (right.resistanceScore || 0);
        })
        .slice(0, 6);
}

function appendAndrewsRouteBoardMapOptions(parent, board = null, context = {}, coordinateFrames = {}) {
    const entries = getAndrewsRouteBoardMapOptionEntries(board, context, coordinateFrames);
    const options = document.createElement("div");
    options.className = "andrews-route-board__map-options";
    options.dataset.mapOptionsModel = "single-passenger-unified-option-board";
    options.dataset.optionCount = String(entries.length);
    options.dataset.currentStation = board?.currentStation?.key || "";
    options.dataset.selectedDestination = board?.destinationStation?.key || "";
    options.dataset.passengerIntention = board?.passengerFrame?.currentIntention || board?.rideFrame?.currentIntention || board?.boardState || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-options-label";
    label.textContent = "Opciones";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-option-list";
    if (!entries.length) {
        const empty = document.createElement("span");
        empty.className = "andrews-route-board__map-option-empty";
        empty.textContent = "Sin opciones";
        list.appendChild(empty);
    }
    entries.forEach((entry) => {
        const item = document.createElement("button");
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
        const code = document.createElement("span");
        code.className = "andrews-route-board__map-option-code";
        code.style.backgroundColor = entry.routeColor;
        code.textContent = entry.routeCode || "•";
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-option-main";
        main.textContent = entry.destinationStationLabel
            || entry.routePathLabel
            || entry.routeActionLabel
            || "Ruta abierta";
        const meta = document.createElement("span");
        meta.className = "andrews-route-board__map-option-meta";
        meta.textContent = [
            entry.routeActionLabel,
            entry.destinationFormulaType,
            entry.resistanceScore ? `R${entry.resistanceScore}` : "",
        ].filter(Boolean).join(" · ");
        item.title = [
            entry.routePathLabel,
            entry.destinationCoordinate,
        ].filter(Boolean).join(" · ");
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
    const departures = document.createElement("div");
    departures.className = "andrews-route-board__map-departures";
    departures.dataset.mapDeparturesModel = "station-provides-route-options";
    departures.dataset.departureCount = String(entries.length);
    departures.dataset.boardState = board?.boardState || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-departures-label";
    label.textContent = board?.boardState === "destination" ? "Trayectos" : "Salidas";
    departures.appendChild(label);
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-departure-list";
    if (!entries.length) {
        const empty = document.createElement("span");
        empty.className = "andrews-route-board__map-departure-empty";
        empty.textContent = "Sin salidas";
        list.appendChild(empty);
    }
    entries.forEach((entry) => {
        const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(entry);
        const routeId = routeIds[0] || "";
        const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId] || null;
        const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
        const actionLabel = entry.routeActionLabel
            || entry.routeActionFrame?.actionLabel
            || (board?.boardState === "destination" ? "Llegar" : "Siguiente");
        const item = document.createElement("button");
        item.type = "button";
        item.className = "andrews-route-board__map-departure";
        item.dataset.routeIds = routeIds.join("|");
        item.dataset.routeCode = route?.code || "";
        item.dataset.routePathLabel = routePathLabel;
        item.dataset.routeActionLabel = actionLabel;
        item.dataset.routeDestination = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
        item.dataset.routeResistanceScore = String(entry.resistanceScore || entry.routeTicket?.resistanceScore || 0);
        const code = document.createElement("span");
        code.className = "andrews-route-board__map-departure-code";
        code.style.backgroundColor = route?.color || "rgba(67, 83, 77, 0.68)";
        code.textContent = route?.code || "•";
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-departure-main";
        main.textContent = routePathLabel || entry.label || entry.targetLabel || "";
        const meta = document.createElement("span");
        meta.className = "andrews-route-board__map-departure-meta";
        meta.textContent = [
            actionLabel,
            item.dataset.routeResistanceScore && item.dataset.routeResistanceScore !== "0"
                ? `R${item.dataset.routeResistanceScore}`
                : "",
        ].filter(Boolean).join(" · ");
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
    const actionFrame = entry?.destinationActionFrame && typeof entry.destinationActionFrame === "object"
        ? entry.destinationActionFrame
        : (entry?.routeActionFrame && typeof entry.routeActionFrame === "object" ? entry.routeActionFrame : null);
    const recommendedKey = context?.baseBoard?.recommendedRoute?.nextSourceStageKey
        || board?.recommendedRoute?.nextSourceStageKey
        || "";
    if (stationKey && recommendedKey && stationKey === recommendedKey) {
        return actionFrame?.actionLabel || context?.baseBoard?.recommendedRoute?.actionLabel || board?.recommendedRoute?.actionLabel || "Siguiente";
    }
    return actionFrame?.actionLabel || entry?.routeActionLabel || "Explorar";
}

function getAndrewsRouteBoardMapDestinationEntries(board = null, context = {}) {
    const baseBoard = context?.baseBoard && typeof context.baseBoard === "object"
        ? context.baseBoard
        : null;
    const candidates = [];
    [
        baseBoard?.destinationOptions,
        board?.destinationOptions,
        board?.visibleRoutes,
    ].forEach((group) => {
        if (Array.isArray(group)) {
            candidates.push(...group);
        }
    });
    const seen = new Set();
    return candidates
        .filter((entry) => entry && typeof entry === "object")
        .filter((entry) => {
            const stationKey = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
            if (!stationKey || seen.has(stationKey)) {
                return false;
            }
            seen.add(stationKey);
            return true;
        })
        .slice(0, 5);
}

function appendAndrewsRouteBoardMapDestinations(parent, board = null, context = {}, coordinateFrames = {}) {
    const entries = getAndrewsRouteBoardMapDestinationEntries(board, context);
    const destinations = document.createElement("div");
    destinations.className = "andrews-route-board__map-destinations";
    destinations.dataset.mapDestinationsModel = "passenger-chooses-destination-station";
    destinations.dataset.destinationCount = String(entries.length);
    destinations.dataset.currentStation = board?.currentStation?.key || "";
    destinations.dataset.selectedDestination = board?.destinationStation?.key || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-destinations-label";
    label.textContent = "Destinos";
    destinations.appendChild(label);
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-destination-list";
    if (!entries.length) {
        const empty = document.createElement("span");
        empty.className = "andrews-route-board__map-destination-empty";
        empty.textContent = "Sin destinos";
        list.appendChild(empty);
    }
    entries.forEach((entry) => {
        const stationKey = getAndrewsRouteBoardMapEntryDestinationStationKey(entry);
        const station = ANDREWS_ROUTE_BOARD_MAP_STATIONS[stationKey] || null;
        const coordinateFrame = coordinateFrames[stationKey] || null;
        const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(entry);
        const routeId = routeIds[0] || "";
        const route = ANDREWS_ROUTE_BOARD_MAP_ROUTES[routeId] || null;
        const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
        const actionLabel = getAndrewsRouteBoardMapDestinationActionLabel(entry, board, context);
        const selected = Boolean(stationKey && stationKey === board?.destinationStation?.key);
        const item = document.createElement("button");
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
        const code = document.createElement("span");
        code.className = "andrews-route-board__map-destination-code";
        code.style.backgroundColor = route?.color || "rgba(67, 83, 77, 0.68)";
        code.textContent = route?.code || "•";
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-destination-main";
        main.textContent = item.dataset.destinationStationLabel || stationKey;
        const meta = document.createElement("span");
        meta.className = "andrews-route-board__map-destination-meta";
        meta.textContent = [
            actionLabel,
            item.dataset.routeResistanceScore && item.dataset.routeResistanceScore !== "0"
                ? `R${item.dataset.routeResistanceScore}`
                : "",
        ].filter(Boolean).join(" · ");
        item.title = [
            routePathLabel,
            coordinateFrame?.coordinateLabel || "",
        ].filter(Boolean).join(" · ");
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
    const baseBoard = context?.baseBoard && typeof context.baseBoard === "object"
        ? context.baseBoard
        : null;
    const entries = [];
    [
        board?.routeTerrain,
        board?.visibleRoutes,
        board?.destinationOptions,
        board?.departures,
        board?.itineraries,
        baseBoard?.routeTerrain,
        baseBoard?.destinationOptions,
        baseBoard?.departures,
    ].forEach((group) => {
        if (Array.isArray(group)) {
            entries.push(...group);
        }
    });
    return entries.filter((entry) => entry && typeof entry === "object");
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
        hiddenCoordinateCount: Number(
            entry?.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0
        ),
        resistanceRank: Number(entry?.resistanceRank || route?.resistanceRank || routeTicket?.resistanceRank || 0),
        standardScoreLabel: entry?.standardScoreLabel || route?.standardScoreLabel || routeTicket?.standardScoreLabel || "",
        gateDomainCounts: getAndrewsRouteBoardGateDomainCounts(entry, route, routeTicket),
    };
}

function getAndrewsRouteBoardMapRouteMetrics(board = null, context = {}) {
    const metrics = {};
    const entries = getAndrewsRouteBoardMapRouteEntries(board, context);
    const hypothesisDomains = getAndrewsRouteBoardHypothesisDomains(board?.resistanceHypothesisFrame || null);
    const leastVisibleRouteIds = Array.isArray(board?.leastVisibleRoute?.routeIds)
        ? board.leastVisibleRoute.routeIds
        : [];
    const mostVisibleRouteIds = Array.isArray(board?.mostVisibleRoute?.routeIds)
        ? board.mostVisibleRoute.routeIds
        : [];
    const leastResistanceRouteId = board?.leastResistanceRoute?.routeId || "";
    const mostResistanceRouteId = board?.mostResistanceRoute?.routeId || "";
    Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach((routeId) => {
        const routeEntry = entries
            .filter((entry) => andrewsRouteBoardMapEntryIncludesRouteId(entry, routeId))
            .sort((left, right) => {
                const leftExact = getAndrewsRouteBoardMapRouteIdsFromEntry(left).length === 1 ? 0 : 1;
                const rightExact = getAndrewsRouteBoardMapRouteIdsFromEntry(right).length === 1 ? 0 : 1;
                if (leftExact !== rightExact) {
                    return leftExact - rightExact;
                }
                return Number(left.resistanceScore || left.routeTicket?.resistanceScore || 0)
                    - Number(right.resistanceScore || right.routeTicket?.resistanceScore || 0);
            })[0] || null;
        const metric = getAndrewsRouteBoardMapEntryResistanceMetric(routeEntry);
        const gateDomainSet = new Set(metric.gateDomainCounts.map((item) => item.value));
        const hypothesisHitCount = hypothesisDomains.filter((domain) => gateDomainSet.has(domain)).length;
        const visibleResistanceRole = leastVisibleRouteIds.includes(routeId)
            ? "least"
            : (mostVisibleRouteIds.includes(routeId) ? "most" : "");
        const globalResistanceRole = routeId && routeId === leastResistanceRouteId
            ? "least"
            : (routeId && routeId === mostResistanceRouteId ? "most" : "");
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
            hypothesisHit: Boolean(hypothesisDomains.length && hypothesisHitCount === hypothesisDomains.length),
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
    const terrain = document.createElement("div");
    terrain.className = "andrews-route-board__map-terrain";
    terrain.dataset.mapTerrainModel = "resistance-topography";
    terrain.dataset.hiddenCoordinateCount = String(board?.hiddenCoordinateCount || 0);
    terrain.dataset.leastResistanceRoute = board?.leastResistanceRoute?.routeId || "";
    terrain.dataset.mostResistanceRoute = board?.mostResistanceRoute?.routeId || "";
    const hypothesis = getAndrewsRouteBoardPrimaryHypothesis(board?.resistanceHypothesisFrame || null);
    terrain.dataset.resistanceHypothesisDomains = Array.isArray(hypothesis?.domains) ? hypothesis.domains.join("+") : "";
    terrain.dataset.resistanceHypothesisPValue = hypothesis?.pValue === null || hypothesis?.pValue === undefined
        ? ""
        : String(hypothesis.pValue);
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-terrain-label";
    label.textContent = "Terreno";
    const chips = [
        `${board?.hiddenCoordinateCount || 0} coordenadas`,
        board?.leastResistanceRoute?.resistanceScore
            ? `Menor R${board.leastResistanceRoute.resistanceScore}`
            : "",
        board?.mostResistanceRoute?.resistanceScore
            ? `Mayor R${board.mostResistanceRoute.resistanceScore}`
            : "",
        terrain.dataset.resistanceHypothesisDomains
            ? getAndrewsRouteBoardHypothesisDomainLabel(hypothesis.domains)
            : "",
        terrain.dataset.resistanceHypothesisPValue
            ? `p ${formatAndrewsRouteBoardProbability(hypothesis.pValue)}`
            : "",
    ].filter(Boolean);
    const chipWrap = document.createElement("span");
    chipWrap.className = "andrews-route-board__map-terrain-chips";
    chips.forEach((text) => {
        const chip = document.createElement("span");
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
    const decisionLoad = rideFrame?.decisionLoad && typeof rideFrame.decisionLoad === "object"
        ? rideFrame.decisionLoad
        : {};
    const primaryClickCount = Number(decisionLoad.primaryClickCount || (board?.recommendedRoute ? 1 : 0));
    const averageClicks = Number(board?.averageRouteStageClicks || passengerFrame?.averageRouteStageClicks || 0);
    const maxClicks = Number(board?.maxRouteStageClicks || passengerFrame?.maxRouteStageClicks || 0);
    const service = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-service-label";
    label.textContent = "Servicio";
    const chips = [
        primaryClickCount ? `${primaryClickCount} click` : "",
        averageClicks ? `media ${averageClicks}` : "",
        maxClicks ? `max ${maxClicks}` : "",
        decisionLoad.switchingRequired === true ? "cambio manual" : "sin cambio manual",
        service.dataset.visibleTrackCount !== "0" ? `${service.dataset.visibleTrackCount} andenes` : "",
        service.dataset.destinationOptionCount !== "0" ? `${service.dataset.destinationOptionCount} destinos` : "",
    ].filter(Boolean);
    const chipWrap = document.createElement("span");
    chipWrap.className = "andrews-route-board__map-service-chips";
    chips.forEach((text) => {
        const chip = document.createElement("span");
        chip.className = "andrews-route-board__map-service-chip";
        chip.textContent = text;
        chipWrap.appendChild(chip);
    });
    service.append(label, chipWrap);
    parent.appendChild(service);
    return service;
}

function getAndrewsRouteBoardMapServiceAdvisoryFrame(board = null) {
    const hypothesisFrame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object"
        ? board.resistanceHypothesisFrame
        : null;
    const hypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
    const hypothesisDomains = getAndrewsRouteBoardHypothesisDomains(hypothesisFrame);
    const conversionPlan = board?.resistanceConversionPlan && typeof board.resistanceConversionPlan === "object"
        ? board.resistanceConversionPlan
        : null;
    const currentStation = board?.currentStation && typeof board.currentStation === "object"
        ? board.currentStation
        : null;
    const unresolvedDimensions = Array.isArray(currentStation?.inputTicketFrame?.unresolvedDimensions)
        ? currentStation.inputTicketFrame.unresolvedDimensions.map((entry) => String(entry || "").trim()).filter(Boolean)
        : (Array.isArray(currentStation?.unresolvedDimensions)
            ? currentStation.unresolvedDimensions.map((entry) => String(entry || "").trim()).filter(Boolean)
            : []);
    const visibleRoutes = Array.isArray(board?.visibleRoutes) ? board.visibleRoutes : [];
    const blockedRoutes = visibleRoutes.filter((entry) => {
        const gateStatus = String(entry?.routeActionFrame?.functionUseValenceGate?.status
            || entry?.functionUseValenceGate?.status
            || "").trim();
        return entry?.blocked === true
            || gateStatus === "blocked"
            || entry?.routeActionFrame?.generationAllowed === false
            || entry?.routeTicket?.generationAllowed === false;
    });
    const mostRoute = board?.mostVisibleRoute || board?.mostResistanceRoute || null;
    const leastRoute = board?.leastVisibleRoute || board?.leastResistanceRoute || null;
    const pValue = hypothesis?.pValue === null || hypothesis?.pValue === undefined
        ? null
        : Number(hypothesis.pValue);
    const obstacleCount = Number(mostRoute?.obstacleCount || mostRoute?.hiddenCoordinateCount || 0);
    const scoreReductionNeeded = Number(conversionPlan?.scoreReductionNeeded || 0);
    const obstacleReductionNeeded = Number(conversionPlan?.obstacleReductionNeeded || 0);
    const recommendedAction = getAndrewsRouteBoardHypothesisActionLabel(hypothesis, hypothesisFrame)
        || conversionPlan?.highResistanceDimensions?.[0]?.action
        || conversionPlan?.blockActions?.[0]?.action
        || "";
    const advisoryLevel = blockedRoutes.length
        ? "blocked"
        : (unresolvedDimensions.length
            ? "uncertain"
            : (hypothesisDomains.length || obstacleCount ? "obstacle" : "clear"));
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
        blockedRouteIds: blockedRoutes.map((entry) => entry.routeId || entry.id || "").filter(Boolean),
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
        uncertaintyCount: unresolvedDimensions.length
            + (Number.isFinite(pValue) ? 1 : 0)
            + (hypothesisFrame?.relationshipWarning ? 1 : 0),
        recommendedAction,
    };
}

function appendAndrewsRouteBoardMapServiceAdvisory(parent, board = null) {
    const frame = getAndrewsRouteBoardMapServiceAdvisoryFrame(board);
    const advisory = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-advisory-label";
    label.textContent = "Avisos";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-advisory-list";
    const entries = [
        {
            role: "obstacle",
            label: "Obstaculo",
            main: frame.hypothesisDomainLabel || (frame.obstacleCount ? "Mayor resistencia" : "sin obstaculo activo"),
            meta: [
                frame.obstacleCount ? `${frame.obstacleCount} coords` : "",
                frame.scoreReductionNeeded ? `-${frame.scoreReductionNeeded} R` : "",
                frame.obstacleReductionNeeded ? `-${frame.obstacleReductionNeeded} coords` : "",
            ].filter(Boolean).join(" · "),
        },
        {
            role: "blocked-condition",
            label: "Bloqueo",
            main: frame.blockedRouteCount
                ? `${frame.blockedRouteCount} ruta bloqueada`
                : (frame.unresolvedDimensionCount
                    ? `${frame.unresolvedDimensionCount} capa abierta`
                    : "sin bloqueo activo"),
            meta: frame.unresolvedDimensions
                .map((entry) => getAndrewsRouteBoardGateDomainLabel(entry))
                .filter(Boolean)
                .join(" + "),
        },
        {
            role: "uncertainty",
            label: "Incertidumbre",
            main: frame.pValue === null
                ? (frame.uncertaintyCount ? `${frame.uncertaintyCount} senal` : "baja")
                : `p ${formatAndrewsRouteBoardProbability(frame.pValue)}`,
            meta: frame.lowPValue ? "H0 rechazada" : (frame.hypothesisTestId || "sin prueba activa"),
        },
        {
            role: "action",
            label: "Accion",
            main: frame.recommendedAction || "mantener ruta visible",
            meta: frame.currentStationLabel || "",
        },
    ];
    entries.forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-advisory-item";
        item.dataset.serviceAdvisoryRole = entry.role;
        const role = document.createElement("span");
        role.className = "andrews-route-board__map-advisory-role";
        role.textContent = entry.label;
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-advisory-main";
        main.textContent = entry.main || "";
        item.append(role, main);
        if (entry.meta) {
            const meta = document.createElement("span");
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
    const hypothesisFrame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object"
        ? board.resistanceHypothesisFrame
        : null;
    const primaryHypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
    const pValue = primaryHypothesis?.pValue === null || primaryHypothesis?.pValue === undefined
        ? null
        : Number(primaryHypothesis.pValue);
    const alpha = Number(primaryHypothesis?.alpha || hypothesisFrame?.alpha || board?.resistanceAlpha || 0);
    const routeCoverageState = routeCount === expectedRouteCount
        ? "matched"
        : (routeCount > 0 ? "partial" : "missing");
    const coordinateCoverageState = coordinateCount >= ANDREWS_ROUTE_BOARD_MAP_APPROVAL_COORDINATE_FLOOR
        ? "andrews-floor-met"
        : (coordinateCount > 0 ? "partial" : "missing");
    const hypothesisState = primaryHypothesis?.rejectsNullHypothesis === true || primaryHypothesis?.lowPValue === true
        ? "reject-null-hypothesis"
        : (primaryHypothesis ? "retain-null-hypothesis" : "missing");
    const engineAuditState = routeCoverageState === "matched"
        && coordinateCoverageState === "andrews-floor-met"
        && hypothesisState !== "missing"
        ? "ready"
        : "incomplete";
    return {
        kind: "andrews-route-board-map-approval-frame",
        version: 1,
        approvalModel: "andrews-approval-audit-gate",
        authorityModel: "andrews-pdf-supreme-nawat-spelling-preterit-indicative",
        engineAuditState,
        approvalState: engineAuditState === "ready"
            ? "andrews-approved"
            : "missing-engine-audit",
        visualProofState: engineAuditState === "ready"
            ? "runtime-visual-proof-covered"
            : "runtime-visual-proof-required",
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
        lowPValue: primaryHypothesis?.lowPValue === true || primaryHypothesis?.rejectsNullHypothesis === true,
    };
}

function appendAndrewsRouteBoardMapApprovalGate(parent, board = null, frame = null) {
    const resolvedFrame = frame || getAndrewsRouteBoardMapApprovalFrame(board);
    const approval = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-approval-label";
    label.textContent = "Revision Andrews";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-approval-list";
    const entries = [
        {
            role: "authority",
            label: "Autoridad",
            main: "PDF > salida",
            meta: "Nawat: ortografia + preterito indicativo",
        },
        {
            role: "coverage",
            label: "Cobertura",
            main: `${resolvedFrame.routeCount}/${resolvedFrame.expectedRouteCount} rutas`,
            meta: `${resolvedFrame.coordinateCount} coords`,
        },
        {
            role: "hypothesis",
            label: "Prueba",
            main: resolvedFrame.lowPValue ? "H0 rechazada" : "H0 retenida",
            meta: resolvedFrame.pValue === null
                ? resolvedFrame.hypothesisTestId
                : `p ${formatAndrewsRouteBoardProbability(resolvedFrame.pValue)}`,
        },
        {
            role: "proof",
            label: "Salida",
            main: resolvedFrame.engineAuditState === "ready" ? "aprobada" : "auditoria incompleta",
            meta: resolvedFrame.engineAuditState === "ready" ? "mapa visible" : "prueba visual requerida",
        },
    ];
    entries.forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-approval-item";
        item.dataset.approvalRole = entry.role;
        const role = document.createElement("span");
        role.className = "andrews-route-board__map-approval-role";
        role.textContent = entry.label;
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-approval-main";
        main.textContent = entry.main || "";
        item.append(role, main);
        if (entry.meta) {
            const meta = document.createElement("span");
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
    rawInput = "",
} = {}) {
    const normalizedRouteId = String(routeId || "").trim();
    if (!normalizedRouteId || !board) {
        return false;
    }
    const visibleEntry = findAndrewsRouteBoardMapEntryForRouteId(board.visibleRoutes || [], normalizedRouteId)
        || findAndrewsRouteBoardMapEntryForRouteId(board.departures || [], normalizedRouteId)
        || findAndrewsRouteBoardMapEntryForRouteId(board.itineraries || [], normalizedRouteId);
    if (visibleEntry) {
        activateAndrewsRouteBoardTarget(visibleEntry, board);
        return true;
    }
    const destinationOption = findAndrewsRouteBoardMapEntryForRouteId(board.destinationOptions || [], normalizedRouteId)
        || findAndrewsRouteBoardMapEntryForRouteId(baseBoard?.destinationOptions || [], normalizedRouteId);
    if (!destinationOption) {
        return false;
    }
    AndrewsRouteBoardDestinationKey = destinationOption.key || destinationOption.nextSourceStageKey || "";
    AndrewsRouteBoardPinnedSourceInput = String(rawInput || "").trim();
    AndrewsRouteBoardPinnedSourceStage = sourceStage || board.currentStation || null;
    if (typeof buildAndrewsCnvCnnRouteBoard === "function") {
        const selectedBoard = buildAndrewsCnvCnnRouteBoard({
            sourceStage: sourceStage || board.currentStation || null,
            destinationStage: destinationOption.stage || null,
        });
        const selectedRoute = Array.isArray(selectedBoard.visibleRoutes)
            ? selectedBoard.visibleRoutes[0]
            : null;
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
    rawInput = "",
} = {}) {
    const normalizedStationKey = String(stationKey || "").trim();
    if (!normalizedStationKey || !board || normalizedStationKey === board.currentStation?.key) {
        return false;
    }
    const visibleEntry = findAndrewsRouteBoardMapEntryForStationKey(board.visibleRoutes || [], normalizedStationKey)
        || findAndrewsRouteBoardMapEntryForStationKey(board.departures || [], normalizedStationKey)
        || findAndrewsRouteBoardMapEntryForStationKey(board.itineraries || [], normalizedStationKey);
    if (visibleEntry) {
        activateAndrewsRouteBoardTarget(visibleEntry, board);
        return true;
    }
    const destinationOption = findAndrewsRouteBoardMapEntryForStationKey(board.destinationOptions || [], normalizedStationKey)
        || findAndrewsRouteBoardMapEntryForStationKey(baseBoard?.destinationOptions || [], normalizedStationKey);
    if (!destinationOption) {
        return false;
    }
    const routeIds = getAndrewsRouteBoardMapRouteIdsFromEntry(destinationOption);
    if (routeIds.length) {
        return activateAndrewsRouteBoardMapRoute(routeIds[0], board, {
            baseBoard,
            sourceStage,
            rawInput,
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
        element.addEventListener("keydown", (event) => {
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
    const selectable = Boolean(
        normalizedStationKey
        && destinationEntry
        && normalizedStationKey !== board?.currentStation?.key
    );
    element.dataset.stationSelectable = String(selectable);
    element.dataset.stationDestinationRouteIds = selectable
        ? getAndrewsRouteBoardMapRouteIdsFromEntry(destinationEntry).join("|")
        : "";
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
    element.addEventListener("keydown", (event) => {
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
    height = 80,
} = {}) {
    const region = createAndrewsRouteBoardSvgElement("rect", {
        class: "andrews-route-board__map-region",
        x,
        y,
        width,
        height,
        rx: 12,
        ry: 12,
    });
    region.dataset.mapRegion = id;
    svg.appendChild(region);
    const text = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-region-label",
        x: x + 14,
        y: y + 22,
    });
    text.textContent = label;
    svg.appendChild(text);
}

function appendAndrewsRouteBoardMapLabel(parent, className = "", text = "", x = 0, y = 0) {
    const label = createAndrewsRouteBoardSvgElement("text", {
        class: className,
        x,
        y,
    });
    label.textContent = text;
    parent.appendChild(label);
    return label;
}

function appendAndrewsRouteBoardMapGeographyLayer(svg) {
    const geography = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-geography",
    });
    geography.dataset.mapGeographyModel = "low-saturation-grammar-geography";
    geography.dataset.mapGeographyRegionCount = String(ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS.length);
    geography.dataset.mapGeographyGridCount = String(ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES.length);
    geography.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks";
    geography.dataset.mapDimensionLandmarkCount = String(ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS.length);
    const grid = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-geography-grid",
    });
    ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_GRID_LINES.forEach((line) => {
        const path = createAndrewsRouteBoardSvgElement("path", {
            class: "andrews-route-board__map-geography-grid-line",
            d: line.path,
        });
        path.dataset.mapGeographyGrid = line.id;
        grid.appendChild(path);
    });
    geography.appendChild(grid);
    ANDREWS_ROUTE_BOARD_MAP_GEOGRAPHY_REGIONS.forEach((region) => {
        const path = createAndrewsRouteBoardSvgElement("path", {
            class: "andrews-route-board__map-geography-region",
            d: region.path,
        });
        path.dataset.mapGeographyRegion = region.id;
        path.dataset.mapGeographyZone = region.zone;
        geography.appendChild(path);
        const label = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-geography-label",
            x: region.labelX,
            y: region.labelY,
        });
        label.dataset.mapGeographyRegion = region.id;
        label.dataset.mapGeographyZone = region.zone;
        label.textContent = region.label;
        geography.appendChild(label);
    });
    const landmarks = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-dimension-landmarks",
    });
    landmarks.dataset.mapDimensionLandmarkModel = "grammar-dimension-landmarks";
    landmarks.dataset.mapDimensionLandmarkCount = String(ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS.length);
    ANDREWS_ROUTE_BOARD_MAP_DIMENSION_LANDMARKS.forEach((entry, index) => {
        const landmark = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-dimension-landmark",
            x: entry.x,
            y: entry.y,
            "text-anchor": entry.anchor || "middle",
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
        transform: "translate(650 48)",
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
        r: 24,
    }));
    compass.appendChild(createAndrewsRouteBoardSvgElement("path", {
        class: "andrews-route-board__map-compass-axis",
        d: "M0 -17 L0 18 M-12 8 L12 8",
    }));
    compass.appendChild(createAndrewsRouteBoardSvgElement("path", {
        class: "andrews-route-board__map-compass-needle",
        d: "M0 -18 L7 6 L0 1 L-7 6Z",
    }));
    const north = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-compass-north",
        x: 0,
        y: -27,
        "text-anchor": "middle",
    });
    north.textContent = "N";
    compass.appendChild(north);
    const east = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-compass-east",
        x: 31,
        y: 5,
        "text-anchor": "start",
    });
    east.textContent = "Salida";
    compass.appendChild(east);
    const label = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-compass-label",
        x: 0,
        y: 36,
        "text-anchor": "middle",
    });
    label.textContent = "Orientacion";
    compass.appendChild(label);
    svg.appendChild(compass);
    return compass;
}

function getAndrewsRouteBoardMapRouteState(routeId = "", {
    availableRouteIds = [],
    visibleRouteIds = [],
    activeRouteIds = [],
} = {}) {
    if (Array.isArray(activeRouteIds) && activeRouteIds.includes(routeId)) {
        return "active";
    }
    if (
        (Array.isArray(availableRouteIds) && availableRouteIds.includes(routeId))
        || (Array.isArray(visibleRouteIds) && visibleRouteIds.includes(routeId))
    ) {
        return "available";
    }
    return "terrain";
}

function getAndrewsRouteBoardMapLineStationCount() {
    return Object.values(ANDREWS_ROUTE_BOARD_MAP_ROUTES)
        .reduce((total, route) => total + (Array.isArray(route?.stationKeys) ? route.stationKeys.length : 0), 0);
}

function appendAndrewsRouteBoardMapTrackBeds(svg, {
    availableRouteIds = [],
    visibleRouteIds = [],
    activeRouteIds = [],
} = {}, routeMetrics = {}) {
    const routeEntries = Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES);
    const beds = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-track-beds",
    });
    beds.dataset.mapTrackBedModel = "low-saturation-route-track-bed";
    beds.dataset.mapTrackBedCount = String(routeEntries.length);
    beds.dataset.mapTrackBedPathCount = String(routeEntries.length * 2);
    routeEntries.forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        ["outer", "inner"].forEach((trackBedLayer) => {
            const bed = createAndrewsRouteBoardSvgElement("path", {
                class: `andrews-route-board__map-track-bed andrews-route-board__map-track-bed--${trackBedLayer}`,
                d: route.path,
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
    activeRouteIds = [],
} = {}) {
    const directions = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-route-directions",
    });
    directions.dataset.mapRouteDirectionModel = "route-direction-arrows-passenger-heading";
    directions.dataset.mapRouteDirectionCount = String(Object.keys(ANDREWS_ROUTE_BOARD_MAP_ROUTES).length);
    Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        const arrowX = Number(route.arrowX || route.badgeX || 0);
        const arrowY = Number(route.arrowY || route.badgeY || 0);
        const arrowRotate = Number(route.arrowRotate || 0);
        const arrow = createAndrewsRouteBoardSvgElement("g", {
            class: "andrews-route-board__map-route-direction",
            transform: `translate(${arrowX} ${arrowY}) rotate(${arrowRotate})`,
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
            r: 8,
        }));
        arrow.appendChild(createAndrewsRouteBoardSvgElement("path", {
            class: "andrews-route-board__map-route-direction-arrow",
            d: "M-5 -5 L6 0 L-5 5Z",
            fill: route.color,
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
    activeRouteIds = [],
} = {}) {
    const markers = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-line-stations",
    });
    markers.dataset.mapLineStationModel = "station-points-on-colored-route-lines";
    markers.dataset.mapLineStationCount = String(getAndrewsRouteBoardMapLineStationCount());
    Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        (Array.isArray(route.stationKeys) ? route.stationKeys : []).forEach((stationKey) => {
            const station = ANDREWS_ROUTE_BOARD_MAP_STATIONS[stationKey];
            if (!station) {
                return;
            }
            const marker = createAndrewsRouteBoardSvgElement("circle", {
                class: "andrews-route-board__map-line-station",
                cx: station.x,
                cy: station.y,
                r: station.stationRole === "transfer" ? 10 : 8,
                stroke: route.color,
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
        class: "andrews-route-board__map-station-service",
    });
    applyAndrewsRouteBoardMapStationServiceDataset(group, serviceRoutes);
    const direction = station.x > 500 ? -1 : 1;
    const serviceY = station.y > 210 ? 10 : -13;
    serviceRoutes.forEach((route, index) => {
        const chip = createAndrewsRouteBoardSvgElement("g", {
            class: "andrews-route-board__map-station-service-chip",
            transform: `translate(${direction * (12 + (index * 12))} ${serviceY})`,
        });
        chip.dataset.routeId = route.routeId;
        chip.dataset.routeCode = route.code;
        chip.dataset.routeFamily = route.family;
        chip.appendChild(createAndrewsRouteBoardSvgElement("circle", {
            class: "andrews-route-board__map-station-service-dot",
            cx: 0,
            cy: 0,
            r: 5,
            fill: route.color || "rgba(67, 83, 77, 0.68)",
        }));
        const text = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-station-service-code",
            x: 0,
            y: 3,
            "text-anchor": "middle",
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
        class: "andrews-route-board__map-transfer-hubs",
    });
    hubs.dataset.mapTransferHubModel = "shared-station-route-interchange";
    hubs.dataset.mapTransferHubCount = String(entries.length);
    entries.forEach((entry) => {
        const hub = createAndrewsRouteBoardSvgElement("g", {
            class: "andrews-route-board__map-transfer-hub",
            transform: `translate(${entry.station.x} ${entry.station.y})`,
        });
        hub.dataset.stationKey = entry.stationKey;
        hub.dataset.stationRole = entry.station.stationRole || "";
        hub.dataset.transferKind = entry.transferKind;
        applyAndrewsRouteBoardMapStationServiceDataset(hub, entry.serviceRoutes);
        hub.appendChild(createAndrewsRouteBoardSvgElement("circle", {
            class: "andrews-route-board__map-transfer-hub-ring",
            cx: 0,
            cy: 0,
            r: entry.station.stationRole === "transfer" ? 14 : 12,
        }));
        hubs.appendChild(hub);
    });
    svg.appendChild(hubs);
    return hubs;
}

function appendAndrewsRouteBoardMapRouteTerminals(svg, {
    availableRouteIds = [],
    visibleRouteIds = [],
    activeRouteIds = [],
} = {}, routeMetrics = {}) {
    const entries = getAndrewsRouteBoardMapRouteTerminalEndpointEntries();
    const terminals = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-route-terminals",
    });
    terminals.dataset.mapRouteTerminalModel = "route-endpoints-on-map";
    terminals.dataset.mapRouteTerminalCount = String(entries.length);
    entries.forEach((entry) => {
        const routeState = getAndrewsRouteBoardMapRouteState(entry.routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        const terminal = createAndrewsRouteBoardSvgElement("g", {
            class: "andrews-route-board__map-route-terminal",
            transform: `translate(${entry.x} ${entry.y})`,
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
            fill: entry.route?.color || "rgba(67, 83, 77, 0.68)",
        }));
        const text = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-route-terminal-code",
            x: 0,
            y: 3,
            "text-anchor": "middle",
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
    activeRouteIds = [],
} = {}, routeMetrics = {}) {
    const entries = getAndrewsRouteBoardMapDestinationCalloutEntries();
    const callouts = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-destination-callouts",
    });
    callouts.dataset.mapDestinationCalloutModel = "route-destination-headsign-callouts";
    callouts.dataset.mapDestinationCalloutCount = String(entries.length);
    entries.forEach((entry) => {
        const routeState = getAndrewsRouteBoardMapRouteState(entry.routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        const callout = createAndrewsRouteBoardSvgElement("g", {
            class: "andrews-route-board__map-destination-callout",
            transform: `translate(${entry.calloutX} ${entry.calloutY})`,
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
            stroke: entry.route?.color || "rgba(67, 83, 77, 0.68)",
        });
        callout.appendChild(leader);
        callout.appendChild(createAndrewsRouteBoardSvgElement("circle", {
            class: "andrews-route-board__map-destination-callout-dot",
            cx: entry.codeX,
            cy: 0,
            r: 7,
            fill: entry.route?.color || "rgba(67, 83, 77, 0.68)",
        }));
        const code = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-destination-callout-code",
            x: entry.codeX,
            y: 3,
            "text-anchor": "middle",
        });
        code.textContent = entry.route?.code || "";
        callout.appendChild(code);
        const text = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-destination-callout-text",
            x: entry.textX,
            y: 3,
            "text-anchor": entry.calloutAnchor,
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
    const destinationStationKey = board?.destinationStation?.key
        || itinerary.destinationStation
        || routeSign.nextStationKey
        || "";
    const stops = Array.isArray(itinerary.stops) ? itinerary.stops : [];
    const currentIndex = stops.findIndex((stop) => stop.key === currentStationKey);
    const nextStop = currentIndex >= 0
        ? stops[currentIndex + 1]
        : (stops.length > 1 ? stops[1] : stops[0]);
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
    const markerX = currentStation.x + ((targetStation.x - currentStation.x) * markerRatio);
    const markerY = currentStation.y + ((targetStation.y - currentStation.y) * markerRatio);
    const angle = hasNextStation
        ? Math.atan2(targetStation.y - currentStation.y, targetStation.x - currentStation.x) * (180 / Math.PI)
        : 0;
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
        angle,
    };
}

function appendAndrewsRouteBoardMapProgressMarker(svg, board = null, coordinateFrames = {}) {
    const frame = getAndrewsRouteBoardMapProgressFrame(board, coordinateFrames);
    if (!frame) {
        return null;
    }
    const progress = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-progress",
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
    title.textContent = [
        frame.actionLabel || "Viaje",
        frame.currentStationLabel,
        frame.nextStationLabel ? `siguiente ${frame.nextStationLabel}` : "",
        frame.routeCode ? `linea ${frame.routeCode}` : "",
    ].filter(Boolean).join(" · ");
    progress.appendChild(title);
    if (frame.progressState === "en-route") {
        progress.appendChild(createAndrewsRouteBoardSvgElement("path", {
            class: "andrews-route-board__map-progress-segment",
            d: `M${frame.sourceX} ${frame.sourceY} L${frame.targetX} ${frame.targetY}`,
            stroke: frame.routeColor,
        }));
    }
    const marker = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-progress-marker",
        transform: `translate(${frame.markerX} ${frame.markerY}) rotate(${frame.angle})`,
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
        fill: frame.routeColor,
    }));
    marker.appendChild(createAndrewsRouteBoardSvgElement("circle", {
        class: "andrews-route-board__map-progress-light",
        cx: 10,
        cy: 0,
        r: 2.5,
    }));
    const code = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-progress-code",
        x: -3,
        y: 3,
        "text-anchor": "middle",
    });
    code.textContent = frame.routeCode || ">";
    marker.appendChild(code);
    progress.appendChild(marker);
    const nextLabel = createAndrewsRouteBoardSvgElement("text", {
        class: "andrews-route-board__map-progress-label",
        x: frame.markerX + 18,
        y: frame.markerY - 14,
    });
    nextLabel.textContent = frame.nextStationLabel ? `Siguiente: ${frame.nextStationLabel}` : frame.currentStationLabel;
    progress.appendChild(nextLabel);
    svg.appendChild(progress);
    return progress;
}

function appendAndrewsRouteBoardMapTransfers(parent) {
    const entries = getAndrewsRouteBoardMapTransferEntries();
    const transfers = document.createElement("div");
    transfers.className = "andrews-route-board__map-transfers";
    transfers.dataset.mapTransferModel = "shared-station-transfer-options";
    transfers.dataset.transferStationCount = String(entries.length);
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-transfers-label";
    label.textContent = "Trasbordos";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-transfer-list";
    entries.forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-transfer";
        item.dataset.stationKey = entry.stationKey;
        item.dataset.transferKind = entry.transferKind;
        applyAndrewsRouteBoardMapStationServiceDataset(item, entry.serviceRoutes);
        const name = document.createElement("span");
        name.className = "andrews-route-board__map-transfer-name";
        name.textContent = entry.station.label || entry.stationKey;
        const services = document.createElement("span");
        services.className = "andrews-route-board__map-transfer-services";
        entry.serviceRoutes.forEach((route) => {
            const chip = document.createElement("span");
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
    const terminals = document.createElement("div");
    terminals.className = "andrews-route-board__map-terminals";
    terminals.dataset.mapTerminalBoardModel = "route-terminal-service-board";
    terminals.dataset.terminalRouteCount = String(entries.length);
    terminals.dataset.terminalRouteCodes = entries.map((entry) => entry.route?.code || "").filter(Boolean).join("|");
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-terminals-label";
    label.textContent = "Lineas";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-terminal-list";
    const availableRouteIds = Array.isArray(mapState.availableRouteIds)
        ? mapState.availableRouteIds
        : getAndrewsRouteBoardMapRouteIds(board, "available");
    const visibleRouteIds = Array.isArray(mapState.visibleRouteIds)
        ? mapState.visibleRouteIds
        : getAndrewsRouteBoardMapRouteIds(board, "visible");
    const activeRouteIds = Array.isArray(mapState.activeRouteIds)
        ? mapState.activeRouteIds
        : getAndrewsRouteBoardMapRouteIds(board, "active");
    const routeMetrics = mapState.routeMetrics || getAndrewsRouteBoardMapRouteMetrics(board, context);
    entries.forEach((entry) => {
        const routeState = getAndrewsRouteBoardMapRouteState(entry.routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        const item = document.createElement(routeState === "terrain" ? "span" : "button");
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
        const code = document.createElement("span");
        code.className = "andrews-route-board__map-terminal-code";
        code.style.backgroundColor = entry.route?.color || "rgba(67, 83, 77, 0.68)";
        code.textContent = entry.route?.code || "";
        const main = document.createElement("span");
        main.className = "andrews-route-board__map-terminal-main";
        main.textContent = `${entry.sourceLabel} > ${entry.destinationLabel}`;
        const meta = document.createElement("span");
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
    const key = document.createElement("div");
    key.className = "andrews-route-board__map-symbol-key";
    key.dataset.mapSymbolKeyModel = "station-symbol-map-key";
    key.dataset.mapSymbolKeyCount = String(ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES.length);
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-symbol-key-label";
    label.textContent = "Clave";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-symbol-key-list";
    ANDREWS_ROUTE_BOARD_MAP_SYMBOL_KEY_ENTRIES.forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-symbol-key-item";
        item.dataset.mapSymbolKeyId = entry.id;
        item.dataset.mapSymbolKind = entry.symbolKind;
        const icon = document.createElement("span");
        icon.className = "andrews-route-board__map-symbol-key-icon";
        icon.dataset.mapSymbolKind = entry.symbolKind;
        icon.textContent = entry.symbolText || "";
        const text = document.createElement("span");
        text.className = "andrews-route-board__map-symbol-key-text";
        const name = document.createElement("span");
        name.className = "andrews-route-board__map-symbol-key-name";
        name.textContent = entry.label;
        const meta = document.createElement("span");
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
    const stack = document.createElement("div");
    stack.className = "andrews-route-board__map-layer-stack";
    stack.dataset.mapLayerStackModel = "grammar-gis-visible-layer-stack";
    stack.dataset.mapLayerCount = String(ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.length);
    stack.dataset.mapLayerIds = ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.map((entry) => entry.id).join("|");
    stack.dataset.mapEngineModel = "layered-grammar-gis";
    stack.dataset.mapInterfaceModel = "transit-map-surface";
    stack.dataset.mapRoutePlannerModel = "passenger-route-planner";
    stack.dataset.currentStation = board?.currentStation?.key || "";
    stack.dataset.destinationStation = board?.destinationStation?.key || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-layer-stack-label";
    label.textContent = "Capas mapa";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-layer-stack-list";
    ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.forEach((entry, index) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-layer";
        item.dataset.mapLayerId = entry.id;
        item.dataset.mapLayerIndex = String(index + 1);
        item.dataset.mapLayerModel = entry.model;
        item.dataset.mapLayerRole = entry.role;
        item.dataset.mapLayerState = "visible";
        const name = document.createElement("span");
        name.className = "andrews-route-board__map-layer-name";
        name.textContent = entry.label;
        const role = document.createElement("span");
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
    const corridors = document.createElement("div");
    corridors.className = "andrews-route-board__map-corridors";
    corridors.dataset.mapCorridorModel = "route-family-corridors";
    corridors.dataset.mapCorridorCount = String(entries.length);
    const label = document.createElement("span");
    label.className = "andrews-route-board__map-corridors-label";
    label.textContent = "Corredores";
    const list = document.createElement("div");
    list.className = "andrews-route-board__map-corridor-list";
    entries.forEach((entry) => {
        const item = document.createElement("span");
        item.className = "andrews-route-board__map-corridor";
        item.dataset.routeFamily = entry.family;
        item.dataset.routeFamilyRouteCount = String(entry.routes.length);
        item.dataset.routeFamilyRouteCodes = entry.routes.map((route) => route.code).filter(Boolean).join("|");
        const services = document.createElement("span");
        services.className = "andrews-route-board__map-corridor-services";
        entry.routes.forEach((route) => {
            const chip = document.createElement("span");
            chip.className = "andrews-route-board__map-corridor-service-chip";
            chip.dataset.routeId = route.routeId;
            chip.dataset.routeCode = route.code;
            chip.style.backgroundColor = route.color || "rgba(67, 83, 77, 0.68)";
            chip.textContent = route.code;
            services.appendChild(chip);
        });
        const text = document.createElement("span");
        text.className = "andrews-route-board__map-corridor-text";
        const name = document.createElement("span");
        name.className = "andrews-route-board__map-corridor-name";
        name.textContent = entry.label;
        const meta = document.createElement("span");
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
    const activeStationKeys = getAndrewsRouteBoardMapStationKeysForRoutes(
        activeRouteIds.length ? activeRouteIds : visibleRouteIds
    );
    const availableStationKeys = getAndrewsRouteBoardMapStationKeysForRoutes(availableRouteIds);
    const sourceStationKey = board.currentStation?.key || "";
    const destinationStationKey = board.destinationStation?.key || "";
    const sourceLayerStationKeys = Array.isArray(board.sourceCandidateStageKeys)
        ? board.sourceCandidateStageKeys
        : [];
    const approvalFrame = getAndrewsRouteBoardMapApprovalFrame(board);
    const map = document.createElement("div");
    map.className = "andrews-route-board__map";
    map.dataset.mapModel = "andrews-geography-route-lines";
    map.dataset.mapEngineModel = "layered-grammar-gis";
    map.dataset.mapInterfaceModel = "transit-map-surface";
    map.dataset.mapRoutePlannerModel = "passenger-route-planner";
    map.dataset.mapTerrain = "formula-boundary-stem-rank-route-slots-function-use";
    map.dataset.mapDimensionModel = "inter-dimensional-positioning-system";
    map.dataset.mapDimensionOrder = ANDREWS_ROUTE_BOARD_MAP_DIMENSIONS.map((entry) => entry.id).join("|");
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
    map.dataset.mapLayerIds = ANDREWS_ROUTE_BOARD_MAP_LAYER_STACK.map((entry) => entry.id).join("|");
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
    map.dataset.mapResistanceHypothesisDomains = getAndrewsRouteBoardHypothesisDomains(
        board.resistanceHypothesisFrame || null
    ).join("+");
    const label = document.createElement("div");
    label.className = "andrews-route-board__map-label";
    const labelMain = document.createElement("span");
    labelMain.textContent = "Mapa Andrews";
    const labelMeta = document.createElement("span");
    labelMeta.textContent = `${board.hiddenCoordinateCount || 0} coordenadas en la geografia`;
    label.append(labelMain, labelMeta);
    const viewport = document.createElement("div");
    viewport.className = "andrews-route-board__map-viewport";
    const svg = createAndrewsRouteBoardSvgElement("svg", {
        class: "andrews-route-board__map-svg",
        viewBox: "0 0 720 300",
        role: "img",
        "aria-label": "Mapa de rutas CNV y CNN",
        focusable: "false",
    });
    appendAndrewsRouteBoardMapGeographyLayer(svg);
    appendAndrewsRouteBoardMapRegion(svg, {
        id: "cnv",
        label: "CNV TERRITORIO",
        x: 24,
        y: 24,
        width: 548,
        height: 132,
    });
    appendAndrewsRouteBoardMapRegion(svg, {
        id: "cnn",
        label: "CNN TERRITORIO",
        x: 126,
        y: 174,
        width: 558,
        height: 94,
    });
    const transfer = createAndrewsRouteBoardSvgElement("path", {
        class: "andrews-route-board__map-transfer-zone",
        d: "M198 154 C286 136 372 152 456 176 C398 205 326 218 224 220 C204 196 196 176 198 154Z",
    });
    svg.appendChild(transfer);
    appendAndrewsRouteBoardMapLabel(svg, "andrews-route-board__map-region-label andrews-route-board__map-region-label--transfer", "TRANSFERENCIA", 282, 172);
    const contourGroup = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-contours",
    });
    ["M56 44 C210 22 390 34 534 54", "M72 252 C220 274 420 272 662 246", "M54 120 C176 156 312 160 520 130"].forEach((pathData) => {
        contourGroup.appendChild(createAndrewsRouteBoardSvgElement("path", {
            class: "andrews-route-board__map-contour",
            d: pathData,
        }));
    });
    svg.appendChild(contourGroup);
    appendAndrewsRouteBoardMapTrackBeds(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds,
    }, routeMetrics);
    const lines = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-lines",
    });
    Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        const line = createAndrewsRouteBoardSvgElement("path", {
            class: "andrews-route-board__map-line",
            d: route.path,
            stroke: route.color,
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
        activeRouteIds,
    });
    appendAndrewsRouteBoardMapLineStations(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds,
    });
    appendAndrewsRouteBoardMapTransferHubs(svg);
    const badges = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-route-badges",
    });
    Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        const badge = createAndrewsRouteBoardSvgElement("g", {
            class: "andrews-route-board__map-route-badge",
            transform: `translate(${route.badgeX || 0} ${route.badgeY || 0})`,
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
            fill: route.color,
        }));
        const badgeText = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-route-badge-text",
            x: 0,
            y: 4,
            "text-anchor": "middle",
        });
        badgeText.textContent = route.code;
        badge.appendChild(badgeText);
        badges.appendChild(badge);
    });
    svg.appendChild(badges);
    appendAndrewsRouteBoardMapRouteTerminals(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds,
    }, routeMetrics);
    appendAndrewsRouteBoardMapDestinationCallouts(svg, {
        availableRouteIds,
        visibleRouteIds,
        activeRouteIds,
    }, routeMetrics);
    const stations = createAndrewsRouteBoardSvgElement("g", {
        class: "andrews-route-board__map-stations",
    });
    const stationCoordinateFrames = {};
    Object.entries(ANDREWS_ROUTE_BOARD_MAP_STATIONS).forEach(([stationKey, station]) => {
        const stationStatus = getAndrewsRouteBoardMapStationStatus(stationKey, {
            activeStationKeys,
            availableStationKeys,
            sourceStationKey,
            destinationStationKey,
            sourceLayerStationKeys,
        });
        const stationCoordinateFrame = getAndrewsRouteBoardMapStationCoordinateFrame(stationKey, station, stationStatus);
        const stationLabelPlacement = getAndrewsRouteBoardMapStationLabelPlacement(station);
        stationCoordinateFrames[stationKey] = stationCoordinateFrame;
        const group = createAndrewsRouteBoardSvgElement("g", {
            class: "andrews-route-board__map-station",
            transform: `translate(${station.x} ${station.y})`,
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
            r: station.stationRole === "transfer" ? 18 : 16,
        }));
        group.appendChild(createAndrewsRouteBoardSvgElement("circle", {
            class: "andrews-route-board__map-station-dot",
            cx: 0,
            cy: 0,
            r: station.stationRole === "transfer" ? 8 : 6,
        }));
        const stationLabel = createAndrewsRouteBoardSvgElement("text", {
            class: "andrews-route-board__map-station-label",
            x: stationLabelPlacement.labelDx,
            y: stationLabelPlacement.labelDy,
            "text-anchor": stationLabelPlacement.labelAnchor,
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
                "text-anchor": stationLabelPlacement.labelAnchor,
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
    const legend = document.createElement("div");
    legend.className = "andrews-route-board__map-legend";
    Object.entries(ANDREWS_ROUTE_BOARD_MAP_ROUTES).forEach(([routeId, route]) => {
        const routeState = getAndrewsRouteBoardMapRouteState(routeId, {
            availableRouteIds,
            visibleRouteIds,
            activeRouteIds,
        });
        const item = document.createElement(routeState === "terrain" ? "span" : "button");
        item.className = "andrews-route-board__map-legend-item";
        item.dataset.routeId = routeId;
        item.dataset.routeFamily = route.family;
        item.dataset.routeMapState = routeState;
        applyAndrewsRouteBoardMapRouteMetricDataset(item, routeMetrics[routeId]);
        if (item.tagName === "BUTTON") {
            item.type = "button";
        }
        const swatch = document.createElement("span");
        swatch.className = "andrews-route-board__map-legend-swatch";
        swatch.style.backgroundColor = route.color;
        const text = document.createElement("span");
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
        routeMetrics,
    });
    appendAndrewsRouteBoardMapSymbolKey(map);
    appendAndrewsRouteBoardMapLayerStack(map, board);
    appendAndrewsRouteBoardMapCorridors(map);
    appendAndrewsRouteBoardMapStationDirectory(map, board, context, stationCoordinateFrames, {
        activeStationKeys,
        availableStationKeys,
        sourceStationKey,
        destinationStationKey,
        sourceLayerStationKeys,
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
        empty: "Entrada abierta",
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
        open: "abierta",
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
        "route-gate": "Ruta",
    };
    return labels[normalized] || normalized;
}

function getAndrewsRouteBoardHypothesisDomainLabel(domains = []) {
    const items = Array.isArray(domains) ? domains : [domains];
    return items
        .map((entry) => getAndrewsRouteBoardGateDomainLabel(entry))
        .filter(Boolean)
        .join(" + ");
}

function getAndrewsRouteBoardPrimaryHypothesis(frame = null) {
    return frame?.primaryCandidateObstacle
        || frame?.primaryTest
        || frame?.highResistanceGateTest
        || null;
}

function getAndrewsRouteBoardHypothesisDomains(frame = null) {
    const primary = getAndrewsRouteBoardPrimaryHypothesis(frame);
    return Array.isArray(primary?.domains)
        ? primary.domains.map((entry) => String(entry || "").trim()).filter(Boolean)
        : [];
}

function getAndrewsRouteBoardHypothesisActionLabel(entry = null, frame = null) {
    const key = String(entry?.key || frame?.primaryCandidateObstacle?.key || "").trim();
    const direction = String(entry?.direction || "").trim();
    const action = String(entry?.action || frame?.recommendedAction || "").trim();
    const labels = {
        "candidate-obstacle:formula-boundary+function-use": "Separar frontera y funcion antes de expandir la ruta.",
        "function-use": "Resolver funcion despues de fijar frontera y ruta.",
        "operation-suffix": "Mantener operacion y sufijo temprano.",
        "source-evidence+operation-suffix": "Unir evidencia de fuente con operacion antes de superficie.",
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
    const counts = Array.isArray(entry?.gateDomainCounts) && entry.gateDomainCounts.length
        ? entry.gateDomainCounts
        : (Array.isArray(routeTicket?.gateDomainCounts) && routeTicket.gateDomainCounts.length
            ? routeTicket.gateDomainCounts
            : (Array.isArray(route?.gateDomainCounts) ? route.gateDomainCounts : []));
    return counts
        .map((item) => ({
            value: String(item?.value || "").trim(),
            count: Number(item?.count || 0),
        }))
        .filter((item) => item.value && item.count > 0);
}

function serializeAndrewsRouteBoardGateDomains(gateDomainCounts = []) {
    return (Array.isArray(gateDomainCounts) ? gateDomainCounts : [])
        .map((item) => `${item.value}:${Number(item.count || 0)}`)
        .join("|");
}

function getAndrewsRouteBoardTicketDimensionStatusLabel(status = "") {
    const normalized = String(status || "").trim();
    const labels = {
        positioned: "puesta",
        open: "abierta",
        "source-positioned": "origen",
        given: "dada",
        deferred: "ruta",
        "deferred-last": "final",
    };
    return labels[normalized] || normalized;
}

function getAndrewsRouteBoardSourceLayerRoleLabel(role = "") {
    const normalized = String(role || "").trim();
    const labels = {
        "received-source": "recibida",
        "contained-verbal-core": "nucleo",
        "contained-verbstem": "tronco",
    };
    return labels[normalized] || normalized;
}

function serializeAndrewsRouteBoardTicketDimensions(dimensionSlots = []) {
    return (Array.isArray(dimensionSlots) ? dimensionSlots : [])
        .map((entry) => [
            entry.id || "",
            entry.status || "",
            entry.value || "",
        ].map((part) => String(part || "").replace(/[|:]/g, "")).join(":"))
        .join("|");
}

function serializeAndrewsRouteBoardSourceLayers(stages = []) {
    return (Array.isArray(stages) ? stages : [])
        .map((entry) => [
            entry.key || "",
            entry.sourceRole || "",
            entry.formulaType || "",
            entry.formulaPosition || "",
            entry.stemRank || "",
        ].map((part) => String(part || "").replace(/[|:]/g, "")).join(":"))
        .join("|");
}

function cloneAndrewsRouteBoardSourceLayerFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return null;
    }
    return {
        ...frame,
        passengerEvents: Array.isArray(frame.passengerEvents)
            ? frame.passengerEvents.slice()
            : [],
        layers: Array.isArray(frame.layers)
            ? frame.layers.map((entry) => ({ ...entry }))
            : [],
    };
}

function serializeAndrewsRouteBoardStationLineStops(stops = []) {
    return (Array.isArray(stops) ? stops : [])
        .map((entry) => [
            entry.id || "",
            entry.status || "",
            entry.stationKey || "",
        ].map((part) => String(part || "").replace(/[|:]/g, "")).join(":"))
        .join("|");
}

function serializeAndrewsRouteBoardConcourseStops(stops = []) {
    return (Array.isArray(stops) ? stops : [])
        .map((entry) => [
            entry.id || "",
            entry.status || "",
            entry.stationKey || "",
        ].map((part) => String(part || "").replace(/[|:]/g, "")).join(":"))
        .join("|");
}

function serializeAndrewsRouteBoardPlatformTracks(tracks = []) {
    return (Array.isArray(tracks) ? tracks : [])
        .map((entry) => [
            entry.id || "",
            entry.recommendationRole || "",
            entry.sourceKey || "",
            entry.destinationKey || "",
            Array.isArray(entry.routeIds) ? entry.routeIds.join("+") : "",
        ].map((part) => String(part || "").replace(/[|:]/g, "")).join(":"))
        .join("|");
}

function serializeAndrewsRouteBoardIntentions(intentionFrame = null) {
    const intentions = Array.isArray(intentionFrame?.intentions)
        ? intentionFrame.intentions
        : [];
    return intentions
        .map((entry) => [
            entry.id || "",
            entry.selected ? "selected" : "open",
            Number(entry.optionCount || 0),
            Number(entry.routeCount || 0),
        ].map((part) => String(part || "").replace(/[|:]/g, "")).join(":"))
        .join("|");
}

function cloneAndrewsRouteBoardIntentionFrame(intentionFrame = null) {
    if (!intentionFrame || typeof intentionFrame !== "object") {
        return null;
    }
    return {
        ...intentionFrame,
        intentions: Array.isArray(intentionFrame.intentions)
            ? intentionFrame.intentions.map((entry) => ({ ...entry }))
            : [],
        passengerEvents: Array.isArray(intentionFrame.passengerEvents)
            ? intentionFrame.passengerEvents.slice()
            : [],
    };
}

function cloneAndrewsRouteBoardConcourseFrame(concourseFrame = null) {
    if (!concourseFrame || typeof concourseFrame !== "object") {
        return null;
    }
    return {
        ...concourseFrame,
        routeIds: Array.isArray(concourseFrame.routeIds) ? concourseFrame.routeIds.slice() : [],
        stops: Array.isArray(concourseFrame.stops)
            ? concourseFrame.stops.map((entry) => ({ ...entry }))
            : [],
        passengerEvents: Array.isArray(concourseFrame.passengerEvents)
            ? concourseFrame.passengerEvents.slice()
            : [],
    };
}

function cloneAndrewsRouteBoardPlatformFrame(platformFrame = null) {
    if (!platformFrame || typeof platformFrame !== "object") {
        return null;
    }
    return {
        ...platformFrame,
        recommendedRouteIds: Array.isArray(platformFrame.recommendedRouteIds)
            ? platformFrame.recommendedRouteIds.slice()
            : [],
        tracks: Array.isArray(platformFrame.tracks)
            ? platformFrame.tracks.map((entry) => ({
                ...entry,
                routeIds: Array.isArray(entry.routeIds) ? entry.routeIds.slice() : [],
            }))
            : [],
        passengerEvents: Array.isArray(platformFrame.passengerEvents)
            ? platformFrame.passengerEvents.slice()
            : [],
    };
}

function cloneAndrewsRouteBoardRideFrame(rideFrame = null) {
    if (!rideFrame || typeof rideFrame !== "object") {
        return null;
    }
    return {
        ...rideFrame,
        progressStops: Array.isArray(rideFrame.progressStops)
            ? rideFrame.progressStops.map((entry) => ({ ...entry }))
            : [],
        decisionLoad: rideFrame.decisionLoad && typeof rideFrame.decisionLoad === "object"
            ? { ...rideFrame.decisionLoad }
            : null,
        passengerEvents: Array.isArray(rideFrame.passengerEvents)
            ? rideFrame.passengerEvents.slice()
            : [],
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
    routeActionFrame = null,
} = {}) {
    const boardRideFrame = cloneAndrewsRouteBoardRideFrame(board?.rideFrame);
    const stops = Array.isArray(stationLineFrame?.stops)
        ? stationLineFrame.stops.map((entry, index) => ({
            id: entry?.id || "",
            block: entry?.block || "",
            label: entry?.label || entry?.block || entry?.id || "",
            role: entry?.role || "",
            status: entry?.status || "",
            stationKey: entry?.stationKey || "",
            displayLabel: entry?.displayLabel || "",
            active: Boolean(entry?.id && entry.id === stationLineFrame.activeStopId),
            index: index + 1,
        }))
        : (Array.isArray(boardRideFrame?.progressStops) ? boardRideFrame.progressStops : []);
    const activeStopIndex = stops.find((entry) => entry.active)?.index || Number(boardRideFrame?.activeStopIndex || 0);
    const passengerEvents = Array.from(new Set([
        ...(Array.isArray(boardRideFrame?.passengerEvents) ? boardRideFrame.passengerEvents : []),
        "carry-ride-frame-to-output",
    ]));
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
            ...(boardRideFrame?.decisionLoad && typeof boardRideFrame.decisionLoad === "object"
                ? boardRideFrame.decisionLoad
                : {}),
            primaryClickCount: routePathLabel ? 1 : 0,
            switchingRequired: false,
        },
        passengerEvents,
    };
}

function getAndrewsRouteBoardActionMode(targetAction = null) {
    const mode = String(targetAction?.unitMode || "").trim();
    if (typeof TENSE_MODE !== "undefined") {
        if (mode === "sustantivo" && TENSE_MODE.sustantivo) {
            return TENSE_MODE.sustantivo;
        }
        if (mode === "verbo" && TENSE_MODE.verbo) {
            return TENSE_MODE.verbo;
        }
    }
    return mode;
}

function restoreAndrewsRouteBoardInputIfBlank(inputValue = "") {
    const value = String(inputValue || "").trim();
    const verbEl = document.getElementById("verb");
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
    actionLabel = "",
} = {}) {
    const boardLine = board?.stationLineFrame && typeof board.stationLineFrame === "object"
        ? board.stationLineFrame
        : (board?.passengerFrame?.stationLineFrame && typeof board.passengerFrame.stationLineFrame === "object"
            ? board.passengerFrame.stationLineFrame
            : null);
    const sourceStop = {
        id: "entrada",
        block: "#1 Entrada",
        label: "Entrada",
        role: "source-input",
        status: "positioned",
        stationKey: sourceKey,
        displayLabel: sourceLabel,
    };
    const formulaStop = {
        id: "formula",
        block: "#2 Fórmula",
        label: "Formula",
        role: "route-board",
        status: "positioned",
        stationKey: sourceKey,
        displayLabel: sourceLabel,
    };
    const outputStop = {
        id: "salida",
        block: "#3 Salida",
        label: "Salida",
        role: "output",
        status: "destination-set",
        stationKey: destinationKey,
        displayLabel: destinationLabel,
    };
    const stops = Array.isArray(boardLine?.stops) && boardLine.stops.length
        ? boardLine.stops.map((entry) => {
            if (entry.id === "salida") {
                return { ...outputStop, ...entry, ...outputStop };
            }
            if (entry.id === "formula") {
                return { ...formulaStop, ...entry, status: "positioned", stationKey: sourceKey, displayLabel: sourceLabel };
            }
            if (entry.id === "entrada") {
                return {
                    ...sourceStop,
                    ...entry,
                    status: entry.status === "open" ? "open" : "received",
                    stationKey: sourceKey,
                    displayLabel: entry.displayLabel || sourceLabel,
                };
            }
            return { ...entry };
        })
        : [sourceStop, formulaStop, outputStop];
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
        passengerEvents: [
            ...(Array.isArray(boardLine?.passengerEvents) ? boardLine.passengerEvents : []),
            "carry-station-line-to-output",
            "mark-output-arrival",
        ],
    };
}

function buildAndrewsRouteBoardJourneySourceLayerFrame({
    board = null,
    sourceKey = "",
    sourceLabel = "",
} = {}) {
    const candidateStages = Array.isArray(board?.sourceCandidateStages)
        ? board.sourceCandidateStages
        : [];
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
            active: Boolean(sourceKey && key === sourceKey),
        };
    });
    const activeLayer = layers.find((entry) => entry.active) || null;
    if (!activeLayer && sourceKey) {
        layers.push({
            index: layers.length + 1,
            key: sourceKey,
            label: sourceLabel || sourceKey,
            sourceRole: "route-source",
            formulaType: "",
            formulaPosition: "",
            stemRank: "",
            active: true,
        });
    }
    const resolvedActiveLayer = layers.find((entry) => entry.active) || layers[0] || null;
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
        passengerEvents: [
            "carry-source-layers-to-output",
            "surface-receives-source-layer",
        ],
    };
}

function buildAndrewsRouteBoardJourneyReceipt(entry = null, board = null) {
    if (!entry || !board) {
        return null;
    }
    const route = Array.isArray(entry.routes) ? entry.routes[0] : entry;
    const lastRoute = Array.isArray(entry.routes) && entry.routes.length
        ? entry.routes[entry.routes.length - 1]
        : route;
    const routeTicket = entry.routeTicket || route?.routeTicket || null;
    const routeIds = Array.isArray(entry.routeIds) ? entry.routeIds : [entry.routeId || ""].filter(Boolean);
    const routeStops = getAndrewsRouteBoardRouteStops(entry, route, routeTicket);
    const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry)
        || routeTicket?.routePathLabel
        || routeStops.map((stop) => stop.label || stop.key).filter(Boolean).join(" > ");
    const routeConditionFrames = getAndrewsRouteBoardRouteConditionFrames(entry, route, routeTicket);
    const sourceKey = entry.sourceStageKey
        || route?.sourceStageKey
        || routeConditionFrames[0]?.sourceKey
        || routeConditionFrames[0]?.ifStage?.key
        || routeStops[0]?.key
        || board.currentStation?.key
        || "";
    const sourceLabel = entry.sourceLabel
        || route?.sourceLabel
        || routeConditionFrames[0]?.ifStage?.label
        || routeStops[0]?.label
        || board.currentStation?.label
        || "";
    const destinationKey = board.destinationStation?.key
        || entry.targetAction?.targetStageKey
        || lastRoute?.targetAction?.targetStageKey
        || entry.targetStageKey
        || lastRoute?.targetStageKey
        || "";
    const destinationLabel = board.destinationStation?.label || entry.targetLabel || lastRoute?.targetLabel || "";
    if (!sourceKey || !destinationKey || !routeIds.length) {
        return null;
    }
    const segmentCount = Number(entry.segmentCount || route?.segmentCount || routeTicket?.segmentCount || 1);
    const resistanceScore = Number(entry.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || 0);
    const hiddenCoordinateCount = Number(
        entry.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0
    );
    const obstacleCount = Number(entry.obstacleCount || route?.obstacleCount || routeTicket?.obstacleCount || 0);
    const routeKey = routeIds.join("|");
    const leastVisibleRouteKey = Array.isArray(board.leastVisibleRoute?.routeIds)
        ? board.leastVisibleRoute.routeIds.join("|")
        : "";
    const mostVisibleRouteKey = Array.isArray(board.mostVisibleRoute?.routeIds)
        ? board.mostVisibleRoute.routeIds.join("|")
        : "";
    const resistanceRole = routeKey && routeKey === leastVisibleRouteKey
        ? "least"
        : (routeKey && routeKey === mostVisibleRouteKey ? "most" : "");
    const targetAction = entry.targetAction || lastRoute?.targetAction || route?.targetAction || null;
    const nextSourceStage = entry.nextSourceStage
        || entry.routeTicket?.nextSourceStage
        || lastRoute?.nextSourceStage
        || lastRoute?.routeTicket?.nextSourceStage
        || board.destinationStation
        || entry.targetStage
        || lastRoute?.targetStage
        || route?.targetStage
        || null;
    const routeActionFrame = entry.routeActionFrame && typeof entry.routeActionFrame === "object"
        ? entry.routeActionFrame
        : (lastRoute?.routeActionFrame && typeof lastRoute.routeActionFrame === "object"
            ? lastRoute.routeActionFrame
            : (route?.routeActionFrame && typeof route.routeActionFrame === "object" ? route.routeActionFrame : null));
    const boardPassengerFrame = board.passengerFrame && typeof board.passengerFrame === "object"
        ? board.passengerFrame
        : {};
    const passengerEvents = Array.from(new Set([
        ...(Array.isArray(boardPassengerFrame.passengerEvents) ? boardPassengerFrame.passengerEvents : []),
        "carry-route-frame-to-output",
        "carry-route-conditions-to-output",
        "surface-receives-next-source",
        "carry-station-line-to-output",
        "carry-concourse-to-output",
        "carry-platform-to-output",
        "carry-ride-frame-to-output",
        "carry-source-layers-to-output",
    ]));
    const journeyStationLineFrame = buildAndrewsRouteBoardJourneyStationLineFrame({
        board,
        sourceKey,
        sourceLabel,
        destinationKey,
        destinationLabel,
        routeIds,
        actionLabel: routeActionFrame?.actionLabel || "",
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
        passengerEvents,
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
        routeActionFrame,
    });
    const journeySourceLayerFrame = buildAndrewsRouteBoardJourneySourceLayerFrame({
        board,
        sourceKey,
        sourceLabel,
    });
    return {
        sourceKey,
        sourceLabel,
        destinationKey,
        destinationLabel,
        routePathLabel,
        nextSourceKey: destinationKey,
        nextSourceLabel: destinationLabel,
        nextSourceStage: nextSourceStage && typeof nextSourceStage === "object"
            ? {
                formulaType: nextSourceStage.formulaType || "",
                formulaPosition: nextSourceStage.formulaPosition || "",
                stemRank: nextSourceStage.stemRank || "",
                inputKind: "route-arrival",
                inputScope: "next-source",
                formulaBoundaryKind: "route-arrival",
                formulaBoundaryConfidence: "positioned",
            }
            : null,
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
        routeActionFrame: routeActionFrame ? { ...routeActionFrame } : null,
        stationLineFrame: journeyStationLineFrame,
        passengerFrame: journeyPassengerFrame,
        concourseFrame: journeyConcourseFrame,
        platformFrame: journeyPlatformFrame,
        rideFrame: journeyRideFrame,
        sourceLayerFrame: journeySourceLayerFrame,
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
        inputTicketFrame: board.currentStation.inputTicketFrame && typeof board.currentStation.inputTicketFrame === "object"
            ? {
                ...board.currentStation.inputTicketFrame,
                unresolvedDimensions: Array.isArray(board.currentStation.inputTicketFrame.unresolvedDimensions)
                    ? board.currentStation.inputTicketFrame.unresolvedDimensions.slice()
                    : [],
                dimensionOrder: Array.isArray(board.currentStation.inputTicketFrame.dimensionOrder)
                    ? board.currentStation.inputTicketFrame.dimensionOrder.slice()
                    : [],
                dimensionSlots: Array.isArray(board.currentStation.inputTicketFrame.dimensionSlots)
                    ? board.currentStation.inputTicketFrame.dimensionSlots.map((entry) => ({ ...entry }))
                    : [],
                passengerEvents: Array.isArray(board.currentStation.inputTicketFrame.passengerEvents)
                    ? board.currentStation.inputTicketFrame.passengerEvents.slice()
                    : [],
            }
            : null,
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
    const currentSourceKeys = new Set([
        board.currentStation?.key || "",
        ...(Array.isArray(board.sourceCandidateStageKeys) ? board.sourceCandidateStageKeys : []),
    ].filter(Boolean));
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
        targetAction: journey.targetAction && typeof journey.targetAction === "object"
            ? { ...journey.targetAction }
            : null,
        nextSourceStage: journey.nextSourceStage && typeof journey.nextSourceStage === "object"
            ? { ...journey.nextSourceStage }
            : null,
        routeActionFrame: journey.routeActionFrame && typeof journey.routeActionFrame === "object"
            ? {
                ...journey.routeActionFrame,
                routeIds: Array.isArray(journey.routeActionFrame.routeIds)
                    ? journey.routeActionFrame.routeIds.slice()
                    : [],
            }
            : null,
        passengerFrame: journey.passengerFrame && typeof journey.passengerFrame === "object"
            ? {
                ...journey.passengerFrame,
                intentionFrame: cloneAndrewsRouteBoardIntentionFrame(journey.passengerFrame.intentionFrame),
                primaryRouteIds: Array.isArray(journey.passengerFrame.primaryRouteIds)
                    ? journey.passengerFrame.primaryRouteIds.slice()
                    : [],
                passengerEvents: Array.isArray(journey.passengerFrame.passengerEvents)
                    ? journey.passengerFrame.passengerEvents.slice()
                    : [],
                stationLineFrame: journey.passengerFrame.stationLineFrame && typeof journey.passengerFrame.stationLineFrame === "object"
                    ? {
                        ...journey.passengerFrame.stationLineFrame,
                        primaryRouteIds: Array.isArray(journey.passengerFrame.stationLineFrame.primaryRouteIds)
                            ? journey.passengerFrame.stationLineFrame.primaryRouteIds.slice()
                            : [],
                        passengerEvents: Array.isArray(journey.passengerFrame.stationLineFrame.passengerEvents)
                            ? journey.passengerFrame.stationLineFrame.passengerEvents.slice()
                            : [],
                        stops: Array.isArray(journey.passengerFrame.stationLineFrame.stops)
                            ? journey.passengerFrame.stationLineFrame.stops.map((entry) => ({ ...entry }))
                            : [],
                    }
                    : null,
            }
            : null,
        stationLineFrame: journey.stationLineFrame && typeof journey.stationLineFrame === "object"
            ? {
                ...journey.stationLineFrame,
                primaryRouteIds: Array.isArray(journey.stationLineFrame.primaryRouteIds)
                    ? journey.stationLineFrame.primaryRouteIds.slice()
                    : [],
                passengerEvents: Array.isArray(journey.stationLineFrame.passengerEvents)
                    ? journey.stationLineFrame.passengerEvents.slice()
                    : [],
                stops: Array.isArray(journey.stationLineFrame.stops)
                    ? journey.stationLineFrame.stops.map((entry) => ({ ...entry }))
                    : [],
            }
            : null,
        concourseFrame: cloneAndrewsRouteBoardConcourseFrame(journey.concourseFrame),
        platformFrame: cloneAndrewsRouteBoardPlatformFrame(journey.platformFrame),
        rideFrame: cloneAndrewsRouteBoardRideFrame(journey.rideFrame),
        sourceLayerFrame: cloneAndrewsRouteBoardSourceLayerFrame(journey.sourceLayerFrame),
        journeyHistory: getAndrewsRouteBoardJourneyHistoryReceipt(),
        routeIds: Array.isArray(journey.routeIds) ? journey.routeIds.slice() : [],
        routeStops: Array.isArray(journey.routeStops)
            ? journey.routeStops.map((stop) => ({ ...stop }))
            : [],
        routeConditionFrames: cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames),
        gateDomainCounts: Array.isArray(journey.gateDomainCounts)
            ? journey.gateDomainCounts.map((item) => ({ ...item }))
            : [],
    };
}

function cloneAndrewsRouteBoardJourneyForHistory(journey = null, sequence = 0) {
    if (!journey || typeof journey !== "object") {
        return null;
    }
    return {
        ...journey,
        journeySequence: Number(sequence || journey.journeySequence || 0),
        targetAction: journey.targetAction && typeof journey.targetAction === "object"
            ? { ...journey.targetAction }
            : null,
        nextSourceStage: journey.nextSourceStage && typeof journey.nextSourceStage === "object"
            ? { ...journey.nextSourceStage }
            : null,
        routeActionFrame: journey.routeActionFrame && typeof journey.routeActionFrame === "object"
            ? {
                ...journey.routeActionFrame,
                routeIds: Array.isArray(journey.routeActionFrame.routeIds)
                    ? journey.routeActionFrame.routeIds.slice()
                    : [],
            }
            : null,
        passengerFrame: journey.passengerFrame && typeof journey.passengerFrame === "object"
            ? {
                ...journey.passengerFrame,
                intentionFrame: cloneAndrewsRouteBoardIntentionFrame(journey.passengerFrame.intentionFrame),
                primaryRouteIds: Array.isArray(journey.passengerFrame.primaryRouteIds)
                    ? journey.passengerFrame.primaryRouteIds.slice()
                    : [],
                passengerEvents: Array.isArray(journey.passengerFrame.passengerEvents)
                    ? journey.passengerFrame.passengerEvents.slice()
                    : [],
            }
            : null,
        stationLineFrame: journey.stationLineFrame && typeof journey.stationLineFrame === "object"
            ? {
                ...journey.stationLineFrame,
                primaryRouteIds: Array.isArray(journey.stationLineFrame.primaryRouteIds)
                    ? journey.stationLineFrame.primaryRouteIds.slice()
                    : [],
                passengerEvents: Array.isArray(journey.stationLineFrame.passengerEvents)
                    ? journey.stationLineFrame.passengerEvents.slice()
                    : [],
                stops: Array.isArray(journey.stationLineFrame.stops)
                    ? journey.stationLineFrame.stops.map((entry) => ({ ...entry }))
                    : [],
            }
            : null,
        concourseFrame: cloneAndrewsRouteBoardConcourseFrame(journey.concourseFrame),
        platformFrame: cloneAndrewsRouteBoardPlatformFrame(journey.platformFrame),
        rideFrame: cloneAndrewsRouteBoardRideFrame(journey.rideFrame),
        sourceLayerFrame: cloneAndrewsRouteBoardSourceLayerFrame(journey.sourceLayerFrame),
        routeIds: Array.isArray(journey.routeIds) ? journey.routeIds.slice() : [],
        routeStops: Array.isArray(journey.routeStops)
            ? journey.routeStops.map((stop) => ({ ...stop }))
            : [],
        routeConditionFrames: cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames),
        gateDomainCounts: Array.isArray(journey.gateDomainCounts)
            ? journey.gateDomainCounts.map((item) => ({ ...item }))
            : [],
    };
}

function getAndrewsRouteBoardJourneyHistoryForBoard(board = null) {
    const history = Array.isArray(AndrewsRouteBoardJourneyHistory)
        ? AndrewsRouteBoardJourneyHistory
        : [];
    if (!board || !AndrewsRouteBoardSourceOverrideStage || !history.length) {
        return [];
    }
    const last = history[history.length - 1];
    if ((last?.destinationKey || "") !== (board.currentStation?.key || "")) {
        return [];
    }
    return history
        .map((journey, index) => cloneAndrewsRouteBoardJourneyForHistory(journey, index + 1))
        .filter(Boolean);
}

function getAndrewsRouteBoardJourneyHistoryReceipt() {
    const history = Array.isArray(AndrewsRouteBoardJourneyHistory)
        ? AndrewsRouteBoardJourneyHistory
        : [];
    return history
        .map((journey, index) => cloneAndrewsRouteBoardJourneyForHistory(journey, index + 1))
        .filter(Boolean);
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
    const continuedJourney = cloneAndrewsRouteBoardJourneyForHistory(
        journey,
        journey.journeySequence || AndrewsRouteBoardJourneyHistory.length || 1
    );
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
        passengerFrame: continuedJourney.passengerFrame && typeof continuedJourney.passengerFrame === "object"
            ? {
                ...continuedJourney.passengerFrame,
                passengerEvents: Array.from(new Set([
                    ...(Array.isArray(continuedJourney.passengerFrame.passengerEvents)
                        ? continuedJourney.passengerFrame.passengerEvents
                        : []),
                    "keep-arrival-visible-after-transfer",
                    "suppress-repeat-next-source-action",
                ])),
            }
            : null,
    };
}

function continueAndrewsRouteBoardFromActiveJourney() {
    const journey = getAndrewsRouteBoardActiveJourneyReceipt();
    if (!journey?.nextSourceStage) {
        return false;
    }
    AndrewsRouteBoardSourceOverrideStage = { ...journey.nextSourceStage };
    const nextSequence = AndrewsRouteBoardJourneyHistory.length + 1;
    const continuedJourney = cloneAndrewsRouteBoardJourneyForHistory(journey, nextSequence);
    AndrewsRouteBoardJourneyHistory = [
        ...AndrewsRouteBoardJourneyHistory,
        continuedJourney,
    ].filter(Boolean).slice(-7);
    AndrewsRouteBoardContinuedJourney = {
        ...continuedJourney,
        continuationState: "continued-as-next-source",
        continuationSourceKey: continuedJourney?.sourceKey || "",
        continuationDestinationKey: continuedJourney?.destinationKey || "",
    };
    AndrewsRouteBoardDestinationKey = "";
    AndrewsRouteBoardPinnedSourceInput = "";
    AndrewsRouteBoardPinnedSourceStage = null;
    AndrewsRouteBoardActiveJourney = null;
    const targetAction = journey.targetAction || null;
    const targetMode = getAndrewsRouteBoardActionMode(targetAction);
    if (targetAction?.entryBoard === "ordinary-nnc") {
        if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
            setOrdinaryNncGenerationModeEnabled(true);
        }
    } else if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
        setOrdinaryNncGenerationModeEnabled(false);
    }
    if (targetMode && typeof setActiveNawatTenseMode === "function") {
        setActiveNawatTenseMode(targetMode);
    } else if (targetMode && typeof setActiveTenseMode === "function") {
        setActiveTenseMode(targetMode, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || TENSE_MODE_SYSTEM.unit || "nawat")
                : "nawat",
        });
    }
    if (
        typeof setComposerEntryBoard === "function"
        && typeof COMPOSER_ENTRY_BOARD !== "undefined"
    ) {
        const targetBoard = targetAction?.entryBoard === "noun-to-verb"
            ? (COMPOSER_ENTRY_BOARD.nounToVerb || "noun-to-verb")
            : (COMPOSER_ENTRY_BOARD.general || "general");
        setComposerEntryBoard(targetBoard, { force: true });
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof renderTenseTabs === "function") {
        renderTenseTabs();
    } else {
        renderAndrewsRouteBoard();
    }
    if (typeof renderOutputJourneyStrip === "function") {
        renderOutputJourneyStrip();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:andrews-route-board-next-source-continued", {
            nextSourceStage: AndrewsRouteBoardSourceOverrideStage,
            targetAction,
            journey,
        });
    }
    return true;
}

function activateAndrewsRouteBoardTarget(entry = null, board = null) {
    const inputBeforeActivation = getAndrewsRouteBoardRawInput();
    const targetAction = entry?.targetAction || entry?.routes?.[entry.routes.length - 1]?.targetAction || null;
    const destinationKey = targetAction?.targetStageKey
        || entry?.targetStageKey
        || entry?.routes?.[entry.routes.length - 1]?.targetStageKey
        || "";
    if (destinationKey) {
        AndrewsRouteBoardDestinationKey = destinationKey;
        pinAndrewsRouteBoardJourneySource(board, inputBeforeActivation);
        setAndrewsRouteBoardActiveJourney(entry, board);
    }
    const targetMode = getAndrewsRouteBoardActionMode(targetAction);
    if (targetAction?.entryBoard === "ordinary-nnc") {
        if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
            setOrdinaryNncGenerationModeEnabled(true);
        }
        if (targetMode && typeof setActiveNawatTenseMode === "function") {
            setActiveNawatTenseMode(targetMode);
        } else if (targetMode && typeof setActiveTenseMode === "function") {
            setActiveTenseMode(targetMode, {
                modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                    ? (TENSE_MODE_SYSTEM.nawat || TENSE_MODE_SYSTEM.unit || "nawat")
                    : "nawat",
            });
        }
        if (typeof setComposerEntryBoard === "function" && typeof COMPOSER_ENTRY_BOARD !== "undefined") {
            setComposerEntryBoard(COMPOSER_ENTRY_BOARD.general || "general", { force: true });
        }
    } else {
        if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
            setOrdinaryNncGenerationModeEnabled(false);
        }
        if (targetMode && typeof setActiveNawatTenseMode === "function") {
            setActiveNawatTenseMode(targetMode);
        } else if (targetMode && typeof setActiveTenseMode === "function") {
            setActiveTenseMode(targetMode, {
                modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                    ? (TENSE_MODE_SYSTEM.nawat || TENSE_MODE_SYSTEM.unit || "nawat")
                    : "nawat",
            });
        }
        if (
            typeof setComposerEntryBoard === "function"
            && typeof COMPOSER_ENTRY_BOARD !== "undefined"
        ) {
            const targetBoard = targetAction?.entryBoard === "noun-to-verb"
                ? (COMPOSER_ENTRY_BOARD.nounToVerb || "noun-to-verb")
                : (COMPOSER_ENTRY_BOARD.general || "general");
            setComposerEntryBoard(targetBoard, { force: true });
        }
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof renderTenseTabs === "function") {
        renderTenseTabs();
    } else {
        renderAndrewsRouteBoard();
    }
    restoreAndrewsRouteBoardInputIfBlank(AndrewsRouteBoardPinnedSourceInput || inputBeforeActivation);
    if (typeof renderActiveConjugations === "function" && typeof getVerbInputMeta === "function") {
        const verbMeta = getVerbInputMeta();
        renderActiveConjugations({
            verb: verbMeta.displayVerb,
            objectPrefix: typeof getCurrentObjectPrefix === "function" ? getCurrentObjectPrefix() : "",
        });
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:andrews-route-board-target-activated", {
            routeIds: Array.isArray(entry?.routeIds) ? entry.routeIds : [entry?.routeId || ""].filter(Boolean),
            boardState: board?.boardState || "",
            destinationKey,
            targetAction,
            journey: AndrewsRouteBoardActiveJourney,
        });
    }
}

function buildAndrewsRouteBoardRouteMeta(entry = null, route = null, routeTicket = null) {
    const segmentCount = Number(entry?.segmentCount || route?.segmentCount || routeTicket?.segmentCount || 1);
    const hiddenCoordinateCount = Number(
        entry?.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0
    );
    const resistanceScore = Number(entry?.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || 0);
    const tripKind = entry?.tripKind || route?.tripKind || routeTicket?.tripKind || "";
    return [
        resistanceScore ? `R${resistanceScore}` : "",
        segmentCount === 1 ? "1 tramo" : `${segmentCount} tramos`,
        hiddenCoordinateCount ? `${hiddenCoordinateCount} coords` : "",
        tripKind === "transfer" ? "trasbordo" : "",
    ].filter(Boolean).join(" · ");
}

function getAndrewsRouteBoardRouteDestinationKey(entry = null, route = null) {
    return entry?.targetAction?.targetStageKey
        || route?.targetAction?.targetStageKey
        || route?.targetStageKey
        || entry?.targetStageKey
        || entry?.nextSourceStageKey
        || entry?.routeTicket?.nextSourceStageKey
        || "";
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
    const routeIds = Array.isArray(entry?.routeIds)
        ? entry.routeIds
        : [entry?.routeId || route?.routeId || ""].filter(Boolean);
    const routeKey = routeIds.join("|");
    const history = getAndrewsRouteBoardJourneyHistoryForBoard(board);
    if (routeKey) {
        const routeVisitCount = history
            .filter((journey) => (Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "") === routeKey)
            .length;
        if (routeVisitCount) {
            return routeVisitCount + 1;
        }
    }
    if (destinationKey) {
        const stationVisitCount = history
            .filter((journey) => journey.sourceKey === destinationKey || journey.destinationKey === destinationKey)
            .length;
        if (stationVisitCount) {
            return stationVisitCount + 1;
        }
    }
    return 0;
}

function getAndrewsRouteBoardRouteLoopState(entry = null, route = null, board = null) {
    const sourceKey = board?.currentStation?.key || entry?.sourceStageKey || route?.sourceStageKey || "";
    const destinationKey = getAndrewsRouteBoardRouteDestinationKey(entry, route);
    const routeIds = Array.isArray(entry?.routeIds)
        ? entry.routeIds
        : [entry?.routeId || route?.routeId || ""].filter(Boolean);
    const routeKey = routeIds.join("|");
    const history = getAndrewsRouteBoardJourneyHistoryForBoard(board);
    if (sourceKey && destinationKey && sourceKey === destinationKey) {
        return "same-station";
    }
    if (routeKey && history.some((journey) => (Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "") === routeKey)) {
        return "route-repeated";
    }
    if (
        destinationKey
        && history.some((journey) => journey.sourceKey === destinationKey || journey.destinationKey === destinationKey)
    ) {
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
    const stops = Array.isArray(entry?.routeStops) && entry.routeStops.length
        ? entry.routeStops
        : (Array.isArray(entry?.routeTicket?.routeStops) ? entry.routeTicket.routeStops : []);
    const stopLabels = stops
        .map((stop) => String(stop?.label || stop?.key || "").trim())
        .filter(Boolean);
    if (stopLabels.length >= 2) {
        return stopLabels.join(" > ");
    }
    const sourceLabel = String(
        entry?.sourceLabel
        || stops[0]?.label
        || ""
    ).trim();
    const destinationLabel = String(
        entry?.label
        || entry?.targetLabel
        || entry?.nextSourceLabel
        || entry?.routeTicket?.nextSourceLabel
        || ""
    ).trim();
    return [sourceLabel, destinationLabel].filter(Boolean).join(" > ");
}

function getAndrewsRouteBoardJourneyRoutePathLabel(journey = null) {
    const explicitPath = String(journey?.routePathLabel || journey?.routeTicket?.routePathLabel || "").trim();
    if (explicitPath) {
        return explicitPath;
    }
    const stops = Array.isArray(journey?.routeStops) ? journey.routeStops : [];
    const stopLabels = stops
        .map((stop) => String(stop?.label || stop?.key || "").trim())
        .filter(Boolean);
    if (stopLabels.length >= 2) {
        return stopLabels.join(" > ");
    }
    return [journey?.sourceLabel || "", journey?.destinationLabel || ""].filter(Boolean).join(" > ");
}

function buildAndrewsRouteBoardDestinationOptionLabel(entry = null, {
    actionLabel = "",
} = {}) {
    const label = String(entry?.label || "").trim();
    const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry);
    const segmentCount = Number(entry?.segmentCount || entry?.routeTicket?.segmentCount || 1);
    const resistanceScore = Number(entry?.resistanceScore || entry?.routeTicket?.resistanceScore || 0);
    const tripKind = entry?.tripKind || entry?.routeTicket?.tripKind || "";
    const meta = [
        resistanceScore ? `R${resistanceScore}` : "",
        segmentCount === 1 ? "1 tramo" : `${segmentCount} tramos`,
        tripKind === "transfer" ? "trasbordo" : "",
    ].filter(Boolean).join(" · ");
    return [actionLabel, routePathLabel || label, meta].filter(Boolean).join(" · ");
}

function buildAndrewsRouteBoardNetworkLabel(board = null) {
    const routeCount = Number(board?.routeCount || 0);
    const hiddenCoordinateCount = Number(board?.hiddenCoordinateCount || 0);
    const averageClicks = Number(board?.averageRouteStageClicks || 0);
    const maxClicks = Number(board?.maxRouteStageClicks || 0);
    return [
        routeCount ? `${routeCount} rutas` : "",
        hiddenCoordinateCount ? `${hiddenCoordinateCount} coords` : "",
        averageClicks ? `media ${averageClicks}` : "",
        maxClicks ? `max ${maxClicks}` : "",
    ].filter(Boolean).join(" · ");
}

function getAndrewsRouteBoardRouteStops(entry = null, route = null, routeTicket = null) {
    const stops = Array.isArray(entry?.routeStops) && entry.routeStops.length
        ? entry.routeStops
        : (Array.isArray(routeTicket?.routeStops) && routeTicket.routeStops.length
            ? routeTicket.routeStops
            : (Array.isArray(route?.routeStops) ? route.routeStops : []));
    return stops
        .map((stop) => ({
            label: String(stop?.label || "").trim(),
            key: String(stop?.key || "").trim(),
        }))
        .filter((stop) => stop.label || stop.key);
}

function cloneAndrewsRouteBoardRouteConditionFrames(frames = []) {
    return (Array.isArray(frames) ? frames : [])
        .filter((frame) => frame && typeof frame === "object")
        .map((frame) => ({
            ...frame,
            ifStage: frame.ifStage && typeof frame.ifStage === "object" ? { ...frame.ifStage } : null,
            thenStage: frame.thenStage && typeof frame.thenStage === "object" ? { ...frame.thenStage } : null,
            conditions: Array.isArray(frame.conditions)
                ? frame.conditions.map((condition) => ({ ...condition }))
                : [],
        }));
}

function getAndrewsRouteBoardRouteConditionFrames(entry = null, route = null, routeTicket = null) {
    const frames = Array.isArray(entry?.routeConditionFrames) && entry.routeConditionFrames.length
        ? entry.routeConditionFrames
        : (Array.isArray(route?.routeConditionFrames) && route.routeConditionFrames.length
            ? route.routeConditionFrames
            : (Array.isArray(routeTicket?.routeConditionFrames) ? routeTicket.routeConditionFrames : []));
    if (frames.length) {
        return cloneAndrewsRouteBoardRouteConditionFrames(frames);
    }
    const single = entry?.routeConditionFrame
        || entry?.routeIfThenFrame
        || route?.routeConditionFrame
        || route?.routeIfThenFrame
        || routeTicket?.routeConditionFrame
        || null;
    return single && typeof single === "object" ? cloneAndrewsRouteBoardRouteConditionFrames([single]) : [];
}

function serializeAndrewsRouteBoardRouteConditionFrames(frames = []) {
    return (Array.isArray(frames) ? frames : [])
        .map((frame) => [
            frame.sourceKey || frame.ifStage?.key || "",
            frame.targetKey || frame.thenStage?.key || "",
            frame.operation || "",
        ].join(">"))
        .join("|");
}

function appendAndrewsRouteBoardRouteConditions(parent, frames = []) {
    const conditionFrames = (Array.isArray(frames) ? frames : [])
        .filter((frame) => frame && typeof frame === "object");
    if (!conditionFrames.length) {
        return null;
    }
    const first = conditionFrames[0];
    const last = conditionFrames[conditionFrames.length - 1];
    const rail = document.createElement("span");
    rail.className = "andrews-route-board__conditions";
    rail.dataset.conditionModel = first.conditionModel || "";
    rail.dataset.conditionSegments = String(conditionFrames.length);
    rail.dataset.conditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(conditionFrames);
    const appendChip = (role = "", text = "", title = "") => {
        if (!text) {
            return;
        }
        const chip = document.createElement("span");
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
        appendChip("transfer", `${conditionFrames.length} tramos`, conditionFrames.map((frame) => frame.passengerCue).join(" | "));
    }
    const functionUseCondition = conditionFrames
        .flatMap((frame) => Array.isArray(frame.conditions) ? frame.conditions : [])
        .find((entry) => entry.dimension === "function-use");
    appendChip("function-use", functionUseCondition?.label || "Función final", functionUseCondition?.expected || "");
    parent.appendChild(rail);
    return rail;
}

function appendAndrewsRouteBoardRouteStops(parent, stops = []) {
    const routeStops = Array.isArray(stops) ? stops : [];
    if (!routeStops.length) {
        return null;
    }
    const stopRail = document.createElement("span");
    stopRail.className = "andrews-route-board__route-stops";
    routeStops.forEach((stop, index) => {
        if (index > 0) {
            const arrow = document.createElement("span");
            arrow.className = "andrews-route-board__route-stop-arrow";
            arrow.textContent = ">";
            stopRail.appendChild(arrow);
        }
        const chip = document.createElement("span");
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
    hypothesisFrame = null,
} = {}) {
    const dimensions = (Array.isArray(gateDomainCounts) ? gateDomainCounts : []).slice(0, 4);
    if (!dimensions.length) {
        return null;
    }
    const hypothesisDomains = new Set(getAndrewsRouteBoardHypothesisDomains(hypothesisFrame));
    const primaryHypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
    const rail = document.createElement("span");
    rail.className = "andrews-route-board__dimensions";
    dimensions.forEach((item) => {
        const chip = document.createElement("span");
        chip.className = "andrews-route-board__dimension";
        chip.dataset.gateDomain = item.value;
        chip.dataset.gateDomainCount = String(item.count || 0);
        if (hypothesisDomains.has(item.value)) {
            chip.dataset.hypothesisDomain = "candidate-obstacle";
            chip.dataset.hypothesisTestId = primaryHypothesis?.hypothesisTestId || "";
            chip.dataset.hypothesisPValue = primaryHypothesis?.pValue === null || primaryHypothesis?.pValue === undefined
                ? ""
                : String(primaryHypothesis.pValue);
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
        "salida:next-source-vector": "#3 Salida · entregar trayecto",
    };
    return labels[eventFeature] || [entry?.block || "", eventFeature].filter(Boolean).join(" · ");
}

function appendAndrewsRouteBoardResistancePlan(parent, board = null) {
    const plan = board?.resistanceConversionPlan;
    if (!plan || !Array.isArray(plan.highResistanceDimensions) || !plan.highResistanceDimensions.length) {
        return null;
    }
    const strip = document.createElement("div");
    strip.className = "andrews-route-board__conversion";
    strip.dataset.fromRoute = plan.fromRouteId || "";
    strip.dataset.toRoute = plan.toRouteId || "";
    strip.dataset.fromRouteLabel = plan.fromRouteLabel || "";
    strip.dataset.toRouteLabel = plan.toRouteLabel || "";
    strip.dataset.scoreReductionNeeded = String(plan.scoreReductionNeeded || 0);
    strip.dataset.obstacleReductionNeeded = String(plan.obstacleReductionNeeded || 0);
    strip.dataset.actionEvents = Array.isArray(plan.blockActions)
        ? plan.blockActions.map((entry) => entry.eventFeature || "").filter(Boolean).join("|")
        : "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__conversion-label";
    label.textContent = "Cambio";
    const main = document.createElement("span");
    main.className = "andrews-route-board__conversion-main";
    main.textContent = [
        plan.fromResistanceScore ? `R${plan.fromResistanceScore}` : "",
        plan.targetResistanceScore ? `R${plan.targetResistanceScore}` : "",
    ].filter(Boolean).join(" > ");
    const delta = document.createElement("span");
    delta.className = "andrews-route-board__conversion-delta";
    delta.textContent = [
        plan.scoreReductionNeeded ? `-${plan.scoreReductionNeeded}R` : "",
        plan.obstacleReductionNeeded ? `-${plan.obstacleReductionNeeded} coords` : "",
    ].filter(Boolean).join(" · ");
    const dimensions = document.createElement("span");
    dimensions.className = "andrews-route-board__conversion-dimensions";
    plan.highResistanceDimensions.slice(0, 4).forEach((item) => {
        const chip = document.createElement("span");
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
    const routeLine = document.createElement("span");
    routeLine.className = "andrews-route-board__conversion-route";
    routeLine.textContent = [
        plan.fromRouteLabel || plan.fromRouteId || "",
        plan.toRouteLabel || plan.toRouteId || "",
    ].filter(Boolean).join(" > ");
    const actions = document.createElement("span");
    actions.className = "andrews-route-board__conversion-actions";
    (Array.isArray(plan.blockActions) ? plan.blockActions : []).forEach((entry) => {
        const chip = document.createElement("span");
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
    const frame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object"
        ? board.resistanceHypothesisFrame
        : null;
    const primary = frame?.primaryCandidateObstacle
        || frame?.primaryTest
        || frame?.highResistanceGateTest
        || null;
    if (!frame || !primary) {
        return null;
    }
    const hypothesis = document.createElement("div");
    hypothesis.className = "andrews-route-board__hypothesis";
    hypothesis.dataset.resistanceHypothesisKind = frame.kind || "";
    hypothesis.dataset.resistanceHypothesisDecision = frame.nullHypothesisDecision || "";
    hypothesis.dataset.resistanceHypothesisTestId = primary.hypothesisTestId || "";
    hypothesis.dataset.resistanceHypothesisKey = primary.key || "";
    hypothesis.dataset.resistanceHypothesisCandidate = frame.primaryCandidateObstacle?.key || "";
    hypothesis.dataset.resistanceHypothesisDomains = Array.isArray(primary.domains) ? primary.domains.join("+") : "";
    hypothesis.dataset.resistanceHypothesisPValue = primary.pValue === null || primary.pValue === undefined
        ? ""
        : String(primary.pValue);
    hypothesis.dataset.resistanceHypothesisQValue = primary.qValue === null || primary.qValue === undefined
        ? ""
        : String(primary.qValue);
    hypothesis.dataset.resistanceHypothesisAlpha = String(frame.alpha || primary.alpha || "");
    hypothesis.dataset.resistanceHypothesisRejectsNull = String(primary.rejectsNullHypothesis === true);
    const actionLabel = getAndrewsRouteBoardHypothesisActionLabel(primary, frame);
    hypothesis.dataset.resistanceHypothesisAction = frame.recommendedAction || primary.action || "";
    hypothesis.dataset.resistanceHypothesisActionLabel = actionLabel;
    hypothesis.dataset.resistanceHypothesisOrder = Array.isArray(frame.dimensionalOrder)
        ? frame.dimensionalOrder.join("|")
        : "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__hypothesis-label";
    label.textContent = "Prueba";
    const main = document.createElement("span");
    main.className = "andrews-route-board__hypothesis-main";
    const domainLabel = getAndrewsRouteBoardHypothesisDomainLabel(primary.domains);
    main.textContent = [
        primary.rejectsNullHypothesis === true ? "H0 rechazada" : "H0 abierta",
        domainLabel || primary.label || primary.key || "",
    ].filter(Boolean).join(" · ");
    const stats = document.createElement("span");
    stats.className = "andrews-route-board__hypothesis-stats";
    stats.textContent = [
        primary.pValue === null || primary.pValue === undefined ? "" : `p ${formatAndrewsRouteBoardProbability(primary.pValue)}`,
        primary.qValue === null || primary.qValue === undefined ? "" : `q ${formatAndrewsRouteBoardProbability(primary.qValue)}`,
        frame.alpha ? `alfa ${formatAndrewsRouteBoardProbability(frame.alpha)}` : "",
    ].filter(Boolean).join(" · ");
    const chips = document.createElement("span");
    chips.className = "andrews-route-board__hypothesis-chips";
    [
        frame.highResistanceGateTest,
        frame.lowResistanceGateTest,
        frame.newRelationshipCandidate,
    ].filter(Boolean).forEach((entry) => {
        const chip = document.createElement("span");
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
    const action = document.createElement("span");
    action.className = "andrews-route-board__hypothesis-action";
    action.textContent = actionLabel;
    hypothesis.append(label, main, stats);
    if (chips.childElementCount) {
        hypothesis.appendChild(chips);
    }
    if (action.textContent) {
        hypothesis.appendChild(action);
    }
    hypothesis.setAttribute("aria-label", [
        label.textContent,
        main.textContent,
        stats.textContent,
        action.textContent,
    ].filter(Boolean).join(" · "));
    parent.appendChild(hypothesis);
    return hypothesis;
}

function appendAndrewsRouteBoardPassengerIntentions(parent, frame = null) {
    const intentionFrame = frame?.intentionFrame && typeof frame.intentionFrame === "object"
        ? frame.intentionFrame
        : null;
    const intentions = Array.isArray(intentionFrame?.intentions)
        ? intentionFrame.intentions
        : [];
    if (!intentionFrame || !intentions.length) {
        return null;
    }
    const rail = document.createElement("span");
    rail.className = "andrews-route-board__intentions";
    rail.dataset.intentionModel = intentionFrame.intentionModel || "";
    rail.dataset.routeProvisionMode = intentionFrame.routeProvisionMode || "";
    rail.dataset.currentIntention = intentionFrame.currentIntention || frame.currentIntention || "";
    rail.dataset.sharedRouteBoard = String(intentionFrame.sharedRouteBoard === true);
    rail.dataset.intentionSwitchRequired = String(intentionFrame.intentionSwitchRequired === true);
    rail.dataset.intentions = serializeAndrewsRouteBoardIntentions(intentionFrame);
    const intentionLabels = [];
    intentions.forEach((entry) => {
        const chip = document.createElement("span");
        chip.className = "andrews-route-board__intention";
        chip.dataset.intentionMode = entry.id || "";
        chip.dataset.intentionSelected = String(entry.selected === true);
        chip.dataset.intentionOptionCount = String(entry.optionCount || 0);
        chip.dataset.intentionRouteCount = String(entry.routeCount || 0);
        chip.dataset.intentionActionCount = String(entry.actionCount || 0);
        chip.textContent = [
            entry.label || entry.id || "",
            Number(entry.optionCount || entry.routeCount || 0) ? String(entry.optionCount || entry.routeCount || 0) : "",
        ].filter(Boolean).join(" ");
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
    const recommendedRouteKey = Array.isArray(board?.recommendedRoute?.routeIds)
        ? board.recommendedRoute.routeIds.join("|")
        : "";
    const primaryRoute = (recommendedRouteKey
        ? visibleRoutes.find((entry) => (Array.isArray(entry.routeIds) ? entry.routeIds.join("|") : "") === recommendedRouteKey)
        : null)
        || (visibleRoutes.length === 1 ? visibleRoutes[0] : null)
        || board?.recommendedRoute
        || null;
    const pass = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__pass-label";
    label.textContent = "Pase";
    const main = document.createElement("span");
    main.className = "andrews-route-board__pass-main";
    main.textContent = [
        frame.primarySourceLabel || frame.sourceLabel || "",
        frame.destinationLabel || (frame.currentIntention === "explore" ? "Salidas" : ""),
    ].filter(Boolean).join(" > ");
    const meta = document.createElement("span");
    meta.className = "andrews-route-board__pass-meta";
    meta.textContent = [
        frame.primaryActionLabel || "",
        frame.primaryRoutePathLabel || frame.primaryNextSourceLabel || "",
        frame.visibleRouteCount ? `${frame.visibleRouteCount} rutas` : "",
        frame.destinationOptionCount ? `${frame.destinationOptionCount} destinos` : "",
        frame.exploreOptionCount ? `${frame.exploreOptionCount} explorar` : "",
        frame.averageRouteStageClicks ? `media ${frame.averageRouteStageClicks}` : "",
        frame.maxRouteStageClicks ? `max ${frame.maxRouteStageClicks}` : "",
    ].filter(Boolean).join(" · ");
    pass.append(label, main);
    appendAndrewsRouteBoardPassengerIntentions(pass, frame);
    pass.appendChild(meta);
    if (canContinueJourney || primaryRoute) {
        const route = Array.isArray(primaryRoute?.routes) ? primaryRoute.routes[0] : primaryRoute;
        const routeTicket = primaryRoute?.routeTicket || route?.routeTicket || null;
        const routeIds = canContinueJourney
            ? (Array.isArray(activeJourney.routeIds) ? activeJourney.routeIds : [])
            : (Array.isArray(primaryRoute.routeIds)
                ? primaryRoute.routeIds
                : [primaryRoute.routeId || route?.routeId || ""].filter(Boolean));
        const routeConditionFrames = canContinueJourney
            ? cloneAndrewsRouteBoardRouteConditionFrames(activeJourney.routeConditionFrames)
            : getAndrewsRouteBoardRouteConditionFrames(primaryRoute, route, routeTicket);
        const routeLoopState = canContinueJourney
            ? ""
            : getAndrewsRouteBoardRouteLoopState(primaryRoute, route, board);
        const routeLoopCount = canContinueJourney
            ? 0
            : getAndrewsRouteBoardRouteLoopCount(primaryRoute, route, board);
        const routeLoopLabel = getAndrewsRouteBoardLoopStateLabel(routeLoopState, routeLoopCount);
        const action = document.createElement("button");
        action.type = "button";
        action.className = "andrews-route-board__pass-action";
        action.dataset.actionMode = canContinueJourney ? "continue-next-source" : "activate-route";
        action.dataset.routeIds = routeIds.join("|");
        action.dataset.routeLoopState = routeLoopState;
        action.dataset.routeLoopLabel = routeLoopLabel;
        action.dataset.routeLoopCount = String(routeLoopCount || 0);
        action.dataset.routeRecommendation = activeJourney?.routeActionFrame?.recommendationRole
            || primaryRoute?.routeActionFrame?.recommendationRole
            || frame.primaryRecommendationRole
            || "";
        action.dataset.routeActionLabel = activeJourney?.passengerFrame?.primaryActionLabel
            || activeJourney?.routeActionFrame?.actionLabel
            || activeJourney?.targetActionLabel
            || primaryRoute?.routeActionFrame?.actionLabel
            || frame.primaryActionLabel
            || "Siguiente";
        action.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
        action.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
        action.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey
            || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key
            || "";
        action.dataset.routeNextSource = activeJourney?.nextSourceKey
            || activeJourney?.destinationKey
            || primaryRoute?.nextSourceStageKey
            || primaryRoute?.routeTicket?.nextSourceStageKey
            || frame.primaryNextSourceStageKey
            || "";
        action.dataset.routeSourceLabel = activeJourney?.sourceLabel
            || frame.primarySourceLabel
            || frame.sourceLabel
            || "";
        action.dataset.routeNextSourceLabel = activeJourney?.nextSourceLabel
            || activeJourney?.destinationLabel
            || primaryRoute?.nextSourceLabel
            || primaryRoute?.routeTicket?.nextSourceLabel
            || frame.primaryNextSourceLabel
            || "";
        action.dataset.routePathLabel = activeJourney
            ? getAndrewsRouteBoardJourneyRoutePathLabel(activeJourney)
            : (getAndrewsRouteBoardEntryRoutePathLabel(primaryRoute)
                || primaryRoute?.routeTicket?.routePathLabel
                || primaryRoute?.routeActionFrame?.routePathLabel
                || frame.primaryRoutePathLabel
                || frame.routePathLabel
                || [
                    action.dataset.routeSourceLabel,
                    frame.destinationLabel || action.dataset.routeNextSourceLabel,
                ].filter(Boolean).join(" > "));
        action.dataset.routeActionDisplayLabel = [
            action.dataset.routeActionLabel,
            action.dataset.routePathLabel || action.dataset.routeNextSourceLabel,
            routeLoopLabel,
        ].filter(Boolean).join(" · ");
        action.textContent = action.dataset.routeActionDisplayLabel || action.dataset.routeActionLabel;
        action.setAttribute("aria-label", [
            action.dataset.routeActionDisplayLabel || action.dataset.routeActionLabel,
        ].filter(Boolean).join(" · "));
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
    const ride = document.createElement("div");
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
    const label = document.createElement("span");
    label.className = "andrews-route-board__ride-label";
    label.textContent = "Viaje";
    const main = document.createElement("span");
    main.className = "andrews-route-board__ride-main";
    main.textContent = frame.primaryRoutePathLabel
        || [frame.currentSignLabel, frame.destinationSignLabel || frame.nextSignLabel].filter(Boolean).join(" > ");
    const meta = document.createElement("span");
    meta.className = "andrews-route-board__ride-meta";
    meta.textContent = [
        frame.primaryActionLabel || "",
        frame.visibleTrackCount ? `${frame.visibleTrackCount} andenes` : "",
        frame.destinationOptionCount ? `${frame.destinationOptionCount} destinos` : "",
        frame.activeStopIndex && frame.progressStopCount ? `${frame.activeStopIndex}/${frame.progressStopCount}` : "",
    ].filter(Boolean).join(" · ");
    ride.append(label, main, meta);
    parent.appendChild(ride);
    return ride;
}

function appendAndrewsRouteBoardInputTicketDimensions(parent, board = null) {
    const dimensionSlots = Array.isArray(board?.currentStation?.inputTicketFrame?.dimensionSlots)
        ? board.currentStation.inputTicketFrame.dimensionSlots
        : [];
    if (!dimensionSlots.length) {
        return null;
    }
    const hypothesisFrame = board?.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object"
        ? board.resistanceHypothesisFrame
        : null;
    const hypothesisDomains = new Set(getAndrewsRouteBoardHypothesisDomains(hypothesisFrame));
    const primaryHypothesis = getAndrewsRouteBoardPrimaryHypothesis(hypothesisFrame);
    const rail = document.createElement("div");
    rail.className = "andrews-route-board__ticket-dimensions";
    rail.dataset.ticketDimensionCount = String(dimensionSlots.length);
    rail.dataset.ticketDimensions = serializeAndrewsRouteBoardTicketDimensions(dimensionSlots);
    rail.dataset.hypothesisDomains = Array.from(hypothesisDomains).join("+");
    dimensionSlots.forEach((entry) => {
        const chip = document.createElement("span");
        chip.className = "andrews-route-board__ticket-dimension";
        chip.dataset.dimensionId = entry.id || "";
        chip.dataset.dimensionStatus = entry.status || "";
        chip.dataset.dimensionValue = entry.value || "";
        if (hypothesisDomains.has(entry.id)) {
            chip.dataset.hypothesisDomain = "candidate-obstacle";
            chip.dataset.hypothesisTestId = primaryHypothesis?.hypothesisTestId || "";
            chip.dataset.hypothesisPValue = primaryHypothesis?.pValue === null || primaryHypothesis?.pValue === undefined
                ? ""
                : String(primaryHypothesis.pValue);
            chip.title = getAndrewsRouteBoardHypothesisActionLabel(primaryHypothesis, hypothesisFrame);
        }
        const label = document.createElement("span");
        label.className = "andrews-route-board__ticket-dimension-label";
        label.textContent = entry.label || entry.id || "";
        const value = document.createElement("span");
        value.className = "andrews-route-board__ticket-dimension-value";
        value.textContent = getAndrewsRouteBoardTicketDimensionStatusLabel(entry.status);
        chip.append(label, value);
        rail.appendChild(chip);
    });
    parent.appendChild(rail);
    return rail;
}

function appendAndrewsRouteBoardStationLine(parent, board = null) {
    const frame = board?.stationLineFrame && typeof board.stationLineFrame === "object"
        ? board.stationLineFrame
        : (board?.passengerFrame?.stationLineFrame && typeof board.passengerFrame.stationLineFrame === "object"
            ? board.passengerFrame.stationLineFrame
            : null);
    const stops = Array.isArray(frame?.stops) ? frame.stops : [];
    if (!frame || !stops.length) {
        return null;
    }
    const line = document.createElement("div");
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
    stops.forEach((entry) => {
        const stop = document.createElement("span");
        stop.className = "andrews-route-board__station-line-stop";
        stop.dataset.stopId = entry.id || "";
        stop.dataset.stopRole = entry.role || "";
        stop.dataset.stopStatus = entry.status || "";
        stop.dataset.stationKey = entry.stationKey || "";
        if (entry.id && entry.id === frame.activeStopId) {
            stop.dataset.stopActive = "true";
        }
        const marker = document.createElement("span");
        marker.className = "andrews-route-board__station-line-marker";
        marker.setAttribute("aria-hidden", "true");
        const label = document.createElement("span");
        label.className = "andrews-route-board__station-line-label";
        label.textContent = entry.label || entry.block || entry.id || "";
        const value = document.createElement("span");
        value.className = "andrews-route-board__station-line-value";
        value.textContent = entry.displayLabel || "";
        stop.append(marker, label, value);
        line.appendChild(stop);
    });
    parent.appendChild(line);
    return line;
}

function getAndrewsRouteBoardActiveSourceLayer(board = null) {
    const stages = Array.isArray(board?.sourceCandidateStages)
        ? board.sourceCandidateStages
        : [];
    const routeStops = Array.isArray(board?.recommendedRoute?.routeStops)
        ? board.recommendedRoute.routeStops
        : [];
    const activeSourceKey = board?.passengerFrame?.primarySourceStageKey
        || board?.passengerFrame?.primarySourceKey
        || board?.stationLineFrame?.sourceKey
        || routeStops[0]?.key
        || board?.currentStation?.key
        || "";
    const matchedLayer = stages.find((entry) => entry?.key && entry.key === activeSourceKey)
        || stages.find((entry) => entry?.key && entry.key === board?.currentStation?.key)
        || null;
    return {
        key: matchedLayer?.key || activeSourceKey,
        label: matchedLayer?.label || board?.passengerFrame?.primarySourceLabel || board?.stationLineFrame?.sourceLabel || "",
        role: matchedLayer?.sourceRole || "",
    };
}

function appendAndrewsRouteBoardSourceLayers(parent, board = null) {
    const stages = Array.isArray(board?.sourceCandidateStages)
        ? board.sourceCandidateStages
        : [];
    if (stages.length < 2) {
        return null;
    }
    const activeSourceLayer = getAndrewsRouteBoardActiveSourceLayer(board);
    const activeSourceKey = activeSourceLayer.key || "";
    const layerWrap = document.createElement("div");
    layerWrap.className = "andrews-route-board__source-layers";
    layerWrap.dataset.sourceLayerModel = "formula-source-layers-route-board";
    layerWrap.dataset.sourceLayerCount = String(stages.length);
    layerWrap.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(stages);
    layerWrap.dataset.currentStation = board?.currentStation?.key || "";
    layerWrap.dataset.sourceLayerActiveStation = activeSourceKey;
    layerWrap.dataset.sourceLayerActiveRole = activeSourceLayer.role || "";
    layerWrap.dataset.activeSourceStation = activeSourceKey;
    layerWrap.dataset.activeSourceRole = activeSourceLayer.role || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__source-layer-label";
    label.textContent = "Capas fuente";
    const rail = document.createElement("span");
    rail.className = "andrews-route-board__source-layer-rail";
    const ariaLabels = [];
    stages.forEach((entry, index) => {
        const stageKey = entry?.key || "";
        const chip = document.createElement("span");
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
        const name = document.createElement("span");
        name.className = "andrews-route-board__source-layer-name";
        name.textContent = entry?.label || stageKey || "";
        const role = document.createElement("span");
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
    const frame = journey?.sourceLayerFrame && typeof journey.sourceLayerFrame === "object"
        ? journey.sourceLayerFrame
        : null;
    const layers = Array.isArray(frame?.layers) ? frame.layers : [];
    if (!frame || layers.length < 2) {
        return null;
    }
    const activeSourceKey = frame.activeSourceKey || "";
    const layerWrap = document.createElement("div");
    layerWrap.className = "andrews-route-board__source-layers andrews-route-board__source-layers--journey";
    layerWrap.dataset.sourceLayerModel = frame.layerModel || "";
    layerWrap.dataset.sourceLayerCount = String(frame.sourceLayerCount || layers.length);
    layerWrap.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(layers);
    layerWrap.dataset.sourceLayerActiveStation = activeSourceKey;
    layerWrap.dataset.sourceLayerActiveRole = frame.activeSourceRole || "";
    layerWrap.dataset.activeSourceStation = activeSourceKey;
    layerWrap.dataset.activeSourceRole = frame.activeSourceRole || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__source-layer-label";
    label.textContent = "Origen";
    const rail = document.createElement("span");
    rail.className = "andrews-route-board__source-layer-rail";
    const ariaLabels = [];
    layers.forEach((entry, index) => {
        const stageKey = entry?.key || "";
        const sourceRole = entry?.sourceRole || "";
        const chip = document.createElement("span");
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
        const name = document.createElement("span");
        name.className = "andrews-route-board__source-layer-name";
        name.textContent = entry?.label || stageKey || "";
        const role = document.createElement("span");
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
    const frame = board?.concourseFrame && typeof board.concourseFrame === "object"
        ? board.concourseFrame
        : null;
    const stops = Array.isArray(frame?.stops) ? frame.stops : [];
    if (!frame || !stops.length) {
        return null;
    }
    const concourse = document.createElement("div");
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
    concourse.dataset.passengerEvents = Array.isArray(frame.passengerEvents)
        ? frame.passengerEvents.join("|")
        : "";
    const stopRail = document.createElement("span");
    stopRail.className = "andrews-route-board__concourse-stops";
    const stopLabels = [];
    stops.forEach((entry) => {
        const stop = document.createElement("span");
        stop.className = "andrews-route-board__concourse-stop";
        stop.dataset.stopId = entry.id || "";
        stop.dataset.stopStatus = entry.status || "";
        stop.dataset.stationKey = entry.stationKey || "";
        const label = document.createElement("span");
        label.className = "andrews-route-board__concourse-label";
        label.textContent = entry.label || entry.id || "";
        const value = document.createElement("span");
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
        const action = document.createElement("span");
        action.className = "andrews-route-board__concourse-action";
        action.textContent = frame.actionLabel;
        concourse.appendChild(action);
    }
    if (stopLabels.length || frame.actionLabel) {
        concourse.setAttribute("aria-label", [
            ...stopLabels,
            frame.actionLabel || "",
        ].filter(Boolean).join(" · "));
    }
    parent.appendChild(concourse);
    return concourse;
}

function appendAndrewsRouteBoardPlatforms(parent, board = null) {
    const frame = board?.platformFrame && typeof board.platformFrame === "object"
        ? board.platformFrame
        : null;
    const tracks = Array.isArray(frame?.tracks) ? frame.tracks : [];
    if (!frame || !tracks.length) {
        return null;
    }
    const boardEl = document.createElement("div");
    boardEl.className = "andrews-route-board__platform-board";
    boardEl.dataset.platformModel = frame.platformModel || "";
    boardEl.dataset.currentIntention = frame.currentIntention || "";
    boardEl.dataset.sourceStation = frame.sourceKey || "";
    boardEl.dataset.recommendedRouteIds = Array.isArray(frame.recommendedRouteIds) ? frame.recommendedRouteIds.join("|") : "";
    boardEl.dataset.visibleTrackCount = String(frame.visibleTrackCount || tracks.length);
    boardEl.dataset.destinationOptionCount = String(frame.destinationOptionCount || 0);
    boardEl.dataset.platformTracks = serializeAndrewsRouteBoardPlatformTracks(tracks);
    boardEl.dataset.passengerEvents = Array.isArray(frame.passengerEvents) ? frame.passengerEvents.join("|") : "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__platform-label";
    label.textContent = "Andenes";
    const rail = document.createElement("span");
    rail.className = "andrews-route-board__platforms";
    const ariaLabels = [];
    tracks.forEach((entry) => {
        const routePathLabel = entry.routePathLabel || [
            entry.sourceLabel || "",
            entry.destinationLabel || "",
        ].filter(Boolean).join(" > ");
        const track = document.createElement("span");
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
        const heading = document.createElement("span");
        heading.className = "andrews-route-board__platform-heading";
        heading.textContent = entry.label || "";
        const destination = document.createElement("span");
        destination.className = "andrews-route-board__platform-destination";
        destination.textContent = routePathLabel || entry.destinationLabel || "";
        const meta = document.createElement("span");
        meta.className = "andrews-route-board__platform-meta";
        meta.textContent = [
            entry.actionLabel || "",
            entry.segmentCount === 1 ? "1 tramo" : `${entry.segmentCount || 1} tramos`,
            entry.resistanceScore ? `R${entry.resistanceScore}` : "",
        ].filter(Boolean).join(" · ");
        const ariaLabel = [
            heading.textContent,
            destination.textContent,
            meta.textContent,
        ].filter(Boolean).join(" · ");
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
    const receipt = document.createElement("div");
    receipt.className = "andrews-route-board__journey";
    receipt.dataset.routeIds = journey.routeIds.join("|");
    receipt.dataset.routeStops = journey.routeStops.map((stop) => stop.key || stop.label).join("|");
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
    receipt.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey
        || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key
        || "";
    const sourceLayerFrame = journey.sourceLayerFrame && typeof journey.sourceLayerFrame === "object"
        ? journey.sourceLayerFrame
        : null;
    receipt.dataset.sourceLayerModel = sourceLayerFrame?.layerModel || "";
    receipt.dataset.sourceLayerCount = String(sourceLayerFrame?.sourceLayerCount || 0);
    receipt.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(sourceLayerFrame?.layers || []);
    receipt.dataset.sourceLayerActiveStation = sourceLayerFrame?.activeSourceKey || "";
    receipt.dataset.sourceLayerActiveRole = sourceLayerFrame?.activeSourceRole || "";
    const routeActionFrame = journey.routeActionFrame && typeof journey.routeActionFrame === "object"
        ? journey.routeActionFrame
        : {};
    const passengerFrame = journey.passengerFrame && typeof journey.passengerFrame === "object"
        ? journey.passengerFrame
        : {};
    receipt.dataset.routeActionLabel = routeActionFrame.actionLabel || "";
    receipt.dataset.routeRecommendation = routeActionFrame.recommendationRole || "";
    receipt.dataset.routeBoardModel = passengerFrame.routeBoardModel || "";
    receipt.dataset.journeyModel = passengerFrame.journeyModel || "";
    receipt.dataset.passengerIntention = passengerFrame.currentIntention || "";
    receipt.dataset.passengerIntentionModel = passengerFrame.intentionFrame?.intentionModel || "";
    receipt.dataset.passengerRouteProvisionMode = passengerFrame.intentionFrame?.routeProvisionMode || "";
    receipt.dataset.passengerIntentions = serializeAndrewsRouteBoardIntentions(passengerFrame.intentionFrame);
    receipt.dataset.passengerPrimaryActionLabel = passengerFrame.primaryActionLabel || "";
    receipt.dataset.passengerPrimaryRoutePathLabel = passengerFrame.primaryRoutePathLabel
        || receipt.dataset.routePathLabel
        || "";
    receipt.dataset.passengerPrimaryRouteIds = Array.isArray(passengerFrame.primaryRouteIds)
        ? passengerFrame.primaryRouteIds.join("|")
        : "";
    receipt.dataset.passengerPrimaryNextSource = passengerFrame.primaryNextSourceStageKey || "";
    receipt.dataset.passengerEvents = Array.isArray(passengerFrame.passengerEvents)
        ? passengerFrame.passengerEvents.join("|")
        : "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__journey-label";
    label.textContent = "Actual";
    const main = document.createElement("span");
    main.className = "andrews-route-board__journey-main";
    main.textContent = receipt.dataset.routePathLabel;
    const meta = document.createElement("span");
    meta.className = "andrews-route-board__journey-meta";
    meta.textContent = [
        journey.resistanceRoleLabel || "",
        journey.resistanceScore ? `R${journey.resistanceScore}` : "",
        journey.segmentCount === 1 ? "1 tramo" : `${journey.segmentCount} tramos`,
        journey.hiddenCoordinateCount ? `${journey.hiddenCoordinateCount} coords` : "",
        journey.tripKind === "transfer" ? "trasbordo" : "",
    ].filter(Boolean).join(" · ");
    receipt.append(label, main, meta);
    appendAndrewsRouteBoardRouteConditions(receipt, routeConditionFrames);
    appendAndrewsRouteBoardJourneySourceLayers(receipt, journey);
    appendAndrewsRouteBoardRouteStops(receipt, journey.routeStops);
    appendAndrewsRouteBoardDimensions(receipt, journey.gateDomainCounts, {
        hypothesisFrame: board?.resistanceHypothesisFrame || null,
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
    const receipt = document.createElement("div");
    receipt.className = "andrews-route-board__journey andrews-route-board__journey--continued";
    receipt.dataset.continuationState = journey.continuationState || "continued-as-next-source";
    receipt.dataset.routeIds = Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "";
    receipt.dataset.routeStops = Array.isArray(journey.routeStops)
        ? journey.routeStops.map((stop) => stop.key || stop.label).join("|")
        : "";
    receipt.dataset.routePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(journey);
    receipt.dataset.sourceStation = journey.sourceKey || "";
    receipt.dataset.destinationStation = journey.destinationKey || "";
    const passengerFrame = journey.passengerFrame && typeof journey.passengerFrame === "object"
        ? journey.passengerFrame
        : {};
    receipt.dataset.passengerPrimaryRoutePathLabel = passengerFrame.primaryRoutePathLabel
        || receipt.dataset.routePathLabel
        || "";
    receipt.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
    receipt.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
    receipt.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey
        || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key
        || "";
    const sourceLayerFrame = journey.sourceLayerFrame && typeof journey.sourceLayerFrame === "object"
        ? journey.sourceLayerFrame
        : null;
    receipt.dataset.sourceLayerModel = sourceLayerFrame?.layerModel || "";
    receipt.dataset.sourceLayerCount = String(sourceLayerFrame?.sourceLayerCount || 0);
    receipt.dataset.sourceLayers = serializeAndrewsRouteBoardSourceLayers(sourceLayerFrame?.layers || []);
    receipt.dataset.sourceLayerActiveStation = sourceLayerFrame?.activeSourceKey || "";
    receipt.dataset.sourceLayerActiveRole = sourceLayerFrame?.activeSourceRole || "";
    receipt.dataset.gateDomains = serializeAndrewsRouteBoardGateDomains(journey.gateDomainCounts || []);
    receipt.dataset.resistanceScore = String(journey.resistanceScore || 0);
    receipt.dataset.resistanceRole = journey.resistanceRole || "";
    const label = document.createElement("span");
    label.className = "andrews-route-board__journey-label";
    label.textContent = "Trasbordo";
    const main = document.createElement("span");
    main.className = "andrews-route-board__journey-main";
    main.textContent = receipt.dataset.routePathLabel;
    const meta = document.createElement("span");
    meta.className = "andrews-route-board__journey-meta";
    meta.textContent = [
        journey.targetActionLabel || journey.routeActionFrame?.actionLabel || "",
        journey.resistanceRoleLabel || "",
        journey.resistanceScore ? `R${journey.resistanceScore}` : "",
    ].filter(Boolean).join(" · ");
    receipt.append(label, main, meta);
    appendAndrewsRouteBoardRouteConditions(receipt, routeConditionFrames);
    appendAndrewsRouteBoardJourneySourceLayers(receipt, journey);
    appendAndrewsRouteBoardRouteStops(receipt, journey.routeStops);
    appendAndrewsRouteBoardDimensions(receipt, journey.gateDomainCounts, {
        hypothesisFrame: board?.resistanceHypothesisFrame || null,
    });
    parent.appendChild(receipt);
    return receipt;
}

function renderAndrewsRouteBoardJourneyHistory(parent, board = null) {
    const history = getAndrewsRouteBoardJourneyHistoryForBoard(board);
    if (!history.length) {
        return null;
    }
    const itinerary = document.createElement("div");
    itinerary.className = "andrews-route-board__itinerary";
    itinerary.dataset.journeyHistoryLegCount = String(history.length);
    itinerary.dataset.journeyHistoryRouteIds = history
        .map((journey) => (Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : ""))
        .filter(Boolean)
        .join("||");
    itinerary.dataset.journeyHistoryStations = history
        .map((journey) => [journey.sourceKey || "", journey.destinationKey || ""].filter(Boolean).join(">"))
        .filter(Boolean)
        .join("|");
    itinerary.dataset.journeyHistoryRoutePaths = history
        .map((journey) => getAndrewsRouteBoardJourneyRoutePathLabel(journey))
        .filter(Boolean)
        .join("|");
    const label = document.createElement("span");
    label.className = "andrews-route-board__itinerary-label";
    label.textContent = "Ruta";
    itinerary.appendChild(label);
    history.forEach((journey, index) => {
        const routeConditionFrames = cloneAndrewsRouteBoardRouteConditionFrames(journey.routeConditionFrames);
        const leg = document.createElement("span");
        leg.className = "andrews-route-board__itinerary-leg";
        leg.dataset.legIndex = String(index + 1);
        leg.dataset.routeIds = Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : "";
        leg.dataset.sourceStation = journey.sourceKey || "";
        leg.dataset.destinationStation = journey.destinationKey || "";
        leg.dataset.routePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(journey);
        leg.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
        leg.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
        leg.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey
            || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key
            || "";
        const main = document.createElement("span");
        main.className = "andrews-route-board__itinerary-main";
        main.textContent = `${index + 1}. ${leg.dataset.routePathLabel}`;
        const meta = document.createElement("span");
        meta.className = "andrews-route-board__itinerary-meta";
        meta.textContent = [
            journey.routeActionFrame?.actionLabel || journey.targetActionLabel || "",
            journey.resistanceScore ? `R${journey.resistanceScore}` : "",
        ].filter(Boolean).join(" · ");
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
    const list = document.createElement("div");
    list.className = "andrews-route-board__routes";
    if (!visibleRoutes.length) {
        const empty = document.createElement("div");
        empty.className = "andrews-route-board__empty";
        empty.textContent = isDestinationBoard ? "Sin trayecto desde esta estacion." : "Sin salidas desde esta estacion.";
        list.appendChild(empty);
        parent.appendChild(list);
        return;
    }
    visibleRoutes.slice(0, 4).forEach((entry) => {
        const routeIds = Array.isArray(entry.routeIds) ? entry.routeIds : [entry.routeId || ""].filter(Boolean);
        const route = Array.isArray(entry.routes) ? entry.routes[0] : entry;
        const routeTicket = entry.routeTicket || route?.routeTicket || null;
        const routeActionFrame = entry.routeActionFrame && typeof entry.routeActionFrame === "object"
            ? entry.routeActionFrame
            : null;
        const routeStops = getAndrewsRouteBoardRouteStops(entry, route, routeTicket);
        const routeConditionFrames = getAndrewsRouteBoardRouteConditionFrames(entry, route, routeTicket);
        const gateDomainCounts = getAndrewsRouteBoardGateDomainCounts(entry, route, routeTicket);
        const routeLoopState = getAndrewsRouteBoardRouteLoopState(entry, route, board);
        const routeLoopCount = getAndrewsRouteBoardRouteLoopCount(entry, route, board);
        const routeLoopLabel = getAndrewsRouteBoardLoopStateLabel(routeLoopState, routeLoopCount);
        const routePathLabel = getAndrewsRouteBoardEntryRoutePathLabel(entry) || routeStops.map((stop) => stop.label || stop.key).join(" > ");
        const routeSourceStop = routeStops[0] || null;
        const routeDestinationStop = routeStops[routeStops.length - 1] || null;
        const hypothesisDomains = getAndrewsRouteBoardHypothesisDomains(board?.resistanceHypothesisFrame || null);
        const gateDomainSet = new Set(gateDomainCounts.map((item) => item.value));
        const hypothesisHitCount = hypothesisDomains.filter((domain) => gateDomainSet.has(domain)).length;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "andrews-route-board__route";
        button.dataset.routeIds = routeIds.join("|");
        button.dataset.routeStops = routeStops.map((stop) => stop.key || stop.label).join("|");
        button.dataset.routePathLabel = routePathLabel;
        button.dataset.routeSource = routeSourceStop?.key || "";
        button.dataset.routeSourceLabel = routeSourceStop?.label || "";
        button.dataset.routeDestinationLabel = routeDestinationStop?.label || "";
        button.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(routeConditionFrames);
        button.dataset.routeIfStage = routeConditionFrames[0]?.sourceKey || routeConditionFrames[0]?.ifStage?.key || "";
        button.dataset.routeThenStage = routeConditionFrames[routeConditionFrames.length - 1]?.targetKey
            || routeConditionFrames[routeConditionFrames.length - 1]?.thenStage?.key
            || "";
        button.dataset.routeGateDomains = serializeAndrewsRouteBoardGateDomains(gateDomainCounts);
        button.dataset.routeLoopState = routeLoopState;
        button.dataset.routeLoopLabel = routeLoopLabel;
        button.dataset.routeLoopCount = String(routeLoopCount || 0);
        button.dataset.routeHypothesisDomains = hypothesisDomains.join("+");
        button.dataset.routeHypothesisHitCount = String(hypothesisHitCount);
        button.dataset.routeHypothesisHit = String(Boolean(hypothesisDomains.length && hypothesisHitCount === hypothesisDomains.length));
        button.dataset.routeDestination = entry?.targetAction?.targetStageKey
            || route?.targetAction?.targetStageKey
            || route?.targetStageKey
            || entry.targetStageKey
            || "";
        button.dataset.routeEntryBoard = entry?.targetAction?.entryBoard
            || route?.targetAction?.entryBoard
            || "";
        button.dataset.routeUnitMode = entry?.targetAction?.unitMode
            || route?.targetAction?.unitMode
            || "";
        button.dataset.routeSegmentCount = String(entry.segmentCount || route?.segmentCount || routeTicket?.segmentCount || 1);
        button.dataset.routeTransferCount = String(entry.transferCount || route?.transferCount || routeTicket?.transferCount || 0);
        button.dataset.routeTripKind = entry.tripKind || route?.tripKind || routeTicket?.tripKind || "";
        button.dataset.routeHiddenCoordinateCount = String(
            entry.hiddenCoordinateCount || route?.hiddenCoordinateCount || routeTicket?.hiddenCoordinateCount || 0
        );
        button.dataset.routeResistanceScore = String(entry.resistanceScore || route?.resistanceScore || routeTicket?.resistanceScore || 0);
        button.dataset.routeObstacleCount = String(entry.obstacleCount || route?.obstacleCount || routeTicket?.obstacleCount || 0);
        button.dataset.routeResistanceRank = String(entry.resistanceRank || route?.resistanceRank || routeTicket?.resistanceRank || 0);
        button.dataset.routeStandardScore = entry.standardScoreLabel || route?.standardScoreLabel || routeTicket?.standardScoreLabel || "";
        const resistanceRole = routeIds.join("|") === leastVisibleRouteIds
            ? "least"
            : (routeIds.join("|") === mostVisibleRouteIds ? "most" : "");
        button.dataset.routeResistanceRole = resistanceRole;
        const recommendationRole = routeIds.join("|") === recommendedRouteIds
            ? (isDestinationBoard ? "arrival" : "next")
            : "alternate";
        const resolvedRecommendationRole = routeActionFrame?.recommendationRole || recommendationRole;
        button.dataset.routeRecommendation = resolvedRecommendationRole;
        button.dataset.routeActionLabel = routeActionFrame?.actionLabel || (
            resolvedRecommendationRole === "alternate"
                ? "Explorar"
                : recommendedActionLabel
        );
        const topLine = document.createElement("span");
        topLine.className = "andrews-route-board__route-topline";
        const main = document.createElement("span");
        main.className = "andrews-route-board__route-main";
        main.textContent = routePathLabel || (isDestinationBoard
            ? (entry.targetLabel || route?.targetLabel || "")
            : (route?.targetLabel || entry.targetLabel || ""));
        topLine.appendChild(main);
        if (button.dataset.routeActionLabel) {
            const recommendationBadge = document.createElement("span");
            recommendationBadge.className = "andrews-route-board__route-badge";
            recommendationBadge.dataset.routeRecommendation = resolvedRecommendationRole;
            recommendationBadge.textContent = button.dataset.routeActionLabel;
            topLine.appendChild(recommendationBadge);
        }
        const resistanceRoleLabel = getAndrewsRouteBoardResistanceRoleLabel(resistanceRole);
        if (resistanceRoleLabel) {
            const badge = document.createElement("span");
            badge.className = "andrews-route-board__route-badge";
            badge.dataset.routeResistanceRole = resistanceRole;
            badge.textContent = resistanceRoleLabel;
            topLine.appendChild(badge);
        }
        if (routeLoopLabel) {
            const loopBadge = document.createElement("span");
            loopBadge.className = "andrews-route-board__route-badge";
            loopBadge.dataset.routeLoopState = routeLoopState;
            loopBadge.textContent = routeLoopLabel;
            topLine.appendChild(loopBadge);
        }
        const trail = document.createElement("span");
        trail.className = "andrews-route-board__route-trail";
        trail.textContent = entry.routeLabel || route?.routeLabel || "";
        const meta = document.createElement("span");
        meta.className = "andrews-route-board__route-meta";
        meta.textContent = buildAndrewsRouteBoardRouteMeta(entry, route, routeTicket);
        const routeTicketLabel = entry.routeTicketLabel || route?.routeTicketLabel || routeTicket?.label || "";
        const routeStopLabel = routeStops.map((stop) => stop.label || stop.key).join(" > ");
        const routeAriaLabel = [button.dataset.routeActionLabel, routePathLabel || routeStopLabel || routeTicketLabel, meta.textContent]
            .filter(Boolean)
            .join(" · ");
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
            hypothesisFrame: board?.resistanceHypothesisFrame || null,
        });
        button.addEventListener("click", () => {
            activateAndrewsRouteBoardTarget(entry, board);
        });
        list.appendChild(button);
    });
    parent.appendChild(list);
}

function renderAndrewsRouteBoard(verbMeta = null) {
    const container = document.getElementById("andrews-route-board");
    if (!container) {
        return;
    }
    if (typeof buildAndrewsCnvCnnRouteBoard !== "function") {
        container.hidden = true;
        return;
    }
    const rawInput = getAndrewsRouteBoardRawInput(verbMeta);
    const computedSourceStage = getAndrewsRouteBoardUiSourceStage(verbMeta, { rawInput });
    const sourceStage = AndrewsRouteBoardDestinationKey
        && AndrewsRouteBoardPinnedSourceStage
        ? AndrewsRouteBoardPinnedSourceStage
        : (AndrewsRouteBoardSourceOverrideStage || computedSourceStage);
    const baseBoard = buildAndrewsCnvCnnRouteBoard({ sourceStage });
    const destinationOption = (baseBoard.destinationOptions || [])
        .find((entry) => entry.key === AndrewsRouteBoardDestinationKey);
    if (AndrewsRouteBoardDestinationKey && !destinationOption) {
        AndrewsRouteBoardDestinationKey = "";
        clearAndrewsRouteBoardPinnedJourney({ clearDestination: false });
    }
    const board = buildAndrewsCnvCnnRouteBoard({
        sourceStage,
        destinationStage: destinationOption?.stage || null,
    });
    container.hidden = false;
    container.replaceChildren();
    const header = document.createElement("div");
    header.className = "andrews-route-board__header";
    const stationRail = document.createElement("div");
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
        appendAndrewsRouteBoardPill(
            stationRail,
            "Marco",
            getAndrewsRouteBoardBoundaryKindLabel(board.currentStation.formulaBoundaryKind)
        );
    }
    if (board.currentStation?.formulaBoundaryConfidence) {
        appendAndrewsRouteBoardPill(
            stationRail,
            "Lectura",
            getAndrewsRouteBoardBoundaryConfidenceLabel(board.currentStation.formulaBoundaryConfidence)
        );
    }
    if (board.destinationStation?.label) {
        appendAndrewsRouteBoardPill(stationRail, "Destino", board.destinationStation.label);
    }
    const destinationWrap = document.createElement("label");
    destinationWrap.className = "andrews-route-board__destination";
    const destinationLabel = document.createElement("span");
    destinationLabel.textContent = "Destino";
    const destinationSelect = document.createElement("select");
    destinationSelect.className = "andrews-route-board__destination-select";
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Salidas";
    destinationSelect.appendChild(emptyOption);
    const recommendedDestinationKey = baseBoard.recommendedRoute?.nextSourceStageKey || "";
    const recommendedDestinationActionLabel = baseBoard.recommendedRoute?.actionLabel || "Siguiente";
    (baseBoard.destinationOptions || []).forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.key;
        const destinationActionFrame = entry.destinationActionFrame && typeof entry.destinationActionFrame === "object"
            ? entry.destinationActionFrame
            : (entry.routeActionFrame && typeof entry.routeActionFrame === "object" ? entry.routeActionFrame : null);
        const destinationRecommendationRole = entry.key && entry.key === recommendedDestinationKey
            ? "next"
            : "alternate";
        const resolvedDestinationRecommendationRole = destinationActionFrame?.recommendationRole || destinationRecommendationRole;
        const destinationActionLabel = destinationActionFrame?.actionLabel || (
            resolvedDestinationRecommendationRole === "next"
                ? recommendedDestinationActionLabel
                : "Explorar"
        );
        const destinationLoopState = getAndrewsRouteBoardRouteLoopState(entry, null, baseBoard);
        const destinationLoopCount = getAndrewsRouteBoardRouteLoopCount(entry, null, baseBoard);
        const destinationLoopLabel = getAndrewsRouteBoardLoopStateLabel(destinationLoopState, destinationLoopCount);
        option.textContent = buildAndrewsRouteBoardDestinationOptionLabel(entry, {
            actionLabel: destinationActionLabel,
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
        option.dataset.routeStops = routeStops.length
            ? routeStops.map((stop) => stop?.key || stop?.label || "").filter(Boolean).join("|")
            : "";
        const destinationConditionFrames = getAndrewsRouteBoardRouteConditionFrames(entry, null, entry.routeTicket || null);
        option.dataset.routeConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(destinationConditionFrames);
        option.dataset.routeIfStage = destinationConditionFrames[0]?.sourceKey || destinationConditionFrames[0]?.ifStage?.key || "";
        option.dataset.routeThenStage = destinationConditionFrames[destinationConditionFrames.length - 1]?.targetKey
            || destinationConditionFrames[destinationConditionFrames.length - 1]?.thenStage?.key
            || "";
        option.dataset.routeGateDomains = serializeAndrewsRouteBoardGateDomains(entry.gateDomainCounts || entry.routeTicket?.gateDomainCounts || []);
        option.dataset.routeSegmentCount = String(entry.segmentCount || entry.routeTicket?.segmentCount || 1);
        option.dataset.routeTransferCount = String(entry.transferCount || entry.routeTicket?.transferCount || 0);
        option.dataset.routeTripKind = entry.tripKind || entry.routeTicket?.tripKind || "";
        option.dataset.routeHiddenCoordinateCount = String(entry.hiddenCoordinateCount || entry.routeTicket?.hiddenCoordinateCount || 0);
        option.dataset.routeResistanceScore = String(entry.resistanceScore || entry.routeTicket?.resistanceScore || 0);
        option.dataset.routeObstacleCount = String(entry.obstacleCount || entry.routeTicket?.obstacleCount || 0);
        option.dataset.routeResistanceRank = String(entry.resistanceRank || entry.routeTicket?.resistanceRank || 0);
        if (entry.routeTicketLabel || entry.routeTicket?.label || destinationActionLabel) {
            option.title = [
                destinationActionLabel,
                entry.routeTicketLabel || entry.routeTicket?.label || "",
            ].filter(Boolean).join(" · ");
        }
        destinationSelect.appendChild(option);
    });
    destinationSelect.value = AndrewsRouteBoardDestinationKey;
    destinationSelect.addEventListener("change", () => {
        AndrewsRouteBoardDestinationKey = destinationSelect.value || "";
        if (!AndrewsRouteBoardDestinationKey) {
            clearAndrewsRouteBoardPinnedJourney({ clearDestination: false });
            renderAndrewsRouteBoard();
            return;
        }
        if (AndrewsRouteBoardDestinationKey) {
            AndrewsRouteBoardPinnedSourceInput = rawInput;
            AndrewsRouteBoardPinnedSourceStage = sourceStage;
            const selectedDestinationOption = (baseBoard.destinationOptions || [])
                .find((entry) => entry.key === AndrewsRouteBoardDestinationKey);
            const selectedBoard = buildAndrewsCnvCnnRouteBoard({
                sourceStage,
                destinationStage: selectedDestinationOption?.stage || null,
            });
            const selectedRoute = Array.isArray(selectedBoard.visibleRoutes)
                ? selectedBoard.visibleRoutes[0]
                : null;
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
        rawInput,
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
    const body = document.createElement("div");
    body.className = "andrews-route-board__body";
    renderAndrewsRouteBoardJourneyReceipt(body, board);
    renderAndrewsRouteBoardJourneyHistory(body, board);
    renderAndrewsRouteBoardContinuedJourneyReceipt(body, board);
    const boardLabel = document.createElement("div");
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
    container.dataset.sourceCandidateStageKeys = Array.isArray(board.sourceCandidateStageKeys)
        ? board.sourceCandidateStageKeys.join("|")
        : "";
    container.dataset.sourceCandidateStageLabels = Array.isArray(board.sourceCandidateStageLabels)
        ? board.sourceCandidateStageLabels.join("|")
        : "";
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
    container.dataset.sourceInputTicketEvents = Array.isArray(board.currentStation?.inputTicketFrame?.passengerEvents)
        ? board.currentStation.inputTicketFrame.passengerEvents.join("|")
        : "";
    container.dataset.sourceInputTicketDimensions = serializeAndrewsRouteBoardTicketDimensions(
        board.currentStation?.inputTicketFrame?.dimensionSlots || []
    );
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
    const boardPrimaryRoutePathLabel = board.passengerFrame?.primaryRoutePathLabel
        || board.recommendedRoute?.routePathLabel
        || board.recommendedRoute?.routeTicket?.routePathLabel
        || board.leastVisibleRoute?.routePathLabel
        || board.leastVisibleRoute?.routeTicket?.routePathLabel
        || "";
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
    container.dataset.platformRecommendedRouteIds = Array.isArray(board.platformFrame?.recommendedRouteIds)
        ? board.platformFrame.recommendedRouteIds.join("|")
        : "";
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
    container.dataset.rideEvents = Array.isArray(board.rideFrame?.passengerEvents)
        ? board.rideFrame.passengerEvents.join("|")
        : "";
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
    container.dataset.passengerEvents = Array.isArray(board.passengerFrame?.passengerEvents)
        ? board.passengerFrame.passengerEvents.join("|")
        : "";
    container.dataset.leastVisibleRouteIds = Array.isArray(board.leastVisibleRoute?.routeIds)
        ? board.leastVisibleRoute.routeIds.join("|")
        : "";
    container.dataset.leastVisibleResistanceScore = String(board.leastVisibleRoute?.resistanceScore || 0);
    container.dataset.recommendedRouteIds = Array.isArray(board.recommendedRoute?.routeIds)
        ? board.recommendedRoute.routeIds.join("|")
        : "";
    container.dataset.recommendedRouteActionLabel = board.recommendedRoute?.actionLabel || "";
    container.dataset.recommendedRouteNextSource = board.recommendedRoute?.nextSourceStageKey || "";
    container.dataset.recommendedRoutePathLabel = board.recommendedRoute?.routePathLabel
        || board.recommendedRoute?.routeTicket?.routePathLabel
        || "";
    container.dataset.recommendedRouteResistanceScore = String(board.recommendedRoute?.resistanceScore || 0);
    container.dataset.mostVisibleRouteIds = Array.isArray(board.mostVisibleRoute?.routeIds)
        ? board.mostVisibleRoute.routeIds.join("|")
        : "";
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
    container.dataset.resistanceConversionActionEvents = Array.isArray(board.resistanceConversionPlan?.blockActions)
        ? board.resistanceConversionPlan.blockActions.map((entry) => entry.eventFeature || "").filter(Boolean).join("|")
        : "";
    const resistanceHypothesis = board.resistanceHypothesisFrame && typeof board.resistanceHypothesisFrame === "object"
        ? board.resistanceHypothesisFrame
        : {};
    const primaryHypothesis = resistanceHypothesis.primaryCandidateObstacle
        || resistanceHypothesis.primaryTest
        || resistanceHypothesis.highResistanceGateTest
        || {};
    container.dataset.resistanceHypothesisDecision = resistanceHypothesis.nullHypothesisDecision || "";
    container.dataset.resistanceHypothesisTestId = primaryHypothesis.hypothesisTestId || "";
    container.dataset.resistanceHypothesisKey = primaryHypothesis.key || "";
    container.dataset.resistanceHypothesisCandidate = resistanceHypothesis.primaryCandidateObstacle?.key || "";
    container.dataset.resistanceHypothesisDomains = Array.isArray(primaryHypothesis.domains)
        ? primaryHypothesis.domains.join("+")
        : "";
    container.dataset.resistanceHypothesisPValue = primaryHypothesis.pValue === null || primaryHypothesis.pValue === undefined
        ? ""
        : String(primaryHypothesis.pValue);
    container.dataset.resistanceHypothesisQValue = primaryHypothesis.qValue === null || primaryHypothesis.qValue === undefined
        ? ""
        : String(primaryHypothesis.qValue);
    container.dataset.resistanceHypothesisAlpha = String(resistanceHypothesis.alpha || primaryHypothesis.alpha || "");
    container.dataset.resistanceHypothesisRejectsNull = String(primaryHypothesis.rejectsNullHypothesis === true);
    container.dataset.resistanceHypothesisAction = resistanceHypothesis.recommendedAction || primaryHypothesis.action || "";
    container.dataset.resistanceHypothesisActionLabel = getAndrewsRouteBoardHypothesisActionLabel(
        primaryHypothesis,
        resistanceHypothesis
    );
    const activeJourney = getAndrewsRouteBoardActiveJourneyForBoard(board);
    const continuedJourney = getAndrewsRouteBoardContinuedJourneyForBoard(board);
    const journeyHistory = getAndrewsRouteBoardJourneyHistoryForBoard(board);
    container.dataset.activeJourneyRouteIds = Array.isArray(activeJourney?.routeIds)
        ? activeJourney.routeIds.join("|")
        : "";
    container.dataset.activeJourneyStops = Array.isArray(activeJourney?.routeStops)
        ? activeJourney.routeStops.map((stop) => stop.key || stop.label).join("|")
        : "";
    container.dataset.activeJourneyRoutePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(activeJourney);
    container.dataset.activeJourneyGateDomains = Array.isArray(activeJourney?.gateDomainCounts)
        ? serializeAndrewsRouteBoardGateDomains(activeJourney.gateDomainCounts)
        : "";
    const activeJourneyConditionFrames = Array.isArray(activeJourney?.routeConditionFrames)
        ? activeJourney.routeConditionFrames
        : [];
    container.dataset.activeJourneyConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(activeJourneyConditionFrames);
    container.dataset.activeJourneyIfStage = activeJourneyConditionFrames[0]?.sourceKey
        || activeJourneyConditionFrames[0]?.ifStage?.key
        || "";
    container.dataset.activeJourneyThenStage = activeJourneyConditionFrames[activeJourneyConditionFrames.length - 1]?.targetKey
        || activeJourneyConditionFrames[activeJourneyConditionFrames.length - 1]?.thenStage?.key
        || "";
    container.dataset.activeJourneyResistanceScore = String(activeJourney?.resistanceScore || 0);
    container.dataset.activeJourneyResistanceRole = activeJourney?.resistanceRole || "";
    container.dataset.nextSourceStation = activeJourney?.nextSourceKey || "";
    container.dataset.nextSourceEntryBoard = activeJourney?.nextSourceEntryBoard || "";
    container.dataset.nextSourceUnitMode = activeJourney?.nextSourceUnitMode || "";
    container.dataset.journeyHistoryLegCount = String(journeyHistory.length);
    container.dataset.journeyHistoryRouteIds = journeyHistory
        .map((journey) => (Array.isArray(journey.routeIds) ? journey.routeIds.join("|") : ""))
        .filter(Boolean)
        .join("||");
    container.dataset.journeyHistoryStations = journeyHistory
        .map((journey) => [journey.sourceKey || "", journey.destinationKey || ""].filter(Boolean).join(">"))
        .filter(Boolean)
        .join("|");
    container.dataset.journeyHistoryRoutePaths = journeyHistory
        .map((journey) => getAndrewsRouteBoardJourneyRoutePathLabel(journey))
        .filter(Boolean)
        .join("|");
    container.dataset.continuedJourneyRouteIds = Array.isArray(continuedJourney?.routeIds)
        ? continuedJourney.routeIds.join("|")
        : "";
    container.dataset.continuedJourneyRoutePathLabel = getAndrewsRouteBoardJourneyRoutePathLabel(continuedJourney);
    container.dataset.continuedJourneyFromStation = continuedJourney?.sourceKey || "";
    container.dataset.continuedJourneyToStation = continuedJourney?.destinationKey || "";
    const continuedJourneyConditionFrames = Array.isArray(continuedJourney?.routeConditionFrames)
        ? continuedJourney.routeConditionFrames
        : [];
    container.dataset.continuedJourneyConditionFrames = serializeAndrewsRouteBoardRouteConditionFrames(continuedJourneyConditionFrames);
    container.dataset.continuedJourneyIfStage = continuedJourneyConditionFrames[0]?.sourceKey
        || continuedJourneyConditionFrames[0]?.ifStage?.key
        || "";
    container.dataset.continuedJourneyThenStage = continuedJourneyConditionFrames[continuedJourneyConditionFrames.length - 1]?.targetKey
        || continuedJourneyConditionFrames[continuedJourneyConditionFrames.length - 1]?.thenStage?.key
        || "";
}

function renderTenseTabs() {
    const container = document.getElementById("tense-tabs");
    if (!container) {
        return;
    }
    const outputUniversalContainer = document.getElementById("output-universal-tabs");
    const outputControlsContainer = document.getElementById("output-result-controls");
    const focusState = captureTenseTabsFocusState(container)
        || captureTenseTabsFocusState(outputUniversalContainer);
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    updateTenseModeTabs();
    const currentCombinedMode = getCombinedMode();
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && currentCombinedMode === COMBINED_MODE.nonactive;
    document.body.classList.toggle("is-nonactive-mode", isNonactiveMode);
    const verbMeta = getVerbInputMeta();
    const verb = verbMeta.verb;
    const analysisVerb = verbMeta.analysisVerb || verb;
    const displayVerb = verbMeta.displayVerb;
    renderDerivationAntiderivativePanel(verbMeta);
    let suppletiveStemSet = getSuppletiveStemSet(verbMeta);
    const isWitzInput = (
        verbMeta.rawAnalysisVerb === "witz"
        || verbMeta.analysisVerb === "witz"
        || verbMeta.verb === "witz"
    );
    const endsWithConsonant = verb !== "" && !VOWEL_END_RE.test(verb) && !isWitzInput;
    const hasVerb = verb !== "" && VOWEL_RE.test(verb);
    const tenseMode = getActiveTenseMode();
    renderAndrewsRouteBoard(verbMeta);
    if (tenseMode === TENSE_MODE.particula) {
        container.innerHTML = "";
        TenseTabsDomSignature = "particula";
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
    const sourceScope = getVerbSourceScope();
    const nonactiveSuffixOptionMap = tenseMode === TENSE_MODE.verbo
        ? resolveNonactiveSuffixOptionMap({ verbMeta, verb, analysisVerb })
        : new Map();
    const selectedNonactiveSuffix = tenseMode === TENSE_MODE.verbo
        ? normalizeSelectedNonactiveSuffix(nonactiveSuffixOptionMap)
        : null;
    const allowedTensesRaw = getTenseOrderForMode(tenseMode);
    const allowedTenses = filterTenseOrderForUiDensity(allowedTensesRaw, tenseMode);
    const isNominalMode = isNominalTenseMode(tenseMode);
    const nounActiveTenses = isNominalMode
        ? getNounTenseOrderForCombinedMode(COMBINED_MODE.active, tenseMode)
        : [];
    const nounNonactiveTenses = isNominalMode
        ? getNounTenseOrderForCombinedMode(COMBINED_MODE.nonactive, tenseMode)
        : [];
    const nounVisibleTenses = isNominalMode
        ? (
            sourceScope === VERB_SOURCE_SCOPE.active
                ? nounActiveTenses
                : (sourceScope === VERB_SOURCE_SCOPE.nonactive
                    ? nounNonactiveTenses
                    : Array.from(new Set([...nounActiveTenses, ...nounNonactiveTenses])))
        )
        : [];
    const blockedNominalTenseSet = (() => {
        if (tenseMode !== TENSE_MODE.adjetivo || !hasVerb) {
            return new Set();
        }
        if (getBaseObjectSlots(verbMeta) <= 0) {
            return new Set();
        }
        return new Set(
            nounVisibleTenses.filter((tenseValue) => isIntransitiveOnlyActiveAdjectiveTense(tenseValue))
        );
    })();
    const dualSourceNominalTenses = new Set(["patientivo"]);
    const nonactiveNominalSet = new Set(nounNonactiveTenses);
    const activeColumnTenses = isNominalMode
        ? nounActiveTenses.filter((tenseValue) => (
            !nonactiveNominalSet.has(tenseValue)
            || dualSourceNominalTenses.has(tenseValue)
        ))
        : [];
    const visibleTenses = isNominalMode
        ? nounVisibleTenses
        : allowedTenses;
    const verbSemanticGroups = (!isNominalMode && tenseMode === TENSE_MODE.verbo)
        ? getVerbSemanticTenseGroups(visibleTenses)
        : [];
    const modeGroups = buildFormalReroutedFunctionTenseGroups(tenseMode, visibleTenses)
        || TENSE_LINGUISTIC_GROUPS[tenseMode]
        || TENSE_LINGUISTIC_GROUPS.verbo;
    const visibleTenseSet = new Set(visibleTenses);
    let requestedSelectionState = getCurrentResolvedConjugationSelectionState({ tenseMode });
    const selectedTenseValue = requestedSelectionState.tenseValue;
    if (
        !visibleTenseSet.has(selectedTenseValue)
        || blockedNominalTenseSet.has(selectedTenseValue)
    ) {
        requestedSelectionState = {
            ...requestedSelectionState,
            tenseValue: visibleTenses.find((tenseValue) => !blockedNominalTenseSet.has(tenseValue))
                || allowedTenses.find((tenseValue) => !blockedNominalTenseSet.has(tenseValue))
                || TENSE_ORDER.find((tenseValue) => !blockedNominalTenseSet.has(tenseValue))
                || visibleTenses[0]
                || allowedTenses[0]
                || TENSE_ORDER[0],
        };
    }
    const shouldShowUniversalTabs = tenseMode === TENSE_MODE.verbo;
    const shouldComputeUniversalAvailability = shouldShowUniversalTabs && VerbRenderContext !== "typing";
    let availability = shouldShowUniversalTabs ? PreteritoUniversalAvailabilityCache : [];
    if (shouldShowUniversalTabs) {
        const needsAvailabilityCompute = shouldComputeUniversalAvailability
            || !Array.isArray(availability)
            || availability.length !== PRETERITO_UNIVERSAL_ORDER.length;
        if (needsAvailabilityCompute) {
            const isTransitive = isObj1ValencyFilled(getCurrentObjectPrefix(), verbMeta);
            const derivationType = verbMeta.derivationType || getActiveDerivationType();
            let availabilityTargets = [{
                verb,
                analysisVerb,
                isYawi: verbMeta.isYawi,
                isWeya: verbMeta.isWeya,
            }];
            if (derivationType === DERIVATION_TYPE.causative) {
                const causativeDerivation = applyCausativeDerivation({
                    isCausative: true,
                    verb,
                    analysisVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                    parsedVerb: verbMeta,
                    directionalPrefix: verbMeta.directionalPrefix,
                    isYawi: verbMeta.isYawi,
                    suppletiveStemSet,
                });
                if (causativeDerivation.noCausativeStem) {
                    availabilityTargets = [];
                } else {
                    const stems = Array.isArray(causativeDerivation.causativeAllStems)
                        && causativeDerivation.causativeAllStems.length
                        ? causativeDerivation.causativeAllStems
                        : [causativeDerivation.verb];
                    availabilityTargets = stems.map((stem) => {
                        let stemAnalysis = stem;
                        if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                            stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                        }
                        return {
                            verb: stem,
                            analysisVerb: stemAnalysis,
                            isYawi: causativeDerivation.isYawi,
                            isWeya: false,
                        };
                    });
                    suppletiveStemSet = causativeDerivation.suppletiveStemSet;
                }
            } else if (derivationType === DERIVATION_TYPE.applicative) {
                const applicativeDerivation = applyApplicativeDerivation({
                    isApplicative: true,
                    verb,
                    analysisVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                    parsedVerb: verbMeta,
                    directionalPrefix: verbMeta.directionalPrefix,
                    isYawi: verbMeta.isYawi,
                    suppletiveStemSet,
                });
                if (applicativeDerivation.noApplicativeStem) {
                    availabilityTargets = [];
                } else {
                    const stems = Array.isArray(applicativeDerivation.applicativeAllStems)
                        && applicativeDerivation.applicativeAllStems.length
                        ? applicativeDerivation.applicativeAllStems
                        : [applicativeDerivation.verb];
                    availabilityTargets = stems.map((stem) => {
                        let stemAnalysis = stem;
                        if (verbMeta.directionalPrefix && stem.startsWith(verbMeta.directionalPrefix)) {
                            stemAnalysis = stem.slice(verbMeta.directionalPrefix.length);
                        }
                        return {
                            verb: stem,
                            analysisVerb: stemAnalysis,
                            isYawi: applicativeDerivation.isYawi,
                            isWeya: false,
                        };
                    });
                    suppletiveStemSet = applicativeDerivation.suppletiveStemSet;
                }
            }
            const canResolveClassPolicy = typeof buildPretUniversalContext === "function"
                && typeof getPretUniversalVariantsByClass === "function"
                && typeof resolvePretClassPolicy === "function";
            const subjectSuffixes = ["", "t"];
            const baseObjectPrefix = getCurrentObjectPrefix();
            const resolveAllowedClassesForTarget = (target) => {
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
                const forceClassBOnly = shouldForceClassBOnlyForVerbMode({
                    tenseMode,
                    combinedMode: currentCombinedMode,
                });
                const contextOptions = typeof buildPretContextOptionsFromMeta === "function"
                    ? buildPretContextOptionsFromMeta(verbMeta, {
                        isYawi: target.isYawi,
                        isWeya: target.isWeya,
                        derivationType,
                        forceClassBOnly,
                    })
                    : {
                        isYawi: target.isYawi,
                        isWeya: target.isWeya,
                        hasSlashMarker: verbMeta.hasSlashMarker,
                        hasSuffixSeparator: verbMeta.hasSuffixSeparator,
                        hasLeadingDash: verbMeta.hasLeadingDash,
                        hasBoundMarker: verbMeta.hasBoundMarker,
                        hasCompoundMarker: verbMeta.hasCompoundMarker,
                        hasImpersonalTaPrefix: verbMeta.hasImpersonalTaPrefix,
                        hasOptionalSupportiveI: verbMeta.hasOptionalSupportiveI,
                        hasNonspecificValence: resolveHasNonspecificValence(verbMeta),
                        exactBaseVerb: verbMeta.exactBaseVerb || "",
                        rootPlusYaBase: verbMeta.rootPlusYaBase,
                        rootPlusYaBasePronounceable: verbMeta.rootPlusYaBasePronounceable,
                        derivationType,
                        forceClassBOnly,
                    };
                const context = buildPretUniversalContext(
                    target.verb,
                    analysisVerbTarget,
                    isTransitive,
                    contextOptions
                );
                if (!context) {
                    return allowed;
                }
                const variantsByClass = getPretUniversalVariantsByClass(context);
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
                    const allowsForAnySuffix = subjectSuffixes.some((suffix) => {
                        const policy = resolvePretClassPolicy({
                            context,
                            tense: "preterito",
                            isTransitive,
                            classFilter: classKey,
                            baseObjectPrefix,
                            hasClassA,
                            hasClassB,
                            allowAllClasses: false,
                            subjectSuffix: suffix,
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
                    resolveAllowedClassesForTarget(null).forEach((classKey) => allowedClasses.add(classKey));
                } else if (availabilityTargets.length) {
                    availabilityTargets.forEach((target) => {
                        resolveAllowedClassesForTarget(target).forEach((classKey) => allowedClasses.add(classKey));
                    });
                }
            }
            if (!canResolveClassPolicy && availabilityTargets.length) {
                availabilityTargets.forEach((target) => {
                    PRETERITO_UNIVERSAL_ORDER.forEach((tenseValue) => {
                        const variants = getPretUniversalVariants(
                            target.verb,
                            tenseValue,
                            isTransitive,
                            target.analysisVerb,
                            buildPretVariantsOptionsFromMeta(verbMeta, {
                                isYawi: target.isYawi,
                                isWeya: target.isWeya,
                                derivationType,
                            })
                        );
                        if (variants && variants.length) {
                            const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
                            if (classKey) {
                                allowedClasses.add(classKey);
                            }
                        }
                    });
                });
            }
            availability = PRETERITO_UNIVERSAL_ORDER.map((tenseValue) => {
                const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
                const isAvailable = hasVerb
                    && !!(classKey && allowedClasses.has(classKey));
                return buildTenseAvailabilityRecord({
                    tenseValue,
                    combinedMode: COMBINED_MODE.active,
                    source: "pret-universal-class",
                    available: isAvailable,
                    hasOutput: isAvailable,
                });
            });
            PreteritoUniversalAvailabilityCache = availability;
        }
    } else {
        PreteritoUniversalAvailabilityCache = [];
        availability = [];
    }
    const selectionState = resolveConjugationSelectionState(requestedSelectionState, {
        tenseMode,
        availabilityEntries: availability,
    });
    const rawSelectionState = buildConjugationSelectionState({ tenseMode });
    if (
        rawSelectionState.group !== selectionState.group
        || rawSelectionState.tenseValue !== selectionState.tenseValue
        || rawSelectionState.universalTenseValue !== selectionState.universalTenseValue
        || rawSelectionState.classFilter !== selectionState.classFilter
    ) {
        applyResolvedConjugationSelectionState(selectionState);
    }
    const activeGroup = selectionState.group;
    const selectedTense = selectionState.tenseValue;
    const isClassTenseSelected = PRETERITO_CLASS_TENSES.has(selectedTense);
    const tenseOutputCache = new Map();
    const shouldComputeTenseOutput = VerbRenderContext !== "typing";
    const availabilityProbeMemo = new Map();
    const availabilityMemoContextByMode = new Map();
    const getAvailabilityMemoContextForMode = (combinedMode = COMBINED_MODE.active) => {
        const resolvedCombinedMode = combinedMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        if (!availabilityMemoContextByMode.has(resolvedCombinedMode)) {
            const modeIsNonactive = resolvedCombinedMode === COMBINED_MODE.nonactive;
            availabilityMemoContextByMode.set(
                resolvedCombinedMode,
                buildAvailabilityMemoContext({
                    tenseMode,
                    isNonactiveMode: modeIsNonactive,
                    derivationType: verbMeta.derivationType || getActiveDerivationType(),
                    derivationMode: modeIsNonactive ? DERIVATION_MODE.nonactive : DERIVATION_MODE.active,
                    voiceMode: modeIsNonactive ? VOICE_MODE.passive : VOICE_MODE.active,
                })
            );
        }
        return availabilityMemoContextByMode.get(resolvedCombinedMode);
    };
    const verbOutputContextsByMode = (() => {
        if (tenseMode !== TENSE_MODE.verbo) {
            return null;
        }
        const subjectSelections = getSubjectPersonSelections();
        const fusionMarkers = verbMeta.isTaFusion
            ? (verbMeta.fusionPrefixes || []).filter((prefix) => FUSION_PREFIXES.has(prefix))
            : [];
        const buildVerbOutputContextForMode = (modeIsNonactive = false) => {
            const nonactiveConfig = modeIsNonactive ? getNonactiveObjectPrefixGroups(verbMeta) : null;
            const objectPrefixGroups = getVerbObjectPrefixGroups(verbMeta, modeIsNonactive, nonactiveConfig);
            const objectPrefixes = Array.from(new Set(
                objectPrefixGroups.flatMap((group) => group.prefixes)
            ));
            const valencySummary = modeIsNonactive ? getVerbValencySummary(verbMeta) : null;
            return {
                isNonactiveMode: modeIsNonactive,
                objectPrefixes,
                objectPrefixGroups,
                subjectSelections,
                valencySummary,
                fusionMarkers,
            };
        };
        return new Map([
            [COMBINED_MODE.active, buildVerbOutputContextForMode(false)],
            [COMBINED_MODE.nonactive, buildVerbOutputContextForMode(true)],
        ]);
    })();
    const resolveTenseAvailabilityRecord = (tenseValue, combinedMode = currentCombinedMode) => {
        if (!shouldComputeTenseOutput) {
            return null;
        }
        if (!hasVerb || endsWithConsonant) {
            return null;
        }
        const resolvedCombinedMode = combinedMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        if (isNominalMode) {
            const cacheKey = `nominal:${resolvedCombinedMode}:${tenseValue}`;
            if (tenseOutputCache.has(cacheKey)) {
                return tenseOutputCache.get(cacheKey);
            }
            const availabilityRecord = resolveNominalTenseAvailabilityRecord({
                verb: displayVerb,
                tenseValue,
                tenseMode,
                combinedMode: resolvedCombinedMode,
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
            tenseOutputCache: null,
        });
        tenseOutputCache.set(cacheKey, availabilityRecord);
        return availabilityRecord;
    };
    const rerenderActiveConjugations = (tenseOverride) => {
        const currentVerb = getVerbInputMeta().displayVerb;
        const payload = {
            verb: currentVerb,
            objectPrefix: getCurrentObjectPrefix(),
        };
        if (tenseOverride !== undefined) {
            payload.tense = tenseOverride;
        }
        renderActiveConjugations(payload);
    };
    const unifiedAvailabilityMatrix = tenseMode === TENSE_MODE.verbo
        ? buildUnifiedVerbTenseAvailabilityMatrix({
            tenses: [...visibleTenses, ...PRETERITO_UNIVERSAL_ORDER],
            resolveTenseAvailabilityRecord,
        })
        : null;
    const selectedUniversal = selectionState.universalTenseValue;
    const shouldShowOutputControls = tenseMode === TENSE_MODE.verbo;
    if (outputControlsContainer) {
        outputControlsContainer.hidden = !shouldShowOutputControls;
    }
    syncVerbSourceScopeControl();
    if (!shouldShowOutputControls && outputUniversalContainer) {
        outputUniversalContainer.innerHTML = "";
        outputUniversalContainer.hidden = true;
    }
    const tenseTabsSignature = buildTenseTabsDomSignature({
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
        universalOrder: PRETERITO_UNIVERSAL_ORDER,
    });
    const shouldReuseDom = tenseMode !== TENSE_MODE.verbo && TenseTabsDomSignature === tenseTabsSignature;
    if (shouldReuseDom) {
        const updated = updateExistingTenseTabsDom({
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
            selectionState,
        });
        if (updated) {
            restoreTenseTabsFocusState(container, focusState);
            return;
        }
    }
    container.innerHTML = "";
    const buildTenseButton = (tenseValue, {
        columnKey = "",
        combinedMode = "",
    } = {}) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "tense-tab";
        button.setAttribute("role", "tab");
        button.dataset.tenseValue = tenseValue;
        button.dataset.tenseGroup = "main";
        const resolvedCombinedMode = combinedMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : (combinedMode === COMBINED_MODE.active ? COMBINED_MODE.active : "");
        if (columnKey) {
            button.dataset.tenseColumn = columnKey;
        }
        if (resolvedCombinedMode) {
            button.dataset.combinedMode = resolvedCombinedMode;
        }
        const isActive = (
            activeGroup === CONJUGATION_GROUPS.tense
            && tenseValue === selectedTense
            && (!resolvedCombinedMode || resolvedCombinedMode === currentCombinedMode)
        );
        if (isActive) {
            button.classList.add("is-active");
        }
        button.setAttribute("aria-selected", String(isActive));
        const getAvailabilityRecordForMode = (mode) => {
            const resolvedMode = mode === COMBINED_MODE.nonactive
                ? COMBINED_MODE.nonactive
                : COMBINED_MODE.active;
            return unifiedAvailabilityMatrix instanceof Map
                ? (
                    unifiedAvailabilityMatrix.get(resolvedMode)?.get(tenseValue)
                    ?? resolveTenseAvailabilityRecord(tenseValue, resolvedMode)
                )
                : resolveTenseAvailabilityRecord(tenseValue, resolvedMode);
        };
        let activeRecord = null;
        let nonactiveRecord = null;
        let availabilityRecord = null;
        const hasOutput = (() => {
            if (tenseMode === TENSE_MODE.verbo || isNominalMode) {
                activeRecord = getAvailabilityRecordForMode(COMBINED_MODE.active);
                nonactiveRecord = getAvailabilityRecordForMode(COMBINED_MODE.nonactive);
                if (!resolvedCombinedMode) {
                    if (activeRecord === null && nonactiveRecord === null) {
                        return null;
                    }
                    return resolveTenseAvailabilityHasOutput(activeRecord) === true
                        || resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
                }
            }
            const modeForButton = resolvedCombinedMode || currentCombinedMode;
            availabilityRecord = getAvailabilityRecordForMode(modeForButton);
            if (modeForButton === COMBINED_MODE.nonactive) {
                nonactiveRecord = availabilityRecord;
            } else {
                activeRecord = availabilityRecord;
            }
            return resolveTenseAvailabilityHasOutput(availabilityRecord);
        })();
        const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord) === true;
        const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
        button.dataset.availabilityState = activeRecord?.availabilityState
            || nonactiveRecord?.availabilityState
            || availabilityRecord?.availabilityState
            || "";
        const isBlockedNominalTense = blockedNominalTenseSet.has(tenseValue);
        if (hasOutput === false || isBlockedNominalTense) {
            button.classList.add("is-empty");
        }
        const label = document.createElement("span");
        label.className = "tense-tab-label";
        label.textContent = getLocalizedLabel(TENSE_LABELS[tenseValue], isNawat, tenseValue);
        button.appendChild(label);
        button.title = getAndrewsFirstTenseHoverTitle(tenseValue);
        if (isNominalMode) {
            setTensePresenceBadges(button, {
                active: activeOutput,
                nonactive: nonactiveOutput,
            });
        }
        button.disabled = endsWithConsonant || hasOutput === false || isBlockedNominalTense;
        button.addEventListener("click", () => {
            if (typeof clearActiveNawatRouteProfile === "function") {
                clearActiveNawatRouteProfile();
            }
            const currentSelectionState = getCurrentResolvedConjugationSelectionState({ tenseMode });
            const wasActive = currentSelectionState.group === CONJUGATION_GROUPS.tense
                && tenseValue === currentSelectionState.tenseValue
                && (!resolvedCombinedMode || getCombinedMode() === resolvedCombinedMode);
            if (resolvedCombinedMode && getCombinedMode() !== resolvedCombinedMode) {
                setCombinedMode(resolvedCombinedMode);
                updateCombinedModeTabs();
            }
            mutateConjugationSelectionState({
                tenseMode,
                group: CONJUGATION_GROUPS.tense,
                tenseValue,
                classFilter: PRETERITO_CLASS_TENSES.has(tenseValue) && wasActive
                    ? null
                    : currentSelectionState.classFilter,
            }, {
                tenseMode,
                availabilityEntries: availability,
            });
            const updateSelectedTense = () => {
                renderTenseTabs();
                rerenderActiveConjugations(tenseValue);
            };
            if (
                typeof isThreeColumnPanelLayout === "function"
                && isThreeColumnPanelLayout()
                && button.closest?.("#panel-stack-pane-tense")
            ) {
                updateSelectedTense();
                return;
            }
            preserveViewportAnchorPosition(button, updateSelectedTense);
        });
        return button;
    };
    const mainWrap = document.createElement("div");
    mainWrap.className = "tense-tabs-main";
    mainWrap.setAttribute("role", "tablist");
    mainWrap.setAttribute(
        "aria-label",
        getAndrewsFirstTenseTabsAriaLabel(tenseMode)
    );
    const appendTenseGroups = (groups, columnEl, columnKey = "") => {
        groups.forEach((group) => {
            const groupTenses = group.tenses.filter((tenseValue) => visibleTenseSet.has(tenseValue));
            if (!groupTenses.length) {
                return;
            }
            const groupEl = document.createElement("div");
            groupEl.className = "tense-tabs-group";
        if (group.heading) {
            const heading = document.createElement("div");
            heading.className = "tense-tabs-heading";
            heading.textContent = getLocalizedLabel(group.heading, isNawat, "");
            const hoverTitle = getAndrewsFirstGroupHoverTitle(group);
            if (hoverTitle) {
                heading.title = hoverTitle;
            }
            groupEl.appendChild(heading);
        }
            groupTenses.forEach((tenseValue) => {
                const button = buildTenseButton(tenseValue, { columnKey });
                groupEl.appendChild(button);
            });
            columnEl.appendChild(groupEl);
        });
    };
    const buildAndrewsRouteDirectoryColumn = () => {
        const lessonRegistry = typeof LESSON_REGISTRY !== "undefined" && Array.isArray(LESSON_REGISTRY)
            ? LESSON_REGISTRY
            : (Array.isArray(globalThis.LESSON_REGISTRY) ? globalThis.LESSON_REGISTRY : []);
        if (!lessonRegistry.length) {
            return null;
        }
        const routeRows = [];
        const getRouteRef = (lesson, route, fallback) => {
            const refs = Array.isArray(route?.andrewsRefs) ? route.andrewsRefs.filter(Boolean) : [];
            return refs[0] || fallback || `Lesson ${lesson?.id || ""}`;
        };
        const addRouteRow = (lesson, route, level, fallbackRef) => {
            if (!route) {
                return;
            }
            const structuralInfo = route.structuralInfo || {};
            const ref = getRouteRef(lesson, route, fallbackRef);
            const key = `${routeRows.length}:${lesson?.id || ""}:${level}:${route.routeKind || ""}:${ref}`;
            const searchText = [
                ref,
                level,
                route.routeFamily,
                route.routeKind,
                route.formulaTransition,
                route.formulaTemplate,
                route.sourcePathFormula,
                structuralInfo.sourcePathFormula,
                structuralInfo.logicPathType,
                structuralInfo.keywordRouteBasis,
                structuralInfo.exampleSource,
                structuralInfo.exampleTargetFormula,
                structuralInfo.exampleSurface,
                route.puzzleStackTemplate?.model,
                ...(Array.isArray(route.puzzleStackTemplate?.steps)
                    ? route.puzzleStackTemplate.steps.flatMap((step) => [step.stage, step.piece, step.label, step.formula, step.note])
                    : []),
            ].filter(Boolean).join(" ").toLowerCase();
            routeRows.push({ key, lesson, route, level, ref, structuralInfo, searchText });
        };
        lessonRegistry.forEach((lesson) => {
            const lessonRoute = lesson?.trajectory?.sourceGatedRoute;
            if (!lessonRoute) {
                return;
            }
            addRouteRow(lesson, lessonRoute, "lesson", `Lesson ${lesson.id}`);
            (Array.isArray(lessonRoute.subsectionRoutes) ? lessonRoute.subsectionRoutes : []).forEach((sectionRoute) => {
                addRouteRow(lesson, sectionRoute, "section", sectionRoute.structuralInfo?.section || `Lesson ${lesson.id}`);
                (Array.isArray(sectionRoute.internalRoutes) ? sectionRoute.internalRoutes : []).forEach((internalRoute) => {
                    addRouteRow(lesson, internalRoute, "internal", internalRoute.structuralInfo?.internalSubsection || sectionRoute.structuralInfo?.section || `Lesson ${lesson.id}`);
                });
            });
        });
        if (!routeRows.length) {
            return null;
        }
        const families = Array.from(new Set(routeRows.map((row) => row.route.routeFamily).filter(Boolean))).sort();
        const lessonCount = routeRows.filter((row) => row.level === "lesson").length;
        const sectionCount = routeRows.filter((row) => row.level === "section").length;
        const internalCount = routeRows.filter((row) => row.level === "internal").length;
        let selectedRow = routeRows.find((row) => row.route.routeKind === "preterit-agentive-embedded-source-locative")
            || routeRows.find((row) => row.level === "internal")
            || routeRows[0];

        const routeColumn = document.createElement("div");
        routeColumn.className = "tense-tabs-column tense-tabs-column--andrews-routes";
        routeColumn.dataset.uiHost = "tense-tabs-column";
        routeColumn.dataset.andrewsRouteDirectory = "source-gated";
        const title = document.createElement("div");
        title.className = "tense-tabs-heading tense-tabs-heading--route-directory";
        title.textContent = "Rutas Andrews";
        routeColumn.appendChild(title);

        const audit = document.createElement("div");
        audit.className = "andrews-route-directory__audit";
        audit.textContent = `${lessonCount} lecciones · ${sectionCount} secciones · ${internalCount} rutas internas`;
        routeColumn.appendChild(audit);

        const browser = document.createElement("div");
        browser.className = "andrews-route-browser";
        const controls = document.createElement("div");
        controls.className = "andrews-route-browser__controls";
        const searchInput = document.createElement("input");
        searchInput.className = "andrews-route-browser__search";
        searchInput.type = "search";
        searchInput.placeholder = "Buscar ruta, formula o ref";
        searchInput.setAttribute("aria-label", "Buscar ruta Andrews");
        controls.appendChild(searchInput);
        const familySelect = document.createElement("select");
        familySelect.className = "andrews-route-browser__family";
        familySelect.setAttribute("aria-label", "Familia de ruta Andrews");
        const allFamiliesOption = document.createElement("option");
        allFamiliesOption.value = "";
        allFamiliesOption.textContent = "Todas las familias";
        familySelect.appendChild(allFamiliesOption);
        families.forEach((family) => {
            const option = document.createElement("option");
            option.value = family;
            option.textContent = family;
            familySelect.appendChild(option);
        });
        controls.appendChild(familySelect);
        browser.appendChild(controls);

        const body = document.createElement("div");
        body.className = "andrews-route-browser__body";
        const listWrap = document.createElement("div");
        listWrap.className = "andrews-route-browser__list-wrap";
        const matchCount = document.createElement("div");
        matchCount.className = "andrews-route-browser__match-count";
        listWrap.appendChild(matchCount);
        const list = document.createElement("div");
        list.className = "andrews-route-browser__list";
        listWrap.appendChild(list);
        const detail = document.createElement("div");
        detail.className = "andrews-route-browser__detail";
        body.appendChild(listWrap);
        body.appendChild(detail);
        browser.appendChild(body);
        routeColumn.appendChild(browser);

        const appendDetailLine = (parent, label, value, className = "") => {
            if (!value) {
                return;
            }
            const line = document.createElement("div");
            line.className = `andrews-route-browser__detail-line${className ? ` ${className}` : ""}`;
            const labelEl = document.createElement("span");
            labelEl.className = "andrews-route-browser__detail-label";
            labelEl.textContent = label;
            const valueEl = document.createElement("span");
            valueEl.className = "andrews-route-browser__detail-value";
            valueEl.textContent = value;
            line.appendChild(labelEl);
            line.appendChild(valueEl);
            parent.appendChild(line);
        };
        const getAndrewsRoutePuzzleStackSteps = (row) => {
            const route = row?.route || {};
            const structuralInfo = row?.structuralInfo || {};
            const templateSteps = Array.isArray(route.puzzleStackTemplate?.steps)
                ? route.puzzleStackTemplate.steps.filter((step) => step && typeof step === "object")
                : [];
            if (templateSteps.length) {
                return templateSteps.map((step) => ({
                    stage: step.stage || "",
                    piece: step.piece || "",
                    label: step.label || "",
                    formula: step.formula || "",
                    note: step.note || "",
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
                return [
                    {
                        stage: "#1 entrada",
                        piece: "source",
                        label: "embedded source",
                        formula: exampleSource,
                        note: "CNV source stem supplied by the user",
                    },
                    {
                        stage: "#2 formula",
                        piece: "-0",
                        label: "VNC preterit",
                        formula: sourceCore,
                        note: "tense layer inside the embedded VNC core",
                    },
                    {
                        stage: "#2 formula",
                        piece: "-ka < (ka)-t",
                        label: "VNC-NNC conversion",
                        formula: agentiveStem,
                        note: "preterit-agentive embedded NNC, without standalone -t",
                    },
                    {
                        stage: "#2 formula",
                        piece: "-n < (n)-ti ~ (ni)-t",
                        label: "relational NNC",
                        formula: locativeStem,
                        note: "locative relational matrix stem element",
                    },
                    {
                        stage: "#2 formula",
                        piece: "-0-",
                        label: "NNC connector",
                        formula: exampleTargetFormula,
                        note: "outer zero connector/adverbial layer",
                    },
                    {
                        stage: "#3 salida",
                        piece: "surface",
                        label: "realization",
                        formula: exampleSurface,
                        note: "formula boundaries and zero markers are not surface letters",
                    },
                ];
            }
            const steps = [
                {
                    stage: "#1 entrada",
                    piece: route.sourceFormulaType || "source",
                    label: "source gate",
                    formula: route.sourceUnit || row?.ref || route.routeKind || "source",
                    note: route.sourceGate?.status || "source-gated Andrews route",
                },
            ];
            (Array.isArray(route.requirementIds) ? route.requirementIds : []).forEach((requirementId) => {
                steps.push({
                    stage: "#2 formula",
                    piece: requirementId,
                    label: "required piece",
                    formula: requirementId,
                    note: "route cannot build without this source condition",
                });
            });
            if (sourcePathFormula) {
                steps.push({
                    stage: "#2 formula",
                    piece: "source path",
                    label: "route path",
                    formula: sourcePathFormula,
                    note: structuralInfo.logicPathType || structuralInfo.keywordRouteBasis || route.operation || "Andrews source-to-target path",
                });
            }
            if (route.formulaTemplate) {
                steps.push({
                    stage: "#2 formula",
                    piece: "target template",
                    label: "formula build",
                    formula: route.formulaTemplate,
                    note: route.operation || "target formula template",
                });
            }
            steps.push({
                stage: "#3 salida",
                piece: structuralInfo.exampleSurface ? "surface" : (route.targetFormulaType || "target"),
                label: structuralInfo.exampleSurface ? "realization" : "target gate",
                formula: structuralInfo.exampleSurface || route.targetUnit || route.targetFormulaType || route.routeKind || "target",
                note: structuralInfo.exampleSurface
                    ? "licensed route example surface"
                    : "surface is built only when the route has enough evidence",
            });
            return steps;
        };
        const getAndrewsRoutePuzzleStackActions = (row) => {
            const route = row?.route || {};
            if (route.puzzleStackTemplate?.actionModel !== "ordered-selectable-piece-transform") {
                return [];
            }
            return Array.isArray(route.puzzleStackTemplate?.actions)
                ? route.puzzleStackTemplate.actions
                    .filter((action) => action && typeof action === "object")
                    .map((action) => ({
                        stage: action.stage || "",
                        inputFormula: action.inputFormula || "",
                        selectablePiece: action.selectablePiece || "",
                        operation: action.operation || "",
                        outputFormula: action.outputFormula || "",
                        note: action.note || "",
                    }))
                : [];
        };
        const getAndrewsRoutePuzzleStackConjugatorRuns = (row) => {
            const route = row?.route || {};
            if (route.puzzleStackTemplate?.buildModel !== "single-entrada-conjugator-orchestration") {
                return [];
            }
            return Array.isArray(route.puzzleStackTemplate?.conjugatorEntradas?.runs)
                ? route.puzzleStackTemplate.conjugatorEntradas.runs
                    .filter((run) => run && typeof run === "object")
                    .map((run) => ({
                        id: run.id || "",
                        stage: run.stage || "",
                        activeEntrada: run.activeEntrada || "",
                        process: run.process || "",
                        internalPath: Array.isArray(run.internalPath) ? run.internalPath.filter(Boolean).map(String) : [],
                        contributes: run.contributes || "",
                        attachTo: run.attachTo || "",
                        output: run.output || "",
                        note: run.note || "",
                    }))
                : [];
        };
        const appendAndrewsRoutePuzzleStackConjugatorBoard = (parent, row) => {
            const runs = getAndrewsRoutePuzzleStackConjugatorRuns(row);
            if (!runs.length) {
                return;
            }
            const board = document.createElement("div");
            board.className = "andrews-route-browser__conjugator-board";
            board.dataset.puzzleStackBuildModel = row.route.puzzleStackTemplate.buildModel || "";
            const title = document.createElement("div");
            title.className = "andrews-route-browser__conjugator-title";
            title.textContent = "Edge Sources";
            board.appendChild(title);
            const edgeInspector = document.createElement("div");
            edgeInspector.className = "andrews-route-browser__conjugator-inspector";
            board.appendChild(edgeInspector);
            const setActiveRun = (item, run) => {
                board.querySelectorAll(".andrews-route-browser__conjugator-run.is-active")
                    .forEach((activeItem) => activeItem.classList.remove("is-active"));
                item.classList.add("is-active");
                const path = run.internalPath.length ? run.internalPath.join(" -> ") : run.activeEntrada;
                edgeInspector.textContent = `source ${run.activeEntrada}: ${path} => ${run.output}. ${run.process}`;
            };
            runs.forEach((run, index) => {
                const item = document.createElement("button");
                item.type = "button";
                item.className = "andrews-route-browser__conjugator-run";
                item.dataset.conjugatorRun = run.id || String(index + 1);
                const entrada = document.createElement("div");
                entrada.className = "andrews-route-browser__conjugator-entrada";
                entrada.textContent = `entrada: ${run.activeEntrada}`;
                item.appendChild(entrada);
                const output = document.createElement("div");
                output.className = "andrews-route-browser__conjugator-output";
                output.textContent = run.attachTo
                    ? `${run.attachTo} -> ${run.output}`
                    : run.output;
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
            const builder = document.createElement("div");
            builder.className = "andrews-route-browser__builder";
            builder.dataset.puzzleStackActionModel = row.route.puzzleStackTemplate.actionModel || "";
            let activeIndex = 0;
            const currentFormula = document.createElement("div");
            currentFormula.className = "andrews-route-browser__builder-current";
            builder.appendChild(currentFormula);
            const actionList = document.createElement("div");
            actionList.className = "andrews-route-browser__builder-actions";
            builder.appendChild(actionList);
            const renderBuilder = () => {
                currentFormula.textContent = activeIndex >= actions.length
                    ? actions[actions.length - 1].outputFormula
                    : actions[activeIndex].inputFormula;
                actionList.innerHTML = "";
                actions.forEach((action, index) => {
                    const actionRow = document.createElement("div");
                    actionRow.className = "andrews-route-browser__builder-action";
                    actionRow.dataset.actionIndex = String(index + 1);
                    actionRow.dataset.actionState = index < activeIndex ? "complete" : (index === activeIndex ? "active" : "locked");
                    const actionButton = document.createElement("button");
                    actionButton.type = "button";
                    actionButton.className = "andrews-route-browser__builder-button";
                    actionButton.disabled = index !== activeIndex;
                    actionButton.textContent = action.selectablePiece;
                    actionButton.addEventListener("click", () => {
                        if (index !== activeIndex) {
                            return;
                        }
                        activeIndex = Math.min(actions.length, activeIndex + 1);
                        renderBuilder();
                    });
                    const actionMeta = document.createElement("span");
                    actionMeta.className = "andrews-route-browser__builder-meta";
                    actionMeta.textContent = index < activeIndex
                        ? action.outputFormula
                        : action.operation;
                    actionRow.appendChild(actionButton);
                    actionRow.appendChild(actionMeta);
                    actionList.appendChild(actionRow);
                });
            };
            renderBuilder();
            parent.appendChild(builder);
        };
        const appendAndrewsRoutePuzzleStack = (parent, row) => {
            const steps = getAndrewsRoutePuzzleStackSteps(row);
            if (!steps.length) {
                return;
            }
            const stack = document.createElement("div");
            stack.className = "andrews-route-browser__layer-stack";
            stack.dataset.layerStackRoute = row.route.routeKind || "";
            stack.dataset.puzzleStackModel = "entrada-formula-salida";
            const stackTitle = document.createElement("div");
            stackTitle.className = "andrews-route-browser__layer-stack-title";
            stackTitle.textContent = "PuzzleStack";
            stack.appendChild(stackTitle);
            const lanes = document.createElement("div");
            lanes.className = "andrews-route-browser__layer-lanes";
            stack.appendChild(lanes);
            const groupedSteps = [];
            steps.forEach((step) => {
                const existing = groupedSteps.find((group) => group.stage === step.stage);
                if (existing) {
                    existing.steps.push(step);
                    return;
                }
                groupedSteps.push({ stage: step.stage, steps: [step] });
            });
            let stepIndex = 0;
            groupedSteps.forEach((group) => {
                const lane = document.createElement("div");
                lane.className = "andrews-route-browser__layer-lane";
                lane.dataset.layerLane = group.stage;
                const laneTitle = document.createElement("div");
                laneTitle.className = "andrews-route-browser__layer-lane-title";
                laneTitle.textContent = group.stage;
                lane.appendChild(laneTitle);
                group.steps.forEach((step) => {
                    stepIndex += 1;
                    const item = document.createElement("div");
                    item.className = "andrews-route-browser__layer-step";
                    item.dataset.layerStep = String(stepIndex);
                    item.dataset.layerStage = step.stage;
                    item.dataset.puzzlePiece = step.piece;
                    const indexEl = document.createElement("span");
                    indexEl.className = "andrews-route-browser__layer-index";
                    indexEl.textContent = String(stepIndex);
                    item.appendChild(indexEl);
                    const bodyEl = document.createElement("span");
                    bodyEl.className = "andrews-route-browser__layer-body";
                    const headEl = document.createElement("span");
                    headEl.className = "andrews-route-browser__layer-head";
                    headEl.textContent = `${step.piece} · ${step.label}`;
                    bodyEl.appendChild(headEl);
                    const formulaEl = document.createElement("span");
                    formulaEl.className = "andrews-route-browser__layer-formula";
                    formulaEl.textContent = step.formula;
                    bodyEl.appendChild(formulaEl);
                    const noteEl = document.createElement("span");
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
        const renderAndrewsRouteBrowserDetail = (row) => {
            detail.innerHTML = "";
            if (!row) {
                const empty = document.createElement("div");
                empty.className = "andrews-route-browser__empty";
                empty.textContent = "Sin ruta.";
                detail.appendChild(empty);
                return;
            }
            const route = row.route;
            const structuralInfo = row.structuralInfo || {};
            const detailTitle = document.createElement("div");
            detailTitle.className = "andrews-route-browser__detail-title";
            detailTitle.textContent = `${row.ref} · ${route.routeKind || "route"}`;
            detail.appendChild(detailTitle);
            const chips = document.createElement("div");
            chips.className = "andrews-route-browser__chips";
            [route.routeFamily, row.level, route.sourceGate?.status, route.formulaTransition].filter(Boolean).forEach((chipText) => {
                const chip = document.createElement("span");
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
                const example = document.createElement("div");
                example.className = "andrews-route-browser__example";
                appendDetailLine(example, "source", exampleSource, "andrews-route-browser__detail-line--formula");
                appendDetailLine(example, "target", exampleTargetFormula, "andrews-route-browser__detail-line--formula");
                appendDetailLine(example, "salida", exampleSurface);
                detail.appendChild(example);
            }
            appendAndrewsRoutePuzzleStack(detail, row);
            const metadataParent = hasConjugatorBuild ? document.createElement("details") : detail;
            if (hasConjugatorBuild) {
                metadataParent.className = "andrews-route-browser__metadata";
                const metadataSummary = document.createElement("summary");
                metadataSummary.className = "andrews-route-browser__metadata-summary";
                metadataSummary.textContent = "route metadata";
                metadataParent.appendChild(metadataSummary);
            }
            appendDetailLine(metadataParent, "template", route.formulaTemplate, "andrews-route-browser__detail-line--formula");
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
                const reqWrap = document.createElement("div");
                reqWrap.className = "andrews-route-browser__requirements";
                const reqTitle = document.createElement("div");
                reqTitle.className = "andrews-route-browser__requirements-title";
                reqTitle.textContent = "requirements";
                reqWrap.appendChild(reqTitle);
                route.requirementIds.forEach((requirementId) => {
                    const req = document.createElement("span");
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
            return routeRows.filter((row) => {
                if (family && row.route.routeFamily !== family) {
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
            matchCount.textContent = filteredRows.length === visibleRows.length
                ? `${filteredRows.length} rutas`
                : `${visibleRows.length} de ${filteredRows.length} rutas`;
            visibleRows.forEach((row) => {
                const route = row.route;
                const rowButton = document.createElement("button");
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
                const rowTitle = document.createElement("span");
                rowTitle.className = "andrews-route-browser__row-title";
                rowTitle.textContent = `${row.ref} · ${route.routeKind || "route"}`;
                rowButton.appendChild(rowTitle);
                const rowMeta = document.createElement("span");
                rowMeta.className = "andrews-route-browser__row-meta";
                rowMeta.textContent = [
                    route.routeFamily,
                    route.formulaTransition || route.formulaTemplate,
                    row.structuralInfo.exampleSurface ? `salida ${row.structuralInfo.exampleSurface}` : "",
                ].filter(Boolean).join(" · ");
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
        renderAndrewsRouteBrowserDetail(selectedRow);
        renderRows();
        return routeColumn;
    };
    const columns = [];
    if (isNominalMode) {
        const nominalColumn = document.createElement("div");
        nominalColumn.className = "tense-tabs-column";
        appendTenseGroups(modeGroups.left || [], nominalColumn, "left");
        appendTenseGroups(modeGroups.right || [], nominalColumn, "right");
        columns.push(nominalColumn);
        mainWrap.classList.add("tense-tabs-main--semantic-single");
    } else if (verbSemanticGroups.length) {
        const verbColumn = document.createElement("div");
        verbColumn.className = "tense-tabs-column";
        appendTenseGroups(verbSemanticGroups, verbColumn, "verb");
        columns.push(verbColumn);
        mainWrap.classList.add("tense-tabs-main--semantic-single");
    } else {
        const leftColumn = document.createElement("div");
        leftColumn.className = "tense-tabs-column";
        const rightColumn = document.createElement("div");
        rightColumn.className = "tense-tabs-column";
        appendTenseGroups(modeGroups.left, leftColumn, "left");
        appendTenseGroups(modeGroups.right, rightColumn, "right");
        columns.push(leftColumn, rightColumn);
    }
    columns.forEach((columnEl) => {
        mainWrap.appendChild(columnEl);
    });
    container.appendChild(mainWrap);

    if (outputUniversalContainer) {
        outputUniversalContainer.innerHTML = "";
        outputUniversalContainer.hidden = !shouldShowOutputControls;
        outputUniversalContainer.setAttribute("role", "tablist");
        outputUniversalContainer.setAttribute("aria-label", getLocalizedLabel(
            { labelEs: getAndrewsFirstUniversalTabsAriaLabel(), labelNa: getAndrewsFirstUniversalTabsAriaLabel() },
            isNawat,
            getAndrewsFirstUniversalTabsAriaLabel()
        ));
        if (shouldShowOutputControls) {
            const universalWrap = document.createElement("div");
            universalWrap.className = "tense-tabs-universal";
            const activeUniversal = selectedUniversal;
            availability.forEach((entry) => {
                const tenseValue = entry?.tenseValue || "";
                const available = resolveTenseAvailabilityIsAvailable(entry) === true;
                const button = document.createElement("button");
                button.type = "button";
                button.className = "tense-tab";
                button.setAttribute("role", "tab");
                button.dataset.tenseValue = tenseValue;
                button.dataset.tenseGroup = "universal";
                button.dataset.tenseColumn = "universal";
                const activeRecord = unifiedAvailabilityMatrix instanceof Map
                    ? unifiedAvailabilityMatrix.get(COMBINED_MODE.active)?.get(tenseValue)
                    : resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.active);
                const nonactiveRecord = unifiedAvailabilityMatrix instanceof Map
                    ? unifiedAvailabilityMatrix.get(COMBINED_MODE.nonactive)?.get(tenseValue)
                    : resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.nonactive);
                button.dataset.availabilityState = entry?.availabilityState || "";
                const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord) === true;
                const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
                const hasOutput = activeOutput || nonactiveOutput;
                if (hasOutput === false) {
                    button.classList.add("is-empty");
                }
                const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
                if (activeGroup === CONJUGATION_GROUPS.universal && tenseValue === activeUniversal && available) {
                    button.classList.add("is-active");
                } else if (
                    activeGroup === CONJUGATION_GROUPS.tense &&
                    isClassTenseSelected &&
                    classKey &&
                    selectionState.classFilter === classKey
                ) {
                    button.classList.add("is-active");
                }
                const classDetail = getPretUniversalClassDetail(tenseValue);
                const label = document.createElement("span");
                label.className = "tense-tab-label";
                label.textContent = classDetail
                    ? getLocalizedLabel(classDetail.label, isNawat, tenseValue)
                    : tenseValue;
                button.appendChild(label);
                button.title = getAndrewsFirstTenseHoverTitle(tenseValue);
                button.setAttribute("aria-selected", String(button.classList.contains("is-active")));
                button.disabled = endsWithConsonant || !available || hasOutput === false;
                button.addEventListener("click", () => {
                    const currentSelectionState = getCurrentResolvedConjugationSelectionState({ tenseMode });
                    const classSelectionActive = PRETERITO_CLASS_TENSES.has(currentSelectionState.tenseValue);
                    if (currentSelectionState.group === CONJUGATION_GROUPS.universal && tenseValue === currentSelectionState.universalTenseValue) {
                        mutateConjugationSelectionState({
                            tenseMode,
                            group: CONJUGATION_GROUPS.tense,
                        }, {
                            tenseMode,
                            availabilityEntries: availability,
                        });
                        preserveViewportAnchorPosition(button, () => {
                            renderTenseTabs();
                            rerenderActiveConjugations(currentSelectionState.tenseValue);
                        });
                        return;
                    }
                    if (currentSelectionState.group === CONJUGATION_GROUPS.tense && classSelectionActive && classKey) {
                        mutateConjugationSelectionState({
                            tenseMode,
                            classFilter: currentSelectionState.classFilter === classKey ? null : classKey,
                        }, {
                            tenseMode,
                            availabilityEntries: availability,
                        });
                        preserveViewportAnchorPosition(button, () => {
                            renderTenseTabs();
                            rerenderActiveConjugations(currentSelectionState.tenseValue);
                        });
                        return;
                    }
                    mutateConjugationSelectionState({
                        tenseMode,
                        group: CONJUGATION_GROUPS.universal,
                        universalTenseValue: tenseValue,
                    }, {
                        tenseMode,
                        availabilityEntries: availability,
                    });
                    preserveViewportAnchorPosition(button, () => {
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
        endsWithConsonant,
    });
    TenseTabsDomSignature = tenseTabsSignature;
    restoreTenseTabsFocusState(container, focusState);
    restoreTenseTabsFocusState(outputUniversalContainer, focusState);
}

function mapDerivationStemsToAvailabilityTargets({
    stems = [],
    directionalPrefix = "",
    isYawi = false,
}) {
    return stems.map((stem) => {
        const stemAnalysis = stripDirectionalPrefixFromStem(stem, directionalPrefix);
        return {
            verb: stem,
            analysisVerb: stemAnalysis,
            isYawi,
            isWeya: false,
        };
    });
}

function buildDerivationAvailabilityCoreOptions({
    verb = "",
    analysisVerb = "",
    objectPrefix = "",
    verbMeta = null,
    suppletiveStemSet = null,
}) {
    return {
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb: verbMeta,
        directionalPrefix: verbMeta?.directionalPrefix,
        isYawi: verbMeta?.isYawi,
        suppletiveStemSet,
    };
}

function buildDerivationAvailabilityTargets({
    derivationType = "",
    verb = "",
    analysisVerb = "",
    objectPrefix = "",
    verbMeta = null,
    suppletiveStemSet = null,
}) {
    const baseTargets = [{
        verb,
        analysisVerb,
        isYawi: verbMeta?.isYawi,
        isWeya: verbMeta?.isWeya,
    }];
    const coreOptions = buildDerivationAvailabilityCoreOptions({
        verb,
        analysisVerb,
        objectPrefix,
        verbMeta,
        suppletiveStemSet,
    });
    const forwardConfig = getForwardDerivationConfig(derivationType);
    if (!forwardConfig) {
        return { availabilityTargets: baseTargets, suppletiveStemSet };
    }
    const forwardDerivation = applySelectedForwardDerivation({
        derivationType,
        derivationOptions: coreOptions,
        enabled: true,
    });
    if (forwardDerivation.blocked) {
        return {
            availabilityTargets: [],
            suppletiveStemSet,
        };
    }
    const stems = resolveDerivedStemList(
        forwardDerivation[forwardConfig.resultField],
        forwardDerivation.verb || verb,
    );
    return {
        availabilityTargets: mapDerivationStemsToAvailabilityTargets({
            stems,
            directionalPrefix: verbMeta?.directionalPrefix,
            isYawi: forwardDerivation.isYawi ?? verbMeta?.isYawi,
        }),
        suppletiveStemSet: forwardDerivation.suppletiveStemSet ?? suppletiveStemSet,
    };
}

function buildPretUniversalTenseAvailability({
    hasVerb = false,
    suppletiveStemSet = null,
    availabilityTargets = [],
    isTransitive = false,
    verbMeta = null,
    derivationType = "",
}) {
    return PRETERITO_UNIVERSAL_ORDER.map((tenseValue) => {
        if (!hasVerb) {
            return buildTenseAvailabilityRecord({
                tenseValue,
                combinedMode: COMBINED_MODE.active,
                source: "pret-universal-class",
                available: false,
                hasOutput: false,
            });
        }
        if (suppletiveStemSet) {
            const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
            const variants = classKey ? suppletiveStemSet.variantsByClass.get(classKey) : null;
            const isAvailable = !!(variants && variants.length);
            return buildTenseAvailabilityRecord({
                tenseValue,
                combinedMode: COMBINED_MODE.active,
                source: "pret-universal-class",
                available: isAvailable,
                hasOutput: isAvailable,
            });
        }
        if (!availabilityTargets.length) {
            return buildTenseAvailabilityRecord({
                tenseValue,
                combinedMode: COMBINED_MODE.active,
                source: "pret-universal-class",
                available: false,
                hasOutput: false,
            });
        }
        const hasVariants = availabilityTargets.some((target) => {
            const variants = getPretUniversalVariants(
                target.verb,
                tenseValue,
                isTransitive,
                target.analysisVerb,
                buildPretVariantsOptionsFromMeta(verbMeta, {
                    isYawi: target.isYawi,
                    isWeya: target.isWeya,
                    derivationType,
                })
            );
            return !!(variants && variants.length);
        });
        return buildTenseAvailabilityRecord({
            tenseValue,
            combinedMode: COMBINED_MODE.active,
            source: "pret-universal-class",
            available: hasVariants,
            hasOutput: hasVariants,
        });
    });
}

function buildAvailabilityMemoContext({
    tenseMode = "",
    isNonactiveMode = false,
    derivationType = "",
    derivationMode = "",
    voiceMode = "",
}) {
    return [
        tenseMode,
        isNonactiveMode ? "nonactive" : "active",
        derivationType || "",
        derivationMode || "",
        voiceMode || "",
    ].join("|");
}

function buildVerbOutputContextForTenseTabs({
    tenseMode,
    isNonactiveMode,
    verbMeta,
}) {
    if (tenseMode !== TENSE_MODE.verbo) {
        return null;
    }
    const nonactiveConfig = isNonactiveMode ? getNonactiveObjectPrefixGroups(verbMeta) : null;
    const objectPrefixGroups = getVerbObjectPrefixGroups(verbMeta, isNonactiveMode, nonactiveConfig);
    const objectPrefixes = Array.from(new Set(
        objectPrefixGroups.flatMap((group) => group.prefixes)
    ));
    const valencySummary = isNonactiveMode ? getVerbValencySummary(verbMeta) : null;
    const fusionMarkers = verbMeta.isTaFusion
        ? (verbMeta.fusionPrefixes || []).filter((prefix) => FUSION_PREFIXES.has(prefix))
        : [];
    return {
        objectPrefixes,
        objectPrefixGroups,
        subjectSelections: getSubjectPersonSelections(),
        valencySummary,
        fusionMarkers,
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
    tenseOutputCache,
}) {
    if (!verbOutputContext || !hasVerb || endsWithConsonant) {
        return null;
    }
    if (tenseOutputCache instanceof Map && tenseOutputCache.has(tenseValue)) {
        return tenseOutputCache.get(tenseValue);
    }
    let availabilityRecord = buildTenseAvailabilityRecord({
        tenseValue,
        combinedMode: isNonactiveMode ? COMBINED_MODE.nonactive : COMBINED_MODE.active,
        source: isNonactiveMode ? "verb-nonactive-tense-tab" : "verb-active-tense-tab",
        available: false,
        hasOutput: false,
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
                availabilityMemoContext,
            });
        }
    } else {
        availabilityRecord = resolveActiveVerbTenseAvailabilityRecord({
            verb: displayVerb,
            tenseValue,
            objectPrefixes: verbOutputContext.objectPrefixes,
            subjectSelections: verbOutputContext.subjectSelections,
            availabilityMemo: availabilityProbeMemo,
            availabilityMemoContext,
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
