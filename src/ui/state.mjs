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
    function getNominalSourceModeForTense(tenseValue = "", {
      patientivoSource = "",
      blockMode = null
    } = {}) {
      if (tenseValue === "patientivo") {
        return patientivoSource === "nonactive" ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
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
      const sourceKey = sourceMode === targetObject.COMBINED_MODE.nonactive ? "tense-tabs-mode-nonactive" : "tense-tabs-mode-active";
      const sourceLabel = getLocalizedLabel(targetObject.UI_LABELS[sourceKey], isNawat, sourceMode === targetObject.COMBINED_MODE.nonactive ? "no activo" : "activo");
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
    function setActiveTenseMode(mode) {
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
      if (targetObject.isNominalTenseMode(mode)) {
        setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.active, {
          syncCombinedMode: false
        });
        if (mode === targetObject.TENSE_MODE.adverbio && getCombinedMode() !== targetObject.COMBINED_MODE.active) {
          setCombinedMode(targetObject.COMBINED_MODE.active);
        }
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
    function getVerbSourceScope() {
      const current = targetObject.VerbSourceScopeState.scope;
      if (current === targetObject.VERB_SOURCE_SCOPE.active || current === targetObject.VERB_SOURCE_SCOPE.nonactive || current === targetObject.VERB_SOURCE_SCOPE.both) {
        return current;
      }
      return targetObject.VERB_SOURCE_SCOPE.both;
    }
    function setVerbSourceScope(scope, {
      syncCombinedMode = true
    } = {}) {
      const resolved = scope === targetObject.VERB_SOURCE_SCOPE.active ? targetObject.VERB_SOURCE_SCOPE.active : scope === targetObject.VERB_SOURCE_SCOPE.nonactive ? targetObject.VERB_SOURCE_SCOPE.nonactive : targetObject.VERB_SOURCE_SCOPE.both;
      targetObject.VerbSourceScopeState.scope = resolved;
      if (!syncCombinedMode) {
        return;
      }
      if (resolved === targetObject.VERB_SOURCE_SCOPE.active) {
        setCombinedMode(targetObject.COMBINED_MODE.active);
      } else if (resolved === targetObject.VERB_SOURCE_SCOPE.nonactive) {
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
        if (getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.both) {
          targetObject.VerbSourceScopeState.scope = targetObject.VERB_SOURCE_SCOPE.nonactive;
        }
      } else {
        setActiveDerivationMode(targetObject.DERIVATION_MODE.active);
        setActiveVoiceMode(targetObject.VOICE_MODE.active);
        if (getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.both) {
          targetObject.VerbSourceScopeState.scope = targetObject.VERB_SOURCE_SCOPE.active;
        }
      }
    }
    function getTenseOrderForMode(mode) {
      if (mode === targetObject.TENSE_MODE.sustantivo) {
        return ["sustantivo-verbal", "agentivo", "patientivo", "instrumentivo", "calificativo-instrumentivo", "locativo-temporal"];
      }
      if (mode === targetObject.TENSE_MODE.adjetivo) {
        return targetObject.ADJECTIVE_TAB_TENSE_ORDER;
      }
      if (mode === targetObject.TENSE_MODE.adverbio) {
        return ["pasado-remoto-adverbio-activo"];
      }
      return targetObject.TENSE_ORDER.filter(tense => tense !== "sustantivo-verbal" && tense !== "potencial" && tense !== "potencial-habitual" && !targetObject.ACTIVE_ADJECTIVE_TENSE_SET.has(tense) && !targetObject.PATIENTIVO_ADJECTIVE_TENSE_SET.has(tense) && tense !== "pasado-remoto-adverbio-activo" && tense !== "agentivo" && tense !== "patientivo" && tense !== "instrumentivo" && tense !== "calificativo-instrumentivo" && tense !== "locativo-temporal");
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
      }
      buttons.forEach(button => {
        const isActive = button.getAttribute("data-tense-mode") === mode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-pressed", String(isActive));
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
          setActiveTenseMode(mode);
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
      if ((!isVerbMode || isAdverbioMode) && getCombinedMode() !== targetObject.COMBINED_MODE.active) {
        setCombinedMode(targetObject.COMBINED_MODE.active);
      }
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
      const derivationLabel = mode === targetObject.TENSE_MODE.verbo ? getCalcDerivationLabel() : "";
      const transitivityLabel = getCalcTransitivityLabel();
      const tenseLabel = getCalcTenseLabel();
      const parts = (() => {
        if (mode !== targetObject.TENSE_MODE.verbo) {
          return [tenseLabel].filter(Boolean);
        }
        if (isSimpleView) {
          return [tenseLabel, transitivityLabel].filter(Boolean);
        }
        return [tenseLabel, derivationLabel, transitivityLabel, includeVoiceInSummary ? voiceLabel : ""].filter(Boolean);
      })();
      const fallback = mode === targetObject.TENSE_MODE.verbo ? isSimpleView ? "Selecciona tiempo" : "Selecciona tiempo y derivación" : "Selecciona tiempo";
      summaryEl.removeAttribute("title");
      summaryEl.textContent = parts.length ? parts.join(" · ") : fallback;
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
      if (!hasVerb) {
        statusEl.textContent = getPlaceholderLabel("conjugations", getIsNawat(), "Ingresa un verbo para ver las conjugaciones.");
        statusEl.classList.remove("is-error");
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
      textEl.textContent = parts.join(" | ");
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
    }
    function clearAllToggleStateMaps({
      resetNonactiveSuffix = false
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
    api.resolveActiveAdjectiveClassPolicy = resolveActiveAdjectiveClassPolicy;
    api.selectPreferredActiveAdjectiveForms = selectPreferredActiveAdjectiveForms;
    api.getActiveConjugationGroup = getActiveConjugationGroup;
    api.setActiveConjugationGroup = setActiveConjugationGroup;
    api.getActiveTenseMode = getActiveTenseMode;
    api.setActiveTenseMode = setActiveTenseMode;
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
    api.updateCalcSummary = updateCalcSummary;
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
