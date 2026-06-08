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
    function buildReduplicatedConjugationResult(result = {}, options = {}) {
      const source = result && typeof result === "object" ? result : {};
      const reduplicatedResult = reduplicateConjugationDisplay(source.result || "", options);
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
        const aKey = `${aMeta.subjectPrefix || ""}|${aMeta.subjectSuffix || ""}`;
        const bKey = `${bMeta.subjectPrefix || ""}|${bMeta.subjectSuffix || ""}`;
        const aRank = comboOrder.has(aKey) ? comboOrder.get(aKey) : Number.MAX_SAFE_INTEGER;
        const bRank = comboOrder.has(bKey) ? comboOrder.get(bKey) : Number.MAX_SAFE_INTEGER;
        return aRank - bRank;
      }).forEach(([prefix, mapped]) => {
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
      return subject.subjectPrefix || "Ø";
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
      const keys = [routeKey, profile?.id, profile?.canonicalId, profile?.legacyTenseValue].map(value => String(value || "").trim()).filter(Boolean);
      return keys.some(key => DISCONNECTED_NAWAT_ROUTE_IDS.has(key));
    }
    function cloneNawatRouteProfile(profile = null, legacyTenseValue = "") {
      if (!profile || typeof profile !== "object") {
        return null;
      }
      const hasLegacyTenseValue = Object.prototype.hasOwnProperty.call(profile, "legacyTenseValue");
      return {
        ...profile,
        legacyTenseValue: hasLegacyTenseValue ? profile.legacyTenseValue || "" : legacyTenseValue || "",
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
      const matched = Object.entries(profiles).find(([, profile]) => profile && typeof profile === "object" && (profile.id === key || profile.canonicalId === key || profile.legacyTenseValue === key));
      return matched && !isDisconnectedNawatRouteProfile(matched[1], matched[0]) ? cloneNawatRouteProfile(matched[1], matched[0]) : null;
    }
    function getLegacyTenseForNawatRoute(routeKey = "") {
      const profile = getNawatRouteProfile(routeKey);
      return profile?.legacyTenseValue || "";
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
      return Object.entries(getNawatRouteProfileMap()).map(([legacyTenseValue, profile]) => cloneNawatRouteProfile(profile, legacyTenseValue)).filter(profile => profile && profile.status !== "reserved" && !isDisconnectedNawatRouteProfile(profile, profile.legacyTenseValue || ""));
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
      return isPatientivoSurfaceRoute(profile) && !String(profile?.legacyTenseValue || "").trim() && String(profile?.sourceCategory || "").trim() === "verb-patientivo-surface";
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
    function getNawatRouteSourceSurfaceForm(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      if (!profile || !sourceVerb || !isPatientivoSurfaceRoute(profile) || typeof targetObject.executeGenerateWordRequest !== "function") {
        return "";
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
      const result = targetObject.executeGenerateWordRequest({
        options: {
          silent: true,
          skipValidation: false,
          override: {
            tense: sourceTenseValue,
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE[sourceDerivationMode] || sourceDerivationMode || targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE[sourceVoiceMode] || sourceVoiceMode || targetObject.VOICE_MODE.active,
            subjectPrefix: "",
            subjectSuffix: ""
          }
        },
        prefixInputs: {
          subjectPrefix: "",
          objectPrefix: sourceObjectPrefix || "",
          verb: sourceVerb,
          subjectSuffix: "",
          possessivePrefix: ""
        },
        liveInput: {
          hasVerbInput: false,
          verbInputValue: ""
        }
      });
      const surface = getPrimaryNawatRouteSurfaceForm(result);
      if (!isNawatDynamicPatientivoSurfaceRoute(profile) && patientivoSource === "nonactive" && sourceTenseValue === "preterito" && surface.endsWith("k")) {
        return surface.slice(0, -1);
      }
      return surface;
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
      return targetObject.executeGenerateWordRequest({
        options: {
          silent: true,
          skipValidation: true,
          override: {
            tense: "patientivo",
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: routeTarget?.sourceObjectPrefix || sourceObjectPrefix || "",
            patientivoSource: profile?.patientivoSource || "nonactive",
            patientivoNominalSuffix
          }
        },
        prefixInputs: {
          subjectPrefix: "",
          objectPrefix: routeTarget?.sourceObjectPrefix || sourceObjectPrefix || "",
          verb: routeVerb,
          subjectSuffix: "",
          possessivePrefix: ""
        },
        liveInput: {
          hasVerbInput: false,
          verbInputValue: ""
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
        const connector = String(result?.subjectNumberConnector?.surface || "").trim();
        if (connector) {
          return connector;
        }
      }
      return "";
    }
    function getNawatVerbNounConversionNominalSurfaceForm(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      if (!isNawatDynamicPatientivoSurfaceRoute(profile)) {
        return "";
      }
      const surfaceSpec = getNawatRoutePatientivoSurfaceSpec(profile, {
        sourceTenseValue: routeTarget?.sourceTenseValue || "",
        sourceCombinedMode: routeTarget?.sourceCombinedMode || ""
      });
      if (!surfaceSpec?.suffix) {
        return "";
      }
      if (typeof targetObject.executeGenerateWordRequest === "function") {
        const requestedSurface = getPrimaryNawatRouteSurfaceForm(generateNawatRoutePatientivoSurfaceResult(profile, {
          sourceVerb,
          sourceObjectPrefix,
          routeTarget,
          patientivoNominalSuffix: surfaceSpec.suffix
        }));
        if (requestedSurface) {
          return requestedSurface;
        }
        const defaultSurface = getPrimaryNawatRouteSurfaceForm(generateNawatRoutePatientivoSurfaceResult(profile, {
          sourceVerb,
          sourceObjectPrefix,
          routeTarget,
          patientivoNominalSuffix: null
        }));
        return defaultSurface || "";
      }
      const sourceSurface = getNawatRouteSourceSurfaceForm(profile, {
        sourceVerb: routeTarget?.sourceVerb || sourceVerb,
        sourceObjectPrefix: routeTarget?.sourceObjectPrefix || sourceObjectPrefix,
        routeTarget
      });
      if (!sourceSurface) {
        return "";
      }
      const stem = isNawatRouteNonactiveSource(surfaceSpec) ? deriveNawatRouteNonactivePatientivoStem(sourceSurface, surfaceSpec.sourceTenseValue) : deriveNawatRouteActivePatientivoStem(sourceSurface, surfaceSpec.sourceTenseValue);
      return appendNawatRouteNominalSuffix(stem, surfaceSpec.suffix);
    }
    function getNawatRouteFiniteSurfaceForm(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null
    } = {}) {
      if (!profile || typeof profile !== "object") {
        return "";
      }
      if (isPatientivoSurfaceRoute(profile)) {
        const routeSurface = getNawatVerbNounConversionNominalSurfaceForm(profile, {
          sourceVerb,
          sourceObjectPrefix,
          routeTarget
        });
        if (routeSurface) {
          return routeSurface;
        }
      }
      const hasExplicitRouteStem = Boolean(String(routeTarget?.sourceStem || "").trim());
      if (!hasExplicitRouteStem) {
        const legacySurface = getPrimaryNawatRouteSurfaceForm(executeNawatRouteLegacyGeneration(profile, {
          sourceVerb,
          sourceObjectPrefix
        }));
        if (legacySurface) {
          return legacySurface;
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
        const result = targetObject.executeGenerateWordRequest({
          options: {
            silent: true,
            skipValidation: false,
            override: {
              tense: targetTenseValue,
              tenseMode: targetMode,
              derivationMode: targetObject.DERIVATION_MODE[targetDerivationMode] || targetDerivationMode || targetObject.DERIVATION_MODE.active,
              voiceMode: targetObject.VOICE_MODE[targetVoiceMode] || targetVoiceMode || targetObject.VOICE_MODE.active,
              subjectPrefix: "",
              subjectSuffix: "",
              patientivoSource: isPatientivoSurfaceRoute(profile) ? profile.patientivoSource || "nonactive" : undefined,
              patientivoNominalSuffix: isPatientivoSurfaceRoute(profile) ? resolveNawatRoutePatientivoNominalSuffix(profile, {
                sourceTenseValue: routeTarget?.sourceTenseValue || "",
                sourceCombinedMode: routeTarget?.sourceCombinedMode || ""
              }) : undefined
            }
          },
          prefixInputs: {
            subjectPrefix: "",
            objectPrefix: routeTarget?.targetObjectPrefix || "",
            verb: generationVerb,
            subjectSuffix: "",
            possessivePrefix: ""
          },
          liveInput: {
            hasVerbInput: false,
            verbInputValue: ""
          }
        });
        const surface = getPrimaryNawatRouteSurfaceForm(result);
        if (surface) {
          return surface;
        }
      }
      if (isPatientivoSurfaceRoute(profile)) {
        return "";
      }
      return generationVerb || targetVerb || "";
    }
    function getNawatRouteSurfaceTrailParts(routeKeyOrProfile = "", {
      sourceVerb = "",
      sourceObjectPrefix = "",
      routeTarget = null,
      stationModels = null
    } = {}) {
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
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
          return generatedConnector ? `-${generatedConnector}` : isNawatDynamicPatientivoSurfaceRoute(profile) ? "" : getNawatRouteStationSurfaceText(station);
        })() : stationKey === "source-tense" ? station?.surface || getNawatRouteSourceSurfaceForm(profile, {
          sourceVerb: resolvedTarget?.sourceVerb || sourceVerb,
          sourceObjectPrefix: resolvedTarget?.sourceObjectPrefix || sourceObjectPrefix,
          routeTarget: resolvedTarget
        }) || getNawatRouteStationSurfaceText(station) : stationKey === "verbalizer" || stationKey === "target-mode" ? station?.inputValue || getNawatRouteStationSurfaceText(station) : getNawatRouteStationSurfaceText(station);
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
    function buildNawatLinkedGrammarPathStages(routeKeyOrProfile = "", options = {}) {
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
      if (!profile) {
        return [];
      }
      const resolvedTarget = options.routeTarget && typeof options.routeTarget === "object" ? options.routeTarget : resolveNawatRouteTarget(profile, {
        sourceVerb: options.sourceVerb || profile.sourceVerb || "",
        sourceObjectPrefix: options.sourceObjectPrefix != null ? options.sourceObjectPrefix : profile.sourceObjectPrefix || ""
      });
      const routeContext = {
        routeId: profile.id || "",
        legacyTenseValue: profile.legacyTenseValue || "",
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
      const sourceVerb = String(nextSource.sourceVerb || stage?.inputValue || stage?.renderVerb || stage?.surface || "").trim();
      if (!sourceVerb) {
        return null;
      }
      const tenseMode = nextSource.mode || stage?.mode || targetObject.TENSE_MODE.verbo;
      const tense = nextSource.tenseValue || stage?.tenseValue || "";
      const objectPrefix = nextSource.objectPrefix || stage?.objectPrefix || "";
      const combinedMode = nextSource.combinedMode || stage?.combinedMode || "";
      const derivationMode = nextSource.derivationMode || stage?.derivationMode || (combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active);
      const voiceMode = nextSource.voiceMode || stage?.voiceMode || (combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active);
      return {
        options: {
          silent,
          skipValidation,
          override: {
            tense,
            tenseMode,
            derivationMode,
            voiceMode,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix
          }
        },
        prefixInputs: {
          subjectPrefix: "",
          objectPrefix,
          verb: sourceVerb,
          subjectSuffix: "",
          possessivePrefix: ""
        },
        liveInput: {
          hasVerbInput: false,
          verbInputValue: ""
        },
        linkedGrammarPathStage: {
          routeId: nextSource.routeId || "",
          stationKey: nextSource.stationKey || stage?.stationKey || stage?.key || "",
          sourceVerb,
          displaySurface: nextSource.displaySurface || stage?.surface || "",
          mode: tenseMode,
          tenseValue: tense,
          objectPrefix,
          combinedMode,
          derivationMode,
          voiceMode,
          sourceScope: nextSource.sourceScope || stage?.sourceScope || ""
        }
      };
    }
    function executeNawatLinkedGrammarPathStage(stage = null, options = {}) {
      const request = buildNawatLinkedGrammarPathStageGenerateWordRequest(stage, options);
      if (!request || typeof targetObject.executeGenerateWordRequest !== "function") {
        return null;
      }
      const result = targetObject.executeGenerateWordRequest(request);
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
        sourceObjectPrefix: selectedStage.objectPrefix || ""
      });
      return {
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
          objectPrefix: selectedStage.objectPrefix || ""
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
    }
    function getNawatLinkedGrammarPathSelectionRoute(routePreview = null, selection = {}) {
      const routes = Array.isArray(routePreview?.routes) ? routePreview.routes : [];
      const requestedRouteId = String(selection?.routeId || selection?.id || selection?.legacyTenseValue || selection?.routeKey || "").trim();
      if (!requestedRouteId) {
        return null;
      }
      return routes.find(route => route.routeId === requestedRouteId || route.id === requestedRouteId || route.legacyTenseValue === requestedRouteId) || null;
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
      return {
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
            result: result.result || "",
            surfaceForms: Array.isArray(result.surfaceForms) ? result.surfaceForms.slice() : [],
            primarySurface: getPrimaryNawatRouteSurfaceForm(result)
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
      return {
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
        const appendableStages = (Array.isArray(route.stages) ? route.stages : []).filter(stage => stage?.nextSource?.canBecomeSource === true).map(stage => ({
          routeId,
          routeFamily: route.routeFamily || "",
          stageKey: stage.key || "",
          stationKey: stage.stationKey || "",
          role: stage.role || "",
          surface: stage.surface || "",
          sourceVerb: stage.nextSource?.sourceVerb || "",
          displaySurface: stage.nextSource?.displaySurface || stage.surface || "",
          mode: stage.nextSource?.mode || "",
          tenseValue: stage.nextSource?.tenseValue || "",
          objectPrefix: stage.nextSource?.objectPrefix || "",
          selection: {
            routeId,
            stageKey: stage.key || stage.stationKey || ""
          }
        })).filter(stage => stage.sourceVerb);
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
      return {
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
    }
    function normalizeNawatLinkedGrammarPathSelection(selection = null) {
      if (!selection || typeof selection !== "object") {
        return null;
      }
      const routeId = String(selection.routeId || selection.id || selection.legacyTenseValue || selection.routeKey || "").trim();
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
      return {
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
      return {
        ...selectionState,
        appended: Boolean(normalizedSelection),
        appendedSelection: normalizedSelection
      };
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
      return {
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
        const sourceVerb = String(step?.generated?.primarySurface || step?.nextSource?.sourceVerb || step?.selectedStage?.sourceVerb || "").trim();
        if (!sourceVerb) {
          return null;
        }
        const sourceInput = String(step?.nextSource?.sourceVerb || step?.selectedStage?.sourceVerb || "").trim();
        return {
          sourceVerb,
          sourceObjectPrefix: String(step?.nextSource?.objectPrefix || step?.selectedStage?.objectPrefix || "").trim(),
          displaySurface: String(step?.generated?.primarySurface || step?.nextSource?.displaySurface || step?.selectedStage?.displaySurface || "").trim(),
          sourceInput,
          sourceInputDisplay: String(step?.nextSource?.displaySurface || step?.selectedStage?.displaySurface || sourceInput || "").trim(),
          generatedSurface: String(step?.generated?.primarySurface || step?.generated?.result || "").trim(),
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
      const sourceVerb = String(source?.sourceVerb || source?.inputValue || source?.displaySurface || "").trim();
      if (!sourceVerb) {
        return {
          applied: false,
          method: "",
          sourceVerb: "",
          reason: "missing-source"
        };
      }
      const sourceContext = {
        sourceVerb,
        sourceObjectPrefix: String(source?.sourceObjectPrefix || source?.objectPrefix || "").trim(),
        displaySurface: String(source?.displaySurface || sourceVerb).trim(),
        sourceInput: String(source?.sourceInput || "").trim(),
        sourceInputDisplay: String(source?.sourceInputDisplay || source?.sourceInput || "").trim(),
        generatedSurface: String(source?.generatedSurface || "").trim(),
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
      return {
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
      return rawResult.split(/\s*(?:\/|,|\n)\s*/).map(part => part.trim()).find(Boolean) || "";
    }
    function executeNawatRouteLegacyGeneration(profile = null, {
      sourceVerb = "",
      sourceObjectPrefix = ""
    } = {}) {
      const legacyTenseValue = profile?.legacyTenseValue || "";
      const routeVerb = String(sourceVerb || "").trim();
      if (!profile || !legacyTenseValue || !routeVerb || typeof targetObject.executeGenerateWordRequest !== "function") {
        return null;
      }
      const legacyModeKey = profile.legacyMode || "adjetivo";
      const legacyMode = targetObject.TENSE_MODE[legacyModeKey] || legacyModeKey || targetObject.TENSE_MODE.adjetivo;
      const legacyCombinedMode = profile.legacyCombinedMode || profile.targetCombinedMode || profile.combinedMode || "";
      const legacyDerivationMode = profile.legacyDerivationMode || profile.derivationMode || (legacyCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active);
      const legacyVoiceMode = profile.legacyVoiceMode || profile.voiceMode || (legacyCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active);
      return targetObject.executeGenerateWordRequest({
        options: {
          silent: true,
          skipValidation: false,
          override: {
            tense: legacyTenseValue,
            tenseMode: legacyMode,
            derivationMode: targetObject.DERIVATION_MODE[legacyDerivationMode] || legacyDerivationMode || targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE[legacyVoiceMode] || legacyVoiceMode || targetObject.VOICE_MODE.active,
            subjectPrefix: "",
            subjectSuffix: ""
          }
        },
        prefixInputs: {
          subjectPrefix: "",
          objectPrefix: sourceObjectPrefix || "",
          verb: routeVerb,
          subjectSuffix: "",
          possessivePrefix: ""
        },
        liveInput: {
          hasVerbInput: false,
          verbInputValue: ""
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
      const result = targetObject.executeGenerateWordRequest({
        options: {
          silent: true,
          skipValidation: false,
          override: {
            tense: "patientivo",
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: ""
          }
        },
        prefixInputs: {
          subjectPrefix: "",
          objectPrefix: sourceObjectPrefix || "",
          verb: routeVerb,
          subjectSuffix: "",
          possessivePrefix: ""
        },
        liveInput: {
          hasVerbInput: false,
          verbInputValue: ""
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
      const legacyResult = executeNawatRouteLegacyGeneration(profile, {
        sourceVerb: routeVerb,
        sourceObjectPrefix
      });
      const legacySurface = getPrimaryNawatRouteSurfaceForm(legacyResult);
      const surfaceSuffix = String(profile.surfaceSuffix || "").replace(/^-+/, "");
      if (legacySurface && surfaceSuffix && legacySurface.endsWith(surfaceSuffix)) {
        return `${legacySurface.slice(0, -surfaceSuffix.length)}${verbalizer}`;
      }
      if (legacySurface && legacySurface.endsWith(`${verbalizer}k`)) {
        return legacySurface.slice(0, -1);
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
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
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
        targetObjectPrefix: targetMode === targetObject.TENSE_MODE.verbo && profile.valency === "intransitive" ? "" : sourceObjectPrefix || "",
        activePatientivoBranch: isPatientivoSurfaceRoute(profile) ? patientivoSurfaceSpec?.patientivoSource || profile.patientivoSource || "nonactive" : "",
        activePatientivoNominalSuffix: isPatientivoSurfaceRoute(profile) ? patientivoSurfaceSpec?.suffix || resolveNawatRoutePatientivoNominalSuffix(profile, {
          sourceTenseValue: sourceTenseValue || getNawatRouteDefaultSourceTenseValue(profile),
          sourceCombinedMode: sourceCombinedMode || profile.sourceCombinedMode || profile.combinedMode || ""
        }) : ""
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
        return "transitive-denominal-route";
      }
      return "unknown-denominal-route";
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
        curriculumRef: {
          source: "Andrews",
          range: "54-55",
          role: "structural-analogue"
        },
        outputKind: "denominal-route",
        routeFamily: getNawatDenominalRouteFamilyKey(profile),
        structuralAnalogue: getNawatDenominalRouteStructuralAnalogue(profile),
        routeId: profile.id || "",
        routePlacement: getNawatRoutePlacement(profile),
        routeProfileSource: profile.denominalFamily ? "static-modes" : "legacy-inference",
        sourceState: sourceState || "patientivo-tronco",
        sourceSlot: profile.sourceSlot || "",
        sourceCategory: profile.sourceCategory || "",
        sourceSurface: String(sourceSurface || "").trim(),
        verbalizer,
        verbalizerType: profile.verbalizerType || "",
        valency,
        targetTense: targetTenseValue || getNawatRouteTargetTenseValue(profile),
        surfaceSuffix: profile.surfaceSuffix || "",
        supportStatus: "current-route-supported",
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
            curriculumRef: {
              source: "Andrews",
              range: "54-55",
              role: "structural-analogue"
            },
            outputKind: "denominal-route-family-inventory",
            routeFamily: familyKey,
            structuralAnalogue: getNawatDenominalRouteStructuralAnalogue(profile),
            verbalizer: profile.verbalizer || "",
            verbalizerType: profile.verbalizerType || "",
            valency: profile.valency || "",
            routePlacement: getNawatRoutePlacement(profile),
            routeProfileSource: profile.denominalFamily ? "static-modes" : "legacy-inference",
            routeIds: [],
            legacyTenseValues: [],
            targetTenses: [],
            surfaceSuffixes: [],
            sourceSlots: [],
            sourceCategories: [],
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
          });
        }
        const entry = familyMap.get(familyKey);
        [["routeIds", profile.id || ""], ["legacyTenseValues", profile.legacyTenseValue || ""], ["targetTenses", getNawatRouteTargetTenseValue(profile)], ["surfaceSuffixes", profile.surfaceSuffix || ""], ["sourceSlots", profile.sourceSlot || ""], ["sourceCategories", profile.sourceCategory || ""]].forEach(([field, value]) => {
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
      sourceObjectPrefix = ""
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
          routeProfileSource: profile.denominalFamily ? "static-modes" : "legacy-inference",
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
      return {
        version: 1,
        curriculumRef: {
          source: "Andrews",
          range: "54-55",
          role: "structural-analogue"
        },
        outputKind: "denominal-route-family-preview",
        sourceVerb: normalizedSourceVerb,
        sourceObjectPrefix: normalizedSourceObjectPrefix,
        families: getNawatDenominalRouteFamilyInventory(),
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
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
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
      const sourceSurface = String(stemStation?.inputValue || stemStation?.surface || resolvedTarget.sourceStem || explicitSourceStem || "").trim();
      const sourceInput = String(sourceStation?.inputValue || resolvedTarget.sourceVerb || sourceVerb || "").trim();
      const targetTenseValue = resolvedTarget.targetTenseValue || getNawatRouteTargetTenseValue(profile);
      const valency = String(profile.valency || "").trim();
      const sourceState = "patientivo-tronco";
      return {
        version: 1,
        routeId: profile.id || "",
        legacyTenseValue: profile.legacyTenseValue || "",
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
      const profile = routeKeyOrProfile && typeof routeKeyOrProfile === "object" ? cloneNawatRouteProfile(routeKeyOrProfile, routeKeyOrProfile.legacyTenseValue || "") : getNawatRouteProfile(routeKeyOrProfile);
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
          sourceCombinedMode: state.sourceCombinedMode || ""
        }),
        activeStationKey: state.activeStationKey || "",
        activeStationInput: state.activeStationInput || "",
        activeStationVerb: state.activeStationVerb || "",
        activeStationMode: state.activeStationMode || "",
        activeStationTenseValue: state.activeStationTenseValue || "",
        activeStationObjectPrefix: state.activeStationObjectPrefix || ""
      };
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
      return profile ? {
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
        activeStationObjectPrefix: state.activeStationObjectPrefix
      } : null;
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
      const legacyMode = profile.legacyMode || "";
      const legacyTenseValue = profile.legacyTenseValue || "";
      const modeLabel = getEuropeanConventionModeLabel(legacyMode);
      const tenseLabel = legacyTenseValue ? getLocalizedLabel(targetObject.TENSE_LABELS[legacyTenseValue], isNawat, legacyTenseValue) : "";
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
      const activatedProfile = setActiveNawatRouteProfile(profile.id || routeKey, stationRouteTarget);
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
      return typeof targetObject.EuropeanTenseModeState !== "undefined" && targetObject.EuropeanTenseModeState?.mode ? targetObject.EuropeanTenseModeState.mode : getActiveTenseMode();
    }
    function getActiveNawatTenseMode() {
      return typeof targetObject.NawatTenseModeState !== "undefined" && targetObject.NawatTenseModeState?.mode ? targetObject.NawatTenseModeState.mode : targetObject.NAWAT_TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo || "";
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
        if (system === (targetObject.TENSE_MODE_SYSTEM.nawat || "nawat")) {
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
    function setActiveEuropeanTenseMode(mode, {
      syncOutput = true
    } = {}) {
      const storedMode = setStoredEuropeanTenseMode(mode);
      if (!storedMode) {
        return;
      }
      if (syncOutput) {
        setActiveTenseMode(storedMode, {
          modeSystem: targetObject.TENSE_MODE_SYSTEM.european || "european"
        });
      }
    }
    function setActiveNawatTenseMode(mode, {
      syncOutput = true
    } = {}) {
      const storedMode = setStoredNawatTenseMode(mode);
      if (!storedMode) {
        return;
      }
      const outputMode = getNawatOutputTenseMode(storedMode);
      if (syncOutput && outputMode) {
        setActiveTenseMode(outputMode, {
          modeSystem: targetObject.TENSE_MODE_SYSTEM.nawat || "nawat"
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
      const override = {
        subjectPrefix: resolvedSubject.subjectPrefix,
        subjectSuffix: resolvedSubject.subjectSuffix,
        objectPrefix: "",
        verb: normalizedStem,
        tense: explicit ? "ordinary-nnc" : getCurrentResolvedConjugationSelectionState({
          tenseMode: getActiveTenseMode()
        }).tenseValue || "",
        tenseMode: explicit ? targetObject.TENSE_MODE.sustantivo : getActiveTenseMode(),
        derivationMode: targetObject.DERIVATION_MODE.active,
        voiceMode: targetObject.VOICE_MODE.active,
        possessivePrefix: explicit ? resolvedPossessor : ""
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
        prefixInputs: {
          subjectPrefix: override.subjectPrefix,
          objectPrefix: "",
          verb: normalizedStem,
          subjectSuffix: override.subjectSuffix,
          possessivePrefix: override.possessivePrefix
        },
        liveInput: {
          hasVerbInput: false,
          verbInputValue: ""
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
      const operators = targetObject.document.querySelector(".calc-operators");
      if (operators) {
        operators.dataset.tenseMode = mode || "";
        operators.dataset.ordinaryNncMode = isOrdinaryNncGenerationModeEnabled() ? "on" : "off";
      }
      const activeEuropeanMode = getActiveEuropeanTenseMode();
      const activeNawatMode = getActiveNawatTenseModeForCurrentSelection();
      const ordinaryNncActive = isOrdinaryNncGenerationModeEnabled();
      buttons.forEach(button => {
        const buttonMode = button.getAttribute("data-tense-mode");
        const buttonSystem = button.getAttribute("data-mode-system") || targetObject.TENSE_MODE_SYSTEM.european || "european";
        const isNawatButton = buttonSystem === (targetObject.TENSE_MODE_SYSTEM.nawat || "nawat");
        const isActive = isNawatButton ? buttonMode === activeNawatMode && !(ordinaryNncActive && buttonMode === targetObject.TENSE_MODE.sustantivo) : buttonMode === activeEuropeanMode;
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
      updateNawatRoutePanel();
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
          const buttonSystem = button.getAttribute("data-mode-system") || targetObject.TENSE_MODE_SYSTEM.european || "european";
          clearActiveNawatRouteProfile();
          setOrdinaryNncGenerationModeEnabled(false);
          if (buttonSystem === (targetObject.TENSE_MODE_SYSTEM.nawat || "nawat")) {
            setActiveNawatTenseMode(mode);
          } else {
            setActiveEuropeanTenseMode(mode);
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
      result.textContent = "—";
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
      const cachedResult = targetObject.getCachedDerivationalAntiderivativeResult(targetStem, requestedType, lookupOptions);
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
      const modeLabel = modeButton?.textContent?.trim() || (mode === targetObject.TENSE_MODE.sustantivo ? "Sustantivo" : mode === targetObject.TENSE_MODE.adjetivo ? "Adjetivo" : mode === targetObject.TENSE_MODE.adverbio ? "Adverbio" : "Verbo");
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
        if (mode !== targetObject.TENSE_MODE.verbo) {
          return [clauseLabel, tenseLabel, sourceScopeLabel].filter(Boolean);
        }
        if (isSimpleView) {
          return [clauseLabel, tenseLabel, transitivityLabel].filter(Boolean);
        }
        return [clauseLabel, tenseLabel, derivationLabel, transitivityLabel, sourceScopeLabel || (includeVoiceInSummary ? voiceLabel : "")].filter(Boolean);
      })();
      const fallback = mode === targetObject.TENSE_MODE.verbo ? isSimpleView ? "Selecciona tiempo" : "Selecciona tiempo y derivación" : "Selecciona tiempo";
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
      const hasError = Boolean(targetObject.document.querySelector("#all-tense-conjugations .conjugation-error")) || Boolean(targetObject.document.getElementById("verb")?.classList.contains("error"));
      const hasRows = Boolean(targetObject.document.querySelector("#all-tense-conjugations .conjugation-row"));
      statusEl.classList.toggle("is-error", hasError);
      delete statusEl.dataset.orthographyBridge;
      delete statusEl.dataset.orthographyBridgeIds;
      if (!hasVerb) {
        statusEl.textContent = getPlaceholderLabel("conjugations", getIsNawat(), "Ingresa un verbo para ver las conjugaciones.");
        statusEl.classList.remove("is-error");
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
          const activeRouteTenseValues = [activeNawatRoute?.targetTenseValue || "", activeNawatRoute?.nawatTenseValue || "", activeNawatRoute?.legacyTenseValue || "", activeNawatRoute?.sourceTenseValue || "", activeNawatRoute?.activeStationTenseValue || ""].filter(Boolean);
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
    api.getLegacyTenseForNawatRoute = getLegacyTenseForNawatRoute;
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
    api.getNawatRouteSourceSurfaceForm = getNawatRouteSourceSurfaceForm;
    api.stripNawatRoutePreposedParticle = stripNawatRoutePreposedParticle;
    api.replaceNawatRouteSurfaceEnding = replaceNawatRouteSurfaceEnding;
    api.appendNawatRouteNominalSuffix = appendNawatRouteNominalSuffix;
    api.stripNawatRouteIaUaPatientivoStemFinalA = stripNawatRouteIaUaPatientivoStemFinalA;
    api.deriveNawatRouteActivePatientivoStem = deriveNawatRouteActivePatientivoStem;
    api.deriveNawatRouteNonactivePatientivoStem = deriveNawatRouteNonactivePatientivoStem;
    api.generateNawatRoutePatientivoSurfaceResult = generateNawatRoutePatientivoSurfaceResult;
    api.getNawatRouteGeneratedPatientivoConnectorSuffix = getNawatRouteGeneratedPatientivoConnectorSuffix;
    api.getNawatVerbNounConversionNominalSurfaceForm = getNawatVerbNounConversionNominalSurfaceForm;
    api.getNawatRouteFiniteSurfaceForm = getNawatRouteFiniteSurfaceForm;
    api.getNawatRouteSurfaceTrailParts = getNawatRouteSurfaceTrailParts;
    api.formatNawatRouteSurfaceTrailLabel = formatNawatRouteSurfaceTrailLabel;
    api.buildNawatLinkedGrammarPathStages = buildNawatLinkedGrammarPathStages;
    api.buildNawatLinkedGrammarPathStageGenerateWordRequest = buildNawatLinkedGrammarPathStageGenerateWordRequest;
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
    api.executeNawatRouteLegacyGeneration = executeNawatRouteLegacyGeneration;
    api.resolveNawatRoutePatientivoTroncoStem = resolveNawatRoutePatientivoTroncoStem;
    api.resolveNawatRouteVerbalizedVerb = resolveNawatRouteVerbalizedVerb;
    api.resolveNawatRouteTarget = resolveNawatRouteTarget;
    api.summarizeNawatRouteSourceStateStation = summarizeNawatRouteSourceStateStation;
    api.getNawatDenominalRouteFamilyKey = getNawatDenominalRouteFamilyKey;
    api.getNawatDenominalRouteStructuralAnalogue = getNawatDenominalRouteStructuralAnalogue;
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
    api.updateNawatRoutePanel = updateNawatRoutePanel;
    api.resolveActiveAdjectiveClassPolicy = resolveActiveAdjectiveClassPolicy;
    api.selectPreferredActiveAdjectiveForms = selectPreferredActiveAdjectiveForms;
    api.getActiveConjugationGroup = getActiveConjugationGroup;
    api.setActiveConjugationGroup = setActiveConjugationGroup;
    api.getActiveTenseMode = getActiveTenseMode;
    api.getModeSystemValue = getModeSystemValue;
    api.getNawatTenseModeValue = getNawatTenseModeValue;
    api.getNawatOutputTenseMode = getNawatOutputTenseMode;
    api.setStoredEuropeanTenseMode = setStoredEuropeanTenseMode;
    api.setStoredNawatTenseMode = setStoredNawatTenseMode;
    api.getActiveEuropeanTenseMode = getActiveEuropeanTenseMode;
    api.getActiveNawatTenseMode = getActiveNawatTenseMode;
    api.setActiveTenseMode = setActiveTenseMode;
    api.setActiveEuropeanTenseMode = setActiveEuropeanTenseMode;
    api.setActiveNawatTenseMode = setActiveNawatTenseMode;
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
