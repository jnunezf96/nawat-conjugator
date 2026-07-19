"use strict";

const { createSuite } = require("./runner");

function buildSource(ctx, stem, subject = "1sg", valence = "mainline-reflexive") {
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass: "A",
        perfectiveClass: "A",
        valence,
        transitivity: valence === "intransitive" ? "intransitive" : "transitive",
        objectKind: valence === "mainline-reflexive" ? "reflexive" : "none",
        objectPerson: valence === "mainline-reflexive" ? subject : "",
    });
}

function selectCausative(ctx, source, targetStem, options = {}) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const selected = inventory.options.find(option => option.targetStem === targetStem);
    return ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: selected?.optionId || "",
        ...options,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_reflexive_causative");

    s.eq(
        "Lesson 25.11/25.13 moves a retained source reflexive to shuntline ne",
        (() => {
            const source = buildSource(ctx, "petlāhua");
            const operation = selectCausative(ctx, source, "petlāhua-l-tiā", {
                targetSubject: "2sg",
            });
            const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
                mood: "indicative",
                tense: "present",
                targetSubject: "2sg",
            });
            return {
                operationStatus: operation.authorizationStatus,
                operationCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                targetObjects: operation.targetObjectRequests.map(request => [
                    request.objectKind,
                    request.objectPerson,
                    request.governor,
                    request.derivationalLevel,
                ]),
                rule: operation.participantTransformFrame.retainedSourceReflexiveShuntlineRuleFrame?.ruleId,
                machineryStatus: machinery.authorizationStatus,
                machineryCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
                formula: machinery.formulaRealization,
            };
        })(),
        {
            operationStatus: "authorized",
            operationCanonical: true,
            targetObjects: [
                ["reflexive", "nonfirst-common", "directive", 1],
                ["specific-projective", "1sg", "causative", 2],
            ],
            rule: "cn-l25-2513-source-mainline-reflexive-to-shuntline-ne",
            machineryStatus: "authorized",
            machineryCanonical: true,
            formula: "#ti-0+n-ech+ne(petlāhua-l-tia)0+0-0#",
        }
    );

    s.eq(
        "Referent relation is a typed choice only for an equal non-singular person category",
        (() => {
            const equalSource = buildSource(ctx, "chōca", "3pl", "intransitive");
            const required = selectCausative(ctx, equalSource, "chōc-tiā", { targetSubject: "3pl" });
            const chosen = selectCausative(ctx, equalSource, "chōc-tiā", {
                targetSubject: "3pl",
                causativeReferentRelation: "distinct",
            });
            const ineligibleSource = buildSource(ctx, "chōca", "3sg", "intransitive");
            const inapplicable = selectCausative(ctx, ineligibleSource, "chōc-tiā", {
                targetSubject: "2sg",
                causativeReferentRelation: "distinct",
            });
            return {
                required: [required.authorizationStatus, required.blockReason, required.participantTransformFrame.causativeReferentRelationChoiceEligible],
                chosen: [chosen.authorizationStatus, chosen.participantTransformFrame.causativeReferentRelationChoiceEligible],
                inapplicable: [inapplicable.authorizationStatus, inapplicable.blockReason, inapplicable.participantTransformFrame.causativeReferentRelationChoiceEligible],
            };
        })(),
        {
            required: ["blocked", "classical-vnc-causative-equal-person-category-referent-choice-required", true],
            chosen: ["authorized", true],
            inapplicable: ["blocked", "classical-vnc-causative-referent-relation-not-applicable", false],
        }
    );

    return s;
}

module.exports = { run };
