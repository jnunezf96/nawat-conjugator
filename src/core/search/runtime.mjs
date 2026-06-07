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

export function createSearchRuntimeApi(targetObject = globalThis) {
    function splitSearchInput(rawValue) {
        const raw = String(rawValue || "");
        return { base: raw, query: "", hasQuery: false };
    }

    function getRawInputTiCausativeMetadata(rawValue = "") {
        const raw = String(rawValue || "");
        const movingTargetParsed = targetObject.parseMovingTargetRegexInput(raw);
        if (movingTargetParsed.isValid) {
            const inline = targetObject.parseInlineTiCausativeClassFromBase(
                targetObject.collapseSerialStemDashInput(movingTargetParsed.coreText || "")
            );
            const adjacentIntransitiveEmbed = movingTargetParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive
                ? targetObject.getMovingTargetAdjacentEmbedParts(inline.base || movingTargetParsed.coreText || "")
                : null;
            const movingTargetDashPrefix = movingTargetParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive
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
                hasExternalObjectDash: movingTargetParsed.transitivity !== targetObject.COMPOSER_TRANSITIVITY.intransitive,
                semanticObjectSlotCount: movingTargetParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive
                    ? 2
                    : (movingTargetParsed.transitivity === targetObject.COMPOSER_TRANSITIVITY.transitive ? 1 : 0),
                lexicalCompoundEmbedCount: adjacentIntransitiveEmbed ? 1 : 0,
                isRegexEnvelope: true,
            };
        }
        const inline = targetObject.parseInlineTiCausativeClassFromBase(targetObject.collapseSerialStemDashInput(raw));
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
            targetObject.VerbInputState.lastNonSearchValue = parts.base;
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
        const resolver = typeof targetObject.resolveOrdinaryNncFixture === "function"
            ? targetObject.resolveOrdinaryNncFixture
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

    function isNominalTenseMode(mode = targetObject.getActiveTenseMode()) {
        return mode === targetObject.TENSE_MODE.sustantivo
            || mode === targetObject.TENSE_MODE.adjetivo
            || mode === targetObject.TENSE_MODE.adverbio;
    }

    function getCurrentSearchTense() {
        const selectionState = targetObject.buildConjugationSelectionState();
        return selectionState.group === targetObject.CONJUGATION_GROUPS.universal
            ? selectionState.universalTenseValue
            : selectionState.tenseValue;
    }

    function getSearchModeGroups(mode) {
        return isNominalTenseMode(mode)
            ? [targetObject.CONJUGATION_GROUPS.tense]
            : [targetObject.CONJUGATION_GROUPS.tense, targetObject.CONJUGATION_GROUPS.universal];
    }

    function getSearchGroupTenseOrder(mode, group) {
        if (isNominalTenseMode(mode)) {
            return targetObject.getTenseOrderForMode(mode);
        }
        if (group === targetObject.CONJUGATION_GROUPS.universal) {
            return targetObject.PRETERITO_UNIVERSAL_ORDER.slice();
        }
        return targetObject.getTenseOrderForMode(targetObject.TENSE_MODE.verbo);
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
        const activeMode = targetObject.getActiveTenseMode();
        const activeSelectionState = targetObject.getCurrentResolvedConjugationSelectionState({
            tenseMode: activeMode,
        });
        const activeGroup = isNominalTenseMode(activeMode)
            ? targetObject.CONJUGATION_GROUPS.tense
            : activeSelectionState.group;
        const currentTense = activeGroup === targetObject.CONJUGATION_GROUPS.universal
            ? activeSelectionState.universalTenseValue
            : activeSelectionState.tenseValue;

        addGroup(activeMode, activeGroup, currentTense);
        getSearchModeGroups(activeMode)
            .filter((group) => group !== activeGroup)
            .forEach((group) => addGroup(activeMode, group));

        [targetObject.TENSE_MODE.verbo, targetObject.TENSE_MODE.sustantivo, targetObject.TENSE_MODE.adjetivo, targetObject.TENSE_MODE.adverbio]
            .filter(Boolean)
            .filter((mode) => mode !== activeMode)
            .forEach((mode) => {
                getSearchModeGroups(mode).forEach((group) => addGroup(mode, group));
            });

        return plan;
    }

    function getNounPossessorKey(tenseValue) {
        const groupKey = targetObject.SUSTANTIVO_VERBAL_PREFIXES.join("|");
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
        const stored = targetObject.getToggleStateValue(targetObject.PossessorToggleState, possessorKey);
        const fallback = getDefaultPossessorForTense(tenseValue);
        const base = stored === undefined ? fallback : stored;
        if (targetObject.isPotencialProfileTense(tenseValue) || targetObject.isPatientivoAdjectiveTense(tenseValue)) {
            return [""];
        }
        const values = targetObject.POSSESSIVE_PREFIXES.map((entry) => entry.value);
        const ordered = [base, ...values.filter((value) => value !== base)];
        return ordered.filter((value, index) => ordered.indexOf(value) === index);
    }

    function isNonanimateNounTense(tenseValue) {
        if (targetObject.NONANIMATE_NOUN_TENSES instanceof Set && targetObject.NONANIMATE_NOUN_TENSES.size > 0) {
            return targetObject.NONANIMATE_NOUN_TENSES.has(tenseValue);
        }
        return tenseValue === "sustantivo-verbal"
            || tenseValue === "instrumentivo"
            || tenseValue === "calificativo-instrumentivo";
    }

    function getNonanimateSubjectId() {
        const match = targetObject.SUBJECT_COMBINATIONS.find((entry) => (
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
        if (!base || base === targetObject.SUBJECT_TOGGLE_ALL || base === targetObject.OBJECT_TOGGLE_ALL) {
            base = list.includes(fallback) ? fallback : list[0];
        }
        const ordered = [base, ...list.filter((value) => value !== base)];
        return ordered.filter((value, index) => ordered.indexOf(value) === index);
    }

    function getNounDerivationTypeFromMeta(verbMeta) {
        if (Object.values(targetObject.DERIVATION_TYPE).includes(verbMeta?.derivationType)) {
            return verbMeta.derivationType;
        }
        return targetObject.getActiveDerivationType();
    }

    function getNominalAvailableObjectSlots(verbMeta, tenseValue = "", options = {}) {
        const embeddedSlots = Number.isFinite(verbMeta?.embeddedValenceCount) ? verbMeta.embeddedValenceCount : 0;
        const fusionObjectSlots = targetObject.getFusionObjectSlots(verbMeta);
        const resolvedCombinedMode = options.combinedMode || targetObject.getCombinedMode();
        const shouldUseNonactiveSlots = resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive
            && (
                targetObject.isPotencialHabitualTense(tenseValue)
                || tenseValue === "calificativo-instrumentivo"
            );
        const valency = targetObject.getValencyFromDirectActive(verbMeta);
        const baseObjectSlots = shouldUseNonactiveSlots
            ? Number(valency?.nonactiveSlots || 0)
            : Number(valency?.activeSlots || 0);
        return Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, baseObjectSlots - fusionObjectSlots - embeddedSlots));
    }

    function getNounObjectSlotSummary(verbMeta, tenseValue = "", options = {}) {
        const derivationType = getNounDerivationTypeFromMeta(verbMeta);
        const derivationValencyDelta = targetObject.getDerivationValencyDelta(derivationType);
        if (targetObject.isPotencialTroncoNajActiveTense(tenseValue)) {
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
            return targetObject.getDefaultOutputToggleSelection({
                context: "noun-primary-object",
                values,
            });
        }
        return targetObject.getDefaultOutputToggleSelection({
            context: "noun-extra-object",
            values,
            isAddedSlot,
        });
    }

    function getAllowedNounObjectPrefixesFromMeta(verbMeta, tenseValue, options = {}) {
        const isTransitiveVerb = targetObject.getBaseObjectSlots(verbMeta) > 0;
        const slotSummary = getNounObjectSlotSummary(verbMeta, tenseValue, options);
        const allowsObjectPrefix = slotSummary.availableObjectSlots > 0;
        const hasOnlyDerivedSlot = slotSummary.derivedAddedSlots > 0 && slotSummary.directObjectSlots <= 0;
        const nounTransitivePrefixes = Array.from(targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
        const isCalificativoInstrumentivo = tenseValue === "calificativo-instrumentivo";
        const isLocativoTemporal = tenseValue === "locativo-temporal";
        const isSustantivoVerbal = tenseValue === "sustantivo-verbal";
        const isPotencial = tenseValue === "potencial";
        const isAdjetivoWrapper = targetObject.isPotencialActiveTense(tenseValue)
            || targetObject.isPotencialHabitualTense(tenseValue);
        const resolvedCombinedMode = options.combinedMode || targetObject.getCombinedMode();
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
            if (resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive) {
                return [
                    ...Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS),
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
        const nounTransitivePrefixes = Array.from(targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES);
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
            const options = targetObject.getObjectToggleOptions(slotPlan.toggleValues, {
                includeAll: true,
                labelForPrefix: targetObject.getNonspecificToggleLabel,
                isNawat,
            });
            const showToggle = slotPlan.toggleValues.length > 1;
            const storedValue = targetObject.getToggleStateValue(targetObject.ObjectToggleState, stateKey);
            const isStoredValid = storedValue !== undefined
                && (
                    slotPlan.toggleValues.includes(storedValue)
                    || (showToggle && storedValue === targetObject.OBJECT_TOGGLE_ALL)
                );
            let activeId = isStoredValid ? storedValue : slotPlan.preferredId;
            if (activeId !== targetObject.OBJECT_TOGGLE_ALL && !slotPlan.toggleValues.includes(activeId)) {
                activeId = slotPlan.toggleValues[0] || "";
            }
            if (showToggle && !isStoredValid && activeId === "") {
                activeId = slotPlan.preferredId || slotPlan.toggleValues[0] || "";
            }
            targetObject.setToggleStateValue(targetObject.ObjectToggleState, stateKey, activeId, { syncLock: false });
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
                const values = slotState.activeId === targetObject.OBJECT_TOGGLE_ALL
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
        if (targetObject.getCombinedMode() !== targetObject.COMBINED_MODE.nonactive) {
            return [null];
        }
        if (targetObject.shouldForceAllNonactiveOptions()) {
            return [null];
        }
        const verb = verbMeta.verb;
        const analysisVerb = verbMeta.analysisVerb || verb;
        const isTransitive = targetObject.isNonactiveTransitiveVerb(targetObject.getCurrentObjectPrefix(), verbMeta);
        const options = targetObject.resolveLiveNonactiveOptions({
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
        const current = targetObject.getSelectedNonactiveSuffix();
        const ordered = current && suffixes.includes(current)
            ? [current, ...suffixes.filter((suffix) => suffix !== current)]
            : suffixes;
        return ordered.filter((value, index) => ordered.indexOf(value) === index);
    }

    function getSearchCombinedModePlan() {
        const current = targetObject.getCombinedMode();
        const other = current === targetObject.COMBINED_MODE.nonactive
            ? targetObject.COMBINED_MODE.active
            : targetObject.COMBINED_MODE.nonactive;
        return [current, other];
    }

    function getNonTodosSubjectOptionIds() {
        return targetObject.getSubjectToggleOptions()
            .filter((entry) => entry.id !== targetObject.SUBJECT_TOGGLE_ALL)
            .map((entry) => entry.id);
    }

    function buildVerbSearchPlans({ tenseValue, group, isNonactive, verbMeta }) {
        const stateMode = group === targetObject.CONJUGATION_GROUPS.universal ? "universal" : "standard";
        const resolvedMeta = verbMeta || targetObject.getVerbInputMeta();
        const objectPrefixes = targetObject.getObjectPrefixesForTransitividad();
        const objectPrefixGroups = isNonactive
            ? targetObject.getNonactiveObjectPrefixGroups(resolvedMeta).groups
            : targetObject.buildObjectPrefixGroups(objectPrefixes);
        const subjectOptionIds = getNonTodosSubjectOptionIds();
        const fallbackSubject = subjectOptionIds[0] || targetObject.SUBJECT_TOGGLE_ALL;
        let storedSubject = "";
        let storedPreferred = "";
        const subjectKeys = [];
        objectPrefixGroups.forEach((objectGroup) => {
            const groupKey = objectGroup.prefixes.join("|") || "intrans";
            const subjectKey = `${stateMode}|${tenseValue}|${groupKey}`;
            subjectKeys.push(subjectKey);
            const stored = targetObject.getToggleStateValue(targetObject.SubjectToggleState, subjectKey);
            if (stored && stored !== targetObject.SUBJECT_TOGGLE_ALL && subjectOptionIds.includes(stored)) {
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
            const objectStateKey = targetObject.getObjectStateKey({
                groupKey,
                tenseValue,
                mode: stateMode,
                isNonactive,
            });
            const stored = targetObject.getToggleStateValue(targetObject.ObjectToggleState, objectStateKey);
            const fallbackObject = targetObject.getPreferredObjectPrefix(prefixes);
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
        const nominalSearchCombinedMode = targetObject.getResolvedNominalCombinedModeForTense(
            tenseValue,
            targetObject.getCombinedMode(),
        );
        const prefixes = Array.from(targetObject.SUSTANTIVO_VERBAL_PREFIXES);
        const groupKey = prefixes.join("|");
        const subjectKey = `noun|${tenseValue}|${groupKey}`;
        const isPotencialHabitual = targetObject.isPotencialHabitualTense(tenseValue);
        const isPotencialHabitualIntransitive = isPotencialHabitual
            && nominalSearchCombinedMode === targetObject.COMBINED_MODE.nonactive
            && targetObject.getBaseObjectSlots(verbMeta) <= 0;
        const usePotencialHabitualNonactiveSubjects = isPotencialHabitual
            && nominalSearchCombinedMode === targetObject.COMBINED_MODE.nonactive
            && !isPotencialHabitualIntransitive;
        const subjectOptions = usePotencialHabitualNonactiveSubjects
            ? targetObject.getPotencialHabitualNonactiveSubjectToggleOptions()
            : targetObject.getSubjectToggleOptions();
        const subjectOptionIds = subjectOptions
            .filter((entry) => entry.id !== targetObject.SUBJECT_TOGGLE_ALL)
            .map((entry) => entry.id);
        const fallbackSubject = targetObject.getDefaultNounSubjectId(subjectOptions) || subjectOptionIds[0] || targetObject.SUBJECT_TOGGLE_ALL;
        let subjectPlan = [];
        if (isNonanimateNounTense(tenseValue) || isPotencialHabitualIntransitive) {
            const nonanimateId = getNonanimateSubjectId();
            subjectPlan = [nonanimateId || fallbackSubject];
        } else {
            const stored = targetObject.getToggleStateValue(targetObject.SubjectToggleState, subjectKey);
            subjectPlan = buildSearchOptionPlan(subjectOptionIds, stored, fallbackSubject);
        }
        const objectStateKey = targetObject.getObjectStateKey({ groupKey, tenseValue, mode: "noun" });
        const slotPlanBundle = getNounObjectSlotPlansFromMeta(verbMeta, tenseValue, {
            combinedMode: nominalSearchCombinedMode,
        });
        const objectSlotPlans = slotPlanBundle.slotPlans.map((slotPlan) => {
            const slotStateKey = getNounObjectSlotStateKey(objectStateKey, slotPlan.id);
            const stored = targetObject.getToggleStateValue(targetObject.ObjectToggleState, slotStateKey);
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

    return {
        NOUN_OBJECT_SLOT_SCHEMA,
        splitSearchInput,
        getRawInputTiCausativeMetadata,
        getSearchParts,
        parseSearchQueryDirectives,
        getSearchQueryDirectives,
        rememberNonSearchValue,
        getSearchInputBase,
        isComposerTemplateOnlyBaseValue,
        getSearchQueryInfo,
        getOrdinaryNncSearchCandidateInfo,
        isOrdinaryNncSearchCandidate,
        isSearchModeInput,
        normalizeConjugationSearchText,
        matchesSearchVariant,
        isNominalTenseMode,
        getCurrentSearchTense,
        getSearchModeGroups,
        getSearchGroupTenseOrder,
        buildSearchPlanAcrossModes,
        getNounPossessorKey,
        getDefaultPossessorForTense,
        getSearchPossessorPlan,
        isNonanimateNounTense,
        getNonanimateSubjectId,
        buildSearchOptionPlan,
        getNounDerivationTypeFromMeta,
        getNominalAvailableObjectSlots,
        getNounObjectSlotSummary,
        getNounObjectSlotStateKey,
        getPreferredNounObjectSlotPrefix,
        getAllowedNounObjectPrefixesFromMeta,
        getNounObjectSlotPlansFromMeta,
        buildNounObjectSlotToggleStates,
        buildNounObjectSlotSelectionModels,
        iterateNounObjectSlotSelections,
        getSearchNonactiveSuffixPlan,
        getSearchCombinedModePlan,
        getNonTodosSubjectOptionIds,
        buildVerbSearchPlans,
        buildNounSearchPlans,
    };
}

export function installSearchRuntimeGlobals(targetObject = globalThis) {
    const api = createSearchRuntimeApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
