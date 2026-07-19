"use strict";

const { createSuite } = require("./runner");

function buildCausativeAssertion(ctx, {
    sourceStem,
    sourceValence,
    sourceObjectKind,
    sourceObjectPerson = "",
    targetSubject,
    targetStem,
}) {
    const sourceFrame = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(sourceStem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        perfectiveClass: "A",
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceObjectKind,
        objectPerson: sourceObjectPerson,
        object: sourceObjectPerson,
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(sourceFrame, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === targetStem);
    if (!option) {
        throw new Error(`Missing causative option ${sourceStem} -> ${targetStem}`);
    }
    const operationFrame = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(sourceFrame, {
        derivationType: "causative",
        optionId: option.optionId,
        targetSubject,
    });
    return ctx.buildClassicalNahuatlDerivedVncMachineryFrame(sourceFrame, operationFrame, {
        mood: "indicative",
        tense: "present",
        targetSubject,
    });
}

function buildLesson2514Cases(ctx) {
    return [{
        target: "wish",
        source: buildCausativeAssertion(ctx, {
            sourceStem: "chīhua",
            sourceValence: "projective-nonhuman",
            sourceObjectKind: "nonspecific-nonhuman",
            targetSubject: "1sg",
            targetStem: "chīhua-l-tiā",
        }),
        expected: {
            source: "Nictlachīhualtia.",
            target: "Mā nictlachīhualti.",
            word: "nictlachīhualti",
            formula: "#ni-0+c-0+tla(chīhua-l-ti)0+⎕-0#",
            mood: "optative",
            role: "wish",
        },
    }, {
        target: "command",
        source: buildCausativeAssertion(ctx, {
            sourceStem: "chīhua",
            sourceValence: "projective-nonhuman",
            sourceObjectKind: "nonspecific-nonhuman",
            targetSubject: "2pl",
            targetStem: "chīhua-l-tiā",
        }),
        expected: {
            source: "Anquitlachīhualtiah.",
            target: "Mā xictlachīhualticān.",
            word: "xictlachīhualticān",
            formula: "#xi-0+c-0+tla(chīhua-l-ti)0+c-ān#",
            mood: "optative",
            role: "direct-command",
        },
    }, {
        target: "exhortation",
        source: buildCausativeAssertion(ctx, {
            sourceStem: "chīhua",
            sourceValence: "specific-projective",
            sourceObjectKind: "specific-projective",
            sourceObjectPerson: "3sg",
            targetSubject: "1pl",
            targetStem: "chīhua-l-tiā",
        }),
        expected: {
            source: "Ticchīhualtiah.",
            target: "Mā ticchīhualtīcān.",
            word: "ticchīhualtīcān",
            formula: "#ti-0+c-0+0-0(chīhua-l-tī)0+c-ān#",
            mood: "optative",
            role: "exhortation",
        },
    }, {
        target: "indirect-admonition",
        source: buildCausativeAssertion(ctx, {
            sourceStem: "chōca",
            sourceValence: "intransitive",
            sourceObjectKind: "none",
            targetSubject: "3pl",
            targetStem: "chōc-tiā",
        }),
        expected: {
            source: "Quichōctiah.",
            target: "Mā quichōctihtin.",
            word: "quichōctihtin",
            formula: "#0-0+qui-0(chōc-tih)0+t-in#",
            mood: "admonitive",
            role: "indirect-admonition",
        },
    }];
}

function buildMatiPassiveCausativeAssertion(ctx, realization) {
    const active = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mati", {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
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
    const passive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactive,
        sourceValence: "specific-projective",
        sourceSubject: "3sg",
        sourceObjectPerson: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(passive, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === "mach-tiā");
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(passive, {
        derivationType: "causative",
        optionId: option?.optionId || "missing-mach-tiā",
        targetSubject: "3sg",
        causativeSpecificShuntlineRealization: realization,
    });
    return ctx.buildClassicalNahuatlDerivedVncMachineryFrame(passive, operation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "3sg",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_mood");

    s.eq(
        "Lesson 5 keeps the Andrews nonpast-optative plural carrier as typed ān",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson5VncSubjectTenseFrame("nemi", {
                subject: "2pl",
                mood: "optative",
                tense: "nonpast",
                verbClass: "A",
            });
            return {
                num1: frame.numberDyad.num1,
                num2: frame.numberDyad.num2,
                num2Variants: frame.numberDyad.num2Variants,
                formula: frame.formulaRealization,
            };
        })(),
        {
            num1: "c",
            num2: "ān",
            num2Variants: ["ān"],
            formula: "#xi-0(nemi)0+c-ān#",
        }
    );

    s.eq(
        "All four Andrews 25.14 assertion transforms rebuild through typed finite and sentence machinery",
        buildLesson2514Cases(ctx).map(({ target, source, expected }) => {
            const frame = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, { target });
            return {
                target,
                sourceCanonical: ctx.isClassicalNahuatlLesson2514DerivedCausativeAssertionFrame(source),
                status: frame.authorizationStatus,
                source: frame.sourceSentenceRealization,
                result: frame.sentenceRealization,
                word: frame.wordRealization,
                formula: frame.targetFormulaRealization,
                mood: frame.targetMood,
                tense: frame.targetTense,
                role: frame.targetSentenceRole,
                particle: frame.particleRealization,
                canonical: ctx.isClassicalNahuatlLesson2514MoodTransformationFrame(frame),
            };
        }),
        buildLesson2514Cases(ctx).map(({ target, expected }) => ({
            target,
            sourceCanonical: true,
            status: "authorized",
            source: expected.source,
            result: expected.target,
            word: expected.word,
            formula: expected.formula,
            mood: expected.mood,
            tense: "nonpast",
            role: expected.role,
            particle: "Mā",
            canonical: true,
        }))
    );

    s.eq(
        "The mood layer preserves derivation and participant identities while replacing only the finite environment",
        (() => {
            const { source } = buildLesson2514Cases(ctx)[0];
            const frame = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, { target: "wish" });
            return {
                operationSignature: frame.lexicalDerivationIdentity.operationSignature,
                expectedOperationSignature: source.derivationOperationFrame.canonicalSignature,
                participantSignature: frame.participantIdentity.participantTransformSignature,
                expectedParticipantSignature: source.participantTransformFrame.canonicalSignature,
                sourceSubject: source.targetSubject,
                targetSubject: frame.participantIdentity.targetSubject,
                sourceObjects: source.targetObjectRequests.map(request => request.objectId),
                targetObjects: frame.participantIdentity.targetObjectRequests.map(request => request.objectId),
                sourceMood: frame.sourceMood,
                targetMood: frame.targetMood,
                typedIdentityChangedWithMood: frame.sourceTypedFrame.semanticIdentity !== frame.targetTypedFrame.semanticIdentity,
                lexicalIdentityPreserved: frame.lexicalDerivationIdentityPreserved,
                participantIdentityPreserved: frame.participantIdentityPreserved,
            };
        })(),
        (() => {
            const { source } = buildLesson2514Cases(ctx)[0];
            return {
                operationSignature: source.derivationOperationFrame.canonicalSignature,
                expectedOperationSignature: source.derivationOperationFrame.canonicalSignature,
                participantSignature: source.participantTransformFrame.canonicalSignature,
                expectedParticipantSignature: source.participantTransformFrame.canonicalSignature,
                sourceSubject: "1sg",
                targetSubject: "1sg",
                sourceObjects: ["source-object-1", "causative-object"],
                targetObjects: ["source-object-1", "causative-object"],
                sourceMood: "indicative",
                targetMood: "optative",
                typedIdentityChangedWithMood: true,
                lexicalIdentityPreserved: true,
                participantIdentityPreserved: true,
            };
        })()
    );

    s.eq(
        "The mood finalizer preserves the selected silent or sounded specific shuntline realization",
        (() => {
            const cases = ["silent", "sounded"].map(realization => {
                const source = buildMatiPassiveCausativeAssertion(ctx, realization);
                const frame = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, { target: "wish" });
                return {
                    realization,
                    canonical: ctx.isClassicalNahuatlLesson2514MoodTransformationFrame(frame),
                    sourceCarrier: source.targetObjectClusterFrame.positions.find(position => position.objectId === "source-object-1")?.carrier,
                    targetCarrier: frame.targetObjectClusterFrame.positions.find(position => position.objectId === "source-object-1")?.carrier,
                    targetSelection: frame.targetObjectClusterFrame.causativeSpecificShuntlineRealization,
                    participantIdentityPreserved: frame.participantIdentityPreserved,
                };
            });
            const source = buildMatiPassiveCausativeAssertion(ctx, "silent");
            const frame = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, { target: "wish" });
            const forged = {
                ...frame,
                targetObjectClusterFrame: {
                    ...frame.targetObjectClusterFrame,
                    causativeSpecificShuntlineRealization: "sounded",
                },
            };
            return {
                cases,
                forgedAccepted: ctx.isClassicalNahuatlLesson2514MoodTransformationFrame(forged),
            };
        })(),
        {
            cases: [{
                realization: "silent",
                canonical: true,
                sourceCarrier: "0-0",
                targetCarrier: "0-0",
                targetSelection: "silent",
                participantIdentityPreserved: true,
            }, {
                realization: "sounded",
                canonical: true,
                sourceCarrier: "qui-0",
                targetCarrier: "qui-0",
                targetSelection: "sounded",
                participantIdentityPreserved: true,
            }],
            forgedAccepted: false,
        }
    );

    s.eq(
        "A caller-supplied result cannot authorize or steer the Lesson 25.14 transform",
        (() => {
            const { source } = buildLesson2514Cases(ctx)[0];
            const blocked = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, {
                target: "wish",
                targetWord: "nictlachīhualti",
                sentenceRealization: "Mā nictlachīhualti.",
            });
            return {
                status: blocked.authorizationStatus,
                reason: blocked.blockReason,
                rejected: blocked.rejectedAuthorityFields,
                targetTypedFrame: blocked.targetTypedFrame,
                word: blocked.wordRealization,
                callerAuthority: blocked.callerSuppliedAuthorityAccepted,
            };
        })(),
        {
            status: "blocked",
            reason: "classical-lesson25-14-caller-output-authority-forbidden",
            rejected: ["sentenceRealization", "targetWord"],
            targetTypedFrame: null,
            word: "",
            callerAuthority: false,
        }
    );

    s.eq(
        "The target role must agree with subject person and the source must be a canonical causative assertion",
        (() => {
            const { source } = buildLesson2514Cases(ctx)[0];
            const wrongRole = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, { target: "command" });
            const directSource = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("chōca", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                valence: "intransitive",
            });
            const nonCausative = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(directSource, { target: "wish" });
            return {
                wrongRole: [wrongRole.authorizationStatus, wrongRole.blockReason],
                nonCausative: [nonCausative.authorizationStatus, nonCausative.blockReason],
            };
        })(),
        {
            wrongRole: ["blocked", "classical-lesson25-14-target-role-subject-mismatch"],
            nonCausative: ["blocked", "classical-lesson25-14-derived-causative-assertion-required"],
        }
    );

    s.eq(
        "The signed transform and its registered contract reject a forged word projection",
        (() => {
            const { source } = buildLesson2514Cases(ctx)[3];
            const frame = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, { target: "admonition" });
            const forged = {
                ...frame,
                wordRealization: "forged-output",
            };
            const registry = ctx.getDefaultGrammarContractRegistry();
            return {
                aliasNormalized: frame.transformationType,
                originalCanonical: ctx.isClassicalNahuatlLesson2514MoodTransformationFrame(frame),
                originalRegistered: ctx.inspectRegisteredGrammarContract(registry, frame).ok,
                forgedCanonical: ctx.isClassicalNahuatlLesson2514MoodTransformationFrame(forged),
                forgedRegistered: ctx.inspectRegisteredGrammarContract(registry, forged).ok,
            };
        })(),
        {
            aliasNormalized: "indirect-admonition",
            originalCanonical: true,
            originalRegistered: true,
            forgedCanonical: false,
            forgedRegistered: false,
        }
    );

    s.eq(
        "The mood finalizer rejects forged gates, particles, roles, nested typed pairs, and provenance",
        (() => {
            const { source } = buildLesson2514Cases(ctx)[0];
            const frame = ctx.buildClassicalNahuatlLesson2514MoodTransformationFrame(source, { target: "wish" });
            const mutations = [{
                name: "grammar gate",
                patch: { grammarGenerationAllowed: false },
            }, {
                name: "formula gate",
                patch: { formulaOutputAllowed: false },
            }, {
                name: "surface gate",
                patch: { surfaceGenerationAllowed: false },
            }, {
                name: "particle projection",
                patch: { particleRealization: "FORGED" },
            }, {
                name: "sentence-role authority",
                patch: { targetSentenceRoleAuthority: "FORGED" },
            }, {
                name: "typed source-target pair",
                patch: {
                    sourceTargetTypedFrames: {
                        source: frame.targetTypedFrame,
                        target: frame.sourceTypedFrame,
                    },
                },
            }, {
                name: "rule provenance",
                patch: { ruleRefs: [] },
            }, {
                name: "rejected authority ledger",
                patch: { rejectedAuthorityFields: ["targetWord"] },
            }];
            return {
                originalCanonical: ctx.isClassicalNahuatlLesson2514MoodTransformationFrame(frame),
                mutations: mutations.map(({ name, patch }) => ({
                    name,
                    accepted: ctx.isClassicalNahuatlLesson2514MoodTransformationFrame({ ...frame, ...patch }),
                })),
            };
        })(),
        {
            originalCanonical: true,
            mutations: [{ name: "grammar gate", accepted: false },
                { name: "formula gate", accepted: false },
                { name: "surface gate", accepted: false },
                { name: "particle projection", accepted: false },
                { name: "sentence-role authority", accepted: false },
                { name: "typed source-target pair", accepted: false },
                { name: "rule provenance", accepted: false },
                { name: "rejected authority ledger", accepted: false }],
        }
    );

    return s;
}

module.exports = { run };
