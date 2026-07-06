"use strict";

/**
 * Tests for src/core/output/surface.js
 * Covers: buildSurfaceChainState, getSurfaceChainSegmentValue, cloneSurfaceChainState,
 *         joinSurfaceChain, realizeSurfaceChain, endsWithAny.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("surface");

    // endsWithAny — utility: checks if value ends with any suffix in the array
    s.ok("endsWithAny: nemi ends in i", ctx.endsWithAny("nemi", ["i", "a"]));
    s.no("endsWithAny: kisa doesn't end in u/e", ctx.endsWithAny("kisa", ["u", "e"]));
    s.no("endsWithAny: empty suffix list = false", ctx.endsWithAny("nem", []));

    // buildSurfaceChainState — creates a chain with named slots
    const chain = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.eq("chain: tronco slot", ctx.getSurfaceChainSegmentValue(chain, "tronco"), "chiwa");
    s.eq("chain: pers1 slot", ctx.getSurfaceChainSegmentValue(chain, "pers1"), "ni");
    s.eq("chain: obj1 slot", ctx.getSurfaceChainSegmentValue(chain, "obj1"), "ki");
    s.eq("chain: empty slot = empty string", ctx.getSurfaceChainSegmentValue(chain, "poseedor"), "");
    const canonicalChain = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.eq("chain: pers1 slot", ctx.getSurfaceChainSegmentValue(canonicalChain, "pers1"), "ni");
    s.eq("chain: obj1 slot", ctx.getSurfaceChainSegmentValue(canonicalChain, "obj1"), "ki");
    s.eq("chain: tronco slot", ctx.getSurfaceChainSegmentValue(canonicalChain, "tronco"), "chiwa");

    // cloneSurfaceChainState — deep copy
    const original = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    const cloned = ctx.cloneSurfaceChainState(original);
    s.eq("clone: tronco preserved", ctx.getSurfaceChainSegmentValue(cloned, "tronco"), "nemi");
    s.ok("clone: is distinct object", cloned !== original);

    // joinSurfaceChain — concatenates all non-empty segments
    const joined = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.eq("join: ni+ki+chiwa = nikichiwa", ctx.joinSurfaceChain(joined), "nikichiwa");

    const intrans = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    s.eq("join: ni+nemi = ninemi", ctx.joinSurfaceChain(intrans), "ninemi");
    s.eq(
        "join: direct segment-only legacy chain without render frame blocks",
        ctx.joinSurfaceChain({
            segments: [
                { role: "pers1", slot: "pers1", value: "ni" },
                { role: "tronco", slot: "tronco", value: "nemi" },
            ],
        }),
        ""
    );
    const staleRenderChain = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    staleRenderChain.segments[1].value = "hostile";
    s.eq(
        "join: stale render frame blocks changed segment strings",
        ctx.joinSurfaceChain(staleRenderChain),
        ""
    );
    const displayPoisonedRenderChain = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    displayPoisonedRenderChain.surface = "hostile-surface";
    displayPoisonedRenderChain.result = "hostile-result";
    displayPoisonedRenderChain.surfaceForms = ["hostile-a / hostile-b"];
    displayPoisonedRenderChain.formulaEcho = "#hostile#";
    s.eq(
        "join: display strings cannot override typed render frame",
        ctx.joinSurfaceChain(displayPoisonedRenderChain),
        "ninemi"
    );

    // realizeSurfaceChain — applies phonological assimilation rules
    // k-elision before vowel-initial tronco (ki + itta → kitta)
    const kVowel = ctx.buildSurfaceChainState({ pers1: "ni", obj1: "k", tronco: "itta" });
    s.eq("realize: ni+k+itta → nikitta", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(kVowel)), "nikitta");

    // simple intransitive — no rules triggered
    const simple = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "nemi" });
    s.eq("realize: ni+nemi unchanged", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(simple)), "ninemi");

    // normalizeSupportiveMarkerValue — pure string normalization
    s.eq("normalize 'i' → 'i'", ctx.normalizeSupportiveMarkerValue("i"), "i");
    s.eq("normalize 'y' → 'y'", ctx.normalizeSupportiveMarkerValue("y"), "y");
    s.eq("normalize 'I' → 'i' (case-insensitive)", ctx.normalizeSupportiveMarkerValue("I"), "i");
    s.eq("normalize 'Y' → 'y' (case-insensitive)", ctx.normalizeSupportiveMarkerValue("Y"), "y");
    s.eq("normalize unknown → ''", ctx.normalizeSupportiveMarkerValue("x"), "");
    s.eq("normalize empty → ''", ctx.normalizeSupportiveMarkerValue(""), "");

    // hasSupportiveMarkerValue — boolean wrapper
    s.ok("hasSupportiveMarkerValue 'i' = true", ctx.hasSupportiveMarkerValue("i"));
    s.ok("hasSupportiveMarkerValue 'y' = true", ctx.hasSupportiveMarkerValue("y"));
    s.no("hasSupportiveMarkerValue '' = false", ctx.hasSupportiveMarkerValue(""));
    s.no("hasSupportiveMarkerValue 'x' = false", ctx.hasSupportiveMarkerValue("x"));

    // buildOutputWordText — full surface realization to string
    s.eq("output: ni+nemi = ninemi", ctx.buildOutputWordText({ pers1: "ni", tronco: "nemi" }), "ninemi");
    s.eq("output: ni+ki+chiwa = nikichiwa", ctx.buildOutputWordText({ pers1: "ni", obj1: "ki", tronco: "chiwa" }), "nikichiwa");
    s.eq("output: pers1+tronco = ninemi", ctx.buildOutputWordText({ pers1: "ni", tronco: "nemi" }), "ninemi");
    s.eq("output: pers1+obj1+tronco = nikichiwa", ctx.buildOutputWordText({ pers1: "ni", obj1: "ki", tronco: "chiwa" }), "nikichiwa");
    const outputWordResult = ctx.buildOutputWordResult({ pers1: "ni", tronco: "nemi" });
    const canonicalOutputWordResult = ctx.buildOutputWordResult({ pers1: "ni", obj1: "ki", tronco: "chiwa" });
    s.ok("output word result exposes grammar frame", outputWordResult.grammarFrame);
    s.eq("output word result contract surface", outputWordResult.surface, "ninemi");
    s.eq("canonical output word result contract surface", canonicalOutputWordResult.surface, "nikichiwa");
    s.eq(
        "output word result route is output-surface",
        outputWordResult.grammarFrame.routeContract.routeFamily,
        "output-surface"
    );
    s.eq(
        "output word result records result-frame surface",
        outputWordResult.grammarFrame.resultFrame.surface,
        "ninemi"
    );
    s.eq(
        "output word result records participant pers1",
        outputWordResult.grammarFrame.participantFrame.pers1,
        "ni"
    );
    s.eq(
        "output word result records pers1-pers2 primary slot",
        canonicalOutputWordResult.grammarFrame.participantFrame.pers1Pers2,
        { prefix: "ni", suffix: "" }
    );
    s.eq(
        "output word result records obj1 primary slot",
        canonicalOutputWordResult.grammarFrame.participantFrame.obj1,
        { prefix: "ki" }
    );
    s.eq(
        "output word result records tronco in nuclear clause",
        canonicalOutputWordResult.grammarFrame.nuclearClauseFrame.tronco,
        "chiwa"
    );
    const supportiveYSourceFrame = ctx.buildOptionalSupportiveOutputVerbSourceFrame({
        pers1: "ni",
        tronco: "yawi",
        hasOptionalSupportiveI: true,
        optionalSupportiveLetter: "y",
    });
    const supportiveYOperationFrame = ctx.buildOptionalSupportiveOutputVerbOperationFrame(supportiveYSourceFrame);
    const supportiveYOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        tronco: "yawi",
        hasOptionalSupportiveI: true,
        optionalSupportiveLetter: "y",
    });
    const supportiveYFrames = supportiveYOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames
        .filter((frame) => frame.kind === "andrews-optional-supportive-output-verb-operation-frame");
    s.eq(
        "optional supportive-y live output uses typed frame before rendering",
        {
            surface: supportiveYOutput.surface,
            sourceStem: supportiveYFrames[0]?.sourceFrame?.sourceStem || "",
            markedStem: supportiveYFrames[0]?.targetFrame?.markedStem || "",
            targetStem: supportiveYFrames[0]?.targetFrame?.targetStem || "",
            markerOp: supportiveYFrames[0]?.markedSurfaceOperationFrame?.kind || "",
        },
        {
            surface: "niawi",
            sourceStem: "yawi",
            markedStem: "[y]awi",
            targetStem: "awi",
            markerOp: "andrews-optional-supportive-marked-surface-operation-frame",
        }
    );
    s.eq(
        "optional supportive-y direct output API without frames is blocked",
        ctx.resolveOptionalSupportiveOutputVerb({
            pers1: "ni",
            tronco: "yawi",
            hasOptionalSupportiveI: true,
            optionalSupportiveLetter: "y",
        }),
        "yawi"
    );
    s.eq(
        "optional supportive-y direct marked-surface API without frames is blocked",
        ctx.resolveOptionalSupportiveMarkedSurface({
            precedingSurface: "ni",
            markedSurface: "[y]awi",
        }),
        {
            markerLetter: "y",
            envelopeMarkedSurface: "[y]awi",
            plainSurface: "",
            outputSurface: "",
            supported: false,
            diagnostics: ["missing-optional-supportive-marked-surface-source-frame", "missing-optional-supportive-marked-surface-operation-frame"],
        }
    );
    s.eq(
        "optional supportive-y missing operation frame blocks",
        ctx.resolveOptionalSupportiveOutputVerb({
            pers1: "ni",
            tronco: "yawi",
            hasOptionalSupportiveI: true,
            optionalSupportiveLetter: "y",
            optionalSupportiveSourceFrame: supportiveYSourceFrame,
        }),
        "yawi"
    );
    const contradictorySupportiveYOperationFrame = {
        ...supportiveYOperationFrame,
        targetFrame: {
            ...supportiveYOperationFrame.targetFrame,
            targetStem: "hostile",
        },
    };
    s.eq(
        "optional supportive-y contradictory target frame blocks",
        ctx.resolveOptionalSupportiveOutputVerb({
            pers1: "ni",
            tronco: "yawi",
            hasOptionalSupportiveI: true,
            optionalSupportiveLetter: "y",
            optionalSupportiveSourceFrame: supportiveYSourceFrame,
            optionalSupportiveOperationFrame: contradictorySupportiveYOperationFrame,
        }),
        "yawi"
    );
    s.eq(
        "optional supportive-y ignores poisoned display strings when frames match",
        ctx.resolveOptionalSupportiveOutputVerb({
            pers1: "ni",
            tronco: "yawi",
            hasOptionalSupportiveI: true,
            optionalSupportiveLetter: "y",
            optionalSupportiveSourceFrame: supportiveYSourceFrame,
            optionalSupportiveOperationFrame: supportiveYOperationFrame,
            surface: "hostile-surface",
            result: "hostile-result",
            surfaceForms: ["hostile-a / hostile-b"],
            formulaEcho: "#hostile#",
        }),
        "awi"
    );
    const framedOutputSurface = ctx.attachOutputSurfaceGrammarContract({
        result: "stale-output-result",
        surface: "stale-output-surface",
        surfaceForms: ["stale-output-a / stale-output-b"],
        segments: [],
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surfaceForms: ["frame-output-a", "frame-output-b"],
                outputKind: "output-surface",
                generationRoute: "test-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-surface",
        routeStage: "test-frame-reader",
        surface: "stale-output-fallback",
    });
    s.eq(
        "output surface contract reads LCM result-frame primary surface",
        framedOutputSurface.surface,
        "frame-output-a"
    );
    s.eq(
        "output surface contract reads structured LCM result-frame surface forms",
        framedOutputSurface.surfaceForms,
        ["frame-output-a", "frame-output-b"]
    );
    s.eq(
        "output surface contract records structured result-frame surface forms",
        framedOutputSurface.grammarFrame.resultFrame.surfaceForms,
        ["frame-output-a", "frame-output-b"]
    );
    const slashJoinedFramedOutputSurface = ctx.attachOutputSurfaceGrammarContract({
        result: "stale-slash-result-a / stale-slash-result-b",
        surface: "stale-slash-surface",
        surfaceForms: ["stale-slash-top-a / stale-slash-top-b"],
        segments: [],
        grammarFrame: {
            resultFrame: {
                kind: "grammar-result-frame",
                ok: true,
                surfaceForms: ["frame-slash-output-a / frame-slash-output-b"],
                outputKind: "output-surface",
                generationRoute: "test-slash-frame-reader",
            },
        },
    }, {
        metadataKind: "output-surface",
        routeStage: "test-slash-frame-reader",
        surface: "stale-slash-fallback",
    });
    s.eq(
        "output surface contract blocks slash-joined result-frame forms instead of splitting display strings",
        {
            ok: slashJoinedFramedOutputSurface.ok,
            surface: slashJoinedFramedOutputSurface.surface,
            surfaceForms: slashJoinedFramedOutputSurface.surfaceForms,
            frameSurfaceForms: slashJoinedFramedOutputSurface.grammarFrame.resultFrame.surfaceForms,
        },
        {
            ok: false,
            surface: "",
            surfaceForms: [],
            frameSurfaceForms: [],
        }
    );
    const hostileOutputFormulaRecord = ctx.buildGrammarFormulaRecord({
        id: "hostile-output-formula",
        unit: "CNV",
        formula: "#ni-0(hostile)0#",
        formulaSlots: {
            predicateStem: { slot: "STEM", stem: "hostile" },
        },
    });
    const hostileOutputRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
        id: "hostile-output-realization",
        formulaRecord: hostileOutputFormulaRecord,
        segmentFrames: [
            { slot: "predicateStem", formulaValue: "hostile", surface: "canonical-output" },
        ],
        surfaceForms: ["canonical-output"],
    });
    const hostileFramedOutputSurface = ctx.attachOutputSurfaceGrammarContract({
        result: "top-output-lie",
        surface: "top-output-surface-lie",
        surfaceForms: ["top-output-a / top-output-b"],
        segments: [],
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: {
                ok: true,
                surface: "frame-output-surface-lie",
                surfaceForms: ["frame-output-a / frame-output-b"],
                formulaRecord: hostileOutputFormulaRecord,
                formulaRecords: [hostileOutputFormulaRecord],
                formulaRealizationRecord: hostileOutputRealizationRecord,
                formulaRealizationRecords: [hostileOutputRealizationRecord],
            },
        }),
    }, {
        metadataKind: "output-surface",
        routeStage: "test-canonical-realization-reader",
        surface: "fallback-output-lie",
    });
    s.eq(
        "output surface contract reads canonical realization before stale result-frame strings",
        {
            surface: hostileFramedOutputSurface.surface,
            surfaceForms: hostileFramedOutputSurface.surfaceForms,
            frameSurfaceForms: hostileFramedOutputSurface.grammarFrame.resultFrame.surfaceForms,
        },
        {
            surface: "canonical-output",
            surfaceForms: ["canonical-output"],
            frameSurfaceForms: ["canonical-output"],
        }
    );
    const blockedFramedOutputSurface = ctx.attachOutputSurfaceGrammarContract({
        result: "stale-blocked-output-result",
        surface: "stale-blocked-output-surface",
        surfaceForms: ["stale-blocked-output-a"],
        segments: ctx.buildOutputWordSegments({ pers1: "ni", tronco: "nemi" }),
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: false,
                surface: "",
                surfaceForms: [],
                outputKind: "output-surface",
                generationRoute: "test-blocked-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-surface",
        routeStage: "test-blocked-frame-reader",
        surface: "stale-blocked-output-fallback",
    });
    s.eq(
        "blocked output result frame suppresses stale surface fallbacks",
        {
            ok: blockedFramedOutputSurface.ok,
            surface: blockedFramedOutputSurface.surface,
            surfaceForms: blockedFramedOutputSurface.surfaceForms,
        },
        {
            ok: false,
            surface: "",
            surfaceForms: [],
        }
    );
    s.no(
        "output word result grammar frame is non-enumerable",
        Object.prototype.propertyIsEnumerable.call(outputWordResult, "grammarFrame")
    );
    const nominalOutputResult = ctx.buildNominalOutputResult({
        pers1: "ni",
        tronco: "nemi",
        sufijoNominal: "t",
    });
    s.eq("nominal output result contract surface", nominalOutputResult.surface, "ninemit");
    s.eq(
        "nominal output accepts canonicalpers1/tronco/sufijo",
        ctx.buildNominalOutputResult({ pers1: "ni", tronco: "nemi", sufijoNominal: "t" }).surface,
        "ninemit"
    );
    s.eq(
        "nominal output result records sufijoNominal",
        nominalOutputResult.grammarFrame.inflectionFrame.sufijoNominal,
        "t"
    );
    s.eq(
        "output surface records Lesson 2 num2 sound-spelling frame",
        (() => {
            const pluralOutput = ctx.buildOutputWordResult({ pers1: "ti", tronco: "nemi", pers2: "t" });
            return {
                surface: pluralOutput.surface,
                frames: pluralOutput.grammarFrame.orthographyFrame.soundSpellingFrames.map((frame) => ({
                    ruleId: frame.ruleId,
                    sourceSurface: frame.sourceSurface,
                    target: frame.target,
                    grammarSlot: frame.grammarSlot,
                    ruleScope: frame.ruleScope,
                    generationAllowed: frame.generationAllowed,
                })),
            };
        })(),
        {
            surface: "tinemit",
            frames: [{
                ruleId: "h-num2-t",
                sourceSurface: "-h",
                target: "-t",
                grammarSlot: "num2",
                ruleScope: "graphic-representation",
                generationAllowed: false,
            }],
        }
    );
    s.eq(
        "nominal output surface records Lesson 2 nominal connector sound-spelling frame",
        nominalOutputResult.grammarFrame.orthographyFrame.soundSpellingFrames.map((frame) => ({
            ruleId: frame.ruleId,
            sourceSurface: frame.sourceSurface,
            target: frame.target,
            grammarSlot: frame.grammarSlot,
            ruleScope: frame.ruleScope,
        })),
        [{
            ruleId: "tl-nominal-t",
            sourceSurface: "-tl",
            target: "-t",
            grammarSlot: "sufijo-nominal",
            ruleScope: "graphic-representation",
        }]
    );
    // m→n coda assimilation: [m] in coda position (before any consonant onset or word-finally) → [n]
    const mFinal = ctx.buildSurfaceChainState({ pers1: "ni", tronco: "chinam" });
    s.eq("realize: coda m → n (word-final)", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(mFinal)), "nichinan");
    const mBeforeVowel = ctx.buildSurfaceChainState({ obj1: "m", tronco: "altia" });
    s.eq("realize: obj1 m stays m before vowel-initial tronco", ctx.joinSurfaceChain(ctx.realizeSurfaceChain(mBeforeVowel)), "maltia");
    s.eq("output: mu+ajsi = muajsi", ctx.buildOutputWordText({ obj1: "mu", tronco: "ajsi" }), "muajsi");
    s.eq("output: m+altia = maltia", ctx.buildOutputWordText({ obj1: "m", tronco: "altia" }), "maltia");
    s.eq(
        "surface chain records Lesson 2 phonotactic frames for realized output changes",
        (() => {
            const outputs = [
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "chinam" }),
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "takw" }),
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "tay" }),
                ctx.buildOutputWordResult({ pers1: "ni", tronco: "ita" }),
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    obj1: "ki",
                    tronco: "ita",
                    surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
                }),
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    tronco: "nemia",
                    surfaceRuleMeta: { trimFinalIAUAVowel: true },
                }),
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    obj1: "mu",
                    tronco: "iskalia",
                    surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
                }),
            ];
            return outputs.map((output) => {
                const frame = output.grammarFrame.orthographyFrame.soundSpellingFrames[0] || {};
                return {
                    surface: output.surface,
                    ruleId: frame.ruleId || "",
                    sourceSurface: frame.sourceSurface || "",
                    target: frame.target,
                    grammarSlot: frame.grammarSlot || "",
                    ruleScope: frame.ruleScope || "",
                    andrewsProcess: frame.andrewsProcess || "",
                    spanishProcess: frame.spanishProcess || "",
                    sourceProfileId: frame.sourceProfileId || "",
                    targetProfileId: frame.targetProfileId || "",
                    sourceSegmentValue: frame.sourceSegmentValue || "",
                    targetSegmentValue: frame.targetSegmentValue || "",
                };
            });
        })(),
        [
            {
                surface: "nichinan",
                ruleId: "m-coda-n",
                sourceSurface: "m",
                target: "n",
                grammarSlot: "tronco",
                ruleScope: "assimilation-or-consonant-phone-shift",
                andrewsProcess: "Regressive Assimilation / Consonant-Phone Shift Other Than Assimilation",
                spanishProcess: "asimilación regresiva / cambio consonántico",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "chinam",
                targetSegmentValue: "chinan",
            },
            {
                surface: "nitak",
                ruleId: "kw-coda-k",
                sourceSurface: "kw",
                target: "k",
                grammarSlot: "tronco",
                ruleScope: "consonant-phone-shift",
                andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
                spanishProcess: "cambio consonántico",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "takw",
                targetSegmentValue: "tak",
            },
            {
                surface: "nitash",
                ruleId: "y-coda-sh",
                sourceSurface: "y",
                target: "sh",
                grammarSlot: "tronco",
                ruleScope: "consonant-phone-shift",
                andrewsProcess: "Consonant-Phone Shift Other Than Assimilation",
                spanishProcess: "cambio consonántico",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "tay",
                targetSegmentValue: "tash",
            },
            {
                surface: "nita",
                ruleId: "pers1-ni-i-n",
                sourceSurface: "ni",
                target: "n",
                grammarSlot: "pers1",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "ni",
                targetSegmentValue: "n",
            },
            {
                surface: "nikita",
                ruleId: "object-i-stem-i-elision",
                sourceSurface: "i",
                target: "",
                grammarSlot: "stem-initial",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "ita",
                targetSegmentValue: "ta",
            },
            {
                surface: "ninemi",
                ruleId: "stem-final-a-elision",
                sourceSurface: "a",
                target: "",
                grammarSlot: "stem-final",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "nemia",
                targetSegmentValue: "nemi",
            },
            {
                surface: "nimuskalia",
                ruleId: "mu-iskalia-i-elision",
                sourceSurface: "i",
                target: "",
                grammarSlot: "stem-initial",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                spanishProcess: "elisión vocálica",
                sourceProfileId: "nawat-modern",
                targetProfileId: "nawat-modern",
                sourceSegmentValue: "iskalia",
                targetSegmentValue: "skalia",
            },
        ]
    );
    const subjectIInitialReductionOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        tronco: "ita",
    });
    const subjectIInitialReductionOperationFrame = subjectIInitialReductionOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "subject-I stem-I reduction carries typed operation frame through output contract",
        {
            surface: subjectIInitialReductionOutput.surface,
            operationKind: subjectIInitialReductionOperationFrame.kind || "",
            sourceKind: subjectIInitialReductionOperationFrame.sourceFrame?.kind || "",
            subjectPrefix: subjectIInitialReductionOperationFrame.sourceFrame?.subjectPrefix || "",
            sourceStem: subjectIInitialReductionOperationFrame.sourceFrame?.sourceStem || "",
            targetPrefix: subjectIInitialReductionOperationFrame.targetFrame?.targetPrefix || "",
            excluded: subjectIInitialReductionOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "nita",
            operationKind: "andrews-surface-chain-subject-i-initial-reduction-operation-frame",
            sourceKind: "surface-chain-subject-i-initial-reduction-source-frame",
            subjectPrefix: "ni",
            sourceStem: "ita",
            targetPrefix: "n",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "subject-I stem-I reduction direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainSubjectIInitialReduction({
            segments: [
                { role: "pers1", slot: "pers1", value: "ni" },
                { role: "tronco", slot: "tronco", value: "ita" },
            ],
            soundSpellingFrames: [],
        })),
        "niita"
    );
    const missingSubjectIOperation = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "ita",
    });
    missingSubjectIOperation.surfaceOperationFrames = [];
    s.eq(
        "subject-I stem-I reduction missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainSubjectIInitialReduction(missingSubjectIOperation)),
        "niita"
    );
    const contradictorySubjectIReduction = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "ita",
    });
    contradictorySubjectIReduction.surfaceOperationFrames[0].targetFrame.targetPrefix = "display-lie";
    s.eq(
        "subject-I stem-I reduction contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainSubjectIInitialReduction(contradictorySubjectIReduction)),
        "niita"
    );
    const changedSubjectIReduction = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "ita",
    });
    ctx.setSurfaceChainSegmentValue(changedSubjectIReduction, "tronco", "nemi");
    s.eq(
        "subject-I stem-I reduction changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainSubjectIInitialReduction(changedSubjectIReduction)),
        "ninemi"
    );
    const poisonedSubjectIReduction = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "ita",
    });
    poisonedSubjectIReduction.surface = "surface-lie";
    poisonedSubjectIReduction.result = "result-lie";
    poisonedSubjectIReduction.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedSubjectIReduction.formulaEcho = "#lie#";
    s.eq(
        "subject-I stem-I reduction ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainSubjectIInitialReduction(poisonedSubjectIReduction)),
        "nita"
    );
    const optativeKiReductionOutput = ctx.buildOutputWordResult({
        pers1: "shi",
        obj1: "ki",
        tronco: "chiwa",
        surfaceRuleMeta: { optativeKiReduction: true },
    });
    const optativeKiReductionOperationFrame = optativeKiReductionOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "optative ki reduction carries typed operation frame through output contract",
        {
            surface: optativeKiReductionOutput.surface,
            operationKind: optativeKiReductionOperationFrame.kind || "",
            sourceKind: optativeKiReductionOperationFrame.sourceFrame?.kind || "",
            objectPrefix: optativeKiReductionOperationFrame.sourceFrame?.objectPrefix || "",
            nextSegmentValue: optativeKiReductionOperationFrame.sourceFrame?.nextSegmentValue || "",
            targetObjectPrefix: optativeKiReductionOperationFrame.targetFrame?.targetObjectPrefix || "",
            excluded: optativeKiReductionOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "shikchiwa",
            operationKind: "andrews-surface-chain-optative-ki-reduction-operation-frame",
            sourceKind: "surface-chain-optative-ki-reduction-source-frame",
            objectPrefix: "ki",
            nextSegmentValue: "chiwa",
            targetObjectPrefix: "k",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "optative ki reduction direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainOptativeKiReduction({
            surfaceRuleMeta: { optativeKiReduction: true },
            segments: [
                { role: "pers1", slot: "pers1", value: "shi" },
                { role: "obj1", slot: "obj1", value: "ki" },
                { role: "tronco", slot: "tronco", value: "chiwa" },
            ],
            soundSpellingFrames: [],
        })),
        "shikichiwa"
    );
    const missingOptativeKiOperation = ctx.buildSurfaceChainState({
        pers1: "shi",
        obj1: "ki",
        tronco: "chiwa",
        surfaceRuleMeta: { optativeKiReduction: true },
    });
    missingOptativeKiOperation.surfaceOperationFrames = [];
    s.eq(
        "optative ki reduction missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainOptativeKiReduction(missingOptativeKiOperation)),
        "shikichiwa"
    );
    const contradictoryOptativeKiReduction = ctx.buildSurfaceChainState({
        pers1: "shi",
        obj1: "ki",
        tronco: "chiwa",
        surfaceRuleMeta: { optativeKiReduction: true },
    });
    contradictoryOptativeKiReduction.surfaceOperationFrames[0].targetFrame.targetObjectPrefix = "display-lie";
    s.eq(
        "optative ki reduction contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainOptativeKiReduction(contradictoryOptativeKiReduction)),
        "shikichiwa"
    );
    const changedOptativeKiReduction = ctx.buildSurfaceChainState({
        pers1: "shi",
        obj1: "ki",
        tronco: "chiwa",
        surfaceRuleMeta: { optativeKiReduction: true },
    });
    ctx.setSurfaceChainSegmentValue(changedOptativeKiReduction, "tronco", "talia");
    s.eq(
        "optative ki reduction changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainOptativeKiReduction(changedOptativeKiReduction)),
        "shikitalia"
    );
    const poisonedOptativeKiReduction = ctx.buildSurfaceChainState({
        pers1: "shi",
        obj1: "ki",
        tronco: "chiwa",
        surfaceRuleMeta: { optativeKiReduction: true },
    });
    poisonedOptativeKiReduction.surface = "surface-lie";
    poisonedOptativeKiReduction.result = "result-lie";
    poisonedOptativeKiReduction.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedOptativeKiReduction.formulaEcho = "#lie#";
    s.eq(
        "optative ki reduction ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainOptativeKiReduction(poisonedOptativeKiReduction)),
        "shikchiwa"
    );
    const kContactOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        obj1: "k",
        tronco: "kisa",
    });
    const kContactOperationFrame = kContactOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "k-contact reduction carries typed operation frame through output contract",
        {
            surface: kContactOutput.surface,
            operationKind: kContactOperationFrame.kind || "",
            sourceKind: kContactOperationFrame.sourceFrame?.kind || "",
            objectPrefix: kContactOperationFrame.sourceFrame?.objectPrefix || "",
            sourceStem: kContactOperationFrame.sourceFrame?.sourceStem || "",
            kContactKind: kContactOperationFrame.sourceFrame?.kContactKind || "",
            targetObjectPrefix: kContactOperationFrame.targetFrame?.targetObjectPrefix || "",
            targetStem: kContactOperationFrame.targetFrame?.targetStem || "",
            excluded: kContactOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "nikisa",
            operationKind: "andrews-surface-chain-k-contact-operation-frame",
            sourceKind: "surface-chain-k-contact-source-frame",
            objectPrefix: "k",
            sourceStem: "kisa",
            kContactKind: "k-before-k",
            targetObjectPrefix: "k",
            targetStem: "isa",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    const kwContactOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        obj1: "k",
        tronco: "kwali",
    });
    const kwContactOperationFrame = kwContactOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "k-contact before kw carries typed branch target",
        {
            surface: kwContactOutput.surface,
            kContactKind: kwContactOperationFrame.sourceFrame?.kContactKind || "",
            targetObjectPrefix: kwContactOperationFrame.targetFrame?.targetObjectPrefix ?? "",
            targetStem: kwContactOperationFrame.targetFrame?.targetStem || "",
        },
        {
            surface: "nikwali",
            kContactKind: "k-before-kw",
            targetObjectPrefix: "",
            targetStem: "kwali",
        }
    );
    s.eq(
        "k-contact direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKContact({
            segments: [
                { role: "pers1", slot: "pers1", value: "ni" },
                { role: "obj1", slot: "obj1", value: "k" },
                { role: "tronco", slot: "tronco", value: "kisa" },
            ],
            soundSpellingFrames: [],
        })),
        "nikkisa"
    );
    const missingKContactOperation = ctx.buildSurfaceChainState({
        pers1: "ni",
        obj1: "k",
        tronco: "kisa",
    });
    missingKContactOperation.surfaceOperationFrames = [];
    s.eq(
        "k-contact missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKContact(missingKContactOperation)),
        "nikkisa"
    );
    const contradictoryKContact = ctx.buildSurfaceChainState({
        pers1: "ni",
        obj1: "k",
        tronco: "kisa",
    });
    contradictoryKContact.surfaceOperationFrames[0].targetFrame.targetStem = "display-lie";
    s.eq(
        "k-contact contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKContact(contradictoryKContact)),
        "nikkisa"
    );
    const changedKContact = ctx.buildSurfaceChainState({
        pers1: "ni",
        obj1: "k",
        tronco: "kisa",
    });
    ctx.setSurfaceChainSegmentValue(changedKContact, "tronco", "kwali");
    s.eq(
        "k-contact changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKContact(changedKContact)),
        "nikkwali"
    );
    const poisonedKContact = ctx.buildSurfaceChainState({
        pers1: "ni",
        obj1: "k",
        tronco: "kisa",
    });
    poisonedKContact.surface = "surface-lie";
    poisonedKContact.result = "result-lie";
    poisonedKContact.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedKContact.formulaEcho = "#lie#";
    s.eq(
        "k-contact ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKContact(poisonedKContact)),
        "nikisa"
    );
    const kwCodaOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        tronco: "takw",
    });
    const kwCodaOperationFrame = kwCodaOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "kw coda coalescence carries typed operation frame through output contract",
        {
            surface: kwCodaOutput.surface,
            operationKind: kwCodaOperationFrame.kind || "",
            sourceKind: kwCodaOperationFrame.sourceFrame?.kind || "",
            segmentRole: kwCodaOperationFrame.sourceFrame?.segmentRole || "",
            sourceSegmentValue: kwCodaOperationFrame.sourceFrame?.sourceSegmentValue || "",
            targetSegmentValue: kwCodaOperationFrame.targetFrame?.targetSegmentValue || "",
            sourceCoda: kwCodaOperationFrame.targetFrame?.sourceCoda || "",
            targetCoda: kwCodaOperationFrame.targetFrame?.targetCoda || "",
            excluded: kwCodaOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "nitak",
            operationKind: "andrews-surface-chain-kw-coda-coalescence-operation-frame",
            sourceKind: "surface-chain-kw-coda-coalescence-source-frame",
            segmentRole: "tronco",
            sourceSegmentValue: "takw",
            targetSegmentValue: "tak",
            sourceCoda: "kw",
            targetCoda: "k",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "kw coda coalescence direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKwCoalescence({
            segments: [
                { role: "pers1", slot: "pers1", value: "ni" },
                { role: "tronco", slot: "tronco", value: "takw" },
            ],
            soundSpellingFrames: [],
        })),
        "nitakw"
    );
    const missingKwCodaOperation = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "takw",
    });
    missingKwCodaOperation.surfaceOperationFrames = [];
    s.eq(
        "kw coda coalescence missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKwCoalescence(missingKwCodaOperation)),
        "nitakw"
    );
    const missingKwCodaSourceFrame = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "takw",
    });
    delete missingKwCodaSourceFrame.surfaceOperationFrames[0].sourceFrame;
    s.eq(
        "kw coda coalescence missing source frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKwCoalescence(missingKwCodaSourceFrame)),
        "nitakw"
    );
    const missingKwCodaTargetFrame = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "takw",
    });
    delete missingKwCodaTargetFrame.surfaceOperationFrames[0].targetFrame;
    s.eq(
        "kw coda coalescence missing target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKwCoalescence(missingKwCodaTargetFrame)),
        "nitakw"
    );
    const contradictoryKwCoda = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "takw",
    });
    contradictoryKwCoda.surfaceOperationFrames[0].targetFrame.targetSegmentValue = "display-lie";
    s.eq(
        "kw coda coalescence contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKwCoalescence(contradictoryKwCoda)),
        "nitakw"
    );
    const changedKwCoda = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "takw",
    });
    ctx.setSurfaceChainSegmentValue(changedKwCoda, "tronco", "pikw");
    s.eq(
        "kw coda coalescence changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKwCoalescence(changedKwCoda)),
        "nipikw"
    );
    const poisonedKwCoda = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "takw",
    });
    poisonedKwCoda.surface = "surface-lie";
    poisonedKwCoda.result = "result-lie";
    poisonedKwCoda.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedKwCoda.formulaEcho = "#lie#";
    s.eq(
        "kw coda coalescence ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainKwCoalescence(poisonedKwCoda)),
        "nitak"
    );
    const nhBeforeVowelOutput = ctx.buildOutputWordResult({
        obj1: "tan",
        tronco: "ajsi",
    });
    const nhBeforeVowelOperationFrame = nhBeforeVowelOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "nh before vowel carries typed operation frame through output contract",
        {
            surface: nhBeforeVowelOutput.surface,
            operationKind: nhBeforeVowelOperationFrame.kind || "",
            sourceKind: nhBeforeVowelOperationFrame.sourceFrame?.kind || "",
            currentRole: nhBeforeVowelOperationFrame.sourceFrame?.currentRole || "",
            nextRole: nhBeforeVowelOperationFrame.sourceFrame?.nextRole || "",
            sourceCurrentValue: nhBeforeVowelOperationFrame.sourceFrame?.sourceCurrentValue || "",
            sourceNextValue: nhBeforeVowelOperationFrame.sourceFrame?.sourceNextValue || "",
            targetCurrentValue: nhBeforeVowelOperationFrame.targetFrame?.targetCurrentValue || "",
            sourceFinal: nhBeforeVowelOperationFrame.targetFrame?.sourceFinal || "",
            targetFinal: nhBeforeVowelOperationFrame.targetFrame?.targetFinal || "",
            excluded: nhBeforeVowelOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "tanhajsi",
            operationKind: "andrews-surface-chain-nh-before-vowel-operation-frame",
            sourceKind: "surface-chain-nh-before-vowel-source-frame",
            currentRole: "obj1",
            nextRole: "tronco",
            sourceCurrentValue: "tan",
            sourceNextValue: "ajsi",
            targetCurrentValue: "tanh",
            sourceFinal: "n",
            targetFinal: "nh",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "nh before vowel direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainNhBeforeVowel({
            segments: [
                { role: "obj1", slot: "obj1", value: "tan" },
                { role: "tronco", slot: "tronco", value: "ajsi" },
            ],
            soundSpellingFrames: [],
        })),
        "tanajsi"
    );
    const missingNhBeforeVowelOperation = ctx.buildSurfaceChainState({
        obj1: "tan",
        tronco: "ajsi",
    });
    missingNhBeforeVowelOperation.surfaceOperationFrames = [];
    s.eq(
        "nh before vowel missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainNhBeforeVowel(missingNhBeforeVowelOperation)),
        "tanajsi"
    );
    const missingNhBeforeVowelSourceFrame = ctx.buildSurfaceChainState({
        obj1: "tan",
        tronco: "ajsi",
    });
    delete missingNhBeforeVowelSourceFrame.surfaceOperationFrames[0].sourceFrame;
    s.eq(
        "nh before vowel missing source frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainNhBeforeVowel(missingNhBeforeVowelSourceFrame)),
        "tanajsi"
    );
    const missingNhBeforeVowelTargetFrame = ctx.buildSurfaceChainState({
        obj1: "tan",
        tronco: "ajsi",
    });
    delete missingNhBeforeVowelTargetFrame.surfaceOperationFrames[0].targetFrame;
    s.eq(
        "nh before vowel missing target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainNhBeforeVowel(missingNhBeforeVowelTargetFrame)),
        "tanajsi"
    );
    const contradictoryNhBeforeVowel = ctx.buildSurfaceChainState({
        obj1: "tan",
        tronco: "ajsi",
    });
    contradictoryNhBeforeVowel.surfaceOperationFrames[0].targetFrame.targetCurrentValue = "display-lie";
    s.eq(
        "nh before vowel contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainNhBeforeVowel(contradictoryNhBeforeVowel)),
        "tanajsi"
    );
    const changedNhBeforeVowel = ctx.buildSurfaceChainState({
        obj1: "tan",
        tronco: "ajsi",
    });
    ctx.setSurfaceChainSegmentValue(changedNhBeforeVowel, "tronco", "chiwa");
    s.eq(
        "nh before vowel changed caller next segment cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainNhBeforeVowel(changedNhBeforeVowel)),
        "tanchiwa"
    );
    const poisonedNhBeforeVowel = ctx.buildSurfaceChainState({
        obj1: "tan",
        tronco: "ajsi",
    });
    poisonedNhBeforeVowel.surface = "surface-lie";
    poisonedNhBeforeVowel.result = "result-lie";
    poisonedNhBeforeVowel.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedNhBeforeVowel.formulaEcho = "#lie#";
    s.eq(
        "nh before vowel ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainNhBeforeVowel(poisonedNhBeforeVowel)),
        "tanhajsi"
    );
    const yCodaShiftOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        tronco: "tay",
    });
    const yCodaShiftOperationFrame = yCodaShiftOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "Y coda shift carries typed operation frame through output contract",
        {
            surface: yCodaShiftOutput.surface,
            operationKind: yCodaShiftOperationFrame.kind || "",
            sourceKind: yCodaShiftOperationFrame.sourceFrame?.kind || "",
            segmentRole: yCodaShiftOperationFrame.sourceFrame?.segmentRole || "",
            sourceSegmentValue: yCodaShiftOperationFrame.sourceFrame?.sourceSegmentValue || "",
            objectSegmentValue: yCodaShiftOperationFrame.sourceFrame?.objectSegmentValue || "",
            targetSegmentValue: yCodaShiftOperationFrame.targetFrame?.targetSegmentValue || "",
            sourceCoda: yCodaShiftOperationFrame.targetFrame?.sourceCoda || "",
            targetCoda: yCodaShiftOperationFrame.targetFrame?.targetCoda || "",
            excluded: yCodaShiftOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "nitash",
            operationKind: "andrews-surface-chain-y-coda-shift-operation-frame",
            sourceKind: "surface-chain-y-coda-shift-source-frame",
            segmentRole: "tronco",
            sourceSegmentValue: "tay",
            objectSegmentValue: "",
            targetSegmentValue: "tash",
            sourceCoda: "y",
            targetCoda: "sh",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "Y coda shift direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainYShift({
            segments: [
                { role: "pers1", slot: "pers1", value: "ni" },
                { role: "tronco", slot: "tronco", value: "tay" },
            ],
            soundSpellingFrames: [],
        })),
        "nitay"
    );
    const missingYShiftOperation = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "tay",
    });
    missingYShiftOperation.surfaceOperationFrames = [];
    s.eq(
        "Y coda shift missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainYShift(missingYShiftOperation)),
        "nitay"
    );
    const missingYShiftSourceFrame = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "tay",
    });
    delete missingYShiftSourceFrame.surfaceOperationFrames[0].sourceFrame;
    s.eq(
        "Y coda shift missing source frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainYShift(missingYShiftSourceFrame)),
        "nitay"
    );
    const missingYShiftTargetFrame = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "tay",
    });
    delete missingYShiftTargetFrame.surfaceOperationFrames[0].targetFrame;
    s.eq(
        "Y coda shift missing target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainYShift(missingYShiftTargetFrame)),
        "nitay"
    );
    const contradictoryYShift = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "tay",
    });
    contradictoryYShift.surfaceOperationFrames[0].targetFrame.targetSegmentValue = "display-lie";
    s.eq(
        "Y coda shift contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainYShift(contradictoryYShift)),
        "nitay"
    );
    const changedYShift = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "tay",
    });
    ctx.setSurfaceChainSegmentValue(changedYShift, "tronco", "may");
    s.eq(
        "Y coda shift changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainYShift(changedYShift)),
        "nimay"
    );
    const poisonedYShift = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "tay",
    });
    poisonedYShift.surface = "surface-lie";
    poisonedYShift.result = "result-lie";
    poisonedYShift.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedYShift.formulaEcho = "#lie#";
    s.eq(
        "Y coda shift ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainYShift(poisonedYShift)),
        "nitash"
    );
    const mCodaAssimilationOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        tronco: "chinam",
    });
    const mCodaAssimilationOperationFrame = mCodaAssimilationOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "M coda assimilation carries typed operation frame through output contract",
        {
            surface: mCodaAssimilationOutput.surface,
            operationKind: mCodaAssimilationOperationFrame.kind || "",
            sourceKind: mCodaAssimilationOperationFrame.sourceFrame?.kind || "",
            segmentRole: mCodaAssimilationOperationFrame.sourceFrame?.segmentRole || "",
            sourceSegmentValue: mCodaAssimilationOperationFrame.sourceFrame?.sourceSegmentValue || "",
            sourceNextValue: mCodaAssimilationOperationFrame.sourceFrame?.sourceNextValue || "",
            targetSegmentValue: mCodaAssimilationOperationFrame.targetFrame?.targetSegmentValue || "",
            sourceCoda: mCodaAssimilationOperationFrame.targetFrame?.sourceCoda || "",
            targetCoda: mCodaAssimilationOperationFrame.targetFrame?.targetCoda || "",
            excluded: mCodaAssimilationOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "nichinan",
            operationKind: "andrews-surface-chain-m-coda-assimilation-operation-frame",
            sourceKind: "surface-chain-m-coda-assimilation-source-frame",
            segmentRole: "tronco",
            sourceSegmentValue: "chinam",
            sourceNextValue: "",
            targetSegmentValue: "chinan",
            sourceCoda: "m",
            targetCoda: "n",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "M coda assimilation direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation({
            segments: [
                { role: "pers1", slot: "pers1", value: "ni" },
                { role: "tronco", slot: "tronco", value: "chinam" },
            ],
            soundSpellingFrames: [],
        })),
        "nichinam"
    );
    const missingMCodaOperation = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "chinam",
    });
    missingMCodaOperation.surfaceOperationFrames = [];
    s.eq(
        "M coda assimilation missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation(missingMCodaOperation)),
        "nichinam"
    );
    const missingMCodaSourceFrame = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "chinam",
    });
    delete missingMCodaSourceFrame.surfaceOperationFrames[0].sourceFrame;
    s.eq(
        "M coda assimilation missing source frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation(missingMCodaSourceFrame)),
        "nichinam"
    );
    const missingMCodaTargetFrame = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "chinam",
    });
    delete missingMCodaTargetFrame.surfaceOperationFrames[0].targetFrame;
    s.eq(
        "M coda assimilation missing target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation(missingMCodaTargetFrame)),
        "nichinam"
    );
    const contradictoryMCoda = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "chinam",
    });
    contradictoryMCoda.surfaceOperationFrames[0].targetFrame.targetSegmentValue = "display-lie";
    s.eq(
        "M coda assimilation contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation(contradictoryMCoda)),
        "nichinam"
    );
    const changedMCoda = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "chinam",
    });
    ctx.setSurfaceChainSegmentValue(changedMCoda, "tronco", "tam");
    s.eq(
        "M coda assimilation changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation(changedMCoda)),
        "nitam"
    );
    const poisonedMCoda = ctx.buildSurfaceChainState({
        pers1: "ni",
        tronco: "chinam",
    });
    poisonedMCoda.surface = "surface-lie";
    poisonedMCoda.result = "result-lie";
    poisonedMCoda.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedMCoda.formulaEcho = "#lie#";
    s.eq(
        "M coda assimilation ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation(poisonedMCoda)),
        "nichinan"
    );
    const mCodaBeforeVowel = ctx.buildSurfaceChainState({
        obj1: "m",
        tronco: "altia",
    });
    s.eq(
        "M coda assimilation final m before vowel has no typed operation frame",
        {
            surface: ctx.joinSurfaceChain(ctx.realizeSurfaceChainMCodaAssimilation(mCodaBeforeVowel)),
            operationCount: mCodaBeforeVowel.surfaceOperationFrames.filter((frame) => (
                frame.kind === "andrews-surface-chain-m-coda-assimilation-operation-frame"
            )).length,
        },
        {
            surface: "maltia",
            operationCount: 0,
        }
    );
    const finalTrimOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        tronco: "nemia",
        surfaceRuleMeta: { trimFinalIAUAVowel: true },
    });
    const finalTrimOperationFrame = finalTrimOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "final IA/UA trim carries typed operation frame through output contract",
        {
            surface: finalTrimOutput.surface,
            operationKind: finalTrimOperationFrame.kind || "",
            sourceKind: finalTrimOperationFrame.sourceFrame?.kind || "",
            sourceStem: finalTrimOperationFrame.sourceFrame?.sourceStem || "",
            targetStem: finalTrimOperationFrame.targetFrame?.targetStem || "",
            excluded: finalTrimOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "ninemi",
            operationKind: "andrews-surface-chain-final-ia-ua-trim-operation-frame",
            sourceKind: "surface-chain-final-ia-ua-trim-source-frame",
            sourceStem: "nemia",
            targetStem: "nemi",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "final IA/UA trim direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainFinalIAUATrim({
            surfaceRuleMeta: { trimFinalIAUAVowel: true },
            segments: [{ role: "tronco", slot: "tronco", value: "nemia" }],
            soundSpellingFrames: [],
        })),
        "nemia"
    );
    const missingFinalTrimOperation = ctx.buildSurfaceChainState({
        tronco: "nemia",
        surfaceRuleMeta: { trimFinalIAUAVowel: true },
    });
    missingFinalTrimOperation.surfaceOperationFrames = [];
    s.eq(
        "final IA/UA trim missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainFinalIAUATrim(missingFinalTrimOperation)),
        "nemia"
    );
    const contradictoryFinalTrim = ctx.buildSurfaceChainState({
        tronco: "nemia",
        surfaceRuleMeta: { trimFinalIAUAVowel: true },
    });
    contradictoryFinalTrim.surfaceOperationFrames[0].targetFrame.targetStem = "display-lie";
    s.eq(
        "final IA/UA trim contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainFinalIAUATrim(contradictoryFinalTrim)),
        "nemia"
    );
    const changedSourceFinalTrim = ctx.buildSurfaceChainState({
        tronco: "nemia",
        surfaceRuleMeta: { trimFinalIAUAVowel: true },
    });
    ctx.setSurfaceChainSegmentValue(changedSourceFinalTrim, "tronco", "malia");
    s.eq(
        "final IA/UA trim changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainFinalIAUATrim(changedSourceFinalTrim)),
        "malia"
    );
    const poisonedDisplayFinalTrim = ctx.buildSurfaceChainState({
        tronco: "nemia",
        surfaceRuleMeta: { trimFinalIAUAVowel: true },
    });
    poisonedDisplayFinalTrim.surface = "surface-lie";
    poisonedDisplayFinalTrim.result = "result-lie";
    poisonedDisplayFinalTrim.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedDisplayFinalTrim.formulaEcho = "#lie#";
    s.eq(
        "final IA/UA trim ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainFinalIAUATrim(poisonedDisplayFinalTrim)),
        "nemi"
    );
    const objectIElisionOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        obj1: "ki",
        tronco: "ita",
        surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
    });
    const objectIElisionOperationFrame = objectIElisionOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "object-I stem-I elision carries typed operation frame through output contract",
        {
            surface: objectIElisionOutput.surface,
            operationKind: objectIElisionOperationFrame.kind || "",
            sourceKind: objectIElisionOperationFrame.sourceFrame?.kind || "",
            objectPrefix: objectIElisionOperationFrame.sourceFrame?.objectPrefix || "",
            sourceStem: objectIElisionOperationFrame.sourceFrame?.sourceStem || "",
            targetStem: objectIElisionOperationFrame.targetFrame?.targetStem || "",
            excluded: objectIElisionOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "nikita",
            operationKind: "andrews-surface-chain-object-i-initial-elision-operation-frame",
            sourceKind: "surface-chain-object-i-initial-elision-source-frame",
            objectPrefix: "ki",
            sourceStem: "ita",
            targetStem: "ta",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "object-I stem-I elision direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainObjectIInitialElision({
            surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
            segments: [
                { role: "obj1", slot: "obj1", value: "ki" },
                { role: "tronco", slot: "tronco", value: "ita" },
            ],
            soundSpellingFrames: [],
        })),
        "kiita"
    );
    const missingObjectIOperation = ctx.buildSurfaceChainState({
        obj1: "ki",
        tronco: "ita",
        surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
    });
    missingObjectIOperation.surfaceOperationFrames = [];
    s.eq(
        "object-I stem-I elision missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainObjectIInitialElision(missingObjectIOperation)),
        "kiita"
    );
    const contradictoryObjectIElision = ctx.buildSurfaceChainState({
        obj1: "ki",
        tronco: "ita",
        surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
    });
    contradictoryObjectIElision.surfaceOperationFrames[0].targetFrame.targetStem = "display-lie";
    s.eq(
        "object-I stem-I elision contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainObjectIInitialElision(contradictoryObjectIElision)),
        "kiita"
    );
    const changedObjectIElision = ctx.buildSurfaceChainState({
        obj1: "ki",
        tronco: "ita",
        surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
    });
    ctx.setSurfaceChainSegmentValue(changedObjectIElision, "tronco", "ijsi");
    s.eq(
        "object-I stem-I elision changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainObjectIInitialElision(changedObjectIElision)),
        "kiijsi"
    );
    const poisonedObjectIElision = ctx.buildSurfaceChainState({
        obj1: "ki",
        tronco: "ita",
        surfaceRuleMeta: { dropVerbInitialIAfterObjectI: true },
    });
    poisonedObjectIElision.surface = "surface-lie";
    poisonedObjectIElision.result = "result-lie";
    poisonedObjectIElision.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedObjectIElision.formulaEcho = "#lie#";
    s.eq(
        "object-I stem-I elision ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainObjectIInitialElision(poisonedObjectIElision)),
        "kita"
    );
    const muIskaliaReductionOutput = ctx.buildOutputWordResult({
        pers1: "ni",
        obj1: "mu",
        tronco: "iskalia",
        surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
    });
    const muIskaliaOperationFrame = muIskaliaReductionOutput.grammarFrame.routeContract.sourceContract.surfaceOperationFrames[0] || {};
    s.eq(
        "mu-iskalia reduction carries typed operation frame through output contract",
        {
            surface: muIskaliaReductionOutput.surface,
            operationKind: muIskaliaOperationFrame.kind || "",
            sourceKind: muIskaliaOperationFrame.sourceFrame?.kind || "",
            objectPrefix: muIskaliaOperationFrame.sourceFrame?.objectPrefix || "",
            sourceStem: muIskaliaOperationFrame.sourceFrame?.sourceStem || "",
            targetStem: muIskaliaOperationFrame.targetFrame?.targetStem || "",
            excluded: muIskaliaOperationFrame.sourceFrame?.displayOnlyFieldsExcluded || [],
        },
        {
            surface: "nimuskalia",
            operationKind: "andrews-surface-chain-mu-iskalia-reduction-operation-frame",
            sourceKind: "surface-chain-mu-iskalia-reduction-source-frame",
            objectPrefix: "mu",
            sourceStem: "iskalia",
            targetStem: "skalia",
            excluded: ["formulaEcho", "result", "surface", "surfaceForms"],
        }
    );
    s.eq(
        "mu-iskalia reduction direct legacy chain without typed operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMuIskaliaReduction({
            surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
            segments: [
                { role: "obj1", slot: "obj1", value: "mu" },
                { role: "tronco", slot: "tronco", value: "iskalia" },
            ],
            soundSpellingFrames: [],
        })),
        "muiskalia"
    );
    const missingMuIskaliaOperation = ctx.buildSurfaceChainState({
        obj1: "mu",
        tronco: "iskalia",
        surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
    });
    missingMuIskaliaOperation.surfaceOperationFrames = [];
    s.eq(
        "mu-iskalia reduction missing operation frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMuIskaliaReduction(missingMuIskaliaOperation)),
        "muiskalia"
    );
    const contradictoryMuIskaliaReduction = ctx.buildSurfaceChainState({
        obj1: "mu",
        tronco: "iskalia",
        surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
    });
    contradictoryMuIskaliaReduction.surfaceOperationFrames[0].targetFrame.targetStem = "display-lie";
    s.eq(
        "mu-iskalia reduction contradictory target frame blocks",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMuIskaliaReduction(contradictoryMuIskaliaReduction)),
        "muiskalia"
    );
    const changedMuIskaliaReduction = ctx.buildSurfaceChainState({
        obj1: "mu",
        tronco: "iskalia",
        surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
    });
    ctx.setSurfaceChainSegmentValue(changedMuIskaliaReduction, "tronco", "ijsi");
    s.eq(
        "mu-iskalia reduction changed caller stem cannot reuse stale source frame",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMuIskaliaReduction(changedMuIskaliaReduction)),
        "muijsi"
    );
    const poisonedMuIskaliaReduction = ctx.buildSurfaceChainState({
        obj1: "mu",
        tronco: "iskalia",
        surfaceRuleMeta: { dropInitialIFromIskaliaAfterMu: true },
    });
    poisonedMuIskaliaReduction.surface = "surface-lie";
    poisonedMuIskaliaReduction.result = "result-lie";
    poisonedMuIskaliaReduction.surfaceForms = ["surface-form-lie-a / surface-form-lie-b"];
    poisonedMuIskaliaReduction.formulaEcho = "#lie#";
    s.eq(
        "mu-iskalia reduction ignores poisoned display strings after typed authorization",
        ctx.joinSurfaceChain(ctx.realizeSurfaceChainMuIskaliaReduction(poisonedMuIskaliaReduction)),
        "muskalia"
    );
    s.eq(
        "surface chain records Lesson 2 frames for directional pers1-object vowel-contact reductions",
        (() => {
            const outputs = [
                ctx.buildOutputWordResult({
                    pers1: "ni",
                    obj1: "ki",
                    tronco: "walita",
                    directionalChainMeta: {
                        directionalInputPrefix: "wal",
                        directionalPlan: { shouldUseAl: true, effectiveDirectionalRuleMode: "" },
                        pers1Base: "ni",
                        obj1Base: "ki",
                        tense: "presente",
                    },
                }),
                ctx.buildOutputWordResult({
                    pers1: "shi",
                    obj1: "ta",
                    tronco: "walita",
                    directionalChainMeta: {
                        directionalInputPrefix: "wal",
                        directionalPlan: { shouldUseAl: true, effectiveDirectionalRuleMode: "" },
                        pers1Base: "ti",
                        obj1Base: "ta",
                        tense: "optativo",
                    },
                }),
            ];
            return outputs.map((output) => {
                const frame = output.grammarFrame.orthographyFrame.soundSpellingFrames[0] || {};
                return {
                    surface: output.surface,
                    ruleId: frame.ruleId || "",
                    sourceSurface: frame.sourceSurface || "",
                    target: frame.target || "",
                    grammarSlot: frame.grammarSlot || "",
                    ruleScope: frame.ruleScope || "",
                    andrewsProcess: frame.andrewsProcess || "",
                    sourceSegmentValue: frame.sourceSegmentValue || "",
                    targetSegmentValue: frame.targetSegmentValue || "",
                };
            });
        })(),
        [
            {
                surface: "nalita",
                ruleId: "pers1-ni-before-vowel-n",
                sourceSurface: "ni",
                target: "n",
                grammarSlot: "pers1",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                sourceSegmentValue: "ni",
                targetSegmentValue: "n",
            },
            {
                surface: "shaltaita",
                ruleId: "optative-shi-before-al-sh",
                sourceSurface: "shi",
                target: "sh",
                grammarSlot: "pers1",
                ruleScope: "vowel-elision",
                andrewsProcess: "Vowel Elision",
                sourceSegmentValue: "shi",
                targetSegmentValue: "sh",
            },
        ]
    );

    s.eq(
        "patientivo display uses compact nominal marker families",
        ctx.formatConjugationDisplay("tamachti / tamachit / tamatti / tamatit / tamatilti"),
        "tamachti\ntamachit\ntamatti\ntamatit\ntamatilti"
    );
    const optionalParentheticalSourceFrame = ctx.buildOptionalParentheticalFormsSourceFrame(["kichiw(ki)"], {
        sourceKind: "test-source-slot",
        sourceSegmentFrames: [{ role: "tronco", slot: "tronco", value: "kichiw(ki)" }],
        surface: "hostile-surface",
        result: "hostile-result",
        surfaceForms: ["hostile-a / hostile-b"],
        formulaEcho: "#hostile#",
    });
    const optionalParentheticalOperationFrame = ctx.buildOptionalParentheticalFormsOperationFrame(
        optionalParentheticalSourceFrame
    );
    s.eq(
        "optional parenthetical typed route expands from source and operation frames",
        ctx.expandOptionalParentheticalForms(["kichiw(ki)"], {
            sourceFrame: optionalParentheticalSourceFrame,
            operationFrame: optionalParentheticalOperationFrame,
            surface: "hostile-surface",
            result: "hostile-result",
            surfaceForms: ["hostile-a / hostile-b"],
            formulaEcho: "#hostile#",
        }),
        ["kichiw", "kichiwki"]
    );
    s.eq(
        "optional parenthetical source frame preserves structured source segment",
        optionalParentheticalSourceFrame.sourceSegmentFrames[0],
        {
            kind: "optional-parenthetical-source-segment-frame",
            index: 0,
            role: "tronco",
            slot: "tronco",
            value: "kichiw(ki)",
        }
    );
    s.eq(
        "optional parenthetical direct legacy route without frames blocks",
        ctx.expandOptionalParentheticalForms(["kichiw(ki)"]),
        []
    );
    s.eq(
        "optional parenthetical missing operation frame blocks",
        ctx.expandOptionalParentheticalForms(["kichiw(ki)"], {
            sourceFrame: optionalParentheticalSourceFrame,
        }),
        []
    );
    s.eq(
        "optional parenthetical contradictory target frame blocks",
        ctx.expandOptionalParentheticalForms(["kichiw(ki)"], {
            sourceFrame: optionalParentheticalSourceFrame,
            operationFrame: {
                ...optionalParentheticalOperationFrame,
                targetFrame: {
                    ...optionalParentheticalOperationFrame.targetFrame,
                    targetForms: ["hostile"],
                },
            },
        }),
        []
    );
    s.eq(
        "optional parenthetical display formatter builds typed frame before slash text",
        ctx.formatConjugationDisplay("kichiw(ki)"),
        "kichiw / kichiwki"
    );

    const derivedMuAlternates = [{ verb: "mukisa", subjectSuffix: "k" }];
    const derivedMuSourceFrame = ctx.buildDerivedMuStemInteractionSourceFrame({
        obj1: "ta",
        tronco: "mukisa",
        alternateForms: derivedMuAlternates,
        enable: true,
    });
    const derivedMuOperationFrame = ctx.buildDerivedMuStemInteractionOperationFrame(derivedMuSourceFrame);
    const derivedMuResult = ctx.realizeDerivedMuStemInteraction({
        obj1: "ta",
        tronco: "mukisa",
        alternateForms: derivedMuAlternates,
        enable: true,
        sourceFrame: derivedMuSourceFrame,
        operationFrame: derivedMuOperationFrame,
    });
    s.eq(
        "derived mu-stem live route consumes typed operation frame",
        {
            obj1: derivedMuResult.obj1,
            tronco: derivedMuResult.tronco,
            alternateVerb: derivedMuAlternates[0].verb,
            branch: derivedMuResult.operationFrame.targetFrame.branch,
            sourceStem: derivedMuResult.operationFrame.sourceFrame.sourceStem,
        },
        {
            obj1: "",
            tronco: "mutakisa",
            alternateVerb: "mutakisa",
            branch: "embed-object-marker-in-mu-stem",
            sourceStem: "mukisa",
        }
    );
    s.eq(
        "derived mu-stem direct legacy route without frames blocks",
        ctx.realizeDerivedMuStemInteraction({
            obj1: "ta",
            tronco: "mukisa",
            alternateForms: [{ verb: "mukisa", subjectSuffix: "k" }],
            enable: true,
        }),
        {
            obj1: "ta",
            tronco: "mukisa",
            alternateForms: [{ verb: "mukisa", subjectSuffix: "k" }],
            supported: false,
            diagnostics: ["missing-derived-mu-stem-interaction-source-frame", "missing-derived-mu-stem-interaction-operation-frame"],
        }
    );
    s.eq(
        "derived mu-stem missing operation frame blocks",
        ctx.realizeDerivedMuStemInteraction({
            obj1: "ta",
            tronco: "mukisa",
            alternateForms: [{ verb: "mukisa", subjectSuffix: "k" }],
            enable: true,
            sourceFrame: derivedMuSourceFrame,
        }).tronco,
        "mukisa"
    );
    const contradictoryDerivedMuOperationFrame = {
        ...derivedMuOperationFrame,
        targetFrame: {
            ...derivedMuOperationFrame.targetFrame,
            targetStem: "hostile",
        },
    };
    s.eq(
        "derived mu-stem contradictory target frame blocks",
        ctx.realizeDerivedMuStemInteraction({
            obj1: "ta",
            tronco: "mukisa",
            alternateForms: [{ verb: "mukisa", subjectSuffix: "k" }],
            enable: true,
            sourceFrame: derivedMuSourceFrame,
            operationFrame: contradictoryDerivedMuOperationFrame,
        }).tronco,
        "mukisa"
    );
    s.eq(
        "derived mu-stem ignores poisoned display strings when frames match",
        ctx.realizeDerivedMuStemInteraction({
            obj1: "ta",
            tronco: "mukisa",
            alternateForms: [{ verb: "mukisa", subjectSuffix: "k" }],
            enable: true,
            sourceFrame: derivedMuSourceFrame,
            operationFrame: derivedMuOperationFrame,
            surface: "hostile-surface",
            result: "hostile-result",
            surfaceForms: ["hostile-a / hostile-b"],
            formulaEcho: "#hostile#",
        }).tronco,
        "mutakisa"
    );
    const frontedMuSourceFrame = ctx.buildDerivedMuStemInteractionSourceFrame({
        obj1: "",
        tronco: "tamushti",
        alternateForms: [{ verb: "temushti", subjectSuffix: "k" }],
        enable: true,
    });
    const frontedMuOperationFrame = ctx.buildDerivedMuStemInteractionOperationFrame(frontedMuSourceFrame);
    const frontedAlternates = [{ verb: "temushti", subjectSuffix: "k" }];
    const frontedMuResult = ctx.realizeDerivedMuStemInteraction({
        obj1: "",
        tronco: "tamushti",
        alternateForms: frontedAlternates,
        enable: true,
        sourceFrame: frontedMuSourceFrame,
        operationFrame: frontedMuOperationFrame,
    });
    s.eq(
        "derived fronted ta/te mu-stem route consumes target frame",
        {
            tronco: frontedMuResult.tronco,
            alternateVerb: frontedAlternates[0].verb,
            branch: frontedMuResult.operationFrame.targetFrame.branch,
        },
        {
            tronco: "mutashti",
            alternateVerb: "muteshti",
            branch: "fronted-embedded-marker-to-mu-stem",
        }
    );

    // provenance helpers — extracted from surface.js into output/provenance.js
    const provenanceVariant = ctx.buildProvenanceVariantEntry({ base: "nemi", suffix: "j" });
    s.eq("provenance variant builds surface stem", provenanceVariant.surfaceStem, "nemij");
    s.ok("provenance variant exposes grammar frame", provenanceVariant.grammarFrame);
    s.no(
        "provenance variant grammar frame is non-enumerable",
        Object.prototype.propertyIsEnumerable.call(provenanceVariant, "grammarFrame")
    );
    const framedProvenanceVariant = ctx.attachOutputProvenanceGrammarContract({
        result: "stale-provenance-result",
        surface: "stale-provenance-surface",
        surfaceForms: ["staleprova / staleprovb"],
        surfaceStem: "stale-provenance-stem",
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surfaceForms: ["frameprova", "frameprovb"],
                outputKind: "output-provenance",
                generationRoute: "test-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-provenance-variant",
        routeStage: "test-frame-reader",
        surface: "stale-provenance-fallback",
    });
    s.eq(
        "output provenance contract reads LCM result-frame primary surface",
        framedProvenanceVariant.surface,
        "frameprova"
    );
    s.eq(
        "output provenance contract reads structured LCM result-frame surface forms",
        framedProvenanceVariant.surfaceForms,
        ["frameprova", "frameprovb"]
    );
    s.eq(
        "provenance primary stem reads framed variant surface",
        ctx.getProvenancePrimaryStemSurface({ variants: [framedProvenanceVariant] }),
        "frameprova"
    );
    const slashJoinedFramedProvenance = ctx.attachOutputProvenanceGrammarContract({
        result: "stale-slash-provenance-result-a / stale-slash-provenance-result-b",
        surface: "stale-slash-provenance-surface",
        surfaceForms: ["stale-slash-provenance-a / stale-slash-provenance-b"],
        surfaceStem: "stale-slash-provenance-stem",
        grammarFrame: {
            resultFrame: {
                kind: "grammar-result-frame",
                ok: true,
                surfaceForms: ["frame-slash-provenance-a / frame-slash-provenance-b"],
                outputKind: "output-provenance",
                generationRoute: "test-slash-frame-reader",
            },
        },
    }, {
        metadataKind: "output-provenance-variant",
        routeStage: "test-slash-frame-reader",
        surface: "stale-slash-provenance-fallback",
    });
    s.eq(
        "output provenance contract blocks slash-joined result-frame forms instead of splitting display strings",
        {
            ok: slashJoinedFramedProvenance.ok,
            surface: slashJoinedFramedProvenance.surface,
            surfaceForms: slashJoinedFramedProvenance.surfaceForms,
            primary: ctx.getProvenancePrimaryStemSurface({ variants: [slashJoinedFramedProvenance] }),
        },
        {
            ok: false,
            surface: "",
            surfaceForms: [],
            primary: "",
        }
    );
    const provenanceFormulaRecord = ctx.buildGrammarFormulaRecord({
        id: "hostile-provenance-formula-record",
        unit: "NNC",
        formula: "#Ø-Ø(prov)Ø#",
        formulaSlots: {
            predicateStem: { stem: "prov", surface: "prov", slot: "STEM" },
        },
        routeContract: { routeFamily: "hostile-provenance-canonical" },
    });
    const provenanceRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
        id: "hostile-provenance-realization-record",
        formulaRecord: provenanceFormulaRecord,
        segmentFrames: [{ slot: "predicateStem", formulaValue: "prov", surface: "canonicalprov" }],
        surfaceForms: ["canonicalprov"],
    });
    const canonicalProvenanceVariant = ctx.attachOutputProvenanceGrammarContract({
        result: "stale-canonical-provenance-result-a / stale-canonical-provenance-result-b",
        surface: "stale-canonical-provenance-surface",
        surfaceForms: ["stale-canonical-provenance-a / stale-canonical-provenance-b"],
        surfaceStem: "stale-canonical-provenance-stem",
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: {
                ...ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "stale-frame-provenance-surface",
                    surfaceForms: ["stale-frame-provenance-a / stale-frame-provenance-b"],
                    outputKind: "output-provenance",
                    generationRoute: "test-canonical-frame-reader",
                    formulaRecord: provenanceFormulaRecord,
                    formulaRealizationRecord: provenanceRealizationRecord,
                }),
                formulaRecord: provenanceFormulaRecord,
                formulaRecords: [provenanceFormulaRecord],
                formulaRealizationRecord: provenanceRealizationRecord,
                formulaRealizationRecords: [provenanceRealizationRecord],
            },
        }),
    }, {
        metadataKind: "output-provenance-variant",
        routeStage: "test-canonical-frame-reader",
        surface: "stale-canonical-provenance-fallback",
    });
    s.eq(
        "output provenance contract reads canonical realization before stale frame and top-level surfaces",
        {
            surface: canonicalProvenanceVariant.surface,
            surfaceForms: canonicalProvenanceVariant.surfaceForms,
            primary: ctx.getProvenancePrimaryStemSurface({ variants: [canonicalProvenanceVariant] }),
        },
        {
            surface: "canonicalprov",
            surfaceForms: ["canonicalprov"],
            primary: "canonicalprov",
        }
    );
    const blockedFramedProvenance = ctx.attachOutputProvenanceGrammarContract({
        result: "stale-blocked-provenance-result",
        surface: "stale-blocked-provenance-surface",
        surfaceForms: ["stale-blocked-provenance-a"],
        surfaceStem: "stale-blocked-provenance-stem",
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: false,
                surface: "",
                surfaceForms: [],
                outputKind: "output-provenance",
                generationRoute: "test-blocked-frame-reader",
            }),
        }),
    }, {
        metadataKind: "output-provenance-variant",
        routeStage: "test-blocked-frame-reader",
        surface: "stale-blocked-provenance-fallback",
    });
    s.eq(
        "blocked provenance result frame suppresses stale stem fallbacks",
        {
            ok: blockedFramedProvenance.ok,
            surface: blockedFramedProvenance.surface,
            surfaceForms: blockedFramedProvenance.surfaceForms,
        },
        {
            ok: false,
            surface: "",
            surfaceForms: [],
        }
    );
    s.eq(
        "blocked provenance primary stem suppresses stale top-level surface",
        ctx.getProvenancePrimaryStemSurface(blockedFramedProvenance),
        ""
    );
    s.eq(
        "blocked provenance primary stem suppresses stale variant surface",
        ctx.getProvenancePrimaryStemSurface({ variants: [blockedFramedProvenance] }),
        ""
    );
    s.eq(
        "provenance primary stem prefers first variant surface",
        ctx.getProvenancePrimaryStemSurface({ variants: [provenanceVariant] }),
        "nemij"
    );
    const forwardProvenance = ctx.buildForwardDerivationProvenance({
        sourceVerb: "nemi",
        analysisTarget: "nemij",
        tense: "preterit",
        derivationType: "causative",
        isTransitive: false,
        selectedMeta: {
            surfaceStem: "nemij",
            rule: "forward-selection",
            patternType: "test-pattern",
        },
    });
    s.ok("forward provenance exposes result contract", forwardProvenance.ok);
    s.eq("forward provenance contract surface", forwardProvenance.surface, "nemij");
    s.ok("forward provenance frames alias grammarFrame", forwardProvenance.frames === forwardProvenance.grammarFrame);
    s.eq(
        "forward provenance records output-provenance route",
        forwardProvenance.grammarFrame.routeContract.routeFamily,
        "output-provenance"
    );
    s.eq(
        "forward provenance result frame carries provenance",
        forwardProvenance.grammarFrame.resultFrame.provenance.surfaceStem,
        "nemij"
    );
    s.eq(
        "forward provenance stem frame carries source stem",
        forwardProvenance.grammarFrame.stemFrame.sourceStem,
        "nemi"
    );
    s.no(
        "forward provenance grammar frame is non-enumerable",
        Object.prototype.propertyIsEnumerable.call(forwardProvenance, "grammarFrame")
    );
    const blockedForwardProvenance = ctx.buildForwardDerivationProvenance({
        sourceVerb: "nemi",
        analysisTarget: "nemij",
        derivationType: "causative",
    });
    s.no("blocked forward provenance is not ok", blockedForwardProvenance.ok);
    s.eq("blocked forward provenance has blank contract surface", blockedForwardProvenance.surface, "");
    s.eq(
        "blocked forward provenance names missing stem layer",
        blockedForwardProvenance.contractDiagnostics[0].id,
        "OUTPUT_PROVENANCE_STEM_MISSING"
    );

    return s;
}

module.exports = { run };
