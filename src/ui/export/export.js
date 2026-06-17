// ui/export/export.js
// CSV export of conjugation results.
// Extracted from script.js CSV Export section.
// Global-scope module.
// Deps: UI_LABELS, VERB_OBJECT_SLOT_SCHEMA, VerbUnifiedOutputState

"use strict";

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
    return Math.max(0, Math.min(VERB_OBJECT_SLOT_SCHEMA.length, Number(value)));
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
    if (typeof normalizeGrammarSurfaceValue === "function") {
        return normalizeGrammarSurfaceValue(value);
    }
    const text = String(value || "").trim();
    return text === "—" ? "" : text;
}

function splitUnifiedVerbOutputSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeUnifiedVerbOutputSurfaceValue(entry))
        .filter(Boolean);
}

function getUnifiedVerbOutputGrammarFrame(source = {}) {
    const entry = source && typeof source === "object" ? source : {};
    const nestedResult = entry.result && typeof entry.result === "object" ? entry.result : null;
    return (
        (entry.grammarFrame && typeof entry.grammarFrame === "object" ? entry.grammarFrame : null)
        || (entry.frames && typeof entry.frames === "object" ? entry.frames : null)
        || (nestedResult?.grammarFrame && typeof nestedResult.grammarFrame === "object" ? nestedResult.grammarFrame : null)
        || (nestedResult?.frames && typeof nestedResult.frames === "object" ? nestedResult.frames : null)
    );
}

function getUnifiedVerbOutputResultFrame(source = {}) {
    const grammarFrame = getUnifiedVerbOutputGrammarFrame(source);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
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
        return forms
            .flatMap((entryValue) => splitUnifiedVerbOutputSurfaceText(entryValue))
            .filter((entryValue, index, list) => entryValue && list.indexOf(entryValue) === index);
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
    return forms
        .flatMap((entryValue) => splitUnifiedVerbOutputSurfaceText(entryValue))
        .filter((entryValue, index, list) => entryValue && list.indexOf(entryValue) === index);
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
        const surfaceLines = Array.from(surfaceNode.querySelectorAll?.(".conjugation-conversion-surface-line") || [])
            .map((node) => node.textContent.trim())
            .filter(Boolean);
        if (surfaceLines.length) {
            return surfaceLines.join("\n");
        }
        return surfaceNode.textContent.trim();
    }
    const clone = valueNode.cloneNode(true);
    clone.querySelectorAll?.(".conjugation-conversion-actions").forEach((node) => node.remove());
    return clone.textContent.trim();
}

function normalizeUnifiedVerbOutputGrammarMetadata(source = {}, defaults = {}) {
    const src = source && typeof source === "object" ? source : {};
    const fallback = defaults && typeof defaults === "object" ? defaults : {};
    const getText = (key) => String(
        Object.prototype.hasOwnProperty.call(src, key) ? src[key] : (fallback[key] || "")
    ).trim();
    const getBooleanText = (key) => normalizeUnifiedVerbOutputBooleanText(
        Object.prototype.hasOwnProperty.call(src, key) ? src[key] : fallback[key]
    );
    return {
        inputValue: getText("inputValue"),
        grammarAuthorityRef: getText("grammarAuthorityRef"),
        grammarAuthorityRefs: getText("grammarAuthorityRefs"),
        grammarEvidenceStatus: getText("grammarEvidenceStatus"),
        grammarNawatEvidenceRef: getText("grammarNawatEvidenceRef"),
        grammarNawatEvidenceRefs: getText("grammarNawatEvidenceRefs"),
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
    };
}

function getUnifiedVerbOutputGrammarDatasetMetadata(dataset = {}) {
    const data = dataset && typeof dataset === "object" ? dataset : {};
    return normalizeUnifiedVerbOutputGrammarMetadata({
        grammarAuthorityRef: data.grammarAuthorityRef || "",
        grammarAuthorityRefs: data.grammarAuthorityRefs || data.grammarAuthorityRef || "",
        grammarEvidenceStatus: data.grammarEvidenceStatus || data.lcmEvidenceStatus || "",
        grammarNawatEvidenceRef: data.grammarNawatEvidenceRef || "",
        grammarNawatEvidenceRefs: data.grammarNawatEvidenceRefs || data.grammarNawatEvidenceRef || "",
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
    });
}

function normalizeUnifiedVerbOutputEntry(entry = {}, defaults = {}) {
    const source = entry && typeof entry === "object" ? entry : {};
    const normalized = {
        tenseValue: String(source.tenseValue || defaults.tenseValue || ""),
        groupKey: String(source.groupKey || defaults.groupKey || ""),
        sourceMode: source.sourceMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active,
        block: String(source.block || ""),
        person: String(source.person || ""),
        personSub: String(source.personSub || ""),
        subjectToggle: String(source.subjectToggle || ""),
        object: getZeroObjectDisplayValue(source.object || ""),
        object2: getZeroObjectDisplayValue(source.object2 || ""),
        object3: getZeroObjectDisplayValue(source.object3 || ""),
        form: getUnifiedVerbOutputForm(source, defaults),
        objectSlotCount: normalizeUnifiedVerbOutputObjectSlotCount(
            source.objectSlotCount ?? defaults.objectSlotCount ?? 0
        ),
        ...normalizeUnifiedVerbOutputGrammarMetadata(source, defaults),
    };
    if (!normalized.objectSlotCount) {
        const derivedSlotCount = VERB_OBJECT_SLOT_SCHEMA.reduce((count, slot, index) => (
            normalized[slot.id] ? Math.max(count, index + 1) : count
        ), 0);
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
        ...normalizeUnifiedVerbOutputGrammarMetadata(row),
    };
}

function buildUnifiedVerbOutputBaseKey(entry = {}) {
    return [
        entry.groupKey,
        entry.tenseValue,
        entry.block,
        entry.person,
        entry.personSub,
        entry.subjectToggle,
        entry.object,
        entry.object2,
        entry.object3,
    ].join("|");
}

function buildUnifiedVerbOutputSourceKey(entry = {}) {
    return `${buildUnifiedVerbOutputBaseKey(entry)}|${entry.sourceMode || COMBINED_MODE.active}`;
}

function setUnifiedVerbOutputDatasetRows(rows = [], defaults = {}) {
    const normalizedRows = (Array.isArray(rows) ? rows : [])
        .map((entry) => normalizeUnifiedVerbOutputEntry(entry, defaults))
        .filter((entry) => (
            Boolean(entry.block)
            || Boolean(entry.person)
            || Boolean(entry.personSub)
            || Boolean(entry.form)
        ));
    const bySourceKey = new Map();
    const grouped = new Map();
    normalizedRows.forEach((entry) => {
        const baseKey = buildUnifiedVerbOutputBaseKey(entry);
        const sourceKey = buildUnifiedVerbOutputSourceKey(entry);
        bySourceKey.set(sourceKey, entry);
        const groupedEntry = grouped.get(baseKey) || {};
        groupedEntry[entry.sourceMode] = entry;
        grouped.set(baseKey, groupedEntry);
    });
    VerbUnifiedOutputState.rows = normalizedRows;
    VerbUnifiedOutputState.bySourceKey = bySourceKey;
    VerbUnifiedOutputState.grouped = grouped;
    VerbUnifiedOutputState.updatedAt = Date.now();
}

function collectStructuredUnifiedVerbOutputRows(container, defaults = {}) {
    if (!container || typeof container.querySelectorAll !== "function") {
        return [];
    }
    const rows = [];
    const blocks = Array.from(container.querySelectorAll(".tense-block"));
    blocks.forEach((block) => {
        const blockRows = Array.isArray(block.__outputRows) ? block.__outputRows : [];
        blockRows.forEach((entry) => {
            rows.push(normalizeUnifiedVerbOutputEntry(entry, defaults));
        });
    });
    return rows;
}

function collectVisibleConjugationRowsFromDom() {
    const container = document.getElementById("all-tense-conjugations");
    if (!container) {
        return [];
    }
    const rows = [];
    const blocks = Array.from(container.querySelectorAll(".tense-block"));
    blocks.forEach((block) => {
        const blockLabel = block.querySelector(".tense-block__label")?.textContent.trim() || "";
        const sourceColumn = block.closest(".tense-grid-source-column");
        const sourceMode = sourceColumn?.dataset?.sourceMode === COMBINED_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        const toggleMap = VERB_OBJECT_SLOT_SCHEMA.reduce((acc, slot) => {
            acc[slot.id] = "";
            return acc;
        }, { subject: "" });
        const explicitObjectToggleCount = block.querySelectorAll(
            '.tense-block__controls .object-toggle[data-toggle-type="object"]'
        ).length;
        const toggles = Array.from(block.querySelectorAll(".tense-block__controls .object-toggle"));
        toggles.forEach((toggle) => {
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
        rowNodes.forEach((row) => {
            const personLabel = row.querySelector(".person-label")?.textContent.trim() || "";
            const value = getVisibleConjugationValueExportText(row);
            if (!personLabel && !value) {
                return;
            }
            const exportRow = {
                inputValue: Object.prototype.hasOwnProperty.call(row.dataset, "exportInput")
                    ? row.dataset.exportInput
                    : "",
                subjectToggle: toggleMap.subject,
                sourceMode,
                block: blockLabel,
                person: personLabel,
                personSub: row.querySelector(".person-sub")?.textContent.trim() || "",
                form: value,
                objectSlotCount: explicitObjectToggleCount,
            };
            VERB_OBJECT_SLOT_SCHEMA.forEach((slot) => {
                const hasDatasetValue = Object.prototype.hasOwnProperty.call(row.dataset, slot.datasetKey);
                const fallbackValue = toggleMap[slot.id] || "";
                const rawValue = hasDatasetValue ? row.dataset[slot.datasetKey] : fallbackValue;
                exportRow[slot.id] = rawValue;
            });
            Object.assign(exportRow, getUnifiedVerbOutputGrammarDatasetMetadata(row.dataset));
            rows.push(normalizeUnifiedVerbOutputEntry(exportRow));
        });
    });
    return rows.map((row) => projectUnifiedVerbOutputVisibleRow(row));
}

function collectVisibleConjugationRows() {
    if (Array.isArray(VerbUnifiedOutputState.rows) && VerbUnifiedOutputState.rows.length) {
        return VerbUnifiedOutputState.rows.map((row) => projectUnifiedVerbOutputVisibleRow(row));
    }
    return collectVisibleConjugationRowsFromDom();
}

function getParticleExportRowsFromDom() {
    const container = document.getElementById("all-tense-conjugations");
    if (!container || typeof container.querySelectorAll !== "function") {
        return [];
    }
    const particleRows = Array.from(container.querySelectorAll(".conjugation-row--particle"));
    if (!particleRows.length) {
        return [];
    }
    return particleRows
        .map((row) => {
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
            const entryKind = row.dataset.particleEntryKind || (
                blockLabel.includes("Muestra Andrews") || blockLabel.includes("Ejemplos Andrews")
                    ? "andrews-seed"
                    : "mode-diagnostic"
            );
            const rowId = row.dataset.particleRow || "";
            const isEmptyCandidate = diagnosticId === "particle-candidate-empty";
            if (entryKind !== "andrews-seed" && (rowId !== "candidate" || isEmptyCandidate)) {
                return null;
            }
            const entradaNawat = row.dataset.particleNawatForm
                || row.dataset.exportInput
                || (entryKind === "andrews-seed" ? label : value)
                || "";
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
                resultadoLcm: row.dataset.grammarResultOk || "false",
            };
        })
        .filter(Boolean);
}

function buildParticleViewExportCSV() {
    const rows = getParticleExportRowsFromDom();
    if (!rows.length) {
        return "";
    }
    const header = [
        "tipo",
        "entrada Nawat",
        "fuente Andrews",
        "sección Andrews",
        "clase funcional",
        "posición",
        "capa",
        "glosa",
        "estado evidencia",
        "confirmado Nawat",
        "generación de contrato",
        "ruta de contrato",
        "etapa de contrato",
        "diagnóstico de contrato",
        "resultado de contrato",
    ].map((label) => escapeCSVValue(label)).join(",");
    const lines = rows.map((row) => ([
        row.tipo,
        row.entradaNawat,
        row.fuenteAndrews,
        row.seccionAndrews,
        row.claseFuncional,
        row.posicion,
        row.capa,
        row.glosa,
        row.estadoEvidencia,
        row.confirmadoNawat,
        row.generacionLcm,
        row.rutaLcm,
        row.etapaLcm,
        row.diagnosticoLcm,
        row.resultadoLcm,
    ].map((value) => escapeCSVValue(value)).join(",")));
    return [header, ...lines].join("\n");
}

function getViewExportSourceModeLabel(sourceMode = "", isNawat = false) {
    if (sourceMode === COMBINED_MODE.nonactive) {
        return getLocalizedLabel(UI_LABELS["tense-tabs-mode-nonactive"], isNawat, "no activo");
    }
    return getLocalizedLabel(UI_LABELS["tense-tabs-mode-active"], isNawat, "activo");
}

function getViewExportObjectHeaders(objectSlotCount, isNawat = false) {
    const normalizedObjectSlotCount = Number.isFinite(objectSlotCount)
        ? Math.max(0, Math.min(VERB_OBJECT_SLOT_SCHEMA.length, Number(objectSlotCount)))
        : VERB_OBJECT_SLOT_SCHEMA.length;
    const useValence3PlusRoleLabels = normalizedObjectSlotCount >= 2;
    return VERB_OBJECT_SLOT_SCHEMA.slice(0, normalizedObjectSlotCount).map((slot) => (
        useValence3PlusRoleLabels
            ? (getValence3PlusSlotRoleLabel(slot.id, isNawat) || slot.exportHeader)
            : slot.exportHeader
    ));
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
    const verbInput = document.getElementById("verb");
    const inputValue = verbInput ? verbInput.value.trim() : "";
    const derivationSelect = document.getElementById("derivation-type");
    const derivationValue = derivationSelect ? derivationSelect.value : "";
    const isNawat = getIsNawat();
    const exportObjectSlotCount = rows.reduce((max, row) => (
        Math.max(max, Number.isFinite(row.objectSlotCount) ? row.objectSlotCount : 0)
    ), 0);
    const exportSlots = VERB_OBJECT_SLOT_SCHEMA.slice(0, exportObjectSlotCount);
    const objectHeaders = getViewExportObjectHeaders(exportObjectSlotCount, isNawat);
    const header = [
        "entrada",
        "derivación",
        "sujeto",
        ...objectHeaders,
        "fuente",
        "bloque",
        "persona",
        "forma",
        "ruta de contrato",
        "etapa de contrato",
        "generación de contrato",
        "Andrews",
        "estado evidencia",
        "evidencia Nawat",
        "tipo evidencia fuente",
        "estado evidencia fuente",
        "estado diagnóstico de contrato",
        "diagnóstico de contrato",
        "capa fallida",
        "contrato fallido",
        "resultado de contrato",
    ]
        .map((label) => escapeCSVValue(label))
        .join(",");
    const lines = rows.map((row) => ([
        row.inputValue || inputValue,
        derivationValue,
        row.subjectToggle,
        ...exportSlots.map((slot) => row[slot.exportKey]),
        getViewExportSourceModeLabel(row.sourceMode, isNawat),
        row.block,
        row.person,
        row.value,
        row.grammarRouteFamily,
        row.grammarRouteStage,
        row.grammarGenerationAllowed,
        row.grammarAuthorityRefs || row.grammarAuthorityRef,
        row.grammarEvidenceStatus,
        row.grammarNawatEvidenceRefs || row.grammarNawatEvidenceRef,
        row.grammarSourceEvidenceKind,
        row.grammarSourceEvidenceStatus,
        row.grammarDiagnosticStatus,
        row.grammarDiagnosticId,
        row.grammarDiagnosticLayer,
        row.grammarDiagnosticContractLayer,
        row.grammarResultOk,
    ].map((value) => escapeCSVValue(value)).join(",")));
    return [header, ...lines].join("\n");
}

function downloadViewExportCSV() {
    const csvText = buildViewExportCSV();
    if (!csvText) {
        return;
    }
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vista-conjugaciones.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

// ─── Causative derivation report ─────────────────────────────────────────────

var CAUSATIVE_GATE_LABELS = {
    baseIsTransitive:             "Transitivo base",
    allowTypeTwoIntransitiveU:    "Intransitivo termina en -u",
    allowTypeTwoIntransitiveA:    "Intransitivo termina en -a (lista tipotwo)",
    allowTypeTwoIntransitiveNiUwa:"Intransitivo -ni ≥3 sílabas con no-activo -uwa",
    allowTypeTwoIntransitiveKi:   "Intransitivo -ki (forma CV)",
    allowTypeTwoIntransitiveUwa:  "Intransitivo con no-activo permitido (allowWhenHasNonactiveSuffixes)",
    allowTypeTwoIntransitiveLu:   "Intransitivo monosílabo con no-activo -lu",
};

var CAUSATIVE_RULE_LABELS = {
    "replace-final-ti-phonological":   "Reemplazo fonológico -ti → -ta",
    "replace-final-i-phonological":    "Reemplazo fonológico -i → -a",
    "addition-phonological-i":         "Adición fonológica -i → -ia",
    "replace-final-a":                 "Reemplazo final -a → -a (estabilización)",
    "root-plus-ya":                     "Raíz + ya → reducción",
    "descriptor-ki-cv-cv-w-onset-tza": "Reemplazo -ki → -tza (contexto CV-w)",
    "ti-class-have-direct":            "Clase -ti tiene directa -tia (tipo 2 forzado)",
    "wi-direct-tia":                   "Intransitivo -wi → -witia (tipo 2)",
};

function describeCausativeRule(rule) {
    if (!rule) { return "—"; }
    if (CAUSATIVE_RULE_LABELS[rule]) { return CAUSATIVE_RULE_LABELS[rule]; }
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
    if (typeof getVerbInputMeta !== "function" || typeof getCausativeDerivationOptions !== "function") {
        return null;
    }
    var verbMeta = getVerbInputMeta();
    // Use the same priority order as the causative probe in updateDerivationTypeControl
    var verb = verbMeta.analysisVerb || verbMeta.displayVerb || verbMeta.screenDisplayVerb || verbMeta.exactBaseVerb || "";
    if (!verb) { return null; }

    var gateResult = { allowTypeTwo: verbMeta.isMarkedTransitive === true, baseIsTransitive: verbMeta.isMarkedTransitive === true, gates: {} };
    try {
        if (typeof computeAllowTypeTwoCausativeForParsedVerb === "function") {
            gateResult = computeAllowTypeTwoCausativeForParsedVerb(verbMeta);
        }
    } catch (_gateErr) {
        console.warn("Causative report: gate computation failed, using fallback.", _gateErr);
    }

    var ruleBase = verbMeta.canonicalRuleBase || verb;
    var options = [];
    try {
        options = getCausativeDerivationOptions(ruleBase, ruleBase, {
            isTransitive: gateResult.baseIsTransitive,
            allowTypeTwo: true,   // always true here so both types appear in the report
            isYawi: verbMeta.isYawi === true,
            ruleBase,
            fullRuleBase: verbMeta.canonicalFullRuleBase || ruleBase,
            canonicalRuleBase: ruleBase,
            canonicalFullRuleBase: verbMeta.canonicalFullRuleBase || ruleBase,
            rootPlusYaBase: verbMeta.rootPlusYaBase || "",
            hasLeadingDash: verbMeta.hasLeadingDash === true,
            parsedVerb: verbMeta,
        });
    } catch (_e) {}

    var esc = function(s) {
        return String(s || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    };

    var gateRows = "";
    var gates = gateResult.gates || {};
    Object.keys(CAUSATIVE_GATE_LABELS).forEach(function(key) {
        var active = Boolean(gates[key]);
        gateRows += "<tr>"
            + "<td>" + esc(CAUSATIVE_GATE_LABELS[key]) + "</td>"
            + "<td class='rpt-" + (active ? "yes" : "no") + "'>" + (active ? "SÍ" : "NO") + "</td>"
            + "</tr>";
    });

    var optionRows = "";
    if (options.length === 0) {
        optionRows = "<tr><td colspan='4'><em>Sin opciones generadas</em></td></tr>";
    } else {
        options.forEach(function(opt, i) {
            var stem = opt.stem || (opt.stemSpec ? (opt.stemSpec.output || opt.stemSpec.value || "") : "");
            var type = opt.type === "type-two" ? "Tipo 2" : "Tipo 1";
            var typeClass = opt.type === "type-two" ? "rpt-type2" : "rpt-type1";
            var rule = describeCausativeRule(opt.rule);
            var pref = opt.preferred ? "★" : "";
            var blocked = (opt.type === "type-two" && !gateResult.allowTypeTwo) ? " rpt-blocked" : "";
            optionRows += "<tr class='" + typeClass + blocked + "'>"
                + "<td>" + (i + 1) + "</td>"
                + "<td>" + esc(stem) + "</td>"
                + "<td>" + esc(type) + pref + "</td>"
                + "<td>" + esc(rule) + "</td>"
                + "</tr>";
        });
    }

    var now = new Date();
    var dateStr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");

    return "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>"
        + "<title>Informe causativo — " + esc(verb) + "</title>"
        + "<style>"
        + "body{font-family:system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 1rem;color:#1a1a1a}"
        + "h1{font-size:1.3rem;margin-bottom:.25rem}"
        + ".subtitle{color:#666;font-size:.9rem;margin-bottom:1.5rem}"
        + "h2{font-size:1rem;margin:1.5rem 0 .5rem;border-bottom:1px solid #ddd;padding-bottom:.25rem}"
        + "table{width:100%;border-collapse:collapse;font-size:.9rem}"
        + "th{text-align:left;padding:.4rem .6rem;background:#f4f4f4;border-bottom:2px solid #ccc}"
        + "td{padding:.35rem .6rem;border-bottom:1px solid #eee}"
        + ".rpt-yes{color:#1a7f37;font-weight:600}"
        + ".rpt-no{color:#888}"
        + ".rpt-type1{background:#f0f8ff}"
        + ".rpt-type2{background:#fff8f0}"
        + ".rpt-blocked{opacity:.45}"
        + ".gate-result{font-weight:600;margin:.75rem 0 1.25rem;font-size:.95rem}"
        + ".gate-result.allowed{color:#1a7f37}"
        + ".gate-result.blocked{color:#c00}"
        + "</style></head><body>"
        + "<h1>Informe de derivación causativa</h1>"
        + "<div class='subtitle'>Verbo: <strong>" + esc(verb) + "</strong> &nbsp;·&nbsp; " + dateStr + "</div>"
        + "<h2>Condiciones de habilitación (Tipo 2)</h2>"
        + "<table><thead><tr><th>Condición</th><th>Activa</th></tr></thead><tbody>"
        + gateRows
        + "</tbody></table>"
        + "<p class='gate-result " + (gateResult.allowTypeTwo ? "allowed" : "blocked") + "'>"
        + "Resultado: Tipo 2 " + (gateResult.allowTypeTwo ? "HABILITADO" : "NO habilitado")
        + "</p>"
        + "<h2>Opciones generadas (allowTypeTwo=true para mostrar todo)</h2>"
        + "<table><thead><tr><th>#</th><th>Tallo derivado</th><th>Tipo</th><th>Regla / condición</th></tr></thead><tbody>"
        + optionRows
        + "</tbody></table>"
        + (gateResult.allowTypeTwo ? "" : "<p style='font-size:.85rem;color:#888;margin-top:.5rem'>Las opciones marcadas con opacidad reducida son de Tipo 2 y no serán generadas para este verbo.</p>")
        + "</body></html>";
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
    var verbMeta = typeof getVerbInputMeta === "function" ? getVerbInputMeta() : {};
    var verb = (verbMeta.analysisVerb || verbMeta.displayVerb || "causativo").replace(/[^a-z0-9]/gi, "_");
    var blob = new Blob([html], { type: "text/html;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "causativo-" + verb + ".html";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function() { URL.revokeObjectURL(url); }, 0);
}

function initCausativeReport() {
    var button = document.getElementById("causative-report-download");
    if (!button) { return; }
    button.addEventListener("click", function() {
        downloadCausativeDerivationReport();
    });
}

// ─────────────────────────────────────────────────────────────────────────────

function initViewExport() {
    const button = document.getElementById("view-export-csv");
    if (!button) {
        return;
    }
    button.addEventListener("click", () => {
        downloadViewExportCSV();
    });
}
