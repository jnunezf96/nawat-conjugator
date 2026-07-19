"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("output");

    s.ok(
        "output authority helpers are available",
        typeof ctx.attachOutputProvenanceGrammarContract === "function"
            && typeof ctx.buildGrammarFormulaRecord === "function"
            && typeof ctx.buildGrammarFormulaRealizationRecord === "function"
    );

    const formulaRecord = ctx.buildGrammarFormulaRecord({
        id: "output-authority-nnc-formula",
        unit: "NNC",
        formula: "#0-0(nemi)0-0#",
        formulaSlots: {
            predicateStem: { stem: "nemi", surface: "nemi", slot: "STEM" },
        },
        routeContract: { routeFamily: "classical-nnc-output-authority" },
    });
    const realizationRecord = ctx.buildGrammarFormulaRealizationRecord({
        id: "output-authority-nnc-realization",
        formulaRecord,
        segmentFrames: [
            { slot: "predicateStem", formulaValue: "nemi", surface: "nemi" },
        ],
        surfaceForms: ["nemi"],
    });
    const authorized = ctx.attachOutputProvenanceGrammarContract({
        result: "POISON-RESULT",
        surface: "POISON-SURFACE",
        surfaceForms: ["POISON-FORMS"],
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: {
                ...ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "POISON-FRAME-SURFACE",
                    surfaceForms: ["POISON-FRAME-FORMS"],
                    outputKind: "classical-nnc-output",
                    generationRoute: "classical-nnc-output-authority",
                    formulaRecord,
                    formulaRealizationRecord: realizationRecord,
                }),
                formulaRecord,
                formulaRecords: [formulaRecord],
                formulaRealizationRecord: realizationRecord,
                formulaRealizationRecords: [realizationRecord],
            },
        }),
    });
    s.eq(
        "typed formula realization defeats display-string poison",
        {
            ok: authorized.ok,
            surface: authorized.surface,
            surfaceForms: authorized.surfaceForms,
        },
        {
            ok: true,
            surface: "nemi",
            surfaceForms: ["nemi"],
        }
    );

    const blocked = ctx.attachOutputProvenanceGrammarContract({
        result: "POISON-RESULT",
        surface: "POISON-SURFACE",
        surfaceForms: ["POISON-FORMS"],
        grammarFrame: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: false,
                surface: "",
                surfaceForms: [],
                outputKind: "classical-nnc-output",
                generationRoute: "blocked",
            }),
        }),
    });
    s.eq(
        "blocked typed output cannot be revived by display strings",
        {
            ok: blocked.ok,
            surface: blocked.surface,
            surfaceForms: blocked.surfaceForms,
        },
        {
            ok: false,
            surface: "",
            surfaceForms: [],
        }
    );

    s.eq(
        "causative output provenance retains Andrews stem and causative authority",
        ctx.getOutputProvenanceAndrewsRefs({ derivationType: "causative" }),
        ["Andrews Lesson 7 7.1-7.5", "Andrews Lesson 24 24.1"]
    );

    return s;
}

module.exports = { run };
