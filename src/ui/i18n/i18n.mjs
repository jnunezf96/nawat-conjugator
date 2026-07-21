// Canonical modern ESM module.

export function createUiI18nApi(targetObject = globalThis) {
    function getNonactivePersonSub(prefix, isNawat = false) {
      if (!prefix) {
        return targetObject.getDummySubjectSubLabel(isNawat);
      }
      return targetObject.getLocalizedLabel(targetObject.NONACTIVE_PERSON_SUB_LABELS[prefix], isNawat, "");
    }
    function getSubjectSelectionByAgreement(subjectPrefix = "", subjectSuffix = "") {
      for (const group of targetObject.SUBJECT_PERSON_GROUPS) {
        if (!group || typeof group !== "object") {
          continue;
        }
        for (const number of targetObject.SUBJECT_PERSON_NUMBER_ORDER) {
          const selection = group[number];
          if (!selection) {
            continue;
          }
          if (String(selection.subjectPrefix || "") === String(subjectPrefix || "") && String(selection.subjectSuffix || "") === String(subjectSuffix || "")) {
            return {
              group,
              selection,
              number
            };
          }
        }
      }
      return null;
    }
    function getSubjectPersonLabelByAgreement(subjectPrefix = "", subjectSuffix = "", isNawat = false) {
      const matched = getSubjectSelectionByAgreement(subjectPrefix, subjectSuffix);
      if (matched) {
        return targetObject.getSubjectPersonLabel(matched.group, matched.selection, isNawat);
      }
      const info = targetObject.getPers1Pers2Info(subjectPrefix, subjectSuffix);
      if (!info) {
        return "";
      }
      const personKeyMap = {
        1: "first",
        2: "second",
        3: "third"
      };
      const personKey = personKeyMap[info.person] || "";
      const groupLabel = targetObject.getLocalizedLabel(targetObject.PERSON_GROUP_LABELS[personKey], isNawat, `${info.person}a persona`);
      const numberKey = info.number === "pl" ? "plural" : "singular";
      const numberLabels = targetObject.NUMBER_LABELS[numberKey] || {};
      const numberLabel = isNawat ? numberLabels.na || numberKey : numberLabels.es || numberKey;
      return [groupLabel, numberLabel].filter(Boolean).join(" ");
    }
    function getRetainedObjectSublabel(prefix = "", isNawat = false) {
      const normalized = String(prefix || "");
      if (!normalized) {
        return "";
      }
      const dedicatedEs = {
        ta: "algo",
        te: "alguien",
        mu: "sí mismo",
        nech: "a mí",
        metz: "a ti",
        ki: "a él/ella/eso",
        tech: "a nosotros",
        metzin: "a ustedes",
        kin: "a ellos/ellas"
      };
      if (isNawat) {
        const nonactiveLabel = targetObject.getLocalizedLabel(targetObject.NONACTIVE_PERSON_SUB_LABELS[normalized], true, "");
        if (nonactiveLabel) {
          return nonactiveLabel;
        }
      } else if (dedicatedEs[normalized]) {
        return dedicatedEs[normalized];
      }
      const label = targetObject.getObjectLabelShort(normalized, isNawat);
      return label || normalized;
    }
    function getNonactivePersonCategory(prefix, isNawat = false) {
      const entry = targetObject.NONACTIVE_PERSON_CATEGORY_LABELS[prefix] || targetObject.NONACTIVE_PERSON_CATEGORY_LABELS.default;
      return targetObject.getLocalizedLabel(entry, isNawat, "");
    }
    function getNonactiveGenericLabel(prefix, isNawat = false) {
      const entry = targetObject.NONACTIVE_GENERIC_LABELS[prefix] || targetObject.NONACTIVE_GENERIC_LABELS.default;
      return targetObject.getLocalizedLabel(entry, isNawat, "impersonal");
    }
    function getNonactivePersonLabel(prefix, options = {}) {
      const isNawat = options.isNawat === true;
      if (options.isIntransitive) {
        return targetObject.getVerbBlockLabel("eventImpersonal", isNawat, "Evento impersonal");
      }
      if (options.isDirectGroup) {
        if (targetObject.OBJECT_MARKERS.has(prefix)) {
          return getNonactiveGenericLabel(prefix, isNawat);
        }
        return getNonactivePersonCategory(prefix, isNawat) || targetObject.getVerbBlockLabel("patient", isNawat, "Paciente");
      }
      return getNonactiveGenericLabel(prefix, isNawat);
    }
    function getNonactiveRowLabelModel(prefix, options = {}) {
      const isNawat = options.isNawat === true;
      const subjectOverride = options.subjectOverride && typeof options.subjectOverride === "object" ? options.subjectOverride : null;
      const retainedObjectPrefix = String(options.retainedObjectPrefix || "");
      if (options.isIntransitive) {
        return {
          label: targetObject.getVerbBlockLabel("eventImpersonal", isNawat, "Evento impersonal"),
          subLabel: getNonactiveGenericLabel("", isNawat)
        };
      }
      if (options.isDirectGroup) {
        const patientLabel = targetObject.getVerbBlockLabel("patient", isNawat, "Paciente");
        if (subjectOverride) {
          const personLabel = getSubjectPersonLabelByAgreement(subjectOverride.pers1 || "", subjectOverride.pers2 || "", isNawat);
          const inverseParticipantLabel = getNonactivePersonSub(prefix, isNawat);
          const retainedObjectLabel = getRetainedObjectSublabel(retainedObjectPrefix, isNawat);
          return {
            label: personLabel || getNonactivePersonCategory(prefix, isNawat) || patientLabel,
            subLabel: [inverseParticipantLabel, retainedObjectLabel].filter(Boolean).join(" · ")
          };
        }
        return {
          label: getNonactivePersonCategory(prefix, isNawat) || patientLabel,
          subLabel: [getNonactivePersonSub(prefix, isNawat), getRetainedObjectSublabel(retainedObjectPrefix, isNawat)].filter(Boolean).join(" · ")
        };
      }
      return {
        label: getNonactiveGenericLabel(prefix, isNawat),
        subLabel: targetObject.getObjectLabelShort(prefix, isNawat) || getNonactivePersonSub(prefix, isNawat)
      };
    }
    function getNonactiveSlotPrefixes(marker, slot) {
      if (!marker) {
        return null;
      }
      if (marker === "te") {
        return Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
      }
      if (marker === "ta") {
        if (slot === "subject") {
          return ["ki"];
        }
        return ["", "ki", "ta"];
      }
      if (marker === "mu") {
        return slot === "object" ? ["mu"] : Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS);
      }
      return null;
    }

    const api = {};
    api.getNonactivePersonSub = getNonactivePersonSub;
    api.getSubjectSelectionByAgreement = getSubjectSelectionByAgreement;
    api.getSubjectPersonLabelByAgreement = getSubjectPersonLabelByAgreement;
    api.getRetainedObjectSublabel = getRetainedObjectSublabel;
    api.getNonactivePersonCategory = getNonactivePersonCategory;
    api.getNonactiveGenericLabel = getNonactiveGenericLabel;
    api.getNonactivePersonLabel = getNonactivePersonLabel;
    api.getNonactiveRowLabelModel = getNonactiveRowLabelModel;
    api.getNonactiveSlotPrefixes = getNonactiveSlotPrefixes;
    return api;
}

export function installUiI18nGlobals(targetObject = globalThis) {
    const api = createUiI18nApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
