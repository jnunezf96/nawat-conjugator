"use strict";

/**
 * Tests for src/core/preterit/context.mjs and engine.js
 * Covers: getPretUniversalCoreVowelCount, getPretUniversalClassOrder,
 *         getMonosyllableStemPath, getUniversalReplacementStem.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("preterit");

    // getPretUniversalClassOrder — canonical order must be A, B, C, D
    s.eq("class order = [A,B,C,D]", ctx.getPretUniversalClassOrder(), ["A","B","C","D"]);

    // getPretUniversalCoreVowelCount — counts vowel letters in stem
    s.eq("vowel count: nemi = 2", ctx.getPretUniversalCoreVowelCount("nemi"), 2);
    s.eq("vowel count: nem = 1", ctx.getPretUniversalCoreVowelCount("nem"), 1);
    s.eq("vowel count: kisa = 2", ctx.getPretUniversalCoreVowelCount("kisa"), 2);
    s.eq("vowel count: chia = 2", ctx.getPretUniversalCoreVowelCount("chia"), 2);
    s.eq("vowel count: chiwa = 2", ctx.getPretUniversalCoreVowelCount("chiwa"), 2);

    // getUniversalReplacementStem — Class C: j replaces the final vowel of a two-vowel ending
    s.eq("class C replacement: nemia → nemij (j replaces final -a)", ctx.getUniversalReplacementStem("nemia"), "nemij");
    s.eq("class C replacement: nemua → nemuj (j replaces final -a)", ctx.getUniversalReplacementStem("nemua"), "nemuj");

    // getMonosyllableStemPath — Class D: j appends after the nucleus of a vowel-final monosyllable
    const monoKi = ctx.getMonosyllableStemPath(ctx.buildPretClassDSourceFrame({ sourceVerb: "ki" }));
    s.eq("class D monosyllable: ki → path=monosyllable", monoKi.path, "monosyllable");
    s.eq("class D monosyllable: ki → classDBase=kij (j appended after nucleus)", monoKi.classDBase, "kij");

    const monoMu = ctx.getMonosyllableStemPath(ctx.buildPretClassDSourceFrame({ sourceVerb: "mu" }));
    s.eq("class D monosyllable: mu → classDBase=muj", monoMu.classDBase, "muj");
    s.eq("class D legacy monosyllable string API is blocked", ctx.getMonosyllableStemPath("ki"), null);

    const appendBaseSpec = ctx.buildPretAppendBaseSpec("ki", "j");
    s.eq(
        "preterit base append consumes typed operation frame",
        {
            operationKind: appendBaseSpec.operationFrame?.kind || "",
            sourceKind: appendBaseSpec.operationFrame?.sourceFrame?.kind || "",
            targetKind: appendBaseSpec.operationFrame?.targetFrame?.kind || "",
            appendRole: appendBaseSpec.operationFrame?.appendFrame?.role || "",
            targetBase: appendBaseSpec.operationFrame?.targetFrame?.targetBase || "",
            base: ctx.realizePretBaseSpec(appendBaseSpec, "poison"),
        },
        {
            operationKind: "preterit-base-transform-operation-frame",
            sourceKind: "preterit-base-source-frame",
            targetKind: "preterit-base-transform-target-frame",
            appendRole: "append",
            targetBase: "kij",
            base: "kij",
        }
    );
    const legacyAppendSpec = {
        kind: "transform",
        transformKind: "append",
        sourceBase: "ki",
        appendText: "j",
    };
    s.eq(
        "preterit legacy transform string API is blocked without operation frame",
        {
            base: ctx.realizePretBaseSpec(legacyAppendSpec, "poison"),
            diagnostic: ctx.evaluatePretBaseSpec(legacyAppendSpec).diagnostics?.[0]?.id || "",
        },
        {
            base: "",
            diagnostic: "preterit-base-missing-operation-frame",
        }
    );
    const poisonedAppendSpec = {
        ...appendBaseSpec,
        sourceBase: "poison",
        appendText: "x",
    };
    s.eq(
        "preterit poisoned legacy transform fields do not change typed operation output",
        ctx.realizePretBaseSpec(poisonedAppendSpec, ""),
        "kij"
    );
    const replaceSuffixBaseSpec = ctx.buildPretReplaceSuffixBaseSpec("nemia", "a", "j");
    const missingTargetReplaceSuffixSpec = {
        ...replaceSuffixBaseSpec,
        operationFrame: {
            ...replaceSuffixBaseSpec.operationFrame,
            targetFrame: null,
        },
    };
    const contradictoryTargetReplaceSuffixSpec = {
        ...replaceSuffixBaseSpec,
        operationFrame: {
            ...replaceSuffixBaseSpec.operationFrame,
            targetFrame: {
                ...replaceSuffixBaseSpec.operationFrame.targetFrame,
                targetBase: "poison",
            },
        },
    };
    s.eq(
        "preterit replace-suffix base transform target is authorized by typed target frame",
        {
            targetKind: replaceSuffixBaseSpec.operationFrame?.targetFrame?.kind || "",
            targetBase: replaceSuffixBaseSpec.operationFrame?.targetFrame?.targetBase || "",
            base: ctx.realizePretBaseSpec(replaceSuffixBaseSpec, "poison"),
            poisonedLegacyFields: ctx.realizePretBaseSpec({
                ...replaceSuffixBaseSpec,
                sourceBase: "poison",
                sourceSuffix: "x",
                replacement: "z",
            }, ""),
            missingTarget: ctx.evaluatePretBaseSpec(missingTargetReplaceSuffixSpec).diagnostics?.[0]?.id || "",
            contradictoryTarget: ctx.evaluatePretBaseSpec(contradictoryTargetReplaceSuffixSpec).diagnostics?.[0]?.id || "",
        },
        {
            targetKind: "preterit-base-transform-target-frame",
            targetBase: "nemij",
            base: "nemij",
            poisonedLegacyFields: "nemij",
            missingTarget: "preterit-base-missing-target-frame",
            contradictoryTarget: "preterit-base-contradictory-target-frame",
        }
    );
    const contradictoryAppendSpec = {
        ...appendBaseSpec,
        operationFrame: {
            ...appendBaseSpec.operationFrame,
            transformKind: "replace-suffix",
        },
    };
    s.eq(
        "preterit contradictory operation frame blocks transform output",
        {
            base: ctx.realizePretBaseSpec(contradictoryAppendSpec, ""),
            diagnostic: ctx.evaluatePretBaseSpec(contradictoryAppendSpec).diagnostics?.[0]?.id || "",
        },
        {
            base: "",
            diagnostic: "preterit-base-contradictory-operation-frame",
        }
    );

    const classCContext = ctx.buildPretUniversalContext("nemia", "nemia", false, {});
    const classCVariants = ctx.buildPretUniversalClassC({
        ...classCContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class C consumes source frame before lying context strings",
        {
            frameKind: classCContext.classCSourceFrame?.kind || "",
            sourceVerb: classCContext.classCSourceFrame?.sourceVerbFrame?.text || "",
            retainedBase: classCContext.classCSourceFrame?.retainedBaseFrame?.text || "",
            variants: classCVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-c-source-frame",
            sourceVerb: "nemia",
            retainedBase: "nemi",
            variants: [{ base: "nemij", suffix: "" }],
        }
    );
    s.eq(
        "preterit Class C missing source frame blocks branch",
        ctx.buildPretUniversalClassC({
            ...classCContext,
            classCSourceFrame: null,
        }),
        null
    );
    const contradictoryClassCFrame = {
        ...classCContext.classCSourceFrame,
        retainedBaseFrame: {
            ...classCContext.classCSourceFrame.retainedBaseFrame,
            text: "poison",
        },
    };
    s.eq(
        "preterit Class C contradictory source frame blocks",
        {
            ok: ctx.buildPretClassCBaseSpecsFromSourceFrame(contradictoryClassCFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretClassCBaseSpecsFromSourceFrame(contradictoryClassCFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-c-contradictory-source-frame",
        }
    );

    const classDContext = ctx.buildPretUniversalContext("ki", "ki", false, {});
    const classDVariants = ctx.buildPretUniversalClassD({
        ...classDContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class D consumes source frame before lying context strings",
        {
            frameKind: classDContext.classDSourceFrame?.kind || "",
            sourceVerb: classDContext.classDSourceFrame?.sourceVerbFrame?.text || "",
            append: classDContext.classDSourceFrame?.appendFrame?.text || "",
            variants: classDVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-d-source-frame",
            sourceVerb: "ki",
            append: "j",
            variants: [{ base: "kij", suffix: "" }],
        }
    );
    s.eq(
        "preterit Class D missing source frame blocks branch",
        ctx.buildPretUniversalClassD({
            ...classDContext,
            classDSourceFrame: null,
        }),
        null
    );
    const contradictoryClassDFrame = {
        ...classDContext.classDSourceFrame,
        appendFrame: {
            ...classDContext.classDSourceFrame.appendFrame,
            text: "poison",
        },
    };
    s.eq(
        "preterit Class D contradictory source frame blocks",
        {
            ok: ctx.buildPretClassDBaseSpecsFromSourceFrame(contradictoryClassDFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretClassDBaseSpecsFromSourceFrame(contradictoryClassDFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-d-contradictory-source-frame",
        }
    );

    const classBContext = ctx.buildPretUniversalContext("nem", "nem", false, {});
    const classBVariants = ctx.buildPretUniversalClassB({
        ...classBContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class B consumes source frame before lying context strings",
        {
            frameKind: classBContext.classBSourceFrame?.kind || "",
            sourceVerb: classBContext.classBSourceFrame?.sourceVerbFrame?.text || "",
            vowelCount: classBContext.classBSourceFrame?.vowelCountFrame?.text || "",
            variants: classBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-b-source-frame",
            sourceVerb: "nem",
            vowelCount: "1",
            variants: [{ base: "nem", suffix: "k" }],
        }
    );
    s.eq(
        "preterit Class B missing source frame blocks branch",
        ctx.buildPretUniversalClassB({
            ...classBContext,
            classBSourceFrame: null,
        }),
        null
    );
    const contradictoryClassBFrame = {
        ...classBContext.classBSourceFrame,
        vowelCountFrame: {
            ...classBContext.classBSourceFrame.vowelCountFrame,
            text: "2",
        },
    };
    s.eq(
        "preterit Class B contradictory source frame blocks",
        {
            ok: ctx.buildPretClassBBaseSpecsFromSourceFrame(contradictoryClassBFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretClassBBaseSpecsFromSourceFrame(contradictoryClassBFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-b-contradictory-source-frame",
        }
    );
    const missingClassBOperationFrame = {
        ...classBContext.classBSourceFrame,
        operationFrame: null,
    };
    s.eq(
        "preterit Class B missing typed operation frame blocks",
        {
            ok: ctx.buildPretClassBBaseSpecsFromSourceFrame(missingClassBOperationFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretClassBBaseSpecsFromSourceFrame(missingClassBOperationFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-b-missing-operation-frame",
        }
    );
    const fallbackClassBVariants = ctx.getPronounceableClassBFallback({
        ...classBContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "poison",
        posicionesFormula: { tronco: "poison" },
    });
    s.eq(
        "preterit fallback Class B consumes source frame before lying strings",
        fallbackClassBVariants.map((variant) => ({
            base: ctx.getPretVariantBase(variant),
            suffix: ctx.getPretVariantSuffix(variant),
        })),
        [{ base: "nem", suffix: "k" }]
    );
    s.eq(
        "preterit fallback Class B missing source frame blocks",
        ctx.getPronounceableClassBFallback({
            ...classBContext,
            classBSourceFrame: null,
        }),
        null
    );
    s.eq(
        "preterit fallback Class B missing typed operation frame blocks",
        ctx.getPronounceableClassBFallback({
            ...classBContext,
            classBSourceFrame: missingClassBOperationFrame,
        }),
        null
    );

    const rootPlusYaClassBContext = ctx.buildPretUniversalContext("tamatiya", "tamatiya", false, {});
    const rootPlusYaClassBVariants = ctx.buildPretUniversalClassB({
        ...rootPlusYaClassBContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
        rootPlusYaBase: "poison",
        rootPlusYaBasePronounceable: "poison",
    });
    s.eq(
        "preterit Class B root+ya consumes source frame before lying context strings",
        {
            frameKind: rootPlusYaClassBContext.rootPlusYaSourceFrame?.kind || "",
            sourceVerb: rootPlusYaClassBContext.rootPlusYaSourceFrame?.sourceVerbFrame?.text || "",
            rootBase: rootPlusYaClassBContext.rootPlusYaSourceFrame?.rootFrame?.text || "",
            variants: rootPlusYaClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-root-plus-ya-source-frame",
            sourceVerb: "tamatiya",
            rootBase: "tamati",
            variants: [
                { base: "tamatiya", suffix: "k" },
                { base: "tamati", suffix: "k" },
            ],
        }
    );
    s.eq(
        "preterit Class B root+ya missing source frame blocks branch",
        ctx.buildPretUniversalClassB({
            ...rootPlusYaClassBContext,
            rootPlusYaSourceFrame: null,
        }),
        null
    );
    const contradictoryRootPlusYaClassBFrame = ctx.buildPretRootPlusYaSourceFrame({
        rootBase: "tamati",
        sourceVerb: "tamati",
    });
    s.eq(
        "preterit Class B root+ya contradictory source frame blocks",
        {
            ok: ctx.buildPretRootPlusYaClassBBaseSpecsFromSourceFrame(contradictoryRootPlusYaClassBFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretRootPlusYaClassBBaseSpecsFromSourceFrame(contradictoryRootPlusYaClassBFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-b-root-plus-ya-contradictory-source-frame",
        }
    );

    const prefixContactFrame = ctx.buildPretPrefixBaseContactFrame({
        prefix: "ni",
        base: "ita",
    });
    s.eq(
        "preterit prefix-base contact consumes typed contact frame",
        {
            frameKind: prefixContactFrame.kind,
            operationKind: prefixContactFrame.operationFrame.kind,
            result: ctx.adjustPretPrefixBaseContact(prefixContactFrame),
        },
        {
            frameKind: "preterit-prefix-base-contact-frame",
            operationKind: "preterit-prefix-base-contact-operation-frame",
            result: {
                ok: true,
                prefix: "ni",
                base: "ta",
                diagnostics: [],
                contactFrame: prefixContactFrame,
            },
        }
    );
    s.eq(
        "preterit legacy prefix-base contact string API is blocked without contact frame",
        {
            result: ctx.adjustPretPrefixBaseContact("ni", "ita"),
            diagnostic: ctx.adjustPretPrefixBaseContact("ni", "ita").diagnostics?.[0]?.id || "",
        },
        {
            result: {
                ok: false,
                prefix: "",
                base: "",
                diagnostics: [{
                    id: "preterit-prefix-base-contact-missing-frame",
                    layer: "preterit-prefix-base-contact-frame",
                }],
            },
            diagnostic: "preterit-prefix-base-contact-missing-frame",
        }
    );
    const missingPrefixContactOperationFrame = {
        ...prefixContactFrame,
        operationFrame: null,
    };
    s.eq(
        "preterit prefix-base contact missing typed operation frame blocks",
        ctx.evaluatePretPrefixBaseContactFrame(missingPrefixContactOperationFrame).diagnostics?.[0]?.id || "",
        "preterit-prefix-base-contact-missing-frame"
    );
    const contradictoryPrefixContactFrame = {
        ...prefixContactFrame,
        prefixFrame: {
            ...prefixContactFrame.prefixFrame,
            letters: ["n", "x"],
        },
    };
    s.eq(
        "preterit prefix-base contact contradictory segment frame blocks",
        ctx.evaluatePretPrefixBaseContactFrame(contradictoryPrefixContactFrame).diagnostics?.[0]?.id || "",
        "preterit-prefix-base-contact-contradictory-frame"
    );
    const poisonedLegacyNhBeforeVowel = ctx.adjustPretNhBeforeVowel;
    ctx.adjustPretNhBeforeVowel = () => ({ prefix: "poison", base: "poison" });
    s.eq(
        "preterit prefix-base contact ignores monkeypatched legacy string contact helper",
        ctx.evaluatePretPrefixBaseContactFrame(ctx.buildPretPrefixBaseContactFrame({
            prefix: "wan",
            base: "asi",
            stem: "poison",
            surface: "poison",
            result: "poison",
            formulaEcho: "poison",
        })),
        {
            ok: true,
            prefix: "wanh",
            base: "asi",
            diagnostics: [],
            contactFrame: ctx.buildPretPrefixBaseContactFrame({
                prefix: "wan",
                base: "asi",
                stem: "poison",
                surface: "poison",
                result: "poison",
                formulaEcho: "poison",
            }),
        }
    );
    ctx.adjustPretNhBeforeVowel = poisonedLegacyNhBeforeVowel;
    s.eq(
        "preterit composed object prefix contact consumes frame-built boundary operation",
        ctx.adjustPretComposedObjectPrefixContact({
            objectPrefix: "k",
            base: "kisa",
            stem: "poison",
            surface: "poison",
            result: "poison",
            formulaEcho: "poison",
        }),
        {
            ok: true,
            prefix: "k",
            base: "isa",
            diagnostics: [],
            contactFrame: ctx.buildPretPrefixBaseContactFrame({
                prefix: "k",
                base: "kisa",
                contactKind: "composed-object-prefix-base",
                composedObjectPrefix: true,
            }),
        }
    );

    const rootPlusYaFrame = ctx.buildPretRootPlusYaSourceFrame({
        rootBase: "tamati",
        sourceVerb: "tamatiya",
    });
    const rootPlusYaClassA = ctx.buildPretUniversalClassA({
        isTransitive: false,
        fromRootPlusYa: true,
        rootPlusYaSourceFrame: rootPlusYaFrame,
        allowUnpronounceableStems: true,
        verb: "poisonya",
        analysisVerb: "poison",
        exactBaseVerb: "poisonya",
        rootPlusYaBase: "poison",
        isWeya: false,
        hasSlashMarker: false,
        isDenominalMatrixInput: false,
    });
    s.eq(
        "preterit Class A root+ya consumes source frame before lying context strings",
        {
            frameKind: rootPlusYaFrame.kind,
            sourceVerb: rootPlusYaFrame.sourceVerbFrame.text,
            variants: rootPlusYaClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-root-plus-ya-source-frame",
            sourceVerb: "tamatiya",
            variants: [{ base: "tamatish", suffix: "ki" }],
        }
    );
    s.eq(
        "preterit Class A root+ya missing source frame blocks branch",
        ctx.buildPretUniversalClassA({
            isTransitive: false,
            fromRootPlusYa: true,
            allowUnpronounceableStems: true,
            verb: "tamatiya",
            rootPlusYaBase: "tamati",
            isWeya: false,
            hasSlashMarker: false,
            isDenominalMatrixInput: false,
        }),
        null
    );
    const contradictoryRootPlusYaFrame = ctx.buildPretRootPlusYaSourceFrame({
        rootBase: "tamati",
        sourceVerb: "tamati",
    });
    s.eq(
        "preterit Class A root+ya contradictory source frame blocks",
        {
            ok: ctx.buildPretRootPlusYaClassABaseSpecsFromSourceFrame(contradictoryRootPlusYaFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretRootPlusYaClassABaseSpecsFromSourceFrame(contradictoryRootPlusYaFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-a-root-plus-ya-contradictory-source-frame",
        }
    );

    const yyaContext = ctx.buildPretUniversalContext("weyya", "weyya", false, {});
    const yyaClassAVariants = ctx.buildPretUniversalClassA({
        ...yyaContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class A direct yya consumes source frame before lying context strings",
        {
            frameKind: yyaContext.yyaClassASourceFrame?.kind || "",
            sourceVerb: yyaContext.yyaClassASourceFrame?.sourceVerbFrame?.text || "",
            retainedBase: yyaContext.yyaClassASourceFrame?.retainedBaseFrame?.text || "",
            variants: yyaClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-a-yya-source-frame",
            sourceVerb: "weyya",
            retainedBase: "wey",
            variants: [{ base: "wey", suffix: "ki" }],
        }
    );
    s.eq(
        "preterit Class A direct yya missing source frame blocks branch",
        ctx.buildPretUniversalClassA({
            ...yyaContext,
            yyaClassASourceFrame: null,
        }),
        null
    );
    const contradictoryYyaFrame = {
        ...yyaContext.yyaClassASourceFrame,
        retainedBaseFrame: {
            ...yyaContext.yyaClassASourceFrame.retainedBaseFrame,
            text: "poison",
        },
    };
    s.eq(
        "preterit Class A direct yya contradictory source frame blocks",
        {
            ok: ctx.buildPretClassAYyaBaseSpecsFromSourceFrame(contradictoryYyaFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretClassAYyaBaseSpecsFromSourceFrame(contradictoryYyaFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-a-yya-contradictory-source-frame",
        }
    );

    const itaContext = ctx.buildPretUniversalContext("ita", "ita", true, {});
    const itaClassAVariants = ctx.buildPretUniversalClassA({
        ...itaContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class A ita consumes source frame before lying context strings",
        {
            frameKind: itaContext.itaClassASourceFrame?.kind || "",
            sourceVerb: itaContext.itaClassASourceFrame?.sourceVerbFrame?.text || "",
            retainedBase: itaContext.itaClassASourceFrame?.retainedBaseFrame?.text || "",
            variants: itaClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-a-ita-source-frame",
            sourceVerb: "ita",
            retainedBase: "i",
            variants: [{ base: "itz", suffix: "ki" }],
        }
    );
    s.eq(
        "preterit Class A ita missing source frame blocks branch",
        ctx.buildPretUniversalClassA({
            ...itaContext,
            itaClassASourceFrame: null,
        }),
        null
    );
    const contradictoryItaFrame = {
        ...itaContext.itaClassASourceFrame,
        replacementFrame: {
            ...itaContext.itaClassASourceFrame.replacementFrame,
            text: "poison",
        },
    };
    s.eq(
        "preterit Class A ita contradictory source frame blocks",
        {
            ok: ctx.buildPretClassAItaBaseSpecsFromSourceFrame(contradictoryItaFrame, {
                isTransitive: true,
            }).ok,
            diagnostic: ctx.buildPretClassAItaBaseSpecsFromSourceFrame(contradictoryItaFrame, {
                isTransitive: true,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-a-ita-contradictory-source-frame",
        }
    );

    const classADeletionContext = ctx.buildPretUniversalContext("kisa", "kisa", false, {});
    const classADeletionVariants = ctx.buildPretUniversalClassA({
        ...classADeletionContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class A deletion consumes source frame before lying context strings",
        {
            frameKind: classADeletionContext.classAFinalVowelDeletionSourceFrame?.kind || "",
            sourceVerb: classADeletionContext.classAFinalVowelDeletionSourceFrame?.sourceVerbFrame?.text || "",
            deletedBase: classADeletionContext.classAFinalVowelDeletionSourceFrame?.deletedBaseFrame?.text || "",
            variants: classADeletionVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-a-final-vowel-deletion-source-frame",
            sourceVerb: "kisa",
            deletedBase: "kis",
            variants: [{ base: "kis", suffix: "ki" }],
        }
    );
    s.eq(
        "preterit Class A deletion missing source frame blocks branch",
        ctx.buildPretUniversalClassA({
            ...classADeletionContext,
            classAFinalVowelDeletionSourceFrame: null,
        }),
        null
    );
    const contradictoryClassADeletionFrame = {
        ...classADeletionContext.classAFinalVowelDeletionSourceFrame,
        deletedBaseFrame: {
            ...classADeletionContext.classAFinalVowelDeletionSourceFrame.deletedBaseFrame,
            text: "poison",
        },
    };
    s.eq(
        "preterit Class A deletion contradictory source frame blocks",
        {
            ok: ctx.buildPretClassAFinalVowelDeletionBaseSpecsFromSourceFrame(contradictoryClassADeletionFrame, {
                isTransitive: false,
            }).ok,
            diagnostic: ctx.buildPretClassAFinalVowelDeletionBaseSpecsFromSourceFrame(contradictoryClassADeletionFrame, {
                isTransitive: false,
            }).diagnostics?.[0]?.id || "",
        },
        {
            ok: false,
            diagnostic: "preterit-class-a-contradictory-final-vowel-deletion-source-frame",
        }
    );
    const slashAkiContext = ctx.buildPretUniversalContext("aki", "aki", false, {
        hasSlashMarker: true,
    });
    const displayPoisonedSlashAkiFrame = ctx.buildPretClassASlashAkiSourceFrame({
        sourceVerb: "aki",
        hasSlashMarker: true,
        syllables: ctx.getSyllables("aki", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: slashAkiContext.rightEdgeDescriptor,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const slashAkiClassAVariants = ctx.buildPretUniversalClassA({
        ...slashAkiContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class A slash aki zero policy consumes typed frame before lying context strings",
        {
            frameKind: slashAkiContext.classASlashAkiSourceFrame?.kind || "",
            operation: slashAkiContext.classASlashAkiOperationFrame?.operationId || "",
            sourceVerb: slashAkiContext.classASlashAkiSourceFrame?.sourceVerbFrame?.text || "",
            targetIsZero: slashAkiContext.classASlashAkiOperationFrame?.targetFrame?.targetSuffix === "",
            variants: slashAkiClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-a-slash-aki-source-frame",
            operation: "andrews-preterit-class-a-slash-aki-zero-suffix-policy",
            sourceVerb: "aki",
            targetIsZero: true,
            variants: [{ base: "ak", suffix: "" }],
        }
    );
    s.eq(
        "preterit Class A slash aki source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedSlashAkiFrame.sourceSignature,
            operation: displayPoisonedSlashAkiFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassASlashAkiFrameMismatch({
                sourceFrame: displayPoisonedSlashAkiFrame,
                operationFrame: ctx.buildPretClassASlashAkiOperationFrame(displayPoisonedSlashAkiFrame),
            }),
        },
        {
            signature: slashAkiContext.classASlashAkiSourceFrame.sourceSignature,
            operation: "aki",
            mismatch: "",
        }
    );
    const contradictorySlashAkiOperation = {
        ...slashAkiContext.classASlashAkiOperationFrame,
        targetFrame: {
            ...slashAkiContext.classASlashAkiOperationFrame.targetFrame,
            allowKiSuffix: true,
        },
    };
    s.eq(
        "preterit Class A slash aki frame policy blocks missing and contradictory operation frames",
        {
            missingSource: ctx.buildPretClassASlashAkiOperationFrame(null),
            missingOperation: ctx.getPretClassASlashAkiFrameMismatch({
                sourceFrame: slashAkiContext.classASlashAkiSourceFrame,
                operationFrame: null,
            }),
            contradictoryTarget: ctx.getPretClassASlashAkiFrameMismatch({
                sourceFrame: slashAkiContext.classASlashAkiSourceFrame,
                operationFrame: contradictorySlashAkiOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit KV policy slash aki exception requires typed source and operation frames",
        {
            typed: ctx.getKVClassPolicy({
                context: {
                    ...slashAkiContext,
                    verb: "poison",
                    analysisVerb: "poison",
                },
                isTransitive: false,
                isPreterit: false,
                classFilter: "",
                baseObjectPrefix: "",
                hasClassA: true,
                hasClassB: true,
            }),
            noOperation: ctx.getKVClassPolicy({
                context: {
                    ...slashAkiContext,
                    classASlashAkiOperationFrame: null,
                },
                isTransitive: false,
                isPreterit: false,
                classFilter: "",
                baseObjectPrefix: "",
                hasClassA: true,
                hasClassB: true,
            }),
        },
        {
            typed: {
                shouldMaskClassBSelection: false,
                shouldSkipClassA: false,
                shouldSkipClassB: false,
            },
            noOperation: {
                shouldMaskClassBSelection: false,
                shouldSkipClassA: false,
                shouldSkipClassB: true,
            },
        }
    );
    const kwvContext = ctx.buildPretUniversalContext("takwa", "takwa", false, {});
    const displayPoisonedKwvFrame = ctx.buildPretClassAKwvSourceFrame({
        sourceVerb: "takwa",
        syllables: ctx.getSyllables("takwa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: kwvContext.rightEdgeDescriptor,
        isRootPlusYa: false,
        isMonosyllable: false,
        allowKWVClassB: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const kwvClassAVariants = ctx.buildPretUniversalClassA({
        ...kwvContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
        forceClassAForKWV: false,
        allowIntransitiveKV: false,
    });
    s.eq(
        "preterit Class A KWV force policy consumes typed frame before lying context strings",
        {
            frameKind: kwvContext.classAKwvSourceFrame?.kind || "",
            operation: kwvContext.classAKwvOperationFrame?.operationId || "",
            sourceVerb: kwvContext.classAKwvSourceFrame?.sourceVerbFrame?.text || "",
            targetForcesA: kwvContext.classAKwvOperationFrame?.targetFrame?.forceClassA === true,
            variants: kwvClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-a-kwv-source-frame",
            operation: "andrews-preterit-class-a-kwv-force-policy",
            sourceVerb: "takwa",
            targetForcesA: true,
            variants: [{ base: "takw", suffix: "ki" }],
        }
    );
    s.eq(
        "preterit Class A KWV source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedKwvFrame.sourceSignature,
            operation: displayPoisonedKwvFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAKwvFrameMismatch({
                sourceFrame: displayPoisonedKwvFrame,
                operationFrame: ctx.buildPretClassAKwvOperationFrame(displayPoisonedKwvFrame),
            }),
        },
        {
            signature: kwvContext.classAKwvSourceFrame.sourceSignature,
            operation: "takwa",
            mismatch: "",
        }
    );
    const contradictoryKwvSourceFrame = {
        ...kwvContext.classAKwvSourceFrame,
        finalNucleusFrame: {
            ...kwvContext.classAKwvSourceFrame.finalNucleusFrame,
            text: "u",
        },
    };
    const contradictoryKwvOperation = {
        ...kwvContext.classAKwvOperationFrame,
        targetFrame: {
            ...kwvContext.classAKwvOperationFrame.targetFrame,
            skipClassB: false,
        },
    };
    const missingKwvTargetOperation = {
        ...kwvContext.classAKwvOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A KWV policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAKwvOperationFrame(null),
            missingOperation: ctx.getPretClassAKwvFrameMismatch({
                sourceFrame: kwvContext.classAKwvSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAKwvFrameMismatch({
                sourceFrame: kwvContext.classAKwvSourceFrame,
                operationFrame: missingKwvTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAKwvFrameMismatch({
                sourceFrame: contradictoryKwvSourceFrame,
                operationFrame: kwvContext.classAKwvOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAKwvFrameMismatch({
                sourceFrame: kwvContext.classAKwvSourceFrame,
                operationFrame: contradictoryKwvOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A KWV route blocks legacy boolean authority without frames",
        {
            noOperation: ctx.buildPretUniversalClassA({
                ...kwvContext,
                classAKwvOperationFrame: null,
                forceClassAForKWV: true,
                allowIntransitiveKV: true,
            }),
            noSource: ctx.buildPretUniversalClassA({
                ...kwvContext,
                classAKwvSourceFrame: null,
                forceClassAForKWV: true,
                allowIntransitiveKV: true,
            }),
        },
        {
            noOperation: null,
            noSource: null,
        }
    );
    s.eq(
        "preterit KWV class policy requires typed source and operation frames",
        {
            typed: ctx.getKVClassPolicy({
                context: {
                    ...kwvContext,
                    verb: "poison",
                    analysisVerb: "poison",
                    forceClassAForKWV: false,
                },
                isTransitive: false,
                isPreterit: true,
                classFilter: "B",
                baseObjectPrefix: "",
                hasClassA: true,
                hasClassB: true,
            }),
            noOperation: ctx.getKVClassPolicy({
                context: {
                    ...kwvContext,
                    classAKwvOperationFrame: null,
                    forceClassAForKWV: true,
                },
                isTransitive: false,
                isPreterit: true,
                classFilter: "B",
                baseObjectPrefix: "",
                hasClassA: true,
                hasClassB: true,
            }),
        },
        {
            typed: {
                shouldMaskClassBSelection: true,
                shouldSkipClassA: false,
                shouldSkipClassB: true,
            },
            noOperation: {
                shouldMaskClassBSelection: false,
                shouldSkipClassA: false,
                shouldSkipClassB: false,
            },
        }
    );
    const kvAllowContext = ctx.buildPretUniversalContext("naki", "naki", false, {});
    const displayPoisonedKvAllowFrame = ctx.buildPretClassAKvAllowSourceFrame({
        sourceVerb: "naki",
        syllables: ctx.getSyllables("naki", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: kvAllowContext.rightEdgeDescriptor,
        hasSlashMarker: false,
        isRootPlusYa: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const kvAllowClassAVariants = ctx.buildPretUniversalClassA({
        ...kvAllowContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
        allowIntransitiveKV: false,
    });
    s.eq(
        "preterit Class A KV allow policy consumes typed frame before lying context strings",
        {
            frameKind: kvAllowContext.classAKvAllowSourceFrame?.kind || "",
            operation: kvAllowContext.classAKvAllowOperationFrame?.operationId || "",
            sourceVerb: kvAllowContext.classAKvAllowSourceFrame?.sourceVerbFrame?.text || "",
            targetAllowsA: kvAllowContext.classAKvAllowOperationFrame?.targetFrame?.allowClassA === true,
            variants: kvAllowClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-a-kv-allow-source-frame",
            operation: "andrews-preterit-class-a-kv-allow-policy",
            sourceVerb: "naki",
            targetAllowsA: true,
            variants: [{ base: "nak", suffix: "ki" }],
        }
    );
    s.eq(
        "preterit Class A KV allow source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedKvAllowFrame.sourceSignature,
            operation: displayPoisonedKvAllowFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAKvAllowFrameMismatch({
                sourceFrame: displayPoisonedKvAllowFrame,
                operationFrame: ctx.buildPretClassAKvAllowOperationFrame(displayPoisonedKvAllowFrame),
            }),
        },
        {
            signature: kvAllowContext.classAKvAllowSourceFrame.sourceSignature,
            operation: "naki",
            mismatch: "",
        }
    );
    const contradictoryKvAllowSourceFrame = {
        ...kvAllowContext.classAKvAllowSourceFrame,
        finalOnsetFrame: {
            ...kvAllowContext.classAKvAllowSourceFrame.finalOnsetFrame,
            text: "kw",
        },
    };
    const contradictoryKvAllowOperation = {
        ...kvAllowContext.classAKvAllowOperationFrame,
        targetFrame: {
            ...kvAllowContext.classAKvAllowOperationFrame.targetFrame,
            allowClassA: false,
        },
    };
    const missingKvAllowTargetOperation = {
        ...kvAllowContext.classAKvAllowOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A KV allow policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAKvAllowOperationFrame(null),
            missingOperation: ctx.getPretClassAKvAllowFrameMismatch({
                sourceFrame: kvAllowContext.classAKvAllowSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAKvAllowFrameMismatch({
                sourceFrame: kvAllowContext.classAKvAllowSourceFrame,
                operationFrame: missingKvAllowTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAKvAllowFrameMismatch({
                sourceFrame: contradictoryKvAllowSourceFrame,
                operationFrame: kvAllowContext.classAKvAllowOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAKvAllowFrameMismatch({
                sourceFrame: kvAllowContext.classAKvAllowSourceFrame,
                operationFrame: contradictoryKvAllowOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A KV allow route blocks legacy boolean authority without frames",
        {
            noOperation: ctx.buildPretUniversalClassA({
                ...kvAllowContext,
                classAKvAllowOperationFrame: null,
                allowIntransitiveKV: true,
            }),
            noSource: ctx.buildPretUniversalClassA({
                ...kvAllowContext,
                classAKvAllowSourceFrame: null,
                allowIntransitiveKV: true,
            }),
        },
        {
            noOperation: null,
            noSource: null,
        }
    );
    const chiAllowContext = ctx.buildPretUniversalContext("itachi", "itachi", false, {});
    const displayPoisonedChiAllowFrame = ctx.buildPretClassAChiAllowSourceFrame({
        sourceVerb: "itachi",
        syllables: ctx.getSyllables("itachi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: chiAllowContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const chiAllowClassAVariants = ctx.buildPretUniversalClassA({
        ...chiAllowContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    s.eq(
        "preterit Class A chi allow policy consumes typed frame before lying context strings",
        {
            frameKind: chiAllowContext.classAChiAllowSourceFrame?.kind || "",
            operation: chiAllowContext.classAChiAllowOperationFrame?.operationId || "",
            sourceVerb: chiAllowContext.classAChiAllowSourceFrame?.sourceVerbFrame?.text || "",
            targetAllowsVtV: chiAllowContext.classAChiAllowOperationFrame?.targetFrame?.allowVtVStartClassA === true,
            variants: chiAllowClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
            })),
        },
        {
            frameKind: "preterit-class-a-chi-allow-source-frame",
            operation: "andrews-preterit-class-a-chi-allow-policy",
            sourceVerb: "itachi",
            targetAllowsVtV: true,
            variants: [{ base: "itach", suffix: "ki" }],
        }
    );
    s.eq(
        "preterit Class A chi allow source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedChiAllowFrame.sourceSignature,
            operation: displayPoisonedChiAllowFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAChiAllowFrameMismatch({
                sourceFrame: displayPoisonedChiAllowFrame,
                operationFrame: ctx.buildPretClassAChiAllowOperationFrame(displayPoisonedChiAllowFrame),
            }),
        },
        {
            signature: chiAllowContext.classAChiAllowSourceFrame.sourceSignature,
            operation: "itachi",
            mismatch: "",
        }
    );
    const contradictoryChiAllowSourceFrame = {
        ...chiAllowContext.classAChiAllowSourceFrame,
        endingFamilyFrame: {
            ...chiAllowContext.classAChiAllowSourceFrame.endingFamilyFrame,
            text: "t+a",
        },
    };
    const contradictoryChiAllowOperation = {
        ...chiAllowContext.classAChiAllowOperationFrame,
        targetFrame: {
            ...chiAllowContext.classAChiAllowOperationFrame.targetFrame,
            allowVtVStartClassA: false,
        },
    };
    const missingChiAllowTargetOperation = {
        ...chiAllowContext.classAChiAllowOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A chi allow policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAChiAllowOperationFrame(null),
            missingOperation: ctx.getPretClassAChiAllowFrameMismatch({
                sourceFrame: chiAllowContext.classAChiAllowSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAChiAllowFrameMismatch({
                sourceFrame: chiAllowContext.classAChiAllowSourceFrame,
                operationFrame: missingChiAllowTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAChiAllowFrameMismatch({
                sourceFrame: contradictoryChiAllowSourceFrame,
                operationFrame: chiAllowContext.classAChiAllowOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAChiAllowFrameMismatch({
                sourceFrame: chiAllowContext.classAChiAllowSourceFrame,
                operationFrame: contradictoryChiAllowOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A chi allow route blocks legacy descriptor authority without frames",
        {
            noOperation: ctx.buildPretUniversalClassA({
                ...chiAllowContext,
                classAChiAllowOperationFrame: null,
            }),
            noSource: ctx.buildPretUniversalClassA({
                ...chiAllowContext,
                classAChiAllowSourceFrame: null,
            }),
        },
        {
            noOperation: null,
            noSource: null,
        }
    );
    const taRedupContext = ctx.buildPretUniversalContext("tatata", "tatata", true, {});
    const displayPoisonedTaRedupFrame = ctx.buildPretClassATaRedupSourceFrame({
        sourceVerb: "tatata",
        analysisBase: "tata",
        rightEdgeDescriptor: taRedupContext.rightEdgeDescriptor,
        isTransitive: true,
        isReduplicatedCVCV: true,
        isItaVerb: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    s.eq(
        "preterit Class A ta redup candidate policy consumes typed frame before lying strings",
        {
            frameKind: taRedupContext.classATaRedupSourceFrame?.kind || "",
            operation: taRedupContext.classATaRedupOperationFrame?.operationId || "",
            sourceVerb: taRedupContext.classATaRedupSourceFrame?.sourceVerbFrame?.text || "",
            analysisBase: taRedupContext.classATaRedupSourceFrame?.analysisBaseFrame?.text || "",
            targetKiOnly: taRedupContext.classATaRedupOperationFrame?.targetFrame?.allowKiSuffix === true
                && taRedupContext.classATaRedupOperationFrame?.targetFrame?.allowZeroSuffix === false,
            candidatesWithLyingAnalysis: Array.from(ctx.getPretUniversalClassCandidates({
                ...taRedupContext,
                analysisVerb: "ita",
                verb: "poison",
                exactBaseVerb: "poison",
            })),
        },
        {
            frameKind: "preterit-class-a-ta-redup-source-frame",
            operation: "andrews-preterit-class-a-ta-redup-policy",
            sourceVerb: "tatata",
            analysisBase: "tata",
            targetKiOnly: true,
            candidatesWithLyingAnalysis: ["A", "B"],
        }
    );
    s.eq(
        "preterit Class A ta redup source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedTaRedupFrame.sourceSignature,
            operation: displayPoisonedTaRedupFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassATaRedupFrameMismatch({
                sourceFrame: displayPoisonedTaRedupFrame,
                operationFrame: ctx.buildPretClassATaRedupOperationFrame(displayPoisonedTaRedupFrame),
            }),
        },
        {
            signature: taRedupContext.classATaRedupSourceFrame.sourceSignature,
            operation: "tatata",
            mismatch: "",
        }
    );
    const contradictoryTaRedupSourceFrame = {
        ...taRedupContext.classATaRedupSourceFrame,
        itaShapeFrame: {
            ...taRedupContext.classATaRedupSourceFrame.itaShapeFrame,
            text: "present",
        },
    };
    const contradictoryTaRedupOperation = {
        ...taRedupContext.classATaRedupOperationFrame,
        targetFrame: {
            ...taRedupContext.classATaRedupOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingTaRedupTargetOperation = {
        ...taRedupContext.classATaRedupOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A ta redup policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassATaRedupOperationFrame(null),
            missingOperation: ctx.getPretClassATaRedupFrameMismatch({
                sourceFrame: taRedupContext.classATaRedupSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassATaRedupFrameMismatch({
                sourceFrame: taRedupContext.classATaRedupSourceFrame,
                operationFrame: missingTaRedupTargetOperation,
            }),
            contradictorySource: ctx.getPretClassATaRedupFrameMismatch({
                sourceFrame: contradictoryTaRedupSourceFrame,
                operationFrame: taRedupContext.classATaRedupOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassATaRedupFrameMismatch({
                sourceFrame: taRedupContext.classATaRedupSourceFrame,
                operationFrame: contradictoryTaRedupOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A ta redup route blocks legacy analysis string authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...taRedupContext,
                classATaRedupOperationFrame: null,
                analysisVerb: "tatata",
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...taRedupContext,
                classATaRedupSourceFrame: null,
                analysisVerb: "tatata",
            })),
            itaShapeBlocked: ctx.buildPretClassATaRedupSourceFrame({
                sourceVerb: "pipita",
                analysisBase: "pita",
                rightEdgeDescriptor: ctx.buildPretUniversalContext("pipita", "pipita", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isReduplicatedCVCV: true,
                isItaVerb: true,
            }),
        },
        {
            noOperationCandidates: ["B"],
            noSourceCandidates: ["B"],
            itaShapeBlocked: null,
        }
    );
    const paTransitiveContext = ctx.buildPretUniversalContext("mipa", "mipa", true, {});
    const displayPoisonedPaTransitiveFrame = ctx.buildPretClassAPaTransitiveSourceFrame({
        sourceVerb: "mipa",
        syllables: ctx.getSyllables("mipa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: paTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const paTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...paTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const paTransitiveDescriptorPoisonedContext = {
        ...paTransitiveContext,
        descriptorState: {
            ...paTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const paTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(paTransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class A p+a transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: paTransitiveContext.classAPaTransitiveSourceFrame?.kind || "",
            operation: paTransitiveContext.classAPaTransitiveOperationFrame?.operationId || "",
            sourceVerb: paTransitiveContext.classAPaTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetKiOnly: paTransitiveContext.classAPaTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && paTransitiveContext.classAPaTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...paTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: paTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(paTransitiveDescriptorPoisonedContext)),
            classAWithPoisonedDescriptors: paTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-pa-transitive-source-frame",
            operation: "andrews-preterit-class-a-pa-transitive-policy",
            sourceVerb: "mipa",
            targetKiOnly: true,
            candidatesWithLyingStrings: ["A"],
            variants: [{ base: "mip", suffix: "ki", policy: "andrews-preterit-class-a-pa-transitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A"],
            classAWithPoisonedDescriptors: [
                { base: "mip", suffix: "ki", policy: "andrews-preterit-class-a-pa-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A p+a transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedPaTransitiveFrame.sourceSignature,
            operation: displayPoisonedPaTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAPaTransitiveFrameMismatch({
                sourceFrame: displayPoisonedPaTransitiveFrame,
                operationFrame: ctx.buildPretClassAPaTransitiveOperationFrame(displayPoisonedPaTransitiveFrame),
            }),
        },
        {
            signature: paTransitiveContext.classAPaTransitiveSourceFrame.sourceSignature,
            operation: "mipa",
            mismatch: "",
        }
    );
    const contradictoryPaTransitiveSourceFrame = {
        ...paTransitiveContext.classAPaTransitiveSourceFrame,
        transitivityFrame: {
            ...paTransitiveContext.classAPaTransitiveSourceFrame.transitivityFrame,
            text: "intransitive",
        },
    };
    const contradictoryPaTransitiveOperation = {
        ...paTransitiveContext.classAPaTransitiveOperationFrame,
        targetFrame: {
            ...paTransitiveContext.classAPaTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingPaTransitiveTargetOperation = {
        ...paTransitiveContext.classAPaTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A p+a transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAPaTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassAPaTransitiveFrameMismatch({
                sourceFrame: paTransitiveContext.classAPaTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAPaTransitiveFrameMismatch({
                sourceFrame: paTransitiveContext.classAPaTransitiveSourceFrame,
                operationFrame: missingPaTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAPaTransitiveFrameMismatch({
                sourceFrame: contradictoryPaTransitiveSourceFrame,
                operationFrame: paTransitiveContext.classAPaTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAPaTransitiveFrameMismatch({
                sourceFrame: paTransitiveContext.classAPaTransitiveSourceFrame,
                operationFrame: contradictoryPaTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A p+a transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...paTransitiveContext,
                classAPaTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...paTransitiveContext,
                classAPaTransitiveSourceFrame: null,
            })),
            noOperation: ctx.buildPretUniversalClassA({
                ...paTransitiveContext,
                classAPaTransitiveOperationFrame: null,
            }),
            noSource: ctx.buildPretUniversalClassA({
                ...paTransitiveContext,
                classAPaTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassAPaTransitiveSourceFrame({
                sourceVerb: "mipa",
                syllables: ctx.getSyllables("mipa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: paTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperation: null,
            noSource: null,
            intransitiveSourceBlocked: null,
        }
    );
    const piCvTransitiveContext = ctx.buildPretUniversalContext("tapi", "tapi", true, {});
    const displayPoisonedPiCvTransitiveFrame = ctx.buildPretClassAPiCvTransitiveSourceFrame({
        sourceVerb: "tapi",
        syllables: ctx.getSyllables("tapi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: piCvTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const piCvTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...piCvTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const piCvTransitiveDescriptorPoisonedContext = {
        ...piCvTransitiveContext,
        descriptorState: {
            ...piCvTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const piCvTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(piCvTransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class A p+i CV|CV transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: piCvTransitiveContext.classAPiCvTransitiveSourceFrame?.kind || "",
            operation: piCvTransitiveContext.classAPiCvTransitiveOperationFrame?.operationId || "",
            sourceVerb: piCvTransitiveContext.classAPiCvTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetKiOnly: piCvTransitiveContext.classAPiCvTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && piCvTransitiveContext.classAPiCvTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...piCvTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: piCvTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(piCvTransitiveDescriptorPoisonedContext)),
            classAWithPoisonedDescriptors: piCvTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-pi-cv-transitive-source-frame",
            operation: "andrews-preterit-class-a-pi-cv-transitive-policy",
            sourceVerb: "tapi",
            targetKiOnly: true,
            candidatesWithLyingStrings: ["A"],
            variants: [{ base: "tap", suffix: "ki", policy: "andrews-preterit-class-a-pi-cv-transitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A"],
            classAWithPoisonedDescriptors: [{ base: "tap", suffix: "ki", policy: "andrews-preterit-class-a-pi-cv-transitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A p+i CV|CV transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedPiCvTransitiveFrame.sourceSignature,
            operation: displayPoisonedPiCvTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAPiCvTransitiveFrameMismatch({
                sourceFrame: displayPoisonedPiCvTransitiveFrame,
                operationFrame: ctx.buildPretClassAPiCvTransitiveOperationFrame(displayPoisonedPiCvTransitiveFrame),
            }),
        },
        {
            signature: piCvTransitiveContext.classAPiCvTransitiveSourceFrame.sourceSignature,
            operation: "tapi",
            mismatch: "",
        }
    );
    const contradictoryPiCvTransitiveSourceFrame = {
        ...piCvTransitiveContext.classAPiCvTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...piCvTransitiveContext.classAPiCvTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV|CV",
        },
    };
    const contradictoryPiCvTransitiveOperation = {
        ...piCvTransitiveContext.classAPiCvTransitiveOperationFrame,
        targetFrame: {
            ...piCvTransitiveContext.classAPiCvTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingPiCvTransitiveTargetOperation = {
        ...piCvTransitiveContext.classAPiCvTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A p+i CV|CV transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAPiCvTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassAPiCvTransitiveFrameMismatch({
                sourceFrame: piCvTransitiveContext.classAPiCvTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAPiCvTransitiveFrameMismatch({
                sourceFrame: piCvTransitiveContext.classAPiCvTransitiveSourceFrame,
                operationFrame: missingPiCvTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAPiCvTransitiveFrameMismatch({
                sourceFrame: contradictoryPiCvTransitiveSourceFrame,
                operationFrame: piCvTransitiveContext.classAPiCvTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAPiCvTransitiveFrameMismatch({
                sourceFrame: piCvTransitiveContext.classAPiCvTransitiveSourceFrame,
                operationFrame: contradictoryPiCvTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A p+i CV|CV transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...piCvTransitiveContext,
                classAPiCvTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...piCvTransitiveContext,
                classAPiCvTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...piCvTransitiveContext,
                classAPiCvTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...piCvTransitiveContext,
                classAPiCvTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassAPiCvTransitiveSourceFrame({
                sourceVerb: "tapi",
                syllables: ctx.getSyllables("tapi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: piCvTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            paSourceBlocked: ctx.buildPretClassAPiCvTransitiveSourceFrame({
                sourceVerb: "mipa",
                syllables: ctx.getSyllables("mipa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: paTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            paSourceBlocked: null,
        }
    );
    const paCvIntransitiveContext = ctx.buildPretUniversalContext("mipa", "mipa", false, {});
    const displayPoisonedPaCvIntransitiveFrame = ctx.buildPretClassAPaCvIntransitiveSourceFrame({
        sourceVerb: "mipa",
        syllables: ctx.getSyllables("mipa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: paCvIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const paCvIntransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...paCvIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const paCvIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...paCvIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const paCvIntransitiveDescriptorPoisonedContext = {
        ...paCvIntransitiveContext,
        descriptorState: {
            ...paCvIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const paCvIntransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(paCvIntransitiveDescriptorPoisonedContext);
    const paCvIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(paCvIntransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class A/B p+a CV|CV intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame?.kind || "",
            operation: paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame?.operationId || "",
            sourceVerb: paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassAAndB: paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame?.targetFrame?.allowClassA === true
                && paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame?.targetFrame?.allowClassAZeroSuffix === false
                && paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame?.targetFrame?.allowClassAKiSuffix === true
                && paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame?.targetFrame?.allowClassBKSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...paCvIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: paCvIntransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: paCvIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(paCvIntransitiveDescriptorPoisonedContext)),
            classAWithPoisonedDescriptors: paCvIntransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: paCvIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-pa-cv-intransitive-source-frame",
            operation: "andrews-preterit-class-a-pa-cv-intransitive-policy",
            sourceVerb: "mipa",
            targetClassAAndB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [{ base: "mip", suffix: "ki", policy: "andrews-preterit-class-a-pa-cv-intransitive-policy" }],
            classB: [{ base: "mipa", suffix: "k", policy: "andrews-preterit-class-a-pa-cv-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [{ base: "mip", suffix: "ki", policy: "andrews-preterit-class-a-pa-cv-intransitive-policy" }],
            classBWithPoisonedDescriptors: [{ base: "mipa", suffix: "k", policy: "andrews-preterit-class-a-pa-cv-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A p+a CV|CV intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedPaCvIntransitiveFrame.sourceSignature,
            operation: displayPoisonedPaCvIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAPaCvIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedPaCvIntransitiveFrame,
                operationFrame: ctx.buildPretClassAPaCvIntransitiveOperationFrame(displayPoisonedPaCvIntransitiveFrame),
            }),
        },
        {
            signature: paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame.sourceSignature,
            operation: "mipa",
            mismatch: "",
        }
    );
    const contradictoryPaCvIntransitiveSourceFrame = {
        ...paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame,
        transitivityFrame: {
            ...paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame.transitivityFrame,
            text: "transitive",
        },
    };
    const contradictoryPaCvIntransitiveOperation = {
        ...paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame,
        targetFrame: {
            ...paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame.targetFrame,
            allowClassAZeroSuffix: true,
        },
    };
    const missingPaCvIntransitiveTargetOperation = {
        ...paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A p+a CV|CV intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAPaCvIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassAPaCvIntransitiveFrameMismatch({
                sourceFrame: paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAPaCvIntransitiveFrameMismatch({
                sourceFrame: paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame,
                operationFrame: missingPaCvIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAPaCvIntransitiveFrameMismatch({
                sourceFrame: contradictoryPaCvIntransitiveSourceFrame,
                operationFrame: paCvIntransitiveContext.classAPaCvIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAPaCvIntransitiveFrameMismatch({
                sourceFrame: paCvIntransitiveContext.classAPaCvIntransitiveSourceFrame,
                operationFrame: contradictoryPaCvIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A p+a CV|CV intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...paCvIntransitiveContext,
                classAPaCvIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...paCvIntransitiveContext,
                classAPaCvIntransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...paCvIntransitiveContext,
                classAPaCvIntransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...paCvIntransitiveContext,
                classAPaCvIntransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...paCvIntransitiveContext,
                classAPaCvIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...paCvIntransitiveContext,
                classAPaCvIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassAPaCvIntransitiveSourceFrame({
                sourceVerb: "mipa",
                syllables: ctx.getSyllables("mipa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: paTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            piSourceBlocked: ctx.buildPretClassAPaCvIntransitiveSourceFrame({
                sourceVerb: "tapi",
                syllables: ctx.getSyllables("tapi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("tapi", "tapi", false, {}).rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            piSourceBlocked: null,
        }
    );
    const naCvIntransitiveContext = ctx.buildPretUniversalContext("pana", "pana", false, {});
    const displayPoisonedNaCvIntransitiveFrame = ctx.buildPretClassANaCvIntransitiveSourceFrame({
        sourceVerb: "pana",
        syllables: ctx.getSyllables("pana", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: naCvIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const naCvIntransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...naCvIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const naCvIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...naCvIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const naCvIntransitiveDescriptorPoisonedContext = {
        ...naCvIntransitiveContext,
        descriptorState: {
            ...naCvIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const naCvIntransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(naCvIntransitiveDescriptorPoisonedContext);
    const naCvIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(naCvIntransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class A/B n+a CV|CV intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: naCvIntransitiveContext.classANaCvIntransitiveSourceFrame?.kind || "",
            operation: naCvIntransitiveContext.classANaCvIntransitiveOperationFrame?.operationId || "",
            sourceVerb: naCvIntransitiveContext.classANaCvIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassAAndB: naCvIntransitiveContext.classANaCvIntransitiveOperationFrame?.targetFrame?.allowClassA === true
                && naCvIntransitiveContext.classANaCvIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && naCvIntransitiveContext.classANaCvIntransitiveOperationFrame?.targetFrame?.allowClassAZeroSuffix === false
                && naCvIntransitiveContext.classANaCvIntransitiveOperationFrame?.targetFrame?.allowClassAKiSuffix === true
                && naCvIntransitiveContext.classANaCvIntransitiveOperationFrame?.targetFrame?.allowClassBKSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: naCvIntransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: naCvIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(naCvIntransitiveDescriptorPoisonedContext)),
            classAWithPoisonedDescriptors: naCvIntransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: naCvIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-na-cv-intransitive-source-frame",
            operation: "andrews-preterit-class-a-na-cv-intransitive-policy",
            sourceVerb: "pana",
            targetClassAAndB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [{ base: "pan", suffix: "ki", policy: "andrews-preterit-class-a-na-cv-intransitive-policy" }],
            classB: [{ base: "pana", suffix: "k", policy: "andrews-preterit-class-a-na-cv-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [{ base: "pan", suffix: "ki", policy: "andrews-preterit-class-a-na-cv-intransitive-policy" }],
            classBWithPoisonedDescriptors: [{ base: "pana", suffix: "k", policy: "andrews-preterit-class-a-na-cv-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A n+a CV|CV intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedNaCvIntransitiveFrame.sourceSignature,
            operation: displayPoisonedNaCvIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassANaCvIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedNaCvIntransitiveFrame,
                operationFrame: ctx.buildPretClassANaCvIntransitiveOperationFrame(displayPoisonedNaCvIntransitiveFrame),
            }),
        },
        {
            signature: naCvIntransitiveContext.classANaCvIntransitiveSourceFrame.sourceSignature,
            operation: "pana",
            mismatch: "",
        }
    );
    const contradictoryNaCvIntransitiveSourceFrame = {
        ...naCvIntransitiveContext.classANaCvIntransitiveSourceFrame,
        transitivityFrame: {
            ...naCvIntransitiveContext.classANaCvIntransitiveSourceFrame.transitivityFrame,
            text: "transitive",
        },
    };
    const contradictoryNaCvIntransitiveOperation = {
        ...naCvIntransitiveContext.classANaCvIntransitiveOperationFrame,
        targetFrame: {
            ...naCvIntransitiveContext.classANaCvIntransitiveOperationFrame.targetFrame,
            allowClassBKSuffix: false,
        },
    };
    const missingNaCvIntransitiveTargetOperation = {
        ...naCvIntransitiveContext.classANaCvIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A n+a CV|CV intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassANaCvIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassANaCvIntransitiveFrameMismatch({
                sourceFrame: naCvIntransitiveContext.classANaCvIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassANaCvIntransitiveFrameMismatch({
                sourceFrame: naCvIntransitiveContext.classANaCvIntransitiveSourceFrame,
                operationFrame: missingNaCvIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassANaCvIntransitiveFrameMismatch({
                sourceFrame: contradictoryNaCvIntransitiveSourceFrame,
                operationFrame: naCvIntransitiveContext.classANaCvIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassANaCvIntransitiveFrameMismatch({
                sourceFrame: naCvIntransitiveContext.classANaCvIntransitiveSourceFrame,
                operationFrame: contradictoryNaCvIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A n+a CV|CV intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvIntransitiveContext,
                classANaCvIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvIntransitiveContext,
                classANaCvIntransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...naCvIntransitiveContext,
                classANaCvIntransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...naCvIntransitiveContext,
                classANaCvIntransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...naCvIntransitiveContext,
                classANaCvIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...naCvIntransitiveContext,
                classANaCvIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassANaCvIntransitiveSourceFrame({
                sourceVerb: "tana",
                syllables: ctx.getSyllables("tana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("tana", "tana", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            vnaSourceBlocked: ctx.buildPretClassANaCvIntransitiveSourceFrame({
                sourceVerb: "ana",
                syllables: ctx.getSyllables("ana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("ana", "ana", false, {}).rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            vnaSourceBlocked: null,
        }
    );
    const vnaIntransitiveContext = ctx.buildPretUniversalContext("ana", "ana", false, {});
    const displayPoisonedVnaIntransitiveFrame = ctx.buildPretClassBVnaIntransitiveSourceFrame({
        sourceVerb: "ana",
        syllables: ctx.getSyllables("ana", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: vnaIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const vnaIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...vnaIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const vnaIntransitiveDescriptorPoisonedContext = {
        ...vnaIntransitiveContext,
        descriptorState: {
            ...vnaIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const vnaIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(vnaIntransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class B V|CV(na) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: vnaIntransitiveContext.classBVnaIntransitiveSourceFrame?.kind || "",
            operation: vnaIntransitiveContext.classBVnaIntransitiveOperationFrame?.operationId || "",
            sourceVerb: vnaIntransitiveContext.classBVnaIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassB: vnaIntransitiveContext.classBVnaIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && vnaIntransitiveContext.classBVnaIntransitiveOperationFrame?.targetFrame?.targetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...vnaIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classB: vnaIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(vnaIntransitiveDescriptorPoisonedContext)),
            classBWithPoisonedDescriptors: vnaIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-vna-intransitive-source-frame",
            operation: "andrews-preterit-class-b-vna-intransitive-policy",
            sourceVerb: "ana",
            targetClassB: true,
            candidatesWithLyingStrings: ["B"],
            classB: [{ base: "ana", suffix: "k", policy: "andrews-preterit-class-b-vna-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["B"],
            classBWithPoisonedDescriptors: [{ base: "ana", suffix: "k", policy: "andrews-preterit-class-b-vna-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class B V|CV(na) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedVnaIntransitiveFrame.sourceSignature,
            operation: displayPoisonedVnaIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBVnaIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedVnaIntransitiveFrame,
                operationFrame: ctx.buildPretClassBVnaIntransitiveOperationFrame(displayPoisonedVnaIntransitiveFrame),
            }),
        },
        {
            signature: vnaIntransitiveContext.classBVnaIntransitiveSourceFrame.sourceSignature,
            operation: "ana",
            mismatch: "",
        }
    );
    const contradictoryVnaIntransitiveSourceFrame = {
        ...vnaIntransitiveContext.classBVnaIntransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...vnaIntransitiveContext.classBVnaIntransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV",
        },
    };
    const contradictoryVnaIntransitiveOperation = {
        ...vnaIntransitiveContext.classBVnaIntransitiveOperationFrame,
        targetFrame: {
            ...vnaIntransitiveContext.classBVnaIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingVnaIntransitiveTargetOperation = {
        ...vnaIntransitiveContext.classBVnaIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B V|CV(na) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBVnaIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBVnaIntransitiveFrameMismatch({
                sourceFrame: vnaIntransitiveContext.classBVnaIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBVnaIntransitiveFrameMismatch({
                sourceFrame: vnaIntransitiveContext.classBVnaIntransitiveSourceFrame,
                operationFrame: missingVnaIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBVnaIntransitiveFrameMismatch({
                sourceFrame: contradictoryVnaIntransitiveSourceFrame,
                operationFrame: vnaIntransitiveContext.classBVnaIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBVnaIntransitiveFrameMismatch({
                sourceFrame: vnaIntransitiveContext.classBVnaIntransitiveSourceFrame,
                operationFrame: contradictoryVnaIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class B V|CV(na) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vnaIntransitiveContext,
                classBVnaIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vnaIntransitiveContext,
                classBVnaIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...vnaIntransitiveContext,
                classBVnaIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...vnaIntransitiveContext,
                classBVnaIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBVnaIntransitiveSourceFrame({
                sourceVerb: "ana",
                syllables: ctx.getSyllables("ana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("ana", "ana", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            cvnaSourceBlocked: ctx.buildPretClassBVnaIntransitiveSourceFrame({
                sourceVerb: "pana",
                syllables: ctx.getSyllables("pana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            cvnaSourceBlocked: null,
        }
    );
    const kwiCvIntransitiveContext = ctx.buildPretUniversalContext("takwi", "takwi", false, {});
    const displayPoisonedKwiCvIntransitiveFrame = ctx.buildPretClassBKwiCvIntransitiveSourceFrame({
        sourceVerb: "takwi",
        syllables: ctx.getSyllables("takwi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: kwiCvIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const kwiCvIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...kwiCvIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const kwiCvIntransitiveDescriptorPoisonedContext = {
        ...kwiCvIntransitiveContext,
        descriptorState: {
            ...kwiCvIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const kwiCvIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(kwiCvIntransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class B kw+i CV|CV intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame?.kind || "",
            operation: kwiCvIntransitiveContext.classBKwiCvIntransitiveOperationFrame?.operationId || "",
            sourceVerb: kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassB: kwiCvIntransitiveContext.classBKwiCvIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && kwiCvIntransitiveContext.classBKwiCvIntransitiveOperationFrame?.targetFrame?.targetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...kwiCvIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classB: kwiCvIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(kwiCvIntransitiveDescriptorPoisonedContext)),
            classBWithPoisonedDescriptors: kwiCvIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-kwi-cv-intransitive-source-frame",
            operation: "andrews-preterit-class-b-kwi-cv-intransitive-policy",
            sourceVerb: "takwi",
            targetClassB: true,
            candidatesWithLyingStrings: ["B"],
            classB: [{ base: "takwi", suffix: "k", policy: "andrews-preterit-class-b-kwi-cv-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["B"],
            classBWithPoisonedDescriptors: [{ base: "takwi", suffix: "k", policy: "andrews-preterit-class-b-kwi-cv-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class B kw+i CV|CV intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedKwiCvIntransitiveFrame.sourceSignature,
            operation: displayPoisonedKwiCvIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBKwiCvIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedKwiCvIntransitiveFrame,
                operationFrame: ctx.buildPretClassBKwiCvIntransitiveOperationFrame(displayPoisonedKwiCvIntransitiveFrame),
            }),
        },
        {
            signature: kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame.sourceSignature,
            operation: "takwi",
            mismatch: "",
        }
    );
    const contradictoryKwiCvIntransitiveSourceFrame = {
        ...kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV|CV",
        },
    };
    const contradictoryKwiCvIntransitiveOperation = {
        ...kwiCvIntransitiveContext.classBKwiCvIntransitiveOperationFrame,
        targetFrame: {
            ...kwiCvIntransitiveContext.classBKwiCvIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingKwiCvIntransitiveTargetOperation = {
        ...kwiCvIntransitiveContext.classBKwiCvIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B kw+i CV|CV intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBKwiCvIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBKwiCvIntransitiveFrameMismatch({
                sourceFrame: kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBKwiCvIntransitiveFrameMismatch({
                sourceFrame: kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame,
                operationFrame: missingKwiCvIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBKwiCvIntransitiveFrameMismatch({
                sourceFrame: contradictoryKwiCvIntransitiveSourceFrame,
                operationFrame: kwiCvIntransitiveContext.classBKwiCvIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBKwiCvIntransitiveFrameMismatch({
                sourceFrame: kwiCvIntransitiveContext.classBKwiCvIntransitiveSourceFrame,
                operationFrame: contradictoryKwiCvIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class B kw+i CV|CV intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...kwiCvIntransitiveContext,
                classBKwiCvIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...kwiCvIntransitiveContext,
                classBKwiCvIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...kwiCvIntransitiveContext,
                classBKwiCvIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...kwiCvIntransitiveContext,
                classBKwiCvIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBKwiCvIntransitiveSourceFrame({
                sourceVerb: "takwi",
                syllables: ctx.getSyllables("takwi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: kwiCvIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            paSourceBlocked: ctx.buildPretClassBKwiCvIntransitiveSourceFrame({
                sourceVerb: "mipa",
                syllables: ctx.getSyllables("mipa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: paCvIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            paSourceBlocked: null,
        }
    );
    const vcvcuIntransitiveContext = ctx.buildPretUniversalContext("akaku", "akaku", false, {});
    const displayPoisonedVcvcuIntransitiveFrame = ctx.buildPretClassBVcvcuIntransitiveSourceFrame({
        sourceVerb: "akaku",
        syllables: ctx.getSyllables("akaku", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: vcvcuIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const vcvcuIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...vcvcuIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const vcvcuIntransitiveDescriptorPoisonedContext = {
        ...vcvcuIntransitiveContext,
        descriptorState: {
            ...vcvcuIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const vcvcuIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(vcvcuIntransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class B V|CV|CV(u) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame?.kind || "",
            operation: vcvcuIntransitiveContext.classBVcvcuIntransitiveOperationFrame?.operationId || "",
            sourceVerb: vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassB: vcvcuIntransitiveContext.classBVcvcuIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && vcvcuIntransitiveContext.classBVcvcuIntransitiveOperationFrame?.targetFrame?.targetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...vcvcuIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classB: vcvcuIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(vcvcuIntransitiveDescriptorPoisonedContext)),
            classBWithPoisonedDescriptors: vcvcuIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-vcvcu-intransitive-source-frame",
            operation: "andrews-preterit-class-b-vcvcu-intransitive-policy",
            sourceVerb: "akaku",
            targetClassB: true,
            candidatesWithLyingStrings: ["B"],
            classB: [{ base: "akaku", suffix: "k", policy: "andrews-preterit-class-b-vcvcu-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["B"],
            classBWithPoisonedDescriptors: [{ base: "akaku", suffix: "k", policy: "andrews-preterit-class-b-vcvcu-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class B V|CV|CV(u) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedVcvcuIntransitiveFrame.sourceSignature,
            operation: displayPoisonedVcvcuIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBVcvcuIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedVcvcuIntransitiveFrame,
                operationFrame: ctx.buildPretClassBVcvcuIntransitiveOperationFrame(displayPoisonedVcvcuIntransitiveFrame),
            }),
        },
        {
            signature: vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame.sourceSignature,
            operation: "akaku",
            mismatch: "",
        }
    );
    const contradictoryVcvcuIntransitiveSourceFrame = {
        ...vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame,
        finalNucleusFrame: {
            ...vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame.finalNucleusFrame,
            text: "i",
        },
    };
    const contradictoryVcvcuIntransitiveOperation = {
        ...vcvcuIntransitiveContext.classBVcvcuIntransitiveOperationFrame,
        targetFrame: {
            ...vcvcuIntransitiveContext.classBVcvcuIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingVcvcuIntransitiveTargetOperation = {
        ...vcvcuIntransitiveContext.classBVcvcuIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B V|CV|CV(u) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBVcvcuIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBVcvcuIntransitiveFrameMismatch({
                sourceFrame: vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBVcvcuIntransitiveFrameMismatch({
                sourceFrame: vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame,
                operationFrame: missingVcvcuIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBVcvcuIntransitiveFrameMismatch({
                sourceFrame: contradictoryVcvcuIntransitiveSourceFrame,
                operationFrame: vcvcuIntransitiveContext.classBVcvcuIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBVcvcuIntransitiveFrameMismatch({
                sourceFrame: vcvcuIntransitiveContext.classBVcvcuIntransitiveSourceFrame,
                operationFrame: contradictoryVcvcuIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class B V|CV|CV(u) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vcvcuIntransitiveContext,
                classBVcvcuIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vcvcuIntransitiveContext,
                classBVcvcuIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...vcvcuIntransitiveContext,
                classBVcvcuIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...vcvcuIntransitiveContext,
                classBVcvcuIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBVcvcuIntransitiveSourceFrame({
                sourceVerb: "akaku",
                syllables: ctx.getSyllables("akaku", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vcvcuIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            kwiSourceBlocked: ctx.buildPretClassBVcvcuIntransitiveSourceFrame({
                sourceVerb: "takwi",
                syllables: ctx.getSyllables("takwi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: kwiCvIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            kwiSourceBlocked: null,
        }
    );
    const vlcvwiIntransitiveContext = ctx.buildPretUniversalContext("altawi", "altawi", false, {});
    const displayPoisonedVlcvwiIntransitiveFrame = ctx.buildPretClassBVlcvwiIntransitiveSourceFrame({
        sourceVerb: "altawi",
        syllables: ctx.getSyllables("altawi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: vlcvwiIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const vlcvwiIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...vlcvwiIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const vlcvwiIntransitiveDescriptorPoisonedContext = {
        ...vlcvwiIntransitiveContext,
        descriptorState: {
            ...vlcvwiIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const vlcvwiIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(vlcvwiIntransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class B Vl|CV|CV(wi) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame?.kind || "",
            operation: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveOperationFrame?.operationId || "",
            sourceVerb: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassB: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && vlcvwiIntransitiveContext.classBVlcvwiIntransitiveOperationFrame?.targetFrame?.targetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...vlcvwiIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classB: vlcvwiIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(vlcvwiIntransitiveDescriptorPoisonedContext)),
            classBWithPoisonedDescriptors: vlcvwiIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-vlcvwi-intransitive-source-frame",
            operation: "andrews-preterit-class-b-vlcvwi-intransitive-policy",
            sourceVerb: "altawi",
            targetClassB: true,
            candidatesWithLyingStrings: ["B"],
            classB: [{ base: "altawi", suffix: "k", policy: "andrews-preterit-class-b-vlcvwi-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["B"],
            classBWithPoisonedDescriptors: [{ base: "altawi", suffix: "k", policy: "andrews-preterit-class-b-vlcvwi-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class B Vl|CV|CV(wi) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedVlcvwiIntransitiveFrame.sourceSignature,
            operation: displayPoisonedVlcvwiIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBVlcvwiIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedVlcvwiIntransitiveFrame,
                operationFrame: ctx.buildPretClassBVlcvwiIntransitiveOperationFrame(displayPoisonedVlcvwiIntransitiveFrame),
            }),
        },
        {
            signature: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame.sourceSignature,
            operation: "altawi",
            mismatch: "",
        }
    );
    const contradictoryVlcvwiIntransitiveSourceFrame = {
        ...vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame.rightEdgeProfileFrame,
            text: "Vl|V|CV",
        },
    };
    const contradictoryVlcvwiIntransitiveOperation = {
        ...vlcvwiIntransitiveContext.classBVlcvwiIntransitiveOperationFrame,
        targetFrame: {
            ...vlcvwiIntransitiveContext.classBVlcvwiIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingVlcvwiIntransitiveTargetOperation = {
        ...vlcvwiIntransitiveContext.classBVlcvwiIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B Vl|CV|CV(wi) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBVlcvwiIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBVlcvwiIntransitiveFrameMismatch({
                sourceFrame: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBVlcvwiIntransitiveFrameMismatch({
                sourceFrame: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame,
                operationFrame: missingVlcvwiIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBVlcvwiIntransitiveFrameMismatch({
                sourceFrame: contradictoryVlcvwiIntransitiveSourceFrame,
                operationFrame: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBVlcvwiIntransitiveFrameMismatch({
                sourceFrame: vlcvwiIntransitiveContext.classBVlcvwiIntransitiveSourceFrame,
                operationFrame: contradictoryVlcvwiIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class B Vl|CV|CV(wi) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vlcvwiIntransitiveContext,
                classBVlcvwiIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vlcvwiIntransitiveContext,
                classBVlcvwiIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...vlcvwiIntransitiveContext,
                classBVlcvwiIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...vlcvwiIntransitiveContext,
                classBVlcvwiIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBVlcvwiIntransitiveSourceFrame({
                sourceVerb: "altawi",
                syllables: ctx.getSyllables("altawi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vlcvwiIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            vcvcuSourceBlocked: ctx.buildPretClassBVlcvwiIntransitiveSourceFrame({
                sourceVerb: "akaku",
                syllables: ctx.getSyllables("akaku", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vcvcuIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            vcvcuSourceBlocked: null,
        }
    );
    const cvniuIntransitiveContext = ctx.buildPretUniversalContext("kuni", "kuni", false, {});
    const displayPoisonedCvniuIntransitiveFrame = ctx.buildPretClassBCvniuIntransitiveSourceFrame({
        sourceVerb: "kuni",
        syllables: ctx.getSyllables("kuni", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvniuIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvniuIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cvniuIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvniuIntransitiveDescriptorPoisonedContext = {
        ...cvniuIntransitiveContext,
        descriptorState: {
            ...cvniuIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvniuIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        cvniuIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class B CV(u)|CV(ni) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame?.kind || "",
            operation: cvniuIntransitiveContext.classBCvniuIntransitiveOperationFrame?.operationId || "",
            sourceVerb: cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassB: cvniuIntransitiveContext.classBCvniuIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cvniuIntransitiveContext.classBCvniuIntransitiveOperationFrame?.targetFrame?.targetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvniuIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classB: cvniuIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvniuIntransitiveDescriptorPoisonedContext)
            ),
            classBWithPoisonedDescriptors: cvniuIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-cvniu-intransitive-source-frame",
            operation: "andrews-preterit-class-b-cvniu-intransitive-policy",
            sourceVerb: "kuni",
            targetClassB: true,
            candidatesWithLyingStrings: ["B"],
            classB: [{ base: "kuni", suffix: "k", policy: "andrews-preterit-class-b-cvniu-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["B"],
            classBWithPoisonedDescriptors: [{ base: "kuni", suffix: "k", policy: "andrews-preterit-class-b-cvniu-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class B CV(u)|CV(ni) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvniuIntransitiveFrame.sourceSignature,
            operation: displayPoisonedCvniuIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBCvniuIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvniuIntransitiveFrame,
                operationFrame: ctx.buildPretClassBCvniuIntransitiveOperationFrame(displayPoisonedCvniuIntransitiveFrame),
            }),
        },
        {
            signature: cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame.sourceSignature,
            operation: "kuni",
            mismatch: "",
        }
    );
    const contradictoryCvniuIntransitiveSourceFrame = {
        ...cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame,
        previousNucleusFrame: {
            ...cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame.previousNucleusFrame,
            text: "a",
        },
    };
    const contradictoryCvniuIntransitiveOperation = {
        ...cvniuIntransitiveContext.classBCvniuIntransitiveOperationFrame,
        targetFrame: {
            ...cvniuIntransitiveContext.classBCvniuIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingCvniuIntransitiveTargetOperation = {
        ...cvniuIntransitiveContext.classBCvniuIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B CV(u)|CV(ni) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBCvniuIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBCvniuIntransitiveFrameMismatch({
                sourceFrame: cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBCvniuIntransitiveFrameMismatch({
                sourceFrame: cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame,
                operationFrame: missingCvniuIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBCvniuIntransitiveFrameMismatch({
                sourceFrame: contradictoryCvniuIntransitiveSourceFrame,
                operationFrame: cvniuIntransitiveContext.classBCvniuIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBCvniuIntransitiveFrameMismatch({
                sourceFrame: cvniuIntransitiveContext.classBCvniuIntransitiveSourceFrame,
                operationFrame: contradictoryCvniuIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const cvniaIntransitiveContext = ctx.buildPretUniversalContext("tani", "tani", false, {});
    s.eq(
        "preterit Class B CV(u)|CV(ni) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvniuIntransitiveContext,
                classBCvniuIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvniuIntransitiveContext,
                classBCvniuIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cvniuIntransitiveContext,
                classBCvniuIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cvniuIntransitiveContext,
                classBCvniuIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBCvniuIntransitiveSourceFrame({
                sourceVerb: "kuni",
                syllables: ctx.getSyllables("kuni", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvniuIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            nonUSourceBlocked: ctx.buildPretClassBCvniuIntransitiveSourceFrame({
                sourceVerb: "tani",
                syllables: ctx.getSyllables("tani", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvniaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            nonUSourceBlocked: null,
        }
    );
    const cvvniIntransitiveContext = ctx.buildPretUniversalContext("teini", "teini", false, {});
    const displayPoisonedCvvniIntransitiveFrame = ctx.buildPretClassACvvniIntransitiveSourceFrame({
        sourceVerb: "teini",
        syllables: ctx.getSyllables("teini", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvvniIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvvniIntransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvvniIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvvniIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cvvniIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvvniIntransitiveDescriptorPoisonedContext = {
        ...cvvniIntransitiveContext,
        descriptorState: {
            ...cvvniIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvvniIntransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvvniIntransitiveDescriptorPoisonedContext
    );
    const cvvniIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        cvvniIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A/B CV|V|CV(ni) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame?.kind || "",
            operation: cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame?.operationId || "",
            sourceVerb: cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassA: cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            targetClassB: cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame?.targetFrame?.classBTargetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvvniIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvvniIntransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: cvvniIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvvniIntransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvvniIntransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: cvvniIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvvni-intransitive-source-frame",
            operation: "andrews-preterit-class-a-cvvni-intransitive-policy",
            sourceVerb: "teini",
            targetClassA: true,
            targetClassB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [{ base: "tein", suffix: "ki", policy: "andrews-preterit-class-a-cvvni-intransitive-policy" }],
            classB: [{ base: "teini", suffix: "k", policy: "andrews-preterit-class-a-cvvni-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [{ base: "tein", suffix: "ki", policy: "andrews-preterit-class-a-cvvni-intransitive-policy" }],
            classBWithPoisonedDescriptors: [{ base: "teini", suffix: "k", policy: "andrews-preterit-class-a-cvvni-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A/B CV|V|CV(ni) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvvniIntransitiveFrame.sourceSignature,
            operation: displayPoisonedCvvniIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvvniIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvvniIntransitiveFrame,
                operationFrame: ctx.buildPretClassACvvniIntransitiveOperationFrame(displayPoisonedCvvniIntransitiveFrame),
            }),
        },
        {
            signature: cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame.sourceSignature,
            operation: "teini",
            mismatch: "",
        }
    );
    const contradictoryCvvniIntransitiveSourceFrame = {
        ...cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame,
        previousNucleusFrame: {
            ...cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame.previousNucleusFrame,
            text: "a",
        },
    };
    const contradictoryCvvniIntransitiveOperation = {
        ...cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame,
        targetFrame: {
            ...cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame.targetFrame,
            allowClassB: false,
        },
    };
    const missingCvvniIntransitiveTargetOperation = {
        ...cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A/B CV|V|CV(ni) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvvniIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvvniIntransitiveFrameMismatch({
                sourceFrame: cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvvniIntransitiveFrameMismatch({
                sourceFrame: cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame,
                operationFrame: missingCvvniIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvvniIntransitiveFrameMismatch({
                sourceFrame: contradictoryCvvniIntransitiveSourceFrame,
                operationFrame: cvvniIntransitiveContext.classACvvniIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvvniIntransitiveFrameMismatch({
                sourceFrame: cvvniIntransitiveContext.classACvvniIntransitiveSourceFrame,
                operationFrame: contradictoryCvvniIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A/B CV|V|CV(ni) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvvniIntransitiveContext,
                classACvvniIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvvniIntransitiveContext,
                classACvvniIntransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvvniIntransitiveContext,
                classACvvniIntransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvvniIntransitiveContext,
                classACvvniIntransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cvvniIntransitiveContext,
                classACvvniIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cvvniIntransitiveContext,
                classACvvniIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassACvvniIntransitiveSourceFrame({
                sourceVerb: "teini",
                syllables: ctx.getSyllables("teini", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvvniIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            cvniuSourceBlocked: ctx.buildPretClassACvvniIntransitiveSourceFrame({
                sourceVerb: "kuni",
                syllables: ctx.getSyllables("kuni", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvniuIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            cvniuSourceBlocked: null,
        }
    );
    const cvsvIntransitiveContext = ctx.buildPretUniversalContext("pasi", "pasi", false, {});
    const displayPoisonedCvsvIntransitiveFrame = ctx.buildPretClassACvsvIntransitiveSourceFrame({
        sourceVerb: "pasi",
        syllables: ctx.getSyllables("pasi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvsvIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvsvIntransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvsvIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvsvIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cvsvIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvsvIntransitiveDescriptorPoisonedContext = {
        ...cvsvIntransitiveContext,
        descriptorState: {
            ...cvsvIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvsvIntransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvsvIntransitiveDescriptorPoisonedContext
    );
    const cvsvIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        cvsvIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A/B CV|CV(s+i) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame?.kind || "",
            operation: cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame?.operationId || "",
            sourceVerb: cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassA: cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            targetClassB: cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame?.targetFrame?.classBTargetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvsvIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvsvIntransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: cvsvIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvsvIntransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvsvIntransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: cvsvIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvsv-intransitive-source-frame",
            operation: "andrews-preterit-class-a-cvsv-intransitive-policy",
            sourceVerb: "pasi",
            targetClassA: true,
            targetClassB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [{ base: "pas", suffix: "ki", policy: "andrews-preterit-class-a-cvsv-intransitive-policy" }],
            classB: [{ base: "pasi", suffix: "k", policy: "andrews-preterit-class-a-cvsv-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [{ base: "pas", suffix: "ki", policy: "andrews-preterit-class-a-cvsv-intransitive-policy" }],
            classBWithPoisonedDescriptors: [{ base: "pasi", suffix: "k", policy: "andrews-preterit-class-a-cvsv-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A/B CV|CV(s+i) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvsvIntransitiveFrame.sourceSignature,
            operation: displayPoisonedCvsvIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvsvIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvsvIntransitiveFrame,
                operationFrame: ctx.buildPretClassACvsvIntransitiveOperationFrame(displayPoisonedCvsvIntransitiveFrame),
            }),
        },
        {
            signature: cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame.sourceSignature,
            operation: "pasi",
            mismatch: "",
        }
    );
    const contradictoryCvsvIntransitiveSourceFrame = {
        ...cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame,
        finalNucleusFrame: {
            ...cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame.finalNucleusFrame,
            text: "a",
        },
    };
    const contradictoryCvsvIntransitiveOperation = {
        ...cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame,
        targetFrame: {
            ...cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame.targetFrame,
            allowClassB: false,
        },
    };
    const missingCvsvIntransitiveTargetOperation = {
        ...cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A/B CV|CV(s+i) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvsvIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvsvIntransitiveFrameMismatch({
                sourceFrame: cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvsvIntransitiveFrameMismatch({
                sourceFrame: cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame,
                operationFrame: missingCvsvIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvsvIntransitiveFrameMismatch({
                sourceFrame: contradictoryCvsvIntransitiveSourceFrame,
                operationFrame: cvsvIntransitiveContext.classACvsvIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvsvIntransitiveFrameMismatch({
                sourceFrame: cvsvIntransitiveContext.classACvsvIntransitiveSourceFrame,
                operationFrame: contradictoryCvsvIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const cvsaIntransitiveContext = ctx.buildPretUniversalContext("pasa", "pasa", false, {});
    s.eq(
        "preterit Class A/B CV|CV(s+i) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvsvIntransitiveContext,
                classACvsvIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvsvIntransitiveContext,
                classACvsvIntransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvsvIntransitiveContext,
                classACvsvIntransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvsvIntransitiveContext,
                classACvsvIntransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cvsvIntransitiveContext,
                classACvsvIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cvsvIntransitiveContext,
                classACvsvIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassACvsvIntransitiveSourceFrame({
                sourceVerb: "pasi",
                syllables: ctx.getSyllables("pasi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvsvIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            nonISourceBlocked: ctx.buildPretClassACvsvIntransitiveSourceFrame({
                sourceVerb: "pasa",
                syllables: ctx.getSyllables("pasa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvsaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            nonISourceBlocked: null,
        }
    );
    const cvwiTransitiveContext = ctx.buildPretUniversalContext("sewi", "sewi", true, {});
    const displayPoisonedCvwiTransitiveFrame = ctx.buildPretClassACvwiTransitiveSourceFrame({
        sourceVerb: "sewi",
        syllables: ctx.getSyllables("sewi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvwiTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        isReduplicated: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvwiTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvwiTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvwiTransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cvwiTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvwiTransitiveDescriptorPoisonedContext = {
        ...cvwiTransitiveContext,
        descriptorState: {
            ...cvwiTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvwiTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(cvwiTransitiveDescriptorPoisonedContext);
    const cvwiTransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(cvwiTransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class A/B CV|CV(w+i) transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvwiTransitiveContext.classACvwiTransitiveSourceFrame?.kind || "",
            operation: cvwiTransitiveContext.classACvwiTransitiveOperationFrame?.operationId || "",
            sourceVerb: cvwiTransitiveContext.classACvwiTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassAB: cvwiTransitiveContext.classACvwiTransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvwiTransitiveContext.classACvwiTransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cvwiTransitiveContext.classACvwiTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && cvwiTransitiveContext.classACvwiTransitiveOperationFrame?.targetFrame?.classBTargetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwiTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvwiTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: cvwiTransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(cvwiTransitiveDescriptorPoisonedContext)),
            classAWithPoisonedDescriptors: cvwiTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: cvwiTransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvwi-transitive-source-frame",
            operation: "andrews-preterit-class-a-cvwi-transitive-policy",
            sourceVerb: "sewi",
            targetClassAB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [
                { base: "sew", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
                { base: "sej", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
            ],
            classB: [{ base: "sewi", suffix: "k", policy: "andrews-preterit-class-a-cvwi-transitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [
                { base: "sew", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
                { base: "sej", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
            ],
            classBWithPoisonedDescriptors: [{ base: "sewi", suffix: "k", policy: "andrews-preterit-class-a-cvwi-transitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A/B CV|CV(w+i) transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvwiTransitiveFrame.sourceSignature,
            operation: displayPoisonedCvwiTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvwiTransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvwiTransitiveFrame,
                operationFrame: ctx.buildPretClassACvwiTransitiveOperationFrame(displayPoisonedCvwiTransitiveFrame),
            }),
        },
        {
            signature: cvwiTransitiveContext.classACvwiTransitiveSourceFrame.sourceSignature,
            operation: "sewi",
            mismatch: "",
        }
    );
    const contradictoryCvwiTransitiveSourceFrame = {
        ...cvwiTransitiveContext.classACvwiTransitiveSourceFrame,
        reduplicationFrame: {
            ...cvwiTransitiveContext.classACvwiTransitiveSourceFrame.reduplicationFrame,
            text: "present",
        },
    };
    const contradictoryCvwiTransitiveOperation = {
        ...cvwiTransitiveContext.classACvwiTransitiveOperationFrame,
        targetFrame: {
            ...cvwiTransitiveContext.classACvwiTransitiveOperationFrame.targetFrame,
            allowClassB: false,
        },
    };
    const missingCvwiTransitiveTargetOperation = {
        ...cvwiTransitiveContext.classACvwiTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A/B CV|CV(w+i) transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvwiTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvwiTransitiveFrameMismatch({
                sourceFrame: cvwiTransitiveContext.classACvwiTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvwiTransitiveFrameMismatch({
                sourceFrame: cvwiTransitiveContext.classACvwiTransitiveSourceFrame,
                operationFrame: missingCvwiTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvwiTransitiveFrameMismatch({
                sourceFrame: contradictoryCvwiTransitiveSourceFrame,
                operationFrame: cvwiTransitiveContext.classACvwiTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvwiTransitiveFrameMismatch({
                sourceFrame: cvwiTransitiveContext.classACvwiTransitiveSourceFrame,
                operationFrame: contradictoryCvwiTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const cvwaTransitiveContext = ctx.buildPretUniversalContext("sewa", "sewa", true, {});
    s.eq(
        "preterit Class A/B CV|CV(w+i) transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwiTransitiveContext,
                classACvwiTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwiTransitiveContext,
                classACvwiTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvwiTransitiveContext,
                classACvwiTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvwiTransitiveContext,
                classACvwiTransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cvwiTransitiveContext,
                classACvwiTransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cvwiTransitiveContext,
                classACvwiTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassACvwiTransitiveSourceFrame({
                sourceVerb: "sewi",
                syllables: ctx.getSyllables("sewi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvwiTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
                isReduplicated: false,
            }),
            nonISourceBlocked: ctx.buildPretClassACvwiTransitiveSourceFrame({
                sourceVerb: "sewa",
                syllables: ctx.getSyllables("sewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvwaTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
                isReduplicated: false,
            }),
            reduplicatedSourceFrame: (() => {
                const frame = ctx.buildPretClassACvwiTransitiveSourceFrame({
                    sourceVerb: "sewi",
                    syllables: ctx.getSyllables("sewi", { analysis: true, assumeFinalV: true }),
                    rightEdgeDescriptor: cvwiTransitiveContext.rightEdgeDescriptor,
                    isTransitive: true,
                    isMonosyllable: false,
                    isReduplicated: true,
                });
                return frame ? {
                    kind: frame.kind,
                    reduplication: frame.reduplicationFrame?.text || "",
                    targetPolicy: frame.targetPolicyFrame?.text || "",
                } : null;
            })(),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            intransitiveSourceBlocked: null,
            nonISourceBlocked: null,
            reduplicatedSourceFrame: {
                kind: "preterit-class-a-cvwi-transitive-source-frame",
                reduplication: "present",
                targetPolicy: "allowclassazeroandkiandclassbk",
            },
        }
    );
    const reduplicatedCvwiTransitiveContext = ctx.buildPretUniversalContext("sesewi", "sesewi", true, {});
    const reduplicatedCvwiTransitiveDescriptorPoisonedContext = {
        ...reduplicatedCvwiTransitiveContext,
        descriptorState: {
            ...reduplicatedCvwiTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    s.eq(
        "preterit Class A/B reduplicated CV|CV(w+i) transitive policy consumes typed frame before descriptor authority",
        {
            sourceVerb: reduplicatedCvwiTransitiveContext.classACvwiTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            reduplication: reduplicatedCvwiTransitiveContext.classACvwiTransitiveSourceFrame?.reduplicationFrame?.text || "",
            allowZero: reduplicatedCvwiTransitiveContext.classACvwiTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true,
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(reduplicatedCvwiTransitiveDescriptorPoisonedContext)),
            classA: (ctx.buildPretUniversalClassA({
                ...reduplicatedCvwiTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            }) || []).map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: (ctx.buildPretUniversalClassB({
                ...reduplicatedCvwiTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            }) || []).map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...reduplicatedCvwiTransitiveContext,
                classACvwiTransitiveOperationFrame: null,
            })),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...reduplicatedCvwiTransitiveContext,
                classACvwiTransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...reduplicatedCvwiTransitiveContext,
                classACvwiTransitiveOperationFrame: null,
            }),
        },
        {
            sourceVerb: "sewi",
            reduplication: "present",
            allowZero: true,
            candidatesWithPoisonedDescriptors: ["B", "A"],
            classA: [
                { base: "sew", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
                { base: "sew", suffix: "", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
                { base: "sej", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
                { base: "sej", suffix: "", policy: "andrews-preterit-class-a-cvwi-transitive-policy" },
            ],
            classB: [{ base: "sewi", suffix: "k", policy: "andrews-preterit-class-a-cvwi-transitive-policy" }],
            noOperationCandidates: [],
            noSourceClassA: null,
            noOperationClassB: null,
        }
    );
    const cvcvwiTransitiveContext = ctx.buildPretUniversalContext("tepewi", "tepewi", true, {});
    const displayPoisonedCvcvwiTransitiveFrame = ctx.buildPretClassACvcvwiTransitiveSourceFrame({
        sourceVerb: "tepewi",
        syllables: ctx.getSyllables("tepewi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvcvwiTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        isReduplicated: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvcvwiTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvcvwiTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvcvwiTransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cvcvwiTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvcvwiTransitiveDescriptorPoisonedContext = {
        ...cvcvwiTransitiveContext,
        descriptorState: {
            ...cvcvwiTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvcvwiTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvcvwiTransitiveDescriptorPoisonedContext
    );
    const cvcvwiTransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        cvcvwiTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame?.kind || "",
            operation: cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame?.operationId || "",
            sourceVerb: cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassAB: cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true
                && cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame?.targetFrame?.allowKiSuffix === false
                && cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame?.targetFrame?.classBTargetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvcvwiTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvcvwiTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: cvcvwiTransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvcvwiTransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvcvwiTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: cvcvwiTransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvcvwi-transitive-source-frame",
            operation: "andrews-preterit-class-a-cvcvwi-transitive-policy",
            sourceVerb: "tepewi",
            targetClassAB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [
                { base: "tepew", suffix: "", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" },
                { base: "tepej", suffix: "", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" },
            ],
            classB: [{ base: "tepewi", suffix: "k", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [
                { base: "tepew", suffix: "", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" },
                { base: "tepej", suffix: "", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" },
            ],
            classBWithPoisonedDescriptors: [{ base: "tepewi", suffix: "k", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvcvwiTransitiveFrame.sourceSignature,
            operation: displayPoisonedCvcvwiTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvcvwiTransitiveFrame,
                operationFrame: ctx.buildPretClassACvcvwiTransitiveOperationFrame(displayPoisonedCvcvwiTransitiveFrame),
            }),
        },
        {
            signature: cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame.sourceSignature,
            operation: "tepewi",
            mismatch: "",
        }
    );
    const contradictoryCvcvwiTransitiveSourceFrame = {
        ...cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV",
        },
    };
    const contradictoryCvcvwiTransitiveOperation = {
        ...cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame,
        targetFrame: {
            ...cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: false,
        },
    };
    const missingCvcvwiTransitiveTargetOperation = {
        ...cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvcvwiTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame,
                operationFrame: missingCvcvwiTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: contradictoryCvcvwiTransitiveSourceFrame,
                operationFrame: cvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: cvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame,
                operationFrame: contradictoryCvcvwiTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const cvcvwaTransitiveContext = ctx.buildPretUniversalContext("tepewa", "tepewa", true, {});
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvcvwiTransitiveContext,
                classACvcvwiTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvcvwiTransitiveContext,
                classACvcvwiTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvcvwiTransitiveContext,
                classACvcvwiTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvcvwiTransitiveContext,
                classACvcvwiTransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cvcvwiTransitiveContext,
                classACvcvwiTransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cvcvwiTransitiveContext,
                classACvcvwiTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassACvcvwiTransitiveSourceFrame({
                sourceVerb: "tepewi",
                syllables: ctx.getSyllables("tepewi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvcvwiTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
                isReduplicated: false,
            }),
            nonISourceBlocked: ctx.buildPretClassACvcvwiTransitiveSourceFrame({
                sourceVerb: "tepewa",
                syllables: ctx.getSyllables("tepewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvcvwaTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
                isReduplicated: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            intransitiveSourceBlocked: null,
            nonISourceBlocked: null,
        }
    );
    const reduplicatedCvcvwiTransitiveContext = ctx.buildPretUniversalContext("tetepewi", "tetepewi", true, {});
    const reduplicatedCvcvwiDescriptorPoisonedContext = {
        ...reduplicatedCvcvwiTransitiveContext,
        descriptorState: {
            ...reduplicatedCvcvwiTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const contradictoryReduplicatedCvcvwiSourceFrame = {
        ...reduplicatedCvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame,
        reduplicationFrame: {
            ...reduplicatedCvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame.reduplicationFrame,
            text: "absent",
        },
    };
    s.eq(
        "preterit Class A/B reduplicated CV|CV|CV(w+i) transitive policy consumes typed frame before descriptor authority",
        {
            sourceVerb: reduplicatedCvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            reduplication: reduplicatedCvcvwiTransitiveContext.classACvcvwiTransitiveSourceFrame?.reduplicationFrame?.text || "",
            allowKi: reduplicatedCvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true,
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(reduplicatedCvcvwiDescriptorPoisonedContext)
            ),
            classA: (ctx.buildPretUniversalClassA({
                ...reduplicatedCvcvwiTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            }) || []).map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: (ctx.buildPretUniversalClassB({
                ...reduplicatedCvcvwiTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            }) || []).map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...reduplicatedCvcvwiTransitiveContext,
                classACvcvwiTransitiveOperationFrame: null,
            })),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...reduplicatedCvcvwiTransitiveContext,
                classACvcvwiTransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...reduplicatedCvcvwiTransitiveContext,
                classACvcvwiTransitiveOperationFrame: null,
            }),
            contradictoryReduplication: ctx.getPretClassACvcvwiTransitiveFrameMismatch({
                sourceFrame: contradictoryReduplicatedCvcvwiSourceFrame,
                operationFrame: reduplicatedCvcvwiTransitiveContext.classACvcvwiTransitiveOperationFrame,
            }),
        },
        {
            sourceVerb: "tepewi",
            reduplication: "present",
            allowKi: false,
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classA: [
                { base: "tepew", suffix: "", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" },
                { base: "tepej", suffix: "", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" },
            ],
            classB: [{ base: "tepewi", suffix: "k", policy: "andrews-preterit-class-a-cvcvwi-transitive-policy" }],
            noOperationCandidates: [],
            noSourceClassA: null,
            noOperationClassB: null,
            contradictoryReduplication: "contradictory-source-frame",
        }
    );
    const cvwaiTransitiveContext = ctx.buildPretUniversalContext("chiwa", "chiwa", true, {});
    const displayPoisonedCvwaiTransitiveFrame = ctx.buildPretClassACvwaiTransitiveSourceFrame({
        sourceVerb: "chiwa",
        syllables: ctx.getSyllables("chiwa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvwaiTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvwaiTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvwaiTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvwaiTransitiveDescriptorPoisonedContext = {
        ...cvwaiTransitiveContext,
        descriptorState: {
            ...cvwaiTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvwaiTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvwaiTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A CV(i)|CV(w+a) transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame?.kind || "",
            operation: cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame?.operationId || "",
            sourceVerb: cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassA: cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true
                && cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwaiTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvwaiTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvwaiTransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvwaiTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvwai-transitive-source-frame",
            operation: "andrews-preterit-class-a-cvwai-transitive-policy",
            sourceVerb: "chiwa",
            targetClassA: true,
            candidatesWithLyingStrings: ["A"],
            classA: [
                { base: "chiw", suffix: "ki", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
                { base: "chiw", suffix: "", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
                { base: "chij", suffix: "ki", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
                { base: "chij", suffix: "", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            classAWithPoisonedDescriptors: [
                { base: "chiw", suffix: "ki", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
                { base: "chiw", suffix: "", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
                { base: "chij", suffix: "ki", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
                { base: "chij", suffix: "", policy: "andrews-preterit-class-a-cvwai-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A CV(i)|CV(w+a) transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvwaiTransitiveFrame.sourceSignature,
            operation: displayPoisonedCvwaiTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvwaiTransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvwaiTransitiveFrame,
                operationFrame: ctx.buildPretClassACvwaiTransitiveOperationFrame(displayPoisonedCvwaiTransitiveFrame),
            }),
        },
        {
            signature: cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame.sourceSignature,
            operation: "chiwa",
            mismatch: "",
        }
    );
    const contradictoryCvwaiTransitiveSourceFrame = {
        ...cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame,
        previousNucleusFrame: {
            ...cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame.previousNucleusFrame,
            text: "e",
        },
    };
    const contradictoryCvwaiTransitiveOperation = {
        ...cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame,
        targetFrame: {
            ...cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: false,
        },
    };
    const missingCvwaiTransitiveTargetOperation = {
        ...cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A CV(i)|CV(w+a) transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvwaiTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvwaiTransitiveFrameMismatch({
                sourceFrame: cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvwaiTransitiveFrameMismatch({
                sourceFrame: cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame,
                operationFrame: missingCvwaiTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvwaiTransitiveFrameMismatch({
                sourceFrame: contradictoryCvwaiTransitiveSourceFrame,
                operationFrame: cvwaiTransitiveContext.classACvwaiTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvwaiTransitiveFrameMismatch({
                sourceFrame: cvwaiTransitiveContext.classACvwaiTransitiveSourceFrame,
                operationFrame: contradictoryCvwaiTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const cvweTransitiveContext = ctx.buildPretUniversalContext("chewa", "chewa", true, {});
    const vwaiTransitiveContext = ctx.buildPretUniversalContext("iwa", "iwa", true, {});
    s.eq(
        "preterit Class A CV(i)|CV(w+a) transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwaiTransitiveContext,
                classACvwaiTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwaiTransitiveContext,
                classACvwaiTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvwaiTransitiveContext,
                classACvwaiTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvwaiTransitiveContext,
                classACvwaiTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassACvwaiTransitiveSourceFrame({
                sourceVerb: "chiwa",
                syllables: ctx.getSyllables("chiwa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvwaiTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            nonISourceBlocked: ctx.buildPretClassACvwaiTransitiveSourceFrame({
                sourceVerb: "chewa",
                syllables: ctx.getSyllables("chewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvweTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            nonCvSourceBlocked: ctx.buildPretClassACvwaiTransitiveSourceFrame({
                sourceVerb: "iwa",
                syllables: ctx.getSyllables("iwa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vwaiTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            nonISourceBlocked: null,
            nonCvSourceBlocked: null,
        }
    );
    const cvewaTransitiveContext = ctx.buildPretUniversalContext("sewa", "sewa", true, {});
    const displayPoisonedCvewaTransitiveFrame = ctx.buildPretClassACvewaTransitiveSourceFrame({
        sourceVerb: "sewa",
        syllables: ctx.getSyllables("sewa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvewaTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvewaTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvewaTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvewaTransitiveDescriptorPoisonedContext = {
        ...cvewaTransitiveContext,
        descriptorState: {
            ...cvewaTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvewaTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvewaTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A CV(e)|CV(w+a) transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvewaTransitiveContext.classACvewaTransitiveSourceFrame?.kind || "",
            operation: cvewaTransitiveContext.classACvewaTransitiveOperationFrame?.operationId || "",
            sourceVerb: cvewaTransitiveContext.classACvewaTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassA: cvewaTransitiveContext.classACvewaTransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvewaTransitiveContext.classACvewaTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false
                && cvewaTransitiveContext.classACvewaTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvewaTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvewaTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvewaTransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvewaTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvewa-transitive-source-frame",
            operation: "andrews-preterit-class-a-cvewa-transitive-policy",
            sourceVerb: "sewa",
            targetClassA: true,
            candidatesWithLyingStrings: ["A"],
            classA: [
                { base: "sew", suffix: "ki", policy: "andrews-preterit-class-a-cvewa-transitive-policy" },
                { base: "sej", suffix: "ki", policy: "andrews-preterit-class-a-cvewa-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            classAWithPoisonedDescriptors: [
                { base: "sew", suffix: "ki", policy: "andrews-preterit-class-a-cvewa-transitive-policy" },
                { base: "sej", suffix: "ki", policy: "andrews-preterit-class-a-cvewa-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A CV(e)|CV(w+a) transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvewaTransitiveFrame.sourceSignature,
            operation: displayPoisonedCvewaTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvewaTransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvewaTransitiveFrame,
                operationFrame: ctx.buildPretClassACvewaTransitiveOperationFrame(displayPoisonedCvewaTransitiveFrame),
            }),
        },
        {
            signature: cvewaTransitiveContext.classACvewaTransitiveSourceFrame.sourceSignature,
            operation: "sewa",
            mismatch: "",
        }
    );
    const contradictoryCvewaTransitiveSourceFrame = {
        ...cvewaTransitiveContext.classACvewaTransitiveSourceFrame,
        previousNucleusFrame: {
            ...cvewaTransitiveContext.classACvewaTransitiveSourceFrame.previousNucleusFrame,
            text: "i",
        },
    };
    const contradictoryCvewaTransitiveOperation = {
        ...cvewaTransitiveContext.classACvewaTransitiveOperationFrame,
        targetFrame: {
            ...cvewaTransitiveContext.classACvewaTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingCvewaTransitiveTargetOperation = {
        ...cvewaTransitiveContext.classACvewaTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A CV(e)|CV(w+a) transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvewaTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvewaTransitiveFrameMismatch({
                sourceFrame: cvewaTransitiveContext.classACvewaTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvewaTransitiveFrameMismatch({
                sourceFrame: cvewaTransitiveContext.classACvewaTransitiveSourceFrame,
                operationFrame: missingCvewaTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvewaTransitiveFrameMismatch({
                sourceFrame: contradictoryCvewaTransitiveSourceFrame,
                operationFrame: cvewaTransitiveContext.classACvewaTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvewaTransitiveFrameMismatch({
                sourceFrame: cvewaTransitiveContext.classACvewaTransitiveSourceFrame,
                operationFrame: contradictoryCvewaTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const vcvewaTransitiveContext = ctx.buildPretUniversalContext("ewa", "ewa", true, {});
    s.eq(
        "preterit Class A CV(e)|CV(w+a) transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvewaTransitiveContext,
                classACvewaTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvewaTransitiveContext,
                classACvewaTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvewaTransitiveContext,
                classACvewaTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvewaTransitiveContext,
                classACvewaTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassACvewaTransitiveSourceFrame({
                sourceVerb: "sewa",
                syllables: ctx.getSyllables("sewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvewaTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            nonESourceBlocked: ctx.buildPretClassACvewaTransitiveSourceFrame({
                sourceVerb: "chiwa",
                syllables: ctx.getSyllables("chiwa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvwaiTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            nonCvSourceBlocked: ctx.buildPretClassACvewaTransitiveSourceFrame({
                sourceVerb: "ewa",
                syllables: ctx.getSyllables("ewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vcvewaTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            nonESourceBlocked: null,
            nonCvSourceBlocked: null,
        }
    );
    const cvawaTransitiveContext = ctx.buildPretUniversalContext("kawa", "kawa", true, {});
    const displayPoisonedCvawaTransitiveFrame = ctx.buildPretClassACvawaTransitiveSourceFrame({
        sourceVerb: "kawa",
        syllables: ctx.getSyllables("kawa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvawaTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        isReduplicated: false,
        hasSlashMarker: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvawaTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvawaTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvawaTransitiveDescriptorPoisonedContext = {
        ...cvawaTransitiveContext,
        descriptorState: {
            ...cvawaTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvawaTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvawaTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A CV(a)|CV(w+a) transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvawaTransitiveContext.classACvawaTransitiveSourceFrame?.kind || "",
            operation: cvawaTransitiveContext.classACvawaTransitiveOperationFrame?.operationId || "",
            routeFamily: cvawaTransitiveContext.classACvawaTransitiveOperationFrame?.routeFamily || "",
            sourceVerb: cvawaTransitiveContext.classACvawaTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassA: cvawaTransitiveContext.classACvawaTransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvawaTransitiveContext.classACvawaTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false
                && cvawaTransitiveContext.classACvawaTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && cvawaTransitiveContext.classACvawaTransitiveOperationFrame?.targetFrame?.allowJBaseVariant === false,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvawaTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvawaTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvawaTransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvawaTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvawa-transitive-source-frame",
            operation: "andrews-preterit-class-a-cvawa-transitive-policy",
            routeFamily: "preterit-class-a-cvwa-transitive",
            sourceVerb: "kawa",
            targetClassA: true,
            candidatesWithLyingStrings: ["A"],
            classA: [
                { base: "kaw", suffix: "ki", policy: "andrews-preterit-class-a-cvawa-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            classAWithPoisonedDescriptors: [
                { base: "kaw", suffix: "ki", policy: "andrews-preterit-class-a-cvawa-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A CV(a)|CV(w+a) transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvawaTransitiveFrame.sourceSignature,
            operation: displayPoisonedCvawaTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvawaTransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvawaTransitiveFrame,
                operationFrame: ctx.buildPretClassACvawaTransitiveOperationFrame(displayPoisonedCvawaTransitiveFrame),
            }),
        },
        {
            signature: cvawaTransitiveContext.classACvawaTransitiveSourceFrame.sourceSignature,
            operation: "kawa",
            mismatch: "",
        }
    );
    const contradictoryCvawaTransitiveSourceFrame = {
        ...cvawaTransitiveContext.classACvawaTransitiveSourceFrame,
        slashFrame: {
            ...cvawaTransitiveContext.classACvawaTransitiveSourceFrame.slashFrame,
            text: "present",
        },
    };
    const contradictoryCvawaTransitiveOperation = {
        ...cvawaTransitiveContext.classACvawaTransitiveOperationFrame,
        targetFrame: {
            ...cvawaTransitiveContext.classACvawaTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingCvawaTransitiveTargetOperation = {
        ...cvawaTransitiveContext.classACvawaTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A CV(a)|CV(w+a) transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvawaTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvawaTransitiveFrameMismatch({
                sourceFrame: cvawaTransitiveContext.classACvawaTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvawaTransitiveFrameMismatch({
                sourceFrame: cvawaTransitiveContext.classACvawaTransitiveSourceFrame,
                operationFrame: missingCvawaTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvawaTransitiveFrameMismatch({
                sourceFrame: contradictoryCvawaTransitiveSourceFrame,
                operationFrame: cvawaTransitiveContext.classACvawaTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvawaTransitiveFrameMismatch({
                sourceFrame: cvawaTransitiveContext.classACvawaTransitiveSourceFrame,
                operationFrame: contradictoryCvawaTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const vcawaTransitiveContext = ctx.buildPretUniversalContext("awa", "awa", true, {});
    s.eq(
        "preterit Class A CV(a)|CV(w+a) transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvawaTransitiveContext,
                classACvawaTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvawaTransitiveContext,
                classACvawaTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvawaTransitiveContext,
                classACvawaTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvawaTransitiveContext,
                classACvawaTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassACvawaTransitiveSourceFrame({
                sourceVerb: "kawa",
                syllables: ctx.getSyllables("kawa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvawaTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
                isReduplicated: false,
                hasSlashMarker: false,
            }),
            nonASourceBlocked: ctx.buildPretClassACvawaTransitiveSourceFrame({
                sourceVerb: "sewa",
                syllables: ctx.getSyllables("sewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvewaTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
                isReduplicated: false,
                hasSlashMarker: false,
            }),
            nonCvSourceBlocked: ctx.buildPretClassACvawaTransitiveSourceFrame({
                sourceVerb: "awa",
                syllables: ctx.getSyllables("awa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vcawaTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
                isReduplicated: false,
                hasSlashMarker: false,
            }),
            reduplicatedSourceBlocked: ctx.buildPretClassACvawaTransitiveSourceFrame({
                sourceVerb: "kawa",
                syllables: ctx.getSyllables("kawa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvawaTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
                isReduplicated: true,
                hasSlashMarker: false,
            }),
            slashSourceBlocked: ctx.buildPretClassACvawaTransitiveSourceFrame({
                sourceVerb: "kawa",
                syllables: ctx.getSyllables("kawa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvawaTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
                isReduplicated: false,
                hasSlashMarker: true,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            nonASourceBlocked: null,
            nonCvSourceBlocked: null,
            reduplicatedSourceBlocked: null,
            slashSourceBlocked: null,
        }
    );
    const cvwiIntransitiveContext = ctx.buildPretUniversalContext("sewi", "sewi", false, {});
    const displayPoisonedCvwiIntransitiveFrame = ctx.buildPretClassACvwiIntransitiveSourceFrame({
        sourceVerb: "sewi",
        syllables: ctx.getSyllables("sewi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvwiIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvwiIntransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvwiIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvwiIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cvwiIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvwiIntransitiveDescriptorPoisonedContext = {
        ...cvwiIntransitiveContext,
        descriptorState: {
            ...cvwiIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvwiIntransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvwiIntransitiveDescriptorPoisonedContext
    );
    const cvwiIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        cvwiIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A/B CV|CV(w+i) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame?.kind || "",
            operation: cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame?.operationId || "",
            sourceVerb: cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassAB: cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame?.targetFrame?.classBTargetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwiIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvwiIntransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: cvwiIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvwiIntransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvwiIntransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: cvwiIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvwi-intransitive-source-frame",
            operation: "andrews-preterit-class-a-cvwi-intransitive-policy",
            sourceVerb: "sewi",
            targetClassAB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [
                { base: "sew", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-intransitive-policy" },
                { base: "sej", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-intransitive-policy" },
            ],
            classB: [{ base: "sewi", suffix: "k", policy: "andrews-preterit-class-a-cvwi-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [
                { base: "sew", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-intransitive-policy" },
                { base: "sej", suffix: "ki", policy: "andrews-preterit-class-a-cvwi-intransitive-policy" },
            ],
            classBWithPoisonedDescriptors: [{ base: "sewi", suffix: "k", policy: "andrews-preterit-class-a-cvwi-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A/B CV|CV(w+i) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvwiIntransitiveFrame.sourceSignature,
            operation: displayPoisonedCvwiIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvwiIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvwiIntransitiveFrame,
                operationFrame: ctx.buildPretClassACvwiIntransitiveOperationFrame(displayPoisonedCvwiIntransitiveFrame),
            }),
        },
        {
            signature: cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame.sourceSignature,
            operation: "sewi",
            mismatch: "",
        }
    );
    const contradictoryCvwiIntransitiveSourceFrame = {
        ...cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame,
        finalNucleusFrame: {
            ...cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame.finalNucleusFrame,
            text: "a",
        },
    };
    const contradictoryCvwiIntransitiveOperation = {
        ...cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame,
        targetFrame: {
            ...cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame.targetFrame,
            allowClassB: false,
        },
    };
    const missingCvwiIntransitiveTargetOperation = {
        ...cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A/B CV|CV(w+i) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvwiIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvwiIntransitiveFrameMismatch({
                sourceFrame: cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvwiIntransitiveFrameMismatch({
                sourceFrame: cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame,
                operationFrame: missingCvwiIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvwiIntransitiveFrameMismatch({
                sourceFrame: contradictoryCvwiIntransitiveSourceFrame,
                operationFrame: cvwiIntransitiveContext.classACvwiIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvwiIntransitiveFrameMismatch({
                sourceFrame: cvwiIntransitiveContext.classACvwiIntransitiveSourceFrame,
                operationFrame: contradictoryCvwiIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const cvwaIntransitiveContext = ctx.buildPretUniversalContext("sewa", "sewa", false, {});
    s.eq(
        "preterit Class A/B CV|CV(w+i) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwiIntransitiveContext,
                classACvwiIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvwiIntransitiveContext,
                classACvwiIntransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvwiIntransitiveContext,
                classACvwiIntransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvwiIntransitiveContext,
                classACvwiIntransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cvwiIntransitiveContext,
                classACvwiIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cvwiIntransitiveContext,
                classACvwiIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassACvwiIntransitiveSourceFrame({
                sourceVerb: "sewi",
                syllables: ctx.getSyllables("sewi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvwiIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            nonISourceBlocked: ctx.buildPretClassACvwiIntransitiveSourceFrame({
                sourceVerb: "sewa",
                syllables: ctx.getSyllables("sewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvwaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            nonISourceBlocked: null,
        }
    );
    const cvcvwiIntransitiveContext = ctx.buildPretUniversalContext("tepewi", "tepewi", false, {});
    const displayPoisonedCvcvwiIntransitiveFrame = ctx.buildPretClassACvcvwiIntransitiveSourceFrame({
        sourceVerb: "tepewi",
        syllables: ctx.getSyllables("tepewi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cvcvwiIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cvcvwiIntransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...cvcvwiIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvcvwiIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cvcvwiIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cvcvwiIntransitiveDescriptorPoisonedContext = {
        ...cvcvwiIntransitiveContext,
        descriptorState: {
            ...cvcvwiIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cvcvwiIntransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        cvcvwiIntransitiveDescriptorPoisonedContext
    );
    const cvcvwiIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        cvcvwiIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame?.kind || "",
            operation: cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame?.operationId || "",
            sourceVerb: cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassAB: cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame?.targetFrame?.allowClassA === true
                && cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame?.targetFrame?.classBTargetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvcvwiIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classA: cvcvwiIntransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classB: cvcvwiIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cvcvwiIntransitiveDescriptorPoisonedContext)
            ),
            classAWithPoisonedDescriptors: cvcvwiIntransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: cvcvwiIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-cvcvwi-intransitive-source-frame",
            operation: "andrews-preterit-class-a-cvcvwi-intransitive-policy",
            sourceVerb: "tepewi",
            targetClassAB: true,
            candidatesWithLyingStrings: ["A", "B"],
            classA: [
                { base: "tepew", suffix: "ki", policy: "andrews-preterit-class-a-cvcvwi-intransitive-policy" },
                { base: "tepej", suffix: "ki", policy: "andrews-preterit-class-a-cvcvwi-intransitive-policy" },
            ],
            classB: [{ base: "tepewi", suffix: "k", policy: "andrews-preterit-class-a-cvcvwi-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [
                { base: "tepew", suffix: "ki", policy: "andrews-preterit-class-a-cvcvwi-intransitive-policy" },
                { base: "tepej", suffix: "ki", policy: "andrews-preterit-class-a-cvcvwi-intransitive-policy" },
            ],
            classBWithPoisonedDescriptors: [{ base: "tepewi", suffix: "k", policy: "andrews-preterit-class-a-cvcvwi-intransitive-policy" }],
        }
    );
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCvcvwiIntransitiveFrame.sourceSignature,
            operation: displayPoisonedCvcvwiIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassACvcvwiIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedCvcvwiIntransitiveFrame,
                operationFrame: ctx.buildPretClassACvcvwiIntransitiveOperationFrame(displayPoisonedCvcvwiIntransitiveFrame),
            }),
        },
        {
            signature: cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame.sourceSignature,
            operation: "tepewi",
            mismatch: "",
        }
    );
    const contradictoryCvcvwiIntransitiveSourceFrame = {
        ...cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV",
        },
    };
    const contradictoryCvcvwiIntransitiveOperation = {
        ...cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame,
        targetFrame: {
            ...cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame.targetFrame,
            allowClassB: false,
        },
    };
    const missingCvcvwiIntransitiveTargetOperation = {
        ...cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassACvcvwiIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassACvcvwiIntransitiveFrameMismatch({
                sourceFrame: cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassACvcvwiIntransitiveFrameMismatch({
                sourceFrame: cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame,
                operationFrame: missingCvcvwiIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassACvcvwiIntransitiveFrameMismatch({
                sourceFrame: contradictoryCvcvwiIntransitiveSourceFrame,
                operationFrame: cvcvwiIntransitiveContext.classACvcvwiIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassACvcvwiIntransitiveFrameMismatch({
                sourceFrame: cvcvwiIntransitiveContext.classACvcvwiIntransitiveSourceFrame,
                operationFrame: contradictoryCvcvwiIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const cvcvwaIntransitiveContext = ctx.buildPretUniversalContext("tepewa", "tepewa", false, {});
    s.eq(
        "preterit Class A/B CV|CV|CV(w+i) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvcvwiIntransitiveContext,
                classACvcvwiIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cvcvwiIntransitiveContext,
                classACvcvwiIntransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...cvcvwiIntransitiveContext,
                classACvcvwiIntransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...cvcvwiIntransitiveContext,
                classACvcvwiIntransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cvcvwiIntransitiveContext,
                classACvcvwiIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cvcvwiIntransitiveContext,
                classACvcvwiIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassACvcvwiIntransitiveSourceFrame({
                sourceVerb: "tepewi",
                syllables: ctx.getSyllables("tepewi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvcvwiIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            nonISourceBlocked: ctx.buildPretClassACvcvwiIntransitiveSourceFrame({
                sourceVerb: "tepewa",
                syllables: ctx.getSyllables("tepewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cvcvwaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            nonISourceBlocked: null,
        }
    );
    const vjwaIntransitiveContext = ctx.buildPretUniversalContext("ajwa", "ajwa", false, {});
    const displayPoisonedVjwaIntransitiveFrame = ctx.buildPretClassBVjwaIntransitiveSourceFrame({
        sourceVerb: "ajwa",
        syllables: ctx.getSyllables("ajwa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: vjwaIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const vjwaIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...vjwaIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const vjwaIntransitiveDescriptorPoisonedContext = {
        ...vjwaIntransitiveContext,
        descriptorState: {
            ...vjwaIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const vjwaIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        vjwaIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class B Vj|CV(wa) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame?.kind || "",
            operation: vjwaIntransitiveContext.classBVjwaIntransitiveOperationFrame?.operationId || "",
            sourceVerb: vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetClassB: vjwaIntransitiveContext.classBVjwaIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && vjwaIntransitiveContext.classBVjwaIntransitiveOperationFrame?.targetFrame?.targetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...vjwaIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classB: vjwaIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(vjwaIntransitiveDescriptorPoisonedContext)
            ),
            classBWithPoisonedDescriptors: vjwaIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-vjwa-intransitive-source-frame",
            operation: "andrews-preterit-class-b-vjwa-intransitive-policy",
            sourceVerb: "ajwa",
            targetClassB: true,
            candidatesWithLyingStrings: ["B"],
            classB: [{ base: "ajwa", suffix: "k", policy: "andrews-preterit-class-b-vjwa-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["B"],
            classBWithPoisonedDescriptors: [
                { base: "ajwa", suffix: "k", policy: "andrews-preterit-class-b-vjwa-intransitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class B Vj|CV(wa) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedVjwaIntransitiveFrame.sourceSignature,
            operation: displayPoisonedVjwaIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBVjwaIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedVjwaIntransitiveFrame,
                operationFrame: ctx.buildPretClassBVjwaIntransitiveOperationFrame(displayPoisonedVjwaIntransitiveFrame),
            }),
        },
        {
            signature: vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame.sourceSignature,
            operation: "ajwa",
            mismatch: "",
        }
    );
    const contradictoryVjwaIntransitiveSourceFrame = {
        ...vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame.rightEdgeProfileFrame,
            text: "V|CV",
        },
    };
    const contradictoryVjwaIntransitiveOperation = {
        ...vjwaIntransitiveContext.classBVjwaIntransitiveOperationFrame,
        targetFrame: {
            ...vjwaIntransitiveContext.classBVjwaIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingVjwaIntransitiveTargetOperation = {
        ...vjwaIntransitiveContext.classBVjwaIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B Vj|CV(wa) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBVjwaIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBVjwaIntransitiveFrameMismatch({
                sourceFrame: vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBVjwaIntransitiveFrameMismatch({
                sourceFrame: vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame,
                operationFrame: missingVjwaIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBVjwaIntransitiveFrameMismatch({
                sourceFrame: contradictoryVjwaIntransitiveSourceFrame,
                operationFrame: vjwaIntransitiveContext.classBVjwaIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBVjwaIntransitiveFrameMismatch({
                sourceFrame: vjwaIntransitiveContext.classBVjwaIntransitiveSourceFrame,
                operationFrame: contradictoryVjwaIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const vwaIntransitiveContext = ctx.buildPretUniversalContext("awa", "awa", false, {});
    s.eq(
        "preterit Class B Vj|CV(wa) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vjwaIntransitiveContext,
                classBVjwaIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...vjwaIntransitiveContext,
                classBVjwaIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...vjwaIntransitiveContext,
                classBVjwaIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...vjwaIntransitiveContext,
                classBVjwaIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBVjwaIntransitiveSourceFrame({
                sourceVerb: "ajwa",
                syllables: ctx.getSyllables("ajwa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vjwaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            vwaSourceBlocked: ctx.buildPretClassBVjwaIntransitiveSourceFrame({
                sourceVerb: "awa",
                syllables: ctx.getSyllables("awa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: vwaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            vwaSourceBlocked: null,
        }
    );
    const cuwaIntransitiveContext = ctx.buildPretUniversalContext("kuwa", "kuwa", false, {});
    const displayPoisonedCuwaIntransitiveFrame = ctx.buildPretClassBCuwaIntransitiveSourceFrame({
        sourceVerb: "kuwa",
        syllables: ctx.getSyllables("kuwa", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: cuwaIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const cuwaIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...cuwaIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const cuwaIntransitiveDescriptorPoisonedContext = {
        ...cuwaIntransitiveContext,
        descriptorState: {
            ...cuwaIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const cuwaIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        cuwaIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class B CV(u)|CV(wa) intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame?.kind || "",
            operation: cuwaIntransitiveContext.classBCuwaIntransitiveOperationFrame?.operationId || "",
            sourceVerb: cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            leadingNucleus: cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame?.leadingNucleusFrame?.text || "",
            targetClassB: cuwaIntransitiveContext.classBCuwaIntransitiveOperationFrame?.targetFrame?.allowClassB === true
                && cuwaIntransitiveContext.classBCuwaIntransitiveOperationFrame?.targetFrame?.targetSuffix === "k",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...cuwaIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            classB: cuwaIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(cuwaIntransitiveDescriptorPoisonedContext)
            ),
            classBWithPoisonedDescriptors: cuwaIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-cuwa-intransitive-source-frame",
            operation: "andrews-preterit-class-b-cuwa-intransitive-policy",
            sourceVerb: "kuwa",
            leadingNucleus: "u",
            targetClassB: true,
            candidatesWithLyingStrings: ["B"],
            classB: [{ base: "kuwa", suffix: "k", policy: "andrews-preterit-class-b-cuwa-intransitive-policy" }],
            candidatesWithPoisonedDescriptors: ["B"],
            classBWithPoisonedDescriptors: [
                { base: "kuwa", suffix: "k", policy: "andrews-preterit-class-b-cuwa-intransitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class B CV(u)|CV(wa) intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedCuwaIntransitiveFrame.sourceSignature,
            operation: displayPoisonedCuwaIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBCuwaIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedCuwaIntransitiveFrame,
                operationFrame: ctx.buildPretClassBCuwaIntransitiveOperationFrame(displayPoisonedCuwaIntransitiveFrame),
            }),
        },
        {
            signature: cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame.sourceSignature,
            operation: "kuwa",
            mismatch: "",
        }
    );
    const contradictoryCuwaIntransitiveSourceFrame = {
        ...cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame,
        leadingNucleusFrame: {
            ...cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame.leadingNucleusFrame,
            text: "a",
        },
    };
    const contradictoryCuwaIntransitiveOperation = {
        ...cuwaIntransitiveContext.classBCuwaIntransitiveOperationFrame,
        targetFrame: {
            ...cuwaIntransitiveContext.classBCuwaIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingCuwaIntransitiveTargetOperation = {
        ...cuwaIntransitiveContext.classBCuwaIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B CV(u)|CV(wa) intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBCuwaIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBCuwaIntransitiveFrameMismatch({
                sourceFrame: cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBCuwaIntransitiveFrameMismatch({
                sourceFrame: cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame,
                operationFrame: missingCuwaIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBCuwaIntransitiveFrameMismatch({
                sourceFrame: contradictoryCuwaIntransitiveSourceFrame,
                operationFrame: cuwaIntransitiveContext.classBCuwaIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBCuwaIntransitiveFrameMismatch({
                sourceFrame: cuwaIntransitiveContext.classBCuwaIntransitiveSourceFrame,
                operationFrame: contradictoryCuwaIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const pewaIntransitiveContext = ctx.buildPretUniversalContext("pewa", "pewa", false, {});
    s.eq(
        "preterit Class B CV(u)|CV(wa) intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cuwaIntransitiveContext,
                classBCuwaIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...cuwaIntransitiveContext,
                classBCuwaIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...cuwaIntransitiveContext,
                classBCuwaIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...cuwaIntransitiveContext,
                classBCuwaIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBCuwaIntransitiveSourceFrame({
                sourceVerb: "kuwa",
                syllables: ctx.getSyllables("kuwa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: cuwaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            nonUNucleusSourceBlocked: ctx.buildPretClassBCuwaIntransitiveSourceFrame({
                sourceVerb: "pewa",
                syllables: ctx.getSyllables("pewa", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: pewaIntransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            nonUNucleusSourceBlocked: null,
        }
    );
    const mTransitiveContext = ctx.buildPretUniversalContext("mima", "mima", true, {});
    const displayPoisonedMTransitiveFrame = ctx.buildPretClassAMTransitiveSourceFrame({
        sourceVerb: "mima",
        syllables: ctx.getSyllables("mima", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: mTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const mTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...mTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const mTransitiveDescriptorPoisonedContext = {
        ...mTransitiveContext,
        descriptorState: {
            ...mTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const mTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(mTransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class A m+a transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: mTransitiveContext.classAMTransitiveSourceFrame?.kind || "",
            operation: mTransitiveContext.classAMTransitiveOperationFrame?.operationId || "",
            sourceVerb: mTransitiveContext.classAMTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetZeroAndKi: mTransitiveContext.classAMTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && mTransitiveContext.classAMTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...mTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: mTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(mTransitiveDescriptorPoisonedContext)),
            classAWithPoisonedDescriptors: mTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-m-transitive-source-frame",
            operation: "andrews-preterit-class-a-m-transitive-policy",
            sourceVerb: "mima",
            targetZeroAndKi: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "mim", suffix: "ki", policy: "andrews-preterit-class-a-m-transitive-policy" },
                { base: "mim", suffix: "", policy: "andrews-preterit-class-a-m-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            classAWithPoisonedDescriptors: [
                { base: "mim", suffix: "ki", policy: "andrews-preterit-class-a-m-transitive-policy" },
                { base: "mim", suffix: "", policy: "andrews-preterit-class-a-m-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A m+a transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedMTransitiveFrame.sourceSignature,
            operation: displayPoisonedMTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAMTransitiveFrameMismatch({
                sourceFrame: displayPoisonedMTransitiveFrame,
                operationFrame: ctx.buildPretClassAMTransitiveOperationFrame(displayPoisonedMTransitiveFrame),
            }),
        },
        {
            signature: mTransitiveContext.classAMTransitiveSourceFrame.sourceSignature,
            operation: "mima",
            mismatch: "",
        }
    );
    const contradictoryMTransitiveSourceFrame = {
        ...mTransitiveContext.classAMTransitiveSourceFrame,
        finalNucleusFrame: {
            ...mTransitiveContext.classAMTransitiveSourceFrame.finalNucleusFrame,
            text: "u",
        },
    };
    const contradictoryMTransitiveOperation = {
        ...mTransitiveContext.classAMTransitiveOperationFrame,
        targetFrame: {
            ...mTransitiveContext.classAMTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: false,
        },
    };
    const missingMTransitiveTargetOperation = {
        ...mTransitiveContext.classAMTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A m+a transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAMTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassAMTransitiveFrameMismatch({
                sourceFrame: mTransitiveContext.classAMTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAMTransitiveFrameMismatch({
                sourceFrame: mTransitiveContext.classAMTransitiveSourceFrame,
                operationFrame: missingMTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAMTransitiveFrameMismatch({
                sourceFrame: contradictoryMTransitiveSourceFrame,
                operationFrame: mTransitiveContext.classAMTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAMTransitiveFrameMismatch({
                sourceFrame: mTransitiveContext.classAMTransitiveSourceFrame,
                operationFrame: contradictoryMTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A m+a transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...mTransitiveContext,
                classAMTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...mTransitiveContext,
                classAMTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...mTransitiveContext,
                classAMTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...mTransitiveContext,
                classAMTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassAMTransitiveSourceFrame({
                sourceVerb: "mima",
                syllables: ctx.getSyllables("mima", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: mTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            monosyllableSourceBlocked: ctx.buildPretClassAMTransitiveSourceFrame({
                sourceVerb: "mimi",
                syllables: ctx.getSyllables("mimi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("mimi", "mimi", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: true,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            monosyllableSourceBlocked: null,
        }
    );
    const piIntransitiveContext = ctx.buildPretUniversalContext("chipi", "chipi", false, {});
    const displayPoisonedPiIntransitiveFrame = ctx.buildPretClassAPiIntransitiveSourceFrame({
        sourceVerb: "chipi",
        syllables: ctx.getSyllables("chipi", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: piIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const piIntransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...piIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const piIntransitiveDescriptorPoisonedContext = {
        ...piIntransitiveContext,
        descriptorState: {
            ...piIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const piIntransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(piIntransitiveDescriptorPoisonedContext);
    const piIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(piIntransitiveDescriptorPoisonedContext);
    s.eq(
        "preterit Class A p+i intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: piIntransitiveContext.classAPiIntransitiveSourceFrame?.kind || "",
            operation: piIntransitiveContext.classAPiIntransitiveOperationFrame?.operationId || "",
            sourceVerb: piIntransitiveContext.classAPiIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetKiOnly: piIntransitiveContext.classAPiIntransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && piIntransitiveContext.classAPiIntransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...piIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: piIntransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(ctx.getPretUniversalClassCandidates(piIntransitiveDescriptorPoisonedContext)),
            classAWithPoisonedDescriptors: piIntransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            classBWithPoisonedDescriptors: piIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-pi-intransitive-source-frame",
            operation: "andrews-preterit-class-a-pi-intransitive-policy",
            sourceVerb: "chipi",
            targetKiOnly: true,
            candidatesWithLyingStrings: ["A", "B"],
            variants: [
                { base: "chip", suffix: "ki", policy: "andrews-preterit-class-a-pi-intransitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A", "B"],
            classAWithPoisonedDescriptors: [
                { base: "chip", suffix: "ki", policy: "andrews-preterit-class-a-pi-intransitive-policy" },
            ],
            classBWithPoisonedDescriptors: [
                { base: "chipi", suffix: "k", policy: "andrews-preterit-class-a-pi-intransitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A p+i intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedPiIntransitiveFrame.sourceSignature,
            operation: displayPoisonedPiIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassAPiIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedPiIntransitiveFrame,
                operationFrame: ctx.buildPretClassAPiIntransitiveOperationFrame(displayPoisonedPiIntransitiveFrame),
            }),
        },
        {
            signature: piIntransitiveContext.classAPiIntransitiveSourceFrame.sourceSignature,
            operation: "chipi",
            mismatch: "",
        }
    );
    const contradictoryPiIntransitiveSourceFrame = {
        ...piIntransitiveContext.classAPiIntransitiveSourceFrame,
        transitivityFrame: {
            ...piIntransitiveContext.classAPiIntransitiveSourceFrame.transitivityFrame,
            text: "transitive",
        },
    };
    const contradictoryPiIntransitiveOperation = {
        ...piIntransitiveContext.classAPiIntransitiveOperationFrame,
        targetFrame: {
            ...piIntransitiveContext.classAPiIntransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingPiIntransitiveTargetOperation = {
        ...piIntransitiveContext.classAPiIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A p+i intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassAPiIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassAPiIntransitiveFrameMismatch({
                sourceFrame: piIntransitiveContext.classAPiIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassAPiIntransitiveFrameMismatch({
                sourceFrame: piIntransitiveContext.classAPiIntransitiveSourceFrame,
                operationFrame: missingPiIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassAPiIntransitiveFrameMismatch({
                sourceFrame: contradictoryPiIntransitiveSourceFrame,
                operationFrame: piIntransitiveContext.classAPiIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassAPiIntransitiveFrameMismatch({
                sourceFrame: piIntransitiveContext.classAPiIntransitiveSourceFrame,
                operationFrame: contradictoryPiIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A p+i intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...piIntransitiveContext,
                classAPiIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...piIntransitiveContext,
                classAPiIntransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...piIntransitiveContext,
                classAPiIntransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...piIntransitiveContext,
                classAPiIntransitiveSourceFrame: null,
            }),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...piIntransitiveContext,
                classAPiIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...piIntransitiveContext,
                classAPiIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassAPiIntransitiveSourceFrame({
                sourceVerb: "chipi",
                syllables: ctx.getSyllables("chipi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: piIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            monosyllableSourceBlocked: ctx.buildPretClassAPiIntransitiveSourceFrame({
                sourceVerb: "pipi",
                syllables: ctx.getSyllables("pipi", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("pipi", "pipi", false, {}).rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: true,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            monosyllableSourceBlocked: null,
        }
    );
    const taIntransitiveContext = ctx.buildPretUniversalContext("kita", "kita", false, {});
    const displayPoisonedTaIntransitiveFrame = ctx.buildPretClassBTaIntransitiveSourceFrame({
        sourceVerb: "kita",
        syllables: ctx.getSyllables("kita", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: taIntransitiveContext.rightEdgeDescriptor,
        isTransitive: false,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const taIntransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...taIntransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const taIntransitiveDescriptorPoisonedContext = {
        ...taIntransitiveContext,
        descriptorState: {
            ...taIntransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const taIntransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        taIntransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class B t+a intransitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: taIntransitiveContext.classBTaIntransitiveSourceFrame?.kind || "",
            operation: taIntransitiveContext.classBTaIntransitiveOperationFrame?.operationId || "",
            sourceVerb: taIntransitiveContext.classBTaIntransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetSuffix: taIntransitiveContext.classBTaIntransitiveOperationFrame?.targetFrame?.targetSuffix || "",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...taIntransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: taIntransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(taIntransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: taIntransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-ta-intransitive-source-frame",
            operation: "andrews-preterit-class-b-ta-intransitive-policy",
            sourceVerb: "kita",
            targetSuffix: "k",
            candidatesWithLyingStrings: ["B"],
            variants: [
                { base: "kita", suffix: "k", policy: "andrews-preterit-class-b-ta-intransitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["B"],
            variantsWithPoisonedDescriptors: [
                { base: "kita", suffix: "k", policy: "andrews-preterit-class-b-ta-intransitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class B t+a intransitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedTaIntransitiveFrame.sourceSignature,
            operation: displayPoisonedTaIntransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBTaIntransitiveFrameMismatch({
                sourceFrame: displayPoisonedTaIntransitiveFrame,
                operationFrame: ctx.buildPretClassBTaIntransitiveOperationFrame(displayPoisonedTaIntransitiveFrame),
            }),
        },
        {
            signature: taIntransitiveContext.classBTaIntransitiveSourceFrame.sourceSignature,
            operation: "kita",
            mismatch: "",
        }
    );
    const contradictoryTaIntransitiveSourceFrame = {
        ...taIntransitiveContext.classBTaIntransitiveSourceFrame,
        transitivityFrame: {
            ...taIntransitiveContext.classBTaIntransitiveSourceFrame.transitivityFrame,
            text: "transitive",
        },
    };
    const contradictoryTaIntransitiveOperation = {
        ...taIntransitiveContext.classBTaIntransitiveOperationFrame,
        targetFrame: {
            ...taIntransitiveContext.classBTaIntransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingTaIntransitiveTargetOperation = {
        ...taIntransitiveContext.classBTaIntransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B t+a intransitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBTaIntransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBTaIntransitiveFrameMismatch({
                sourceFrame: taIntransitiveContext.classBTaIntransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBTaIntransitiveFrameMismatch({
                sourceFrame: taIntransitiveContext.classBTaIntransitiveSourceFrame,
                operationFrame: missingTaIntransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBTaIntransitiveFrameMismatch({
                sourceFrame: contradictoryTaIntransitiveSourceFrame,
                operationFrame: taIntransitiveContext.classBTaIntransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBTaIntransitiveFrameMismatch({
                sourceFrame: taIntransitiveContext.classBTaIntransitiveSourceFrame,
                operationFrame: contradictoryTaIntransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class B t+a intransitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...taIntransitiveContext,
                classBTaIntransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...taIntransitiveContext,
                classBTaIntransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...taIntransitiveContext,
                classBTaIntransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...taIntransitiveContext,
                classBTaIntransitiveSourceFrame: null,
            }),
            transitiveSourceBlocked: ctx.buildPretClassBTaIntransitiveSourceFrame({
                sourceVerb: "kita",
                syllables: ctx.getSyllables("kita", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: taIntransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
            monosyllableSourceBlocked: ctx.buildPretClassBTaIntransitiveSourceFrame({
                sourceVerb: "ta",
                syllables: ctx.getSyllables("ta", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("ta", "ta", false, {}).rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: true,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            transitiveSourceBlocked: null,
            monosyllableSourceBlocked: null,
        }
    );
    const taTransitiveContext = ctx.buildPretUniversalContext("pata", "pata", true, {});
    const displayPoisonedTaTransitiveFrame = ctx.buildPretClassBTaTransitiveSourceFrame({
        sourceVerb: "pata",
        syllables: ctx.getSyllables("pata", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: taTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        isItaVerb: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const taTransitiveClassBVariants = ctx.buildPretUniversalClassB({
        ...taTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const taTransitiveDescriptorPoisonedContext = {
        ...taTransitiveContext,
        descriptorState: {
            ...taTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const taTransitiveDescriptorPoisonedClassB = ctx.buildPretUniversalClassB(
        taTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class B t+a transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: taTransitiveContext.classBTaTransitiveSourceFrame?.kind || "",
            operation: taTransitiveContext.classBTaTransitiveOperationFrame?.operationId || "",
            sourceVerb: taTransitiveContext.classBTaTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetSuffix: taTransitiveContext.classBTaTransitiveOperationFrame?.targetFrame?.targetSuffix || "",
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...taTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: taTransitiveClassBVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(taTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: taTransitiveDescriptorPoisonedClassB.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-b-ta-transitive-source-frame",
            operation: "andrews-preterit-class-b-ta-transitive-policy",
            sourceVerb: "pata",
            targetSuffix: "k",
            candidatesWithLyingStrings: ["B"],
            variants: [
                { base: "pata", suffix: "k", policy: "andrews-preterit-class-b-ta-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["B"],
            variantsWithPoisonedDescriptors: [
                { base: "pata", suffix: "k", policy: "andrews-preterit-class-b-ta-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class B t+a transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedTaTransitiveFrame.sourceSignature,
            operation: displayPoisonedTaTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassBTaTransitiveFrameMismatch({
                sourceFrame: displayPoisonedTaTransitiveFrame,
                operationFrame: ctx.buildPretClassBTaTransitiveOperationFrame(displayPoisonedTaTransitiveFrame),
            }),
        },
        {
            signature: taTransitiveContext.classBTaTransitiveSourceFrame.sourceSignature,
            operation: "pata",
            mismatch: "",
        }
    );
    const contradictoryTaTransitiveSourceFrame = {
        ...taTransitiveContext.classBTaTransitiveSourceFrame,
        itaShapeFrame: {
            ...taTransitiveContext.classBTaTransitiveSourceFrame.itaShapeFrame,
            text: "present",
        },
    };
    const contradictoryTaTransitiveOperation = {
        ...taTransitiveContext.classBTaTransitiveOperationFrame,
        targetFrame: {
            ...taTransitiveContext.classBTaTransitiveOperationFrame.targetFrame,
            targetSuffix: "",
        },
    };
    const missingTaTransitiveTargetOperation = {
        ...taTransitiveContext.classBTaTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class B t+a transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassBTaTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassBTaTransitiveFrameMismatch({
                sourceFrame: taTransitiveContext.classBTaTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassBTaTransitiveFrameMismatch({
                sourceFrame: taTransitiveContext.classBTaTransitiveSourceFrame,
                operationFrame: missingTaTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassBTaTransitiveFrameMismatch({
                sourceFrame: contradictoryTaTransitiveSourceFrame,
                operationFrame: taTransitiveContext.classBTaTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassBTaTransitiveFrameMismatch({
                sourceFrame: taTransitiveContext.classBTaTransitiveSourceFrame,
                operationFrame: contradictoryTaTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class B t+a transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...taTransitiveContext,
                classBTaTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...taTransitiveContext,
                classBTaTransitiveSourceFrame: null,
            })),
            noOperationClassB: ctx.buildPretUniversalClassB({
                ...taTransitiveContext,
                classBTaTransitiveOperationFrame: null,
            }),
            noSourceClassB: ctx.buildPretUniversalClassB({
                ...taTransitiveContext,
                classBTaTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassBTaTransitiveSourceFrame({
                sourceVerb: "pata",
                syllables: ctx.getSyllables("pata", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: taTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
                isItaVerb: false,
            }),
            monosyllableSourceBlocked: ctx.buildPretClassBTaTransitiveSourceFrame({
                sourceVerb: "ta",
                syllables: ctx.getSyllables("ta", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("ta", "ta", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: true,
                isItaVerb: false,
            }),
            itaShapeBlocked: ctx.buildPretClassBTaTransitiveSourceFrame({
                sourceVerb: "ita",
                syllables: ctx.getSyllables("ita", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("ita", "ita", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
                isItaVerb: true,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassB: null,
            noSourceClassB: null,
            intransitiveSourceBlocked: null,
            monosyllableSourceBlocked: null,
            itaShapeBlocked: null,
        }
    );
    const niCvTransitiveContext = ctx.buildPretUniversalContext("tani", "tani", true, {});
    const displayPoisonedNiCvTransitiveFrame = ctx.buildPretClassANiCvTransitiveSourceFrame({
        sourceVerb: "tani",
        syllables: ctx.getSyllables("tani", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: niCvTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const niCvTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...niCvTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const niCvTransitiveDescriptorPoisonedContext = {
        ...niCvTransitiveContext,
        descriptorState: {
            ...niCvTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const niCvTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        niCvTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A n+i CV transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: niCvTransitiveContext.classANiCvTransitiveSourceFrame?.kind || "",
            operation: niCvTransitiveContext.classANiCvTransitiveOperationFrame?.operationId || "",
            sourceVerb: niCvTransitiveContext.classANiCvTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetZeroAndKi: niCvTransitiveContext.classANiCvTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && niCvTransitiveContext.classANiCvTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...niCvTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: niCvTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(niCvTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: niCvTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-ni-cv-transitive-source-frame",
            operation: "andrews-preterit-class-a-ni-cv-transitive-policy",
            sourceVerb: "tani",
            targetZeroAndKi: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "tan", suffix: "ki", policy: "andrews-preterit-class-a-ni-cv-transitive-policy" },
                { base: "tan", suffix: "", policy: "andrews-preterit-class-a-ni-cv-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            variantsWithPoisonedDescriptors: [
                { base: "tan", suffix: "ki", policy: "andrews-preterit-class-a-ni-cv-transitive-policy" },
                { base: "tan", suffix: "", policy: "andrews-preterit-class-a-ni-cv-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A n+i CV transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedNiCvTransitiveFrame.sourceSignature,
            operation: displayPoisonedNiCvTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassANiCvTransitiveFrameMismatch({
                sourceFrame: displayPoisonedNiCvTransitiveFrame,
                operationFrame: ctx.buildPretClassANiCvTransitiveOperationFrame(displayPoisonedNiCvTransitiveFrame),
            }),
        },
        {
            signature: niCvTransitiveContext.classANiCvTransitiveSourceFrame.sourceSignature,
            operation: "tani",
            mismatch: "",
        }
    );
    const contradictoryNiCvTransitiveSourceFrame = {
        ...niCvTransitiveContext.classANiCvTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...niCvTransitiveContext.classANiCvTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV|CV",
        },
    };
    const contradictoryNiCvTransitiveOperation = {
        ...niCvTransitiveContext.classANiCvTransitiveOperationFrame,
        targetFrame: {
            ...niCvTransitiveContext.classANiCvTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: false,
        },
    };
    const missingNiCvTransitiveTargetOperation = {
        ...niCvTransitiveContext.classANiCvTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A n+i CV transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassANiCvTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassANiCvTransitiveFrameMismatch({
                sourceFrame: niCvTransitiveContext.classANiCvTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassANiCvTransitiveFrameMismatch({
                sourceFrame: niCvTransitiveContext.classANiCvTransitiveSourceFrame,
                operationFrame: missingNiCvTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassANiCvTransitiveFrameMismatch({
                sourceFrame: contradictoryNiCvTransitiveSourceFrame,
                operationFrame: niCvTransitiveContext.classANiCvTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassANiCvTransitiveFrameMismatch({
                sourceFrame: niCvTransitiveContext.classANiCvTransitiveSourceFrame,
                operationFrame: contradictoryNiCvTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A n+i CV transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...niCvTransitiveContext,
                classANiCvTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...niCvTransitiveContext,
                classANiCvTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...niCvTransitiveContext,
                classANiCvTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...niCvTransitiveContext,
                classANiCvTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassANiCvTransitiveSourceFrame({
                sourceVerb: "tani",
                syllables: ctx.getSyllables("tani", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: niCvTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            longNiSourceBlocked: ctx.buildPretClassANiCvTransitiveSourceFrame({
                sourceVerb: "takani",
                syllables: ctx.getSyllables("takani", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("takani", "takani", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            longNiSourceBlocked: null,
        }
    );
    const naCvTransitiveContext = ctx.buildPretUniversalContext("tana", "tana", true, {});
    const displayPoisonedNaCvTransitiveFrame = ctx.buildPretClassANaCvTransitiveSourceFrame({
        sourceVerb: "tana",
        syllables: ctx.getSyllables("tana", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: naCvTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const naCvTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...naCvTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const naCvTransitiveDescriptorPoisonedContext = {
        ...naCvTransitiveContext,
        descriptorState: {
            ...naCvTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const naCvTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        naCvTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A n+a CV transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: naCvTransitiveContext.classANaCvTransitiveSourceFrame?.kind || "",
            operation: naCvTransitiveContext.classANaCvTransitiveOperationFrame?.operationId || "",
            sourceVerb: naCvTransitiveContext.classANaCvTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetKiOnly: naCvTransitiveContext.classANaCvTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && naCvTransitiveContext.classANaCvTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: naCvTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(naCvTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: naCvTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-na-cv-transitive-source-frame",
            operation: "andrews-preterit-class-a-na-cv-transitive-policy",
            sourceVerb: "tana",
            targetKiOnly: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "tan", suffix: "ki", policy: "andrews-preterit-class-a-na-cv-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            variantsWithPoisonedDescriptors: [
                { base: "tan", suffix: "ki", policy: "andrews-preterit-class-a-na-cv-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A n+a CV transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedNaCvTransitiveFrame.sourceSignature,
            operation: displayPoisonedNaCvTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassANaCvTransitiveFrameMismatch({
                sourceFrame: displayPoisonedNaCvTransitiveFrame,
                operationFrame: ctx.buildPretClassANaCvTransitiveOperationFrame(displayPoisonedNaCvTransitiveFrame),
            }),
        },
        {
            signature: naCvTransitiveContext.classANaCvTransitiveSourceFrame.sourceSignature,
            operation: "tana",
            mismatch: "",
        }
    );
    const contradictoryNaCvTransitiveSourceFrame = {
        ...naCvTransitiveContext.classANaCvTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...naCvTransitiveContext.classANaCvTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV|CV",
        },
    };
    const contradictoryNaCvTransitiveOperation = {
        ...naCvTransitiveContext.classANaCvTransitiveOperationFrame,
        targetFrame: {
            ...naCvTransitiveContext.classANaCvTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingNaCvTransitiveTargetOperation = {
        ...naCvTransitiveContext.classANaCvTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A n+a CV transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassANaCvTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassANaCvTransitiveFrameMismatch({
                sourceFrame: naCvTransitiveContext.classANaCvTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassANaCvTransitiveFrameMismatch({
                sourceFrame: naCvTransitiveContext.classANaCvTransitiveSourceFrame,
                operationFrame: missingNaCvTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassANaCvTransitiveFrameMismatch({
                sourceFrame: contradictoryNaCvTransitiveSourceFrame,
                operationFrame: naCvTransitiveContext.classANaCvTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassANaCvTransitiveFrameMismatch({
                sourceFrame: naCvTransitiveContext.classANaCvTransitiveSourceFrame,
                operationFrame: contradictoryNaCvTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A n+a CV transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvTransitiveContext,
                classANaCvTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvTransitiveContext,
                classANaCvTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...naCvTransitiveContext,
                classANaCvTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...naCvTransitiveContext,
                classANaCvTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassANaCvTransitiveSourceFrame({
                sourceVerb: "tana",
                syllables: ctx.getSyllables("tana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            longNaSourceBlocked: ctx.buildPretClassANaCvTransitiveSourceFrame({
                sourceVerb: "takana",
                syllables: ctx.getSyllables("takana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: ctx.buildPretUniversalContext("takana", "takana", true, {}).rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            longNaSourceBlocked: null,
        }
    );
    const naCvcvcvTransitiveContext = ctx.buildPretUniversalContext("takana", "takana", true, {});
    const displayPoisonedNaCvcvcvTransitiveFrame = ctx.buildPretClassANaCvcvcvTransitiveSourceFrame({
        sourceVerb: "takana",
        syllables: ctx.getSyllables("takana", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: naCvcvcvTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const naCvcvcvTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...naCvcvcvTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const naCvcvcvTransitiveDescriptorPoisonedContext = {
        ...naCvcvcvTransitiveContext,
        descriptorState: {
            ...naCvcvcvTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const naCvcvcvTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        naCvcvcvTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A n+a CV|CV|CV transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame?.kind || "",
            operation: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveOperationFrame?.operationId || "",
            sourceVerb: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetZeroAndKi: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && naCvcvcvTransitiveContext.classANaCvcvcvTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvcvcvTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: naCvcvcvTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(naCvcvcvTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: naCvcvcvTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-na-cvcvcv-transitive-source-frame",
            operation: "andrews-preterit-class-a-na-cvcvcv-transitive-policy",
            sourceVerb: "takana",
            targetZeroAndKi: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "takan", suffix: "ki", policy: "andrews-preterit-class-a-na-cvcvcv-transitive-policy" },
                { base: "takan", suffix: "", policy: "andrews-preterit-class-a-na-cvcvcv-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            variantsWithPoisonedDescriptors: [
                { base: "takan", suffix: "ki", policy: "andrews-preterit-class-a-na-cvcvcv-transitive-policy" },
                { base: "takan", suffix: "", policy: "andrews-preterit-class-a-na-cvcvcv-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A n+a CV|CV|CV transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedNaCvcvcvTransitiveFrame.sourceSignature,
            operation: displayPoisonedNaCvcvcvTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassANaCvcvcvTransitiveFrameMismatch({
                sourceFrame: displayPoisonedNaCvcvcvTransitiveFrame,
                operationFrame: ctx.buildPretClassANaCvcvcvTransitiveOperationFrame(displayPoisonedNaCvcvcvTransitiveFrame),
            }),
        },
        {
            signature: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame.sourceSignature,
            operation: "takana",
            mismatch: "",
        }
    );
    const contradictoryNaCvcvcvTransitiveSourceFrame = {
        ...naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV",
        },
    };
    const contradictoryNaCvcvcvTransitiveOperation = {
        ...naCvcvcvTransitiveContext.classANaCvcvcvTransitiveOperationFrame,
        targetFrame: {
            ...naCvcvcvTransitiveContext.classANaCvcvcvTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: false,
        },
    };
    const missingNaCvcvcvTransitiveTargetOperation = {
        ...naCvcvcvTransitiveContext.classANaCvcvcvTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A n+a CV|CV|CV transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassANaCvcvcvTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassANaCvcvcvTransitiveFrameMismatch({
                sourceFrame: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassANaCvcvcvTransitiveFrameMismatch({
                sourceFrame: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame,
                operationFrame: missingNaCvcvcvTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassANaCvcvcvTransitiveFrameMismatch({
                sourceFrame: contradictoryNaCvcvcvTransitiveSourceFrame,
                operationFrame: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassANaCvcvcvTransitiveFrameMismatch({
                sourceFrame: naCvcvcvTransitiveContext.classANaCvcvcvTransitiveSourceFrame,
                operationFrame: contradictoryNaCvcvcvTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A n+a CV|CV|CV transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvcvcvTransitiveContext,
                classANaCvcvcvTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvcvcvTransitiveContext,
                classANaCvcvcvTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...naCvcvcvTransitiveContext,
                classANaCvcvcvTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...naCvcvcvTransitiveContext,
                classANaCvcvcvTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassANaCvcvcvTransitiveSourceFrame({
                sourceVerb: "takana",
                syllables: ctx.getSyllables("takana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvcvcvTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            cvNaSourceBlocked: ctx.buildPretClassANaCvcvcvTransitiveSourceFrame({
                sourceVerb: "tana",
                syllables: ctx.getSyllables("tana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            cvNaSourceBlocked: null,
        }
    );
    const naCvlvcvTransitiveContext = ctx.buildPretUniversalContext("taluna", "taluna", true, {});
    const displayPoisonedNaCvlvcvTransitiveFrame = ctx.buildPretClassANaCvlvcvTransitiveSourceFrame({
        sourceVerb: "taluna",
        syllables: ctx.getSyllables("taluna", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: naCvlvcvTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const naCvlvcvTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...naCvlvcvTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const naCvlvcvTransitiveDescriptorPoisonedContext = {
        ...naCvlvcvTransitiveContext,
        descriptorState: {
            ...naCvlvcvTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const naCvlvcvTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        naCvlvcvTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A n+a CVl|V|CV transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame?.kind || "",
            operation: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveOperationFrame?.operationId || "",
            sourceVerb: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetZeroAndKi: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && naCvlvcvTransitiveContext.classANaCvlvcvTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvlvcvTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: naCvlvcvTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(naCvlvcvTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: naCvlvcvTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-na-cvlvcv-transitive-source-frame",
            operation: "andrews-preterit-class-a-na-cvlvcv-transitive-policy",
            sourceVerb: "taluna",
            targetZeroAndKi: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "talun", suffix: "ki", policy: "andrews-preterit-class-a-na-cvlvcv-transitive-policy" },
                { base: "talun", suffix: "", policy: "andrews-preterit-class-a-na-cvlvcv-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            variantsWithPoisonedDescriptors: [
                { base: "talun", suffix: "ki", policy: "andrews-preterit-class-a-na-cvlvcv-transitive-policy" },
                { base: "talun", suffix: "", policy: "andrews-preterit-class-a-na-cvlvcv-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A n+a CVl|V|CV transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedNaCvlvcvTransitiveFrame.sourceSignature,
            operation: displayPoisonedNaCvlvcvTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassANaCvlvcvTransitiveFrameMismatch({
                sourceFrame: displayPoisonedNaCvlvcvTransitiveFrame,
                operationFrame: ctx.buildPretClassANaCvlvcvTransitiveOperationFrame(displayPoisonedNaCvlvcvTransitiveFrame),
            }),
        },
        {
            signature: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame.sourceSignature,
            operation: "taluna",
            mismatch: "",
        }
    );
    const contradictoryNaCvlvcvTransitiveSourceFrame = {
        ...naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV|CV",
        },
    };
    const contradictoryNaCvlvcvTransitiveOperation = {
        ...naCvlvcvTransitiveContext.classANaCvlvcvTransitiveOperationFrame,
        targetFrame: {
            ...naCvlvcvTransitiveContext.classANaCvlvcvTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: false,
        },
    };
    const missingNaCvlvcvTransitiveTargetOperation = {
        ...naCvlvcvTransitiveContext.classANaCvlvcvTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A n+a CVl|V|CV transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassANaCvlvcvTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassANaCvlvcvTransitiveFrameMismatch({
                sourceFrame: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassANaCvlvcvTransitiveFrameMismatch({
                sourceFrame: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame,
                operationFrame: missingNaCvlvcvTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassANaCvlvcvTransitiveFrameMismatch({
                sourceFrame: contradictoryNaCvlvcvTransitiveSourceFrame,
                operationFrame: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassANaCvlvcvTransitiveFrameMismatch({
                sourceFrame: naCvlvcvTransitiveContext.classANaCvlvcvTransitiveSourceFrame,
                operationFrame: contradictoryNaCvlvcvTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A n+a CVl|V|CV transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvlvcvTransitiveContext,
                classANaCvlvcvTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naCvlvcvTransitiveContext,
                classANaCvlvcvTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...naCvlvcvTransitiveContext,
                classANaCvlvcvTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...naCvlvcvTransitiveContext,
                classANaCvlvcvTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassANaCvlvcvTransitiveSourceFrame({
                sourceVerb: "taluna",
                syllables: ctx.getSyllables("taluna", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvlvcvTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            cvcvcvSourceBlocked: ctx.buildPretClassANaCvlvcvTransitiveSourceFrame({
                sourceVerb: "takana",
                syllables: ctx.getSyllables("takana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvcvcvTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            cvcvcvSourceBlocked: null,
        }
    );
    const naVlcvcvTransitiveContext = ctx.buildPretUniversalContext("altana", "altana", true, {});
    const displayPoisonedNaVlcvcvTransitiveFrame = ctx.buildPretClassANaVlcvcvTransitiveSourceFrame({
        sourceVerb: "altana",
        syllables: ctx.getSyllables("altana", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: naVlcvcvTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const naVlcvcvTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...naVlcvcvTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const naVlcvcvTransitiveDescriptorPoisonedContext = {
        ...naVlcvcvTransitiveContext,
        descriptorState: {
            ...naVlcvcvTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const naVlcvcvTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        naVlcvcvTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A n+a Vl|CV|CV transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame?.kind || "",
            operation: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveOperationFrame?.operationId || "",
            sourceVerb: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetKiOnly: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && naVlcvcvTransitiveContext.classANaVlcvcvTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...naVlcvcvTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: naVlcvcvTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(naVlcvcvTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: naVlcvcvTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-na-vlcvcv-transitive-source-frame",
            operation: "andrews-preterit-class-a-na-vlcvcv-transitive-policy",
            sourceVerb: "altana",
            targetKiOnly: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "altan", suffix: "ki", policy: "andrews-preterit-class-a-na-vlcvcv-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            variantsWithPoisonedDescriptors: [
                { base: "altan", suffix: "ki", policy: "andrews-preterit-class-a-na-vlcvcv-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A n+a Vl|CV|CV transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedNaVlcvcvTransitiveFrame.sourceSignature,
            operation: displayPoisonedNaVlcvcvTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassANaVlcvcvTransitiveFrameMismatch({
                sourceFrame: displayPoisonedNaVlcvcvTransitiveFrame,
                operationFrame: ctx.buildPretClassANaVlcvcvTransitiveOperationFrame(displayPoisonedNaVlcvcvTransitiveFrame),
            }),
        },
        {
            signature: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame.sourceSignature,
            operation: "altana",
            mismatch: "",
        }
    );
    const contradictoryNaVlcvcvTransitiveSourceFrame = {
        ...naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CVl|V|CV",
        },
    };
    const contradictoryNaVlcvcvTransitiveOperation = {
        ...naVlcvcvTransitiveContext.classANaVlcvcvTransitiveOperationFrame,
        targetFrame: {
            ...naVlcvcvTransitiveContext.classANaVlcvcvTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingNaVlcvcvTransitiveTargetOperation = {
        ...naVlcvcvTransitiveContext.classANaVlcvcvTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A n+a Vl|CV|CV transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassANaVlcvcvTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassANaVlcvcvTransitiveFrameMismatch({
                sourceFrame: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassANaVlcvcvTransitiveFrameMismatch({
                sourceFrame: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame,
                operationFrame: missingNaVlcvcvTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassANaVlcvcvTransitiveFrameMismatch({
                sourceFrame: contradictoryNaVlcvcvTransitiveSourceFrame,
                operationFrame: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassANaVlcvcvTransitiveFrameMismatch({
                sourceFrame: naVlcvcvTransitiveContext.classANaVlcvcvTransitiveSourceFrame,
                operationFrame: contradictoryNaVlcvcvTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A n+a Vl|CV|CV transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naVlcvcvTransitiveContext,
                classANaVlcvcvTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naVlcvcvTransitiveContext,
                classANaVlcvcvTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...naVlcvcvTransitiveContext,
                classANaVlcvcvTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...naVlcvcvTransitiveContext,
                classANaVlcvcvTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassANaVlcvcvTransitiveSourceFrame({
                sourceVerb: "altana",
                syllables: ctx.getSyllables("altana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naVlcvcvTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            cvlvcvSourceBlocked: ctx.buildPretClassANaVlcvcvTransitiveSourceFrame({
                sourceVerb: "taluna",
                syllables: ctx.getSyllables("taluna", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvlvcvTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            cvlvcvSourceBlocked: null,
        }
    );
    const naVjcvcvTransitiveContext = ctx.buildPretUniversalContext("ajpana", "ajpana", true, {});
    const displayPoisonedNaVjcvcvTransitiveFrame = ctx.buildPretClassANaVjcvcvTransitiveSourceFrame({
        sourceVerb: "ajpana",
        syllables: ctx.getSyllables("ajpana", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: naVjcvcvTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const naVjcvcvTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...naVjcvcvTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const naVjcvcvTransitiveDescriptorPoisonedContext = {
        ...naVjcvcvTransitiveContext,
        descriptorState: {
            ...naVjcvcvTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const naVjcvcvTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        naVjcvcvTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A n+a Vj|CV|CV transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame?.kind || "",
            operation: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveOperationFrame?.operationId || "",
            sourceVerb: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetZeroAndKi: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && naVjcvcvTransitiveContext.classANaVjcvcvTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === true,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...naVjcvcvTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: naVjcvcvTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(naVjcvcvTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: naVjcvcvTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-na-vjcvcv-transitive-source-frame",
            operation: "andrews-preterit-class-a-na-vjcvcv-transitive-policy",
            sourceVerb: "ajpana",
            targetZeroAndKi: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "ajpan", suffix: "ki", policy: "andrews-preterit-class-a-na-vjcvcv-transitive-policy" },
                { base: "ajpan", suffix: "", policy: "andrews-preterit-class-a-na-vjcvcv-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            variantsWithPoisonedDescriptors: [
                { base: "ajpan", suffix: "ki", policy: "andrews-preterit-class-a-na-vjcvcv-transitive-policy" },
                { base: "ajpan", suffix: "", policy: "andrews-preterit-class-a-na-vjcvcv-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A n+a Vj|CV|CV transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedNaVjcvcvTransitiveFrame.sourceSignature,
            operation: displayPoisonedNaVjcvcvTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassANaVjcvcvTransitiveFrameMismatch({
                sourceFrame: displayPoisonedNaVjcvcvTransitiveFrame,
                operationFrame: ctx.buildPretClassANaVjcvcvTransitiveOperationFrame(displayPoisonedNaVjcvcvTransitiveFrame),
            }),
        },
        {
            signature: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame.sourceSignature,
            operation: "ajpana",
            mismatch: "",
        }
    );
    const contradictoryNaVjcvcvTransitiveSourceFrame = {
        ...naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "Vl|CV|CV",
        },
    };
    const contradictoryNaVjcvcvTransitiveOperation = {
        ...naVjcvcvTransitiveContext.classANaVjcvcvTransitiveOperationFrame,
        targetFrame: {
            ...naVjcvcvTransitiveContext.classANaVjcvcvTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: false,
        },
    };
    const missingNaVjcvcvTransitiveTargetOperation = {
        ...naVjcvcvTransitiveContext.classANaVjcvcvTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A n+a Vj|CV|CV transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassANaVjcvcvTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassANaVjcvcvTransitiveFrameMismatch({
                sourceFrame: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassANaVjcvcvTransitiveFrameMismatch({
                sourceFrame: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame,
                operationFrame: missingNaVjcvcvTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassANaVjcvcvTransitiveFrameMismatch({
                sourceFrame: contradictoryNaVjcvcvTransitiveSourceFrame,
                operationFrame: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassANaVjcvcvTransitiveFrameMismatch({
                sourceFrame: naVjcvcvTransitiveContext.classANaVjcvcvTransitiveSourceFrame,
                operationFrame: contradictoryNaVjcvcvTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A n+a Vj|CV|CV transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naVjcvcvTransitiveContext,
                classANaVjcvcvTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...naVjcvcvTransitiveContext,
                classANaVjcvcvTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...naVjcvcvTransitiveContext,
                classANaVjcvcvTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...naVjcvcvTransitiveContext,
                classANaVjcvcvTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassANaVjcvcvTransitiveSourceFrame({
                sourceVerb: "ajpana",
                syllables: ctx.getSyllables("ajpana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naVjcvcvTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            vlcvcvSourceBlocked: ctx.buildPretClassANaVjcvcvTransitiveSourceFrame({
                sourceVerb: "altana",
                syllables: ctx.getSyllables("altana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naVlcvcvTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            vlcvcvSourceBlocked: null,
        }
    );
    const tzaTransitiveContext = ctx.buildPretUniversalContext("matza", "matza", true, {});
    const displayPoisonedTzaTransitiveFrame = ctx.buildPretClassATzaTransitiveSourceFrame({
        sourceVerb: "matza",
        syllables: ctx.getSyllables("matza", { analysis: true, assumeFinalV: true }),
        rightEdgeDescriptor: tzaTransitiveContext.rightEdgeDescriptor,
        isTransitive: true,
        isMonosyllable: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const tzaTransitiveClassAVariants = ctx.buildPretUniversalClassA({
        ...tzaTransitiveContext,
        verb: "poison",
        analysisVerb: "poison",
        exactBaseVerb: "poison",
    });
    const tzaTransitiveDescriptorPoisonedContext = {
        ...tzaTransitiveContext,
        descriptorState: {
            ...tzaTransitiveContext.descriptorState,
            shapeDescriptors: [],
            aggregateDescriptors: [],
        },
    };
    const tzaTransitiveDescriptorPoisonedClassA = ctx.buildPretUniversalClassA(
        tzaTransitiveDescriptorPoisonedContext
    );
    s.eq(
        "preterit Class A tz+a transitive policy consumes typed frame before lying strings and descriptors",
        {
            frameKind: tzaTransitiveContext.classATzaTransitiveSourceFrame?.kind || "",
            operation: tzaTransitiveContext.classATzaTransitiveOperationFrame?.operationId || "",
            sourceVerb: tzaTransitiveContext.classATzaTransitiveSourceFrame?.sourceVerbFrame?.text || "",
            targetKiOnly: tzaTransitiveContext.classATzaTransitiveOperationFrame?.targetFrame?.allowKiSuffix === true
                && tzaTransitiveContext.classATzaTransitiveOperationFrame?.targetFrame?.allowZeroSuffix === false,
            candidatesWithLyingStrings: Array.from(ctx.getPretUniversalClassCandidates({
                ...tzaTransitiveContext,
                verb: "poison",
                analysisVerb: "poison",
                exactBaseVerb: "poison",
            })),
            variants: tzaTransitiveClassAVariants.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
            candidatesWithPoisonedDescriptors: Array.from(
                ctx.getPretUniversalClassCandidates(tzaTransitiveDescriptorPoisonedContext)
            ),
            variantsWithPoisonedDescriptors: tzaTransitiveDescriptorPoisonedClassA.map((variant) => ({
                base: ctx.getPretVariantBase(variant),
                suffix: ctx.getPretVariantSuffix(variant),
                policy: variant.routePolicyFrame?.operationId || "",
            })),
        },
        {
            frameKind: "preterit-class-a-tza-transitive-source-frame",
            operation: "andrews-preterit-class-a-tza-transitive-policy",
            sourceVerb: "matza",
            targetKiOnly: true,
            candidatesWithLyingStrings: ["A"],
            variants: [
                { base: "matz", suffix: "ki", policy: "andrews-preterit-class-a-tza-transitive-policy" },
            ],
            candidatesWithPoisonedDescriptors: ["A"],
            variantsWithPoisonedDescriptors: [
                { base: "matz", suffix: "ki", policy: "andrews-preterit-class-a-tza-transitive-policy" },
            ],
        }
    );
    s.eq(
        "preterit Class A tz+a transitive source frame ignores display strings during right-edge analysis",
        {
            signature: displayPoisonedTzaTransitiveFrame.sourceSignature,
            operation: displayPoisonedTzaTransitiveFrame.sourceVerbFrame?.text || "",
            mismatch: ctx.getPretClassATzaTransitiveFrameMismatch({
                sourceFrame: displayPoisonedTzaTransitiveFrame,
                operationFrame: ctx.buildPretClassATzaTransitiveOperationFrame(displayPoisonedTzaTransitiveFrame),
            }),
        },
        {
            signature: tzaTransitiveContext.classATzaTransitiveSourceFrame.sourceSignature,
            operation: "matza",
            mismatch: "",
        }
    );
    const contradictoryTzaTransitiveSourceFrame = {
        ...tzaTransitiveContext.classATzaTransitiveSourceFrame,
        rightEdgeProfileFrame: {
            ...tzaTransitiveContext.classATzaTransitiveSourceFrame.rightEdgeProfileFrame,
            text: "CV|CV|CV",
        },
    };
    const contradictoryTzaTransitiveOperation = {
        ...tzaTransitiveContext.classATzaTransitiveOperationFrame,
        targetFrame: {
            ...tzaTransitiveContext.classATzaTransitiveOperationFrame.targetFrame,
            allowZeroSuffix: true,
        },
    };
    const missingTzaTransitiveTargetOperation = {
        ...tzaTransitiveContext.classATzaTransitiveOperationFrame,
        targetFrame: null,
    };
    s.eq(
        "preterit Class A tz+a transitive policy blocks missing and contradictory frames",
        {
            missingSource: ctx.buildPretClassATzaTransitiveOperationFrame(null),
            missingOperation: ctx.getPretClassATzaTransitiveFrameMismatch({
                sourceFrame: tzaTransitiveContext.classATzaTransitiveSourceFrame,
                operationFrame: null,
            }),
            missingTarget: ctx.getPretClassATzaTransitiveFrameMismatch({
                sourceFrame: tzaTransitiveContext.classATzaTransitiveSourceFrame,
                operationFrame: missingTzaTransitiveTargetOperation,
            }),
            contradictorySource: ctx.getPretClassATzaTransitiveFrameMismatch({
                sourceFrame: contradictoryTzaTransitiveSourceFrame,
                operationFrame: tzaTransitiveContext.classATzaTransitiveOperationFrame,
            }),
            contradictoryTarget: ctx.getPretClassATzaTransitiveFrameMismatch({
                sourceFrame: tzaTransitiveContext.classATzaTransitiveSourceFrame,
                operationFrame: contradictoryTzaTransitiveOperation,
            }),
        },
        {
            missingSource: null,
            missingOperation: "operation-frame-required",
            missingTarget: "contradictory-target-frame",
            contradictorySource: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "preterit Class A tz+a transitive route blocks descriptor-only authority without frames",
        {
            noOperationCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...tzaTransitiveContext,
                classATzaTransitiveOperationFrame: null,
            })),
            noSourceCandidates: Array.from(ctx.getPretUniversalClassCandidates({
                ...tzaTransitiveContext,
                classATzaTransitiveSourceFrame: null,
            })),
            noOperationClassA: ctx.buildPretUniversalClassA({
                ...tzaTransitiveContext,
                classATzaTransitiveOperationFrame: null,
            }),
            noSourceClassA: ctx.buildPretUniversalClassA({
                ...tzaTransitiveContext,
                classATzaTransitiveSourceFrame: null,
            }),
            intransitiveSourceBlocked: ctx.buildPretClassATzaTransitiveSourceFrame({
                sourceVerb: "matza",
                syllables: ctx.getSyllables("matza", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: tzaTransitiveContext.rightEdgeDescriptor,
                isTransitive: false,
                isMonosyllable: false,
            }),
            naSourceBlocked: ctx.buildPretClassATzaTransitiveSourceFrame({
                sourceVerb: "tana",
                syllables: ctx.getSyllables("tana", { analysis: true, assumeFinalV: true }),
                rightEdgeDescriptor: naCvTransitiveContext.rightEdgeDescriptor,
                isTransitive: true,
                isMonosyllable: false,
            }),
        },
        {
            noOperationCandidates: [],
            noSourceCandidates: [],
            noOperationClassA: null,
            noSourceClassA: null,
            intransitiveSourceBlocked: null,
            naSourceBlocked: null,
        }
    );

    // preterit context cache — explicit lifecycle hooks for isolated runtimes
    ctx.resetPretUniversalContextCache();
    s.eq("preterit cache: starts empty", ctx.getPretUniversalContextCacheSize(), 0);
    ctx.buildPretUniversalContext("nemi", "nemi", false, {});
    s.eq("preterit cache: populated after context build", ctx.getPretUniversalContextCacheSize(), 1);
    ctx.resetPretUniversalContextCache();
    s.eq("preterit cache: reset clears entries", ctx.getPretUniversalContextCacheSize(), 0);

    // preterit API wrappers — extracted from surface.js into preterit/api.js
    const markerOptions = ctx.buildPretMarkerOptionsFromFlags({ analysisVerb: "nemi" });
    const contextOptions = ctx.buildPretContextOptionsFromMeta({ exactBaseVerb: "nemi" });
    const bundle = ctx.resolvePretUniversalContextBundle({
        verb: "nemi",
        analysisVerb: "nemi",
        isTransitive: false,
        markerOptions,
        contextOptions,
        includeSummary: true,
    });
    s.eq("preterit API: meta options keep exact base", contextOptions.exactBaseVerb, "nemi");
    s.eq("preterit API: bundle analysis target = nemi", bundle.analysisTarget, "nemi");
    s.ok("preterit API: bundle context exists", bundle.context && typeof bundle.context === "object");
    s.ok("preterit API: bundle summary exists", bundle.summary && typeof bundle.summary === "object");
    s.eq(
        "preterit API: class profile helper rejects missing provenance",
        ctx.buildVncVerbstemClassProfileFromProvenance(null),
        null
    );

    const universalClassA = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "nemi",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "preterito-universal-1",
        },
    });
    s.eq(
        "preterit universal output exposes diagnostic verbstem class profile",
        {
            classKey: universalClassA.verbstemClassProfile?.classKey,
            source: universalClassA.verbstemClassProfile?.source,
            diagnosticOnly: universalClassA.verbstemClassProfile?.diagnosticOnly,
            doesNotGenerateForms: universalClassA.verbstemClassProfile?.doesNotGenerateForms,
            fromProvenance: universalClassA.stemProvenance?.verbstemClassProfile?.classKey,
        },
        {
            classKey: "A",
            source: "preterit-provenance",
            diagnosticOnly: true,
            doesNotGenerateForms: true,
            fromProvenance: "A",
        }
    );
    s.eq(
        "preterit class-based direct result exposes non-enumerable LCM frame",
        (() => {
            const result = ctx.buildClassBasedResultWithProvenance({
                verb: "asi",
                analysisVerb: "asi",
                exactBaseVerb: "asi",
                tense: "preterito",
                classFilter: "A",
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                surface: result.surface,
                frameAlias: result.frames === result.grammarFrame,
                grammarFrameEnumerable: Object.prototype.propertyIsEnumerable.call(result, "grammarFrame"),
                routeFamily: result.grammarFrame.routeContract.routeFamily,
                routeStage: result.grammarFrame.routeContract.routeStage,
                unitKind: result.grammarFrame.unitFrame.unitKind,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                evidenceStatus: result.grammarFrame.authorityFrame.evidenceStatus,
                classKey: result.grammarFrame.stemFrame.classKey,
            };
        })(),
        {
            result: "niaski",
            forms: ["niaski"],
            ok: true,
            surface: "niaski",
            frameAlias: true,
            grammarFrameEnumerable: false,
            routeFamily: "preterit-class-based-result",
            routeStage: "assemble-output",
            unitKind: "verbal-nuclear-clause",
            generationAllowed: true,
            evidenceStatus: "generated",
            classKey: "A",
        }
    );
    s.eq(
        "preterit class-based m-final stem carries Lesson 2 m-to-n frame",
        (() => {
            const result = ctx.buildClassBasedResultWithProvenance({
                verb: "mima",
                analysisVerb: "mima",
                exactBaseVerb: "mima",
                tense: "preterito",
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "ki",
            });
            const frames = result.grammarFrame?.orthographyFrame?.soundSpellingFrames || [];
            const frame = frames.find((entry) => entry.ruleId === "m-coda-n") || {};
            return {
                result: result.result,
                forms: result.forms,
                frameCount: frames.length,
                ruleId: frame.ruleId || "",
                section: frame.andrewsSection || "",
                process: frame.spanishProcess || "",
                source: frame.sourceSurface || "",
                target: frame.target || "",
                slot: frame.grammarSlot || "",
            };
        })(),
        {
            result: "kimin(ki)",
            forms: ["kimin(ki)"],
            frameCount: 1,
            ruleId: "m-coda-n",
            section: "2.11.5 / 2.13.2",
            process: "asimilación regresiva / cambio consonántico",
            source: "m",
            target: "n",
            slot: "tronco",
        }
    );
    s.eq(
        "preterit class-based contract reader prefers LCM result-frame surface forms before stale no-output text",
        (() => {
            const result = ctx.attachPreteritClassBasedGrammarContract({
                result: "stale-preterit-result",
                surface: "top-preterit-surface",
                forms: ["stale-preterit-form"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-pret-surface",
                        surfaceForms: ["frame-pret-a / frame-pret-b"],
                    }),
                }),
            }, {
                verb: "asi",
                analysisVerb: "asi",
                tense: "preterito",
                classKey: "A",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
            };
        })(),
        {
            ok: true,
            surface: "frame-pret-a",
            frameSurface: "frame-pret-a",
            frameForms: ["frame-pret-a", "frame-pret-b", "frame-pret-surface"],
            generationAllowed: true,
        }
    );
    s.eq(
        "preterit class-based contract reader keeps stale forms for metadata-only frames",
        (() => {
            const result = ctx.attachPreteritClassBasedGrammarContract({
                result: "stale-preterit-result",
                surface: "top-preterit-surface",
                forms: ["stale-preterit-a / stale-preterit-b"],
                frames: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "preterit-class-based-result",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            }, {
                verb: "asi",
                analysisVerb: "asi",
                tense: "preterito",
                classKey: "A",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "stale-preterit-a",
            frameSurface: "stale-preterit-a",
            frameForms: ["stale-preterit-a", "stale-preterit-b", "top-preterit-surface", "stale-preterit-result"],
        }
    );
    s.eq(
        "preterit class-based blocked result normalizes dash surface",
        (() => {
            const result = ctx.buildClassBasedResultWithProvenance({
                verb: "asi",
                analysisVerb: "asi",
                exactBaseVerb: "asi",
                tense: "perfecto",
                classFilter: "B",
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                surface: result.surface,
                routeStage: result.grammarFrame.routeContract.routeStage,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                diagnosticStatus: result.grammarFrame.diagnosticFrame.status,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
                diagnosticFailedLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.contractLayer || "",
                diagnosticsEnumerable: Object.prototype.propertyIsEnumerable.call(result, "diagnostics"),
            };
        })(),
        {
            result: "—",
            forms: [],
            ok: false,
            surface: "",
            routeStage: "class-result-gate",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            diagnosticId: "preterit-class-based-result-no-output",
            diagnosticFailedLayer: "output",
            diagnosticContractLayer: "resultFrame",
            diagnosticsEnumerable: false,
        }
    );
    s.eq(
        "preterit variant assembly exposes LCM frame",
        (() => {
            const context = ctx.buildPretUniversalContext("asi", "asi", false, { exactBaseVerb: "asi" });
            const variants = ctx.getPretUniversalVariantsByClass(context).get("A");
            const result = ctx.buildPretUniversalResultDetailedFromVariants(ctx.buildPretVariantAssemblyFrame({
                variants,
                subjectPrefix: "ni",
                objectPrefix: "",
                subjectSuffix: "",
                surface: "poison",
                result: "poison",
                stem: "poison",
                formulaEcho: "poison",
            }));
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                surface: result.surface,
                routeFamily: result.grammarFrame.routeContract.routeFamily,
                routeStage: result.grammarFrame.routeContract.routeStage,
                unitKind: result.grammarFrame.unitFrame.unitKind,
                variantCount: result.grammarFrame.stemFrame.variantCount,
                grammarFrameEnumerable: Object.prototype.propertyIsEnumerable.call(result, "grammarFrame"),
            };
        })(),
        {
            result: "niaski",
            forms: ["niaski"],
            ok: true,
            surface: "niaski",
            routeFamily: "preterit-variant-assembly",
            routeStage: "assemble-variants",
            unitKind: "verbal-nuclear-clause",
            variantCount: 1,
            grammarFrameEnumerable: false,
        }
    );
    s.eq(
        "preterit variant assembly legacy variants-array API is blocked",
        (() => {
            const context = ctx.buildPretUniversalContext("asi", "asi", false, { exactBaseVerb: "asi" });
            const variants = ctx.getPretUniversalVariantsByClass(context).get("A");
            const result = ctx.buildPretUniversalResultDetailedFromVariants(variants, "ni", "", "");
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
            };
        })(),
        {
            result: null,
            forms: [],
            ok: false,
            diagnosticId: "preterit-variant-assembly-missing-frame",
        }
    );
    s.eq(
        "preterit variant assembly missing typed operation frame blocks",
        (() => {
            const context = ctx.buildPretUniversalContext("asi", "asi", false, { exactBaseVerb: "asi" });
            const variants = ctx.getPretUniversalVariantsByClass(context).get("A");
            const assemblyFrame = ctx.buildPretVariantAssemblyFrame({
                variants,
                subjectPrefix: "ni",
            });
            const result = ctx.buildPretUniversalResultDetailedFromVariants({
                ...assemblyFrame,
                operationFrame: null,
            });
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
            };
        })(),
        {
            result: null,
            forms: [],
            ok: false,
            diagnosticId: "preterit-variant-assembly-missing-operation-frame",
        }
    );
    s.eq(
        "preterit variant assembly missing source frame blocks",
        (() => {
            const context = ctx.buildPretUniversalContext("asi", "asi", false, { exactBaseVerb: "asi" });
            const variants = ctx.getPretUniversalVariantsByClass(context).get("A");
            const assemblyFrame = ctx.buildPretVariantAssemblyFrame({
                variants,
                subjectPrefix: "ni",
            });
            const result = ctx.buildPretUniversalResultDetailedFromVariants({
                ...assemblyFrame,
                sourceFrame: null,
            });
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
            };
        })(),
        {
            result: null,
            forms: [],
            ok: false,
            diagnosticId: "preterit-variant-assembly-missing-source-frame",
        }
    );
    s.eq(
        "preterit variant assembly contradictory source frame blocks",
        (() => {
            const context = ctx.buildPretUniversalContext("asi", "asi", false, { exactBaseVerb: "asi" });
            const variants = ctx.getPretUniversalVariantsByClass(context).get("A");
            const assemblyFrame = ctx.buildPretVariantAssemblyFrame({
                variants,
                subjectPrefix: "ni",
            });
            const result = ctx.buildPretUniversalResultDetailedFromVariants({
                ...assemblyFrame,
                sourceFrame: {
                    ...assemblyFrame.sourceFrame,
                    variantCount: 99,
                },
            });
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
            };
        })(),
        {
            result: null,
            forms: [],
            ok: false,
            diagnosticId: "preterit-variant-assembly-contradictory-source-frame",
        }
    );
    s.eq(
        "preterit variant assembly contract reader prefers LCM result-frame surface forms before stale no-output text",
        (() => {
            const result = ctx.attachPretUniversalVariantAssemblyGrammarContract({
                result: "stale-variant-result",
                surface: "top-variant-surface",
                forms: ["stale-variant-form"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-variant-surface",
                        surfaceForms: ["frame-variant-a / frame-variant-b"],
                    }),
                }),
            }, {
                variants: [],
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
            };
        })(),
        {
            ok: true,
            surface: "frame-variant-a",
            frameSurface: "frame-variant-a",
            frameForms: ["frame-variant-a", "frame-variant-b", "frame-variant-surface"],
            generationAllowed: true,
        }
    );
    s.eq(
        "preterit variant assembly reader keeps stale forms for metadata-only frames",
        (() => {
            const result = ctx.attachPretUniversalVariantAssemblyGrammarContract({
                result: "stale-variant-result",
                surface: "top-variant-surface",
                forms: ["stale-variant-a / stale-variant-b"],
                frames: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "preterit-variant-assembly",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            }, {
                variants: [],
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
            });
            return {
                ok: result.ok,
                surface: result.surface,
                frameSurface: result.grammarFrame.resultFrame.surface,
                frameForms: result.grammarFrame.resultFrame.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "stale-variant-a",
            frameSurface: "stale-variant-a",
            frameForms: ["stale-variant-a", "stale-variant-b", "top-variant-surface", "stale-variant-result"],
        }
    );
    s.eq(
        "preterit variant assembly blocked source gate carries diagnostics",
        (() => {
            const result = ctx.buildPretUniversalResultDetailedFromVariants(ctx.buildPretVariantAssemblyFrame({
                variants: [],
                subjectPrefix: "ni",
                objectPrefix: "",
                subjectSuffix: "",
            }));
            return {
                result: result.result,
                forms: result.forms,
                ok: result.ok,
                routeStage: result.grammarFrame.routeContract.routeStage,
                generationAllowed: result.grammarFrame.routeContract.generationAllowed,
                diagnosticId: result.grammarFrame.diagnosticFrame.diagnostics[0]?.id || "",
                diagnosticFailedLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.failedLayer || "",
                diagnosticContractLayer: result.grammarFrame.diagnosticFrame.diagnostics[0]?.contractLayer || "",
            };
        })(),
        {
            result: null,
            forms: [],
            ok: false,
            routeStage: "variant-source-gate",
            generationAllowed: false,
            diagnosticId: "preterit-variant-assembly-blocked",
            diagnosticFailedLayer: "route",
            diagnosticContractLayer: "routeContract",
        }
    );

    const asiSecondPluralPreterite = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "an",
            obj1: "",
            tronco: "asi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "preterito",
        },
    });
    s.eq(
        "preterit 2pl intransitive vowel stem realizes an→anh",
        asiSecondPluralPreterite.surfaceForms,
        ["anhasket", "anhasiket"]
    );

    const asiSecondPluralPerfect = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "an",
            obj1: "",
            tronco: "asi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "perfecto",
        },
    });
    s.eq(
        "perfect 2pl intransitive vowel stem is blocked by Andrews CNV tense gate",
        {
            surfaceForms: asiSecondPluralPerfect.surfaceForms,
            diagnostic: asiSecondPluralPerfect.diagnostics?.[0]?.id || "",
        },
        {
            surfaceForms: [],
            diagnostic: "not-andrews-grammar-gate",
        }
    );

    const asiSecondPluralRemote = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
        },
        posicionesFormula: {
            pers1: "an",
            obj1: "",
            tronco: "asi",
            pers2: "t",
            num2: "t",
            poseedor: "",
            tiempo: "pasado-remoto",
        },
    });
    s.eq(
        "remote past 2pl intransitive vowel stem realizes an→anh",
        asiSecondPluralRemote.surfaceForms,
        ["anhaskat"]
    );

    return s;
}

module.exports = { run };
