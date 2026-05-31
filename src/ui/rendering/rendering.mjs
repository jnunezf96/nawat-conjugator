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
      const hidePanel = () => {
        panel.innerHTML = "";
        panel.hidden = true;
        panel.classList.add("is-empty");
      };
      const resolvedVerb = String(verb || "");
      const activeDerivationType = targetObject.getActiveDerivationType();
      if (targetObject.getActiveTenseMode() !== targetObject.TENSE_MODE.verbo || !resolvedVerb || activeDerivationType !== targetObject.DERIVATION_TYPE.causative && activeDerivationType !== targetObject.DERIVATION_TYPE.applicative || targetObject.getCombinedMode() !== targetObject.COMBINED_MODE.active) {
        hidePanel();
        return;
      }
      const provenance = resolveOutputPanelProvenance({
        verb: resolvedVerb,
        objectPrefix: targetObject.getCurrentObjectPrefix(),
        tenseOverride: getExplainabilitySelectedTense(null)
      });
      const activeRow = provenance && (provenance.rule || provenance.causativeTrace || provenance.guidanceRoute) ? {
        rule: provenance.rule,
        patternType: provenance.patternType,
        causativeTrace: provenance.causativeTrace,
        guidanceRoute: provenance.guidanceRoute || null,
        stem: targetObject.getProvenancePrimaryStemSurface(provenance)
      } : null;
      const entries = resolveCurrentDerivationalGuidanceEntries(resolvedVerb, activeDerivationType, activeRow);
      if (!entries.length) {
        hidePanel();
        return;
      }
      panel.innerHTML = "";
      panel.hidden = false;
      panel.classList.remove("is-empty");
      const title = targetObject.document.createElement("div");
      title.className = "calc-guidance__title";
      title.textContent = "rutas";
      panel.appendChild(title);
      const chips = targetObject.document.createElement("div");
      chips.className = "calc-guidance__chips";
      entries.forEach(entry => {
        const chip = targetObject.document.createElement("div");
        chip.className = entry.active ? "calc-guidance__chip calc-guidance__chip--active" : "calc-guidance__chip";
        chip.textContent = entry.text;
        chips.appendChild(chip);
      });
      panel.appendChild(chips);
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
    function renderActiveConjugations({
      verb,
      objectPrefix,
      onlyTense = null,
      tense = null
    }) {
      const renderVerb = resolveRenderableVerbValue(verb);
      const tenseOverride = onlyTense || tense || "";
      const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
      updateTensePanelDescription();
      renderOutputGuidancePanel({
        verb: renderVerb
      });
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
          objectPrefix,
          containerId: "all-tense-conjugations",
          tenseValue: tenseOverride || null
        });
        targetObject.updateCalcSummaryAndStatus();
        return;
      }
      renderAllTenseConjugations({
        verb: renderVerb,
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
      tenseTitle.appendChild(titleControls);
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
        const sourceMode = sourceColumn?.dataset?.sourceMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
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
      return {
        appendBlock(block, mode = targetObject.COMBINED_MODE.active) {
          if (!block) {
            return;
          }
          const target = mode === targetObject.COMBINED_MODE.nonactive ? nonactiveColumn.blocks : activeColumn.blocks;
          target.appendChild(block);
        },
        finalize() {
          [activeColumn.blocks, nonactiveColumn.blocks].forEach(blocks => {
            if (blocks.children.length > 0) {
              return;
            }
            const empty = targetObject.document.createElement("div");
            empty.className = "tense-grid-source-column__empty";
            empty.textContent = "—";
            blocks.appendChild(empty);
          });
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
        const isActive = option.id === activeId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
        const title = typeof getTitle === "function" ? getTitle(option) : option.title;
        if (title) {
          button.title = title;
        }
        const isDisabled = typeof getIsDisabled === "function" ? getIsDisabled(option) : false;
        if (isDisabled) {
          button.disabled = true;
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
      const visiblePossessorValues = isPotencial || isPatientivoAdjective ? [""] : isPossessionSplit ? showDualVoiceColumns ? possessorValues : nominalControlCombinedMode === targetObject.COMBINED_MODE.nonactive ? [""] : possessorValues : possessorValues;
      let activePossessor = targetObject.getToggleStateValue(targetObject.PossessorToggleState, possessorKey);
      if (activePossessor === undefined || !visiblePossessorValues.includes(activePossessor)) {
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
      const blockConfigs = isPatientivoTense ? [{
        id: "patientivo-pasivo",
        label: targetObject.getVerbBlockLabel("patientivo-pasivo", isNawat, "patientivo · pasivo/impersonal"),
        patientivoSource: "nonactive",
        sourceMode: targetObject.COMBINED_MODE.nonactive,
        sourceTenseLabel: targetObject.getNominalSourceTenseLabel("patientivo", {
          patientivoSource: "nonactive",
          isNawat
        }),
        mode: targetObject.COMBINED_MODE.nonactive,
        showControls: false
      }, {
        id: "patientivo-perfectivo",
        label: targetObject.getVerbBlockLabel("patientivo-perfectivo", isNawat, "patientivo · perfectivo"),
        patientivoSource: "perfectivo",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: targetObject.getNominalSourceTenseLabel("patientivo", {
          patientivoSource: "perfectivo",
          isNawat
        }),
        mode: targetObject.COMBINED_MODE.active,
        showControls: false
      }, {
        id: "patientivo-imperfectivo",
        label: targetObject.getVerbBlockLabel("patientivo-imperfectivo", isNawat, "patientivo · imperfectivo"),
        patientivoSource: "imperfectivo",
        sourceMode: targetObject.COMBINED_MODE.active,
        sourceTenseLabel: targetObject.getNominalSourceTenseLabel("patientivo", {
          patientivoSource: "imperfectivo",
          isNawat
        }),
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
        sourceMode: defaultNominalSourceMode,
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
        return {
          sourceMode: targetObject.COMBINED_MODE.nonactive,
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
        const cacheKey = [selection.subjectPrefix || "", selection.subjectSuffix || "", number || "", possessorPrefix || "", resolvedObjectPrefix || "", resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || "", resolvedPatientivoSource || "", ownershipSelections.join(","), resolvedPatientivoNominalSuffix === null ? "*" : resolvedPatientivoNominalSuffix, useReduplicatedSingularSurface ? "redup" : "plain"].join("|");
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
          titleLabel
        });
        updateNounBlockPalettes();
      };
      const updateSectionCategory = prefix => {
        targetObject.applyObjectSectionCategory(objSection, prefix);
      };
      const renderRowsForList = (targetList, patientivoSource) => {
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
              personSub.textContent = targetObject.buildPersonSub({
                subjectLabel: basePersonSub,
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
              targetList.appendChild(row);
            });
          });
        });
      };
      const renderRows = () => {
        nounCombinationEvaluationCache.clear();
        nounToggleAvailabilityMemo = new Map();
        blocks.forEach(entry => {
          renderRowsForList(entry.list, entry.patientivoSource);
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
    api.normalizeDerivationalInputFamilyToken = normalizeDerivationalInputFamilyToken;
    api.isSameDerivationalGuidanceRow = isSameDerivationalGuidanceRow;
    api.buildDerivationalFamilySummaryEntries = buildDerivationalFamilySummaryEntries;
    api.resolveCurrentDerivationalGuidanceEntries = resolveCurrentDerivationalGuidanceEntries;
    api.renderOutputGuidancePanel = renderOutputGuidancePanel;
    api.resolveRenderableVerbValue = resolveRenderableVerbValue;
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
