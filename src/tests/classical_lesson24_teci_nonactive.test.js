"use strict";

const { createSuite } = require("./runner");

function jsonClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson24_teci_nonactive");

    s.eq(
        "Lesson 24.2 exposes a typed printed-surface finalizer over Lesson 20 records",
        [
            typeof ctx.buildClassicalNahuatlLesson242NonactiveSurfaceFrame,
            typeof ctx.isClassicalNahuatlLesson242NonactiveSurfaceFrame,
        ],
        ["function", "function"]
    );

    const intransitiveInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("teci", {
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const transitiveInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("teci", {
        verbClass: "B",
        sourceValence: "specific-projective",
    });
    s.eq(
        "The lower Lesson 20 analysis retains canonical quantity and boundaries",
        {
            intransitive: intransitiveInventory.options.map(option => [option.optionId, option.nonactiveStem, option.ruleId]),
            transitive: transitiveInventory.options.map(option => [option.optionId, option.nonactiveStem, option.ruleId]),
        },
        {
            intransitive: [["hua:tecī-hua", "tecī-hua", "cn-l20-5-teci"]],
            transitive: [
                ["ō:tex-ō", "tex-ō", "cn-l24-2-teci-transitive-o"],
                ["o-hua:tex-o-hua", "tex-o-hua", "cn-l24-2-teci-transitive-ohua"],
            ],
        }
    );

    const projectionFixtures = [
        ["intransitive", "hua:tecī-hua", "tecī-hua", "tecihua", "ī-to-i"],
        ["specific-projective", "ō:tex-ō", "tex-ō", "texo", "ō-to-o"],
        ["specific-projective", "o-hua:tex-o-hua", "tex-o-hua", "texohua", "none"],
    ];
    const projections = projectionFixtures.map(([sourceValence, optionId]) => (
        ctx.buildClassicalNahuatlLesson242NonactiveSurfaceFrame("teci", {
            verbClass: "B",
            sourceValence,
            optionId,
        })
    ));
    s.eq(
        "The higher Lesson 24.2 surface layer generates all three unsegmented printed words",
        projections.map(frame => ({
            status: frame.authorizationStatus,
            canonicalStem: frame.canonicalNonactiveStem,
            lowerStem: frame.lowerNonactiveStemRecord.nonactiveStem,
            printedWord: frame.printedSurfaceWord,
            quantityChange: frame.surfaceOperationFrame.quantityChange,
            canonical: ctx.isClassicalNahuatlLesson242NonactiveSurfaceFrame(frame, "teci"),
            gates: [frame.grammarGenerationAllowed, frame.surfaceGenerationAllowed],
            authority: [frame.callerSuppliedSurfaceAllowed, frame.targetStringAuthority, frame.surfaceStringAuthority],
        })),
        projectionFixtures.map(([, , canonicalStem, printedWord, quantityChange]) => ({
            status: "authorized",
            canonicalStem,
            lowerStem: canonicalStem,
            printedWord,
            quantityChange,
            canonical: true,
            gates: [false, true],
            authority: [false, false, false],
        }))
    );

    const forgedWord = jsonClone(projections[1]);
    forgedWord.printedSurfaceWord = "caller-forged";
    const forgedLowerRecord = jsonClone(projections[1]);
    forgedLowerRecord.lowerNonactiveStemRecord.nonactiveStem = "tex-o";
    const forgedVersion = jsonClone(projections[1]);
    forgedVersion.version = 999;
    const forgedPolicy = jsonClone(projections[1]);
    forgedPolicy.surfaceStringAuthority = true;
    const forgedGate = jsonClone(projections[1]);
    forgedGate.grammarGenerationAllowed = true;
    s.eq(
        "A printed result, lower-record mutation, version, policy, or gate cannot forge the Lesson 24.2 finalizer",
        [forgedWord, forgedLowerRecord, forgedVersion, forgedPolicy, forgedGate]
            .map(frame => ctx.isClassicalNahuatlLesson242NonactiveSurfaceFrame(frame, "teci")),
        [false, false, false, false, false]
    );

    s.eq(
        "The Lesson 24.2 projection remains bounded to typed teci Class B records",
        [
            ctx.buildClassicalNahuatlLesson242NonactiveSurfaceFrame("invented", {
                verbClass: "B",
                sourceValence: "intransitive",
            }),
            ctx.buildClassicalNahuatlLesson242NonactiveSurfaceFrame("teci", {
                verbClass: "A",
                sourceValence: "intransitive",
            }),
            ctx.buildClassicalNahuatlLesson242NonactiveSurfaceFrame("teci", {
                verbClass: "B",
                sourceValence: "",
            }),
        ].map(frame => [frame.authorizationStatus, frame.blockReason, frame.printedSurfaceWord]),
        [
            ["blocked", "lesson24.2-exact-teci-source-required", ""],
            ["blocked", "lesson24.2-class-b-source-analysis-required", ""],
            ["blocked", "lesson24.2-typed-source-valence-required", ""],
        ]
    );

    s.eq(
        "Short-o remains a higher printed-surface realization rather than a Lesson 20 suffix license",
        ctx.doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily(
            ctx.buildClassicalNahuatlLesson20StemFinalShapeFrame("tex-o"),
            "ō"
        ),
        false
    );

    return s;
}

module.exports = { run };
