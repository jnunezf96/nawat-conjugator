// Native wrapper generated from src/ui/rendering/rendering.js.

export function createUiRenderingApi(targetObject = globalThis) {
    function renderAllOutputs({
      verb,
      objectPrefix,
      tense,
      onlyTense = null
    }) {
      renderActiveConjugations({
        verb,
        objectPrefix,
        onlyTense,
        tense
      });
      if (!targetObject.isThreeColumnPanelLayout() && verb) {
        targetObject.setLeftPanelStackMode("output");
      }
    }
    function updateTensePanelDescription() {
      const panel = targetObject.document.getElementById("tense-description");
      if (!panel) {
        return;
      }
      const entries = [];
      const tenseMode = targetObject.getActiveTenseMode();
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState({
        tenseMode
      });
      const selectedTense = selectionState.tenseValue;
      const isNawat = Boolean(targetObject.document.getElementById("language")?.checked);
      if (tenseMode === targetObject.TENSE_MODE.verbo) {
        const isNonactive = targetObject.getCombinedMode() === targetObject.COMBINED_MODE.nonactive;
        if (isNonactive) {
          const suffix = targetObject.getSelectedNonactiveSuffix();
          if (suffix) {
            const nonactivePrefix = targetObject.getLocalizedLabel(targetObject.NONACTIVE_PREFIX_LABEL, isNawat, "no activo");
            entries.push({
              label: `${nonactivePrefix} ${targetObject.getLocalizedLabel(targetObject.NONACTIVE_SUFFIX_LABELS[suffix], isNawat, suffix)}`,
              description: targetObject.getLocalizedDescription(targetObject.NONACTIVE_SUFFIX_DESCRIPTIONS[suffix], isNawat)
            });
          }
        }
        if (selectionState.group === targetObject.CONJUGATION_GROUPS.universal) {
          const selected = selectionState.universalTenseValue;
          const classDetail = targetObject.getPretUniversalClassDetail(selected);
          entries.push({
            label: classDetail ? targetObject.getLocalizedLabel(classDetail.label, isNawat, selected) : selected,
            description: classDetail ? targetObject.getLocalizedDescription(classDetail.description, isNawat) : ""
          });
        } else {
          entries.push({
            label: targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[selectedTense], isNawat, selectedTense),
            description: targetObject.getLocalizedDescription(targetObject.TENSE_DESCRIPTIONS[selectedTense], isNawat)
          });
          if (targetObject.PRETERITO_CLASS_TENSES.has(selectedTense) && selectionState.classFilter) {
            const classDetail = targetObject.PRETERITO_CLASS_DETAIL_BY_KEY[selectionState.classFilter];
            if (classDetail) {
              entries.push({
                label: targetObject.getLocalizedLabel(classDetail.label, isNawat, classDetail.label || ""),
                description: targetObject.getLocalizedDescription(classDetail.description, isNawat)
              });
            }
          }
        }
      } else {
        entries.push({
          label: targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[selectedTense], isNawat, selectedTense),
          description: targetObject.getLocalizedDescription(targetObject.TENSE_DESCRIPTIONS[selectedTense], isNawat)
        });
      }
      panel.innerHTML = "";
      entries.forEach(entry => {
        if (!entry || !entry.label) {
          return;
        }
        const item = targetObject.document.createElement("div");
        item.className = "tense-description__item";
        const label = targetObject.document.createElement("div");
        label.className = "tense-description__label";
        label.textContent = entry.label;
        item.appendChild(label);
        if (entry.description) {
          const text = targetObject.document.createElement("div");
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
      const selectionState = targetObject.buildConjugationSelectionState();
      return String(selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue);
    }
    function resolveOutputPanelProvenance({
      verb = "",
      objectPrefix = "",
      tenseOverride = null
    }) {
      if (targetObject.getActiveTenseMode() !== targetObject.TENSE_MODE.verbo) {
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
      const resolvedObjectPrefix = typeof objectPrefix === "string" ? objectPrefix : targetObject.getCurrentObjectPrefix();
      const silentResult = targetObject.getCachedSilentGenerateWord({
        silent: true,
        skipValidation: true,
        allowPassiveObject: targetObject.getCombinedMode() === targetObject.COMBINED_MODE.nonactive,
        override: {
          verb: resolvedVerb,
          objectPrefix: resolvedObjectPrefix,
          tense: resolvedTense,
          tenseMode: targetObject.getActiveTenseMode(),
          derivationMode: targetObject.getActiveDerivationMode(),
          derivationType: targetObject.getActiveDerivationType(),
          voiceMode: targetObject.getActiveVoiceMode()
        }
      });
      if (silentResult && !silentResult.error && silentResult.stemProvenance) {
        return silentResult.stemProvenance;
      }
      if (targetObject.VerbScreenAnsState.tense === resolvedTense && targetObject.VerbScreenAnsState.provenance) {
        return targetObject.VerbScreenAnsState.provenance;
      }
      return null;
    }
    function getSharedLetterPrefixLength(leftValue = "", rightValue = "") {
      const leftLetters = targetObject.splitVerbLetters(targetObject.normalizeDerivationStemValue(leftValue));
      const rightLetters = targetObject.splitVerbLetters(targetObject.normalizeDerivationStemValue(rightValue));
      const limit = Math.min(leftLetters.length, rightLetters.length);
      let index = 0;
      while (index < limit && leftLetters[index] === rightLetters[index]) {
        index += 1;
      }
      return index;
    }
    function getSurfaceFamilyBaseCutIndex(surface = "") {
      const normalizedSurface = targetObject.normalizeDerivationStemValue(surface);
      const letters = targetObject.splitVerbLetters(normalizedSurface);
      if (!letters.length) {
        return 0;
      }
      const syllables = targetObject.splitVerbSyllables(normalizedSurface);
      if (!syllables.length) {
        return Math.max(letters.length - 1, 0);
      }
      const syllableStartIndexes = [];
      let cursor = 0;
      syllables.forEach(syllable => {
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
      const letters = targetObject.splitVerbLetters(targetObject.normalizeDerivationStemValue(surface));
      if (!letters.length) {
        return "";
      }
      const clampedStart = Math.max(0, Math.min(startIndex, letters.length - 1));
      return letters.slice(clampedStart).join("");
    }
    const NAWAT_PATIENTIVO_BRANCH_OPTIONS = [{
      id: "nonactive",
      label: "pasivo/impersonal",
      sourceScope: "nonactive"
    }, {
      id: "perfectivo",
      label: "perfectivo",
      sourceScope: "active"
    }, {
      id: "imperfectivo",
      label: "imperfectivo",
      sourceScope: "active"
    }, {
      id: "tronco-verbal",
      label: "tronco verbal",
      sourceScope: "active"
    }];
    const DEFAULT_NAWAT_PATIENTIVO_BRANCH = "imperfectivo";
    const NAWAT_TRONCO_CONVERSION_ROUTE_SPECS = [{
      routeKey: "denominal-vi-ti-preterit",
      line: "-ti",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vi-ti-perfect",
      line: "-ti",
      tenseValue: "perfecto"
    }, {
      routeKey: "denominal-vi-iwi-preterit",
      line: "-iwi",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vi-iwi-perfect",
      line: "-iwi",
      tenseValue: "perfecto"
    }, {
      routeKey: "denominal-vi-awi-preterit",
      line: "-awi",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vi-awi-perfect",
      line: "-awi",
      tenseValue: "perfecto"
    }, {
      routeKey: "denominal-vt-na-preterit",
      line: "-na",
      tenseValue: "preterito"
    }, {
      routeKey: "denominal-vt-na-perfect",
      line: "-na",
      tenseValue: "perfecto"
    }];
    const NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS = ["patientivo-nonactive-t", "patientivo-perfective-ti-noun", "patientivo-imperfective-t"];
    const NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS = [{
      sourceCombinedMode: "active",
      tenseValue: "presente"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "presente-habitual"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "presente-desiderativo"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "imperfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "preterito"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "pasado-remoto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "perfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "pluscuamperfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "condicional-perfecto"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "futuro"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "condicional"
    }, {
      sourceCombinedMode: "active",
      tenseValue: "imperativo"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "presente"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "presente-habitual"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "presente-desiderativo"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "imperfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "preterito"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "pasado-remoto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "perfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "pluscuamperfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "condicional-perfecto"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "futuro"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "condicional"
    }, {
      sourceCombinedMode: "nonactive",
      tenseValue: "imperativo"
    }];
    const NAWAT_PRELOCATIVE_PATIENTIVO_SOURCE_TENSES = new Set(["imperfecto", "pasado-remoto"]);
    const NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS = [{
      label: "imperativo",
      tenseValues: ["imperativo"]
    }, {
      label: "presente",
      tenseValues: ["presente", "presente-habitual", "presente-desiderativo"]
    }, {
      label: "pasado",
      tenseValues: ["imperfecto", "preterito", "pasado-remoto", "perfecto", "pluscuamperfecto", "condicional-perfecto"]
    }, {
      label: "futuro",
      tenseValues: ["futuro", "condicional"]
    }];
    function getNawatPatientivoBranchOption(branchId = "") {
      return NAWAT_PATIENTIVO_BRANCH_OPTIONS.find(option => option.id === branchId) || NAWAT_PATIENTIVO_BRANCH_OPTIONS[0];
    }
    function getNawatPatientivoBranchStateStore() {
      return typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
    }
    function getActiveNawatPatientivoBranch() {
      return getNawatPatientivoBranchOption(getNawatPatientivoBranchStateStore()?.activePatientivoBranch || targetObject.window.__NAWAT_ACTIVE_PATIENTIVO_BRANCH__ || DEFAULT_NAWAT_PATIENTIVO_BRANCH).id;
    }
    function setActiveNawatPatientivoBranch(branchId = "") {
      const option = getNawatPatientivoBranchOption(branchId);
      const store = getNawatPatientivoBranchStateStore();
      if (store) {
        store.activePatientivoBranch = option.id;
      }
      targetObject.window.__NAWAT_ACTIVE_PATIENTIVO_BRANCH__ = option.id;
    }
    function isPatientivoTroncoRouteProfile(profile = null) {
      if (typeof targetObject.isPatientivoTroncoConversionRoute === "function") {
        return targetObject.isPatientivoTroncoConversionRoute(profile);
      }
      return profile?.routePlacement === "patientivo-tronco-conversion" || !profile?.routePlacement && Boolean(profile?.verbalizer);
    }
    function isAgentiveMannerRouteProfile(profile = null) {
      return false;
    }
    function isPatientivoSurfaceRouteProfile(profile = null) {
      if (typeof targetObject.isPatientivoSurfaceRoute === "function") {
        return targetObject.isPatientivoSurfaceRoute(profile);
      }
      return profile?.routePlacement === "patientivo-surface";
    }
    function isVerbNounConversionRouteProfile(profile = null) {
      return isPatientivoSurfaceRouteProfile(profile) || profile?.targetMode === targetObject.TENSE_MODE.sustantivo || profile?.nawatMode === targetObject.TENSE_MODE.sustantivo;
    }
    function getNawatRoutePlacementName(profile = null) {
      if (typeof targetObject.getNawatRoutePlacement === "function") {
        return targetObject.getNawatRoutePlacement(profile);
      }
      if (isPatientivoTroncoRouteProfile(profile)) {
        return "patientivo-tronco-conversion";
      }
      return profile?.routePlacement || "";
    }
    function getNawatPatientivoBranchLabel(branchId = "") {
      const option = getNawatPatientivoBranchOption(branchId);
      const isNawat = Boolean(targetObject.document.getElementById("language")?.checked);
      return typeof targetObject.getPatientivoSourceTenseLabel === "function" ? targetObject.getPatientivoSourceTenseLabel(option.id, isNawat) : option.label;
    }
    function getNawatPatientivoBranchClassLabel(branchId = "") {
      const option = getNawatPatientivoBranchOption(branchId);
      return option.sourceScope === "nonactive" ? "NA" : "A";
    }
    function getNawatPatientivoSourceClassCode(sourceCombinedMode = "") {
      return String(sourceCombinedMode || "").trim() === "nonactive" ? "NA" : "A";
    }
    function getNawatPatientivoSourceTenseOptionLabel(option = {}, isNawat = false) {
      const tenseValue = String(option.tenseValue || "").trim();
      const tenseLabel = tenseValue && typeof targetObject.getLocalizedLabel === "function" ? targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], isNawat, tenseValue) : tenseValue;
      return [getNawatPatientivoSourceClassCode(option.sourceCombinedMode), tenseLabel].filter(Boolean).join(" ");
    }
    function getNawatPatientivoTenseOptionLabel(tenseValue = "", isNawat = false) {
      const normalizedTenseValue = String(tenseValue || "").trim();
      return normalizedTenseValue && typeof targetObject.getLocalizedLabel === "function" ? targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[normalizedTenseValue], isNawat, normalizedTenseValue) : normalizedTenseValue;
    }
    function getDefaultNawatPatientivoSourceTenseValue(patientivoSource = "") {
      return String(patientivoSource || "").trim() === "perfectivo" ? "preterito" : "presente";
    }
    function getNawatPatientivoRouteSpec(option = {}) {
      const sourceCombinedMode = String(option.sourceCombinedMode || "").trim();
      const sourceTenseValue = String(option.tenseValue || option.sourceTenseValue || "").trim();
      const patientivoSource = String(option.patientivoSource || "").trim();
      if (typeof targetObject.resolveNawatPatientivoRouteSpec === "function") {
        return targetObject.resolveNawatPatientivoRouteSpec({
          sourceTenseValue,
          sourceCombinedMode,
          patientivoSource
        });
      }
      const perfectiveSourceTenses = new Set(["preterito", "preterito-clase", "perfecto", "pluscuamperfecto", "condicional-perfecto"]);
      const resolvedPatientivoSource = sourceCombinedMode === "nonactive" ? "nonactive" : perfectiveSourceTenses.has(sourceTenseValue) ? "perfectivo" : "imperfectivo";
      const routeKey = resolvedPatientivoSource === "nonactive" ? "patientivo-nonactive-t" : resolvedPatientivoSource === "perfectivo" ? "patientivo-perfective-ti-noun" : "patientivo-imperfective-t";
      return {
        sourceTenseValue,
        sourceCombinedMode,
        patientivoSource: resolvedPatientivoSource,
        routeKey,
        suffix: resolvedPatientivoSource === "perfectivo" ? "ti" : "t",
        surfaceSuffix: resolvedPatientivoSource === "perfectivo" ? "-ti" : "-t"
      };
    }
    function getNawatPatientivoSourceRouteKey(option = {}) {
      return getNawatPatientivoRouteSpec(option).routeKey;
    }
    function getNawatVerbNounConversionProfiles() {
      return NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS.map(routeKey => typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeKey) : null).filter(profile => profile && isVerbNounConversionRouteProfile(profile));
    }
    function getNawatVerbNounConversionLabel(profile = null, isNawat = false) {
      if (!profile || typeof profile !== "object") {
        return "";
      }
      if (isPatientivoSurfaceRouteProfile(profile)) {
        const sourceLabel = typeof targetObject.getPatientivoSourceTenseLabel === "function" ? targetObject.getPatientivoSourceTenseLabel(profile.patientivoSource || "nonactive", isNawat) : profile.patientivoSource || "patientivo";
        const suffix = String(profile.surfaceSuffix || (profile.patientivoNominalSuffix ? `-${String(profile.patientivoNominalSuffix).replace(/^-+/, "")}` : "")).trim();
        return ["patientivo", sourceLabel, suffix].filter(Boolean).join(" · ");
      }
      return typeof targetObject.formatNawatRouteProfileMetaLabel === "function" ? targetObject.formatNawatRouteProfileMetaLabel(profile, isNawat) : profile.id || "";
    }
    function getNawatVerbNounConversionHierarchyParts(profile = null, isNawat = false, {
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      if (!profile || typeof profile !== "object") {
        return {};
      }
      if (isPatientivoSurfaceRouteProfile(profile)) {
        const surfaceSpec = typeof targetObject.getNawatRoutePatientivoSurfaceSpec === "function" ? targetObject.getNawatRoutePatientivoSurfaceSpec(profile, {
          sourceTenseValue,
          sourceCombinedMode
        }) : null;
        const branchId = surfaceSpec?.patientivoSource || profile.patientivoSource || "nonactive";
        const suffix = String(surfaceSpec?.surfaceSuffix || profile.surfaceSuffix || (profile.patientivoNominalSuffix ? `-${String(profile.patientivoNominalSuffix).replace(/^-+/, "")}` : "")).trim();
        return {
          label: isNawat ? "tachiwal" : "patientivo",
          classCode: getNawatPatientivoBranchClassLabel(branchId),
          sublabel: getNawatPatientivoBranchLabel(branchId),
          suffix,
          routeKey: surfaceSpec?.routeKey || profile.id || profile.legacyTenseValue || "",
          sourceTenseValue: surfaceSpec?.sourceTenseValue || sourceTenseValue || "",
          sourceCombinedMode: surfaceSpec?.sourceCombinedMode || sourceCombinedMode || "",
          patientivoSource: branchId
        };
      }
      return {
        label: getNawatVerbNounConversionLabel(profile, isNawat)
      };
    }
    function formatNawatVerbNounConversionHierarchyLabel(profile = null, isNawat = false, {
      includeSuffix = false,
      sourceTenseValue = "",
      sourceCombinedMode = ""
    } = {}) {
      const parts = getNawatVerbNounConversionHierarchyParts(profile, isNawat, {
        sourceTenseValue,
        sourceCombinedMode
      });
      return ["V→S", parts.classCode, parts.label, parts.sublabel, includeSuffix ? parts.suffix : ""].filter(Boolean).join(" · ");
    }
    function getNawatVerbNounEuropeanDestinationLabel(profile = null, isNawat = false) {
      if (!profile || typeof profile !== "object") {
        return "";
      }
      const legacyMode = profile.legacyMode || "";
      const legacyTenseValue = profile.legacyTenseValue || "";
      const modeLabel = typeof targetObject.getEuropeanConventionModeLabel === "function" ? targetObject.getEuropeanConventionModeLabel(legacyMode) : legacyMode;
      const tenseLabel = legacyTenseValue && typeof targetObject.getLocalizedLabel === "function" ? targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[legacyTenseValue], isNawat, legacyTenseValue) : legacyTenseValue;
      return [modeLabel, tenseLabel].filter(Boolean).join(" · ");
    }
    function getNawatVerbNounRouteMenuLabel(profile = null, isNawat = false) {
      if (!profile || typeof profile !== "object") {
        return "";
      }
      if (isPatientivoSurfaceRouteProfile(profile)) {
        const branchId = profile.patientivoSource || "nonactive";
        return ["S", getNawatPatientivoBranchClassLabel(branchId), isNawat ? "tachiwal" : "patientivo", getNawatPatientivoBranchLabel(branchId)].filter(Boolean).join(" · ");
      }
      return getNawatVerbNounConversionLabel(profile, isNawat);
    }
    function createNawatRoutePickerMenuSection(section = {}) {
      const wrapper = targetObject.document.createElement("div");
      wrapper.className = "calc-guidance__route-switch-menu-section";
      const label = targetObject.document.createElement("div");
      label.className = "calc-guidance__route-switch-menu-label";
      label.textContent = section.label || "";
      const options = targetObject.document.createElement("div");
      options.className = "calc-guidance__route-switch-menu-options";
      (section.options || []).forEach(entry => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = ["calc-guidance__branch-option", "calc-guidance__route-switch-option", entry.active ? "calc-guidance__route-switch-option--active" : ""].filter(Boolean).join(" ");
        button.setAttribute("role", "menuitemradio");
        button.setAttribute("aria-checked", String(Boolean(entry.active)));
        button.textContent = entry.label || "";
        button.title = entry.title || entry.label || "";
        button.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          if (typeof entry.action === "function") {
            entry.action(button);
          }
        });
        options.appendChild(button);
      });
      wrapper.append(label, options);
      return wrapper;
    }
    function createNawatConversionStationPicker({
      className = "",
      summaryClassName = "",
      ariaLabel = "",
      title = "",
      summaryNodes = [],
      sections = []
    } = {}) {
      const picker = targetObject.document.createElement("details");
      picker.className = ["calc-guidance__branch-picker", "calc-guidance__conversion-station-picker", className].filter(Boolean).join(" ");
      picker.addEventListener("toggle", () => {
        if (!picker.open) {
          return;
        }
        targetObject.document.querySelectorAll(".calc-guidance__branch-picker[open]").forEach(otherPicker => {
          if (otherPicker !== picker) {
            otherPicker.removeAttribute("open");
          }
        });
      });
      const summary = targetObject.document.createElement("summary");
      summary.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__conversion-station-summary", summaryClassName].filter(Boolean).join(" ");
      if (ariaLabel) {
        summary.setAttribute("aria-label", ariaLabel);
      }
      if (title) {
        summary.title = title;
      }
      summaryNodes.forEach(node => {
        if (node) {
          summary.appendChild(node);
        }
      });
      const caret = targetObject.document.createElement("span");
      caret.className = "calc-guidance__picker-caret";
      caret.setAttribute("aria-hidden", "true");
      summary.appendChild(caret);
      const menu = targetObject.document.createElement("div");
      menu.className = "calc-guidance__branch-menu calc-guidance__route-switch-menu";
      menu.setAttribute("role", "menu");
      sections.filter(section => section && Array.isArray(section.options) && section.options.length).forEach(section => {
        menu.appendChild(createNawatRoutePickerMenuSection(section));
      });
      picker.append(summary, menu);
      return picker;
    }
    function createNawatPatientivoVerbNounConversionPicker({
      profiles = [],
      activeProfile = null,
      hierarchyParts = {},
      hierarchyLabel = "",
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      isNawat = false
    } = {}) {
      const activeSurfaceSpec = typeof targetObject.getNawatRoutePatientivoSurfaceSpec === "function" ? targetObject.getNawatRoutePatientivoSurfaceSpec(activeProfile, {
        sourceTenseValue,
        sourceCombinedMode
      }) : null;
      const activeSourceTenseValue = activeSurfaceSpec?.sourceTenseValue || sourceTenseValue || activeProfile?.sourceTenseValue || "";
      const activeSourceCombinedMode = activeSurfaceSpec?.sourceCombinedMode || sourceCombinedMode || activeProfile?.sourceCombinedMode || activeProfile?.combinedMode || "";
      const normalizedActiveCombinedMode = String(activeSourceCombinedMode || "").trim();
      const activeRouteKey = activeSurfaceSpec?.routeKey || activeProfile?.id || activeProfile?.legacyTenseValue || "";
      const routeVerb = String(sourceVerb || "").trim();
      const wrapper = targetObject.document.createElement("span");
      wrapper.className = "calc-guidance__patientivo-conversion-picker";
      const activityLabel = targetObject.document.createElement("span");
      activityLabel.className = "calc-guidance__conversion-summary-code";
      activityLabel.textContent = hierarchyParts.classCode || getNawatPatientivoSourceClassCode(activeSourceCombinedMode);
      const activityOptions = [{
        sourceCombinedMode: "active",
        label: "A"
      }, {
        sourceCombinedMode: "nonactive",
        label: "NA"
      }].map(option => {
        const optionCombinedMode = String(option.sourceCombinedMode || "").trim();
        const optionRouteKey = getNawatPatientivoSourceRouteKey({
          sourceCombinedMode: optionCombinedMode,
          tenseValue: activeSourceTenseValue
        });
        return {
          label: option.label,
          title: optionCombinedMode === "nonactive" ? "NA no activo" : "A activo",
          active: optionCombinedMode === normalizedActiveCombinedMode,
          action: button => {
            targetObject.activateNawatRouteStation(optionRouteKey, "source-mode", {
              render: true,
              anchorElement: button,
              sourceVerb: routeVerb,
              sourceObjectPrefix,
              sourceTenseValue: activeSourceTenseValue,
              sourceCombinedMode: optionCombinedMode
            });
          }
        };
      });
      const activityPicker = createNawatConversionStationPicker({
        className: "calc-guidance__conversion-station-picker--activity",
        summaryClassName: "calc-guidance__chip--mode-verbo",
        ariaLabel: `Elegir actividad para patientivo: ${activityLabel.textContent}`.trim(),
        title: hierarchyLabel,
        summaryNodes: [activityLabel],
        sections: [{
          label: "actividad",
          options: activityOptions
        }]
      });
      const tenseLabel = targetObject.document.createElement("span");
      tenseLabel.className = "calc-guidance__conversion-summary-label";
      tenseLabel.textContent = getNawatPatientivoTenseOptionLabel(activeSourceTenseValue, isNawat);
      const sourceTenseValues = Array.from(new Set(NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS.map(option => String(option.tenseValue || "").trim()).filter(Boolean)));
      const createTenseOption = tenseValue => {
        const label = getNawatPatientivoTenseOptionLabel(tenseValue, isNawat);
        const optionRouteKey = getNawatPatientivoSourceRouteKey({
          sourceCombinedMode: normalizedActiveCombinedMode,
          tenseValue
        });
        return {
          label,
          title: getNawatPatientivoSourceTenseOptionLabel({
            sourceCombinedMode: normalizedActiveCombinedMode,
            tenseValue
          }, isNawat),
          active: tenseValue === activeSourceTenseValue && optionRouteKey === activeRouteKey,
          action: button => {
            targetObject.activateNawatRouteStation(optionRouteKey, "source-tense", {
              render: true,
              anchorElement: button,
              sourceVerb: routeVerb,
              sourceObjectPrefix,
              sourceTenseValue: tenseValue,
              sourceCombinedMode: normalizedActiveCombinedMode
            });
          }
        };
      };
      const tenseSections = NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS.map(group => ({
        label: group.label,
        options: group.tenseValues.filter(tenseValue => sourceTenseValues.includes(tenseValue)).map(createTenseOption)
      })).filter(section => section.options.length);
      const tensePicker = createNawatConversionStationPicker({
        className: "calc-guidance__conversion-station-picker--tense",
        summaryClassName: "calc-guidance__chip--mode-verbo",
        ariaLabel: `Elegir tiempo verbal para patientivo: ${activityLabel.textContent} ${tenseLabel.textContent}`.trim(),
        title: hierarchyLabel,
        summaryNodes: [tenseLabel],
        sections: tenseSections
      });
      const destinationActivity = targetObject.document.createElement("span");
      destinationActivity.className = "calc-guidance__conversion-summary-code";
      destinationActivity.textContent = hierarchyParts.classCode || getNawatPatientivoSourceClassCode(normalizedActiveCombinedMode);
      const destinationLabelText = hierarchyParts.label || (isNawat ? "tachiwal" : "patientivo");
      const destinationBranchLabel = hierarchyParts.sublabel || "";
      const destinationSuffix = hierarchyParts.suffix || activeSurfaceSpec?.surfaceSuffix || "";
      const destinationComponentLabel = ["S", destinationActivity.textContent, destinationLabelText, destinationBranchLabel, destinationSuffix].filter(Boolean).join(" · ");
      const destinationSummary = targetObject.document.createElement("span");
      destinationSummary.className = "calc-guidance__conversion-summary-label calc-guidance__conversion-summary-label--flat";
      destinationSummary.textContent = destinationComponentLabel;
      const destinationOptions = profiles.filter(profile => isPatientivoSurfaceRouteProfile(profile)).map(profile => {
        const routeKeyForProfile = profile.id || profile.legacyTenseValue || "";
        const profileSource = profile.patientivoSource || "nonactive";
        const optionSourceCombinedMode = profileSource === "nonactive" ? "nonactive" : "active";
        const optionSourceTenseValue = profileSource === activeSurfaceSpec?.patientivoSource ? activeSourceTenseValue : getDefaultNawatPatientivoSourceTenseValue(profileSource);
        const optionParts = getNawatVerbNounConversionHierarchyParts(profile, isNawat, {
          sourceTenseValue: optionSourceTenseValue,
          sourceCombinedMode: optionSourceCombinedMode
        });
        const routeLabel = ["S", optionParts.classCode, optionParts.label || (isNawat ? "tachiwal" : "patientivo"), optionParts.sublabel, optionParts.suffix].filter(Boolean).join(" · ");
        return {
          label: routeLabel,
          title: routeLabel,
          active: routeKeyForProfile === activeRouteKey,
          action: button => {
            targetObject.activateNawatRouteStation(routeKeyForProfile, "target-mode", {
              render: true,
              anchorElement: button,
              sourceVerb: routeVerb,
              sourceObjectPrefix,
              sourceTenseValue: optionSourceTenseValue,
              sourceCombinedMode: optionSourceCombinedMode
            });
          }
        };
      });
      const destinationPicker = createNawatConversionStationPicker({
        className: "calc-guidance__conversion-station-picker--destination",
        summaryClassName: "calc-guidance__chip--mode-sustantivo",
        ariaLabel: `Elegir destino resultado sustantivo: ${destinationComponentLabel}`.trim(),
        title: `destino = resultado final de esta ubicación: ${destinationComponentLabel}`.trim(),
        summaryNodes: [destinationSummary],
        sections: [{
          label: "destino · resultado",
          options: destinationOptions
        }]
      });
      wrapper.append(activityPicker, tensePicker, destinationPicker);
      return wrapper;
    }
    function getNawatGuidanceModeClass(mode = "") {
      const normalized = String(mode || "").trim().toLowerCase();
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verb") {
        return "calc-guidance__chip--mode-verbo";
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "noun") {
        return "calc-guidance__chip--mode-sustantivo";
      }
      return "";
    }
    function getNawatGuidanceModeMarker(mode = "") {
      const normalized = String(mode || "").trim().toLowerCase();
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verb") {
        return "V";
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "noun") {
        return "S";
      }
      return "";
    }
    function getNawatTroncoConversionSpec({
      routeKey = "",
      line = "",
      tenseValue = ""
    } = {}) {
      const normalizedRouteKey = String(routeKey || "").trim();
      if (normalizedRouteKey) {
        const byRoute = NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.find(spec => spec.routeKey === normalizedRouteKey);
        if (byRoute) {
          return byRoute;
        }
      }
      const normalizedLine = String(line || "").trim();
      const normalizedTense = String(tenseValue || "").trim();
      return NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.find(spec => (!normalizedLine || spec.line === normalizedLine) && (!normalizedTense || spec.tenseValue === normalizedTense)) || NAWAT_TRONCO_CONVERSION_ROUTE_SPECS[0];
    }
    function getNawatTroncoTenseShortLabel(tenseValue = "", isNawat = false) {
      const value = String(tenseValue || "").trim();
      if (value === "preterito") {
        return "pret";
      }
      if (value === "perfecto") {
        return "perf";
      }
      return targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[value], isNawat, value);
    }
    function buildNawatTroncoConversionTrack({
      routeKey = "",
      line = "",
      tenseValue = "",
      stem = "",
      sourceVerb = "",
      sourceObjectPrefix = ""
    } = {}) {
      const spec = getNawatTroncoConversionSpec({
        routeKey,
        line,
        tenseValue
      });
      const profile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(spec.routeKey) : null;
      if (!profile) {
        return null;
      }
      const routeTarget = typeof targetObject.resolveNawatRouteTarget === "function" ? targetObject.resolveNawatRouteTarget(profile, {
        sourceVerb,
        sourceObjectPrefix,
        sourceStem: stem
      }) : null;
      const finiteSurface = typeof targetObject.getNawatRouteFiniteSurfaceForm === "function" ? targetObject.getNawatRouteFiniteSurfaceForm(profile, {
        sourceVerb,
        sourceObjectPrefix,
        routeTarget
      }) : "";
      const targetVerb = String(routeTarget?.targetVerb || "").trim();
      const routeStem = String(routeTarget?.sourceStem || stem || "").trim();
      const targetInput = targetVerb && typeof targetObject.formatNawatRouteTargetInputValue === "function" ? targetObject.formatNawatRouteTargetInputValue(profile, {
        routeStem,
        targetVerb
      }) : targetVerb && typeof targetObject.wrapNawatRouteInputValue === "function" ? targetObject.wrapNawatRouteInputValue(targetVerb) : targetVerb;
      return {
        routeKey: spec.routeKey,
        line: spec.line,
        tenseValue: spec.tenseValue,
        targetInput,
        targetVerb,
        destination: finiteSurface || profile.surfaceSuffix || spec.routeKey
      };
    }
    function createNawatRouteInlineSelect({
      ariaLabel = "",
      classModifier = ""
    } = {}) {
      const select = targetObject.document.createElement("select");
      select.className = ["calc-guidance__chip-select", classModifier ? `calc-guidance__chip-select--${classModifier}` : ""].filter(Boolean).join(" ");
      if (ariaLabel) {
        select.setAttribute("aria-label", ariaLabel);
      }
      return select;
    }
    function appendNawatRouteSwitchDivider(container) {
      const divider = targetObject.document.createElement("span");
      divider.className = "calc-guidance__route-switch-divider";
      divider.setAttribute("aria-hidden", "true");
      divider.textContent = "›";
      container.appendChild(divider);
    }
    function createNawatRouteComponentDivider() {
      const divider = targetObject.document.createElement("span");
      divider.className = "calc-guidance__route-switch-divider";
      divider.setAttribute("aria-hidden", "true");
      divider.textContent = " · ";
      return divider;
    }
    function createNawatTroncoConversionSwitchGroup({
      routeKey = "",
      candidates = [],
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceStem = "",
      line = "",
      tenseValue = "",
      isNawat = false,
      lineStationKey = "verbalizer",
      tenseStationKey = "finite-tense",
      stemStationKey = "stem"
    } = {}) {
      const normalizedCandidates = (Array.isArray(candidates) ? candidates : []).map(candidate => {
        const stem = String(candidate?.stem || "").trim();
        if (!stem) {
          return null;
        }
        return {
          stem,
          sourceVerb: String(candidate?.sourceVerb || sourceVerb || "").trim(),
          sourceObjectPrefix: String(candidate?.sourceObjectPrefix != null ? candidate.sourceObjectPrefix : sourceObjectPrefix)
        };
      }).filter(Boolean);
      if (!normalizedCandidates.length || typeof targetObject.activateNawatRouteStation !== "function") {
        return null;
      }
      const activeSpec = getNawatTroncoConversionSpec({
        routeKey,
        line,
        tenseValue
      });
      let selectedLine = activeSpec.line;
      let selectedTense = activeSpec.tenseValue;
      let selectedCandidate = normalizedCandidates.find(candidate => candidate.stem === sourceStem) || normalizedCandidates[0];
      const picker = targetObject.document.createElement("details");
      picker.className = "calc-guidance__branch-picker calc-guidance__conversion-picker";
      picker.addEventListener("toggle", () => {
        if (!picker.open) {
          return;
        }
        targetObject.document.querySelectorAll(".calc-guidance__branch-picker[open]").forEach(otherPicker => {
          if (otherPicker !== picker) {
            otherPicker.removeAttribute("open");
          }
        });
      });
      const summary = targetObject.document.createElement("summary");
      summary.className = "calc-guidance__chip calc-guidance__chip--button calc-guidance__chip--mode-sustantivo calc-guidance__route-switch-chip";
      summary.setAttribute("aria-label", "Elegir conversión nawat");
      summary.title = "Elegir conversión nawat";
      const marker = targetObject.document.createElement("span");
      marker.className = "calc-guidance__mode-marker calc-guidance__mode-marker--compound";
      marker.textContent = "S→V";
      const body = targetObject.document.createElement("span");
      body.className = "calc-guidance__route-switch-body";
      const stemLabel = targetObject.document.createElement("span");
      stemLabel.className = "calc-guidance__route-switch-value calc-guidance__route-switch-value--stem";
      const lineLabel = targetObject.document.createElement("span");
      lineLabel.className = "calc-guidance__route-switch-value calc-guidance__route-switch-value--line";
      const tenseLabel = targetObject.document.createElement("span");
      tenseLabel.className = "calc-guidance__route-switch-value calc-guidance__route-switch-value--tense";
      const caret = targetObject.document.createElement("span");
      caret.className = "calc-guidance__picker-caret";
      caret.setAttribute("aria-hidden", "true");
      body.append(stemLabel);
      appendNawatRouteSwitchDivider(body);
      body.append(lineLabel);
      appendNawatRouteSwitchDivider(body);
      body.append(tenseLabel);
      summary.append(marker, body, caret);
      const activateSelectedRoute = (stationKey, anchorElement) => {
        const spec = getNawatTroncoConversionSpec({
          line: selectedLine,
          tenseValue: selectedTense
        });
        if (!spec || !selectedCandidate) {
          return;
        }
        targetObject.activateNawatRouteStation(spec.routeKey, stationKey, {
          render: true,
          anchorElement,
          sourceVerb: selectedCandidate.sourceVerb,
          sourceObjectPrefix: selectedCandidate.sourceObjectPrefix,
          sourceStem: selectedCandidate.stem
        });
      };
      const createTrack = spec => buildNawatTroncoConversionTrack({
        routeKey: spec.routeKey,
        stem: selectedCandidate.stem,
        sourceVerb: selectedCandidate.sourceVerb,
        sourceObjectPrefix: selectedCandidate.sourceObjectPrefix
      });
      const menu = targetObject.document.createElement("div");
      menu.className = "calc-guidance__branch-menu calc-guidance__route-switch-menu";
      menu.setAttribute("role", "menu");
      const lineOptions = Array.from(new Set(NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.map(spec => spec.line)));
      const tenseOptions = Array.from(new Set(NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.map(spec => spec.tenseValue)));
      const setMenuOptionState = () => {
        menu.querySelectorAll(".calc-guidance__route-switch-option").forEach(button => {
          const groupName = button.dataset.routeSwitchGroup;
          let active = false;
          if (groupName === "stem") {
            active = button.dataset.routeSwitchValue === selectedCandidate.stem;
          } else if (groupName === "line") {
            active = button.dataset.routeSwitchValue === selectedLine;
          } else if (groupName === "tense") {
            active = button.dataset.routeSwitchValue === selectedTense;
          }
          button.setAttribute("aria-checked", String(active));
        });
      };
      const refreshSummary = () => {
        stemLabel.textContent = selectedCandidate.stem;
        lineLabel.textContent = selectedLine;
        tenseLabel.textContent = getNawatTroncoTenseShortLabel(selectedTense, isNawat);
        setMenuOptionState();
      };
      const appendMenuSection = (labelText, entries, groupName, onSelect) => {
        const section = targetObject.document.createElement("div");
        section.className = "calc-guidance__route-switch-menu-section";
        const label = targetObject.document.createElement("div");
        label.className = "calc-guidance__route-switch-menu-label";
        label.textContent = labelText;
        const options = targetObject.document.createElement("div");
        options.className = "calc-guidance__route-switch-menu-options";
        entries.forEach(entry => {
          const button = targetObject.document.createElement("button");
          button.type = "button";
          button.className = "calc-guidance__branch-option calc-guidance__route-switch-option";
          button.dataset.routeSwitchGroup = groupName;
          button.dataset.routeSwitchValue = entry.value;
          button.setAttribute("role", "menuitemradio");
          button.textContent = entry.label;
          button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            onSelect(entry.value, button);
            picker.open = false;
          });
          options.appendChild(button);
        });
        section.append(label, options);
        menu.appendChild(section);
      };
      appendMenuSection("tronco", normalizedCandidates.map(candidate => ({
        value: candidate.stem,
        label: candidate.stem
      })), "stem", (value, button) => {
        selectedCandidate = normalizedCandidates.find(candidate => candidate.stem === value) || normalizedCandidates[0];
        refreshSummary();
        if (routeKey) {
          activateSelectedRoute(stemStationKey, button);
        }
      });
      appendMenuSection("tipo de verbalización", lineOptions.map(lineOption => ({
        value: lineOption,
        label: lineOption
      })), "line", (value, button) => {
        selectedLine = value;
        refreshSummary();
        activateSelectedRoute(lineStationKey, button);
      });
      appendMenuSection("tiempo", tenseOptions.map(tenseOption => ({
        value: tenseOption,
        label: getNawatTroncoTenseShortLabel(tenseOption, isNawat)
      })), "tense", (value, button) => {
        selectedTense = value;
        refreshSummary();
        activateSelectedRoute(tenseStationKey, button);
      });
      refreshSummary();
      picker.append(summary, menu);
      return picker;
    }
    function createNawatVerbNounConversionSwitchGroup({
      routeKey = "",
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      isNawat = false
    } = {}) {
      const profiles = getNawatVerbNounConversionProfiles();
      const routeVerb = String(sourceVerb || "").trim();
      if (!profiles.length || !routeVerb || typeof targetObject.activateNawatRouteStation !== "function") {
        return null;
      }
      const inferredRouteKey = routeKey || (typeof targetObject.resolveNawatVerbNounConversionRouteKeyForSource === "function" ? targetObject.resolveNawatVerbNounConversionRouteKeyForSource({
        sourceTenseValue,
        sourceCombinedMode
      }) : "");
      const activeProfile = profiles.find(profile => profile.id === inferredRouteKey || profile.legacyTenseValue === inferredRouteKey) || profiles[0];
      const picker = targetObject.document.createElement("details");
      picker.className = "calc-guidance__branch-picker calc-guidance__conversion-picker calc-guidance__verb-noun-picker";
      picker.addEventListener("toggle", () => {
        if (!picker.open) {
          return;
        }
        targetObject.document.querySelectorAll(".calc-guidance__branch-picker[open]").forEach(otherPicker => {
          if (otherPicker !== picker) {
            otherPicker.removeAttribute("open");
          }
        });
      });
      const isPatientivoConversion = isPatientivoSurfaceRouteProfile(activeProfile);
      const effectiveSourceTenseValue = isPatientivoConversion && !String(sourceTenseValue || "").trim() ? "presente" : sourceTenseValue;
      const summary = targetObject.document.createElement("summary");
      summary.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--mode-verbo", "calc-guidance__route-switch-chip"].filter(Boolean).join(" ");
      const hierarchyParts = getNawatVerbNounConversionHierarchyParts(activeProfile, isNawat, {
        sourceTenseValue: effectiveSourceTenseValue,
        sourceCombinedMode
      });
      const hierarchyLabel = formatNawatVerbNounConversionHierarchyLabel(activeProfile, isNawat, {
        includeSuffix: true,
        sourceTenseValue: effectiveSourceTenseValue,
        sourceCombinedMode
      });
      if (isPatientivoConversion) {
        return createNawatPatientivoVerbNounConversionPicker({
          profiles,
          activeProfile,
          hierarchyParts,
          hierarchyLabel,
          sourceVerb: routeVerb,
          sourceObjectPrefix,
          sourceTenseValue: effectiveSourceTenseValue,
          sourceCombinedMode,
          isNawat
        });
      }
      summary.setAttribute("aria-label", `Elegir conversión verbo a sustantivo: ${hierarchyLabel}`);
      summary.title = hierarchyLabel;
      const caret = targetObject.document.createElement("span");
      caret.className = "calc-guidance__picker-caret";
      caret.setAttribute("aria-hidden", "true");
      const marker = targetObject.document.createElement("span");
      marker.className = "calc-guidance__mode-marker calc-guidance__mode-marker--compound";
      marker.textContent = "V→S";
      const label = targetObject.document.createElement("span");
      label.className = "calc-guidance__chip-label";
      label.textContent = hierarchyParts.label || getNawatVerbNounConversionLabel(activeProfile, isNawat);
      const classLabel = hierarchyParts.classCode ? targetObject.document.createElement("span") : null;
      if (classLabel) {
        classLabel.className = "calc-guidance__chip-sublabel calc-guidance__chip-sublabel--code";
        classLabel.textContent = hierarchyParts.classCode;
      }
      const sublabel = hierarchyParts.sublabel ? targetObject.document.createElement("span") : null;
      if (sublabel) {
        sublabel.className = "calc-guidance__chip-sublabel";
        sublabel.textContent = hierarchyParts.sublabel;
      }
      summary.append(marker, label);
      if (classLabel) {
        summary.appendChild(classLabel);
      }
      if (sublabel) {
        summary.appendChild(sublabel);
      }
      summary.appendChild(caret);
      const menu = targetObject.document.createElement("div");
      menu.className = "calc-guidance__branch-menu calc-guidance__route-switch-menu";
      menu.setAttribute("role", "menu");
      const section = targetObject.document.createElement("div");
      section.className = "calc-guidance__route-switch-menu-section";
      const sectionLabel = targetObject.document.createElement("div");
      sectionLabel.className = "calc-guidance__route-switch-menu-label";
      sectionLabel.textContent = "ruta nawat";
      const options = targetObject.document.createElement("div");
      options.className = "calc-guidance__route-switch-menu-options";
      profiles.forEach(profile => {
        const option = targetObject.document.createElement("button");
        option.type = "button";
        option.className = "calc-guidance__branch-option calc-guidance__route-switch-option";
        option.dataset.routeSwitchGroup = "verb-noun-route";
        option.dataset.routeSwitchValue = profile.id || profile.legacyTenseValue || "";
        option.setAttribute("role", "menuitemradio");
        option.setAttribute("aria-checked", String(profile.id === activeProfile.id));
        const routeMenuLabel = getNawatVerbNounRouteMenuLabel(profile, isNawat);
        option.textContent = routeMenuLabel;
        option.title = routeMenuLabel;
        option.addEventListener("click", event => {
          event.preventDefault();
          event.stopPropagation();
          targetObject.activateNawatRouteStation(profile.id || profile.legacyTenseValue || "", "finite-tense", {
            render: true,
            anchorElement: option,
            sourceVerb: routeVerb,
            sourceObjectPrefix,
            sourceTenseValue,
            sourceCombinedMode
          });
          picker.open = false;
        });
        options.appendChild(option);
      });
      section.append(sectionLabel, options);
      menu.appendChild(section);
      picker.append(summary, menu);
      return picker;
    }
    function createVerbTenseBlockDestinationPicker({
      sourceVerb = "",
      sourceObjectPrefix = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      isNawat = false
    } = {}) {
      const routeVerb = String(sourceVerb || "").trim();
      const normalizedTenseValue = String(sourceTenseValue || "").trim();
      const normalizedCombinedMode = String(sourceCombinedMode || "").trim() || targetObject.COMBINED_MODE.active;
      if (!routeVerb || !normalizedTenseValue || typeof targetObject.activateNawatRouteStation !== "function" || typeof targetObject.resolveNawatRouteTarget !== "function" || typeof targetObject.getNawatRouteFiniteSurfaceForm !== "function") {
        return null;
      }
      const profiles = getNawatVerbNounConversionProfiles();
      if (!profiles.length) {
        return null;
      }
      const patientivoRouteKey = getNawatPatientivoSourceRouteKey({
        sourceCombinedMode: normalizedCombinedMode,
        tenseValue: normalizedTenseValue
      });
      const destinationProfiles = profiles.filter(profile => {
        const profileRouteKey = profile.id || profile.legacyTenseValue || "";
        if (isPatientivoSurfaceRouteProfile(profile)) {
          return profileRouteKey === patientivoRouteKey;
        }
        return false;
      });
      if (!destinationProfiles.length) {
        return null;
      }
      const resolveDestination = profile => {
        const routeTarget = targetObject.resolveNawatRouteTarget(profile, {
          sourceVerb: routeVerb,
          sourceObjectPrefix,
          sourceTenseValue: normalizedTenseValue,
          sourceCombinedMode: normalizedCombinedMode
        }) || {};
        const surface = targetObject.getNawatRouteFiniteSurfaceForm(profile, {
          sourceVerb: routeVerb,
          sourceObjectPrefix,
          routeTarget
        });
        const hierarchyParts = getNawatVerbNounConversionHierarchyParts(profile, isNawat, {
          sourceTenseValue: normalizedTenseValue,
          sourceCombinedMode: normalizedCombinedMode
        });
        return {
          routeKey: profile.id || profile.legacyTenseValue || "",
          routeTarget,
          surface,
          label: getNawatVerbNounRouteMenuLabel(profile, isNawat),
          hierarchyParts
        };
      };
      const destinations = destinationProfiles.map(profile => ({
        profile,
        ...resolveDestination(profile)
      })).filter(entry => entry.routeKey);
      if (!destinations.length) {
        return null;
      }
      const activeDestination = destinations.find(entry => entry.routeKey === patientivoRouteKey) || destinations[0];
      const activity = targetObject.document.createElement("span");
      activity.className = "calc-guidance__conversion-summary-code";
      activity.textContent = activeDestination.hierarchyParts?.classCode || getNawatPatientivoSourceClassCode(normalizedCombinedMode);
      const destinationLabelText = activeDestination.hierarchyParts?.label || (isNawat ? "tachiwal" : "patientivo");
      const destinationComponentLabel = ["S", activity.textContent, destinationLabelText, activeDestination.hierarchyParts?.sublabel || "", activeDestination.hierarchyParts?.suffix || ""].filter(Boolean).join(" · ");
      const destinationSummaryText = activeDestination.surface ? `destino: ${destinationComponentLabel}: ${activeDestination.surface}` : `destino: ${destinationComponentLabel}`;
      const destinationSummary = targetObject.document.createElement("span");
      destinationSummary.className = "tense-block__destination-label calc-guidance__conversion-summary-label calc-guidance__conversion-summary-label--flat";
      destinationSummary.textContent = destinationSummaryText;
      const optionLabels = destinations.map(entry => {
        const optionLabel = entry.surface ? `${entry.label}: ${entry.surface}` : entry.label;
        return {
          label: optionLabel,
          title: optionLabel,
          active: entry.routeKey === activeDestination.routeKey,
          action: button => {
            targetObject.activateNawatRouteStation(entry.routeKey, "target-mode", {
              render: true,
              anchorElement: button,
              sourceVerb: routeVerb,
              sourceObjectPrefix,
              sourceTenseValue: normalizedTenseValue,
              sourceCombinedMode: normalizedCombinedMode
            });
          }
        };
      });
      return createNawatConversionStationPicker({
        className: "tense-block__destination-picker calc-guidance__conversion-station-picker--destination",
        summaryClassName: "tense-block__destination-summary calc-guidance__chip--mode-sustantivo",
        ariaLabel: `Elegir destino resultado desde ${normalizedTenseValue}: ${destinationComponentLabel}`.trim(),
        title: activeDestination.surface ? `destino = resultado final: ${destinationComponentLabel}: ${activeDestination.surface}` : `destino = resultado final: ${destinationComponentLabel}`,
        summaryNodes: [destinationSummary],
        sections: [{
          label: "destino · resultado",
          options: optionLabels
        }]
      });
    }
    function normalizeDerivationalInputFamilyToken(token = "") {
      const normalizedToken = targetObject.normalizeDerivationStemValue(token);
      if (/^[aeiu]w[ai]$/.test(normalizedToken)) {
        return normalizedToken.slice(1);
      }
      return normalizedToken;
    }
    function isSameDerivationalGuidanceRow(left = null, right = null) {
      if (!left || !right) {
        return false;
      }
      return String(left.stem || "") === String(right.stem || "") && String(left.rule || "") === String(right.rule || "") && String(left.patternType || "") === String(right.patternType || "");
    }
    function buildDerivationalFamilySummaryEntries({
      inputStem = "",
      rows = [],
      activeRow = null
    } = {}) {
      const normalizedInputStem = targetObject.normalizeDerivationStemValue(inputStem);
      const normalizedRows = (Array.isArray(rows) ? rows : []).filter(row => targetObject.normalizeDerivationStemValue(row?.stem || ""));
      if (!normalizedInputStem || !normalizedRows.length) {
        return [];
      }
      let cutIndex = getSurfaceFamilyBaseCutIndex(normalizedInputStem);
      normalizedRows.forEach(row => {
        cutIndex = Math.min(cutIndex, getSharedLetterPrefixLength(normalizedInputStem, row.stem || ""));
      });
      const inputFamily = normalizeDerivationalInputFamilyToken(getLetterSliceText(normalizedInputStem, cutIndex));
      if (!inputFamily) {
        return [];
      }
      const entries = [];
      const seen = new Map();
      normalizedRows.forEach(row => {
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
          active: isSameDerivationalGuidanceRow(row, activeRow) || !activeRow && row.preferred === true
        });
      });
      return entries;
    }
    function resolveCurrentDerivationalGuidanceEntries(verb = "", derivationType = "", activeRow = null) {
      const resolvedVerb = String(verb || "");
      if (!resolvedVerb) {
        return [];
      }
      const parsedVerb = targetObject.parseVerbInput(resolvedVerb);
      if (!parsedVerb) {
        return [];
      }
      const traced = targetObject.traceDerivationalFunction(resolvedVerb, {
        includeBothTransitivity: false,
        isTransitive: targetObject.getBaseObjectSlots(parsedVerb) > 0
      });
      const normalizedDerivationType = Object.values(targetObject.DERIVATION_TYPE).includes(derivationType) ? derivationType : targetObject.DERIVATION_TYPE.direct;
      const derivationRows = Array.isArray(traced?.[normalizedDerivationType]) ? traced[normalizedDerivationType] : [];
      const selectedRow = derivationRows.find(row => row?.preferred) || derivationRows[0] || null;
      const summaryEntries = buildDerivationalFamilySummaryEntries({
        inputStem: resolvedVerb,
        rows: derivationRows,
        activeRow: activeRow || selectedRow
      });
      return summaryEntries;
    }
    function renderOutputGuidancePanel({
      verb = ""
    } = {}) {
      const panel = targetObject.document.getElementById("calc-guidance");
      if (!panel) {
        return;
      }
      const railBlock = targetObject.document.getElementById("conversion-rail-block");
      const hidePanel = () => {
        panel.innerHTML = "";
        panel.hidden = true;
        panel.classList.add("is-empty");
        if (railBlock) {
          railBlock.hidden = true;
          railBlock.setAttribute("aria-hidden", "true");
        }
      };
      const getGuidanceModeClass = (mode = "") => {
        const normalized = String(mode || "").trim().toLowerCase();
        if (!normalized) {
          return "";
        }
        if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verb") {
          return "calc-guidance__chip--mode-verbo";
        }
        if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "noun") {
          return "calc-guidance__chip--mode-sustantivo";
        }
        return "";
      };
      const getGuidanceModeMarker = (mode = "") => {
        const normalized = String(mode || "").trim().toLowerCase();
        if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verb") {
          return "V";
        }
        if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "noun") {
          return "S";
        }
        return "";
      };
      const createConversionPicker = ({
        candidates = [],
        routeKey = "",
        sourceStem = "",
        line = "",
        tenseValue = "",
        fallbackSourceVerb = "",
        fallbackSourceObjectPrefix = ""
      } = {}) => {
        return createNawatTroncoConversionSwitchGroup({
          routeKey,
          candidates,
          sourceStem,
          line,
          tenseValue,
          isNawat,
          fallbackSourceVerb,
          fallbackSourceObjectPrefix,
          sourceVerb: fallbackSourceVerb,
          sourceObjectPrefix: fallbackSourceObjectPrefix
        });
      };
      const renderEntries = (titleText, entries) => {
        if (!entries.length) {
          hidePanel();
          return;
        }
        const chips = targetObject.document.createElement("div");
        chips.className = "calc-guidance__chips";
        let hasVisibleGuidance = false;
        const appendSeparator = (separatorText = "") => {
          const separator = targetObject.document.createElement("span");
          separator.className = "calc-guidance__separator";
          separator.textContent = separatorText;
          chips.appendChild(separator);
          return separator;
        };
        const appendVisibleNode = (node, separatorText = "") => {
          if (!node) {
            return;
          }
          if (separatorText && hasVisibleGuidance) {
            appendSeparator(separatorText);
          }
          chips.appendChild(node);
          hasVisibleGuidance = true;
        };
        entries.forEach(entry => {
          if (entry.type === "conversion-picker") {
            const picker = createConversionPicker({
              candidates: entry.candidates || [],
              routeKey: entry.routeKey || "",
              sourceStem: entry.sourceStem || "",
              line: entry.line || "",
              tenseValue: entry.tenseValue || "",
              fallbackSourceVerb: entry.sourceVerb || "",
              fallbackSourceObjectPrefix: entry.sourceObjectPrefix || ""
            });
            appendVisibleNode(picker, entry.separatorBefore || "");
            return;
          }
          if (entry.type === "verb-noun-conversion-picker") {
            const picker = createNawatVerbNounConversionSwitchGroup({
              routeKey: entry.routeKey || "",
              sourceVerb: entry.sourceVerb || "",
              sourceObjectPrefix: entry.sourceObjectPrefix || "",
              sourceTenseValue: entry.sourceTenseValue || "",
              sourceCombinedMode: entry.sourceCombinedMode || "",
              isNawat
            });
            appendVisibleNode(picker, entry.separatorBefore || "");
            return;
          }
          const hasAction = typeof entry.action === "function";
          const chip = targetObject.document.createElement(hasAction ? "button" : "div");
          if (hasAction) {
            chip.type = "button";
          }
          chip.className = ["calc-guidance__chip", entry.active ? "calc-guidance__chip--active" : "", getGuidanceModeClass(entry.mode), entry.depth ? `calc-guidance__chip--depth-${entry.depth}` : "", hasAction ? "calc-guidance__chip--button" : ""].filter(Boolean).join(" ");
          const modeMarker = getGuidanceModeMarker(entry.mode);
          if (modeMarker) {
            const marker = targetObject.document.createElement("span");
            marker.className = "calc-guidance__mode-marker";
            marker.textContent = modeMarker;
            chip.appendChild(marker);
          }
          const label = targetObject.document.createElement("span");
          label.className = "calc-guidance__chip-label";
          label.textContent = entry.text;
          chip.appendChild(label);
          if (entry.classCode) {
            const classLabel = targetObject.document.createElement("span");
            classLabel.className = "calc-guidance__chip-sublabel calc-guidance__chip-sublabel--code";
            classLabel.textContent = entry.classCode;
            chip.appendChild(classLabel);
          }
          if (entry.sublabel) {
            const sublabel = targetObject.document.createElement("span");
            sublabel.className = "calc-guidance__chip-sublabel";
            sublabel.textContent = entry.sublabel;
            chip.appendChild(sublabel);
          }
          if (hasAction) {
            chip.addEventListener("click", () => {
              entry.action(chip);
            });
          }
          appendVisibleNode(chip, entry.separatorBefore || "");
        });
        if (!hasVisibleGuidance) {
          hidePanel();
          return;
        }
        panel.innerHTML = "";
        panel.hidden = false;
        panel.classList.remove("is-empty");
        if (railBlock) {
          railBlock.hidden = false;
          railBlock.removeAttribute("aria-hidden");
        }
        if (titleText) {
          const title = targetObject.document.createElement("div");
          title.className = "calc-guidance__title";
          title.textContent = titleText;
          panel.appendChild(title);
        }
        panel.appendChild(chips);
      };
      const renderLineRows = (titleText, lines) => {
        if (!Array.isArray(lines) || !lines.length) {
          hidePanel();
          return;
        }
        panel.innerHTML = "";
        panel.hidden = false;
        panel.classList.remove("is-empty");
        if (railBlock) {
          railBlock.hidden = false;
          railBlock.removeAttribute("aria-hidden");
        }
        const getLineSelectionStore = () => typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : targetObject.window || null;
        const lineSelectionStore = getLineSelectionStore();
        const availableLineIds = new Set(lines.map(line => line.id).filter(Boolean));
        const storedLineId = String(lineSelectionStore?.activeNawatLineId || lineSelectionStore?.__NAWAT_ACTIVE_LINE_ID__ || "").trim();
        const focusedLine = lines.find(line => (line.stations || []).some(station => station.active && station.key !== "source")) || lines.find(line => (line.stations || []).some(station => station.active)) || lines[0];
        const selectedLineId = storedLineId && availableLineIds.has(storedLineId) ? storedLineId : focusedLine?.id || lines[0]?.id || "";
        const selectedLine = lines.find(line => line.id === selectedLineId) || lines[0];
        const setSelectedLineId = (lineId = "") => {
          if (lineSelectionStore) {
            lineSelectionStore.activeNawatLineId = lineId;
            lineSelectionStore.__NAWAT_ACTIVE_LINE_ID__ = lineId;
          }
          if (targetObject.window) {
            targetObject.window.__NAWAT_ACTIVE_LINE_ID__ = lineId;
          }
        };
        setSelectedLineId(selectedLineId);
        const lineList = targetObject.document.createElement("div");
        lineList.className = "calc-guidance__lines";
        const lineToggles = targetObject.document.createElement("div");
        lineToggles.className = "calc-guidance__line-toggles";
        lineToggles.setAttribute("role", "tablist");
        lineToggles.setAttribute("aria-label", "Líneas de ruta nawat");
        lines.forEach(line => {
          const button = targetObject.document.createElement("button");
          button.type = "button";
          button.className = ["calc-guidance__line-toggle", line.id === selectedLineId ? "calc-guidance__line-toggle--active" : ""].filter(Boolean).join(" ");
          button.dataset.nawatLineToggle = line.id || "";
          button.setAttribute("role", "tab");
          button.setAttribute("aria-selected", String(line.id === selectedLineId));
          button.textContent = line.label || "";
          button.addEventListener("click", () => {
            setSelectedLineId(line.id || "");
            renderLineRows(titleText, lines);
          });
          lineToggles.appendChild(button);
        });
        if (selectedLine) {
          const row = targetObject.document.createElement("div");
          row.className = "calc-guidance__line calc-guidance__line--selected";
          row.dataset.nawatLineId = selectedLine.id || "";
          const track = targetObject.document.createElement("div");
          track.className = "calc-guidance__line-track";
          (selectedLine.stations || []).forEach((station, index) => {
            if (index > 0) {
              const separator = targetObject.document.createElement("span");
              separator.className = "calc-guidance__separator calc-guidance__line-separator";
              separator.textContent = "→";
              track.appendChild(separator);
            }
            const chip = targetObject.document.createElement("div");
            chip.className = ["calc-guidance__chip", "calc-guidance__chip--station", getGuidanceModeClass(station.mode), station.active ? "calc-guidance__chip--active" : ""].filter(Boolean).join(" ");
            const modeMarker = getGuidanceModeMarker(station.mode);
            if (modeMarker) {
              const marker = targetObject.document.createElement("span");
              marker.className = "calc-guidance__mode-marker";
              marker.textContent = modeMarker;
              chip.appendChild(marker);
            }
            const label = targetObject.document.createElement("span");
            label.className = "calc-guidance__chip-label";
            label.textContent = station.text || "";
            chip.appendChild(label);
            if (station.sublabel) {
              const sublabel = targetObject.document.createElement("span");
              sublabel.className = "calc-guidance__chip-sublabel";
              sublabel.textContent = station.sublabel;
              chip.appendChild(sublabel);
            }
            track.appendChild(chip);
          });
          row.appendChild(track);
          lineList.appendChild(row);
        }
        if (titleText) {
          const title = targetObject.document.createElement("div");
          title.className = "calc-guidance__title";
          title.textContent = titleText;
          panel.appendChild(title);
        }
        panel.appendChild(lineToggles);
        panel.appendChild(lineList);
      };
      const getCurrentMovementTenseValue = (mode = targetObject.getActiveTenseMode()) => {
        const state = targetObject.getCurrentResolvedConjugationSelectionState({
          tenseMode: mode
        });
        return String(state.group === targetObject.CONJUGATION_GROUPS.universal ? state.universalTenseValue : state.tenseValue).trim();
      };
      const getNawatMovementMode = (mode = targetObject.getActiveTenseMode()) => mode === targetObject.TENSE_MODE.verbo ? targetObject.TENSE_MODE.verbo : targetObject.TENSE_MODE.sustantivo;
      const getMovementTenseLabel = (tenseValue = "") => {
        const value = String(tenseValue || "").trim();
        if (!value) {
          return "";
        }
        return targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[value], isNawat, value);
      };
      const getMovementDerivationEntry = () => {
        if (targetObject.getActiveTenseMode() !== targetObject.TENSE_MODE.verbo) {
          return null;
        }
        if (targetObject.getCombinedMode() === targetObject.COMBINED_MODE.nonactive) {
          return {
            text: targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], isNawat, "no activo"),
            mode: targetObject.TENSE_MODE.verbo
          };
        }
        const type = targetObject.getActiveDerivationType();
        if (type === targetObject.DERIVATION_TYPE.causative) {
          return {
            text: "causativa",
            mode: targetObject.TENSE_MODE.verbo
          };
        }
        if (type === targetObject.DERIVATION_TYPE.applicative) {
          return {
            text: "aplicativa",
            mode: targetObject.TENSE_MODE.verbo
          };
        }
        return null;
      };
      const renderCurrentMovementBreadcrumb = () => {
        renderNawatLineBoard();
      };
      const resolvedVerb = String(verb || "");
      const isNawat = Boolean(targetObject.document.getElementById("language")?.checked);
      const activeRoute = typeof targetObject.getActiveNawatRouteProfile === "function" ? targetObject.getActiveNawatRouteProfile() : null;
      const activeMode = targetObject.getActiveTenseMode();
      const getCurrentRailStationKey = () => {
        const routeStore = typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
        const activeLineId = String(routeStore?.activeNawatLineId || routeStore?.__NAWAT_ACTIVE_LINE_ID__ || "").trim();
        const activeLineStationKey = String(routeStore?.activeNawatLineStationKey || "").trim();
        const activeLocativeSourceVerb = String(routeStore?.activeLocativeSourceVerb || "").trim();
        const activeLocativePrelocativeVerb = String(routeStore?.activeLocativePrelocativeVerb || "").trim();
        if (activeLineId === "locative" && activeLineStationKey && (activeLocativeSourceVerb && activeLocativeSourceVerb === resolvedVerb || activeLocativePrelocativeVerb && activeLocativePrelocativeVerb === resolvedVerb)) {
          return activeLineStationKey;
        }
        const activeStationKey = String(activeRoute?.activeStationKey || "").trim();
        if (activeRoute && isPatientivoTroncoRouteProfile(activeRoute)) {
          if (activeStationKey === "stem") {
            return "tronco";
          }
          if (activeStationKey === "verbalizer" || activeStationKey === "target-mode") {
            return "verbalizer";
          }
          if (activeStationKey === "finite-tense") {
            return "finite";
          }
          return "source";
        }
        if (activeRoute && isPatientivoSurfaceRouteProfile(activeRoute)) {
          if (activeStationKey === "source-mode" || activeStationKey === "source-tense") {
            return "source";
          }
          return "patientivo";
        }
        const currentMode = targetObject.getActiveTenseMode();
        const currentTenseValue = getCurrentMovementTenseValue(currentMode);
        if (getNawatMovementMode(currentMode) === targetObject.TENSE_MODE.sustantivo) {
          if (currentTenseValue === "patientivo") {
            const branchId = typeof getActiveNawatPatientivoBranch === "function" ? getActiveNawatPatientivoBranch() : "";
            return branchId === "tronco-verbal" ? "tronco" : "patientivo";
          }
          if (currentTenseValue === "locativo-temporal") {
            return "locative";
          }
        }
        return "source";
      };
      const getAvailableLineIdsForStation = (stationKey = "") => {
        switch (stationKey) {
          case "tronco":
          case "verbalizer":
          case "finite":
            return ["tronco-verbalization"];
          case "prelocative":
          case "incorporated-root":
          case "matrix-root":
          case "locative":
            return ["locative"];
          case "source":
          case "patientivo":
          default:
            return ["tronco-verbalization", "locative"];
        }
      };
      const buildNawatLineModels = () => {
        const currentStationKey = getCurrentRailStationKey();
        const routeStore = typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
        const activeLocativeSourceVerb = String(routeStore?.activeLocativeSourceVerb || "").trim();
        const activeLocativePrelocativeVerb = String(routeStore?.activeLocativePrelocativeVerb || "").trim();
        const hasLocativeContext = activeLocativeSourceVerb && activeLocativeSourceVerb === resolvedVerb || activeLocativePrelocativeVerb && activeLocativePrelocativeVerb === resolvedVerb;
        const locativePatientivoSurface = hasLocativeContext ? String(routeStore?.activeLocativePatientivoSurface || "").trim() : "";
        const locativeIncorporatedRoot = hasLocativeContext ? String(routeStore?.activeLocativeIncorporatedRoot || "").trim() : "";
        const locativeMatrixRoot = hasLocativeContext ? String(routeStore?.activeLocativeMatrixRoot || "").trim() || "ni" : "ni";
        const sourceStation = {
          key: "source",
          text: "entrada",
          sublabel: resolvedVerb || "",
          mode: targetObject.TENSE_MODE.verbo
        };
        const lineSpecs = [{
          id: "tronco-verbalization",
          label: "tronco verbalización",
          stations: [sourceStation, {
            key: "patientivo",
            text: "patientivo",
            mode: targetObject.TENSE_MODE.sustantivo
          }, {
            key: "tronco",
            text: "tronco",
            mode: targetObject.TENSE_MODE.sustantivo
          }, {
            key: "verbalizer",
            text: "-ti/-na/-iwi/-awi",
            mode: targetObject.TENSE_MODE.verbo
          }, {
            key: "finite",
            text: "finito",
            sublabel: "pret/perf",
            mode: targetObject.TENSE_MODE.verbo
          }]
        }, {
          id: "locative",
          label: "locativo",
          stations: [sourceStation, {
            key: "patientivo",
            text: "patientivo",
            sublabel: locativePatientivoSurface ? `pretérito imperfecto / pasado remoto: ${locativePatientivoSurface}` : "pretérito imperfecto / pasado remoto",
            mode: targetObject.TENSE_MODE.sustantivo
          }, {
            key: "incorporated-root",
            text: "raíz incorporada",
            sublabel: locativeIncorporatedRoot,
            mode: targetObject.TENSE_MODE.sustantivo
          }, {
            key: "matrix-root",
            text: "raíz matriz",
            sublabel: locativeMatrixRoot,
            mode: targetObject.TENSE_MODE.verbo
          }, {
            key: "prelocative",
            text: "pre-locativo",
            sublabel: locativeIncorporatedRoot ? `${locativeIncorporatedRoot} + ${locativeMatrixRoot}` : "V con raíz incorporada",
            mode: targetObject.TENSE_MODE.verbo
          }, {
            key: "locative",
            text: "locativo",
            sublabel: "patientivo de V pre-locativo · pretérito perfecto simple",
            mode: targetObject.TENSE_MODE.sustantivo
          }]
        }];
        const availableLineIds = new Set(getAvailableLineIdsForStation(currentStationKey));
        return lineSpecs.filter(line => availableLineIds.has(line.id)).map(line => ({
          ...line,
          stations: line.stations.map(station => ({
            ...station,
            active: station.key === currentStationKey
          }))
        }));
      };
      const renderNawatLineBoard = () => {
        renderLineRows("ruta nawat", buildNawatLineModels());
      };
      if (activeRoute?.targetMode && activeRoute?.targetTenseValue) {
        const targetMode = targetObject.TENSE_MODE[activeRoute.targetMode] || activeRoute.targetMode;
        const stationMode = targetObject.TENSE_MODE[activeRoute.activeStationMode] || activeRoute.activeStationMode || targetMode;
        const stationTenseValue = activeRoute.activeStationTenseValue || activeRoute.targetTenseValue;
        const routeSelection = targetObject.getCurrentResolvedConjugationSelectionState({
          tenseMode: stationMode
        });
        const routeSelectionTenseValue = String(routeSelection.group === targetObject.CONJUGATION_GROUPS.universal ? routeSelection.universalTenseValue : routeSelection.tenseValue).trim();
        if (activeMode === stationMode && routeSelectionTenseValue === stationTenseValue) {
          renderNawatLineBoard();
          return;
        }
      }
      renderCurrentMovementBreadcrumb();
    }
    function resolveRenderableVerbValue(verb = "") {
      const explicitVerb = String(verb || "").trim();
      if (explicitVerb) {
        return explicitVerb;
      }
      const verbInput = typeof targetObject.document !== "undefined" ? targetObject.document.getElementById("verb") : null;
      const verbInputSource = targetObject.resolveVerbInputSource(verbInput?.value || "");
      const candidate = String(verbInputSource.displayValue || verbInputSource.regexValue || verbInputSource.parseValue || verbInputSource.rawValue || "").trim();
      const baseValue = targetObject.getSearchInputBase(candidate);
      return targetObject.isComposerTemplateOnlyBaseValue(baseValue) ? "" : candidate;
    }
    function renderOrdinaryNncConjugations({
      stem,
      containerId = "all-tense-conjugations"
    } = {}) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return;
      }
      const isNawat = targetObject.getIsNawat();
      const analogueInput = typeof targetObject.parseOrdinaryNncGenerationAnalogueInput === "function" ? targetObject.parseOrdinaryNncGenerationAnalogueInput(stem) : null;
      const normalizedStem = analogueInput?.stem || String(stem || "").trim();
      const {
        objSection,
        grid
      } = createObjectSectionGrid(container);
      const state = targetObject.getOrdinaryNncGenerationState();
      const fixtureProbe = normalizedStem && typeof targetObject.resolveOrdinaryNncFixture === "function" ? targetObject.resolveOrdinaryNncFixture({
        stem: normalizedStem,
        states: ["absolutive"],
        numbers: ["singular"]
      }) : null;
      const fixtureAnimacy = fixtureProbe?.fixture?.animacy || "";
      const activeAnimacy = fixtureAnimacy || state.animacy || "inanimate";
      const isAnimateNnc = activeAnimacy === "animate";
      const activePluralType = state.pluralType === "auto" ? isAnimateNnc ? "count" : "distributive" : state.pluralType;
      const normalizeOrdinaryNncUiNounClass = (value = "") => {
        const normalized = String(value || "").trim().toLowerCase();
        if (normalized === "0" || normalized === "ø" || normalized === "zero") {
          return "zero";
        }
        return ["t", "ti", "in"].includes(normalized) ? normalized : "";
      };
      const activeNounClass = normalizeOrdinaryNncUiNounClass(analogueInput?.nounClass || state.nounClass) || "zero";
      const requestNounClass = fixtureProbe ? "" : activeNounClass;
      const nounSubjectOptionById = new Map((typeof targetObject.getSubjectToggleOptions === "function" ? targetObject.getSubjectToggleOptions() : []).map(entry => [entry.id, entry]));
      const subjectEntries = (Array.isArray(targetObject.SUBJECT_COMBINATIONS) ? targetObject.SUBJECT_COMBINATIONS : []).filter(entry => isAnimateNnc || entry.personSubKey === "3sg");
      const getOrdinaryNncSubjectMarkerLabel = entry => {
        const prefix = String(entry?.subjectPrefix || "");
        const suffix = String(entry?.subjectSuffix || "");
        return `${prefix || "Ø"}...${suffix || "Ø"}`;
      };
      const getSubjectNumber = entry => String(entry?.personSubKey || "").endsWith("pl") ? "plural" : "singular";
      const getOrdinaryNncNounClassLabel = (value = "") => {
        const normalized = normalizeOrdinaryNncUiNounClass(value);
        return normalized === "zero" ? "Ø" : normalized;
      };
      const getOrdinaryNncPredicateStateLabel = (stateSlot = null, fallbackState = "") => {
        const stateValue = stateSlot?.state || fallbackState || "absolutive";
        return stateValue === "possessive" ? "predicado posesivo" : "predicado absolutivo";
      };
      const rerender = () => {
        renderActiveConjugations({
          verb: normalizedStem,
          objectPrefix: ""
        });
      };
      const candidateProbeCache = new Map();
      const probeOrdinaryNncCandidate = ({
        candidateState = state.state,
        candidateNumber = state.number,
        candidatePluralType = state.pluralType,
        candidatePossessor = state.possessor,
        candidateSubject = null
      } = {}) => {
        if (!normalizedStem || typeof targetObject.buildOrdinaryNncGenerateWordRequest !== "function" || typeof targetObject.executeGenerateWordRequest !== "function") {
          return null;
        }
        const subjectSource = candidateSubject || {
          subjectPrefix: state.subjectPrefix || "",
          subjectSuffix: state.subjectSuffix || "",
          personSubKey: state.subjectKey || ""
        };
        const cacheKey = JSON.stringify({
          stem: normalizedStem,
          state: candidateState,
          number: candidateNumber,
          pluralType: candidatePluralType,
          possessor: candidatePossessor || "",
          nounClass: requestNounClass,
          animacy: activeAnimacy,
          subjectPrefix: subjectSource.subjectPrefix || "",
          subjectSuffix: subjectSource.subjectSuffix || "",
          subjectKey: subjectSource.personSubKey || subjectSource.subjectKey || ""
        });
        if (candidateProbeCache.has(cacheKey)) {
          return candidateProbeCache.get(cacheKey);
        }
        const request = targetObject.buildOrdinaryNncGenerateWordRequest({
          stem: normalizedStem,
          explicit: true,
          state: candidateState,
          number: candidateNumber,
          pluralType: candidatePluralType,
          possessor: candidatePossessor || "",
          nounClass: requestNounClass,
          animacy: activeAnimacy,
          subjectPrefix: subjectSource.subjectPrefix || "",
          subjectSuffix: subjectSource.subjectSuffix || "",
          subjectKey: subjectSource.personSubKey || subjectSource.subjectKey || ""
        });
        const result = targetObject.executeGenerateWordRequest(request) || {};
        candidateProbeCache.set(cacheKey, result);
        return result;
      };
      const getPossessorAvailability = (possessorId = "") => {
        const normalizedPossessor = String(possessorId || "");
        if (!normalizedPossessor) {
          return {
            disabled: false,
            availabilityState: "available",
            markingAvailable: true,
            diagnosticIds: ""
          };
        }
        const candidate = probeOrdinaryNncCandidate({
          candidateState: "possessive",
          candidatePossessor: normalizedPossessor
        });
        const possessiveProfile = candidate?.nncBasic?.categoryProfile?.possessiveState || null;
        const markingAvailable = possessiveProfile?.markingAvailable === true && candidate?.supported === true;
        return {
          disabled: !markingAvailable,
          availabilityState: markingAvailable ? "available" : "unavailable",
          markingAvailable,
          diagnosticIds: (candidate?.diagnostics || []).map(entry => entry.id).filter(Boolean).join(",")
        };
      };
      const controlsBlock = targetObject.document.createElement("div");
      controlsBlock.className = "tense-block tense-block--noun-shared-controls tense-block--ordinary-nnc-controls";
      const controlsTitle = targetObject.document.createElement("div");
      controlsTitle.className = "tense-block__title";
      const controlsLabel = targetObject.document.createElement("span");
      controlsLabel.className = "tense-block__label";
      controlsLabel.textContent = targetObject.getToggleLabel("controls", isNawat, "Controles");
      controlsTitle.appendChild(controlsLabel);
      const controls = targetObject.document.createElement("div");
      controls.className = "tense-block__controls tense-block__controls--stacked";
      const subjectToggle = buildToggleControl({
        options: (subjectEntries.length ? subjectEntries : [{
          personSubKey: "3sg",
          subjectPrefix: "",
          subjectSuffix: ""
        }]).map(entry => ({
          id: entry.personSubKey || "3sg",
          label: getOrdinaryNncSubjectMarkerLabel(entry),
          title: nounSubjectOptionById.get(entry.id)?.title || targetObject.getSubjectPersonLabelByAgreement(entry.subjectPrefix || "", entry.subjectSuffix || "", isNawat),
          entry
        })),
        activeId: isAnimateNnc ? state.subjectKey || "3sg" : "3sg",
        ariaLabel: "Sujeto de la clausula nominal",
        visibleLabel: "Sujeto",
        onSelect: id => {
          const selected = subjectEntries.find(entry => entry.personSubKey === id) || subjectEntries[0];
          if (!selected) {
            return;
          }
          targetObject.setOrdinaryNncGenerationState({
            subjectKey: selected.personSubKey || "3sg",
            subjectPrefix: selected.subjectPrefix || "",
            subjectSuffix: selected.subjectSuffix || "",
            number: isAnimateNnc ? getSubjectNumber(selected) : state.number
          });
          rerender();
        },
        getTitle: entry => entry.title
      });
      controls.appendChild(subjectToggle.toggle);
      const possessorOptions = [{
        id: "",
        label: "Ø",
        title: "predicado absolutivo: poseedor Ø"
      }, ...targetObject.POSSESSIVE_PREFIXES.map(entry => entry.value).filter(Boolean).map(value => ({
        id: value,
        label: value,
        title: `predicado posesivo: ${targetObject.getPossessorPersonLabel(value, isNawat) || value}`
      }))].map(entry => {
        const availability = getPossessorAvailability(entry.id);
        const isSelectedUnsupported = Boolean(availability.disabled && state.state === "possessive" && (state.possessor || "nu") === entry.id);
        return {
          ...entry,
          ...availability,
          title: availability.disabled ? `${entry.title}; no disponible para este estado (${availability.diagnosticIds || "sin diagnostico"})` : entry.title,
          selectedUnsupported: isSelectedUnsupported
        };
      });
      const possessorToggle = buildToggleControl({
        options: possessorOptions,
        activeId: state.state === "possessive" ? state.possessor || "nu" : "",
        ariaLabel: "Estado/poseedor",
        visibleLabel: "Estado/poseedor",
        onSelect: id => {
          targetObject.setOrdinaryNncGenerationState({
            state: id ? "possessive" : "absolutive",
            possessor: id || ""
          });
          rerender();
        },
        getTitle: entry => entry.title,
        getIsDisabled: entry => entry.disabled === true
      });
      possessorToggle.toggle.dataset.toggleType = "meta";
      possessorToggle.toggle.dataset.toggleSlot = "possessor";
      controls.appendChild(possessorToggle.toggle);
      if (!isAnimateNnc) {
        const numberToggle = buildToggleControl({
          options: [{
            id: "singular",
            label: "Comun",
            title: "referencia singular/comun"
          }, {
            id: "plural",
            label: "Distr",
            title: "referencia distributiva no animada"
          }],
          activeId: state.number,
          ariaLabel: "Referencia de la clausula nominal",
          visibleLabel: "Referencia",
          onSelect: id => {
            targetObject.setOrdinaryNncGenerationState({
              number: id,
              pluralType: id === "plural" ? "distributive" : "auto",
              subjectKey: "3sg",
              subjectPrefix: "",
              subjectSuffix: ""
            });
            rerender();
          },
          getTitle: entry => entry.title
        });
        controls.appendChild(numberToggle.toggle);
      }
      if (isAnimateNnc && state.number === "plural") {
        const pluralTypeToggle = buildToggleControl({
          options: [{
            id: "count",
            label: "-met",
            title: "plural animado comun"
          }, {
            id: "distributive",
            label: "Distr",
            title: "plural animado distributivo"
          }],
          activeId: activePluralType,
          ariaLabel: "Referencia plural animada de la clausula nominal",
          visibleLabel: "Referencia plural",
          onSelect: id => {
            targetObject.setOrdinaryNncGenerationState({
              pluralType: id || "auto"
            });
            rerender();
          },
          getTitle: entry => entry.title
        });
        controls.appendChild(pluralTypeToggle.toggle);
      }
      controlsBlock.appendChild(controlsTitle);
      controlsBlock.appendChild(controls);
      objSection.insertBefore(controlsBlock, grid);
      const block = targetObject.document.createElement("div");
      block.className = "tense-block tense-block--ordinary-nnc";
      block.dataset.tenseBlock = "ordinary-nnc";
      const title = targetObject.document.createElement("div");
      title.className = "tense-block__title";
      const label = targetObject.document.createElement("span");
      label.className = "tense-block__label";
      label.textContent = "Clausula nominal";
      title.appendChild(label);
      block.appendChild(title);
      const list = targetObject.document.createElement("div");
      list.className = "conjugation-list";
      block.appendChild(list);
      grid.appendChild(block);
      if (!normalizedStem) {
        const placeholder = targetObject.document.createElement("div");
        placeholder.className = "tense-placeholder";
        placeholder.textContent = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa una base nominal para ver la clausula.");
        list.appendChild(placeholder);
        return;
      }
      const request = targetObject.buildOrdinaryNncGenerateWordRequest({
        stem: normalizedStem,
        nounClass: requestNounClass
      });
      const result = targetObject.executeGenerateWordRequest(request) || {};
      const row = targetObject.document.createElement("div");
      row.className = "conjugation-row";
      row.dataset.generationRoute = result.generationRoute || "";
      row.dataset.pluralType = result.pluralType || "";
      const rowLabel = targetObject.document.createElement("div");
      rowLabel.className = "conjugation-label";
      const personLabel = targetObject.document.createElement("div");
      personLabel.className = "person-label";
      const rowSubject = result.subject || {
        subjectPrefix: state.subjectPrefix || "",
        subjectSuffix: state.subjectSuffix || ""
      };
      personLabel.textContent = `Sujeto ${result.nncBasic?.subject?.affixLabel || getOrdinaryNncSubjectMarkerLabel(rowSubject)}`;
      personLabel.title = targetObject.getSubjectPersonLabelByAgreement(rowSubject.subjectPrefix || "", rowSubject.subjectSuffix || "", isNawat);
      const personSub = targetObject.document.createElement("div");
      personSub.className = "person-sub";
      const rowNounClassLabel = getOrdinaryNncNounClassLabel(result.nounClass || activeNounClass);
      const rowCategoryProfile = result.nncBasic?.categoryProfile || null;
      const rowStateSlot = result.nncBasic?.predicate?.stateSlot || result.clauseFrame?.predicate?.stateSlot || result.clauseFrame?.stateSlot || null;
      const rowPredicateFormula = result.nncBasic?.predicate?.formula || result.predicateFormula || result.clauseFrame?.predicate?.formula || "";
      const rowFormulaSlots = result.nncBasic?.formulaSlots || result.clauseFrame?.formulaSlots || null;
      const rowFormulaEcho = typeof targetObject.buildOrdinaryNncFormulaEchoFromSlots === "function" ? targetObject.buildOrdinaryNncFormulaEchoFromSlots(rowFormulaSlots) : result.nncBasic?.formulaEcho || result.clauseFrame?.formulaEcho || "";
      const rowConnectorSlot = rowFormulaSlots?.subjectNumberConnector || null;
      const rowConnectorSlotLabel = rowConnectorSlot ? `Conector ${rowConnectorSlot.slot || "num1-num2"}: ${rowConnectorSlot.connector || rowConnectorSlot.surface || "Ø"}` : "";
      const rowPredicateStateLabel = rowCategoryProfile?.predicateState?.label || (rowStateSlot?.state === "possessive" ? "posesivo" : "absolutivo");
      const rowAnimacyLabel = rowCategoryProfile?.animacy?.label || (result.animacy === "animate" ? "animado" : "inanimado");
      const rowReferenceLabel = rowCategoryProfile?.reference?.label || (state.number === "plural" ? "plural" : "singular");
      const rowPossessiveState = rowCategoryProfile?.possessiveState || null;
      const rowPossessiveMarkingLabel = rowPossessiveState?.isPossessive ? `Marcacion posesiva: ${rowPossessiveState.markingAvailable ? "disponible" : "no disponible"}` : "";
      personSub.textContent = [rowFormulaEcho ? `Formula NNC: ${rowFormulaEcho}` : "", rowPredicateFormula, rowNounClassLabel ? `clase ${rowNounClassLabel}` : "", rowConnectorSlotLabel, `Estado del predicado: ${rowPredicateStateLabel}`, `Animacidad: ${rowAnimacyLabel}`, `Referencia: ${rowReferenceLabel}`, rowPossessiveMarkingLabel, state.state === "possessive" ? `poseedor ${result.possessor?.prefix || state.possessor || "nu"}` : ""].filter(Boolean).join(" · ");
      rowLabel.appendChild(personLabel);
      rowLabel.appendChild(personSub);
      const value = targetObject.document.createElement("div");
      value.className = "conjugation-value";
      if (result.supported === true) {
        value.textContent = targetObject.formatConjugationDisplay(result.result || "");
      } else {
        value.textContent = result.diagnostics?.[0]?.message || "—";
        value.classList.add("conjugation-error");
        row.dataset.availabilityState = targetObject.CONJUGATION_AVAILABILITY_STATE.impossible;
        row.dataset.diagnosticIds = (result.diagnostics || []).map(entry => entry.id).filter(Boolean).join(",");
      }
      row.appendChild(rowLabel);
      row.appendChild(value);
      list.appendChild(row);
    }
    function renderActiveConjugations({
      verb,
      objectPrefix,
      onlyTense = null,
      tense = null
    }) {
      let renderVerb = resolveRenderableVerbValue(verb);
      let renderObjectPrefix = objectPrefix;
      const tenseOverride = onlyTense || tense || "";
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
      const activeRoute = typeof targetObject.getActiveNawatRouteProfile === "function" ? targetObject.getActiveNawatRouteProfile() : null;
      if (activeRoute?.targetVerb && activeRoute?.targetMode && activeRoute?.targetTenseValue && targetObject.getActiveTenseMode() === (targetObject.TENSE_MODE[activeRoute.targetMode] || activeRoute.targetMode) && selectionState.tenseValue === activeRoute.targetTenseValue) {
        renderVerb = activeRoute.activeStationVerb || activeRoute.activeStationInput || activeRoute.targetVerb;
        renderObjectPrefix = activeRoute.activeStationObjectPrefix || activeRoute.targetObjectPrefix || "";
      }
      updateTensePanelDescription();
      renderOutputGuidancePanel({
        verb: renderVerb
      });
      if (targetObject.isOrdinaryNncGenerationModeEnabled()) {
        clearUnifiedVerbOutputDataset();
        renderOrdinaryNncConjugations({
          stem: renderVerb,
          containerId: "all-tense-conjugations"
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      const activeTenseMode = targetObject.getActiveTenseMode();
      if (activeTenseMode === targetObject.TENSE_MODE.sustantivo) {
        clearUnifiedVerbOutputDataset();
        renderNounConjugations({
          verb: renderVerb,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.adjetivo) {
        clearUnifiedVerbOutputDataset();
        renderAdjectiveConjugations({
          verb: renderVerb,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.adverbio) {
        clearUnifiedVerbOutputDataset();
        renderAdverbConjugations({
          verb: renderVerb,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (selectionState.group === targetObject.CONJUGATION_GROUPS.universal) {
        renderPretUniversalConjugations({
          verb: renderVerb,
          objectPrefix: renderObjectPrefix,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      renderAllTenseConjugations({
        verb: renderVerb,
        objectPrefix: renderObjectPrefix,
        onlyTense: tenseOverride || null
      });
      targetObject.updateCalcSummaryAndStatus();
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
      buildOutputRowEntry = null
    }) {
      const modeOverride = generationModeOverride && typeof generationModeOverride === "object" ? generationModeOverride : targetObject.buildVerbModeGenerateOverride({
        isNonactiveMode: true
      });
      const buildNonactiveRow = (labelText, subText, prefix, subjectOverride = null) => {
        const row = targetObject.document.createElement("div");
        row.className = "conjugation-row";
        targetObject.applyConjugationRowClasses(row, prefix);
        const label = targetObject.document.createElement("div");
        label.className = "conjugation-label";
        const personLabel = targetObject.document.createElement("div");
        personLabel.className = "person-label";
        personLabel.textContent = labelText;
        const personSub = targetObject.document.createElement("div");
        personSub.className = "person-sub";
        personSub.textContent = subText;
        label.appendChild(personLabel);
        label.appendChild(personSub);
        const value = targetObject.document.createElement("div");
        value.className = "conjugation-value";
        const overridePayload = {
          ...modeOverride,
          objectPrefix: prefix,
          verb,
          tense: tenseValue
        };
        if (subjectOverride) {
          overridePayload.subjectPrefix = subjectOverride.subjectPrefix;
          overridePayload.subjectSuffix = subjectOverride.subjectSuffix;
          overridePayload.preservePassiveSubject = true;
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          allowPassiveObject: isDirectGroup && allowObjectToggle,
          override: overridePayload
        }) || {};
        const mappedSubjectInfo = subjectOverride ? targetObject.getSubjectPersonInfo(subjectOverride.subjectPrefix || "", subjectOverride.subjectSuffix || "") : null;
        const shouldBypassPassiveMappedConstraints = isDirectGroup && !!subjectOverride && mappedSubjectInfo?.person === 3;
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: subjectOverride?.subjectPrefix || "",
          subjectSuffix: subjectOverride?.subjectSuffix || "",
          objectPrefix: prefix,
          invalidComboSet: targetObject.INVALID_COMBINATION_KEYS,
          controllerObjectMarker: shouldBypassPassiveMappedConstraints ? "" : null,
          enforceInvalidCombo: true
        });
        const hideReflexive = !!(result && result.isReflexive && targetObject.getObjectCategory(prefix) !== "reflexive");
        const evaluation = targetObject.buildConjugationEvaluationRecord({
          result,
          maskState,
          extraDiagnostics: hideReflexive ? [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden, "masked", {
            source: "result"
          })] : []
        });
        targetObject.applyConjugationEvaluationPresentation({
          row,
          value,
          evaluation,
          formattedValue: targetObject.formatConjugationDisplay(result.result)
        });
        row.dataset.objectPrefix = targetObject.getZeroObjectDisplayValue(prefix || "");
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
              object: targetObject.getZeroObjectDisplayValue(prefix || "")
            },
            prefix,
            subjectOverride
          });
        }
      };
      const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
      if (forceImpersonal) {
        const rowLabel = targetObject.getNonactiveRowLabelModel("", {
          isIntransitive: true,
          isNawat
        });
        buildNonactiveRow(rowLabel.label, rowLabel.subLabel, "");
        return;
      }
      if (isIntransitiveOnly) {
        const rowLabel = targetObject.getNonactiveRowLabelModel("", {
          isIntransitive: true,
          isNawat
        });
        buildNonactiveRow(rowLabel.label, rowLabel.subLabel, "");
        return;
      }
      const objectSelectionPool = allowObjectToggle ? objectTogglePrefixes : [""];
      const objectSelections = allowObjectToggle ? activeObjectPrefix === targetObject.OBJECT_TOGGLE_ALL ? objectSelectionPool : [activeObjectPrefix] : [""];
      if (isDirectGroup) {
        const subjectSelectionPool = passiveSubjectPrefixes.filter(prefix => prefix !== "");
        const subjectSelections = allowSubjectToggle ? activePassiveSubject === targetObject.OBJECT_TOGGLE_ALL ? subjectSelectionPool : [activePassiveSubject] : subjectSelectionPool;
        subjectSelections.forEach(subjectPrefix => {
          const subjectOverride = targetObject.getPassiveSubjectOverride(subjectPrefix);
          if (!subjectOverride) {
            return;
          }
          objectSelections.forEach(objectPrefix => {
            const rowLabel = targetObject.getNonactiveRowLabelModel(subjectPrefix, {
              isDirectGroup: true,
              isNawat,
              subjectOverride,
              retainedObjectPrefix: objectPrefix
            });
            buildNonactiveRow(rowLabel.label, rowLabel.subLabel, objectPrefix, subjectOverride);
          });
        });
        return;
      }
      objectSelections.forEach(prefix => {
        if (!prefix) {
          return;
        }
        const rowLabel = targetObject.getNonactiveRowLabelModel(prefix, {
          isNawat
        });
        buildNonactiveRow(rowLabel.label, rowLabel.subLabel, prefix);
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
      grammarUiConfig = null
    }) {
      const {
        prefixes
      } = objectGroup;
      const resolvedGrammarState = grammarState || targetObject.buildCanonicalGrammarState({
        parsedVerb: targetObject.getParsedVerbForTab(modeKey || "verb", verb || ""),
        derivationType,
        voiceMode: isNonactiveMode ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active,
        isNonactiveMode
      });
      const configuredVisibleSlotIds = Array.isArray(grammarUiConfig?.visibleSlotIds) && grammarUiConfig.visibleSlotIds.length ? grammarUiConfig.visibleSlotIds : null;
      const groupKey = prefixes.join("|") || "intrans";
      const objectStateKey = targetObject.getObjectStateKey({
        groupKey,
        tenseValue,
        mode: modeKey,
        isNonactive: isNonactiveMode
      });
      const isDirectGroup = prefixes.every(prefix => targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix));
      const isPassiveNonactive = isNonactiveMode && isDirectGroup;
      const forceImpersonal = isPassiveNonactive && !hasPromotableObject;
      const allowSubjectToggle = isPassiveNonactive && activeValency >= 2 && !forceImpersonal;
      const allowObjectToggle = isPassiveNonactive && nonactiveAvailableSlots > 0;
      let passiveSubjectPrefixes = allowSubjectToggle ? Array.from(targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS) : [];
      let objectTogglePrefixes = isNonactiveMode && isDirectGroup && allowObjectToggle ? Array.from(new Set([...passiveSubjectPrefixes, ...Array.from(targetObject.OBJECT_MARKERS)])) : prefixes;
      const resolvedFusionMarkers = Array.isArray(fusionMarkers) ? fusionMarkers : [];
      if (allowSubjectToggle && allowObjectToggle && resolvedFusionMarkers.length >= 2) {
        const subjectMarker = resolvedFusionMarkers[0];
        const objectMarker = resolvedFusionMarkers[1];
        const constrainedSubject = targetObject.getNonactiveSlotPrefixes(subjectMarker, "subject");
        const constrainedObject = targetObject.getNonactiveSlotPrefixes(objectMarker, "object");
        if (constrainedSubject) {
          passiveSubjectPrefixes = constrainedSubject;
        }
        if (constrainedObject) {
          objectTogglePrefixes = constrainedObject;
        }
      }
      const objectSlotSchema = targetObject.getVerbObjectSlotSchema({
        isNawat,
        derivationType,
        isNonactiveMode,
        activeValency,
        modeObjectSlots,
        allowIndirectObjectToggle,
        primaryTogglePrefixes: objectTogglePrefixes,
        indirectTogglePrefixes,
        visibleSlotIds: configuredVisibleSlotIds
      });
      const objectSlotStates = objectSlotSchema.map(slot => {
        const options = targetObject.getObjectToggleOptions(slot.toggleValues, {
          includeAll: true,
          labelForPrefix: slot.labelForPrefix,
          isNawat
        });
        return {
          ...slot,
          options,
          optionMap: new Map(options.map(entry => [entry.id, entry])),
          stateKey: slot.stateSuffix ? `${objectStateKey}|${slot.stateSuffix}` : objectStateKey,
          activeId: "",
          buttons: new Map(),
          toggleEl: null,
          setActive: null
        };
      });
      const objectSlotStateById = new Map(objectSlotStates.map(slot => [slot.id, slot]));
      const primaryObjectSlot = objectSlotStateById.get("object");
      const thirdObjectSlot = objectSlotStateById.get("object3") || null;
      const objectOptions = primaryObjectSlot ? primaryObjectSlot.options : [];
      const objectOptionMap = primaryObjectSlot ? primaryObjectSlot.optionMap : new Map();
      const allowThirdObjectToggle = Boolean(thirdObjectSlot);
      const passiveSubjectOptions = allowSubjectToggle ? targetObject.getObjectToggleOptions(passiveSubjectPrefixes, {
        labelForPrefix: targetObject.getPassiveToggleLabel
      }) : [];
      const passiveSubjectOptionMap = new Map(passiveSubjectOptions.map(entry => [entry.id, entry]));
      const subjectOptions = targetObject.getSubjectToggleOptions();
      const subjectOptionMap = new Map(subjectOptions.map(entry => [entry.id, entry]));
      const passiveSubjectStateKey = allowSubjectToggle ? `${objectStateKey}|subject` : "";
      const verbKey = verb || "";
      const shouldDefaultBitransitiveObjects = modeObjectSlots >= 2 && verbKey;
      const bitransitiveObjectSeedKey = shouldDefaultBitransitiveObjects ? `${verbKey}|objects-${modeObjectSlots}|${isNonactiveMode ? "nonactive" : "active"}` : verbKey;
      const uiDefaultObjectBySlot = grammarUiConfig?.defaultToggles?.objectBySlotId || null;
      const uiDefaultPrimaryObjectId = uiDefaultObjectBySlot?.object;
      const bitransitiveDefaultObjectId = shouldDefaultBitransitiveObjects ? targetObject.getDefaultOutputToggleSelection({
        context: "verb-primary-object",
        values: Array.from(objectOptionMap.keys()),
        preferredId: uiDefaultPrimaryObjectId || "ki",
        fallbackIds: [targetObject.getPreferredObjectPrefix(prefixes), ""],
        isNonactiveMode
      }) : "";
      const shouldDefaultTripleValencySubject = !isNonactiveMode && activeValency >= 3 && verbKey;
      const tripleValencySubjectSeedKey = shouldDefaultTripleValencySubject ? `${verbKey}|valency-3` : verbKey;
      const uiDefaultSubjectId = grammarUiConfig?.defaultToggles?.subject || targetObject.getDefaultOutputToggleSelection({
        context: "verb-subject",
        values: Array.from(subjectOptionMap.keys())
      });
      const tripleDefaultSubjectId = shouldDefaultTripleValencySubject ? targetObject.getDefaultOutputToggleSelection({
        context: "verb-subject",
        values: Array.from(subjectOptionMap.keys()),
        preferredId: uiDefaultSubjectId
      }) : targetObject.getDefaultOutputToggleSelection({
        context: "verb-subject",
        values: Array.from(subjectOptionMap.keys())
      });
      const shouldForceDefaults = forceDefaultTodosKi && verbKey;
      if (shouldForceDefaults && objectOptionMap.has("ki")) {
        targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, objectStateKey, verbKey, "ki");
      }
      if (shouldDefaultBitransitiveObjects) {
        targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, objectStateKey, bitransitiveObjectSeedKey, bitransitiveDefaultObjectId);
      }
      const isIntransitiveGroup = prefixes.length === 1 && prefixes[0] === "";
      const shouldMapAllTenses = prefixes.includes("ki");
      const shouldSeedAllTensesDefault = shouldMapAllTenses;
      const resolveTenseBlockPrefix = prefix => {
        if (shouldMapAllTenses && prefix === "ki") {
          return targetObject.OBJECT_TOGGLE_ALL;
        }
        return prefix || "intrans";
      };
      const defaultObjectPrefix = targetObject.getDefaultOutputToggleSelection({
        context: "verb-primary-object",
        values: Array.from(objectOptionMap.keys()),
        preferredId: uiDefaultPrimaryObjectId || targetObject.getPreferredObjectPrefix(prefixes),
        isNonactiveMode,
        fallbackIds: [targetObject.getPreferredObjectPrefix(prefixes)]
      });
      let activeObjectPrefix = isIntransitiveGroup ? "" : defaultObjectPrefix;
      if (shouldSeedAllTensesDefault && !targetObject.ObjectToggleState.has(objectStateKey)) {
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, objectStateKey, "ki", {
          syncLock: false
        });
      }
      const storedObjectPrefix = targetObject.getToggleStateValue(targetObject.ObjectToggleState, objectStateKey);
      if (!isIntransitiveGroup && storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
        activeObjectPrefix = storedObjectPrefix;
      }
      if (isPassiveNonactive && !allowObjectToggle) {
        activeObjectPrefix = "";
      }
      if (primaryObjectSlot) {
        primaryObjectSlot.activeId = activeObjectPrefix;
      }
      const defaultPassiveSubjectId = allowSubjectToggle ? targetObject.getDefaultOutputToggleSelection({
        context: "verb-passive-subject",
        values: Array.from(passiveSubjectOptionMap.keys())
      }) : null;
      let activePassiveSubject = allowSubjectToggle ? defaultPassiveSubjectId : null;
      const storedPassiveSubject = allowSubjectToggle ? targetObject.getToggleStateValue(targetObject.ObjectToggleState, passiveSubjectStateKey) : undefined;
      if (allowSubjectToggle && storedPassiveSubject !== undefined && passiveSubjectOptionMap.has(storedPassiveSubject)) {
        activePassiveSubject = storedPassiveSubject;
      }
      const tenseBlock = targetObject.document.createElement("div");
      tenseBlock.className = "tense-block";
      tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(activeObjectPrefix)}-${tenseValue}`;
      const transitiveLabel = targetObject.getVerbBlockLabel("transitive", isNawat, "verbo transitivo");
      const intransitiveLabel = targetObject.getVerbBlockLabel("intransitive", isNawat, "verbo intransitivo");
      const passiveLabel = targetObject.getVerbBlockLabel("passive", isNawat, "pasivo");
      const impersonalLabel = targetObject.getVerbBlockLabel("impersonal", isNawat, "impersonal");
      const labelValency = Number.isFinite(grammarUiConfig?.labelValency) ? grammarUiConfig.labelValency : Number.isFinite(activeValency) ? isNonactiveMode ? Math.max(0, activeValency - 1) : activeValency : null;
      const activeBlockLabelType = targetObject.getActiveVerbBlockLabelType({
        labelValency,
        activeValency,
        embeddedObjectFilled
      });
      const getActiveSlotToggleValue = slotId => objectSlotStateById.get(slotId)?.activeId || "";
      const updateVerbTenseBlockPalette = () => {
        const signature = targetObject.buildBlockComboPaletteSignature({
          mode: "verb",
          valency: Number.isFinite(labelValency) ? labelValency : activeValency,
          objectPrefix: getActiveSlotToggleValue("object"),
          indirectObjectMarker: getActiveSlotToggleValue("object2"),
          thirdObjectMarker: getActiveSlotToggleValue("object3"),
          derivationType
        });
        targetObject.applyTenseBlockComboPalette(tenseBlock, signature);
      };
      const valencyLabel = Number.isFinite(labelValency) ? `valencia total: ${labelValency}` : "";
      const buildBlockLabel = () => {
        const baseLabel = activeBlockLabelType === "transitive" ? transitiveLabel : intransitiveLabel;
        return valencyLabel ? `${baseLabel} · ${valencyLabel}` : baseLabel;
      };
      const tenseTitle = targetObject.document.createElement("div");
      tenseTitle.className = "tense-block__title";
      const titleLabel = targetObject.document.createElement("span");
      titleLabel.className = "tense-block__label";
      titleLabel.textContent = buildBlockLabel();
      tenseTitle.appendChild(titleLabel);
      const titleControls = targetObject.document.createElement("div");
      titleControls.className = "tense-block__controls";
      const shouldStackControls = !isNonactiveMode || prefixes.length > 1;
      if (shouldStackControls) {
        titleControls.classList.add("tense-block__controls--stacked");
      }
      const resolvedSubjectKeyPrefix = subjectKeyPrefix || modeKey;
      const subjectKey = `${resolvedSubjectKeyPrefix}|${tenseValue}|${groupKey}`;
      if (shouldForceDefaults) {
        if (!isNonactiveMode) {
          targetObject.applyDefaultToggleStateOnce(targetObject.SubjectToggleState, subjectKey, verbKey, targetObject.SUBJECT_TOGGLE_ALL);
        } else if (allowSubjectToggle && passiveSubjectStateKey) {
          targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, passiveSubjectStateKey, verbKey, targetObject.OBJECT_TOGGLE_ALL);
        }
      }
      if (shouldDefaultTripleValencySubject) {
        targetObject.applyDefaultToggleStateOnce(targetObject.SubjectToggleState, subjectKey, tripleValencySubjectSeedKey, tripleDefaultSubjectId);
      }
      if (shouldSeedAllTensesDefault && !targetObject.SubjectToggleState.has(subjectKey)) {
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, tripleDefaultSubjectId, {
          syncLock: false
        });
      }
      let activeSubject = targetObject.getToggleStateValue(targetObject.SubjectToggleState, subjectKey, tripleDefaultSubjectId) ?? tripleDefaultSubjectId;
      if (!subjectOptionMap.has(activeSubject)) {
        activeSubject = tripleDefaultSubjectId;
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, activeSubject, {
          syncLock: false
        });
      }
      let toggleButtons = new Map();
      let passiveSubjectButtons = new Map();
      let subjectButtons = new Map();
      const objectSlotSetters = new Map();
      const controllerRole = targetObject.getCanonicalControllerRole(resolvedGrammarState.derivationType || derivationType);
      const controllerSlotId = targetObject.getCanonicalSlotIdForRole(controllerRole) || "object";
      const isSilentControllerMarker = value => targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value || "");
      const isShuntlineSlot = slotId => slotId === "object2" || slotId === "object3";
      const isSilentShuntlineMarker = value => {
        if (!value || value === targetObject.OBJECT_TOGGLE_ALL) {
          return true;
        }
        return Number(activeValency) >= 4 && targetObject.VALENCE4_SPECIFIC_REPRESENTATIVE_PREFIXES.has(value);
      };
      const updateObjectToggleStyling = () => {
        objectSlotStates.forEach(slotState => {
          if (!slotState.toggleEl) {
            return;
          }
          const controllerIsSilent = slotState.id === controllerSlotId && isSilentControllerMarker(slotState.activeId);
          slotState.buttons.forEach((button, key) => {
            const isActiveButton = key === slotState.activeId;
            const shuntlineOptionIsOvert = isShuntlineSlot(slotState.id) && !isSilentShuntlineMarker(key);
            const shuntlineOptionIsSilent = isShuntlineSlot(slotState.id) && key !== targetObject.OBJECT_TOGGLE_ALL && isSilentShuntlineMarker(key);
            button.classList.toggle("object-toggle-button--controller-silent", controllerIsSilent && isActiveButton);
            button.classList.toggle("object-toggle-button--shuntline-overt", shuntlineOptionIsOvert);
            button.classList.toggle("object-toggle-button--silent-zero", shuntlineOptionIsSilent);
          });
        });
      };
      const TOGGLE_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--viable", "object-toggle-button--masked", "object-toggle-button--impossible"];
      const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--selected-viable", "object-toggle-button--selected-masked", "object-toggle-button--selected-impossible"];
      const clearToggleAvailabilityClasses = button => {
        if (!button) {
          return;
        }
        TOGGLE_AVAILABILITY_CLASS_NAMES.forEach(className => {
          button.classList.remove(className);
        });
        TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach(className => {
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
          ariaLabel: targetObject.getToggleLabel("subject", isNawat, "Sujeto"),
          onSelect: id => setActiveSubject(id),
          getActiveId: () => activeSubject
        });
        subjectToggleControl.toggle.dataset.toggleType = "subject";
        subjectToggleControl.toggle.dataset.toggleSlot = "subject";
        subjectButtons = subjectToggleControl.buttons;
        titleControls.appendChild(subjectToggleControl.toggle);
        setActiveSubject = (subjectId, options = {}) => {
          activeSubject = subjectId;
          targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, subjectId, {
            syncLock: true
          });
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
          ariaLabel: targetObject.getToggleLabel("subject", isNawat, "Sujeto"),
          onSelect: id => setActivePassiveSubject(id),
          getActiveId: () => activePassiveSubject
        });
        passiveSubjectToggleControl.toggle.dataset.toggleType = "subject";
        passiveSubjectToggleControl.toggle.dataset.toggleSlot = "subject";
        passiveSubjectButtons = passiveSubjectToggleControl.buttons;
        titleControls.appendChild(passiveSubjectToggleControl.toggle);
        setActivePassiveSubject = (subjectId, options = {}) => {
          activePassiveSubject = subjectId;
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, passiveSubjectStateKey, subjectId, {
            syncLock: true
          });
          setToggleActiveState(passiveSubjectButtons, subjectId);
          if (options.render !== false) {
            renderRows();
          }
        };
      }
      const showObjectToggle = !isNonactiveMode && prefixes.length > 1 || isNonactiveMode && (!isDirectGroup ? prefixes.length > 1 : allowObjectToggle);
      if (showObjectToggle) {
        const objectToggleControl = buildToggleControl({
          options: objectOptions,
          activeId: activeObjectPrefix,
          ariaLabel: primaryObjectSlot ? primaryObjectSlot.toggleAriaLabel : targetObject.getToggleLabel("object", isNawat, "Objeto"),
          onSelect: id => setActivePrefix(id),
          getActiveId: () => activeObjectPrefix
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
      const getExtraSlotBitransitiveDefaults = slotId => {
        const preferredId = uiDefaultObjectBySlot?.[slotId] || "ki";
        return {
          preferredId,
          fallbackIds: [targetObject.OBJECT_TOGGLE_ALL, ""]
        };
      };
      objectSlotStates.filter(slotState => !slotState.isPrimary).forEach(slotState => {
        if (!slotState.options.length) {
          slotState.activeId = "";
          return;
        }
        if (shouldDefaultBitransitiveObjects) {
          const defaults = getExtraSlotBitransitiveDefaults(slotState.id);
          const defaultId = targetObject.getDefaultOutputToggleSelection({
            context: "verb-extra-object",
            values: Array.from(slotState.optionMap.keys()),
            preferredId: defaults.preferredId,
            fallbackIds: defaults.fallbackIds
          });
          targetObject.applyDefaultToggleStateOnce(targetObject.ObjectToggleState, slotState.stateKey, bitransitiveObjectSeedKey, defaultId);
        }
        const storedValue = targetObject.getToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey);
        if (storedValue !== undefined && slotState.optionMap.has(storedValue)) {
          slotState.activeId = storedValue;
        }
        if (!slotState.optionMap.has(slotState.activeId)) {
          slotState.activeId = "";
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, slotState.activeId, {
            syncLock: false
          });
        }
        const toggleControl = buildToggleControl({
          options: slotState.options,
          activeId: slotState.activeId,
          ariaLabel: slotState.toggleAriaLabel,
          onSelect: id => {
            const setter = objectSlotSetters.get(slotState.id);
            if (setter) {
              setter(id);
            }
          },
          getActiveId: () => slotState.activeId
        });
        toggleControl.toggle.dataset.toggleType = "object";
        toggleControl.toggle.dataset.toggleSlot = slotState.id;
        slotState.buttons = toggleControl.buttons;
        slotState.toggleEl = toggleControl.toggle;
        titleControls.appendChild(toggleControl.toggle);
        slotState.setActive = (markerId, options = {}) => {
          slotState.activeId = markerId;
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, markerId, {
            syncLock: true
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
      const destinationSlot = targetObject.document.createElement("div");
      destinationSlot.className = "tense-block__destination";
      destinationSlot.hidden = true;
      const resolveDestinationSourceObjectPrefix = () => {
        const objectPrefixValue = getActiveSlotToggleValue("object");
        if (objectPrefixValue === targetObject.OBJECT_TOGGLE_ALL) {
          return targetObject.getPreferredObjectPrefix(prefixes) || "";
        }
        return objectPrefixValue || "";
      };
      const updateVerbTenseBlockDestination = () => {
        destinationSlot.replaceChildren();
        const destinationPicker = createVerbTenseBlockDestinationPicker({
          sourceVerb: verb,
          sourceObjectPrefix: resolveDestinationSourceObjectPrefix(),
          sourceTenseValue: tenseValue,
          sourceCombinedMode: isNonactiveMode ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
          isNawat
        });
        if (destinationPicker) {
          destinationSlot.appendChild(destinationPicker);
          destinationSlot.hidden = false;
          tenseBlock.classList.add("tense-block--has-destination-menu");
        } else {
          destinationSlot.hidden = true;
          tenseBlock.classList.remove("tense-block--has-destination-menu");
        }
      };
      tenseTitle.appendChild(titleControls);
      tenseTitle.appendChild(destinationSlot);
      tenseBlock.appendChild(tenseTitle);
      const list = targetObject.document.createElement("div");
      list.className = "conjugation-list";
      const blockOutputRows = [];
      tenseBlock.__outputRows = blockOutputRows;
      const getSubjectToggleLabelForExport = () => {
        if (isNonactiveMode && allowSubjectToggle) {
          return passiveSubjectOptionMap.get(activePassiveSubject)?.label || "";
        }
        return subjectOptionMap.get(activeSubject)?.label || "";
      };
      const getObjectSlotCountForExport = () => targetObject.normalizeUnifiedVerbOutputObjectSlotCount(objectSlotStates.filter(slotState => Boolean(slotState.toggleEl)).length);
      const appendBlockOutputRow = ({
        person = "",
        personSub = "",
        form = "",
        slotValuesById = {}
      } = {}) => {
        blockOutputRows.push(targetObject.normalizeUnifiedVerbOutputEntry({
          sourceMode: isNonactiveMode ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
          block: String(titleLabel?.textContent || "").trim(),
          person,
          personSub,
          subjectToggle: getSubjectToggleLabelForExport(),
          object: slotValuesById.object || "",
          object2: slotValuesById.object2 || "",
          object3: slotValuesById.object3 || "",
          form,
          objectSlotCount: getObjectSlotCountForExport()
        }));
      };
      const updateSectionCategory = prefix => {
        targetObject.applyObjectSectionCategory(sectionEl, prefix);
      };
      const getSubjectSelectionsForId = (subjectId = activeSubject) => {
        let selections = targetObject.getSubjectPersonSelections();
        if (subjectId !== targetObject.SUBJECT_TOGGLE_ALL) {
          const entry = subjectOptionMap.get(subjectId);
          if (!entry) {
            return [];
          }
          selections = selections.filter(({
            selection
          }) => selection.subjectPrefix === entry.subjectPrefix && selection.subjectSuffix === entry.subjectSuffix);
        }
        return selections;
      };
      const buildObjectSlotModelsForState = (slotOverrides = {}) => objectSlotStates.map(slotState => {
        const overrideId = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id) ? slotOverrides[slotState.id] : slotState.activeId;
        return {
          id: slotState.id,
          datasetKey: slotState.datasetKey,
          roleLabel: slotState.roleLabel,
          rawValues: overrideId === targetObject.OBJECT_TOGGLE_ALL ? slotState.toggleValues : [overrideId]
        };
      });
      const iterateObjectSlotValues = (slotModels, slotIndex, rawBySlot, callback) => {
        if (slotIndex >= slotModels.length) {
          callback(rawBySlot);
          return;
        }
        const slotModel = slotModels[slotIndex];
        const values = Array.isArray(slotModel.rawValues) && slotModel.rawValues.length ? slotModel.rawValues : [""];
        values.forEach(slotValue => {
          rawBySlot[slotModel.id] = slotValue || "";
          iterateObjectSlotValues(slotModels, slotIndex + 1, rawBySlot, callback);
        });
      };
      const combinationEvaluationCache = new Map();
      const nonactiveCombinationEvaluationCache = new Map();
      let toggleAvailabilityMemo = new Map();
      const generationModeOverride = targetObject.buildVerbModeGenerateOverride({
        isNonactiveMode,
        derivationType
      });
      const toggleAvailabilityMemoContext = ["toggle-availability", modeKey || "", derivationType || "", isNonactiveMode ? "nonactive" : "active", verb || "", tenseValue || "", String(activeValency || 0), String(modeObjectSlots || 0), String(nonactiveAvailableSlots || 0), String(allowIndirectObjectToggle), String(allowSubjectToggle), String(allowObjectToggle), hasPromotableObject ? "1" : "0"].join("|");
      const evaluateObjectCombinationState = (selection, rawBySlot) => {
        const slotValuesByRole = targetObject.mapSlotValuesByRole(rawBySlot);
        const grammarConstraintState = targetObject.evaluateGrammarConstraintSet({
          grammarState: resolvedGrammarState,
          subjectSelection: selection,
          slotValuesByRole,
          enforceValence4Matrix: allowThirdObjectToggle && Number(activeValency) >= 4
        });
        const rawObjectPrefix = grammarConstraintState.rawSlotValuesById.object || "";
        const rawIndirectMarker = grammarConstraintState.rawSlotValuesById.object2 || "";
        const rawThirdMarker = grammarConstraintState.rawSlotValuesById.object3 || "";
        const cacheKey = [selection.subjectPrefix, selection.subjectSuffix, rawObjectPrefix, rawIndirectMarker, rawThirdMarker].join("|");
        const cached = combinationEvaluationCache.get(cacheKey);
        if (cached) {
          return cached;
        }
        const shouldEnforceValence4Matrix = allowThirdObjectToggle && Number(activeValency) >= 4;
        const hasValenceStructureError = grammarConstraintState.valence4Violation;
        const resolvedValence = {
          objectPrefix: grammarConstraintState.normalizedSlotValuesById.object || "",
          indirectObjectMarker: grammarConstraintState.normalizedSlotValuesById.object2 || ""
        };
        const displaySlotValues = shouldEnforceValence4Matrix ? {
          object: rawObjectPrefix,
          object2: targetObject.collapseSilentSpecificForDisplay(rawIndirectMarker),
          object3: targetObject.collapseSilentSpecificForDisplay(rawThirdMarker)
        } : {
          object: resolvedValence.objectPrefix || "",
          object2: resolvedValence.indirectObjectMarker || "",
          object3: rawThirdMarker || ""
        };
        const generatedIndirectMarker = shouldEnforceValence4Matrix ? targetObject.collapseSilentSpecificForDisplay(rawIndirectMarker) : rawIndirectMarker;
        const generatedThirdMarker = shouldEnforceValence4Matrix ? targetObject.collapseSilentSpecificForDisplay(rawThirdMarker) : rawThirdMarker;
        const controllerForValidation = grammarConstraintState.controllerPrefix || "";
        const result = targetObject.getCachedSilentGenerateWord({
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
            tense: tenseValue
          }
        }) || {};
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: selection.subjectPrefix,
          subjectSuffix: selection.subjectSuffix,
          objectPrefix: rawObjectPrefix,
          comboObjectPrefix: controllerForValidation
        });
        const evaluation = {
          ...targetObject.buildConjugationEvaluationRecord({
            result,
            maskState,
            grammarConstraintState,
            hasValenceStructureError
          }),
          rawObjectPrefix,
          rawIndirectMarker,
          rawThirdMarker,
          displaySlotValues
        };
        combinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
      };
      const resolveToggleAvailabilityState = ({
        subjectSelections,
        objectSlotModels
      }) => {
        const memoKey = [toggleAvailabilityMemoContext, "active", subjectSelections.map(({
          selection
        }) => `${selection.subjectPrefix || ""}:${selection.subjectSuffix || ""}`).join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.rawValues || []).join(",")}`).join(";")].join("|");
        if (toggleAvailabilityMemo.has(memoKey)) {
          return toggleAvailabilityMemo.get(memoKey);
        }
        const summary = targetObject.createToggleAvailabilityRealizationSummary();
        subjectSelections.forEach(({
          selection
        }) => {
          iterateObjectSlotValues(objectSlotModels, 0, {}, rawBySlot => {
            const evaluation = evaluateObjectCombinationState(selection, rawBySlot);
            targetObject.recordToggleAvailabilityRealization(summary, evaluation);
          });
        });
        const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
        toggleAvailabilityMemo.set(memoKey, resolvedRecord);
        return resolvedRecord;
      };
      const clearToggleAvailabilityStyling = () => {
        subjectButtons.forEach(button => clearToggleAvailabilityClasses(button));
        passiveSubjectButtons.forEach(button => clearToggleAvailabilityClasses(button));
        objectSlotStates.forEach(slotState => {
          slotState.buttons.forEach(button => clearToggleAvailabilityClasses(button));
        });
      };
      const evaluateNonactiveCombinationState = ({
        objectPrefixCandidate = "",
        passiveSubjectPrefixCandidate = null
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
          tense: tenseValue
        };
        let subjectOverride = null;
        if (isDirectGroup && passiveSubjectPrefixCandidate) {
          subjectOverride = targetObject.getPassiveSubjectOverride(passiveSubjectPrefixCandidate);
          if (!subjectOverride) {
            return targetObject.buildConjugationEvaluationRecord({
              result: {},
              extraDiagnostics: [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.invalidCombo, "error", {
                source: "grammar-constraint"
              })]
            });
          }
          overridePayload.subjectPrefix = subjectOverride.subjectPrefix;
          overridePayload.subjectSuffix = subjectOverride.subjectSuffix;
          overridePayload.preservePassiveSubject = true;
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          allowPassiveObject: isDirectGroup && allowObjectToggle,
          override: overridePayload
        }) || {};
        const mappedSubjectInfo = subjectOverride ? targetObject.getSubjectPersonInfo(subjectOverride.subjectPrefix || "", subjectOverride.subjectSuffix || "") : null;
        const shouldBypassPassiveMappedConstraints = isDirectGroup && !!subjectOverride && mappedSubjectInfo?.person === 3;
        const maskState = targetObject.getConjugationMaskState({
          result,
          subjectPrefix: subjectOverride?.subjectPrefix || "",
          subjectSuffix: subjectOverride?.subjectSuffix || "",
          objectPrefix: objectPrefixCandidate,
          invalidComboSet: targetObject.INVALID_COMBINATION_KEYS,
          controllerObjectMarker: shouldBypassPassiveMappedConstraints ? "" : null,
          enforceInvalidCombo: true
        });
        const hideReflexive = !!(result && result.isReflexive && targetObject.getObjectCategory(objectPrefixCandidate) !== "reflexive");
        const evaluation = targetObject.buildConjugationEvaluationRecord({
          result,
          maskState,
          extraDiagnostics: hideReflexive ? [targetObject.buildConjugationDiagnosticEntry(targetObject.CONJUGATION_DIAGNOSTIC_IDS.reflexiveHidden, "masked", {
            source: "result"
          })] : []
        });
        nonactiveCombinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
      };
      const updateToggleOptionAvailabilityStyling = () => {
        if (!verb) {
          clearToggleAvailabilityStyling();
          return;
        }
        if (targetObject.VerbRenderContext === "typing") {
          targetObject.scheduleDeferredToggleAvailabilityPass();
          return;
        }
        if (isNonactiveMode) {
          clearToggleAvailabilityStyling();
          const objectSelectionPool = allowObjectToggle ? objectTogglePrefixes : [""];
          const resolveObjectSelections = objectToggleId => allowObjectToggle ? objectToggleId === targetObject.OBJECT_TOGGLE_ALL ? objectSelectionPool : [objectToggleId] : [""];
          const directSubjectPool = passiveSubjectPrefixes.filter(prefix => prefix !== "");
          const resolveSubjectSelections = subjectToggleId => {
            if (!isDirectGroup) {
              return [null];
            }
            if (allowSubjectToggle) {
              return subjectToggleId === targetObject.OBJECT_TOGGLE_ALL ? directSubjectPool : [subjectToggleId];
            }
            return directSubjectPool.length ? directSubjectPool : [null];
          };
          const classifyNonactiveSummary = (objectToggleId, subjectToggleId) => {
            const objectSelections = resolveObjectSelections(objectToggleId);
            const subjectSelections = resolveSubjectSelections(subjectToggleId);
            const memoKey = [toggleAvailabilityMemoContext, "nonactive", objectToggleId || "", subjectToggleId || "", objectSelections.join(","), subjectSelections.map(value => value || "").join(",")].join("|");
            if (toggleAvailabilityMemo.has(memoKey)) {
              return toggleAvailabilityMemo.get(memoKey);
            }
            const summary = targetObject.createToggleAvailabilityRealizationSummary();
            objectSelections.forEach(objectPrefixCandidate => {
              subjectSelections.forEach(passiveSubjectPrefixCandidate => {
                const evaluation = evaluateNonactiveCombinationState({
                  objectPrefixCandidate,
                  passiveSubjectPrefixCandidate
                });
                targetObject.recordToggleAvailabilityRealization(summary, evaluation);
              });
            });
            const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
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
        objectSlotStates.forEach(slotState => {
          slotState.buttons.forEach((button, optionId) => {
            const staticViableSet = staticViableOptionSetBySlot.get(slotState.id);
            if (staticViableSet && optionId !== targetObject.OBJECT_TOGGLE_ALL && !staticViableSet.has(optionId)) {
              applyToggleAvailabilityClass(button, targetObject.CONJUGATION_AVAILABILITY_STATE.impossible);
              applySelectedAvailabilityClass(button, targetObject.CONJUGATION_AVAILABILITY_STATE.impossible, optionId === slotState.activeId);
              return;
            }
            const optionObjectModels = buildObjectSlotModelsForState({
              [slotState.id]: optionId
            });
            const availabilityRecord = resolveToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              objectSlotModels: optionObjectModels
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
              objectSlotModels: activeObjectModels
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
          const placeholder = targetObject.document.createElement("div");
          placeholder.className = "tense-placeholder";
          placeholder.textContent = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa un verbo para ver las conjugaciones.");
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
            buildOutputRowEntry: ({
              person,
              personSub,
              form,
              slotValuesById
            }) => {
              appendBlockOutputRow({
                person,
                personSub,
                form,
                slotValuesById
              });
            }
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
          const canonicalKey = [selection.subjectPrefix, selection.subjectSuffix, ...objectSlotModels.map(slotModel => displaySlotValues[slotModel.id] || "")].join("|");
          if (isBitransitiveGrid && seenCanonicalBitransitiveRows.has(canonicalKey)) {
            return;
          }
          const row = targetObject.document.createElement("div");
          row.className = "conjugation-row";
          targetObject.applyConjugationRowClasses(row, displaySlotValues.object);
          objectSlotModels.forEach(slotModel => {
            if (!slotModel.datasetKey) {
              return;
            }
            row.dataset[slotModel.datasetKey] = displaySlotValues[slotModel.id] || "";
          });
          const label = targetObject.document.createElement("div");
          label.className = "conjugation-label";
          const personLabel = targetObject.document.createElement("div");
          personLabel.className = "person-label";
          personLabel.textContent = targetObject.getSubjectPersonLabel(group, selection, isNawat);
          const personSub = targetObject.document.createElement("div");
          personSub.className = "person-sub";
          label.appendChild(personLabel);
          label.appendChild(personSub);
          const value = targetObject.document.createElement("div");
          value.className = "conjugation-value";
          const shouldMaskRow = evaluation.shouldMaskRow;
          const isErrorRow = evaluation.isErrorRow;
          const basePersonSub = targetObject.getSubjectSubLabel(selection, {
            isNawat,
            mode: subjectSubMode,
            tenseValue
          });
          const showZeroObjectRoles = isBitransitiveGrid && Number(activeValency) >= 4;
          const useObjectOnlyPersonSub = Number(activeValency) >= 3;
          const objectOnlyParts = [];
          const roleParts = [];
          objectSlotModels.forEach(slotModel => {
            const displayValue = displaySlotValues[slotModel.id] || "";
            const slotLabel = displayValue ? targetObject.getObjectComboLabel(displayValue, isNawat) : showZeroObjectRoles ? "Ø" : "";
            if (!slotLabel) {
              return;
            }
            objectOnlyParts.push(slotLabel);
            roleParts.push(`${slotModel.roleLabel} ${slotLabel}`.trim());
          });
          personSub.textContent = useObjectOnlyPersonSub ? targetObject.formatActiveValence3PlusPersonSub(basePersonSub, objectOnlyParts, isNawat) : roleParts.length ? [basePersonSub, ...roleParts].filter(Boolean).join(" · ") : [basePersonSub].filter(Boolean).join(" · ");
          const renderedValue = shouldMaskRow ? "—" : targetObject.formatConjugationDisplay(evaluation.result.result);
          const dedupeKey = isBitransitiveGrid ? canonicalKey : [selection.subjectPrefix, selection.subjectSuffix, ...objectSlotModels.map(slotModel => displaySlotValues[slotModel.id] || ""), renderedValue].join("|");
          if (seenRows.has(dedupeKey)) {
            return;
          }
          seenRows.add(dedupeKey);
          if (isBitransitiveGrid) {
            seenCanonicalBitransitiveRows.add(canonicalKey);
          }
          targetObject.applyConjugationEvaluationPresentation({
            row,
            value,
            evaluation,
            formattedValue: renderedValue
          });
          row.appendChild(label);
          row.appendChild(value);
          list.appendChild(row);
          appendBlockOutputRow({
            person: personLabel.textContent.trim(),
            personSub: personSub.textContent.trim(),
            form: value.textContent.trim(),
            slotValuesById: displaySlotValues
          });
        };
        subjectSelections.forEach(({
          group,
          selection
        }) => {
          iterateObjectSlotValues(objectSlotModels, 0, {}, rawBySlot => {
            renderForObjectCombination(group, selection, rawBySlot);
          });
        });
        updateToggleOptionAvailabilityStyling();
      };
      const resolveSectionPrefix = prefix => {
        if (prefix !== targetObject.OBJECT_TOGGLE_ALL) {
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
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, objectStateKey, prefix, {
          syncLock: true
        });
        if (!isNonactiveMode) {
          titleLabel.textContent = buildBlockLabel();
        }
        tenseBlock.dataset.tenseBlock = `${resolveTenseBlockPrefix(prefix)}-${tenseValue}`;
        updateSectionCategory(resolveSectionPrefix(prefix));
        setToggleActiveState(toggleButtons, prefix);
        updateObjectToggleStyling();
        updateVerbTenseBlockPalette();
        updateVerbTenseBlockDestination();
        if (options.render !== false) {
          renderRows();
        }
      };
      tenseBlock.appendChild(list);
      if (isNonactiveMode) {
        const isIntransitiveOnly = prefixes.length === 1 && prefixes[0] === "";
        const nonactiveBaseLabel = isIntransitiveOnly ? impersonalLabel : isDirectGroup ? passiveLabel : impersonalLabel;
        titleLabel.textContent = valencyLabel ? `${nonactiveBaseLabel} · ${valencyLabel}` : nonactiveBaseLabel;
        setActivePrefix(activeObjectPrefix, {
          render: false
        });
        if (setActivePassiveSubject) {
          setActivePassiveSubject(activePassiveSubject, {
            render: false
          });
        }
      } else {
        setActivePrefix(activeObjectPrefix, {
          render: false
        });
        if (setActiveSubject) {
          setActiveSubject(activeSubject, {
            render: false
          });
        }
      }
      objectSlotStates.filter(slotState => !slotState.isPrimary && typeof slotState.setActive === "function").forEach(slotState => {
        slotState.setActive(slotState.activeId, {
          render: false
        });
      });
      updateVerbTenseBlockPalette();
      renderRows();
      return tenseBlock;
    }
    function clearUnifiedVerbOutputDataset() {
      targetObject.VerbUnifiedOutputState.rows = [];
      targetObject.VerbUnifiedOutputState.bySourceKey = new Map();
      targetObject.VerbUnifiedOutputState.grouped = new Map();
      targetObject.VerbUnifiedOutputState.updatedAt = Date.now();
    }
    function rebuildUnifiedVerbOutputDataset(container, {
      tenseValue = "",
      groupKey = ""
    } = {}) {
      if (!container || typeof container.querySelectorAll !== "function") {
        clearUnifiedVerbOutputDataset();
        return;
      }
      const structuredRows = targetObject.collectStructuredUnifiedVerbOutputRows(container, {
        tenseValue,
        groupKey
      });
      if (structuredRows.length) {
        targetObject.setUnifiedVerbOutputDatasetRows(structuredRows, {
          tenseValue,
          groupKey
        });
        return;
      }
      const rows = [];
      const bySourceKey = new Map();
      const grouped = new Map();
      const rowNodes = Array.from(container.querySelectorAll(".tense-block .conjugation-row"));
      rowNodes.forEach(row => {
        const block = row.closest(".tense-block");
        if (!block) {
          return;
        }
        const sourceColumn = row.closest(".tense-grid-source-column");
        const sourceMode = sourceColumn?.dataset?.sourceMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : sourceColumn?.dataset?.sourceMode === "mixed" ? "mixed" : targetObject.COMBINED_MODE.active;
        const blockLabel = block.querySelector(".tense-block__label")?.textContent?.trim() || "";
        const person = row.querySelector(".person-label")?.textContent?.trim() || "";
        const personSub = row.querySelector(".person-sub")?.textContent?.trim() || "";
        const form = row.querySelector(".conjugation-value")?.textContent?.trim() || "";
        const object = row.dataset.objectPrefix || "";
        const object2 = row.dataset.indirectObjectPrefix || "";
        const object3 = row.dataset.thirdObjectPrefix || "";
        const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
        const entry = {
          tenseValue: tenseValue || (selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue) || "",
          groupKey: groupKey || selectionState.group || "",
          sourceMode,
          block: blockLabel,
          person,
          personSub,
          object,
          object2,
          object3,
          form
        };
        rows.push(entry);
        const baseKey = [entry.groupKey, entry.tenseValue, entry.block, entry.person, entry.personSub, entry.object, entry.object2, entry.object3].join("|");
        const sourceKey = `${baseKey}|${sourceMode}`;
        bySourceKey.set(sourceKey, entry);
        const groupedEntry = grouped.get(baseKey) || {};
        groupedEntry[sourceMode] = entry;
        grouped.set(baseKey, groupedEntry);
      });
      targetObject.VerbUnifiedOutputState.rows = rows;
      targetObject.VerbUnifiedOutputState.bySourceKey = bySourceKey;
      targetObject.VerbUnifiedOutputState.grouped = grouped;
      targetObject.VerbUnifiedOutputState.updatedAt = Date.now();
    }
    function renderVerbConjugationBlocks({
      container,
      tenseValue,
      buildBlock,
      objectPrefixGroupsByMode = null,
      modesToRender = [targetObject.COMBINED_MODE.active],
      isNawat = false
    }) {
      container.innerHTML = "";
      const normalizedModes = Array.isArray(modesToRender) && modesToRender.length ? Array.from(new Set(modesToRender.map(mode => mode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active))) : [targetObject.COMBINED_MODE.active];
      const groupsByMode = new Map();
      normalizedModes.forEach(mode => {
        const groups = objectPrefixGroupsByMode instanceof Map ? objectPrefixGroupsByMode.get(mode) || [] : [];
        groupsByMode.set(mode, Array.isArray(groups) ? groups : []);
      });
      const maxGroupCount = normalizedModes.reduce((max, mode) => Math.max(max, (groupsByMode.get(mode) || []).length), 0);
      for (let groupIndex = 0; groupIndex < maxGroupCount; groupIndex += 1) {
        const objSection = targetObject.document.createElement("div");
        objSection.className = "object-section";
        const grid = targetObject.document.createElement("div");
        grid.className = "tense-grid";
        const useSourceColumns = normalizedModes.length > 1;
        const sourceColumns = useSourceColumns ? createSourceModeColumns(grid, isNawat) : null;
        normalizedModes.forEach(mode => {
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
      const objSection = targetObject.document.createElement("div");
      objSection.className = "object-section";
      const grid = targetObject.document.createElement("div");
      grid.className = "tense-grid";
      objSection.appendChild(grid);
      container.appendChild(objSection);
      return {
        objSection,
        grid
      };
    }
    function createSourceModeColumns(grid, isNawat = false) {
      if (!grid) {
        return null;
      }
      grid.classList.add("tense-grid--source-columns");
      const buildColumn = (mode, fallbackLabel = "") => {
        const column = targetObject.document.createElement("div");
        column.className = "tense-grid-source-column";
        column.dataset.sourceMode = mode;
        const heading = targetObject.document.createElement("div");
        heading.className = "tense-grid-source-column__heading";
        const labelKey = mode === targetObject.COMBINED_MODE.nonactive ? "tense-tabs-mode-nonactive" : "tense-tabs-mode-active";
        heading.textContent = targetObject.getLocalizedLabel(targetObject.UI_LABELS[labelKey], isNawat, fallbackLabel);
        const blocks = targetObject.document.createElement("div");
        blocks.className = "tense-grid-source-column__blocks";
        column.appendChild(heading);
        column.appendChild(blocks);
        grid.appendChild(column);
        return {
          column,
          blocks,
          mode
        };
      };
      const activeColumn = buildColumn(targetObject.COMBINED_MODE.active, "activo");
      const nonactiveColumn = buildColumn(targetObject.COMBINED_MODE.nonactive, "no activo");
      const mixedColumn = buildColumn("mixed", "activo / no activo");
      mixedColumn.column.classList.add("tense-grid-source-column--mixed");
      const clearEmptyPlaceholder = blocks => {
        blocks.querySelectorAll(".tense-grid-source-column__empty").forEach(empty => {
          empty.remove();
        });
      };
      return {
        appendBlock(block, mode = targetObject.COMBINED_MODE.active) {
          if (!block) {
            return;
          }
          const target = mode === "mixed" ? mixedColumn.blocks : mode === targetObject.COMBINED_MODE.nonactive ? nonactiveColumn.blocks : activeColumn.blocks;
          clearEmptyPlaceholder(target);
          target.appendChild(block);
        },
        finalize() {
          [activeColumn.blocks, nonactiveColumn.blocks].forEach(blocks => {
            clearEmptyPlaceholder(blocks);
            if (blocks.children.length > 0) {
              return;
            }
            const empty = targetObject.document.createElement("div");
            empty.className = "tense-grid-source-column__empty";
            empty.textContent = "—";
            blocks.appendChild(empty);
          });
          clearEmptyPlaceholder(mixedColumn.blocks);
          mixedColumn.column.hidden = mixedColumn.blocks.children.length === 0;
        }
      };
    }
    function buildToggleControl({
      options,
      activeId,
      onSelect,
      ariaLabel,
      visibleLabel = "",
      getTitle,
      getIsDisabled,
      getActiveId,
      stacked = true,
      toggleClassName = "",
      allowDeselect = false
    }) {
      const toggle = targetObject.document.createElement("div");
      toggle.className = stacked ? "object-toggle object-toggle--stacked" : "object-toggle";
      if (toggleClassName) {
        toggle.classList.add(toggleClassName);
      }
      toggle.setAttribute("role", "group");
      toggle.setAttribute("aria-label", ariaLabel);
      const normalizedVisibleLabel = String(visibleLabel || "").trim();
      if (normalizedVisibleLabel) {
        toggle.classList.add("object-toggle--with-label");
        const label = targetObject.document.createElement("span");
        label.className = "object-toggle__label";
        label.textContent = normalizedVisibleLabel;
        label.setAttribute("aria-hidden", "true");
        toggle.appendChild(label);
      }
      const buttons = new Map();
      options.forEach(option => {
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = "object-toggle-button";
        button.textContent = option.label;
        if (option.availabilityState) {
          button.dataset.availabilityState = option.availabilityState;
        }
        if (option.diagnosticIds) {
          button.dataset.diagnosticIds = option.diagnosticIds;
        }
        if (option.selectedUnsupported) {
          button.dataset.selectedUnsupported = "true";
          button.classList.add("is-selected-unsupported");
        }
        const isActive = option.id === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        const title = typeof getTitle === "function" ? getTitle(option) : option.title;
        if (title) {
          button.title = title;
        }
        const isDisabled = option.disabled === true || (typeof getIsDisabled === "function" ? getIsDisabled(option) : false);
        if (isDisabled) {
          button.disabled = true;
          button.setAttribute("aria-disabled", "true");
          button.classList.add("is-unavailable");
        }
        button.addEventListener("click", () => {
          const resolvedActiveId = typeof getActiveId === "function" ? getActiveId() : activeId;
          if (allowDeselect && resolvedActiveId === option.id) {
            targetObject.preserveViewportAnchorPosition(button, () => {
              onSelect(null);
            });
            return;
          }
          if (targetObject.isToggleLockEnabled() && resolvedActiveId === option.id) {
            targetObject.preserveViewportAnchorPosition(button, () => {
              targetObject.setToggleLockEnabled(false, {
                resetToDefaults: true,
                persist: true,
                refreshUi: true
              });
            });
            return;
          }
          targetObject.preserveViewportAnchorPosition(button, () => {
            onSelect(option.id);
          });
        });
        buttons.set(option.id, button);
        toggle.appendChild(button);
      });
      return {
        toggle,
        buttons
      };
    }
    function setToggleActiveState(buttons, activeId) {
      buttons.forEach((button, key) => {
        const isActive = key === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
    }
    function getVerbObjectPrefixGroups(parsedVerb, isNonactiveMode, nonactiveConfig) {
      const objectPrefixes = targetObject.getObjectPrefixesForTransitividad(parsedVerb);
      if (isNonactiveMode && nonactiveConfig) {
        return nonactiveConfig.groups;
      }
      if (!isNonactiveMode && targetObject.getTransitividadSelection(parsedVerb) === "transitivo") {
        const orderedPrefixes = ["nech", "metz", "ki", "tech", "metzin", "kin", "ta", "te", "mu"].filter(prefix => objectPrefixes.includes(prefix));
        return [{
          prefixes: orderedPrefixes.length ? orderedPrefixes : objectPrefixes
        }];
      }
      return targetObject.buildObjectPrefixGroups(objectPrefixes);
    }
    function resolveVerbTenseValue({
      modeKey,
      tenseValue
    }) {
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
      if (modeKey === "universal") {
        return targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tenseValue) ? tenseValue : selectionState.universalTenseValue;
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
      includeDiagnostics = false
    }) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return null;
      }
      const resolvedCombinedMode = combinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : combinedMode === targetObject.COMBINED_MODE.active ? targetObject.COMBINED_MODE.active : targetObject.getCombinedMode();
      const isNonactiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.verbo && resolvedCombinedMode === targetObject.COMBINED_MODE.nonactive;
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      const resolvedTenseValue = resolveVerbTenseValue({
        modeKey,
        tenseValue
      });
      const parsedVerb = targetObject.getParsedVerbForTab(modeKey || "verb", verb);
      const derivationType = parsedVerb.derivationType || targetObject.getActiveDerivationType();
      const initialGrammarState = targetObject.buildCanonicalGrammarState({
        parsedVerb,
        derivationType,
        voiceMode: isNonactiveMode ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active,
        isNonactiveMode
      });
      const forceDefaultTodosKi = parsedVerb.hasConsecutiveSpecificValences;
      const nonactiveConfig = isNonactiveMode ? targetObject.getNonactiveObjectPrefixGroups(parsedVerb) : null;
      const valencySummary = initialGrammarState.valencySummary;
      const activeValency = initialGrammarState.valencyActive;
      const nonactiveAvailableSlots = isNonactiveMode ? valencySummary.nonactiveObjectSlots : 0;
      const modeObjectSlots = Array.isArray(initialGrammarState.modeSlots) ? initialGrammarState.modeSlots.length : isNonactiveMode ? valencySummary.nonactiveObjectSlots : valencySummary.availableObjectSlots;
      const hasPromotableObject = isNonactiveMode ? valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots : false;
      const embeddedObjectFilled = parsedVerb.embeddedValenceCount > 0 && targetObject.getAvailableObjectSlots(parsedVerb) <= 0;
      const fusionMarkers = parsedVerb.isTaFusion ? (parsedVerb.fusionPrefixes || []).filter(prefix => targetObject.FUSION_PREFIXES.has(prefix)) : [];
      const baseObjectPrefixGroups = getVerbObjectPrefixGroups(parsedVerb, isNonactiveMode, nonactiveConfig);
      const allowIndirectObjectToggleFinal = modeObjectSlots > 1;
      let objectPrefixGroups = baseObjectPrefixGroups;
      if (allowIndirectObjectToggleFinal && !isNonactiveMode) {
        const mergedPrefixes = Array.from(new Set(baseObjectPrefixGroups.flatMap(group => group.prefixes || []))).filter(prefix => prefix !== "");
        if (mergedPrefixes.length) {
          objectPrefixGroups = [{
            prefixes: mergedPrefixes
          }];
        }
      }
      const indirectTogglePrefixes = allowIndirectObjectToggleFinal ? [...targetObject.SPECIFIC_VALENCE_PREFIXES, "ta", "te", "mu"] : [];
      const primaryTogglePrefixes = Array.from(new Set(objectPrefixGroups.flatMap(group => group.prefixes || [])));
      const grammarPipeline = targetObject.runVerbGrammarPipeline({
        verb,
        modeKey: modeKey || "verb",
        parsedVerb,
        derivationType,
        voiceMode: isNonactiveMode ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active,
        isNonactiveMode,
        primaryTogglePrefixes,
        indirectTogglePrefixes,
        includeDiagnostics
      });
      const grammarState = grammarPipeline.state || initialGrammarState;
      const grammarUiConfig = grammarPipeline.uiConfig || null;
      const resolvedActiveValency = Number.isFinite(grammarState?.valencyActive) ? grammarState.valencyActive : activeValency;
      const resolvedModeObjectSlots = Array.isArray(grammarState?.modeSlots) ? grammarState.modeSlots.length : modeObjectSlots;
      const resolvedNonactiveAvailableSlots = isNonactiveMode ? grammarState?.valencySummary?.nonactiveObjectSlots ?? nonactiveAvailableSlots : 0;
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
        grammarUiConfig
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
      includeDiagnostics = false
    }) {
      const selectedCombinedMode = targetObject.getCombinedMode();
      const sourceScope = targetObject.getVerbSourceScope();
      const isSimpleUi = targetObject.getActiveUiDensityMode() === targetObject.UI_DENSITY_MODE.simple;
      const modesToRender = isSimpleUi ? [targetObject.COMBINED_MODE.active] : sourceScope === targetObject.VERB_SOURCE_SCOPE.active ? [targetObject.COMBINED_MODE.active] : sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive ? [targetObject.COMBINED_MODE.nonactive] : [targetObject.COMBINED_MODE.active, targetObject.COMBINED_MODE.nonactive];
      const contextByMode = new Map();
      modesToRender.forEach(mode => {
        const modeContext = buildVerbTabRenderContext({
          verb,
          containerId,
          tenseValue,
          modeKey,
          subjectKeyPrefix,
          subjectSubMode,
          combinedMode: mode,
          includeDiagnostics: includeDiagnostics && mode === selectedCombinedMode
        });
        if (modeContext) {
          contextByMode.set(mode, modeContext);
        }
      });
      const context = contextByMode.get(selectedCombinedMode) || contextByMode.get(targetObject.COMBINED_MODE.active) || contextByMode.get(targetObject.COMBINED_MODE.nonactive) || null;
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
          grammarUiConfig: modeContext.grammarUiConfig
        });
      };
      renderVerbConjugationBlocks({
        container: context.container,
        tenseValue: context.resolvedTenseValue,
        buildBlock,
        objectPrefixGroupsByMode,
        modesToRender,
        isNawat: context.isNawat
      });
      const resolvedGroup = modeKey === "universal" ? targetObject.CONJUGATION_GROUPS.universal : targetObject.CONJUGATION_GROUPS.tense;
      rebuildUnifiedVerbOutputDataset(context.container, {
        tenseValue: context.resolvedTenseValue,
        groupKey: resolvedGroup
      });
    }
    function renderPretUniversalConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      renderVerbConjugationsCore({
        verb,
        containerId,
        tenseValue,
        modeKey: "universal",
        subjectKeyPrefix: "universal",
        subjectSubMode: "verb"
      });
    }
    function renderLocativoTemporalConjugations({
      verb,
      containerId = "all-tense-conjugations",
      modeFilter = null
    }) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return;
      }
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      const placeholderText = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa un verbo para ver las conjugaciones.");
      const allToggleLabel = targetObject.getToggleLabel("all", isNawat, "todos");
      const impersonalLabel = targetObject.getVerbBlockLabel("impersonal", isNawat, "impersonal");
      const possessorToggleLabel = targetObject.getToggleLabel("possessor", isNawat, "Poseedor");
      const objectToggleLabel = targetObject.getToggleLabel("object", isNawat, "Objeto");
      const verbMeta = targetObject.getParsedVerbForTab("noun", verb);
      const possessorValues = targetObject.POSSESSIVE_PREFIXES.map(entry => entry.value).filter(value => value);
      const activeObjectKey = targetObject.getObjectStateKey({
        groupKey: "locativo-temporal|active|objects",
        tenseValue: "locativo-temporal",
        mode: "noun"
      });
      const activePossessorKey = "noun|locativo-temporal|active|possessor";
      const nonactiveObjectKey = targetObject.getObjectStateKey({
        groupKey: "locativo-temporal|nonactive|objects",
        tenseValue: "locativo-temporal",
        mode: "noun"
      });
      const nonactivePrimaryKey = "noun|locativo-temporal|nonactive|primary";
      const slotBundlesByMode = {
        [targetObject.COMBINED_MODE.active]: targetObject.buildNounObjectSlotToggleStates({
          verbMeta,
          tenseValue: "locativo-temporal",
          baseObjectStateKey: activeObjectKey,
          isNawat,
          combinedMode: targetObject.COMBINED_MODE.active
        }),
        [targetObject.COMBINED_MODE.nonactive]: targetObject.buildNounObjectSlotToggleStates({
          verbMeta,
          tenseValue: "locativo-temporal",
          baseObjectStateKey: nonactiveObjectKey,
          isNawat,
          combinedMode: targetObject.COMBINED_MODE.nonactive
        })
      };
      const resolveStoredPossessor = ({
        stateKey,
        allowedValues,
        fallbackValue = ""
      }) => {
        const allowedSet = new Set([targetObject.OBJECT_TOGGLE_ALL, ...allowedValues]);
        let value = targetObject.getToggleStateValue(targetObject.PossessorToggleState, stateKey);
        if (!allowedSet.has(value)) {
          value = fallbackValue;
        }
        targetObject.setToggleStateValue(targetObject.PossessorToggleState, stateKey, value, {
          syncLock: false
        });
        return value;
      };
      const {
        grid
      } = createObjectSectionGrid(container);
      const sourceColumns = modeFilter == null ? createSourceModeColumns(grid, isNawat) : null;
      const buildPossessorOptions = values => {
        const options = [{
          id: targetObject.OBJECT_TOGGLE_ALL,
          label: allToggleLabel,
          value: ""
        }];
        values.forEach(value => {
          options.push({
            id: value,
            label: value || "Ø",
            value
          });
        });
        return options;
      };
      const buildBlock = ({
        mode
      }) => {
        const isNonactive = mode === targetObject.COMBINED_MODE.nonactive;
        const slotBundle = slotBundlesByMode[mode] || slotBundlesByMode[targetObject.COMBINED_MODE.active];
        const mutableSlotStates = slotBundle.slotStates.map(slot => ({
          ...slot
        }));
        const nonactiveObjectToggleValues = Array.from(targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES).map(value => String(value || "")).filter(Boolean);
        if (isNonactive && nonactiveObjectToggleValues.length) {
          mutableSlotStates.forEach(slotState => {
            slotState.toggleValues = nonactiveObjectToggleValues;
            slotState.options = targetObject.getObjectToggleOptions(slotState.toggleValues, {
              includeAll: true,
              labelForPrefix: targetObject.getNonspecificToggleLabel,
              isNawat
            });
            slotState.optionMap = new Map(slotState.options.map(entry => [entry.id, entry]));
            slotState.showToggle = slotState.toggleValues.length > 1;
            const isActiveValid = slotState.activeId !== undefined && (slotState.toggleValues.includes(slotState.activeId) || slotState.showToggle && slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
            if (!isActiveValid) {
              slotState.activeId = targetObject.getDefaultOutputToggleSelection({
                context: "noun-extra-object",
                values: slotState.toggleValues,
                isAddedSlot: slotState.isAddedSlot
              });
            }
            targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, slotState.activeId, {
              syncLock: false
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
              type: "impersonal"
            }];
          }
          const options = [{
            id: targetObject.OBJECT_TOGGLE_ALL,
            label: allToggleLabel,
            type: "all",
            value: ""
          }];
          possessorValues.forEach(value => {
            options.push({
              id: `pos:${value}`,
              label: value,
              value,
              type: "possessor"
            });
          });
          nonactiveObjectToggleValues.forEach(value => {
            options.push({
              id: `obj:${value}`,
              label: value,
              value,
              type: "object"
            });
          });
          return options;
        };
        const slotStateById = new Map(mutableSlotStates.map(slot => [slot.id, slot]));
        const slotButtonsById = new Map();
        const resolveActiveSlotValue = slotId => slotStateById.get(slotId)?.activeId || "";
        const possessorStateKey = activePossessorKey;
        const possessorToggleValues = possessorValues;
        const defaultPossessor = targetObject.getDefaultOutputToggleSelection({
          context: "noun-possessor",
          values: possessorValues
        });
        let activePossessor = resolveStoredPossessor({
          stateKey: possessorStateKey,
          allowedValues: possessorToggleValues,
          fallbackValue: defaultPossessor
        });
        const nonactivePrimaryOptions = isNonactive ? buildNonactivePrimaryOptions() : [];
        const nonactivePrimaryOptionMap = new Map(nonactivePrimaryOptions.map(option => [option.id, option]));
        let activeNonactivePrimary = targetObject.getToggleStateValue(targetObject.ObjectToggleState, nonactivePrimaryKey);
        if (isNonactive) {
          const hasStoredPrimary = activeNonactivePrimary === targetObject.OBJECT_TOGGLE_ALL || nonactivePrimaryOptionMap.has(activeNonactivePrimary);
          if (!hasStoredPrimary) {
            const firstSpecificNonactivePrimary = nonactivePrimaryOptions.find(option => option.id !== targetObject.OBJECT_TOGGLE_ALL)?.id;
            activeNonactivePrimary = targetObject.getDefaultOutputToggleSelection({
              context: "noun-nonactive-primary",
              values: Array.from(nonactivePrimaryOptionMap.keys()),
              fallbackIds: [firstSpecificNonactivePrimary, targetObject.OBJECT_TOGGLE_ALL]
            });
          }
          targetObject.setToggleStateValue(targetObject.ObjectToggleState, nonactivePrimaryKey, activeNonactivePrimary, {
            syncLock: false
          });
        }
        const resolveNonactivePrimarySelection = selectionId => {
          const option = nonactivePrimaryOptionMap.get(selectionId);
          if (!option) {
            return {
              objectPrefix: "",
              possessorPrefix: ""
            };
          }
          if (option.type === "possessor") {
            return {
              objectPrefix: targetObject.POSSESSIVE_TO_OBJECT_PREFIX[option.value] || "",
              possessorPrefix: option.value || ""
            };
          }
          if (option.type === "object") {
            return {
              objectPrefix: option.value || "",
              possessorPrefix: ""
            };
          }
          return {
            objectPrefix: "",
            possessorPrefix: ""
          };
        };
        const tenseBlock = targetObject.document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${mode}-locativo-temporal`;
        const tenseTitle = targetObject.document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = targetObject.document.createElement("span");
        titleLabel.className = "tense-block__label";
        const locativoLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS["locativo-temporal"], isNawat, "locativo/temporal");
        const locativoSourceMode = targetObject.getNominalSourceModeForTense("locativo-temporal", {
          blockMode: mode
        });
        const locativoSourceTenseLabel = targetObject.getNominalSourceTenseLabel("locativo-temporal", {
          isNawat
        });
        titleLabel.textContent = targetObject.buildNominalSourceTaggedLabel(locativoLabel, locativoSourceMode, isNawat, {
          sourceTenseLabel: locativoSourceTenseLabel
        });
        tenseTitle.appendChild(titleLabel);
        const titleControls = targetObject.document.createElement("div");
        titleControls.className = "tense-block__controls tense-block__controls--stacked";
        const list = targetObject.document.createElement("div");
        list.className = "conjugation-list";
        const resolveLocativoBlockPaletteSignature = () => {
          if (isNonactive) {
            const hasMixedObjectSlot = mutableSlotStates.filter(slotState => slotState.id !== "object").some(slotState => slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
            if (hasMixedObjectSlot || activeNonactivePrimary === targetObject.OBJECT_TOGGLE_ALL) {
              return "mixed";
            }
            const primarySelection = resolveNonactivePrimarySelection(activeNonactivePrimary);
            return targetObject.buildBlockComboPaletteSignature({
              mode: "noun",
              valency: Math.max(1, mutableSlotStates.length + 1),
              objectPrefix: primarySelection.objectPrefix,
              indirectObjectMarker: resolveActiveSlotValue("object2"),
              thirdObjectMarker: resolveActiveSlotValue("object3"),
              possessorPrefix: primarySelection.possessorPrefix
            });
          }
          const hasMixedObjectSlot = mutableSlotStates.some(slotState => slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
          if (hasMixedObjectSlot || activePossessor === targetObject.OBJECT_TOGGLE_ALL) {
            return "mixed";
          }
          const objectPrefix = resolveActiveSlotValue("object");
          return targetObject.buildBlockComboPaletteSignature({
            mode: "noun",
            valency: Math.max(1, mutableSlotStates.length + 1),
            objectPrefix,
            indirectObjectMarker: resolveActiveSlotValue("object2"),
            thirdObjectMarker: resolveActiveSlotValue("object3"),
            possessorPrefix: activePossessor || ""
          });
        };
        const updateLocativoBlockPalette = () => {
          targetObject.applyTenseBlockComboPalette(tenseBlock, resolveLocativoBlockPaletteSignature());
        };
        const TOGGLE_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--viable", "object-toggle-button--masked", "object-toggle-button--impossible"];
        const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--selected-viable", "object-toggle-button--selected-masked", "object-toggle-button--selected-impossible"];
        const clearToggleAvailabilityClasses = button => {
          if (!button) {
            return;
          }
          TOGGLE_AVAILABILITY_CLASS_NAMES.forEach(className => {
            button.classList.remove(className);
          });
          TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach(className => {
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
          includeObjectSlot = !isNonactive
        } = {}) => mutableSlotStates.filter(slotState => includeObjectSlot || slotState.id !== "object").map(slotState => {
          const hasOverride = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id);
          const overrideId = hasOverride ? slotOverrides[slotState.id] : slotState.activeId;
          const values = overrideId === targetObject.OBJECT_TOGGLE_ALL ? slotState.toggleValues : [overrideId];
          return {
            id: slotState.id,
            values: values.length ? values : [""]
          };
        });
        const getActivePossessorSelections = (possessorId = activePossessor) => {
          if (possessorId === targetObject.OBJECT_TOGGLE_ALL) {
            return possessorToggleValues.length ? possessorToggleValues : [defaultPossessor];
          }
          if (possessorToggleValues.includes(possessorId)) {
            return [possessorId];
          }
          return [defaultPossessor];
        };
        const getNonactivePrimarySelectionIds = (selectionId = activeNonactivePrimary) => {
          const allPrimarySelectionIds = nonactivePrimaryOptions.filter(option => option.id !== targetObject.OBJECT_TOGGLE_ALL).map(option => option.id);
          if (selectionId === targetObject.OBJECT_TOGGLE_ALL) {
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
          possessorPrefix = ""
        }) => {
          const cacheKey = [objectPrefix || "", indirectObjectMarker || "", thirdObjectMarker || "", possessorPrefix || ""].join("|");
          const cached = locativoCombinationEvaluationCache.get(cacheKey);
          if (cached) {
            return cached;
          }
          const result = targetObject.getLocativoTemporalResult({
            rawVerb: verb,
            verbMeta,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            possessivePrefix: possessorPrefix,
            combinedMode: mode
          }) || {};
          const maskState = targetObject.getLocativoTemporalMaskState({
            result,
            objectPrefix
          });
          const evaluation = targetObject.buildConjugationEvaluationRecord({
            result,
            maskState
          });
          locativoCombinationEvaluationCache.set(cacheKey, evaluation);
          return evaluation;
        };
        const resolveActiveToggleAvailabilityState = ({
          possessorSelections,
          objectSlotModels
        }) => {
          const memoKey = ["active", possessorSelections.join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.values || []).join(",")}`).join(";")].join("|");
          if (locativoAvailabilityMemo.has(memoKey)) {
            return locativoAvailabilityMemo.get(memoKey);
          }
          const summary = targetObject.createToggleAvailabilityRealizationSummary();
          targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
            const objectPrefix = selectedBySlot.object || "";
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            possessorSelections.forEach(possessorPrefix => {
              const evaluation = evaluateLocativoCombinationState({
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                possessorPrefix
              });
              targetObject.recordToggleAvailabilityRealization(summary, evaluation);
            });
          });
          const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
          locativoAvailabilityMemo.set(memoKey, resolvedRecord);
          return resolvedRecord;
        };
        const resolveNonactiveToggleAvailabilityState = ({
          primarySelectionIds,
          objectSlotModels
        }) => {
          const memoKey = ["nonactive", primarySelectionIds.join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.values || []).join(",")}`).join(";")].join("|");
          if (locativoAvailabilityMemo.has(memoKey)) {
            return locativoAvailabilityMemo.get(memoKey);
          }
          const summary = targetObject.createToggleAvailabilityRealizationSummary();
          primarySelectionIds.forEach(selectionId => {
            const selection = resolveNonactivePrimarySelection(selectionId);
            targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
              const indirectObjectMarker = selectedBySlot.object2 || "";
              const thirdObjectMarker = selectedBySlot.object3 || "";
              const evaluation = evaluateLocativoCombinationState({
                objectPrefix: selection.objectPrefix || "",
                indirectObjectMarker,
                thirdObjectMarker,
                possessorPrefix: selection.possessorPrefix || ""
              });
              targetObject.recordToggleAvailabilityRealization(summary, evaluation);
            });
          });
          const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
          locativoAvailabilityMemo.set(memoKey, resolvedRecord);
          return resolvedRecord;
        };
        let primaryButtons = new Map();
        let possessorButtons = new Map();
        const clearLocativoToggleAvailabilityStyling = () => {
          possessorButtons.forEach(button => clearToggleAvailabilityClasses(button));
          primaryButtons.forEach(button => clearToggleAvailabilityClasses(button));
          slotButtonsById.forEach(slotButtons => {
            slotButtons.forEach(button => clearToggleAvailabilityClasses(button));
          });
        };
        const updateLocativoToggleOptionAvailabilityStyling = () => {
          clearLocativoToggleAvailabilityStyling();
          if (!verb) {
            return;
          }
          if (isNonactive) {
            const activePrimarySelections = getNonactivePrimarySelectionIds(activeNonactivePrimary);
            const activeObjectSlotModels = buildLocativoObjectSlotModelsForState({
              includeObjectSlot: false
            });
            if (primaryButtons.size) {
              primaryButtons.forEach((button, selectionId) => {
                const primarySelectionIds = getNonactivePrimarySelectionIds(selectionId);
                const availabilityRecord = resolveNonactiveToggleAvailabilityState({
                  primarySelectionIds,
                  objectSlotModels: activeObjectSlotModels
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, selectionId === activeNonactivePrimary);
              });
            }
            mutableSlotStates.filter(slotState => slotState.id !== "object").forEach(slotState => {
              const slotButtons = slotButtonsById.get(slotState.id);
              if (!slotButtons || !slotButtons.size) {
                return;
              }
              slotButtons.forEach((button, optionId) => {
                const objectSlotModels = buildLocativoObjectSlotModelsForState({
                  slotOverrides: {
                    [slotState.id]: optionId
                  },
                  includeObjectSlot: false
                });
                const availabilityRecord = resolveNonactiveToggleAvailabilityState({
                  primarySelectionIds: activePrimarySelections,
                  objectSlotModels
                });
                const availabilityState = availabilityRecord.availabilityState;
                applyToggleAvailabilityClass(button, availabilityState);
                applySelectedAvailabilityClass(button, availabilityState, optionId === slotState.activeId);
              });
            });
            return;
          }
          const activePossessorSelections = getActivePossessorSelections(activePossessor);
          const activeObjectSlotModels = buildLocativoObjectSlotModelsForState({
            includeObjectSlot: true
          });
          if (possessorButtons.size) {
            possessorButtons.forEach((button, possessorId) => {
              const possessorSelections = getActivePossessorSelections(possessorId);
              const availabilityRecord = resolveActiveToggleAvailabilityState({
                possessorSelections,
                objectSlotModels: activeObjectSlotModels
              });
              const availabilityState = availabilityRecord.availabilityState;
              applyToggleAvailabilityClass(button, availabilityState);
              applySelectedAvailabilityClass(button, availabilityState, possessorId === activePossessor);
            });
          }
          mutableSlotStates.forEach(slotState => {
            const slotButtons = slotButtonsById.get(slotState.id);
            if (!slotButtons || !slotButtons.size) {
              return;
            }
            slotButtons.forEach((button, optionId) => {
              const objectSlotModels = buildLocativoObjectSlotModelsForState({
                slotOverrides: {
                  [slotState.id]: optionId
                },
                includeObjectSlot: true
              });
              const availabilityRecord = resolveActiveToggleAvailabilityState({
                possessorSelections: activePossessorSelections,
                objectSlotModels
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
            const placeholder = targetObject.document.createElement("div");
            placeholder.className = "tense-placeholder";
            placeholder.textContent = placeholderText;
            list.appendChild(placeholder);
            updateLocativoBlockPalette();
            updateLocativoToggleOptionAvailabilityStyling();
            return;
          }
          const objectSlotSelectionModels = targetObject.buildNounObjectSlotSelectionModels(mutableSlotStates, {
            includeSlot: slotState => !isNonactive || slotState.id !== "object"
          });
          targetObject.iterateNounObjectSlotSelections(objectSlotSelectionModels, selectedBySlot => {
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            const rowSelections = isNonactive ? (activeNonactivePrimary === targetObject.OBJECT_TOGGLE_ALL ? nonactivePrimaryOptions.filter(option => option.id !== targetObject.OBJECT_TOGGLE_ALL).map(option => option.id) : [activeNonactivePrimary]).map(selectionId => resolveNonactivePrimarySelection(selectionId)) : (activePossessor === targetObject.OBJECT_TOGGLE_ALL ? possessorToggleValues : [activePossessor]).map(possessorPrefix => ({
              objectPrefix: selectedBySlot.object || "",
              possessorPrefix
            }));
            rowSelections.forEach(({
              objectPrefix = "",
              possessorPrefix = ""
            }) => {
              const row = targetObject.document.createElement("div");
              row.className = "conjugation-row";
              targetObject.applyConjugationRowClasses(row, objectPrefix);
              const label = targetObject.document.createElement("div");
              label.className = "conjugation-label";
              const personLabel = targetObject.document.createElement("div");
              personLabel.className = "person-label";
              personLabel.textContent = isNonactive ? possessorPrefix ? targetObject.getPossessorPersonLabel(possessorPrefix, isNawat) : impersonalLabel : targetObject.getPossessorPersonLabel(possessorPrefix, isNawat);
              const personSub = targetObject.document.createElement("div");
              personSub.className = "person-sub";
              const objectMarkers = [objectPrefix, indirectObjectMarker, thirdObjectMarker].filter(Boolean);
              const isDummyImpersonalRow = isNonactive && !possessorPrefix && objectMarkers.length === 0;
              const objectLabel = objectMarkers.length ? objectMarkers.map(prefix => targetObject.getNounObjectComboLabel(prefix, isNawat)).join(" + ") : targetObject.getNounZeroObjectComboLabel(isNawat, {
                isImpersonalDummy: isDummyImpersonalRow
              });
              label.appendChild(personLabel);
              label.appendChild(personSub);
              const value = targetObject.document.createElement("div");
              value.className = "conjugation-value";
              const evaluation = evaluateLocativoCombinationState({
                objectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                possessorPrefix
              });
              const possessorLabel = evaluation.result.possessorPrefix ? targetObject.getPossessorLabel(evaluation.result.possessorPrefix, isNawat) : "";
              personSub.textContent = targetObject.buildPersonSub({
                subjectLabel: "",
                possessorLabel,
                objectLabel
              });
              targetObject.applyConjugationEvaluationPresentation({
                row,
                value,
                evaluation,
                formattedValue: targetObject.formatConjugationDisplay(evaluation.result.result)
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
            const {
              toggle: primaryToggle,
              buttons
            } = buildToggleControl({
              options: nonactivePrimaryOptions.map(option => ({
                id: option.id,
                label: option.label
              })),
              activeId: activeNonactivePrimary,
              ariaLabel: possessorToggleLabel,
              onSelect: id => {
                activeNonactivePrimary = id;
                targetObject.setToggleStateValue(targetObject.ObjectToggleState, nonactivePrimaryKey, id, {
                  syncLock: true
                });
                setToggleActiveState(primaryButtons, id);
                renderRows();
              },
              getActiveId: () => activeNonactivePrimary
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
            const {
              toggle: possessorToggle,
              buttons
            } = buildToggleControl({
              options: possessorOptions,
              activeId: activePossessor,
              ariaLabel: possessorToggleLabel,
              onSelect: id => {
                activePossessor = id;
                targetObject.setToggleStateValue(targetObject.PossessorToggleState, possessorStateKey, id, {
                  syncLock: true
                });
                setToggleActiveState(possessorButtons, id);
                renderRows();
              },
              getActiveId: () => activePossessor
            });
            possessorToggle.dataset.toggleType = "meta";
            possessorToggle.dataset.toggleSlot = "possessor";
            possessorButtons = buttons;
            titleControls.appendChild(possessorToggle);
          }
        }
        const objectSlotsForToggle = isNonactive ? mutableSlotStates.filter(slotState => slotState.id !== "object") : mutableSlotStates;
        const showObjectToggle = objectSlotsForToggle.some(slotState => slotState.showToggle);
        if (showObjectToggle) {
          objectSlotsForToggle.forEach((slotState, index) => {
            if (!slotState.showToggle) {
              return;
            }
            const slotAriaLabel = slotState.id === "object" ? objectToggleLabel : `${targetObject.getValence3PlusSlotRoleLabel(slotState.id, isNawat) || objectToggleLabel} (${index + 1})`;
            const {
              toggle: objectToggle,
              buttons
            } = buildToggleControl({
              options: slotState.options,
              activeId: slotState.activeId,
              ariaLabel: slotAriaLabel,
              onSelect: id => {
                slotState.activeId = id;
                targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, id, {
                  syncLock: true
                });
                const slotButtons = slotButtonsById.get(slotState.id);
                if (slotButtons) {
                  setToggleActiveState(slotButtons, id);
                }
                renderRows();
              },
              getActiveId: () => slotState.activeId
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
      const modesToRender = modeFilter === targetObject.COMBINED_MODE.active ? [targetObject.COMBINED_MODE.active] : modeFilter === targetObject.COMBINED_MODE.nonactive ? [targetObject.COMBINED_MODE.nonactive] : [targetObject.COMBINED_MODE.active, targetObject.COMBINED_MODE.nonactive];
      modesToRender.forEach(mode => {
        const block = buildBlock({
          mode
        });
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
      modeKey = "noun"
    }) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return null;
      }
      const languageSwitch = targetObject.document.getElementById("language");
      const isNawat = languageSwitch && languageSwitch.checked;
      const tenseMode = targetObject.getActiveTenseMode();
      const combinedMode = targetObject.getCombinedMode();
      const sourceScope = targetObject.getVerbSourceScope();
      const nominalSourceModeFilter = sourceScope === targetObject.VERB_SOURCE_SCOPE.active ? targetObject.COMBINED_MODE.active : sourceScope === targetObject.VERB_SOURCE_SCOPE.nonactive ? targetObject.COMBINED_MODE.nonactive : null;
      const isNominalMode = targetObject.isNominalTenseMode(tenseMode);
      const showDualVoiceColumns = isNominalMode && nominalSourceModeFilter === null;
      const modeFilter = isNominalMode ? nominalSourceModeFilter : combinedMode;
      const nominalControlCombinedMode = modeFilter || combinedMode;
      const allowedNounTenses = isNominalMode ? modeFilter ? targetObject.getNounTenseOrderForCombinedMode(modeFilter, tenseMode) : targetObject.getTenseOrderForMode(tenseMode) : targetObject.getNounTenseOrderForCombinedMode(combinedMode, tenseMode);
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState({
        tenseMode
      });
      const selectedTense = tenseValue || selectionState.tenseValue;
      const fallbackTense = allowedNounTenses[0] || "sustantivo-verbal";
      const resolvedTense = allowedNounTenses.includes(selectedTense) ? selectedTense : fallbackTense;
      if (resolvedTense === "locativo-temporal") {
        return {
          container,
          isNawat,
          resolvedTense,
          isLocativoTemporal: true,
          combinedMode,
          modeFilter
        };
      }
      const isInstrumentivo = resolvedTense === "instrumentivo";
      const isCalificativoInstrumentivo = resolvedTense === "calificativo-instrumentivo";
      const isPotencial = targetObject.isPotencialProfileTense(resolvedTense);
      const isPatientivoAdjective = targetObject.isPatientivoAdjectiveTense(resolvedTense);
      const isSubjectlessTense = targetObject.isSubjectlessNominalTense(resolvedTense);
      const isPossessionSplit = targetObject.isNounPossessionSplitTense(resolvedTense);
      const isPotencialHabitual = targetObject.isPotencialHabitualTense(resolvedTense);
      const resolvedNominalControlCombinedMode = targetObject.getResolvedNominalCombinedModeForTense(resolvedTense, nominalControlCombinedMode);
      const prefixes = Array.from(targetObject.SUSTANTIVO_VERBAL_PREFIXES);
      const groupKey = prefixes.join("|");
      const possessorKey = `${modeKey}|${resolvedTense}|${groupKey}|possessor`;
      const ownershipKey = targetObject.getPatientivoOwnershipKey(groupKey);
      const patientivoNominalSuffixKey = targetObject.getPatientivoNominalSuffixKey(groupKey);
      const objectStateKey = targetObject.getObjectStateKey({
        groupKey,
        tenseValue: resolvedTense,
        mode: modeKey
      });
      const subjectKey = `${modeKey}|${resolvedTense}|${groupKey}`;
      const verbMeta = targetObject.getParsedVerbForTab(modeKey, verb);
      const isPotencialHabitualIntransitive = isPotencialHabitual && targetObject.getBaseObjectSlots(verbMeta) <= 0;
      const usePotencialHabitualNonactiveSubjects = isPotencialHabitual && !isPotencialHabitualIntransitive;
      const subjectOptions = usePotencialHabitualNonactiveSubjects ? targetObject.getPotencialHabitualNonactiveSubjectToggleOptions() : targetObject.getSubjectToggleOptions();
      const subjectOptionMap = new Map(subjectOptions.map(entry => [entry.id, entry]));
      const showNonanimateOnly = targetObject.isNonanimateNounTense(resolvedTense) || isPotencialHabitualIntransitive;
      const nounObjectSlotBundle = targetObject.buildNounObjectSlotToggleStates({
        verbMeta,
        tenseValue: resolvedTense,
        baseObjectStateKey: objectStateKey,
        isNawat,
        combinedMode: resolvedNominalControlCombinedMode
      });
      const nounObjectSlotStates = nounObjectSlotBundle.slotStates;
      const primaryObjectSlot = nounObjectSlotStates.find(slot => slot.id === "object") || null;
      const allowedPrefixes = primaryObjectSlot ? primaryObjectSlot.toggleValues : [""];
      let activeObjectPrefix = primaryObjectSlot ? primaryObjectSlot.activeId : "";
      const objectOptions = primaryObjectSlot ? primaryObjectSlot.options : targetObject.getObjectToggleOptions(allowedPrefixes, {
        labelForPrefix: targetObject.getNonspecificToggleLabel
      });
      const objectOptionMap = primaryObjectSlot ? primaryObjectSlot.optionMap : new Map(objectOptions.map(entry => [entry.id, entry]));
      const possessorValues = targetObject.POSSESSIVE_PREFIXES.map(entry => entry.value);
      const possessedInstrumentivoValues = possessorValues.filter(value => value);
      const visiblePossessorValues = isPotencial || isPatientivoAdjective ? [""] : isPossessionSplit ? showDualVoiceColumns ? possessorValues : nominalControlCombinedMode === targetObject.COMBINED_MODE.nonactive ? [""] : possessedInstrumentivoValues : possessorValues;
      let activePossessor = targetObject.getToggleStateValue(targetObject.PossessorToggleState, possessorKey);
      const canSelectAllPossessors = visiblePossessorValues.length > 1;
      if (activePossessor === undefined || activePossessor !== targetObject.OBJECT_TOGGLE_ALL && !visiblePossessorValues.includes(activePossessor) || activePossessor === targetObject.OBJECT_TOGGLE_ALL && !canSelectAllPossessors) {
        if (visiblePossessorValues.includes("")) {
          activePossessor = "";
        } else if (visiblePossessorValues.includes("i")) {
          activePossessor = "i";
        } else {
          activePossessor = visiblePossessorValues[0] ?? "";
        }
      }
      const ownershipOptions = targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => entry.id);
      let activeOwnership = targetObject.getToggleStateValue(targetObject.PatientivoOwnershipState, ownershipKey);
      if (activeOwnership !== null && !ownershipOptions.includes(activeOwnership)) {
        activeOwnership = null;
      }
      const patientivoNominalSuffixOptions = targetObject.PATIENTIVO_NOMINAL_SUFFIX_OPTIONS.map(entry => entry.id);
      let activePatientivoNominalSuffix = targetObject.getPatientivoNominalSuffixToggleValue(targetObject.getToggleStateValue(targetObject.PatientivoNominalSuffixState, patientivoNominalSuffixKey, null));
      if (!patientivoNominalSuffixOptions.includes(activePatientivoNominalSuffix)) {
        activePatientivoNominalSuffix = null;
      }
      if (resolvedTense !== "patientivo") {
        activeOwnership = null;
        activePatientivoNominalSuffix = null;
      }
      const isSubjectOptionAllowed = entry => !showNonanimateOnly || entry.id === targetObject.SUBJECT_TOGGLE_ALL || targetObject.isNonanimateSubject(entry.subjectPrefix, entry.subjectSuffix);
      const showSubjectToggle = !showNonanimateOnly && !isSubjectlessTense;
      const showObjectToggle = nounObjectSlotStates.some(slot => slot.showToggle);
      const hasImplicitAbsolutePossessor = visiblePossessorValues.includes("");
      const explicitPossessorToggleValues = hasImplicitAbsolutePossessor ? visiblePossessorValues.filter(value => value) : visiblePossessorValues;
      const showPossessorToggle = hasImplicitAbsolutePossessor ? explicitPossessorToggleValues.length > 0 : explicitPossessorToggleValues.length > 1;
      const showPatientivoPossessionControls = resolvedTense === "patientivo" && Boolean(activePossessor);
      const defaultSubjectId = targetObject.getDefaultNounSubjectId(subjectOptions);
      let activeSubject = targetObject.getToggleStateValue(targetObject.SubjectToggleState, subjectKey, defaultSubjectId) ?? defaultSubjectId;
      if (!subjectOptionMap.has(activeSubject) || !isSubjectOptionAllowed(subjectOptionMap.get(activeSubject))) {
        activeSubject = defaultSubjectId;
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, activeSubject, {
          syncLock: false
        });
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
        showPatientivoNominalSuffixToggle: resolvedTense === "patientivo"
      };
    }
    function renderNounConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = "",
      modeKey = "noun"
    }) {
      const context = buildNounTabRenderContext({
        verb,
        containerId,
        tenseValue,
        modeKey
      });
      if (!context) {
        return;
      }
      if (context.isLocativoTemporal) {
        renderLocativoTemporalConjugations({
          verb,
          containerId,
          modeFilter: context.modeFilter
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
        showPatientivoNominalSuffixToggle
      } = context;
      let {
        activeObjectPrefix,
        activePossessor,
        activeSubject
      } = context;
      let activePatientivoOwnership = activeOwnership;
      let activePatientivoNominalSuffix = initialPatientivoNominalSuffix;
      const mutableNounObjectSlots = nounObjectSlotStates.map(slot => ({
        ...slot
      }));
      const nounObjectSlotStateById = new Map(mutableNounObjectSlots.map(slot => [slot.id, slot]));
      const nounObjectToggleButtonsById = new Map();
      const getActiveNounSlotValue = slotId => nounObjectSlotStateById.get(slotId)?.activeId || "";
      activeObjectPrefix = getActiveNounSlotValue("object");
      const {
        objSection,
        grid
      } = createObjectSectionGrid(container);
      const sourceColumns = modeFilter == null ? createSourceModeColumns(grid, isNawat) : null;
      const placeholderText = targetObject.getPlaceholderLabel("conjugations", isNawat, "Ingresa un verbo para ver las conjugaciones.");
      const allToggleLabel = targetObject.getToggleLabel("all", isNawat, "todos");
      const subjectToggleLabel = targetObject.getToggleLabel("subject", isNawat, "Sujeto");
      const possessorToggleLabel = targetObject.getToggleLabel("possessor", isNawat, "Poseedor");
      const ownershipToggleLabel = targetObject.getToggleLabel("ownership", isNawat, "Posesion");
      const objectToggleLabel = targetObject.getToggleLabel("object", isNawat, "Objeto");
      const suffixToggleLabel = targetObject.getToggleLabel("suffix", isNawat, "Sufijo");
      const buildNominalSubjectConnectorSubLabel = ({
        evaluation = null,
        selection = null,
        displaySelection = null
      } = {}) => {
        const connector = evaluation?.result?.subjectNumberConnector || evaluation?.result?.nominalClauseFrame?.subject?.numberConnector || null;
        const connectorSurface = connector ? String(connector.displaySurface || connector.surface || "Ø") : String((displaySelection || selection || {}).subjectSuffix || "") || "Ø";
        return `conector ${connectorSurface || "Ø"}`;
      };
      const appendNominalSubjectConnectorSubLabel = (baseLabel = "", connectorLabel = "") => [baseLabel, connectorLabel].filter(Boolean).join(" · ");
      const tenseLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[resolvedTense], isNawat, resolvedTense);
      const resolvedNounBlockMode = (() => {
        if (isPossessionSplit) {
          return null;
        }
        return targetObject.getResolvedNominalCombinedModeForTense(resolvedTense, targetObject.COMBINED_MODE.active);
      })();
      const isPatientivoTense = resolvedTense === "patientivo";
      const hasNounControls = showSubjectToggle || showPossessorToggle || showOwnershipToggle || showPatientivoNominalSuffixToggle || showObjectToggle;
      const useSharedPatientivoControls = isPatientivoTense && hasNounControls;
      const defaultNominalSourceMode = targetObject.getNominalSourceModeForTense(resolvedTense);
      const getPossessorSelectionsForId = (possessorId = activePossessor) => {
        const fallback = visiblePossessorValues[0] ?? "";
        if (possessorId === targetObject.OBJECT_TOGGLE_ALL) {
          return visiblePossessorValues.length ? visiblePossessorValues : [fallback];
        }
        if (visiblePossessorValues.includes(possessorId)) {
          return [possessorId];
        }
        return [fallback];
      };
      const resolveInstrumentivoSourcePlacement = (possessorId = activePossessor) => {
        if (resolvedTense !== "instrumentivo") {
          return defaultNominalSourceMode;
        }
        const possessorSelections = getPossessorSelectionsForId(possessorId);
        const hasPossessed = possessorSelections.some(value => Boolean(value));
        const hasUnpossessed = possessorSelections.some(value => !value);
        if (hasPossessed && hasUnpossessed) {
          return "mixed";
        }
        return hasPossessed ? targetObject.COMBINED_MODE.active : targetObject.COMBINED_MODE.nonactive;
      };
      const patientivoDefaultSourceTenseLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS.presente, isNawat, "presente");
      const patientivoPerfectiveSourceTenseLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS.preterito, isNawat, "pretérito perfecto simple");
      const blockConfigs = isPatientivoTense ? [{
        id: "patientivo-pasivo",
        label: targetObject.getVerbBlockLabel("patientivo-pasivo", isNawat, "patientivo · pasivo/impersonal"),
        patientivoSource: "nonactive",
        sourceMode: targetObject.COMBINED_MODE.nonactive,
        sourceTenseLabel: patientivoDefaultSourceTenseLabel,
        mode: targetObject.COMBINED_MODE.nonactive,
        showControls: false
      }, {
        id: "patientivo-perfectivo",
        label: targetObject.getVerbBlockLabel("patientivo-perfectivo", isNawat, "patientivo · perfectivo"),
        patientivoSource: "perfectivo",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: patientivoPerfectiveSourceTenseLabel,
        mode: targetObject.COMBINED_MODE.active,
        showControls: false
      }, {
        id: "patientivo-imperfectivo",
        label: targetObject.getVerbBlockLabel("patientivo-imperfectivo", isNawat, "patientivo · imperfectivo"),
        patientivoSource: "imperfectivo",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: patientivoDefaultSourceTenseLabel,
        mode: targetObject.COMBINED_MODE.active,
        showControls: false
      }, {
        id: "patientivo-tronco",
        label: targetObject.getVerbBlockLabel("patientivo-tronco", isNawat, "patientivo · raíz verbal"),
        patientivoSource: "tronco-verbal",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: targetObject.getNominalSourceTenseLabel("patientivo", {
          patientivoSource: "tronco-verbal",
          isNawat
        }),
        mode: targetObject.COMBINED_MODE.active,
        showControls: false
      }] : [{
        id: resolvedTense,
        label: tenseLabel,
        patientivoSource: "nonactive",
        sourceMode: resolveInstrumentivoSourcePlacement(),
        sourceTenseLabel: targetObject.getNominalSourceTenseLabel(resolvedTense, {
          isNawat
        }),
        mode: resolvedNounBlockMode,
        showControls: true
      }];
      const visibleBlockConfigs = blockConfigs.filter(entry => modeFilter == null || !entry.mode || entry.mode === modeFilter);
      let toggleButtons = new Map();
      let possessorButtons = new Map();
      let ownershipButtons = new Map();
      let patientivoNominalSuffixButtons = new Map();
      let subjectButtons = new Map();
      const blocks = [];
      const resolveNounBlockPaletteSignature = () => {
        const hasMixedSlotSelection = mutableNounObjectSlots.some(slotState => slotState.activeId === targetObject.OBJECT_TOGGLE_ALL);
        if (hasMixedSlotSelection || activePossessor === targetObject.OBJECT_TOGGLE_ALL) {
          return "mixed";
        }
        const effectiveValency = Math.max(1, mutableNounObjectSlots.length + 1);
        return targetObject.buildBlockComboPaletteSignature({
          mode: "noun",
          valency: effectiveValency,
          objectPrefix: getActiveNounSlotValue("object"),
          indirectObjectMarker: getActiveNounSlotValue("object2"),
          thirdObjectMarker: getActiveNounSlotValue("object3"),
          possessorPrefix: showPossessorToggle ? activePossessor || "" : "",
          ownership: showOwnershipToggle ? activePatientivoOwnership || "" : ""
        });
      };
      const resolveActiveVerbNounRouteSurfaceOverride = ({
        patientivoSource = "",
        selection = {},
        number = "",
        possessorPrefix = "",
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        if (resolvedTense !== "patientivo" || typeof targetObject.getActiveNawatRouteProfile !== "function") {
          return "";
        }
        if (selection?.subjectPrefix || selection?.subjectSuffix || number && number !== "singular" || possessorPrefix || indirectObjectMarker || thirdObjectMarker) {
          return "";
        }
        const activeRoute = targetObject.getActiveNawatRouteProfile();
        const expectedSourceTenseValue = sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
        const expectedSourceCombinedMode = sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
        const activeSourceTenseValue = activeRoute?.sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
        const activeSourceCombinedMode = activeRoute?.sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
        if (!activeRoute || activeRoute.activeRouteTravelSource !== "chip" || !isPatientivoSurfaceRouteProfile(activeRoute) || (activeRoute.patientivoSource || "nonactive") !== (patientivoSource || "nonactive") || (activeRoute.sourceObjectPrefix || "") !== (objectPrefix || "") || activeSourceTenseValue !== expectedSourceTenseValue || activeSourceCombinedMode !== expectedSourceCombinedMode || typeof targetObject.getNawatRouteFiniteSurfaceForm !== "function") {
          return "";
        }
        return targetObject.getNawatRouteFiniteSurfaceForm(activeRoute, {
          sourceVerb: activeRoute.sourceVerb || verb,
          sourceObjectPrefix: activeRoute.sourceObjectPrefix || "",
          routeTarget: activeRoute
        });
      };
      const getDefaultPatientivoSourceTenseValue = (patientivoSource = "") => patientivoSource === "perfectivo" ? "preterito" : "presente";
      const getPatientivoSourceCombinedModeForBranch = (patientivoSource = "") => patientivoSource === "nonactive" ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      const getPatientivoBlockActiveRoute = (patientivoSource = "") => {
        const activeRoute = typeof targetObject.getActiveNawatRouteProfile === "function" ? targetObject.getActiveNawatRouteProfile() : null;
        if (!activeRoute || activeRoute.activeRouteTravelSource !== "chip" || !isPatientivoSurfaceRouteProfile(activeRoute) || (activeRoute.patientivoSource || "nonactive") !== (patientivoSource || "nonactive")) {
          return null;
        }
        return activeRoute;
      };
      const getPatientivoBlockSourceCombinedMode = (patientivoSource = "") => getPatientivoBlockActiveRoute(patientivoSource)?.sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
      const getPatientivoBlockSourceTenseValue = (patientivoSource = "") => getPatientivoBlockActiveRoute(patientivoSource)?.sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
      const getPatientivoSourceRouteKey = ({
        patientivoSource = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        const combinedMode = sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
        const tenseValue = sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
        return getNawatPatientivoRouteSpec({
          sourceCombinedMode: combinedMode,
          sourceTenseValue: tenseValue,
          patientivoSource
        }).routeKey;
      };
      const replacePatientivoRouteSuffix = (surface = "", routeSuffix = "", requestedSuffix = null) => {
        const normalizedRequested = targetObject.normalizePatientivoNominalSuffixSelection(requestedSuffix);
        if (normalizedRequested === null) {
          return surface;
        }
        const normalizedSurface = String(surface || "").trim();
        const normalizedRouteSuffix = String(routeSuffix || "").replace(/^-+/, "");
        const base = normalizedRouteSuffix && normalizedSurface.endsWith(normalizedRouteSuffix) ? normalizedSurface.slice(0, -normalizedRouteSuffix.length) : normalizedSurface;
        return `${base}${normalizedRequested || ""}`;
      };
      const resolveDirectPatientivoSurfaceOverride = ({
        patientivoSource = "",
        selection = {},
        number = "",
        possessorPrefix = "",
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        patientivoNominalSuffix = null,
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        if (resolvedTense !== "patientivo" || !patientivoSource || patientivoSource === "tronco-verbal" || selection?.subjectPrefix || selection?.subjectSuffix || number && number !== "singular" || possessorPrefix || indirectObjectMarker || thirdObjectMarker) {
          return "";
        }
        return resolveDirectPatientivoSurface({
          patientivoSource,
          objectPrefix,
          patientivoNominalSuffix,
          sourceTenseValue,
          sourceCombinedMode
        });
      };
      const resolveDirectPatientivoSurface = ({
        patientivoSource = "",
        objectPrefix = "",
        patientivoNominalSuffix = null,
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        if (!patientivoSource || patientivoSource === "tronco-verbal") {
          return "";
        }
        const selectedSourceCombinedMode = sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
        const selectedSourceTenseValue = sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
        const routeKey = getPatientivoSourceRouteKey({
          patientivoSource,
          sourceTenseValue: selectedSourceTenseValue,
          sourceCombinedMode: selectedSourceCombinedMode
        });
        const routeProfile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeKey) : null;
        const routeVerb = verbMeta?.parseInputVerb || verbMeta?.regexInputVerb || verb;
        if (routeProfile && routeVerb && typeof targetObject.getNawatRouteFiniteSurfaceForm === "function" && typeof targetObject.getNawatRoutePatientivoSurfaceSpec === "function") {
          const routeTarget = {
            ...routeProfile,
            sourceVerb: routeVerb,
            sourceObjectPrefix: objectPrefix || "",
            sourceTenseValue: selectedSourceTenseValue,
            sourceCombinedMode: selectedSourceCombinedMode
          };
          const routeSurface = targetObject.getNawatRouteFiniteSurfaceForm(routeProfile, {
            sourceVerb: routeVerb,
            sourceObjectPrefix: objectPrefix || "",
            routeTarget
          });
          if (routeSurface) {
            const surfaceSpec = targetObject.getNawatRoutePatientivoSurfaceSpec(routeProfile, {
              sourceTenseValue: selectedSourceTenseValue,
              sourceCombinedMode: selectedSourceCombinedMode
            });
            return replacePatientivoRouteSuffix(routeSurface, surfaceSpec?.suffix || "", patientivoNominalSuffix);
          }
        }
        const normalizedSuffix = targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
        const suffix = normalizedSuffix === null ? "t" : normalizedSuffix;
        const isNonactiveSource = selectedSourceCombinedMode === targetObject.COMBINED_MODE.nonactive;
        const sourceResult = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix,
            verb,
            tense: selectedSourceTenseValue,
            derivationMode: isNonactiveSource ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active,
            voiceMode: isNonactiveSource ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active
          }
        }) || {};
        const sourceSurface = Array.isArray(sourceResult.surfaceForms) && sourceResult.surfaceForms.length ? String(sourceResult.surfaceForms[0] || "").trim() : String(sourceResult.result || "").split(/\s*\/\s*/g)[0]?.trim();
        if (!sourceSurface || sourceSurface === "—") {
          return "";
        }
        const stripActiveIaUaFinalA = (surface = "") => {
          const normalized = String(surface || "").trim();
          if (normalized && Array.isArray(targetObject.IA_UA_SUFFIXES) && typeof targetObject.endsWithAny === "function" && targetObject.endsWithAny(normalized, targetObject.IA_UA_SUFFIXES) && normalized.endsWith("a")) {
            return normalized.slice(0, -1);
          }
          return normalized;
        };
        const stem = isNonactiveSource ? sourceSurface.endsWith("wa") ? sourceSurface.slice(0, -2) : sourceSurface : stripActiveIaUaFinalA(sourceSurface);
        return `${stem}${suffix}`;
      };
      const getDirectPatientivoSourceTenseValue = (patientivoSource = "", sourceTenseValue = "") => sourceTenseValue || getDefaultPatientivoSourceTenseValue(patientivoSource);
      const getDirectPatientivoSourceSurface = ({
        patientivoSource = "",
        objectPrefix = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        const selectedSourceCombinedMode = sourceCombinedMode || getPatientivoSourceCombinedModeForBranch(patientivoSource);
        const selectedSourceTenseValue = getDirectPatientivoSourceTenseValue(patientivoSource, sourceTenseValue);
        const isNonactiveSource = selectedSourceCombinedMode === targetObject.COMBINED_MODE.nonactive;
        const routeVerb = verbMeta?.parseInputVerb || verbMeta?.regexInputVerb || verb;
        const routeKey = getPatientivoSourceRouteKey({
          patientivoSource,
          sourceTenseValue: selectedSourceTenseValue,
          sourceCombinedMode: selectedSourceCombinedMode
        });
        const routeProfile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeKey) : null;
        if (routeProfile && routeVerb && typeof targetObject.getNawatRouteSourceSurfaceForm === "function") {
          const routeTarget = {
            ...routeProfile,
            sourceVerb: routeVerb,
            sourceObjectPrefix: objectPrefix,
            sourceTenseValue: selectedSourceTenseValue,
            sourceCombinedMode: selectedSourceCombinedMode
          };
          const routeSurface = targetObject.getNawatRouteSourceSurfaceForm(routeProfile, {
            sourceVerb: routeVerb,
            sourceObjectPrefix: objectPrefix,
            routeTarget
          });
          if (routeSurface) {
            return routeSurface;
          }
        }
        const presentResult = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix,
            verb,
            tense: selectedSourceTenseValue,
            derivationMode: isNonactiveSource ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active,
            voiceMode: isNonactiveSource ? targetObject.VOICE_MODE.passive : targetObject.VOICE_MODE.active
          }
        }) || {};
        const sourceSurface = Array.isArray(presentResult.surfaceForms) && presentResult.surfaceForms.length ? String(presentResult.surfaceForms[0] || "").trim() : String(presentResult.result || "").split(/\s*\/\s*/g)[0]?.trim();
        return sourceSurface && sourceSurface !== "—" ? sourceSurface : "";
      };
      const resolvePatientivoOriginSourceObjectPrefix = (patientivoSource = "") => {
        const isActiveSource = patientivoSource !== "nonactive";
        const isTransitiveSource = Number(targetObject.getBaseObjectSlots(verbMeta)) > 0;
        const selectedObjectPrefix = activeObjectPrefix === targetObject.OBJECT_TOGGLE_ALL ? "" : activeObjectPrefix || "";
        if (isActiveSource && isTransitiveSource) {
          return selectedObjectPrefix || "ki";
        }
        return selectedObjectPrefix;
      };
      const getPatientivoBlockOriginText = (entry = {}) => {
        const patientivoSource = entry.patientivoSource || "";
        if (!isPatientivoTense || !patientivoSource || patientivoSource === "tronco-verbal" || !verb) {
          return "";
        }
        const sourceObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(patientivoSource);
        const sourceTenseValue = getPatientivoBlockSourceTenseValue(patientivoSource);
        const sourceCombinedMode = getPatientivoBlockSourceCombinedMode(patientivoSource);
        const sourceTenseLabel = sourceTenseValue && typeof targetObject.getLocalizedLabel === "function" ? targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[sourceTenseValue], isNawat, sourceTenseValue) : sourceTenseValue;
        const sourceSurface = getDirectPatientivoSourceSurface({
          patientivoSource,
          objectPrefix: sourceObjectPrefix,
          sourceTenseValue,
          sourceCombinedMode
        });
        if (!sourceSurface) {
          return "";
        }
        const sourceClassLabel = getNawatPatientivoBranchClassLabel(patientivoSource);
        const sourceLabel = ["V", sourceClassLabel, sourceTenseLabel].filter(Boolean).join(" · ");
        return `origen: ${sourceLabel}: ${sourceSurface}`;
      };
      const getPatientivoBlockSourceTenseOptions = (patientivoSource = "") => {
        if (!patientivoSource || patientivoSource === "tronco-verbal") {
          return [];
        }
        return NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS.filter(option => {
          if (!option || option.sourceCombinedMode !== getPatientivoSourceCombinedModeForBranch(patientivoSource)) {
            return false;
          }
          const routeSpec = getNawatPatientivoRouteSpec({
            sourceTenseValue: option.tenseValue,
            sourceCombinedMode: option.sourceCombinedMode
          });
          if (routeSpec.patientivoSource !== patientivoSource) {
            return false;
          }
          const profile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeSpec.routeKey) : null;
          return profile && isPatientivoSurfaceRouteProfile(profile);
        });
      };
      const activatePatientivoOriginInNoun = ({
        routeKey = "",
        patientivoSource = "",
        sourceVerb = "",
        sourceObjectPrefix = "",
        sourceTenseValue = "",
        sourceCombinedMode = "",
        anchorElement = null
      } = {}) => {
        if (!routeKey || !patientivoSource || !sourceVerb || typeof targetObject.getNawatRouteProfile !== "function" || typeof targetObject.resolveNawatRouteTarget !== "function" || typeof targetObject.setActiveNawatRouteProfile !== "function") {
          return;
        }
        const profile = targetObject.getNawatRouteProfile(routeKey);
        if (!profile) {
          return;
        }
        const update = () => {
          const routeTarget = targetObject.resolveNawatRouteTarget(profile, {
            sourceVerb,
            sourceObjectPrefix,
            sourceTenseValue,
            sourceCombinedMode
          }) || {};
          const patientivoNominalSuffix = typeof targetObject.resolveNawatRoutePatientivoNominalSuffix === "function" ? targetObject.resolveNawatRoutePatientivoNominalSuffix(profile, {
            sourceTenseValue,
            sourceCombinedMode
          }) : "";
          targetObject.setActiveTenseMode(targetObject.TENSE_MODE.sustantivo);
          setActiveNawatPatientivoBranch(patientivoSource);
          if (patientivoNominalSuffix && typeof targetObject.setToggleStateValue === "function" && typeof targetObject.getPatientivoNominalSuffixKey === "function" && typeof targetObject.SUSTANTIVO_VERBAL_PREFIXES !== "undefined" && typeof targetObject.PatientivoNominalSuffixState !== "undefined" && targetObject.PatientivoNominalSuffixState) {
            targetObject.setToggleStateValue(targetObject.PatientivoNominalSuffixState, targetObject.getPatientivoNominalSuffixKey(Array.from(targetObject.SUSTANTIVO_VERBAL_PREFIXES).join("|")), patientivoNominalSuffix, {
              syncLock: true
            });
          }
          targetObject.setActiveNawatRouteProfile(routeKey, {
            ...routeTarget,
            activeRouteTravelSource: "chip",
            sourceVerb,
            sourceObjectPrefix,
            sourceTenseValue,
            sourceCombinedMode,
            activePatientivoBranch: patientivoSource,
            activePatientivoNominalSuffix: patientivoNominalSuffix
          });
          targetObject.mutateConjugationSelectionState({
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            group: targetObject.CONJUGATION_GROUPS.tense,
            tenseValue: "patientivo",
            classFilter: null
          }, {
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            availabilityEntries: []
          });
          if (typeof targetObject.updateTenseModeTabs === "function") {
            targetObject.updateTenseModeTabs();
          }
          if (typeof targetObject.updateCombinedModeTabs === "function") {
            targetObject.updateCombinedModeTabs();
          }
          if (typeof targetObject.syncVerbSourceScopeControl === "function") {
            targetObject.syncVerbSourceScopeControl();
          }
          if (typeof targetObject.renderTenseTabs === "function") {
            targetObject.renderTenseTabs();
          }
          renderActiveConjugations({
            verb: sourceVerb,
            objectPrefix: typeof targetObject.getCurrentObjectPrefix === "function" ? targetObject.getCurrentObjectPrefix() : "",
            tense: "patientivo"
          });
          targetObject.requestAnimationFrame(() => {
            const targetBlock = targetObject.document.querySelector(`[data-nawat-patientivo-source="${patientivoSource}"]`);
            if (!targetBlock) {
              return;
            }
            targetBlock.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            });
            targetBlock.classList.add("tense-block--route-focus");
            targetObject.window.setTimeout(() => {
              targetBlock.classList.remove("tense-block--route-focus");
            }, 900);
          });
        };
        if (anchorElement && typeof targetObject.preserveViewportAnchorPosition === "function") {
          targetObject.preserveViewportAnchorPosition(anchorElement, update);
          return;
        }
        update();
      };
      const createPatientivoBlockOriginPicker = (entry = {}, originText = "") => {
        const patientivoSource = entry.patientivoSource || "";
        const routeVerb = verbMeta?.parseInputVerb || verbMeta?.regexInputVerb || verb;
        const sourceObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(patientivoSource);
        const options = getPatientivoBlockSourceTenseOptions(patientivoSource);
        if (!options.length || !routeVerb || typeof targetObject.setActiveNawatRouteProfile !== "function") {
          return null;
        }
        const activeSourceTenseValue = getPatientivoBlockSourceTenseValue(patientivoSource);
        const activeSourceCombinedMode = getPatientivoBlockSourceCombinedMode(patientivoSource);
        const createActivityOption = (sourceCombinedMode = "") => {
          const routeSpec = getNawatPatientivoRouteSpec({
            sourceTenseValue: activeSourceTenseValue,
            sourceCombinedMode
          });
          const routeProfile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(routeSpec.routeKey) : null;
          if (!routeProfile || !isPatientivoSurfaceRouteProfile(routeProfile)) {
            return null;
          }
          const optionPatientivoSource = routeSpec.patientivoSource || patientivoSource;
          const optionObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(optionPatientivoSource);
          const label = ["V", getNawatPatientivoSourceClassCode(routeSpec.sourceCombinedMode || sourceCombinedMode)].filter(Boolean).join(" · ");
          const sourceSurface = getDirectPatientivoSourceSurface({
            patientivoSource: optionPatientivoSource,
            objectPrefix: optionObjectPrefix,
            sourceTenseValue: routeSpec.sourceTenseValue || activeSourceTenseValue,
            sourceCombinedMode: routeSpec.sourceCombinedMode || sourceCombinedMode
          });
          return {
            label,
            title: sourceSurface ? `origen = actividad inicial: ${label}: ${sourceSurface}` : `origen = actividad inicial: ${label}`,
            active: (routeSpec.sourceCombinedMode || sourceCombinedMode) === activeSourceCombinedMode,
            action: button => {
              activatePatientivoOriginInNoun({
                routeKey: routeSpec.routeKey,
                patientivoSource: optionPatientivoSource,
                anchorElement: button,
                sourceVerb: routeVerb,
                sourceObjectPrefix: optionObjectPrefix,
                sourceTenseValue: routeSpec.sourceTenseValue || activeSourceTenseValue,
                sourceCombinedMode: routeSpec.sourceCombinedMode || sourceCombinedMode
              });
            }
          };
        };
        const activityOptions = [targetObject.COMBINED_MODE.active, targetObject.COMBINED_MODE.nonactive].map(createActivityOption).filter(Boolean);
        const optionSections = [{
          label: "origen · actividad",
          options: activityOptions
        }, ...NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS.map(group => ({
          label: `origen · ${group.label}`,
          options: group.tenseValues.map(tenseValue => options.find(option => option.tenseValue === tenseValue)).filter(Boolean).map(option => {
            const sourceSurface = getDirectPatientivoSourceSurface({
              patientivoSource,
              objectPrefix: sourceObjectPrefix,
              sourceTenseValue: option.tenseValue,
              sourceCombinedMode: option.sourceCombinedMode
            });
            const previewObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(patientivoSource);
            const targetSurface = resolveDirectPatientivoSurface({
              patientivoSource,
              objectPrefix: previewObjectPrefix,
              patientivoNominalSuffix: activePatientivoNominalSuffix,
              sourceTenseValue: option.tenseValue,
              sourceCombinedMode: option.sourceCombinedMode
            });
            const tenseLabel = getNawatPatientivoTenseOptionLabel(option.tenseValue, isNawat);
            const label = sourceSurface ? `${tenseLabel}: ${sourceSurface}` : tenseLabel;
            const title = targetSurface ? `origen = componentes iniciales: ${label} -> resultado actual: ${targetSurface}` : `origen = componentes iniciales: ${label}`;
            const routeKey = getPatientivoSourceRouteKey({
              patientivoSource,
              sourceTenseValue: option.tenseValue,
              sourceCombinedMode: option.sourceCombinedMode
            });
            return {
              label,
              title,
              active: option.tenseValue === activeSourceTenseValue && option.sourceCombinedMode === activeSourceCombinedMode,
              action: button => {
                activatePatientivoOriginInNoun({
                  routeKey,
                  patientivoSource,
                  anchorElement: button,
                  sourceVerb: routeVerb,
                  sourceObjectPrefix,
                  sourceTenseValue: option.tenseValue,
                  sourceCombinedMode: option.sourceCombinedMode
                });
              }
            };
          })
        })).filter(section => section.options.length)].filter(section => section.options.length);
        const labelNode = targetObject.document.createElement("span");
        labelNode.className = "tense-block__origin-label";
        labelNode.textContent = originText;
        return createNawatConversionStationPicker({
          className: "tense-block__origin-picker calc-guidance__conversion-station-picker--source",
          summaryClassName: "tense-block__origin-summary calc-guidance__chip--mode-verbo",
          ariaLabel: `Elegir origen componentes patientivo: ${originText}`,
          title: `origen = componentes iniciales de esta ubicación: ${originText}`,
          summaryNodes: [labelNode],
          sections: optionSections
        });
      };
      const updatePatientivoBlockOrigin = (entry = {}) => {
        if (!entry.originSlot) {
          return;
        }
        const originText = getPatientivoBlockOriginText(entry);
        entry.originSlot.replaceChildren();
        const originPicker = createPatientivoBlockOriginPicker(entry, originText);
        if (originPicker) {
          entry.originSlot.appendChild(originPicker);
        } else if (originText) {
          entry.originSlot.textContent = originText;
        }
        if (originPicker) {
          entry.block?.classList.add("tense-block--has-origin-menu");
        } else {
          entry.block?.classList.remove("tense-block--has-origin-menu");
        }
        entry.originSlot.hidden = !(originText || originPicker);
      };
      const getTroncoDestinationCandidateKey = (candidate = {}) => [candidate.stem || "", candidate.sourceVerb || "", candidate.sourceObjectPrefix || ""].join("\u0000");
      const getUniqueTroncoDestinationCandidates = (candidates = []) => {
        const seen = new Set();
        return (Array.isArray(candidates) ? candidates : []).map(candidate => ({
          stem: String(candidate?.stem || "").trim(),
          sourceVerb: String(candidate?.sourceVerb || "").trim(),
          sourceObjectPrefix: String(candidate?.sourceObjectPrefix || "")
        })).filter(candidate => {
          if (!candidate.stem || !candidate.sourceVerb) {
            return false;
          }
          const key = getTroncoDestinationCandidateKey(candidate);
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        });
      };
      const addTroncoDestinationCandidates = (entry = {}, candidates = []) => {
        if (!entry || entry.patientivoSource !== "tronco-verbal") {
          return;
        }
        entry.destinationCandidates = getUniqueTroncoDestinationCandidates([...(Array.isArray(entry.destinationCandidates) ? entry.destinationCandidates : []), ...(Array.isArray(candidates) ? candidates : [])]);
      };
      const getTroncoDestinationLineSpecs = () => {
        const lineSpecs = new Map();
        NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.forEach(spec => {
          if (!lineSpecs.has(spec.line)) {
            lineSpecs.set(spec.line, spec);
          }
        });
        return Array.from(lineSpecs.values());
      };
      const createTroncoBlockDestinationPicker = (entry = {}) => {
        if (entry.patientivoSource !== "tronco-verbal" || typeof targetObject.activateNawatRouteStation !== "function") {
          return null;
        }
        const candidates = getUniqueTroncoDestinationCandidates(entry.destinationCandidates);
        if (!candidates.length) {
          return null;
        }
        const currentActiveRoute = typeof targetObject.getActiveNawatRouteProfile === "function" ? targetObject.getActiveNawatRouteProfile() : null;
        const activeTroncoRoute = currentActiveRoute && isPatientivoTroncoRouteProfile(currentActiveRoute) ? currentActiveRoute : null;
        const activeSpec = getNawatTroncoConversionSpec({
          routeKey: activeTroncoRoute?.id || "",
          line: activeTroncoRoute?.verbalizer || "",
          tenseValue: activeTroncoRoute?.targetTenseValue || activeTroncoRoute?.nawatTenseValue || ""
        });
        const activeStem = String(activeTroncoRoute?.sourceStem || "").trim();
        const lineSpecs = getTroncoDestinationLineSpecs();
        const tenseOptions = Array.from(new Set(NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.map(spec => spec.tenseValue))).filter(Boolean);
        let selectedCandidate = candidates.find(candidate => candidate.stem === activeStem) || candidates[0];
        let selectedLine = activeSpec.line || lineSpecs[0]?.line || "-ti";
        let selectedTense = activeSpec.tenseValue || tenseOptions[0] || "preterito";
        let selectedStation = activeTroncoRoute?.activeStationKey === "finite-tense" ? "finite-tense" : "verbalizer";
        const destinationSummary = targetObject.document.createElement("span");
        destinationSummary.className = "tense-block__destination-label calc-guidance__conversion-summary-label calc-guidance__conversion-summary-label--flat";
        const picker = targetObject.document.createElement("details");
        picker.className = ["calc-guidance__branch-picker", "calc-guidance__conversion-station-picker", "tense-block__destination-picker", "calc-guidance__conversion-station-picker--destination", "calc-guidance__conversion-station-picker--destination-verbo"].join(" ");
        picker.addEventListener("toggle", () => {
          if (!picker.open) {
            return;
          }
          targetObject.document.querySelectorAll(".calc-guidance__branch-picker[open]").forEach(otherPicker => {
            if (otherPicker !== picker) {
              otherPicker.removeAttribute("open");
            }
          });
        });
        const summary = targetObject.document.createElement("summary");
        summary.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__conversion-station-summary", "tense-block__destination-summary", "calc-guidance__chip--mode-verbo"].join(" ");
        summary.setAttribute("aria-label", "Elegir destino desde tronco verbal");
        summary.title = "destino = resultado final de esta ubicación: V · verbalizador → finito";
        const caret = targetObject.document.createElement("span");
        caret.className = "calc-guidance__picker-caret";
        caret.setAttribute("aria-hidden", "true");
        summary.append(destinationSummary, caret);
        const menu = targetObject.document.createElement("div");
        menu.className = "calc-guidance__branch-menu calc-guidance__route-switch-menu";
        menu.setAttribute("role", "menu");
        const getSelectedSpec = () => getNawatTroncoConversionSpec({
          line: selectedLine,
          tenseValue: selectedTense
        });
        const getStationLabel = () => selectedStation === "finite-tense" ? `finito ${getNawatTroncoTenseShortLabel(selectedTense, isNawat)}` : "verbalizador";
        const refreshSummary = () => {
          destinationSummary.textContent = ["destino: V", selectedCandidate?.stem ? `${selectedCandidate.stem} → ${selectedLine}` : selectedLine, getStationLabel()].filter(Boolean).join(" · ");
          menu.querySelectorAll(".calc-guidance__route-switch-option").forEach(button => {
            const group = button.dataset.troncoDestinationGroup || "";
            const value = button.dataset.troncoDestinationValue || "";
            const active = group === "station" && value === selectedStation || group === "stem" && value === selectedCandidate?.stem || group === "line" && value === selectedLine || group === "tense" && value === selectedTense;
            button.setAttribute("aria-checked", String(active));
            button.classList.toggle("calc-guidance__route-switch-option--active", active);
          });
        };
        const activateSelected = button => {
          const spec = getSelectedSpec();
          targetObject.activateNawatRouteStation(spec.routeKey, selectedStation, {
            render: true,
            anchorElement: button,
            sourceVerb: selectedCandidate.sourceVerb,
            sourceObjectPrefix: selectedCandidate.sourceObjectPrefix,
            sourceStem: selectedCandidate.stem
          });
        };
        const appendSection = (labelText, options) => {
          const section = targetObject.document.createElement("div");
          section.className = "calc-guidance__route-switch-menu-section";
          const label = targetObject.document.createElement("div");
          label.className = "calc-guidance__route-switch-menu-label";
          label.textContent = labelText;
          const optionList = targetObject.document.createElement("div");
          optionList.className = "calc-guidance__route-switch-menu-options";
          options.forEach(option => {
            const button = targetObject.document.createElement("button");
            button.type = "button";
            button.className = "calc-guidance__branch-option calc-guidance__route-switch-option";
            button.dataset.troncoDestinationGroup = option.group;
            button.dataset.troncoDestinationValue = option.value;
            button.setAttribute("role", "menuitemradio");
            button.textContent = option.label;
            button.title = option.title || option.label;
            button.addEventListener("click", event => {
              event.preventDefault();
              event.stopPropagation();
              option.apply();
              refreshSummary();
              activateSelected(button);
              picker.open = false;
            });
            optionList.appendChild(button);
          });
          section.append(label, optionList);
          menu.appendChild(section);
        };
        appendSection("destino · estación", [{
          group: "station",
          value: "verbalizer",
          label: "verbalizador",
          title: "destino = siguiente estación verbalizadora",
          apply: () => {
            selectedStation = "verbalizer";
          }
        }, {
          group: "station",
          value: "finite-tense",
          label: "finito",
          title: "destino = estación finita",
          apply: () => {
            selectedStation = "finite-tense";
          }
        }]);
        appendSection("tronco", candidates.map(candidate => ({
          group: "stem",
          value: candidate.stem,
          label: candidate.stem,
          title: `tronco: ${candidate.stem}`,
          apply: () => {
            selectedCandidate = candidate;
          }
        })));
        appendSection("tipo de verbalización", lineSpecs.map(spec => ({
          group: "line",
          value: spec.line,
          label: spec.line,
          title: `verbalizador: ${spec.line}`,
          apply: () => {
            selectedLine = spec.line;
          }
        })));
        appendSection("tiempo", tenseOptions.map(tenseValue => ({
          group: "tense",
          value: tenseValue,
          label: getNawatTroncoTenseShortLabel(tenseValue, isNawat),
          title: `tiempo: ${getNawatTroncoTenseShortLabel(tenseValue, isNawat)}`,
          apply: () => {
            selectedTense = tenseValue;
            selectedStation = "finite-tense";
          }
        })));
        refreshSummary();
        picker.append(summary, menu);
        return picker;
      };
      const createPatientivoPrelocativeDestinationPicker = (entry = {}) => {
        const patientivoSource = String(entry.patientivoSource || "").trim();
        const sourceTenseValue = getPatientivoBlockSourceTenseValue(patientivoSource);
        const sourceCombinedMode = getPatientivoBlockSourceCombinedMode(patientivoSource);
        const canReachPrelocative = patientivoSource === "imperfectivo" && sourceCombinedMode === targetObject.COMBINED_MODE.active && NAWAT_PRELOCATIVE_PATIENTIVO_SOURCE_TENSES.has(sourceTenseValue) && verb;
        if (!canReachPrelocative) {
          return null;
        }
        const sourceTenseLabel = sourceTenseValue && typeof targetObject.getLocalizedLabel === "function" ? targetObject.getLocalizedLabel(targetObject.TENSE_LABELS[sourceTenseValue], isNawat, sourceTenseValue) : sourceTenseValue;
        const sourceObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(patientivoSource);
        const sourceSurface = getDirectPatientivoSourceSurface({
          patientivoSource,
          objectPrefix: sourceObjectPrefix,
          sourceTenseValue,
          sourceCombinedMode
        });
        const patientivoSurface = resolveDirectPatientivoSurface({
          patientivoSource,
          objectPrefix: sourceObjectPrefix,
          patientivoNominalSuffix: activePatientivoNominalSuffix,
          sourceTenseValue,
          sourceCombinedMode
        });
        const stripPrelocativeAbsolutiveSuffix = (surface = "") => {
          const normalized = String(surface || "").trim();
          return normalized.endsWith("t") ? normalized.slice(0, -1) : normalized;
        };
        const incorporatedRoot = stripPrelocativeAbsolutiveSuffix(patientivoSurface);
        const matrixRoot = "ni";
        const destinationSummary = targetObject.document.createElement("span");
        destinationSummary.className = "tense-block__destination-label calc-guidance__conversion-summary-label calc-guidance__conversion-summary-label--flat";
        destinationSummary.textContent = "destino: V · pre-locativo";
        const focusLocativeLine = button => {
          const update = () => {
            const lineSelectionStore = typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
            if (lineSelectionStore) {
              lineSelectionStore.activeNawatLineId = "locative";
              lineSelectionStore.__NAWAT_ACTIVE_LINE_ID__ = "locative";
              lineSelectionStore.activeNawatLineStationKey = "prelocative";
              lineSelectionStore.activeLocativeSourceVerb = verb;
              lineSelectionStore.activeLocativeSourceTenseValue = sourceTenseValue;
              lineSelectionStore.activeLocativeSourceSurface = sourceSurface;
              lineSelectionStore.activeLocativePatientivoSurface = patientivoSurface;
              lineSelectionStore.activeLocativeIncorporatedRoot = incorporatedRoot;
              lineSelectionStore.activeLocativeMatrixRoot = matrixRoot;
            }
            if (targetObject.window) {
              targetObject.window.__NAWAT_ACTIVE_LINE_ID__ = "locative";
            }
            const appliedToEntrada = typeof targetObject.applyPrelocativeRootsToVerbEntry === "function" ? targetObject.applyPrelocativeRootsToVerbEntry({
              incorporatedRoot,
              matrixRoot
            }) : false;
            if (!appliedToEntrada) {
              renderActiveConjugations({
                verb,
                objectPrefix: typeof targetObject.getCurrentObjectPrefix === "function" ? targetObject.getCurrentObjectPrefix() : "",
                tense: "patientivo"
              });
            }
          };
          if (button && typeof targetObject.preserveViewportAnchorPosition === "function") {
            targetObject.preserveViewportAnchorPosition(button, update);
            return;
          }
          update();
        };
        const originLabel = sourceSurface ? `origen: V · A · ${sourceTenseLabel}: ${sourceSurface}` : `origen: V · A · ${sourceTenseLabel}`;
        const button = targetObject.document.createElement("button");
        button.type = "button";
        button.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__conversion-station-summary", "tense-block__destination-summary", "calc-guidance__chip--mode-verbo", "tense-block__destination-picker", "calc-guidance__conversion-station-picker--destination", "calc-guidance__conversion-station-picker--destination-verbo"].join(" ");
        button.setAttribute("aria-label", `Ir a destino pre-locativo desde ${originLabel}`);
        button.title = `destino = raíz incorporada: ${incorporatedRoot || "—"}; raíz matriz: ${matrixRoot}; ${originLabel}`;
        button.appendChild(destinationSummary);
        button.addEventListener("click", () => {
          focusLocativeLine(button);
        });
        return button;
      };
      const updatePatientivoBlockDestination = (entry = {}) => {
        if (!entry.destinationSlot) {
          return;
        }
        entry.destinationSlot.replaceChildren();
        const destinationPicker = createTroncoBlockDestinationPicker(entry) || createPatientivoPrelocativeDestinationPicker(entry);
        if (destinationPicker) {
          entry.destinationSlot.appendChild(destinationPicker);
          entry.destinationSlot.hidden = false;
          entry.block?.classList.add("tense-block--has-destination-menu");
        } else {
          entry.destinationSlot.hidden = true;
          entry.block?.classList.remove("tense-block--has-destination-menu");
        }
      };
      const updateNounBlockPalettes = () => {
        const signature = resolveNounBlockPaletteSignature();
        blocks.forEach(entry => {
          targetObject.applyTenseBlockComboPalette(entry.block, signature);
        });
      };
      const subjectlessSelection = (() => {
        const thirdSingularSelection = targetObject.getSubjectPersonSelections().find(({
          group,
          selection,
          number
        }) => number === "singular" && group?.id === "third" && selection?.subjectPrefix === "" && selection?.subjectSuffix === "");
        if (thirdSingularSelection) {
          return Object.freeze({
            group: thirdSingularSelection.group || null,
            selection: Object.freeze({
              ...thirdSingularSelection.selection
            }),
            number: thirdSingularSelection.number || ""
          });
        }
        return Object.freeze({
          group: null,
          selection: Object.freeze({
            subjectPrefix: "",
            subjectSuffix: ""
          }),
          number: ""
        });
      })();
      const TOGGLE_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--viable", "object-toggle-button--masked", "object-toggle-button--impossible"];
      const TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES = ["object-toggle-button--selected-viable", "object-toggle-button--selected-masked", "object-toggle-button--selected-impossible"];
      const clearToggleAvailabilityClasses = button => {
        if (!button) {
          return;
        }
        TOGGLE_AVAILABILITY_CLASS_NAMES.forEach(className => {
          button.classList.remove(className);
        });
        TOGGLE_SELECTED_AVAILABILITY_CLASS_NAMES.forEach(className => {
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
        let selections = targetObject.getNominalSubjectSelectionEntries({
          mode: targetObject.getActiveTenseMode(),
          tenseValue: resolvedTense
        });
        if (subjectId !== targetObject.SUBJECT_TOGGLE_ALL) {
          selections = selections.filter(entry => entry.toggleId === subjectId);
        }
        if (showNonanimateOnly) {
          selections = selections.filter(({
            selection
          }) => targetObject.isNonanimateSubject(selection.subjectPrefix, selection.subjectSuffix));
        }
        return selections;
      };
      const resolveInstrumentivoHeaderSourceMeta = () => {
        const possessorSelections = getPossessorSelectionsForId(activePossessor);
        const hasPossessed = possessorSelections.some(value => Boolean(value));
        const hasUnpossessed = possessorSelections.some(value => !value);
        const habitualLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS["presente-habitual"], isNawat, "presente habitual");
        const imperfectoLabel = targetObject.getLocalizedLabel(targetObject.TENSE_LABELS.imperfecto, isNawat, "pretérito imperfecto");
        if (hasPossessed && !hasUnpossessed) {
          return {
            sourceMode: targetObject.COMBINED_MODE.active,
            sourceTenseLabel: imperfectoLabel
          };
        }
        if (hasUnpossessed && !hasPossessed) {
          return {
            sourceMode: targetObject.COMBINED_MODE.nonactive,
            sourceTenseLabel: habitualLabel
          };
        }
        const activeLabel = targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-active"], isNawat, "activo");
        const nonactiveLabel = targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], isNawat, "no activo");
        return {
          sourceMode: `${activeLabel} / ${nonactiveLabel}`,
          sourceTenseLabel: `${habitualLabel} / ${imperfectoLabel}`
        };
      };
      const resolveNounBlockSourceMeta = (entry = {}) => {
        const resolvedSourceMode = entry.sourceMode ?? defaultNominalSourceMode;
        const labelSlotSummary = targetObject.getNounObjectSlotSummary(verbMeta, resolvedTense, {
          combinedMode: resolvedSourceMode
        });
        const labelValency = Number.isFinite(labelSlotSummary?.availableObjectSlots) ? Math.max(1, Number(labelSlotSummary.availableObjectSlots) + 1) : null;
        if (resolvedTense === "instrumentivo") {
          return {
            ...resolveInstrumentivoHeaderSourceMeta(),
            labelValency
          };
        }
        return {
          sourceMode: resolvedSourceMode,
          sourceTenseLabel: entry.sourceTenseLabel || "",
          labelValency
        };
      };
      const resolveNounBlockTitleText = (entry = {}) => {
        const meta = resolveNounBlockSourceMeta(entry);
        if (resolvedTense === "patientivo") {
          const valencyPart = Number.isFinite(meta.labelValency) ? ` · valencia total: ${meta.labelValency}` : "";
          return `${entry.label || ""}${valencyPart}`;
        }
        return targetObject.buildNominalSourceTaggedLabel(entry.label || "", meta.sourceMode, isNawat, {
          sourceTenseLabel: meta.sourceTenseLabel,
          labelValency: meta.labelValency
        });
      };
      const refreshNounBlockTitles = () => {
        blocks.forEach(entry => {
          if (!entry.titleLabel) {
            return;
          }
          entry.titleLabel.textContent = resolveNounBlockTitleText(entry);
        });
      };
      const refreshNounBlockSourcePlacement = () => {
        if (!sourceColumns || resolvedTense !== "instrumentivo") {
          return;
        }
        blocks.forEach(entry => {
          const sourceMode = resolveInstrumentivoSourcePlacement(activePossessor);
          entry.sourceMode = sourceMode;
          sourceColumns.appendBlock(entry.block, sourceMode);
        });
        sourceColumns.finalize();
      };
      const buildNounObjectSlotModelsForState = (slotOverrides = {}) => mutableNounObjectSlots.map(slotState => {
        const hasOverride = Object.prototype.hasOwnProperty.call(slotOverrides, slotState.id);
        const overrideId = hasOverride ? slotOverrides[slotState.id] : slotState.activeId;
        const values = overrideId === targetObject.OBJECT_TOGGLE_ALL ? slotState.toggleValues : [overrideId];
        return {
          id: slotState.id,
          values: values.length ? values : [""]
        };
      });
      const nounAvailabilityPatientivoSources = (() => {
        if (resolvedTense !== "patientivo") {
          return [null];
        }
        const sources = visibleBlockConfigs.map(entry => entry.patientivoSource || "nonactive").filter(Boolean);
        return Array.from(new Set(sources.length ? sources : ["nonactive"]));
      })();
      const nounCombinationEvaluationCache = new Map();
      let nounToggleAvailabilityMemo = new Map();
      const TRONCO_INTERMEDIARY_CONSONANTS = new Set(["k", "ch", "s", "sh", "j", "t"]);
      const stripPatientivoNominalMarker = (surface = "") => {
        const normalized = typeof targetObject.normalizeDerivationStemValue === "function" ? targetObject.normalizeDerivationStemValue(surface) : String(surface || "").trim().toLowerCase();
        if (!normalized) {
          return "";
        }
        if (normalized.endsWith("ti") && normalized.length > 2) {
          return normalized.slice(0, -2);
        }
        if (normalized.endsWith("in") && normalized.length > 2) {
          return normalized.slice(0, -2);
        }
        if (normalized.endsWith("t") && normalized.length > 1) {
          return normalized.slice(0, -1);
        }
        return normalized;
      };
      const hasBareTroncoIntermediaryConsonant = (stem = "") => {
        const letters = typeof targetObject.splitVerbLetters === "function" ? targetObject.splitVerbLetters(stem) : stem.split("");
        const last = letters[letters.length - 1] || "";
        return TRONCO_INTERMEDIARY_CONSONANTS.has(last);
      };
      const hasTroncoIntermediaryConsonant = (surface = "") => hasBareTroncoIntermediaryConsonant(stripPatientivoNominalMarker(surface));
      const getConjugationSurfaceForms = (result = null) => {
        const splitSurfaceText = (surface = "") => String(surface || "").split(/\s*(?:\/|,|\n)\s*/).map(form => form.trim()).filter(Boolean);
        if (Array.isArray(result?.surfaceForms) && result.surfaceForms.length) {
          return result.surfaceForms.flatMap(form => splitSurfaceText(form)).filter(Boolean);
        }
        return splitSurfaceText(result?.result || "");
      };
      const getTroncoConversionStems = (forms = []) => {
        const stems = [];
        forms.forEach(form => {
          const stem = stripPatientivoNominalMarker(form);
          if (!stem || !hasBareTroncoIntermediaryConsonant(stem) || stems.includes(stem)) {
            return;
          }
          stems.push(stem);
        });
        return stems;
      };
      const renderTroncoConversionForms = ({
        value,
        evaluation,
        sourceVerb = "",
        sourceObjectPrefix = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.activateNawatRouteStation !== "function") {
          return;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => list.indexOf(form) === index);
        const conversionStems = getTroncoConversionStems(forms);
        if (!conversionStems.length) {
          return [];
        }
        value.replaceChildren();
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        const surfaceDisplay = forms.join(" / ");
        const groupedSurfaceDisplay = typeof targetObject.formatConjugationDisplay === "function" ? targetObject.formatConjugationDisplay(surfaceDisplay) : surfaceDisplay;
        groupedSurfaceDisplay.split(/\n+/).map(line => line.trim()).filter(Boolean).forEach(line => {
          const lineElement = targetObject.document.createElement("span");
          lineElement.className = "conjugation-conversion-surface-line";
          lineElement.textContent = line;
          surfaceText.appendChild(lineElement);
        });
        value.append(surfaceText);
        return conversionStems;
      };
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
        useReduplicatedSingularSurface = false
      }) => {
        const isAgentivo = resolvedTense === "agentivo";
        const isPatientivo = resolvedTense === "patientivo";
        const resolvedPatientivoSource = isPatientivo ? patientivoSource || "nonactive" : null;
        const resolvedPatientivoSourceTenseValue = isPatientivo ? getPatientivoBlockSourceTenseValue(resolvedPatientivoSource) : "";
        const resolvedPatientivoSourceCombinedMode = isPatientivo ? getPatientivoBlockSourceCombinedMode(resolvedPatientivoSource) : "";
        const normalizedProbeSelection = targetObject.resolveNominalAvailabilityProbeSelection({
          tenseValue: resolvedTense,
          patientivoSource: resolvedPatientivoSource,
          verbMeta,
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker
        });
        const resolvedObjectPrefix = normalizedProbeSelection.objectPrefix;
        const resolvedIndirectObjectMarker = normalizedProbeSelection.indirectObjectMarker;
        const resolvedThirdObjectMarker = normalizedProbeSelection.thirdObjectMarker;
        const ownershipSelections = isPatientivo && possessorPrefix !== "" && (patientivoOwnership === null || patientivoOwnership === undefined || patientivoOwnership === "") ? targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => entry.id) : [patientivoOwnership || targetObject.DEFAULT_PATIENTIVO_OWNERSHIP];
        const resolvedPatientivoNominalSuffix = targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
        const cacheKey = [selection.subjectPrefix || "", selection.subjectSuffix || "", number || "", possessorPrefix || "", resolvedObjectPrefix || "", resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || "", resolvedPatientivoSource || "", resolvedPatientivoSourceTenseValue, resolvedPatientivoSourceCombinedMode, ownershipSelections.join(","), resolvedPatientivoNominalSuffix === null ? "*" : resolvedPatientivoNominalSuffix, useReduplicatedSingularSurface ? "redup" : "plain"].join("|");
        const cached = nounCombinationEvaluationCache.get(cacheKey);
        if (cached) {
          return cached;
        }
        const isPossessed = possessorPrefix !== "";
        let subjectSuffixOverride = "";
        const isAdjectiveMode = targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.adjetivo;
        if (isAdjectiveMode) {
          subjectSuffixOverride = selection?.subjectSuffix || "";
        }
        if ((isAgentivo || isPatientivo) && number === "plural") {
          subjectSuffixOverride = isPossessed ? "p" : "t";
        }
        const evaluateForOwnership = resolvedPatientivoOwnership => {
          let result = {};
          if (isInstrumentivo) {
            const instrumentivoMode = possessorPrefix === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo;
            result = targetObject.getInstrumentivoResult({
              rawVerb: verb,
              verbMeta,
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix: resolvedObjectPrefix,
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              mode: instrumentivoMode,
              possessivePrefix: possessorPrefix
            }) || {};
          } else if (isCalificativoInstrumentivo) {
            result = targetObject.getCalificativoInstrumentivoResult({
              rawVerb: verb,
              verbMeta,
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix: resolvedObjectPrefix,
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              possessivePrefix: possessorPrefix
            }) || {};
          } else {
            const nominalDerivationMode = targetObject.getNominalDerivationModeForTense(tenseValue);
            result = targetObject.getCachedSilentGenerateWord({
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
                patientivoNominalSuffix: resolvedPatientivoNominalSuffix
              }
            }) || {};
            const routeSurfaceOverride = resolveActiveVerbNounRouteSurfaceOverride({
              patientivoSource: resolvedPatientivoSource,
              selection,
              number,
              possessorPrefix,
              objectPrefix: resolvedObjectPrefix,
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              sourceTenseValue: resolvedPatientivoSourceTenseValue,
              sourceCombinedMode: resolvedPatientivoSourceCombinedMode
            });
            if (routeSurfaceOverride) {
              result = {
                ...result,
                result: routeSurfaceOverride,
                surfaceForms: [routeSurfaceOverride]
              };
            } else {
              const presentSurfaceOverride = resolveDirectPatientivoSurfaceOverride({
                patientivoSource: resolvedPatientivoSource,
                selection,
                number,
                possessorPrefix,
                objectPrefix: resolvedObjectPrefix,
                indirectObjectMarker: resolvedIndirectObjectMarker,
                thirdObjectMarker: resolvedThirdObjectMarker,
                patientivoNominalSuffix: resolvedPatientivoNominalSuffix,
                sourceTenseValue: resolvedPatientivoSourceTenseValue,
                sourceCombinedMode: resolvedPatientivoSourceCombinedMode
              });
              if (presentSurfaceOverride) {
                result = {
                  ...result,
                  result: presentSurfaceOverride,
                  surfaceForms: [presentSurfaceOverride]
                };
              }
            }
            if (useReduplicatedSingularSurface && result?.result) {
              const prefixChain = targetObject.buildPrefixedChain({
                subjectPrefix: selection.subjectPrefix,
                possessivePrefix: possessorPrefix,
                objectPrefix: targetObject.composeProjectiveObjectPrefix({
                  objectPrefix: resolvedObjectPrefix,
                  markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                  subjectPrefix: selection.subjectPrefix
                }),
                verb: ""
              });
              result = targetObject.buildReduplicatedConjugationResult(result, {
                prefixChain,
                applyMissingPrefixChain: true
              });
            }
          }
          const maskState = targetObject.getConjugationMaskState({
            result,
            subjectPrefix: selection.subjectPrefix,
            subjectSuffix: selection.subjectSuffix,
            objectPrefix: resolvedObjectPrefix,
            possessivePrefix: possessorPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            derivationType: nounObjectSlotSummary.derivationType,
            comboObjectPrefix: undefined,
            requireDistinctPossessor: isAgentivo || isPatientivo,
            enforceInvalidCombo: !useReduplicatedSingularSurface
          });
          const valence4Violation = mutableNounObjectSlots.length >= 3 && !targetObject.isValidValence4Combo({
            objectPrefix: resolvedObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
            sourceTenseValue: resolvedPatientivoSourceTenseValue,
            sourceCombinedMode: resolvedPatientivoSourceCombinedMode
          });
          return {
            ...targetObject.buildConjugationEvaluationRecord({
              result,
              maskState,
              hasValenceStructureError: valence4Violation
            }),
            normalizedSelection: normalizedProbeSelection
          };
        };
        const evaluations = ownershipSelections.map(ownership => evaluateForOwnership(ownership));
        const visibleEvaluations = evaluations.filter(entry => entry.hasVisibleResult);
        const evaluation = visibleEvaluations.length ? {
          ...targetObject.buildConjugationEvaluationRecord({
            result: {
              ...visibleEvaluations[0].result,
              result: Array.from(new Set(visibleEvaluations.flatMap(entry => Array.isArray(entry.result?.surfaceForms) && entry.result.surfaceForms.length ? entry.result.surfaceForms : String(entry.result?.result || "").split(/\s*\/\s*/g).map(form => form.trim()).filter(Boolean)))).join(" / ")
            }
          }),
          normalizedSelection: visibleEvaluations[0].normalizedSelection || normalizedProbeSelection
        } : evaluations[0] || {
          ...targetObject.buildConjugationEvaluationRecord({
            result: {}
          }),
          normalizedSelection: normalizedProbeSelection
        };
        nounCombinationEvaluationCache.set(cacheKey, evaluation);
        return evaluation;
      };
      const resolveNounToggleAvailabilityState = ({
        subjectSelections,
        possessorSelections,
        objectSlotModels,
        patientivoOwnership = activePatientivoOwnership,
        patientivoNominalSuffix = activePatientivoNominalSuffix
      }) => {
        const memoKey = [subjectSelections.map(({
          selection,
          number
        }) => `${selection.subjectPrefix || ""}:${selection.subjectSuffix || ""}:${number || ""}`).join(","), possessorSelections.join(","), objectSlotModels.map(slotModel => `${slotModel.id}:${(slotModel.values || []).join(",")}`).join(";"), patientivoOwnership || "", targetObject.getPatientivoNominalSuffixCacheToken(patientivoNominalSuffix), nounAvailabilityPatientivoSources.join(",")].join("|");
        if (nounToggleAvailabilityMemo.has(memoKey)) {
          return nounToggleAvailabilityMemo.get(memoKey);
        }
        const summary = targetObject.createToggleAvailabilityRealizationSummary();
        nounAvailabilityPatientivoSources.forEach(source => {
          targetObject.iterateNounObjectSlotSelections(objectSlotModels, selectedBySlot => {
            const objectPrefix = selectedBySlot.object || "";
            const indirectObjectMarker = selectedBySlot.object2 || "";
            const thirdObjectMarker = selectedBySlot.object3 || "";
            subjectSelections.forEach(({
              selection,
              number,
              useReduplicatedSingularSurface
            }) => {
              possessorSelections.forEach(possessorPrefix => {
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
                  useReduplicatedSingularSurface
                });
                targetObject.recordToggleAvailabilityRealization(summary, evaluation);
              });
            });
          });
        });
        const resolvedRecord = targetObject.realizeToggleAvailabilitySummary(summary);
        nounToggleAvailabilityMemo.set(memoKey, resolvedRecord);
        return resolvedRecord;
      };
      const clearNounToggleAvailabilityStyling = () => {
        subjectButtons.forEach(button => clearToggleAvailabilityClasses(button));
        possessorButtons.forEach(button => clearToggleAvailabilityClasses(button));
        ownershipButtons.forEach(button => clearToggleAvailabilityClasses(button));
        patientivoNominalSuffixButtons.forEach(button => {
          clearToggleAvailabilityClasses(button);
          button.disabled = false;
        });
        nounObjectToggleButtonsById.forEach(slotButtons => {
          slotButtons.forEach(button => clearToggleAvailabilityClasses(button));
        });
      };
      const updateNounToggleOptionAvailabilityStyling = () => {
        clearNounToggleAvailabilityStyling();
        if (!verb) {
          return;
        }
        const activeSubjectSelections = getSubjectSelectionsForId(activeSubject);
        const activePossessorSelections = getPossessorSelectionsForId(activePossessor);
        mutableNounObjectSlots.forEach(slotState => {
          const slotButtons = nounObjectToggleButtonsById.get(slotState.id);
          if (!slotButtons || !slotButtons.size) {
            return;
          }
          slotButtons.forEach((button, optionId) => {
            const objectSlotModels = buildNounObjectSlotModelsForState({
              [slotState.id]: optionId
            });
            const availabilityRecord = resolveNounToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              possessorSelections: activePossessorSelections,
              objectSlotModels,
              patientivoOwnership: activePatientivoOwnership
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
              patientivoOwnership: activePatientivoOwnership
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
              patientivoOwnership: activePatientivoOwnership
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
              patientivoOwnership: ownershipId
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, ownershipId === activePatientivoOwnership);
          });
        }
        if (patientivoNominalSuffixButtons.size) {
          const activeObjectSlotModels = buildNounObjectSlotModelsForState();
          patientivoNominalSuffixButtons.forEach((button, suffixId) => {
            const normalizedSuffix = targetObject.normalizePatientivoNominalSuffixSelection(suffixId);
            const availabilityRecord = resolveNounToggleAvailabilityState({
              subjectSelections: activeSubjectSelections,
              possessorSelections: activePossessorSelections,
              objectSlotModels: activeObjectSlotModels,
              patientivoOwnership: activePatientivoOwnership,
              patientivoNominalSuffix: normalizedSuffix
            });
            const availabilityState = availabilityRecord.availabilityState;
            applyToggleAvailabilityClass(button, availabilityState);
            applySelectedAvailabilityClass(button, availabilityState, suffixId === activePatientivoNominalSuffix);
            button.disabled = availabilityState === targetObject.CONJUGATION_AVAILABILITY_STATE.impossible;
          });
        }
      };
      const buildNounTitleControls = () => {
        if (!hasNounControls) {
          return null;
        }
        const titleControls = targetObject.document.createElement("div");
        titleControls.className = "tense-block__controls";
        titleControls.classList.add("tense-block__controls--stacked");
        toggleButtons = new Map();
        possessorButtons = new Map();
        ownershipButtons = new Map();
        patientivoNominalSuffixButtons = new Map();
        subjectButtons = new Map();
        nounObjectToggleButtonsById.clear();
        if (showSubjectToggle) {
          const {
            toggle: subjectToggle,
            buttons
          } = buildToggleControl({
            options: subjectOptions,
            activeId: activeSubject,
            ariaLabel: subjectToggleLabel,
            visibleLabel: useSharedPatientivoControls ? subjectToggleLabel : "",
            onSelect: id => {
              setActiveSubject(id);
            },
            getTitle: entry => entry.title,
            getIsDisabled: entry => !isSubjectOptionAllowed(entry),
            getActiveId: () => activeSubject
          });
          subjectToggle.dataset.toggleType = "subject";
          subjectToggle.dataset.toggleSlot = "subject";
          subjectButtons = buttons;
          titleControls.appendChild(subjectToggle);
        }
        if (showPossessorToggle) {
          const possessorOptions = [{
            id: targetObject.OBJECT_TOGGLE_ALL,
            label: allToggleLabel,
            value: targetObject.OBJECT_TOGGLE_ALL
          }, ...explicitPossessorToggleValues.map(value => ({
            id: value,
            label: value,
            value,
            title: targetObject.getPossessorPersonLabel(value, isNawat)
          }))];
          const {
            toggle: possessorToggle,
            buttons
          } = buildToggleControl({
            options: possessorOptions,
            activeId: activePossessor,
            ariaLabel: possessorToggleLabel,
            visibleLabel: useSharedPatientivoControls ? possessorToggleLabel : "",
            onSelect: id => {
              setActivePossessor(id);
            },
            getTitle: entry => entry.title,
            getActiveId: () => activePossessor,
            allowDeselect: hasImplicitAbsolutePossessor
          });
          possessorToggle.dataset.toggleType = "meta";
          possessorToggle.dataset.toggleSlot = "possessor";
          possessorButtons = buttons;
          titleControls.appendChild(possessorToggle);
        } else {
          activePossessor = hasImplicitAbsolutePossessor ? "" : explicitPossessorToggleValues[0] ?? visiblePossessorValues[0] ?? "";
        }
        if (showOwnershipToggle) {
          const ownershipToggleOptions = targetObject.PATIENTIVO_OWNERSHIP_OPTIONS.map(entry => ({
            ...entry,
            label: entry.id === "zero" ? "Ø" : entry.id
          }));
          targetObject.setToggleStateValue(targetObject.PatientivoOwnershipState, ownershipKey, activePatientivoOwnership, {
            syncLock: false
          });
          const {
            toggle: ownershipToggle,
            buttons
          } = buildToggleControl({
            options: ownershipToggleOptions,
            activeId: activePatientivoOwnership,
            ariaLabel: ownershipToggleLabel,
            visibleLabel: useSharedPatientivoControls ? ownershipToggleLabel : "",
            onSelect: id => {
              setActivePatientivoOwnership(id);
            },
            getTitle: entry => targetObject.getLocalizedLabel(targetObject.PATIENTIVO_OWNERSHIP_LABELS[entry.id], isNawat, entry.title || ""),
            getActiveId: () => activePatientivoOwnership,
            stacked: false,
            toggleClassName: "object-toggle--ownership-corner",
            allowDeselect: true
          });
          ownershipToggle.dataset.toggleType = "meta";
          ownershipToggle.dataset.toggleSlot = "ownership";
          ownershipButtons = buttons;
          titleControls.appendChild(ownershipToggle);
        }
        if (showPatientivoNominalSuffixToggle) {
          const patientivoNominalSuffixToggleOptions = targetObject.PATIENTIVO_NOMINAL_SUFFIX_OPTIONS.map(entry => ({
            ...entry
          }));
          const {
            toggle: patientivoNominalSuffixToggle,
            buttons
          } = buildToggleControl({
            options: patientivoNominalSuffixToggleOptions,
            activeId: activePatientivoNominalSuffix,
            ariaLabel: suffixToggleLabel,
            visibleLabel: useSharedPatientivoControls ? suffixToggleLabel : "",
            onSelect: id => {
              setActivePatientivoNominalSuffix(id);
            },
            getTitle: entry => entry.title,
            getActiveId: () => activePatientivoNominalSuffix,
            stacked: false,
            toggleClassName: "object-toggle--patientivo-suffix-corner",
            allowDeselect: true
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
            const slotAriaLabel = slotState.id === "object" ? objectToggleLabel : `${targetObject.getValence3PlusSlotRoleLabel(slotState.id, isNawat) || objectToggleLabel} (${index + 1})`;
            const {
              toggle: objectToggle,
              buttons
            } = buildToggleControl({
              options: slotState.options,
              activeId: slotState.activeId,
              ariaLabel: slotAriaLabel,
              visibleLabel: useSharedPatientivoControls ? slotAriaLabel : "",
              onSelect: id => {
                setActiveObjectSlot(slotState.id, id);
              },
              getActiveId: () => slotState.activeId
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
        const controlsBlock = targetObject.document.createElement("div");
        controlsBlock.className = "tense-block tense-block--noun-shared-controls";
        const controlsTitle = targetObject.document.createElement("div");
        controlsTitle.className = "tense-block__title";
        const controlsLabel = targetObject.document.createElement("span");
        controlsLabel.className = "tense-block__label";
        controlsLabel.textContent = targetObject.getToggleLabel("controls", isNawat, "Controles");
        controlsTitle.appendChild(controlsLabel);
        const controls = buildNounTitleControls();
        if (controls) {
          controls.querySelectorAll(".object-toggle--ownership-corner, .object-toggle--patientivo-suffix-corner").forEach(control => {
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
        showControls
      }) => {
        const tenseBlock = targetObject.document.createElement("div");
        tenseBlock.className = "tense-block";
        tenseBlock.dataset.tenseBlock = `${activeObjectPrefix || "intrans"}-${id}`;
        if (isPatientivoTense && patientivoSource) {
          tenseBlock.dataset.nawatPatientivoSource = patientivoSource;
        }
        const tenseTitle = targetObject.document.createElement("div");
        tenseTitle.className = "tense-block__title";
        const titleLabel = targetObject.document.createElement("span");
        titleLabel.className = "tense-block__label";
        titleLabel.textContent = resolveNounBlockTitleText({
          label,
          sourceMode,
          sourceTenseLabel
        });
        tenseTitle.appendChild(titleLabel);
        const shouldRenderControls = !useSharedPatientivoControls && showControls && hasNounControls;
        if (shouldRenderControls) {
          const titleControls = buildNounTitleControls();
          if (titleControls) {
            tenseTitle.appendChild(titleControls);
          }
        }
        const originSlot = targetObject.document.createElement("div");
        originSlot.className = "tense-block__origin";
        originSlot.hidden = true;
        if (isPatientivoTense && patientivoSource) {
          tenseTitle.appendChild(originSlot);
        }
        const destinationSlot = targetObject.document.createElement("div");
        destinationSlot.className = "tense-block__destination";
        destinationSlot.hidden = true;
        if (isPatientivoTense && (patientivoSource === "tronco-verbal" || patientivoSource === "perfectivo" || patientivoSource === "imperfectivo")) {
          tenseTitle.appendChild(destinationSlot);
        }
        tenseBlock.appendChild(tenseTitle);
        const list = targetObject.document.createElement("div");
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
          originSlot,
          destinationSlot,
          destinationCandidates: []
        });
        updatePatientivoBlockOrigin(blocks[blocks.length - 1]);
        updatePatientivoBlockDestination(blocks[blocks.length - 1]);
        updateNounBlockPalettes();
      };
      const updateSectionCategory = prefix => {
        targetObject.applyObjectSectionCategory(objSection, prefix);
      };
      const getTroncoDestinationSourceVerb = () => verbMeta?.parseInputVerb || verbMeta?.regexInputVerb || resolveRenderableVerbValue(verb) || verb;
      const renderRowsForList = (entry = {}) => {
        const targetList = entry.list;
        const patientivoSource = entry.patientivoSource;
        entry.destinationCandidates = [];
        targetList.innerHTML = "";
        if (!verb) {
          const placeholder = targetObject.document.createElement("div");
          placeholder.className = "tense-placeholder";
          placeholder.textContent = placeholderText;
          targetList.appendChild(placeholder);
          return;
        }
        const selections = getSubjectSelectionsForId(activeSubject);
        const objectSlotSelectionModels = buildNounObjectSlotModelsForState();
        const possessorSelections = getPossessorSelectionsForId(activePossessor);
        targetObject.iterateNounObjectSlotSelections(objectSlotSelectionModels, selectedBySlot => {
          const objectPrefix = selectedBySlot.object || "";
          const indirectObjectMarker = selectedBySlot.object2 || "";
          const thirdObjectMarker = selectedBySlot.object3 || "";
          selections.forEach(subjectEntry => {
            const {
              group,
              selection,
              displaySelection = selection,
              displayPersonSubLabel = "",
              number,
              useReduplicatedSingularSurface = false
            } = subjectEntry;
            possessorSelections.forEach(possessorPrefix => {
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
                useReduplicatedSingularSurface
              });
              const normalizedSelection = evaluation.normalizedSelection || {};
              const displayObjectPrefix = normalizedSelection.objectPrefix ?? objectPrefix;
              const displayIndirectObjectMarker = normalizedSelection.indirectObjectMarker ?? indirectObjectMarker;
              const displayThirdObjectMarker = normalizedSelection.thirdObjectMarker ?? thirdObjectMarker;
              const row = targetObject.document.createElement("div");
              row.className = "conjugation-row";
              targetObject.applyConjugationRowClasses(row, displayObjectPrefix);
              row.dataset.objectPrefix = displayObjectPrefix;
              row.dataset.indirectObjectPrefix = displayIndirectObjectMarker;
              row.dataset.thirdObjectPrefix = displayThirdObjectMarker;
              const label = targetObject.document.createElement("div");
              label.className = "conjugation-label";
              const personLabel = targetObject.document.createElement("div");
              personLabel.className = "person-label";
              personLabel.textContent = displaySelection ? targetObject.getSubjectPersonLabel(group, displaySelection, isNawat) : "";
              const personSub = targetObject.document.createElement("div");
              personSub.className = "person-sub";
              const basePersonSub = displayPersonSubLabel ? targetObject.getLocalizedLabel(displayPersonSubLabel, isNawat, "") : displaySelection ? targetObject.getSubjectSubLabel(displaySelection, {
                isNawat,
                mode: "noun",
                tenseValue: resolvedTense
              }) : "";
              const objectMarkers = [displayObjectPrefix, displayIndirectObjectMarker, displayThirdObjectMarker].filter(Boolean);
              const suppressZeroObjectLabel = targetObject.isPotencialProfileTense(resolvedTense);
              const isDummyImpersonalRow = combinedMode === targetObject.COMBINED_MODE.nonactive && isSubjectlessTense && !selection.subjectPrefix && !selection.subjectSuffix && !possessorPrefix && objectMarkers.length === 0;
              const objectLabel = objectMarkers.length ? objectMarkers.map(prefix => targetObject.getNounObjectComboLabel(prefix, isNawat)).join(" + ") : suppressZeroObjectLabel ? "" : targetObject.getNounZeroObjectComboLabel(isNawat, {
                isImpersonalDummy: isDummyImpersonalRow
              });
              let possessorLabel = targetObject.getPossessorLabel(possessorPrefix, isNawat);
              label.appendChild(personLabel);
              label.appendChild(personSub);
              const value = targetObject.document.createElement("div");
              value.className = "conjugation-value";
              const subjectConnectorLabel = buildNominalSubjectConnectorSubLabel({
                evaluation,
                selection: normalizedSelection,
                displaySelection
              });
              personSub.textContent = targetObject.buildPersonSub({
                subjectLabel: appendNominalSubjectConnectorSubLabel(basePersonSub, subjectConnectorLabel),
                possessorLabel,
                objectLabel
              });
              targetObject.applyConjugationEvaluationPresentation({
                row,
                value,
                evaluation,
                formattedValue: targetObject.formatConjugationDisplay(evaluation.result.result)
              });
              row.appendChild(label);
              row.appendChild(value);
              if (patientivoSource === "tronco-verbal") {
                const troncoSourceVerb = getTroncoDestinationSourceVerb();
                const conversionStems = renderTroncoConversionForms({
                  value,
                  evaluation,
                  sourceVerb: troncoSourceVerb,
                  sourceObjectPrefix: displayObjectPrefix || ""
                });
                addTroncoDestinationCandidates(entry, (conversionStems || []).map(stem => ({
                  stem,
                  sourceVerb: troncoSourceVerb,
                  sourceObjectPrefix: displayObjectPrefix || ""
                })));
                if (value.classList.contains("conjugation-value--conversion-picker")) {
                  targetList.closest(".tense-block")?.classList.add("tense-block--has-conversion-menu");
                }
              }
              targetList.appendChild(row);
            });
          });
        });
      };
      const renderRows = () => {
        nounCombinationEvaluationCache.clear();
        nounToggleAvailabilityMemo = new Map();
        blocks.forEach(entry => {
          renderRowsForList(entry);
          updatePatientivoBlockOrigin(entry);
          updatePatientivoBlockDestination(entry);
        });
        updateNounToggleOptionAvailabilityStyling();
      };
      const setActiveObjectSlot = (slotId, prefix) => {
        const slotState = nounObjectSlotStateById.get(slotId);
        if (!slotState || !slotState.optionMap.has(prefix)) {
          return;
        }
        slotState.activeId = prefix;
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, slotState.stateKey, prefix, {
          syncLock: true
        });
        const slotButtons = nounObjectToggleButtonsById.get(slotId);
        if (slotButtons) {
          setToggleActiveState(slotButtons, prefix);
        }
        if (slotId === "object") {
          activeObjectPrefix = prefix;
          blocks.forEach(entry => {
            if (entry.titleLabel) {
              entry.titleLabel.textContent = resolveNounBlockTitleText(entry);
            }
            entry.block.dataset.tenseBlock = `${prefix}-${entry.blockKey}`;
          });
          updateSectionCategory(prefix === targetObject.OBJECT_TOGGLE_ALL ? "" : prefix);
          if (toggleButtons.size) {
            setToggleActiveState(toggleButtons, prefix);
          }
        }
        updateNounBlockPalettes();
        renderRows();
      };
      const setActivePrefix = prefix => {
        setActiveObjectSlot("object", prefix);
      };
      const setActivePossessor = prefix => {
        const hadPossessor = Boolean(activePossessor);
        const resolvedPrefix = typeof prefix === "string" ? prefix : "";
        activePossessor = resolvedPrefix;
        targetObject.setToggleStateValue(targetObject.PossessorToggleState, possessorKey, resolvedPrefix, {
          syncLock: true
        });
        const hasPossessor = Boolean(resolvedPrefix);
        if (resolvedTense === "patientivo" && hadPossessor !== hasPossessor) {
          renderNounConjugations({
            verb,
            containerId,
            tenseValue: resolvedTense,
            modeKey
          });
          return;
        }
        possessorButtons.forEach((button, key) => {
          const isActive = key === resolvedPrefix;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
        refreshNounBlockTitles();
        refreshNounBlockSourcePlacement();
        updateNounBlockPalettes();
        renderRows();
      };
      const setActivePatientivoOwnership = ownership => {
        activePatientivoOwnership = ownership;
        targetObject.setToggleStateValue(targetObject.PatientivoOwnershipState, ownershipKey, ownership, {
          syncLock: true
        });
        setToggleActiveState(ownershipButtons, ownership);
        updateNounBlockPalettes();
        renderRows();
      };
      const setActivePatientivoNominalSuffix = suffix => {
        activePatientivoNominalSuffix = targetObject.getPatientivoNominalSuffixToggleValue(suffix);
        targetObject.setToggleStateValue(targetObject.PatientivoNominalSuffixState, patientivoNominalSuffixKey, activePatientivoNominalSuffix, {
          syncLock: true
        });
        setToggleActiveState(patientivoNominalSuffixButtons, activePatientivoNominalSuffix);
        renderRows();
      };
      const setActiveSubject = subjectId => {
        activeSubject = subjectId;
        targetObject.setToggleStateValue(targetObject.SubjectToggleState, subjectKey, subjectId, {
          syncLock: true
        });
        subjectButtons.forEach((button, key) => {
          const isActive = key === subjectId;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
        renderRows();
      };
      visibleBlockConfigs.forEach(entry => createTenseBlock(entry));
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
    function buildAdjectiveTabRenderContext({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      return buildNounTabRenderContext({
        verb,
        containerId,
        tenseValue,
        modeKey: "adjetivo"
      });
    }
    function renderAdjectiveConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      renderNounConjugations({
        verb,
        containerId,
        tenseValue,
        modeKey: "adjetivo"
      });
    }
    function buildAdverbTabRenderContext({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      return buildNounTabRenderContext({
        verb,
        containerId,
        tenseValue,
        modeKey: "adverbio"
      });
    }
    function renderAdverbConjugations({
      verb,
      containerId = "all-tense-conjugations",
      tenseValue = ""
    }) {
      renderNounConjugations({
        verb,
        containerId,
        tenseValue,
        modeKey: "adverbio"
      });
    }
    function renderAllTenseConjugations({
      verb,
      onlyTense = null
    }) {
      renderVerbConjugationsCore({
        verb,
        containerId: "all-tense-conjugations",
        tenseValue: onlyTense,
        modeKey: "standard",
        subjectKeyPrefix: "standard",
        subjectSubMode: "universal"
      });
    }
    function shouldExposeDeveloperHooks() {
      if (typeof targetObject.window === "undefined") {
        return false;
      }
      try {
        const search = String(targetObject.window.location?.search || "");
        const params = new targetObject.URLSearchParams(search);
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
        return targetObject.window.localStorage?.getItem("nawat_dev_hooks") === "1";
      } catch (_error) {
        return false;
      }
    }
    var DEVELOPER_HOOK_NAMES = Object.freeze(["runRegexEnvelopeLanguageTests", "runComposerDisplayBridgeTests", "runComposerButtonCombinatorialAudit"]);
    var DEV_RUNTIME_CHECKS_ASSET_VERSION = "20260402-dev-checks-115";
    function getDeveloperHookMap(windowObject = null) {
      const scope = windowObject || (typeof targetObject.window !== "undefined" ? targetObject.window : null);
      const hooks = {};
      if (!scope || typeof scope !== "object") {
        return hooks;
      }
      DEVELOPER_HOOK_NAMES.forEach(name => {
        if (typeof scope[name] === "function") {
          hooks[name] = scope[name];
        }
      });
      return hooks;
    }
    var DEV_RUNTIME_CHECKS_LOADING_STATE = "idle";
    function loadDeveloperRuntimeChecksIfEnabled() {
      if (typeof targetObject.window === "undefined" || typeof targetObject.document === "undefined") {
        return Promise.resolve(false);
      }
      if (DEV_RUNTIME_CHECKS_LOADING_STATE !== "idle") {
        return Promise.resolve(DEV_RUNTIME_CHECKS_LOADING_STATE === "loaded");
      }
      const existing = targetObject.document.querySelector("script[data-dev-runtime-checks=\"true\"]");
      if (existing) {
        DEV_RUNTIME_CHECKS_LOADING_STATE = "loaded";
        return Promise.resolve(true);
      }
      DEV_RUNTIME_CHECKS_LOADING_STATE = "loading";
      return new Promise(resolve => {
        const script = targetObject.document.createElement("script");
        script.defer = true;
        script.dataset.devRuntimeChecks = "true";
        script.src = new targetObject.URL(`./scripts/browser_runtime_checks.js?v=${DEV_RUNTIME_CHECKS_ASSET_VERSION}`, targetObject.window.location.href).href;
        script.addEventListener("load", () => {
          DEV_RUNTIME_CHECKS_LOADING_STATE = "loaded";
          resolve(true);
        });
        script.addEventListener("error", () => {
          DEV_RUNTIME_CHECKS_LOADING_STATE = "failed";
          resolve(false);
        });
        targetObject.document.head.appendChild(script);
      });
    }
    var DEV_HOOKS_MODULE_LOADING_STATE = "idle";
    async function installDeveloperHooksIfEnabled() {
      if (typeof targetObject.window === "undefined") {
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
          hooksModule.installDeveloperHooks(getDeveloperHookMap(targetObject.window), {
            windowObject: targetObject.window
          });
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

    const api = {};
    api.renderAllOutputs = renderAllOutputs;
    api.updateTensePanelDescription = updateTensePanelDescription;
    api.getExplainabilitySelectedTense = getExplainabilitySelectedTense;
    api.resolveOutputPanelProvenance = resolveOutputPanelProvenance;
    api.getSharedLetterPrefixLength = getSharedLetterPrefixLength;
    api.getSurfaceFamilyBaseCutIndex = getSurfaceFamilyBaseCutIndex;
    api.getLetterSliceText = getLetterSliceText;
    Object.defineProperty(api, "NAWAT_PATIENTIVO_BRANCH_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_BRANCH_OPTIONS; },
    });
    Object.defineProperty(api, "DEFAULT_NAWAT_PATIENTIVO_BRANCH", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_NAWAT_PATIENTIVO_BRANCH; },
    });
    Object.defineProperty(api, "NAWAT_TRONCO_CONVERSION_ROUTE_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_TRONCO_CONVERSION_ROUTE_SPECS; },
    });
    Object.defineProperty(api, "NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_VERB_NOUN_CONVERSION_ROUTE_KEYS; },
    });
    Object.defineProperty(api, "NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_SOURCE_TENSE_OPTIONS; },
    });
    Object.defineProperty(api, "NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS", {
        configurable: true,
        enumerable: true,
        get() { return NAWAT_PATIENTIVO_SOURCE_TENSE_MENU_GROUPS; },
    });
    api.getNawatPatientivoBranchOption = getNawatPatientivoBranchOption;
    api.getNawatPatientivoBranchStateStore = getNawatPatientivoBranchStateStore;
    api.getActiveNawatPatientivoBranch = getActiveNawatPatientivoBranch;
    api.setActiveNawatPatientivoBranch = setActiveNawatPatientivoBranch;
    api.isPatientivoTroncoRouteProfile = isPatientivoTroncoRouteProfile;
    api.isAgentiveMannerRouteProfile = isAgentiveMannerRouteProfile;
    api.isPatientivoSurfaceRouteProfile = isPatientivoSurfaceRouteProfile;
    api.isVerbNounConversionRouteProfile = isVerbNounConversionRouteProfile;
    api.getNawatRoutePlacementName = getNawatRoutePlacementName;
    api.getNawatPatientivoBranchLabel = getNawatPatientivoBranchLabel;
    api.getNawatPatientivoBranchClassLabel = getNawatPatientivoBranchClassLabel;
    api.getNawatPatientivoSourceClassCode = getNawatPatientivoSourceClassCode;
    api.getNawatPatientivoSourceTenseOptionLabel = getNawatPatientivoSourceTenseOptionLabel;
    api.getNawatPatientivoTenseOptionLabel = getNawatPatientivoTenseOptionLabel;
    api.getNawatPatientivoSourceRouteKey = getNawatPatientivoSourceRouteKey;
    api.getNawatVerbNounConversionProfiles = getNawatVerbNounConversionProfiles;
    api.getNawatVerbNounConversionLabel = getNawatVerbNounConversionLabel;
    api.getNawatVerbNounConversionHierarchyParts = getNawatVerbNounConversionHierarchyParts;
    api.formatNawatVerbNounConversionHierarchyLabel = formatNawatVerbNounConversionHierarchyLabel;
    api.getNawatVerbNounEuropeanDestinationLabel = getNawatVerbNounEuropeanDestinationLabel;
    api.getNawatVerbNounRouteMenuLabel = getNawatVerbNounRouteMenuLabel;
    api.createNawatRoutePickerMenuSection = createNawatRoutePickerMenuSection;
    api.createNawatConversionStationPicker = createNawatConversionStationPicker;
    api.createNawatPatientivoVerbNounConversionPicker = createNawatPatientivoVerbNounConversionPicker;
    api.getNawatGuidanceModeClass = getNawatGuidanceModeClass;
    api.getNawatGuidanceModeMarker = getNawatGuidanceModeMarker;
    api.getNawatTroncoConversionSpec = getNawatTroncoConversionSpec;
    api.getNawatTroncoTenseShortLabel = getNawatTroncoTenseShortLabel;
    api.buildNawatTroncoConversionTrack = buildNawatTroncoConversionTrack;
    api.createNawatRouteInlineSelect = createNawatRouteInlineSelect;
    api.appendNawatRouteSwitchDivider = appendNawatRouteSwitchDivider;
    api.createNawatRouteComponentDivider = createNawatRouteComponentDivider;
    api.createNawatTroncoConversionSwitchGroup = createNawatTroncoConversionSwitchGroup;
    api.createNawatVerbNounConversionSwitchGroup = createNawatVerbNounConversionSwitchGroup;
    api.createVerbTenseBlockDestinationPicker = createVerbTenseBlockDestinationPicker;
    api.normalizeDerivationalInputFamilyToken = normalizeDerivationalInputFamilyToken;
    api.isSameDerivationalGuidanceRow = isSameDerivationalGuidanceRow;
    api.buildDerivationalFamilySummaryEntries = buildDerivationalFamilySummaryEntries;
    api.resolveCurrentDerivationalGuidanceEntries = resolveCurrentDerivationalGuidanceEntries;
    api.renderOutputGuidancePanel = renderOutputGuidancePanel;
    api.resolveRenderableVerbValue = resolveRenderableVerbValue;
    api.renderOrdinaryNncConjugations = renderOrdinaryNncConjugations;
    api.renderActiveConjugations = renderActiveConjugations;
    api.renderNonactiveConjugationRows = renderNonactiveConjugationRows;
    api.buildVerbTenseBlock = buildVerbTenseBlock;
    api.clearUnifiedVerbOutputDataset = clearUnifiedVerbOutputDataset;
    api.rebuildUnifiedVerbOutputDataset = rebuildUnifiedVerbOutputDataset;
    api.renderVerbConjugationBlocks = renderVerbConjugationBlocks;
    api.createObjectSectionGrid = createObjectSectionGrid;
    api.createSourceModeColumns = createSourceModeColumns;
    api.buildToggleControl = buildToggleControl;
    api.setToggleActiveState = setToggleActiveState;
    api.getVerbObjectPrefixGroups = getVerbObjectPrefixGroups;
    api.resolveVerbTenseValue = resolveVerbTenseValue;
    api.buildVerbTabRenderContext = buildVerbTabRenderContext;
    api.renderVerbConjugationsCore = renderVerbConjugationsCore;
    api.renderPretUniversalConjugations = renderPretUniversalConjugations;
    api.renderLocativoTemporalConjugations = renderLocativoTemporalConjugations;
    api.buildNounTabRenderContext = buildNounTabRenderContext;
    api.renderNounConjugations = renderNounConjugations;
    api.buildAdjectiveTabRenderContext = buildAdjectiveTabRenderContext;
    api.renderAdjectiveConjugations = renderAdjectiveConjugations;
    api.buildAdverbTabRenderContext = buildAdverbTabRenderContext;
    api.renderAdverbConjugations = renderAdverbConjugations;
    api.renderAllTenseConjugations = renderAllTenseConjugations;
    api.shouldExposeDeveloperHooks = shouldExposeDeveloperHooks;
    Object.defineProperty(api, "DEVELOPER_HOOK_NAMES", {
        configurable: true,
        enumerable: true,
        get() { return DEVELOPER_HOOK_NAMES; },
        set(value) { DEVELOPER_HOOK_NAMES = value; },
    });
    Object.defineProperty(api, "DEV_RUNTIME_CHECKS_ASSET_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return DEV_RUNTIME_CHECKS_ASSET_VERSION; },
        set(value) { DEV_RUNTIME_CHECKS_ASSET_VERSION = value; },
    });
    api.getDeveloperHookMap = getDeveloperHookMap;
    Object.defineProperty(api, "DEV_RUNTIME_CHECKS_LOADING_STATE", {
        configurable: true,
        enumerable: true,
        get() { return DEV_RUNTIME_CHECKS_LOADING_STATE; },
        set(value) { DEV_RUNTIME_CHECKS_LOADING_STATE = value; },
    });
    api.loadDeveloperRuntimeChecksIfEnabled = loadDeveloperRuntimeChecksIfEnabled;
    Object.defineProperty(api, "DEV_HOOKS_MODULE_LOADING_STATE", {
        configurable: true,
        enumerable: true,
        get() { return DEV_HOOKS_MODULE_LOADING_STATE; },
        set(value) { DEV_HOOKS_MODULE_LOADING_STATE = value; },
    });
    api.installDeveloperHooksIfEnabled = installDeveloperHooksIfEnabled;
    return api;
}

export function installUiRenderingGlobals(targetObject = globalThis) {
    const api = createUiRenderingApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
