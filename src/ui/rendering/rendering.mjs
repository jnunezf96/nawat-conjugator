// Native wrapper generated from src/ui/rendering/rendering.js.

export function createUiRenderingGlobals(targetObject = globalThis) {
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
    function getVerbDerivedNominalizationProfileLabel(map = {}, value = "", fallback = "") {
      const normalized = String(value || "").trim();
      if (!normalized) {
        return fallback;
      }
      return map[normalized] || fallback || normalized;
    }
    function buildVerbDerivedNominalizationProfileSubLabels(profile = null, {
      isNawat = false
    } = {}) {
      if (!profile || profile.outputKind !== "verb-derived-nominal") {
        return [];
      }
      const kindLabels = {
        "action-nominal": "accion/proceso",
        agentive: "agentivo",
        patientive: "patientivo",
        instrumentive: "instrumentivo",
        "quality-result": "calificativo",
        "locative-temporal": "locativo-temporal",
        "patientive-adjectival": "adjetivo patientivo",
        "adjectival-surface": "adjetivo"
      };
      const roleLabels = {
        "action/process": "accion/proceso",
        agent: "agente",
        "patient/result": "paciente/resultado",
        instrument: "instrumento",
        "quality/result": "cualidad/resultado",
        "place/time": "lugar/tiempo",
        property: "propiedad"
      };
      const patientiveFamilyLabels = {
        nonactive: "no activo",
        perfectivo: "perfectivo",
        imperfectivo: "imperfectivo",
        "tronco-verbal": "tronco verbal"
      };
      const adjectivalFunctionLabels = {
        "predicate-surface": "predicado"
      };
      const role = profile.role || {};
      const source = profile.source || {};
      const boundaries = profile.boundaries || {};
      const labels = [];
      if (boundaries.nominalizationScope === "structural-word-output") {
        labels.push("Ambito: estructural");
      }
      const nominalizationKindLabel = getVerbDerivedNominalizationProfileLabel(kindLabels, role.nominalizationKind || profile.nominalKind, profile.nominalKind || "");
      if (nominalizationKindLabel) {
        labels.push(`Nominalizacion: ${nominalizationKindLabel}`);
      }
      const semanticRoleLabel = getVerbDerivedNominalizationProfileLabel(roleLabels, role.semanticRole, "");
      if (semanticRoleLabel) {
        labels.push(`Rol nominal: ${semanticRoleLabel}`);
      }
      const sourceTense = String(source.sourceTense || "").trim();
      if (sourceTense) {
        labels.push(`Fuente VNC: ${getNawatPatientivoTenseOptionLabel(sourceTense, isNawat)}`);
      }
      const patientiveFamilyLabel = getVerbDerivedNominalizationProfileLabel(patientiveFamilyLabels, role.patientiveFamily, "");
      if (patientiveFamilyLabel) {
        labels.push(`Familia patientiva: ${patientiveFamilyLabel}`);
      }
      const patientiveFamilyProfile = profile.patientiveFamilyProfile || null;
      if (patientiveFamilyProfile?.sourcePatternLabel) {
        labels.push(`Fuente patientiva: ${patientiveFamilyProfile.sourcePatternLabel}`);
      }
      if (patientiveFamilyProfile?.sourceFamilyLabel) {
        labels.push(`Familias Andrews: ${patientiveFamilyProfile.sourceFamilyLabel}`);
      }
      if (patientiveFamilyProfile?.sourceFamilyBoundary) {
        labels.push(`Limite patientivo: ${patientiveFamilyProfile.sourceFamilyBoundary}`);
      }
      if (patientiveFamilyProfile?.sourceStageModel?.slot) {
        labels.push(`Etapa salida: ${patientiveFamilyProfile.sourceStageModel.slot}`);
      }
      if (patientiveFamilyProfile && patientiveFamilyProfile.isCompletePatientiveTaxonomy === false) {
        labels.push("Taxonomia patientiva: parcial");
      }
      const adjectivalFunctionLabel = getVerbDerivedNominalizationProfileLabel(adjectivalFunctionLabels, role.adjectivalFunction, "");
      if (adjectivalFunctionLabel) {
        labels.push(`Funcion adjetival: ${adjectivalFunctionLabel}`);
      }
      if (adjectivalFunctionLabel && boundaries.doesNotImplementLessons42_43) {
        labels.push("Modificacion: no modelada");
      }
      return labels;
    }
    function appendVerbDerivedNominalizationProfileSubLabels(baseLabel = "", profile = null, {
      isNawat = false
    } = {}) {
      return [baseLabel, ...buildVerbDerivedNominalizationProfileSubLabels(profile, {
        isNawat
      })].filter(Boolean).join(" · ");
    }
    function buildDenominalFamilyProfileSubLabels(profile = null) {
      if (!profile || profile.outputKind !== "denominal-route") {
        return [];
      }
      const familyLabels = {
        "vi-ti": "VI -ti",
        "vi-iwi": "VI -iwi",
        "vi-awi": "VI -awi",
        "vt-na": "VT -na"
      };
      const labels = [];
      const routeFamily = String(profile.routeFamily || "").trim();
      if (routeFamily) {
        labels.push(`Familia denominal: ${familyLabels[routeFamily] || routeFamily}`);
      }
      const verbalizer = String(profile.verbalizer || "").trim();
      if (verbalizer) {
        labels.push(`Verbalizador denominal: ${verbalizer}`);
      }
      if (profile.isCompleteLesson54_55 === false) {
        labels.push("Cobertura denominal: parcial");
      }
      return labels;
    }
    function appendDenominalFamilyProfileSubLabels(baseLabel = "", profile = null) {
      return [baseLabel, ...buildDenominalFamilyProfileSubLabels(profile)].filter(Boolean).join(" · ");
    }
    function buildNawatLinkedGrammarStageSubLabels(stage = null, {
      nextPreview = null
    } = {}) {
      const nextSource = stage?.nextSource && typeof stage.nextSource === "object" ? stage.nextSource : null;
      if (!nextSource || nextSource.canBecomeSource !== true) {
        return [];
      }
      const sourceVerb = String(nextSource.sourceVerb || stage?.inputValue || stage?.renderVerb || "").trim();
      if (!sourceVerb) {
        return [];
      }
      const displaySurface = String(nextSource.displaySurface || stage?.surface || "").trim();
      const candidateRouteCount = Number(nextPreview?.candidateRouteCount || 0);
      return [`Siguiente fuente: ${sourceVerb}`, displaySurface && displaySurface !== sourceVerb ? `Salida de etapa: ${displaySurface}` : "", Number.isFinite(candidateRouteCount) && candidateRouteCount > 0 ? `Continuaciones: ${candidateRouteCount}` : ""].filter(Boolean);
    }
    function getNawatLinkedGrammarCompactRouteLabel(routeOrId = "") {
      const routeId = String(routeOrId && typeof routeOrId === "object" ? routeOrId.routeFamily || routeOrId.routeId || routeOrId.id || "" : routeOrId).trim();
      if (!routeId) {
        return "";
      }
      return routeId.replace(/^denominal-/, "").replace(/-preterit$/, "");
    }
    function getNawatLinkedGrammarCompactStageLabel(stageKey = "") {
      const key = String(stageKey || "").trim();
      const labels = {
        "source-mode": "fuente",
        "source-tense": "estado",
        stem: "tronco",
        verbalizer: "verbalizador",
        "target-mode": "destino",
        "finite-surface": "salida",
        "finite-tense": "salida"
      };
      return labels[key] || key;
    }
    function formatNawatLinkedGrammarCompactChoiceLabel(choice = {}) {
      const routeLabel = getNawatLinkedGrammarCompactRouteLabel(choice.routeFamily || choice.routeId || choice.route || "");
      const stageLabel = getNawatLinkedGrammarCompactStageLabel(choice.stageKey || choice.stationKey || choice.selection?.stageKey || "");
      return [routeLabel, stageLabel].filter(Boolean).join(" · ");
    }
    function appendNawatLinkedGrammarStageSubLabels(baseLabel = "", stage = null, options = {}) {
      return [baseLabel, ...buildNawatLinkedGrammarStageSubLabels(stage, options)].filter(Boolean).join(" · ");
    }
    function buildNawatLinkedGrammarSelectionSummarySubLabels(summary = null, {
      maxRoutes = 3,
      maxStagesPerRoute = 1,
      includeCurrentSource = true,
      includeOptionCount = true,
      includeDiagnostics = true
    } = {}) {
      if (!summary || summary.outputKind !== "linked-grammar-path-selection-summary") {
        return [];
      }
      const labels = [];
      const currentSourceVerb = String(summary.currentSource?.sourceVerb || summary.initialSource?.sourceVerb || "").trim();
      if (includeCurrentSource && currentSourceVerb) {
        labels.push(`Fuente actual: ${currentSourceVerb}`);
      }
      const appendableSelectionCount = Number(summary.appendableSelectionCount || 0);
      if (includeOptionCount && Number.isFinite(appendableSelectionCount) && appendableSelectionCount > 0) {
        labels.push(`Opciones siguientes: ${appendableSelectionCount}`);
      }
      const routeLimit = Math.max(0, Number.isFinite(Number(maxRoutes)) ? Number(maxRoutes) : 0);
      const stageLimit = Math.max(0, Number.isFinite(Number(maxStagesPerRoute)) ? Number(maxStagesPerRoute) : 0);
      const nextRoutes = Array.isArray(summary.nextRoutes) ? summary.nextRoutes : [];
      nextRoutes.slice(0, routeLimit).forEach(route => {
        const routeId = String(route?.routeId || "").trim();
        const appendableStages = Array.isArray(route?.appendableStages) ? route.appendableStages : [];
        appendableStages.slice(0, stageLimit).forEach(stage => {
          const selection = stage?.selection && typeof stage.selection === "object" ? stage.selection : null;
          const stageKey = String(selection?.stageKey || stage?.stageKey || stage?.stationKey || "").trim();
          const sourceVerb = String(stage?.sourceVerb || stage?.nextSource?.sourceVerb || "").trim();
          const routeStageLabel = formatNawatLinkedGrammarCompactChoiceLabel({
            routeId,
            routeFamily: route?.routeFamily || "",
            stageKey
          });
          if (routeStageLabel && sourceVerb) {
            labels.push(`Siguiente salida: ${routeStageLabel} → ${sourceVerb}`);
            return;
          }
          if (routeStageLabel) {
            labels.push(`Siguiente salida: ${routeStageLabel}`);
            return;
          }
          if (sourceVerb) {
            labels.push(`Siguiente salida: ${sourceVerb}`);
          }
        });
      });
      if (includeDiagnostics) {
        const diagnostics = Array.isArray(summary.diagnostics) ? summary.diagnostics : [];
        diagnostics.forEach(diagnostic => {
          const message = String(diagnostic?.message || diagnostic || "").trim();
          if (message) {
            labels.push(`Diagnóstico: ${message}`);
          }
        });
      }
      return labels.filter(Boolean);
    }
    function appendNawatLinkedGrammarSelectionSummarySubLabels(baseLabel = "", summary = null, options = {}) {
      return [baseLabel, ...buildNawatLinkedGrammarSelectionSummarySubLabels(summary, options)].filter(Boolean).join(" · ");
    }
    function buildNawatLinkedGrammarSelectedPathSubLabels(summary = null) {
      if (!summary || summary.outputKind !== "linked-grammar-path-selection-summary") {
        return [];
      }
      const selectedSteps = Array.isArray(summary.selectedSteps) ? summary.selectedSteps : [];
      const selectedLabels = selectedSteps.map(step => {
        return formatNawatLinkedGrammarCompactChoiceLabel({
          routeId: step?.selection?.routeId || step?.route?.routeId || "",
          routeFamily: step?.route?.routeFamily || "",
          stageKey: step?.selection?.stageKey || step?.selectedStage?.stationKey || ""
        });
      }).filter(Boolean);
      const labels = [];
      if (selectedLabels.length) {
        labels.push(`Trayecto: ${selectedLabels.join(" → ")}`);
      }
      labels.push(...buildNawatLinkedGrammarSelectionSummarySubLabels(summary, {
        maxRoutes: 1,
        maxStagesPerRoute: 1
      }));
      return labels.filter(Boolean);
    }
    function getNawatLinkedGrammarAppendableSelections(summary = null, {
      maxChoices = 6
    } = {}) {
      if (!summary || summary.outputKind !== "linked-grammar-path-selection-summary") {
        return [];
      }
      const limit = Math.max(0, Number.isFinite(Number(maxChoices)) ? Number(maxChoices) : 6);
      if (!limit) {
        return [];
      }
      const choices = [];
      const nextRoutes = Array.isArray(summary.nextRoutes) ? summary.nextRoutes : [];
      for (const route of nextRoutes) {
        const routeId = String(route?.routeId || "").trim();
        const appendableStages = Array.isArray(route?.appendableStages) ? route.appendableStages : [];
        for (const stage of appendableStages) {
          const selection = stage?.selection && typeof stage.selection === "object" ? stage.selection : {};
          const selectedRouteId = String(selection.routeId || routeId || "").trim();
          const selectedStageKey = String(selection.stageKey || stage?.stageKey || stage?.stationKey || "").trim();
          if (!selectedRouteId || !selectedStageKey) {
            continue;
          }
          choices.push({
            routeId: selectedRouteId,
            routeFamily: route?.routeFamily || "",
            stageKey: selectedStageKey,
            stationKey: stage?.stationKey || "",
            sourceVerb: String(stage?.sourceVerb || "").trim(),
            displaySurface: String(stage?.displaySurface || stage?.sourceVerb || "").trim(),
            sourceObjectPrefix: String(stage?.objectPrefix || "").trim(),
            selection: {
              routeId: selectedRouteId,
              stageKey: selectedStageKey
            }
          });
          if (choices.length >= limit) {
            return choices;
          }
        }
      }
      return choices;
    }
    function getFirstNawatLinkedGrammarAppendableSelection(summary = null) {
      return getNawatLinkedGrammarAppendableSelections(summary, {
        maxChoices: 1
      })[0] || null;
    }
    function buildNawatLinkedGrammarPathExecutionSubLabels(execution = null) {
      if (!execution || execution.outputKind !== "linked-grammar-path-chain-execution") {
        return [];
      }
      const steps = Array.isArray(execution.steps) ? execution.steps : [];
      const executedSteps = steps.filter(step => step?.status === "executed");
      const lastGenerated = executedSteps[executedSteps.length - 1]?.generated || null;
      const finalSurface = String(lastGenerated?.primarySurface || lastGenerated?.result || "").trim();
      return [executedSteps.length ? `Trayecto generado: ${executedSteps.length}` : "", finalSurface ? `Salida final: ${finalSurface}` : "", execution.stoppedReason ? `Alto: ${execution.stoppedReason}` : ""].filter(Boolean);
    }
    function buildNawatLinkedGrammarPromotedSourceSubLabels(promotedSource = null) {
      const sourceVerb = String(promotedSource?.sourceVerb || "").trim();
      if (!sourceVerb) {
        return [];
      }
      const displaySurface = String(promotedSource?.displaySurface || "").trim();
      const sourceInput = String(promotedSource?.sourceInputDisplay || promotedSource?.sourceInput || "").trim();
      return [`Fuente: ${sourceVerb}`, displaySurface && displaySurface !== sourceVerb ? `Salida: ${displaySurface}` : "", sourceInput && sourceInput !== sourceVerb ? `Entrada previa: ${sourceInput}` : ""].filter(Boolean);
    }
    function getNawatLinkedGrammarStageRailKey(stage = null) {
      const stageKey = String(stage?.key || "").trim();
      const stationKey = String(stage?.stationKey || "").trim();
      const key = stationKey || stageKey;
      if (key === "source-mode" || key === "source-tense" || stageKey === "source-mode" || stageKey === "source-tense") {
        return "source";
      }
      if (key === "stem" || stageKey === "stem") {
        return "tronco";
      }
      if (key === "verbalizer" || key === "target-mode" || stageKey === "verbalizer" || stageKey === "target-mode") {
        return "verbalizer";
      }
      if (key === "finite-tense" || stageKey === "finite-surface") {
        return "finite";
      }
      if (key === "patientivo-branch" || key === "surface-profile") {
        return "patientivo";
      }
      return key;
    }
    function attachNawatLinkedGrammarStagesToRailStations(stations = [], linkedStages = [], {
      routeKey = "",
      sourceVerb = "",
      sourceObjectPrefix = "",
      activateStation = null,
      previewNextSource = null,
      buildSelectionSummary = null,
      appendSelection = null
    } = {}) {
      if (!Array.isArray(stations) || !stations.length || !Array.isArray(linkedStages) || !linkedStages.length) {
        return Array.isArray(stations) ? stations : [];
      }
      const stageByRailKey = new Map();
      linkedStages.forEach(stage => {
        const railKey = getNawatLinkedGrammarStageRailKey(stage);
        if (!railKey || stageByRailKey.has(railKey)) {
          return;
        }
        const nextPreview = typeof previewNextSource === "function" ? previewNextSource(stage) : null;
        const linkedLabels = buildNawatLinkedGrammarStageSubLabels(stage, {
          nextPreview
        });
        if (!linkedLabels.length) {
          return;
        }
        const selectionSummary = typeof buildSelectionSummary === "function" ? buildSelectionSummary(stage, {
          nextPreview
        }) : null;
        const selectionLabels = buildNawatLinkedGrammarSelectionSummarySubLabels(selectionSummary, {
          includeCurrentSource: false,
          includeOptionCount: false,
          maxRoutes: 1,
          maxStagesPerRoute: 1
        });
        const firstAppendableChoice = (Array.isArray(selectionSummary?.nextRoutes) ? selectionSummary.nextRoutes : []).flatMap(route => Array.isArray(route?.appendableStages) ? route.appendableStages : []).find(choice => choice?.selection?.routeId && choice?.selection?.stageKey) || null;
        stageByRailKey.set(railKey, {
          stage,
          nextPreview,
          linkedLabels,
          selectionSummary,
          selectionLabels,
          firstAppendableChoice
        });
      });
      if (!stageByRailKey.size) {
        return stations;
      }
      return stations.map(station => {
        const railKey = String(station?.key || "").trim();
        const entry = stageByRailKey.get(railKey);
        if (!entry?.stage) {
          return station;
        }
        const {
          stage,
          nextPreview,
          linkedLabels,
          selectionSummary,
          selectionLabels,
          firstAppendableChoice
        } = entry;
        const linkedLabel = linkedLabels.join(" · ");
        const selectionLabel = selectionLabels.join(" · ");
        const firstAppendableSelection = firstAppendableChoice?.selection || null;
        const firstAppendableActivation = firstAppendableSelection ? {
          routeKey: firstAppendableSelection.routeId || "",
          stationKey: firstAppendableSelection.stageKey || "",
          sourceVerb: stage.nextSource?.sourceVerb || "",
          sourceObjectPrefix: stage.nextSource?.objectPrefix || ""
        } : null;
        const canAppendSelection = Boolean(firstAppendableActivation) && typeof appendSelection === "function";
        const stageRouteKey = String(routeKey || stage.nextSource?.routeId || "").trim();
        const routeStationKey = String(stage.stationKey || stage.key || "").trim();
        const stageRouteSourceVerb = String(stage.routeContext?.sourceVerb || sourceVerb || "").trim();
        const stageRouteSourceObjectPrefix = stage.routeContext?.sourceObjectPrefix || sourceObjectPrefix || "";
        const canActivate = stageRouteKey && routeStationKey && typeof activateStation === "function";
        return {
          ...station,
          linkedGrammarPathStage: stage,
          linkedNextSource: stage.nextSource || null,
          linkedNextSourcePreview: nextPreview,
          linkedNextRouteCount: nextPreview?.candidateRouteCount || 0,
          linkedSelectionSummary: selectionSummary || null,
          linkedAppendableSelectionCount: selectionSummary?.appendableSelectionCount || 0,
          linkedAppendableSelection: firstAppendableSelection,
          linkedAppendableActivation: firstAppendableActivation,
          linkedAppendableAction: canAppendSelection ? anchorElement => appendSelection(firstAppendableSelection, {
            anchorElement,
            sourceVerb: firstAppendableActivation.sourceVerb,
            sourceObjectPrefix: firstAppendableActivation.sourceObjectPrefix,
            stage,
            selectionSummary
          }) : null,
          linkedAppendableChoiceLabel: selectionLabel,
          linkedNextSourceLabel: linkedLabel,
          sublabel: [station.sublabel, linkedLabel, selectionLabel].filter(Boolean).join(" · "),
          action: canActivate ? anchorElement => activateStation(stageRouteKey, routeStationKey, {
            render: true,
            anchorElement,
            sourceVerb: stageRouteSourceVerb,
            sourceObjectPrefix: stageRouteSourceObjectPrefix
          }) : station.action
        };
      });
    }
    function buildNuclearClauseShellSubLabels(shell = null) {
      if (!shell || shell.kind !== "nuclear-clause-shell") {
        return [];
      }
      const label = shell.displayLabel || (shell.formulaType && shell.formulaType !== "unknown" ? `Clausula ${shell.formulaType}` : "Clausula nuclear");
      const formula = String(shell.formula || "").trim();
      const formulaEcho = String(shell.formulaEcho || "").trim();
      const formulaEchoLabel = formulaEcho && shell.formulaType === "VNC" ? `Formula VNC: ${formulaEcho}` : "";
      return [formula ? `${label}: ${formula}` : label, formulaEchoLabel].filter(Boolean);
    }
    function appendNuclearClauseShellSubLabels(baseLabel = "", shell = null) {
      return [baseLabel, ...buildNuclearClauseShellSubLabels(shell)].filter(Boolean).join(" · ");
    }
    function buildVncValencyFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "vnc-valency-frame") {
        return [];
      }
      const labels = [];
      const valencyLabel = String(frame.valencyLabel || frame.valency || "").trim();
      if (valencyLabel) {
        labels.push(`Valencia VNC: ${valencyLabel}`);
      }
      const objectDisplay = String(frame.object?.displayPrefix || "").trim();
      if (objectDisplay) {
        labels.push(`Objeto VNC: ${objectDisplay}`);
      }
      return labels;
    }
    function appendVncValencyFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildVncValencyFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildDerivedVoiceFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "derived-voice-frame") {
        return [];
      }
      const labels = [];
      const voiceLabel = String(frame.voice?.label || "").trim();
      if (voiceLabel) {
        labels.push(`Voz derivada: ${voiceLabel}`);
      }
      const sourceValency = frame.valency?.sourceValency;
      const targetValency = frame.valency?.targetValency;
      if (Number.isFinite(sourceValency) && Number.isFinite(targetValency)) {
        labels.push(`Valencia derivada: ${sourceValency}->${targetValency}`);
      }
      const baseObject = String(frame.valency?.baseObjectPrefix || "").trim();
      const selectedObject = String(frame.valency?.selectedObjectPrefix || "").trim() || "Ø";
      if (baseObject && baseObject !== selectedObject) {
        labels.push(`Objeto base: ${baseObject}->${selectedObject}`);
      }
      return labels;
    }
    function appendDerivedVoiceFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildDerivedVoiceFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildForwardDerivationFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "forward-derivation-frame") {
        return [];
      }
      const labels = [];
      const derivationLabel = String(frame.derivation?.label || frame.derivation?.type || "").trim();
      if (derivationLabel) {
        labels.push(`Derivacion VNC: ${derivationLabel}`);
      }
      const sourceValency = frame.valency?.sourceValency;
      const derivedValency = frame.valency?.derivedValency;
      if (Number.isFinite(sourceValency) && Number.isFinite(derivedValency)) {
        labels.push(`Valencia derivada: ${sourceValency}->${derivedValency}`);
      }
      const selectedStem = String(frame.stem?.selectedStem || "").trim();
      if (selectedStem) {
        labels.push(`Tronco derivado: ${selectedStem}`);
      }
      return labels;
    }
    function appendForwardDerivationFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildForwardDerivationFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildCompoundFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "compound-frame") {
        return [];
      }
      const labels = [];
      const matrixStem = String(frame.matrix?.stem || "").trim();
      if (matrixStem) {
        labels.push(`Compuesto VNC: ${matrixStem}`);
      }
      const embedValues = (Array.isArray(frame.embeds) ? frame.embeds : []).map(entry => {
        const role = String(entry?.role || "").trim();
        const value = String(entry?.value || "").trim();
        return value ? `${role || "embed"} ${value}`.trim() : "";
      }).filter(Boolean);
      if (embedValues.length) {
        labels.push(`Incrustado: ${embedValues.join(", ")}`);
      }
      return labels;
    }
    function appendCompoundFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildCompoundFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildAdverbialNuclearFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "adverbial-nuclear-frame") {
        return [];
      }
      const labels = [];
      const adverbialLabel = String(frame.adverbial?.label || "").trim();
      if (adverbialLabel) {
        labels.push(`Adverbial nuclear: ${adverbialLabel}`);
      }
      const sourceStem = String(frame.sourceVnc?.stem || "").trim();
      if (sourceStem) {
        labels.push(`Fuente VNC: ${sourceStem}`);
      }
      const sourceValency = String(frame.sourceVnc?.valency || "").trim();
      if (sourceValency) {
        labels.push(`Valencia fuente: ${sourceValency === "transitive" ? "transitiva" : "intransitiva"}`);
      }
      const clauseFrame = frame.adverbialNuclearClauseFrame || null;
      const degree = String(clauseFrame?.adverbialization?.degree || "").trim();
      if (degree) {
        labels.push(`Grado: ${degree === "first-degree" ? "primer grado" : degree === "second-degree" ? "segundo grado" : degree}`);
      }
      const domain = String(clauseFrame?.adverbialization?.semanticDomain || "").trim();
      if (domain) {
        labels.push(`Dominio: ${domain === "manner" ? "manera" : domain}`);
      }
      if (frame.boundaries?.legacyAdverbioSurfaceOnly === true) {
        labels.push("Alcance: adverbio heredado");
      }
      return labels;
    }
    function appendAdverbialNuclearFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildAdverbialNuclearFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildRelationalNncBoundaryFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "relational-nnc-boundary-frame") {
        return [];
      }
      const labels = [];
      const statusLabel = String(frame.statusLabel || "").trim();
      if (statusLabel) {
        labels.push(`Relacional NNC: ${statusLabel}`);
      }
      const candidateLabel = String(frame.candidate?.kindLabel || frame.candidate?.nominalKind || "").trim();
      if (candidateLabel) {
        labels.push(`Candidato: ${candidateLabel}`);
      }
      if (frame.boundaries?.locativeTemporalNominalIsEvidence === false) {
        labels.push("Evidencia relacional: no confirmada");
      }
      return labels;
    }
    function appendRelationalNncBoundaryFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildRelationalNncBoundaryFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildPlaceGentilicNncBoundaryFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "place-gentilic-nnc-boundary-frame") {
        return [];
      }
      const labels = [];
      const statusLabel = String(frame.statusLabel || "").trim();
      if (statusLabel) {
        labels.push(`Lugar/gentilicio: ${statusLabel}`);
      }
      const candidateLabel = String(frame.candidate?.kindLabel || frame.candidate?.nominalKind || "").trim();
      if (candidateLabel) {
        labels.push(`Candidato L/G: ${candidateLabel}`);
      }
      if (frame.boundaries?.locativeTemporalNominalIsEvidence === false) {
        labels.push("Evidencia L/G: no confirmada");
      }
      return labels;
    }
    function appendPlaceGentilicNncBoundaryFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildPlaceGentilicNncBoundaryFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildAdverbialAdjunctionBoundaryFrameSubLabels(frame = null) {
      if (!frame || frame.kind !== "adverbial-adjunction-boundary-frame") {
        return [];
      }
      const labels = [];
      const statusLabel = String(frame.statusLabel || "").trim();
      if (statusLabel) {
        labels.push(`Adjuncion: ${statusLabel}`);
      }
      const candidateLabel = String(frame.candidate?.label || "").trim();
      if (candidateLabel) {
        labels.push(`Unidad adjunta: ${candidateLabel}`);
      }
      if (frame.boundaries?.singleGeneratedWordIsEvidence === false) {
        labels.push("Evidencia adjuncion: no confirmada");
      }
      return labels;
    }
    function appendAdverbialAdjunctionBoundaryFrameSubLabels(baseLabel = "", frame = null) {
      return [baseLabel, ...buildAdverbialAdjunctionBoundaryFrameSubLabels(frame)].filter(Boolean).join(" · ");
    }
    function buildVncVerbstemClassProfileSubLabels(profile = null) {
      if (!profile || profile.kind !== "vnc-verbstem-class-profile") {
        return [];
      }
      const classKey = String(profile.classKey || profile.selectedClass || "").trim();
      if (!classKey) {
        return [];
      }
      const labels = [`Clase de tronco: ${classKey}`];
      const ruleLabel = String(profile.ruleSummary?.ruleLabel || "").trim();
      if (ruleLabel && ruleLabel !== "default class rules") {
        labels.push(`Diagnostico de tronco: ${ruleLabel}`);
      }
      return labels;
    }
    function appendVncVerbstemClassProfileSubLabels(baseLabel = "", profile = null) {
      return [baseLabel, ...buildVncVerbstemClassProfileSubLabels(profile)].filter(Boolean).join(" · ");
    }
    function buildSentenceLayerSubLabels(sentenceLayer = null) {
      if (!sentenceLayer || sentenceLayer.kind !== "sentence-layer-metadata") {
        return [];
      }
      const slots = sentenceLayer.slots || {};
      const labels = ["Capa oracional: diagnostica"];
      const polarity = String(slots.polarity?.value || "").trim();
      const question = String(slots.question?.value || "").trim();
      const emphasis = String(slots.emphasis?.value || "").trim();
      const mood = String(slots.mood?.value || "").trim();
      if (polarity && polarity !== "affirmative") {
        labels.push(`Negacion: ${polarity}`);
      }
      if (question && question !== "none") {
        labels.push(`Pregunta: ${question}`);
      }
      if (emphasis && emphasis !== "none") {
        labels.push(`Enfasis: ${emphasis}`);
      }
      if (mood && mood !== "declarative") {
        labels.push(`Modo oracional: ${mood}`);
      }
      return labels;
    }
    function appendSentenceLayerSubLabels(baseLabel = "", sentenceLayer = null) {
      return [baseLabel, ...buildSentenceLayerSubLabels(sentenceLayer)].filter(Boolean).join(" · ");
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
      panel.innerHTML = "";
      panel.hidden = true;
      panel.classList.add("is-empty");
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
    function renderOutputSelectionRequiredPlaceholder({
      containerId = "all-tense-conjugations",
      titleText = "Salida",
      message = ""
    } = {}) {
      const container = targetObject.document.getElementById(containerId);
      if (!container) {
        return;
      }
      const {
        grid
      } = createObjectSectionGrid(container);
      const block = targetObject.document.createElement("div");
      block.className = "tense-block tense-block--selection-required";
      const title = targetObject.document.createElement("div");
      title.className = "tense-block__title";
      const label = targetObject.document.createElement("span");
      label.className = "tense-block__label";
      label.textContent = titleText;
      title.appendChild(label);
      block.appendChild(title);
      const list = targetObject.document.createElement("div");
      list.className = "conjugation-list";
      const placeholder = targetObject.document.createElement("div");
      placeholder.className = "tense-placeholder";
      placeholder.textContent = message;
      list.appendChild(placeholder);
      block.appendChild(list);
      grid.appendChild(block);
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
      const selectedAnimacy = fixtureAnimacy || (state.animacy === "animate" || state.animacy === "inanimate" ? state.animacy : "");
      const activeAnimacy = selectedAnimacy || "inanimate";
      const isAnimateNnc = activeAnimacy === "animate";
      const activePluralType = state.pluralType === "auto" ? isAnimateNnc ? "count" : "distributive" : state.pluralType;
      const normalizeOrdinaryNncUiNounClass = (value = "") => {
        const normalized = String(value || "").trim().toLowerCase();
        if (normalized === "0" || normalized === "ø" || normalized === "zero") {
          return "zero";
        }
        return ["t", "ti", "in"].includes(normalized) ? normalized : "";
      };
      const activeNounClass = normalizeOrdinaryNncUiNounClass(analogueInput?.nounClass || state.nounClass);
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
        if (!normalizedStem || !fixtureProbe && !requestNounClass || !fixtureProbe && !selectedAnimacy || typeof targetObject.buildOrdinaryNncGenerateWordRequest !== "function" || typeof targetObject.executeGenerateWordRequest !== "function") {
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
      if (!fixtureProbe && !activeNounClass) {
        const placeholder = targetObject.document.createElement("div");
        placeholder.className = "tense-placeholder";
        placeholder.textContent = "Selecciona un conector num1-num2 para saber su salida.";
        list.appendChild(placeholder);
        return;
      }
      if (!fixtureProbe && !selectedAnimacy) {
        const placeholder = targetObject.document.createElement("div");
        placeholder.className = "tense-placeholder";
        placeholder.textContent = "Selecciona una animacidad para saber su salida.";
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
      personSub.textContent = [...buildNuclearClauseShellSubLabels(result.nuclearClauseShell), ...buildSentenceLayerSubLabels(result.sentenceLayer), rowFormulaEcho ? `Formula NNC: ${rowFormulaEcho}` : "", rowPredicateFormula, rowNounClassLabel ? `clase ${rowNounClassLabel}` : "", rowConnectorSlotLabel, `Estado del predicado: ${rowPredicateStateLabel}`, `Animacidad: ${rowAnimacyLabel}`, `Referencia: ${rowReferenceLabel}`, rowPossessiveMarkingLabel, state.state === "possessive" ? `poseedor ${result.possessor?.prefix || state.possessor || "nu"}` : ""].filter(Boolean).join(" · ");
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
      const renderOrdinaryNncOwnerhoodContinuations = () => {
        if (result.supported !== true || typeof targetObject.buildOrdinaryNounOwnerhoodContinuationContract !== "function") {
          return false;
        }
        const nounStem = String(result.stem || result.nncBasic?.predicate?.stem || "").trim();
        const nounClass = String(result.nounClass || activeNounClass || "").trim();
        if (!nounStem || !nounClass) {
          return false;
        }
        const matrixInventory = typeof targetObject.getOrdinaryNounOwnerhoodMatrixInventory === "function" ? targetObject.getOrdinaryNounOwnerhoodMatrixInventory() : [];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildOrdinaryNounOwnerhoodContinuationContract({
          nounStem,
          nounClass,
          sourceSurface: result.result || "",
          sourceKind: result.source?.sourceKind || "",
          matrixRoot: matrixSpec.nawatRoot || "",
          ownerhoodKind: matrixSpec.ownerhoodKind || "ownerhood"
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const surfaceDisplay = String(result.result || "").trim();
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        surfaceText.textContent = targetObject.formatConjugationDisplay(surfaceDisplay);
        const actions = targetObject.document.createElement("span");
        actions.className = "conjugation-conversion-actions";
        const getOwnerhoodPreviewSurface = (ownerhoodVerbInput = "") => {
          if (!ownerhoodVerbInput || typeof targetObject.getCachedSilentGenerateWord !== "function") {
            return "";
          }
          const preview = targetObject.getCachedSilentGenerateWord({
            silent: true,
            skipValidation: true,
            override: {
              subjectPrefix: "",
              subjectSuffix: "",
              objectPrefix: "",
              verb: ownerhoodVerbInput,
              tense: "pasado-remoto",
              tenseMode: targetObject.TENSE_MODE.verbo,
              derivationMode: targetObject.DERIVATION_MODE.active,
              voiceMode: targetObject.VOICE_MODE.active
            }
          }) || {};
          const surface = Array.isArray(preview.surfaceForms) && preview.surfaceForms.length ? String(preview.surfaceForms[0] || "").trim() : String(preview.result || "").split(/\s*\/\s*/g)[0]?.trim();
          return surface && surface !== "—" ? surface : "";
        };
        const applyOrdinaryNounOwnerhoodContract = contract => {
          if (typeof targetObject.applyOrdinaryNounOwnerhoodRootsToVerbEntry === "function") {
            targetObject.applyOrdinaryNounOwnerhoodRootsToVerbEntry({
              nounStem: contract.nounStem,
              nounClass: contract.nounClass,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              ownerhoodVerbInput: contract.ownerhoodVerbInput
            });
          }
        };
        contracts.forEach(contract => {
          const previewSurface = getOwnerhoodPreviewSurface(contract.ownerhoodVerbInput);
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.ordinaryNncOwnerhoodContinuation = "true";
          continueButton.dataset.ownerhoodVerbInput = contract.ownerhoodVerbInput;
          continueButton.dataset.nounStem = contract.nounStem;
          continueButton.dataset.ownerhoodMatrixRoot = contract.matrixRoot;
          continueButton.dataset.ownerhoodMatrixId = contract.matrix?.id || "";
          continueButton.dataset.ownerhoodKind = contract.ownerhoodKind || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || contract.ownerhoodVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida NNC: ${contract.sourceSurface || surfaceDisplay}`, `raiz nominal: ${contract.nounStem}`, `clase: ${contract.nounClass}`, `matriz de posesión: ${contract.matrixRoot}`, contract.ownerhoodKind ? `tipo: ${contract.ownerhoodKind}` : "", contract.matrix?.classicalMatrix ? `${contract.grammarSource}: ${contract.matrix.classicalMatrix}` : "", `V pretérito: ${contract.ownerhoodVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyOrdinaryNounOwnerhoodContract(contract);
          });
          actions.appendChild(continueButton);
        });
        value.append(surfaceText, actions);
        return true;
      };
      renderOrdinaryNncOwnerhoodContinuations();
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
      const activeTenseMode = targetObject.getActiveTenseMode();
      const activeRoute = typeof targetObject.getActiveNawatRouteProfile === "function" ? targetObject.getActiveNawatRouteProfile() : null;
      if (activeRoute?.targetVerb && activeRoute?.targetMode && activeRoute?.targetTenseValue && targetObject.getActiveTenseMode() === (targetObject.TENSE_MODE[activeRoute.targetMode] || activeRoute.targetMode) && selectionState.tenseValue === activeRoute.targetTenseValue) {
        renderVerb = activeRoute.activeStationVerb || activeRoute.activeStationInput || activeRoute.targetVerb;
        renderObjectPrefix = activeRoute.activeStationObjectPrefix || activeRoute.targetObjectPrefix || "";
      }
      const routeStore = typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
      const activeLocativePrelocativeVerb = String(routeStore?.activeLocativePrelocativeVerb || "").trim();
      const activeLocativePromotedObjectPrefix = String(routeStore?.activeLocativePromotedObjectPrefix || "").trim();
      if (activeTenseMode === targetObject.TENSE_MODE.verbo && activeLocativePrelocativeVerb && activeLocativePrelocativeVerb === renderVerb && activeLocativePromotedObjectPrefix) {
        renderObjectPrefix = activeLocativePromotedObjectPrefix;
      }
      updateTensePanelDescription();
      if (targetObject.isOrdinaryNncGenerationModeEnabled()) {
        renderOutputGuidancePanel({
          verb: ""
        });
        clearUnifiedVerbOutputDataset();
        renderOrdinaryNncConjugations({
          stem: renderVerb,
          containerId: "all-tense-conjugations"
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      if (activeTenseMode === targetObject.TENSE_MODE.verbo && typeof targetObject.isVerbInputModeComposer === "function" && targetObject.isVerbInputModeComposer() && typeof targetObject.isComposerTransitivitySelected === "function" && !targetObject.isComposerTransitivitySelected()) {
        renderOutputGuidancePanel({
          verb: ""
        });
        clearUnifiedVerbOutputDataset();
        renderOutputSelectionRequiredPlaceholder({
          message: "Selecciona una transitividad para saber su salida."
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      const isPatientivoSalidaMode = activeTenseMode === targetObject.TENSE_MODE.sustantivo && selectionState.tenseValue === "patientivo";
      renderOutputGuidancePanel({
        verb: isPatientivoSalidaMode ? "" : renderVerb
      });
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
      preferredObjectPrefix = "",
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
      const explicitPreferredObjectPrefix = String(preferredObjectPrefix || "").trim();
      const hasExplicitPreferredObject = !isIntransitiveGroup && explicitPreferredObjectPrefix && objectOptionMap.has(explicitPreferredObjectPrefix);
      let activeObjectPrefix = isIntransitiveGroup ? "" : defaultObjectPrefix;
      if (shouldSeedAllTensesDefault && !targetObject.ObjectToggleState.has(objectStateKey)) {
        targetObject.setToggleStateValue(targetObject.ObjectToggleState, objectStateKey, "ki", {
          syncLock: false
        });
      }
      const storedObjectPrefix = targetObject.getToggleStateValue(targetObject.ObjectToggleState, objectStateKey);
      if (hasExplicitPreferredObject) {
        activeObjectPrefix = explicitPreferredObjectPrefix;
      } else if (!isIntransitiveGroup && storedObjectPrefix !== undefined && objectOptionMap.has(storedObjectPrefix)) {
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
        destinationSlot.hidden = true;
        tenseBlock.classList.remove("tense-block--has-destination-menu");
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
      const appendVerbToPatientivoRowContinuation = ({
        value,
        evaluation,
        sourceObjectPrefix = ""
      } = {}) => {
        if (!value || isNonactiveMode || !verb || !tenseValue || typeof getNawatPatientivoSourceRouteKey !== "function" || typeof targetObject.getNawatRouteProfile !== "function" || typeof isPatientivoSurfaceRouteProfile !== "function" || typeof targetObject.resolveNawatRouteTarget !== "function" || typeof targetObject.getNawatRouteFiniteSurfaceForm !== "function" || typeof targetObject.activateNawatRouteStation !== "function") {
          return false;
        }
        const routeKey = getNawatPatientivoSourceRouteKey({
          sourceCombinedMode: targetObject.COMBINED_MODE.active,
          tenseValue
        });
        const routeProfile = routeKey ? targetObject.getNawatRouteProfile(routeKey) : null;
        if (!routeProfile || !isPatientivoSurfaceRouteProfile(routeProfile)) {
          return false;
        }
        const routeTarget = targetObject.resolveNawatRouteTarget(routeProfile, {
          sourceVerb: verb,
          sourceObjectPrefix,
          sourceTenseValue: tenseValue,
          sourceCombinedMode: targetObject.COMBINED_MODE.active
        }) || {};
        const patientivoSurface = targetObject.getNawatRouteFiniteSurfaceForm(routeProfile, {
          sourceVerb: verb,
          sourceObjectPrefix,
          routeTarget
        });
        if (!patientivoSurface) {
          return false;
        }
        const sourceForms = targetObject.getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        const sourceDisplay = sourceForms.length ? sourceForms.join(" / ") : String(evaluation?.result?.result || "").trim();
        if (!sourceDisplay || sourceDisplay === "—") {
          return false;
        }
        let actions = value.querySelector?.(".conjugation-conversion-actions") || null;
        if (!actions) {
          value.replaceChildren();
          value.classList.add("conjugation-value--conversion-picker");
          const surfaceText = targetObject.document.createElement("span");
          surfaceText.className = "conjugation-conversion-surface";
          const groupedSurfaceDisplay = typeof targetObject.formatConjugationDisplay === "function" ? targetObject.formatConjugationDisplay(sourceDisplay) : sourceDisplay;
          groupedSurfaceDisplay.split(/\n+/).map(line => line.trim()).filter(Boolean).forEach(line => {
            const lineElement = targetObject.document.createElement("span");
            lineElement.className = "conjugation-conversion-surface-line";
            lineElement.textContent = line;
            surfaceText.appendChild(lineElement);
          });
          actions = targetObject.document.createElement("span");
          actions.className = "conjugation-conversion-actions";
          value.append(surfaceText, actions);
        }
        const continueButton = targetObject.document.createElement("button");
        continueButton.type = "button";
        continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
        continueButton.dataset.verbPatientivoContinuation = "true";
        continueButton.dataset.nawatRouteKey = routeKey;
        const continueLabel = targetObject.document.createElement("span");
        continueLabel.className = "calc-guidance__chip-label";
        continueLabel.textContent = `→ ${patientivoSurface}`;
        continueButton.appendChild(continueLabel);
        const continueSubLabel = targetObject.document.createElement("span");
        continueSubLabel.className = "calc-guidance__chip-sublabel";
        continueSubLabel.textContent = "S patientivo";
        continueButton.appendChild(continueSubLabel);
        continueButton.addEventListener("click", () => {
          targetObject.activateNawatRouteStation(routeKey, "target-mode", {
            render: true,
            anchorElement: continueButton,
            sourceVerb: verb,
            sourceObjectPrefix,
            sourceTenseValue: tenseValue,
            sourceCombinedMode: targetObject.COMBINED_MODE.active
          });
        });
        actions.appendChild(continueButton);
        return true;
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
          const rowPersonSub = useObjectOnlyPersonSub ? targetObject.formatActiveValence3PlusPersonSub(basePersonSub, objectOnlyParts, isNawat) : roleParts.length ? [basePersonSub, ...roleParts].filter(Boolean).join(" · ") : [basePersonSub].filter(Boolean).join(" · ");
          personSub.textContent = appendSentenceLayerSubLabels(appendVncVerbstemClassProfileSubLabels(appendCompoundFrameSubLabels(appendForwardDerivationFrameSubLabels(appendDerivedVoiceFrameSubLabels(appendVncValencyFrameSubLabels(appendNuclearClauseShellSubLabels(rowPersonSub, evaluation.result?.nuclearClauseShell), evaluation.result?.vncValencyFrame), evaluation.result?.derivedVoiceFrame), evaluation.result?.forwardDerivationFrame), evaluation.result?.compoundFrame), evaluation.result?.verbstemClassProfile || evaluation.result?.stemProvenance?.verbstemClassProfile || null), evaluation.result?.sentenceLayer);
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
          appendVerbToPatientivoRowContinuation({
            value,
            evaluation,
            sourceObjectPrefix: displaySlotValues.object || ""
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
      objectPrefix = "",
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
          preferredObjectPrefix: objectPrefix,
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
              personSub.textContent = appendSentenceLayerSubLabels(appendNuclearClauseShellSubLabels(appendAdverbialAdjunctionBoundaryFrameSubLabels(appendAdverbialNuclearFrameSubLabels(appendRelationalNncBoundaryFrameSubLabels(appendPlaceGentilicNncBoundaryFrameSubLabels(appendDenominalFamilyProfileSubLabels(appendVerbDerivedNominalizationProfileSubLabels(targetObject.buildPersonSub({
                subjectLabel: "",
                possessorLabel,
                objectLabel
              }), evaluation.result?.nominalizationProfile, {
                isNawat
              }), evaluation.result?.denominalFamilyProfile), evaluation.result?.placeGentilicNncBoundaryFrame), evaluation.result?.relationalNncBoundaryFrame), evaluation.result?.adverbialNuclearFrame), evaluation.result?.adverbialAdjunctionBoundaryFrame), evaluation.result?.nuclearClauseShell), evaluation.result?.sentenceLayer);
              targetObject.applyConjugationEvaluationPresentation({
                row,
                value,
                evaluation,
                formattedValue: targetObject.formatConjugationDisplay(evaluation.result.result)
              });
              targetObject.renderPatientivoPrelocativeContinuation({
                value,
                evaluation,
                selection: targetObject.normalizedSelection,
                number: targetObject.number,
                possessorPrefix,
                patientivoSource: targetObject.patientivoSource,
                sourceTenseValue: targetObject.resolvedPatientivoSourceTenseValue,
                sourceCombinedMode: targetObject.resolvedPatientivoSourceCombinedMode
              });
              targetObject.renderPatientivoCompoundEmbedContinuation({
                value,
                evaluation,
                patientivoSource: targetObject.patientivoSource
              });
              targetObject.renderPatientivoNominalCompoundContinuation({
                value,
                evaluation,
                patientivoSource: targetObject.patientivoSource
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
      const updatePatientivoBlockOrigin = (entry = {}) => {
        if (!entry.originSlot) {
          return;
        }
        entry.originSlot.replaceChildren();
        entry.originSlot.hidden = true;
        entry.block?.classList.remove("tense-block--has-origin-menu");
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
      const stripPrelocativePatientivoConnector = (surface = "") => {
        return typeof targetObject.stripPatientivoPrelocativeConnector === "function" ? targetObject.stripPatientivoPrelocativeConnector(surface, {
          patientivoNominalSuffix: activePatientivoNominalSuffix
        }) : "";
      };
      const resolvePrelocativeObjectFromPatientiveRow = ({
        selection = {},
        possessorPrefix = ""
      } = {}) => {
        const transfer = typeof targetObject.resolvePatientivoPrelocativeObjectTransfer === "function" ? targetObject.resolvePatientivoPrelocativeObjectTransfer({
          selection,
          possessorPrefix
        }) : null;
        return transfer?.available ? transfer : null;
      };
      const buildPrelocativeVerbInput = ({
        incorporatedRoot = "",
        matrixRoot = "ni"
      } = {}) => {
        return typeof targetObject.buildPatientivoPrelocativeVerbInput === "function" ? targetObject.buildPatientivoPrelocativeVerbInput({
          incorporatedRoot,
          matrixRoot
        }) : "";
      };
      const getPrelocativeFinitePreviewSurface = ({
        incorporatedRoot = "",
        matrixRoot = "ni",
        objectPrefix = "",
        prelocativeVerb = ""
      } = {}) => {
        const resolvedPrelocativeVerb = prelocativeVerb || buildPrelocativeVerbInput({
          incorporatedRoot,
          matrixRoot
        });
        const promotedObjectPrefix = String(objectPrefix || "").trim();
        if (!resolvedPrelocativeVerb || !promotedObjectPrefix) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: promotedObjectPrefix,
            verb: resolvedPrelocativeVerb,
            tense: "presente",
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active
          }
        }) || {};
        const surface = Array.isArray(result.surfaceForms) && result.surfaceForms.length ? String(result.surfaceForms[0] || "").trim() : String(result.result || "").split(/\s*\/\s*/g)[0]?.trim();
        return surface && surface !== "—" ? surface : "";
      };
      const resolvePatientivoSurfaceFromEvaluation = (evaluation = {}) => {
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (forms.length) {
          return forms[0];
        }
        const fallback = String(evaluation?.result?.result || "").split(/\s*\/\s*/g)[0]?.trim();
        return fallback && fallback !== "—" ? fallback : "";
      };
      const resolvePatientivoSourceSurfaceForContinuation = ({
        evaluation = {},
        patientivoSource = "",
        objectPrefix = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        const profileSource = evaluation?.result?.nominalizationProfile?.source || {};
        const profileSurface = String(profileSource.sourceSurface || profileSource.surface || profileSource.generatedSurface || "").trim();
        if (profileSurface && profileSurface !== "—") {
          return profileSurface;
        }
        return getDirectPatientivoSourceSurface({
          patientivoSource,
          objectPrefix,
          sourceTenseValue,
          sourceCombinedMode
        });
      };
      const ensurePatientivoContinuationDisplay = ({
        value,
        evaluation
      } = {}) => {
        if (!value) {
          return null;
        }
        let actions = value.querySelector?.(".conjugation-conversion-actions") || null;
        if (value.classList.contains("conjugation-value--conversion-picker") && actions) {
          return actions;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        const surfaceDisplay = forms.length ? forms.join(" / ") : String(evaluation?.result?.result || "").trim();
        if (!surfaceDisplay || surfaceDisplay === "—") {
          return null;
        }
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        const groupedSurfaceDisplay = typeof targetObject.formatConjugationDisplay === "function" ? targetObject.formatConjugationDisplay(surfaceDisplay) : surfaceDisplay;
        groupedSurfaceDisplay.split(/\n+/).map(line => line.trim()).filter(Boolean).forEach(line => {
          const lineElement = targetObject.document.createElement("span");
          lineElement.className = "conjugation-conversion-surface-line";
          lineElement.textContent = line;
          surfaceText.appendChild(lineElement);
        });
        actions = targetObject.document.createElement("span");
        actions.className = "conjugation-conversion-actions";
        value.append(surfaceText, actions);
        return actions;
      };
      const getCompoundEmbedFinitePreviewSurface = ({
        compoundVerb = "",
        objectPrefix = ""
      } = {}) => {
        if (!compoundVerb) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix,
            verb: compoundVerb,
            tense: "presente",
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active
          }
        }) || {};
        const surface = Array.isArray(result.surfaceForms) && result.surfaceForms.length ? String(result.surfaceForms[0] || "").trim() : String(result.result || "").split(/\s*\/\s*/g)[0]?.trim();
        return surface && surface !== "—" ? surface : "";
      };
      const getCharacteristicPropertyEmbedFinitePreviewSurface = ({
        compoundVerb = "",
        objectPrefix = "ki"
      } = {}) => getCompoundEmbedFinitePreviewSurface({
        compoundVerb,
        objectPrefix
      });
      const getPreteritAgentiveOwnerhoodPreviewSurface = ({
        ownerhoodVerbInput = ""
      } = {}) => {
        if (!ownerhoodVerbInput) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            verb: ownerhoodVerbInput,
            tense: "pasado-remoto",
            tenseMode: targetObject.TENSE_MODE.verbo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active
          }
        }) || {};
        const surface = Array.isArray(result.surfaceForms) && result.surfaceForms.length ? String(result.surfaceForms[0] || "").trim() : String(result.result || "").split(/\s*\/\s*/g)[0]?.trim();
        return surface && surface !== "—" ? surface : "";
      };
      const getNominalCompoundPreviewSurface = ({
        ordinaryNncRequest = null
      } = {}) => {
        if (!ordinaryNncRequest || !ordinaryNncRequest.stem) {
          return "";
        }
        const result = targetObject.getCachedSilentGenerateWord({
          silent: true,
          skipValidation: true,
          override: {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            verb: ordinaryNncRequest.stem,
            tense: "ordinary-nnc",
            tenseMode: targetObject.TENSE_MODE.sustantivo,
            derivationMode: targetObject.DERIVATION_MODE.active,
            voiceMode: targetObject.VOICE_MODE.active,
            ordinaryNnc: {
              enabled: true,
              ...ordinaryNncRequest
            }
          }
        }) || {};
        const surface = Array.isArray(result.surfaceForms) && result.surfaceForms.length ? String(result.surfaceForms[0] || "").trim() : String(result.result || "").split(/\s*\/\s*/g)[0]?.trim();
        return surface && surface !== "—" ? surface : "";
      };
      const getActionNominalSurfacesFromEvaluation = (evaluation = {}) => {
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (forms.length) {
          return forms;
        }
        const fallback = String(evaluation?.result?.result || "").split(/\s*\/\s*/g).map(form => form.trim()).filter(form => form && form !== "—");
        return fallback.filter((form, index, list) => list.indexOf(form) === index);
      };
      const getCustomaryAgentiveStemsFromEvaluation = (evaluation = {}) => {
        const result = evaluation?.result || {};
        if (result?.nominalizationProfile?.nominalKind !== "agentivo") {
          return [];
        }
        const slots = result?.nuclearClauseShell?.slots || {};
        const subjectPrefix = String(slots.subject?.prefix || "").trim();
        const predicateStem = String(slots.predicate?.stem || "").trim();
        const connector = String(slots.subjectNumberConnector?.connector || "").trim();
        const stems = [];
        const addStem = (stem = "") => {
          const normalized = String(stem || "").trim();
          if (normalized && !stems.includes(normalized)) {
            stems.push(normalized);
          }
        };
        addStem(predicateStem);
        getConjugationSurfaceForms(result).forEach(surfaceForm => {
          let core = String(surfaceForm || "").trim();
          if (!core || core === "—") {
            return;
          }
          if (subjectPrefix && core.startsWith(subjectPrefix)) {
            core = core.slice(subjectPrefix.length);
          }
          if (connector && core.length > connector.length && core.endsWith(connector)) {
            core = core.slice(0, -connector.length);
          }
          addStem(core);
        });
        return stems;
      };
      const getPreteritAgentiveGeneralUseStemsFromEvaluation = (evaluation = {}) => {
        const result = evaluation?.result || {};
        if (result?.nominalizationProfile?.nominalKind !== "agentivo-preterito") {
          return [];
        }
        const slots = result?.nuclearClauseShell?.slots || {};
        const subjectPrefix = String(slots.subject?.prefix || "").trim();
        const predicateStem = String(slots.predicate?.stem || "").trim();
        const predicateState = String(slots.predicate?.state || result?.nominalizationProfile?.predicateState?.value || "").trim();
        const possessorPrefix = String(slots.predicate?.stateSlot?.possessorPrefix || result?.nominalizationProfile?.predicateState?.possessorPrefix || "").trim();
        const stems = [];
        const addStem = (stem = "") => {
          const normalized = String(stem || "").trim();
          if (normalized && !stems.includes(normalized)) {
            stems.push(normalized);
          }
        };
        if (predicateStem) {
          addStem(predicateState === "possessive" || predicateStem.endsWith("ka") ? predicateStem : `${predicateStem}ka`);
        }
        getConjugationSurfaceForms(result).forEach(surfaceForm => {
          let core = String(surfaceForm || "").trim();
          if (!core || core === "—") {
            return;
          }
          if (subjectPrefix && core.startsWith(subjectPrefix)) {
            core = core.slice(subjectPrefix.length);
          }
          if (possessorPrefix && core.startsWith(possessorPrefix)) {
            core = core.slice(possessorPrefix.length);
          }
          if (predicateState === "possessive") {
            for (const connector of ["wan", "w"]) {
              if (core.length > connector.length && core.endsWith(connector)) {
                addStem(core.slice(0, -connector.length));
                return;
              }
            }
            return;
          }
          for (const connector of ["ket", "ki", "k"]) {
            if (core.length > connector.length && core.endsWith(connector)) {
              addStem(`${core.slice(0, -connector.length)}ka`);
              return;
            }
          }
        });
        return stems;
      };
      const renderActiveActionCompoundEmbedContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "sustantivo-verbal" || typeof targetObject.buildActiveActionCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const actionNominalSurfaces = getActionNominalSurfacesFromEvaluation(evaluation);
        if (!actionNominalSurfaces.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getActiveActionCompoundEmbedMatrixInventory === "function" ? targetObject.getActiveActionCompoundEmbedMatrixInventory() : [{
          id: "tzahtzi",
          nawatRoot: "tzajtzi",
          label: "shout with the embedded action"
        }];
        const contracts = actionNominalSurfaces.flatMap(actionNominalSurface => matrixInventory.map(matrixSpec => targetObject.buildActiveActionCompoundEmbedContinuationContract({
          actionNominalSurface,
          sourceSurface: actionNominalSurface,
          matrixRoot: matrixSpec.nawatRoot || "tzajtzi"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyActiveActionCompoundContract = contract => {
          if (typeof targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry({
              actionNominalSurface: contract.actionNominalSurface,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || ""
            });
          }
        };
        const createActiveActionCompoundButton = contract => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.activeActionCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.actionNominalSurface = contract.actionNominalSurface;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida: ${contract.actionNominalSurface}`, `incrustado: ${contract.incorporatedRoot}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 37.5.4: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyActiveActionCompoundContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-active-action-compound-embed-continuation]")).some(button => button.dataset.compoundVerb === contract.compoundVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createActiveActionCompoundButton(contract));
          }
        });
        return true;
      };
      const renderActiveActionNominalCompoundContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "sustantivo-verbal" || typeof targetObject.buildActiveActionNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const actionNominalSurfaces = getActionNominalSurfacesFromEvaluation(evaluation);
        if (!actionNominalSurfaces.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getActiveActionNominalCompoundMatrixInventory === "function" ? targetObject.getActiveActionNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = actionNominalSurfaces.flatMap(actionNominalSurface => matrixInventory.map(matrixSpec => targetObject.buildActiveActionNominalCompoundContinuationContract({
          actionNominalSurface,
          sourceSurface: actionNominalSurface,
          matrixRoot: matrixSpec.nawatRoot || "kal"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyActiveActionNominalContract = contract => {
          if (typeof targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry({
              actionNominalSurface: contract.actionNominalSurface,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput
            });
          }
        };
        const createActiveActionNominalButton = contract => {
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.activeActionNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = contract.ordinaryNncInput;
          continueButton.dataset.actionNominalSurface = contract.actionNominalSurface;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${contract.ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida: ${contract.actionNominalSurface}`, `incrustado: ${contract.incorporatedRoot}`, `matriz nominal: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 37.5.4: ${contract.matrix.classicalMatrix}` : "", `S: ${contract.ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyActiveActionNominalContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-active-action-nominal-compound-continuation]")).some(button => button.dataset.ordinaryNncInput === contract.ordinaryNncInput);
          if (!alreadyRendered) {
            actions.appendChild(createActiveActionNominalButton(contract));
          }
        });
        return true;
      };
      const renderCustomaryAgentiveNominalCompoundContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo" || typeof targetObject.buildCustomaryAgentiveNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const customaryAgentiveStems = getCustomaryAgentiveStemsFromEvaluation(evaluation);
        if (!customaryAgentiveStems.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getCustomaryAgentiveNominalCompoundMatrixInventory === "function" ? targetObject.getCustomaryAgentiveNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = customaryAgentiveStems.flatMap(customaryAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildCustomaryAgentiveNominalCompoundContinuationContract({
          customaryAgentiveStem,
          sourceSurface: customaryAgentiveStem,
          matrixRoot: matrixSpec.nawatRoot || "kal"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCustomaryAgentiveNominalContract = contract => {
          if (typeof targetObject.applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyCustomaryAgentiveNominalCompoundToOrdinaryNncEntry({
              customaryAgentiveStem: contract.customaryAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput
            });
          }
        };
        const createCustomaryAgentiveNominalButton = contract => {
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.customaryAgentiveNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = contract.ordinaryNncInput;
          continueButton.dataset.customaryAgentiveStem = contract.customaryAgentiveStem;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${contract.ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva habitual: ${contract.sourceSurface || contract.customaryAgentiveStem}`, `nominalizado completo: ${contract.customaryAgentiveStem}`, `matriz nominal: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 36.3: ${contract.matrix.classicalMatrix}` : "", `S: ${contract.ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCustomaryAgentiveNominalContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-customary-agentive-nominal-compound-continuation]")).some(button => button.dataset.ordinaryNncInput === contract.ordinaryNncInput);
          if (!alreadyRendered) {
            actions.appendChild(createCustomaryAgentiveNominalButton(contract));
          }
        });
        return true;
      };
      const renderCustomaryAgentiveCompoundEmbedContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo" || typeof targetObject.buildCustomaryAgentiveCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const customaryAgentiveStems = getCustomaryAgentiveStemsFromEvaluation(evaluation);
        if (!customaryAgentiveStems.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getCustomaryAgentiveCompoundEmbedMatrixInventory === "function" ? targetObject.getCustomaryAgentiveCompoundEmbedMatrixInventory() : [{
          id: "toca-incorporated-complement",
          nawatRoot: "tuka",
          objectPrefix: "ki",
          label: "consider as the embedded fully nominalized customary-agentive entity"
        }];
        const contracts = customaryAgentiveStems.flatMap(customaryAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildCustomaryAgentiveCompoundEmbedContinuationContract({
          customaryAgentiveStem,
          sourceSurface: customaryAgentiveStem,
          matrixRoot: matrixSpec.nawatRoot || "tuka",
          objectPrefix: matrixSpec.objectPrefix || "ki"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCustomaryAgentiveCompoundEmbedContract = contract => {
          if (typeof targetObject.applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyCustomaryAgentiveCompoundEmbedRootsToVerbEntry({
              customaryAgentiveStem: contract.customaryAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix,
              compoundVerbInput: contract.compoundVerbInput
            });
          }
        };
        const createCustomaryAgentiveCompoundEmbedButton = contract => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput,
            objectPrefix: contract.objectPrefix
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.customaryAgentiveCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.customaryAgentiveStem = contract.customaryAgentiveStem;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.objectPrefix = contract.objectPrefix || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva habitual: ${contract.sourceSurface || contract.customaryAgentiveStem}`, `nominalizado completo: ${contract.customaryAgentiveStem}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 36.3: ${contract.matrix.classicalMatrix}` : "", contract.objectPrefix ? `objeto: ${contract.objectPrefix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCustomaryAgentiveCompoundEmbedContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-customary-agentive-compound-embed-continuation]")).some(button => button.dataset.compoundVerb === contract.compoundVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createCustomaryAgentiveCompoundEmbedButton(contract));
          }
        });
        return true;
      };
      const renderPreteritAgentiveCompoundEmbedContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPreteritAgentiveCompoundEmbedMatrixInventory === "function" ? targetObject.getPreteritAgentiveCompoundEmbedMatrixInventory() : [{
          id: "tzahtzi",
          nawatRoot: "tzajtzi",
          label: "shout with the embedded preterit-agentive stem"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveCompoundEmbedContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          matrixRoot: matrixSpec.nawatRoot || "tzajtzi"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveCompoundContract = contract => {
          if (typeof targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyActiveActionCompoundEmbedRootsToVerbEntry({
              actionNominalSurface: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || ""
            });
          }
        };
        const createPreteritAgentiveCompoundButton = contract => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 35.7: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveCompoundContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-compound-embed-continuation]")).some(button => button.dataset.compoundVerb === contract.compoundVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createPreteritAgentiveCompoundButton(contract));
          }
        });
        return true;
      };
      const renderPreteritAgentiveNominalCompoundContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPreteritAgentiveNominalCompoundMatrixInventory === "function" ? targetObject.getPreteritAgentiveNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveNominalCompoundContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          matrixRoot: matrixSpec.nawatRoot || "kal"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveNominalContract = contract => {
          if (typeof targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyActiveActionNominalCompoundToOrdinaryNncEntry({
              actionNominalSurface: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput
            });
          }
        };
        const createPreteritAgentiveNominalButton = contract => {
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.preteritAgentiveNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = contract.ordinaryNncInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${contract.ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz nominal: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 35.7: ${contract.matrix.classicalMatrix}` : "", `S: ${contract.ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveNominalContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-nominal-compound-continuation]")).some(button => button.dataset.ordinaryNncInput === contract.ordinaryNncInput);
          if (!alreadyRendered) {
            actions.appendChild(createPreteritAgentiveNominalButton(contract));
          }
        });
        return true;
      };
      const renderPreteritAgentiveOwnerhoodContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveOwnerhoodContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPreteritAgentiveOwnerhoodMatrixInventory === "function" ? targetObject.getPreteritAgentiveOwnerhoodMatrixInventory() : [{
          id: "tla-hua-ownerhood",
          nawatRoot: "wa",
          surfaceMatrix: "waj",
          ownerhoodKind: "ownerhood"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveOwnerhoodContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          matrixRoot: matrixSpec.nawatRoot || "wa"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveOwnerhoodContract = contract => {
          if (typeof targetObject.applyPreteritAgentiveOwnerhoodRootsToVerbEntry === "function") {
            targetObject.applyPreteritAgentiveOwnerhoodRootsToVerbEntry({
              preteritAgentiveStem: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              ownerhoodVerbInput: contract.ownerhoodVerbInput
            });
          }
        };
        const createPreteritAgentiveOwnerhoodButton = contract => {
          const ownerhoodVerbInput = contract.ownerhoodVerbInput;
          const previewSurface = getPreteritAgentiveOwnerhoodPreviewSurface({
            ownerhoodVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveOwnerhoodContinuation = "true";
          continueButton.dataset.ownerhoodVerbInput = ownerhoodVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.ownerhoodMatrixRoot = contract.matrixRoot;
          continueButton.dataset.ownerhoodMatrixId = contract.matrix?.id || "";
          continueButton.dataset.ownerhoodKind = contract.ownerhoodKind || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || ownerhoodVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz de posesión: ${contract.matrixRoot}`, contract.ownerhoodKind ? `tipo: ${contract.ownerhoodKind}` : "", contract.matrix?.classicalMatrix ? `${contract.grammarSource}: ${contract.matrix.classicalMatrix}` : "", `V pretérito: ${ownerhoodVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveOwnerhoodContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-ownerhood-continuation]")).some(button => button.dataset.ownerhoodVerbInput === contract.ownerhoodVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createPreteritAgentiveOwnerhoodButton(contract));
          }
        });
        return true;
      };
      const renderPreteritAgentiveComplementContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveComplementContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPreteritAgentiveComplementMatrixInventory === "function" ? targetObject.getPreteritAgentiveComplementMatrixInventory() : [{
          id: "te-tla-mati",
          nawatRoot: "mati",
          objectPrefix: "ki"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveComplementContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          matrixRoot: matrixSpec.nawatRoot || "mati",
          objectPrefix: matrixSpec.objectPrefix || "ki"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveComplementContract = contract => {
          if (typeof targetObject.applyPreteritAgentiveComplementRootsToVerbEntry === "function") {
            targetObject.applyPreteritAgentiveComplementRootsToVerbEntry({
              preteritAgentiveStem: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix || "ki",
              complementVerbInput: contract.complementVerbInput
            });
          }
        };
        const createPreteritAgentiveComplementButton = contract => {
          const complementVerbInput = contract.complementVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: complementVerbInput,
            objectPrefix: contract.objectPrefix || "ki"
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveComplementContinuation = "true";
          continueButton.dataset.complementVerbInput = complementVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.complementMatrixRoot = contract.matrixRoot;
          continueButton.dataset.complementMatrixId = contract.matrix?.id || "";
          continueButton.dataset.objectPrefix = contract.objectPrefix || "ki";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || complementVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz de complemento: ${contract.matrixRoot}`, `objeto: ${contract.objectPrefix || "ki"}`, contract.matrix?.classicalMatrix ? `Andrews 35.12: ${contract.matrix.classicalMatrix}` : "", `V: ${complementVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveComplementContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-complement-continuation]")).some(button => button.dataset.complementVerbInput === contract.complementVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createPreteritAgentiveComplementButton(contract));
          }
        });
        return true;
      };
      const renderPreteritAgentiveAdverbialContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "agentivo-preterito" || typeof targetObject.buildPreteritAgentiveAdverbialContinuationContract !== "function") {
          return false;
        }
        const generalUseStems = getPreteritAgentiveGeneralUseStemsFromEvaluation(evaluation);
        if (!generalUseStems.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPreteritAgentiveAdverbialMatrixInventory === "function" ? targetObject.getPreteritAgentiveAdverbialMatrixInventory() : [{
          id: "nemi-adverbial-manner",
          nawatRoot: "nemi",
          objectPrefix: "",
          matrixValency: "intransitive"
        }];
        const contracts = generalUseStems.flatMap(preteritAgentiveStem => matrixInventory.map(matrixSpec => targetObject.buildPreteritAgentiveAdverbialContinuationContract({
          preteritAgentiveStem,
          sourceSurface: preteritAgentiveStem,
          matrixRoot: matrixSpec.nawatRoot || "nemi",
          objectPrefix: matrixSpec.objectPrefix || ""
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyPreteritAgentiveAdverbialContract = contract => {
          if (typeof targetObject.applyPreteritAgentiveAdverbialRootsToVerbEntry === "function") {
            targetObject.applyPreteritAgentiveAdverbialRootsToVerbEntry({
              preteritAgentiveStem: contract.preteritAgentiveStem,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix || "",
              adverbialVerbInput: contract.adverbialVerbInput
            });
          }
        };
        const createPreteritAgentiveAdverbialButton = contract => {
          const adverbialVerbInput = contract.adverbialVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: adverbialVerbInput,
            objectPrefix: contract.objectPrefix || ""
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.preteritAgentiveAdverbialContinuation = "true";
          continueButton.dataset.adverbialVerbInput = adverbialVerbInput;
          continueButton.dataset.preteritAgentiveStem = contract.preteritAgentiveStem;
          continueButton.dataset.adverbialMatrixRoot = contract.matrixRoot;
          continueButton.dataset.adverbialMatrixId = contract.matrix?.id || "";
          continueButton.dataset.objectPrefix = contract.objectPrefix || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || adverbialVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida agentiva pretérita: ${contract.sourceSurface || contract.preteritAgentiveStem}`, `uso general: ${contract.preteritAgentiveStem}`, `matriz adverbial: ${contract.matrixRoot}`, contract.adverbialFocus ? `foco: ${contract.adverbialFocus}` : "", contract.objectPrefix ? `objeto: ${contract.objectPrefix}` : "", contract.matrix?.classicalMatrix ? `Andrews 35.12: ${contract.matrix.classicalMatrix}` : "", `V: ${adverbialVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPreteritAgentiveAdverbialContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-preterit-agentive-adverbial-continuation]")).some(button => button.dataset.adverbialVerbInput === contract.adverbialVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createPreteritAgentiveAdverbialButton(contract));
          }
        });
        return true;
      };
      const renderPatientivoNominalCompoundContinuation = ({
        value,
        evaluation,
        patientivoSource = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || patientivoSource === "tronco-verbal" || typeof targetObject.buildPatientivoNominalCompoundContinuationContract !== "function") {
          return false;
        }
        const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation);
        if (!patientivoSurface) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPatientivoNominalCompoundMatrixInventory === "function" ? targetObject.getPatientivoNominalCompoundMatrixInventory() : [{
          id: "cal-li",
          nawatRoot: "kal",
          nounClass: "zero",
          animacy: "inanimate"
        }];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildPatientivoNominalCompoundContinuationContract({
          patientivoSurface,
          sourceSurface: "",
          patientivoNominalSuffix: activePatientivoNominalSuffix,
          matrixRoot: matrixSpec.nawatRoot || "kal"
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyNominalCompoundContinuationContract = contract => {
          if (typeof targetObject.applyPatientivoNominalCompoundToOrdinaryNncEntry === "function") {
            targetObject.applyPatientivoNominalCompoundToOrdinaryNncEntry({
              incorporatedRoot: contract.incorporatedRoot,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              nounClass: contract.matrix?.nounClass || "zero",
              animacy: contract.matrix?.animacy || "inanimate",
              compoundStem: contract.compoundStem,
              ordinaryNncInput: contract.ordinaryNncInput
            });
          }
        };
        const createNominalCompoundContinuationButton = contract => {
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const ordinaryNncInput = contract.ordinaryNncInput;
          const previewSurface = getNominalCompoundPreviewSurface({
            ordinaryNncRequest: contract.ordinaryNncRequest
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
          continueButton.dataset.patientivoNominalCompoundContinuation = "true";
          continueButton.dataset.ordinaryNncInput = ordinaryNncInput;
          continueButton.dataset.nominalCompoundStem = contract.compoundStem;
          continueButton.dataset.nominalCompoundMatrixRoot = matrixRoot;
          continueButton.dataset.nominalCompoundMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = previewSurface ? `→ ${previewSurface}` : `S→ ${ordinaryNncInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${patientivoSurface}`, `raíz incorporada: ${incorporatedRoot}`, `matriz nominal: ${matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.6: ${contract.matrix.classicalMatrix}` : "", `S: ${ordinaryNncInput}`, previewSurface ? `salida S: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyNominalCompoundContinuationContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-nominal-compound-continuation]")).some(button => button.dataset.ordinaryNncInput === contract.ordinaryNncInput);
          if (!alreadyRendered) {
            actions.appendChild(createNominalCompoundContinuationButton(contract));
          }
        });
        return true;
      };
      const renderPatientivoAdjectivalFunctionContinuation = ({
        value,
        evaluation,
        patientivoSource = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.buildPatientivoAdjectivalNncFunctionOutput !== "function") {
          return false;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const contracts = forms.map(form => targetObject.buildPatientivoAdjectivalNncFunctionOutput({
          patientivoSurface: form,
          patientivoSource,
          nominalizationProfile: evaluation?.result?.nominalizationProfile || null,
          formulaSlots: evaluation?.result?.nuclearClauseShell?.formulaSlots || null,
          formulaEcho: evaluation?.result?.nuclearClauseShell?.formulaEcho || ""
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const createAdjectivalFunctionButton = contract => {
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo"].join(" ");
          continueButton.dataset.patientivoAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = contract.result || "";
          continueButton.dataset.adjectivalFunction = contract.adjectivalNncFunctionFrame?.functionKind || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${contract.result}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Adj NNC";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida patientiva: ${contract.result}`, "Andrews 40.4: NNC patientiva en funcion adjetival", contract.formulaEcho ? `Formula NNC: ${contract.formulaEcho}` : "", contract.adjectivalNncFunctionFrame?.patientivoSource ? `fuente patientiva: ${contract.adjectivalNncFunctionFrame.patientivoSource}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            if (typeof targetObject.applyAdjectivalNncFunctionToVerbEntry === "function") {
              targetObject.applyAdjectivalNncFunctionToVerbEntry({
                surface: contract.result,
                formation: "patientive-adjectival",
                formulaEcho: contract.formulaEcho || "",
                patientivoSource: contract.adjectivalNncFunctionFrame?.patientivoSource || ""
              });
            }
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-adjectival-function-continuation]")).some(button => button.dataset.targetSurface === contract.result);
          if (!alreadyRendered) {
            actions.appendChild(createAdjectivalFunctionButton(contract));
          }
        });
        return true;
      };
      const renderNominalizedVncAdjectivalFunctionContinuation = ({
        value,
        evaluation
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || typeof targetObject.buildNominalizedVncAdjectivalNncFunctionOutput !== "function") {
          return false;
        }
        const nominalizationProfile = evaluation?.result?.nominalizationProfile || null;
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (!forms.length || !nominalizationProfile) {
          return false;
        }
        const predicateState = nominalizationProfile?.predicateState?.value || "absolutive";
        const contracts = forms.map(form => targetObject.buildNominalizedVncAdjectivalNncFunctionOutput({
          nominalizedSurface: form,
          state: predicateState,
          nominalizationProfile,
          formulaSlots: evaluation?.result?.nuclearClauseShell?.formulaSlots || null,
          formulaEcho: evaluation?.result?.nuclearClauseShell?.formulaEcho || ""
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const createNominalizedVncAdjectivalButton = contract => {
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-adjetivo"].join(" ");
          continueButton.dataset.nominalizedVncAdjectivalFunctionContinuation = "true";
          continueButton.dataset.targetSurface = contract.result || "";
          continueButton.dataset.nominalizedVncKind = contract.adjectivalNncFunctionFrame?.nominalizationKind || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${contract.result}`;
          continueButton.appendChild(continueLabel);
          const continueSubLabel = targetObject.document.createElement("span");
          continueSubLabel.className = "calc-guidance__chip-sublabel";
          continueSubLabel.textContent = "Adj NNC";
          continueButton.appendChild(continueSubLabel);
          continueButton.title = [`#3 salida nominalizada: ${contract.result}`, `${contract.adjectivalNncFunctionFrame?.lessonRef}: NNC nominalizada en funcion adjetival`, contract.formulaEcho ? `Formula NNC: ${contract.formulaEcho}` : "", contract.adjectivalNncFunctionFrame?.nominalizationKind ? `nominalizacion: ${contract.adjectivalNncFunctionFrame.nominalizationKind}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            if (typeof targetObject.applyAdjectivalNncFunctionToVerbEntry === "function") {
              targetObject.applyAdjectivalNncFunctionToVerbEntry({
                surface: contract.result,
                formation: "nominalized-vnc-adjectival",
                formulaEcho: contract.formulaEcho || "",
                nominalizedVncKind: contract.adjectivalNncFunctionFrame?.nominalizationKind || ""
              });
            }
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-nominalized-vnc-adjectival-function-continuation]")).some(button => button.dataset.targetSurface === contract.result);
          if (!alreadyRendered) {
            actions.appendChild(createNominalizedVncAdjectivalButton(contract));
          }
        });
        return true;
      };
      const renderPatientivoCompoundEmbedContinuation = ({
        value,
        evaluation,
        patientivoSource = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || patientivoSource === "tronco-verbal" || typeof targetObject.buildPatientivoCompoundEmbedContinuationContract !== "function") {
          return false;
        }
        const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation);
        if (!patientivoSurface) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPatientivoCompoundEmbedMatrixInventory === "function" ? targetObject.getPatientivoCompoundEmbedMatrixInventory() : [{
          id: "miqui",
          nawatRoot: "miki",
          label: "die/be affected as"
        }];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildPatientivoCompoundEmbedContinuationContract({
          patientivoSurface,
          sourceSurface: "",
          patientivoNominalSuffix: activePatientivoNominalSuffix,
          matrixRoot: matrixSpec.nawatRoot || "miki"
        })).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCompoundEmbedContinuationContract = contract => {
          if (typeof targetObject.applyPatientivoCompoundEmbedRootsToVerbEntry === "function") {
            targetObject.applyPatientivoCompoundEmbedRootsToVerbEntry({
              incorporatedRoot: contract.incorporatedRoot,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || ""
            });
          }
        };
        const createCompoundEmbedContinuationButton = contract => {
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCompoundEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoCompoundEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.compoundMatrixRoot = matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${patientivoSurface}`, `raíz incorporada: ${incorporatedRoot}`, `raíz matriz: ${matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.6: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCompoundEmbedContinuationContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-compound-embed-continuation]")).some(button => button.dataset.compoundVerb === contract.compoundVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createCompoundEmbedContinuationButton(contract));
          }
        });
        return true;
      };
      const renderPatientivoCharacteristicPropertyEmbedContinuation = ({
        value,
        evaluation,
        possessorPrefix = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || resolvedTense !== "calificativo-instrumentivo" || typeof targetObject.buildPatientivoCharacteristicPropertyEmbedContinuationContract !== "function") {
          return false;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        if (!forms.length) {
          return false;
        }
        const matrixInventory = typeof targetObject.getPatientivoCharacteristicPropertyMatrixInventory === "function" ? targetObject.getPatientivoCharacteristicPropertyMatrixInventory() : [{
          id: "chic-a-hu-a",
          nawatRoot: "chikawa",
          matrixValency: "transitive"
        }];
        const contracts = forms.flatMap(form => matrixInventory.map(matrixSpec => targetObject.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
          characteristicSurface: form,
          sourceSurface: form,
          possessorPrefix,
          matrixRoot: matrixSpec.nawatRoot || "chikawa"
        }))).filter(entry => entry?.supported);
        if (!contracts.length) {
          return false;
        }
        const actions = ensurePatientivoContinuationDisplay({
          value,
          evaluation
        });
        if (!actions) {
          return false;
        }
        const applyCharacteristicPropertyEmbedContract = contract => {
          if (typeof targetObject.applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry === "function") {
            targetObject.applyPatientivoCharacteristicPropertyEmbedRootsToVerbEntry({
              incorporatedRoot: contract.incorporatedRoot,
              matrixRoot: contract.matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: contract.objectPrefix || "ki"
            });
          }
        };
        const createCharacteristicPropertyContinuationButton = contract => {
          const compoundVerbInput = contract.compoundVerbInput;
          const previewSurface = getCharacteristicPropertyEmbedFinitePreviewSurface({
            compoundVerb: compoundVerbInput,
            objectPrefix: contract.objectPrefix || "ki"
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoCharacteristicPropertyEmbedContinuation = "true";
          continueButton.dataset.compoundVerb = compoundVerbInput;
          continueButton.dataset.compoundMatrixRoot = contract.matrixRoot;
          continueButton.dataset.compoundMatrixId = contract.matrix?.id || "";
          continueButton.dataset.omittedSuffix = contract.omittedSuffix || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || compoundVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida: ${contract.characteristicSurface}`, `raíz incorporada: ${contract.incorporatedRoot}`, `omite: -${contract.omittedSuffix}`, `raíz matriz: ${contract.matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.9: ${contract.matrix.classicalMatrix}` : "", `V: ${compoundVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyCharacteristicPropertyEmbedContract(contract);
          });
          return continueButton;
        };
        contracts.forEach(contract => {
          const alreadyRendered = Array.from(actions.querySelectorAll("[data-patientivo-characteristic-property-embed-continuation]")).some(button => button.dataset.compoundVerb === contract.compoundVerbInput);
          if (!alreadyRendered) {
            actions.appendChild(createCharacteristicPropertyContinuationButton(contract));
          }
        });
        return true;
      };
      const renderPatientivoPrelocativeContinuation = ({
        value,
        evaluation,
        selection = {},
        number = "",
        possessorPrefix = "",
        patientivoSource = "",
        sourceTenseValue = "",
        sourceCombinedMode = ""
      } = {}) => {
        if (!value || evaluation?.shouldMaskRow || patientivoSource === "tronco-verbal") {
          return false;
        }
        const sourceObjectPrefix = resolvePatientivoOriginSourceObjectPrefix(patientivoSource);
        const sourceSurface = resolvePatientivoSourceSurfaceForContinuation({
          evaluation,
          patientivoSource,
          objectPrefix: sourceObjectPrefix,
          sourceTenseValue,
          sourceCombinedMode
        });
        const patientivoSurface = resolvePatientivoSurfaceFromEvaluation(evaluation);
        if (typeof targetObject.buildPatientivoPrelocativeContinuationContract !== "function") {
          return false;
        }
        const matrixInventory = typeof targetObject.getPatientivoPrelocativeMatrixInventory === "function" ? targetObject.getPatientivoPrelocativeMatrixInventory() : [{
          id: "tla-tlani",
          nawatRoot: "tajtani",
          label: "want/request"
        }];
        const contracts = matrixInventory.map(matrixSpec => targetObject.buildPatientivoPrelocativeContinuationContract({
          patientivoSurface,
          sourceSurface,
          selection,
          possessorPrefix,
          patientivoSource,
          sourceTenseValue,
          sourceCombinedMode,
          patientivoNominalSuffix: activePatientivoNominalSuffix,
          matrixRoot: matrixSpec.nawatRoot || "ni"
        })).filter(entry => entry?.supported);
        if (!sourceSurface || !patientivoSurface || !contracts.length) {
          return false;
        }
        const applyPrelocativeContinuationContract = contract => {
          const objectTransfer = contract.objectTransfer;
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const routeStore = typeof targetObject.getNawatRouteStateStore === "function" ? targetObject.getNawatRouteStateStore() : null;
          if (routeStore) {
            routeStore.activeNawatLineId = "locative";
            routeStore.__NAWAT_ACTIVE_LINE_ID__ = "locative";
            routeStore.activeNawatLineStationKey = "prelocative";
            routeStore.activeLocativeSourceVerb = verb;
            routeStore.activeLocativeSourceTenseValue = sourceTenseValue;
            routeStore.activeLocativeSourceSurface = sourceSurface;
            routeStore.activeLocativePatientivoSurface = patientivoSurface;
            routeStore.activeLocativeIncorporatedRoot = incorporatedRoot;
            routeStore.activeLocativeMatrixRoot = matrixRoot;
            routeStore.activeLocativePromotedObjectPrefix = objectTransfer.objectPrefix;
            routeStore.activeLocativeSourcePossessorPrefix = possessorPrefix || "";
            routeStore.activeLocativeMatrixSpecId = contract.matrix?.id || "";
          }
          if (typeof targetObject.applyPrelocativeRootsToVerbEntry === "function") {
            targetObject.applyPrelocativeRootsToVerbEntry({
              incorporatedRoot,
              matrixRoot,
              matrixSpecId: contract.matrix?.id || "",
              objectPrefix: objectTransfer.objectPrefix,
              possessorPrefix: possessorPrefix || ""
            });
          }
        };
        const createPrelocativeContinuationButton = contract => {
          const objectTransfer = contract.objectTransfer;
          const incorporatedRoot = contract.incorporatedRoot;
          const matrixRoot = contract.matrixRoot;
          const prelocativeVerbInput = contract.prelocativeVerbInput;
          const previewSurface = getPrelocativeFinitePreviewSurface({
            incorporatedRoot,
            matrixRoot,
            objectPrefix: objectTransfer.objectPrefix,
            prelocativeVerb: prelocativeVerbInput
          });
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoPrelocativeContinuation = "true";
          continueButton.dataset.prelocativeVerb = prelocativeVerbInput;
          continueButton.dataset.prelocativeObjectPrefix = objectTransfer.objectPrefix;
          continueButton.dataset.prelocativeMatrixRoot = matrixRoot;
          continueButton.dataset.prelocativeMatrixId = contract.matrix?.id || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${previewSurface || prelocativeVerbInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${patientivoSurface}`, `raíz incorporada: ${incorporatedRoot}`, `raíz matriz: ${matrixRoot}`, contract.matrix?.classicalMatrix ? `Andrews 39.8: ${contract.matrix.classicalMatrix}` : "", `V: ${prelocativeVerbInput}`, previewSurface ? `salida V: ${previewSurface}` : "", objectTransfer.label].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            applyPrelocativeContinuationContract(contract);
          });
          return continueButton;
        };
        const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
        const surfaceDisplay = forms.length ? forms.join(" / ") : String(evaluation?.result?.result || "").trim();
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        const groupedSurfaceDisplay = typeof targetObject.formatConjugationDisplay === "function" ? targetObject.formatConjugationDisplay(surfaceDisplay) : surfaceDisplay;
        groupedSurfaceDisplay.split(/\n+/).map(line => line.trim()).filter(Boolean).forEach(line => {
          const lineElement = targetObject.document.createElement("span");
          lineElement.className = "conjugation-conversion-surface-line";
          lineElement.textContent = line;
          surfaceText.appendChild(lineElement);
        });
        const continuationActions = targetObject.document.createElement("span");
        continuationActions.className = "conjugation-conversion-actions";
        contracts.forEach(contract => {
          continuationActions.appendChild(createPrelocativeContinuationButton(contract));
        });
        value.append(surfaceText, continuationActions);
        return true;
      };
      const updatePatientivoBlockDestination = (entry = {}) => {
        if (!entry.destinationSlot) {
          return;
        }
        entry.destinationSlot.replaceChildren();
        entry.destinationSlot.hidden = true;
        entry.block?.classList.remove("tense-block--has-destination-menu");
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
        const conversionEntries = [];
        const seenConversionEntries = new Set();
        conversionStems.forEach(stem => {
          NAWAT_TRONCO_CONVERSION_ROUTE_SPECS.forEach(spec => {
            const track = buildNawatTroncoConversionTrack({
              routeKey: spec.routeKey,
              stem,
              sourceVerb,
              sourceObjectPrefix
            });
            if (!track?.routeKey || !track.destination) {
              return;
            }
            const key = [track.routeKey, track.targetInput || "", track.destination || ""].join("|");
            if (seenConversionEntries.has(key)) {
              return;
            }
            seenConversionEntries.add(key);
            conversionEntries.push({
              stem,
              track
            });
          });
        });
        if (!conversionEntries.length) {
          return conversionStems;
        }
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
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
        const conversionActions = targetObject.document.createElement("span");
        conversionActions.className = "conjugation-conversion-actions";
        conversionEntries.forEach(({
          stem,
          track
        }) => {
          const routeProfile = typeof targetObject.getNawatRouteProfile === "function" ? targetObject.getNawatRouteProfile(track.routeKey) : null;
          const continueButton = targetObject.document.createElement("button");
          continueButton.type = "button";
          continueButton.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-verbo"].join(" ");
          continueButton.dataset.patientivoTroncoConversion = "true";
          continueButton.dataset.nawatRouteKey = track.routeKey;
          continueButton.dataset.troncoStem = stem;
          continueButton.dataset.targetInput = track.targetInput || "";
          continueButton.dataset.targetSurface = track.destination || "";
          const continueLabel = targetObject.document.createElement("span");
          continueLabel.className = "calc-guidance__chip-label";
          continueLabel.textContent = `→ ${track.destination || track.targetInput}`;
          continueButton.appendChild(continueLabel);
          continueButton.title = [`#3 salida patientiva: ${forms.join(" / ")}`, `tronco incorporable: ${stem}`, routeProfile?.verbalizer ? `verbalizador: ${routeProfile.verbalizer}` : "", routeProfile?.nawatTenseValue ? `tiempo: ${routeProfile.nawatTenseValue}` : "", track.targetInput ? `V: ${track.targetInput}` : "", track.destination ? `salida V: ${track.destination}` : ""].filter(Boolean).join("; ");
          continueButton.addEventListener("click", () => {
            targetObject.activateNawatRouteStation(track.routeKey, "finite-tense", {
              render: true,
              anchorElement: continueButton,
              sourceVerb,
              sourceObjectPrefix,
              sourceStem: stem
            });
          });
          conversionActions.appendChild(continueButton);
        });
        value.append(surfaceText, conversionActions);
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
        instrumentivoMode = "",
        actionNounStemUse = "",
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
        const cacheKey = [selection.subjectPrefix || "", selection.subjectSuffix || "", number || "", possessorPrefix || "", resolvedObjectPrefix || "", resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || "", resolvedPatientivoSource || "", resolvedPatientivoSourceTenseValue, resolvedPatientivoSourceCombinedMode, ownershipSelections.join(","), resolvedPatientivoNominalSuffix === null ? "*" : resolvedPatientivoNominalSuffix, targetObject.resolvedNominalControlCombinedMode || "", instrumentivoMode || "", actionNounStemUse || "", useReduplicatedSingularSurface ? "redup" : "plain"].join("|");
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
            const resolvedInstrumentivoMode = instrumentivoMode || (possessorPrefix === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo);
            result = targetObject.getInstrumentivoResult({
              rawVerb: verb,
              verbMeta,
              subjectPrefix: selection.subjectPrefix,
              subjectSuffix: selection.subjectSuffix,
              objectPrefix: resolvedObjectPrefix,
              indirectObjectMarker: resolvedIndirectObjectMarker,
              thirdObjectMarker: resolvedThirdObjectMarker,
              mode: resolvedInstrumentivoMode,
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
              possessivePrefix: possessorPrefix,
              actionNounStemUse,
              combinedMode: targetObject.resolvedNominalControlCombinedMode
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
            thirdObjectMarker: resolvedThirdObjectMarker
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
      const renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation = ({
        row = null,
        value,
        selection,
        number,
        possessorPrefix = "",
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        evaluation = null
      } = {}) => {
        if (resolvedTense !== "calificativo-instrumentivo" || !value || possessorPrefix || typeof targetObject.resolveNawatPossessorPrefixFromSourceSubject !== "function") {
          return false;
        }
        const derivedPossessorPrefix = targetObject.resolveNawatPossessorPrefixFromSourceSubject(selection?.subjectPrefix || "", selection?.subjectSuffix || "");
        if (!derivedPossessorPrefix) {
          return false;
        }
        const generalUseEvaluation = evaluateNounCombinationState({
          selection,
          number,
          possessorPrefix: "",
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          actionNounStemUse: "general-use"
        });
        if (generalUseEvaluation?.shouldMaskRow || !generalUseEvaluation?.result?.result || generalUseEvaluation.result.result === evaluation?.result?.result) {
          return false;
        }
        let actions = value.querySelector?.(".conjugation-conversion-actions") || null;
        if (!actions) {
          const forms = getConjugationSurfaceForms(evaluation?.result).filter((form, index, list) => form && list.indexOf(form) === index);
          const sourceSurface = forms.length ? forms.join(" / ") : String(evaluation?.result?.result || "").trim();
          value.replaceChildren();
          value.classList.remove("conjugation-error", "conjugation-reflexive");
          value.classList.add("conjugation-value--conversion-picker");
          if (sourceSurface && sourceSurface !== "—") {
            const surfaceText = targetObject.document.createElement("span");
            surfaceText.className = "conjugation-conversion-surface";
            const groupedSurfaceDisplay = typeof targetObject.formatConjugationDisplay === "function" ? targetObject.formatConjugationDisplay(sourceSurface) : sourceSurface;
            groupedSurfaceDisplay.split(/\n+/).map(line => line.trim()).filter(Boolean).forEach(line => {
              const lineElement = targetObject.document.createElement("span");
              lineElement.className = "conjugation-conversion-surface-line";
              lineElement.textContent = line;
              surfaceText.appendChild(lineElement);
            });
            value.appendChild(surfaceText);
          }
          actions = targetObject.document.createElement("span");
          actions.className = "conjugation-conversion-actions";
          value.appendChild(actions);
        }
        const alreadyRendered = Array.from(actions.querySelectorAll("[data-action-noun-source-subject-possessor]")).some(button => button.dataset.targetSurface === generalUseEvaluation.result.result);
        if (alreadyRendered) {
          return true;
        }
        const action = targetObject.document.createElement("button");
        action.type = "button";
        action.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
        action.dataset.actionNounSourceSubjectPossessor = derivedPossessorPrefix;
        action.dataset.actionNounStemUse = "general-use";
        action.dataset.targetSurface = generalUseEvaluation.result.result || "";
        const label = targetObject.document.createElement("span");
        label.className = "calc-guidance__chip-label";
        label.textContent = `→ ${generalUseEvaluation.result.result}`;
        action.appendChild(label);
        action.title = ["Andrews 36.10-36.11: sujeto fuente → poseedor", `poseedor: ${derivedPossessorPrefix}`, `uso general: ${generalUseEvaluation.result.result}`].join("; ");
        actions.appendChild(action);
        if (row) {
          row.dataset.availabilityState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
          row.dataset.diagnosticState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
          row.dataset.diagnosticIds = "";
        }
        value.dataset.availabilityState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
        value.dataset.diagnosticState = targetObject.CONJUGATION_AVAILABILITY_STATE.viable;
        value.dataset.diagnosticIds = "";
        return true;
      };
      const renderInstrumentivoSourceSubjectPossessiveContinuation = ({
        value,
        selection,
        number,
        objectPrefix = "",
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        evaluation = null
      } = {}) => {
        if (resolvedTense !== "instrumentivo" || !value || evaluation?.shouldMaskRow || typeof targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject !== "function") {
          return;
        }
        const possessivePrefix = targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject(selection?.subjectPrefix || "", selection?.subjectSuffix || "");
        if (!possessivePrefix) {
          return;
        }
        const possessiveEvaluation = evaluateNounCombinationState({
          selection,
          number,
          possessorPrefix: "",
          objectPrefix,
          indirectObjectMarker,
          thirdObjectMarker,
          instrumentivoMode: targetObject.INSTRUMENTIVO_MODE.posesivo
        });
        if (possessiveEvaluation?.shouldMaskRow || !possessiveEvaluation?.result?.result || possessiveEvaluation.result.result === evaluation?.result?.result) {
          return;
        }
        const forms = getConjugationSurfaceForms(evaluation?.result);
        value.replaceChildren();
        value.classList.add("conjugation-value--conversion-picker");
        const surfaceText = targetObject.document.createElement("span");
        surfaceText.className = "conjugation-conversion-surface";
        const groupedSurfaceDisplay = typeof targetObject.formatConjugationDisplay === "function" ? targetObject.formatConjugationDisplay(forms.join(" / ") || evaluation?.result?.result || "") : forms.join(" / ") || evaluation?.result?.result || "";
        groupedSurfaceDisplay.split(/\n+/).map(line => line.trim()).filter(Boolean).forEach(line => {
          const lineElement = targetObject.document.createElement("span");
          lineElement.className = "conjugation-conversion-surface-line";
          lineElement.textContent = line;
          surfaceText.appendChild(lineElement);
        });
        const actions = targetObject.document.createElement("span");
        actions.className = "conjugation-conversion-actions";
        const action = targetObject.document.createElement("button");
        action.type = "button";
        action.className = ["calc-guidance__chip", "calc-guidance__chip--button", "calc-guidance__chip--linked-promote", "calc-guidance__chip--mode-sustantivo"].join(" ");
        action.dataset.instrumentivoSourceSubjectPossessor = possessivePrefix;
        action.dataset.targetSurface = possessiveEvaluation.result.result || "";
        const label = targetObject.document.createElement("span");
        label.className = "calc-guidance__chip-label";
        label.textContent = `→ ${possessiveEvaluation.result.result}`;
        action.appendChild(label);
        action.title = ["Andrews 36.6: sujeto fuente → poseedor", `poseedor: ${possessivePrefix}`, `salida posesiva: ${possessiveEvaluation.result.result}`].join("; ");
        actions.appendChild(action);
        value.append(surfaceText, actions);
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
              personSub.textContent = appendSentenceLayerSubLabels(appendNuclearClauseShellSubLabels(appendAdverbialAdjunctionBoundaryFrameSubLabels(appendAdverbialNuclearFrameSubLabels(appendRelationalNncBoundaryFrameSubLabels(appendPlaceGentilicNncBoundaryFrameSubLabels(appendDenominalFamilyProfileSubLabels(appendVerbDerivedNominalizationProfileSubLabels(targetObject.buildPersonSub({
                subjectLabel: appendNominalSubjectConnectorSubLabel(basePersonSub, subjectConnectorLabel),
                possessorLabel,
                objectLabel
              }), evaluation.result?.nominalizationProfile, {
                isNawat
              }), evaluation.result?.denominalFamilyProfile), evaluation.result?.placeGentilicNncBoundaryFrame), evaluation.result?.relationalNncBoundaryFrame), evaluation.result?.adverbialNuclearFrame), evaluation.result?.adverbialAdjunctionBoundaryFrame), evaluation.result?.nuclearClauseShell), evaluation.result?.sentenceLayer);
              targetObject.applyConjugationEvaluationPresentation({
                row,
                value,
                evaluation,
                formattedValue: targetObject.formatConjugationDisplay(evaluation.result.result)
              });
              if (resolvedTense === "patientivo") {
                renderPatientivoAdjectivalFunctionContinuation({
                  value,
                  evaluation,
                  patientivoSource
                });
                renderPatientivoCompoundEmbedContinuation({
                  value,
                  evaluation,
                  patientivoSource
                });
                renderPatientivoNominalCompoundContinuation({
                  value,
                  evaluation,
                  patientivoSource
                });
              }
              if (resolvedTense === "sustantivo-verbal") {
                renderActiveActionCompoundEmbedContinuation({
                  value,
                  evaluation
                });
                renderActiveActionNominalCompoundContinuation({
                  value,
                  evaluation
                });
              }
              if (resolvedTense === "agentivo") {
                renderNominalizedVncAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
                renderCustomaryAgentiveCompoundEmbedContinuation({
                  value,
                  evaluation
                });
                renderCustomaryAgentiveNominalCompoundContinuation({
                  value,
                  evaluation
                });
              }
              if (resolvedTense === "agentivo-preterito") {
                renderNominalizedVncAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveCompoundEmbedContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveNominalCompoundContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveOwnerhoodContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveComplementContinuation({
                  value,
                  evaluation
                });
                renderPreteritAgentiveAdverbialContinuation({
                  value,
                  evaluation
                });
              }
              if (resolvedTense === "calificativo-instrumentivo") {
                renderPatientivoCharacteristicPropertyEmbedContinuation({
                  value,
                  evaluation,
                  possessorPrefix
                });
                renderCalificativoInstrumentivoSourceSubjectGeneralUseContinuation({
                  row,
                  value,
                  selection,
                  number,
                  possessorPrefix,
                  objectPrefix: displayObjectPrefix || "",
                  indirectObjectMarker: displayIndirectObjectMarker || "",
                  thirdObjectMarker: displayThirdObjectMarker || "",
                  evaluation
                });
              }
              if (resolvedTense === "instrumentivo" && !possessorPrefix) {
                renderInstrumentivoSourceSubjectPossessiveContinuation({
                  value,
                  selection,
                  number,
                  objectPrefix: displayObjectPrefix || "",
                  indirectObjectMarker: displayIndirectObjectMarker || "",
                  thirdObjectMarker: displayThirdObjectMarker || "",
                  evaluation
                });
              }
              if (resolvedTense === "potencial" || resolvedTense === "potencial-habitual") {
                renderNominalizedVncAdjectivalFunctionContinuation({
                  value,
                  evaluation
                });
              }
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
      objectPrefix = "",
      onlyTense = null
    }) {
      renderVerbConjugationsCore({
        verb,
        containerId: "all-tense-conjugations",
        tenseValue: onlyTense,
        modeKey: "standard",
        subjectKeyPrefix: "standard",
        subjectSubMode: "universal",
        objectPrefix
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
    api.getVerbDerivedNominalizationProfileLabel = getVerbDerivedNominalizationProfileLabel;
    api.buildVerbDerivedNominalizationProfileSubLabels = buildVerbDerivedNominalizationProfileSubLabels;
    api.appendVerbDerivedNominalizationProfileSubLabels = appendVerbDerivedNominalizationProfileSubLabels;
    api.buildDenominalFamilyProfileSubLabels = buildDenominalFamilyProfileSubLabels;
    api.appendDenominalFamilyProfileSubLabels = appendDenominalFamilyProfileSubLabels;
    api.buildNawatLinkedGrammarStageSubLabels = buildNawatLinkedGrammarStageSubLabels;
    api.getNawatLinkedGrammarCompactRouteLabel = getNawatLinkedGrammarCompactRouteLabel;
    api.getNawatLinkedGrammarCompactStageLabel = getNawatLinkedGrammarCompactStageLabel;
    api.formatNawatLinkedGrammarCompactChoiceLabel = formatNawatLinkedGrammarCompactChoiceLabel;
    api.appendNawatLinkedGrammarStageSubLabels = appendNawatLinkedGrammarStageSubLabels;
    api.buildNawatLinkedGrammarSelectionSummarySubLabels = buildNawatLinkedGrammarSelectionSummarySubLabels;
    api.appendNawatLinkedGrammarSelectionSummarySubLabels = appendNawatLinkedGrammarSelectionSummarySubLabels;
    api.buildNawatLinkedGrammarSelectedPathSubLabels = buildNawatLinkedGrammarSelectedPathSubLabels;
    api.getNawatLinkedGrammarAppendableSelections = getNawatLinkedGrammarAppendableSelections;
    api.getFirstNawatLinkedGrammarAppendableSelection = getFirstNawatLinkedGrammarAppendableSelection;
    api.buildNawatLinkedGrammarPathExecutionSubLabels = buildNawatLinkedGrammarPathExecutionSubLabels;
    api.buildNawatLinkedGrammarPromotedSourceSubLabels = buildNawatLinkedGrammarPromotedSourceSubLabels;
    api.getNawatLinkedGrammarStageRailKey = getNawatLinkedGrammarStageRailKey;
    api.attachNawatLinkedGrammarStagesToRailStations = attachNawatLinkedGrammarStagesToRailStations;
    api.buildNuclearClauseShellSubLabels = buildNuclearClauseShellSubLabels;
    api.appendNuclearClauseShellSubLabels = appendNuclearClauseShellSubLabels;
    api.buildVncValencyFrameSubLabels = buildVncValencyFrameSubLabels;
    api.appendVncValencyFrameSubLabels = appendVncValencyFrameSubLabels;
    api.buildDerivedVoiceFrameSubLabels = buildDerivedVoiceFrameSubLabels;
    api.appendDerivedVoiceFrameSubLabels = appendDerivedVoiceFrameSubLabels;
    api.buildForwardDerivationFrameSubLabels = buildForwardDerivationFrameSubLabels;
    api.appendForwardDerivationFrameSubLabels = appendForwardDerivationFrameSubLabels;
    api.buildCompoundFrameSubLabels = buildCompoundFrameSubLabels;
    api.appendCompoundFrameSubLabels = appendCompoundFrameSubLabels;
    api.buildAdverbialNuclearFrameSubLabels = buildAdverbialNuclearFrameSubLabels;
    api.appendAdverbialNuclearFrameSubLabels = appendAdverbialNuclearFrameSubLabels;
    api.buildRelationalNncBoundaryFrameSubLabels = buildRelationalNncBoundaryFrameSubLabels;
    api.appendRelationalNncBoundaryFrameSubLabels = appendRelationalNncBoundaryFrameSubLabels;
    api.buildPlaceGentilicNncBoundaryFrameSubLabels = buildPlaceGentilicNncBoundaryFrameSubLabels;
    api.appendPlaceGentilicNncBoundaryFrameSubLabels = appendPlaceGentilicNncBoundaryFrameSubLabels;
    api.buildAdverbialAdjunctionBoundaryFrameSubLabels = buildAdverbialAdjunctionBoundaryFrameSubLabels;
    api.appendAdverbialAdjunctionBoundaryFrameSubLabels = appendAdverbialAdjunctionBoundaryFrameSubLabels;
    api.buildVncVerbstemClassProfileSubLabels = buildVncVerbstemClassProfileSubLabels;
    api.appendVncVerbstemClassProfileSubLabels = appendVncVerbstemClassProfileSubLabels;
    api.buildSentenceLayerSubLabels = buildSentenceLayerSubLabels;
    api.appendSentenceLayerSubLabels = appendSentenceLayerSubLabels;
    api.getDefaultNawatPatientivoSourceTenseValue = getDefaultNawatPatientivoSourceTenseValue;
    api.getNawatPatientivoRouteSpec = getNawatPatientivoRouteSpec;
    api.getNawatPatientivoSourceRouteKey = getNawatPatientivoSourceRouteKey;
    api.getNawatVerbNounConversionProfiles = getNawatVerbNounConversionProfiles;
    api.getNawatVerbNounConversionLabel = getNawatVerbNounConversionLabel;
    api.getNawatVerbNounConversionHierarchyParts = getNawatVerbNounConversionHierarchyParts;
    api.formatNawatVerbNounConversionHierarchyLabel = formatNawatVerbNounConversionHierarchyLabel;
    api.getNawatTroncoConversionSpec = getNawatTroncoConversionSpec;
    api.getNawatTroncoTenseShortLabel = getNawatTroncoTenseShortLabel;
    api.buildNawatTroncoConversionTrack = buildNawatTroncoConversionTrack;
    api.normalizeDerivationalInputFamilyToken = normalizeDerivationalInputFamilyToken;
    api.isSameDerivationalGuidanceRow = isSameDerivationalGuidanceRow;
    api.buildDerivationalFamilySummaryEntries = buildDerivationalFamilySummaryEntries;
    api.resolveCurrentDerivationalGuidanceEntries = resolveCurrentDerivationalGuidanceEntries;
    api.renderOutputGuidancePanel = renderOutputGuidancePanel;
    api.resolveRenderableVerbValue = resolveRenderableVerbValue;
    api.renderOutputSelectionRequiredPlaceholder = renderOutputSelectionRequiredPlaceholder;
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
    const api = createUiRenderingGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
