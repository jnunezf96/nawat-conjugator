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
    }, {
        grammarFrameEnumerable: false,
        routeFamily: "compound-verbstem",
        routeStage: "parse-compound-ast",
        generationAllowed: false,
        unitKind: "compound-verbstem-boundary",
        embedBeforeMatrix: true,
        noClassicalSurfaceImport: true,
    });

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
        orthographyStatus: "nawat-evidence-required",
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
        orthographyStatus: "nawat-evidence-required",
        stemKind: "compound-verbstem-with-nominal-embed",
        sourceFormula: "NNC + VNC = compound VNC",
        compoundKind: "NNC+VNC compound VNC",
    });

    return s;
}

module.exports = { run };
