// === Verb Composer ===
function getComposerSlotKeyForTransitivity(transitivity) {
    return COMPOSER_SLOT_KEY_BY_TRANSITIVITY[transitivity] || "a";
}

function isComposerTransitivitySelected(state = VerbComposerState) {
    return COMPOSER_TRANSITIVITY_ORDER.includes(String(state?.transitivity || ""));
}

function getComposerSlotConfig(slotKey) {
    return COMPOSER_SLOT_CONFIG[slotKey] || COMPOSER_SLOT_CONFIG.a;
}

function getComposerSlotStateKeys(slotKey) {
    return getComposerSlotConfig(slotKey).state;
}

function syncComposerActiveStemAndEmbedFromState() {
    const activeSlot = getComposerActiveSlotFromState();
    const stateKeys = getComposerSlotStateKeys(activeSlot);
    const embedValue = normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "");
    VerbComposerState.embedPrefix = ComposerEmbedOpenState[activeSlot] ? embedValue : "";
}

function getComposerActiveSlotFromState() {
    return getComposerSlotKeyForTransitivity(VerbComposerState.transitivity);
}

function getComposerActiveStemValue(state = VerbComposerState) {
    const source = state && typeof state === "object" ? state : VerbComposerState;
    const slotKey = getComposerSlotKeyForTransitivity(source?.transitivity);
    const stateKeys = getComposerSlotStateKeys(slotKey);
    return normalizeComposerStem(source?.[stateKeys.stem] || "");
}

function setComposerActiveSlotStem(stemValue) {
    const stem = normalizeComposerStem(stemValue || "");
    const slot = getComposerActiveSlotFromState();
    const stateKeys = getComposerSlotStateKeys(slot);
    VerbComposerState[stateKeys.stem] = stem;
}

function getVerbComposerElements() {
    const slots = COMPOSER_SLOT_KEYS.reduce((acc, slotKey) => {
        const config = getComposerSlotConfig(slotKey);
        acc[slotKey] = {
            topRow: document.querySelector(`[data-composer-top-row="${slotKey}"]`),
            embedField: document.querySelector(`[data-composer-embed-field="${slotKey}"]`),
            prefixToggleButton: document.querySelector(`[data-composer-prefix-toggle="${slotKey}"]`),
            matrixField: document.querySelector(`[data-composer-matrix-field="${slotKey}"]`),
            serialTypeChips: document.querySelector(`[data-composer-serial-type-chips="${slotKey}"]`),
            embedInput: document.getElementById(config.ids.embed),
            stemInput: document.getElementById(config.ids.stem),
            objectInput: document.getElementById(config.ids.objectEmbed),
        };
        return acc;
    }, {});
    const slotAEmbedInput = slots.a?.embedInput || null;
    const slotAStemInput = slots.a?.stemInput || null;
    const slotAValenceLeftEmbedInput = slots.a?.objectInput || null;
    const slotBEmbedInput = slots.b?.embedInput || null;
    const slotBStemInput = slots.b?.stemInput || null;
    const slotBValenceLeftEmbedInput = slots.b?.objectInput || null;
    const slotCEmbedInput = slots.c?.embedInput || null;
    const slotCStemInput = slots.c?.stemInput || null;
    const slotCValenceLeftEmbedInput = slots.c?.objectInput || null;
    const activeSlot = getComposerActiveSlotFromState();
    const matrixStemInput = slots[activeSlot]?.stemInput
        || slotAStemInput
        || slotBStemInput
        || slotCStemInput;
    const embedStemInput = slots[activeSlot]?.embedInput
        || slotAEmbedInput
        || slotBEmbedInput
        || slotCEmbedInput;
    return {
        tutorialTrigger: document.getElementById("tutorial-trigger"),
        panel: document.getElementById("verb-composer"),
        entryBoardTabsHost: document.getElementById("verb-entry-board-tabs"),
        entryBoardButtons: document.querySelectorAll("[data-composer-entry-board]"),
        ordinaryNncModeButtons: document.querySelectorAll("[data-ordinary-nnc-mode]"),
        slots,
        slotAEmbedInput,
        slotAStemInput,
        slotAValenceLeftEmbedInput,
        slotAStemAffixSelect: document.getElementById("composer-stem-a-affix"),
        slotBEmbedInput,
        slotBStemInput,
        slotBValenceLeftEmbedInput,
        slotBStemAffixSelect: document.getElementById("composer-stem-b-affix"),
        slotCEmbedInput,
        slotCStemInput,
        slotCValenceLeftEmbedInput,
        slotCStemAffixSelect: document.getElementById("composer-stem-c-affix"),
        activeSlot,
        matrixStemInput,
        stemInput: matrixStemInput,
        transitivitySelect: document.getElementById("composer-transitivity"),
        transitivitySlotButtons: document.querySelectorAll("[data-composer-transitivity]"),
        valenceSelectIntransitive: document.getElementById("composer-valence-a"),
        valenceChipsIntransitive: document.getElementById("composer-valence-a-chips"),
        valenceIntransitiveEmbedInput: slotAValenceLeftEmbedInput,
        valenceSelect: document.getElementById("composer-valence"),
        valenceChips: document.getElementById("composer-valence-chips"),
        valenceEmbedPrimaryInput: slotBValenceLeftEmbedInput,
        valenceSelectSecondary: document.getElementById("composer-valence-2"),
        valenceChipsSecondary: document.getElementById("composer-valence-2-chips"),
        valenceEmbedSecondaryInput: slotCValenceLeftEmbedInput,
        directionalField: document.getElementById("composer-directional-field"),
        directionalHosts: document.querySelectorAll("[data-composer-directional-host]"),
        directionalSelect: document.getElementById("composer-directional"),
        directionalChips: document.getElementById("composer-directional-chips"),
        matrixStemAffixSelectBySlot: {
            a: document.getElementById("composer-stem-a-affix"),
            b: document.getElementById("composer-stem-b-affix"),
            c: document.getElementById("composer-stem-c-affix"),
        },
        matrixStemAffixPickerBySlot: {
            a: document.querySelector('[data-composer-matrix-affix-picker="a"]'),
            b: document.querySelector('[data-composer-matrix-affix-picker="b"]'),
            c: document.querySelector('[data-composer-matrix-affix-picker="c"]'),
        },
        matrixStemAffixTriggerBySlot: {
            a: document.getElementById("composer-stem-a-affix-trigger"),
            b: document.getElementById("composer-stem-b-affix-trigger"),
            c: document.getElementById("composer-stem-c-affix-trigger"),
        },
        matrixStemAffixTriggerValueBySlot: {
            a: document.getElementById("composer-stem-a-affix-trigger-value"),
            b: document.getElementById("composer-stem-b-affix-trigger-value"),
            c: document.getElementById("composer-stem-c-affix-trigger-value"),
        },
        matrixStemAffixPopoverBySlot: {
            a: document.getElementById("composer-stem-a-affix-popover"),
            b: document.getElementById("composer-stem-b-affix-popover"),
            c: document.getElementById("composer-stem-c-affix-popover"),
        },
        matrixStemAffixChipGroupsBySlot: {
            a: document.querySelector('[data-composer-matrix-affix-chip-groups="a"]'),
            b: document.querySelector('[data-composer-matrix-affix-chip-groups="b"]'),
            c: document.querySelector('[data-composer-matrix-affix-chip-groups="c"]'),
        },
        embedStemInput,
        embedInput: embedStemInput,
        clearTextboxesButton: document.getElementById("composer-clear-textboxes"),
        supportiveICheckbox: document.getElementById("composer-supportive-i"),
        hint: document.getElementById("verb-composer-hint"),
    };
}

function getVerbDisambiguationElements() {
    return {
        wrapper: document.getElementById("verb-disambiguation"),
        label: document.getElementById("verb-disambiguation-label"),
        options: document.getElementById("verb-disambiguation-options"),
    };
}

function isVerbDisambiguationEnabled() {
    return true;
}

function clearVerbDisambiguation() {
    VerbDisambiguationState.suggestions = [];
    VerbDisambiguationState.patterns = [];
    const { wrapper, options, label } = getVerbDisambiguationElements();
    if (options) {
        options.innerHTML = "";
    }
    if (label) {
        label.textContent = "";
    }
    if (wrapper) {
        wrapper.classList.add("is-empty");
    }
}

function renderVerbDisambiguation(payload) {
    const { wrapper, options, label } = getVerbDisambiguationElements();
    if (!wrapper || !options || !label) {
        return;
    }
    options.innerHTML = "";
    const suggestions = Array.isArray(payload?.suggestions) ? payload.suggestions : [];
    const patterns = Array.isArray(payload?.patterns) ? payload.patterns : [];
    VerbDisambiguationState.suggestions = suggestions;
    VerbDisambiguationState.patterns = patterns;
    if (!suggestions.length) {
        wrapper.classList.add("is-empty");
        label.textContent = "";
        return;
    }
    label.textContent = "Quisiste decir";
    suggestions.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "verb-disambiguation__option";
        button.textContent = item.value;
        const titleParts = [];
        if (item.classList) {
            titleParts.push(`clases ${item.classList}`);
        }
        if (item.shapeLabels && item.shapeLabels.length) {
            titleParts.push(`descriptor ${item.shapeLabels.join(", ")}`);
        }
        if (titleParts.length) {
            button.title = titleParts.join(" · ");
        }
        button.addEventListener("click", (event) => {
            event.preventDefault();
            applyVerbInputReplacement(item.value);
            clearVerbDisambiguation();
        });
        options.appendChild(button);
    });
    void patterns;
    wrapper.classList.remove("is-empty");
}

function updateVerbDisambiguation(rawValue = null) {
    const { wrapper, options } = getVerbDisambiguationElements();
    if (!wrapper || !options) {
        return;
    }
    if (!isVerbDisambiguationEnabled()) {
        clearVerbDisambiguation();
        return;
    }
    const verbInput = document.getElementById("verb");
    const value = rawValue !== null ? String(rawValue || "") : String(verbInput?.value || "");
    if (!value || isSearchModeInput(value)) {
        clearVerbDisambiguation();
        return;
    }
    const baseValue = getSearchInputBase(value).trim();
    if (!baseValue) {
        clearVerbDisambiguation();
        return;
    }
    const payload = buildVerbDisambiguationCandidates(baseValue);
    renderVerbDisambiguation(payload);
}

function getEmptyVerbInputMeta() {
    const derivationType = getActiveDerivationType();
    return {
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        hasCompoundMarker: false,
        hasSlashMarker: false,
        hasSuffixSeparator: false,
        hasBoundMarker: false,
        hasImpersonalTaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        isMarkedTransitive: false,
        isYawi: false,
        isWeya: false,
        sourceRawVerb: "",
        directionalPrefix: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        directObjectToken: "",
        indirectObjectMarker: "",
        isTaFusion: false,
        displayVerb: "",
        exactBaseVerb: "",
        hasLeadingDash: false,
        dashCount: 0,
        valenceSlotCount: 0,
        embeddedValenceCount: 0,
        totalValenceSlotCount: 0,
        fusionPrefixes: [],
        boundPrefixes: [],
        tiCausativeClass: "",
        derivationType,
        derivationValencyDelta: getDerivationValencyDelta(derivationType),
        rawInputVerb: "",
        screenDisplayVerb: "",
        regexInputVerb: "",
        parseInputVerb: "",
        inputMode: VERB_INPUT_MODE.composer,
        orthographyClassification: null,
    };
}

function getParsedVerbForTab(tabId, rawValue, options = {}) {
    const derivationType = Object.values(DERIVATION_TYPE).includes(options.derivationType)
        ? options.derivationType
        : getActiveDerivationType();
    const tiCausativeClass = normalizeTiCausativeClass(
        options.tiCausativeClass
        || getComposerActiveTiCausativeClass()
        || ""
    );
    return buildParsedVerbForTab(tabId, rawValue, {
        ...options,
        derivationType,
        tiCausativeClass,
    });
}

function getVerbInputMeta() {
    const verbInput = document.getElementById("verb");
    if (!verbInput) {
        return getEmptyVerbInputMeta();
    }
    const raw = verbInput.value;
    const troncoInputSource = resolveVerbInputSource(raw);
    const derivationType = getActiveDerivationType();
    const parsed = getParsedVerbForTab("verb-input", troncoInputSource.parseValue, {
        derivationType,
    });
    const baseValue = getSearchInputBase(troncoInputSource.parseValue);
    const parsedWithInputSource = {
        ...parsed,
        rawInputVerb: troncoInputSource.rawValue,
        screenDisplayVerb: troncoInputSource.displayValue,
        regexInputVerb: troncoInputSource.regexValue,
        parseInputVerb: troncoInputSource.parseValue,
        inputMode: troncoInputSource.mode,
        orthographyClassification: typeof classifyOrthographyInput === "function"
            ? classifyOrthographyInput(troncoInputSource.parseValue || troncoInputSource.rawValue || "")
            : null,
    };
    if (!isComposerTemplateOnlyBaseValue(baseValue)) {
        return parsedWithInputSource;
    }
    return {
        ...parsedWithInputSource,
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        displayVerb: "",
        exactBaseVerb: "",
    };
}

function isComposerFieldVisibleForSupportiveToggle(fieldEl) {
    if (!fieldEl || fieldEl.hidden) {
        return false;
    }
    if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
        return true;
    }
    const style = window.getComputedStyle(fieldEl);
    if (!style || style.display === "none" || style.visibility === "hidden") {
        return false;
    }
    if (typeof fieldEl.getClientRects !== "function") {
        return true;
    }
    return fieldEl.getClientRects().length > 0;
}

function resolveComposerSupportiveIToggleHost(slotKey = "", slotRefs = null) {
    const refs = slotRefs || getVerbComposerElements().slots[slotKey] || {};
    const candidates = [];
    const addCandidate = (fieldEl, canShow = true) => {
        if (!fieldEl || !canShow || !isComposerFieldVisibleForSupportiveToggle(fieldEl)) {
            return;
        }
        const rect = typeof fieldEl.getBoundingClientRect === "function"
            ? fieldEl.getBoundingClientRect()
            : { top: 0, left: 0 };
        candidates.push({
            fieldEl,
            top: Number(rect.top) || 0,
            left: Number(rect.left) || 0,
        });
    };
    const embedVisible = isComposerEmbedTextboxVisibleForSlot(slotKey, refs.embedInput || null);
    addCandidate(refs.embedField, embedVisible);
    addCandidate(refs.matrixField, true);
    if (!candidates.length) {
        return refs.matrixField || refs.embedField || null;
    }
    candidates.sort((a, b) => {
        const topDelta = a.top - b.top;
        if (Math.abs(topDelta) > 2) {
            return topDelta;
        }
        return a.left - b.left;
    });
    return candidates[0].fieldEl || null;
}

function stripComposerOptionalSupportiveMarker(value = "") {
    return replaceOptionalSupportiveMarkersWithLetters(value || "");
}

function getComposerOrderedRootInputEntries(slotKey = "", slotRefs = null) {
    const refs = slotRefs || getVerbComposerElements().slots[slotKey] || {};
    const entries = [];
    const addEntry = (fieldEl, inputEl, canShow = true) => {
        if (!fieldEl || !inputEl || !canShow || !isComposerFieldVisibleForSupportiveToggle(fieldEl)) {
            return;
        }
        const rect = fieldEl.getBoundingClientRect();
        entries.push({
            fieldEl,
            inputEl,
            top: Number(rect.top) || 0,
            left: Number(rect.left) || 0,
        });
    };
    const embedVisible = isComposerEmbedTextboxVisibleForSlot(slotKey, refs.embedInput || null);
    addEntry(refs.embedField, refs.embedInput || null, embedVisible);
    addEntry(refs.matrixField, refs.stemInput || null, true);
    entries.sort((a, b) => {
        const topDelta = a.top - b.top;
        if (Math.abs(topDelta) > 2) {
            return topDelta;
        }
        return a.left - b.left;
    });
    return entries;
}

function syncComposerSupportiveIInputMarkers(slots = {}, activeSlot = "") {
    void activeSlot;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const slotRefs = slots?.[slotKey] || {};
        if (slotRefs.embedInput) {
            slotRefs.embedInput.value = stripComposerOptionalSupportiveMarker(slotRefs.embedInput.value || "");
        }
        if (slotRefs.stemInput) {
            slotRefs.stemInput.value = stripComposerOptionalSupportiveMarker(slotRefs.stemInput.value || "");
        }
    });
    // Supportive i/y is serialized in regex (#verb) only; keep raíz textboxes unmarked/editable.
}

function syncComposerSupportiveITogglePlacement() {
    const { panel, slots } = getVerbComposerElements();
    const row = document.getElementById("composer-supportive-i-row");
    if (!row) {
        return;
    }
    const activeSlot = getComposerActiveSlotFromState();
    const slotRefs = slots?.[activeSlot] || {};
    const host = resolveComposerSupportiveIToggleHost(activeSlot, slotRefs);
    const panelHidden = Boolean(panel && panel.classList.contains("is-hidden"));
    const showToggle = isVerbInputModeComposer() && Boolean(host) && !panelHidden;
    syncComposerSupportiveIInputMarkers(slots, activeSlot);
    if (!showToggle) {
        row.hidden = true;
        row.setAttribute("aria-hidden", "true");
        return;
    }
    if (row.parentElement !== host) {
        host.appendChild(row);
    }
    row.hidden = false;
    row.setAttribute("aria-hidden", "false");
}

function getComposerEmbedValueForSlot(slotKey, slotRefs = null) {
    void slotRefs;
    const stateKeys = getComposerSlotStateKeys(slotKey);
    const stateValue = normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "");
    return stateValue;
}

function syncComposerEmbedSlotUi(slotKey, slotRefs = null) {
    if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return;
    }
    const refs = slotRefs || getVerbComposerElements().slots[slotKey] || {};
    const topRow = refs.topRow || null;
    const embedField = refs.embedField || null;
    const toggleButton = refs.prefixToggleButton || null;
    const embedInput = refs.embedInput || null;
    const embedValue = getComposerEmbedValueForSlot(slotKey, refs);
    const isFilled = Boolean(embedValue);
    const isOpen = true;
    const isPreview = false;
    const isVisible = true;
    if (topRow) {
        topRow.classList.toggle("is-embed-open", isOpen);
        topRow.classList.toggle("is-embed-preview", isPreview);
        topRow.classList.toggle("is-embed-filled", isFilled);
    }
    if (embedField) {
        embedField.setAttribute("aria-hidden", "false");
    }
    if (embedInput) {
        embedInput.disabled = false;
        embedInput.tabIndex = 0;
        embedInput.setAttribute("aria-hidden", String(!isVisible));
    }
    if (toggleButton) {
        toggleButton.hidden = true;
        toggleButton.disabled = true;
        toggleButton.setAttribute("aria-hidden", "true");
        toggleButton.setAttribute("aria-expanded", "true");
        toggleButton.setAttribute("aria-pressed", "true");
    }
}

function syncComposerEmbedUiFromState() {
    const { slots } = getVerbComposerElements();
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = true;
        ComposerEmbedPreviewState[slotKey] = false;
        syncComposerEmbedSlotUi(slotKey, slots[slotKey] || {});
    });
    syncComposerSlotChipVisibility();
}

function setComposerEmbedPreviewState(slotKey, isPreview) {
    if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return;
    }
    ComposerEmbedPreviewState[slotKey] = Boolean(isPreview);
    syncComposerEmbedSlotUi(slotKey);
    syncComposerSlotChipVisibility();
}

function toggleComposerEmbedOpen(slotKey) {
    if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return;
    }
    const { slots } = getVerbComposerElements();
    const refs = slots[slotKey] || {};
    const stateKeys = getComposerSlotStateKeys(slotKey);
    if (refs.embedInput) {
        VerbComposerState[stateKeys.embed] = normalizeComposerEmbedValue(refs.embedInput.value || "");
    }
    const currentlyOpen = Boolean(ComposerEmbedOpenState[slotKey]);
    const nextOpen = !currentlyOpen;
    ComposerEmbedOpenState[slotKey] = nextOpen;
    ComposerEmbedPreviewState[slotKey] = false;
    if (slotKey === getComposerActiveSlotFromState()) {
        VerbComposerState.embedPrefix = nextOpen
            ? normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "")
            : "";
        applyComposerStateToVerbInput({ triggerGenerate: true });
    }
    syncComposerEmbedSlotUi(slotKey, refs);
    syncComposerSlotChipVisibility();
    scheduleComposerSlotChipVisibilitySync();
    if (nextOpen) {
        focusComposerSlotEntryTarget(refs.embedInput || getComposerPreferredEntryInput(), { selectAll: true });
    }
}

function isComposerRootEmbedInput(inputEl) {
    if (!inputEl || String(inputEl.tagName || "").toUpperCase() !== "INPUT") {
        return false;
    }
    const inputId = String(inputEl.id || "");
    return COMPOSER_ROOT_EMBED_INPUT_IDS.has(inputId);
}

function bindComposerRootEmbedReadonlyShield(inputEl) {
    if (!isComposerRootEmbedInput(inputEl)) {
        return;
    }
    if (inputEl.dataset.autofillShieldBound === "true") {
        return;
    }
    const unlock = () => {
        inputEl.removeAttribute("readonly");
    };
    const relock = () => {
        inputEl.setAttribute("readonly", "readonly");
    };
    inputEl.addEventListener("focus", unlock);
    inputEl.addEventListener("pointerdown", unlock, { passive: true });
    inputEl.addEventListener("touchstart", unlock, { passive: true });
    inputEl.addEventListener("blur", relock);
    inputEl.dataset.autofillShieldBound = "true";
    relock();
}

function applyNoAutofillAttributes(inputEl) {
    if (!inputEl) {
        return;
    }
    const isRootEmbedInput = isComposerRootEmbedInput(inputEl);
    const autocompleteToken = isRootEmbedInput ? "new-password" : "off";
    inputEl.autocomplete = autocompleteToken;
    inputEl.setAttribute("autocomplete", autocompleteToken);
    inputEl.setAttribute("autocorrect", "off");
    inputEl.setAttribute("autocapitalize", "none");
    inputEl.setAttribute("spellcheck", "false");
    inputEl.setAttribute("data-lpignore", "true");
    inputEl.setAttribute("data-1p-ignore", "true");
    inputEl.setAttribute("data-form-type", "other");
    if (isRootEmbedInput) {
        inputEl.setAttribute("aria-autocomplete", "none");
        inputEl.setAttribute("autofill", "off");
        inputEl.inputMode = "text";
        bindComposerRootEmbedReadonlyShield(inputEl);
    }
    if (inputEl.tagName === "INPUT") {
        const inputType = String(inputEl.type || "").toLowerCase();
        const isTextLike = inputType === "text" || inputType === "search";
        if (isTextLike) {
            const idSeed = (inputEl.id || "field").replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "field";
            if (!inputEl.dataset.autofillAlias) {
                inputEl.dataset.autofillAlias = `naf-${idSeed}-${AUTOFILL_ALIAS_SALT}`;
            }
            inputEl.setAttribute("name", inputEl.dataset.autofillAlias);
        }
    }
}

function enforceNoAutofillOnTextboxes(root = document) {
    if (!root || typeof root.querySelectorAll !== "function") {
        return;
    }
    const forms = root.querySelectorAll("form");
    forms.forEach((formEl) => {
        formEl.setAttribute("autocomplete", "off");
    });
    const inputs = root.querySelectorAll("input[type=\"text\"], input[type=\"search\"], textarea");
    inputs.forEach((inputEl) => applyNoAutofillAttributes(inputEl));
}

function getComposerChipOptionSignature(selectEl) {
    if (!selectEl || !selectEl.options) {
        return "";
    }
    return Array.from(selectEl.options)
        .map((option) => `${option.value}::${option.textContent}`)
        .join("||");
}

function syncComposerChipGroup(container, selectEl, source = "other") {
    if (!container || !selectEl) {
        return;
    }
    const optionSignature = getComposerChipOptionSignature(selectEl);
    const previousSignature = container.dataset.optionSignature || "";
    if (optionSignature !== previousSignature) {
        container.innerHTML = "";
        const options = Array.from(selectEl.options);
        options.forEach((option) => {
            const optionValue = String(option.value ?? "");
            // Hide explicit "Sin ..." chips. Pressing an active chip again clears to empty.
            if (!optionValue) {
                return;
            }
            const button = document.createElement("button");
            button.type = "button";
            button.className = "verb-chip";
            button.dataset.chipValue = optionValue;
            button.textContent = option.textContent;
            button.addEventListener("click", () => {
                if (button.disabled) {
                    return;
                }
                const currentValue = String(selectEl.value ?? "");
                selectEl.value = currentValue === optionValue ? "" : optionValue;
                onVerbComposerControlChange(source);
            });
            container.appendChild(button);
        });
        container.dataset.optionSignature = optionSignature;
    }
    const buttons = Array.from(container.querySelectorAll(".verb-chip"));
    buttons.forEach((button) => {
        const value = button.dataset.chipValue ?? "";
        const option = Array.from(selectEl.options).find((item) => item.value === value);
        const isDisabled = Boolean(selectEl.disabled) || Boolean(option?.disabled);
        const isActive = String(selectEl.value) === value;
        button.disabled = isDisabled;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function getComposerSecondaryInventorySelectionEntries(tokens = []) {
    const inventory = getComposerSecondaryValenceInventory();
    const normalizedTokens = (Array.isArray(tokens) ? tokens : [])
        .map((token) => normalizeComposerSecondaryValenceSurfaceToken(token))
        .filter(Boolean)
        .slice(0, COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT);
    if (!normalizedTokens.length) {
        return [];
    }
    const usedIndexes = new Set();
    const entries = [];
    normalizedTokens.forEach((token, orderIndex) => {
        const nextIndex = inventory.findIndex(
            (candidate, poolIndex) => candidate === token && !usedIndexes.has(poolIndex)
        );
        if (nextIndex < 0) {
            return;
        }
        usedIndexes.add(nextIndex);
        entries.push({
            token,
            index: nextIndex,
            order: orderIndex,
        });
    });
    return entries;
}

function encodeComposerSecondaryInventoryTokens(tokens = []) {
    const normalizedTokens = (Array.isArray(tokens) ? tokens : [])
        .map((token) => normalizeComposerSecondaryValenceSurfaceToken(token))
        .filter(Boolean)
        .slice(0, COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT);
    if (!normalizedTokens.length) {
        return "";
    }
    if (normalizedTokens.length === 1) {
        return encodeComposerSecondaryValenceSelection("", normalizedTokens[0]);
    }
    return encodeComposerSecondaryValenceSelection(normalizedTokens[0], normalizedTokens[1]);
}

function syncComposerSecondaryValenceChipInventory(container, selectEl, source = "other") {
    if (!container || !selectEl) {
        return;
    }
    const families = COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.slice();
    const buttonSpecs = families.flatMap((family) => {
        const capacity = Math.max(
            1,
            Number(COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY[family] || 1)
        );
        return Array.from({ length: capacity }, (_unused, ordinal) => ({
            family,
            ordinal,
        }));
    });
    const inventorySignature = buttonSpecs
        .map((spec) => `${spec.family}:${spec.ordinal}`)
        .join("|");
    if (container.dataset.secondaryInventorySignature !== inventorySignature) {
        container.innerHTML = "";
        buttonSpecs.forEach((spec) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "verb-chip";
            button.dataset.chipFamily = spec.family;
            button.dataset.chipOrdinal = String(spec.ordinal);
            button.textContent = spec.family;
            button.addEventListener("click", () => {
                if (button.disabled) {
                    return;
                }
                const clickedFamily = String(button.dataset.chipFamily || "").trim().toLowerCase();
                const clickedOrdinal = Math.max(0, Number(button.dataset.chipOrdinal || 0));
                const currentTokens = getComposerSecondaryValenceTokens(selectEl.value);
                const familyInventory = getComposerSecondaryValenceFamilyInventoryForContext(clickedFamily, {
                    state: VerbComposerState,
                    scope: "secondary",
                    secondaryTokens: currentTokens,
                    secondaryIndex: clickedOrdinal,
                });
                if (!clickedFamily || !familyInventory.length) {
                    return;
                }
                const familyIndexes = currentTokens
                    .map((token, index) => ({
                        token: normalizeComposerSecondaryValenceSurfaceToken(token),
                        family: getComposerValenceFamilyToken(token),
                        index,
                    }))
                    .filter((entry) => entry.family === clickedFamily);
                let nextTokens = currentTokens
                    .map((token) => normalizeComposerSecondaryValenceSurfaceToken(token))
                    .filter(Boolean);
                const familySelection = familyIndexes[clickedOrdinal] || null;
                if (familySelection) {
                    const targetIndex = familySelection.index;
                    const reserved = nextTokens.filter((_token, index) => index !== targetIndex);
                    const nextVariant = getComposerNextFamilySurfaceToken(clickedFamily, familySelection.token, {
                        reservedTokens: reserved,
                        allowClear: true,
                        state: VerbComposerState,
                        scope: "secondary",
                        secondaryTokens: nextTokens,
                        secondaryIndex: targetIndex,
                    });
                    if (!nextVariant) {
                        nextTokens = nextTokens.filter((_token, index) => index !== targetIndex);
                    } else {
                        nextTokens[targetIndex] = nextVariant;
                    }
                } else {
                    if (
                        nextTokens.length >= COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT
                        || clickedOrdinal > familyIndexes.length
                    ) {
                        return;
                    }
                    const insertionIndex = familyIndexes.length
                        ? familyIndexes[familyIndexes.length - 1].index + 1
                        : Math.min(clickedOrdinal, nextTokens.length);
                    const previewTokens = nextTokens.slice();
                    previewTokens.splice(insertionIndex, 0, clickedFamily);
                    const nextUnused = getComposerNextFamilySurfaceToken(clickedFamily, "", {
                        reservedTokens: nextTokens,
                        state: VerbComposerState,
                        scope: "secondary",
                        secondaryTokens: previewTokens,
                        secondaryIndex: insertionIndex,
                    });
                    if (!nextUnused) {
                        return;
                    }
                    if (familyIndexes.length) {
                        const lastFamilyIndex = familyIndexes[familyIndexes.length - 1].index;
                        nextTokens.splice(lastFamilyIndex + 1, 0, nextUnused);
                    } else {
                        nextTokens.push(nextUnused);
                    }
                }
                selectEl.value = encodeComposerSecondaryInventoryTokens(nextTokens);
                onVerbComposerControlChange(source);
            });
            container.appendChild(button);
        });
        container.dataset.secondaryInventorySignature = inventorySignature;
    }
    const selectedTokens = getComposerSecondaryValenceTokens(selectEl.value);
    const counts = selectedTokens.reduce((acc, token) => {
        const family = getComposerValenceFamilyToken(token);
        if (!family) {
            return acc;
        }
        acc[family] = (acc[family] || 0) + 1;
        return acc;
    }, {});
    const totalSelected = selectedTokens.length;
    const buttons = Array.from(container.querySelectorAll(".verb-chip"));
    buttons.forEach((button) => {
        const family = String(button.dataset.chipFamily || "").trim().toLowerCase();
        const ordinal = Math.max(0, Number(button.dataset.chipOrdinal || 0));
        const capacity = Number(COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY[family] || 0);
        const tokenCount = Number(counts[family] || 0);
        const isActive = tokenCount > ordinal;
        const atTokenLimit = tokenCount >= capacity;
        const atTotalLimit = totalSelected >= COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT;
        const canOpenThisOrdinal = ordinal <= tokenCount;
        const isDisabled = Boolean(selectEl.disabled)
            || (!isActive && (!canOpenThisOrdinal || atTotalLimit || atTokenLimit));
        button.disabled = isDisabled;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        const activeTokens = selectedTokens.filter((token) => getComposerValenceFamilyToken(token) === family);
        button.setAttribute(
            "aria-label",
            activeTokens[ordinal]
                ? `${family} ${ordinal + 1}. Actual ${activeTokens[ordinal]}.`
                : `${family} ${ordinal + 1}`
        );
    });
}

function isComposerEmbedTextboxVisibleForSlot(slotKey, embedInput = null) {
    const stateVisible = Boolean(
        ComposerEmbedOpenState[slotKey]
        || ComposerEmbedPreviewState[slotKey]
    );
    if (!embedInput) {
        return stateVisible;
    }
    const ariaHidden = embedInput.getAttribute("aria-hidden");
    if (ariaHidden === "true") {
        return false;
    }
    if (ariaHidden === "false") {
        return true;
    }
    return stateVisible;
}

function scheduleComposerSlotChipVisibilitySync() {
    if (typeof window === "undefined" || typeof window.requestAnimationFrame !== "function") {
        return;
    }
    window.requestAnimationFrame(() => {
        syncComposerSlotChipVisibility();
    });
}

function syncComposerSlotChipVisibility() {
    const { matrixStemAffixSelectBySlot } = getVerbComposerElements();
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const matrixContainer = matrixStemAffixSelectBySlot?.[slotKey] || null;
        if (!matrixContainer) {
            return;
        }
        matrixContainer.hidden = false;
        matrixContainer.classList.remove("is-hidden-by-slot-toggle");
        matrixContainer.setAttribute("aria-hidden", "false");
    });
}

function syncComposerTransitivitySlotButtons() {
    const { transitivitySlotButtons, transitivitySelect } = getVerbComposerElements();
    const hasSelectedTransitivity = isComposerTransitivitySelected();
    if (transitivitySelect) {
        transitivitySelect.value = hasSelectedTransitivity ? VerbComposerState.transitivity : "";
    }
    syncComposerSlotPanelVisibility();
    syncComposerEntryBoardTabsPlacement();
    syncComposerSlotTabsLabels();
    if (!transitivitySlotButtons || !transitivitySlotButtons.length) {
        return;
    }
    transitivitySlotButtons.forEach((button, index) => {
        const token = button.getAttribute("data-composer-transitivity") || "";
        const isActive = hasSelectedTransitivity && token === VerbComposerState.transitivity;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive || (!hasSelectedTransitivity && index === 0) ? 0 : -1;
    });
}

function getComposerTransitivityTabsLabel() {
    return getUiCopyLabel("composer-transitivity-label", "Valencia verbal");
}

function syncComposerSlotTabsLabel(slotTabs) {
    if (!slotTabs) {
        return;
    }
    if (!slotTabs.querySelector("[data-composer-transitivity]")) {
        return;
    }
    const labelText = getComposerTransitivityTabsLabel();
    slotTabs.setAttribute("aria-label", labelText);
    const labelEl = Array.from(slotTabs.children).find((child) => (
        child.classList && child.classList.contains("verb-composer__slot-tabs-label")
    )) || null;
    if (labelEl) {
        labelEl.remove();
    }
}

function syncComposerSlotTabsLabels(root = document) {
    if (!root || typeof root.querySelectorAll !== "function") {
        return;
    }
    Array.from(root.querySelectorAll(".verb-composer__slot-tabs")).forEach(syncComposerSlotTabsLabel);
}

function getComposerEntryBoardTabsLabel() {
    return getUiCopyLabel("composer-entry-board-label", "Tipo de cláusula");
}

function syncComposerEntryBoardTabsLabel(entryBoardTabs) {
    if (!entryBoardTabs) {
        return;
    }
    const labelText = getComposerEntryBoardTabsLabel();
    entryBoardTabs.setAttribute("aria-label", labelText);
    entryBoardTabs.dataset.hasLabel = "true";
    let labelEl = Array.from(entryBoardTabs.children).find((child) => (
        child.classList && child.classList.contains("verb-entry-board-tabs-label")
    )) || null;
    if (!labelEl) {
        labelEl = document.createElement("span");
        labelEl.className = "verb-entry-board-tabs-label";
        labelEl.setAttribute("aria-hidden", "true");
        entryBoardTabs.insertBefore(labelEl, entryBoardTabs.firstElementChild || null);
    }
    labelEl.textContent = labelText;
}

function syncComposerEntryBoardTabsPlacement() {
    const stagePanel = document.getElementById("composer-slot-stage");
    const entryBoardTabs = document.getElementById("verb-entry-board-tabs");
    if (!stagePanel || !entryBoardTabs) {
        return;
    }
    if (entryBoardTabs.parentElement !== stagePanel || stagePanel.firstElementChild !== entryBoardTabs) {
        stagePanel.insertBefore(entryBoardTabs, stagePanel.firstElementChild || null);
    }
    syncComposerEntryBoardTabsLabel(entryBoardTabs);
}

function syncComposerUtilityActionsPlacement() {
    const utilityActions = document.querySelector(".verb-block__utility-actions");
    const titleToolbar = document.querySelector("#container-inputs .panel-block-title .verb-block__top-controls");
    if (!titleToolbar || !utilityActions) {
        return;
    }
    if (utilityActions.parentElement !== titleToolbar) {
        titleToolbar.appendChild(utilityActions);
    }
    titleToolbar.classList.remove("is-utility-replanted");
    titleToolbar.removeAttribute("aria-hidden");
}

function getComposerOperationBoard() {
    const ordinaryNncActive = typeof isOrdinaryNncGenerationModeEnabled === "function"
        && isOrdinaryNncGenerationModeEnabled();
    return ordinaryNncActive ? "ordinary-nnc" : getComposerEntryBoard();
}

function getComposerOperationOrderLabel(board = "") {
    if (board === "ordinary-nnc") {
        return "Cláusula nominal: entrada -> predicado base; salida -> pers1-pers2 -> conector num1-num2 -> referencia";
    }
    if (board === COMPOSER_ENTRY_BOARD.nounToVerb) {
        return "Verbalización nominal: tablero -> fuente nominal -> verbalización -> valencia verbal -> objeto 1/objeto 2 -> direccional";
    }
    return "Cláusula verbal: tablero -> valencia verbal -> direccional -> incorporado -> objeto 1/objeto 2 -> predicado base";
}

function getComposerMatrixFieldLabel({
    ordinaryNncActive = false,
    activeBoard = "",
} = {}) {
    if (ordinaryNncActive) {
        return "Predicado (base)";
    }
    if (activeBoard === COMPOSER_ENTRY_BOARD.nounToVerb) {
        return "Fuente nominal (base)";
    }
    return "Predicado (base)";
}

function getComposerMatrixInputTagLabel({
    ordinaryNncActive = false,
    activeBoard = "",
} = {}) {
    if (ordinaryNncActive) {
        return "base";
    }
    if (activeBoard === COMPOSER_ENTRY_BOARD.nounToVerb) {
        return "nominal";
    }
    return "base";
}

function setComposerOperationSlotMetadata(element, slot = "", order = "") {
    if (!element) {
        return;
    }
    if (slot) {
        element.dataset.operationSlot = slot;
        element.style.order = String(order || "");
    } else {
        delete element.dataset.operationSlot;
        element.style.order = "";
    }
}

function syncComposerOperationSlotOrderMetadata(stagePanel = document.getElementById("composer-slot-stage")) {
    if (!stagePanel) {
        return;
    }
    const board = getComposerOperationBoard();
    stagePanel.dataset.operationBoard = board;
    stagePanel.dataset.operationOrder = getComposerOperationOrderLabel(board);
    stagePanel.setAttribute("aria-description", stagePanel.dataset.operationOrder);

    const entryBoardTabs = document.getElementById("verb-entry-board-tabs");
    const transitivityTabs = Array.from(stagePanel.children).find((child) => (
        child.classList
        && child.classList.contains("verb-composer__slot-tabs")
        && !child.classList.contains("verb-composer__ordinary-nnc-class-tabs")
    )) || null;
    const topRow = Array.from(stagePanel.children).find((child) => (
        child.classList && child.classList.contains("verb-composer__top-row")
    )) || null;
    const bottomRow = Array.from(stagePanel.children).find((child) => (
        child.classList && child.classList.contains("verb-composer__bottom-row")
    )) || null;
    const matrixField = topRow?.querySelector(".verb-composer__matrix-field") || null;
    const embedField = topRow?.querySelector(".verb-composer__embed-field") || null;
    const directionalHost = bottomRow?.querySelector(".verb-composer__directional-host") || null;
    const objectPair = bottomRow?.querySelector(".verb-composer__object-pair") || null;

    setComposerOperationSlotMetadata(entryBoardTabs, "entry-board", 1);
    setComposerOperationSlotMetadata(transitivityTabs, "vnc-valency-shell", 2);

    if (board === "ordinary-nnc") {
        setComposerOperationSlotMetadata(matrixField, "nnc-predicate", 10);
        setComposerOperationSlotMetadata(embedField, "inactive-embed", "");
        setComposerOperationSlotMetadata(directionalHost, "inactive-directional", "");
        setComposerOperationSlotMetadata(objectPair, "inactive-object-valency", "");
        return;
    }

    if (board === COMPOSER_ENTRY_BOARD.nounToVerb) {
        setComposerOperationSlotMetadata(embedField, "source-nominal-embed", 10);
        setComposerOperationSlotMetadata(matrixField, "source-nominal-verbalizer", 20);
        setComposerOperationSlotMetadata(objectPair, "target-object-valency", 30);
        setComposerOperationSlotMetadata(directionalHost, "target-directional-prefix", 40);
        return;
    }

    setComposerOperationSlotMetadata(directionalHost, "directional-prefix", 10);
    setComposerOperationSlotMetadata(embedField, "incorporated-prefix", 20);
    setComposerOperationSlotMetadata(objectPair, "object-valency", 30);
    setComposerOperationSlotMetadata(matrixField, "predicate-core", 40);
}

function syncComposerSlotPanelVisibility() {
    const stagePanel = document.getElementById("composer-slot-stage");
    const slotShells = Array.from(document.querySelectorAll("[data-composer-slot-shell]"));
    const directionalField = document.getElementById("composer-directional-field");
    if (!stagePanel || !slotShells.length) {
        return;
    }
    const selectedToken = isComposerTransitivitySelected() ? VerbComposerState.transitivity : "";
    const activeToken = selectedToken || COMPOSER_TRANSITIVITY.intransitive;

    const moveSlotTabsToPanelRoot = (panel) => {
        if (!panel) {
            return;
        }
        const directSlotTabs = Array.from(panel.children).find((child) => (
            child.classList && child.classList.contains("verb-composer__slot-tabs")
        )) || null;
        const slotTabs = directSlotTabs || panel.querySelector(".verb-composer__slot-tabs");
        if (!slotTabs) {
            return;
        }
        if (slotTabs.parentElement !== panel || panel.firstElementChild !== slotTabs) {
            panel.insertBefore(slotTabs, panel.firstElementChild || null);
        }
        syncComposerSlotTabsLabel(slotTabs);
    };

    const moveSlotContentChildren = (fromEl, toEl) => {
        if (!fromEl || !toEl) {
            return;
        }
        Array.from(fromEl.children).forEach((child) => {
            const isTopRow = child.classList?.contains("verb-composer__top-row");
            const isBottomRow = child.classList?.contains("verb-composer__bottom-row");
            const isTransitivityTabs = child.classList?.contains("verb-composer__slot-tabs")
                && !child.classList.contains("verb-composer__ordinary-nnc-class-tabs");
            if (isTopRow || isBottomRow || isTransitivityTabs) {
                toEl.appendChild(child);
            }
        });
    };

    const currentToken = String(stagePanel.dataset.activeTransitivity || "");
    const currentTopRow = Array.from(stagePanel.children).find((child) => (
        child.classList?.contains("verb-composer__top-row")
    )) || null;
    const currentSlotKey = String(currentTopRow?.getAttribute("data-composer-top-row") || "");
    const currentShell = slotShells.find((shell) => (
        (shell.getAttribute("data-composer-slot-shell") || "") === currentToken
    )) || slotShells.find((shell) => shell.id === `composer-slot-${currentSlotKey}`) || null;
    const activeShell = slotShells.find((shell) => (
        (shell.getAttribute("data-composer-slot-shell") || "") === activeToken
    )) || null;

    if (currentShell && currentShell !== activeShell) {
        moveSlotContentChildren(stagePanel, currentShell);
    }
    if (activeShell && activeShell !== currentShell) {
        moveSlotContentChildren(activeShell, stagePanel);
    }
    if (activeShell && !stagePanel.querySelector(":scope > .verb-composer__top-row")) {
        moveSlotContentChildren(activeShell, stagePanel);
    }
    slotShells.forEach(moveSlotTabsToPanelRoot);
    moveSlotTabsToPanelRoot(stagePanel);
    syncComposerEntryBoardTabsPlacement();
    syncComposerUtilityActionsPlacement();

    slotShells.forEach((shell) => {
        shell.hidden = true;
        shell.setAttribute("aria-hidden", "true");
        shell.setAttribute("aria-current", "false");
    });

    stagePanel.dataset.activeTransitivity = activeToken;
    stagePanel.setAttribute("data-slot-transitivity", selectedToken);
    stagePanel.classList.add("is-active-slot");
    stagePanel.hidden = false;
    stagePanel.setAttribute("aria-hidden", "false");
    stagePanel.setAttribute("aria-current", "true");
    stagePanel.setAttribute(
        "aria-label",
        !selectedToken
            ? "Grupo de transitividad sin seleccionar"
            : (activeToken === COMPOSER_TRANSITIVITY.bitransitive
                ? "Grupo bitransitivo"
                : (activeToken === COMPOSER_TRANSITIVITY.transitive
                    ? "Grupo transitivo"
                    : "Grupo intransitivo"))
    );

    const activeDirectionalHost = stagePanel.querySelector("[data-composer-directional-host]");
    if (directionalField && activeDirectionalHost && directionalField.parentElement !== activeDirectionalHost) {
        activeDirectionalHost.appendChild(directionalField);
    }
    syncComposerOperationSlotOrderMetadata(stagePanel);
}

function syncComposerOrdinaryNncClassTabActiveState(nounClass = "") {
    const classTabs = document.getElementById("composer-ordinary-nnc-class-tabs");
    if (!classTabs) {
        return;
    }
    const rawInputValue = document.getElementById("verb")?.value || "";
    const activeClass = normalizeComposerOrdinaryNncNounClass(nounClass || "")
        || normalizeComposerOrdinaryNncNounClass(parseComposerOrdinaryNncAnalogueInput(rawInputValue)?.nounClass || "");
    if (!activeClass) {
        return;
    }
    classTabs.querySelectorAll("[data-ordinary-nnc-class]").forEach((button) => {
        const isActive = button.getAttribute("data-ordinary-nnc-class") === activeClass;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-pressed", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });
}

function setComposerOrdinaryNncState(patch = {}) {
    const nextPatch = { ...(patch || {}) };
    if (Object.prototype.hasOwnProperty.call(nextPatch, "nounClass")) {
        const nounClass = normalizeComposerOrdinaryNncNounClass(nextPatch.nounClass);
        const currentAnalogue = typeof document !== "undefined"
            ? parseComposerOrdinaryNncAnalogueInput(document.getElementById("verb")?.value || "")
            : null;
        const currentStem = currentAnalogue?.stem || getComposerActiveStemValue();
        setComposerActiveSlotStem(normalizeComposerStem(currentStem));
        nextPatch.nounClass = nounClass;
    }
    if (typeof setOrdinaryNncGenerationState === "function") {
        setOrdinaryNncGenerationState(nextPatch);
    }
    syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass);
    applyComposerStateToVerbInput({
        triggerGenerate: true,
        immediateRefresh: true,
    });
    renderVerbComposerFromState();
    if (typeof syncEntradaUrlSegmentsFromCurrentState === "function") {
        syncEntradaUrlSegmentsFromCurrentState({ replace: true });
    }
    syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass);
    if (typeof window !== "undefined" && nextPatch.nounClass) {
        window.setTimeout(() => {
            syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass);
        }, 0);
        window.setTimeout(() => {
            syncComposerOrdinaryNncClassTabActiveState(nextPatch.nounClass);
        }, 80);
    }
}

function appendComposerOrdinaryNncChipGroup(parent, {
    label = "",
    options = [],
    activeId = "",
    onSelect = () => {},
    lockedByFixture = false,
} = {}) {
    if (!parent) {
        return;
    }
    const group = document.createElement("div");
    group.className = "verb-composer__ordinary-nnc-group";
    if (lockedByFixture) {
        group.dataset.lockedByFixture = "true";
    }
    const groupLabel = document.createElement("span");
    groupLabel.className = "verb-composer__ordinary-nnc-label";
    groupLabel.textContent = label;
    group.appendChild(groupLabel);
    const chips = document.createElement("div");
    chips.className = "verb-composer__chips verb-composer__ordinary-nnc-chips";
    chips.setAttribute("role", "group");
    chips.setAttribute("aria-label", label);
    options.forEach((entry) => {
        const id = String(entry.id ?? "");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "verb-chip verb-composer__ordinary-nnc-chip";
        button.dataset.ordinaryNncControl = label;
        button.dataset.ordinaryNncValue = id;
        button.textContent = entry.label ?? id;
        button.title = entry.title || "";
        if (entry.lockedByFixture) {
            button.dataset.lockedByFixture = "true";
            button.classList.add("is-locked-by-fixture");
        }
        if (entry.disabled) {
            button.disabled = true;
            button.setAttribute("aria-disabled", "true");
        }
        const isActive = id === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.addEventListener("click", () => {
            if (button.disabled) {
                return;
            }
            onSelect(id, entry);
        });
        chips.appendChild(button);
    });
    group.appendChild(chips);
    parent.appendChild(group);
}

function getComposerOrdinaryNncFixtureMetadata() {
    if (typeof resolveOrdinaryNncFixture !== "function") {
        return null;
    }
    const rawFallback = typeof document !== "undefined"
        ? (document.getElementById("verb")?.value || "")
        : "";
    const bundle = buildComposerOrdinaryNncInputBundle(VerbComposerState, rawFallback);
    const probe = bundle.stem
        ? resolveOrdinaryNncFixture({ stem: bundle.stem, states: ["absolutive"], numbers: ["singular"] })
        : null;
    const fixture = probe?.fixture || null;
    if (!fixture) {
        return null;
    }
    return {
        stem: bundle.stem,
        fixture,
        nounClass: normalizeComposerOrdinaryNncNounClass(fixture.nounClass || "") || "",
        animacy: fixture.animacy === "animate" ? "animate" : "inanimate",
    };
}

function renderComposerOrdinaryNncClassTabs(stagePanel, {
    active = false,
    activeClass = "",
    fixtureNounClass = "",
} = {}) {
    if (!stagePanel) {
        return;
    }
    let classTabs = document.getElementById("composer-ordinary-nnc-class-tabs");
    if (!active) {
        classTabs?.remove();
        return;
    }
    if (!classTabs) {
        classTabs = document.createElement("div");
        classTabs.id = "composer-ordinary-nnc-class-tabs";
        classTabs.className = "verb-composer__slot-tabs verb-composer__ordinary-nnc-class-tabs";
        classTabs.setAttribute("role", "tablist");
    }
    const fixedClass = normalizeComposerOrdinaryNncNounClass(fixtureNounClass || "") || "";
    const displayedClass = normalizeComposerOrdinaryNncNounClass(activeClass || "") || fixedClass;
    if (fixedClass) {
        classTabs.dataset.fixtureNounClass = fixedClass;
    } else {
        delete classTabs.dataset.fixtureNounClass;
    }
    classTabs.setAttribute("aria-label", "Conector num1-num2 de la cláusula nominal");
    classTabs.innerHTML = "";
    const labelEl = document.createElement("span");
    labelEl.className = "verb-composer__slot-tabs-label";
    labelEl.setAttribute("aria-hidden", "true");
    labelEl.textContent = "Conector num1-num2";
    classTabs.appendChild(labelEl);
    [
        { id: "t", label: "t", title: "clase t: (...V)t" },
        { id: "ti", label: "ti", title: "clase ti: (...C)ti" },
        { id: "in", label: "in", title: "clase in: (...C)in" },
        { id: "zero", label: "Ø", title: "clase Ø: (...C/V)" },
    ].forEach((entry, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "verb-composer__slot-transitivity verb-composer__slot-tab";
        button.dataset.ordinaryNncClass = entry.id;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-label", `Clase ${entry.label}`);
        button.title = entry.title;
        button.textContent = entry.label;
        const isFixtureAlternative = Boolean(fixedClass && entry.id !== fixedClass);
        const isActive = entry.id === displayedClass;
        if (isFixtureAlternative) {
            button.dataset.fixtureAlternative = "true";
            button.dataset.fixtureNounClass = fixedClass;
            button.title = `${entry.title}; ficha registrada: conector ${fixedClass === "zero" ? "Ø" : fixedClass}`;
            button.classList.add("is-fixture-alternative");
        }
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-pressed", String(isActive));
        button.tabIndex = isActive || (!displayedClass && index === 0) ? 0 : -1;
        button.addEventListener("click", () => {
            if (button.disabled) {
                return;
            }
            setComposerOrdinaryNncState({ nounClass: entry.id || "zero" });
        });
        classTabs.appendChild(button);
    });
    const slotTabs = Array.from(stagePanel.children).find((child) => (
        child.classList && child.classList.contains("verb-composer__slot-tabs") && child.id !== classTabs.id
    )) || null;
    const insertionPoint = slotTabs?.nextSibling || stagePanel.firstElementChild?.nextSibling || null;
    if (classTabs.parentElement !== stagePanel) {
        stagePanel.insertBefore(classTabs, insertionPoint);
    }
}

function renderComposerOrdinaryNncDigitalControls() {
    const stagePanel = document.getElementById("composer-slot-stage");
    if (!stagePanel) {
        return;
    }
    let controls = document.getElementById("composer-ordinary-nnc-controls");
    controls?.remove();
    document.getElementById("composer-ordinary-nnc-class-tabs")?.remove();
    syncComposerOperationSlotOrderMetadata(stagePanel);
}

function transposeComposerSlotTextboxes(fromTransitivity, toTransitivity) {
    const sourceSlot = getComposerSlotKeyForTransitivity(fromTransitivity);
    const targetSlot = getComposerSlotKeyForTransitivity(toTransitivity);
    if (!sourceSlot || !targetSlot || sourceSlot === targetSlot) {
        return;
    }
    const { slots } = getVerbComposerElements();
    const source = slots[sourceSlot];
    const target = slots[targetSlot];
    if (!source || !target) {
        return;
    }
    if (source.embedInput && target.embedInput) {
        target.embedInput.value = source.embedInput.value;
    }
    if (source.stemInput && target.stemInput) {
        const sourceStemRawValue = source.stemInput.value || "";
        const sourceSelectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[sourceSlot] || "auto";
        const sourceEditableRoot = extractComposerSerialEditableRoot(
            sourceStemRawValue,
            sourceSelectedType
        );
        const shouldCarryEditableRoot = Boolean(
            sourceEditableRoot
            && isComposerFixedSerialType(sourceSelectedType)
        );
        target.stemInput.value = shouldCarryEditableRoot
            ? sourceEditableRoot
            : getComposerCanonicalStemFromInputValue(sourceStemRawValue, sourceSlot);
    }
    if (source.objectInput && target.objectInput) {
        target.objectInput.value = source.objectInput.value;
    }
}

function carryComposerEmbedVisibilityAcrossTransitivity(fromTransitivity, toTransitivity) {
    const sourceSlot = getComposerSlotKeyForTransitivity(fromTransitivity);
    const targetSlot = getComposerSlotKeyForTransitivity(toTransitivity);
    if (!sourceSlot || !targetSlot || sourceSlot === targetSlot) {
        return;
    }
    const sourceEmbedVisible = Boolean(
        ComposerEmbedOpenState[sourceSlot]
        || ComposerEmbedPreviewState[sourceSlot]
    );
    ComposerEmbedOpenState[targetSlot] = sourceEmbedVisible;
    ComposerEmbedPreviewState[targetSlot] = false;
}

function syncComposerChipGroupsFromState() {
    const {
        valenceSelectIntransitive,
        valenceChipsIntransitive,
        valenceSelect,
        valenceChips,
        valenceSelectSecondary,
        valenceChipsSecondary,
        directionalSelect,
        directionalChips,
    } = getVerbComposerElements();
    syncComposerTransitivitySlotButtons();
    syncComposerValenceFamilyChipGroup(
        valenceChipsIntransitive,
        valenceSelectIntransitive,
        getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.intransitive),
        "other"
    );
    syncComposerValenceFamilyChipGroup(
        valenceChips,
        valenceSelect,
        getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.transitive),
        "other"
    );
    syncComposerSecondaryValenceChipInventory(valenceChipsSecondary, valenceSelectSecondary, "other");
    syncComposerChipGroup(directionalChips, directionalSelect, "other");
    syncComposerSlotChipVisibility();
}

function getComposerMatrixRootTokensForSlot(slotKey = "") {
    const slotConfig = getComposerSlotConfig(slotKey);
    const transitivity = slotConfig?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    return COMPOSER_MATRIX_ROOT_TOKENS[transitivity]
        || COMPOSER_MATRIX_ROOT_TOKENS[COMPOSER_TRANSITIVITY.intransitive];
}

function getComposerMatrixEmbedStem(embedValue = "") {
    const embedTokens = getComposerEmbedTokens(embedValue);
    if (embedTokens.length) {
        return embedTokens[embedTokens.length - 1];
    }
    return normalizeComposerStem(embedValue);
}

function getComposerLastNucleusFromStem(stemValue = "") {
    const normalizedStem = normalizeComposerStem(stemValue);
    if (!normalizedStem) {
        return "";
    }
    const letters = splitVerbLetters(normalizedStem);
    for (let i = letters.length - 1; i >= 0; i -= 1) {
        if (isVerbLetterVowel(letters[i])) {
            return letters[i];
        }
    }
    return "";
}

function getComposerNiCyclePrefixVowelsFromEmbed(embedStem = "") {
    const lastNucleus = getComposerLastNucleusFromStem(embedStem);
    if (lastNucleus === "a" || lastNucleus === "i") {
        return COMPOSER_MATRIX_ROOT_NI_SHORT_VOWELS.slice();
    }
    if (lastNucleus === "e" || lastNucleus === "u") {
        return COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.slice();
    }
    return COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.slice();
}

function getComposerNiFamilyCycleForms(token = "", embedStem = "") {
    const normalizedToken = normalizeComposerStem(token);
    if (!COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES.has(normalizedToken)) {
        return [];
    }
    const forms = [];
    const prefixVowels = getComposerNiCyclePrefixVowelsFromEmbed(embedStem);
    prefixVowels.forEach((vowel) => {
        forms.push(`${vowel}${normalizedToken}`);
    });
    return Array.from(new Set(forms));
}

function getComposerNiFamilyStemVariant(stemValue = "") {
    const normalizedStem = normalizeComposerStem(stemValue);
    if (!normalizedStem) {
        return null;
    }
    const bases = ["nia", "ni", "na"];
    for (let i = 0; i < bases.length; i += 1) {
        const base = bases[i];
        if (normalizedStem === base) {
            return { base, prefix: "" };
        }
        if (normalizedStem.endsWith(base) && normalizedStem.length === base.length + 1) {
            const prefix = normalizedStem[0];
            if (COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.includes(prefix)) {
                return { base, prefix };
            }
        }
    }
    return null;
}

function getComposerWaTransitiveCycleForms(token = "", transitivity = COMPOSER_TRANSITIVITY.intransitive) {
    const normalizedToken = normalizeComposerStem(token);
    if (normalizedToken !== "wa" && normalizedToken !== "wia") {
        return [];
    }
    if (
        transitivity !== COMPOSER_TRANSITIVITY.transitive
        && transitivity !== COMPOSER_TRANSITIVITY.bitransitive
    ) {
        return [];
    }
    return COMPOSER_MATRIX_ROOT_WA_TRANSITIVE_VOWELS.map((vowel) => `${vowel}${normalizedToken}`);
}

function getComposerMatrixTokenCycleForms({
    token = "",
    embedStem = "",
    transitivity = COMPOSER_TRANSITIVITY.intransitive,
} = {}) {
    const niForms = getComposerNiFamilyCycleForms(token, embedStem);
    if (niForms.length) {
        return niForms;
    }
    const waForms = getComposerWaTransitiveCycleForms(token, transitivity);
    if (waForms.length) {
        return waForms;
    }
    return [];
}

function inferWiStockFormativeFromBaseStem(baseStem = "") {
    const normalizedBaseStem = normalizeComposerStem(baseStem);
    if (!normalizedBaseStem) {
        return "";
    }
    const rootBase = getNonReduplicatedRoot(normalizedBaseStem) || normalizedBaseStem;
    const letters = splitVerbLetters(rootBase);
    if (!letters.length) {
        return "";
    }
    if (letters[letters.length - 1] === "l") {
        return "i";
    }
    if (letters[letters.length - 1] === "t") {
        return "a";
    }
    let lastVowelIndex = -1;
    for (let i = letters.length - 1; i >= 0; i -= 1) {
        if (isVerbLetterVowel(letters[i])) {
            lastVowelIndex = i;
            break;
        }
    }
    if (lastVowelIndex < 0) {
        return "";
    }
    const hasPostNucleusCoda = letters
        .slice(lastVowelIndex + 1)
        .some((letter) => isVerbLetterConsonant(letter));
    if (!hasPostNucleusCoda) {
        return "";
    }
    const lastVowel = letters[lastVowelIndex];
    if (lastVowel === "e" || lastVowel === "a") {
        return "i";
    }
    if (lastVowel === "i" || lastVowel === "u") {
        return "a";
    }
    return "";
}

function resolveComposerWiMatrixRootFromEmbed(embedStem = "") {
    const stockFormative = inferWiStockFormativeFromBaseStem(embedStem);
    if (stockFormative === "i" || stockFormative === "a") {
        return `${stockFormative}wi`;
    }
    return "wi";
}

function isComposerMatrixTokenActiveForStem({
    token = "",
    stem = "",
    transitivity = COMPOSER_TRANSITIVITY.intransitive,
} = {}) {
    const normalizedToken = normalizeComposerStem(token);
    const normalizedStem = normalizeComposerStem(stem);
    if (!normalizedToken || !normalizedStem) {
        return false;
    }
    if (COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES.has(normalizedToken)) {
        if (
            normalizedStem.endsWith(normalizedToken)
            && normalizedStem.length === normalizedToken.length + 1
            && COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS.includes(normalizedStem[0])
        ) {
            return true;
        }
    }
    const waCycleForms = getComposerWaTransitiveCycleForms(normalizedToken, transitivity);
    if (waCycleForms.includes(normalizedStem)) {
        return true;
    }
    if (normalizedToken === normalizedStem) {
        return true;
    }
    if (transitivity !== COMPOSER_TRANSITIVITY.intransitive) {
        return false;
    }
    if (normalizedToken === "ya" && (normalizedStem === "tiya" || normalizedStem === "wiya")) {
        return true;
    }
    if (normalizedToken === "wi" && (normalizedStem === "iwi" || normalizedStem === "awi")) {
        return true;
    }
    return false;
}

function maybeRefreshComposerManualMatrixStemFromEmbed() {
    if (!VerbComposerState.stemManualOverride) {
        return false;
    }
    const activeSlot = getComposerActiveSlotFromState();
    const slotConfig = getComposerSlotConfig(activeSlot);
    const stateKeys = getComposerSlotStateKeys(activeSlot);
    const currentStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
    const embedValue = VerbComposerState[stateKeys.embed] || "";
    const embedStem = getComposerMatrixEmbedStem(embedValue);
    if (
        slotConfig?.transitivity === COMPOSER_TRANSITIVITY.intransitive
        && isComposerMatrixTokenActiveForStem({
            token: "wi",
            stem: currentStem,
            transitivity: COMPOSER_TRANSITIVITY.intransitive,
        })
    ) {
        const refreshedWiStem = resolveComposerMatrixRootTokenSelection({
            token: "wi",
            currentStem,
            embedStem,
            transitivity: COMPOSER_TRANSITIVITY.intransitive,
        });
        const normalizedWiStem = normalizeComposerStem(refreshedWiStem);
        if (normalizedWiStem && normalizedWiStem !== currentStem) {
            VerbComposerState[stateKeys.stem] = normalizedWiStem;
            return true;
        }
    }
    const niVariant = getComposerNiFamilyStemVariant(currentStem);
    if (!niVariant) {
        return false;
    }
    const niCycleForms = getComposerNiFamilyCycleForms(niVariant.base, embedStem);
    if (!niCycleForms.length) {
        if (!currentStem) {
            return false;
        }
        if (normalizeComposerEmbedValue(embedValue)) {
            return false;
        }
        VerbComposerState[stateKeys.stem] = "";
        return true;
    }
    if (niCycleForms.includes(currentStem)) {
        return false;
    }
    const refreshedNiStem = niCycleForms[0] || "";
    if (!refreshedNiStem || refreshedNiStem === currentStem) {
        return false;
    }
    VerbComposerState[stateKeys.stem] = refreshedNiStem;
    return true;
}

function resolveComposerMatrixRootTokenSelection({
    token = "",
    currentStem = "",
    embedStem = "",
    transitivity = COMPOSER_TRANSITIVITY.intransitive,
} = {}) {
    const normalizedToken = normalizeComposerStem(token);
    const normalizedCurrentStem = normalizeComposerStem(currentStem);
    if (!normalizedToken) {
        return "";
    }
    if (COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES.has(normalizedToken)) {
        const niCycleForms = getComposerNiFamilyCycleForms(normalizedToken, embedStem);
        return niCycleForms[0] || "";
    }
    const waCycleForms = getComposerWaTransitiveCycleForms(normalizedToken, transitivity);
    if (waCycleForms.length) {
        return waCycleForms[0] || "";
    }
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive && normalizedToken === "wi") {
        return resolveComposerWiMatrixRootFromEmbed(embedStem);
    }
    if (
        transitivity === COMPOSER_TRANSITIVITY.intransitive
        && normalizedToken === "ya"
        && COMPOSER_MATRIX_ROOT_YA_BASES.has(normalizedCurrentStem)
    ) {
        return `${normalizedCurrentStem}ya`;
    }
    return normalizedToken;
}

function getComposerSerialSpecFromStem(stemValue = "") {
    const rawStem = String(stemValue || "").toLowerCase().trim();
    const normalizedStem = normalizeComposerStem(rawStem);
    if (!normalizedStem) {
        return {
            slotCount: 1,
            mask: "_",
            suffix: "",
            family: "monomorphemic",
            isPolymorphemic: false,
        };
    }
    const orderedSuffixes = Object.keys(COMPOSER_SERIAL_SUFFIX_SLOT_COUNT)
        .sort((left, right) => right.length - left.length);
    let matchedSuffix = "";
    for (let index = 0; index < orderedSuffixes.length; index += 1) {
        const suffix = orderedSuffixes[index];
        if (normalizedStem.endsWith(suffix)) {
            matchedSuffix = suffix;
            break;
        }
    }
    const slotCount = Math.max(1, Number(COMPOSER_SERIAL_SUFFIX_SLOT_COUNT[matchedSuffix] || 1));
    return {
        slotCount,
        mask: Array.from({ length: slotCount }, () => "_").join("-"),
        suffix: matchedSuffix,
        family: matchedSuffix || "monomorphemic",
        isPolymorphemic: slotCount > 1,
    };
}

function buildComposerSerialMask(slotCount = 1) {
    const count = Math.max(1, Number(slotCount || 1));
    return Array.from({ length: count }, () => "_").join("-");
}

function getComposerSerialInputTemplate(selectedType = "auto", slotCount = 1) {
    const type = String(selectedType || "auto").toLowerCase();
    if (type === "mono") {
        return {
            pattern: "[a-z_]+",
            placeholder: "_",
            title: "Mascara serial: escribe letras a-z en el segmento.",
        };
    }
    if (type === "ti-have" || type === "ti-become") {
        return {
            pattern: "[a-z_]+ti",
            placeholder: "_ti",
            title: "Mascara serial: raizti.",
        };
    }
    if (type === "ta") {
        return {
            pattern: "[a-z_]+ta",
            placeholder: "_ta",
            title: "Mascara serial: raizta.",
        };
    }
    if (type === "ya") {
        return {
            pattern: "[a-z_]+ya",
            placeholder: "_ya",
            title: "Mascara serial: raizya.",
        };
    }
    if (type === "ua") {
        return {
            pattern: "[a-z_]+ua",
            placeholder: "_ua",
            title: "Mascara serial: raizua.",
        };
    }
    if (type === "awi") {
        return {
            pattern: "[a-z_]+awi",
            placeholder: "_awi",
            title: "Mascara serial: raizawi.",
        };
    }
    if (type === "iwi") {
        return {
            pattern: "[a-z_]+iwi",
            placeholder: "_iwi",
            title: "Mascara serial: raiziwi.",
        };
    }
    const count = Math.max(1, Number(slotCount || 1));
    if (count <= 1) {
        return {
            pattern: "[a-z_]+",
            placeholder: "_",
            title: "Mascara serial: escribe letras a-z en el segmento.",
        };
    }
    if (count === 2) {
        return {
            pattern: "[a-z_]+",
            placeholder: "__",
            title: "Mascara serial general: segmentos continuos.",
        };
    }
    return {
        pattern: "[a-z_]+",
        placeholder: "___",
        title: "Mascara serial general: segmentos continuos.",
    };
}

function getComposerSerialTypeOptionByValue(value = "") {
    const token = String(value || "").trim().toLowerCase();
    return COMPOSER_SERIAL_TYPE_OPTIONS.find((option) => option.value === token) || null;
}

function getComposerMatrixAffixSpecialCatalog(slotKey = "") {
    const slotConfig = getComposerSlotConfig(slotKey);
    const transitivity = slotConfig?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    const groupCatalog = transitivity === COMPOSER_TRANSITIVITY.intransitive
        ? COMPOSER_INTRANSITIVE_MATRIX_AFFIX_GROUPS
        : COMPOSER_TRANSITIVE_MATRIX_AFFIX_GROUPS;
    const optionCatalog = transitivity === COMPOSER_TRANSITIVITY.intransitive
        ? COMPOSER_INTRANSITIVE_MATRIX_AFFIX_OPTIONS
        : COMPOSER_TRANSITIVE_MATRIX_AFFIX_OPTIONS;
    if (!optionCatalog.length) {
        return [];
    }
    const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
    const currentSurfaceValue = normalizeComposerStem(stemInput?.value || "");
    const nounInfo = getComposerNounStemClassInfo(currentSurfaceValue);
    const bridge = analyzeComposerNounToVerbSeriesBridge(currentSurfaceValue);
    const expectedSeriesSuffix = bridge.expectedSeriesSuffix;
    const resolvedAutoWiSuffix = bridge.autoWiSuffix;
    return optionCatalog
        .map((entry) => {
        const group = groupCatalog.find(
            (groupEntry) => groupEntry.key === entry.groupKey
        ) || groupCatalog[0];
        const normalizedValue = String(entry.value || "").trim().toLowerCase();
        const normalizedTemplateSuffix = normalizeComposerStem(
            entry.templateSuffix || normalizedValue.replace(/^_+/, "")
        );
        const andrewsJudgment = getComposerMatrixAffixAndrewsJudgment(slotKey, {
            ...entry,
            templateSuffix: normalizedTemplateSuffix,
            value: normalizedValue,
        });
        const meta = String(andrewsJudgment?.category || entry.meta || "").trim();
        const detailLabel = [
            `${group.label} ${entry.label}`,
            meta,
            andrewsJudgment?.detail || "",
        ].filter(Boolean).join(" · ");
        const isBlocked = !isComposerNounToVerbTemplateSuffixCompatible(
            currentSurfaceValue,
            normalizedTemplateSuffix,
            nounInfo,
            bridge
        );
        return {
            ...entry,
            value: normalizedValue,
            templateSuffix: normalizedTemplateSuffix,
            serialType: String(entry.serialType || "").trim().toLowerCase(),
            groupLabel: group.label,
            triggerPrefix: getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb
                ? getComposerMatrixAffixTriggerPrefix(entry.kind || "token")
                : group.triggerPrefix,
            detailLabel,
            meta,
            andrewsJudgment,
            isBlocked,
            isExpected: (
                Boolean(expectedSeriesSuffix)
                && !isBlocked
                && (
                    normalizedTemplateSuffix === expectedSeriesSuffix
                    || (
                        normalizedTemplateSuffix === "wiauto"
                        && Boolean(resolvedAutoWiSuffix)
                        && resolvedAutoWiSuffix === expectedSeriesSuffix
                    )
                )
            ),
        };
    });
}

function getComposerMatrixAffixSpecialGroups(slotKey = "") {
    const transitivity = getComposerSlotConfig(slotKey)?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    return transitivity === COMPOSER_TRANSITIVITY.intransitive
        ? COMPOSER_INTRANSITIVE_MATRIX_AFFIX_GROUPS
        : COMPOSER_TRANSITIVE_MATRIX_AFFIX_GROUPS;
}

function getComposerMatrixAffixSpecialEntry(
    slotKey = "",
    {
        key = "",
        value = "",
        serialType = "",
        templateSuffix = "",
    } = {}
) {
    const catalog = getComposerMatrixAffixSpecialCatalog(slotKey);
    if (!catalog.length) {
        return null;
    }
    const normalizedKey = String(key || "").trim().toLowerCase();
    if (normalizedKey) {
        const keyMatch = catalog.find((entry) => entry.key === normalizedKey);
        if (keyMatch) {
            return keyMatch;
        }
    }
    const normalizedSerialType = String(serialType || "").trim().toLowerCase();
    if (normalizedSerialType && normalizedSerialType !== "auto" && normalizedSerialType !== "mono") {
        const serialMatch = catalog.find((entry) => entry.serialType === normalizedSerialType);
        if (serialMatch) {
            return serialMatch;
        }
    }
    const normalizedValue = String(value || "").trim().toLowerCase();
    if (normalizedValue) {
        const valueMatch = catalog.find((entry) => entry.value === normalizedValue);
        if (valueMatch) {
            return valueMatch;
        }
    }
    const normalizedTemplateSuffix = normalizeComposerStem(templateSuffix);
    if (normalizedTemplateSuffix) {
        const templateMatches = catalog.filter((entry) => (
            entry.templateSuffix === normalizedTemplateSuffix
            && !entry.serialType
        ));
        if (templateMatches.length === 1) {
            return templateMatches[0];
        }
    }
    return null;
}

function getComposerMatrixAffixStateFromEntry(entry = null) {
    if (!entry) {
        return null;
    }
    return {
        kind: entry.kind || "manual",
        key: entry.key || "manual",
        shortLabel: entry.shortLabel || "",
        detailLabel: entry.detailLabel || entry.label || "Libre",
        triggerPrefix: entry.triggerPrefix || getComposerMatrixAffixTriggerPrefix(entry.kind || "manual"),
        value: entry.value || "",
        serialType: entry.serialType || "",
        templateSuffix: entry.templateSuffix || "",
        andrewsJudgment: entry.andrewsJudgment || null,
    };
}

function getComposerSerialDisplaySpec({
    slotKey = "",
    normalizedStem = "",
    inferredSpec = null,
} = {}) {
    const stem = normalizeComposerStem(normalizedStem);
    const spec = inferredSpec || getComposerSerialSpecFromStem(stem);
    const safeSlotKey = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "a";
    const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[safeSlotKey] || "auto";
    const selectedOption = getComposerSerialTypeOptionByValue(selectedType);
    if (selectedOption && selectedOption.value !== "auto") {
        const selectedSlotCount = Math.max(1, Number(selectedOption.slotCount || 1));
        COMPOSER_SERIAL_SLOT_PREF_BY_SLOT[safeSlotKey] = selectedSlotCount;
        return {
            slotCount: selectedSlotCount,
            mask: buildComposerSerialMask(selectedSlotCount),
            suffix: selectedOption.value,
            family: selectedOption.family || selectedOption.value,
            isPolymorphemic: selectedSlotCount > 1,
            selectedType: selectedOption.value,
        };
    }
    if (spec.slotCount > 1) {
        COMPOSER_SERIAL_SLOT_PREF_BY_SLOT[safeSlotKey] = spec.slotCount;
    }
    // Auto mode should not force pre-existing serial dashes.
    // Only surface multi-slot masks when a serial stem is actually present/inferred.
    const resolvedSlotCount = spec.slotCount > 1 ? spec.slotCount : 1;
    return {
        slotCount: resolvedSlotCount,
        mask: buildComposerSerialMask(resolvedSlotCount),
        suffix: spec.suffix || "",
        family: spec.slotCount > 1 ? spec.family : (resolvedSlotCount > 1 ? "serial" : spec.family),
        isPolymorphemic: resolvedSlotCount > 1,
        selectedType: "auto",
    };
}

function splitComposerSerialSegmentsFromStem(stemValue = "") {
    const normalizedStem = normalizeComposerStem(stemValue);
    const serialSpec = getComposerSerialSpecFromStem(normalizedStem);
    if (!normalizedStem || serialSpec.slotCount <= 1) {
        return {
            normalizedStem,
            serialSpec,
            segments: normalizedStem ? [normalizedStem] : [],
        };
    }
    if (serialSpec.suffix === "ua") {
        return {
            normalizedStem,
            serialSpec,
            segments: [normalizedStem.slice(0, -2), "u", "a"],
        };
    }
    if (serialSpec.suffix === "awi") {
        return {
            normalizedStem,
            serialSpec,
            segments: [normalizedStem.slice(0, -3), "a", "wi"],
        };
    }
    if (serialSpec.suffix === "iwi") {
        return {
            normalizedStem,
            serialSpec,
            segments: [normalizedStem.slice(0, -3), "i", "wi"],
        };
    }
    if (serialSpec.suffix === "ti") {
        return {
            normalizedStem,
            serialSpec,
            segments: [normalizedStem.slice(0, -2), "ti"],
        };
    }
    if (serialSpec.suffix === "ya") {
        return {
            normalizedStem,
            serialSpec,
            segments: [normalizedStem.slice(0, -2), "ya"],
        };
    }
    return {
        normalizedStem,
        serialSpec,
        segments: [normalizedStem],
    };
}

function getComposerSlotKeyByStemInput(stemInput = null) {
    if (!stemInput || !stemInput.id) {
        return "";
    }
    const inputId = String(stemInput.id || "");
    return COMPOSER_SLOT_KEYS.find((slotKey) => getComposerSlotConfig(slotKey)?.ids?.stem === inputId) || "";
}

function getComposerSlotInputDescriptor(inputEl = null) {
    if (!inputEl || !inputEl.id) {
        return null;
    }
    const inputId = String(inputEl.id || "");
    for (const slotKey of COMPOSER_SLOT_KEYS) {
        const config = getComposerSlotConfig(slotKey);
        if (config?.ids?.stem === inputId) {
            return { slotKey, role: "stem", stateKey: config.state.stem };
        }
        if (config?.ids?.embed === inputId) {
            return { slotKey, role: "embed", stateKey: config.state.embed };
        }
        if (config?.ids?.objectEmbed === inputId) {
            return { slotKey, role: "objectEmbed", stateKey: config.state.objectEmbed };
        }
    }
    return null;
}

function getComposerSlotEntryRoleLabel(role = "") {
    if (role === "stem") {
        return "base";
    }
    if (role === "objectEmbed") {
        return "incorporado objeto";
    }
    return "incorporado";
}

function getComposerSerialEditableSegmentIndexes(selectedType = "auto", slotCount = 1) {
    const count = Math.max(1, Number(slotCount || 1));
    if (count <= 1) {
        return [0];
    }
    const fixed = getComposerSerialFixedSegments(selectedType, count);
    const editable = [];
    for (let index = 0; index < count; index += 1) {
        if (!fixed[index]) {
            editable.push(index);
        }
    }
    return editable.length ? editable : [0];
}

function resolveComposerSerialEditableSegmentIndex(selectedType = "auto", slotCount = 1, desiredIndex = 0) {
    const count = Math.max(1, Number(slotCount || 1));
    const boundedDesiredIndex = Math.max(0, Math.min(Number(desiredIndex || 0), count - 1));
    const editable = getComposerSerialEditableSegmentIndexes(selectedType, count);
    if (editable.includes(boundedDesiredIndex)) {
        return boundedDesiredIndex;
    }
    let fallback = editable[0];
    for (let index = 0; index < editable.length; index += 1) {
        const editableIndex = editable[index];
        if (editableIndex <= boundedDesiredIndex) {
            fallback = editableIndex;
            continue;
        }
        break;
    }
    return fallback;
}

function buildComposerSegmentsFromFixedSelectedType(
    stemValue = "",
    selectedType = "auto",
    slotCount = 1,
    options = {}
) {
    const stem = normalizeComposerStem(stemValue);
    const count = Math.max(1, Number(slotCount || 1));
    if (!stem || count <= 1) {
        return null;
    }
    const fixed = getComposerSerialFixedSegments(selectedType, count);
    const editable = getComposerSerialEditableSegmentIndexes(selectedType, count);
    // Supported fixed serial families are root + fixed suffix chunks.
    if (editable.length !== 1 || editable[0] !== 0 || fixed[0]) {
        return null;
    }
    let suffix = "";
    for (let index = 1; index < count; index += 1) {
        const fixedToken = fixed[index] || "";
        if (!fixedToken) {
            return null;
        }
        suffix += fixedToken;
    }
    if (!suffix) {
        return null;
    }
    const previousEditableRoot = normalizeComposerStem(options.previousEditableRoot || "");
    let editableRoot = stem;
    if (stem.endsWith(suffix) && stem.length >= suffix.length) {
        editableRoot = stem.slice(0, -suffix.length);
    } else if (previousEditableRoot && stem.startsWith(previousEditableRoot)) {
        const typedSuffixFragment = stem.slice(previousEditableRoot.length);
        if (suffix.startsWith(typedSuffixFragment)) {
            // Preserve the previous root when the user edits inside the locked suffix.
            editableRoot = previousEditableRoot;
        }
    }
    const segments = Array.from({ length: count }, () => "");
    segments[0] = editableRoot;
    for (let index = 1; index < count; index += 1) {
        segments[index] = fixed[index] || "";
    }
    return segments;
}

function sanitizeComposerSerialSegmentsFromRaw(rawValue = "", slotCount = 1, selectedType = "auto") {
    const count = Math.max(1, Number(slotCount || 1));
    if (count <= 1) {
        return [normalizeComposerStem(rawValue)];
    }
    const rawSegments = String(rawValue || "").toLowerCase().split("-");
    const segments = rawSegments
        .slice(0, count)
        .map((segment) => String(segment || "").replace(/[^a-z]/g, ""));
    while (segments.length < count) {
        segments.push("");
    }
    const appendToEditableSegment = (value = "", desiredIndex = count - 1) => {
        const extra = String(value || "").replace(/[^a-z]/g, "");
        if (!extra) {
            return;
        }
        const targetIndex = resolveComposerSerialEditableSegmentIndex(selectedType, count, desiredIndex);
        segments[targetIndex] = `${segments[targetIndex] || ""}${extra}`;
    };
    const fixedSegments = getComposerSerialFixedSegments(selectedType, count);
    for (let index = 0; index < count; index += 1) {
        const fixedToken = fixedSegments[index] || "";
        if (!fixedToken) {
            continue;
        }
        const segment = segments[index] || "";
        if (!segment || segment === fixedToken) {
            continue;
        }
        let extra = "";
        if (segment.startsWith(fixedToken)) {
            extra = segment.slice(fixedToken.length);
        } else {
            extra = segment;
        }
        segments[index] = fixedToken;
        appendToEditableSegment(extra, index);
    }
    const overflow = rawSegments.slice(count).join("").replace(/[^a-z]/g, "");
    appendToEditableSegment(overflow, count - 1);
    return segments;
}

function buildComposerLockedSerialSegmentsFromStem(normalizedStem = "", slotCount = 1, options = {}) {
    const count = Math.max(1, Number(slotCount || 1));
    const stem = normalizeComposerStem(normalizedStem);
    if (count <= 1) {
        return [stem];
    }
    if (!stem) {
        return Array.from({ length: count }, () => "");
    }
    const preferSplitFromStem = options.preferSplitFromStem !== false;
    if (preferSplitFromStem) {
        const splitInfo = splitComposerSerialSegmentsFromStem(stem);
        const splitSegments = Array.isArray(splitInfo.segments)
            ? splitInfo.segments.map((segment) => normalizeComposerStem(segment))
            : [];
        const hasStructuredSplit = splitSegments.length > 1;
        if (hasStructuredSplit) {
            const normalized = splitSegments.slice(0, count);
            while (normalized.length < count) {
                normalized.push("");
            }
            return normalized;
        }
    }
    const selectedType = String(options.selectedType || "auto").toLowerCase();
    const selectedTypeSegments = buildComposerSegmentsFromFixedSelectedType(
        stem,
        selectedType,
        count,
        {
            previousEditableRoot: options.previousEditableRoot || "",
        }
    );
    if (selectedTypeSegments) {
        return selectedTypeSegments;
    }
    const fallback = [stem];
    while (fallback.length < count) {
        fallback.push("");
    }
    return fallback.slice(0, count);
}

function getComposerSerialFixedSegments(selectedType = "auto", slotCount = 1) {
    const type = String(selectedType || "auto").toLowerCase();
    const count = Math.max(1, Number(slotCount || 1));
    const fixed = Array.from({ length: count }, () => "");
    if ((type === "ti-have" || type === "ti-become") && count >= 2) {
        fixed[count - 1] = "ti";
        return fixed;
    }
    if (type === "ta" && count >= 2) {
        fixed[count - 1] = "ta";
        return fixed;
    }
    if (type === "ya" && count >= 2) {
        fixed[count - 1] = "ya";
        return fixed;
    }
    if (type === "ua" && count >= 3) {
        fixed[count - 2] = "u";
        fixed[count - 1] = "a";
        return fixed;
    }
    if (type === "awi" && count >= 3) {
        fixed[count - 2] = "a";
        fixed[count - 1] = "wi";
        return fixed;
    }
    if (type === "iwi" && count >= 3) {
        fixed[count - 2] = "i";
        fixed[count - 1] = "wi";
        return fixed;
    }
    return fixed;
}

function applyComposerSerialFixedSegments(segments = [], selectedType = "auto", slotCount = 1) {
    const count = Math.max(1, Number(slotCount || 1));
    const normalized = Array.from({ length: count }, (_unused, index) => (
        normalizeComposerStem(Array.isArray(segments) ? (segments[index] || "") : "")
    ));
    const fixed = getComposerSerialFixedSegments(selectedType, count);
    for (let index = 0; index < count; index += 1) {
        if (fixed[index]) {
            normalized[index] = fixed[index];
        }
    }
    return normalized;
}

function getComposerCanonicalStemFromSerialSegments(segments = [], selectedType = "auto", slotCount = 1) {
    const count = Math.max(1, Number(slotCount || 1));
    const normalizedSegments = Array.from({ length: count }, (_unused, index) => (
        normalizeComposerStem(Array.isArray(segments) ? (segments[index] || "") : "")
    ));
    const editableIndexes = getComposerSerialEditableSegmentIndexes(selectedType, count);
    const hasEditableContent = editableIndexes.some((index) => Boolean(normalizedSegments[index]));
    if (!hasEditableContent) {
        return "";
    }
    const locked = applyComposerSerialFixedSegments(normalizedSegments, selectedType, count);
    return normalizeComposerStem(locked.join(""));
}

function getComposerCanonicalStemFromInputValue(rawValue = "", slotKey = "a") {
    const safeSlotKey = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "a";
    const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[safeSlotKey] || "auto";
    const stemInput = getVerbComposerElements().slots[safeSlotKey]?.stemInput || null;
    const dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, safeSlotKey);
    const normalizedStem = normalizeComposerStem(rawValue);
    if (selectedType === "auto" && dropdownTemplateSuffix) {
        return resolveComposerLockedTemplateStem(normalizedStem, dropdownTemplateSuffix, {
            slotKey: safeSlotKey,
            surfaceValue: rawValue,
        }).canonicalStem;
    }
    const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
    const displaySpec = getComposerSerialDisplaySpec({
        slotKey: safeSlotKey,
        normalizedStem,
        inferredSpec,
    });
    const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
    const segments = String(rawValue || "").includes("-")
        ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType)
        : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
            preferSplitFromStem: true,
            selectedType: displaySpec.selectedType,
        });
    return getComposerCanonicalStemFromSerialSegments(
        segments,
        displaySpec.selectedType,
        slotCount
    );
}

function getComposerTiCausativeClassFromSerialType(selectedType = "") {
    const type = String(selectedType || "").toLowerCase();
    if (type === "ti-have" || type === "tia-have") {
        return "have";
    }
    if (type === "ti-become" || type === "tia-become") {
        return "become";
    }
    return "";
}

function isComposerFixedSerialType(selectedType = "") {
    const type = String(selectedType || "").toLowerCase();
    return [
        "ti-have",
        "ti-become",
        "ta",
        "ya",
        "ua",
        "awi",
        "iwi",
    ].includes(type);
}

function extractComposerSerialEditableRoot(stemValue = "", selectedType = "auto") {
    const type = String(selectedType || "auto").toLowerCase();
    if (!isComposerFixedSerialType(type)) {
        return normalizeComposerStem(stemValue);
    }
    const option = getComposerSerialTypeOptionByValue(type);
    const slotCount = Math.max(1, Number(option?.slotCount || 1));
    const rawValue = String(stemValue || "");
    const normalizedStem = normalizeComposerStem(rawValue);
    if (!normalizedStem) {
        return "";
    }
    const segments = rawValue.includes("-")
        ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, type)
        : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
            preferSplitFromStem: true,
            selectedType: type,
        });
    const editableIndexes = getComposerSerialEditableSegmentIndexes(type, slotCount);
    const editableRoot = editableIndexes
        .map((index) => normalizeComposerStem(segments[index] || ""))
        .join("");
    return normalizeComposerStem(editableRoot);
}

function getComposerStemInputTemplateSuffix(stemInput = null, slotKey = "") {
    const resolvedSlotKey = COMPOSER_SLOT_KEYS.includes(slotKey)
        ? slotKey
        : (getComposerSlotKeyByStemInput(stemInput) || "");
    if (
        resolvedSlotKey
        && getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb
    ) {
        return normalizeComposerStem(
            COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[resolvedSlotKey]
            || stemInput?.dataset?.dropdownTemplateSuffix
            || ""
        );
    }
    return normalizeComposerStem(stemInput?.dataset?.dropdownTemplateSuffix || "");
}

function extractComposerTemplateEditableRoot(stemValue = "", templateSuffix = "") {
    const suffix = normalizeComposerStem(templateSuffix);
    const normalizedStem = normalizeComposerStem(stemValue);
    if (!suffix || !normalizedStem) {
        return suffix ? "" : normalizedStem;
    }
    if (normalizedStem.endsWith(suffix) && normalizedStem.length >= suffix.length) {
        return normalizedStem.slice(0, -suffix.length);
    }
    return normalizedStem;
}

function getComposerNounStemClassInfo(stemValue = "") {
    const noun = normalizeComposerStem(stemValue);
    if (!noun) {
        return {
            surface: "",
            stem: "",
            suffix: "",
            classKey: "zero",
        };
    }
    if (noun.length > 2 && noun.endsWith("ti")) {
        return {
            surface: noun,
            stem: noun.slice(0, -2),
            suffix: "ti",
            classKey: "ti",
        };
    }
    if (noun.length > 2 && noun.endsWith("in")) {
        return {
            surface: noun,
            stem: noun.slice(0, -2),
            suffix: "in",
            classKey: "in",
        };
    }
    if (noun.length > 1 && noun.endsWith("t")) {
        return {
            surface: noun,
            stem: noun.slice(0, -1),
            suffix: "t",
            classKey: "t",
        };
    }
    return {
        surface: noun,
        stem: noun,
        suffix: "",
        classKey: "zero",
    };
}

function resolveComposerNounToVerbSeriesJoinStem(stemBase = "") {
    const letters = splitVerbLetters(stemBase || "");
    const finalLetter = letters[letters.length - 1] || "";
    const needsYJoiner = ["a", "e", "i", "u"].includes(finalLetter);
    const glideStem = finalLetter === "j"
        ? `${stemBase.slice(0, -1)}y`
        : stemBase;
    return {
        finalLetter,
        needsYJoiner,
        stemBase,
        glideStem,
    };
}

var ComposerNounToVerbTroncoRoundtripCache = new Map();
var COMPOSER_NOUN_TO_VERB_EXPLICIT_SERIES_SUFFIXES = Object.freeze(["ewi", "awi", "iwi", "uwi"]);
var COMPOSER_NOUN_TO_VERB_ROUNDTRIP_SERIES_SUFFIXES = Object.freeze(["wi", ...COMPOSER_NOUN_TO_VERB_EXPLICIT_SERIES_SUFFIXES]);
var COMPOSER_NOUN_TO_VERB_LITERAL_SERIES_SUFFIXES = Object.freeze([
    "awi",
    "iwi",
    "ewi",
    "uwi",
    "awa",
    "iwa",
    "ewa",
    "uwa",
]);
var COMPOSER_NOUN_TO_VERB_ALL_BRIDGE_SUFFIXES = Object.freeze([
    ...COMPOSER_NOUN_TO_VERB_ROUNDTRIP_SERIES_SUFFIXES,
    "wa",
    "ewa",
    "awa",
    "iwa",
    "uwa",
]);

function getComposerPatientivoTroncoSurfaceSetForVerb(verb = "") {
    const normalizedVerb = normalizeComposerStem(verb);
    if (!normalizedVerb) {
        return new Set();
    }
    const cached = ComposerNounToVerbTroncoRoundtripCache.get(normalizedVerb);
    if (cached) {
        return cached;
    }
    const surfaces = new Set();
    try {
        const parsed = typeof parseVerbInput === "function" ? parseVerbInput(normalizedVerb) : null;
        if (parsed && typeof buildPatientivoDerivationInput === "function" && typeof buildPatientivoTroncoDerivations === "function") {
            const input = buildPatientivoDerivationInput({
                verb: normalizedVerb,
                analysisVerb: parsed.analysisVerb || parsed.verb || normalizedVerb,
                rawAnalysisVerb: parsed.rawAnalysisVerb || "",
                isTransitive: parsed.isTransitive === true,
                objectPrefix: parsed.objectPrefix || "",
                directionalPrefix: parsed.directionalPrefix || "",
                isYawi: parsed.isYawi === true,
                hasImpersonalTaPrefix: parsed.hasImpersonalTaPrefix === true,
                boundPrefix: parsed.boundPrefix || "",
                boundPrefixes: parsed.boundPrefixes || [],
                boundExplicitFlags: parsed.boundExplicitFlags || [],
                directionalPrefixFromSlash: parsed.directionalPrefixFromSlash || "",
                sourceSplitPrefix: parsed.sourceSplitPrefix || "",
                sourcePrefix: parsed.sourcePrefix || "",
                sourceBase: parsed.sourceBase || parsed.canonicalRuleBase || "",
                sourceCompositeBase: parsed.sourceCompositeBase || "",
                hasSlashMarker: parsed.hasSlashMarker === true,
                hasSuffixSeparator: parsed.hasSuffixSeparator === true,
                hasLeadingDash: parsed.hasLeadingDash === true,
                hasBoundMarker: parsed.hasBoundMarker === true,
                hasCompoundMarker: parsed.hasCompoundMarker === true,
                hasOptionalSupportiveI: parsed.hasOptionalSupportiveI === true,
                hasNonspecificValence: parsed.hasNonspecificValence === true,
                exactBaseVerb: parsed.exactBaseVerb || "",
                suppletiveStemSet: parsed.suppletiveStemSet || null,
                rootPlusYaBase: parsed.rootPlusYaBase || "",
                rootPlusYaBasePronounceable: parsed.rootPlusYaBasePronounceable || "",
            });
            buildPatientivoTroncoDerivations(input).forEach((entry) => {
                surfaces.add(normalizeComposerStem(`${entry?.verb || ""}${entry?.subjectSuffix || ""}`));
            });
        }
    } catch (_error) {
        // Empty during preload or partial test state.
    }
    ComposerNounToVerbTroncoRoundtripCache.set(normalizedVerb, surfaces);
    return surfaces;
}

function doesComposerNounRoundTripThroughPatientivoTronco(nounSurface = "", verb = "") {
    const normalizedNoun = normalizeComposerStem(nounSurface);
    const normalizedVerb = normalizeComposerStem(verb);
    if (!normalizedNoun || !normalizedVerb) {
        return false;
    }
    return getComposerPatientivoTroncoSurfaceSetForVerb(normalizedVerb).has(normalizedNoun);
}

function canComposerNounRebuildVerbThroughSeries(nounSurface = "", verb = "") {
    const normalizedNoun = normalizeComposerStem(nounSurface);
    const normalizedVerb = normalizeComposerStem(verb);
    if (!normalizedNoun || !normalizedVerb) {
        return false;
    }
    return COMPOSER_NOUN_TO_VERB_ALL_BRIDGE_SUFFIXES.some((suffix) => (
        buildComposerNounToVerbSeriesRoundTripCandidates(normalizedNoun, suffix).some((candidate) => (
            normalizeComposerStem(candidate) === normalizedVerb
        ))
    ));
}

function getComposerNounToVerbWVCandidates(surfaceValue = "", finalNucleus = "i") {
    const nounInfo = getComposerNounStemClassInfo(surfaceValue);
    const surface = normalizeComposerStem(nounInfo.surface || "");
    const stemBase = normalizeComposerStem(nounInfo.stem || "");
    const resolvedNucleus = finalNucleus === "a" ? "a" : "i";
    const suffix = `w${resolvedNucleus}`;
    if (!surface || !stemBase) {
        return [];
    }
    const candidates = [];
    const seen = new Set();
    const push = (value = "") => {
        const normalized = normalizeComposerStem(value);
        if (!normalized || seen.has(normalized)) {
            return;
        }
        seen.add(normalized);
        candidates.push(normalized);
    };
    if (surface.endsWith(`${suffix}t`) && surface.length > suffix.length + 1) {
        push(surface.slice(0, -(suffix.length + 1)) + suffix);
    }
    push(`${stemBase}${suffix}`);
    if (nounInfo.classKey === "ti") {
        return candidates;
    }
    const letters = splitVerbLetters(stemBase);
    const finalLetter = letters[letters.length - 1] || "";
    if (
        shouldComposerNounUseSurfaceAsSeriesBase(nounInfo)
        && surface.endsWith("ti")
        && !["k", "ch", "s", "sh"].includes(finalLetter)
    ) {
        push(`${surface}${suffix}`);
    }
    if (["k", "ch", "s", "sh"].includes(finalLetter)) {
        push(`${letters.slice(0, -1).join("")}${suffix}`);
    }
    if (isVerbLetterConsonant(finalLetter)) {
        ["e", "a", "i", "u"].forEach((supportVowel) => {
            push(`${stemBase}${supportVowel}${suffix}`);
        });
    }
    return candidates;
}

function getComposerNounToVerbWiCandidates(surfaceValue = "") {
    return getComposerNounToVerbWVCandidates(surfaceValue, "i");
}

function getComposerNounToVerbWaCandidates(surfaceValue = "") {
    return getComposerNounToVerbWVCandidates(surfaceValue, "a");
}

function resolveComposerNounToVerbWiCandidate(surfaceValue = "") {
    const nounSurface = normalizeComposerStem(surfaceValue);
    const candidates = getComposerNounToVerbWiCandidates(nounSurface);
    for (const candidate of candidates) {
        if (doesComposerNounRoundTripThroughPatientivoTronco(nounSurface, candidate)) {
            return candidate;
        }
    }
    return candidates[0] || "";
}

function resolveComposerNounToVerbWaCandidate(surfaceValue = "") {
    const nounSurface = normalizeComposerStem(surfaceValue);
    const candidates = getComposerNounToVerbWaCandidates(nounSurface);
    for (const candidate of candidates) {
        if (doesComposerNounRoundTripThroughPatientivoTronco(nounSurface, candidate)) {
            return candidate;
        }
    }
    return candidates[0] || "";
}

function getComposerAutoWiDecisionBase(stemValue = "") {
    const normalized = normalizeComposerStem(stemValue);
    if (normalized.length > 2 && normalized.endsWith("wi")) {
        return normalized.slice(0, -2);
    }
    return normalized;
}

function resolveComposerAutoWiFamilySuffix(surfaceValue = "", fallbackSuffix = "awi") {
    const decisionBase = getComposerAutoWiDecisionBase(surfaceValue);
    const letters = splitVerbLetters(decisionBase || "");
    const lastVowel = [...letters].reverse().find((letter) => ["a", "e", "i", "u"].includes(letter)) || "";
    if (lastVowel === "a" || lastVowel === "e") {
        return "iwi";
    }
    if (lastVowel === "i" || lastVowel === "u") {
        return "awi";
    }
    const normalizedFallback = normalizeComposerStem(fallbackSuffix);
    return normalizedFallback === "iwi" ? "iwi" : "awi";
}

function replaceComposerAutoWiFamilySuffix(stemValue = "", resolvedSuffix = "awi") {
    const normalizedStem = normalizeComposerStem(stemValue);
    const normalizedSuffix = normalizeComposerStem(resolvedSuffix);
    if (!normalizedStem || !normalizedSuffix) {
        return "";
    }
    const familyMatch = normalizedStem.match(/^(.*?)[aeiu]wi$/i);
    if (!familyMatch) {
        return "";
    }
    return normalizeComposerStem(`${familyMatch[1] || ""}${normalizedSuffix}`);
}

function shouldComposerSeriesUseYJoiner(suffix = "") {
    const normalizedSuffix = normalizeComposerStem(suffix);
    return normalizedSuffix.startsWith("a");
}

function shouldComposerNounUseSurfaceAsSeriesBase(nounInfo = null) {
    if (!nounInfo || typeof nounInfo !== "object") {
        return false;
    }
    return nounInfo.classKey !== "ti";
}

function buildComposerNounToVerbSeriesRoundTripCandidates(surfaceValue = "", suffix = "") {
    const normalizedSuffix = normalizeComposerStem(suffix);
    if (normalizedSuffix === "wi") {
        return getComposerNounToVerbWiCandidates(surfaceValue);
    }
    if (normalizedSuffix === "wa") {
        return getComposerNounToVerbWaCandidates(surfaceValue);
    }
    if (!COMPOSER_NOUN_TO_VERB_LITERAL_SERIES_SUFFIXES.includes(normalizedSuffix)) {
        return [];
    }
    const nounInfo = getComposerNounStemClassInfo(surfaceValue);
    const stemBase = normalizeComposerStem(nounInfo.stem || "");
    const stemLetters = splitVerbLetters(stemBase);
    const finalLetter = stemLetters[stemLetters.length - 1] || "";
    const lastBefore = stemLetters[stemLetters.length - 2] || "";
    const prevBefore = stemLetters[stemLetters.length - 3] || "";
    const endsWithRecoveredFamilyVowel = Boolean(
        nounInfo.classKey === "t"
        && (finalLetter === "a" || finalLetter === "i")
        && isVerbLetterConsonant(lastBefore)
        && isVerbLetterConsonant(prevBefore)
    );
    const baseCandidates = [nounInfo.stem || ""];
    if (!endsWithRecoveredFamilyVowel && shouldComposerNounUseSurfaceAsSeriesBase(nounInfo)) {
        baseCandidates.push(nounInfo.surface || "");
    }
    const candidates = [];
    const seen = new Set();
    const push = (value = "") => {
        const normalized = normalizeComposerStem(value);
        if (!normalized || seen.has(normalized)) {
            return;
        }
        seen.add(normalized);
        candidates.push(normalized);
    };
    baseCandidates.forEach((baseValue) => {
        const base = normalizeComposerStem(baseValue);
        if (!base) {
            return;
        }
        const {
            needsYJoiner,
            glideStem,
        } = resolveComposerNounToVerbSeriesJoinStem(base);
        push(`${base}${normalizedSuffix}`);
        if (needsYJoiner && shouldComposerSeriesUseYJoiner(normalizedSuffix)) {
            push(`${base}y${normalizedSuffix}`);
        } else {
            push(`${glideStem}${normalizedSuffix}`);
        }
    });
    return candidates;
}

function resolveComposerNounToVerbLiteralSeriesRoundTripCandidate(surfaceValue = "", suffix = "") {
    const nounSurface = normalizeComposerStem(surfaceValue);
    const normalizedSuffix = normalizeComposerStem(suffix);
    const matches = buildComposerNounToVerbSeriesRoundTripCandidates(nounSurface, normalizedSuffix).filter((candidate) =>
        doesComposerNounRoundTripThroughPatientivoTronco(nounSurface, candidate)
    );
    return matches.length === 1 ? matches[0] : "";
}

function getComposerNounToVerbRoundTripSeriesEvidence(surfaceValue = "") {
    const nounSurface = normalizeComposerStem(surfaceValue);
    const evidence = {
        wi: false,
        ewi: false,
        awi: false,
        iwi: false,
        uwi: false,
    };
    if (!nounSurface) {
        return evidence;
    }
    COMPOSER_NOUN_TO_VERB_ROUNDTRIP_SERIES_SUFFIXES.forEach((suffix) => {
        const candidates = buildComposerNounToVerbSeriesRoundTripCandidates(nounSurface, suffix);
        evidence[suffix] = candidates.some((candidate) =>
            doesComposerNounRoundTripThroughPatientivoTronco(nounSurface, candidate)
        );
    });
    return evidence;
}

function analyzeComposerNounToVerbSeriesBridge(surfaceValue = "") {
    const nounInfo = getComposerNounStemClassInfo(surfaceValue);
    const surface = normalizeComposerStem(nounInfo.surface || "");
    const stemBase = normalizeComposerStem(nounInfo.stem || "");
    if (!surface || !stemBase) {
        return {
            nounInfo,
            surface,
            stemBase,
            finalLetter: "",
            lastBefore: "",
            prevBefore: "",
            plainWiCandidate: "",
            rawRoundTripSeriesEvidence: {
                wi: false,
                ewi: false,
                awi: false,
                iwi: false,
                uwi: false,
            },
            seriesAllowed: {
                wi: false,
                ewi: false,
                awi: false,
                iwi: false,
                uwi: false,
            },
            recoveredFamilySuffix: "",
            expectedSeriesSuffix: "",
            autoWiSuffix: "awi",
        };
    }
    const letters = splitVerbLetters(stemBase);
    const finalLetter = letters[letters.length - 1] || "";
    const beforeFinal = letters.slice(0, -1);
    const lastBefore = beforeFinal[beforeFinal.length - 1] || "";
    const prevBefore = beforeFinal[beforeFinal.length - 2] || "";
    const isTiClass = nounInfo.classKey === "ti";
    const endsWithRecoveredFamilyVowel = Boolean(
        nounInfo.classKey === "t"
        && (finalLetter === "a" || finalLetter === "i")
        && isVerbLetterConsonant(lastBefore)
        && isVerbLetterConsonant(prevBefore)
    );
    const hasDirectLiteralVowelStem = nounInfo.classKey === "t" && isVerbLetterVowel(finalLetter);
    let plainWiAllowed = isTiClass;
    if (surface.endsWith("wit") && surface.length > 3) {
        plainWiAllowed = true;
    } else if (["k", "ch", "s", "t"].includes(finalLetter)) {
        plainWiAllowed = true;
    } else if (endsWithRecoveredFamilyVowel) {
        plainWiAllowed = true;
    } else if (
        nounInfo.classKey === "t"
        && ["a", "e", "i", "u"].includes(finalLetter)
        && !(isVerbLetterConsonant(lastBefore) && isVerbLetterConsonant(prevBefore))
    ) {
        plainWiAllowed = true;
    }
    const recoveredFamilySuffix = endsWithRecoveredFamilyVowel
        ? (finalLetter === "i" ? "iwi" : "awi")
        : "";
    let autoWiSuffix = "awi";
    if (nounInfo.classKey !== "t") {
        const autoDecisionBase = getComposerAutoWiDecisionBase(stemBase);
        const stemLetters = splitVerbLetters(autoDecisionBase || "");
        const lastVowel = [...stemLetters].reverse().find((letter) => ["a", "e", "i", "u"].includes(letter)) || "";
        autoWiSuffix = (lastVowel === "a" || lastVowel === "e") ? "iwi" : "awi";
    }
    const rawRoundTripSeriesEvidence = getComposerNounToVerbRoundTripSeriesEvidence(surface);
    const hasRoundTripSeriesEvidence = Object.values(rawRoundTripSeriesEvidence).some(Boolean);
    if (hasRoundTripSeriesEvidence && !hasDirectLiteralVowelStem && !isTiClass) {
        plainWiAllowed = rawRoundTripSeriesEvidence.wi;
    }
    const seriesAllowed = {
        wi: plainWiAllowed,
        ewi: true,
        awi: true,
        iwi: true,
        uwi: true,
    };
    if (recoveredFamilySuffix) {
        seriesAllowed.awi = recoveredFamilySuffix === "awi";
        seriesAllowed.iwi = recoveredFamilySuffix === "iwi";
    } else if (hasRoundTripSeriesEvidence && !isTiClass) {
        COMPOSER_NOUN_TO_VERB_EXPLICIT_SERIES_SUFFIXES.forEach((suffix) => {
            seriesAllowed[suffix] = Boolean(rawRoundTripSeriesEvidence[suffix]);
        });
    }
    let expectedSeriesSuffix = "";
    if (isTiClass && seriesAllowed.wi) {
        expectedSeriesSuffix = "wi";
    } else if (recoveredFamilySuffix) {
        expectedSeriesSuffix = recoveredFamilySuffix;
    } else if (hasRoundTripSeriesEvidence) {
        const roundTripExplicitSuffixes = COMPOSER_NOUN_TO_VERB_EXPLICIT_SERIES_SUFFIXES.filter(
            (suffix) => rawRoundTripSeriesEvidence[suffix]
        );
        if (roundTripExplicitSuffixes.length === 1) {
            [expectedSeriesSuffix] = roundTripExplicitSuffixes;
        } else if (rawRoundTripSeriesEvidence.wi) {
            expectedSeriesSuffix = "wi";
        }
    }
    const plainWiCandidate = seriesAllowed.wi
        ? resolveComposerNounToVerbWiCandidate(surface)
        : "";
    return {
        nounInfo,
        surface,
        stemBase,
        finalLetter,
        lastBefore,
        prevBefore,
        hasDirectLiteralVowelStem,
        plainWiCandidate,
        rawRoundTripSeriesEvidence,
        seriesAllowed,
        recoveredFamilySuffix,
        expectedSeriesSuffix,
        autoWiSuffix,
    };
}

function isComposerNounToVerbTemplateSuffixCompatible(
    surfaceValue = "",
    templateSuffix = "",
    nounInfo = null,
    bridge = null
) {
    const normalizedSurface = normalizeComposerStem(surfaceValue);
    const normalizedSuffix = normalizeComposerStem(templateSuffix);
    const resolvedNounInfo = nounInfo || getComposerNounStemClassInfo(normalizedSurface);
    const stemBase = normalizeComposerStem(resolvedNounInfo.stem || "");
    if (!normalizedSuffix || !stemBase) {
        return true;
    }
    const letters = splitVerbLetters(stemBase);
    const last = letters[letters.length - 1] || "";
    const isVowel = ["a", "e", "i", "u"].includes(last);
    const resolvedBridge = bridge || analyzeComposerNounToVerbSeriesBridge(normalizedSurface);
    if (normalizedSuffix === "wi") {
        return resolvedBridge.seriesAllowed.wi;
    }
    if (COMPOSER_NOUN_TO_VERB_EXPLICIT_SERIES_SUFFIXES.includes(normalizedSuffix)) {
        return resolvedBridge.seriesAllowed[normalizedSuffix];
    }
    if (normalizedSuffix === "wiauto") {
        return true;
    }
    if (normalizedSuffix === "ia") {
        return isVerbLetterConsonant(last);
    }
    if (normalizedSuffix === "ua") {
        return !isVowel && last !== "j";
    }
    if (normalizedSuffix === "ya") {
        return isVowel || last === "k" || last === "l";
    }
    return true;
}

function buildComposerNounToVerbCanonicalStem(surfaceValue = "", templateSuffix = "") {
    const suffix = normalizeComposerStem(templateSuffix);
    const nounInfo = getComposerNounStemClassInfo(surfaceValue);
    if (!suffix || !nounInfo.surface) {
        return "";
    }
    if (nounInfo.classKey === "zero" && nounInfo.surface.endsWith(suffix)) {
        return nounInfo.surface;
    }
    const stemBase = nounInfo.stem || "";
    const bridge = analyzeComposerNounToVerbSeriesBridge(nounInfo.surface);
    const {
        needsYJoiner,
        glideStem,
    } = resolveComposerNounToVerbSeriesJoinStem(stemBase);
    if (suffix === "wi" && bridge.seriesAllowed.wi) {
        return bridge.plainWiCandidate || "";
    }
    if (suffix === "wa") {
        return resolveComposerNounToVerbWaCandidate(nounInfo.surface);
    }
    if (suffix === "wiauto") {
        const resolvedSuffix = resolveComposerAutoWiFamilySuffix(
            stemBase || nounInfo.surface,
            bridge.autoWiSuffix
        );
        const replacedFamilyStem = replaceComposerAutoWiFamilySuffix(
            stemBase,
            resolvedSuffix
        );
        if (replacedFamilyStem) {
            return replacedFamilyStem;
        }
        const joiner = needsYJoiner && shouldComposerSeriesUseYJoiner(resolvedSuffix) ? "y" : "";
        const joinStem = glideStem;
        return joinStem ? `${joinStem}${joiner}${resolvedSuffix}` : "";
    }
    if (suffix === "ya" && /[kl]$/i.test(nounInfo.stem || "")) {
        return `${stemBase}iya`;
    }
    if (COMPOSER_NOUN_TO_VERB_LITERAL_SERIES_SUFFIXES.includes(suffix)) {
        if (!bridge.recoveredFamilySuffix && !bridge.hasDirectLiteralVowelStem) {
            const roundTripCandidate = resolveComposerNounToVerbLiteralSeriesRoundTripCandidate(nounInfo.surface, suffix);
            if (roundTripCandidate) {
                return roundTripCandidate;
            }
        }
        if (needsYJoiner && shouldComposerSeriesUseYJoiner(suffix)) {
            return stemBase ? `${stemBase}y${suffix}` : "";
        }
        return glideStem ? `${glideStem}${suffix}` : "";
    }
    return stemBase ? `${stemBase}${suffix}` : "";
}

function isComposerNounToVerbTemplateSuffixAllowed(
    slotKey = "",
    templateSuffix = "",
    surfaceValue = ""
) {
    const normalizedSuffix = normalizeComposerStem(templateSuffix);
    if (!shouldUseComposerNounToVerbStemLogic(slotKey, normalizedSuffix)) {
        return true;
    }
    return isComposerNounToVerbTemplateSuffixCompatible(surfaceValue, normalizedSuffix);
}

function shouldUseComposerNounToVerbStemLogic(slotKey = "", templateSuffix = "") {
    if (!COMPOSER_SLOT_KEYS.includes(slotKey)) {
        return false;
    }
    if (!templateSuffix) {
        return false;
    }
    if (getComposerEntryBoard() !== COMPOSER_ENTRY_BOARD.nounToVerb) {
        return false;
    }
    const slotConfig = getComposerSlotConfig(slotKey);
    return Boolean(slotConfig);
}

function getComposerNounToVerbSurfaceValue(slotKey = "", fallbackValue = "") {
    return normalizeComposerStem(
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey]
        || fallbackValue
        || ""
    );
}

function getComposerNounToVerbExplicitSurfaceValue(value = "") {
    return normalizeComposerStem(value || "");
}

function resolveComposerLockedTemplateStem(stemValue = "", templateSuffix = "", options = {}) {
    const suffix = normalizeComposerStem(templateSuffix);
    const stem = normalizeComposerStem(stemValue);
    const slotKey = COMPOSER_SLOT_KEYS.includes(options.slotKey) ? options.slotKey : "a";
    if (!suffix) {
        return {
            editableRoot: stem,
            displayStem: stem,
            canonicalStem: stem,
            editableBoundary: stem.length,
        };
    }
    const previousEditableRoot = normalizeComposerStem(options.previousEditableRoot || "");
    let editableRoot = stem;
    if (!stem) {
        editableRoot = "";
    } else if (stem.endsWith(suffix) && stem.length >= suffix.length) {
        editableRoot = stem.slice(0, -suffix.length);
    } else if (previousEditableRoot && stem.startsWith(previousEditableRoot)) {
        const typedSuffixFragment = stem.slice(previousEditableRoot.length);
        if (suffix.startsWith(typedSuffixFragment)) {
            editableRoot = previousEditableRoot;
        } else if (typedSuffixFragment.startsWith(suffix)) {
            editableRoot = `${previousEditableRoot}${typedSuffixFragment.slice(suffix.length)}`;
        }
    }
    const usesNounToVerbStemLogic = shouldUseComposerNounToVerbStemLogic(
        slotKey,
        suffix
    );
    if (usesNounToVerbStemLogic) {
        const hasExplicitSurfaceValue = Object.prototype.hasOwnProperty.call(options, "surfaceValue");
        const surface = hasExplicitSurfaceValue
            ? getComposerNounToVerbExplicitSurfaceValue(options.surfaceValue)
            : getComposerNounToVerbSurfaceValue(slotKey, editableRoot);
        const canonicalStem = buildComposerNounToVerbCanonicalStem(surface, suffix);
        return {
            editableRoot: surface,
            displayStem: surface,
            canonicalStem,
            editableBoundary: surface.length,
        };
    }
    const normalizedRoot = normalizeComposerStem(editableRoot);
    const canonicalStem = normalizedRoot ? `${normalizedRoot}${suffix}` : "";
    const displayStem = normalizedRoot ? canonicalStem : `_${suffix}`;
    return {
        editableRoot: normalizedRoot,
        displayStem,
        canonicalStem,
        editableBoundary: normalizedRoot ? normalizedRoot.length : 1,
    };
}

function getComposerEditableRootForCurrentAffixState(slotKey = "", stemInput = null) {
    if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return "";
    }
    const selectedType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
    const templateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
    if (selectedType === "auto" && templateSuffix) {
        return getComposerNounToVerbExplicitSurfaceValue(stemInput.value || "");
    }
    if (isComposerFixedSerialType(selectedType)) {
        return extractComposerSerialEditableRoot(stemInput.value || "", selectedType);
    }
    return normalizeComposerStem(stemInput.value || "");
}

function getComposerActiveTiCausativeClass() {
    if (!isVerbInputModeComposer()) {
        return "";
    }
    const activeSlot = getComposerActiveSlotFromState();
    const nounToVerbTiClass = normalizeTiCausativeClass(
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[activeSlot] || ""
    );
    if (nounToVerbTiClass) {
        return nounToVerbTiClass;
    }
    const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] || "auto";
    return getComposerTiCausativeClassFromSerialType(selectedType);
}

function getComposerMaskedSerialSegments(segments = [], slotCount = 1) {
    const count = Math.max(1, Number(slotCount || 1));
    const normalizedSegments = Array.from({ length: count }, (_unused, index) => (
        normalizeComposerStem(Array.isArray(segments) ? (segments[index] || "") : "")
    ));
    return normalizedSegments.map((segment) => segment || "_");
}

function formatComposerSerialSegmentsForTextbox(segments = [], slotCount = 1) {
    const count = Math.max(1, Number(slotCount || 1));
    return getComposerMaskedSerialSegments(segments, count).join("");
}

function isComposerSerialPlaceholderSegment(segment = "") {
    return /^_+$/.test(String(segment || ""));
}

function getComposerSerialMaskContextFromRaw(rawValue = "", slotKey = "a") {
    const safeSlotKey = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "a";
    const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[safeSlotKey] || "auto";
    const stemInput = getVerbComposerElements().slots[safeSlotKey]?.stemInput || null;
    const dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, safeSlotKey);
    const normalizedStem = normalizeComposerStem(rawValue);
    if (
        selectedType === "auto"
        && dropdownTemplateSuffix
        && shouldUseComposerNounToVerbStemLogic(safeSlotKey, dropdownTemplateSuffix)
    ) {
        return {
            slotCount: 1,
            selectedType: "noun-to-verb-template",
            isFixedType: false,
            formattedValue: normalizedStem,
            segmentRanges: [{
                index: 0,
                start: 0,
                end: normalizedStem.length,
                isEditable: true,
            }],
        };
    }
    if (selectedType === "auto" && dropdownTemplateSuffix) {
        const stateKeys = getComposerSlotStateKeys(safeSlotKey);
        const previousStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
        const previousEditableRoot = extractComposerTemplateEditableRoot(previousStem, dropdownTemplateSuffix);
        const lockedTemplate = resolveComposerLockedTemplateStem(normalizedStem, dropdownTemplateSuffix, {
            previousEditableRoot,
            slotKey: safeSlotKey,
        });
        return {
            slotCount: 1,
            selectedType: "template",
            isFixedType: true,
            formattedValue: lockedTemplate.displayStem,
            segmentRanges: [
                {
                    index: 0,
                    start: 0,
                    end: lockedTemplate.editableBoundary,
                    isEditable: true,
                },
                {
                    index: 1,
                    start: lockedTemplate.editableBoundary,
                    end: lockedTemplate.displayStem.length,
                    isEditable: false,
                },
            ].filter((range) => range.end > range.start),
        };
    }
    const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
    const displaySpec = getComposerSerialDisplaySpec({
        slotKey: safeSlotKey,
        normalizedStem,
        inferredSpec,
    });
    const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
    const segments = String(rawValue || "").includes("-")
        ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType)
        : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
            preferSplitFromStem: true,
            selectedType: displaySpec.selectedType,
        });
    const lockedSegments = applyComposerSerialFixedSegments(
        segments,
        displaySpec.selectedType,
        slotCount
    );
    const maskedSegments = getComposerMaskedSerialSegments(lockedSegments, slotCount);
    const editableIndexes = new Set(
        getComposerSerialEditableSegmentIndexes(displaySpec.selectedType, slotCount)
    );
    const segmentRanges = [];
    let cursor = 0;
    for (let index = 0; index < slotCount; index += 1) {
        const segmentText = String(maskedSegments[index] || "");
        const start = cursor;
        const end = start + segmentText.length;
        segmentRanges.push({
            index,
            start,
            end,
            isEditable: editableIndexes.has(index),
        });
        cursor = end;
    }
    return {
        slotCount,
        selectedType: displaySpec.selectedType,
        isFixedType: isComposerFixedSerialType(selectedType),
        formattedValue: maskedSegments.join(""),
        segmentRanges,
    };
}

function isComposerPositionInEditableRange(segmentRanges = [], position = 0) {
    const pos = Number(position);
    return (Array.isArray(segmentRanges) ? segmentRanges : []).some((range) => (
        range.isEditable
        && pos >= range.start
        && pos < range.end
    ));
}

function hasComposerSelectionLockedOverlap(segmentRanges = [], start = 0, end = 0) {
    const from = Math.max(0, Number(start || 0));
    const to = Math.max(from, Number(end || 0));
    return (Array.isArray(segmentRanges) ? segmentRanges : []).some((range) => (
        !range.isEditable
        && from < range.end
        && to > range.start
    ));
}

function getComposerPreferredEditableBoundary(segmentRanges = [], options = {}) {
    const preferEnd = options.preferEnd !== false;
    const editableRanges = (Array.isArray(segmentRanges) ? segmentRanges : [])
        .filter((range) => range.isEditable);
    if (!editableRanges.length) {
        return 0;
    }
    const target = preferEnd
        ? editableRanges[editableRanges.length - 1]
        : editableRanges[0];
    return preferEnd ? target.end : target.start;
}

function findComposerNearestEditablePosition(segmentRanges = [], fromPosition = 0, direction = "backward") {
    const maxEnd = (Array.isArray(segmentRanges) ? segmentRanges : []).reduce(
        (max, range) => Math.max(max, Number(range.end || 0)),
        0
    );
    if (!maxEnd) {
        return -1;
    }
    const bounded = Math.max(0, Math.min(Number(fromPosition || 0), maxEnd - 1));
    if (direction === "forward") {
        for (let pos = bounded; pos < maxEnd; pos += 1) {
            if (isComposerPositionInEditableRange(segmentRanges, pos)) {
                return pos;
            }
        }
        return -1;
    }
    for (let pos = bounded; pos >= 0; pos -= 1) {
        if (isComposerPositionInEditableRange(segmentRanges, pos)) {
            return pos;
        }
    }
    return -1;
}

function isComposerTemplateOnlyMaskValue(context = null, rawValue = "") {
    if (!context || !context.isFixedType) {
        return false;
    }
    const value = String(rawValue || "");
    const editableRanges = (Array.isArray(context.segmentRanges) ? context.segmentRanges : [])
        .filter((range) => range.isEditable);
    if (!editableRanges.length) {
        return false;
    }
    return editableRanges.every((range) => !/[a-z]/i.test(value.slice(range.start, range.end)));
}

function prepareComposerTemplateMaskOverwrite(event, stemInput, slotKey = "a") {
    if (!event || !stemInput) {
        return false;
    }
    let dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
    if (shouldUseComposerNounToVerbStemLogic(slotKey, dropdownTemplateSuffix)) {
        return false;
    }
    const key = String(event.key || "");
    const isPrintable = key.length === 1 && !event.ctrlKey && !event.metaKey;
    if (!isPrintable) {
        return false;
    }
    const value = String(stemInput.value || "");
    if (!value || typeof stemInput.setSelectionRange !== "function") {
        return false;
    }
    const context = getComposerSerialMaskContextFromRaw(value, slotKey);
    if (!isComposerTemplateOnlyMaskValue(context, value)) {
        return false;
    }
    stemInput.setSelectionRange(0, value.length);
    return false;
}

function enforceComposerLockedSuffixDeletion(event, stemInput, slotKey = "a") {
    if (!event || !stemInput) {
        return false;
    }
    let dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
    if (shouldUseComposerNounToVerbStemLogic(slotKey, dropdownTemplateSuffix)) {
        return false;
    }
    const key = String(event.key || "");
    if (key !== "Backspace" && key !== "Delete") {
        return false;
    }
    const context = getComposerSerialMaskContextFromRaw(stemInput.value || "", slotKey);
    if (!context.isFixedType) {
        return false;
    }
    const valueLength = String(stemInput.value || "").length;
    const selectionStart = typeof stemInput.selectionStart === "number"
        ? stemInput.selectionStart
        : valueLength;
    const selectionEnd = typeof stemInput.selectionEnd === "number"
        ? stemInput.selectionEnd
        : selectionStart;
    const start = Math.max(0, Math.min(selectionStart, valueLength));
    const end = Math.max(start, Math.min(selectionEnd, valueLength));
    const hasSelection = end > start;

    if (hasSelection) {
        if (!hasComposerSelectionLockedOverlap(context.segmentRanges, start, end)) {
            return false;
        }
        event.preventDefault();
        const chars = Array.from(String(stemInput.value || ""));
        for (let index = end - 1; index >= start; index -= 1) {
            if (isComposerPositionInEditableRange(context.segmentRanges, index)) {
                chars.splice(index, 1);
            }
        }
        stemInput.value = chars.join("");
        applyComposerSerialFormattingToStemInput(stemInput, {
            preserveCaret: true,
            slotKey,
            preferSplitFromStem: true,
        });
        if (typeof stemInput.setSelectionRange === "function") {
            const fallbackCaret = getComposerPreferredEditableBoundary(context.segmentRanges, { preferEnd: true });
            const caret = Math.max(0, Math.min(start, String(stemInput.value || "").length, fallbackCaret));
            stemInput.setSelectionRange(caret, caret);
        }
        onVerbComposerControlChange("matrix-stem");
        return true;
    }

    const targetPosition = key === "Backspace"
        ? findComposerNearestEditablePosition(context.segmentRanges, start - 1, "backward")
        : findComposerNearestEditablePosition(context.segmentRanges, start, "forward");
    const deletePosition = key === "Backspace" ? start - 1 : start;
    const isDeletingLockedPosition = deletePosition >= 0
        && !isComposerPositionInEditableRange(context.segmentRanges, deletePosition);
    if (!isDeletingLockedPosition) {
        return false;
    }
    if (isComposerTemplateOnlyMaskValue(context, stemInput.value || "")) {
        event.preventDefault();
        if (typeof stemInput.setSelectionRange === "function") {
            stemInput.setSelectionRange(0, valueLength);
        }
        return true;
    }
    event.preventDefault();
    const chars = Array.from(String(stemInput.value || ""));
    if (targetPosition >= 0 && targetPosition < chars.length) {
        chars.splice(targetPosition, 1);
    }
    stemInput.value = chars.join("");
    applyComposerSerialFormattingToStemInput(stemInput, {
        preserveCaret: true,
        slotKey,
        preferSplitFromStem: true,
    });
    if (typeof stemInput.setSelectionRange === "function") {
        const preferredBoundary = getComposerPreferredEditableBoundary(context.segmentRanges, { preferEnd: true });
        const caretTarget = targetPosition >= 0 ? targetPosition : preferredBoundary;
        const caret = Math.max(0, Math.min(caretTarget, String(stemInput.value || "").length));
        stemInput.setSelectionRange(caret, caret);
    }
    onVerbComposerControlChange("matrix-stem");
    return true;
}

function mapComposerCaretToLockedMask(
    rawValue = "",
    formattedValue = "",
    caretStart = 0,
    slotCount = 1,
    selectedType = "auto",
    lockedSegments = []
) {
    const count = Math.max(1, Number(slotCount || 1));
    const formatted = String(formattedValue || "");
    if (!formatted) {
        return 0;
    }
    if (count <= 1) {
        return Math.max(0, Math.min(Number(caretStart || 0), formatted.length));
    }
    const maskedSegments = getComposerMaskedSerialSegments(lockedSegments, count);
    const editableIndexes = getComposerSerialEditableSegmentIndexes(selectedType, count);
    const editableSet = new Set(editableIndexes);
    const totalEditableLength = editableIndexes.reduce(
        (sum, index) => sum + String(maskedSegments[index] || "").length,
        0
    );
    const raw = String(rawValue || "");
    const boundedRawCaret = Math.max(0, Math.min(Number(caretStart || 0), raw.length));
    const prefix = raw.slice(0, boundedRawCaret);
    let remainingEditableOffset = Math.max(
        0,
        Math.min(prefix.replace(/[^a-z_]/gi, "").length, totalEditableLength)
    );
    let caret = 0;
    for (let index = 0; index < count; index += 1) {
        const segment = String(maskedSegments[index] || "");
        const segmentLength = segment.length;
        if (!editableSet.has(index)) {
            caret += segmentLength;
            continue;
        }
        if (remainingEditableOffset <= segmentLength) {
            caret += remainingEditableOffset;
            return Math.max(0, Math.min(caret, formatted.length));
        }
        remainingEditableOffset -= segmentLength;
        caret += segmentLength;
    }
    return Math.max(0, Math.min(caret, formatted.length));
}

function formatComposerStemForInputDisplay(stemValue = "", options = {}) {
    const slotKey = COMPOSER_SLOT_KEYS.includes(options.slotKey) ? options.slotKey : "a";
    const normalizedStem = normalizeComposerStem(stemValue);
    const templateSuffix = normalizeComposerStem(options.templateSuffix || "");
    if (templateSuffix) {
        return resolveComposerLockedTemplateStem(normalizedStem, templateSuffix, {
            slotKey,
            surfaceValue: getComposerNounToVerbSurfaceValue(slotKey, options.surfaceValue || ""),
        }).displayStem;
    }
    const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
    const displaySpec = getComposerSerialDisplaySpec({
        slotKey,
        normalizedStem,
        inferredSpec,
    });
    if (displaySpec.selectedType === "auto") {
        // In auto mode, keep manual typing literal; do not coerce to template masks like "_ya".
        return normalizedStem;
    }
    const segments = buildComposerLockedSerialSegmentsFromStem(normalizedStem, displaySpec.slotCount, {
        preferSplitFromStem: options.preferSplitFromStem !== false,
        selectedType: displaySpec.selectedType,
    });
    const lockedSegments = applyComposerSerialFixedSegments(
        segments,
        displaySpec.selectedType,
        displaySpec.slotCount
    );
    return formatComposerSerialSegmentsForTextbox(lockedSegments, displaySpec.slotCount);
}

function applyComposerSerialFormattingToStemInput(stemInput, options = {}) {
    if (!stemInput) {
        return "";
    }
    const slotKey = COMPOSER_SLOT_KEYS.includes(options.slotKey)
        ? options.slotKey
        : (getComposerSlotKeyByStemInput(stemInput) || "a");
    const stateKeys = getComposerSlotStateKeys(slotKey);
    const preserveCaret = options.preserveCaret !== false;
    const rawValue = String(stemInput.value || "");
    const caretStart = typeof stemInput.selectionStart === "number"
        ? stemInput.selectionStart
        : rawValue.length;
    const normalizedStem = normalizeComposerStem(rawValue);
    const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
    const displaySpec = getComposerSerialDisplaySpec({
        slotKey,
        normalizedStem,
        inferredSpec,
    });
    let dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
    if (
        displaySpec.selectedType === "auto"
        && dropdownTemplateSuffix
        && shouldUseComposerNounToVerbStemLogic(slotKey, dropdownTemplateSuffix)
        && !isComposerNounToVerbTemplateSuffixAllowed(slotKey, dropdownTemplateSuffix, rawValue)
    ) {
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        if (stemInput.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
        dropdownTemplateSuffix = "";
    }
    const previousStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
    const previousSurfaceValue = normalizeComposerStem(COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] || "");
    if (displaySpec.selectedType === "auto" && dropdownTemplateSuffix) {
        const previousEditableRoot = extractComposerTemplateEditableRoot(
            previousStem,
            dropdownTemplateSuffix
        );
        const lockedTemplate = resolveComposerLockedTemplateStem(normalizedStem, dropdownTemplateSuffix, {
            previousEditableRoot,
            slotKey,
            surfaceValue: shouldUseComposerNounToVerbStemLogic(slotKey, dropdownTemplateSuffix)
                ? getComposerNounToVerbExplicitSurfaceValue(rawValue)
                : getComposerNounToVerbSurfaceValue(slotKey, rawValue || previousSurfaceValue),
        });
        if (shouldUseComposerNounToVerbStemLogic(slotKey, dropdownTemplateSuffix)) {
            COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = lockedTemplate.displayStem;
        }
        if (stemInput.value !== lockedTemplate.displayStem) {
            stemInput.value = lockedTemplate.displayStem;
            if (
                preserveCaret
                && document.activeElement === stemInput
                && typeof stemInput.setSelectionRange === "function"
            ) {
                const caret = Math.max(
                    0,
                    Math.min(caretStart, lockedTemplate.editableBoundary)
                );
                stemInput.setSelectionRange(caret, caret);
            }
        }
        return lockedTemplate.canonicalStem;
    }
    if (displaySpec.selectedType === "auto" && !dropdownTemplateSuffix) {
        // Auto mode should not autocorrect typed stems into serial templates.
        if (stemInput.value !== normalizedStem) {
            stemInput.value = normalizedStem;
            if (
                preserveCaret
                && document.activeElement === stemInput
                && typeof stemInput.setSelectionRange === "function"
            ) {
                const caret = Math.max(0, Math.min(caretStart, normalizedStem.length));
                stemInput.setSelectionRange(caret, caret);
            }
        }
        return normalizedStem;
    }
    const previousEditableRoot = extractComposerSerialEditableRoot(
        previousStem,
        displaySpec.selectedType
    );
    const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
    const segments = rawValue.includes("-")
        ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType)
        : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
            preferSplitFromStem: options.preferSplitFromStem !== false,
            selectedType: displaySpec.selectedType,
            previousEditableRoot,
        });
    const lockedSegments = applyComposerSerialFixedSegments(
        segments,
        displaySpec.selectedType,
        slotCount
    );
    const formattedStem = formatComposerSerialSegmentsForTextbox(lockedSegments, slotCount);
    const displayStem = formattedStem;
    if (stemInput.value !== displayStem) {
        stemInput.value = displayStem;
        if (
            preserveCaret
            && document.activeElement === stemInput
            && typeof stemInput.setSelectionRange === "function"
        ) {
            const caret = mapComposerCaretToLockedMask(
                rawValue,
                displayStem,
                caretStart,
                slotCount,
                displaySpec.selectedType,
                lockedSegments
            );
            stemInput.setSelectionRange(caret, caret);
        }
    }
    return getComposerCanonicalStemFromSerialSegments(
        lockedSegments,
        displaySpec.selectedType,
        slotCount
    );
}

function syncComposerMatrixSerialUi() {
    const { slots } = getVerbComposerElements();
    const activeSlot = getComposerActiveSlotFromState();
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const slotRefs = slots[slotKey] || {};
        const matrixField = slotRefs.matrixField || null;
        const stateKeys = getComposerSlotStateKeys(slotKey);
        const stemSource = slotRefs.stemInput?.value || VerbComposerState[stateKeys.stem] || "";
        const normalizedStem = slotRefs.stemInput
            ? applyComposerSerialFormattingToStemInput(slotRefs.stemInput, {
                preserveCaret: true,
                slotKey,
                preferSplitFromStem: true,
            })
            : normalizeComposerStem(stemSource);
        const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
        const serialSpec = getComposerSerialDisplaySpec({
            slotKey,
            normalizedStem,
            inferredSpec,
        });
        const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto";
        if (slotRefs.stemInput) {
            const serialInputTemplate = getComposerSerialInputTemplate(selectedType, serialSpec.slotCount);
            slotRefs.stemInput.dataset.serialSlots = String(serialSpec.slotCount);
            slotRefs.stemInput.dataset.serialFamily = serialSpec.family;
            slotRefs.stemInput.dataset.serialType = selectedType;
            slotRefs.stemInput.setAttribute("pattern", serialInputTemplate.pattern);
            slotRefs.stemInput.setAttribute("title", serialInputTemplate.title);
            slotRefs.stemInput.placeholder = "";
        }
        if (matrixField) {
            matrixField.dataset.serialSlots = String(serialSpec.slotCount);
            matrixField.dataset.serialFamily = serialSpec.family;
            matrixField.dataset.serialType = selectedType;
            matrixField.classList.toggle("is-serial-polymorphemic", serialSpec.isPolymorphemic);
            matrixField.classList.toggle("is-serial-monomorphemic", !serialSpec.isPolymorphemic);
            matrixField.classList.toggle("is-active-slot", slotKey === activeSlot);
        }
    });
    const containerInputs = document.getElementById("container-inputs");
    if (!containerInputs) {
        return;
    }
    const activeStateKeys = getComposerSlotStateKeys(activeSlot);
    const activeStem = slots[activeSlot]?.stemInput?.value || VerbComposerState[activeStateKeys.stem] || "";
    const activeSpec = getComposerSerialDisplaySpec({
        slotKey: activeSlot,
        normalizedStem: activeStem,
    });
    containerInputs.dataset.serialActiveSlots = String(activeSpec.slotCount);
    containerInputs.dataset.serialActiveFamily = activeSpec.family;
    containerInputs.dataset.serialActiveType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] || "auto";
}

function getComposerTemplateSuffixFromSerialType(selectedType = "") {
    const type = String(selectedType || "").toLowerCase();
    if (type === "ti-have" || type === "ti-become") {
        return "ti";
    }
    if (type === "tia-have" || type === "tia-become") {
        return "tia";
    }
    if (type === "ta") {
        return "ta";
    }
    if (type === "ya") {
        return "ya";
    }
    if (type === "ua") {
        return "ua";
    }
    if (type === "awi") {
        return "awi";
    }
    if (type === "iwi") {
        return "iwi";
    }
    return "";
}

function getComposerMatrixComboboxValueForSerialType(selectedType = "") {
    const type = String(selectedType || "").toLowerCase();
    if (type === "ti-become") {
        return "_ti1";
    }
    if (type === "ti-have") {
        return "_ti2";
    }
    if (type === "tia-become") {
        return "_tia1";
    }
    if (type === "tia-have") {
        return "_tia2";
    }
    const templateSuffix = getComposerTemplateSuffixFromSerialType(type);
    return templateSuffix ? `_${templateSuffix}` : "_";
}

function applyComposerSerialTypeSelection({
    slotKey = "",
    selectedType = "",
    stemInput = null,
    matrixTokens = [],
} = {}) {
    const serialOption = getComposerSerialTypeOptionByValue(selectedType);
    if (!serialOption || !COMPOSER_SLOT_KEYS.includes(slotKey)) {
        return false;
    }
    const latestStemInput = stemInput || getVerbComposerElements().slots[slotKey]?.stemInput || null;
    const preservedRoot = latestStemInput
        ? getComposerEditableRootForCurrentAffixState(slotKey, latestStemInput)
        : "";
    COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = selectedType;
    COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
    COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
    COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
    if (serialOption.slotCount > 0) {
        COMPOSER_SERIAL_SLOT_PREF_BY_SLOT[slotKey] = serialOption.slotCount;
    }
    if (latestStemInput) {
        delete latestStemInput.dataset.dropdownTemplateSuffix;
        latestStemInput.value = preservedRoot;
        applyComposerSerialFormattingToStemInput(latestStemInput, {
            preserveCaret: true,
            slotKey,
            preferSplitFromStem: true,
        });
    }
    syncComposerMatrixSerialUi();
    syncComposerSerialTypeChips();
    onVerbComposerControlChange("matrix-stem");
    return true;
}

function applyComposerTemplateSuffixSelection({
    slotKey = "",
    templateSuffix = "",
    stemInput = null,
    tiCausativeClass = "",
} = {}) {
    if (!COMPOSER_SLOT_KEYS.includes(slotKey)) {
        return false;
    }
    const normalizedSuffix = normalizeComposerStem(templateSuffix);
    if (!normalizedSuffix) {
        return false;
    }
    const latestStemInput = stemInput || getVerbComposerElements().slots[slotKey]?.stemInput || null;
    if (!latestStemInput) {
        return false;
    }
    const preservedRoot = getComposerEditableRootForCurrentAffixState(slotKey, latestStemInput);
    const usesNounToVerbStemLogic = shouldUseComposerNounToVerbStemLogic(slotKey, normalizedSuffix);
    const normalizedTiCausativeClass = normalizeTiCausativeClass(tiCausativeClass);
    if (
        usesNounToVerbStemLogic
        && !isComposerNounToVerbTemplateSuffixAllowed(slotKey, normalizedSuffix, preservedRoot)
    ) {
        return false;
    }
    COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
    COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = usesNounToVerbStemLogic
        ? normalizeComposerStem(preservedRoot)
        : "";
    if (usesNounToVerbStemLogic) {
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = normalizedSuffix;
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = normalizedSuffix === "ti"
            ? normalizedTiCausativeClass
            : "";
        delete latestStemInput.dataset.dropdownTemplateSuffix;
    } else {
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        latestStemInput.dataset.dropdownTemplateSuffix = normalizedSuffix;
    }
    latestStemInput.value = preservedRoot;
    applyComposerSerialFormattingToStemInput(latestStemInput, {
        preserveCaret: true,
        slotKey,
        preferSplitFromStem: true,
    });
    syncComposerMatrixSerialUi();
    syncComposerSerialTypeChips();
    onVerbComposerControlChange("matrix-stem");
    return true;
}

function focusComposerStemInputAtEditableBoundary(stemInput = null, slotKey = "") {
    void slotKey;
    return focusComposerSlotEntryTarget(stemInput || getComposerPreferredEntryInput(), { selectAll: false });
}

function getComposerSerialTypeChipLabel(value = "") {
    const normalizedValue = String(value || "").trim().toLowerCase();
    if (normalizedValue === "ti-have") {
        return "ti (tener)";
    }
    if (normalizedValue === "ti-become") {
        return "ti (ser)";
    }
    const option = getComposerSerialTypeOptionByValue(normalizedValue);
    return option?.label || normalizedValue;
}

function shouldShowComposerTiChoiceChips(slotKey = "", stemInput = null) {
    const slotConfig = getComposerSlotConfig(slotKey);
    if (slotConfig?.transitivity !== COMPOSER_TRANSITIVITY.intransitive || !stemInput) {
        return false;
    }
    if (getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb) {
        return false;
    }
    const selectedType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
    if (selectedType === "ti-have" || selectedType === "ti-become") {
        return true;
    }
    const dropdownTemplateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
    if (dropdownTemplateSuffix) {
        return false;
    }
    const normalizedStem = normalizeComposerStem(String(stemInput.value || ""));
    return normalizedStem.endsWith("ti");
}

function syncComposerSerialTypeChips() {
    const { slots } = getVerbComposerElements();
    const isComposer = isVerbInputModeComposer();
    const activeSlot = getComposerActiveSlotFromState();
    const isNounToVerbBoard = getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const slotRefs = slots[slotKey] || {};
        const chipsContainer = slotRefs.serialTypeChips || null;
        const stemInput = slotRefs.stemInput || null;
        if (!chipsContainer) {
            return;
        }
        const slotConfig = getComposerSlotConfig(slotKey);
        const supportsSerialTypeChips = slotConfig?.transitivity === COMPOSER_TRANSITIVITY.intransitive;
        const visibleOptions = supportsSerialTypeChips
            ? ["ti-become", "ti-have"]
                .map((value) => getComposerSerialTypeOptionByValue(value))
                .filter(Boolean)
            : [];
        const optionSignature = visibleOptions
            .map((option) => `${option.value}:${getComposerSerialTypeChipLabel(option.value)}`)
            .join("|");
        if ((chipsContainer.dataset.optionSignature || "") !== optionSignature) {
            chipsContainer.innerHTML = "";
            visibleOptions.forEach((option) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "verb-chip";
                button.dataset.serialType = option.value;
                button.dataset.serialSlot = slotKey;
                button.textContent = getComposerSerialTypeChipLabel(option.value);
                button.title = option.label;
                button.addEventListener("click", () => {
                    if (button.disabled) {
                        return;
                    }
                    const currentType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
                    if (currentType === option.value) {
                        clearComposerMatrixAffixSelection(
                            slotKey,
                            getVerbComposerElements().slots[slotKey]?.stemInput || null
                        );
                        return;
                    }
                    applyComposerSerialTypeSelection({
                        slotKey,
                        selectedType: option.value,
                        stemInput: getVerbComposerElements().slots[slotKey]?.stemInput || null,
                        matrixTokens: getComposerMatrixRootTokensForSlot(slotKey),
                    });
                });
                chipsContainer.appendChild(button);
            });
            chipsContainer.dataset.optionSignature = optionSignature;
        }
        const shouldShow = isComposer
            && !isNounToVerbBoard
            && supportsSerialTypeChips
            && slotKey === activeSlot
            && shouldShowComposerTiChoiceChips(slotKey, stemInput);
        chipsContainer.hidden = !shouldShow;
        chipsContainer.setAttribute("aria-hidden", String(!shouldShow));
        const selectedType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto";
        const buttons = Array.from(chipsContainer.querySelectorAll(".verb-chip"));
        const isDisabled = !shouldShow;
        buttons.forEach((button) => {
            const value = button.dataset.serialType || "";
            const isActive = value === selectedType;
            button.disabled = isDisabled;
            button.setAttribute("aria-disabled", String(isDisabled));
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    });
}

function getComposerMatrixComboboxOptionMatch(slotKey = "", rawValue = "") {
    if (!COMPOSER_SLOT_CONFIG[slotKey]) {
        return null;
    }
    const typedValue = String(rawValue || "").trim().toLowerCase();
    if (!typedValue) {
        return null;
    }
    const { matrixStemAffixSelectBySlot } = getVerbComposerElements();
    const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
    if (!optionList || !optionList.options) {
        return null;
    }
    const option = Array.from(optionList.options).find((candidate) => (
        String(candidate.value || "").trim().toLowerCase() === typedValue
    ));
    if (!option) {
        return null;
    }
    const templateSuffix = normalizeComposerStem(
        option.dataset.templateSuffix
        || String(option.value || "").replace(/^_+/, "")
    );
    const serialType = String(option.dataset.serialType || "").trim().toLowerCase();
    return {
        value: String(option.value || ""),
        templateSuffix,
        serialType,
    };
}

function shouldHandleComposerMatrixComboboxSelection(event = null, stemInput = null) {
    if (!stemInput || String(stemInput.tagName || "").toUpperCase() !== "INPUT") {
        return false;
    }
    const listId = String(stemInput.getAttribute("list") || "").trim();
    if (!listId) {
        return false;
    }
    const currentValue = String(stemInput.value || "").trim();
    if (!currentValue || !currentValue.startsWith("_")) {
        return false;
    }
    if (!event) {
        return true;
    }
    const eventType = String(event.type || "").toLowerCase();
    if (eventType === "change") {
        return true;
    }
    if (eventType !== "input") {
        return false;
    }
    const inputType = String(event.inputType || "");
    if (inputType === "insertReplacementText") {
        return true;
    }
    // Fallback for engines that do not report inputType for datalist selection.
    if (!inputType && event.isTrusted) {
        return true;
    }
    return false;
}

function applyComposerMatrixComboboxMatch(slotKey = "", stemInput = null, match = null) {
    if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey] || !match) {
        return false;
    }
    if (
        getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb
        && match.serialType
        && match.serialType !== "auto"
        && match.templateSuffix
    ) {
        return applyComposerTemplateSuffixSelection({
            slotKey,
            templateSuffix: match.templateSuffix,
            stemInput,
            tiCausativeClass: getComposerTiCausativeClassFromSerialType(match.serialType),
        });
    }
    if (match.serialType && match.serialType !== "auto") {
        return applyComposerSerialTypeSelection({
            slotKey,
            selectedType: match.serialType,
            stemInput,
            matrixTokens: getComposerMatrixRootTokensForSlot(slotKey),
        });
    }
    return applyComposerTemplateSuffixSelection({
        slotKey,
        templateSuffix: match.templateSuffix,
        stemInput,
    });
}

function handleComposerMatrixComboboxSelection(slotKey = "", stemInput = null) {
    if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
    }
    const match = getComposerMatrixComboboxOptionMatch(slotKey, stemInput.value || "");
    if (!match) {
        return false;
    }
    return applyComposerMatrixComboboxMatch(slotKey, stemInput, match);
}

function handleComposerMatrixAffixDropdownSelection(slotKey = "", optionList = null, stemInput = null) {
    if (!optionList || !stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
    }
    const selectedValue = String(optionList.value || "").trim();
    if (!selectedValue) {
        return false;
    }
    const match = getComposerMatrixComboboxOptionMatch(slotKey, selectedValue);
    optionList.value = "";
    if (!match) {
        return false;
    }
    return applyComposerMatrixComboboxMatch(slotKey, stemInput, match);
}

function getComposerMatrixAffixSerialLabel(serialType = "", { short = false } = {}) {
    const type = String(serialType || "").trim().toLowerCase();
    if (!type || type === "auto" || type === "mono") {
        return short ? "" : "Libre";
    }
    if (type === "ti-have") {
        return short ? "-ti tener" : "-ti (tener)";
    }
    if (type === "ti-become") {
        return short ? "-ti ser" : "-ti (ser)";
    }
    if (type === "tia-have") {
        return short ? "-tia tener" : "-tia (tener)";
    }
    if (type === "tia-become") {
        return short ? "-tia ser" : "-tia (ser)";
    }
    const templateSuffix = getComposerTemplateSuffixFromSerialType(type);
    return templateSuffix ? `-${templateSuffix}` : (short ? "" : "Libre");
}

function getComposerMatrixAffixTriggerPrefix(kind = "manual") {
    if (getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb) {
        return "Verbalización";
    }
    return kind === "serial" ? "Serie" : "Derivación";
}

function getComposerMatrixTokenCategoryLabel(slotKey = "", token = "") {
    const normalizedToken = normalizeComposerStem(token);
    const transitivity = getComposerSlotConfig(slotKey)?.transitivity || "";
    if (
        (transitivity === COMPOSER_TRANSITIVITY.transitive
            || transitivity === COMPOSER_TRANSITIVITY.bitransitive)
        && normalizedToken === "ia"
    ) {
        return "Tener/ser";
    }
    return "Nombre→verbo";
}

function buildComposerMatrixAffixAndrewsJudgment({
    status = "nawat-only",
    range = "",
    label = "",
    category = "",
    detail = "",
    classical = "",
    nawat = "",
} = {}) {
    const normalizedStatus = String(status || "nawat-only").trim();
    const normalizedRange = String(range || "").trim();
    const normalizedClassical = String(classical || "").trim();
    const normalizedNawat = String(nawat || "").trim();
    const bridge = normalizedClassical && normalizedNawat && normalizedClassical !== normalizedNawat
        ? `${normalizedClassical}→${normalizedNawat}`
        : "";
    const displayLabel = String(label || (
        normalizedRange
            ? `Andrews ${normalizedRange}`
            : "Nawat"
    )).trim();
    return {
        status: normalizedStatus,
        range: normalizedRange,
        label: bridge ? `${displayLabel} · ${bridge}` : displayLabel,
        category: String(category || "").trim(),
        detail: String(detail || displayLabel).trim(),
        classical: normalizedClassical,
        nawat: normalizedNawat,
    };
}

function getComposerMatrixAffixAndrewsJudgment(slotKey = "", entry = {}) {
    const templateSuffix = normalizeComposerStem(
        entry.templateSuffix || String(entry.value || "").replace(/^_+/, "")
    );
    const serialType = String(entry.serialType || "").trim().toLowerCase();
    const transitivity = getComposerSlotConfig(slotKey)?.transitivity || "";
    const sourceRequired = (range, classical, nawat, category, detail = "") => buildComposerMatrixAffixAndrewsJudgment({
        status: "source-required",
        range,
        classical,
        nawat,
        category,
        detail: detail || `Andrews ${range}: requiere fuente generada o contexto Andrews antes de funcionar como regla productiva.`,
    });
    const supported = (range, classical, nawat, category, detail = "") => buildComposerMatrixAffixAndrewsJudgment({
        status: "supported",
        range,
        classical,
        nawat,
        category,
        detail: detail || `Andrews ${range}: ruta estructural compatible con la verbalizacion.`,
    });
    const nawatOnly = (category = "ruta Nawat") => buildComposerMatrixAffixAndrewsJudgment({
        status: "nawat-only",
        label: "Nawat · sin contrato Andrews",
        category,
        detail: "Ruta Nawat configurada; Andrews no confirma este sufijo como familia denominal directa.",
    });

    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        if (serialType === "ti-have") {
            return supported("54.4", "ti", "ti", "posesion-ti", "Andrews 54.4: posesion denominal con ti.");
        }
        if (serialType === "ti-become" || templateSuffix === "ti") {
            return supported("54.2.1", "ti", "ti", "inceptivo/estativo", "Andrews 54.2.1: inceptivo/estativo con ti.");
        }
        if (templateSuffix === "wi") {
            return supported("54.2.2", "hui", "wi", "inceptivo/estativo", "Andrews 54.2.2: Classical hui se realiza como Nawat wi.");
        }
        if (templateSuffix === "ya") {
            return supported("54.2.3", "ya", "ya", "raiz + ya", "Andrews 54.2.3: nounroot/nounstem en rango raiz + ya.");
        }
        if (templateSuffix === "tiya") {
            return sourceRequired("54.2.3", "ti-ya", "tiya", "ti + ya", "Andrews 54.2.3: ya sobre fuente ti generada; no es un sufijo simple.");
        }
        if (templateSuffix === "wa") {
            return sourceRequired("54.2.5", "hua", "wa", "deverbal -yu(t)", "Andrews 54.2.5: hua/wa exige fuente deverbal -yu(t).");
        }
        if (templateSuffix === "ua") {
            return sourceRequired("55.3", "o-a", "u-a", "o-a denominal", "Andrews 55.3: o-a se realiza como Nawat u-a y requiere fuente adecuada.");
        }
        if (templateSuffix === "iwi") {
            return sourceRequired("55.6", "i-hui", "iwi", "i-hui/a-hui", "Andrews 55.6: i-hui se realiza como Nawat iwi.");
        }
        if (templateSuffix === "awi") {
            return sourceRequired("55.6", "a-hui", "awi", "i-hui/a-hui", "Andrews 55.6: a-hui se realiza como Nawat awi.");
        }
        if (templateSuffix === "wiauto") {
            return sourceRequired("55.6", "i/a-hui", "iwi/awi", "i-hui/a-hui", "Andrews 55.6: la vocal de fuente decide iwi o awi.");
        }
        return nawatOnly("serie Nawat");
    }

    if (
        transitivity === COMPOSER_TRANSITIVITY.transitive
        || transitivity === COMPOSER_TRANSITIVITY.bitransitive
    ) {
        if (templateSuffix === "ia") {
            return sourceRequired("55.7", "i-a", "i-a", "transitivo denominal", "Andrews 55.7: i-a es transitivo y sensible a la fuente.");
        }
        if (templateSuffix === "wia") {
            return sourceRequired("55.3/55.4/55.5", "huia", "wia", "aplicativo/relacional", "Andrews 55.3-55.5: huia se realiza como Nawat wia con fuente marcada.");
        }
        if (templateSuffix === "ta") {
            return sourceRequired("55.2", "tla", "ta", "causativo denominal", "Andrews 55.2: tla se realiza como Nawat ta.");
        }
        if (templateSuffix === "tia") {
            return sourceRequired("54.5/55.1", "ti-a/tia", "tia", "causativo/temporal", "Andrews 54.5/55.1: tia depende del tipo de fuente.");
        }
        if (templateSuffix === "tilia") {
            return sourceRequired("54.2/54.4", "ti-lia", "tilia", "causativo/aplicativo", "Andrews 54.2/54.4: lia requiere una fuente ti generada.");
        }
        if (templateSuffix === "lia") {
            return sourceRequired("54.2.2/54.2.3", "hui/ya + lia", "wi/ya + lia", "causativo/aplicativo", "Andrews 54.2: lia requiere fuente hui/wi o ya generada.");
        }
        if (templateSuffix === "ua") {
            return sourceRequired("55.3", "o-a", "u-a", "o-a denominal", "Andrews 55.3: o-a se realiza como Nawat u-a y requiere fuente adecuada.");
        }
        return nawatOnly("transitivo Nawat");
    }

    return nawatOnly();
}

function buildComposerMatrixTokenEntry(slotKey = "", token = "", value = "") {
    const normalizedToken = normalizeComposerStem(token);
    if (!normalizedToken) {
        return null;
    }
    const categoryLabel = getComposerMatrixTokenCategoryLabel(slotKey, normalizedToken);
    const andrewsJudgment = getComposerMatrixAffixAndrewsJudgment(slotKey, {
        templateSuffix: normalizedToken,
        value: value || `_${normalizedToken}`,
    });
    const meta = String(andrewsJudgment?.category || categoryLabel).trim();
    return {
        kind: "token",
        key: `token:${normalizedToken}`,
        value: value || `_${normalizedToken}`,
        label: `-${normalizedToken}`,
        shortLabel: `-${normalizedToken}`,
        meta,
        andrewsJudgment,
        detailLabel: [`-${normalizedToken}`, meta, andrewsJudgment?.detail || ""].filter(Boolean).join(" · "),
    };
}

function getComposerMatrixAffixCurrentState(slotKey = "", stemInput = null) {
    const selectedType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
    if (selectedType === "mono") {
        return {
            kind: "manual",
            key: "manual",
            shortLabel: "",
            detailLabel: "Libre",
            triggerPrefix: getComposerMatrixAffixTriggerPrefix("manual"),
        };
    }
    if (selectedType !== "auto") {
        const specialState = getComposerMatrixAffixStateFromEntry(
            getComposerMatrixAffixSpecialEntry(slotKey, { serialType: selectedType })
        );
        if (specialState) {
            return specialState;
        }
        const shortLabel = getComposerMatrixAffixSerialLabel(selectedType, { short: true });
        return {
            kind: "serial",
            key: `serial:${selectedType}`,
            shortLabel,
            detailLabel: `Serie ${getComposerMatrixAffixSerialLabel(selectedType)}`,
            triggerPrefix: getComposerMatrixAffixTriggerPrefix("serial"),
            serialType: selectedType,
        };
    }
    const templateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
    if (templateSuffix) {
        const templateTiCausativeClass = normalizeTiCausativeClass(
            COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] || ""
        );
        const templateSerialType = templateTiCausativeClass === "become"
            ? (templateSuffix === "tia" ? "tia-become" : "ti-become")
            : (
                templateTiCausativeClass === "have"
                    ? (templateSuffix === "tia" ? "tia-have" : "ti-have")
                    : ""
            );
        const specialState = getComposerMatrixAffixStateFromEntry(
            getComposerMatrixAffixSpecialEntry(slotKey, {
                value: templateSerialType
                    ? getComposerMatrixComboboxValueForSerialType(templateSerialType)
                    : `_${templateSuffix}`,
                serialType: templateSerialType,
                templateSuffix,
            })
        );
        if (specialState) {
            return specialState;
        }
        const tokenEntry = buildComposerMatrixTokenEntry(
            slotKey,
            templateSuffix,
            templateSerialType
                ? getComposerMatrixComboboxValueForSerialType(templateSerialType)
                : `_${templateSuffix}`
        );
        return {
            ...tokenEntry,
            triggerPrefix: getComposerMatrixAffixTriggerPrefix("token"),
            serialType: templateSerialType,
        };
    }
    const typedValue = String(stemInput?.value || "").trim().toLowerCase();
    if (typedValue.startsWith("_")) {
        const match = getComposerMatrixComboboxOptionMatch(slotKey, typedValue);
        if (match) {
            const normalizedSerialType = String(match.serialType || "auto").trim().toLowerCase();
            const specialState = getComposerMatrixAffixStateFromEntry(
                getComposerMatrixAffixSpecialEntry(slotKey, {
                    value: match.value,
                    serialType: normalizedSerialType,
                    templateSuffix: match.templateSuffix,
                })
            );
            if (specialState) {
                return specialState;
            }
            if (normalizedSerialType !== "auto" && normalizedSerialType !== "mono") {
                const shortLabel = getComposerMatrixAffixSerialLabel(normalizedSerialType, { short: true });
                return {
                    kind: "serial",
                    key: `serial:${normalizedSerialType}`,
                    shortLabel,
                    detailLabel: `Serie ${getComposerMatrixAffixSerialLabel(normalizedSerialType)}`,
                    triggerPrefix: getComposerMatrixAffixTriggerPrefix("serial"),
                    serialType: normalizedSerialType,
                };
            }
            const normalizedSuffix = normalizeComposerStem(match.templateSuffix || match.value || "");
            if (normalizedSuffix) {
                return {
                    ...buildComposerMatrixTokenEntry(
                        slotKey,
                        normalizedSuffix,
                        String(match.value || "").trim().toLowerCase()
                    ),
                    triggerPrefix: getComposerMatrixAffixTriggerPrefix("token"),
                };
            }
        }
    }
    return {
        kind: "manual",
        key: "manual",
        shortLabel: "",
        detailLabel: "Libre",
        triggerPrefix: getComposerMatrixAffixTriggerPrefix("manual"),
    };
}

function buildComposerMatrixAffixPickerGroups(slotKey = "", optionList = null, currentState = null) {
    const options = Array.from(optionList?.options || []);
    const optionValues = new Set(
        options
            .map((option) => String(option.value || "").trim().toLowerCase())
            .filter(Boolean)
    );
    const showManualGroup = getComposerEntryBoard() !== COMPOSER_ENTRY_BOARD.nounToVerb;
    const manualGroup = {
        label: "",
        entries: [{
            kind: "manual",
            key: "manual",
            label: "Libre",
            meta: "Sin guia",
            shortLabel: "",
            detailLabel: "Libre",
        }],
    };
    const specialCatalog = getComposerMatrixAffixSpecialCatalog(slotKey)
        .filter((entry) => optionValues.has(entry.value));
    if (specialCatalog.length) {
        const groups = showManualGroup ? [manualGroup] : [];
        getComposerMatrixAffixSpecialGroups(slotKey).forEach((group) => {
            const groupEntries = specialCatalog
                .filter((entry) => entry.groupKey === group.key)
                .map((entry) => ({ ...entry }));
            if (
                currentState
                && currentState.key
                && !groupEntries.some((entry) => entry.key === currentState.key)
            ) {
                const currentEntry = getComposerMatrixAffixSpecialEntry(slotKey, { key: currentState.key });
                if (currentEntry && currentEntry.groupKey === group.key) {
                    groupEntries.push({ ...currentEntry });
                }
            }
            if (groupEntries.length) {
                groups.push({
                    label: group.label,
                    entries: groupEntries,
                });
            }
        });
        return groups;
    }
    const rootEntries = getComposerMatrixRootTokensForSlot(slotKey)
        .map((token) => normalizeComposerStem(token))
        .filter(Boolean)
        .filter((token) => optionValues.has(`_${token}`))
        .map((token) => buildComposerMatrixTokenEntry(slotKey, token))
        .filter(Boolean);
    if (
        currentState
        && currentState.kind === "token"
        && currentState.value
        && !rootEntries.some((entry) => entry.key === currentState.key)
        && optionValues.has(String(currentState.value || "").trim().toLowerCase())
    ) {
        const suffix = normalizeComposerStem(String(currentState.value || "").replace(/^_+/, ""));
        if (suffix) {
            const currentTokenEntry = buildComposerMatrixTokenEntry(slotKey, suffix);
            if (currentTokenEntry) {
                rootEntries.push(currentTokenEntry);
            }
        }
    }
    const serialEntries = COMPOSER_SERIAL_TYPE_OPTIONS
        .filter((option) => option.value !== "mono")
        .map((option) => {
            const value = String(getComposerMatrixComboboxValueForSerialType(option.value) || "").trim().toLowerCase();
            if (!value || !optionValues.has(value)) {
                return null;
            }
            return {
                kind: "serial",
                key: `serial:${option.value}`,
                value,
                serialType: option.value,
                label: getComposerMatrixAffixSerialLabel(option.value),
                shortLabel: getComposerMatrixAffixSerialLabel(option.value, { short: true }),
                meta: "Serie",
                detailLabel: `Serie ${getComposerMatrixAffixSerialLabel(option.value)}`,
            };
        })
        .filter(Boolean);
    const rootGroups = Array.from(rootEntries.reduce((map, entry) => {
        const label = String(entry?.meta || "Nombre→verbo");
        if (!map.has(label)) {
            map.set(label, []);
        }
        map.get(label).push(entry);
        return map;
    }, new Map()).entries()).map(([label, entries]) => ({
        label,
        entries,
    }));
    return [
        ...(showManualGroup ? [manualGroup] : []),
        ...rootGroups,
        {
            label: "Series",
            entries: serialEntries,
        },
    ].filter((group) => Array.isArray(group.entries) && group.entries.length);
}

function clearComposerMatrixAffixPopoverPosition(popover = null) {
    if (!popover) {
        return;
    }
    popover.style.left = "";
    popover.style.right = "";
    popover.style.top = "";
    popover.style.bottom = "";
    delete popover.dataset.placement;
}

function getComposerViewportDimensions() {
    if (typeof window === "undefined") {
        return { width: 0, height: 0 };
    }
    const docEl = document.documentElement || null;
    const visualViewport = window.visualViewport || null;
    const widthCandidates = [
        Number(window.innerWidth) || 0,
        Number(docEl?.clientWidth) || 0,
        Number(visualViewport?.width) || 0,
    ].filter((value) => value > 0);
    const heightCandidates = [
        Number(window.innerHeight) || 0,
        Number(docEl?.clientHeight) || 0,
        Number(visualViewport?.height) || 0,
    ].filter((value) => value > 0);
    return {
        width: widthCandidates.length ? Math.floor(Math.min(...widthCandidates)) : 0,
        height: heightCandidates.length ? Math.floor(Math.min(...heightCandidates)) : 0,
    };
}

function positionComposerMatrixAffixPopover(slotKey = "") {
    if (typeof window === "undefined" || !COMPOSER_SLOT_KEYS.includes(slotKey)) {
        return;
    }
    const {
        matrixStemAffixPickerBySlot,
        matrixStemAffixPopoverBySlot,
    } = getVerbComposerElements();
    const picker = matrixStemAffixPickerBySlot?.[slotKey] || null;
    const popover = matrixStemAffixPopoverBySlot?.[slotKey] || null;
    if (!picker || !popover || !popover.matches(':popover-open')) {
        return;
    }
    clearComposerMatrixAffixPopoverPosition(popover);
    const { width: viewportWidth, height: viewportHeight } = getComposerViewportDimensions();
    const margin = 12;
    const gap = 8;
    const pickerRect = picker.getBoundingClientRect();
    const composerRect = (
        picker.closest(".verb-block__controls")
        || picker.closest("#verb-composer")
    )?.getBoundingClientRect() || null;
    const topBoundary = Math.max(
        margin,
        Math.floor((Number(composerRect?.top) || 0) + margin)
    );
    popover.style.left = `${pickerRect.left}px`;
    popover.style.right = "auto";
    popover.style.top = `${pickerRect.bottom + gap}px`;
    popover.style.bottom = "auto";
    const popoverRect = popover.getBoundingClientRect();
    const popoverWidth = Math.ceil(popoverRect.width || 0);
    const popoverHeight = Math.ceil(popoverRect.height || 0);
    const minLeft = margin;
    const maxLeft = viewportWidth - margin - popoverWidth;
    const desiredLeft = pickerRect.left;
    const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), Math.max(minLeft, maxLeft));
    const spaceBelow = Math.max(0, Math.floor(viewportHeight - pickerRect.bottom - gap - margin));
    const spaceAbove = Math.max(0, Math.floor(pickerRect.top - gap - topBoundary));
    const placeAbove = popoverHeight > spaceBelow && spaceAbove > spaceBelow;
    popover.style.left = `${Number.isFinite(clampedLeft) ? clampedLeft : 0}px`;
    if (placeAbove) {
        popover.style.top = "auto";
        popover.style.bottom = `${viewportHeight - pickerRect.top + gap}px`;
        popover.dataset.placement = "top";
    } else {
        popover.style.top = `${pickerRect.bottom + gap}px`;
        popover.style.bottom = "auto";
        popover.dataset.placement = "bottom";
    }
}

function positionOpenComposerMatrixAffixPopover() {
    if (!ComposerMatrixAffixOpenSlot) {
        return;
    }
    positionComposerMatrixAffixPopover(ComposerMatrixAffixOpenSlot);
}

function focusComposerMatrixAffixPopoverItem(slotKey = "", { last = false } = {}) {
    const { matrixStemAffixPopoverBySlot } = getVerbComposerElements();
    const popover = matrixStemAffixPopoverBySlot?.[slotKey] || null;
    if (!popover || !popover.matches(':popover-open')) {
        return false;
    }
    const buttons = Array.from(popover.querySelectorAll('button[role="menuitemradio"]:not(:disabled)'));
    const target = buttons[last ? buttons.length - 1 : 0] || null;
    if (!target || typeof target.focus !== "function") {
        return false;
    }
    target.focus({ preventScroll: true });
    return true;
}

function setComposerMatrixAffixPopoverOpen(slotKey = "", nextOpen = false) {
    const {
        matrixStemAffixPickerBySlot,
        matrixStemAffixTriggerBySlot,
        matrixStemAffixPopoverBySlot,
    } = getVerbComposerElements();
    const normalizedSlot = COMPOSER_SLOT_KEYS.includes(slotKey) ? slotKey : "";
    const activeSlot = nextOpen ? normalizedSlot : "";
    COMPOSER_SLOT_KEYS.forEach((candidateSlot) => {
        const picker = matrixStemAffixPickerBySlot?.[candidateSlot] || null;
        const trigger = matrixStemAffixTriggerBySlot?.[candidateSlot] || null;
        const popover = matrixStemAffixPopoverBySlot?.[candidateSlot] || null;
        const isOpen = Boolean(activeSlot) && candidateSlot === activeSlot;
        if (picker) {
            picker.classList.toggle("is-open", isOpen);
        }
        if (trigger) {
            trigger.classList.toggle("is-open", isOpen);
            trigger.setAttribute("aria-expanded", String(isOpen));
        }
        if (popover) {
            const isCurrentlyOpen = popover.matches(':popover-open');
            if (isOpen && !isCurrentlyOpen) popover.showPopover();
            else if (!isOpen && isCurrentlyOpen) popover.hidePopover();
            popover.setAttribute("aria-hidden", String(!isOpen));
            if (!isOpen) {
                clearComposerMatrixAffixPopoverPosition(popover);
            }
        }
    });
    ComposerMatrixAffixOpenSlot = activeSlot;
    if (activeSlot) {
        positionComposerMatrixAffixPopover(activeSlot);
    }
}

function clearComposerMatrixAffixSelection(slotKey = "", stemInput = null) {
    if (!stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
    }
    const previousType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase();
    const currentValue = String(stemInput.value || "");
    if (currentValue.trim().startsWith("_")) {
        stemInput.value = "";
    } else if (isComposerFixedSerialType(previousType)) {
        stemInput.value = extractComposerSerialEditableRoot(currentValue, previousType);
    }
    COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
    COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
    COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
    COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
    delete stemInput.dataset.dropdownTemplateSuffix;
    applyComposerSerialFormattingToStemInput(stemInput, {
        preserveCaret: true,
        slotKey,
        preferSplitFromStem: true,
    });
    onVerbComposerControlChange("matrix-stem");
    focusTextInputAtEnd(stemInput);
    return true;
}

function applyComposerMatrixAffixPickerSelection(slotKey = "", entry = null, optionList = null, stemInput = null) {
    if (!entry || !stemInput || !COMPOSER_SLOT_CONFIG[slotKey]) {
        return false;
    }
    const currentState = getComposerMatrixAffixCurrentState(slotKey, stemInput);
    if (entry.kind !== "manual" && currentState?.key === entry.key) {
        if (getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb) {
            return false;
        }
        return clearComposerMatrixAffixSelection(slotKey, stemInput);
    }
    if (entry.kind === "manual") {
        if (getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb) {
            return false;
        }
        return clearComposerMatrixAffixSelection(slotKey, stemInput);
    }
    if (entry.kind === "serial") {
        if (getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb) {
            return applyComposerTemplateSuffixSelection({
                slotKey,
                templateSuffix: getComposerTemplateSuffixFromSerialType(entry.serialType),
                stemInput,
            });
        }
        return applyComposerSerialTypeSelection({
            slotKey,
            selectedType: entry.serialType,
            stemInput,
            matrixTokens: getComposerMatrixRootTokensForSlot(slotKey),
        });
    }
    if (entry.kind === "token") {
        return applyComposerTemplateSuffixSelection({
            slotKey,
            templateSuffix: String(entry.value || "").replace(/^_+/, ""),
            stemInput,
            tiCausativeClass: getComposerTiCausativeClassFromSerialType(entry.serialType || ""),
        });
    }
    if (!optionList) {
        return false;
    }
    optionList.value = entry.value || "";
    return handleComposerMatrixAffixDropdownSelection(slotKey, optionList, stemInput);
}

function syncComposerMatrixAffixPickers() {
    const {
        panel,
        slots,
        matrixStemAffixSelectBySlot,
        matrixStemAffixPickerBySlot,
        matrixStemAffixTriggerBySlot,
        matrixStemAffixTriggerValueBySlot,
        matrixStemAffixPopoverBySlot,
        matrixStemAffixChipGroupsBySlot,
    } = getVerbComposerElements();
    const isComposer = isVerbInputModeComposer();
    const activeSlot = getComposerActiveSlotFromState();
    if (!isComposer || panel?.classList.contains("is-hidden") || (ComposerMatrixAffixOpenSlot && ComposerMatrixAffixOpenSlot !== activeSlot)) {
        setComposerMatrixAffixPopoverOpen("", false);
    }
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
        const picker = matrixStemAffixPickerBySlot?.[slotKey] || null;
        const trigger = matrixStemAffixTriggerBySlot?.[slotKey] || null;
        const triggerValue = matrixStemAffixTriggerValueBySlot?.[slotKey] || null;
        const popover = matrixStemAffixPopoverBySlot?.[slotKey] || null;
        const groupsHost = matrixStemAffixChipGroupsBySlot?.[slotKey] || null;
        const stemInput = slots[slotKey]?.stemInput || null;
        if (!optionList || !picker || !trigger || !triggerValue || !popover || !groupsHost || !stemInput) {
            return;
        }
        const currentState = getComposerMatrixAffixCurrentState(slotKey, stemInput);
        const isActive = currentState.key !== "manual";
        const isOpen = ComposerMatrixAffixOpenSlot === slotKey;
        picker.classList.toggle("is-active", isActive);
        picker.classList.toggle("is-open", isOpen);
        picker.classList.toggle("is-empty", !isActive && !isOpen);
        trigger.classList.toggle("is-active", isActive);
        const triggerPrefix = trigger.querySelector(".verb-composer__matrix-affix-trigger-prefix");
        if (triggerPrefix) {
            triggerPrefix.textContent = currentState.triggerPrefix || getComposerMatrixAffixTriggerPrefix("manual");
            const shouldHidePrefix = false;
            triggerPrefix.hidden = shouldHidePrefix;
            triggerPrefix.setAttribute("aria-hidden", String(shouldHidePrefix));
        }
        if (currentState.shortLabel) {
            triggerValue.textContent = currentState.shortLabel;
            triggerValue.hidden = false;
            triggerValue.setAttribute("aria-hidden", "false");
        } else {
            triggerValue.textContent = "";
            triggerValue.hidden = true;
            triggerValue.setAttribute("aria-hidden", "true");
        }
        const slotLabel = slotKey.toUpperCase();
        trigger.setAttribute(
            "aria-label",
            currentState.detailLabel && currentState.shortLabel
                ? `Abrir opciones derivativas, casilla ${slotLabel}. Actual ${currentState.detailLabel}.`
                : `Abrir opciones derivativas, casilla ${slotLabel}.`
        );
        if (currentState.andrewsJudgment) {
            trigger.dataset.andrewsJudgment = currentState.andrewsJudgment.status || "";
            trigger.dataset.andrewsRange = currentState.andrewsJudgment.range || "";
            trigger.title = currentState.andrewsJudgment.detail || currentState.detailLabel || "";
        } else {
            delete trigger.dataset.andrewsJudgment;
            delete trigger.dataset.andrewsRange;
            trigger.title = "";
        }
        groupsHost.innerHTML = "";
        const groups = buildComposerMatrixAffixPickerGroups(slotKey, optionList, currentState);
        groups.forEach((group) => {
            const groupEl = document.createElement("div");
            groupEl.className = "verb-composer__matrix-affix-popover-group";
            if (group.label) {
                const label = document.createElement("span");
                label.className = "verb-composer__matrix-affix-popover-label";
                label.textContent = group.label;
                groupEl.appendChild(label);
            }
            const grid = document.createElement("div");
            grid.className = "verb-composer__matrix-affix-chip-grid";
            group.entries.forEach((entry) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "verb-chip verb-composer__matrix-affix-chip";
                if (entry.kind === "manual") {
                    button.classList.add("verb-composer__matrix-affix-chip--manual");
                }
                if (entry.isBlocked) {
                    button.classList.add("is-empty");
                }
                if (entry.isExpected) {
                    button.classList.add("is-expected");
                }
                const andrewsJudgment = entry.andrewsJudgment || null;
                if (andrewsJudgment) {
                    button.dataset.andrewsJudgment = andrewsJudgment.status || "";
                    button.dataset.andrewsRange = andrewsJudgment.range || "";
                    button.classList.add(`is-andrews-${andrewsJudgment.status || "unknown"}`);
                    button.title = andrewsJudgment.detail || "";
                }
                const isCurrent = entry.key === currentState.key;
                button.classList.toggle("is-active", isCurrent);
                button.disabled = Boolean(entry.isBlocked);
                button.setAttribute("aria-disabled", String(Boolean(entry.isBlocked)));
                button.setAttribute("role", "menuitemradio");
                button.setAttribute("aria-checked", String(isCurrent));
                button.setAttribute(
                    "aria-label",
                    [entry.detailLabel || entry.label, andrewsJudgment?.detail || ""]
                        .filter(Boolean)
                        .join(". ")
                );
                const label = document.createElement("span");
                label.className = "verb-composer__matrix-affix-chip-label";
                label.textContent = entry.label;
                button.appendChild(label);
                if (andrewsJudgment?.label) {
                    const judge = document.createElement("span");
                    judge.className = "verb-composer__matrix-affix-chip-judge";
                    judge.textContent = andrewsJudgment.label;
                    button.appendChild(judge);
                }
                if (entry.meta) {
                    const meta = document.createElement("span");
                    meta.className = "verb-composer__matrix-affix-chip-meta";
                    meta.textContent = entry.isExpected ? `Esperado · ${entry.meta}` : entry.meta;
                    button.appendChild(meta);
                }
                button.addEventListener("click", () => {
                    const applied = applyComposerMatrixAffixPickerSelection(slotKey, entry, optionList, stemInput);
                    setComposerMatrixAffixPopoverOpen("", false);
                    if (applied) {
                        focusComposerStemInputAtEditableBoundary(stemInput, slotKey);
                    }
                });
                grid.appendChild(button);
            });
            groupEl.appendChild(grid);
            groupsHost.appendChild(groupEl);
        });
        if (isOpen) {
            positionComposerMatrixAffixPopover(slotKey);
        }
    });
}

function syncComposerMatrixStemAffixSelects() {
    const { matrixStemAffixSelectBySlot } = getVerbComposerElements();
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
        if (!optionList) {
            return;
        }
        const isSelect = String(optionList.tagName || "").toUpperCase() === "SELECT";
        const tokens = COMPOSER_MATRIX_ROOT_TOKENS_ALL;
        const entries = [];
        const seenValues = new Set();
        const addEntry = ({
            value = "",
            templateSuffix = "",
            serialType = "auto",
            label = "",
        } = {}) => {
            const normalizedValue = String(value || "").trim().toLowerCase();
            if (!normalizedValue || seenValues.has(normalizedValue)) {
                return;
            }
            seenValues.add(normalizedValue);
            entries.push({
                value: normalizedValue,
                templateSuffix: normalizeComposerStem(templateSuffix || normalizedValue.replace(/^_+/, "")),
                serialType: String(serialType || "auto").trim().toLowerCase(),
                label: String(label || normalizedValue),
            });
        };
        getComposerMatrixAffixSpecialCatalog(slotKey).forEach((entry) => {
            addEntry({
                value: entry.value,
                templateSuffix: entry.templateSuffix,
                serialType: entry.serialType,
                label: entry.value,
            });
        });
        COMPOSER_SERIAL_TYPE_OPTIONS.forEach((serialOption) => {
            const templateSuffix = getComposerTemplateSuffixFromSerialType(serialOption.value);
            const templateValue = getComposerMatrixComboboxValueForSerialType(serialOption.value);
            addEntry({
                value: templateValue,
                templateSuffix,
                serialType: serialOption.value,
                label: templateValue,
            });
        });
        tokens.forEach((token) => {
            const normalizedToken = normalizeComposerStem(token);
            if (!normalizedToken) {
                return;
            }
            addEntry({
                value: `_${normalizedToken}`,
                templateSuffix: normalizedToken,
                serialType: "auto",
                label: `_${normalizedToken}`,
            });
        });
        const optionSignature = entries
            .map((entry) => `${entry.value}:${entry.serialType}`)
            .join("|");
        if ((optionList.dataset.optionSignature || "") !== optionSignature) {
            optionList.innerHTML = "";
            if (isSelect) {
                const placeholderOption = document.createElement("option");
                placeholderOption.value = "";
                placeholderOption.textContent = "Opciones raíz matriz";
                optionList.appendChild(placeholderOption);
            }
            entries.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.value;
                option.label = entry.label;
                option.textContent = entry.label;
                option.dataset.templateSuffix = entry.templateSuffix;
                option.dataset.serialType = entry.serialType;
                optionList.appendChild(option);
            });
            optionList.dataset.optionSignature = optionSignature;
        }
        if (isSelect) {
            optionList.value = "";
        }
    });
    syncComposerMatrixAffixPickers();
}

function isVerbInputModeComposer() {
    return VerbComposerState.mode === VERB_INPUT_MODE.composer;
}

function normalizeComposerEntryBoard(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    return normalized === COMPOSER_ENTRY_BOARD.nounToVerb
        ? COMPOSER_ENTRY_BOARD.nounToVerb
        : COMPOSER_ENTRY_BOARD.general;
}

function getComposerEntryBoard() {
    return normalizeComposerEntryBoard(VerbComposerState.entryBoard);
}

function getComposerEntryBoardSlotASnapshot(board = "") {
    return ComposerEntryBoardSlotAState[normalizeComposerEntryBoard(board)]
        || ComposerEntryBoardSlotAState[COMPOSER_ENTRY_BOARD.general];
}

function captureComposerEntryBoardSlotAState(board = "") {
    const normalizedBoard = normalizeComposerEntryBoard(board || getComposerEntryBoard());
    const snapshot = getComposerEntryBoardSlotASnapshot(normalizedBoard);
    const slots = getVerbComposerElements().slots || {};
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const stateKeys = getComposerSlotStateKeys(slotKey);
        const slotSnapshot = snapshot.slots?.[slotKey];
        if (!slotSnapshot) {
            return;
        }
        const stemInput = slots[slotKey]?.stemInput || null;
        slotSnapshot.stem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
        slotSnapshot.embed = normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "");
        slotSnapshot.serialType = String(COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto").trim().toLowerCase() || "auto";
        slotSnapshot.templateSuffix = getComposerStemInputTemplateSuffix(stemInput, slotKey);
        slotSnapshot.templateSurface = normalizeComposerStem(COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] || "");
        slotSnapshot.templateTiCausativeClass = normalizeTiCausativeClass(
            COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] || ""
        );
    });
}

function restoreComposerEntryBoardSlotAState(board = "") {
    const normalizedBoard = normalizeComposerEntryBoard(board || getComposerEntryBoard());
    const snapshot = getComposerEntryBoardSlotASnapshot(normalizedBoard);
    const slots = getVerbComposerElements().slots || {};
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const stateKeys = getComposerSlotStateKeys(slotKey);
        const slotSnapshot = snapshot.slots?.[slotKey];
        if (!slotSnapshot) {
            return;
        }
        VerbComposerState[stateKeys.stem] = normalizeComposerStem(slotSnapshot.stem || "");
        VerbComposerState[stateKeys.embed] = normalizeComposerEmbedValue(slotSnapshot.embed || "");
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = String(slotSnapshot.serialType || "auto").trim().toLowerCase() || "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = normalizeComposerStem(slotSnapshot.templateSurface || "");
        if (normalizedBoard === COMPOSER_ENTRY_BOARD.nounToVerb) {
            COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = normalizeComposerStem(
                slotSnapshot.templateSuffix || ""
            );
            COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = normalizeTiCausativeClass(
                slotSnapshot.templateTiCausativeClass || ""
            );
        } else {
            COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
            COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        }
        const stemInput = slots[slotKey]?.stemInput || null;
        if (!stemInput) {
            return;
        }
        if (normalizedBoard !== COMPOSER_ENTRY_BOARD.nounToVerb && slotSnapshot.templateSuffix) {
            stemInput.dataset.dropdownTemplateSuffix = normalizeComposerStem(slotSnapshot.templateSuffix);
        } else {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
}

function getVerbRegexPlaceholder() {
    return "_";
}

function updateVerbInputPlaceholder() {
    const verbInput = document.getElementById("verb");
    if (!verbInput) {
        return;
    }
    verbInput.placeholder = getVerbRegexPlaceholder();
    if (typeof renderVerbMirror === "function") {
        renderVerbMirror();
    }
}

function normalizeComposerStem(value) {
    const cleaned = String(value || "").toLowerCase().replace(/[^a-z]/g, "");
    return cleaned;
}

function getComposerEmbedTokens(value) {
    if (Array.isArray(value)) {
        return value
            .map((token) => normalizeComposerStem(token))
            .filter(Boolean);
    }
    const raw = String(value || "").trim();
    if (!raw) {
        return [];
    }
    return raw
        .split("/")
        .map((token) => normalizeComposerStem(token))
        .filter(Boolean);
}

function normalizeComposerEmbedValue(value) {
    return getComposerEmbedTokens(value).join("/");
}

function normalizeComposerSecondaryValenceSurfaceToken(value) {
    const token = String(value || "").trim().toLowerCase();
    if (token === "ta-1" || token === "ta-2") {
        return "ta";
    }
    if (token === "te-1" || token === "te-2") {
        return "te";
    }
    if (token === "mu-1" || token === "mu-2") {
        return "mu";
    }
    const compact = token.replace(/[^a-z]/g, "");
    return COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN[compact] ? compact : "";
}

function getComposerValenceFamilyToken(value) {
    const surfaceToken = normalizeComposerSecondaryValenceSurfaceToken(value);
    return surfaceToken
        ? (COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN[surfaceToken] || "")
        : "";
}

function normalizeComposerValenceToken(value) {
    return getComposerValenceFamilyToken(value);
}

function getComposerSecondaryValenceInventory() {
    const sourceInventory = Array.isArray(NONSPECIFIC_VALENCE_AFFIXES) && NONSPECIFIC_VALENCE_AFFIXES.length
        ? NONSPECIFIC_VALENCE_AFFIXES
        : DEFAULT_COMPOSER_SECONDARY_VALENCE_INVENTORY;
    const grouped = new Map();
    COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.forEach((family) => {
        grouped.set(family, []);
    });
    sourceInventory.forEach((token) => {
        const normalized = normalizeComposerSecondaryValenceSurfaceToken(token);
        const family = getComposerValenceFamilyToken(normalized);
        if (!normalized || !family) {
            return;
        }
        const bucket = grouped.get(family);
        if (!bucket || bucket.includes(normalized)) {
            return;
        }
        bucket.push(normalized);
    });
    return COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.flatMap((family) => grouped.get(family) || []);
}

function getComposerSecondaryValenceFamilyInventory(family = "") {
    const normalizedFamily = getComposerValenceFamilyToken(family) || String(family || "").trim().toLowerCase();
    if (!normalizedFamily) {
        return [];
    }
    return getComposerSecondaryValenceInventory().filter((token) => (
        getComposerValenceFamilyToken(token) === normalizedFamily
    ));
}

function getComposerSecondaryValenceOptionEntries() {
    const entries = [];
    const seen = new Set();
    const addEntry = (value = "", label = "") => {
        const normalizedValue = String(value || "").trim();
        if (seen.has(normalizedValue)) {
            return;
        }
        seen.add(normalizedValue);
        entries.push({
            value: normalizedValue,
            label: label || normalizedValue || "Sin prefijo",
        });
    };
    addEntry("", "Sin prefijo");
    COMPOSER_SECONDARY_VALENCE_OPTIONS.forEach((value) => {
        if (!value) {
            return;
        }
        if (value === "ta" || value === "mu") {
            // Keep family-only inherited values available through the chip UI, not as distinct options here.
            return;
        }
        addEntry(value, value);
    });
    const inventory = getComposerSecondaryValenceInventory();
    inventory.forEach((token) => {
        if (!isComposerShortValenceTokenAllowed(token, {
            state: VerbComposerState,
            scope: "secondary",
            secondaryTokens: [token],
            secondaryIndex: 1,
        })) {
            return;
        }
        addEntry(token, token);
    });
    inventory.forEach((firstToken) => {
        inventory.forEach((secondToken) => {
            if (!isComposerShortValenceTokenAllowed(firstToken, {
                state: VerbComposerState,
                scope: "secondary",
                secondaryTokens: [firstToken, secondToken],
                secondaryIndex: 0,
            })) {
                return;
            }
            if (!isComposerShortValenceTokenAllowed(secondToken, {
                state: VerbComposerState,
                scope: "secondary",
                secondaryTokens: [firstToken, secondToken],
                secondaryIndex: 1,
            })) {
                return;
            }
            const familyCounts = {};
            [firstToken, secondToken].forEach((token) => {
                const family = getComposerValenceFamilyToken(token);
                if (!family) {
                    return;
                }
                familyCounts[family] = (familyCounts[family] || 0) + 1;
            });
            const isAllowedPair = Object.entries(familyCounts).every(([family, count]) => (
                count <= Number(COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY[family] || 0)
            ));
            if (!isAllowedPair) {
                return;
            }
            const encoded = encodeComposerSecondaryValenceSelection(firstToken, secondToken);
            if (!encoded) {
                return;
            }
            const parsed = parseComposerSecondaryValenceSelection(encoded);
            const first = normalizeComposerSecondaryValenceSurfaceToken(parsed.first);
            const second = normalizeComposerSecondaryValenceSurfaceToken(parsed.second);
            if (!first || !second) {
                return;
            }
            addEntry(encoded, `${first}+${second}`);
        });
    });
    return entries;
}

function getComposerAllowedValenceFamilies(transitivity) {
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        return ["ta"];
    }
    return COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER.slice();
}

function parseComposerSecondaryValenceSelection(value) {
    const token = String(value || "").trim();
    if (token.includes("+")) {
        const parts = token
            .split("+")
            .map((part) => normalizeComposerSecondaryValenceSurfaceToken(part))
            .filter(Boolean);
        if (parts.length >= 2) {
            return {
                first: parts[0],
                second: parts[1],
            };
        }
    }
    if (token === "ta-1") {
        return { first: "ta", second: "" };
    }
    if (token === "te-1") {
        return { first: "te", second: "" };
    }
    if (token === "mu-1") {
        return { first: "mu", second: "" };
    }
    if (token === "ta-2") {
        return { first: "", second: "ta" };
    }
    if (token === "te-2") {
        return { first: "", second: "te" };
    }
    if (token === "mu-2" || token === "mu") {
        return { first: "", second: "mu" };
    }
    const single = normalizeComposerSecondaryValenceSurfaceToken(token);
    return {
        first: "",
        second: single,
    };
}

function canonicalizeComposerSecondaryValencePair(firstValue, secondValue) {
    const first = normalizeComposerSecondaryValenceSurfaceToken(firstValue);
    const second = normalizeComposerSecondaryValenceSurfaceToken(secondValue);
    const firstFamily = getComposerValenceFamilyToken(first);
    const secondFamily = getComposerValenceFamilyToken(second);
    if (!first || !second || !firstFamily || !secondFamily || firstFamily === secondFamily) {
        return { first, second };
    }
    const hasMu = firstFamily === "mu" || secondFamily === "mu";
    if (hasMu) {
        const muToken = firstFamily === "mu" ? first : second;
        const other = firstFamily === "mu" ? second : first;
        return {
            first: muToken,
            second: other,
        };
    }
    const hasTe = firstFamily === "te" || secondFamily === "te";
    const hasTa = firstFamily === "ta" || secondFamily === "ta";
    if (hasTe && hasTa) {
        return {
            first: firstFamily === "te" ? first : second,
            second: firstFamily === "ta" ? first : second,
        };
    }
    return { first, second };
}

function getComposerSecondaryValenceTokens(value) {
    const parsed = parseComposerSecondaryValenceSelection(value);
    const first = normalizeComposerSecondaryValenceSurfaceToken(parsed.first);
    const second = normalizeComposerSecondaryValenceSurfaceToken(parsed.second);
    if (first && second) {
        return [first, second];
    }
    const single = second || first;
    return single ? [single] : [];
}

function encodeComposerSecondaryValenceSelection(firstValue, secondValue) {
    const canonicalPair = canonicalizeComposerSecondaryValencePair(firstValue, secondValue);
    const first = normalizeComposerSecondaryValenceSurfaceToken(canonicalPair.first);
    const second = normalizeComposerSecondaryValenceSurfaceToken(canonicalPair.second);
    if (first && second) {
        return `${first}+${second}`;
    }
    const canonicalToken = second || first;
    if (canonicalToken) {
        return canonicalToken;
    }
    return "";
}

function normalizeComposerFollowerSurfaceForNucleusCheck(value = "") {
    return replaceOptionalSupportiveMarkersWithLetters(
        convertEnvelopeSupportiveMarkersToRegexInput(String(value || ""))
    ).trim().toLowerCase();
}

function composerFollowerStartsWithNucleus(value = "") {
    const normalized = normalizeComposerFollowerSurfaceForNucleusCheck(value);
    return Boolean(normalized) && VOWEL_START_RE.test(normalized);
}

function buildComposerOptionalValenceSlotSegment(value = "", leftEmbed = "") {
    if (value) {
        const leftSegment = leftEmbed ? `${leftEmbed}/` : "";
        return `${leftSegment}(${value})-`;
    }
    const embedTokens = getComposerEmbedTokens(leftEmbed);
    if (embedTokens.length) {
        return embedTokens.map((token) => `${token}-`).join("");
    }
    return "-";
}

function resolveComposerSemanticFollowerSegments(semantic = {}, options = {}) {
    const matrixStem = semantic.matrix?.stem || "";
    const matrixAdjacentEmbed = semantic.matrix?.adjacentEmbed || "";
    const hasMatrixStem = semantic.matrix?.hasStem === true;
    const matrixRegexStem = semantic.matrix?.regexStem || "";
    const realizedMatrixStemBase = semantic.matrix?.realizedStemBase || matrixRegexStem;
    const supportiveMarker = normalizeSupportiveMarkerValue(semantic?.supportiveMarker || "");
    const tiClassSuffix = semantic.ti?.classSuffix || "";
    if (!matrixRegexStem) {
        return {
            transitiveStem: "",
            supportiveStem: "",
            supportiveEmbed: "",
        };
    }
    const appendTiClassSuffix = (stemValue = "") => {
        const stem = String(stemValue || "");
        if (!tiClassSuffix || !stem) {
            return stem;
        }
        if (/ti[12]$/i.test(stem)) {
            return stem;
        }
        if (/ti$/i.test(stem)) {
            return `${stem}${tiClassSuffix}`;
        }
        return stem;
    };
    const supportiveStemBase = appendTiClassSuffix(realizedMatrixStemBase);
    const normalizedMatrixAdjacentEmbed = hasMatrixStem
        ? normalizeComposerMatrixAdjacentEmbed(
            matrixAdjacentEmbed,
            matrixStem,
            supportiveMarker
        )
        : normalizeComposerEmbedValue(matrixAdjacentEmbed);
    const supportiveRootPath = applyComposerSupportiveMarkerToRootPath({
        embed: normalizedMatrixAdjacentEmbed,
        stem: supportiveStemBase,
        supportiveMarker,
        precedingSurface: options.precedingSurface || "",
    });
    const supportiveStem = supportiveRootPath.stem;
    const supportiveEmbed = supportiveRootPath.embed;
    return {
        transitiveStem: supportiveEmbed ? `${supportiveEmbed}/${supportiveStem}` : supportiveStem,
        supportiveStem,
        supportiveEmbed,
    };
}

function isComposerShortValenceTokenAllowed(
    token = "",
    {
        state = VerbComposerState,
        scope = "",
        secondaryTokens = [],
        secondaryIndex = 0,
    } = {}
) {
    const normalizedToken = normalizeComposerSecondaryValenceSurfaceToken(token);
    if (normalizedToken !== "t" && normalizedToken !== "m") {
        return true;
    }
    const semantic = buildComposerSemanticState(state || VerbComposerState);
    const followerSegments = resolveComposerSemanticFollowerSegments(semantic, {
        precedingSurface: normalizedToken,
    });
    let followerSurface = followerSegments.transitiveStem || "";
    if (scope === "secondary" && semantic.transitivity === COMPOSER_TRANSITIVITY.bitransitive) {
        const normalizedTokens = (Array.isArray(secondaryTokens) ? secondaryTokens : [])
            .map((entry) => normalizeComposerSecondaryValenceSurfaceToken(entry))
            .filter(Boolean)
            .slice(0, COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT);
        const slotIndex = Math.max(0, Number(secondaryIndex || 0));
        if (slotIndex <= 0) {
            const slotOneValue = normalizedTokens[0] || "";
            const slotTwoValue = normalizedTokens[1] || "";
            const governingEmbed = normalizeComposerEmbedValue(
                semantic.valence?.secondary?.embed
                || semantic.valence?.primary?.embed
                || ""
            );
            const governingSlot = !slotOneValue ? 1 : (!slotTwoValue ? 2 : 0);
            const slotTwoSegment = buildComposerOptionalValenceSlotSegment(
                slotTwoValue,
                governingSlot === 2 ? governingEmbed : ""
            );
            followerSurface = `${slotTwoSegment}${followerSegments.transitiveStem || ""}`;
        }
    }
    return composerFollowerStartsWithNucleus(followerSurface);
}

function getComposerSecondaryValenceFamilyInventoryForContext(
    family = "",
    options = {}
) {
    return getComposerSecondaryValenceFamilyInventory(family).filter((token) => (
        isComposerShortValenceTokenAllowed(token, options)
    ));
}

function getComposerPreferredFamilyBaseToken(family = "") {
    const normalizedFamily = getComposerValenceFamilyToken(family) || String(family || "").trim().toLowerCase();
    if (!normalizedFamily) {
        return "";
    }
    return normalizedFamily;
}

function normalizeComposerValenceTokenForCurrentContext(
    token = "",
    options = {}
) {
    const normalizedToken = normalizeComposerSecondaryValenceSurfaceToken(token);
    if (!normalizedToken) {
        return "";
    }
    if (isComposerShortValenceTokenAllowed(normalizedToken, options)) {
        return normalizedToken;
    }
    return getComposerPreferredFamilyBaseToken(normalizedToken);
}

function shouldUseNhBeforeMatrixStem(matrixStem, supportiveMarker = "") {
    const normalizedMatrix = normalizeComposerStem(matrixStem);
    if (!normalizedMatrix) {
        return false;
    }
    // Keep selected matrix-button families from forcing n->nh on the adjacent embed.
    if (COMPOSER_MATRIX_NH_BLOCKED_STEMS.has(normalizedMatrix)) {
        return false;
    }
    if (hasSupportiveMarkerValue(supportiveMarker)) {
        return true;
    }
    const letters = splitVerbLetters(normalizedMatrix);
    if (!letters.length) {
        return false;
    }
    return isVerbLetterVowel(letters[0]);
}

function normalizeComposerMatrixAdjacentEmbed(embedValue, matrixStem, supportiveMarker = "") {
    const embedTokens = getComposerEmbedTokens(embedValue);
    if (!embedTokens.length) {
        return "";
    }
    if (!shouldUseNhBeforeMatrixStem(matrixStem, supportiveMarker)) {
        return embedTokens.join("/");
    }
    const lastIndex = embedTokens.length - 1;
    const lastToken = embedTokens[lastIndex];
    if (lastToken.endsWith("n") && !lastToken.endsWith("nh")) {
        embedTokens[lastIndex] = `${lastToken}h`;
    }
    return embedTokens.join("/");
}

function applyComposerSupportiveMarkerToRootPath({
    embed = "",
    stem = "",
    supportiveMarker = "",
    precedingSurface = "",
} = {}) {
    const cleanEmbed = stripComposerOptionalSupportiveMarker(embed || "");
    const cleanStem = stripComposerOptionalSupportiveMarker(stem || "");
    const normalizedMarker = normalizeSupportiveMarkerValue(supportiveMarker);
    if (!normalizedMarker) {
        return { embed: cleanEmbed, stem: cleanStem };
    }
    const resolveSegment = (segmentValue = "") => {
        const leadingLetter = getStemLeadingSupportiveLetter(segmentValue) || normalizedMarker;
        if (!leadingLetter) {
            return String(segmentValue || "");
        }
        const markedSurface = markOptionalSupportiveSurface(
            segmentValue,
            leadingLetter,
            SUPPORTIVE_MARKER_FORMAT.envelope
        );
        const supportiveSourceFrame = buildOptionalSupportiveMarkedSurfaceSourceFrame({
            precedingSurface,
            markedSurface,
            inputFormat: SUPPORTIVE_MARKER_FORMAT.envelope,
            outputFormat: SUPPORTIVE_MARKER_FORMAT.envelope,
            preserveMarkers: true,
            sourceKind: "composer-optional-supportive-segment",
            sourceRole: "tronco",
        });
        const supportiveOperationFrame = buildOptionalSupportiveMarkedSurfaceOperationFrame(supportiveSourceFrame);
        return resolveOptionalSupportiveMarkedSurface({
            precedingSurface,
            markedSurface,
            inputFormat: SUPPORTIVE_MARKER_FORMAT.envelope,
            outputFormat: SUPPORTIVE_MARKER_FORMAT.envelope,
            preserveMarkers: true,
            sourceFrame: supportiveSourceFrame,
            operationFrame: supportiveOperationFrame,
        }).outputSurface || String(segmentValue || "");
    };
    if (getStemLeadingSupportiveLetter(cleanEmbed)) {
        return {
            embed: resolveSegment(cleanEmbed),
            stem: cleanStem,
        };
    }
    if (getStemLeadingSupportiveLetter(cleanStem)) {
        return {
            embed: cleanEmbed,
            stem: resolveSegment(cleanStem),
        };
    }
    return { embed: cleanEmbed, stem: cleanStem };
}

function shouldProjectBoundSupportiveMarkerToComposerInputs({
    embed = "",
    stem = "",
    supportiveMarker = "",
    hasBoundMarker = false,
    hasSlashMarker = false,
} = {}) {
    const cleanEmbed = normalizeComposerEmbedValue(embed || "");
    const cleanStem = normalizeComposerStem(stem || "");
    return (
        normalizeSupportiveMarkerValue(supportiveMarker) === "i"
        && hasBoundMarker === true
        && hasSlashMarker === true
        && Boolean(cleanEmbed)
        && cleanStem.startsWith("i")
    );
}

function projectBoundSupportiveMarkerToComposerInputs({
    embed = "",
    stem = "",
    supportiveMarker = "",
    hasBoundMarker = false,
    hasSlashMarker = false,
} = {}) {
    const cleanEmbed = normalizeComposerEmbedValue(embed || "");
    const cleanStem = normalizeComposerStem(stem || "");
    if (!shouldProjectBoundSupportiveMarkerToComposerInputs({
        embed: cleanEmbed,
        stem: cleanStem,
        supportiveMarker,
        hasBoundMarker,
        hasSlashMarker,
    })) {
        return {
            embed: cleanEmbed,
            stem: cleanStem,
        };
    }
    const embedTokens = getComposerEmbedTokens(cleanEmbed);
    if (!embedTokens.length) {
        return {
            embed: cleanEmbed,
            stem: cleanStem,
        };
    }
    if (!embedTokens[0].startsWith("i")) {
        embedTokens[0] = `i${embedTokens[0]}`;
    }
    return {
        embed: embedTokens.join("/"),
        stem: cleanStem,
    };
}

function shouldSerializeBoundSupportiveMarkerFromComposerInputs({
    embed = "",
    stem = "",
    supportiveMarker = "",
} = {}) {
    const cleanEmbed = normalizeComposerEmbedValue(embed || "");
    const cleanStem = normalizeComposerStem(stem || "");
    const firstEmbedToken = getComposerEmbedTokens(cleanEmbed)[0] || "";
    return (
        normalizeSupportiveMarkerValue(supportiveMarker) === "i"
        && Boolean(cleanEmbed)
        && Boolean(cleanStem)
        && firstEmbedToken.startsWith("i")
    );
}

function resolveComposerMarkedSupportiveRootPath({
    embed = "",
    stem = "",
    supportiveMarker = "",
    precedingSurface = "",
} = {}) {
    const cleanEmbed = normalizeComposerEmbedValue(embed || "");
    const cleanStem = normalizeComposerStem(stem || "");
    const normalizedMarker = normalizeSupportiveMarkerValue(supportiveMarker);
    if (shouldSerializeBoundSupportiveMarkerFromComposerInputs({
        embed: cleanEmbed,
        stem: cleanStem,
        supportiveMarker: normalizedMarker,
    })) {
        const embedTokens = getComposerEmbedTokens(cleanEmbed);
        const regexEmbedTokens = embedTokens.slice();
        regexEmbedTokens[0] = regexEmbedTokens[0].replace(/^i/, "");
        const regexEmbed = normalizeComposerEmbedValue(regexEmbedTokens);
        const regexStem = cleanStem;
        const markedEmbed = `${getOptionalSupportiveMarkerForLetter("i")}${regexEmbed}`;
        return {
            embed: markedEmbed,
            stem: regexStem,
            combined: `${markedEmbed}/${regexStem}`,
        };
    }
    const resolved = applyComposerSupportiveMarkerToRootPath({
        embed: cleanEmbed,
        stem: cleanStem,
        supportiveMarker: normalizedMarker,
        precedingSurface,
    });
    return {
        embed: resolved.embed,
        stem: resolved.stem,
        combined: resolved.embed ? `${resolved.embed}/${resolved.stem}` : resolved.stem,
    };
}

function getComposerStemSyllableCount(stem) {
    const normalizedStem = normalizeComposerStem(stem);
    if (!normalizedStem) {
        return 0;
    }
    const syllables = getSyllables(normalizedStem, {
        analysis: true,
        assumeFinalV: true,
    });
    if (Array.isArray(syllables) && syllables.length) {
        return syllables.filter((syllable) => syllable && syllable.nucleus).length;
    }
    return getTotalVowelCount(normalizedStem);
}

function getComposerSupportiveMarker(state = VerbComposerState) {
    return normalizeSupportiveMarkerValue(state?.supportiveMarker || "");
}

function getComposerSupportiveMarkerCandidate(state = VerbComposerState) {
    const source = state && typeof state === "object" ? state : VerbComposerState;
    const slotKey = getComposerSlotKeyForTransitivity(source?.transitivity);
    const stateKeys = getComposerSlotStateKeys(slotKey);
    return resolveComposerSupportiveMarkerCandidate({
        stem: source?.[stateKeys.stem] || "",
        embed: source?.[stateKeys.embed] || source?.embedPrefix || "",
    });
}

function canComposerUseSupportiveMarker(state = VerbComposerState) {
    return Boolean(getComposerSupportiveMarkerCandidate(state));
}

function syncComposerSupportiveMarkerFromState() {
    const currentMarker = getComposerSupportiveMarker();
    if (!currentMarker) {
        VerbComposerState.supportiveMarker = "";
        return "";
    }
    const candidateMarker = getComposerSupportiveMarkerCandidate();
    VerbComposerState.supportiveMarker = candidateMarker || "";
    return VerbComposerState.supportiveMarker;
}

function syncComposerSupportiveIAvailability() {
    const { supportiveICheckbox } = getVerbComposerElements();
    if (!supportiveICheckbox) {
        return;
    }
    syncComposerSupportiveMarkerFromState();
    const canUse = canComposerUseSupportiveMarker();
    const isOn = hasSupportiveMarkerValue(getComposerSupportiveMarker());
    const shouldDisable = !canUse && !isOn;
    supportiveICheckbox.disabled = shouldDisable;
    supportiveICheckbox.setAttribute("aria-disabled", String(shouldDisable));
    supportiveICheckbox.checked = isOn;
    const checkboxWrapper = supportiveICheckbox.closest(".verb-composer__checkbox");
    if (checkboxWrapper) {
        checkboxWrapper.classList.toggle("is-blocked", shouldDisable);
    }
    syncComposerSupportiveITogglePlacement();
}

function getUiCopyLabel(labelKey = "", fallback = "") {
    return getLocalizedLabel(UI_LABELS[labelKey], getIsNawat(), fallback);
}

function updateVerbComposerHint() {
    const { hint } = getVerbComposerElements();
    if (!hint) {
        return;
    }
    if (!isVerbInputModeComposer()) {
        hint.textContent = getUiCopyLabel(
            "composer-hint-regex-dev",
            "Patrón: escribe el patrón directamente en la pantalla."
        );
        return;
    }
    const stem = getComposerActiveStemValue();
    const syllableCount = getComposerStemSyllableCount(stem);
    if (!stem) {
        hint.textContent = getUiCopyLabel(
            "composer-hint-define-roots",
            "Define raíz matriz y raíz incorporada para construir la forma."
        );
        return;
    }
    const directionalPrefix = String(VerbComposerState.directionalPrefix || "").trim();
    if (directionalPrefix) {
        hint.textContent = `Sílabas detectadas (base): ${syllableCount || 0}. Direccional en posición guía: [${directionalPrefix}]/ al inicio del bloque.`;
        return;
    }
    hint.textContent = `Sílabas detectadas (raíz matriz): ${syllableCount || 0}.`;
}

function syncComposerSecondaryValenceOptions(selectEl) {
    if (!selectEl) {
        return;
    }
    const entries = getComposerSecondaryValenceOptionEntries();
    const signature = entries.map((entry) => `${entry.value}:${entry.label}`).join("|");
    if ((selectEl.dataset.optionSignature || "") === signature) {
        return;
    }
    selectEl.innerHTML = "";
    entries.forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.value;
        option.textContent = entry.label;
        selectEl.appendChild(option);
    });
    selectEl.dataset.optionSignature = signature;
}

function getComposerAllowedValenceOptions(transitivity) {
    const options = new Set([""]);
    const scope = transitivity === COMPOSER_TRANSITIVITY.intransitive
        ? "intransitive"
        : "primary";
    getComposerAllowedValenceFamilies(transitivity).forEach((family) => {
        getComposerSecondaryValenceFamilyInventoryForContext(family, {
            state: VerbComposerState,
            scope,
        }).forEach((token) => {
            options.add(token);
        });
    });
    return options;
}

function syncComposerSingleValenceOptions(selectEl, families = []) {
    if (!selectEl) {
        return;
    }
    const entries = [{ value: "", label: "Sin prefijo" }];
    const scope = selectEl?.id === "composer-valence-a"
        ? "intransitive"
        : "primary";
    (Array.isArray(families) ? families : []).forEach((family) => {
        getComposerSecondaryValenceFamilyInventoryForContext(family, {
            state: VerbComposerState,
            scope,
        }).forEach((token) => {
            entries.push({ value: token, label: token });
        });
    });
    const signature = entries.map((entry) => `${entry.value}:${entry.label}`).join("|");
    if ((selectEl.dataset.optionSignature || "") === signature) {
        return;
    }
    selectEl.innerHTML = "";
    entries.forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.value;
        option.textContent = entry.label;
        selectEl.appendChild(option);
    });
    selectEl.dataset.optionSignature = signature;
}

function getComposerNextFamilySurfaceToken(
    family = "",
    currentToken = "",
    {
        reservedTokens = [],
        allowClear = false,
        state = VerbComposerState,
        scope = "primary",
        secondaryTokens = [],
        secondaryIndex = 0,
    } = {}
) {
    const reserved = new Set(
        (Array.isArray(reservedTokens) ? reservedTokens : [])
            .map((token) => normalizeComposerSecondaryValenceSurfaceToken(token))
            .filter(Boolean)
    );
    const inventory = getComposerSecondaryValenceFamilyInventoryForContext(family, {
        state,
        scope,
        secondaryTokens,
        secondaryIndex,
    })
        .filter((token) => !reserved.has(token));
    if (!inventory.length) {
        return "";
    }
    const normalizedCurrent = normalizeComposerSecondaryValenceSurfaceToken(currentToken);
    const currentIndex = inventory.indexOf(normalizedCurrent);
    if (currentIndex < 0) {
        return inventory[0];
    }
    if (currentIndex >= inventory.length - 1) {
        return allowClear ? "" : inventory[0];
    }
    return inventory[currentIndex + 1] || inventory[0];
}

function syncComposerValenceFamilyChipGroup(container, selectEl, families = [], source = "other") {
    if (!container || !selectEl) {
        return;
    }
    const normalizedFamilies = (Array.isArray(families) ? families : [])
        .map((family) => String(family || "").trim().toLowerCase())
        .filter(Boolean);
    const optionSignature = normalizedFamilies.join("|");
    if ((container.dataset.familySignature || "") !== optionSignature) {
        container.innerHTML = "";
        normalizedFamilies.forEach((family) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "verb-chip";
            button.dataset.chipFamily = family;
            button.textContent = family;
            button.addEventListener("click", () => {
                if (button.disabled) {
                    return;
                }
                const currentToken = normalizeComposerSecondaryValenceSurfaceToken(selectEl.value);
                const currentFamily = getComposerValenceFamilyToken(currentToken);
                const scope = selectEl?.id === "composer-valence-a"
                    ? "intransitive"
                    : "primary";
                const nextToken = currentFamily === family
                    ? getComposerNextFamilySurfaceToken(family, currentToken, {
                        allowClear: true,
                        state: VerbComposerState,
                        scope,
                    })
                    : getComposerNextFamilySurfaceToken(family, "", {
                        state: VerbComposerState,
                        scope,
                    });
                selectEl.value = nextToken;
                onVerbComposerControlChange(source);
            });
            container.appendChild(button);
        });
        container.dataset.familySignature = optionSignature;
    }
    const currentToken = normalizeComposerSecondaryValenceSurfaceToken(selectEl.value);
    const currentFamily = getComposerValenceFamilyToken(currentToken);
    const buttons = Array.from(container.querySelectorAll(".verb-chip"));
    buttons.forEach((button) => {
        const family = String(button.dataset.chipFamily || "");
        const isDisabled = Boolean(selectEl.disabled);
        const isActive = currentFamily === family;
        button.disabled = isDisabled;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.setAttribute(
            "aria-label",
            isActive && currentToken
                ? `${family}. Actual ${currentToken}.`
                : family
        );
    });
}

function syncComposerValenceAvailability() {
    const {
        valenceSelectIntransitive,
        valenceIntransitiveEmbedInput,
        valenceEmbedPrimaryInput,
        valenceEmbedSecondaryInput,
        valenceSelect,
        valenceSelectSecondary,
    } = getVerbComposerElements();
    if (!valenceSelectIntransitive || !valenceSelect || !valenceSelectSecondary) {
        return;
    }
    syncComposerSingleValenceOptions(
        valenceSelectIntransitive,
        getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.intransitive)
    );
    syncComposerSingleValenceOptions(
        valenceSelect,
        getComposerAllowedValenceFamilies(COMPOSER_TRANSITIVITY.transitive)
    );
    syncComposerSecondaryValenceOptions(valenceSelectSecondary);
    const allowedIntransitive = getComposerAllowedValenceOptions(COMPOSER_TRANSITIVITY.intransitive);
    Array.from(valenceSelectIntransitive.options).forEach((option) => {
        option.disabled = !allowedIntransitive.has(option.value);
    });
    VerbComposerState.valenceIntransitive = normalizeComposerValenceTokenForCurrentContext(
        VerbComposerState.valenceIntransitive,
        {
            state: VerbComposerState,
            scope: "intransitive",
        }
    );
    if (!allowedIntransitive.has(VerbComposerState.valenceIntransitive)) {
        VerbComposerState.valenceIntransitive = "";
    }
    valenceSelectIntransitive.value = VerbComposerState.valenceIntransitive;
    if (valenceIntransitiveEmbedInput) {
        const showEmbed = (
            VerbComposerState.transitivity === COMPOSER_TRANSITIVITY.intransitive
            && getComposerValenceFamilyToken(VerbComposerState.valenceIntransitive) === "ta"
        );
        const embedField = valenceIntransitiveEmbedInput.closest(".verb-composer__stem-field");
        if (embedField) {
            embedField.hidden = !showEmbed;
            embedField.setAttribute("aria-hidden", String(!showEmbed));
            const embedLabel = embedField.querySelector(".verb-composer__sub-label");
            if (embedLabel) {
                embedLabel.hidden = !showEmbed;
                embedLabel.setAttribute("aria-hidden", String(!showEmbed));
            }
        }
        valenceIntransitiveEmbedInput.hidden = !showEmbed;
        valenceIntransitiveEmbedInput.readOnly = !showEmbed;
        valenceIntransitiveEmbedInput.classList.toggle("is-blocked", !showEmbed);
        valenceIntransitiveEmbedInput.setAttribute("aria-disabled", String(!showEmbed));
    }
    const allowedPrimary = getComposerAllowedValenceOptions(COMPOSER_TRANSITIVITY.transitive);
    Array.from(valenceSelect.options).forEach((option) => {
        option.disabled = !allowedPrimary.has(option.value);
    });
    const isBitransitive = VerbComposerState.transitivity === COMPOSER_TRANSITIVITY.bitransitive;
    VerbComposerState.valence = normalizeComposerValenceTokenForCurrentContext(
        VerbComposerState.valence,
        {
            state: VerbComposerState,
            scope: "primary",
        }
    );
    if (!allowedPrimary.has(VerbComposerState.valence)) {
        VerbComposerState.valence = "";
    }
    valenceSelect.disabled = isBitransitive;
    valenceSelect.value = VerbComposerState.valence;
    const allowedSecondary = new Set(
        getComposerSecondaryValenceOptionEntries().map((entry) => entry.value)
    );
    Array.from(valenceSelectSecondary.options).forEach((option) => {
        option.disabled = !allowedSecondary.has(option.value);
    });
    const normalizedSecondaryTokens = getComposerSecondaryValenceTokens(VerbComposerState.valenceSecondary)
        .map((token, index, tokens) => normalizeComposerValenceTokenForCurrentContext(token, {
            state: VerbComposerState,
            scope: "secondary",
            secondaryTokens: tokens,
            secondaryIndex: index,
        }))
        .filter(Boolean);
    VerbComposerState.valenceSecondary = encodeComposerSecondaryInventoryTokens(normalizedSecondaryTokens);
    if (!allowedSecondary.has(VerbComposerState.valenceSecondary)) {
        VerbComposerState.valenceSecondary = "";
    }
    valenceSelectSecondary.value = VerbComposerState.valenceSecondary;
    if (valenceEmbedPrimaryInput) {
        valenceEmbedPrimaryInput.readOnly = isBitransitive;
        valenceEmbedPrimaryInput.classList.toggle("is-blocked", isBitransitive);
        valenceEmbedPrimaryInput.setAttribute("aria-disabled", String(isBitransitive));
    }
    if (valenceEmbedSecondaryInput) {
        valenceEmbedSecondaryInput.readOnly = false;
        valenceEmbedSecondaryInput.classList.remove("is-blocked");
        valenceEmbedSecondaryInput.setAttribute("aria-disabled", "false");
    }
    syncComposerChipGroupsFromState();
}

function getComposerSlotEmbedForRegex(slotKey = "", embedValue = "") {
    const normalizedEmbed = normalizeComposerEmbedValue(embedValue || "");
    if (!normalizedEmbed) {
        return "";
    }
    void slotKey;
    return normalizedEmbed;
}

function buildComposerSemanticState(state = {}) {
    const transitivity = (
        state.transitivity === COMPOSER_TRANSITIVITY.transitive
        || state.transitivity === COMPOSER_TRANSITIVITY.bitransitive
    )
        ? state.transitivity
        : COMPOSER_TRANSITIVITY.intransitive;
    const slotAStem = normalizeComposerStem(state.slotAStem || "");
    const slotAEmbed = getComposerSlotEmbedForRegex("a", state.slotAEmbed || "");
    const slotBStem = normalizeComposerStem(state.slotBStem || "");
    const slotBEmbed = getComposerSlotEmbedForRegex("b", state.slotBEmbed || "");
    const slotCStem = normalizeComposerStem(state.slotCStem || "");
    const slotCEmbed = getComposerSlotEmbedForRegex("c", state.slotCEmbed || "");
    const valenceIntransitive = normalizeComposerSecondaryValenceSurfaceToken(state.valenceIntransitive || "");
    const valenceIntransitiveEmbed = normalizeComposerEmbedValue(state.valenceIntransitiveEmbed || "");
    const valence = normalizeComposerSecondaryValenceSurfaceToken(state.valence || "");
    const valenceEmbedPrimary = normalizeComposerEmbedValue(state.valenceEmbedPrimary || "");
    const valenceSecondaryRaw = String(state.valenceSecondary || "").trim();
    const valenceSecondary = normalizeComposerValenceToken(valenceSecondaryRaw);
    const valenceEmbedSecondary = normalizeComposerEmbedValue(state.valenceEmbedSecondary || "");
    const matrixStem = transitivity === COMPOSER_TRANSITIVITY.bitransitive
        ? slotCStem
        : (transitivity === COMPOSER_TRANSITIVITY.transitive ? slotBStem : slotAStem);
    const matrixAdjacentEmbed = transitivity === COMPOSER_TRANSITIVITY.bitransitive
        ? slotCEmbed
        : (transitivity === COMPOSER_TRANSITIVITY.transitive ? slotBEmbed : slotAEmbed);
    const activeSlot = transitivity === COMPOSER_TRANSITIVITY.bitransitive
        ? "c"
        : (transitivity === COMPOSER_TRANSITIVITY.transitive ? "b" : "a");
    const activeStemInput = getVerbComposerElements().slots?.[activeSlot]?.stemInput || null;
    const selectedSerialType = COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] || "auto";
    const selectedSerialOption = getComposerSerialTypeOptionByValue(selectedSerialType);
    const selectedSerialSlotCount = Math.max(1, Number(selectedSerialOption?.slotCount || 1));
    const stateTiCausativeClass = normalizeTiCausativeClass(state.tiCausativeClass || "");
    const tiCausativeClass = normalizeTiCausativeClass(
        stateTiCausativeClass
        || getComposerActiveTiCausativeClass()
        || getComposerTiCausativeClassFromSerialType(selectedSerialType)
    );
    const tiClassSuffix = tiCausativeClass === "become"
        ? "1"
        : (tiCausativeClass === "have" ? "2" : "");
    const activeTemplateSuffix = getComposerStemInputTemplateSuffix(activeStemInput, activeSlot);
    const directionalPrefix = state.directionalPrefix || "";
    const hasMatrixStem = Boolean(matrixStem);
    const hasSelectionStructure = Boolean(
        directionalPrefix
        || valenceIntransitive
        || valenceIntransitiveEmbed
        || valence
        || valenceSecondaryRaw
        || valenceEmbedPrimary
        || valenceEmbedSecondary
        || matrixAdjacentEmbed
        || transitivity !== COMPOSER_TRANSITIVITY.intransitive
    );
    const isComposerTemplateMode = (
        state?.mode === VERB_INPUT_MODE.composer
        || isVerbInputModeComposer()
    );
    const matrixPlaceholderStem = activeTemplateSuffix
        ? `_${activeTemplateSuffix}`
        : (
            getComposerSerialInputTemplate(
                selectedSerialType,
                selectedSerialSlotCount
            ).placeholder || "_"
        );
    const matrixSurfaceValue = activeTemplateSuffix
        ? getComposerNounToVerbSurfaceValue(activeSlot, matrixStem || "")
        : "";
    const templateCanonicalStem = activeTemplateSuffix
        ? resolveComposerLockedTemplateStem(
            matrixStem || matrixPlaceholderStem,
            activeTemplateSuffix,
            {
                slotKey: activeSlot,
                surfaceValue: matrixSurfaceValue || matrixStem || "",
            }
        ).canonicalStem
        : "";
    const matrixRegexStem = activeTemplateSuffix
        ? (
            templateCanonicalStem
            || ((hasSelectionStructure || isComposerTemplateMode) ? matrixPlaceholderStem : "")
        )
        : (
            hasMatrixStem
                ? matrixStem
                : ((hasSelectionStructure || isComposerTemplateMode) ? matrixPlaceholderStem : "")
        );
    const formatValenceToken = (token = "") => {
        const surface = normalizeComposerSecondaryValenceSurfaceToken(token)
            || normalizeComposerValenceToken(token);
        if (!surface) {
            return "";
        }
        return `(${surface})`;
    };
    const appendTiClassSuffix = (stemValue = "") => {
        const stem = String(stemValue || "");
        if (!tiClassSuffix || !stem) {
            return stem;
        }
        if (/ti[12]$/i.test(stem)) {
            return stem;
        }
        if (/ti$/i.test(stem)) {
            return `${stem}${tiClassSuffix}`;
        }
        return stem;
    };
    const realizedMatrixStemBase = (
        hasMatrixStem && !activeTemplateSuffix
            ? normalizeComposerStem(matrixStem)
            : matrixRegexStem
    );
    const supportiveMarker = normalizeSupportiveMarkerValue(
        state.supportiveMarker || ""
    );
    const semanticState = {
        transitivity,
        supportiveMarker,
        directional: {
            prefix: directionalPrefix,
        },
        slots: {
            a: { stem: slotAStem, embed: slotAEmbed },
            b: { stem: slotBStem, embed: slotBEmbed },
            c: { stem: slotCStem, embed: slotCEmbed },
        },
        valence: {
            intransitive: {
                token: valenceIntransitive,
                embed: valenceIntransitiveEmbed,
            },
            primary: {
                token: valence,
                embed: valenceEmbedPrimary,
            },
            secondary: {
                raw: valenceSecondaryRaw,
                token: valenceSecondary,
                embed: valenceEmbedSecondary,
            },
        },
        ti: {
            causativeClass: tiCausativeClass,
            classSuffix: tiClassSuffix,
        },
        matrix: {
            stem: matrixStem,
            adjacentEmbed: matrixAdjacentEmbed,
            hasStem: hasMatrixStem,
            hasSelectionStructure,
            isComposerTemplateMode,
            placeholderStem: matrixPlaceholderStem,
            surfaceValue: matrixSurfaceValue,
            templateSuffix: activeTemplateSuffix,
            templateCanonicalStem,
            regexStem: matrixRegexStem,
            realizedStemBase: realizedMatrixStemBase,
        },
    };
    const entradaGrammarObject = typeof buildEntradaGrammarObjectFromComposerSemantic === "function"
        ? buildEntradaGrammarObjectFromComposerSemantic(semanticState, {
            rawInput: serializeComposerSemanticToRegexInput(semanticState),
        })
        : null;
    if (entradaGrammarObject) {
        Object.defineProperty(semanticState, "entradaGrammarObject", {
            configurable: true,
            enumerable: false,
            value: entradaGrammarObject,
        });
    }
    return semanticState;
}

function serializeComposerSemanticToRegexInput(semantic = {}) {
    const transitivity = semantic?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    const supportiveMarker = normalizeSupportiveMarkerValue(semantic?.supportiveMarker || "");
    const tiClassSuffix = semantic?.ti?.classSuffix || "";
    const appendTiClassSuffix = (stemValue = "") => {
        const stem = String(stemValue || "");
        if (!tiClassSuffix || !stem) {
            return stem;
        }
        if (/ti[12]$/i.test(stem)) {
            return stem;
        }
        if (/ti$/i.test(stem)) {
            return `${stem}${tiClassSuffix}`;
        }
        return stem;
    };
    const matrixRegexStem = String(semantic?.matrix?.regexStem || "").trim();
    const matrixStem = String(semantic?.matrix?.stem || "").trim();
    const hasMatrixStem = semantic?.matrix?.hasStem === true;
    const realizedMatrixStemBase = appendTiClassSuffix(
        semantic?.matrix?.realizedStemBase
        || matrixRegexStem
        || matrixStem
    );
    const normalizedMatrixAdjacentEmbed = hasMatrixStem
        ? normalizeComposerMatrixAdjacentEmbed(
            semantic?.matrix?.adjacentEmbed || "",
            matrixStem,
            supportiveMarker
        )
        : normalizeComposerEmbedValue(semantic?.matrix?.adjacentEmbed || "");
    const resolvedRootPath = applyComposerSupportiveMarkerToRootPath({
        embed: normalizedMatrixAdjacentEmbed,
        stem: realizedMatrixStemBase,
        supportiveMarker,
        precedingSurface: "",
    });
    const coreText = resolvedRootPath.embed
        ? `${resolvedRootPath.embed}/${resolvedRootPath.stem}`
        : resolvedRootPath.stem;
    if (!coreText) {
        return "";
    }
    return buildMovingTargetRegexFromCoreAndPieces({
        transitivity,
        coreText,
        outerPieces: getMovingTargetOuterPieceDescriptors(semantic),
    });
}

function parseComposerOrdinaryNncAnalogueInput(value = "") {
    if (typeof parseOrdinaryNncGenerationAnalogueInput === "function") {
        return parseOrdinaryNncGenerationAnalogueInput(value);
    }
    const raw = String(value || "").trim().toLowerCase();
    const match = raw.match(/^\(\s*([^()]+?)\s*\)\s*(ti|in|t|0|ø|zero)?$/i);
    if (!match) {
        return null;
    }
    const stem = normalizeComposerStem(match[1] || "");
    if (!stem) {
        return null;
    }
    const nounClass = normalizeComposerOrdinaryNncNounClass(match[2] || "zero") || "zero";
    return {
        stem,
        nounClass,
        connector: nounClass === "zero" ? "" : nounClass,
    };
}

function normalizeComposerOrdinaryNncNounClass(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    if (normalized === "0" || normalized === "ø" || normalized === "zero") {
        return "zero";
    }
    return ["t", "ti", "in"].includes(normalized) ? normalized : "";
}

function getComposerOrdinaryNncConnectorSurface(nounClass = "") {
    const normalized = normalizeComposerOrdinaryNncNounClass(nounClass);
    return normalized === "zero" ? "" : normalized;
}

function formatComposerOrdinaryNncAnalogueInput({
    stem = "",
    nounClass = "",
} = {}) {
    if (typeof formatOrdinaryNncGenerationAnalogueInput === "function") {
        return formatOrdinaryNncGenerationAnalogueInput({ stem, nounClass });
    }
    const normalizedStem = normalizeComposerStem(stem || "");
    if (!normalizedStem) {
        return "";
    }
    return `(${normalizedStem})${getComposerOrdinaryNncConnectorSurface(nounClass)}`;
}

function stripComposerOrdinaryNncConnectorFromStem(stem = "", nounClass = "") {
    const normalizedStem = normalizeComposerStem(stem || "");
    const connector = getComposerOrdinaryNncConnectorSurface(nounClass);
    if (!normalizedStem || !connector || normalizedStem.length <= connector.length) {
        return normalizedStem;
    }
    return normalizedStem.endsWith(connector)
        ? normalizedStem.slice(0, -connector.length)
        : normalizedStem;
}

function buildComposerOrdinaryNncInputBundle(state, rawFallback = "") {
    const parsedFallback = parseComposerOrdinaryNncAnalogueInput(rawFallback);
    const uiState = typeof getOrdinaryNncGenerationState === "function"
        ? getOrdinaryNncGenerationState()
        : {};
    const rawStem = getComposerActiveStemValue(state) || parsedFallback?.stem || normalizeComposerStem(getSearchInputBase(rawFallback || ""));
    const nounClass = normalizeComposerOrdinaryNncNounClass(uiState.nounClass || parsedFallback?.nounClass || "");
    const stem = nounClass ? stripComposerOrdinaryNncConnectorFromStem(rawStem, nounClass) : rawStem;
    const fixtureProbe = stem && typeof resolveOrdinaryNncFixture === "function"
        ? resolveOrdinaryNncFixture({ stem, states: ["absolutive"], numbers: ["singular"] })
        : null;
    const fixtureAnimacy = fixtureProbe?.fixture?.animacy === "animate"
        ? "animate"
        : (fixtureProbe?.fixture?.animacy === "inanimate" ? "inanimate" : "");
    const animacy = (
        uiState.animacy === "animate" || uiState.animacy === "inanimate" ? uiState.animacy : ""
    ) || fixtureAnimacy;
    const regexValue = stem
        ? formatComposerOrdinaryNncAnalogueInput({ stem, nounClass: "" })
        : "";
    return {
        regexValue,
        stem,
        nounClass,
        animacy,
        selectionRequired: "",
    };
}

// Current regex is the only visible verb language.
// Composer edits structural state, then serializes directly to current regex.
function buildComposerModeBundle(state, rawFallback = "") {
    const ordinaryNncActive = typeof isOrdinaryNncGenerationModeEnabled === "function"
        && isOrdinaryNncGenerationModeEnabled();
    if (ordinaryNncActive) {
        return buildComposerOrdinaryNncInputBundle(state, rawFallback);
    }
    if (!isComposerTransitivitySelected(state)) {
        return {
            regexValue: getComposerActiveStemValue(state),
            selectionRequired: "transitivity",
        };
    }
    const fallback = String(rawFallback || "");
    const semantic = buildComposerSemanticState(state);
    const regexValue = serializeComposerSemanticToRegexInput(semantic)
        || serializeRegexInputValue(fallback)
        || fallback;
    if (!regexValue) {
        return {
            regexValue: "",
        };
    }
    return {
        regexValue,
        entradaGrammarObject: semantic.entradaGrammarObject || null,
    };
}

// The visible verb language is current regex. Composer edits structure and syncs to it.
function resolveVerbInputSource(rawValue = "", options = {}) {
    const raw = String(rawValue || "");
    void options;
    const composerDisplayBundle = buildComposerModeBundle(VerbComposerState, raw);
    const directRegexValue = serializeRegexInputValue(raw) || raw;
    const regexValue = composerDisplayBundle.selectionRequired
        ? (composerDisplayBundle.regexValue || "")
        : (directRegexValue || composerDisplayBundle.regexValue || "");
    return {
        mode: VERB_INPUT_MODE.composer,
        source: "composer",
        rawValue: raw,
        displayValue: regexValue,
        regexValue,
        parseValue: regexValue,
        entradaGrammarObject: composerDisplayBundle.entradaGrammarObject || null,
    };
}

function createEmptyEntradaUrlStateSnapshot() {
    const slots = {};
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        slots[slotKey] = {
            embed: "",
            stem: "",
            objectEmbed: "",
            serialType: "auto",
            templateSuffix: "",
            templateSurface: "",
            templateTiCausativeClass: "",
        };
    });
    return {
        version: ENTRADA_URL_SEGMENT_VERSION,
        input: "",
        board: COMPOSER_ENTRY_BOARD.general,
        transitivity: "",
        valenceIntransitive: "",
        valence: "",
        valenceSecondary: "",
        directionalPrefix: "",
        supportiveMarker: "",
        slots,
        ordinaryNnc: {
            enabled: false,
            state: "absolutive",
            number: "singular",
            pluralType: "auto",
            pers1: "",
            pers2: "",
            subjectKey: "3sg",
            possessor: "",
            nounClass: "",
            animacy: "",
        },
    };
}

function getEntradaUrlNestedValue(source = {}, path = []) {
    return path.reduce((current, key) => (
        current && typeof current === "object" ? current[key] : undefined
    ), source);
}

function setEntradaUrlNestedValue(target = {}, path = [], value = "") {
    if (!target || !Array.isArray(path) || !path.length) {
        return;
    }
    let cursor = target;
    path.slice(0, -1).forEach((key) => {
        if (!cursor[key] || typeof cursor[key] !== "object") {
            cursor[key] = {};
        }
        cursor = cursor[key];
    });
    cursor[path[path.length - 1]] = value;
}

function getEntradaUrlSegmentFieldKeys() {
    return ENTRADA_URL_SEGMENT_SCHEMA.map((entry) => entry.key);
}

function normalizeEntradaUrlBoard(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    if (normalized === "s" || normalized === "ordinary" || normalized === "ordinary-nnc") {
        return "ordinary-nnc";
    }
    if (normalized === "sv" || normalized === "s-v" || normalized === "noun-to-verb") {
        return COMPOSER_ENTRY_BOARD.nounToVerb;
    }
    return COMPOSER_ENTRY_BOARD.general;
}

function normalizeEntradaUrlBoolean(value = false) {
    if (value === true) {
        return true;
    }
    const normalized = String(value || "").trim().toLowerCase();
    return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function normalizeEntradaUrlTransitivity(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    if (normalized === "vi") {
        return COMPOSER_TRANSITIVITY.intransitive;
    }
    if (normalized === "vt") {
        return COMPOSER_TRANSITIVITY.transitive;
    }
    if (normalized === "vb") {
        return COMPOSER_TRANSITIVITY.bitransitive;
    }
    return COMPOSER_TRANSITIVITY_ORDER.includes(normalized) ? normalized : "";
}

function normalizeEntradaUrlSerialType(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    if (!normalized) {
        return "auto";
    }
    if (normalized === "auto") {
        return "auto";
    }
    return getComposerSerialTypeOptionByValue(normalized) ? normalized : "auto";
}

function normalizeEntradaUrlStateSnapshot(snapshot = null) {
    const source = snapshot && typeof snapshot === "object" ? snapshot : {};
    const next = createEmptyEntradaUrlStateSnapshot();
    const read = (path, fallback = "") => {
        const value = getEntradaUrlNestedValue(source, path);
        return value === undefined || value === null ? fallback : value;
    };
    next.input = serializeRegexInputValue(read(["input"], "")) || String(read(["input"], "") || "").trim();
    next.board = normalizeEntradaUrlBoard(read(["board"], ""));
    next.transitivity = normalizeEntradaUrlTransitivity(read(["transitivity"], ""));
    next.valenceIntransitive = normalizeComposerSecondaryValenceSurfaceToken(read(["valenceIntransitive"], ""));
    next.valence = normalizeComposerSecondaryValenceSurfaceToken(read(["valence"], ""));
    next.valenceSecondary = normalizeComposerValenceToken(read(["valenceSecondary"], ""));
    next.directionalPrefix = String(read(["directionalPrefix"], "") || "").trim().toLowerCase();
    next.supportiveMarker = normalizeSupportiveMarkerValue(read(["supportiveMarker"], ""));
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const slot = next.slots[slotKey];
        slot.embed = normalizeComposerEmbedValue(read(["slots", slotKey, "embed"], ""));
        slot.stem = normalizeComposerStem(read(["slots", slotKey, "stem"], ""));
        slot.objectEmbed = normalizeComposerEmbedValue(read(["slots", slotKey, "objectEmbed"], ""));
        slot.serialType = normalizeEntradaUrlSerialType(read(["slots", slotKey, "serialType"], "auto"));
        slot.templateSuffix = normalizeComposerStem(read(["slots", slotKey, "templateSuffix"], ""));
        slot.templateSurface = normalizeComposerStem(read(["slots", slotKey, "templateSurface"], ""));
        slot.templateTiCausativeClass = normalizeTiCausativeClass(read(["slots", slotKey, "templateTiCausativeClass"], ""));
    });
    const ordinarySource = source.ordinaryNnc && typeof source.ordinaryNnc === "object"
        ? source.ordinaryNnc
        : {};
    const ordinaryState = {
        ...next.ordinaryNnc,
        ...ordinarySource,
    };
    const ordinarySubject = typeof normalizeOrdinaryNncGenerationSubject === "function"
        ? normalizeOrdinaryNncGenerationSubject({
            subjectPrefix: ordinaryState.pers1,
            subjectSuffix: ordinaryState.pers2,
            subjectKey: ordinaryState.subjectKey,
        })
        : {
            subjectPrefix: String(ordinaryState.pers1 || ""),
            subjectSuffix: String(ordinaryState.pers2 || ""),
            subjectKey: String(ordinaryState.subjectKey || "3sg"),
        };
    next.ordinaryNnc.enabled = normalizeEntradaUrlBoolean(ordinaryState.enabled)
        || next.board === "ordinary-nnc";
    next.ordinaryNnc.state = typeof normalizeOrdinaryNncGenerationStateValue === "function"
        ? normalizeOrdinaryNncGenerationStateValue(ordinaryState.state)
        : (String(ordinaryState.state || "") === "possessive" ? "possessive" : "absolutive");
    next.ordinaryNnc.number = typeof normalizeOrdinaryNncGenerationNumber === "function"
        ? normalizeOrdinaryNncGenerationNumber(ordinaryState.number)
        : (String(ordinaryState.number || "") === "plural" ? "plural" : "singular");
    next.ordinaryNnc.pluralType = typeof normalizeOrdinaryNncGenerationPluralType === "function"
        ? normalizeOrdinaryNncGenerationPluralType(ordinaryState.pluralType)
        : (["count", "distributive"].includes(String(ordinaryState.pluralType || "")) ? ordinaryState.pluralType : "auto");
    next.ordinaryNnc.pers1 = ordinarySubject.subjectPrefix;
    next.ordinaryNnc.pers2 = ordinarySubject.subjectSuffix;
    next.ordinaryNnc.subjectKey = ordinarySubject.subjectKey;
    next.ordinaryNnc.possessor = typeof normalizeOrdinaryNncGenerationPossessor === "function"
        ? normalizeOrdinaryNncGenerationPossessor(ordinaryState.possessor, next.ordinaryNnc.state)
        : String(ordinaryState.possessor || "");
    next.ordinaryNnc.nounClass = typeof normalizeOrdinaryNncGenerationNounClass === "function"
        ? normalizeOrdinaryNncGenerationNounClass(ordinaryState.nounClass)
        : normalizeComposerOrdinaryNncNounClass(ordinaryState.nounClass);
    next.ordinaryNnc.animacy = typeof normalizeOrdinaryNncGenerationAnimacy === "function"
        ? normalizeOrdinaryNncGenerationAnimacy(ordinaryState.animacy)
        : (["animate", "inanimate"].includes(String(ordinaryState.animacy || "")) ? ordinaryState.animacy : "");
    const presentFields = Array.isArray(source.presentFields)
        ? source.presentFields.filter((field) => getEntradaUrlSegmentFieldKeys().includes(field))
        : null;
    if (presentFields) {
        Object.defineProperty(next, "presentFields", {
            configurable: true,
            enumerable: false,
            value: presentFields,
        });
    }
    return next;
}

function getCurrentEntradaUrlStateSnapshot() {
    const verbEl = typeof document !== "undefined" ? document.getElementById("verb") : null;
    const ordinaryState = typeof getOrdinaryNncGenerationState === "function"
        ? getOrdinaryNncGenerationState()
        : {};
    const ordinaryEnabled = typeof isOrdinaryNncGenerationModeEnabled === "function"
        && isOrdinaryNncGenerationModeEnabled();
    return normalizeEntradaUrlStateSnapshot({
        input: verbEl?.value || "",
        board: ordinaryEnabled ? "ordinary-nnc" : getComposerEntryBoard(),
        transitivity: VerbComposerState.transitivity || "",
        valenceIntransitive: VerbComposerState.valenceIntransitive || "",
        valence: VerbComposerState.valence || "",
        valenceSecondary: VerbComposerState.valenceSecondary || "",
        directionalPrefix: VerbComposerState.directionalPrefix || "",
        supportiveMarker: VerbComposerState.supportiveMarker || "",
        slots: COMPOSER_SLOT_KEYS.reduce((acc, slotKey) => {
            const stateKeys = getComposerSlotStateKeys(slotKey);
            acc[slotKey] = {
                embed: VerbComposerState[stateKeys.embed] || "",
                stem: VerbComposerState[stateKeys.stem] || "",
                objectEmbed: VerbComposerState[stateKeys.objectEmbed] || "",
                serialType: COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] || "auto",
                templateSuffix: COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] || "",
                templateSurface: COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] || "",
                templateTiCausativeClass: COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] || "",
            };
            return acc;
        }, {}),
        ordinaryNnc: {
            ...ordinaryState,
            enabled: ordinaryEnabled,
        },
    });
}

function shouldIncludeEntradaUrlSegmentField(snapshot = {}, field = {}) {
    const value = getEntradaUrlNestedValue(snapshot, field.path);
    const defaultValue = field.defaultValue ?? "";
    if (field.ordinaryNncOnly && snapshot?.ordinaryNnc?.enabled) {
        if (value === undefined || value === null) {
            return false;
        }
        if (String(value) === "" && String(defaultValue) === "") {
            return false;
        }
        return true;
    }
    if (field.key === "ordinaryNncEnabled") {
        return value === true;
    }
    if (field.key === "board") {
        return value && value !== COMPOSER_ENTRY_BOARD.general;
    }
    if (value === undefined || value === null) {
        return false;
    }
    return String(value) !== String(defaultValue);
}

function encodeEntradaUrlSegmentValue(value = "") {
    return encodeURIComponent(String(value ?? ""));
}

function decodeEntradaUrlSegmentValue(value = "") {
    try {
        return decodeURIComponent(String(value || ""));
    } catch (error) {
        return String(value || "");
    }
}

function buildEntradaUrlSegmentString(snapshot = null) {
    const normalized = normalizeEntradaUrlStateSnapshot(snapshot || getCurrentEntradaUrlStateSnapshot());
    const segments = [ENTRADA_URL_SEGMENT_PREFIX, ENTRADA_URL_SEGMENT_VERSION];
    ENTRADA_URL_SEGMENT_SCHEMA.forEach((field) => {
        if (!shouldIncludeEntradaUrlSegmentField(normalized, field)) {
            return;
        }
        const value = getEntradaUrlNestedValue(normalized, field.path);
        segments.push(field.segment, encodeEntradaUrlSegmentValue(
            typeof value === "boolean" ? (value ? "1" : "0") : value
        ));
    });
    return segments.length > 2 ? segments.join("/") : "";
}

function parseEntradaUrlSegmentString(value = "") {
    const rawSource = String(value || "").trim();
    if (!rawSource) {
        return null;
    }
    const hashStart = rawSource.indexOf("#");
    const rawHash = hashStart >= 0 ? rawSource.slice(hashStart + 1) : rawSource.replace(/^#/, "");
    const rawSegments = rawHash.split("/").filter((segment) => segment !== "");
    if (!rawSegments.length || rawSegments[0] !== ENTRADA_URL_SEGMENT_PREFIX) {
        return null;
    }
    let index = 1;
    if (rawSegments[index] === ENTRADA_URL_SEGMENT_VERSION) {
        index += 1;
    }
    const snapshot = createEmptyEntradaUrlStateSnapshot();
    const presentFields = [];
    for (; index < rawSegments.length; index += 2) {
        const segmentKey = rawSegments[index];
        const field = ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT[segmentKey];
        if (!field) {
            continue;
        }
        const valueSegment = rawSegments[index + 1] ?? "";
        const decodedValue = decodeEntradaUrlSegmentValue(valueSegment);
        const normalizedValue = field.type === "boolean"
            ? normalizeEntradaUrlBoolean(decodedValue)
            : decodedValue;
        setEntradaUrlNestedValue(snapshot, field.path, normalizedValue);
        presentFields.push(field.key);
    }
    snapshot.presentFields = presentFields;
    return normalizeEntradaUrlStateSnapshot(snapshot);
}

function buildEntradaUrlHash(snapshot = null) {
    const segmentString = buildEntradaUrlSegmentString(snapshot);
    return segmentString ? `#${segmentString}` : "";
}

function readEntradaUrlStateSnapshotFromLocation(locationLike = null) {
    const sourceLocation = locationLike || (typeof window !== "undefined" ? window.location : null);
    if (!sourceLocation) {
        return null;
    }
    return parseEntradaUrlSegmentString(sourceLocation.hash || "");
}

function hasEntradaUrlExplicitField(snapshot = {}, fieldKey = "") {
    const presentFields = Array.isArray(snapshot?.presentFields) ? snapshot.presentFields : null;
    return !presentFields || presentFields.includes(fieldKey);
}

function assignEntradaUrlComposerField(snapshot = {}, fieldKey = "", assign = () => {}) {
    if (!hasEntradaUrlExplicitField(snapshot, fieldKey)) {
        return;
    }
    assign();
}

function applyEntradaUrlStateSnapshot(snapshot = null, options = {}) {
    if (!snapshot || typeof snapshot !== "object") {
        return false;
    }
    const normalized = normalizeEntradaUrlStateSnapshot(snapshot);
    const triggerGenerate = options.triggerGenerate !== false;
    const immediateRefresh = options.immediateRefresh === true;
    const verbEl = typeof document !== "undefined" ? document.getElementById("verb") : null;
    IsApplyingEntradaUrlSegments = true;
    try {
        if (verbEl && hasEntradaUrlExplicitField(normalized, "input")) {
            verbEl.value = normalized.input;
            verbEl.dataset.prevValue = normalized.input;
        }
        if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
            const ordinaryRequested = normalized.board === "ordinary-nnc"
                || normalized.ordinaryNnc.enabled === true;
            setOrdinaryNncGenerationModeEnabled(ordinaryRequested, normalized.ordinaryNnc);
            if (ordinaryRequested && typeof setActiveNawatTenseMode === "function" && TENSE_MODE?.sustantivo) {
                setActiveNawatTenseMode(TENSE_MODE.sustantivo);
            }
        }
        VerbComposerState.mode = VERB_INPUT_MODE.composer;
        VerbComposerState.entryBoard = normalized.board === COMPOSER_ENTRY_BOARD.nounToVerb
            ? COMPOSER_ENTRY_BOARD.nounToVerb
            : COMPOSER_ENTRY_BOARD.general;
        if (verbEl && normalized.input) {
            syncComposerStateFromVerbInput(normalized.input);
            VerbComposerState.entryBoard = normalized.board === COMPOSER_ENTRY_BOARD.nounToVerb
                ? COMPOSER_ENTRY_BOARD.nounToVerb
                : COMPOSER_ENTRY_BOARD.general;
        }
        assignEntradaUrlComposerField(normalized, "transitivity", () => {
            VerbComposerState.transitivity = normalized.transitivity;
        });
        assignEntradaUrlComposerField(normalized, "valenceIntransitive", () => {
            VerbComposerState.valenceIntransitive = normalized.valenceIntransitive;
        });
        assignEntradaUrlComposerField(normalized, "valence", () => {
            VerbComposerState.valence = normalized.valence;
        });
        assignEntradaUrlComposerField(normalized, "valenceSecondary", () => {
            VerbComposerState.valenceSecondary = normalized.valenceSecondary;
        });
        assignEntradaUrlComposerField(normalized, "directionalPrefix", () => {
            VerbComposerState.directionalPrefix = normalized.directionalPrefix;
        });
        assignEntradaUrlComposerField(normalized, "supportiveMarker", () => {
            VerbComposerState.supportiveMarker = normalized.supportiveMarker;
        });
        COMPOSER_SLOT_KEYS.forEach((slotKey) => {
            const upperSlot = slotKey.toUpperCase();
            const stateKeys = getComposerSlotStateKeys(slotKey);
            assignEntradaUrlComposerField(normalized, `slot${upperSlot}Embed`, () => {
                VerbComposerState[stateKeys.embed] = normalized.slots[slotKey].embed;
            });
            assignEntradaUrlComposerField(normalized, `slot${upperSlot}Stem`, () => {
                VerbComposerState[stateKeys.stem] = normalized.slots[slotKey].stem;
            });
            assignEntradaUrlComposerField(normalized, `slot${upperSlot}ObjectEmbed`, () => {
                VerbComposerState[stateKeys.objectEmbed] = normalized.slots[slotKey].objectEmbed;
            });
            assignEntradaUrlComposerField(normalized, `slot${upperSlot}SerialType`, () => {
                COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = normalized.slots[slotKey].serialType;
            });
            assignEntradaUrlComposerField(normalized, `slot${upperSlot}TemplateSuffix`, () => {
                COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = normalized.slots[slotKey].templateSuffix;
            });
            assignEntradaUrlComposerField(normalized, `slot${upperSlot}TemplateSurface`, () => {
                COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = normalized.slots[slotKey].templateSurface;
            });
            assignEntradaUrlComposerField(normalized, `slot${upperSlot}TemplateTiCausativeClass`, () => {
                COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = normalized.slots[slotKey].templateTiCausativeClass;
            });
        });
        syncComposerActiveStemAndEmbedFromState();
        VerbComposerState.syllableMode = getComposerStemSyllableCount(getComposerActiveStemValue()) === 1
            ? COMPOSER_SYLLABLE_MODE.monosyllable
            : COMPOSER_SYLLABLE_MODE.multisyllable;
        renderVerbComposerFromState();
        applyComposerStateToVerbInput({
            triggerGenerate,
            immediateRefresh,
        });
        if (!triggerGenerate && verbEl && normalized.input && !verbEl.value) {
            verbEl.value = normalized.input;
            verbEl.dataset.prevValue = normalized.input;
        }
    } finally {
        IsApplyingEntradaUrlSegments = false;
    }
    if (options.syncUrl === true) {
        syncEntradaUrlSegmentsFromCurrentState({ replace: true });
    }
    return true;
}

function applyEntradaUrlSegmentsFromLocation(options = {}) {
    const snapshot = readEntradaUrlStateSnapshotFromLocation(options.location || null);
    if (!snapshot) {
        return false;
    }
    return applyEntradaUrlStateSnapshot(snapshot, options);
}

function syncEntradaUrlSegmentsFromCurrentState(options = {}) {
    if (IsApplyingEntradaUrlSegments || typeof window === "undefined") {
        return "";
    }
    const locationObject = options.location || window.location;
    const historyObject = options.history || window.history;
    if (!locationObject) {
        return "";
    }
    const nextHash = buildEntradaUrlHash();
    const currentHash = String(locationObject.hash || "");
    if (!nextHash && !currentHash.startsWith(`#${ENTRADA_URL_SEGMENT_PREFIX}`)) {
        return "";
    }
    if (currentHash === nextHash) {
        return nextHash;
    }
    const nextUrl = `${locationObject.pathname || ""}${locationObject.search || ""}${nextHash}`;
    if (options.replace !== false && historyObject && typeof historyObject.replaceState === "function") {
        historyObject.replaceState(null, "", nextUrl || nextHash || locationObject.pathname || "");
    } else {
        locationObject.hash = nextHash;
    }
    return nextHash;
}

function queueEntradaUrlSegmentSync() {
    if (IsApplyingEntradaUrlSegments || typeof window === "undefined") {
        return;
    }
    if (EntradaUrlSegmentSyncTimer) {
        window.clearTimeout(EntradaUrlSegmentSyncTimer);
    }
    EntradaUrlSegmentSyncTimer = window.setTimeout(() => {
        EntradaUrlSegmentSyncTimer = null;
        syncEntradaUrlSegmentsFromCurrentState({ replace: true });
    }, 0);
}

function isEntradaUrlSyncEventTarget(target = null) {
    if (!target || typeof target.closest !== "function") {
        return false;
    }
    return Boolean(target.closest("#container-inputs"));
}

function initEntradaUrlSegments() {
    if (typeof document === "undefined" || typeof window === "undefined") {
        return false;
    }
    if (EntradaUrlSegmentsInitialized) {
        return true;
    }
    EntradaUrlSegmentsInitialized = true;
    applyEntradaUrlSegmentsFromLocation({
        triggerGenerate: false,
        immediateRefresh: false,
    });
    const handleEntradaMutation = (event) => {
        if (isEntradaUrlSyncEventTarget(event?.target || null)) {
            queueEntradaUrlSegmentSync();
        }
    };
    document.addEventListener("input", handleEntradaMutation);
    document.addEventListener("change", handleEntradaMutation);
    document.addEventListener("click", handleEntradaMutation);
    window.addEventListener("hashchange", () => {
        applyEntradaUrlSegmentsFromLocation({
            triggerGenerate: true,
            immediateRefresh: true,
        });
    });
    queueEntradaUrlSegmentSync();
    return true;
}

function resolveComposerDirectionalPrefixFromBase(baseValue = "") {
    const base = String(baseValue || "").toLowerCase();
    if (!base) {
        return "";
    }
    const tokens = base
        .split(/[-/]/)
        .map((token) => String(token || "").trim().toLowerCase().replace(/^-+/, ""))
        .filter(Boolean);
    for (let index = 0; index < tokens.length; index += 1) {
        const bracketDirectional = getBracketDirectionalPrefixToken(tokens[index]);
        if (bracketDirectional) {
            return bracketDirectional;
        }
    }
    return "";
}

function resolveComposerValenceSequenceFromParsed(parsed, baseValue) {
    if (!parsed) {
        return [];
    }
    if (parsed.hasImpersonalTaPrefix) {
        return ["ta"];
    }
    const normalizeValenceToken = (value) => String(value || "").trim();
    const inOptions = (value) => {
        const token = normalizeValenceToken(value);
        return Boolean(getComposerValenceFamilyToken(token));
    };
    const sequence = [];
    const addToken = (value) => {
        const token = normalizeValenceToken(value);
        if (inOptions(token)) {
            sequence.push(token);
        }
    };
    // Parser-first: reverberate parsed structure into composer selections.
    addToken(parsed.indirectObjectMarker);
    addToken(parsed.directObjectToken);
    const fusionPrefixes = Array.isArray(parsed.fusionPrefixes) ? parsed.fusionPrefixes : [];
    for (let index = 0; index < fusionPrefixes.length; index += 1) {
        addToken(fusionPrefixes[index]);
    }
    if (sequence.length) {
        return sequence;
    }
    const valenceSlots = Array.isArray(parsed.valenceSlots) ? parsed.valenceSlots : [];
    for (let index = 0; index < valenceSlots.length; index += 1) {
        addToken(valenceSlots[index]);
    }
    if (sequence.length) {
        return sequence;
    }
    // Fallback for partial developer typing only when separators are structurally valid.
    if (getInvalidVerbStructure(baseValue, { allowPartial: true, expectRegexEnvelope: false })) {
        return sequence;
    }
    const base = String(baseValue || "");
    const matches = base.matchAll(/(?:^|[-/])\(([^)]+)\)(?=-|\/)/g);
    for (const match of matches) {
        addToken(normalizeExplicitValenceToken(match[1]));
    }
    return sequence;
}

function resolveComposerValenceEmbedStateFromBase(baseValue, resolvedValences = [], resolvedDirectional = "") {
    const result = {
        primary: "",
        secondary: "",
        global: "",
    };
    if (getInvalidVerbStructure(baseValue, { allowPartial: true, expectRegexEnvelope: false })) {
        return result;
    }
    const rawParts = String(baseValue || "")
        .split(/[-/]/)
        .map((part) => String(part || "").trim().toLowerCase().replace(/^-+/, ""))
        .filter(Boolean);
    const normalizedParts = rawParts.map((part) => normalizeComposerStem(part));
    if (normalizedParts.length < 2) {
        return result;
    }
    const directionalToken = normalizeComposerStem(resolvedDirectional);
    const isDirectionalPartAtIndex = (index) => {
        const rawToken = rawParts[index] || "";
        return Boolean(getBracketDirectionalPrefixToken(rawToken));
    };
    let startIndex = 0;
    if (directionalToken && normalizedParts[0] === directionalToken) {
        startIndex = 1;
    } else if (isDirectionalPartAtIndex(0)) {
        startIndex = 1;
    }
    const nonStemParts = normalizedParts.slice(startIndex, -1);
    const nonStemRawParts = rawParts.slice(startIndex, -1);
    if (!nonStemParts.length) {
        return result;
    }
    const isValenceToken = (token) => (
        Boolean(token)
        && Boolean(getComposerValenceFamilyToken(token))
        && token !== ""
    );
    const expectedValenceCount = (Array.isArray(resolvedValences) ? resolvedValences : [resolvedValences])
        .map((token) => normalizeComposerStem(token))
        .filter((token) => isValenceToken(token))
        .length;
    const consumedEmbedIndexes = new Set();
    const valenceEmbeds = [];
    if (expectedValenceCount > 0) {
        for (let index = 0; index < nonStemParts.length; index += 1) {
            const token = nonStemParts[index];
            if (!isValenceToken(token)) {
                continue;
            }
            let embedToken = "";
            const prevIndex = index - 1;
            if (prevIndex >= 0 && !consumedEmbedIndexes.has(prevIndex)) {
                const previous = nonStemParts[prevIndex];
                const previousRaw = nonStemRawParts[prevIndex] || "";
                const previousIsDirectional = previous === directionalToken
                    || Boolean(getBracketDirectionalPrefixToken(previousRaw));
                if (
                    previous
                    && !isValenceToken(previous)
                    && !previousIsDirectional
                    && !OBJECT_MARKERS.has(previous)
                ) {
                    embedToken = previous;
                    consumedEmbedIndexes.add(prevIndex);
                }
            }
            valenceEmbeds.push(embedToken);
        }
    }
    const mappedEmbeds = expectedValenceCount > 0
        ? valenceEmbeds.slice(0, expectedValenceCount)
        : [];
    result.primary = mappedEmbeds[0] || "";
    result.secondary = mappedEmbeds[1] || "";
    const globalTokens = [];
    for (let index = 0; index < nonStemParts.length; index += 1) {
        const token = nonStemParts[index];
        const rawToken = nonStemRawParts[index] || "";
        if (!token || consumedEmbedIndexes.has(index) || isValenceToken(token)) {
            continue;
        }
        if (token === directionalToken || Boolean(getBracketDirectionalPrefixToken(rawToken))) {
            continue;
        }
        if (OBJECT_MARKERS.has(token)) {
            continue;
        }
        globalTokens.push(token);
    }
    result.global = normalizeComposerEmbedValue(globalTokens);
    return result;
}

function resolveComposerNoPrefixValenceEmbedsFromBase(baseValue, resolvedDirectional = "") {
    if (getInvalidVerbStructure(baseValue, { allowPartial: true, expectRegexEnvelope: false })) {
        return [];
    }
    const raw = String(baseValue || "");
    const lastDashIndex = raw.lastIndexOf("-");
    if (lastDashIndex <= 0) {
        return [];
    }
    const directionalToken = normalizeComposerStem(resolvedDirectional);
    const prefixChunk = raw.slice(0, lastDashIndex);
    return prefixChunk
        .split(/[-/]/)
        .map((part) => String(part || "").trim().toLowerCase().replace(/^-+/, ""))
        .filter(Boolean)
        .map((rawToken) => ({ rawToken, token: normalizeComposerStem(rawToken) }))
        .filter(({ token }) => Boolean(token))
        .filter(({ rawToken, token }) => {
            if (!token) {
                return false;
            }
            if (token === directionalToken || Boolean(getBracketDirectionalPrefixToken(rawToken))) {
                return false;
            }
            if (getComposerValenceFamilyToken(token)) {
                return false;
            }
            if (OBJECT_MARKERS.has(token)) {
                return false;
            }
            return true;
        })
        .map(({ token }) => token);
}

function resolveComposerEmbedFromParsed(parsed, resolvedValences = [], resolvedDirectional = "", baseValue = "") {
    if (!parsed) {
        return "";
    }
    const normalizeToken = (value) => normalizeComposerStem(value);
    const directionalToken = normalizeToken(resolvedDirectional);
    const valenceTokenSet = new Set(
        (Array.isArray(resolvedValences) ? resolvedValences : [resolvedValences])
            .map((token) => normalizeToken(token))
            .filter(Boolean)
    );
    const embedded = [];
    const addTokens = (tokens) => {
        tokens.forEach((token) => {
            const rawToken = String(token || "").trim().toLowerCase();
            const normalized = normalizeToken(rawToken);
            if (!normalized) {
                return;
            }
            if (normalized === directionalToken || Boolean(getBracketDirectionalPrefixToken(rawToken))) {
                return;
            }
            if (valenceTokenSet.has(normalized) || getComposerValenceFamilyToken(normalized)) {
                return;
            }
            if (OBJECT_MARKERS.has(normalized)) {
                return;
            }
            embedded.push(normalized);
        });
    };
    const boundPrefixes = Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [];
    const boundExplicitFlags = Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [];
    const fusionPrefixes = Array.isArray(parsed.fusionPrefixes) ? parsed.fusionPrefixes : [];
    const lexicalBoundPrefixes = Array.isArray(parsed.lexicalBoundPrefixes)
        ? parsed.lexicalBoundPrefixes
        : (
            Array.isArray(parsed.canonical?.lexicalBoundPrefixes)
                ? parsed.canonical.lexicalBoundPrefixes
                : getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags)
        );
    if (lexicalBoundPrefixes.length) {
        addTokens(lexicalBoundPrefixes);
    } else if (boundPrefixes.length) {
        addTokens(boundPrefixes);
    } else if (fusionPrefixes.length) {
        addTokens(fusionPrefixes);
    }
    return normalizeComposerEmbedValue(embedded);
}

function parseComposerStateFromRegexValue(rawValue) {
    const movingTargetParsed = parseMovingTargetRegexInput(rawValue);
    if (movingTargetParsed.isValid) {
        return buildComposerStateFromMovingTargetParsed(movingTargetParsed, rawValue);
    }
    return createEmptyComposerRegexState(rawValue);
}

function renderVerbComposerFromState() {
    const {
        tutorialTrigger,
        panel,
        entryBoardTabsHost,
        entryBoardButtons,
        ordinaryNncModeButtons,
        slots,
        transitivitySelect,
        valenceSelectIntransitive,
        valenceSelect,
        valenceSelectSecondary,
        directionalSelect,
        clearTextboxesButton,
        supportiveICheckbox,
    } = getVerbComposerElements();
    const isComposer = isVerbInputModeComposer();
    const activeBoard = getComposerEntryBoard();
    const ordinaryNncActive = typeof isOrdinaryNncGenerationModeEnabled === "function"
        && isOrdinaryNncGenerationModeEnabled();
    const verbInput = document.getElementById("verb");
    const verbMirror = getVerbMirror();
    const verbMirrorContent = getVerbMirrorContent();
    document.body.classList.toggle("is-composer-input-mode", isComposer);
    if (verbInput) {
        verbInput.readOnly = false;
        verbInput.setAttribute("aria-readonly", "false");
        verbInput.tabIndex = 0;
    }
    if (verbMirror) {
        verbMirror.setAttribute("aria-hidden", "true");
    }
    if (verbMirrorContent) {
        verbMirrorContent.setAttribute("contenteditable", "false");
        verbMirrorContent.tabIndex = -1;
        verbMirrorContent.setAttribute("aria-hidden", "true");
        verbMirrorContent.setAttribute("aria-readonly", "true");
    }
    updateVerbInputPlaceholder();
    if (panel) {
        panel.classList.toggle("is-hidden", !isComposer);
        panel.setAttribute("aria-hidden", String(!isComposer));
        panel.inert = !isComposer;
        panel.dataset.entryBoard = ordinaryNncActive ? "ordinary-nnc" : activeBoard;
    }
    if (entryBoardTabsHost) {
        entryBoardTabsHost.hidden = false;
        entryBoardTabsHost.setAttribute("aria-hidden", "false");
    }
    const placeholder = document.getElementById("verb-composer-placeholder");
    if (placeholder) {
        placeholder.hidden = isComposer;
        placeholder.setAttribute("aria-hidden", String(isComposer));
    }
    updateCalcInputModeButtons();
    if (tutorialTrigger) {
        const showTutorialTrigger = true;
        tutorialTrigger.hidden = !showTutorialTrigger;
        tutorialTrigger.setAttribute("aria-hidden", String(!showTutorialTrigger));
    }
    if (clearTextboxesButton) {
        clearTextboxesButton.disabled = !isComposer;
        clearTextboxesButton.setAttribute("aria-disabled", String(!isComposer));
    }
    Array.from(entryBoardButtons || []).forEach((button) => {
        const board = normalizeComposerEntryBoard(button.getAttribute("data-composer-entry-board") || "");
        const isActive = isComposer && !ordinaryNncActive && board === activeBoard;
        button.dataset.sourceTargetPerception = "clause-type-source-route-options";
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        button.tabIndex = 0;
    });
    Array.from(ordinaryNncModeButtons || []).forEach((button) => {
        const isActive = isComposer && ordinaryNncActive;
        button.dataset.sourceTargetPerception = "clause-type-source-route-options";
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        if (button.getAttribute("role") === "tab") {
            button.setAttribute("aria-selected", String(isActive));
        } else {
            button.removeAttribute("aria-selected");
        }
        button.tabIndex = 0;
    });
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const slotRefs = slots[slotKey] || {};
        const stateKeys = getComposerSlotStateKeys(slotKey);
        if (slotRefs.embedInput) {
            slotRefs.embedInput.value = normalizeComposerEmbedValue(VerbComposerState[stateKeys.embed] || "");
        }
        if (slotRefs.stemInput) {
            const rawStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
            const matrixInputRow = slotRefs.stemInput.closest(".verb-composer__matrix-input-row");
            const matrixInputTag = matrixInputRow
                ? matrixInputRow.querySelector(".verb-composer__tagged-input-tag")
                : null;
            const matrixLabel = slotRefs.matrixField
                ? slotRefs.matrixField.querySelector(".verb-composer__matrix-head > .verb-composer__sub-label")
                : null;
            if (matrixLabel) {
                matrixLabel.textContent = getComposerMatrixFieldLabel({ ordinaryNncActive, activeBoard });
            }
            if (matrixInputTag) {
                matrixInputTag.textContent = getComposerMatrixInputTagLabel({ ordinaryNncActive, activeBoard });
            }
            slotRefs.stemInput.placeholder = "";
            slotRefs.stemInput.value = formatComposerStemForInputDisplay(rawStem, {
                slotKey,
                preferSplitFromStem: true,
                templateSuffix: getComposerStemInputTemplateSuffix(slotRefs.stemInput, slotKey),
                surfaceValue: COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] || "",
            });
        }
        if (slotRefs.objectInput) {
            slotRefs.objectInput.value = normalizeComposerEmbedValue(
                VerbComposerState[stateKeys.objectEmbed] || ""
            );
        }
    });
    if (transitivitySelect) {
        transitivitySelect.value = isComposerTransitivitySelected() ? VerbComposerState.transitivity : "";
    }
    if (valenceSelectIntransitive) {
        valenceSelectIntransitive.value = VerbComposerState.valenceIntransitive;
    }
    if (valenceSelect) {
        valenceSelect.value = VerbComposerState.valence;
    }
    if (valenceSelectSecondary) {
        valenceSelectSecondary.value = VerbComposerState.valenceSecondary;
    }
    if (directionalSelect) {
        directionalSelect.value = VerbComposerState.directionalPrefix;
    }
    syncComposerSupportiveMarkerFromState();
    if (supportiveICheckbox) {
        supportiveICheckbox.checked = hasSupportiveMarkerValue(getComposerSupportiveMarker());
    }
    syncComposerEmbedUiFromState();
    syncComposerActiveStemAndEmbedFromState();
    syncComposerSupportiveIAvailability();
    syncComposerValenceAvailability();
    syncComposerChipGroupsFromState();
    syncComposerMatrixStemAffixSelects();
    syncComposerMatrixSerialUi();
    syncComposerSerialTypeChips();
    syncComposerSlotEntryButtons();
    renderComposerOrdinaryNncDigitalControls();
    syncComposerSupportiveITogglePlacement();
    updateVerbComposerHint();
    syncVerbScreenCalculatorState();
    updateCalcSummaryAndStatus();
}

function syncComposerStateFromVerbInput(rawValue = "") {
    const baseValue = String(getSearchInputBase(rawValue || "") || "").toLowerCase().trim();
    const ordinaryNncActive = typeof isOrdinaryNncGenerationModeEnabled === "function"
        && isOrdinaryNncGenerationModeEnabled();
    if (ordinaryNncActive) {
        const parsedNnc = parseComposerOrdinaryNncAnalogueInput(rawValue);
        const uiState = typeof getOrdinaryNncGenerationState === "function"
            ? getOrdinaryNncGenerationState()
            : {};
        const nounClass = normalizeComposerOrdinaryNncNounClass(parsedNnc?.nounClass || uiState.nounClass || "");
        const stem = stripComposerOrdinaryNncConnectorFromStem(
            parsedNnc?.stem || normalizeComposerStem(baseValue.replace(/[()]/g, "")),
            nounClass
        );
        VerbComposerState.transitivity = "";
        VerbComposerState.valenceIntransitive = "";
        VerbComposerState.valenceIntransitiveEmbed = "";
        VerbComposerState.valence = "";
        VerbComposerState.valenceEmbedPrimary = "";
        VerbComposerState.valenceSecondary = "";
        VerbComposerState.valenceEmbedSecondary = "";
        VerbComposerState.slotAEmbed = "";
        VerbComposerState.slotAStem = stem;
        VerbComposerState.slotBEmbed = "";
        VerbComposerState.slotBStem = "";
        VerbComposerState.slotCEmbed = "";
        VerbComposerState.slotCStem = "";
        VerbComposerState.directionalPrefix = "";
        VerbComposerState.embedPrefix = "";
        VerbComposerState.supportiveMarker = "";
        VerbComposerState.syllableMode = getComposerStemSyllableCount(stem) === 1
            ? COMPOSER_SYLLABLE_MODE.monosyllable
            : COMPOSER_SYLLABLE_MODE.multisyllable;
        VerbComposerState.sourceBase = stem;
        VerbComposerState.stemManualOverride = true;
        if (typeof setOrdinaryNncGenerationState === "function") {
            setOrdinaryNncGenerationState({ nounClass });
        }
        return;
    }
    if (!baseValue) {
        VerbComposerState.sourceBase = "";
        VerbComposerState.stemManualOverride = false;
        return;
    }
    const next = parseComposerStateFromRegexValue(rawValue);
    const nextTiCausativeClass = normalizeTiCausativeClass(
        getRawInputTiCausativeMetadata(rawValue).tiCausativeClass || ""
    );
    VerbComposerState.transitivity = next.transitivity;
    VerbComposerState.valenceIntransitive = next.valenceIntransitive;
    VerbComposerState.valenceIntransitiveEmbed = next.valenceIntransitiveEmbed;
    VerbComposerState.valence = next.valence;
    VerbComposerState.valenceEmbedPrimary = next.valenceEmbedPrimary;
    VerbComposerState.valenceSecondary = next.valenceSecondary;
    VerbComposerState.valenceEmbedSecondary = next.valenceEmbedSecondary;
    VerbComposerState.slotAEmbed = next.slotAEmbed;
    VerbComposerState.slotAStem = next.slotAStem;
    VerbComposerState.slotBEmbed = next.slotBEmbed;
    VerbComposerState.slotBStem = next.slotBStem;
    VerbComposerState.slotCEmbed = next.slotCEmbed;
    VerbComposerState.slotCStem = next.slotCStem;
    VerbComposerState.directionalPrefix = next.directionalPrefix;
    VerbComposerState.embedPrefix = next.embedPrefix;
    VerbComposerState.supportiveMarker = normalizeSupportiveMarkerValue(next.supportiveMarker || "");
    VerbComposerState.syllableMode = next.syllableMode;
    const activeSlot = next.transitivity === COMPOSER_TRANSITIVITY.bitransitive
        ? "c"
        : (next.transitivity === COMPOSER_TRANSITIVITY.transitive ? "b" : "a");
    const activeStem = activeSlot === "c"
        ? next.slotCStem
        : (activeSlot === "b" ? next.slotBStem : next.slotAStem);
    const normalizedActiveStem = normalizeComposerStem(activeStem || "");
    if (getComposerEntryBoard() === COMPOSER_ENTRY_BOARD.nounToVerb) {
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[activeSlot] = nextTiCausativeClass;
    } else if (/ti$/i.test(normalizedActiveStem)) {
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[activeSlot] = nextTiCausativeClass === "become"
            ? "ti-become"
            : (nextTiCausativeClass === "have" ? "ti-have" : "auto");
    }
    const isPlainSource = /^[a-z]+$/.test(baseValue);
    if (isPlainSource) {
        VerbComposerState.sourceBase = normalizeComposerStem(baseValue);
        VerbComposerState.stemManualOverride = false;
    }
}

function applyComposerStateToVerbInput(options = {}) {
    const triggerGenerate = options.triggerGenerate !== false;
    const immediateRefresh = options.immediateRefresh === true;
    const verbEl = document.getElementById("verb");
    if (!verbEl) {
        return;
    }
    const composerDisplayBundle = buildComposerModeBundle(
        VerbComposerState,
        verbEl.value || ""
    );
    const nextBase = isVerbInputModeComposer()
        ? composerDisplayBundle.regexValue
        : composerDisplayBundle.regexValue;
    VerbComposerState.isApplying = true;
    try {
        verbEl.value = nextBase;
        if (triggerGenerate) {
            verbEl.dispatchEvent(new Event("input", { bubbles: true }));
            if (immediateRefresh) {
                scheduleVerbInputRefresh(verbEl.value, { immediate: true, source: "immediate" });
            }
        }
    } finally {
        VerbComposerState.isApplying = false;
    }
}

function clearAdjectivalNncFunctionEntryState(verbEl = document.getElementById("verb")) {
    if (!verbEl?.dataset) {
        return;
    }
    delete verbEl.dataset.adjectivalNncFunctionSurface;
    delete verbEl.dataset.adjectivalNncFormation;
    delete verbEl.dataset.adjectivalNncFormulaEcho;
    delete verbEl.dataset.patientivoSource;
    delete verbEl.dataset.nominalizedVncKind;
    delete verbEl.dataset.adjectivalNncSourceSelectedVariantId;
    delete verbEl.dataset.adjectivalNncTargetSelectedVariantId;
    delete verbEl.dataset.adjectivalNncSourceFormulaRealizationRecordId;
    delete verbEl.dataset.adjectivalNncTargetFormulaRealizationRecordId;
    delete verbEl.dataset.adjectivalNncFunctionContract;
    delete verbEl.dataset.grammarAuthorityRef;
    delete verbEl.dataset.grammarEvidenceStatus;
    delete verbEl.dataset.grammarUnitKind;
    delete verbEl.dataset.grammarRouteFamily;
    delete verbEl.dataset.grammarRouteStage;
    delete verbEl.dataset.grammarGenerationAllowed;
    delete verbEl.dataset.grammarDiagnosticStatus;
    delete verbEl.dataset.grammarResultOk;
    try {
        delete verbEl.__adjectivalNncFunctionEntryContract;
    } catch (_error) {
        verbEl.__adjectivalNncFunctionEntryContract = null;
    }
}

function getAdjectivalNncFunctionEntryGrammarFrame(frameLike = null) {
    if (!frameLike || typeof frameLike !== "object") {
        return null;
    }
    return frameLike.grammarFrame
        || frameLike.frames
        || (
            frameLike.authorityFrame
            || frameLike.routeContract
            || frameLike.resultFrame
            || frameLike.diagnosticFrame
                ? frameLike
                : null
        );
}

function normalizeAdjectivalNncFunctionEntrySurfaceValue(value = "") {
    const text = String(value || "").trim();
    return text === "—" ? "" : text;
}

function splitAdjectivalNncFunctionEntrySurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeAdjectivalNncFunctionEntrySurfaceValue(entry))
        .filter(Boolean);
}

function getAdjectivalNncFunctionEntryCanonicalSurfaceForms(resultFrame = null) {
    if (!resultFrame || typeof resultFrame !== "object") {
        return [];
    }
    const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length
        ? resultFrame.formulaRealizationRecords
        : (resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : []);
    return records
        .filter((record) => record && typeof record === "object" && record.kind === "grammar-formula-realization-record")
        .flatMap((record) => [
            ...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []),
            record.surface || "",
        ])
        .map((entry) => normalizeAdjectivalNncFunctionEntrySurfaceValue(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function isStructuredAdjectivalNncFunctionEntryFrameSurface(value = "") {
    const text = normalizeAdjectivalNncFunctionEntrySurfaceValue(value);
    return Boolean(text) && !/[\/,\n\r]/u.test(text);
}

function getStructuredAdjectivalNncFunctionEntryFrameSurfaceForms(resultFrame = null) {
    if (!resultFrame || typeof resultFrame !== "object") {
        return [];
    }
    const forms = [];
    if (Array.isArray(resultFrame.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame.surface) {
        forms.push(resultFrame.surface);
    }
    return forms
        .map((entry) => normalizeAdjectivalNncFunctionEntrySurfaceValue(entry))
        .filter((entry) => isStructuredAdjectivalNncFunctionEntryFrameSurface(entry))
        .filter((entry, index, list) => list.indexOf(entry) === index);
}

function getAdjectivalNncFunctionEntrySurfaceForms({
    surface = "",
    grammarFrame = null,
} = {}) {
    const frame = getAdjectivalNncFunctionEntryGrammarFrame(grammarFrame);
    const resultFrame = frame?.resultFrame && typeof frame.resultFrame === "object"
        ? frame.resultFrame
        : null;
    const hasResultFrame = Boolean(resultFrame);
    const canonicalForms = getAdjectivalNncFunctionEntryCanonicalSurfaceForms(resultFrame);
    if (canonicalForms.length) {
        return canonicalForms;
    }
    if (hasResultFrame) {
        return getStructuredAdjectivalNncFunctionEntryFrameSurfaceForms(resultFrame);
    }
    const forms = [];
    if (!hasResultFrame && surface) {
        forms.push(surface);
    }
    return forms
        .flatMap((entry) => splitAdjectivalNncFunctionEntrySurfaceText(entry))
        .filter((entry, index, list) => entry && list.indexOf(entry) === index);
}

function getAdjectivalNncFunctionEntrySurface({
    surface = "",
    grammarFrame = null,
} = {}) {
    return getAdjectivalNncFunctionEntrySurfaceForms({ surface, grammarFrame })[0] || "";
}

function getAdjectivalNncFunctionEntryCanonicalFormulaRecords(resultFrame = null) {
    if (!resultFrame || typeof resultFrame !== "object") {
        return [];
    }
    const records = Array.isArray(resultFrame.formulaRecords) && resultFrame.formulaRecords.length
        ? resultFrame.formulaRecords
        : (resultFrame.formulaRecord ? [resultFrame.formulaRecord] : []);
    return records.filter((record) => record && typeof record === "object" && record.kind === "grammar-formula-record");
}

function getAdjectivalNncFunctionEntryCanonicalRealizationRecords(resultFrame = null) {
    if (!resultFrame || typeof resultFrame !== "object") {
        return [];
    }
    const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length
        ? resultFrame.formulaRealizationRecords
        : (resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : []);
    return records.filter((record) => (
        record
        && typeof record === "object"
        && record.kind === "grammar-formula-realization-record"
    ));
}

function isAdjectivalNncFunctionTypedContinuationFrame(frame = null) {
    if (!frame || typeof frame !== "object") {
        return false;
    }
    return frame.kind === "generated-output-typed-continuation-frame"
        && frame.formulaRecord?.kind === "grammar-formula-record"
        && frame.formulaRealizationRecord?.kind === "grammar-formula-realization-record";
}

function getAdjectivalNncFunctionOverrideSurface(override = null) {
    const adjectivalNnc = override?.adjectivalNnc && typeof override.adjectivalNnc === "object"
        ? override.adjectivalNnc
        : null;
    if (!adjectivalNnc) {
        return "";
    }
    return getAdjectivalNncFunctionEntrySurface({
        surface: adjectivalNnc.surface || "",
        grammarFrame: adjectivalNnc.grammarFrame || adjectivalNnc.frames || null,
    });
}

function buildAdjectivalNncFunctionEntryContract({
    surface = "",
    formation = "",
    formulaEcho = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    sourceCompoundFrame = null,
    sourceDenominalCompoundFrame = null,
    patientivoSource = "",
    nominalizedVncKind = "",
    grammarFrame = null,
    sourceSelectedVariant = null,
    targetSelectedVariant = null,
    sourceContinuationFrame = null,
    targetContinuationFrame = null,
    operationFrame = null,
    requireCanonicalFormulaRecords = false,
} = {}) {
    const frame = getAdjectivalNncFunctionEntryGrammarFrame(grammarFrame);
    const authorityFrame = frame?.authorityFrame || {};
    const routeContract = frame?.routeContract || {};
    const unitFrame = frame?.unitFrame || {};
    const resultFrame = frame?.resultFrame || {};
    const diagnosticFrame = frame?.diagnosticFrame || {};
    const resolvedSourceFormulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object"
        ? sourceFormulaSlots
        : (
            frame?.morphBoundaryFrame?.formulaSlots
            || frame?.nuclearClauseFrame?.formulaSlots
            || frame?.routeContract?.sourceContract?.sourceFormulaSlots
            || null
        );
    const resolvedSourceFormulaEcho = String(
        sourceFormulaEcho
        || frame?.morphBoundaryFrame?.formulaEcho
        || frame?.nuclearClauseFrame?.formulaEcho
        || frame?.routeContract?.sourceContract?.sourceFormulaEcho
        || ""
    ).trim();
    const resolvedSurface = getAdjectivalNncFunctionEntrySurface({ surface, grammarFrame: frame });
    const normalizedSourceSelectedVariant = sourceSelectedVariant && typeof sourceSelectedVariant === "object"
        ? sourceSelectedVariant
        : null;
    const normalizedTargetSelectedVariant = targetSelectedVariant && typeof targetSelectedVariant === "object"
        ? targetSelectedVariant
        : null;
    const normalizedSourceContinuationFrame = sourceContinuationFrame && typeof sourceContinuationFrame === "object"
        ? sourceContinuationFrame
        : null;
    const normalizedTargetContinuationFrame = targetContinuationFrame && typeof targetContinuationFrame === "object"
        ? targetContinuationFrame
        : null;
    const normalizedOperationFrame = operationFrame && typeof operationFrame === "object"
        ? operationFrame
        : (normalizedTargetContinuationFrame?.operationFrame && typeof normalizedTargetContinuationFrame.operationFrame === "object"
            ? normalizedTargetContinuationFrame.operationFrame
            : null);
    const canonicalFormulaRecords = getAdjectivalNncFunctionEntryCanonicalFormulaRecords(resultFrame);
    const canonicalFormulaRealizationRecords = getAdjectivalNncFunctionEntryCanonicalRealizationRecords(resultFrame);
    const requiresCanonicalRecords = requireCanonicalFormulaRecords === true
        || Boolean(normalizedSourceContinuationFrame || normalizedTargetContinuationFrame);
    const canonicalRecordsAvailable = Boolean(canonicalFormulaRecords.length && canonicalFormulaRealizationRecords.length);
    const typedContinuationFramesAvailable = isAdjectivalNncFunctionTypedContinuationFrame(normalizedSourceContinuationFrame)
        && isAdjectivalNncFunctionTypedContinuationFrame(normalizedTargetContinuationFrame);
    const structuredContinuationBlockReason = !canonicalRecordsAvailable
        ? "missing-canonical-formula-or-realization-record"
        : (!typedContinuationFramesAvailable ? "missing-typed-source-or-target-continuation-frame" : "");
    const authorityRefs = Array.isArray(authorityFrame.andrewsRefs)
        ? authorityFrame.andrewsRefs.map((entry) => String(entry || "").trim()).filter(Boolean)
        : [];
    const diagnosticIds = Array.isArray(diagnosticFrame.diagnostics)
        ? diagnosticFrame.diagnostics
            .map((entry) => String(entry?.id || entry?.code || entry || "").trim())
            .filter(Boolean)
        : [];
    return {
        version: 1,
        source: "adjectival-nnc-function-entry",
        surface: resolvedSurface,
        grammarFrame: frame || null,
        frames: frame || null,
        formation: String(formation || "").trim(),
        formulaEcho: String(formulaEcho || "").trim(),
        sourceFormulaSlots: resolvedSourceFormulaSlots && typeof resolvedSourceFormulaSlots === "object" ? resolvedSourceFormulaSlots : null,
        sourceFormulaEcho: resolvedSourceFormulaEcho,
        sourceCompoundFrame: sourceCompoundFrame && typeof sourceCompoundFrame === "object" ? sourceCompoundFrame : null,
        sourceDenominalCompoundFrame: sourceDenominalCompoundFrame && typeof sourceDenominalCompoundFrame === "object" ? sourceDenominalCompoundFrame : null,
        sourceSelectedVariant: normalizedSourceSelectedVariant,
        targetSelectedVariant: normalizedTargetSelectedVariant,
        sourceContinuationFrame: normalizedSourceContinuationFrame,
        targetContinuationFrame: normalizedTargetContinuationFrame,
        operationFrame: normalizedOperationFrame,
        sourceSelectedVariantId: String(normalizedSourceSelectedVariant?.variantId || normalizedSourceSelectedVariant?.selectedVariantId || "").trim(),
        targetSelectedVariantId: String(normalizedTargetSelectedVariant?.variantId || normalizedTargetSelectedVariant?.selectedVariantId || "").trim(),
        sourceFormulaRealizationRecordId: String(normalizedSourceSelectedVariant?.formulaRealizationRecordId || "").trim(),
        targetFormulaRealizationRecordId: String(normalizedTargetSelectedVariant?.formulaRealizationRecordId || "").trim(),
        sourceFormulaRecordId: String(normalizedSourceSelectedVariant?.formulaRecordId || "").trim(),
        targetFormulaRecordId: String(normalizedTargetSelectedVariant?.formulaRecordId || "").trim(),
        formulaRecord: canonicalFormulaRecords[0] || null,
        formulaRecords: canonicalFormulaRecords,
        formulaRealizationRecord: canonicalFormulaRealizationRecords[0] || null,
        formulaRealizationRecords: canonicalFormulaRealizationRecords,
        requiresCanonicalFormulaRecords: requiresCanonicalRecords,
        canonicalFormulaRecordsAvailable: canonicalRecordsAvailable,
        typedContinuationFramesAvailable,
        blocked: requiresCanonicalRecords && Boolean(structuredContinuationBlockReason),
        blockReason: requiresCanonicalRecords ? structuredContinuationBlockReason : "",
        patientivoSource: String(patientivoSource || "").trim(),
        nominalizedVncKind: String(nominalizedVncKind || "").trim(),
        authorityRefs,
        evidenceStatus: String(authorityFrame.evidenceStatus || "").trim(),
        unitKind: String(unitFrame.unitKind || "").trim(),
        routeFamily: String(routeContract.routeFamily || "").trim(),
        routeStage: String(routeContract.routeStage || "").trim(),
        generationAllowed: routeContract.generationAllowed === true,
        resultOk: resultFrame.ok === true,
        diagnosticStatus: String(diagnosticFrame.status || "").trim(),
        diagnosticIds,
    };
}

function serializeAdjectivalNncFunctionEntryContract(contract = null) {
    if (!contract || typeof contract !== "object") {
        return "";
    }
    try {
        return JSON.stringify(contract);
    } catch (_error) {
        return "";
    }
}

function getAdjectivalNncFunctionEntryValenceSourceKind({
    formation = "",
    entryContract = null,
    grammarFrame = null,
} = {}) {
    const normalizedFormation = String(formation || "").trim();
    const source = entryContract && typeof entryContract === "object" ? entryContract : {};
    const frame = grammarFrame && typeof grammarFrame === "object" ? grammarFrame : {};
    const sourceKind = String(
        source.sourceClauseKind
        || source.sourceCategory
        || source.unitKind
        || source.grammarFrame?.routeContract?.sourceContract?.sourceClauseKind
        || source.grammarFrame?.routeContract?.sourceContract?.sourceCategory
        || frame.routeContract?.sourceContract?.sourceClauseKind
        || frame.routeContract?.sourceContract?.sourceCategory
        || frame.unitFrame?.unitKind
        || ""
    ).trim();
    if (sourceKind) {
        return sourceKind;
    }
    return /(^|-)vnc|verbal/i.test(normalizedFormation)
        ? "verbal-nuclear-clause"
        : "";
}

function buildAdjectivalNncFunctionEntryMutationValenceGate({
    formation = "",
    entryContract = null,
    grammarFrame = null,
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
} = {}) {
    if (typeof buildFunctionUseValenceObjectHardGate !== "function") {
        return null;
    }
    const contract = entryContract && typeof entryContract === "object" ? entryContract : {};
    const sourceFrame = (
        (grammarFrame && typeof grammarFrame === "object" ? grammarFrame : null)
        || (contract.grammarFrame && typeof contract.grammarFrame === "object" ? contract.grammarFrame : null)
        || (contract.frames && typeof contract.frames === "object" ? contract.frames : null)
        || null
    );
    const resolvedSourceFormulaSlots = contract.sourceFormulaSlots && typeof contract.sourceFormulaSlots === "object"
        ? contract.sourceFormulaSlots
        : (sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null);
    return buildFunctionUseValenceObjectHardGate({
        override: {
            adjectivalNnc: {
                enabled: true,
                entryRouteContract: contract,
                grammarFrame: sourceFrame,
                frames: sourceFrame,
                sourceFormulaSlots: resolvedSourceFormulaSlots,
                sourceFormulaEcho: contract.sourceFormulaEcho || sourceFormulaEcho || "",
            },
        },
        sourceFrame,
        sourceFormulaSlots: resolvedSourceFormulaSlots,
        sourceKind: getAdjectivalNncFunctionEntryValenceSourceKind({
            formation,
            entryContract: contract,
            grammarFrame: sourceFrame,
        }),
        currentVector: null,
        currentVectorOwnsValenceObjectSlots: false,
        gateContext: "adjectival-nnc-function-entry-mutation",
    });
}

function blockAdjectivalNncFunctionEntryMutationValenceGate(functionUseValenceGate = null, detail = {}) {
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:function-use-valence-route-blocked", {
            routeRecordId: "adjectival-nnc-function-entry",
            reason: functionUseValenceGate?.reason || "",
            diagnosticId: functionUseValenceGate?.diagnosticId || "function-use-valence-object-frame-unfixed",
            ...detail,
        });
    }
    return null;
}

function applyAdjectivalNncFunctionToVerbEntry({
    surface = "",
    formation = "",
    formulaEcho = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    sourceCompoundFrame = null,
    sourceDenominalCompoundFrame = null,
    patientivoSource = "",
    nominalizedVncKind = "",
    grammarFrame = null,
    sourceSelectedVariant = null,
    targetSelectedVariant = null,
    sourceContinuationFrame = null,
    targetContinuationFrame = null,
    operationFrame = null,
    requireCanonicalFormulaRecords = false,
    refresh = true,
} = {}) {
    const verbEl = document.getElementById("verb");
    const normalizedSurface = getAdjectivalNncFunctionEntrySurface({ surface, grammarFrame });
    if (!verbEl || !normalizedSurface) {
        return null;
    }
    const entryContract = buildAdjectivalNncFunctionEntryContract({
        surface: normalizedSurface,
        formation,
        formulaEcho,
        sourceFormulaSlots,
        sourceFormulaEcho,
        sourceCompoundFrame,
        sourceDenominalCompoundFrame,
        patientivoSource,
        nominalizedVncKind,
        grammarFrame,
        sourceSelectedVariant,
        targetSelectedVariant,
        sourceContinuationFrame,
        targetContinuationFrame,
        operationFrame,
        requireCanonicalFormulaRecords,
    });
    if (entryContract.blocked) {
        entryContract.mutationApplied = false;
        return entryContract;
    }
    const entryFunctionUseValenceGate = buildAdjectivalNncFunctionEntryMutationValenceGate({
        formation,
        entryContract,
        grammarFrame,
        sourceFormulaSlots,
        sourceFormulaEcho,
    });
    if (entryFunctionUseValenceGate) {
        entryContract.functionUseValenceGate = entryFunctionUseValenceGate;
    }
    if (entryFunctionUseValenceGate?.status === "blocked") {
        blockAdjectivalNncFunctionEntryMutationValenceGate(entryFunctionUseValenceGate, {
            source: "adjectival-nnc-function-entry",
            formation: String(formation || "").trim(),
            surface: normalizedSurface,
        });
        entryContract.blocked = true;
        entryContract.mutationApplied = false;
        return entryContract;
    }
    entryContract.mutationApplied = true;
    verbEl.value = normalizedSurface;
    Object.defineProperty(verbEl, "__adjectivalNncFunctionEntryContract", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: entryContract,
    });
    verbEl.dataset.adjectivalNncFunctionSurface = normalizedSurface;
    verbEl.dataset.adjectivalNncFormation = String(formation || "").trim();
    verbEl.dataset.adjectivalNncFormulaEcho = String(formulaEcho || "").trim();
    verbEl.dataset.patientivoSource = String(patientivoSource || "").trim();
    verbEl.dataset.nominalizedVncKind = String(nominalizedVncKind || "").trim();
    verbEl.dataset.adjectivalNncSourceSelectedVariantId = entryContract.sourceSelectedVariantId || "";
    verbEl.dataset.adjectivalNncTargetSelectedVariantId = entryContract.targetSelectedVariantId || "";
    verbEl.dataset.adjectivalNncSourceFormulaRealizationRecordId = entryContract.sourceFormulaRealizationRecordId || "";
    verbEl.dataset.adjectivalNncTargetFormulaRealizationRecordId = entryContract.targetFormulaRealizationRecordId || "";
    const serializedContract = serializeAdjectivalNncFunctionEntryContract(entryContract);
    if (serializedContract) {
        verbEl.dataset.adjectivalNncFunctionContract = serializedContract;
    }
    verbEl.dataset.grammarAuthorityRef = entryContract.authorityRefs[0] || "";
    verbEl.dataset.grammarEvidenceStatus = entryContract.evidenceStatus || "";
    verbEl.dataset.grammarUnitKind = entryContract.unitKind || "";
    verbEl.dataset.grammarRouteFamily = entryContract.routeFamily || "";
    verbEl.dataset.grammarRouteStage = entryContract.routeStage || "";
    verbEl.dataset.grammarGenerationAllowed = String(entryContract.generationAllowed === true);
    verbEl.dataset.grammarDiagnosticStatus = entryContract.diagnosticStatus || "";
    verbEl.dataset.grammarResultOk = String(entryContract.resultOk === true);
    if (typeof clearActiveNawatRouteProfile === "function") {
        clearActiveNawatRouteProfile();
    }
    if (typeof TENSE_MODE !== "undefined" && TENSE_MODE?.adjetivo) {
        const formalMode = entryContract.unitKind === "verbal-nuclear-clause"
            ? TENSE_MODE.verbo
            : TENSE_MODE.sustantivo;
        if (typeof setActiveFunctionMode === "function") {
            setActiveFunctionMode(TENSE_MODE.adjetivo, { syncOutput: false });
        }
        if (typeof setActiveUnitMode === "function") {
            setActiveUnitMode(formalMode);
        } else if (typeof setActiveTenseMode === "function") {
            setActiveTenseMode(formalMode, { clearRoute: true });
        }
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:adjectival-nnc-function-applied", {
            surface: normalizedSurface,
            formation: String(formation || "").trim(),
            formulaEcho: String(formulaEcho || "").trim(),
            patientivoSource: String(patientivoSource || "").trim(),
            nominalizedVncKind: String(nominalizedVncKind || "").trim(),
            entryContract,
        });
    }
    if (refresh !== false) {
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "adjectival-nnc-function-entry",
        });
    }
    return entryContract;
}

function applyPrelocativeRootsToVerbEntry({
    incorporatedRoot = "",
    matrixRoot = "tajtani",
    matrixSpecId = "",
    objectPrefix = "",
    possessorPrefix = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedIncorporatedRoot = normalizeComposerEmbedValue(incorporatedRoot);
    const normalizedMatrixRoot = normalizeComposerStem(matrixRoot || "tajtani");
    const resolvedMatrixSpecId = String(matrixSpecId || "").trim()
        || (
            typeof resolvePatientivoPrelocativeMatrixSpec === "function"
                ? String(resolvePatientivoPrelocativeMatrixSpec(normalizedMatrixRoot)?.id || "").trim()
                : ""
        );
    const promotedObjectPrefix = String(objectPrefix || "").trim();
    const sourcePossessorPrefix = String(possessorPrefix || "").trim();
    const verbEl = document.getElementById("verb");
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { patientivoPrelocativeContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
        sourceFormulaSlots,
        sourceFormulaEcho,
        objectPrefix: promotedObjectPrefix,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "prelocative-entry",
            incorporatedRoot: normalizedIncorporatedRoot,
            matrixRoot: normalizedMatrixRoot,
            objectPrefix: promotedObjectPrefix,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = "";
    VerbComposerState.slotAStem = "";
    VerbComposerState.slotBEmbed = normalizedIncorporatedRoot;
    VerbComposerState.slotBStem = normalizedMatrixRoot;
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedIncorporatedRoot;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = true;
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({ triggerGenerate: false });
    const prelocativeVerbInput = String(verbEl.value || "").trim()
        || `${normalizedIncorporatedRoot}/${normalizedMatrixRoot}`;
    const routeStore = typeof getNawatRouteStateStore === "function"
        ? getNawatRouteStateStore()
        : null;
    if (routeStore) {
        routeStore.activeNawatLineId = "locative";
        routeStore.__NAWAT_ACTIVE_LINE_ID__ = "locative";
        routeStore.activeNawatLineStationKey = "prelocative";
        routeStore.activeLocativeIncorporatedRoot = normalizedIncorporatedRoot;
        routeStore.activeLocativeMatrixRoot = normalizedMatrixRoot;
        routeStore.activeLocativeMatrixSpecId = resolvedMatrixSpecId;
        routeStore.activeLocativePrelocativeVerb = prelocativeVerbInput;
        routeStore.activeLocativePromotedObjectPrefix = promotedObjectPrefix;
        routeStore.activeLocativeSourcePossessorPrefix = sourcePossessorPrefix;
    }
    if (typeof window !== "undefined" && window) {
        window.__NAWAT_ACTIVE_LINE_ID__ = "locative";
    }
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: false,
        });
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "prelocative-entry",
        });
    }
    return true;
}

function applyPatientivoCompoundEmbedRootsToVerbEntry({
    incorporatedRoot = "",
    matrixRoot = "miki",
    matrixSpecId = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedIncorporatedRoot = normalizeComposerEmbedValue(incorporatedRoot);
    const resolvedMatrixSpec = typeof resolvePatientivoCompoundEmbedMatrixSpec === "function"
        ? resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot || "miki")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "miki")
    );
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const verbEl = document.getElementById("verb");
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { patientivoCompoundEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
        sourceFormulaSlots,
        sourceFormulaEcho,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "patientivo-compound-embed-entry",
            incorporatedRoot: normalizedIncorporatedRoot,
            matrixRoot: normalizedMatrixRoot,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.intransitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.intransitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = normalizedIncorporatedRoot;
    VerbComposerState.slotAStem = normalizedMatrixRoot;
    VerbComposerState.slotBEmbed = "";
    VerbComposerState.slotBStem = "";
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedIncorporatedRoot;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "a";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({ triggerGenerate: false });
    const compoundVerbInput = String(verbEl.value || "").trim()
        || (
            typeof buildPatientivoCompoundEmbedVerbInput === "function"
                ? buildPatientivoCompoundEmbedVerbInput({
                    incorporatedRoot: normalizedIncorporatedRoot,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`
        );
    if (verbEl.value !== compoundVerbInput) {
        verbEl.value = compoundVerbInput;
    }
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:patientivo-compound-embed-applied", {
            incorporatedRoot: normalizedIncorporatedRoot,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            compoundVerbInput,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "patientivo-compound-embed-entry",
        });
    }
    return true;
}

function applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry({
    incorporatedRoot = "",
    matrixRoot = "chikawa",
    matrixSpecId = "",
    objectPrefix = "ki",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedIncorporatedRoot = normalizeComposerEmbedValue(incorporatedRoot);
    const resolvedMatrixSpec = typeof resolvePatientivoCharacteristicPropertyMatrixSpec === "function"
        ? resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot || "chikawa")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "chikawa")
    );
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const resolvedObjectPrefix = String(objectPrefix || "ki").trim() || "ki";
    const verbEl = document.getElementById("verb");
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { patientivoCharacteristicPropertyEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
        sourceFormulaSlots,
        sourceFormulaEcho,
        objectPrefix: resolvedObjectPrefix,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "patientivo-characteristic-property-embed-entry",
            incorporatedRoot: normalizedIncorporatedRoot,
            matrixRoot: normalizedMatrixRoot,
            objectPrefix: resolvedObjectPrefix,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = "";
    VerbComposerState.slotAStem = "";
    VerbComposerState.slotBEmbed = normalizedIncorporatedRoot;
    VerbComposerState.slotBStem = normalizedMatrixRoot;
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedIncorporatedRoot;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "b";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({ triggerGenerate: false });
    const compoundVerbInput = String(verbEl.value || "").trim()
        || (
            typeof buildPatientivoCharacteristicPropertyEmbedVerbInput === "function"
                ? buildPatientivoCharacteristicPropertyEmbedVerbInput({
                    incorporatedRoot: normalizedIncorporatedRoot,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `-(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`
        );
    if (verbEl.value !== compoundVerbInput) {
        verbEl.value = compoundVerbInput;
    }
    if (typeof setCurrentObjectPrefix === "function") {
        setCurrentObjectPrefix(resolvedObjectPrefix);
    } else {
        const objectEl = document.getElementById("object");
        if (objectEl) {
            objectEl.value = resolvedObjectPrefix;
        }
    }
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:patientivo-characteristic-property-embed-applied", {
            incorporatedRoot: normalizedIncorporatedRoot,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            objectPrefix: resolvedObjectPrefix,
            compoundVerbInput,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "patientivo-characteristic-property-embed-entry",
        });
    }
    return true;
}

function applyPatientivoNominalCompoundToOrdinaryNncEntry({
    incorporatedRoot = "",
    matrixRoot = "kal",
    matrixSpecId = "",
    nounClass = "",
    animacy = "",
    ordinaryNncInput = "",
    compoundStem = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedIncorporatedRoot = normalizeComposerEmbedValue(incorporatedRoot);
    const resolvedMatrixSpec = typeof resolvePatientivoNominalCompoundMatrixSpec === "function"
        ? resolvePatientivoNominalCompoundMatrixSpec(matrixRoot || "kal")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "kal")
    );
    const resolvedCompoundStem = normalizeComposerStem(
        compoundStem
        || (
            typeof buildPatientivoNominalCompoundStem === "function"
                ? buildPatientivoNominalCompoundStem({
                    incorporatedRoot: normalizedIncorporatedRoot,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `${normalizedIncorporatedRoot}${normalizedMatrixRoot}`
        )
    );
    const resolvedNounClass = normalizeComposerOrdinaryNncNounClass(
        nounClass || resolvedMatrixSpec?.nounClass || "zero"
    ) || "zero";
    const resolvedAnimacy = String(animacy || resolvedMatrixSpec?.animacy || "inanimate").trim();
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const verbEl = document.getElementById("verb");
    if (!normalizedIncorporatedRoot || !normalizedMatrixRoot || !resolvedCompoundStem || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { patientivoNominalCompoundContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-core-to-cnn-nounstem-deverbal",
        sourceFormulaSlots,
        sourceFormulaEcho,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "patientivo-nominal-compound-entry",
            incorporatedRoot: normalizedIncorporatedRoot,
            matrixRoot: normalizedMatrixRoot,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = "";
    VerbComposerState.lastGeneralTransitivity = "";
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = "";
    VerbComposerState.slotAStem = resolvedCompoundStem;
    VerbComposerState.slotBEmbed = "";
    VerbComposerState.slotBStem = "";
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = "";
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = resolvedCompoundStem;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = false;
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
        setOrdinaryNncGenerationModeEnabled(true, {
            state: "absolutive",
            number: "singular",
            pluralType: "auto",
            possessor: "",
            subjectPrefix: "",
            subjectSuffix: "",
            subjectKey: "3sg",
            nounClass: resolvedNounClass,
            animacy: resolvedAnimacy,
        });
    }
    if (typeof setActiveNawatTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.sustantivo) {
        setActiveNawatTenseMode(TENSE_MODE.sustantivo);
    } else if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.sustantivo) {
        setActiveTenseMode(TENSE_MODE.sustantivo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    renderVerbComposerFromState();
    const formattedInput = ordinaryNncInput
        || formatComposerOrdinaryNncAnalogueInput({
            stem: resolvedCompoundStem,
            nounClass: resolvedNounClass,
        });
    verbEl.value = formattedInput || resolvedCompoundStem;
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:patientivo-nominal-compound-applied", {
            incorporatedRoot: normalizedIncorporatedRoot,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            compoundStem: resolvedCompoundStem,
            ordinaryNncInput: verbEl.value,
            nounClass: resolvedNounClass,
            animacy: resolvedAnimacy,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "patientivo-nominal-compound-entry",
        });
    }
    return true;
}

function isActiveActionCompoundEmbedTypedTargetFrame(frame = null) {
    return Boolean(
        frame
        && typeof frame === "object"
        && frame.kind === "andrews-typed-operation-continuation-frame"
        && frame.operationFrame?.operationId === "active-action-nounstem-as-compound-embed"
        && frame.sourceFrame?.kind === "generated-output-typed-continuation-frame"
        && frame.formulaSlots?.embeddedRoot
        && frame.formulaSlots?.matrixRoot
    );
}

function getActiveActionCompoundEmbedPayloadFromTargetFrame(frame = null) {
    if (!isActiveActionCompoundEmbedTypedTargetFrame(frame)) {
        return null;
    }
    const embeddedRoot = normalizeComposerEmbedValue(
        frame.formulaSlots.embeddedRoot.token
        || frame.sourceFrame?.selectedVariant?.surface
        || frame.sourceFrame?.formulaRealizationRecord?.surface
        || ""
    );
    const matrixRoot = normalizeComposerStem(
        frame.formulaSlots.matrixRoot.root
        || frame.matrixFrame?.root
        || ""
    );
    const targetInput = String(
        frame.targetInput
        || frame.resultFrame?.targetInput
        || frame.displayInput
        || ""
    ).trim();
    if (!embeddedRoot || !matrixRoot || !targetInput) {
        return null;
    }
    return {
        embeddedRoot,
        matrixRoot,
        targetInput,
        matrixSpecId: String(frame.formulaSlots.matrixRoot.matrixSpecId || frame.matrixFrame?.id || "").trim(),
    };
}

function applyActiveActionCompoundEmbedRootsToVerbEntry({
    actionNominalSurface = "",
    matrixRoot = "tzajtzi",
    matrixSpecId = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    sourceContinuationFrame = null,
    targetContinuationFrame = null,
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const typedPayload = getActiveActionCompoundEmbedPayloadFromTargetFrame(targetContinuationFrame);
    if (!typedPayload) {
        return false;
    }
    const displayActionNominalSurface = normalizeComposerEmbedValue(actionNominalSurface);
    if (displayActionNominalSurface && displayActionNominalSurface !== typedPayload.embeddedRoot) {
        return false;
    }
    if (
        sourceContinuationFrame
        && targetContinuationFrame.sourceFrame
        && sourceContinuationFrame !== targetContinuationFrame.sourceFrame
    ) {
        return false;
    }
    const normalizedActionNominalSurface = typedPayload.embeddedRoot;
    const resolvedMatrixSpec = typeof resolveActiveActionCompoundEmbedMatrixSpec === "function"
        ? resolveActiveActionCompoundEmbedMatrixSpec(typedPayload.matrixRoot || matrixRoot || "tzajtzi")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : typedPayload.matrixRoot
    );
    const resolvedMatrixSpecId = String(typedPayload.matrixSpecId || matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const verbEl = document.getElementById("verb");
    if (!normalizedActionNominalSurface || !normalizedMatrixRoot || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { activeActionCompoundEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
        sourceFormulaSlots,
        sourceFormulaEcho,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "active-action-compound-embed-entry",
            actionNominalSurface: normalizedActionNominalSurface,
            matrixRoot: normalizedMatrixRoot,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.intransitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.intransitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = normalizedActionNominalSurface;
    VerbComposerState.slotAStem = normalizedMatrixRoot;
    VerbComposerState.slotBEmbed = "";
    VerbComposerState.slotBStem = "";
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedActionNominalSurface;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "a";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({ triggerGenerate: false });
    const compoundVerbInput = typedPayload.targetInput;
    if (verbEl.value !== compoundVerbInput) {
        verbEl.value = compoundVerbInput;
    }
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:active-action-compound-embed-applied", {
            actionNominalSurface: normalizedActionNominalSurface,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            compoundVerbInput,
            sourceContinuationFrame,
            targetContinuationFrame,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "active-action-compound-embed-entry",
        });
    }
    return true;
}

function buildComposerFunctionUseValenceRouteActionContract({
    dataset = null,
    routeRecordId = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    objectPrefix = "",
    obj1 = "",
    obj2 = "",
    obj3 = "",
    reflexivo = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
    entradaGrammarObject = null,
} = {}) {
    if (typeof buildAndrewsCnvCnnBackAndForthRouteActionContract !== "function") {
        return null;
    }
    const composerSemantic = buildComposerSemanticState(VerbComposerState);
    const explicitSourceFormulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object"
        ? sourceFormulaSlots
        : null;
    const explicitSourceFormulaEcho = String(sourceFormulaEcho || "").trim();
    const hasExplicitSourceFormulaEvidence = Boolean(explicitSourceFormulaSlots || explicitSourceFormulaEcho);
    const resolvedEntradaGrammarObject = entradaGrammarObject && typeof entradaGrammarObject === "object"
        ? entradaGrammarObject
        : (hasExplicitSourceFormulaEvidence ? null : (composerSemantic.entradaGrammarObject || null));
    const resolvedObjectPrefix = String(objectPrefix || obj1 || "").trim();
    return buildAndrewsCnvCnnBackAndForthRouteActionContract({
        dataset: dataset && typeof dataset === "object" ? dataset : {},
        sourceFormulaSlots: explicitSourceFormulaSlots,
        sourceFormulaEcho: explicitSourceFormulaEcho,
        entradaGrammarObject: resolvedEntradaGrammarObject,
        objectPrefix: resolvedObjectPrefix,
        obj1: resolvedObjectPrefix,
        obj2: String(obj2 || "").trim(),
        obj3: String(obj3 || "").trim(),
        reflexivo: String(reflexivo || "").trim(),
        grammarFrame: grammarFrame && typeof grammarFrame === "object" ? grammarFrame : null,
        sourceRouteFrame: sourceRouteFrame && typeof sourceRouteFrame === "object" ? sourceRouteFrame : null,
        routeFrame: routeFrame && typeof routeFrame === "object" ? routeFrame : null,
        incorporationRouteFrame: incorporationRouteFrame && typeof incorporationRouteFrame === "object" ? incorporationRouteFrame : null,
        objectSlotOwnership: objectSlotOwnership && typeof objectSlotOwnership === "object" ? objectSlotOwnership : null,
        functionUseValenceGate: functionUseValenceGate && typeof functionUseValenceGate === "object"
            ? functionUseValenceGate
            : null,
    }, {
        routeRecordId,
        generationAllowed: true,
    });
}

function blockComposerFunctionUseValenceRouteAction(contract = null, detail = {}) {
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:function-use-valence-route-blocked", {
            routeRecordId: contract?.routeRecordId || "",
            reason: contract?.functionUseValenceGate?.reason || "",
            diagnosticId: contract?.functionUseValenceGate?.diagnosticId || "",
            ...detail,
        });
    }
    return false;
}

function shouldBlockComposerFunctionUseValenceRouteAction(options = {}) {
    const contract = buildComposerFunctionUseValenceRouteActionContract(options);
    if (contract?.routeRankingAllowed === false || contract?.functionUseValenceGate?.status === "blocked") {
        return { blocked: true, contract };
    }
    return { blocked: false, contract };
}

function applyPreteritAgentiveOwnerhoodRootsToVerbEntry({
    preteritAgentiveStem = "",
    matrixRoot = "wa",
    matrixSpecId = "",
    ownerhoodVerbInput = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedPreteritAgentiveStem = normalizeComposerEmbedValue(preteritAgentiveStem);
    const resolvedMatrixSpec = typeof resolvePreteritAgentiveOwnerhoodMatrixSpec === "function"
        ? resolvePreteritAgentiveOwnerhoodMatrixSpec(matrixRoot || "wa")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "wa")
    );
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const resolvedOwnerhoodVerbInput = String(ownerhoodVerbInput || "").trim()
        || (
            typeof buildPreteritAgentiveOwnerhoodVerbInput === "function"
                ? buildPreteritAgentiveOwnerhoodVerbInput({
                    preteritAgentiveStem: normalizedPreteritAgentiveStem,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `(${normalizedPreteritAgentiveStem})-(${normalizedMatrixRoot})`
        );
    const verbEl = document.getElementById("verb");
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot || !resolvedOwnerhoodVerbInput || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { preteritAgentiveOwnerhoodContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
        sourceFormulaSlots,
        sourceFormulaEcho,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "preterit-agentive-ownerhood-entry",
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = normalizedPreteritAgentiveStem;
    VerbComposerState.slotAStem = normalizedMatrixRoot;
    VerbComposerState.slotBEmbed = "";
    VerbComposerState.slotBStem = "";
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedPreteritAgentiveStem;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "a";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    verbEl.value = resolvedOwnerhoodVerbInput;
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof setSelectedTenseTab === "function") {
        setSelectedTenseTab("pasado-remoto");
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:preterit-agentive-ownerhood-applied", {
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            ownerhoodVerbInput: resolvedOwnerhoodVerbInput,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "preterit-agentive-ownerhood-entry",
        });
    }
    return true;
}

function applyPreteritAgentiveComplementRootsToVerbEntry({
    preteritAgentiveStem = "",
    matrixRoot = "mati",
    matrixSpecId = "",
    objectPrefix = "ki",
    complementVerbInput = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedPreteritAgentiveStem = normalizeComposerEmbedValue(preteritAgentiveStem);
    const resolvedMatrixSpec = typeof resolvePreteritAgentiveComplementMatrixSpec === "function"
        ? resolvePreteritAgentiveComplementMatrixSpec(matrixRoot || "mati")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "mati")
    );
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const resolvedObjectPrefix = String(objectPrefix || resolvedMatrixSpec?.objectPrefix || "ki").trim() || "ki";
    const resolvedComplementVerbInput = String(complementVerbInput || "").trim()
        || (
            typeof buildPreteritAgentiveComplementVerbInput === "function"
                ? buildPreteritAgentiveComplementVerbInput({
                    preteritAgentiveStem: normalizedPreteritAgentiveStem,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `-(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`
        );
    const verbEl = document.getElementById("verb");
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot || !resolvedComplementVerbInput || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { preteritAgentiveComplementContinuation: "true" },
        routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
        sourceFormulaSlots,
        sourceFormulaEcho,
        objectPrefix: resolvedObjectPrefix,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "preterit-agentive-complement-entry",
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
            objectPrefix: resolvedObjectPrefix,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = "";
    VerbComposerState.slotAStem = "";
    VerbComposerState.slotBEmbed = normalizedPreteritAgentiveStem;
    VerbComposerState.slotBStem = normalizedMatrixRoot;
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedPreteritAgentiveStem;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "b";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    verbEl.value = resolvedComplementVerbInput;
    if (typeof setCurrentObjectPrefix === "function") {
        setCurrentObjectPrefix(resolvedObjectPrefix);
    } else {
        const objectEl = document.getElementById("object");
        if (objectEl) {
            objectEl.value = resolvedObjectPrefix;
        }
    }
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof setSelectedTenseTab === "function") {
        setSelectedTenseTab("presente");
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:preterit-agentive-complement-applied", {
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            objectPrefix: resolvedObjectPrefix,
            complementVerbInput: resolvedComplementVerbInput,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "preterit-agentive-complement-entry",
        });
    }
    return true;
}

function applyPreteritAgentiveAdverbialRootsToVerbEntry({
    preteritAgentiveStem = "",
    matrixRoot = "nemi",
    matrixSpecId = "",
    objectPrefix = "",
    adverbialVerbInput = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedPreteritAgentiveStem = normalizeComposerEmbedValue(preteritAgentiveStem);
    const resolvedMatrixSpec = typeof resolvePreteritAgentiveAdverbialMatrixSpec === "function"
        ? resolvePreteritAgentiveAdverbialMatrixSpec(matrixRoot || "nemi")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "nemi")
    );
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const resolvedObjectPrefix = resolvedMatrixSpec?.matrixValency === "transitive"
        ? (String(objectPrefix || "ki").trim() || "ki")
        : "";
    const resolvedAdverbialVerbInput = String(adverbialVerbInput || "").trim()
        || (
            typeof buildPreteritAgentiveAdverbialVerbInput === "function"
                ? buildPreteritAgentiveAdverbialVerbInput({
                    preteritAgentiveStem: normalizedPreteritAgentiveStem,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `(${normalizedPreteritAgentiveStem}/${normalizedMatrixRoot})`
        );
    const verbEl = document.getElementById("verb");
    if (!normalizedPreteritAgentiveStem || !normalizedMatrixRoot || !resolvedAdverbialVerbInput || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { preteritAgentiveAdverbialContinuation: "true" },
        routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
        sourceFormulaSlots,
        sourceFormulaEcho,
        objectPrefix: resolvedObjectPrefix,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "preterit-agentive-adverbial-entry",
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
            objectPrefix: resolvedObjectPrefix,
        });
    }
    const isTransitiveMatrix = resolvedMatrixSpec?.matrixValency === "transitive";
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = isTransitiveMatrix ? COMPOSER_TRANSITIVITY.transitive : COMPOSER_TRANSITIVITY.intransitive;
    VerbComposerState.lastGeneralTransitivity = VerbComposerState.transitivity;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = normalizedPreteritAgentiveStem;
    VerbComposerState.slotAStem = normalizedMatrixRoot;
    VerbComposerState.slotBEmbed = "";
    VerbComposerState.slotBStem = "";
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedPreteritAgentiveStem;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "a";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    verbEl.value = resolvedAdverbialVerbInput;
    if (typeof setCurrentObjectPrefix === "function") {
        setCurrentObjectPrefix(resolvedObjectPrefix);
    } else {
        const objectEl = document.getElementById("object");
        if (objectEl) {
            objectEl.value = resolvedObjectPrefix;
        }
    }
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof setSelectedTenseTab === "function") {
        setSelectedTenseTab("presente");
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:preterit-agentive-adverbial-applied", {
            preteritAgentiveStem: normalizedPreteritAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            objectPrefix: resolvedObjectPrefix,
            adverbialVerbInput: resolvedAdverbialVerbInput,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "preterit-agentive-adverbial-entry",
        });
    }
    return true;
}

function applyOrdinaryNounOwnerhoodRootsToVerbEntry({
    nounStem = "",
    nounClass = "",
    matrixRoot = "wa",
    matrixSpecId = "",
    ownerhoodVerbInput = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedNounStem = normalizeComposerEmbedValue(nounStem);
    const resolvedMatrixSpec = typeof resolveOrdinaryNounOwnerhoodMatrixSpec === "function"
        ? resolveOrdinaryNounOwnerhoodMatrixSpec(matrixRoot || "wa")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "wa")
    );
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const resolvedOwnerhoodVerbInput = String(ownerhoodVerbInput || "").trim()
        || (
            typeof buildOrdinaryNounOwnerhoodVerbInput === "function"
                ? buildOrdinaryNounOwnerhoodVerbInput({
                    nounStem: normalizedNounStem,
                    nounClass,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `(${normalizedNounStem})-(${normalizedMatrixRoot})`
        );
    const verbEl = document.getElementById("verb");
    if (!normalizedNounStem || !normalizedMatrixRoot || !resolvedOwnerhoodVerbInput || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { ordinaryNncOwnerhoodContinuation: "true" },
        routeRecordId: "cnn-nounstem-to-cnv-verbstem-denominal",
        sourceFormulaSlots,
        sourceFormulaEcho,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "ordinary-noun-ownerhood-entry",
            nounStem: normalizedNounStem,
            matrixRoot: normalizedMatrixRoot,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = normalizedNounStem;
    VerbComposerState.slotAStem = normalizedMatrixRoot;
    VerbComposerState.slotBEmbed = "";
    VerbComposerState.slotBStem = "";
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedNounStem;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "a";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    verbEl.value = resolvedOwnerhoodVerbInput;
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof setSelectedTenseTab === "function") {
        setSelectedTenseTab("pasado-remoto");
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:ordinary-noun-ownerhood-applied", {
            nounStem: normalizedNounStem,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            ownerhoodVerbInput: resolvedOwnerhoodVerbInput,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "ordinary-noun-ownerhood-entry",
        });
    }
    return true;
}

function applyActiveActionNominalCompoundToOrdinaryNncEntry({
    actionNominalSurface = "",
    matrixRoot = "kal",
    matrixSpecId = "",
    nounClass = "",
    animacy = "",
    ordinaryNncInput = "",
    compoundStem = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
    routeRecordId = "cnv-core-to-cnn-nounstem-deverbal",
    routeDataset = null,
    eventSource = "active-action-nominal-compound-entry",
} = {}) {
    const normalizedActionNominalSurface = normalizeComposerEmbedValue(actionNominalSurface);
    const resolvedMatrixSpec = typeof resolveActiveActionNominalCompoundMatrixSpec === "function"
        ? resolveActiveActionNominalCompoundMatrixSpec(matrixRoot || "kal")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "kal")
    );
    const resolvedCompoundStem = normalizeComposerStem(
        compoundStem
        || (
            typeof buildActiveActionNominalCompoundStem === "function"
                ? buildActiveActionNominalCompoundStem({
                    actionNominalSurface: normalizedActionNominalSurface,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `${normalizedActionNominalSurface}${normalizedMatrixRoot}`
        )
    );
    const resolvedNounClass = normalizeComposerOrdinaryNncNounClass(
        nounClass || resolvedMatrixSpec?.nounClass || "zero"
    ) || "zero";
    const resolvedAnimacy = String(animacy || resolvedMatrixSpec?.animacy || "inanimate").trim();
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const verbEl = document.getElementById("verb");
    if (!normalizedActionNominalSurface || !normalizedMatrixRoot || !resolvedCompoundStem || !verbEl) {
        return false;
    }
    const resolvedRouteDataset = routeDataset && typeof routeDataset === "object"
        ? routeDataset
        : { activeActionNominalCompoundContinuation: "true" };
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: {
            ...resolvedRouteDataset,
            functionUseContinuation: "true",
        },
        routeRecordId,
        sourceFormulaSlots,
        sourceFormulaEcho,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: eventSource,
            actionNominalSurface: normalizedActionNominalSurface,
            matrixRoot: normalizedMatrixRoot,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = "";
    VerbComposerState.lastGeneralTransitivity = "";
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = "";
    VerbComposerState.slotAStem = resolvedCompoundStem;
    VerbComposerState.slotBEmbed = "";
    VerbComposerState.slotBStem = "";
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = "";
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = resolvedCompoundStem;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = false;
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
        setOrdinaryNncGenerationModeEnabled(true, {
            state: "absolutive",
            number: "singular",
            pluralType: "auto",
            possessor: "",
            subjectPrefix: "",
            subjectSuffix: "",
            subjectKey: "3sg",
            nounClass: resolvedNounClass,
            animacy: resolvedAnimacy,
        });
    }
    if (typeof setActiveNawatTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.sustantivo) {
        setActiveNawatTenseMode(TENSE_MODE.sustantivo);
    } else if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.sustantivo) {
        setActiveTenseMode(TENSE_MODE.sustantivo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    renderVerbComposerFromState();
    const formattedInput = ordinaryNncInput
        || formatComposerOrdinaryNncAnalogueInput({
            stem: resolvedCompoundStem,
            nounClass: resolvedNounClass,
        });
    verbEl.value = formattedInput || resolvedCompoundStem;
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:active-action-nominal-compound-applied", {
            actionNominalSurface: normalizedActionNominalSurface,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            compoundStem: resolvedCompoundStem,
            ordinaryNncInput: verbEl.value,
            nounClass: resolvedNounClass,
            animacy: resolvedAnimacy,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "active-action-nominal-compound-entry",
        });
    }
    return true;
}

function applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry({
    customaryAgentiveStem = "",
    matrixRoot = "kal",
    matrixSpecId = "",
    nounClass = "",
    animacy = "",
    ordinaryNncInput = "",
    compoundStem = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    return applyActiveActionNominalCompoundToOrdinaryNncEntry({
        actionNominalSurface: customaryAgentiveStem,
        matrixRoot,
        matrixSpecId,
        nounClass,
        animacy,
        ordinaryNncInput,
        compoundStem,
        sourceFormulaSlots,
        sourceFormulaEcho,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
        routeRecordId: "cnv-predicate-to-cnn-nounstem-nominalization",
        routeDataset: { customaryAgentiveNominalCompoundContinuation: "true" },
        eventSource: "customary-agentive-nominal-compound-entry",
    });
}

function applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry({
    customaryAgentiveStem = "",
    matrixRoot = "tuka",
    matrixSpecId = "",
    objectPrefix = "ki",
    compoundVerbInput = "",
    sourceFormulaSlots = null,
    sourceFormulaEcho = "",
    grammarFrame = null,
    sourceRouteFrame = null,
    routeFrame = null,
    incorporationRouteFrame = null,
    objectSlotOwnership = null,
    functionUseValenceGate = null,
} = {}) {
    const normalizedCustomaryAgentiveStem = normalizeComposerEmbedValue(customaryAgentiveStem);
    const resolvedMatrixSpec = typeof resolveCustomaryAgentiveCompoundEmbedMatrixSpec === "function"
        ? resolveCustomaryAgentiveCompoundEmbedMatrixSpec(matrixRoot || "tuka")
        : null;
    const normalizedMatrixRoot = normalizeComposerStem(
        resolvedMatrixSpec?.supported ? resolvedMatrixSpec.nawatRoot : (matrixRoot || "tuka")
    );
    const resolvedMatrixSpecId = String(matrixSpecId || resolvedMatrixSpec?.id || "").trim();
    const resolvedObjectPrefix = String(objectPrefix || resolvedMatrixSpec?.objectPrefix || "ki").trim() || "ki";
    const resolvedCompoundVerbInput = String(compoundVerbInput || "").trim()
        || (
            typeof buildCustomaryAgentiveCompoundEmbedVerbInput === "function"
                ? buildCustomaryAgentiveCompoundEmbedVerbInput({
                    customaryAgentiveStem: normalizedCustomaryAgentiveStem,
                    matrixRoot: normalizedMatrixRoot,
                })
                : `-(${normalizedCustomaryAgentiveStem}/${normalizedMatrixRoot})`
        );
    const verbEl = document.getElementById("verb");
    if (!normalizedCustomaryAgentiveStem || !normalizedMatrixRoot || !resolvedCompoundVerbInput || !verbEl) {
        return false;
    }
    const routeAction = shouldBlockComposerFunctionUseValenceRouteAction({
        dataset: { customaryAgentiveCompoundEmbedContinuation: "true", functionUseContinuation: "true" },
        routeRecordId: "cnv-to-cnn-to-cnv-loop",
        sourceFormulaSlots,
        sourceFormulaEcho,
        objectPrefix: resolvedObjectPrefix,
        grammarFrame,
        sourceRouteFrame,
        routeFrame,
        incorporationRouteFrame,
        objectSlotOwnership,
        functionUseValenceGate,
    });
    if (routeAction.blocked) {
        return blockComposerFunctionUseValenceRouteAction(routeAction.contract, {
            source: "customary-agentive-compound-embed-entry",
            customaryAgentiveStem: normalizedCustomaryAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
            objectPrefix: resolvedObjectPrefix,
        });
    }
    VerbComposerState.mode = VERB_INPUT_MODE.composer;
    VerbComposerState.entryBoard = COMPOSER_ENTRY_BOARD.general;
    VerbComposerState.transitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.lastGeneralTransitivity = COMPOSER_TRANSITIVITY.transitive;
    VerbComposerState.valenceIntransitive = "";
    VerbComposerState.valenceIntransitiveEmbed = "";
    VerbComposerState.valence = "";
    VerbComposerState.valenceEmbedPrimary = "";
    VerbComposerState.valenceSecondary = "";
    VerbComposerState.valenceEmbedSecondary = "";
    VerbComposerState.slotAEmbed = "";
    VerbComposerState.slotAStem = "";
    VerbComposerState.slotBEmbed = normalizedCustomaryAgentiveStem;
    VerbComposerState.slotBStem = normalizedMatrixRoot;
    VerbComposerState.slotCEmbed = "";
    VerbComposerState.slotCStem = "";
    VerbComposerState.directionalPrefix = "";
    VerbComposerState.embedPrefix = normalizedCustomaryAgentiveStem;
    VerbComposerState.supportiveMarker = "";
    VerbComposerState.stem = normalizedMatrixRoot;
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = true;
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        ComposerEmbedOpenState[slotKey] = slotKey === "b";
        ComposerEmbedPreviewState[slotKey] = false;
        COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots?.[slotKey]?.stemInput || null;
        if (stemInput?.dataset?.dropdownTemplateSuffix) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    renderVerbComposerFromState();
    verbEl.value = resolvedCompoundVerbInput;
    if (typeof setCurrentObjectPrefix === "function") {
        setCurrentObjectPrefix(resolvedObjectPrefix);
    } else {
        const objectEl = document.getElementById("object");
        if (objectEl) {
            objectEl.value = resolvedObjectPrefix;
        }
    }
    if (typeof setActiveTenseMode === "function" && typeof TENSE_MODE !== "undefined" && TENSE_MODE?.verbo) {
        setActiveTenseMode(TENSE_MODE.verbo, {
            modeSystem: typeof TENSE_MODE_SYSTEM !== "undefined"
                ? (TENSE_MODE_SYSTEM.nawat || "nawat")
                : "nawat",
            clearRoute: true,
        });
    }
    if (typeof setSelectedTenseTab === "function") {
        setSelectedTenseTab("presente");
    }
    if (typeof updateTenseModeTabs === "function") {
        updateTenseModeTabs();
    }
    if (typeof dispatchAppEvent === "function") {
        dispatchAppEvent("nawat:customary-agentive-compound-embed-applied", {
            customaryAgentiveStem: normalizedCustomaryAgentiveStem,
            matrixRoot: normalizedMatrixRoot,
            matrixSpecId: resolvedMatrixSpecId,
            objectPrefix: resolvedObjectPrefix,
            compoundVerbInput: resolvedCompoundVerbInput,
        });
    }
    const applyButton = document.getElementById("verb-entry-apply");
    if (applyButton && typeof applyButton.click === "function") {
        applyButton.click();
    } else {
        verbEl.dispatchEvent(new Event("input", { bubbles: true }));
        scheduleVerbInputRefresh(verbEl.value, {
            immediate: true,
            source: "customary-agentive-compound-embed-entry",
        });
    }
    return true;
}

function shouldComposerControlChangeRefreshImmediately(source = "") {
    const normalizedSource = String(source || "").trim().toLowerCase();
    if (!normalizedSource) {
        return false;
    }
    if (
        normalizedSource.includes("chip")
        || normalizedSource.includes("button")
        || normalizedSource.includes("toggle")
        || normalizedSource === "supportive"
    ) {
        return true;
    }
    const activeElement = document.activeElement;
    const isTextLikeComposerInput = Boolean(
        activeElement
        && activeElement.tagName === "INPUT"
        && ["text", "search"].includes(String(activeElement.type || "").toLowerCase())
        && activeElement.classList?.contains("verb-composer__input")
        && !activeElement.readOnly
        && !activeElement.disabled
    );
    // Keep typing in composer textboxes debounced; all other interactions refresh now.
    return !isTextLikeComposerInput;
}

function collectComposerStateFromControls({ preserveSupportiveState = false } = {}) {
    const {
        slots,
        transitivitySelect,
        valenceSelectIntransitive,
        valenceSelect,
        valenceSelectSecondary,
        directionalSelect,
        supportiveICheckbox,
    } = getVerbComposerElements();
    if (COMPOSER_TRANSITIVITY_ORDER.includes(transitivitySelect?.value)) {
        VerbComposerState.transitivity = transitivitySelect.value;
    } else if (!isComposerTransitivitySelected()) {
        VerbComposerState.transitivity = "";
    }
    VerbComposerState.valenceIntransitive = normalizeComposerSecondaryValenceSurfaceToken(
        valenceSelectIntransitive?.value || ""
    );
    VerbComposerState.valence = valenceSelect?.value || "";
    VerbComposerState.valenceSecondary = valenceSelectSecondary?.value || "";
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const stateKeys = getComposerSlotStateKeys(slotKey);
        const slotRefs = slots[slotKey] || {};
        const previousStem = normalizeComposerStem(VerbComposerState[stateKeys.stem] || "");
        const nextEmbed = normalizeComposerEmbedValue(slotRefs.embedInput?.value || "");
        let nextStem = getComposerCanonicalStemFromInputValue(
            slotRefs.stemInput?.value || "",
            slotKey
        );
        if (!nextStem && nextEmbed && previousStem) {
            nextStem = previousStem;
        }
        VerbComposerState[stateKeys.embed] = nextEmbed;
        VerbComposerState[stateKeys.stem] = nextStem;
        VerbComposerState[stateKeys.objectEmbed] = normalizeComposerEmbedValue(slotRefs.objectInput?.value || "");
    });
    VerbComposerState.directionalPrefix = directionalSelect?.value || "";
    syncComposerActiveStemAndEmbedFromState();
    VerbComposerState.syllableMode = getComposerStemSyllableCount(getComposerActiveStemValue()) === 1
        ? COMPOSER_SYLLABLE_MODE.monosyllable
        : COMPOSER_SYLLABLE_MODE.multisyllable;
    const supportiveRequested = Boolean(supportiveICheckbox?.checked);
    const currentSupportiveMarker = getComposerSupportiveMarker();
    const candidateSupportiveMarker = getComposerSupportiveMarkerCandidate();
    if (supportiveRequested) {
        VerbComposerState.supportiveMarker = candidateSupportiveMarker
            || (preserveSupportiveState ? currentSupportiveMarker : "")
            || "";
    } else {
        VerbComposerState.supportiveMarker = "";
    }
}

function maybeDeriveComposerStemFromSelectionsSource() {
    if (VerbComposerState.stemManualOverride) {
        return null;
    }
    const sourceBase = normalizeComposerStem(VerbComposerState.sourceBase || "");
    if (!sourceBase) {
        return null;
    }
    const derived = deriveComposerStemFromSelections(sourceBase, VerbComposerState);
    if (derived && derived.stem) {
        setComposerActiveSlotStem(derived.stem);
    }
    return derived;
}

function deriveComposerStemFromSelections(rawBase, state) {
    const baseStem = normalizeComposerStem(rawBase);
    const fallbackStem = normalizeComposerStem(state?.stem || "");
    const result = {
        stem: baseStem || fallbackStem,
        consumed: [],
        warnings: [],
    };
    if (!baseStem) {
        result.warnings.push("No hay base para componer.");
        return result;
    }
    let working = baseStem;
    const directionalPrefix = normalizeComposerStem(state?.directionalPrefix || "");
    if (directionalPrefix) {
        if (working.startsWith(directionalPrefix)) {
            working = working.slice(directionalPrefix.length);
            result.consumed.push(`[${directionalPrefix}]/`);
        } else {
            result.warnings.push(`La base no inicia con el direccional ${directionalPrefix}.`);
        }
    }
    const secondaryPair = state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive
        ? parseComposerSecondaryValenceSelection(state?.valenceSecondary || "")
        : { first: "", second: "" };
    const primaryValence = state?.transitivity === COMPOSER_TRANSITIVITY.intransitive
        ? normalizeComposerStem(state?.valenceIntransitive || "")
        : (
            state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive
                ? normalizeComposerStem(secondaryPair.first || "")
                : normalizeComposerStem(state?.valence || "")
        );
    const secondaryValence = state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive
        ? normalizeComposerStem(secondaryPair.second || "")
        : "";
    const isIntransitiveTa = (
        state?.transitivity === COMPOSER_TRANSITIVITY.intransitive
        && primaryValence === "ta"
    );
    const embedTokens = isIntransitiveTa
        ? []
        : getComposerEmbedTokens(state?.embedPrefix || "");
    embedTokens.forEach((embedToken) => {
        if (working.startsWith(embedToken)) {
            working = working.slice(embedToken.length);
            result.consumed.push(`${embedToken}/`);
            return;
        }
        result.warnings.push(`No se detectó embed ${embedToken}/ en la base.`);
    });
    const valenceItems = [];
    if (state?.transitivity === COMPOSER_TRANSITIVITY.bitransitive) {
        const governingEmbed = normalizeComposerEmbedValue(
            state?.valenceEmbedSecondary || state?.valenceEmbedPrimary || ""
        );
        const governingSlot = !primaryValence ? 1 : (!secondaryValence ? 2 : 0);
        valenceItems.push({
            token: primaryValence,
            embed: governingSlot === 1 ? governingEmbed : "",
            embedSeparator: primaryValence ? "/" : "-",
        });
        valenceItems.push({
            token: secondaryValence,
            embed: governingSlot === 2 ? governingEmbed : "",
            embedSeparator: secondaryValence ? "/" : "-",
        });
    } else {
        if (primaryValence) {
            valenceItems.push({
                token: primaryValence,
                embed: state?.transitivity === COMPOSER_TRANSITIVITY.intransitive
                    ? normalizeComposerEmbedValue(state?.valenceIntransitiveEmbed || "")
                    : normalizeComposerEmbedValue(state?.valenceEmbedPrimary || ""),
                embedSeparator: "/",
            });
        } else {
            const dashEmbed = normalizeComposerEmbedValue(state?.valenceEmbedPrimary || "");
            if (dashEmbed) {
                valenceItems.push({
                    token: "",
                    embed: dashEmbed,
                    embedSeparator: "-",
                });
            }
        }
        if (secondaryValence) {
            valenceItems.push({
                token: secondaryValence,
                embed: normalizeComposerEmbedValue(state?.valenceEmbedSecondary || ""),
                embedSeparator: "/",
            });
        }
    }
    valenceItems.forEach(({ token: valenceToken, embed: valenceEmbed, embedSeparator = "/" }) => {
        const embedTokensForValence = getComposerEmbedTokens(valenceEmbed);
        embedTokensForValence.forEach((embedToken) => {
            if (working.startsWith(embedToken)) {
                working = working.slice(embedToken.length);
                result.consumed.push(`${embedToken}${embedSeparator}`);
                return;
            }
            const valenceLabel = valenceToken || "valencia sin prefijo";
            result.warnings.push(`No se detectó embed ${embedToken}${embedSeparator} para ${valenceLabel}.`);
        });
        if (!valenceToken) {
            return;
        }
        if (working.startsWith(valenceToken)) {
            working = working.slice(valenceToken.length);
            result.consumed.push(`${valenceToken}-`);
            return;
        }
        result.warnings.push(`No se detectó ${valenceToken}- después de los prefijos iniciales.`);
    });
    if (isIntransitiveTa) {
        const postTaEmbedTokens = getComposerEmbedTokens(state?.embedPrefix || "");
        postTaEmbedTokens.forEach((embedToken) => {
            if (working.startsWith(embedToken)) {
                working = working.slice(embedToken.length);
                result.consumed.push(`${embedToken}/`);
                return;
            }
            result.warnings.push(`No se detectó embed ${embedToken}/ después de ta/.`);
        });
    }
    if (!working) {
        result.stem = fallbackStem || baseStem;
        result.warnings.push("No quedó raíz tras aplicar las selecciones.");
        return result;
    }
    result.stem = working;
    return result;
}

function applyComposerSyllableModeDefaultFromStem() {
    const syllableCount = getComposerStemSyllableCount(getComposerActiveStemValue());
    VerbComposerState.syllableMode = syllableCount === 1
        ? COMPOSER_SYLLABLE_MODE.monosyllable
        : COMPOSER_SYLLABLE_MODE.multisyllable;
}

function updateCalcInputModeButtons() {
    // Older input-mode buttons were removed when visible regex and composer display converged.
}

function setComposerEntryBoard(board = "", options = {}) {
    const nextBoard = normalizeComposerEntryBoard(board);
    const currentBoard = getComposerEntryBoard();
    if (currentBoard === nextBoard && options.force !== true) {
        return;
    }
    const verbEl = document.getElementById("verb");
    if (!VerbComposerState.isApplying) {
        syncComposerStateFromVerbInput(verbEl?.value || "");
    }
    captureComposerEntryBoardSlotAState(currentBoard);
    if (currentBoard === COMPOSER_ENTRY_BOARD.general) {
        VerbComposerState.lastGeneralTransitivity = VerbComposerState.transitivity;
    } else if (currentBoard === COMPOSER_ENTRY_BOARD.nounToVerb) {
        VerbComposerState.lastNounToVerbTransitivity = VerbComposerState.transitivity;
    }
    VerbComposerState.entryBoard = nextBoard;
    if (nextBoard === COMPOSER_ENTRY_BOARD.nounToVerb) {
        VerbComposerState.transitivity = COMPOSER_TRANSITIVITY_ORDER.includes(
            VerbComposerState.lastNounToVerbTransitivity
        )
            ? VerbComposerState.lastNounToVerbTransitivity
            : "";
    } else if (
        currentBoard === COMPOSER_ENTRY_BOARD.nounToVerb
        && VerbComposerState.lastGeneralTransitivity
        && COMPOSER_TRANSITIVITY_ORDER.includes(VerbComposerState.lastGeneralTransitivity)
    ) {
        VerbComposerState.transitivity = VerbComposerState.lastGeneralTransitivity;
    }
    restoreComposerEntryBoardSlotAState(nextBoard);
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({
        triggerGenerate: true,
        immediateRefresh: true,
    });
}

function populateComposerDirectionalOptions() {
    const { directionalSelect } = getVerbComposerElements();
    if (!directionalSelect) {
        return;
    }
    const previousValue = directionalSelect.value || VerbComposerState.directionalPrefix || "";
    directionalSelect.innerHTML = "";
    const baseOption = document.createElement("option");
    baseOption.value = "";
    baseOption.textContent = "Sin direccional";
    directionalSelect.appendChild(baseOption);
    const prefixes = Array.from(new Set(DIRECTIONAL_PREFIXES.filter(Boolean)));
    prefixes.forEach((prefix) => {
        const option = document.createElement("option");
        option.value = prefix;
        option.textContent = prefix;
        directionalSelect.appendChild(option);
    });
    directionalSelect.value = prefixes.includes(previousValue) ? previousValue : "";
    syncComposerChipGroupsFromState();
}

function setVerbInputMode(mode, options = {}) {
    const currentMode = VERB_INPUT_MODE.composer;
    const nextMode = VERB_INPUT_MODE.composer;
    void mode;
    VerbComposerState.mode = nextMode;
    const shouldSync = options.syncFromInput !== false;
    const verbEl = document.getElementById("verb");
    if (shouldSync) {
        syncComposerStateFromVerbInput(verbEl?.value || "");
    }
    renderVerbComposerFromState();
    if (verbEl) {
        const composerDisplayBundle = buildComposerModeBundle(
            VerbComposerState,
            verbEl.value || ""
        );
        const nextDisplayValue = composerDisplayBundle.regexValue
            || serializeRegexInputValue(verbEl.value || "");
        if (nextDisplayValue !== verbEl.value) {
            verbEl.value = nextDisplayValue;
            verbEl.dataset.prevValue = nextDisplayValue;
            if (typeof renderVerbMirror === "function") {
                renderVerbMirror();
            }
        }
    }
    clearVerbDisambiguation();
    dispatchAppEvent("app:verb-input-mode-changed", { mode: nextMode });
}

function bindComposerStemTabNavigation(pairs = []) {
    // Tab behavior is managed by the global keyboard handler:
    // it now cycles between main verb input and active composer textbox.
    void pairs;
}

function onVerbComposerControlChange(source = "") {
    if (!isVerbInputModeComposer()) {
        return;
    }
    const verbEl = document.getElementById("verb");
    if (source === "supportive") {
        const supportiveControl = getVerbComposerElements().supportiveICheckbox;
        const supportiveOn = supportiveControl
            ? Boolean(supportiveControl.checked)
            : hasSupportiveMarkerValue(getComposerSupportiveMarker());
        // Keep optional-i scoped to the matrix stem composition path.
        // Wrapping the first global "i" can target embeds or valence segments.
        VerbComposerState.supportiveMarker = supportiveOn
            ? (getComposerSupportiveMarkerCandidate() || getComposerSupportiveMarker() || "")
            : "";
        collectComposerStateFromControls({ preserveSupportiveState: true });
        VerbComposerState.supportiveMarker = supportiveOn
            ? (getComposerSupportiveMarkerCandidate() || getComposerSupportiveMarker() || "")
            : "";
        maybeDeriveComposerStemFromSelectionsSource();
        applyComposerSyllableModeDefaultFromStem();
        syncComposerValenceAvailability();
        renderVerbComposerFromState();
        applyComposerStateToVerbInput({ triggerGenerate: true, immediateRefresh: true });
        void verbEl;
        return;
    }
    collectComposerStateFromControls();
    let refreshedManualMatrixStem = false;
    if (source === "matrix-stem") {
        VerbComposerState.stemManualOverride = true;
    } else {
        refreshedManualMatrixStem = maybeRefreshComposerManualMatrixStemFromEmbed();
        maybeDeriveComposerStemFromSelectionsSource();
    }
    if (source === "matrix-stem") {
        applyComposerSyllableModeDefaultFromStem();
    } else if (!VerbComposerState.stemManualOverride || refreshedManualMatrixStem) {
        applyComposerSyllableModeDefaultFromStem();
    }
    syncComposerValenceAvailability();
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({
        triggerGenerate: true,
        immediateRefresh: shouldComposerControlChangeRefreshImmediately(source),
    });
}

function clearVerbComposerTextboxInputs() {
    if (!isVerbInputModeComposer()) {
        return;
    }
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const stateKeys = getComposerSlotStateKeys(slotKey);
        ComposerEmbedOpenState[slotKey] = false;
        ComposerEmbedPreviewState[slotKey] = false;
        VerbComposerState[stateKeys.embed] = "";
        VerbComposerState[stateKeys.stem] = "";
        VerbComposerState[stateKeys.objectEmbed] = "";
        COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
        COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        const stemInput = getVerbComposerElements().slots[slotKey]?.stemInput || null;
        if (stemInput) {
            delete stemInput.dataset.dropdownTemplateSuffix;
        }
    });
    Object.values(ComposerEntryBoardSlotAState).forEach((snapshot) => {
        Object.values(snapshot.slots || {}).forEach((slotSnapshot) => {
            slotSnapshot.stem = "";
            slotSnapshot.embed = "";
            slotSnapshot.serialType = "auto";
            slotSnapshot.templateSuffix = "";
            slotSnapshot.templateSurface = "";
            slotSnapshot.templateTiCausativeClass = "";
        });
    });
    VerbComposerState.embedPrefix = "";
    VerbComposerState.sourceBase = "";
    VerbComposerState.stemManualOverride = false;
    VerbComposerState.syllableMode = COMPOSER_SYLLABLE_MODE.multisyllable;
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({ triggerGenerate: true });
}

function isEditableTextInput(element) {
    return Boolean(
        element
        && element.tagName === "INPUT"
        && element.type === "text"
        && !element.disabled
        && !element.readOnly
    );
}

function isFocusableTextInput(element, options = {}) {
    const allowReadOnly = options.allowReadOnly === true;
    return Boolean(
        element
        && element.tagName === "INPUT"
        && element.type === "text"
        && !element.disabled
        && (allowReadOnly || !element.readOnly)
    );
}

function dispatchTextInputUpdate(element) {
    if (!element) {
        return;
    }
    element.dispatchEvent(new Event("input", { bubbles: true }));
}

function removeLastTextUnit(value) {
    const units = splitVerbLetters(String(value || ""));
    if (units.length <= 1) {
        return "";
    }
    return units.slice(0, -1).join("");
}

function getComposerPreferredEntryInput() {
    const { matrixStemInput, embedStemInput } = getVerbComposerElements();
    return matrixStemInput || embedStemInput || null;
}

function getComposerSlotEntryTargetInput() {
    const inputId = String(ComposerVerbSlotEntryTarget?.inputId || "");
    const inputEl = inputId ? document.getElementById(inputId) : null;
    if (inputEl && getComposerSlotInputDescriptor(inputEl)) {
        return inputEl;
    }
    return getComposerPreferredEntryInput();
}

function clearComposerSlotEntryTarget() {
    ComposerVerbSlotEntryTarget = null;
    syncComposerSlotEntryButtons();
}

function getComposerSlotEntryStateValue(inputEl = null, descriptor = null) {
    const resolvedDescriptor = descriptor || getComposerSlotInputDescriptor(inputEl);
    if (!resolvedDescriptor) {
        return "";
    }
    const rawValue = VerbComposerState[resolvedDescriptor.stateKey] || "";
    if (resolvedDescriptor.role === "stem") {
        return formatComposerStemForInputDisplay(normalizeComposerStem(rawValue), {
            slotKey: resolvedDescriptor.slotKey,
            preferSplitFromStem: true,
            templateSuffix: getComposerStemInputTemplateSuffix(inputEl, resolvedDescriptor.slotKey),
            surfaceValue: COMPOSER_TEMPLATE_SURFACE_BY_SLOT[resolvedDescriptor.slotKey] || "",
        });
    }
    return normalizeComposerEmbedValue(rawValue);
}

function getComposerSlotEntryTargetSelection(inputEl = null) {
    const inputId = String(inputEl?.id || "");
    if (!inputId || ComposerVerbSlotEntryTarget?.inputId !== inputId) {
        const length = getComposerSlotEntryStateValue(inputEl).length;
        return { start: length, end: length };
    }
    const valueLength = getComposerSlotEntryStateValue(inputEl).length;
    const start = Math.max(0, Math.min(Number(ComposerVerbSlotEntryTarget.selectionStart) || 0, valueLength));
    const end = Math.max(start, Math.min(Number(ComposerVerbSlotEntryTarget.selectionEnd) || start, valueLength));
    return { start, end };
}

function setComposerSlotEntryTarget(inputEl = null, options = {}) {
    if (!inputEl || !getComposerSlotInputDescriptor(inputEl)) {
        clearComposerSlotEntryTarget();
        return false;
    }
    const valueLength = getComposerSlotEntryStateValue(inputEl).length;
    const selectAll = options.selectAll !== false;
    const start = selectAll ? 0 : valueLength;
    const end = selectAll ? valueLength : valueLength;
    ComposerVerbSlotEntryTarget = {
        inputId: inputEl.id,
        selectionStart: start,
        selectionEnd: end,
    };
    syncComposerSlotEntryButtons();
    return true;
}

function getComposerVerbInputRangeForSlot(inputEl = null, verbValueOverride = null) {
    const verbEl = document.getElementById("verb");
    if (!verbEl || !inputEl) {
        return null;
    }
    const descriptor = getComposerSlotInputDescriptor(inputEl);
    const verbValue = verbValueOverride === null
        ? String(verbEl.value || "")
        : String(verbValueOverride || "");
    const slotValue = getComposerSlotEntryStateValue(inputEl, descriptor).trim();
    if (slotValue) {
        const index = descriptor?.role === "stem"
            ? verbValue.lastIndexOf(slotValue)
            : verbValue.indexOf(slotValue);
        if (index >= 0) {
            return { start: index, end: index + slotValue.length };
        }
    }
    const writable = getVerbInputWritableSelection(verbValue);
    if (writable) {
        return writable;
    }
    const end = verbValue.length;
    return { start: end, end };
}

function focusComposerSlotEntryTarget(inputEl = null, options = {}) {
    const targetInput = inputEl || getComposerSlotEntryTargetInput();
    if (!targetInput || !setComposerSlotEntryTarget(targetInput, options)) {
        return focusVisibleVerbSurfaceAtEnd();
    }
    const verbEl = document.getElementById("verb");
    if (!isFocusableTextInput(verbEl, { allowReadOnly: true }) || typeof verbEl.focus !== "function") {
        return false;
    }
    verbEl.focus();
    const range = getComposerVerbInputRangeForSlot(targetInput);
    if (range && typeof verbEl.setSelectionRange === "function") {
        const selection = getComposerSlotEntryTargetSelection(targetInput);
        const valueLength = getComposerSlotEntryStateValue(targetInput).length;
        const startOffset = Math.max(0, Math.min(selection.start, valueLength));
        const endOffset = Math.max(startOffset, Math.min(selection.end, valueLength));
        const rangeText = String(verbEl.value || "").slice(range.start, range.end);
        if (!valueLength && /^_+/.test(rangeText)) {
            verbEl.setSelectionRange(range.start, range.end);
        } else {
            verbEl.setSelectionRange(range.start + startOffset, range.start + endOffset);
        }
    }
    return true;
}

function getComposerSlotEntryButtonForInput(inputEl = null) {
    const inputId = String(inputEl?.id || "");
    if (!inputId) {
        return null;
    }
    const selector = `.verb-composer__slot-entry-button[data-composer-slot-input-id="${escapeAttributeSelectorValue(inputId)}"]`;
    return inputEl.closest(".verb-composer__tagged-input-shell")?.querySelector(selector) || null;
}

function buildComposerSlotEntryButton(inputEl = null) {
    if (!inputEl || !inputEl.id) {
        return null;
    }
    const descriptor = getComposerSlotInputDescriptor(inputEl);
    if (!descriptor) {
        return null;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "verb-composer__slot-entry-button";
    button.dataset.composerSlotInputId = inputEl.id;
    button.dataset.composerSlotRole = descriptor.role;
    button.dataset.composerSlotKey = descriptor.slotKey;
    button.setAttribute("aria-controls", "verb");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        focusComposerSlotEntryTarget(inputEl, { selectAll: true });
    });
    const label = document.createElement("span");
    label.className = "verb-composer__slot-entry-label";
    const value = document.createElement("span");
    value.className = "verb-composer__slot-entry-value";
    button.appendChild(label);
    button.appendChild(value);
    return button;
}

function getComposerSlotEntryButtonLabel(inputEl = null, descriptor = null) {
    const field = inputEl?.closest?.(".verb-composer__stem-field, .verb-composer__matrix-field, .verb-composer__bottom-field") || null;
    const directSubLabel = Array.from(field?.children || [])
        .find((child) => child?.classList?.contains("verb-composer__sub-label"));
    const directText = String(directSubLabel?.textContent || "").trim();
    const matrixText = String(field?.querySelector?.(".verb-composer__matrix-head > .verb-composer__sub-label")?.textContent || "").trim();
    const tagText = String(inputEl?.closest?.(".verb-composer__tagged-input-shell")?.querySelector?.(".verb-composer__tagged-input-tag")?.textContent || "").trim();
    if (descriptor?.role === "stem") {
        return matrixText || directText || getComposerMatrixFieldLabel({
            ordinaryNncActive: typeof isOrdinaryNncGenerationModeEnabled === "function"
                && isOrdinaryNncGenerationModeEnabled(),
            activeBoard: getComposerEntryBoard(),
        });
    }
    return directText || matrixText || tagText || getComposerSlotEntryRoleLabel(descriptor?.role);
}

function isComposerOrdinaryNncStemSlot(inputEl = null, descriptor = null) {
    const resolvedDescriptor = descriptor || getComposerSlotInputDescriptor(inputEl);
    return Boolean(
        resolvedDescriptor?.role === "stem"
        && (
            getComposerEntryBoard() === "ordinary-nnc"
            || (
                typeof isOrdinaryNncGenerationModeEnabled === "function"
                && isOrdinaryNncGenerationModeEnabled()
            )
        )
    );
}

function getComposerSlotEntryButtonVisibleText(inputEl = null, descriptor = null, value = "") {
    const normalizedValue = String(value || "").trim();
    if (isComposerOrdinaryNncStemSlot(inputEl, descriptor)) {
        return normalizedValue ? `(${normalizedValue})` : "";
    }
    return getComposerSlotEntryButtonLabel(inputEl, descriptor);
}

function syncComposerSlotEntryButton(inputEl = null) {
    if (!inputEl || !inputEl.id || !getComposerSlotInputDescriptor(inputEl)) {
        return;
    }
    const shell = inputEl.closest(".verb-composer__tagged-input-shell");
    if (!shell || typeof shell.querySelector !== "function" || typeof shell.appendChild !== "function") {
        return;
    }
    inputEl.classList.add("is-hidden-control");
    inputEl.tabIndex = -1;
    inputEl.setAttribute("aria-hidden", "true");
    const descriptor = getComposerSlotInputDescriptor(inputEl);
    const field = inputEl.closest(".verb-composer__stem-field, .verb-composer__matrix-field, .verb-composer__bottom-field");
    shell.classList.add("has-slot-entry-button");
    field?.classList?.add("has-slot-entry-button");
    const labelText = getComposerSlotEntryButtonLabel(inputEl, descriptor);
    let button = getComposerSlotEntryButtonForInput(inputEl);
    if (!button) {
        button = buildComposerSlotEntryButton(inputEl);
        if (!button) {
            return;
        }
        shell.appendChild(button);
    }
    const value = getComposerSlotEntryStateValue(inputEl, descriptor).trim();
    const visibleText = getComposerSlotEntryButtonVisibleText(inputEl, descriptor, value);
    const labelNode = button.querySelector(".verb-composer__slot-entry-label");
    const valueNode = button.querySelector(".verb-composer__slot-entry-value");
    if (labelNode) {
        labelNode.textContent = visibleText;
    }
    if (valueNode) {
        valueNode.textContent = "";
    }
    button.classList.toggle("is-empty", !value);
    button.classList.toggle("is-active", ComposerVerbSlotEntryTarget?.inputId === inputEl.id);
    button.setAttribute("aria-pressed", String(ComposerVerbSlotEntryTarget?.inputId === inputEl.id));
    button.title = `${labelText}: escribir en #verb`;
    button.setAttribute("aria-label", `${labelText}, escribir en entrada principal`);
}

function syncComposerSlotEntryButtons() {
    if (typeof document === "undefined") {
        return;
    }
    const { slots } = getVerbComposerElements();
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const slotRefs = slots[slotKey] || {};
        [
            slotRefs.embedInput || null,
            slotRefs.stemInput || null,
            slotRefs.objectInput || null,
        ].forEach(syncComposerSlotEntryButton);
    });
}

function getComposerSlotEntryInsertionText(event) {
    if (event.inputType === "insertFromPaste") {
        return event.clipboardData?.getData("text/plain")
            || event.dataTransfer?.getData("text/plain")
            || event.data
            || "";
    }
    return event.data || "";
}

function getComposerDeleteForwardValue(value = "", end = 0) {
    const before = String(value || "").slice(0, end);
    const after = String(value || "").slice(end);
    const units = splitVerbLetters(after);
    return before + units.slice(1).join("");
}

function applyComposerSlotEntryTargetInputValue(targetInput = null, nextValue = "") {
    const descriptor = getComposerSlotInputDescriptor(targetInput);
    if (!targetInput || !descriptor) {
        return false;
    }
    targetInput.value = nextValue;
    if (descriptor.role === "stem") {
        VerbComposerState.stemManualOverride = true;
    }
    collectComposerStateFromControls();
    let refreshedManualMatrixStem = false;
    if (descriptor.role === "stem") {
        applyComposerSyllableModeDefaultFromStem();
    } else {
        refreshedManualMatrixStem = maybeRefreshComposerManualMatrixStemFromEmbed();
        maybeDeriveComposerStemFromSelectionsSource();
        if (!VerbComposerState.stemManualOverride || refreshedManualMatrixStem) {
            applyComposerSyllableModeDefaultFromStem();
        }
    }
    syncComposerValenceAvailability();
    renderVerbComposerFromState();
    applyComposerStateToVerbInput({
        triggerGenerate: true,
        immediateRefresh: true,
    });
    return true;
}

function handleComposerVerbSlotBeforeInput(event) {
    if (
        !isVerbInputModeComposer()
        || !ComposerVerbSlotEntryTarget?.inputId
        || event?.target?.id !== "verb"
        || event.isComposing
    ) {
        return false;
    }
    const targetInput = document.getElementById(ComposerVerbSlotEntryTarget.inputId);
    if (!targetInput || !getComposerSlotInputDescriptor(targetInput)) {
        clearComposerSlotEntryTarget();
        return false;
    }
    const inputType = String(event.inputType || "");
    const currentValue = String(targetInput.value || "");
    const selection = getComposerSlotEntryTargetSelection(targetInput);
    let nextValue = currentValue;
    let nextCaret = selection.start;
    if (inputType.startsWith("insert")) {
        const insertion = getComposerSlotEntryInsertionText(event);
        if (!insertion) {
            return false;
        }
        nextValue = currentValue.slice(0, selection.start)
            + insertion
            + currentValue.slice(selection.end);
        nextCaret = selection.start + insertion.length;
    } else if (inputType === "deleteContentBackward") {
        if (selection.start !== selection.end) {
            nextValue = currentValue.slice(0, selection.start) + currentValue.slice(selection.end);
            nextCaret = selection.start;
        } else if (selection.start > 0) {
            const before = currentValue.slice(0, selection.start);
            const nextBefore = removeLastTextUnit(before);
            nextValue = nextBefore + currentValue.slice(selection.end);
            nextCaret = nextBefore.length;
        }
    } else if (inputType === "deleteContentForward") {
        if (selection.start !== selection.end) {
            nextValue = currentValue.slice(0, selection.start) + currentValue.slice(selection.end);
            nextCaret = selection.start;
        } else {
            nextValue = getComposerDeleteForwardValue(currentValue, selection.end);
            nextCaret = selection.start;
        }
    } else {
        return false;
    }
    event.preventDefault();
    if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
    }
    ComposerVerbSlotEntryTarget.selectionStart = nextCaret;
    ComposerVerbSlotEntryTarget.selectionEnd = nextCaret;
    applyComposerSlotEntryTargetInputValue(targetInput, nextValue);
    focusComposerSlotEntryTarget(targetInput, { selectAll: false });
    return true;
}

function handleComposerVerbSlotInput(event) {
    if (
        ComposerVerbSlotEntryInputSyncing
        || VerbComposerState.isApplying
        || !isVerbInputModeComposer()
        || !ComposerVerbSlotEntryTarget?.inputId
        || event?.target?.id !== "verb"
        || event.isComposing
    ) {
        return false;
    }
    const targetInput = document.getElementById(ComposerVerbSlotEntryTarget.inputId);
    if (!targetInput || !getComposerSlotInputDescriptor(targetInput)) {
        clearComposerSlotEntryTarget();
        return false;
    }
    const verbEl = event.target;
    const previousVerbValue = ComposerVerbSlotEntryLastVerbValue;
    const nextVerbValue = String(verbEl.value || "");
    if (previousVerbValue === nextVerbValue) {
        ComposerVerbSlotEntryLastVerbValue = nextVerbValue;
        return false;
    }
    const range = getComposerVerbInputRangeForSlot(targetInput, previousVerbValue);
    if (!range) {
        ComposerVerbSlotEntryLastVerbValue = nextVerbValue;
        return false;
    }
    const prefix = previousVerbValue.slice(0, range.start);
    const suffix = previousVerbValue.slice(range.end);
    if (!nextVerbValue.startsWith(prefix) || !nextVerbValue.endsWith(suffix)) {
        clearComposerSlotEntryTarget();
        return false;
    }
    const nextSlotValue = nextVerbValue.slice(prefix.length, nextVerbValue.length - suffix.length);
    const selectionStart = typeof verbEl.selectionStart === "number"
        ? verbEl.selectionStart
        : prefix.length + nextSlotValue.length;
    const nextCaret = Math.max(0, Math.min(selectionStart - prefix.length, nextSlotValue.length));
    ComposerVerbSlotEntryInputSyncing = true;
    try {
        ComposerVerbSlotEntryTarget.selectionStart = nextCaret;
        ComposerVerbSlotEntryTarget.selectionEnd = nextCaret;
        applyComposerSlotEntryTargetInputValue(targetInput, nextSlotValue);
        focusComposerSlotEntryTarget(targetInput, { selectAll: false });
    } finally {
        ComposerVerbSlotEntryInputSyncing = false;
    }
    return true;
}

function getComposerStemInputPreferredCaret(inputEl) {
    if (!isEditableTextInput(inputEl)) {
        return null;
    }
    const slotKey = getComposerSlotKeyByStemInput(inputEl);
    if (!slotKey) {
        return null;
    }
    const rawValue = String(inputEl.value || "");
    const normalizedStem = normalizeComposerStem(rawValue);
    const inferredSpec = getComposerSerialSpecFromStem(normalizedStem);
    const displaySpec = getComposerSerialDisplaySpec({
        slotKey,
        normalizedStem,
        inferredSpec,
    });
    const slotCount = Math.max(1, Number(displaySpec.slotCount || 1));
    if (slotCount <= 1) {
        return rawValue.length;
    }
    const segments = rawValue.includes("-")
        ? sanitizeComposerSerialSegmentsFromRaw(rawValue, slotCount, displaySpec.selectedType)
        : buildComposerLockedSerialSegmentsFromStem(normalizedStem, slotCount, {
            preferSplitFromStem: true,
            selectedType: displaySpec.selectedType,
        });
    const lockedSegments = applyComposerSerialFixedSegments(
        segments,
        displaySpec.selectedType,
        slotCount
    );
    const maskedSegments = getComposerMaskedSerialSegments(lockedSegments, slotCount);
    const targetSegmentIndex = resolveComposerSerialEditableSegmentIndex(
        displaySpec.selectedType,
        slotCount,
        slotCount - 1
    );
    let caret = 0;
    for (let index = 0; index < targetSegmentIndex; index += 1) {
        const segment = maskedSegments[index] || "";
        caret += segment.length;
    }
    const activeSegment = maskedSegments[targetSegmentIndex] || "";
    if (!isComposerSerialPlaceholderSegment(activeSegment)) {
        caret += activeSegment.length;
    }
    return Math.max(0, Math.min(caret, rawValue.length));
}

function getVerbInputWritableSelection(value = "") {
    const rawValue = String(value || "");
    if (!rawValue) {
        return null;
    }
    const placeholderMatch = rawValue.match(/_+[a-z0-9]*/i);
    if (!placeholderMatch || typeof placeholderMatch.index !== "number") {
        return null;
    }
    return {
        start: placeholderMatch.index,
        end: placeholderMatch.index + placeholderMatch[0].length,
    };
}

function applyVerbInputWritableSelection(inputEl, options = {}) {
    if (!isFocusableTextInput(inputEl, { allowReadOnly: true }) || typeof inputEl.setSelectionRange !== "function") {
        return false;
    }
    const selection = getVerbInputWritableSelection(inputEl.value);
    if (!selection) {
        return false;
    }
    const force = options.force === true;
    const valueLength = String(inputEl.value || "").length;
    const selectionStart = typeof inputEl.selectionStart === "number"
        ? inputEl.selectionStart
        : valueLength;
    const selectionEnd = typeof inputEl.selectionEnd === "number"
        ? inputEl.selectionEnd
        : selectionStart;
    const isWholeValueSelected = selectionStart === 0 && selectionEnd === valueLength;
    const isAtValueEnd = selectionStart === valueLength && selectionEnd === valueLength;
    if (!force && !isWholeValueSelected && !isAtValueEnd) {
        return false;
    }
    inputEl.setSelectionRange(selection.start, selection.end);
    return true;
}

function focusTextInputAtEnd(inputEl) {
    if (!isFocusableTextInput(inputEl, { allowReadOnly: true }) || typeof inputEl.focus !== "function") {
        return false;
    }
    inputEl.focus();
    if (typeof inputEl.setSelectionRange === "function") {
        const preferredCaret = getComposerStemInputPreferredCaret(inputEl);
        const caret = Number.isFinite(preferredCaret)
            ? Number(preferredCaret)
            : String(inputEl.value || "").length;
        inputEl.setSelectionRange(caret, caret);
    }
    return true;
}

function isComposerTextboxInputElement(element) {
    return Boolean(
        isEditableTextInput(element)
        && element.classList?.contains("verb-composer__input")
    );
}

function getComposerAvailableTextboxForKeyboardNavigation() {
    if (!isVerbInputModeComposer()) {
        return null;
    }
    const { matrixStemInput, embedStemInput } = getVerbComposerElements();
    const candidates = [matrixStemInput, embedStemInput].filter(Boolean);
    for (let index = 0; index < candidates.length; index += 1) {
        const candidate = candidates[index];
        if (!isEditableTextInput(candidate)) {
            continue;
        }
        if (candidate.getAttribute("aria-hidden") === "true") {
            continue;
        }
        if (candidate.hidden) {
            continue;
        }
        return candidate;
    }
    return null;
}

function handleVerbTextboxTabShortcut(event) {
    const isTabKey = event.key === "Tab"
        && !event.altKey
        && !event.ctrlKey
        && !event.metaKey;
    if (!isTabKey) {
        return false;
    }
    const verbEl = document.getElementById("verb");
    const composerTextbox = getComposerAvailableTextboxForKeyboardNavigation();
    if (
        !isFocusableTextInput(verbEl, { allowReadOnly: true })
        || !isFocusableTextInput(composerTextbox, { allowReadOnly: true })
    ) {
        return false;
    }
    const activeElement = document.activeElement;
    const activeIsVerb = activeElement === verbEl;
    const activeIsComposerTextbox = activeElement === composerTextbox
        || isComposerTextboxInputElement(activeElement);
    if (!activeIsVerb && !activeIsComposerTextbox) {
        return false;
    }
    const nextTarget = activeIsVerb ? composerTextbox : verbEl;
    if (!focusTextInputAtEnd(nextTarget)) {
        return false;
    }
    event.preventDefault();
    event.stopPropagation();
    return true;
}

function shouldLetNativeEnterSelectControl(element) {
    if (!element || typeof element !== "object") {
        return false;
    }
    const tagName = String(element.tagName || "").toUpperCase();
    if (tagName === "BUTTON" || tagName === "SELECT" || tagName === "TEXTAREA") {
        return true;
    }
    if (tagName === "A" && typeof element.getAttribute === "function" && element.getAttribute("href")) {
        return true;
    }
    if (tagName === "INPUT") {
        const type = String(element.type || "").toLowerCase();
        // Text-like inputs should keep Enter fallback behavior (generate).
        const textLikeTypes = new Set(["", "text", "search", "url", "tel", "email", "password", "number"]);
        if (!textLikeTypes.has(type)) {
            return true;
        }
    }
    if (typeof element.getAttribute === "function" && element.getAttribute("role") === "button") {
        return true;
    }
    return false;
}

function escapeAttributeSelectorValue(value = "") {
    return String(value || "")
        .replace(/\\/g, "\\\\")
        .replace(/"/g, "\\\"");
}

function isDisplayOnlyVerbMirrorElement(element) {
    void element;
    return false;
}

function shouldLetNativeSpaceBehavior(element) {
    if (!element || typeof element !== "object") {
        return false;
    }
    if (isDisplayOnlyVerbMirrorElement(element)) {
        return false;
    }
    if (isEditableTextInput(element)) {
        return true;
    }
    if (element.isContentEditable) {
        return true;
    }
    if (typeof element.closest === "function" && element.closest("[contenteditable=\"true\"]")) {
        return true;
    }
    if (shouldLetNativeEnterSelectControl(element)) {
        return true;
    }
    if (typeof element.getAttribute === "function") {
        const role = String(element.getAttribute("role") || "").toLowerCase();
        if (
            role === "tab"
            || role === "option"
            || role === "menuitem"
            || role === "switch"
            || role === "checkbox"
            || role === "radio"
        ) {
            return true;
        }
    }
    return false;
}

function shouldLetNativeDeleteBehavior(element) {
    if (!element || typeof element !== "object") {
        return false;
    }
    if (isDisplayOnlyVerbMirrorElement(element)) {
        return false;
    }
    if (isEditableTextInput(element)) {
        return true;
    }
    if (element.isContentEditable) {
        return true;
    }
    if (typeof element.closest === "function" && element.closest("[contenteditable=\"true\"]")) {
        return true;
    }
    return false;
}

function captureTenseTabsFocusState(container) {
    if (!container) {
        return null;
    }
    const activeElement = document.activeElement;
    if (!activeElement || !container.contains(activeElement)) {
        return null;
    }
    if (typeof activeElement.getAttribute !== "function") {
        return null;
    }
    const tenseValue = activeElement.getAttribute("data-tense-value");
    if (tenseValue) {
        return {
            type: "tense-button",
            tenseValue,
            tenseGroup: activeElement.getAttribute("data-tense-group") || "",
            tenseColumn: activeElement.getAttribute("data-tense-column") || "",
        };
    }
    if (activeElement.id) {
        return {
            type: "id",
            id: activeElement.id,
        };
    }
    return null;
}

function restoreTenseTabsFocusState(container, focusState) {
    if (!container || !focusState) {
        return;
    }
    let target = null;
    if (focusState.type === "tense-button" && focusState.tenseValue) {
        const selectorParts = [
            `[data-tense-value="${escapeAttributeSelectorValue(focusState.tenseValue)}"]`,
        ];
        if (focusState.tenseGroup) {
            selectorParts.push(`[data-tense-group="${escapeAttributeSelectorValue(focusState.tenseGroup)}"]`);
        }
        if (focusState.tenseColumn) {
            selectorParts.push(`[data-tense-column="${escapeAttributeSelectorValue(focusState.tenseColumn)}"]`);
        }
        target = container.querySelector(selectorParts.join(""));
    } else if (focusState.type === "id" && focusState.id) {
        const byId = document.getElementById(focusState.id);
        if (byId && container.contains(byId)) {
            target = byId;
        }
    }
    if (!target || target.disabled || typeof target.focus !== "function") {
        return;
    }
    target.focus({ preventScroll: true });
}

function serializeTenseGroupRows(groups = [], visibleTenseSet = new Set()) {
    return groups
        .map((group) => {
            const tenses = (group?.tenses || []).filter((tenseValue) => visibleTenseSet.has(tenseValue));
            if (!tenses.length) {
                return "";
            }
            return `${group?.heading || ""}:${tenses.join(",")}`;
        })
        .filter(Boolean)
        .join("|");
}

function getVerbSemanticTenseGroupKey(tenseValue = "") {
    const tense = String(tenseValue || "").trim().toLowerCase();
    if (!tense) {
        return "past";
    }
    if (
        typeof ACTIVE_ADJECTIVE_TENSE_SET !== "undefined"
        && ACTIVE_ADJECTIVE_TENSE_SET.has(tense)
    ) {
        return "adjectival";
    }
    if (tense === "pasado-remoto-adverbio-activo") {
        return "adverbial";
    }
    if (tense === "optativo") {
        return "optative";
    }
    if (tense.startsWith("presente")) {
        return "present";
    }
    if (tense === "futuro" || tense === "condicional") {
        return "future";
    }
    return "past";
}

function getVerbSemanticTenseGroups(visibleTenses = []) {
    const groups = [
        {
            key: "optative",
            heading: { labelEs: "CNV optativa", labelNa: "CNV optativa" },
            hoverTitle: { labelEs: "Andrews Lecciones 5 y 9: modo optativo de la cláusula nuclear verbal.", labelNa: "Andrews Lecciones 5 y 9: modo optativo de la cláusula nuclear verbal." },
            tenses: [],
        },
        {
            key: "present",
            heading: { labelEs: "CNV indicativa · imperfectivo no pasado", labelNa: "CNV indicativa · imperfectivo no pasado" },
            hoverTitle: { labelEs: "Andrews Lecciones 5 y 7: tiempos indicativos sobre tronco imperfectivo.", labelNa: "Andrews Lecciones 5 y 7: tiempos indicativos sobre tronco imperfectivo." },
            tenses: [],
        },
        {
            key: "past",
            heading: { labelEs: "CNV indicativa · pasado", labelNa: "CNV indicativa · pasado" },
            hoverTitle: { labelEs: "Andrews Lecciones 5 y 7: imperfecto, pretérito y pasado remoto según tronco y ranura tiempo.", labelNa: "Andrews Lecciones 5 y 7: imperfecto, pretérito y pasado remoto según tronco y ranura tiempo." },
            tenses: [],
        },
        {
            key: "future",
            heading: { labelEs: "CNV indicativa · proyectivo", labelNa: "CNV indicativa · proyectivo" },
            hoverTitle: { labelEs: "Andrews Lecciones 5 y 7: futuro indicativo; condicional es extensión Nawat en la misma ruta imperfectiva.", labelNa: "Andrews Lecciones 5 y 7: futuro indicativo; condicional es extensión Nawat en la misma ruta imperfectiva." },
            tenses: [],
        },
        {
            key: "adjectival",
            heading: { labelEs: "CNV en función adjetival", labelNa: "CNV en función adjetival" },
            hoverTitle: { labelEs: "Andrews: función adjetival sin crear una clase formal fuera de CNV/CNN.", labelNa: "Andrews: función adjetival sin crear una clase formal fuera de CNV/CNN." },
            tenses: [],
        },
        {
            key: "adverbial",
            heading: { labelEs: "CNV en función adverbial", labelNa: "CNV en función adverbial" },
            hoverTitle: { labelEs: "Andrews: función adverbial visible como ruta de CNV, no como clase formal adicional.", labelNa: "Andrews: función adverbial visible como ruta de CNV, no como clase formal adicional." },
            tenses: [],
        },
    ];
    const byKey = new Map(groups.map((group) => [group.key, group]));
    (Array.isArray(visibleTenses) ? visibleTenses : []).forEach((tenseValue) => {
        const key = getVerbSemanticTenseGroupKey(tenseValue);
        const target = byKey.get(key) || byKey.get("past");
        if (target) {
            target.tenses.push(tenseValue);
        }
    });
    return groups;
}

function buildTenseTabsDomSignature({
    isNawat = false,
    tenseMode = "",
    isNonactiveMode = false,
    sourceScope = VERB_SOURCE_SCOPE.both,
    activeGroup = "",
    selectedNonactiveSuffix = null,
    isNominalMode = false,
    shouldShowUniversalTabs = false,
    activeColumnTenses = [],
    nounNonactiveTenses = [],
    verbSemanticGroups = [],
    modeGroups = null,
    visibleTenseSet = new Set(),
    universalOrder = [],
}) {
    const nominalSignature = isNominalMode
        ? `grouped:l:${serializeTenseGroupRows(modeGroups?.left || [], visibleTenseSet)}|r:${serializeTenseGroupRows(modeGroups?.right || [], visibleTenseSet)}`
        : "";
    const semanticSignature = !isNominalMode
        ? (Array.isArray(verbSemanticGroups)
            ? verbSemanticGroups.map((group) => `${group.key || ""}:${(group.tenses || []).join(",")}`).join("|")
            : "")
        : "";
    const groupedSignature = !isNominalMode && modeGroups
        ? `l:${serializeTenseGroupRows(modeGroups.left, visibleTenseSet)}|r:${serializeTenseGroupRows(modeGroups.right, visibleTenseSet)}`
        : "";
    const universalSignature = shouldShowUniversalTabs ? universalOrder.join(",") : "";
    return [
        isNawat ? "na" : "es",
        tenseMode || "",
        isNonactiveMode ? "nonactive" : "active",
        sourceScope || "",
        activeGroup || "",
        selectedNonactiveSuffix || "",
        isNominalMode ? "nominal" : "verb",
        nominalSignature,
        semanticSignature,
        groupedSignature,
        shouldShowUniversalTabs ? "universal:on" : "universal:off",
        universalSignature,
    ].join("::");
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

function updateExistingTenseTabsDom({
    container,
    universalContainer = null,
    endsWithConsonant = false,
    resolveTenseAvailabilityRecord,
    blockedNominalTenseSet = new Set(),
    isNominalMode = false,
    shouldShowUniversalTabs = false,
    availability = [],
    activeGroup = "",
    selectedTense = "",
    selectedUniversal = "",
    isClassTenseSelected = false,
    currentCombinedMode = COMBINED_MODE.active,
    selectionState = null,
}) {
    const mainWrap = container?.querySelector(".tense-tabs-main");
    if (!mainWrap || typeof resolveTenseAvailabilityRecord !== "function") {
        return false;
    }
    const isNawat = getIsNawat();
    mainWrap.setAttribute("role", "tablist");
    mainWrap.setAttribute(
        "aria-label",
        typeof getAndrewsFirstTenseTabsAriaLabel === "function"
            ? getAndrewsFirstTenseTabsAriaLabel(getActiveTenseMode())
            : "Ranura tiempo/modo de la CNV"
    );
    const mainButtons = Array.from(
        mainWrap.querySelectorAll(".tense-tab[data-tense-group=\"main\"][data-tense-value]")
    );
    if (!mainButtons.length) {
        return false;
    }
    mainButtons.forEach((button) => {
        const tenseValue = button.dataset.tenseValue || "";
        const buttonCombinedMode = button.dataset.combinedMode || "";
        const resolvedCombinedMode = buttonCombinedMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        let activePresence = false;
        let nonactivePresence = false;
        const hasOutput = (() => {
            if (!buttonCombinedMode && isNominalMode) {
                const activeRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.active);
                const nonactiveRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.nonactive);
                const activeOutput = resolveTenseAvailabilityHasOutput(activeRecord);
                const nonactiveOutput = resolveTenseAvailabilityHasOutput(nonactiveRecord);
                activePresence = activeOutput === true;
                nonactivePresence = nonactiveOutput === true;
                const availabilityState = activeRecord?.availabilityState || nonactiveRecord?.availabilityState || "";
                button.dataset.availabilityState = availabilityState;
                if (activeRecord === null && nonactiveRecord === null) {
                    return null;
                }
                return activeOutput === true || nonactiveOutput === true;
            }
            const availabilityRecord = resolveTenseAvailabilityRecord(tenseValue, resolvedCombinedMode);
            const output = resolveTenseAvailabilityHasOutput(availabilityRecord);
            if (resolvedCombinedMode === COMBINED_MODE.nonactive) {
                nonactivePresence = output === true;
            } else {
                activePresence = output === true;
            }
            button.dataset.availabilityState = availabilityRecord?.availabilityState || "";
            return output;
        })();
        const isActive = activeGroup === CONJUGATION_GROUPS.tense
            && tenseValue === selectedTense
            && (!buttonCombinedMode || buttonCombinedMode === currentCombinedMode);
        const isBlockedNominalTense = blockedNominalTenseSet instanceof Set
            && blockedNominalTenseSet.has(tenseValue);
        button.classList.toggle("is-active", isActive);
        button.classList.toggle("is-empty", hasOutput === false || isBlockedNominalTense);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        if (typeof getAndrewsFirstTenseHoverTitle === "function") {
            button.title = getAndrewsFirstTenseHoverTitle(tenseValue, getActiveTenseMode());
        }
        if (typeof applyAndrewsTenseAuthorityDataset === "function") {
            applyAndrewsTenseAuthorityDataset(button, { tenseValue, mode: getActiveTenseMode() });
        }
        const selectionAuthority = typeof applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            ? applyAndrewsTenseTabSelectionAuthorityDataset(button, {
                tenseValue,
                mode: getActiveTenseMode(),
                hasOutput,
                endsWithConsonant,
                isBlockedNominalTense,
            })
            : null;
        if (isNominalMode) {
            setTensePresenceBadges(button, {
                active: activePresence,
                nonactive: nonactivePresence,
            });
        }
        button.disabled = selectionAuthority ? selectionAuthority.disabled : (endsWithConsonant || hasOutput === false || isBlockedNominalTense);
    });
    const universalRoot = universalContainer || container;
    const universalWrap = universalRoot?.querySelector(".tense-tabs-universal");
    if (!shouldShowUniversalTabs) {
        return !universalWrap;
    }
    if (!universalWrap) {
        return false;
    }
    universalWrap.setAttribute(
        "aria-label",
        typeof getAndrewsFirstUniversalTabsAriaLabel === "function"
            ? getAndrewsFirstUniversalTabsAriaLabel()
            : "Clases de tronco perfectivo"
    );
    const universalButtons = Array.from(
        universalWrap.querySelectorAll(".tense-tab[data-tense-group=\"universal\"][data-tense-value]")
    );
    if (universalButtons.length !== availability.length) {
        return false;
    }
    const availabilityByTense = new Map(availability.map((entry) => [entry.tenseValue, entry || null]));
    const hasEveryUniversalButton = universalButtons.every((button) =>
        availabilityByTense.has(button.dataset.tenseValue || "")
    );
    if (!hasEveryUniversalButton) {
        return false;
    }
    universalButtons.forEach((button) => {
        const tenseValue = button.dataset.tenseValue || "";
        const availabilityRecord = availabilityByTense.get(tenseValue) || null;
        const available = resolveTenseAvailabilityIsAvailable(availabilityRecord) === true;
        const activeRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.active);
        const nonactiveRecord = resolveTenseAvailabilityRecord(tenseValue, COMBINED_MODE.nonactive);
        const activePresence = resolveTenseAvailabilityHasOutput(activeRecord) === true;
        const nonactivePresence = resolveTenseAvailabilityHasOutput(nonactiveRecord) === true;
        const hasOutput = activePresence || nonactivePresence;
        button.dataset.availabilityState = availabilityRecord?.availabilityState || "";
        const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
        const isUniversalActive = activeGroup === CONJUGATION_GROUPS.universal
            && tenseValue === selectedUniversal
            && available;
        const isClassActive = activeGroup === CONJUGATION_GROUPS.tense
            && isClassTenseSelected
            && classKey
            && (selectionState?.classFilter || null) === classKey;
        button.classList.toggle("is-active", isUniversalActive || isClassActive);
        button.classList.toggle("is-empty", hasOutput === false);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isUniversalActive || isClassActive));
        if (typeof getAndrewsFirstTenseHoverTitle === "function") {
            button.title = getAndrewsFirstTenseHoverTitle(tenseValue, getActiveTenseMode());
        }
        if (typeof applyAndrewsTenseAuthorityDataset === "function") {
            applyAndrewsTenseAuthorityDataset(button, { tenseValue, mode: getActiveTenseMode() });
        }
        const selectionAuthority = typeof applyAndrewsTenseTabSelectionAuthorityDataset === "function"
            ? applyAndrewsTenseTabSelectionAuthorityDataset(button, {
                tenseValue,
                mode: getActiveTenseMode(),
                hasOutput,
                isAvailable: available,
                endsWithConsonant,
                isUniversal: true,
            })
            : null;
        button.disabled = selectionAuthority ? selectionAuthority.disabled : (endsWithConsonant || !available || hasOutput === false);
    });
    return true;
}

function getScreenCalculatorAnsFallbackFromForm(rawFormOverride = null) {
    const rawForm = rawFormOverride == null
        ? String(VerbScreenAnsState.form || "")
        : String(rawFormOverride || "");
    if (!rawForm) {
        return "";
    }
    const firstForm = rawForm
        .split(/\s*\/\s*/g)
        .map((token) => token.trim())
        .find(Boolean) || "";
    return normalizeComposerStem(firstForm.replace(/\s+/g, ""));
}

function rememberScreenCalculatorAnsState({
    generatedText = "",
    parsedVerb = null,
    stemProvenance = null,
    tense = "",
} = {}) {
    const normalizedForm = String(generatedText || "").trim();
    if (!normalizedForm || normalizedForm === "—") {
        return;
    }
    const regexBase = String(parsedVerb?.displayVerb || "").trim();
    const composerStem = getComposerActiveStemValue();
    const parsedStemFromRegex = regexBase
        ? getComposerActiveStemValue(parseComposerStateFromRegexValue(regexBase))
        : "";
    const provenanceStem = normalizeComposerStem(getProvenancePrimaryStemSurface(stemProvenance));
    const resolvedStem = composerStem
        || parsedStemFromRegex
        || provenanceStem
        || regexBase
        || getScreenCalculatorAnsFallbackFromForm(normalizedForm);
    VerbScreenAnsState.form = normalizedForm;
    VerbScreenAnsState.regexBase = regexBase;
    VerbScreenAnsState.stem = resolvedStem;
    VerbScreenAnsState.provenance = stemProvenance || null;
    VerbScreenAnsState.tense = String(tense || "");
    syncVerbScreenCalculatorState();
}

function getVerbScreenCalculatorButtons() {
    return {
        ansButton: document.getElementById("verb-key-ans"),
        modeButton: document.getElementById("verb-key-mode"),
        transitivityButton: document.getElementById("verb-key-transitivity"),
        supportiveIButton: document.getElementById("verb-key-supportive-i"),
        acButton: document.getElementById("verb-key-ac"),
        ceButton: document.getElementById("verb-key-ce"),
        delButton: document.getElementById("verb-key-del"),
        equalsButton: document.getElementById("verb-key-eq"),
    };
}

function getRegexSupportiveIToggleInfo(rawValue = "") {
    const regexValue = String(
        getRawInputTiCausativeMetadata(rawValue).displayVerb
        || serializeCanonicalRegexEnvelope(rawValue)
        || ""
    ).trim();
    const parsed = parseMovingTargetRegexInput(regexValue);
    if (!parsed.isValid) {
        return {
            canToggle: false,
            hasMarker: false,
            nextValue: rawValue,
        };
    }
    const coreValue = String(parsed.coreText || "");
    if (!coreValue.trim()) {
        return {
            canToggle: false,
            hasMarker: false,
            nextValue: rawValue,
        };
    }
    const markerLetter = getRegexOptionalSupportiveMarkerLetter(coreValue);
    if (markerLetter) {
        const nextCore = coreValue.replace(REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE, (_match, letter) => (
            String(letter || "").toLowerCase()
        ));
        return {
            canToggle: true,
            hasMarker: true,
            nextValue: serializeRegexInputValue(buildMovingTargetRegexFromCoreAndPieces({
                transitivity: parsed.transitivity,
                coreText: nextCore,
                outerPieces: parsed.outerPieces,
            })),
        };
    }
    const parsedBase = parseVerbInput(regexValue || rawValue);
    const stem = normalizeComposerStem(getInputGateRightmostStem(regexValue || rawValue, parsedBase));
    const leadingSupportiveLetter = getStemLeadingSupportiveLetter(stem);
    if (!leadingSupportiveLetter) {
        return {
            canToggle: false,
            hasMarker: false,
            nextValue: rawValue,
        };
    }
    const stemIndex = coreValue.toLowerCase().lastIndexOf(stem);
    if (stemIndex < 0) {
        return {
            canToggle: false,
            hasMarker: false,
            nextValue: rawValue,
        };
    }
    const marker = getRegexOptionalSupportiveMarkerForLetter(leadingSupportiveLetter);
    const markedStem = `${marker}${stem.slice(1)}`;
    const nextCore = `${coreValue.slice(0, stemIndex)}${markedStem}${coreValue.slice(stemIndex + stem.length)}`;
    return {
        canToggle: true,
        hasMarker: false,
        nextValue: serializeRegexInputValue(buildMovingTargetRegexFromCoreAndPieces({
            transitivity: parsed.transitivity,
            coreText: nextCore,
            outerPieces: parsed.outerPieces,
        })),
    };
}

function getSupportiveYRuleSummary() {
    return "Regla y: #+(y)V>yV; C+(y)V>CV; V+(y)e>Ve; i+(y)V>iV; X+(y)Vj(y)V>XVjV.";
}

function getSupportiveToggleGuidance({
    mode = VERB_INPUT_MODE.composer,
    unavailable = false,
    active = false,
} = {}) {
    const ruleSummary = getSupportiveYRuleSummary();
    if (mode === VERB_INPUT_MODE.regex) {
        if (unavailable) {
            return `Patrón: disponible si el tronco inicia con i/y o ya contiene [i] o [y]. ${ruleSummary}`;
        }
        return `${active ? "Patrón: quitar" : "Patrón: agregar"} [i] o [y] opcional. ${ruleSummary}`;
    }
    if (unavailable) {
        return `Disponible solo si la raíz izquierda inicia con i o y. ${ruleSummary}`;
    }
    return `${active ? "Quitar" : "Aplicar"} i/y de apoyo opcional. ${ruleSummary}`;
}

function syncVerbScreenCalculatorState() {
    const {
        ansButton,
        modeButton,
        transitivityButton,
        supportiveIButton,
        equalsButton,
    } = getVerbScreenCalculatorButtons();
    const hasAns = Boolean(
        VerbScreenAnsState.stem
        || VerbScreenAnsState.regexBase
        || VerbScreenAnsState.form
    );
    const hasCopyText = Boolean(VerbScreenAnsState.form);
    if (ansButton) {
        ansButton.disabled = !hasAns;
        ansButton.setAttribute("aria-disabled", String(!hasAns));
        ansButton.title = hasAns
            ? "Restaurar última raíz o forma generada"
            : "Genera primero para habilitar el resultado anterior";
    }
    const isComposer = isVerbInputModeComposer();
    if (modeButton) {
        modeButton.classList.toggle("is-active", isComposer);
        modeButton.setAttribute("aria-pressed", String(isComposer));
        modeButton.title = "Entrada estructural activa.";
    }
    const currentTransitivity = VerbComposerState.transitivity;
    const transitivityLabelMap = {
        [COMPOSER_TRANSITIVITY.intransitive]: "Intransitivo",
        [COMPOSER_TRANSITIVITY.transitive]: "Transitivo",
        [COMPOSER_TRANSITIVITY.bitransitive]: "Bitransitivo",
    };
    if (transitivityButton) {
        const readable = transitivityLabelMap[currentTransitivity] || "sin seleccionar";
        const transitivityUnavailable = !isComposer;
        transitivityButton.disabled = transitivityUnavailable;
        transitivityButton.setAttribute("aria-disabled", String(transitivityUnavailable));
        transitivityButton.classList.toggle(
            "is-active",
            !transitivityUnavailable && isComposerTransitivitySelected() && currentTransitivity !== COMPOSER_TRANSITIVITY.intransitive
        );
        transitivityButton.setAttribute(
            "aria-pressed",
            String(!transitivityUnavailable && isComposerTransitivitySelected() && currentTransitivity !== COMPOSER_TRANSITIVITY.intransitive)
        );
        transitivityButton.title = transitivityUnavailable
            ? "Disponible solo en Selecciones"
            : `Valencia verbal actual: ${readable}.`;
        transitivityButton.setAttribute(
            "aria-label",
            transitivityUnavailable
                ? "Valencia verbal disponible solo en Selecciones"
                : `Valencia verbal actual ${readable}. Cambiar valencia verbal`
        );
    }
    if (supportiveIButton) {
        const { supportiveICheckbox } = getVerbComposerElements();
        if (isComposer) {
            const supportiveOn = Boolean(supportiveICheckbox?.checked);
            const supportiveUnavailable = Boolean(supportiveICheckbox?.disabled);
            const supportiveGuidance = getSupportiveToggleGuidance({
                mode: VERB_INPUT_MODE.composer,
                unavailable: supportiveUnavailable,
                active: supportiveOn,
            });
            supportiveIButton.disabled = supportiveUnavailable;
            supportiveIButton.setAttribute("aria-disabled", String(supportiveUnavailable));
            supportiveIButton.classList.toggle("is-active", !supportiveUnavailable && supportiveOn);
            supportiveIButton.setAttribute("aria-pressed", String(!supportiveUnavailable && supportiveOn));
            supportiveIButton.title = supportiveGuidance;
            supportiveIButton.setAttribute(
                "aria-label",
                supportiveGuidance
            );
        } else {
            const verbInput = document.getElementById("verb");
            const toggleInfo = getRegexSupportiveIToggleInfo(verbInput?.value || "");
            const regexHasMarker = toggleInfo.hasMarker;
            const regexUnavailable = !toggleInfo.canToggle;
            const regexSupportiveGuidance = getSupportiveToggleGuidance({
                mode: VERB_INPUT_MODE.regex,
                unavailable: regexUnavailable,
                active: regexHasMarker,
            });
            supportiveIButton.disabled = regexUnavailable;
            supportiveIButton.setAttribute("aria-disabled", String(regexUnavailable));
            supportiveIButton.classList.toggle("is-active", !regexUnavailable && regexHasMarker);
            supportiveIButton.setAttribute("aria-pressed", String(!regexUnavailable && regexHasMarker));
            supportiveIButton.title = regexSupportiveGuidance;
            supportiveIButton.setAttribute(
                "aria-label",
                regexSupportiveGuidance
            );
        }
    }
    if (equalsButton) {
        equalsButton.disabled = !hasCopyText;
        equalsButton.setAttribute("aria-disabled", String(!hasCopyText));
        equalsButton.title = hasCopyText
            ? "Copiar resultado"
            : "Genera primero para copiar";
    }
}

function runScreenCalculatorAC() {
    clearAllToggleStateMaps({ resetNonactiveSuffix: true });
    mutateConjugationSelectionState({
        group: CONJUGATION_GROUPS.tense,
        classFilter: null,
    });
    if (Object.values(DERIVATION_TYPE).includes(DERIVATION_TYPE.direct)) {
        setActiveDerivationType(DERIVATION_TYPE.direct);
        const derivationSelect = document.getElementById("derivation-type");
        if (derivationSelect) {
            derivationSelect.value = DERIVATION_TYPE.direct;
        }
    }
    if (getActiveTenseMode() === TENSE_MODE.verbo && getCombinedMode() !== COMBINED_MODE.active) {
        setCombinedMode(COMBINED_MODE.active);
        updateCombinedModeTabs();
    }
    const verbInput = document.getElementById("verb");
    if (isVerbInputModeComposer()) {
        syncComposerStateFromVerbInput("");
        renderVerbComposerFromState();
        applyComposerStateToVerbInput({ triggerGenerate: true });
        focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), { selectAll: true });
        updateTenseModeTabs();
        updateDerivationTypeControl();
        renderTenseTabs();
        const verbMeta = getVerbInputMeta();
        renderActiveConjugations({
            verb: verbMeta.displayVerb,
            objectPrefix: getCurrentObjectPrefix(),
        });
        syncVerbScreenCalculatorState();
        return;
    }
    if (!verbInput) {
        return;
    }
    verbInput.value = "";
    dispatchTextInputUpdate(verbInput);
    verbInput.focus();
    updateTenseModeTabs();
    updateDerivationTypeControl();
    renderTenseTabs();
    const verbMeta = getVerbInputMeta();
    renderActiveConjugations({
        verb: verbMeta.displayVerb,
        objectPrefix: getCurrentObjectPrefix(),
    });
    syncVerbScreenCalculatorState();
}

function runScreenCalculatorCE() {
    const verbInput = document.getElementById("verb");
    if (isVerbInputModeComposer()) {
        const preferredInput = getComposerSlotEntryTargetInput();
        if (preferredInput && preferredInput.value) {
            preferredInput.value = "";
            dispatchTextInputUpdate(preferredInput);
        }
        focusComposerSlotEntryTarget(preferredInput, { selectAll: false });
        return;
    }
    const active = document.activeElement;
    if (isEditableTextInput(active)) {
        if (active.value) {
            active.value = "";
            dispatchTextInputUpdate(active);
        }
        active.focus();
        return;
    }
    if (!verbInput || !verbInput.value) {
        return;
    }
    verbInput.value = "";
    dispatchTextInputUpdate(verbInput);
    verbInput.focus();
}

function runScreenCalculatorDEL() {
    const verbInput = document.getElementById("verb");
    if (isVerbInputModeComposer()) {
        const preferredInput = getComposerSlotEntryTargetInput();
        if (preferredInput) {
            const nextValue = removeLastTextUnit(preferredInput.value);
            if (nextValue !== preferredInput.value) {
                preferredInput.value = nextValue;
                dispatchTextInputUpdate(preferredInput);
            }
            focusComposerSlotEntryTarget(preferredInput, { selectAll: false });
        }
        return;
    }
    const active = document.activeElement;
    if (isEditableTextInput(active)) {
        const nextValue = removeLastTextUnit(active.value);
        if (nextValue !== active.value) {
            active.value = nextValue;
            dispatchTextInputUpdate(active);
        }
        active.focus();
        return;
    }
    if (!verbInput) {
        return;
    }
    const nextValue = removeLastTextUnit(verbInput.value);
    if (nextValue === verbInput.value) {
        return;
    }
    verbInput.value = nextValue;
    dispatchTextInputUpdate(verbInput);
    verbInput.focus();
}

function runScreenCalculatorANS() {
    const verbInput = document.getElementById("verb");
    const ansStem = normalizeComposerStem(VerbScreenAnsState.stem || "");
    const ansRegexBase = String(VerbScreenAnsState.regexBase || "").trim();
    const fallbackFromForm = getScreenCalculatorAnsFallbackFromForm();
    if (isVerbInputModeComposer()) {
        const preferredInput = getComposerSlotEntryTargetInput();
        const nextStem = ansStem || ansRegexBase || fallbackFromForm;
        if (!preferredInput || !nextStem) {
            return;
        }
        preferredInput.value = nextStem;
        dispatchTextInputUpdate(preferredInput);
        focusComposerSlotEntryTarget(preferredInput, { selectAll: false });
        return;
    }
    if (!verbInput) {
        return;
    }
    const nextBase = ansRegexBase || ansStem || fallbackFromForm;
    if (!nextBase) {
        return;
    }
    verbInput.value = serializeRegexInputValue(nextBase) || nextBase;
    dispatchTextInputUpdate(verbInput);
    verbInput.focus();
}

function runScreenCalculatorModeToggle() {
    setVerbInputMode(VERB_INPUT_MODE.composer, { syncFromInput: true });
    const verbInput = document.getElementById("verb");
    verbInput?.focus();
    syncVerbScreenCalculatorState();
}

function runScreenCalculatorCycleTransitivity(direction = 1) {
    if (!isVerbInputModeComposer()) {
        syncVerbScreenCalculatorState();
        return false;
    }
    const { transitivitySelect } = getVerbComposerElements();
    const current = COMPOSER_TRANSITIVITY_ORDER.includes(transitivitySelect?.value)
        ? transitivitySelect.value
        : VerbComposerState.transitivity;
    const currentIndex = COMPOSER_TRANSITIVITY_ORDER.indexOf(current);
    if (!COMPOSER_TRANSITIVITY_ORDER.length) {
        syncVerbScreenCalculatorState();
        return false;
    }
    const step = direction < 0 ? -1 : 1;
    const nextIndex = currentIndex < 0
        ? (step < 0 ? COMPOSER_TRANSITIVITY_ORDER.length - 1 : 0)
        : (currentIndex + step + COMPOSER_TRANSITIVITY_ORDER.length) % COMPOSER_TRANSITIVITY_ORDER.length;
    const next = COMPOSER_TRANSITIVITY_ORDER[nextIndex];
    transposeComposerSlotTextboxes(current, next);
    carryComposerEmbedVisibilityAcrossTransitivity(current, next);
    if (transitivitySelect) {
        transitivitySelect.value = next;
    }
    onVerbComposerControlChange("other");
    focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), { selectAll: false });
    return true;
}

function runScreenCalculatorToggleSupportiveI() {
    if (!isVerbInputModeComposer()) {
        const verbInput = document.getElementById("verb");
        if (!verbInput) {
            syncVerbScreenCalculatorState();
            return;
        }
        const toggleInfo = getRegexSupportiveIToggleInfo(verbInput.value);
        if (!toggleInfo.canToggle) {
            syncVerbScreenCalculatorState();
            return;
        }
        verbInput.value = toggleInfo.nextValue;
        dispatchTextInputUpdate(verbInput);
        verbInput.focus();
        syncVerbScreenCalculatorState();
        return;
    }
    const { supportiveICheckbox } = getVerbComposerElements();
    const canEnable = canComposerUseSupportiveMarker();
    const hasSupportiveMarker = hasSupportiveMarkerValue(getComposerSupportiveMarker());
    if (!hasSupportiveMarker && !canEnable) {
        syncComposerSupportiveIAvailability();
        syncVerbScreenCalculatorState();
        return;
    }
    const nextState = !hasSupportiveMarker;
    VerbComposerState.supportiveMarker = nextState
        ? (getComposerSupportiveMarkerCandidate() || getComposerSupportiveMarker() || "")
        : "";
    if (supportiveICheckbox) {
        supportiveICheckbox.checked = nextState;
        supportiveICheckbox.focus();
    }
    onVerbComposerControlChange("supportive");
    syncVerbScreenCalculatorState();
}

function copyTextToClipboard(text) {
    if (!text) {
        return Promise.resolve(false);
    }
    if (navigator?.clipboard?.writeText) {
        return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
    }
    try {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.setAttribute("readonly", "true");
        temp.style.position = "fixed";
        temp.style.top = "-9999px";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(temp);
        return Promise.resolve(ok);
    } catch (_error) {
        return Promise.resolve(false);
    }
}

function runScreenCalculatorCopy() {
    const text = String(VerbScreenAnsState.form || "").trim();
    if (!text) {
        return;
    }
    void copyTextToClipboard(text);
}

function initVerbScreenCalculator() {
    const {
        ansButton,
        modeButton,
        transitivityButton,
        supportiveIButton,
        acButton,
        ceButton,
        delButton,
        equalsButton,
    } = getVerbScreenCalculatorButtons();
    if (
        !ansButton
        && !modeButton
        && !transitivityButton
        && !supportiveIButton
        && !acButton
        && !ceButton
        && !delButton
        && !equalsButton
    ) {
        return;
    }
    ansButton?.addEventListener("click", () => runScreenCalculatorANS());
    modeButton?.addEventListener("click", () => runScreenCalculatorModeToggle());
    transitivityButton?.addEventListener("click", () => runScreenCalculatorCycleTransitivity());
    supportiveIButton?.addEventListener("click", () => runScreenCalculatorToggleSupportiveI());
    acButton?.addEventListener("click", () => runScreenCalculatorAC());
    ceButton?.addEventListener("click", () => runScreenCalculatorCE());
    delButton?.addEventListener("click", () => runScreenCalculatorDEL());
    equalsButton?.addEventListener("click", () => runScreenCalculatorCopy());
    syncVerbScreenCalculatorState();
}

function initCalcInputModeButtons() {
    updateCalcInputModeButtons();
}

function handleComposerDoubleEscapeShortcut(event) {
    if (event?.key !== "Escape" || event?.repeat) {
        return false;
    }
    const modalOpen = document.body?.classList?.contains("is-modal-open");
    if (modalOpen || !isVerbInputModeComposer()) {
        LastComposerEscapeTs = 0;
        return false;
    }
    const now = Date.now();
    const withinWindow = LastComposerEscapeTs > 0
        && (now - LastComposerEscapeTs) <= COMPOSER_ESC_DOUBLE_CLEAR_WINDOW_MS;
    LastComposerEscapeTs = now;
    if (!withinWindow) {
        return false;
    }
    LastComposerEscapeTs = 0;
    clearVerbComposerTextboxInputs();
    return true;
}

function handleComposerDoubleSpaceShortcut(event) {
    if (event?.key !== " " || event?.repeat) {
        return false;
    }
    const modalOpen = document.body?.classList?.contains("is-modal-open");
    if (modalOpen) {
        LastComposerSpaceTs = 0;
        return false;
    }
    const now = Date.now();
    const withinWindow = LastComposerSpaceTs > 0
        && (now - LastComposerSpaceTs) <= COMPOSER_SPACE_DOUBLE_READY_WINDOW_MS;
    LastComposerSpaceTs = now;
    if (!withinWindow) {
        return false;
    }
    LastComposerSpaceTs = 0;
    if (!isVerbInputModeComposer()) {
        setVerbInputMode(VERB_INPUT_MODE.composer, { syncFromInput: true });
    }
    focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), { selectAll: false });
    syncVerbScreenCalculatorState();
    return true;
}

function syncVerbComposerFieldGroupRoles() {
    const fields = Array.from(document.querySelectorAll(".verb-composer__field"));
    if (!fields.length) {
        return;
    }
    fields.forEach((field, index) => {
        field.setAttribute("role", "group");
        const existingLabel = String(field.getAttribute("aria-label") || "").trim();
        if (existingLabel) {
            return;
        }
        const inlineLabel = String(field.querySelector(".verb-composer__sub-label")?.textContent || "").trim();
        if (inlineLabel) {
            field.setAttribute("aria-label", `Grupo ${inlineLabel}`);
            return;
        }
        field.setAttribute("aria-label", `Grupo ${index + 1}`);
    });
}

function initVerbComposer() {
    const {
        slots,
        entryBoardButtons,
        matrixStemAffixSelectBySlot,
        matrixStemAffixPickerBySlot,
        matrixStemAffixTriggerBySlot,
        transitivitySelect,
        transitivitySlotButtons,
        valenceSelectIntransitive,
        valenceSelect,
        valenceSelectSecondary,
        directionalSelect,
        clearTextboxesButton,
        supportiveICheckbox,
    } = getVerbComposerElements();
    const slotNavigationPairs = COMPOSER_SLOT_KEYS.map((slotKey) => ({
        embedInput: slots[slotKey]?.embedInput || null,
        matrixInput: slots[slotKey]?.stemInput || null,
        objectInput: slots[slotKey]?.objectInput || null,
    }));
    const slotStemInputs = COMPOSER_SLOT_KEYS
        .map((slotKey) => ({
            slotKey,
            stemInput: slots[slotKey]?.stemInput || null,
        }))
        .filter((entry) => Boolean(entry.stemInput));
    const slotOtherControls = COMPOSER_SLOT_KEYS
        .flatMap((slotKey) => [
            slots[slotKey]?.objectInput || null,
            slots[slotKey]?.embedInput || null,
        ])
        .filter(Boolean);
    populateComposerDirectionalOptions();
    syncVerbComposerFieldGroupRoles();
    bindComposerStemTabNavigation(slotNavigationPairs);
    Array.from(entryBoardButtons || []).forEach((button) => {
        button.addEventListener("click", () => {
            const board = button.getAttribute("data-composer-entry-board") || "";
            if (!isVerbInputModeComposer()) {
                setVerbInputMode(VERB_INPUT_MODE.composer, { syncFromInput: true });
            }
            const ordinaryNncWasActive = typeof isOrdinaryNncGenerationModeEnabled === "function"
                && isOrdinaryNncGenerationModeEnabled();
            if (ordinaryNncWasActive && typeof setOrdinaryNncGenerationModeEnabled === "function") {
                setOrdinaryNncGenerationModeEnabled(false);
            }
            setComposerEntryBoard(board, { force: ordinaryNncWasActive });
            focusComposerSlotEntryTarget(getComposerPreferredEntryInput(), { selectAll: true });
            syncVerbScreenCalculatorState();
        });
    });
    slotStemInputs.forEach(({ slotKey, stemInput }) => {
        stemInput.addEventListener("keydown", (event) => {
            prepareComposerTemplateMaskOverwrite(event, stemInput, slotKey);
            enforceComposerLockedSuffixDeletion(event, stemInput, slotKey);
        });
        stemInput.addEventListener("input", (event) => {
            if (
                shouldHandleComposerMatrixComboboxSelection(event, stemInput)
                && handleComposerMatrixComboboxSelection(slotKey, stemInput)
            ) {
                return;
            }
            applyComposerSerialFormattingToStemInput(stemInput, {
                preserveCaret: true,
                slotKey,
            });
            onVerbComposerControlChange("matrix-stem");
        });
        stemInput.addEventListener("change", (event) => {
            if (
                shouldHandleComposerMatrixComboboxSelection(event, stemInput)
                && handleComposerMatrixComboboxSelection(slotKey, stemInput)
            ) {
                return;
            }
            applyComposerSerialFormattingToStemInput(stemInput, {
                preserveCaret: false,
                slotKey,
            });
            onVerbComposerControlChange("matrix-stem");
        });
    });
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const optionList = matrixStemAffixSelectBySlot?.[slotKey] || null;
        const stemInput = slots[slotKey]?.stemInput || null;
        if (!optionList || !stemInput) {
            return;
        }
        if (String(optionList.tagName || "").toUpperCase() !== "SELECT") {
            return;
        }
        optionList.addEventListener("change", () => {
            handleComposerMatrixAffixDropdownSelection(slotKey, optionList, stemInput);
        });
    });
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const picker = matrixStemAffixPickerBySlot?.[slotKey] || null;
        const trigger = matrixStemAffixTriggerBySlot?.[slotKey] || null;
        if (!picker || !trigger) {
            return;
        }
        trigger.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            const shouldOpen = ComposerMatrixAffixOpenSlot !== slotKey;
            setComposerMatrixAffixPopoverOpen(slotKey, shouldOpen);
        });
    });
    document.addEventListener("pointerdown", (event) => {
        if (!ComposerMatrixAffixOpenSlot) {
            return;
        }
        const openSlot = ComposerMatrixAffixOpenSlot;
        const picker = matrixStemAffixPickerBySlot?.[openSlot] || null;
        if (picker && picker.contains(event.target)) {
            return;
        }
        setComposerMatrixAffixPopoverOpen(openSlot, false);
    });
    COMPOSER_SLOT_KEYS.forEach((slotKey) => {
        const slotRefs = slots[slotKey] || {};
        const toggleButton = slotRefs.prefixToggleButton;
        if (!toggleButton) {
            return;
        }
        toggleButton.addEventListener("mouseenter", () => setComposerEmbedPreviewState(slotKey, true));
        toggleButton.addEventListener("mouseleave", () => setComposerEmbedPreviewState(slotKey, false));
        toggleButton.addEventListener("focus", () => setComposerEmbedPreviewState(slotKey, true));
        toggleButton.addEventListener("blur", () => setComposerEmbedPreviewState(slotKey, false));
        toggleButton.addEventListener("click", () => {
            toggleComposerEmbedOpen(slotKey);
        });
    });
    if (transitivitySlotButtons?.length) {
        transitivitySlotButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const token = button.getAttribute("data-composer-transitivity") || "";
                if (!Object.values(COMPOSER_TRANSITIVITY).includes(token)) {
                    return;
                }
                const previousToken = COMPOSER_TRANSITIVITY_ORDER.includes(transitivitySelect?.value)
                    ? transitivitySelect.value
                    : VerbComposerState.transitivity;
                transposeComposerSlotTextboxes(previousToken, token);
                carryComposerEmbedVisibilityAcrossTransitivity(previousToken, token);
                if (transitivitySelect) {
                    transitivitySelect.value = token;
                }
                onVerbComposerControlChange("other");
            });
        });
    }
    const controls = [
        transitivitySelect,
        valenceSelectIntransitive,
        valenceSelect,
        valenceSelectSecondary,
        directionalSelect,
        ...slotOtherControls,
    ].filter(Boolean);
    controls.forEach((control) => {
        control.addEventListener("input", () => onVerbComposerControlChange("other"));
        control.addEventListener("change", () => onVerbComposerControlChange("other"));
    });
    if (clearTextboxesButton) {
        clearTextboxesButton.addEventListener("click", () => {
            clearVerbComposerTextboxInputs();
        });
    }
    if (supportiveICheckbox) {
        supportiveICheckbox.addEventListener("change", () => onVerbComposerControlChange("supportive"));
    }
    const verbEl = document.getElementById("verb");
    if (verbEl && verbEl.dataset.composerSlotRouterBound !== "1") {
        verbEl.addEventListener("beforeinput", handleComposerVerbSlotBeforeInput);
        verbEl.addEventListener("input", handleComposerVerbSlotInput);
        verbEl.addEventListener("pointerdown", () => {
            clearComposerSlotEntryTarget();
        });
        verbEl.dataset.composerSlotRouterBound = "1";
    }
    const languageSwitch = document.getElementById("language");
    if (languageSwitch && languageSwitch.dataset.composerSlotTabsLabelBound !== "1") {
        languageSwitch.addEventListener("change", () => {
            syncComposerSlotTabsLabels();
            syncComposerEntryBoardTabsLabel(document.getElementById("verb-entry-board-tabs"));
        });
        languageSwitch.dataset.composerSlotTabsLabelBound = "1";
    }
    if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
        window.addEventListener("resize", () => {
            syncComposerSupportiveITogglePlacement();
            syncComposerSlotPanelVisibility();
            if (ComposerMatrixAffixOpenSlot) {
                setComposerMatrixAffixPopoverOpen(ComposerMatrixAffixOpenSlot, false);
            }
        }, { passive: true });
        window.addEventListener("scroll", () => {
            if (ComposerMatrixAffixOpenSlot) {
                setComposerMatrixAffixPopoverOpen(ComposerMatrixAffixOpenSlot, false);
            }
        }, { passive: true });
    }
    syncComposerStateFromVerbInput(verbEl?.value || "");
    if (!getComposerActiveStemValue()) {
        VerbComposerState.syllableMode = COMPOSER_SYLLABLE_MODE.multisyllable;
    }
    syncComposerChipGroupsFromState();
    setVerbInputMode(VERB_INPUT_MODE.composer, { syncFromInput: false });
    renderVerbComposerFromState();
}

// === Verb Input & Lexicon ===
// === Verb Input & Lexicon ===
function getVerbMirror() {
    return null;
}

function getVerbMirrorContent() {
    return null;
}

function focusVerbMirrorAtEnd() {
    return false;
}

function focusVisibleVerbSurfaceAtEnd() {
    const verbInput = document.getElementById("verb");
    if (!isFocusableTextInput(verbInput, { allowReadOnly: true }) || typeof verbInput.focus !== "function") {
        return false;
    }
    verbInput.focus();
    if (applyVerbInputWritableSelection(verbInput, { force: true })) {
        return true;
    }
    return focusTextInputAtEnd(verbInput);
}

function loadVerbLexiconData() {
    return fetch("data/basic-data.csv", { cache: "no-store" })
        .then((response) => response.text())
        .then((text) => {
            const entries = parseVerbLexiconCSV(text);
            VerbDisambiguationBaseInfo = buildVerbBaseInfo(entries);
            BASIC_DATA_CANONICAL_MAP = buildCanonicalVerbMapFromCSV(text);
            resetDerivationalLookupCaches();
        })
        .catch(() => {
            VerbDisambiguationBaseInfo = new Map();
            BASIC_DATA_CANONICAL_MAP = new Map();
            resetDerivationalLookupCaches();
        });
}

function parseCSVRow(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
        const char = line[i];
        if (char === "\"") {
            if (inQuotes && line[i + 1] === "\"") {
                current += "\"";
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            cells.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    cells.push(current);
    return cells;
}

function parseCSVRows(text) {
    return String(text || "")
        .split(/\r?\n/)
        .map((line) => line.trimEnd())
        .filter((line) => line !== "")
        .map((line) => parseCSVRow(line));
}

function parseVerbEntryToken(token) {
    const raw = String(token || "").trim();
    if (!raw) {
        return {
            base: "",
            transitive: false,
            intransitive: false,
        };
    }
    let base = raw;
    let transitive = false;
    let intransitive = false;
    if (raw.startsWith("(-)")) {
        base = raw.slice(3);
        transitive = true;
        intransitive = true;
    } else if (raw.startsWith("-")) {
        base = raw.slice(1);
        transitive = true;
    } else {
        intransitive = true;
    }
    base = base.trim();
    return {
        base,
        transitive,
        intransitive,
    };
}

function parseVerbLexiconCSV(text) {
    const entriesByBase = new Map();
    parseCSVRows(text).forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (!firstCell) {
            return;
        }
        if (index === 0 && firstCell.toLowerCase() === "lx") {
            return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base;
        const transitive = entry.transitive;
        const intransitive = entry.intransitive;
        if (!base) {
            return;
        }
        const key = base.toLowerCase();
        const existing = entriesByBase.get(key) || {
            base,
            transitive: false,
            intransitive: false,
        };
        existing.transitive = existing.transitive || transitive;
        existing.intransitive = existing.intransitive || intransitive;
        entriesByBase.set(key, existing);
    });
    return Array.from(entriesByBase.values());
}

function stripOptionalSupportiveI(value) {
    return stripOptionalSupportiveMarkers(value || "");
}

function hasCompoundMarkers(value) {
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
    if (!markerRe) {
        return false;
    }
    markerRe.lastIndex = 0;
    return markerRe.test(String(value || ""));
}

function isSupportiveIClusterBase(base) {
    if (!base || hasCompoundMarkers(base)) {
        return false;
    }
    const letters = splitVerbLetters(base);
    if (letters.length < 3 || (letters[0] !== "i" && letters[0] !== "y")) {
        return false;
    }
    return isVerbLetterConsonant(letters[1]) && isVerbLetterConsonant(letters[2]);
}

function formatSupportiveIBaseDisplay(base) {
    if (!isSupportiveIClusterBase(base)) {
        return base;
    }
    const letters = splitVerbLetters(base);
    const core = letters.slice(1).join("");
    if (!core) {
        return base;
    }
    return `${getRegexOptionalSupportiveMarkerForLetter(letters[0])}${core}`;
}

function buildVerbBaseInfo(entries) {
    const map = new Map();
    if (!Array.isArray(entries)) {
        return map;
    }
    const hasNonHyphenMarker = (base) => /[|~#()\[\]\\/?]/.test(base);
    const addEntry = (key, entry, displayBase) => {
        if (!key) {
            return;
        }
        const existing = map.get(key) || {
            transitive: false,
            intransitive: false,
            displayBase: displayBase || entry.base,
        };
        existing.transitive = existing.transitive || entry.transitive;
        existing.intransitive = existing.intransitive || entry.intransitive;
        if (!existing.displayBase) {
            existing.displayBase = displayBase || entry.base;
        }
        map.set(key, existing);
    };
    entries.forEach((entry) => {
        if (!entry || !entry.base) {
            return;
        }
        const base = entry.base;
        const displayBase = formatSupportiveIBaseDisplay(base);
        const baseKey = base.toLowerCase();
        addEntry(baseKey, entry, displayBase);
        if (base.includes("-") && !hasNonHyphenMarker(base)) {
            const normalizedKey = base.replace(/-/g, "").toLowerCase();
            if (normalizedKey && normalizedKey !== baseKey) {
                addEntry(normalizedKey, entry, displayBase);
            }
        }
    });
    return map;
}

function buildCanonicalVerbMapFromCSV(text) {
    const map = new Map();
    if (typeof parseVerbInput !== "function") {
        return map;
    }
    parseCSVRows(text).forEach((row, index) => {
        const firstCell = row[0] ? String(row[0]).trim() : "";
        if (!firstCell) {
            return;
        }
        if (index === 0 && firstCell.toLowerCase() === "lx") {
            return;
        }
        const entry = parseVerbEntryToken(firstCell);
        const base = entry.base;
        if (!base) {
            return;
        }
        const addVariant = (isTransitive) => {
            const raw = isTransitive ? `-${base}` : base;
            let parsed = null;
            try {
                parsed = parseVerbInput(raw);
            } catch (error) {
                parsed = null;
            }
            if (!parsed) {
                return;
            }
            const key = String(
                (parsed.canonical && parsed.canonical.verb) || parsed.verb || base
            ).toLowerCase();
            if (!key) {
                return;
            }
            const existing = map.get(key) || {
                base,
                transitive: false,
                intransitive: false,
                transitiveParsed: null,
                intransitiveParsed: null,
            };
            if (isTransitive) {
                existing.transitive = true;
                existing.transitiveParsed = existing.transitiveParsed || parsed;
            } else {
                existing.intransitive = true;
                existing.intransitiveParsed = existing.intransitiveParsed || parsed;
            }
            map.set(key, existing);
        };
        if (entry.intransitive) {
            addVariant(false);
        }
        if (entry.transitive) {
            addVariant(true);
        }
    });
    return map;
}

function syncInputPopupOverlayActiveState() {
    const inputsPane = document.getElementById("panel-stack-pane-inputs");
    const inputsContainer = document.getElementById("container-inputs");
    const verbBlock = document.getElementById("verb-block");
    const verbScreen = verbBlock?.querySelector(".verb-block__screen") || null;
    const legendPanel = document.getElementById("keyboard-legend");
    const popupActive = Boolean(ComposerMatrixAffixOpenSlot)
        || Boolean(
            legendPanel
            && !legendPanel.hidden
            && legendPanel.classList.contains("is-open")
        );
    [inputsPane, inputsContainer, verbBlock, verbScreen].forEach((element) => {
        if (!element) {
            return;
        }
        element.classList.toggle("is-popup-overlay-active", popupActive);
    });
}

function cancelScheduledVerbInputRefresh() {
    if (!VerbInputRefreshTimer) {
        return;
    }
    clearTimeout(VerbInputRefreshTimer);
    VerbInputRefreshTimer = null;
}

function cancelDeferredToggleAvailabilityPass() {
    if (!ToggleAvailabilityIdleTimer) {
        return;
    }
    clearTimeout(ToggleAvailabilityIdleTimer);
    ToggleAvailabilityIdleTimer = null;
}

function runDeferredToggleAvailabilityPass() {
    ToggleAvailabilityIdleTimer = null;
    if (VerbInputRefreshTimer) {
        return;
    }
    const verbMeta = getVerbInputMeta();
    const previousContext = VerbRenderContext;
    VerbRenderContext = "deferred-availability";
    try {
        renderTenseTabs();
        // Keep causative subtype button availability in sync after the user
        // finishes typing (idle pass mirrors the immediate refresh above).
        if (typeof updateDerivationTypeControl === "function") {
            updateDerivationTypeControl();
        }
        renderActiveConjugations({
            verb: verbMeta.displayVerb,
            objectPrefix: getCurrentObjectPrefix(),
        });
    } finally {
        VerbRenderContext = previousContext;
    }
}

function scheduleDeferredToggleAvailabilityPass() {
    if (VerbRenderContext !== "typing") {
        return;
    }
    cancelDeferredToggleAvailabilityPass();
    ToggleAvailabilityIdleTimer = setTimeout(
        runDeferredToggleAvailabilityPass,
        TOGGLE_AVAILABILITY_IDLE_MS
    );
}

function runVerbInputRefresh() {
    VerbInputRefreshTimer = null;
    const verbInput = document.getElementById("verb");
    const value = verbInput ? verbInput.value : VerbInputRefreshPendingValue;
    const refreshSource = VerbInputRefreshPendingSource || "typing";
    VerbInputRefreshPendingSource = "typing";
    const previousContext = VerbRenderContext;
    VerbRenderContext = refreshSource;
    try {
        if (refreshSource === "typing") {
            clearAdjectivalNncFunctionEntryState(verbInput);
        }
        if (refreshSource !== "typing") {
            cancelDeferredToggleAvailabilityPass();
        }
        renderTenseTabs();
        // Re-probe causative subtype availability whenever the verb changes so
        // that Tipo 1 / Tipo 2 buttons reflect the new verb's options and any
        // now-invalid active subtype is auto-reset to "Ambos".
        if (typeof updateDerivationTypeControl === "function") {
            updateDerivationTypeControl();
        }
        generateNuclearClauseSurface();
        const verbMeta = getVerbInputMeta();
        renderActiveConjugations({
            verb: verbMeta.displayVerb,
            objectPrefix: getCurrentObjectPrefix(),
        });
        maybeAutoScrollToConjugationRow(value);
    } finally {
        VerbRenderContext = previousContext;
    }
}

function scheduleVerbInputRefresh(rawValue = "", options = {}) {
    const immediate = options.immediate === true;
    const source = typeof options.source === "string" && options.source
        ? options.source
        : (immediate ? "immediate" : "typing");
    VerbInputRefreshPendingValue = String(rawValue || "");
    VerbInputRefreshPendingSource = source;
    cancelDeferredToggleAvailabilityPass();
    cancelScheduledVerbInputRefresh();
    if (immediate) {
        runVerbInputRefresh();
        return;
    }
    VerbInputRefreshTimer = setTimeout(runVerbInputRefresh, VERB_INPUT_REFRESH_DEBOUNCE_MS);
}

function resolveSilentGenerationTiCausativeClass(options = {}) {
    const override = options && typeof options.override === "object" && options.override
        ? options.override
        : {};
    const explicitClass = normalizeTiCausativeClass(
        options.tiCausativeClass
        || override.tiCausativeClass
        || options.parsedVerb?.tiCausativeClass
        || override.parsedVerb?.tiCausativeClass
        || ""
    );
    if (explicitClass) {
        return explicitClass;
    }
    const overrideFormula = (
        options?.posicionesFormula && typeof options.posicionesFormula === "object"
            ? options.posicionesFormula
            : (override?.posicionesFormula && typeof override.posicionesFormula === "object" ? override.posicionesFormula : {})
    );
    const overrideVerb = String(overrideFormula.tronco || override.tronco || "");
    const overrideVerbMetadata = getRawInputTiCausativeMetadata(overrideVerb);
    const inlineOverrideClass = normalizeTiCausativeClass(overrideVerbMetadata.tiCausativeClass || "");
    if (inlineOverrideClass) {
        return inlineOverrideClass;
    }
    const normalizedOverrideRuleBase = normalizeRuleBase(
        String(overrideVerbMetadata.normalizedBase || overrideVerb || "").toLowerCase()
    );
    if (!normalizedOverrideRuleBase.endsWith("ti")) {
        return "";
    }
    const verbInput = typeof document !== "undefined" ? document.getElementById("verb") : null;
    const activeInputClass = normalizeTiCausativeClass(
        getRawInputTiCausativeMetadata(verbInput?.value || "").tiCausativeClass
    );
    if (activeInputClass) {
        return activeInputClass;
    }
    return normalizeTiCausativeClass(getComposerActiveTiCausativeClass());
}

function buildSilentGenerationCacheKey(options = {}) {
    const override = options && typeof options.override === "object" && options.override
        ? options.override
        : {};
    const tiCausativeClass = resolveSilentGenerationTiCausativeClass(options);
    const overrideFormula = (
        options?.posicionesFormula && typeof options.posicionesFormula === "object"
            ? options.posicionesFormula
            : (override?.posicionesFormula && typeof override.posicionesFormula === "object" ? override.posicionesFormula : {})
    );
    const encodeValue = (value) => {
        const raw = String(value || "");
        return `${raw.length}:${raw}`;
    };
    const encodeFlag = (value) => (value === true ? "1" : "0");
    const keyParts = [
        encodeFlag(options.allowPassiveObject === true),
        encodeFlag(options.skipValidation === true),
        encodeValue(overrideFormula.pers1 || override.pers1),
        encodeValue(overrideFormula.pers2 || overrideFormula.num2 || override.pers2 || override.num2),
        encodeValue(overrideFormula.obj1 || override.obj1),
        encodeValue(overrideFormula.obj2 || override.obj2),
        encodeValue(overrideFormula.obj3 || override.obj3),
        encodeValue(overrideFormula.tronco || override.tronco),
        encodeValue(overrideFormula.tiempo || override.tiempo),
        encodeValue(overrideFormula.poseedor || override.poseedor),
        encodeValue(override.patientivoOwnership),
        encodeValue(override.patientivoSource),
        encodeValue(override.predicateNominalSourceTense),
        encodeValue(getPatientivoNominalSuffixCacheToken(override.patientivoNominalSuffix)),
        encodeValue(override.tenseMode),
        encodeValue(override.derivationMode),
        encodeValue(override.derivationType),
        encodeValue(override.voiceMode),
        encodeFlag(override.preservePassiveSubject === true),
        encodeFlag(override.allowPassiveObject === true),
        encodeValue(override.ordinaryNnc === true ? "true" : ""),
        encodeFlag(override.ordinaryNnc?.enabled === true),
        encodeValue(override.ordinaryNnc?.stem),
        encodeValue(override.ordinaryNnc?.state),
        encodeValue(override.ordinaryNnc?.number),
        encodeValue(override.ordinaryNnc?.pluralType),
        encodeValue(override.ordinaryNnc?.possessor),
        encodeValue(override.ordinaryNnc?.nounClass),
        encodeValue(override.ordinaryNnc?.animacy),
        encodeValue(override.adjectivalNnc === true ? "true" : ""),
        encodeFlag(override.adjectivalNnc?.enabled === true),
        encodeValue(override.adjectivalNnc?.stem),
        encodeValue(getAdjectivalNncFunctionOverrideSurface(override)),
        encodeValue(override.adjectivalNnc?.state),
        encodeValue(override.adjectivalNnc?.formation),
        encodeValue(override.adjectivalNnc?.formulaEcho),
        encodeValue(override.adjectivalNnc?.sourceFormulaEcho),
        encodeValue(JSON.stringify(override.adjectivalNnc?.sourceCompoundFrame || override.adjectivalNnc?.compoundFrame || "")),
        encodeValue(JSON.stringify(override.adjectivalNnc?.sourceDenominalCompoundFrame || override.adjectivalNnc?.denominalCompoundFrame || "")),
        encodeValue(override.adjectivalNnc?.patientivoSurface),
        encodeValue(override.adjectivalNnc?.patientivoSource),
        encodeValue(override.adjectivalNnc?.nominalizedSurface),
        encodeValue(override.adjectivalNnc?.nominalizationProfile?.role?.nominalizationKind),
        encodeValue(tiCausativeClass),
        encodeValue(getActiveTenseMode()),
        encodeValue(getActiveDerivationMode()),
        encodeValue(getActiveDerivationType()),
        encodeValue(getActiveVoiceMode()),
        encodeValue(getCombinedMode()),
        encodeValue(buildConjugationSelectionStateCacheToken()),
        encodeValue(getSelectedNonactiveSuffix()),
        encodeValue(getActiveCausativeSubtype()),
    ];
    return keyParts.join("|");
}

function getCachedSilentGenerateWord(options = {}) {
    if (!options || options.silent !== true) {
        return generateNuclearClauseSurface(options);
    }
    const cacheKey = buildSilentGenerationCacheKey(options);
    if (SilentGenerationCache.has(cacheKey)) {
        return SilentGenerationCache.get(cacheKey);
    }
    const result = generateNuclearClauseSurface(options);
    SilentGenerationCache.set(cacheKey, result);
    if (SilentGenerationCache.size > SILENT_GENERATION_CACHE_LIMIT) {
        const firstKey = SilentGenerationCache.keys().next().value;
        if (firstKey !== undefined) {
            SilentGenerationCache.delete(firstKey);
        }
    }
    return result;
}

function applyVerbInputReplacement(value) {
    const verbInput = document.getElementById("verb");
    if (!verbInput) {
        return;
    }
    mutateConjugationSelectionState({ classFilter: null });
    const nextValue = serializeRegexInputValue(value);
    verbInput.value = nextValue;
    VerbInputState.lastNonSearchValue = nextValue;
    verbInput.dataset.lastClassVerb = parseVerbInput(nextValue).verb;
    if (typeof renderVerbMirror === "function") {
        renderVerbMirror();
    }
    scheduleVerbInputRefresh(nextValue, { immediate: true, source: "immediate" });
    focusVisibleVerbSurfaceAtEnd();
}

var VERB_INPUT_MODE = {
    composer: "composer",
    regex: "regex",
};
var COMPOSER_TRANSITIVITY = {
    intransitive: "intransitive",
    transitive: "transitive",
    bitransitive: "bitransitive",
};
var COMPOSER_ENTRY_BOARD = {
    general: "general",
    nounToVerb: "noun-to-verb",
};
var COMPOSER_SYLLABLE_MODE = {
    monosyllable: "monosyllable",
    multisyllable: "multisyllable",
};
var COMPOSER_VALENCE_OPTIONS = ["", "ta", "te", "mu"];
var COMPOSER_SECONDARY_VALENCE_OPTIONS = [
    "",
    "te-2",
    "ta-2",
    "mu-2",
    "te+te",
    "ta+ta",
    "te+ta",
    "mu+ta",
    "mu+te",
    // Accepted parsed/dev input values.
    "ta",
    "te",
    "mu",
];
var COMPOSER_SECONDARY_VALENCE_INVENTORY_LIMIT = 2;
var COMPOSER_SECONDARY_VALENCE_INVENTORY_CAPACITY = Object.freeze({
    te: 2,
    ta: 2,
    mu: 1,
});
var COMPOSER_SECONDARY_VALENCE_FAMILY_ORDER = Object.freeze(["ta", "te", "mu"]);
var COMPOSER_SECONDARY_VALENCE_FAMILY_BY_TOKEN = Object.freeze({
    ta: "ta",
    t: "ta",
    tajta: "ta",
    te: "te",
    tejte: "te",
    mu: "mu",
    mujmu: "mu",
    m: "mu",
});
var DEFAULT_COMPOSER_SECONDARY_VALENCE_INVENTORY = Object.freeze([
    "ta",
    "t",
    "tajta",
    "te",
    "tejte",
    "mu",
    "mujmu",
    "m",
]);
var COMPOSER_ROOT_EMBED_INPUT_IDS = new Set([
    "composer-embed",
    "composer-valence-embed-1",
    "composer-valence-embed-2",
]);
var ComposerVerbSlotEntryTarget = null;
var ComposerVerbSlotEntryLastVerbValue = "";
var ComposerVerbSlotEntryInputSyncing = false;
var AUTOFILL_ALIAS_SALT = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
var COMPOSER_ESC_DOUBLE_CLEAR_WINDOW_MS = 450;
var COMPOSER_SPACE_DOUBLE_READY_WINDOW_MS = 450;
var COMPOSER_TRANSITIVITY_ORDER = [
    COMPOSER_TRANSITIVITY.intransitive,
    COMPOSER_TRANSITIVITY.transitive,
    COMPOSER_TRANSITIVITY.bitransitive,
];
var ALT_SHORTCUT_DEFINITIONS = Object.freeze([
    {
        id: "mode-verb",
        key: "v",
        label: "⌥/Alt + V",
        selector: "[data-tense-mode=\"verbo\"]",
        legendDescription: "verbo",
        fallbackDescription: "verbo",
    },
    {
        id: "mode-noun",
        key: "s",
        label: "⌥/Alt + S",
        selector: "[data-tense-mode=\"sustantivo\"]",
        legendDescription: "sustantivo",
        fallbackDescription: "sustantivo",
    },
    {
        id: "voice-active",
        key: "a",
        label: "⌥/Alt + A",
        action: "set-combined-mode-active",
        fallbackDescription: "voz activa",
        requireVerbMode: true,
    },
    {
        id: "voice-nonactive",
        key: "n",
        label: "⌥/Alt + N",
        action: "set-combined-mode-nonactive",
        fallbackDescription: "voz no activa",
        requireVerbMode: true,
    },
    {
        id: "derivation-direct",
        key: "d",
        label: "⌥/Alt + D",
        selector: "[data-derivation-type=\"direct\"]",
        legendDescription: "directo",
        fallbackDescription: "directo",
    },
    {
        id: "derivation-causative",
        key: "c",
        label: "⌥/Alt + C",
        selector: "[data-derivation-type=\"causative\"]",
        legendDescription: "causativo",
        fallbackDescription: "causativo",
    },
    {
        id: "derivation-applicative",
        key: "p",
        label: "⌥/Alt + P",
        selector: "[data-derivation-type=\"applicative\"]",
        legendDescription: "aplicativo",
        fallbackDescription: "aplicativo",
    },
    {
        id: "keyboard-legend",
        key: "k",
        label: "⌥/Alt + K",
        selector: "#keyboard-legend-trigger",
        legendDescription: "mostrar atajos",
        fallbackDescription: "mostrar atajos",
    },
]);
var KEYBOARD_LEGEND_BASE_ENTRIES = Object.freeze([
    { label: "Tab", description: "alternar entre verbo y caja activa" },
    { label: "⌥/Alt + ← / →", description: "transitividad ±" },
    { label: "Space", description: "foco en #verb" },
    { label: "Esc", description: "cerrar/cancelar" },
    { label: "Esc x2", description: "limpiar cajas del compositor" },
    { label: "Delete / Backspace", description: "borrar una unidad" },
    { label: "Shift + Delete / Backspace", description: "limpiar una caja de texto" },
    { label: "⌥/Alt + Delete / Backspace", description: "reiniciar cajas y selecciones" },
    { label: "Enter", description: "activar control enfocado" },
    { label: "Consejo", description: "escribe para ver sugerencias o haz clic en un verbo de la lista" },
]);
var ESCAPE_OVERLAY_HANDLERS = [];
var ESCAPE_OVERLAY_HANDLER_SEQUENCE = 0;
var COMPOSER_MATRIX_ROOT_TOKENS = Object.freeze({
    [COMPOSER_TRANSITIVITY.intransitive]: Object.freeze(["ni", "na", "wi", "wa", "ti", "ya", "ua"]),
    [COMPOSER_TRANSITIVITY.transitive]: Object.freeze(["nia", "na", "wia", "wa", "tia", "ia", "ua"]),
    [COMPOSER_TRANSITIVITY.bitransitive]: Object.freeze(["nia", "na", "wia", "wa", "tia", "ia", "ua"]),
});
var COMPOSER_MATRIX_ROOT_TOKENS_ALL = Object.freeze(
    Array.from(new Set(
        Object.values(COMPOSER_MATRIX_ROOT_TOKENS)
            .flat()
            .map((token) => normalizeComposerStem(token))
            .filter(Boolean)
    ))
);
var COMPOSER_MATRIX_ROOT_YA_BASES = new Set(["ti", "wi"]);
var COMPOSER_MATRIX_ROOT_NI_CYCLE_BASES = new Set(["ni", "na", "nia"]);
var COMPOSER_MATRIX_ROOT_NI_SHORT_VOWELS = Object.freeze(["a", "i"]);
var COMPOSER_MATRIX_ROOT_NI_FULL_VOWELS = Object.freeze(["a", "e", "i", "u"]);
var COMPOSER_MATRIX_ROOT_WA_TRANSITIVE_VOWELS = Object.freeze(["a", "e", "i", "u"]);
var COMPOSER_MATRIX_NH_BLOCKED_STEMS = new Set([
    "wi",
    "iwi",
    "awi",
    "ia",
    "ua",
    "nia",
    "wia",
    "tia",
]);
var COMPOSER_SERIAL_SUFFIX_SLOT_COUNT = Object.freeze({
    ua: 3,
    awi: 3,
    iwi: 3,
    ti: 2,
    ya: 2,
});
var COMPOSER_SERIAL_DEFAULT_SLOT_COUNT = 3;
var COMPOSER_SERIAL_SLOT_PREF_BY_SLOT = {
    a: COMPOSER_SERIAL_DEFAULT_SLOT_COUNT,
    b: COMPOSER_SERIAL_DEFAULT_SLOT_COUNT,
    c: COMPOSER_SERIAL_DEFAULT_SLOT_COUNT,
};
var COMPOSER_TEMPLATE_SURFACE_BY_SLOT = {
    a: "",
    b: "",
    c: "",
};
var COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT = {
    a: "",
    b: "",
    c: "",
};
var COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT = {
    a: "",
    b: "",
    c: "",
};
var ComposerEntryBoardSlotAState = {
    [COMPOSER_ENTRY_BOARD.general]: {
        slots: {
            a: { stem: "", embed: "", serialType: "auto", templateSuffix: "", templateSurface: "", templateTiCausativeClass: "" },
            b: { stem: "", embed: "", serialType: "auto", templateSuffix: "", templateSurface: "", templateTiCausativeClass: "" },
            c: { stem: "", embed: "", serialType: "auto", templateSuffix: "", templateSurface: "", templateTiCausativeClass: "" },
        },
    },
    [COMPOSER_ENTRY_BOARD.nounToVerb]: {
        slots: {
            a: { stem: "", embed: "", serialType: "auto", templateSuffix: "", templateSurface: "", templateTiCausativeClass: "" },
            b: { stem: "", embed: "", serialType: "auto", templateSuffix: "", templateSurface: "", templateTiCausativeClass: "" },
            c: { stem: "", embed: "", serialType: "auto", templateSuffix: "", templateSurface: "", templateTiCausativeClass: "" },
        },
    },
};
var COMPOSER_SERIAL_TYPE_OPTIONS = Object.freeze([
    { value: "mono", label: "mono", slotCount: 1, family: "monomorphemic" },
    { value: "ti-have", label: "ti: tener", slotCount: 2, family: "ti" },
    { value: "ti-become", label: "ti: ser", slotCount: 2, family: "ti" },
    { value: "ta", label: "ta", slotCount: 2, family: "ta" },
    { value: "ya", label: "ya", slotCount: 2, family: "ya" },
    { value: "ua", label: "ua", slotCount: 3, family: "ua" },
    { value: "awi", label: "awi", slotCount: 3, family: "awi" },
    { value: "iwi", label: "iwi", slotCount: 3, family: "iwi" },
]);
var COMPOSER_INTRANSITIVE_MATRIX_AFFIX_GROUPS = Object.freeze([
    { key: "noun-to-verb", label: "Verbalizar", triggerPrefix: "Verbalización" },
    { key: "series", label: "Serie", triggerPrefix: "Serie" },
]);
var COMPOSER_TRANSITIVE_MATRIX_AFFIX_GROUPS = Object.freeze([
    { key: "noun-to-verb", label: "Verbalizar", triggerPrefix: "Verbalización" },
    { key: "series", label: "SERIE", triggerPrefix: "Derivación" },
]);
var COMPOSER_INTRANSITIVE_MATRIX_AFFIX_OPTIONS = Object.freeze([
    {
        key: "token:ti-become",
        kind: "token",
        value: "_ti1",
        serialType: "ti-become",
        templateSuffix: "ti",
        groupKey: "noun-to-verb",
        label: "-TI (SER)",
        shortLabel: "-ti (ser)",
        meta: "VOLVERSE/HACERSE COMO",
    },
    {
        key: "token:tiya",
        kind: "token",
        value: "_tiya",
        templateSuffix: "tiya",
        groupKey: "noun-to-verb",
        label: "-TIYA",
        shortLabel: "-tiya",
        meta: "VOLVERSE/HACERSE COMO",
    },
    {
        key: "token:ti-have",
        kind: "token",
        value: "_ti2",
        serialType: "ti-have",
        templateSuffix: "ti",
        groupKey: "noun-to-verb",
        label: "-TI (TENER)",
        shortLabel: "-ti (tener)",
        meta: "TENER",
    },
    {
        key: "token:wi",
        kind: "token",
        value: "_wi",
        templateSuffix: "wi",
        groupKey: "noun-to-verb",
        label: "-WI",
        shortLabel: "-wi",
        meta: "VOLVERSE/HACERSE",
    },
    {
        key: "token:wa",
        kind: "token",
        value: "_wa",
        templateSuffix: "wa",
        groupKey: "noun-to-verb",
        label: "-WA",
        shortLabel: "-wa",
        meta: "VOLVERSE/HACERSE",
    },
    {
        key: "token:ya",
        kind: "token",
        value: "_ya",
        templateSuffix: "ya",
        groupKey: "noun-to-verb",
        label: "-YA",
        shortLabel: "-ya",
        meta: "VOLVERSE/HACERSE COMO",
    },
    {
        key: "token:ua",
        kind: "token",
        value: "_ua",
        templateSuffix: "ua",
        groupKey: "noun-to-verb",
        label: "-UA",
        shortLabel: "-ua",
        meta: "USAR",
    },
    {
        key: "token:ewi",
        kind: "token",
        value: "_ewi",
        templateSuffix: "ewi",
        groupKey: "series",
        label: "-EWI",
        shortLabel: "-ewi",
        meta: "VOLVERSE/HACERSE",
    },
    {
        key: "serial:iwi",
        kind: "serial",
        value: "_iwi",
        serialType: "iwi",
        groupKey: "series",
        label: "-IWI",
        shortLabel: "-iwi",
        meta: "VOLVERSE/HACERSE",
    },
    {
        key: "serial:awi",
        kind: "serial",
        value: "_awi",
        serialType: "awi",
        groupKey: "series",
        label: "-AWI",
        shortLabel: "-awi",
        meta: "VOLVERSE/HACERSE",
    },
    {
        key: "token:uwi",
        kind: "token",
        value: "_uwi",
        templateSuffix: "uwi",
        groupKey: "series",
        label: "-UWI",
        shortLabel: "-uwi",
        meta: "VOLVERSE/HACERSE",
    },
    {
        key: "token:wi-auto",
        kind: "token",
        value: "_wi-auto",
        templateSuffix: "wiauto",
        groupKey: "series",
        label: "-$WI",
        shortLabel: "-$wi",
        meta: "A/E>IWI, I/U>AWI",
    },
    {
        key: "token:wiya",
        kind: "token",
        value: "_wiya",
        templateSuffix: "wiya",
        groupKey: "series",
        label: "-WIYA",
        shortLabel: "-wiya",
        meta: "VOLVERSE/HACERSE",
    },
]);
var COMPOSER_TRANSITIVE_MATRIX_AFFIX_OPTIONS = Object.freeze([
    {
        key: "token:nia",
        kind: "token",
        value: "_nia",
        templateSuffix: "nia",
        groupKey: "series",
        label: "-NIA",
        shortLabel: "-nia",
        meta: "Nombre→verbo",
    },
    {
        key: "token:na",
        kind: "token",
        value: "_na",
        templateSuffix: "na",
        groupKey: "series",
        label: "-NA",
        shortLabel: "-na",
        meta: "Nombre→verbo",
    },
    {
        key: "token:wa",
        kind: "token",
        value: "_wa",
        templateSuffix: "wa",
        groupKey: "series",
        label: "-WA",
        shortLabel: "-wa",
        meta: "Nombre→verbo",
    },
    {
        key: "token:ua",
        kind: "token",
        value: "_ua",
        templateSuffix: "ua",
        groupKey: "series",
        label: "-UA",
        shortLabel: "-ua",
        meta: "Nombre→verbo",
    },
    {
        key: "token:ia",
        kind: "token",
        value: "_ia",
        templateSuffix: "ia",
        groupKey: "noun-to-verb",
        label: "-IA",
        shortLabel: "-ia",
        meta: "Tener/ser",
    },
    {
        key: "token:tia-have",
        kind: "token",
        value: "_tia2",
        serialType: "tia-have",
        templateSuffix: "tia",
        groupKey: "noun-to-verb",
        label: "-TIA",
        shortLabel: "-tia",
        meta: "TENER",
    },
    {
        key: "token:tia-become",
        kind: "token",
        value: "_tia1",
        serialType: "tia-become",
        templateSuffix: "tia",
        groupKey: "noun-to-verb",
        label: "-TIA",
        shortLabel: "-tia",
        meta: "SER",
    },
    {
        key: "token:wia",
        kind: "token",
        value: "_wia",
        templateSuffix: "wia",
        groupKey: "noun-to-verb",
        label: "-WIA",
        shortLabel: "-wia",
        meta: "USAR/APLICAR/PRODUCIR",
    },
    {
        key: "serial:ta-consider",
        kind: "serial",
        value: "_ta",
        serialType: "ta",
        templateSuffix: "ta",
        groupKey: "noun-to-verb",
        label: "-TA",
        shortLabel: "-ta",
        meta: "CONSIDERAR",
    },
    {
        key: "token:tilia",
        kind: "token",
        value: "_tilia",
        templateSuffix: "tilia",
        groupKey: "noun-to-verb",
        label: "-TILIA",
        shortLabel: "-tilia",
        meta: "VOLVERSE/HACERSE COMO",
    },
    {
        key: "token:lia",
        kind: "token",
        value: "_lia",
        templateSuffix: "lia",
        groupKey: "noun-to-verb",
        label: "-LIA",
        shortLabel: "-lia",
        meta: "VOLVERSE/HACERSE COMO",
    },
]);
var COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT = {
    a: "auto",
    b: "auto",
    c: "auto",
};

function dispatchAppEvent(name = "", detail = {}) {
    if (!name || typeof document === "undefined" || typeof document.dispatchEvent !== "function") {
        return;
    }
    const payload = detail && typeof detail === "object" ? detail : {};
    if (typeof CustomEvent === "function") {
        document.dispatchEvent(new CustomEvent(name, { detail: payload }));
        return;
    }
    if (typeof document.createEvent === "function") {
        const fallbackEvent = document.createEvent("CustomEvent");
        fallbackEvent.initCustomEvent(name, false, false, payload);
        document.dispatchEvent(fallbackEvent);
    }
}
var COMPOSER_SLOT_CONFIG = {
    a: {
        transitivity: COMPOSER_TRANSITIVITY.intransitive,
        ids: {
            embed: "composer-embed",
            stem: "composer-stem-a",
            objectEmbed: "composer-valence-a-embed-left",
        },
        state: {
            embed: "slotAEmbed",
            stem: "slotAStem",
            objectEmbed: "valenceIntransitiveEmbed",
        },
    },
    b: {
        transitivity: COMPOSER_TRANSITIVITY.transitive,
        ids: {
            embed: "composer-valence-embed-1",
            stem: "composer-stem-b",
            objectEmbed: "composer-valence-left-1",
        },
        state: {
            embed: "slotBEmbed",
            stem: "slotBStem",
            objectEmbed: "valenceEmbedPrimary",
        },
    },
    c: {
        transitivity: COMPOSER_TRANSITIVITY.bitransitive,
        ids: {
            embed: "composer-valence-embed-2",
            stem: "composer-stem-c",
            objectEmbed: "composer-valence-left-2",
        },
        state: {
            embed: "slotCEmbed",
            stem: "slotCStem",
            objectEmbed: "valenceEmbedSecondary",
        },
    },
};
var COMPOSER_SLOT_KEYS = ["a", "b", "c"];
var COMPOSER_SLOT_KEY_BY_TRANSITIVITY = COMPOSER_SLOT_KEYS.reduce((acc, slotKey) => {
    const config = COMPOSER_SLOT_CONFIG[slotKey];
    if (config?.transitivity) {
        acc[config.transitivity] = slotKey;
    }
    return acc;
}, {});
var ENTRADA_URL_SEGMENT_PREFIX = "entrada";
var ENTRADA_URL_SEGMENT_VERSION = "v1";
var ENTRADA_URL_SEGMENT_SCHEMA = Object.freeze([
    { key: "input", segment: "verb", path: ["input"], defaultValue: "" },
    { key: "board", segment: "board", path: ["board"], defaultValue: COMPOSER_ENTRY_BOARD.general },
    { key: "transitivity", segment: "tr", path: ["transitivity"], defaultValue: "" },
    { key: "slotAEmbed", segment: "a-embed", path: ["slots", "a", "embed"], defaultValue: "" },
    { key: "slotAStem", segment: "a-stem", path: ["slots", "a", "stem"], defaultValue: "" },
    { key: "slotAObjectEmbed", segment: "a-object", path: ["slots", "a", "objectEmbed"], defaultValue: "" },
    { key: "slotBEmbed", segment: "b-embed", path: ["slots", "b", "embed"], defaultValue: "" },
    { key: "slotBStem", segment: "b-stem", path: ["slots", "b", "stem"], defaultValue: "" },
    { key: "slotBObjectEmbed", segment: "b-object", path: ["slots", "b", "objectEmbed"], defaultValue: "" },
    { key: "slotCEmbed", segment: "c-embed", path: ["slots", "c", "embed"], defaultValue: "" },
    { key: "slotCStem", segment: "c-stem", path: ["slots", "c", "stem"], defaultValue: "" },
    { key: "slotCObjectEmbed", segment: "c-object", path: ["slots", "c", "objectEmbed"], defaultValue: "" },
    { key: "valenceIntransitive", segment: "val-a", path: ["valenceIntransitive"], defaultValue: "" },
    { key: "valence", segment: "val-b", path: ["valence"], defaultValue: "" },
    { key: "valenceSecondary", segment: "val-c", path: ["valenceSecondary"], defaultValue: "" },
    { key: "directionalPrefix", segment: "dir", path: ["directionalPrefix"], defaultValue: "" },
    { key: "supportiveMarker", segment: "support", path: ["supportiveMarker"], defaultValue: "" },
    { key: "slotASerialType", segment: "a-serial", path: ["slots", "a", "serialType"], defaultValue: "auto" },
    { key: "slotBSerialType", segment: "b-serial", path: ["slots", "b", "serialType"], defaultValue: "auto" },
    { key: "slotCSerialType", segment: "c-serial", path: ["slots", "c", "serialType"], defaultValue: "auto" },
    { key: "slotATemplateSuffix", segment: "a-suffix", path: ["slots", "a", "templateSuffix"], defaultValue: "" },
    { key: "slotBTemplateSuffix", segment: "b-suffix", path: ["slots", "b", "templateSuffix"], defaultValue: "" },
    { key: "slotCTemplateSuffix", segment: "c-suffix", path: ["slots", "c", "templateSuffix"], defaultValue: "" },
    { key: "slotATemplateSurface", segment: "a-surface", path: ["slots", "a", "templateSurface"], defaultValue: "" },
    { key: "slotBTemplateSurface", segment: "b-surface", path: ["slots", "b", "templateSurface"], defaultValue: "" },
    { key: "slotCTemplateSurface", segment: "c-surface", path: ["slots", "c", "templateSurface"], defaultValue: "" },
    { key: "slotATemplateTiCausativeClass", segment: "a-ti", path: ["slots", "a", "templateTiCausativeClass"], defaultValue: "" },
    { key: "slotBTemplateTiCausativeClass", segment: "b-ti", path: ["slots", "b", "templateTiCausativeClass"], defaultValue: "" },
    { key: "slotCTemplateTiCausativeClass", segment: "c-ti", path: ["slots", "c", "templateTiCausativeClass"], defaultValue: "" },
    { key: "ordinaryNncEnabled", segment: "s-enabled", path: ["ordinaryNnc", "enabled"], defaultValue: false, type: "boolean" },
    { key: "ordinaryNncState", segment: "s-state", path: ["ordinaryNnc", "state"], defaultValue: "absolutive", ordinaryNncOnly: true },
    { key: "ordinaryNncNumber", segment: "s-number", path: ["ordinaryNnc", "number"], defaultValue: "singular", ordinaryNncOnly: true },
    { key: "ordinaryNncPluralType", segment: "s-plural", path: ["ordinaryNnc", "pluralType"], defaultValue: "auto", ordinaryNncOnly: true },
    { key: "ordinaryNncPers1", segment: "s-p1", path: ["ordinaryNnc", "pers1"], defaultValue: "", ordinaryNncOnly: true },
    { key: "ordinaryNncPers2", segment: "s-p2", path: ["ordinaryNnc", "pers2"], defaultValue: "", ordinaryNncOnly: true },
    { key: "ordinaryNncSubjectKey", segment: "s-subj", path: ["ordinaryNnc", "subjectKey"], defaultValue: "3sg", ordinaryNncOnly: true },
    { key: "ordinaryNncPossessor", segment: "s-poss", path: ["ordinaryNnc", "possessor"], defaultValue: "", ordinaryNncOnly: true },
    { key: "ordinaryNncNounClass", segment: "s-class", path: ["ordinaryNnc", "nounClass"], defaultValue: "", ordinaryNncOnly: true },
    { key: "ordinaryNncAnimacy", segment: "s-anim", path: ["ordinaryNnc", "animacy"], defaultValue: "", ordinaryNncOnly: true },
]);
var ENTRADA_URL_SEGMENT_FIELD_BY_SEGMENT = ENTRADA_URL_SEGMENT_SCHEMA.reduce((acc, field) => {
    acc[field.segment] = field;
    return acc;
}, {});
var EntradaUrlSegmentSyncTimer = null;
var EntradaUrlSegmentsInitialized = false;
var IsApplyingEntradaUrlSegments = false;
var VerbComposerState = {
    mode: VERB_INPUT_MODE.composer,
    entryBoard: COMPOSER_ENTRY_BOARD.general,
    lastGeneralTransitivity: "",
    lastNounToVerbTransitivity: "",
    transitivity: "",
    valenceIntransitive: "",
    valenceIntransitiveEmbed: "",
    valence: "",
    valenceEmbedPrimary: "",
    valenceSecondary: "",
    valenceEmbedSecondary: "",
    slotAEmbed: "",
    slotAStem: "",
    slotBEmbed: "",
    slotBStem: "",
    slotCEmbed: "",
    slotCStem: "",
    directionalPrefix: "",
    embedPrefix: "",
    supportiveMarker: "",
    syllableMode: COMPOSER_SYLLABLE_MODE.multisyllable,
    stem: "",
    sourceBase: "",
    stemManualOverride: false,
    isApplying: false,
};
var ComposerEmbedOpenState = {
    a: false,
    b: false,
    c: false,
};
var ComposerEmbedPreviewState = {
    a: false,
    b: false,
    c: false,
};
var LastComposerEscapeTs = 0;
var LastComposerSpaceTs = 0;
var ComposerMatrixAffixOpenSlot = "";
var VerbScreenAnsState = {
    stem: "",
    regexBase: "",
    form: "",
    provenance: null,
    tense: "",
};
var DERIVATIONAL_RULES = {};
var DERIVATIONAL_RULES_DOCS = {};
var VALENCE_NEUTRAL_RULES = {};
var OBJECT_MARKERS = new Set();
var FUSION_PREFIXES = new Set();
var NONANIMATE_NOUN_TENSES = new Set();
var SUBJECT_COMBINATIONS = [];
var SUBJECT_PERSON_GROUPS = [];
var SUBJECT_PERSON_NUMBER_ORDER = [];
var SUBJECT_TOGGLE_ALL = "";
var OBJECT_TOGGLE_ALL = "";
var SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES = new Set();
var SUSTANTIVO_VERBAL_PREFIXES = [""];
var POSSESSIVE_PREFIXES = [];
var POSSESSIVE_PREFIX_LABELS = new Map();
var POSSESSOR_LABELS = {};
var POSSESSIVE_TO_OBJECT_PREFIX = {};
var OBJECT_LABELS = {};
var OBJECT_ROLE_LABELS = {};
var NOUN_OBJECT_LABELS = {};
var VERB_BLOCK_LABELS = {};
var NONACTIVE_GENERIC_LABELS = {};
var NONACTIVE_PERSON_SUB_LABELS = {};
var NONACTIVE_PERSON_CATEGORY_LABELS = {};
var PERSON_GROUP_LABELS = {};
var PERSON_SUB_LABELS = {};
var TOGGLE_LABELS = {};
var PLACEHOLDER_LABELS = {};
var PATIENTIVO_OWNERSHIP_LABELS = {};
var NUMBER_LABELS = {
    singular: { es: "singular", na: "isel" },
    plural: { es: "plural", na: "imiaka" },
};
var ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS = Object.freeze({
    first: {
        labelEs: "cada uno de nosotros",
        labelNa: "cada uno de nosotros",
    },
    second: {
        labelEs: "cada uno de ustedes",
        labelNa: "cada uno de ustedes",
    },
    thirdHuman: {
        labelEs: "cada uno de ellos/ellas",
        labelNa: "cada uno de ellos/ellas",
    },
});
var VOICE_MODE = {};
var PASSIVE_IMPERSONAL_SUBJECT_MAP = {};
var PASSIVE_IMPERSONAL_DIRECT_OBJECTS = new Set();
var DERIVATION_MODE = {};
var NONACTIVE_SUFFIX_ORDER = ["lu", "u", "wa", "luwa", "uwa", "walu"];
var NONACTIVE_SUFFIX_LABELS = {};
var NONACTIVE_SUFFIX_DESCRIPTIONS = {};
var NONACTIVE_PREFIX_LABEL = { labelEs: "no activo", labelNa: "te muselia" };
var COMBINED_MODE = {};
var INSTRUMENTIVO_MODE = {};
var TENSE_MODE = {};
var TENSE_ORDER = [];
var TENSE_LABELS = {};
var UI_LABELS = {};
var ADJECTIVE_ACTIVE_TENSE_IDS = Object.freeze({
    preterito: "adjetivo-preterito",
    perfecto: "adjetivo-perfecto",
    preteritoTik: "adjetivo-preterito-tik",
    perfectoTik: "adjetivo-perfecto-tik",
    preteritoNaj: "adjetivo-preterito-naj",
    perfectoNaj: "adjetivo-perfecto-naj",
});
var PATIENTIVO_ADJECTIVE_TENSE_IDS = Object.freeze({
    nonactive: "adjetivo-patientivo-no-activo",
    perfectivo: "adjetivo-patientivo-perfectivo",
});
var PATIENTIVO_ADJECTIVE_TENSE_ORDER = Object.freeze([
    PATIENTIVO_ADJECTIVE_TENSE_IDS.nonactive,
    PATIENTIVO_ADJECTIVE_TENSE_IDS.perfectivo,
]);
var PATIENTIVO_ADJECTIVE_TENSE_SET = new Set(PATIENTIVO_ADJECTIVE_TENSE_ORDER);
var PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE = Object.freeze({
    [PATIENTIVO_ADJECTIVE_TENSE_IDS.nonactive]: "nonactive",
    [PATIENTIVO_ADJECTIVE_TENSE_IDS.perfectivo]: "perfectivo",
});
var ACTIVE_ADJECTIVE_TENSE_ORDER = Object.freeze([
    ADJECTIVE_ACTIVE_TENSE_IDS.preterito,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfecto,
    ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik,
    ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj,
]);
var ACTIVE_ADJECTIVE_TENSE_SET = new Set(ACTIVE_ADJECTIVE_TENSE_ORDER);
var ACTIVE_ADJECTIVE_TAB_TENSE_ORDER = Object.freeze([
    "potencial",
    ...ACTIVE_ADJECTIVE_TENSE_ORDER,
    ...PATIENTIVO_ADJECTIVE_TENSE_ORDER,
]);
var ACTIVE_ADJECTIVE_TAB_TENSE_SET = new Set(ACTIVE_ADJECTIVE_TAB_TENSE_ORDER);
var NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER = Object.freeze([
    "potencial-habitual",
]);
var NONACTIVE_ADJECTIVE_TAB_TENSE_SET = new Set(NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER);
var ADJECTIVE_TAB_TENSE_ORDER = Object.freeze([
    ...ACTIVE_ADJECTIVE_TAB_TENSE_ORDER,
    ...NONACTIVE_ADJECTIVE_TAB_TENSE_ORDER,
]);
var TRONCO_ACTIVE_ADJECTIVE_TENSE_SET = new Set([
    ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik,
    ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj,
]);
var TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET = new Set([
    ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj,
]);
var INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET = new Set([
    ADJECTIVE_ACTIVE_TENSE_IDS.preterito,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfecto,
    ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik,
    ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj,
]);
var PERFECT_ACTIVE_ADJECTIVE_TENSE_SET = new Set([
    ADJECTIVE_ACTIVE_TENSE_IDS.perfecto,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik,
    ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj,
]);
function getInjectedRuntimeConfigPaths() {
    const runtimeConfig = (typeof globalThis !== "undefined" && globalThis.__NAWAT_RUNTIME_CONFIG__)
        ? globalThis.__NAWAT_RUNTIME_CONFIG__
        : null;
    if (runtimeConfig && runtimeConfig.paths && typeof runtimeConfig.paths === "object") {
        return runtimeConfig.paths;
    }
    if (
        typeof globalThis !== "undefined"
        && globalThis.__NAWAT_RUNTIME_PATHS__
        && typeof globalThis.__NAWAT_RUNTIME_PATHS__ === "object"
    ) {
        return globalThis.__NAWAT_RUNTIME_PATHS__;
    }
    return null;
}
var RUNTIME_PATHS = getInjectedRuntimeConfigPaths() || {};
var STATIC_LABELS_PATH = RUNTIME_PATHS.STATIC_LABELS_PATH || "data/static_labels.json";
var STATIC_OPTIONS_PATH = RUNTIME_PATHS.STATIC_OPTIONS_PATH || "data/static_options.json";
var STATIC_GROUPS_PATH = RUNTIME_PATHS.STATIC_GROUPS_PATH || "data/static_groups.json";
var STATIC_ORDERS_PATH = RUNTIME_PATHS.STATIC_ORDERS_PATH || "data/static_orders.json";
var STATIC_RULES_PATH = RUNTIME_PATHS.STATIC_RULES_PATH || "data/static_rules.json";
var STATIC_PHONOLOGY_PATH = RUNTIME_PATHS.STATIC_PHONOLOGY_PATH || "data/static_phonology.json";
var STATIC_MODES_PATH = RUNTIME_PATHS.STATIC_MODES_PATH || "data/static_modes.json";
var STATIC_MISC_PATH = RUNTIME_PATHS.STATIC_MISC_PATH || "data/static_misc.json";
var STATIC_SUPPLETIVES_PATH = RUNTIME_PATHS.STATIC_SUPPLETIVES_PATH || "data/static_suppletives.json";
var STATIC_REDUP_PATH = RUNTIME_PATHS.STATIC_REDUP_PATH || "data/static_redup.json";
var STATIC_SUPPLETIVE_PATHS_PATH = RUNTIME_PATHS.STATIC_SUPPLETIVE_PATHS_PATH || "data/static_suppletive_paths.json";
var STATIC_CONSTANTS_PATH = RUNTIME_PATHS.STATIC_CONSTANTS_PATH || "data/static_constants.json";
var STATIC_DIRECTIONAL_RULES_PATH = RUNTIME_PATHS.STATIC_DIRECTIONAL_RULES_PATH || "data/static_directional_rules.json";
var STATIC_ALLOMORPHY_RULES_PATH = RUNTIME_PATHS.STATIC_ALLOMORPHY_RULES_PATH || "data/static_allomorphy_rules.json";
var STATIC_PARSE_TESTS_PATH = RUNTIME_PATHS.STATIC_PARSE_TESTS_PATH || "data/static_parse_tests.json";
var STATIC_DERIVATIONAL_RULES_PATH = RUNTIME_PATHS.STATIC_DERIVATIONAL_RULES_PATH || "data/static_derivational_rules.json";
var STATIC_VALENCE_NEUTRAL_PATH = RUNTIME_PATHS.STATIC_VALENCE_NEUTRAL_PATH || "data/static_valence_neutral.json";
var TENSE_DESCRIPTIONS = {};
var DERIVATION_TYPE = {
    direct: "direct",
    causative: "causative",
    applicative: "applicative",
};
var mergeLabelMap = (base, override) => (
    override && typeof override === "object" ? { ...base, ...override } : base
);
var mergeNumberLabels = (base, override) => {
    if (!override || typeof override !== "object") {
        return base;
    }
    const next = { ...base };
    Object.entries(override).forEach(([key, labels]) => {
        if (!labels || typeof labels !== "object") {
            return;
        }
        next[key] = { ...(base[key] || {}), ...labels };
    });
    return next;
};
