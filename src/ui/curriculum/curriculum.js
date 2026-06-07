// src/ui/curriculum/curriculum.js
// Compact missing-elements map over the Andrews lesson sequence.

"use strict";

const CURRICULUM_BOOK_GROUPS = Object.freeze([
    {
        id: "foundations",
        range: [1, 4],
        label: "1-4",
        title: "Fundamentos",
        focus: "terminologia, sonido, particulas y clausula nuclear",
        structures: ["conceptos", "ortografia", "particulas", "clausula"],
        next: ["glosario visible", "normalizador ortografico", "inventario de particulas", "esqueleto de clausula"],
        missing: [
            { lessons: "1", label: "glosario de notacion y jerarquia", category: "conceptos", target: "core/concepts + ui/glossary", state: "partial" },
            { lessons: "2", label: "fonologia y ortografia clasica", category: "sonido/grafia", target: "core/orthography + core/phonology", state: "partial" },
            { lessons: "3", label: "particulas y colocaciones", category: "particulas", target: "core/particles + data/static_particles", state: "partial" },
            { lessons: "4", label: "formulas VNC/NNC por capas", category: "clausula", target: "core/clause + data/static_formulae", state: "partial" },
        ],
    },
    {
        id: "verbal-core",
        range: [5, 11],
        label: "5-11",
        title: "VNC basico",
        focus: "sujeto, objeto, tiempo, clase de tronco e irregulares",
        structures: ["acuerdo", "VNC", "preterito", "irregulares"],
        next: ["capa de oracion", "matriz de modos", "catalogo irregular"],
        missing: [
            { lessons: "5-6", label: "explicador de sujeto, objeto y valencia", category: "acuerdo/valencia", target: "ui/paradigms + core/agreement", state: "partial" },
            { lessons: "7", label: "diagnostico de clase de tronco", category: "tronco verbal", target: "data/static_verbstem_classes", state: "partial" },
            { lessons: "8", label: "oracion: negacion, pregunta y enfasis", category: "oracion", target: "core/sentence + core/clause", state: "partial" },
            { lessons: "9-10", label: "optativo/admonitivo como oracion", category: "modo/oracion", target: "core/clause/mood + data/static_modes", state: "partial" },
            { lessons: "11", label: "taxonomia irregular y excepciones", category: "irregulares", target: "core/irregulars + data/static_irregular_vnc", state: "partial" },
            { lessons: "A,C", label: "paradigmas explicados por formula", category: "paradigmas", target: "ui/paradigms", state: "partial" },
        ],
    },
    {
        id: "nominal-core",
        range: [12, 19],
        label: "12-19",
        title: "NNC basico",
        focus: "absolutivo, posesivo, clases nominales y suplementacion",
        structures: ["NNC", "posesion", "pronombres", "suplementos"],
        next: ["lexico nominal", "generador NNC", "grafo de suplementos"],
        missing: [
            { lessons: "12-15", label: "generador NNC data-completo: posesivo y ti/in", category: "NNC", target: "core/nnc/paradigm + data/static_nnc", state: "partial" },
            { lessons: "15", label: "posesion natural y casos de estado", category: "posesion", target: "core/nnc/possession", state: "missing" },
            { lessons: "16", label: "inventario NNC pronominal", category: "pronominal", target: "data/static_nnc_pronominals", state: "missing" },
            { lessons: "17-19", label: "suplementacion y topico", category: "suplemento/topico", target: "core/syntax/supplementation", state: "missing" },
        ],
    },
    {
        id: "derived-verbs",
        range: [20, 27],
        label: "20-27",
        title: "Troncos derivados",
        focus: "20-26 ya tienen motores; el frecuentativo queda pendiente",
        structures: ["derivacion", "valencia", "voz"],
        next: ["frecuentativo"],
        missing: [
            { lessons: "27", label: "frecuentativo y reduplicacion", category: "frecuentativo", target: "core/derivation/frequentative", state: "partial" },
        ],
    },
    {
        id: "compound-stems",
        range: [28, 34],
        label: "28-34",
        title: "Compuestos",
        focus: "incorporacion verbal, nominal, afectiva, honorifica y numeral",
        structures: ["parser", "compuestos", "NNC/VNC"],
        next: ["purposivo", "NNC compuesto", "numeral y honorifico"],
        missing: [
            { lessons: "28,30", label: "constructor compuesto general", category: "compuesto", target: "core/parsing + core/compound", state: "partial" },
            { lessons: "29", label: "VNC purposivo direccional", category: "purposivo", target: "core/vnc/purposive", state: "partial" },
            { lessons: "31-32", label: "NNC compuesto y afectivo", category: "compuesto/afectivo", target: "core/nnc/compound + data/static_affective_nnc", state: "partial" },
            { lessons: "33", label: "honorifico/peyorativo", category: "honorifico", target: "core/vnc/honorific_pejorative", state: "partial" },
            { lessons: "34,D", label: "numerales vigesimales y NNC", category: "numeral", target: "core/nnc/numerals + data/static_numbers", state: "partial" },
        ],
    },
    {
        id: "nominal-formation",
        range: [35, 43],
        label: "35-43",
        title: "Formacion nominal",
        focus: "nominalizacion, deverbal, adjetival y modificacion",
        structures: ["nominalizacion", "adjetivos", "modificacion"],
        next: ["registro por fuente", "funcion adjetival", "AST de modificacion"],
        missing: [
            { lessons: "35", label: "nominalizacion VNC y ownerhood", category: "nominalizacion", target: "core/nnc/nominalization", state: "partial" },
            { lessons: "36", label: "agentivo, patientivo, accion e instrumento", category: "rol nominal", target: "data/static_nominalized_vnc_rules", state: "partial" },
            { lessons: "37", label: "deverbales z/liz y acciones", category: "deverbal", target: "core/nnc/nominalization + evidence", state: "partial" },
            { lessons: "38-39", label: "familias patientivas", category: "patientivo", target: "core/nnc/nominalization + patientiveFamilyProfile", state: "partial" },
            { lessons: "40-41", label: "funcion adjetival NNC/VNC", category: "funcion adjetival", target: "core/nnc/adjectival + ui/adjective", state: "partial" },
            { lessons: "42-43", label: "AST de modificacion adjetival", category: "modificacion", target: "core/clause/modification", state: "partial" },
        ],
    },
    {
        id: "relations-adverbs",
        range: [44, 50],
        label: "44-50",
        title: "Relaciones",
        focus: "adverbiales, relacionales, nombres de lugar y gentilicios",
        structures: ["relacional", "adverbio", "lugar"],
        next: ["registro relacional", "lugar y gentilicio", "adjuncion adverbial"],
        missing: [
            { lessons: "44", label: "clausulas adverbiales nucleares", category: "adverbial", target: "core/clause + data/static_adverbials", state: "partial" },
            { lessons: "45-47", label: "registro de nounstems relacionales", category: "relacional", target: "data/static_relational_nnc", state: "missing" },
            { lessons: "45-47", label: "opciones relacionales 1-4", category: "relacional", target: "core/nnc/relational", state: "partial" },
            { lessons: "48", label: "lugares y gentilicios", category: "lugar/gentilicio", target: "data/static_places + data/static_gentilics", state: "missing" },
            { lessons: "48", label: "limite lugar/gentilicio", category: "lugar/gentilicio", target: "core/nnc/place_gentilic", state: "partial" },
            { lessons: "49-50", label: "adjuncion adverbial recursiva", category: "adjuncion", target: "data/static_adverbial_adjunction + clause-adjunction AST", state: "missing" },
            { lessons: "49-50", label: "limite adjuncion adverbial", category: "adjuncion", target: "core/clause/adjunction", state: "partial" },
            { lessons: "E", label: "datos de calendario y ciclos", category: "calendario", target: "data/static_calendar", state: "missing" },
            { lessons: "E", label: "limite calendario", category: "calendario", target: "core/calendar", state: "partial" },
        ],
    },
    {
        id: "clause-names",
        range: [51, 58],
        label: "51-58",
        title: "Clausula y nombres",
        focus: "complementacion, conjuncion, comparacion, denominales, nombres y miscelanea",
        structures: ["sintaxis", "denominal", "nombres"],
        next: ["AST de clausulas", "comparacion", "nombres y diagnosticos"],
        missing: [
            { lessons: "51", label: "datos/AST de complementacion", category: "complemento", target: "data/static_complements + complement AST", state: "missing" },
            { lessons: "51", label: "limite complementacion", category: "complemento", target: "core/clause/complement", state: "partial" },
            { lessons: "52", label: "datos/AST de conjuncion", category: "conjuncion", target: "data/static_conjunctions + conjunction AST", state: "missing" },
            { lessons: "52", label: "limite conjuncion", category: "conjuncion", target: "core/clause/conjunction", state: "partial" },
            { lessons: "53", label: "datos/AST de comparacion", category: "comparacion", target: "data/static_comparisons + comparison AST", state: "missing" },
            { lessons: "53", label: "limite comparacion", category: "comparacion", target: "core/comparison", state: "partial" },
            { lessons: "54-55", label: "denominal pleno y familias de sufijos", category: "denominal", target: "core/derivation/denominal", state: "partial" },
            { lessons: "56,E", label: "datos de nombres personales", category: "nombres", target: "data/static_names + data/static_calendar", state: "missing" },
            { lessons: "56,E", label: "limite nombres personales", category: "nombres", target: "core/nnc/names", state: "partial" },
            { lessons: "57-58", label: "datos/AST de diagnostico textual", category: "diagnostico", target: "data/static_analysis + analysis AST", state: "missing" },
            { lessons: "57-58", label: "limite diagnostico textual", category: "diagnostico", target: "core/analysis", state: "partial" },
            { lessons: "F", label: "puente de grafia antigua", category: "sonido/grafia", target: "core/orthography + data/static_old_spellings", state: "partial" },
        ],
    },
]);

const CURRICULUM_MISSING_STATE_META = Object.freeze({
    missing: {
        label: "sin mapa",
        shortLabel: "F",
        pillClass: "book-map__pill--missing",
    },
    partial: {
        label: "parcial",
        shortLabel: "P",
        pillClass: "book-map__pill--partially-implemented",
    },
    audit: {
        label: "por auditar",
        shortLabel: "A",
        pillClass: "book-map__pill--audit",
    },
});

const CURRICULUM_ARCHITECTURE_NOTE = "Indice curricular: no es un motor por leccion. Las filas apuntan a categorias, metadatos, diagnosticos o controles compartidos.";

function getCurriculumLessons() {
    if (typeof LESSON_REGISTRY === "undefined" || !Array.isArray(LESSON_REGISTRY)) {
        return [];
    }
    return LESSON_REGISTRY;
}

function getCurriculumAppendices() {
    if (typeof APPENDIX_REGISTRY === "undefined" || !Array.isArray(APPENDIX_REGISTRY)) {
        return [];
    }
    return APPENDIX_REGISTRY;
}

function getCurriculumStatusCounts(items) {
    return items.reduce((counts, item) => {
        const status = item.status || "not-mapped";
        counts[status] = (counts[status] || 0) + 1;
        return counts;
    }, {});
}

function getCurriculumMissingElements() {
    return CURRICULUM_BOOK_GROUPS.flatMap((group) => Array.isArray(group.missing) ? group.missing : []);
}

function getCurriculumMissingStateCounts(items) {
    return items.reduce((counts, item) => {
        const state = item.state || "missing";
        counts[state] = (counts[state] || 0) + 1;
        return counts;
    }, {});
}

function getCurriculumPrimaryMissingState(items) {
    if (!items.length) {
        return "partial";
    }
    if (items.some((item) => (item.state || "missing") === "missing")) {
        return "missing";
    }
    if (items.some((item) => item.state === "partial")) {
        return "partial";
    }
    return "audit";
}

function createCurriculumElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    if (text !== undefined && text !== null) {
        element.textContent = text;
    }
    return element;
}

function createCurriculumPill(text, className = "") {
    const pill = createCurriculumElement("span", `book-map__pill${className ? ` ${className}` : ""}`, text);
    return pill;
}

function createCurriculumMissingStatePill(state, text) {
    const meta = CURRICULUM_MISSING_STATE_META[state] || CURRICULUM_MISSING_STATE_META.missing;
    return createCurriculumPill(text || meta.label, meta.pillClass);
}

function getCurriculumMissingCategory(item = {}) {
    if (item.category) {
        return item.category;
    }
    const target = String(item.target || "");
    if (/concept|glossary/.test(target)) {
        return "conceptos";
    }
    if (/orthography|phonology|old_spellings/.test(target)) {
        return "sonido/grafia";
    }
    if (/particles/.test(target)) {
        return "particulas";
    }
    if (/clause|sentence|syntax/.test(target)) {
        return "clausula";
    }
    if (/comparison/.test(target)) {
        return "comparacion";
    }
    if (/calendar/.test(target)) {
        return "calendario";
    }
    if (/analysis/.test(target)) {
        return "diagnostico";
    }
    if (/places|gentilics/.test(target)) {
        return "lugar/gentilicio";
    }
    if (/relational/.test(target)) {
        return "relacional";
    }
    if (/nnc/i.test(target)) {
        return "NNC";
    }
    if (/vnc/i.test(target)) {
        return "VNC";
    }
    if (/derivation|derivational/.test(target)) {
        return "derivacion";
    }
    if (/agreement|valency/.test(target)) {
        return "acuerdo/valencia";
    }
    if (/irregular/.test(target)) {
        return "irregulares";
    }
    if (/paradigms/.test(target)) {
        return "explicacion";
    }
    return "categoria";
}

function renderCurriculumTotals(totalsEl, appendices) {
    if (!totalsEl) {
        return;
    }
    totalsEl.textContent = "";
    const appendicesMapped = getCurriculumStatusCounts(appendices);
    const missingItems = getCurriculumMissingElements();
    const missingCounts = getCurriculumMissingStateCounts(missingItems);
    const fragment = document.createDocumentFragment();
    fragment.append(
        createCurriculumPill(`${missingItems.length} pendientes`, "book-map__pill--strong"),
        createCurriculumMissingStatePill("missing", `${missingCounts.missing || 0} sin mapa`),
        createCurriculumMissingStatePill("partial", `${missingCounts.partial || 0} parciales`),
        createCurriculumMissingStatePill("audit", `${missingCounts.audit || 0} por auditar`),
        createCurriculumPill(`${appendicesMapped.implemented || 0}/${appendices.length} apendices`)
    );
    totalsEl.appendChild(fragment);
}

function renderCurriculumGroups(groupsEl, detailEl) {
    if (!groupsEl || !detailEl) {
        return;
    }
    groupsEl.textContent = "";
    const fragment = document.createDocumentFragment();
    let firstButton = null;
    const maxMissing = Math.max(...CURRICULUM_BOOK_GROUPS.map((group) => (group.missing || []).length), 1);
    CURRICULUM_BOOK_GROUPS.forEach((group, index) => {
        const missingItems = group.missing || [];
        const status = getCurriculumPrimaryMissingState(missingItems);
        const missingPercent = Math.round((missingItems.length / maxMissing) * 100);
        const button = createCurriculumElement("button", "book-map__group", "");
        button.type = "button";
        button.dataset.curriculumGroup = group.id;
        button.dataset.status = status;
        button.setAttribute("role", "listitem");
        button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
        if (index === 0) {
            button.classList.add("is-active");
            firstButton = button;
        }

        const top = createCurriculumElement("span", "book-map__group-top", "");
        top.append(
            createCurriculumElement("span", "book-map__group-range", group.label),
            createCurriculumElement("span", "book-map__group-status", CURRICULUM_MISSING_STATE_META[status]?.label || status)
        );
        const title = createCurriculumElement("span", "book-map__group-title", group.title);
        const missing = createCurriculumElement("span", "book-map__group-missing", `${missingItems.length} pendientes`);
        const meter = createCurriculumElement("span", "book-map__meter", "");
        const meterFill = createCurriculumElement("span", "book-map__meter-fill", "");
        meterFill.style.width = `${Math.max(0, Math.min(100, missingPercent))}%`;
        meter.appendChild(meterFill);
        button.append(top, title, missing, meter);
        button.addEventListener("click", () => {
            groupsEl.querySelectorAll(".book-map__group").forEach((entry) => {
                const isActive = entry === button;
                entry.classList.toggle("is-active", isActive);
                entry.setAttribute("aria-pressed", isActive ? "true" : "false");
            });
            renderCurriculumDetail(detailEl, group);
        });
        fragment.appendChild(button);
    });
    groupsEl.appendChild(fragment);
    if (firstButton) {
        const firstGroup = CURRICULUM_BOOK_GROUPS[0];
        renderCurriculumDetail(detailEl, firstGroup);
    }
}

function renderCurriculumDetail(detailEl, group) {
    if (!detailEl) {
        return;
    }
    detailEl.textContent = "";
    const missingItems = group.missing || [];
    const status = getCurriculumPrimaryMissingState(missingItems);
    const header = createCurriculumElement("div", "book-map__detail-header", "");
    const titleBlock = createCurriculumElement("div", "book-map__detail-title-block", "");
    titleBlock.append(
        createCurriculumElement("span", "book-map__detail-range", group.label),
        createCurriculumElement("h3", "book-map__detail-title", group.title)
    );
    const statusPill = createCurriculumMissingStatePill(status);
    header.append(titleBlock, statusPill);

    const focus = createCurriculumElement("p", "book-map__focus", group.focus);
    const structureRow = createCurriculumElement("div", "book-map__structure-row", "");
    group.structures.forEach((structure) => {
        structureRow.appendChild(createCurriculumPill(structure));
    });

    const architectureNote = createCurriculumElement("p", "book-map__architecture-note", CURRICULUM_ARCHITECTURE_NOTE);

    const nextList = createCurriculumElement("div", "book-map__next", "");
    nextList.appendChild(createCurriculumElement("span", "book-map__next-label", "Categorias"));
    group.next.forEach((item) => {
        nextList.appendChild(createCurriculumPill(item));
    });

    const summary = createCurriculumElement("div", "book-map__summary", "");
    const missingCounts = getCurriculumMissingStateCounts(missingItems);
    summary.append(
        createCurriculumPill(`${missingItems.length} pendientes`, "book-map__pill--strong"),
        createCurriculumMissingStatePill("missing", `${missingCounts.missing || 0} sin mapa`),
        createCurriculumMissingStatePill("partial", `${missingCounts.partial || 0} parciales`),
        createCurriculumMissingStatePill("audit", `${missingCounts.audit || 0} por auditar`)
    );

    const missingList = createCurriculumMissingList(missingItems);

    detailEl.append(header, focus, architectureNote, structureRow, nextList, summary, missingList);
}

function createCurriculumMissingList(items) {
    const section = createCurriculumElement("div", "book-map__missing", "");
    const header = createCurriculumElement("div", "book-map__missing-header", "");
    header.append(
        createCurriculumElement("span", "book-map__missing-title", "Pendientes"),
        createCurriculumElement("span", "book-map__missing-count", `${items.length} pistas`)
    );
    const list = createCurriculumElement("div", "book-map__missing-list", "");
    items.forEach((item) => {
        list.appendChild(createCurriculumMissingRow(item));
    });
    section.append(header, list);
    return section;
}

function createCurriculumMissingRow(item) {
    const state = item.state || "missing";
    const meta = CURRICULUM_MISSING_STATE_META[state] || CURRICULUM_MISSING_STATE_META.missing;
    const target = String(item.target || "");
    const categoryLabel = getCurriculumMissingCategory(item);
    const row = createCurriculumElement("div", "book-map__missing-row", "");
    row.dataset.state = state;
    row.dataset.category = categoryLabel;
    row.dataset.target = target;
    const category = createCurriculumElement("span", "book-map__missing-category", categoryLabel);
    category.setAttribute("aria-label", `Categoria compartida: ${categoryLabel}`);
    row.append(
        createCurriculumElement("span", "book-map__missing-lessons", item.lessons || ""),
        createCurriculumElement("span", "book-map__missing-label", item.label || ""),
        category,
        createCurriculumElement("span", "book-map__missing-state", meta.shortLabel)
    );
    row.querySelector(".book-map__missing-state").title = meta.label;
    row.querySelector(".book-map__missing-category").title = target
        ? `Categoria/metadata; destino tecnico: ${target}`
        : "Categoria/metadata target, not one engine per lesson";
    return row;
}

function initCurriculumMap() {
    const root = document.getElementById("book-map");
    if (!root || root.dataset.curriculumBound === "1") {
        return;
    }
    const lessons = getCurriculumLessons();
    if (!lessons.length) {
        root.hidden = true;
        return;
    }
    root.dataset.curriculumBound = "1";
    const totalsEl = document.getElementById("book-map-totals");
    const groupsEl = document.getElementById("book-map-groups");
    const detailEl = document.getElementById("book-map-detail");
    renderCurriculumTotals(totalsEl, getCurriculumAppendices());
    renderCurriculumGroups(groupsEl, detailEl);
}
