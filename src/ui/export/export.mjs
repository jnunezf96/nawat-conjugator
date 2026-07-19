// Canonical modern ESM module.

export function createUiExportApi(targetObject = globalThis) {
    function escapeCSVValue(value) {
      const raw = String(value ?? "");
      if (/[",\n]/.test(raw)) {
        return `"${raw.replace(/"/g, "\"\"")}"`;
      }
      return raw;
    }
    function normalizeUnifiedVerbOutputObjectSlotCount(value = 0) {
      if (!Number.isFinite(value)) {
        return 0;
      }
      return Math.max(0, Math.min(targetObject.VERB_OBJECT_SLOT_SCHEMA.length, Number(value)));
    }
    function normalizeUnifiedVerbOutputBooleanText(value = "") {
      if (value === true) {
        return "true";
      }
      if (value === false) {
        return "false";
      }
      const text = String(value || "").trim();
      return text === "true" || text === "false" ? text : "";
    }
    function normalizeUnifiedVerbOutputSurfaceValue(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const text = String(value || "").trim();
      return text === "—" ? "" : text;
    }
    function splitUnifiedVerbOutputSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeUnifiedVerbOutputSurfaceValue(entry)).filter(Boolean);
    }
    function getUnifiedVerbOutputGrammarFrame(source = {}) {
      const entry = source && typeof source === "object" ? source : {};
      const nestedResult = entry.result && typeof entry.result === "object" ? entry.result : null;
      return (entry.grammarFrame && typeof entry.grammarFrame === "object" ? entry.grammarFrame : null) || (entry.frames && typeof entry.frames === "object" ? entry.frames : null) || (nestedResult?.grammarFrame && typeof nestedResult.grammarFrame === "object" ? nestedResult.grammarFrame : null) || (nestedResult?.frames && typeof nestedResult.frames === "object" ? nestedResult.frames : null);
    }
    function getUnifiedVerbOutputResultFrame(source = {}) {
      const grammarFrame = getUnifiedVerbOutputGrammarFrame(source);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getUnifiedVerbOutputSurfaceForms(source = {}) {
      const entry = source && typeof source === "object" ? source : {};
      const nestedResult = entry.result && typeof entry.result === "object" ? entry.result : null;
      const frameResult = getUnifiedVerbOutputResultFrame(entry);
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entryValue => splitUnifiedVerbOutputSurfaceText(entryValue)).filter((entryValue, index, list) => entryValue && list.indexOf(entryValue) === index);
      }
      if (Array.isArray(entry.surfaceForms)) {
        forms.push(...entry.surfaceForms);
      }
      if (entry.surface) {
        forms.push(entry.surface);
      }
      if (Array.isArray(nestedResult?.surfaceForms)) {
        forms.push(...nestedResult.surfaceForms);
      }
      if (nestedResult?.surface) {
        forms.push(nestedResult.surface);
      }
      if (typeof entry.result === "string") {
        forms.push(entry.result);
      } else if (nestedResult?.result) {
        forms.push(nestedResult.result);
      }
      return forms.flatMap(entryValue => splitUnifiedVerbOutputSurfaceText(entryValue)).filter((entryValue, index, list) => entryValue && list.indexOf(entryValue) === index);
    }
    function getUnifiedVerbOutputForm(source = {}, defaults = {}) {
      const forms = getUnifiedVerbOutputSurfaceForms(source);
      if (forms.length) {
        return forms.join(" / ");
      }
      if (getUnifiedVerbOutputResultFrame(source)) {
        return "";
      }
      return normalizeUnifiedVerbOutputSurfaceValue(source.form || defaults.form || "");
    }
    function getVisibleConjugationValueExportText(row) {
      const valueNode = row?.querySelector?.(".conjugation-value") || null;
      if (!valueNode) {
        return "";
      }
      if (Object.prototype.hasOwnProperty.call(valueNode.dataset || {}, "exportForm")) {
        return String(valueNode.dataset.exportForm || "").trim();
      }
      const surfaceNode = valueNode.querySelector?.(".conjugation-conversion-surface");
      if (surfaceNode) {
        const surfaceLines = Array.from(surfaceNode.querySelectorAll?.(".conjugation-conversion-surface-line") || []).map(node => String(node.dataset?.formulaSurface || node.querySelector?.(".conjugation-conversion-surface-form")?.textContent || node.textContent || "").trim()).filter(Boolean);
        if (surfaceLines.length) {
          return surfaceLines.join("\n");
        }
        return surfaceNode.textContent.trim();
      }
      const clone = valueNode.cloneNode(true);
      clone.querySelectorAll?.(".conjugation-conversion-actions").forEach(node => node.remove());
      return clone.textContent.trim();
    }
    function getVisibleConjugationFormulaSurfaceExportMetadata(row = null) {
      const valueNode = row?.querySelector?.(".conjugation-value") || null;
      const surfaceLines = Array.from(valueNode?.querySelectorAll?.(".conjugation-conversion-surface-line, .conjugation-formula-surface-line") || []);
      const linePairs = surfaceLines.map(node => ({
        surface: String(node.dataset?.formulaSurface || node.textContent || "").trim(),
        sourceFormulaEcho: String(node.dataset?.sourceFormulaEcho || "").trim(),
        andrewsFormulaEcho: String(node.dataset?.andrewsFormulaEcho || node.dataset?.sourceFormulaEcho || "").trim(),
        targetFormulaEcho: String(node.dataset?.targetFormulaEcho || "").trim(),
        conjugatorFormulaEcho: String(node.dataset?.conjugatorFormulaEcho || node.dataset?.targetFormulaEcho || "").trim(),
        sourceToTargetFormulaEcho: String(node.dataset?.sourceToTargetFormulaEcho || "").trim(),
        andrewsToConjugatorFormulaEcho: String(node.dataset?.andrewsToConjugatorFormulaEcho || node.dataset?.sourceToTargetFormulaEcho || "").trim()
      })).filter(entry => entry.surface && entry.targetFormulaEcho);
      const rowSourceFormula = String(row?.dataset?.sourceFormulaEcho || row?.dataset?.andrewsCnvCnnNominalSourceFormulaEcho || "").trim();
      const rowAndrewsFormula = String(row?.dataset?.andrewsFormulaEcho || row?.dataset?.andrewsCnvCnnNominalAndrewsFormulaEcho || rowSourceFormula).trim();
      const rowTargetFormula = String(row?.dataset?.targetFormulaEcho || "").trim();
      const rowConjugatorFormula = String(row?.dataset?.conjugatorFormulaEcho || row?.dataset?.andrewsCnvCnnNominalConjugatorFormulaEcho || rowTargetFormula).trim();
      const rowRouteFormula = String(row?.dataset?.sourceToTargetFormulaEcho || "").trim();
      const rowAndrewsToConjugatorFormula = String(row?.dataset?.andrewsToConjugatorFormulaEcho || row?.dataset?.andrewsCnvCnnNominalAndrewsToConjugatorFormulaEcho || rowRouteFormula).trim();
      const rowPairs = String(row?.dataset?.formulaSurfacePairs || "").trim();
      return {
        sourceFormulaEcho: linePairs.map(entry => entry.sourceFormulaEcho).filter(Boolean).join(" | ") || rowSourceFormula,
        andrewsFormulaEcho: linePairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean).join(" | ") || rowAndrewsFormula,
        targetFormulaEcho: linePairs.map(entry => entry.targetFormulaEcho).filter(Boolean).join(" | ") || rowTargetFormula,
        conjugatorFormulaEcho: linePairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean).join(" | ") || rowConjugatorFormula,
        sourceToTargetFormulaEcho: linePairs.map(entry => entry.sourceToTargetFormulaEcho).filter(Boolean).join(" | ") || rowRouteFormula,
        andrewsToConjugatorFormulaEcho: linePairs.map(entry => entry.andrewsToConjugatorFormulaEcho).filter(Boolean).join(" | ") || rowAndrewsToConjugatorFormula,
        formulaSurfacePairs: linePairs.map(entry => `${entry.surface}=>${entry.andrewsFormulaEcho || entry.sourceFormulaEcho || ""}=>${entry.conjugatorFormulaEcho || entry.targetFormulaEcho}`).join(" | ") || rowPairs
      };
    }
    function normalizeViewExportDomText(value = "") {
      return String(value || "").replace(/\s+/g, " ").trim();
    }
    function isViewExportNodeHidden(node = null) {
      let current = node;
      while (current && current !== targetObject.document) {
        if (current.hidden === true) {
          return true;
        }
        if (typeof current.hasAttribute === "function" && current.hasAttribute("hidden")) {
          return true;
        }
        if (typeof current.getAttribute === "function" && current.getAttribute("aria-hidden") === "true") {
          return true;
        }
        const classList = current.classList;
        const className = typeof current.className === "string" ? current.className : "";
        if (classList && typeof classList.contains === "function" && (classList.contains("is-hidden") || classList.contains("is-hidden-control")) || /\bis-hidden(?:-control)?\b/.test(className)) {
          return true;
        }
        const style = current.style || {};
        if (style.display === "none" || style.visibility === "hidden") {
          return true;
        }
        current = current.parentElement || current.parentNode || null;
      }
      return false;
    }
    function getPersonSubSlotChipKind(chip = null) {
      const className = typeof chip?.className === "string" ? chip.className : "";
      const match = className.match(/\bperson-sub__slot-chip--([a-z0-9-]+)\b/i);
      return match ? match[1] : "";
    }
    function getPersonSubSlotChipText(chip = null) {
      if (!chip) {
        return "";
      }
      const label = normalizeViewExportDomText(chip.querySelector?.(".person-sub__slot-chip-label")?.textContent || "").replace(/:\s*$/, "");
      const value = normalizeViewExportDomText(chip.querySelector?.(".person-sub__slot-chip-value")?.textContent || "");
      if (label && value) {
        return `${label}: ${value}`;
      }
      return value || label || normalizeViewExportDomText(chip.textContent || "");
    }
    function getPersonSubSlotChipDetail(chip = null) {
      if (!chip) {
        return "";
      }
      return normalizeViewExportDomText(chip.dataset?.detail || chip.title || (typeof chip.getAttribute === "function" ? chip.getAttribute("aria-label") : "") || "");
    }
    function normalizeUnifiedVerbOutputGrammarMetadata(source = {}, defaults = {}) {
      const src = source && typeof source === "object" ? source : {};
      const fallback = defaults && typeof defaults === "object" ? defaults : {};
      const getText = key => String(Object.prototype.hasOwnProperty.call(src, key) ? src[key] : fallback[key] || "").trim();
      const getBooleanText = key => normalizeUnifiedVerbOutputBooleanText(Object.prototype.hasOwnProperty.call(src, key) ? src[key] : fallback[key]);
      return {
        inputValue: getText("inputValue"),
        grammarAuthorityRef: getText("grammarAuthorityRef"),
        grammarAuthorityRefs: getText("grammarAuthorityRefs"),
        grammarEvidenceStatus: getText("grammarEvidenceStatus"),
        grammarOrthographyRef: getText("grammarOrthographyRef"),
        grammarOrthographyRefs: getText("grammarOrthographyRefs"),
        grammarSourceEvidenceKind: getText("grammarSourceEvidenceKind"),
        grammarSourceEvidenceStatus: getText("grammarSourceEvidenceStatus"),
        grammarSourceEvidenceTargetAuthority: getText("grammarSourceEvidenceTargetAuthority"),
        grammarSourceEvidenceSource: getText("grammarSourceEvidenceSource"),
        grammarSourceEvidenceFlags: getText("grammarSourceEvidenceFlags"),
        grammarUnitKind: getText("grammarUnitKind"),
        grammarRouteFamily: getText("grammarRouteFamily"),
        grammarRouteStage: getText("grammarRouteStage"),
        grammarGenerationAllowed: getBooleanText("grammarGenerationAllowed"),
        grammarDiagnosticStatus: getText("grammarDiagnosticStatus"),
        grammarDiagnosticId: getText("grammarDiagnosticId"),
        grammarDiagnosticLayer: getText("grammarDiagnosticLayer"),
        grammarDiagnosticContractLayer: getText("grammarDiagnosticContractLayer"),
        grammarResultOk: getBooleanText("grammarResultOk"),
        sourceFormulaEcho: getText("sourceFormulaEcho"),
        andrewsFormulaEcho: getText("andrewsFormulaEcho"),
        targetFormulaEcho: getText("targetFormulaEcho"),
        conjugatorFormulaEcho: getText("conjugatorFormulaEcho"),
        sourceToTargetFormulaEcho: getText("sourceToTargetFormulaEcho"),
        andrewsToConjugatorFormulaEcho: getText("andrewsToConjugatorFormulaEcho"),
        formulaSurfacePairs: getText("formulaSurfacePairs")
      };
    }
    function getUnifiedVerbOutputGrammarDatasetMetadata(dataset = {}) {
      const data = dataset && typeof dataset === "object" ? dataset : {};
      return normalizeUnifiedVerbOutputGrammarMetadata({
        grammarAuthorityRef: data.grammarAuthorityRef || "",
        grammarAuthorityRefs: data.grammarAuthorityRefs || data.grammarAuthorityRef || "",
        grammarEvidenceStatus: data.grammarEvidenceStatus || data.lcmEvidenceStatus || "",
        grammarOrthographyRef: data.grammarOrthographyRef || "",
        grammarOrthographyRefs: data.grammarOrthographyRefs || data.grammarOrthographyRef || "",
        grammarSourceEvidenceKind: data.grammarSourceEvidenceKind || "",
        grammarSourceEvidenceStatus: data.grammarSourceEvidenceStatus || "",
        grammarSourceEvidenceTargetAuthority: data.grammarSourceEvidenceTargetAuthority || "",
        grammarSourceEvidenceSource: data.grammarSourceEvidenceSource || "",
        grammarSourceEvidenceFlags: data.grammarSourceEvidenceFlags || "",
        grammarUnitKind: data.grammarUnitKind || "",
        grammarRouteFamily: data.grammarRouteFamily || data.lcmRouteFamily || "",
        grammarRouteStage: data.grammarRouteStage || data.lcmRouteStage || "",
        grammarGenerationAllowed: data.grammarGenerationAllowed || data.lcmGenerationAllowed || "",
        grammarDiagnosticStatus: data.grammarDiagnosticStatus || data.lcmDiagnosticStatus || "",
        grammarDiagnosticId: data.grammarDiagnosticId || data.lcmDiagnosticId || "",
        grammarDiagnosticLayer: data.grammarDiagnosticLayer || data.lcmFailedLayer || "",
        grammarDiagnosticContractLayer: data.grammarDiagnosticContractLayer || data.lcmContractLayer || "",
        grammarResultOk: data.grammarResultOk || "",
        sourceFormulaEcho: data.sourceFormulaEcho || "",
        andrewsFormulaEcho: data.andrewsFormulaEcho || data.sourceFormulaEcho || "",
        targetFormulaEcho: data.targetFormulaEcho || "",
        conjugatorFormulaEcho: data.conjugatorFormulaEcho || data.targetFormulaEcho || "",
        sourceToTargetFormulaEcho: data.sourceToTargetFormulaEcho || "",
        andrewsToConjugatorFormulaEcho: data.andrewsToConjugatorFormulaEcho || data.sourceToTargetFormulaEcho || "",
        formulaSurfacePairs: data.formulaSurfacePairs || ""
      });
    }
    function normalizeUnifiedVerbOutputEntry(entry = {}, defaults = {}) {
      const source = entry && typeof entry === "object" ? entry : {};
      const normalized = {
        tenseValue: String(source.tenseValue || defaults.tenseValue || ""),
        groupKey: String(source.groupKey || defaults.groupKey || ""),
        sourceMode: source.sourceMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
        block: String(source.block || ""),
        person: String(source.person || ""),
        personSub: String(source.personSub || ""),
        subjectToggle: String(source.subjectToggle || ""),
        object: targetObject.getZeroObjectDisplayValue(source.object || ""),
        object2: targetObject.getZeroObjectDisplayValue(source.object2 || ""),
        object3: targetObject.getZeroObjectDisplayValue(source.object3 || ""),
        form: getUnifiedVerbOutputForm(source, defaults),
        objectSlotCount: normalizeUnifiedVerbOutputObjectSlotCount(source.objectSlotCount ?? defaults.objectSlotCount ?? 0),
        ...normalizeUnifiedVerbOutputGrammarMetadata(source, defaults)
      };
      if (!normalized.objectSlotCount) {
        const derivedSlotCount = targetObject.VERB_OBJECT_SLOT_SCHEMA.reduce((count, slot, index) => normalized[slot.id] ? Math.max(count, index + 1) : count, 0);
        normalized.objectSlotCount = normalizeUnifiedVerbOutputObjectSlotCount(derivedSlotCount);
      }
      return normalized;
    }
    function projectUnifiedVerbOutputVisibleRow(row = {}) {
      return {
        subjectToggle: row.subjectToggle,
        sourceMode: row.sourceMode,
        block: row.block,
        person: row.person,
        personSub: row.personSub,
        value: row.form,
        inputValue: row.inputValue,
        objectSlotCount: row.objectSlotCount,
        objectToggle: row.object,
        objectToggle2: row.object2,
        objectToggle3: row.object3,
        ...normalizeUnifiedVerbOutputGrammarMetadata(row)
      };
    }
    function buildUnifiedVerbOutputBaseKey(entry = {}) {
      return [entry.groupKey, entry.tenseValue, entry.block, entry.person, entry.personSub, entry.subjectToggle, entry.object, entry.object2, entry.object3].join("|");
    }
    function buildUnifiedVerbOutputSourceKey(entry = {}) {
      return `${buildUnifiedVerbOutputBaseKey(entry)}|${entry.sourceMode || targetObject.COMBINED_MODE.active}`;
    }
    function setUnifiedVerbOutputDatasetRows(rows = [], defaults = {}) {
      const normalizedRows = (Array.isArray(rows) ? rows : []).map(entry => normalizeUnifiedVerbOutputEntry(entry, defaults)).filter(entry => Boolean(entry.block) || Boolean(entry.person) || Boolean(entry.personSub) || Boolean(entry.form));
      const bySourceKey = new Map();
      const grouped = new Map();
      normalizedRows.forEach(entry => {
        const baseKey = buildUnifiedVerbOutputBaseKey(entry);
        const sourceKey = buildUnifiedVerbOutputSourceKey(entry);
        bySourceKey.set(sourceKey, entry);
        const groupedEntry = grouped.get(baseKey) || {};
        groupedEntry[entry.sourceMode] = entry;
        grouped.set(baseKey, groupedEntry);
      });
      targetObject.VerbUnifiedOutputState.rows = normalizedRows;
      targetObject.VerbUnifiedOutputState.bySourceKey = bySourceKey;
      targetObject.VerbUnifiedOutputState.grouped = grouped;
      targetObject.VerbUnifiedOutputState.updatedAt = Date.now();
    }
    function collectStructuredUnifiedVerbOutputRows(container, defaults = {}) {
      if (!container || typeof container.querySelectorAll !== "function") {
        return [];
      }
      const rows = [];
      const blocks = Array.from(container.querySelectorAll(".tense-block"));
      blocks.forEach(block => {
        const blockRows = Array.isArray(block.__outputRows) ? block.__outputRows : [];
        blockRows.forEach(entry => {
          rows.push(normalizeUnifiedVerbOutputEntry(entry, defaults));
        });
      });
      return rows;
    }
    function collectVisibleConjugationRowsFromDom() {
      const container = targetObject.document.getElementById("all-tense-conjugations");
      if (!container) {
        return [];
      }
      const rows = [];
      const blocks = Array.from(container.querySelectorAll(".tense-block"));
      blocks.forEach(block => {
        const blockLabel = block.querySelector(".tense-block__label")?.textContent.trim() || "";
        const sourceColumn = block.closest(".tense-grid-source-column");
        const sourceMode = sourceColumn?.dataset?.sourceMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        const toggleMap = targetObject.VERB_OBJECT_SLOT_SCHEMA.reduce((acc, slot) => {
          acc[slot.id] = "";
          return acc;
        }, {
          subject: ""
        });
        const explicitObjectToggleCount = block.querySelectorAll('.tense-block__controls .object-toggle[data-toggle-type="object"]').length;
        const toggles = Array.from(block.querySelectorAll(".tense-block__controls .object-toggle"));
        toggles.forEach(toggle => {
          const activeButton = toggle.querySelector(".object-toggle-button.is-active");
          const value = activeButton ? activeButton.textContent.trim() : "";
          if (!value) {
            return;
          }
          const toggleType = toggle.dataset.toggleType || "";
          const toggleSlot = toggle.dataset.toggleSlot || "";
          if (toggleType === "subject") {
            toggleMap.subject = value;
            return;
          }
          if (toggleType === "object" && Object.prototype.hasOwnProperty.call(toggleMap, toggleSlot)) {
            toggleMap[toggleSlot] = value;
            return;
          }
          if (toggleType) {
            return;
          }
          const ariaLabel = (toggle.getAttribute("aria-label") || "").toLowerCase();
          if (ariaLabel.includes("suj") || ariaLabel.includes("subject")) {
            toggleMap.subject = value;
          } else if (ariaLabel.includes("shuntline 2") || ariaLabel.includes("shuntline2")) {
            toggleMap.object3 = value;
          } else if (ariaLabel.includes("shuntline")) {
            toggleMap.object2 = value;
          } else if (ariaLabel.includes("mainline")) {
            toggleMap.object = value;
          } else if (ariaLabel.includes("objeto 3") || ariaLabel.includes("object 3") || ariaLabel.includes("objeto3")) {
            toggleMap.object3 = value;
          } else if (ariaLabel.includes("objeto 2") || ariaLabel.includes("object 2") || ariaLabel.includes("objeto2")) {
            toggleMap.object2 = value;
          } else if (ariaLabel.includes("objeto") || ariaLabel.includes("object")) {
            toggleMap.object = value;
          }
        });
        const rowNodes = Array.from(block.querySelectorAll(".conjugation-row"));
        rowNodes.forEach(row => {
          const personLabel = row.querySelector(".person-label")?.textContent.trim() || "";
          const value = getVisibleConjugationValueExportText(row);
          if (!personLabel && !value) {
            return;
          }
          const exportRow = {
            inputValue: Object.prototype.hasOwnProperty.call(row.dataset, "exportInput") ? row.dataset.exportInput : "",
            subjectToggle: toggleMap.subject,
            sourceMode,
            block: blockLabel,
            person: personLabel,
            personSub: row.querySelector(".person-sub")?.textContent.trim() || "",
            form: value,
            objectSlotCount: explicitObjectToggleCount,
            ...getVisibleConjugationFormulaSurfaceExportMetadata(row)
          };
          targetObject.VERB_OBJECT_SLOT_SCHEMA.forEach(slot => {
            const hasDatasetValue = Object.prototype.hasOwnProperty.call(row.dataset, slot.datasetKey);
            const fallbackValue = toggleMap[slot.id] || "";
            const rawValue = hasDatasetValue ? row.dataset[slot.datasetKey] : fallbackValue;
            exportRow[slot.id] = rawValue;
          });
          Object.assign(exportRow, getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset));
          Object.assign(exportRow, getVisibleConjugationFormulaSurfaceExportMetadata(row));
          rows.push(normalizeUnifiedVerbOutputEntry(exportRow));
        });
      });
      return rows.map(row => projectUnifiedVerbOutputVisibleRow(row));
    }
    function collectVisibleConjugationRows() {
      if (Array.isArray(targetObject.VerbUnifiedOutputState.rows) && targetObject.VerbUnifiedOutputState.rows.length) {
        return targetObject.VerbUnifiedOutputState.rows.map(row => projectUnifiedVerbOutputVisibleRow(row));
      }
      return collectVisibleConjugationRowsFromDom();
    }
    function collectPersonSubSlotStripExportRowsFromDom() {
      const container = targetObject.document.getElementById("all-tense-conjugations");
      if (!container || typeof container.querySelectorAll !== "function") {
        return [];
      }
      const rows = [];
      const rowNodes = Array.from(container.querySelectorAll(".conjugation-row"));
      rowNodes.forEach(row => {
        if (isViewExportNodeHidden(row)) {
          return;
        }
        const personSub = row.querySelector?.(".person-sub") || null;
        const strip = personSub?.querySelector?.(".person-sub__slot-strip") || null;
        if (!strip || isViewExportNodeHidden(strip)) {
          return;
        }
        const chips = Array.from(strip.querySelectorAll?.(".person-sub__slot-chip") || []).filter(chip => !isViewExportNodeHidden(chip));
        const chipTexts = chips.map(chip => getPersonSubSlotChipText(chip)).filter(Boolean);
        const slotStripText = chipTexts.length ? chipTexts.join(" | ") : normalizeViewExportDomText(strip.textContent || "");
        if (!slotStripText) {
          return;
        }
        const block = row.closest?.(".tense-block") || null;
        const sourceColumn = row.closest?.(".tense-grid-source-column") || null;
        const sourceMode = sourceColumn?.dataset?.sourceMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        rows.push({
          inputValue: Object.prototype.hasOwnProperty.call(row.dataset || {}, "exportInput") ? row.dataset.exportInput : "",
          sourceMode,
          sourceLabel: normalizeViewExportDomText(row.dataset?.exportSourceLabel || ""),
          block: normalizeViewExportDomText(block?.querySelector?.(".tense-block__label")?.textContent || ""),
          person: normalizeViewExportDomText(row.querySelector?.(".person-label")?.textContent || ""),
          form: getVisibleConjugationValueExportText(row),
          compactSubLabel: normalizeViewExportDomText(personSub.querySelector?.(".person-sub__compact-text")?.textContent || ""),
          slotStrip: slotStripText,
          slotKinds: chips.map(chip => getPersonSubSlotChipKind(chip)).filter(Boolean).join(" | "),
          slotDetails: chips.map(chip => getPersonSubSlotChipDetail(chip)).filter(Boolean).join(" | "),
          ...getVisibleConjugationFormulaSurfaceExportMetadata(row)
        });
      });
      return rows;
    }
    function getParticleExportRowsFromDom() {
      const container = targetObject.document.getElementById("all-tense-conjugations");
      if (!container || typeof container.querySelectorAll !== "function") {
        return [];
      }
      const particleRows = Array.from(container.querySelectorAll(".conjugation-row--particle"));
      if (!particleRows.length) {
        return [];
      }
      return particleRows.map(row => {
        const block = row.closest(".tense-block");
        const blockLabel = block?.querySelector(".tense-block__label")?.textContent.trim() || "";
        const getRowText = (...selectors) => {
          for (const selector of selectors) {
            const value = row.querySelector(selector)?.textContent.trim() || "";
            if (value) {
              return value;
            }
          }
          return "";
        };
        const label = getRowText(".particle-row__form", ".person-label");
        const value = getRowText(".particle-row__class", ".conjugation-value");
        const diagnosticId = row.dataset.grammarDiagnosticId || "";
        const entryKind = row.dataset.particleEntryKind || (blockLabel.includes("Muestra Andrews") || blockLabel.includes("Ejemplos Andrews") ? "andrews-seed" : "mode-diagnostic");
        const rowId = row.dataset.particleRow || "";
        const isEmptyCandidate = diagnosticId === "particle-candidate-empty";
        if (entryKind !== "andrews-seed" && (rowId !== "candidate" || isEmptyCandidate)) {
          return null;
        }
        const entradaNawat = row.dataset.particleNawatForm || row.dataset.exportInput || (entryKind === "andrews-seed" ? label : value) || "";
        return {
          tipo: entryKind === "andrews-seed" ? "ejemplo Andrews" : "candidata",
          entradaNawat,
          fuenteAndrews: row.dataset.particleSourceForm || "",
          seccionAndrews: row.dataset.particleSection || "",
          claseFuncional: row.dataset.particleFunctionClass || value || "",
          posicion: row.dataset.particlePlacement || "",
          capa: row.dataset.particleHostLayer || "",
          glosa: row.dataset.particleGloss || "",
          estadoEvidencia: row.dataset.grammarEvidenceStatus || "",
          confirmadoNawat: row.dataset.particleConfirmedNawat || "false",
          generacionLcm: row.dataset.grammarGenerationAllowed || "false",
          rutaLcm: row.dataset.grammarRouteFamily || "",
          etapaLcm: row.dataset.grammarRouteStage || "",
          diagnosticoLcm: diagnosticId,
          resultadoLcm: row.dataset.grammarResultOk || "false"
        };
      }).filter(Boolean);
    }
    function buildParticleViewExportCSV() {
      const rows = getParticleExportRowsFromDom();
      if (!rows.length) {
        return "";
      }
      const header = ["tipo", "entrada Nawat", "fuente Andrews", "sección Andrews", "clase funcional", "posición", "capa", "glosa", "estado evidencia", "confirmado Nawat", "generación de contrato", "ruta de contrato", "etapa de contrato", "diagnóstico de contrato", "resultado de contrato"].map(label => escapeCSVValue(label)).join(",");
      const lines = rows.map(row => [row.tipo, row.entradaNawat, row.fuenteAndrews, row.seccionAndrews, row.claseFuncional, row.posicion, row.capa, row.glosa, row.estadoEvidencia, row.confirmadoNawat, row.generacionLcm, row.rutaLcm, row.etapaLcm, row.diagnosticoLcm, row.resultadoLcm].map(value => escapeCSVValue(value)).join(","));
      return [header, ...lines].join("\n");
    }
    function getViewExportSourceModeLabel(sourceMode = "", isNawat = false) {
      if (sourceMode === targetObject.COMBINED_MODE.nonactive) {
        return targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], isNawat, "no activo");
      }
      return targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-active"], isNawat, "activo");
    }
    function getViewExportObjectHeaders(objectSlotCount, isNawat = false) {
      const normalizedObjectSlotCount = Number.isFinite(objectSlotCount) ? Math.max(0, Math.min(targetObject.VERB_OBJECT_SLOT_SCHEMA.length, Number(objectSlotCount))) : targetObject.VERB_OBJECT_SLOT_SCHEMA.length;
      const useValence3PlusRoleLabels = normalizedObjectSlotCount >= 2;
      return targetObject.VERB_OBJECT_SLOT_SCHEMA.slice(0, normalizedObjectSlotCount).map(slot => useValence3PlusRoleLabels ? targetObject.getValence3PlusSlotRoleLabel(slot.id, isNawat) || slot.exportHeader : slot.exportHeader);
    }
    function buildViewExportCSV() {
      const particleCsv = buildParticleViewExportCSV();
      if (particleCsv) {
        return particleCsv;
      }
      const rows = collectVisibleConjugationRows();
      if (!rows.length) {
        return "";
      }
      const verbInput = targetObject.document.getElementById("verb");
      const inputValue = verbInput ? verbInput.value.trim() : "";
      const derivationSelect = targetObject.document.getElementById("derivation-type");
      const derivationValue = derivationSelect ? derivationSelect.value : "";
      const isNawat = targetObject.getIsNawat();
      const exportObjectSlotCount = rows.reduce((max, row) => Math.max(max, Number.isFinite(row.objectSlotCount) ? row.objectSlotCount : 0), 0);
      const exportSlots = targetObject.VERB_OBJECT_SLOT_SCHEMA.slice(0, exportObjectSlotCount);
      const objectHeaders = getViewExportObjectHeaders(exportObjectSlotCount, isNawat);
      const header = ["entrada", "derivación", "sujeto", ...objectHeaders, "fuente", "bloque", "persona", "forma", "formula fuente", "formula Andrews", "formula conjugador", "ruta formula", "ruta Andrews->conjugador", "pares forma-formula", "ruta de contrato", "etapa de contrato", "generación de contrato", "Andrews", "estado evidencia", "ortografia Nawat/Pipil", "tipo evidencia fuente", "estado evidencia fuente", "estado diagnóstico de contrato", "diagnóstico de contrato", "capa fallida", "contrato fallido", "resultado de contrato"].map(label => escapeCSVValue(label)).join(",");
      const lines = rows.map(row => [row.inputValue || inputValue, derivationValue, row.subjectToggle, ...exportSlots.map(slot => row[slot.exportKey]), getViewExportSourceModeLabel(row.sourceMode, isNawat), row.block, row.person, row.value, row.sourceFormulaEcho, row.andrewsFormulaEcho, row.conjugatorFormulaEcho, row.sourceToTargetFormulaEcho, row.andrewsToConjugatorFormulaEcho, row.formulaSurfacePairs, row.grammarRouteFamily, row.grammarRouteStage, row.grammarGenerationAllowed, row.grammarAuthorityRefs || row.grammarAuthorityRef, row.grammarEvidenceStatus, row.grammarOrthographyRefs || row.grammarOrthographyRef, row.grammarSourceEvidenceKind, row.grammarSourceEvidenceStatus, row.grammarDiagnosticStatus, row.grammarDiagnosticId, row.grammarDiagnosticLayer, row.grammarDiagnosticContractLayer, row.grammarResultOk].map(value => escapeCSVValue(value)).join(","));
      return [header, ...lines].join("\n");
    }
    function downloadViewExportCSV() {
      const csvText = buildViewExportCSV();
      if (!csvText) {
        return;
      }
      const blob = new targetObject.Blob([csvText], {
        type: "text/csv;charset=utf-8"
      });
      const url = targetObject.URL.createObjectURL(blob);
      const link = targetObject.document.createElement("a");
      link.href = url;
      link.download = "vista-conjugaciones.csv";
      targetObject.document.body.appendChild(link);
      link.click();
      link.remove();
      targetObject.window.setTimeout(() => targetObject.URL.revokeObjectURL(url), 0);
    }
    function buildPersonSubSlotStripViewExportCSV() {
      const rows = collectPersonSubSlotStripExportRowsFromDom();
      if (!rows.length) {
        return "";
      }
      const verbInput = targetObject.document.getElementById("verb");
      const inputValue = verbInput ? verbInput.value.trim() : "";
      const isNawat = targetObject.getIsNawat();
      const header = ["entrada", "fuente", "bloque", "persona", "forma", "resumen", "person-sub__slot-strip", "tipos de ficha", "detalles de ficha"].map(label => escapeCSVValue(label)).join(",");
      const lines = rows.map(row => [row.inputValue || inputValue, row.sourceLabel || getViewExportSourceModeLabel(row.sourceMode, isNawat), row.block, row.person, row.form, row.compactSubLabel, row.slotStrip, row.slotKinds, row.slotDetails].map(value => escapeCSVValue(value)).join(","));
      return [header, ...lines].join("\n");
    }
    function downloadPersonSubSlotStripViewExportCSV() {
      const csvText = buildPersonSubSlotStripViewExportCSV();
      if (!csvText) {
        return;
      }
      const blob = new targetObject.Blob([csvText], {
        type: "text/csv;charset=utf-8"
      });
      const url = targetObject.URL.createObjectURL(blob);
      const link = targetObject.document.createElement("a");
      link.href = url;
      link.download = "vista-slot-strip.csv";
      targetObject.document.body.appendChild(link);
      link.click();
      link.remove();
      targetObject.window.setTimeout(() => targetObject.URL.revokeObjectURL(url), 0);
    }

    // ─── Causative derivation report ─────────────────────────────────────────────

    var CAUSATIVE_GATE_LABELS = {
      baseIsTransitive: "Transitivo base",
      allowTypeTwoIntransitiveU: "Intransitivo termina en -u",
      allowTypeTwoIntransitiveA: "Intransitivo termina en -a (lista tipotwo)",
      allowTypeTwoIntransitiveNiUwa: "Intransitivo -ni ≥3 sílabas con no-activo -uwa",
      allowTypeTwoIntransitiveKi: "Intransitivo -ki (forma CV)",
      allowTypeTwoIntransitiveUwa: "Intransitivo con no-activo permitido (allowWhenHasNonactiveSuffixes)",
      allowTypeTwoIntransitiveLu: "Intransitivo monosílabo con no-activo -lu"
    };
    var CAUSATIVE_RULE_LABELS = {
      "replace-final-ti-phonological": "Reemplazo fonológico -ti → -ta",
      "replace-final-i-phonological": "Reemplazo fonológico -i → -a",
      "addition-phonological-i": "Adición fonológica -i → -ia",
      "replace-final-a": "Reemplazo final -a → -a (estabilización)",
      "root-plus-ya": "Raíz + ya → reducción",
      "descriptor-ki-cv-cv-w-onset-tza": "Reemplazo -ki → -tza (contexto CV-w)",
      "ti-class-have-direct": "Clase -ti tiene directa -tia (tipo 2 forzado)",
      "wi-direct-tia": "Intransitivo -wi → -witia (tipo 2)"
    };
    function describeCausativeRule(rule) {
      if (!rule) {
        return "—";
      }
      if (CAUSATIVE_RULE_LABELS[rule]) {
        return CAUSATIVE_RULE_LABELS[rule];
      }
      if (rule.startsWith("type-one-policy-")) {
        return "Política tipo 1 para clase " + rule.slice("type-one-policy-".length);
      }
      if (rule.startsWith("destockal-")) {
        return "Destockalización (" + rule.slice("destockal-".length) + ")";
      }
      if (rule.startsWith("nonactive-")) {
        return "Derivado de no-activo (" + rule.slice("nonactive-".length) + ")";
      }
      return rule;
    }
    function buildCausativeDerivationReportHTML() {
      if (typeof targetObject.getVerbInputMeta !== "function" || typeof targetObject.getCausativeDerivationOptions !== "function") {
        return null;
      }
      var verbMeta = targetObject.getVerbInputMeta();
      // Use the same priority order as the causative probe in updateDerivationTypeControl
      var verb = verbMeta.analysisVerb || verbMeta.displayVerb || verbMeta.screenDisplayVerb || verbMeta.exactBaseVerb || "";
      if (!verb) {
        return null;
      }
      var gateResult = {
        allowTypeTwo: verbMeta.isMarkedTransitive === true,
        baseIsTransitive: verbMeta.isMarkedTransitive === true,
        gates: {}
      };
      try {
        if (typeof targetObject.computeAllowTypeTwoCausativeForParsedVerb === "function") {
          gateResult = targetObject.computeAllowTypeTwoCausativeForParsedVerb(verbMeta);
        }
      } catch (_gateErr) {
        console.warn("Causative report: gate computation failed, using fallback.", _gateErr);
      }
      var ruleBase = verbMeta.canonicalRuleBase || verb;
      var options = [];
      try {
        options = targetObject.getCausativeDerivationOptions(ruleBase, ruleBase, {
          isTransitive: gateResult.baseIsTransitive,
          allowTypeTwo: true,
          // always true here so both types appear in the report
          isYawi: verbMeta.isYawi === true,
          ruleBase,
          fullRuleBase: verbMeta.canonicalFullRuleBase || ruleBase,
          canonicalRuleBase: ruleBase,
          canonicalFullRuleBase: verbMeta.canonicalFullRuleBase || ruleBase,
          rootPlusYaBase: verbMeta.rootPlusYaBase || "",
          hasLeadingDash: verbMeta.hasLeadingDash === true,
          parsedVerb: verbMeta
        });
      } catch (_e) {}
      var esc = function (s) {
        return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };
      var gateRows = "";
      var gates = gateResult.gates || {};
      Object.keys(CAUSATIVE_GATE_LABELS).forEach(function (key) {
        var active = Boolean(gates[key]);
        gateRows += "<tr>" + "<td>" + esc(CAUSATIVE_GATE_LABELS[key]) + "</td>" + "<td class='rpt-" + (active ? "yes" : "no") + "'>" + (active ? "SÍ" : "NO") + "</td>" + "</tr>";
      });
      var optionRows = "";
      if (options.length === 0) {
        optionRows = "<tr><td colspan='4'><em>Sin opciones generadas</em></td></tr>";
      } else {
        options.forEach(function (opt, i) {
          var stem = opt.stem || (opt.stemSpec ? opt.stemSpec.output || opt.stemSpec.value || "" : "");
          var type = opt.type === "type-two" ? "Tipo 2" : "Tipo 1";
          var typeClass = opt.type === "type-two" ? "rpt-type2" : "rpt-type1";
          var rule = describeCausativeRule(opt.rule);
          var pref = opt.preferred ? "★" : "";
          var blocked = opt.type === "type-two" && !gateResult.allowTypeTwo ? " rpt-blocked" : "";
          optionRows += "<tr class='" + typeClass + blocked + "'>" + "<td>" + (i + 1) + "</td>" + "<td>" + esc(stem) + "</td>" + "<td>" + esc(type) + pref + "</td>" + "<td>" + esc(rule) + "</td>" + "</tr>";
        });
      }
      var now = new Date();
      var dateStr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
      return "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>" + "<title>Informe causativo — " + esc(verb) + "</title>" + "<style>" + "body{font-family:system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 1rem;color:#1a1a1a}" + "h1{font-size:1.3rem;margin-bottom:.25rem}" + ".subtitle{color:#666;font-size:.9rem;margin-bottom:1.5rem}" + "h2{font-size:1rem;margin:1.5rem 0 .5rem;border-bottom:1px solid #ddd;padding-bottom:.25rem}" + "table{width:100%;border-collapse:collapse;font-size:.9rem}" + "th{text-align:left;padding:.4rem .6rem;background:#f4f4f4;border-bottom:2px solid #ccc}" + "td{padding:.35rem .6rem;border-bottom:1px solid #eee}" + ".rpt-yes{color:#1a7f37;font-weight:600}" + ".rpt-no{color:#888}" + ".rpt-type1{background:#f0f8ff}" + ".rpt-type2{background:#fff8f0}" + ".rpt-blocked{opacity:.45}" + ".gate-result{font-weight:600;margin:.75rem 0 1.25rem;font-size:.95rem}" + ".gate-result.allowed{color:#1a7f37}" + ".gate-result.blocked{color:#c00}" + "</style></head><body>" + "<h1>Informe de derivación causativa</h1>" + "<div class='subtitle'>Verbo: <strong>" + esc(verb) + "</strong> &nbsp;·&nbsp; " + dateStr + "</div>" + "<h2>Condiciones de habilitación (Tipo 2)</h2>" + "<table><thead><tr><th>Condición</th><th>Activa</th></tr></thead><tbody>" + gateRows + "</tbody></table>" + "<p class='gate-result " + (gateResult.allowTypeTwo ? "allowed" : "blocked") + "'>" + "Resultado: Tipo 2 " + (gateResult.allowTypeTwo ? "HABILITADO" : "NO habilitado") + "</p>" + "<h2>Opciones generadas (allowTypeTwo=true para mostrar todo)</h2>" + "<table><thead><tr><th>#</th><th>Tallo derivado</th><th>Tipo</th><th>Regla / condición</th></tr></thead><tbody>" + optionRows + "</tbody></table>" + (gateResult.allowTypeTwo ? "" : "<p style='font-size:.85rem;color:#888;margin-top:.5rem'>Las opciones marcadas con opacidad reducida son de Tipo 2 y no serán generadas para este verbo.</p>") + "</body></html>";
    }
    function downloadCausativeDerivationReport() {
      var html;
      try {
        html = buildCausativeDerivationReportHTML();
      } catch (err) {
        console.error("Causative report error:", err);
        html = "<!DOCTYPE html><html><body><pre>Error al generar el informe:\n" + String(err) + "</pre></body></html>";
      }
      if (!html) {
        console.warn("Causative report: no verb entered or report could not be built.");
        return;
      }
      var verbMeta = typeof targetObject.getVerbInputMeta === "function" ? targetObject.getVerbInputMeta() : {};
      var verb = (verbMeta.analysisVerb || verbMeta.displayVerb || "causativo").replace(/[^a-z0-9]/gi, "_");
      var blob = new targetObject.Blob([html], {
        type: "text/html;charset=utf-8"
      });
      var url = targetObject.URL.createObjectURL(blob);
      var link = targetObject.document.createElement("a");
      link.href = url;
      link.download = "causativo-" + verb + ".html";
      targetObject.document.body.appendChild(link);
      link.click();
      link.remove();
      targetObject.window.setTimeout(function () {
        targetObject.URL.revokeObjectURL(url);
      }, 0);
    }
    function initCausativeReport() {
      var button = targetObject.document.getElementById("causative-report-download");
      if (!button) {
        return;
      }
      button.addEventListener("click", function () {
        downloadCausativeDerivationReport();
      });
    }

    // ─────────────────────────────────────────────────────────────────────────────

    function initViewExport() {
      const button = targetObject.document.getElementById("view-export-csv");
      if (button) {
        button.addEventListener("click", () => {
          downloadViewExportCSV();
        });
      }
      const slotStripButton = targetObject.document.getElementById("view-export-slot-strip-csv");
      if (slotStripButton) {
        slotStripButton.addEventListener("click", () => {
          downloadPersonSubSlotStripViewExportCSV();
        });
      }
    }

    const api = {};
    api.escapeCSVValue = escapeCSVValue;
    api.normalizeUnifiedVerbOutputObjectSlotCount = normalizeUnifiedVerbOutputObjectSlotCount;
    api.normalizeUnifiedVerbOutputBooleanText = normalizeUnifiedVerbOutputBooleanText;
    api.normalizeUnifiedVerbOutputSurfaceValue = normalizeUnifiedVerbOutputSurfaceValue;
    api.splitUnifiedVerbOutputSurfaceText = splitUnifiedVerbOutputSurfaceText;
    api.getUnifiedVerbOutputGrammarFrame = getUnifiedVerbOutputGrammarFrame;
    api.getUnifiedVerbOutputResultFrame = getUnifiedVerbOutputResultFrame;
    api.getUnifiedVerbOutputSurfaceForms = getUnifiedVerbOutputSurfaceForms;
    api.getUnifiedVerbOutputForm = getUnifiedVerbOutputForm;
    api.getVisibleConjugationValueExportText = getVisibleConjugationValueExportText;
    api.getVisibleConjugationFormulaSurfaceExportMetadata = getVisibleConjugationFormulaSurfaceExportMetadata;
    api.normalizeViewExportDomText = normalizeViewExportDomText;
    api.isViewExportNodeHidden = isViewExportNodeHidden;
    api.getPersonSubSlotChipKind = getPersonSubSlotChipKind;
    api.getPersonSubSlotChipText = getPersonSubSlotChipText;
    api.getPersonSubSlotChipDetail = getPersonSubSlotChipDetail;
    api.normalizeUnifiedVerbOutputGrammarMetadata = normalizeUnifiedVerbOutputGrammarMetadata;
    api.getUnifiedVerbOutputGrammarDatasetMetadata = getUnifiedVerbOutputGrammarDatasetMetadata;
    api.normalizeUnifiedVerbOutputEntry = normalizeUnifiedVerbOutputEntry;
    api.projectUnifiedVerbOutputVisibleRow = projectUnifiedVerbOutputVisibleRow;
    api.buildUnifiedVerbOutputBaseKey = buildUnifiedVerbOutputBaseKey;
    api.buildUnifiedVerbOutputSourceKey = buildUnifiedVerbOutputSourceKey;
    api.setUnifiedVerbOutputDatasetRows = setUnifiedVerbOutputDatasetRows;
    api.collectStructuredUnifiedVerbOutputRows = collectStructuredUnifiedVerbOutputRows;
    api.collectVisibleConjugationRowsFromDom = collectVisibleConjugationRowsFromDom;
    api.collectVisibleConjugationRows = collectVisibleConjugationRows;
    api.collectPersonSubSlotStripExportRowsFromDom = collectPersonSubSlotStripExportRowsFromDom;
    api.getParticleExportRowsFromDom = getParticleExportRowsFromDom;
    api.buildParticleViewExportCSV = buildParticleViewExportCSV;
    api.getViewExportSourceModeLabel = getViewExportSourceModeLabel;
    api.getViewExportObjectHeaders = getViewExportObjectHeaders;
    api.buildViewExportCSV = buildViewExportCSV;
    api.downloadViewExportCSV = downloadViewExportCSV;
    api.buildPersonSubSlotStripViewExportCSV = buildPersonSubSlotStripViewExportCSV;
    api.downloadPersonSubSlotStripViewExportCSV = downloadPersonSubSlotStripViewExportCSV;
    Object.defineProperty(api, "CAUSATIVE_GATE_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return CAUSATIVE_GATE_LABELS; },
        set(value) { CAUSATIVE_GATE_LABELS = value; },
    });
    Object.defineProperty(api, "CAUSATIVE_RULE_LABELS", {
        configurable: true,
        enumerable: true,
        get() { return CAUSATIVE_RULE_LABELS; },
        set(value) { CAUSATIVE_RULE_LABELS = value; },
    });
    api.describeCausativeRule = describeCausativeRule;
    api.buildCausativeDerivationReportHTML = buildCausativeDerivationReportHTML;
    api.downloadCausativeDerivationReport = downloadCausativeDerivationReport;
    api.initCausativeReport = initCausativeReport;
    api.initViewExport = initViewExport;
    return api;
}

export function installUiExportGlobals(targetObject = globalThis) {
    const api = createUiExportApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
