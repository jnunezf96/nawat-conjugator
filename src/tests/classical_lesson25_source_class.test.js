"use strict";

const { createSuite } = require("./runner");

function buildSource(ctx, stem, sourceValence, verbClass = "A") {
    const objectKind = sourceValence === "intransitive" ? "none" : "specific-projective";
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        requestedSourceValence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson: sourceValence === "intransitive" ? "" : "3sg",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_source_class");

    s.eq(
        "Exact Lesson 25 overlays consume the Class A sources required by Lesson 7",
        [
            ["iuc-ci", "intransitive", "iuc-xi-tiā"],
            ["ihza", "intransitive", "ihxi-tiā"],
            ["itta", "specific-projective", "itt-ī-tiā"],
            ["itqui", "specific-projective", "itqui-tiā"],
            ["maca", "specific-projective", "maqui-l-tiā"],
            ["ī", "specific-projective", "ī-tiā"],
            ["hue-tz-ca", "intransitive", "hue-tz-qui-tia"],
            ["hue-tz-ca", "specific-projective", "hue-tz-qui-tiā"],
            ["temō", "intransitive", "temō-huiā"],
        ].map(([stem, sourceValence, targetStem]) => {
            const source = buildSource(ctx, stem, sourceValence);
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                derivationType: "causative",
            });
            return {
                stem,
                sourceStatus: source.authorizationStatus,
                classId: source.classId,
                guidelineRule: source.classRuleFrame?.classGuidelineRuleId,
                allowedClasses: source.classRuleFrame?.classGuidelineAllowedClassIds,
                inventoryStatus: inventory.authorizationStatus,
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                targetGenerated: inventory.options.some(option => option.targetStem === targetStem),
            };
        }),
        [
            {
                stem: "iuc-ci",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-762-final-vowel-after-cluster-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "ihza",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-762-final-vowel-after-cluster-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "itta",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-762-final-vowel-after-cluster-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "itqui",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-762-final-vowel-after-cluster-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "maca",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-763-final-ka-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "ī",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-761-monosyllabic-long-a-d",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "hue-tz-ca",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-762-final-vowel-after-cluster-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "hue-tz-ca",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-762-final-vowel-after-cluster-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
            {
                stem: "temō",
                sourceStatus: "authorized",
                classId: "A",
                guidelineRule: "cn-l7-767-final-o-a",
                allowedClasses: ["A"],
                inventoryStatus: "authorized",
                inventoryCanonical: true,
                targetGenerated: true,
            },
        ]
    );

    s.eq(
        "Exact Class A sources and an invented lookalike cannot be laundered through Class B",
        [
            ["iuc-ci", "intransitive"],
            ["ihza", "intransitive"],
            ["itta", "specific-projective"],
            ["itqui", "specific-projective"],
            ["maca", "specific-projective"],
            ["ī", "specific-projective"],
            ["hue-tz-ca", "intransitive"],
            ["hue-tz-ca", "specific-projective"],
            ["temō", "intransitive"],
            ["invented-tta", "intransitive"],
        ].map(([stem, sourceValence]) => {
            const hostile = buildSource(ctx, stem, sourceValence, "B");
            return {
                stem,
                status: hostile.authorizationStatus,
                reason: hostile.blockReason,
                classId: hostile.classId,
                allowedClasses: hostile.classRuleFrame?.classGuidelineAllowedClassIds,
            };
        }),
        ["iuc-ci", "ihza", "itta", "itqui", "maca", "ī", "hue-tz-ca", "hue-tz-ca", "temō", "invented-tta"].map(stem => ({
            stem,
            status: "blocked",
            reason: "classical-vnc-proof-not-authorized",
            classId: "B",
            allowedClasses: ["A"],
        }))
    );

    return s;
}

module.exports = { run };
