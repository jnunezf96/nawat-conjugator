"use strict";

const { createSuite } = require("./runner");
const {
    collectStaticNncFixtureErrors,
} = require("../../scripts/check_grammar_data");

function run() {
    const s = createSuite("data_validation");
    const currentStaticNnc = require("../../data/static_nnc.json");
    const currentStaticOptions = require("../../data/static_options.json");

    const validate = (data) => collectStaticNncFixtureErrors(data, currentStaticOptions);
    const messages = (data) => validate(data).join("\n");

    s.eq("static NNC validator is exported", typeof collectStaticNncFixtureErrors, "function");
    s.eq("current static NNC fixtures pass validation", validate(currentStaticNnc), []);

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
