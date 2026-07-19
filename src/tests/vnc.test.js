"use strict";

/**
 * Tests for src/core/vnc/vnc.mjs
 * Covers: getPers1Obj1Pers2Key, startsWithAny, getTotalVowelCount,
 *         isWalThirdPersonMarker, splitSearchInput.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("vnc");

    // getPers1Obj1Pers2Key — joins pers1, obj1, pers2 with pipe
    s.eq("pers1/obj1/pers2 key: ni|ki|", ctx.getPers1Obj1Pers2Key("ni", "ki", ""), "ni|ki|");
    s.eq("pers1/obj1/pers2 key: 3sg pers1", ctx.getPers1Obj1Pers2Key("", "ki", ""), "|ki|");
    s.eq("pers1/obj1/pers2 key: ti|ki|t", ctx.getPers1Obj1Pers2Key("ti", "ki", "t"), "ti|ki|t");
    s.eq("pers1/obj1/pers2 key: all empty", ctx.getPers1Obj1Pers2Key("", "", ""), "||");

    // startsWithAny — returns true if value starts with any of the given prefixes
    s.ok("startsWithAny: nemi starts with ne", ctx.startsWithAny("nemi", ["ne", "ki"]));
    s.no("startsWithAny: nemi doesn't start with ki/mu", ctx.startsWithAny("nemi", ["ki", "mu"]));
    s.ok("startsWithAny: single-char prefix", ctx.startsWithAny("nemi", ["n"]));
    s.no("startsWithAny: empty array", ctx.startsWithAny("nemi", []));

    // getTotalVowelCount — counts vowels in a string
    s.eq("vowelCount: nemi = 2", ctx.getTotalVowelCount("nemi"), 2);
    s.eq("vowelCount: chiwa = 2", ctx.getTotalVowelCount("chiwa"), 2);
    s.eq("vowelCount: ki = 1", ctx.getTotalVowelCount("ki"), 1);
    s.eq("vowelCount: consonants only = 0", ctx.getTotalVowelCount("ch"), 0);
    s.eq("vowelCount: empty = 0", ctx.getTotalVowelCount(""), 0);

    s.eq(
        "nuclear clause surface API keeps generateWord as a compatibility alias",
        [
            typeof ctx.generateNuclearClauseSurface,
            typeof ctx.generateWord,
            typeof ctx.executeNuclearClauseSurfaceRequest,
            typeof ctx.executeGenerateWordRequest,
            typeof ctx.getNuclearClauseSurfaceEngineInvariants,
        ],
        ["function", "function", "function", "function", "function"]
    );
    s.eq(
        "compatibility API delegates toward canonical nuclear-clause surface names",
        {
            generateWordCallsCanonical: /\bgenerateNuclearClauseSurface\(/.test(String(ctx.generateWord)),
            executeGenerateWordRequestCallsCanonical: /\bexecuteNuclearClauseSurfaceRequest\(/.test(String(ctx.executeGenerateWordRequest)),
            canonicalSurfaceCallsOldName: /\bgenerateWord\(/.test(String(ctx.generateNuclearClauseSurface)),
            canonicalExecutorCallsOldName: /\bexecuteGenerateWordRequest\(/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
        },
        {
            generateWordCallsCanonical: true,
            executeGenerateWordRequestCallsCanonical: true,
            canonicalSurfaceCallsOldName: false,
            canonicalExecutorCallsOldName: false,
        }
    );
    s.eq(
        "adjectival NNC function override reads structured element contract before DOM dataset strings",
        (() => {
            if (
                typeof ctx.resolveAdjectivalNncFunctionOverrideFromInput !== "function"
                || typeof ctx.buildGrammarFrame !== "function"
                || typeof ctx.buildGrammarResultFrame !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
            ) {
                return { runtime: "vnc-runtime-not-loaded" };
            }
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "adjectival-entry-formula",
                unit: "NNC",
                formula: "#0-0(kal)0-0#",
                formulaSlots: {
                    predicateStem: { slot: "STEM", stem: "kal", surface: "kal" },
                    num1Num2: { slot: "num1-num2", connector: "", nounClass: "zero" },
                },
            });
            const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "adjectival-entry-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "kal", surface: "canonical-entry" },
                ],
                surfaceForms: ["canonical-entry"],
            });
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: {
                    ...ctx.buildGrammarResultFrame({
                        ok: true,
                        formulaRecord,
                        formulaRealizationRecord: realizationRecord,
                    }),
                    surface: "frame-entry-lie",
                    surfaceForms: ["frame-entry-lie / frame-entry-alt-lie"],
                    formulaRecord,
                    formulaRecords: [formulaRecord],
                    formulaRealizationRecord: realizationRecord,
                    formulaRealizationRecords: [realizationRecord],
                },
                routeContract: {
                    routeFamily: "adjectival-nnc",
                    routeStage: "entry-handoff",
                    generationAllowed: true,
                },
                morphBoundaryFrame: {
                    formulaSlots: formulaRecord.formulaSlots,
                    formulaEcho: "#BAD-FORMULA#",
                },
            });
            const structuredControl = {
                value: "input-value-lie",
                dataset: {
                    adjectivalNncFunctionSurface: "dataset-entry-lie",
                    adjectivalNncFormulaEcho: "#BAD-DATASET#",
                    adjectivalNncFormation: "ordinary-absolutive",
                    adjectivalNncFunctionContract: JSON.stringify({
                        surface: "dataset-contract-lie",
                        grammarFrame: {
                            resultFrame: {
                                surface: "dataset-contract-frame-lie",
                                surfaceForms: ["dataset-contract-frame-lie"],
                            },
                        },
                    }),
                },
                __adjectivalNncFunctionEntryContract: {
                    source: "adjectival-nnc-function-entry",
                    surface: "contract-entry-lie",
                    formation: "ordinary-absolutive",
                    requiresCanonicalFormulaRecords: true,
                    grammarFrame,
                    frames: grammarFrame,
                    sourceFormulaSlots: formulaRecord.formulaSlots,
                    formulaEcho: "#BAD-CONTRACT-FORMULA#",
                    sourceFormulaEcho: "#BAD-CONTRACT-SOURCE#",
                    sourceSelectedVariant: {
                        kind: "grammar-formula-realization-selected-variant",
                        variantId: "source-record#variant:1",
                        formulaRealizationRecordId: "source-record",
                        formulaRecordId: "source-formula",
                        surface: "source-canonical-entry",
                    },
                    targetSelectedVariant: {
                        kind: "grammar-formula-realization-selected-variant",
                        variantId: "adjectival-entry-realization#variant:0",
                        formulaRealizationRecordId: "adjectival-entry-realization",
                        formulaRecordId: "adjectival-entry-formula",
                        surface: "selected-variant-surface-lie",
                    },
                    sourceContinuationFrame: {
                        kind: "generated-output-typed-continuation-frame",
                        role: "source",
                        unit: "NNC",
                        formulaRecord,
                        formulaRealizationRecord: realizationRecord,
                    },
                    targetContinuationFrame: {
                        kind: "generated-output-typed-continuation-frame",
                        role: "target",
                        unit: "NNC",
                        formulaRecord,
                        formulaRealizationRecord: realizationRecord,
                    },
                },
            };
            const staleDatasetOnlyControl = {
                value: "dataset-entry-lie",
                dataset: {
                    adjectivalNncFunctionSurface: "dataset-entry-lie",
                    adjectivalNncFormation: "ordinary-absolutive",
                    adjectivalNncFormulaEcho: "#BAD-DATASET#",
                    adjectivalNncFunctionContract: JSON.stringify({
                        surface: "dataset-entry-lie",
                    }),
                },
            };
            const structuredOverride = ctx.resolveAdjectivalNncFunctionOverrideFromInput(structuredControl);
            const staleOverride = ctx.resolveAdjectivalNncFunctionOverrideFromInput(staleDatasetOnlyControl);
            return {
                structuredTronco: structuredOverride?.posicionesFormula?.tronco || "",
                structuredStem: structuredOverride?.adjectivalNnc?.stem || "",
                formulaEcho: structuredOverride?.adjectivalNnc?.formulaEcho || "",
                sourceFormulaEcho: structuredOverride?.adjectivalNnc?.sourceFormulaEcho || "",
                sourceSelectedVariantId: structuredOverride?.adjectivalNnc?.sourceSelectedVariantId || "",
                targetSelectedVariantId: structuredOverride?.adjectivalNnc?.targetSelectedVariantId || "",
                formulaRealizationRecordId: structuredOverride?.adjectivalNnc?.formulaRealizationRecordId || "",
                formulaRecordId: structuredOverride?.adjectivalNnc?.formulaRecordId || "",
                hasEntryContract: structuredOverride?.adjectivalNnc?.entryRouteContract?.source === "adjectival-nnc-function-entry",
                staleDatasetOnlyBlocked: staleOverride === null,
            };
        })(),
        typeof ctx.resolveAdjectivalNncFunctionOverrideFromInput === "function"
            ? {
                structuredTronco: "canonical-entry",
                structuredStem: "",
                formulaEcho: "",
                sourceFormulaEcho: "",
                sourceSelectedVariantId: "source-record#variant:1",
                targetSelectedVariantId: "adjectival-entry-realization#variant:0",
                formulaRealizationRecordId: "adjectival-entry-realization",
                formulaRecordId: "adjectival-entry-formula",
                hasEntryContract: true,
                staleDatasetOnlyBlocked: true,
            }
            : { runtime: "vnc-runtime-not-loaded" }
    );
    s.eq(
        "adjectival ordinary-absolutive override blocks string-only structured route payloads",
        (() => {
            if (typeof ctx.executeGenerateWordRequest !== "function") {
                return { runtime: "generation-runtime-not-loaded" };
            }
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "string-route-lie",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "adjectival-nnc",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "ordinary-absolutive",
                            requiresStructuredContinuation: true,
                            stem: "string-stem-lie",
                            surface: "string-surface-lie",
                            state: "absolutive",
                        },
                    },
                },
            });
            return {
                supported: routed.supported === true,
                result: routed.result || "",
                diagnostics: (routed.diagnostics || []).map((entry) => entry.id || entry).filter(Boolean),
                usedStringLie: [routed.result, routed.stem, ...(routed.surfaceForms || [])]
                    .some((entry) => String(entry || "").includes("lie")),
            };
        })(),
        {
            supported: false,
            result: "",
            diagnostics: ["adjectival-nnc-structured-continuation-source-frame-required"],
            usedStringLie: false,
        }
    );
    s.eq(
        "adjectival ordinary-absolutive structured route runs without stem surface or tronco authority",
        (() => {
            if (
                typeof ctx.executeGenerateWordRequest !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
                || typeof ctx.buildStructuredOrdinaryAdjectivalNncFunctionOutput !== "function"
            ) {
                return { runtime: "generation-runtime-not-loaded" };
            }
            const formulaSlots = {
                pers1Pers2: {
                    role: "subject-person",
                    slot: "pers1-pers2",
                    prefix: "",
                    suffix: "",
                    displayPrefix: "Ø",
                    displaySuffix: "Ø",
                    label: "3sg",
                },
                predicateStem: {
                    role: "predicate",
                    slot: "STEM",
                    stem: "shuchi",
                    surface: "shuchi",
                    state: "absolutive",
                },
                num1Num2: {
                    role: "subject-number-connector",
                    slot: "num1-num2",
                    connector: "t",
                    surface: "t",
                    nounClass: "t",
                    referenceNumber: "singular",
                    pluralType: "auto",
                },
            };
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "structured-ordinary-adjectival-source-formula",
                unit: "NNC",
                formula: "#Ø-Ø(shuchi)t#",
                formulaSlots,
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "structured-ordinary-adjectival-source-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "pers1-pers2", formulaValue: "Ø-Ø", surface: "" },
                    { slot: "STEM", formulaValue: "shuchi", surface: "shuchi" },
                    { slot: "num1-num2", formulaValue: "t", surface: "t" },
                ],
                surfaceForms: ["shuchit"],
            });
            const sourceContinuationFrame = {
                kind: "generated-output-typed-continuation-frame",
                role: "source",
                unit: "NNC",
                formulaRecord,
                formulaRealizationRecord,
                formulaSlots,
            };
            const operationContract = ctx.buildStructuredOrdinaryAdjectivalNncFunctionOutput({
                sourceContinuationFrame,
                sourceFormulaSlots: formulaSlots,
                state: "absolutive",
                role: "modifier-candidate",
            });
            const targetFormulaRecord = operationContract?.grammarFrame?.resultFrame?.formulaRecord || null;
            const targetFormulaRealizationRecord = operationContract?.grammarFrame?.resultFrame?.formulaRealizationRecord || null;
            const targetContinuationFrame = targetFormulaRecord && targetFormulaRealizationRecord ? {
                kind: "generated-output-typed-continuation-frame",
                role: "target",
                unit: "NNC",
                formulaRecord: targetFormulaRecord,
                formulaRealizationRecord: targetFormulaRealizationRecord,
                formulaSlots,
            } : null;
            const originalGenerateOrdinaryNncParadigm = ctx.generateOrdinaryNncParadigm;
            let legacyGeneratorCalled = false;
            if (typeof originalGenerateOrdinaryNncParadigm === "function") {
                ctx.generateOrdinaryNncParadigm = () => {
                    legacyGeneratorCalled = true;
                    throw new Error("legacy ordinary NNC generator poisoned");
                };
            }
            try {
                const routed = ctx.executeGenerateWordRequest({
                    posicionesFormula: {
                        pers1: "",
                        obj1: "",
                        tronco: "tronco-lie",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "adjectival-nnc",
                    },
                    options: {
                        silent: true,
                        skipValidation: true,
                        override: {
                            tenseMode: ctx.TENSE_MODE.adjetivo,
                            derivationMode: ctx.DERIVATION_MODE.active,
                            voiceMode: ctx.VOICE_MODE.active,
                            adjectivalNnc: {
                                enabled: true,
                                formation: "ordinary-absolutive",
                                requiresStructuredContinuation: true,
                                stem: "stem-lie",
                                surface: "surface-lie",
                                sourceFormulaSlots: formulaSlots,
                                sourceContinuationFrame,
                                targetContinuationFrame,
                                state: "absolutive",
                            },
                        },
                    },
                });
                const operationFrame = routed.grammarFrame?.resultFrame?.formulaRecord?.operationFrames?.[0] || null;
                return {
                    supported: routed.supported === true,
                    result: routed.result || "",
                    formula: routed.grammarFrame?.resultFrame?.formulaRecord?.formula || "",
                    operationId: operationFrame?.operationId || "",
                    consumesRenderedInput: operationFrame?.consumesRenderedInput,
                    routeStage: routed.grammarFrame?.routeContract?.routeStage || "",
                    legacyGeneratorCalled,
                    usedStringLie: [routed.result, routed.stem, ...(routed.surfaceForms || [])]
                        .some((entry) => String(entry || "").includes("lie")),
                };
            } finally {
                if (typeof originalGenerateOrdinaryNncParadigm === "function") {
                    ctx.generateOrdinaryNncParadigm = originalGenerateOrdinaryNncParadigm;
                }
            }
        })(),
        {
            supported: true,
            result: "shuchit",
            formula: "#Ø-Ø(shuchi)t#",
            operationId: "andrews-40-ordinary-nnc-adjectival-function",
            consumesRenderedInput: false,
            routeStage: "execute",
            legacyGeneratorCalled: false,
            usedStringLie: false,
        }
    );
    s.eq(
        "adjectival ordinary-absolutive structured route blocks target frame missing operation frame",
        (() => {
            if (
                typeof ctx.executeGenerateWordRequest !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
            ) {
                return { runtime: "generation-runtime-not-loaded" };
            }
            const sourceSlots = {
                predicateStem: { role: "predicate", slot: "STEM", stem: "shuchi", surface: "shuchi" },
                num1Num2: { role: "subject-number-connector", slot: "num1-num2", connector: "t", surface: "t", nounClass: "t" },
            };
            const sourceFormulaRecord = ctx.buildGrammarFormulaRecord({
                id: "structured-ordinary-adjectival-missing-operation-source",
                unit: "NNC",
                formula: "#Ø-Ø(shuchi)t#",
                formulaSlots: sourceSlots,
            });
            const sourceRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "structured-ordinary-adjectival-missing-operation-source-realization",
                formulaRecord: sourceFormulaRecord,
                segmentFrames: [
                    { slot: "STEM", formulaValue: "shuchi", surface: "shuchi" },
                    { slot: "num1-num2", formulaValue: "t", surface: "t" },
                ],
                surfaceForms: ["shuchit"],
            });
            const targetFormulaRecord = ctx.buildGrammarFormulaRecord({
                id: "structured-ordinary-adjectival-missing-operation-target",
                unit: "NNC",
                formula: "#Ø-Ø(shuchi)t#",
                formulaSlots: sourceSlots,
            });
            const targetRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "structured-ordinary-adjectival-missing-operation-target-realization",
                formulaRecord: targetFormulaRecord,
                segmentFrames: [
                    { slot: "STEM", formulaValue: "shuchi", surface: "shuchi" },
                    { slot: "num1-num2", formulaValue: "t", surface: "t" },
                ],
                surfaceForms: ["shuchit"],
            });
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    tronco: "shuchi",
                    tiempo: "adjectival-nnc",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "ordinary-absolutive",
                            requiresStructuredContinuation: true,
                            stem: "shuchi",
                            surface: "shuchit",
                            sourceFormulaSlots: sourceSlots,
                            sourceContinuationFrame: {
                                kind: "generated-output-typed-continuation-frame",
                                formulaRecord: sourceFormulaRecord,
                                formulaRealizationRecord: sourceRealizationRecord,
                                formulaSlots: sourceSlots,
                            },
                            targetContinuationFrame: {
                                kind: "generated-output-typed-continuation-frame",
                                formulaRecord: targetFormulaRecord,
                                formulaRealizationRecord: targetRealizationRecord,
                                formulaSlots: sourceSlots,
                            },
                            state: "absolutive",
                        },
                    },
                },
            });
            return {
                supported: routed.supported === true,
                result: routed.result || "",
                diagnostics: (routed.diagnostics || []).map((entry) => entry.id || entry).filter(Boolean),
                usedSurfaceLie: [routed.result, routed.stem, ...(routed.surfaceForms || [])]
                    .some((entry) => String(entry || "").includes("shuchit")),
            };
        })(),
        {
            supported: false,
            result: "",
            diagnostics: ["adjectival-nnc-structured-operation-frame-required"],
            usedSurfaceLie: false,
        }
    );
    s.eq(
        "adjectival ordinary-absolutive structured route blocks contradictory target frame",
        (() => {
            if (
                typeof ctx.executeGenerateWordRequest !== "function"
                || typeof ctx.buildGrammarFormulaRecord !== "function"
                || typeof ctx.buildGrammarFormulaRealizationRecord !== "function"
            ) {
                return { runtime: "generation-runtime-not-loaded" };
            }
            const sourceSlots = {
                predicateStem: { role: "predicate", slot: "STEM", stem: "shuchi", surface: "shuchi" },
                num1Num2: { role: "subject-number-connector", slot: "num1-num2", connector: "t", surface: "t", nounClass: "t" },
            };
            const sourceFormulaRecord = ctx.buildGrammarFormulaRecord({
                id: "structured-ordinary-adjectival-contradiction-source",
                unit: "NNC",
                formula: "#Ø-Ø(shuchi)t#",
                formulaSlots: sourceSlots,
            });
            const sourceRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "structured-ordinary-adjectival-contradiction-source-realization",
                formulaRecord: sourceFormulaRecord,
                segmentFrames: [
                    { slot: "STEM", formulaValue: "shuchi", surface: "shuchi" },
                    { slot: "num1-num2", formulaValue: "t", surface: "t" },
                ],
                surfaceForms: ["shuchit"],
            });
            const operationFrame = {
                kind: "andrews-typed-operation-frame",
                operationId: "andrews-40-ordinary-nnc-adjectival-function",
                family: "adjectival-nnc",
                routeFamily: "adjectival-nnc",
                routeStage: "execute-typed-operation-frame",
                andrewsSection: "Andrews 40.1",
                sourceFrameKind: "generated-output-typed-continuation-frame",
                sourceFormulaRecordId: "structured-ordinary-adjectival-contradiction-source",
                sourceUnit: "NNC",
                targetUnit: "NNC",
                operationApplied: "use-ordinary-nnc-as-adjectival-function",
                sourceFormulaSlots: sourceSlots,
                requestedPredicateState: "absolutive",
                requiredPredicateState: "absolutive",
                role: "modifier-candidate",
                consumesRenderedInput: false,
                displayStringsAuthorizeGrammar: false,
                outputPolicy: "formula-slots-plus-source-frame-authorize-adjectival-function",
            };
            const targetFormulaRecord = ctx.buildGrammarFormulaRecord({
                id: "structured-ordinary-adjectival-contradiction-target",
                unit: "NNC",
                formula: "#Ø-Ø(kal)t#",
                formulaSlots: sourceSlots,
                operationFrames: [operationFrame],
            });
            const targetRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "structured-ordinary-adjectival-contradiction-target-realization",
                formulaRecord: targetFormulaRecord,
                segmentFrames: [
                    { slot: "STEM", formulaValue: "kal", surface: "kal" },
                    { slot: "num1-num2", formulaValue: "t", surface: "t" },
                ],
                surfaceForms: ["kalt"],
            });
            const routed = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    tronco: "plausible-display-lie",
                    tiempo: "adjectival-nnc",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.adjetivo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        adjectivalNnc: {
                            enabled: true,
                            formation: "ordinary-absolutive",
                            requiresStructuredContinuation: true,
                            stem: "shuchi",
                            surface: "shuchit",
                            sourceFormulaSlots: sourceSlots,
                            sourceContinuationFrame: {
                                kind: "generated-output-typed-continuation-frame",
                                formulaRecord: sourceFormulaRecord,
                                formulaRealizationRecord: sourceRealizationRecord,
                                formulaSlots: sourceSlots,
                            },
                            targetContinuationFrame: {
                                kind: "generated-output-typed-continuation-frame",
                                formulaRecord: targetFormulaRecord,
                                formulaRealizationRecord: targetRealizationRecord,
                                formulaSlots: sourceSlots,
                            },
                            state: "absolutive",
                        },
                    },
                },
            });
            return {
                supported: routed.supported === true,
                result: routed.result || "",
                diagnostics: (routed.diagnostics || []).map((entry) => entry.id || entry).filter(Boolean),
                usedSurfaceLie: [routed.result, routed.stem, ...(routed.surfaceForms || [])]
                    .some((entry) => String(entry || "").includes("shuchit")),
            };
        })(),
        {
            supported: false,
            result: "",
            diagnostics: ["adjectival-nnc-contradictory-target-frame"],
            usedSurfaceLie: false,
        }
    );
    const lesson5Pursuit = ctx.buildVncLesson5PursuitFrame();
    s.eq(
        "Lesson 5 pursuit frame audits all intransitive CNV subsections",
        {
            stepNumber: lesson5Pursuit.stepNumber,
            aimStatus: lesson5Pursuit.aimStatus,
            plannedArrowIds: lesson5Pursuit.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson5Pursuit.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            pdfRefs: lesson5Pursuit.pdfRefs,
            subsectionRefs: lesson5Pursuit.subsectionInventory.map((entry) => entry.pdfRef),
            categories: lesson5Pursuit.subsectionInventory.map((entry) => entry.category),
            closestPass: lesson5Pursuit.closestPass,
            remainingGaps: lesson5Pursuit.remainingGaps,
        },
        {
            stepNumber: 5,
            aimStatus: "closest-pass",
            plannedArrowIds: [
                "lesson-5-intransitive-vnc-audit",
                "lesson-5-optative-formula-authority-audit",
                "lesson-5-tense-morph-formula-authority-audit",
            ],
            firedArrowIds: [
                ["lesson-5-intransitive-vnc-audit", "hit"],
                ["lesson-5-optative-formula-authority-audit", "hit"],
                ["lesson-5-tense-morph-formula-authority-audit", "hit"],
            ],
            pdfRefs: [
                "Andrews Lesson 5.1",
                "Andrews Lesson 5.2",
                "Andrews Lesson 5.3",
                "Andrews Lesson 5.4",
                "Andrews Lesson 5.5",
            ],
            subsectionRefs: [
                "Andrews Lesson 5.1",
                "Andrews Lesson 5.2",
                "Andrews Lesson 5.3",
                "Andrews Lesson 5.4",
                "Andrews Lesson 5.5",
            ],
            categories: [
                "intransitive-vnc-formula",
                "subject-positions",
                "subject-morphic-fillers",
                "subject-pronoun-paradigms",
                "predicate-tense-morphs",
            ],
            closestPass: true,
            remainingGaps: [],
        }
    );
    s.eq(
        "Lesson 5 frame keeps Andrews formula while exposing Spanish/Nawat UI formula",
        {
            pdfFormula: lesson5Pursuit.formulaFrame.pdfFormula,
            visibleFormula: lesson5Pursuit.formulaFrame.visibleFormula,
            valencePosition: lesson5Pursuit.formulaFrame.valencePosition,
            slotOrder: lesson5Pursuit.formulaFrame.slotOrder,
            featureDistribution: lesson5Pursuit.subjectSlotFrame.featureDistribution,
            pluralBridge: lesson5Pursuit.subjectFillerParadigms[0].nawatPluralBridge,
            mainNawatTenses: lesson5Pursuit.subjectFillerParadigms[0].currentNawatTenses,
            tenseInventory: lesson5Pursuit.tenseMorphFrame.currentNawatTenseInventory,
            tenseSlot: lesson5Pursuit.tenseMorphFrame.visibleSlot,
            tenseIsNotTime: lesson5Pursuit.tenseMorphFrame.tenseIsNotTime,
        },
        {
            pdfFormula: "#pers1-pers2(STEM)tns+num1-num2#",
            visibleFormula: "#pers1-pers2(base)tiempo+núm1-núm2#",
            valencePosition: "implicit-vacant-core",
            slotOrder: ["pers1", "pers2", "base", "tiempo", "num1", "num2"],
            featureDistribution: {
                person: ["pers1"],
                case: ["pers2"],
                number: ["num1", "num2"],
                animacyHumanness: "no-separate-subposition",
            },
            pluralBridge: { classicalCarrier: "h", adaptedCarrier: "t" },
            mainNawatTenses: ["presente", "presente-habitual", "imperfecto", "pasado-remoto"],
            tenseInventory: [
                "presente",
                "presente-habitual",
                "presente-desiderativo",
                "imperfecto",
                "futuro",
                "preterito",
                "pasado-remoto",
                "condicional",
                "optativo",
                "perfecto",
                "pluscuamperfecto",
                "condicional-perfecto",
            ],
            tenseSlot: "tiempo",
            tenseIsNotTime: true,
        }
    );
    const lesson5ProbeText = [
        ...lesson5Pursuit.plannedArrows.map((arrow) => arrow.aim),
        ...lesson5Pursuit.firedArrows.map((arrow) => arrow.correction),
    ].join(" ");
    s.ok(
        "Lesson 5 pursuit frame carries correctness-before-existence miss probe",
        /Correcci[oó]n antes de existencia/.test(lesson5ProbeText)
            && /ruta de entrada a salida/.test(lesson5ProbeText)
            && /comportamiento/.test(lesson5ProbeText)
            && /sonda de fallo/.test(lesson5ProbeText)
            && /shi/.test(lesson5ProbeText)
            && /ti\/an|ti o an/.test(lesson5ProbeText)
    );
    const lesson6Pursuit = ctx.buildVncLesson6PursuitFrame();
    s.eq(
        "Lesson 6 pursuit frame audits all transitive CNV subsections",
        {
            stepNumber: lesson6Pursuit.stepNumber,
            aimStatus: lesson6Pursuit.aimStatus,
            plannedArrowIds: lesson6Pursuit.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson6Pursuit.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            pdfRefs: lesson6Pursuit.pdfRefs,
            subsectionRefs: lesson6Pursuit.subsectionInventory.map((entry) => entry.pdfRef),
            shotRefs: lesson6Pursuit.shotReport.map((entry) => entry.andrewsRef),
            shotStatuses: Array.from(new Set(lesson6Pursuit.shotReport.map((entry) => entry.shotStatus))),
            invalidFinalShotStatuses: lesson6Pursuit.shotReport
                .filter((entry) => !["hit-no-edit", "hit-edit"].includes(entry.shotStatus))
                .map((entry) => [entry.andrewsRef, entry.shotStatus]),
            reportCompleteness: lesson6Pursuit.shotReport.every((entry) => (
                entry.requirementEs
                && entry.missProbeEs
                && Array.isArray(entry.changedFiles)
                && Array.isArray(entry.validationRefs)
                && entry.validationRefs.includes("src/tests/vnc.test.js")
            )),
            editedShotRefs: lesson6Pursuit.shotReport
                .filter((entry) => entry.shotStatus === "hit-edit")
                .map((entry) => [entry.andrewsRef, entry.changedFiles.includes("src/core/vnc/vnc.mjs")]),
            categories: lesson6Pursuit.subsectionInventory.map((entry) => entry.category),
            closestPass: lesson6Pursuit.closestPass,
            remainingGaps: lesson6Pursuit.remainingGaps,
        },
        {
            stepNumber: 6,
            aimStatus: "closest-pass",
            plannedArrowIds: [
                "lesson-6-transitive-vnc-audit",
                "lesson-6-valence-formula-authority-audit",
                "lesson-6-shuntline-ne-direct-generation-audit",
            ],
            firedArrowIds: [
                ["lesson-6-transitive-vnc-audit", "hit"],
                ["lesson-6-valence-formula-authority-audit", "hit"],
                ["lesson-6-shuntline-ne-direct-generation-audit", "hit"],
            ],
            pdfRefs: [
                "Andrews Lesson 6.1",
                "Andrews Lesson 6.2",
                "Andrews Lesson 6.3",
                "Andrews Lesson 6.4",
                "Andrews Lesson 6.5",
                "Andrews Lesson 6.6",
                "Andrews Lesson 6.7",
            ],
            subsectionRefs: [
                "Andrews Lesson 6.1",
                "Andrews Lesson 6.2",
                "Andrews Lesson 6.3",
                "Andrews Lesson 6.4",
                "Andrews Lesson 6.5",
                "Andrews Lesson 6.6",
                "Andrews Lesson 6.7",
            ],
            shotRefs: [
                "Andrews Lesson 6.1",
                "Andrews Lesson 6.2",
                "Andrews Lesson 6.2.1",
                "Andrews Lesson 6.2.2a",
                "Andrews Lesson 6.2.2b",
                "Andrews Lesson 6.3",
                "Andrews Lesson 6.4",
                "Andrews Lesson 6.4.1",
                "Andrews Lesson 6.4.1a",
                "Andrews Lesson 6.4.1b",
                "Andrews Lesson 6.4.2",
                "Andrews Lesson 6.4.2a",
                "Andrews Lesson 6.4.2b",
                "Andrews Lesson 6.5",
                "Andrews Lesson 6.6",
                "Andrews Lesson 6.6.1",
                "Andrews Lesson 6.6.2",
                "Andrews Lesson 6.7",
            ],
            shotStatuses: ["hit-no-edit", "hit-edit"],
            invalidFinalShotStatuses: [],
            reportCompleteness: true,
            editedShotRefs: [
                ["Andrews Lesson 6.4.2a", true],
                ["Andrews Lesson 6.5", true],
            ],
            categories: [
                "transitive-vnc-formulas",
                "monadic-valence-position",
                "dyadic-valence-formula",
                "projective-object-distribution",
                "projective-object-paradigm",
                "mainline-reflexive-distribution",
                "mainline-reflexive-paradigm",
            ],
            closestPass: true,
            remainingGaps: [],
        }
    );
    s.eq(
        "Lesson 6 frame separates monadic dyadic and Nawat object realization",
        {
            monadicFormula: lesson6Pursuit.formulaFrame.formulas.monadicValence.visibleFormula,
            dyadicFormula: lesson6Pursuit.formulaFrame.formulas.dyadicValence.visibleFormula,
            objectiveDistinctions: lesson6Pursuit.objectCategoryFrame.additionalObjectiveDistinctions
                || lesson6Pursuit.formulaFrame.additionalObjectiveDistinctions,
            monadicFillers: lesson6Pursuit.monadicValenceFillers.map((entry) => [
                entry.classicalCarrier,
                entry.currentNawatSlotValue,
                entry.currentNawatSlotStatus || "confirmed",
                entry.specificity,
                entry.humanness || entry.trajectory,
            ]),
            projectivePrefixes: lesson6Pursuit.projectiveObjectParadigm.map((entry) => [
                entry.person,
                entry.classicalDyad,
                entry.currentNawatDyad,
                entry.currentNawatPrefix,
            ]),
            dyadicSpecificPrefixes: lesson6Pursuit.dyadicObjectFrame.currentNawatSpecificPrefixes,
            directDyads: lesson6Pursuit.dyadicObjectFrame.directNawatDyadByPrefix,
            reflexiveSlot: lesson6Pursuit.reflexiveObjectFrame.currentNawatReflexiveSlot,
            directReflexive: lesson6Pursuit.reflexiveObjectFrame.directNawatReflexiveParadigm,
            directReflexiveCondition: lesson6Pursuit.reflexiveObjectFrame.directNawatReflexiveCondition,
            reflexiveBehavior: lesson6Pursuit.reflexiveObjectFrame.engineBehavior,
        },
        {
            monadicFormula: "#pers1-pers2+val(base)tiempo+núm1-núm2#",
            dyadicFormula: "#pers1-pers2+val1-val2(base)tiempo+núm1-núm2#",
            objectiveDistinctions: ["trajectory", "specificity", "prominence"],
            monadicFillers: [
                ["ne", "ne", "direct-nawat-generation", "specific", "reflexive-reciprocative"],
                ["te", "te", "confirmed", "nonspecific", "human"],
                ["tla", "ta", "confirmed", "nonspecific", "nonhuman"],
            ],
            projectivePrefixes: [
                ["1sg", "n-ech", "n-ech", "nech"],
                ["1pl", "t-ech", "t-ech", "tech"],
                ["2sg", "m-itz", "m-etz", "metz"],
                ["2pl", "am-ech", "m-etz-in", "metzin"],
                ["3sg", "c-0/qu-0/qui-0", "ki-0/k-0", "ki/k"],
                ["3pl", "qu-im", "k-in", "kin"],
            ],
            dyadicSpecificPrefixes: ["nech", "tech", "metz", "metzin", "ki", "k", "kin"],
            directDyads: {
                nech: "n-ech",
                tech: "t-ech",
                metz: "m-etz",
                metzin: "m-etz-in",
                ki: "ki-0",
                k: "k-0",
                kin: "k-in",
            },
            reflexiveSlot: "mu",
            directReflexive: "m-u/m-0",
            directReflexiveCondition: "m-u cuando la alomorfía conserva mu; m-0 cuando obj1-mu-before-vowel-m reduce mu a m",
            reflexiveBehavior: "same-person specific objects are redirected to dyadic mainline mu by reflexive slot logic",
        }
    );
    s.eq(
        "VNC valence workbench preserves Andrews slots and separates Nawat realization",
        (() => {
            const intransitive = ctx.buildVncValenceFormulaWorkbenchSlice({ inputValue: "nemi" });
            const monadic = ctx.buildVncValenceFormulaWorkbenchSlice({ inputValue: "ta-ijpiya" });
            const monadicTe = ctx.buildVncValenceFormulaWorkbenchSlice({ inputValue: "te-chiwa" });
            const monadicNe = ctx.buildVncValenceFormulaWorkbenchSlice({ inputValue: "ne-chiwa" });
            const dyadic = ctx.buildVncValenceFormulaWorkbenchSlice({ inputValue: "ki-piya" });
            const fusedDyadicForm = ctx.buildVncValenceFormulaWorkbenchSlice({ inputValue: "kipiya" });
            const preteritDyadicForm = ctx.buildVncValenceFormulaWorkbenchSlice({ inputValue: "kipishki" });
            const blocked = ctx.buildVncValenceFormulaWorkbenchSlice({
                inputValue: "chiwa",
                valenceKind: "blocked",
                valence: "nech",
            });
            const ordinary = ctx.buildOrdinaryNncFormulaWorkbenchSlice({ inputValue: "kal" });
            const possessive = ctx.buildPossessiveStateNncFormulaWorkbenchSlice({ inputValue: "kal" });
            const monadicValence = monadic.parsedSlots.find((slot) => slot.key === "valence");
            const monadicTense = monadic.parsedSlots.find((slot) => slot.key === "tensePosition");
            const monadicNumber = monadic.parsedSlots.find((slot) => slot.key === "num1Num2");
            const dyadicValence = dyadic.parsedSlots.find((slot) => slot.key === "valence");
            const examples = Object.fromEntries(monadic.examples.map((example) => [example.id, {
                status: example.status,
                structuralFormulaEcho: example.structuralFormulaEcho,
                nawatFormulaEcho: example.nawatFormulaEcho,
                compactFormulaEcho: example.compactFormulaEcho,
                surface: example.surface,
                valenceKind: example.formulaSlots.valence.valenceKind,
                valenceStructural: example.formulaSlots.valence.structuralDisplay,
                valenceNawat: example.formulaSlots.valence.nawatDisplay,
                tenseOwner: example.formulaSlots.tensePosition.owner,
                numberOwner: example.formulaSlots.num1Num2.owner,
            }]));
            return {
                families: monadic.formulaFamilies.map((family) => [family.id, family.formula]),
                intransitive: {
                    formula: intransitive.formula,
                    structuralFormulaEcho: intransitive.structuralFormulaEcho,
                    nawatFormulaEcho: intransitive.nawatFormulaEcho,
                    compactFormulaEcho: intransitive.compactFormulaEcho,
                    status: intransitive.generation.status,
                    surface: intransitive.generation.surface,
                },
                monadic: {
                    formula: monadic.formula,
                    structuralFormulaEcho: monadic.structuralFormulaEcho,
                    nawatFormulaEcho: monadic.nawatFormulaEcho,
                    compactFormulaEcho: monadic.compactFormulaEcho,
                    status: monadic.generation.status,
                    surface: monadic.generation.surface,
                },
                andrewsLogicMonadic: {
                    teFormula: monadicTe.structuralFormulaEcho,
                    teStatus: monadicTe.generation.status,
                    teSurface: monadicTe.generation.surface,
                    teLogicSurface: monadicTe.generation.andrewsLogicSurface,
                    teGenerationGate: monadicTe.generation.generationGate,
                    neFormula: monadicNe.structuralFormulaEcho,
                    neStatus: monadicNe.generation.status,
                    neSurface: monadicNe.generation.surface,
                    neLogicSurface: monadicNe.generation.andrewsLogicSurface,
                },
                dyadic: {
                    formula: dyadic.formula,
                    structuralFormulaEcho: dyadic.structuralFormulaEcho,
                    nawatFormulaEcho: dyadic.nawatFormulaEcho,
                    compactFormulaEcho: dyadic.compactFormulaEcho,
                    status: dyadic.generation.status,
                    surface: dyadic.generation.surface,
                    fusedFormNawatFormulaEcho: fusedDyadicForm.nawatFormulaEcho,
                    preteritFormStructuralFormulaEcho: preteritDyadicForm.structuralFormulaEcho,
                },
                blocked: {
                    status: blocked.generation.status,
                    allowed: blocked.generation.allowed,
                    structuralFormulaEcho: blocked.structuralFormulaEcho,
                    diagnosticIds: blocked.diagnostics.map((diagnostic) => diagnostic.id),
                },
                monadicValence: {
                    token: monadicValence.token,
                    role: monadicValence.role,
                    owner: monadicValence.owner,
                    path: monadicValence.path,
                    structuralValue: monadicValence.structuralValue,
                    nawatValue: monadicValence.nawatValue,
                    compactValue: monadicValence.compactValue,
                    blocked: monadicValence.blockedInterpretations,
                },
                dyadicValence: {
                    token: dyadicValence.token,
                    role: dyadicValence.role,
                    owner: dyadicValence.owner,
                    structuralValue: dyadicValence.structuralValue,
                    nawatValue: dyadicValence.nawatValue,
                    compactValue: dyadicValence.compactValue,
                },
                tenseSlot: {
                    role: monadicTense.role,
                    owner: monadicTense.owner,
                    path: monadicTense.path,
                    structuralValue: monadicTense.structuralValue,
                    nawatValue: monadicTense.nawatValue,
                    compactValue: monadicTense.compactValue,
                    vncOnly: monadicTense.modelFields.some((field) => field.label === "VNC-only" && field.value === "true"),
                },
                numberSlot: {
                    role: monadicNumber.role,
                    owner: monadicNumber.owner,
                    path: monadicNumber.path,
                    structuralValue: monadicNumber.structuralValue,
                    nawatValue: monadicNumber.nawatValue,
                    compactValue: monadicNumber.compactValue,
                    blocked: monadicNumber.blockedInterpretations,
                },
                nncTenseFree: {
                    ordinaryHasTensePosition: ordinary.hasTensePosition,
                    ordinaryHasTenseSlot: ordinary.parsedSlots.some((slot) => slot.key === "tensePosition"),
                    possessiveHasTensePosition: possessive.hasTensePosition,
                    possessiveHasTenseSlot: possessive.parsedSlots.some((slot) => slot.key === "tensePosition"),
                },
                realizationBoundary: monadic.realizationBoundary,
                examples,
            };
        })(),
        {
            families: [
                ["intransitive-vnc", "#pers1-pers2(STEM)tns+num1-num2#"],
                ["monadic-transitive-vnc", "#pers1-pers2+va(STEM)tns+num1-num2#"],
                ["dyadic-transitive-vnc", "#pers1-pers2+va1-va2(STEM)tns+num1-num2#"],
            ],
            intransitive: {
                formula: "#pers1-pers2(STEM)tns+num1-num2#",
                structuralFormulaEcho: "#Ø-Ø(nemi)0+qui-0#",
                nawatFormulaEcho: "#Ø-Ø(nemi)Ø+ki-0 ~ k-0#",
                compactFormulaEcho: "#Ø-Ø(nemi)Ø+ki/k#",
                status: "generated-scoped",
                surface: "nenki / nemik",
            },
            monadic: {
                formula: "#pers1-pers2+va(STEM)tns+num1-num2#",
                structuralFormulaEcho: "#Ø-Ø+tla(ijpiya)0+qui-0#",
                nawatFormulaEcho: "#Ø-Ø+ta(ijpiya)Ø+ki-0 ~ k-0#",
                compactFormulaEcho: "#Ø-Ø+ta(ijpiya)Ø+ki/k#",
                status: "generated-scoped",
                surface: "taijpishki / taijpiyak / taijpik",
            },
            andrewsLogicMonadic: {
                teFormula: "#Ø-Ø+te(chiwa)0+0-0#",
                teStatus: "andrews-logic-generated",
                teSurface: "techiwa",
                teLogicSurface: "techiwa",
                    teGenerationGate: "andrews-licensed-route-plus-required-source-context",
                neFormula: "#Ø-Ø+ne(chiwa)0+0-0#",
                neStatus: "andrews-logic-generated",
                neSurface: "nechiwa",
                neLogicSurface: "nechiwa",
            },
            dyadic: {
                formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                structuralFormulaEcho: "#Ø-Ø+c-0/qu-0/qui-0(piya)0+qui-0#",
                nawatFormulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0 ~ k-0#",
                compactFormulaEcho: "#Ø-Ø+ki(piya)Ø+ki/k#",
                status: "generated-scoped",
                surface: "kipishki / kipiyak",
                fusedFormNawatFormulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0 ~ k-0#",
                preteritFormStructuralFormulaEcho: "#Ø-Ø+c-0/qu-0/qui-0(piya)0+qui-0#",
            },
            blocked: {
                status: "unsupported",
                allowed: false,
                structuralFormulaEcho: "#Ø-Ø+n-ech(chiwa)0+0-0#",
                diagnosticIds: [
                    "formula-slot-va1-va2-not-stem",
                    "formula-slot-va1-va2-not-tense",
                    "formula-slot-tns-not-subject-number-connector",
                    "formula-slot-num1-num2-not-tense",
                    "formula-slot-st1-st2-not-tense",
                    "vnc-valence-object-combination-blocked",
                    "vnc-valence-classical-spelling-structural-only",
                ],
            },
            monadicValence: {
                token: "va",
                role: "monadic-valence",
                owner: "predicate",
                path: "predicate.valence.va1-va2",
                structuralValue: "tla",
                nawatValue: "ta",
                compactValue: "ta",
                blocked: ["stem", "subject-connector", "subject-number-connector", "tense"],
            },
            dyadicValence: {
                token: "va1-va2",
                role: "dyadic-valence",
                owner: "predicate",
                structuralValue: "c-0/qu-0/qui-0",
                nawatValue: "ki-0",
                compactValue: "ki",
            },
            tenseSlot: {
                role: "tense",
                owner: "predicate",
                path: "predicate.tense",
                structuralValue: "0",
                nawatValue: "Ø",
                compactValue: "Ø",
                vncOnly: true,
            },
            numberSlot: {
                role: "subject-number-connector",
                owner: "subject",
                path: "subject.num1-num2",
                structuralValue: "qui-0",
                nawatValue: "ki-0 ~ k-0",
                compactValue: "ki/k",
                blocked: ["tense", "stem-suffix", "object-valence", "predicate-state"],
            },
            nncTenseFree: {
                ordinaryHasTensePosition: false,
                ordinaryHasTenseSlot: false,
                possessiveHasTensePosition: false,
                possessiveHasTenseSlot: false,
            },
            realizationBoundary: {
                structuralFormulaEcho: "#Ø-Ø+tla(ijpiya)0+qui-0#",
                nawatFormulaEcho: "#Ø-Ø+ta(ijpiya)Ø+ki-0 ~ k-0#",
                compactFormulaEcho: "#Ø-Ø+ta(ijpiya)Ø+ki/k#",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: ["tla", "c-0/qu-0/qui-0", "qu-im"],
                nawatAuthority: "Nawat/Pipil orthography bridge; examples illustrate spelling only and do not gate grammar logic",
                logicAuthority: "Andrews PDF",
                generationGate: "andrews-licensed-route-plus-required-source-context",
            },
            examples: {
                "intransitive-nemi": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "#Ø-Ø(nemi)0+qui-0#",
                    nawatFormulaEcho: "#Ø-Ø(nemi)Ø+ki-0 ~ k-0#",
                    compactFormulaEcho: "#Ø-Ø(nemi)Ø+ki/k#",
                    surface: "nenki / nemik",
                    valenceKind: "intransitive",
                    valenceStructural: "",
                    valenceNawat: "",
                    tenseOwner: "predicate",
                    numberOwner: "subject",
                },
                "monadic-ta-ijpiya": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "#Ø-Ø+tla(ijpiya)0+qui-0#",
                    nawatFormulaEcho: "#Ø-Ø+ta(ijpiya)Ø+ki-0 ~ k-0#",
                    compactFormulaEcho: "#Ø-Ø+ta(ijpiya)Ø+ki/k#",
                    surface: "taijpishki / taijpiyak / taijpik",
                    valenceKind: "monadic",
                    valenceStructural: "tla",
                    valenceNawat: "ta",
                    tenseOwner: "predicate",
                    numberOwner: "subject",
                },
                "dyadic-ki-piya": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "#Ø-Ø+c-0/qu-0/qui-0(piya)0+qui-0#",
                    nawatFormulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0 ~ k-0#",
                    compactFormulaEcho: "#Ø-Ø+ki(piya)Ø+ki/k#",
                    surface: "kipishki / kipiyak",
                    valenceKind: "dyadic",
                    valenceStructural: "c-0/qu-0/qui-0",
                    valenceNawat: "ki-0",
                    tenseOwner: "predicate",
                    numberOwner: "subject",
                },
                "blocked-same-person-nech": {
                    status: "unsupported",
                    structuralFormulaEcho: "#Ø-Ø+n-ech(chiwa)0+qui-0#",
                    nawatFormulaEcho: "#Ø-Ø+n-ech(chiwa)Ø+ki-0 ~ k-0#",
                    compactFormulaEcho: "#Ø-Ø+nech(chiwa)Ø+ki/k#",
                    surface: "",
                    valenceKind: "dyadic",
                    valenceStructural: "n-ech",
                    valenceNawat: "n-ech",
                    tenseOwner: "predicate",
                    numberOwner: "subject",
                },
            },
        }
    );
    s.eq(
        "VNC valence Andrews-logic surface realization requires typed source and operation frames",
        (() => {
            const formulaSlots = ctx.buildVncValenceFormulaSlots({
                stem: "chiwa",
                kind: "monadic",
                valence: "te",
                numberConnector: "zero",
            });
            const sourceFrame = ctx.buildVncValenceAndrewsLogicSurfaceSourceFrame({ formulaSlots });
            const operationFrame = ctx.buildVncValenceAndrewsLogicSurfaceOperationFrame(sourceFrame);
            const changedFormulaSlots = ctx.buildVncValenceFormulaSlots({
                stem: "poison",
                kind: "dyadic",
                valence: "ki",
                numberConnector: "preterit3sg",
            });
            const otherFormulaSlots = ctx.buildVncValenceFormulaSlots({
                stem: "naka",
                kind: "monadic",
                valence: "ta",
                numberConnector: "zero",
            });
            const otherSourceFrame = ctx.buildVncValenceAndrewsLogicSurfaceSourceFrame({
                formulaSlots: otherFormulaSlots,
            });
            const oldNormalizer = ctx.normalizeVncValenceFormulaSurfacePart;
            ctx.normalizeVncValenceFormulaSurfacePart = () => "poison";
            const poisonedNormalizerOutput = ctx.getVncValenceAndrewsLogicSurfaceForSlots(changedFormulaSlots, {
                sourceFrame,
                operationFrame,
            });
            ctx.normalizeVncValenceFormulaSurfacePart = oldNormalizer;
            return {
                helperTypes: [
                    typeof ctx.buildVncValenceAndrewsLogicSurfaceSourceFrame,
                    typeof ctx.buildVncValenceAndrewsLogicSurfaceOperationFrame,
                    typeof ctx.getVncValenceAndrewsLogicSurfaceFrameMismatch,
                ],
                sourceFrameKind: sourceFrame?.kind || "",
                operationId: operationFrame?.operationId || "",
                targetSegmentSurfaces: operationFrame?.targetSegmentFrames.map((frame) => [frame.slot, frame.surface]) || [],
                authorized: ctx.getVncValenceAndrewsLogicSurfaceForSlots(formulaSlots, {
                    sourceFrame,
                    operationFrame,
                }),
                stringOnly: ctx.getVncValenceAndrewsLogicSurfaceForSlots(formulaSlots),
                missingOperation: ctx.getVncValenceAndrewsLogicSurfaceForSlots(formulaSlots, {
                    sourceFrame,
                }),
                contradictorySource: ctx.getVncValenceAndrewsLogicSurfaceForSlots(formulaSlots, {
                    sourceFrame: otherSourceFrame,
                    operationFrame,
                }),
                contradictoryTarget: ctx.getVncValenceAndrewsLogicSurfaceForSlots(formulaSlots, {
                    sourceFrame,
                    operationFrame: {
                        ...operationFrame,
                        targetSurface: "poison",
                    },
                }),
                changedFormulaSlotsOutput: ctx.getVncValenceAndrewsLogicSurfaceForSlots(changedFormulaSlots, {
                    sourceFrame,
                    operationFrame,
                }),
                poisonedNormalizerOutput,
                workbenchOperationId: ctx.buildVncValenceFormulaWorkbenchSlice({
                    inputValue: "te-chiwa",
                }).generation.andrewsLogicSurfaceOperationFrame?.operationId || "",
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            sourceFrameKind: "vnc-valence-andrews-logic-surface-source-frame",
            operationId: "andrews-vnc-valence-slot-surface-realization",
            targetSegmentSurfaces: [
                ["pers1-pers2", ""],
                ["va1-va2", "te"],
                ["STEM", "chiwa"],
                ["tns", ""],
                ["num1-num2", ""],
            ],
            authorized: "techiwa",
            stringOnly: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
            changedFormulaSlotsOutput: "techiwa",
            poisonedNormalizerOutput: "techiwa",
            workbenchOperationId: "andrews-vnc-valence-slot-surface-realization",
        }
    );
    s.eq(
        "VNC valence workbench selection consumes typed source frames instead of direct input strings",
        (() => {
            const sourceFrame = ctx.buildVncValenceWorkbenchSourceFrame({
                inputValue: "ki-piya",
            });
            const oldNormalize = ctx.normalizeVncValenceWorkbenchStem;
            const oldInfer = ctx.inferVncValenceWorkbenchSelection;
            ctx.normalizeVncValenceWorkbenchStem = () => "poison";
            ctx.inferVncValenceWorkbenchSelection = () => ({ kind: "monadic", valence: "te" });
            const poisonedWorkbench = ctx.buildVncValenceFormulaWorkbenchSlice({
                inputValue: "ki-piya",
            });
            ctx.normalizeVncValenceWorkbenchStem = oldNormalize;
            ctx.inferVncValenceWorkbenchSelection = oldInfer;
            return {
                helperTypes: [
                    typeof ctx.buildVncValenceWorkbenchSourceFrame,
                    typeof ctx.isVncValenceWorkbenchSourceFrame,
                ],
                sourceFrame: {
                    kind: sourceFrame.kind,
                    predicateStem: sourceFrame.predicateStem,
                    selectionKind: sourceFrame.selectionKind,
                    valenceKey: sourceFrame.valenceKey,
                    consumesRenderedInput: sourceFrame.consumesRenderedInput,
                    displayStringsAuthorizeGrammar: sourceFrame.displayStringsAuthorizeGrammar,
                },
                directNormalize: ctx.normalizeVncValenceWorkbenchStem("ki-piya"),
                directInfer: ctx.inferVncValenceWorkbenchSelection("ki-piya"),
                framedNormalize: ctx.normalizeVncValenceWorkbenchStem("poison", { sourceFrame }),
                framedInfer: (() => {
                    const selection = ctx.inferVncValenceWorkbenchSelection("poison", {
                        valenceKind: "monadic",
                        valence: "te",
                        sourceFrame,
                    });
                    return {
                        kind: selection.kind,
                        valence: selection.valence,
                        sourceFrameKind: selection.sourceFrame?.kind || "",
                    };
                })(),
                poisonedWorkbench: {
                    stem: poisonedWorkbench.sourceFrame?.predicateStem || "",
                    valenceKind: poisonedWorkbench.sourceFrame?.selectionKind || "",
                    valence: poisonedWorkbench.sourceFrame?.valenceKey || "",
                    formula: poisonedWorkbench.structuralFormulaEcho,
                    surface: poisonedWorkbench.generation.surface,
                },
            };
        })(),
        {
            helperTypes: ["function", "function"],
            sourceFrame: {
                kind: "vnc-valence-workbench-source-frame",
                predicateStem: "piya",
                selectionKind: "dyadic",
                valenceKey: "ki",
                consumesRenderedInput: false,
                displayStringsAuthorizeGrammar: false,
            },
            directNormalize: "",
            directInfer: {
                kind: "blocked",
                valence: "",
                diagnosticId: "vnc-valence-workbench-source-frame-required",
            },
            framedNormalize: "piya",
            framedInfer: {
                kind: "dyadic",
                valence: "ki",
                sourceFrameKind: "vnc-valence-workbench-source-frame",
            },
            poisonedWorkbench: {
                stem: "piya",
                valenceKind: "dyadic",
                valence: "ki",
                formula: "#Ø-Ø+c-0/qu-0/qui-0(piya)0+qui-0#",
                surface: "kipishki / kipiyak",
            },
        }
    );
    s.eq(
        "VNC shell workbench is the default interactive formula slice and keeps tns VNC-only",
        (() => {
            const slice = ctx.buildVncShellFormulaWorkbenchSlice({ inputValue: "" });
            const model = ctx.getAndrewsFormulaWorkbenchModel({ activeId: "vnc-shell", inputValue: "" });
            const tenseSlot = slice.parsedSlots.find((slot) => slot.key === "tensePosition");
            const numberSlot = slice.parsedSlots.find((slot) => slot.key === "num1Num2");
            const valenceSlot = slice.parsedSlots.find((slot) => slot.key === "valence");
            const ordinary = ctx.buildOrdinaryNncFormulaWorkbenchSlice({ inputValue: "kal" });
            const possessive = ctx.buildPossessiveStateNncFormulaWorkbenchSlice({ inputValue: "kal" });
            return {
                modelActiveId: model.activeId,
                modelSliceKind: model.activeSlice?.kind || "",
                kind: slice.kind,
                formula: slice.formula,
                structuralFormulaEcho: slice.structuralFormulaEcho,
                nawatFormulaEcho: slice.nawatFormulaEcho,
                compactFormulaEcho: slice.compactFormulaEcho,
                sourceMaterial: slice.sourceMaterial,
                generation: {
                    status: slice.generation.status,
                    allowed: slice.generation.allowed,
                    surface: slice.generation.surface,
                    routeFamily: slice.generation.routeFamily,
                },
                valenceSlot: {
                    status: valenceSlot.status,
                    structuralValue: valenceSlot.structuralValue,
                },
                tenseSlot: {
                    role: tenseSlot.role,
                    owner: tenseSlot.owner,
                    path: tenseSlot.path,
                    structuralValue: tenseSlot.structuralValue,
                    nawatValue: tenseSlot.nawatValue,
                    compactValue: tenseSlot.compactValue,
                },
                numberSlot: {
                    role: numberSlot.role,
                    owner: numberSlot.owner,
                    path: numberSlot.path,
                    structuralValue: numberSlot.structuralValue,
                    nawatValue: numberSlot.nawatValue,
                    compactValue: numberSlot.compactValue,
                },
                nncTenseFree: {
                    ordinaryHasTensePosition: ordinary.hasTensePosition,
                    ordinaryHasTenseSlot: ordinary.parsedSlots.some((slot) => slot.key === "tensePosition"),
                    possessiveHasTensePosition: possessive.hasTensePosition,
                    possessiveHasTenseSlot: possessive.parsedSlots.some((slot) => slot.key === "tensePosition"),
                },
                realizationBoundary: slice.realizationBoundary,
                diagnosticIds: slice.diagnostics.map((diagnostic) => diagnostic.id),
            };
        })(),
        {
            modelActiveId: "vnc-shell",
            modelSliceKind: "vnc-shell-formula-workbench-slice",
            kind: "vnc-shell-formula-workbench-slice",
            formula: "#pers1-pers2(STEM)tns+num1-num2#",
            structuralFormulaEcho: "#Ø-Ø(nemi)0+qui-0#",
            nawatFormulaEcho: "#Ø-Ø(nemi)Ø+ki-0 ~ k-0#",
            compactFormulaEcho: "#Ø-Ø(nemi)Ø+ki/k#",
            sourceMaterial: {
                rawInput: "",
                stem: "nemi",
                inputKind: "vnc-shell",
                placeholder: "nemi",
                inputLabel: "Predicado verbal CNV",
                sourceKind: "default-intransitive-example",
            },
            generation: {
                status: "generated-scoped",
                allowed: true,
                surface: "nenki / nemik",
                routeFamily: "vnc-shell",
            },
            valenceSlot: {
                status: "omitted",
                structuralValue: "",
            },
            tenseSlot: {
                role: "tense",
                owner: "predicate",
                path: "predicate.tense",
                structuralValue: "0",
                nawatValue: "Ø",
                compactValue: "Ø",
            },
            numberSlot: {
                role: "subject-number-connector",
                owner: "subject",
                path: "subject.num1-num2",
                structuralValue: "qui-0",
                nawatValue: "ki-0 ~ k-0",
                compactValue: "ki/k",
            },
            nncTenseFree: {
                ordinaryHasTensePosition: false,
                ordinaryHasTenseSlot: false,
                possessiveHasTensePosition: false,
                possessiveHasTenseSlot: false,
            },
            realizationBoundary: {
                structuralFormulaEcho: "#Ø-Ø(nemi)0+qui-0#",
                nawatFormulaEcho: "#Ø-Ø(nemi)Ø+ki-0 ~ k-0#",
                compactFormulaEcho: "#Ø-Ø(nemi)Ø+ki/k#",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: ["tns", "qui-0", "Ø-Ø"],
                nawatAuthority: "la ortografia Nawat/Pipil realiza la logica CNV autorizada por Andrews; tns no existe en formulas CNN",
                logicAuthority: "Andrews PDF",
                generationGate: "andrews-licensed-route-plus-required-source-context",
            },
            diagnosticIds: [
                "formula-slot-va1-va2-not-stem",
                "formula-slot-va1-va2-not-tense",
                "formula-slot-tns-not-subject-number-connector",
                "formula-slot-num1-num2-not-tense",
                "formula-slot-st1-st2-not-tense",
                "vnc-valence-classical-spelling-structural-only",
                "vnc-shell-tense-slot-is-vnc-only",
            ],
        }
    );
    s.eq(
        "Subject/number connector workbench preserves dyads across NNC and VNC shells",
        (() => {
            const slice = ctx.buildSubjectNumberConnectorFormulaWorkbenchSlice({ inputValue: "kal" });
            const numberSlot = slice.parsedSlots.find((slot) => slot.key === "num1Num2");
            const subjectSlot = slice.parsedSlots.find((slot) => slot.key === "pers1Pers2");
            const examples = Object.fromEntries(slice.examples.map((example) => [example.id, {
                status: example.status,
                structuralFormulaEcho: example.structuralFormulaEcho,
                nawatFormulaEcho: example.nawatFormulaEcho,
                compactFormulaEcho: example.compactFormulaEcho,
                surface: example.surface,
                connectorStructural: example.connectorStructural,
                connectorNawat: example.connectorNawat,
                connectorCompact: example.connectorCompact,
                numberOwner: example.numberOwner,
                stateOwner: example.stateOwner || "",
                valenceOwner: example.valenceOwner || "",
                valenceNawat: example.valenceNawat || "",
                tenseOwner: example.tenseOwner || "",
                hasTensePosition: example.hasTensePosition,
            }]));
            return {
                kind: slice.kind,
                formulaSchemaId: slice.formulaSchemaId,
                formulaSlotSource: slice.formulaSlotSource,
                formulaFamilies: slice.formulaFamilies.map((family) => [family.id, family.formula]),
                structuralFormulaEcho: slice.structuralFormulaEcho,
                nawatFormulaEcho: slice.nawatFormulaEcho,
                compactFormulaEcho: slice.compactFormulaEcho,
                generation: {
                    status: slice.generation.status,
                    allowed: slice.generation.allowed,
                    surface: slice.generation.surface,
                },
                subjectSlot: {
                    role: subjectSlot.role,
                    owner: subjectSlot.owner,
                    structuralValue: subjectSlot.structuralValue,
                    blocked: subjectSlot.blockedInterpretations,
                },
                numberSlot: {
                    role: numberSlot.role,
                    owner: numberSlot.owner,
                    path: numberSlot.path,
                    structuralValue: numberSlot.structuralValue,
                    nawatValue: numberSlot.nawatValue,
                    compactValue: numberSlot.compactValue,
                    blocked: numberSlot.blockedInterpretations,
                },
                diagnostics: slice.diagnostics.map((diagnostic) => diagnostic.id),
                realizationBoundary: slice.realizationBoundary,
                examples,
            };
        })(),
        {
            kind: "subject-number-connector-formula-workbench-slice",
            formulaSchemaId: "subject-number-connectors",
            formulaSlotSource: "andrews-formula-slot-schema",
            formulaFamilies: [
                ["ordinary-nnc-subject-number", "#pers1-pers2(STEM)num1-num2#"],
                ["possessive-nnc-subject-number", "#pers1-pers2+st1-st2(STEM)num1-num2#"],
                ["vnc-subject-number", "#pers1-pers2+va1-va2(STEM)tns+num1-num2#"],
            ],
            structuralFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
            nawatFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
            compactFormulaEcho: "#Ø-Ø(kal)Ø#",
            generation: {
                status: "generated",
                allowed: true,
                surface: "kal",
            },
            subjectSlot: {
                role: "subject-person",
                owner: "subject",
                structuralValue: "Ø-Ø",
                blocked: ["predicate-state", "tense", "object-valence"],
            },
            numberSlot: {
                role: "subject-number-connector",
                owner: "subject",
                path: "subject.num1-num2",
                structuralValue: "Ø-Ø",
                nawatValue: "Ø-Ø",
                compactValue: "Ø",
                blocked: ["tense", "stem-suffix", "nounstem", "object-valence", "predicate-state"],
            },
            diagnostics: [
                "formula-slot-num1-num2-not-tense",
                "formula-slot-num1-num2-not-stem-suffix",
                "formula-slot-num1-num2-not-object-valence",
                "formula-slot-num1-num2-not-predicate-state",
                "formula-slot-tns-not-subject-number-connector",
                "subject-number-connectors-preserve-dyads",
            ],
            realizationBoundary: {
                structuralFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
                nawatFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
                compactFormulaEcho: "#Ø-Ø(kal)Ø#",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: ["m-eh", "qui-0", "Ø-Ø"],
                nawatAuthority: "Nawat/Pipil connector realization: m-et for animate count plural and ki-0 ~ k-0 for scoped VNC preterit number",
            },
            examples: {
                "ordinary-zero-common": {
                    status: "generated",
                    structuralFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
                    nawatFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
                    compactFormulaEcho: "#Ø-Ø(kal)Ø#",
                    surface: "kal",
                    connectorStructural: "Ø-Ø",
                    connectorNawat: "Ø-Ø",
                    connectorCompact: "Ø",
                    numberOwner: "subject",
                    stateOwner: "",
                    valenceOwner: "",
                    valenceNawat: "",
                    tenseOwner: "",
                    hasTensePosition: false,
                },
                "ordinary-animate-count": {
                    status: "generated",
                    structuralFormulaEcho: "#Ø-Ø(mistun)m-eh#",
                    nawatFormulaEcho: "#Ø-Ø(mistun)m-et#",
                    compactFormulaEcho: "#Ø-Ø(mistun)met#",
                    surface: "mistunmet",
                    connectorStructural: "m-eh",
                    connectorNawat: "m-et",
                    connectorCompact: "met",
                    numberOwner: "subject",
                    stateOwner: "",
                    valenceOwner: "",
                    valenceNawat: "",
                    tenseOwner: "",
                    hasTensePosition: false,
                },
                "possessive-specific-1sg-nu-kal": {
                    status: "generated",
                    structuralFormulaEcho: "#Ø-Ø+n-o(kal)Ø-Ø#",
                    nawatFormulaEcho: "#Ø-Ø+n-u(kal)Ø-Ø#",
                    compactFormulaEcho: "#Ø-Ø+nu(kal)Ø#",
                    surface: "nukal",
                    connectorStructural: "Ø-Ø",
                    connectorNawat: "Ø-Ø",
                    connectorCompact: "Ø",
                    numberOwner: "subject",
                    stateOwner: "predicate",
                    valenceOwner: "",
                    valenceNawat: "",
                    tenseOwner: "",
                    hasTensePosition: false,
                },
                "vnc-preterit-ki-piya": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "#Ø-Ø+c-0/qu-0/qui-0(piya)0+qui-0#",
                    nawatFormulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0 ~ k-0#",
                    compactFormulaEcho: "#Ø-Ø+ki(piya)Ø+ki/k#",
                    surface: "kipishki / kipiyak",
                    connectorStructural: "qui-0",
                    connectorNawat: "ki-0 ~ k-0",
                    connectorCompact: "ki/k",
                    numberOwner: "subject",
                    stateOwner: "",
                    valenceOwner: "predicate",
                    valenceNawat: "ki-0",
                    tenseOwner: "predicate",
                    hasTensePosition: true,
                },
                "blocked-num1-num2-as-tense": {
                    status: "unsupported",
                    structuralFormulaEcho: "#pers1-pers2(STEM)num1-num2#",
                    nawatFormulaEcho: "",
                    compactFormulaEcho: "num1-num2 != tns",
                    surface: "",
                    connectorStructural: "num1-num2",
                    connectorNawat: "",
                    connectorCompact: "",
                    numberOwner: "subject",
                    stateOwner: "",
                    valenceOwner: "",
                    valenceNawat: "",
                    tenseOwner: "",
                    hasTensePosition: false,
                },
            },
        }
    );
    const lesson6ProbeText = [
        ...lesson6Pursuit.plannedArrows.map((arrow) => arrow.aim),
        ...lesson6Pursuit.firedArrows.map((arrow) => arrow.correction),
    ].join(" ");
    s.ok(
        "Lesson 6 pursuit frame carries formula authority miss probes",
        /Correcci[oó]n antes de existencia/.test(lesson6ProbeText)
            && /ruta de entrada a salida/.test(lesson6ProbeText)
            && /sonda de fallo/.test(lesson6ProbeText)
            && /ki como mon[aá]dico/.test(lesson6ProbeText)
            && /ta como di[aá]dico/.test(lesson6ProbeText)
            && /mu-mu/.test(lesson6ProbeText)
            && /ne de l[ií]nea secundaria/.test(lesson6ProbeText)
            && /bloquear ne/.test(lesson6ProbeText)
    );
    const lesson7Pursuit = ctx.buildVncLesson7PursuitFrame();
    s.eq(
        "Lesson 7 pursuit frame audits all verbstem-class subsections",
        {
            stepNumber: lesson7Pursuit.stepNumber,
            aimStatus: lesson7Pursuit.aimStatus,
            plannedArrowIds: lesson7Pursuit.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson7Pursuit.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            pdfRefs: lesson7Pursuit.pdfRefs,
            subsectionRefs: lesson7Pursuit.subsectionInventory.map((entry) => entry.pdfRef),
            categories: lesson7Pursuit.subsectionInventory.map((entry) => entry.category),
            closestPass: lesson7Pursuit.closestPass,
            remainingGaps: lesson7Pursuit.remainingGaps,
        },
        {
            stepNumber: 7,
            aimStatus: "closest-pass",
            plannedArrowIds: ["lesson-7-verbstem-class-audit"],
            firedArrowIds: [["lesson-7-verbstem-class-audit", "hit"]],
            pdfRefs: [
                "Andrews Lesson 7.1",
                "Andrews Lesson 7.2",
                "Andrews Lesson 7.3",
                "Andrews Lesson 7.4",
                "Andrews Lesson 7.5",
                "Andrews Lesson 7.6",
                "Andrews Lesson 7.7",
                "Andrews Lesson 7.8",
                "Andrews Lesson 7.9",
                "Andrews Lesson 7.10",
            ],
            subsectionRefs: [
                "Andrews Lesson 7.1",
                "Andrews Lesson 7.2",
                "Andrews Lesson 7.3",
                "Andrews Lesson 7.4",
                "Andrews Lesson 7.5",
                "Andrews Lesson 7.6",
                "Andrews Lesson 7.7",
                "Andrews Lesson 7.8",
                "Andrews Lesson 7.9",
                "Andrews Lesson 7.10",
            ],
            categories: [
                "verbstem-morphemic-structure",
                "verbcore-citation-form",
                "verbstem-classes",
                "class-b-perfective-changes",
                "variable-class-membership",
                "class-determination-guidelines",
                "core-tense-predicate-formation",
                "vnc-analysis-translation",
                "indefinite-personal-object-relationship",
                "ta-fusion-derivation",
            ],
            closestPass: true,
            remainingGaps: [],
        }
    );
    s.eq(
        "Lesson 7 frame anchors class routing citation and ta fusion",
        {
            stemRole: lesson7Pursuit.verbstemStructureFrame.stemRole,
            citationUnit: lesson7Pursuit.citationFormFrame.citationUnit,
            nonhumanCitation: lesson7Pursuit.citationFormFrame.citationObjectMarkers.projectiveNonhuman,
            classIds: Object.keys(lesson7Pursuit.verbstemClassFrame.classes),
            classBasis: lesson7Pursuit.verbstemClassFrame.classBasis,
            classBTrigger: lesson7Pursuit.classBChangeFrame.trigger,
            variableOptions: lesson7Pursuit.variableClassFrame.classOptions,
            guidelineIds: lesson7Pursuit.classGuidelines.map((entry) => entry.id),
            predicateConstituents: lesson7Pursuit.predicateFormationFrame.predicateConstituents,
            analysisDivision: lesson7Pursuit.analysisFrame.requiredDivision,
            indefiniteHuman: lesson7Pursuit.objectRelationshipFrame.humanIndefinite.currentNawat,
            indefiniteNonhuman: lesson7Pursuit.objectRelationshipFrame.nonhumanIndefinite.currentNawat,
            fusionName: lesson7Pursuit.taFusionFrame.visibleNawatName,
            fusionTarget: lesson7Pursuit.taFusionFrame.targetStructure,
            fusionObjectSlot: lesson7Pursuit.taFusionFrame.objectSlotAfterFusion,
        },
        {
            stemRole: "lexical-meaning-locus",
            citationUnit: "verbcore",
            nonhumanCitation: {
                classical: "tla",
                currentNawat: "ta",
                orthographyBridge: "Classical tla -> Nawat ta",
            },
            classIds: ["A", "B", "C", "D"],
            classBasis: "perfective-stem-shape",
            classBTrigger: "loss-or-silencing-of-final-vowel",
            variableOptions: ["A", "B"],
            guidelineIds: [
                "monosyllabic-long-a",
                "final-vowel-after-cluster",
                "final-ka",
                "final-tla",
                "intransitive-wa-change",
                "final-ya",
                "final-o",
                "class-d-list",
            ],
            predicateConstituents: ["core", "tense"],
            analysisDivision: "subject-plus-predicate",
            indefiniteHuman: "te",
            indefiniteNonhuman: "ta",
            fusionName: "fusión ta",
            fusionTarget: "derived intransitive verbstem",
            fusionObjectSlot: "none",
        }
    );
    s.eq(
        "Lesson 7 CNV formula path uses one aspect resolver for imperfective and perfective slots",
        {
            unifiedResolver: typeof ctx.getCnvFormulaLesson7SurfaceSlots,
            sourceFrameBuilder: typeof ctx.buildCnvFormulaLesson7SurfaceSlotsSourceFrame,
            operationFrameBuilder: typeof ctx.buildCnvFormulaLesson7SurfaceSlotsOperationFrame,
            frameMismatch: typeof ctx.getCnvFormulaLesson7SurfaceSlotsFrameMismatch,
            oldPreteritResolver: typeof ctx.getCnvFormulaPreteritFoldedSurfaceSlots,
            oldPerfectiveResolver: typeof ctx.getCnvFormulaClassPerfectiveSurfaceSlots,
            oldSuffixResolver: typeof ctx.getCnvFormulaSuffixSurfaceSlots,
            oldWholeResolver: typeof ctx.getCnvFormulaWholeSurfaceSlots,
            buildRecordCallsUnifiedResolver: /getCnvFormulaLesson7SurfaceSlots/.test(String(ctx.buildCnvFormulaSurfacePathRecord)),
            buildRecordCallsOldResolvers: /getCnvFormula(?:PreteritFolded|ClassPerfective|Suffix|Whole)SurfaceSlots/.test(String(ctx.buildCnvFormulaSurfacePathRecord)),
        },
        {
            unifiedResolver: "function",
            sourceFrameBuilder: "function",
            operationFrameBuilder: "function",
            frameMismatch: "function",
            oldPreteritResolver: "undefined",
            oldPerfectiveResolver: "undefined",
            oldSuffixResolver: "undefined",
            oldWholeResolver: "undefined",
            buildRecordCallsUnifiedResolver: true,
            buildRecordCallsOldResolvers: false,
        }
    );
    s.eq(
        "Lesson 7 CNV formula surface-slot resolver is gated by typed source and operation frames",
        (() => {
            const formulaSlots = {
                pers1Pers2: { displayPrefix: "Ø", displayCase: "Ø" },
                obj1: { displayPrefix: "ki-0" },
                reflexivo: { displayPrefix: "Ø" },
                predicateStem: { displayStem: "piya" },
                tensePosition: { displayMorph: "Ø", tenseValue: "preterito" },
                num1Num2: { displayConnector: "ki-0" },
            };
            const segments = [
                { role: "obj1", slot: "obj1", value: "ki" },
                { role: "tronco", slot: "tronco", value: "pishki" },
            ];
            const sourceFrame = ctx.buildCnvFormulaLesson7SurfaceSlotsSourceFrame({
                formulaSlots,
                surface: "kipishki",
                segments,
            });
            const operationFrame = ctx.buildCnvFormulaLesson7SurfaceSlotsOperationFrame(sourceFrame);
            const otherSourceFrame = ctx.buildCnvFormulaLesson7SurfaceSlotsSourceFrame({
                formulaSlots,
                surface: "kipiyak",
                segments: [
                    { role: "obj1", slot: "obj1", value: "ki" },
                    { role: "tronco", slot: "tronco", value: "piyak" },
                ],
            });
            const summarize = (slots) => slots ? {
                base: slots.base || "",
                num1: slots.num1 || "",
                num2: slots.num2 || "",
            } : null;
            return {
                sourceFrameKind: sourceFrame?.kind || "",
                operationId: operationFrame?.operationId || "",
                authorized: summarize(ctx.getCnvFormulaLesson7SurfaceSlots(formulaSlots, "kipishki", segments, {
                    sourceFrame,
                    operationFrame,
                })),
                stringOnly: summarize(ctx.getCnvFormulaLesson7SurfaceSlots(formulaSlots, "kipishki", segments)),
                changedStrings: summarize(ctx.getCnvFormulaLesson7SurfaceSlots(
                    { predicateStem: { displayStem: "poison" } },
                    "poison",
                    [{ role: "tronco", slot: "tronco", value: "poison" }],
                    { sourceFrame, operationFrame }
                )),
                missingOperation: summarize(ctx.getCnvFormulaLesson7SurfaceSlots(formulaSlots, "kipishki", segments, {
                    sourceFrame,
                })),
                contradictorySource: summarize(ctx.getCnvFormulaLesson7SurfaceSlots(formulaSlots, "kipishki", segments, {
                    sourceFrame: otherSourceFrame,
                    operationFrame,
                })),
                contradictoryTarget: summarize(ctx.getCnvFormulaLesson7SurfaceSlots(formulaSlots, "kipishki", segments, {
                    sourceFrame,
                    operationFrame: {
                        ...operationFrame,
                        targetSurfaceSlots: {
                            ...operationFrame.targetSurfaceSlots,
                            base: "poison",
                        },
                    },
                })),
            };
        })(),
        {
            sourceFrameKind: "cnv-formula-lesson-7-surface-slots-source-frame",
            operationId: "cnv-formula-lesson-7-surface-slot-realization",
            authorized: { base: "pish", num1: "ki", num2: "0" },
            stringOnly: null,
            changedStrings: { base: "pish", num1: "ki", num2: "0" },
            missingOperation: null,
            contradictorySource: null,
            contradictoryTarget: null,
        }
    );
    const muBeforeIAllomorphy = ctx.applyObj1Allomorphy({
        verb: "ilnamiqui",
        analysisVerb: "ilnamiqui",
        obj1: "mu",
    });
    const muBeforeAjsiAllomorphy = ctx.applyObj1Allomorphy({
        verb: "ajsi",
        analysisVerb: "ajsi",
        obj1: "mu",
    });
    const muBeforeAltiaAllomorphy = ctx.applyObj1Allomorphy({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
    });
    const supportiveIAllomorphy = ctx.applyObj1Allomorphy({
        verb: "ilnamiqui",
        analysisVerb: "ilnamiqui",
        obj1: "ta",
        hasOptionalSupportiveI: true,
        optionalSupportiveLetter: "i",
        hasNonspecificValence: true,
    });
    const typedNonspecificSourceFrame = ctx.buildNonspecificObjectAllomorphySourceFrame({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
    });
    const typedNonspecificOperationFrame = ctx.buildNonspecificObjectAllomorphyOperationFrame(
        typedNonspecificSourceFrame
    );
    const typedNonspecificAllomorphy = ctx.applyNonspecificObjectAllomorphy({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
        sourceFrame: typedNonspecificSourceFrame,
        operationFrame: typedNonspecificOperationFrame,
    });
    const directNonspecificAllomorphy = ctx.applyNonspecificObjectAllomorphy({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
    });
    const missingNonspecificOperation = ctx.applyNonspecificObjectAllomorphy({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
        sourceFrame: typedNonspecificSourceFrame,
    });
    const changedNonspecificRequest = ctx.applyNonspecificObjectAllomorphy({
        verb: "poison",
        analysisVerb: "poison",
        obj1: "mu",
        sourceFrame: typedNonspecificSourceFrame,
        operationFrame: typedNonspecificOperationFrame,
    });
    const contradictoryNonspecificSource = ctx.applyNonspecificObjectAllomorphy({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
        sourceFrame: {
            ...typedNonspecificSourceFrame,
            sourceSignature: "poison",
        },
        operationFrame: typedNonspecificOperationFrame,
    });
    const contradictoryNonspecificTarget = ctx.applyNonspecificObjectAllomorphy({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
        sourceFrame: typedNonspecificSourceFrame,
        operationFrame: {
            ...typedNonspecificOperationFrame,
            targetFrame: {
                ...typedNonspecificOperationFrame.targetFrame,
                obj1: "poison",
            },
        },
    });
    s.eq(
        "obj1 allomorphy exposes Lesson 2 frame for mu before vowel-contact boundary",
        {
            obj1: muBeforeIAllomorphy.obj1,
            morphologyObj1: muBeforeIAllomorphy.morphologyObj1,
            operationId: muBeforeIAllomorphy.nonspecificAllomorphyOperationFrame?.operationId || "",
            frames: muBeforeIAllomorphy.soundSpellingFrames.map((frame) => ({
                ruleId: frame.ruleId,
                source: frame.sourceSurface,
                target: frame.target,
                slot: frame.grammarSlot,
                sourceSegment: frame.sourceSegmentValue,
                targetSegment: frame.targetSegmentValue,
            })),
        },
        {
            obj1: "m",
            morphologyObj1: "m",
            operationId: "andrews-nonspecific-object-allomorphy-realization",
            frames: [{
                ruleId: "obj1-mu-before-vowel-m",
                source: "mu",
                target: "m",
                slot: "obj1",
                sourceSegment: "mu",
                targetSegment: "m",
            }],
        }
    );
    s.eq(
        "nonspecific object allomorphy consumes typed operation frames instead of direct strings",
        {
            helperTypes: [
                typeof ctx.buildNonspecificObjectAllomorphySourceFrame,
                typeof ctx.buildNonspecificObjectAllomorphyOperationFrame,
                typeof ctx.getNonspecificObjectAllomorphyFrameMismatch,
            ],
            typed: {
                obj1: typedNonspecificAllomorphy.obj1,
                verb: typedNonspecificAllomorphy.verb,
                operationId: typedNonspecificOperationFrame.operationId,
            },
            direct: {
                blocked: directNonspecificAllomorphy.blocked,
                obj1: directNonspecificAllomorphy.obj1,
            },
            missingOperation: missingNonspecificOperation.blocked,
            changedRequest: changedNonspecificRequest.blocked,
            contradictorySource: contradictoryNonspecificSource.blocked,
            contradictoryTarget: contradictoryNonspecificTarget.blocked,
        },
        {
            helperTypes: ["function", "function", "function"],
            typed: {
                obj1: "m",
                verb: "altia",
                operationId: "andrews-nonspecific-object-allomorphy-realization",
            },
            direct: {
                blocked: true,
                obj1: "",
            },
            missingOperation: true,
            changedRequest: true,
            contradictorySource: true,
            contradictoryTarget: true,
        }
    );
    s.eq(
        "obj1 allomorphy distinguishes mu+ajsi from mu+altia",
        {
            ajsi: {
                obj1: muBeforeAjsiAllomorphy.obj1,
                morphologyObj1: muBeforeAjsiAllomorphy.morphologyObj1,
                frameCount: muBeforeAjsiAllomorphy.soundSpellingFrames.length,
            },
            altia: {
                obj1: muBeforeAltiaAllomorphy.obj1,
                morphologyObj1: muBeforeAltiaAllomorphy.morphologyObj1,
                frames: muBeforeAltiaAllomorphy.soundSpellingFrames.map((frame) => ({
                    ruleId: frame.ruleId,
                    source: frame.sourceSurface,
                    target: frame.target,
                    slot: frame.grammarSlot,
                    position: frame.syllablePosition,
                    sourceSegment: frame.sourceSegmentValue,
                    targetSegment: frame.targetSegmentValue,
                })),
            },
        },
        {
            ajsi: {
                obj1: "mu",
                morphologyObj1: "mu",
                frameCount: 0,
            },
            altia: {
                obj1: "m",
                morphologyObj1: "m",
                frames: [{
                    ruleId: "obj1-mu-before-vowel-m",
                    source: "mu",
                    target: "m",
                    slot: "obj1",
                    position: "before-al-stem",
                    sourceSegment: "mu",
                    targetSegment: "m",
                }],
            },
        }
    );
    s.eq(
        "obj1 allomorphy exposes Lesson 2 frame for supportive i deletion",
        {
            verb: supportiveIAllomorphy.verb,
            analysisVerb: supportiveIAllomorphy.analysisVerb,
            frames: supportiveIAllomorphy.soundSpellingFrames.map((frame) => ({
                ruleId: frame.ruleId,
                source: frame.sourceSurface,
                target: frame.target,
                slot: frame.grammarSlot,
                sourceSegment: frame.sourceSegmentValue,
                targetSegment: frame.targetSegmentValue,
            })),
        },
        {
            verb: "lnamiqui",
            analysisVerb: "lnamiqui",
            frames: [{
                ruleId: "supportive-i-stem-initial-elision",
                source: "i",
                target: "",
                slot: "stem-initial",
                sourceSegment: "ilnamiqui",
                targetSegment: "lnamiqui",
            }],
        }
    );
    s.eq(
        "nuclear-clause executor names internal surface builders as surfaces, not words",
        {
            hasSurfaceBuilder: /buildActiveNuclearClauseSurfaceText/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasCurrentSlotBuilder: /buildSurfaceFromCurrentSlots/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasSlotPartsBuilder: /buildSurfaceFromSlotParts/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasTroncoSlotInput: /troncoSlot/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldVerbValueParam: /\bverbValue\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldMutableSubjectPrefix: /\blet\s+subjectPrefix\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldMutableObjectPrefix: /\blet\s+objectPrefix\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldMutableVerb: /\blet\s+verb\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldRenderVerbBinding: /\bconst\s+renderVerb\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldBuildWordName: /buildWord(?:FromParts)?\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
        },
        {
            hasSurfaceBuilder: true,
            hasCurrentSlotBuilder: true,
            hasSlotPartsBuilder: true,
            hasTroncoSlotInput: true,
            hasOldVerbValueParam: false,
            hasOldMutableSubjectPrefix: false,
            hasOldMutableObjectPrefix: false,
            hasOldMutableVerb: false,
            hasOldRenderVerbBinding: false,
            hasOldBuildWordName: false,
        }
    );
    s.eq(
        "nuclear-clause validation blocks before parsed/rendered stem is required",
        (() => {
            const result = ctx.executeNuclearClauseSurfaceRequest({
                options: {
                    silent: true,
                    skipValidation: false,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
                posicionesFormula: {
                    pers1: "ni",
                    obj1: "",
                    tronco: "(nem!)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "presente",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                blocked: Boolean(result?.error),
                diagnosticId: result?.diagnostics?.[0]?.id || "",
                routeStage: result?.frames?.routeContract?.routeStage || "",
                sourceInput: result?.frames?.resultFrame?.sourceInput || "",
                stemFrameStem: result?.frames?.stemFrame?.stem || "",
                surface: result?.surface || "",
                surfaceOutputIsGrammarSource: result?.frames?.resultFrame?.surfaceOutputIsGrammarSource,
            };
        })(),
        {
            blocked: true,
            diagnosticId: "nuclear-clause-surface-validation-error",
            routeStage: "validate",
            sourceInput: "(nem!)",
            stemFrameStem: "(nem!)",
            surface: "",
            surfaceOutputIsGrammarSource: false,
        }
    );
    s.eq(
        "compatibility facade can sync input without requiring the visual mirror hook",
        (() => {
            const originalRenderVerbMirror = ctx.renderVerbMirror;
            const originalRenderAllOutputs = ctx.renderAllOutputs;
            const originalRememberScreenCalculatorAnsState = ctx.rememberScreenCalculatorAnsState;
            const originalUpdateVerbRuleHint = ctx.updateVerbRuleHint;
            const originalUpdateVerbDisambiguation = ctx.updateVerbDisambiguation;
            const originalMaybeAutoScrollToConjugationRow = ctx.maybeAutoScrollToConjugationRow;
            try {
                ctx.renderVerbMirror = undefined;
                ctx.renderAllOutputs = () => {};
                ctx.rememberScreenCalculatorAnsState = () => {};
                ctx.updateVerbRuleHint = () => {};
                ctx.updateVerbDisambiguation = () => {};
                ctx.maybeAutoScrollToConjugationRow = () => {};
                const control = ctx.document?.getElementById
                    ? ctx.document.getElementById("verb")
                    : null;
                if (control) {
                    control.value = "";
                    control.dataset = control.dataset || {};
                }
                const result = ctx.generateNuclearClauseSurface({
                    silent: false,
                    posicionesFormula: {
                        pers1: "ni",
                        obj1: "",
                        tronco: "(nemi)",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "presente",
                    },
                });
                return {
                    surface: result?.surface || result?.result || "",
                    inputSynced: Boolean(control?.value),
                    hasMirrorHook: typeof ctx.renderVerbMirror,
                };
            } finally {
                if (typeof originalRenderVerbMirror === "function") {
                    ctx.renderVerbMirror = originalRenderVerbMirror;
                } else {
                    delete ctx.renderVerbMirror;
                }
                ctx.renderAllOutputs = originalRenderAllOutputs;
                ctx.rememberScreenCalculatorAnsState = originalRememberScreenCalculatorAnsState;
                ctx.updateVerbRuleHint = originalUpdateVerbRuleHint;
                ctx.updateVerbDisambiguation = originalUpdateVerbDisambiguation;
                ctx.maybeAutoScrollToConjugationRow = originalMaybeAutoScrollToConjugationRow;
            }
        })(),
        {
            surface: "ninemi",
            inputSynced: true,
            hasMirrorHook: "undefined",
        }
    );

    // isWalThirdPersonMarker — true for ki, kin, k (wal-directional capable 3rd-person markers)
    s.ok("isWal3P: ki", ctx.isWalThirdPersonMarker("ki"));
    s.ok("isWal3P: kin", ctx.isWalThirdPersonMarker("kin"));
    s.ok("isWal3P: k", ctx.isWalThirdPersonMarker("k"));
    s.no("isWal3P: ni (1st person)", ctx.isWalThirdPersonMarker("ni"));
    s.no("isWal3P: wal (directional)", ctx.isWalThirdPersonMarker("wal"));
    s.no("isWal3P: empty", ctx.isWalThirdPersonMarker(""));

    // splitSearchInput — splits input into base verb and optional query
    const r1 = ctx.splitSearchInput("nemi");
    s.eq("splitSearch: single verb — base", r1.base, "nemi");
    s.no("splitSearch: single verb — no query", r1.hasQuery);

    const r2 = ctx.splitSearchInput("ni nemi");
    s.eq("splitSearch: prefix+verb — base", r2.base, "ni nemi");
    s.no("splitSearch: prefix+verb — no query", r2.hasQuery);

    const noStemMask = ctx.buildNoStemMaskResult({
        shouldMask: true,
        silent: true,
        renderVerb: "nemi",
        tense: "presente",
    });
    s.eq("noStemMask: masked result marker", noStemMask.result, "—");
    s.eq("noStemMask: masked result exposes empty surfaceForms", noStemMask.surfaceForms, []);
    s.eq(
        "noStemMask: masked result exposes the blocked LCM contract",
        {
            ok: noStemMask.ok,
            surface: noStemMask.surface,
            framesIsGrammarFrame: noStemMask.frames === noStemMask.grammarFrame,
            routeFamily: noStemMask.frames.routeContract.routeFamily,
            routeStage: noStemMask.frames.routeContract.routeStage,
            generationAllowed: noStemMask.frames.routeContract.generationAllowed,
            diagnosticId: noStemMask.diagnostics[0].id,
            enumerableContract: Object.prototype.propertyIsEnumerable.call(noStemMask, "grammarFrame"),
        },
        {
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            routeFamily: "forward-derivation",
            routeStage: "no-stem-mask",
            generationAllowed: false,
            diagnosticId: "generate-forward-derivation-no-stem",
            enumerableContract: false,
        }
    );

    const validationError = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "executeGenerateWordRequest: validation error exposes the blocked LCM contract",
        {
            error: validationError.error,
            ok: validationError.ok,
            surface: validationError.surface,
            framesIsGrammarFrame: validationError.frames === validationError.grammarFrame,
            routeStage: validationError.frames.routeContract.routeStage,
            routeFamily: validationError.frames.routeContract.routeFamily,
            generationAllowed: validationError.frames.routeContract.generationAllowed,
            canonicalExecuteFunction: validationError.surfaceEngineContract?.canonicalExecuteFunction,
            compatibilityExecuteFunction: validationError.surfaceEngineContract?.compatibilityExecuteFunction,
            surfaceIsSource: validationError.surfaceEngineContract?.surfaceOutputIsGrammarSource,
            diagnosticId: validationError.diagnostics[0].id,
            diagnosticMessage: validationError.diagnostics[0].message,
            enumerableContract: Object.prototype.propertyIsEnumerable.call(validationError, "grammarFrame"),
        },
        {
            error: "El verbo no puede estar vacío. Ingrese verbo.",
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            routeStage: "validate",
            routeFamily: "nuclear-clause-surface",
            generationAllowed: false,
            canonicalExecuteFunction: "executeNuclearClauseSurfaceRequest",
            compatibilityExecuteFunction: "executeGenerateWordRequest",
            surfaceIsSource: false,
            diagnosticId: "nuclear-clause-surface-validation-error",
            diagnosticMessage: "El verbo no puede estar vacío. Ingrese verbo.",
            enumerableContract: false,
        }
    );

    const nonactiveOverride = ctx.applyNonactiveGenerateOverrides({
        nonactiveDerivation: {
            nonactiveObjectPrefixOverride: "mu",
            nonactiveIndirectMarkerOverride: "te",
        },
        obj1: "ki",
        morphologyObj1: "ki",
        obj1Base: "ki",
        obj2: "ta",
        obj3: "te",
        isReflexive: false,
    });
    s.eq("nonactive override: obj1 forced to mu", nonactiveOverride.obj1, "mu");
    s.eq("nonactive override: obj2 overridden", nonactiveOverride.obj2, "te");
    s.eq("nonactive override: obj3 cleared", nonactiveOverride.obj3, "");
    s.ok("nonactive override: mu implies reflexive", nonactiveOverride.isReflexive);

    const suppletiveStemSet = {
        imperfective: { verb: "nemi", analysisVerb: "nemi" },
        variantsByClass: new Map([
            ["A", [{ base: "nem", suffix: "ki" }]],
        ]),
    };
    const prefixedSuppletive = ctx.applySuppletiveYawiPrefixToStemSet(
        suppletiveStemSet,
        (value) => `ya${value}`
    );
    s.eq("suppletive yawi prefix: imperfective stem", prefixedSuppletive.imperfective.verb, "yanemi");
    s.eq(
        "suppletive yawi prefix: class A variant base",
        prefixedSuppletive.variantsByClass.get("A")[0].base,
        "yanem"
    );

    const normalizedOptions = ctx.normalizeNuclearClauseSurfaceOptions({
        skipValidation: true,
    });
    s.ok("normalizeNuclearClauseSurfaceOptions keeps canonical skip flag", normalizedOptions.skipValidation === true);

    const sanitizedOptions = ctx.sanitizeNuclearClauseSurfaceOptions({
        skipValidation: true,
    });
    s.ok("sanitizeNuclearClauseSurfaceOptions keeps canonical skipValidation", sanitizedOptions.skipValidation === true);
    s.eq(
        "compatibility request helper aliases delegate to nuclear-clause surface helpers",
        {
            normalizeAlias: /normalizeNuclearClauseSurfaceOptions/.test(String(ctx.normalizeGenerateWordOptions)),
            sanitizeAlias: /sanitizeNuclearClauseSurfaceOptions/.test(String(ctx.sanitizeGenerateWordOptions)),
            formulaAlias: /getNuclearClauseSurfacePosicionesFormula/.test(String(ctx.getGenerateWordPosicionesFormula)),
            internalInputAlias: /buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula/.test(String(ctx.buildGenerateWordEntradasInternasFromPosicionesFormula)),
            canonicalHelpers: [
                typeof ctx.normalizeNuclearClauseSurfaceOptions,
                typeof ctx.sanitizeNuclearClauseSurfaceOptions,
                typeof ctx.getNuclearClauseSurfacePosicionesFormula,
                typeof ctx.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula,
            ],
        },
        {
            normalizeAlias: true,
            sanitizeAlias: true,
            formulaAlias: true,
            internalInputAlias: true,
            canonicalHelpers: ["function", "function", "function", "function"],
        }
    );

    s.ok(
        "canReusePreParsedVerb accepts matching source raw verb",
        ctx.canReusePreParsedVerb({ parsedVerb: { sourceRawVerb: "(nemi)" }, rawVerb: "(nemi)" })
    );
    s.no(
        "canReusePreParsedVerb rejects mismatched source raw verb",
        ctx.canReusePreParsedVerb({ parsedVerb: { sourceRawVerb: "(nemi)" }, rawVerb: "(kisa)" })
    );
    s.eq(
        "raw-input gate source: patientivo strict perfective source is authoritative",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "patientivo",
            patientivoSource: "perfectivo",
        }),
        "perfectivo"
    );
    s.eq(
        "raw-input gate source: patientivo adjective perfective source is authoritative",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "adjetivo-patientivo-perfectivo",
        }),
        "perfectivo"
    );
    s.eq(
        "raw-input gate source: non-strict patientivo source keeps generic gates",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "patientivo",
            patientivoSource: "nonactive",
        }),
        ""
    );
    s.eq(
        "raw-input gate source: finite tense keeps generic gates",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "presente",
            patientivoSource: "perfectivo",
        }),
        ""
    );

    s.eq(
        "getNuclearClauseSurfacePosicionesFormula emits Andrews/Spanish runtime keys",
        ctx.getNuclearClauseSurfacePosicionesFormula({
            override: {
                obj1: "mu",
                tiempo: "presente",
                obj2: "tech",
                obj3: "kin",
                poseedor: "nu",
            },
            pers1Control: { value: "ni" },
            pers2Control: { value: "t" },
            troncoControl: { value: "(ilpia)" },
            troncoInputSource: { parseValue: "ilpia" },
        }),
        {
            pers1: "ni",
            obj1: "mu",
            tronco: "ilpia",
            pers2: "t",
            num2: "t",
            poseedor: "nu",
            obj2: "tech",
            obj3: "kin",
            reflexivo: "mu",
            tiempo: "presente",
        }
    );
    s.eq(
        "internal generation input can be rebuilt from Andrews/Spanish posicionesFormula",
        ctx.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula({
            pers1: "ti",
            obj1: "ki",
            tronco: "(maka)",
            pers2: "t",
            poseedor: "tu",
        }),
        {
            pers1: "ti",
            obj1: "ki",
            tronco: "(maka)",
            pers2: "t",
            num2: "t",
            poseedor: "tu",
            obj2: "",
            obj3: "",
            reflexivo: "",
            tiempo: "",
        }
    );
    s.eq(
        "surface-producing path uses Andrews CNV formula slots directly",
        (() => {
            const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                pers1: "ti",
                obj1: "ki",
                tronco: "(maka)",
                pers2: "t",
                num2: "t",
                poseedor: "tu",
                obj2: "tech",
                obj3: "kin",
                reflexivo: "",
                tiempo: "presente",
            });
            const bySurfaceSlot = Object.fromEntries(
                bridge.slots.map((slot) => [slot.surfaceSlot, slot])
            );
            return {
                surfaceProducingSlotCount: bridge.surfaceProducingSlotCount,
                cnvFormulaSlotCount: bridge.cnvFormulaSlotCount,
                surfaceProducingSlots: bridge.surfaceProducingSlots,
                cnvFormulaSlots: bridge.cnvFormulaSlots,
                pers2: {
                    formulaSlot: bySurfaceSlot.pers2.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.pers2.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.pers2.surfaceSegmentRole,
                },
                va1: {
                    formulaSlot: bySurfaceSlot.va1.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.va1.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.va1.surfaceSegmentRole,
                },
                va2: {
                    formulaSlot: bySurfaceSlot.va2.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.va2.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.va2.surfaceSegmentRole,
                },
                base: {
                    formulaSlot: bySurfaceSlot.base.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.base.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.base.surfaceSegmentRole,
                },
            };
        })(),
        {
            surfaceProducingSlotCount: 8,
            cnvFormulaSlotCount: 8,
            surfaceProducingSlots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
            cnvFormulaSlots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
            pers2: {
                formulaSlot: "pers2",
                formulaName: "pers2",
                surfaceRole: "pers2",
            },
            va1: {
                formulaSlot: "va1",
                formulaName: "va1",
                surfaceRole: "obj1",
            },
            va2: {
                formulaSlot: "va2",
                formulaName: "va2",
                surfaceRole: "obj1",
            },
            base: {
                formulaSlot: "base",
                formulaName: "base",
                surfaceRole: "tronco",
            },
        }
    );
    s.eq(
        "CNV formula path exposes all base surface realizations for piya preterit variants",
        (() => {
            const nuclearClauseShell = {
                formulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
                formulaSlots: {
                    pers1Pers2: { displayPrefix: "Ø", displayCase: "Ø" },
                    obj1: { displayPrefix: "ki-0" },
                    reflexivo: { displayPrefix: "Ø" },
                    predicateStem: { displayStem: "piya" },
                    tensePosition: { displayMorph: "Ø" },
                    num1Num2: { displayConnector: "ki-0" },
                },
            };
            const surfaceRecords = [
                {
                    surface: "kipishki",
                    segments: [
                        { role: "obj1", slot: "obj1", value: "ki" },
                        { role: "tronco", slot: "tronco", value: "pish" },
                        { role: "pers2", slot: "pers2", value: "ki" },
                    ],
                },
                {
                    surface: "kipiyak",
                    segments: [
                        { role: "obj1", slot: "obj1", value: "ki" },
                        { role: "tronco", slot: "tronco", value: "piya" },
                        { role: "pers2", slot: "pers2", value: "k" },
                    ],
                },
            ];
            const path = ctx.buildGeneratedCnvFormulaSurfacePath({
                nuclearClauseShell,
                surfaceRecord: surfaceRecords[0],
                surfaceRecords,
            });
            const basePath = Object.fromEntries(
                (path.paths || []).map((entry) => [entry.formulaSlotKey, entry])
            ).base || {};
            return {
                formulaEcho: path.formulaEcho,
                primarySurface: path.surface,
                formulaBase: basePath.formulaMorph,
                primaryBaseSurface: basePath.surfaceValue,
                baseSurfaceRealizations: basePath.surfaceRealizations,
                topLevelBaseSurfaceRealizations: path.surfaceStemRealizations,
                pathsBySurface: (path.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        formulaBase: bySlot.base?.formulaMorph || "",
                        surfaceBase: bySlot.base?.surfaceValue || "",
                        baseStatus: bySlot.base?.status || "",
                        num1Surface: bySlot.num1?.surfaceValue || "",
                    };
                }),
            };
        })(),
        {
            formulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
            primarySurface: "kipishki",
            formulaBase: "piya",
            primaryBaseSurface: "pish",
            baseSurfaceRealizations: ["pish", "piya"],
            topLevelBaseSurfaceRealizations: ["pish", "piya"],
            pathsBySurface: [
                {
                    surface: "kipishki",
                    formulaBase: "piya",
                    surfaceBase: "pish",
                    baseStatus: "surface-rule-required",
                    num1Surface: "ki",
                },
                {
                    surface: "kipiyak",
                    formulaBase: "piya",
                    surfaceBase: "piya",
                    baseStatus: "matched",
                    num1Surface: "k",
                },
            ],
        }
    );
    s.eq(
        "CNV formula path splits piya preterit stem variants from number connector",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "",
                            tronco: "piya",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "piya",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        num1: bySlot.num1?.surfaceValue || "",
                        num2: bySlot.num2?.surfaceValue || "",
                    };
                }),
            };
        })(),
        {
            surfaceForms: ["pishki", "piyak"],
            formula: "#Ø-Ø(piya)Ø+ki-0#",
            baseRealizations: ["pish", "piya"],
            connectorRealizations: ["ki-0", "k-0"],
            pathsBySurface: [
                { surface: "pishki", base: "pish", num1: "ki", num2: "0" },
                { surface: "piyak", base: "piya", num1: "k", num2: "0" },
            ],
        }
    );
    s.eq(
        "Lesson 5.1 intransitive preterit keeps pers1 allomorph outside i-initial stem in formula and path",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "",
                            tronco: "ina",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "",
                    tronco: "ina",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => {
                const bySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    result: result.result,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    path: {
                        pers1: bySlot.pers1?.surfaceValue || "",
                        base: bySlot.base?.surfaceValue || "",
                        tns: bySlot.tns?.surfaceValue || bySlot.tns?.formulaMorph || "",
                        num1: bySlot.num1?.surfaceValue || bySlot.num1?.formulaMorph || "",
                        num2: bySlot.num2?.surfaceValue || bySlot.num2?.formulaMorph || "",
                    },
                    surfaceProducingPath: {
                        pers1: bridgeBySlot.pers1?.value || "",
                        base: bridgeBySlot.base?.value || "",
                        tns: bridgeBySlot.tns?.value || "",
                        num1: bridgeBySlot.num1?.value || "",
                        num2: bridgeBySlot.num2?.value || "",
                    },
                };
            };
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
            ];
        })(),
        [
            {
                result: "ninak",
                formula: "#n-Ø(ina)Ø+k-0#",
                path: { pers1: "n", base: "ina", tns: "Ø", num1: "k", num2: "0" },
                surfaceProducingPath: { pers1: "n", base: "ina", tns: "Ø", num1: "k", num2: "0" },
            },
            {
                result: "tinak",
                formula: "#t-Ø(ina)Ø+k-0#",
                path: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "0" },
                surfaceProducingPath: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "0" },
            },
            {
                result: "tinaket",
                formula: "#t-Ø(ina)Ø+k-et#",
                path: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "et" },
                surfaceProducingPath: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "et" },
            },
            {
                result: "anhinaket",
                formula: "#anh-Ø(ina)Ø+k-et#",
                path: { pers1: "anh", base: "ina", tns: "Ø", num1: "k", num2: "et" },
                surfaceProducingPath: { pers1: "anh", base: "ina", tns: "Ø", num1: "k", num2: "et" },
            },
        ]
    );
    s.eq(
        "CNV formula path keeps transitive object outside piya preterit stem variants",
        (() => {
            const buildProbe = (pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco: "piya",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco: "piya",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                object: result.nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    const va1Surface = bySlot.va1?.surfaceValue || "";
                    const va2Surface = bySlot.va2?.surfaceValue || "";
                    return {
                        surface: record.surface,
                        object: va2Surface ? `${va1Surface}-${va2Surface}` : va1Surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                    };
                }),
            });
            return [summarize(buildProbe("")), summarize(buildProbe("t"))];
        })(),
        [
            {
                surfaceForms: ["kipishki", "kipiyak"],
                formula: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
                object: "ki-0",
                baseRealizations: ["pish", "piya"],
                connectorRealizations: ["ki-0", "k-0"],
                pathsBySurface: [
                    { surface: "kipishki", object: "ki-0", base: "pish", connector: "ki-0" },
                    { surface: "kipiyak", object: "ki-0", base: "piya", connector: "k-0" },
                ],
            },
            {
                surfaceForms: ["kipishket", "kipiyaket"],
                formula: "#Ø-Ø+ki-0(piya)Ø+k-et#",
                object: "ki-0",
                baseRealizations: ["pish", "piya"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "kipishket", object: "ki-0", base: "pish", connector: "k-et" },
                    { surface: "kipiyaket", object: "ki-0", base: "piya", connector: "k-et" },
                ],
            },
        ]
    );
    s.eq(
        "CNV formula path assigns piki short preterit final k to stem and zero connector",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco: "piki",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco: "piki",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                surfaceForms: result.surfaceForms,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        formula: `#0-0+ki-0(${bySlot.base?.surfaceValue || ""})0+${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}#`,
                    };
                }),
            };
        })(),
        {
            surfaceForms: ["kipik", "kipikik"],
            pathsBySurface: [
                { surface: "kipik", formula: "#0-0+ki-0(pik)0+0-0#" },
                { surface: "kipikik", formula: "#0-0+ki-0(piki)0+k-0#" },
            ],
        }
    );
    s.eq(
        "CNV formula path expands tzuma optional preterit surfaces into separate stem and connector records",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "ni",
                            obj1: "ki",
                            tronco: "tzuma",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "ni",
                    obj1: "ki",
                    tronco: "tzuma",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                result: result.result,
                surfaceForms: result.surfaceForms,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                        hasParentheticalLeak: /\([^)]*\)/.test(record.surface)
                            || /\([^)]*\)/.test(bySlot.base?.surfaceValue || ""),
                    };
                }),
            };
        })(),
        {
            result: "niktzun / niktzunki",
            surfaceForms: ["niktzun", "niktzunki"],
            baseRealizations: ["tzun"],
            connectorRealizations: ["0-0", "ki-0"],
            pathsBySurface: [
                { surface: "niktzun", base: "tzun", connector: "0-0", hasParentheticalLeak: false },
                { surface: "niktzunki", base: "tzun", connector: "ki-0", hasParentheticalLeak: false },
            ],
        }
    );
    s.eq(
        "CNV formula path audits transitive preterit stems across different pre-final consonants",
        (() => {
            const verbs = ["piki", "tzuma", "tala", "tana", "tasa", "tacha", "paya", "mati", "taka"];
            const buildProbe = (tronco) => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco,
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco,
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return verbs.map((tronco) => {
                const result = buildProbe(tronco);
                return {
                    tronco,
                    result: result.result,
                    paths: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                        const bySlot = Object.fromEntries(
                            (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                        );
                        return `${record.surface}:${bySlot.base?.surfaceValue || ""}+${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`;
                    }),
                };
            });
        })(),
        [
            {
                tronco: "piki",
                result: "kipik / kipikik",
                paths: ["kipik:pik+0-0", "kipikik:piki+k-0"],
            },
            {
                tronco: "tzuma",
                result: "kitzun / kitzunki",
                paths: ["kitzun:tzun+0-0", "kitzunki:tzun+ki-0"],
            },
            {
                tronco: "tala",
                result: "kital",
                paths: ["kital:tal+0-0"],
            },
            {
                tronco: "tana",
                result: "kitanki",
                paths: ["kitanki:tan+ki-0"],
            },
            {
                tronco: "tasa",
                result: "kitaski",
                paths: ["kitaski:tas+ki-0"],
            },
            {
                tronco: "tacha",
                result: "kitachki / kitachak",
                paths: ["kitachki:tach+ki-0", "kitachak:tacha+k-0"],
            },
            {
                tronco: "paya",
                result: "kipashki / kipayak",
                paths: ["kipashki:pash+ki-0", "kipayak:paya+k-0"],
            },
            {
                tronco: "mati",
                result: "kimatki / kimatik",
                paths: ["kimatki:mat+ki-0", "kimatik:mati+k-0"],
            },
            {
                tronco: "taka",
                result: "kitak / kitakak",
                paths: ["kitak:tak+0-0", "kitakak:taka+k-0"],
            },
        ]
    );
    s.eq(
        "CNV formula path keeps maka preterit stem variant as stem, not connector-stripped ma",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "maka",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "maka",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                        shallowWrongBase: bySlot.base?.surfaceValue === "ma",
                    };
                }),
            });
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
                summarize(buildProbe("", "t")),
            ];
        })(),
        [
            {
                surfaceForms: ["nikmak", "nikmakak"],
                formula: "#ni-Ø+k-0(maka)Ø+k-0#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "nikmak", base: "mak", connector: "0-0", shallowWrongBase: false },
                    { surface: "nikmakak", base: "maka", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tikmak", "tikmakak"],
                formula: "#ti-Ø+k-0(maka)Ø+k-0#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "tikmak", base: "mak", connector: "0-0", shallowWrongBase: false },
                    { surface: "tikmakak", base: "maka", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kimak", "kimakak"],
                formula: "#Ø-Ø+ki-0(maka)Ø+k-0#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "kimak", base: "mak", connector: "0-0", shallowWrongBase: false },
                    { surface: "kimakak", base: "maka", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tikmakket", "tikmakaket"],
                formula: "#ti-Ø+k-0(maka)Ø+k-et#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "tikmakket", base: "mak", connector: "k-et", shallowWrongBase: false },
                    { surface: "tikmakaket", base: "maka", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["ankimakket", "ankimakaket"],
                formula: "#an-Ø+ki-0(maka)Ø+k-et#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "ankimakket", base: "mak", connector: "k-et", shallowWrongBase: false },
                    { surface: "ankimakaket", base: "maka", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kimakket", "kimakaket"],
                formula: "#Ø-Ø+ki-0(maka)Ø+k-et#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "kimakket", base: "mak", connector: "k-et", shallowWrongBase: false },
                    { surface: "kimakaket", base: "maka", connector: "k-et", shallowWrongBase: false },
                ],
            },
        ]
    );
    const finiteCnvSurfaceFormulaAudit = (() => {
        const tenses = [
            "presente",
            "presente-habitual",
            "imperfecto",
            "futuro",
            "preterito",
            "pasado-remoto",
            "optativo",
        ];
        const sourceStems = [
            { stem: "nemi", obj1: "" },
            { stem: "maka", obj1: "ki" },
            { stem: "mati", obj1: "ki" },
            { stem: "piki", obj1: "ki" },
            { stem: "tacha", obj1: "ki" },
            { stem: "paya", obj1: "ki" },
            { stem: "ajsi", obj1: "" },
            { stem: "chuka", obj1: "" },
            { stem: "teomati", obj1: "ta" },
        ];
        const subjects = [
            { label: "1sg", pers1: "ni", pers2: "" },
            { label: "3sg", pers1: "", pers2: "" },
            { label: "1pl", pers1: "ti", pers2: "t" },
            { label: "2pl", pers1: "an", pers2: "t" },
        ];
        const modes = [
            { label: "active", override: {}, obj1: null },
            { label: "nonactive", override: { derivationMode: ctx.DERIVATION_MODE.nonactive }, obj1: null },
            { label: "reflexive", override: {}, obj1: "mu" },
        ];
        const normalizeSurfaceForms = (forms = []) => [...new Set((Array.isArray(forms) ? forms : [])
            .flatMap((entry) => String(entry || "").split(/\s*\/\s*/))
            .map((entry) => entry.trim())
            .filter(Boolean))];
        const rows = [];
        tenses.forEach((tense) => {
            sourceStems.forEach((sourceStem) => {
                subjects.forEach((subject) => {
                    modes.forEach((mode) => {
                        const output = ctx.generateWord({
                            silent: true,
                            skipValidation: true,
                            override: {
                                tenseMode: ctx.TENSE_MODE.verbo,
                                ...mode.override,
                            },
                            posicionesFormula: {
                                pers1: subject.pers1,
                                obj1: mode.obj1 === null ? sourceStem.obj1 : mode.obj1,
                                tronco: sourceStem.stem,
                                pers2: subject.pers2,
                                num2: subject.pers2,
                                tiempo: tense,
                            },
                        });
                        const surfacePath = output.cnvFormulaSurfacePath || null;
                        const surfaces = normalizeSurfaceForms(output.surfaceForms);
                        if (!surfacePath || !surfaces.length) {
                            return;
                        }
                        const formulaPairs = Array.isArray(surfacePath.formulaSurfacePairs)
                            ? surfacePath.formulaSurfacePairs
                            : [];
                        rows.push({
                            label: [sourceStem.stem, tense, subject.label, mode.label].join("|"),
                            surfaces,
                            pairSurfaces: formulaPairs.map((entry) => String(entry?.surface || "").trim()).filter(Boolean),
                            targetFormulaEchoes: formulaPairs.map((entry) => String(entry?.targetFormulaEcho || "").trim()).filter(Boolean),
                            sourceToTargetFormulaEchoes: formulaPairs.map((entry) => String(entry?.sourceToTargetFormulaEcho || "").trim()).filter(Boolean),
                        });
                    });
                });
            });
        });
        const mismatches = rows
            .map((row) => {
                const missing = row.surfaces.filter((surface) => !row.pairSurfaces.includes(surface));
                const extra = row.pairSurfaces.filter((surface) => !row.surfaces.includes(surface));
                const repeatedSurfaces = row.pairSurfaces.filter((surface, index) => row.pairSurfaces.indexOf(surface) !== index);
                const repeatedFormulas = row.targetFormulaEchoes.length > 1
                    ? row.targetFormulaEchoes.filter((formula, index) => row.targetFormulaEchoes.indexOf(formula) !== index)
                    : [];
                const incompletePairCount = row.pairSurfaces.length !== row.targetFormulaEchoes.length
                    || row.pairSurfaces.length !== row.sourceToTargetFormulaEchoes.length;
                return {
                    label: row.label,
                    missing,
                    extra,
                    repeatedSurfaces,
                    repeatedFormulas,
                    incompletePairCount,
                    surfaceCount: row.surfaces.length,
                    pairCount: row.pairSurfaces.length,
                };
            })
            .filter((row) => row.missing.length
                || row.extra.length
                || row.repeatedSurfaces.length
                || row.repeatedFormulas.length
                || row.incompletePairCount
                || row.surfaceCount !== row.pairCount);
        return {
            rowCount: rows.length,
            surfaceCount: rows.reduce((sum, row) => sum + row.surfaces.length, 0),
            multiSurfaceRows: rows.filter((row) => row.surfaces.length > 1).length,
            samplePairs: rows
                .filter((row) => row.label === "maka|preterito|3sg|active")
                .flatMap((row) => row.pairSurfaces.map((surface, index) => `${surface}=>${row.targetFormulaEchoes[index]}`)),
            mismatches,
        };
    })();
    s.eq(
        "finite Andrews CNV generated Nawat outputs have one formula pair per surface across tenses and derivation modes",
        {
            samplePairs: finiteCnvSurfaceFormulaAudit.samplePairs,
            mismatches: finiteCnvSurfaceFormulaAudit.mismatches,
        },
        {
            samplePairs: [
                "kimak=>#Ø-Ø+ki-0(mak)Ø+0-0#",
                "kimakak=>#Ø-Ø+ki-0(maka)Ø+k-0#",
            ],
            mismatches: [],
        }
    );
    s.ok(
        "finite Andrews CNV surface/formula audit covers a broad generated set",
        finiteCnvSurfaceFormulaAudit.rowCount >= 700
            && finiteCnvSurfaceFormulaAudit.surfaceCount >= 1200
            && finiteCnvSurfaceFormulaAudit.multiSurfaceRows >= 250
    );
    s.eq(
        "CNV formula path keeps neki preterit stem variant as stem, not connector-stripped ne",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "neki",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "neki",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                        shallowWrongBase: bySlot.base?.surfaceValue === "ne",
                    };
                }),
            });
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
                summarize(buildProbe("", "t")),
            ];
        })(),
        [
            {
                surfaceForms: ["niknek", "niknekik"],
                formula: "#ni-Ø+k-0(neki)Ø+k-0#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "niknek", base: "nek", connector: "0-0", shallowWrongBase: false },
                    { surface: "niknekik", base: "neki", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tiknek", "tiknekik"],
                formula: "#ti-Ø+k-0(neki)Ø+k-0#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "tiknek", base: "nek", connector: "0-0", shallowWrongBase: false },
                    { surface: "tiknekik", base: "neki", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kinek", "kinekik"],
                formula: "#Ø-Ø+ki-0(neki)Ø+k-0#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "kinek", base: "nek", connector: "0-0", shallowWrongBase: false },
                    { surface: "kinekik", base: "neki", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tiknekket", "tiknekiket"],
                formula: "#ti-Ø+k-0(neki)Ø+k-et#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "tiknekket", base: "nek", connector: "k-et", shallowWrongBase: false },
                    { surface: "tiknekiket", base: "neki", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["ankinekket", "ankinekiket"],
                formula: "#an-Ø+ki-0(neki)Ø+k-et#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "ankinekket", base: "nek", connector: "k-et", shallowWrongBase: false },
                    { surface: "ankinekiket", base: "neki", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kinekket", "kinekiket"],
                formula: "#Ø-Ø+ki-0(neki)Ø+k-et#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "kinekket", base: "nek", connector: "k-et", shallowWrongBase: false },
                    { surface: "kinekiket", base: "neki", connector: "k-et", shallowWrongBase: false },
                ],
            },
        ]
    );
    s.eq(
        "CNV formula path and surface-producing path agree for Andrews-licensed ilpia perfective object contact",
        (() => {
            const buildProbe = (tiempo) => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo,
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco: "ilpia",
                            pers2: "",
                            num2: "",
                            tiempo,
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco: "ilpia",
                    pers2: "",
                    num2: "",
                    tiempo,
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (tiempo) => {
                const result = buildProbe(tiempo);
                const pathBySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    tiempo,
                    result: result.result,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    cnvPath: {
                        va1: pathBySlot.va1?.surfaceValue || "",
                        va2: pathBySlot.va2?.formulaMorph || "",
                        base: pathBySlot.base?.surfaceValue || "",
                        tns: pathBySlot.tns?.surfaceValue || pathBySlot.tns?.formulaMorph || "",
                        num1: pathBySlot.num1?.surfaceValue || pathBySlot.num1?.formulaMorph || "",
                        num2: pathBySlot.num2?.surfaceValue || pathBySlot.num2?.formulaMorph || "",
                    },
                    surfaceProducingPath: {
                        va1: bridgeBySlot.va1?.value || "",
                        va2: bridgeBySlot.va2?.value || "",
                        base: bridgeBySlot.base?.value || "",
                        tns: bridgeBySlot.tns?.value || "",
                        num1: bridgeBySlot.num1?.value || "",
                        num2: bridgeBySlot.num2?.value || "",
                    },
                };
            };
            return [
                summarize("preterito"),
                summarize("pasado-remoto"),
            ];
        })(),
        [
            {
                tiempo: "preterito",
                result: "kilpij",
                formula: "#Ø-Ø+k-0(ilpij)Ø+Ø-Ø#",
                cnvPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "Ø", num1: "Ø", num2: "Ø" },
                surfaceProducingPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "Ø", num1: "Ø", num2: "Ø" },
            },
            {
                tiempo: "pasado-remoto",
                result: "kilpijka",
                formula: "#Ø-Ø+k-0(ilpij)ka+Ø-Ø#",
                cnvPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "ka", num1: "Ø", num2: "Ø" },
                surfaceProducingPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "ka", num1: "Ø", num2: "Ø" },
            },
        ]
    );
    s.eq(
        "CNV formula path keeps i-final preterit zero/k connector alternates per output",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "",
                            tronco: "ijkali",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "ijkali",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                    };
                }),
            };
        })(),
        {
            surfaceForms: ["ijkal", "ijkalik"],
            formula: "#Ø-Ø(ijkali)Ø+k-0#",
            pathsBySurface: [
                { surface: "ijkal", base: "ijkal", connector: "0-0" },
                { surface: "ijkalik", base: "ijkali", connector: "k-0" },
            ],
        }
    );
    s.eq(
        "CNV formula path keeps transitive ijkali external slots out of the preterit base",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "ijkali",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "ijkali",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => {
                const bySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                return {
                    result: result.result,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    pers1: bySlot.pers1?.surfaceValue || "",
                    obj: bySlot.va1?.surfaceValue || "",
                    base: bySlot.base?.surfaceValue || "",
                    connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                    leakedBase: ["nikijkal", "tikijkal", "ankijkal", "ikijkal", "jkal"]
                        .includes(bySlot.base?.surfaceValue || ""),
                };
            };
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
                summarize(buildProbe("", "t")),
            ];
        })(),
        [
            {
                result: "nikijkal",
                formula: "#ni-Ø+k-0(ijkali)Ø+Ø-Ø#",
                pers1: "ni",
                obj: "k-0",
                base: "ijkal",
                connector: "0-0",
                leakedBase: false,
            },
            {
                result: "tikijkal",
                formula: "#ti-Ø+k-0(ijkali)Ø+Ø-Ø#",
                pers1: "ti",
                obj: "k-0",
                base: "ijkal",
                connector: "0-0",
                leakedBase: false,
            },
            {
                result: "kijkal",
                formula: "#Ø-Ø+k-0(ijkali)Ø+Ø-Ø#",
                pers1: "",
                obj: "k-0",
                base: "ijkal",
                connector: "0-0",
                leakedBase: false,
            },
            {
                result: "tikijkalket",
                formula: "#ti-Ø+k-0(ijkali)Ø+k-et#",
                pers1: "ti",
                obj: "k-0",
                base: "ijkal",
                connector: "k-et",
                leakedBase: false,
            },
            {
                result: "ankijkalket",
                formula: "#an-Ø+k-0(ijkali)Ø+k-et#",
                pers1: "an",
                obj: "k-0",
                base: "ijkal",
                connector: "k-et",
                leakedBase: false,
            },
            {
                result: "kijkalket",
                formula: "#Ø-Ø+k-0(ijkali)Ø+k-et#",
                pers1: "",
                obj: "k-0",
                base: "ijkal",
                connector: "k-et",
                leakedBase: false,
            },
        ]
    );
    s.eq(
        "CNV formula path keeps transitive ijkali external slots out of every Andrews-licensed perfective-family base",
        (() => {
            const tenses = ["preterito", "pasado-remoto"];
            const subjects = [["ni", ""], ["ti", ""], ["", ""], ["ti", "t"], ["an", "t"], ["", "t"]];
            const expectedTenseMorph = {
                preterito: "Ø",
                "pasado-remoto": "ka",
            };
            const issues = [];
            const formulas = [];
            const buildProbe = (tiempo, pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo,
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "ijkali",
                            pers2,
                            num2: pers2,
                            tiempo,
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "ijkali",
                    pers2,
                    num2: pers2,
                    tiempo,
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            tenses.forEach((tiempo) => subjects.forEach(([pers1, pers2]) => {
                const result = buildProbe(tiempo, pers1, pers2);
                const bySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const formula = result.nuclearClauseShell?.formulaEcho || "";
                formulas.push(formula);
                const tenseTarget = typeof expectedTenseMorph[tiempo] === "object"
                    ? expectedTenseMorph[tiempo][pers2 ? "plural" : "singular"]
                    : expectedTenseMorph[tiempo];
                const leakedBase = ["nikijkal", "tikijkal", "ankijkal", "ikijkal", "kijkal", "jkal"]
                    .includes(bySlot.base?.surfaceValue || "");
                if (!formula.includes("+k-0(ijkali)") || bySlot.va1?.surfaceValue !== "k-0") {
                    issues.push(["object", tiempo, pers1, pers2, formula, bySlot.va1?.surfaceValue || ""]);
                }
                if (bySlot.base?.surfaceValue !== "ijkal" || leakedBase) {
                    issues.push(["base", tiempo, pers1, pers2, bySlot.base?.surfaceValue || ""]);
                }
                if ((bySlot.tns?.surfaceValue || bySlot.tns?.formulaMorph || "") !== tenseTarget) {
                    issues.push(["tense", tiempo, pers1, pers2, bySlot.tns?.surfaceValue || bySlot.tns?.formulaMorph || ""]);
                }
            }));
            return {
                checked: tenses.length * subjects.length,
                uniqueFormulaCount: Array.from(new Set(formulas)).length,
                issues: issues.slice(0, 10),
                issueCount: issues.length,
            };
        })(),
        {
            checked: 12,
            uniqueFormulaCount: 12,
            issues: [],
            issueCount: 0,
        }
    );
    s.eq(
        "CNV formula path and surface-producing path stay slot-equal across representative active VNC outputs",
        (() => {
            const verbs = ["piya", "ilpia", "miki", "maka", "neki", "ajsi", "altia", "nemi", "kisa", "ilwia", "awiltia", "chiwa", "mati", "ijkali"];
            const objects = ["", "ki", "kin", "metzin", "mu", "ta"];
            const subjects = [["", ""], ["ni", ""], ["ti", ""], ["ti", "t"], ["an", "t"], ["", "t"]];
            const tenses = [
                "presente",
                "presente-habitual",
                "imperfecto",
                "futuro",
                "preterito",
                "pasado-remoto",
                "optativo",
            ];
            const bySlot = (paths = []) => Object.fromEntries(
                paths.map((entry) => [entry.formulaSlotKey || entry.surfaceSlot, entry])
            );
            const bridgeValueForPath = (path, slot, fallback = "") => {
                if (!path) {
                    return fallback || "";
                }
                if (slot === "base") {
                    return String(path.surfaceValue || path.formulaMorph || fallback || "");
                }
                if (slot === "tns") {
                    return String(path.formulaMorph || path.surfaceValue || fallback || "Ø");
                }
                if (slot === "num1" || slot === "num2") {
                    return String(path.surfaceValue || path.formulaMorph || fallback || "Ø");
                }
                if (slot === "va2" && !path.surfaceValue && String(path.formulaMorph || "") === "0") {
                    return "0";
                }
                return String(path.surfaceValue || path.formulaMorph || fallback || "");
            };
            const buildProbe = ({ tronco, obj1, pers1, pers2, tiempo }) => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo,
                        posicionesFormula: { pers1, obj1, tronco, pers2, num2: pers2, tiempo },
                    },
                },
                posicionesFormula: { pers1, obj1, tronco, pers2, num2: pers2, tiempo },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const issues = [];
            let generated = 0;
            verbs.forEach((tronco) => objects.forEach((obj1) => subjects.forEach(([pers1, pers2]) => tenses.forEach((tiempo) => {
                const result = buildProbe({ tronco, obj1, pers1, pers2, tiempo });
                if (!result || result.result === "—" || result.error || !Array.isArray(result.surfaceForms) || !result.surfaceForms.length) {
                    return;
                }
                generated += 1;
                const pathRecords = result.cnvFormulaSurfacePath?.pathsBySurface || [];
                const pathSurfaces = pathRecords.map((record) => record.surface);
                const bridgeRecords = result.slotNameBridge?.pathsBySurface || [];
                const bridgeSurfaces = bridgeRecords.map((record) => record.surface);
                if (JSON.stringify(pathSurfaces) !== JSON.stringify(result.surfaceForms)) {
                    issues.push(["surfaceForms-vs-path", tronco, obj1, pers1, pers2, tiempo, result.result]);
                }
                if (JSON.stringify(bridgeSurfaces) !== JSON.stringify(pathSurfaces)) {
                    issues.push(["path-vs-bridge", tronco, obj1, pers1, pers2, tiempo, result.result]);
                }
                pathRecords.forEach((record) => {
                    const bridge = bridgeRecords.find((entry) => entry.surface === record.surface);
                    const pathBySlot = bySlot(record.paths || []);
                    const bridgeBySlot = bySlot(bridge?.slots || []);
                    ["pers1", "pers2", "va", "va1", "va2", "base", "tns", "num1", "num2"].forEach((slot) => {
                        if (!pathBySlot[slot] && !bridgeBySlot[slot]) {
                            return;
                        }
                        const expected = bridgeValueForPath(pathBySlot[slot], slot, bridgeBySlot[slot]?.value || "");
                        const actual = String(bridgeBySlot[slot]?.value || "");
                        if (actual !== expected) {
                            issues.push(["slot", tronco, obj1, pers1, pers2, tiempo, record.surface, slot, expected, actual]);
                        }
                    });
                    (record.paths || []).forEach((entry) => {
                        if (entry.status === "formula-only") {
                            issues.push(["formula-only", tronco, obj1, pers1, pers2, tiempo, record.surface, entry.formulaSlotKey]);
                        }
                    });
                    const base = pathBySlot.base;
                    const hasSoundedExternalSurface = [
                        pathBySlot.pers1?.surfaceValue,
                        pathBySlot.va?.surfaceValue,
                        pathBySlot.va1?.surfaceValue,
                        pathBySlot.tns?.surfaceValue,
                        pathBySlot.num1?.surfaceValue,
                        pathBySlot.num2?.surfaceValue,
                    ].some((value) => {
                        const normalized = String(value || "");
                        return normalized && normalized !== "0" && normalized !== "Ø";
                    });
                    if (
                        base
                        && String(base.surfaceValue || "") === record.surface
                        && hasSoundedExternalSurface
                    ) {
                        issues.push(["whole-surface-base", tronco, obj1, pers1, pers2, tiempo, record.surface]);
                    }
                });
            }))));
            return { generated, issues: issues.slice(0, 10), issueCount: issues.length };
        })(),
        { generated: 3528, issues: [], issueCount: 0 }
    );
    s.eq(
        "CNV formula path strips copied valence residue from piya preterit base",
        (() => {
            const buildProbe = (obj1 = "", pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1,
                            tronco: "piya",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1,
                    tronco: "piya",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        va1: bySlot.va1?.surfaceValue || "",
                        va2: bySlot.va2?.surfaceValue || "",
                        base: bySlot.base?.surfaceValue || "",
                        copyRelations: bySlot.base?.surfaceCopyRelations || [],
                    };
                }),
            });
            return [
                summarize(buildProbe("kin")),
                summarize(buildProbe("metzin")),
                summarize(buildProbe("kin", "t")),
                summarize(buildProbe("metzin", "t")),
            ];
        })(),
        [
            {
                surfaceForms: ["kinpishki", "kinpiyak"],
                formula: "#Ø-Ø+k-in(piya)Ø+ki-0#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "kinpishki",
                        va1: "k-0",
                        va2: "in",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                    {
                        surface: "kinpiyak",
                        va1: "k-0",
                        va2: "in",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                ],
            },
            {
                surfaceForms: ["metzinpishki", "metzinpiyak"],
                formula: "#Ø-Ø+m-etz-in(piya)Ø+ki-0#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "metzinpishki",
                        va1: "m-in",
                        va2: "etz",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                    {
                        surface: "metzinpiyak",
                        va1: "m-in",
                        va2: "etz",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                ],
            },
            {
                surfaceForms: ["kinpishket", "kinpiyaket"],
                formula: "#Ø-Ø+k-in(piya)Ø+k-et#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "kinpishket",
                        va1: "k-0",
                        va2: "in",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                    {
                        surface: "kinpiyaket",
                        va1: "k-0",
                        va2: "in",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                ],
            },
            {
                surfaceForms: ["metzinpishket", "metzinpiyaket"],
                formula: "#Ø-Ø+m-etz-in(piya)Ø+k-et#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "metzinpishket",
                        va1: "m-in",
                        va2: "etz",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                    {
                        surface: "metzinpiyaket",
                        va1: "m-in",
                        va2: "etz",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                ],
            },
        ]
    );
    s.eq(
        "surface-producing path resolves Andrews future preterit number connector options",
        (() => {
            const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                pers1: "",
                obj1: "",
                tronco: "(miki)",
                pers2: "t",
                num2: "t",
                tiempo: "preterito",
            });
            const bySurfaceSlot = Object.fromEntries(
                bridge.slots.map((slot) => [slot.surfaceSlot, slot])
            );
            return {
                slots: bridge.surfaceProducingSlots,
                num1: {
                    value: bySurfaceSlot.num1?.value || "",
                    options: bySurfaceSlot.num1?.formulaOptions || [],
                    dyads: bySurfaceSlot.num1?.formulaDyadOptions || [],
                    andrews: bySurfaceSlot.num1?.andrewsConnectorPattern || "",
                    nawat: bySurfaceSlot.num1?.nawatConnectorPattern || "",
                },
                num2: {
                    value: bySurfaceSlot.num2?.value || "",
                    options: bySurfaceSlot.num2?.formulaOptions || [],
                    dyads: bySurfaceSlot.num2?.formulaDyadOptions || [],
                    andrews: bySurfaceSlot.num2?.andrewsConnectorPattern || "",
                    nawat: bySurfaceSlot.num2?.nawatConnectorPattern || "",
                },
            };
        })(),
        {
            slots: ["pers1", "pers2", "base", "tns", "num1", "num2"],
            num1: {
                value: "k",
                options: ["ki", "k", "0"],
                dyads: ["ki-0", "k-et", "0-et"],
                andrews: "c/qu/qui~0 + 0/eh",
                nawat: "k~ki~0 + 0/et",
            },
            num2: {
                value: "et",
                options: ["0", "et"],
                dyads: ["ki-0", "k-et", "0-et"],
                andrews: "c/qu/qui~0 + 0/eh",
                nawat: "k~ki~0 + 0/et",
            },
        }
    );
    s.eq(
        "surface-producing path resolves Andrews 6.4 object subslots with surface-scoped ki allomorphy",
        (() => {
            const summarize = (posicionesFormula) => {
                const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                    tronco: "piya",
                    pers2: "",
                    num2: "",
                    tiempo: "presente",
                    ...posicionesFormula,
                });
                const bySurfaceSlot = Object.fromEntries(
                    bridge.slots.map((slot) => [slot.surfaceSlot, slot])
                );
                return {
                    slots: bridge.surfaceProducingSlots,
                    va1: {
                        value: bySurfaceSlot.va1?.value || "",
                        features: bySurfaceSlot.va1?.formulaFeatures || null,
                        visibleLinearMorph: bySurfaceSlot.va1?.visibleLinearMorph || "",
                    },
                    va2: {
                        value: bySurfaceSlot.va2?.value || "",
                        features: bySurfaceSlot.va2?.formulaFeatures || null,
                        visibleLinearMorph: bySurfaceSlot.va2?.visibleLinearMorph || "",
                    },
                };
            };
            return {
                thirdSubjectKi: summarize({ pers1: "", obj1: "ki" }),
                firstSubjectKi: summarize({ pers1: "ni", obj1: "ki" }),
                secondSubjectKi: summarize({ pers1: "ti", obj1: "ki" }),
                explicitK: summarize({ pers1: "", obj1: "k" }),
                thirdPlural: summarize({ pers1: "", obj1: "kin" }),
                secondPluralObject: summarize({ pers1: "", obj1: "metzin" }),
            };
        })(),
        {
            thirdSubjectKi: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "ki-0", features: { person: "ki", objective: "0" }, visibleLinearMorph: "ki-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "ki-0" },
            },
            firstSubjectKi: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "k-0" },
            },
            secondSubjectKi: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "k-0" },
            },
            explicitK: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "k-0" },
            },
            thirdPlural: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-in" },
                va2: { value: "in", features: { number: "in" }, visibleLinearMorph: "k-in" },
            },
            secondPluralObject: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: {
                    value: "m-in",
                    features: { person: "m", number: "in" },
                    visibleLinearMorph: "m-etz-in",
                },
                va2: {
                    value: "etz",
                    features: { objective: "etz" },
                    visibleLinearMorph: "m-etz-in",
                },
            },
        }
    );
    s.eq(
        "surface-producing path resolves Andrews main indicative and optative connector options",
        (() => {
            const summarize = (tiempo, num2) => {
                const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                    pers1: "",
                    obj1: "",
                    tronco: "(miki)",
                    pers2: num2,
                    num2,
                    tiempo,
                });
                const bySurfaceSlot = Object.fromEntries(
                    bridge.slots.map((slot) => [slot.surfaceSlot, slot])
                );
                return {
                    tiempo,
                    num1: {
                        value: bySurfaceSlot.num1?.value || "",
                        options: bySurfaceSlot.num1?.formulaOptions || [],
                        dyads: bySurfaceSlot.num1?.formulaDyadOptions || [],
                        andrews: bySurfaceSlot.num1?.andrewsConnectorPattern || "",
                        nawat: bySurfaceSlot.num1?.nawatConnectorPattern || "",
                    },
                    num2: {
                        value: bySurfaceSlot.num2?.value || "",
                        options: bySurfaceSlot.num2?.formulaOptions || [],
                        dyads: bySurfaceSlot.num2?.formulaDyadOptions || [],
                        andrews: bySurfaceSlot.num2?.andrewsConnectorPattern || "",
                        nawat: bySurfaceSlot.num2?.nawatConnectorPattern || "",
                    },
                };
            };
            return [
                summarize("presente", "t"),
                summarize("presente-habitual", "t"),
                summarize("imperfecto", "t"),
                summarize("pasado-remoto", "t"),
                summarize("optativo", "t"),
            ];
        })(),
        [
            {
                tiempo: "presente",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "presente-habitual",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "imperfecto",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "pasado-remoto",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "optativo",
                num1: { value: "k", options: ["0", "k"], dyads: ["0-0", "k-an"], andrews: "0-0 / c-an", nawat: "0-0 / k-an" },
                num2: { value: "an", options: ["0", "an"], dyads: ["0-0", "k-an"], andrews: "0-0 / c-an", nawat: "0-0 / k-an" },
            },
        ]
    );
    const canonicalSurfaceResult = ctx.generateNuclearClauseSurface({
        silent: true,
        skipValidation: true,
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "(maka)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "presente",
        },
        override: {
            tenseMode: ctx.TENSE_MODE.verbo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
        },
    });
    s.eq(
        "generateNuclearClauseSurface accepts Andrews/Spanish posicionesFormula as the public slot API",
        {
            forms: canonicalSurfaceResult.surfaceForms,
            posicionesFormula: canonicalSurfaceResult.posicionesFormula,
        },
        {
            forms: ["nikmaka"],
            posicionesFormula: {
                pers1: "ni",
                obj1: "ki",
                tronco: "(maka)",
                pers2: "",
                num2: "",
                poseedor: "",
                obj2: "",
                obj3: "",
                reflexivo: "",
                tiempo: "presente",
            },
        }
    );
    s.eq(
        "nuclear clause surface helpers read canonical realization before split result strings",
        (() => {
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "nuclear-clause-surface-helper-formula",
                unit: "CNV",
                formula: "#ni-0+ki-0(maka)0+0-0#",
                formulaSlots: {
                    pers1Pers2: { prefix: "ni", suffix: "" },
                    obj1: { prefix: "ki", suffix: "" },
                    predicateStem: { stem: "maka" },
                },
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "nuclear-clause-surface-helper-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "pers1Pers2", formulaValue: "ni-0", surface: "ni" },
                    { slot: "obj1", formulaValue: "ki-0", surface: "ki" },
                    { slot: "predicateStem", formulaValue: "maka", surface: "maka" },
                ],
                surfaceForms: ["canonical-nikmaka"],
            });
            const result = {
                result: "result-lie-a / result-lie-b",
                surface: "surface-lie",
                surfaceForms: ["top-lie-a / top-lie-b"],
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: {
                        ...ctx.buildGrammarResultFrame({
                            ok: true,
                            formulaRecord,
                            formulaRealizationRecord,
                        }),
                        surface: "frame-lie",
                        surfaceForms: ["frame-lie-a / frame-lie-b"],
                        formulaRecord,
                        formulaRecords: [formulaRecord],
                        formulaRealizationRecord,
                        formulaRealizationRecords: [formulaRealizationRecord],
                    },
                }),
            };
            return {
                forms: ctx.normalizeGrammarFrameSurfaceForms(result),
                frameSurface: ctx.resolveNuclearClauseSurfaceResultFrameSurface(result),
                contractSurface: ctx.resolveNuclearClauseSurfaceContractSurface(result),
            };
        })(),
        {
            forms: ["canonical-nikmaka"],
            frameSurface: "canonical-nikmaka",
            contractSurface: "canonical-nikmaka",
        }
    );

    const boundOverride = ctx.applyBoundMarkerSlotOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki"
    );
    s.eq("bound override drops occupied obj1", boundOverride.obj1, "");
    s.eq("bound override drops occupied base obj1", boundOverride.baseObj1, "");
    const sparseBoundEntradaParsed = ctx.parseMovingTargetRegexInput("(a)+ta-(ish-kwi)");
    const sparseBoundEntradaGrammarObject = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+ta-(ish-kwi)",
        sparseBoundEntradaParsed
    );
    const fixedBoundEntradaGrammarObject = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+ta-(ish-kwi)",
        sparseBoundEntradaParsed,
        null,
        {
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "kwi" },
                obj1: { slot: "obj1", token: "ta" },
            },
            sourceFormulaEcho: "#Ø-ta(kwi)Ø#",
        }
    );
    const blockedBoundOverride = ctx.applyBoundMarkerSlotOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki",
        {
            entradaGrammarObject: sparseBoundEntradaGrammarObject,
        }
    );
    const fixedBoundOverride = ctx.applyBoundMarkerSlotOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki",
        {
            entradaGrammarObject: fixedBoundEntradaGrammarObject,
        }
    );
    s.eq(
        "bound marker object deletion is gated until entrada valence frame is fixed",
        {
            blockedStatus: blockedBoundOverride.valencyObjectSlotGate?.status || "",
            blockedObj1Preserved: blockedBoundOverride.obj1,
            blockedGenerationAllowed: blockedBoundOverride.generationAllowed,
            blockedValenceFixed: blockedBoundOverride.valencyObjectSlotGate?.valenceFrameFixed,
            fixedStatus: fixedBoundOverride.valencyObjectSlotGate?.status || "",
            fixedObj1: fixedBoundOverride.obj1,
            fixedGenerationAllowed: fixedBoundOverride.valencyObjectSlotGate?.generationAllowed,
            fixedValenceFixed: fixedBoundOverride.valencyObjectSlotGate?.valenceFrameFixed,
        },
        {
            blockedStatus: "blocked",
            blockedObj1Preserved: "ki",
            blockedGenerationAllowed: false,
            blockedValenceFixed: false,
            fixedStatus: "pass",
            fixedObj1: "",
            fixedGenerationAllowed: true,
            fixedValenceFixed: true,
        }
    );
    const unresolvedRouteFrameMutationGate = ctx.buildGenerationValencyObjectSlotMutationGate({
        operation: "test-route-frame-object-slot-mutation",
        mutationKind: "delete-object-slot",
        sourceObj1: "ki",
        sourceBaseObj1: "ki",
        targetObj1: "",
        targetBaseObj1: "",
        options: {
            sourceRouteFrame: {
                kind: "andrews-incorporation-route-frame",
                remainingExternalObjectSlots: [
                    { slotId: "obj1", prefix: "ki" },
                ],
            },
        },
    });
    const fixedRouteFrameMutationGate = ctx.buildGenerationValencyObjectSlotMutationGate({
        operation: "test-route-frame-object-slot-mutation",
        mutationKind: "delete-object-slot",
        sourceObj1: "ki",
        sourceBaseObj1: "ki",
        targetObj1: "",
        targetBaseObj1: "",
        options: {
            sourceRouteFrame: {
                kind: "andrews-incorporation-route-frame",
                remainingExternalObjectSlots: [
                    { slotId: "obj1", prefix: "ki" },
                ],
                objectSlotOwnership: {
                    matrixValenceFrameFixed: true,
                },
            },
        },
    });
    s.eq(
        "valency object-slot mutation gate reads route-frame valence ownership before deleting slots",
        {
            unresolvedStatus: unresolvedRouteFrameMutationGate.status,
            unresolvedReason: unresolvedRouteFrameMutationGate.reason,
            unresolvedRequiresFixedFrame: unresolvedRouteFrameMutationGate.requiresFixedValenceFrame,
            unresolvedFrameSignal: unresolvedRouteFrameMutationGate.frameHasValenceObjectSignal,
            unresolvedValenceFixed: unresolvedRouteFrameMutationGate.valenceFrameFixed,
            fixedStatus: fixedRouteFrameMutationGate.status,
            fixedReason: fixedRouteFrameMutationGate.reason,
            fixedRequiresFixedFrame: fixedRouteFrameMutationGate.requiresFixedValenceFrame,
            fixedFrameSignal: fixedRouteFrameMutationGate.frameHasValenceObjectSignal,
            fixedValenceFixed: fixedRouteFrameMutationGate.valenceFrameFixed,
        },
        {
            unresolvedStatus: "blocked",
            unresolvedReason: "generation-valency-source-frame-unfixed",
            unresolvedRequiresFixedFrame: true,
            unresolvedFrameSignal: true,
            unresolvedValenceFixed: false,
            fixedStatus: "pass",
            fixedReason: "generation-valency-object-slot-mutation-licensed",
            fixedRequiresFixedFrame: true,
            fixedFrameSignal: true,
            fixedValenceFixed: true,
        }
    );
    const preParsedBoundMaka = {
        ...ctx.parseVerbInput("maka"),
        sourceRawVerb: "maka",
        hasBoundMarker: true,
        boundPrefixes: ["ki"],
        derivationValencyDelta: 0,
        derivationType: "",
    };
    const boundGenerationBlocked = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: preParsedBoundMaka,
                entradaGrammarObject: sparseBoundEntradaGrammarObject,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "maka",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "maka",
        },
    });
    s.eq(
        "generation hard-gates bound-marker object deletion when entrada valence is unresolved",
        {
            error: boundGenerationBlocked.error === true,
            diagnosticId: boundGenerationBlocked.diagnostics?.[0]?.id || "",
            routeStage: boundGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            gateStatus: boundGenerationBlocked.valencyObjectSlotGate?.status || "",
            generationAllowed: boundGenerationBlocked.valencyObjectSlotGate?.generationAllowed,
            routeRankingAllowed: boundGenerationBlocked.valencyObjectSlotGate?.routeRankingAllowed,
        },
        {
            error: true,
            diagnosticId: "generation-valency-object-slot-frame-unfixed",
            routeStage: "generation-valency-object-slot-gate",
            gateStatus: "blocked",
            generationAllowed: false,
            routeRankingAllowed: false,
        }
    );
    const impersonalTaPrefixSpec = {
        matrixStem: "kwi",
        matrixRuleBase: "kwi",
        adjacentEmbed: "",
        transitivity: ctx.COMPOSER_TRANSITIVITY.intransitive,
        valenceTokens: ["ta"],
        valenceEmbeds: [],
        directionalPrefix: "",
        supportiveMarker: "",
        tiCausativeClass: "",
        isYawi: false,
        isWeya: false,
    };
    const impersonalTaPrefixParsedVerb = ctx.buildVerbMetaFromCanonicalSpec(
        impersonalTaPrefixSpec,
        "ta-kwi",
        null,
        null
    );
    const sparseImpersonalTaPrefixEntrada = ctx.buildEntradaGrammarObjectFromCanonicalVerbSpec(
        impersonalTaPrefixSpec,
        { rawInput: "ta-kwi" }
    );
    const fixedImpersonalTaPrefixEntrada = ctx.buildEntradaGrammarObjectFromCanonicalVerbSpec(
        impersonalTaPrefixSpec,
        {
            rawInput: "ta-kwi",
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "kwi" },
            },
            sourceFormulaEcho: "#Ø-Ø(kwi)Ø#",
        }
    );
    const impersonalTaPrefixGenerationBlocked = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: impersonalTaPrefixParsedVerb,
                entradaGrammarObject: sparseImpersonalTaPrefixEntrada,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "ta-kwi",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "ta-kwi",
        },
    });
    const impersonalTaPrefixGenerationFixed = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: impersonalTaPrefixParsedVerb,
                entradaGrammarObject: fixedImpersonalTaPrefixEntrada,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "ta-kwi",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "ta-kwi",
        },
    });
    s.eq(
        "generation hard-gates impersonal ta-prefix object clearing when entrada valence is unresolved",
        {
            parsedHasImpersonalTaPrefix: impersonalTaPrefixParsedVerb.hasImpersonalTaPrefix === true,
            sparseValenceFrameFixed: sparseImpersonalTaPrefixEntrada.valenceFrame?.frameFixed === true,
            fixedValenceFrameFixed: fixedImpersonalTaPrefixEntrada.valenceFrame?.frameFixed === true,
            blockedError: impersonalTaPrefixGenerationBlocked.error === true,
            blockedDiagnosticId: impersonalTaPrefixGenerationBlocked.diagnostics?.[0]?.id || "",
            blockedRouteStage: impersonalTaPrefixGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            blockedGateStatus: impersonalTaPrefixGenerationBlocked.valencyObjectSlotGate?.status || "",
            blockedGateOperation: impersonalTaPrefixGenerationBlocked.valencyObjectSlotGate?.operation || "",
            blockedMutationKind: impersonalTaPrefixGenerationBlocked.valencyObjectSlotGate?.mutationKind || "",
            blockedSourceObj1: impersonalTaPrefixGenerationBlocked.valencyObjectSlotGate?.sourceVector?.obj1 || "",
            blockedSourceObj2: impersonalTaPrefixGenerationBlocked.valencyObjectSlotGate?.sourceVector?.obj2 || "",
            blockedTargetObj1: impersonalTaPrefixGenerationBlocked.valencyObjectSlotGate?.targetVector?.obj1 || "",
            blockedTargetObj2: impersonalTaPrefixGenerationBlocked.valencyObjectSlotGate?.targetVector?.obj2 || "",
            fixedOk: impersonalTaPrefixGenerationFixed.ok,
            fixedResult: impersonalTaPrefixGenerationFixed.result,
        },
        {
            parsedHasImpersonalTaPrefix: true,
            sparseValenceFrameFixed: false,
            fixedValenceFrameFixed: true,
            blockedError: true,
            blockedDiagnosticId: "generation-valency-object-slot-frame-unfixed",
            blockedRouteStage: "generation-valency-object-slot-gate",
            blockedGateStatus: "blocked",
            blockedGateOperation: "apply-impersonal-ta-prefix-slot-clearing",
            blockedMutationKind: "delete-object-slots",
            blockedSourceObj1: "ki",
            blockedSourceObj2: "ta",
            blockedTargetObj1: "",
            blockedTargetObj2: "",
            fixedOk: true,
            fixedResult: "nitakwi",
        }
    );
    const troncoNajWrapperEntradaParsed = ctx.parseMovingTargetRegexInput("(a)+ta-(ish-kwi)");
    const sparseTroncoNajWrapperEntrada = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+ta-(ish-kwi)",
        troncoNajWrapperEntradaParsed
    );
    const fixedTroncoNajWrapperEntrada = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+ta-(ish-kwi)",
        troncoNajWrapperEntradaParsed,
        null,
        {
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "kwi" },
                obj1: { slot: "obj1", token: "ta" },
            },
            sourceFormulaEcho: "#Ø-ta(kwi)Ø#",
        }
    );
    const buildTroncoNajWrapperRequest = (entradaGrammarObject) => ({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.adjetivo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
                entradaGrammarObject,
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ta",
            tronco: "-(mati)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "adjetivo-perfecto-naj",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const troncoNajWrapperGenerationBlocked = ctx.executeGenerateWordRequest(
        buildTroncoNajWrapperRequest(sparseTroncoNajWrapperEntrada)
    );
    const troncoNajWrapperGenerationFixed = ctx.executeGenerateWordRequest(
        buildTroncoNajWrapperRequest(fixedTroncoNajWrapperEntrada)
    );
    s.eq(
        "generation hard-gates tronco -naj active wrapper object clearing when entrada valence is unresolved",
        {
            sparseValenceFrameFixed: sparseTroncoNajWrapperEntrada.valenceFrame?.frameFixed === true,
            fixedValenceFrameFixed: fixedTroncoNajWrapperEntrada.valenceFrame?.frameFixed === true,
            blockedError: troncoNajWrapperGenerationBlocked.error === true,
            blockedDiagnosticId: troncoNajWrapperGenerationBlocked.diagnostics?.[0]?.id || "",
            blockedRouteStage: troncoNajWrapperGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            blockedGateStatus: troncoNajWrapperGenerationBlocked.valencyObjectSlotGate?.status || "",
            blockedGateOperation: troncoNajWrapperGenerationBlocked.valencyObjectSlotGate?.operation || "",
            blockedMutationKind: troncoNajWrapperGenerationBlocked.valencyObjectSlotGate?.mutationKind || "",
            blockedSourceObj1: troncoNajWrapperGenerationBlocked.valencyObjectSlotGate?.sourceVector?.obj1 || "",
            blockedTargetObj1: troncoNajWrapperGenerationBlocked.valencyObjectSlotGate?.targetVector?.obj1 || "",
            blockedRouteRankingAllowed: troncoNajWrapperGenerationBlocked.valencyObjectSlotGate?.routeRankingAllowed,
            fixedDiagnosticId: troncoNajWrapperGenerationFixed.diagnostics?.[0]?.id || "",
            fixedRouteStage: troncoNajWrapperGenerationFixed.diagnostics?.[0]?.routeStage || "",
        },
        {
            sparseValenceFrameFixed: false,
            fixedValenceFrameFixed: true,
            blockedError: true,
            blockedDiagnosticId: "generation-valency-object-slot-frame-unfixed",
            blockedRouteStage: "generation-valency-object-slot-gate",
            blockedGateStatus: "blocked",
            blockedGateOperation: "apply-tronco-naj-active-wrapper-slot-clearing",
            blockedMutationKind: "delete-object-slots",
            blockedSourceObj1: "ta",
            blockedTargetObj1: "",
            blockedRouteRankingAllowed: false,
            fixedDiagnosticId: "nuclear-clause-surface-active-adjective-transitive-blocked",
            fixedRouteStage: "adjective-active-valency-gate",
        }
    );

    const passiveAdjustments = ctx.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        pers1: "",
        pers2: "",
        obj1: "ki",
        obj2: "ta",
        obj3: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObj1: "ki",
        hasPromotableObject: true,
    });
    s.eq("passive valency adjusts clears obj1", passiveAdjustments.obj1, "");
    s.eq("passive valency adjusts clears obj2", passiveAdjustments.obj2, "");
    s.ok("passive valency adjusts preserves subject for promoted passive", passiveAdjustments.preserveSubjectForPassive);
    const passiveAdjustmentsBlocked = ctx.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        pers1: "",
        pers2: "",
        obj1: "ki",
        obj2: "ta",
        obj3: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObj1: "ki",
        hasPromotableObject: true,
        entradaGrammarObject: sparseBoundEntradaGrammarObject,
    });
    const passiveAdjustmentsFixed = ctx.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        pers1: "",
        pers2: "",
        obj1: "ki",
        obj2: "ta",
        obj3: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObj1: "ki",
        hasPromotableObject: true,
        entradaGrammarObject: fixedBoundEntradaGrammarObject,
    });
    s.eq(
        "passive impersonal object clearing is gated until entrada valence frame is fixed",
        {
            blockedStatus: passiveAdjustmentsBlocked.valencyObjectSlotGate?.status || "",
            blockedObj1Preserved: passiveAdjustmentsBlocked.obj1,
            blockedObj2Preserved: passiveAdjustmentsBlocked.obj2,
            blockedGenerationAllowed: passiveAdjustmentsBlocked.generationAllowed,
            fixedStatus: passiveAdjustmentsFixed.valencyObjectSlotGate?.status || "",
            fixedObj1: passiveAdjustmentsFixed.obj1,
            fixedObj2: passiveAdjustmentsFixed.obj2,
            fixedGenerationAllowed: passiveAdjustmentsFixed.valencyObjectSlotGate?.generationAllowed,
        },
        {
            blockedStatus: "blocked",
            blockedObj1Preserved: "ki",
            blockedObj2Preserved: "ta",
            blockedGenerationAllowed: false,
            fixedStatus: "pass",
            fixedObj1: "",
            fixedObj2: "",
            fixedGenerationAllowed: true,
        }
    );
    const passiveGenerationBlocked = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: {
                    ...ctx.parseVerbInput("maka"),
                    sourceRawVerb: "maka",
                },
                entradaGrammarObject: sparseBoundEntradaGrammarObject,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.passive,
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ki",
            tronco: "maka",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "maka",
        },
    });
    s.eq(
        "generation hard-gates passive impersonal object clearing when entrada valence is unresolved",
        {
            error: passiveGenerationBlocked.error === true,
            diagnosticId: passiveGenerationBlocked.diagnostics?.[0]?.id || "",
            routeStage: passiveGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            gateStatus: passiveGenerationBlocked.valencyObjectSlotGate?.status || "",
            mutationKind: passiveGenerationBlocked.valencyObjectSlotGate?.mutationKind || "",
            generationAllowed: passiveGenerationBlocked.valencyObjectSlotGate?.generationAllowed,
            routeRankingAllowed: passiveGenerationBlocked.valencyObjectSlotGate?.routeRankingAllowed,
        },
        {
            error: true,
            diagnosticId: "generation-valency-object-slot-frame-unfixed",
            routeStage: "generation-valency-object-slot-gate",
            gateStatus: "blocked",
            mutationKind: "delete-object-slots",
            generationAllowed: false,
            routeRankingAllowed: false,
        }
    );
    const lesson21Passive = ctx.buildLesson21PassiveVoicePursuitFrame();
    s.eq(
        "Lesson 21 passive pursuit frame keeps Andrews passive separate from current combined route",
        {
            stepNumber: lesson21Passive.stepNumber,
            aimStatus: lesson21Passive.aimStatus,
            pdfRefs: lesson21Passive.pdfRefs,
            categories: lesson21Passive.subsectionInventory.map((entry) => entry.category),
            requiresSpecificObject: lesson21Passive.transformationFrame.requiresSpecificObjectPronoun,
            sourceIntransitiveAllowed: lesson21Passive.transformationFrame.sourceIntransitiveAllowed,
            sourceNonspecificObjectAllowed: lesson21Passive.transformationFrame.sourceNonspecificObjectAllowed,
            caseIds: lesson21Passive.generationCases.map((entry) => entry.id),
            combinedRouteGap: lesson21Passive.currentEngineBoundary.combinedPassiveImpersonalLabelStillVisible,
            nonspecificGateMissing: lesson21Passive.currentEngineBoundary.nonspecificObjectPassiveGateMissing,
            closestPass: lesson21Passive.closestPass,
            remainingGapCount: lesson21Passive.remainingGaps.length,
        },
        {
            stepNumber: 21,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 21.1",
                "Andrews Lesson 21.2",
                "Andrews Lesson 21.3",
                "Andrews Lesson 21.4",
            ],
            categories: [
                "passive-transformation",
                "passive-generation-cases",
                "passive-sentence-moods",
                "active-reflexive-passive-notion",
            ],
            requiresSpecificObject: true,
            sourceIntransitiveAllowed: false,
            sourceNonspecificObjectAllowed: false,
            caseIds: [
                "single-specific-projective-object",
                "single-specific-reflexive-object",
                "projective-plus-reflexive-object",
                "two-specific-projective-objects",
                "one-specific-one-nonspecific-projective-object",
                "three-object-pronouns",
            ],
            combinedRouteGap: true,
            nonspecificGateMissing: true,
            closestPass: false,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 21 passive pursuit frame exposes non-enumerable LCM audit metadata",
        {
            hasFrame: Boolean(lesson21Passive.grammarFrame),
            routeFamily: lesson21Passive.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson21Passive.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson21Passive.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson21Passive.ok,
            targetVoice: lesson21Passive.grammarFrame?.nuclearClauseFrame?.targetVoice || "",
            sourceSubject: lesson21Passive.grammarFrame?.participantFrame?.sourceSubject || "",
            nonspecificRedirect: lesson21Passive.grammarFrame?.participantFrame?.nonspecificObjectRedirect || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson21Passive, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "generation-valency",
            routeStage: "audit-lesson-21",
            generationAllowed: false,
            ok: true,
            targetVoice: "passive",
            sourceSubject: "deleted",
            nonspecificRedirect: "Andrews Lesson 22",
            enumerableGrammarFrame: false,
        }
    );
    s.eq(
        "Lesson 21 passive subject override maps a specific object into subject slots",
        ctx.getPassiveSubjectOverride("nech"),
        { pers1: "ni", pers2: "" }
    );
    const lesson22Impersonal = ctx.buildLesson22ImpersonalVoicePursuitFrame();
    s.eq(
        "Lesson 22 impersonal pursuit frame keeps Andrews impersonal separate from passive",
        {
            stepNumber: lesson22Impersonal.stepNumber,
            aimStatus: lesson22Impersonal.aimStatus,
            pdfRefs: lesson22Impersonal.pdfRefs,
            categories: lesson22Impersonal.subsectionInventory.map((entry) => entry.category),
            inherentSubjectReferent: lesson22Impersonal.inherentImpersonalFrame.subjectReferent,
            inherentSubjectSupplementable: lesson22Impersonal.inherentImpersonalFrame.subjectSupplementable,
            nonanimateSupplementable: /can be supplemented/.test(lesson22Impersonal.nonanimateDistinctionFrame.nonanimateSubjectReferent),
            intransitiveAllowed: lesson22Impersonal.impersonalTransformationFrame.activeSourceMayBeIntransitive,
            transitiveAllowed: lesson22Impersonal.impersonalTransformationFrame.activeSourceMayBeTransitive,
            transitiveRestriction: lesson22Impersonal.impersonalTransformationFrame.transitiveRestriction,
            formulaPolicy: lesson22Impersonal.impersonalGenerationFrame.formulaPolicy,
            objectBridge: lesson22Impersonal.impersonalGenerationFrame.nawatNonspecificObjectBridge.map((entry) => [entry.andrews, entry.nawat]),
            taPrefix: lesson22Impersonal.taImpersonalFrame.derivationalPrefix,
            taNotObject: lesson22Impersonal.taImpersonalFrame.notObjectPronoun,
            combinedRouteGap: lesson22Impersonal.currentEngineBoundary.combinedPassiveImpersonalLabelStillVisible,
            specificGateMissing: lesson22Impersonal.currentEngineBoundary.specificProjectiveObjectImpersonalGateMissing,
            closestPass: lesson22Impersonal.closestPass,
            remainingGapCount: lesson22Impersonal.remainingGaps.length,
        },
        {
            stepNumber: 22,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 22.1",
                "Andrews Lesson 22.2",
                "Andrews Lesson 22.3",
                "Andrews Lesson 22.4",
                "Andrews Lesson 22.5",
                "Andrews Lesson 22.6",
            ],
            categories: [
                "inherent-impersonal-vnc",
                "nonanimate-impersonal-distinction",
                "impersonal-voice-transform",
                "impersonal-generation-rules",
                "impersonal-sentence-moods",
                "ta-impersonal-derivation",
            ],
            inherentSubjectReferent: "none",
            inherentSubjectSupplementable: false,
            nonanimateSupplementable: true,
            intransitiveAllowed: true,
            transitiveAllowed: true,
            transitiveRestriction: "source must not contain a specific projective object",
            formulaPolicy: "use the same VNC formula as the active source",
            objectBridge: [["te", "te"], ["tla", "ta"]],
            taPrefix: { andrews: "tla", nawat: "ta" },
            taNotObject: true,
            combinedRouteGap: true,
            specificGateMissing: true,
            closestPass: false,
            remainingGapCount: 5,
        }
    );
    s.eq(
        "Lesson 22 impersonal pursuit frame exposes non-enumerable LCM audit metadata",
        {
            hasFrame: Boolean(lesson22Impersonal.grammarFrame),
            routeFamily: lesson22Impersonal.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson22Impersonal.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson22Impersonal.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson22Impersonal.ok,
            targetVoice: lesson22Impersonal.grammarFrame?.nuclearClauseFrame?.targetVoice || "",
            subjectReferent: lesson22Impersonal.grammarFrame?.participantFrame?.subjectReferent || "",
            subjectSupplementable: lesson22Impersonal.grammarFrame?.participantFrame?.subjectSupplementable,
            derivationalPrefix: lesson22Impersonal.grammarFrame?.orthographyFrame?.derivationalPrefixBridge || null,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson22Impersonal, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "generation-valency",
            routeStage: "audit-lesson-22",
            generationAllowed: false,
            ok: true,
            targetVoice: "impersonal",
            subjectReferent: "none",
            subjectSupplementable: false,
            derivationalPrefix: { andrews: "tla", nawat: "ta" },
            enumerableGrammarFrame: false,
        }
    );

    const resetNominalSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears nominal pers1", resetNominalSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears nominal pers2", resetNominalSubject.pers2, "");
    const resetPresentAgentivoSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo-presente", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears present-agentive pers1", resetPresentAgentivoSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears present-agentive pers2", resetPresentAgentivoSubject.pers2, "");
    const resetPreteritAgentivoSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo-preterito", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears preterit-agentive pers1", resetPreteritAgentivoSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears preterit-agentive pers2", resetPreteritAgentivoSubject.pers2, "");
    const resetFutureAgentivoSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo-futuro", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears future-agentive pers1", resetFutureAgentivoSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears future-agentive pers2", resetFutureAgentivoSubject.pers2, "");

    let clearedTarget = "";
    const reflexiveSwitch = ctx.applyReflexivoAutoSwitch({
        pers1: "ni",
        pers2: "",
        obj1: "nech",
        isPassiveImpersonal: false,
        clearError: (id) => {
            clearedTarget = id;
        },
    });
    s.eq("reflexive auto switch rewrites same-person obj1 to mu", reflexiveSwitch.obj1, "mu");
    s.ok("reflexive auto switch marks reflexive", reflexiveSwitch.isReflexive);
    s.eq("reflexive auto switch clears object-prefix error", clearedTarget, "object-prefix");
    let blockedReflexiveClearedTarget = "";
    const blockedReflexiveSwitch = ctx.applyReflexivoAutoSwitch({
        pers1: "ni",
        pers2: "",
        obj1: "nech",
        isPassiveImpersonal: false,
        entradaGrammarObject: sparseBoundEntradaGrammarObject,
        clearError: (id) => {
            blockedReflexiveClearedTarget = id;
        },
    });
    const fixedReflexiveSwitch = ctx.applyReflexivoAutoSwitch({
        pers1: "ni",
        pers2: "",
        obj1: "nech",
        isPassiveImpersonal: false,
        entradaGrammarObject: fixedBoundEntradaGrammarObject,
    });
    s.eq(
        "reflexive auto switch is gated until entrada valence frame is fixed",
        {
            blockedStatus: blockedReflexiveSwitch.valencyObjectSlotGate?.status || "",
            blockedObj1Preserved: blockedReflexiveSwitch.obj1,
            blockedIsReflexive: blockedReflexiveSwitch.isReflexive,
            blockedGenerationAllowed: blockedReflexiveSwitch.generationAllowed,
            blockedClearedTarget: blockedReflexiveClearedTarget,
            fixedStatus: fixedReflexiveSwitch.valencyObjectSlotGate?.status || "",
            fixedObj1: fixedReflexiveSwitch.obj1,
            fixedIsReflexive: fixedReflexiveSwitch.isReflexive,
            fixedGenerationAllowed: fixedReflexiveSwitch.valencyObjectSlotGate?.generationAllowed,
        },
        {
            blockedStatus: "blocked",
            blockedObj1Preserved: "nech",
            blockedIsReflexive: false,
            blockedGenerationAllowed: false,
            blockedClearedTarget: "",
            fixedStatus: "pass",
            fixedObj1: "mu",
            fixedIsReflexive: true,
            fixedGenerationAllowed: true,
        }
    );
    const reflexiveGenerationBlocked = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: {
                    ...ctx.parseVerbInput("maka"),
                    sourceRawVerb: "maka",
                },
                entradaGrammarObject: sparseBoundEntradaGrammarObject,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "nech",
            tronco: "maka",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "maka",
        },
    });
    s.eq(
        "generation hard-gates reflexive object reclassification when entrada valence is unresolved",
        {
            error: reflexiveGenerationBlocked.error === true,
            diagnosticId: reflexiveGenerationBlocked.diagnostics?.[0]?.id || "",
            routeStage: reflexiveGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            gateStatus: reflexiveGenerationBlocked.valencyObjectSlotGate?.status || "",
            mutationKind: reflexiveGenerationBlocked.valencyObjectSlotGate?.mutationKind || "",
            generationAllowed: reflexiveGenerationBlocked.valencyObjectSlotGate?.generationAllowed,
            routeRankingAllowed: reflexiveGenerationBlocked.valencyObjectSlotGate?.routeRankingAllowed,
        },
        {
            error: true,
            diagnosticId: "generation-valency-object-slot-frame-unfixed",
            routeStage: "generation-valency-object-slot-gate",
            gateStatus: "blocked",
            mutationKind: "reclassify-object-slot-reflexive",
            generationAllowed: false,
            routeRankingAllowed: false,
        }
    );

    const executeEngineResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(nemi)",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const executeEngineSlotInputResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(nemi)",
            pers2: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "executeGenerateWordRequest reads Andrews/Spanish posicionesFormula as the slot input",
        {
            result: executeEngineSlotInputResult.result,
            posicionesFormula: executeEngineSlotInputResult.posicionesFormula,
            framePosicionesFormula: executeEngineSlotInputResult.grammarFrame?.participantFrame?.posicionesFormula || null,
            slotNameBridge: {
                surfaceProducingSlotCount: executeEngineSlotInputResult.slotNameBridge?.surfaceProducingSlotCount,
                cnvFormulaSlotCount: executeEngineSlotInputResult.grammarFrame?.participantFrame?.slotNameBridge?.cnvFormulaSlotCount,
                surfaceProducingSlots: executeEngineSlotInputResult.slotNameBridge?.surfaceProducingSlots,
            },
        },
        {
            result: "nemi",
            posicionesFormula: {
                pers1: "",
                obj1: "",
                tronco: "(nemi)",
                pers2: "",
                num2: "",
                poseedor: "",
                obj2: "",
                obj3: "",
                reflexivo: "",
                tiempo: "presente",
            },
            framePosicionesFormula: {
                pers1: "",
                obj1: "",
                tronco: "(nemi)",
                pers2: "",
                num2: "",
                poseedor: "",
                obj2: "",
                obj3: "",
                reflexivo: "",
                tiempo: "presente",
            },
            slotNameBridge: {
                surfaceProducingSlotCount: 6,
                cnvFormulaSlotCount: 6,
                surfaceProducingSlots: ["pers1", "pers2", "base", "tns", "num1", "num2"],
            },
        }
    );
    s.ok("executeGenerateWordRequest returns a surfaceForms array", Array.isArray(executeEngineResult.surfaceForms));
    s.ok(
        "executeGenerateWordRequest computes present nemi output without DOM access",
        executeEngineResult.result.includes("nemi")
    );
    s.eq(
        "executeGenerateWordRequest exposes diagnostic VNC clause shell",
        {
            kind: executeEngineResult.nuclearClauseShell?.kind,
            clauseKind: executeEngineResult.nuclearClauseShell?.clauseKind,
            formulaType: executeEngineResult.nuclearClauseShell?.formulaType,
            formulaAbbreviation: executeEngineResult.nuclearClauseShell?.formulaAbbreviation,
            formulaLabel: executeEngineResult.nuclearClauseShell?.formulaLabel,
            displayLabel: executeEngineResult.nuclearClauseShell?.displayLabel,
            hasTensePosition: executeEngineResult.nuclearClauseShell?.hasTensePosition,
            generationAllowed: executeEngineResult.nuclearClauseShell?.generationAllowed,
            predicateStem: executeEngineResult.nuclearClauseShell?.slots?.predicateStem?.stem,
            tenseValue: executeEngineResult.nuclearClauseShell?.slots?.tensePosition?.tenseValue,
            formulaEcho: executeEngineResult.nuclearClauseShell?.formulaEcho,
            formulaSlotKeys: Object.keys(executeEngineResult.nuclearClauseShell?.formulaSlots || {}),
            valencyKind: executeEngineResult.vncValencyFrame?.kind,
            valency: executeEngineResult.vncValencyFrame?.valency,
            pers1Pers2Slot: executeEngineResult.vncValencyFrame?.pers1Pers2?.slot,
            obj1Slot: executeEngineResult.vncValencyFrame?.obj1?.slot,
            obj2Slot: executeEngineResult.vncValencyFrame?.obj2?.slot,
            obj3Slot: executeEngineResult.vncValencyFrame?.obj3?.slot,
            obj1Display: executeEngineResult.vncValencyFrame?.obj1?.displayPrefix,
        },
        {
            kind: "nuclear-clause-shell",
            clauseKind: "verbal-nuclear-clause",
            formulaType: "VNC",
            formulaAbbreviation: "CNV",
            formulaLabel: "Fórmula CNV",
            displayLabel: "cláusula nuclear verbal (CNV)",
            hasTensePosition: true,
            generationAllowed: false,
            predicateStem: "nemi",
            tenseValue: "presente",
            formulaEcho: "#Ø-Ø(nemi)Ø+Ø-Ø#",
            formulaSlotKeys: ["pers1Pers2", "obj1", "obj2", "obj3", "reflexivo", "predicateStem", "tensePosition", "num1Num2"],
            valencyKind: "vnc-valency-frame",
            valency: "intransitive",
            pers1Pers2Slot: "pers1-pers2",
            obj1Slot: "obj1",
            obj2Slot: "obj2",
            obj3Slot: "obj3",
            obj1Display: "Ø",
        }
    );
    {
        const buildFormulaProbe = (
            tiempo,
            derivationMode = ctx.DERIVATION_MODE.active,
            { pers1 = "", pers2 = "t", derivationType = ctx.DERIVATION_TYPE.direct } = {}
        ) => ctx.executeGenerateWordRequest({
            options: {
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: ctx.TENSE_MODE.verbo,
                    derivationMode,
                    derivationType,
                    voiceMode: derivationMode === ctx.DERIVATION_MODE.nonactive ? ctx.VOICE_MODE.passive : ctx.VOICE_MODE.active,
                    tiempo,
                    posicionesFormula: {
                        pers1,
                        obj1: "",
                        tronco: "miki",
                        pers2,
                        num2: pers2,
                        tiempo,
                    },
                },
            },
            posicionesFormula: {
                pers1,
                obj1: "",
                tronco: "miki",
                pers2,
                num2: pers2,
                tiempo,
            },
            entradaTronco: {
                tieneControlTronco: false,
                valorTronco: "",
            },
        });
        const activePreterit = buildFormulaProbe("preterito");
        const activePreteritFirstPlural = buildFormulaProbe("preterito", ctx.DERIVATION_MODE.active, {
            pers1: "ti",
            pers2: "t",
        });
        const nonactivePreterit = buildFormulaProbe("preterito", ctx.DERIVATION_MODE.nonactive);
        s.eq(
            "VNC formula echo keeps perfective/nonactive stems inside predicate and subject/number outside it",
            {
                activeSurface: activePreterit.result,
                activeFormula: activePreterit.nuclearClauseShell?.formulaEcho,
                activePredicate: activePreterit.nuclearClauseShell?.slots?.predicateStem?.stem,
                activeConnector: activePreterit.nuclearClauseShell?.slots?.num1Num2?.displayConnector,
                activeFirstPluralSurface: activePreteritFirstPlural.result,
                activeFirstPluralFormula: activePreteritFirstPlural.nuclearClauseShell?.formulaEcho,
                activeFirstPluralPredicate: activePreteritFirstPlural.nuclearClauseShell?.slots?.predicateStem?.stem,
                activeFirstPluralSubject: activePreteritFirstPlural.nuclearClauseShell?.slots?.pers1Pers2?.displayPrefix,
                activeFirstPluralConnector: activePreteritFirstPlural.nuclearClauseShell?.slots?.num1Num2?.displayConnector,
                nonactiveSurface: nonactivePreterit.result,
                nonactiveFormula: nonactivePreterit.nuclearClauseShell?.formulaEcho,
                nonactivePredicate: nonactivePreterit.nuclearClauseShell?.slots?.predicateStem?.stem,
                nonactiveConnector: nonactivePreterit.nuclearClauseShell?.slots?.num1Num2?.displayConnector,
            },
            {
                activeSurface: "mikiket",
                activeFormula: "#Ø-Ø(miki)Ø+k-et#",
                activePredicate: "miki",
                activeConnector: "k-et",
                activeFirstPluralSurface: "timikiket",
                activeFirstPluralFormula: "#ti-Ø(miki)Ø+k-et#",
                activeFirstPluralPredicate: "miki",
                activeFirstPluralSubject: "ti",
                activeFirstPluralConnector: "k-et",
                nonactiveSurface: "mikiwak / mikuwak",
                nonactiveFormula: "#Ø-Ø(mikiwa)Ø+k-et#",
                nonactivePredicate: "mikiwa",
                nonactiveConnector: "k-et",
            }
        );
        const formulaSummary = (result) => {
            const connectorOptions = result.nuclearClauseShell?.formulaSlots?.num1Num2?.connectorOptions || [];
            const num1Options = result.nuclearClauseShell?.formulaSlots?.num1Num2?.num1Options || [];
            const num2Options = result.nuclearClauseShell?.formulaSlots?.num1Num2?.num2Options || [];
            const pathNum1 = result.cnvFormulaSurfacePath?.paths
                ?.find((path) => path.formulaSlotKey === "num1") || {};
            const pathNum2 = result.cnvFormulaSurfacePath?.paths
                ?.find((path) => path.formulaSlotKey === "num2") || {};
            const summary = {
                routeFamily: result.grammarFrame?.routeContract?.routeFamily,
                clauseKind: result.nuclearClauseShell?.clauseKind,
                formulaType: result.nuclearClauseShell?.formulaType,
                category: result.nuclearClauseShell?.formulaAbbreviation,
                tenseSlot: result.nuclearClauseShell?.formulaSlots?.tensePosition?.slot,
                numSlot: result.nuclearClauseShell?.formulaSlots?.num1Num2?.slot,
                connectorOwner: result.nuclearClauseShell?.formulaSlots?.num1Num2?.belongsTo,
                connectorNotTense: result.nuclearClauseShell?.formulaSlots?.num1Num2?.notTense,
                formula: result.nuclearClauseShell?.formulaEcho,
                tenseLabel: result.nuclearClauseShell?.formulaSlots?.tensePosition?.label,
                compatibilityLabel: result.nuclearClauseShell?.formulaSlots?.tensePosition?.compatibilityLabel,
                morph: result.nuclearClauseShell?.formulaSlots?.tensePosition?.displayMorph,
                mood: result.nuclearClauseShell?.formulaSlots?.tensePosition?.mood,
                andrewsTense: result.nuclearClauseShell?.formulaSlots?.tensePosition?.andrewsTense,
                connector: result.nuclearClauseShell?.formulaSlots?.num1Num2?.displayConnector,
                num1: result.nuclearClauseShell?.formulaSlots?.num1Num2?.num1,
                num2: result.nuclearClauseShell?.formulaSlots?.num1Num2?.num2,
            };
            if (connectorOptions.length) {
                summary.connectorOptions = connectorOptions;
                summary.num1Options = num1Options;
                summary.num2Options = num2Options;
                summary.pathNum1Options = pathNum1.formulaOptions || [];
                summary.pathNum2Options = pathNum2.formulaOptions || [];
                summary.pathDyadOptions = pathNum1.formulaDyadOptions || [];
            }
            return summary;
        };
        const vncFormulaAuthorityBase = {
            routeFamily: "vnc",
            clauseKind: "verbal-nuclear-clause",
            formulaType: "VNC",
            category: "CNV",
            tenseSlot: "tns",
            numSlot: "num1-num2",
            connectorOwner: "subject",
            connectorNotTense: true,
        };
        const mainIndicativeOptions = {
            connectorOptions: ["0-0", "0-t"],
            num1Options: ["0"],
            num2Options: ["0", "t"],
            pathNum1Options: ["0"],
            pathNum2Options: ["0", "t"],
            pathDyadOptions: ["0-0", "0-t"],
        };
        const futurePreteritOptions = {
            connectorOptions: ["ki-0", "k-et", "0-et"],
            num1Options: ["ki", "k", "0"],
            num2Options: ["0", "et"],
            pathNum1Options: ["ki", "k", "0"],
            pathNum2Options: ["0", "et"],
            pathDyadOptions: ["ki-0", "k-et", "0-et"],
        };
        const optativeOptions = {
            connectorOptions: ["0-0", "k-an"],
            num1Options: ["0", "k"],
            num2Options: ["0", "an"],
            pathNum1Options: ["0", "k"],
            pathNum2Options: ["0", "an"],
            pathDyadOptions: ["0-0", "k-an"],
        };
        s.eq(
            "Lesson 5 CNV formula compares each implemented tense against Andrews tense morphs and number dyads",
            [
                ["presente sg", formulaSummary(buildFormulaProbe("presente", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "" }))],
                ["presente pl", formulaSummary(buildFormulaProbe("presente", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["presente habitual pl", formulaSummary(buildFormulaProbe("presente-habitual", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["imperfecto pl", formulaSummary(buildFormulaProbe("imperfecto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["futuro pl", formulaSummary(buildFormulaProbe("futuro", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["preterito pl", formulaSummary(buildFormulaProbe("preterito", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["pasado remoto pl", formulaSummary(buildFormulaProbe("pasado-remoto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["optativo no pasado 1pl", formulaSummary(buildFormulaProbe("optativo", ctx.DERIVATION_MODE.active, { pers1: "ti", pers2: "t" }))],
                ["optativo no pasado 2pl", formulaSummary(buildFormulaProbe("optativo", ctx.DERIVATION_MODE.active, { pers1: "an", pers2: "t" }))],
                ["optativo no pasado 3pl", formulaSummary(buildFormulaProbe("optativo", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
            ],
            [
                ["presente sg", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+Ø-Ø#", tenseLabel: "indicativo presente", compatibilityLabel: "presente", morph: "Ø", mood: "indicative", andrewsTense: "present", connector: "Ø-Ø", num1: "", num2: "" }],
                ["presente pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+Ø-t#", tenseLabel: "indicativo presente", compatibilityLabel: "presente", morph: "Ø", mood: "indicative", andrewsTense: "present", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["presente habitual pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)ni+Ø-t#", tenseLabel: "indicativo presente habitual", compatibilityLabel: "presente-habitual", morph: "ni", mood: "indicative", andrewsTense: "customary-present", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["imperfecto pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)ya+Ø-t#", tenseLabel: "indicativo imperfecto", compatibilityLabel: "imperfecto", morph: "ya", mood: "indicative", andrewsTense: "imperfect", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["futuro pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)s+k-et#", tenseLabel: "indicativo futuro", compatibilityLabel: "futuro", morph: "s", mood: "indicative", andrewsTense: "future", connector: "k-et", num1: "k", num2: "et", ...futurePreteritOptions }],
                ["preterito pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+k-et#", tenseLabel: "indicativo pretérito", compatibilityLabel: "preterito", morph: "Ø", mood: "indicative", andrewsTense: "preterit", connector: "k-et", num1: "k", num2: "et", ...futurePreteritOptions }],
                ["pasado remoto pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)ka+Ø-t#", tenseLabel: "indicativo pasado remoto", compatibilityLabel: "pasado-remoto", morph: "ka", mood: "indicative", andrewsTense: "distant-past", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["optativo no pasado 1pl", { ...vncFormulaAuthorityBase, formula: "#ti-Ø(miki)Ø+k-an#", tenseLabel: "optativo no pasado", compatibilityLabel: "optativo", morph: "Ø", mood: "optative", andrewsTense: "nonpast", connector: "k-an", num1: "k", num2: "an", ...optativeOptions }],
                ["optativo no pasado 2pl", { ...vncFormulaAuthorityBase, formula: "#shi-Ø(miki)Ø+k-an#", tenseLabel: "optativo no pasado", compatibilityLabel: "optativo", morph: "Ø", mood: "optative", andrewsTense: "nonpast", connector: "k-an", num1: "k", num2: "an", ...optativeOptions }],
                ["optativo no pasado 3pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+k-an#", tenseLabel: "optativo no pasado", compatibilityLabel: "optativo", morph: "Ø", mood: "optative", andrewsTense: "nonpast", connector: "k-an", num1: "k", num2: "an", ...optativeOptions }],
            ]
        );
        const blockedExtensionSummary = (tiempo, derivationMode = ctx.DERIVATION_MODE.active, derivationType = ctx.DERIVATION_TYPE.direct) => {
            const result = buildFormulaProbe(tiempo, derivationMode, {
                pers1: "",
                pers2: "t",
                derivationType,
            });
            return {
                tiempo,
                derivationMode,
                derivationType,
                result: result.result,
                surfaceForms: result.surfaceForms || [],
                generationAllowed: result.grammarFrame?.routeContract?.generationAllowed,
                routeStage: result.grammarFrame?.routeContract?.routeStage || "",
                authority: result.andrewsCnvTenseLogicAuthorityFrame?.scope || "",
                gate: result.andrewsCnvTenseLogicGenerationGate?.generationGate || "",
                formulaEcho: result.nuclearClauseShell?.formulaEcho || "",
                diagnostic: result.diagnostics?.[0]?.id || "",
            };
        };
        s.eq(
            "CNV generation blocks Nawat/Pipil extension tenses across derivation settings before output",
            [
                blockedExtensionSummary("presente-desiderativo"),
                blockedExtensionSummary("condicional", ctx.DERIVATION_MODE.active, ctx.DERIVATION_TYPE.causative),
                blockedExtensionSummary("perfecto", ctx.DERIVATION_MODE.active, ctx.DERIVATION_TYPE.applicative),
                blockedExtensionSummary("pluscuamperfecto", ctx.DERIVATION_MODE.nonactive),
                blockedExtensionSummary("condicional-perfecto", ctx.DERIVATION_MODE.nonactive, ctx.DERIVATION_TYPE.causative),
            ],
            [
                {
                    tiempo: "presente-desiderativo",
                    derivationMode: ctx.DERIVATION_MODE.active,
                    derivationType: ctx.DERIVATION_TYPE.direct,
                    result: "—",
                    surfaceForms: [],
                    generationAllowed: false,
                    routeStage: "andrews-cnv-tense-logic-gate",
                    authority: "nawat-extension",
                    gate: "not-andrews-grammar-gate",
                    formulaEcho: "",
                    diagnostic: "not-andrews-grammar-gate",
                },
                {
                    tiempo: "condicional",
                    derivationMode: ctx.DERIVATION_MODE.active,
                    derivationType: ctx.DERIVATION_TYPE.causative,
                    result: "—",
                    surfaceForms: [],
                    generationAllowed: false,
                    routeStage: "andrews-cnv-tense-logic-gate",
                    authority: "nawat-extension",
                    gate: "not-andrews-grammar-gate",
                    formulaEcho: "",
                    diagnostic: "not-andrews-grammar-gate",
                },
                {
                    tiempo: "perfecto",
                    derivationMode: ctx.DERIVATION_MODE.active,
                    derivationType: ctx.DERIVATION_TYPE.applicative,
                    result: "—",
                    surfaceForms: [],
                    generationAllowed: false,
                    routeStage: "andrews-cnv-tense-logic-gate",
                    authority: "nawat-extension",
                    gate: "not-andrews-grammar-gate",
                    formulaEcho: "",
                    diagnostic: "not-andrews-grammar-gate",
                },
                {
                    tiempo: "pluscuamperfecto",
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
                    derivationType: ctx.DERIVATION_TYPE.direct,
                    result: "—",
                    surfaceForms: [],
                    generationAllowed: false,
                    routeStage: "andrews-cnv-tense-logic-gate",
                    authority: "nawat-extension",
                    gate: "not-andrews-grammar-gate",
                    formulaEcho: "",
                    diagnostic: "not-andrews-grammar-gate",
                },
                {
                    tiempo: "condicional-perfecto",
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
                    derivationType: ctx.DERIVATION_TYPE.causative,
                    result: "—",
                    surfaceForms: [],
                    generationAllowed: false,
                    routeStage: "andrews-cnv-tense-logic-gate",
                    authority: "nawat-extension",
                    gate: "not-andrews-grammar-gate",
                    formulaEcho: "",
                    diagnostic: "not-andrews-grammar-gate",
                },
            ]
        );
        const optativeConnectorProbe = (subjectPrefix, numberConnector) => {
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "vnc",
                subject: {
                    prefix: subjectPrefix,
                    suffix: "",
                    numberConnector,
                },
                predicate: { stem: "miki" },
                tenseValue: "optativo",
                tenseLabel: "optativo",
            });
            return {
                inputConnector: numberConnector,
                formula: shell.formulaEcho,
                connector: shell.formulaSlots?.num1Num2?.displayConnector,
                num1: shell.formulaSlots?.num1Num2?.num1,
                num2: shell.formulaSlots?.num1Num2?.num2,
                tenseMorph: shell.formulaSlots?.tensePosition?.displayMorph,
                mood: shell.formulaSlots?.tensePosition?.mood,
            };
        };
        s.eq(
            "Andrews formula authority rewrites plural optative number probes to k-an",
            [
                optativeConnectorProbe("ti", "t"),
                optativeConnectorProbe("shi", "Ø-t"),
                optativeConnectorProbe("", "k-et"),
                optativeConnectorProbe("", "k-an"),
                optativeConnectorProbe("ti", "Ø-Ø"),
            ],
            [
                { inputConnector: "t", formula: "#ti-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "Ø-t", formula: "#shi-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "k-et", formula: "#Ø-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "k-an", formula: "#Ø-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "Ø-Ø", formula: "#ti-Ø(miki)Ø+Ø-Ø#", connector: "Ø-Ø", num1: "", num2: "", tenseMorph: "Ø", mood: "optative" },
            ]
        );
        const buildObjectFormulaProbe = (obj1, tronco = "miki", pers1 = "", pers2 = "t") => ctx.executeGenerateWordRequest({
            options: {
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: ctx.TENSE_MODE.verbo,
                    derivationMode: ctx.DERIVATION_MODE.active,
                    voiceMode: ctx.VOICE_MODE.active,
                    tiempo: "presente",
                    posicionesFormula: {
                        pers1,
                        obj1,
                        tronco,
                        pers2,
                        num2: pers2,
                        tiempo: "presente",
                    },
                },
            },
            posicionesFormula: {
                pers1,
                obj1,
                tronco,
                pers2,
                num2: pers2,
                tiempo: "presente",
            },
            entradaTronco: {
                tieneControlTronco: false,
                valorTronco: "",
            },
        });
        const objectFormulaSummary = (obj1) => {
            const result = buildObjectFormulaProbe(obj1);
            return {
                inputObject: obj1,
                formulaKind: result.nuclearClauseShell?.formula,
                predicatePositionStatus: result.nuclearClauseShell?.predicatePositionStatus,
                formula: result.nuclearClauseShell?.formulaEcho,
                obj1: result.nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix,
                reflexive: result.nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix,
                connector: result.nuclearClauseShell?.formulaSlots?.num1Num2?.displayConnector,
                valencePosition: result.vncValencyFrame?.lesson6ValencePosition || "",
                visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
            };
        };
        const objectGoverningSummary = (obj1, tronco = "miki") => {
            const result = buildObjectFormulaProbe(obj1, tronco);
            const objectFrame = result.nuclearClauseShell?.formulaSlots?.obj1?.lesson6DirectNawatDyad || null;
            const reflexiveFrame = result.nuclearClauseShell?.formulaSlots?.reflexivo?.lesson6DirectNawatDyad || null;
            const frame = objectFrame || reflexiveFrame || {};
            const governingFrame = frame.governingFrame || {};
            return {
                inputObject: obj1,
                tronco,
                formula: result.nuclearClauseShell?.formulaEcho,
                formulaKind: result.nuclearClauseShell?.formula,
                visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                governingPath: frame.governingPath || governingFrame.governingPath || "",
                governingSlotId: frame.governingSlotId || governingFrame.governingSlotId || "",
                sourceSections: frame.sourceSections || governingFrame.sourceSections || [],
                valencePosition: governingFrame.valencePosition || "",
                predicatePositionStatus: governingFrame.predicatePositionStatus || "",
                va: governingFrame.va?.morph || frame.va || "",
                va1: governingFrame.va1?.morph || frame.va1 || "",
                va2: governingFrame.va2?.morph || frame.va2 || "",
                classicalMorph: governingFrame.classicalMorph || "",
                classicalDyad: governingFrame.classicalDyad || "",
                nawatDyad: governingFrame.nawatDyad || "",
                stemCondition: governingFrame.stemCondition || "",
            };
        };
        const reflexiveStemFormulaSummary = (tronco) => {
            const result = buildObjectFormulaProbe("mu", tronco);
            return {
                tronco,
                formula: result.nuclearClauseShell?.formulaEcho,
                reflexive: result.nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix,
                visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
            };
        };
        s.eq(
            "Lesson 6 formula follows realized ki/k object slot for piya",
            (() => {
                const firstPerson = buildObjectFormulaProbe("ki", "piya", "ni", "");
                const thirdPerson = buildObjectFormulaProbe("ki", "piya", "", "");
                const summarize = (result) => ({
                    surface: result.surface,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    formulaObj: result.nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix,
                    visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    pathObject: (() => {
                        const pathBySlot = Object.fromEntries(
                            (result.cnvFormulaSurfacePath?.paths || [])
                                .map((entry) => [entry.formulaSlotKey, entry])
                        );
                        const framePathBySlot = Object.fromEntries(
                            (result.grammarFrame?.morphBoundaryFrame?.cnvFormulaSurfacePath?.paths || [])
                                .map((entry) => [entry.formulaSlotKey, entry])
                        );
                        return {
                            va1: {
                                formulaMorph: pathBySlot.va1?.formulaMorph || "",
                                expectedSurfaceMorph: pathBySlot.va1?.expectedSurfaceMorph || "",
                                surfaceValue: pathBySlot.va1?.surfaceValue || "",
                                status: pathBySlot.va1?.status || "",
                                grammarFrameFormulaMorph: framePathBySlot.va1?.formulaMorph || "",
                                grammarFrameSurfaceValue: framePathBySlot.va1?.surfaceValue || "",
                            },
                            va2: {
                                formulaMorph: pathBySlot.va2?.formulaMorph || "",
                                expectedSurfaceMorph: pathBySlot.va2?.expectedSurfaceMorph || "",
                                surfaceValue: pathBySlot.va2?.surfaceValue || "",
                                status: pathBySlot.va2?.status || "",
                                grammarFrameFormulaMorph: framePathBySlot.va2?.formulaMorph || "",
                                grammarFrameSurfaceValue: framePathBySlot.va2?.surfaceValue || "",
                            },
                        };
                    })(),
                    frames: (result.grammarFrame?.orthographyFrame?.soundSpellingFrames || [])
                        .filter((frame) => frame.ruleId === "obj1-ki-after-ni-ti-k")
                        .map((frame) => ({
                            ruleId: frame.ruleId,
                            slot: frame.grammarSlot,
                            source: frame.sourceSurface,
                            target: frame.target,
                            sourceSegment: frame.sourceSegmentValue,
                            targetSegment: frame.targetSegmentValue,
                        })),
                });
                return [summarize(firstPerson), summarize(thirdPerson)];
            })(),
            [
                {
                    surface: "nikpiya",
                    formula: "#ni-Ø+k-0(piya)Ø+Ø-Ø#",
                    formulaObj: "k-0",
                    visibleFormulaObject: "k-0",
                    pathObject: {
                        va1: {
                            formulaMorph: "k-0",
                            expectedSurfaceMorph: "k",
                            surfaceValue: "k-0",
                            status: "matched",
                            grammarFrameFormulaMorph: "k-0",
                            grammarFrameSurfaceValue: "k-0",
                        },
                        va2: {
                            formulaMorph: "0",
                            expectedSurfaceMorph: "",
                            surfaceValue: "",
                            status: "matched-zero",
                            grammarFrameFormulaMorph: "0",
                            grammarFrameSurfaceValue: "",
                        },
                    },
                    frames: [{
                        ruleId: "obj1-ki-after-ni-ti-k",
                        slot: "obj1",
                        source: "ki",
                        target: "k",
                        sourceSegment: "ki",
                        targetSegment: "k",
                    }],
                },
                {
                    surface: "kipiya",
                    formula: "#Ø-Ø+ki-0(piya)Ø+Ø-Ø#",
                    formulaObj: "ki-0",
                    visibleFormulaObject: "ki-0",
                    pathObject: {
                        va1: {
                            formulaMorph: "ki-0",
                            expectedSurfaceMorph: "ki",
                            surfaceValue: "ki-0",
                            status: "matched",
                            grammarFrameFormulaMorph: "ki-0",
                            grammarFrameSurfaceValue: "ki-0",
                        },
                        va2: {
                            formulaMorph: "0",
                            expectedSurfaceMorph: "",
                            surfaceValue: "",
                            status: "matched-zero",
                            grammarFrameFormulaMorph: "0",
                            grammarFrameSurfaceValue: "",
                        },
                    },
                    frames: [],
                },
            ]
        );
        s.eq(
            "Lesson 6 formula authority separates direct Nawat dyads monadic objects and reflexive mu",
            [
                objectFormulaSummary("nech"),
                objectFormulaSummary("tech"),
                objectFormulaSummary("metz"),
                objectFormulaSummary("metzin"),
                objectFormulaSummary("ki"),
                objectFormulaSummary("k"),
                objectFormulaSummary("kin"),
                objectFormulaSummary("ne"),
                objectFormulaSummary("ta"),
                objectFormulaSummary("te"),
                objectFormulaSummary("mu"),
            ],
            [
                {
                    inputObject: "nech",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+n-ech(miki)Ø+Ø-t#",
                    obj1: "n-ech",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "n-ech",
                },
                {
                    inputObject: "tech",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+t-ech(miki)Ø+Ø-t#",
                    obj1: "t-ech",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "t-ech",
                },
                {
                    inputObject: "metz",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+m-etz(miki)Ø+Ø-t#",
                    obj1: "m-etz",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "m-etz",
                },
                {
                    inputObject: "metzin",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+m-etz-in(miki)Ø+Ø-t#",
                    obj1: "m-etz-in",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "m-etz-in",
                },
                {
                    inputObject: "ki",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+ki-0(miki)Ø+Ø-t#",
                    obj1: "ki-0",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "ki-0",
                },
                {
                    inputObject: "k",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+k-0(miki)Ø+Ø-t#",
                    obj1: "k-0",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "k-0",
                },
                {
                    inputObject: "kin",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+k-in(miki)Ø+Ø-t#",
                    obj1: "k-in",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "k-in",
                },
                {
                    inputObject: "ne",
                    formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    predicatePositionStatus: "monadic",
                    formula: "#Ø-Ø+ne(miki)Ø+Ø-t#",
                    obj1: "ne",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va",
                    visibleFormulaObject: "ne",
                },
                {
                    inputObject: "ta",
                    formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    predicatePositionStatus: "monadic",
                    formula: "#Ø-Ø+ta(miki)Ø+Ø-t#",
                    obj1: "ta",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va",
                    visibleFormulaObject: "ta",
                },
                {
                    inputObject: "te",
                    formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    predicatePositionStatus: "monadic",
                    formula: "#Ø-Ø+te(miki)Ø+Ø-t#",
                    obj1: "te",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va",
                    visibleFormulaObject: "te",
                },
                {
                    inputObject: "mu",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+m-u(miki)Ø+Ø-t#",
                    obj1: "Ø",
                    reflexive: "m-u",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "m-u",
                },
            ]
        );
        s.eq(
            "Lesson 6 direct Nawat dyad split requires typed source and operation frames",
            (() => {
                const sourceFrame = ctx.buildLesson6DirectNawatDyadSourceFrame({
                    directDyad: "m-etz-in",
                    sourcePrefix: "metzin",
                    surfaceScopedPrefix: "metzin",
                    stem: "miki",
                });
                const operationFrame = ctx.buildLesson6DirectNawatDyadOperationFrame(sourceFrame);
                const otherSourceFrame = ctx.buildLesson6DirectNawatDyadSourceFrame({
                    directDyad: "k-0",
                    sourcePrefix: "k",
                    surfaceScopedPrefix: "k",
                    stem: "miki",
                });
                const oldSplit = ctx.splitLesson6DirectNawatDyad;
                ctx.splitLesson6DirectNawatDyad = () => ({ va1: "poison", va2: "poison" });
                const generated = ctx.getLesson6DirectNawatObjectDyadFrame("metzin", { stem: "miki" });
                ctx.splitLesson6DirectNawatDyad = oldSplit;
                const summarize = (frame) => ({
                    va1: frame.va1 || "",
                    va2: frame.va2 || "",
                    functionalVa1: frame.functionalVa1 || "",
                    functionalVa2: frame.functionalVa2 || "",
                    val1Features: frame.val1Features || null,
                    val2Features: frame.val2Features || null,
                    linearPieces: frame.linearPieces || null,
                    diagnosticId: frame.diagnosticId || "",
                });
                return {
                    helperTypes: [
                        typeof ctx.buildLesson6DirectNawatDyadSourceFrame,
                        typeof ctx.buildLesson6DirectNawatDyadOperationFrame,
                        typeof ctx.getLesson6DirectNawatDyadFrameMismatch,
                    ],
                    sourceFrameKind: sourceFrame?.kind || "",
                    operationId: operationFrame?.operationId || "",
                    directStringOnly: summarize(ctx.splitLesson6DirectNawatDyad("m-etz-in")),
                    authorized: summarize(ctx.splitLesson6DirectNawatDyad("m-etz-in", {
                        sourceFrame,
                        operationFrame,
                    })),
                    changedString: summarize(ctx.splitLesson6DirectNawatDyad("poison-poison", {
                        sourceFrame,
                        operationFrame,
                    })),
                    missingOperation: summarize(ctx.splitLesson6DirectNawatDyad("m-etz-in", {
                        sourceFrame,
                    })),
                    contradictorySource: summarize(ctx.splitLesson6DirectNawatDyad("m-etz-in", {
                        sourceFrame: otherSourceFrame,
                        operationFrame,
                    })),
                    contradictoryTarget: summarize(ctx.splitLesson6DirectNawatDyad("m-etz-in", {
                        sourceFrame,
                        operationFrame: {
                            ...operationFrame,
                            targetDyadFrame: {
                                ...operationFrame.targetDyadFrame,
                                va1: "poison",
                            },
                        },
                    })),
                    generated: {
                        visibleFormulaPrefix: generated?.visibleFormulaPrefix || "",
                        va1: generated?.va1 || "",
                        va2: generated?.va2 || "",
                        operationId: generated?.operationFrame?.operationId || "",
                        sourceFrameKind: generated?.sourceFrame?.kind || "",
                    },
                };
            })(),
            {
                helperTypes: ["function", "function", "function"],
                sourceFrameKind: "lesson-6-direct-nawat-dyad-source-frame",
                operationId: "andrews-6-direct-nawat-dyad-split",
                directStringOnly: {
                    va1: "",
                    va2: "",
                    functionalVa1: "",
                    functionalVa2: "",
                    val1Features: null,
                    val2Features: null,
                    linearPieces: null,
                    diagnosticId: "lesson-6-direct-dyad-source-frame-required",
                },
                authorized: {
                    va1: "m",
                    va2: "etz-in",
                    functionalVa1: "m-in",
                    functionalVa2: "etz",
                    val1Features: { person: "m", number: "in" },
                    val2Features: { objective: "etz" },
                    linearPieces: ["m", "etz", "in"],
                    diagnosticId: "",
                },
                changedString: {
                    va1: "m",
                    va2: "etz-in",
                    functionalVa1: "m-in",
                    functionalVa2: "etz",
                    val1Features: { person: "m", number: "in" },
                    val2Features: { objective: "etz" },
                    linearPieces: ["m", "etz", "in"],
                    diagnosticId: "",
                },
                missingOperation: {
                    va1: "",
                    va2: "",
                    functionalVa1: "",
                    functionalVa2: "",
                    val1Features: null,
                    val2Features: null,
                    linearPieces: null,
                    diagnosticId: "lesson-6-direct-dyad-operation-frame-required",
                },
                contradictorySource: {
                    va1: "",
                    va2: "",
                    functionalVa1: "",
                    functionalVa2: "",
                    val1Features: null,
                    val2Features: null,
                    linearPieces: null,
                    diagnosticId: "lesson-6-direct-dyad-contradictory-source-frame",
                },
                contradictoryTarget: {
                    va1: "",
                    va2: "",
                    functionalVa1: "",
                    functionalVa2: "",
                    val1Features: null,
                    val2Features: null,
                    linearPieces: null,
                    diagnosticId: "lesson-6-direct-dyad-contradictory-target-frame",
                },
                generated: {
                    visibleFormulaPrefix: "m-etz-in",
                    va1: "m",
                    va2: "etz-in",
                    operationId: "andrews-6-direct-nawat-dyad-split",
                    sourceFrameKind: "lesson-6-direct-nawat-dyad-source-frame",
                },
            }
        );
        s.eq(
            "Generated class perfective formula profile consumes typed frames instead of reverse-matching surfaces",
            (() => {
                const sourceFrame = ctx.buildGeneratedClassPerfectiveFormulaSourceFrame({
                    tense: "preterito",
                    subjectPrefix: "ni",
                    objectPrefix: "ki",
                    sourceSubjectSuffix: "",
                    sourceStem: "piya",
                });
                const operationFrame = ctx.buildGeneratedClassPerfectiveFormulaOperationFrame(sourceFrame);
                const otherSourceFrame = ctx.buildGeneratedClassPerfectiveFormulaSourceFrame({
                    tense: "preterito",
                    subjectPrefix: "",
                    objectPrefix: "ta",
                    sourceSubjectSuffix: "",
                    sourceStem: "mati",
                });
                const oldSurfaceCore = ctx.getGeneratedClassPerfectiveSurfaceCore;
                ctx.getGeneratedClassPerfectiveSurfaceCore = () => "poison";
                const poisoned = ctx.buildGeneratedClassPerfectiveFormulaProfile({
                    tense: "preterito",
                    surfaceForms: ["poison"],
                    subjectPrefix: "poison",
                    objectPrefix: "poison",
                    sourceStem: "poison",
                    sourceFrame,
                    operationFrame,
                });
                ctx.getGeneratedClassPerfectiveSurfaceCore = oldSurfaceCore;
                const summarize = (profile) => profile ? {
                    base: profile.base || "",
                    objectPrefix: profile.objectPrefix || "",
                    formulaObject: profile.formulaObject || "",
                    objectSurface: profile.objectSurface || "",
                    operationId: profile.operationFrame?.operationId || "",
                    sourceFrameKind: profile.sourceFrame?.kind || "",
                } : null;
                return {
                    helperTypes: [
                        typeof ctx.buildGeneratedClassPerfectiveFormulaSourceFrame,
                        typeof ctx.buildGeneratedClassPerfectiveFormulaOperationFrame,
                        typeof ctx.getGeneratedClassPerfectiveFormulaFrameMismatch,
                    ],
                    sourceFrameKind: sourceFrame?.kind || "",
                    operationId: operationFrame?.operationId || "",
                    authorized: summarize(ctx.buildGeneratedClassPerfectiveFormulaProfile({
                        tense: "preterito",
                        surfaceForms: ["nikpiyak"],
                        subjectPrefix: "ni",
                        objectPrefix: "ki",
                        sourceStem: "piya",
                        sourceFrame,
                        operationFrame,
                    })),
                    stringOnly: summarize(ctx.buildGeneratedClassPerfectiveFormulaProfile({
                        tense: "preterito",
                        surfaceForms: ["nikpiyak"],
                        subjectPrefix: "ni",
                        objectPrefix: "ki",
                        sourceStem: "piya",
                    })),
                    changedStrings: summarize(ctx.buildGeneratedClassPerfectiveFormulaProfile({
                        tense: "pasado-remoto",
                        surfaceForms: ["poison"],
                        subjectPrefix: "poison",
                        objectPrefix: "poison",
                        sourceStem: "poison",
                        sourceFrame,
                        operationFrame,
                    })),
                    missingOperation: summarize(ctx.buildGeneratedClassPerfectiveFormulaProfile({
                        sourceFrame,
                    })),
                    contradictorySource: summarize(ctx.buildGeneratedClassPerfectiveFormulaProfile({
                        sourceFrame: otherSourceFrame,
                        operationFrame,
                    })),
                    contradictoryTarget: summarize(ctx.buildGeneratedClassPerfectiveFormulaProfile({
                        sourceFrame,
                        operationFrame: {
                            ...operationFrame,
                            targetProfile: {
                                ...operationFrame.targetProfile,
                                base: "poison",
                            },
                        },
                    })),
                    poisoned: summarize(poisoned),
                };
            })(),
            {
                helperTypes: ["function", "function", "function"],
                sourceFrameKind: "generated-class-perfective-formula-source-frame",
                operationId: "generated-class-perfective-formula-profile-realization",
                authorized: {
                    base: "piya",
                    objectPrefix: "k",
                    formulaObject: "k-0",
                    objectSurface: "k",
                    operationId: "generated-class-perfective-formula-profile-realization",
                    sourceFrameKind: "generated-class-perfective-formula-source-frame",
                },
                stringOnly: null,
                changedStrings: {
                    base: "piya",
                    objectPrefix: "k",
                    formulaObject: "k-0",
                    objectSurface: "k",
                    operationId: "generated-class-perfective-formula-profile-realization",
                    sourceFrameKind: "generated-class-perfective-formula-source-frame",
                },
                missingOperation: null,
                contradictorySource: null,
                contradictoryTarget: null,
                poisoned: {
                    base: "piya",
                    objectPrefix: "k",
                    formulaObject: "k-0",
                    objectSurface: "k",
                    operationId: "generated-class-perfective-formula-profile-realization",
                    sourceFrameKind: "generated-class-perfective-formula-source-frame",
                },
            }
        );
        s.eq(
            "Lesson 6 governing frame rides with generated CNV object slots",
            [
                objectGoverningSummary("ta"),
                objectGoverningSummary("metz"),
                objectGoverningSummary("mu", "miki"),
                objectGoverningSummary("mu", "altia"),
            ],
            [
                {
                    inputObject: "ta",
                    tronco: "miki",
                    formula: "#Ø-Ø+ta(miki)Ø+Ø-t#",
                    formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    visibleFormulaObject: "ta",
                    governingPath: "monadic-nonspecific-projective-nonhuman",
                    governingSlotId: "va",
                    sourceSections: ["Andrews §6.2"],
                    valencePosition: "va",
                    predicatePositionStatus: "monadic",
                    va: "ta",
                    va1: "",
                    va2: "",
                    classicalMorph: "tla",
                    classicalDyad: "",
                    nawatDyad: "",
                    stemCondition: "",
                },
                {
                    inputObject: "metz",
                    tronco: "miki",
                    formula: "#Ø-Ø+m-etz(miki)Ø+Ø-t#",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    visibleFormulaObject: "m-etz",
                    governingPath: "dyadic-specific-projective-non-third",
                    governingSlotId: "va1-va2",
                    sourceSections: ["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"],
                    valencePosition: "va1-va2",
                    predicatePositionStatus: "dyadic",
                    va: "",
                    va1: "m",
                    va2: "etz",
                    classicalMorph: "",
                    classicalDyad: "m-itz",
                    nawatDyad: "m-etz",
                    stemCondition: "",
                },
                {
                    inputObject: "mu",
                    tronco: "miki",
                    formula: "#Ø-Ø+m-u(miki)Ø+Ø-t#",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    visibleFormulaObject: "m-u",
                    governingPath: "dyadic-mainline-reflexive-reciprocative",
                    governingSlotId: "va1-va2",
                    sourceSections: ["Andrews §6.6"],
                    valencePosition: "va1-va2",
                    predicatePositionStatus: "dyadic",
                    va: "",
                    va1: "m",
                    va2: "u",
                    classicalMorph: "",
                    classicalDyad: "m-o",
                    nawatDyad: "m-u",
                    stemCondition: "o-to-u-nawat-bridge",
                },
                {
                    inputObject: "mu",
                    tronco: "altia",
                    formula: "#Ø-Ø+m-0(altia)Ø+Ø-t#",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    visibleFormulaObject: "m-0",
                    governingPath: "dyadic-mainline-reflexive-reciprocative",
                    governingSlotId: "va1-va2",
                    sourceSections: ["Andrews §6.6"],
                    valencePosition: "va1-va2",
                    predicatePositionStatus: "dyadic",
                    va: "",
                    va1: "m",
                    va2: "0",
                    classicalMorph: "",
                    classicalDyad: "m-0",
                    nawatDyad: "m-0",
                    stemCondition: "vowel-initial-stem-allomorph",
                },
            ]
        );
        s.eq(
            "CNV formula-surface path keeps stem-initial m separate from metz object",
            (() => {
                const result = buildObjectFormulaProbe("metz", "mana", "ni", "");
                const bySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                return {
                    surface: result.surface,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    baseFormulaMorph: bySlot.base?.formulaMorph || "",
                    baseSurfaceValue: bySlot.base?.surfaceValue || "",
                    baseStatus: bySlot.base?.status || "",
                    baseCopyRelations: bySlot.base?.surfaceCopyRelations || [],
                };
            })(),
            {
                surface: "nimetzmana",
                formula: "#ni-Ø+m-etz(mana)Ø+Ø-Ø#",
                visibleFormulaObject: "m-etz",
                baseFormulaMorph: "mana",
                baseSurfaceValue: "mana",
                baseStatus: "matched",
                baseCopyRelations: [],
            }
        );
        s.eq(
            "CNV formula-surface path assigns 2pl object in to val1 number not val2",
            (() => {
                const result = buildObjectFormulaProbe("metzin");
                const pathBySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    formula: result.nuclearClauseShell?.formulaEcho,
                    visibleObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    formulaSlotFunctional: result.nuclearClauseShell?.formulaSlots?.obj1?.functionalSubslots || null,
                    cnvPath: {
                        va1: {
                            morph: pathBySlot.va1?.formulaMorph || "",
                            surface: pathBySlot.va1?.surfaceValue || "",
                            features: pathBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va1?.visibleLinearMorph || "",
                            status: pathBySlot.va1?.status || "",
                        },
                        va2: {
                            morph: pathBySlot.va2?.formulaMorph || "",
                            surface: pathBySlot.va2?.surfaceValue || "",
                            features: pathBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va2?.visibleLinearMorph || "",
                            status: pathBySlot.va2?.status || "",
                        },
                    },
                    uiPath: {
                        va1: {
                            value: bridgeBySlot.va1?.value || "",
                            features: bridgeBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va1?.visibleLinearMorph || "",
                        },
                        va2: {
                            value: bridgeBySlot.va2?.value || "",
                            features: bridgeBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va2?.visibleLinearMorph || "",
                        },
                    },
                };
            })(),
            {
                formula: "#Ø-Ø+m-etz-in(miki)Ø+Ø-t#",
                visibleObject: "m-etz-in",
                formulaSlotFunctional: {
                    va1: "m-in",
                    va2: "etz",
                    val1Features: { person: "m", number: "in" },
                    val2Features: { objective: "etz" },
                    visibleLinearMorph: "m-etz-in",
                },
                cnvPath: {
                    va1: {
                        morph: "m-in",
                        surface: "m-in",
                        features: { person: "m", number: "in" },
                        visibleLinearMorph: "m-etz-in",
                        status: "matched",
                    },
                    va2: {
                        morph: "etz",
                        surface: "etz",
                        features: { objective: "etz" },
                        visibleLinearMorph: "m-etz-in",
                        status: "matched",
                    },
                },
                uiPath: {
                    va1: {
                        value: "m-in",
                        features: { person: "m", number: "in" },
                        visibleLinearMorph: "m-etz-in",
                    },
                    va2: {
                        value: "etz",
                        features: { objective: "etz" },
                        visibleLinearMorph: "m-etz-in",
                    },
                },
            }
        );
        s.eq(
            "CNV formula-surface path assigns 3pl object in to val2 number",
            (() => {
                const result = buildObjectFormulaProbe("kin");
                const pathBySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    formula: result.nuclearClauseShell?.formulaEcho,
                    visibleObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    formulaSlotFunctional: result.nuclearClauseShell?.formulaSlots?.obj1?.functionalSubslots || null,
                    cnvPath: {
                        va1: {
                            morph: pathBySlot.va1?.formulaMorph || "",
                            surface: pathBySlot.va1?.surfaceValue || "",
                            features: pathBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va1?.visibleLinearMorph || "",
                            status: pathBySlot.va1?.status || "",
                        },
                        va2: {
                            morph: pathBySlot.va2?.formulaMorph || "",
                            surface: pathBySlot.va2?.surfaceValue || "",
                            features: pathBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va2?.visibleLinearMorph || "",
                            status: pathBySlot.va2?.status || "",
                        },
                    },
                    uiPath: {
                        va1: {
                            value: bridgeBySlot.va1?.value || "",
                            features: bridgeBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va1?.visibleLinearMorph || "",
                        },
                        va2: {
                            value: bridgeBySlot.va2?.value || "",
                            features: bridgeBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va2?.visibleLinearMorph || "",
                        },
                    },
                };
            })(),
            {
                formula: "#Ø-Ø+k-in(miki)Ø+Ø-t#",
                visibleObject: "k-in",
                formulaSlotFunctional: {
                    va1: "k-0",
                    va2: "in",
                    val1Features: { person: "k", objective: "0" },
                    val2Features: { number: "in" },
                    visibleLinearMorph: "k-in",
                },
                cnvPath: {
                    va1: {
                        morph: "k-0",
                        surface: "k-0",
                        features: { person: "k", objective: "0" },
                        visibleLinearMorph: "k-in",
                        status: "matched",
                    },
                    va2: {
                        morph: "in",
                        surface: "in",
                        features: { number: "in" },
                        visibleLinearMorph: "k-in",
                        status: "matched",
                    },
                },
                uiPath: {
                    va1: {
                        value: "k-0",
                        features: { person: "k", objective: "0" },
                        visibleLinearMorph: "k-in",
                    },
                    va2: {
                        value: "in",
                        features: { number: "in" },
                        visibleLinearMorph: "k-in",
                    },
                },
            }
        );
        s.eq(
            "CNV formula-surface path assigns vowel-stem kinh to val2 allomorphy",
            (() => {
                const result = buildObjectFormulaProbe("kin", "ita", "", "");
                const pathBySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    surface: result.surface,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    visibleObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    cnvPath: {
                        va1: {
                            morph: pathBySlot.va1?.formulaMorph || "",
                            surface: pathBySlot.va1?.surfaceValue || "",
                            features: pathBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va1?.visibleLinearMorph || "",
                            status: pathBySlot.va1?.status || "",
                        },
                        va2: {
                            morph: pathBySlot.va2?.formulaMorph || "",
                            surface: pathBySlot.va2?.surfaceValue || "",
                            features: pathBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va2?.visibleLinearMorph || "",
                            status: pathBySlot.va2?.status || "",
                        },
                        base: {
                            morph: pathBySlot.base?.formulaMorph || "",
                            surface: pathBySlot.base?.surfaceValue || "",
                            status: pathBySlot.base?.status || "",
                        },
                    },
                    uiPath: {
                        va2: {
                            value: bridgeBySlot.va2?.value || "",
                            features: bridgeBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va2?.visibleLinearMorph || "",
                        },
                        base: {
                            value: bridgeBySlot.base?.value || "",
                        },
                    },
                };
            })(),
            {
                surface: "kinhita",
                formula: "#Ø-Ø+k-in(ita)Ø+Ø-Ø#",
                visibleObject: "k-in",
                cnvPath: {
                    va1: {
                        morph: "k-0",
                        surface: "k-0",
                        features: { person: "k", objective: "0" },
                        visibleLinearMorph: "k-in",
                        status: "matched",
                    },
                    va2: {
                        morph: "in",
                        surface: "inh",
                        features: { number: "in" },
                        visibleLinearMorph: "k-in",
                        status: "matched",
                    },
                    base: {
                        morph: "ita",
                        surface: "ita",
                        status: "matched",
                    },
                },
                uiPath: {
                    va2: {
                        value: "inh",
                        features: { number: "in" },
                        visibleLinearMorph: "k-in",
                    },
                    base: {
                        value: "ita",
                    },
                },
            }
        );
        s.eq(
            "Lesson 6 reflexive formula uses m-u or m-0 conditionally by stem",
            [
                reflexiveStemFormulaSummary("ajsi"),
                reflexiveStemFormulaSummary("altia"),
                reflexiveStemFormulaSummary("ilwia"),
                reflexiveStemFormulaSummary("awiltia"),
            ],
            [
                {
                    tronco: "ajsi",
                    formula: "#Ø-Ø+m-u(ajsi)Ø+Ø-t#",
                    reflexive: "m-u",
                    visibleFormulaObject: "m-u",
                },
                {
                    tronco: "altia",
                    formula: "#Ø-Ø+m-0(altia)Ø+Ø-t#",
                    reflexive: "m-0",
                    visibleFormulaObject: "m-0",
                },
                {
                    tronco: "ilwia",
                    formula: "#Ø-Ø+m-u(ilwia)Ø+Ø-t#",
                    reflexive: "m-u",
                    visibleFormulaObject: "m-u",
                },
                {
                    tronco: "awiltia",
                    formula: "#Ø-Ø+m-0(awiltia)Ø+Ø-t#",
                    reflexive: "m-0",
                    visibleFormulaObject: "m-0",
                },
            ]
        );
        const reflexiveFormulaSurfaceCouplingSummary = (tronco) => {
            const result = buildObjectFormulaProbe("mu", tronco);
            const frames = result.grammarFrame?.orthographyFrame?.soundSpellingFrames || [];
            return {
                tronco,
                surface: result.result,
                formula: result.nuclearClauseShell?.formulaEcho,
                reflexive: result.nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix,
                visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                muAllomorphyFrames: frames
                    .filter((frame) => frame.ruleId === "obj1-mu-before-vowel-m")
                    .map((frame) => ({
                        ruleId: frame.ruleId,
                        source: frame.sourceSurface,
                        target: frame.target,
                        slot: frame.grammarSlot,
                        sourceSegment: frame.sourceSegmentValue,
                        targetSegment: frame.targetSegmentValue,
                    })),
            };
        };
        s.eq(
            "Lesson 6 couples reflexive formula slots to the same mu allomorphy that renders output",
            [
                reflexiveFormulaSurfaceCouplingSummary("ajsi"),
                reflexiveFormulaSurfaceCouplingSummary("altia"),
            ],
            [
                {
                    tronco: "ajsi",
                    surface: "muajsit",
                    formula: "#Ø-Ø+m-u(ajsi)Ø+Ø-t#",
                    reflexive: "m-u",
                    visibleFormulaObject: "m-u",
                    muAllomorphyFrames: [],
                },
                {
                    tronco: "altia",
                    surface: "maltiat",
                    formula: "#Ø-Ø+m-0(altia)Ø+Ø-t#",
                    reflexive: "m-0",
                    visibleFormulaObject: "m-0",
                    muAllomorphyFrames: [{
                        ruleId: "obj1-mu-before-vowel-m",
                        source: "mu",
                        target: "m",
                        slot: "obj1",
                        sourceSegment: "mu",
                        targetSegment: "m",
                    }],
                },
            ]
        );
        const shuntlineNeProbe = buildObjectFormulaProbe("ne");
        const shuntlineNeShell = shuntlineNeProbe.nuclearClauseShell
            || shuntlineNeProbe.grammarFrame?.nuclearClauseFrame
            || {};
        s.eq(
            "Lesson 6 generates shuntline ne surface while preserving monadic formula diagnostics",
            {
                blocked: Boolean(shuntlineNeProbe.error),
                result: shuntlineNeProbe.result,
                surface: shuntlineNeProbe.surface,
                formulaKind: shuntlineNeShell.formula,
                predicatePositionStatus: shuntlineNeShell.predicatePositionStatus,
                formula: shuntlineNeShell.formulaEcho,
                obj1: shuntlineNeShell.formulaSlots?.obj1?.displayPrefix,
                reflexive: shuntlineNeShell.formulaSlots?.reflexivo?.displayPrefix,
                connector: shuntlineNeShell.formulaSlots?.num1Num2?.displayConnector,
                generationAllowed: shuntlineNeProbe.grammarFrame?.routeContract?.generationAllowed,
                valencePosition: shuntlineNeProbe.vncValencyFrame?.lesson6ValencePosition || "",
                diagnosticCount: shuntlineNeProbe.diagnostics?.length || 0,
            },
            {
                blocked: false,
                result: "nemikit",
                surface: "nemikit",
                formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                predicatePositionStatus: "monadic",
                formula: "#Ø-Ø+ne(miki)Ø+Ø-t#",
                obj1: "ne",
                reflexive: "Ø",
                connector: "Ø-t",
                generationAllowed: true,
                valencePosition: "va",
                diagnosticCount: 0,
            }
        );
    }
    s.eq(
        "executeGenerateWordRequest also exposes the LCM grammar frame for VNC output",
        {
            frameKeys: ctx.GRAMMAR_FRAME_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(executeEngineResult.grammarFrame, key)),
            topOk: executeEngineResult.ok,
            topSurface: executeEngineResult.surface,
            topFramesIsGrammarFrame: executeEngineResult.frames === executeEngineResult.grammarFrame,
            unitKind: executeEngineResult.grammarFrame.unitFrame.unitKind,
            surface: executeEngineResult.grammarFrame.resultFrame.surface,
            ok: executeEngineResult.grammarFrame.resultFrame.ok,
            shellKind: executeEngineResult.grammarFrame.nuclearClauseFrame.clauseKind,
            shellFormulaAbbreviation: executeEngineResult.grammarFrame.nuclearClauseFrame.formulaAbbreviation,
            shellFormulaLabel: executeEngineResult.grammarFrame.nuclearClauseFrame.formulaLabel,
            routeFamily: executeEngineResult.grammarFrame.routeContract.routeFamily,
            tiempo: executeEngineResult.grammarFrame.inflectionFrame.tiempo,
            pers1Prefix: executeEngineResult.grammarFrame.participantFrame.pers1Pers2.prefix,
        },
        {
            frameKeys: ctx.GRAMMAR_FRAME_KEYS,
            topOk: true,
            topSurface: "nemi",
            topFramesIsGrammarFrame: true,
            unitKind: "verbal-nuclear-clause",
            surface: "nemi",
            ok: true,
            shellKind: "verbal-nuclear-clause",
            shellFormulaAbbreviation: "CNV",
            shellFormulaLabel: "Fórmula CNV",
            routeFamily: "vnc",
            tiempo: "presente",
            pers1Prefix: "",
        }
    );
    const executeSurfaceAliasResult = ctx.executeNuclearClauseSurfaceRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(nemi)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const surfaceEngineTargetContract = executeEngineResult.grammarFrame.routeContract.targetContract.surfaceEngineContract;
    s.eq(
        "nuclear clause surface contract separates output, source, slots, stem, affix, derivation, inflection, and wordhood",
        {
            aliasMatchesResult: executeSurfaceAliasResult.result === executeEngineResult.result,
            aliasMatchesSurface: executeSurfaceAliasResult.surface === executeEngineResult.surface,
            invariantIds: ctx.getNuclearClauseSurfaceEngineInvariants().map((entry) => entry.id),
            topContract: executeEngineResult.surfaceEngineContract,
            frameContract: surfaceEngineTargetContract,
            resultSurfaceIsSource: executeEngineResult.grammarFrame.resultFrame.surfaceOutputIsGrammarSource,
            resultNuclearClauseIsWord: executeEngineResult.grammarFrame.resultFrame.nuclearClauseIsWord,
            slotIsSpelling: executeEngineResult.grammarFrame.morphBoundaryFrame.formulaSlotIsLiteralSpelling,
            stemIsOutput: executeEngineResult.grammarFrame.stemFrame.stemIsWholeOutput,
            affixIsStem: executeEngineResult.grammarFrame.stemFrame.affixIsStem,
            derivationScope: executeEngineResult.grammarFrame.stemFrame.derivationScope,
            inflectionScope: executeEngineResult.grammarFrame.inflectionFrame.inflectionScope,
            inflectionInsideStem: executeEngineResult.grammarFrame.inflectionFrame.inflectionInsideStem,
        },
        {
            aliasMatchesResult: true,
            aliasMatchesSurface: true,
            invariantIds: [
                "surface-output-not-grammar-source",
                "formula-slot-not-literal-spelling",
                "stem-not-whole-output",
                "affix-not-stem",
                "derivation-inside-stem",
                "inflection-outside-stem",
                "vnc-nnc-not-word",
            ],
            topContract: surfaceEngineTargetContract,
            frameContract: {
                canonicalGenerateFunction: "generateNuclearClauseSurface",
                canonicalExecuteFunction: "executeNuclearClauseSurfaceRequest",
                compatibilityGenerateFunction: "generateWord",
                compatibilityExecuteFunction: "executeGenerateWordRequest",
                generatedUnit: "nuclear-clause-surface",
                routeFamily: "vnc",
                routeStage: "execute",
                compatibilityFunction: "executeGenerateWordRequest",
                invariants: ctx.getNuclearClauseSurfaceEngineInvariants(),
                surfaceOutputIsGrammarSource: false,
                formulaSlotIsLiteralSpelling: false,
                stemIsWholeOutput: false,
                affixIsStem: false,
                derivationScope: "inside-stem",
                inflectionScope: "outside-stem",
                nuclearClauseIsWord: false,
            },
            resultSurfaceIsSource: false,
            resultNuclearClauseIsWord: false,
            slotIsSpelling: false,
            stemIsOutput: false,
            affixIsStem: false,
            derivationScope: "inside-stem",
            inflectionScope: "outside-stem",
            inflectionInsideStem: false,
        }
    );
    const inheritedSurfaceOnlyRouteFrame = {
        kind: "inherited-surface-only-route-frame",
        objectSlotOwnership: {
            kind: "inherited-surface-only-object-slot-ownership-frame",
            matrixValenceFrameFixed: true,
        },
        routeFrameLicensesObjectSlotOwnership: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
    };
    const priorResultFrame = ctx.buildGrammarFrame({
        routeContract: ctx.buildGrammarRouteContractFrame({
            routeFamily: "inherited-source-route",
            routeStage: "execute",
            sourceContract: {
                sourceRouteFrame: inheritedSurfaceOnlyRouteFrame,
            },
            generationAllowed: true,
        }),
        resultFrame: ctx.buildGrammarResultFrame({
            ok: true,
            surface: "frame-engine-surface",
            surfaceForms: ["frame-engine-a", "frame-engine-b"],
        }),
    });
    const rebuiltGenerateFrame = ctx.buildNuclearClauseSurfaceGrammarFrame({
        result: {
            result: "stale-engine-result",
            frames: priorResultFrame,
            surface: "top-engine-surface",
            surfaceForms: ["stale-engine-a / stale-engine-b"],
        },
        renderVerb: "—",
        verb: "stale-source",
        resolvedTenseMode: "verbo",
        tense: "presente",
        routeFamily: "vnc",
        unitKind: "verbal-nuclear-clause",
    });
    s.eq(
        "generate word grammar frame reads framed result surface forms before stale no-output text",
        {
            surface: rebuiltGenerateFrame.resultFrame.surface,
            surfaceForms: rebuiltGenerateFrame.resultFrame.surfaceForms,
            ok: rebuiltGenerateFrame.resultFrame.ok,
            sourceInput: rebuiltGenerateFrame.resultFrame.sourceInput,
            stem: rebuiltGenerateFrame.stemFrame.stem,
            routeFrameKind: rebuiltGenerateFrame.routeContract.sourceContract.sourceRouteFrame.kind,
            participantRouteFrameKind: rebuiltGenerateFrame.participantFrame.sourceRouteFrame.kind,
            participantOwnershipKind: rebuiltGenerateFrame.participantFrame.objectSlotOwnership.kind,
            participantMatrixValenceFrameFixed: rebuiltGenerateFrame.participantFrame.objectSlotOwnership.matrixValenceFrameFixed === true,
        },
        {
            surface: "frame-engine-a",
            surfaceForms: ["frame-engine-a", "frame-engine-b", "frame-engine-surface"],
            ok: true,
            sourceInput: "frame-engine-a",
            stem: "frame-engine-a",
            routeFrameKind: "inherited-surface-only-route-frame",
            participantRouteFrameKind: "inherited-surface-only-route-frame",
            participantOwnershipKind: "inherited-surface-only-object-slot-ownership-frame",
            participantMatrixValenceFrameFixed: true,
        }
    );
    s.eq(
        "generate runtime blocked wrapper preserves framed surface forms before stale stale text",
        typeof ctx.resolveGenerateRuntimeContractSurface === "function"
            ? ctx.resolveGenerateRuntimeContractSurface({
                result: "stale-runtime-result",
                surface: "top-runtime-surface",
                surfaceForms: ["stale-runtime-a / stale-runtime-b"],
                frames: priorResultFrame,
            })
            : "runtime-support-not-loaded",
        "frame-engine-a"
    );
    s.eq(
        "generate runtime surface forms ignore stale aliases when result frame exists",
        typeof ctx.getGenerateRuntimeSurfaceForms === "function"
            ? ctx.getGenerateRuntimeSurfaceForms({
                result: "stale-runtime-result",
                surface: "top-runtime-surface",
                surfaceForms: ["stale-runtime-a / stale-runtime-b"],
                frames: priorResultFrame,
            })
            : ["runtime-support-not-loaded"],
        ["frame-engine-a", "frame-engine-b", "frame-engine-surface"]
    );
    s.eq(
        "VNC allomorphy primary surface reads framed result before stale no-output text",
        typeof ctx.getVncAllomorphyContractSurface === "function"
            ? ctx.getVncAllomorphyContractSurface({
                result: "stale-allomorphy-result",
                surface: "top-allomorphy-surface",
                outputSurface: "stale-output-surface",
                selectedOutputSurface: "stale-selected-output",
                nawatSurfaceSuffix: "stale-suffix",
                forms: ["stale-stale-form"],
                frames: priorResultFrame,
            })
            : "vnc-allomorphy-helper-not-loaded",
        "frame-engine-a"
    );
    s.eq(
        "VNC allomorphy source forms prefer framed result before stale stale forms",
        typeof ctx.getVncAllomorphySourceSurfaceForms === "function"
            ? ctx.getVncAllomorphySourceSurfaceForms({
                result: "stale-allomorphy-result",
                surface: "top-allomorphy-surface",
                outputSurface: "stale-output-surface",
                selectedOutputSurface: "stale-selected-output",
                nawatSurfaceSuffix: "stale-suffix",
                forms: ["stale-stale-form"],
                frames: priorResultFrame,
            })
            : ["vnc-allomorphy-source-helper-not-loaded"],
        ["frame-engine-a", "frame-engine-b", "frame-engine-surface"]
    );
    s.eq(
        "VNC allomorphy source forms keep stale forms for metadata-only frames",
        typeof ctx.getVncAllomorphySourceSurfaceForms === "function"
            ? ctx.getVncAllomorphySourceSurfaceForms({
                forms: ["stale-allomorphy-a / stale-allomorphy-b"],
                frames: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "vnc-allomorphy",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            })
            : ["vnc-allomorphy-source-helper-not-loaded"],
        ["stale-allomorphy-a", "stale-allomorphy-b"]
    );
    const transitiveFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "-maka",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "VNC valency frame explains transitive subject and object slots without changing output",
        {
            valency: transitiveFrameResult.vncValencyFrame?.valency,
            subjectPrefix: transitiveFrameResult.vncValencyFrame?.pers1Pers2?.prefix,
            objectPrefix: transitiveFrameResult.vncValencyFrame?.obj1?.prefix,
            baseObjectPrefix: transitiveFrameResult.vncValencyFrame?.obj1?.basePrefix,
            changesSurfaceForms: transitiveFrameResult.vncValencyFrame?.boundaries?.changesSurfaceForms,
            forms: transitiveFrameResult.surfaceForms,
        },
        {
            valency: "transitive",
            subjectPrefix: "ni",
            objectPrefix: "k",
            baseObjectPrefix: "ki",
            changesSurfaceForms: false,
            forms: ["nikmaka"],
        }
    );
    const passiveFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                derivationMode: ctx.DERIVATION_MODE.nonactive,
                voiceMode: ctx.VOICE_MODE.passive,
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ki",
            tronco: "-maka",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "derived voice frame explains passive/impersonal valency without changing output",
        {
            kind: passiveFrameResult.derivedVoiceFrame?.kind,
            voiceLabel: passiveFrameResult.derivedVoiceFrame?.voice?.label,
            sourceValency: passiveFrameResult.derivedVoiceFrame?.valency?.sourceValency,
            targetValency: passiveFrameResult.derivedVoiceFrame?.valency?.targetValency,
            baseObj1: passiveFrameResult.derivedVoiceFrame?.valency?.baseObj1,
            selectedObj1: passiveFrameResult.derivedVoiceFrame?.valency?.selectedObj1,
            obj1ClearedByVoice: passiveFrameResult.derivedVoiceFrame?.valency?.obj1ClearedByVoice,
            changesSurfaceForms: passiveFrameResult.derivedVoiceFrame?.boundaries?.changesSurfaceForms,
            forms: passiveFrameResult.surfaceForms,
        },
        {
            kind: "derived-voice-frame",
            voiceLabel: "pasivo/impersonal",
            sourceValency: 2,
            targetValency: 1,
            baseObj1: "ki",
            selectedObj1: "",
            obj1ClearedByVoice: true,
            changesSurfaceForms: false,
            forms: ["makalu", "makilu"],
        }
    );
    const causativeFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                derivationType: ctx.DERIVATION_TYPE.causative,
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "(nemi)",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "forward derivation frame explains causative stem path without changing output",
        {
            kind: causativeFrameResult.forwardDerivationFrame?.kind,
            lessonRange: causativeFrameResult.forwardDerivationFrame?.lessonRange,
            derivationType: causativeFrameResult.forwardDerivationFrame?.derivation?.type,
            derivationLabel: causativeFrameResult.forwardDerivationFrame?.derivation?.label,
            sourceValency: causativeFrameResult.forwardDerivationFrame?.valency?.sourceValency,
            derivedValency: causativeFrameResult.forwardDerivationFrame?.valency?.derivedValency,
            selectedStem: causativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
            changesSurfaceForms: causativeFrameResult.forwardDerivationFrame?.boundaries?.changesSurfaceForms,
            forms: causativeFrameResult.surfaceForms,
        },
        {
            kind: "forward-derivation-frame",
            lessonRange: "24-25",
            derivationType: "causative",
            derivationLabel: "causativa",
            sourceValency: 1,
            derivedValency: 2,
            selectedStem: "nemtia",
            changesSurfaceForms: false,
            forms: ["ninemitia", "ninentia"],
        }
    );
    const generateCausativeThirdSingular = (verb) => ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                derivationType: ctx.DERIVATION_TYPE.causative,
                parsedVerb: ctx.parseVerbInput(verb),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ki",
            tronco: verb,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const panuCausativeFrameResult = generateCausativeThirdSingular("panu");
    const tejkuCausativeFrameResult = generateCausativeThirdSingular("tejku");
    s.eq(
        "Nawat -u causative exceptions keep attested panu and tejku outputs",
        {
            panuForms: panuCausativeFrameResult.surfaceForms,
            panuSelectedStem: panuCausativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
            tejkuForms: tejkuCausativeFrameResult.surfaceForms,
            tejkuSelectedStem: tejkuCausativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
        },
        {
            panuForms: ["kipanawia", "kipanultia"],
            panuSelectedStem: "panawia",
            tejkuForms: ["kitejkawia", "kitejkultia"],
            tejkuSelectedStem: "tejkawia",
        }
    );
    s.eq(
        "Andrews 24.7 stock-formative selection remains explicit for destockal wi reverse lookup",
        {
            petz: ctx.getDestockalWiReverseBaseSuffixes("petz"),
            patz: ctx.getDestockalWiReverseBaseSuffixes("patz"),
            pish: ctx.getDestockalWiReverseBaseSuffixes("pish"),
            pul: ctx.getDestockalWiReverseBaseSuffixes("pul"),
            unknown: ctx.getDestockalWiReverseBaseSuffixes(""),
        },
        {
            petz: ["iwi"],
            patz: ["iwi"],
            pish: ["awi"],
            pul: ["iwi"],
            unknown: ["iwi", "awi"],
        }
    );
    const applicativeFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                derivationType: ctx.DERIVATION_TYPE.applicative,
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "-maka",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "forward derivation frame explains applicative valency path without changing output",
        {
            kind: applicativeFrameResult.forwardDerivationFrame?.kind,
            lessonRange: applicativeFrameResult.forwardDerivationFrame?.lessonRange,
            derivationType: applicativeFrameResult.forwardDerivationFrame?.derivation?.type,
            sourceValency: applicativeFrameResult.forwardDerivationFrame?.valency?.sourceValency,
            derivedValency: applicativeFrameResult.forwardDerivationFrame?.valency?.derivedValency,
            selectedStem: applicativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
            changesSurfaceForms: applicativeFrameResult.forwardDerivationFrame?.boundaries?.changesSurfaceForms,
            forms: applicativeFrameResult.surfaceForms,
        },
        {
            kind: "forward-derivation-frame",
            lessonRange: "26",
            derivationType: "applicative",
            sourceValency: 2,
            derivedValency: 3,
            selectedStem: "makilia",
            changesSurfaceForms: false,
            forms: ["nikmaka", "nikmakilia"],
        }
    );
    s.eq(
        "forward derivation frame stops at empty provenance result frames before stale surfaceStem",
        (() => {
            const blockedProvenance = {
                surfaceStem: "stale-forward-surface-stem",
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                        outputKind: "output-provenance",
                    }),
                }),
            };
            const frame = ctx.buildGeneratedForwardDerivationFrameMetadata({
                resolvedTenseMode: ctx.TENSE_MODE?.verbo || "verbo",
                resolvedDerivationType: ctx.DERIVATION_TYPE.causative,
                derivationValencyDelta: 1,
                sourceValency: 2,
                forwardStemProvenance: blockedProvenance,
                renderVerb: "nemi",
                verb: "analysis-fallback",
                analysisVerb: "analysis-fallback",
            });
            return {
                selectedStem: frame?.stem?.selectedStem || "",
                candidateStems: frame?.stem?.candidateStems || [],
            };
        })(),
        {
            selectedStem: "analysisfallback",
            candidateStems: [],
        }
    );
    const compoundFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(shuchi)-(kwi)"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "(shuchi)-(kwi)",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const compoundObjectRouteResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(a)+ta-(kwi)"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "(a)+ta-(kwi)",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const unresolvedGeneratedCompoundRouteFrame = ctx.buildGeneratedCompoundRouteFrameMetadata({
        compoundAst: {
            kind: "compound",
            source: { rawInput: "(shuchi)-(unknown)" },
            matrix: { stem: "unknown", ruleBase: "unknown" },
            valency: {},
        },
        embeds: [{ value: "shuchi", role: "outer-lexical", source: "test" }],
    });
    s.eq(
        "compound frame exposes parser compoundAst metadata without changing output",
        {
            kind: compoundFrameResult.compoundFrame?.kind,
            lessonRange: compoundFrameResult.compoundFrame?.lessonRange,
            matrixStem: compoundFrameResult.compoundFrame?.matrix?.stem,
            embedRoles: compoundFrameResult.compoundFrame?.embeds?.map((entry) => entry.role),
            embedValues: compoundFrameResult.compoundFrame?.embeds?.map((entry) => entry.value),
            rawInput: compoundFrameResult.compoundFrame?.sourceInput?.rawInput,
            routeFrameKind: compoundFrameResult.compoundFrame?.compoundRouteFrame?.kind || "",
            routeFrameShape: compoundFrameResult.compoundFrame?.compoundRouteFrame?.finalFormulaShape || "",
            routeFrameEmbedRole: compoundFrameResult.compoundFrame?.compoundRouteFrame?.embedRole || "",
            routeFrameMatrixValence: compoundFrameResult.compoundFrame?.compoundRouteFrame?.matrixValence || "",
            routeFrameSourceSurface: compoundFrameResult.compoundFrame?.compoundRouteFrame?.sourcePrincipalVnc?.surface || "",
            routeFrameRouteLicensesRole: compoundFrameResult.compoundFrame?.compoundRouteFrame?.routeFrameLicensesEmbedRole === true,
            routeFrameShapeDoesNotLicenseRole: compoundFrameResult.compoundFrame?.compoundRouteFrame?.finalFormulaShapeDoesNotLicenseRole === true,
            routeFrameOwnershipKind: compoundFrameResult.compoundFrame?.compoundRouteFrame?.objectSlotOwnership?.kind || "",
            routeFrameMatrixValenceFrameFixed: compoundFrameResult.compoundFrame?.compoundRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
            routeFrameLicensesObjectSlots: compoundFrameResult.compoundFrame?.compoundRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
            routeFrameShapeDoesNotLicenseObjectSlots: compoundFrameResult.compoundFrame?.compoundRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
            routeFrameFunctionUseDoesNotLicenseObjectSlots: compoundFrameResult.compoundFrame?.compoundRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
            grammarSourceRouteFrameKind: compoundFrameResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.kind || "",
            grammarStemRouteFrameKind: compoundFrameResult.grammarFrame?.stemFrame?.sourceRouteFrame?.kind || "",
            grammarMorphRouteFrameKind: compoundFrameResult.grammarFrame?.morphBoundaryFrame?.sourceRouteFrame?.kind || "",
            grammarParticipantRouteFrameKind: compoundFrameResult.grammarFrame?.participantFrame?.sourceRouteFrame?.kind || "",
            grammarParticipantOwnershipKind: compoundFrameResult.grammarFrame?.participantFrame?.objectSlotOwnership?.kind || "",
            grammarParticipantMatrixValenceFrameFixed: compoundFrameResult.grammarFrame?.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
            grammarParticipantFunctionUseDoesNotLicenseObjectSlots: compoundFrameResult.grammarFrame?.participantFrame?.functionUseDoesNotLicenseObjectSlots === true,
            changesSurfaceForms: compoundFrameResult.compoundFrame?.boundaries?.changesSurfaceForms,
            forms: compoundFrameResult.surfaceForms,
            objectRoute: {
                forms: compoundObjectRouteResult.surfaceForms,
                routeFrameKind: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.kind || "",
                routeFrameShape: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.finalFormulaShape || "",
                objectSlotPrefixes: (
                    compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots || []
                ).map((slot) => [slot.slotId, slot.prefix, slot.owner]),
                ownershipKind: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.kind || "",
                sourceExternalObjectSlotsOwnedBy: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.sourceExternalObjectSlotsOwnedBy || "",
                remainingExternalObjectSlotsOwnedBy: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.remainingExternalObjectSlotsOwnedBy || "",
                matrixValenceFrameFixed: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
                functionUseOwnsObjectSlots: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.functionUseOwnsObjectSlots === true,
                finalFormulaShapeOwnsObjectSlots: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.finalFormulaShapeOwnsObjectSlots === true,
                participantRouteFrameKind: compoundObjectRouteResult.grammarFrame?.participantFrame?.sourceRouteFrame?.kind || "",
                participantOwnershipKind: compoundObjectRouteResult.grammarFrame?.participantFrame?.objectSlotOwnership?.kind || "",
                participantMatrixValenceFrameFixed: compoundObjectRouteResult.grammarFrame?.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
            },
            unresolvedRouteFrame: {
                matrixValence: unresolvedGeneratedCompoundRouteFrame?.matrixValence || "",
                matrixValenceFrameFixed: unresolvedGeneratedCompoundRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
                routeFrameOwnsObjectSlotLicensing: unresolvedGeneratedCompoundRouteFrame?.objectSlotOwnership?.routeFrameOwnsObjectSlotLicensing === true,
                matrixValenceFrameMustBeFixed: unresolvedGeneratedCompoundRouteFrame?.objectSlotOwnership?.matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership === true,
                routeLicensesObjectSlotOwnership: unresolvedGeneratedCompoundRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
                finalShapeDoesNotLicenseObjectSlots: unresolvedGeneratedCompoundRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
                functionUseDoesNotLicenseObjectSlots: unresolvedGeneratedCompoundRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
            },
        },
        {
            kind: "compound-frame",
            lessonRange: "28,30",
            matrixStem: "kwi",
            embedRoles: ["outer-lexical"],
            embedValues: ["shuchi"],
            rawInput: "(shuchi)-(kwi)",
            routeFrameKind: "generated-compound-route-frame",
            routeFrameShape: "compound-verbstem-adjacent-embed-before-matrix",
            routeFrameEmbedRole: "outer-lexical",
            routeFrameMatrixValence: "transitive",
            routeFrameSourceSurface: "(shuchi)-(kwi)",
            routeFrameRouteLicensesRole: true,
            routeFrameShapeDoesNotLicenseRole: true,
            routeFrameOwnershipKind: "generated-compound-object-slot-ownership-frame",
            routeFrameMatrixValenceFrameFixed: true,
            routeFrameLicensesObjectSlots: true,
            routeFrameShapeDoesNotLicenseObjectSlots: true,
            routeFrameFunctionUseDoesNotLicenseObjectSlots: true,
            grammarSourceRouteFrameKind: "generated-compound-route-frame",
            grammarStemRouteFrameKind: "generated-compound-route-frame",
            grammarMorphRouteFrameKind: "generated-compound-route-frame",
            grammarParticipantRouteFrameKind: "generated-compound-route-frame",
            grammarParticipantOwnershipKind: "generated-compound-object-slot-ownership-frame",
            grammarParticipantMatrixValenceFrameFixed: true,
            grammarParticipantFunctionUseDoesNotLicenseObjectSlots: true,
            changesSurfaceForms: false,
            forms: ["nishuchikwi"],
            objectRoute: {
                forms: ["niatakwi"],
                routeFrameKind: "generated-compound-route-frame",
                routeFrameShape: "compound-verbstem-marked-boundary",
                objectSlotPrefixes: [["obj1", "ta", "compound-valency"]],
                ownershipKind: "generated-compound-object-slot-ownership-frame",
                sourceExternalObjectSlotsOwnedBy: "source-compound-route-frame",
                remainingExternalObjectSlotsOwnedBy: "matrix-route-frame",
                matrixValenceFrameFixed: true,
                functionUseOwnsObjectSlots: false,
                finalFormulaShapeOwnsObjectSlots: false,
                participantRouteFrameKind: "generated-compound-route-frame",
                participantOwnershipKind: "generated-compound-object-slot-ownership-frame",
                participantMatrixValenceFrameFixed: true,
            },
            unresolvedRouteFrame: {
                matrixValence: "",
                matrixValenceFrameFixed: false,
                routeFrameOwnsObjectSlotLicensing: false,
                matrixValenceFrameMustBeFixed: true,
                routeLicensesObjectSlotOwnership: false,
                finalShapeDoesNotLicenseObjectSlots: true,
                functionUseDoesNotLicenseObjectSlots: true,
            },
        }
    );
    const sentenceLayerResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
                sentenceLayer: {
                    enabled: true,
                    polarity: "negative",
                    questionType: "yes-no",
                    moodScope: "command",
                },
            },
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "",
            tronco: "(nemi)",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "optativo",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "sentence layer opt-in adds diagnostic metadata without changing VNC output",
        {
            forms: sentenceLayerResult.surfaceForms,
            sentenceKind: sentenceLayerResult.sentenceLayer?.kind,
            polarity: sentenceLayerResult.sentenceLayer?.slots?.polarity?.value,
            question: sentenceLayerResult.sentenceLayer?.slots?.question?.value,
            mood: sentenceLayerResult.sentenceLayer?.slots?.mood?.value,
            changesFiniteVncOutput: sentenceLayerResult.sentenceLayer?.boundaries?.changesFiniteVncOutput,
        },
        {
            forms: ["shinemi"],
            sentenceKind: "sentence-layer-metadata",
            polarity: "negative",
            question: "yes-no",
            mood: "command",
            changesFiniteVncOutput: false,
        }
    );

    return s;
}

module.exports = { run };
