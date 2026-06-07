"use strict";

/**
 * Tests for src/core/nnc/adjectival/adjectival.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_adjectival");

    s.eq(
        "Lessons 40-41 adjectival NNC function boundary API is exported",
        [
            typeof ctx.buildAdjectivalNncFunctionBoundaryMetadata,
            typeof ctx.classifyAdjectivalNncFunctionCandidate,
            typeof ctx.classifyAdjectivalNncFalsePositive,
            typeof ctx.getAdjectivalNncAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdjectivalNncFunctionBoundaryMetadata();
    s.eq(
        "adjectival NNC function boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "adjectival-nnc-function-boundary",
            lessons: [40, 41],
            status: "partial",
            generationAllowed: "opt-in",
            confirmedExamples: [],
            boundaries: {
                hasAdjectiveModeOutputs: true,
                hasNominalizationProfileAdjectivalFunction: true,
                hasAdjectivalNncGeneration: true,
                hasOptInAdjectivalNncGeneration: true,
                hasModificationAst: false,
                hasConfirmedModifierHeadExamples: false,
                changesAdjectiveGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsAdjetivoOutputAsFullLessonEvidence: false,
            },
            questionFields: [
                "functionKind",
                "sourceCategory",
                "predicateSurface",
                "adjectivalRole",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "adjetivo route output remains unconfirmed full adjectival NNC evidence",
        ctx.classifyAdjectivalNncFunctionCandidate({
            candidate: "chipaktik",
            functionKind: "adjectival-surface",
            sourceCategory: "adjetivo-route",
            predicateSurface: "chipaktik",
            adjectivalRole: "predicate-surface",
            hasNominalizationProfile: true,
            falsePositiveSource: "adjetivo-route",
        }),
        {
            kind: "adjectival-nnc-function-candidate-classification",
            version: 1,
            candidate: "chipaktik",
            functionKind: "adjectival-surface",
            sourceCategory: "adjetivo-route",
            predicateSurface: "chipaktik",
            adjectivalRole: "predicate-surface",
            evidenceSource: "",
            falsePositiveSource: "adjetivo-route",
            hasNominalizationProfile: true,
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adjectival-nnc-needs-nawat-evidence",
                "adjectival-nnc-function-recognized",
                "nominalization-profile-adjectival-function-is-metadata",
                "adjectival-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "nominalization profile remains explanatory metadata only",
        ctx.classifyAdjectivalNncFalsePositive("nominalization-profile"),
        {
            kind: "adjectival-nnc-false-positive",
            version: 1,
            source: "nominalization-profile",
            isAdjectivalNncEvidence: false,
            isAdjectivalFunctionEvidence: false,
            isModifierHeadEvidence: false,
            isAdjectivalParadigmEvidence: false,
            isModificationEvidence: false,
            isSupplementationEvidence: false,
            isTopicEvidence: false,
            generationAllowed: false,
            diagnostics: ["adjectival-nnc-false-positive-source"],
            antiConflationRules: ctx.getAdjectivalNncAntiConflationRules(),
        }
    );

    s.ok(
        "adjectival NNC rules separate function generation from modification AST",
        ctx.getAdjectivalNncAntiConflationRules()
            .some((rule) => rule.includes("separate from Lessons 42-43 modification AST"))
    );
    s.eq(
        "Andrews 40.1 adjectival NNC function generates through an absolutive ordinary NNC source",
        (() => {
            const direct = ctx.generateAdjectivalNncFunctionOutput({
                stem: "shuchi",
                nounClass: "t",
            });
            const generated = ctx.executeGenerateWordRequest({
                prefixInputs: {
                    verb: "shuchi",
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    possessivePrefix: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tense: "adjectival-nnc",
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            nounClass: "t",
                        },
                    },
                },
            });
            return {
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    outputKind: direct.outputKind,
                    generationRoute: direct.generationRoute,
                    frame: direct.adjectivalNncFunctionFrame,
                    sourceFormula: direct.sourceNnc?.nncBasic?.formulaEcho,
                },
                generated: {
                    result: generated.result,
                    surfaceForms: generated.surfaceForms,
                    generationRoute: generated.generationRoute,
                    frame: generated.adjectivalNncFunctionFrame,
                },
            };
        })(),
        {
            direct: {
                supported: true,
                result: "shuchit",
                outputKind: "adjectival-nnc-function",
                generationRoute: "adjectival-nnc",
                frame: {
                    version: 1,
                    outputKind: "adjectival-nnc-function",
                    lessonRef: "Andrews 40.1",
                    nncKind: "adjectival",
                    functionKind: "modifier-candidate",
                    role: "modifier-candidate",
                    rule: "adjectival NNC is an NNC in adjectival function and normally absolutive-state",
                    requiredPredicateState: "absolutive",
                    requestedPredicateState: "absolutive",
                    actualPredicateState: "absolutive",
                    sourceClauseKind: "nominal-nuclear-clause",
                    sourceFormulaSlots: directFormulaSlots("shuchi", "t"),
                    sourceFormulaEcho: "#Ø...Ø(shuchi)t#",
                    hasModificationAst: false,
                    spellingAuthority: "Nawat/Pipil orthography",
                    grammarAuthority: "Andrews PDF",
                },
                sourceFormula: "#Ø...Ø(shuchi)t#",
            },
            generated: {
                result: "shuchit",
                surfaceForms: ["shuchit"],
                generationRoute: "adjectival-nnc",
                frame: {
                    version: 1,
                    outputKind: "adjectival-nnc-function",
                    lessonRef: "Andrews 40.1",
                    nncKind: "adjectival",
                    functionKind: "modifier-candidate",
                    role: "modifier-candidate",
                    rule: "adjectival NNC is an NNC in adjectival function and normally absolutive-state",
                    requiredPredicateState: "absolutive",
                    requestedPredicateState: "absolutive",
                    actualPredicateState: "absolutive",
                    sourceClauseKind: "nominal-nuclear-clause",
                    sourceFormulaSlots: directFormulaSlots("shuchi", "t"),
                    sourceFormulaEcho: "#Ø...Ø(shuchi)t#",
                    hasModificationAst: false,
                    spellingAuthority: "Nawat/Pipil orthography",
                    grammarAuthority: "Andrews PDF",
                },
            },
        }
    );
    s.eq(
        "Andrews 40.1 adjectival NNC function rejects possessive-state generation",
        ctx.generateAdjectivalNncFunctionOutput({
            stem: "kal",
            state: "possessive",
            nounClass: "zero",
        }).diagnostics.map((diagnostic) => diagnostic.id),
        ["adjectival-nnc-requires-absolutive-state"]
    );
    s.eq(
        "Andrews 40.9 root-plus-ya adjectival NNC generates obsolete-preterit surface, not a label",
        (() => {
            const direct = ctx.generateRootPlusYaAdjectivalNncOutput({
                stem: "(istaya)",
            });
            const generated = ctx.executeGenerateWordRequest({
                prefixInputs: {
                    verb: "(istaya)",
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    possessivePrefix: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tense: "adjectival-nnc",
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "root-plus-ya-obsolete-preterit",
                        },
                    },
                },
            });
            return {
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    surfaceForms: direct.surfaceForms,
                    formulaEcho: direct.formulaEcho,
                    outputKind: direct.outputKind,
                    formation: direct.rootPlusYaAdjectivalNncFrame?.formation,
                    sourceRootPlusYaBase: direct.rootPlusYaAdjectivalNncFrame?.sourceRootPlusYaBase,
                    connector: direct.formulaSlots?.subjectNumberConnector?.connector,
                    connectorSlot: direct.formulaSlots?.subjectNumberConnector?.slot,
                },
                generated: {
                    result: generated.result,
                    surfaceForms: generated.surfaceForms,
                    generationRoute: generated.generationRoute,
                    outputKind: generated.outputKind,
                    formulaEcho: generated.formulaEcho,
                },
            };
        })(),
        {
            direct: {
                supported: true,
                result: "istak",
                surfaceForms: ["istak"],
                formulaEcho: "#Ø...Ø(ista)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
                formation: "root-plus-ya-obsolete-preterit",
                sourceRootPlusYaBase: "ista",
                connector: "k",
                connectorSlot: "num1-num2",
            },
            generated: {
                result: "istak",
                surfaceForms: ["istak"],
                generationRoute: "adjectival-nnc",
                outputKind: "adjectival-nnc-root-plus-ya",
                formulaEcho: "#Ø...Ø(ista)k#",
            },
        }
    );
    s.eq(
        "Andrews 40.9 root-plus-ya adjectival NNC keeps weya on its suppletive/pronoun-like path",
        ctx.generateRootPlusYaAdjectivalNncOutput({
            stem: "(weya)",
        }).diagnostics.map((diagnostic) => diagnostic.id),
        ["adjectival-nnc-root-plus-ya-exception"]
    );
    s.eq(
        "Adjetivo preterito uses Andrews 40.9 root-plus-ya NNC surface directly",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                prefixInputs: {
                    verb: "(istaya)",
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    possessivePrefix: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tense: "adjetivo-preterito",
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                result: generated.result,
                surfaceForms: generated.surfaceForms,
                outputKind: generated.outputKind,
                formulaEcho: generated.formulaEcho,
                generationRoute: generated.generationRoute,
                diagnostics: generated.diagnostics,
            };
        })(),
        {
            result: "istak",
            surfaceForms: ["istak"],
            outputKind: "adjectival-nnc-root-plus-ya",
            formulaEcho: "#Ø...Ø(ista)k#",
            generationRoute: "adjectival-nnc",
            diagnostics: [],
        }
    );
    s.eq(
        "Andrews 40.9 route uses repo-backed Nawat root-plus-ya obsolete-preterit surfaces",
        ["kukuya", "seseya", "kwaistaya"].map((stem) => {
            const generated = ctx.executeGenerateWordRequest({
                prefixInputs: {
                    verb: `(${stem})`,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    possessivePrefix: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tense: "adjetivo-preterito",
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                stem,
                result: generated.result,
                formulaEcho: generated.formulaEcho,
                outputKind: generated.outputKind,
            };
        }),
        [
            {
                stem: "kukuya",
                result: "kukuk",
                formulaEcho: "#Ø...Ø(kuku)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
            },
            {
                stem: "seseya",
                result: "sesek",
                formulaEcho: "#Ø...Ø(sese)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
            },
            {
                stem: "kwaistaya",
                result: "kwaistak",
                formulaEcho: "#Ø...Ø(kwaista)k#",
                outputKind: "adjectival-nnc-root-plus-ya",
            },
        ]
    );
    s.eq(
        "Andrews 40.9 denominal tiya sources route through the adjectival NNC surface",
        [
            {
                stem: "itztiya",
                result: "itztik",
                base: "itzti",
                subtype: "denominal-tiya",
            },
            {
                stem: "yektiya",
                result: "yektik",
                base: "yekti",
                subtype: "denominal-tiya",
            },
            {
                stem: "chichiktiya",
                result: "chichiktik",
                base: "chichikti",
                subtype: "denominal-tiya",
            },
            {
                stem: "(e/tiya)",
                result: "etik",
                base: "eti",
                subtype: "segmented-denominal-tiya",
            },
            {
                stem: "(te/tiya)",
                result: "tetik",
                base: "teti",
                subtype: "segmented-denominal-tiya",
            },
            {
                stem: "(kwal/tiya)",
                result: "kwaltik",
                base: "kwalti",
                subtype: "segmented-denominal-tiya",
            },
        ].map(({ stem, result, base, subtype }) => {
            const direct = ctx.generateRootPlusYaAdjectivalNncOutput({ stem });
            const generated = (() => {
                const generated = ctx.executeGenerateWordRequest({
                    prefixInputs: {
                        verb: stem.startsWith("(") ? stem : `(${stem})`,
                        subjectPrefix: "",
                        subjectSuffix: "",
                        objectPrefix: "",
                        possessivePrefix: "",
                    },
                    options: {
                        silent: true,
                        skipValidation: true,
                        override: {
                            tense: "adjetivo-preterito",
                            tenseMode: ctx.TENSE_MODE.adjetivo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                        },
                    },
                });
                return {
                    result: generated.result,
                    surfaceForms: generated.surfaceForms,
                    outputKind: generated.outputKind,
                    formulaEcho: generated.formulaEcho,
                };
            })();
            return {
                stem,
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    surfaceForms: direct.surfaceForms,
                    formulaEcho: direct.formulaEcho,
                    sourceRootPlusYaBase: direct.rootPlusYaAdjectivalNncFrame?.sourceRootPlusYaBase,
                    sourceFormationSubtype: direct.rootPlusYaAdjectivalNncFrame?.sourceFormationSubtype,
                    slotSubtype: direct.formulaSlots?.predicate?.sourceFormationSubtype,
                },
                generated,
            };
        }),
        [
            {
                stem: "itztiya",
                direct: {
                    supported: true,
                    result: "itztik",
                    surfaceForms: ["itztik"],
                    formulaEcho: "#Ø...Ø(itzti)k#",
                    sourceRootPlusYaBase: "itzti",
                    sourceFormationSubtype: "denominal-tiya",
                    slotSubtype: "denominal-tiya",
                },
                generated: {
                    result: "itztik",
                    surfaceForms: ["itztik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø...Ø(itzti)k#",
                },
            },
            {
                stem: "yektiya",
                direct: {
                    supported: true,
                    result: "yektik",
                    surfaceForms: ["yektik"],
                    formulaEcho: "#Ø...Ø(yekti)k#",
                    sourceRootPlusYaBase: "yekti",
                    sourceFormationSubtype: "denominal-tiya",
                    slotSubtype: "denominal-tiya",
                },
                generated: {
                    result: "yektik",
                    surfaceForms: ["yektik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø...Ø(yekti)k#",
                },
            },
            {
                stem: "chichiktiya",
                direct: {
                    supported: true,
                    result: "chichiktik",
                    surfaceForms: ["chichiktik"],
                    formulaEcho: "#Ø...Ø(chichikti)k#",
                    sourceRootPlusYaBase: "chichikti",
                    sourceFormationSubtype: "denominal-tiya",
                    slotSubtype: "denominal-tiya",
                },
                generated: {
                    result: "chichiktik",
                    surfaceForms: ["chichiktik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø...Ø(chichikti)k#",
                },
            },
            {
                stem: "(e/tiya)",
                direct: {
                    supported: true,
                    result: "etik",
                    surfaceForms: ["etik"],
                    formulaEcho: "#Ø...Ø(eti)k#",
                    sourceRootPlusYaBase: "eti",
                    sourceFormationSubtype: "segmented-denominal-tiya",
                    slotSubtype: "segmented-denominal-tiya",
                },
                generated: {
                    result: "etik",
                    surfaceForms: ["etik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø...Ø(eti)k#",
                },
            },
            {
                stem: "(te/tiya)",
                direct: {
                    supported: true,
                    result: "tetik",
                    surfaceForms: ["tetik"],
                    formulaEcho: "#Ø...Ø(teti)k#",
                    sourceRootPlusYaBase: "teti",
                    sourceFormationSubtype: "segmented-denominal-tiya",
                    slotSubtype: "segmented-denominal-tiya",
                },
                generated: {
                    result: "tetik",
                    surfaceForms: ["tetik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø...Ø(teti)k#",
                },
            },
            {
                stem: "(kwal/tiya)",
                direct: {
                    supported: true,
                    result: "kwaltik",
                    surfaceForms: ["kwaltik"],
                    formulaEcho: "#Ø...Ø(kwalti)k#",
                    sourceRootPlusYaBase: "kwalti",
                    sourceFormationSubtype: "segmented-denominal-tiya",
                    slotSubtype: "segmented-denominal-tiya",
                },
                generated: {
                    result: "kwaltik",
                    surfaceForms: ["kwaltik"],
                    outputKind: "adjectival-nnc-root-plus-ya",
                    formulaEcho: "#Ø...Ø(kwalti)k#",
                },
            },
        ]
    );

    return s;
}

function directFormulaSlots(stem, nounClass) {
    return {
        subjectPerson: {
            role: "subject-person",
            slot: "pers1-pers2",
            prefix: "",
            suffix: "",
            displayPrefix: "Ø",
            displaySuffix: "Ø",
            label: "3sg",
        },
        predicate: {
            role: "predicate",
            slot: "STEM",
            stem,
            state: "absolutive",
        },
        subjectNumberConnector: {
            role: "subject-number-connector",
            slot: "num1-num2",
            nounClass,
            connector: nounClass === "zero" ? "Ø" : nounClass,
            surface: nounClass === "zero" ? "" : nounClass,
            label: "subject number connector",
            belongsTo: "subject",
            referenceNumber: "singular",
            pluralType: "",
        },
    };
}

module.exports = { run };
