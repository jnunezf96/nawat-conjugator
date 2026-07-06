"use strict";

/**
 * Tests for src/core/parsing/parsing.js
 * Covers: normalizeMovingTargetCoreText, splitTopLevelByPlus, stripPrefixOnce,
 *         serializeRegexInputValue, findFinalTopLevelWrappedCore,
 *         isRecognizedCurrentRegexValue, applyObj2ToObj1Chain.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("parsing");
    const summarizeOrdinaryNncClassifications = (parsed) => (
        Array.isArray(parsed?.ordinaryNncFixtureClassifications)
            ? parsed.ordinaryNncFixtureClassifications.map((entry) => ({
                kind: entry.kind,
                role: entry.role,
                value: entry.value,
                normalizedInput: entry.normalizedInput,
                fixture: entry.fixture && {
                    id: entry.fixture.id,
                    stem: entry.fixture.stem,
                    lemma: entry.fixture.lemma,
                    nounClass: entry.fixture.nounClass,
                    animacy: entry.fixture.animacy,
                },
            }))
            : []
    );
    const summarizeGenerated = (result) => ({
        error: result?.error === true,
        result: result?.result || "",
        surfaceForms: result?.surfaceForms || [],
    });
    s.eq("compound lesson parser audit APIs exist", [
        typeof ctx.buildLesson28VerbalEmbedPursuitFrame,
        typeof ctx.getLesson28VerbalEmbedSubsectionInventory,
        typeof ctx.buildLesson30NominalEmbedPursuitFrame,
        typeof ctx.getLesson30NominalEmbedSubsectionInventory,
    ], ["function", "function", "function", "function"]);

    // normalizeMovingTargetCoreText — lowercases, strips non-alphabetic
    s.eq("normalize: uppercases lowercased", ctx.normalizeMovingTargetCoreText("CHIWA"), "chiwa");
    s.eq("normalize: mixed case", ctx.normalizeMovingTargetCoreText("Nemi"), "nemi");
    s.eq("normalize: already lowercase", ctx.normalizeMovingTargetCoreText("kisa"), "kisa");
    s.eq("normalize: empty", ctx.normalizeMovingTargetCoreText(""), "");

    // splitTopLevelByPlus — splits on + at depth 0 (respects parentheses)
    s.eq("split: single token", ctx.splitTopLevelByPlus("nemi"), ["nemi"]);
    s.eq("split: two tokens", ctx.splitTopLevelByPlus("ni+nemi"), ["ni", "nemi"]);
    s.eq("split: three tokens", ctx.splitTopLevelByPlus("ni+k+chiwa"), ["ni", "k", "chiwa"]);
    s.eq("split: parens protect inner +", ctx.splitTopLevelByPlus("a+(b+c)+d"), ["a", "(b+c)", "d"]);
    s.eq("split: empty returns null", ctx.splitTopLevelByPlus(""), null);

    // stripPrefixOnce — removes a literal prefix string from the start
    s.eq("stripPrefix: removes ni+", ctx.stripPrefixOnce("ni+nemi", "ni+"), "nemi");
    s.eq("stripPrefix: no match returns original", ctx.stripPrefixOnce("nemi", "ni+"), "nemi");
    s.eq("stripPrefix: empty prefix", ctx.stripPrefixOnce("nemi", ""), "nemi");

    // serializeRegexInputValue — trims whitespace, preserves case
    s.eq("serialize: trims whitespace", ctx.serializeRegexInputValue("  NEMI  "), "NEMI");
    s.eq("serialize: ni+nemi preserved", ctx.serializeRegexInputValue("ni+nemi"), "ni+nemi");
    s.eq("serialize: empty", ctx.serializeRegexInputValue(""), "");

    // findFinalTopLevelWrappedCore — finds the last top-level (...) wrapper
    const wrapped = ctx.findFinalTopLevelWrappedCore("(nemi)");
    s.ok("findWrappedCore: finds (nemi)", wrapped !== null);
    s.eq("findWrappedCore: coreText=nemi", wrapped && wrapped.coreText, "nemi");
    s.eq("findWrappedCore: no wrapper returns null", ctx.findFinalTopLevelWrappedCore("nemi"), null);

    // isRecognizedCurrentRegexValue — validates that input is non-empty
    s.ok("isRecognized: nemi is valid", ctx.isRecognizedCurrentRegexValue("nemi"));
    s.no("isRecognized: empty is invalid", ctx.isRecognizedCurrentRegexValue(""));
    s.no("isRecognized: whitespace-only is invalid", ctx.isRecognizedCurrentRegexValue("   "));
    s.eq(
        "compound marker constants consume structured token classes instead of regex strings",
        (() => {
            const oldMarker = ctx.COMPOUND_MARKER_RE;
            const oldSplit = ctx.COMPOUND_MARKER_SPLIT_RE;
            const oldAllowed = ctx.COMPOUND_ALLOWED_RE;
            try {
                ctx.applyStaticConstants({
                    compoundTokenClasses: {
                        letterRanges: [{ from: "a", to: "z" }],
                        markerTokens: ["@"],
                        splitTokens: ["@"],
                    },
                });
                const structured = {
                    marker: "x@y".replace(ctx.COMPOUND_MARKER_RE, ""),
                    split: "x@y".split(ctx.COMPOUND_MARKER_SPLIT_RE),
                    allowed: "x!@y".replace(ctx.COMPOUND_ALLOWED_RE, ""),
                };
                ctx.applyStaticConstants({
                    compoundMarkerRe: { pattern: "x", flags: "g" },
                    compoundMarkerSplitRe: { pattern: "x" },
                    compoundAllowedRe: { pattern: "x", flags: "g" },
                });
                const poisonedLegacyRegex = {
                    marker: "x@y".replace(ctx.COMPOUND_MARKER_RE, ""),
                    split: "x@y".split(ctx.COMPOUND_MARKER_SPLIT_RE),
                    allowed: "x!@y".replace(ctx.COMPOUND_ALLOWED_RE, ""),
                };
                return { structured, poisonedLegacyRegex };
            } finally {
                ctx.COMPOUND_MARKER_RE = oldMarker;
                ctx.COMPOUND_MARKER_SPLIT_RE = oldSplit;
                ctx.COMPOUND_ALLOWED_RE = oldAllowed;
            }
        })(),
        {
            structured: {
                marker: "xy",
                split: ["x", "y"],
                allowed: "x@y",
            },
            poisonedLegacyRegex: {
                marker: "xy",
                split: ["x", "y"],
                allowed: "x@y",
            },
        }
    );

    const shorthandSourceFrame = ctx.buildCurrentRegexShorthandSourceFrame("nemi");
    const shorthandOperationFrame = ctx.buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame);
    s.eq("current regex shorthand route requires source and operation frames", {
        directOldApi: ctx.getCurrentRegexShorthandParseInput("nemi"),
        framedApi: ctx.getCurrentRegexShorthandParseInput("nemi", shorthandOperationFrame),
        sourceKind: shorthandSourceFrame.kind,
        sourceLayer: shorthandSourceFrame.sourceLayer,
        targetKind: shorthandOperationFrame.targetFrame.kind,
        operationKind: shorthandOperationFrame.kind,
        operationStatus: shorthandOperationFrame.status,
        parsedVerb: ctx.parseVerbInput("nemi").verb,
        parsedDisplay: ctx.parseVerbInput("nemi").displayVerb,
        parsedSourceFrame: ctx.parseVerbInput("nemi").currentRegexShorthandSourceFrame?.kind || "",
        parsedOperationFrame: ctx.parseVerbInput("nemi").currentRegexShorthandOperationFrame?.kind || "",
        canonicalOperationFrame: ctx.parseVerbInput("nemi").canonical.currentRegexShorthandOperationFrame?.kind || "",
    }, {
        directOldApi: "",
        framedApi: "(nemi)",
        sourceKind: "current-regex-shorthand-source-frame",
        sourceLayer: "original-current-regex-input",
        targetKind: "current-regex-shorthand-target-frame",
        operationKind: "andrews-current-regex-shorthand-operation-frame",
        operationStatus: "authorized",
        parsedVerb: "nemi",
        parsedDisplay: "nemi",
        parsedSourceFrame: "current-regex-shorthand-source-frame",
        parsedOperationFrame: "andrews-current-regex-shorthand-operation-frame",
        canonicalOperationFrame: "andrews-current-regex-shorthand-operation-frame",
    });
    s.eq("current regex shorthand blocks slash-boundary shorthand from source frame", {
        blockReason: ctx.buildCurrentRegexShorthandSourceFrame("ta/nemi").blockReason,
        framedResult: ctx.getCurrentRegexShorthandParseInputFromSourceFrame("ta/nemi"),
    }, {
        blockReason: "boundary-present",
        framedResult: "",
    });
    s.eq("current regex shorthand hostile frames cannot authorize target", {
        missingOperation: ctx.getCurrentRegexShorthandParseInput("nemi"),
        changedSource: ctx.getCurrentRegexShorthandParseInput("paka", shorthandOperationFrame),
        contradictoryTarget: ctx.buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame, {
            kind: "current-regex-shorthand-target-frame",
            regexInput: "(paka)",
        }).blockReason,
        missingTarget: ctx.buildCurrentRegexShorthandOperationFrame(shorthandSourceFrame, {
            kind: "not-a-target-frame",
            regexInput: "(nemi)",
        }).blockReason,
        displayPoisoned: ctx.getCurrentRegexShorthandParseInput("nemi", {
            ...shorthandOperationFrame,
            sourceFrame: {
                ...shorthandOperationFrame.sourceFrame,
                stem: "paka",
                surface: "-(paka)",
                result: "-(paka)",
                formulaEcho: "#bad#",
            },
            stem: "paka",
            surface: "-(paka)",
            result: "-(paka)",
            formulaEcho: "#bad#",
        }),
    }, {
        missingOperation: "",
        changedSource: "",
        contradictoryTarget: "contradictory-target-frame",
        missingTarget: "missing-target-frame",
        displayPoisoned: "(nemi)",
    });

    const disambiguationSourceFrame = ctx.buildVerbDisambiguationSourceFrame(
        "taketza",
        ctx.parseVerbInput("taketza")
    );
    const disambiguationOperationFrame = ctx.buildVerbDisambiguationOperationFrame(disambiguationSourceFrame, {
        isTransitive: false,
    });
    const disambiguationPayload = ctx.buildVerbDisambiguationCandidates("taketza");
    s.eq("verb disambiguation candidate generation uses typed source and operation frames", {
        sourceKind: disambiguationPayload.sourceFrame?.kind || "",
        sourceLayer: disambiguationPayload.sourceFrame?.sourceLayer || "",
        sourceCore: disambiguationPayload.sourceFrame?.sourceCore || "",
        operationKind: disambiguationPayload.operationFrame?.kind || "",
        operationStatus: disambiguationPayload.operationFrame?.status || "",
        candidateKinds: (disambiguationPayload.operationFrame?.candidateFrames || []).map((frame) => frame.candidateKind),
        suggestions: disambiguationPayload.suggestions.map((entry) => entry.value),
    }, {
        sourceKind: "verb-disambiguation-source-frame",
        sourceLayer: "current-regex-parse-structure",
        sourceCore: "taketza",
        operationKind: "andrews-verb-disambiguation-operation-frame",
        operationStatus: "authorized",
        candidateKinds: ["affix-boundary", "affix-boundary", "prefix-boundary"],
        suggestions: ["ta-ketza", "t-aketza"],
    });
    s.eq("verb disambiguation hostile frames cannot authorize candidates", {
        directExecutorMissingOperation: ctx.buildVerbDisambiguationCandidatesFromOperationFrame("taketza").blockReason,
        changedSource: ctx.buildVerbDisambiguationCandidatesFromOperationFrame("paka", disambiguationOperationFrame).blockReason,
        displayPoisonedSuggestions: ctx.buildVerbDisambiguationCandidatesFromOperationFrame("taketza", {
            ...disambiguationOperationFrame,
            sourceFrame: {
                ...disambiguationOperationFrame.sourceFrame,
                stem: "paka",
                surface: "paka",
                result: "paka",
                formulaEcho: "#bad#",
            },
            stem: "paka",
            surface: "paka",
            result: "paka",
            formulaEcho: "#bad#",
        }).suggestions.map((entry) => entry.value),
        slashDisplayBlock: ctx.buildVerbDisambiguationCandidates("ta/nemi").blockReason,
    }, {
        directExecutorMissingOperation: "missing-operation-frame",
        changedSource: "contradictory-source-frame",
        displayPoisonedSuggestions: ["ta-ketza", "t-aketza"],
        slashDisplayBlock: "missing-structured-source-core",
    });

    // applyObj2ToObj1Chain — composes obj2 onto the obj1 chain
    s.eq("obj2 chain: ni + ch = nich", ctx.applyObj2ToObj1Chain("ni", "ch"), "nich");
    s.eq("obj2 chain: empty marker unchanged", ctx.applyObj2ToObj1Chain("ni", ""), "ni");
    s.eq("obj2 chain: empty obj1 + marker", ctx.applyObj2ToObj1Chain("", "mits"), "mits");

    // getParsedSyllableAnalysisTarget — parser-owned syllable normalization
    s.eq("parsedSyllableTarget: wrapped core", ctx.getParsedSyllableAnalysisTarget("(nemi)"), "nemi");
    s.eq(
        "parsedSyllableTarget: assume final vowel",
        ctx.getParsedSyllableAnalysisTarget("nem", { assumeFinalV: true }),
        "nema"
    );

    const noCompound = ctx.parseVerbInput("(nemi)");
    s.eq("compoundAst: plain input returns null", noCompound.compoundAst, null);
    s.eq("compoundAst: plain canonical returns null", noCompound.canonical.compoundAst, null);
    s.eq("ordinaryNnc: plain verb has no fixture classifications", summarizeOrdinaryNncClassifications(noCompound), []);

    const ordinaryKal = ctx.parseVerbInput("kal");
    s.eq(
        "ordinaryNnc: kal classification marks nominal nuclear clause output",
        ordinaryKal.ordinaryNncFixtureClassifications[0].outputKind,
        "nominal-nuclear-clause"
    );
    s.eq("ordinaryNnc: kal keeps verb parse core fields", {
        verb: ordinaryKal.verb,
        analysisVerb: ordinaryKal.analysisVerb,
        exactBaseVerb: ordinaryKal.exactBaseVerb,
        displayVerb: ordinaryKal.displayVerb,
        displayCore: ordinaryKal.displayCore,
    }, {
        verb: "kal",
        analysisVerb: "kal",
        exactBaseVerb: "kal",
        displayVerb: "kal",
        displayCore: "kal",
    });
    s.eq("ordinaryNnc: kal has matrix fixture classification", summarizeOrdinaryNncClassifications(ordinaryKal), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "matrix",
        value: "kal",
        normalizedInput: "kal",
        fixture: {
            id: "kal",
            stem: "kal",
            lemma: "kal",
            nounClass: "zero",
            animacy: "inanimate",
        },
    }]);

    const ordinaryShuchit = ctx.parseVerbInput("shuchit");
    s.eq("ordinaryNnc: shuchit keeps verb parse core fields", {
        verb: ordinaryShuchit.verb,
        analysisVerb: ordinaryShuchit.analysisVerb,
        exactBaseVerb: ordinaryShuchit.exactBaseVerb,
        displayVerb: ordinaryShuchit.displayVerb,
        displayCore: ordinaryShuchit.displayCore,
    }, {
        verb: "shuchit",
        analysisVerb: "shuchit",
        exactBaseVerb: "shuchit",
        displayVerb: "shuchit",
        displayCore: "shuchit",
    });
    s.eq("ordinaryNnc: shuchit has lemma-backed matrix fixture classification", summarizeOrdinaryNncClassifications(ordinaryShuchit), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "matrix",
        value: "shuchit",
        normalizedInput: "shuchit",
        fixture: {
            id: "shuchi",
            stem: "shuchi",
            lemma: "shuchit",
            nounClass: "t",
            animacy: "inanimate",
        },
    }]);

    const ordinaryMistun = ctx.parseVerbInput("mistun");
    s.eq("ordinaryNnc: mistun has user-provided matrix fixture classification", summarizeOrdinaryNncClassifications(ordinaryMistun), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "matrix",
        value: "mistun",
        normalizedInput: "mistun",
        fixture: {
            id: "mistun",
            stem: "mistun",
            lemma: "mistun",
            nounClass: "zero",
            animacy: "animate",
        },
    }]);

    const unconfiguredOrdinaryNnc = ctx.parseVerbInput("unconfigurednnc");
    s.eq("ordinaryNnc: unconfigured stem has no fixture classifications", summarizeOrdinaryNncClassifications(unconfiguredOrdinaryNnc), []);

    const impersonalCompound = ctx.parseVerbInput("ta+(nemi)");
    s.eq("compoundAst: impersonal compound kind", impersonalCompound.compoundAst.kind, "compound");
    s.eq("compoundAst: impersonal compound matrix", impersonalCompound.compoundAst.matrix, {
        role: "matrix",
        stem: "nemi",
        ruleBase: "nemi",
    });
    s.eq("compoundAst: impersonal compound roles", impersonalCompound.compoundAst.embeds.map((entry) => entry.role), ["impersonal-valence"]);
    s.eq("compoundAst: impersonal compound source", impersonalCompound.compoundAst.source, {
        rawInput: "ta+(nemi)",
        displayVerb: "ta+(nemi)",
        displayCore: "nemi",
        verb: "tanemi",
        analysisVerb: "nemi",
        embeddedPrefix: "ta",
        sourcePrefix: "",
        sourceBase: "nemi",
        verbSegment: "ta-nemi",
        parts: ["ta", "nemi"],
    });

    const adjacentCompound = ctx.parseVerbInput("-(ish-kwi)");
    s.eq("compoundAst: adjacent core embed role", adjacentCompound.compoundAst.embeds.map((entry) => entry.role), ["adjacent-core-embed"]);
    s.eq("compoundAst: adjacent core embed matrix", adjacentCompound.compoundAst.matrix.stem, "kwi");

    const embeddedSlashCompound = ctx.parseVerbInput("-(ish/kwi)");
    s.eq("embedded slash object slot route uses typed source and operation frames", {
        verb: embeddedSlashCompound.verb,
        matrix: embeddedSlashCompound.exactBaseVerb,
        embeddedValenceCount: embeddedSlashCompound.embeddedValenceCount,
        availableObjectSlots: ctx.getAvailableObjectSlots(embeddedSlashCompound),
        directOldApi: ctx.getEmbeddedSlashTransitiveObjSlotCount("-(ish/kwi)"),
        framedApi: ctx.getEmbeddedSlashTransitiveObjSlotCount(
            "-(ish/kwi)",
            embeddedSlashCompound.embeddedSlashObjectSlotOperationFrame
        ),
        sourceKind: embeddedSlashCompound.embeddedSlashObjectSlotSourceFrame?.kind || "",
        sourceLayer: embeddedSlashCompound.embeddedSlashObjectSlotSourceFrame?.sourceLayer || "",
        sourceCoreText: embeddedSlashCompound.embeddedSlashObjectSlotSourceFrame?.sourceCoreText || "",
        tokenStream: (embeddedSlashCompound.embeddedSlashObjectSlotSourceFrame?.sourceTokenStream || []).map((entry) => ({
            role: entry.role,
            value: entry.value,
            ownsObjectSlot: entry.ownsObjectSlot === true,
        })),
        operationKind: embeddedSlashCompound.embeddedSlashObjectSlotOperationFrame?.kind || "",
        operationStatus: embeddedSlashCompound.embeddedSlashObjectSlotOperationFrame?.status || "",
    }, {
        verb: "ishkwi",
        matrix: "kwi",
        embeddedValenceCount: 1,
        availableObjectSlots: 0,
        directOldApi: null,
        framedApi: 1,
        sourceKind: "embedded-slash-object-slot-source-frame",
        sourceLayer: "original-current-regex-core-boundary",
        sourceCoreText: "ish/kwi",
        tokenStream: [
            { role: "adjacent-core-embed", value: "ish", ownsObjectSlot: true },
            { role: "matrix", value: "kwi", ownsObjectSlot: false },
        ],
        operationKind: "andrews-embedded-slash-object-slot-operation-frame",
        operationStatus: "authorized",
    });
    s.eq("embedded slash object slot hostile frames block", {
        missingOperation: ctx.getEmbeddedSlashTransitiveObjSlotCount("-(ish/kwi)"),
        changedSource: ctx.getEmbeddedSlashTransitiveObjSlotCount(
            "-(a/kwi)",
            embeddedSlashCompound.embeddedSlashObjectSlotOperationFrame
        ),
        contradictoryTarget: ctx.buildEmbeddedSlashObjectSlotOperationFrame(
            embeddedSlashCompound.embeddedSlashObjectSlotSourceFrame,
            {
                kind: "embedded-slash-object-slot-count-target-frame",
                objectSlotCount: 2,
                embeddedValenceCount: 2,
            }
        ).blockReason,
        valenceLeftBoundary: ctx.buildEmbeddedSlashObjectSlotSourceFrame(
            "-(ta/kwi)",
            ctx.parseMovingTargetRegexInput("-(ta/kwi)")
        ).blockReason,
        displayPoisoned: ctx.getEmbeddedSlashTransitiveObjSlotCount("-(ish/kwi)", {
            ...embeddedSlashCompound.embeddedSlashObjectSlotOperationFrame,
            sourceFrame: {
                ...embeddedSlashCompound.embeddedSlashObjectSlotOperationFrame.sourceFrame,
                stem: "paka",
                surface: "-(paka)",
                result: "-(paka)",
                formulaEcho: "#bad#",
            },
            stem: "paka",
            surface: "-(paka)",
            result: "-(paka)",
            formulaEcho: "#bad#",
        }),
    }, {
        missingOperation: null,
        changedSource: null,
        contradictoryTarget: "contradictory-target-frame",
        valenceLeftBoundary: "valence-left-boundary",
        displayPoisoned: 1,
    });

    const lexicalCompound = ctx.parseVerbInput("(shuchi)-(kwi)");
    s.eq("compoundAst: outer lexical embed role", lexicalCompound.compoundAst.embeds.map((entry) => entry.role), ["outer-lexical"]);
    s.eq("compoundAst: outer lexical embed value", lexicalCompound.compoundAst.embeds[0].value, "shuchi");
    s.eq("ordinaryNnc: lexical compound classifies outer noun fixture", summarizeOrdinaryNncClassifications(lexicalCompound), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "outer-lexical",
        value: "shuchi",
        normalizedInput: "shuchi",
        fixture: {
            id: "shuchi",
            stem: "shuchi",
            lemma: "shuchit",
            nounClass: "t",
            animacy: "inanimate",
        },
    }]);

    const lexicalValenceAdjacentCompound = ctx.parseVerbInput("(a)+ta-(ish-kwi)");
    s.eq(
        "compoundAst: outer lexical plus valence plus adjacent roles",
        lexicalValenceAdjacentCompound.compoundAst.embeds.map((entry) => entry.role),
        ["outer-lexical", "outer-valence", "adjacent-core-embed"]
    );
    s.eq("compoundAst: outer lexical plus adjacent source prefix", lexicalValenceAdjacentCompound.compoundAst.source.sourcePrefix, "a");
    s.eq("ordinaryNnc: outer lexical plus adjacent classifies source noun fixture", summarizeOrdinaryNncClassifications(lexicalValenceAdjacentCompound), [{
        kind: "ordinary-nnc-fixture-classification",
        role: "outer-lexical",
        value: "a",
        normalizedInput: "a",
        fixture: {
            id: "a",
            stem: "a",
            lemma: "at",
            nounClass: "t",
            animacy: "inanimate",
        },
    }]);
    s.eq("compoundAst: outer lexical plus adjacent valency", lexicalValenceAdjacentCompound.compoundAst.valency, {
        transitivity: "transitive",
        tokens: ["ta"],
        slotCount: 1,
        hasSpecific: false,
        hasNonspecific: true,
        isMarkedTransitive: true,
        isTaFusion: true,
    });
    s.eq("compoundAst: Lesson 28 grammar contract stays non-enumerable", {
        grammarFrameEnumerable: Object.prototype.propertyIsEnumerable.call(lexicalValenceAdjacentCompound.compoundAst, "grammarFrame"),
        routeFamily: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.routeContract.routeFamily,
        routeStage: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.routeContract.routeStage,
        generationAllowed: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.routeContract.generationAllowed,
        unitKind: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.unitFrame.unitKind,
        embedBeforeMatrix: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.stemFrame.embedBeforeMatrixInviolable,
        noClassicalSurfaceImport: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.orthographyFrame.noClassicalSurfaceImport,
        routeFrameKind: lexicalValenceAdjacentCompound.compoundAst.routeFrame.kind,
        sourceFormula: lexicalValenceAdjacentCompound.compoundAst.routeFrame.sourceFormula,
        generationStatus: lexicalValenceAdjacentCompound.compoundAst.routeFrame.generationStatus,
        routeLicensesObjectSlots: lexicalValenceAdjacentCompound.compoundAst.routeFrame.routeFrameLicensesObjectSlotOwnership,
        routeOwnsObjectSlotLicensing: lexicalValenceAdjacentCompound.compoundAst.routeFrame.objectSlotOwnership.routeFrameOwnsObjectSlotLicensing,
        finalShapeLicensesRole: lexicalValenceAdjacentCompound.compoundAst.routeFrame.finalFormulaShapeDoesNotLicenseRole === false,
        functionUseOwnsObjectSlots: lexicalValenceAdjacentCompound.compoundAst.routeFrame.objectSlotOwnership.functionUseOwnsObjectSlots,
        sourceRouteFrameRequired: lexicalValenceAdjacentCompound.compoundAst.routeFrame.sourceRouteFrameRequired,
        participantOwnershipKind: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.participantFrame.objectSlotOwnership.kind,
        participantValenceFrameFixed: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.participantFrame.valenceFrame.frameFixed,
        grammarSourceRouteFrameKind: lexicalValenceAdjacentCompound.compoundAst.grammarFrame.routeContract.sourceContract.sourceRouteFrame.kind,
    }, {
        grammarFrameEnumerable: false,
        routeFamily: "compound-verbstem",
        routeStage: "parse-compound-ast",
        generationAllowed: false,
        unitKind: "compound-verbstem-boundary",
        embedBeforeMatrix: true,
        noClassicalSurfaceImport: true,
        routeFrameKind: "andrews-compound-ast-route-frame",
        sourceFormula: "NNC + VNC = compound VNC",
        generationStatus: "diagnostic-only",
        routeLicensesObjectSlots: false,
        routeOwnsObjectSlotLicensing: false,
        finalShapeLicensesRole: false,
        functionUseOwnsObjectSlots: false,
        sourceRouteFrameRequired: true,
        participantOwnershipKind: "compound-ast-object-slot-ownership-frame",
        participantValenceFrameFixed: false,
        grammarSourceRouteFrameKind: "andrews-compound-ast-route-frame",
    });
    s.eq(
        "#1 entrada grammar object stages stem, valence, object, and function-use separately",
        (() => {
            const entrada = lexicalValenceAdjacentCompound.entradaGrammarObject;
            return {
                kind: entrada?.kind || "",
                rawInput: entrada?.rawInput || "",
                layerOrder: entrada?.layerOrder || [],
                morphBoundary: {
                    kind: entrada?.morphBoundaryFrame?.kind || "",
                    sourceLesson: entrada?.morphBoundaryFrame?.sourceLesson || "",
                    evaluationOrder: entrada?.morphBoundaryFrame?.evaluationOrder || "",
                    beforeFormulaBoundary: entrada?.morphBoundaryFrame?.beforeFormulaBoundary === true,
                    objectMorphs: (entrada?.morphBoundaryFrame?.objectMorphs || []).map((entry) => ({
                        slotId: entry.slotId,
                        surfaceMorph: entry.surfaceMorph,
                        formulaMorph: entry.formulaMorph,
                        allomorphyKind: entry.allomorphyKind,
                    })),
                    functionUseEvaluationOrder: entrada?.morphBoundaryFrame?.functionUseEvaluationOrder || "",
                },
                formulaFixed: entrada?.formulaBoundaryFrame?.frameFixed === true,
                candidateDoesNotLicenseFunctionUse: entrada?.formulaBoundaryFrame?.candidateSlotsDoNotLicenseFunctionUse === true,
                stem: {
                    matrixStem: entrada?.stemFrame?.matrixStem || "",
                    matrixRuleBase: entrada?.stemFrame?.matrixRuleBase || "",
                    adjacentEmbed: entrada?.stemFrame?.adjacentEmbed || "",
                    sourceLayer: entrada?.stemFrame?.sourceLayer || "",
                },
                valence: {
                    transitivity: entrada?.valenceFrame?.transitivity || "",
                    tokens: entrada?.valenceFrame?.tokens || [],
                    lexicalEmbeds: entrada?.valenceFrame?.lexicalEmbeds || [],
                    frameFixed: entrada?.valenceFrame?.frameFixed === true,
                    sourceLayer: entrada?.valenceFrame?.sourceLayer || "",
                },
                object: {
                    hasObjectSlots: entrada?.objectFrame?.hasObjectSlots === true,
                    slots: (entrada?.objectFrame?.slots || []).map((slot) => ({
                        slotId: slot.slotId,
                        token: slot.token,
                        role: slot.role,
                        sourceLayer: slot.sourceLayer,
                    })),
                    vector: entrada?.objectFrame?.vector || {},
                    frameFixed: entrada?.objectFrame?.frameFixed === true,
                },
                routeRankingAllowed: entrada?.routeFrame?.routeRankingAllowed === true,
                functionUse: {
                    status: entrada?.functionUseFrame?.status || "",
                    evaluationOrder: entrada?.functionUseFrame?.evaluationOrder || "",
                    downstreamOfValenceFrame: entrada?.functionUseFrame?.downstreamOfValenceFrame === true,
                    mayAnnotateLicensedReadingsOnly: entrada?.functionUseFrame?.mayAnnotateLicensedReadingsOnly === true,
                    createsValenceObjectStructure: entrada?.functionUseFrame?.createsValenceObjectStructure === true,
                    reclassifiesValenceObjectStructure: entrada?.functionUseFrame?.reclassifiesValenceObjectStructure === true,
                },
            };
        })(),
        {
            kind: "andrews-entrada-grammar-object",
            rawInput: "(a)+ta-(ish-kwi)",
            layerOrder: ["morph-boundary-frame", "formula-boundary", "stem-frame", "valence-frame", "object-frame", "route-frame", "function-use-frame"],
            morphBoundary: {
                kind: "andrews-lesson-1-entrada-morph-boundary-frame",
                sourceLesson: "Andrews Lesson 1",
                evaluationOrder: "before-formula-boundary",
                beforeFormulaBoundary: true,
                objectMorphs: [{
                    slotId: "obj1",
                    surfaceMorph: "ta",
                    formulaMorph: "ta",
                    allomorphyKind: "lesson-1-morph-boundary-same-surface",
                }],
                functionUseEvaluationOrder: "last",
            },
            formulaFixed: false,
            candidateDoesNotLicenseFunctionUse: true,
            stem: {
                matrixStem: "kwi",
                matrixRuleBase: "kwi",
                adjacentEmbed: "ish",
                sourceLayer: "stem-frame",
            },
            valence: {
                transitivity: "transitive",
                tokens: ["ta"],
                lexicalEmbeds: ["a"],
                frameFixed: false,
                sourceLayer: "valence-frame",
            },
            object: {
                hasObjectSlots: true,
                slots: [{
                    slotId: "obj1",
                    token: "ta",
                    role: "object-marker",
                    sourceLayer: "object-frame",
                }],
                vector: { obj1: "ta", obj2: "", obj3: "", reflexivo: "" },
                frameFixed: false,
            },
            routeRankingAllowed: false,
            functionUse: {
                status: "deferred",
                evaluationOrder: "last",
                downstreamOfValenceFrame: true,
                mayAnnotateLicensedReadingsOnly: true,
                createsValenceObjectStructure: false,
                reclassifiesValenceObjectStructure: false,
            },
        }
    );
    const partialFormulaEntrada = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+ta-(ish-kwi)",
        ctx.parseMovingTargetRegexInput("(a)+ta-(ish-kwi)"),
        null,
        {
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "kwi", displayStem: "kwi" },
            },
            sourceFormulaEcho: "#Ø-ta(kwi)Ø#",
        }
    );
    s.eq(
        "#1 entrada formula evidence does not fix valence until staged object slots are covered",
        {
            formulaFixed: partialFormulaEntrada?.formulaBoundaryFrame?.frameFixed === true,
            valenceFrameFixed: partialFormulaEntrada?.valenceFrame?.frameFixed === true,
            objectFrameFixed: partialFormulaEntrada?.objectFrame?.frameFixed === true,
            objectSlotsCovered: partialFormulaEntrada?.formulaBoundaryFrame?.objectSlotsCovered === true,
            missingObjectSlots: partialFormulaEntrada?.formulaBoundaryFrame?.missingObjectSlots || [],
            routeRankingAllowed: partialFormulaEntrada?.routeFrame?.routeRankingAllowed === true,
        },
        {
            formulaFixed: true,
            valenceFrameFixed: false,
            objectFrameFixed: false,
            objectSlotsCovered: false,
            missingObjectSlots: [{ slotId: "obj1", token: "ta" }],
            routeRankingAllowed: false,
        }
    );

    const earlyAllomorphicEntrada = ctx.buildEntradaGrammarObjectFromCanonicalVerbSpec(
        {
            matrixStem: "mati",
            matrixRuleBase: "mati",
            adjacentEmbed: "",
            transitivity: "transitive",
            valenceTokens: ["metz"],
            valenceEmbeds: [],
        },
        {
            rawInput: "metzmati",
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "ati", displayStem: "ati" },
                obj1: { slot: "obj1", token: "m-etz", displayPrefix: "m-etz" },
            },
            sourceFormulaEcho: "#0-0+m-etz(ati)0+0-0#",
        }
    );
    s.eq(
        "#1 entrada stages Lesson 1 allomorphy before formula boundary",
        {
            layerOrderStart: (earlyAllomorphicEntrada?.layerOrder || []).slice(0, 2),
            morphBoundaryKind: earlyAllomorphicEntrada?.morphBoundaryFrame?.kind || "",
            morphBoundaryOrder: earlyAllomorphicEntrada?.morphBoundaryFrame?.evaluationOrder || "",
            objectAllomorphs: earlyAllomorphicEntrada?.morphBoundaryFrame?.allomorphs || [],
            governingObjectMorph: (() => {
                const objectMorph = earlyAllomorphicEntrada?.morphBoundaryFrame?.objectMorphs?.[0] || {};
                return {
                    governingSlotId: objectMorph.governingSlotId || "",
                    governingPath: objectMorph.governingPath || "",
                    valencePosition: objectMorph.valencePosition || "",
                    predicatePositionStatus: objectMorph.predicatePositionStatus || "",
                    sourceSections: objectMorph.sourceSections || [],
                    va1: objectMorph.va1?.morph || "",
                    va2: objectMorph.va2?.morph || "",
                    classicalDyad: objectMorph.governingFrame?.classicalDyad || "",
                    nawatDyad: objectMorph.governingFrame?.nawatDyad || "",
                };
            })(),
            candidateObj1: earlyAllomorphicEntrada?.formulaBoundaryFrame?.candidateFormulaSlots?.obj1 || null,
            formulaFixed: earlyAllomorphicEntrada?.formulaBoundaryFrame?.frameFixed === true,
            objectSlotsCovered: earlyAllomorphicEntrada?.formulaBoundaryFrame?.objectSlotsCovered === true,
            valenceFrameFixed: earlyAllomorphicEntrada?.valenceFrame?.frameFixed === true,
            objectFrameToken: earlyAllomorphicEntrada?.objectFrame?.slots?.[0]?.token || "",
            objectFrameFormulaMorph: earlyAllomorphicEntrada?.objectFrame?.slots?.[0]?.formulaMorph || "",
            routeRankingAllowed: earlyAllomorphicEntrada?.routeFrame?.routeRankingAllowed === true,
            functionUseOrder: earlyAllomorphicEntrada?.functionUseFrame?.evaluationOrder || "",
        },
        {
            layerOrderStart: ["morph-boundary-frame", "formula-boundary"],
            morphBoundaryKind: "andrews-lesson-1-entrada-morph-boundary-frame",
            morphBoundaryOrder: "before-formula-boundary",
            objectAllomorphs: [
                {
                    slotId: "obj1",
                    role: "object-marker",
                    surfaceMorph: "metz",
                    formulaMorph: "m-etz",
                    morphs: ["m", "etz"],
                    allomorphyKind: "lesson-1-morph-boundary-object-prefix",
                    ownerLayer: "object-frame",
                    beforeFormulaBoundary: true,
                },
                {
                    slotId: "predicateStem",
                    role: "predicate-stem",
                    formulaMorph: "ati",
                    surfaceMorph: "mati",
                    allomorphyKind: "lesson-1-morph-boundary-stem-shape",
                    ownerLayer: "stem-frame",
                    beforeFormulaBoundary: true,
                },
            ],
            governingObjectMorph: {
                governingSlotId: "va1-va2",
                governingPath: "dyadic-specific-projective-non-third",
                valencePosition: "va1-va2",
                predicatePositionStatus: "dyadic",
                sourceSections: ["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"],
                va1: "m",
                va2: "etz",
                classicalDyad: "m-itz",
                nawatDyad: "m-etz",
            },
            candidateObj1: {
                slot: "obj1",
                token: "m-etz",
                surfaceToken: "metz",
                allomorphicFormulaMorph: "m-etz",
                ownerLayer: "object-frame",
            },
            formulaFixed: true,
            objectSlotsCovered: true,
            valenceFrameFixed: true,
            objectFrameToken: "metz",
            objectFrameFormulaMorph: "m-etz",
            routeRankingAllowed: true,
            functionUseOrder: "last",
        }
    );

    const malformedCompound = ctx.parseVerbInput("ta+(");
    s.eq("compoundAst: malformed compound-like input returns null", malformedCompound.compoundAst, null);
    s.eq("compoundAst: malformed canonical returns null", malformedCompound.canonical.compoundAst, null);
    s.eq("ordinaryNnc: malformed compound-like input has no fixture classifications", summarizeOrdinaryNncClassifications(malformedCompound), []);

    const generatePresent = (verb) => ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
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
    s.eq("compoundAst: generated ta+(nemi) unchanged", generatePresent("ta+(nemi)").surfaceForms, ["nitanemi"]);
    s.eq("compoundAst: generated (a)+ta-(kwi) unchanged", generatePresent("(a)+ta-(kwi)").surfaceForms, ["niatakwi"]);
    s.eq("compoundAst: generated (shuchi)-(kwi) unchanged", generatePresent("(shuchi)-(kwi)").surfaceForms, ["nishuchikwi"]);
    s.eq("ordinaryNnc: generated (kal)-(kwi) unchanged", generatePresent("(kal)-(kwi)").surfaceForms, ["nikalkwi"]);
    s.eq("ordinaryNnc: generated (mistun)-(kwi) unchanged", generatePresent("(mistun)-(kwi)").surfaceForms, ["nimistunkwi"]);
    s.eq("ordinaryNnc: generated (shuchit)-(kwi) unchanged", generatePresent("(shuchit)-(kwi)").surfaceForms, ["nishuchitkwi"]);
    s.eq("compoundAst: generated -(ish-kwi) unchanged", generatePresent("-(ish-kwi)").surfaceForms, ["nishkwi"]);
    s.eq("compoundAst: generated (a)+ta-(ish-kwi) unchanged", generatePresent("(a)+ta-(ish-kwi)").surfaceForms, ["niataishkwi"]);
    s.eq("ordinaryNnc: bare kal generation remains verb-routed", summarizeGenerated(generatePresent("kal")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });
    const bareKalBlocked = generatePresent("kal");
    s.eq("ordinaryNnc: bare kal no-output keeps an LCM blocked frame", {
        ok: bareKalBlocked.ok,
        surface: bareKalBlocked.surface,
        framesIsGrammarFrame: bareKalBlocked.frames === bareKalBlocked.grammarFrame,
        unitKind: bareKalBlocked.frames.unitFrame.unitKind,
        routeStage: bareKalBlocked.frames.routeContract.routeStage,
        generationAllowed: bareKalBlocked.frames.routeContract.generationAllowed,
        diagnosticId: bareKalBlocked.diagnostics[0].id,
    }, {
        ok: false,
        surface: "",
        framesIsGrammarFrame: true,
        unitKind: "verbal-nuclear-clause",
        routeStage: "raw-input-final-vowel-gate",
        generationAllowed: false,
        diagnosticId: "nuclear-clause-surface-final-vowel-gate-blocked",
    });
    s.eq("ordinaryNnc: bare shuchit generation remains verb-routed", summarizeGenerated(generatePresent("shuchit")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });
    s.eq("ordinaryNnc: bare mistun generation remains verb-routed", summarizeGenerated(generatePresent("mistun")), {
        error: true,
        result: "—",
        surfaceForms: [],
    });

    const lesson28Frame = ctx.buildLesson28VerbalEmbedPursuitFrame();
    s.eq("lesson 28 pursuit frame covers every subsection", {
        stepNumber: lesson28Frame.stepNumber,
        pdfRefs: lesson28Frame.pdfRefs.length,
        subsectionSections: lesson28Frame.subsectionInventory.map((entry) => entry.andrewsSection),
        plannedArrowIds: lesson28Frame.plannedArrows.map((arrow) => arrow.id),
        firedArrowIds: lesson28Frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
        hitCount: lesson28Frame.hitCount,
        missCount: lesson28Frame.missCount,
        closestPass: lesson28Frame.closestPass,
        generationAllowed: lesson28Frame.generationAllowed,
    }, {
        stepNumber: 28,
        pdfRefs: 12,
        subsectionSections: ["28.1", "28.2", "28.3", "28.4", "28.5", "28.6", "28.7", "28.8", "28.9", "28.10", "28.11", "28.12"],
        plannedArrowIds: ["lesson-28-verbal-embed-compound-audit"],
        firedArrowIds: [["lesson-28-verbal-embed-compound-audit", "hit"]],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        generationAllowed: false,
    });
    s.eq("lesson 28 pursuit frame records Andrews compound architecture", {
        formulas: lesson28Frame.formulaFrame.formulas,
        matrixPosition: lesson28Frame.matrixEmbedFrame.matrixPosition,
        embedNeverSubject: lesson28Frame.matrixEmbedFrame.embedNeverFunctionsAsSubject,
        cohesivenessTypes: lesson28Frame.cohesivenessFrame.types.map((entry) => entry.id),
        valenceCombinations: lesson28Frame.verbalEmbedValenceFrame.combinations,
        connectiveMorphs: lesson28Frame.connectiveTFrame.morphs.map((entry) => entry.morph),
        connectivePatterns: lesson28Frame.connectiveTFrame.patterns,
        intransitiveMatrixCount: lesson28Frame.intransitiveMatrixFrame.matrixCount,
        specialFormationIds: lesson28Frame.specialFormationsFrame.formations.map((entry) => entry.id),
        reflexiveMoInvariant: lesson28Frame.reflexiveMatrixFrame.moInvariantAcrossSubjectPerson,
        sharedObjectSingleManifestation: lesson28Frame.sharedObjectFrame.objectPronounManifestationOccursOnEmbed,
        futureMatrices: lesson28Frame.futureEmbedFrame.matrices.map((entry) => entry.id),
        recursionAsEmbed: lesson28Frame.recursionFrame.compoundStemCanBecomeEmbedOfAnotherCompound,
    }, {
        formulas: [
            "VNC + VNC = compound VNC",
            "NNC + VNC = compound VNC",
            "NNC + NNC = compound NNC",
        ],
        matrixPosition: "after embed",
        embedNeverSubject: true,
        cohesivenessTypes: ["linked", "integrated"],
        valenceCombinations: ["ISTEM + ISTEM", "TSTEM + ISTEM", "ISTEM + TSTEM", "TSTEM + TSTEM"],
        connectiveMorphs: ["t", "ti"],
        connectivePatterns: ["intransitive-matrix", "intransitivized-reflexive-matrix", "shared-object"],
        intransitiveMatrixCount: 15,
        specialFormationIds: [
            "ca-h-as-embed",
            "ya-uh-as-embed",
            "cac-embed-only",
            "itta-blocked-as-embed",
            "hysteron-proteron",
            "connective-t-passive",
            "connective-t-impersonal",
        ],
        reflexiveMoInvariant: true,
        sharedObjectSingleManifestation: true,
        futureMatrices: ["tla-nequi", "tla-qui"],
        recursionAsEmbed: true,
    });
    s.eq("lesson 28 pursuit frame has LCM redirect contract", {
        routeFamily: lesson28Frame.frames.routeContract.routeFamily,
        routeStage: lesson28Frame.frames.routeContract.routeStage,
        generationAllowed: lesson28Frame.frames.routeContract.generationAllowed,
        unitKind: lesson28Frame.frames.unitFrame.unitKind,
        targetGenerationAllowed: lesson28Frame.frames.routeContract.targetContract.generationAllowed,
        orthographyStatus: lesson28Frame.frames.orthographyFrame.orthographyStatus,
        stemKind: lesson28Frame.frames.stemFrame.stemKind,
        intransitiveMatrixCount: lesson28Frame.frames.stemFrame.intransitiveMatrixCount,
    }, {
        routeFamily: "compound-verbstem",
        routeStage: "audit-lesson-28",
        generationAllowed: false,
        unitKind: "compound-verbstem-boundary",
        targetGenerationAllowed: false,
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        stemKind: "compound-verbstem",
        intransitiveMatrixCount: 15,
    });

    const lesson30Frame = ctx.buildLesson30NominalEmbedPursuitFrame();
    s.eq("lesson 30 pursuit frame covers every subsection", {
        stepNumber: lesson30Frame.stepNumber,
        pdfRefs: lesson30Frame.pdfRefs.length,
        subsectionSections: lesson30Frame.subsectionInventory.map((entry) => entry.andrewsSection),
        plannedArrowIds: lesson30Frame.plannedArrows.map((arrow) => arrow.id),
        firedArrowIds: lesson30Frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
        hitCount: lesson30Frame.hitCount,
        missCount: lesson30Frame.missCount,
        closestPass: lesson30Frame.closestPass,
        generationAllowed: lesson30Frame.generationAllowed,
    }, {
        stepNumber: 30,
        pdfRefs: 18,
        subsectionSections: [
            "30.1",
            "30.2",
            "30.3",
            "30.4",
            "30.5",
            "30.6",
            "30.7",
            "30.8",
            "30.9",
            "30.10",
            "30.11",
            "30.12",
            "30.13",
            "30.14",
            "30.15",
            "30.16",
            "30.17",
            "30.18",
        ],
        plannedArrowIds: ["lesson-30-nominal-embed-compound-audit"],
        firedArrowIds: [["lesson-30-nominal-embed-compound-audit", "hit"]],
        hitCount: 1,
        missCount: 0,
        closestPass: false,
        generationAllowed: false,
    });
    s.eq("lesson 30 pursuit frame records Andrews nominal-embed architecture", {
        formula: lesson30Frame.overviewFrame.sourceFormula,
        compoundStructure: lesson30Frame.overviewFrame.compoundStructure,
        filler: lesson30Frame.overviewFrame.nominalEmbedFiller,
        incorporatedTypes: lesson30Frame.overviewFrame.incorporatedNncTypes,
        valenceReduction: lesson30Frame.incorporatedObjectFrame.valenceReduction.map((entry) => [entry.sourceMatrix, entry.compoundValence, entry.objectPronounPermitted]),
        tlaFusionAdverbial: lesson30Frame.incorporatedObjectFrame.exceptionalTlaFusionFrame.becauseTlaAlreadyRepresentsFusedObjectTheNominalEmbedMustBeAdverbial,
        adverbValencePreserved: lesson30Frame.incorporatedAdverbFrame.compoundValenceRemainsMatrixValence,
        adverbRoles: lesson30Frame.adverbRoleFrame.roles.map((entry) => entry.role),
        supplementTransforms: lesson30Frame.supplementTransformFrame.transformTypes.map((entry) => entry.id),
        complementTypes: lesson30Frame.complementFrame.complementTypes.map((entry) => entry.id),
        reduplicatesBoth: lesson30Frame.redupNonactiveCaveatFrame.reduplication.bothEmbedAndMatrixCanBeReduplicated,
        singleObjectIncorporatedOnlyImpersonal: lesson30Frame.redupNonactiveCaveatFrame.nonactive.incorporatedObjectFromSingleObjectMatrixIsIntransitiveSoOnlyImpersonal,
        embedNotSubject: lesson30Frame.redupNonactiveCaveatFrame.caveats.embedDoesNotFunctionAsSubject,
        embedNotAgent: lesson30Frame.redupNonactiveCaveatFrame.caveats.embedDoesNotRepresentAgent,
    }, {
        formula: "NNC + VNC = compound VNC",
        compoundStructure: "integrated",
        filler: "general-use nounstem",
        incorporatedTypes: [
            "incorporated-object",
            "incorporated-adverb",
            "incorporated-complement",
        ],
        valenceReduction: [
            ["single-object VNC", "intransitive VNC", false],
            ["double-object VNC", "single-object VNC", true],
            ["triple-object VNC", "double-object VNC", true],
        ],
        tlaFusionAdverbial: true,
        adverbValencePreserved: true,
        adverbRoles: [
            "means-or-instrument",
            "place",
            "time-or-duration",
            "cause-or-purpose",
            "manner",
            "compared-manner",
            "unique-embed-nounstems",
        ],
        supplementTransforms: [
            "supplementary-subject-to-incorporated-adverb",
            "supplementary-object-to-incorporated-adverb",
            "passive-barrier-adverbialization",
        ],
        complementTypes: [
            "subject-complement",
            "object-complement-considering",
            "object-complement-changing",
        ],
        reduplicatesBoth: true,
        singleObjectIncorporatedOnlyImpersonal: true,
        embedNotSubject: true,
        embedNotAgent: true,
    });
    s.eq("lesson 30 pursuit frame has LCM redirect contract", {
        routeFamily: lesson30Frame.frames.routeContract.routeFamily,
        routeStage: lesson30Frame.frames.routeContract.routeStage,
        generationAllowed: lesson30Frame.frames.routeContract.generationAllowed,
        unitKind: lesson30Frame.frames.unitFrame.unitKind,
        targetGenerationAllowed: lesson30Frame.frames.routeContract.targetContract.generationAllowed,
        orthographyStatus: lesson30Frame.frames.orthographyFrame.orthographyStatus,
        stemKind: lesson30Frame.frames.stemFrame.stemKind,
        sourceFormula: lesson30Frame.frames.stemFrame.sourceFormula,
        compoundKind: lesson30Frame.frames.nuclearClauseFrame.compoundKind,
    }, {
        routeFamily: "compound-verbstem",
        routeStage: "audit-lesson-30",
        generationAllowed: false,
        unitKind: "compound-verbstem-boundary",
        targetGenerationAllowed: false,
        orthographyStatus: "orthography-bridge-plus-source-gate-required",
        stemKind: "compound-verbstem-with-nominal-embed",
        sourceFormula: "NNC + VNC = compound VNC",
        compoundKind: "NNC+VNC compound VNC",
    });

    return s;
}

module.exports = { run };
