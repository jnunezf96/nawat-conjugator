"use strict";

const { createSuite } = require("./runner");

function jsonClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_structural");

    s.eq(
        "Lesson 24 exposes typed stock, coalescence, and exact synonym generators",
        [
            typeof ctx.buildClassicalNahuatlLesson24StockFormationFrame,
            typeof ctx.isClassicalNahuatlLesson24StockFormationFrame,
            typeof ctx.buildClassicalNahuatlLesson24VowelCoalescenceFrame,
            typeof ctx.isClassicalNahuatlLesson24VowelCoalescenceFrame,
            typeof ctx.getClassicalNahuatlLesson24SynonymOptionInventory,
            typeof ctx.isClassicalNahuatlLesson24SynonymOptionInventory,
            typeof ctx.deriveClassicalNahuatlLesson24SynonymFrame,
            typeof ctx.isClassicalNahuatlLesson24SynonymFrame,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const stock = ctx.buildClassicalNahuatlLesson24StockFormationFrame({
        root: "patl",
        stockFormative: "ā",
    });
    const stem = ctx.buildClassicalNahuatlLesson24StockFormationFrame({
        root: "patl",
        stockFormative: "ā",
        stemFormative: "ni",
    });
    const poisonedStock = ctx.buildClassicalNahuatlLesson24StockFormationFrame({
        root: "patl",
        stockFormative: "ā",
        stemFormative: "ni",
        targetStem: "caller-forged-stock",
        surfaceArtifact: "caller-forged-surface",
    });
    s.eq(
        "A typed patl root first forms a stock and then a ni verbstem without target-string authority",
        {
            stock: [stock.authorizationStatus, stock.targetStem, stock.outputRank, stock.formationSteps.map(step => step.operation), ctx.isClassicalNahuatlLesson24StockFormationFrame(stock)],
            stem: [stem.authorizationStatus, stem.stockStem, stem.targetStem, stem.outputRank, stem.formationSteps.map(step => step.operation), ctx.isClassicalNahuatlLesson24StockFormationFrame(stem)],
            poisoned: [poisonedStock.targetStem, poisonedStock.requestedArtifactsDiscarded, ctx.isClassicalNahuatlLesson24StockFormationFrame(poisonedStock)],
            authority: [stem.outputGeneratedFromTypedSource, stem.callerSuppliedTargetAllowed, stem.targetStringAuthority, stem.surfaceStringAuthority],
        },
        {
            stock: ["authorized", "patl-ā-", "stock", ["add-stock-formative"], true],
            stem: ["authorized", "patl-ā-", "patl-ā-ni", "verbstem", ["add-stock-formative", "add-stem-formative"], true],
            poisoned: ["patl-ā-ni", true, true],
            authority: [true, false, false, false],
        }
    );

    s.eq(
        "The exact stock relation blocks missing and unlicensed source morphology",
        [
            ctx.buildClassicalNahuatlLesson24StockFormationFrame({ root: "", stockFormative: "ā" }),
            ctx.buildClassicalNahuatlLesson24StockFormationFrame({ root: "invented", stockFormative: "ā" }),
            ctx.buildClassicalNahuatlLesson24StockFormationFrame({ root: "patl", stockFormative: "ā", stemFormative: "hui" }),
        ].map(frame => [frame.authorizationStatus, frame.blockReason, frame.targetStem, ctx.isClassicalNahuatlLesson24StockFormationFrame(frame)]),
        [
            ["blocked", "lesson24-root-and-stock-formative-required", "", false],
            ["blocked", "lesson24-root-stock-relation-not-licensed", "", false],
            ["blocked", "lesson24-stem-formative-not-licensed-for-stock", "", false],
        ]
    );

    const coalescenceFixtures = [
        ["po", "ō", "ni", "pō-ni", "24.5.9"],
        ["to", "ō", "ni", "tō-ni", "24.5.9"],
        ["ce", "ē", "hua", "cē-hua", "24.6.2"],
        ["e", "ē", "hua", "ē-hua", "24.6.2"],
    ];
    s.eq(
        "Identical root-final and stock-formative vowels coalesce into one long vowel",
        coalescenceFixtures.map(([root, stockFormative, stemFormative]) => {
            const frame = ctx.buildClassicalNahuatlLesson24VowelCoalescenceFrame({ root, stockFormative, stemFormative });
            return {
                source: frame.uncoalescedStem,
                target: frame.targetStem,
                section: frame.andrewsSection,
                vowels: [frame.coalescenceOperationFrame.leftVowel, frame.coalescenceOperationFrame.rightVowel, frame.coalescenceOperationFrame.outputVowel],
                canonical: ctx.isClassicalNahuatlLesson24VowelCoalescenceFrame(frame),
            };
        }),
        coalescenceFixtures.map(([root, stockFormative, stemFormative, target, section]) => ({
            source: `${root}-${stockFormative}-${stemFormative}`,
            target,
            section,
            vowels: [root.slice(-1), stockFormative, stockFormative],
            canonical: true,
        }))
    );

    const mismatchedVowels = ctx.buildClassicalNahuatlLesson24VowelCoalescenceFrame({
        root: "pa",
        stockFormative: "ō",
        stemFormative: "ni",
    });
    const unlicensedFormatives = ctx.buildClassicalNahuatlLesson24VowelCoalescenceFrame({
        root: "pi",
        stockFormative: "ī",
        stemFormative: "ni",
    });
    const poisonedCoalescence = ctx.buildClassicalNahuatlLesson24VowelCoalescenceFrame({
        root: "po",
        stockFormative: "ō",
        stemFormative: "ni",
        targetStem: "caller-forged-coalescence",
    });
    s.eq(
        "Coalescence requires a licensed formative profile and identical vowel quality",
        {
            mismatch: [mismatchedVowels.authorizationStatus, mismatchedVowels.blockReason, mismatchedVowels.targetStem],
            unlicensed: [unlicensedFormatives.authorizationStatus, unlicensedFormatives.blockReason, unlicensedFormatives.targetStem],
            poisoned: [poisonedCoalescence.targetStem, poisonedCoalescence.requestedArtifactsDiscarded, ctx.isClassicalNahuatlLesson24VowelCoalescenceFrame(poisonedCoalescence)],
        },
        {
            mismatch: ["blocked", "lesson24-root-final-and-stock-formative-vowels-not-identical", ""],
            unlicensed: ["blocked", "lesson24-stock-stem-formative-profile-not-licensed", ""],
            poisoned: ["pō-ni", true, true],
        }
    );

    const synonymFixtures = [
        ["tep-ē-hua", "cn-l24-6-3-tep-ehua-ehui", "tep-ē-hui"],
        ["tōy-ā-hua", "cn-l24-6-3-toy-ahua-ahui", "tōy-ā-hui"],
    ];
    s.eq(
        "The two exact Lesson 24.6.3 synonym routes generate only their engine-owned targets",
        synonymFixtures.map(([sourceStem, optionId]) => {
            const inventory = ctx.getClassicalNahuatlLesson24SynonymOptionInventory(sourceStem);
            const frame = ctx.deriveClassicalNahuatlLesson24SynonymFrame(sourceStem, {
                optionId,
                targetStem: "caller-forged-synonym",
            });
            return {
                inventory: [inventory.authorizationStatus, inventory.options.map(option => [option.optionId, option.targetStem]), ctx.isClassicalNahuatlLesson24SynonymOptionInventory(inventory)],
                frame: [frame.authorizationStatus, frame.sourceStem, frame.targetStem, frame.requestedArtifactsDiscarded, ctx.isClassicalNahuatlLesson24SynonymFrame(frame)],
            };
        }),
        synonymFixtures.map(([sourceStem, optionId, targetStem]) => ({
            inventory: ["authorized", [[optionId, targetStem]], true],
            frame: ["authorized", sourceStem, targetStem, true, true],
        }))
    );

    const boundaryFreeInventory = ctx.getClassicalNahuatlLesson24SynonymOptionInventory("tepēhua");
    const boundaryFreeFrame = ctx.deriveClassicalNahuatlLesson24SynonymFrame("tepēhua", {
        optionId: "cn-l24-6-3-tep-ehua-ehui",
    });
    const missingOption = ctx.deriveClassicalNahuatlLesson24SynonymFrame("tep-ē-hua");
    const unknownSource = ctx.getClassicalNahuatlLesson24SynonymOptionInventory("invented-hua");
    s.eq(
        "Boundary-free source spelling may resolve an exact synonym, but source and option authority remain required",
        {
            boundaryFree: [boundaryFreeInventory.canonicalSourceStem, boundaryFreeInventory.boundaryInsensitiveMatch, boundaryFreeFrame.targetStem, ctx.isClassicalNahuatlLesson24SynonymFrame(boundaryFreeFrame)],
            missingOption: [missingOption.authorizationStatus, missingOption.blockReason, missingOption.targetStem],
            unknownSource: [unknownSource.authorizationStatus, unknownSource.blockReason, unknownSource.options.length],
        },
        {
            boundaryFree: ["tep-ē-hua", true, "tep-ē-hui", true],
            missingOption: ["blocked", "lesson24-synonym-option-selection-required", ""],
            unknownSource: ["blocked", "lesson24-synonym-source-not-attested", 0],
        }
    );

    const forgedStock = jsonClone(stem);
    forgedStock.targetStem = "forged";
    const forgedStockRole = jsonClone(stem);
    forgedStockRole.sourceMorphologyFrame.stockFormative.role = "target-string";
    const forgedCoalescence = jsonClone(poisonedCoalescence);
    forgedCoalescence.coalescenceOperationFrame.outputVowel = "a";
    const canonicalSynonym = ctx.deriveClassicalNahuatlLesson24SynonymFrame("tep-ē-hua", {
        optionId: "cn-l24-6-3-tep-ehua-ehui",
    });
    const forgedSynonym = jsonClone(canonicalSynonym);
    forgedSynonym.targetStem = "forged";
    const forgedSynonymInventory = jsonClone(canonicalSynonym);
    forgedSynonymInventory.optionInventory.options[0].targetStem = "forged";
    s.eq(
        "Forged structural outputs cannot pass canonical Lesson 24 validation",
        [
            ctx.isClassicalNahuatlLesson24StockFormationFrame(forgedStock),
            ctx.isClassicalNahuatlLesson24StockFormationFrame(forgedStockRole),
            ctx.isClassicalNahuatlLesson24VowelCoalescenceFrame(forgedCoalescence),
            ctx.isClassicalNahuatlLesson24SynonymFrame(forgedSynonym),
            ctx.isClassicalNahuatlLesson24SynonymFrame(forgedSynonymInventory),
        ],
        [false, false, false, false, false]
    );

    const stockVersion = jsonClone(stem);
    stockVersion.version = 999;
    const stockGrammarGate = jsonClone(stem);
    stockGrammarGate.grammarGenerationAllowed = false;
    const stockSurfaceGate = jsonClone(stem);
    stockSurfaceGate.surfaceGenerationAllowed = true;
    const stockProvenance = jsonClone(stem);
    stockProvenance.sourceDocument = "caller-document";
    const stockPolicy = jsonClone(stem);
    stockPolicy.targetStringAuthority = true;

    const canonicalCoalescence = ctx.buildClassicalNahuatlLesson24VowelCoalescenceFrame({
        root: "po",
        stockFormative: "ō",
        stemFormative: "ni",
    });
    const coalescenceVersion = jsonClone(canonicalCoalescence);
    coalescenceVersion.version = 999;
    const coalescenceGrammarGate = jsonClone(canonicalCoalescence);
    coalescenceGrammarGate.grammarGenerationAllowed = false;
    const coalescenceSurfaceGate = jsonClone(canonicalCoalescence);
    coalescenceSurfaceGate.surfaceGenerationAllowed = true;
    const coalescenceProvenance = jsonClone(canonicalCoalescence);
    coalescenceProvenance.sourceAuthority = "caller-authority";
    const coalescencePolicy = jsonClone(canonicalCoalescence);
    coalescencePolicy.surfaceStringAuthority = true;

    const canonicalSynonymInventory = ctx.getClassicalNahuatlLesson24SynonymOptionInventory("tep-ē-hua");
    const synonymInventoryVersion = jsonClone(canonicalSynonymInventory);
    synonymInventoryVersion.version = 999;
    const synonymInventoryProvenance = jsonClone(canonicalSynonymInventory);
    synonymInventoryProvenance.sourceDocument = "caller-document";
    const synonymInventoryPolicy = jsonClone(canonicalSynonymInventory);
    synonymInventoryPolicy.targetStringAuthority = true;

    const synonymVersion = jsonClone(canonicalSynonym);
    synonymVersion.version = 999;
    const synonymGrammarGate = jsonClone(canonicalSynonym);
    synonymGrammarGate.grammarGenerationAllowed = false;
    const synonymSurfaceGate = jsonClone(canonicalSynonym);
    synonymSurfaceGate.surfaceGenerationAllowed = true;
    const synonymProvenance = jsonClone(canonicalSynonym);
    synonymProvenance.sourceAuthority = "caller-authority";
    const synonymPolicy = jsonClone(canonicalSynonym);
    synonymPolicy.targetStringAuthority = true;
    s.eq(
        "Lesson 24 structural validators rebuild version, gates, provenance, and authority policy",
        {
            stock: [stockVersion, stockGrammarGate, stockSurfaceGate, stockProvenance, stockPolicy]
                .map(frame => ctx.isClassicalNahuatlLesson24StockFormationFrame(frame)),
            coalescence: [coalescenceVersion, coalescenceGrammarGate, coalescenceSurfaceGate, coalescenceProvenance, coalescencePolicy]
                .map(frame => ctx.isClassicalNahuatlLesson24VowelCoalescenceFrame(frame)),
            inventory: [synonymInventoryVersion, synonymInventoryProvenance, synonymInventoryPolicy]
                .map(frame => ctx.isClassicalNahuatlLesson24SynonymOptionInventory(frame)),
            synonym: [synonymVersion, synonymGrammarGate, synonymSurfaceGate, synonymProvenance, synonymPolicy]
                .map(frame => ctx.isClassicalNahuatlLesson24SynonymFrame(frame)),
        },
        {
            stock: [false, false, false, false, false],
            coalescence: [false, false, false, false, false],
            inventory: [false, false, false],
            synonym: [false, false, false, false, false],
        }
    );

    return s;
}

module.exports = { run };
