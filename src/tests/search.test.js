"use strict";

/**
 * Tests for src/core/search/runtime.js
 * Covers: search normalization, nominal mode detection, and search-plan helpers.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("search");

    const split = ctx.splitSearchInput("nemi");
    s.eq("splitSearchInput keeps raw base", split.base, "nemi");
    s.no("splitSearchInput has no query by default", split.hasQuery);

    const parts = ctx.getSearchParts("  nemi  ");
    s.eq("getSearchParts trims base separately", parts.trimmedBase, "nemi");
    s.eq("getSearchInputBase returns base only", ctx.getSearchInputBase("nemi"), "nemi");

    s.ok("template-only base detects underscore shell", ctx.isComposerTemplateOnlyBaseValue("-_tmpl"));
    s.no("template-only base rejects real verb", ctx.isComposerTemplateOnlyBaseValue("nemi"));

    s.eq(
        "normalizeConjugationSearchText strips punctuation",
        ctx.normalizeConjugationSearchText("Ne-mi?!"),
        "nemi"
    );
    s.ok("matchesSearchVariant supports contains", ctx.matchesSearchVariant("kinemi", "nemi", "contains"));
    s.ok("matchesSearchVariant supports starts", ctx.matchesSearchVariant("kinemi", "ki", "starts"));
    s.ok("matchesSearchVariant supports ends", ctx.matchesSearchVariant("kinemi", "nemi", "ends"));
    s.no("matchesSearchVariant exact mode requires full equality", ctx.matchesSearchVariant("kinemi", "nemi", "exact"));

    s.ok("isNominalTenseMode accepts sustantivo", ctx.isNominalTenseMode(ctx.TENSE_MODE.sustantivo));
    s.no("isNominalTenseMode rejects verbo", ctx.isNominalTenseMode(ctx.TENSE_MODE.verbo));

    const groups = ctx.getSearchModeGroups(ctx.TENSE_MODE.verbo);
    s.eq("getSearchModeGroups returns tense first for verbo", groups[0], ctx.CONJUGATION_GROUPS.tense);
    s.eq("getSearchModeGroups includes universal for verbo", groups[1], ctx.CONJUGATION_GROUPS.universal);

    const optionPlan = ctx.buildSearchOptionPlan(["a", "b", "c"], "b", "a");
    s.eq("buildSearchOptionPlan preserves stored selection first", optionPlan[0], "b");
    s.eq("buildSearchOptionPlan keeps remaining order", optionPlan[1], "a");

    s.eq("getNounObjectSlotStateKey appends indirect suffix", ctx.getNounObjectSlotStateKey("noun|x", "object2"), "noun|x|indirect");
    s.eq("getNounObjectSlotStateKey leaves primary object key untouched", ctx.getNounObjectSlotStateKey("noun|x", "object"), "noun|x");

    s.eq("getDefaultPossessorForTense defaults calificativo-instrumentivo to i", ctx.getDefaultPossessorForTense("calificativo-instrumentivo"), "i");
    s.eq("getDefaultPossessorForTense defaults others to empty", ctx.getDefaultPossessorForTense("agentivo"), "");

    const selectionModels = ctx.buildNounObjectSlotSelectionModels([
        {
            id: "object",
            activeId: "ta",
            toggleValues: ["ta", "te"],
        },
        {
            id: "object2",
            activeId: ctx.OBJECT_TOGGLE_ALL,
            toggleValues: ["ta", "te"],
        },
    ]);
    const seenSelections = [];
    ctx.iterateNounObjectSlotSelections(selectionModels, (selectedBySlot) => {
        seenSelections.push(`${selectedBySlot.object}|${selectedBySlot.object2}`);
    });
    s.eq("iterateNounObjectSlotSelections emits first combined selection", seenSelections[0], "ta|ta");
    s.eq("iterateNounObjectSlotSelections emits second combined selection", seenSelections[1], "ta|te");

    return s;
}

module.exports = { run };
