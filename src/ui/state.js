// ui/state.js
// Toggle options, state management, mode accessors.
// Extracted from script.js Toggle Options & State + Mode State Accessors sections.
// Global-scope module.

"use strict";

function getSubjectPersonSelections() {
    const selections = [];
    SUBJECT_PERSON_NUMBER_ORDER.forEach((number) => {
        SUBJECT_PERSON_GROUPS.forEach((group) => {
            const selection = group[number];
            if (selection) {
                selections.push({ group, selection, number });
            }
        });
    });
    return selections;
}

function getSubjectCombinationId(subjectPrefix = "", subjectSuffix = "") {
    const match = SUBJECT_COMBINATIONS.find((entry) => (
        (entry?.subjectPrefix || "") === String(subjectPrefix || "")
        && (entry?.subjectSuffix || "") === String(subjectSuffix || "")
    ));
    return match?.id || "";
}

function buildReduplicatedSurfaceForm(value = "", options = {}) {
    const source = String(value || "").trim();
    if (!source) {
        return source;
    }
    const imperativePrefix = source.startsWith("ma ") ? "ma " : "";
    const bareSource = imperativePrefix ? source.slice(3).trim() : source;
    const requestedPrefixChain = String(options.prefixChain || "");
    let surfacePrefix = "";
    let stem = bareSource;
    if (requestedPrefixChain && bareSource.startsWith(requestedPrefixChain)) {
        surfacePrefix = requestedPrefixChain;
        stem = bareSource.slice(requestedPrefixChain.length);
    } else if (requestedPrefixChain && options.applyMissingPrefixChain === true) {
        surfacePrefix = requestedPrefixChain;
    }
    const syllables = splitVerbSyllables(stem);
    const first = syllables[0];
    if (!first || !first.nucleus) {
        return source;
    }
    const redupPrefix = `${first.onset || ""}${first.nucleus || ""}j`;
    if (!redupPrefix) {
        return source;
    }
    return `${imperativePrefix}${surfacePrefix}${redupPrefix}${stem}`;
}

function reduplicateConjugationDisplay(value = "", options = {}) {
    const forms = String(value || "")
        .split(/\s*\/\s*/g)
        .map((form) => form.trim())
        .filter(Boolean);
    if (!forms.length) {
        return String(value || "");
    }
    const deduped = Array.from(new Set(
        forms.map((form) => buildReduplicatedSurfaceForm(form, options)).filter(Boolean)
    ));
    return deduped.join(" / ");
}

function splitConjugationDisplayForms(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((form) => form.trim())
        .filter(Boolean);
}

function buildReduplicatedConjugationResult(result = {}, options = {}) {
    const source = result && typeof result === "object" ? result : {};
    const reduplicatedResult = reduplicateConjugationDisplay(source.result || "", options);
    return {
        ...source,
        result: reduplicatedResult,
        surfaceForms: splitConjugationDisplayForms(reduplicatedResult),
    };
}

function getNominalSubjectSelectionEntries({
    mode = getActiveTenseMode(),
    tenseValue = "",
} = {}) {
    const baseSelections = getSubjectPersonSelections().map(({ group, selection, number }) => ({
        group,
        selection,
        displaySelection: selection,
        number,
        toggleId: getSubjectCombinationId(selection?.subjectPrefix || "", selection?.subjectSuffix || ""),
        displayPersonSubLabel: "",
        useReduplicatedSingularSurface: false,
    }));
    if (mode !== TENSE_MODE.adjetivo) {
        return baseSelections;
    }
    const adjectiveSelections = [];
    baseSelections.forEach((entry) => {
        const singularGroupSelection = entry.group?.singular || entry.selection;
        const pushDistributiveEntry = (selectionOverride, displayPersonSubLabel) => {
            adjectiveSelections.push({
                ...entry,
                selection: selectionOverride,
                displayPersonSubLabel,
                useReduplicatedSingularSurface: true,
            });
        };
        const isFirstPlural = entry.selection?.subjectPrefix === "ti" && entry.selection?.subjectSuffix === "t";
        const isSecondPlural = entry.selection?.subjectPrefix === "an" && entry.selection?.subjectSuffix === "t";
        const isThirdPlural = entry.selection?.subjectPrefix === "" && entry.selection?.subjectSuffix === "t";
        if (isFirstPlural) {
            adjectiveSelections.push(entry);
            pushDistributiveEntry({ subjectPrefix: "ti", subjectSuffix: "" }, ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.first);
            return;
        }
        if (isSecondPlural) {
            adjectiveSelections.push(entry);
            pushDistributiveEntry({ subjectPrefix: "an", subjectSuffix: "" }, ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.second);
            return;
        }
        if (!isThirdPlural) {
            adjectiveSelections.push(entry);
            return;
        }
        adjectiveSelections.push(entry);
        pushDistributiveEntry(singularGroupSelection, ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.thirdHuman);
    });
    return adjectiveSelections;
}

function getPersonGroupLabel(group, isNawat) {
    if (!group) {
        return "";
    }
    const labelKey = group.labelKey || group.id || "";
    const labelEntry = labelKey ? PERSON_GROUP_LABELS[labelKey] : null;
    const fallback = getLocalizedLabel(group, isNawat, "");
    return getLocalizedLabel(labelEntry, isNawat, fallback);
}

function getPersonSubLabel(selection, isNawat) {
    if (!selection) {
        return "";
    }
    const labelKey = selection.personSubKey || selection.labelKey || selection.id || "";
    const labelEntry = labelKey ? PERSON_SUB_LABELS[labelKey] : null;
    const fallback = getLocalizedLabel(selection, isNawat, "");
    return getLocalizedLabel(labelEntry, isNawat, fallback);
}

function getSubjectPersonLabel(group, selection, isNawat) {
    const baseLabel = getPersonGroupLabel(group, isNawat);
    if (!selection) {
        return baseLabel;
    }
    const numberKey = selection.subjectSuffix === "t" ? "plural" : "singular";
    const numberLabels = NUMBER_LABELS[numberKey] || {};
    const numberLabel = isNawat ? (numberLabels.na || numberKey) : (numberLabels.es || numberKey);
    return `${baseLabel} ${numberLabel}`;
}

function getLocalizedLabel(entry, isNawat, fallback = "") {
    if (!entry) {
        return fallback;
    }
    if (typeof entry === "string") {
        return entry || fallback;
    }
    if (typeof entry === "object") {
        const value = isNawat
            ? (entry.labelNa ?? entry.labelEs)
            : (entry.labelEs ?? entry.labelNa);
        return value || fallback;
    }
    return fallback;
}

function getToggleLabel(key, isNawat, fallback = "") {
    return getLocalizedLabel(TOGGLE_LABELS[key], isNawat, fallback);
}

function getPlaceholderLabel(key, isNawat, fallback = "") {
    return getLocalizedLabel(PLACEHOLDER_LABELS[key], isNawat, fallback);
}

function getVerbBlockLabel(key, isNawat, fallback = "") {
    return getLocalizedLabel(VERB_BLOCK_LABELS[key], isNawat, fallback);
}

function getIsNawat() {
    return Boolean(document.getElementById("language")?.checked);
}

function getLocalizedDescription(entry, isNawat) {
    if (!entry) {
        return "";
    }
    if (typeof entry === "string") {
        return entry;
    }
    if (typeof entry === "object") {
        return isNawat
            ? (entry.labelNa || entry.labelEs || "")
            : (entry.labelEs || entry.labelNa || "");
    }
    return "";
}

function getPretUniversalClassDetail(tenseValue) {
    const classKey = PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
    if (!classKey) {
        return null;
    }
    return PRETERITO_CLASS_DETAIL_BY_KEY[classKey] || null;
}

function getObjectStateKey({ groupKey, tenseValue = "", mode = "standard", isNonactive = false }) {
    const modeKey = mode ? `${mode}|` : "";
    const nonactiveKey = isNonactive ? "nonactive|" : "";
    const tenseKey = tenseValue ? `${tenseValue}|` : "";
    return `${modeKey}${nonactiveKey}${tenseKey}${groupKey}`;
}

function getPatientivoOwnershipKey(groupKey) {
    return `noun|patientivo|${groupKey}|ownership`;
}

function getPatientivoNominalSuffixKey(groupKey) {
    return `noun|patientivo|${groupKey}|nominal-suffix`;
}

function clearToggleStateByPrefix(map, prefix) {
    if (!prefix) {
        return;
    }
    for (const key of map.keys()) {
        if (key.startsWith(prefix)) {
            map.delete(key);
        }
    }
}

function resetToggleStateForTense(tenseValue) {
    if (!tenseValue) {
        return;
    }
    if (isToggleLockEnabled()) {
        return;
    }
    clearToggleStateByPrefix(SubjectToggleState, `standard|${tenseValue}|`);
    clearToggleStateByPrefix(SubjectToggleState, `universal|${tenseValue}|`);
    clearToggleStateByPrefix(SubjectToggleState, `noun|${tenseValue}|`);
    clearToggleStateByPrefix(ObjectToggleState, `standard|${tenseValue}|`);
    clearToggleStateByPrefix(ObjectToggleState, `standard|nonactive|${tenseValue}|`);
    clearToggleStateByPrefix(ObjectToggleState, `universal|${tenseValue}|`);
    clearToggleStateByPrefix(ObjectToggleState, `universal|nonactive|${tenseValue}|`);
    clearToggleStateByPrefix(ObjectToggleState, `noun|${tenseValue}|`);
    clearToggleStateByPrefix(PossessorToggleState, `noun|${tenseValue}|`);
    clearToggleStateByPrefix(PatientivoOwnershipState, `noun|${tenseValue}|`);
    clearToggleStateByPrefix(PatientivoNominalSuffixState, `noun|${tenseValue}|`);
    const appliedFragments = [
        `|standard|${tenseValue}|`,
        `|standard|nonactive|${tenseValue}|`,
        `|universal|${tenseValue}|`,
        `|universal|nonactive|${tenseValue}|`,
        `|noun|${tenseValue}|`,
    ];
    for (const appliedKey of Array.from(DefaultToggleApplied)) {
        if (appliedFragments.some((fragment) => appliedKey.includes(fragment))) {
            DefaultToggleApplied.delete(appliedKey);
        }
    }
}

function getSubjectToggleOptions() {
    const isNawat = getIsNawat();
    const options = [
        {
            id: SUBJECT_TOGGLE_ALL,
            label: getToggleLabel("all", isNawat, "todos"),
            subjectPrefix: null,
            subjectSuffix: null,
        },
    ];
    SUBJECT_COMBINATIONS.forEach((combo) => {
        const label = combo.subjectPrefix ? combo.subjectPrefix : "Ø";
        options.push({
            id: combo.id,
            label,
            subjectPrefix: combo.subjectPrefix,
            subjectSuffix: combo.subjectSuffix,
        });
    });
    return options;
}

function getPotencialHabitualNonactiveSubjectToggleOptions() {
    const isNawat = getIsNawat();
    const options = [
        {
            id: SUBJECT_TOGGLE_ALL,
            label: getToggleLabel("all", isNawat, "todos"),
            subjectPrefix: null,
            subjectSuffix: null,
        },
    ];
    const entries = Object.entries(PASSIVE_IMPERSONAL_SUBJECT_MAP || {});
    const comboOrder = new Map(
        SUBJECT_COMBINATIONS.map((combo, index) => [
            `${combo.subjectPrefix || ""}|${combo.subjectSuffix || ""}`,
            index,
        ])
    );
    entries
        .sort((a, b) => {
            const aMeta = a[1] || {};
            const bMeta = b[1] || {};
            const aKey = `${aMeta.subjectPrefix || ""}|${aMeta.subjectSuffix || ""}`;
            const bKey = `${bMeta.subjectPrefix || ""}|${bMeta.subjectSuffix || ""}`;
            const aRank = comboOrder.has(aKey) ? comboOrder.get(aKey) : Number.MAX_SAFE_INTEGER;
            const bRank = comboOrder.has(bKey) ? comboOrder.get(bKey) : Number.MAX_SAFE_INTEGER;
            return aRank - bRank;
        })
        .forEach(([prefix, mapped]) => {
            const subjectPrefix = mapped?.subjectPrefix || "";
            const subjectSuffix = mapped?.subjectSuffix || "";
            const subjectId = getSubjectCombinationId(subjectPrefix, subjectSuffix);
            if (!subjectId) {
                return;
            }
            options.push({
                id: subjectId,
                label: getPassiveToggleLabel(prefix, isNawat),
                subjectPrefix,
                subjectSuffix,
                title: getNonactivePersonSub(prefix, isNawat),
            });
        });
    return options;
}

function getDefaultNounSubjectId(subjectOptions) {
    return getDefaultOutputToggleSelection({
        context: "noun-subject",
        values: Array.isArray(subjectOptions) ? subjectOptions.map((entry) => entry.id) : [],
        subjectOptions,
    });
}

function getObjectToggleOptions(prefixes, options = {}) {
    const isNawat = options.isNawat ?? getIsNawat();
    const includeAll = options.includeAll !== false;
    const labelForPrefix = options.labelForPrefix;
    const list = [];
    if (includeAll) {
        list.push({ id: OBJECT_TOGGLE_ALL, label: getToggleLabel("all", isNawat, "todos"), prefix: null });
    }
    prefixes.forEach((prefix) => {
        const label = labelForPrefix
            ? labelForPrefix(prefix, isNawat)
            : (prefix || getToggleLabel("intransitive", isNawat, "intrans"));
        list.push({
            id: prefix,
            label,
            prefix,
        });
    });
    return list;
}

var VERB_OBJECT_SLOT_SCHEMA = Object.freeze([
    Object.freeze({
        id: "object",
        stateSuffix: "",
        datasetKey: "objectPrefix",
        exportKey: "objectToggle",
        exportHeader: "objeto",
        alwaysExport: true,
    }),
    Object.freeze({
        id: "object2",
        stateSuffix: "indirect",
        datasetKey: "indirectObjectMarker",
        exportKey: "objectToggle2",
        exportHeader: "objeto 2",
        alwaysExport: true,
    }),
    Object.freeze({
        id: "object3",
        stateSuffix: "object3",
        datasetKey: "thirdObjectMarker",
        exportKey: "objectToggle3",
        exportHeader: "objeto 3",
        alwaysExport: false,
    }),
]);

var DERIVATION_CONTROLLER_SLOT_PRIORITY = Object.freeze({
    // Literal keys/values replace DERIVATION_TYPE.* and getCanonicalSlotIdForRole()
    // to avoid cross-file initialization order dependencies.
    // DERIVATION_TYPE: direct="direct", causative="causative", applicative="applicative"
    // getCanonicalSlotIdForRole: shuntline1="object2", mainline="object"
    direct: Object.freeze(["object2", "object"]),
    causative: Object.freeze(["object2", "object"]),
    applicative: Object.freeze(["object", "object2"]),
});

function getDerivationControllerSlotPriority(derivationType = "") {
    return DERIVATION_CONTROLLER_SLOT_PRIORITY[derivationType]
        || DERIVATION_CONTROLLER_SLOT_PRIORITY[DERIVATION_TYPE.direct];
}

function getVerbObjectSlotSchema({
    isNawat = false,
    derivationType = "",
    isNonactiveMode = false,
    activeValency = 0,
    modeObjectSlots = 0,
    allowIndirectObjectToggle = false,
    primaryTogglePrefixes = [],
    indirectTogglePrefixes = [],
    visibleSlotIds = null,
}) {
    const parsedModeSlots = Number.isFinite(modeObjectSlots)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, Number(modeObjectSlots)))
        : 0;
    const hasExplicitVisibleSlots = Array.isArray(visibleSlotIds) && visibleSlotIds.length > 0;
    const visibleSlotSet = hasExplicitVisibleSlots ? new Set(visibleSlotIds) : null;
    const slotCapacity = hasExplicitVisibleSlots
        ? Math.max(1, Math.min(MAX_OBJECT_SLOTS, visibleSlotIds.length))
        : Math.max(1, parsedModeSlots);
    const allowIndirectBySlots = slotCapacity >= 2;
    const allowThirdObjectToggle = hasExplicitVisibleSlots
        ? visibleSlotSet.has("object3")
        : slotCapacity >= 3;
    const useValence3PlusRoleLabels = Number(activeValency) >= 3;
    const baseObjectLabel = getToggleLabel("object", isNawat, "Objeto");
    const primaryRoleLabel = derivationType === DERIVATION_TYPE.applicative
        ? getObjectRoleLabel("benefactive", isNawat)
        : getObjectRoleLabel("direct", isNawat);
    return VERB_OBJECT_SLOT_SCHEMA
        .filter((slot) => (
            hasExplicitVisibleSlots
                ? visibleSlotSet.has(slot.id)
                : (
                    slot.id === "object"
                    || (slot.id === "object2" && allowIndirectObjectToggle)
                    || (slot.id === "object3" && allowThirdObjectToggle)
                )
        ))
        .map((slot) => {
            const isPrimary = slot.id === "object";
            const roleLabel = useValence3PlusRoleLabels
                ? getValence3PlusSlotRoleLabel(slot.id, isNawat)
                : (slot.id === "object2"
                    ? getObjectRoleLabel("indirect", isNawat)
                    : (slot.id === "object3" ? `${baseObjectLabel} 3` : primaryRoleLabel));
            const toggleValues = isPrimary
                ? Array.from(new Set(primaryTogglePrefixes))
                : Array.from(new Set(indirectTogglePrefixes));
            const labelForPrefix = isPrimary
                ? ((!isNonactiveMode && allowIndirectBySlots && Number(activeValency) >= 4)
                    ? getNonspecificToggleLabel
                    : undefined)
                : getNonspecificToggleLabel;
            const toggleAriaLabel = useValence3PlusRoleLabels
                ? getValence3PlusSlotRoleLabel(slot.id, isNawat)
                : (slot.id === "object"
                    ? baseObjectLabel
                    : `${baseObjectLabel} ${slot.id === "object2" ? "2" : "3"}`);
            return {
                ...slot,
                isPrimary,
                roleLabel,
                toggleValues,
                labelForPrefix,
                toggleAriaLabel,
            };
        });
}

function getPassiveToggleLabel(prefix, isNawat = false) {
    const subject = PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
    if (!subject) {
        return prefix || getToggleLabel("intransitive", isNawat, "intrans");
    }
    return subject.subjectPrefix || "Ø";
}

function getNonspecificToggleLabel(prefix) {
    return prefix || "Ø";
}

function getZeroObjectDisplayValue(value) {
    return value ? value : "Ø";
}

function isPotencialProfileTense(tenseValue = "") {
    return tenseValue === "potencial"
        || tenseValue === "potencial-habitual"
        || ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue)
        || tenseValue === "pasado-remoto-adverbio-activo";
}

function isPotencialHabitualTense(tenseValue = "") {
    return tenseValue === "potencial-habitual";
}

function allowsCollapsedDerivedNounSlot({
    tenseValue = "",
    combinedMode = "",
    slotPlanBundle = null,
    derivationType = "",
}) {
    if (!isPotencialHabitualTense(tenseValue) || combinedMode !== COMBINED_MODE.nonactive) {
        return false;
    }
    if (getDerivationValencyDelta(derivationType) <= 0) {
        return false;
    }
    const availableSlots = Number.isFinite(slotPlanBundle?.availableObjectSlots)
        ? Number(slotPlanBundle.availableObjectSlots)
        : (Array.isArray(slotPlanBundle?.slotPlans) ? slotPlanBundle.slotPlans.length : 0);
    return availableSlots <= 0;
}

function isPotencialActiveTense(tenseValue = "") {
    return ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue)
        || tenseValue === "pasado-remoto-adverbio-activo";
}

function isPatientivoAdjectiveTense(tenseValue = "") {
    return PATIENTIVO_ADJECTIVE_TENSE_SET.has(tenseValue);
}

function getPatientivoAdjectiveSourceForTense(tenseValue = "") {
    return PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE[tenseValue] || "";
}

function isIntransitiveOnlyActiveAdjectiveTense(tenseValue = "") {
    return INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
}

function isActiveAdjectiveTabTense(tenseValue = "") {
    return ACTIVE_ADJECTIVE_TAB_TENSE_SET.has(tenseValue);
}

function isNonactiveAdjectiveTabTense(tenseValue = "") {
    return NONACTIVE_ADJECTIVE_TAB_TENSE_SET.has(tenseValue);
}

function getNominalSourceModeForTense(tenseValue = "", {
    patientivoSource = "",
    blockMode = null,
} = {}) {
    if (tenseValue === "patientivo") {
        return patientivoSource === "nonactive"
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
    }
    if (isPatientivoAdjectiveTense(tenseValue)) {
        return getPatientivoAdjectiveSourceForTense(tenseValue) === "nonactive"
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
    }
    if (tenseValue === "locativo-temporal") {
        return blockMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
    }
    if (tenseValue === "instrumentivo") {
        return COMBINED_MODE.nonactive;
    }
    if (tenseValue === "sustantivo-verbal" || tenseValue === "potencial") {
        return COMBINED_MODE.active;
    }
    if (isPotencialHabitualTense(tenseValue)) {
        return COMBINED_MODE.nonactive;
    }
    return COMBINED_MODE.active;
}

function getResolvedNominalCombinedModeForTense(tenseValue = "", fallbackCombinedMode = getCombinedMode()) {
    if (isActiveAdjectiveTabTense(tenseValue)) {
        return COMBINED_MODE.active;
    }
    if (isNonactiveAdjectiveTabTense(tenseValue)) {
        return COMBINED_MODE.nonactive;
    }
    if (isPatientivoAdjectiveTense(tenseValue) || isPotencialProfileTense(tenseValue)) {
        return getNominalSourceModeForTense(tenseValue);
    }
    return fallbackCombinedMode === COMBINED_MODE.nonactive
        ? COMBINED_MODE.nonactive
        : COMBINED_MODE.active;
}

function getPatientivoSourceTenseLabel(patientivoSource = "", isNawat = false) {
    const sourceKey = patientivoSource === "perfectivo"
        ? "patientivo-perfectivo"
        : (patientivoSource === "imperfectivo"
            ? "patientivo-imperfectivo"
            : (patientivoSource === "tronco-verbal"
                ? "patientivo-tronco"
                : "patientivo-pasivo"));
    const sourceLabelFull = getVerbBlockLabel(sourceKey, isNawat, "");
    if (!sourceLabelFull) {
        return "";
    }
    const separatorIndex = sourceLabelFull.indexOf("·");
    if (separatorIndex === -1) {
        return sourceLabelFull.trim();
    }
    return sourceLabelFull.slice(separatorIndex + 1).trim();
}

function getNominalSourceTenseLabel(tenseValue = "", {
    patientivoSource = "",
    isNawat = false,
} = {}) {
    if (tenseValue === "patientivo") {
        return getPatientivoSourceTenseLabel(patientivoSource, isNawat);
    }
    if (isPatientivoAdjectiveTense(tenseValue)) {
        return getPatientivoSourceTenseLabel(
            getPatientivoAdjectiveSourceForTense(tenseValue),
            isNawat
        );
    }
    if (isPotencialTroncoNajActiveTense(tenseValue)) {
        const sourceLabelFull = getVerbBlockLabel(
            "patientivo-tronco-noun",
            isNawat,
            "patientivo · sustantivo de tronco verbal"
        );
        const separatorIndex = sourceLabelFull.indexOf("·");
        return separatorIndex === -1
            ? sourceLabelFull.trim()
            : sourceLabelFull.slice(separatorIndex + 1).trim();
    }
    if (isPotencialTroncoActiveTense(tenseValue)) {
        return getPatientivoSourceTenseLabel("tronco-verbal", isNawat);
    }
    let sourceTense = "";
    if (tenseValue === "agentivo" || tenseValue === "potencial-habitual") {
        sourceTense = "presente-habitual";
    } else if (tenseValue === "instrumentivo") {
        sourceTense = "presente-habitual";
    } else if (tenseValue === "locativo-temporal") {
        sourceTense = "imperfecto";
    } else if (tenseValue === "sustantivo-verbal" || tenseValue === "potencial") {
        sourceTense = "futuro";
    } else if (isPotencialActiveTense(tenseValue)) {
        sourceTense = getPotencialActiveSourceTense(tenseValue);
    } else {
        sourceTense = tenseValue;
    }
    return getLocalizedLabel(TENSE_LABELS[sourceTense], isNawat, sourceTense);
}

function getNominalDerivationModeForTense(tenseValue = "") {
    return isPotencialHabitualTense(tenseValue)
        ? DERIVATION_MODE.nonactive
        : DERIVATION_MODE.active;
}

function normalizeHeaderLabelText(value = "") {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function shouldAppendNominalSourceTense(baseLabel = "", sourceTenseLabel = "") {
    const normalizedSource = normalizeHeaderLabelText(sourceTenseLabel);
    if (!normalizedSource) {
        return false;
    }
    const normalizedBase = normalizeHeaderLabelText(baseLabel);
    if (!normalizedBase) {
        return true;
    }
    return !(normalizedBase === normalizedSource || normalizedBase.includes(normalizedSource));
}

function buildNominalSourceTaggedLabel(baseLabel = "", sourceMode = "", isNawat = false, {
    sourceTenseLabel = "",
    labelValency = null,
} = {}) {
    const normalizedSourceMode = String(sourceMode || "").trim();
    const sourceLabel = (() => {
        if (normalizedSourceMode === COMBINED_MODE.nonactive) {
            return getLocalizedLabel(
                UI_LABELS["tense-tabs-mode-nonactive"],
                isNawat,
                "no activo"
            );
        }
        if (!normalizedSourceMode || normalizedSourceMode === COMBINED_MODE.active) {
            return getLocalizedLabel(
                UI_LABELS["tense-tabs-mode-active"],
                isNawat,
                "activo"
            );
        }
        return normalizedSourceMode;
    })();
    const sourcePrefix = "origen";
    const stemLabel = baseLabel || "";
    const sourcePart = `${sourcePrefix}: ${sourceLabel}`;
    const shouldShowSourceTense = shouldAppendNominalSourceTense(stemLabel, sourceTenseLabel);
    const sourceTensePart = shouldShowSourceTense && sourceTenseLabel
        ? `, ${sourceTenseLabel}`
        : "";
    const valencyPart = Number.isFinite(labelValency)
        ? ` · valencia total: ${labelValency}`
        : "";
    return stemLabel
        ? `${stemLabel} · ${sourcePart}${sourceTensePart}${valencyPart}`
        : `${sourcePart}${sourceTensePart}${valencyPart}`;
}

function isPotencialTroncoActiveTense(tenseValue = "") {
    return TRONCO_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
}

function isPotencialTroncoNajActiveTense(tenseValue = "") {
    return TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
}

function isSubjectlessNominalTense(tenseValue = "") {
    return tenseValue === "pasado-remoto-adverbio-activo";
}

function getPotencialActiveSourceTense(tenseValue = "") {
    if (PERFECT_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue)) {
        return "perfecto";
    }
    if (tenseValue === "pasado-remoto-adverbio-activo") {
        return "pasado-remoto";
    }
    return "preterito";
}

function getActiveAdjectiveProfileType(tenseValue = "") {
    switch (tenseValue) {
        case ADJECTIVE_ACTIVE_TENSE_IDS.preterito:
            return "adjetivo-activo-preterito-simple";
        case ADJECTIVE_ACTIVE_TENSE_IDS.perfecto:
            return "adjetivo-activo-preterito-compuesto";
        case ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik:
            return "adjetivo-tronco-preterito-simple";
        case ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik:
            return "adjetivo-tronco-preterito-compuesto";
        case ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj:
            return "adjetivo-tronco-naj-preterito-simple";
        case ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj:
            return "adjetivo-tronco-naj-preterito-compuesto";
        default:
            return "";
    }
}

function getNawatRouteProfileMap() {
    return NAWAT_ROUTE_PROFILES && typeof NAWAT_ROUTE_PROFILES === "object"
        ? NAWAT_ROUTE_PROFILES
        : {};
}

const DISCONNECTED_NAWAT_ROUTE_IDS = new Set([
    "agentive-manner-adverb",
    "pasado-remoto-adverbio-activo",
]);

function isDisconnectedNawatRouteProfile(profile = null, routeKey = "") {
    const keys = [
        routeKey,
        profile?.id,
        profile?.canonicalId,
        profile?.legacyTenseValue,
    ]
        .map((value) => String(value || "").trim())
        .filter(Boolean);
    return keys.some((key) => DISCONNECTED_NAWAT_ROUTE_IDS.has(key));
}

function cloneNawatRouteProfile(profile = null, legacyTenseValue = "") {
    if (!profile || typeof profile !== "object") {
        return null;
    }
    const hasLegacyTenseValue = Object.prototype.hasOwnProperty.call(profile, "legacyTenseValue");
    return {
        ...profile,
        legacyTenseValue: hasLegacyTenseValue
            ? (profile.legacyTenseValue || "")
            : (legacyTenseValue || ""),
        stations: Array.isArray(profile.stations)
            ? profile.stations
                .filter((station) => station && typeof station === "object")
                .map((station) => ({ ...station }))
            : [],
    };
}

function getNawatRouteProfile(routeKey = "") {
    const key = String(routeKey || "").trim();
    if (!key || DISCONNECTED_NAWAT_ROUTE_IDS.has(key)) {
        return null;
    }
    const profiles = getNawatRouteProfileMap();
    if (profiles[key] && typeof profiles[key] === "object") {
        if (isDisconnectedNawatRouteProfile(profiles[key], key)) {
            return null;
        }
        return cloneNawatRouteProfile(profiles[key], key);
    }
    const matched = Object.entries(profiles).find(([, profile]) => (
        profile
        && typeof profile === "object"
        && (
            profile.id === key
            || profile.canonicalId === key
            || profile.legacyTenseValue === key
        )
    ));
    return matched && !isDisconnectedNawatRouteProfile(matched[1], matched[0])
        ? cloneNawatRouteProfile(matched[1], matched[0])
        : null;
}

function getLegacyTenseForNawatRoute(routeKey = "") {
    const profile = getNawatRouteProfile(routeKey);
    return profile?.legacyTenseValue || "";
}

function getNawatRouteStationList(routeKey = "") {
    const profile = getNawatRouteProfile(routeKey);
    return profile && Array.isArray(profile.stations)
        ? profile.stations.map((station) => ({ ...station }))
        : [];
}

function normalizeNawatRouteStationKey(stationKey = "") {
    const key = String(stationKey || "").trim();
    if (!key) {
        return "";
    }
    if (key === "input" || key === "source") {
        return "source-mode";
    }
    if (key === "patientivo" || key === "agentivo" || key === "source-tense") {
        return "source-tense";
    }
    if (key === "tronco" || key === "tronco-verbal") {
        return "stem";
    }
    if (key === "patientivo-source" || key === "patientivo-route") {
        return "patientivo-branch";
    }
    if (key === "profile" || key === "suffix") {
        return "surface-profile";
    }
    if (key === "nonactive" || key === "no-activo" || key === "derivation") {
        return "nonactive-switch";
    }
    if (key === "target" || key === "verbo" || key === "sustantivo") {
        return "target-mode";
    }
    if (key === "finite" || key === "surface" || key === "preterito" || key === "perfecto") {
        return "finite-tense";
    }
    return key;
}

function unwrapNawatRouteInputValue(value = "") {
    const text = String(value || "").trim();
    const wrapped = text.match(/^\((.*)\)$/);
    return wrapped ? wrapped[1].trim() : text;
}

function wrapNawatRouteInputValue(value = "") {
    const text = String(value || "").trim();
    if (!text || /^\(.+\)$/.test(text)) {
        return text;
    }
    return `(${text})`;
}

function formatNawatRouteTargetInputValue(profile = null, {
    routeStem = "",
    targetVerb = "",
} = {}) {
    const stem = String(routeStem || "").trim();
    const verbalizer = String(profile?.verbalizer || "").replace(/^-+/, "").trim();
    if (profile?.valency === "transitive" && stem && verbalizer) {
        return `(${stem})-(${verbalizer})`;
    }
    return wrapNawatRouteInputValue(targetVerb);
}

function getNawatRouteProfiles() {
    return Object.entries(getNawatRouteProfileMap())
        .map(([legacyTenseValue, profile]) => cloneNawatRouteProfile(profile, legacyTenseValue))
        .filter((profile) => (
            profile
            && profile.status !== "reserved"
            && !isDisconnectedNawatRouteProfile(profile, profile.legacyTenseValue || "")
        ));
}

function getNawatRouteStateStore() {
    if (
        typeof NawatRouteState === "undefined"
        || !NawatRouteState
        || typeof NawatRouteState !== "object"
    ) {
        return { activeRoute: "" };
    }
    return NawatRouteState;
}

function getNawatRoutePlacement(profile = null) {
    const explicit = String(profile?.routePlacement || "").trim();
    if (explicit) {
        return explicit;
    }
    if (profile?.verbalizer) {
        return "patientivo-tronco-conversion";
    }
    const targetMode = profile?.targetMode || profile?.nawatMode || "";
    if (targetMode === "sustantivo" || targetMode === TENSE_MODE.sustantivo) {
        return "verb-noun";
    }
    return "direct-finite";
}

function isAgentiveMannerRoute(profile = null) {
    return false;
}

function isPatientivoTroncoConversionRoute(profile = null) {
    return getNawatRoutePlacement(profile) === "patientivo-tronco-conversion";
}

function isPatientivoSurfaceRoute(profile = null) {
    return getNawatRoutePlacement(profile) === "patientivo-surface";
}

function isNonactiveHabitualRoute(profile = null) {
    return getNawatRoutePlacement(profile) === "nonactive-habitual";
}

function isDirectFiniteRoute(profile = null) {
    return getNawatRoutePlacement(profile) === "direct-finite";
}

function isNawatDynamicPatientivoSurfaceRoute(profile = null) {
    return isPatientivoSurfaceRoute(profile)
        && !String(profile?.legacyTenseValue || "").trim()
        && String(profile?.sourceCategory || "").trim() === "verb-patientivo-surface";
}

const NAWAT_PATIENTIVO_IMPERFECTIVE_SOURCE_TENSES = new Set([
    "presente",
    "presente-habitual",
    "presente-desiderativo",
    "imperfecto",
    "pasado-remoto",
    "futuro",
    "condicional",
    "imperativo",
]);

const NAWAT_PATIENTIVO_PERFECTIVE_SOURCE_TENSES = new Set([
    "preterito",
    "preterito-clase",
    "perfecto",
    "pluscuamperfecto",
    "condicional-perfecto",
]);

const NAWAT_ROUTE_PATIENTIVO_ACTIVE_SUFFIX_BY_TENSE = Object.freeze({
    presente: "t",
    "presente-habitual": "t",
    "presente-desiderativo": "ti",
    imperfecto: "t",
    preterito: "ti",
    "preterito-clase": "ti",
    "pasado-remoto": "t",
    perfecto: "ti",
    pluscuamperfecto: "ti",
    "condicional-perfecto": "ti",
    futuro: "ti",
    condicional: "ti",
    imperativo: "t",
});

const NAWAT_ROUTE_PATIENTIVO_NONACTIVE_SUFFIX_BY_TENSE = Object.freeze({
    presente: "t",
    "presente-habitual": "t",
    "presente-desiderativo": "ti",
    imperfecto: "t",
    preterito: "t",
    "preterito-clase": "t",
    "pasado-remoto": "t",
    perfecto: "t",
    pluscuamperfecto: "t",
    "condicional-perfecto": "t",
    futuro: "ti",
    condicional: "ti",
    imperativo: "t",
});

const NAWAT_ROUTE_NONACTIVE_CORE_PATIENTIVO_TENSES = new Set([
    "presente",
    "preterito",
    "preterito-clase",
    "perfecto",
    "pluscuamperfecto",
    "condicional-perfecto",
    "imperativo",
]);

function getCanonicalNawatPatientivoSourceTenseValue(patientivoSource = "") {
    const source = String(patientivoSource || "").trim();
    if (source === "imperfectivo") {
        return "imperfecto";
    }
    if (source === "perfectivo" || source === "nonactive") {
        return "preterito";
    }
    return "presente";
}

function resolveNawatPatientivoRouteSourceClass({
    sourceTenseValue = "",
    sourceCombinedMode = "",
} = {}) {
    const combinedMode = String(sourceCombinedMode || "").trim();
    if (combinedMode === COMBINED_MODE.nonactive) {
        return "nonactive";
    }
    const tenseValue = String(sourceTenseValue || "").trim();
    if (NAWAT_PATIENTIVO_PERFECTIVE_SOURCE_TENSES.has(tenseValue)) {
        return "perfectivo";
    }
    if (NAWAT_PATIENTIVO_IMPERFECTIVE_SOURCE_TENSES.has(tenseValue)) {
        return "imperfectivo";
    }
    return "imperfectivo";
}

function resolveNawatPatientivoRouteSpec({
    sourceTenseValue = "",
    sourceCombinedMode = "",
    patientivoSource = "",
} = {}) {
    const requestedPatientivoSource = String(patientivoSource || "").trim();
    const resolvedSourceCombinedMode = String(
        sourceCombinedMode
        || (requestedPatientivoSource === "nonactive" ? COMBINED_MODE.nonactive : "")
        || COMBINED_MODE.active
    ).trim();
    const resolvedSourceTenseValue = String(
        sourceTenseValue
        || getCanonicalNawatPatientivoSourceTenseValue(requestedPatientivoSource)
    ).trim();
    const resolvedPatientivoSource = resolveNawatPatientivoRouteSourceClass({
        sourceTenseValue: resolvedSourceTenseValue,
        sourceCombinedMode: resolvedSourceCombinedMode,
    });
    const suffixByTense = isNawatRouteNonactiveSource({
        sourceCombinedMode: resolvedSourceCombinedMode,
        patientivoSource: resolvedPatientivoSource,
    })
        ? NAWAT_ROUTE_PATIENTIVO_NONACTIVE_SUFFIX_BY_TENSE
        : NAWAT_ROUTE_PATIENTIVO_ACTIVE_SUFFIX_BY_TENSE;
    const suffix = suffixByTense[resolvedSourceTenseValue]
        || (resolvedPatientivoSource === "perfectivo" ? "ti" : "t");
    const routeKey = resolvedPatientivoSource === "nonactive"
        ? "patientivo-nonactive-t"
        : (resolvedPatientivoSource === "perfectivo"
            ? "patientivo-perfective-ti-noun"
            : "patientivo-imperfective-t");
    return {
        sourceTenseValue: resolvedSourceTenseValue,
        sourceCombinedMode: resolvedSourceCombinedMode,
        patientivoSource: resolvedPatientivoSource,
        routeKey,
        suffix,
        surfaceSuffix: suffix ? `-${suffix}` : "",
    };
}

function resolveNawatVerbNounConversionRouteKeyForSource({
    sourceTenseValue = "",
    sourceCombinedMode = "",
} = {}) {
    return resolveNawatPatientivoRouteSpec({
        sourceTenseValue,
        sourceCombinedMode,
    }).routeKey;
}

function isNawatRouteNonactiveSource({
    sourceCombinedMode = "",
    patientivoSource = "",
} = {}) {
    return String(sourceCombinedMode || "").trim() === COMBINED_MODE.nonactive
        || String(patientivoSource || "").trim() === "nonactive";
}

function getNawatRoutePatientivoSurfaceSpec(profile = null, {
    sourceTenseValue = "",
    sourceCombinedMode = "",
} = {}) {
    if (!isPatientivoSurfaceRoute(profile)) {
        return null;
    }
    if (!isNawatDynamicPatientivoSurfaceRoute(profile)) {
        const staticSuffix = String(
            profile?.patientivoNominalSuffix
            || profile?.surfaceSuffix
            || ""
        ).replace(/^-+/, "");
        return {
            sourceTenseValue: sourceTenseValue || profile?.sourceTenseValue || "",
            sourceCombinedMode: sourceCombinedMode || profile?.sourceCombinedMode || profile?.combinedMode || "",
            patientivoSource: String(profile?.patientivoSource || "nonactive").trim(),
            suffix: staticSuffix,
            surfaceSuffix: staticSuffix ? `-${staticSuffix}` : "",
        };
    }
    const patientivoSource = String(profile?.patientivoSource || "nonactive").trim();
    const resolvedSourceCombinedMode = sourceCombinedMode
        || profile?.sourceCombinedMode
        || (patientivoSource === "nonactive" ? COMBINED_MODE.nonactive : COMBINED_MODE.active);
    const resolvedSourceTenseValue = sourceTenseValue
        || profile?.sourceTenseValue
        || getCanonicalNawatPatientivoSourceTenseValue(patientivoSource);
    const routeSpec = resolveNawatPatientivoRouteSpec({
        sourceTenseValue: resolvedSourceTenseValue,
        sourceCombinedMode: resolvedSourceCombinedMode,
        patientivoSource,
    });
    const suffix = routeSpec.suffix
        || String(profile?.patientivoNominalSuffix || profile?.surfaceSuffix || "").replace(/^-+/, "")
        || "t";
    return {
        ...routeSpec,
        suffix,
        surfaceSuffix: suffix ? `-${suffix}` : "",
    };
}

function resolveNawatRoutePatientivoNominalSuffix(profile = null, options = {}) {
    const surfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, options);
    if (surfaceSpec?.suffix) {
        return surfaceSpec.suffix;
    }
    const rawSuffix = String(
        profile?.patientivoNominalSuffix
        || profile?.surfaceSuffix
        || ""
    ).replace(/^-+/, "");
    if (typeof normalizePatientivoNominalSuffixSelection !== "function") {
        return rawSuffix;
    }
    const normalized = normalizePatientivoNominalSuffixSelection(rawSuffix);
    return normalized === null ? "" : normalized;
}

function getNawatRouteTargetMode(profile = null) {
    const modeKey = profile?.targetMode || profile?.nawatMode || "";
    return TENSE_MODE[modeKey] || modeKey || TENSE_MODE.verbo;
}

function getNawatRouteTargetTenseValue(profile = null) {
    const explicit = profile?.targetTenseValue || profile?.nawatTenseValue || "";
    if (explicit) {
        return explicit;
    }
    const finiteTense = String(profile?.finiteTense || "").trim();
    if (finiteTense === "preterito" || finiteTense === "perfecto") {
        return finiteTense;
    }
    return "";
}

function getNawatRouteOriginMode(profile = null) {
    const modeKey = profile?.sourceMode || profile?.sourceNawatMode || "";
    return TENSE_MODE[modeKey] || modeKey || TENSE_MODE.verbo;
}

function getNawatRouteOriginTenseValue(profile = null) {
    if (profile?.sourceTenseValue) {
        return profile.sourceTenseValue;
    }
    if (isPatientivoSurfaceRoute(profile)) {
        return getCanonicalNawatPatientivoSourceTenseValue(profile?.patientivoSource || "nonactive");
    }
    return "presente";
}

function getNawatRouteDefaultSourceTenseValue(profile = null) {
    return isPatientivoSurfaceRoute(profile)
        ? "presente"
        : getNawatRouteOriginTenseValue(profile);
}

function getNawatConventionModeLabel(modeKey = "", isNawat = false) {
    const normalizedMode = String(modeKey || "").trim();
    if (normalizedMode === "verbo") {
        return isNawat ? "muchiwalis" : "Verbo";
    }
    if (normalizedMode === "sustantivo") {
        return isNawat ? "tukayit" : "Sustantivo";
    }
    if (normalizedMode === "particula") {
        return isNawat ? "partícula" : "Partícula";
    }
    return normalizedMode;
}

function getNawatRouteConversionModes(profile = null) {
    if (
        isPatientivoSurfaceRoute(profile)
        || getNawatRouteTargetMode(profile) === TENSE_MODE.sustantivo
    ) {
        return {
            sourceMode: TENSE_MODE.verbo,
            targetMode: TENSE_MODE.sustantivo,
        };
    }
    if (
        isDirectFiniteRoute(profile)
        || isNonactiveHabitualRoute(profile)
    ) {
        return {
            sourceMode: TENSE_MODE.verbo,
            targetMode: TENSE_MODE.verbo,
        };
    }
    return {
        sourceMode: TENSE_MODE.sustantivo,
        targetMode: TENSE_MODE.verbo,
    };
}

function formatNawatRouteConversionLabel(profile = null, isNawat = false, {
    reverse = false,
} = {}) {
    const conversion = getNawatRouteConversionModes(profile);
    const sourceMode = reverse ? conversion.targetMode : conversion.sourceMode;
    const targetMode = reverse ? conversion.sourceMode : conversion.targetMode;
    const sourceLabel = getNawatConventionModeLabel(sourceMode, isNawat);
    const targetLabel = getNawatConventionModeLabel(targetMode, isNawat);
    return [sourceLabel, targetLabel].filter(Boolean).join(" -> ");
}

function stripNawatRouteVerbalizerFromTarget(profile = null, targetVerb = "") {
    const bareTarget = unwrapNawatRouteInputValue(targetVerb);
    const verbalizer = String(profile?.verbalizer || "").replace(/^-+/, "");
    if (bareTarget && verbalizer && bareTarget.endsWith(verbalizer)) {
        return bareTarget.slice(0, -verbalizer.length);
    }
    return bareTarget;
}

function getNawatRouteStationText(station = null, isNawat = false) {
    if (!station || typeof station !== "object") {
        return "";
    }
    if (station.labelKind === "mode") {
        return getNawatConventionModeLabel(station.modeKey || station.mode || "", isNawat);
    }
    if (station.labelKind === "tense") {
        const tenseValue = station.labelTenseValue || station.tenseValue || "";
        return tenseValue
            ? getLocalizedLabel(TENSE_LABELS[tenseValue], isNawat, tenseValue)
            : "";
    }
    return isNawat && station.nawatText
        ? station.nawatText
        : (station.text || "");
}

function getNawatRouteStationSurfaceText(station = null) {
    if (!station || typeof station !== "object") {
        return "";
    }
    return String(station.surface || station.renderVerb || station.inputValue || "").trim();
}

function formatNawatRouteStationChipText(station = null, isNawat = false, {
    includeSurface = false,
} = {}) {
    const label = getNawatRouteStationText(station, isNawat);
    if (!includeSurface) {
        return label;
    }
    const surface = getNawatRouteStationSurfaceText(station);
    if (!label || !surface || label === surface) {
        return label || surface;
    }
    if (station.role === "stem" || station.role === "verbalizer") {
        return `${label}: ${surface}`;
    }
    return label;
}

function getNawatRouteSourceSurfaceForm(profile = null, {
    sourceVerb = "",
    sourceObjectPrefix = "",
    routeTarget = null,
} = {}) {
    if (!profile || !sourceVerb || !isPatientivoSurfaceRoute(profile) || typeof executeGenerateWordRequest !== "function") {
        return "";
    }
    const routeSpec = isNawatDynamicPatientivoSurfaceRoute(profile)
        ? resolveNawatPatientivoRouteSpec({
            sourceTenseValue: routeTarget?.sourceTenseValue
                || profile.sourceTenseValue
                || getCanonicalNawatPatientivoSourceTenseValue(profile.patientivoSource || "nonactive"),
            sourceCombinedMode: routeTarget?.sourceCombinedMode
                || profile.sourceCombinedMode
                || profile.combinedMode
                || "",
            patientivoSource: profile.patientivoSource || "nonactive",
        })
        : null;
    const patientivoSource = String(routeSpec?.patientivoSource || profile.patientivoSource || "nonactive");
    const sourceTenseValue = routeSpec?.sourceTenseValue
        || routeTarget?.sourceTenseValue
        || profile.sourceTenseValue
        || getCanonicalNawatPatientivoSourceTenseValue(patientivoSource);
    const sourceCombinedMode = routeSpec?.sourceCombinedMode
        || routeTarget?.sourceCombinedMode
        || profile.sourceCombinedMode
        || (patientivoSource === "nonactive" ? COMBINED_MODE.nonactive : COMBINED_MODE.active);
    const sourceDerivationMode = profile.sourceDerivationMode
        || (sourceCombinedMode === COMBINED_MODE.nonactive ? DERIVATION_MODE.nonactive : DERIVATION_MODE.active);
    const sourceVoiceMode = profile.sourceVoiceMode
        || (sourceCombinedMode === COMBINED_MODE.nonactive ? VOICE_MODE.passive : VOICE_MODE.active);
    const result = executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense: sourceTenseValue,
                tenseMode: TENSE_MODE.verbo,
                derivationMode: DERIVATION_MODE[sourceDerivationMode] || sourceDerivationMode || DERIVATION_MODE.active,
                voiceMode: VOICE_MODE[sourceVoiceMode] || sourceVoiceMode || VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix: sourceObjectPrefix || "",
            verb: sourceVerb,
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    const surface = getPrimaryNawatRouteSurfaceForm(result);
    if (
        !isNawatDynamicPatientivoSurfaceRoute(profile)
        && patientivoSource === "nonactive"
        && sourceTenseValue === "preterito"
        && surface.endsWith("k")
    ) {
        return surface.slice(0, -1);
    }
    return surface;
}

function stripNawatRoutePreposedParticle(surface = "") {
    return String(surface || "")
        .trim()
        .replace(/^ma\s+/i, "")
        .replace(/\s+/g, "");
}

function replaceNawatRouteSurfaceEnding(surface = "", replacements = []) {
    const normalized = String(surface || "");
    for (const [ending, replacement] of replacements) {
        if (ending && normalized.endsWith(ending)) {
            return `${normalized.slice(0, -ending.length)}${replacement || ""}`;
        }
    }
    return normalized;
}

function appendNawatRouteNominalSuffix(stem = "", suffix = "") {
    const normalizedStem = String(stem || "").trim();
    const normalizedSuffix = String(suffix || "").replace(/^-+/, "");
    if (!normalizedStem) {
        return "";
    }
    return `${normalizedStem}${normalizedSuffix}`;
}

function stripNawatRouteIaUaPatientivoStemFinalA(surface = "") {
    const normalized = String(surface || "").trim();
    if (
        normalized
        && Array.isArray(IA_UA_SUFFIXES)
        && typeof endsWithAny === "function"
        && endsWithAny(normalized, IA_UA_SUFFIXES)
        && normalized.endsWith("a")
    ) {
        return normalized.slice(0, -1);
    }
    return normalized;
}

function deriveNawatRouteActivePatientivoStem(sourceSurface = "", sourceTenseValue = "") {
    const surface = stripNawatRoutePreposedParticle(sourceSurface);
    switch (sourceTenseValue) {
        case "presente":
        case "imperativo":
            return stripNawatRouteIaUaPatientivoStemFinalA(surface);
        case "presente-desiderativo":
            return replaceNawatRouteSurfaceEnding(surface, [["sneki", "s"], ["neki", ""]]);
        case "preterito":
        case "preterito-clase":
            return replaceNawatRouteSurfaceEnding(surface, [["ki", ""], ["ik", ""], ["k", ""]]);
        case "perfecto":
            return replaceNawatRouteSurfaceEnding(surface, [["tuk", ""]]);
        case "pluscuamperfecto":
            return replaceNawatRouteSurfaceEnding(surface, [["tuya", ""]]);
        case "condicional-perfecto":
            return replaceNawatRouteSurfaceEnding(surface, [["tuskia", ""]]);
        case "condicional":
            return replaceNawatRouteSurfaceEnding(surface, [["kia", ""]]);
        default:
            return surface;
    }
}

function deriveNawatRouteNonactivePatientivoStem(sourceSurface = "", sourceTenseValue = "") {
    const surface = stripNawatRoutePreposedParticle(sourceSurface);
    switch (sourceTenseValue) {
        case "presente":
        case "imperativo":
            return replaceNawatRouteSurfaceEnding(surface, [["wa", ""]]);
        case "presente-desiderativo":
            return replaceNawatRouteSurfaceEnding(surface, [["sneki", "s"], ["neki", ""]]);
        case "preterito":
        case "preterito-clase":
            return replaceNawatRouteSurfaceEnding(surface, [["wak", ""], ["ak", ""]]);
        case "perfecto":
            return replaceNawatRouteSurfaceEnding(surface, [["watuk", ""], ["tuk", ""]]);
        case "pluscuamperfecto":
            return replaceNawatRouteSurfaceEnding(surface, [["watuya", ""], ["tuya", ""]]);
        case "condicional-perfecto":
            return replaceNawatRouteSurfaceEnding(surface, [["watuskia", ""], ["tuskia", ""]]);
        case "condicional":
            return replaceNawatRouteSurfaceEnding(surface, [["kia", ""]]);
        default:
            return surface;
    }
}

function getNawatVerbNounConversionNominalSurfaceForm(profile = null, {
    sourceVerb = "",
    sourceObjectPrefix = "",
    routeTarget = null,
} = {}) {
    if (!isNawatDynamicPatientivoSurfaceRoute(profile)) {
        return "";
    }
    const surfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, {
        sourceTenseValue: routeTarget?.sourceTenseValue || "",
        sourceCombinedMode: routeTarget?.sourceCombinedMode || "",
    });
    if (!surfaceSpec?.suffix) {
        return "";
    }
    const sourceSurface = getNawatRouteSourceSurfaceForm(profile, {
        sourceVerb: routeTarget?.sourceVerb || sourceVerb,
        sourceObjectPrefix: routeTarget?.sourceObjectPrefix || sourceObjectPrefix,
        routeTarget,
    });
    if (!sourceSurface) {
        return "";
    }
    if (
        isNawatRouteNonactiveSource(surfaceSpec)
        && NAWAT_ROUTE_NONACTIVE_CORE_PATIENTIVO_TENSES.has(surfaceSpec.sourceTenseValue)
        && typeof executeGenerateWordRequest === "function"
    ) {
        const routeVerb = routeTarget?.sourceVerb || sourceVerb;
        const buildCoreRequest = (patientivoNominalSuffix = null) => executeGenerateWordRequest({
            options: {
                silent: true,
                skipValidation: true,
                override: {
                    tense: "patientivo",
                    tenseMode: TENSE_MODE.sustantivo,
                    derivationMode: DERIVATION_MODE.active,
                    voiceMode: VOICE_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: routeTarget?.sourceObjectPrefix || sourceObjectPrefix || "",
                    patientivoSource: "nonactive",
                    patientivoNominalSuffix,
                },
            },
            prefixInputs: {
                subjectPrefix: "",
                objectPrefix: routeTarget?.sourceObjectPrefix || sourceObjectPrefix || "",
                verb: routeVerb,
                subjectSuffix: "",
                possessivePrefix: "",
            },
            liveInput: {
                hasVerbInput: false,
                verbInputValue: "",
            },
        });
        const requestedSurface = getPrimaryNawatRouteSurfaceForm(buildCoreRequest(surfaceSpec.suffix));
        if (requestedSurface) {
            return requestedSurface;
        }
        const defaultSurface = getPrimaryNawatRouteSurfaceForm(buildCoreRequest(null));
        if (defaultSurface) {
            return defaultSurface;
        }
    }
    const stem = isNawatRouteNonactiveSource(surfaceSpec)
        ? deriveNawatRouteNonactivePatientivoStem(sourceSurface, surfaceSpec.sourceTenseValue)
        : deriveNawatRouteActivePatientivoStem(sourceSurface, surfaceSpec.sourceTenseValue);
    return appendNawatRouteNominalSuffix(stem, surfaceSpec.suffix);
}

function getNawatRouteFiniteSurfaceForm(profile = null, {
    sourceVerb = "",
    sourceObjectPrefix = "",
    routeTarget = null,
} = {}) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    if (isPatientivoSurfaceRoute(profile)) {
        const routeSurface = getNawatVerbNounConversionNominalSurfaceForm(profile, {
            sourceVerb,
            sourceObjectPrefix,
            routeTarget,
        });
        if (routeSurface) {
            return routeSurface;
        }
    }
    const hasExplicitRouteStem = Boolean(String(routeTarget?.sourceStem || "").trim());
    if (!hasExplicitRouteStem) {
        const legacySurface = getPrimaryNawatRouteSurfaceForm(executeNawatRouteLegacyGeneration(profile, {
            sourceVerb,
            sourceObjectPrefix,
        }));
        if (legacySurface) {
            return legacySurface;
        }
    }
    const targetMode = routeTarget?.targetMode || getNawatRouteTargetMode(profile);
    const targetTenseValue = routeTarget?.targetTenseValue || getNawatRouteTargetTenseValue(profile);
    const targetVerb = routeTarget?.targetVerb || "";
    const routeStem = String(routeTarget?.sourceStem || "").trim()
        || stripNawatRouteVerbalizerFromTarget(profile, targetVerb);
    const generationVerb = profile.valency === "transitive" && routeStem
        ? formatNawatRouteTargetInputValue(profile, { routeStem, targetVerb })
        : targetVerb;
    const targetCombinedMode = routeTarget?.targetCombinedMode || profile.targetCombinedMode || profile.combinedMode || "";
    const targetDerivationMode = routeTarget?.targetDerivationMode
        || profile.targetDerivationMode
        || profile.derivationMode
        || (targetCombinedMode === COMBINED_MODE.nonactive ? DERIVATION_MODE.nonactive : DERIVATION_MODE.active);
    const targetVoiceMode = routeTarget?.targetVoiceMode
        || profile.targetVoiceMode
        || profile.voiceMode
        || (targetCombinedMode === COMBINED_MODE.nonactive ? VOICE_MODE.passive : VOICE_MODE.active);
    if (
        targetMode
        && targetTenseValue
        && generationVerb
        && typeof executeGenerateWordRequest === "function"
    ) {
        const result = executeGenerateWordRequest({
            options: {
                silent: true,
                skipValidation: false,
                override: {
                    tense: targetTenseValue,
                    tenseMode: targetMode,
                    derivationMode: DERIVATION_MODE[targetDerivationMode] || targetDerivationMode || DERIVATION_MODE.active,
                    voiceMode: VOICE_MODE[targetVoiceMode] || targetVoiceMode || VOICE_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    patientivoSource: isPatientivoSurfaceRoute(profile)
                        ? (profile.patientivoSource || "nonactive")
                        : undefined,
                    patientivoNominalSuffix: isPatientivoSurfaceRoute(profile)
                        ? resolveNawatRoutePatientivoNominalSuffix(profile, {
                            sourceTenseValue: routeTarget?.sourceTenseValue || "",
                            sourceCombinedMode: routeTarget?.sourceCombinedMode || "",
                        })
                        : undefined,
                },
            },
            prefixInputs: {
                subjectPrefix: "",
                objectPrefix: routeTarget?.targetObjectPrefix || "",
                verb: generationVerb,
                subjectSuffix: "",
                possessivePrefix: "",
            },
            liveInput: {
                hasVerbInput: false,
                verbInputValue: "",
            },
        });
        const surface = getPrimaryNawatRouteSurfaceForm(result);
        if (surface) {
            return surface;
        }
    }
    return generationVerb || targetVerb || "";
}

function getNawatRouteSurfaceTrailParts(routeKeyOrProfile = "", {
    sourceVerb = "",
    sourceObjectPrefix = "",
    routeTarget = null,
    stationModels = null,
} = {}) {
    const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object"
        ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "")
        : getNawatRouteProfile(routeKeyOrProfile);
    if (!profile) {
        return [];
    }
    const resolvedTarget = routeTarget && typeof routeTarget === "object"
        ? routeTarget
        : resolveNawatRouteTarget(profile, { sourceVerb, sourceObjectPrefix });
    const stations = Array.isArray(stationModels)
        ? stationModels
        : getNawatRouteStationModels(profile, {
            sourceVerb,
            sourceObjectPrefix,
            routeTarget: resolvedTarget,
        });
    if (!stations.length) {
        return [];
    }
    const parts = [];
    const seen = new Set();
    const pushPart = (station, text = "", options = {}) => {
        const displayText = String(text || "").trim();
        if (!displayText || seen.has(displayText)) {
            return;
        }
        seen.add(displayText);
        parts.push({
            key: options.key || station?.key || "",
            stationKey: station?.key || options.stationKey || "",
            text: displayText,
            relation: options.relation || "",
            depth: Number.isFinite(options.depth) ? options.depth : 0,
            inputValue: station?.inputValue || "",
            renderVerb: station?.renderVerb || "",
            mode: station?.mode || "",
            tenseValue: station?.tenseValue || "",
            objectPrefix: station?.objectPrefix || "",
        });
    };
    stations.forEach((station) => {
        const stationKey = station?.key || "";
        const surfaceText = stationKey === "finite-tense"
            ? getNawatRouteFiniteSurfaceForm(profile, {
                sourceVerb: resolvedTarget?.sourceVerb || sourceVerb,
                sourceObjectPrefix: resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix,
                routeTarget: resolvedTarget,
            })
            : (stationKey === "source-tense"
                ? (
                    station?.surface
                    || getNawatRouteSourceSurfaceForm(profile, {
                        sourceVerb: resolvedTarget?.sourceVerb || sourceVerb,
                        sourceObjectPrefix: resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix,
                        routeTarget: resolvedTarget,
                    })
                    || getNawatRouteStationSurfaceText(station)
                )
            : (stationKey === "verbalizer" || stationKey === "target-mode"
                ? (station?.inputValue || getNawatRouteStationSurfaceText(station))
                : getNawatRouteStationSurfaceText(station)));
        pushPart(station, surfaceText, {
            key: stationKey === "finite-tense" ? "finite-surface" : stationKey,
            relation: station?.role === "stem" ? "source-dependent" : "",
            depth: station?.role === "stem" ? 1 : 0,
        });
    });
    return parts;
}

function formatNawatRouteSurfaceTrailLabel(routeKeyOrProfile = "", options = {}) {
    const parts = getNawatRouteSurfaceTrailParts(routeKeyOrProfile, options)
        .filter((part) => part?.text);
    return parts
        .map((part) => part.text)
        .join(" → ");
}

function getPrimaryNawatRouteSurfaceForm(result = null) {
    if (!result || result.error || result.result === "—") {
        return "";
    }
    if (Array.isArray(result.surfaceForms) && result.surfaceForms.length) {
        return String(result.surfaceForms[0] || "").trim();
    }
    const rawResult = String(result.result || "").trim();
    if (!rawResult) {
        return "";
    }
    return rawResult
        .split(/\s*(?:\/|,|\n)\s*/)
        .map((part) => part.trim())
        .find(Boolean) || "";
}

function executeNawatRouteLegacyGeneration(profile = null, {
    sourceVerb = "",
    sourceObjectPrefix = "",
} = {}) {
    const legacyTenseValue = profile?.legacyTenseValue || "";
    const routeVerb = String(sourceVerb || "").trim();
    if (!profile || !legacyTenseValue || !routeVerb || typeof executeGenerateWordRequest !== "function") {
        return null;
    }
    const legacyModeKey = profile.legacyMode || "adjetivo";
    const legacyMode = TENSE_MODE[legacyModeKey] || legacyModeKey || TENSE_MODE.adjetivo;
    const legacyCombinedMode = profile.legacyCombinedMode || profile.targetCombinedMode || profile.combinedMode || "";
    const legacyDerivationMode = profile.legacyDerivationMode
        || profile.derivationMode
        || (legacyCombinedMode === COMBINED_MODE.nonactive ? DERIVATION_MODE.nonactive : DERIVATION_MODE.active);
    const legacyVoiceMode = profile.legacyVoiceMode
        || profile.voiceMode
        || (legacyCombinedMode === COMBINED_MODE.nonactive ? VOICE_MODE.passive : VOICE_MODE.active);
    return executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense: legacyTenseValue,
                tenseMode: legacyMode,
                derivationMode: DERIVATION_MODE[legacyDerivationMode] || legacyDerivationMode || DERIVATION_MODE.active,
                voiceMode: VOICE_MODE[legacyVoiceMode] || legacyVoiceMode || VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix: sourceObjectPrefix || "",
            verb: routeVerb,
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
}

function resolveNawatRoutePatientivoTroncoStem(profile = null, {
    sourceVerb = "",
    sourceObjectPrefix = "",
} = {}) {
    const routeVerb = String(sourceVerb || "").trim();
    if (
        !isPatientivoTroncoConversionRoute(profile)
        || !routeVerb
        || typeof executeGenerateWordRequest !== "function"
    ) {
        return "";
    }
    const result = executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense: "patientivo",
                tenseMode: TENSE_MODE.sustantivo,
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                patientivoSource: "tronco-verbal",
                patientivoNominalSuffix: "",
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix: sourceObjectPrefix || "",
            verb: routeVerb,
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    return getPrimaryNawatRouteSurfaceForm(result);
}

function resolveNawatRouteVerbalizedVerb(profile = null, {
    sourceVerb = "",
    sourceObjectPrefix = "",
    sourceStem = "",
} = {}) {
    const routeVerb = String(sourceVerb || "").trim();
    const verbalizer = String(profile?.verbalizer || "").replace(/^-+/, "");
    if (!profile || !verbalizer) {
        return routeVerb;
    }
    const routeStem = unwrapNawatRouteInputValue(sourceStem);
    if (routeStem) {
        return `${routeStem}${verbalizer}`;
    }
    const patientivoTroncoStem = resolveNawatRoutePatientivoTroncoStem(profile, {
        sourceVerb: routeVerb,
        sourceObjectPrefix,
    });
    if (patientivoTroncoStem) {
        return `${patientivoTroncoStem}${verbalizer}`;
    }
    const legacyResult = executeNawatRouteLegacyGeneration(profile, {
        sourceVerb: routeVerb,
        sourceObjectPrefix,
    });
    const legacySurface = getPrimaryNawatRouteSurfaceForm(legacyResult);
    const surfaceSuffix = String(profile.surfaceSuffix || "").replace(/^-+/, "");
    if (legacySurface && surfaceSuffix && legacySurface.endsWith(surfaceSuffix)) {
        return `${legacySurface.slice(0, -surfaceSuffix.length)}${verbalizer}`;
    }
    if (legacySurface && legacySurface.endsWith(`${verbalizer}k`)) {
        return legacySurface.slice(0, -1);
    }
    const parsed = typeof parseVerbInput === "function" && routeVerb
        ? parseVerbInput(routeVerb)
        : null;
    const fallbackBase = parsed?.verb || routeVerb.replace(/[()]/g, "");
    return fallbackBase ? `${fallbackBase}${verbalizer}` : "";
}

function resolveNawatRouteTarget(routeKeyOrProfile = "", {
    sourceVerb = "",
    sourceObjectPrefix = "",
    sourceStem = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
} = {}) {
    const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object"
        ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "")
        : getNawatRouteProfile(routeKeyOrProfile);
    if (!profile) {
        return null;
    }
    const targetMode = getNawatRouteTargetMode(profile);
    const targetTenseValue = getNawatRouteTargetTenseValue(profile);
    const routeVerb = String(sourceVerb || "").trim();
    const routeStem = unwrapNawatRouteInputValue(sourceStem);
    const targetCombinedMode = profile.targetCombinedMode || profile.combinedMode || "";
    const targetDerivationMode = profile.targetDerivationMode
        || profile.derivationMode
        || (targetCombinedMode === COMBINED_MODE.nonactive ? DERIVATION_MODE.nonactive : "");
    const targetVoiceMode = profile.targetVoiceMode
        || profile.voiceMode
        || (targetCombinedMode === COMBINED_MODE.nonactive ? VOICE_MODE.passive : "");
    const patientivoSurfaceSpec = isPatientivoSurfaceRoute(profile)
        ? getNawatRoutePatientivoSurfaceSpec(profile, {
            sourceTenseValue: sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
            sourceCombinedMode: sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "",
        })
        : null;
    const targetVerb = targetMode === TENSE_MODE.verbo
        ? resolveNawatRouteVerbalizedVerb(profile, {
            sourceVerb: routeVerb,
            sourceObjectPrefix,
            sourceStem: routeStem,
        })
        : routeVerb;
    return {
        sourceVerb: routeVerb,
        sourceObjectPrefix: sourceObjectPrefix || "",
        sourceStem: routeStem,
        sourceMode: getNawatRouteOriginMode(profile),
        sourceTenseValue: sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
        sourceCombinedMode: sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "",
        targetMode,
        targetTenseValue,
        targetCombinedMode,
        targetDerivationMode,
        targetVoiceMode,
        targetVerb,
        targetObjectPrefix: targetMode === TENSE_MODE.verbo && profile.valency === "intransitive"
            ? ""
            : (sourceObjectPrefix || ""),
        activePatientivoBranch: isPatientivoSurfaceRoute(profile)
            ? (patientivoSurfaceSpec?.patientivoSource || profile.patientivoSource || "nonactive")
            : "",
        activePatientivoNominalSuffix: isPatientivoSurfaceRoute(profile)
            ? (patientivoSurfaceSpec?.suffix || resolveNawatRoutePatientivoNominalSuffix(profile, {
                sourceTenseValue: sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
                sourceCombinedMode: sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "",
            }))
            : "",
    };
}

function summarizeNawatRouteSourceStateStation(station = null) {
    if (!station || typeof station !== "object") {
        return null;
    }
    return {
        key: station.key || "",
        role: station.role || "",
        mode: station.mode || "",
        tenseValue: station.tenseValue || "",
        inputValue: station.inputValue || "",
        renderVerb: station.renderVerb || "",
        objectPrefix: station.objectPrefix || "",
        combinedMode: station.combinedMode || "",
        derivationMode: station.derivationMode || "",
        voiceMode: station.voiceMode || "",
        sourceScope: station.sourceScope || "",
        patientivoSource: station.patientivoSource || "",
        surface: station.surface || "",
    };
}

function resolveNawatRouteSourceStateMetadata(routeKeyOrProfile = "", {
    sourceVerb = "",
    sourceObjectPrefix = "",
    sourceStem = "",
    sourceTenseValue = "",
    sourceCombinedMode = "",
    routeTarget = null,
    stationModels = null,
} = {}) {
    const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object"
        ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "")
        : getNawatRouteProfile(routeKeyOrProfile);
    if (!profile || !isPatientivoTroncoConversionRoute(profile)) {
        return null;
    }
    const explicitSourceStem = unwrapNawatRouteInputValue(sourceStem);
    const resolvedTarget = routeTarget && typeof routeTarget === "object"
        ? {
            ...routeTarget,
            sourceStem: routeTarget.sourceStem || explicitSourceStem,
        }
        : resolveNawatRouteTarget(profile, {
            sourceVerb,
            sourceObjectPrefix,
            sourceStem: explicitSourceStem,
            sourceTenseValue,
            sourceCombinedMode,
        });
    if (!resolvedTarget) {
        return null;
    }
    const stations = Array.isArray(stationModels)
        ? stationModels
        : getNawatRouteStationModels(profile, {
            sourceVerb,
            sourceObjectPrefix,
            routeTarget: resolvedTarget,
        });
    const sourceStation = stations.find((station) => station.key === "source-mode")
        || stations.find((station) => station.role === "source")
        || null;
    const stemStation = stations.find((station) => station.key === "stem")
        || stations.find((station) => station.role === "stem")
        || null;
    const verbalizerStation = stations.find((station) => station.key === "verbalizer")
        || null;
    const sourceSurface = String(
        stemStation?.inputValue
        || stemStation?.surface
        || resolvedTarget.sourceStem
        || explicitSourceStem
        || ""
    ).trim();
    const sourceInput = String(
        sourceStation?.inputValue
        || resolvedTarget.sourceVerb
        || sourceVerb
        || ""
    ).trim();
    const targetTenseValue = resolvedTarget.targetTenseValue || getNawatRouteTargetTenseValue(profile);
    const valency = String(profile.valency || "").trim();
    return {
        version: 1,
        routeId: profile.id || "",
        legacyTenseValue: profile.legacyTenseValue || "",
        routePlacement: getNawatRoutePlacement(profile),
        sourceMode: resolvedTarget.sourceMode || getNawatRouteOriginMode(profile),
        sourceTenseValue: resolvedTarget.sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
        sourceCombinedMode: resolvedTarget.sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "",
        sourceState: "patientivo-tronco",
        sourceSlot: profile.sourceSlot || "",
        sourceCategory: profile.sourceCategory || "",
        sourceSurface,
        sourceInput,
        sourceVerb: resolvedTarget.sourceVerb || sourceVerb || "",
        sourceObjectPrefix: resolvedTarget.sourceObjectPrefix || sourceObjectPrefix || "",
        verbalizer: profile.verbalizer || "",
        verbalizerType: profile.verbalizerType || "",
        verbalizerSurface: verbalizerStation?.surface || verbalizerStation?.inputValue || "",
        targetMode: resolvedTarget.targetMode || getNawatRouteTargetMode(profile),
        targetTense: targetTenseValue,
        targetTenseValue,
        targetVerb: resolvedTarget.targetVerb || "",
        targetObjectPrefix: resolvedTarget.targetObjectPrefix || "",
        valency,
        stations: stations.map(summarizeNawatRouteSourceStateStation).filter(Boolean),
        flags: {
            denominal: true,
            patientivoTroncoConversion: true,
            transitive: valency === "transitive",
            intransitive: valency === "intransitive",
        },
    };
}

function resolveNawatRouteSourceContext(profile = null, {
    sourceVerb = "",
    sourceObjectPrefix = null,
    sourceStem = null,
    sourceTenseValue = null,
    sourceCombinedMode = null,
} = {}) {
    const currentRoute = profile?.id ? getActiveNawatRouteProfile() : null;
    const useCurrentRoute = Boolean(currentRoute?.id && currentRoute.id === profile.id);
    const verbMeta = typeof getVerbInputMeta === "function" ? getVerbInputMeta() : {};
    const routeSourceVerb = String(
        (useCurrentRoute ? currentRoute.sourceVerb : "")
        || sourceVerb
        || verbMeta.parseInputVerb
        || verbMeta.regexInputVerb
        || verbMeta.displayVerb
        || ""
    ).trim();
    const routeSourceObjectPrefix = sourceObjectPrefix == null
        ? (
            (useCurrentRoute ? currentRoute.sourceObjectPrefix : "")
            || (typeof getCurrentObjectPrefix === "function" ? getCurrentObjectPrefix() : "")
        )
        : sourceObjectPrefix;
    const routeSourceStem = sourceStem == null
        ? (useCurrentRoute ? (currentRoute.sourceStem || "") : "")
        : sourceStem;
    const routeSourceTenseValue = sourceTenseValue == null
        ? (useCurrentRoute ? (currentRoute.sourceTenseValue || "") : "")
        : sourceTenseValue;
    const routeSourceCombinedMode = sourceCombinedMode == null
        ? (useCurrentRoute ? (currentRoute.sourceCombinedMode || "") : "")
        : sourceCombinedMode;
    return {
        sourceVerb: routeSourceVerb,
        sourceObjectPrefix: routeSourceObjectPrefix || "",
        sourceStem: unwrapNawatRouteInputValue(routeSourceStem),
        sourceTenseValue: routeSourceTenseValue || "",
        sourceCombinedMode: routeSourceCombinedMode || "",
    };
}

function getNawatRouteStationModels(routeKeyOrProfile = "", {
    sourceVerb = "",
    sourceObjectPrefix = "",
    routeTarget = null,
} = {}) {
    const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object"
        ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "")
        : getNawatRouteProfile(routeKeyOrProfile);
    if (!profile) {
        return [];
    }
    const resolvedTarget = routeTarget && typeof routeTarget === "object"
        ? routeTarget
        : resolveNawatRouteTarget(profile, { sourceVerb, sourceObjectPrefix });
    const routeSourceVerb = String(resolvedTarget?.sourceVerb || sourceVerb || "").trim();
    const routeSourceObjectPrefix = resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix || "";
    const explicitRouteStem = String(resolvedTarget?.sourceStem || "").trim();
    const sourceMode = resolvedTarget?.sourceMode || getNawatRouteOriginMode(profile);
    const sourceTenseValue = resolvedTarget?.sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile);
    const nominalStemMode = TENSE_MODE.sustantivo;
    const nominalStemTenseValue = "patientivo";
    const targetMode = resolvedTarget?.targetMode || getNawatRouteTargetMode(profile);
    const targetTenseValue = resolvedTarget?.targetTenseValue || getNawatRouteTargetTenseValue(profile);
    const targetVerb = String(resolvedTarget?.targetVerb || routeSourceVerb || "").trim();
    const targetObjectPrefix = resolvedTarget?.targetObjectPrefix || "";
    const sourceCombinedMode = resolvedTarget?.sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "";
    const targetCombinedMode = resolvedTarget?.targetCombinedMode || profile.targetCombinedMode || profile.combinedMode || "";
    const sourceDerivationMode = profile.sourceDerivationMode
        || (sourceCombinedMode === COMBINED_MODE.nonactive ? DERIVATION_MODE.nonactive : "")
        || (sourceCombinedMode === COMBINED_MODE.active ? DERIVATION_MODE.active : "");
    const sourceVoiceMode = profile.sourceVoiceMode
        || (sourceCombinedMode === COMBINED_MODE.nonactive ? VOICE_MODE.passive : "")
        || (sourceCombinedMode === COMBINED_MODE.active ? VOICE_MODE.active : "");
    const targetDerivationMode = resolvedTarget?.targetDerivationMode
        || profile.targetDerivationMode
        || profile.derivationMode
        || (targetCombinedMode === COMBINED_MODE.nonactive ? DERIVATION_MODE.nonactive : "")
        || (targetCombinedMode === COMBINED_MODE.active ? DERIVATION_MODE.active : "");
    const targetVoiceMode = resolvedTarget?.targetVoiceMode
        || profile.targetVoiceMode
        || profile.voiceMode
        || (targetCombinedMode === COMBINED_MODE.nonactive ? VOICE_MODE.passive : "")
        || (targetCombinedMode === COMBINED_MODE.active ? VOICE_MODE.active : "");
    const sourceScope = sourceCombinedMode === COMBINED_MODE.nonactive
        ? VERB_SOURCE_SCOPE.nonactive
        : (sourceCombinedMode === COMBINED_MODE.active ? VERB_SOURCE_SCOPE.active : "");
    const targetSourceScope = targetCombinedMode === COMBINED_MODE.nonactive
        ? VERB_SOURCE_SCOPE.nonactive
        : (targetCombinedMode === COMBINED_MODE.active ? VERB_SOURCE_SCOPE.active : "");
    const routeStem = explicitRouteStem || stripNawatRouteVerbalizerFromTarget(profile, targetVerb);
    const targetInputValue = targetVerb
        ? formatNawatRouteTargetInputValue(profile, { routeStem, targetVerb })
        : "";
    const verbalizedTenseValue = "presente";
    const baseSourceModeStation = {
        key: "source-mode",
        aliases: ["source", "input", "verbo"],
        role: "source",
        labelKind: "mode",
        modeKey: sourceMode,
        mode: sourceMode,
        tenseValue: sourceTenseValue,
        inputValue: routeSourceVerb,
        renderVerb: routeSourceVerb,
        objectPrefix: routeSourceObjectPrefix,
        combinedMode: sourceCombinedMode,
        derivationMode: sourceDerivationMode,
        voiceMode: sourceVoiceMode,
        sourceScope,
    };
    const baseSourceTenseStation = {
        key: "source-tense",
        aliases: [sourceTenseValue],
        role: "source",
        labelKind: "tense",
        labelTenseValue: sourceTenseValue,
        mode: sourceMode,
        tenseValue: sourceTenseValue,
        inputValue: routeSourceVerb,
        renderVerb: routeSourceVerb,
        objectPrefix: routeSourceObjectPrefix,
        combinedMode: sourceCombinedMode,
        derivationMode: sourceDerivationMode,
        voiceMode: sourceVoiceMode,
        sourceScope,
    };
    const baseTargetModeStation = {
        key: "target-mode",
        aliases: ["target", targetMode],
        role: "target",
        labelKind: "mode",
        modeKey: targetMode,
        mode: targetMode,
        tenseValue: targetTenseValue,
        inputValue: targetInputValue || routeSourceVerb,
        renderVerb: targetInputValue || targetVerb || routeSourceVerb,
        objectPrefix: targetObjectPrefix,
        combinedMode: targetCombinedMode,
        derivationMode: targetDerivationMode,
        voiceMode: targetVoiceMode,
        sourceScope: targetSourceScope,
    };
    const baseFiniteStation = {
        key: "finite-tense",
        aliases: ["finite", "surface", targetTenseValue],
        role: "target",
        labelKind: "tense",
        labelTenseValue: targetTenseValue,
        mode: targetMode,
        tenseValue: targetTenseValue,
        inputValue: targetInputValue || routeSourceVerb,
        renderVerb: targetInputValue || targetVerb || routeSourceVerb,
        objectPrefix: targetObjectPrefix,
        combinedMode: targetCombinedMode,
        derivationMode: targetDerivationMode,
        voiceMode: targetVoiceMode,
        sourceScope: targetSourceScope,
    };
    if (isDirectFiniteRoute(profile)) {
        return [
            baseSourceModeStation,
            {
                ...baseFiniteStation,
                inputValue: routeSourceVerb,
                renderVerb: targetVerb || routeSourceVerb,
            },
        ].filter((station) => station.inputValue || station.renderVerb || station.key === "source-mode");
    }
    if (isNonactiveHabitualRoute(profile)) {
        const nonactiveLabel = getLocalizedLabel(UI_LABELS["tense-tabs-mode-nonactive"], false, "no activo");
        return [
            baseSourceModeStation,
            baseSourceTenseStation,
            {
                key: "nonactive-switch",
                aliases: ["nonactive", "no-activo", "derivation"],
                role: "derivation",
                text: nonactiveLabel,
                nawatText: getLocalizedLabel(UI_LABELS["tense-tabs-mode-nonactive"], true, nonactiveLabel),
                mode: TENSE_MODE.verbo,
                tenseValue: sourceTenseValue,
                inputValue: routeSourceVerb,
                renderVerb: routeSourceVerb,
                objectPrefix: routeSourceObjectPrefix,
                combinedMode: COMBINED_MODE.nonactive,
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.passive,
                sourceScope: VERB_SOURCE_SCOPE.nonactive,
                surface: nonactiveLabel,
            },
            {
                ...baseTargetModeStation,
                aliases: ["target", "verbo"],
                inputValue: routeSourceVerb,
                renderVerb: targetVerb || routeSourceVerb,
            },
            {
                ...baseFiniteStation,
                inputValue: routeSourceVerb,
                renderVerb: targetVerb || routeSourceVerb,
            },
        ].filter((station) => station.inputValue || station.renderVerb || station.key === "source-mode");
    }
    if (isPatientivoSurfaceRoute(profile)) {
        const patientivoSurfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, {
            sourceTenseValue,
            sourceCombinedMode,
        });
        const patientivoSource = patientivoSurfaceSpec?.patientivoSource || profile.patientivoSource || "nonactive";
        const patientivoCombinedMode = patientivoSource === "nonactive" || patientivoSurfaceSpec?.sourceCombinedMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        const patientivoDerivationMode = patientivoCombinedMode === COMBINED_MODE.nonactive
            ? DERIVATION_MODE.nonactive
            : DERIVATION_MODE.active;
        const patientivoVoiceMode = patientivoCombinedMode === COMBINED_MODE.nonactive
            ? VOICE_MODE.passive
            : VOICE_MODE.active;
        const patientivoSourceScope = patientivoCombinedMode === COMBINED_MODE.nonactive
            ? VERB_SOURCE_SCOPE.nonactive
            : VERB_SOURCE_SCOPE.active;
        const patientivoSourceLabel = getPatientivoSourceTenseLabel(patientivoSource, false);
        const patientivoSurfaceLabel = ["patientivo", patientivoSourceLabel].filter(Boolean).join(" · ");
        const nominalSuffix = String(
            patientivoSurfaceSpec?.surfaceSuffix
            || profile.surfaceSuffix
            || (profile.patientivoNominalSuffix ? `-${String(profile.patientivoNominalSuffix).replace(/^-+/, "")}` : "-ti")
        ).trim();
        return [
            {
                ...baseSourceModeStation,
                combinedMode: patientivoCombinedMode,
                derivationMode: patientivoDerivationMode,
                voiceMode: patientivoVoiceMode,
                sourceScope: patientivoSourceScope,
            },
            {
                ...baseSourceTenseStation,
                combinedMode: patientivoCombinedMode,
                derivationMode: patientivoDerivationMode,
                voiceMode: patientivoVoiceMode,
                sourceScope: patientivoSourceScope,
            },
            {
                key: "patientivo-branch",
                aliases: ["patientivo", "patientivo-source", patientivoSource],
                role: "stem",
                text: "patientivo",
                nawatText: "tachiwal",
                mode: targetMode,
                tenseValue: targetTenseValue,
                inputValue: routeSourceVerb,
                renderVerb: routeSourceVerb,
                objectPrefix: targetObjectPrefix,
                combinedMode: patientivoCombinedMode,
                derivationMode: patientivoDerivationMode,
                voiceMode: patientivoVoiceMode,
                sourceScope: patientivoSourceScope,
                patientivoSource,
                surface: patientivoSurfaceLabel,
            },
            {
                key: "surface-profile",
                aliases: ["profile", "suffix", nominalSuffix],
                role: "stem",
                text: nominalSuffix,
                nawatText: nominalSuffix,
                mode: targetMode,
                tenseValue: targetTenseValue,
                inputValue: routeSourceVerb,
                renderVerb: routeSourceVerb,
                objectPrefix: targetObjectPrefix,
                combinedMode: patientivoCombinedMode,
                derivationMode: patientivoDerivationMode,
                voiceMode: patientivoVoiceMode,
                sourceScope: patientivoSourceScope,
                patientivoSource,
                surface: nominalSuffix,
            },
            {
                ...baseTargetModeStation,
                aliases: ["target", "sustantivo"],
                inputValue: routeSourceVerb,
                renderVerb: routeSourceVerb,
                combinedMode: patientivoCombinedMode,
                derivationMode: patientivoDerivationMode,
                voiceMode: patientivoVoiceMode,
                sourceScope: patientivoSourceScope,
                patientivoSource,
            },
            {
                ...baseFiniteStation,
                inputValue: routeSourceVerb,
                renderVerb: routeSourceVerb,
                combinedMode: patientivoCombinedMode,
                derivationMode: patientivoDerivationMode,
                voiceMode: patientivoVoiceMode,
                sourceScope: patientivoSourceScope,
                patientivoSource,
            },
        ].filter((station) => station.inputValue || station.renderVerb || station.key === "source-mode");
    }
    const stemInputValue = routeStem || routeSourceVerb;
    const verbalizerStationText = formatNawatRouteStemLabel(profile);
    return [
        baseSourceModeStation,
        baseSourceTenseStation,
        {
            key: "stem",
            aliases: ["tronco", "tronco-verbal"],
            role: "stem",
            text: "tronco verbal",
            nawatText: "muchiwalis takutunti",
            mode: nominalStemMode,
            tenseValue: nominalStemTenseValue,
            inputValue: stemInputValue,
            renderVerb: stemInputValue,
            objectPrefix: routeSourceObjectPrefix,
            combinedMode: COMBINED_MODE.active,
            derivationMode: DERIVATION_MODE.active,
            voiceMode: VOICE_MODE.active,
            sourceScope: VERB_SOURCE_SCOPE.active,
            patientivoSource: "tronco-verbal",
            surface: stemInputValue,
        },
        {
            key: "verbalizer",
            aliases: [String(profile.verbalizer || "").replace(/^-+/, ""), profile.verbalizer || ""],
            role: "verbalizer",
            text: verbalizerStationText,
            nawatText: verbalizerStationText,
            mode: targetMode,
            tenseValue: verbalizedTenseValue,
            inputValue: targetInputValue,
            renderVerb: targetInputValue || targetVerb,
            objectPrefix: targetObjectPrefix,
            combinedMode: targetCombinedMode || COMBINED_MODE.active,
            derivationMode: targetDerivationMode || DERIVATION_MODE.active,
            voiceMode: targetVoiceMode || VOICE_MODE.active,
            sourceScope: targetSourceScope || VERB_SOURCE_SCOPE.active,
            surface: targetVerb,
        },
        {
            ...baseTargetModeStation,
            aliases: ["target", "verbo"],
            tenseValue: verbalizedTenseValue,
            inputValue: targetInputValue,
            renderVerb: targetInputValue || targetVerb,
            combinedMode: targetCombinedMode || COMBINED_MODE.active,
            derivationMode: targetDerivationMode || DERIVATION_MODE.active,
            voiceMode: targetVoiceMode || VOICE_MODE.active,
            sourceScope: targetSourceScope || VERB_SOURCE_SCOPE.active,
            surface: targetVerb,
        },
        {
            ...baseFiniteStation,
            aliases: ["finite", "surface", targetTenseValue],
            inputValue: targetInputValue,
            renderVerb: targetInputValue || targetVerb,
            combinedMode: targetCombinedMode || COMBINED_MODE.active,
            derivationMode: targetDerivationMode || DERIVATION_MODE.active,
            voiceMode: targetVoiceMode || VOICE_MODE.active,
            sourceScope: targetSourceScope || VERB_SOURCE_SCOPE.active,
        },
    ].filter((station) => station.inputValue || station.renderVerb || station.key === "source-mode");
}

function getNawatRouteStationModel(routeKeyOrProfile = "", stationKey = "", options = {}) {
    const requestedKey = normalizeNawatRouteStationKey(stationKey);
    const stations = getNawatRouteStationModels(routeKeyOrProfile, options);
    if (!stations.length) {
        return null;
    }
    if (!requestedKey) {
        return stations.find((station) => station.key === "finite-tense")
            || stations[stations.length - 1];
    }
    return stations.find((station) => (
        station.key === requestedKey
        || (Array.isArray(station.aliases) && station.aliases.includes(stationKey))
        || (Array.isArray(station.aliases) && station.aliases.includes(requestedKey))
    )) || null;
}

function formatNawatRouteStationConversionLabel(profile = null, stationKey = "", isNawat = false, {
    stationModels = null,
} = {}) {
    const stations = Array.isArray(stationModels)
        ? stationModels
        : getNawatRouteStationModels(profile, {
            sourceVerb: profile?.sourceVerb || "",
            sourceObjectPrefix: profile?.sourceObjectPrefix || "",
            routeTarget: profile,
        });
    const requestedKey = normalizeNawatRouteStationKey(stationKey || profile?.activeStationKey || "");
    const index = requestedKey
        ? stations.findIndex((station) => station.key === requestedKey)
        : -1;
    if (index <= 0) {
        return formatNawatRouteConversionLabel(profile, isNawat);
    }
    const sourceText = getNawatRouteStationText(stations[index - 1], isNawat);
    const targetText = getNawatRouteStationText(stations[index], isNawat);
    return [sourceText, targetText].filter(Boolean).join(" -> ");
}

function getActiveNawatRouteProfile() {
    const state = getNawatRouteStateStore();
    const routeId = state.activeRoute || "";
    const profile = routeId ? getNawatRouteProfile(routeId) : null;
    if (!profile) {
        return null;
    }
    return {
        ...profile,
        activeRouteTravelSource: state.activeRouteTravelSource || "",
        sourceVerb: state.sourceVerb || "",
        sourceObjectPrefix: state.sourceObjectPrefix || "",
        sourceStem: state.sourceStem || "",
        sourceMode: state.sourceMode || getNawatRouteOriginMode(profile),
        sourceTenseValue: state.sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
        sourceCombinedMode: state.sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "",
        targetMode: state.targetMode || getNawatRouteTargetMode(profile),
        targetTenseValue: state.targetTenseValue || getNawatRouteTargetTenseValue(profile),
        targetCombinedMode: state.targetCombinedMode || profile.targetCombinedMode || "",
        targetDerivationMode: state.targetDerivationMode || profile.targetDerivationMode || profile.derivationMode || "",
        targetVoiceMode: state.targetVoiceMode || profile.targetVoiceMode || profile.voiceMode || "",
        targetVerb: state.targetVerb || "",
        targetObjectPrefix: state.targetObjectPrefix || "",
        activePatientivoBranch: state.activePatientivoBranch || profile.patientivoSource || "",
        activePatientivoNominalSuffix: state.activePatientivoNominalSuffix || resolveNawatRoutePatientivoNominalSuffix(profile, {
            sourceTenseValue: state.sourceTenseValue || "",
            sourceCombinedMode: state.sourceCombinedMode || "",
        }),
        activeStationKey: state.activeStationKey || "",
        activeStationInput: state.activeStationInput || "",
        activeStationVerb: state.activeStationVerb || "",
        activeStationMode: state.activeStationMode || "",
        activeStationTenseValue: state.activeStationTenseValue || "",
        activeStationObjectPrefix: state.activeStationObjectPrefix || "",
    };
}

function setActiveNawatRouteProfile(routeKey = "", routeTarget = null) {
    const profile = getNawatRouteProfile(routeKey);
    const routeId = profile?.id || "";
    const state = getNawatRouteStateStore();
    state.activeRoute = routeId;
    const resolvedTarget = routeTarget && typeof routeTarget === "object"
        ? routeTarget
        : {};
    state.activeRouteTravelSource = resolvedTarget.activeRouteTravelSource || "";
    state.sourceVerb = resolvedTarget.sourceVerb || "";
    state.sourceObjectPrefix = resolvedTarget.sourceObjectPrefix || "";
    state.sourceStem = resolvedTarget.sourceStem || "";
    state.sourceMode = resolvedTarget.sourceMode || (profile ? getNawatRouteOriginMode(profile) : "");
    state.sourceTenseValue = resolvedTarget.sourceTenseValue || (profile ? getNawatRouteDefaultSourceTenseValue(profile) : "");
    state.sourceCombinedMode = resolvedTarget.sourceCombinedMode || profile?.sourceCombinedMode || profile?.combinedMode || "";
    state.targetMode = resolvedTarget.targetMode || (profile ? getNawatRouteTargetMode(profile) : "");
    state.targetTenseValue = resolvedTarget.targetTenseValue || (profile ? getNawatRouteTargetTenseValue(profile) : "");
    state.targetCombinedMode = resolvedTarget.targetCombinedMode || profile?.targetCombinedMode || "";
    state.targetDerivationMode = resolvedTarget.targetDerivationMode || profile?.targetDerivationMode || profile?.derivationMode || "";
    state.targetVoiceMode = resolvedTarget.targetVoiceMode || profile?.targetVoiceMode || profile?.voiceMode || "";
    state.targetVerb = resolvedTarget.targetVerb || "";
    state.targetObjectPrefix = resolvedTarget.targetObjectPrefix || "";
    state.activePatientivoBranch = resolvedTarget.activePatientivoBranch || profile?.patientivoSource || state.activePatientivoBranch || "imperfectivo";
    state.activePatientivoNominalSuffix = resolvedTarget.activePatientivoNominalSuffix || resolveNawatRoutePatientivoNominalSuffix(profile, {
        sourceTenseValue: resolvedTarget.sourceTenseValue || "",
        sourceCombinedMode: resolvedTarget.sourceCombinedMode || "",
    });
    state.activeStationKey = resolvedTarget.activeStationKey || "";
    state.activeStationInput = resolvedTarget.activeStationInput || "";
    state.activeStationVerb = resolvedTarget.activeStationVerb || "";
    state.activeStationMode = resolvedTarget.activeStationMode || "";
    state.activeStationTenseValue = resolvedTarget.activeStationTenseValue || "";
    state.activeStationObjectPrefix = resolvedTarget.activeStationObjectPrefix || "";
    return profile
        ? {
            ...cloneNawatRouteProfile(profile, profile.legacyTenseValue || ""),
            activeRouteTravelSource: state.activeRouteTravelSource,
            sourceVerb: state.sourceVerb,
            sourceObjectPrefix: state.sourceObjectPrefix,
            sourceStem: state.sourceStem,
            sourceMode: state.sourceMode,
            sourceTenseValue: state.sourceTenseValue,
            sourceCombinedMode: state.sourceCombinedMode,
            targetMode: state.targetMode,
            targetTenseValue: state.targetTenseValue,
            targetCombinedMode: state.targetCombinedMode,
            targetDerivationMode: state.targetDerivationMode,
            targetVoiceMode: state.targetVoiceMode,
            targetVerb: state.targetVerb,
            targetObjectPrefix: state.targetObjectPrefix,
            activePatientivoBranch: state.activePatientivoBranch,
            activePatientivoNominalSuffix: state.activePatientivoNominalSuffix,
            activeStationKey: state.activeStationKey,
            activeStationInput: state.activeStationInput,
            activeStationVerb: state.activeStationVerb,
            activeStationMode: state.activeStationMode,
            activeStationTenseValue: state.activeStationTenseValue,
            activeStationObjectPrefix: state.activeStationObjectPrefix,
        }
        : null;
}

function clearActiveNawatRouteProfile() {
    const state = getNawatRouteStateStore();
    state.activeRoute = "";
    state.activeRouteTravelSource = "";
    state.sourceVerb = "";
    state.sourceObjectPrefix = "";
    state.sourceStem = "";
    state.sourceMode = "";
    state.sourceTenseValue = "";
    state.sourceCombinedMode = "";
    state.targetMode = "";
    state.targetTenseValue = "";
    state.targetCombinedMode = "";
    state.targetDerivationMode = "";
    state.targetVoiceMode = "";
    state.targetVerb = "";
    state.targetObjectPrefix = "";
    state.activePatientivoBranch = "imperfectivo";
    state.activePatientivoNominalSuffix = "";
    state.activeStationKey = "";
    state.activeStationInput = "";
    state.activeStationVerb = "";
    state.activeStationMode = "";
    state.activeStationTenseValue = "";
    state.activeStationObjectPrefix = "";
    state.activeNawatLineStationKey = "";
    state.activeLocativeSourceVerb = "";
    state.activeLocativeSourceTenseValue = "";
    state.activeLocativeSourceSurface = "";
    state.activeLocativePatientivoSurface = "";
    state.activeLocativeIncorporatedRoot = "";
    state.activeLocativeMatrixRoot = "";
    state.activeLocativePrelocativeVerb = "";
    if (typeof window !== "undefined") {
        window.__NAWAT_ACTIVE_PATIENTIVO_BRANCH__ = "imperfectivo";
    }
}

function getActiveNawatTenseModeForCurrentSelection() {
    const activeRoute = getActiveNawatRouteProfile();
    if (activeRoute?.activeStationMode) {
        return getNawatTenseModeValue(activeRoute.activeStationMode) || activeRoute.activeStationMode;
    }
    return getActiveNawatTenseMode();
}

function formatNawatRouteStemLabel(profile = null) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    const sourceSlot = profile.sourceSlot || "noun/inc.root";
    const verbalizer = profile.verbalizer || "";
    const displayedVerbalizer = verbalizer === "-ti" ? "ti" : verbalizer;
    return `[${sourceSlot}]${displayedVerbalizer}`;
}

function formatNawatRouteProfileLabel(profile = null, isNawat = false) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    return getLocalizedLabel(profile.nawatLabel, isNawat, formatNawatRouteStemLabel(profile));
}

function formatNawatRouteMetaLabel(profile = null) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    const stations = Array.isArray(profile.stations) ? profile.stations : [];
    const finiteStation = stations.find((station) => station?.id === "finite-tense");
    const finiteTense = finiteStation?.value || profile.finiteTense || "";
    return [finiteTense, profile.surfaceSuffix || ""].filter(Boolean).join(" -> ");
}

function formatNawatRouteProfileMetaLabel(profile = null, isNawat = false) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    return getLocalizedLabel(profile.nawatMetaLabel, isNawat, formatNawatRouteMetaLabel(profile));
}

function getEuropeanConventionModeLabel(modeKey = "") {
    const normalizedMode = String(modeKey || "").trim();
    if (normalizedMode === "adjetivo") {
        return "Adjetivo";
    }
    if (normalizedMode === "adverbio") {
        return "Adverbio";
    }
    if (normalizedMode === "sustantivo") {
        return "Sustantivo";
    }
    if (normalizedMode === "verbo") {
        return "Verbo";
    }
    return normalizedMode;
}

function formatNawatRouteEuropeanTargetLabel(profile = null, isNawat = false) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    const legacyMode = profile.legacyMode || "";
    const legacyTenseValue = profile.legacyTenseValue || "";
    const modeLabel = getEuropeanConventionModeLabel(legacyMode);
    const tenseLabel = legacyTenseValue
        ? getLocalizedLabel(TENSE_LABELS[legacyTenseValue], isNawat, legacyTenseValue)
        : "";
    if (!modeLabel && !tenseLabel) {
        return "";
    }
    const destination = [modeLabel, tenseLabel].filter(Boolean).join(" > ");
    return destination ? `Europea: ${destination}` : "";
}

function formatNawatRouteNawatTargetLabel(profile = null, isNawat = false) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    const targetMode = getNawatRouteTargetMode(profile);
    const targetTenseValue = getNawatRouteTargetTenseValue(profile);
    const modeLabel = getNawatConventionModeLabel(targetMode, isNawat);
    const tenseLabel = targetTenseValue
        ? getLocalizedLabel(TENSE_LABELS[targetTenseValue], isNawat, targetTenseValue)
        : "";
    const destination = [modeLabel, tenseLabel].filter(Boolean).join(" > ");
    return destination ? `Nawat: ${destination}` : "";
}

function formatNawatRouteNawatOriginLabel(profile = null, isNawat = false) {
    if (!profile || typeof profile !== "object") {
        return "";
    }
    const originMode = getNawatRouteOriginMode(profile);
    const originTenseValue = getNawatRouteDefaultSourceTenseValue(profile);
    const modeLabel = getNawatConventionModeLabel(originMode, isNawat);
    const tenseLabel = originTenseValue
        ? getLocalizedLabel(TENSE_LABELS[originTenseValue], isNawat, originTenseValue)
        : "";
    const destination = [modeLabel, tenseLabel].filter(Boolean).join(" > ");
    return destination ? `Nawat: ${destination}` : "";
}

function applyNawatRouteStationInput(station = null) {
    const inputValue = String(station?.inputValue || "").trim();
    if (!inputValue || typeof document === "undefined") {
        return;
    }
    const verbEl = document.getElementById("verb");
    if (!verbEl) {
        return;
    }
    verbEl.value = inputValue;
    verbEl.dataset.prevValue = inputValue;
    if (typeof getSearchParts === "function" && typeof rememberNonSearchValue === "function") {
        rememberNonSearchValue(getSearchParts(inputValue));
    }
    if (typeof parseVerbInput === "function" && typeof getSearchInputBase === "function") {
        verbEl.dataset.lastClassVerb = parseVerbInput(getSearchInputBase(inputValue)).verb;
    }
    if (typeof renderVerbMirror === "function") {
        renderVerbMirror();
    }
    if (
        typeof syncComposerStateFromVerbInput === "function"
        && typeof renderVerbComposerFromState === "function"
        && (typeof VerbComposerState === "undefined" || !VerbComposerState.isApplying)
    ) {
        syncComposerStateFromVerbInput(inputValue);
        renderVerbComposerFromState();
    }
}

function activateNawatRouteStation(routeKey = "", stationKey = "", {
    render = false,
    anchorElement = null,
    sourceVerb = "",
    sourceObjectPrefix = null,
    sourceStem = null,
    sourceTenseValue = null,
    sourceCombinedMode = null,
} = {}) {
    const currentRoute = getActiveNawatRouteProfile();
    const profile = getNawatRouteProfile(routeKey || currentRoute?.id || "");
    if (!profile) {
        return null;
    }
    const sourceContext = resolveNawatRouteSourceContext(profile, {
        sourceVerb,
        sourceObjectPrefix,
        sourceStem,
        sourceTenseValue,
        sourceCombinedMode,
    });
    const routeTarget = resolveNawatRouteTarget(profile, sourceContext);
    if (!routeTarget) {
        return null;
    }
    const station = getNawatRouteStationModel(profile, stationKey || "finite-tense", {
        ...sourceContext,
        routeTarget,
    });
    if (!station?.mode || !station?.tenseValue) {
        return null;
    }
    setActiveTenseMode(station.mode, {
        modeSystem: TENSE_MODE_SYSTEM.nawat || "nawat",
    });
    if (station.combinedMode && typeof setCombinedMode === "function") {
        setCombinedMode(station.combinedMode);
    } else {
        if (station.derivationMode && typeof setActiveDerivationMode === "function") {
            setActiveDerivationMode(station.derivationMode);
        }
        if (station.voiceMode && typeof setActiveVoiceMode === "function") {
            setActiveVoiceMode(station.voiceMode);
        }
    }
    if (station.sourceScope && typeof setVerbSourceScope === "function") {
        setVerbSourceScope(station.sourceScope, { syncCombinedMode: false });
    }
    if (station.patientivoSource) {
        const routeStore = getNawatRouteStateStore();
        const patientivoNominalSuffix = resolveNawatRoutePatientivoNominalSuffix(profile, {
            sourceTenseValue: sourceContext.sourceTenseValue,
            sourceCombinedMode: sourceContext.sourceCombinedMode,
        });
        routeStore.activePatientivoBranch = station.patientivoSource;
        routeStore.activePatientivoNominalSuffix = patientivoNominalSuffix;
        if (
            typeof setToggleStateValue === "function"
            && typeof getPatientivoNominalSuffixKey === "function"
            && typeof SUSTANTIVO_VERBAL_PREFIXES !== "undefined"
            && typeof PatientivoNominalSuffixState !== "undefined"
            && PatientivoNominalSuffixState
        ) {
            setToggleStateValue(
                PatientivoNominalSuffixState,
                getPatientivoNominalSuffixKey(Array.from(SUSTANTIVO_VERBAL_PREFIXES).join("|")),
                patientivoNominalSuffix,
                { syncLock: true }
            );
        }
    }
    mutateConjugationSelectionState({
        tenseMode: station.mode,
        group: CONJUGATION_GROUPS.tense,
        tenseValue: station.tenseValue,
        classFilter: null,
    }, {
        tenseMode: station.mode,
    });
    const stationRouteTarget = {
        ...routeTarget,
        activeRouteTravelSource: "chip",
        activePatientivoBranch: station.patientivoSource || profile.patientivoSource || "",
        activePatientivoNominalSuffix: station.patientivoSource
            ? resolveNawatRoutePatientivoNominalSuffix(profile, {
                sourceTenseValue: sourceContext.sourceTenseValue,
                sourceCombinedMode: sourceContext.sourceCombinedMode,
            })
            : "",
        activeStationKey: station.key,
        activeStationInput: station.inputValue || "",
        activeStationVerb: station.renderVerb || "",
        activeStationMode: station.mode || "",
        activeStationTenseValue: station.tenseValue || "",
        activeStationObjectPrefix: station.objectPrefix || "",
    };
    const activatedProfile = setActiveNawatRouteProfile(profile.id || routeKey, stationRouteTarget);
    if (!render) {
        return activatedProfile;
    }
    const rerender = () => {
        applyNawatRouteStationInput(station);
        updateTenseModeTabs();
        renderTenseTabs();
        renderActiveConjugations({
            verb: station.renderVerb || station.inputValue || routeTarget.targetVerb || routeTarget.sourceVerb,
            objectPrefix: station.objectPrefix || "",
            tense: station.tenseValue,
        });
    };
    if (anchorElement) {
        preserveViewportAnchorPosition(anchorElement, rerender);
    } else {
        rerender();
    }
    return activatedProfile;
}

function activateNawatRouteProfile(routeKey = "", options = {}) {
    return activateNawatRouteStation(routeKey, "finite-tense", options);
}

function activateNawatRouteOrigin(routeKey = "", options = {}) {
    return activateNawatRouteStation(routeKey, "source-mode", options);
}

function updateNawatRoutePanel() {
    // Compatibility no-op: Nawat routes now render in the main breadcrumb rail.
}

function resolveActiveAdjectiveClassPolicy({
    tenseValue = "",
    sourceTense = "",
    isAdjectiveMode = false,
    hasSlashMarker = false,
    hasBoundMarker = false,
    inputMatrix = "",
    candidateMatrix = "",
} = {}) {
    const defaultPolicy = {
        classFilter: null,
        forceClassBSelection: false,
        preferredFinalYaSurfaceMode: "",
    };
    if (!isAdjectiveMode) {
        return defaultPolicy;
    }
    const profileType = getActiveAdjectiveProfileType(tenseValue);
    if (!profileType) {
        return defaultPolicy;
    }
    const isTroncoNajProfile = (
        profileType === "adjetivo-tronco-naj-preterito-simple"
        || profileType === "adjetivo-tronco-naj-preterito-compuesto"
    );
    if (isTroncoNajProfile) {
        // -naj adjectives use a dedicated precomputed wrapper path and must not
        // inherit matrix-/ya adjective forcing from direct active adjectives.
        return defaultPolicy;
    }
    const normalizedInputMatrix = normalizeRuleBase(inputMatrix);
    const normalizedCandidateMatrix = normalizeRuleBase(candidateMatrix);
    const isSlashYaInput = (
        hasSlashMarker
        && hasBoundMarker
        && normalizedInputMatrix === "ya"
    );
    if (isSlashYaInput) {
        const preferredFinalYaSurfaceMode = sourceTense === "preterito"
            ? "deleted-pret"
            : "";
        return {
            classFilter: sourceTense === "perfecto" ? "A" : "B",
            forceClassBSelection: sourceTense === "perfecto" ? false : true,
            preferredFinalYaSurfaceMode,
        };
    }
    if (normalizedCandidateMatrix.endsWith("tiya")) {
        const preferredFinalYaSurfaceMode = sourceTense === "perfecto"
            ? "deleted-perfect"
            : "deleted-pret";
        return {
            classFilter: "B",
            forceClassBSelection: true,
            preferredFinalYaSurfaceMode,
        };
    }
    if (normalizedCandidateMatrix.endsWith("ya")) {
        const preferredFinalYaSurfaceMode = sourceTense === "preterito"
            ? "deleted-pret"
            : "";
        return {
            classFilter: sourceTense === "perfecto" ? "A" : "B",
            forceClassBSelection: sourceTense === "perfecto" ? false : true,
            preferredFinalYaSurfaceMode,
        };
    }
    return defaultPolicy;
}

function selectPreferredActiveAdjectiveForms(forms = [], {
    sourceVerb = "",
    sourceTense = "",
    selectionMode = "",
    isYawi = false,
    isWeya = false,
} = {}) {
    const list = Array.isArray(forms)
        ? forms.map((entry) => String(entry || "").trim()).filter(Boolean)
        : [];
    if (!selectionMode || !list.length) {
        return list;
    }
    const normalizedSource = normalizeRuleBase(sourceVerb);
    const deletedFinalYaBase = normalizedSource.endsWith("ya")
        ? (
            resolveFinalYaImmediateHostBase(normalizedSource, {
                isTransitive: false,
                isYawi,
                isWeya,
                requirePronounceable: false,
            })
            || normalizedSource.slice(0, -2)
        )
        : "";
    let preferredTargets = [];
    if (selectionMode === "deleted-pret" && deletedFinalYaBase) {
        preferredTargets = [`${deletedFinalYaBase}k`];
    } else if (selectionMode === "deleted-perfect" && deletedFinalYaBase) {
        preferredTargets = [deletedFinalYaBase];
    }
    let filtered = preferredTargets.length
        ? list.filter((formValue) => preferredTargets.includes(normalizeRuleBase(formValue)))
        : [];
    if (!filtered.length && selectionMode === "deleted-pret") {
        filtered = list.filter((formValue) => {
            const normalized = normalizeRuleBase(formValue);
            return normalized.endsWith("k") && !normalized.endsWith("yak");
        });
    }
    if (!filtered.length && selectionMode === "deleted-perfect" && deletedFinalYaBase) {
        filtered = list.filter((formValue) => {
            const normalized = normalizeRuleBase(formValue);
            return normalized.startsWith(deletedFinalYaBase)
                && !normalized.startsWith(normalizedSource);
        });
    }
    if (!filtered.length) {
        return list;
    }
    return filtered;
}


// === Mode State Accessors ===
function getActiveConjugationGroup() {
    return ConjugationGroupState.activeGroup;
}

function setActiveConjugationGroup(group) {
    if (group !== CONJUGATION_GROUPS.tense && group !== CONJUGATION_GROUPS.universal) {
        return;
    }
    if (ConjugationGroupState.activeGroup !== group) {
        const tenseValue = group === CONJUGATION_GROUPS.universal
            ? getSelectedPretUniversalTab()
            : getSelectedTenseTab();
        resetToggleStateForTense(tenseValue);
    }
    ConjugationGroupState.activeGroup = group;
}

function getActiveTenseMode() {
    return TenseModeState.mode;
}

function getModeSystemValue(system = "") {
    const normalized = String(system || "").trim();
    if (!normalized) {
        return "";
    }
    return TENSE_MODE_SYSTEM[normalized] || normalized;
}

function getNawatTenseModeValue(mode = "") {
    const normalized = String(mode || "").trim();
    if (!normalized) {
        return "";
    }
    if (Object.values(NAWAT_TENSE_MODE || {}).includes(normalized)) {
        return normalized;
    }
    if (normalized === TENSE_MODE.verbo || normalized === "verbo") {
        return NAWAT_TENSE_MODE.verbo || TENSE_MODE.verbo;
    }
    if (normalized === TENSE_MODE.sustantivo || normalized === "sustantivo") {
        return NAWAT_TENSE_MODE.sustantivo || TENSE_MODE.sustantivo;
    }
    if (normalized === "particula") {
        return NAWAT_TENSE_MODE.particula || "particula";
    }
    return "";
}

function getNawatOutputTenseMode(mode = "") {
    const nawatMode = getNawatTenseModeValue(mode);
    if (nawatMode === (NAWAT_TENSE_MODE.sustantivo || TENSE_MODE.sustantivo)) {
        return TENSE_MODE.sustantivo;
    }
    if (nawatMode === (NAWAT_TENSE_MODE.verbo || TENSE_MODE.verbo)) {
        return TENSE_MODE.verbo;
    }
    return "";
}

function setStoredEuropeanTenseMode(mode = "") {
    if (!Object.values(TENSE_MODE).includes(mode)) {
        return "";
    }
    if (typeof EuropeanTenseModeState !== "undefined" && EuropeanTenseModeState) {
        EuropeanTenseModeState.mode = mode;
    }
    return mode;
}

function setStoredNawatTenseMode(mode = "") {
    const nawatMode = getNawatTenseModeValue(mode);
    if (!nawatMode) {
        return "";
    }
    if (typeof NawatTenseModeState !== "undefined" && NawatTenseModeState) {
        NawatTenseModeState.mode = nawatMode;
    }
    return nawatMode;
}

function getActiveEuropeanTenseMode() {
    return (typeof EuropeanTenseModeState !== "undefined" && EuropeanTenseModeState?.mode)
        ? EuropeanTenseModeState.mode
        : getActiveTenseMode();
}

function getActiveNawatTenseMode() {
    return (typeof NawatTenseModeState !== "undefined" && NawatTenseModeState?.mode)
        ? NawatTenseModeState.mode
        : (NAWAT_TENSE_MODE.verbo || TENSE_MODE.verbo || "");
}

function setActiveTenseMode(mode, {
    modeSystem = TENSE_MODE_SYSTEM.european || "european",
    syncConventionState = true,
    clearRoute = true,
} = {}) {
    if (!Object.values(TENSE_MODE).includes(mode)) {
        return;
    }
    if (TenseModeState.mode !== mode) {
        if (!isToggleLockEnabled()) {
            clearAllToggleStateMaps({ resetNonactiveSuffix: false });
        }
    }
    TenseModeState.mode = mode;
    if (syncConventionState) {
        const system = getModeSystemValue(modeSystem);
        if (system === (TENSE_MODE_SYSTEM.nawat || "nawat")) {
            setStoredNawatTenseMode(mode);
        } else {
            setStoredEuropeanTenseMode(mode);
        }
    }
    if (clearRoute && mode !== TENSE_MODE.adjetivo) {
        clearActiveNawatRouteProfile();
    }
    if (isNominalTenseMode(mode)) {
        applyResolvedConjugationSelectionState(resolveConjugationSelectionState({
            tenseMode: mode,
            group: CONJUGATION_GROUPS.tense,
            classFilter: null,
        }, {
            tenseMode: mode,
            availabilityEntries: [],
        }));
    }
}

function setActiveEuropeanTenseMode(mode, {
    syncOutput = true,
} = {}) {
    const storedMode = setStoredEuropeanTenseMode(mode);
    if (!storedMode) {
        return;
    }
    if (syncOutput) {
        setActiveTenseMode(storedMode, {
            modeSystem: TENSE_MODE_SYSTEM.european || "european",
        });
    }
}

function setActiveNawatTenseMode(mode, {
    syncOutput = true,
} = {}) {
    const storedMode = setStoredNawatTenseMode(mode);
    if (!storedMode) {
        return;
    }
    const outputMode = getNawatOutputTenseMode(storedMode);
    if (syncOutput && outputMode) {
        setActiveTenseMode(outputMode, {
            modeSystem: TENSE_MODE_SYSTEM.nawat || "nawat",
        });
    }
}

function normalizeOrdinaryNncGenerationStateValue(value = "") {
    return String(value || "").trim() === "possessive" ? "possessive" : "absolutive";
}

function normalizeOrdinaryNncGenerationNumber(value = "") {
    return String(value || "").trim() === "plural" ? "plural" : "singular";
}

function normalizeOrdinaryNncGenerationPluralType(value = "") {
    const normalized = String(value || "").trim();
    if (normalized === "count" || normalized === "distributive") {
        return normalized;
    }
    return "auto";
}

function normalizeOrdinaryNncGenerationAnimacy(value = "") {
    const normalized = String(value || "").trim();
    return normalized === "animate" ? "animate" : "inanimate";
}

function normalizeOrdinaryNncGenerationNounClass(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    if (!normalized) {
        return "";
    }
    if (normalized === "0" || normalized === "ø" || normalized === "zero") {
        return "zero";
    }
    return ["t", "ti", "in"].includes(normalized) ? normalized : "";
}

function parseOrdinaryNncGenerationAnalogueInput(value = "") {
    const raw = String(value || "").trim().toLowerCase();
    const match = raw.match(/^\(\s*([^()]+?)\s*\)\s*(ti|in|t|0|ø|zero)?$/i);
    if (!match) {
        return null;
    }
    const stem = String(match[1] || "").trim().toLowerCase().replace(/[()]/g, "");
    if (!stem) {
        return null;
    }
    const nounClass = normalizeOrdinaryNncGenerationNounClass(match[2] || "zero") || "zero";
    return {
        stem,
        nounClass,
        connector: nounClass === "zero" ? "" : nounClass,
        predicateFormula: formatOrdinaryNncGenerationAnalogueInput({ stem, nounClass }),
    };
}

function formatOrdinaryNncGenerationAnalogueInput({
    stem = "",
    nounClass = "",
} = {}) {
    const normalizedStem = String(stem || "").trim().toLowerCase().replace(/[()]/g, "");
    if (!normalizedStem) {
        return "";
    }
    const normalizedClass = normalizeOrdinaryNncGenerationNounClass(nounClass) || "zero";
    const connector = normalizedClass === "zero" ? "" : normalizedClass;
    return `(${normalizedStem})${connector}`;
}

function getOrdinaryNncGenerationPossessorValues() {
    if (Array.isArray(POSSESSIVE_PREFIXES) && POSSESSIVE_PREFIXES.length) {
        return POSSESSIVE_PREFIXES.map((entry) => String(entry?.value || ""));
    }
    return ["", "nu", "mu", "i", "tu", "anmu", "in"];
}

function normalizeOrdinaryNncGenerationPossessor(value = "", state = "absolutive") {
    if (normalizeOrdinaryNncGenerationStateValue(state) !== "possessive") {
        return "";
    }
    const normalized = String(value || "").trim();
    const values = getOrdinaryNncGenerationPossessorValues();
    return values.includes(normalized) ? normalized : "";
}

function getOrdinaryNncGenerationSubjectEntries() {
    return Array.isArray(SUBJECT_COMBINATIONS) && SUBJECT_COMBINATIONS.length
        ? SUBJECT_COMBINATIONS
        : [
            { id: "third-person", personSubKey: "3sg", subjectPrefix: "", subjectSuffix: "" },
            { id: "3-pl", personSubKey: "3pl", subjectPrefix: "", subjectSuffix: "t" },
        ];
}

function normalizeOrdinaryNncGenerationSubject({
    subjectPrefix = "",
    subjectSuffix = "",
    subjectKey = "",
    personSubKey = "",
} = {}) {
    const requestedKey = String(subjectKey || personSubKey || "").trim();
    const prefix = String(subjectPrefix || "");
    const suffix = String(subjectSuffix || "");
    const entries = getOrdinaryNncGenerationSubjectEntries();
    const entry = entries.find((candidate) => (
        requestedKey && (candidate.personSubKey === requestedKey || candidate.id === requestedKey)
    )) || entries.find((candidate) => (
        String(candidate.subjectPrefix || "") === prefix
        && String(candidate.subjectSuffix || "") === suffix
    )) || entries.find((candidate) => candidate.personSubKey === "3sg") || entries[0] || null;
    return {
        subjectPrefix: String(entry?.subjectPrefix || ""),
        subjectSuffix: String(entry?.subjectSuffix || ""),
        subjectKey: String(entry?.personSubKey || "3sg"),
    };
}

function getOrdinaryNncGenerationState() {
    const subject = normalizeOrdinaryNncGenerationSubject({
        subjectPrefix: OrdinaryNncGenerationState.subjectPrefix,
        subjectSuffix: OrdinaryNncGenerationState.subjectSuffix,
        subjectKey: OrdinaryNncGenerationState.subjectKey,
    });
    return {
        enabled: OrdinaryNncGenerationState.enabled === true,
        state: normalizeOrdinaryNncGenerationStateValue(OrdinaryNncGenerationState.state),
        number: normalizeOrdinaryNncGenerationNumber(OrdinaryNncGenerationState.number),
        pluralType: normalizeOrdinaryNncGenerationPluralType(OrdinaryNncGenerationState.pluralType),
        subjectPrefix: subject.subjectPrefix,
        subjectSuffix: subject.subjectSuffix,
        subjectKey: subject.subjectKey,
        possessor: normalizeOrdinaryNncGenerationPossessor(
            OrdinaryNncGenerationState.possessor,
            OrdinaryNncGenerationState.state
        ),
        nounClass: normalizeOrdinaryNncGenerationNounClass(OrdinaryNncGenerationState.nounClass),
        animacy: normalizeOrdinaryNncGenerationAnimacy(OrdinaryNncGenerationState.animacy),
    };
}

function isOrdinaryNncGenerationModeEnabled() {
    return getOrdinaryNncGenerationState().enabled;
}

function setOrdinaryNncGenerationState(options = {}) {
    const source = options && typeof options === "object" ? options : {};
    const current = getOrdinaryNncGenerationState();
    const state = Object.prototype.hasOwnProperty.call(source, "state")
        ? normalizeOrdinaryNncGenerationStateValue(source.state)
        : current.state;
    const number = Object.prototype.hasOwnProperty.call(source, "number")
        ? normalizeOrdinaryNncGenerationNumber(source.number)
        : current.number;
    const pluralType = Object.prototype.hasOwnProperty.call(source, "pluralType")
        ? normalizeOrdinaryNncGenerationPluralType(source.pluralType)
        : current.pluralType;
    const subject = normalizeOrdinaryNncGenerationSubject({
        subjectPrefix: Object.prototype.hasOwnProperty.call(source, "subjectPrefix")
            ? source.subjectPrefix
            : current.subjectPrefix,
        subjectSuffix: Object.prototype.hasOwnProperty.call(source, "subjectSuffix")
            ? source.subjectSuffix
            : current.subjectSuffix,
        subjectKey: Object.prototype.hasOwnProperty.call(source, "subjectKey")
            ? source.subjectKey
            : (Object.prototype.hasOwnProperty.call(source, "personSubKey") ? source.personSubKey : current.subjectKey),
    });
    const possessor = Object.prototype.hasOwnProperty.call(source, "possessor")
        ? normalizeOrdinaryNncGenerationPossessor(source.possessor, state)
        : normalizeOrdinaryNncGenerationPossessor(current.possessor, state);
    OrdinaryNncGenerationState.state = state;
    OrdinaryNncGenerationState.number = number;
    OrdinaryNncGenerationState.pluralType = pluralType;
    OrdinaryNncGenerationState.subjectPrefix = subject.subjectPrefix;
    OrdinaryNncGenerationState.subjectSuffix = subject.subjectSuffix;
    OrdinaryNncGenerationState.subjectKey = subject.subjectKey;
    OrdinaryNncGenerationState.possessor = possessor;
    if (Object.prototype.hasOwnProperty.call(source, "nounClass")) {
        OrdinaryNncGenerationState.nounClass = normalizeOrdinaryNncGenerationNounClass(source.nounClass);
    }
    if (Object.prototype.hasOwnProperty.call(source, "animacy")) {
        OrdinaryNncGenerationState.animacy = normalizeOrdinaryNncGenerationAnimacy(source.animacy);
    }
    return getOrdinaryNncGenerationState();
}

function setOrdinaryNncGenerationModeEnabled(enabled = false, options = {}) {
    OrdinaryNncGenerationState.enabled = enabled === true;
    if (options && typeof options === "object") {
        setOrdinaryNncGenerationState(options);
    }
    return isOrdinaryNncGenerationModeEnabled();
}

function buildOrdinaryNncGenerateWordRequest({
    stem = "",
    explicit = isOrdinaryNncGenerationModeEnabled(),
    state = null,
    number = null,
    pluralType = null,
    possessor = null,
    nounClass = null,
    animacy = null,
    subjectPrefix = null,
    subjectSuffix = null,
    subjectKey = null,
    silent = true,
    skipValidation = true,
} = {}) {
    const uiState = getOrdinaryNncGenerationState();
    const analogueInput = parseOrdinaryNncGenerationAnalogueInput(stem);
    const resolvedState = normalizeOrdinaryNncGenerationStateValue(state ?? uiState.state);
    const resolvedNumber = normalizeOrdinaryNncGenerationNumber(number ?? uiState.number);
    const resolvedPluralType = normalizeOrdinaryNncGenerationPluralType(pluralType ?? uiState.pluralType);
    const resolvedAnimacy = normalizeOrdinaryNncGenerationAnimacy(animacy ?? uiState.animacy);
    const nounClassSource = nounClass === null || nounClass === undefined
        ? (analogueInput?.nounClass ?? uiState.nounClass)
        : nounClass;
    const resolvedNounClass = normalizeOrdinaryNncGenerationNounClass(nounClassSource);
    const resolvedPossessor = normalizeOrdinaryNncGenerationPossessor(
        possessor ?? uiState.possessor,
        resolvedState
    );
    const resolvedSubject = explicit
        ? normalizeOrdinaryNncGenerationSubject({
            subjectPrefix: subjectPrefix ?? uiState.subjectPrefix,
            subjectSuffix: subjectSuffix ?? uiState.subjectSuffix,
            subjectKey: subjectKey ?? uiState.subjectKey,
        })
        : normalizeOrdinaryNncGenerationSubject({
            subjectPrefix: subjectPrefix ?? "",
            subjectSuffix: subjectSuffix ?? "",
        });
    const normalizedStem = analogueInput?.stem || String(stem || "").trim();
    const override = {
        subjectPrefix: resolvedSubject.subjectPrefix,
        subjectSuffix: resolvedSubject.subjectSuffix,
        objectPrefix: "",
        verb: normalizedStem,
        tense: explicit ? "ordinary-nnc" : (
            getCurrentResolvedConjugationSelectionState({ tenseMode: getActiveTenseMode() }).tenseValue || ""
        ),
        tenseMode: explicit ? TENSE_MODE.sustantivo : getActiveTenseMode(),
        derivationMode: DERIVATION_MODE.active,
        voiceMode: VOICE_MODE.active,
        possessivePrefix: explicit ? resolvedPossessor : "",
    };
    if (explicit) {
        override.ordinaryNnc = {
            enabled: true,
            stem: normalizedStem,
            state: resolvedState,
            number: resolvedNumber,
            pluralType: resolvedPluralType,
            subjectPrefix: resolvedSubject.subjectPrefix,
            subjectSuffix: resolvedSubject.subjectSuffix,
            subjectKey: resolvedSubject.subjectKey,
            possessor: resolvedPossessor,
            nounClass: resolvedNounClass,
            animacy: resolvedAnimacy,
        };
    }
    return {
        options: {
            silent,
            skipValidation,
            override,
        },
        prefixInputs: {
            subjectPrefix: override.subjectPrefix,
            objectPrefix: "",
            verb: normalizedStem,
            subjectSuffix: override.subjectSuffix,
            possessivePrefix: override.possessivePrefix,
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    };
}

function getActiveVoiceMode() {
    return VoiceModeState.mode;
}

function setActiveVoiceMode(mode) {
    if (!Object.values(VOICE_MODE).includes(mode)) {
        return;
    }
    VoiceModeState.mode = mode;
}

function getActiveDerivationMode() {
    return DerivationModeState.mode;
}

function setActiveDerivationMode(mode) {
    if (!Object.values(DERIVATION_MODE).includes(mode)) {
        return;
    }
    DerivationModeState.mode = mode;
}

function getActiveDerivationType() {
    return DerivationTypeState.type;
}

function setActiveDerivationType(type) {
    if (!Object.values(DERIVATION_TYPE).includes(type)) {
        return;
    }
    DerivationTypeState.type = type;
}

function getActiveCausativeSubtype() {
    return CausativeSubtypeState.subtype || CAUSATIVE_SUBTYPE.all;
}

function setActiveCausativeSubtype(subtype) {
    CausativeSubtypeState.subtype = Object.values(CAUSATIVE_SUBTYPE).includes(subtype)
        ? subtype
        : CAUSATIVE_SUBTYPE.all;
}

function getDerivationValencyDelta(type) {
    if (type === DERIVATION_TYPE.causative || type === DERIVATION_TYPE.applicative) {
        return 1;
    }
    return 0;
}

function getEffectiveDerivationValencyDelta(verbMeta) {
    if (!verbMeta) {
        return 0;
    }
    if (Number.isFinite(verbMeta.derivationValencyDelta)) {
        return verbMeta.derivationValencyDelta;
    }
    const type = verbMeta.derivationType || "";
    return getDerivationValencyDelta(type);
}

function getSelectedNonactiveSuffix() {
    return NonactiveSuffixState.selected;
}

function setSelectedNonactiveSuffix(value) {
    if (value === null) {
        NonactiveSuffixState.selected = null;
        return;
    }
    if (!NONACTIVE_SUFFIX_ORDER.includes(value)) {
        return;
    }
    NonactiveSuffixState.selected = value;
}

function normalizeVerbSourceScope(scope) {
    if (scope === VERB_SOURCE_SCOPE.active) {
        return VERB_SOURCE_SCOPE.active;
    }
    if (scope === VERB_SOURCE_SCOPE.nonactive) {
        return VERB_SOURCE_SCOPE.nonactive;
    }
    if (scope === VERB_SOURCE_SCOPE.both) {
        return VERB_SOURCE_SCOPE.both;
    }
    return "";
}

function getToggleLockSourceScopeValue() {
    return normalizeVerbSourceScope(ToggleLockValueState?.sourceScope || "");
}

function setToggleLockSourceScopeValue(scope) {
    const resolved = normalizeVerbSourceScope(scope) || VERB_SOURCE_SCOPE.both;
    ToggleLockValueState.sourceScope = resolved;
    return resolved;
}

function getVerbSourceScope() {
    const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
    if (lockedScope) {
        return lockedScope;
    }
    return normalizeVerbSourceScope(VerbSourceScopeState.scope) || VERB_SOURCE_SCOPE.both;
}

function setVerbSourceScope(scope, {
    syncCombinedMode = true,
    syncLock = syncCombinedMode,
    respectLock = !syncCombinedMode,
} = {}) {
    const resolved = normalizeVerbSourceScope(scope) || VERB_SOURCE_SCOPE.both;
    const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
    const nextScope = lockedScope && respectLock ? lockedScope : resolved;
    VerbSourceScopeState.scope = nextScope;
    if (isToggleLockEnabled() && syncLock) {
        setToggleLockSourceScopeValue(nextScope);
    }
    if (!syncCombinedMode) {
        return;
    }
    if (nextScope === VERB_SOURCE_SCOPE.active) {
        setCombinedMode(COMBINED_MODE.active);
    } else if (nextScope === VERB_SOURCE_SCOPE.nonactive) {
        setCombinedMode(COMBINED_MODE.nonactive);
    }
}

function getCombinedMode() {
    if (getActiveDerivationMode() === DERIVATION_MODE.nonactive || getActiveVoiceMode() === VOICE_MODE.passive) {
        return COMBINED_MODE.nonactive;
    }
    return COMBINED_MODE.active;
}

function setCombinedMode(mode) {
    if (!Object.values(COMBINED_MODE).includes(mode)) {
        return;
    }
    if (getCombinedMode() !== mode) {
        const selectionState = getCurrentResolvedConjugationSelectionState();
        const tenseValue = selectionState.group === CONJUGATION_GROUPS.universal
            ? selectionState.universalTenseValue
            : selectionState.tenseValue;
        resetToggleStateForTense(tenseValue);
    }
    if (mode === COMBINED_MODE.nonactive) {
        setActiveDerivationMode(DERIVATION_MODE.nonactive);
        setActiveVoiceMode(VOICE_MODE.passive);
        const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
        if (lockedScope) {
            VerbSourceScopeState.scope = lockedScope;
        } else if (getVerbSourceScope() !== VERB_SOURCE_SCOPE.both) {
            VerbSourceScopeState.scope = VERB_SOURCE_SCOPE.nonactive;
        }
    } else {
        setActiveDerivationMode(DERIVATION_MODE.active);
        setActiveVoiceMode(VOICE_MODE.active);
        const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
        if (lockedScope) {
            VerbSourceScopeState.scope = lockedScope;
        } else if (getVerbSourceScope() !== VERB_SOURCE_SCOPE.both) {
            VerbSourceScopeState.scope = VERB_SOURCE_SCOPE.active;
        }
    }
}

function getTenseOrderForMode(mode) {
    if (mode === TENSE_MODE.sustantivo) {
        return [
            "sustantivo-verbal",
            "agentivo",
            "patientivo",
            "instrumentivo",
            "calificativo-instrumentivo",
            "locativo-temporal",
        ];
    }
    if (mode === TENSE_MODE.adjetivo) {
        return ADJECTIVE_TAB_TENSE_ORDER;
    }
    if (mode === TENSE_MODE.adverbio) {
        return ["pasado-remoto-adverbio-activo"];
    }
    return TENSE_ORDER.filter((tense) => (
        tense !== "sustantivo-verbal"
        && tense !== "potencial"
        && tense !== "potencial-habitual"
        && !ACTIVE_ADJECTIVE_TENSE_SET.has(tense)
        && !PATIENTIVO_ADJECTIVE_TENSE_SET.has(tense)
        && tense !== "pasado-remoto-adverbio-activo"
        && tense !== "agentivo"
        && tense !== "patientivo"
        && tense !== "instrumentivo"
        && tense !== "calificativo-instrumentivo"
        && tense !== "locativo-temporal"
    ));
}

function isNounPossessionSplitTense(tenseValue) {
    return tenseValue === "instrumentivo";
}

function isNounTenseVisibleForCombinedMode(tenseValue, combinedMode = getCombinedMode()) {
    if (!tenseValue) {
        return false;
    }
    if (isPatientivoAdjectiveTense(tenseValue) || isPotencialProfileTense(tenseValue)) {
        return combinedMode === getResolvedNominalCombinedModeForTense(tenseValue, combinedMode);
    }
    if (isNounPossessionSplitTense(tenseValue)) {
        return true;
    }
    if (combinedMode !== COMBINED_MODE.nonactive) {
        return true;
    }
    return tenseValue === "patientivo"
        || tenseValue === "locativo-temporal";
}

function getNounTenseOrderForCombinedMode(
    combinedMode = getCombinedMode(),
    mode = getActiveTenseMode(),
) {
    const resolvedMode = isNominalTenseMode(mode) ? mode : TENSE_MODE.sustantivo;
    return getTenseOrderForMode(resolvedMode).filter((tenseValue) =>
        isNounTenseVisibleForCombinedMode(tenseValue, combinedMode)
    );
}

function isThreeColumnPanelLayout() {
    return typeof window !== "undefined"
        && typeof window.matchMedia === "function"
        && window.matchMedia("(min-width: 1025px)").matches;
}

function captureViewportAnchor(element) {
    if (!element || typeof element.getBoundingClientRect !== "function") {
        return null;
    }
    const rect = element.getBoundingClientRect();
    const anchor = {
        top: rect.top,
        left: rect.left,
        node: element,
        selector: "",
    };
    if (element.matches?.("[data-tense-value]")) {
        const selectorParts = [
            `[data-tense-value="${escapeAttributeSelectorValue(element.getAttribute("data-tense-value") || "")}"]`,
        ];
        const tenseGroup = element.getAttribute("data-tense-group") || "";
        const tenseColumn = element.getAttribute("data-tense-column") || "";
        if (tenseGroup) {
            selectorParts.push(`[data-tense-group="${escapeAttributeSelectorValue(tenseGroup)}"]`);
        }
        if (tenseColumn) {
            selectorParts.push(`[data-tense-column="${escapeAttributeSelectorValue(tenseColumn)}"]`);
        }
        anchor.selector = selectorParts.join("");
        return anchor;
    }
    if (element.matches?.("[data-nonactive-suffix]")) {
        anchor.selector = `[data-nonactive-suffix="${escapeAttributeSelectorValue(element.getAttribute("data-nonactive-suffix") || "")}"]`;
        return anchor;
    }
    if (element.matches?.("[data-tense-mode]")) {
        anchor.selector = `[data-tense-mode="${escapeAttributeSelectorValue(element.getAttribute("data-tense-mode") || "")}"]`;
        return anchor;
    }
    if (element.matches?.("[data-combined-mode]")) {
        anchor.selector = `[data-combined-mode="${escapeAttributeSelectorValue(element.getAttribute("data-combined-mode") || "")}"]`;
        return anchor;
    }
    if (element.matches?.("[data-derivation-type]")) {
        anchor.selector = `[data-derivation-type="${escapeAttributeSelectorValue(element.getAttribute("data-derivation-type") || "")}"]`;
        return anchor;
    }
    if (element.id) {
        anchor.selector = `#${escapeAttributeSelectorValue(element.id)}`;
        return anchor;
    }
    return anchor;
}

function resolveViewportAnchor(anchor) {
    if (!anchor) {
        return null;
    }
    if (anchor.node?.isConnected) {
        return anchor.node;
    }
    if (anchor.selector) {
        return document.querySelector(anchor.selector);
    }
    return null;
}

var VIEWPORT_ANCHOR_RESERVATION_SEQUENCE = 0;

function captureStickyDesktopPaneAnchor(anchorSource) {
    if (!isThreeColumnPanelLayout()) {
        return null;
    }
    if (
        !anchorSource
        || typeof anchorSource.closest !== "function"
        || !anchorSource.closest("#panel-stack-pane-tense")
    ) {
        return null;
    }
    const pane = document.getElementById("panel-stack-pane-tense");
    return captureViewportAnchor(pane);
}

function captureViewportAnchorDelta(anchor) {
    const target = resolveViewportAnchor(anchor);
    if (!target || typeof target.getBoundingClientRect !== "function") {
        return null;
    }
    const afterRect = target.getBoundingClientRect();
    return {
        target,
        deltaX: afterRect.left - anchor.left,
        deltaY: afterRect.top - anchor.top,
    };
}

function captureOutputHeightReservation(anchorSource) {
    if (
        !isThreeColumnPanelLayout()
        || !anchorSource
        || typeof anchorSource.closest !== "function"
        || !anchorSource.closest("#panel-stack-pane-tense")
    ) {
        return null;
    }
    const output = document.getElementById("all-tense-conjugations");
    if (!output) {
        return null;
    }
    const rect = output.getBoundingClientRect();
    const reservedHeight = Math.ceil(
        Math.max(
            rect.height || 0,
            output.offsetHeight || 0,
            output.scrollHeight || 0
        )
    );
    if (!(reservedHeight > 0)) {
        return null;
    }
    return {
        element: output,
        previousMinHeight: output.style.minHeight || "",
        token: `anchor-${++VIEWPORT_ANCHOR_RESERVATION_SEQUENCE}`,
        reservedHeight,
    };
}

function applyOutputHeightReservation(reservation) {
    if (!reservation?.element) {
        return;
    }
    const element = reservation.element;
    element.dataset.viewportAnchorReservation = reservation.token;
    const currentInlineMinHeight = parseFloat(element.style.minHeight || "") || 0;
    const nextMinHeight = Math.max(currentInlineMinHeight, reservation.reservedHeight);
    element.style.minHeight = `${Math.ceil(nextMinHeight)}px`;
}

function releaseOutputHeightReservation(reservation, { delayMs = 320 } = {}) {
    if (!reservation?.element) {
        return;
    }
    const element = reservation.element;
    const restore = () => {
        if (element.dataset.viewportAnchorReservation !== reservation.token) {
            return;
        }
        delete element.dataset.viewportAnchorReservation;
        element.style.minHeight = reservation.previousMinHeight;
    };
    if (typeof window !== "undefined" && typeof window.setTimeout === "function") {
        window.setTimeout(restore, Math.max(0, delayMs));
        return;
    }
    restore();
}

function preserveViewportAnchorPosition(anchorSource, callback) {
    if (typeof callback !== "function") {
        return;
    }
    if (
        typeof window === "undefined"
        || typeof window.scrollBy !== "function"
    ) {
        callback();
        return;
    }
    const isTensePaneAction = isThreeColumnPanelLayout()
        && anchorSource
        && typeof anchorSource.closest === "function"
        && anchorSource.closest("#panel-stack-pane-tense");
    if (isTensePaneAction) {
        callback();
        return;
    }
    const primaryAnchor = captureViewportAnchor(anchorSource);
    if (!primaryAnchor) {
        callback();
        return;
    }
    const paneAnchor = null; // sticky pane position is unreliable as a scrollBy anchor (getBoundingClientRect mixes natural-flow and sticky-clamped positions)
    const outputReservation = captureOutputHeightReservation(anchorSource);
    applyOutputHeightReservation(outputReservation);
    try {
        callback();
    } catch (error) {
        releaseOutputHeightReservation(outputReservation, { delayMs: 0 });
        throw error;
    }
    const scheduleFrame = typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : ((fn) => window.setTimeout(fn, 16));
    let frameCount = 0;
    let stableFrames = 0;
    const maxFrames = paneAnchor ? 8 : 6;
    const settle = () => {
        frameCount += 1;
        const primaryDelta = captureViewportAnchorDelta(primaryAnchor);
        const paneDelta = captureViewportAnchorDelta(paneAnchor);
        const resolvedDelta = primaryDelta || paneDelta;
        let deltaX = Number(resolvedDelta?.deltaX) || 0;
        let deltaY = Number(resolvedDelta?.deltaY) || 0;
        if (
            (!primaryDelta || (Math.abs(deltaX) <= 0.5 && Math.abs(deltaY) <= 0.5))
            && paneDelta
            && (
                Math.abs(Number(paneDelta.deltaX) || 0) > 0.5
                || Math.abs(Number(paneDelta.deltaY) || 0) > 0.5
            )
        ) {
            deltaX = Number(paneDelta.deltaX) || 0;
            deltaY = Number(paneDelta.deltaY) || 0;
        }
        const needsAdjust = Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5;
        if (needsAdjust) {
            window.scrollBy(deltaX, deltaY);
            stableFrames = 0;
        } else {
            stableFrames += 1;
        }
        if (frameCount < maxFrames && stableFrames < 2) {
            scheduleFrame(settle);
            return;
        }
        releaseOutputHeightReservation(outputReservation);
    };
    scheduleFrame(settle);
}

var PANEL_STACK_ORDER = ["inputs", "tense", "output"];
var PANEL_STACK_REVEAL_CLASS = "is-pane-entering";
var PANEL_STACK_REVEAL_DURATION_MS = 180;

function normalizePanelStackMode(mode) {
    if (mode === "tense") {
        return "tense";
    }
    if (mode === "output") {
        return "output";
    }
    return "inputs";
}

function getAdjacentPanelStackMode(mode, direction = 1) {
    const normalizedMode = normalizePanelStackMode(mode);
    const currentIndex = PANEL_STACK_ORDER.indexOf(normalizedMode);
    if (currentIndex === -1) {
        return PANEL_STACK_ORDER[0];
    }
    const delta = direction < 0 ? -1 : 1;
    const nextIndex = (currentIndex + delta + PANEL_STACK_ORDER.length) % PANEL_STACK_ORDER.length;
    return PANEL_STACK_ORDER[nextIndex];
}

function setLeftPanelStackMode(mode) {
    const normalizedMode = normalizePanelStackMode(mode);
    const buttons = Array.from(document.querySelectorAll("[data-panel-stack-tab]"));
    const panes = Array.from(document.querySelectorAll("[data-panel-stack-pane]"));
    const stackRoot = document.querySelector(".panel-stack");
    const previousMode = stackRoot?.getAttribute("data-active-pane") || "";
    const showAllPanes = isThreeColumnPanelLayout();
    const shouldAnimateReveal = !showAllPanes && previousMode !== normalizedMode;
    const triggerPaneReveal = (pane) => {
        if (!pane || !shouldAnimateReveal) {
            return;
        }
        if (pane.__panelStackRevealTimer) {
            clearTimeout(pane.__panelStackRevealTimer);
        }
        pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
        requestAnimationFrame(() => {
            pane.classList.add(PANEL_STACK_REVEAL_CLASS);
            pane.__panelStackRevealTimer = setTimeout(() => {
                pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
                pane.__panelStackRevealTimer = null;
            }, PANEL_STACK_REVEAL_DURATION_MS);
        });
    };
    if (stackRoot) {
        stackRoot.setAttribute("data-active-pane", normalizedMode);
    }
    buttons.forEach((button) => {
        const isActive = button.getAttribute("data-panel-stack-tab") === normalizedMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = showAllPanes ? -1 : (isActive ? 0 : -1);
    });
    panes.forEach((pane) => {
        const isActive = showAllPanes
            ? true
            : pane.getAttribute("data-panel-stack-pane") === normalizedMode;
        if (!isActive && pane.__panelStackRevealTimer) {
            clearTimeout(pane.__panelStackRevealTimer);
            pane.__panelStackRevealTimer = null;
        }
        if (!isActive) {
            pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
        }
        pane.hidden = !isActive;
        pane.classList.toggle("is-active", isActive);
        pane.setAttribute("aria-hidden", String(!isActive));
        if (isActive) {
            triggerPaneReveal(pane);
        }
    });
    dispatchAppEvent("app:panel-stack-changed", {
        mode: normalizedMode,
        showAllPanes,
    });
}

function initPanelEdgeNavigation() {
    const buttons = Array.from(
        document.querySelectorAll("[data-pane-nav-direction][data-pane-nav-from]")
    );
    if (!buttons.length) {
        return;
    }
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const directionAttr = button.getAttribute("data-pane-nav-direction");
            const direction = directionAttr === "prev" ? -1 : 1;
            const stackRoot = document.querySelector(".panel-stack");
            const activeMode = stackRoot?.getAttribute("data-active-pane");
            const fallbackMode = button.getAttribute("data-pane-nav-from");
            const originMode = activeMode || fallbackMode || "inputs";
            const targetMode = getAdjacentPanelStackMode(originMode, direction);
            setLeftPanelStackMode(targetMode);
            const targetTab = document.querySelector(`[data-panel-stack-tab="${targetMode}"]`);
            if (targetTab && typeof targetTab.focus === "function") {
                targetTab.focus({ preventScroll: true });
            }
        });
    });
}

function initLeftPanelStackTabs() {
    const buttons = Array.from(document.querySelectorAll("[data-panel-stack-tab]"));
    if (!buttons.length) {
        return;
    }
    const focusButtonAt = (index) => {
        if (index < 0 || index >= buttons.length) {
            return;
        }
        const target = buttons[index];
        if (target && typeof target.focus === "function") {
            target.focus();
        }
    };
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const mode = button.getAttribute("data-panel-stack-tab") || "inputs";
            setLeftPanelStackMode(mode);
        });
        button.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                const nextIndex = (index + 1) % buttons.length;
                focusButtonAt(nextIndex);
                const mode = buttons[nextIndex].getAttribute("data-panel-stack-tab") || "inputs";
                setLeftPanelStackMode(mode);
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                const previousIndex = (index - 1 + buttons.length) % buttons.length;
                focusButtonAt(previousIndex);
                const mode = buttons[previousIndex].getAttribute("data-panel-stack-tab") || "inputs";
                setLeftPanelStackMode(mode);
            } else if (event.key === "Home") {
                event.preventDefault();
                focusButtonAt(0);
                const mode = buttons[0].getAttribute("data-panel-stack-tab") || "inputs";
                setLeftPanelStackMode(mode);
            } else if (event.key === "End") {
                event.preventDefault();
                const lastIndex = buttons.length - 1;
                focusButtonAt(lastIndex);
                const mode = buttons[lastIndex].getAttribute("data-panel-stack-tab") || "inputs";
                setLeftPanelStackMode(mode);
            }
        });
    });
    const initialActive = buttons.find((button) => button.classList.contains("is-active"));
    const initialMode = initialActive?.getAttribute("data-panel-stack-tab") || "inputs";
    setLeftPanelStackMode(initialMode);
    const syncOnResize = () => {
        const stackRoot = document.querySelector(".panel-stack");
        const activeMode = stackRoot?.getAttribute("data-active-pane") || initialMode;
        setLeftPanelStackMode(activeMode);
    };
    window.addEventListener("resize", syncOnResize, { passive: true });
}

function updateTenseModeTabs() {
    const buttons = document.querySelectorAll("[data-tense-mode]");
    if (!buttons.length) {
        return;
    }
    const mode = getActiveTenseMode();
    const isVerbMode = mode === TENSE_MODE.verbo;
    const isNominalMode = isNominalTenseMode(mode);
    document.body.classList.toggle("is-sustantivo-mode", isNominalMode);
    document.body.classList.toggle("is-verb-mode", isVerbMode);
    document.body.classList.toggle("is-nonverb-mode", !isVerbMode);
    const operators = document.querySelector(".calc-operators");
    if (operators) {
        operators.dataset.tenseMode = mode || "";
        operators.dataset.ordinaryNncMode = isOrdinaryNncGenerationModeEnabled() ? "on" : "off";
    }
    const activeEuropeanMode = getActiveEuropeanTenseMode();
    const activeNawatMode = getActiveNawatTenseModeForCurrentSelection();
    const ordinaryNncActive = isOrdinaryNncGenerationModeEnabled();
    buttons.forEach((button) => {
        const buttonMode = button.getAttribute("data-tense-mode");
        const buttonSystem = button.getAttribute("data-mode-system") || TENSE_MODE_SYSTEM.european || "european";
        const isNawatButton = buttonSystem === (TENSE_MODE_SYSTEM.nawat || "nawat");
        const isActive = isNawatButton
            ? (buttonMode === activeNawatMode && !(ordinaryNncActive && buttonMode === TENSE_MODE.sustantivo))
            : buttonMode === activeEuropeanMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-pressed", String(isActive));
    });
    const ordinaryNncButtons = document.querySelectorAll("[data-ordinary-nnc-mode]");
    ordinaryNncButtons.forEach((button) => {
        const isActive = isOrdinaryNncGenerationModeEnabled();
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        if (button.getAttribute("role") === "tab") {
            button.setAttribute("aria-selected", String(isActive));
        } else {
            button.removeAttribute("aria-selected");
        }
    });
    updateNawatRoutePanel();
    updateVoiceOperatorVisibility();
    updateDerivationTypeControl();
    updateCombinedModeTabs();
}

function initTenseModeTabs() {
    const buttons = document.querySelectorAll("[data-tense-mode]");
    if (!buttons.length) {
        return;
    }
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const mode = button.getAttribute("data-tense-mode");
            if (!mode) {
                return;
            }
            const buttonSystem = button.getAttribute("data-mode-system") || TENSE_MODE_SYSTEM.european || "european";
            clearActiveNawatRouteProfile();
            setOrdinaryNncGenerationModeEnabled(false);
            if (buttonSystem === (TENSE_MODE_SYSTEM.nawat || "nawat")) {
                setActiveNawatTenseMode(mode);
            } else {
                setActiveEuropeanTenseMode(mode);
            }
            preserveViewportAnchorPosition(button, () => {
                renderTenseTabs();
                const verbMeta = getVerbInputMeta();
                renderActiveConjugations({
                    verb: verbMeta.displayVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                });
            });
        });
    });
    document.querySelectorAll("[data-ordinary-nnc-mode]").forEach((button) => {
        button.addEventListener("click", () => {
            clearActiveNawatRouteProfile();
            setOrdinaryNncGenerationModeEnabled(true);
            setActiveNawatTenseMode(TENSE_MODE.sustantivo);
            if (typeof syncComposerStateFromVerbInput === "function") {
                syncComposerStateFromVerbInput(document.getElementById("verb")?.value || "");
            }
            if (
                typeof setVerbInputMode === "function"
                && typeof VERB_INPUT_MODE !== "undefined"
                && typeof isVerbInputModeComposer === "function"
                && !isVerbInputModeComposer()
            ) {
                setVerbInputMode(VERB_INPUT_MODE.composer, { syncFromInput: true });
            }
            const plainComposerBoard = typeof COMPOSER_ENTRY_BOARD !== "undefined"
                ? (COMPOSER_ENTRY_BOARD.general || "general")
                : "general";
            if (
                typeof setComposerEntryBoard === "function"
                && typeof getComposerEntryBoard === "function"
                && getComposerEntryBoard() !== plainComposerBoard
            ) {
                setComposerEntryBoard(plainComposerBoard, { force: true });
            } else if (typeof renderVerbComposerFromState === "function") {
                renderVerbComposerFromState();
            }
            if (typeof applyComposerStateToVerbInput === "function") {
                applyComposerStateToVerbInput({
                    triggerGenerate: true,
                    immediateRefresh: true,
                });
            }
            preserveViewportAnchorPosition(button, () => {
                renderTenseTabs();
                const verbMeta = getVerbInputMeta();
                renderActiveConjugations({
                    verb: verbMeta.displayVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                });
            });
        });
    });
    updateTenseModeTabs();
}

function updateVoiceOperatorVisibility() {
    const voiceOperator = document.getElementById("calc-voice-operator");
    if (!voiceOperator) {
        return;
    }
    const isVerbMode = getActiveTenseMode() === TENSE_MODE.verbo;
    voiceOperator.hidden = false;
    voiceOperator.classList.remove("is-hidden");
    voiceOperator.setAttribute("aria-hidden", "false");
    voiceOperator.classList.toggle("is-disabled", !isVerbMode);
    voiceOperator.setAttribute("aria-disabled", String(!isVerbMode));
}

function updateCombinedModeTabs() {
    const isVerbMode = getActiveTenseMode() === TENSE_MODE.verbo;
    const isAdverbioMode = getActiveTenseMode() === TENSE_MODE.adverbio;
    const buttons = document.querySelectorAll("[data-combined-mode]");
    if (!buttons.length) {
        return;
    }
    const mode = getCombinedMode();
    const container = document.querySelector(".calc-operator-grid--voice");
    if (container) {
        const isNawat = getIsNawat();
        container.setAttribute("role", "tablist");
        container.setAttribute(
            "aria-label",
            getLocalizedLabel(
                { labelEs: "Voz", labelNa: "Voz" },
                isNawat,
                "Voz"
            )
        );
        container.classList.toggle("is-disabled", !isVerbMode);
        container.setAttribute("aria-disabled", String(!isVerbMode));
    }
    buttons.forEach((button) => {
        const combinedMode = button.getAttribute("data-combined-mode") || "";
        const isDisabled = !isVerbMode || (isAdverbioMode && combinedMode === COMBINED_MODE.nonactive);
        const isActive = button.getAttribute("data-combined-mode") === mode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-pressed", String(isActive));
        button.disabled = isDisabled;
        button.setAttribute("aria-disabled", String(isDisabled));
    });
}

function initCombinedModeTabs() {
    const buttons = document.querySelectorAll("[data-combined-mode]");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (getActiveTenseMode() !== TENSE_MODE.verbo) {
                return;
            }
            const mode = button.getAttribute("data-combined-mode");
            if (!mode) {
                return;
            }
            setCombinedMode(mode);
            preserveViewportAnchorPosition(button, () => {
                updateCombinedModeTabs();
                renderTenseTabs();
                const verbMeta = getVerbInputMeta();
                renderActiveConjugations({
                    verb: verbMeta.displayVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                });
            });
        });
    });
    updateCombinedModeTabs();
}

function getDerivationTypeDisplayLabel(type, isNawat = false) {
    const normalizedType = String(type || "");
    if (!normalizedType) {
        return "";
    }
    if (normalizedType === DERIVATION_TYPE.direct) {
        return isNawat ? "Tayilis" : "Directo";
    }
    if (normalizedType === DERIVATION_TYPE.causative) {
        return isNawat ? "Tetayiltilis" : "Causativo";
    }
    if (normalizedType === DERIVATION_TYPE.applicative) {
        return isNawat ? "Tetayililis" : "Aplicativo";
    }
    return normalizedType;
}

function getBlockedNounDerivationTypes(tenseValue = "") {
    const blocked = new Set();
    const verbInput = document.getElementById("verb");
    const rawInput = getSearchInputBase(verbInput?.value || "");
    const baseInput = String(rawInput || "").trim();
    if (!baseInput) {
        return blocked;
    }
    const resolvedTenseValue = tenseValue
        || getCurrentResolvedConjugationSelectionState({ tenseMode: getActiveTenseMode() }).tenseValue
        || "sustantivo-verbal";
    const combinedMode = getCombinedMode();
    const derivedTypes = [
        DERIVATION_TYPE.causative,
        DERIVATION_TYPE.applicative,
    ];
    derivedTypes.forEach((derivationType) => {
        const parsedVerb = getParsedVerbForTab("noun-derivation-switch", baseInput, {
            derivationType,
            includeNonactiveStemMetadata: false,
            useSearchBase: false,
        });
        const availability = buildDerivationAvailabilityTargets({
            derivationType,
            verb: parsedVerb.verb || "",
            analysisVerb: parsedVerb.analysisVerb || parsedVerb.verb || "",
            objectPrefix: "",
            verbMeta: parsedVerb,
            suppletiveStemSet: getSuppletiveStemSet(parsedVerb),
        });
        const hasDerivedStem = Array.isArray(availability?.availabilityTargets)
            && availability.availabilityTargets.length > 0;
        const slotPlanBundle = getNounObjectSlotPlansFromMeta(parsedVerb, resolvedTenseValue, { combinedMode });
        const derivedSlots = slotPlanBundle.slotPlans.filter((slot) => slot.isAddedSlot);
        const hasNonspecificFiller = derivedSlots.length > 0
            && derivedSlots.every((slot) =>
                slot.toggleValues.some((prefix) => SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(prefix))
            );
        const allowCollapsedDerivedSlot = allowsCollapsedDerivedNounSlot({
            tenseValue: resolvedTenseValue,
            combinedMode,
            slotPlanBundle,
            derivationType,
        });
        if (!hasDerivedStem || (!hasNonspecificFiller && !allowCollapsedDerivedSlot)) {
            blocked.add(derivationType);
        }
    });
    return blocked;
}

var DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
var DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
var DERIVATION_ANTIDERIVATIVE_STAGE = "off";
var ShowDerivationAntiderivative = false;

function getNextAntiderivativeStage(stage = "off") {
    if (stage === "off") {
        return "on";
    }
    if (stage === "on") {
        return "lock";
    }
    return "off";
}

function requestDerivationAntiderivativeLookup(renderKey, normalizedInput, lookupOptions) {
    if (!renderKey || !normalizedInput) {
        return;
    }
    if (
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY === renderKey
        || DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY === renderKey
    ) {
        return;
    }
    DERIVATION_ANTIDERIVATIVE_PENDING_KEY = renderKey;
    renderDerivationAntiderivativePanel();
    setTimeout(() => {
        findDerivationalAntiderivatives(normalizedInput, lookupOptions);
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = renderKey;
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        renderDerivationAntiderivativePanel();
    }, 0);
}

function getUniqueAntiderivativeDirectStems(result) {
    const rows = Array.isArray(result?.candidates) ? result.candidates : [];
    return Array.from(
        new Set(rows.map((entry) => String(entry?.directStem || "").trim()).filter(Boolean))
    );
}

function renderDerivationAntiderivativePanel(verbMeta = null) {
    const panel = document.getElementById("derivation-antiderivative");
    if (!panel) {
        return;
    }
    if (!ShowDerivationAntiderivative) {
        panel.classList.add("is-hidden");
        panel.innerHTML = "";
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        DERIVATION_ANTIDERIVATIVE_STAGE = "off";
        return;
    }
    const isVerbMode = getActiveTenseMode() === TENSE_MODE.verbo;
    panel.classList.toggle("is-hidden", !isVerbMode);
    panel.innerHTML = "";
    if (!isVerbMode) {
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        DERIVATION_ANTIDERIVATIVE_STAGE = "off";
        return;
    }

    const row = document.createElement("div");
    row.className = "derivation-antiderivative__row";
    panel.appendChild(row);

    const derivationType = getActiveDerivationType();
    const resolvedVerbMeta = verbMeta || getVerbInputMeta();
    const expectedValence = getActiveVerbValency(resolvedVerbMeta);

    const verbInput = document.getElementById("verb");
    const inputValue = getSearchInputBase(verbInput?.value || "");
    const normalizedInput = String(inputValue || "").trim();

    const result = document.createElement("div");
    result.className = "derivation-antiderivative__result";
    result.textContent = "—";

    const fullReverseButton = document.createElement("button");
    fullReverseButton.type = "button";
    fullReverseButton.className = "derivation-antiderivative__action";
    fullReverseButton.textContent = "antiderivada";

    row.appendChild(fullReverseButton);
    row.appendChild(result);

    if (!normalizedInput) {
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        fullReverseButton.disabled = true;
        return;
    }

    const requestedType = normalizeAntiderivativeRequestedType(derivationType);
    const targetStem = normalizeDerivationStemValue(getSearchInputBase(normalizedInput));
    const normalizedExpectedValence = normalizeAntiderivativeExpectedValence(expectedValence) || "any";
    const renderKey = `${targetStem}|${requestedType || "both"}|${normalizedExpectedValence}`;
    const isPending = DERIVATION_ANTIDERIVATIVE_PENDING_KEY === renderKey;
    const hasResult = DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY === renderKey;
    const stage = DERIVATION_ANTIDERIVATIVE_STAGE;
    fullReverseButton.classList.toggle("is-on", stage === "on");
    fullReverseButton.classList.toggle("is-lock", stage === "lock");
    fullReverseButton.setAttribute("aria-pressed", String(stage !== "off"));
    fullReverseButton.disabled = isPending;
    if (isPending) {
        fullReverseButton.textContent = "...";
    }
    const lookupOptions = requestedType
        ? {
            derivationType: requestedType,
            expectedValence,
            fullReverseSeeds: true,
        }
        : {
            expectedValence,
            fullReverseSeeds: true,
        };
    fullReverseButton.addEventListener("click", () => {
        const nextStage = getNextAntiderivativeStage(DERIVATION_ANTIDERIVATIVE_STAGE);
        DERIVATION_ANTIDERIVATIVE_STAGE = nextStage;
        if (nextStage === "off") {
            DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
            DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
            renderDerivationAntiderivativePanel();
            return;
        }
        requestDerivationAntiderivativeLookup(renderKey, normalizedInput, lookupOptions);
        renderDerivationAntiderivativePanel();
    });
    if (isPending) {
        result.textContent = "...";
        return;
    }
    if (stage === "off") {
        result.textContent = "—";
        return;
    }
    if (stage === "lock" && !hasResult) {
        requestDerivationAntiderivativeLookup(renderKey, normalizedInput, lookupOptions);
        result.textContent = "...";
        return;
    }
    if (!hasResult) {
        result.textContent = "—";
        return;
    }
    const cachedResult = getCachedDerivationalAntiderivativeResult(targetStem, requestedType, lookupOptions);
    if (!cachedResult) {
        result.textContent = "—";
        return;
    }

    const uniqueDirectStems = getUniqueAntiderivativeDirectStems(cachedResult);
    if (!uniqueDirectStems.length) {
        result.textContent = "—";
        return;
    }
    result.textContent = uniqueDirectStems.join(" / ");
}

function updateDerivationTypeControl() {
    const select = document.getElementById("derivation-type");
    const buttons = Array.from(document.querySelectorAll("[data-derivation-type]"));
    if (!select && !buttons.length) {
        return;
    }
    const isVerbMode = getActiveTenseMode() === TENSE_MODE.verbo;
    const isNounMode = isNominalTenseMode(getActiveTenseMode());
    const canUseControl = isVerbMode || isNounMode;
    const nounTenseValue = isNounMode
        ? (
            getCurrentResolvedConjugationSelectionState({ tenseMode: getActiveTenseMode() }).tenseValue
            || getNounTenseOrderForCombinedMode(getCombinedMode(), getActiveTenseMode())[0]
            || "sustantivo-verbal"
        )
        : "";
    const blockedNounTypes = isNounMode ? getBlockedNounDerivationTypes(nounTenseValue) : new Set();
    let activeType = getActiveDerivationType();
    const container = document.querySelector(".derivation-type-row")
        || document.querySelector(".calc-operator--derivation");
    if (container) {
        container.classList.toggle("is-disabled", !canUseControl);
        container.setAttribute("aria-disabled", String(!canUseControl));
    }
    if (select) {
        const options = Array.from(select.options || []);
        options.forEach((option) => {
            const isBlocked = isNounMode && blockedNounTypes.has(option.value);
            // Keep the currently active derivation selectable to avoid silent fallback to direct.
            option.disabled = isBlocked && option.value !== activeType;
        });
        select.disabled = !canUseControl;
        if (!options.some((option) => option.value === activeType)) {
            activeType = DERIVATION_TYPE.direct;
            setActiveDerivationType(activeType);
        }
        select.value = activeType;
    }
    if (buttons.length) {
        const buttonGrid = buttons[0]?.closest(".calc-operator-grid");
        if (buttonGrid) {
            buttonGrid.setAttribute("role", "tablist");
            const isNawat = getIsNawat();
            buttonGrid.setAttribute(
                "aria-label",
                getLocalizedLabel(
                    { labelEs: "Derivación activa", labelNa: "Derivación activa" },
                    isNawat,
                    "Derivación activa"
                )
            );
        }
        buttons.forEach((button) => {
            const type = button.getAttribute("data-derivation-type") || "";
            const isBlocked = isNounMode && blockedNounTypes.has(type);
            const isActive = type === activeType;
            const isDisabled = !canUseControl || (isBlocked && !isActive);
            button.classList.toggle("is-active", isActive);
            button.setAttribute("role", "tab");
            button.setAttribute("aria-selected", String(isActive));
            button.setAttribute("aria-pressed", String(isActive));
            button.disabled = isDisabled;
            button.setAttribute("aria-disabled", String(isDisabled));
        });
    }
    renderDerivationAntiderivativePanel();
    const subtypeRow = document.getElementById("causative-subtype-row");
    if (subtypeRow) {
        const isCausative = activeType === DERIVATION_TYPE.causative;
        subtypeRow.hidden = !isCausative;
        if (!isCausative) {
            setActiveCausativeSubtype(CAUSATIVE_SUBTYPE.all);
            return;
        }
        // Probe which causative subtypes are available for the current verb.
        const typeAvailable = { one: true, two: true };
        if (typeof getCausativeDerivationOptions === "function") {
            const verbMeta = getVerbInputMeta();
            const probeVerb = verbMeta.analysisVerb || verbMeta.displayVerb || "";
            if (probeVerb) {
                const ruleBase = verbMeta.canonicalRuleBase || probeVerb;
                try {
                    const probeAllowTypeTwo = typeof computeAllowTypeTwoCausativeForParsedVerb === "function"
                        ? computeAllowTypeTwoCausativeForParsedVerb(verbMeta).allowTypeTwo
                        : verbMeta.isMarkedTransitive === true;
                    const probeOpts = getCausativeDerivationOptions(ruleBase, ruleBase, {
                        isTransitive: verbMeta.isMarkedTransitive === true,
                        allowTypeTwo: probeAllowTypeTwo,
                        isYawi: verbMeta.isYawi === true,
                        ruleBase,
                        fullRuleBase: ruleBase,
                        canonicalRuleBase: ruleBase,
                        canonicalFullRuleBase: ruleBase,
                        rootPlusYaBase: verbMeta.rootPlusYaBase || "",
                        hasLeadingDash: verbMeta.hasLeadingDash === true,
                        parsedVerb: verbMeta,
                    });
                    typeAvailable.one = probeOpts.some((o) => o.type !== "type-two");
                    typeAvailable.two = probeOpts.some((o) => o.type === "type-two");
                } catch (_e) {
                    // leave both enabled if probe fails
                }
            }
        }
        // If the active subtype has no available options, reset to "all".
        let activeSubtype = getActiveCausativeSubtype();
        if (
            (activeSubtype === CAUSATIVE_SUBTYPE.one && !typeAvailable.one)
            || (activeSubtype === CAUSATIVE_SUBTYPE.two && !typeAvailable.two)
        ) {
            setActiveCausativeSubtype(CAUSATIVE_SUBTYPE.all);
            activeSubtype = CAUSATIVE_SUBTYPE.all;
        }
        Array.from(subtypeRow.querySelectorAll("[data-causative-subtype]")).forEach((btn) => {
            const sub = btn.getAttribute("data-causative-subtype");
            const isActive = sub === activeSubtype;
            const isAvailable = sub === CAUSATIVE_SUBTYPE.all || typeAvailable[sub] === true;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
            btn.disabled = !isAvailable;
            btn.setAttribute("aria-disabled", String(!isAvailable));
        });
    }
}

function initDerivationTypeControl() {
    const select = document.getElementById("derivation-type");
    const buttons = Array.from(document.querySelectorAll("[data-derivation-type]"));
    if (!select && !buttons.length) {
        return;
    }
    if (select) {
        select.addEventListener("change", () => {
            setActiveDerivationType(select.value);
            preserveViewportAnchorPosition(select, () => {
                updateDerivationTypeControl();
                renderTenseTabs();
                const verbMeta = getVerbInputMeta();
                renderActiveConjugations({
                    verb: verbMeta.displayVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                });
            });
        });
    }
    if (buttons.length) {
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const type = button.getAttribute("data-derivation-type");
                if (!type) {
                    return;
                }
                setActiveDerivationType(type);
                if (select) {
                    select.value = type;
                }
                preserveViewportAnchorPosition(button, () => {
                    updateDerivationTypeControl();
                    renderTenseTabs();
                    const verbMeta = getVerbInputMeta();
                    renderActiveConjugations({
                        verb: verbMeta.displayVerb,
                        objectPrefix: getCurrentObjectPrefix(),
                    });
                });
            });
        });
    }
    const subtypeButtons = Array.from(document.querySelectorAll("[data-causative-subtype]"));
    subtypeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const subtype = button.getAttribute("data-causative-subtype");
            if (!subtype) {
                return;
            }
            setActiveCausativeSubtype(subtype);
            preserveViewportAnchorPosition(button, () => {
                updateDerivationTypeControl();
                const verbMeta = getVerbInputMeta();
                renderActiveConjugations({
                    verb: verbMeta.displayVerb,
                    objectPrefix: getCurrentObjectPrefix(),
                });
            });
        });
    });
    updateDerivationTypeControl();
}

function getCalcTransitivityLabel() {
    const activeButton = document.querySelector(".verb-composer__slot-tab.is-active");
    if (activeButton?.textContent) {
        return activeButton.textContent.trim();
    }
    const select = document.getElementById("composer-transitivity");
    const option = select?.selectedOptions?.[0];
    return option?.textContent?.trim() || "";
}

function getCalcDerivationLabel() {
    const activeButton = document.querySelector("[data-derivation-type].is-active");
    if (activeButton?.textContent) {
        return activeButton.textContent.trim();
    }
    const select = document.getElementById("derivation-type");
    const option = select?.selectedOptions?.[0];
    return option?.textContent?.trim() || "";
}

function getCalcTenseLabel() {
    if (isOrdinaryNncGenerationModeEnabled()) {
        return "sustantivo ordinario";
    }
    const isNawat = getIsNawat();
    const selectionState = getCurrentResolvedConjugationSelectionState();
    if (selectionState.group === CONJUGATION_GROUPS.universal) {
        const tenseValue = selectionState.universalTenseValue;
        const classDetail = getPretUniversalClassDetail(tenseValue);
        const resolved = classDetail?.label
            ? getLocalizedLabel(classDetail.label, isNawat, classDetail.label || tenseValue)
            : (tenseValue || "");
        return resolved ? `Pretérito universal ${resolved}` : "Pretérito universal";
    }
    const tenseValue = selectionState.tenseValue || TENSE_ORDER[0] || "";
    return getLocalizedLabel(TENSE_LABELS[tenseValue], isNawat, tenseValue);
}

function getCalcSourceScopeLabel() {
    const scope = getVerbSourceScope();
    if (scope === VERB_SOURCE_SCOPE.active) {
        return "activo";
    }
    if (scope === VERB_SOURCE_SCOPE.nonactive) {
        return "no activo";
    }
    return "activo + no activo";
}

function updateCalcSummary() {
    const summaryEl = document.getElementById("calc-summary");
    if (!summaryEl) {
        return;
    }
    const isSimpleView = getActiveUiDensityMode() === UI_DENSITY_MODE.simple;
    const mode = getActiveTenseMode();
    const modeButton = document.querySelector(`[data-tense-mode="${mode}"]`);
    const modeLabel = modeButton?.textContent?.trim()
        || (mode === TENSE_MODE.sustantivo
            ? "Sustantivo"
            : (mode === TENSE_MODE.adjetivo
                ? "Adjetivo"
                : (mode === TENSE_MODE.adverbio ? "Adverbio" : "Verbo")));
    const voice = getCombinedMode();
    const voiceButton = document.querySelector(`[data-combined-mode="${voice}"]`);
    const voiceLabel = voiceButton?.textContent?.trim()
        || (voice === COMBINED_MODE.nonactive ? "No activo" : "Activo");
    const includeVoiceInSummary = mode === TENSE_MODE.verbo && voice === COMBINED_MODE.nonactive;
    const derivationLabel = mode === TENSE_MODE.verbo
        ? getCalcDerivationLabel().toLowerCase()
        : "";
    const transitivityLabel = getCalcTransitivityLabel();
    const tenseLabel = getCalcTenseLabel();
    const sourceScopeLabel = !isSimpleView
        ? getCalcSourceScopeLabel()
        : "";
    const parts = (() => {
        if (mode !== TENSE_MODE.verbo) {
            return [tenseLabel, sourceScopeLabel].filter(Boolean);
        }
        if (isSimpleView) {
            return [tenseLabel, transitivityLabel].filter(Boolean);
        }
        return [tenseLabel, derivationLabel, transitivityLabel, sourceScopeLabel || (includeVoiceInSummary ? voiceLabel : "")]
            .filter(Boolean);
    })();
    const fallback = mode === TENSE_MODE.verbo
        ? (isSimpleView ? "Selecciona tiempo" : "Selecciona tiempo y derivación")
        : "Selecciona tiempo";
    summaryEl.removeAttribute("title");
    summaryEl.textContent = parts.length ? parts.join(" · ") : fallback;
}

function updateCalcStatus() {
    const statusEl = document.getElementById("calc-status");
    if (!statusEl) {
        return;
    }
    const verbMeta = getVerbInputMeta();
    const verbInput = document.getElementById("verb");
    const isTemplateOnlyVerb = isComposerTemplateOnlyBaseValue(getSearchInputBase(verbInput?.value || ""));
    const hasVerb = Boolean(verbMeta?.displayVerb) && !isTemplateOnlyVerb;
    const hasError = Boolean(document.querySelector("#all-tense-conjugations .conjugation-error"))
        || Boolean(document.getElementById("verb")?.classList.contains("error"));
    const hasRows = Boolean(document.querySelector("#all-tense-conjugations .conjugation-row"));
    statusEl.classList.toggle("is-error", hasError);
    if (!hasVerb) {
        statusEl.textContent = getPlaceholderLabel(
            "conjugations",
            getIsNawat(),
            "Ingresa un verbo para ver las conjugaciones."
        );
        statusEl.classList.remove("is-error");
        return;
    }
    if (!hasRows) {
        statusEl.textContent = getUiCopyLabel("calc-status-no-results", "Sin resultados para esta combinación.");
        statusEl.classList.add("is-error");
        return;
    }
    if (hasError) {
        statusEl.textContent = getUiCopyLabel(
            "calc-status-incompatible",
            "Revisa la combinación: hay formas incompatibles."
        );
        return;
    }
    const modeLabel = getUiCopyLabel("calc-status-mode-prefix", "Entrada estructural");
    const outputUpdated = getUiCopyLabel("calc-status-output-updated", "salida actualizada.");
    statusEl.textContent = `${modeLabel} · ${outputUpdated}`;
}

function updateCalcSummaryAndStatus() {
    updateCalcSummary();
    updateCalcStatus();
}


// === Preterito Universal ===
var PRET_UNIVERSAL_VERB_OVERRIDES = [
];

function getPretUniversalVerbOverride(analysisVerb, isTransitive) {
    if (!analysisVerb) {
        return null;
    }
    if (!PRET_UNIVERSAL_VERB_OVERRIDES.length) {
        return null;
    }
    const transitivity = isTransitive ? "transitive" : "intransitive";
    for (const entry of PRET_UNIVERSAL_VERB_OVERRIDES) {
        if (!entry || !Array.isArray(entry.verbs) || !entry.verbs.includes(analysisVerb)) {
            continue;
        }
        if (entry.transitivity && entry.transitivity !== transitivity) {
            continue;
        }
        return entry;
    }
    return null;
}


// Preterit/perfective universal engine moved to pret_universal_context.js + pret_universal_engine.js.
function updateVerbRuleHint({
    verb,
    analysisVerb,
    exactBaseVerb,
    objectPrefix,
    forceTransitive = false,
    isYawi = false,
    isWeya = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    hasNonspecificValence = false,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    derivationType = "",
}) {
    const wrapper = document.getElementById("verb-rule");
    const textEl = document.getElementById("verb-rule-text");
    if (!wrapper || !textEl) {
        return;
    }
    const clearHint = () => {
        textEl.textContent = "";
        wrapper.classList.add("is-empty");
    };
    if (!verb || getActiveTenseMode() !== TENSE_MODE.verbo) {
        clearHint();
        return;
    }
    const isTransitive = forceTransitive || Boolean(objectPrefix);
    const markerOptions = buildPretMarkerOptionsFromFlags({
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
    });
    const contextOptions = buildPretContextOptionsFromFlags({
        isYawi,
        isWeya,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        hasNonspecificValence,
        exactBaseVerb,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        derivationType,
    });
    const resolvedBundle = resolvePretUniversalContextBundle({
        verb,
        analysisVerb,
        isTransitive,
        markerOptions,
        contextOptions,
        includeSummary: true,
    });
    const summary = resolvedBundle.summary;
    if (!summary) {
        clearHint();
        return;
    }
    const parts = [];
    if (hasImpersonalTaPrefix) {
        parts.push("ta-impersonal");
    }
    parts.push(summary.ruleLabel);
    if (summary.shapeLabel) {
        parts.push(`descriptor ${summary.shapeLabel}`);
    }
    const classSummary = summary.resolvedClassList || summary.classList || "";
    if (classSummary) {
        parts.push(`classes ${classSummary}`);
    }
    if (summary.gates && summary.gates.length) {
        parts.push(`safegate ${summary.gates.join(", ")}`);
    }
    textEl.textContent = parts.join(" · ");
    wrapper.classList.remove("is-empty");
}


function getSelectedTenseTab() {
    return TenseTabsState.selected;
}

function setSelectedTenseTab(value) {
    if (TENSE_ORDER.includes(value)) {
        const previous = TenseTabsState.selected;
        TenseTabsState.selected = value;
        if (previous !== value) {
            resetToggleStateForTense(value);
            const activeNawatRoute = getActiveNawatRouteProfile();
            const activeRouteTenseValues = [
                activeNawatRoute?.targetTenseValue || "",
                activeNawatRoute?.nawatTenseValue || "",
                activeNawatRoute?.legacyTenseValue || "",
                activeNawatRoute?.sourceTenseValue || "",
                activeNawatRoute?.activeStationTenseValue || "",
            ].filter(Boolean);
            if (activeNawatRoute && !activeRouteTenseValues.includes(value)) {
                clearActiveNawatRouteProfile();
            }
        }
    }
}

function getSelectedPretUniversalTab() {
    return PreteritoUniversalTabsState.selected;
}

function setSelectedPretUniversalTab(value) {
    if (PRETERITO_UNIVERSAL_ORDER.includes(value)) {
        const previous = PreteritoUniversalTabsState.selected;
        PreteritoUniversalTabsState.selected = value;
        if (previous !== value) {
            resetToggleStateForTense(value);
        }
    }
}

function buildConjugationSelectionState({
    tenseMode = getActiveTenseMode(),
    group = getActiveConjugationGroup(),
    tenseValue = getSelectedTenseTab(),
    universalTenseValue = getSelectedPretUniversalTab(),
    classFilter = ClassFilterState.activeClass,
} = {}) {
    const resolvedTenseMode = Object.values(TENSE_MODE).includes(tenseMode)
        ? tenseMode
        : getActiveTenseMode();
    const resolvedGroup = isNominalTenseMode(resolvedTenseMode)
        ? CONJUGATION_GROUPS.tense
        : (group === CONJUGATION_GROUPS.universal ? CONJUGATION_GROUPS.universal : CONJUGATION_GROUPS.tense);
    return {
        tenseMode: resolvedTenseMode,
        group: resolvedGroup,
        tenseValue: String(tenseValue || ""),
        universalTenseValue: String(universalTenseValue || ""),
        classFilter: classFilter || null,
    };
}

function extractConjugationSelectionState(snapshot = null, fallback = {}) {
    if (!snapshot || typeof snapshot !== "object") {
        return buildConjugationSelectionState(fallback);
    }
    if (snapshot.selectionState && typeof snapshot.selectionState === "object") {
        const nestedSelectionState = snapshot.selectionState;
        const hasNestedClassFilter = Object.prototype.hasOwnProperty.call(nestedSelectionState, "classFilter");
        return buildConjugationSelectionState({
            ...fallback,
            ...nestedSelectionState,
            classFilter: hasNestedClassFilter
                ? nestedSelectionState.classFilter
                : fallback.classFilter,
        });
    }
    const hasClassFilter = Object.prototype.hasOwnProperty.call(snapshot, "classFilter");
    return buildConjugationSelectionState({
        ...fallback,
        tenseMode: snapshot.tenseMode || snapshot.mode || fallback.tenseMode,
        group: snapshot.group || fallback.group,
        tenseValue: snapshot.tenseValue || snapshot.tense || snapshot.tenseTab || fallback.tenseValue,
        universalTenseValue: snapshot.universalTenseValue || snapshot.pret || snapshot.pretUniversalTab || fallback.universalTenseValue,
        classFilter: hasClassFilter ? snapshot.classFilter : fallback.classFilter,
    });
}

function getPretUniversalAvailabilityEntry(tenseValue = "", availabilityEntries = PreteritoUniversalAvailabilityCache) {
    const list = Array.isArray(availabilityEntries) ? availabilityEntries : [];
    return list.find((entry) => entry?.tenseValue === String(tenseValue || "")) || null;
}

function isPretUniversalClassAvailable(classKey = "", availabilityEntries = PreteritoUniversalAvailabilityCache) {
    if (!classKey) {
        return false;
    }
    return (Array.isArray(availabilityEntries) ? availabilityEntries : []).some((entry) => (
        PRET_UNIVERSAL_CLASS_BY_TENSE[entry?.tenseValue || ""] === classKey
        && resolveTenseAvailabilityIsAvailable(entry) === true
    ));
}

function resolveConjugationSelectionState(selectionState = null, {
    tenseMode = getActiveTenseMode(),
    availabilityEntries = PreteritoUniversalAvailabilityCache,
} = {}) {
    const requested = extractConjugationSelectionState(selectionState, { tenseMode });
    const resolvedTenseMode = Object.values(TENSE_MODE).includes(tenseMode)
        ? tenseMode
        : requested.tenseMode;
    const allowedTenses = getTenseOrderForMode(resolvedTenseMode);
    const tenseValue = allowedTenses.includes(requested.tenseValue)
        ? requested.tenseValue
        : (allowedTenses[0] || TENSE_ORDER[0] || "");
    const hasAvailabilityEntries = Array.isArray(availabilityEntries) && availabilityEntries.length > 0;
    let universalTenseValue = PRETERITO_UNIVERSAL_ORDER.includes(requested.universalTenseValue)
        ? requested.universalTenseValue
        : (PRETERITO_UNIVERSAL_ORDER[0] || "");
    let universalEntry = hasAvailabilityEntries
        ? getPretUniversalAvailabilityEntry(universalTenseValue, availabilityEntries)
        : null;
    if (hasAvailabilityEntries && resolveTenseAvailabilityIsAvailable(universalEntry) !== true) {
        const firstAvailable = getFirstAvailableEntry(availabilityEntries, universalTenseValue, "tenseValue");
        if (firstAvailable) {
            universalEntry = firstAvailable;
            universalTenseValue = firstAvailable.tenseValue || universalTenseValue;
        }
    }
    let group = isNominalTenseMode(resolvedTenseMode)
        ? CONJUGATION_GROUPS.tense
        : requested.group;
    if (group === CONJUGATION_GROUPS.universal && hasAvailabilityEntries && resolveTenseAvailabilityIsAvailable(universalEntry) !== true) {
        group = CONJUGATION_GROUPS.tense;
    }
    let classFilter = requested.classFilter && PRETERITO_CLASS_DETAIL_BY_KEY[requested.classFilter]
        ? requested.classFilter
        : null;
    if (!PRETERITO_CLASS_TENSES.has(tenseValue)) {
        classFilter = null;
    } else if (hasAvailabilityEntries && classFilter && !isPretUniversalClassAvailable(classFilter, availabilityEntries)) {
        classFilter = null;
    }
    return buildConjugationSelectionState({
        tenseMode: resolvedTenseMode,
        group,
        tenseValue,
        universalTenseValue,
        classFilter,
    });
}

function applyResolvedConjugationSelectionState(resolvedSelectionState = null) {
    const resolved = buildConjugationSelectionState(resolvedSelectionState || {});
    setSelectedTenseTab(resolved.tenseValue);
    setSelectedPretUniversalTab(resolved.universalTenseValue);
    setActiveConjugationGroup(resolved.group);
    ClassFilterState.activeClass = resolved.classFilter;
    return resolved;
}

function applyConjugationSelectionState(selectionState = null, {
    tenseMode = getActiveTenseMode(),
    availabilityEntries = PreteritoUniversalAvailabilityCache,
} = {}) {
    const resolved = resolveConjugationSelectionState(selectionState, {
        tenseMode,
        availabilityEntries,
    });
    return applyResolvedConjugationSelectionState(resolved);
}

function mutateConjugationSelectionState(mutation = null, {
    tenseMode = getActiveTenseMode(),
    availabilityEntries = PreteritoUniversalAvailabilityCache,
} = {}) {
    const current = getCurrentResolvedConjugationSelectionState({
        tenseMode,
        availabilityEntries,
    });
    const nextValue = typeof mutation === "function"
        ? mutation(current)
        : {
            ...current,
            ...(mutation && typeof mutation === "object" ? mutation : {}),
        };
    return applyConjugationSelectionState(nextValue, {
        tenseMode,
        availabilityEntries,
    });
}

function buildConjugationSelectionStateCacheToken(selectionState = null) {
    const resolved = resolveConjugationSelectionState(selectionState);
    return [
        resolved.tenseMode,
        resolved.group,
        resolved.tenseValue,
        resolved.universalTenseValue,
        resolved.classFilter || "",
    ].join("|");
}

function getCurrentResolvedConjugationSelectionState({
    tenseMode = getActiveTenseMode(),
    availabilityEntries = PreteritoUniversalAvailabilityCache,
} = {}) {
    return resolveConjugationSelectionState(
        buildConjugationSelectionState({ tenseMode }),
        {
            tenseMode,
            availabilityEntries,
        }
    );
}

// === Toggle Lock Functions ===

function isToggleLockEnabled() {
    return ToggleLockState.enabled === true;
}

function getToggleLockValueStoreByMap(map) {
    if (map === ObjectToggleState) {
        return ToggleLockValueState.object;
    }
    if (map === SubjectToggleState) {
        return ToggleLockValueState.subject;
    }
    if (map === PossessorToggleState) {
        return ToggleLockValueState.possessor;
    }
    if (map === PatientivoOwnershipState) {
        return ToggleLockValueState.patientivoOwnership;
    }
    if (map === PatientivoNominalSuffixState) {
        return ToggleLockValueState.patientivoNominalSuffix;
    }
    return null;
}

function getToggleLockStateKey(stateKey = "") {
    const normalizedKey = String(stateKey || "");
    if (!normalizedKey) {
        return "";
    }
    const parts = normalizedKey.split("|");
    if (parts.length < 3) {
        return normalizedKey;
    }
    let tenseIndex = 1;
    if (parts[tenseIndex] === "nonactive") {
        tenseIndex += 1;
    }
    if (tenseIndex >= parts.length) {
        return normalizedKey;
    }
    return [parts[0], ...parts.slice(tenseIndex + 1)].join("|");
}

function getToggleStateValue(map, stateKey, fallbackValue = undefined) {
    if (!map) {
        return fallbackValue;
    }
    const normalizedKey = String(stateKey || "");
    if (!normalizedKey) {
        return fallbackValue;
    }
    if (isToggleLockEnabled()) {
        const lockStore = getToggleLockValueStoreByMap(map);
        if (lockStore) {
            const lockKey = getToggleLockStateKey(normalizedKey);
            if (lockStore.has(lockKey)) {
                return lockStore.get(lockKey);
            }
        }
    }
    const directValue = map.get(normalizedKey);
    if (directValue !== undefined) {
        return directValue;
    }
    return fallbackValue;
}

function setToggleStateValue(map, stateKey, value, { syncLock = false } = {}) {
    if (!map) {
        return;
    }
    const normalizedKey = String(stateKey || "");
    if (!normalizedKey) {
        return;
    }
    map.set(normalizedKey, value);
    if (!syncLock || !isToggleLockEnabled()) {
        return;
    }
    const lockStore = getToggleLockValueStoreByMap(map);
    if (!lockStore) {
        return;
    }
    const lockKey = getToggleLockStateKey(normalizedKey);
    lockStore.set(lockKey, value);
}

function clearToggleLockValueState() {
    ToggleLockValueState.object.clear();
    ToggleLockValueState.subject.clear();
    ToggleLockValueState.possessor.clear();
    ToggleLockValueState.patientivoOwnership.clear();
    ToggleLockValueState.patientivoNominalSuffix.clear();
    ToggleLockValueState.sourceScope = "";
}

function seedToggleLockValueStateFromCurrentMaps() {
    clearToggleLockValueState();
    const seedMap = (stateMap, lockStore) => {
        if (!stateMap || !lockStore) {
            return;
        }
        stateMap.forEach((value, key) => {
            const lockKey = getToggleLockStateKey(key);
            if (!lockKey) {
                return;
            }
            lockStore.set(lockKey, value);
        });
    };
    seedMap(ObjectToggleState, ToggleLockValueState.object);
    seedMap(SubjectToggleState, ToggleLockValueState.subject);
    seedMap(PossessorToggleState, ToggleLockValueState.possessor);
    seedMap(PatientivoOwnershipState, ToggleLockValueState.patientivoOwnership);
    seedMap(PatientivoNominalSuffixState, ToggleLockValueState.patientivoNominalSuffix);
    setToggleLockSourceScopeValue(VerbSourceScopeState.scope);
}

function clearAllToggleStateMaps({ resetNonactiveSuffix = false, resetSourceScope = false } = {}) {
    SubjectToggleState.clear();
    ObjectToggleState.clear();
    PossessorToggleState.clear();
    PatientivoOwnershipState.clear();
    PatientivoNominalSuffixState.clear();
    DefaultToggleApplied.clear();
    if (resetNonactiveSuffix) {
        setSelectedNonactiveSuffix(null);
    }
    if (resetSourceScope) {
        setVerbSourceScope(VERB_SOURCE_SCOPE.both, {
            syncCombinedMode: false,
            syncLock: false,
            respectLock: false,
        });
    }
}

function applyDefaultToggleStateOnce(map, stateKey, verbKey, value) {
    if (!stateKey || !verbKey) {
        return;
    }
    const appliedKey = `${verbKey}|${stateKey}`;
    if (DefaultToggleApplied.has(appliedKey)) {
        return;
    }
    map.set(stateKey, value);
    DefaultToggleApplied.add(appliedKey);
}
