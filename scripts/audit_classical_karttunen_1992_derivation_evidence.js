#!/usr/bin/env node
"use strict";

const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");
const SOURCE_SHA256 = "5a48f4827eada45f7f3cfb0aea3c47874fe711a542c3c06b395e7bdde5c456bc";

function assertAudit(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function buildSource(context, stem, verbClass, sourceValence) {
    return context.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: sourceValence === "intransitive" ? "none" : sourceValence,
        objectPerson: sourceValence === "intransitive" ? "" : "3sg",
    });
}

function getInventory(context, stem, verbClass, sourceValence, derivationType) {
    return context.getClassicalNahuatlVncDerivationOptionInventory(
        buildSource(context, stem, verbClass, sourceValence),
        { derivationType }
    );
}

function getAttachedEvidence(inventory) {
    return inventory.options.flatMap(option => option.lexicalEvidenceMatches || []);
}

async function runKarttunenEvidenceAudit() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const records = context.getClassicalNahuatlKarttunen1992DerivationEvidenceInventory();
    const confirmed = records.filter(record => record.runtimeIntersectionStatus === "confirmed-current-andrews-output");
    const noLicense = records.filter(record => record.runtimeIntersectionStatus === "explicit-edge-no-current-andrews-overlap");
    const applicatives = confirmed.filter(record => record.operation === "applicative");
    const causatives = confirmed.filter(record => record.operation === "causative");
    const nonactives = confirmed.filter(record => record.operation === "nonactive");
    const edgeIds = records.map(record => [record.sourceRecordId, record.operation, record.sourceStem, record.targetStem].join("|"));

    assertAudit(records.length === 838, "Karttunen runtime evidence must retain 837 confirmed intersections and one no-license fixture");
    assertAudit(confirmed.length === 837 && noLicense.length === 1, "Karttunen intersection status totals drifted");
    assertAudit(applicatives.length === 452 && causatives.length === 88 && nonactives.length === 297, "Karttunen confirmed operation totals drifted");
    assertAudit(new Set(edgeIds).size === records.length, "Karttunen evidence contains a duplicate edge");
    assertAudit(Object.isFrozen(records) && records.every(Object.isFrozen), "Karttunen evidence corpus must be frozen");
    assertAudit(records.every(record => (
        record.evidenceRole === "lexical-attestation-only"
        && record.sourceDataset === "karttunen_all CSV supplied 2026-07-16"
        && record.sourceFileName === "karttunen_all - karttunen_all.csv"
        && record.sourceFileSha256 === SOURCE_SHA256
        && record.relationExtractionField === "Karttunen"
        && record.relationExtractionBlock === "raw CSV cell"
        && record.provenanceDisplay === "raw Karttunen column"
        && record.relationExtractionMarker === record.relationLabel
        && record.normalizedTranslationUsed === false
        && record.normalizedTranslationAuthority === false
        && record.normalizationCommit === ""
        && record.relationOriginal === `${record.targetOriginal} ${record.relationLabel} ${record.sourceOriginal}`
        && record.boundaryStatus === "unsegmented-dictionary-notation"
        && record.directionStatus === "source-after-marker-to-derivative-before-marker"
        && record.directionContract === "TARGET marker SOURCE; inventory stores SOURCE -> TARGET"
        && record.quantityStatus === "classical-vowel-quantity-preserved"
        && Array.isArray(record.sourceRowNumbers)
        && record.sourceRowNumbers.length > 0
        && Array.isArray(record.relationLabels)
        && !record.sourceStem.includes("-")
        && !record.targetStem.includes("-")
        && record.grammarAuthority === false
        && record.generationAuthority === false
        && record.targetConstructionAuthority === false
        && record.formulaAuthority === false
        && record.surfaceAuthority === false
    )), "Karttunen evidence provenance, boundary, or non-authority contract drifted");
    assertAudit(noLicense[0].operation === "causative"
        && noLicense[0].sourceRecordId === "karttunen-all:003597:c1"
        && noLicense[0].sourceOriginal === "ĀY(I)"
        && noLicense[0].targetOriginal === "ĀYĪLTIĀ", "Karttunen no-license causative fixture drifted");

    const segmented = getInventory(context, "cā-hua", "A", "specific-projective", "applicative");
    const unsegmented = getInventory(context, "cāhua", "A", "specific-projective", "applicative");
    const quantityFree = getInventory(context, "cahua", "A", "specific-projective", "applicative");
    const causative = getInventory(context, "mayāna", "B", "intransitive", "causative");
    const unmapped = getInventory(context, "āyi", "B", "intransitive", "causative");
    const segmentedEvidence = getAttachedEvidence(segmented);
    const unsegmentedEvidence = getAttachedEvidence(unsegmented);
    const quantityFreeEvidence = getAttachedEvidence(quantityFree);
    const causativeEvidence = getAttachedEvidence(causative);
    const unmappedCorpusMatch = context.getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({
        derivationType: "causative",
        sourceStem: "āyi",
        targetStem: "āyīltiā",
    });

    [segmented, unsegmented, quantityFree, causative, unmapped].forEach(inventory => {
        assertAudit(context.isClassicalNahuatlVncDerivationOptionInventory(inventory), "fixture inventory must remain canonical");
    });
    assertAudit(segmented.options.length === unsegmented.options.length, "boundary handling changed Andrews option count");
    assertAudit(segmented.options[0].ruleId === unsegmented.options[0].ruleId, "boundary handling changed Andrews rule identity");
    assertAudit(segmentedEvidence.length === 1 && unsegmentedEvidence.length === 1, "segmented and unsegmented forms must attach one witness");
    assertAudit(segmentedEvidence[0].sourceRecordId === "karttunen-all:000041:a1" && unsegmentedEvidence[0].sourceRecordId === segmentedEvidence[0].sourceRecordId, "hyphen-insensitive CĀHUILIĀ match failed");
    assertAudit(quantityFree.options.length === unsegmented.options.length
        && quantityFree.options[0].ruleId === unsegmented.options[0].ruleId
        && quantityFreeEvidence.length === 0, "quantity-free spelling must retain Andrews grammar while failing lexical-evidence identity");
    assertAudit(causativeEvidence.length === 1 && causativeEvidence[0].sourceRecordId === "karttunen-all:000973:c1", "MAYĀNALTIĀ causative witness failed");
    assertAudit(unmappedCorpusMatch.length === 1 && unmappedCorpusMatch[0].sourceRecordId === "karttunen-all:003597:c1", "reviewed ĀYĪLTIĀ no-license edge is missing");
    assertAudit(unmapped.options.every(option => option.targetStem.replaceAll("-", "") !== "āyīltiā")
        && getAttachedEvidence(unmapped).every(record => record.sourceRecordId !== unmappedCorpusMatch[0].sourceRecordId), "Karttunen evidence created an Andrews-unlicensed option");

    const evidencedSegmentedOptionIndex = segmented.options.findIndex(option => (
        Array.isArray(option.lexicalEvidenceMatches)
        && option.lexicalEvidenceMatches.length > 0
    ));
    assertAudit(evidencedSegmentedOptionIndex >= 0, "hostile evidence fixture must locate the independently generated witnessed option");
    const forged = JSON.parse(JSON.stringify(segmented));
    forged.options[evidencedSegmentedOptionIndex].lexicalEvidenceMatches[0].generationAuthority = true;
    assertAudit(!context.isClassicalNahuatlVncDerivationOptionInventory(forged), "mutated lexical evidence must invalidate the canonical inventory");

    const nonactive = context.getClassicalNahuatlLesson20NonactiveStemOptions("aqui", {
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const segmentedNonactive = context.getClassicalNahuatlLesson20NonactiveStemOptions("a-qui", {
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const nonactiveRecord = context.deriveClassicalNahuatlLesson20NonactiveStemRecord("aqui", {
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const segmentedNonactiveRecord = context.deriveClassicalNahuatlLesson20NonactiveStemRecord("a-qui", {
        verbClass: "B",
        sourceValence: "intransitive",
    });
    const quantityMarkedNonactive = context.getClassicalNahuatlLesson20NonactiveStemOptions("cāhua", {
        verbClass: "A",
        sourceValence: "specific-projective",
    });
    const quantityFreeNonactive = context.getClassicalNahuatlLesson20NonactiveStemOptions("cahua", {
        verbClass: "A",
        sourceValence: "specific-projective",
    });
    const nonactiveEvidence = getAttachedEvidence(nonactive);
    const segmentedNonactiveEvidence = getAttachedEvidence(segmentedNonactive);
    assertAudit(nonactive.options.length === 1
        && nonactive.options[0].nonactiveStem === "ac-o-hua"
        && nonactiveEvidence.length === 1
        && nonactiveEvidence[0].sourceRecordId === "karttunen-all:000009:n1", "AQU(I) -> ACOHUA nonactive evidence failed");
    assertAudit(segmentedNonactive.options.length === nonactive.options.length
        && segmentedNonactive.options[0].ruleId === nonactive.options[0].ruleId
        && segmentedNonactiveEvidence[0]?.sourceRecordId === nonactiveEvidence[0].sourceRecordId, "nonactive evidence must ignore morpheme-boundary hyphens");
    assertAudit(context.isClassicalNahuatlLesson20NonactiveStemRecord(nonactiveRecord, "aqui")
        && context.isClassicalNahuatlLesson20NonactiveStemRecord(segmentedNonactiveRecord, "a-qui")
        && nonactiveRecord.lexicalEvidenceSignature === nonactive.options[0].lexicalEvidenceSignature, "selected Lesson 20 record must recompute and bind lexical evidence");
    assertAudit(quantityMarkedNonactive.options.length === quantityFreeNonactive.options.length
        && quantityMarkedNonactive.options[0].ruleId === quantityFreeNonactive.options[0].ruleId
        && quantityMarkedNonactive.selectorRequired === quantityFreeNonactive.selectorRequired
        && getAttachedEvidence(quantityMarkedNonactive).length === 1
        && getAttachedEvidence(quantityFreeNonactive).length === 0, "nonactive evidence must preserve quantity without changing Andrews choices");

    const forgedNonactiveEvidence = {
        ...nonactiveRecord,
        lexicalEvidenceMatches: nonactiveRecord.lexicalEvidenceMatches.map((record, index) => index === 0
            ? { ...record, grammarAuthority: true }
            : record),
    };
    const forgedNonactiveSignature = {
        ...nonactiveRecord,
        lexicalEvidenceSignature: "karttunen-1992:v1:forged",
    };
    const removedNonactiveEvidence = {
        ...nonactiveRecord,
        lexicalEvidenceMatches: [],
    };
    assertAudit(!context.isClassicalNahuatlLesson20NonactiveStemRecord(forgedNonactiveEvidence, "aqui")
        && !context.isClassicalNahuatlLesson20NonactiveStemRecord(forgedNonactiveSignature, "aqui")
        && !context.isClassicalNahuatlLesson20NonactiveStemRecord(removedNonactiveEvidence, "aqui"), "hostile Lesson 20 evidence mutations must fail closed");

    return {
        audit: "classical-karttunen-1992-derivation-evidence",
        status: "passed",
        records: records.length,
        confirmedIntersections: confirmed.length,
        applicatives: applicatives.length,
        causatives: causatives.length,
        nonactives: nonactives.length,
        noLicenseFixtures: noLicense.length,
        confirmedFixtures: segmentedEvidence.length + causativeEvidence.length + nonactiveEvidence.length,
        noLicenseFixture: unmappedCorpusMatch[0].sourceRecordId,
        normalizedTranslationUsed: false,
        boundaryMatch: "hyphens-ignored-quantity-preserved",
    };
}

if (require.main === module) {
    runKarttunenEvidenceAudit().then(report => {
        if (process.argv.includes("--summary")) {
            process.stdout.write(`${report.audit}: ${report.status}; ${report.confirmedIntersections} confirmed intersections (${report.applicatives} applicative, ${report.causatives} causative, ${report.nonactives} nonactive) + ${report.noLicenseFixtures} no-license fixture; ${report.boundaryMatch}; Traducción authority ${report.normalizedTranslationUsed}\n`);
            return;
        }
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    }).catch(error => {
        process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
        process.exit(1);
    });
}

module.exports = {
    runKarttunenEvidenceAudit,
};
