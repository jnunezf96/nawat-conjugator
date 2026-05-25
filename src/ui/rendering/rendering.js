// ui/rendering/rendering.js
// Conjugation table DOM rendering.
// Extracted from script.js Output Rendering section.
// Global-scope module.

"use strict";

function renderAllOutputs({ verb, objectPrefix, tense, onlyTense = null }) {
    renderActiveConjugations({ verb, objectPrefix, onlyTense, tense });
    if (!isThreeColumnPanelLayout() && verb) {
        setLeftPanelStackMode("output");
    }
}

function updateTensePanelDescription() {
    const panel = document.getElementById("tense-description");
    if (!panel) {
        return;
    }
    const entries = [];
    const tenseMode = getActiveTenseMode();
    const selectionState = getCurrentResolvedConjugationSelectionState({ tenseMode });
    const selectedTense = selectionState.tenseValue;
    const isNawat = Boolean(document.getElementById("language")?.checked);
    if (tenseMode === TENSE_MODE.verbo) {
        const isNonactive = getCombinedMode() === COMBINED_MODE.nonactive;
        if (isNonactive) {
            const suffix = getSelectedNonactiveSuffix();
            if (suffix) {
                const nonactivePrefix = getLocalizedLabel(NONACTIVE_PREFIX_LABEL, isNawat, "no activo");
                entries.push({
                    label: `${nonactivePrefix} ${getLocalizedLabel(NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix)}`,
                    description: getLocalizedDescription(NONACTIVE_SUFFIX_DESCRIPTIONS[suffix], isNawat),
                });
            }
        }
        if (selectionState.group === CONJUGATION_GROUPS.universal) {
            const selected = selectionState.universalTenseValue;
            const classDetail = getPretUniversalClassDetail(selected);
            entries.push({
                label: classDetail
                    ? getLocalizedLabel(classDetail.label, isNawat, selected)
                    : selected,
                description: classDetail
                    ? getLocalizedDescription(classDetail.description, isNawat)
                    : "",
            });
        } else {
            entries.push({
                label: getLocalizedLabel(TENSE_LABELS[selectedTense], isNawat, selectedTense),
                description: getLocalizedDescription(TENSE_DESCRIPTIONS[selectedTense], isNawat),
            });
            if (PRETERITO_CLASS_TENSES.has(selectedTense) && selectionState.classFilter) {
                const classDetail = PRETERITO_CLASS_DETAIL_BY_KEY[selectionState.classFilter];
                if (classDetail) {
                    entries.push({
                        label: getLocalizedLabel(classDetail.label, isNawat, classDetail.label || ""),
                        description: getLocalizedDescription(classDetail.description, isNawat),
                    });
                }
            }
        }
    } else {
        entries.push({
            label: getLocalizedLabel(TENSE_LABELS[selectedTense], isNawat, selectedTense),
            description: getLocalizedDescription(TENSE_DESCRIPTIONS[selectedTense], isNawat),
        });
    }
    panel.innerHTML = "";
    entries.forEach((entry) => {
        if (!entry || !entry.label) {
            return;
        }
        const item = document.createElement("div");
        item.className = "tense-description__item";
        const label = document.createElement("div");
        label.className = "tense-description__label";
        label.textContent = entry.label;
        item.appendChild(label);
        if (entry.description) {
            const text = document.createElement("div");
            text.className = "tense-description__text";
            text.textContent = entry.description;
            item.appendChild(text);
        }
        panel.appendChild(item);
    });
}

function getExplainabilitySelectedTense(tenseOverride = null) {
    if (tenseOverride) {
        return String(tenseOverride || "");
    }
    const selectionState = buildConjugationSelectionState();
    return String(
        selectionState.group === CONJUGATION_GROUPS.universal
            ? selectionState.universalTenseValue
            : selectionState.tenseValue
    );
}

function resolveOutputPanelProvenance({
    verb = "",
    objectPrefix = "",
    tenseOverride = null,
}) {
    if (getActiveTenseMode() !== TENSE_MODE.verbo) {
        return null;
    }
    const resolvedVerb = String(verb || "");
    if (!resolvedVerb) {
        return null;
    }
    const resolvedTense = getExplainabilitySelectedTense(tenseOverride);
    if (!resolvedTense) {
        return null;
    }
    const resolvedObjectPrefix = typeof objectPrefix === "string"
        ? objectPrefix
        : getCurrentObjectPrefix();
    const silentResult = getCachedSilentGenerateWord({
        silent: true,
        skipValidation: true,
        allowPassiveObject: getCombinedMode() === COMBINED_MODE.nonactive,
        override: {
            verb: resolvedVerb,
            objectPrefix: resolvedObjectPrefix,
            tense: resolvedTense,
            tenseMode: getActiveTenseMode(),
            derivationMode: getActiveDerivationMode(),
            derivationType: getActiveDerivationType(),
            voiceMode: getActiveVoiceMode(),
        },
    });
    if (silentResult && !silentResult.error && silentResult.stemProvenance) {
        return silentResult.stemProvenance;
    }
    if (VerbScreenAnsState.tense === resolvedTense && VerbScreenAnsState.provenance) {
        return VerbScreenAnsState.provenance;
    }
    return null;
}

function getSharedLetterPrefixLength(leftValue = "", rightValue = "") {
    const leftLetters = splitVerbLetters(normalizeDerivationStemValue(leftValue));
    const rightLetters = splitVerbLetters(normalizeDerivationStemValue(rightValue));
    const limit = Math.min(leftLetters.length, rightLetters.length);
    let index = 0;
    while (index < limit && leftLetters[index] === rightLetters[index]) {
        index += 1;
    }
    return index;
}

function getSurfaceFamilyBaseCutIndex(surface = "") {
    const normalizedSurface = normalizeDerivationStemValue(surface);
    const letters = splitVerbLetters(normalizedSurface);
    if (!letters.length) {
        return 0;
    }
    const syllables = splitVerbSyllables(normalizedSurface);
    if (!syllables.length) {
        return Math.max(letters.length - 1, 0);
    }
    const syllableStartIndexes = [];
    let cursor = 0;
    syllables.forEach((syllable) => {
        syllableStartIndexes.push(cursor);
        cursor += Array.isArray(syllable?.letters) ? syllable.letters.length : 0;
    });
    for (let index = syllables.length - 1; index >= 0; index -= 1) {
        const syllable = syllables[index];
        if (!syllable?.nucleus) {
            continue;
        }
        if (syllable.onset) {
            return syllableStartIndexes[index];
        }
        if (index > 0) {
            const previousSyllable = syllables[index - 1];
            const previousStart = syllableStartIndexes[index - 1];
            if (previousSyllable?.nucleus) {
                if (previousSyllable.coda) {
                    return previousStart;
                }
                return Math.max(previousStart + (previousSyllable.letters?.length || 1) - 1, 0);
            }
        }
        return syllableStartIndexes[index];
    }
    return Math.max(letters.length - 1, 0);
}

function getLetterSliceText(surface = "", startIndex = 0) {
    const letters = splitVerbLetters(normalizeDerivationStemValue(surface));
    if (!letters.length) {
        return "";
    }
    const clampedStart = Math.max(0, Math.min(startIndex, letters.length - 1));
    return letters.slice(clampedStart).join("");
}

function normalizeDerivationalInputFamilyToken(token = "") {
    const normalizedToken = normalizeDerivationStemValue(token);
    if (/^[aeiu]w[ai]$/.test(normalizedToken)) {
        return normalizedToken.slice(1);
    }
    return normalizedToken;
}

function isSameDerivationalGuidanceRow(left = null, right = null) {
    if (!left || !right) {
        return false;
    }
    return String(left.stem || "") === String(right.stem || "")
        && String(left.rule || "") === String(right.rule || "")
        && String(left.patternType || "") === String(right.patternType || "");
}

function buildDerivationalFamilySummaryEntries({
    inputStem = "",
    rows = [],
    activeRow = null,
} = {}) {
    const normalizedInputStem = normalizeDerivationStemValue(inputStem);
    const normalizedRows = (Array.isArray(rows) ? rows : [])
        .filter((row) => normalizeDerivationStemValue(row?.stem || ""));
    if (!normalizedInputStem || !normalizedRows.length) {
        return [];
    }
    let cutIndex = getSurfaceFamilyBaseCutIndex(normalizedInputStem);
    normalizedRows.forEach((row) => {
        cutIndex = Math.min(
            cutIndex,
            getSharedLetterPrefixLength(normalizedInputStem, row.stem || "")
        );
    });
    const inputFamily = normalizeDerivationalInputFamilyToken(
        getLetterSliceText(normalizedInputStem, cutIndex)
    );
    if (!inputFamily) {
        return [];
    }
    const entries = [];
    const seen = new Map();
    normalizedRows.forEach((row) => {
        const outputFamily = getLetterSliceText(row.stem || "", cutIndex);
        if (!outputFamily) {
            return;
        }
        const text = `${inputFamily} → ${outputFamily}`;
        const existingIndex = seen.get(text);
        if (typeof existingIndex === "number") {
            if (isSameDerivationalGuidanceRow(row, activeRow)) {
                entries[existingIndex].active = true;
            }
            return;
        }
        seen.set(text, entries.length);
        entries.push({
            text,
            active: isSameDerivationalGuidanceRow(row, activeRow) || (!activeRow && row.preferred === true),
        });
    });
    return entries;
}

function resolveCurrentDerivationalGuidanceEntries(verb = "", derivationType = "", activeRow = null) {
    const resolvedVerb = String(verb || "");
    if (!resolvedVerb) {
        return [];
    }
    const parsedVerb = parseVerbInput(resolvedVerb);
    if (!parsedVerb) {
        return [];
    }
    const traced = traceDerivationalFunction(resolvedVerb, {
        includeBothTransitivity: false,
        isTransitive: getBaseObjectSlots(parsedVerb) > 0,
    });
    const normalizedDerivationType = Object.values(DERIVATION_TYPE).includes(derivationType)
        ? derivationType
        : DERIVATION_TYPE.direct;
    const derivationRows = Array.isArray(traced?.[normalizedDerivationType]) ? traced[normalizedDerivationType] : [];
    const selectedRow = derivationRows.find((row) => row?.preferred) || derivationRows[0] || null;
    const summaryEntries = buildDerivationalFamilySummaryEntries({
        inputStem: resolvedVerb,
        rows: derivationRows,
        activeRow: activeRow || selectedRow,
    });
    return summaryEntries;
}

function renderOutputGuidancePanel({ verb = "" } = {}) {
    const panel = document.getElementById("calc-guidance");
    if (!panel) {
        return;
    }
    const hidePanel = () => {
        panel.innerHTML = "";
        panel.hidden = true;
        panel.classList.add("is-empty");
    };
    const resolvedVerb = String(verb || "");
    const activeDerivationType = getActiveDerivationType();
    if (
        getActiveTenseMode() !== TENSE_MODE.verbo
        || !resolvedVerb
        || (
            activeDerivationType !== DERIVATION_TYPE.causative
            && activeDerivationType !== DERIVATION_TYPE.applicative
        )
        || getCombinedMode() !== COMBINED_MODE.active
    ) {
        hidePanel();
        return;
    }
    const provenance = resolveOutputPanelProvenance({
        verb: resolvedVerb,
        objectPrefix: getCurrentObjectPrefix(),
        tenseOverride: getExplainabilitySelectedTense(null),
    });
    const activeRow = (provenance && (
        provenance.rule
        || provenance.causativeTrace
        || provenance.guidanceRoute
    ))
        ? {
            rule: provenance.rule,
            patternType: provenance.patternType,
            causativeTrace: provenance.causativeTrace,
            guidanceRoute: provenance.guidanceRoute || null,
            stem: getProvenancePrimaryStemSurface(provenance),
        }
        : null;
    const entries = resolveCurrentDerivationalGuidanceEntries(
        resolvedVerb,
        activeDerivationType,
        activeRow,
    );
    if (!entries.length) {
        hidePanel();
        return;
    }
    panel.innerHTML = "";
    panel.hidden = false;
    panel.classList.remove("is-empty");
    const title = document.createElement("div");
    title.className = "calc-guidance__title";
    title.textContent = "rutas";
    panel.appendChild(title);
    const chips = document.createElement("div");
    chips.className = "calc-guidance__chips";
    entries.forEach((entry) => {
        const chip = document.createElement("div");
        chip.className = entry.active
            ? "calc-guidance__chip calc-guidance__chip--active"
            : "calc-guidance__chip";
        chip.textContent = entry.text;
        chips.appendChild(chip);
    });
    panel.appendChild(chips);
}

function resolveRenderableVerbValue(verb = "") {
    const explicitVerb = String(verb || "").trim();
    if (explicitVerb) {
        return explicitVerb;
    }
    const verbInput = typeof document !== "undefined"
        ? document.getElementById("verb")
        : null;
    const verbInputSource = resolveVerbInputSource(verbInput?.value || "");
    const candidate = String(
        verbInputSource.displayValue
        || verbInputSource.regexValue
        || verbInputSource.parseValue
        || verbInputSource.rawValue
        || ""
    ).trim();
    const baseValue = getSearchInputBase(candidate);
    return isComposerTemplateOnlyBaseValue(baseValue) ? "" : candidate;
}

function renderActiveConjugations({ verb, objectPrefix, onlyTense = null, tense = null }) {
    const renderVerb = resolveRenderableVerbValue(verb);
    const tenseOverride = onlyTense || tense || "";
    const selectionState = getCurrentResolvedConjugationSelectionState();
    updateTensePanelDescription();
    renderOutputGuidancePanel({ verb: renderVerb });
    const activeTenseMode = getActiveTenseMode();
    if (activeTenseMode === TENSE_MODE.sustantivo) {
        clearUnifiedVerbOutputDataset();
        renderNounConjugations({ verb: renderVerb, containerId: "all-tense-conjugations", tenseValue: tenseOverride || null });
        updateCalcSummaryAndStatus();
        return;
    }
    if (activeTenseMode === TENSE_MODE.adjetivo) {
        clearUnifiedVerbOutputDataset();
        renderAdjectiveConjugations({ verb: renderVerb, containerId: "all-tense-conjugations", tenseValue: tenseOverride || null });
        updateCalcSummaryAndStatus();
        return;
    }
    if (activeTenseMode === TENSE_MODE.adverbio) {
        clearUnifiedVerbOutputDataset();
        renderAdverbConjugations({ verb: renderVerb, containerId: "all-tense-conjugations", tenseValue: tenseOverride || null });
        updateCalcSummaryAndStatus();
        return;
    }
    if (selectionState.group === CONJUGATION_GROUPS.universal) {
        renderPretUniversalConjugations({
            verb: renderVerb,
            objectPrefix,
            containerId: "all-tense-conjugations",
            tenseValue: tenseOverride || null,
        });
        updateCalcSummaryAndStatus();
        return;
    }
    renderAllTenseConjugations({ verb: renderVerb, onlyTense: tenseOverride || null });
    updateCalcSummaryAndStatus();
}

function renderNonactiveConjugationRows({
    list,
    verb,
    tenseValue,
    prefixes,
    isDirectGroup,
    allowObjectToggle,
    allowSubjectToggle,
    objectTogglePrefixes,
    activeObjectPrefix,
    passiveSubjectPrefixes,
    activePassiveSubject,
    forceImpersonal = false,
    isNawat = false,
    generationModeOverride = null,
    buildOutputRowEntry = null,
}) {
    const modeOverride = generationModeOverride && typeof generationModeOverride === "object"
        ? generationModeOverride
        : buildVerbModeGenerateOverride({ isNonactiveMode: true });
    const buildNonactiveRow = (labelText, subText, prefix, subjectOverride = null) => {
        const row = document.createElement("div");
        row.className = "conjugation-row";
        applyConjugationRowClasses(row, prefix);

        const label = document.createElement("div");
        label.className = "conjugation-label";

        const personLabel = document.createElement("div");
        personLabel.className = "person-label";
        personLabel.textContent = labelText;

        const personSub = document.createElement("div");
        personSub.className = "person-sub";
        personSub.textContent = subText;

        label.appendChild(personLabel);
        label.appendChild(personSub);

        const value = document.createElement("div");
        value.className = "conjugation-value";
        const overridePayload = {
            ...modeOverride,
            objectPrefix: prefix,
            verb,
            tense: tenseValue,
        };
        if (subjectOverride) {
            overridePayload.subjectPrefix = subjectOverride.subjectPrefix;
            overridePayload.subjectSuffix = subjectOverride.subjectSuffix;
            overridePayload.preservePassiveSubject = true;
        }
        const result = getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            allowPassiveObject: isDirectGroup && allowObjectToggle,
            override: overridePayload,
        }) || {};
        const mappedSubjectInfo = subjectOverride
            ? getSubjectPersonInfo(subjectOverride.subjectPrefix || "", subjectOverride.subjectSuffix || "")
            : null;
        const shouldBypassPassiveMappedConstraints = isDirectGroup
            && !!subjectOverride
            && mappedSubjectInfo?.person === 3;
        const maskState = getConjugationMaskState({
            result,
            subjectPrefix: subjectOverride?.subjectPrefix || "",
            subjectSuffix: subjectOverride?.subjectSuffix || "",
            objectPrefix: prefix,
            invalidComboSet: INVALID_COMBINATION_KEYS,
            controllerObjectMarker: shouldBypassPassiveMappedConstraints ? "" : null,
            enforceInvalidCombo: true,
        });
        const hideReflexive = !!(result && result.isReflexive && getObjectCategory(prefix) !== "reflexive");
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
        applyConjugationEvaluationPresentation({
            row,
            value,
            evaluation,
            formattedValue: formatConjugationDisplay(result.result),
        });
        row.dataset.objectPrefix = getZeroObjectDisplayValue(prefix || "");

        row.appendChild(label);
        row.appendChild(value);
        list.appendChild(row);
        if (typeof buildOutputRowEntry === "function") {
            buildOutputRowEntry({
                row,
                person: labelText,
                personSub: subText,
                form: value.textContent.trim(),
                slotValuesById: {
                    object: getZeroObjectDisplayValue(prefix || ""),
                },
                prefix,
                subjectOverride,
            });
        }
    };

    const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
    if (forceImpersonal) {
        const rowLabel = getNonactiveRowLabelModel("", {
            isIntransitive: true,
            isNawat,
        });
        buildNonactiveRow(
            rowLabel.label,
            rowLabel.subLabel,
            ""
        );
        return;
    }
    if (isIntransitiveOnly) {
        const rowLabel = getNonactiveRowLabelModel("", {
            isIntransitive: true,
            isNawat,
        });
        buildNonactiveRow(
            rowLabel.label,
            rowLabel.subLabel,
            ""
        );
        return;
    }

    const objectSelectionPool = allowObjectToggle
        ? objectTogglePrefixes
        : [""];
    const objectSelections = allowObjectToggle
        ? (activeObjectPrefix === OBJECT_TOGGLE_ALL ? objectSelectionPool : [activeObjectPrefix])
        : [""];
    if (isDirectGroup) {
        const subjectSelectionPool = passiveSubjectPrefixes.filter((prefix) => prefix !== "");
        const subjectSelections = allowSubjectToggle
            ? (activePassiveSubject === OBJECT_TOGGLE_ALL
                ? subjectSelectionPool
                : [activePassiveSubject])
            : subjectSelectionPool;
        subjectSelections.forEach((subjectPrefix) => {
            const subjectOverride = getPassiveSubjectOverride(subjectPrefix);
            if (!subjectOverride) {
                return;
            }
            objectSelections.forEach((objectPrefix) => {
                const rowLabel = getNonactiveRowLabelModel(subjectPrefix, {
                    isDirectGroup: true,
                    isNawat,
                    subjectOverride,
                    retainedObjectPrefix: objectPrefix,
                });
                buildNonactiveRow(
                    rowLabel.label,
                    rowLabel.subLabel,
                    objectPrefix,
                    subjectOverride
                );
            });
        });
        return;
    }
    objectSelections.forEach((prefix) => {
        if (!prefix) {
            return;
        }
        const rowLabel = getNonactiveRowLabelModel(prefix, { isNawat });
        buildNonactiveRow(
            rowLabel.label,
            rowLabel.subLabel,
            prefix
        );
    });
}

function buildVerbTenseBlock({
    verb,
    tenseValue,
    objectGroup,
    sectionEl,
    isNonactiveMode,
    isNawat,
    modeKey,
    subjectKeyPrefix,
    subjectSubMode,
    derivationType,
    activeValency,
    modeObjectSlots = 0,
    nonactiveAvailableSlots = 0,
    hasPromotableObject = false,
    embeddedObjectFilled = false,
    fusionMarkers,
    forceDefaultTodosKi = false,
    allowIndirectObjectToggle = false,
    indirectTogglePrefixes = [],
    grammarState = null,
    grammarUiConfig = null,
}) {
    const { prefixes } = objectGroup;
    const resolvedGrammarState = grammarState || buildCanonicalGrammarState({
        parsedVerb: getParsedVerbForTab(modeKey || "verb", verb || ""),
        derivationType,
        voiceMode: isNonactiveMode ? VOICE_MODE.passive : VOICE_MODE.active,
        isNonactiveMode,
    });
    const configuredVisibleSlotIds = Array.isArray(grammarUiConfig?.visibleSlotIds)
        && grammarUiConfig.visibleSlotIds.length
        ? grammarUiConfig.visibleSlotIds
        : null;
    const groupKey = prefixes.join("|") || "intrans";
    const objectStateKey = getObjectStateKey({
        groupKey,
        tenseValue,
        mode: modeKey,
        isNonactive: isNonactiveMode,
    });
    const isDirectGroup = prefixes.every((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
    const isPassiveNonactive = isNonactiveMode && isDirectGroup;
    const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
    const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
    const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
    let passiveSubjectPrefixes = allowSubjectToggle
        ? Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS)
        : [];
    let objectTogglePrefixes = (isNonactiveMode && isDirectGroup && allowObjectToggle)
        ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(OBJECT_MARKERS)]))
        : prefixes;
    const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
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
    const objectSlotSchema = getVerbObjectSlotSchema({
        isNawat,
        derivationType,
        isNonactiveMode,
        activeValency,
        modeObjectSlots,
        allowIndirectObjectToggle,
        primaryTogglePrefixes: objectTogglePrefixes,
        indirectTogglePrefixes,
        visibleSlotIds: configuredVisibleSlotIds,
    });
    const objectSlotStates = objectSlotSchema.map((slot) => {
        const options = getObjectToggleOptions(slot.toggleValues, {
            includeAll: true,
            labelForPrefix: slot.labelForPrefix,
            isNawat,
        });
        return {
            ...slot,
            options,
            optionMap: new Map(options.map((entry) => [entry.id, entry])),
            stateKey: slot.stateSuffix ? `${objectStateKey}|${slot.stateSuffix}` : objectStateKey,
            activeId: "",
            buttons: new Map(),
            toggleEl: null,
            setActive: null,
        };
    });
    const objectSlotStateById = new Map(objectSlotStates.map((slot) => [slot.id, slot]));
    const primaryObjectSlot = objectSlotStateById.get("object");
    const thirdObjectSlot = objectSlotStateById.get("object3") || null;
    const objectOptions = primaryObjectSlot ? primaryObjectSlot.options : [];
    const objectOptionMap = primaryObjectSlot ? primaryObjectSlot.optionMap : new Map();
    const allowThirdObjectToggle = Boolean(thirdObjectSlot);
    const passiveSubjectOptions = allowSubjectToggle
        ? getObjectToggleOptions(passiveSubjectPrefixes, { labelForPrefix: getPassiveToggleLabel })
        : [];
    const passiveSubjectOptionMap = new Map(passiveSubjectOptions.map((entry) => [entry.id, entry]));
    const subjectOptions = getSubjectToggleOptions();
    const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
    const passiveSubjectStateKey = allowSubjectToggle ? `${objectStateKey}|subject` : "";
    const verbKey = verb || "";
    const shouldDefaultBitransitiveObjects = modeObjectSlots >= 2 && verbKey;
    const bitransitiveObjectSeedKey = shouldDefaultBitransitiveObjects
        ? `${verbKey}|objects-${modeObjectSlots}|${isNonactiveMode ? "nonactive" : "active"}`
        : verbKey;
    const uiDefaultObjectBySlot = grammarUiConfig?.defaultToggles?.objectBySlotId || null;
    const uiDefaultPrimaryObjectId = uiDefaultObjectBySlot?.object;
    const bitransitiveDefaultObjectId = shouldDefaultBitransitiveObjects
        ? getDefaultOutputToggleSelection({
            context: "verb-primary-object",
            values: Array.from(objectOptionMap.keys()),
            preferredId: uiDefaultPrimaryObjectId || "ki",
            fallbackIds: [getPreferredObjectPrefix(prefixes), ""],
            isNonactiveMode,
        })
        : "";
    const shouldDefaultTripleValencySubject = !isNonactiveMode && activeValency >= 3 && verbKey;
    const tripleValencySubjectSeedKey = shouldDefaultTripleValencySubject ? `${verbKey}|valency-3` : verbKey;
    const uiDefaultSubjectId = grammarUiConfig?.defaultToggles?.subject
        || getDefaultOutputToggleSelection({
            context: "verb-subject",
            values: Array.from(subjectOptionMap.keys()),
        });
    const tripleDefaultSubjectId = shouldDefaultTripleValencySubject
        ? getDefaultOutputToggleSelection({
            context: "verb-subject",
            values: Array.from(subjectOptionMap.keys()),
            preferredId: uiDefaultSubjectId,
        })
        : getDefaultOutputToggleSelection({
            context: "verb-subject",
            values: Array.from(subjectOptionMap.keys()),
        });
    const shouldForceDefaults = forceDefaultTodosKi && verbKey;
    if (shouldForceDefaults && objectOptionMap.has("ki")) {
        applyDefaultToggleStateOnce(ObjectToggleState, objectStateKey, verbKey, "ki");
    }
    if (shouldDefaultBitransitiveObjects) {
        applyDefaultToggleStateOnce(
            ObjectToggleState,
            objectStateKey,
            bitransitiveObjectSeedKey,
            bitransitiveDefaultObjectId
        );
    }
    const isIntransitiveGroup = prefixes.length === 1 && prefixes[0] === "";
    const shouldMapAllTenses =
        prefixes.includes("ki");
    const shouldSeedAllTensesDefault = shouldMapAllTenses;
    const resolveTenseBlockPrefix = (prefix) => {
        if (shouldMapAllTenses && prefix === "ki") {
            return OBJECT_TOGGLE_ALL;
        }
        return prefix || "intrans";
    };
    const defaultObjectPrefix = getDefaultOutputToggleSelection({
        context: "verb-primary-object",
        values: Array.from(objectOptionMap.keys()),
        preferredId: uiDefaultPrimaryObjectId || getPreferredObjectPrefix(prefixes),
        isNonactiveMode,
        fallbackIds: [getPreferredObjectPrefix(prefixes)],
    });
    let activeObjectPrefix = isIntransitiveGroup ? "" : defaultObjectPrefix;
    if (shouldSeedAllTensesDefault && !ObjectToggleState.has(objectStateKey)) {
        setToggleStateValue(ObjectToggleState, objectStateKey, "ki", { syncLock: false });
    }
    const storedObjectPrefix = getToggleStateValue(ObjectToggleState, objectStateKey);
    if (!isIntransitiveGroup && storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
        activeObjectPrefix = storedObjectPrefix;
    }
    if (isPassiveNonactive && !allowObjectToggle) {
        activeObjectPrefix = "";
    }
    if (primaryObjectSlot) {
        primaryObjectSlot.activeId = activeObjectPrefix;
    }
    const defaultPassiveSubjectId = allowSubjectToggle
        ? getDefaultOutputToggleSelection({
            context: "verb-passive-subject",
            values: Array.from(passiveSubjectOptionMap.keys()),
        })
        : null;
    let activePassiveSubject = allowSubjectToggle ? defaultPassiveSubjectId : null;
    const storedPassiveSubject = allowSubjectToggle
        ? getToggleStateValue(ObjectToggleState, passiveSubjectStateKey)
        : undefined;
    if (allowSubjectToggle && storedPassiveSubject !== undefined && passiveSubjectOptionMap.has(storedPassiveSubject)) {
        activePassiveSubject = storedPassiveSubject;
    }
    const tenseBlock = document.createElement("div");
    tenseBlock.className = "tense-block";
    tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(activeObjectPrefix)}-${tenseValue}`;

    const transitiveLabel = getVerbBlockLabel("transitive", isNawat, "verbo transitivo");
    const intransitiveLabel = getVerbBlockLabel("intransitive", isNawat, "verbo intransitivo");
    const passiveLabel = getVerbBlockLabel("passive", isNawat, "pasivo");
    const impersonalLabel = getVerbBlockLabel("impersonal", isNawat, "impersonal");
    const labelValency = Number.isFinite(grammarUiConfig?.labelValency)
        ? grammarUiConfig.labelValency
        : (Number.isFinite(activeValency)
            ? (isNonactiveMode ? Math.max(0, activeValency - 1) : activeValency)
            : null);
    const activeBlockLabelType = getActiveVerbBlockLabelType({
        labelValency,
        activeValency,
        embeddedObjectFilled,
    });
    const getActiveSlotToggleValue = (slotId) => objectSlotStateById.get(slotId)?.activeId || "";
    const updateVerbTenseBlockPalette = () => {
        const signature = buildBlockComboPaletteSignature({
            mode: "verb",
            valency: Number.isFinite(labelValency) ? labelValency : activeValency,
            objectPrefix: getActiveSlotToggleValue("object"),
            indirectObjectMarker: getActiveSlotToggleValue("object2"),
            thirdObjectMarker: getActiveSlotToggleValue("object3"),
            derivationType,
        });
        applyTenseBlockComboPalette(tenseBlock, signature);
    };
    const valencyLabel = Number.isFinite(labelValency) ? `valencia total: ${labelValency}` : "";
    const buildBlockLabel = () => {
        const baseLabel = activeBlockLabelType === "transitive"
            ? transitiveLabel
            : intransitiveLabel;
        return valencyLabel ? `${baseLabel} · ${valencyLabel}` : baseLabel;
    };
    const tenseTitle = document.createElement("div");
    tenseTitle.className = "tense-block__title";
    const titleLabel = document.createElement("span");
    titleLabel.className = "tense-block__label";
    titleLabel.textContent = buildBlockLabel();
    tenseTitle.appendChild(titleLabel);
    const titleControls = document.createElement("div");
    titleControls.className = "tense-block__controls";
    const shouldStackControls = !isNonactiveMode || prefixes.length > 1;
    if (shouldStackControls) {
        titleControls.classList.add("tense-block__controls--stacked");
    }
    const resolvedSubjectKeyPrefix = subjectKeyPrefix || modeKey;
    const subjectKey = `${resolvedSubjectKeyPrefix}|${tenseValue}|${groupKey}`;
    if (shouldForceDefaults) {
        if (!isNonactiveMode) {
            applyDefaultToggleStateOnce(SubjectToggleState, subjectKey, verbKey, SUBJECT_TOGGLE_ALL);
        } else if (allowSubjectToggle && passiveSubjectStateKey) {
            applyDefaultToggleStateOnce(
                ObjectToggleState,
                passiveSubjectStateKey,
                verbKey,
                OBJECT_TOGGLE_ALL
            );
        }
    }
    if (shouldDefaultTripleValencySubject) {
        applyDefaultToggleStateOnce(
            SubjectToggleState,
            subjectKey,
            tripleValencySubjectSeedKey,
            tripleDefaultSubjectId
        );
    }
    if (shouldSeedAllTensesDefault && !SubjectToggleState.has(subjectKey)) {
        setToggleStateValue(SubjectToggleState, subjectKey, tripleDefaultSubjectId, { syncLock: false });
    }
    let activeSubject = getToggleStateValue(SubjectToggleState, subjectKey, tripleDefaultSubjectId)
        ?? tripleDefaultSubjectId;
    if (!subjectOptionMap.has(activeSubject)) {
        activeSubject = tripleDefaultSubjectId;
        setToggleStateValue(SubjectToggleState, subjectKey, activeSubject, { syncLock: false });
    }

    let toggleButtons = new Map();
    let passiveSubjectButtons = new Map();
    let subjectButtons = new Map();
    const objectSlotSetters = new Map();
    const controllerRole = getCanonicalControllerRole(resolvedGrammarState.derivationType || derivationType);
    const controllerSlotId = getCanonicalSlotIdForRole(controllerRole) || "object";
    const isSilentControllerMarker = (value) => VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value || "");
    const isShuntlineSlot = (slotId) => slotId === "object2" || slotId === "object3";
    const isSilentShuntlineMarker = (value) => {
        if (!value || value === OBJECT_TOGGLE_ALL) {
            return true;
        }
        return Number(activeValency) >= 4 && VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value);
    };
    const updateObjectToggleStyling = () => {
        objectSlotStates.forEach((slotState) => {
            if (!slotState.toggleEl) {
                return;
            }
            const controllerIsSilent = slotState.id === controllerSlotId
                && isSilentControllerMarker(slotState.activeId);
            slotState.buttons.forEach((button, key) => {
                const isActiveButton = key === slotState.activeId;
                const shuntlineOptionIsOvert = isShuntlineSlot(slotState.id)
                    && !isSilentShuntlineMarker(key);
                const shuntlineOptionIsSilent = isShuntlineSlot(slotState.id)
                    && key !== OBJECT_TOGGLE_ALL
                    && isSilentShuntlineMarker(key);
                button.classList.toggle(
                    "object-toggle-button--controller-silent",
                    controllerIsSilent && isActiveButton
                );
                button.classList.toggle(
                    "object-toggle-button--shuntline-overt",
                    shuntlineOptionIsOvert
                );
                button.classList.toggle(
                    "object-toggle-button--silent-zero",
                    shuntlineOptionIsSilent
                );
            });
        });
    };
    const TOGGLE_AVAILABILITY_CLASS_NAMES = [
        "object-toggle-button--viable",
        "object-toggle-button--masked",
        "object-toggle-button--impossible",
    ];
    const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = [
        "object-toggle-button--selected-viable",
        "object-toggle-button--selected-masked",
        "object-toggle-button--selected-impossible",
    ];
    const clearToggleAvailabilityClasses = (button) => {
        if (!button) {
            return;
        }
        TOGGLE_AVAILABILITY_CLASS_NAMES.forEach((className) => {
            button.classList.remove(className);
        });
        TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach((className) => {
            button.classList.remove(className);
        });
    };
    const applyToggleAvailabilityClass = (button, state) => {
        clearToggleAvailabilityClasses(button);
        if (!button || !state) {
            return;
        }
        if (state === "viable") {
            button.classList.add("object-toggle-button--viable");
            return;
        }
        if (state === "masked") {
            button.classList.add("object-toggle-button--masked");
            return;
        }
        if (state === "impossible") {
            button.classList.add("object-toggle-button--impossible");
        }
    };
    const applySelectedAvailabilityClass = (button, state, isSelected) => {
        if (!button || !isSelected) {
            return;
        }
        if (state === "viable") {
            button.classList.add("object-toggle-button--selected-viable");
            return;
        }
        if (state === "masked") {
            button.classList.add("object-toggle-button--selected-masked");
            return;
        }
        if (state === "impossible") {
            button.classList.add("object-toggle-button--selected-impossible");
        }
    };
    const staticViableOptionSetBySlot = new Map();
    if (grammarUiConfig && grammarUiConfig.viableOptionsPerSlot && typeof grammarUiConfig.viableOptionsPerSlot === "object") {
        Object.entries(grammarUiConfig.viableOptionsPerSlot).forEach(([slotId, values]) => {
            if (!Array.isArray(values) || !values.length) {
                return;
            }
            staticViableOptionSetBySlot.set(slotId, new Set(values));
        });
    }
    let setActiveSubject = null;
    let setActivePassiveSubject = null;
    if (!isNonactiveMode) {
        const subjectToggleControl = buildToggleControl({
            options: subjectOptions,
            activeId: activeSubject,
            ariaLabel: getToggleLabel("subject", isNawat, "Sujeto"),
            onSelect: (id) => setActiveSubject(id),
            getActiveId: () => activeSubject,
        });
        subjectToggleControl.toggle.dataset.toggleType = "subject";
        subjectToggleControl.toggle.dataset.toggleSlot = "subject";
        subjectButtons = subjectToggleControl.buttons;
        titleControls.appendChild(subjectToggleControl.toggle);
        setActiveSubject = (subjectId, options = {}) => {
            activeSubject = subjectId;
            setToggleStateValue(SubjectToggleState, subjectKey, subjectId, { syncLock: true });
            setToggleActiveState(subjectButtons, subjectId);
            if (options.render !== false) {
                renderRows();
            }
        };
    }
    if (allowSubjectToggle) {
        const passiveSubjectToggleControl = buildToggleControl({
            options: passiveSubjectOptions,
            activeId: activePassiveSubject,
            ariaLabel: getToggleLabel("subject", isNawat, "Sujeto"),
            onSelect: (id) => setActivePassiveSubject(id),
            getActiveId: () => activePassiveSubject,
        });
        passiveSubjectToggleControl.toggle.dataset.toggleType = "subject";
        passiveSubjectToggleControl.toggle.dataset.toggleSlot = "subject";
        passiveSubjectButtons = passiveSubjectToggleControl.buttons;
        titleControls.appendChild(passiveSubjectToggleControl.toggle);
        setActivePassiveSubject = (subjectId, options = {}) => {
            activePassiveSubject = subjectId;
            setToggleStateValue(ObjectToggleState, passiveSubjectStateKey, subjectId, {
                syncLock: true,
            });
            setToggleActiveState(passiveSubjectButtons, subjectId);
            if (options.render !== false) {
                renderRows();
            }
        };
    }
    const showObjectToggle = (
        (!isNonactiveMode && prefixes.length > 1)
        || (isNonactiveMode && (!isDirectGroup ? prefixes.length > 1 : allowObjectToggle))
    );
    if (showObjectToggle) {
        const objectToggleControl = buildToggleControl({
            options: objectOptions,
            activeId: activeObjectPrefix,
            ariaLabel: primaryObjectSlot ? primaryObjectSlot.toggleAriaLabel : getToggleLabel("object", isNawat, "Objeto"),
            onSelect: (id) => setActivePrefix(id),
            getActiveId: () => activeObjectPrefix,
        });
        objectToggleControl.toggle.dataset.toggleType = "object";
        objectToggleControl.toggle.dataset.toggleSlot = "object";
        toggleButtons = objectToggleControl.buttons;
        if (primaryObjectSlot) {
            primaryObjectSlot.buttons = objectToggleControl.buttons;
            primaryObjectSlot.toggleEl = objectToggleControl.toggle;
        }
        titleControls.appendChild(objectToggleControl.toggle);
    }
    const getExtraSlotBitransitiveDefaults = (slotId) => {
        const preferredId = uiDefaultObjectBySlot?.[slotId] || "ki";
        return { preferredId, fallbackIds: [OBJECT_TOGGLE_ALL, ""] };
    };
    objectSlotStates
        .filter((slotState) => !slotState.isPrimary)
        .forEach((slotState) => {
            if (!slotState.options.length) {
                slotState.activeId = "";
                return;
            }
            if (shouldDefaultBitransitiveObjects) {
                const defaults = getExtraSlotBitransitiveDefaults(slotState.id);
                const defaultId = getDefaultOutputToggleSelection({
                    context: "verb-extra-object",
                    values: Array.from(slotState.optionMap.keys()),
                    preferredId: defaults.preferredId,
                    fallbackIds: defaults.fallbackIds,
                });
                applyDefaultToggleStateOnce(
                    ObjectToggleState,
                    slotState.stateKey,
                    bitransitiveObjectSeedKey,
                    defaultId
                );
            }
            const storedValue = getToggleStateValue(ObjectToggleState, slotState.stateKey);
            if (storedValue !== undefined && slotState.optionMap.has(storedValue)) {
                slotState.activeId = storedValue;
            }
            if (!slotState.optionMap.has(slotState.activeId)) {
                slotState.activeId = "";
                setToggleStateValue(ObjectToggleState, slotState.stateKey, slotState.activeId, {
                    syncLock: false,
                });
            }
            const toggleControl = buildToggleControl({
                options: slotState.options,
                activeId: slotState.activeId,
                ariaLabel: slotState.toggleAriaLabel,
                onSelect: (id) => {
                    const setter = objectSlotSetters.get(slotState.id);
                    if (setter) {
                        setter(id);
                    }
                },
                getActiveId: () => slotState.activeId,
            });
            toggleControl.toggle.dataset.toggleType = "object";
            toggleControl.toggle.dataset.toggleSlot = slotState.id;
            slotState.buttons = toggleControl.buttons;
            slotState.toggleEl = toggleControl.toggle;
            titleControls.appendChild(toggleControl.toggle);
            slotState.setActive = (markerId, options = {}) => {
                slotState.activeId = markerId;
                setToggleStateValue(ObjectToggleState, slotState.stateKey, markerId, {
                    syncLock: true,
                });
                setToggleActiveState(slotState.buttons, markerId);
                updateObjectToggleStyling();
                updateVerbTenseBlockPalette();
                if (options.render !== false) {
                    renderRows();
                }
            };
            objectSlotSetters.set(slotState.id, slotState.setActive);
        });
    tenseTitle.appendChild(titleControls);
    tenseBlock.appendChild(tenseTitle);

    const list = document.createElement("div");
    list.className = "conjugation-list";
    const blockOutputRows = [];
    tenseBlock.__outputRows = blockOutputRows;

    const getSubjectToggleLabelForExport = () => {
        if (isNonactiveMode && allowSubjectToggle) {
            return passiveSubjectOptionMap.get(activePassiveSubject)?.label || "";
        }
        return subjectOptionMap.get(activeSubject)?.label || "";
    };

    const getObjectSlotCountForExport = () => normalizeUnifiedVerbOutputObjectSlotCount(
        objectSlotStates.filter((slotState) => Boolean(slotState.toggleEl)).length
    );

    const appendBlockOutputRow = ({
        person = "",
        personSub = "",
        form = "",
        slotValuesById = {},
    } = {}) => {
        blockOutputRows.push(normalizeUnifiedVerbOutputEntry({
            sourceMode: isNonactiveMode ? COMBINED_MODE.nonactive : COMBINED_MODE.active,
            block: String(titleLabel?.textContent || "").trim(),
            person,
            personSub,
            subjectToggle: getSubjectToggleLabelForExport(),
            object: slotValuesById.object || "",
            object2: slotValuesById.object2 || "",
            object3: slotValuesById.object3 || "",
            form,
            objectSlotCount: getObjectSlotCountForExport(),
        }));
    };

    const updateSectionCategory = (prefix) => {
        applyObjectSectionCategory(sectionEl, prefix);
    };

    const getSubjectSelectionsForId = (subjectId = activeSubject) => {
        let selections = getSubjectPersonSelections();
        if (subjectId !== SUBJECT_TOGGLE_ALL) {
            const entry = subjectOptionMap.get(subjectId);
            if (!entry) {
                return [];
            }
            selections = selections.filter(({ selection }) => (
                selection.subjectPrefix === entry.subjectPrefix
                && selection.subjectSuffix === entry.subjectSuffix
            ));
        }
        return selections;
    };

    const buildObjectSlotModelsForState = (slotOverrides = {}) => objectSlotStates.map((slotState) => {
        const overrideId = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id)
            ? slotOverrides[slotState.id]
            : slotState.activeId;
        return {
            id: slotState.id,
            datasetKey: slotState.datasetKey,
            roleLabel: slotState.roleLabel,
            rawValues: overrideId === OBJECT_TOGGLE_ALL
                ? slotState.toggleValues
                : [overrideId],
        };
    });

    const iterateObjectSlotValues = (slotModels, slotIndex, rawBySlot, callback) => {
        if (slotIndex >= slotModels.length) {
            callback(rawBySlot);
            return;
        }
        const slotModel = slotModels[slotIndex];
        const values = Array.isArray(slotModel.rawValues) && slotModel.rawValues.length
            ? slotModel.rawValues
            : [""];
        values.forEach((slotValue) => {
            rawBySlot[slotModel.id] = slotValue || "";
            iterateObjectSlotValues(slotModels, slotIndex + 1, rawBySlot, callback);
        });
    };

    const combinationEvaluationCache = new Map();
    const nonactiveCombinationEvaluationCache = new Map();
    let toggleAvailabilityMemo = new Map();
    const generationModeOverride = buildVerbModeGenerateOverride({
        isNonactiveMode,
        derivationType,
    });
    const toggleAvailabilityMemoContext = [
        "toggle-availability",
        modeKey || "",
        derivationType || "",
        isNonactiveMode ? "nonactive" : "active",
        verb || "",
        tenseValue || "",
        String(activeValency || 0),
        String(modeObjectSlots || 0),
        String(nonactiveAvailableSlots || 0),
        String(allowIndirectObjectToggle),
        String(allowSubjectToggle),
        String(allowObjectToggle),
        hasPromotableObject ? "1" : "0",
    ].join("|");
    const evaluateObjectCombinationState = (selection, rawBySlot) => {
        const slotValuesByRole = mapSlotValuesByRole(rawBySlot);
        const grammarConstraintState = evaluateGrammarConstraintSet({
            grammarState: resolvedGrammarState,
            subjectSelection: selection,
            slotValuesByRole,
            enforceValence4Matrix: allowThirdObjectToggle && Number(activeValency) >= 4,
        });
        const rawObjectPrefix = grammarConstraintState.rawSlotValuesById.object || "";
        const rawIndirectMarker = grammarConstraintState.rawSlotValuesById.object2 || "";
        const rawThirdMarker = grammarConstraintState.rawSlotValuesById.object3 || "";
        const cacheKey = [
            selection.subjectPrefix,
            selection.subjectSuffix,
            rawObjectPrefix,
            rawIndirectMarker,
            rawThirdMarker,
        ].join("|");
        const cached = combinationEvaluationCache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const shouldEnforceValence4Matrix = allowThirdObjectToggle && Number(activeValency) >= 4;
        const hasValenceStructureError = grammarConstraintState.valence4Violation;
        const resolvedValence = {
            objectPrefix: grammarConstraintState.normalizedSlotValuesById.object || "",
            indirectObjectMarker: grammarConstraintState.normalizedSlotValuesById.object2 || "",
        };
        const displaySlotValues = shouldEnforceValence4Matrix
            ? {
                object: rawObjectPrefix,
                object2: collapseSilentSpecificForDisplay(rawIndirectMarker),
                object3: collapseSilentSpecificForDisplay(rawThirdMarker),
            }
            : {
                object: resolvedValence.objectPrefix || "",
                object2: resolvedValence.indirectObjectMarker || "",
                object3: rawThirdMarker || "",
            };
        const generatedIndirectMarker = shouldEnforceValence4Matrix
            ? collapseSilentSpecificForDisplay(rawIndirectMarker)
            : rawIndirectMarker;
        const generatedThirdMarker = shouldEnforceValence4Matrix
            ? collapseSilentSpecificForDisplay(rawThirdMarker)
            : rawThirdMarker;
        const controllerForValidation = grammarConstraintState.controllerPrefix || "";
        const result = getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            override: {
                ...generationModeOverride,
                subjectPrefix: selection.subjectPrefix,
                subjectSuffix: selection.subjectSuffix,
                objectPrefix: rawObjectPrefix,
                indirectObjectMarker: generatedIndirectMarker,
                thirdObjectMarker: generatedThirdMarker,
                verb,
                tense: tenseValue,
            },
        }) || {};
        const maskState = getConjugationMaskState({
            result,
            subjectPrefix: selection.subjectPrefix,
            subjectSuffix: selection.subjectSuffix,
            objectPrefix: rawObjectPrefix,
            comboObjectPrefix: controllerForValidation,
        });
        const evaluation = {
            ...buildConjugationEvaluationRecord({
                result,
                maskState,
                grammarConstraintState,
                hasValenceStructureError,
            }),
            rawObjectPrefix,
            rawIndirectMarker,
            rawThirdMarker,
            displaySlotValues,
        };
        combinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
    };

    const resolveToggleAvailabilityState = ({ subjectSelections, objectSlotModels }) => {
        const memoKey = [
            toggleAvailabilityMemoContext,
            "active",
            subjectSelections.map(({ selection }) => (
                `${selection.subjectPrefix || ""}:${selection.subjectSuffix || ""}`
            )).join(","),
            objectSlotModels.map((slotModel) => (
                `${slotModel.id}:${(slotModel.rawValues || []).join(",")}`
            )).join(";"),
        ].join("|");
        if (toggleAvailabilityMemo.has(memoKey)) {
            return toggleAvailabilityMemo.get(memoKey);
        }
        const summary = createToggleAvailabilityRealizationSummary();
        subjectSelections.forEach(({ selection }) => {
            iterateObjectSlotValues(objectSlotModels, 0, {}, (rawBySlot) => {
                const evaluation = evaluateObjectCombinationState(selection, rawBySlot);
                recordToggleAvailabilityRealization(summary, evaluation);
            });
        });
        const resolvedRecord = realizeToggleAvailabilitySummary(summary);
        toggleAvailabilityMemo.set(memoKey, resolvedRecord);
        return resolvedRecord;
    };

    const clearToggleAvailabilityStyling = () => {
        subjectButtons.forEach((button) => clearToggleAvailabilityClasses(button));
        passiveSubjectButtons.forEach((button) => clearToggleAvailabilityClasses(button));
        objectSlotStates.forEach((slotState) => {
            slotState.buttons.forEach((button) => clearToggleAvailabilityClasses(button));
        });
    };

    const evaluateNonactiveCombinationState = ({
        objectPrefixCandidate = "",
        passiveSubjectPrefixCandidate = null,
    }) => {
        const cacheKey = `${objectPrefixCandidate || ""}|${passiveSubjectPrefixCandidate || ""}`;
        const cachedEvaluation = nonactiveCombinationEvaluationCache.get(cacheKey);
        if (cachedEvaluation) {
            return cachedEvaluation;
        }
        const overridePayload = {
            ...generationModeOverride,
            objectPrefix: objectPrefixCandidate,
            verb,
            tense: tenseValue,
        };
        let subjectOverride = null;
        if (isDirectGroup && passiveSubjectPrefixCandidate) {
            subjectOverride = getPassiveSubjectOverride(passiveSubjectPrefixCandidate);
            if (!subjectOverride) {
                return buildConjugationEvaluationRecord({
                    result: {},
                    extraDiagnostics: [
                        buildConjugationDiagnosticEntry(
                            CONJUGATION_DIAGNOSTIC_IDS.invalidCombo,
                            "error",
                            { source: "grammar-constraint" }
                        ),
                    ],
                });
            }
            overridePayload.subjectPrefix = subjectOverride.subjectPrefix;
            overridePayload.subjectSuffix = subjectOverride.subjectSuffix;
            overridePayload.preservePassiveSubject = true;
        }
        const result = getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            allowPassiveObject: isDirectGroup && allowObjectToggle,
            override: overridePayload,
        }) || {};
        const mappedSubjectInfo = subjectOverride
            ? getSubjectPersonInfo(subjectOverride.subjectPrefix || "", subjectOverride.subjectSuffix || "")
            : null;
        const shouldBypassPassiveMappedConstraints = isDirectGroup
            && !!subjectOverride
            && mappedSubjectInfo?.person === 3;
        const maskState = getConjugationMaskState({
            result,
            subjectPrefix: subjectOverride?.subjectPrefix || "",
            subjectSuffix: subjectOverride?.subjectSuffix || "",
            objectPrefix: objectPrefixCandidate,
            invalidComboSet: INVALID_COMBINATION_KEYS,
            controllerObjectMarker: shouldBypassPassiveMappedConstraints ? "" : null,
            enforceInvalidCombo: true,
        });
        const hideReflexive = !!(result && result.isReflexive && getObjectCategory(objectPrefixCandidate) !== "reflexive");
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
        nonactiveCombinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
    };

    const updateToggleOptionAvailabilityStyling = () => {
        if (!verb) {
            clearToggleAvailabilityStyling();
            return;
        }
        if (VerbRenderContext === "typing") {
            scheduleDeferredToggleAvailabilityPass();
            return;
        }
        if (isNonactiveMode) {
            clearToggleAvailabilityStyling();
            const objectSelectionPool = allowObjectToggle
                ? objectTogglePrefixes
                : [""];
            const resolveObjectSelections = (objectToggleId) => (
                allowObjectToggle
                    ? (objectToggleId === OBJECT_TOGGLE_ALL ? objectSelectionPool : [objectToggleId])
                    : [""]
            );
            const directSubjectPool = passiveSubjectPrefixes.filter((prefix) => prefix !== "");
            const resolveSubjectSelections = (subjectToggleId) => {
                if (!isDirectGroup) {
                    return [null];
                }
                if (allowSubjectToggle) {
                    return subjectToggleId === OBJECT_TOGGLE_ALL
                        ? directSubjectPool
                        : [subjectToggleId];
                }
                return directSubjectPool.length ? directSubjectPool : [null];
            };
            const classifyNonactiveSummary = (objectToggleId, subjectToggleId) => {
                const objectSelections = resolveObjectSelections(objectToggleId);
                const subjectSelections = resolveSubjectSelections(subjectToggleId);
                const memoKey = [
                    toggleAvailabilityMemoContext,
                    "nonactive",
                    objectToggleId || "",
                    subjectToggleId || "",
                    objectSelections.join(","),
                    subjectSelections.map((value) => value || "").join(","),
                ].join("|");
                if (toggleAvailabilityMemo.has(memoKey)) {
                    return toggleAvailabilityMemo.get(memoKey);
                }
                const summary = createToggleAvailabilityRealizationSummary();
                objectSelections.forEach((objectPrefixCandidate) => {
                    subjectSelections.forEach((passiveSubjectPrefixCandidate) => {
                        const evaluation = evaluateNonactiveCombinationState({
                            objectPrefixCandidate,
                            passiveSubjectPrefixCandidate,
                        });
                        recordToggleAvailabilityRealization(summary, evaluation);
                    });
                });
                const resolvedRecord = realizeToggleAvailabilitySummary(summary);
                toggleAvailabilityMemo.set(memoKey, resolvedRecord);
                return resolvedRecord;
            };
            const primarySlotState = objectSlotStateById.get("object");
            if (primarySlotState) {
                primarySlotState.buttons.forEach((button, objectToggleId) => {
                    const availabilityRecord = classifyNonactiveSummary(objectToggleId, activePassiveSubject);
                    const availabilityState = availabilityRecord.availabilityState;
                    applyToggleAvailabilityClass(button, availabilityState);
                    applySelectedAvailabilityClass(button, availabilityState, objectToggleId === activeObjectPrefix);
                });
            }
            if (allowSubjectToggle) {
                passiveSubjectButtons.forEach((button, subjectToggleId) => {
                    const availabilityRecord = classifyNonactiveSummary(activeObjectPrefix, subjectToggleId);
                    const availabilityState = availabilityRecord.availabilityState;
                    applyToggleAvailabilityClass(button, availabilityState);
                    applySelectedAvailabilityClass(button, availabilityState, subjectToggleId === activePassiveSubject);
                });
            }
            return;
        }
        const activeSubjectSelections = getSubjectSelectionsForId(activeSubject);
        objectSlotStates.forEach((slotState) => {
            slotState.buttons.forEach((button, optionId) => {
                const staticViableSet = staticViableOptionSetBySlot.get(slotState.id);
                if (
                    staticViableSet
                    && optionId !== OBJECT_TOGGLE_ALL
                    && !staticViableSet.has(optionId)
                ) {
                    applyToggleAvailabilityClass(button, CONJUGATION_AVAILABILITY_STATE.impossible);
                    applySelectedAvailabilityClass(button, CONJUGATION_AVAILABILITY_STATE.impossible, optionId === slotState.activeId);
                    return;
                }
                const optionObjectModels = buildObjectSlotModelsForState({ [slotState.id]: optionId });
                const availabilityRecord = resolveToggleAvailabilityState({
                    subjectSelections: activeSubjectSelections,
                    objectSlotModels: optionObjectModels,
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
            });
        });
        if (subjectButtons.size) {
            const activeObjectModels = buildObjectSlotModelsForState();
            subjectButtons.forEach((button, subjectId) => {
                const subjectSelections = getSubjectSelectionsForId(subjectId);
                const availabilityRecord = resolveToggleAvailabilityState({
                    subjectSelections,
                    objectSlotModels: activeObjectModels,
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, subjectId === activeSubject);
            });
        }
    };

    const renderRows = () => {
        combinationEvaluationCache.clear();
        nonactiveCombinationEvaluationCache.clear();
        toggleAvailabilityMemo = new Map();
        blockOutputRows.length = 0;
        list.innerHTML = "";
        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = getPlaceholderLabel(
                "conjugations",
                isNawat,
                "Ingresa un verbo para ver las conjugaciones."
            );
            list.appendChild(placeholder);
            updateToggleOptionAvailabilityStyling();
            return;
        }

        if (isNonactiveMode) {
            renderNonactiveConjugationRows({
                list,
                verb,
                tenseValue,
                prefixes,
                isDirectGroup,
                allowObjectToggle,
                allowSubjectToggle,
                objectTogglePrefixes,
                activeObjectPrefix,
                passiveSubjectPrefixes,
                activePassiveSubject,
                forceImpersonal,
                isNawat,
                generationModeOverride,
                buildOutputRowEntry: ({ person, personSub, form, slotValuesById }) => {
                    appendBlockOutputRow({
                        person,
                        personSub,
                        form,
                        slotValuesById,
                    });
                },
            });
            updateToggleOptionAvailabilityStyling();
            return;
        }

        const subjectSelections = getSubjectSelectionsForId(activeSubject);
        const objectSlotModels = buildObjectSlotModelsForState();
        const seenRows = new Set();
        const seenCanonicalBitransitiveRows = new Set();
        const isBitransitiveGrid = allowIndirectObjectToggle;
        const renderForObjectCombination = (group, selection, rawBySlot) => {
            const evaluation = evaluateObjectCombinationState(selection, rawBySlot);
            const displaySlotValues = evaluation.displaySlotValues;
            const canonicalKey = [
                selection.subjectPrefix,
                selection.subjectSuffix,
                ...objectSlotModels.map((slotModel) => displaySlotValues[slotModel.id] || ""),
            ].join("|");
            if (isBitransitiveGrid && seenCanonicalBitransitiveRows.has(canonicalKey)) {
                return;
            }
            const row = document.createElement("div");
            row.className = "conjugation-row";
            applyConjugationRowClasses(row, displaySlotValues.object);
            objectSlotModels.forEach((slotModel) => {
                if (!slotModel.datasetKey) {
                    return;
                }
                row.dataset[slotModel.datasetKey] = displaySlotValues[slotModel.id] || "";
            });

            const label = document.createElement("div");
            label.className = "conjugation-label";

            const personLabel = document.createElement("div");
            personLabel.className = "person-label";
            personLabel.textContent = getSubjectPersonLabel(group, selection, isNawat);

            const personSub = document.createElement("div");
            personSub.className = "person-sub";

            label.appendChild(personLabel);
            label.appendChild(personSub);

            const value = document.createElement("div");
            value.className = "conjugation-value";
            const shouldMaskRow = evaluation.shouldMaskRow;
            const isErrorRow = evaluation.isErrorRow;
            const basePersonSub = getSubjectSubLabel(selection, {
                isNawat,
                mode: subjectSubMode,
                tenseValue,
            });
            const showZeroObjectRoles = isBitransitiveGrid && Number(activeValency) >= 4;
            const useObjectOnlyPersonSub = Number(activeValency) >= 3;
            const objectOnlyParts = [];
            const roleParts = [];
            objectSlotModels.forEach((slotModel) => {
                const displayValue = displaySlotValues[slotModel.id] || "";
                const slotLabel = displayValue
                    ? getObjectComboLabel(displayValue, isNawat)
                    : (showZeroObjectRoles ? "Ø" : "");
                if (!slotLabel) {
                    return;
                }
                objectOnlyParts.push(slotLabel);
                roleParts.push(`${slotModel.roleLabel} ${slotLabel}`.trim());
            });
            personSub.textContent = useObjectOnlyPersonSub
                ? formatActiveValence3PlusPersonSub(basePersonSub, objectOnlyParts, isNawat)
                : (roleParts.length
                    ? [basePersonSub, ...roleParts].filter(Boolean).join(" · ")
                    : [basePersonSub].filter(Boolean).join(" · "));
            const renderedValue = shouldMaskRow
                ? "—"
                : formatConjugationDisplay(evaluation.result.result);
            const dedupeKey = isBitransitiveGrid
                ? canonicalKey
                : [
                    selection.subjectPrefix,
                    selection.subjectSuffix,
                    ...objectSlotModels.map((slotModel) => displaySlotValues[slotModel.id] || ""),
                    renderedValue,
                ].join("|");
            if (seenRows.has(dedupeKey)) {
                return;
            }
            seenRows.add(dedupeKey);
            if (isBitransitiveGrid) {
                seenCanonicalBitransitiveRows.add(canonicalKey);
            }
            applyConjugationEvaluationPresentation({
                row,
                value,
                evaluation,
                formattedValue: renderedValue,
            });

            row.appendChild(label);
            row.appendChild(value);
            list.appendChild(row);
            appendBlockOutputRow({
                person: personLabel.textContent.trim(),
                personSub: personSub.textContent.trim(),
                form: value.textContent.trim(),
                slotValuesById: displaySlotValues,
            });
        };
        subjectSelections.forEach(({ group, selection }) => {
            iterateObjectSlotValues(objectSlotModels, 0, {}, (rawBySlot) => {
                renderForObjectCombination(group, selection, rawBySlot);
            });
        });
        updateToggleOptionAvailabilityStyling();
    };

    const resolveSectionPrefix = (prefix) => {
        if (prefix !== OBJECT_TOGGLE_ALL) {
            return prefix;
        }
        if (isNonactiveMode) {
            return prefixes[0] || "";
        }
        return "";
    };

    const setActivePrefix = (prefix, options = {}) => {
        activeObjectPrefix = prefix;
        if (primaryObjectSlot) {
            primaryObjectSlot.activeId = prefix;
        }
        setToggleStateValue(ObjectToggleState, objectStateKey, prefix, { syncLock: true });
        if (!isNonactiveMode) {
            titleLabel.textContent = buildBlockLabel();
        }
        tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(prefix)}-${tenseValue}`;
        updateSectionCategory(resolveSectionPrefix(prefix));
        setToggleActiveState(toggleButtons, prefix);
        updateObjectToggleStyling();
        updateVerbTenseBlockPalette();
        if (options.render !== false) {
            renderRows();
        }
    };

    tenseBlock.appendChild(list);
    if (isNonactiveMode) {
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        const nonactiveBaseLabel = isIntransitiveOnly
            ? impersonalLabel
            : (isDirectGroup ? passiveLabel : impersonalLabel);
        titleLabel.textContent = valencyLabel
            ? `${nonactiveBaseLabel} · ${valencyLabel}`
            : nonactiveBaseLabel;
        setActivePrefix(activeObjectPrefix, { render: false });
        if (setActivePassiveSubject) {
            setActivePassiveSubject(activePassiveSubject, { render: false });
        }
    } else {
        setActivePrefix(activeObjectPrefix, { render: false });
        if (setActiveSubject) {
            setActiveSubject(activeSubject, { render: false });
        }
    }
    objectSlotStates
        .filter((slotState) => !slotState.isPrimary && typeof slotState.setActive === "function")
        .forEach((slotState) => {
            slotState.setActive(slotState.activeId, { render: false });
        });
    updateVerbTenseBlockPalette();
    renderRows();
    return tenseBlock;
}

function clearUnifiedVerbOutputDataset() {
    VerbUnifiedOutputState.rows = [];
    VerbUnifiedOutputState.bySourceKey = new Map();
    VerbUnifiedOutputState.grouped = new Map();
    VerbUnifiedOutputState.updatedAt = Date.now();
}

function rebuildUnifiedVerbOutputDataset(container, {
    tenseValue = "",
    groupKey = "",
} = {}) {
    if (!container || typeof container.querySelectorAll !== "function") {
        clearUnifiedVerbOutputDataset();
        return;
    }
    const structuredRows = collectStructuredUnifiedVerbOutputRows(container, {
        tenseValue,
        groupKey,
    });
    if (structuredRows.length) {
        setUnifiedVerbOutputDatasetRows(structuredRows, {
            tenseValue,
            groupKey,
        });
        return;
    }
    const rows = [];
    const bySourceKey = new Map();
    const grouped = new Map();
    const rowNodes = Array.from(container.querySelectorAll(".tense-block .conjugation-row"));
    rowNodes.forEach((row) => {
        const block = row.closest(".tense-block");
        if (!block) {
            return;
        }
        const sourceColumn = row.closest(".tense-grid-source-column");
        const sourceMode = sourceColumn?.dataset?.sourceMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        const blockLabel = block.querySelector(".tense-block__label")?.textContent?.trim() || "";
        const person = row.querySelector(".person-label")?.textContent?.trim() || "";
        const personSub = row.querySelector(".person-sub")?.textContent?.trim() || "";
        const form = row.querySelector(".conjugation-value")?.textContent?.trim() || "";
        const object = row.dataset.objectPrefix || "";
        const object2 = row.dataset.indirectObjectPrefix || "";
        const object3 = row.dataset.thirdObjectPrefix || "";
        const selectionState = getCurrentResolvedConjugationSelectionState();
        const entry = {
            tenseValue: tenseValue || (
                selectionState.group === CONJUGATION_GROUPS.universal
                    ? selectionState.universalTenseValue
                    : selectionState.tenseValue
            ) || "",
            groupKey: groupKey || selectionState.group || "",
            sourceMode,
            block: blockLabel,
            person,
            personSub,
            object,
            object2,
            object3,
            form,
        };
        rows.push(entry);
        const baseKey = [
            entry.groupKey,
            entry.tenseValue,
            entry.block,
            entry.person,
            entry.personSub,
            entry.object,
            entry.object2,
            entry.object3,
        ].join("|");
        const sourceKey = `${baseKey}|${sourceMode}`;
        bySourceKey.set(sourceKey, entry);
        const groupedEntry = grouped.get(baseKey) || {};
        groupedEntry[sourceMode] = entry;
        grouped.set(baseKey, groupedEntry);
    });
    VerbUnifiedOutputState.rows = rows;
    VerbUnifiedOutputState.bySourceKey = bySourceKey;
    VerbUnifiedOutputState.grouped = grouped;
    VerbUnifiedOutputState.updatedAt = Date.now();
}

function renderVerbConjugationBlocks({
    container,
    tenseValue,
    buildBlock,
    objectPrefixGroupsByMode = null,
    modesToRender = [COMBINED_MODE.active],
    isNawat = false,
}) {
    container.innerHTML = "";
    const normalizedModes = Array.isArray(modesToRender) && modesToRender.length
        ? Array.from(new Set(modesToRender.map((mode) => (
            mode === COMBINED_MODE.nonactive ? COMBINED_MODE.nonactive : COMBINED_MODE.active
        ))))
        : [COMBINED_MODE.active];
    const groupsByMode = new Map();
    normalizedModes.forEach((mode) => {
        const groups = objectPrefixGroupsByMode instanceof Map
            ? (objectPrefixGroupsByMode.get(mode) || [])
            : [];
        groupsByMode.set(mode, Array.isArray(groups) ? groups : []);
    });
    const maxGroupCount = normalizedModes.reduce((max, mode) => (
        Math.max(max, (groupsByMode.get(mode) || []).length)
    ), 0);
    for (let groupIndex = 0; groupIndex < maxGroupCount; groupIndex += 1) {
        const objSection = document.createElement("div");
        objSection.className = "object-section";
        const grid = document.createElement("div");
        grid.className = "tense-grid";
        const useSourceColumns = normalizedModes.length > 1;
        const sourceColumns = useSourceColumns ? createSourceModeColumns(grid, isNawat) : null;
        normalizedModes.forEach((mode) => {
            const objectGroup = (groupsByMode.get(mode) || [])[groupIndex];
            if (!objectGroup) {
                return;
            }
            const block = buildBlock(tenseValue, objectGroup, objSection, mode);
            if (!block) {
                return;
            }
            if (sourceColumns) {
                sourceColumns.appendBlock(block, mode);
                return;
            }
            grid.appendChild(block);
        });
        if (sourceColumns) {
            sourceColumns.finalize();
        }
        objSection.appendChild(grid);
        container.appendChild(objSection);
    }
}

function createObjectSectionGrid(container) {
    container.innerHTML = "";
    const objSection = document.createElement("div");
    objSection.className = "object-section";
    const grid = document.createElement("div");
    grid.className = "tense-grid";
    objSection.appendChild(grid);
    container.appendChild(objSection);
    return { objSection, grid };
}

function createSourceModeColumns(grid, isNawat = false) {
    if (!grid) {
        return null;
    }
    grid.classList.add("tense-grid--source-columns");
    const buildColumn = (mode, fallbackLabel = "") => {
        const column = document.createElement("div");
        column.className = "tense-grid-source-column";
        column.dataset.sourceMode = mode;
        const heading = document.createElement("div");
        heading.className = "tense-grid-source-column__heading";
        const labelKey = mode === COMBINED_MODE.nonactive
            ? "tense-tabs-mode-nonactive"
            : "tense-tabs-mode-active";
        heading.textContent = getLocalizedLabel(
            UI_LABELS[labelKey],
            isNawat,
            fallbackLabel
        );
        const blocks = document.createElement("div");
        blocks.className = "tense-grid-source-column__blocks";
        column.appendChild(heading);
        column.appendChild(blocks);
        grid.appendChild(column);
        return { column, blocks, mode };
    };
    const activeColumn = buildColumn(COMBINED_MODE.active, "activo");
    const nonactiveColumn = buildColumn(COMBINED_MODE.nonactive, "no activo");
    return {
        appendBlock(block, mode = COMBINED_MODE.active) {
            if (!block) {
                return;
            }
            const target = mode === COMBINED_MODE.nonactive
                ? nonactiveColumn.blocks
                : activeColumn.blocks;
            target.appendChild(block);
        },
        finalize() {
            [activeColumn.blocks, nonactiveColumn.blocks].forEach((blocks) => {
                if (blocks.children.length > 0) {
                    return;
                }
                const empty = document.createElement("div");
                empty.className = "tense-grid-source-column__empty";
                empty.textContent = "—";
                blocks.appendChild(empty);
            });
        },
    };
}

function buildToggleControl({
    options,
    activeId,
    onSelect,
    ariaLabel,
    getTitle,
    getIsDisabled,
    getActiveId,
    stacked = true,
    toggleClassName = "",
    allowDeselect = false,
}) {
    const toggle = document.createElement("div");
    toggle.className = stacked
        ? "object-toggle object-toggle--stacked"
        : "object-toggle";
    if (toggleClassName) {
        toggle.classList.add(toggleClassName);
    }
    toggle.setAttribute("role", "group");
    toggle.setAttribute("aria-label", ariaLabel);
    const buttons = new Map();
    options.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "object-toggle-button";
        button.textContent = option.label;
        const isActive = option.id === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        const title = typeof getTitle === "function" ? getTitle(option) : option.title;
        if (title) {
            button.title = title;
        }
        const isDisabled = typeof getIsDisabled === "function" ? getIsDisabled(option) : false;
        if (isDisabled) {
            button.disabled = true;
        }
        button.addEventListener("click", () => {
            const resolvedActiveId = typeof getActiveId === "function"
                ? getActiveId()
                : activeId;
            if (allowDeselect && resolvedActiveId === option.id) {
                preserveViewportAnchorPosition(button, () => {
                    onSelect(null);
                });
                return;
            }
            if (isToggleLockEnabled() && resolvedActiveId === option.id) {
                preserveViewportAnchorPosition(button, () => {
                    setToggleLockEnabled(false, {
                        resetToDefaults: true,
                        persist: true,
                        refreshUi: true,
                    });
                });
                return;
            }
            preserveViewportAnchorPosition(button, () => {
                onSelect(option.id);
            });
        });
        buttons.set(option.id, button);
        toggle.appendChild(button);
    });
    return { toggle, buttons };
}

function setToggleActiveState(buttons, activeId) {
    buttons.forEach((button, key) => {
        const isActive = key === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function getVerbObjectPrefixGroups(parsedVerb, isNonactiveMode, nonactiveConfig) {
    const objectPrefixes = getObjectPrefixesForTransitividad(parsedVerb);
    if (isNonactiveMode && nonactiveConfig) {
        return nonactiveConfig.groups;
    }
    if (!isNonactiveMode && getTransitividadSelection(parsedVerb) === "transitivo") {
        const orderedPrefixes = ["nech", "metz", "ki", "tech", "metzin", "kin", "ta", "te", "mu"]
            .filter((prefix) => objectPrefixes.includes(prefix));
        return [{ prefixes: orderedPrefixes.length ? orderedPrefixes : objectPrefixes }];
    }
    return buildObjectPrefixGroups(objectPrefixes);
}

function resolveVerbTenseValue({ modeKey, tenseValue }) {
    const selectionState = getCurrentResolvedConjugationSelectionState();
    if (modeKey === "universal") {
        return PRETERITO_UNIVERSAL_ORDER.includes(tenseValue)
            ? tenseValue
            : selectionState.universalTenseValue;
    }
    return tenseValue || selectionState.tenseValue;
}

function buildVerbTabRenderContext({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
    modeKey,
    subjectKeyPrefix,
    subjectSubMode,
    combinedMode = null,
    includeDiagnostics = false,
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return null;
    }
    const resolvedCombinedMode = combinedMode === COMBINED_MODE.nonactive
        ? COMBINED_MODE.nonactive
        : (combinedMode === COMBINED_MODE.active ? COMBINED_MODE.active : getCombinedMode());
    const isNonactiveMode =
        getActiveTenseMode() === TENSE_MODE.verbo && resolvedCombinedMode === COMBINED_MODE.nonactive;
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const resolvedTenseValue = resolveVerbTenseValue({ modeKey, tenseValue });
    const parsedVerb = getParsedVerbForTab(modeKey || "verb", verb);
    const derivationType = parsedVerb.derivationType || getActiveDerivationType();
    const initialGrammarState = buildCanonicalGrammarState({
        parsedVerb,
        derivationType,
        voiceMode: isNonactiveMode ? VOICE_MODE.passive : VOICE_MODE.active,
        isNonactiveMode,
    });
    const forceDefaultTodosKi = parsedVerb.hasConsecutiveSpecificValences;
    const nonactiveConfig = isNonactiveMode ? getNonactiveObjectPrefixGroups(parsedVerb) : null;
    const valencySummary = initialGrammarState.valencySummary;
    const activeValency = initialGrammarState.valencyActive;
    const nonactiveAvailableSlots = isNonactiveMode
        ? valencySummary.nonactiveObjectSlots
        : 0;
    const modeObjectSlots = Array.isArray(initialGrammarState.modeSlots)
        ? initialGrammarState.modeSlots.length
        : (isNonactiveMode ? valencySummary.nonactiveObjectSlots : valencySummary.availableObjectSlots);
    const hasPromotableObject = isNonactiveMode
        ? valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots
        : false;
    const embeddedObjectFilled = parsedVerb.embeddedValenceCount > 0
        && getAvailableObjectSlots(parsedVerb) <= 0;
    const fusionMarkers = parsedVerb.isTaFusion
        ? (parsedVerb.fusionPrefixes || []).filter((prefix) => FUSION_PREFIXES.has(prefix))
        : [];
    const baseObjectPrefixGroups = getVerbObjectPrefixGroups(parsedVerb, isNonactiveMode, nonactiveConfig);
    const allowIndirectObjectToggleFinal = modeObjectSlots > 1;
    let objectPrefixGroups = baseObjectPrefixGroups;
    if (allowIndirectObjectToggleFinal && !isNonactiveMode) {
        const mergedPrefixes = Array.from(new Set(
            baseObjectPrefixGroups.flatMap((group) => group.prefixes || [])
        )).filter((prefix) => prefix !== "");
        if (mergedPrefixes.length) {
            objectPrefixGroups = [{ prefixes: mergedPrefixes }];
        }
    }
    const indirectTogglePrefixes = allowIndirectObjectToggleFinal
        ? [...SPECIFIC_VALENCE_PREFIXES, "ta", "te", "mu"]
        : [];
    const primaryTogglePrefixes = Array.from(new Set(
        objectPrefixGroups.flatMap((group) => group.prefixes || [])
    ));
    const grammarPipeline = runVerbGrammarPipeline({
        verb,
        modeKey: modeKey || "verb",
        parsedVerb,
        derivationType,
        voiceMode: isNonactiveMode ? VOICE_MODE.passive : VOICE_MODE.active,
        isNonactiveMode,
        primaryTogglePrefixes,
        indirectTogglePrefixes,
        includeDiagnostics,
    });
    const grammarState = grammarPipeline.state || initialGrammarState;
    const grammarUiConfig = grammarPipeline.uiConfig || null;
    const resolvedActiveValency = Number.isFinite(grammarState?.valencyActive)
        ? grammarState.valencyActive
        : activeValency;
    const resolvedModeObjectSlots = Array.isArray(grammarState?.modeSlots)
        ? grammarState.modeSlots.length
        : modeObjectSlots;
    const resolvedNonactiveAvailableSlots = isNonactiveMode
        ? (grammarState?.valencySummary?.nonactiveObjectSlots ?? nonactiveAvailableSlots)
        : 0;
    const context = {
        container,
        verb,
        resolvedTenseValue,
        combinedMode: resolvedCombinedMode,
        isNonactiveMode,
        isNawat,
        modeKey,
        subjectKeyPrefix,
        subjectSubMode,
        derivationType,
        activeValency: resolvedActiveValency,
        modeObjectSlots: resolvedModeObjectSlots,
        nonactiveAvailableSlots: resolvedNonactiveAvailableSlots,
        hasPromotableObject,
        embeddedObjectFilled,
        fusionMarkers,
        objectPrefixGroups,
        forceDefaultTodosKi,
        allowIndirectObjectToggle: resolvedModeObjectSlots > 1,
        indirectTogglePrefixes,
        grammarState,
        grammarUiConfig,
    };
    if (includeDiagnostics) {
        context.grammarConstraintContext = grammarPipeline.constraintStep || null;
        context.grammarStemPairs = grammarPipeline.stemStep?.stemPairs || [];
    }
    return context;
}

function renderVerbConjugationsCore({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
    modeKey,
    subjectKeyPrefix,
    subjectSubMode,
    includeDiagnostics = false,
}) {
    const selectedCombinedMode = getCombinedMode();
    const sourceScope = getVerbSourceScope();
    const isSimpleUi = getActiveUiDensityMode() === UI_DENSITY_MODE.simple;
    const modesToRender = isSimpleUi
        ? [COMBINED_MODE.active]
        : (getActiveTenseMode() !== TENSE_MODE.verbo
        ? [selectedCombinedMode]
        : (sourceScope === VERB_SOURCE_SCOPE.active
            ? [COMBINED_MODE.active]
            : (sourceScope === VERB_SOURCE_SCOPE.nonactive
                ? [COMBINED_MODE.nonactive]
                : [COMBINED_MODE.active, COMBINED_MODE.nonactive])));
    const contextByMode = new Map();
    modesToRender.forEach((mode) => {
        const modeContext = buildVerbTabRenderContext({
            verb,
            containerId,
            tenseValue,
            modeKey,
            subjectKeyPrefix,
            subjectSubMode,
            combinedMode: mode,
            includeDiagnostics: includeDiagnostics && mode === selectedCombinedMode,
        });
        if (modeContext) {
            contextByMode.set(mode, modeContext);
        }
    });
    const context = contextByMode.get(selectedCombinedMode)
        || contextByMode.get(COMBINED_MODE.active)
        || contextByMode.get(COMBINED_MODE.nonactive)
        || null;
    if (!context) {
        clearUnifiedVerbOutputDataset();
        return;
    }
    const objectPrefixGroupsByMode = new Map();
    contextByMode.forEach((modeContext, mode) => {
        objectPrefixGroupsByMode.set(mode, modeContext.objectPrefixGroups || []);
    });
    const buildBlock = (blockTenseValue, objectGroup, sectionEl, mode = selectedCombinedMode) => {
        const modeContext = contextByMode.get(mode) || context;
        return buildVerbTenseBlock({
            verb: modeContext.verb,
            tenseValue: blockTenseValue,
            objectGroup,
            sectionEl,
            isNonactiveMode: modeContext.isNonactiveMode,
            isNawat: modeContext.isNawat,
            modeKey: modeContext.modeKey,
            subjectKeyPrefix: modeContext.subjectKeyPrefix,
            subjectSubMode: modeContext.subjectSubMode,
            derivationType: modeContext.derivationType,
            activeValency: modeContext.activeValency,
            modeObjectSlots: modeContext.modeObjectSlots,
            nonactiveAvailableSlots: modeContext.nonactiveAvailableSlots,
            hasPromotableObject: modeContext.hasPromotableObject,
            embeddedObjectFilled: modeContext.embeddedObjectFilled,
            fusionMarkers: modeContext.fusionMarkers,
            forceDefaultTodosKi: modeContext.forceDefaultTodosKi,
            allowIndirectObjectToggle: modeContext.allowIndirectObjectToggle,
            indirectTogglePrefixes: modeContext.indirectTogglePrefixes,
            grammarState: modeContext.grammarState,
            grammarUiConfig: modeContext.grammarUiConfig,
        });
    };

    renderVerbConjugationBlocks({
        container: context.container,
        tenseValue: context.resolvedTenseValue,
        buildBlock,
        objectPrefixGroupsByMode,
        modesToRender,
        isNawat: context.isNawat,
    });
    const resolvedGroup = modeKey === "universal"
        ? CONJUGATION_GROUPS.universal
        : CONJUGATION_GROUPS.tense;
    rebuildUnifiedVerbOutputDataset(context.container, {
        tenseValue: context.resolvedTenseValue,
        groupKey: resolvedGroup,
    });
}

function renderPretUniversalConjugations({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
}) {
    renderVerbConjugationsCore({
        verb,
        containerId,
        tenseValue,
        modeKey: "universal",
        subjectKeyPrefix: "universal",
        subjectSubMode: "verb",
    });
}

function renderLocativoTemporalConjugations({
    verb,
    containerId = "all-tense-conjugations",
    modeFilter = null,
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const placeholderText = getPlaceholderLabel(
        "conjugations",
        isNawat,
        "Ingresa un verbo para ver las conjugaciones."
    );
    const allToggleLabel = getToggleLabel("all", isNawat, "todos");
    const impersonalLabel = getVerbBlockLabel("impersonal", isNawat, "impersonal");
    const possessorToggleLabel = getToggleLabel("possessor", isNawat, "Poseedor");
    const objectToggleLabel = getToggleLabel("object", isNawat, "Objeto");
    const verbMeta = getParsedVerbForTab("noun", verb);
    const possessorValues = POSSESSIVE_PREFIXES
        .map((entry) => entry.value)
        .filter((value) => value);
    const activeObjectKey = getObjectStateKey({
        groupKey: "locativo-temporal|active|objects",
        tenseValue: "locativo-temporal",
        mode: "noun",
    });
    const activePossessorKey = "noun|locativo-temporal|active|possessor";
    const nonactiveObjectKey = getObjectStateKey({
        groupKey: "locativo-temporal|nonactive|objects",
        tenseValue: "locativo-temporal",
        mode: "noun",
    });
    const nonactivePrimaryKey = "noun|locativo-temporal|nonactive|primary";
    const slotBundlesByMode = {
        [COMBINED_MODE.active]: buildNounObjectSlotToggleStates({
            verbMeta,
            tenseValue: "locativo-temporal",
            baseObjectStateKey: activeObjectKey,
            isNawat,
            combinedMode: COMBINED_MODE.active,
        }),
        [COMBINED_MODE.nonactive]: buildNounObjectSlotToggleStates({
            verbMeta,
            tenseValue: "locativo-temporal",
            baseObjectStateKey: nonactiveObjectKey,
            isNawat,
            combinedMode: COMBINED_MODE.nonactive,
        }),
    };
    const resolveStoredPossessor = ({ stateKey, allowedValues, fallbackValue = "" }) => {
        const allowedSet = new Set([OBJECT_TOGGLE_ALL, ...allowedValues]);
        let value = getToggleStateValue(PossessorToggleState, stateKey);
        if (!allowedSet.has(value)) {
            value = fallbackValue;
        }
        setToggleStateValue(PossessorToggleState, stateKey, value, { syncLock: false });
        return value;
    };

    const { grid } = createObjectSectionGrid(container);
    const sourceColumns = modeFilter == null ? createSourceModeColumns(grid, isNawat) : null;

    const buildPossessorOptions = (values) => {
        const options = [{ id: OBJECT_TOGGLE_ALL, label: allToggleLabel, value: "" }];
        values.forEach((value) => {
            options.push({
                id: value,
                label: value || "Ø",
                value,
            });
        });
        return options;
    };

    const buildBlock = ({ mode }) => {
        const isNonactive = mode === COMBINED_MODE.nonactive;
        const slotBundle = slotBundlesByMode[mode] || slotBundlesByMode[COMBINED_MODE.active];
        const mutableSlotStates = slotBundle.slotStates.map((slot) => ({ ...slot }));
        const nonactiveObjectToggleValues = Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES)
            .map((value) => String(value || ""))
            .filter(Boolean);
        if (isNonactive && nonactiveObjectToggleValues.length) {
            mutableSlotStates.forEach((slotState) => {
                slotState.toggleValues = nonactiveObjectToggleValues;
                slotState.options = getObjectToggleOptions(slotState.toggleValues, {
                    includeAll: true,
                    labelForPrefix: getNonspecificToggleLabel,
                    isNawat,
                });
                slotState.optionMap = new Map(slotState.options.map((entry) => [entry.id, entry]));
                slotState.showToggle = slotState.toggleValues.length > 1;
                const isActiveValid = slotState.activeId !== undefined
                    && (
                        slotState.toggleValues.includes(slotState.activeId)
                        || (slotState.showToggle && slotState.activeId === OBJECT_TOGGLE_ALL)
                    );
                if (!isActiveValid) {
                    slotState.activeId = getDefaultOutputToggleSelection({
                        context: "noun-extra-object",
                        values: slotState.toggleValues,
                        isAddedSlot: slotState.isAddedSlot,
                    });
                }
                setToggleStateValue(ObjectToggleState, slotState.stateKey, slotState.activeId, {
                    syncLock: false,
                });
            });
        }
        const buildNonactivePrimaryOptions = () => {
            const isIntransitiveNonactiveLocativo = slotBundle.availableObjectSlots <= 0;
            if (isIntransitiveNonactiveLocativo) {
                return [{
                    id: "impersonal",
                    label: impersonalLabel,
                    value: "",
                    type: "impersonal",
                }];
            }
            const options = [{ id: OBJECT_TOGGLE_ALL, label: allToggleLabel, type: "all", value: "" }];
            possessorValues.forEach((value) => {
                options.push({
                    id: `pos:${value}`,
                    label: value,
                    value,
                    type: "possessor",
                });
            });
            nonactiveObjectToggleValues.forEach((value) => {
                options.push({
                    id: `obj:${value}`,
                    label: value,
                    value,
                    type: "object",
                });
            });
            return options;
        };
        const slotStateById = new Map(mutableSlotStates.map((slot) => [slot.id, slot]));
        const slotButtonsById = new Map();
        const resolveActiveSlotValue = (slotId) => slotStateById.get(slotId)?.activeId || "";
        const possessorStateKey = activePossessorKey;
        const possessorToggleValues = possessorValues;
        const defaultPossessor = getDefaultOutputToggleSelection({
            context: "noun-possessor",
            values: possessorValues,
        });
        let activePossessor = resolveStoredPossessor({
            stateKey: possessorStateKey,
            allowedValues: possessorToggleValues,
            fallbackValue: defaultPossessor,
        });
        const nonactivePrimaryOptions = isNonactive ? buildNonactivePrimaryOptions() : [];
        const nonactivePrimaryOptionMap = new Map(nonactivePrimaryOptions.map((option) => [option.id, option]));
        let activeNonactivePrimary = getToggleStateValue(ObjectToggleState, nonactivePrimaryKey);
        if (isNonactive) {
            const hasStoredPrimary = activeNonactivePrimary === OBJECT_TOGGLE_ALL
                || nonactivePrimaryOptionMap.has(activeNonactivePrimary);
            if (!hasStoredPrimary) {
                const firstSpecificNonactivePrimary = nonactivePrimaryOptions.find(
                    (option) => option.id !== OBJECT_TOGGLE_ALL
                )?.id;
                activeNonactivePrimary = getDefaultOutputToggleSelection({
                    context: "noun-nonactive-primary",
                    values: Array.from(nonactivePrimaryOptionMap.keys()),
                    fallbackIds: [firstSpecificNonactivePrimary, OBJECT_TOGGLE_ALL],
                });
            }
            setToggleStateValue(ObjectToggleState, nonactivePrimaryKey, activeNonactivePrimary, {
                syncLock: false,
            });
        }
        const resolveNonactivePrimarySelection = (selectionId) => {
            const option = nonactivePrimaryOptionMap.get(selectionId);
            if (!option) {
                return {
                    objectPrefix: "",
                    possessorPrefix: "",
                };
            }
            if (option.type === "possessor") {
                return {
                    objectPrefix: POSSESSIVE_TO_OBJECT_PREFIX[option.value] || "",
                    possessorPrefix: option.value || "",
                };
            }
            if (option.type === "object") {
                return {
                    objectPrefix: option.value || "",
                    possessorPrefix: "",
                };
            }
            return {
                objectPrefix: "",
                possessorPrefix: "",
            };
        };

        const tenseBlock = document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${mode}-locativo-temporal`;

        const tenseTitle = document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = document.createElement("span");
        titleLabel.className = "tense-block__label";
        const locativoLabel = getLocalizedLabel(
            TENSE_LABELS["locativo-temporal"],
            isNawat,
            "locativo/temporal"
        );
        const locativoSourceMode = getNominalSourceModeForTense("locativo-temporal", { blockMode: mode });
        const locativoSourceTenseLabel = getNominalSourceTenseLabel("locativo-temporal", { isNawat });
        titleLabel.textContent = buildNominalSourceTaggedLabel(
            locativoLabel,
            locativoSourceMode,
            isNawat,
            { sourceTenseLabel: locativoSourceTenseLabel }
        );
        tenseTitle.appendChild(titleLabel);
        const titleControls = document.createElement("div");
        titleControls.className = "tense-block__controls tense-block__controls--stacked";

        const list = document.createElement("div");
        list.className = "conjugation-list";

        const resolveLocativoBlockPaletteSignature = () => {
            if (isNonactive) {
                const hasMixedObjectSlot = mutableSlotStates
                    .filter((slotState) => slotState.id !== "object")
                    .some((slotState) => slotState.activeId === OBJECT_TOGGLE_ALL);
                if (hasMixedObjectSlot || activeNonactivePrimary === OBJECT_TOGGLE_ALL) {
                    return "mixed";
                }
                const primarySelection = resolveNonactivePrimarySelection(activeNonactivePrimary);
                return buildBlockComboPaletteSignature({
                    mode: "noun",
                    valency: Math.max(1, mutableSlotStates.length + 1),
                    objectPrefix: primarySelection.objectPrefix,
                    indirectObjectMarker: resolveActiveSlotValue("object2"),
                    thirdObjectMarker: resolveActiveSlotValue("object3"),
                    possessorPrefix: primarySelection.possessorPrefix,
                });
            }
            const hasMixedObjectSlot = mutableSlotStates.some((slotState) => (
                slotState.activeId === OBJECT_TOGGLE_ALL
            ));
            if (hasMixedObjectSlot || activePossessor === OBJECT_TOGGLE_ALL) {
                return "mixed";
            }
            const objectPrefix = resolveActiveSlotValue("object");
            return buildBlockComboPaletteSignature({
                mode: "noun",
                valency: Math.max(1, mutableSlotStates.length + 1),
                objectPrefix,
                indirectObjectMarker: resolveActiveSlotValue("object2"),
                thirdObjectMarker: resolveActiveSlotValue("object3"),
                possessorPrefix: activePossessor || "",
            });
        };
        const updateLocativoBlockPalette = () => {
            applyTenseBlockComboPalette(tenseBlock, resolveLocativoBlockPaletteSignature());
        };
        const TOGGLE_AVAILABILITY_CLASS_NAMES = [
            "object-toggle-button--viable",
            "object-toggle-button--masked",
            "object-toggle-button--impossible",
        ];
        const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = [
            "object-toggle-button--selected-viable",
            "object-toggle-button--selected-masked",
            "object-toggle-button--selected-impossible",
        ];
        const clearToggleAvailabilityClasses = (button) => {
            if (!button) {
                return;
            }
            TOGGLE_AVAILABILITY_CLASS_NAMES.forEach((className) => {
                button.classList.remove(className);
            });
            TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach((className) => {
                button.classList.remove(className);
            });
        };
        const applyToggleAvailabilityClass = (button, state) => {
            clearToggleAvailabilityClasses(button);
            if (!button || !state) {
                return;
            }
            if (state === "viable") {
                button.classList.add("object-toggle-button--viable");
                return;
            }
            if (state === "masked") {
                button.classList.add("object-toggle-button--masked");
                return;
            }
            if (state === "impossible") {
                button.classList.add("object-toggle-button--impossible");
            }
        };
        const applySelectedAvailabilityClass = (button, state, isSelected) => {
            if (!button || !isSelected) {
                return;
            }
            if (state === "viable") {
                button.classList.add("object-toggle-button--selected-viable");
                return;
            }
            if (state === "masked") {
                button.classList.add("object-toggle-button--selected-masked");
                return;
            }
            if (state === "impossible") {
                button.classList.add("object-toggle-button--selected-impossible");
            }
        };
        const buildLocativoObjectSlotModelsForState = ({
            slotOverrides = {},
            includeObjectSlot = !isNonactive,
        } = {}) => (
            mutableSlotStates
                .filter((slotState) => includeObjectSlot || slotState.id !== "object")
                .map((slotState) => {
                    const hasOverride = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id);
                    const overrideId = hasOverride ? slotOverrides[slotState.id] : slotState.activeId;
                    const values = overrideId === OBJECT_TOGGLE_ALL
                        ? slotState.toggleValues
                        : [overrideId];
                    return {
                        id: slotState.id,
                        values: values.length ? values : [""],
                    };
                })
        );
        const getActivePossessorSelections = (possessorId = activePossessor) => {
            if (possessorId === OBJECT_TOGGLE_ALL) {
                return possessorToggleValues.length ? possessorToggleValues : [defaultPossessor];
            }
            if (possessorToggleValues.includes(possessorId)) {
                return [possessorId];
            }
            return [defaultPossessor];
        };
        const getNonactivePrimarySelectionIds = (selectionId = activeNonactivePrimary) => {
            const allPrimarySelectionIds = nonactivePrimaryOptions
                .filter((option) => option.id !== OBJECT_TOGGLE_ALL)
                .map((option) => option.id);
            if (selectionId === OBJECT_TOGGLE_ALL) {
                return allPrimarySelectionIds;
            }
            if (nonactivePrimaryOptionMap.has(selectionId)) {
                return [selectionId];
            }
            return allPrimarySelectionIds.length ? [allPrimarySelectionIds[0]] : [];
        };
        const locativoCombinationEvaluationCache = new Map();
        let locativoAvailabilityMemo = new Map();
        const evaluateLocativoCombinationState = ({
            objectPrefix = "",
            indirectObjectMarker = "",
            thirdObjectMarker = "",
            possessorPrefix = "",
        }) => {
            const cacheKey = [
                objectPrefix || "",
                indirectObjectMarker || "",
                thirdObjectMarker || "",
                possessorPrefix || "",
            ].join("|");
            const cached = locativoCombinationEvaluationCache.get(cacheKey);
            if (cached) {
                return cached;
            }
            const result = getLocativoTemporalResult({
                rawVerb: verb,
                verbMeta,
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                possessivePrefix: possessorPrefix,
                combinedMode: mode,
            }) || {};
            const maskState = getLocativoTemporalMaskState({
                result,
                objectPrefix,
            });
            const evaluation = buildConjugationEvaluationRecord({
                result,
                maskState,
            });
            locativoCombinationEvaluationCache.set(cacheKey, evaluation);
            return evaluation;
        };
        const resolveActiveToggleAvailabilityState = ({
            possessorSelections,
            objectSlotModels,
        }) => {
            const memoKey = [
                "active",
                possessorSelections.join(","),
                objectSlotModels.map((slotModel) => (
                    `${slotModel.id}:${(slotModel.values || []).join(",")}`
                )).join(";"),
            ].join("|");
            if (locativoAvailabilityMemo.has(memoKey)) {
                return locativoAvailabilityMemo.get(memoKey);
            }
            const summary = createToggleAvailabilityRealizationSummary();
            iterateNounObjectSlotSelections(objectSlotModels, (selectedBySlot) => {
                const objectPrefix = selectedBySlot.object || "";
                const indirectObjectMarker = selectedBySlot.object2 || "";
                const thirdObjectMarker = selectedBySlot.object3 || "";
                possessorSelections.forEach((possessorPrefix) => {
                    const evaluation = evaluateLocativoCombinationState({
                        objectPrefix,
                        indirectObjectMarker,
                        thirdObjectMarker,
                        possessorPrefix,
                    });
                    recordToggleAvailabilityRealization(summary, evaluation);
                });
            });
            const resolvedRecord = realizeToggleAvailabilitySummary(summary);
            locativoAvailabilityMemo.set(memoKey, resolvedRecord);
            return resolvedRecord;
        };
        const resolveNonactiveToggleAvailabilityState = ({
            primarySelectionIds,
            objectSlotModels,
        }) => {
            const memoKey = [
                "nonactive",
                primarySelectionIds.join(","),
                objectSlotModels.map((slotModel) => (
                    `${slotModel.id}:${(slotModel.values || []).join(",")}`
                )).join(";"),
            ].join("|");
            if (locativoAvailabilityMemo.has(memoKey)) {
                return locativoAvailabilityMemo.get(memoKey);
            }
            const summary = createToggleAvailabilityRealizationSummary();
            primarySelectionIds.forEach((selectionId) => {
                const selection = resolveNonactivePrimarySelection(selectionId);
                iterateNounObjectSlotSelections(objectSlotModels, (selectedBySlot) => {
                    const indirectObjectMarker = selectedBySlot.object2 || "";
                    const thirdObjectMarker = selectedBySlot.object3 || "";
                    const evaluation = evaluateLocativoCombinationState({
                        objectPrefix: selection.objectPrefix || "",
                        indirectObjectMarker,
                        thirdObjectMarker,
                        possessorPrefix: selection.possessorPrefix || "",
                    });
                    recordToggleAvailabilityRealization(summary, evaluation);
                });
            });
            const resolvedRecord = realizeToggleAvailabilitySummary(summary);
            locativoAvailabilityMemo.set(memoKey, resolvedRecord);
            return resolvedRecord;
        };
        let primaryButtons = new Map();
        let possessorButtons = new Map();
        const clearLocativoToggleAvailabilityStyling = () => {
            possessorButtons.forEach((button) => clearToggleAvailabilityClasses(button));
            primaryButtons.forEach((button) => clearToggleAvailabilityClasses(button));
            slotButtonsById.forEach((slotButtons) => {
                slotButtons.forEach((button) => clearToggleAvailabilityClasses(button));
            });
        };
        const updateLocativoToggleOptionAvailabilityStyling = () => {
            clearLocativoToggleAvailabilityStyling();
            if (!verb) {
                return;
            }
            if (isNonactive) {
                const activePrimarySelections = getNonactivePrimarySelectionIds(activeNonactivePrimary);
                const activeObjectSlotModels = buildLocativoObjectSlotModelsForState({ includeObjectSlot: false });
                if (primaryButtons.size) {
                    primaryButtons.forEach((button, selectionId) => {
                        const primarySelectionIds = getNonactivePrimarySelectionIds(selectionId);
                        const availabilityRecord = resolveNonactiveToggleAvailabilityState({
                            primarySelectionIds,
                            objectSlotModels: activeObjectSlotModels,
                        });
                        const availabilityState = availabilityRecord.availabilityState;
                        applyToggleAvailabilityClass(button, availabilityState);
                        applySelectedAvailabilityClass(button, availabilityState, selectionId === activeNonactivePrimary);
                    });
                }
                mutableSlotStates
                    .filter((slotState) => slotState.id !== "object")
                    .forEach((slotState) => {
                        const slotButtons = slotButtonsById.get(slotState.id);
                        if (!slotButtons || !slotButtons.size) {
                            return;
                        }
                        slotButtons.forEach((button, optionId) => {
                            const objectSlotModels = buildLocativoObjectSlotModelsForState({
                                slotOverrides: { [slotState.id]: optionId },
                                includeObjectSlot: false,
                            });
                            const availabilityRecord = resolveNonactiveToggleAvailabilityState({
                                primarySelectionIds: activePrimarySelections,
                                objectSlotModels,
                            });
                            const availabilityState = availabilityRecord.availabilityState;
                            applyToggleAvailabilityClass(button, availabilityState);
                            applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
                        });
                    });
                return;
            }
            const activePossessorSelections = getActivePossessorSelections(activePossessor);
            const activeObjectSlotModels = buildLocativoObjectSlotModelsForState({ includeObjectSlot: true });
            if (possessorButtons.size) {
                possessorButtons.forEach((button, possessorId) => {
                    const possessorSelections = getActivePossessorSelections(possessorId);
                    const availabilityRecord = resolveActiveToggleAvailabilityState({
                        possessorSelections,
                        objectSlotModels: activeObjectSlotModels,
                    });
                    const availabilityState = availabilityRecord.availabilityState;
                    applyToggleAvailabilityClass(button, availabilityState);
                    applySelectedAvailabilityClass(button, availabilityState, possessorId === activePossessor);
                });
            }
            mutableSlotStates.forEach((slotState) => {
                const slotButtons = slotButtonsById.get(slotState.id);
                if (!slotButtons || !slotButtons.size) {
                    return;
                }
                slotButtons.forEach((button, optionId) => {
                    const objectSlotModels = buildLocativoObjectSlotModelsForState({
                        slotOverrides: { [slotState.id]: optionId },
                        includeObjectSlot: true,
                    });
                    const availabilityRecord = resolveActiveToggleAvailabilityState({
                        possessorSelections: activePossessorSelections,
                        objectSlotModels,
                    });
                    const availabilityState = availabilityRecord.availabilityState;
                    applyToggleAvailabilityClass(button, availabilityState);
                    applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
                });
            });
        };

        const renderRows = () => {
            locativoCombinationEvaluationCache.clear();
            locativoAvailabilityMemo = new Map();
            list.innerHTML = "";
            if (!verb) {
                const placeholder = document.createElement("div");
                placeholder.className = "tense-placeholder";
                placeholder.textContent = placeholderText;
                list.appendChild(placeholder);
                updateLocativoBlockPalette();
                updateLocativoToggleOptionAvailabilityStyling();
                return;
            }
            const objectSlotSelectionModels = buildNounObjectSlotSelectionModels(mutableSlotStates, {
                includeSlot: (slotState) => !isNonactive || slotState.id !== "object",
            });

            iterateNounObjectSlotSelections(objectSlotSelectionModels, (selectedBySlot) => {
                const indirectObjectMarker = selectedBySlot.object2 || "";
                const thirdObjectMarker = selectedBySlot.object3 || "";
                const rowSelections = isNonactive
                    ? (
                        activeNonactivePrimary === OBJECT_TOGGLE_ALL
                            ? nonactivePrimaryOptions
                                .filter((option) => option.id !== OBJECT_TOGGLE_ALL)
                                .map((option) => option.id)
                            : [activeNonactivePrimary]
                    ).map((selectionId) => resolveNonactivePrimarySelection(selectionId))
                    : (
                        (activePossessor === OBJECT_TOGGLE_ALL ? possessorToggleValues : [activePossessor])
                            .map((possessorPrefix) => ({
                                objectPrefix: selectedBySlot.object || "",
                                possessorPrefix,
                            }))
                    );
                rowSelections.forEach(({ objectPrefix = "", possessorPrefix = "" }) => {
                    const row = document.createElement("div");
                    row.className = "conjugation-row";
                    applyConjugationRowClasses(row, objectPrefix);

                    const label = document.createElement("div");
                    label.className = "conjugation-label";
                    const personLabel = document.createElement("div");
                    personLabel.className = "person-label";
                    personLabel.textContent = isNonactive
                        ? (possessorPrefix ? getPossessorPersonLabel(possessorPrefix, isNawat) : impersonalLabel)
                        : getPossessorPersonLabel(possessorPrefix, isNawat);
                    const personSub = document.createElement("div");
                    personSub.className = "person-sub";
                    const objectMarkers = [objectPrefix, indirectObjectMarker, thirdObjectMarker].filter(Boolean);
                    const isDummyImpersonalRow = isNonactive
                        && !possessorPrefix
                        && objectMarkers.length === 0;
                    const objectLabel = objectMarkers.length
                        ? objectMarkers.map((prefix) => getNounObjectComboLabel(prefix, isNawat)).join(" + ")
                        : getNounZeroObjectComboLabel(isNawat, { isImpersonalDummy: isDummyImpersonalRow });
                    label.appendChild(personLabel);
                    label.appendChild(personSub);

                    const value = document.createElement("div");
                    value.className = "conjugation-value";
                    const evaluation = evaluateLocativoCombinationState({
                        objectPrefix,
                        indirectObjectMarker,
                        thirdObjectMarker,
                        possessorPrefix,
                    });
                    const possessorLabel = evaluation.result.possessorPrefix
                        ? getPossessorLabel(evaluation.result.possessorPrefix, isNawat)
                        : "";
                    personSub.textContent = buildPersonSub({
                        subjectLabel: "",
                        possessorLabel,
                        objectLabel,
                    });
                    applyConjugationEvaluationPresentation({
                        row,
                        value,
                        evaluation,
                        formattedValue: formatConjugationDisplay(evaluation.result.result),
                    });

                    row.appendChild(label);
                    row.appendChild(value);
                    list.appendChild(row);
                });
            });
            updateLocativoBlockPalette();
            updateLocativoToggleOptionAvailabilityStyling();
        };
        if (isNonactive) {
            const showPrimaryToggle = nonactivePrimaryOptions.length > 1;
            if (showPrimaryToggle) {
                const { toggle: primaryToggle, buttons } = buildToggleControl({
                    options: nonactivePrimaryOptions.map((option) => ({
                        id: option.id,
                        label: option.label,
                    })),
                    activeId: activeNonactivePrimary,
                    ariaLabel: possessorToggleLabel,
                    onSelect: (id) => {
                        activeNonactivePrimary = id;
                        setToggleStateValue(ObjectToggleState, nonactivePrimaryKey, id, {
                            syncLock: true,
                        });
                        setToggleActiveState(primaryButtons, id);
                        renderRows();
                    },
                    getActiveId: () => activeNonactivePrimary,
                });
                primaryToggle.dataset.toggleType = "meta";
                primaryToggle.dataset.toggleSlot = "nonactive-primary";
                primaryButtons = buttons;
                titleControls.appendChild(primaryToggle);
            }
        } else {
            const showPossessorToggle = possessorToggleValues.length > 1;
            if (showPossessorToggle) {
                const possessorOptions = buildPossessorOptions(possessorToggleValues);
                const { toggle: possessorToggle, buttons } = buildToggleControl({
                    options: possessorOptions,
                    activeId: activePossessor,
                    ariaLabel: possessorToggleLabel,
                    onSelect: (id) => {
                        activePossessor = id;
                        setToggleStateValue(PossessorToggleState, possessorStateKey, id, {
                            syncLock: true,
                        });
                        setToggleActiveState(possessorButtons, id);
                        renderRows();
                    },
                    getActiveId: () => activePossessor,
                });
                possessorToggle.dataset.toggleType = "meta";
                possessorToggle.dataset.toggleSlot = "possessor";
                possessorButtons = buttons;
                titleControls.appendChild(possessorToggle);
            }
        }
        const objectSlotsForToggle = isNonactive
            ? mutableSlotStates.filter((slotState) => slotState.id !== "object")
            : mutableSlotStates;
        const showObjectToggle = objectSlotsForToggle.some((slotState) => slotState.showToggle);
        if (showObjectToggle) {
            objectSlotsForToggle.forEach((slotState, index) => {
                if (!slotState.showToggle) {
                    return;
                }
                const slotAriaLabel = slotState.id === "object"
                    ? objectToggleLabel
                    : `${getValence3PlusSlotRoleLabel(slotState.id, isNawat) || objectToggleLabel} (${index + 1})`;
                const { toggle: objectToggle, buttons } = buildToggleControl({
                    options: slotState.options,
                    activeId: slotState.activeId,
                    ariaLabel: slotAriaLabel,
                    onSelect: (id) => {
                        slotState.activeId = id;
                        setToggleStateValue(ObjectToggleState, slotState.stateKey, id, {
                            syncLock: true,
                        });
                        const slotButtons = slotButtonsById.get(slotState.id);
                        if (slotButtons) {
                            setToggleActiveState(slotButtons, id);
                        }
                        renderRows();
                    },
                    getActiveId: () => slotState.activeId,
                });
                objectToggle.dataset.toggleType = "object";
                objectToggle.dataset.toggleSlot = slotState.id;
                slotButtonsById.set(slotState.id, buttons);
                titleControls.appendChild(objectToggle);
            });
        }
        renderRows();

        tenseTitle.appendChild(titleControls);
        tenseBlock.appendChild(tenseTitle);
        tenseBlock.appendChild(list);
        return tenseBlock;
    };

    const modesToRender = modeFilter === COMBINED_MODE.active
        ? [COMBINED_MODE.active]
        : (modeFilter === COMBINED_MODE.nonactive
            ? [COMBINED_MODE.nonactive]
            : [COMBINED_MODE.active, COMBINED_MODE.nonactive]);
    modesToRender.forEach((mode) => {
        const block = buildBlock({ mode });
        if (sourceColumns) {
            sourceColumns.appendBlock(block, mode);
            return;
        }
        grid.appendChild(block);
    });
    if (sourceColumns) {
        sourceColumns.finalize();
    }
}

function buildNounTabRenderContext({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
    modeKey = "noun",
}) {
    const container = document.getElementById(containerId);
    if (!container) {
        return null;
    }
    const languageSwitch = document.getElementById("language");
    const isNawat = languageSwitch && languageSwitch.checked;
    const tenseMode = getActiveTenseMode();
    const combinedMode = getCombinedMode();
    const showDualVoiceColumns = isNominalTenseMode(tenseMode);
    const modeFilter = showDualVoiceColumns ? null : combinedMode;
    const allowedNounTenses = showDualVoiceColumns
        ? getTenseOrderForMode(tenseMode)
        : getNounTenseOrderForCombinedMode(combinedMode, tenseMode);
    const selectionState = getCurrentResolvedConjugationSelectionState({ tenseMode });
    const selectedTense = tenseValue || selectionState.tenseValue;
    const fallbackTense = allowedNounTenses[0] || "sustantivo-verbal";
    const resolvedTense = allowedNounTenses.includes(selectedTense)
        ? selectedTense
        : fallbackTense;
    if (resolvedTense === "locativo-temporal") {
        return {
            container,
            isNawat,
            resolvedTense,
            isLocativoTemporal: true,
            combinedMode,
            modeFilter,
        };
    }
    const isInstrumentivo = resolvedTense === "instrumentivo";
    const isCalificativoInstrumentivo = resolvedTense === "calificativo-instrumentivo";
    const isPotencial = isPotencialProfileTense(resolvedTense);
    const isPatientivoAdjective = isPatientivoAdjectiveTense(resolvedTense);
    const isSubjectlessTense = isSubjectlessNominalTense(resolvedTense);
    const isPossessionSplit = isNounPossessionSplitTense(resolvedTense);
    const isPotencialHabitual = isPotencialHabitualTense(resolvedTense);
    const nominalControlCombinedMode = getResolvedNominalCombinedModeForTense(
        resolvedTense,
        combinedMode,
    );
    const prefixes = Array.from(SUSTANTIVO_VERBAL_PREFIXES);
    const groupKey = prefixes.join("|");
    const possessorKey = `${modeKey}|${resolvedTense}|${groupKey}|possessor`;
    const ownershipKey = getPatientivoOwnershipKey(groupKey);
    const patientivoNominalSuffixKey = getPatientivoNominalSuffixKey(groupKey);
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue: resolvedTense, mode: modeKey });
    const subjectKey = `${modeKey}|${resolvedTense}|${groupKey}`;
    const verbMeta = getParsedVerbForTab(modeKey, verb);
    const isPotencialHabitualIntransitive = isPotencialHabitual
        && getBaseObjectSlots(verbMeta) <= 0;
    const usePotencialHabitualNonactiveSubjects = isPotencialHabitual
        && !isPotencialHabitualIntransitive;
    const subjectOptions = usePotencialHabitualNonactiveSubjects
        ? getPotencialHabitualNonactiveSubjectToggleOptions()
        : getSubjectToggleOptions();
    const subjectOptionMap = new Map(subjectOptions.map((entry) => [entry.id, entry]));
    const showNonanimateOnly = isNonanimateNounTense(resolvedTense)
        || isPotencialHabitualIntransitive;
    const nounObjectSlotBundle = buildNounObjectSlotToggleStates({
        verbMeta,
        tenseValue: resolvedTense,
        baseObjectStateKey: objectStateKey,
        isNawat,
        combinedMode: nominalControlCombinedMode,
    });
    const nounObjectSlotStates = nounObjectSlotBundle.slotStates;
    const primaryObjectSlot = nounObjectSlotStates.find((slot) => slot.id === "object") || null;
    const allowedPrefixes = primaryObjectSlot ? primaryObjectSlot.toggleValues : [""];
    let activeObjectPrefix = primaryObjectSlot ? primaryObjectSlot.activeId : "";
    const objectOptions = primaryObjectSlot
        ? primaryObjectSlot.options
        : getObjectToggleOptions(allowedPrefixes, { labelForPrefix: getNonspecificToggleLabel });
    const objectOptionMap = primaryObjectSlot
        ? primaryObjectSlot.optionMap
        : new Map(objectOptions.map((entry) => [entry.id, entry]));
    const possessorValues = POSSESSIVE_PREFIXES.map((entry) => entry.value);
    const visiblePossessorValues = isPotencial
        || isPatientivoAdjective
        ? [""]
        : (isPossessionSplit
        ? (
            showDualVoiceColumns
                ? possessorValues
                : (
                    combinedMode === COMBINED_MODE.nonactive
                ? [""]
                : possessorValues
                )
        )
        : possessorValues);
    let activePossessor = getToggleStateValue(PossessorToggleState, possessorKey);
    if (activePossessor === undefined || !visiblePossessorValues.includes(activePossessor)) {
        if (visiblePossessorValues.includes("")) {
            activePossessor = "";
        } else if (visiblePossessorValues.includes("i")) {
            activePossessor = "i";
        } else {
            activePossessor = visiblePossessorValues[0] ?? "";
        }
    }
    const ownershipOptions = PATIENTIVO_OWNERSHIP_OPTIONS.map((entry) => entry.id);
    let activeOwnership = getToggleStateValue(PatientivoOwnershipState, ownershipKey);
    if (activeOwnership !== null && !ownershipOptions.includes(activeOwnership)) {
        activeOwnership = null;
    }
    const patientivoNominalSuffixOptions = PATIENTIVO_NOMINAL_SUFFIX_OPTIONS.map((entry) => entry.id);
    let activePatientivoNominalSuffix = getPatientivoNominalSuffixToggleValue(
        getToggleStateValue(PatientivoNominalSuffixState, patientivoNominalSuffixKey, null)
    );
    if (!patientivoNominalSuffixOptions.includes(activePatientivoNominalSuffix)) {
        activePatientivoNominalSuffix = null;
    }
    if (resolvedTense !== "patientivo") {
        activeOwnership = null;
        activePatientivoNominalSuffix = null;
    }
    const isSubjectOptionAllowed = (entry) => (
        !showNonanimateOnly
        || entry.id === SUBJECT_TOGGLE_ALL
        || isNonanimateSubject(entry.subjectPrefix, entry.subjectSuffix)
    );
    const showSubjectToggle = !showNonanimateOnly && !isSubjectlessTense;
    const showObjectToggle = nounObjectSlotStates.some((slot) => slot.showToggle);
    const hasImplicitAbsolutePossessor = visiblePossessorValues.includes("");
    const explicitPossessorToggleValues = hasImplicitAbsolutePossessor
        ? visiblePossessorValues.filter((value) => value)
        : visiblePossessorValues;
    const showPossessorToggle = hasImplicitAbsolutePossessor
        ? explicitPossessorToggleValues.length > 0
        : explicitPossessorToggleValues.length > 1;
    const showPatientivoPossessionControls = resolvedTense === "patientivo" && Boolean(activePossessor);
    const defaultSubjectId = getDefaultNounSubjectId(subjectOptions);
    let activeSubject = getToggleStateValue(SubjectToggleState, subjectKey, defaultSubjectId)
        ?? defaultSubjectId;
    if (!subjectOptionMap.has(activeSubject) || !isSubjectOptionAllowed(subjectOptionMap.get(activeSubject))) {
        activeSubject = defaultSubjectId;
        setToggleStateValue(SubjectToggleState, subjectKey, activeSubject, { syncLock: false });
    }
    return {
        container,
        isNawat,
        combinedMode,
        modeFilter,
        resolvedTense,
        isPossessionSplit,
        isInstrumentivo,
        isCalificativoInstrumentivo,
        isLocativoTemporal: false,
        isSubjectlessTense,
        showNonanimateOnly,
        possessorKey,
        ownershipKey,
        patientivoNominalSuffixKey,
        objectStateKey,
        subjectKey,
        subjectOptions,
        subjectOptionMap,
        verbMeta,
        allowedPrefixes,
        objectOptions,
        objectOptionMap,
        nounObjectSlotStates,
        nounObjectSlotSummary: nounObjectSlotBundle,
        visiblePossessorValues,
        explicitPossessorToggleValues,
        hasImplicitAbsolutePossessor,
        activeOwnership,
        activePatientivoNominalSuffix,
        activeObjectPrefix,
        activePossessor,
        activeSubject,
        isSubjectOptionAllowed,
        showSubjectToggle,
        showObjectToggle,
        showPossessorToggle,
        showOwnershipToggle: showPatientivoPossessionControls,
        showPatientivoNominalSuffixToggle: resolvedTense === "patientivo",
    };
}

function renderNounConjugations({
    verb,
    containerId = "all-tense-conjugations",
    tenseValue = "",
    modeKey = "noun",
}) {
    const context = buildNounTabRenderContext({ verb, containerId, tenseValue, modeKey });
    if (!context) {
        return;
    }
    if (context.isLocativoTemporal) {
        renderLocativoTemporalConjugations({
            verb,
            containerId,
            modeFilter: context.modeFilter,
        });
        return;
    }
    const {
        container,
        isNawat,
        combinedMode,
        modeFilter,
        resolvedTense,
        isPossessionSplit,
        isInstrumentivo,
        isCalificativoInstrumentivo,
        isLocativoTemporal,
        isSubjectlessTense,
        showNonanimateOnly,
        possessorKey,
        ownershipKey,
        patientivoNominalSuffixKey,
        objectStateKey,
        subjectKey,
        subjectOptions,
        subjectOptionMap,
        verbMeta,
        allowedPrefixes,
        objectOptions,
        nounObjectSlotStates,
        nounObjectSlotSummary,
        visiblePossessorValues,
        explicitPossessorToggleValues,
        hasImplicitAbsolutePossessor,
        activeOwnership,
        activePatientivoNominalSuffix: initialPatientivoNominalSuffix,
        isSubjectOptionAllowed,
        showSubjectToggle,
        showObjectToggle,
        showPossessorToggle,
        showOwnershipToggle,
        showPatientivoNominalSuffixToggle,
    } = context;
    let { activeObjectPrefix, activePossessor, activeSubject } = context;
    let activePatientivoOwnership = activeOwnership;
    let activePatientivoNominalSuffix = initialPatientivoNominalSuffix;
    const mutableNounObjectSlots = nounObjectSlotStates.map((slot) => ({ ...slot }));
    const nounObjectSlotStateById = new Map(mutableNounObjectSlots.map((slot) => [slot.id, slot]));
    const nounObjectToggleButtonsById = new Map();
    const getActiveNounSlotValue = (slotId) => nounObjectSlotStateById.get(slotId)?.activeId || "";
    activeObjectPrefix = getActiveNounSlotValue("object");

    const { objSection, grid } = createObjectSectionGrid(container);
    const sourceColumns = modeFilter == null ? createSourceModeColumns(grid, isNawat) : null;
    const placeholderText = getPlaceholderLabel(
        "conjugations",
        isNawat,
        "Ingresa un verbo para ver las conjugaciones."
    );
    const allToggleLabel = getToggleLabel("all", isNawat, "todos");
    const subjectToggleLabel = getToggleLabel("subject", isNawat, "Sujeto");
    const possessorToggleLabel = getToggleLabel("possessor", isNawat, "Poseedor");
    const ownershipToggleLabel = getToggleLabel("ownership", isNawat, "Posesion");
    const objectToggleLabel = getToggleLabel("object", isNawat, "Objeto");

    const tenseLabel = getLocalizedLabel(TENSE_LABELS[resolvedTense], isNawat, resolvedTense);
    const resolvedNounBlockMode = (() => {
        if (isPossessionSplit) {
            return null;
        }
        return getResolvedNominalCombinedModeForTense(resolvedTense, COMBINED_MODE.active);
    })();
    const isPatientivoTense = resolvedTense === "patientivo";
    const hasNounControls = showSubjectToggle
        || showPossessorToggle
        || showOwnershipToggle
        || showPatientivoNominalSuffixToggle
        || showObjectToggle;
    const useSharedPatientivoControls = isPatientivoTense && hasNounControls;
    const defaultNominalSourceMode = getNominalSourceModeForTense(resolvedTense);
    const blockConfigs = isPatientivoTense
        ? [
            {
                id: "patientivo-pasivo",
                label: getVerbBlockLabel("patientivo-pasivo", isNawat, "patientivo · pasivo/impersonal"),
                patientivoSource: "nonactive",
                sourceMode: COMBINED_MODE.nonactive,
                sourceTenseLabel: getNominalSourceTenseLabel("patientivo", {
                    patientivoSource: "nonactive",
                    isNawat,
                }),
                mode: COMBINED_MODE.nonactive,
                showControls: false,
            },
            {
                id: "patientivo-perfectivo",
                label: getVerbBlockLabel("patientivo-perfectivo", isNawat, "patientivo · perfectivo"),
                patientivoSource: "perfectivo",
                sourceMode: COMBINED_MODE.active,
                sourceTenseLabel: getNominalSourceTenseLabel("patientivo", {
                    patientivoSource: "perfectivo",
                    isNawat,
                }),
                mode: COMBINED_MODE.active,
                showControls: false,
            },
            {
                id: "patientivo-imperfectivo",
                label: getVerbBlockLabel("patientivo-imperfectivo", isNawat, "patientivo · imperfectivo"),
                patientivoSource: "imperfectivo",
                sourceMode: COMBINED_MODE.active,
                sourceTenseLabel: getNominalSourceTenseLabel("patientivo", {
                    patientivoSource: "imperfectivo",
                    isNawat,
                }),
                mode: COMBINED_MODE.active,
                showControls: false,
            },
            {
                id: "patientivo-tronco",
                label: getVerbBlockLabel("patientivo-tronco", isNawat, "patientivo · raíz verbal"),
                patientivoSource: "tronco-verbal",
                sourceMode: COMBINED_MODE.active,
                sourceTenseLabel: getNominalSourceTenseLabel("patientivo", {
                    patientivoSource: "tronco-verbal",
                    isNawat,
                }),
                mode: COMBINED_MODE.active,
                showControls: false,
            },
        ]
        : [
            {
                id: resolvedTense,
                label: tenseLabel,
                patientivoSource: "nonactive",
                sourceMode: defaultNominalSourceMode,
                sourceTenseLabel: getNominalSourceTenseLabel(resolvedTense, { isNawat }),
                mode: resolvedNounBlockMode,
                showControls: true,
            },
        ];
    const visibleBlockConfigs = blockConfigs.filter((entry) =>
        modeFilter == null || !entry.mode || entry.mode === modeFilter
    );
    let toggleButtons = new Map();
    let possessorButtons = new Map();
    let ownershipButtons = new Map();
    let patientivoNominalSuffixButtons = new Map();
    let subjectButtons = new Map();
    const blocks = [];
    const resolveNounBlockPaletteSignature = () => {
        const hasMixedSlotSelection = mutableNounObjectSlots.some((slotState) =>
            slotState.activeId === OBJECT_TOGGLE_ALL
        );
        if (hasMixedSlotSelection || activePossessor === OBJECT_TOGGLE_ALL) {
            return "mixed";
        }
        const effectiveValency = Math.max(1, mutableNounObjectSlots.length + 1);
        return buildBlockComboPaletteSignature({
            mode: "noun",
            valency: effectiveValency,
            objectPrefix: getActiveNounSlotValue("object"),
            indirectObjectMarker: getActiveNounSlotValue("object2"),
            thirdObjectMarker: getActiveNounSlotValue("object3"),
            possessorPrefix: showPossessorToggle ? (activePossessor || "") : "",
            ownership: showOwnershipToggle ? (activePatientivoOwnership || "") : "",
        });
    };
    const updateNounBlockPalettes = () => {
        const signature = resolveNounBlockPaletteSignature();
        blocks.forEach((entry) => {
            applyTenseBlockComboPalette(entry.block, signature);
        });
    };
    const subjectlessSelection = (() => {
        const thirdSingularSelection = getSubjectPersonSelections().find(({ group, selection, number }) => (
            number === "singular"
            && group?.id === "third"
            && selection?.subjectPrefix === ""
            && selection?.subjectSuffix === ""
        ));
        if (thirdSingularSelection) {
            return Object.freeze({
                group: thirdSingularSelection.group || null,
                selection: Object.freeze({ ...thirdSingularSelection.selection }),
                number: thirdSingularSelection.number || "",
            });
        }
        return Object.freeze({
            group: null,
            selection: Object.freeze({
                subjectPrefix: "",
                subjectSuffix: "",
            }),
            number: "",
        });
    })();
    const TOGGLE_AVAILABILITY_CLASS_NAMES = [
        "object-toggle-button--viable",
        "object-toggle-button--masked",
        "object-toggle-button--impossible",
    ];
    const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = [
        "object-toggle-button--selected-viable",
        "object-toggle-button--selected-masked",
        "object-toggle-button--selected-impossible",
    ];
    const clearToggleAvailabilityClasses = (button) => {
        if (!button) {
            return;
        }
        TOGGLE_AVAILABILITY_CLASS_NAMES.forEach((className) => {
            button.classList.remove(className);
        });
        TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach((className) => {
            button.classList.remove(className);
        });
    };
    const applyToggleAvailabilityClass = (button, state) => {
        clearToggleAvailabilityClasses(button);
        if (!button || !state) {
            return;
        }
        if (state === "viable") {
            button.classList.add("object-toggle-button--viable");
            return;
        }
        if (state === "masked") {
            button.classList.add("object-toggle-button--masked");
            return;
        }
        if (state === "impossible") {
            button.classList.add("object-toggle-button--impossible");
        }
    };
    const applySelectedAvailabilityClass = (button, state, isSelected) => {
        if (!button || !isSelected) {
            return;
        }
        if (state === "viable") {
            button.classList.add("object-toggle-button--selected-viable");
            return;
        }
        if (state === "masked") {
            button.classList.add("object-toggle-button--selected-masked");
            return;
        }
        if (state === "impossible") {
            button.classList.add("object-toggle-button--selected-impossible");
        }
    };
    const getSubjectSelectionsForId = (subjectId = activeSubject) => {
        if (isSubjectlessTense) {
            return [subjectlessSelection];
        }
        let selections = getNominalSubjectSelectionEntries({
            mode: getActiveTenseMode(),
            tenseValue: resolvedTense,
        });
        if (subjectId !== SUBJECT_TOGGLE_ALL) {
            selections = selections.filter((entry) => entry.toggleId === subjectId);
        }
        if (showNonanimateOnly) {
            selections = selections.filter(({ selection }) => (
                isNonanimateSubject(selection.subjectPrefix, selection.subjectSuffix)
            ));
        }
        return selections;
    };
    const getPossessorSelectionsForId = (possessorId = activePossessor) => {
        const fallback = visiblePossessorValues[0] ?? "";
        if (possessorId === OBJECT_TOGGLE_ALL) {
            return visiblePossessorValues.length ? visiblePossessorValues : [fallback];
        }
        if (visiblePossessorValues.includes(possessorId)) {
            return [possessorId];
        }
        return [fallback];
    };
    const resolveInstrumentivoHeaderSourceMeta = () => {
        const possessorSelections = getPossessorSelectionsForId(activePossessor);
        const hasPossessed = possessorSelections.some((value) => Boolean(value));
        const hasUnpossessed = possessorSelections.some((value) => !value);
        const habitualLabel = getLocalizedLabel(
            TENSE_LABELS["presente-habitual"],
            isNawat,
            "presente habitual"
        );
        const imperfectoLabel = getLocalizedLabel(
            TENSE_LABELS.imperfecto,
            isNawat,
            "pretérito imperfecto"
        );
        if (hasPossessed && !hasUnpossessed) {
            return {
                sourceMode: COMBINED_MODE.active,
                sourceTenseLabel: imperfectoLabel,
            };
        }
        if (hasUnpossessed && !hasPossessed) {
            return {
                sourceMode: COMBINED_MODE.nonactive,
                sourceTenseLabel: habitualLabel,
            };
        }
        return {
            sourceMode: COMBINED_MODE.nonactive,
            sourceTenseLabel: `${habitualLabel} / ${imperfectoLabel}`,
        };
    };
    const resolveNounBlockSourceMeta = (entry = {}) => {
        const resolvedSourceMode = entry.sourceMode ?? defaultNominalSourceMode;
        const labelSlotSummary = getNounObjectSlotSummary(verbMeta, resolvedTense, {
            combinedMode: resolvedSourceMode,
        });
        const labelValency = Number.isFinite(labelSlotSummary?.availableObjectSlots)
            ? Math.max(1, Number(labelSlotSummary.availableObjectSlots) + 1)
            : null;
        if (resolvedTense === "instrumentivo") {
            return {
                ...resolveInstrumentivoHeaderSourceMeta(),
                labelValency,
            };
        }
        return {
            sourceMode: resolvedSourceMode,
            sourceTenseLabel: entry.sourceTenseLabel || "",
            labelValency,
        };
    };
    const resolveNounBlockTitleText = (entry = {}) => {
        const meta = resolveNounBlockSourceMeta(entry);
        return buildNominalSourceTaggedLabel(
            entry.label || "",
            meta.sourceMode,
            isNawat,
            {
                sourceTenseLabel: meta.sourceTenseLabel,
                labelValency: meta.labelValency,
            }
        );
    };
    const refreshNounBlockTitles = () => {
        blocks.forEach((entry) => {
            if (!entry.titleLabel) {
                return;
            }
            entry.titleLabel.textContent = resolveNounBlockTitleText(entry);
        });
    };
    const buildNounObjectSlotModelsForState = (slotOverrides = {}) => (
        mutableNounObjectSlots.map((slotState) => {
            const hasOverride = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id);
            const overrideId = hasOverride ? slotOverrides[slotState.id] : slotState.activeId;
            const values = overrideId === OBJECT_TOGGLE_ALL
                ? slotState.toggleValues
                : [overrideId];
            return {
                id: slotState.id,
                values: values.length ? values : [""],
            };
        })
    );
    const nounAvailabilityPatientivoSources = (() => {
        if (resolvedTense !== "patientivo") {
            return [null];
        }
        const sources = visibleBlockConfigs
            .map((entry) => entry.patientivoSource || "nonactive")
            .filter(Boolean);
        return Array.from(new Set(sources.length ? sources : ["nonactive"]));
    })();
    const nounCombinationEvaluationCache = new Map();
    let nounToggleAvailabilityMemo = new Map();
    const evaluateNounCombinationState = ({
        selection,
        number = "",
        possessorPrefix = "",
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        patientivoSource = null,
        patientivoOwnership = activePatientivoOwnership,
        patientivoNominalSuffix = activePatientivoNominalSuffix,
        useReduplicatedSingularSurface = false,
    }) => {
        const isAgentivo = resolvedTense === "agentivo";
        const isPatientivo = resolvedTense === "patientivo";
        const resolvedPatientivoSource = isPatientivo
            ? (patientivoSource || "nonactive")
            : null;
        const normalizedProbeSelection = resolveNominalAvailabilityProbeSelection({
            tenseValue: resolvedTense,
            patientivoSource: resolvedPatientivoSource,
            verbMeta,
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
        const cacheKey = [
            selection.subjectPrefix || "",
            selection.subjectSuffix || "",
            number || "",
            possessorPrefix || "",
            resolvedObjectPrefix || "",
            resolvedIndirectObjectMarker || "",
            resolvedThirdObjectMarker || "",
            resolvedPatientivoSource || "",
            ownershipSelections.join(","),
            resolvedPatientivoNominalSuffix === null ? "*" : resolvedPatientivoNominalSuffix,
            useReduplicatedSingularSurface ? "redup" : "plain",
        ].join("|");
        const cached = nounCombinationEvaluationCache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const isPossessed = possessorPrefix !== "";
        let subjectSuffixOverride = "";
        const isAdjectiveMode = getActiveTenseMode() === TENSE_MODE.adjetivo;
        if (isAdjectiveMode) {
            subjectSuffixOverride = selection?.subjectSuffix || "";
        }
        if ((isAgentivo || isPatientivo) && number === "plural") {
            subjectSuffixOverride = isPossessed ? "p" : "t";
        }
        const evaluateForOwnership = (resolvedPatientivoOwnership) => {
            let result = {};
            if (isInstrumentivo) {
                const instrumentivoMode = possessorPrefix === ""
                    ? INSTRUMENTIVO_MODE.absolutivo
                    : INSTRUMENTIVO_MODE.posesivo;
                result = getInstrumentivoResult({
                    rawVerb: verb,
                    verbMeta,
                    subjectPrefix: selection.subjectPrefix,
                    subjectSuffix: selection.subjectSuffix,
                    objectPrefix: resolvedObjectPrefix,
                    indirectObjectMarker: resolvedIndirectObjectMarker,
                    thirdObjectMarker: resolvedThirdObjectMarker,
                    mode: instrumentivoMode,
                    possessivePrefix: possessorPrefix,
                }) || {};
            } else if (isCalificativoInstrumentivo) {
                result = getCalificativoInstrumentivoResult({
                    rawVerb: verb,
                    verbMeta,
                    subjectPrefix: selection.subjectPrefix,
                    subjectSuffix: selection.subjectSuffix,
                    objectPrefix: resolvedObjectPrefix,
                    indirectObjectMarker: resolvedIndirectObjectMarker,
                    thirdObjectMarker: resolvedThirdObjectMarker,
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
                if (useReduplicatedSingularSurface && result?.result) {
                    const prefixChain = buildPrefixedChain({
                        subjectPrefix: selection.subjectPrefix,
                        possessivePrefix: possessorPrefix,
                        objectPrefix: composeProjectiveObjectPrefix({
                            objectPrefix: resolvedObjectPrefix,
                            markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                            subjectPrefix: selection.subjectPrefix,
                        }),
                        verb: "",
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
                derivationType: nounObjectSlotSummary.derivationType,
                comboObjectPrefix: undefined,
                requireDistinctPossessor: isAgentivo || isPatientivo,
                enforceInvalidCombo: !useReduplicatedSingularSurface,
            });
            const valence4Violation = mutableNounObjectSlots.length >= 3
                && !isValidValence4Combo({
                    objectPrefix: resolvedObjectPrefix,
                    indirectObjectMarker: resolvedIndirectObjectMarker,
                    thirdObjectMarker: resolvedThirdObjectMarker,
                });
            return {
                ...buildConjugationEvaluationRecord({
                    result,
                    maskState,
                    hasValenceStructureError: valence4Violation,
                }),
                normalizedSelection: normalizedProbeSelection,
            };
        };
        const evaluations = ownershipSelections.map((ownership) => evaluateForOwnership(ownership));
        const visibleEvaluations = evaluations.filter((entry) => entry.hasVisibleResult);
        const evaluation = visibleEvaluations.length
            ? {
                ...buildConjugationEvaluationRecord({
                    result: {
                        ...visibleEvaluations[0].result,
                        result: Array.from(new Set(
                            visibleEvaluations.flatMap((entry) => (
                                Array.isArray(entry.result?.surfaceForms) && entry.result.surfaceForms.length
                                    ? entry.result.surfaceForms
                                    : String(entry.result?.result || "")
                                        .split(/\s*\/\s*/g)
                                        .map((form) => form.trim())
                                        .filter(Boolean)
                            ))
                        )).join(" / "),
                    },
                }),
                normalizedSelection: visibleEvaluations[0].normalizedSelection || normalizedProbeSelection,
            }
            : (evaluations[0] || {
                ...buildConjugationEvaluationRecord({ result: {} }),
                normalizedSelection: normalizedProbeSelection,
            });
        nounCombinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
    };
    const resolveNounToggleAvailabilityState = ({
        subjectSelections,
        possessorSelections,
        objectSlotModels,
        patientivoOwnership = activePatientivoOwnership,
        patientivoNominalSuffix = activePatientivoNominalSuffix,
    }) => {
        const memoKey = [
            subjectSelections.map(({ selection, number }) => (
                `${selection.subjectPrefix || ""}:${selection.subjectSuffix || ""}:${number || ""}`
            )).join(","),
            possessorSelections.join(","),
            objectSlotModels.map((slotModel) => (
                `${slotModel.id}:${(slotModel.values || []).join(",")}`
            )).join(";"),
            patientivoOwnership || "",
            getPatientivoNominalSuffixCacheToken(patientivoNominalSuffix),
            nounAvailabilityPatientivoSources.join(","),
        ].join("|");
        if (nounToggleAvailabilityMemo.has(memoKey)) {
            return nounToggleAvailabilityMemo.get(memoKey);
        }
        const summary = createToggleAvailabilityRealizationSummary();
        nounAvailabilityPatientivoSources.forEach((source) => {
            iterateNounObjectSlotSelections(objectSlotModels, (selectedBySlot) => {
                const objectPrefix = selectedBySlot.object || "";
                const indirectObjectMarker = selectedBySlot.object2 || "";
                const thirdObjectMarker = selectedBySlot.object3 || "";
                subjectSelections.forEach(({ selection, number, useReduplicatedSingularSurface }) => {
                    possessorSelections.forEach((possessorPrefix) => {
                        const evaluation = evaluateNounCombinationState({
                            selection,
                            number,
                            possessorPrefix,
                            objectPrefix,
                            indirectObjectMarker,
                            thirdObjectMarker,
                            patientivoSource: source,
                            patientivoOwnership,
                            patientivoNominalSuffix,
                            useReduplicatedSingularSurface,
                        });
                        recordToggleAvailabilityRealization(summary, evaluation);
                    });
                });
            });
        });
        const resolvedRecord = realizeToggleAvailabilitySummary(summary);
        nounToggleAvailabilityMemo.set(memoKey, resolvedRecord);
        return resolvedRecord;
    };
    const clearNounToggleAvailabilityStyling = () => {
        subjectButtons.forEach((button) => clearToggleAvailabilityClasses(button));
        possessorButtons.forEach((button) => clearToggleAvailabilityClasses(button));
        ownershipButtons.forEach((button) => clearToggleAvailabilityClasses(button));
        patientivoNominalSuffixButtons.forEach((button) => {
            clearToggleAvailabilityClasses(button);
            button.disabled = false;
        });
        nounObjectToggleButtonsById.forEach((slotButtons) => {
            slotButtons.forEach((button) => clearToggleAvailabilityClasses(button));
        });
    };
    const updateNounToggleOptionAvailabilityStyling = () => {
        clearNounToggleAvailabilityStyling();
        if (!verb) {
            return;
        }
        const activeSubjectSelections = getSubjectSelectionsForId(activeSubject);
        const activePossessorSelections = getPossessorSelectionsForId(activePossessor);
        mutableNounObjectSlots.forEach((slotState) => {
            const slotButtons = nounObjectToggleButtonsById.get(slotState.id);
            if (!slotButtons || !slotButtons.size) {
                return;
            }
            slotButtons.forEach((button, optionId) => {
                const objectSlotModels = buildNounObjectSlotModelsForState({ [slotState.id]: optionId });
                const availabilityRecord = resolveNounToggleAvailabilityState({
                    subjectSelections: activeSubjectSelections,
                    possessorSelections: activePossessorSelections,
                    objectSlotModels,
                    patientivoOwnership: activePatientivoOwnership,
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
            });
        });
        if (subjectButtons.size) {
            const activeObjectSlotModels = buildNounObjectSlotModelsForState();
            subjectButtons.forEach((button, subjectId) => {
                const subjectSelections = getSubjectSelectionsForId(subjectId);
                const availabilityRecord = resolveNounToggleAvailabilityState({
                    subjectSelections,
                    possessorSelections: activePossessorSelections,
                    objectSlotModels: activeObjectSlotModels,
                    patientivoOwnership: activePatientivoOwnership,
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, subjectId === activeSubject);
            });
        }
        if (possessorButtons.size) {
            const activeObjectSlotModels = buildNounObjectSlotModelsForState();
            possessorButtons.forEach((button, possessorId) => {
                const possessorSelections = getPossessorSelectionsForId(possessorId);
                const availabilityRecord = resolveNounToggleAvailabilityState({
                    subjectSelections: activeSubjectSelections,
                    possessorSelections,
                    objectSlotModels: activeObjectSlotModels,
                    patientivoOwnership: activePatientivoOwnership,
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, possessorId === activePossessor);
            });
        }
        if (ownershipButtons.size) {
            const activeObjectSlotModels = buildNounObjectSlotModelsForState();
            ownershipButtons.forEach((button, ownershipId) => {
                const availabilityRecord = resolveNounToggleAvailabilityState({
                    subjectSelections: activeSubjectSelections,
                    possessorSelections: activePossessorSelections,
                    objectSlotModels: activeObjectSlotModels,
                    patientivoOwnership: ownershipId,
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, ownershipId === activePatientivoOwnership);
            });
        }
        if (patientivoNominalSuffixButtons.size) {
            const activeObjectSlotModels = buildNounObjectSlotModelsForState();
            patientivoNominalSuffixButtons.forEach((button, suffixId) => {
                const normalizedSuffix = normalizePatientivoNominalSuffixSelection(suffixId);
                const availabilityRecord = resolveNounToggleAvailabilityState({
                    subjectSelections: activeSubjectSelections,
                    possessorSelections: activePossessorSelections,
                    objectSlotModels: activeObjectSlotModels,
                    patientivoOwnership: activePatientivoOwnership,
                    patientivoNominalSuffix: normalizedSuffix,
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, suffixId === activePatientivoNominalSuffix);
                button.disabled = availabilityState === CONJUGATION_AVAILABILITY_STATE.impossible;
            });
        }
    };

    const buildNounTitleControls = () => {
        if (!hasNounControls) {
            return null;
        }
        const titleControls = document.createElement("div");
        titleControls.className = "tense-block__controls";
        titleControls.classList.add("tense-block__controls--stacked");
        toggleButtons = new Map();
        possessorButtons = new Map();
        ownershipButtons = new Map();
        patientivoNominalSuffixButtons = new Map();
        subjectButtons = new Map();
        nounObjectToggleButtonsById.clear();
        if (showSubjectToggle) {
            const { toggle: subjectToggle, buttons } = buildToggleControl({
                options: subjectOptions,
                activeId: activeSubject,
                ariaLabel: subjectToggleLabel,
                onSelect: (id) => {
                    setActiveSubject(id);
                },
                getTitle: (entry) => entry.title,
                getIsDisabled: (entry) => !isSubjectOptionAllowed(entry),
                getActiveId: () => activeSubject,
            });
            subjectToggle.dataset.toggleType = "subject";
            subjectToggle.dataset.toggleSlot = "subject";
            subjectButtons = buttons;
            titleControls.appendChild(subjectToggle);
        }
        if (showPossessorToggle) {
            const possessorOptions = [
                { id: OBJECT_TOGGLE_ALL, label: allToggleLabel, value: OBJECT_TOGGLE_ALL },
                ...explicitPossessorToggleValues.map((value) => ({
                    id: value,
                    label: value,
                    value,
                    title: getPossessorPersonLabel(value, isNawat),
                })),
            ];
            const { toggle: possessorToggle, buttons } = buildToggleControl({
                options: possessorOptions,
                activeId: activePossessor,
                ariaLabel: possessorToggleLabel,
                onSelect: (id) => {
                    setActivePossessor(id);
                },
                getTitle: (entry) => entry.title,
                getActiveId: () => activePossessor,
                allowDeselect: hasImplicitAbsolutePossessor,
            });
            possessorToggle.dataset.toggleType = "meta";
            possessorToggle.dataset.toggleSlot = "possessor";
            possessorButtons = buttons;
            titleControls.appendChild(possessorToggle);
        } else {
            activePossessor = hasImplicitAbsolutePossessor
                ? ""
                : (explicitPossessorToggleValues[0] ?? visiblePossessorValues[0] ?? "");
        }
        if (showOwnershipToggle) {
            const ownershipToggleOptions = PATIENTIVO_OWNERSHIP_OPTIONS.map((entry) => ({
                ...entry,
                label: entry.id === "zero" ? "Ø" : entry.id,
            }));
            setToggleStateValue(PatientivoOwnershipState, ownershipKey, activePatientivoOwnership, {
                syncLock: false,
            });
            const { toggle: ownershipToggle, buttons } = buildToggleControl({
                options: ownershipToggleOptions,
                activeId: activePatientivoOwnership,
                ariaLabel: ownershipToggleLabel,
                onSelect: (id) => {
                    setActivePatientivoOwnership(id);
                },
                getTitle: (entry) => getLocalizedLabel(
                    PATIENTIVO_OWNERSHIP_LABELS[entry.id],
                    isNawat,
                    entry.title || ""
                ),
                getActiveId: () => activePatientivoOwnership,
                stacked: false,
                toggleClassName: "object-toggle--ownership-corner",
                allowDeselect: true,
            });
            ownershipToggle.dataset.toggleType = "meta";
            ownershipToggle.dataset.toggleSlot = "ownership";
            ownershipButtons = buttons;
            titleControls.appendChild(ownershipToggle);
        }
        if (showPatientivoNominalSuffixToggle) {
            const patientivoNominalSuffixToggleOptions = PATIENTIVO_NOMINAL_SUFFIX_OPTIONS.map((entry) => ({
                ...entry,
            }));
            const { toggle: patientivoNominalSuffixToggle, buttons } = buildToggleControl({
                options: patientivoNominalSuffixToggleOptions,
                activeId: activePatientivoNominalSuffix,
                ariaLabel: getToggleLabel("suffix", isNawat, "Sufijo"),
                onSelect: (id) => {
                    setActivePatientivoNominalSuffix(id);
                },
                getTitle: (entry) => entry.title,
                getActiveId: () => activePatientivoNominalSuffix,
                stacked: false,
                toggleClassName: "object-toggle--patientivo-suffix-corner",
                allowDeselect: true,
            });
            patientivoNominalSuffixToggle.dataset.toggleType = "meta";
            patientivoNominalSuffixToggle.dataset.toggleSlot = "patientivo-suffix";
            patientivoNominalSuffixButtons = buttons;
            titleControls.appendChild(patientivoNominalSuffixToggle);
        }
        if (showObjectToggle) {
            mutableNounObjectSlots.forEach((slotState, index) => {
                if (!slotState.showToggle) {
                    return;
                }
                const slotAriaLabel = slotState.id === "object"
                    ? objectToggleLabel
                    : `${getValence3PlusSlotRoleLabel(slotState.id, isNawat) || objectToggleLabel} (${index + 1})`;
                const { toggle: objectToggle, buttons } = buildToggleControl({
                    options: slotState.options,
                    activeId: slotState.activeId,
                    ariaLabel: slotAriaLabel,
                    onSelect: (id) => {
                        setActiveObjectSlot(slotState.id, id);
                    },
                    getActiveId: () => slotState.activeId,
                });
                objectToggle.dataset.toggleType = "object";
                objectToggle.dataset.toggleSlot = slotState.id;
                if (slotState.id === "object") {
                    toggleButtons = buttons;
                }
                nounObjectToggleButtonsById.set(slotState.id, buttons);
                titleControls.appendChild(objectToggle);
            });
        }
        return titleControls;
    };

    if (useSharedPatientivoControls) {
        const controlsBlock = document.createElement("div");
        controlsBlock.className = "tense-block tense-block--noun-shared-controls";
        const controlsTitle = document.createElement("div");
        controlsTitle.className = "tense-block__title";
        const controlsLabel = document.createElement("span");
        controlsLabel.className = "tense-block__label";
        controlsLabel.textContent = getToggleLabel("controls", isNawat, "Controles");
        controlsTitle.appendChild(controlsLabel);
        const controls = buildNounTitleControls();
        if (controls) {
            controls.querySelectorAll(".object-toggle--ownership-corner, .object-toggle--patientivo-suffix-corner")
                .forEach((control) => {
                    controlsTitle.appendChild(control);
                });
        }
        controlsBlock.appendChild(controlsTitle);
        if (controls) {
            controlsBlock.appendChild(controls);
        }
        objSection.insertBefore(controlsBlock, grid);
    }

    const createTenseBlock = ({
        id,
        label,
        patientivoSource,
        sourceMode = defaultNominalSourceMode,
        sourceTenseLabel = "",
        showControls,
    }) => {
        const tenseBlock = document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${activeObjectPrefix || "intrans"}-${id}`;

        const tenseTitle = document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = document.createElement("span");
        titleLabel.className = "tense-block__label";
        titleLabel.textContent = resolveNounBlockTitleText({
            label,
            sourceMode,
            sourceTenseLabel,
        });
        tenseTitle.appendChild(titleLabel);

        const shouldRenderControls = !useSharedPatientivoControls
            && showControls
            && hasNounControls;
        if (shouldRenderControls) {
            const titleControls = buildNounTitleControls();
            if (titleControls) {
                tenseTitle.appendChild(titleControls);
            }
        }
        tenseBlock.appendChild(tenseTitle);

        const list = document.createElement("div");
        list.className = "conjugation-list";
        tenseBlock.appendChild(list);
        if (sourceColumns) {
            sourceColumns.appendBlock(tenseBlock, sourceMode);
        } else {
            grid.appendChild(tenseBlock);
        }
        blocks.push({
            block: tenseBlock,
            list,
            label,
            sourceMode,
            sourceTenseLabel,
            patientivoSource,
            blockKey: id,
            titleLabel,
        });
        updateNounBlockPalettes();
    };

    const updateSectionCategory = (prefix) => {
        applyObjectSectionCategory(objSection, prefix);
    };

    const renderRowsForList = (targetList, patientivoSource) => {
        targetList.innerHTML = "";
        if (!verb) {
            const placeholder = document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = placeholderText;
            targetList.appendChild(placeholder);
            return;
        }
        const selections = getSubjectSelectionsForId(activeSubject);
        const objectSlotSelectionModels = buildNounObjectSlotModelsForState();
        const possessorSelections = getPossessorSelectionsForId(activePossessor);
        iterateNounObjectSlotSelections(objectSlotSelectionModels, (selectedBySlot) => {
            const objectPrefix = selectedBySlot.object || "";
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            selections.forEach((subjectEntry) => {
                const {
                    group,
                    selection,
                    displaySelection = selection,
                    displayPersonSubLabel = "",
                    number,
                    useReduplicatedSingularSurface = false,
                } = subjectEntry;
                possessorSelections.forEach((possessorPrefix) => {
                    const evaluation = evaluateNounCombinationState({
                        selection,
                        number,
                        possessorPrefix,
                        objectPrefix,
                        indirectObjectMarker,
                        thirdObjectMarker,
                        patientivoSource,
                        patientivoOwnership: activePatientivoOwnership,
                        patientivoNominalSuffix: activePatientivoNominalSuffix,
                        useReduplicatedSingularSurface,
                    });
                    const normalizedSelection = evaluation.normalizedSelection || {};
                    const displayObjectPrefix = normalizedSelection.objectPrefix ?? objectPrefix;
                    const displayIndirectObjectMarker = normalizedSelection.indirectObjectMarker ?? indirectObjectMarker;
                    const displayThirdObjectMarker = normalizedSelection.thirdObjectMarker ?? thirdObjectMarker;
                    const row = document.createElement("div");
                    row.className = "conjugation-row";
                    applyConjugationRowClasses(row, displayObjectPrefix);
                    row.dataset.objectPrefix = displayObjectPrefix;
                    row.dataset.indirectObjectPrefix = displayIndirectObjectMarker;
                    row.dataset.thirdObjectPrefix = displayThirdObjectMarker;

                    const label = document.createElement("div");
                    label.className = "conjugation-label";
                    const personLabel = document.createElement("div");
                    personLabel.className = "person-label";
                    personLabel.textContent = displaySelection
                        ? getSubjectPersonLabel(group, displaySelection, isNawat)
                        : "";
                    const personSub = document.createElement("div");
                    personSub.className = "person-sub";
                    const basePersonSub = displayPersonSubLabel
                        ? getLocalizedLabel(displayPersonSubLabel, isNawat, "")
                        : (
                            displaySelection
                                ? getSubjectSubLabel(displaySelection, {
                                    isNawat,
                                    mode: "noun",
                                    tenseValue: resolvedTense,
                                })
                                : ""
                        );
                    const objectMarkers = [
                        displayObjectPrefix,
                        displayIndirectObjectMarker,
                        displayThirdObjectMarker,
                    ].filter(Boolean);
                    const suppressZeroObjectLabel = isPotencialProfileTense(resolvedTense);
                    const isDummyImpersonalRow = combinedMode === COMBINED_MODE.nonactive
                        && isSubjectlessTense
                        && !selection.subjectPrefix
                        && !selection.subjectSuffix
                        && !possessorPrefix
                        && objectMarkers.length === 0;
                    const objectLabel = objectMarkers.length
                        ? objectMarkers.map((prefix) => getNounObjectComboLabel(prefix, isNawat)).join(" + ")
                        : (suppressZeroObjectLabel
                            ? ""
                            : getNounZeroObjectComboLabel(isNawat, { isImpersonalDummy: isDummyImpersonalRow }));
                    let possessorLabel = getPossessorLabel(possessorPrefix, isNawat);
                    label.appendChild(personLabel);
                    label.appendChild(personSub);

                    const value = document.createElement("div");
                    value.className = "conjugation-value";
                    personSub.textContent = buildPersonSub({
                        subjectLabel: basePersonSub,
                        possessorLabel,
                        objectLabel,
                    });
                    applyConjugationEvaluationPresentation({
                        row,
                        value,
                        evaluation,
                        formattedValue: formatConjugationDisplay(evaluation.result.result),
                    });

                    row.appendChild(label);
                    row.appendChild(value);
                    targetList.appendChild(row);
                });
            });
        });
    };
    const renderRows = () => {
        nounCombinationEvaluationCache.clear();
        nounToggleAvailabilityMemo = new Map();
        blocks.forEach((entry) => {
            renderRowsForList(entry.list, entry.patientivoSource);
        });
        updateNounToggleOptionAvailabilityStyling();
    };

    const setActiveObjectSlot = (slotId, prefix) => {
        const slotState = nounObjectSlotStateById.get(slotId);
        if (!slotState || !slotState.optionMap.has(prefix)) {
            return;
        }
        slotState.activeId = prefix;
        setToggleStateValue(ObjectToggleState, slotState.stateKey, prefix, { syncLock: true });
        const slotButtons = nounObjectToggleButtonsById.get(slotId);
        if (slotButtons) {
            setToggleActiveState(slotButtons, prefix);
        }
        if (slotId === "object") {
            activeObjectPrefix = prefix;
            blocks.forEach((entry) => {
                if (entry.titleLabel) {
                    entry.titleLabel.textContent = resolveNounBlockTitleText(entry);
                }
                entry.block.dataset.tenseBlock = `${prefix}-${entry.blockKey}`;
            });
            updateSectionCategory(prefix === OBJECT_TOGGLE_ALL ? "" : prefix);
            if (toggleButtons.size) {
                setToggleActiveState(toggleButtons, prefix);
            }
        }
        updateNounBlockPalettes();
        renderRows();
    };
    const setActivePrefix = (prefix) => {
        setActiveObjectSlot("object", prefix);
    };

    const setActivePossessor = (prefix) => {
        const hadPossessor = Boolean(activePossessor);
        const resolvedPrefix = typeof prefix === "string" ? prefix : "";
        activePossessor = resolvedPrefix;
        setToggleStateValue(PossessorToggleState, possessorKey, resolvedPrefix, { syncLock: true });
        const hasPossessor = Boolean(resolvedPrefix);
        if (resolvedTense === "patientivo" && hadPossessor !== hasPossessor) {
            renderNounConjugations({
                verb,
                containerId,
                tenseValue: resolvedTense,
                modeKey,
            });
            return;
        }
        possessorButtons.forEach((button, key) => {
            const isActive = key === resolvedPrefix;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        refreshNounBlockTitles();
        updateNounBlockPalettes();
        renderRows();
    };
    const setActivePatientivoOwnership = (ownership) => {
        activePatientivoOwnership = ownership;
        setToggleStateValue(PatientivoOwnershipState, ownershipKey, ownership, {
            syncLock: true,
        });
        setToggleActiveState(ownershipButtons, ownership);
        updateNounBlockPalettes();
        renderRows();
    };
    const setActivePatientivoNominalSuffix = (suffix) => {
        activePatientivoNominalSuffix = getPatientivoNominalSuffixToggleValue(suffix);
        setToggleStateValue(PatientivoNominalSuffixState, patientivoNominalSuffixKey, activePatientivoNominalSuffix, {
            syncLock: true,
        });
        setToggleActiveState(patientivoNominalSuffixButtons, activePatientivoNominalSuffix);
        renderRows();
    };
    const setActiveSubject = (subjectId) => {
        activeSubject = subjectId;
        setToggleStateValue(SubjectToggleState, subjectKey, subjectId, { syncLock: true });
        subjectButtons.forEach((button, key) => {
            const isActive = key === subjectId;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
        renderRows();
    };

    visibleBlockConfigs.forEach((entry) => createTenseBlock(entry));
    if (sourceColumns) {
        sourceColumns.finalize();
    }
    setActivePrefix(activeObjectPrefix);
    setActiveSubject(activeSubject);
    if (showPossessorToggle) {
        setActivePossessor(activePossessor);
    } else {
        renderRows();
    }
}

function buildAdjectiveTabRenderContext({ verb, containerId = "all-tense-conjugations", tenseValue = "" }) {
    return buildNounTabRenderContext({ verb, containerId, tenseValue, modeKey: "adjetivo" });
}

function renderAdjectiveConjugations({ verb, containerId = "all-tense-conjugations", tenseValue = "" }) {
    renderNounConjugations({ verb, containerId, tenseValue, modeKey: "adjetivo" });
}

function buildAdverbTabRenderContext({ verb, containerId = "all-tense-conjugations", tenseValue = "" }) {
    return buildNounTabRenderContext({ verb, containerId, tenseValue, modeKey: "adverbio" });
}

function renderAdverbConjugations({ verb, containerId = "all-tense-conjugations", tenseValue = "" }) {
    renderNounConjugations({ verb, containerId, tenseValue, modeKey: "adverbio" });
}

function renderAllTenseConjugations({ verb, onlyTense = null }) {
    renderVerbConjugationsCore({
        verb,
        containerId: "all-tense-conjugations",
        tenseValue: onlyTense,
        modeKey: "standard",
        subjectKeyPrefix: "standard",
        subjectSubMode: "universal",
    });
}

function shouldExposeDeveloperHooks() {
    if (typeof window === "undefined") {
        return false;
    }
    try {
        const search = String(window.location?.search || "");
        const params = new URLSearchParams(search);
        if (params.get("dev-hooks") === "1" || params.get("devhooks") === "1") {
            return true;
        }
        if (params.get("dev") === "1") {
            return true;
        }
    } catch (_error) {
        // Ignore URL parsing failures in non-browser runtimes.
    }
    try {
        return window.localStorage?.getItem("nawat_dev_hooks") === "1";
    } catch (_error) {
        return false;
    }
}

var DEVELOPER_HOOK_NAMES = Object.freeze([
    "runRegexEnvelopeLanguageTests",
    "runComposerDisplayBridgeTests",
    "runComposerButtonCombinatorialAudit",
]);
var DEV_RUNTIME_CHECKS_ASSET_VERSION = "20260402-dev-checks-115";

function getDeveloperHookMap(windowObject = null) {
    const scope = windowObject || (typeof window !== "undefined" ? window : null);
    const hooks = {};
    if (!scope || typeof scope !== "object") {
        return hooks;
    }
    DEVELOPER_HOOK_NAMES.forEach((name) => {
        if (typeof scope[name] === "function") {
            hooks[name] = scope[name];
        }
    });
    return hooks;
}

var DEV_RUNTIME_CHECKS_LOADING_STATE = "idle";
function loadDeveloperRuntimeChecksIfEnabled() {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return Promise.resolve(false);
    }
    if (DEV_RUNTIME_CHECKS_LOADING_STATE !== "idle") {
        return Promise.resolve(DEV_RUNTIME_CHECKS_LOADING_STATE === "loaded");
    }
    const existing = document.querySelector("script[data-dev-runtime-checks=\"true\"]");
    if (existing) {
        DEV_RUNTIME_CHECKS_LOADING_STATE = "loaded";
        return Promise.resolve(true);
    }
    DEV_RUNTIME_CHECKS_LOADING_STATE = "loading";
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.defer = true;
        script.dataset.devRuntimeChecks = "true";
        script.src = new URL(
            `./scripts/browser_runtime_checks.js?v=${DEV_RUNTIME_CHECKS_ASSET_VERSION}`,
            window.location.href
        ).href;
        script.addEventListener("load", () => {
            DEV_RUNTIME_CHECKS_LOADING_STATE = "loaded";
            resolve(true);
        });
        script.addEventListener("error", () => {
            DEV_RUNTIME_CHECKS_LOADING_STATE = "failed";
            resolve(false);
        });
        document.head.appendChild(script);
    });
}

var DEV_HOOKS_MODULE_LOADING_STATE = "idle";
async function installDeveloperHooksIfEnabled() {
    if (typeof window === "undefined") {
        return false;
    }
    if (DEV_HOOKS_MODULE_LOADING_STATE !== "idle") {
        return DEV_HOOKS_MODULE_LOADING_STATE === "loaded";
    }
    if (!shouldExposeDeveloperHooks()) {
        return false;
    }
    DEV_HOOKS_MODULE_LOADING_STATE = "loading";
    try {
        await loadDeveloperRuntimeChecksIfEnabled();
        const hooksModule = await import("./scripts/dev_hooks.mjs");
        if (hooksModule && typeof hooksModule.installDeveloperHooks === "function") {
            hooksModule.installDeveloperHooks(getDeveloperHookMap(window), { windowObject: window });
            DEV_HOOKS_MODULE_LOADING_STATE = "loaded";
            return true;
        }
        DEV_HOOKS_MODULE_LOADING_STATE = "failed";
        return false;
    } catch (error) {
        DEV_HOOKS_MODULE_LOADING_STATE = "failed";
        console.warn("Developer hooks module not loaded.", error);
        return false;
    }
}
