// core/search/runtime.js
// Conjugation search normalization, nominal slot planning, and search-plan builders.

"use strict";

function splitSearchInput(rawValue) {
    const raw = String(rawValue || "");
    return { base: raw, query: "", hasQuery: false };
}

function getRawInputTiCausativeMetadata(rawValue = "") {
    const raw = String(rawValue || "");
    const movingTargetParsed = parseMovingTargetRegexInput(raw);
    if (movingTargetParsed.isValid) {
        const inline = parseInlineTiCausativeClassFromBase(
            collapseSerialStemDashInput(movingTargetParsed.coreText || "")
        );
        const adjacentIntransitiveEmbed = movingTargetParsed.transitivity === COMPOSER_TRANSITIVITY.intransitive
            ? getMovingTargetAdjacentEmbedParts(inline.base || movingTargetParsed.coreText || "")
            : null;
        const movingTargetDashPrefix = movingTargetParsed.transitivity === COMPOSER_TRANSITIVITY.intransitive
            ? ""
            : "-";
        return {
            raw,
            hasQuery: false,
            query: "",
            normalizedBase: movingTargetParsed.regexValue,
            normalizedQuery: "",
            normalizedInput: movingTargetParsed.regexValue,
            tiCausativeClass: inline.tiCausativeClass || "",
            dashPrefix: movingTargetDashPrefix,
            displayCore: movingTargetParsed.coreText || "",
            displayVerb: movingTargetParsed.regexValue,
            hasExternalObjectDash: movingTargetParsed.transitivity !== COMPOSER_TRANSITIVITY.intransitive,
            semanticObjectSlotCount: movingTargetParsed.transitivity === COMPOSER_TRANSITIVITY.bitransitive
                ? 2
                : (movingTargetParsed.transitivity === COMPOSER_TRANSITIVITY.transitive ? 1 : 0),
            lexicalCompoundEmbedCount: adjacentIntransitiveEmbed ? 1 : 0,
            isRegexEnvelope: true,
        };
    }
    const inline = parseInlineTiCausativeClassFromBase(collapseSerialStemDashInput(raw));
    return {
        raw,
        hasQuery: false,
        query: "",
        normalizedBase: raw,
        normalizedQuery: "",
        normalizedInput: raw,
        tiCausativeClass: inline.tiCausativeClass || "",
        dashPrefix: "",
        displayCore: "",
        displayVerb: raw,
        hasExternalObjectDash: false,
        semanticObjectSlotCount: 0,
        lexicalCompoundEmbedCount: 0,
        isRegexEnvelope: false,
    };
}

function getSearchParts(rawValue) {
    const parts = splitSearchInput(rawValue);
    return {
        ...parts,
        trimmedBase: parts.base.trim(),
        trimmedQuery: "",
        tiCausativeClass: "",
        searchQuery: "",
    };
}

function parseSearchQueryDirectives(rawQuery = "") {
    void rawQuery;
    return {
        tiCausativeClass: "",
        searchQuery: "",
    };
}

function getSearchQueryDirectives(rawValue) {
    const { query } = splitSearchInput(rawValue);
    const directives = parseSearchQueryDirectives(query);
    return {
        tiCausativeClass: directives.tiCausativeClass,
    };
}

function rememberNonSearchValue(parts) {
    const trimmedBase = parts.trimmedBase ?? String(parts.base || "").trim();
    if (trimmedBase) {
        VerbInputState.lastNonSearchValue = parts.base;
        return parts.base;
    }
    return "";
}

function getSearchInputBase(rawValue) {
    const { base } = getSearchParts(rawValue);
    return base;
}

function isComposerTemplateOnlyBaseValue(rawValue = "") {
    const base = String(rawValue || "").trim().toLowerCase();
    return /^-{0,2}_[a-z0-9]*$/.test(base);
}

function getSearchQueryInfo(rawValue) {
    void rawValue;
    return null;
}

function getOrdinaryNncSearchCandidateInfo(rawValue, options = {}) {
    const resolver = typeof resolveOrdinaryNncFixture === "function"
        ? resolveOrdinaryNncFixture
        : null;
    if (!resolver) {
        return null;
    }
    const parts = getSearchParts(rawValue);
    const trimmedBase = parts.trimmedBase ?? String(parts.base || "").trim();
    if (!trimmedBase || isComposerTemplateOnlyBaseValue(trimmedBase)) {
        return null;
    }
    const sourceOptions = options && typeof options === "object" ? options : {};
    const candidate = resolver({
        ...sourceOptions,
        stem: trimmedBase,
    });
    if (!candidate) {
        return null;
    }
    return {
        kind: "ordinary-nnc-search-candidate",
        outputKind: candidate.outputKind || candidate.clauseKind || candidate.paradigmSet?.outputKind || candidate.paradigmSet?.clauseKind || "nominal-nuclear-clause",
        clauseKind: candidate.clauseKind || candidate.paradigmSet?.clauseKind || "nominal-nuclear-clause",
        candidateKind: candidate.kind || "ordinary-nnc-fixture",
        supported: candidate.supported === true,
        input: String(rawValue || ""),
        base: parts.base,
        trimmedBase,
        normalizedInput: candidate.normalizedInput || "",
        fixture: candidate.fixture || null,
        paradigmSet: candidate.paradigmSet || null,
    };
}

function isOrdinaryNncSearchCandidate(rawValue, options = {}) {
    return getOrdinaryNncSearchCandidateInfo(rawValue, options) !== null;
}

function isSearchModeInput(rawValue) {
    const info = getSearchQueryInfo(rawValue);
    return !!info;
}

function normalizeConjugationSearchText(value) {
    return String(value || "").toLowerCase().replace(/[^a-z]/g, "");
}

function matchesSearchVariant(variant, normalizedSearch, matchMode) {
    switch (matchMode) {
        case "contains":
            return variant.includes(normalizedSearch);
        case "starts":
            return variant.startsWith(normalizedSearch);
        case "ends":
            return variant.endsWith(normalizedSearch);
        default:
            return variant === normalizedSearch;
    }
}

function isNominalTenseMode(mode = getActiveTenseMode()) {
    return mode === TENSE_MODE.sustantivo
        || mode === TENSE_MODE.adjetivo
        || mode === TENSE_MODE.adverbio;
}

function getCurrentSearchTense() {
    const selectionState = buildConjugationSelectionState();
    return selectionState.group === CONJUGATION_GROUPS.universal
        ? selectionState.universalTenseValue
        : selectionState.tenseValue;
}

function getSearchModeGroups(mode) {
    return isNominalTenseMode(mode)
        ? [CONJUGATION_GROUPS.tense]
        : [CONJUGATION_GROUPS.tense, CONJUGATION_GROUPS.universal];
}

function getSearchGroupTenseOrder(mode, group) {
    if (isNominalTenseMode(mode)) {
        return getTenseOrderForMode(mode);
    }
    if (group === CONJUGATION_GROUPS.universal) {
        return PRETERITO_UNIVERSAL_ORDER.slice();
    }
    return getTenseOrderForMode(TENSE_MODE.verbo);
}

function buildSearchPlanAcrossModes() {
    const plan = [];
    const seen = new Set();
    const pushTarget = (mode, group, tenseValue) => {
        const key = `${mode}|${group}|${tenseValue}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        plan.push({ mode, group, tenseValue });
    };
    const addGroup = (mode, group, primaryTense) => {
        const order = getSearchGroupTenseOrder(mode, group);
        if (primaryTense && order.includes(primaryTense)) {
            pushTarget(mode, group, primaryTense);
        }
        order.forEach((tenseValue) => {
            if (tenseValue === primaryTense) {
                return;
            }
            pushTarget(mode, group, tenseValue);
        });
    };
    const activeMode = getActiveTenseMode();
    const activeSelectionState = getCurrentResolvedConjugationSelectionState({
        tenseMode: activeMode,
    });
    const activeGroup = isNominalTenseMode(activeMode)
        ? CONJUGATION_GROUPS.tense
        : activeSelectionState.group;
    const currentTense = activeGroup === CONJUGATION_GROUPS.universal
        ? activeSelectionState.universalTenseValue
        : activeSelectionState.tenseValue;

    addGroup(activeMode, activeGroup, currentTense);
    getSearchModeGroups(activeMode)
        .filter((group) => group !== activeGroup)
        .forEach((group) => addGroup(activeMode, group));

    [TENSE_MODE.verbo, TENSE_MODE.sustantivo, TENSE_MODE.adjetivo, TENSE_MODE.adverbio]
        .filter(Boolean)
        .filter((mode) => mode !== activeMode)
        .forEach((mode) => {
            getSearchModeGroups(mode).forEach((group) => addGroup(mode, group));
        });

    return plan;
}

function getNounPossessorKey(tenseValue) {
    const groupKey = SUSTANTIVO_VERBAL_PREFIXES.join("|");
    return `noun|${tenseValue}|${groupKey}|possessor`;
}

function getDefaultPossessorForTense(tenseValue) {
    if (tenseValue === "calificativo-instrumentivo") {
        return "i";
    }
    return "";
}

function getSearchPossessorPlan(tenseValue) {
    const possessorKey = getNounPossessorKey(tenseValue);
    const stored = getToggleStateValue(PossessorToggleState, possessorKey);
    const fallback = getDefaultPossessorForTense(tenseValue);
    const base = stored === undefined ? fallback : stored;
    if (isPotencialProfileTense(tenseValue) || isPatientivoAdjectiveTense(tenseValue)) {
        return [""];
    }
    const values = POSSESSIVE_PREFIXES.map((entry) => entry.value);
    const ordered = [base, ...values.filter((value) => value !== base)];
    return ordered.filter((value, index) => ordered.indexOf(value) === index);
}

function isNonanimateNounTense(tenseValue) {
    if (NONANIMATE_NOUN_TENSES instanceof Set && NONANIMATE_NOUN_TENSES.size > 0) {
        return NONANIMATE_NOUN_TENSES.has(tenseValue);
    }
    return tenseValue === "sustantivo-verbal"
        || tenseValue === "instrumentivo"
        || tenseValue === "calificativo-instrumentivo";
}

function getNonanimateSubjectId() {
    const match = SUBJECT_COMBINATIONS.find((entry) => (
        entry.subjectPrefix === "" && entry.subjectSuffix === ""
    ));
    return match ? match.id : "";
}

function buildSearchOptionPlan(options, stored, fallback) {
    const list = options.slice();
    if (!list.length) {
        return [];
    }
    let base = list.includes(stored) ? stored : "";
    if (!base || base === SUBJECT_TOGGLE_ALL || base === OBJECT_TOGGLE_ALL) {
        base = list.includes(fallback) ? fallback : list[0];
    }
    const ordered = [base, ...list.filter((value) => value !== base)];
    return ordered.filter((value, index) => ordered.indexOf(value) === index);
}

const NOUN_OBJECT_SLOT_SCHEMA = Object.freeze([
    Object.freeze({
        id: "object",
        stateSuffix: "",
        datasetKey: "objectPrefix",
    }),
    Object.freeze({
        id: "object2",
        stateSuffix: "indirect",
        datasetKey: "indirectObjectMarker",
    }),
    Object.freeze({
        id: "object3",
        stateSuffix: "object3",
        datasetKey: "thirdObjectMarker",
    }),
]);

function getNounDerivationTypeFromMeta(verbMeta) {
    if (Object.values(DERIVATION_TYPE).includes(verbMeta?.derivationType)) {
        return verbMeta.derivationType;
    }
    return getActiveDerivationType();
}

function getNominalAvailableObjectSlots(verbMeta, tenseValue = "", options = {}) {
    const embeddedSlots = Number.isFinite(verbMeta?.embeddedValenceCount) ? verbMeta.embeddedValenceCount : 0;
    const fusionObjectSlots = getFusionObjectSlots(verbMeta);
    const resolvedCombinedMode = options.combinedMode || getCombinedMode();
    const shouldUseNonactiveSlots = resolvedCombinedMode === COMBINED_MODE.nonactive
        && (
            isPotencialHabitualTense(tenseValue)
            || tenseValue === "calificativo-instrumentivo"
        );
    const valency = getValencyFromDirectActive(verbMeta);
    const baseObjectSlots = shouldUseNonactiveSlots
        ? Number(valency?.nonactiveSlots || 0)
        : Number(valency?.activeSlots || 0);
    return Math.max(0, Math.min(MAX_OBJECT_SLOTS, baseObjectSlots - fusionObjectSlots - embeddedSlots));
}

function getNounObjectSlotSummary(verbMeta, tenseValue = "", options = {}) {
    const derivationType = getNounDerivationTypeFromMeta(verbMeta);
    const derivationValencyDelta = getDerivationValencyDelta(derivationType);
    if (isPotencialTroncoNajActiveTense(tenseValue)) {
        return {
            derivationType,
            derivationValencyDelta,
            availableObjectSlots: 0,
            directObjectSlots: 0,
            derivedAddedSlots: 0,
        };
    }
    const availableObjectSlots = getNominalAvailableObjectSlots(verbMeta, tenseValue, options);
    const directObjectSlots = Math.max(0, availableObjectSlots - Math.max(0, derivationValencyDelta));
    const derivedAddedSlots = Math.max(0, availableObjectSlots - directObjectSlots);
    return {
        derivationType,
        derivationValencyDelta,
        availableObjectSlots,
        directObjectSlots,
        derivedAddedSlots,
    };
}

function getNounObjectSlotStateKey(baseObjectStateKey = "", slotId = "object") {
    const slotMeta = NOUN_OBJECT_SLOT_SCHEMA.find((entry) => entry.id === slotId);
    if (!slotMeta || !slotMeta.stateSuffix) {
        return baseObjectStateKey;
    }
    return `${baseObjectStateKey}|${slotMeta.stateSuffix}`;
}

function getPreferredNounObjectSlotPrefix(toggleValues, options = {}) {
    const values = Array.isArray(toggleValues) ? toggleValues : [];
    if (!values.length) {
        return "";
    }
    const isPrimary = options.isPrimary === true;
    const isAddedSlot = options.isAddedSlot === true;
    if (isPrimary) {
        return getDefaultOutputToggleSelection({
            context: "noun-primary-object",
            values,
        });
    }
    return getDefaultOutputToggleSelection({
        context: "noun-extra-object",
        values,
        isAddedSlot,
    });
}

function getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue, options = {}) {
    const isTransitiveVerb = getBaseObjectSlots(verbMeta) > 0;
    const slotSummary = getNounObjectSlotSummary(verbMeta, tenseValue, options);
    const allowsObjectPrefix = slotSummary.availableObjectSlots > 0;
    const hasOnlyDerivedSlot = slotSummary.derivedAddedSlots > 0 && slotSummary.directObjectSlots <= 0;
    const nounTransitivePrefixes = Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
    const isCalificativoInstrumentivo = tenseValue === "calificativo-instrumentivo";
    const isLocativoTemporal = tenseValue === "locativo-temporal";
    const isSustantivoVerbal = tenseValue === "sustantivo-verbal";
    const isPotencial = tenseValue === "potencial";
    const isAdjetivoWrapper = isPotencialActiveTense(tenseValue)
        || isPotencialHabitualTense(tenseValue);
    const resolvedCombinedMode = options.combinedMode || getCombinedMode();
    if (isCalificativoInstrumentivo) {
        return (isTransitiveVerb && allowsObjectPrefix)
            ? nounTransitivePrefixes
            : [""];
    }
    if (isLocativoTemporal) {
        if (!isTransitiveVerb || !allowsObjectPrefix) {
            return [""];
        }
        if (hasOnlyDerivedSlot) {
            return nounTransitivePrefixes;
        }
        if (resolvedCombinedMode === COMBINED_MODE.nonactive) {
            return [
                ...Array.from(PASSIVE_IMPERSONAL_DIRECT_OBJECTS),
                ...nounTransitivePrefixes,
            ];
        }
        return nounTransitivePrefixes;
    }
    if (!isTransitiveVerb || !allowsObjectPrefix) {
        return [""];
    }
    if (tenseValue === "agentivo" || hasOnlyDerivedSlot) {
        return nounTransitivePrefixes;
    }
    if (isSustantivoVerbal) {
        return nounTransitivePrefixes;
    }
    if (isAdjetivoWrapper) {
        return nounTransitivePrefixes;
    }
    if (isPotencial) {
        return [""];
    }
    return ["", ...nounTransitivePrefixes];
}

function getNounObjectSlotPlansFromMeta(verbMeta, tenseValue, options = {}) {
    const slotSummary = getNounObjectSlotSummary(verbMeta, tenseValue, options);
    const nounTransitivePrefixes = Array.from(SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
    const allowedPrimaryPrefixes = getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue, options);
    const primaryPrefixes = Array.from(new Set(
        Array.isArray(allowedPrimaryPrefixes) && allowedPrimaryPrefixes.length
            ? allowedPrimaryPrefixes
            : [""]
    ));
    const slotPlans = NOUN_OBJECT_SLOT_SCHEMA
        .slice(0, slotSummary.availableObjectSlots)
        .map((slotMeta, index) => {
            const isPrimary = index === 0;
            const isAddedSlot = index >= slotSummary.directObjectSlots;
            const seedValues = isPrimary
                ? primaryPrefixes
                : nounTransitivePrefixes;
            const toggleValues = Array.from(new Set(seedValues.filter((value) => value !== undefined && value !== null)))
                .map((value) => String(value || ""));
            const normalizedValues = toggleValues.length ? toggleValues : [""];
            return {
                ...slotMeta,
                index,
                isPrimary,
                isAddedSlot,
                toggleValues: normalizedValues,
                preferredId: getPreferredNounObjectSlotPrefix(normalizedValues, {
                    isPrimary,
                    isAddedSlot,
                }),
            };
        });
    return {
        ...slotSummary,
        primaryPrefixes,
        nounTransitivePrefixes,
        slotPlans,
    };
}

function buildNounObjectSlotToggleStates({
    verbMeta,
    tenseValue,
    baseObjectStateKey,
    isNawat = false,
    combinedMode = "",
}) {
    const slotPlanBundle = getNounObjectSlotPlansFromMeta(verbMeta, tenseValue, { combinedMode });
    const slotStates = slotPlanBundle.slotPlans.map((slotPlan) => {
        const stateKey = getNounObjectSlotStateKey(baseObjectStateKey, slotPlan.id);
        const options = getObjectToggleOptions(slotPlan.toggleValues, {
            includeAll: true,
            labelForPrefix: getNonspecificToggleLabel,
            isNawat,
        });
        const showToggle = slotPlan.toggleValues.length > 1;
        const storedValue = getToggleStateValue(ObjectToggleState, stateKey);
        const isStoredValid = storedValue !== undefined
            && (
                slotPlan.toggleValues.includes(storedValue)
                || (showToggle && storedValue === OBJECT_TOGGLE_ALL)
            );
        let activeId = isStoredValid ? storedValue : slotPlan.preferredId;
        if (activeId !== OBJECT_TOGGLE_ALL && !slotPlan.toggleValues.includes(activeId)) {
            activeId = slotPlan.toggleValues[0] || "";
        }
        if (showToggle && !isStoredValid && activeId === "") {
            activeId = slotPlan.preferredId || slotPlan.toggleValues[0] || "";
        }
        setToggleStateValue(ObjectToggleState, stateKey, activeId, { syncLock: false });
        return {
            ...slotPlan,
            stateKey,
            options,
            optionMap: new Map(options.map((entry) => [entry.id, entry])),
            activeId,
            showToggle,
        };
    });
    return {
        ...slotPlanBundle,
        slotStates,
    };
}

function buildNounObjectSlotSelectionModels(slotStates = [], options = {}) {
    const includeSlot = typeof options.includeSlot === "function"
        ? options.includeSlot
        : () => true;
    return (Array.isArray(slotStates) ? slotStates : [])
        .filter((slotState) => includeSlot(slotState))
        .map((slotState) => {
            const values = slotState.activeId === OBJECT_TOGGLE_ALL
                ? slotState.toggleValues
                : [slotState.activeId];
            return {
                ...slotState,
                values: values.length ? values : [""],
            };
        });
}

function iterateNounObjectSlotSelections(slotSelectionModels = [], onSelection = null) {
    if (typeof onSelection !== "function") {
        return;
    }
    const models = Array.isArray(slotSelectionModels) ? slotSelectionModels : [];
    const visit = (slotIndex, selectedBySlot) => {
        if (slotIndex >= models.length) {
            onSelection(selectedBySlot);
            return;
        }
        const slotModel = models[slotIndex];
        const values = Array.isArray(slotModel.values) && slotModel.values.length
            ? slotModel.values
            : [""];
        values.forEach((value) => {
            visit(slotIndex + 1, {
                ...selectedBySlot,
                [slotModel.id]: value || "",
            });
        });
    };
    visit(0, {});
}

function getSearchNonactiveSuffixPlan(verbMeta) {
    if (getCombinedMode() !== COMBINED_MODE.nonactive) {
        return [null];
    }
    if (shouldForceAllNonactiveOptions()) {
        return [null];
    }
    const verb = verbMeta.verb;
    const analysisVerb = verbMeta.analysisVerb || verb;
    const isTransitive = isNonactiveTransitiveByObj1(getCurrentObjectPrefix(), verbMeta);
    const options = resolveLiveNonactiveOptions({
        verbMeta,
        verb,
        analysisVerb,
        isTransitive,
        isYawi: verbMeta.isYawi === true,
        rootPlusYaBase: verbMeta.rootPlusYaBase,
    });
    if (!options.length) {
        return [null];
    }
    const suffixes = options.map((option) => option.suffix);
    const current = getSelectedNonactiveSuffix();
    const ordered = current && suffixes.includes(current)
        ? [current, ...suffixes.filter((suffix) => suffix !== current)]
        : suffixes;
    return ordered.filter((value, index) => ordered.indexOf(value) === index);
}

function getSearchCombinedModePlan() {
    const current = getCombinedMode();
    const other = current === COMBINED_MODE.nonactive
        ? COMBINED_MODE.active
        : COMBINED_MODE.nonactive;
    return [current, other];
}

function getNonTodosSubjectOptionIds() {
    return getSubjectToggleOptions()
        .filter((entry) => entry.id !== SUBJECT_TOGGLE_ALL)
        .map((entry) => entry.id);
}

function buildVerbSearchPlans({ tenseValue, group, isNonactive, verbMeta }) {
    const stateMode = group === CONJUGATION_GROUPS.universal ? "universal" : "standard";
    const resolvedMeta = verbMeta || getVerbInputMeta();
    const objectPrefixes = getObjectPrefixesForTransitividad();
    const objectPrefixGroups = isNonactive
        ? getNonactiveObjectPrefixGroups(resolvedMeta).groups
        : buildObjectPrefixGroups(objectPrefixes);
    const subjectOptionIds = getNonTodosSubjectOptionIds();
    const fallbackSubject = subjectOptionIds[0] || SUBJECT_TOGGLE_ALL;
    let storedSubject = "";
    let storedPreferred = "";
    const subjectKeys = [];
    objectPrefixGroups.forEach((objectGroup) => {
        const groupKey = objectGroup.prefixes.join("|") || "intrans";
        const subjectKey = `${stateMode}|${tenseValue}|${groupKey}`;
        subjectKeys.push(subjectKey);
        const stored = getToggleStateValue(SubjectToggleState, subjectKey);
        if (stored && stored !== SUBJECT_TOGGLE_ALL && subjectOptionIds.includes(stored)) {
            if (objectGroup.prefixes.includes("ki")) {
                storedPreferred = stored;
            } else if (!storedSubject) {
                storedSubject = stored;
            }
        }
    });
    const baseSubject = storedPreferred || storedSubject;
    const subjectPlan = buildSearchOptionPlan(subjectOptionIds, baseSubject, fallbackSubject);
    const objectPlans = objectPrefixGroups.map((objectGroup) => {
        const prefixes = objectGroup.prefixes;
        const groupKey = prefixes.join("|") || "intrans";
        const objectStateKey = getObjectStateKey({
            groupKey,
            tenseValue,
            mode: stateMode,
            isNonactive,
        });
        const stored = getToggleStateValue(ObjectToggleState, objectStateKey);
        const fallbackObject = getPreferredObjectPrefix(prefixes);
        const options = buildSearchOptionPlan(prefixes, stored, fallbackObject);
        return {
            objectStateKey,
            options,
            base: options[0] || "",
        };
    });
    return { subjectPlan, subjectKeys, objectPlans };
}

function buildNounSearchPlans({ tenseValue, verbMeta }) {
    const nominalSearchCombinedMode = getResolvedNominalCombinedModeForTense(
        tenseValue,
        getCombinedMode(),
    );
    const prefixes = Array.from(SUSTANTIVO_VERBAL_PREFIXES);
    const groupKey = prefixes.join("|");
    const subjectKey = `noun|${tenseValue}|${groupKey}`;
    const isPotencialHabitual = isPotencialHabitualTense(tenseValue);
    const isPotencialHabitualIntransitive = isPotencialHabitual
        && nominalSearchCombinedMode === COMBINED_MODE.nonactive
        && getBaseObjectSlots(verbMeta) <= 0;
    const usePotencialHabitualNonactiveSubjects = isPotencialHabitual
        && nominalSearchCombinedMode === COMBINED_MODE.nonactive
        && !isPotencialHabitualIntransitive;
    const subjectOptions = usePotencialHabitualNonactiveSubjects
        ? getPotencialHabitualNonactiveSubjectToggleOptions()
        : getSubjectToggleOptions();
    const subjectOptionIds = subjectOptions
        .filter((entry) => entry.id !== SUBJECT_TOGGLE_ALL)
        .map((entry) => entry.id);
    const fallbackSubject = getDefaultNounSubjectId(subjectOptions) || subjectOptionIds[0] || SUBJECT_TOGGLE_ALL;
    let subjectPlan = [];
    if (isNonanimateNounTense(tenseValue) || isPotencialHabitualIntransitive) {
        const nonanimateId = getNonanimateSubjectId();
        subjectPlan = [nonanimateId || fallbackSubject];
    } else {
        const stored = getToggleStateValue(SubjectToggleState, subjectKey);
        subjectPlan = buildSearchOptionPlan(subjectOptionIds, stored, fallbackSubject);
    }
    const objectStateKey = getObjectStateKey({ groupKey, tenseValue, mode: "noun" });
    const slotPlanBundle = getNounObjectSlotPlansFromMeta(verbMeta, tenseValue, {
        combinedMode: nominalSearchCombinedMode,
    });
    const objectSlotPlans = slotPlanBundle.slotPlans.map((slotPlan) => {
        const slotStateKey = getNounObjectSlotStateKey(objectStateKey, slotPlan.id);
        const stored = getToggleStateValue(ObjectToggleState, slotStateKey);
        const options = buildSearchOptionPlan(
            slotPlan.toggleValues,
            stored,
            slotPlan.preferredId
        );
        return {
            slotId: slotPlan.id,
            objectStateKey: slotStateKey,
            options,
            base: options[0] || "",
        };
    });
    const primaryPlan = objectSlotPlans[0] || {
        slotId: "object",
        objectStateKey,
        options: [""],
        base: "",
    };
    return {
        subjectPlan,
        subjectKey,
        objectPlan: primaryPlan.options,
        objectStateKey: primaryPlan.objectStateKey,
        objectSlotPlans,
    };
}
