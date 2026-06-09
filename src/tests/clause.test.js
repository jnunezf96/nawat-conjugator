"use strict";

/**
 * Tests for src/core/clause/clause.js
 */

const { createSuite } = require("./runner");

function compactShell(shell) {
    return shell && {
        kind: shell.kind,
        version: shell.version,
        clauseKind: shell.clauseKind,
        displayLabel: shell.displayLabel,
        formulaType: shell.formulaType,
        formula: shell.formula,
        formulaSlots: shell.formulaSlots,
        formulaEcho: shell.formulaEcho,
        hasTensePosition: shell.hasTensePosition,
        generationAllowed: shell.generationAllowed,
        slots: shell.slots,
    };
}

function run(ctx) {
    const s = createSuite("clause");

    s.eq(
        "nuclear clause shell API is exported",
        [
            typeof ctx.buildNuclearClauseShellMetadata,
            typeof ctx.normalizeNuclearClauseKind,
            typeof ctx.getNuclearClauseFormulaType,
            typeof ctx.buildVerbalNuclearClauseFormulaEchoFromSlots,
        ],
        ["function", "function", "function", "function"]
    );

    s.eq(
        "VNC shell exposes subject predicate object and tense slots without generation",
        compactShell(ctx.buildNuclearClauseShellMetadata({
            clauseKind: "vnc",
            subject: { prefix: "ni", suffix: "" },
            object: { prefix: "ki" },
            predicate: { stem: "nemi", valency: "intransitivo" },
            tenseValue: "presente",
            tenseLabel: "presente",
        })),
        {
            kind: "nuclear-clause-shell",
            version: 1,
            clauseKind: "verbal-nuclear-clause",
            displayLabel: "Clausula VNC",
            formulaType: "VNC",
            formula: "#subject-object(PREDICATE)-tense#",
            formulaSlots: {
                subjectPerson: {
                    slot: "subject",
                    role: "subject",
                    prefix: "ni",
                    suffix: "",
                    displayPrefix: "ni",
                    displaySuffix: "Ø",
                    label: "",
                },
                objectPerson: {
                    slot: "object",
                    role: "object",
                    prefix: "ki",
                    displayPrefix: "ki",
                    isPresent: true,
                    label: "",
                },
                predicate: {
                    slot: "PREDICATE",
                    role: "verbal-predicate",
                    stem: "nemi",
                    displayStem: "nemi",
                    valency: "intransitivo",
                },
                tense: {
                    slot: "tense",
                    role: "tense",
                    tenseValue: "presente",
                    label: "presente",
                    isPresent: true,
                    notAvailableInOrdinaryNnc: true,
                },
            },
            formulaEcho: "#ni-ki(nemi)-presente#",
            hasTensePosition: true,
            generationAllowed: false,
            slots: {
                subject: {
                    slot: "subject",
                    role: "subject",
                    prefix: "ni",
                    suffix: "",
                    displayPrefix: "ni",
                    displaySuffix: "Ø",
                    label: "",
                },
                object: {
                    slot: "object",
                    role: "object",
                    prefix: "ki",
                    displayPrefix: "ki",
                    isPresent: true,
                    label: "",
                },
                predicate: {
                    slot: "predicate",
                    role: "verbal-predicate",
                    stem: "nemi",
                    displayStem: "nemi",
                    valency: "intransitivo",
                },
                tense: {
                    slot: "tense",
                    role: "tense",
                    tenseValue: "presente",
                    label: "presente",
                    isPresent: true,
                    notAvailableInOrdinaryNnc: true,
                },
            },
        }
    );

    s.eq(
        "NNC shell keeps tense absent and connector outside predicate",
        compactShell(ctx.buildNuclearClauseShellMetadata({
            clauseKind: "nnc",
            formulaSlots: {
                subjectPerson: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
                predicate: { slot: "STEM", stem: "shuchi", state: "absolutive" },
                subjectNumberConnector: { slot: "num1-num2", connector: "t", nounClass: "t" },
            },
        })),
        {
            kind: "nuclear-clause-shell",
            version: 1,
            clauseKind: "nominal-nuclear-clause",
            displayLabel: "Clausula NNC",
            formulaType: "NNC",
            formula: "#pers1-pers2(STEM)num1-num2#",
            formulaSlots: undefined,
            formulaEcho: "#Ø...Ø(shuchi)t#",
            hasTensePosition: false,
            generationAllowed: false,
            slots: {
                subject: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "",
                    suffix: "",
                    displayPrefix: "Ø",
                    displaySuffix: "Ø",
                    label: "3sg",
                },
                predicate: {
                    slot: "STEM",
                    role: "nominal-predicate",
                    stem: "shuchi",
                    displayStem: "shuchi",
                    state: "absolutive",
                    stateSlot: null,
                },
                subjectNumberConnector: {
                    slot: "num1-num2",
                    role: "subject-number-connector",
                    connector: "t",
                    displayConnector: "t",
                    nounClass: "t",
                    notLexicalSuffix: true,
                    notTense: true,
                },
            },
        }
    );

    s.eq(
        "VNC formula echo derives from formulaSlots",
        ctx.buildVerbalNuclearClauseFormulaEchoFromSlots({
            subjectPerson: { prefix: "ti", displayPrefix: "ti" },
            objectPerson: { prefix: "", displayPrefix: "Ø" },
            predicate: { stem: "kisa", displayStem: "kisa" },
            tense: { tenseValue: "preterito", label: "preterito" },
        }),
        "#ti-Ø(kisa)-preterito#"
    );

    s.eq(
        "nuclear clause shell carries anti-conflation boundary",
        ctx.buildNuclearClauseShellMetadata({ clauseKind: "vnc" }).antiConflationRules,
        [
            "nuclear clause shell is not generation",
            "VNC/NNC word output is not a complete sentence model",
            "tense position belongs to VNC, not ordinary NNC",
            "topic and supplementation are clause-level relations, not noun classes",
            "Andrews slot order is architecture, not Nawat/Pipil surface evidence",
        ]
    );
    const shell = ctx.buildNuclearClauseShellMetadata({
        clauseKind: "nnc",
        formulaSlots: {
            subjectPerson: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
            predicate: { slot: "STEM", stem: "shuchi", state: "absolutive" },
            subjectNumberConnector: { slot: "num1-num2", connector: "t", nounClass: "t" },
        },
    });
    const shellFrame = shell.grammarFrame;
    s.eq(
        "nuclear clause shell exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(shellFrame),
            routeFamily: shellFrame?.routeContract?.routeFamily || "",
            routeStage: shellFrame?.routeContract?.routeStage || "",
            generationAllowed: shellFrame?.routeContract?.generationAllowed,
            formulaType: shellFrame?.nuclearClauseFrame?.formulaType || "",
            hasTensePosition: shellFrame?.inflectionFrame?.hasTensePosition,
            andrewsRef: shellFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(shell, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "nuclear-clause-shell",
            routeStage: "classify-shell",
            generationAllowed: false,
            formulaType: "NNC",
            hasTensePosition: false,
            andrewsRef: "Andrews Lesson 4",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
