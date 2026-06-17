// Native wrapper generated from src/ui/state.js.

export function createUiStateApi(targetObject = globalThis) {
    function getSubjectPersonSelections() {
      const selections = [];
      targetObject.SUBJECT_PERSON_NUMBER_ORDER.forEach(number => {
        targetObject.SUBJECT_PERSON_GROUPS.forEach(group => {
          const selection = group[number];
          if (selection) {
            selections.push({
              group,
              selection,
              number
            });
          }
        });
      });
      return selections;
    }
    function getSubjectCombinationId(subjectPrefix = "", subjectSuffix = "") {
      const match = targetObject.SUBJECT_COMBINATIONS.find(entry => (entry?.subjectPrefix || "") === String(subjectPrefix || "") && (entry?.subjectSuffix || "") === String(subjectSuffix || ""));
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
      const syllables = targetObject.splitVerbSyllables(stem);
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
      const forms = String(value || "").split(/\s*\/\s*/g).map(form => form.trim()).filter(Boolean);
      if (!forms.length) {
        return String(value || "");
      }
      const deduped = Array.from(new Set(forms.map(form => buildReduplicatedSurfaceForm(form, options)).filter(Boolean)));
      return deduped.join(" / ");
    }
    function splitConjugationDisplayForms(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(form => form.trim()).filter(Boolean);
    }
    function getStateResultFrame(result = null) {
      return (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
    }
    function getStateResultFramePayload(result = null) {
      const grammarFrame = getStateResultFrame(result);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function hasStateResultFrame(result = null) {
      return Boolean(getStateResultFramePayload(result));
    }
    function getStateFrameResultSurfaceForms(result = null) {
      const frameResult = getStateResultFramePayload(result);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      return forms.flatMap(form => splitConjugationDisplayForms(form)).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
    }
    function getStateResultSurfaceForms(result = null) {
      const frameResult = getStateResultFramePayload(result);
      const hasResultFrame = Boolean(frameResult);
      const forms = [...getStateFrameResultSurfaceForms(result)];
      if (hasResultFrame) {
        return forms.flatMap(form => splitConjugationDisplayForms(form)).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
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
      return forms.flatMap(form => splitConjugationDisplayForms(form)).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
    }
    function getStateResultDisplaySurface(result = null) {
      return getStateResultSurfaceForms(result).join(" / ");
    }
    function getStateNum1Num2Surface(connector = null) {
      const framedSurface = getStateResultSurfaceForms(connector)[0] || "";
      if (framedSurface) {
        return framedSurface;
      }
      if (hasStateResultFrame(connector)) {
        return "";
      }
      const surface = String(connector?.surface || "").trim();
      return surface === "—" ? "" : surface;
    }
    function getNawatLinkedGrammarPathStageSourceVerb(stage = null) {
      const nextSource = stage?.nextSource && typeof stage.nextSource === "object" ? stage.nextSource : null;
      const nextSourceSurface = getPrimaryNawatRouteSurfaceForm(nextSource);
      if (nextSourceSurface) {
        return nextSourceSurface;
      }
      if (hasStateResultFrame(nextSource)) {
        return "";
      }
      const stageSurface = getPrimaryNawatRouteSurfaceForm(stage);
      if (hasStateResultFrame(stage)) {
        return stageSurface || "";
      }
      const sourceInput = String(nextSource?.sourceVerb || stage?.sourceVerb || stage?.inputValue || stage?.renderVerb || "").trim();
      if (sourceInput && sourceInput !== "—") {
        return sourceInput;
      }
      const sourceVerb = String(stage?.surface || "").trim();
      return sourceVerb === "—" ? "" : sourceVerb;
    }
    function getNawatLinkedGrammarPathStageDisplaySurface(stage = null) {
      const nextSource = stage?.nextSource && typeof stage.nextSource === "object" ? stage.nextSource : null;
      const nextSourceSurface = getStateResultDisplaySurface(nextSource);
      if (nextSourceSurface) {
        return nextSourceSurface;
      }
      if (hasStateResultFrame(nextSource)) {
        return "";
      }
      const stageSurface = getStateResultDisplaySurface(stage);
      if (stageSurface) {
        return stageSurface;
      }
      if (hasStateResultFrame(stage)) {
        return "";
      }
      const displaySurface = String(nextSource?.displaySurface || stage?.displaySurface || stage?.surface || "").trim();
      return displaySurface === "—" ? "" : displaySurface;
    }
    function buildReduplicatedConjugationResult(result = {}, options = {}) {
      const source = result && typeof result === "object" ? result : {};
      const sourceSurface = getPrimaryNawatRouteSurfaceForm(source);
      const reduplicatedResult = reduplicateConjugationDisplay(sourceSurface, options);
      return {
        ...source,
        result: reduplicatedResult,
        surfaceForms: splitConjugationDisplayForms(reduplicatedResult)
      };
    }
    function getNominalSubjectSelectionEntries({
      mode = getActiveTenseMode(),
      tenseValue = ""
    } = {}) {
      const baseSelections = getSubjectPersonSelections().map(({
        group,
        selection,
        number
      }) => ({
        group,
        selection,
        displaySelection: selection,
        number,
        toggleId: getSubjectCombinationId(selection?.subjectPrefix || "", selection?.subjectSuffix || ""),
        displayPersonSubLabel: "",
        useReduplicatedSingularSurface: false
      }));
      if (mode !== targetObject.TENSE_MODE.adjetivo) {
        return baseSelections;
      }
      const adjectiveSelections = [];
      baseSelections.forEach(entry => {
        const singularGroupSelection = entry.group?.singular || entry.selection;
        const pushDistributiveEntry = (selectionOverride, displayPersonSubLabel) => {
          adjectiveSelections.push({
            ...entry,
            selection: selectionOverride,
            displayPersonSubLabel,
            useReduplicatedSingularSurface: true
          });
        };
        const isFirstPlural = entry.selection?.subjectPrefix === "ti" && entry.selection?.subjectSuffix === "t";
        const isSecondPlural = entry.selection?.subjectPrefix === "an" && entry.selection?.subjectSuffix === "t";
        const isThirdPlural = entry.selection?.subjectPrefix === "" && entry.selection?.subjectSuffix === "t";
        if (isFirstPlural) {
          adjectiveSelections.push(entry);
          pushDistributiveEntry({
            subjectPrefix: "ti",
            subjectSuffix: ""
          }, targetObject.ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.first);
          return;
        }
        if (isSecondPlural) {
          adjectiveSelections.push(entry);
          pushDistributiveEntry({
            subjectPrefix: "an",
            subjectSuffix: ""
          }, targetObject.ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.second);
          return;
        }
        if (!isThirdPlural) {
          adjectiveSelections.push(entry);
          return;
        }
        adjectiveSelections.push(entry);
        pushDistributiveEntry(singularGroupSelection, targetObject.ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.thirdHuman);
      });
      return adjectiveSelections;
    }
    function getPersonGroupLabel(group, isNawat) {
      if (!group) {
        return "";
      }
      const labelKey = group.labelKey || group.id || "";
      const labelEntry = labelKey ? targetObject.PERSON_GROUP_LABELS[labelKey] : null;
      const fallback = getLocalizedLabel(group, isNawat, "");
      return getLocalizedLabel(labelEntry, isNawat, fallback);
    }
    function getPersonSubLabel(selection, isNawat) {
      if (!selection) {
        return "";
      }
      const labelKey = selection.personSubKey || selection.labelKey || selection.id || "";
      const labelEntry = labelKey ? targetObject.PERSON_SUB_LABELS[labelKey] : null;
      const fallback = getLocalizedLabel(selection, isNawat, "");
      return getLocalizedLabel(labelEntry, isNawat, fallback);
    }
    function getSubjectPersonLabel(group, selection, isNawat) {
      const baseLabel = getPersonGroupLabel(group, isNawat);
      if (!selection) {
        return baseLabel;
      }
      const numberKey = selection.subjectSuffix === "t" ? "plural" : "singular";
      const numberLabels = targetObject.NUMBER_LABELS[numberKey] || {};
      const numberLabel = isNawat ? numberLabels.na || numberKey : numberLabels.es || numberKey;
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
        const value = isNawat ? entry.labelNa ?? entry.labelEs : entry.labelEs ?? entry.labelNa;
        return value || fallback;
      }
      return fallback;
    }
    function getToggleLabel(key, isNawat, fallback = "") {
      return getLocalizedLabel(targetObject.TOGGLE_LABELS[key], isNawat, fallback);
    }
    function getPlaceholderLabel(key, isNawat, fallback = "") {
      return getLocalizedLabel(targetObject.PLACEHOLDER_LABELS[key], isNawat, fallback);
    }
    function getVerbBlockLabel(key, isNawat, fallback = "") {
      return getLocalizedLabel(targetObject.VERB_BLOCK_LABELS[key], isNawat, fallback);
    }
    function getIsNawat() {
      return Boolean(targetObject.document.getElementById("language")?.checked);
    }
    function getLocalizedDescription(entry, isNawat) {
      if (!entry) {
        return "";
      }
      if (typeof entry === "string") {
        return entry;
      }
      if (typeof entry === "object") {
        return isNawat ? entry.labelNa || entry.labelEs || "" : entry.labelEs || entry.labelNa || "";
      }
      return "";
    }
    function getPretUniversalClassDetail(tenseValue) {
      const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
      if (!classKey) {
        return null;
      }
      return targetObject.PRETERITO_CLASS_DETAIL_BY_KEY[classKey] || null;
    }
    function getObjectStateKey({
      groupKey,
      tenseValue = "",
      mode = "standard",
      isNonactive = false
    }) {
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
      clearToggleStateByPrefix(targetObject.SubjectToggleState, `standard|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.SubjectToggleState, `universal|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.SubjectToggleState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `standard|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `standard|nonactive|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `universal|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `universal|nonactive|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.PossessorToggleState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.PatientivoOwnershipState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.PatientivoNominalSuffixState, `noun|${tenseValue}|`);
      const appliedFragments = [`|standard|${tenseValue}|`, `|standard|nonactive|${tenseValue}|`, `|universal|${tenseValue}|`, `|universal|nonactive|${tenseValue}|`, `|noun|${tenseValue}|`];
      for (const appliedKey of Array.from(targetObject.DefaultToggleApplied)) {
        if (appliedFragments.some(fragment => appliedKey.includes(fragment))) {
          targetObject.DefaultToggleApplied.delete(appliedKey);
        }
      }
    }
    function getSubjectToggleOptions() {
      const isNawat = getIsNawat();
      const options = [{
        id: targetObject.SUBJECT_TOGGLE_ALL,
        label: getToggleLabel("all", isNawat, "todos"),
        subjectPrefix: null,
        subjectSuffix: null
      }];
      targetObject.SUBJECT_COMBINATIONS.forEach(combo => {
        const label = combo.subjectPrefix ? combo.subjectPrefix : "Ø";
        options.push({
          id: combo.id,
          label,
          subjectPrefix: combo.subjectPrefix,
          subjectSuffix: combo.subjectSuffix
        });
      });
      return options;
    }
    function getPotencialHabitualNonactiveSubjectToggleOptions() {
      const isNawat = getIsNawat();
      const options = [{
        id: targetObject.SUBJECT_TOGGLE_ALL,
        label: getToggleLabel("all", isNawat, "todos"),
        subjectPrefix: null,
        subjectSuffix: null
      }];
      const entries = Object.entries(targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP || {});
      const comboOrder = new Map(targetObject.SUBJECT_COMBINATIONS.map((combo, index) => [`${combo.subjectPrefix || ""}|${combo.subjectSuffix || ""}`, index]));
      entries.sort((a, b) => {
        const aMeta = a[1] || {};
        const bMeta = b[1] || {};
        const aKey = `${aMeta.pers1 || ""}|${aMeta.pers2 || ""}`;
        const bKey = `${bMeta.pers1 || ""}|${bMeta.pers2 || ""}`;
        const aRank = comboOrder.has(aKey) ? comboOrder.get(aKey) : Number.MAX_SAFE_INTEGER;
        const bRank = comboOrder.has(bKey) ? comboOrder.get(bKey) : Number.MAX_SAFE_INTEGER;
        return aRank - bRank;
      }).forEach(([prefix, mapped]) => {
        const subjectPrefix = mapped?.pers1 || "";
        const subjectSuffix = mapped?.pers2 || "";
        const subjectId = getSubjectCombinationId(subjectPrefix, subjectSuffix);
        if (!subjectId) {
          return;
        }
        options.push({
          id: subjectId,
          label: getPassiveToggleLabel(prefix, isNawat),
          subjectPrefix,
          subjectSuffix,
          title: targetObject.getNonactivePersonSub(prefix, isNawat)
        });
      });
      return options;
    }
    function getDefaultNounSubjectId(subjectOptions) {
      return targetObject.getDefaultOutputToggleSelection({
        context: "noun-subject",
        values: Array.isArray(subjectOptions) ? subjectOptions.map(entry => entry.id) : [],
        subjectOptions
      });
    }
    function getObjectToggleOptions(prefixes, options = {}) {
      const isNawat = options.isNawat ?? getIsNawat();
      const includeAll = options.includeAll !== false;
      const labelForPrefix = options.labelForPrefix;
      const list = [];
      if (includeAll) {
        list.push({
          id: targetObject.OBJECT_TOGGLE_ALL,
          label: getToggleLabel("all", isNawat, "todos"),
          prefix: null
        });
      }
      prefixes.forEach(prefix => {
        const label = labelForPrefix ? labelForPrefix(prefix, isNawat) : prefix || getToggleLabel("intransitive", isNawat, "intrans");
        list.push({
          id: prefix,
          label,
          prefix
        });
      });
      return list;
    }
    var VERB_OBJECT_SLOT_SCHEMA = Object.freeze([Object.freeze({
      id: "object",
      stateSuffix: "",
      datasetKey: "objectPrefix",
      exportKey: "objectToggle",
      exportHeader: "objeto",
      alwaysExport: true
    }), Object.freeze({
      id: "object2",
      stateSuffix: "indirect",
      datasetKey: "indirectObjectMarker",
      exportKey: "objectToggle2",
      exportHeader: "objeto 2",
      alwaysExport: true
    }), Object.freeze({
      id: "object3",
      stateSuffix: "object3",
      datasetKey: "thirdObjectMarker",
      exportKey: "objectToggle3",
      exportHeader: "objeto 3",
      alwaysExport: false
    })]);
    var DERIVATION_CONTROLLER_SLOT_PRIORITY = Object.freeze({
      // Literal keys/values replace DERIVATION_TYPE.* and getCanonicalSlotIdForRole()
      // to avoid cross-file initialization order dependencies.
      // DERIVATION_TYPE: direct="direct", causative="causative", applicative="applicative"
      // getCanonicalSlotIdForRole: shuntline1="object2", mainline="object"
      direct: Object.freeze(["object2", "object"]),
      causative: Object.freeze(["object2", "object"]),
      applicative: Object.freeze(["object", "object2"])
    });
    function getDerivationControllerSlotPriority(derivationType = "") {
      return DERIVATION_CONTROLLER_SLOT_PRIORITY[derivationType] || DERIVATION_CONTROLLER_SLOT_PRIORITY[targetObject.DERIVATION_TYPE.direct];
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
      visibleSlotIds = null
    }) {
      const parsedModeSlots = Number.isFinite(modeObjectSlots) ? Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(modeObjectSlots))) : 0;
      const hasExplicitVisibleSlots = Array.isArray(visibleSlotIds) && visibleSlotIds.length > 0;
      const visibleSlotSet = hasExplicitVisibleSlots ? new Set(visibleSlotIds) : null;
      const slotCapacity = hasExplicitVisibleSlots ? Math.max(1, Math.min(targetObject.MAX_OBJECT_SLOTS, visibleSlotIds.length)) : Math.max(1, parsedModeSlots);
      const allowIndirectBySlots = slotCapacity >= 2;
      const allowThirdObjectToggle = hasExplicitVisibleSlots ? visibleSlotSet.has("object3") : slotCapacity >= 3;
      const useValence3PlusRoleLabels = Number(activeValency) >= 3;
      const baseObjectLabel = getToggleLabel("object", isNawat, "Objeto");
      const primaryRoleLabel = derivationType === targetObject.DERIVATION_TYPE.applicative ? targetObject.getObjectRoleLabel("benefactive", isNawat) : targetObject.getObjectRoleLabel("direct", isNawat);
      return VERB_OBJECT_SLOT_SCHEMA.filter(slot => hasExplicitVisibleSlots ? visibleSlotSet.has(slot.id) : slot.id === "object" || slot.id === "object2" && allowIndirectObjectToggle || slot.id === "object3" && allowThirdObjectToggle).map(slot => {
        const isPrimary = slot.id === "object";
        const roleLabel = useValence3PlusRoleLabels ? targetObject.getValence3PlusSlotRoleLabel(slot.id, isNawat) : slot.id === "object2" ? targetObject.getObjectRoleLabel("indirect", isNawat) : slot.id === "object3" ? `${baseObjectLabel} 3` : primaryRoleLabel;
        const toggleValues = isPrimary ? Array.from(new Set(primaryTogglePrefixes)) : Array.from(new Set(indirectTogglePrefixes));
        const labelForPrefix = isPrimary ? !isNonactiveMode && allowIndirectBySlots && Number(activeValency) >= 4 ? getNonspecificToggleLabel : undefined : getNonspecificToggleLabel;
        const toggleAriaLabel = useValence3PlusRoleLabels ? targetObject.getValence3PlusSlotRoleLabel(slot.id, isNawat) : slot.id === "object" ? baseObjectLabel : `${baseObjectLabel} ${slot.id === "object2" ? "2" : "3"}`;
        return {
          ...slot,
          isPrimary,
          roleLabel,
          toggleValues,
          labelForPrefix,
          toggleAriaLabel
        };
      });
    }
    function getPassiveToggleLabel(prefix, isNawat = false) {
      const subject = targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
      if (!subject) {
        return prefix || getToggleLabel("intransitive", isNawat, "intrans");
      }
      return subject.pers1 || "Ø";
    }
    function getNonspecificToggleLabel(prefix) {
      return prefix || "Ø";
    }
    function getZeroObjectDisplayValue(value) {
      return value ? value : "Ø";
    }
    function isPotencialProfileTense(tenseValue = "") {
      return tenseValue === "potencial" || tenseValue === "potencial-habitual" || targetObject.ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue) || tenseValue === "pasado-remoto-adverbio-activo";
    }
    function isPotencialHabitualTense(tenseValue = "") {
      return tenseValue === "potencial-habitual";
    }
    function allowsCollapsedDerivedNounSlot({
      tenseValue = "",
      combinedMode = "",
      slotPlanBundle = null,
      derivationType = ""
    }) {
      if (!isPotencialHabitualTense(tenseValue) || combinedMode !== targetObject.COMBINED_MODE.nonactive) {
        return false;
      }
      if (getDerivationValencyDelta(derivationType) <= 0) {
        return false;
      }
      const availableSlots = Number.isFinite(slotPlanBundle?.availableObjectSlots) ? Number(slotPlanBundle.availableObjectSlots) : Array.isArray(slotPlanBundle?.slotPlans) ? slotPlanBundle.slotPlans.length : 0;
      return availableSlots <= 0;
    }
    function isPotencialActiveTense(tenseValue = "") {
      return targetObject.ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue) || tenseValue === "pasado-remoto-adverbio-activo";
    }
    function isPatientivoAdjectiveTense(tenseValue = "") {
      return targetObject.PATIENTIVO_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function getPatientivoAdjectiveSourceForTense(tenseValue = "") {
      return targetObject.PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE[tenseValue] || "";
    }
    function isIntransitiveOnlyActiveAdjectiveTense(tenseValue = "") {
      return targetObject.INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function isActiveAdjectiveTabTense(tenseValue = "") {
      return targetObject.ACTIVE_ADJECTIVE_TAB_TENSE_SET.has(tenseValue);
    }
    function isNonactiveAdjectiveTabTense(tenseValue = "") {
      return targetObject.NONACTIVE_ADJECTIVE_TAB_TENSE_SET.has(tenseValue);
    }
    function normalizeNawatPatientivoSourceFamily(patientivoSource = "") {
      const normalized = typeof targetObject.normalizeVerbDerivedPatientiveFamily === "function" ? targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource) : String(patientivoSource || "").trim();
      if (normalized === "pasivo") {
        return "passive";
      }
      return normalized;
    }
    function isNawatPatientivoNonactiveSource(patientivoSource = "") {
      const source = normalizeNawatPatientivoSourceFamily(patientivoSource);
      return source === "nonactive" || source === "passive" || source === "impersonal";
    }
    function getNominalSourceModeForTense(tenseValue = "", {
      patientivoSource = "",
      blockMode = null
    } = {}) {
      if (tenseValue === "patientivo") {
        return isNawatPatientivoNonactiveSource(patientivoSource) ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      }
      if (isPatientivoAdjectiveTense(tenseValue)) {
        return getPatientivoAdjectiveSourceForTense(tenseValue) === "nonactive" ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      }
      if (tenseValue === "locativo-temporal") {
        return blockMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      }
      if (tenseValue === "instrumentivo") {
        return targetObject.COMBINED_MODE.nonactive;
      }
      if (tenseValue === "sustantivo-verbal" || tenseValue === "potencial") {
        return targetObject.COMBINED_MODE.active;
      }
      if (isPotencialHabitualTense(tenseValue)) {
        return targetObject.COMBINED_MODE.nonactive;
      }
      return targetObject.COMBINED_MODE.active;
    }
    function getResolvedNominalCombinedModeForTense(tenseValue = "", fallbackCombinedMode = getCombinedMode()) {
      if (isActiveAdjectiveTabTense(tenseValue)) {
        return targetObject.COMBINED_MODE.active;
      }
      if (isNonactiveAdjectiveTabTense(tenseValue)) {
        return targetObject.COMBINED_MODE.nonactive;
      }
      if (isPatientivoAdjectiveTense(tenseValue) || isPotencialProfileTense(tenseValue)) {
        return getNominalSourceModeForTense(tenseValue);
      }
      return fallbackCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
    }
    function getPatientivoSourceTenseLabel(patientivoSource = "", isNawat = false) {
      const sourceKey = patientivoSource === "perfectivo" ? "patientivo-perfectivo" : patientivoSource === "imperfectivo" ? "patientivo-imperfectivo" : patientivoSource === "tronco-verbal" ? "patientivo-tronco" : "patientivo-pasivo";
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
      isNawat = false
    } = {}) {
      if (tenseValue === "patientivo") {
        return getPatientivoSourceTenseLabel(patientivoSource, isNawat);
      }
      if (isPatientivoAdjectiveTense(tenseValue)) {
        return getPatientivoSourceTenseLabel(getPatientivoAdjectiveSourceForTense(tenseValue), isNawat);
      }
      if (isPotencialTroncoNajActiveTense(tenseValue)) {
        const sourceLabelFull = getVerbBlockLabel("patientivo-tronco-noun", isNawat, "patientivo · sustantivo de tronco verbal");
        const separatorIndex = sourceLabelFull.indexOf("·");
        return separatorIndex === -1 ? sourceLabelFull.trim() : sourceLabelFull.slice(separatorIndex + 1).trim();
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
      return getLocalizedLabel(targetObject.TENSE_LABELS[sourceTense], isNawat, sourceTense);
    }
    function getNominalDerivationModeForTense(tenseValue = "") {
      return isPotencialHabitualTense(tenseValue) ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active;
    }
    function normalizeHeaderLabelText(value = "") {
      return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
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
      labelValency = null
    } = {}) {
      const normalizedSourceMode = String(sourceMode || "").trim();
      const sourceLabel = (() => {
        if (normalizedSourceMode === targetObject.COMBINED_MODE.nonactive) {
          return getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], isNawat, "no activo");
        }
        if (!normalizedSourceMode || normalizedSourceMode === targetObject.COMBINED_MODE.active) {
          return getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-active"], isNawat, "activo");
        }
        return normalizedSourceMode;
      })();
      const sourcePrefix = "origen";
      const stemLabel = baseLabel || "";
      const sourcePart = `${sourcePrefix}: ${sourceLabel}`;
      const shouldShowSourceTense = shouldAppendNominalSourceTense(stemLabel, sourceTenseLabel);
      const sourceTensePart = shouldShowSourceTense && sourceTenseLabel ? `, ${sourceTenseLabel}` : "";
      const valencyPart = Number.isFinite(labelValency) ? ` · valencia total: ${labelValency}` : "";
      return stemLabel ? `${stemLabel} · ${sourcePart}${sourceTensePart}${valencyPart}` : `${sourcePart}${sourceTensePart}${valencyPart}`;
    }
    function isPotencialTroncoActiveTense(tenseValue = "") {
      return targetObject.TRONCO_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function isPotencialTroncoNajActiveTense(tenseValue = "") {
      return targetObject.TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function isSubjectlessNominalTense(tenseValue = "") {
      return tenseValue === "pasado-remoto-adverbio-activo";
    }
    function getPotencialActiveSourceTense(tenseValue = "") {
      if (targetObject.PERFECT_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue)) {
        return "perfecto";
      }
      if (tenseValue === "pasado-remoto-adverbio-activo") {
        return "pasado-remoto";
      }
      return "preterito";
    }
    function getActiveAdjectiveProfileType(tenseValue = "") {
      switch (tenseValue) {
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.preterito:
          return "adjetivo-activo-preterito-simple";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.perfecto:
          return "adjetivo-activo-preterito-compuesto";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik:
          return "adjetivo-tronco-preterito-simple";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik:
          return "adjetivo-tronco-preterito-compuesto";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj:
          return "adjetivo-tronco-naj-preterito-simple";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj:
          return "adjetivo-tronco-naj-preterito-compuesto";
        default:
          return "";
      }
    }
    function getNawatRouteProfileMap() {
      return targetObject.NAWAT_ROUTE_PROFILES && typeof targetObject.NAWAT_ROUTE_PROFILES === "object" ? targetObject.NAWAT_ROUTE_PROFILES : {};
    }
    const DISCONNECTED_NAWAT_ROUTE_IDS = new Set(["agentive-manner-adverb", "pasado-remoto-adverbio-activo"]);
    function isDisconnectedNawatRouteProfile(profile = null, routeKey = "") {
      const keys = [routeKey, profile?.id, profile?.canonicalId, profile?.routeTenseValue].map(value => String(value || "").trim()).filter(Boolean);
      return keys.some(key => DISCONNECTED_NAWAT_ROUTE_IDS.has(key));
    }
    function cloneNawatRouteProfile(profile = null, routeTenseValue = "") {
      if (!profile || typeof profile !== "object") {
        return null;
      }
      const hasRouteTenseValue = Object.prototype.hasOwnProperty.call(profile, "routeTenseValue");
      return {
        ...profile,
        routeTenseValue: hasRouteTenseValue ? profile.routeTenseValue || "" : routeTenseValue || "",
        stations: Array.isArray(profile.stations) ? profile.stations.filter(station => station && typeof station === "object").map(station => ({
          ...station
        })) : []
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
      const matched = Object.entries(profiles).find(([, profile]) => profile && typeof profile === "object" && (profile.id === key || profile.canonicalId === key || profile.routeTenseValue === key));
      return matched && !isDisconnectedNawatRouteProfile(matched[1], matched[0]) ? cloneNawatRouteProfile(matched[1], matched[0]) : null;
    }
    function getRouteTenseForNawatRoute(routeKey = "") {
      const profile = getNawatRouteProfile(routeKey);
      return profile?.routeTenseValue || "";
    }
    function getNawatRouteStationList(routeKey = "") {
      const profile = getNawatRouteProfile(routeKey);
      return profile && Array.isArray(profile.stations) ? profile.stations.map(station => ({
        ...station
      })) : [];
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
      targetVerb = ""
    } = {}) {
      const stem = String(routeStem || "").trim();
      const verbalizer = String(profile?.verbalizer || "").replace(/^-+/, "").trim();
      if (profile?.valency === "transitive" && stem && verbalizer) {
        return `(${stem})-(${verbalizer})`;
      }
      return wrapNawatRouteInputValue(targetVerb);
    }
    function getNawatRouteProfiles() {
      return Object.entries(getNawatRouteProfileMap()).map(([routeTenseValue, profile]) => cloneNawatRouteProfile(profile, routeTenseValue)).filter(profile => profile && profile.status !== "reserved" && !isDisconnectedNawatRouteProfile(profile, profile.routeTenseValue || ""));
    }
    function getNawatRouteStateStore() {
      if (typeof targetObject.NawatRouteState === "undefined" || !targetObject.NawatRouteState || typeof targetObject.NawatRouteState !== "object") {
        return {
          activeRoute: ""
        };
      }
      return targetObject.NawatRouteState;
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
      if (targetMode === "sustantivo" || targetMode === targetObject.TENSE_MODE.sustantivo) {
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
      return isPatientivoSurfaceRoute(profile) && !String(profile?.routeTenseValue || "").trim() && String(profile?.sourceCategory || "").trim() === "verb-patientivo-surface";
    }
    const NAWAT_PATIENTIVO_IMPERFECTIVE_SOURCE_TENSES = new Set(["presente", "presente-habitual", "presente-desiderativo", "imperfecto", "pasado-remoto", "futuro", "condicional", "imperativo"]);
    const NAWAT_PATIENTIVO_PERFECTIVE_SOURCE_TENSES = new Set(["preterito", "preterito-clase", "perfecto", "pluscuamperfecto", "condicional-perfecto"]);
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
      imperativo: "t"
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
      imperativo: "t"
    });
    const NAWAT_ROUTE_NONACTIVE_CORE_PATIENTIVO_TENSES = new Set(["presente", "preterito", "preterito-clase", "perfecto", "pluscuamperfecto", "condicional-perfecto", "imperativo"]);
    function getCanonicalNawatPatientivoSourceTenseValue(patientivoSource = "") {
      const source = normalizeNawatPatientivoSourceFamily(patientivoSource);
      if (source === "imperfectivo") {
        return "imperfecto";
      }
      if (source === "perfectivo" || isNawatPatientivoNonactiveSource(source)) {
        return "preterito";
      }
      return "presente";
    }
    function resolveNawatPatientivoRouteSourceClass({
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      const combinedMode = String(sourceCombinedMode || "").trim();
      if (combinedMode === targetObject.COMBINED_MODE.nonactive) {
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
      patientivoSource = ""
    } = {}) {
      const requestedPatientivoSource = normalizeNawatPatientivoSourceFamily(patientivoSource);
      const requestedNonactiveSource = isNawatPatientivoNonactiveSource(requestedPatientivoSource);
      const resolvedSourceCombinedMode = String(sourceCombinedMode || (requestedNonactiveSource ? targetObject.COMBINED_MODE.nonactive : "") || targetObject.COMBINED_MODE.active).trim();
      const resolvedSourceTenseValue = String(sourceTenseValue || getCanonicalNawatPatientivoSourceTenseValue(requestedPatientivoSource)).trim();
      const routeSourceClass = resolveNawatPatientivoRouteSourceClass({
        sourceTenseValue: resolvedSourceTenseValue,
        sourceCombinedMode: resolvedSourceCombinedMode
      });
      const resolvedPatientivoSource = requestedNonactiveSource && routeSourceClass === "nonactive" ? requestedPatientivoSource : routeSourceClass;
      const suffixByTense = isNawatRouteNonactiveSource({
        sourceCombinedMode: resolvedSourceCombinedMode,
        patientivoSource: resolvedPatientivoSource
      }) ? NAWAT_ROUTE_PATIENTIVO_NONACTIVE_SUFFIX_BY_TENSE : NAWAT_ROUTE_PATIENTIVO_ACTIVE_SUFFIX_BY_TENSE;
      const suffix = suffixByTense[resolvedSourceTenseValue] || (resolvedPatientivoSource === "perfectivo" ? "ti" : "t");
      const routeKey = isNawatPatientivoNonactiveSource(resolvedPatientivoSource) ? "patientivo-nonactive-t" : resolvedPatientivoSource === "perfectivo" ? "patientivo-perfective-ti-noun" : "patientivo-imperfective-t";
      return {
        sourceTenseValue: resolvedSourceTenseValue,
        sourceCombinedMode: resolvedSourceCombinedMode,
        patientivoSource: resolvedPatientivoSource,
        routeKey,
        suffix,
        surfaceSuffix: suffix ? `-${suffix}` : ""
      };
    }
    function resolveNawatVerbNounConversionRouteKeyForSource({
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      return resolveNawatPatientivoRouteSpec({
        sourceTenseValue,
        sourceCombinedMode
      }).routeKey;
    }
    function isNawatRouteNonactiveSource({
      sourceCombinedMode = "",
      patientivoSource = ""
    } = {}) {
      return String(sourceCombinedMode || "").trim() === targetObject.COMBINED_MODE.nonactive || isNawatPatientivoNonactiveSource(patientivoSource);
    }
    function getNawatRoutePatientivoSurfaceSpec(profile = null, {
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      if (!isPatientivoSurfaceRoute(profile)) {
        return null;
      }
      if (!isNawatDynamicPatientivoSurfaceRoute(profile)) {
        const staticSuffix = String(profile?.patientivoNominalSuffix || profile?.surfaceSuffix || "").replace(/^-+/, "");
        return {
          sourceTenseValue: sourceTenseValue || profile?.sourceTenseValue || "",
          sourceCombinedMode: sourceCombinedMode || profile?.sourceCombinedMode || profile?.combinedMode || "",
          patientivoSource: String(profile?.patientivoSource || "nonactive").trim(),
          suffix: staticSuffix,
          surfaceSuffix: staticSuffix ? `-${staticSuffix}` : ""
        };
      }
      const patientivoSource = String(profile?.patientivoSource || "nonactive").trim();
      const resolvedSourceCombinedMode = sourceCombinedMode || profile?.sourceCombinedMode || (isNawatPatientivoNonactiveSource(patientivoSource) ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active);
      const resolvedSourceTenseValue = sourceTenseValue || profile?.sourceTenseValue || getCanonicalNawatPatientivoSourceTenseValue(patientivoSource);
      const routeSpec = resolveNawatPatientivoRouteSpec({
        sourceTenseValue: resolvedSourceTenseValue,
        sourceCombinedMode: resolvedSourceCombinedMode,
        patientivoSource
      });
      const suffix = routeSpec.suffix || String(profile?.patientivoNominalSuffix || profile?.surfaceSuffix || "").replace(/^-+/, "") || "t";
      return {
        ...routeSpec,
        suffix,
        surfaceSuffix: suffix ? `-${suffix}` : ""
      };
    }
    function getNawatStaticRouteAndrewsRefs(profile = null, routeTarget = null) {
      if (isPatientivoSurfaceRoute(profile)) {
        const patientivoSource = String(routeTarget?.activePatientivoBranch || routeTarget?.patientivoSource || profile?.patientivoSource || "").trim();
        if (patientivoSource === "nonactive") {
          return ["Andrews Lesson 38"];
        }
        if (patientivoSource === "perfectivo" || patientivoSource === "imperfectivo") {
          return ["Andrews Lesson 39"];
        }
        return ["Andrews Lessons 38-39"];
      }
      if (String(profile?.routePlacement || "").trim() === "patientivo-tronco-conversion") {
        return String(profile?.structuralAnalogue || "").trim() === "nawat-transitive-route-no-andrews-suffix" ? [] : ["Andrews Lessons 54-55"];
      }
      if (profile?.curriculumRef?.source === "Andrews" && profile.curriculumRef.range) {
        return [`Andrews ${profile.curriculumRef.range}`];
      }
      return [];
    }
    function attachNawatStaticRouteGrammarFrame(record = null, {
      profile = null,
      routeStage = "resolve-route-target",
      generationAllowed = true,
      supported = true,
      targetSurface = "",
      diagnostics = []
    } = {}) {
      if (!record || typeof record !== "object" || typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      const routeProfile = profile && typeof profile === "object" ? profile : {};
      const sourceInput = String(record.sourceStem || record.sourceVerb || routeProfile.sourceStem || "").trim();
      const targetInput = String(record.activeStationInput || record.targetInput || record.targetVerb || record.activeStationVerb || "").trim();
      const routePlacement = String(routeProfile.routePlacement || record.routePlacement || "").trim();
      const structuralAnalogue = String(routeProfile.structuralAnalogue || record.structuralAnalogue || "").trim();
      const hasAndrewsRefs = getNawatStaticRouteAndrewsRefs(routeProfile, record).length > 0;
      const framedSurfaceForms = getStateResultSurfaceForms(record);
      const hasFramedSurfaceContract = hasStateResultFrame(record);
      const fallbackSurfaceForms = splitConjugationDisplayForms(targetSurface).filter((form, index, list) => form && form !== "—" && list.indexOf(form) === index);
      const targetSurfaceForms = framedSurfaceForms.length || hasFramedSurfaceContract ? framedSurfaceForms : fallbackSurfaceForms;
      const resolvedTargetSurface = targetSurfaceForms[0] || "";
      const evidenceStatus = isPatientivoSurfaceRoute(routeProfile) ? "patientivo-route-control" : routePlacement === "patientivo-tronco-conversion" && !hasAndrewsRefs ? "nawat-route-no-andrews-suffix" : "nawat-route-control";
      return targetObject.attachGrammarMetadataContract({
        ...record,
        surfaceForms: targetSurfaceForms
      }, {
        enumerable: false,
        metadataKind: record.outputKind || "nawat-static-route-target",
        unitKind: "nawat-route-control",
        routeFamily: routePlacement || routeProfile.denominalFamily || routeProfile.id || "nawat-static-route",
        routeStage,
        generationAllowed,
        supported,
        andrewsRefs: getNawatStaticRouteAndrewsRefs(routeProfile, record),
        nawatEvidenceRefs: ["data/static_modes.json"],
        evidenceStatus,
        diagnosticStatus: supported ? "route-control" : "blocked",
        surface: resolvedTargetSurface,
        surfaceForms: targetSurfaceForms,
        sourceInput,
        diagnostics,
        sourceContract: {
          unitKind: record.sourceMode || routeProfile.sourceMode || "",
          sourceMode: record.sourceMode || routeProfile.sourceMode || "",
          sourceTenseValue: record.sourceTenseValue || routeProfile.sourceTenseValue || "",
          sourceCombinedMode: record.sourceCombinedMode || routeProfile.sourceCombinedMode || "",
          sourceVerb: record.sourceVerb || "",
          sourceStem: record.sourceStem || "",
          sourceObjectPrefix: record.sourceObjectPrefix || ""
        },
        targetContract: {
          unitKind: record.targetMode || routeProfile.targetMode || "",
          targetMode: record.targetMode || routeProfile.targetMode || "",
          targetTenseValue: record.targetTenseValue || routeProfile.targetTenseValue || routeProfile.nawatTenseValue || "",
          targetCombinedMode: record.targetCombinedMode || routeProfile.targetCombinedMode || "",
          targetVerb: record.targetVerb || "",
          targetInput,
          targetObjectPrefix: record.targetObjectPrefix || "",
          routeId: routeProfile.id || "",
          routePlacement,
          structuralAnalogue,
          generationAllowed
        },
        orthographyFrame: {
          surface: resolvedTargetSurface,
          surfaceForms: targetSurfaceForms,
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true,
          targetInput
        },
        morphBoundaryFrame: {
          routePlacement,
          verbalizer: routeProfile.verbalizer || "",
          verbalizerType: routeProfile.verbalizerType || "",
          surfaceSuffix: routeProfile.surfaceSuffix || "",
          structuralAnalogue,
          noAndrewsSuffixContract: routePlacement === "patientivo-tronco-conversion" && !hasAndrewsRefs
        },
        stemFrame: {
          sourceStem: record.sourceStem || record.sourceVerb || "",
          targetStem: record.targetVerb || targetInput,
          routeId: routeProfile.id || ""
        },
        participantFrame: {
          sourceObjectPrefix: record.sourceObjectPrefix || "",
          targetObjectPrefix: record.targetObjectPrefix || ""
        },
        inflectionFrame: {
          sourceTenseValue: record.sourceTenseValue || "",
          targetTenseValue: record.targetTenseValue || routeProfile.targetTenseValue || routeProfile.nawatTenseValue || "",
          activeStationTenseValue: record.activeStationTenseValue || ""
        }
      });
    }
    function buildNawatRouteSurfaceResultContract({
      profile = null,
      routeTarget = null,
      sourceVerb = "",
      sourceObjectPrefix = "",
      outputKind = "nawat-route-surface-result",
      routeStage = "surface-result",
      surface = "",
      generationAllowed = true,
      supported = null,
      diagnostics = [],
      sourceResult = null
    } = {}) {
      const target = routeTarget && typeof routeTarget === "object" ? routeTarget : {};
      const resolvedSurface = String(surface || "").trim();
      const resolvedSupported = supported === null ? Boolean(resolvedSurface) : supported === true;
      const record = {
        ...target,
        outputKind,
        result: resolvedSurface,
        surfaceForms: resolvedSurface ? [resolvedSurface] : [],
        sourceVerb: target.sourceVerb || sourceVerb || "",
        sourceObjectPrefix: target.sourceObjectPrefix || sourceObjectPrefix || "",
        targetVerb: target.targetVerb || target.activeStationVerb || "",
        targetInput: target.targetInput || target.activeStationInput || target.targetVerb || "",
        sourceResult,
        diagnostics
      };
      return attachNawatStaticRouteGrammarFrame(record, {
        profile,
        routeStage,
        generationAllowed,
        supported: resolvedSupported,
        targetSurface: resolvedSurface,
        diagnostics
      });
    }
    function resolveNawatRoutePatientivoNominalSuffix(profile = null, options = {}) {
      const surfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, options);
      if (surfaceSpec?.suffix) {
        return surfaceSpec.suffix;
      }
      const rawSuffix = String(profile?.patientivoNominalSuffix || profile?.surfaceSuffix || "").replace(/^-+/, "");
      if (typeof targetObject.normalizePatientivoNominalSuffixSelection !== "function") {
        return rawSuffix;
      }
      const normalized = targetObject.normalizePatientivoNominalSuffixSelection(rawSuffix);
      return normalized === null ? "" : normalized;
    }
    function getNawatRouteTargetMode(profile = null) {
      const modeKey = profile?.targetMode || profile?.nawatMode || "";
      return targetObject.TENSE_MODE[modeKey] || modeKey || targetObject.TENSE_MODE.verbo;
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
      return targetObject.TENSE_MODE[modeKey] || modeKey || targetObject.TENSE_MODE.verbo;
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
      return isPatientivoSurfaceRoute(profile) ? "presente" : getNawatRouteOriginTenseValue(profile);
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
      if (isPatientivoSurfaceRoute(profile) || getNawatRouteTargetMode(profile) === targetObject.TENSE_MODE.sustantivo) {
        return {
          sourceMode: targetObject.TENSE_MODE.verbo,
          targetMode: targetObject.TENSE_MODE.sustantivo
        };
      }
      if (isDirectFiniteRoute(profile) || isNonactiveHabitualRoute(profile)) {
        return {
          sourceMode: targetObject.TENSE_MODE.verbo,
          targetMode: targetObject.TENSE_MODE.verbo
        };
      }
      return {
        sourceMode: targetObject.TENSE_MODE.sustantivo,
        targetMode: targetObject.TENSE_MODE.verbo
      };
    }
    function formatNawatRouteConversionLabel(profile = null, isNawat = false, {
      reverse = false
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
        return tenseValue ? getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], isNawat, tenseValue) : "";
      }
      return isNawat && station.nawatText ? station.nawatText : station.text || "";
    }
    function getNawatRouteStationSurfaceText(station = null) {
      if (!station || typeof station !== "object") {
        return "";
      }
      const framedSurface = getStateFrameResultSurfaceForms(station).join(" / ");
      if (framedSurface) {
        return framedSurface;
      }
      if (hasStateResultFrame(station)) {
        return "";
      }
      return String(station.surface || station.renderVerb || station.inputValue || "").trim();
    }
    function formatNawatRouteStationChipText(station = null, isNawat = false, {
      includeSurface = false
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
    function getNawatRouteSourceSurfaceResult(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      if (!profile || !sourceVerb || !isPatientivoSurfaceRoute(profile) || typeof targetObject.executeGenerateWordRequest !== "function") {
        return buildNawatRouteSurfaceResultContract({
          profile,
          routeTarget,
          sourceVerb,
          sourceObjectPrefix,
          outputKind: "nawat-route-source-surface-result",
          routeStage: "source-surface-blocked",
          generationAllowed: false,
          supported: false,
          diagnostics: [{
            id: "nawat-route-source-surface-unavailable",
            severity: "warning",
            message: "The Nawat route source surface could not be generated for this route context."
          }]
        });
      }
      const routeSpec = isNawatDynamicPatientivoSurfaceRoute(profile) ? resolveNawatPatientivoRouteSpec({
        sourceTenseValue: routeTarget?.sourceTenseValue || profile.sourceTenseValue || getCanonicalNawatPatientivoSourceTenseValue(profile.patientivoSource || "nonactive"),
        sourceCombinedMode: routeTarget?.sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "",
        patientivoSource: profile.patientivoSource || "nonactive"
      }) : null;
      const patientivoSource = String(routeSpec?.patientivoSource || profile.patientivoSource || "nonactive");
      const sourceTenseValue = routeSpec?.sourceTenseValue || routeTarget?.sourceTenseValue || profile.sourceTenseValue || getCanonicalNawatPatientivoSourceTenseValue(patientivoSource);
      const sourceCombinedMode = routeSpec?.sourceCombinedMode || routeTarget?.sourceCombinedMode || profile.sourceCombinedMode || (isNawatPatientivoNonactiveSource(patientivoSource) ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active);
      const sourceDerivationMode = profile.sourceDerivationMode || (sourceCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active);
      const sourceVoiceMode = profile.sourceVoiceMode || (sourceCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active);
      const result = targetObject.executeNuclearClauseSurfaceRequest({
        options: {
          silent: true,
          skipValidation: false,
          override: {
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE[sourceDerivationMode] || sourceDerivationMode || targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE[sourceVoiceMode] || sourceVoiceMode || targetObject.VOICE_MODE.active
          }
        },
        posicionesFormula: {
          pers1: "",
          obj1: sourceObjectPrefix || "",
          tronco: sourceVerb,
          pers2: "",
          num2: "",
          poseedor: "",
          tiempo: sourceTenseValue
        },
        entradaTronco: {
          tieneControlTronco: false,
          valorTronco: ""
        }
      });
      let surface = getPrimaryNawatRouteSurfaceForm(result);
      if (!isNawatDynamicPatientivoSurfaceRoute(profile) && patientivoSource === "nonactive" && sourceTenseValue === "preterito" && surface.endsWith("k")) {
        surface = surface.slice(0, -1);
      }
      return buildNawatRouteSurfaceResultContract({
        profile,
        routeTarget: {
          ...(routeTarget && typeof routeTarget === "object" ? routeTarget : {}),
          sourceVerb,
          sourceObjectPrefix,
          sourceTenseValue,
          sourceCombinedMode,
          targetMode: targetObject.TENSE_MODE.verbo,
          targetTenseValue: sourceTenseValue,
          targetVerb: sourceVerb
        },
        sourceVerb,
        sourceObjectPrefix,
        outputKind: "nawat-route-source-surface-result",
        routeStage: surface ? "source-surface" : "source-surface-blocked",
        surface,
        generationAllowed: true,
        supported: Boolean(surface),
        sourceResult: result,
        diagnostics: surface ? [] : [{
          id: "nawat-route-source-surface-empty",
          severity: "warning",
          message: "The Nawat route source generation produced no surface."
        }]
      });
    }
    function getNawatRouteSourceSurfaceForm(profile = null, options = {}) {
      return getNawatRouteSourceSurfaceResult(profile, options)?.surface || "";
    }
    function stripNawatRoutePreposedParticle(surface = "") {
      return String(surface || "").trim().replace(/^ma\s+/i, "").replace(/\s+/g, "");
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
      if (normalized && Array.isArray(targetObject.IA_UA_SUFFIXES) && typeof targetObject.endsWithAny === "function" && targetObject.endsWithAny(normalized, targetObject.IA_UA_SUFFIXES) && normalized.endsWith("a")) {
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
    function generateNawatRoutePatientivoSurfaceResult(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null,
      patientivoNominalSuffix = null
    } = {}) {
      if (!isPatientivoSurfaceRoute(profile) || typeof targetObject.executeGenerateWordRequest !== "function") {
        return null;
      }
      const routeVerb = routeTarget?.sourceVerb || sourceVerb;
      if (!routeVerb) {
        return null;
      }
      return targetObject.executeNuclearClauseSurfaceRequest({
        options: {
          silent: true,
          skipValidation: true,
          override: {
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active,
            patientivoSource: profile?.patientivoSource || "nonactive",
            patientivoNominalSuffix
          }
        },
        posicionesFormula: {
          pers1: "",
          obj1: routeTarget?.sourceObjectPrefix || sourceObjectPrefix || "",
          tronco: routeVerb,
          pers2: "",
          num2: "",
          poseedor: "",
          tiempo: "patientivo"
        },
        entradaTronco: {
          tieneControlTronco: false,
          valorTronco: ""
        }
      });
    }
    function getNawatRouteGeneratedPatientivoConnectorSuffix(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      if (!isPatientivoSurfaceRoute(profile)) {
        return "";
      }
      const surfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, {
        sourceTenseValue: routeTarget?.sourceTenseValue || "",
        sourceCombinedMode: routeTarget?.sourceCombinedMode || ""
      });
      const attempts = [surfaceSpec?.suffix || null, null];
      for (const suffix of attempts) {
        const result = generateNawatRoutePatientivoSurfaceResult(profile, {
          sourceVerb,
          sourceObjectPrefix,
          routeTarget,
          patientivoNominalSuffix: suffix
        });
        const connector = getStateNum1Num2Surface(result?.num1Num2);
        if (connector) {
          return connector;
        }
      }
      return "";
    }
    function getNawatVerbNounConversionNominalSurfaceResult(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      if (!isNawatDynamicPatientivoSurfaceRoute(profile)) {
        return buildNawatRouteSurfaceResultContract({
          profile,
          routeTarget,
          sourceVerb,
          sourceObjectPrefix,
          outputKind: "nawat-route-nominal-surface-result",
          routeStage: "nominal-surface-blocked",
          generationAllowed: false,
          supported: false,
          diagnostics: [{
            id: "nawat-route-nominal-surface-not-patientivo",
            severity: "warning",
            message: "The Nawat nominal route surface helper only supports patientivo surface routes."
          }]
        });
      }
      const surfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, {
        sourceTenseValue: routeTarget?.sourceTenseValue || "",
        sourceCombinedMode: routeTarget?.sourceCombinedMode || ""
      });
      if (!surfaceSpec?.suffix) {
        return buildNawatRouteSurfaceResultContract({
          profile,
          routeTarget,
          sourceVerb,
          sourceObjectPrefix,
          outputKind: "nawat-route-nominal-surface-result",
          routeStage: "nominal-surface-blocked",
          generationAllowed: false,
          supported: false,
          diagnostics: [{
            id: "nawat-route-nominal-surface-missing-suffix",
            severity: "warning",
            message: "The Nawat patientivo route has no nominal suffix for this source context."
          }]
        });
      }
      if (typeof targetObject.executeGenerateWordRequest === "function") {
        const requestedResult = generateNawatRoutePatientivoSurfaceResult(profile, {
          sourceVerb,
          sourceObjectPrefix,
          routeTarget,
          patientivoNominalSuffix: surfaceSpec.suffix
        });
        const requestedSurface = getPrimaryNawatRouteSurfaceForm(requestedResult);
        if (requestedSurface) {
          return buildNawatRouteSurfaceResultContract({
            profile,
            routeTarget,
            sourceVerb,
            sourceObjectPrefix,
            outputKind: "nawat-route-nominal-surface-result",
            routeStage: "nominal-surface",
            surface: requestedSurface,
            generationAllowed: true,
            supported: true,
            sourceResult: requestedResult
          });
        }
        const defaultResult = generateNawatRoutePatientivoSurfaceResult(profile, {
          sourceVerb,
          sourceObjectPrefix,
          routeTarget,
          patientivoNominalSuffix: null
        });
        const defaultSurface = getPrimaryNawatRouteSurfaceForm(defaultResult);
        return buildNawatRouteSurfaceResultContract({
          profile,
          routeTarget,
          sourceVerb,
          sourceObjectPrefix,
          outputKind: "nawat-route-nominal-surface-result",
          routeStage: defaultSurface ? "nominal-surface" : "nominal-surface-blocked",
          surface: defaultSurface || "",
          generationAllowed: true,
          supported: Boolean(defaultSurface),
          sourceResult: defaultResult,
          diagnostics: defaultSurface ? [] : [{
            id: "nawat-route-nominal-surface-empty",
            severity: "warning",
            message: "The Nawat patientivo route produced no nominal surface."
          }]
        });
      }
      const sourceSurfaceResult = getNawatRouteSourceSurfaceResult(profile, {
        sourceVerb: routeTarget?.sourceVerb || sourceVerb,
        sourceObjectPrefix: routeTarget?.sourceObjectPrefix || sourceObjectPrefix,
        routeTarget
      });
      const sourceSurface = sourceSurfaceResult?.surface || "";
      if (!sourceSurface) {
        return buildNawatRouteSurfaceResultContract({
          profile,
          routeTarget,
          sourceVerb,
          sourceObjectPrefix,
          outputKind: "nawat-route-nominal-surface-result",
          routeStage: "nominal-surface-blocked",
          generationAllowed: false,
          supported: false,
          sourceResult: sourceSurfaceResult,
          diagnostics: [{
            id: "nawat-route-nominal-surface-missing-source",
            severity: "warning",
            message: "The Nawat patientivo route needs a source surface before deriving a nominal surface."
          }]
        });
      }
      const stem = isNawatRouteNonactiveSource(surfaceSpec) ? deriveNawatRouteNonactivePatientivoStem(sourceSurface, surfaceSpec.sourceTenseValue) : deriveNawatRouteActivePatientivoStem(sourceSurface, surfaceSpec.sourceTenseValue);
      const surface = appendNawatRouteNominalSuffix(stem, surfaceSpec.suffix);
      return buildNawatRouteSurfaceResultContract({
        profile,
        routeTarget,
        sourceVerb,
        sourceObjectPrefix,
        outputKind: "nawat-route-nominal-surface-result",
        routeStage: surface ? "nominal-surface" : "nominal-surface-blocked",
        surface,
        generationAllowed: true,
        supported: Boolean(surface),
        sourceResult: sourceSurfaceResult,
        diagnostics: surface ? [] : [{
          id: "nawat-route-nominal-surface-empty",
          severity: "warning",
          message: "The Nawat patientivo route derived no nominal surface."
        }]
      });
    }
    function getNawatVerbNounConversionNominalSurfaceForm(profile = null, options = {}) {
      return getNawatVerbNounConversionNominalSurfaceResult(profile, options)?.surface || "";
    }
    function getNawatRouteFiniteSurfaceResult(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      if (!profile || typeof profile !== "object") {
        return buildNawatRouteSurfaceResultContract({
          profile,
          routeTarget,
          sourceVerb,
          sourceObjectPrefix,
          outputKind: "nawat-route-finite-surface-result",
          routeStage: "finite-surface-blocked",
          generationAllowed: false,
          supported: false,
          diagnostics: [{
            id: "nawat-route-finite-surface-missing-profile",
            severity: "warning",
            message: "The Nawat route surface helper needs a route profile."
          }]
        });
      }
      if (isPatientivoSurfaceRoute(profile)) {
        const nominalResult = getNawatVerbNounConversionNominalSurfaceResult(profile, {
          sourceVerb,
          sourceObjectPrefix,
          routeTarget
        });
        const routeSurface = nominalResult?.surface || "";
        if (routeSurface) {
          return buildNawatRouteSurfaceResultContract({
            profile,
            routeTarget,
            sourceVerb,
            sourceObjectPrefix,
            outputKind: "nawat-route-finite-surface-result",
            routeStage: "finite-surface",
            surface: routeSurface,
            generationAllowed: true,
            supported: true,
            sourceResult: nominalResult
          });
        }
      }
      const hasExplicitRouteStem = Boolean(String(routeTarget?.sourceStem || "").trim());
      if (!hasExplicitRouteStem) {
        const routeResult = executeNawatRouteConfiguredGeneration(profile, {
          sourceVerb,
          sourceObjectPrefix
        });
        const routeSurface = getPrimaryNawatRouteSurfaceForm(routeResult);
        if (routeSurface) {
          return buildNawatRouteSurfaceResultContract({
            profile,
            routeTarget,
            sourceVerb,
            sourceObjectPrefix,
            outputKind: "nawat-route-finite-surface-result",
            routeStage: "finite-surface",
            surface: routeSurface,
            generationAllowed: true,
            supported: true,
            sourceResult: routeResult
          });
        }
      }
      const targetMode = routeTarget?.targetMode || getNawatRouteTargetMode(profile);
      const targetTenseValue = routeTarget?.targetTenseValue || getNawatRouteTargetTenseValue(profile);
      const targetVerb = routeTarget?.targetVerb || "";
      const routeStem = String(routeTarget?.sourceStem || "").trim() || stripNawatRouteVerbalizerFromTarget(profile, targetVerb);
      const generationVerb = profile.valency === "transitive" && routeStem ? formatNawatRouteTargetInputValue(profile, {
        routeStem,
        targetVerb
      }) : targetVerb;
      const targetCombinedMode = routeTarget?.targetCombinedMode || profile.targetCombinedMode || profile.combinedMode || "";
      const targetDerivationMode = routeTarget?.targetDerivationMode || profile.targetDerivationMode || profile.derivationMode || (targetCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active);
      const targetVoiceMode = routeTarget?.targetVoiceMode || profile.targetVoiceMode || profile.voiceMode || (targetCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active);
      if (targetMode && targetTenseValue && generationVerb && typeof targetObject.executeGenerateWordRequest === "function") {
        const result = targetObject.executeNuclearClauseSurfaceRequest({
          options: {
            silent: true,
            skipValidation: false,
            override: {
              tenseMode: targetMode,
              derivationMode: targetObject.DERIVATION_MODE[targetDerivationMode] || targetDerivationMode || targetObject.DERIVATION_MODE.active,
              voiceMode: targetObject.VOICE_MODE[targetVoiceMode] || targetVoiceMode || targetObject.VOICE_MODE.active,
              patientivoSource: isPatientivoSurfaceRoute(profile) ? profile.patientivoSource || "nonactive" : undefined,
              patientivoNominalSuffix: isPatientivoSurfaceRoute(profile) ? resolveNawatRoutePatientivoNominalSuffix(profile, {
                sourceTenseValue: routeTarget?.sourceTenseValue || "",
                sourceCombinedMode: routeTarget?.sourceCombinedMode || ""
              }) : undefined
            }
          },
          posicionesFormula: {
            pers1: "",
            obj1: routeTarget?.targetObjectPrefix || "",
            tronco: generationVerb,
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: targetTenseValue
          },
          entradaTronco: {
            tieneControlTronco: false,
            valorTronco: ""
          }
        });
        const surface = getPrimaryNawatRouteSurfaceForm(result);
        if (surface) {
          return buildNawatRouteSurfaceResultContract({
            profile,
            routeTarget,
            sourceVerb,
            sourceObjectPrefix,
            outputKind: "nawat-route-finite-surface-result",
            routeStage: "finite-surface",
            surface,
            generationAllowed: true,
            supported: true,
            sourceResult: result
          });
        }
      }
      if (isPatientivoSurfaceRoute(profile)) {
        return buildNawatRouteSurfaceResultContract({
          profile,
          routeTarget,
          sourceVerb,
          sourceObjectPrefix,
          outputKind: "nawat-route-finite-surface-result",
          routeStage: "finite-surface-blocked",
          generationAllowed: false,
          supported: false,
          diagnostics: [{
            id: "nawat-route-finite-surface-empty-patientivo",
            severity: "warning",
            message: "The Nawat patientivo route produced no finite surface."
          }]
        });
      }
      const fallbackSurface = generationVerb || targetVerb || "";
      return buildNawatRouteSurfaceResultContract({
        profile,
        routeTarget,
        sourceVerb,
        sourceObjectPrefix,
        outputKind: "nawat-route-finite-surface-result",
        routeStage: fallbackSurface ? "finite-surface-fallback" : "finite-surface-blocked",
        surface: fallbackSurface,
        generationAllowed: false,
        supported: false,
        diagnostics: [{
          id: fallbackSurface ? "nawat-route-finite-surface-fallback-target" : "nawat-route-finite-surface-empty",
          severity: fallbackSurface ? "info" : "warning",
          message: fallbackSurface ? "The Nawat route exposed a target input fallback rather than a generated finite surface." : "The Nawat route produced no finite surface."
        }]
      });
    }
    function getNawatRouteFiniteSurfaceForm(profile = null, options = {}) {
      return getNawatRouteFiniteSurfaceResult(profile, options)?.surface || "";
    }
    function getNawatRouteSurfaceTrailParts(routeKeyOrProfile = "", {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null,
      stationModels = null
    } = {}) {
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.routeTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
      if (!profile) {
        return [];
      }
      const resolvedTarget = routeTarget && typeof routeTarget === "object" ? routeTarget : resolveNawatRouteTarget(profile, {
        sourceVerb,
        sourceObjectPrefix
      });
      const stations = Array.isArray(stationModels) ? stationModels : getNawatRouteStationModels(profile, {
        sourceVerb,
        sourceObjectPrefix,
        routeTarget: resolvedTarget
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
          role: station?.role || "",
          stationKey: station?.key || options.stationKey || "",
          text: displayText,
          relation: options.relation || "",
          depth: Number.isFinite(options.depth) ? options.depth : 0,
          inputValue: station?.inputValue || "",
          renderVerb: station?.renderVerb || "",
          mode: station?.mode || "",
          tenseValue: station?.tenseValue || "",
          objectPrefix: station?.objectPrefix || "",
          combinedMode: station?.combinedMode || "",
          derivationMode: station?.derivationMode || "",
          voiceMode: station?.voiceMode || "",
          sourceScope: station?.sourceScope || ""
        });
      };
      stations.forEach(station => {
        const stationKey = station?.key || "";
        const stationSurfaceText = getNawatRouteStationSurfaceText(station);
        const hasStationResultFrame = hasStateResultFrame(station);
        const directStationSurface = String(station?.surface || "").trim();
        const fallbackStationSurface = directStationSurface && directStationSurface !== "—" ? directStationSurface : "";
        const surfaceText = stationKey === "finite-tense" ? getNawatRouteFiniteSurfaceForm(profile, {
          sourceVerb: resolvedTarget?.sourceVerb || sourceVerb,
          sourceObjectPrefix: resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix,
          routeTarget: resolvedTarget
        }) : stationKey === "surface-profile" && isPatientivoSurfaceRoute(profile) ? (() => {
          const generatedConnector = getNawatRouteGeneratedPatientivoConnectorSuffix(profile, {
            sourceVerb: resolvedTarget?.sourceVerb || sourceVerb,
            sourceObjectPrefix: resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix,
            routeTarget: resolvedTarget
          });
          return generatedConnector ? `-${generatedConnector}` : isNawatDynamicPatientivoSurfaceRoute(profile) ? "" : stationSurfaceText;
        })() : stationKey === "source-tense" ? hasStationResultFrame ? stationSurfaceText : fallbackStationSurface || getNawatRouteSourceSurfaceForm(profile, {
          sourceVerb: resolvedTarget?.sourceVerb || sourceVerb,
          sourceObjectPrefix: resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix,
          routeTarget: resolvedTarget
        }) || stationSurfaceText : stationKey === "verbalizer" || stationKey === "target-mode" ? station?.inputValue || stationSurfaceText : stationSurfaceText;
        pushPart(station, surfaceText, {
          key: stationKey === "finite-tense" ? "finite-surface" : stationKey,
          relation: station?.role === "stem" ? "source-dependent" : "",
          depth: station?.role === "stem" ? 1 : 0
        });
      });
      return parts;
    }
    function formatNawatRouteSurfaceTrailLabel(routeKeyOrProfile = "", options = {}) {
      const parts = getNawatRouteSurfaceTrailParts(routeKeyOrProfile, options).filter(part => part?.text);
      return parts.map(part => part.text).join(" → ");
    }
    function buildNawatDenominalAndrewsRouteSourceEvidenceFromLinkedStage(profile = null, part = null, routeContext = null) {
      const familyKey = getNawatDenominalRouteFamilyKey(profile);
      const stationKey = String(part?.stationKey || part?.key || "").trim();
      if (familyKey === "vi-ti" && stationKey === "verbalizer") {
        const sourceBaseStem = String(routeContext?.sourceStem || "").trim() || (() => {
          const targetVerb = String(routeContext?.targetVerb || "").trim();
          const familySuffix = "ti";
          return targetVerb.endsWith(familySuffix) ? targetVerb.slice(0, -familySuffix.length) : "";
        })();
        return {
          tiSource: true,
          sourceCategory: "inceptive-stative-ti-source",
          sourceRouteFamily: familyKey,
          sourceRouteId: profile?.id || "",
          sourceStageKey: stationKey,
          sourceBaseStem,
          sourceVerbStem: String(routeContext?.targetVerb || "").trim(),
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromSelectedGeneratedStage: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsTiYaDeverbal: true,
            sourceEvidenceSupportsTiLiaCausative: true,
            sourceEvidenceSupportsTiACausative: true,
            sourceEvidenceSupportsTIaApplicative: true
          }
        };
      }
      if ((familyKey === "vi-iwi" || familyKey === "vi-awi") && stationKey === "verbalizer") {
        const sourceBaseStem = String(routeContext?.sourceStem || "").trim() || (() => {
          const targetVerb = String(routeContext?.targetVerb || "").trim();
          const familySuffix = familyKey === "vi-iwi" ? "iwi" : "awi";
          return targetVerb.endsWith(familySuffix) ? targetVerb.slice(0, -familySuffix.length) : "";
        })();
        return {
          iHuiOrAHuiSource: true,
          sourceCategory: "i-hui-a-hui-source",
          sourceRouteFamily: familyKey,
          sourceRouteId: profile?.id || "",
          sourceStageKey: stationKey,
          sourceBaseStem,
          sourceVerbStem: String(routeContext?.targetVerb || "").trim(),
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromSelectedGeneratedStage: true,
            classicalRuleSpellingsConvertedToNawat: true
          }
        };
      }
      return null;
    }
    function buildNawatLinkedGrammarPathStages(routeKeyOrProfile = "", options = {}) {
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.routeTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
      if (!profile) {
        return [];
      }
      const resolvedTarget = options.routeTarget && typeof options.routeTarget === "object" ? options.routeTarget : resolveNawatRouteTarget(profile, {
        sourceVerb: options.sourceVerb || profile.sourceVerb || "",
        sourceObjectPrefix: options.sourceObjectPrefix != null ? options.sourceObjectPrefix : profile.sourceObjectPrefix || ""
      });
      const routeContext = {
        routeId: profile.id || "",
        routeTenseValue: profile.routeTenseValue || "",
        sourceVerb: resolvedTarget?.sourceVerb || options.sourceVerb || profile.sourceVerb || "",
        sourceObjectPrefix: resolvedTarget?.sourceObjectPrefix || options.sourceObjectPrefix || profile.sourceObjectPrefix || "",
        sourceStem: resolvedTarget?.sourceStem || options.sourceStem || profile.sourceStem || "",
        targetVerb: resolvedTarget?.targetVerb || profile.targetVerb || "",
        targetMode: resolvedTarget?.targetMode || getNawatRouteTargetMode(profile),
        targetTenseValue: resolvedTarget?.targetTenseValue || getNawatRouteTargetTenseValue(profile)
      };
      return getNawatRouteSurfaceTrailParts(profile, {
        ...options,
        routeTarget: resolvedTarget
      }).map((part, index) => {
        const sourceVerb = String(part.inputValue || part.renderVerb || part.text || "").trim();
        const sourceEvidence = buildNawatDenominalAndrewsRouteSourceEvidenceFromLinkedStage(profile, part, routeContext);
        return {
          index,
          key: part.key || "",
          stationKey: part.stationKey || "",
          role: part.role || "",
          relation: part.relation || "",
          depth: part.depth,
          surface: part.text || "",
          inputValue: part.inputValue || "",
          renderVerb: part.renderVerb || "",
          mode: part.mode || "",
          tenseValue: part.tenseValue || "",
          objectPrefix: part.objectPrefix || "",
          combinedMode: part.combinedMode || "",
          derivationMode: part.derivationMode || "",
          voiceMode: part.voiceMode || "",
          sourceScope: part.sourceScope || "",
          routeContext,
          ...(sourceEvidence ? {
            sourceEvidence
          } : {}),
          nextSource: {
            canBecomeSource: Boolean(sourceVerb),
            sourceVerb,
            displaySurface: part.text || "",
            mode: part.mode || "",
            tenseValue: part.tenseValue || "",
            objectPrefix: part.objectPrefix || "",
            combinedMode: part.combinedMode || "",
            derivationMode: part.derivationMode || "",
            voiceMode: part.voiceMode || "",
            sourceScope: part.sourceScope || "",
            ...(sourceEvidence ? {
              sourceEvidence
            } : {}),
            routeId: profile.id || "",
            stationKey: part.stationKey || part.key || ""
          }
        };
      });
    }
    function buildNawatLinkedGrammarPathStageGenerateWordRequest(stage = null, {
      silent = true,
      skipValidation = false
    } = {}) {
      const nextSource = stage?.nextSource && typeof stage.nextSource === "object" ? stage.nextSource : {};
      const sourceVerb = getNawatLinkedGrammarPathStageSourceVerb(stage);
      if (!sourceVerb) {
        return null;
      }
      const displaySurface = getNawatLinkedGrammarPathStageDisplaySurface(stage);
      const tenseMode = nextSource.mode || stage?.mode || targetObject.TENSE_MODE.verbo;
      const tense = nextSource.tenseValue || stage?.tenseValue || "";
      const objectPrefix = nextSource.objectPrefix || stage?.objectPrefix || "";
      const sourceEvidence = nextSource.sourceEvidence && typeof nextSource.sourceEvidence === "object" ? nextSource.sourceEvidence : stage?.sourceEvidence && typeof stage.sourceEvidence === "object" ? stage.sourceEvidence : null;
      const combinedMode = nextSource.combinedMode || stage?.combinedMode || "";
      const derivationMode = nextSource.derivationMode || stage?.derivationMode || (combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active);
      const voiceMode = nextSource.voiceMode || stage?.voiceMode || (combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active);
      const request = {
        options: {
          silent,
          skipValidation,
          override: {
            tenseMode,
            derivationMode,
            voiceMode
          }
        },
        posicionesFormula: {
          pers1: "",
          obj1: objectPrefix,
          tronco: sourceVerb,
          pers2: "",
          num2: "",
          poseedor: "",
          tiempo: tense
        },
        entradaTronco: {
          tieneControlTronco: false,
          valorTronco: ""
        },
        linkedGrammarPathStage: {
          routeId: nextSource.routeId || "",
          stationKey: nextSource.stationKey || stage?.stationKey || stage?.key || "",
          sourceVerb,
          displaySurface,
          mode: tenseMode,
          tenseValue: tense,
          objectPrefix,
          ...(sourceEvidence ? {
            sourceEvidence
          } : {}),
          combinedMode,
          derivationMode,
          voiceMode,
          sourceScope: nextSource.sourceScope || stage?.sourceScope || ""
        }
      };
      if (typeof targetObject.attachGrammarMetadataContract === "function") {
        request.linkedGrammarPathStage = targetObject.attachGrammarMetadataContract(request.linkedGrammarPathStage, {
          enumerable: false,
          metadataKind: "linked-grammar-path-stage",
          unitKind: "linked-grammar-path-stage",
          routeFamily: "linked-grammar-path",
          routeStage: "request-stage-generation",
          generationAllowed: true,
          supported: true,
          structuralSource: "Andrews Lessons 54-55",
          andrewsRefs: ["Andrews Lessons 54-55"],
          evidenceStatus: sourceEvidence ? "source-evidence-linked" : "route-stage-request",
          sourceInput: sourceVerb,
          surface: displaySurface || sourceVerb,
          surfaceForms: displaySurface || sourceVerb ? [displaySurface || sourceVerb] : [],
          sourceContract: {
            unitKind: "linked-route-source",
            sourceVerb,
            sourceEvidence
          },
          targetContract: {
            unitKind: "generated-stage",
            mode: tenseMode,
            tense,
            objectPrefix,
            generationAllowed: true
          },
          orthographyFrame: {
            surface: sourceVerb,
            surfaceForms: sourceVerb ? [sourceVerb] : [],
            spellingAuthority: "Nawat/Pipil evidence",
            noClassicalSurfaceImport: true
          },
          stemFrame: {
            stemKind: "linked-stage-source",
            sourceStem: sourceVerb,
            useStatus: "explicit-stage-request"
          }
        });
      }
      return request;
    }
    function collectNawatLinkedGrammarPathDiagnostics(record = null) {
      const diagnostics = [];
      if (Array.isArray(record?.diagnostics)) {
        diagnostics.push(...record.diagnostics);
      }
      [...(Array.isArray(record?.steps) ? record.steps : []), ...(Array.isArray(record?.selectedSteps) ? record.selectedSteps : [])].forEach(step => {
        if (Array.isArray(step?.diagnostics)) {
          diagnostics.push(...step.diagnostics);
        }
      });
      return diagnostics.filter(Boolean);
    }
    function attachNawatLinkedGrammarPathContract(record = null, {
      metadataKind = "",
      routeStage = "",
      generationAllowed = false,
      evidenceStatus = "",
      sourceVerb = "",
      sourceObjectPrefix = "",
      currentSourceVerb = "",
      selectedStage = null
    } = {}) {
      if (!record || typeof record !== "object" || typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      const diagnostics = collectNawatLinkedGrammarPathDiagnostics(record);
      const resolvedSourceVerb = String(sourceVerb || record.initialSource?.sourceVerb || record.currentSource?.sourceVerb || record.nextSource?.sourceVerb || record.selectedStage?.sourceVerb || record.sourceVerb || "").trim();
      const resolvedCurrentSourceVerb = String(currentSourceVerb || record.currentSource?.sourceVerb || record.nextSource?.sourceVerb || record.promotedSource?.sourceVerb || resolvedSourceVerb).trim();
      const resolvedSourceObjectPrefix = String(sourceObjectPrefix || record.initialSource?.sourceObjectPrefix || record.currentSource?.sourceObjectPrefix || record.nextSource?.objectPrefix || record.promotedSource?.sourceObjectPrefix || "").trim();
      const kind = String(metadataKind || record.outputKind || "linked-grammar-path").trim();
      const resolvedEvidenceStatus = diagnostics.length ? "blocked" : evidenceStatus || "linked-route-contract";
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        metadataKind: kind,
        unitKind: "linked-grammar-path",
        routeFamily: "linked-grammar-path",
        routeStage,
        generationAllowed,
        supported: diagnostics.length === 0,
        structuralSource: "Andrews Lessons 54-55",
        andrewsRefs: ["Andrews Lessons 54-55"],
        evidenceStatus: resolvedEvidenceStatus,
        diagnosticStatus: resolvedEvidenceStatus,
        surface: resolvedCurrentSourceVerb,
        surfaceForms: resolvedCurrentSourceVerb ? [resolvedCurrentSourceVerb] : [],
        sourceInput: resolvedSourceVerb,
        diagnostics,
        sourceContract: {
          unitKind: "linked-route-source",
          sourceVerb: resolvedSourceVerb,
          sourceObjectPrefix: resolvedSourceObjectPrefix,
          selectedStage
        },
        targetContract: {
          unitKind: "linked-route-ui-control",
          currentSourceVerb: resolvedCurrentSourceVerb,
          generationAllowed,
          stoppedReason: record.stoppedReason || "",
          requestedSelectionCount: record.requestedSelectionCount || 0
        },
        orthographyFrame: {
          surface: resolvedCurrentSourceVerb,
          surfaceForms: resolvedCurrentSourceVerb ? [resolvedCurrentSourceVerb] : [],
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true
        },
        stemFrame: {
          stemKind: "linked-route-source",
          sourceStem: resolvedSourceVerb,
          currentStem: resolvedCurrentSourceVerb,
          useStatus: "ui-route-contract"
        }
      });
    }
    function executeNawatLinkedGrammarPathStage(stage = null, options = {}) {
      const request = buildNawatLinkedGrammarPathStageGenerateWordRequest(stage, options);
      if (!request || typeof targetObject.executeGenerateWordRequest !== "function") {
        return null;
      }
      const result = targetObject.executeNuclearClauseSurfaceRequest(request);
      if (!result || typeof result !== "object") {
        return result;
      }
      return {
        ...result,
        linkedGrammarPathStage: request.linkedGrammarPathStage,
        linkedGrammarPath: {
          version: 1,
          source: "linked-grammar-path-stage",
          routeId: request.linkedGrammarPathStage.routeId || "",
          stationKey: request.linkedGrammarPathStage.stationKey || "",
          sourceVerb: request.linkedGrammarPathStage.sourceVerb || "",
          displaySurface: request.linkedGrammarPathStage.displaySurface || "",
          mode: request.linkedGrammarPathStage.mode || "",
          tenseValue: request.linkedGrammarPathStage.tenseValue || "",
          objectPrefix: request.linkedGrammarPathStage.objectPrefix || "",
          ...(request.linkedGrammarPathStage.sourceEvidence ? {
            sourceEvidence: request.linkedGrammarPathStage.sourceEvidence
          } : {}),
          canBecomeSource: true,
          doesNotBroadenGeneration: true
        }
      };
    }
    function previewNawatLinkedGrammarPathNextSource(stage = null, options = {}) {
      const request = buildNawatLinkedGrammarPathStageGenerateWordRequest(stage, {
        silent: true,
        skipValidation: false,
        ...(options.requestOptions || {})
      });
      if (!request) {
        return null;
      }
      const selectedStage = request.linkedGrammarPathStage;
      const routePreview = generateNawatDenominalRouteFamilyPreview({
        sourceVerb: selectedStage.sourceVerb || "",
        sourceObjectPrefix: selectedStage.objectPrefix || "",
        sourceEvidence: selectedStage.sourceEvidence || null,
        andrewsContractSourceStem: selectedStage.sourceEvidence?.sourceBaseStem || ""
      });
      const preview = {
        version: 1,
        outputKind: "linked-grammar-path-next-source-preview",
        source: "linked-grammar-path-stage",
        selectedStage,
        routeContext: stage?.routeContext || null,
        nextSource: {
          canBecomeSource: true,
          sourceVerb: selectedStage.sourceVerb || "",
          displaySurface: selectedStage.displaySurface || "",
          mode: selectedStage.mode || "",
          tenseValue: selectedStage.tenseValue || "",
          objectPrefix: selectedStage.objectPrefix || "",
          ...(selectedStage.sourceEvidence ? {
            sourceEvidence: selectedStage.sourceEvidence
          } : {})
        },
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        boundaries: {
          noNewRouteFamilies: true,
          noNewSurfaceRules: true,
          doesNotExecuteStage: true,
          doesNotMutateState: true
        }
      };
      return attachNawatLinkedGrammarPathContract(preview, {
        metadataKind: "linked-grammar-path-next-source-preview",
        routeStage: "preview-next-source",
        generationAllowed: false,
        evidenceStatus: selectedStage.sourceEvidence ? "source-evidence-linked" : "next-source-preview",
        sourceVerb: selectedStage.sourceVerb || "",
        currentSourceVerb: preview.nextSource.sourceVerb || "",
        selectedStage
      });
    }
    function getNawatLinkedGrammarPathSelectionRoute(routePreview = null, selection = {}) {
      const routes = Array.isArray(routePreview?.routes) ? routePreview.routes : [];
      const requestedRouteId = String(selection?.routeId || selection?.id || selection?.routeTenseValue || selection?.routeKey || "").trim();
      if (!requestedRouteId) {
        return null;
      }
      return routes.find(route => route.routeId === requestedRouteId || route.id === requestedRouteId || route.routeTenseValue === requestedRouteId) || null;
    }
    function getNawatLinkedGrammarPathSelectionStage(route = null, selection = {}) {
      const stages = Array.isArray(route?.stages) ? route.stages : [];
      const requestedStageKey = String(selection?.stageKey || selection?.stationKey || selection?.key || "finite-surface").trim();
      if (!requestedStageKey) {
        return null;
      }
      return stages.find(stage => stage.key === requestedStageKey || stage.stationKey === requestedStageKey || stage.nextSource?.stationKey === requestedStageKey) || null;
    }
    function previewNawatLinkedGrammarPathChain({
      sourceVerb = "",
      sourceObjectPrefix = "",
      selections = [],
      maxDepth = 8
    } = {}) {
      const normalizedSourceVerb = String(sourceVerb || "").trim();
      const normalizedSourceObjectPrefix = String(sourceObjectPrefix || "").trim();
      const requestedSelections = (Array.isArray(selections) ? selections : []).slice(0, Math.max(0, Number.isFinite(maxDepth) ? maxDepth : 8));
      let currentPreview = generateNawatDenominalRouteFamilyPreview({
        sourceVerb: normalizedSourceVerb,
        sourceObjectPrefix: normalizedSourceObjectPrefix
      });
      const steps = [];
      let stoppedReason = "";
      for (let index = 0; index < requestedSelections.length; index += 1) {
        const selection = requestedSelections[index] || {};
        const route = getNawatLinkedGrammarPathSelectionRoute(currentPreview, selection);
        if (!route) {
          stoppedReason = "unresolved-route";
          steps.push({
            index,
            status: stoppedReason,
            selection,
            diagnostics: [{
              id: "linked-grammar-path-unresolved-route",
              message: "No configured route matches the requested linked grammar path selection."
            }]
          });
          break;
        }
        const stage = getNawatLinkedGrammarPathSelectionStage(route, selection);
        if (!stage) {
          stoppedReason = "unresolved-stage";
          steps.push({
            index,
            status: stoppedReason,
            selection,
            routeId: route.routeId || "",
            diagnostics: [{
              id: "linked-grammar-path-unresolved-stage",
              message: "No reusable stage matches the requested linked grammar path selection."
            }]
          });
          break;
        }
        const nextPreview = previewNawatLinkedGrammarPathNextSource(stage);
        if (!nextPreview) {
          stoppedReason = "unusable-stage";
          steps.push({
            index,
            status: stoppedReason,
            selection,
            routeId: route.routeId || "",
            stageKey: stage.key || "",
            diagnostics: [{
              id: "linked-grammar-path-unusable-stage",
              message: "The selected stage cannot become a next source."
            }]
          });
          break;
        }
        const candidateRouteIds = Array.isArray(nextPreview.routePreview?.routes) ? nextPreview.routePreview.routes.map(candidate => candidate.routeId || "").filter(Boolean) : [];
        steps.push({
          index,
          status: "linked",
          selection: {
            routeId: route.routeId || "",
            stageKey: stage.key || ""
          },
          route: {
            routeId: route.routeId || "",
            routeFamily: route.routeFamily || "",
            targetVerb: route.targetVerb || "",
            surface: route.surface || "",
            surfaceTrail: route.surfaceTrail || ""
          },
          selectedStage: nextPreview.selectedStage,
          routeContext: nextPreview.routeContext || null,
          nextSource: nextPreview.nextSource,
          candidateRouteCount: nextPreview.candidateRouteCount || 0,
          candidateRouteIds
        });
        currentPreview = nextPreview.routePreview;
      }
      const chainPreview = {
        version: 1,
        outputKind: "linked-grammar-path-chain-preview",
        source: "linked-grammar-path-chain",
        initialSource: {
          sourceVerb: normalizedSourceVerb,
          sourceObjectPrefix: normalizedSourceObjectPrefix
        },
        requestedSelectionCount: requestedSelections.length,
        steps,
        stoppedReason,
        currentPreview,
        candidateRouteCount: Array.isArray(currentPreview?.routes) ? currentPreview.routes.length : 0,
        boundaries: {
          noNewRouteFamilies: true,
          noNewSurfaceRules: true,
          doesNotExecuteStages: true,
          doesNotMutateState: true
        }
      };
      return attachNawatLinkedGrammarPathContract(chainPreview, {
        metadataKind: "linked-grammar-path-chain-preview",
        routeStage: "preview-chain",
        generationAllowed: false,
        evidenceStatus: stoppedReason ? "blocked" : "chain-preview",
        sourceVerb: normalizedSourceVerb,
        sourceObjectPrefix: normalizedSourceObjectPrefix,
        currentSourceVerb: chainPreview.currentPreview?.sourceVerb || ""
      });
    }
    function executeNawatLinkedGrammarPathChain({
      sourceVerb = "",
      sourceObjectPrefix = "",
      selections = [],
      maxDepth = 8,
      executionOptions = {}
    } = {}) {
      const normalizedSourceVerb = String(sourceVerb || "").trim();
      const normalizedSourceObjectPrefix = String(sourceObjectPrefix || "").trim();
      const requestedSelections = (Array.isArray(selections) ? selections : []).slice(0, Math.max(0, Number.isFinite(maxDepth) ? maxDepth : 8));
      let currentPreview = generateNawatDenominalRouteFamilyPreview({
        sourceVerb: normalizedSourceVerb,
        sourceObjectPrefix: normalizedSourceObjectPrefix
      });
      const steps = [];
      let stoppedReason = "";
      for (let index = 0; index < requestedSelections.length; index += 1) {
        const selection = requestedSelections[index] || {};
        const route = getNawatLinkedGrammarPathSelectionRoute(currentPreview, selection);
        if (!route) {
          stoppedReason = "unresolved-route";
          steps.push({
            index,
            status: stoppedReason,
            selection,
            diagnostics: [{
              id: "linked-grammar-path-unresolved-route",
              message: "No configured route matches the requested linked grammar path selection."
            }]
          });
          break;
        }
        const stage = getNawatLinkedGrammarPathSelectionStage(route, selection);
        if (!stage) {
          stoppedReason = "unresolved-stage";
          steps.push({
            index,
            status: stoppedReason,
            selection,
            routeId: route.routeId || "",
            diagnostics: [{
              id: "linked-grammar-path-unresolved-stage",
              message: "No reusable stage matches the requested linked grammar path selection."
            }]
          });
          break;
        }
        const result = executeNawatLinkedGrammarPathStage(stage, {
          silent: true,
          skipValidation: false,
          ...executionOptions
        });
        if (!result || typeof result !== "object") {
          stoppedReason = "execution-failed";
          steps.push({
            index,
            status: stoppedReason,
            selection,
            routeId: route.routeId || "",
            stageKey: stage.key || "",
            diagnostics: [{
              id: "linked-grammar-path-execution-failed",
              message: "The selected linked grammar path stage did not produce an executable result."
            }]
          });
          break;
        }
        const nextPreview = previewNawatLinkedGrammarPathNextSource(stage);
        const candidateRouteIds = Array.isArray(nextPreview?.routePreview?.routes) ? nextPreview.routePreview.routes.map(candidate => candidate.routeId || "").filter(Boolean) : [];
        const generatedGrammarFrame = getStateResultFrame(result);
        const generatedSurfaceForms = getStateResultSurfaceForms(result);
        const generatedPrimarySurface = getPrimaryNawatRouteSurfaceForm(result);
        steps.push({
          index,
          status: "executed",
          selection: {
            routeId: route.routeId || "",
            stageKey: stage.key || ""
          },
          route: {
            routeId: route.routeId || "",
            routeFamily: route.routeFamily || "",
            targetVerb: route.targetVerb || "",
            surface: route.surface || "",
            surfaceTrail: route.surfaceTrail || ""
          },
          selectedStage: result.linkedGrammarPathStage || null,
          routeContext: stage.routeContext || null,
          generated: {
            result: getStateResultDisplaySurface(result),
            surface: generatedPrimarySurface,
            surfaceForms: generatedSurfaceForms,
            ok: result.ok === true,
            grammarFrame: generatedGrammarFrame,
            frames: generatedGrammarFrame,
            diagnostics: Array.isArray(result.diagnostics) ? result.diagnostics.slice() : [],
            contractDiagnostics: Array.isArray(result.contractDiagnostics) ? result.contractDiagnostics.slice() : []
          },
          linkedGrammarPath: result.linkedGrammarPath || null,
          nextSource: nextPreview?.nextSource || null,
          candidateRouteCount: nextPreview?.candidateRouteCount || 0,
          candidateRouteIds
        });
        if (!nextPreview) {
          stoppedReason = "unusable-stage";
          break;
        }
        currentPreview = nextPreview.routePreview;
      }
      const execution = {
        version: 1,
        outputKind: "linked-grammar-path-chain-execution",
        source: "linked-grammar-path-chain",
        initialSource: {
          sourceVerb: normalizedSourceVerb,
          sourceObjectPrefix: normalizedSourceObjectPrefix
        },
        requestedSelectionCount: requestedSelections.length,
        steps,
        stoppedReason,
        currentPreview,
        candidateRouteCount: Array.isArray(currentPreview?.routes) ? currentPreview.routes.length : 0,
        boundaries: {
          noNewRouteFamilies: true,
          noNewSurfaceRules: true,
          doesExecuteStages: true,
          doesNotMutateState: true
        }
      };
      return attachNawatLinkedGrammarPathContract(execution, {
        metadataKind: "linked-grammar-path-chain-execution",
        routeStage: "execute-chain",
        generationAllowed: true,
        evidenceStatus: stoppedReason ? "blocked" : "executed",
        sourceVerb: normalizedSourceVerb,
        sourceObjectPrefix: normalizedSourceObjectPrefix,
        currentSourceVerb: execution.currentPreview?.sourceVerb || ""
      });
    }
    function buildNawatLinkedGrammarPathSelectionSummary({
      sourceVerb = "",
      sourceObjectPrefix = "",
      selections = [],
      maxDepth = 8
    } = {}) {
      const chainPreview = previewNawatLinkedGrammarPathChain({
        sourceVerb,
        sourceObjectPrefix,
        selections,
        maxDepth
      });
      const currentPreview = chainPreview?.currentPreview || generateNawatDenominalRouteFamilyPreview({
        sourceVerb,
        sourceObjectPrefix
      });
      const selectedSteps = Array.isArray(chainPreview?.steps) ? chainPreview.steps.map(step => ({
        index: step.index,
        status: step.status || "",
        selection: step.selection || null,
        route: step.route || null,
        selectedStage: step.selectedStage || null,
        nextSource: step.nextSource || null,
        candidateRouteCount: step.candidateRouteCount || 0,
        diagnostics: Array.isArray(step.diagnostics) ? step.diagnostics.slice() : []
      })) : [];
      const currentSource = {
        sourceVerb: currentPreview?.sourceVerb || selectedSteps[selectedSteps.length - 1]?.nextSource?.sourceVerb || String(sourceVerb || "").trim(),
        sourceObjectPrefix: currentPreview?.sourceObjectPrefix || selectedSteps[selectedSteps.length - 1]?.nextSource?.objectPrefix || String(sourceObjectPrefix || "").trim()
      };
      const nextRoutes = (Array.isArray(currentPreview?.routes) ? currentPreview.routes : []).map(route => {
        const routeId = route.routeId || route.id || "";
        const appendableStages = (Array.isArray(route.stages) ? route.stages : []).filter(stage => stage?.nextSource?.canBecomeSource === true).map(stage => {
          const sourceVerb = getNawatLinkedGrammarPathStageSourceVerb(stage);
          const displaySurface = getNawatLinkedGrammarPathStageDisplaySurface(stage);
          return {
            routeId,
            routeFamily: route.routeFamily || "",
            stageKey: stage.key || "",
            stationKey: stage.stationKey || "",
            role: stage.role || "",
            surface: stage.surface || "",
            sourceVerb,
            displaySurface,
            mode: stage.nextSource?.mode || "",
            tenseValue: stage.nextSource?.tenseValue || "",
            objectPrefix: stage.nextSource?.objectPrefix || "",
            selection: {
              routeId,
              stageKey: stage.key || stage.stationKey || ""
            }
          };
        }).filter(stage => stage.sourceVerb);
        return {
          routeId,
          routeFamily: route.routeFamily || "",
          structuralAnalogue: route.structuralAnalogue || "",
          targetVerb: route.targetVerb || "",
          surface: route.surface || "",
          surfaceTrail: route.surfaceTrail || "",
          appendableStageCount: appendableStages.length,
          appendableStages
        };
      });
      const summary = {
        version: 1,
        outputKind: "linked-grammar-path-selection-summary",
        source: "linked-grammar-path-selection",
        initialSource: chainPreview?.initialSource || {
          sourceVerb: String(sourceVerb || "").trim(),
          sourceObjectPrefix: String(sourceObjectPrefix || "").trim()
        },
        currentSource,
        requestedSelectionCount: chainPreview?.requestedSelectionCount || 0,
        selectedSteps,
        stoppedReason: chainPreview?.stoppedReason || "",
        nextRoutes,
        appendableSelectionCount: nextRoutes.reduce((total, route) => total + route.appendableStageCount, 0),
        boundaries: {
          noNewRouteFamilies: true,
          noNewSurfaceRules: true,
          doesNotExecuteStages: true,
          doesNotMutateState: true,
          summaryOnly: true
        }
      };
      return attachNawatLinkedGrammarPathContract(summary, {
        metadataKind: "linked-grammar-path-selection-summary",
        routeStage: "summarize-selection",
        generationAllowed: false,
        evidenceStatus: summary.stoppedReason ? "blocked" : "selection-summary",
        sourceVerb: summary.initialSource.sourceVerb,
        sourceObjectPrefix: summary.initialSource.sourceObjectPrefix,
        currentSourceVerb: summary.currentSource.sourceVerb
      });
    }
    function normalizeNawatLinkedGrammarPathSelection(selection = null) {
      if (!selection || typeof selection !== "object") {
        return null;
      }
      const routeId = String(selection.routeId || selection.id || selection.routeTenseValue || selection.routeKey || "").trim();
      const stageKey = String(selection.stageKey || selection.stationKey || selection.key || "finite-surface").trim();
      if (!routeId || !stageKey) {
        return null;
      }
      return {
        routeId,
        stageKey
      };
    }
    function normalizeNawatLinkedGrammarPathSelections(selections = [], {
      maxDepth = 8
    } = {}) {
      const limit = Math.max(0, Number.isFinite(Number(maxDepth)) ? Number(maxDepth) : 8);
      return (Array.isArray(selections) ? selections : []).slice(0, limit).map(selection => normalizeNawatLinkedGrammarPathSelection(selection)).filter(Boolean);
    }
    function getActiveNawatLinkedGrammarPathSelections({
      stateStore = null,
      maxDepth = 8
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      return normalizeNawatLinkedGrammarPathSelections(state.activeLinkedGrammarPathSelections || [], {
        maxDepth
      });
    }
    function getActiveNawatLinkedGrammarPathSource({
      sourceVerb = "",
      sourceObjectPrefix = "",
      stateStore = null
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      return {
        sourceVerb: String(sourceVerb || state.activeLinkedGrammarPathSourceVerb || state.sourceVerb || state.activeStationInput || "").trim(),
        sourceObjectPrefix: String(sourceObjectPrefix || state.activeLinkedGrammarPathSourceObjectPrefix || state.sourceObjectPrefix || state.activeStationObjectPrefix || "").trim()
      };
    }
    function setActiveNawatLinkedGrammarPathSelections(selections = [], {
      sourceVerb = "",
      sourceObjectPrefix = "",
      maxDepth = 8,
      stateStore = null
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      const normalizedSelections = normalizeNawatLinkedGrammarPathSelections(selections, {
        maxDepth
      });
      const source = getActiveNawatLinkedGrammarPathSource({
        sourceVerb,
        sourceObjectPrefix,
        stateStore: state
      });
      state.activeLinkedGrammarPathSelections = normalizedSelections.map(selection => ({
        ...selection
      }));
      state.activeLinkedGrammarPathSourceVerb = source.sourceVerb;
      state.activeLinkedGrammarPathSourceObjectPrefix = source.sourceObjectPrefix;
      const summary = buildNawatLinkedGrammarPathSelectionSummary({
        ...source,
        selections: normalizedSelections,
        maxDepth
      });
      state.activeLinkedGrammarPathSelectionSummary = summary;
      state.activeLinkedGrammarPathExecution = null;
      state.activeLinkedGrammarPathPromotedSource = null;
      const selectionState = {
        version: 1,
        outputKind: "linked-grammar-path-selection-state",
        source: "linked-grammar-path-selection-state",
        activeSelections: normalizedSelections,
        summary,
        boundaries: {
          noNewRouteFamilies: true,
          noNewSurfaceRules: true,
          doesNotExecuteStages: true,
          mutatesSelectionStateOnly: true
        }
      };
      return attachNawatLinkedGrammarPathContract(selectionState, {
        metadataKind: "linked-grammar-path-selection-state",
        routeStage: "select-control",
        generationAllowed: false,
        evidenceStatus: summary?.stoppedReason ? "blocked" : "selection-state",
        sourceVerb: source.sourceVerb,
        sourceObjectPrefix: source.sourceObjectPrefix,
        currentSourceVerb: summary?.currentSource?.sourceVerb || source.sourceVerb
      });
    }
    function appendActiveNawatLinkedGrammarPathSelection(selection = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      maxDepth = 8,
      stateStore = null
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      const normalizedSelection = normalizeNawatLinkedGrammarPathSelection(selection);
      const activeSelections = getActiveNawatLinkedGrammarPathSelections({
        stateStore: state,
        maxDepth
      });
      const nextSelections = normalizedSelection ? [...activeSelections, normalizedSelection] : activeSelections;
      const selectionState = setActiveNawatLinkedGrammarPathSelections(nextSelections, {
        sourceVerb,
        sourceObjectPrefix,
        maxDepth,
        stateStore: state
      });
      const appendedState = {
        ...selectionState,
        appended: Boolean(normalizedSelection),
        appendedSelection: normalizedSelection
      };
      return attachNawatLinkedGrammarPathContract(appendedState, {
        metadataKind: "linked-grammar-path-selection-state",
        routeStage: "append-selection",
        generationAllowed: false,
        evidenceStatus: appendedState.summary?.stoppedReason ? "blocked" : "selection-appended",
        sourceVerb: appendedState.summary?.initialSource?.sourceVerb || "",
        sourceObjectPrefix: appendedState.summary?.initialSource?.sourceObjectPrefix || "",
        currentSourceVerb: appendedState.summary?.currentSource?.sourceVerb || ""
      });
    }
    function removeLastActiveNawatLinkedGrammarPathSelection({
      maxDepth = 8,
      stateStore = null
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      const activeSelections = getActiveNawatLinkedGrammarPathSelections({
        stateStore: state,
        maxDepth
      });
      const removedSelection = activeSelections[activeSelections.length - 1] || null;
      const nextSelections = activeSelections.slice(0, Math.max(0, activeSelections.length - 1));
      const selectionState = setActiveNawatLinkedGrammarPathSelections(nextSelections, {
        maxDepth,
        stateStore: state
      });
      const backtrackState = {
        ...selectionState,
        outputKind: "linked-grammar-path-selection-backtrack",
        removed: Boolean(removedSelection),
        removedSelection,
        boundaries: {
          ...selectionState.boundaries,
          backtracksSelectionStateOnly: true,
          doesNotExecuteStages: true
        }
      };
      return attachNawatLinkedGrammarPathContract(backtrackState, {
        metadataKind: "linked-grammar-path-selection-backtrack",
        routeStage: "backtrack-selection",
        generationAllowed: false,
        evidenceStatus: backtrackState.summary?.stoppedReason ? "blocked" : "selection-backtracked",
        sourceVerb: backtrackState.summary?.initialSource?.sourceVerb || "",
        sourceObjectPrefix: backtrackState.summary?.initialSource?.sourceObjectPrefix || "",
        currentSourceVerb: backtrackState.summary?.currentSource?.sourceVerb || ""
      });
    }
    function executeActiveNawatLinkedGrammarPathSelections({
      stateStore = null,
      maxDepth = 8,
      executionOptions = {}
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      const source = getActiveNawatLinkedGrammarPathSource({
        stateStore: state
      });
      const selections = getActiveNawatLinkedGrammarPathSelections({
        stateStore: state,
        maxDepth
      });
      const execution = executeNawatLinkedGrammarPathChain({
        ...source,
        selections,
        maxDepth,
        executionOptions
      });
      state.activeLinkedGrammarPathExecution = execution;
      return execution;
    }
    function getNawatLinkedGrammarPathExecutionSourceOptions(execution = null) {
      if (!execution || execution.outputKind !== "linked-grammar-path-chain-execution") {
        return [];
      }
      const steps = Array.isArray(execution.steps) ? execution.steps : [];
      return steps.filter(step => step?.status === "executed").map(step => {
        const generatedPrimarySurface = getPrimaryNawatRouteSurfaceForm(step?.generated);
        if (hasStateResultFrame(step?.generated) && !generatedPrimarySurface) {
          return null;
        }
        const nextSourcePrimarySurface = getPrimaryNawatRouteSurfaceForm(step?.nextSource);
        const hasNextSourceResultFrame = hasStateResultFrame(step?.nextSource);
        if (!generatedPrimarySurface && hasNextSourceResultFrame && !nextSourcePrimarySurface) {
          return null;
        }
        const selectedStagePrimarySurface = getPrimaryNawatRouteSurfaceForm(step?.selectedStage);
        const hasSelectedStageResultFrame = hasStateResultFrame(step?.selectedStage);
        if (!generatedPrimarySurface && !nextSourcePrimarySurface && hasSelectedStageResultFrame && !selectedStagePrimarySurface) {
          return null;
        }
        const sourceVerb = String(generatedPrimarySurface || nextSourcePrimarySurface || (!hasNextSourceResultFrame ? step?.nextSource?.sourceVerb : "") || selectedStagePrimarySurface || (!hasSelectedStageResultFrame ? step?.selectedStage?.sourceVerb : "") || "").trim();
        if (!sourceVerb) {
          return null;
        }
        const sourceInput = String(nextSourcePrimarySurface || (!hasNextSourceResultFrame ? step?.nextSource?.sourceVerb : "") || selectedStagePrimarySurface || (!hasSelectedStageResultFrame ? step?.selectedStage?.sourceVerb : "") || "").trim();
        const nextSourceDisplay = getStateResultDisplaySurface(step?.nextSource);
        const selectedStageDisplay = getStateResultDisplaySurface(step?.selectedStage);
        return {
          sourceVerb,
          sourceObjectPrefix: String(step?.nextSource?.objectPrefix || step?.selectedStage?.objectPrefix || "").trim(),
          displaySurface: String(generatedPrimarySurface || nextSourceDisplay || (!hasNextSourceResultFrame ? step?.nextSource?.displaySurface : "") || selectedStageDisplay || (!hasSelectedStageResultFrame ? step?.selectedStage?.displaySurface : "") || "").trim(),
          sourceInput,
          sourceInputDisplay: String(nextSourceDisplay || (!hasNextSourceResultFrame ? step?.nextSource?.displaySurface : "") || selectedStageDisplay || (!hasSelectedStageResultFrame ? step?.selectedStage?.displaySurface : "") || sourceInput || "").trim(),
          generatedSurface: String(generatedPrimarySurface || "").trim(),
          routeId: step?.selection?.routeId || step?.route?.routeId || "",
          stageKey: step?.selection?.stageKey || step?.selectedStage?.stationKey || "",
          fromStepIndex: step.index
        };
      }).filter(Boolean);
    }
    function getNawatLinkedGrammarPathExecutionFinalSource(execution = null) {
      const sourceOptions = getNawatLinkedGrammarPathExecutionSourceOptions(execution);
      return sourceOptions[sourceOptions.length - 1] || null;
    }
    function applyNawatLinkedGrammarPathSourceInput(source = null, {
      inputApplier = null
    } = {}) {
      const framedSourceVerb = getPrimaryNawatRouteSurfaceForm(source);
      const hasSourceResultFrame = hasStateResultFrame(source);
      const sourceVerb = String(framedSourceVerb || (!hasSourceResultFrame ? source?.sourceVerb || source?.inputValue || source?.displaySurface || "" : "")).trim();
      if (!sourceVerb) {
        return {
          applied: false,
          method: "",
          sourceVerb: "",
          reason: "missing-source"
        };
      }
      const displaySurface = getStateResultDisplaySurface(source) || (!hasSourceResultFrame ? String(source?.displaySurface || sourceVerb).trim() : sourceVerb);
      const generatedSurface = getStateResultDisplaySurface(source) || (!hasSourceResultFrame ? String(source?.generatedSurface || "").trim() : "");
      const sourceContext = {
        sourceVerb,
        sourceObjectPrefix: String(source?.sourceObjectPrefix || source?.objectPrefix || "").trim(),
        displaySurface,
        sourceInput: String(source?.sourceInput || "").trim(),
        sourceInputDisplay: String(source?.sourceInputDisplay || source?.sourceInput || "").trim(),
        generatedSurface,
        fromStepIndex: source?.fromStepIndex
      };
      if (typeof inputApplier === "function") {
        inputApplier(sourceVerb, sourceContext);
        return {
          applied: true,
          method: "input-applier",
          sourceVerb,
          sourceObjectPrefix: sourceContext.sourceObjectPrefix
        };
      }
      if (typeof targetObject.applyVerbInputReplacement === "function") {
        targetObject.applyVerbInputReplacement(sourceVerb);
        return {
          applied: true,
          method: "applyVerbInputReplacement",
          sourceVerb,
          sourceObjectPrefix: sourceContext.sourceObjectPrefix
        };
      }
      if (typeof applyNawatRouteStationInput === "function") {
        applyNawatRouteStationInput({
          inputValue: sourceVerb,
          objectPrefix: sourceContext.sourceObjectPrefix
        });
        return {
          applied: typeof targetObject.document !== "undefined",
          method: "applyNawatRouteStationInput",
          sourceVerb,
          sourceObjectPrefix: sourceContext.sourceObjectPrefix
        };
      }
      return {
        applied: false,
        method: "",
        sourceVerb,
        sourceObjectPrefix: sourceContext.sourceObjectPrefix,
        reason: "input-sync-unavailable"
      };
    }
    function promoteActiveNawatLinkedGrammarPathExecutionStepSource(stepIndex = null, {
      stateStore = null,
      maxDepth = 8,
      syncInput = false,
      inputApplier = null
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      const sourceOptions = getNawatLinkedGrammarPathExecutionSourceOptions(state.activeLinkedGrammarPathExecution);
      const requestedStepIndex = stepIndex == null ? null : Number.isFinite(Number(stepIndex)) ? Number(stepIndex) : null;
      const selectedSource = requestedStepIndex == null ? sourceOptions[sourceOptions.length - 1] : sourceOptions.find(option => Number(option.fromStepIndex) === requestedStepIndex);
      if (!selectedSource?.sourceVerb) {
        return null;
      }
      const selectionState = setActiveNawatLinkedGrammarPathSelections([], {
        sourceVerb: selectedSource.sourceVerb,
        sourceObjectPrefix: selectedSource.sourceObjectPrefix,
        maxDepth,
        stateStore: state
      });
      state.activeLinkedGrammarPathPromotedSource = selectedSource;
      const inputSync = syncInput ? applyNawatLinkedGrammarPathSourceInput(selectedSource, {
        inputApplier
      }) : {
        applied: false,
        method: "",
        sourceVerb: selectedSource.sourceVerb,
        sourceObjectPrefix: selectedSource.sourceObjectPrefix,
        reason: "not-requested"
      };
      const promotedState = {
        ...selectionState,
        outputKind: "linked-grammar-path-promoted-source",
        promotedSource: selectedSource,
        inputSync,
        boundaries: {
          ...selectionState.boundaries,
          doesNotExecuteStages: true,
          promotesSelectedGeneratedStageAsSource: true,
          promotesGeneratedStageAsSource: true,
          syncsPromotedSourceInputOnlyWhenRequested: true
        }
      };
      return attachNawatLinkedGrammarPathContract(promotedState, {
        metadataKind: "linked-grammar-path-promoted-source",
        routeStage: "promote-generated-source",
        generationAllowed: false,
        evidenceStatus: "source-promoted",
        sourceVerb: promotedState.summary?.initialSource?.sourceVerb || selectedSource.sourceVerb,
        sourceObjectPrefix: promotedState.summary?.initialSource?.sourceObjectPrefix || selectedSource.sourceObjectPrefix,
        currentSourceVerb: selectedSource.sourceVerb
      });
    }
    function promoteActiveNawatLinkedGrammarPathExecutionFinalSource(options = {}) {
      return promoteActiveNawatLinkedGrammarPathExecutionStepSource(null, options);
    }
    function clearActiveNawatLinkedGrammarPathSelections({
      stateStore = null
    } = {}) {
      const state = stateStore && typeof stateStore === "object" ? stateStore : getNawatRouteStateStore();
      state.activeLinkedGrammarPathSelections = [];
      state.activeLinkedGrammarPathSourceVerb = "";
      state.activeLinkedGrammarPathSourceObjectPrefix = "";
      state.activeLinkedGrammarPathSelectionSummary = null;
      state.activeLinkedGrammarPathExecution = null;
      state.activeLinkedGrammarPathPromotedSource = null;
      return [];
    }
    function getPrimaryNawatRouteSurfaceForm(result = null) {
      if (!result || result.error) {
        return "";
      }
      return getStateResultSurfaceForms(result)[0] || "";
    }
    function executeNawatRouteConfiguredGeneration(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = ""
    } = {}) {
      const routeTenseValue = profile?.routeTenseValue || "";
      const routeVerb = String(sourceVerb || "").trim();
      if (!profile || !routeTenseValue || !routeVerb || typeof targetObject.executeGenerateWordRequest !== "function") {
        return null;
      }
      const routeModeKey = profile.routeMode || "adjetivo";
      const routeMode = targetObject.TENSE_MODE[routeModeKey] || routeModeKey || targetObject.TENSE_MODE.adjetivo;
      const routeCombinedMode = profile.routeCombinedMode || profile.targetCombinedMode || profile.combinedMode || "";
      const routeDerivationMode = profile.routeDerivationMode || profile.derivationMode || (routeCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active);
      const routeVoiceMode = profile.routeVoiceMode || profile.voiceMode || (routeCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active);
      return targetObject.executeNuclearClauseSurfaceRequest({
        options: {
          silent: true,
          skipValidation: false,
          override: {
            tenseMode: routeMode,
            derivationMode: targetObject.DERIVATION_MODE[routeDerivationMode] || routeDerivationMode || targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE[routeVoiceMode] || routeVoiceMode || targetObject.VOICE_MODE.active
          }
        },
        posicionesFormula: {
          pers1: "",
          obj1: sourceObjectPrefix || "",
          tronco: routeVerb,
          pers2: "",
          num2: "",
          poseedor: "",
          tiempo: routeTenseValue
        },
        entradaTronco: {
          tieneControlTronco: false,
          valorTronco: ""
        }
      });
    }
    function resolveNawatRoutePatientivoTroncoStem(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = ""
    } = {}) {
      const routeVerb = String(sourceVerb || "").trim();
      if (!isPatientivoTroncoConversionRoute(profile) || !routeVerb || typeof targetObject.executeGenerateWordRequest !== "function") {
        return "";
      }
      const result = targetObject.executeNuclearClauseSurfaceRequest({
        options: {
          silent: true,
          skipValidation: false,
          override: {
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active,
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: ""
          }
        },
        posicionesFormula: {
          pers1: "",
          obj1: sourceObjectPrefix || "",
          tronco: routeVerb,
          pers2: "",
          num2: "",
          poseedor: "",
          tiempo: "patientivo"
        },
        entradaTronco: {
          tieneControlTronco: false,
          valorTronco: ""
        }
      });
      return getPrimaryNawatRouteSurfaceForm(result);
    }
    function resolveNawatRouteVerbalizedVerb(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceStem = ""
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
        sourceObjectPrefix
      });
      if (patientivoTroncoStem) {
        return `${patientivoTroncoStem}${verbalizer}`;
      }
      const routeResult = executeNawatRouteConfiguredGeneration(profile, {
        sourceVerb: routeVerb,
        sourceObjectPrefix
      });
      const routeSurface = getPrimaryNawatRouteSurfaceForm(routeResult);
      const surfaceSuffix = String(profile.surfaceSuffix || "").replace(/^-+/, "");
      if (routeSurface && surfaceSuffix && routeSurface.endsWith(surfaceSuffix)) {
        return `${routeSurface.slice(0, -surfaceSuffix.length)}${verbalizer}`;
      }
      if (routeSurface && routeSurface.endsWith(`${verbalizer}k`)) {
        return routeSurface.slice(0, -1);
      }
      const parsed = typeof targetObject.parseVerbInput === "function" && routeVerb ? targetObject.parseVerbInput(routeVerb) : null;
      const fallbackBase = parsed?.verb || routeVerb.replace(/[()]/g, "");
      return fallbackBase ? `${fallbackBase}${verbalizer}` : "";
    }
    function resolveNawatRouteTarget(routeKeyOrProfile = "", {
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceStem = "",
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.routeTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
      if (!profile) {
        return null;
      }
      const targetMode = getNawatRouteTargetMode(profile);
      const targetTenseValue = getNawatRouteTargetTenseValue(profile);
      const routeVerb = String(sourceVerb || "").trim();
      const routeStem = unwrapNawatRouteInputValue(sourceStem);
      const targetCombinedMode = profile.targetCombinedMode || profile.combinedMode || "";
      const targetDerivationMode = profile.targetDerivationMode || profile.derivationMode || (targetCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : "");
      const targetVoiceMode = profile.targetVoiceMode || profile.voiceMode || (targetCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : "");
      const patientivoSurfaceSpec = isPatientivoSurfaceRoute(profile) ? getNawatRoutePatientivoSurfaceSpec(profile, {
        sourceTenseValue: sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
        sourceCombinedMode: sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || ""
      }) : null;
      const targetVerb = targetMode === targetObject.TENSE_MODE.verbo ? resolveNawatRouteVerbalizedVerb(profile, {
        sourceVerb: routeVerb,
        sourceObjectPrefix,
        sourceStem: routeStem
      }) : routeVerb;
      const routeTarget = {
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
        targetObjectPrefix: targetMode === targetObject.TENSE_MODE.verbo && profile.valency === "intransitive" ? "" : sourceObjectPrefix || "",
        activePatientivoBranch: isPatientivoSurfaceRoute(profile) ? patientivoSurfaceSpec?.patientivoSource || profile.patientivoSource || "nonactive" : "",
        activePatientivoNominalSuffix: isPatientivoSurfaceRoute(profile) ? patientivoSurfaceSpec?.suffix || resolveNawatRoutePatientivoNominalSuffix(profile, {
          sourceTenseValue: sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
          sourceCombinedMode: sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || ""
        }) : ""
      };
      return attachNawatStaticRouteGrammarFrame(routeTarget, {
        profile,
        routeStage: "resolve-route-target",
        generationAllowed: true,
        supported: true
      });
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
        surface: station.surface || ""
      };
    }
    function getNawatDenominalRouteFamilyKey(profile = null) {
      const configuredFamily = String(profile?.denominalFamily || "").trim();
      if (configuredFamily) {
        return configuredFamily;
      }
      const verbalizer = String(profile?.verbalizer || "").replace(/^-+/, "");
      const valency = String(profile?.valency || "").trim();
      if (verbalizer === "ti" && valency === "intransitive") {
        return "vi-ti";
      }
      if (verbalizer === "iwi" && valency === "intransitive") {
        return "vi-iwi";
      }
      if (verbalizer === "awi" && valency === "intransitive") {
        return "vi-awi";
      }
      if (verbalizer === "na" && valency === "transitive") {
        return "vt-na";
      }
      return "unknown";
    }
    function getNawatDenominalRouteStructuralAnalogue(profile = null) {
      const configuredAnalogue = String(profile?.structuralAnalogue || "").trim();
      if (configuredAnalogue) {
        return configuredAnalogue;
      }
      const familyKey = getNawatDenominalRouteFamilyKey(profile);
      if (familyKey === "vi-ti") {
        return "inceptive-stative-ti-route";
      }
      if (familyKey === "vi-iwi" || familyKey === "vi-awi") {
        return "inceptive-stative-wi-route";
      }
      if (familyKey === "vt-na") {
        return "nawat-transitive-route-no-andrews-suffix";
      }
      return "unknown-denominal-route";
    }
    const NAWAT_DENOMINAL_ANDREWS_CONTRACT_SPECS = Object.freeze([Object.freeze({
      id: "54.2.1-inceptive-stative-ti",
      range: "54.2.1",
      lesson: 54,
      denominalFamily: "inceptive-stative-ti",
      structuralAnalogue: "inceptive-stative-ti-route",
      sourceCategory: "absolutive-state-nnc-predicate",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "verbalizer",
        classical: "ti"
      })]),
      currentRouteFamilies: Object.freeze(["vi-ti"]),
      supportStatus: "current-route-suffix-supported-partial",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        semanticFamilyComplete: false
      })
    }), Object.freeze({
      id: "54.2.2-inceptive-stative-hui",
      range: "54.2.2",
      lesson: 54,
      denominalFamily: "inceptive-stative-hui",
      structuralAnalogue: "inceptive-stative-hui-route",
      sourceCategory: "absolutive-state-nnc-predicate",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "verbalizer",
        classical: "hui"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-partial",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        noCurrentRoute: true,
        semanticFamilyComplete: false
      })
    }), Object.freeze({
      id: "54.2.2-hui-lia-causative",
      range: "54.2.2",
      lesson: 54,
      denominalFamily: "hui-lia-causative",
      structuralAnalogue: "single-object-causative-from-hui",
      sourceCategory: "intransitive-hui-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "single-object-causative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-verbalizer",
        classical: "hui"
      }), Object.freeze({
        role: "causative",
        classical: "lia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        requiresGeneratedHuiSource: true,
        causativeApplicativeFamilyModeled: false
      })
    }), Object.freeze({
      id: "54.2.3-inceptive-stative-ya",
      range: "54.2.3",
      lesson: 54,
      denominalFamily: "inceptive-stative-ya",
      structuralAnalogue: "inceptive-stative-ya-route",
      sourceCategory: "nounroot-or-nounstem-as-root",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "verbalizer",
        classical: "ya"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-partial",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        noCurrentRoute: true,
        semanticFamilyComplete: false
      })
    }), Object.freeze({
      id: "54.2.3-ti-ya-deverbal",
      range: "54.2.3",
      lesson: 54,
      denominalFamily: "ti-ya-deverbal-inceptive-stative",
      structuralAnalogue: "deverbal-ya-from-ti",
      sourceCategory: "intransitive-ti-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-verbalizer",
        classical: "ti"
      }), Object.freeze({
        role: "deverbal-inceptive-stative",
        classical: "ya"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        requiresGeneratedTiSource: true,
        traditionalSpellingAmbiguous: true
      })
    }), Object.freeze({
      id: "54.2.3-hui-ya-deverbal",
      range: "54.2.3",
      lesson: 54,
      denominalFamily: "hui-ya-deverbal-inceptive-stative",
      structuralAnalogue: "deverbal-ya-from-hui",
      sourceCategory: "intransitive-hui-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-verbalizer",
        classical: "hui"
      }), Object.freeze({
        role: "deverbal-inceptive-stative",
        classical: "ya"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        requiresGeneratedHuiSource: true,
        traditionalSpellingAmbiguous: true
      })
    }), Object.freeze({
      id: "54.2.3-ya-lia-causative",
      range: "54.2.3",
      lesson: 54,
      denominalFamily: "ya-lia-causative",
      structuralAnalogue: "single-object-causative-from-ya",
      sourceCategory: "intransitive-ya-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "single-object-causative-or-applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-verbalizer",
        classical: "ya"
      }), Object.freeze({
        role: "causative-or-applicative",
        classical: "lia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: false,
        sourceYaDeleted: true
      })
    }), Object.freeze({
      id: "54.2.4-inceptive-stative-a",
      range: "54.2.4",
      lesson: 54,
      denominalFamily: "inceptive-stative-a",
      structuralAnalogue: "inceptive-stative-a-route",
      sourceCategory: "nounstem",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "verbalizer",
        classical: "a"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-partial",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        limitedUse: true,
        noCurrentRoute: true
      })
    }), Object.freeze({
      id: "54.2.5-inceptive-stative-hua",
      range: "54.2.5",
      lesson: 54,
      denominalFamily: "inceptive-stative-hua",
      structuralAnalogue: "inceptive-stative-hua-route",
      sourceCategory: "deverbal-yo-nounstem",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "verbalizer",
        classical: "hua"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        noCurrentRoute: true,
        requiresDeverbalYoSource: true,
        notOaFormation: true
      })
    }), Object.freeze({
      id: "54.3-included-possessor-ti",
      range: "54.3",
      lesson: 54,
      denominalFamily: "included-possessor-ti",
      structuralAnalogue: "possessive-state-nnc-inclusion-ti",
      sourceCategory: "possessive-state-nnc-predicate",
      sourceState: "possessive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "verbalizer",
        classical: "ti"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        includedPossessorModeled: true,
        requiresPossessiveSource: true,
        possessorIncludedInsideVerbstem: true,
        possessiveCaseNotTransformedToObjective: true
      })
    }), Object.freeze({
      id: "54.4-possession-ti",
      range: "54.4",
      lesson: 54,
      denominalFamily: "possession-ti",
      structuralAnalogue: "possession-ti-route",
      sourceCategory: "nounstem-source",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "verbalizer",
        classical: "ti"
      })]),
      currentRouteFamilies: Object.freeze(["vi-ti"]),
      supportStatus: "suffix-shape-supported-semantics-unmodeled",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        possessionDenominalModeled: false
      })
    }), Object.freeze({
      id: "54.2-54.4-ti-lia-causative",
      range: "54.2.1/54.4",
      lesson: 54,
      denominalFamily: "ti-lia-causative",
      structuralAnalogue: "single-object-causative-from-ti",
      sourceCategory: "intransitive-ti-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "single-object-causative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-verbalizer",
        classical: "ti"
      }), Object.freeze({
        role: "causative",
        classical: "lia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresTiSource: true,
        singleObjectCausativeModeled: true
      })
    }), Object.freeze({
      id: "54.5-ti-a-causative",
      range: "54.5",
      lesson: 54,
      denominalFamily: "ti-a-causative",
      structuralAnalogue: "first-type-causative-from-ti",
      sourceCategory: "ti-vnc-from-nnc",
      sourceState: "absolutive-or-possessive",
      targetCategory: "vnc",
      valency: "single-or-double-object-causative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-verbalizer",
        classical: "ti"
      }), Object.freeze({
        role: "causative",
        classical: "a"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresTiSource: true,
        singleObjectTiSourceRouteOnly: true,
        possessiveSourceDoubleObjectUnmodeled: true
      })
    }), Object.freeze({
      id: "54.6-t-ia-applicative",
      range: "54.6",
      lesson: 54,
      denominalFamily: "t-ia-applicative",
      structuralAnalogue: "first-type-applicative-from-ti",
      sourceCategory: "intransitive-ti-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-verbalizer",
        classical: "ti"
      }), Object.freeze({
        role: "applicative",
        classical: "ia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresTiSource: true,
        replaciveTiFinalIDeleted: true,
        limitedTiApplicativeUse: true
      })
    }), Object.freeze({
      id: "55.1-temporal-tia",
      range: "55.1",
      lesson: 55,
      denominalFamily: "temporal-tia",
      structuralAnalogue: "temporal-intransitive-tia",
      sourceCategory: "compound-temporal-nnc",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "temporal-intransitive",
        classical: "tia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        temporalDenominalModeled: true,
        requiresTemporalCompoundSource: true,
        temporalMatrixMustBeTimeSegment: true,
        temporalEmbedMustBeNumeralNounstem: true
      })
    }), Object.freeze({
      id: "55.2-causative-tla",
      range: "55.2",
      lesson: 55,
      denominalFamily: "causative-tla",
      structuralAnalogue: "denominal-causative-tla",
      sourceCategory: "nounstem",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "causative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "causative",
        classical: "tla"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-partial",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        causativeTlaModeled: true,
        targetStemClassVerified: true,
        finiteGenerationRequiresObjectPrefix: true,
        applicativeCounterpartUnmodeled: true,
        intransitiveTlaNoteUnmodeled: true
      })
    }), Object.freeze({
      id: "55.2-tla-ti-lia-applicative",
      range: "55.2",
      lesson: 55,
      denominalFamily: "tla-ti-lia-applicative",
      structuralAnalogue: "applicative-from-causative-tla",
      sourceCategory: "causative-tla-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-causative",
        classical: "tla"
      }), Object.freeze({
        role: "applicative-replacement",
        classical: "ti-lia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresTlaCausativeSource: true,
        sourceTlaReplacedByTiBeforeLia: true,
        intransitiveTlaNoteUnmodeled: true
      })
    }), Object.freeze({
      id: "55.2-intransitive-tla",
      range: "55.2",
      lesson: 55,
      denominalFamily: "intransitive-tla",
      structuralAnalogue: "intransitive-become-tla",
      sourceCategory: "nounstem",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "intransitive",
        classical: "tla"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        limitedUse: true,
        veryLimitedUse: true,
        requiresIntransitiveTlaLexicalSource: true,
        distinctFromCausativeTla: true,
        noProductiveDirectGeneration: true,
        noCurrentRoute: true
      })
    }), Object.freeze({
      id: "55.2-intransitive-tla-ti-a-causative",
      range: "55.2 note",
      lesson: 55,
      denominalFamily: "intransitive-tla-ti-a-causative",
      structuralAnalogue: "causative-from-intransitive-tla",
      sourceCategory: "intransitive-tla-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "causative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-intransitive",
        classical: "tla"
      }), Object.freeze({
        role: "replacement-before-causative",
        classical: "ti-a"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresTlaIntransitiveSource: true,
        sourceTlaReplacedByTiBeforeA: true
      })
    }), Object.freeze({
      id: "55.2-intransitive-tla-ti-lia-applicative",
      range: "55.2 note",
      lesson: 55,
      denominalFamily: "intransitive-tla-ti-lia-applicative",
      structuralAnalogue: "applicative-from-intransitive-tla-causative",
      sourceCategory: "intransitive-tla-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-intransitive",
        classical: "tla"
      }), Object.freeze({
        role: "applicative-replacement",
        classical: "ti-lia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresTlaIntransitiveSource: true,
        sourceTlaReplacedByTiBeforeLia: true
      })
    }), Object.freeze({
      id: "55.3-intransitive-o-a-applicative-huia",
      range: "55.3",
      lesson: 55,
      denominalFamily: "intransitive-o-a-applicative-huia",
      structuralAnalogue: "intransitive-o-a-with-applicative-huia",
      sourceCategory: "nounstem",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive-and-single-object-applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "intransitive",
        classical: "o-a"
      }), Object.freeze({
        role: "applicative-counterpart",
        classical: "huia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-partial",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        intransitiveOaModeled: true,
        applicativeHuiaCounterpartModeled: true,
        targetStemClassVerified: true,
        oaSuffixNotCausative: true,
        finiteGenerationRequiresObjectPrefix: true,
        notVeryProductive: true
      })
    }), Object.freeze({
      id: "55.3-o-a-il-huia-al-huia-applicative-note",
      range: "55.3 note 2",
      lesson: 55,
      denominalFamily: "o-a-il-huia-al-huia-applicative-note",
      structuralAnalogue: "applicative-from-intransitive-o-a-via-hypothetical-i-hui-a-hui",
      sourceCategory: "intransitive-o-a-vnc",
      sourceState: "derived",
      targetCategory: "vnc",
      valency: "single-object-applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-intransitive",
        classical: "o-a"
      }), Object.freeze({
        role: "hypothetical-i-hui-applicative",
        classical: "i-l-huia"
      }), Object.freeze({
        role: "hypothetical-a-hui-applicative",
        classical: "a-l-huia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresIntransitiveOaSource: true,
        sourceOaBypassesTransitiveOaStep: true,
        hypotheticalIHuiAHuiSource: true,
        noProductiveDirectGeneration: true
      })
    }), Object.freeze({
      id: "55.4-adverbial-huia",
      range: "55.4",
      lesson: 55,
      denominalFamily: "adverbial-huia",
      structuralAnalogue: "adverbial-nounstem-huia",
      sourceCategory: "adverbial-nounstem",
      sourceState: "adverbialized",
      targetCategory: "vnc",
      valency: "applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "applicative",
        classical: "huia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresAdverbialSource: true,
        sourceMustBeConfirmedAdverbialNounstem: true,
        doesNotTreatConfiguredAdverbioAsAutomaticEvidence: true,
        finiteGenerationRequiresObjectPrefix: true,
        noProductiveDirectGeneration: true
      })
    }), Object.freeze({
      id: "55.5-relational-compound-o-a-huia",
      range: "55.5",
      lesson: 55,
      denominalFamily: "relational-compound-o-a-huia",
      structuralAnalogue: "relational-compound-o-a-huia",
      sourceCategory: "compound-relational-nounstem",
      sourceState: "relational",
      targetCategory: "vnc",
      valency: "usually-transitive-or-applicative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "transitive-or-intransitive",
        classical: "o-a"
      }), Object.freeze({
        role: "applicative",
        classical: "huia"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        requiresRelationalCompoundSource: true,
        sourceMustBeConfirmedRelationalCompoundOrPredicate: true,
        doesNotTreatRelationalBoundaryFrameAsAutomaticEvidence: true,
        relationalOaUsuallyTransitiveExceptionallyIntransitive: true,
        finiteGenerationRequiresObjectPrefix: true,
        noProductiveDirectGeneration: true
      })
    }), Object.freeze({
      id: "55.6-i-hui-a-hui-to-o-a",
      range: "55.6",
      lesson: 55,
      denominalFamily: "i-hui-a-hui-to-o-a",
      structuralAnalogue: "destockal-i-hui-a-hui-to-o-a",
      sourceCategory: "nounstem",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "intransitive-to-transitive-causative",
      suffixContracts: Object.freeze([Object.freeze({
        role: "source-intransitive",
        classical: "i-hui"
      }), Object.freeze({
        role: "source-intransitive",
        classical: "a-hui"
      }), Object.freeze({
        role: "target-causative",
        classical: "o-a"
      })]),
      currentRouteFamilies: Object.freeze(["vi-iwi", "vi-awi"]),
      supportStatus: "executable-rule-supported-source-evidence-required",
      generationStatus: "source-evidence-route-supported",
      boundaryFlags: Object.freeze({
        causativeApplicativeFamilyModeled: true,
        iHuiAHuiSourcesModeled: true,
        requiresIHuiOrAHuiSource: true,
        sourceIHuiAHuiBecomesOaCausative: true,
        iHuiAHuiSourceClassB: true,
        targetOaClassC: true,
        finiteGenerationRequiresObjectPrefix: true,
        noProductiveDirectOaGeneration: true
      })
    }), Object.freeze({
      id: "55.7-transitive-i-a",
      range: "55.7",
      lesson: 55,
      denominalFamily: "transitive-i-a",
      structuralAnalogue: "transitive-denominal-i-a",
      sourceCategory: "nounstem-plus-i",
      sourceState: "absolutive",
      targetCategory: "vnc",
      valency: "transitive",
      suffixContracts: Object.freeze([Object.freeze({
        role: "transitive",
        classical: "i-a"
      })]),
      currentRouteFamilies: Object.freeze([]),
      supportStatus: "executable-rule-supported-source-final-guarded",
      generationStatus: "route-surface-supported",
      boundaryFlags: Object.freeze({
        transitiveDenominalModeled: true,
        noIntransitiveCounterpart: true,
        sourceFinalPatternGuarded: true,
        finiteGenerationRequiresObjectPrefix: true,
        wFinalSourceMayBeHuia: true,
        sourceIFormMayBelongToNounstem: true,
        sourceIHuiCausativePathPossible: true
      })
    })]);
    function hasAndrewsDenominalSuffixContract(profile = null) {
      return getNawatDenominalRouteStructuralAnalogue(profile) !== "nawat-transitive-route-no-andrews-suffix";
    }
    function getNawatDenominalRouteCurriculumRef(profile = null) {
      if (hasAndrewsDenominalSuffixContract(profile)) {
        return {
          source: "Andrews",
          range: "54-55",
          role: "structural-analogue"
        };
      }
      return {
        source: "Nawat route data",
        range: "static_modes",
        role: "configured-denominal-route"
      };
    }
    function getNawatDenominalRouteSupportStatus(profile = null, {
      inventory = false
    } = {}) {
      if (hasAndrewsDenominalSuffixContract(profile)) {
        return inventory ? "current-route-supported-partial" : "current-route-supported";
      }
      return inventory ? "current-route-supported-nawat-only-partial" : "current-route-supported-nawat-only";
    }
    function getNawatDenominalRouteSuffixContract(profile = null) {
      const familyKey = getNawatDenominalRouteFamilyKey(profile);
      const contractByFamily = {
        "vi-ti": {
          range: "54.2/54.4",
          classicalSuffix: "ti"
        },
        "vi-iwi": {
          range: "55.6",
          classicalSuffix: "i-hui"
        },
        "vi-awi": {
          range: "55.6",
          classicalSuffix: "a-hui"
        }
      };
      const contractSpec = contractByFamily[familyKey];
      if (!contractSpec) {
        return null;
      }
      const orthographyConversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(contractSpec.classicalSuffix, {
        source: "Andrews Lessons 54-55 denominal route suffix"
      }) : null;
      const nawatRuleSuffix = orthographyConversion?.output || contractSpec.classicalSuffix;
      return {
        kind: "denominal-route-suffix-contract",
        curriculumRef: {
          source: "Andrews",
          range: contractSpec.range,
          role: "suffix-family"
        },
        routeFamily: familyKey,
        classicalSuffix: contractSpec.classicalSuffix,
        nawatRuleSuffix,
        nawatVerbalizer: `-${String(nawatRuleSuffix || "").replace(/-/g, "")}`,
        routeVerbalizer: String(profile?.verbalizer || "").trim(),
        orthographyConversion,
        boundaries: {
          noFixtureEvidence: true,
          noNewSurfaceForms: true,
          suffixFamilyInventoryComplete: false
        }
      };
    }
    function buildNawatDenominalAndrewsSuffixContract(entry = null, contractId = "") {
      const classicalSuffix = String(entry?.classical || "").trim();
      const orthographyConversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(classicalSuffix, {
        source: `Andrews denominal contract ${contractId}`
      }) : null;
      const nawatRuleSuffix = orthographyConversion?.output || classicalSuffix;
      return {
        role: entry?.role || "",
        classicalSuffix,
        nawatRuleSuffix,
        nawatVerbalizer: `-${String(nawatRuleSuffix || "").replace(/-/g, "")}`,
        orthographyConversion
      };
    }
    function getNawatRouteIdsForDenominalFamilies(routeFamilies = []) {
      const familySet = new Set((Array.isArray(routeFamilies) ? routeFamilies : []).map(family => String(family || "").trim()).filter(Boolean));
      if (!familySet.size) {
        return [];
      }
      return getNawatRouteProfiles().filter(profile => familySet.has(getNawatDenominalRouteFamilyKey(profile))).map(profile => profile.id || "").filter(Boolean);
    }
    function getNawatDenominalRouteFamiliesWithoutAndrewsContract() {
      return Array.from(new Set(getNawatRouteProfiles().filter(profile => isPatientivoTroncoConversionRoute(profile)).filter(profile => !hasAndrewsDenominalSuffixContract(profile)).map(profile => getNawatDenominalRouteFamilyKey(profile)).filter(Boolean))).sort();
    }
    function getNawatDenominalAndrewsContractInventory() {
      return NAWAT_DENOMINAL_ANDREWS_CONTRACT_SPECS.map(spec => {
        const suffixContracts = Array.isArray(spec.suffixContracts) ? spec.suffixContracts.map(entry => buildNawatDenominalAndrewsSuffixContract(entry, spec.id)) : [];
        const currentRouteFamilies = Array.isArray(spec.currentRouteFamilies) ? Array.from(spec.currentRouteFamilies) : [];
        const executableRuleContracts = getNawatDenominalAndrewsExecutableRuleContractsForContract(spec.id).map(rule => summarizeNawatDenominalAndrewsExecutableRuleContract(rule)).filter(Boolean);
        return {
          version: 1,
          curriculumRef: {
            source: "Andrews",
            range: spec.range,
            role: "denominal-contract"
          },
          outputKind: "denominal-andrews-contract",
          id: spec.id,
          lesson: spec.lesson,
          range: spec.range,
          denominalFamily: spec.denominalFamily,
          structuralAnalogue: spec.structuralAnalogue,
          sourceCategory: spec.sourceCategory,
          sourceState: spec.sourceState,
          targetCategory: spec.targetCategory,
          valency: spec.valency,
          suffixContracts,
          currentRouteFamilies,
          currentRouteIds: getNawatRouteIdsForDenominalFamilies(currentRouteFamilies),
          supportStatus: spec.supportStatus,
          generationStatus: spec.generationStatus,
          executableRuleIds: executableRuleContracts.map(rule => rule.id),
          executableRuleContracts,
          executableRuleContractAvailable: executableRuleContracts.length > 0,
          routeSurfaceGenerationAvailable: spec.generationStatus !== "not-generated",
          generationAllowed: false,
          boundaries: {
            noNewSurfaceForms: true,
            noFixtureEvidence: true,
            structuralInventoryOnly: executableRuleContracts.length === 0,
            executableRuleContractAvailable: executableRuleContracts.length > 0,
            fullLessonGenerationModeled: false,
            ...(spec.boundaryFlags || {})
          }
        };
      });
    }
    function getNawatDenominalAndrewsContractCoverageSummary() {
      const contracts = getNawatDenominalAndrewsContractInventory();
      const routeCovered = contracts.filter(contract => contract.currentRouteFamilies.length > 0);
      const unmodeled = contracts.filter(contract => contract.generationStatus === "not-generated");
      const targetUnmodeled = contracts.filter(contract => contract.generationStatus === "source-route-surface-supported");
      const nawatOnlyRouteFamilies = getNawatDenominalRouteFamiliesWithoutAndrewsContract();
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2-55.7",
          role: "denominal-contract-inventory"
        },
        outputKind: "denominal-andrews-contract-coverage",
        contractCount: contracts.length,
        routeCoveredContractCount: routeCovered.length,
        unmodeledContractCount: unmodeled.length,
        targetUnmodeledContractCount: targetUnmodeled.length,
        nawatOnlyRouteFamilies,
        unmodeledContractIds: unmodeled.map(contract => contract.id),
        targetUnmodeledContractIds: targetUnmodeled.map(contract => contract.id),
        boundaries: {
          noNewSurfaceForms: true,
          noFixtureEvidence: true,
          structuralInventoryOnly: unmodeled.length > 0 || targetUnmodeled.length > 0,
          fullLessonGenerationModeled: false
        }
      };
    }
    const LESSON54_DENOMINAL_VERBSTEM_PDF_REFS = Object.freeze(["Andrews Lesson 54.1", "Andrews Lesson 54.2", "Andrews Lesson 54.2.1", "Andrews Lesson 54.2.2", "Andrews Lesson 54.2.3", "Andrews Lesson 54.2.4", "Andrews Lesson 54.2.5", "Andrews Lesson 54.3", "Andrews Lesson 54.4", "Andrews Lesson 54.5", "Andrews Lesson 54.6"]);
    const LESSON54_DENOMINAL_VERBSTEM_VALIDATION_REFS = Object.freeze(["src/tests/state.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    function getLesson54DenominalVerbstemSubsectionFrames(contracts = null) {
      const lesson54Contracts = Array.isArray(contracts) ? contracts : getNawatDenominalAndrewsContractInventory().filter(contract => contract.lesson === 54);
      const contractIdsByRange = (ranges = []) => lesson54Contracts.filter(contract => ranges.includes(contract.range)).map(contract => contract.id);
      return [{
        range: "54.1",
        role: "denominal-verbstem-architecture",
        directive: "Verbstems may be derived from nounstems by suffix-like stem-forming operations, while the compounding alternative remains a diagnostic boundary.",
        contractIds: [],
        redirectAction: "reframe-metadata",
        generationStatus: "architecture-only"
      }, {
        range: "54.2",
        role: "inceptive-stative-suffix-family",
        directive: "Model ti, hui, ya, a, hua as intransitive inceptive/stative verbstem-forming operations; ti-ya and hui-ya are source-dependent and not the causative/applicative tia/huia of earlier lessons.",
        contractIds: contractIdsByRange(["54.2.1", "54.2.2", "54.2.3", "54.2.4", "54.2.5"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "route-or-source-evidence-supported-partial"
      }, {
        range: "54.3",
        role: "included-possessor-ti",
        directive: "Attach ti to the predicate of a possessive-state NNC with the possessor kept inside the verbstem, not transformed into an object slot.",
        contractIds: contractIdsByRange(["54.3"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "source-evidence-route-supported"
      }, {
        range: "54.4",
        role: "possession-ti",
        directive: "Keep ti of possession separate from inceptive/stative ti: it means having or possessing the nounstem source and does not form deverbal ya.",
        contractIds: contractIdsByRange(["54.4", "54.2.1/54.4"]),
        redirectAction: "reframe-metadata",
        generationStatus: "suffix-shape-supported-semantics-partial"
      }, {
        range: "54.5",
        role: "ti-a-causative",
        directive: "Separate first-type causative ti-a from homophonous type-two tia, and keep the possessive-state double-object path unmodeled unless source evidence licenses it.",
        contractIds: contractIdsByRange(["54.5"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "source-evidence-route-supported"
      }, {
        range: "54.6",
        role: "t-ia-applicative",
        directive: "Route the limited applicative as t-ia from a replacive ti stem lacking final i, distinct from ti-a/tia.",
        contractIds: contractIdsByRange(["54.6"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "source-evidence-route-supported"
      }];
    }
    function buildLesson54DenominalVerbstemPursuitFrame() {
      const lesson54Contracts = getNawatDenominalAndrewsContractInventory().filter(contract => contract.lesson === 54);
      const executableRuleIds = lesson54Contracts.flatMap(contract => Array.isArray(contract.executableRuleIds) ? contract.executableRuleIds : []);
      const routeCoveredContractIds = lesson54Contracts.filter(contract => Array.isArray(contract.currentRouteFamilies) && contract.currentRouteFamilies.length > 0).map(contract => contract.id);
      const sourceEvidenceRequiredContractIds = lesson54Contracts.filter(contract => /source-evidence-required/.test(String(contract.supportStatus || ""))).map(contract => contract.id);
      return {
        version: 1,
        outputKind: "lesson-54-denominal-verbstem-pursuit-frame",
        curriculumRef: {
          source: "Andrews",
          range: "54.1-54.6",
          role: "plan-pursue-step"
        },
        stepNumber: 54,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON54_DENOMINAL_VERBSTEM_PDF_REFS),
        directive: "Use Andrews Lesson 54 to direct denominal verbstem part-one architecture: inceptive/stative suffixes, included-possessor ti, possession ti, ti-lia, ti-a, and t-ia boundaries before any Nawat/Pipil finite output is treated as confirmed.",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: Array.from(LESSON54_DENOMINAL_VERBSTEM_VALIDATION_REFS),
        plannedArrows: [{
          id: "lesson-54-denominal-verbstem-audit",
          type: "metadata-engine-test",
          aim: "Audit Andrews Lesson 54.1-54.6 against the current denominal contract inventory, source-evidence gates, orthography bridge, and finite-generation blockers.",
          andrewsRefs: Array.from(LESSON54_DENOMINAL_VERBSTEM_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON54_DENOMINAL_VERBSTEM_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-54-denominal-verbstem-audit",
          result: "hit",
          correction: "Lesson 54 now has a Plan/Pursue frame over the existing denominal contract inventory, executable-rule contracts, source-evidence gates, and partial route support.",
          andrewsRefs: Array.from(LESSON54_DENOMINAL_VERBSTEM_PDF_REFS),
          feedbackRefs: Array.from(LESSON54_DENOMINAL_VERBSTEM_VALIDATION_REFS)
        }],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        remainingGap: "Full Lesson 54 lexical-source classification, source-state parsing, possession-ti semantics, possessive-state double-object ti-a, limited a/hua inventories, static Nawat/Pipil examples, and visible UI actions remain partial or evidence-needed.",
        subsectionFrames: getLesson54DenominalVerbstemSubsectionFrames(lesson54Contracts),
        contractCoverage: {
          contractCount: lesson54Contracts.length,
          routeCoveredContractCount: routeCoveredContractIds.length,
          sourceEvidenceRequiredContractCount: sourceEvidenceRequiredContractIds.length,
          executableRuleContractCount: executableRuleIds.length,
          routeCoveredContractIds,
          sourceEvidenceRequiredContractIds,
          executableRuleIds
        },
        boundaries: {
          noClassicalSurfaceImport: true,
          noNewFixtureEvidence: true,
          noSilentGeneration: true,
          fullLessonGenerationModeled: false,
          visibleUiSpanishRequired: true
        }
      };
    }
    const LESSON55_DENOMINAL_VERBSTEM_PDF_REFS = Object.freeze(["Andrews Lesson 55.1", "Andrews Lesson 55.2", "Andrews Lesson 55.3", "Andrews Lesson 55.4", "Andrews Lesson 55.5", "Andrews Lesson 55.6", "Andrews Lesson 55.7"]);
    const LESSON55_DENOMINAL_VERBSTEM_VALIDATION_REFS = Object.freeze(["src/tests/state.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    function getLesson55DenominalVerbstemSubsectionFrames(contracts = null) {
      const lesson55Contracts = Array.isArray(contracts) ? contracts : getNawatDenominalAndrewsContractInventory().filter(contract => contract.lesson === 55);
      const contractIdsByRange = (ranges = []) => lesson55Contracts.filter(contract => ranges.includes(contract.range)).map(contract => contract.id);
      return [{
        range: "55.1",
        role: "temporal-tia",
        directive: "Treat temporal tia as intransitive and source-limited: it requires a compound nounstem with a time-segment matrix and numeral embed, not causative or applicative tia.",
        contractIds: contractIdsByRange(["55.1"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "source-evidence-route-supported"
      }, {
        range: "55.2",
        role: "causative-and-intransitive-tla",
        directive: "Separate causative tla Class A from the much less productive intransitive be/become tla, and replace tla with ti before lia or causative a only when the matching generated tla source exists.",
        contractIds: contractIdsByRange(["55.2", "55.2 note"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "route-or-source-evidence-supported-partial"
      }, {
        range: "55.3",
        role: "intransitive-o-a-and-huia-counterpart",
        directive: "Keep intransitive o-a and its single-object huia counterpart as Class C denominal operations, with note-2 i-l-huia/a-l-huia paths licensed only from a generated intransitive o-a source.",
        contractIds: contractIdsByRange(["55.3", "55.3 note 2"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "route-or-source-evidence-supported-partial"
      }, {
        range: "55.4",
        role: "adverbial-huia",
        directive: "Route adverbial huia only from confirmed Lesson 44 adverbial nounstem evidence; configured adverbio outputs or diagnostic labels do not create source evidence.",
        contractIds: contractIdsByRange(["55.4"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "source-evidence-route-supported"
      }, {
        range: "55.5",
        role: "relational-compound-o-a-huia",
        directive: "Route relational-compound o-a and huia only from confirmed relational compound nounstems or possessive relational predicates; boundary metadata alone is not lexical source evidence.",
        contractIds: contractIdsByRange(["55.5"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "source-evidence-route-supported"
      }, {
        range: "55.6",
        role: "i-hui-a-hui-to-o-a",
        directive: "Treat i-hui/a-hui as Class B intransitive denominal sources and o-a as the Class C causative counterpart, while keeping the o-a path source-evidence-gated.",
        contractIds: contractIdsByRange(["55.6"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "current-route-and-source-evidence-supported-partial"
      }, {
        range: "55.7",
        role: "transitive-i-a",
        directive: "Treat transitive i-a as a nounstem-plus-i plus causative-a route with no intransitive counterpart; source-final patterns and w-final/i-source notes remain diagnostics, not fixture evidence.",
        contractIds: contractIdsByRange(["55.7"]),
        redirectAction: "needs-nawat-evidence",
        generationStatus: "route-surface-supported-diagnostic-final-patterns"
      }];
    }
    function buildLesson55DenominalVerbstemPursuitFrame() {
      const lesson55Contracts = getNawatDenominalAndrewsContractInventory().filter(contract => contract.lesson === 55);
      const executableRuleIds = lesson55Contracts.flatMap(contract => Array.isArray(contract.executableRuleIds) ? contract.executableRuleIds : []);
      const routeCoveredContractIds = lesson55Contracts.filter(contract => Array.isArray(contract.currentRouteFamilies) && contract.currentRouteFamilies.length > 0).map(contract => contract.id);
      const sourceEvidenceRequiredContractIds = lesson55Contracts.filter(contract => /source-evidence-required/.test(String(contract.supportStatus || ""))).map(contract => contract.id);
      return {
        version: 1,
        outputKind: "lesson-55-denominal-verbstem-pursuit-frame",
        curriculumRef: {
          source: "Andrews",
          range: "55.1-55.7",
          role: "plan-pursue-step"
        },
        stepNumber: 55,
        aimStatus: "shooting",
        pdfRefs: Array.from(LESSON55_DENOMINAL_VERBSTEM_PDF_REFS),
        directive: "Use Andrews Lesson 55 to direct denominal verbstem part-two architecture: temporal tia, causative and intransitive tla, intransitive o-a with huia counterparts, adverbial huia, relational-compound o-a/huia, i-hui/a-hui to o-a, and transitive i-a before any Nawat/Pipil finite output is treated as confirmed.",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: Array.from(LESSON55_DENOMINAL_VERBSTEM_VALIDATION_REFS),
        plannedArrows: [{
          id: "lesson-55-denominal-verbstem-audit",
          type: "metadata-engine-test",
          aim: "Audit Andrews Lesson 55.1-55.7 against the current denominal contract inventory, source-evidence gates, orthography bridge, current i-hui/a-hui route support, and finite-generation blockers.",
          andrewsRefs: Array.from(LESSON55_DENOMINAL_VERBSTEM_PDF_REFS),
          expectedFeedbackRefs: Array.from(LESSON55_DENOMINAL_VERBSTEM_VALIDATION_REFS)
        }],
        firedArrows: [{
          id: "lesson-55-denominal-verbstem-audit",
          result: "hit",
          correction: "Lesson 55 now has a Plan/Pursue frame over the existing denominal contract inventory, executable-rule contracts, source-evidence gates, orthography bridge, and partial i-hui/a-hui route support.",
          andrewsRefs: Array.from(LESSON55_DENOMINAL_VERBSTEM_PDF_REFS),
          feedbackRefs: Array.from(LESSON55_DENOMINAL_VERBSTEM_VALIDATION_REFS)
        }],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        remainingGap: "Full Lesson 55 lexical-source classification, temporal compound parsing, causative versus intransitive tla inventories, o-a/huia lexical meanings, adverbial and relational source detection, static Nawat/Pipil examples, visible UI actions, and confirmed Nawat/Pipil surfaces remain partial or evidence-needed.",
        subsectionFrames: getLesson55DenominalVerbstemSubsectionFrames(lesson55Contracts),
        contractCoverage: {
          contractCount: lesson55Contracts.length,
          routeCoveredContractCount: routeCoveredContractIds.length,
          sourceEvidenceRequiredContractCount: sourceEvidenceRequiredContractIds.length,
          executableRuleContractCount: executableRuleIds.length,
          routeCoveredContractIds,
          sourceEvidenceRequiredContractIds,
          executableRuleIds
        },
        boundaries: {
          noClassicalSurfaceImport: true,
          noNewFixtureEvidence: true,
          noSilentGeneration: true,
          fullLessonGenerationModeled: false,
          visibleUiSpanishRequired: true
        }
      };
    }
    const NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID = Object.freeze({
      "54.2.1-inceptive-stative-ti": Object.freeze([Object.freeze({
        id: "ti",
        role: "inceptive-stative",
        classicalSuffixSequence: "ti",
        targetValency: "intransitive",
        targetStemClassBySourceFinalType: Object.freeze({
          consonant: "A",
          vowel: "A/B"
        }),
        targetStemClassRule: "54.2.1-source-final"
      })]),
      "54.2.2-inceptive-stative-hui": Object.freeze([Object.freeze({
        id: "hui",
        role: "inceptive-stative",
        classicalSuffixSequence: "hui",
        targetValency: "intransitive",
        targetStemClassBySourceFinalType: Object.freeze({
          consonant: "A",
          vowel: "B"
        }),
        targetStemClassRule: "54.2.2-source-final"
      })]),
      "54.2.2-hui-lia-causative": Object.freeze([Object.freeze({
        id: "hui-lia",
        role: "single-object-causative",
        classicalSuffixSequence: "hui-lia",
        targetValency: "transitive",
        segmentedPrefix: "hui",
        segmentedSuffix: "lia",
        requiresHuiSource: true
      })]),
      "54.2.3-inceptive-stative-ya": Object.freeze([Object.freeze({
        id: "ya",
        role: "inceptive-stative",
        classicalSuffixSequence: "ya",
        targetValency: "intransitive",
        targetStemClass: "A/B",
        targetStemClassRule: "54.2.3-a-or-b"
      })]),
      "54.2.3-ti-ya-deverbal": Object.freeze([Object.freeze({
        id: "ti-ya",
        role: "deverbal-inceptive-stative-from-ti",
        classicalSuffixSequence: "ti-ya",
        targetValency: "intransitive",
        targetStemClass: "A/B",
        targetStemClassRule: "54.2.3-ti-ya-a-or-b",
        segmentedPrefix: "ti",
        segmentedSuffix: "ya",
        requiresTiSource: true,
        traditionalSpelling: "tia",
        traditionalSpellingConfusableWith: "causative-tia"
      })]),
      "54.2.3-hui-ya-deverbal": Object.freeze([Object.freeze({
        id: "hui-ya",
        role: "deverbal-inceptive-stative-from-hui",
        classicalSuffixSequence: "hui-ya",
        targetValency: "intransitive",
        targetStemClass: "B",
        targetStemClassRule: "54.2.3-hui-ya-class-b",
        segmentedPrefix: "hui",
        segmentedSuffix: "ya",
        requiresHuiSource: true,
        traditionalSpelling: "huia",
        traditionalSpellingConfusableWith: "applicative-huia"
      })]),
      "54.2.3-ya-lia-causative": Object.freeze([Object.freeze({
        id: "ya-lia",
        role: "single-object-causative-or-applicative",
        classicalSuffixSequence: "lia",
        targetValency: "transitive",
        droppedSourceSuffix: "ya",
        requiresYaSource: true
      })]),
      "54.2.4-inceptive-stative-a": Object.freeze([Object.freeze({
        id: "a",
        role: "inceptive-stative",
        classicalSuffixSequence: "a",
        targetValency: "intransitive",
        targetStemClass: "C",
        targetStemClassRule: "54.2.4-limited-class-c",
        limitedUse: true
      })]),
      "54.2.5-inceptive-stative-hua": Object.freeze([Object.freeze({
        id: "hua",
        role: "inceptive-stative",
        classicalSuffixSequence: "hua",
        targetValency: "intransitive",
        targetStemClass: "A",
        targetStemClassRule: "54.2.5-hua-class-a",
        requiresDeverbalYoSource: true,
        notOaFormation: true
      })]),
      "54.3-included-possessor-ti": Object.freeze([Object.freeze({
        id: "included-possessor-ti",
        role: "included-possessor",
        classicalSuffixSequence: "ti",
        targetValency: "intransitive",
        targetStemClass: "A",
        requiresPossessiveSource: true
      })]),
      "54.4-possession-ti": Object.freeze([Object.freeze({
        id: "possession-ti",
        role: "possession",
        classicalSuffixSequence: "ti",
        targetValency: "intransitive",
        targetStemClass: "A/B",
        noDeverbalYa: true
      })]),
      "54.2-54.4-ti-lia-causative": Object.freeze([Object.freeze({
        id: "ti-lia",
        role: "single-object-causative",
        classicalSuffixSequence: "ti-lia",
        targetValency: "transitive",
        targetStemClass: "C",
        segmentedPrefix: "ti",
        segmentedSuffix: "lia",
        requiresTiSource: true
      })]),
      "54.5-ti-a-causative": Object.freeze([Object.freeze({
        id: "ti-a",
        role: "first-type-causative",
        classicalSuffixSequence: "ti-a",
        targetValency: "transitive",
        targetStemClass: "C",
        segmentedPrefix: "ti",
        segmentedSuffix: "a",
        requiresTiSource: true,
        singleObjectTiSourceRouteOnly: true,
        possessiveSourceDoubleObjectUnmodeled: true
      })]),
      "54.6-t-ia-applicative": Object.freeze([Object.freeze({
        id: "t-ia",
        role: "first-type-applicative",
        classicalSuffixSequence: "t-ia",
        targetValency: "applicative",
        targetStemClass: "C",
        segmentedPrefix: "t",
        segmentedSuffix: "ia",
        replaciveTiFinalIDeleted: true,
        requiresTiSource: true,
        limitedTiApplicativeUse: true
      })]),
      "55.1-temporal-tia": Object.freeze([Object.freeze({
        id: "tia",
        role: "temporal-intransitive",
        classicalSuffixSequence: "tia",
        targetValency: "intransitive",
        requiresTemporalCompoundSource: true
      })]),
      "55.2-causative-tla": Object.freeze([Object.freeze({
        id: "tla",
        role: "causative",
        classicalSuffixSequence: "tla",
        targetValency: "transitive",
        targetStemClass: "A"
      })]),
      "55.2-tla-ti-lia-applicative": Object.freeze([Object.freeze({
        id: "tla-ti-lia",
        role: "applicative-counterpart",
        classicalSuffixSequence: "ti-lia",
        targetValency: "applicative",
        segmentedPrefix: "ti",
        segmentedSuffix: "lia",
        sourceTlaReplacedByTiBeforeLia: true,
        requiresTlaCausativeSource: true
      })]),
      "55.2-intransitive-tla": Object.freeze([Object.freeze({
        id: "intransitive-tla",
        role: "intransitive-become",
        classicalSuffixSequence: "tla",
        targetValency: "intransitive",
        limitedUse: true,
        veryLimitedUse: true,
        requiresIntransitiveTlaLexicalSource: true
      })]),
      "55.2-intransitive-tla-ti-a-causative": Object.freeze([Object.freeze({
        id: "intransitive-tla-ti-a",
        role: "causative-from-intransitive-tla",
        classicalSuffixSequence: "ti-a",
        targetValency: "transitive",
        segmentedPrefix: "ti",
        segmentedSuffix: "a",
        sourceTlaReplacedByTiBeforeA: true,
        requiresTlaIntransitiveSource: true
      })]),
      "55.2-intransitive-tla-ti-lia-applicative": Object.freeze([Object.freeze({
        id: "intransitive-tla-ti-lia",
        role: "applicative-from-intransitive-tla",
        classicalSuffixSequence: "ti-lia",
        targetValency: "applicative",
        segmentedPrefix: "ti",
        segmentedSuffix: "lia",
        sourceTlaReplacedByTiBeforeLia: true,
        requiresTlaIntransitiveSource: true
      })]),
      "55.3-intransitive-o-a-applicative-huia": Object.freeze([Object.freeze({
        id: "o-a",
        role: "intransitive",
        classicalSuffixSequence: "o-a",
        targetValency: "intransitive",
        targetStemClass: "C"
      }), Object.freeze({
        id: "huia",
        role: "applicative-counterpart",
        classicalSuffixSequence: "huia",
        targetValency: "applicative",
        targetStemClass: "C"
      })]),
      "55.3-o-a-il-huia-al-huia-applicative-note": Object.freeze([Object.freeze({
        id: "o-a-i-l-huia",
        role: "single-object-applicative-via-hypothetical-i-hui",
        classicalSuffixSequence: "i-l-huia",
        targetValency: "applicative",
        requiresIntransitiveOaSource: true,
        hypotheticalIHuiAHuiSource: true,
        sourceOaBypassesTransitiveOaStep: true
      }), Object.freeze({
        id: "o-a-a-l-huia",
        role: "single-object-applicative-via-hypothetical-a-hui",
        classicalSuffixSequence: "a-l-huia",
        targetValency: "applicative",
        requiresIntransitiveOaSource: true,
        hypotheticalIHuiAHuiSource: true,
        sourceOaBypassesTransitiveOaStep: true
      })]),
      "55.4-adverbial-huia": Object.freeze([Object.freeze({
        id: "adverbial-huia",
        role: "adverbial-applicative",
        classicalSuffixSequence: "huia",
        targetValency: "applicative",
        requiresAdverbialSource: true
      })]),
      "55.5-relational-compound-o-a-huia": Object.freeze([Object.freeze({
        id: "relational-o-a",
        role: "relational-o-a",
        classicalSuffixSequence: "o-a",
        targetValency: "usually-transitive",
        requiresRelationalCompoundSource: true
      }), Object.freeze({
        id: "relational-huia",
        role: "relational-applicative",
        classicalSuffixSequence: "huia",
        targetValency: "applicative",
        requiresRelationalCompoundSource: true
      })]),
      "55.6-i-hui-a-hui-to-o-a": Object.freeze([Object.freeze({
        id: "i-hui",
        role: "source-intransitive",
        classicalSuffixSequence: "i-hui",
        targetValency: "intransitive",
        targetStemClass: "B"
      }), Object.freeze({
        id: "a-hui",
        role: "source-intransitive",
        classicalSuffixSequence: "a-hui",
        targetValency: "intransitive",
        targetStemClass: "B"
      }), Object.freeze({
        id: "o-a",
        role: "target-causative",
        classicalSuffixSequence: "o-a",
        targetValency: "transitive",
        targetStemClass: "C",
        requiresIHuiOrAHuiSource: true
      })]),
      "55.7-transitive-i-a": Object.freeze([Object.freeze({
        id: "i-a",
        role: "transitive-denominal",
        classicalSuffixSequence: "i-a",
        targetValency: "transitive",
        noIntransitiveCounterpart: true,
        majoritySourceFinalLetters: Object.freeze(["k", "l"]),
        attestedSourceFinalLetters: Object.freeze(["k", "l", "n"]),
        attestedMinoritySourceFinalLetters: Object.freeze(["n"]),
        classicalSourceFinalPattern: Object.freeze({
          majority: Object.freeze(["[c]", "/l/"]),
          attestedMinority: Object.freeze(["/k/", "/n/"]),
          nawatOrthographyBoundary: "Classical [c] and /k/ both realize as Nawat k here."
        }),
        wFinalSourceMayBeHuia: true,
        sourceIFormMayBelongToNounstem: true,
        sourceIHuiCausativePathPossible: true
      })])
    });
    function normalizeNawatDenominalContractSourceStem(value = "") {
      return unwrapNawatRouteInputValue(value).replace(/\s+/g, "").replace(/^-+/, "").trim();
    }
    function buildNawatDenominalAndrewsRouteTemplateSuffix(template = null) {
      const classicalSuffixSequence = String(template?.classicalSuffixSequence || "").trim();
      const orthographyConversion = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(classicalSuffixSequence, {
        source: "Andrews denominal route-generation contract"
      }) : null;
      const nawatRuleSuffix = orthographyConversion?.output || classicalSuffixSequence;
      const nawatSurfaceSuffix = String(nawatRuleSuffix || "").replace(/-/g, "");
      return {
        classicalSuffixSequence,
        nawatRuleSuffix,
        nawatSurfaceSuffix,
        orthographyConversion
      };
    }
    function isNawatDenominalAndrewsContractRouteObjectSlotExpected(route = null) {
      const targetValency = String(route?.targetValency || "").trim();
      return Boolean(targetValency && targetValency !== "intransitive");
    }
    function getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem = "") {
      const normalizedSourceStem = normalizeNawatDenominalContractSourceStem(sourceStem);
      if (!normalizedSourceStem) {
        return "";
      }
      const letters = typeof targetObject.splitVerbLetters === "function" ? targetObject.splitVerbLetters(normalizedSourceStem) : [];
      if (Array.isArray(letters) && letters.length) {
        return String(letters[letters.length - 1] || "").trim();
      }
      return normalizedSourceStem.slice(-1);
    }
    function getNawatDenominalAndrewsRouteSourceFinalType(sourceStemFinalLetter = "") {
      const finalLetter = String(sourceStemFinalLetter || "").trim().toLowerCase();
      if (!finalLetter) {
        return "";
      }
      return ["a", "e", "i", "o", "u"].includes(finalLetter) ? "vowel" : "consonant";
    }
    function resolveNawatDenominalAndrewsRouteTargetStemClass(template = null, sourceStemFinalLetter = "") {
      const sourceStemFinalType = getNawatDenominalAndrewsRouteSourceFinalType(sourceStemFinalLetter);
      const targetStemClassBySourceFinalType = template?.targetStemClassBySourceFinalType && typeof template.targetStemClassBySourceFinalType === "object" ? template.targetStemClassBySourceFinalType : null;
      const targetStemClassRule = String(template?.targetStemClassRule || "").trim();
      const finalTypeClass = sourceStemFinalType && targetStemClassBySourceFinalType ? String(targetStemClassBySourceFinalType[sourceStemFinalType] || "").trim() : "";
      const targetStemClass = finalTypeClass || String(template?.targetStemClass || "").trim();
      return {
        targetStemClass,
        targetStemClassRule,
        sourceStemFinalType,
        targetStemClassSource: finalTypeClass ? "source-final-type" : targetStemClass ? "template" : "",
        targetStemClassBySourceFinalType: targetStemClassBySourceFinalType ? {
          ...targetStemClassBySourceFinalType
        } : null,
        boundaries: {
          sourceFinalDeterminesTargetStemClass: Boolean(finalTypeClass),
          targetStemClassSourceFinalRule: Boolean(targetStemClassBySourceFinalType),
          noFixtureEvidence: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function normalizeNawatDenominalAndrewsRuleSourceState(value = "") {
      const state = String(value || "").trim().toLowerCase();
      if (!state) {
        return "";
      }
      if (state === "absolutivo" || state === "absolute") {
        return "absolutive";
      }
      if (state === "posesivo") {
        return "possessive";
      }
      return state;
    }
    function resolveNawatDenominalAndrewsRuleSourceState(ctx = {}) {
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceCategory = String(ctx?.sourceCategory || sourceEvidence.sourceCategory || "").trim();
      if (sourceEvidence.possessiveState === true || sourceCategory.includes("possessive-state")) {
        return "possessive";
      }
      return normalizeNawatDenominalAndrewsRuleSourceState(ctx?.sourceState || ctx?.state || sourceEvidence.sourceState || "");
    }
    function resolveNawatDenominalAndrewsRuleSourceStem(ctx = {}) {
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      return normalizeNawatDenominalContractSourceStem(ctx?.sourceStem || ctx?.sourceInput || ctx?.sourceSurface || sourceEvidence.sourceBaseStem || sourceEvidence.sourcePredicateStem || sourceEvidence.sourceStem || "");
    }
    function resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx = {}) {
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      return normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || sourceEvidence.sourceInput || sourceEvidence.sourceSurface || ctx?.sourceInput || ctx?.sourceSurface || "");
    }
    function resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx = {}, sourceSuffix = "") {
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitBaseStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceBaseStem || sourceEvidence.sourceBaseStem || sourceEvidence.sourceNounStem || "");
      if (explicitBaseStem) {
        return explicitBaseStem;
      }
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || sourceStem;
      const suffix = String(sourceSuffix || "").trim();
      if (suffix && sourceVerbStem.endsWith(suffix)) {
        return sourceVerbStem.slice(0, -suffix.length);
      }
      return sourceStem;
    }
    function resolveNawatDenominalAndrewsRuleSourceCategory(ctx = {}) {
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      return String(ctx?.sourceCategory || sourceEvidence.sourceCategory || "").trim();
    }
    function buildNawatDenominalAndrewsRuleDiagnostic({
      id = "",
      message = "",
      failedLayer = "route",
      contractLayer = "routeContract",
      sourceStem = "",
      sourceState = ""
    } = {}) {
      const diagnosticId = String(id || "andrews-denominal-rule-blocked").trim();
      return {
        id: diagnosticId,
        code: diagnosticId.toUpperCase().replace(/[^A-Z0-9]+/g, "_"),
        severity: "error",
        message: String(message || "Andrews denominal rule cannot generate for this input.").trim(),
        failedLayer: String(failedLayer || "route").trim(),
        contractLayer: String(contractLayer || "routeContract").trim(),
        routeFamily: "denominal-andrews-contract",
        routeStage: "execute-rule-contract",
        sourceStem: String(sourceStem || "").trim(),
        sourceState: String(sourceState || "").trim()
      };
    }
    function diagnoseNawatDenominalAndrews5421TiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const diagnostics = [];
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.1-ti-source-stem-required",
          message: "Andrews 54.2.1 requires an NNC absolutive-state predicate stem before ti can form an intransitive VNC stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState && sourceState !== "absolutive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.1-ti-absolutive-state-required",
          message: "Andrews 54.2.1 attaches ti to an absolutive-state NNC predicate; non-absolutive sources must use a more specific denominal route.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5422HuiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const diagnostics = [];
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.2-hui-source-stem-required",
          message: "Andrews 54.2.2 requires an NNC absolutive-state predicate stem before hui can form an intransitive VNC stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState && sourceState !== "absolutive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.2-hui-absolutive-state-required",
          message: "Andrews 54.2.2 attaches hui directly to an absolutive-state NNC predicate; non-absolutive sources must use a more specific denominal route.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5422HuiLiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const hasHuiSourceEvidence = sourceEvidence.huiSource === true || ctx?.huiSource === true;
      const sourceVerbStem = explicitSourceVerbStem || (hasHuiSourceEvidence ? sourceStem : "");
      const diagnostics = [];
      if (!hasHuiSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.2-hui-lia-hui-source-evidence-required",
          message: "Andrews 54.2.2 hui-lia requires generated hui/wi verbstem source evidence before lia can form the causative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.2-hui-lia-derived-hui-source-required",
          message: "Andrews 54.2.2 hui-lia uses a generated hui/wi verbstem as source, not a possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasHuiSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.2-hui-lia-source-verbstem-required",
          message: "Andrews 54.2.2 hui-lia requires the generated hui/wi verbstem surface before adding lia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceVerbStem && !sourceVerbStem.endsWith("wi")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.2-hui-lia-source-final-wi-required",
          message: "Andrews 54.2.2 hui-lia requires a Nawat wi-final generated source verbstem before the lia suffix can attach.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5423YaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const diagnostics = [];
      const compatibleSourceCategories = new Set(["", "nounroot", "nounstem-as-root", "nounroot-or-nounstem-as-root", "absolutive-state-nnc-predicate", "ordinary-nnc-predicate-nounstem", "absolutive-nounstem"]);
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-source-root-required",
          message: "Andrews 54.2.3 requires a Nawat nounroot or nounstem downgraded to root rank before ya can form an intransitive VNC stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-absolutive-root-state-required",
          message: "Andrews 54.2.3 root-plus-ya is not a possessive-state route; possessive sources must use a more specific denominal contract.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-root-source-required",
          message: "Andrews 54.2.3 attaches ya to a nounroot or nounstem downgraded to root rank; generated ti/hui verbstem sources must use the ti-ya or hui-ya contracts.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-absolutive-root-state-required",
          message: "Andrews 54.2.3 root-plus-ya requires an absolutive/root-rank noun source before it can form an intransitive VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5423TiYaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const hasTiSourceEvidence = sourceEvidence.tiSource === true || ctx?.tiSource === true;
      const sourceVerbStem = explicitSourceVerbStem || (hasTiSourceEvidence ? sourceStem : "");
      const diagnostics = [];
      if (!hasTiSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ti-ya-ti-source-evidence-required",
          message: "Andrews 54.2.3 ti-ya requires generated ti verbstem source evidence before ya can form the deverbal inceptive/stative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ti-ya-derived-ti-source-required",
          message: "Andrews 54.2.3 ti-ya uses a generated ti verbstem as source, not a possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasTiSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ti-ya-source-verbstem-required",
          message: "Andrews 54.2.3 ti-ya requires the generated ti verbstem surface before adding ya.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceVerbStem && !sourceVerbStem.endsWith("ti")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ti-ya-source-final-ti-required",
          message: "Andrews 54.2.3 ti-ya requires a ti-final generated source verbstem before the ya suffix can attach.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5423HuiYaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const hasHuiSourceEvidence = sourceEvidence.huiSource === true || ctx?.huiSource === true;
      const sourceVerbStem = explicitSourceVerbStem || (hasHuiSourceEvidence ? sourceStem : "");
      const diagnostics = [];
      if (!hasHuiSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-hui-ya-hui-source-evidence-required",
          message: "Andrews 54.2.3 hui-ya requires generated hui/wi verbstem source evidence before ya can form the deverbal inceptive/stative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-hui-ya-derived-hui-source-required",
          message: "Andrews 54.2.3 hui-ya uses a generated hui/wi verbstem as source, not a possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasHuiSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-hui-ya-source-verbstem-required",
          message: "Andrews 54.2.3 hui-ya requires the generated hui/wi verbstem surface before adding ya.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceVerbStem && !sourceVerbStem.endsWith("wi")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-hui-ya-source-final-wi-required",
          message: "Andrews 54.2.3 hui-ya requires a Nawat wi-final generated source verbstem before the ya suffix can attach.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5423YaLiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const hasYaSourceEvidence = sourceEvidence.yaSource === true || ctx?.yaSource === true;
      const sourceVerbStem = explicitSourceVerbStem || (hasYaSourceEvidence ? sourceStem : "");
      const diagnostics = [];
      if (!hasYaSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-lia-ya-source-evidence-required",
          message: "Andrews 54.2.3 ya-lia requires generated ya verbstem source evidence before deleting ya and adding lia.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-lia-derived-ya-source-required",
          message: "Andrews 54.2.3 ya-lia uses a generated ya verbstem as source, not a possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasYaSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-lia-source-verbstem-required",
          message: "Andrews 54.2.3 ya-lia requires the generated ya verbstem surface before replacing ya with lia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceVerbStem && !sourceVerbStem.endsWith("ya")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.3-ya-lia-source-final-ya-required",
          message: "Andrews 54.2.3 ya-lia requires a ya-final generated source verbstem before deleting ya and adding lia.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5424ARule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const diagnostics = [];
      const compatibleSourceCategories = new Set(["", "nounstem", "absolutive-nounstem", "absolutive-state-nnc-predicate", "ordinary-nnc-predicate-nounstem"]);
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.4-a-source-nounstem-required",
          message: "Andrews 54.2.4 requires a Nawat nounstem source before limited inceptive/stative a can form a Class C intransitive VNC stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.4-a-absolutive-nounstem-required",
          message: "Andrews 54.2.4 limited inceptive/stative a uses an absolutive nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.4-a-nounstem-source-required",
          message: "Andrews 54.2.4 limited inceptive/stative a requires a nounstem source; generated VNC sources must use their own continuation contracts.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.4-a-absolutive-nounstem-required",
          message: "Andrews 54.2.4 limited inceptive/stative a requires an absolutive nounstem source before it can form an intransitive Class C VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews5425HuaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasDeverbalYoSourceEvidence = sourceEvidence.deverbalYoSource === true || sourceEvidence.deverbalYuSource === true || ctx?.deverbalYoSource === true || ctx?.deverbalYuSource === true || evidenceCategory === "deverbal-yo-nounstem" || evidenceCategory === "deverbal-yu-nounstem" || evidenceCategory === "deverbal-yu-nounstem-source";
      const diagnostics = [];
      if (!hasDeverbalYoSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.5-hua-deverbal-yo-source-evidence-required",
          message: "Andrews 54.2.5 hua requires confirmed deverbal (-yo)-tl nounstem source evidence, realized as a Nawat/Pipil yu-matrix source, before hua can form the intransitive VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.5-hua-absolutive-yu-source-required",
          message: "Andrews 54.2.5 hua uses an absolutive deverbal (-yo)-tl nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasDeverbalYoSourceEvidence && !sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.5-hua-source-nounstem-required",
          message: "Andrews 54.2.5 hua requires the Nawat/Pipil deverbal yu-matrix nounstem before adding wa.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasDeverbalYoSourceEvidence && sourceStem && !sourceStem.endsWith("yu")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.5-hua-source-final-yu-required",
          message: "Andrews 54.2.5 hua requires a Nawat/Pipil yu-final source corresponding to Classical (-yo)-tl before the wa suffix can attach.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2.5-hua-absolutive-yu-source-required",
          message: "Andrews 54.2.5 hua requires an absolutive deverbal (-yo)-tl nounstem source before it can form an intransitive Class A VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews543IncludedPossessorTiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceState = normalizeNawatDenominalAndrewsRuleSourceState(sourceEvidence.sourceState || "");
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasPossessiveSourceEvidence = sourceEvidence.possessiveState === true || ctx?.possessiveState === true || evidenceState === "possessive" || evidenceState === "posesivo" || evidenceCategory.includes("possessive-state");
      const diagnostics = [];
      if (!hasPossessiveSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.3-included-possessor-ti-possessive-source-evidence-required",
          message: "Andrews 54.3 included-possessor ti requires confirmed possessive-state NNC predicate evidence before ti can form the intransitive VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState && sourceState !== "possessive" && !sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.3-included-possessor-ti-possessive-state-required",
          message: "Andrews 54.3 attaches ti to the predicate of a possessive-state NNC; absolutive sources must use the ordinary ti or possession-ti contracts.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasPossessiveSourceEvidence && !sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.3-included-possessor-ti-source-predicate-required",
          message: "Andrews 54.3 requires the Nawat/Pipil possessive-state predicate surface, with the possessor retained inside the stem, before adding ti.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews542544TiLiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasTiSourceEvidence = sourceEvidence.tiSource === true || ctx?.tiSource === true || evidenceCategory === "inceptive-stative-ti-source" || evidenceCategory === "possession-ti-verbstem-source" || evidenceCategory === "intransitive-ti-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasTiSourceEvidence ? sourceStem : "");
      const diagnostics = [];
      if (!hasTiSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2-54.4-ti-lia-ti-source-evidence-required",
          message: "Andrews 54.2.1/54.4 ti-lia requires generated intransitive ti verbstem source evidence before lia can form the single-object causative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2-54.4-ti-lia-derived-ti-source-required",
          message: "Andrews 54.2.1/54.4 ti-lia uses a generated ti verbstem as source, not the original possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasTiSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2-54.4-ti-lia-source-verbstem-required",
          message: "Andrews 54.2.1/54.4 ti-lia requires the generated ti verbstem surface before adding lia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceVerbStem && !sourceVerbStem.endsWith("ti")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.2-54.4-ti-lia-source-final-ti-required",
          message: "Andrews 54.2.1/54.4 ti-lia requires a ti-final generated source verbstem before the lia suffix can attach.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews545TiARule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasTiSourceEvidence = sourceEvidence.tiSource === true || ctx?.tiSource === true || evidenceCategory === "inceptive-stative-ti-source" || evidenceCategory === "possession-ti-verbstem-source" || evidenceCategory === "intransitive-ti-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasTiSourceEvidence ? sourceStem : "");
      const diagnostics = [];
      if (!hasTiSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.5-ti-a-ti-source-evidence-required",
          message: "Andrews 54.5 ti-a requires generated intransitive ti verbstem source evidence before a can form the first-type causative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.5-ti-a-possessive-double-object-source-unmodeled",
          message: "Andrews 54.5 possessive-state sources form double-object ti-a stems; this executable contract only routes the single-object generated-ti source path.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasTiSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.5-ti-a-source-verbstem-required",
          message: "Andrews 54.5 ti-a requires the generated ti verbstem surface before adding the causative a suffix.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasTiSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("ti")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.5-ti-a-source-final-ti-required",
          message: "Andrews 54.5 ti-a requires a ti-final generated source verbstem before the causative a suffix can attach.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews546TIaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasTiSourceEvidence = sourceEvidence.tiSource === true || ctx?.tiSource === true || evidenceCategory === "inceptive-stative-ti-source" || evidenceCategory === "possession-ti-verbstem-source" || evidenceCategory === "intransitive-ti-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasTiSourceEvidence ? sourceStem : "");
      const diagnostics = [];
      if (!hasTiSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.6-t-ia-ti-source-evidence-required",
          message: "Andrews 54.6 t-ia requires generated intransitive ti verbstem source evidence before ia can form the first-type applicative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.6-t-ia-generated-ti-source-required",
          message: "Andrews 54.6 t-ia uses a generated ti verbstem as source, not the original possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasTiSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.6-t-ia-source-verbstem-required",
          message: "Andrews 54.6 t-ia requires the generated ti verbstem surface before deleting final i and adding ia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasTiSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("ti")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-54.6-t-ia-source-final-ti-required",
          message: "Andrews 54.6 t-ia requires a ti-final generated source verbstem because ia attaches to a replacive stem lacking final i.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews551TemporalTiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const evidence = normalizeNawatDenominalAndrewsRouteSourceEvidence(sourceEvidence);
      const normalizedSourceState = normalizeNawatDenominalAndrewsRuleSourceState(sourceEvidence.sourceState || sourceState);
      const diagnostics = [];
      if (!evidence.temporalCompoundSource) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.1-temporal-tia-source-evidence-required",
          message: "Andrews 55.1 temporal tia requires confirmed compound-temporal nounstem evidence with a time-segment matrix and numeral embed.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (evidence.temporalCompoundSource && normalizedSourceState && normalizedSourceState !== "absolutive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.1-temporal-tia-absolutive-source-required",
          message: "Andrews 55.1 temporal tia routes from a compound temporal nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState: normalizedSourceState
        }));
      }
      if (evidence.temporalCompoundSource && !sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.1-temporal-tia-source-stem-required",
          message: "Andrews 55.1 temporal tia requires the confirmed compound temporal source stem before adding tia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews552CausativeTlaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const diagnostics = [];
      const compatibleSourceCategories = new Set(["", "nounstem", "absolutive-nounstem", "absolutive-state-nnc-predicate", "ordinary-nnc-predicate-nounstem"]);
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-causative-tla-source-stem-required",
          message: "Andrews 55.2 causative tla requires a Nawat/Pipil nounstem source before it can form a causative Class A VNC stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-causative-tla-absolutive-nounstem-required",
          message: "Andrews 55.2 causative tla attaches to a nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-causative-tla-nounstem-source-required",
          message: "Andrews 55.2 causative tla requires a nounstem source; generated VNC sources must use their own continuation contracts.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-causative-tla-absolutive-nounstem-required",
          message: "Andrews 55.2 causative tla requires an absolutive nounstem source before it can form a causative Class A VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews552TlaTiLiaApplicativeRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ta");
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasTlaCausativeSourceEvidence = sourceEvidence.tlaCausativeSource === true || ctx?.tlaCausativeSource === true || evidenceCategory === "causative-tla" || evidenceCategory === "causative-tla-verbstem-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasTlaCausativeSourceEvidence ? resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || sourceStem : "");
      const diagnostics = [];
      if (!hasTlaCausativeSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-tla-ti-lia-causative-tla-source-evidence-required",
          message: "Andrews 55.2 tla-ti-lia requires generated causative tla verbstem source evidence before tla can change to ti and add lia.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-tla-ti-lia-generated-tla-source-required",
          message: "Andrews 55.2 tla-ti-lia uses a generated causative tla verbstem as source, not the original possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaCausativeSourceEvidence && sourceState && sourceState !== "derived") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-tla-ti-lia-generated-tla-source-required",
          message: "Andrews 55.2 tla-ti-lia requires a derived causative tla verbstem source, not the original nounstem source.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (hasTlaCausativeSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-tla-ti-lia-source-verbstem-required",
          message: "Andrews 55.2 tla-ti-lia requires the generated causative tla verbstem surface before replacing tla with ti and adding lia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaCausativeSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("ta")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-tla-ti-lia-source-final-ta-required",
          message: "Andrews 55.2 tla-ti-lia requires a Nawat/Pipil ta-final source corresponding to Classical tla before replacement by ti-lia.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews552IntransitiveTlaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasIntransitiveTlaLexicalSourceEvidence = sourceEvidence.intransitiveTlaLexicalSource === true || sourceEvidence.intransitiveTlaNounstemSource === true || ctx?.intransitiveTlaLexicalSource === true || ctx?.intransitiveTlaNounstemSource === true || evidenceCategory === "intransitive-tla-lexical-source" || evidenceCategory === "intransitive-tla-nounstem-source";
      const compatibleSourceCategories = new Set(["", "nounstem", "absolutive-nounstem", "intransitive-tla-lexical-source", "intransitive-tla-nounstem-source"]);
      const diagnostics = [];
      if (!hasIntransitiveTlaLexicalSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-lexical-source-evidence-required",
          message: "Andrews 55.2 note says the intransitive tla formation is even less productive than causative tla; it requires explicit lexical/source confirmation before generation.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-absolutive-nounstem-required",
          message: "Andrews 55.2 note intransitive tla uses a nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasIntransitiveTlaLexicalSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-nounstem-source-required",
          message: "Andrews 55.2 note intransitive tla requires a confirmed nounstem source; generated VNC sources must use their own continuation contracts.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasIntransitiveTlaLexicalSourceEvidence && sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-absolutive-nounstem-required",
          message: "Andrews 55.2 note intransitive tla requires an absolutive nounstem source before it can form an intransitive VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasIntransitiveTlaLexicalSourceEvidence && !sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-source-stem-required",
          message: "Andrews 55.2 note intransitive tla requires the confirmed nounstem source surface before adding tla.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews552IntransitiveTlaTiARule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ta");
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasTlaIntransitiveSourceEvidence = sourceEvidence.tlaIntransitiveSource === true || ctx?.tlaIntransitiveSource === true || evidenceCategory === "intransitive-tla" || evidenceCategory === "intransitive-tla-verbstem-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasTlaIntransitiveSourceEvidence ? resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || sourceStem : "");
      const compatibleSourceCategories = new Set(["", "intransitive-tla", "intransitive-tla-verbstem-source"]);
      const diagnostics = [];
      if (!hasTlaIntransitiveSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-a-source-evidence-required",
          message: "Andrews 55.2 note ti-a causative requires generated intransitive tla verbstem source evidence before tla can change to ti and add a.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-a-generated-tla-source-required",
          message: "Andrews 55.2 note ti-a causative uses a generated intransitive tla verbstem as source, not the original possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaIntransitiveSourceEvidence && sourceState && sourceState !== "derived") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-a-generated-tla-source-required",
          message: "Andrews 55.2 note ti-a causative requires a derived intransitive tla verbstem source, not the original nounstem source.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaIntransitiveSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-a-intransitive-tla-source-required",
          message: "Andrews 55.2 note ti-a causative requires a generated intransitive tla verbstem source, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (hasTlaIntransitiveSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-a-source-verbstem-required",
          message: "Andrews 55.2 note ti-a causative requires the generated intransitive tla verbstem surface before replacing tla with ti and adding a.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaIntransitiveSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("ta")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-a-source-final-ta-required",
          message: "Andrews 55.2 note ti-a causative requires a Nawat/Pipil ta-final source corresponding to Classical intransitive tla before replacement by ti-a.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews552IntransitiveTlaTiLiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ta");
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasTlaIntransitiveSourceEvidence = sourceEvidence.tlaIntransitiveSource === true || ctx?.tlaIntransitiveSource === true || evidenceCategory === "intransitive-tla" || evidenceCategory === "intransitive-tla-verbstem-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasTlaIntransitiveSourceEvidence ? resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || sourceStem : "");
      const compatibleSourceCategories = new Set(["", "intransitive-tla", "intransitive-tla-verbstem-source"]);
      const diagnostics = [];
      if (!hasTlaIntransitiveSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-lia-source-evidence-required",
          message: "Andrews 55.2 note ti-lia applicative requires generated intransitive tla verbstem source evidence before tla can change to ti and add lia.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-lia-generated-tla-source-required",
          message: "Andrews 55.2 note ti-lia applicative uses a generated intransitive tla verbstem as source, not the original possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaIntransitiveSourceEvidence && sourceState && sourceState !== "derived") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-lia-generated-tla-source-required",
          message: "Andrews 55.2 note ti-lia applicative requires a derived intransitive tla verbstem source, not the original nounstem source.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaIntransitiveSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-lia-intransitive-tla-source-required",
          message: "Andrews 55.2 note ti-lia applicative requires a generated intransitive tla verbstem source, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (hasTlaIntransitiveSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-lia-source-verbstem-required",
          message: "Andrews 55.2 note ti-lia applicative requires the generated intransitive tla verbstem surface before replacing tla with ti and adding lia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasTlaIntransitiveSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("ta")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.2-intransitive-tla-ti-lia-source-final-ta-required",
          message: "Andrews 55.2 note ti-lia applicative requires a Nawat/Pipil ta-final source corresponding to Classical intransitive tla before replacement by ti-lia.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews553OaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const diagnostics = [];
      const compatibleSourceCategories = new Set(["", "nounstem", "absolutive-nounstem", "absolutive-state-nnc-predicate", "ordinary-nnc-predicate-nounstem"]);
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-source-stem-required",
          message: "Andrews 55.3 intransitive o-a requires a Nawat/Pipil nounstem source before it can form a Class C intransitive VNC stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-absolutive-nounstem-required",
          message: "Andrews 55.3 intransitive o-a uses a nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-nounstem-source-required",
          message: "Andrews 55.3 intransitive o-a requires a nounstem source; generated VNC sources must use their own continuation contracts.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-absolutive-nounstem-required",
          message: "Andrews 55.3 intransitive o-a requires an absolutive nounstem source before it can form a Class C intransitive VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews553HuiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const diagnostics = [];
      const compatibleSourceCategories = new Set(["", "nounstem", "absolutive-nounstem", "absolutive-state-nnc-predicate", "ordinary-nnc-predicate-nounstem"]);
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-huia-source-stem-required",
          message: "Andrews 55.3 huia requires a Nawat/Pipil nounstem source before it can form a Class C single-object applicative VNC stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-huia-absolutive-nounstem-required",
          message: "Andrews 55.3 huia uses a nounstem source for the single-object applicative route; possessive-state two-object huia is a separate limited note.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-huia-nounstem-source-required",
          message: "Andrews 55.3 huia requires a nounstem source; generated VNC sources must use their own continuation contracts.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-huia-absolutive-nounstem-required",
          message: "Andrews 55.3 huia requires an absolutive nounstem source before it can form a Class C single-object applicative VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews553OaIlHuiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ua");
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasIntransitiveOaSourceEvidence = sourceEvidence.intransitiveOaSource === true || ctx?.intransitiveOaSource === true || evidenceCategory === "intransitive-o-a" || evidenceCategory === "intransitive-o-a-verbstem-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasIntransitiveOaSourceEvidence ? resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) : "");
      const compatibleSourceCategories = new Set(["", "intransitive-o-a", "intransitive-o-a-verbstem-source"]);
      const diagnostics = [];
      if (!hasIntransitiveOaSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-i-l-huia-source-evidence-required",
          message: "Andrews 55.3 note 2 i-l-huia requires generated intransitive o-a verbstem source evidence before inventing the hypothetical i-hui applicative path.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-i-l-huia-generated-o-a-source-required",
          message: "Andrews 55.3 note 2 i-l-huia uses a generated intransitive o-a verbstem as source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIntransitiveOaSourceEvidence && sourceState && sourceState !== "derived") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-i-l-huia-generated-o-a-source-required",
          message: "Andrews 55.3 note 2 i-l-huia requires a derived intransitive o-a verbstem source, not the original nounstem source.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIntransitiveOaSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-i-l-huia-intransitive-o-a-source-required",
          message: "Andrews 55.3 note 2 i-l-huia requires a generated intransitive o-a verbstem source, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (hasIntransitiveOaSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-i-l-huia-source-verbstem-required",
          message: "Andrews 55.3 note 2 i-l-huia requires the generated intransitive o-a verbstem surface before routing to the hypothetical applicative stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIntransitiveOaSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("ua")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-i-l-huia-source-final-ua-required",
          message: "Andrews 55.3 note 2 i-l-huia requires a Nawat/Pipil ua-final source corresponding to Classical intransitive o-a.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews553OaAlHuiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ua");
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasIntransitiveOaSourceEvidence = sourceEvidence.intransitiveOaSource === true || ctx?.intransitiveOaSource === true || evidenceCategory === "intransitive-o-a" || evidenceCategory === "intransitive-o-a-verbstem-source";
      const sourceVerbStem = explicitSourceVerbStem || (hasIntransitiveOaSourceEvidence ? resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) : "");
      const compatibleSourceCategories = new Set(["", "intransitive-o-a", "intransitive-o-a-verbstem-source"]);
      const diagnostics = [];
      if (!hasIntransitiveOaSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-a-l-huia-source-evidence-required",
          message: "Andrews 55.3 note 2 a-l-huia requires generated intransitive o-a verbstem source evidence before inventing the hypothetical a-hui applicative path.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-a-l-huia-generated-o-a-source-required",
          message: "Andrews 55.3 note 2 a-l-huia uses a generated intransitive o-a verbstem as source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIntransitiveOaSourceEvidence && sourceState && sourceState !== "derived") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-a-l-huia-generated-o-a-source-required",
          message: "Andrews 55.3 note 2 a-l-huia requires a derived intransitive o-a verbstem source, not the original nounstem source.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIntransitiveOaSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-a-l-huia-intransitive-o-a-source-required",
          message: "Andrews 55.3 note 2 a-l-huia requires a generated intransitive o-a verbstem source, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (hasIntransitiveOaSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-a-l-huia-source-verbstem-required",
          message: "Andrews 55.3 note 2 a-l-huia requires the generated intransitive o-a verbstem surface before routing to the hypothetical applicative stem.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIntransitiveOaSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("ua")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.3-o-a-a-l-huia-source-final-ua-required",
          message: "Andrews 55.3 note 2 a-l-huia requires a Nawat/Pipil ua-final source corresponding to Classical intransitive o-a.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews554AdverbialHuiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasAdverbialSourceEvidence = sourceEvidence.adverbialSource === true || ctx?.adverbialSource === true || evidenceCategory === "adverbial-nounstem";
      const compatibleSourceCategories = new Set(["", "adverbial-nounstem"]);
      const diagnostics = [];
      if (!hasAdverbialSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.4-huia-adverbial-source-evidence-required",
          message: "Andrews 55.4 huia requires confirmed adverbial nounstem source evidence before it can form a single-object applicative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.4-huia-adverbial-source-required",
          message: "Andrews 55.4 huia uses an adverbialized nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasAdverbialSourceEvidence && sourceState && sourceState !== "adverbialized") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.4-huia-adverbial-state-required",
          message: "Andrews 55.4 huia requires an adverbialized nounstem source from the Lesson 44 adverbial NNC domain.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasAdverbialSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.4-huia-adverbial-source-required",
          message: "Andrews 55.4 huia requires a confirmed adverbial nounstem source, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasAdverbialSourceEvidence && !sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.4-huia-source-stem-required",
          message: "Andrews 55.4 huia requires the Nawat/Pipil adverbial nounstem surface before adding wia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews555RelationalOaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasRelationalSourceEvidence = sourceEvidence.relationalCompoundSource === true || ctx?.relationalCompoundSource === true || evidenceCategory === "compound-relational-nounstem" || evidenceCategory === "possessive-state-relational-predicate";
      const compatibleSourceCategories = new Set(["", "compound-relational-nounstem", "possessive-state-relational-predicate"]);
      const diagnostics = [];
      if (!hasRelationalSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-o-a-relational-source-evidence-required",
          message: "Andrews 55.5 o-a requires confirmed relational compound nounstem or possessive-state relational predicate source evidence before it can form a VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasRelationalSourceEvidence && sourceState && sourceState !== "relational" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-o-a-relational-state-required",
          message: "Andrews 55.5 o-a requires a relational compound nounstem source or a possessive-state predicate built on a relational stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasRelationalSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-o-a-relational-source-required",
          message: "Andrews 55.5 o-a requires a confirmed relational compound nounstem or possessive-state relational predicate, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasRelationalSourceEvidence && !sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-o-a-source-stem-required",
          message: "Andrews 55.5 o-a requires the Nawat/Pipil relational source surface before adding ua.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews555RelationalHuiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasRelationalSourceEvidence = sourceEvidence.relationalCompoundSource === true || ctx?.relationalCompoundSource === true || evidenceCategory === "compound-relational-nounstem" || evidenceCategory === "possessive-state-relational-predicate";
      const compatibleSourceCategories = new Set(["", "compound-relational-nounstem", "possessive-state-relational-predicate"]);
      const diagnostics = [];
      if (!hasRelationalSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-huia-relational-source-evidence-required",
          message: "Andrews 55.5 huia requires confirmed relational compound nounstem or possessive-state relational predicate source evidence before it can form a single-object applicative VNC stem.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasRelationalSourceEvidence && sourceState && sourceState !== "relational" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-huia-relational-state-required",
          message: "Andrews 55.5 huia requires a relational compound nounstem source or a possessive-state predicate built on a relational stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (hasRelationalSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-huia-relational-source-required",
          message: "Andrews 55.5 huia requires a confirmed relational compound nounstem or possessive-state relational predicate, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (hasRelationalSourceEvidence && !sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.5-huia-source-stem-required",
          message: "Andrews 55.5 huia requires the Nawat/Pipil relational source surface before adding wia.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews556IHuiAHuiSourceRule(ctx = {}, {
      routeTemplateId = "i-hui",
      classicalSuffix = "i-hui"
    } = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const compatibleSourceCategories = new Set(["", "nounstem", "absolutive-nounstem", "absolutive-state-nnc-predicate", "ordinary-nnc-predicate-nounstem"]);
      const diagnostics = [];
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: `andrews-55.6-${routeTemplateId}-source-stem-required`,
          message: `Andrews 55.6 ${classicalSuffix} requires a Nawat/Pipil nounstem source before it can form a Class B intransitive VNC stem.`,
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: `andrews-55.6-${routeTemplateId}-absolutive-nounstem-required`,
          message: `Andrews 55.6 ${classicalSuffix} uses an absolutive nounstem source, not a possessive-state predicate.`,
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: `andrews-55.6-${routeTemplateId}-nounstem-source-required`,
          message: `Andrews 55.6 ${classicalSuffix} attaches to a nounstem base; generated VNC sources must use the o-a counterpart contract.`,
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: `andrews-55.6-${routeTemplateId}-absolutive-nounstem-required`,
          message: `Andrews 55.6 ${classicalSuffix} requires an absolutive nounstem source before it can form a Class B intransitive VNC stem.`,
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews556IHuiRule(ctx = {}) {
      return diagnoseNawatDenominalAndrews556IHuiAHuiSourceRule(ctx, {
        routeTemplateId: "i-hui",
        classicalSuffix: "i-hui"
      });
    }
    function diagnoseNawatDenominalAndrews556AHuiRule(ctx = {}) {
      return diagnoseNawatDenominalAndrews556IHuiAHuiSourceRule(ctx, {
        routeTemplateId: "a-hui",
        classicalSuffix: "a-hui"
      });
    }
    function diagnoseNawatDenominalAndrews556OaRule(ctx = {}) {
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "") || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const evidenceCategory = String(sourceEvidence.sourceCategory || "").trim();
      const hasIHuiOrAHuiSourceEvidence = sourceEvidence.iHuiOrAHuiSource === true || ctx?.iHuiOrAHuiSource === true || evidenceCategory === "i-hui-a-hui-source";
      const explicitSourceVerbStem = normalizeNawatDenominalContractSourceStem(ctx?.sourceVerbStem || sourceEvidence.sourceVerbStem || "");
      const sourceVerbStem = explicitSourceVerbStem || (hasIHuiOrAHuiSourceEvidence ? resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) : "");
      const sourceEvidenceHasState = Object.prototype.hasOwnProperty.call(sourceEvidence, "sourceState");
      const sourceEvidenceKeyCount = Object.keys(sourceEvidence).length;
      const sourceStateForDerivedCheck = normalizeNawatDenominalAndrewsRuleSourceState(sourceEvidenceHasState ? sourceEvidence.sourceState : sourceEvidenceKeyCount ? "" : ctx?.sourceState || ctx?.state || "");
      const compatibleSourceCategories = new Set(["", "i-hui-a-hui-source"]);
      const diagnostics = [];
      if (!hasIHuiOrAHuiSourceEvidence) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.6-o-a-i-hui-a-hui-source-evidence-required",
          message: "Andrews 55.6 causative o-a requires generated i-hui/a-hui intransitive source evidence before it can form the transitive counterpart.",
          failedLayer: "authority",
          contractLayer: "authorityFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (hasIHuiOrAHuiSourceEvidence && (sourceStateForDerivedCheck === "possessive" || sourceCategory.includes("possessive-state"))) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.6-o-a-generated-i-hui-a-hui-source-required",
          message: "Andrews 55.6 causative o-a uses a generated i-hui/a-hui verbstem as source, not a possessive-state NNC predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIHuiOrAHuiSourceEvidence && sourceStateForDerivedCheck && sourceStateForDerivedCheck !== "derived") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.6-o-a-generated-i-hui-a-hui-source-required",
          message: "Andrews 55.6 causative o-a requires a derived i-hui/a-hui intransitive verbstem source, not the original nounstem source.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIHuiOrAHuiSourceEvidence && sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.6-o-a-i-hui-a-hui-source-required",
          message: "Andrews 55.6 causative o-a requires a generated i-hui/a-hui source, not another denominal route source.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      }
      if (hasIHuiOrAHuiSourceEvidence && !sourceVerbStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.6-o-a-source-verbstem-required",
          message: "Andrews 55.6 causative o-a requires the generated i-hui/a-hui source verbstem surface before adding ua.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem: sourceBaseStem,
          sourceState
        }));
      } else if (hasIHuiOrAHuiSourceEvidence && sourceVerbStem && !sourceVerbStem.endsWith("iwi") && !sourceVerbStem.endsWith("awi")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.6-o-a-source-final-iwi-awi-required",
          message: "Andrews 55.6 causative o-a requires a Nawat/Pipil iwi- or awi-final source corresponding to Classical i-hui/a-hui.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem: sourceVerbStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function diagnoseNawatDenominalAndrews557IARule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory(ctx);
      const sourceEvidence = ctx?.sourceEvidence && typeof ctx.sourceEvidence === "object" ? ctx.sourceEvidence : {};
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.7-transitive-i-a"]?.find(entry => entry.id === "i-a") || null;
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const sourceFinalPattern = classifyNawatDenominalIAStemSourceFinal(template, sourceStemFinalLetter);
      const hasExplicitSourceFinalEvidence = sourceEvidence.transitiveIASourceConfirmed === true || ctx?.transitiveIASourceConfirmed === true;
      const compatibleSourceCategories = new Set(["", "nounstem", "nounstem-plus-i", "absolutive-nounstem", "absolutive-state-nnc-predicate", "ordinary-nnc-predicate-nounstem"]);
      const diagnostics = [];
      if (!sourceStem) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.7-i-a-source-stem-required",
          message: "Andrews 55.7 transitive i-a requires a Nawat/Pipil nounstem source before adding the nounstem-plus-i and causative-a sequence.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceState === "possessive" || sourceCategory.includes("possessive-state")) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.7-i-a-absolutive-nounstem-required",
          message: "Andrews 55.7 transitive i-a uses an absolutive nounstem source, not a possessive-state predicate.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceCategory && !compatibleSourceCategories.has(sourceCategory)) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.7-i-a-nounstem-source-required",
          message: "Andrews 55.7 transitive i-a adds to a nounstem-plus-i base; generated VNC sources must use their own continuation contracts.",
          failedLayer: "stem",
          contractLayer: "stemFrame",
          sourceStem,
          sourceState
        }));
      } else if (sourceState && sourceState !== "absolutive" && sourceState !== "possessive") {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.7-i-a-absolutive-nounstem-required",
          message: "Andrews 55.7 transitive i-a requires an absolutive nounstem source before forming the transitive VNC stem.",
          failedLayer: "agreement",
          contractLayer: "participantFrame",
          sourceStem,
          sourceState
        }));
      }
      if (sourceStem && sourceFinalPattern?.status === "unlisted" && hasExplicitSourceFinalEvidence !== true) {
        diagnostics.push(buildNawatDenominalAndrewsRuleDiagnostic({
          id: "andrews-55.7-i-a-source-final-confirmation-required",
          message: "Andrews 55.7 gives majority nounstem finals [c]/l plus k/n examples; this source final needs explicit source evidence before transitive i-a can generate.",
          failedLayer: "morph-boundary",
          contractLayer: "morphBoundaryFrame",
          sourceStem,
          sourceState
        }));
      }
      return diagnostics;
    }
    function buildNawatDenominalAndrewsExecutableRuleResult({
      rule = null,
      sourceStem = "",
      sourceVerbStem = "",
      sourceState = "",
      sourceStemFinalLetter = "",
      targetVerbStem = "",
      targetInput = "",
      targetStemClass = "",
      targetStemClassRule = "",
      targetStemClassSource = "",
      sourceStemFinalType = "",
      suffix = null,
      diagnostics = []
    } = {}) {
      const blocked = (Array.isArray(diagnostics) ? diagnostics : []).some(diagnostic => diagnostic?.severity === "error");
      const ok = !blocked && Boolean(targetVerbStem);
      const record = {
        version: 1,
        outputKind: "denominal-andrews-executable-rule-result",
        executableRuleId: rule?.id || "",
        contractId: rule?.contractId || "",
        routeTemplateId: rule?.routeTemplateId || "",
        range: rule?.range || "",
        authority: Array.isArray(rule?.authority) ? Array.from(rule.authority) : [],
        sourceStem,
        sourceVerbStem,
        sourceState,
        sourceCategory: rule?.input?.sourceCategory || "",
        targetCategory: rule?.output?.unit || "vnc",
        targetValency: rule?.output?.valency || "intransitive",
        sourceStemFinalLetter,
        sourceStemFinalType,
        targetStemClass,
        targetStemClassRule,
        targetStemClassSource,
        classicalSuffixSequence: suffix?.classicalSuffixSequence || rule?.operation?.classicalSuffix || "",
        nawatRuleSuffix: suffix?.nawatRuleSuffix || rule?.operation?.suffix || "",
        nawatSurfaceSuffix: suffix?.nawatSurfaceSuffix || "",
        targetVerbStem: ok ? targetVerbStem : "",
        targetInput: ok ? targetInput : "",
        surface: ok ? targetVerbStem : "",
        status: ok ? "generated" : "blocked",
        supported: ok,
        generationAllowed: ok,
        diagnostics: Array.isArray(diagnostics) ? diagnostics : [],
        ruleContract: rule ? summarizeNawatDenominalAndrewsExecutableRuleContract(rule) : null,
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          usesExecutableAndrewsRuleContract: true,
          generatesVncStemOnly: true,
          finiteGenerationRequiresExplicitRequest: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
      return attachNawatDenominalAndrewsContractGrammarFrame(record, {
        routeStage: ok ? "execute-rule-contract" : "blocked-rule-contract",
        generationAllowed: ok,
        supported: ok,
        diagnostics: record.diagnostics,
        sourceStem,
        targetStem: record.targetVerbStem,
        targetInput: record.targetInput
      });
    }
    function generateNawatDenominalAndrews5421TiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.1-inceptive-stative-ti"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5421TiRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-1-ti");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5422HuiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.2-inceptive-stative-hui"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5422HuiRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5422HuiLiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "wi");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.2-hui-lia-causative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5422HuiLiaRule(ctx);
      const targetVerbStem = sourceVerbStem && !diagnostics.length ? `${sourceVerbStem}${String(suffix.nawatSurfaceSuffix || "").replace(/^wi/, "")}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui-lia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5423YaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.3-inceptive-stative-ya"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5423YaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5423TiYaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ti");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.3-ti-ya-deverbal"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5423TiYaRule(ctx);
      const targetVerbStem = sourceVerbStem && !diagnostics.length ? `${sourceVerbStem}${String(suffix.nawatSurfaceSuffix || "").replace(/^ti/, "")}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ti-ya");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5423HuiYaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "wi");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.3-hui-ya-deverbal"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5423HuiYaRule(ctx);
      const targetVerbStem = sourceVerbStem && !diagnostics.length ? `${sourceVerbStem}${String(suffix.nawatSurfaceSuffix || "").replace(/^wi/, "")}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-hui-ya");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5423YaLiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ya");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.3-ya-lia-causative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5423YaLiaRule(ctx);
      const targetVerbStem = sourceBaseStem && !diagnostics.length ? `${sourceBaseStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya-lia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5424ARule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.4-inceptive-stative-a"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5424ARule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-4-a");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews5425HuaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2.5-inceptive-stative-hua"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews5425HuaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-5-hua");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews543IncludedPossessorTiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.3-included-possessor-ti"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews543IncludedPossessorTiRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-3-included-possessor-ti");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews542544TiLiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ti");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.2-54.4-ti-lia-causative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews542544TiLiaRule(ctx);
      const targetVerbStem = sourceVerbStem && !diagnostics.length ? `${sourceVerbStem}${String(suffix.nawatSurfaceSuffix || "").replace(/^ti/, "")}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-54-4-ti-lia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews545TiARule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ti");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.5-ti-a-causative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews545TiARule(ctx);
      const targetVerbStem = sourceVerbStem && !diagnostics.length ? `${sourceVerbStem}${String(suffix.nawatSurfaceSuffix || "").replace(/^ti/, "")}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-5-ti-a");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews546TIaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ti");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["54.6-t-ia-applicative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews546TIaRule(ctx);
      const replaciveStem = sourceVerbStem && !diagnostics.length ? sourceVerbStem.replace(/i$/, "") : "";
      const targetVerbStem = replaciveStem ? `${replaciveStem}${String(suffix.nawatSurfaceSuffix || "").replace(/^t/, "")}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-54-6-t-ia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews551TemporalTiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.1-temporal-tia"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews551TemporalTiaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews552CausativeTlaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.2-causative-tla"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews552CausativeTlaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-causative-tla");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews552TlaTiLiaApplicativeRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ta");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.2-tla-ti-lia-applicative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews552TlaTiLiaApplicativeRule(ctx);
      const targetVerbStem = sourceBaseStem && sourceVerbStem && !diagnostics.length ? `${sourceBaseStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-tla-ti-lia-applicative");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews552IntransitiveTlaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.2-intransitive-tla"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews552IntransitiveTlaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews552IntransitiveTlaTiARule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ta");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.2-intransitive-tla-ti-a-causative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews552IntransitiveTlaTiARule(ctx);
      const targetVerbStem = sourceBaseStem && sourceVerbStem && !diagnostics.length ? `${sourceBaseStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews552IntransitiveTlaTiLiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ta");
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx) || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.2-intransitive-tla-ti-lia-applicative"]?.[0] || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews552IntransitiveTlaTiLiaRule(ctx);
      const targetVerbStem = sourceBaseStem && sourceVerbStem && !diagnostics.length ? `${sourceBaseStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-lia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews553OaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.3-intransitive-o-a-applicative-huia"]?.find(entry => entry.id === "o-a") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews553OaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews553HuiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.3-intransitive-o-a-applicative-huia"]?.find(entry => entry.id === "huia") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews553HuiaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-huia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews553OaIlHuiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ua") || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.3-o-a-il-huia-al-huia-applicative-note"]?.find(entry => entry.id === "o-a-i-l-huia") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews553OaIlHuiaRule(ctx);
      const targetVerbStem = sourceBaseStem && sourceVerbStem && !diagnostics.length ? `${sourceBaseStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-i-l-huia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews553OaAlHuiaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "ua") || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.3-o-a-il-huia-al-huia-applicative-note"]?.find(entry => entry.id === "o-a-a-l-huia") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews553OaAlHuiaRule(ctx);
      const targetVerbStem = sourceBaseStem && sourceVerbStem && !diagnostics.length ? `${sourceBaseStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-a-l-huia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews554AdverbialHuiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.4-adverbial-huia"]?.find(entry => entry.id === "adverbial-huia") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews554AdverbialHuiaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews555RelationalOaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.5-relational-compound-o-a-huia"]?.find(entry => entry.id === "relational-o-a") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews555RelationalOaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-o-a");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews555RelationalHuiaRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.5-relational-compound-o-a-huia"]?.find(entry => entry.id === "relational-huia") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews555RelationalHuiaRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-huia");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews556IHuiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.6-i-hui-a-hui-to-o-a"]?.find(entry => entry.id === "i-hui") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews556IHuiRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-i-hui");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews556AHuiRule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.6-i-hui-a-hui-to-o-a"]?.find(entry => entry.id === "a-hui") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews556AHuiRule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-a-hui");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews556OaRule(ctx = {}) {
      const sourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem(ctx, "") || resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceBaseStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.6-i-hui-a-hui-to-o-a"]?.find(entry => entry.id === "o-a") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews556OaRule(ctx);
      const targetVerbStem = sourceBaseStem && sourceVerbStem && !diagnostics.length ? `${sourceBaseStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: sourceBaseStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem: sourceBaseStem,
        sourceVerbStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function generateNawatDenominalAndrews557IARule(ctx = {}) {
      const sourceStem = resolveNawatDenominalAndrewsRuleSourceStem(ctx);
      const sourceState = resolveNawatDenominalAndrewsRuleSourceState(ctx);
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(sourceStem);
      const template = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID["55.7-transitive-i-a"]?.find(entry => entry.id === "i-a") || null;
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const diagnostics = diagnoseNawatDenominalAndrews557IARule(ctx);
      const targetVerbStem = sourceStem && !diagnostics.length ? `${sourceStem}${suffix.nawatSurfaceSuffix}` : "";
      const targetInput = targetVerbStem ? formatNawatDenominalAndrewsContractTargetInput({
        sourceStem,
        targetVerbStem,
        suffix,
        template
      }) : "";
      const rule = getNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a");
      return buildNawatDenominalAndrewsExecutableRuleResult({
        rule,
        sourceStem,
        sourceState,
        sourceStemFinalLetter,
        targetVerbStem,
        targetInput,
        targetStemClass: stemClassContract.targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        suffix,
        diagnostics
      });
    }
    function createNawatDenominalAndrews5421TiRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-1-ti",
        contractId: "54.2.1-inceptive-stative-ti",
        routeTemplateId: "ti",
        range: "54.2.1",
        authority: ["Andrews 54.2", "Andrews 54.2.1"],
        input: {
          unit: "nnc-predicate",
          state: "absolutive",
          sourceCategory: "absolutive-state-nnc-predicate",
          sourceEvidence: "nawat-source-stem-or-generated-nnc-predicate"
        },
        operation: {
          type: "denominal-verbstem",
          suffix: "ti",
          classicalSuffix: "ti",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["A", "B"],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5421TiRule,
        diagnose: diagnoseNawatDenominalAndrews5421TiRule
      };
    }
    function createNawatDenominalAndrews5422HuiRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-2-hui",
        contractId: "54.2.2-inceptive-stative-hui",
        routeTemplateId: "hui",
        range: "54.2.2",
        authority: ["Andrews 54.2", "Andrews 54.2.2"],
        input: {
          unit: "nnc-predicate",
          state: "absolutive",
          sourceCategory: "absolutive-state-nnc-predicate",
          sourceEvidence: "nawat-source-stem-or-generated-nnc-predicate"
        },
        operation: {
          type: "denominal-verbstem",
          suffix: "wi",
          classicalSuffix: "hui",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["A", "B"],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5422HuiRule,
        diagnose: diagnoseNawatDenominalAndrews5422HuiRule
      };
    }
    function createNawatDenominalAndrews5422HuiLiaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-2-hui-lia",
        contractId: "54.2.2-hui-lia-causative",
        routeTemplateId: "hui-lia",
        range: "54.2.2",
        authority: ["Andrews 54.2.2", "Andrews 25.5"],
        input: {
          unit: "vnc",
          state: "derived",
          sourceCategory: "intransitive-hui-vnc",
          sourceEvidence: "generated-hui-verbstem-required"
        },
        operation: {
          type: "single-object-causative-verbstem",
          sourceSuffix: "wi",
          suffix: "lia",
          classicalSuffix: "hui-lia",
          outputValency: "single-object-causative"
        },
        output: {
          unit: "vnc",
          valency: "single-object-causative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5422HuiLiaRule,
        diagnose: diagnoseNawatDenominalAndrews5422HuiLiaRule
      };
    }
    function createNawatDenominalAndrews5423YaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-3-ya",
        contractId: "54.2.3-inceptive-stative-ya",
        routeTemplateId: "ya",
        range: "54.2.3",
        authority: ["Andrews 54.2", "Andrews 54.2.3"],
        input: {
          unit: "nounroot-or-nounstem-as-root",
          state: "absolutive",
          sourceCategory: "nounroot-or-nounstem-as-root",
          sourceEvidence: "nawat-root-or-stem-as-root"
        },
        operation: {
          type: "denominal-verbstem",
          suffix: "ya",
          classicalSuffix: "ya",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["A", "B"],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5423YaRule,
        diagnose: diagnoseNawatDenominalAndrews5423YaRule
      };
    }
    function createNawatDenominalAndrews5423TiYaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-3-ti-ya",
        contractId: "54.2.3-ti-ya-deverbal",
        routeTemplateId: "ti-ya",
        range: "54.2.3",
        authority: ["Andrews 54.2.3"],
        input: {
          unit: "vnc",
          state: "derived",
          sourceCategory: "intransitive-ti-vnc",
          sourceEvidence: "generated-ti-verbstem-required"
        },
        operation: {
          type: "deverbal-verbstem",
          sourceSuffix: "ti",
          suffix: "ya",
          classicalSuffix: "ti-ya",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["A", "B"],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5423TiYaRule,
        diagnose: diagnoseNawatDenominalAndrews5423TiYaRule
      };
    }
    function createNawatDenominalAndrews5423HuiYaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-3-hui-ya",
        contractId: "54.2.3-hui-ya-deverbal",
        routeTemplateId: "hui-ya",
        range: "54.2.3",
        authority: ["Andrews 54.2.3"],
        input: {
          unit: "vnc",
          state: "derived",
          sourceCategory: "intransitive-hui-vnc",
          sourceEvidence: "generated-hui-verbstem-required"
        },
        operation: {
          type: "deverbal-verbstem",
          sourceSuffix: "wi",
          suffix: "ya",
          classicalSuffix: "hui-ya",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["B"],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5423HuiYaRule,
        diagnose: diagnoseNawatDenominalAndrews5423HuiYaRule
      };
    }
    function createNawatDenominalAndrews5423YaLiaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-3-ya-lia",
        contractId: "54.2.3-ya-lia-causative",
        routeTemplateId: "ya-lia",
        range: "54.2.3",
        authority: ["Andrews 54.2.3", "Andrews 25.5.2"],
        input: {
          unit: "vnc",
          state: "derived",
          sourceCategory: "intransitive-ya-vnc",
          sourceEvidence: "generated-ya-verbstem-required"
        },
        operation: {
          type: "causative-or-applicative-verbstem",
          sourceSuffix: "ya",
          droppedSourceSuffix: "ya",
          suffix: "lia",
          classicalSuffix: "lia",
          outputValency: "single-object-causative-or-applicative"
        },
        output: {
          unit: "vnc",
          valency: "single-object-causative-or-applicative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5423YaLiaRule,
        diagnose: diagnoseNawatDenominalAndrews5423YaLiaRule
      };
    }
    function createNawatDenominalAndrews5424ARuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-4-a",
        contractId: "54.2.4-inceptive-stative-a",
        routeTemplateId: "a",
        range: "54.2.4",
        authority: ["Andrews 54.2.4"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "absolutive-nounstem",
          sourceEvidence: "nawat-source-nounstem-required"
        },
        operation: {
          type: "limited-inceptive-stative-verbstem",
          suffix: "a",
          classicalSuffix: "a",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["C"],
          surfaceAuthority: "nawat-orthography"
        },
        generate: generateNawatDenominalAndrews5424ARule,
        diagnose: diagnoseNawatDenominalAndrews5424ARule
      };
    }
    function createNawatDenominalAndrews5425HuaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-5-hua",
        contractId: "54.2.5-inceptive-stative-hua",
        routeTemplateId: "hua",
        range: "54.2.5",
        authority: ["Andrews 54.2.5", "Andrews 39.3"],
        input: {
          unit: "deverbal-nounstem",
          state: "absolutive",
          sourceCategory: "deverbal-yu-nounstem",
          sourceEvidence: "confirmed-deverbal-yo-tl-yu-source-required"
        },
        operation: {
          type: "deverbal-yo-nounstem-inceptive-stative-verbstem",
          sourceMatrix: "yu",
          suffix: "wa",
          classicalSuffix: "hua",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["A"],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        generate: generateNawatDenominalAndrews5425HuaRule,
        diagnose: diagnoseNawatDenominalAndrews5425HuaRule
      };
    }
    function createNawatDenominalAndrews543IncludedPossessorTiRuleContract() {
      return {
        version: 1,
        id: "andrews-54-3-included-possessor-ti",
        contractId: "54.3-included-possessor-ti",
        routeTemplateId: "included-possessor-ti",
        range: "54.3",
        authority: ["Andrews 54.3"],
        input: {
          unit: "nnc-predicate",
          state: "possessive",
          sourceCategory: "possessive-state-nnc-predicate",
          sourceEvidence: "confirmed-possessive-state-nnc-predicate-required"
        },
        operation: {
          type: "possessive-state-predicate-included-possessor-verbstem",
          suffix: "ti",
          classicalSuffix: "ti",
          possessorPlacement: "inside-derived-verbstem",
          possessiveCaseTransformedToObjective: false,
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["A"],
          surfaceAuthority: "nawat-source-surface-and-orthography"
        },
        generate: generateNawatDenominalAndrews543IncludedPossessorTiRule,
        diagnose: diagnoseNawatDenominalAndrews543IncludedPossessorTiRule
      };
    }
    function createNawatDenominalAndrews542544TiLiaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-2-54-4-ti-lia",
        contractId: "54.2-54.4-ti-lia-causative",
        routeTemplateId: "ti-lia",
        range: "54.2.1/54.4",
        authority: ["Andrews 54.2.1", "Andrews 54.4", "Andrews 25.5"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "intransitive-ti-verbstem-source",
          sourceEvidence: "generated-ti-verbstem-source-required"
        },
        operation: {
          type: "single-object-causative-from-ti-verbstem",
          sourceSuffix: "ti",
          suffix: "lia",
          classicalSuffix: "lia",
          outputValency: "single-object-causative"
        },
        output: {
          unit: "vnc",
          valency: "single-object-causative",
          stemClass: ["C"],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        generate: generateNawatDenominalAndrews542544TiLiaRule,
        diagnose: diagnoseNawatDenominalAndrews542544TiLiaRule
      };
    }
    function createNawatDenominalAndrews545TiARuleContract() {
      return {
        version: 1,
        id: "andrews-54-5-ti-a",
        contractId: "54.5-ti-a-causative",
        routeTemplateId: "ti-a",
        range: "54.5",
        authority: ["Andrews 54.5", "Andrews 54.5.1"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "intransitive-ti-verbstem-source",
          sourceEvidence: "generated-ti-verbstem-source-required"
        },
        operation: {
          type: "single-object-first-type-causative-from-ti-verbstem",
          sourceSuffix: "ti",
          suffix: "a",
          classicalSuffix: "a",
          outputValency: "single-object-causative"
        },
        output: {
          unit: "vnc",
          valency: "single-object-causative",
          stemClass: ["C"],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          singleObjectTiSourceRouteOnly: true,
          possessiveSourceDoubleObjectUnmodeled: true
        },
        generate: generateNawatDenominalAndrews545TiARule,
        diagnose: diagnoseNawatDenominalAndrews545TiARule
      };
    }
    function createNawatDenominalAndrews546TIaRuleContract() {
      return {
        version: 1,
        id: "andrews-54-6-t-ia",
        contractId: "54.6-t-ia-applicative",
        routeTemplateId: "t-ia",
        range: "54.6",
        authority: ["Andrews 54.6", "Andrews 26.2"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "intransitive-ti-verbstem-source",
          sourceEvidence: "generated-ti-verbstem-source-required"
        },
        operation: {
          type: "first-type-applicative-from-ti-verbstem",
          sourceSuffix: "ti",
          replaciveSourceStem: "delete-final-i",
          suffix: "ia",
          classicalSuffix: "ia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: ["C"],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          limitedTiApplicativeUse: true,
          replaciveTiFinalIDeleted: true,
          distinguishFromTiACausative: true
        },
        generate: generateNawatDenominalAndrews546TIaRule,
        diagnose: diagnoseNawatDenominalAndrews546TIaRule
      };
    }
    function createNawatDenominalAndrews551TemporalTiaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-1-temporal-tia",
        contractId: "55.1-temporal-tia",
        routeTemplateId: "tia",
        range: "55.1",
        authority: ["Andrews 55.1"],
        input: {
          unit: "compound-temporal-nounstem",
          state: "absolutive",
          sourceCategory: "compound-temporal-nounstem",
          sourceEvidence: "confirmed-time-segment-matrix-plus-numeral-embed-required"
        },
        operation: {
          type: "temporal-intransitive-denominal-verbstem",
          suffix: "tia",
          classicalSuffix: "tia",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          temporalDenominalModeled: true,
          temporalMatrixMustBeTimeSegment: true,
          temporalEmbedMustBeNumeralNounstem: true,
          doesNotTreatLocativoTemporalNominalAsAutomaticEvidence: true
        },
        generate: generateNawatDenominalAndrews551TemporalTiaRule,
        diagnose: diagnoseNawatDenominalAndrews551TemporalTiaRule
      };
    }
    function createNawatDenominalAndrews552CausativeTlaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-2-causative-tla",
        contractId: "55.2-causative-tla",
        routeTemplateId: "tla",
        range: "55.2",
        authority: ["Andrews 55.2"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "nounstem",
          sourceEvidence: "nawat-source-nounstem-required"
        },
        operation: {
          type: "denominal-causative-verbstem",
          suffix: "ta",
          classicalSuffix: "tla",
          outputValency: "causative"
        },
        output: {
          unit: "vnc",
          valency: "causative",
          stemClass: ["A"],
          surfaceAuthority: "nawat-orthography"
        },
        boundaries: {
          causativeTlaModeled: true,
          applicativeCounterpartUnmodeled: true,
          intransitiveTlaNoteUnmodeled: true,
          finiteGenerationRequiresObjectPrefix: true
        },
        generate: generateNawatDenominalAndrews552CausativeTlaRule,
        diagnose: diagnoseNawatDenominalAndrews552CausativeTlaRule
      };
    }
    function createNawatDenominalAndrews552TlaTiLiaApplicativeRuleContract() {
      return {
        version: 1,
        id: "andrews-55-2-tla-ti-lia-applicative",
        contractId: "55.2-tla-ti-lia-applicative",
        routeTemplateId: "tla-ti-lia",
        range: "55.2",
        authority: ["Andrews 55.2", "Andrews 26.7"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "causative-tla-verbstem-source",
          sourceEvidence: "generated-causative-tla-verbstem-source-required"
        },
        operation: {
          type: "applicative-from-causative-tla-verbstem",
          sourceSuffix: "ta",
          sourceClassicalSuffix: "tla",
          replacementBeforeSuffix: "ti",
          suffix: "lia",
          classicalSuffix: "ti-lia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresTlaCausativeSource: true,
          sourceTlaReplacedByTiBeforeLia: true,
          intransitiveTlaNoteUnmodeled: true
        },
        generate: generateNawatDenominalAndrews552TlaTiLiaApplicativeRule,
        diagnose: diagnoseNawatDenominalAndrews552TlaTiLiaApplicativeRule
      };
    }
    function createNawatDenominalAndrews552IntransitiveTlaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-2-intransitive-tla",
        contractId: "55.2-intransitive-tla",
        routeTemplateId: "intransitive-tla",
        range: "55.2 note",
        authority: ["Andrews 55.2 note"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "nounstem",
          sourceEvidence: "confirmed-very-limited-intransitive-tla-source-required"
        },
        operation: {
          type: "very-limited-denominal-intransitive-tla-verbstem",
          suffix: "ta",
          classicalSuffix: "tla",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          limitedUse: true,
          veryLimitedUse: true,
          distinctFromCausativeTla: true,
          noProductiveDirectGeneration: true,
          sourceEvidenceRequiredBecauseEvenLessProductiveThanCausativeTla: true
        },
        generate: generateNawatDenominalAndrews552IntransitiveTlaRule,
        diagnose: diagnoseNawatDenominalAndrews552IntransitiveTlaRule
      };
    }
    function createNawatDenominalAndrews552IntransitiveTlaTiARuleContract() {
      return {
        version: 1,
        id: "andrews-55-2-intransitive-tla-ti-a",
        contractId: "55.2-intransitive-tla-ti-a-causative",
        routeTemplateId: "intransitive-tla-ti-a",
        range: "55.2 note",
        authority: ["Andrews 55.2 note"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "intransitive-tla-verbstem-source",
          sourceEvidence: "generated-intransitive-tla-verbstem-source-required"
        },
        operation: {
          type: "causative-from-intransitive-tla-verbstem",
          sourceSuffix: "ta",
          sourceClassicalSuffix: "tla",
          replacementBeforeSuffix: "ti",
          suffix: "a",
          classicalSuffix: "ti-a",
          outputValency: "causative"
        },
        output: {
          unit: "vnc",
          valency: "causative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresTlaIntransitiveSource: true,
          sourceTlaReplacedByTiBeforeA: true,
          noProductiveDirectGeneration: true,
          sourceEvidenceRequiredBecauseIntransitiveTlaIsVeryLimited: true
        },
        generate: generateNawatDenominalAndrews552IntransitiveTlaTiARule,
        diagnose: diagnoseNawatDenominalAndrews552IntransitiveTlaTiARule
      };
    }
    function createNawatDenominalAndrews552IntransitiveTlaTiLiaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-2-intransitive-tla-ti-lia",
        contractId: "55.2-intransitive-tla-ti-lia-applicative",
        routeTemplateId: "intransitive-tla-ti-lia",
        range: "55.2 note",
        authority: ["Andrews 55.2 note"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "intransitive-tla-verbstem-source",
          sourceEvidence: "generated-intransitive-tla-verbstem-source-required"
        },
        operation: {
          type: "applicative-from-intransitive-tla-causative-verbstem",
          sourceSuffix: "ta",
          sourceClassicalSuffix: "tla",
          replacementBeforeSuffix: "ti",
          suffix: "lia",
          classicalSuffix: "ti-lia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresTlaIntransitiveSource: true,
          sourceTlaReplacedByTiBeforeLia: true,
          noProductiveDirectGeneration: true,
          sourceEvidenceRequiredBecauseIntransitiveTlaIsVeryLimited: true
        },
        generate: generateNawatDenominalAndrews552IntransitiveTlaTiLiaRule,
        diagnose: diagnoseNawatDenominalAndrews552IntransitiveTlaTiLiaRule
      };
    }
    function createNawatDenominalAndrews553OaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-3-o-a",
        contractId: "55.3-intransitive-o-a-applicative-huia",
        routeTemplateId: "o-a",
        range: "55.3",
        authority: ["Andrews 55.3"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "nounstem",
          sourceEvidence: "nawat-source-nounstem-required"
        },
        operation: {
          type: "denominal-intransitive-o-a-verbstem",
          suffix: "ua",
          classicalSuffix: "o-a",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["C"],
          surfaceAuthority: "nawat-orthography"
        },
        boundaries: {
          intransitiveOaModeled: true,
          oaSuffixNotCausative: true,
          notVeryProductive: true,
          applicativeCounterpart: "huia"
        },
        generate: generateNawatDenominalAndrews553OaRule,
        diagnose: diagnoseNawatDenominalAndrews553OaRule
      };
    }
    function createNawatDenominalAndrews553HuiaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-3-huia",
        contractId: "55.3-intransitive-o-a-applicative-huia",
        routeTemplateId: "huia",
        range: "55.3",
        authority: ["Andrews 55.3"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "nounstem",
          sourceEvidence: "nawat-source-nounstem-required"
        },
        operation: {
          type: "denominal-single-object-applicative-huia-verbstem",
          suffix: "wia",
          classicalSuffix: "huia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: ["C"],
          surfaceAuthority: "nawat-orthography"
        },
        boundaries: {
          applicativeHuiaCounterpartModeled: true,
          finiteGenerationRequiresObjectPrefix: true,
          twoObjectPossessiveStateHuiaNoteUnmodeled: true,
          notVeryProductive: true
        },
        generate: generateNawatDenominalAndrews553HuiaRule,
        diagnose: diagnoseNawatDenominalAndrews553HuiaRule
      };
    }
    function createNawatDenominalAndrews553OaIlHuiaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-3-o-a-i-l-huia",
        contractId: "55.3-o-a-il-huia-al-huia-applicative-note",
        routeTemplateId: "o-a-i-l-huia",
        range: "55.3 note 2",
        authority: ["Andrews 55.3 note 2", "Andrews 26.9.2"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "intransitive-o-a-verbstem-source",
          sourceEvidence: "generated-intransitive-o-a-verbstem-source-required"
        },
        operation: {
          type: "single-object-applicative-via-hypothetical-i-hui-from-intransitive-o-a",
          sourceSuffix: "ua",
          sourceClassicalSuffix: "o-a",
          hypotheticalSourceSuffix: "i-hui",
          suffix: "ilwia",
          classicalSuffix: "i-l-huia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresIntransitiveOaSource: true,
          sourceOaBypassesTransitiveOaStep: true,
          hypotheticalIHuiAHuiSource: true,
          noProductiveDirectGeneration: true
        },
        generate: generateNawatDenominalAndrews553OaIlHuiaRule,
        diagnose: diagnoseNawatDenominalAndrews553OaIlHuiaRule
      };
    }
    function createNawatDenominalAndrews553OaAlHuiaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-3-o-a-a-l-huia",
        contractId: "55.3-o-a-il-huia-al-huia-applicative-note",
        routeTemplateId: "o-a-a-l-huia",
        range: "55.3 note 2",
        authority: ["Andrews 55.3 note 2", "Andrews 26.9.2"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "intransitive-o-a-verbstem-source",
          sourceEvidence: "generated-intransitive-o-a-verbstem-source-required"
        },
        operation: {
          type: "single-object-applicative-via-hypothetical-a-hui-from-intransitive-o-a",
          sourceSuffix: "ua",
          sourceClassicalSuffix: "o-a",
          hypotheticalSourceSuffix: "a-hui",
          suffix: "alwia",
          classicalSuffix: "a-l-huia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresIntransitiveOaSource: true,
          sourceOaBypassesTransitiveOaStep: true,
          hypotheticalIHuiAHuiSource: true,
          noProductiveDirectGeneration: true
        },
        generate: generateNawatDenominalAndrews553OaAlHuiaRule,
        diagnose: diagnoseNawatDenominalAndrews553OaAlHuiaRule
      };
    }
    function createNawatDenominalAndrews554AdverbialHuiaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-4-adverbial-huia",
        contractId: "55.4-adverbial-huia",
        routeTemplateId: "adverbial-huia",
        range: "55.4",
        authority: ["Andrews 55.4", "Andrews Lesson 44"],
        input: {
          unit: "nounstem",
          state: "adverbialized",
          sourceCategory: "adverbial-nounstem",
          sourceEvidence: "confirmed-adverbial-nounstem-required"
        },
        operation: {
          type: "denominal-single-object-applicative-huia-from-adverbial-nounstem",
          suffix: "wia",
          classicalSuffix: "huia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresAdverbialSource: true,
          sourceMustBeConfirmedAdverbialNounstem: true,
          doesNotTreatConfiguredAdverbioAsAutomaticEvidence: true,
          finiteGenerationRequiresObjectPrefix: true,
          noProductiveDirectGeneration: true
        },
        generate: generateNawatDenominalAndrews554AdverbialHuiaRule,
        diagnose: diagnoseNawatDenominalAndrews554AdverbialHuiaRule
      };
    }
    function createNawatDenominalAndrews555RelationalOaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-5-relational-o-a",
        contractId: "55.5-relational-compound-o-a-huia",
        routeTemplateId: "relational-o-a",
        range: "55.5",
        authority: ["Andrews 55.5"],
        input: {
          unit: "nounstem-or-nnc-predicate",
          state: "relational-or-possessive",
          sourceCategory: "compound-relational-nounstem-or-possessive-state-relational-predicate",
          sourceEvidence: "confirmed-relational-compound-or-predicate-required"
        },
        operation: {
          type: "denominal-o-a-from-relational-compound-or-predicate",
          suffix: "ua",
          classicalSuffix: "o-a",
          outputValency: "usually-transitive"
        },
        output: {
          unit: "vnc",
          valency: "usually-transitive",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresRelationalCompoundSource: true,
          sourceMustBeConfirmedRelationalCompoundOrPredicate: true,
          doesNotTreatRelationalBoundaryFrameAsAutomaticEvidence: true,
          relationalOaUsuallyTransitiveExceptionallyIntransitive: true,
          finiteGenerationRequiresObjectPrefix: true,
          noProductiveDirectGeneration: true
        },
        generate: generateNawatDenominalAndrews555RelationalOaRule,
        diagnose: diagnoseNawatDenominalAndrews555RelationalOaRule
      };
    }
    function createNawatDenominalAndrews555RelationalHuiaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-5-relational-huia",
        contractId: "55.5-relational-compound-o-a-huia",
        routeTemplateId: "relational-huia",
        range: "55.5",
        authority: ["Andrews 55.5"],
        input: {
          unit: "nounstem-or-nnc-predicate",
          state: "relational-or-possessive",
          sourceCategory: "compound-relational-nounstem-or-possessive-state-relational-predicate",
          sourceEvidence: "confirmed-relational-compound-or-predicate-required"
        },
        operation: {
          type: "denominal-single-object-applicative-huia-from-relational-compound-or-predicate",
          suffix: "wia",
          classicalSuffix: "huia",
          outputValency: "applicative"
        },
        output: {
          unit: "vnc",
          valency: "applicative",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresRelationalCompoundSource: true,
          sourceMustBeConfirmedRelationalCompoundOrPredicate: true,
          doesNotTreatRelationalBoundaryFrameAsAutomaticEvidence: true,
          finiteGenerationRequiresObjectPrefix: true,
          noProductiveDirectGeneration: true
        },
        generate: generateNawatDenominalAndrews555RelationalHuiaRule,
        diagnose: diagnoseNawatDenominalAndrews555RelationalHuiaRule
      };
    }
    function createNawatDenominalAndrews556IHuiRuleContract() {
      return {
        version: 1,
        id: "andrews-55-6-i-hui",
        contractId: "55.6-i-hui-a-hui-to-o-a",
        routeTemplateId: "i-hui",
        range: "55.6",
        authority: ["Andrews 55.6", "Andrews 24.7"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "absolutive-nounstem",
          sourceEvidence: "nawat-source-nounstem-required"
        },
        operation: {
          type: "denominal-intransitive-i-hui-verbstem",
          suffix: "iwi",
          classicalSuffix: "i-hui",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["B"],
          surfaceAuthority: "nawat-orthography"
        },
        boundaries: {
          sourceCanSatisfyIHuiAHuiOaCausative: true,
          sourceSynonymousWithTiInceptiveStative: true,
          targetStemClassVerified: true,
          targetStemClass: "B"
        },
        generate: generateNawatDenominalAndrews556IHuiRule,
        diagnose: diagnoseNawatDenominalAndrews556IHuiRule
      };
    }
    function createNawatDenominalAndrews556AHuiRuleContract() {
      return {
        version: 1,
        id: "andrews-55-6-a-hui",
        contractId: "55.6-i-hui-a-hui-to-o-a",
        routeTemplateId: "a-hui",
        range: "55.6",
        authority: ["Andrews 55.6", "Andrews 24.7"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "absolutive-nounstem",
          sourceEvidence: "nawat-source-nounstem-required"
        },
        operation: {
          type: "denominal-intransitive-a-hui-verbstem",
          suffix: "awi",
          classicalSuffix: "a-hui",
          outputValency: "intransitive"
        },
        output: {
          unit: "vnc",
          valency: "intransitive",
          stemClass: ["B"],
          surfaceAuthority: "nawat-orthography"
        },
        boundaries: {
          sourceCanSatisfyIHuiAHuiOaCausative: true,
          sourceSynonymousWithTiInceptiveStative: true,
          targetStemClassVerified: true,
          targetStemClass: "B"
        },
        generate: generateNawatDenominalAndrews556AHuiRule,
        diagnose: diagnoseNawatDenominalAndrews556AHuiRule
      };
    }
    function createNawatDenominalAndrews556OaRuleContract() {
      return {
        version: 1,
        id: "andrews-55-6-o-a",
        contractId: "55.6-i-hui-a-hui-to-o-a",
        routeTemplateId: "o-a",
        range: "55.6",
        authority: ["Andrews 55.6", "Andrews 24.7"],
        input: {
          unit: "vnc-stem",
          state: "derived",
          sourceCategory: "i-hui-a-hui-source",
          sourceEvidence: "generated-i-hui-a-hui-source-required"
        },
        operation: {
          type: "causative-o-a-from-i-hui-a-hui-source",
          sourceSuffixes: ["iwi", "awi"],
          sourceClassicalSuffixes: ["i-hui", "a-hui"],
          suffix: "ua",
          classicalSuffix: "o-a",
          outputValency: "transitive"
        },
        output: {
          unit: "vnc",
          valency: "transitive",
          stemClass: ["C"],
          surfaceAuthority: "nawat-orthography-and-source-evidence"
        },
        boundaries: {
          requiresIHuiOrAHuiSource: true,
          sourceIHuiAHuiBecomesOaCausative: true,
          noProductiveDirectGeneration: true,
          finiteGenerationRequiresObjectPrefix: true,
          targetStemClassVerified: true,
          targetStemClass: "C"
        },
        generate: generateNawatDenominalAndrews556OaRule,
        diagnose: diagnoseNawatDenominalAndrews556OaRule
      };
    }
    function createNawatDenominalAndrews557IARuleContract() {
      return {
        version: 1,
        id: "andrews-55-7-i-a",
        contractId: "55.7-transitive-i-a",
        routeTemplateId: "i-a",
        range: "55.7",
        authority: ["Andrews 55.7"],
        input: {
          unit: "nounstem",
          state: "absolutive",
          sourceCategory: "nounstem-plus-i-base",
          sourceEvidence: "nawat-source-nounstem-and-andrews-source-final-pattern"
        },
        operation: {
          type: "denominal-transitive-i-a-verbstem",
          baseExtension: "i",
          suffix: "ia",
          classicalSuffix: "i-a",
          outputValency: "transitive"
        },
        output: {
          unit: "vnc",
          valency: "transitive",
          stemClass: [],
          surfaceAuthority: "nawat-orthography-and-source-final-evidence"
        },
        boundaries: {
          noIntransitiveCounterpart: true,
          sourceFinalPatternGuarded: true,
          majoritySourceFinalLetters: ["k", "l"],
          attestedSourceFinalLetters: ["k", "l", "n"],
          wFinalSourceMayBeHuia: true,
          sourceIFormMayBelongToNounstem: true,
          sourceIHuiCausativePathPossible: true,
          finiteGenerationRequiresObjectPrefix: true
        },
        generate: generateNawatDenominalAndrews557IARule,
        diagnose: diagnoseNawatDenominalAndrews557IARule
      };
    }
    function getNawatDenominalAndrewsExecutableRuleContract(id = "") {
      const ruleId = String(id || "").trim();
      if (ruleId === "andrews-54-2-1-ti" || ruleId === "54.2.1-inceptive-stative-ti" || ruleId === "54.2.1") {
        return createNawatDenominalAndrews5421TiRuleContract();
      }
      if (ruleId === "andrews-54-2-2-hui" || ruleId === "54.2.2-inceptive-stative-hui" || ruleId === "54.2.2") {
        return createNawatDenominalAndrews5422HuiRuleContract();
      }
      if (ruleId === "andrews-54-2-2-hui-lia" || ruleId === "54.2.2-hui-lia-causative") {
        return createNawatDenominalAndrews5422HuiLiaRuleContract();
      }
      if (ruleId === "andrews-54-2-3-ya" || ruleId === "54.2.3-inceptive-stative-ya" || ruleId === "54.2.3") {
        return createNawatDenominalAndrews5423YaRuleContract();
      }
      if (ruleId === "andrews-54-2-3-ti-ya" || ruleId === "54.2.3-ti-ya-deverbal") {
        return createNawatDenominalAndrews5423TiYaRuleContract();
      }
      if (ruleId === "andrews-54-2-3-hui-ya" || ruleId === "54.2.3-hui-ya-deverbal") {
        return createNawatDenominalAndrews5423HuiYaRuleContract();
      }
      if (ruleId === "andrews-54-2-3-ya-lia" || ruleId === "54.2.3-ya-lia-causative") {
        return createNawatDenominalAndrews5423YaLiaRuleContract();
      }
      if (ruleId === "andrews-54-2-4-a" || ruleId === "54.2.4-inceptive-stative-a" || ruleId === "54.2.4") {
        return createNawatDenominalAndrews5424ARuleContract();
      }
      if (ruleId === "andrews-54-2-5-hua" || ruleId === "54.2.5-inceptive-stative-hua" || ruleId === "54.2.5") {
        return createNawatDenominalAndrews5425HuaRuleContract();
      }
      if (ruleId === "andrews-54-3-included-possessor-ti" || ruleId === "54.3-included-possessor-ti" || ruleId === "54.3") {
        return createNawatDenominalAndrews543IncludedPossessorTiRuleContract();
      }
      if (ruleId === "andrews-54-2-54-4-ti-lia" || ruleId === "54.2-54.4-ti-lia-causative") {
        return createNawatDenominalAndrews542544TiLiaRuleContract();
      }
      if (ruleId === "andrews-54-5-ti-a" || ruleId === "54.5-ti-a-causative" || ruleId === "54.5") {
        return createNawatDenominalAndrews545TiARuleContract();
      }
      if (ruleId === "andrews-54-6-t-ia" || ruleId === "54.6-t-ia-applicative" || ruleId === "54.6") {
        return createNawatDenominalAndrews546TIaRuleContract();
      }
      if (ruleId === "andrews-55-1-temporal-tia" || ruleId === "55.1-temporal-tia" || ruleId === "55.1") {
        return createNawatDenominalAndrews551TemporalTiaRuleContract();
      }
      if (ruleId === "andrews-55-2-causative-tla" || ruleId === "55.2-causative-tla") {
        return createNawatDenominalAndrews552CausativeTlaRuleContract();
      }
      if (ruleId === "andrews-55-2-tla-ti-lia-applicative" || ruleId === "55.2-tla-ti-lia-applicative") {
        return createNawatDenominalAndrews552TlaTiLiaApplicativeRuleContract();
      }
      if (ruleId === "andrews-55-2-intransitive-tla" || ruleId === "55.2-intransitive-tla") {
        return createNawatDenominalAndrews552IntransitiveTlaRuleContract();
      }
      if (ruleId === "andrews-55-2-intransitive-tla-ti-a" || ruleId === "55.2-intransitive-tla-ti-a-causative") {
        return createNawatDenominalAndrews552IntransitiveTlaTiARuleContract();
      }
      if (ruleId === "andrews-55-2-intransitive-tla-ti-lia" || ruleId === "55.2-intransitive-tla-ti-lia-applicative") {
        return createNawatDenominalAndrews552IntransitiveTlaTiLiaRuleContract();
      }
      if (ruleId === "andrews-55-3-o-a" || ruleId === "55.3-intransitive-o-a-applicative-huia:o-a") {
        return createNawatDenominalAndrews553OaRuleContract();
      }
      if (ruleId === "andrews-55-3-huia" || ruleId === "55.3-intransitive-o-a-applicative-huia:huia") {
        return createNawatDenominalAndrews553HuiaRuleContract();
      }
      if (ruleId === "andrews-55-3-o-a-i-l-huia" || ruleId === "55.3-o-a-il-huia-al-huia-applicative-note:o-a-i-l-huia") {
        return createNawatDenominalAndrews553OaIlHuiaRuleContract();
      }
      if (ruleId === "andrews-55-3-o-a-a-l-huia" || ruleId === "55.3-o-a-il-huia-al-huia-applicative-note:o-a-a-l-huia") {
        return createNawatDenominalAndrews553OaAlHuiaRuleContract();
      }
      if (ruleId === "andrews-55-4-adverbial-huia" || ruleId === "55.4-adverbial-huia:adverbial-huia" || ruleId === "55.4-adverbial-huia") {
        return createNawatDenominalAndrews554AdverbialHuiaRuleContract();
      }
      if (ruleId === "andrews-55-5-relational-o-a" || ruleId === "55.5-relational-compound-o-a-huia:relational-o-a") {
        return createNawatDenominalAndrews555RelationalOaRuleContract();
      }
      if (ruleId === "andrews-55-5-relational-huia" || ruleId === "55.5-relational-compound-o-a-huia:relational-huia") {
        return createNawatDenominalAndrews555RelationalHuiaRuleContract();
      }
      if (ruleId === "andrews-55-6-i-hui" || ruleId === "55.6-i-hui-a-hui-to-o-a:i-hui") {
        return createNawatDenominalAndrews556IHuiRuleContract();
      }
      if (ruleId === "andrews-55-6-a-hui" || ruleId === "55.6-i-hui-a-hui-to-o-a:a-hui") {
        return createNawatDenominalAndrews556AHuiRuleContract();
      }
      if (ruleId === "andrews-55-6-o-a" || ruleId === "55.6-i-hui-a-hui-to-o-a:o-a") {
        return createNawatDenominalAndrews556OaRuleContract();
      }
      if (ruleId === "andrews-55-7-i-a" || ruleId === "55.7-transitive-i-a:i-a" || ruleId === "55.7-transitive-i-a") {
        return createNawatDenominalAndrews557IARuleContract();
      }
      return null;
    }
    function getNawatDenominalAndrewsExecutableRuleContractForRoute(contractId = "", routeTemplateId = "") {
      const normalizedContractId = String(contractId || "").trim();
      const normalizedTemplateId = String(routeTemplateId || "").trim();
      if (normalizedContractId === "54.2.1-inceptive-stative-ti" && normalizedTemplateId === "ti") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-1-ti");
      }
      if (normalizedContractId === "54.2.2-inceptive-stative-hui" && normalizedTemplateId === "hui") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui");
      }
      if (normalizedContractId === "54.2.2-hui-lia-causative" && normalizedTemplateId === "hui-lia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui-lia");
      }
      if (normalizedContractId === "54.2.3-inceptive-stative-ya" && normalizedTemplateId === "ya") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya");
      }
      if (normalizedContractId === "54.2.3-ti-ya-deverbal" && normalizedTemplateId === "ti-ya") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ti-ya");
      }
      if (normalizedContractId === "54.2.3-hui-ya-deverbal" && normalizedTemplateId === "hui-ya") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-hui-ya");
      }
      if (normalizedContractId === "54.2.3-ya-lia-causative" && normalizedTemplateId === "ya-lia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya-lia");
      }
      if (normalizedContractId === "54.2.4-inceptive-stative-a" && normalizedTemplateId === "a") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-4-a");
      }
      if (normalizedContractId === "54.2.5-inceptive-stative-hua" && normalizedTemplateId === "hua") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-5-hua");
      }
      if (normalizedContractId === "54.3-included-possessor-ti" && normalizedTemplateId === "included-possessor-ti") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-3-included-possessor-ti");
      }
      if (normalizedContractId === "54.2-54.4-ti-lia-causative" && normalizedTemplateId === "ti-lia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-54-4-ti-lia");
      }
      if (normalizedContractId === "54.5-ti-a-causative" && normalizedTemplateId === "ti-a") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-5-ti-a");
      }
      if (normalizedContractId === "54.6-t-ia-applicative" && normalizedTemplateId === "t-ia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-54-6-t-ia");
      }
      if (normalizedContractId === "55.1-temporal-tia" && normalizedTemplateId === "tia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia");
      }
      if (normalizedContractId === "55.2-causative-tla" && normalizedTemplateId === "tla") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-causative-tla");
      }
      if (normalizedContractId === "55.2-tla-ti-lia-applicative" && normalizedTemplateId === "tla-ti-lia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-tla-ti-lia-applicative");
      }
      if (normalizedContractId === "55.2-intransitive-tla" && normalizedTemplateId === "intransitive-tla") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla");
      }
      if (normalizedContractId === "55.2-intransitive-tla-ti-a-causative" && normalizedTemplateId === "intransitive-tla-ti-a") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a");
      }
      if (normalizedContractId === "55.2-intransitive-tla-ti-lia-applicative" && normalizedTemplateId === "intransitive-tla-ti-lia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-lia");
      }
      if (normalizedContractId === "55.3-intransitive-o-a-applicative-huia" && normalizedTemplateId === "o-a") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a");
      }
      if (normalizedContractId === "55.3-intransitive-o-a-applicative-huia" && normalizedTemplateId === "huia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-huia");
      }
      if (normalizedContractId === "55.3-o-a-il-huia-al-huia-applicative-note" && normalizedTemplateId === "o-a-i-l-huia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-i-l-huia");
      }
      if (normalizedContractId === "55.3-o-a-il-huia-al-huia-applicative-note" && normalizedTemplateId === "o-a-a-l-huia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-a-l-huia");
      }
      if (normalizedContractId === "55.4-adverbial-huia" && normalizedTemplateId === "adverbial-huia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia");
      }
      if (normalizedContractId === "55.5-relational-compound-o-a-huia" && normalizedTemplateId === "relational-o-a") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-o-a");
      }
      if (normalizedContractId === "55.5-relational-compound-o-a-huia" && normalizedTemplateId === "relational-huia") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-huia");
      }
      if (normalizedContractId === "55.6-i-hui-a-hui-to-o-a" && normalizedTemplateId === "i-hui") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-i-hui");
      }
      if (normalizedContractId === "55.6-i-hui-a-hui-to-o-a" && normalizedTemplateId === "a-hui") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-a-hui");
      }
      if (normalizedContractId === "55.6-i-hui-a-hui-to-o-a" && normalizedTemplateId === "o-a") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a");
      }
      if (normalizedContractId === "55.7-transitive-i-a" && normalizedTemplateId === "i-a") {
        return getNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a");
      }
      return null;
    }
    function getNawatDenominalAndrewsExecutableRuleContractsForContract(contractId = "") {
      const rules = [];
      ["ti", "hui", "hui-lia", "ya", "ti-ya", "hui-ya", "ya-lia", "a", "hua", "included-possessor-ti", "ti-lia", "ti-a", "t-ia", "tia", "tla", "tla-ti-lia", "intransitive-tla", "intransitive-tla-ti-a", "intransitive-tla-ti-lia", "i-hui", "a-hui", "o-a", "huia", "o-a-i-l-huia", "o-a-a-l-huia", "adverbial-huia", "relational-o-a", "relational-huia", "i-a"].forEach(routeTemplateId => {
        const rule = getNawatDenominalAndrewsExecutableRuleContractForRoute(contractId, routeTemplateId);
        if (rule) {
          rules.push(rule);
        }
      });
      return rules;
    }
    function summarizeNawatDenominalAndrewsExecutableRuleContract(rule = null) {
      if (!rule || typeof rule !== "object") {
        return null;
      }
      return {
        version: rule.version || 1,
        id: rule.id || "",
        contractId: rule.contractId || "",
        routeTemplateId: rule.routeTemplateId || "",
        range: rule.range || "",
        authority: Array.isArray(rule.authority) ? Array.from(rule.authority) : [],
        input: rule.input && typeof rule.input === "object" ? {
          ...rule.input
        } : null,
        operation: rule.operation && typeof rule.operation === "object" ? {
          ...rule.operation
        } : null,
        output: rule.output && typeof rule.output === "object" ? {
          ...rule.output,
          stemClass: Array.isArray(rule.output.stemClass) ? Array.from(rule.output.stemClass) : []
        } : null
      };
    }
    function executeNawatDenominalAndrewsExecutableRuleContract(id = "", ctx = {}) {
      const rule = getNawatDenominalAndrewsExecutableRuleContract(id);
      if (!rule || typeof rule.generate !== "function") {
        return null;
      }
      return rule.generate(ctx);
    }
    function classifyNawatDenominalIAStemSourceFinal(template = null, sourceStemFinalLetter = "") {
      const finalLetter = String(sourceStemFinalLetter || "").trim();
      const majoritySourceFinalLetters = Array.isArray(template?.majoritySourceFinalLetters) ? Array.from(template.majoritySourceFinalLetters) : [];
      const attestedSourceFinalLetters = Array.isArray(template?.attestedSourceFinalLetters) ? Array.from(template.attestedSourceFinalLetters) : majoritySourceFinalLetters;
      const attestedMinoritySourceFinalLetters = Array.isArray(template?.attestedMinoritySourceFinalLetters) ? Array.from(template.attestedMinoritySourceFinalLetters) : [];
      const classicalSourceFinalPattern = template?.classicalSourceFinalPattern && typeof template.classicalSourceFinalPattern === "object" ? template.classicalSourceFinalPattern : null;
      let status = finalLetter ? "unlisted" : "";
      let label = finalLetter ? `final no listada por Andrews 55.7: ${finalLetter}` : "";
      if (finalLetter && majoritySourceFinalLetters.includes(finalLetter)) {
        status = "majority";
        label = `final mayoritaria Andrews 55.7: ${finalLetter}`;
      } else if (finalLetter && attestedMinoritySourceFinalLetters.includes(finalLetter)) {
        status = "attested-minority";
        label = `final atestiguada Andrews 55.7: ${finalLetter}`;
      } else if (finalLetter === "w" && template?.wFinalSourceMayBeHuia === true) {
        status = "w-final-huia-ambiguous";
        label = "final w: puede ser huia";
      }
      return {
        status,
        label,
        finalLetter,
        majoritySourceFinalLetters,
        attestedSourceFinalLetters,
        attestedMinoritySourceFinalLetters,
        classicalSourceFinalPattern,
        boundaries: {
          noFixtureEvidence: true,
          classicalRuleSpellingsConvertedToNawat: true,
          sourceFinalPatternIsDiagnostic: true,
          doesNotRejectRouteTarget: true
        }
      };
    }
    function normalizeNawatDenominalAndrewsRouteSourceEvidence(sourceEvidence = null) {
      const evidence = sourceEvidence && typeof sourceEvidence === "object" ? sourceEvidence : {};
      const sourceState = String(evidence.sourceState || "").trim();
      const sourceCategory = String(evidence.sourceCategory || "").trim();
      const hasCategory = pattern => sourceCategory.includes(pattern);
      const temporalMatrix = String(evidence.timeSegmentMatrix || "").trim();
      const temporalNumeralEmbed = String(evidence.numeralEmbed || "").trim();
      const temporalCompoundSourceCategory = sourceCategory === "compound-temporal-nounstem" || sourceCategory === "compound-temporal-nnc";
      return {
        possessiveState: evidence.possessiveState === true || sourceState === "possessive" || sourceState === "posesivo",
        tiSource: evidence.tiSource === true || sourceCategory === "inceptive-stative-ti-source" || sourceCategory === "possession-ti-verbstem-source" || sourceCategory === "intransitive-ti-source",
        huiSource: evidence.huiSource === true || sourceCategory === "inceptive-stative-hui-source" || sourceCategory === "intransitive-hui-source",
        yaSource: evidence.yaSource === true || sourceCategory === "inceptive-stative-ya-source" || sourceCategory === "intransitive-ya-source",
        deverbalYoSource: evidence.deverbalYoSource === true || evidence.deverbalYuSource === true || sourceCategory === "deverbal-yo-nounstem" || sourceCategory === "deverbal-yu-nounstem" || sourceCategory === "deverbal-yu-nounstem-source",
        temporalCompoundSource: (evidence.temporalCompoundSource === true || temporalCompoundSourceCategory) && Boolean(temporalMatrix) && Boolean(temporalNumeralEmbed),
        adverbialSource: evidence.adverbialSource === true || hasCategory("adverbial"),
        relationalCompoundSource: evidence.relationalCompoundSource === true || hasCategory("relational"),
        tlaCausativeSource: evidence.tlaCausativeSource === true || sourceCategory === "causative-tla" || sourceCategory === "causative-tla-verbstem-source",
        intransitiveTlaLexicalSource: evidence.intransitiveTlaLexicalSource === true || evidence.intransitiveTlaNounstemSource === true || sourceCategory === "intransitive-tla-lexical-source" || sourceCategory === "intransitive-tla-nounstem-source",
        tlaIntransitiveSource: evidence.tlaIntransitiveSource === true || sourceCategory === "intransitive-tla" || sourceCategory === "intransitive-tla-verbstem-source",
        intransitiveOaSource: evidence.intransitiveOaSource === true || sourceCategory === "intransitive-o-a" || sourceCategory === "intransitive-o-a-verbstem-source",
        iHuiOrAHuiSource: evidence.iHuiOrAHuiSource === true || sourceCategory === "i-hui-a-hui-source"
      };
    }
    function buildNawatDenominalAndrewsRouteSourceRequirement(template = null, {
      sourceEvidence = null
    } = {}) {
      const evidence = normalizeNawatDenominalAndrewsRouteSourceEvidence(sourceEvidence);
      const requirements = [];
      const addRequirement = (condition, id, label, satisfied) => {
        if (!condition) {
          return;
        }
        requirements.push({
          id,
          label,
          satisfied: satisfied === true
        });
      };
      addRequirement(template?.requiresPossessiveSource === true, "possessive-state-nnc-predicate", "predicate of a possessive-state NNC", evidence.possessiveState);
      addRequirement(template?.requiresTiSource === true, "intransitive-ti-verbstem-source", "intransitive ti verbstem source", evidence.tiSource);
      addRequirement(template?.requiresHuiSource === true, "intransitive-hui-verbstem-source", "intransitive hui verbstem source", evidence.huiSource);
      addRequirement(template?.requiresYaSource === true, "intransitive-ya-verbstem-source", "intransitive ya verbstem source", evidence.yaSource);
      addRequirement(template?.requiresDeverbalYoSource === true, "deverbal-yu-nounstem", "deverbal (-yo)-tl nounstem source realized with Nawat/Pipil yu", evidence.deverbalYoSource);
      addRequirement(template?.requiresTemporalCompoundSource === true, "temporal-compound-nounstem", "compound nounstem with a time-segment matrix and numeral embed", evidence.temporalCompoundSource);
      addRequirement(template?.requiresAdverbialSource === true, "adverbial-nounstem", "adverbial nounstem", evidence.adverbialSource);
      addRequirement(template?.requiresRelationalCompoundSource === true, "relational-compound-or-possessive-relational-predicate", "compound nounstem with relational matrix or possessive-state relational predicate", evidence.relationalCompoundSource);
      addRequirement(template?.requiresTlaCausativeSource === true, "tla-causative-source", "causative tla stem source", evidence.tlaCausativeSource);
      addRequirement(template?.requiresIntransitiveTlaLexicalSource === true, "intransitive-tla-lexical-source", "confirmed source for the very limited intransitive tla note", evidence.intransitiveTlaLexicalSource);
      addRequirement(template?.requiresTlaIntransitiveSource === true, "intransitive-tla-verbstem-source", "intransitive tla verbstem source", evidence.tlaIntransitiveSource);
      addRequirement(template?.requiresIntransitiveOaSource === true, "intransitive-o-a-verbstem-source", "intransitive o-a verbstem source", evidence.intransitiveOaSource);
      addRequirement(template?.requiresIHuiOrAHuiSource === true, "i-hui-a-hui-source", "i-hui or a-hui intransitive source stem", evidence.iHuiOrAHuiSource);
      const unsatisfied = requirements.filter(requirement => requirement.satisfied !== true);
      return {
        required: requirements.length > 0,
        satisfied: unsatisfied.length === 0,
        requirements,
        unsatisfied,
        validationStatus: requirements.length ? unsatisfied.length ? "source-evidence-required" : "source-evidence-satisfied" : "not-required",
        finiteGenerationRequiresSourceEvidence: unsatisfied.length > 0
      };
    }
    function removeNawatDenominalAndrewsSourceFinalSuffix(value = "", suffix = "") {
      const source = String(value || "").trim();
      const ending = String(suffix || "").trim();
      if (!source || !ending || !source.endsWith(ending)) {
        return source;
      }
      return source.slice(0, -ending.length);
    }
    function buildNawatDenominalAndrewsRouteSourceEvidenceFromContractRoute(route = null) {
      const contractId = String(route?.contractId || "").trim();
      const routeTemplateId = String(route?.routeTemplateId || "").trim();
      const sourceBaseStem = String(route?.sourceStem || "").trim();
      const sourceVerbStem = String(route?.targetVerbStem || "").trim();
      if (contractId === "54.2.1-inceptive-stative-ti" && routeTemplateId === "ti") {
        return {
          tiSource: true,
          sourceCategory: "inceptive-stative-ti-source",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsTiYaDeverbal: true,
            sourceEvidenceSupportsTiLiaCausative: true,
            sourceEvidenceSupportsTiACausative: true,
            sourceEvidenceSupportsTIaApplicative: true
          }
        };
      }
      if (contractId === "54.2.2-inceptive-stative-hui" && routeTemplateId === "hui") {
        return {
          huiSource: true,
          sourceCategory: "inceptive-stative-hui-source",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsHuiYaDeverbal: true,
            sourceEvidenceSupportsHuiLiaCausative: true
          }
        };
      }
      if (contractId === "54.2.3-inceptive-stative-ya" && routeTemplateId === "ya") {
        return {
          yaSource: true,
          sourceCategory: "inceptive-stative-ya-source",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsYaLiaCausative: true,
            sourceYaDeletedBeforeLia: true
          }
        };
      }
      if (contractId === "54.2.3-ti-ya-deverbal" && routeTemplateId === "ti-ya") {
        return {
          yaSource: true,
          tiYaSource: true,
          sourceCategory: "deverbal-ti-ya-source",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceNounStem: sourceBaseStem,
          sourceBaseStem: removeNawatDenominalAndrewsSourceFinalSuffix(sourceVerbStem, "ya"),
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsYaLiaCausative: true,
            sourceYaDeletedBeforeLia: true,
            sourceTiYaDerivedFromGeneratedTi: true
          }
        };
      }
      if (contractId === "54.2.3-hui-ya-deverbal" && routeTemplateId === "hui-ya") {
        return {
          yaSource: true,
          huiYaSource: true,
          sourceCategory: "deverbal-hui-ya-source",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceNounStem: sourceBaseStem,
          sourceBaseStem: removeNawatDenominalAndrewsSourceFinalSuffix(sourceVerbStem, "ya"),
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsYaLiaCausative: true,
            sourceYaDeletedBeforeLia: true,
            sourceHuiYaDerivedFromGeneratedHui: true
          }
        };
      }
      if (contractId === "54.4-possession-ti" && routeTemplateId === "possession-ti") {
        return {
          tiSource: true,
          possessionTiVerbstemSource: true,
          sourceCategory: "possession-ti-verbstem-source",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsTiLiaCausative: true,
            sourceEvidenceSupportsTiACausative: true,
            sourceEvidenceSupportsTIaApplicative: true,
            possessionTiSourceFocusesNounstem: true,
            possessionTiDoesNotFormDeverbalYa: true
          }
        };
      }
      if (contractId === "55.2-causative-tla" && routeTemplateId === "tla") {
        return {
          tlaCausativeSource: true,
          sourceCategory: "causative-tla",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsTlaTiLiaApplicative: true,
            sourceTlaReplacedByTiBeforeLia: true
          }
        };
      }
      if (contractId === "55.2-intransitive-tla" && routeTemplateId === "intransitive-tla") {
        return {
          tlaIntransitiveSource: true,
          sourceCategory: "intransitive-tla",
          sourceState: "derived",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsIntransitiveTlaTiACausative: true,
            sourceEvidenceSupportsIntransitiveTlaTiLiaApplicative: true,
            sourceTlaReplacedByTiBeforeA: true,
            sourceTlaReplacedByTiBeforeLia: true
          }
        };
      }
      if (contractId === "55.3-intransitive-o-a-applicative-huia" && routeTemplateId === "o-a") {
        return {
          intransitiveOaSource: true,
          sourceCategory: "intransitive-o-a",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsOaIlHuiaApplicative: true,
            sourceOaBypassesTransitiveOaStep: true,
            hypotheticalIHuiAHuiSource: true
          }
        };
      }
      if (contractId === "55.6-i-hui-a-hui-to-o-a" && (routeTemplateId === "i-hui" || routeTemplateId === "a-hui")) {
        return {
          iHuiOrAHuiSource: true,
          sourceCategory: "i-hui-a-hui-source",
          sourceContractId: contractId,
          sourceRouteTemplateId: routeTemplateId,
          sourceBaseStem,
          sourceVerbStem,
          boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromAndrewsContractRoute: true,
            classicalRuleSpellingsConvertedToNawat: true
          }
        };
      }
      return null;
    }
    function getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput(nncOutput = null) {
      if (!nncOutput || typeof nncOutput !== "object") {
        return "";
      }
      return normalizeNawatDenominalContractSourceStem(getPrimaryNawatRouteSurfaceForm(nncOutput));
    }
    function buildNawatDenominalAndrewsRouteSourceEvidenceFromOrdinaryNncOutput(nncOutput = null) {
      if (!nncOutput || typeof nncOutput !== "object" || nncOutput.supported !== true) {
        return null;
      }
      const nncBasic = nncOutput.nncBasic && typeof nncOutput.nncBasic === "object" ? nncOutput.nncBasic : {};
      const categoryProfile = nncBasic.categoryProfile && typeof nncBasic.categoryProfile === "object" ? nncBasic.categoryProfile : {};
      const formulaSlots = nncBasic.formulaSlots || nncOutput.clauseFrame?.formulaSlots || null;
      const possessiveState = categoryProfile.possessiveState && typeof categoryProfile.possessiveState === "object" ? categoryProfile.possessiveState : {};
      const predicateState = String(nncOutput.state || formulaSlots?.predicate?.state || categoryProfile.predicateState?.value || "").trim();
      const possessorPrefix = String(nncOutput.possessor?.prefix || possessiveState.possessorPrefix || "").trim();
      const sourceSurface = getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput(nncOutput);
      const sourcePredicateStem = String(formulaSlots?.predicate?.stem || nncBasic.predicate?.stem || nncOutput.stem || "").trim();
      const isPossessive = possessiveState.isPossessive === true || predicateState === "possessive";
      const markingAvailable = possessiveState.markingAvailable === true || isPossessive && Boolean(possessorPrefix) && nncOutput.supported === true;
      if (!sourceSurface || !isPossessive || !markingAvailable) {
        return null;
      }
      return {
        possessiveState: true,
        sourceState: "possessive",
        sourceCategory: "possessive-state-nnc-predicate",
        sourceSurface,
        sourceBaseStem: sourceSurface,
        sourcePredicateStem,
        sourcePossessorPrefix: possessorPrefix,
        sourceFormulaEcho: nncBasic.formulaEcho || nncOutput.clauseFrame?.formulaEcho || "",
        sourceOutputKind: nncOutput.outputKind || nncOutput.clauseKind || "",
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          possessorIncludedInsideVerbstem: true,
          possessiveCaseNotTransformedToObjective: true,
          usesNawatSourceSurface: true
        }
      };
    }
    function previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput(nncOutput = null) {
      const sourceEvidence = buildNawatDenominalAndrewsRouteSourceEvidenceFromOrdinaryNncOutput(nncOutput);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "54.3-included-possessor-ti",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.3",
          role: "included-possessor-denominal-route"
        },
        outputKind: "denominal-andrews-included-possessor-route-preview",
        source: "ordinary-nnc-output",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          possessorIncludedInsideVerbstem: true,
          possessiveCaseNotTransformedToObjective: true
        }
      };
    }
    function buildNawatDenominalAndrewsInceptiveTiSourceEvidenceFromOrdinaryNncOutput(nncOutput = null) {
      if (!nncOutput || typeof nncOutput !== "object" || nncOutput.supported !== true) {
        return null;
      }
      const nncBasic = nncOutput.nncBasic && typeof nncOutput.nncBasic === "object" ? nncOutput.nncBasic : {};
      const categoryProfile = nncBasic.categoryProfile && typeof nncBasic.categoryProfile === "object" ? nncBasic.categoryProfile : {};
      const formulaSlots = nncBasic.formulaSlots || nncOutput.clauseFrame?.formulaSlots || null;
      const predicateState = String(nncOutput.state || formulaSlots?.predicate?.state || categoryProfile.predicateState?.value || "").trim();
      if (predicateState !== "absolutive") {
        return null;
      }
      const sourcePredicateStem = normalizeNawatDenominalContractSourceStem(formulaSlots?.predicate?.stem || nncBasic.predicate?.stem || nncOutput.stem || "");
      const sourceSurface = getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput(nncOutput);
      if (!sourcePredicateStem || !sourceSurface) {
        return null;
      }
      return {
        inceptiveTiSource: true,
        sourceState: "absolutive",
        sourceCategory: "absolutive-state-nnc-predicate",
        sourceSurface,
        sourceBaseStem: sourcePredicateStem,
        sourcePredicateStem,
        sourceFormulaEcho: nncBasic.formulaEcho || nncOutput.clauseFrame?.formulaEcho || "",
        sourceOutputKind: nncOutput.outputKind || nncOutput.clauseKind || "",
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          inceptiveTiSourceRequiresAbsolutivePredicate: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput(nncOutput = null) {
      const sourceEvidence = buildNawatDenominalAndrewsInceptiveTiSourceEvidenceFromOrdinaryNncOutput(nncOutput);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "54.2.1-inceptive-stative-ti",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2.1",
          role: "inceptive-stative-ti-denominal-route"
        },
        outputKind: "denominal-andrews-inceptive-ti-route-preview",
        source: "ordinary-nnc-output",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          inceptiveTiSourceRequiresAbsolutivePredicate: true
        }
      };
    }
    function buildNawatDenominalAndrewsInceptiveHuiSourceEvidenceFromOrdinaryNncOutput(nncOutput = null) {
      if (!nncOutput || typeof nncOutput !== "object" || nncOutput.supported !== true) {
        return null;
      }
      const nncBasic = nncOutput.nncBasic && typeof nncOutput.nncBasic === "object" ? nncOutput.nncBasic : {};
      const categoryProfile = nncBasic.categoryProfile && typeof nncBasic.categoryProfile === "object" ? nncBasic.categoryProfile : {};
      const formulaSlots = nncBasic.formulaSlots || nncOutput.clauseFrame?.formulaSlots || null;
      const predicateState = String(nncOutput.state || formulaSlots?.predicate?.state || categoryProfile.predicateState?.value || "").trim();
      if (predicateState !== "absolutive") {
        return null;
      }
      const sourcePredicateStem = normalizeNawatDenominalContractSourceStem(formulaSlots?.predicate?.stem || nncBasic.predicate?.stem || nncOutput.stem || "");
      const sourceSurface = getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput(nncOutput);
      if (!sourcePredicateStem || !sourceSurface) {
        return null;
      }
      return {
        inceptiveHuiSource: true,
        sourceState: "absolutive",
        sourceCategory: "absolutive-state-nnc-predicate",
        sourceSurface,
        sourceBaseStem: sourcePredicateStem,
        sourcePredicateStem,
        sourceFormulaEcho: nncBasic.formulaEcho || nncOutput.clauseFrame?.formulaEcho || "",
        sourceOutputKind: nncOutput.outputKind || nncOutput.clauseKind || "",
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          inceptiveHuiSourceRequiresAbsolutivePredicate: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput(nncOutput = null) {
      const sourceEvidence = buildNawatDenominalAndrewsInceptiveHuiSourceEvidenceFromOrdinaryNncOutput(nncOutput);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "54.2.2-inceptive-stative-hui",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2.2",
          role: "inceptive-stative-hui-denominal-route"
        },
        outputKind: "denominal-andrews-inceptive-hui-route-preview",
        source: "ordinary-nnc-output",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          inceptiveHuiSourceRequiresAbsolutivePredicate: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function buildNawatDenominalAndrewsRootPlusYaSourceEvidenceFromOrdinaryNncOutput(nncOutput = null) {
      if (!nncOutput || typeof nncOutput !== "object" || nncOutput.supported !== true) {
        return null;
      }
      const nncBasic = nncOutput.nncBasic && typeof nncOutput.nncBasic === "object" ? nncOutput.nncBasic : {};
      const categoryProfile = nncBasic.categoryProfile && typeof nncBasic.categoryProfile === "object" ? nncBasic.categoryProfile : {};
      const formulaSlots = nncBasic.formulaSlots || nncOutput.clauseFrame?.formulaSlots || null;
      const predicateState = String(nncOutput.state || formulaSlots?.predicate?.state || categoryProfile.predicateState?.value || "").trim();
      if (predicateState !== "absolutive") {
        return null;
      }
      const sourcePredicateStem = normalizeNawatDenominalContractSourceStem(formulaSlots?.predicate?.stem || nncBasic.predicate?.stem || nncOutput.stem || "");
      const sourceSurface = getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput(nncOutput);
      if (!sourcePredicateStem || !sourceSurface) {
        return null;
      }
      return {
        rootPlusYaSource: true,
        sourceState: "absolutive",
        sourceCategory: "nounstem-as-root",
        sourceSurface,
        sourceBaseStem: sourcePredicateStem,
        sourcePredicateStem,
        sourceFormulaEcho: nncBasic.formulaEcho || nncOutput.clauseFrame?.formulaEcho || "",
        sourceOutputKind: nncOutput.outputKind || nncOutput.clauseKind || "",
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          sourceNounstemDowngradedToRootRank: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput(nncOutput = null) {
      const sourceEvidence = buildNawatDenominalAndrewsRootPlusYaSourceEvidenceFromOrdinaryNncOutput(nncOutput);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "54.2.3-inceptive-stative-ya",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2.3",
          role: "root-plus-ya-denominal-route"
        },
        outputKind: "denominal-andrews-root-plus-ya-route-preview",
        source: "ordinary-nnc-output",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          sourceNounstemDowngradedToRootRank: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function buildNawatDenominalAndrewsInceptiveASourceEvidenceFromOrdinaryNncOutput(nncOutput = null) {
      if (!nncOutput || typeof nncOutput !== "object" || nncOutput.supported !== true) {
        return null;
      }
      const nncBasic = nncOutput.nncBasic && typeof nncOutput.nncBasic === "object" ? nncOutput.nncBasic : {};
      const categoryProfile = nncBasic.categoryProfile && typeof nncBasic.categoryProfile === "object" ? nncBasic.categoryProfile : {};
      const formulaSlots = nncBasic.formulaSlots || nncOutput.clauseFrame?.formulaSlots || null;
      const predicateState = String(nncOutput.state || formulaSlots?.predicate?.state || categoryProfile.predicateState?.value || "").trim();
      if (predicateState !== "absolutive") {
        return null;
      }
      const sourcePredicateStem = normalizeNawatDenominalContractSourceStem(formulaSlots?.predicate?.stem || nncBasic.predicate?.stem || nncOutput.stem || "");
      const sourceSurface = getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput(nncOutput);
      if (!sourcePredicateStem || !sourceSurface) {
        return null;
      }
      return {
        inceptiveASource: true,
        sourceState: "absolutive",
        sourceCategory: "absolutive-nounstem",
        sourceSurface,
        sourceBaseStem: sourcePredicateStem,
        sourcePredicateStem,
        sourceFormulaEcho: nncBasic.formulaEcho || nncOutput.clauseFrame?.formulaEcho || "",
        sourceOutputKind: nncOutput.outputKind || nncOutput.clauseKind || "",
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          inceptiveASourceRequiresAbsolutiveNounstem: true,
          limitedUse: true,
          notCausativeA: true,
          targetLooksTransitiveButIsIntransitive: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput(nncOutput = null) {
      const sourceEvidence = buildNawatDenominalAndrewsInceptiveASourceEvidenceFromOrdinaryNncOutput(nncOutput);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "54.2.4-inceptive-stative-a",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2.4",
          role: "limited-inceptive-stative-a-denominal-route"
        },
        outputKind: "denominal-andrews-inceptive-a-route-preview",
        source: "ordinary-nnc-output",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          inceptiveASourceRequiresAbsolutiveNounstem: true,
          limitedUse: true,
          notCausativeA: true,
          targetLooksTransitiveButIsIntransitive: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function normalizeNawatDenominalAndrewsHuaCharacteristicPropertySourceStem(surface = "") {
      const normalizedSurface = normalizeNawatDenominalContractSourceStem(surface);
      if (!normalizedSurface || !normalizedSurface.endsWith("yut")) {
        return "";
      }
      return normalizedSurface.slice(0, -1);
    }
    function buildNawatDenominalAndrewsHuaSourceEvidenceRecordsFromCharacteristicPropertyOutput(output = null) {
      if (!output || typeof output !== "object" || output.error || output.supported === false) {
        return [];
      }
      const nominalizationProfile = output.nominalizationProfile && typeof output.nominalizationProfile === "object" ? output.nominalizationProfile : {};
      const nominalKind = String(nominalizationProfile.nominalKind || "").trim();
      const nominalizationKind = String(nominalizationProfile.role?.nominalizationKind || "").trim();
      const predicateState = String(nominalizationProfile.predicateState?.value || output.nuclearClauseShell?.slots?.predicate?.state || "").trim();
      if (nominalKind !== "calificativo-instrumentivo" || nominalizationKind !== "quality-result" || predicateState !== "absolutive") {
        return [];
      }
      const sourceSurfaces = getStateResultSurfaceForms(output);
      if (hasStateResultFrame(output) && !sourceSurfaces.length) {
        return [];
      }
      const sourceFormulaEcho = String(output.nuclearClauseShell?.formulaEcho || "").trim();
      const sourceOutputKind = String(nominalizationProfile.outputKind || output.outputKind || output.generationRoute || "").trim();
      const records = [];
      sourceSurfaces.forEach(sourceSurface => {
        const sourceBaseStem = normalizeNawatDenominalAndrewsHuaCharacteristicPropertySourceStem(sourceSurface);
        if (!sourceBaseStem || records.some(record => record.sourceBaseStem === sourceBaseStem)) {
          return;
        }
        const sourcePredicateStem = sourceBaseStem.endsWith("yu") ? sourceBaseStem.slice(0, -2) : sourceBaseStem;
        records.push({
          deverbalYoSource: true,
          deverbalYuSource: true,
          huaSource: true,
          sourceState: "absolutive",
          sourceCategory: "deverbal-yu-nounstem",
          sourceSurface,
          sourceBaseStem,
          sourcePredicateStem,
          sourceEmbeddedStem: sourcePredicateStem,
          sourceFormulaEcho,
          sourceOutputKind,
          sourceNominalKind: nominalKind,
          sourceNominalizationKind: nominalizationKind,
          boundaries: {
            noFixtureEvidence: true,
            doesNotCreateLexicalEvidence: true,
            sourceEvidenceFromGeneratedOutput: true,
            sourceEvidenceFromGeneratedCalificativoInstrumentivo: true,
            sourceEvidenceFromGeneratedCharacteristicPropertyNnc: true,
            deverbalYuMatrixFromCharacteristicProperty: true,
            absolutiveConnectorTStrippedForSourceStem: true,
            sourceNounstemEndsInYu: true,
            deverbalYuSourceRequiredByAndrews5425Hua: true,
            notOaFormation: true,
            noClassicalSurfaceImport: true,
            classicalRuleSpellingsConvertedToNawat: true
          }
        });
      });
      return records;
    }
    function buildNawatDenominalAndrewsHuaSourceEvidenceFromCharacteristicPropertyOutput(output = null) {
      return buildNawatDenominalAndrewsHuaSourceEvidenceRecordsFromCharacteristicPropertyOutput(output)[0] || null;
    }
    function previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput(output = null) {
      const sourceEvidences = buildNawatDenominalAndrewsHuaSourceEvidenceRecordsFromCharacteristicPropertyOutput(output);
      if (!sourceEvidences.length) {
        return null;
      }
      const routePreviews = sourceEvidences.map(sourceEvidence => generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "54.2.5-inceptive-stative-hua",
        sourceEvidence
      }));
      const routes = routePreviews.flatMap(preview => Array.isArray(preview?.routes) ? preview.routes : []);
      const routePreview = {
        version: 1,
        outputKind: "denominal-andrews-hua-route-preview-set",
        contractId: "54.2.5-inceptive-stative-hua",
        routes,
        routeTargetCount: routes.length,
        finiteRouteRequestCount: routes.filter(route => route?.finiteGenerationContractAvailable === true).length,
        finiteRouteObjectPrefixRequiredCount: routes.filter(route => route?.finiteGenerationRequiresObjectPrefix === true).length
      };
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2.5",
          role: "deverbal-yu-hua-denominal-route"
        },
        outputKind: "denominal-andrews-hua-route-preview",
        source: "generated-calificativo-instrumentivo-output",
        sourceStem: sourceEvidences[0]?.sourceBaseStem || "",
        sourceEvidence: sourceEvidences[0] || null,
        sourceEvidences,
        routePreview,
        routePreviews,
        candidateRouteCount: routes.length,
        finiteRouteRequestCount: routePreview.finiteRouteRequestCount,
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromGeneratedOutput: true,
          sourceEvidenceFromGeneratedCalificativoInstrumentivo: true,
          sourceEvidenceFromGeneratedCharacteristicPropertyNnc: true,
          sourceNounstemEndsInYu: true,
          absolutiveConnectorTStrippedForSourceStem: true,
          deverbalYuSourceRequiredByAndrews5425Hua: true,
          notOaFormation: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function buildNawatDenominalAndrewsPossessionTiSourceEvidenceFromOrdinaryNncOutput(nncOutput = null) {
      if (!nncOutput || typeof nncOutput !== "object" || nncOutput.supported !== true) {
        return null;
      }
      const nncBasic = nncOutput.nncBasic && typeof nncOutput.nncBasic === "object" ? nncOutput.nncBasic : {};
      const formulaSlots = nncBasic.formulaSlots || nncOutput.clauseFrame?.formulaSlots || null;
      const sourcePredicateStem = normalizeNawatDenominalContractSourceStem(formulaSlots?.predicate?.stem || nncBasic.predicate?.stem || nncOutput.stem || "");
      if (!sourcePredicateStem) {
        return null;
      }
      const sourceSurface = getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput(nncOutput);
      if (hasStateResultFrame(nncOutput) && !sourceSurface) {
        return null;
      }
      return {
        possessionTiSource: true,
        sourceState: String(nncOutput.state || formulaSlots?.predicate?.state || "").trim(),
        sourceCategory: "ordinary-nnc-predicate-nounstem",
        sourceSurface,
        sourceBaseStem: sourcePredicateStem,
        sourcePredicateStem,
        sourceFormulaEcho: nncBasic.formulaEcho || nncOutput.clauseFrame?.formulaEcho || "",
        sourceOutputKind: nncOutput.outputKind || nncOutput.clauseKind || "",
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          possessionTiSourceFocusesNounstem: true,
          possessionTiDoesNotFormDeverbalYa: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput(nncOutput = null) {
      const sourceEvidence = buildNawatDenominalAndrewsPossessionTiSourceEvidenceFromOrdinaryNncOutput(nncOutput);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "54.4-possession-ti",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.4",
          role: "possession-ti-denominal-route"
        },
        outputKind: "denominal-andrews-possession-ti-route-preview",
        source: "ordinary-nnc-output",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromGeneratedOrdinaryNnc: true,
          sourceNounstemFromPredicate: true,
          possessionTiSourceFocusesNounstem: true,
          possessionTiDoesNotFormDeverbalYa: true
        }
      };
    }
    function resolveNawatDenominalAndrewsExplicitSourceSurface(source = null, {
      sourceStem = "",
      sourceSurface = ""
    } = {}) {
      const sourceRecord = source && typeof source === "object" ? source : null;
      const framedSurface = getStateResultSurfaceForms(sourceRecord)[0] || "";
      if (framedSurface) {
        return normalizeNawatDenominalContractSourceStem(framedSurface);
      }
      if (hasStateResultFrame(sourceRecord)) {
        return "";
      }
      return normalizeNawatDenominalContractSourceStem(sourceSurface || sourceRecord?.surface || sourceStem || sourceRecord?.result || "");
    }
    function buildNawatDenominalAndrewsTemporalTiaSourceEvidence(source = {}) {
      const sourceRecord = source && typeof source === "object" ? source : {};
      const {
        sourceStem = "",
        sourceSurface = "",
        sourceState = "absolutive",
        sourceKind = "compound-temporal-nounstem",
        timeSegmentMatrix = "",
        numeralEmbed = "",
        sourceFormulaEcho = "",
        sourceNote = ""
      } = sourceRecord;
      const sourceBaseStem = resolveNawatDenominalAndrewsExplicitSourceSurface(sourceRecord, {
        sourceStem,
        sourceSurface
      });
      if (!sourceBaseStem) {
        return null;
      }
      const normalizedTimeSegmentMatrix = String(timeSegmentMatrix || "").trim();
      const normalizedNumeralEmbed = String(numeralEmbed || "").trim();
      if (!normalizedTimeSegmentMatrix || !normalizedNumeralEmbed) {
        return null;
      }
      const normalizedSourceSurface = sourceBaseStem;
      const requestedSourceKind = String(sourceKind || "compound-temporal-nounstem").trim();
      const normalizedSourceKind = requestedSourceKind === "compound-temporal-nnc" ? requestedSourceKind : "compound-temporal-nounstem";
      return {
        temporalCompoundSource: true,
        sourceState: String(sourceState || "absolutive").trim(),
        sourceCategory: normalizedSourceKind,
        sourceSurface: normalizedSourceSurface,
        sourceBaseStem,
        timeSegmentMatrix: normalizedTimeSegmentMatrix,
        numeralEmbed: normalizedNumeralEmbed,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        sourceNote: String(sourceNote || "").trim(),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromExplicitSourceClassification: true,
          sourceEvidenceSupportsTemporalTiaIntransitive: true,
          sourceMustBeConfirmedTemporalCompoundNounstem: true,
          temporalMatrixMustBeTimeSegment: true,
          temporalEmbedMustBeNumeralNounstem: true,
          doesNotTreatLocativoTemporalNominalAsAutomaticEvidence: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsTemporalTiaRouteFromSource(source = {}) {
      const sourceEvidence = buildNawatDenominalAndrewsTemporalTiaSourceEvidence(source);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "55.1-temporal-tia",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "55.1",
          role: "temporal-tia-denominal-route"
        },
        outputKind: "denominal-andrews-temporal-tia-route-preview",
        source: "explicit-temporal-compound-nounstem",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        finiteRouteObjectPrefixRequiredCount: Number(routePreview?.finiteRouteObjectPrefixRequiredCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromExplicitSourceClassification: true,
          sourceMustBeConfirmedTemporalCompoundNounstem: true,
          doesNotTreatLocativoTemporalNominalAsAutomaticEvidence: true
        }
      };
    }
    function buildNawatDenominalAndrewsAdverbialHuiaSourceEvidence(source = {}) {
      const sourceRecord = source && typeof source === "object" ? source : {};
      const {
        sourceStem = "",
        sourceSurface = "",
        sourceFormulaEcho = "",
        sourceNote = ""
      } = sourceRecord;
      const sourceBaseStem = resolveNawatDenominalAndrewsExplicitSourceSurface(sourceRecord, {
        sourceStem,
        sourceSurface
      });
      if (!sourceBaseStem) {
        return null;
      }
      const normalizedSourceSurface = sourceBaseStem;
      return {
        adverbialSource: true,
        sourceState: "adverbialized",
        sourceCategory: "adverbial-nounstem",
        sourceSurface: normalizedSourceSurface,
        sourceBaseStem,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        sourceNote: String(sourceNote || "").trim(),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromExplicitSourceClassification: true,
          sourceEvidenceSupportsAdverbialHuiaApplicative: true,
          sourceMustBeConfirmedAdverbialNounstem: true,
          doesNotTreatConfiguredAdverbioAsAutomaticEvidence: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsAdverbialHuiaRouteFromSource(source = {}) {
      const sourceEvidence = buildNawatDenominalAndrewsAdverbialHuiaSourceEvidence(source);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "55.4-adverbial-huia",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "55.4",
          role: "adverbial-huia-denominal-route"
        },
        outputKind: "denominal-andrews-adverbial-huia-route-preview",
        source: "explicit-adverbial-nounstem",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        finiteRouteObjectPrefixRequiredCount: Number(routePreview?.finiteRouteObjectPrefixRequiredCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromExplicitSourceClassification: true,
          sourceMustBeConfirmedAdverbialNounstem: true,
          doesNotTreatConfiguredAdverbioAsAutomaticEvidence: true
        }
      };
    }
    function buildNawatDenominalAndrewsRelationalCompoundSourceEvidence(source = {}) {
      const sourceRecord = source && typeof source === "object" ? source : {};
      const {
        sourceStem = "",
        sourceSurface = "",
        sourceState = "relational",
        sourceKind = "compound-relational-nounstem",
        sourceFormulaEcho = "",
        sourceNote = ""
      } = sourceRecord;
      const sourceBaseStem = resolveNawatDenominalAndrewsExplicitSourceSurface(sourceRecord, {
        sourceStem,
        sourceSurface
      });
      if (!sourceBaseStem) {
        return null;
      }
      const normalizedSourceSurface = sourceBaseStem;
      const normalizedSourceKind = String(sourceKind || "compound-relational-nounstem").trim();
      return {
        relationalCompoundSource: true,
        sourceState: String(sourceState || "relational").trim(),
        sourceCategory: normalizedSourceKind,
        sourceSurface: normalizedSourceSurface,
        sourceBaseStem,
        sourceFormulaEcho: String(sourceFormulaEcho || "").trim(),
        sourceNote: String(sourceNote || "").trim(),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          sourceEvidenceFromExplicitSourceClassification: true,
          sourceEvidenceSupportsRelationalOaHuia: true,
          sourceMustBeConfirmedRelationalCompoundOrPredicate: true,
          doesNotTreatRelationalBoundaryFrameAsAutomaticEvidence: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
    }
    function previewNawatDenominalAndrewsRelationalCompoundRouteFromSource(source = {}) {
      const sourceEvidence = buildNawatDenominalAndrewsRelationalCompoundSourceEvidence(source);
      if (!sourceEvidence) {
        return null;
      }
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: sourceEvidence.sourceBaseStem,
        contractId: "55.5-relational-compound-o-a-huia",
        sourceEvidence
      });
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "55.5",
          role: "relational-o-a-huia-denominal-route"
        },
        outputKind: "denominal-andrews-relational-compound-route-preview",
        source: "explicit-relational-compound-or-predicate",
        sourceStem: sourceEvidence.sourceBaseStem,
        sourceEvidence,
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        finiteRouteRequestCount: Number(routePreview?.finiteRouteRequestCount || 0),
        finiteRouteObjectPrefixRequiredCount: Number(routePreview?.finiteRouteObjectPrefixRequiredCount || 0),
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromExplicitSourceClassification: true,
          sourceMustBeConfirmedRelationalCompoundOrPredicate: true,
          doesNotTreatRelationalBoundaryFrameAsAutomaticEvidence: true
        }
      };
    }
    function buildNawatDenominalAndrewsRouteDiagnostics({
      contract = null,
      template = null,
      sourceStem = "",
      sourceStemFinalLetter = "",
      sourceFinalPattern = null,
      sourceRequirement = null
    } = {}) {
      const diagnostics = [];
      if (sourceRequirement?.finiteGenerationRequiresSourceEvidence === true) {
        diagnostics.push({
          id: "andrews-denominal-route-source-evidence-required",
          severity: "info",
          message: `Andrews limits this route to ${sourceRequirement.unsatisfied.map(requirement => requirement.label).join(" + ")}; finite routing waits for that source evidence.`,
          sourceStem,
          requirementIds: sourceRequirement.unsatisfied.map(requirement => requirement.id),
          boundaries: {
            noFixtureEvidence: true,
            doesNotRejectRouteTarget: true,
            finiteGenerationRequiresSourceEvidence: true
          }
        });
      }
      if (contract?.id === "55.7-transitive-i-a" && template?.wFinalSourceMayBeHuia === true && sourceStemFinalLetter === "w") {
        diagnostics.push({
          id: "andrews-55.7-i-a-w-final-source-may-be-huia",
          severity: "warning",
          message: "Andrews notes that a w-final nounstem that looks like transitive i-a may instead be huia with w+w contraction.",
          sourceStem,
          sourceStemFinalLetter,
          alternateContractId: "55.3-intransitive-o-a-applicative-huia",
          boundaries: {
            noFixtureEvidence: true,
            doesNotRejectRouteTarget: true,
            requiresLexicalConfirmation: true
          }
        });
      }
      if (contract?.id === "55.7-transitive-i-a" && sourceFinalPattern?.status === "attested-minority") {
        diagnostics.push({
          id: "andrews-55.7-i-a-source-final-attested-minority",
          severity: "info",
          message: "Andrews gives source-final /k/ and /n/ examples after the majority [c]/[l] pattern; Nawat orthography keeps this as source-final pattern metadata.",
          sourceStem,
          sourceStemFinalLetter,
          sourceFinalPatternStatus: sourceFinalPattern.status,
          boundaries: {
            noFixtureEvidence: true,
            doesNotRejectRouteTarget: true,
            sourceFinalPatternIsDiagnostic: true,
            classicalRuleSpellingsConvertedToNawat: true
          }
        });
      }
      if (contract?.id === "55.7-transitive-i-a" && sourceFinalPattern?.status === "unlisted") {
        diagnostics.push({
          id: "andrews-55.7-i-a-source-final-unlisted",
          severity: "info",
          message: "Andrews gives [c]/[l] as the majority source-final pattern and /k/ or /n/ examples; this source final needs lexical confirmation.",
          sourceStem,
          sourceStemFinalLetter,
          sourceFinalPatternStatus: sourceFinalPattern.status,
          boundaries: {
            noFixtureEvidence: true,
            doesNotRejectRouteTarget: true,
            sourceFinalPatternIsDiagnostic: true,
            requiresLexicalConfirmation: true,
            classicalRuleSpellingsConvertedToNawat: true
          }
        });
      }
      if (contract?.id === "55.7-transitive-i-a" && template?.sourceIFormMayBelongToNounstem === true) {
        diagnostics.push({
          id: "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
          severity: "info",
          message: "Andrews notes that the i in a seeming i-a transitive stem can be part of the source nounstem.",
          sourceStem,
          boundaries: {
            noFixtureEvidence: true,
            doesNotRejectRouteTarget: true,
            requiresLexicalConfirmation: true
          }
        });
      }
      if (contract?.id === "55.7-transitive-i-a" && template?.sourceIHuiCausativePathPossible === true) {
        diagnostics.push({
          id: "andrews-55.7-i-a-source-i-hui-causative-path-possible",
          severity: "info",
          message: "Andrews notes that a seeming i-a causative can have an i-hui intransitive source and need not follow the 55.6 o-a counterpart path.",
          sourceStem,
          relatedContractId: "55.6-i-hui-a-hui-to-o-a",
          boundaries: {
            noFixtureEvidence: true,
            doesNotRejectRouteTarget: true,
            requiresLexicalConfirmation: true
          }
        });
      }
      return diagnostics;
    }
    function attachNawatDenominalAndrewsContractGrammarFrame(record = null, {
      routeStage = "preview",
      generationAllowed = false,
      supported = true,
      diagnostics = null,
      sourceEvidence = null,
      sourceStem = "",
      targetStem = "",
      targetInput = ""
    } = {}) {
      if (!record || typeof record !== "object" || typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      const resolvedDiagnostics = Array.isArray(diagnostics) ? diagnostics : [...(Array.isArray(record.diagnostics) ? record.diagnostics : []), ...(Array.isArray(record.routeDiagnostics) ? record.routeDiagnostics : [])];
      const resolvedSourceStem = normalizeNawatDenominalContractSourceStem(sourceStem || record.sourceStem || record.source?.sourceStem || "");
      const resolvedTargetStem = String(targetStem || record.targetVerbStem || record.targetInputValue || record.targetInput || "").trim();
      const resolvedTargetInput = String(targetInput || record.targetInput || record.targetInputValue || record.targetVerbStem || "").trim();
      const resolvedSourceEvidence = sourceEvidence && typeof sourceEvidence === "object" ? sourceEvidence : record.sourceEvidence && typeof record.sourceEvidence === "object" ? record.sourceEvidence : null;
      const suffixFrame = {
        classicalSuffixSequence: String(record.classicalSuffixSequence || "").trim(),
        nawatRuleSuffix: String(record.nawatRuleSuffix || "").trim(),
        nawatSurfaceSuffix: String(record.nawatSurfaceSuffix || "").trim(),
        orthographyConversion: record.orthographyConversion || null
      };
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        metadataKind: record.outputKind || "denominal-andrews-contract-route",
        unitKind: "denominal-vnc-route",
        routeFamily: "denominal-andrews-contract",
        routeStage,
        generationAllowed,
        supported,
        structuralSource: "Andrews Lessons 54-55",
        andrewsRefs: record.range ? [`Andrews ${record.range}`] : ["Andrews Lessons 54-55"],
        evidenceStatus: generationAllowed ? "finite-generation-requested" : resolvedSourceEvidence ? "source-evidence-linked" : "preview-only",
        diagnostics: resolvedDiagnostics,
        sourceInput: resolvedSourceStem || resolvedTargetInput,
        sourceContract: {
          unitKind: "denominal-source",
          sourceStem: resolvedSourceStem,
          sourceCategory: record.sourceCategory || "",
          sourceState: record.sourceState || "",
          sourceEvidence: resolvedSourceEvidence,
          sourceRequirement: record.sourceRequirement || null
        },
        targetContract: {
          unitKind: "vnc",
          executableRuleId: record.executableRuleId || "",
          executableRuleContract: record.executableRuleContract || record.ruleContract || null,
          targetCategory: record.targetCategory || "vnc",
          targetValency: record.targetValency || "",
          targetVerbStem: resolvedTargetStem,
          targetInput: resolvedTargetInput,
          targetStemClass: record.targetStemClass || "",
          generationAllowed,
          finiteGenerationRequiresExplicitRequest: record.finiteGenerationRequiresExplicitRequest === true,
          finiteGenerationRequiresTargetTense: record.finiteGenerationRequiresTargetTense === true,
          finiteGenerationRequiresObjectPrefix: record.finiteGenerationRequiresObjectPrefix === true,
          finiteGenerationRequiresSourceEvidence: record.finiteGenerationRequiresSourceEvidence === true
        },
        orthographyFrame: {
          classicalRuleSpelling: suffixFrame.classicalSuffixSequence,
          nawatRuleSpelling: suffixFrame.nawatRuleSuffix,
          surface: resolvedTargetStem,
          surfaceForms: resolvedTargetStem ? [resolvedTargetStem] : [],
          spellingAuthority: "Nawat/Pipil evidence",
          noClassicalSurfaceImport: true,
          classicalRuleSpellingsConvertedToNawat: true,
          orthographyConversion: suffixFrame.orthographyConversion
        },
        morphBoundaryFrame: {
          kind: "denominal-andrews-contract-boundary",
          executableRuleId: record.executableRuleId || "",
          executableRuleContract: record.executableRuleContract || record.ruleContract || null,
          suffix: suffixFrame,
          boundaries: record.boundaries || null
        },
        stemFrame: {
          stemKind: "denominal-target-verbstem",
          executableRuleId: record.executableRuleId || "",
          sourceKind: record.sourceCategory || "",
          sourceStem: resolvedSourceStem,
          targetStem: resolvedTargetStem,
          class: record.targetStemClass || "",
          finalProfile: {
            sourceStemFinalLetter: record.sourceStemFinalLetter || "",
            sourceStemFinalType: record.sourceStemFinalType || record.boundaries?.sourceStemFinalType || "",
            sourceFinalPatternStatus: record.sourceFinalPatternStatus || record.boundaries?.sourceFinalPatternStatus || "",
            sourceFinalPatternLabel: record.sourceFinalPatternLabel || record.boundaries?.sourceFinalPatternLabel || "",
            classicalSourceFinalPattern: record.classicalSourceFinalPattern || record.boundaries?.classicalSourceFinalPattern || null
          },
          useStatus: "preview-stem"
        }
      });
    }
    function formatNawatDenominalAndrewsContractTargetInput({
      sourceStem = "",
      targetVerbStem = "",
      suffix = null,
      template = null
    } = {}) {
      const stem = String(sourceStem || "").trim();
      const target = String(targetVerbStem || "").trim();
      const targetValency = String(template?.targetValency || "").trim();
      const segmentedPrefix = String(template?.segmentedPrefix || "").trim();
      const segmentedSuffix = String(template?.segmentedSuffix || "").trim();
      if (segmentedPrefix && segmentedSuffix) {
        const nawatSegmentedPrefix = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(segmentedPrefix, {
          source: "Andrews denominal segmented source suffix"
        })?.output || segmentedPrefix : segmentedPrefix;
        const nawatSegmentedSuffix = typeof targetObject.convertClassicalLettersToNawat === "function" ? targetObject.convertClassicalLettersToNawat(segmentedSuffix, {
          source: "Andrews denominal segmented target suffix"
        })?.output || segmentedSuffix : segmentedSuffix;
        return `(${stem}${String(nawatSegmentedPrefix || "").replace(/-/g, "")})-(${String(nawatSegmentedSuffix || "").replace(/-/g, "")})`;
      }
      if (targetValency !== "intransitive" && stem && suffix?.nawatSurfaceSuffix) {
        return `(${stem})-(${suffix.nawatSurfaceSuffix})`;
      }
      return wrapNawatRouteInputValue(target);
    }
    function buildNawatDenominalAndrewsContractRoute(contract = null, template = null, {
      sourceStem = "",
      sourceEvidence = null
    } = {}) {
      const normalizedSourceStem = normalizeNawatDenominalContractSourceStem(sourceStem);
      if (!contract || !template || !normalizedSourceStem) {
        return null;
      }
      const suffix = buildNawatDenominalAndrewsRouteTemplateSuffix(template);
      const targetVerbStem = `${normalizedSourceStem}${suffix.nawatSurfaceSuffix}`;
      const sourceStemFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter(normalizedSourceStem);
      const stemClassContract = resolveNawatDenominalAndrewsRouteTargetStemClass(template, sourceStemFinalLetter);
      const targetStemClass = stemClassContract.targetStemClass;
      const executableRule = getNawatDenominalAndrewsExecutableRuleContractForRoute(contract.id, template.id);
      const executableRuleContract = summarizeNawatDenominalAndrewsExecutableRuleContract(executableRule);
      const executableRuleResult = executableRule && typeof executableRule.generate === "function" ? executableRule.generate({
        sourceStem: normalizedSourceStem,
        sourceState: sourceEvidence?.sourceState || contract.sourceState || "",
        sourceCategory: sourceEvidence?.sourceCategory || contract.sourceCategory || "",
        sourceEvidence
      }) : null;
      const executableRuleBlocked = executableRuleResult?.ok === false;
      const executableRuleDiagnostics = Array.isArray(executableRuleResult?.diagnostics) ? executableRuleResult.diagnostics : [];
      const majoritySourceFinalLetters = Array.isArray(template.majoritySourceFinalLetters) ? Array.from(template.majoritySourceFinalLetters) : [];
      const sourceFinalPattern = contract.id === "55.7-transitive-i-a" ? classifyNawatDenominalIAStemSourceFinal(template, sourceStemFinalLetter) : null;
      const sourceRequirement = buildNawatDenominalAndrewsRouteSourceRequirement(template, {
        sourceEvidence
      });
      const routeDiagnostics = [...buildNawatDenominalAndrewsRouteDiagnostics({
        contract,
        template,
        sourceStem: normalizedSourceStem,
        sourceStemFinalLetter,
        sourceFinalPattern,
        sourceRequirement
      }), ...executableRuleDiagnostics];
      const targetInputValue = executableRuleBlocked ? "" : formatNawatDenominalAndrewsContractTargetInput({
        sourceStem: normalizedSourceStem,
        targetVerbStem: executableRuleResult?.targetVerbStem || targetVerbStem,
        suffix,
        template
      });
      const objectSlotExpected = isNawatDenominalAndrewsContractRouteObjectSlotExpected({
        targetValency: template.targetValency || contract.valency || ""
      });
      const finiteGenerationContractAvailable = !executableRuleBlocked && sourceRequirement.finiteGenerationRequiresSourceEvidence !== true;
      const route = {
        version: 1,
        curriculumRef: contract.curriculumRef,
        outputKind: "denominal-andrews-contract-route",
        contractId: contract.id,
        range: contract.range || contract.curriculumRef?.range || "",
        denominalFamily: contract.denominalFamily || "",
        structuralAnalogue: contract.structuralAnalogue || "",
        routeTemplateId: template.id || "",
        role: template.role || "",
        targetRole: template.role || "",
        sourceStem: normalizedSourceStem,
        sourceStemFinalLetter,
        sourceFinalPatternStatus: sourceFinalPattern?.status || "",
        sourceFinalPatternLabel: sourceFinalPattern?.label || "",
        attestedSourceFinalLetters: sourceFinalPattern?.attestedSourceFinalLetters || [],
        attestedMinoritySourceFinalLetters: sourceFinalPattern?.attestedMinoritySourceFinalLetters || [],
        classicalSourceFinalPattern: sourceFinalPattern?.classicalSourceFinalPattern || null,
        sourceCategory: contract.sourceCategory,
        sourceState: contract.sourceState,
        targetCategory: contract.targetCategory,
        targetValency: template.targetValency || contract.valency || "",
        targetStemClass,
        targetStemClassRule: stemClassContract.targetStemClassRule,
        targetStemClassSource: stemClassContract.targetStemClassSource,
        sourceStemFinalType: stemClassContract.sourceStemFinalType,
        targetStemClassBySourceFinalType: stemClassContract.targetStemClassBySourceFinalType,
        traditionalSpelling: String(template.traditionalSpelling || "").trim(),
        traditionalSpellingConfusableWith: String(template.traditionalSpellingConfusableWith || "").trim(),
        classicalSuffixSequence: suffix.classicalSuffixSequence,
        nawatRuleSuffix: suffix.nawatRuleSuffix,
        nawatSurfaceSuffix: suffix.nawatSurfaceSuffix,
        executableRuleId: executableRuleContract?.id || "",
        executableRuleContract,
        targetVerbStem: executableRuleBlocked ? "" : executableRuleResult?.targetVerbStem || targetVerbStem,
        targetInputValue,
        targetInput: targetInputValue,
        orthographyConversion: suffix.orthographyConversion,
        currentRouteFamilies: contract.currentRouteFamilies,
        currentRouteIds: contract.currentRouteIds,
        supportStatus: contract.supportStatus,
        generationStatus: executableRuleBlocked ? "blocked-by-executable-rule" : "vnc-stem-contract-generated",
        routeTargetGenerated: !executableRuleBlocked,
        generationAllowed: false,
        finiteGenerationAllowed: false,
        finiteGenerationContractAvailable,
        finiteGenerationRequiresTargetTense: true,
        finiteGenerationRequiresObjectPrefix: objectSlotExpected,
        finiteGenerationRequiresExplicitRequest: true,
        finiteGenerationRequiresSourceEvidence: sourceRequirement.finiteGenerationRequiresSourceEvidence === true,
        objectSlotExpected,
        sourceRequirement,
        routeDiagnostics,
        routeDiagnosticCount: routeDiagnostics.length,
        routeWarningCount: routeDiagnostics.filter(diagnostic => diagnostic?.severity === "warning").length,
        routeNoteCount: routeDiagnostics.filter(diagnostic => diagnostic?.severity === "info").length,
        boundaries: {
          noNewSurfaceForms: true,
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          usesExecutableAndrewsRuleContract: Boolean(executableRuleContract),
          finiteGenerationBlockedByRuleContract: executableRuleBlocked,
          doesNotGenerateFiniteVnc: true,
          noFiniteVncSurface: true,
          noNewFixtureSurfaceForms: true,
          generatesVncStemOnly: true,
          finiteGenerationRequiresExplicitRequest: true,
          finiteGenerationRequiresTargetTense: true,
          finiteGenerationRequiresObjectPrefix: objectSlotExpected,
          finiteGenerationRequiresSourceEvidence: sourceRequirement.finiteGenerationRequiresSourceEvidence === true,
          targetStemClassVerified: Boolean(targetStemClass),
          targetStemClassRule: stemClassContract.targetStemClassRule,
          targetStemClassSource: stemClassContract.targetStemClassSource,
          sourceStemFinalType: stemClassContract.sourceStemFinalType,
          targetStemClassBySourceFinalType: stemClassContract.targetStemClassBySourceFinalType,
          sourceFinalDeterminesTargetStemClass: stemClassContract.boundaries.sourceFinalDeterminesTargetStemClass === true,
          targetStemClassSourceFinalRule: stemClassContract.boundaries.targetStemClassSourceFinalRule === true,
          traditionalSpelling: String(template.traditionalSpelling || "").trim(),
          traditionalSpellingConfusableWith: String(template.traditionalSpellingConfusableWith || "").trim(),
          traditionalSpellingAmbiguous: Boolean(template.traditionalSpellingConfusableWith),
          noIntransitiveCounterpart: template.noIntransitiveCounterpart === true,
          majoritySourceFinalLetters,
          sourceFinalPatternStatus: sourceFinalPattern?.status || "",
          sourceFinalPatternLabel: sourceFinalPattern?.label || "",
          attestedSourceFinalLetters: sourceFinalPattern?.attestedSourceFinalLetters || [],
          attestedMinoritySourceFinalLetters: sourceFinalPattern?.attestedMinoritySourceFinalLetters || [],
          classicalSourceFinalPattern: sourceFinalPattern?.classicalSourceFinalPattern || null,
          sourceFinalPatternIsDiagnostic: sourceFinalPattern?.boundaries?.sourceFinalPatternIsDiagnostic === true,
          wFinalSourceMayBeHuia: template.wFinalSourceMayBeHuia === true && sourceStemFinalLetter === "w",
          sourceIFormMayBelongToNounstem: template.sourceIFormMayBelongToNounstem === true,
          sourceIHuiCausativePathPossible: template.sourceIHuiCausativePathPossible === true,
          requiresNawatSourceStem: true,
          requiresPossessiveSource: template.requiresPossessiveSource === true,
          requiresTiSource: template.requiresTiSource === true,
          requiresHuiSource: template.requiresHuiSource === true,
          requiresYaSource: template.requiresYaSource === true,
          requiresDeverbalYoSource: template.requiresDeverbalYoSource === true,
          requiresTemporalCompoundSource: template.requiresTemporalCompoundSource === true,
          requiresAdverbialSource: template.requiresAdverbialSource === true,
          requiresRelationalCompoundSource: template.requiresRelationalCompoundSource === true,
          requiresTlaCausativeSource: template.requiresTlaCausativeSource === true,
          requiresTlaIntransitiveSource: template.requiresTlaIntransitiveSource === true,
          requiresIntransitiveOaSource: template.requiresIntransitiveOaSource === true,
          requiresIHuiOrAHuiSource: template.requiresIHuiOrAHuiSource === true,
          replaciveTiFinalIDeleted: template.replaciveTiFinalIDeleted === true,
          sourceYaDeleted: template.droppedSourceSuffix === "ya",
          sourceTlaReplacedByTiBeforeA: template.sourceTlaReplacedByTiBeforeA === true,
          sourceTlaReplacedByTiBeforeLia: template.sourceTlaReplacedByTiBeforeLia === true,
          sourceOaBypassesTransitiveOaStep: template.sourceOaBypassesTransitiveOaStep === true,
          hypotheticalIHuiAHuiSource: template.hypotheticalIHuiAHuiSource === true,
          singleObjectTiSourceRouteOnly: template.singleObjectTiSourceRouteOnly === true,
          possessiveSourceDoubleObjectUnmodeled: template.possessiveSourceDoubleObjectUnmodeled === true,
          limitedTiApplicativeUse: template.limitedTiApplicativeUse === true,
          limitedUse: template.limitedUse === true,
          notOaFormation: template.notOaFormation === true,
          possessionTiDoesNotFormDeverbalYa: template.noDeverbalYa === true
        }
      };
      return attachNawatDenominalAndrewsContractGrammarFrame(route, {
        routeStage: "preview-stem-route",
        generationAllowed: false,
        supported: !executableRuleBlocked,
        diagnostics: routeDiagnostics,
        sourceEvidence,
        sourceStem: normalizedSourceStem,
        targetStem: route.targetVerbStem,
        targetInput: targetInputValue
      });
    }
    function buildNawatDenominalAndrewsContractRouteGenerateWordRequest(route = null, {
      tense = "",
      targetTense = "",
      subjectPrefix = "",
      subjectSuffix = "",
      objectPrefix = "",
      silent = true,
      skipValidation = false
    } = {}) {
      const targetInput = String(route?.targetInputValue || route?.targetInput || route?.targetVerbStem || "").trim();
      const requestedTense = String(targetTense || tense || "").trim();
      if (!route || !targetInput || !requestedTense || route.finiteGenerationRequiresSourceEvidence === true) {
        return null;
      }
      const resolvedSubjectPrefix = String(subjectPrefix || "").trim();
      const resolvedSubjectSuffix = String(subjectSuffix || "").trim();
      const resolvedObjectPrefix = String(objectPrefix || "").trim();
      const objectSlotExpected = isNawatDenominalAndrewsContractRouteObjectSlotExpected(route);
      if (objectSlotExpected && !resolvedObjectPrefix) {
        return null;
      }
      const nextSourceEvidence = buildNawatDenominalAndrewsRouteSourceEvidenceFromContractRoute(route);
      const request = {
        options: {
          silent,
          skipValidation,
          override: {
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active
          }
        },
        posicionesFormula: {
          pers1: resolvedSubjectPrefix,
          obj1: resolvedObjectPrefix,
          tronco: targetInput,
          pers2: resolvedSubjectSuffix,
          num2: resolvedSubjectSuffix,
          poseedor: "",
          tiempo: requestedTense
        },
        entradaTronco: {
          tieneControlTronco: false,
          valorTronco: ""
        },
        denominalAndrewsContractRoute: {
          version: 1,
          outputKind: "denominal-andrews-contract-route-nuclear-clause-surface-request",
          contractId: route.contractId || "",
          routeTemplateId: route.routeTemplateId || "",
          executableRuleId: route.executableRuleId || "",
          executableRuleContract: route.executableRuleContract || null,
          range: route.range || "",
          sourceStem: route.sourceStem || "",
          sourceStemFinalLetter: route.sourceStemFinalLetter || "",
          sourceFinalPatternStatus: route.sourceFinalPatternStatus || route.boundaries?.sourceFinalPatternStatus || "",
          sourceFinalPatternLabel: route.sourceFinalPatternLabel || route.boundaries?.sourceFinalPatternLabel || "",
          attestedSourceFinalLetters: Array.isArray(route.attestedSourceFinalLetters) ? route.attestedSourceFinalLetters : Array.isArray(route.boundaries?.attestedSourceFinalLetters) ? route.boundaries.attestedSourceFinalLetters : [],
          attestedMinoritySourceFinalLetters: Array.isArray(route.attestedMinoritySourceFinalLetters) ? route.attestedMinoritySourceFinalLetters : Array.isArray(route.boundaries?.attestedMinoritySourceFinalLetters) ? route.boundaries.attestedMinoritySourceFinalLetters : [],
          classicalSourceFinalPattern: route.classicalSourceFinalPattern || route.boundaries?.classicalSourceFinalPattern || null,
          targetInput,
          targetVerbStem: route.targetVerbStem || "",
          targetValency: route.targetValency || "",
          targetStemClass: route.targetStemClass || "",
          targetStemClassRule: route.targetStemClassRule || route.boundaries?.targetStemClassRule || "",
          targetStemClassSource: route.targetStemClassSource || route.boundaries?.targetStemClassSource || "",
          sourceStemFinalType: route.sourceStemFinalType || route.boundaries?.sourceStemFinalType || "",
          targetStemClassBySourceFinalType: route.targetStemClassBySourceFinalType || route.boundaries?.targetStemClassBySourceFinalType || null,
          traditionalSpelling: route.traditionalSpelling || route.boundaries?.traditionalSpelling || "",
          traditionalSpellingConfusableWith: route.traditionalSpellingConfusableWith || route.boundaries?.traditionalSpellingConfusableWith || "",
          targetRole: route.targetRole || route.role || "",
          sourceRequirement: route.sourceRequirement && typeof route.sourceRequirement === "object" ? route.sourceRequirement : null,
          routeDiagnostics: Array.isArray(route.routeDiagnostics) ? route.routeDiagnostics : [],
          routeDiagnosticCount: Number(route.routeDiagnosticCount || 0),
          routeWarningCount: Number(route.routeWarningCount || 0),
          routeNoteCount: Number(route.routeNoteCount || 0),
          ...(nextSourceEvidence ? {
            nextSourceEvidence
          } : {}),
          classicalSuffixSequence: route.classicalSuffixSequence || "",
          nawatRuleSuffix: route.nawatRuleSuffix || "",
          nawatSurfaceSuffix: route.nawatSurfaceSuffix || "",
          tense: requestedTense,
          tenseMode: targetObject.TENSE_MODE.verbo,
          objectPrefix: resolvedObjectPrefix,
          objectSlotExpected,
          finiteGenerationContractAvailable: route.finiteGenerationContractAvailable === true,
          finiteGenerationRequiresExplicitRequest: true,
          finiteGenerationRequiresTargetTense: true,
          finiteGenerationRequiresObjectPrefix: objectSlotExpected,
          finiteGenerationRequiresSourceEvidence: route.finiteGenerationRequiresSourceEvidence === true,
          boundaries: {
            noFixtureEvidence: true,
            doesNotCreateLexicalEvidence: true,
            finiteGenerationRequiresExplicitRequest: true,
            finiteGenerationRequiresTargetTense: true,
            finiteGenerationRequiresObjectPrefix: objectSlotExpected,
            finiteGenerationRequiresSourceEvidence: route.finiteGenerationRequiresSourceEvidence === true,
            targetStemClassVerified: Boolean(route.targetStemClass),
            targetStemClassRule: route.targetStemClassRule || route.boundaries?.targetStemClassRule || "",
            targetStemClassSource: route.targetStemClassSource || route.boundaries?.targetStemClassSource || "",
            sourceStemFinalType: route.sourceStemFinalType || route.boundaries?.sourceStemFinalType || "",
            targetStemClassBySourceFinalType: route.targetStemClassBySourceFinalType || route.boundaries?.targetStemClassBySourceFinalType || null,
            sourceFinalDeterminesTargetStemClass: route.boundaries?.sourceFinalDeterminesTargetStemClass === true,
            targetStemClassSourceFinalRule: route.boundaries?.targetStemClassSourceFinalRule === true,
            traditionalSpelling: route.traditionalSpelling || route.boundaries?.traditionalSpelling || "",
            traditionalSpellingConfusableWith: route.traditionalSpellingConfusableWith || route.boundaries?.traditionalSpellingConfusableWith || "",
            traditionalSpellingAmbiguous: route.boundaries?.traditionalSpellingAmbiguous === true,
            noIntransitiveCounterpart: route.boundaries?.noIntransitiveCounterpart === true,
            sourceFinalPatternStatus: route.sourceFinalPatternStatus || route.boundaries?.sourceFinalPatternStatus || "",
            sourceFinalPatternLabel: route.sourceFinalPatternLabel || route.boundaries?.sourceFinalPatternLabel || "",
            attestedSourceFinalLetters: Array.isArray(route.attestedSourceFinalLetters) ? route.attestedSourceFinalLetters : Array.isArray(route.boundaries?.attestedSourceFinalLetters) ? route.boundaries.attestedSourceFinalLetters : [],
            attestedMinoritySourceFinalLetters: Array.isArray(route.attestedMinoritySourceFinalLetters) ? route.attestedMinoritySourceFinalLetters : Array.isArray(route.boundaries?.attestedMinoritySourceFinalLetters) ? route.boundaries.attestedMinoritySourceFinalLetters : [],
            classicalSourceFinalPattern: route.classicalSourceFinalPattern || route.boundaries?.classicalSourceFinalPattern || null,
            sourceFinalPatternIsDiagnostic: route.boundaries?.sourceFinalPatternIsDiagnostic === true,
            wFinalSourceMayBeHuia: route.boundaries?.wFinalSourceMayBeHuia === true,
            sourceIFormMayBelongToNounstem: route.boundaries?.sourceIFormMayBelongToNounstem === true,
            sourceIHuiCausativePathPossible: route.boundaries?.sourceIHuiCausativePathPossible === true,
            requiresPossessiveSource: route.boundaries?.requiresPossessiveSource === true,
            requiresTiSource: route.boundaries?.requiresTiSource === true,
            requiresHuiSource: route.boundaries?.requiresHuiSource === true,
            requiresYaSource: route.boundaries?.requiresYaSource === true,
            requiresDeverbalYoSource: route.boundaries?.requiresDeverbalYoSource === true,
            requiresTemporalCompoundSource: route.boundaries?.requiresTemporalCompoundSource === true,
            requiresAdverbialSource: route.boundaries?.requiresAdverbialSource === true,
            requiresRelationalCompoundSource: route.boundaries?.requiresRelationalCompoundSource === true,
            requiresTlaCausativeSource: route.boundaries?.requiresTlaCausativeSource === true,
            requiresTlaIntransitiveSource: route.boundaries?.requiresTlaIntransitiveSource === true,
            requiresIntransitiveOaSource: route.boundaries?.requiresIntransitiveOaSource === true,
            requiresIHuiOrAHuiSource: route.boundaries?.requiresIHuiOrAHuiSource === true,
            sourceOaBypassesTransitiveOaStep: route.boundaries?.sourceOaBypassesTransitiveOaStep === true,
            hypotheticalIHuiAHuiSource: route.boundaries?.hypotheticalIHuiAHuiSource === true,
            canSatisfyLaterSourceEvidence: Boolean(nextSourceEvidence),
            usesExistingVncEngine: true,
            classicalRuleSpellingsConvertedToNawat: true
          }
        }
      };
      request.denominalAndrewsContractRoute = attachNawatDenominalAndrewsContractGrammarFrame(request.denominalAndrewsContractRoute, {
        routeStage: "request-finite-generation",
        generationAllowed: true,
        supported: true,
        diagnostics: request.denominalAndrewsContractRoute.routeDiagnostics,
        sourceEvidence: route.sourceEvidence || route.sourceRequirement?.sourceEvidence || null,
        sourceStem: request.denominalAndrewsContractRoute.sourceStem,
        targetStem: request.denominalAndrewsContractRoute.targetVerbStem,
        targetInput
      });
      return request;
    }
    function executeNawatDenominalAndrewsContractRoute(route = null, options = {}) {
      const request = buildNawatDenominalAndrewsContractRouteGenerateWordRequest(route, options);
      if (!request || typeof targetObject.executeGenerateWordRequest !== "function") {
        return null;
      }
      const result = targetObject.executeNuclearClauseSurfaceRequest(request);
      if (!result || typeof result !== "object") {
        return result;
      }
      const denominalAndrewsContractRouteExecution = attachNawatDenominalAndrewsContractGrammarFrame({
        version: 1,
        outputKind: "denominal-andrews-contract-route-execution",
        contractId: request.denominalAndrewsContractRoute.contractId,
        routeTemplateId: request.denominalAndrewsContractRoute.routeTemplateId,
        executableRuleId: request.denominalAndrewsContractRoute.executableRuleId,
        executableRuleContract: request.denominalAndrewsContractRoute.executableRuleContract || null,
        sourceStem: request.denominalAndrewsContractRoute.sourceStem,
        sourceStemFinalLetter: request.denominalAndrewsContractRoute.sourceStemFinalLetter,
        sourceFinalPatternStatus: request.denominalAndrewsContractRoute.sourceFinalPatternStatus,
        sourceFinalPatternLabel: request.denominalAndrewsContractRoute.sourceFinalPatternLabel,
        attestedSourceFinalLetters: request.denominalAndrewsContractRoute.attestedSourceFinalLetters,
        attestedMinoritySourceFinalLetters: request.denominalAndrewsContractRoute.attestedMinoritySourceFinalLetters,
        classicalSourceFinalPattern: request.denominalAndrewsContractRoute.classicalSourceFinalPattern,
        sourceRequirement: request.denominalAndrewsContractRoute.sourceRequirement,
        targetInput: request.denominalAndrewsContractRoute.targetInput,
        targetVerbStem: request.denominalAndrewsContractRoute.targetVerbStem,
        targetStemClass: request.denominalAndrewsContractRoute.targetStemClass,
        targetStemClassRule: request.denominalAndrewsContractRoute.targetStemClassRule,
        targetStemClassSource: request.denominalAndrewsContractRoute.targetStemClassSource,
        sourceStemFinalType: request.denominalAndrewsContractRoute.sourceStemFinalType,
        targetStemClassBySourceFinalType: request.denominalAndrewsContractRoute.targetStemClassBySourceFinalType,
        traditionalSpelling: request.denominalAndrewsContractRoute.traditionalSpelling,
        traditionalSpellingConfusableWith: request.denominalAndrewsContractRoute.traditionalSpellingConfusableWith,
        tense: request.denominalAndrewsContractRoute.tense,
        objectPrefix: request.denominalAndrewsContractRoute.objectPrefix,
        routeDiagnostics: request.denominalAndrewsContractRoute.routeDiagnostics,
        routeDiagnosticCount: request.denominalAndrewsContractRoute.routeDiagnosticCount,
        routeWarningCount: request.denominalAndrewsContractRoute.routeWarningCount,
        routeNoteCount: request.denominalAndrewsContractRoute.routeNoteCount,
        ...(request.denominalAndrewsContractRoute.nextSourceEvidence ? {
          nextSourceEvidence: request.denominalAndrewsContractRoute.nextSourceEvidence
        } : {}),
        finiteGenerationRequiresSourceEvidence: request.denominalAndrewsContractRoute.finiteGenerationRequiresSourceEvidence === true,
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          usesExistingVncEngine: true,
          classicalRuleSpellingsConvertedToNawat: true,
          noIntransitiveCounterpart: request.denominalAndrewsContractRoute.boundaries.noIntransitiveCounterpart === true,
          finiteGenerationRequiresSourceEvidence: request.denominalAndrewsContractRoute.boundaries.finiteGenerationRequiresSourceEvidence === true,
          targetStemClassRule: request.denominalAndrewsContractRoute.boundaries.targetStemClassRule || "",
          targetStemClassSource: request.denominalAndrewsContractRoute.boundaries.targetStemClassSource || "",
          sourceStemFinalType: request.denominalAndrewsContractRoute.boundaries.sourceStemFinalType || "",
          targetStemClassBySourceFinalType: request.denominalAndrewsContractRoute.boundaries.targetStemClassBySourceFinalType || null,
          sourceFinalDeterminesTargetStemClass: request.denominalAndrewsContractRoute.boundaries.sourceFinalDeterminesTargetStemClass === true,
          targetStemClassSourceFinalRule: request.denominalAndrewsContractRoute.boundaries.targetStemClassSourceFinalRule === true,
          traditionalSpelling: request.denominalAndrewsContractRoute.boundaries.traditionalSpelling || "",
          traditionalSpellingConfusableWith: request.denominalAndrewsContractRoute.boundaries.traditionalSpellingConfusableWith || "",
          traditionalSpellingAmbiguous: request.denominalAndrewsContractRoute.boundaries.traditionalSpellingAmbiguous === true,
          sourceFinalPatternStatus: request.denominalAndrewsContractRoute.boundaries.sourceFinalPatternStatus || "",
          sourceFinalPatternLabel: request.denominalAndrewsContractRoute.boundaries.sourceFinalPatternLabel || "",
          attestedSourceFinalLetters: request.denominalAndrewsContractRoute.boundaries.attestedSourceFinalLetters || [],
          attestedMinoritySourceFinalLetters: request.denominalAndrewsContractRoute.boundaries.attestedMinoritySourceFinalLetters || [],
          classicalSourceFinalPattern: request.denominalAndrewsContractRoute.boundaries.classicalSourceFinalPattern || null,
          sourceFinalPatternIsDiagnostic: request.denominalAndrewsContractRoute.boundaries.sourceFinalPatternIsDiagnostic === true,
          wFinalSourceMayBeHuia: request.denominalAndrewsContractRoute.boundaries.wFinalSourceMayBeHuia === true,
          sourceIFormMayBelongToNounstem: request.denominalAndrewsContractRoute.boundaries.sourceIFormMayBelongToNounstem === true,
          sourceIHuiCausativePathPossible: request.denominalAndrewsContractRoute.boundaries.sourceIHuiCausativePathPossible === true,
          canSatisfyLaterSourceEvidence: request.denominalAndrewsContractRoute.boundaries.canSatisfyLaterSourceEvidence === true
        }
      }, {
        routeStage: "execute-finite-generation",
        generationAllowed: true,
        supported: Boolean(getPrimaryNawatRouteSurfaceForm(result)),
        diagnostics: request.denominalAndrewsContractRoute.routeDiagnostics,
        sourceEvidence: request.denominalAndrewsContractRoute.nextSourceEvidence || null,
        sourceStem: request.denominalAndrewsContractRoute.sourceStem,
        targetStem: request.denominalAndrewsContractRoute.targetVerbStem,
        targetInput: request.denominalAndrewsContractRoute.targetInput
      });
      return {
        ...result,
        denominalAndrewsContractRoute: request.denominalAndrewsContractRoute,
        denominalAndrewsContractRouteExecution
      };
    }
    let activeNawatDenominalAndrewsContractRouteContext = null;
    function getNawatDenominalAndrewsRouteComparableInputs(context = null) {
      const targetInput = String(context?.targetInput || "").trim();
      const targetVerbStem = String(context?.targetVerbStem || "").trim();
      return [targetInput, targetVerbStem ? wrapNawatRouteInputValue(targetVerbStem) : "", targetVerbStem].filter(Boolean);
    }
    function setActiveNawatDenominalAndrewsContractRouteContext(route = null, request = null) {
      const contractRoute = request?.denominalAndrewsContractRoute || route;
      if (!contractRoute || typeof contractRoute !== "object") {
        activeNawatDenominalAndrewsContractRouteContext = null;
        return null;
      }
      const nextSourcePreview = previewNawatDenominalAndrewsContractRouteNextSource(contractRoute);
      const context = {
        version: 1,
        outputKind: "active-denominal-andrews-contract-route-context",
        source: "denominal-andrews-contract-route-activation",
        contractId: contractRoute.contractId || "",
        routeTemplateId: contractRoute.routeTemplateId || "",
        executableRuleId: contractRoute.executableRuleId || "",
        sourceStem: contractRoute.sourceStem || "",
        targetInput: contractRoute.targetInput || "",
        targetVerbStem: contractRoute.targetVerbStem || "",
        tense: contractRoute.tense || "",
        objectPrefix: contractRoute.objectPrefix || "",
        route: contractRoute,
        nextSourceEvidence: contractRoute.nextSourceEvidence || nextSourcePreview?.sourceEvidence || null,
        nextSourcePreview,
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          activeContextMustMatchCurrentInput: true,
          sourceEvidenceFromAndrewsContractRoute: Boolean(nextSourcePreview?.sourceEvidence),
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
      activeNawatDenominalAndrewsContractRouteContext = context;
      return context;
    }
    function clearActiveNawatDenominalAndrewsContractRouteContext() {
      activeNawatDenominalAndrewsContractRouteContext = null;
    }
    function getActiveNawatDenominalAndrewsContractRouteContext({
      inputValue = "",
      targetInput = "",
      targetVerbStem = ""
    } = {}) {
      const context = activeNawatDenominalAndrewsContractRouteContext;
      if (!context) {
        return null;
      }
      const requestedInput = String(inputValue || targetInput || targetVerbStem || "").trim();
      if (!requestedInput) {
        return context;
      }
      const comparableInputs = getNawatDenominalAndrewsRouteComparableInputs(context);
      return comparableInputs.includes(requestedInput) ? context : null;
    }
    function previewActiveNawatDenominalAndrewsContractRouteNextSource(options = {}) {
      const context = getActiveNawatDenominalAndrewsContractRouteContext(options);
      if (!context?.route) {
        return null;
      }
      if (context.nextSourcePreview) {
        return context.nextSourcePreview;
      }
      return previewNawatDenominalAndrewsContractRouteNextSource(context.route);
    }
    if (typeof globalThis !== "undefined") {
      globalThis.setActiveNawatDenominalAndrewsContractRouteContext = setActiveNawatDenominalAndrewsContractRouteContext;
      globalThis.clearActiveNawatDenominalAndrewsContractRouteContext = clearActiveNawatDenominalAndrewsContractRouteContext;
      globalThis.getActiveNawatDenominalAndrewsContractRouteContext = getActiveNawatDenominalAndrewsContractRouteContext;
      globalThis.previewActiveNawatDenominalAndrewsContractRouteNextSource = previewActiveNawatDenominalAndrewsContractRouteNextSource;
    }
    function activateNawatDenominalAndrewsContractRouteTarget(route = null, {
      tense = "",
      targetTense = "",
      objectPrefix = "",
      render = false,
      anchorElement = null
    } = {}) {
      const resolvedObjectPrefix = String(objectPrefix || (typeof targetObject.getCurrentObjectPrefix === "function" ? targetObject.getCurrentObjectPrefix() : "")).trim();
      const request = buildNawatDenominalAndrewsContractRouteGenerateWordRequest(route, {
        tense,
        targetTense,
        objectPrefix: resolvedObjectPrefix
      });
      if (!request) {
        return null;
      }
      const contractRoute = request.denominalAndrewsContractRoute;
      let activeContext = null;
      const applyActivation = () => {
        if (typeof setActiveTenseMode === "function") {
          setActiveTenseMode(targetObject.TENSE_MODE.verbo, {
            modeSystem: typeof targetObject.TENSE_MODE_SYSTEM !== "undefined" ? targetObject.TENSE_MODE_SYSTEM.nawat || "nawat" : "nawat"
          });
        }
        const ordinaryNncWasActive = typeof isOrdinaryNncGenerationModeEnabled === "function" && isOrdinaryNncGenerationModeEnabled();
        if (typeof setOrdinaryNncGenerationModeEnabled === "function") {
          setOrdinaryNncGenerationModeEnabled(false);
        }
        if (typeof targetObject.setComposerEntryBoard === "function") {
          const plainComposerBoard = typeof targetObject.COMPOSER_ENTRY_BOARD !== "undefined" ? targetObject.COMPOSER_ENTRY_BOARD.general || "general" : "general";
          targetObject.setComposerEntryBoard(plainComposerBoard, {
            force: ordinaryNncWasActive
          });
        }
        activeContext = setActiveNawatDenominalAndrewsContractRouteContext(route, request);
        if (typeof setActiveDerivationMode === "function") {
          setActiveDerivationMode(targetObject.DERIVATION_MODE.active);
        }
        if (typeof setActiveVoiceMode === "function") {
          setActiveVoiceMode(targetObject.VOICE_MODE.active);
        }
        if (typeof mutateConjugationSelectionState === "function") {
          mutateConjugationSelectionState({
            tenseMode: targetObject.TENSE_MODE.verbo,
            group: typeof targetObject.CONJUGATION_GROUPS !== "undefined" ? targetObject.CONJUGATION_GROUPS.tense : "tense",
            tenseValue: contractRoute.tense,
            classFilter: null
          }, {
            tenseMode: targetObject.TENSE_MODE.verbo
          });
        }
        if (render && typeof applyNawatRouteStationInput === "function") {
          applyNawatRouteStationInput({
            inputValue: contractRoute.targetInput,
            objectPrefix: contractRoute.objectPrefix
          });
        }
        if (render && typeof updateTenseModeTabs === "function") {
          updateTenseModeTabs();
        }
        if (render && typeof targetObject.renderTenseTabs === "function") {
          targetObject.renderTenseTabs();
        }
        if (render && typeof targetObject.renderActiveConjugations === "function") {
          targetObject.renderActiveConjugations({
            verb: contractRoute.targetInput,
            objectPrefix: contractRoute.objectPrefix,
            tense: contractRoute.tense
          });
        }
      };
      if (anchorElement && typeof preserveViewportAnchorPosition === "function") {
        preserveViewportAnchorPosition(anchorElement, applyActivation);
      } else {
        applyActivation();
      }
      const activation = {
        version: 1,
        outputKind: "denominal-andrews-contract-route-activation",
        contractId: contractRoute.contractId,
        routeTemplateId: contractRoute.routeTemplateId,
        executableRuleId: contractRoute.executableRuleId,
        executableRuleContract: contractRoute.executableRuleContract || null,
        sourceStem: contractRoute.sourceStem,
        targetInput: contractRoute.targetInput,
        targetVerbStem: contractRoute.targetVerbStem,
        tense: contractRoute.tense,
        objectPrefix: contractRoute.objectPrefix,
        request,
        activeContext,
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          usesExistingVncEngine: true,
          storesActiveAndrewsRouteContext: Boolean(activeContext),
          explicitUserRouteActivation: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
      return attachNawatDenominalAndrewsContractGrammarFrame(activation, {
        routeStage: "activate-finite-generation",
        generationAllowed: true,
        supported: true,
        diagnostics: contractRoute.routeDiagnostics,
        sourceEvidence: contractRoute.nextSourceEvidence || null,
        sourceStem: contractRoute.sourceStem,
        targetStem: contractRoute.targetVerbStem,
        targetInput: contractRoute.targetInput
      });
    }
    function previewNawatDenominalAndrewsContractRouteNextSource(route = null) {
      const sourceEvidence = buildNawatDenominalAndrewsRouteSourceEvidenceFromContractRoute(route);
      if (!route || !sourceEvidence) {
        return null;
      }
      const sourceStem = normalizeNawatDenominalContractSourceStem(sourceEvidence.sourceBaseStem || route.sourceStem || "");
      const routePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem,
        sourceEvidence
      });
      const preview = {
        version: 1,
        outputKind: "denominal-andrews-contract-route-next-source-preview",
        source: "denominal-andrews-contract-route",
        selectedRoute: {
          contractId: route.contractId || "",
          routeTemplateId: route.routeTemplateId || "",
          sourceStem: route.sourceStem || "",
          targetInput: route.targetInputValue || route.targetInput || route.targetVerbStem || "",
          targetVerbStem: route.targetVerbStem || ""
        },
        sourceEvidence,
        nextSource: {
          canBecomeSource: true,
          sourceVerb: route.targetInputValue || route.targetInput || route.targetVerbStem || "",
          displaySurface: route.targetVerbStem || route.targetInputValue || "",
          sourceEvidence
        },
        routePreview,
        candidateRouteCount: Array.isArray(routePreview?.routes) ? routePreview.routes.length : 0,
        boundaries: {
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          sourceEvidenceFromAndrewsContractRoute: true,
          classicalRuleSpellingsConvertedToNawat: true
        }
      };
      return attachNawatDenominalAndrewsContractGrammarFrame(preview, {
        routeStage: "preview-next-source",
        generationAllowed: false,
        supported: true,
        sourceEvidence,
        sourceStem,
        targetStem: route.targetVerbStem || "",
        targetInput: route.targetInputValue || route.targetInput || route.targetVerbStem || ""
      });
    }
    function generateNawatDenominalAndrewsContractRoutePreview({
      sourceStem = "",
      contractId = "",
      sourceEvidence = null
    } = {}) {
      const normalizedSourceStem = normalizeNawatDenominalContractSourceStem(sourceStem);
      const requestedContractId = String(contractId || "").trim();
      const contracts = getNawatDenominalAndrewsContractInventory().filter(contract => !requestedContractId || contract.id === requestedContractId);
      const routes = normalizedSourceStem ? contracts.flatMap(contract => {
        const templates = NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID[contract.id] || [];
        return templates.map(template => buildNawatDenominalAndrewsContractRoute(contract, template, {
          sourceStem: normalizedSourceStem,
          sourceEvidence
        })).filter(Boolean);
      }) : [];
      const finiteRoutes = routes.filter(route => route.finiteGenerationContractAvailable === true);
      const preview = {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54.2-55.7",
          role: "denominal-contract-route-preview"
        },
        outputKind: "denominal-andrews-contract-route-preview",
        sourceStem: normalizedSourceStem,
        requestedContractId,
        contractCount: contracts.length,
        routeCount: routes.length,
        finiteRouteRequestCount: finiteRoutes.length,
        finiteRouteObjectPrefixRequiredCount: finiteRoutes.filter(route => route.finiteGenerationRequiresObjectPrefix === true).length,
        finiteRouteStemClassContractCount: finiteRoutes.filter(route => route.targetStemClass).length,
        finiteRouteSourceEvidenceRequiredCount: routes.filter(route => route.finiteGenerationRequiresSourceEvidence === true).length,
        routeDiagnosticCount: routes.reduce((sum, route) => sum + Number(route.routeDiagnosticCount || 0), 0),
        routeWarningCount: routes.reduce((sum, route) => sum + Number(route.routeWarningCount || 0), 0),
        routeNoteCount: routes.reduce((sum, route) => sum + Number(route.routeNoteCount || 0), 0),
        ...(sourceEvidence && typeof sourceEvidence === "object" ? {
          sourceEvidence
        } : {}),
        routes,
        diagnostics: normalizedSourceStem ? [] : [{
          id: "denominal-contract-route-preview-missing-source-stem",
          severity: "warning",
          message: "A Nawat/Pipil source stem is required before Andrews denominal route contracts can generate VNC stems."
        }],
        boundaries: {
          noNewSurfaceForms: true,
          noFixtureEvidence: true,
          doesNotCreateLexicalEvidence: true,
          doesNotGenerateFiniteVnc: true,
          noFiniteVncSurface: true,
          generatesVncStemsOnly: true,
          classicalRuleSpellingsConvertedToNawat: true,
          finiteGenerationRequiresExplicitRequest: true,
          finiteGenerationRequiresTargetTense: true
        }
      };
      return attachNawatDenominalAndrewsContractGrammarFrame(preview, {
        routeStage: "preview-route-family",
        generationAllowed: false,
        supported: Boolean(normalizedSourceStem),
        sourceEvidence,
        sourceStem: normalizedSourceStem,
        diagnostics: preview.diagnostics
      });
    }
    function buildNawatDenominalRouteBoundaries(profile = null) {
      const hasAndrewsContract = hasAndrewsDenominalSuffixContract(profile);
      const boundaries = {
        noNewSurfaceForms: true,
        routeBasedOnly: true,
        suffixFamilyInventoryComplete: false,
        includedPossessorModeled: false,
        possessionDenominalModeled: false,
        temporalDenominalModeled: false,
        causativeApplicativeFamilyModeled: false
      };
      if (!hasAndrewsContract) {
        boundaries.noAndrewsSuffixContract = true;
      }
      return boundaries;
    }
    function buildNawatDenominalFamilyProfile(profile = null, {
      sourceState = "",
      sourceSurface = "",
      targetTenseValue = ""
    } = {}) {
      if (!profile || !isPatientivoTroncoConversionRoute(profile)) {
        return null;
      }
      const valency = String(profile.valency || "").trim();
      const verbalizer = String(profile.verbalizer || "").trim();
      return {
        version: 1,
        curriculumRef: getNawatDenominalRouteCurriculumRef(profile),
        outputKind: "denominal-route",
        routeFamily: getNawatDenominalRouteFamilyKey(profile),
        structuralAnalogue: getNawatDenominalRouteStructuralAnalogue(profile),
        routeId: profile.id || "",
        routePlacement: getNawatRoutePlacement(profile),
        routeProfileSource: profile.denominalFamily ? "static-modes" : "route-inference",
        sourceState: sourceState || "patientivo-tronco",
        sourceSlot: profile.sourceSlot || "",
        sourceCategory: profile.sourceCategory || "",
        sourceSurface: String(sourceSurface || "").trim(),
        suffixContract: getNawatDenominalRouteSuffixContract(profile),
        verbalizer,
        verbalizerType: profile.verbalizerType || "",
        valency,
        targetTense: targetTenseValue || getNawatRouteTargetTenseValue(profile),
        surfaceSuffix: profile.surfaceSuffix || "",
        andrewsContractCoverage: getNawatDenominalAndrewsContractCoverageSummary(),
        supportStatus: getNawatDenominalRouteSupportStatus(profile),
        isCompleteLesson54_55: false,
        boundaries: buildNawatDenominalRouteBoundaries(profile)
      };
    }
    function getNawatDenominalRouteFamilyInventory() {
      const familyOrder = ["vi-ti", "vi-iwi", "vi-awi", "vt-na", "unknown"];
      const familyMap = new Map();
      getNawatRouteProfiles().filter(profile => isPatientivoTroncoConversionRoute(profile)).forEach(profile => {
        const routeFamily = getNawatDenominalRouteFamilyKey(profile);
        const familyKey = routeFamily || "unknown";
        if (!familyMap.has(familyKey)) {
          familyMap.set(familyKey, {
            version: 1,
            curriculumRef: getNawatDenominalRouteCurriculumRef(profile),
            outputKind: "denominal-route-family-inventory",
            routeFamily: familyKey,
            structuralAnalogue: getNawatDenominalRouteStructuralAnalogue(profile),
            verbalizer: profile.verbalizer || "",
            verbalizerType: profile.verbalizerType || "",
            valency: profile.valency || "",
            routePlacement: getNawatRoutePlacement(profile),
            routeProfileSource: profile.denominalFamily ? "static-modes" : "route-inference",
            routeIds: [],
            routeTenseValues: [],
            targetTenses: [],
            surfaceSuffixes: [],
            sourceSlots: [],
            sourceCategories: [],
            supportStatus: getNawatDenominalRouteSupportStatus(profile, {
              inventory: true
            }),
            isCompleteLesson54_55: false,
            boundaries: buildNawatDenominalRouteBoundaries(profile)
          });
        }
        const entry = familyMap.get(familyKey);
        [["routeIds", profile.id || ""], ["routeTenseValues", profile.routeTenseValue || ""], ["targetTenses", getNawatRouteTargetTenseValue(profile)], ["surfaceSuffixes", profile.surfaceSuffix || ""], ["sourceSlots", profile.sourceSlot || ""], ["sourceCategories", profile.sourceCategory || ""]].forEach(([field, value]) => {
          if (value && !entry[field].includes(value)) {
            entry[field].push(value);
          }
        });
      });
      return Array.from(familyMap.values()).sort((left, right) => {
        const leftIndex = familyOrder.includes(left.routeFamily) ? familyOrder.indexOf(left.routeFamily) : familyOrder.length;
        const rightIndex = familyOrder.includes(right.routeFamily) ? familyOrder.indexOf(right.routeFamily) : familyOrder.length;
        if (leftIndex !== rightIndex) {
          return leftIndex - rightIndex;
        }
        return left.routeFamily.localeCompare(right.routeFamily);
      });
    }
    function generateNawatDenominalRouteFamilyPreview({
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceEvidence = null,
      andrewsContractSourceStem = ""
    } = {}) {
      const normalizedSourceVerb = String(sourceVerb || "").trim();
      const normalizedSourceObjectPrefix = String(sourceObjectPrefix || "").trim();
      const routes = getNawatRouteProfiles().filter(profile => isPatientivoTroncoConversionRoute(profile)).map(profile => {
        const routeTarget = resolveNawatRouteTarget(profile, {
          sourceVerb: normalizedSourceVerb,
          sourceObjectPrefix: normalizedSourceObjectPrefix
        });
        if (!routeTarget) {
          return null;
        }
        const stationModels = getNawatRouteStationModels(profile, {
          sourceVerb: normalizedSourceVerb,
          sourceObjectPrefix: normalizedSourceObjectPrefix,
          routeTarget
        });
        const sourceStateMetadata = resolveNawatRouteSourceStateMetadata(profile, {
          sourceVerb: normalizedSourceVerb,
          sourceObjectPrefix: normalizedSourceObjectPrefix,
          routeTarget,
          stationModels
        });
        return {
          routeId: profile.id || "",
          routeFamily: getNawatDenominalRouteFamilyKey(profile),
          structuralAnalogue: getNawatDenominalRouteStructuralAnalogue(profile),
          routeProfileSource: profile.denominalFamily ? "static-modes" : "route-inference",
          verbalizer: profile.verbalizer || "",
          verbalizerType: profile.verbalizerType || "",
          valency: profile.valency || "",
          sourceSlot: profile.sourceSlot || "",
          sourceCategory: profile.sourceCategory || "",
          sourceVerb: routeTarget.sourceVerb || normalizedSourceVerb,
          sourceStem: routeTarget.sourceStem || "",
          sourceSurface: sourceStateMetadata?.sourceSurface || "",
          targetVerb: routeTarget.targetVerb || "",
          targetTense: routeTarget.targetTenseValue || getNawatRouteTargetTenseValue(profile),
          surface: getNawatRouteFiniteSurfaceForm(profile, {
            sourceVerb: normalizedSourceVerb,
            sourceObjectPrefix: normalizedSourceObjectPrefix,
            routeTarget
          }),
          surfaceTrail: formatNawatRouteSurfaceTrailLabel(profile, {
            sourceVerb: normalizedSourceVerb,
            sourceObjectPrefix: normalizedSourceObjectPrefix,
            routeTarget,
            stationModels
          }),
          stages: buildNawatLinkedGrammarPathStages(profile, {
            sourceVerb: normalizedSourceVerb,
            sourceObjectPrefix: normalizedSourceObjectPrefix,
            routeTarget,
            stationModels
          }),
          surfaceSuffix: profile.surfaceSuffix || "",
          denominalFamilyProfile: sourceStateMetadata?.denominalFamilyProfile || null
        };
      }).filter(Boolean);
      const andrewsContractRouteSourceStem = normalizeNawatDenominalContractSourceStem(andrewsContractSourceStem || (sourceEvidence && typeof sourceEvidence === "object" ? sourceEvidence.sourceBaseStem : "")) || routes.find(route => route.sourceSurface)?.sourceSurface || routes.find(route => route.sourceStem)?.sourceStem || normalizeNawatDenominalContractSourceStem(normalizedSourceVerb);
      const andrewsContractRoutePreview = generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: andrewsContractRouteSourceStem,
        sourceEvidence
      });
      const preview = {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54-55",
          role: "structural-analogue"
        },
        outputKind: "denominal-route-family-preview",
        sourceVerb: normalizedSourceVerb,
        sourceObjectPrefix: normalizedSourceObjectPrefix,
        ...(sourceEvidence && typeof sourceEvidence === "object" ? {
          sourceEvidence
        } : {}),
        families: getNawatDenominalRouteFamilyInventory(),
        andrewsContracts: getNawatDenominalAndrewsContractInventory(),
        andrewsContractCoverage: getNawatDenominalAndrewsContractCoverageSummary(),
        andrewsContractRoutePreview,
        andrewsContractRouteCount: andrewsContractRoutePreview.routeCount,
        routes,
        supportStatus: "current-route-supported-partial",
        isCompleteLesson54_55: false,
        boundaries: {
          noNewSurfaceForms: true,
          routeBasedOnly: true,
          suffixFamilyInventoryComplete: false,
          includedPossessorModeled: false,
          possessionDenominalModeled: false,
          temporalDenominalModeled: false,
          causativeApplicativeFamilyModeled: false
        }
      };
      return attachNawatDenominalAndrewsContractGrammarFrame(preview, {
        routeStage: "preview-denominal-family",
        generationAllowed: false,
        supported: true,
        sourceEvidence,
        sourceStem: andrewsContractRouteSourceStem,
        diagnostics: andrewsContractRoutePreview?.diagnostics || []
      });
    }
    function resolveNawatRouteSourceStateMetadata(routeKeyOrProfile = "", {
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceStem = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      routeTarget = null,
      stationModels = null
    } = {}) {
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.routeTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
      if (!profile || !isPatientivoTroncoConversionRoute(profile)) {
        return null;
      }
      const explicitSourceStem = unwrapNawatRouteInputValue(sourceStem);
      const resolvedTarget = routeTarget && typeof routeTarget === "object" ? {
        ...routeTarget,
        sourceStem: routeTarget.sourceStem || explicitSourceStem
      } : resolveNawatRouteTarget(profile, {
        sourceVerb,
        sourceObjectPrefix,
        sourceStem: explicitSourceStem,
        sourceTenseValue,
        sourceCombinedMode
      });
      if (!resolvedTarget) {
        return null;
      }
      const stations = Array.isArray(stationModels) ? stationModels : getNawatRouteStationModels(profile, {
        sourceVerb,
        sourceObjectPrefix,
        routeTarget: resolvedTarget
      });
      const sourceStation = stations.find(station => station.key === "source-mode") || stations.find(station => station.role === "source") || null;
      const stemStation = stations.find(station => station.key === "stem") || stations.find(station => station.role === "stem") || null;
      const verbalizerStation = stations.find(station => station.key === "verbalizer") || null;
      const stemStationSurface = getNawatRouteStationSurfaceText(stemStation);
      const sourceSurface = String(stemStationSurface || (!hasStateResultFrame(stemStation) ? resolvedTarget.sourceStem || explicitSourceStem : "") || "").trim();
      const sourceInput = String(sourceStation?.inputValue || resolvedTarget.sourceVerb || sourceVerb || "").trim();
      const targetTenseValue = resolvedTarget.targetTenseValue || getNawatRouteTargetTenseValue(profile);
      const valency = String(profile.valency || "").trim();
      const sourceState = "patientivo-tronco";
      return {
        version: 1,
        routeId: profile.id || "",
        routeTenseValue: profile.routeTenseValue || "",
        routePlacement: getNawatRoutePlacement(profile),
        sourceMode: resolvedTarget.sourceMode || getNawatRouteOriginMode(profile),
        sourceTenseValue: resolvedTarget.sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
        sourceCombinedMode: resolvedTarget.sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "",
        sourceState,
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
        denominalFamilyProfile: buildNawatDenominalFamilyProfile(profile, {
          sourceState,
          sourceSurface,
          targetTenseValue
        }),
        stations: stations.map(summarizeNawatRouteSourceStateStation).filter(Boolean),
        flags: {
          denominal: true,
          patientivoTroncoConversion: true,
          transitive: valency === "transitive",
          intransitive: valency === "intransitive"
        }
      };
    }
    function resolveNawatRouteSourceContext(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = null,
      sourceStem = null,
      sourceTenseValue = null,
      sourceCombinedMode = null
    } = {}) {
      const currentRoute = profile?.id ? getActiveNawatRouteProfile() : null;
      const useCurrentRoute = Boolean(currentRoute?.id && currentRoute.id === profile.id);
      const verbMeta = typeof targetObject.getVerbInputMeta === "function" ? targetObject.getVerbInputMeta() : {};
      const routeSourceVerb = String((useCurrentRoute ? currentRoute.sourceVerb : "") || sourceVerb || verbMeta.parseInputVerb || verbMeta.regexInputVerb || verbMeta.displayVerb || "").trim();
      const routeSourceObjectPrefix = sourceObjectPrefix == null ? (useCurrentRoute ? currentRoute.sourceObjectPrefix : "") || (typeof targetObject.getCurrentObjectPrefix === "function" ? targetObject.getCurrentObjectPrefix() : "") : sourceObjectPrefix;
      const routeSourceStem = sourceStem == null ? useCurrentRoute ? currentRoute.sourceStem || "" : "" : sourceStem;
      const routeSourceTenseValue = sourceTenseValue == null ? useCurrentRoute ? currentRoute.sourceTenseValue || "" : "" : sourceTenseValue;
      const routeSourceCombinedMode = sourceCombinedMode == null ? useCurrentRoute ? currentRoute.sourceCombinedMode || "" : "" : sourceCombinedMode;
      return {
        sourceVerb: routeSourceVerb,
        sourceObjectPrefix: routeSourceObjectPrefix || "",
        sourceStem: unwrapNawatRouteInputValue(routeSourceStem),
        sourceTenseValue: routeSourceTenseValue || "",
        sourceCombinedMode: routeSourceCombinedMode || ""
      };
    }
    function getNawatRouteStationModels(routeKeyOrProfile = "", {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.routeTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
      if (!profile) {
        return [];
      }
      const resolvedTarget = routeTarget && typeof routeTarget === "object" ? routeTarget : resolveNawatRouteTarget(profile, {
        sourceVerb,
        sourceObjectPrefix
      });
      const routeSourceVerb = String(resolvedTarget?.sourceVerb || sourceVerb || "").trim();
      const routeSourceObjectPrefix = resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix || "";
      const explicitRouteStem = String(resolvedTarget?.sourceStem || "").trim();
      const sourceMode = resolvedTarget?.sourceMode || getNawatRouteOriginMode(profile);
      const sourceTenseValue = resolvedTarget?.sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile);
      const nominalStemMode = targetObject.TENSE_MODE.sustantivo;
      const nominalStemTenseValue = "patientivo";
      const targetMode = resolvedTarget?.targetMode || getNawatRouteTargetMode(profile);
      const targetTenseValue = resolvedTarget?.targetTenseValue || getNawatRouteTargetTenseValue(profile);
      const targetVerb = String(resolvedTarget?.targetVerb || routeSourceVerb || "").trim();
      const targetObjectPrefix = resolvedTarget?.targetObjectPrefix || "";
      const sourceCombinedMode = resolvedTarget?.sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || "";
      const targetCombinedMode = resolvedTarget?.targetCombinedMode || profile.targetCombinedMode || profile.combinedMode || "";
      const sourceDerivationMode = profile.sourceDerivationMode || (sourceCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : "") || (sourceCombinedMode === targetObject.COMBINED_MODE.active ? targetObject.DERIVATION_MODE.active : "");
      const sourceVoiceMode = profile.sourceVoiceMode || (sourceCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : "") || (sourceCombinedMode === targetObject.COMBINED_MODE.active ? targetObject.VOICE_MODE.active : "");
      const targetDerivationMode = resolvedTarget?.targetDerivationMode || profile.targetDerivationMode || profile.derivationMode || (targetCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : "") || (targetCombinedMode === targetObject.COMBINED_MODE.active ? targetObject.DERIVATION_MODE.active : "");
      const targetVoiceMode = resolvedTarget?.targetVoiceMode || profile.targetVoiceMode || profile.voiceMode || (targetCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : "") || (targetCombinedMode === targetObject.COMBINED_MODE.active ? targetObject.VOICE_MODE.active : "");
      const sourceScope = sourceCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VERB_SOURCE_SCOPE.nonactive : sourceCombinedMode === targetObject.COMBINED_MODE.active ? targetObject.VERB_SOURCE_SCOPE.active : "";
      const targetSourceScope = targetCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VERB_SOURCE_SCOPE.nonactive : targetCombinedMode === targetObject.COMBINED_MODE.active ? targetObject.VERB_SOURCE_SCOPE.active : "";
      const routeStem = explicitRouteStem || stripNawatRouteVerbalizerFromTarget(profile, targetVerb);
      const targetInputValue = targetVerb ? formatNawatRouteTargetInputValue(profile, {
        routeStem,
        targetVerb
      }) : "";
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
        sourceScope
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
        sourceScope
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
        sourceScope: targetSourceScope
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
        sourceScope: targetSourceScope
      };
      if (isDirectFiniteRoute(profile)) {
        return [baseSourceModeStation, {
          ...baseFiniteStation,
          inputValue: routeSourceVerb,
          renderVerb: targetVerb || routeSourceVerb
        }].filter(station => station.inputValue || station.renderVerb || station.key === "source-mode");
      }
      if (isNonactiveHabitualRoute(profile)) {
        const nonactiveLabel = getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], false, "no activo");
        return [baseSourceModeStation, baseSourceTenseStation, {
          key: "nonactive-switch",
          aliases: ["nonactive", "no-activo", "derivation"],
          role: "derivation",
          text: nonactiveLabel,
          nawatText: getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], true, nonactiveLabel),
          mode: targetObject.TENSE_MODE.verbo,
          tenseValue: sourceTenseValue,
          inputValue: routeSourceVerb,
          renderVerb: routeSourceVerb,
          objectPrefix: routeSourceObjectPrefix,
          combinedMode: targetObject.COMBINED_MODE.nonactive,
          derivationMode: targetObject.DERIVATION_MODE.nonactive,
          voiceMode: targetObject.VOICE_MODE.passive,
          sourceScope: targetObject.VERB_SOURCE_SCOPE.nonactive,
          surface: nonactiveLabel
        }, {
          ...baseTargetModeStation,
          aliases: ["target", "verbo"],
          inputValue: routeSourceVerb,
          renderVerb: targetVerb || routeSourceVerb
        }, {
          ...baseFiniteStation,
          inputValue: routeSourceVerb,
          renderVerb: targetVerb || routeSourceVerb
        }].filter(station => station.inputValue || station.renderVerb || station.key === "source-mode");
      }
      if (isPatientivoSurfaceRoute(profile)) {
        const patientivoSurfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, {
          sourceTenseValue,
          sourceCombinedMode
        });
        const patientivoSource = patientivoSurfaceSpec?.patientivoSource || profile.patientivoSource || "nonactive";
        const patientivoCombinedMode = isNawatPatientivoNonactiveSource(patientivoSource) || patientivoSurfaceSpec?.sourceCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        const patientivoDerivationMode = patientivoCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active;
        const patientivoVoiceMode = patientivoCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active;
        const patientivoSourceScope = patientivoCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VERB_SOURCE_SCOPE.nonactive : targetObject.VERB_SOURCE_SCOPE.active;
        const patientivoSourceLabel = getPatientivoSourceTenseLabel(patientivoSource, false);
        const patientivoSurfaceLabel = ["patientivo", patientivoSourceLabel].filter(Boolean).join(" · ");
        const nominalSuffix = String(patientivoSurfaceSpec?.surfaceSuffix || profile.surfaceSuffix || (profile.patientivoNominalSuffix ? `-${String(profile.patientivoNominalSuffix).replace(/^-+/, "")}` : "-ti")).trim();
        return [{
          ...baseSourceModeStation,
          combinedMode: patientivoCombinedMode,
          derivationMode: patientivoDerivationMode,
          voiceMode: patientivoVoiceMode,
          sourceScope: patientivoSourceScope
        }, {
          ...baseSourceTenseStation,
          combinedMode: patientivoCombinedMode,
          derivationMode: patientivoDerivationMode,
          voiceMode: patientivoVoiceMode,
          sourceScope: patientivoSourceScope
        }, {
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
          surface: patientivoSurfaceLabel
        }, {
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
          surface: nominalSuffix
        }, {
          ...baseTargetModeStation,
          aliases: ["target", "sustantivo"],
          inputValue: routeSourceVerb,
          renderVerb: routeSourceVerb,
          combinedMode: patientivoCombinedMode,
          derivationMode: patientivoDerivationMode,
          voiceMode: patientivoVoiceMode,
          sourceScope: patientivoSourceScope,
          patientivoSource
        }, {
          ...baseFiniteStation,
          inputValue: routeSourceVerb,
          renderVerb: routeSourceVerb,
          combinedMode: patientivoCombinedMode,
          derivationMode: patientivoDerivationMode,
          voiceMode: patientivoVoiceMode,
          sourceScope: patientivoSourceScope,
          patientivoSource
        }].filter(station => station.inputValue || station.renderVerb || station.key === "source-mode");
      }
      const stemInputValue = routeStem || routeSourceVerb;
      const verbalizerStationText = formatNawatRouteStemLabel(profile);
      return [baseSourceModeStation, baseSourceTenseStation, {
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
        combinedMode: targetObject.COMBINED_MODE.active,
        derivationMode: targetObject.DERIVATION_MODE.active,
        voiceMode: targetObject.VOICE_MODE.active,
        sourceScope: targetObject.VERB_SOURCE_SCOPE.active,
        patientivoSource: "tronco-verbal",
        surface: stemInputValue
      }, {
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
        combinedMode: targetCombinedMode || targetObject.COMBINED_MODE.active,
        derivationMode: targetDerivationMode || targetObject.DERIVATION_MODE.active,
        voiceMode: targetVoiceMode || targetObject.VOICE_MODE.active,
        sourceScope: targetSourceScope || targetObject.VERB_SOURCE_SCOPE.active,
        surface: targetVerb
      }, {
        ...baseTargetModeStation,
        aliases: ["target", "verbo"],
        tenseValue: verbalizedTenseValue,
        inputValue: targetInputValue,
        renderVerb: targetInputValue || targetVerb,
        combinedMode: targetCombinedMode || targetObject.COMBINED_MODE.active,
        derivationMode: targetDerivationMode || targetObject.DERIVATION_MODE.active,
        voiceMode: targetVoiceMode || targetObject.VOICE_MODE.active,
        sourceScope: targetSourceScope || targetObject.VERB_SOURCE_SCOPE.active,
        surface: targetVerb
      }, {
        ...baseFiniteStation,
        aliases: ["finite", "surface", targetTenseValue],
        inputValue: targetInputValue,
        renderVerb: targetInputValue || targetVerb,
        combinedMode: targetCombinedMode || targetObject.COMBINED_MODE.active,
        derivationMode: targetDerivationMode || targetObject.DERIVATION_MODE.active,
        voiceMode: targetVoiceMode || targetObject.VOICE_MODE.active,
        sourceScope: targetSourceScope || targetObject.VERB_SOURCE_SCOPE.active
      }].filter(station => station.inputValue || station.renderVerb || station.key === "source-mode");
    }
    function getNawatRouteStationModel(routeKeyOrProfile = "", stationKey = "", options = {}) {
      const requestedKey = normalizeNawatRouteStationKey(stationKey);
      const stations = getNawatRouteStationModels(routeKeyOrProfile, options);
      if (!stations.length) {
        return null;
      }
      if (!requestedKey) {
        return stations.find(station => station.key === "finite-tense") || stations[stations.length - 1];
      }
      return stations.find(station => station.key === requestedKey || Array.isArray(station.aliases) && station.aliases.includes(stationKey) || Array.isArray(station.aliases) && station.aliases.includes(requestedKey)) || null;
    }
    function formatNawatRouteStationConversionLabel(profile = null, stationKey = "", isNawat = false, {
      stationModels = null
    } = {}) {
      const stations = Array.isArray(stationModels) ? stationModels : getNawatRouteStationModels(profile, {
        sourceVerb: profile?.sourceVerb || "",
        sourceObjectPrefix: profile?.sourceObjectPrefix || "",
        routeTarget: profile
      });
      const requestedKey = normalizeNawatRouteStationKey(stationKey || profile?.activeStationKey || "");
      const index = requestedKey ? stations.findIndex(station => station.key === requestedKey) : -1;
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
      const activeProfile = {
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
          sourceCombinedMode: state.sourceCombinedMode || ""
        }),
        activeStationKey: state.activeStationKey || "",
        activeStationInput: state.activeStationInput || "",
        activeStationVerb: state.activeStationVerb || "",
        activeStationMode: state.activeStationMode || "",
        activeStationTenseValue: state.activeStationTenseValue || "",
        activeStationObjectPrefix: state.activeStationObjectPrefix || ""
      };
      return attachNawatStaticRouteGrammarFrame(activeProfile, {
        profile,
        routeStage: "active-route-profile",
        generationAllowed: true,
        supported: true
      });
    }
    function setActiveNawatRouteProfile(routeKey = "", routeTarget = null) {
      const profile = getNawatRouteProfile(routeKey);
      const routeId = profile?.id || "";
      const state = getNawatRouteStateStore();
      state.activeRoute = routeId;
      const resolvedTarget = routeTarget && typeof routeTarget === "object" ? routeTarget : {};
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
        sourceCombinedMode: resolvedTarget.sourceCombinedMode || ""
      });
      state.activeStationKey = resolvedTarget.activeStationKey || "";
      state.activeStationInput = resolvedTarget.activeStationInput || "";
      state.activeStationVerb = resolvedTarget.activeStationVerb || "";
      state.activeStationMode = resolvedTarget.activeStationMode || "";
      state.activeStationTenseValue = resolvedTarget.activeStationTenseValue || "";
      state.activeStationObjectPrefix = resolvedTarget.activeStationObjectPrefix || "";
      if (!profile) {
        return null;
      }
      const activeProfile = {
        ...cloneNawatRouteProfile(profile, profile.routeTenseValue || ""),
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
        activeStationObjectPrefix: state.activeStationObjectPrefix
      };
      return attachNawatStaticRouteGrammarFrame(activeProfile, {
        profile,
        routeStage: "active-route-profile",
        generationAllowed: true,
        supported: true
      });
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
      state.activeLocativeMatrixSpecId = "";
      state.activeLocativePrelocativeVerb = "";
      state.activeLocativePromotedObjectPrefix = "";
      state.activeLocativeSourcePossessorPrefix = "";
      clearActiveNawatLinkedGrammarPathSelections({
        stateStore: state
      });
      if (typeof targetObject.window !== "undefined") {
        targetObject.window.__NAWAT_ACTIVE_PATIENTIVO_BRANCH__ = "imperfectivo";
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
      const finiteStation = stations.find(station => station?.id === "finite-tense");
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
      const routeMode = profile.routeMode || "";
      const routeTenseValue = profile.routeTenseValue || "";
      const modeLabel = getEuropeanConventionModeLabel(routeMode);
      const tenseLabel = routeTenseValue ? getLocalizedLabel(targetObject.TENSE_LABELS[routeTenseValue], isNawat, routeTenseValue) : "";
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
      const tenseLabel = targetTenseValue ? getLocalizedLabel(targetObject.TENSE_LABELS[targetTenseValue], isNawat, targetTenseValue) : "";
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
      const tenseLabel = originTenseValue ? getLocalizedLabel(targetObject.TENSE_LABELS[originTenseValue], isNawat, originTenseValue) : "";
      const destination = [modeLabel, tenseLabel].filter(Boolean).join(" > ");
      return destination ? `Nawat: ${destination}` : "";
    }
    function applyNawatRouteStationInput(station = null) {
      const inputValue = String(station?.inputValue || "").trim();
      if (!inputValue || typeof targetObject.document === "undefined") {
        return;
      }
      const verbEl = targetObject.document.getElementById("verb");
      if (!verbEl) {
        return;
      }
      verbEl.value = inputValue;
      verbEl.dataset.prevValue = inputValue;
      if (typeof targetObject.getSearchParts === "function" && typeof targetObject.rememberNonSearchValue === "function") {
        targetObject.rememberNonSearchValue(targetObject.getSearchParts(inputValue));
      }
      if (typeof targetObject.parseVerbInput === "function" && typeof targetObject.getSearchInputBase === "function") {
        verbEl.dataset.lastClassVerb = targetObject.parseVerbInput(targetObject.getSearchInputBase(inputValue)).verb;
      }
      if (typeof targetObject.renderVerbMirror === "function") {
        targetObject.renderVerbMirror();
      }
      if (typeof targetObject.syncComposerStateFromVerbInput === "function" && typeof targetObject.renderVerbComposerFromState === "function" && (typeof targetObject.VerbComposerState === "undefined" || !targetObject.VerbComposerState.isApplying)) {
        targetObject.syncComposerStateFromVerbInput(inputValue);
        targetObject.renderVerbComposerFromState();
      }
    }
    function activateNawatRouteStation(routeKey = "", stationKey = "", {
      render = false,
      anchorElement = null,
      sourceVerb = "",
      sourceObjectPrefix = null,
      sourceStem = null,
      sourceTenseValue = null,
      sourceCombinedMode = null
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
        sourceCombinedMode
      });
      const routeTarget = resolveNawatRouteTarget(profile, sourceContext);
      if (!routeTarget) {
        return null;
      }
      const station = getNawatRouteStationModel(profile, stationKey || "finite-tense", {
        ...sourceContext,
        routeTarget
      });
      if (!station?.mode || !station?.tenseValue) {
        return null;
      }
      setActiveTenseMode(station.mode, {
        modeSystem: targetObject.TENSE_MODE_SYSTEM.nawat || "nawat"
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
        setVerbSourceScope(station.sourceScope, {
          syncCombinedMode: false
        });
      }
      if (station.patientivoSource) {
        const routeStore = getNawatRouteStateStore();
        const patientivoNominalSuffix = resolveNawatRoutePatientivoNominalSuffix(profile, {
          sourceTenseValue: sourceContext.sourceTenseValue,
          sourceCombinedMode: sourceContext.sourceCombinedMode
        });
        routeStore.activePatientivoBranch = station.patientivoSource;
        routeStore.activePatientivoNominalSuffix = patientivoNominalSuffix;
        if (typeof setToggleStateValue === "function" && typeof getPatientivoNominalSuffixKey === "function" && typeof targetObject.SUSTANTIVO_VERBAL_PREFIXES !== "undefined" && typeof targetObject.PatientivoNominalSuffixState !== "undefined" && targetObject.PatientivoNominalSuffixState) {
          setToggleStateValue(targetObject.PatientivoNominalSuffixState, getPatientivoNominalSuffixKey(Array.from(targetObject.SUSTANTIVO_VERBAL_PREFIXES).join("|")), patientivoNominalSuffix, {
            syncLock: true
          });
        }
      }
      mutateConjugationSelectionState({
        tenseMode: station.mode,
        group: targetObject.CONJUGATION_GROUPS.tense,
        tenseValue: station.tenseValue,
        classFilter: null
      }, {
        tenseMode: station.mode
      });
      const stationRouteTarget = {
        ...routeTarget,
        activeRouteTravelSource: "chip",
        activePatientivoBranch: station.patientivoSource || profile.patientivoSource || "",
        activePatientivoNominalSuffix: station.patientivoSource ? resolveNawatRoutePatientivoNominalSuffix(profile, {
          sourceTenseValue: sourceContext.sourceTenseValue,
          sourceCombinedMode: sourceContext.sourceCombinedMode
        }) : "",
        activeStationKey: station.key,
        activeStationInput: station.inputValue || "",
        activeStationVerb: station.renderVerb || "",
        activeStationMode: station.mode || "",
        activeStationTenseValue: station.tenseValue || "",
        activeStationObjectPrefix: station.objectPrefix || ""
      };
      const framedStationRouteTarget = attachNawatStaticRouteGrammarFrame(stationRouteTarget, {
        profile,
        routeStage: "activate-station",
        generationAllowed: true,
        supported: true
      });
      const activatedProfile = setActiveNawatRouteProfile(profile.id || routeKey, framedStationRouteTarget);
      if (!render) {
        return activatedProfile;
      }
      const rerender = () => {
        applyNawatRouteStationInput(station);
        updateTenseModeTabs();
        targetObject.renderTenseTabs();
        targetObject.renderActiveConjugations({
          verb: station.renderVerb || station.inputValue || routeTarget.targetVerb || routeTarget.sourceVerb,
          objectPrefix: station.objectPrefix || "",
          tense: station.tenseValue
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
    function resolveActiveAdjectiveClassPolicy({
      tenseValue = "",
      sourceTense = "",
      isAdjectiveMode = false,
      hasSlashMarker = false,
      hasBoundMarker = false,
      inputMatrix = "",
      candidateMatrix = ""
    } = {}) {
      const defaultPolicy = {
        classFilter: null,
        forceClassBSelection: false,
        preferredFinalYaSurfaceMode: ""
      };
      if (!isAdjectiveMode) {
        return defaultPolicy;
      }
      const profileType = getActiveAdjectiveProfileType(tenseValue);
      if (!profileType) {
        return defaultPolicy;
      }
      const isTroncoNajProfile = profileType === "adjetivo-tronco-naj-preterito-simple" || profileType === "adjetivo-tronco-naj-preterito-compuesto";
      if (isTroncoNajProfile) {
        // -naj adjectives use a dedicated precomputed wrapper path and must not
        // inherit matrix-/ya adjective forcing from direct active adjectives.
        return defaultPolicy;
      }
      const normalizedInputMatrix = targetObject.normalizeRuleBase(inputMatrix);
      const normalizedCandidateMatrix = targetObject.normalizeRuleBase(candidateMatrix);
      const isSlashYaInput = hasSlashMarker && hasBoundMarker && normalizedInputMatrix === "ya";
      if (isSlashYaInput) {
        const preferredFinalYaSurfaceMode = sourceTense === "preterito" ? "deleted-pret" : "";
        return {
          classFilter: sourceTense === "perfecto" ? "A" : "B",
          forceClassBSelection: sourceTense === "perfecto" ? false : true,
          preferredFinalYaSurfaceMode
        };
      }
      if (normalizedCandidateMatrix.endsWith("tiya")) {
        const preferredFinalYaSurfaceMode = sourceTense === "perfecto" ? "deleted-perfect" : "deleted-pret";
        return {
          classFilter: "B",
          forceClassBSelection: true,
          preferredFinalYaSurfaceMode
        };
      }
      if (normalizedCandidateMatrix.endsWith("ya")) {
        const preferredFinalYaSurfaceMode = sourceTense === "preterito" ? "deleted-pret" : "";
        return {
          classFilter: sourceTense === "perfecto" ? "A" : "B",
          forceClassBSelection: sourceTense === "perfecto" ? false : true,
          preferredFinalYaSurfaceMode
        };
      }
      return defaultPolicy;
    }
    function selectPreferredActiveAdjectiveForms(forms = [], {
      sourceVerb = "",
      sourceTense = "",
      selectionMode = "",
      isYawi = false,
      isWeya = false
    } = {}) {
      const list = Array.isArray(forms) ? forms.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      if (!selectionMode || !list.length) {
        return list;
      }
      const normalizedSource = targetObject.normalizeRuleBase(sourceVerb);
      const deletedFinalYaBase = normalizedSource.endsWith("ya") ? targetObject.resolveFinalYaImmediateHostBase(normalizedSource, {
        isTransitive: false,
        isYawi,
        isWeya,
        requirePronounceable: false
      }) || normalizedSource.slice(0, -2) : "";
      let preferredTargets = [];
      if (selectionMode === "deleted-pret" && deletedFinalYaBase) {
        preferredTargets = [`${deletedFinalYaBase}k`];
      } else if (selectionMode === "deleted-perfect" && deletedFinalYaBase) {
        preferredTargets = [deletedFinalYaBase];
      }
      let filtered = preferredTargets.length ? list.filter(formValue => preferredTargets.includes(targetObject.normalizeRuleBase(formValue))) : [];
      if (!filtered.length && selectionMode === "deleted-pret") {
        filtered = list.filter(formValue => {
          const normalized = targetObject.normalizeRuleBase(formValue);
          return normalized.endsWith("k") && !normalized.endsWith("yak");
        });
      }
      if (!filtered.length && selectionMode === "deleted-perfect" && deletedFinalYaBase) {
        filtered = list.filter(formValue => {
          const normalized = targetObject.normalizeRuleBase(formValue);
          return normalized.startsWith(deletedFinalYaBase) && !normalized.startsWith(normalizedSource);
        });
      }
      if (!filtered.length) {
        return list;
      }
      return filtered;
    }

    // === Mode State Accessors ===
    function getActiveConjugationGroup() {
      return targetObject.ConjugationGroupState.activeGroup;
    }
    function setActiveConjugationGroup(group) {
      if (group !== targetObject.CONJUGATION_GROUPS.tense && group !== targetObject.CONJUGATION_GROUPS.universal) {
        return;
      }
      if (targetObject.ConjugationGroupState.activeGroup !== group) {
        const tenseValue = group === targetObject.CONJUGATION_GROUPS.universal ? getSelectedPretUniversalTab() : getSelectedTenseTab();
        resetToggleStateForTense(tenseValue);
      }
      targetObject.ConjugationGroupState.activeGroup = group;
    }
    function getActiveTenseMode() {
      return targetObject.TenseModeState.mode;
    }
    function getModeSystemValue(system = "") {
      const normalized = String(system || "").trim();
      if (!normalized) {
        return "";
      }
      return targetObject.TENSE_MODE_SYSTEM[normalized] || normalized;
    }
    function isUnitModeSystem(system = "") {
      const normalized = getModeSystemValue(system);
      return normalized === (targetObject.TENSE_MODE_SYSTEM.unit || "unit") || normalized === "unit" || normalized === (targetObject.TENSE_MODE_SYSTEM.nawat || "nawat") || normalized === "nawat";
    }
    function isFunctionModeSystem(system = "") {
      const normalized = getModeSystemValue(system);
      return normalized === (targetObject.TENSE_MODE_SYSTEM.function || "function") || normalized === "function" || normalized === (targetObject.TENSE_MODE_SYSTEM.european || "european") || normalized === "european";
    }
    function getFunctionRoleForTenseMode(mode = "") {
      const normalized = String(mode || "").trim();
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verbo") {
        return "verbal";
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "sustantivo") {
        return "nominal";
      }
      if (normalized === targetObject.TENSE_MODE.adjetivo || normalized === "adjetivo") {
        return "adjectival";
      }
      if (normalized === targetObject.TENSE_MODE.adverbio || normalized === "adverbio") {
        return "adverbial";
      }
      return "";
    }
    function getTenseModeForFunctionRole(role = "") {
      const normalized = String(role || "").trim();
      if (normalized === "verbal" || normalized === "verb" || normalized === "verbo") {
        return targetObject.TENSE_MODE.verbo;
      }
      if (normalized === "nominal" || normalized === "noun" || normalized === "sustantivo") {
        return targetObject.TENSE_MODE.sustantivo;
      }
      if (normalized === "adjectival" || normalized === "adjective" || normalized === "adjetivo") {
        return targetObject.TENSE_MODE.adjetivo;
      }
      if (normalized === "adverbial" || normalized === "adverb" || normalized === "adverbio") {
        return targetObject.TENSE_MODE.adverbio;
      }
      return "";
    }
    function getUnitKindForTenseMode(mode = "") {
      const normalized = String(mode || "").trim();
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verbo") {
        return "cnv";
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "sustantivo") {
        return "cnn";
      }
      if (normalized === targetObject.TENSE_MODE.particula || normalized === "particula") {
        return "particula";
      }
      return "";
    }
    function getTenseModeForUnitKind(kind = "") {
      const normalized = String(kind || "").trim();
      if (normalized === "cnv" || normalized === "vnc" || normalized === "verbo") {
        return targetObject.TENSE_MODE.verbo;
      }
      if (normalized === "cnn" || normalized === "nnc" || normalized === "sustantivo") {
        return targetObject.TENSE_MODE.sustantivo;
      }
      if (normalized === "particula" || normalized === "particle") {
        return targetObject.TENSE_MODE.particula || "particula";
      }
      return "";
    }
    function getNawatTenseModeValue(mode = "") {
      const normalized = String(mode || "").trim();
      if (!normalized) {
        return "";
      }
      if (Object.values(targetObject.NAWAT_TENSE_MODE || {}).includes(normalized)) {
        return normalized;
      }
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verbo") {
        return targetObject.NAWAT_TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo;
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "sustantivo") {
        return targetObject.NAWAT_TENSE_MODE.sustantivo || targetObject.TENSE_MODE.sustantivo;
      }
      if (normalized === "particula") {
        return targetObject.NAWAT_TENSE_MODE.particula || "particula";
      }
      return "";
    }
    function getNawatOutputTenseMode(mode = "") {
      const nawatMode = getNawatTenseModeValue(mode);
      if (nawatMode === (targetObject.NAWAT_TENSE_MODE.sustantivo || targetObject.TENSE_MODE.sustantivo)) {
        return targetObject.TENSE_MODE.sustantivo;
      }
      if (nawatMode === (targetObject.NAWAT_TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo)) {
        return targetObject.TENSE_MODE.verbo;
      }
      if (nawatMode === (targetObject.NAWAT_TENSE_MODE.particula || targetObject.TENSE_MODE.particula || "particula")) {
        return targetObject.TENSE_MODE.particula || "particula";
      }
      return "";
    }
    function setStoredEuropeanTenseMode(mode = "") {
      if (!Object.values(targetObject.TENSE_MODE).includes(mode)) {
        return "";
      }
      if (typeof targetObject.EuropeanTenseModeState !== "undefined" && targetObject.EuropeanTenseModeState) {
        targetObject.EuropeanTenseModeState.mode = mode;
      }
      return mode;
    }
    function setStoredNawatTenseMode(mode = "") {
      const nawatMode = getNawatTenseModeValue(mode);
      if (!nawatMode) {
        return "";
      }
      if (typeof targetObject.NawatTenseModeState !== "undefined" && targetObject.NawatTenseModeState) {
        targetObject.NawatTenseModeState.mode = nawatMode;
      }
      return nawatMode;
    }
    function getActiveEuropeanTenseMode() {
      return getActiveFunctionMode();
    }
    function getActiveFunctionMode() {
      return typeof targetObject.EuropeanTenseModeState !== "undefined" && targetObject.EuropeanTenseModeState?.mode ? targetObject.EuropeanTenseModeState.mode : getActiveTenseMode();
    }
    function getActiveNawatTenseMode() {
      return typeof targetObject.NawatTenseModeState !== "undefined" && targetObject.NawatTenseModeState?.mode ? targetObject.NawatTenseModeState.mode : targetObject.NAWAT_TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo || "";
    }
    function getActiveFunctionRole() {
      return getFunctionRoleForTenseMode(getActiveFunctionMode());
    }
    function getActiveUnitKind() {
      return getUnitKindForTenseMode(getActiveNawatTenseModeForCurrentSelection());
    }
    function setActiveTenseMode(mode, {
      modeSystem = targetObject.TENSE_MODE_SYSTEM.european || "european",
      syncConventionState = true,
      clearRoute = true
    } = {}) {
      if (!Object.values(targetObject.TENSE_MODE).includes(mode)) {
        return;
      }
      if (targetObject.TenseModeState.mode !== mode) {
        if (!isToggleLockEnabled()) {
          clearAllToggleStateMaps({
            resetNonactiveSuffix: false
          });
        }
      }
      targetObject.TenseModeState.mode = mode;
      if (syncConventionState) {
        const system = getModeSystemValue(modeSystem);
        if (isUnitModeSystem(system)) {
          setStoredNawatTenseMode(mode);
        } else {
          setStoredEuropeanTenseMode(mode);
        }
      }
      if (clearRoute && mode !== targetObject.TENSE_MODE.adjetivo) {
        clearActiveNawatRouteProfile();
      }
      if (targetObject.isNominalTenseMode(mode)) {
        applyResolvedConjugationSelectionState(resolveConjugationSelectionState({
          tenseMode: mode,
          group: targetObject.CONJUGATION_GROUPS.tense,
          classFilter: null
        }, {
          tenseMode: mode,
          availabilityEntries: []
        }));
      }
    }
    function setActiveFunctionMode(mode, {
      syncOutput = true
    } = {}) {
      const storedMode = setStoredEuropeanTenseMode(mode);
      if (!storedMode) {
        return;
      }
      if (syncOutput) {
        setActiveTenseMode(storedMode, {
          modeSystem: targetObject.TENSE_MODE_SYSTEM.function || targetObject.TENSE_MODE_SYSTEM.european || "function"
        });
      }
    }
    function setActiveEuropeanTenseMode(mode, options = {}) {
      return setActiveFunctionMode(mode, options);
    }
    function setActiveFunctionRole(role, options = {}) {
      const mode = getTenseModeForFunctionRole(role);
      if (!mode) {
        return "";
      }
      setActiveFunctionMode(mode, options);
      return mode;
    }
    function setActiveUnitMode(mode, {
      syncOutput = true
    } = {}) {
      const storedMode = setStoredNawatTenseMode(mode);
      if (!storedMode) {
        return;
      }
      const outputMode = getNawatOutputTenseMode(storedMode);
      if (syncOutput && outputMode) {
        setActiveTenseMode(outputMode, {
          modeSystem: targetObject.TENSE_MODE_SYSTEM.unit || targetObject.TENSE_MODE_SYSTEM.nawat || "unit"
        });
      }
    }
    function setActiveNawatTenseMode(mode, options = {}) {
      return setActiveUnitMode(mode, options);
    }
    function setActiveUnitKind(kind, options = {}) {
      const mode = getTenseModeForUnitKind(kind);
      if (!mode) {
        return "";
      }
      setActiveUnitMode(mode, options);
      return mode;
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
      if (normalized === "animate" || normalized === "inanimate") {
        return normalized;
      }
      return "";
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
        predicateFormula: formatOrdinaryNncGenerationAnalogueInput({
          stem,
          nounClass
        })
      };
    }
    function formatOrdinaryNncGenerationAnalogueInput({
      stem = "",
      nounClass = ""
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
      if (Array.isArray(targetObject.POSSESSIVE_PREFIXES) && targetObject.POSSESSIVE_PREFIXES.length) {
        return targetObject.POSSESSIVE_PREFIXES.map(entry => String(entry?.value || ""));
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
      return Array.isArray(targetObject.SUBJECT_COMBINATIONS) && targetObject.SUBJECT_COMBINATIONS.length ? targetObject.SUBJECT_COMBINATIONS : [{
        id: "third-person",
        personSubKey: "3sg",
        subjectPrefix: "",
        subjectSuffix: ""
      }, {
        id: "3-pl",
        personSubKey: "3pl",
        subjectPrefix: "",
        subjectSuffix: "t"
      }];
    }
    function normalizeOrdinaryNncGenerationSubject({
      subjectPrefix = "",
      subjectSuffix = "",
      subjectKey = "",
      personSubKey = ""
    } = {}) {
      const requestedKey = String(subjectKey || personSubKey || "").trim();
      const prefix = String(subjectPrefix || "");
      const suffix = String(subjectSuffix || "");
      const entries = getOrdinaryNncGenerationSubjectEntries();
      const entry = entries.find(candidate => requestedKey && (candidate.personSubKey === requestedKey || candidate.id === requestedKey)) || entries.find(candidate => String(candidate.subjectPrefix || "") === prefix && String(candidate.subjectSuffix || "") === suffix) || entries.find(candidate => candidate.personSubKey === "3sg") || entries[0] || null;
      return {
        subjectPrefix: String(entry?.subjectPrefix || ""),
        subjectSuffix: String(entry?.subjectSuffix || ""),
        subjectKey: String(entry?.personSubKey || "3sg")
      };
    }
    function getOrdinaryNncGenerationState() {
      const subject = normalizeOrdinaryNncGenerationSubject({
        subjectPrefix: targetObject.OrdinaryNncGenerationState.subjectPrefix,
        subjectSuffix: targetObject.OrdinaryNncGenerationState.subjectSuffix,
        subjectKey: targetObject.OrdinaryNncGenerationState.subjectKey
      });
      return {
        enabled: targetObject.OrdinaryNncGenerationState.enabled === true,
        state: normalizeOrdinaryNncGenerationStateValue(targetObject.OrdinaryNncGenerationState.state),
        number: normalizeOrdinaryNncGenerationNumber(targetObject.OrdinaryNncGenerationState.number),
        pluralType: normalizeOrdinaryNncGenerationPluralType(targetObject.OrdinaryNncGenerationState.pluralType),
        subjectPrefix: subject.subjectPrefix,
        subjectSuffix: subject.subjectSuffix,
        subjectKey: subject.subjectKey,
        possessor: normalizeOrdinaryNncGenerationPossessor(targetObject.OrdinaryNncGenerationState.possessor, targetObject.OrdinaryNncGenerationState.state),
        nounClass: normalizeOrdinaryNncGenerationNounClass(targetObject.OrdinaryNncGenerationState.nounClass),
        animacy: normalizeOrdinaryNncGenerationAnimacy(targetObject.OrdinaryNncGenerationState.animacy)
      };
    }
    function isOrdinaryNncGenerationModeEnabled() {
      return getOrdinaryNncGenerationState().enabled;
    }
    function setOrdinaryNncGenerationState(options = {}) {
      const source = options && typeof options === "object" ? options : {};
      const current = getOrdinaryNncGenerationState();
      const state = Object.prototype.hasOwnProperty.call(source, "state") ? normalizeOrdinaryNncGenerationStateValue(source.state) : current.state;
      const number = Object.prototype.hasOwnProperty.call(source, "number") ? normalizeOrdinaryNncGenerationNumber(source.number) : current.number;
      const pluralType = Object.prototype.hasOwnProperty.call(source, "pluralType") ? normalizeOrdinaryNncGenerationPluralType(source.pluralType) : current.pluralType;
      const subject = normalizeOrdinaryNncGenerationSubject({
        subjectPrefix: Object.prototype.hasOwnProperty.call(source, "subjectPrefix") ? source.subjectPrefix : current.subjectPrefix,
        subjectSuffix: Object.prototype.hasOwnProperty.call(source, "subjectSuffix") ? source.subjectSuffix : current.subjectSuffix,
        subjectKey: Object.prototype.hasOwnProperty.call(source, "subjectKey") ? source.subjectKey : Object.prototype.hasOwnProperty.call(source, "personSubKey") ? source.personSubKey : current.subjectKey
      });
      const possessor = Object.prototype.hasOwnProperty.call(source, "possessor") ? normalizeOrdinaryNncGenerationPossessor(source.possessor, state) : normalizeOrdinaryNncGenerationPossessor(current.possessor, state);
      targetObject.OrdinaryNncGenerationState.state = state;
      targetObject.OrdinaryNncGenerationState.number = number;
      targetObject.OrdinaryNncGenerationState.pluralType = pluralType;
      targetObject.OrdinaryNncGenerationState.subjectPrefix = subject.subjectPrefix;
      targetObject.OrdinaryNncGenerationState.subjectSuffix = subject.subjectSuffix;
      targetObject.OrdinaryNncGenerationState.subjectKey = subject.subjectKey;
      targetObject.OrdinaryNncGenerationState.possessor = possessor;
      if (Object.prototype.hasOwnProperty.call(source, "nounClass")) {
        targetObject.OrdinaryNncGenerationState.nounClass = normalizeOrdinaryNncGenerationNounClass(source.nounClass);
      }
      if (Object.prototype.hasOwnProperty.call(source, "animacy")) {
        targetObject.OrdinaryNncGenerationState.animacy = normalizeOrdinaryNncGenerationAnimacy(source.animacy);
      }
      return getOrdinaryNncGenerationState();
    }
    function setOrdinaryNncGenerationModeEnabled(enabled = false, options = {}) {
      targetObject.OrdinaryNncGenerationState.enabled = enabled === true;
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
      skipValidation = true
    } = {}) {
      const uiState = getOrdinaryNncGenerationState();
      const analogueInput = parseOrdinaryNncGenerationAnalogueInput(stem);
      const resolvedState = normalizeOrdinaryNncGenerationStateValue(state ?? uiState.state);
      const resolvedNumber = normalizeOrdinaryNncGenerationNumber(number ?? uiState.number);
      const resolvedPluralType = normalizeOrdinaryNncGenerationPluralType(pluralType ?? uiState.pluralType);
      const resolvedAnimacy = normalizeOrdinaryNncGenerationAnimacy(animacy ?? uiState.animacy);
      const nounClassSource = nounClass === null || nounClass === undefined ? analogueInput?.nounClass ?? uiState.nounClass : nounClass;
      const resolvedNounClass = normalizeOrdinaryNncGenerationNounClass(nounClassSource);
      const resolvedPossessor = normalizeOrdinaryNncGenerationPossessor(possessor ?? uiState.possessor, resolvedState);
      const resolvedSubject = explicit ? normalizeOrdinaryNncGenerationSubject({
        subjectPrefix: subjectPrefix ?? uiState.subjectPrefix,
        subjectSuffix: subjectSuffix ?? uiState.subjectSuffix,
        subjectKey: subjectKey ?? uiState.subjectKey
      }) : normalizeOrdinaryNncGenerationSubject({
        subjectPrefix: subjectPrefix ?? "",
        subjectSuffix: subjectSuffix ?? ""
      });
      const normalizedStem = analogueInput?.stem || String(stem || "").trim();
      const formulaTense = explicit ? "ordinary-nnc" : getCurrentResolvedConjugationSelectionState({
        tenseMode: getActiveTenseMode()
      }).tenseValue || "";
      const override = {
        tenseMode: explicit ? targetObject.TENSE_MODE.sustantivo : getActiveTenseMode(),
        derivationMode: targetObject.DERIVATION_MODE.active,
        voiceMode: targetObject.VOICE_MODE.active
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
          animacy: resolvedAnimacy
        };
      }
      return {
        options: {
          silent,
          skipValidation,
          override
        },
        posicionesFormula: {
          pers1: resolvedSubject.subjectPrefix,
          obj1: "",
          tronco: normalizedStem,
          pers2: resolvedSubject.subjectSuffix,
          num2: resolvedSubject.subjectSuffix,
          poseedor: explicit ? resolvedPossessor : "",
          tiempo: formulaTense
        },
        entradaTronco: {
          tieneControlTronco: false,
          valorTronco: ""
        }
      };
    }
    function getActiveVoiceMode() {
      return targetObject.VoiceModeState.mode;
    }
    function setActiveVoiceMode(mode) {
      if (!Object.values(targetObject.VOICE_MODE).includes(mode)) {
        return;
      }
      targetObject.VoiceModeState.mode = mode;
    }
    function getActiveDerivationMode() {
      return targetObject.DerivationModeState.mode;
    }
    function setActiveDerivationMode(mode) {
      if (!Object.values(targetObject.DERIVATION_MODE).includes(mode)) {
        return;
      }
      targetObject.DerivationModeState.mode = mode;
    }
    function getActiveDerivationType() {
      return targetObject.DerivationTypeState.type;
    }
    function setActiveDerivationType(type) {
      if (!Object.values(targetObject.DERIVATION_TYPE).includes(type)) {
        return;
      }
      targetObject.DerivationTypeState.type = type;
    }
    function getActiveCausativeSubtype() {
      return targetObject.CausativeSubtypeState.subtype || targetObject.CAUSATIVE_SUBTYPE.all;
    }
    function setActiveCausativeSubtype(subtype) {
      targetObject.CausativeSubtypeState.subtype = Object.values(targetObject.CAUSATIVE_SUBTYPE).includes(subtype) ? subtype : targetObject.CAUSATIVE_SUBTYPE.all;
    }
    function getDerivationValencyDelta(type) {
      if (type === targetObject.DERIVATION_TYPE.causative || type === targetObject.DERIVATION_TYPE.applicative) {
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
      return targetObject.NonactiveSuffixState.selected;
    }
    function setSelectedNonactiveSuffix(value) {
      if (value === null) {
        targetObject.NonactiveSuffixState.selected = null;
        return;
      }
      if (!targetObject.NONACTIVE_SUFFIX_ORDER.includes(value)) {
        return;
      }
      targetObject.NonactiveSuffixState.selected = value;
    }
    function normalizeVerbSourceScope(scope) {
      if (scope === targetObject.VERB_SOURCE_SCOPE.active) {
        return targetObject.VERB_SOURCE_SCOPE.active;
      }
      if (scope === targetObject.VERB_SOURCE_SCOPE.nonactive) {
        return targetObject.VERB_SOURCE_SCOPE.nonactive;
      }
      if (scope === targetObject.VERB_SOURCE_SCOPE.both) {
        return targetObject.VERB_SOURCE_SCOPE.both;
      }
      return "";
    }
    function getToggleLockSourceScopeValue() {
      return normalizeVerbSourceScope(targetObject.ToggleLockValueState?.sourceScope || "");
    }
    function setToggleLockSourceScopeValue(scope) {
      const resolved = normalizeVerbSourceScope(scope) || targetObject.VERB_SOURCE_SCOPE.both;
      targetObject.ToggleLockValueState.sourceScope = resolved;
      return resolved;
    }
    function getVerbSourceScope() {
      const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
      if (lockedScope) {
        return lockedScope;
      }
      return normalizeVerbSourceScope(targetObject.VerbSourceScopeState.scope) || targetObject.VERB_SOURCE_SCOPE.both;
    }
    function setVerbSourceScope(scope, {
      syncCombinedMode = true,
      syncLock = syncCombinedMode,
      respectLock = !syncCombinedMode
    } = {}) {
      const resolved = normalizeVerbSourceScope(scope) || targetObject.VERB_SOURCE_SCOPE.both;
      const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
      const nextScope = lockedScope && respectLock ? lockedScope : resolved;
      targetObject.VerbSourceScopeState.scope = nextScope;
      if (isToggleLockEnabled() && syncLock) {
        setToggleLockSourceScopeValue(nextScope);
      }
      if (!syncCombinedMode) {
        return;
      }
      if (nextScope === targetObject.VERB_SOURCE_SCOPE.active) {
        setCombinedMode(targetObject.COMBINED_MODE.active);
      } else if (nextScope === targetObject.VERB_SOURCE_SCOPE.nonactive) {
        setCombinedMode(targetObject.COMBINED_MODE.nonactive);
      }
    }
    function getCombinedMode() {
      if (getActiveDerivationMode() === targetObject.DERIVATION_MODE.nonactive || getActiveVoiceMode() === targetObject.VOICE_MODE.passive) {
        return targetObject.COMBINED_MODE.nonactive;
      }
      return targetObject.COMBINED_MODE.active;
    }
    function setCombinedMode(mode) {
      if (!Object.values(targetObject.COMBINED_MODE).includes(mode)) {
        return;
      }
      if (getCombinedMode() !== mode) {
        const selectionState = getCurrentResolvedConjugationSelectionState();
        const tenseValue = selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue;
        resetToggleStateForTense(tenseValue);
      }
      if (mode === targetObject.COMBINED_MODE.nonactive) {
        setActiveDerivationMode(targetObject.DERIVATION_MODE.nonactive);
        setActiveVoiceMode(targetObject.VOICE_MODE.passive);
        const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
        if (lockedScope) {
          targetObject.VerbSourceScopeState.scope = lockedScope;
        } else if (getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.both) {
          targetObject.VerbSourceScopeState.scope = targetObject.VERB_SOURCE_SCOPE.nonactive;
        }
      } else {
        setActiveDerivationMode(targetObject.DERIVATION_MODE.active);
        setActiveVoiceMode(targetObject.VOICE_MODE.active);
        const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
        if (lockedScope) {
          targetObject.VerbSourceScopeState.scope = lockedScope;
        } else if (getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.both) {
          targetObject.VerbSourceScopeState.scope = targetObject.VERB_SOURCE_SCOPE.active;
        }
      }
    }
    function getTenseOrderForMode(mode) {
      if (mode === targetObject.TENSE_MODE.particula) {
        return [];
      }
      if (mode === targetObject.TENSE_MODE.sustantivo) {
        return ["sustantivo-verbal", "agentivo", "agentivo-presente", "agentivo-preterito", "agentivo-futuro", "patientivo", "instrumentivo", "calificativo-instrumentivo", "locativo-temporal"];
      }
      if (mode === targetObject.TENSE_MODE.adjetivo) {
        return targetObject.ADJECTIVE_TAB_TENSE_ORDER;
      }
      if (mode === targetObject.TENSE_MODE.adverbio) {
        return ["pasado-remoto-adverbio-activo"];
      }
      return targetObject.TENSE_ORDER.filter(tense => tense !== "sustantivo-verbal" && tense !== "potencial" && tense !== "potencial-habitual" && !targetObject.ACTIVE_ADJECTIVE_TENSE_SET.has(tense) && !targetObject.PATIENTIVO_ADJECTIVE_TENSE_SET.has(tense) && tense !== "pasado-remoto-adverbio-activo" && tense !== "agentivo" && tense !== "agentivo-presente" && tense !== "agentivo-preterito" && tense !== "agentivo-futuro" && tense !== "patientivo" && tense !== "instrumentivo" && tense !== "calificativo-instrumentivo" && tense !== "locativo-temporal");
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
      if (combinedMode !== targetObject.COMBINED_MODE.nonactive) {
        return true;
      }
      return tenseValue === "patientivo" || tenseValue === "locativo-temporal";
    }
    function getNounTenseOrderForCombinedMode(combinedMode = getCombinedMode(), mode = getActiveTenseMode()) {
      const resolvedMode = targetObject.isNominalTenseMode(mode) ? mode : targetObject.TENSE_MODE.sustantivo;
      return getTenseOrderForMode(resolvedMode).filter(tenseValue => isNounTenseVisibleForCombinedMode(tenseValue, combinedMode));
    }
    function isThreeColumnPanelLayout() {
      return typeof targetObject.window !== "undefined" && typeof targetObject.window.matchMedia === "function" && targetObject.window.matchMedia("(min-width: 1025px)").matches;
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
        selector: ""
      };
      if (element.matches?.("[data-tense-value]")) {
        const selectorParts = [`[data-tense-value="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-tense-value") || "")}"]`];
        const tenseGroup = element.getAttribute("data-tense-group") || "";
        const tenseColumn = element.getAttribute("data-tense-column") || "";
        if (tenseGroup) {
          selectorParts.push(`[data-tense-group="${targetObject.escapeAttributeSelectorValue(tenseGroup)}"]`);
        }
        if (tenseColumn) {
          selectorParts.push(`[data-tense-column="${targetObject.escapeAttributeSelectorValue(tenseColumn)}"]`);
        }
        anchor.selector = selectorParts.join("");
        return anchor;
      }
      if (element.matches?.("[data-nonactive-suffix]")) {
        anchor.selector = `[data-nonactive-suffix="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-nonactive-suffix") || "")}"]`;
        return anchor;
      }
      if (element.matches?.("[data-tense-mode]")) {
        anchor.selector = `[data-tense-mode="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-tense-mode") || "")}"]`;
        return anchor;
      }
      if (element.matches?.("[data-combined-mode]")) {
        anchor.selector = `[data-combined-mode="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-combined-mode") || "")}"]`;
        return anchor;
      }
      if (element.matches?.("[data-derivation-type]")) {
        anchor.selector = `[data-derivation-type="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-derivation-type") || "")}"]`;
        return anchor;
      }
      if (element.id) {
        anchor.selector = `#${targetObject.escapeAttributeSelectorValue(element.id)}`;
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
        return targetObject.document.querySelector(anchor.selector);
      }
      return null;
    }
    var VIEWPORT_ANCHOR_RESERVATION_SEQUENCE = 0;
    function captureStickyDesktopPaneAnchor(anchorSource) {
      if (!isThreeColumnPanelLayout()) {
        return null;
      }
      if (!anchorSource || typeof anchorSource.closest !== "function" || !anchorSource.closest("#panel-stack-pane-tense")) {
        return null;
      }
      const pane = targetObject.document.getElementById("panel-stack-pane-tense");
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
        deltaY: afterRect.top - anchor.top
      };
    }
    function captureOutputHeightReservation(anchorSource) {
      if (!isThreeColumnPanelLayout() || !anchorSource || typeof anchorSource.closest !== "function" || !anchorSource.closest("#panel-stack-pane-tense")) {
        return null;
      }
      const output = targetObject.document.getElementById("all-tense-conjugations");
      if (!output) {
        return null;
      }
      const rect = output.getBoundingClientRect();
      const reservedHeight = Math.ceil(Math.max(rect.height || 0, output.offsetHeight || 0, output.scrollHeight || 0));
      if (!(reservedHeight > 0)) {
        return null;
      }
      return {
        element: output,
        previousMinHeight: output.style.minHeight || "",
        token: `anchor-${++VIEWPORT_ANCHOR_RESERVATION_SEQUENCE}`,
        reservedHeight
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
    function releaseOutputHeightReservation(reservation, {
      delayMs = 320
    } = {}) {
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
      if (typeof targetObject.window !== "undefined" && typeof targetObject.window.setTimeout === "function") {
        targetObject.window.setTimeout(restore, Math.max(0, delayMs));
        return;
      }
      restore();
    }
    function preserveViewportAnchorPosition(anchorSource, callback) {
      if (typeof callback !== "function") {
        return;
      }
      if (typeof targetObject.window === "undefined" || typeof targetObject.window.scrollBy !== "function") {
        callback();
        return;
      }
      const isTensePaneAction = isThreeColumnPanelLayout() && anchorSource && typeof anchorSource.closest === "function" && anchorSource.closest("#panel-stack-pane-tense");
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
        releaseOutputHeightReservation(outputReservation, {
          delayMs: 0
        });
        throw error;
      }
      const scheduleFrame = typeof targetObject.window.requestAnimationFrame === "function" ? targetObject.window.requestAnimationFrame.bind(targetObject.window) : fn => targetObject.window.setTimeout(fn, 16);
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
        if ((!primaryDelta || Math.abs(deltaX) <= 0.5 && Math.abs(deltaY) <= 0.5) && paneDelta && (Math.abs(Number(paneDelta.deltaX) || 0) > 0.5 || Math.abs(Number(paneDelta.deltaY) || 0) > 0.5)) {
          deltaX = Number(paneDelta.deltaX) || 0;
          deltaY = Number(paneDelta.deltaY) || 0;
        }
        const needsAdjust = Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5;
        if (needsAdjust) {
          targetObject.window.scrollBy(deltaX, deltaY);
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
    var PANEL_STACK_ORDER = ["inputs", "formula", "output"];
    var PANEL_STACK_REVEAL_CLASS = "is-pane-entering";
    var PANEL_STACK_REVEAL_DURATION_MS = 180;
    function normalizePanelStackMode(mode) {
      if (mode === "formula" || mode === "tense") {
        return "formula";
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
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-panel-stack-tab]"));
      const panes = Array.from(targetObject.document.querySelectorAll("[data-panel-stack-pane]"));
      const stackRoot = targetObject.document.querySelector(".panel-stack");
      const previousMode = stackRoot?.getAttribute("data-active-pane") || "";
      const showAllPanes = isThreeColumnPanelLayout();
      const shouldAnimateReveal = !showAllPanes && previousMode !== normalizedMode;
      const triggerPaneReveal = pane => {
        if (!pane || !shouldAnimateReveal) {
          return;
        }
        if (pane.__panelStackRevealTimer) {
          targetObject.clearTimeout(pane.__panelStackRevealTimer);
        }
        pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
        targetObject.requestAnimationFrame(() => {
          pane.classList.add(PANEL_STACK_REVEAL_CLASS);
          pane.__panelStackRevealTimer = targetObject.setTimeout(() => {
            pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
            pane.__panelStackRevealTimer = null;
          }, PANEL_STACK_REVEAL_DURATION_MS);
        });
      };
      if (stackRoot) {
        stackRoot.setAttribute("data-active-pane", normalizedMode);
      }
      buttons.forEach(button => {
        const isActive = button.getAttribute("data-panel-stack-tab") === normalizedMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = showAllPanes ? -1 : isActive ? 0 : -1;
      });
      panes.forEach(pane => {
        const isActive = showAllPanes ? true : pane.getAttribute("data-panel-stack-pane") === normalizedMode;
        if (!isActive && pane.__panelStackRevealTimer) {
          targetObject.clearTimeout(pane.__panelStackRevealTimer);
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
      targetObject.dispatchAppEvent("app:panel-stack-changed", {
        mode: normalizedMode,
        showAllPanes
      });
    }
    function initPanelEdgeNavigation() {
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-pane-nav-direction][data-pane-nav-from]"));
      if (!buttons.length) {
        return;
      }
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const directionAttr = button.getAttribute("data-pane-nav-direction");
          const direction = directionAttr === "prev" ? -1 : 1;
          const stackRoot = targetObject.document.querySelector(".panel-stack");
          const activeMode = stackRoot?.getAttribute("data-active-pane");
          const fallbackMode = button.getAttribute("data-pane-nav-from");
          const originMode = activeMode || fallbackMode || "inputs";
          const targetMode = getAdjacentPanelStackMode(originMode, direction);
          setLeftPanelStackMode(targetMode);
          const targetTab = targetObject.document.querySelector(`[data-panel-stack-tab="${targetMode}"]`);
          if (targetTab && typeof targetTab.focus === "function") {
            targetTab.focus({
              preventScroll: true
            });
          }
        });
      });
    }
    function initLeftPanelStackTabs() {
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-panel-stack-tab]"));
      if (!buttons.length) {
        return;
      }
      const focusButtonAt = index => {
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
        button.addEventListener("keydown", event => {
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
      const initialActive = buttons.find(button => button.classList.contains("is-active"));
      const initialMode = initialActive?.getAttribute("data-panel-stack-tab") || "inputs";
      setLeftPanelStackMode(initialMode);
      const syncOnResize = () => {
        const stackRoot = targetObject.document.querySelector(".panel-stack");
        const activeMode = stackRoot?.getAttribute("data-active-pane") || initialMode;
        setLeftPanelStackMode(activeMode);
      };
      targetObject.window.addEventListener("resize", syncOnResize, {
        passive: true
      });
    }
    function updateTenseModeTabs() {
      const buttons = targetObject.document.querySelectorAll("[data-tense-mode]");
      if (!buttons.length) {
        return;
      }
      const mode = getActiveTenseMode();
      const isVerbMode = mode === targetObject.TENSE_MODE.verbo;
      const isNominalMode = targetObject.isNominalTenseMode(mode);
      targetObject.document.body.classList.toggle("is-sustantivo-mode", isNominalMode);
      targetObject.document.body.classList.toggle("is-verb-mode", isVerbMode);
      targetObject.document.body.classList.toggle("is-nonverb-mode", !isVerbMode);
      targetObject.document.body.classList.toggle("is-adjectival-function", getActiveFunctionRole() === "adjectival");
      targetObject.document.body.classList.toggle("is-cnv-unit", getActiveUnitKind() === "cnv");
      targetObject.document.body.classList.toggle("is-cnn-unit", getActiveUnitKind() === "cnn");
      const operators = targetObject.document.querySelector(".calc-operators");
      if (operators) {
        operators.dataset.tenseMode = mode || "";
        operators.dataset.functionRole = getActiveFunctionRole();
        operators.dataset.functionMode = getActiveFunctionMode();
        operators.dataset.unitKind = getActiveUnitKind();
        operators.dataset.unitMode = getActiveNawatTenseModeForCurrentSelection();
        operators.dataset.ordinaryNncMode = isOrdinaryNncGenerationModeEnabled() ? "on" : "off";
      }
      const activeFunctionMode = getActiveFunctionMode();
      const activeNawatMode = getActiveNawatTenseModeForCurrentSelection();
      const ordinaryNncActive = isOrdinaryNncGenerationModeEnabled();
      buttons.forEach(button => {
        const buttonMode = button.getAttribute("data-tense-mode");
        const buttonSystem = button.getAttribute("data-mode-system") || targetObject.TENSE_MODE_SYSTEM.function || targetObject.TENSE_MODE_SYSTEM.european || "function";
        const isUnitButton = isUnitModeSystem(buttonSystem);
        const isActive = isUnitButton ? buttonMode === activeNawatMode && !(ordinaryNncActive && buttonMode === targetObject.TENSE_MODE.sustantivo) : buttonMode === activeFunctionMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-pressed", String(isActive));
      });
      const ordinaryNncButtons = targetObject.document.querySelectorAll("[data-ordinary-nnc-mode]");
      ordinaryNncButtons.forEach(button => {
        const isActive = isOrdinaryNncGenerationModeEnabled();
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        if (button.getAttribute("role") === "tab") {
          button.setAttribute("aria-selected", String(isActive));
        } else {
          button.removeAttribute("aria-selected");
        }
      });
      updateVoiceOperatorVisibility();
      updateDerivationTypeControl();
      updateCombinedModeTabs();
    }
    function initTenseModeTabs() {
      const buttons = targetObject.document.querySelectorAll("[data-tense-mode]");
      if (!buttons.length) {
        return;
      }
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const mode = button.getAttribute("data-tense-mode");
          if (!mode) {
            return;
          }
          const buttonSystem = button.getAttribute("data-mode-system") || targetObject.TENSE_MODE_SYSTEM.function || targetObject.TENSE_MODE_SYSTEM.european || "function";
          clearActiveNawatRouteProfile();
          setOrdinaryNncGenerationModeEnabled(false);
          if (isUnitModeSystem(buttonSystem)) {
            setActiveUnitMode(mode);
          } else {
            setActiveFunctionMode(mode);
          }
          preserveViewportAnchorPosition(button, () => {
            targetObject.renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      });
      targetObject.document.querySelectorAll("[data-ordinary-nnc-mode]").forEach(button => {
        button.addEventListener("click", () => {
          clearActiveNawatRouteProfile();
          setOrdinaryNncGenerationModeEnabled(true);
          setActiveNawatTenseMode(targetObject.TENSE_MODE.sustantivo);
          if (typeof targetObject.syncComposerStateFromVerbInput === "function") {
            targetObject.syncComposerStateFromVerbInput(targetObject.document.getElementById("verb")?.value || "");
          }
          if (typeof targetObject.setVerbInputMode === "function" && typeof targetObject.VERB_INPUT_MODE !== "undefined" && typeof targetObject.isVerbInputModeComposer === "function" && !targetObject.isVerbInputModeComposer()) {
            targetObject.setVerbInputMode(targetObject.VERB_INPUT_MODE.composer, {
              syncFromInput: true
            });
          }
          const plainComposerBoard = typeof targetObject.COMPOSER_ENTRY_BOARD !== "undefined" ? targetObject.COMPOSER_ENTRY_BOARD.general || "general" : "general";
          if (typeof targetObject.setComposerEntryBoard === "function" && typeof targetObject.getComposerEntryBoard === "function" && targetObject.getComposerEntryBoard() !== plainComposerBoard) {
            targetObject.setComposerEntryBoard(plainComposerBoard, {
              force: true
            });
          } else if (typeof targetObject.renderVerbComposerFromState === "function") {
            targetObject.renderVerbComposerFromState();
          }
          if (typeof targetObject.applyComposerStateToVerbInput === "function") {
            targetObject.applyComposerStateToVerbInput({
              triggerGenerate: true,
              immediateRefresh: true
            });
          }
          preserveViewportAnchorPosition(button, () => {
            targetObject.renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      });
      updateTenseModeTabs();
    }
    function updateVoiceOperatorVisibility() {
      const voiceOperator = targetObject.document.getElementById("calc-voice-operator");
      if (!voiceOperator) {
        return;
      }
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      voiceOperator.hidden = false;
      voiceOperator.classList.remove("is-hidden");
      voiceOperator.setAttribute("aria-hidden", "false");
      voiceOperator.classList.toggle("is-disabled", !isVerbMode);
      voiceOperator.setAttribute("aria-disabled", String(!isVerbMode));
    }
    function updateCombinedModeTabs() {
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      const isAdverbioMode = getActiveTenseMode() === targetObject.TENSE_MODE.adverbio;
      const buttons = targetObject.document.querySelectorAll("[data-combined-mode]");
      if (!buttons.length) {
        return;
      }
      const mode = getCombinedMode();
      const container = targetObject.document.querySelector(".calc-operator-grid--voice");
      if (container) {
        const isNawat = getIsNawat();
        container.setAttribute("role", "tablist");
        container.setAttribute("aria-label", getLocalizedLabel({
          labelEs: "Voz",
          labelNa: "Voz"
        }, isNawat, "Voz"));
        container.classList.toggle("is-disabled", !isVerbMode);
        container.setAttribute("aria-disabled", String(!isVerbMode));
      }
      buttons.forEach(button => {
        const combinedMode = button.getAttribute("data-combined-mode") || "";
        const isDisabled = !isVerbMode || isAdverbioMode && combinedMode === targetObject.COMBINED_MODE.nonactive;
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
      const buttons = targetObject.document.querySelectorAll("[data-combined-mode]");
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          if (getActiveTenseMode() !== targetObject.TENSE_MODE.verbo) {
            return;
          }
          const mode = button.getAttribute("data-combined-mode");
          if (!mode) {
            return;
          }
          setCombinedMode(mode);
          preserveViewportAnchorPosition(button, () => {
            updateCombinedModeTabs();
            targetObject.renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
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
      if (normalizedType === targetObject.DERIVATION_TYPE.direct) {
        return isNawat ? "Tayilis" : "Directo";
      }
      if (normalizedType === targetObject.DERIVATION_TYPE.causative) {
        return isNawat ? "Tetayiltilis" : "Causativo";
      }
      if (normalizedType === targetObject.DERIVATION_TYPE.applicative) {
        return isNawat ? "Tetayililis" : "Aplicativo";
      }
      return normalizedType;
    }
    function getBlockedNounDerivationTypes(tenseValue = "") {
      const blocked = new Set();
      const verbInput = targetObject.document.getElementById("verb");
      const rawInput = targetObject.getSearchInputBase(verbInput?.value || "");
      const baseInput = String(rawInput || "").trim();
      if (!baseInput) {
        return blocked;
      }
      const resolvedTenseValue = tenseValue || getCurrentResolvedConjugationSelectionState({
        tenseMode: getActiveTenseMode()
      }).tenseValue || "sustantivo-verbal";
      const combinedMode = getCombinedMode();
      const derivedTypes = [targetObject.DERIVATION_TYPE.causative, targetObject.DERIVATION_TYPE.applicative];
      derivedTypes.forEach(derivationType => {
        const parsedVerb = targetObject.getParsedVerbForTab("noun-derivation-switch", baseInput, {
          derivationType,
          includeNonactiveStemMetadata: false,
          useSearchBase: false
        });
        const availability = targetObject.buildDerivationAvailabilityTargets({
          derivationType,
          verb: parsedVerb.verb || "",
          analysisVerb: parsedVerb.analysisVerb || parsedVerb.verb || "",
          objectPrefix: "",
          verbMeta: parsedVerb,
          suppletiveStemSet: targetObject.getSuppletiveStemSet(parsedVerb)
        });
        const hasDerivedStem = Array.isArray(availability?.availabilityTargets) && availability.availabilityTargets.length > 0;
        const slotPlanBundle = targetObject.getNounObjectSlotPlansFromMeta(parsedVerb, resolvedTenseValue, {
          combinedMode
        });
        const derivedSlots = slotPlanBundle.slotPlans.filter(slot => slot.isAddedSlot);
        const hasNonspecificFiller = derivedSlots.length > 0 && derivedSlots.every(slot => slot.toggleValues.some(prefix => targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(prefix)));
        const allowCollapsedDerivedSlot = allowsCollapsedDerivedNounSlot({
          tenseValue: resolvedTenseValue,
          combinedMode,
          slotPlanBundle,
          derivationType
        });
        if (!hasDerivedStem || !hasNonspecificFiller && !allowCollapsedDerivedSlot) {
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
      if (DERIVATION_ANTIDERIVATIVE_PENDING_KEY === renderKey || DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY === renderKey) {
        return;
      }
      DERIVATION_ANTIDERIVATIVE_PENDING_KEY = renderKey;
      renderDerivationAntiderivativePanel();
      targetObject.setTimeout(() => {
        targetObject.findDerivationalAntiderivatives(normalizedInput, lookupOptions);
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = renderKey;
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        renderDerivationAntiderivativePanel();
      }, 0);
    }
    function getUniqueAntiderivativeDirectStems(result) {
      const rows = Array.isArray(result?.candidates) ? result.candidates : [];
      return Array.from(new Set(rows.map(entry => String(entry?.directStem || "").trim()).filter(Boolean)));
    }
    function renderDerivationAntiderivativePanel(verbMeta = null) {
      const panel = targetObject.document.getElementById("derivation-antiderivative");
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
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      panel.classList.toggle("is-hidden", !isVerbMode);
      panel.innerHTML = "";
      if (!isVerbMode) {
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        DERIVATION_ANTIDERIVATIVE_STAGE = "off";
        return;
      }
      const row = targetObject.document.createElement("div");
      row.className = "derivation-antiderivative__row";
      panel.appendChild(row);
      const derivationType = getActiveDerivationType();
      const resolvedVerbMeta = verbMeta || targetObject.getVerbInputMeta();
      const expectedValence = targetObject.getActiveVerbValency(resolvedVerbMeta);
      const verbInput = targetObject.document.getElementById("verb");
      const inputValue = targetObject.getSearchInputBase(verbInput?.value || "");
      const normalizedInput = String(inputValue || "").trim();
      const result = targetObject.document.createElement("div");
      result.className = "derivation-antiderivative__result";
      result.textContent = "Sin antiderivada calculada.";
      const fullReverseButton = targetObject.document.createElement("button");
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
      const requestedType = targetObject.normalizeAntiderivativeRequestedType(derivationType);
      const targetStem = targetObject.normalizeDerivationStemValue(targetObject.getSearchInputBase(normalizedInput));
      const normalizedExpectedValence = targetObject.normalizeAntiderivativeExpectedValence(expectedValence) || "any";
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
      const lookupOptions = requestedType ? {
        derivationType: requestedType,
        expectedValence,
        fullReverseSeeds: true
      } : {
        expectedValence,
        fullReverseSeeds: true
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
        result.textContent = "Sin antiderivada calculada.";
        return;
      }
      if (stage === "lock" && !hasResult) {
        requestDerivationAntiderivativeLookup(renderKey, normalizedInput, lookupOptions);
        result.textContent = "...";
        return;
      }
      if (!hasResult) {
        result.textContent = "Sin antiderivada calculada.";
        return;
      }
      const cachedResult = targetObject.getCachedDerivationalAntiderivativeResult(targetStem, requestedType, lookupOptions);
      if (!cachedResult) {
        result.textContent = "Sin antiderivada calculada.";
        return;
      }
      const uniqueDirectStems = getUniqueAntiderivativeDirectStems(cachedResult);
      if (!uniqueDirectStems.length) {
        result.textContent = "Sin antiderivada disponible.";
        return;
      }
      result.textContent = uniqueDirectStems.join(" / ");
    }
    function updateDerivationTypeControl() {
      const select = targetObject.document.getElementById("derivation-type");
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-derivation-type]"));
      if (!select && !buttons.length) {
        return;
      }
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      const isNounMode = targetObject.isNominalTenseMode(getActiveTenseMode());
      const canUseControl = isVerbMode || isNounMode;
      const nounTenseValue = isNounMode ? getCurrentResolvedConjugationSelectionState({
        tenseMode: getActiveTenseMode()
      }).tenseValue || getNounTenseOrderForCombinedMode(getCombinedMode(), getActiveTenseMode())[0] || "sustantivo-verbal" : "";
      const blockedNounTypes = isNounMode ? getBlockedNounDerivationTypes(nounTenseValue) : new Set();
      let activeType = getActiveDerivationType();
      const container = targetObject.document.querySelector(".derivation-type-row") || targetObject.document.querySelector(".calc-operator--derivation");
      if (container) {
        container.classList.toggle("is-disabled", !canUseControl);
        container.setAttribute("aria-disabled", String(!canUseControl));
      }
      if (select) {
        const options = Array.from(select.options || []);
        options.forEach(option => {
          const isBlocked = isNounMode && blockedNounTypes.has(option.value);
          // Keep the currently active derivation selectable to avoid silent fallback to direct.
          option.disabled = isBlocked && option.value !== activeType;
        });
        select.disabled = !canUseControl;
        if (!options.some(option => option.value === activeType)) {
          activeType = targetObject.DERIVATION_TYPE.direct;
          setActiveDerivationType(activeType);
        }
        select.value = activeType;
      }
      if (buttons.length) {
        const buttonGrid = buttons[0]?.closest(".calc-operator-grid");
        if (buttonGrid) {
          buttonGrid.setAttribute("role", "tablist");
          const isNawat = getIsNawat();
          buttonGrid.setAttribute("aria-label", getLocalizedLabel({
            labelEs: "Derivación activa",
            labelNa: "Derivación activa"
          }, isNawat, "Derivación activa"));
        }
        buttons.forEach(button => {
          const type = button.getAttribute("data-derivation-type") || "";
          const isBlocked = isNounMode && blockedNounTypes.has(type);
          const isActive = type === activeType;
          const isDisabled = !canUseControl || isBlocked && !isActive;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("role", "tab");
          button.setAttribute("aria-selected", String(isActive));
          button.setAttribute("aria-pressed", String(isActive));
          button.disabled = isDisabled;
          button.setAttribute("aria-disabled", String(isDisabled));
        });
      }
      renderDerivationAntiderivativePanel();
      const subtypeRow = targetObject.document.getElementById("causative-subtype-row");
      if (subtypeRow) {
        const isCausative = activeType === targetObject.DERIVATION_TYPE.causative;
        subtypeRow.hidden = !isCausative;
        if (!isCausative) {
          setActiveCausativeSubtype(targetObject.CAUSATIVE_SUBTYPE.all);
          return;
        }
        // Probe which causative subtypes are available for the current verb.
        const typeAvailable = {
          one: true,
          two: true
        };
        if (typeof targetObject.getCausativeDerivationOptions === "function") {
          const verbMeta = targetObject.getVerbInputMeta();
          const probeVerb = verbMeta.analysisVerb || verbMeta.displayVerb || "";
          if (probeVerb) {
            const ruleBase = verbMeta.canonicalRuleBase || probeVerb;
            try {
              const probeAllowTypeTwo = typeof targetObject.computeAllowTypeTwoCausativeForParsedVerb === "function" ? targetObject.computeAllowTypeTwoCausativeForParsedVerb(verbMeta).allowTypeTwo : verbMeta.isMarkedTransitive === true;
              const probeOpts = targetObject.getCausativeDerivationOptions(ruleBase, ruleBase, {
                isTransitive: verbMeta.isMarkedTransitive === true,
                allowTypeTwo: probeAllowTypeTwo,
                isYawi: verbMeta.isYawi === true,
                ruleBase,
                fullRuleBase: ruleBase,
                canonicalRuleBase: ruleBase,
                canonicalFullRuleBase: ruleBase,
                rootPlusYaBase: verbMeta.rootPlusYaBase || "",
                hasLeadingDash: verbMeta.hasLeadingDash === true,
                parsedVerb: verbMeta
              });
              typeAvailable.one = probeOpts.some(o => o.type !== "type-two");
              typeAvailable.two = probeOpts.some(o => o.type === "type-two");
            } catch (_e) {
              // leave both enabled if probe fails
            }
          }
        }
        // If the active subtype has no available options, reset to "all".
        let activeSubtype = getActiveCausativeSubtype();
        if (activeSubtype === targetObject.CAUSATIVE_SUBTYPE.one && !typeAvailable.one || activeSubtype === targetObject.CAUSATIVE_SUBTYPE.two && !typeAvailable.two) {
          setActiveCausativeSubtype(targetObject.CAUSATIVE_SUBTYPE.all);
          activeSubtype = targetObject.CAUSATIVE_SUBTYPE.all;
        }
        Array.from(subtypeRow.querySelectorAll("[data-causative-subtype]")).forEach(btn => {
          const sub = btn.getAttribute("data-causative-subtype");
          const isActive = sub === activeSubtype;
          const isAvailable = sub === targetObject.CAUSATIVE_SUBTYPE.all || typeAvailable[sub] === true;
          btn.classList.toggle("is-active", isActive);
          btn.setAttribute("aria-pressed", String(isActive));
          btn.disabled = !isAvailable;
          btn.setAttribute("aria-disabled", String(!isAvailable));
        });
      }
    }
    function initDerivationTypeControl() {
      const select = targetObject.document.getElementById("derivation-type");
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-derivation-type]"));
      if (!select && !buttons.length) {
        return;
      }
      if (select) {
        select.addEventListener("change", () => {
          setActiveDerivationType(select.value);
          preserveViewportAnchorPosition(select, () => {
            updateDerivationTypeControl();
            targetObject.renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      }
      if (buttons.length) {
        buttons.forEach(button => {
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
              targetObject.renderTenseTabs();
              const verbMeta = targetObject.getVerbInputMeta();
              targetObject.renderActiveConjugations({
                verb: verbMeta.displayVerb,
                objectPrefix: targetObject.getCurrentObjectPrefix()
              });
            });
          });
        });
      }
      const subtypeButtons = Array.from(targetObject.document.querySelectorAll("[data-causative-subtype]"));
      subtypeButtons.forEach(button => {
        button.addEventListener("click", () => {
          const subtype = button.getAttribute("data-causative-subtype");
          if (!subtype) {
            return;
          }
          setActiveCausativeSubtype(subtype);
          preserveViewportAnchorPosition(button, () => {
            updateDerivationTypeControl();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      });
      updateDerivationTypeControl();
    }
    function getCalcTransitivityLabel() {
      const activeButton = targetObject.document.querySelector(".verb-composer__slot-tab.is-active");
      if (activeButton?.textContent) {
        return activeButton.textContent.trim();
      }
      const select = targetObject.document.getElementById("composer-transitivity");
      const option = select?.selectedOptions?.[0];
      return option?.textContent?.trim() || "";
    }
    function getCalcDerivationLabel() {
      const activeButton = targetObject.document.querySelector("[data-derivation-type].is-active");
      if (activeButton?.textContent) {
        return activeButton.textContent.trim();
      }
      const select = targetObject.document.getElementById("derivation-type");
      const option = select?.selectedOptions?.[0];
      return option?.textContent?.trim() || "";
    }
    function getCalcTenseLabel() {
      if (isOrdinaryNncGenerationModeEnabled()) {
        return "sustantivo ordinario";
      }
      if (getActiveTenseMode() === targetObject.TENSE_MODE.particula) {
        return "Andrews Lesson 3";
      }
      const isNawat = getIsNawat();
      const selectionState = getCurrentResolvedConjugationSelectionState();
      if (selectionState.group === targetObject.CONJUGATION_GROUPS.universal) {
        const tenseValue = selectionState.universalTenseValue;
        const classDetail = getPretUniversalClassDetail(tenseValue);
        const resolved = classDetail?.label ? getLocalizedLabel(classDetail.label, isNawat, classDetail.label || tenseValue) : tenseValue || "";
        return resolved ? `Pretérito universal ${resolved}` : "Pretérito universal";
      }
      const tenseValue = selectionState.tenseValue || targetObject.TENSE_ORDER[0] || "";
      return getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], isNawat, tenseValue);
    }
    function getCalcSourceScopeLabel() {
      const scope = getVerbSourceScope();
      if (scope === targetObject.VERB_SOURCE_SCOPE.active) {
        return "activo";
      }
      if (scope === targetObject.VERB_SOURCE_SCOPE.nonactive) {
        return "no activo";
      }
      return "activo + no activo";
    }
    function getCurrentNuclearClauseShell(options = {}) {
      if (typeof targetObject.buildNuclearClauseShellMetadata !== "function") {
        return null;
      }
      const mode = options.mode || getActiveTenseMode();
      const selectionState = getCurrentResolvedConjugationSelectionState({
        tenseMode: mode
      });
      const tenseValue = options.tenseValue || String(selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue);
      const verbMeta = typeof targetObject.getVerbInputMeta === "function" ? targetObject.getVerbInputMeta() : {};
      if (mode === targetObject.TENSE_MODE.particula) {
        return null;
      }
      if (typeof isOrdinaryNncGenerationModeEnabled === "function" && isOrdinaryNncGenerationModeEnabled()) {
        const ordinaryState = typeof getOrdinaryNncGenerationState === "function" ? getOrdinaryNncGenerationState() : {};
        return targetObject.buildNuclearClauseShellMetadata({
          clauseKind: "nominal-nuclear-clause",
          subject: {
            prefix: targetObject.document.getElementById("subject-prefix")?.value || "",
            suffix: targetObject.document.getElementById("subject-suffix")?.value || ""
          },
          predicate: {
            stem: verbMeta?.displayVerb || verbMeta?.parseInputVerb || "",
            state: ordinaryState.state || "absolutive"
          },
          predicateState: ordinaryState.state || "absolutive"
        });
      }
      if (mode === targetObject.TENSE_MODE.sustantivo || mode === targetObject.TENSE_MODE.adjetivo || mode === targetObject.TENSE_MODE.adverbio) {
        return targetObject.buildNuclearClauseShellMetadata({
          clauseKind: "nominal-nuclear-clause",
          subject: {
            prefix: targetObject.document.getElementById("subject-prefix")?.value || "",
            suffix: targetObject.document.getElementById("subject-suffix")?.value || ""
          },
          predicate: {
            stem: verbMeta?.displayVerb || verbMeta?.parseInputVerb || "",
            state: mode
          },
          predicateState: mode
        });
      }
      return targetObject.buildNuclearClauseShellMetadata({
        clauseKind: "verbal-nuclear-clause",
        subject: {
          prefix: targetObject.document.getElementById("subject-prefix")?.value || "",
          suffix: targetObject.document.getElementById("subject-suffix")?.value || ""
        },
        object: {
          prefix: targetObject.getCurrentObjectPrefix()
        },
        predicate: {
          stem: verbMeta?.displayVerb || verbMeta?.parseInputVerb || "",
          valency: getCalcTransitivityLabel()
        },
        tenseValue,
        tenseLabel: getCalcTenseLabel()
      });
    }
    function updateCalcSummary() {
      const summaryEl = targetObject.document.getElementById("calc-summary");
      if (!summaryEl) {
        return;
      }
      const isSimpleView = targetObject.getActiveUiDensityMode() === targetObject.UI_DENSITY_MODE.simple;
      const mode = getActiveTenseMode();
      const modeButton = targetObject.document.querySelector(`[data-tense-mode="${mode}"]`);
      const modeLabel = modeButton?.textContent?.trim() || (mode === targetObject.TENSE_MODE.sustantivo ? "Sustantivo" : mode === targetObject.TENSE_MODE.adjetivo ? "Adjetivo" : mode === targetObject.TENSE_MODE.adverbio ? "Adverbio" : mode === targetObject.TENSE_MODE.particula ? "Partícula" : "Verbo");
      const voice = getCombinedMode();
      const voiceButton = targetObject.document.querySelector(`[data-combined-mode="${voice}"]`);
      const voiceLabel = voiceButton?.textContent?.trim() || (voice === targetObject.COMBINED_MODE.nonactive ? "No activo" : "Activo");
      const includeVoiceInSummary = mode === targetObject.TENSE_MODE.verbo && voice === targetObject.COMBINED_MODE.nonactive;
      const derivationLabel = mode === targetObject.TENSE_MODE.verbo ? getCalcDerivationLabel().toLowerCase() : "";
      const transitivityLabel = getCalcTransitivityLabel();
      const tenseLabel = getCalcTenseLabel();
      const sourceScopeLabel = !isSimpleView ? getCalcSourceScopeLabel() : "";
      const clauseShell = getCurrentNuclearClauseShell({
        mode
      });
      const clauseLabel = clauseShell?.displayLabel || "";
      const parts = (() => {
        if (mode === targetObject.TENSE_MODE.particula) {
          return ["Partículas · Andrews Lección 3", "inventario diagnóstico", "sin generación"];
        }
        if (mode !== targetObject.TENSE_MODE.verbo) {
          return [clauseLabel, tenseLabel, sourceScopeLabel].filter(Boolean);
        }
        if (isSimpleView) {
          return [clauseLabel, tenseLabel, transitivityLabel].filter(Boolean);
        }
        return [clauseLabel, tenseLabel, derivationLabel, transitivityLabel, sourceScopeLabel || (includeVoiceInSummary ? voiceLabel : "")].filter(Boolean);
      })();
      const fallback = mode === targetObject.TENSE_MODE.verbo ? isSimpleView ? "Selecciona tiempo" : "Selecciona tiempo y derivación" : mode === targetObject.TENSE_MODE.particula ? "Ingresa una partícula" : "Selecciona tiempo";
      summaryEl.removeAttribute("title");
      summaryEl.textContent = parts.length ? parts.join(" · ") : fallback;
    }
    function getOrthographyBridgeStatusInfo(value = "") {
      if (typeof targetObject.classifyOrthographyInput !== "function") {
        return null;
      }
      const rawValue = String(value || "");
      const baseValue = typeof targetObject.getSearchInputBase === "function" ? targetObject.getSearchInputBase(rawValue) : rawValue;
      const normalized = String(baseValue || rawValue || "").trim();
      if (!normalized) {
        return null;
      }
      const classification = targetObject.classifyOrthographyInput(normalized);
      const correspondences = Array.isArray(classification?.bridge?.correspondences) ? classification.bridge.correspondences : [];
      const invalidGraphemes = Array.isArray(classification?.invalidGraphemes) ? classification.invalidGraphemes : [];
      if (!correspondences.length && !invalidGraphemes.length) {
        return null;
      }
      const blocked = Array.isArray(classification?.bridge?.blocked) ? classification.bridge.blocked : [];
      const hasCandidateBridge = correspondences.some(entry => entry.confidence === "candidate" || entry.action === "suggest-only" || entry.action === "diagnostic-only");
      const severity = blocked.length || invalidGraphemes.length ? "warning" : "info";
      const message = (() => {
        if (blocked.length) {
          return "Ortografia: correspondencia bloqueada; no genera formas.";
        }
        if (hasCandidateBridge) {
          return "Ortografia: correspondencia candidata; requiere evidencia Nawat/Pipil.";
        }
        return "Ortografia: grafia compatible; no cambia la generacion.";
      })();
      return {
        kind: "orthography-bridge-status",
        severity,
        message,
        profileId: classification.profileId,
        correspondenceIds: correspondences.map(entry => entry.id).filter(Boolean),
        invalidGraphemes,
        blocked,
        generationAllowed: false
      };
    }
    function updateCalcStatus() {
      const statusEl = targetObject.document.getElementById("calc-status");
      if (!statusEl) {
        return;
      }
      const verbMeta = targetObject.getVerbInputMeta();
      const verbInput = targetObject.document.getElementById("verb");
      const isTemplateOnlyVerb = targetObject.isComposerTemplateOnlyBaseValue(targetObject.getSearchInputBase(verbInput?.value || ""));
      const hasVerb = Boolean(verbMeta?.displayVerb) && !isTemplateOnlyVerb;
      const isParticleMode = getActiveTenseMode() === targetObject.TENSE_MODE.particula;
      const hasError = Boolean(targetObject.document.querySelector("#all-tense-conjugations .conjugation-error")) || Boolean(targetObject.document.getElementById("verb")?.classList.contains("error"));
      const hasRows = Boolean(targetObject.document.querySelector("#all-tense-conjugations .conjugation-row"));
      statusEl.classList.toggle("is-error", hasError);
      delete statusEl.dataset.orthographyBridge;
      delete statusEl.dataset.orthographyBridgeIds;
      if (!hasVerb) {
        statusEl.textContent = getPlaceholderLabel("conjugations", getIsNawat(), isParticleMode ? "Ingresa una partícula o colocación para ver su marco Andrews." : "Ingresa un verbo para ver las conjugaciones.");
        statusEl.classList.remove("is-error");
        return;
      }
      if (isParticleMode) {
        statusEl.textContent = hasRows ? "Partícula · diagnóstico Andrews; no genera VNC/CNN." : "Partícula · sin inventario confirmado.";
        statusEl.classList.toggle("is-error", !hasRows);
        return;
      }
      const orthographyStatus = getOrthographyBridgeStatusInfo(verbInput?.value || verbMeta?.parseInputVerb || "");
      if (orthographyStatus && (hasError || !hasRows || orthographyStatus.severity === "warning")) {
        statusEl.textContent = orthographyStatus.message;
        statusEl.classList.add("is-error");
        statusEl.dataset.orthographyBridge = "true";
        statusEl.dataset.orthographyBridgeIds = orthographyStatus.correspondenceIds.join(",");
        return;
      }
      if (!hasRows) {
        statusEl.textContent = targetObject.getUiCopyLabel("calc-status-no-results", "Sin resultados para esta combinación.");
        statusEl.classList.add("is-error");
        return;
      }
      if (hasError) {
        statusEl.textContent = targetObject.getUiCopyLabel("calc-status-incompatible", "Revisa la combinación: hay formas incompatibles.");
        return;
      }
      const modeLabel = targetObject.getUiCopyLabel("calc-status-mode-prefix", "Entrada estructural");
      const outputUpdated = targetObject.getUiCopyLabel("calc-status-output-updated", "salida actualizada.");
      statusEl.textContent = `${modeLabel} · ${outputUpdated}`;
    }
    function updateCalcSummaryAndStatus() {
      updateCalcSummary();
      updateCalcStatus();
    }

    // === Preterito Universal ===
    var PRET_UNIVERSAL_VERB_OVERRIDES = [];
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
      derivationType = ""
    }) {
      const wrapper = targetObject.document.getElementById("verb-rule");
      const textEl = targetObject.document.getElementById("verb-rule-text");
      if (!wrapper || !textEl) {
        return;
      }
      const clearHint = () => {
        textEl.textContent = "";
        wrapper.classList.add("is-empty");
      };
      if (!verb || getActiveTenseMode() !== targetObject.TENSE_MODE.verbo) {
        clearHint();
        return;
      }
      const isTransitive = forceTransitive || Boolean(objectPrefix);
      const markerOptions = targetObject.buildPretMarkerOptionsFromFlags({
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker
      });
      const contextOptions = targetObject.buildPretContextOptionsFromFlags({
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
        derivationType
      });
      const resolvedBundle = targetObject.resolvePretUniversalContextBundle({
        verb,
        analysisVerb,
        isTransitive,
        markerOptions,
        contextOptions,
        includeSummary: true
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
      return targetObject.TenseTabsState.selected;
    }
    function setSelectedTenseTab(value) {
      if (targetObject.TENSE_ORDER.includes(value)) {
        const previous = targetObject.TenseTabsState.selected;
        targetObject.TenseTabsState.selected = value;
        if (previous !== value) {
          resetToggleStateForTense(value);
          const activeNawatRoute = getActiveNawatRouteProfile();
          const activeRouteTenseValues = [activeNawatRoute?.targetTenseValue || "", activeNawatRoute?.nawatTenseValue || "", activeNawatRoute?.routeTenseValue || "", activeNawatRoute?.sourceTenseValue || "", activeNawatRoute?.activeStationTenseValue || ""].filter(Boolean);
          if (activeNawatRoute && !activeRouteTenseValues.includes(value)) {
            clearActiveNawatRouteProfile();
          }
        }
      }
    }
    function getSelectedPretUniversalTab() {
      return targetObject.PreteritoUniversalTabsState.selected;
    }
    function setSelectedPretUniversalTab(value) {
      if (targetObject.PRETERITO_UNIVERSAL_ORDER.includes(value)) {
        const previous = targetObject.PreteritoUniversalTabsState.selected;
        targetObject.PreteritoUniversalTabsState.selected = value;
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
      classFilter = targetObject.ClassFilterState.activeClass
    } = {}) {
      const resolvedTenseMode = Object.values(targetObject.TENSE_MODE).includes(tenseMode) ? tenseMode : getActiveTenseMode();
      const resolvedGroup = targetObject.isNominalTenseMode(resolvedTenseMode) ? targetObject.CONJUGATION_GROUPS.tense : group === targetObject.CONJUGATION_GROUPS.universal ? targetObject.CONJUGATION_GROUPS.universal : targetObject.CONJUGATION_GROUPS.tense;
      return {
        tenseMode: resolvedTenseMode,
        group: resolvedGroup,
        tenseValue: String(tenseValue || ""),
        universalTenseValue: String(universalTenseValue || ""),
        classFilter: classFilter || null
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
          classFilter: hasNestedClassFilter ? nestedSelectionState.classFilter : fallback.classFilter
        });
      }
      const hasClassFilter = Object.prototype.hasOwnProperty.call(snapshot, "classFilter");
      return buildConjugationSelectionState({
        ...fallback,
        tenseMode: snapshot.tenseMode || snapshot.mode || fallback.tenseMode,
        group: snapshot.group || fallback.group,
        tenseValue: snapshot.tenseValue || snapshot.tense || snapshot.tenseTab || fallback.tenseValue,
        universalTenseValue: snapshot.universalTenseValue || snapshot.pret || snapshot.pretUniversalTab || fallback.universalTenseValue,
        classFilter: hasClassFilter ? snapshot.classFilter : fallback.classFilter
      });
    }
    function getPretUniversalAvailabilityEntry(tenseValue = "", availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache) {
      const list = Array.isArray(availabilityEntries) ? availabilityEntries : [];
      return list.find(entry => entry?.tenseValue === String(tenseValue || "")) || null;
    }
    function isPretUniversalClassAvailable(classKey = "", availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache) {
      if (!classKey) {
        return false;
      }
      return (Array.isArray(availabilityEntries) ? availabilityEntries : []).some(entry => targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[entry?.tenseValue || ""] === classKey && targetObject.resolveTenseAvailabilityIsAvailable(entry) === true);
    }
    function resolveConjugationSelectionState(selectionState = null, {
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      const requested = extractConjugationSelectionState(selectionState, {
        tenseMode
      });
      const resolvedTenseMode = Object.values(targetObject.TENSE_MODE).includes(tenseMode) ? tenseMode : requested.tenseMode;
      const allowedTenses = getTenseOrderForMode(resolvedTenseMode);
      const tenseValue = allowedTenses.includes(requested.tenseValue) ? requested.tenseValue : allowedTenses[0] || targetObject.TENSE_ORDER[0] || "";
      const hasAvailabilityEntries = Array.isArray(availabilityEntries) && availabilityEntries.length > 0;
      let universalTenseValue = targetObject.PRETERITO_UNIVERSAL_ORDER.includes(requested.universalTenseValue) ? requested.universalTenseValue : targetObject.PRETERITO_UNIVERSAL_ORDER[0] || "";
      let universalEntry = hasAvailabilityEntries ? getPretUniversalAvailabilityEntry(universalTenseValue, availabilityEntries) : null;
      if (hasAvailabilityEntries && targetObject.resolveTenseAvailabilityIsAvailable(universalEntry) !== true) {
        const firstAvailable = targetObject.getFirstAvailableEntry(availabilityEntries, universalTenseValue, "tenseValue");
        if (firstAvailable) {
          universalEntry = firstAvailable;
          universalTenseValue = firstAvailable.tenseValue || universalTenseValue;
        }
      }
      let group = targetObject.isNominalTenseMode(resolvedTenseMode) ? targetObject.CONJUGATION_GROUPS.tense : requested.group;
      if (group === targetObject.CONJUGATION_GROUPS.universal && hasAvailabilityEntries && targetObject.resolveTenseAvailabilityIsAvailable(universalEntry) !== true) {
        group = targetObject.CONJUGATION_GROUPS.tense;
      }
      let classFilter = requested.classFilter && targetObject.PRETERITO_CLASS_DETAIL_BY_KEY[requested.classFilter] ? requested.classFilter : null;
      if (!targetObject.PRETERITO_CLASS_TENSES.has(tenseValue)) {
        classFilter = null;
      } else if (hasAvailabilityEntries && classFilter && !isPretUniversalClassAvailable(classFilter, availabilityEntries)) {
        classFilter = null;
      }
      return buildConjugationSelectionState({
        tenseMode: resolvedTenseMode,
        group,
        tenseValue,
        universalTenseValue,
        classFilter
      });
    }
    function applyResolvedConjugationSelectionState(resolvedSelectionState = null) {
      const resolved = buildConjugationSelectionState(resolvedSelectionState || {});
      setSelectedTenseTab(resolved.tenseValue);
      setSelectedPretUniversalTab(resolved.universalTenseValue);
      setActiveConjugationGroup(resolved.group);
      targetObject.ClassFilterState.activeClass = resolved.classFilter;
      return resolved;
    }
    function applyConjugationSelectionState(selectionState = null, {
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      const resolved = resolveConjugationSelectionState(selectionState, {
        tenseMode,
        availabilityEntries
      });
      return applyResolvedConjugationSelectionState(resolved);
    }
    function mutateConjugationSelectionState(mutation = null, {
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      const current = getCurrentResolvedConjugationSelectionState({
        tenseMode,
        availabilityEntries
      });
      const nextValue = typeof mutation === "function" ? mutation(current) : {
        ...current,
        ...(mutation && typeof mutation === "object" ? mutation : {})
      };
      return applyConjugationSelectionState(nextValue, {
        tenseMode,
        availabilityEntries
      });
    }
    function buildConjugationSelectionStateCacheToken(selectionState = null) {
      const resolved = resolveConjugationSelectionState(selectionState);
      return [resolved.tenseMode, resolved.group, resolved.tenseValue, resolved.universalTenseValue, resolved.classFilter || ""].join("|");
    }
    function getCurrentResolvedConjugationSelectionState({
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      return resolveConjugationSelectionState(buildConjugationSelectionState({
        tenseMode
      }), {
        tenseMode,
        availabilityEntries
      });
    }

    // === Toggle Lock Functions ===

    function isToggleLockEnabled() {
      return targetObject.ToggleLockState.enabled === true;
    }
    function getToggleLockValueStoreByMap(map) {
      if (map === targetObject.ObjectToggleState) {
        return targetObject.ToggleLockValueState.object;
      }
      if (map === targetObject.SubjectToggleState) {
        return targetObject.ToggleLockValueState.subject;
      }
      if (map === targetObject.PossessorToggleState) {
        return targetObject.ToggleLockValueState.possessor;
      }
      if (map === targetObject.PatientivoOwnershipState) {
        return targetObject.ToggleLockValueState.patientivoOwnership;
      }
      if (map === targetObject.PatientivoNominalSuffixState) {
        return targetObject.ToggleLockValueState.patientivoNominalSuffix;
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
    function setToggleStateValue(map, stateKey, value, {
      syncLock = false
    } = {}) {
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
      targetObject.ToggleLockValueState.object.clear();
      targetObject.ToggleLockValueState.subject.clear();
      targetObject.ToggleLockValueState.possessor.clear();
      targetObject.ToggleLockValueState.patientivoOwnership.clear();
      targetObject.ToggleLockValueState.patientivoNominalSuffix.clear();
      targetObject.ToggleLockValueState.sourceScope = "";
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
      seedMap(targetObject.ObjectToggleState, targetObject.ToggleLockValueState.object);
      seedMap(targetObject.SubjectToggleState, targetObject.ToggleLockValueState.subject);
      seedMap(targetObject.PossessorToggleState, targetObject.ToggleLockValueState.possessor);
      seedMap(targetObject.PatientivoOwnershipState, targetObject.ToggleLockValueState.patientivoOwnership);
      seedMap(targetObject.PatientivoNominalSuffixState, targetObject.ToggleLockValueState.patientivoNominalSuffix);
      setToggleLockSourceScopeValue(targetObject.VerbSourceScopeState.scope);
    }
    function clearAllToggleStateMaps({
      resetNonactiveSuffix = false,
      resetSourceScope = false
    } = {}) {
      targetObject.SubjectToggleState.clear();
      targetObject.ObjectToggleState.clear();
      targetObject.PossessorToggleState.clear();
      targetObject.PatientivoOwnershipState.clear();
      targetObject.PatientivoNominalSuffixState.clear();
      targetObject.DefaultToggleApplied.clear();
      if (resetNonactiveSuffix) {
        setSelectedNonactiveSuffix(null);
      }
      if (resetSourceScope) {
        setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.both, {
          syncCombinedMode: false,
          syncLock: false,
          respectLock: false
        });
      }
    }
    function applyDefaultToggleStateOnce(map, stateKey, verbKey, value) {
      if (!stateKey || !verbKey) {
        return;
      }
      const appliedKey = `${verbKey}|${stateKey}`;
      if (targetObject.DefaultToggleApplied.has(appliedKey)) {
        return;
      }
      map.set(stateKey, value);
      targetObject.DefaultToggleApplied.add(appliedKey);
    }

    const api = {};
    api.getSubjectPersonSelections = getSubjectPersonSelections;
    api.getSubjectCombinationId = getSubjectCombinationId;
    api.buildReduplicatedSurfaceForm = buildReduplicatedSurfaceForm;
    api.reduplicateConjugationDisplay = reduplicateConjugationDisplay;
    api.splitConjugationDisplayForms = splitConjugationDisplayForms;
    api.getStateResultFrame = getStateResultFrame;
    api.getStateResultFramePayload = getStateResultFramePayload;
    api.hasStateResultFrame = hasStateResultFrame;
    api.getStateFrameResultSurfaceForms = getStateFrameResultSurfaceForms;
    api.getStateResultSurfaceForms = getStateResultSurfaceForms;
    api.getStateResultDisplaySurface = getStateResultDisplaySurface;
    api.getStateNum1Num2Surface = getStateNum1Num2Surface;
    api.getNawatLinkedGrammarPathStageSourceVerb = getNawatLinkedGrammarPathStageSourceVerb;
    api.getNawatLinkedGrammarPathStageDisplaySurface = getNawatLinkedGrammarPathStageDisplaySurface;
    api.buildReduplicatedConjugationResult = buildReduplicatedConjugationResult;
    api.getNominalSubjectSelectionEntries = getNominalSubjectSelectionEntries;
    api.getPersonGroupLabel = getPersonGroupLabel;
    api.getPersonSubLabel = getPersonSubLabel;
    api.getSubjectPersonLabel = getSubjectPersonLabel;
    api.getLocalizedLabel = getLocalizedLabel;
    api.getToggleLabel = getToggleLabel;
    api.getPlaceholderLabel = getPlaceholderLabel;
    api.getVerbBlockLabel = getVerbBlockLabel;
    api.getIsNawat = getIsNawat;
    api.getLocalizedDescription = getLocalizedDescription;
    api.getPretUniversalClassDetail = getPretUniversalClassDetail;
    api.getObjectStateKey = getObjectStateKey;
    api.getPatientivoOwnershipKey = getPatientivoOwnershipKey;
    api.getPatientivoNominalSuffixKey = getPatientivoNominalSuffixKey;
    api.clearToggleStateByPrefix = clearToggleStateByPrefix;
    api.resetToggleStateForTense = resetToggleStateForTense;
    api.getSubjectToggleOptions = getSubjectToggleOptions;
    api.getPotencialHabitualNonactiveSubjectToggleOptions = getPotencialHabitualNonactiveSubjectToggleOptions;
    api.getDefaultNounSubjectId = getDefaultNounSubjectId;
    api.getObjectToggleOptions = getObjectToggleOptions;
    Object.defineProperty(api, "VERB_OBJECT_SLOT_SCHEMA", {
        configurable: true,
        enumerable: true,
        get() { return VERB_OBJECT_SLOT_SCHEMA; },
        set(value) { VERB_OBJECT_SLOT_SCHEMA = value; },
    });
    Object.defineProperty(api, "DERIVATION_CONTROLLER_SLOT_PRIORITY", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_CONTROLLER_SLOT_PRIORITY; },
        set(value) { DERIVATION_CONTROLLER_SLOT_PRIORITY = value; },
    });
    api.getDerivationControllerSlotPriority = getDerivationControllerSlotPriority;
    api.getVerbObjectSlotSchema = getVerbObjectSlotSchema;
    api.getPassiveToggleLabel = getPassiveToggleLabel;
    api.getNonspecificToggleLabel = getNonspecificToggleLabel;
    api.getZeroObjectDisplayValue = getZeroObjectDisplayValue;
    api.isPotencialProfileTense = isPotencialProfileTense;
    api.isPotencialHabitualTense = isPotencialHabitualTense;
    api.allowsCollapsedDerivedNounSlot = allowsCollapsedDerivedNounSlot;
    api.isPotencialActiveTense = isPotencialActiveTense;
    api.isPatientivoAdjectiveTense = isPatientivoAdjectiveTense;
    api.getPatientivoAdjectiveSourceForTense = getPatientivoAdjectiveSourceForTense;
    api.isIntransitiveOnlyActiveAdjectiveTense = isIntransitiveOnlyActiveAdjectiveTense;
    api.isActiveAdjectiveTabTense = isActiveAdjectiveTabTense;
    api.isNonactiveAdjectiveTabTense = isNonactiveAdjectiveTabTense;
    api.normalizeNawatPatientivoSourceFamily = normalizeNawatPatientivoSourceFamily;
    api.isNawatPatientivoNonactiveSource = isNawatPatientivoNonactiveSource;
    api.getNominalSourceModeForTense = getNominalSourceModeForTense;
    api.getResolvedNominalCombinedModeForTense = getResolvedNominalCombinedModeForTense;
    api.getPatientivoSourceTenseLabel = getPatientivoSourceTenseLabel;
    api.getNominalSourceTenseLabel = getNominalSourceTenseLabel;
    api.getNominalDerivationModeForTense = getNominalDerivationModeForTense;
    api.normalizeHeaderLabelText = normalizeHeaderLabelText;
    api.shouldAppendNominalSourceTense = shouldAppendNominalSourceTense;
    api.buildNominalSourceTaggedLabel = buildNominalSourceTaggedLabel;
    api.isPotencialTroncoActiveTense = isPotencialTroncoActiveTense;
    api.isPotencialTroncoNajActiveTense = isPotencialTroncoNajActiveTense;
    api.isSubjectlessNominalTense = isSubjectlessNominalTense;
    api.getPotencialActiveSourceTense = getPotencialActiveSourceTense;
    api.getActiveAdjectiveProfileType = getActiveAdjectiveProfileType;
    api.getNawatRouteProfileMap = getNawatRouteProfileMap;
    Object.defineProperty(api, "DISCONNECTED_NAWAT_ROUTE_IDS", {
        configurable: true,
        enumerable: true,
        get() { return DISCONNECTED_NAWAT_ROUTE_IDS; },
    });
    api.isDisconnectedNawatRouteProfile = isDisconnectedNawatRouteProfile;
    api.cloneNawatRouteProfile = cloneNawatRouteProfile;
    api.getNawatRouteProfile = getNawatRouteProfile;
    api.getRouteTenseForNawatRoute = getRouteTenseForNawatRoute;
    api.getNawatRouteStationList = getNawatRouteStationList;
    api.normalizeNawatRouteStationKey = normalizeNawatRouteStationKey;
    api.unwrapNawatRouteInputValue = unwrapNawatRouteInputValue;
    api.wrapNawatRouteInputValue = wrapNawatRouteInputValue;
    api.formatNawatRouteTargetInputValue = formatNawatRouteTargetInputValue;
    api.getNawatRouteProfiles = getNawatRouteProfiles;
    api.getNawatRouteStateStore = getNawatRouteStateStore;
    api.getNawatRoutePlacement = getNawatRoutePlacement;
    api.isAgentiveMannerRoute = isAgentiveMannerRoute;
    api.isPatientivoTroncoConversionRoute = isPatientivoTroncoConversionRoute;
    api.isPatientivoSurfaceRoute = isPatientivoSurfaceRoute;
    api.isNonactiveHabitualRoute = isNonactiveHabitualRoute;
    api.isDirectFiniteRoute = isDirectFiniteRoute;
    api.isNawatDynamicPatientivoSurfaceRoute = isNawatDynamicPatientivoSurfaceRoute;
    Object.defineProperty(api, "NAWAT_PATIENTIVO_IMPERFECTIVE_SOURCE_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_IMPERFECTIVE_SOURCE_TENSES; },
    });
    Object.defineProperty(api, "NAWAT_PATIENTIVO_PERFECTIVE_SOURCE_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_PERFECTIVE_SOURCE_TENSES; },
    });
    Object.defineProperty(api, "NAWAT_ROUTE_PATIENTIVO_ACTIVE_SUFFIX_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_ROUTE_PATIENTIVO_ACTIVE_SUFFIX_BY_TENSE; },
    });
    Object.defineProperty(api, "NAWAT_ROUTE_PATIENTIVO_NONACTIVE_SUFFIX_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_ROUTE_PATIENTIVO_NONACTIVE_SUFFIX_BY_TENSE; },
    });
    Object.defineProperty(api, "NAWAT_ROUTE_NONACTIVE_CORE_PATIENTIVO_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_ROUTE_NONACTIVE_CORE_PATIENTIVO_TENSES; },
    });
    api.getCanonicalNawatPatientivoSourceTenseValue = getCanonicalNawatPatientivoSourceTenseValue;
    api.resolveNawatPatientivoRouteSourceClass = resolveNawatPatientivoRouteSourceClass;
    api.resolveNawatPatientivoRouteSpec = resolveNawatPatientivoRouteSpec;
    api.resolveNawatVerbNounConversionRouteKeyForSource = resolveNawatVerbNounConversionRouteKeyForSource;
    api.isNawatRouteNonactiveSource = isNawatRouteNonactiveSource;
    api.getNawatRoutePatientivoSurfaceSpec = getNawatRoutePatientivoSurfaceSpec;
    api.getNawatStaticRouteAndrewsRefs = getNawatStaticRouteAndrewsRefs;
    api.attachNawatStaticRouteGrammarFrame = attachNawatStaticRouteGrammarFrame;
    api.buildNawatRouteSurfaceResultContract = buildNawatRouteSurfaceResultContract;
    api.resolveNawatRoutePatientivoNominalSuffix = resolveNawatRoutePatientivoNominalSuffix;
    api.getNawatRouteTargetMode = getNawatRouteTargetMode;
    api.getNawatRouteTargetTenseValue = getNawatRouteTargetTenseValue;
    api.getNawatRouteOriginMode = getNawatRouteOriginMode;
    api.getNawatRouteOriginTenseValue = getNawatRouteOriginTenseValue;
    api.getNawatRouteDefaultSourceTenseValue = getNawatRouteDefaultSourceTenseValue;
    api.getNawatConventionModeLabel = getNawatConventionModeLabel;
    api.getNawatRouteConversionModes = getNawatRouteConversionModes;
    api.formatNawatRouteConversionLabel = formatNawatRouteConversionLabel;
    api.stripNawatRouteVerbalizerFromTarget = stripNawatRouteVerbalizerFromTarget;
    api.getNawatRouteStationText = getNawatRouteStationText;
    api.getNawatRouteStationSurfaceText = getNawatRouteStationSurfaceText;
    api.formatNawatRouteStationChipText = formatNawatRouteStationChipText;
    api.getNawatRouteSourceSurfaceResult = getNawatRouteSourceSurfaceResult;
    api.getNawatRouteSourceSurfaceForm = getNawatRouteSourceSurfaceForm;
    api.stripNawatRoutePreposedParticle = stripNawatRoutePreposedParticle;
    api.replaceNawatRouteSurfaceEnding = replaceNawatRouteSurfaceEnding;
    api.appendNawatRouteNominalSuffix = appendNawatRouteNominalSuffix;
    api.stripNawatRouteIaUaPatientivoStemFinalA = stripNawatRouteIaUaPatientivoStemFinalA;
    api.deriveNawatRouteActivePatientivoStem = deriveNawatRouteActivePatientivoStem;
    api.deriveNawatRouteNonactivePatientivoStem = deriveNawatRouteNonactivePatientivoStem;
    api.generateNawatRoutePatientivoSurfaceResult = generateNawatRoutePatientivoSurfaceResult;
    api.getNawatRouteGeneratedPatientivoConnectorSuffix = getNawatRouteGeneratedPatientivoConnectorSuffix;
    api.getNawatVerbNounConversionNominalSurfaceResult = getNawatVerbNounConversionNominalSurfaceResult;
    api.getNawatVerbNounConversionNominalSurfaceForm = getNawatVerbNounConversionNominalSurfaceForm;
    api.getNawatRouteFiniteSurfaceResult = getNawatRouteFiniteSurfaceResult;
    api.getNawatRouteFiniteSurfaceForm = getNawatRouteFiniteSurfaceForm;
    api.getNawatRouteSurfaceTrailParts = getNawatRouteSurfaceTrailParts;
    api.formatNawatRouteSurfaceTrailLabel = formatNawatRouteSurfaceTrailLabel;
    api.buildNawatDenominalAndrewsRouteSourceEvidenceFromLinkedStage = buildNawatDenominalAndrewsRouteSourceEvidenceFromLinkedStage;
    api.buildNawatLinkedGrammarPathStages = buildNawatLinkedGrammarPathStages;
    api.buildNawatLinkedGrammarPathStageGenerateWordRequest = buildNawatLinkedGrammarPathStageGenerateWordRequest;
    api.collectNawatLinkedGrammarPathDiagnostics = collectNawatLinkedGrammarPathDiagnostics;
    api.attachNawatLinkedGrammarPathContract = attachNawatLinkedGrammarPathContract;
    api.executeNawatLinkedGrammarPathStage = executeNawatLinkedGrammarPathStage;
    api.previewNawatLinkedGrammarPathNextSource = previewNawatLinkedGrammarPathNextSource;
    api.getNawatLinkedGrammarPathSelectionRoute = getNawatLinkedGrammarPathSelectionRoute;
    api.getNawatLinkedGrammarPathSelectionStage = getNawatLinkedGrammarPathSelectionStage;
    api.previewNawatLinkedGrammarPathChain = previewNawatLinkedGrammarPathChain;
    api.executeNawatLinkedGrammarPathChain = executeNawatLinkedGrammarPathChain;
    api.buildNawatLinkedGrammarPathSelectionSummary = buildNawatLinkedGrammarPathSelectionSummary;
    api.normalizeNawatLinkedGrammarPathSelection = normalizeNawatLinkedGrammarPathSelection;
    api.normalizeNawatLinkedGrammarPathSelections = normalizeNawatLinkedGrammarPathSelections;
    api.getActiveNawatLinkedGrammarPathSelections = getActiveNawatLinkedGrammarPathSelections;
    api.getActiveNawatLinkedGrammarPathSource = getActiveNawatLinkedGrammarPathSource;
    api.setActiveNawatLinkedGrammarPathSelections = setActiveNawatLinkedGrammarPathSelections;
    api.appendActiveNawatLinkedGrammarPathSelection = appendActiveNawatLinkedGrammarPathSelection;
    api.removeLastActiveNawatLinkedGrammarPathSelection = removeLastActiveNawatLinkedGrammarPathSelection;
    api.executeActiveNawatLinkedGrammarPathSelections = executeActiveNawatLinkedGrammarPathSelections;
    api.getNawatLinkedGrammarPathExecutionSourceOptions = getNawatLinkedGrammarPathExecutionSourceOptions;
    api.getNawatLinkedGrammarPathExecutionFinalSource = getNawatLinkedGrammarPathExecutionFinalSource;
    api.applyNawatLinkedGrammarPathSourceInput = applyNawatLinkedGrammarPathSourceInput;
    api.promoteActiveNawatLinkedGrammarPathExecutionStepSource = promoteActiveNawatLinkedGrammarPathExecutionStepSource;
    api.promoteActiveNawatLinkedGrammarPathExecutionFinalSource = promoteActiveNawatLinkedGrammarPathExecutionFinalSource;
    api.clearActiveNawatLinkedGrammarPathSelections = clearActiveNawatLinkedGrammarPathSelections;
    api.getPrimaryNawatRouteSurfaceForm = getPrimaryNawatRouteSurfaceForm;
    api.executeNawatRouteConfiguredGeneration = executeNawatRouteConfiguredGeneration;
    api.resolveNawatRoutePatientivoTroncoStem = resolveNawatRoutePatientivoTroncoStem;
    api.resolveNawatRouteVerbalizedVerb = resolveNawatRouteVerbalizedVerb;
    api.resolveNawatRouteTarget = resolveNawatRouteTarget;
    api.summarizeNawatRouteSourceStateStation = summarizeNawatRouteSourceStateStation;
    api.getNawatDenominalRouteFamilyKey = getNawatDenominalRouteFamilyKey;
    api.getNawatDenominalRouteStructuralAnalogue = getNawatDenominalRouteStructuralAnalogue;
    Object.defineProperty(api, "NAWAT_DENOMINAL_ANDREWS_CONTRACT_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_DENOMINAL_ANDREWS_CONTRACT_SPECS; },
    });
    api.hasAndrewsDenominalSuffixContract = hasAndrewsDenominalSuffixContract;
    api.getNawatDenominalRouteCurriculumRef = getNawatDenominalRouteCurriculumRef;
    api.getNawatDenominalRouteSupportStatus = getNawatDenominalRouteSupportStatus;
    api.getNawatDenominalRouteSuffixContract = getNawatDenominalRouteSuffixContract;
    api.buildNawatDenominalAndrewsSuffixContract = buildNawatDenominalAndrewsSuffixContract;
    api.getNawatRouteIdsForDenominalFamilies = getNawatRouteIdsForDenominalFamilies;
    api.getNawatDenominalRouteFamiliesWithoutAndrewsContract = getNawatDenominalRouteFamiliesWithoutAndrewsContract;
    api.getNawatDenominalAndrewsContractInventory = getNawatDenominalAndrewsContractInventory;
    api.getNawatDenominalAndrewsContractCoverageSummary = getNawatDenominalAndrewsContractCoverageSummary;
    Object.defineProperty(api, "LESSON54_DENOMINAL_VERBSTEM_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON54_DENOMINAL_VERBSTEM_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON54_DENOMINAL_VERBSTEM_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON54_DENOMINAL_VERBSTEM_VALIDATION_REFS; },
    });
    api.getLesson54DenominalVerbstemSubsectionFrames = getLesson54DenominalVerbstemSubsectionFrames;
    api.buildLesson54DenominalVerbstemPursuitFrame = buildLesson54DenominalVerbstemPursuitFrame;
    Object.defineProperty(api, "LESSON55_DENOMINAL_VERBSTEM_PDF_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON55_DENOMINAL_VERBSTEM_PDF_REFS; },
    });
    Object.defineProperty(api, "LESSON55_DENOMINAL_VERBSTEM_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON55_DENOMINAL_VERBSTEM_VALIDATION_REFS; },
    });
    api.getLesson55DenominalVerbstemSubsectionFrames = getLesson55DenominalVerbstemSubsectionFrames;
    api.buildLesson55DenominalVerbstemPursuitFrame = buildLesson55DenominalVerbstemPursuitFrame;
    Object.defineProperty(api, "NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_DENOMINAL_ANDREWS_ROUTE_TEMPLATES_BY_CONTRACT_ID; },
    });
    api.normalizeNawatDenominalContractSourceStem = normalizeNawatDenominalContractSourceStem;
    api.buildNawatDenominalAndrewsRouteTemplateSuffix = buildNawatDenominalAndrewsRouteTemplateSuffix;
    api.isNawatDenominalAndrewsContractRouteObjectSlotExpected = isNawatDenominalAndrewsContractRouteObjectSlotExpected;
    api.getNawatDenominalAndrewsRouteSourceFinalLetter = getNawatDenominalAndrewsRouteSourceFinalLetter;
    api.getNawatDenominalAndrewsRouteSourceFinalType = getNawatDenominalAndrewsRouteSourceFinalType;
    api.resolveNawatDenominalAndrewsRouteTargetStemClass = resolveNawatDenominalAndrewsRouteTargetStemClass;
    api.normalizeNawatDenominalAndrewsRuleSourceState = normalizeNawatDenominalAndrewsRuleSourceState;
    api.resolveNawatDenominalAndrewsRuleSourceState = resolveNawatDenominalAndrewsRuleSourceState;
    api.resolveNawatDenominalAndrewsRuleSourceStem = resolveNawatDenominalAndrewsRuleSourceStem;
    api.resolveNawatDenominalAndrewsRuleSourceVerbStem = resolveNawatDenominalAndrewsRuleSourceVerbStem;
    api.resolveNawatDenominalAndrewsRuleSourceBaseStem = resolveNawatDenominalAndrewsRuleSourceBaseStem;
    api.resolveNawatDenominalAndrewsRuleSourceCategory = resolveNawatDenominalAndrewsRuleSourceCategory;
    api.buildNawatDenominalAndrewsRuleDiagnostic = buildNawatDenominalAndrewsRuleDiagnostic;
    api.diagnoseNawatDenominalAndrews5421TiRule = diagnoseNawatDenominalAndrews5421TiRule;
    api.diagnoseNawatDenominalAndrews5422HuiRule = diagnoseNawatDenominalAndrews5422HuiRule;
    api.diagnoseNawatDenominalAndrews5422HuiLiaRule = diagnoseNawatDenominalAndrews5422HuiLiaRule;
    api.diagnoseNawatDenominalAndrews5423YaRule = diagnoseNawatDenominalAndrews5423YaRule;
    api.diagnoseNawatDenominalAndrews5423TiYaRule = diagnoseNawatDenominalAndrews5423TiYaRule;
    api.diagnoseNawatDenominalAndrews5423HuiYaRule = diagnoseNawatDenominalAndrews5423HuiYaRule;
    api.diagnoseNawatDenominalAndrews5423YaLiaRule = diagnoseNawatDenominalAndrews5423YaLiaRule;
    api.diagnoseNawatDenominalAndrews5424ARule = diagnoseNawatDenominalAndrews5424ARule;
    api.diagnoseNawatDenominalAndrews5425HuaRule = diagnoseNawatDenominalAndrews5425HuaRule;
    api.diagnoseNawatDenominalAndrews543IncludedPossessorTiRule = diagnoseNawatDenominalAndrews543IncludedPossessorTiRule;
    api.diagnoseNawatDenominalAndrews542544TiLiaRule = diagnoseNawatDenominalAndrews542544TiLiaRule;
    api.diagnoseNawatDenominalAndrews545TiARule = diagnoseNawatDenominalAndrews545TiARule;
    api.diagnoseNawatDenominalAndrews546TIaRule = diagnoseNawatDenominalAndrews546TIaRule;
    api.diagnoseNawatDenominalAndrews551TemporalTiaRule = diagnoseNawatDenominalAndrews551TemporalTiaRule;
    api.diagnoseNawatDenominalAndrews552CausativeTlaRule = diagnoseNawatDenominalAndrews552CausativeTlaRule;
    api.diagnoseNawatDenominalAndrews552TlaTiLiaApplicativeRule = diagnoseNawatDenominalAndrews552TlaTiLiaApplicativeRule;
    api.diagnoseNawatDenominalAndrews552IntransitiveTlaRule = diagnoseNawatDenominalAndrews552IntransitiveTlaRule;
    api.diagnoseNawatDenominalAndrews552IntransitiveTlaTiARule = diagnoseNawatDenominalAndrews552IntransitiveTlaTiARule;
    api.diagnoseNawatDenominalAndrews552IntransitiveTlaTiLiaRule = diagnoseNawatDenominalAndrews552IntransitiveTlaTiLiaRule;
    api.diagnoseNawatDenominalAndrews553OaRule = diagnoseNawatDenominalAndrews553OaRule;
    api.diagnoseNawatDenominalAndrews553HuiaRule = diagnoseNawatDenominalAndrews553HuiaRule;
    api.diagnoseNawatDenominalAndrews553OaIlHuiaRule = diagnoseNawatDenominalAndrews553OaIlHuiaRule;
    api.diagnoseNawatDenominalAndrews553OaAlHuiaRule = diagnoseNawatDenominalAndrews553OaAlHuiaRule;
    api.diagnoseNawatDenominalAndrews554AdverbialHuiaRule = diagnoseNawatDenominalAndrews554AdverbialHuiaRule;
    api.diagnoseNawatDenominalAndrews555RelationalOaRule = diagnoseNawatDenominalAndrews555RelationalOaRule;
    api.diagnoseNawatDenominalAndrews555RelationalHuiaRule = diagnoseNawatDenominalAndrews555RelationalHuiaRule;
    api.diagnoseNawatDenominalAndrews556IHuiAHuiSourceRule = diagnoseNawatDenominalAndrews556IHuiAHuiSourceRule;
    api.diagnoseNawatDenominalAndrews556IHuiRule = diagnoseNawatDenominalAndrews556IHuiRule;
    api.diagnoseNawatDenominalAndrews556AHuiRule = diagnoseNawatDenominalAndrews556AHuiRule;
    api.diagnoseNawatDenominalAndrews556OaRule = diagnoseNawatDenominalAndrews556OaRule;
    api.diagnoseNawatDenominalAndrews557IARule = diagnoseNawatDenominalAndrews557IARule;
    api.buildNawatDenominalAndrewsExecutableRuleResult = buildNawatDenominalAndrewsExecutableRuleResult;
    api.generateNawatDenominalAndrews5421TiRule = generateNawatDenominalAndrews5421TiRule;
    api.generateNawatDenominalAndrews5422HuiRule = generateNawatDenominalAndrews5422HuiRule;
    api.generateNawatDenominalAndrews5422HuiLiaRule = generateNawatDenominalAndrews5422HuiLiaRule;
    api.generateNawatDenominalAndrews5423YaRule = generateNawatDenominalAndrews5423YaRule;
    api.generateNawatDenominalAndrews5423TiYaRule = generateNawatDenominalAndrews5423TiYaRule;
    api.generateNawatDenominalAndrews5423HuiYaRule = generateNawatDenominalAndrews5423HuiYaRule;
    api.generateNawatDenominalAndrews5423YaLiaRule = generateNawatDenominalAndrews5423YaLiaRule;
    api.generateNawatDenominalAndrews5424ARule = generateNawatDenominalAndrews5424ARule;
    api.generateNawatDenominalAndrews5425HuaRule = generateNawatDenominalAndrews5425HuaRule;
    api.generateNawatDenominalAndrews543IncludedPossessorTiRule = generateNawatDenominalAndrews543IncludedPossessorTiRule;
    api.generateNawatDenominalAndrews542544TiLiaRule = generateNawatDenominalAndrews542544TiLiaRule;
    api.generateNawatDenominalAndrews545TiARule = generateNawatDenominalAndrews545TiARule;
    api.generateNawatDenominalAndrews546TIaRule = generateNawatDenominalAndrews546TIaRule;
    api.generateNawatDenominalAndrews551TemporalTiaRule = generateNawatDenominalAndrews551TemporalTiaRule;
    api.generateNawatDenominalAndrews552CausativeTlaRule = generateNawatDenominalAndrews552CausativeTlaRule;
    api.generateNawatDenominalAndrews552TlaTiLiaApplicativeRule = generateNawatDenominalAndrews552TlaTiLiaApplicativeRule;
    api.generateNawatDenominalAndrews552IntransitiveTlaRule = generateNawatDenominalAndrews552IntransitiveTlaRule;
    api.generateNawatDenominalAndrews552IntransitiveTlaTiARule = generateNawatDenominalAndrews552IntransitiveTlaTiARule;
    api.generateNawatDenominalAndrews552IntransitiveTlaTiLiaRule = generateNawatDenominalAndrews552IntransitiveTlaTiLiaRule;
    api.generateNawatDenominalAndrews553OaRule = generateNawatDenominalAndrews553OaRule;
    api.generateNawatDenominalAndrews553HuiaRule = generateNawatDenominalAndrews553HuiaRule;
    api.generateNawatDenominalAndrews553OaIlHuiaRule = generateNawatDenominalAndrews553OaIlHuiaRule;
    api.generateNawatDenominalAndrews553OaAlHuiaRule = generateNawatDenominalAndrews553OaAlHuiaRule;
    api.generateNawatDenominalAndrews554AdverbialHuiaRule = generateNawatDenominalAndrews554AdverbialHuiaRule;
    api.generateNawatDenominalAndrews555RelationalOaRule = generateNawatDenominalAndrews555RelationalOaRule;
    api.generateNawatDenominalAndrews555RelationalHuiaRule = generateNawatDenominalAndrews555RelationalHuiaRule;
    api.generateNawatDenominalAndrews556IHuiRule = generateNawatDenominalAndrews556IHuiRule;
    api.generateNawatDenominalAndrews556AHuiRule = generateNawatDenominalAndrews556AHuiRule;
    api.generateNawatDenominalAndrews556OaRule = generateNawatDenominalAndrews556OaRule;
    api.generateNawatDenominalAndrews557IARule = generateNawatDenominalAndrews557IARule;
    api.createNawatDenominalAndrews5421TiRuleContract = createNawatDenominalAndrews5421TiRuleContract;
    api.createNawatDenominalAndrews5422HuiRuleContract = createNawatDenominalAndrews5422HuiRuleContract;
    api.createNawatDenominalAndrews5422HuiLiaRuleContract = createNawatDenominalAndrews5422HuiLiaRuleContract;
    api.createNawatDenominalAndrews5423YaRuleContract = createNawatDenominalAndrews5423YaRuleContract;
    api.createNawatDenominalAndrews5423TiYaRuleContract = createNawatDenominalAndrews5423TiYaRuleContract;
    api.createNawatDenominalAndrews5423HuiYaRuleContract = createNawatDenominalAndrews5423HuiYaRuleContract;
    api.createNawatDenominalAndrews5423YaLiaRuleContract = createNawatDenominalAndrews5423YaLiaRuleContract;
    api.createNawatDenominalAndrews5424ARuleContract = createNawatDenominalAndrews5424ARuleContract;
    api.createNawatDenominalAndrews5425HuaRuleContract = createNawatDenominalAndrews5425HuaRuleContract;
    api.createNawatDenominalAndrews543IncludedPossessorTiRuleContract = createNawatDenominalAndrews543IncludedPossessorTiRuleContract;
    api.createNawatDenominalAndrews542544TiLiaRuleContract = createNawatDenominalAndrews542544TiLiaRuleContract;
    api.createNawatDenominalAndrews545TiARuleContract = createNawatDenominalAndrews545TiARuleContract;
    api.createNawatDenominalAndrews546TIaRuleContract = createNawatDenominalAndrews546TIaRuleContract;
    api.createNawatDenominalAndrews551TemporalTiaRuleContract = createNawatDenominalAndrews551TemporalTiaRuleContract;
    api.createNawatDenominalAndrews552CausativeTlaRuleContract = createNawatDenominalAndrews552CausativeTlaRuleContract;
    api.createNawatDenominalAndrews552TlaTiLiaApplicativeRuleContract = createNawatDenominalAndrews552TlaTiLiaApplicativeRuleContract;
    api.createNawatDenominalAndrews552IntransitiveTlaRuleContract = createNawatDenominalAndrews552IntransitiveTlaRuleContract;
    api.createNawatDenominalAndrews552IntransitiveTlaTiARuleContract = createNawatDenominalAndrews552IntransitiveTlaTiARuleContract;
    api.createNawatDenominalAndrews552IntransitiveTlaTiLiaRuleContract = createNawatDenominalAndrews552IntransitiveTlaTiLiaRuleContract;
    api.createNawatDenominalAndrews553OaRuleContract = createNawatDenominalAndrews553OaRuleContract;
    api.createNawatDenominalAndrews553HuiaRuleContract = createNawatDenominalAndrews553HuiaRuleContract;
    api.createNawatDenominalAndrews553OaIlHuiaRuleContract = createNawatDenominalAndrews553OaIlHuiaRuleContract;
    api.createNawatDenominalAndrews553OaAlHuiaRuleContract = createNawatDenominalAndrews553OaAlHuiaRuleContract;
    api.createNawatDenominalAndrews554AdverbialHuiaRuleContract = createNawatDenominalAndrews554AdverbialHuiaRuleContract;
    api.createNawatDenominalAndrews555RelationalOaRuleContract = createNawatDenominalAndrews555RelationalOaRuleContract;
    api.createNawatDenominalAndrews555RelationalHuiaRuleContract = createNawatDenominalAndrews555RelationalHuiaRuleContract;
    api.createNawatDenominalAndrews556IHuiRuleContract = createNawatDenominalAndrews556IHuiRuleContract;
    api.createNawatDenominalAndrews556AHuiRuleContract = createNawatDenominalAndrews556AHuiRuleContract;
    api.createNawatDenominalAndrews556OaRuleContract = createNawatDenominalAndrews556OaRuleContract;
    api.createNawatDenominalAndrews557IARuleContract = createNawatDenominalAndrews557IARuleContract;
    api.getNawatDenominalAndrewsExecutableRuleContract = getNawatDenominalAndrewsExecutableRuleContract;
    api.getNawatDenominalAndrewsExecutableRuleContractForRoute = getNawatDenominalAndrewsExecutableRuleContractForRoute;
    api.getNawatDenominalAndrewsExecutableRuleContractsForContract = getNawatDenominalAndrewsExecutableRuleContractsForContract;
    api.summarizeNawatDenominalAndrewsExecutableRuleContract = summarizeNawatDenominalAndrewsExecutableRuleContract;
    api.executeNawatDenominalAndrewsExecutableRuleContract = executeNawatDenominalAndrewsExecutableRuleContract;
    api.classifyNawatDenominalIAStemSourceFinal = classifyNawatDenominalIAStemSourceFinal;
    api.normalizeNawatDenominalAndrewsRouteSourceEvidence = normalizeNawatDenominalAndrewsRouteSourceEvidence;
    api.buildNawatDenominalAndrewsRouteSourceRequirement = buildNawatDenominalAndrewsRouteSourceRequirement;
    api.removeNawatDenominalAndrewsSourceFinalSuffix = removeNawatDenominalAndrewsSourceFinalSuffix;
    api.buildNawatDenominalAndrewsRouteSourceEvidenceFromContractRoute = buildNawatDenominalAndrewsRouteSourceEvidenceFromContractRoute;
    api.getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput = getNawatDenominalAndrewsSourceSurfaceFromOrdinaryNncOutput;
    api.buildNawatDenominalAndrewsRouteSourceEvidenceFromOrdinaryNncOutput = buildNawatDenominalAndrewsRouteSourceEvidenceFromOrdinaryNncOutput;
    api.previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput = previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput;
    api.buildNawatDenominalAndrewsInceptiveTiSourceEvidenceFromOrdinaryNncOutput = buildNawatDenominalAndrewsInceptiveTiSourceEvidenceFromOrdinaryNncOutput;
    api.previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput = previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput;
    api.buildNawatDenominalAndrewsInceptiveHuiSourceEvidenceFromOrdinaryNncOutput = buildNawatDenominalAndrewsInceptiveHuiSourceEvidenceFromOrdinaryNncOutput;
    api.previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput = previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput;
    api.buildNawatDenominalAndrewsRootPlusYaSourceEvidenceFromOrdinaryNncOutput = buildNawatDenominalAndrewsRootPlusYaSourceEvidenceFromOrdinaryNncOutput;
    api.previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput = previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput;
    api.buildNawatDenominalAndrewsInceptiveASourceEvidenceFromOrdinaryNncOutput = buildNawatDenominalAndrewsInceptiveASourceEvidenceFromOrdinaryNncOutput;
    api.previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput = previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput;
    api.normalizeNawatDenominalAndrewsHuaCharacteristicPropertySourceStem = normalizeNawatDenominalAndrewsHuaCharacteristicPropertySourceStem;
    api.buildNawatDenominalAndrewsHuaSourceEvidenceRecordsFromCharacteristicPropertyOutput = buildNawatDenominalAndrewsHuaSourceEvidenceRecordsFromCharacteristicPropertyOutput;
    api.buildNawatDenominalAndrewsHuaSourceEvidenceFromCharacteristicPropertyOutput = buildNawatDenominalAndrewsHuaSourceEvidenceFromCharacteristicPropertyOutput;
    api.previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput = previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput;
    api.buildNawatDenominalAndrewsPossessionTiSourceEvidenceFromOrdinaryNncOutput = buildNawatDenominalAndrewsPossessionTiSourceEvidenceFromOrdinaryNncOutput;
    api.previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput = previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput;
    api.resolveNawatDenominalAndrewsExplicitSourceSurface = resolveNawatDenominalAndrewsExplicitSourceSurface;
    api.buildNawatDenominalAndrewsTemporalTiaSourceEvidence = buildNawatDenominalAndrewsTemporalTiaSourceEvidence;
    api.previewNawatDenominalAndrewsTemporalTiaRouteFromSource = previewNawatDenominalAndrewsTemporalTiaRouteFromSource;
    api.buildNawatDenominalAndrewsAdverbialHuiaSourceEvidence = buildNawatDenominalAndrewsAdverbialHuiaSourceEvidence;
    api.previewNawatDenominalAndrewsAdverbialHuiaRouteFromSource = previewNawatDenominalAndrewsAdverbialHuiaRouteFromSource;
    api.buildNawatDenominalAndrewsRelationalCompoundSourceEvidence = buildNawatDenominalAndrewsRelationalCompoundSourceEvidence;
    api.previewNawatDenominalAndrewsRelationalCompoundRouteFromSource = previewNawatDenominalAndrewsRelationalCompoundRouteFromSource;
    api.buildNawatDenominalAndrewsRouteDiagnostics = buildNawatDenominalAndrewsRouteDiagnostics;
    api.attachNawatDenominalAndrewsContractGrammarFrame = attachNawatDenominalAndrewsContractGrammarFrame;
    api.formatNawatDenominalAndrewsContractTargetInput = formatNawatDenominalAndrewsContractTargetInput;
    api.buildNawatDenominalAndrewsContractRoute = buildNawatDenominalAndrewsContractRoute;
    api.buildNawatDenominalAndrewsContractRouteGenerateWordRequest = buildNawatDenominalAndrewsContractRouteGenerateWordRequest;
    api.executeNawatDenominalAndrewsContractRoute = executeNawatDenominalAndrewsContractRoute;
    Object.defineProperty(api, "activeNawatDenominalAndrewsContractRouteContext", {
        configurable: true,
        enumerable: true,
        get() { return activeNawatDenominalAndrewsContractRouteContext; },
        set(value) { activeNawatDenominalAndrewsContractRouteContext = value; },
    });
    api.getNawatDenominalAndrewsRouteComparableInputs = getNawatDenominalAndrewsRouteComparableInputs;
    api.setActiveNawatDenominalAndrewsContractRouteContext = setActiveNawatDenominalAndrewsContractRouteContext;
    api.clearActiveNawatDenominalAndrewsContractRouteContext = clearActiveNawatDenominalAndrewsContractRouteContext;
    api.getActiveNawatDenominalAndrewsContractRouteContext = getActiveNawatDenominalAndrewsContractRouteContext;
    api.previewActiveNawatDenominalAndrewsContractRouteNextSource = previewActiveNawatDenominalAndrewsContractRouteNextSource;
    api.activateNawatDenominalAndrewsContractRouteTarget = activateNawatDenominalAndrewsContractRouteTarget;
    api.previewNawatDenominalAndrewsContractRouteNextSource = previewNawatDenominalAndrewsContractRouteNextSource;
    api.generateNawatDenominalAndrewsContractRoutePreview = generateNawatDenominalAndrewsContractRoutePreview;
    api.buildNawatDenominalRouteBoundaries = buildNawatDenominalRouteBoundaries;
    api.buildNawatDenominalFamilyProfile = buildNawatDenominalFamilyProfile;
    api.getNawatDenominalRouteFamilyInventory = getNawatDenominalRouteFamilyInventory;
    api.generateNawatDenominalRouteFamilyPreview = generateNawatDenominalRouteFamilyPreview;
    api.resolveNawatRouteSourceStateMetadata = resolveNawatRouteSourceStateMetadata;
    api.resolveNawatRouteSourceContext = resolveNawatRouteSourceContext;
    api.getNawatRouteStationModels = getNawatRouteStationModels;
    api.getNawatRouteStationModel = getNawatRouteStationModel;
    api.formatNawatRouteStationConversionLabel = formatNawatRouteStationConversionLabel;
    api.getActiveNawatRouteProfile = getActiveNawatRouteProfile;
    api.setActiveNawatRouteProfile = setActiveNawatRouteProfile;
    api.clearActiveNawatRouteProfile = clearActiveNawatRouteProfile;
    api.getActiveNawatTenseModeForCurrentSelection = getActiveNawatTenseModeForCurrentSelection;
    api.formatNawatRouteStemLabel = formatNawatRouteStemLabel;
    api.formatNawatRouteProfileLabel = formatNawatRouteProfileLabel;
    api.formatNawatRouteMetaLabel = formatNawatRouteMetaLabel;
    api.formatNawatRouteProfileMetaLabel = formatNawatRouteProfileMetaLabel;
    api.getEuropeanConventionModeLabel = getEuropeanConventionModeLabel;
    api.formatNawatRouteEuropeanTargetLabel = formatNawatRouteEuropeanTargetLabel;
    api.formatNawatRouteNawatTargetLabel = formatNawatRouteNawatTargetLabel;
    api.formatNawatRouteNawatOriginLabel = formatNawatRouteNawatOriginLabel;
    api.applyNawatRouteStationInput = applyNawatRouteStationInput;
    api.activateNawatRouteStation = activateNawatRouteStation;
    api.activateNawatRouteProfile = activateNawatRouteProfile;
    api.activateNawatRouteOrigin = activateNawatRouteOrigin;
    api.resolveActiveAdjectiveClassPolicy = resolveActiveAdjectiveClassPolicy;
    api.selectPreferredActiveAdjectiveForms = selectPreferredActiveAdjectiveForms;
    api.getActiveConjugationGroup = getActiveConjugationGroup;
    api.setActiveConjugationGroup = setActiveConjugationGroup;
    api.getActiveTenseMode = getActiveTenseMode;
    api.getModeSystemValue = getModeSystemValue;
    api.isUnitModeSystem = isUnitModeSystem;
    api.isFunctionModeSystem = isFunctionModeSystem;
    api.getFunctionRoleForTenseMode = getFunctionRoleForTenseMode;
    api.getTenseModeForFunctionRole = getTenseModeForFunctionRole;
    api.getUnitKindForTenseMode = getUnitKindForTenseMode;
    api.getTenseModeForUnitKind = getTenseModeForUnitKind;
    api.getNawatTenseModeValue = getNawatTenseModeValue;
    api.getNawatOutputTenseMode = getNawatOutputTenseMode;
    api.setStoredEuropeanTenseMode = setStoredEuropeanTenseMode;
    api.setStoredNawatTenseMode = setStoredNawatTenseMode;
    api.getActiveEuropeanTenseMode = getActiveEuropeanTenseMode;
    api.getActiveFunctionMode = getActiveFunctionMode;
    api.getActiveNawatTenseMode = getActiveNawatTenseMode;
    api.getActiveFunctionRole = getActiveFunctionRole;
    api.getActiveUnitKind = getActiveUnitKind;
    api.setActiveTenseMode = setActiveTenseMode;
    api.setActiveFunctionMode = setActiveFunctionMode;
    api.setActiveEuropeanTenseMode = setActiveEuropeanTenseMode;
    api.setActiveFunctionRole = setActiveFunctionRole;
    api.setActiveUnitMode = setActiveUnitMode;
    api.setActiveNawatTenseMode = setActiveNawatTenseMode;
    api.setActiveUnitKind = setActiveUnitKind;
    api.normalizeOrdinaryNncGenerationStateValue = normalizeOrdinaryNncGenerationStateValue;
    api.normalizeOrdinaryNncGenerationNumber = normalizeOrdinaryNncGenerationNumber;
    api.normalizeOrdinaryNncGenerationPluralType = normalizeOrdinaryNncGenerationPluralType;
    api.normalizeOrdinaryNncGenerationAnimacy = normalizeOrdinaryNncGenerationAnimacy;
    api.normalizeOrdinaryNncGenerationNounClass = normalizeOrdinaryNncGenerationNounClass;
    api.parseOrdinaryNncGenerationAnalogueInput = parseOrdinaryNncGenerationAnalogueInput;
    api.formatOrdinaryNncGenerationAnalogueInput = formatOrdinaryNncGenerationAnalogueInput;
    api.getOrdinaryNncGenerationPossessorValues = getOrdinaryNncGenerationPossessorValues;
    api.normalizeOrdinaryNncGenerationPossessor = normalizeOrdinaryNncGenerationPossessor;
    api.getOrdinaryNncGenerationSubjectEntries = getOrdinaryNncGenerationSubjectEntries;
    api.normalizeOrdinaryNncGenerationSubject = normalizeOrdinaryNncGenerationSubject;
    api.getOrdinaryNncGenerationState = getOrdinaryNncGenerationState;
    api.isOrdinaryNncGenerationModeEnabled = isOrdinaryNncGenerationModeEnabled;
    api.setOrdinaryNncGenerationState = setOrdinaryNncGenerationState;
    api.setOrdinaryNncGenerationModeEnabled = setOrdinaryNncGenerationModeEnabled;
    api.buildOrdinaryNncGenerateWordRequest = buildOrdinaryNncGenerateWordRequest;
    api.getActiveVoiceMode = getActiveVoiceMode;
    api.setActiveVoiceMode = setActiveVoiceMode;
    api.getActiveDerivationMode = getActiveDerivationMode;
    api.setActiveDerivationMode = setActiveDerivationMode;
    api.getActiveDerivationType = getActiveDerivationType;
    api.setActiveDerivationType = setActiveDerivationType;
    api.getActiveCausativeSubtype = getActiveCausativeSubtype;
    api.setActiveCausativeSubtype = setActiveCausativeSubtype;
    api.getDerivationValencyDelta = getDerivationValencyDelta;
    api.getEffectiveDerivationValencyDelta = getEffectiveDerivationValencyDelta;
    api.getSelectedNonactiveSuffix = getSelectedNonactiveSuffix;
    api.setSelectedNonactiveSuffix = setSelectedNonactiveSuffix;
    api.normalizeVerbSourceScope = normalizeVerbSourceScope;
    api.getToggleLockSourceScopeValue = getToggleLockSourceScopeValue;
    api.setToggleLockSourceScopeValue = setToggleLockSourceScopeValue;
    api.getVerbSourceScope = getVerbSourceScope;
    api.setVerbSourceScope = setVerbSourceScope;
    api.getCombinedMode = getCombinedMode;
    api.setCombinedMode = setCombinedMode;
    api.getTenseOrderForMode = getTenseOrderForMode;
    api.isNounPossessionSplitTense = isNounPossessionSplitTense;
    api.isNounTenseVisibleForCombinedMode = isNounTenseVisibleForCombinedMode;
    api.getNounTenseOrderForCombinedMode = getNounTenseOrderForCombinedMode;
    api.isThreeColumnPanelLayout = isThreeColumnPanelLayout;
    api.captureViewportAnchor = captureViewportAnchor;
    api.resolveViewportAnchor = resolveViewportAnchor;
    Object.defineProperty(api, "VIEWPORT_ANCHOR_RESERVATION_SEQUENCE", {
        configurable: true,
        enumerable: true,
        get() { return VIEWPORT_ANCHOR_RESERVATION_SEQUENCE; },
        set(value) { VIEWPORT_ANCHOR_RESERVATION_SEQUENCE = value; },
    });
    api.captureStickyDesktopPaneAnchor = captureStickyDesktopPaneAnchor;
    api.captureViewportAnchorDelta = captureViewportAnchorDelta;
    api.captureOutputHeightReservation = captureOutputHeightReservation;
    api.applyOutputHeightReservation = applyOutputHeightReservation;
    api.releaseOutputHeightReservation = releaseOutputHeightReservation;
    api.preserveViewportAnchorPosition = preserveViewportAnchorPosition;
    Object.defineProperty(api, "PANEL_STACK_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return PANEL_STACK_ORDER; },
        set(value) { PANEL_STACK_ORDER = value; },
    });
    Object.defineProperty(api, "PANEL_STACK_REVEAL_CLASS", {
        configurable: true,
        enumerable: true,
        get() { return PANEL_STACK_REVEAL_CLASS; },
        set(value) { PANEL_STACK_REVEAL_CLASS = value; },
    });
    Object.defineProperty(api, "PANEL_STACK_REVEAL_DURATION_MS", {
        configurable: true,
        enumerable: true,
        get() { return PANEL_STACK_REVEAL_DURATION_MS; },
        set(value) { PANEL_STACK_REVEAL_DURATION_MS = value; },
    });
    api.normalizePanelStackMode = normalizePanelStackMode;
    api.getAdjacentPanelStackMode = getAdjacentPanelStackMode;
    api.setLeftPanelStackMode = setLeftPanelStackMode;
    api.initPanelEdgeNavigation = initPanelEdgeNavigation;
    api.initLeftPanelStackTabs = initLeftPanelStackTabs;
    api.updateTenseModeTabs = updateTenseModeTabs;
    api.initTenseModeTabs = initTenseModeTabs;
    api.updateVoiceOperatorVisibility = updateVoiceOperatorVisibility;
    api.updateCombinedModeTabs = updateCombinedModeTabs;
    api.initCombinedModeTabs = initCombinedModeTabs;
    api.getDerivationTypeDisplayLabel = getDerivationTypeDisplayLabel;
    api.getBlockedNounDerivationTypes = getBlockedNounDerivationTypes;
    Object.defineProperty(api, "DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY; },
        set(value) { DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = value; },
    });
    Object.defineProperty(api, "DERIVATION_ANTIDERIVATIVE_PENDING_KEY", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_ANTIDERIVATIVE_PENDING_KEY; },
        set(value) { DERIVATION_ANTIDERIVATIVE_PENDING_KEY = value; },
    });
    Object.defineProperty(api, "DERIVATION_ANTIDERIVATIVE_STAGE", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_ANTIDERIVATIVE_STAGE; },
        set(value) { DERIVATION_ANTIDERIVATIVE_STAGE = value; },
    });
    Object.defineProperty(api, "ShowDerivationAntiderivative", {
        configurable: true,
        enumerable: true,
        get() { return ShowDerivationAntiderivative; },
        set(value) { ShowDerivationAntiderivative = value; },
    });
    api.getNextAntiderivativeStage = getNextAntiderivativeStage;
    api.requestDerivationAntiderivativeLookup = requestDerivationAntiderivativeLookup;
    api.getUniqueAntiderivativeDirectStems = getUniqueAntiderivativeDirectStems;
    api.renderDerivationAntiderivativePanel = renderDerivationAntiderivativePanel;
    api.updateDerivationTypeControl = updateDerivationTypeControl;
    api.initDerivationTypeControl = initDerivationTypeControl;
    api.getCalcTransitivityLabel = getCalcTransitivityLabel;
    api.getCalcDerivationLabel = getCalcDerivationLabel;
    api.getCalcTenseLabel = getCalcTenseLabel;
    api.getCalcSourceScopeLabel = getCalcSourceScopeLabel;
    api.getCurrentNuclearClauseShell = getCurrentNuclearClauseShell;
    api.updateCalcSummary = updateCalcSummary;
    api.getOrthographyBridgeStatusInfo = getOrthographyBridgeStatusInfo;
    api.updateCalcStatus = updateCalcStatus;
    api.updateCalcSummaryAndStatus = updateCalcSummaryAndStatus;
    Object.defineProperty(api, "PRET_UNIVERSAL_VERB_OVERRIDES", {
        configurable: true,
        enumerable: true,
        get() { return PRET_UNIVERSAL_VERB_OVERRIDES; },
        set(value) { PRET_UNIVERSAL_VERB_OVERRIDES = value; },
    });
    api.getPretUniversalVerbOverride = getPretUniversalVerbOverride;
    api.updateVerbRuleHint = updateVerbRuleHint;
    api.getSelectedTenseTab = getSelectedTenseTab;
    api.setSelectedTenseTab = setSelectedTenseTab;
    api.getSelectedPretUniversalTab = getSelectedPretUniversalTab;
    api.setSelectedPretUniversalTab = setSelectedPretUniversalTab;
    api.buildConjugationSelectionState = buildConjugationSelectionState;
    api.extractConjugationSelectionState = extractConjugationSelectionState;
    api.getPretUniversalAvailabilityEntry = getPretUniversalAvailabilityEntry;
    api.isPretUniversalClassAvailable = isPretUniversalClassAvailable;
    api.resolveConjugationSelectionState = resolveConjugationSelectionState;
    api.applyResolvedConjugationSelectionState = applyResolvedConjugationSelectionState;
    api.applyConjugationSelectionState = applyConjugationSelectionState;
    api.mutateConjugationSelectionState = mutateConjugationSelectionState;
    api.buildConjugationSelectionStateCacheToken = buildConjugationSelectionStateCacheToken;
    api.getCurrentResolvedConjugationSelectionState = getCurrentResolvedConjugationSelectionState;
    api.isToggleLockEnabled = isToggleLockEnabled;
    api.getToggleLockValueStoreByMap = getToggleLockValueStoreByMap;
    api.getToggleLockStateKey = getToggleLockStateKey;
    api.getToggleStateValue = getToggleStateValue;
    api.setToggleStateValue = setToggleStateValue;
    api.clearToggleLockValueState = clearToggleLockValueState;
    api.seedToggleLockValueStateFromCurrentMaps = seedToggleLockValueStateFromCurrentMaps;
    api.clearAllToggleStateMaps = clearAllToggleStateMaps;
    api.applyDefaultToggleStateOnce = applyDefaultToggleStateOnce;
    return api;
}

export function installUiStateGlobals(targetObject = globalThis) {
    const api = createUiStateApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
