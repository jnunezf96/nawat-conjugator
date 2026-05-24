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

    function normalizeUnifiedVerbOutputEntry(entry = {}, defaults = {}) {
        const source = entry && typeof entry === "object" ? entry : {};
        const normalized = {
            tenseValue: String(source.tenseValue || defaults.tenseValue || ""),
            groupKey: String(source.groupKey || defaults.groupKey || ""),
            sourceMode: source.sourceMode === targetObject.COMBINED_MODE.nonactive
                ? targetObject.COMBINED_MODE.nonactive
                : targetObject.COMBINED_MODE.active,
            block: String(source.block || ""),
            person: String(source.person || ""),
            personSub: String(source.personSub || ""),
            subjectToggle: String(source.subjectToggle || ""),
            object: targetObject.getZeroObjectDisplayValue(source.object || ""),
            object2: targetObject.getZeroObjectDisplayValue(source.object2 || ""),
            object3: targetObject.getZeroObjectDisplayValue(source.object3 || ""),
            form: String(source.form || ""),
            objectSlotCount: normalizeUnifiedVerbOutputObjectSlotCount(
                source.objectSlotCount ?? defaults.objectSlotCount ?? 0
            ),
        };
        if (!normalized.objectSlotCount) {
            const derivedSlotCount = targetObject.VERB_OBJECT_SLOT_SCHEMA.reduce((count, slot, index) => (
                normalized[slot.id] ? Math.max(count, index + 1) : count
            ), 0);
            normalized.objectSlotCount = normalizeUnifiedVerbOutputObjectSlotCount(derivedSlotCount);
        }
        return normalized;
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
        return `${buildUnifiedVerbOutputBaseKey(entry)}|${entry.sourceMode || targetObject.COMBINED_MODE.active}`;
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
        blocks.forEach((block) => {
            const blockRows = Array.isArray(block.__outputRows) ? block.__outputRows : [];
            blockRows.forEach((entry) => {
                rows.push(normalizeUnifiedVerbOutputEntry(entry, defaults));
            });
        });
        return rows;
    }

    function collectVisibleConjugationRowsFromDom() {
        const container = targetObject.document?.getElementById("all-tense-conjugations");
        if (!container) {
            return [];
        }
        const rows = [];
        const blocks = Array.from(container.querySelectorAll(".tense-block"));
        blocks.forEach((block) => {
            const blockLabel = block.querySelector(".tense-block__label")?.textContent.trim() || "";
            const sourceColumn = block.closest(".tense-grid-source-column");
            const sourceMode = sourceColumn?.dataset?.sourceMode === targetObject.COMBINED_MODE.nonactive
                ? targetObject.COMBINED_MODE.nonactive
                : targetObject.COMBINED_MODE.active;
            const toggleMap = targetObject.VERB_OBJECT_SLOT_SCHEMA.reduce((acc, slot) => {
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
                const value = row.querySelector(".conjugation-value")?.textContent.trim() || "";
                if (!personLabel && !value) {
                    return;
                }
                const exportRow = {
                    subjectToggle: toggleMap.subject,
                    sourceMode,
                    block: blockLabel,
                    person: personLabel,
                    personSub: row.querySelector(".person-sub")?.textContent.trim() || "",
                    form: value,
                    objectSlotCount: explicitObjectToggleCount,
                };
                targetObject.VERB_OBJECT_SLOT_SCHEMA.forEach((slot) => {
                    const hasDatasetValue = Object.prototype.hasOwnProperty.call(row.dataset, slot.datasetKey);
                    const fallbackValue = toggleMap[slot.id] || "";
                    const rawValue = hasDatasetValue ? row.dataset[slot.datasetKey] : fallbackValue;
                    exportRow[slot.id] = rawValue;
                });
                rows.push(normalizeUnifiedVerbOutputEntry(exportRow));
            });
        });
        return rows.map((row) => ({
            subjectToggle: row.subjectToggle,
            sourceMode: row.sourceMode,
            block: row.block,
            person: row.person,
            personSub: row.personSub,
            value: row.form,
            objectSlotCount: row.objectSlotCount,
            objectToggle: row.object,
            objectToggle2: row.object2,
            objectToggle3: row.object3,
        }));
    }

    function collectVisibleConjugationRows() {
        if (Array.isArray(targetObject.VerbUnifiedOutputState.rows) && targetObject.VerbUnifiedOutputState.rows.length) {
            return targetObject.VerbUnifiedOutputState.rows.map((row) => ({
                subjectToggle: row.subjectToggle,
                sourceMode: row.sourceMode,
                block: row.block,
                person: row.person,
                personSub: row.personSub,
                value: row.form,
                objectSlotCount: row.objectSlotCount,
                objectToggle: row.object,
                objectToggle2: row.object2,
                objectToggle3: row.object3,
            }));
        }
        return collectVisibleConjugationRowsFromDom();
    }

    function getViewExportSourceModeLabel(sourceMode = "", isNawat = false) {
        if (sourceMode === targetObject.COMBINED_MODE.nonactive) {
            return targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], isNawat, "no activo");
        }
        return targetObject.getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-active"], isNawat, "activo");
    }

    function getViewExportObjectHeaders(objectSlotCount, isNawat = false) {
        const normalizedObjectSlotCount = Number.isFinite(objectSlotCount)
            ? Math.max(0, Math.min(targetObject.VERB_OBJECT_SLOT_SCHEMA.length, Number(objectSlotCount)))
            : targetObject.VERB_OBJECT_SLOT_SCHEMA.length;
        const useValence3PlusRoleLabels = normalizedObjectSlotCount >= 2;
        return targetObject.VERB_OBJECT_SLOT_SCHEMA.slice(0, normalizedObjectSlotCount).map((slot) => (
            useValence3PlusRoleLabels
                ? (targetObject.getValence3PlusSlotRoleLabel(slot.id, isNawat) || slot.exportHeader)
                : slot.exportHeader
        ));
    }

    function buildViewExportCSV() {
        const rows = collectVisibleConjugationRows();
        if (!rows.length) {
            return "";
        }
        const verbInput = targetObject.document?.getElementById("verb");
        const inputValue = verbInput ? verbInput.value.trim() : "";
        const derivationSelect = targetObject.document?.getElementById("derivation-type");
        const derivationValue = derivationSelect ? derivationSelect.value : "";
        const isNawat = targetObject.getIsNawat();
        const exportObjectSlotCount = rows.reduce((max, row) => (
            Math.max(max, Number.isFinite(row.objectSlotCount) ? row.objectSlotCount : 0)
        ), 0);
        const exportSlots = targetObject.VERB_OBJECT_SLOT_SCHEMA.slice(0, exportObjectSlotCount);
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
        ]
            .map((label) => escapeCSVValue(label))
            .join(",");
        const lines = rows.map((row) => ([
            inputValue,
            derivationValue,
            row.subjectToggle,
            ...exportSlots.map((slot) => row[slot.exportKey]),
            getViewExportSourceModeLabel(row.sourceMode, isNawat),
            row.block,
            row.person,
            row.value,
        ].map((value) => escapeCSVValue(value)).join(",")));
        return [header, ...lines].join("\n");
    }

    function downloadViewExportCSV() {
        const csvText = buildViewExportCSV();
        if (!csvText) {
            return;
        }
        const blob = new targetObject.Blob([csvText], { type: "text/csv;charset=utf-8" });
        const url = targetObject.URL.createObjectURL(blob);
        const link = targetObject.document.createElement("a");
        link.href = url;
        link.download = "vista-conjugaciones.csv";
        targetObject.document.body.appendChild(link);
        link.click();
        link.remove();
        targetObject.window.setTimeout(() => targetObject.URL.revokeObjectURL(url), 0);
    }

    const CAUSATIVE_GATE_LABELS = {
        baseIsTransitive: "Transitivo base",
        allowTypeTwoIntransitiveU: "Intransitivo termina en -u",
        allowTypeTwoIntransitiveA: "Intransitivo termina en -a (lista tipotwo)",
        allowTypeTwoIntransitiveNiUwa: "Intransitivo -ni ≥3 sílabas con no-activo -uwa",
        allowTypeTwoIntransitiveKi: "Intransitivo -ki (forma CV)",
        allowTypeTwoIntransitiveUwa: "Intransitivo con no-activo permitido (allowWhenHasNonactiveSuffixes)",
        allowTypeTwoIntransitiveLu: "Intransitivo monosílabo con no-activo -lu",
    };

    const CAUSATIVE_RULE_LABELS = {
        "replace-final-ti-phonological": "Reemplazo fonológico -ti → -ta",
        "replace-final-i-phonological": "Reemplazo fonológico -i → -a",
        "addition-phonological-i": "Adición fonológica -i → -ia",
        "replace-final-a": "Reemplazo final -a → -a (estabilización)",
        "root-plus-ya": "Raíz + ya → reducción",
        "descriptor-ki-cv-cv-w-onset-tza": "Reemplazo -ki → -tza (contexto CV-w)",
        "ti-class-have-direct": "Clase -ti tiene directa -tia (tipo 2 forzado)",
        "wi-direct-tia": "Intransitivo -wi → -witia (tipo 2)",
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
        const verbMeta = targetObject.getVerbInputMeta();
        const verb = verbMeta.analysisVerb || verbMeta.displayVerb || verbMeta.screenDisplayVerb || verbMeta.exactBaseVerb || "";
        if (!verb) {
            return null;
        }

        let gateResult = { allowTypeTwo: verbMeta.isMarkedTransitive === true, baseIsTransitive: verbMeta.isMarkedTransitive === true, gates: {} };
        try {
            if (typeof targetObject.computeAllowTypeTwoCausativeForParsedVerb === "function") {
                gateResult = targetObject.computeAllowTypeTwoCausativeForParsedVerb(verbMeta);
            }
        } catch (_gateErr) {
            console.warn("Causative report: gate computation failed, using fallback.", _gateErr);
        }

        const ruleBase = verbMeta.canonicalRuleBase || verb;
        let options = [];
        try {
            options = targetObject.getCausativeDerivationOptions(ruleBase, ruleBase, {
                isTransitive: gateResult.baseIsTransitive,
                allowTypeTwo: true,
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

        const esc = function (s) {
            return String(s || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        };

        let gateRows = "";
        const gates = gateResult.gates || {};
        Object.keys(CAUSATIVE_GATE_LABELS).forEach(function (key) {
            const active = Boolean(gates[key]);
            gateRows += "<tr>"
                + "<td>" + esc(CAUSATIVE_GATE_LABELS[key]) + "</td>"
                + "<td class='rpt-" + (active ? "yes" : "no") + "'>" + (active ? "SÍ" : "NO") + "</td>"
                + "</tr>";
        });

        let optionRows = "";
        if (options.length === 0) {
            optionRows = "<tr><td colspan='4'><em>Sin opciones generadas</em></td></tr>";
        } else {
            options.forEach(function (opt, i) {
                const stem = opt.stem || (opt.stemSpec ? (opt.stemSpec.output || opt.stemSpec.value || "") : "");
                const type = opt.type === "type-two" ? "Tipo 2" : "Tipo 1";
                const typeClass = opt.type === "type-two" ? "rpt-type2" : "rpt-type1";
                const rule = describeCausativeRule(opt.rule);
                const pref = opt.preferred ? "★" : "";
                const blocked = (opt.type === "type-two" && !gateResult.allowTypeTwo) ? " rpt-blocked" : "";
                optionRows += "<tr class='" + typeClass + blocked + "'>"
                    + "<td>" + (i + 1) + "</td>"
                    + "<td>" + esc(stem) + "</td>"
                    + "<td>" + esc(type) + pref + "</td>"
                    + "<td>" + esc(rule) + "</td>"
                    + "</tr>";
            });
        }

        const now = new Date();
        const dateStr = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");

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
        let html;
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
        const verbMeta = typeof targetObject.getVerbInputMeta === "function" ? targetObject.getVerbInputMeta() : {};
        const verb = (verbMeta.analysisVerb || verbMeta.displayVerb || "causativo").replace(/[^a-z0-9]/gi, "_");
        const blob = new targetObject.Blob([html], { type: "text/html;charset=utf-8" });
        const url = targetObject.URL.createObjectURL(blob);
        const link = targetObject.document.createElement("a");
        link.href = url;
        link.download = "causativo-" + verb + ".html";
        targetObject.document.body.appendChild(link);
        link.click();
        link.remove();
        targetObject.window.setTimeout(function () { targetObject.URL.revokeObjectURL(url); }, 0);
    }

    function initCausativeReport() {
        const button = targetObject.document?.getElementById("causative-report-download");
        if (!button) {
            return;
        }
        button.addEventListener("click", function () {
            downloadCausativeDerivationReport();
        });
    }

    function initViewExport() {
        const button = targetObject.document?.getElementById("view-export-csv");
        if (!button) {
            return;
        }
        button.addEventListener("click", () => {
            downloadViewExportCSV();
        });
    }

    return {
        escapeCSVValue,
        normalizeUnifiedVerbOutputObjectSlotCount,
        normalizeUnifiedVerbOutputEntry,
        buildUnifiedVerbOutputBaseKey,
        buildUnifiedVerbOutputSourceKey,
        setUnifiedVerbOutputDatasetRows,
        collectStructuredUnifiedVerbOutputRows,
        collectVisibleConjugationRowsFromDom,
        collectVisibleConjugationRows,
        getViewExportSourceModeLabel,
        getViewExportObjectHeaders,
        buildViewExportCSV,
        downloadViewExportCSV,
        describeCausativeRule,
        buildCausativeDerivationReportHTML,
        downloadCausativeDerivationReport,
        initCausativeReport,
        initViewExport,
    };
}

export function installUiExportGlobals(targetObject = globalThis) {
    const api = createUiExportApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
