"use strict";

const { createSuite } = require("./runner");

function jsonClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function buildMatiPassiveSource(ctx, tense = "present") {
    const active = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mati", {
        subject: "3sg",
        mood: "indicative",
        tense,
        verbClass: "B",
        perfectiveClass: "B",
        valence: "specific-projective",
        requestedSourceValence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const nonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mati", {
        verbClass: "B",
        sourceValence: "specific-projective",
        optionId: "ō:mach-ō",
    });
    return ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactive,
        sourceValence: "specific-projective",
        sourceSubject: "3sg",
        sourceObjectPerson: "3sg",
        mood: "indicative",
        tense,
        verbClass: "B",
    });
}

function deriveMatiCausative(ctx, source, {
    tense = "present",
    realization = "",
} = {}) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === "mach-tiā");
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option?.optionId || "missing-mach-tiā",
        targetSubject: "3sg",
        causativeSpecificShuntlineRealization: realization,
    });
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense,
        targetSubject: "3sg",
    });
    return { inventory, option, operation, machinery };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_specific_shuntline");
    const source = buildMatiPassiveSource(ctx);

    s.eq(
        "Lesson 25.3 exposes silent and sounded specific-shuntline realizations as typed choices",
        ["silent", "sounded"].map(realization => {
            const derived = deriveMatiCausative(ctx, source, { realization });
            return {
                realization,
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                operation: [derived.operation.authorizationStatus, ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operation)],
                machinery: [derived.machinery.authorizationStatus, ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machinery)],
                formula: derived.machinery.formulaRealization,
                positions: derived.machinery.targetObjectClusterFrame?.positions.map(position => [
                    position.objectId,
                    position.prominence,
                    position.carrier,
                    position.sounded,
                ]),
            };
        }),
        [
            {
                realization: "silent",
                sourceCanonical: true,
                operation: ["authorized", true],
                machinery: ["authorized", true],
                formula: "#0-0+0-0+te(mach-tia)0+0-0#",
                positions: [
                    ["source-object-1", "shuntline", "0-0", false],
                    ["causative-object", "mainline", "te", true],
                ],
            },
            {
                realization: "sounded",
                sourceCanonical: true,
                operation: ["authorized", true],
                machinery: ["authorized", true],
                formula: "#0-0+qui-0+te(mach-tia)0+0-0#",
                positions: [
                    ["source-object-1", "shuntline", "qui-0", true],
                    ["causative-object", "mainline", "te", true],
                ],
            },
        ]
    );

    s.eq(
        "The sounded choice survives the imperfect environment used by Quitēmachtiāya",
        (() => {
            const imperfectSource = buildMatiPassiveSource(ctx, "imperfect");
            const derived = deriveMatiCausative(ctx, imperfectSource, {
                tense: "imperfect",
                realization: "sounded",
            });
            return {
                canonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machinery),
                formula: derived.machinery.formulaRealization,
                semanticIdentity: derived.machinery.finalTypedVncSlotFrame?.semanticIdentity,
            };
        })(),
        {
            canonical: true,
            formula: "#0-0+qui-0+te(mach-tiā)ya+0-0#",
            semanticIdentity: "0|0|qui-0|te|mach-tiā|ya|0|0",
        }
    );

    s.eq(
        "Omitting an eligible choice normalizes to Andrews' silent general practice",
        (() => {
            const derived = deriveMatiCausative(ctx, source);
            return {
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operation),
                selected: derived.operation.participantTransformFrame.causativeSpecificShuntlineRealization,
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machinery),
                formula: derived.machinery.formulaRealization,
                ruleSelection: derived.machinery.targetObjectClusterFrame?.causativeSpecificShuntlineRuleFrame?.selectedRealization,
            };
        })(),
        {
            operationCanonical: true,
            selected: "silent",
            machineryCanonical: true,
            formula: "#0-0+0-0+te(mach-tia)0+0-0#",
            ruleSelection: "silent",
        }
    );

    s.eq(
        "Unknown or inapplicable shuntline choices fail before target generation",
        (() => {
            const invalid = deriveMatiCausative(ctx, source, { realization: "caller-invented" });
            const active = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mati", {
                subject: "1pl",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "intransitive",
                requestedSourceValence: "intransitive",
                transitivity: "intransitive",
                objectKind: "none",
            });
            const activeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(active, { derivationType: "causative" });
            const activeOption = activeInventory.options.find(candidate => candidate.targetStem === "mach-tiā");
            const inapplicable = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(active, {
                derivationType: "causative",
                optionId: activeOption?.optionId || "missing-mach-tiā",
                targetSubject: "3sg",
                causativeSpecificShuntlineRealization: "silent",
            });
            return {
                invalid: [invalid.operation.authorizationStatus, invalid.operation.blockReason],
                inapplicable: [inapplicable.authorizationStatus, inapplicable.blockReason],
            };
        })(),
        {
            invalid: ["blocked", "classical-vnc-causative-specific-shuntline-realization-not-recognized"],
            inapplicable: ["blocked", "classical-vnc-causative-specific-shuntline-realization-not-applicable"],
        }
    );

    s.eq(
        "Lesson 23 rebuild validation protects number, version, policy, gates, provenance, and linear evidence",
        (() => {
            const lower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("maca", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                requestedSourceValence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "2sg",
            });
            const lowerTyped = lower.proofFrame?.conclusion?.finalTypedVncSlotFrame
                || lower.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
            const cluster = ctx.buildClassicalNahuatlLesson23ObjectClusterFrame("maca", {
                subject: "3sg",
                subjectCarrier: lowerTyped.slots.subject.pers1,
                predicateStem: lowerTyped.slots.predicate.stem,
                tense: "future",
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "2sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "applicative", derivationalLevel: 2 },
                ],
                minimumPositionCount: 2,
                maximumPositionCount: 2,
            });
            const forgedNumber = jsonClone(cluster);
            forgedNumber.numberDyadOverride = { num1: "FORGED1", num2: "FORGED2", rule: "forged" };
            const forgedVersion = jsonClone(cluster);
            forgedVersion.version = 999;
            const forgedPolicy = jsonClone(cluster);
            forgedPolicy.formulaArtifactAuthority = true;
            const forgedGrammarGate = jsonClone(cluster);
            forgedGrammarGate.grammarGenerationAllowed = true;
            const forgedSurfaceGate = jsonClone(cluster);
            forgedSurfaceGate.surfaceGenerationAllowed = true;
            const forgedProvenance = jsonClone(cluster);
            forgedProvenance.sourceDocument = "caller-document";
            const forgedLinearOrder = jsonClone(cluster);
            forgedLinearOrder.linearOrder.reverse();
            const forgedOrderingRule = jsonClone(cluster);
            forgedOrderingRule.orderingRules[0] = "caller-order";
            return {
                canonical: [
                    cluster.authorizationStatus,
                    ctx.isClassicalNahuatlLesson23ObjectClusterFrame(cluster, "maca"),
                    cluster.numberDyadOverride,
                    ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lower, cluster)?.authorizationStatus || "blocked",
                ],
                forgedValidators: [
                    forgedNumber,
                    forgedVersion,
                    forgedPolicy,
                    forgedGrammarGate,
                    forgedSurfaceGate,
                    forgedProvenance,
                    forgedLinearOrder,
                    forgedOrderingRule,
                ].map(frame => ctx.isClassicalNahuatlLesson23ObjectClusterFrame(frame, "maca")),
                forgedNumberApplies: Boolean(ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lower, forgedNumber)),
            };
        })(),
        {
            canonical: [
                "authorized",
                true,
                { num1: "0", num2: "0", rule: "lesson23-canvas-future-specific-cooccurrence-zero-number" },
                "authorized",
            ],
            forgedValidators: [false, false, false, false, false, false, false, false],
            forgedNumberApplies: false,
        }
    );

    s.eq(
        "A direct Lesson 23 cluster cannot cross a coincident-carrier semantic subject or tense boundary",
        (() => {
            const lower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("maca", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                requestedSourceValence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const lowerTyped = lower.proofFrame?.conclusion?.finalTypedVncSlotFrame
                || lower.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
            const cluster = ctx.buildClassicalNahuatlLesson23ObjectClusterFrame("maca", {
                subject: "3sg",
                subjectCarrier: lowerTyped.slots.subject.pers1,
                predicateStem: lowerTyped.slots.predicate.stem,
                tense: "future",
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const wrongSemanticSubject = jsonClone(lower);
            wrongSemanticSubject.priorVncFrame.subject = "3pl";
            const wrongSemanticTense = jsonClone(lower);
            wrongSemanticTense.priorVncFrame.tense = "preterit";
            return {
                sameTypedSubjectCarrier: [
                    wrongSemanticSubject.proofFrame.conclusion.finalTypedVncSlotFrame.slots.subject.pers1,
                    lowerTyped.slots.subject.pers1,
                ],
                sameTypedTenseCarrier: [
                    wrongSemanticTense.proofFrame.conclusion.finalTypedVncSlotFrame.slots.predicate.tns,
                    lowerTyped.slots.predicate.tns,
                ],
                canonicalApplies: ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lower, cluster)?.authorizationStatus || "blocked",
                wrongSubjectApplies: Boolean(ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(wrongSemanticSubject, cluster)),
                wrongTenseApplies: Boolean(ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(wrongSemanticTense, cluster)),
            };
        })(),
        {
            sameTypedSubjectCarrier: ["0", "0"],
            sameTypedTenseCarrier: ["z", "z"],
            canonicalApplies: "authorized",
            wrongSubjectApplies: false,
            wrongTenseApplies: false,
        }
    );

    return s;
}

module.exports = { run };
