"use strict";

/**
 * Tests for src/core/search/runtime.mjs
 * Covers: search normalization, nominal mode detection, and search-plan helpers.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("search");
    const summarizeOrdinaryNncSearchCandidate = (candidate) => candidate && ({
        kind: candidate.kind,
        candidateKind: candidate.candidateKind,
        supported: candidate.supported,
        input: candidate.input,
        base: candidate.base,
        trimmedBase: candidate.trimmedBase,
        normalizedInput: candidate.normalizedInput,
        fixture: candidate.fixture && {
            id: candidate.fixture.id,
            stem: candidate.fixture.stem,
            lemma: candidate.fixture.lemma,
            nounClass: candidate.fixture.nounClass,
            animacy: candidate.fixture.animacy,
        },
        entries: candidate.paradigmSet && Array.isArray(candidate.paradigmSet.entries)
            ? candidate.paradigmSet.entries.map((entry) => entry.result)
            : [],
        diagnostics: candidate.paradigmSet ? candidate.paradigmSet.diagnostics : [],
    });

    const split = ctx.splitSearchInput("nemi");
    s.eq("splitSearchInput keeps raw base", split.base, "nemi");
    s.no("splitSearchInput has no query by default", split.hasQuery);

    const parts = ctx.getSearchParts("  nemi  ");
    s.eq("getSearchParts trims base separately", parts.trimmedBase, "nemi");
    s.eq("getSearchInputBase returns base only", ctx.getSearchInputBase("nemi"), "nemi");
    const currentRegexMetadataSourceFrame = ctx.buildCurrentRegexParseSourceFrame("(ki)-(nemi)");
    const currentRegexMetadataOperationFrame = ctx.buildCurrentRegexParseOperationFrame(currentRegexMetadataSourceFrame);
    const currentRegexMetadataContradictoryOperationFrame = {
        ...currentRegexMetadataOperationFrame,
        targetFrame: {
            ...currentRegexMetadataOperationFrame.targetFrame,
            regexValue: "-(paka)",
        },
    };
    s.eq("raw input regex metadata consumes typed parse operation target", {
        direct: (() => {
            const metadata = ctx.getRawInputTiCausativeMetadata("(ki)-(nemi)");
            return {
                normalizedInput: metadata.normalizedInput,
                displayCore: metadata.displayCore,
                displayVerb: metadata.displayVerb,
                operation: metadata.currentRegexParseOperationFrame?.operationId || "",
                slots: metadata.semanticObjectSlotCount,
            };
        })(),
        fromOperation: (() => {
            const metadata = ctx.getRawInputTiCausativeMetadataFromParseOperationFrame(
                "(ki)-(nemi)",
                currentRegexMetadataOperationFrame
            );
            return {
                normalizedInput: metadata?.normalizedInput || "",
                displayCore: metadata?.displayCore || "",
                operation: metadata?.currentRegexParseOperationFrame?.operationId || "",
            };
        })(),
        missingOperation: ctx.getRawInputTiCausativeMetadataFromParseOperationFrame("(ki)-(nemi)", null),
        oldParsedPayload: ctx.getRawInputTiCausativeMetadataFromParseOperationFrame(
            "(ki)-(nemi)",
            ctx.parseMovingTargetRegexInput("(ki)-(nemi)")
        ),
        contradictoryOperation: ctx.getRawInputTiCausativeMetadataFromParseOperationFrame(
            "(ki)-(nemi)",
            currentRegexMetadataContradictoryOperationFrame
        ),
    }, {
        direct: {
            normalizedInput: "(ki)-(nemi)",
            displayCore: "nemi",
            displayVerb: "(ki)-(nemi)",
            operation: "andrews-current-regex-parse",
            slots: 1,
        },
        fromOperation: {
            normalizedInput: "(ki)-(nemi)",
            displayCore: "nemi",
            operation: "andrews-current-regex-parse",
        },
        missingOperation: null,
        oldParsedPayload: null,
        contradictoryOperation: null,
    });
    s.eq("ordinaryNnc: search candidate helper is exported", typeof ctx.getOrdinaryNncSearchCandidateInfo, "function");
    s.eq("ordinaryNnc: search candidate boolean helper is exported", typeof ctx.isOrdinaryNncSearchCandidate, "function");
    s.eq(
        "ordinaryNnc: search candidate marks nominal nuclear clause output",
        ctx.getOrdinaryNncSearchCandidateInfo("kal").outputKind,
        "nominal-nuclear-clause"
    );
    s.eq(
        "ordinaryNnc: search candidate detects lemma-backed fixture",
        summarizeOrdinaryNncSearchCandidate(ctx.getOrdinaryNncSearchCandidateInfo(" shuchit ")),
        {
            kind: "ordinary-nnc-search-candidate",
            candidateKind: "ordinary-nnc-fixture",
            supported: true,
            input: " shuchit ",
            base: " shuchit ",
            trimmedBase: "shuchit",
            normalizedInput: "shuchit",
            fixture: {
                id: "shuchi",
                stem: "shuchi",
                lemma: "shuchit",
                nounClass: "t",
                animacy: "inanimate",
            },
            entries: ["shuchit", "shujshuchit", "nushuchiw", "mushuchiw"],
            diagnostics: [],
        }
    );
    s.eq(
        "ordinaryNnc: search candidate detects user-provided mistun fixture",
        summarizeOrdinaryNncSearchCandidate(ctx.getOrdinaryNncSearchCandidateInfo("mistun")),
        {
            kind: "ordinary-nnc-search-candidate",
            candidateKind: "ordinary-nnc-fixture",
            supported: true,
            input: "mistun",
            base: "mistun",
            trimmedBase: "mistun",
            normalizedInput: "mistun",
            fixture: {
                id: "mistun",
                stem: "mistun",
                lemma: "mistun",
                nounClass: "zero",
                animacy: "animate",
            },
            entries: ["mistun", "mistunmet", "mijmistunmet", "numistun", "mumistun", "numistun", "mumistun"],
            diagnostics: [],
        }
    );
    s.eq("ordinaryNnc: unsupported search candidate returns null", ctx.getOrdinaryNncSearchCandidateInfo("unconfigured-nnc"), null);
    s.eq("ordinaryNnc: boolean helper detects fixtures only", [
        ctx.isOrdinaryNncSearchCandidate("kal"),
        ctx.isOrdinaryNncSearchCandidate("shuchit"),
        ctx.isOrdinaryNncSearchCandidate("unconfigured-nnc"),
    ], [true, true, false]);
    s.eq("ordinaryNnc: search input base remains unchanged", ctx.getSearchInputBase(" shuchit "), " shuchit ");
    s.eq("ordinaryNnc: search parts trimming remains unchanged", ctx.getSearchParts(" shuchit ").trimmedBase, "shuchit");
    s.eq("ordinaryNnc: search query info remains null", ctx.getSearchQueryInfo("shuchit"), null);
    s.no("ordinaryNnc: fixture input does not become search mode", ctx.isSearchModeInput("shuchit"));

    s.ok("template-only base detects underscore shell", ctx.isComposerTemplateOnlyBaseValue("-_tmpl"));
    s.no("template-only base rejects real verb", ctx.isComposerTemplateOnlyBaseValue("nemi"));

    s.eq(
        "normalizeConjugationSearchText strips punctuation",
        ctx.normalizeConjugationSearchText("Ne-mi?!"),
        "nemi"
    );
    const originalSearchLanguageProfileGetter = ctx.getActiveLanguageProfileMode;
    try {
        ctx.getActiveLanguageProfileMode = () => ctx.LANGUAGE_PROFILE_MODE.classicalNahuatl;
        s.eq(
            "Classical conjugation search preserves macron root letters",
            ctx.normalizeConjugationSearchText("zō-mā?!"),
            "zōmā"
        );
        ctx.getActiveLanguageProfileMode = () => ctx.LANGUAGE_PROFILE_MODE.nawatPipil;
        s.eq(
            "Nawat/Pipil conjugation search remains ASCII-only",
            ctx.normalizeConjugationSearchText("zō-mā?!"),
            "zm"
        );
    } finally {
        ctx.getActiveLanguageProfileMode = originalSearchLanguageProfileGetter;
    }
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
