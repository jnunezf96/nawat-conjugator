"use strict";

/**
 * Tests for src/core/agreement/agreement.js
 * Covers: getSubjectPersonInfo, getObjectPersonInfo,
 *         isSamePersonAcrossNumber, isSamePersonReflexive.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("agreement");

    // getSubjectPersonInfo(prefix, suffix) → {person, number}
    s.eq("subject ni/ = 1sg", ctx.getSubjectPersonInfo("ni", ""), { person: 1, number: "sg" });
    s.eq("subject ti/ = 2sg", ctx.getSubjectPersonInfo("ti", ""), { person: 2, number: "sg" });
    s.eq("subject // = 3sg", ctx.getSubjectPersonInfo("", ""), { person: 3, number: "sg" });
    s.eq("subject ti/t = 1pl", ctx.getSubjectPersonInfo("ti", "t"), { person: 1, number: "pl" });

    // getObjectPersonInfo(prefix) → {person, number} | null
    s.eq("object ki = 3sg", ctx.getObjectPersonInfo("ki"), { person: 3, number: "sg" });
    s.eq("object nech = 1sg", ctx.getObjectPersonInfo("nech"), { person: 1, number: "sg" });
    s.eq("object tech = 1pl", ctx.getObjectPersonInfo("tech"), { person: 1, number: "pl" });
    s.eq("object kin = 3pl", ctx.getObjectPersonInfo("kin"), { person: 3, number: "pl" });
    s.eq("object mits = null (indirect object, not tracked)", ctx.getObjectPersonInfo("mits"), null);

    // isSamePersonAcrossNumber — true when subject and object share person but differ in number
    s.ok("1sg subj + 1pl obj = same person across number", ctx.isSamePersonAcrossNumber("ni", "", "tech"));
    s.no("1sg subj + 3sg obj = different person", ctx.isSamePersonAcrossNumber("ni", "", "ki"));
    s.no("2sg subj + 1sg obj = different person", ctx.isSamePersonAcrossNumber("ti", "", "nech"));

    // isSamePersonReflexive — subject = object in person+number (3rd person never reflexive here)
    s.ok("1sg subj + 1sg obj = reflexive", ctx.isSamePersonReflexive("ni", "", "nech"));
    s.no("1sg subj + 3sg obj = not reflexive", ctx.isSamePersonReflexive("ni", "", "ki"));
    s.no("3sg subj + 3sg obj = not reflexive (3rd person excluded)", ctx.isSamePersonReflexive("", "", "ki"));

    // getObjectLabel — returns non-empty string for known prefixes
    s.ok("getObjectLabel ki returns non-empty", Boolean(ctx.getObjectLabel("ki")));
    s.ok("getObjectLabel kin returns non-empty", Boolean(ctx.getObjectLabel("kin")));
    s.ok("getObjectLabel nech returns non-empty", Boolean(ctx.getObjectLabel("nech")));
    s.ok("getObjectLabel empty prefix returns intransitive label", Boolean(ctx.getObjectLabel("")));

    // getObjectLabelShort — strips parenthetical suffix notations
    const longLabel = ctx.getObjectLabel("ki");
    const shortLabel = ctx.getObjectLabelShort("ki");
    s.ok("getObjectLabelShort result length <= full label length", shortLabel.length <= longLabel.length);
    s.no("getObjectLabelShort contains no parenthetical", shortLabel.includes("("));

    // getObjectComboLabel — Nawat hardcoded pronoun forms
    s.eq("getObjectComboLabel nech/Nawat = naja", ctx.getObjectComboLabel("nech", true), "naja");
    s.eq("getObjectComboLabel metz/Nawat = taja", ctx.getObjectComboLabel("metz", true), "taja");
    s.eq("getObjectComboLabel ki/Nawat = yaja", ctx.getObjectComboLabel("ki", true), "yaja");
    s.eq("getObjectComboLabel tech/Nawat = tejemet", ctx.getObjectComboLabel("tech", true), "tejemet");
    s.eq("getObjectComboLabel kin/Nawat = yejemet", ctx.getObjectComboLabel("kin", true), "yejemet");
    // Spanish mode delegates to getObjectLabelShort
    s.eq("getObjectComboLabel ki/Spanish = getObjectLabelShort(ki)", ctx.getObjectComboLabel("ki", false), ctx.getObjectLabelShort("ki", false));

    return s;
}

module.exports = { run };
