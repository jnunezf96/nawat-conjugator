#!/usr/bin/env node
"use strict";

const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");

function buildSource(context, stem, {
    verbClass,
    sourceValence = "intransitive",
    subject = "3sg",
    objectKind = sourceValence === "intransitive" ? "none" : "specific-projective",
    objectPerson = sourceValence === "intransitive" ? "" : "2sg",
} = {}) {
    return context.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson,
    });
}

function summarizeInventory(context, source, derivationType) {
    const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType });
    return {
        status: inventory.authorizationStatus,
        reason: inventory.blockReason,
        canonical: context.isClassicalNahuatlVncDerivationOptionInventory(inventory),
        selectorRequired: inventory.selectorRequired,
        targets: inventory.options.map((option) => option.targetStem),
        routes: inventory.options.map((option) => option.derivationRoute),
        optionIds: inventory.options.map((option) => option.optionId),
        inventory,
    };
}

function assertAudit(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

async function runProductiveAudit() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });

    const finalI = summarizeInventory(context, buildSource(context, "miqui", {
        verbClass: "B",
    }), "causative");
    assertAudit(finalI.status === "authorized" && finalI.canonical, "final-i causative inventory must be canonical");
    assertAudit(finalI.selectorRequired === true, "final-i causative alternatives must require a selector");
    assertAudit(["mic-a", "miqui-a", "mic-tiā"].every((target) => finalI.targets.includes(target)), "final-i causative rule lattice is incomplete");

    const finalIApplicative = summarizeInventory(context, buildSource(context, "mati", {
        verbClass: "B",
        sourceValence: "specific-projective",
    }), "applicative");
    assertAudit(finalIApplicative.canonical && finalIApplicative.targets.includes("mati-lia"), "final-i applicative rule did not generate");

    const finalAApplicative = summarizeInventory(context, buildSource(context, "namaca", {
        verbClass: "A",
        sourceValence: "specific-projective",
    }), "applicative");
    assertAudit(finalAApplicative.canonical && finalAApplicative.targets.includes("namaqui-lia"), "consonant-a applicative rule or spelling adjustment did not generate");

    const classDApplicative = summarizeInventory(context, buildSource(context, "pā", {
        verbClass: "D",
    }), "applicative");
    assertAudit(classDApplicative.canonical && classDApplicative.targets.includes("pā-liā"), "Class D applicative rule did not generate");

    const finalOApplicative = summarizeInventory(context, buildSource(context, "calō", {
        verbClass: "A",
    }), "applicative");
    assertAudit(finalOApplicative.canonical && finalOApplicative.selectorRequired, "final-o huiā alternatives must remain selectable");
    assertAudit(["calō-huiā", "cala-huiā"].every((target) => finalOApplicative.targets.includes(target)), "final-o direct/replacive huiā routes are incomplete");
    const exactFinalO = summarizeInventory(context, buildSource(context, "temō", { verbClass: "A" }), "causative");
    assertAudit(exactFinalO.canonical && exactFinalO.targets.length === 1 && exactFinalO.targets[0] === "temō-huiā", "exact final-o route must suppress the unattested alternative and wrong tia bridge");

    const oneObjectSource = buildSource(context, "namaca", {
        verbClass: "A",
        sourceValence: "specific-projective",
        subject: "3sg",
        objectPerson: "2sg",
    });
    const twoObjectSource = context.buildClassicalNahuatlLesson23MultipleObjectVncFrame(oneObjectSource, {
        objectRequests: [
            { objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "2sg", governor: "directive", derivationalLevel: 1 },
            { objectId: "source-object-2", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
        ],
    });
    const tripleInventory = summarizeInventory(context, twoObjectSource, "causative");
    const tripleOption = tripleInventory.inventory.options.find((option) => option.targetStem === "namac-tia");
    const tripleOperation = context.deriveClassicalNahuatlVncDerivationOperationFrame(twoObjectSource, {
        derivationType: "causative",
        optionId: tripleOption?.optionId,
        targetSubject: "1pl",
    });
    assertAudit(tripleInventory.canonical && tripleOption, "two-object source must preserve a productive type-two causative option");
    assertAudit(context.isClassicalNahuatlVncDerivationOperationFrame(tripleOperation) && tripleOperation.targetObjectRequests.length === 3, "two-object source must become a typed three-object causative");

    const recursiveSource = buildSource(context, "miqui", { verbClass: "B" });
    const recursiveInventory = summarizeInventory(context, recursiveSource, "causative").inventory;
    const addition = recursiveInventory.options.find((option) => option.derivationRoute === "type-one-final-i-addition");
    const causativeOperation = context.deriveClassicalNahuatlVncDerivationOperationFrame(recursiveSource, {
        derivationType: "causative",
        optionId: addition?.optionId,
        targetSubject: "1sg",
    });
    const causativeMachinery = context.buildClassicalNahuatlDerivedVncMachineryFrame(recursiveSource, causativeOperation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "1sg",
    });
    const recursiveApplicative = summarizeInventory(context, causativeMachinery, "applicative");
    assertAudit(context.isClassicalNahuatlDerivedVncMachineryFrame(causativeMachinery), "first derivation must remain canonical before recursion");
    assertAudit(recursiveApplicative.canonical && recursiveApplicative.targets.includes("miqui-lia"), "signed derived source must feed the recursive final-ia applicative rule");
    const recursiveOption = recursiveApplicative.inventory.options.find((option) => option.targetStem === "miqui-lia");
    const recursiveOperation = context.deriveClassicalNahuatlVncDerivationOperationFrame(causativeMachinery, {
        derivationType: "applicative",
        optionId: recursiveOption?.optionId,
        targetSubject: "1sg",
        applicativeObjectKind: "specific-projective",
        applicativeObjectPerson: "2sg",
    });
    const recursiveMachinery = context.buildClassicalNahuatlDerivedVncMachineryFrame(causativeMachinery, recursiveOperation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "1sg",
    });
    assertAudit(context.isClassicalNahuatlVncDerivationOperationFrame(recursiveOperation) && context.isClassicalNahuatlDerivedVncMachineryFrame(recursiveMachinery), "second derivation must build and validate canonically");

    const destockalSource = buildSource(context, "pol-i-hui", { verbClass: "B" });
    const destockalInventory = summarizeInventory(context, destockalSource, "causative").inventory;
    const destockalOption = destockalInventory.options.find((option) => option.derivationRoute === "type-one-destockal-hui-to-o-a");
    const destockalOperation = context.deriveClassicalNahuatlVncDerivationOperationFrame(destockalSource, {
        derivationType: "causative",
        optionId: destockalOption?.optionId,
        targetSubject: "1sg",
    });
    const destockalMachinery = context.buildClassicalNahuatlDerivedVncMachineryFrame(destockalSource, destockalOperation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "1sg",
    });
    const signedHistoryApplicative = summarizeInventory(context, destockalMachinery, "applicative");
    assertAudit(signedHistoryApplicative.canonical && signedHistoryApplicative.routes.includes("type-two-huia-from-signed-causative-o-a-history"), "raw spelling must not replace the signed o-a history route");

    const negativeDestockal = summarizeInventory(context, buildSource(context, "pil-i-hui", { verbClass: "B" }), "causative");
    assertAudit(negativeDestockal.routes.every((route) => !route.startsWith("type-one")), "documented pil-i-hui negative exception must block type-one fallback as well as the o-a route");

    const oHuiSource = buildSource(context, "tlap-o-hui", { verbClass: "B" });
    const oHuiInventory = summarizeInventory(context, oHuiSource, "causative").inventory;
    const oHuiOption = oHuiInventory.options.find((option) => option.derivationRoute === "type-one-destockal-o-hui-to-o-a");
    const oHuiOperation = context.deriveClassicalNahuatlVncDerivationOperationFrame(oHuiSource, {
        derivationType: "causative",
        optionId: oHuiOption?.optionId,
        targetSubject: "1sg",
    });
    const oHuiMachinery = context.buildClassicalNahuatlDerivedVncMachineryFrame(oHuiSource, oHuiOperation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "1sg",
    });
    const oHuiApplicative = summarizeInventory(context, oHuiMachinery, "applicative");
    assertAudit(oHuiOption?.targetStem === "tlap-o-a" && oHuiApplicative.targets.includes("tlap-o-l-huia"), "signed o-hui history must continue through the Lesson 26 o-a rule");

    const destockalHua = summarizeInventory(context, buildSource(context, "chip-ā-hua", { verbClass: "A" }), "causative");
    assertAudit(destockalHua.targets.includes("chip-ā-hu-a"), "Class A typed destockal hua replacement must generate");

    const rootPlusYa = summarizeInventory(context, buildSource(context, "coco-ya", { verbClass: "A" }), "causative");
    assertAudit(["coco-a", "coco-lia"].every((target) => rootPlusYa.targets.includes(target)), "Class A root-plus-ya must expose type-one a and type-two lia routes");

    const denominalTiSource = buildSource(context, "tlāca-ti", { verbClass: "B" });
    const denominalTiCausative = summarizeInventory(context, denominalTiSource, "causative");
    const denominalTiApplicative = summarizeInventory(context, denominalTiSource, "applicative");
    assertAudit(denominalTiCausative.targets.includes("tlāca-ti-liā") && denominalTiApplicative.targets.includes("tlāca-t-iā"), "denominal ti must keep causative liā distinct from the user-selected Type 1 applicative t-iā route");

    const multiRouteApplicative = summarizeInventory(context, buildSource(context, "mati", {
        verbClass: "B",
        sourceValence: "specific-projective",
    }), "applicative");
    assertAudit(["mat-ia", "mati-lia", "machi-lia"].every((target) => multiRouteApplicative.targets.includes(target)), "mati must expose Type 1, regular Type 2, and exact Type 2 alternant choices");

    const rareTypeThree = summarizeInventory(context, buildSource(context, "namaca", {
        verbClass: "A",
        sourceValence: "specific-projective",
    }), "applicative");
    assertAudit(["namac-ia", "namaqui-lia", "namaqui-l-tia"].every((target) => rareTypeThree.targets.includes(target)), "namaca must expose Type 1, regular Type 2, and rare Type 3 applicative choices");

    const yaApplicative = summarizeInventory(context, buildSource(context, "ināya", { verbClass: "B", sourceValence: "specific-projective" }), "applicative");
    const oyaApplicative = summarizeInventory(context, buildSource(context, "tlaōco-ya", { verbClass: "B" }), "applicative");
    assertAudit(yaApplicative.targets.includes("ināyi-liā") && oyaApplicative.targets.includes("tlaōco-liā"), "general ya and intransitive oya applicative routes must stay distinct");

    const explicitOaApplicative = summarizeInventory(context, buildSource(context, "xel-o-ā", { verbClass: "C", sourceValence: "specific-projective" }), "applicative");
    assertAudit(explicitOaApplicative.targets.includes("xel-huiā"), "explicit root-final-l o-a source must receive the productive huiā route");

    const report = {
        audit: "classical-lessons24-26-productive-rules",
        status: "passed",
        ruleFamilies: 18,
        finalICausative: { targets: finalI.targets, selectorRequired: finalI.selectorRequired },
        finalIApplicative: finalIApplicative.targets,
        finalAApplicative: finalAApplicative.targets,
        classDApplicative: classDApplicative.targets,
        finalOApplicative: { targets: finalOApplicative.targets, selectorRequired: finalOApplicative.selectorRequired },
        tripleObjectTargetCount: tripleOperation.targetObjectRequests.length,
        recursiveApplicative: recursiveApplicative.targets,
        recursiveMachineryCanonical: true,
        signedHistoryApplicative: signedHistoryApplicative.targets,
        negativeDestockalRoutes: negativeDestockal.routes,
        oHuiApplicative: oHuiApplicative.targets,
    };
    return report;
}

if (require.main === module) {
    runProductiveAudit().then((report) => {
        if (process.argv.includes("--summary")) {
            process.stdout.write(`${report.audit}: ${report.status}; ${report.ruleFamilies} rule families; triple depth ${report.tripleObjectTargetCount}\n`);
            return;
        }
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    }).catch((error) => {
        process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
        process.exit(1);
    });
}

module.exports = {
    buildSource,
    runProductiveAudit,
    summarizeInventory,
};
