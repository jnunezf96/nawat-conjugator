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
                if (
                    String(selection.subjectPrefix || "") === String(subjectPrefix || "")
                    && String(selection.subjectSuffix || "") === String(subjectSuffix || "")
                ) {
                    return { group, selection, number };
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
        const info = targetObject.getSubjectPersonInfo(subjectPrefix, subjectSuffix);
        if (!info) {
            return "";
        }
        const personKeyMap = {
            1: "first",
            2: "second",
            3: "third",
        };
        const personKey = personKeyMap[info.person] || "";
        const groupLabel = targetObject.getLocalizedLabel(
            targetObject.PERSON_GROUP_LABELS[personKey],
            isNawat,
            `${info.person}a persona`
        );
        const numberKey = info.number === "pl" ? "plural" : "singular";
        const numberLabels = targetObject.NUMBER_LABELS[numberKey] || {};
        const numberLabel = isNawat
            ? (numberLabels.na || numberKey)
            : (numberLabels.es || numberKey);
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
            kin: "a ellos/ellas",
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
        const entry = targetObject.NONACTIVE_PERSON_CATEGORY_LABELS[prefix]
            || targetObject.NONACTIVE_PERSON_CATEGORY_LABELS.default;
        return targetObject.getLocalizedLabel(entry, isNawat, "");
    }

    function getNonactiveGenericLabel(prefix, isNawat = false) {
        const entry = targetObject.NONACTIVE_GENERIC_LABELS[prefix]
            || targetObject.NONACTIVE_GENERIC_LABELS.default;
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
            return getNonactivePersonCategory(prefix, isNawat)
                || targetObject.getVerbBlockLabel("patient", isNawat, "Paciente");
        }
        return getNonactiveGenericLabel(prefix, isNawat);
    }

    function getNonactiveRowLabelModel(prefix, options = {}) {
        const isNawat = options.isNawat === true;
        const subjectOverride = options.subjectOverride && typeof options.subjectOverride === "object"
            ? options.subjectOverride
            : null;
        const retainedObjectPrefix = String(options.retainedObjectPrefix || "");
        if (options.isIntransitive) {
            return {
                label: targetObject.getVerbBlockLabel("eventImpersonal", isNawat, "Evento impersonal"),
                subLabel: getNonactiveGenericLabel("", isNawat),
            };
        }
        if (options.isDirectGroup) {
            const patientLabel = targetObject.getVerbBlockLabel("patient", isNawat, "Paciente");
            if (subjectOverride) {
                const personLabel = getSubjectPersonLabelByAgreement(
                    subjectOverride.subjectPrefix || "",
                    subjectOverride.subjectSuffix || "",
                    isNawat
                );
                const inverseParticipantLabel = getNonactivePersonSub(prefix, isNawat);
                const retainedObjectLabel = getRetainedObjectSublabel(retainedObjectPrefix, isNawat);
                return {
                    label: personLabel || getNonactivePersonCategory(prefix, isNawat) || patientLabel,
                    subLabel: [inverseParticipantLabel, retainedObjectLabel].filter(Boolean).join(" · "),
                };
            }
            return {
                label: getNonactivePersonCategory(prefix, isNawat) || patientLabel,
                subLabel: [
                    getNonactivePersonSub(prefix, isNawat),
                    getRetainedObjectSublabel(retainedObjectPrefix, isNawat),
                ].filter(Boolean).join(" · "),
            };
        }
        return {
            label: getNonactiveGenericLabel(prefix, isNawat),
            subLabel: targetObject.getObjectLabelShort(prefix, isNawat) || getNonactivePersonSub(prefix, isNawat),
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

    function initLanguageSwitch() {
        const languageSwitch = targetObject.document?.getElementById("language");
        if (!languageSwitch || languageSwitch.dataset.changeBound === "1") {
            return;
        }
        languageSwitch.addEventListener("change", changeLanguage);
        languageSwitch.dataset.changeBound = "1";
    }

    function changeLanguage() {
        const documentObject = targetObject.document;
        const languageSwitch = documentObject?.getElementById("language");
        const selectedLanguage = languageSwitch?.checked ? "nawat" : "original";

        const baseLabelElementIds = [
            "tutorial-title",
            "tutorial-trigger",
            "copyright-label",
            "panel-stack-tab-inputs",
            "panel-stack-tab-tense",
            "panel-stack-tab-output",
            "calc-mode-verb",
            "calc-mode-noun",
            "calc-mode-adjective",
            "calc-mode-adverb",
            "derivation-type-label",
            "ui-density-label",
            "ui-density-simple",
            "ui-density-advanced",
        ];
        const keyedLabelElementIds = Array.from(
            documentObject?.querySelectorAll?.("[data-ui-label-key][id]") || []
        ).map((element) => element.id);
        const labelElementIds = Array.from(new Set([
            ...baseLabelElementIds,
            ...keyedLabelElementIds,
        ]));

        const translations = {
            "tutorial-title": "Shitajkwilu iwan majmachiyut",
            "tutorial-trigger": "Machiyut",
            "copyright-label": "Copyright © 2026 Jaime Núñez",
            "derivation-type-label": "Tapiwilis",
            "ui-density-label": "Vista",
            "ui-density-simple": "Básico",
            "ui-density-advanced": "Avanzado",
        };

        if (selectedLanguage === "nawat") {
            labelElementIds.forEach((elementId) => {
                const labelElement = documentObject?.getElementById?.(elementId);
                if (labelElement) {
                    const labelTarget = labelElement.querySelector("[data-ui-label-target]");
                    const currentLabelText = labelTarget ? labelTarget.textContent : labelElement.textContent;
                    targetObject.OriginalLabels[elementId] = targetObject.OriginalLabels[elementId] || currentLabelText;
                    const labelKey = labelElement.dataset.uiLabelKey || elementId;
                    const localized = targetObject.getLocalizedLabel(
                        targetObject.UI_LABELS[labelKey],
                        true,
                        translations[elementId] || currentLabelText
                    );
                    const resolvedLabel = localized
                        || translations[elementId]
                        || targetObject.OriginalLabels[elementId]
                        || currentLabelText
                        || elementId;
                    if (labelTarget) {
                        labelTarget.textContent = resolvedLabel;
                    } else {
                        labelElement.textContent = resolvedLabel;
                    }
                }
            });
        } else {
            labelElementIds.forEach((elementId) => {
                const labelElement = documentObject?.getElementById?.(elementId);
                const labelTarget = labelElement ? labelElement.querySelector("[data-ui-label-target]") : null;
                if (labelElement && targetObject.OriginalLabels[elementId]) {
                    if (labelTarget) {
                        labelTarget.textContent = targetObject.OriginalLabels[elementId];
                    } else {
                        labelElement.textContent = targetObject.OriginalLabels[elementId];
                    }
                }
            });
        }

        targetObject.updateVerbInputPlaceholder();
        targetObject.renderKeyboardLegendEntries();
        targetObject.renderTenseTabs();
        targetObject.renderAllOutputs({
            verb: targetObject.getVerbInputMeta().displayVerb,
            objectPrefix: targetObject.getCurrentObjectPrefix(),
            tense: targetObject.getCurrentResolvedConjugationSelectionState().tenseValue
                || targetObject.TENSE_ORDER[0]
                || "presente",
        });
        targetObject.renderVerbMirror();
    }

    return {
        getNonactivePersonSub,
        getSubjectSelectionByAgreement,
        getSubjectPersonLabelByAgreement,
        getRetainedObjectSublabel,
        getNonactivePersonCategory,
        getNonactiveGenericLabel,
        getNonactivePersonLabel,
        getNonactiveRowLabelModel,
        getNonactiveSlotPrefixes,
        initLanguageSwitch,
        changeLanguage,
    };
}

export function installUiI18nGlobals(targetObject = globalThis) {
    const api = createUiI18nApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    if (typeof targetObject.window === "object" && targetObject.window) {
        targetObject.window.changeLanguage = api.changeLanguage;
    }
    return api;
}
