// core/clause/clause.js
// Nuclear-clause shell metadata. This layer records Andrews-style slot
// architecture, but it does not generate Nawat/Pipil surfaces.

"use strict";

const NUCLEAR_CLAUSE_SHELL_VERSION = 1;

const NUCLEAR_CLAUSE_KIND = Object.freeze({
    verbal: "verbal-nuclear-clause",
    nominal: "nominal-nuclear-clause",
    unknown: "unknown-nuclear-clause",
});

const NUCLEAR_CLAUSE_FORMULA_TYPE = Object.freeze({
    vnc: "VNC",
    nnc: "NNC",
    unknown: "unknown",
});

const NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze([
    "nuclear clause shell is not generation",
    "VNC/NNC word output is not a complete sentence model",
    "tense position belongs to VNC, not ordinary NNC",
    "topic and supplementation are clause-level relations, not noun classes",
    "Andrews slot order is architecture, not Nawat/Pipil surface evidence",
]);

function attachNuclearClauseGrammarContract(record = null, options = {}) {
    if (typeof attachGrammarMetadataContract !== "function") {
        return record;
    }
    return attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "nuclear-clause-shell",
        routeFamily: "nuclear-clause-shell",
        structuralSource: "Andrews Lesson 4",
        andrewsRefs: ["Andrews Lesson 4"],
        ...options,
    });
}

function normalizeNuclearClauseKind(value = "") {
    const normalized = String(value || "").trim().toLowerCase();
    if (["vnc", "verbal", "verb", "verbo", NUCLEAR_CLAUSE_KIND.verbal].includes(normalized)) {
        return NUCLEAR_CLAUSE_KIND.verbal;
    }
    if (["nnc", "nominal", "noun", "sustantivo", "adjetivo", NUCLEAR_CLAUSE_KIND.nominal].includes(normalized)) {
        return NUCLEAR_CLAUSE_KIND.nominal;
    }
    return NUCLEAR_CLAUSE_KIND.unknown;
}

function getNuclearClauseFormulaType(clauseKind = "") {
    const normalizedKind = normalizeNuclearClauseKind(clauseKind);
    if (normalizedKind === NUCLEAR_CLAUSE_KIND.verbal) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.vnc;
    }
    if (normalizedKind === NUCLEAR_CLAUSE_KIND.nominal) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.nnc;
    }
    return NUCLEAR_CLAUSE_FORMULA_TYPE.unknown;
}

function buildClauseParticipantSlot({
    slot = "",
    prefix = "",
    suffix = "",
    role = "",
    label = "",
} = {}) {
    return {
        slot: String(slot || ""),
        role: String(role || slot || ""),
        prefix: String(prefix || ""),
        suffix: String(suffix || ""),
        displayPrefix: String(prefix || "") || "Ø",
        displaySuffix: String(suffix || "") || "Ø",
        label: String(label || ""),
    };
}

function getNuclearClauseShellResultFrame(input = null) {
    if (!input || typeof input !== "object") {
        return null;
    }
    const grammarFrame = input.grammarFrame && typeof input.grammarFrame === "object"
        ? input.grammarFrame
        : (input.frames && typeof input.frames === "object" ? input.frames : null);
    return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object"
        ? grammarFrame.resultFrame
        : null;
}

function normalizeNuclearClauseShellSurface(value = "") {
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitNuclearClauseShellSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeNuclearClauseShellSurface(entry))
        .filter(Boolean);
}

function getNuclearClauseShellFramedSurface(input = null) {
    const resultFrame = getNuclearClauseShellResultFrame(input);
    if (!resultFrame) {
        return null;
    }
    const forms = [];
    if (Array.isArray(resultFrame.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame.surface) {
        forms.push(resultFrame.surface);
    }
    return forms.flatMap((entry) => splitNuclearClauseShellSurfaceText(entry))[0] || "";
}

function resolveNuclearClauseShellText(input = null, fields = [], fallback = "") {
    const framedSurface = getNuclearClauseShellFramedSurface(input);
    if (framedSurface !== null) {
        return framedSurface;
    }
    const source = input && typeof input === "object" ? input : {};
    for (const field of fields) {
        const value = normalizeNuclearClauseShellSurface(source[field]);
        if (value) {
            return value;
        }
    }
    return normalizeNuclearClauseShellSurface(fallback);
}

function buildVerbalNuclearClauseFormulaEchoFromSlots(formulaSlots = null) {
    if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
    }
    const subject = formulaSlots.subjectPerson || formulaSlots.subject || {};
    const object = formulaSlots.objectPerson || formulaSlots.object || {};
    const predicate = formulaSlots.predicate || {};
    const tense = formulaSlots.tense || {};
    const subjectDisplay = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
    const objectDisplay = String(object.displayPrefix || object.prefix || "Ø") || "Ø";
    const rawPredicateDisplay = String(predicate.displayStem || predicate.stem || "∅") || "∅";
    const predicateDisplay = rawPredicateDisplay.startsWith("(") && rawPredicateDisplay.endsWith(")")
        ? rawPredicateDisplay.slice(1, -1)
        : rawPredicateDisplay;
    const tenseDisplay = String(tense.label || tense.tenseValue || "Ø") || "Ø";
    return `#${subjectDisplay}-${objectDisplay}(${predicateDisplay})-${tenseDisplay}#`;
}

function buildVerbalNuclearClauseShell({
    subject = null,
    object = null,
    predicate = null,
    tenseValue = "",
    tenseLabel = "",
} = {}) {
    const subjectSlot = buildClauseParticipantSlot({
        slot: "subject",
        role: "subject",
        prefix: subject?.prefix ?? subject?.subjectPrefix ?? "",
        suffix: subject?.suffix ?? subject?.subjectSuffix ?? "",
        label: subject?.label || "",
    });
    const objectPrefix = object?.prefix ?? object?.objectPrefix ?? "";
    const objectSlot = {
        slot: "object",
        role: "object",
        prefix: String(objectPrefix || ""),
        displayPrefix: String(objectPrefix || "") || "Ø",
        isPresent: Boolean(objectPrefix),
        label: object?.label || "",
    };
    const predicateStem = predicate?.stem ?? predicate?.verb ?? "";
    const predicateSlot = {
        slot: "predicate",
        role: "verbal-predicate",
        stem: String(predicateStem || ""),
        displayStem: String(predicateStem || "") || "∅",
        valency: predicate?.valency || "",
    };
    const tenseSlot = {
        slot: "tense",
        role: "tense",
        tenseValue: String(tenseValue || ""),
        label: String(tenseLabel || tenseValue || ""),
        isPresent: Boolean(tenseValue || tenseLabel),
        notAvailableInOrdinaryNnc: true,
    };
    const formulaSlots = {
        subjectPerson: {
            ...subjectSlot,
            slot: "subject",
        },
        objectPerson: {
            ...objectSlot,
            slot: "object",
        },
        predicate: {
            ...predicateSlot,
            slot: "PREDICATE",
        },
        tense: tenseSlot,
    };
    return {
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.vnc,
        formula: "#subject-object(PREDICATE)-tense#",
        formulaSlots,
        formulaEcho: buildVerbalNuclearClauseFormulaEchoFromSlots(formulaSlots),
        hasTensePosition: true,
        slots: {
            subject: subjectSlot,
            object: objectSlot,
            predicate: predicateSlot,
            tense: tenseSlot,
        },
    };
}

function buildNominalNuclearClauseShell({
    subject = null,
    predicate = null,
    formulaSlots = null,
    formulaEcho = "",
    predicateState = "",
} = {}) {
    const subjectSource = formulaSlots?.subjectPerson || subject || {};
    const predicateSource = formulaSlots?.predicate || predicate || {};
    const connectorSource = formulaSlots?.subjectNumberConnector || {};
    const subjectSlot = buildClauseParticipantSlot({
        slot: subjectSource.slot || "pers1-pers2",
        role: "subject",
        prefix: subjectSource.prefix || subjectSource.subjectPrefix || "",
        suffix: subjectSource.suffix || subjectSource.subjectSuffix || "",
        label: subjectSource.label || "",
    });
    const predicateStem = resolveNuclearClauseShellText(
        predicateSource,
        ["stem", "surface"],
        predicate?.stem || ""
    );
    const predicateSlot = {
        slot: predicateSource.slot || "STEM",
        role: "nominal-predicate",
        stem: String(predicateStem || ""),
        displayStem: String(predicateStem || "") || "∅",
        state: predicateSource.state || predicateState || "unknown",
        stateSlot: predicateSource.stateSlot || null,
    };
    const connectorSlot = {
        slot: connectorSource.slot || "num1-num2",
        role: "subject-number-connector",
        connector: resolveNuclearClauseShellText(connectorSource, ["connector", "surface"], ""),
        displayConnector: resolveNuclearClauseShellText(
            connectorSource,
            ["displayConnector", "displaySurface", "connector"],
            "Ø"
        ) || "Ø",
        nounClass: connectorSource.nounClass || "",
        notLexicalSuffix: true,
        notTense: true,
    };
    const echo = formulaEcho || `#${subjectSlot.displayPrefix}...${subjectSlot.displaySuffix}(${predicateSlot.displayStem})${connectorSlot.displayConnector}#`;
    return {
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.nnc,
        formula: "#pers1-pers2(STEM)num1-num2#",
        formulaEcho: echo,
        hasTensePosition: false,
        slots: {
            subject: subjectSlot,
            predicate: predicateSlot,
            subjectNumberConnector: connectorSlot,
        },
    };
}

function buildNuclearClauseShellMetadata(options = {}) {
    const clauseKind = normalizeNuclearClauseKind(options.clauseKind || options.kind || options.tenseMode || "");
    const formulaType = getNuclearClauseFormulaType(clauseKind);
    const payload = clauseKind === NUCLEAR_CLAUSE_KIND.verbal
        ? buildVerbalNuclearClauseShell(options)
        : (clauseKind === NUCLEAR_CLAUSE_KIND.nominal
            ? buildNominalNuclearClauseShell(options)
            : {
                formulaType,
                formula: "",
                formulaEcho: "",
                hasTensePosition: null,
                slots: {},
            });
    const shell = {
        kind: "nuclear-clause-shell",
        version: NUCLEAR_CLAUSE_SHELL_VERSION,
        source: "Andrews Lesson 4 structural analogy",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        clauseKind,
        displayLabel: formulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.unknown
            ? "Clausula nuclear"
            : `Clausula ${formulaType}`,
        generationAllowed: false,
        ...payload,
        antiConflationRules: Array.from(NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES),
    };
    return attachNuclearClauseGrammarContract(shell, {
        metadataKind: "nuclear-clause-shell",
        routeStage: "classify-shell",
        sourceInput: shell.formulaEcho || shell.formula || shell.clauseKind,
        supported: formulaType !== NUCLEAR_CLAUSE_FORMULA_TYPE.unknown,
        nuclearClauseFrame: {
            clauseKind,
            formulaType,
            formula: shell.formula,
            formulaEcho: shell.formulaEcho,
            hasTensePosition: shell.hasTensePosition,
            slots: shell.slots,
        },
        participantFrame: {
            subject: shell.slots?.subject || null,
            object: shell.slots?.object || null,
        },
        inflectionFrame: {
            tense: shell.slots?.tense || null,
            hasTensePosition: shell.hasTensePosition,
        },
        targetContract: {
            metadataKind: "nuclear-clause-shell",
            generationAllowed: false,
            formulaType,
            clauseKind,
        },
    });
}
