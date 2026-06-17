"use strict";

const { createSuite } = require("./runner");
const {
    collectAndrewsTrajectoryErrors,
    collectStaticNncFixtureErrors,
    collectVisibleUiSpanishSurfaceErrors,
} = require("../../scripts/check_grammar_data");

function run() {
    const s = createSuite("data_validation");
    const currentStaticNnc = require("../../data/static_nnc.json");
    const currentStaticOptions = require("../../data/static_options.json");

    const validate = (data) => collectStaticNncFixtureErrors(data, currentStaticOptions);
    const messages = (data) => validate(data).join("\n");

    s.eq("static NNC validator is exported", typeof collectStaticNncFixtureErrors, "function");
    s.eq("current static NNC fixtures pass validation", validate(currentStaticNnc), []);
    s.eq("Andrews trajectory validator is exported", typeof collectAndrewsTrajectoryErrors, "function");
    s.eq("current Andrews trajectory contract passes validation", collectAndrewsTrajectoryErrors(), []);
    s.eq("visible Spanish UI validator is exported", typeof collectVisibleUiSpanishSurfaceErrors, "function");
    s.eq("current visible Spanish UI surface passes validation", collectVisibleUiSpanishSurfaceErrors(), []);

    s.ok(
        "static NNC validator rejects unknown states",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    construct: {
                        numberForms: {
                            singular: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("state \"construct\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown numbers",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    absolutive: {
                        numberForms: {
                            dual: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("number \"dual\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown possessors",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    possessive: {
                        numberFormsByPossessor: {
                            singular: {
                                nech: { surfaceForms: ["nechbad"] },
                            },
                        },
                    },
                },
            }],
        }).includes("possessor \"nech\" is not in static_options.possessivePrefixes")
    );
    s.ok(
        "static NNC validator rejects pseudo noun classes",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "lexical",
                animacy: "inanimate",
                states: {
                    absolutive: {
                        numberForms: {
                            singular: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("nounClass \"lexical\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown animacy values",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "abstract",
                states: {
                    absolutive: {
                        numberForms: {
                            singular: { surfaceForms: ["bad"] },
                        },
                    },
                },
            }],
        }).includes("animacy \"abstract\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects unknown plural-type fixture cells",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "animate",
                states: {
                    absolutive: {
                        numberForms: {
                            plural: {
                                surfaceForms: ["badmet"],
                                formsByPluralType: {
                                    collective: { surfaceForms: ["badwan"] },
                                },
                            },
                        },
                    },
                },
            }],
        }).includes("plural type \"collective\" is not allowed")
    );
    s.ok(
        "static NNC validator rejects malformed surface forms",
        messages({
            ordinaryNncFixtures: [{
                id: "bad",
                stem: "bad",
                lemma: "bad",
                nounClass: "zero",
                animacy: "inanimate",
                states: {
                    absolutive: {
                        numberForms: {
                            singular: { surfaceForms: ["bad", "bad", ""] },
                        },
                    },
                },
            }],
        }).includes("surfaceForms contains duplicate values")
    );

    return s;
}

module.exports = { run };
