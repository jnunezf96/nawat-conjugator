"use strict";

const { createSuite } = require("./runner");

function buildSpecificSource(ctx, {
    stem,
    subject,
    objectPerson,
    tense,
}) {
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense,
        verbClass: "A",
        perfectiveClass: "A",
        valence: "specific-projective",
        requestedSourceValence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson,
    });
}

function deriveCausative(ctx, source, {
    targetStem,
    targetSubject,
}) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === targetStem);
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option?.optionId || "missing-option",
        targetSubject,
        causativeObjectKind: "specific-projective",
    });
    const active = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense: source.priorVncFrame?.tense || source.tense,
        targetSubject,
    });
    return { inventory, option, operation, active };
}

function passivizeDerivedCausative(ctx, active, tense) {
    const nonactiveInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
    });
    const nonactiveOption = nonactiveInventory.options.find(option => option.suffixFamily === "lō");
    const nonactiveRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord(active.targetStem, {
        verbClass: "C",
        sourceValence: "multiple-object",
        optionId: nonactiveOption?.optionId || "missing-nonactive-option",
    });
    const passive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactiveRecord,
        sourceObjectClusterFrame: active.targetObjectClusterFrame,
        sourceValence: "multiple-object",
        sourceSubject: active.targetSubject,
        mood: "indicative",
        tense,
        verbClass: "C",
    });
    return { nonactiveInventory, nonactiveOption, nonactiveRecord, passive };
}

function finiteSurface(ctx, machinery) {
    const frame = ctx.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
    return {
        canonical: ctx.isClassicalNahuatlVncFiniteSurfaceFrame(frame),
        word: frame.wordRealization,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_15_voice_routes");

    s.eq(
        "25.15 passivizes the canonical two-specific-object nōtza causative and retains third-plural qu-in",
        (() => {
            const source = buildSpecificSource(ctx, {
                stem: "nōtza",
                subject: "2sg",
                objectPerson: "3pl",
                tense: "present",
            });
            const derived = deriveCausative(ctx, source, {
                targetStem: "nōtza-l-tiā",
                targetSubject: "1pl",
            });
            const voice = passivizeDerivedCausative(ctx, derived.active, "present");
            return {
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                option: [derived.option?.targetStem, derived.option?.ruleId],
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operation),
                activeCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.active),
                activeFormula: derived.active.formulaRealization,
                activeSurface: finiteSurface(ctx, derived.active),
                activePositions: derived.active.targetObjectClusterFrame?.positions.map(position => [
                    position.objectId,
                    position.objectPerson,
                    position.prominence,
                    position.carrier,
                ]),
                nonactive: [
                    voice.nonactiveOption?.nonactiveStem,
                    voice.nonactiveOption?.ruleId,
                    ctx.isClassicalNahuatlLesson20NonactiveStemRecord(voice.nonactiveRecord, derived.active.targetStem),
                ],
                passiveCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(voice.passive),
                passiveFormula: voice.passive.formulaRealization,
                passiveSurface: finiteSurface(ctx, voice.passive),
                promoted: [
                    voice.passive.subject,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectId,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectPerson,
                ],
                retained: voice.passive.voiceObjectClusterFrame?.positions.map(position => [
                    position.objectId,
                    position.objectPerson,
                    position.carrier,
                ]),
            };
        })(),
        {
            sourceCanonical: true,
            option: ["nōtza-l-tiā", "cn-l25-254-lo-to-l-tia:cn-l20-4-final-sa-lo-variant"],
            operationCanonical: true,
            activeCanonical: true,
            activeFormula: "#ti-0+m-itz+0-im(nōtza-l-tia)0+0-h#",
            activeSurface: { canonical: true, word: "timitzinnōtzaltiah" },
            activePositions: [
                ["causative-object", "2sg", "mainline", "m-itz"],
                ["source-object-1", "3pl", "shuntline", "0-im"],
            ],
            nonactive: ["nōtza-l-tī-lō", "cn-l20-2-class-c-final-i-lengthening", true],
            passiveCanonical: true,
            passiveFormula: "#ti-0+qu-im(nōtza-l-tī-lo)0+0-0#",
            passiveSurface: { canonical: true, word: "tiquinnōtzaltīlo" },
            promoted: ["2sg", "causative-object", "2sg"],
            retained: [["source-object-1", "3pl", "qu-im"]],
        }
    );

    s.eq(
        "25.15 derives exact cui-tiā, automatic first-singular reflexivity, and the perfective passive continuation",
        (() => {
            const source = buildSpecificSource(ctx, {
                stem: "cui",
                subject: "1sg",
                objectPerson: "3sg",
                tense: "preterit",
            });
            const derived = deriveCausative(ctx, source, {
                targetStem: "cuī-tiā",
                targetSubject: "1sg",
            });
            const voice = passivizeDerivedCausative(ctx, derived.active, "preterit");
            const rejectedExplicitRelation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                optionId: derived.option?.optionId || "missing-option",
                targetSubject: "1sg",
                causativeObjectKind: "specific-projective",
                causativeReferentRelation: "coreferential",
            });
            const forgedOperation = JSON.parse(JSON.stringify(derived.operation));
            forgedOperation.targetStem = "catalog-target-cannot-authorize";
            return {
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                option: [derived.option?.targetStem, derived.option?.ruleId, derived.option?.baseTargetStem || ""],
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(derived.operation),
                participantRequests: derived.operation.targetObjectRequests.map(request => [
                    request.objectId,
                    request.objectKind,
                    request.objectPerson,
                    request.derivationalLevel,
                ]),
                activeCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(derived.active),
                activeFormula: derived.active.formulaRealization,
                activeSurface: finiteSurface(ctx, derived.active),
                nonactive: [
                    voice.nonactiveOption?.nonactiveStem,
                    voice.nonactiveOption?.ruleId,
                    ctx.isClassicalNahuatlLesson20NonactiveStemRecord(voice.nonactiveRecord, derived.active.targetStem),
                ],
                passiveCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(voice.passive),
                passiveFormula: voice.passive.formulaRealization,
                passiveSurface: finiteSurface(ctx, voice.passive),
                promoted: [
                    voice.passive.subject,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectId,
                    voice.passive.voiceObjectClusterFrame?.promotedObjectPerson,
                ],
                retained: voice.passive.voiceObjectClusterFrame?.positions.map(position => [
                    position.objectId,
                    position.objectKind,
                    position.carrier,
                ]),
                explicitRelationRejected: [rejectedExplicitRelation.authorizationStatus, rejectedExplicitRelation.blockReason],
                forgedOperationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(forgedOperation),
            };
        })(),
        {
            sourceCanonical: true,
            option: ["cuī-tiā", "cn-l25-2515-cui-cuitia-surface", ""],
            operationCanonical: true,
            participantRequests: [
                ["source-object-1", "specific-projective", "3sg", 1],
                ["causative-object", "reflexive", "1sg", 2],
            ],
            activeCanonical: true,
            activeFormula: "#ni-0+c-0+n-o(cuī-tih)0+⎕-0#",
            activeSurface: { canonical: true, word: "nicnocuītih" },
            nonactive: ["cuī-tī-lō", "cn-l20-2-class-c-final-i-lengthening", true],
            passiveCanonical: true,
            passiveFormula: "#0-0+ne(cuī-tī-lō)0+c-0#",
            passiveSurface: { canonical: true, word: "necuītīlōc" },
            promoted: ["3sg", "source-object-1", "3sg"],
            retained: [["causative-object", "reflexive", "ne"]],
            explicitRelationRejected: ["blocked", "classical-vnc-causative-referent-relation-not-applicable"],
            forgedOperationCanonical: false,
        }
    );

    return s;
}

module.exports = { run };
