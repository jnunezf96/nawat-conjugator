"use strict";

const { createSuite } = require("./runner");

function jsonClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function buildActiveSource(ctx, {
    subject = "3sg",
    sourceValence = "specific-projective",
    objectPerson = "3sg",
} = {}) {
    const objectKind = {
        "specific-projective": "specific-projective",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
    }[sourceValence] || "none";
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("chihua", {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        perfectiveClass: "A",
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson: sourceValence === "specific-projective" ? objectPerson : "",
    });
}

function buildVoiceSource(ctx, activeMachineryFrame, {
    voice,
    sourceValence,
    sourceObjectPerson = "",
} = {}) {
    const nonactiveStemRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("chihua", {
        verbClass: "A",
        sourceValence,
    });
    const sourceMachineryFrame = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, {
        voice,
        nonactiveStemRecord,
        sourceValence,
        sourceSubject: "3sg",
        sourceObjectPerson,
        mood: "indicative",
        tense: "present",
        verbClass: "A",
    });
    return { nonactiveStemRecord, sourceMachineryFrame };
}

function deriveCausative(ctx, sourceMachineryFrame, targetSubject = "2sg", causativeSpecificShuntlineRealization = "") {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, {
        derivationType: "causative",
    });
    const selectedOption = inventory.options.find(option => option.targetStem === "chīhua-l-tiā");
    const operationFrame = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, {
        derivationType: "causative",
        optionId: selectedOption?.optionId || "missing-chihua-l-tia-option",
        targetSubject,
        causativeSpecificShuntlineRealization,
    });
    const machineryFrame = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, {
        mood: "indicative",
        tense: "present",
        targetSubject,
    });
    return { inventory, selectedOption, operationFrame, machineryFrame };
}

function buildIntransitiveSource(ctx, stem, {
    subject = "3sg",
    verbClass = "B",
} = {}) {
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "none",
    });
}

function buildIntransitiveImpersonalSource(ctx, stem, {
    subject = "3sg",
    verbClass = "B",
} = {}) {
    const activeMachineryFrame = buildIntransitiveSource(ctx, stem, { subject, verbClass });
    const nonactiveStemRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord(stem, {
        verbClass,
        sourceValence: "intransitive",
    });
    const sourceMachineryFrame = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(activeMachineryFrame, {
        voice: "impersonal",
        nonactiveStemRecord,
        sourceValence: "intransitive",
        sourceSubject: subject,
        mood: "indicative",
        tense: "present",
        verbClass,
    });
    return { activeMachineryFrame, nonactiveStemRecord, sourceMachineryFrame };
}

function deriveCausativeTarget(ctx, sourceMachineryFrame, targetStem, targetSubject = "1sg", causativeSpecificShuntlineRealization = "") {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, {
        derivationType: "causative",
    });
    const selectedOption = inventory.options.find(option => option.targetStem === targetStem);
    const operationFrame = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, {
        derivationType: "causative",
        optionId: selectedOption?.optionId || `missing-${targetStem}-option`,
        targetSubject,
        causativeSpecificShuntlineRealization,
    });
    const machineryFrame = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, {
        mood: "indicative",
        tense: "present",
        targetSubject,
    });
    return { inventory, selectedOption, operationFrame, machineryFrame };
}

function summarizeHostileSource(ctx, sourceMachineryFrame) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, {
        derivationType: "causative",
    });
    return {
        sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(sourceMachineryFrame),
        inventoryStatus: inventory.authorizationStatus,
        inventoryReason: inventory.blockReason,
        optionCount: inventory.options.length,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons24_25_source_voice");

    const passiveActive = buildActiveSource(ctx);
    const passive = buildVoiceSource(ctx, passiveActive, {
        voice: "passive",
        sourceValence: "specific-projective",
        sourceObjectPerson: "3sg",
    });
    const impersonalActive = buildActiveSource(ctx, {
        sourceValence: "projective-nonhuman",
        objectPerson: "",
    });
    const impersonal = buildVoiceSource(ctx, impersonalActive, {
        voice: "impersonal",
        sourceValence: "projective-nonhuman",
    });

    s.eq(
        "Lessons 20-22 passive and impersonal outputs are canonical typed derivation sources",
        {
            active: {
                status: passiveActive.authorizationStatus,
                canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(passiveActive),
            },
            passive: {
                status: passive.sourceMachineryFrame.authorizationStatus,
                kind: passive.sourceMachineryFrame.kind,
                voice: passive.sourceMachineryFrame.voice,
                formula: passive.sourceMachineryFrame.formulaRealization,
                canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(passive.sourceMachineryFrame),
            },
            impersonal: {
                status: impersonal.sourceMachineryFrame.authorizationStatus,
                kind: impersonal.sourceMachineryFrame.kind,
                voice: impersonal.sourceMachineryFrame.voice,
                formula: impersonal.sourceMachineryFrame.formulaRealization,
                canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(impersonal.sourceMachineryFrame),
            },
        },
        {
            active: { status: "authorized", canonical: true },
            passive: {
                status: "authorized",
                kind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
                voice: "passive",
                formula: "#0-0(chīhua-lo)0+0-0#",
                canonical: true,
            },
            impersonal: {
                status: "authorized",
                kind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
                voice: "impersonal",
                formula: "#0-0+tla(chīhua-lo)0+0-0#",
                canonical: true,
            },
        }
    );

    s.eq(
        "Causative formation reads the active chihua stem through either source voice",
        (() => {
            const passiveInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(passive.sourceMachineryFrame, {
                derivationType: "causative",
            });
            const impersonalInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(impersonal.sourceMachineryFrame, {
                derivationType: "causative",
            });
            const summarize = inventory => ({
                status: inventory.authorizationStatus,
                canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                sourceStem: inventory.sourceStem,
                sourceVoice: inventory.sourceAnalysisFrame?.sourceVoice || "",
                formationStem: inventory.sourceAnalysisFrame?.lexicalStem || "",
                targets: inventory.options.map(option => option.targetStem),
            });
            return {
                passive: summarize(passiveInventory),
                impersonal: summarize(impersonalInventory),
            };
        })(),
        {
            passive: {
                status: "authorized",
                canonical: true,
                sourceStem: "chihua",
                sourceVoice: "passive",
                formationStem: "chihua",
                targets: ["chīhua-l-tiā"],
            },
            impersonal: {
                status: "authorized",
                canonical: true,
                sourceStem: "chihua",
                sourceVoice: "impersonal",
                formationStem: "chihua",
                targets: ["chīhua-l-tiā"],
            },
        }
    );

    s.eq(
        "Canvas 25.11 passive chihualo imports te while retaining its promoted patient",
        (() => {
            const derived = deriveCausative(ctx, passive.sourceMachineryFrame, "2sg", "sounded");
            const participants = derived.operationFrame.participantTransformFrame || {};
            return {
                operationStatus: derived.operationFrame.authorizationStatus,
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operationFrame),
                sourceVoice: participants.sourceVoice,
                participantSurfaceSubject: participants.participantSurfaceSubject,
                promotedObjectPerson: participants.promotedSourceObjectRequest?.objectPerson || "",
                implicitAgentBecomesCausativeObject: participants.implicitAgentBecomesCausativeObject,
                passivePromotedSubjectRetainedAsObject: participants.passivePromotedSubjectRetainedAsObject,
                targetObjects: participants.targetObjectRequests.map(request => [request.objectKind, request.objectPerson, request.governor]),
                machineryStatus: derived.machineryFrame.authorizationStatus,
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machineryFrame),
                formula: derived.machineryFrame.formulaRealization,
            };
        })(),
        {
            operationStatus: "authorized",
            operationCanonical: true,
            sourceVoice: "passive",
            participantSurfaceSubject: "3sg",
            promotedObjectPerson: "3sg",
            implicitAgentBecomesCausativeObject: true,
            passivePromotedSubjectRetainedAsObject: true,
            targetObjects: [
                ["specific-projective", "3sg", "directive"],
                ["nonspecific-human", "", "causative"],
            ],
            machineryStatus: "authorized",
            machineryCanonical: true,
            formula: "#ti-0+c-0+te(chīhua-l-tia)0+0-0#",
        }
    );

    s.eq(
        "Canvas 25.11 impersonal tlachihualo discards its empty subject and retains tla beside imported te",
        (() => {
            const derived = deriveCausative(ctx, impersonal.sourceMachineryFrame);
            const participants = derived.operationFrame.participantTransformFrame || {};
            return {
                operationStatus: derived.operationFrame.authorizationStatus,
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operationFrame),
                sourceVoice: participants.sourceVoice,
                referentiallyEmptySourceSubjectDiscarded: participants.referentiallyEmptySourceSubjectDiscarded,
                implicitAgentBecomesCausativeObject: participants.implicitAgentBecomesCausativeObject,
                targetObjects: participants.targetObjectRequests.map(request => [request.objectKind, request.governor]),
                machineryStatus: derived.machineryFrame.authorizationStatus,
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machineryFrame),
                formula: derived.machineryFrame.formulaRealization,
            };
        })(),
        {
            operationStatus: "authorized",
            operationCanonical: true,
            sourceVoice: "impersonal",
            referentiallyEmptySourceSubjectDiscarded: true,
            implicitAgentBecomesCausativeObject: true,
            targetObjects: [
                ["nonspecific-nonhuman", "directive"],
                ["nonspecific-human", "causative"],
            ],
            machineryStatus: "authorized",
            machineryCanonical: true,
            formula: "#ti-0+te+tla(chīhua-l-tia)0+0-0#",
        }
    );

    s.eq(
        "A retained first-person passive patient becomes reflexive when coreferential with the causative subject",
        (() => {
            const active = buildActiveSource(ctx, { objectPerson: "1sg" });
            const source = buildVoiceSource(ctx, active, {
                voice: "passive",
                sourceValence: "specific-projective",
                sourceObjectPerson: "1sg",
            }).sourceMachineryFrame;
            const derived = deriveCausative(ctx, source, "1sg");
            const participants = derived.operationFrame.participantTransformFrame || {};
            return {
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                promotedObjectPerson: participants.promotedSourceObjectRequest?.objectPerson || "",
                retainedObjects: participants.retainedTargetObjectRequests.map(request => [request.objectKind, request.objectPerson]),
                targetObjects: participants.targetObjectRequests.map(request => [request.objectKind, request.objectPerson]),
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operationFrame),
                formula: derived.machineryFrame.formulaRealization,
            };
        })(),
        {
            sourceCanonical: true,
            promotedObjectPerson: "1sg",
            retainedObjects: [["reflexive", "1sg"]],
            targetObjects: [["reflexive", "1sg"], ["nonspecific-human", ""]],
            operationCanonical: true,
            formula: "#ni-0+n-o+te(chīhua-l-tia)0+0-0#",
        }
    );

    s.eq(
        "The established active-source participant transformation remains canonical",
        (() => {
            const active = buildActiveSource(ctx, { subject: "1sg", objectPerson: "3sg" });
            const derived = deriveCausative(ctx, active, "2sg");
            const participants = derived.operationFrame.participantTransformFrame || {};
            return {
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(active),
                sourceVoice: participants.sourceVoice,
                sourceSubjectBecomesCausativeObject: participants.sourceSubjectBecomesCausativeObject,
                implicitAgentBecomesCausativeObject: participants.implicitAgentBecomesCausativeObject,
                addedObject: [participants.addedObjectRequest?.objectKind || "", participants.addedObjectRequest?.objectPerson || ""],
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operationFrame),
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machineryFrame),
                formula: derived.machineryFrame.formulaRealization,
            };
        })(),
        {
            sourceCanonical: true,
            sourceVoice: "active",
            sourceSubjectBecomesCausativeObject: true,
            implicitAgentBecomesCausativeObject: false,
            addedObject: ["specific-projective", "1sg"],
            operationCanonical: true,
            machineryCanonical: true,
            formula: "#ti-0+n-ech+0-0(chīhua-l-tia)0+0-0#",
        }
    );

    s.eq(
        "Canvas 24.8.3 and 25.10.3 distinguish the implicit object introduced from the same impersonal tomi source",
        (() => {
            const source = buildIntransitiveImpersonalSource(ctx, "tomi").sourceMachineryFrame;
            const summarize = targetStem => {
                const derived = deriveCausativeTarget(ctx, source, targetStem);
                const participants = derived.operationFrame.participantTransformFrame || {};
                return {
                    subtype: derived.selectedOption?.derivationSubtype || "",
                    operationStatus: derived.operationFrame.authorizationStatus,
                    operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operationFrame),
                    implicitAgentObjectKind: participants.implicitAgentObjectKind,
                    targetObjects: (participants.targetObjectRequests || []).map(request => [
                        request.objectKind,
                        request.objectPerson,
                        request.governor,
                        request.derivationalLevel,
                    ]),
                    machineryStatus: derived.machineryFrame.authorizationStatus,
                    machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machineryFrame),
                    formula: derived.machineryFrame.formulaRealization,
                };
            };
            return {
                sourceStatus: source.authorizationStatus,
                sourceVoice: source.voice,
                sourceFormula: source.formulaRealization,
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                typeOne: summarize("tom-a"),
                typeTwo: summarize("tom-tia"),
            };
        })(),
        {
            sourceStatus: "authorized",
            sourceVoice: "impersonal",
            sourceFormula: "#0-0(tom-o-hua)0+0-0#",
            sourceCanonical: true,
            typeOne: {
                subtype: "type-one",
                operationStatus: "authorized",
                operationCanonical: true,
                implicitAgentObjectKind: "nonspecific-nonhuman",
                targetObjects: [["nonspecific-nonhuman", "", "causative", 1]],
                machineryStatus: "authorized",
                machineryCanonical: true,
                formula: "#ni-0+tla(tom-a)0+0-0#",
            },
            typeTwo: {
                subtype: "type-two",
                operationStatus: "authorized",
                operationCanonical: true,
                implicitAgentObjectKind: "nonspecific-human",
                targetObjects: [["nonspecific-human", "", "causative", 1]],
                machineryStatus: "authorized",
                machineryCanonical: true,
                formula: "#ni-0+te(tom-tia)0+0-0#",
            },
        }
    );

    s.eq(
        "Nonactive causative sources preserve canonical participant depth from one through three object positions",
        (() => {
            const tomiImpersonal = buildIntransitiveImpersonalSource(ctx, "tomi").sourceMachineryFrame;
            const oneObject = deriveCausativeTarget(ctx, tomiImpersonal, "tom-tia", "1sg");
            const twoObjects = deriveCausative(ctx, impersonal.sourceMachineryFrame, "2sg");

            const lower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("chihua", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const twoObjectActive = ctx.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lower, {
                objectRequests: [
                    { objectId: "direct", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const nonactiveStemRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("chihua", {
                verbClass: "A",
                sourceValence: "multiple-object",
            });
            const twoObjectPassive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(twoObjectActive, {
                voice: "passive",
                nonactiveStemRecord,
                sourceObjectClusterFrame: twoObjectActive.multipleObjectClusterFrame,
                sourceValence: "multiple-object",
                sourceSubject: "3sg",
                sourceObjectPerson: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const threeObjects = deriveCausativeTarget(ctx, twoObjectPassive, "chīhua-l-tiā", "2sg", "sounded");

            const summarize = (derived, sourceVoice) => ({
                sourceVoice,
                sourceCount: derived.operationFrame.participantTransformFrame?.sourceObjectCount ?? -1,
                targetCount: derived.operationFrame.participantTransformFrame?.targetObjectCount ?? -1,
                levels: (derived.operationFrame.targetObjectRequests || []).map(request => request.derivationalLevel),
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operationFrame),
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machineryFrame),
                formula: derived.machineryFrame.formulaRealization,
            });
            return {
                oneObject: summarize(oneObject, tomiImpersonal.voice),
                twoObjects: summarize(twoObjects, impersonal.sourceMachineryFrame.voice),
                threeObjectSource: {
                    status: twoObjectPassive.authorizationStatus,
                    voice: twoObjectPassive.voice,
                    canonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(twoObjectPassive),
                    promotedObject: threeObjects.operationFrame.participantTransformFrame?.promotedSourceObjectRequest?.objectId || "",
                    participantSurfaceObjects: (threeObjects.operationFrame.participantTransformFrame?.participantSurfaceObjectRequests || []).map(request => request.objectId),
                },
                threeObjects: summarize(threeObjects, twoObjectPassive.voice),
            };
        })(),
        {
            oneObject: {
                sourceVoice: "impersonal",
                sourceCount: 0,
                targetCount: 1,
                levels: [1],
                operationCanonical: true,
                machineryCanonical: true,
                formula: "#ni-0+te(tom-tia)0+0-0#",
            },
            twoObjects: {
                sourceVoice: "impersonal",
                sourceCount: 1,
                targetCount: 2,
                levels: [1, 2],
                operationCanonical: true,
                machineryCanonical: true,
                formula: "#ti-0+te+tla(chīhua-l-tia)0+0-0#",
            },
            threeObjectSource: {
                status: "authorized",
                voice: "passive",
                canonical: true,
                promotedObject: "direct",
                participantSurfaceObjects: ["applied"],
            },
            threeObjects: {
                sourceVoice: "passive",
                sourceCount: 2,
                targetCount: 3,
                levels: [1, 2, 3],
                operationCanonical: true,
                machineryCanonical: true,
                formula: "#ti-0+c-0+te+te(chīhua-l-tia)0+0-0#",
            },
        }
    );

    s.eq(
        "Canvas 25.12.3 raises a two-object impersonal source to a canonical three-object causative",
        (() => {
            const lower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("chihua", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const twoObjectActive = ctx.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lower, {
                objectRequests: [
                    { objectId: "source-human", objectKind: "nonspecific-human", objectPerson: "", governor: "directive", derivationalLevel: 1 },
                    { objectId: "source-nonhuman", objectKind: "nonspecific-nonhuman", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const nonactiveStemRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("chihua", {
                verbClass: "A",
                sourceValence: "multiple-object",
            });
            const impersonalSource = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(twoObjectActive, {
                voice: "impersonal",
                nonactiveStemRecord,
                sourceObjectClusterFrame: twoObjectActive.multipleObjectClusterFrame,
                sourceValence: "multiple-object",
                sourceSubject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const derived = deriveCausativeTarget(ctx, impersonalSource, "chīhua-l-tiā", "2sg");
            return {
                activeSource: [twoObjectActive.authorizationStatus, twoObjectActive.formulaRealization],
                nonactiveRecord: [nonactiveStemRecord.authorizationStatus, nonactiveStemRecord.nonactiveStem],
                impersonalSource: [
                    impersonalSource.authorizationStatus,
                    impersonalSource.blockReason,
                    impersonalSource.formulaRealization,
                    ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(impersonalSource),
                ],
                operation: [
                    derived.operationFrame.authorizationStatus,
                    derived.operationFrame.blockReason,
                    ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operationFrame),
                ],
                participantDepth: [
                    derived.operationFrame.participantTransformFrame?.sourceObjectCount ?? -1,
                    derived.operationFrame.participantTransformFrame?.targetObjectCount ?? -1,
                    ...(derived.operationFrame.targetObjectRequests || []).map(request => request.derivationalLevel),
                ],
                targetObjects: (derived.operationFrame.targetObjectRequests || []).map(request => [
                    request.objectId,
                    request.objectKind,
                    request.governor,
                ]),
                machinery: [
                    derived.machineryFrame.authorizationStatus,
                    derived.machineryFrame.blockReason,
                    derived.machineryFrame.formulaRealization,
                    ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.machineryFrame),
                ],
            };
        })(),
        {
            activeSource: ["authorized", "#0-0+te+tla(chihua)0+0-0#"],
            nonactiveRecord: ["authorized", "chīhua-lō"],
            impersonalSource: ["authorized", "", "#0-0+te+tla(chīhua-lo)0+0-0#", true],
            operation: ["authorized", "", true],
            participantDepth: [2, 3, 1, 2, 3],
            targetObjects: [
                ["source-human", "nonspecific-human", "directive"],
                ["source-nonhuman", "nonspecific-nonhuman", "applicative"],
                ["causative-object", "nonspecific-human", "causative"],
            ],
            machinery: ["authorized", "", "#ti-0+te+te+tla(chīhua-l-tia)0+0-0#", true],
        }
    );

    s.eq(
        "Canvas 25.13 exposes both mach-tiā source analyses and rejects reverse-analysis tampering",
        (() => {
            const activeSource = buildIntransitiveSource(ctx, "mati");
            const activeDerivation = deriveCausativeTarget(ctx, activeSource, "mach-tiā", "1sg");
            const impersonalSource = buildIntransitiveImpersonalSource(ctx, "mati").sourceMachineryFrame;
            const impersonalDerivation = deriveCausativeTarget(ctx, impersonalSource, "mach-tiā", "1sg");
            const hostileOperation = jsonClone(activeDerivation.operationFrame);
            hostileOperation.reverseSourceAnalyses[1].silentSourceObjectRequired = false;
            const hostileMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(activeSource, hostileOperation, {
                mood: "indicative",
                tense: "present",
                targetSubject: "1sg",
            });
            const summarizeAnalysis = analysis => ({
                id: analysis.analysisId.startsWith("identified-source:")
                    ? "identified-source:<signed-source>"
                    : analysis.analysisId,
                status: analysis.analysisStatus,
                voice: analysis.sourceVoice,
                valence: analysis.sourceValence,
                sourceObjectCount: analysis.sourceObjectCount,
                silentSourceObjectRequired: analysis.silentSourceObjectRequired,
                signed: Boolean(analysis.canonicalSignature),
            });
            return {
                activeOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(activeDerivation.operationFrame),
                activeAnalyses: activeDerivation.operationFrame.reverseSourceAnalyses.map(summarizeAnalysis),
                impersonalOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(impersonalDerivation.operationFrame),
                impersonalAnalyses: impersonalDerivation.operationFrame.reverseSourceAnalyses.map(summarizeAnalysis),
                hostileOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(hostileOperation),
                hostileBuild: [hostileMachinery.authorizationStatus, hostileMachinery.blockReason],
            };
        })(),
        {
            activeOperationCanonical: true,
            activeAnalyses: [
                {
                    id: "cn-l25-253-mach-tia-from-intransitive-mati",
                    status: "identified-source",
                    voice: "active",
                    valence: "intransitive",
                    sourceObjectCount: 0,
                    silentSourceObjectRequired: false,
                    signed: true,
                },
                {
                    id: "cn-l25-253-mach-tia-from-transitive-tla-mati",
                    status: "canonically-licensed-reverse-source",
                    voice: "active",
                    valence: "specific-projective",
                    sourceObjectCount: 1,
                    silentSourceObjectRequired: true,
                    signed: true,
                },
            ],
            impersonalOperationCanonical: true,
            impersonalAnalyses: [
                {
                    id: "identified-source:<signed-source>",
                    status: "identified-source",
                    voice: "impersonal",
                    valence: "intransitive",
                    sourceObjectCount: 0,
                    silentSourceObjectRequired: false,
                    signed: true,
                },
                {
                    id: "cn-l25-253-mach-tia-from-intransitive-mati",
                    status: "canonically-licensed-reverse-source",
                    voice: "active",
                    valence: "intransitive",
                    sourceObjectCount: 0,
                    silentSourceObjectRequired: false,
                    signed: true,
                },
                {
                    id: "cn-l25-253-mach-tia-from-transitive-tla-mati",
                    status: "canonically-licensed-reverse-source",
                    voice: "active",
                    valence: "specific-projective",
                    sourceObjectCount: 1,
                    silentSourceObjectRequired: true,
                    signed: true,
                },
            ],
            hostileOperationCanonical: false,
            hostileBuild: ["blocked", "classical-vnc-derived-machinery-canonical-operation-required"],
        }
    );

    s.eq(
        "Voice-source authority fails closed after typed voice, nonactive, transformation, or final-frame poison",
        (() => {
            const poison = {
                voice: jsonClone(passive.sourceMachineryFrame),
                nonactiveRecord: jsonClone(passive.sourceMachineryFrame),
                voiceTransformation: jsonClone(passive.sourceMachineryFrame),
                finalTypedFrame: jsonClone(passive.sourceMachineryFrame),
            };
            poison.voice.voice = "impersonal";
            poison.nonactiveRecord.nonactiveStemRecord.nonactiveStem = "FORGED-NONACTIVE";
            poison.voiceTransformation.voiceTransformationFrame.targetSubject = "2pl";
            poison.finalTypedFrame.proofFrame.conclusion.finalTypedVncSlotFrame.slots.predicate.stem = "FORGED-PREDICATE";
            return Object.fromEntries(Object.entries(poison).map(([name, frame]) => [name, summarizeHostileSource(ctx, frame)]));
        })(),
        {
            voice: {
                sourceCanonical: false,
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-voice-source-not-canonical",
                optionCount: 0,
            },
            nonactiveRecord: {
                sourceCanonical: false,
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-voice-source-not-canonical",
                optionCount: 0,
            },
            voiceTransformation: {
                sourceCanonical: false,
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-voice-source-not-canonical",
                optionCount: 0,
            },
            finalTypedFrame: {
                sourceCanonical: false,
                inventoryStatus: "blocked",
                inventoryReason: "classical-vnc-derivation-voice-source-not-canonical",
                optionCount: 0,
            },
        }
    );

    return s;
}

module.exports = { run };
