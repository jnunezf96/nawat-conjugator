#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { createModuleRuntime } = require("./lib/module_runtime");

const ROOT = path.resolve(__dirname, "..");
const EXPECTED_SOURCE_SHA256 = "5a48f4827eada45f7f3cfb0aea3c47874fe711a542c3c06b395e7bdde5c456bc";
const DEFAULT_OUTPUT_DIR = path.join(ROOT, "reports", "generated", "karttunen_1992_causative_boundaries");
const TOKEN = String.raw`(?:\([AI]\))?[\p{Lu}]+(?:\([AI]\))?`;
const ENTRY_PATTERN = new RegExp(`^\\s*(${TOKEN})`, "u");
const SOURCE_PATTERN = new RegExp(`^\\s*(${TOKEN})`, "u");
const EXPLICIT_TARGET_PATTERN = new RegExp(`(${TOKEN})\\s*\\.?\\s*$`, "u");
const CAUSATIVE_MARKER_PATTERN = new RegExp(`(?:altern\\.\\s*)?caus\\.|\\bcaus\\b(?=\\s+${TOKEN})`, "giu");
const APPLICATIVE_MARKER_PATTERN = new RegExp(`(?:altern\\.\\s*)?applic\\.|\\bapplic\\b(?=\\s+${TOKEN})`, "giu");
const NONACTIVE_MARKER_PATTERN = new RegExp(`(?:altern\\.\\s*)?nonact\\.|\\bnonact\\b(?=\\s+${TOKEN})`, "giu");
const KNOWN_TARGET_ENDINGS = Object.freeze(["HUIĀ", "HUIA", "LTIĀ", "LTĪA", "LTIA", "LIĀ", "LIA", "TĪA", "TIĀ", "TIA"]);
const CAUSATIVE_RECONCILIATION = Object.freeze({
    exclude: Object.freeze([
        Object.freeze(["AQU(I)", "(I)AQUĪTIĀ"]),
        Object.freeze(["NELOĀ", "NELŌLTĪLŌ"]),
        Object.freeze(["TEQUIPACHŌL", "TEQUIPACHŌLMACA"]),
        Object.freeze(["TOCATOCTILIĀ", "TOCTIĀ"]),
    ]),
    add: Object.freeze([
        Object.freeze({ sourceOriginal: "CEPŌHUIY(A)", targetOriginal: "CEPŌHUĪTIĀ", csvRowNumber: 3765, relationLabel: "caus" }),
        Object.freeze({ sourceOriginal: "NELOĀ", targetOriginal: "NELŌLTIĀ", csvRowNumber: 5273, relationLabel: "caus" }),
        Object.freeze({ sourceOriginal: "PĀQU(I)", targetOriginal: "PĀCTIĀ", csvRowNumber: 1800, relationLabel: "altern. caus" }),
        Object.freeze({ sourceOriginal: "TOCA", targetOriginal: "TOCTIĀ", csvRowNumber: 1109, relationLabel: "caus" }),
    ]),
});
const NONACTIVE_RECONCILIATION = Object.freeze({
    exclude: Object.freeze([
        Object.freeze(["NAMACANAMACŌ", "NAMACALŌ"]),
        Object.freeze(["NAMACA", "NAMACANAMACŌ"]),
        Object.freeze(["ĀLTIĀ", "ĀLTIĀ"]),
        Object.freeze(["ĀN(A)", "(A)ĀNŌ"]),
        Object.freeze(["PĀL", "PĀLCHICHĪNALŌ"]),
        Object.freeze(["MŌTLA", "MŌTLAMŌTLALŌ"]),
        Object.freeze(["MOLŌN", "MOLŌNĪLŌ"]),
        Object.freeze(["MOTTIT", "MOTTITĪLŌ"]),
        Object.freeze(["PAYĀNIL", "PAYĀNILĪLŌ"]),
        Object.freeze(["TEH", "TEHTECOPĪNALŌ"]),
    ]),
    add: Object.freeze([
        Object.freeze({ sourceOriginal: "MŌTLA", targetOriginal: "MŌTLALŌ", csvRowNumber: 983, relationLabel: "nonact" }),
        Object.freeze({ sourceOriginal: "NAMACA", targetOriginal: "NAMACALŌ", csvRowNumber: 249, relationLabel: "altern. nonact" }),
        Object.freeze({ sourceOriginal: "PALTILIĀ", targetOriginal: "PALTILĪLŌ", csvRowNumber: 1809, relationLabel: "nonact" }),
        Object.freeze({ sourceOriginal: "PĀL-CHICHĪN(A)", targetOriginal: "PĀLCHICHĪNALŌ", csvRowNumber: 766, relationLabel: "nonact" }),
        Object.freeze({ sourceOriginal: "TEH-TECOPĪN(A)", targetOriginal: "TEHTECOPĪNALŌ", csvRowNumber: 5776, relationLabel: "nonact" }),
        Object.freeze({ sourceOriginal: "TLANCUĀTEHTEQU(I)", targetOriginal: "TLANCUĀTEHTECŌ", csvRowNumber: 3260, relationLabel: "nonact" }),
        Object.freeze({ sourceOriginal: "ĀLTIĀ", targetOriginal: "AHĀLTĪLŌ", csvRowNumber: 611, relationLabel: "redup. nonact" }),
        Object.freeze({ sourceOriginal: "ĀN(A)", targetOriginal: "ĀNŌ", csvRowNumber: 621, relationLabel: "altern. nonact" }),
    ]),
});
const APPLICATIVE_RECONCILIATION = Object.freeze({
    exclude: Object.freeze([
        Object.freeze(["NĀMICTIĀ", "(I)NĀMICTILIĀ"]),
        Object.freeze(["ĀLTIĀ", "ĀLTIĀ"]),
        Object.freeze(["CĒHUIĀ", "CĒHUIĀ"]),
        Object.freeze(["MŌTLAMŌTLALŌ", "MOCHILIĀ"]),
        Object.freeze(["TOCTIĀ", "TOCATOCTILIĀ"]),
        Object.freeze(["YAMĀNIĀ", "YA"]),
        Object.freeze(["(I)LPĪTZ(A)", "(I)LPĪTZ(A)"]),
        Object.freeze(["MALĪN(A)", "MALĪN(A)"]),
        Object.freeze(["MOLŌN", "MOLŌNILIĀ"]),
        Object.freeze(["S", "TLATQUITILIĀ"]),
        Object.freeze(["ĪXTZACU(A)", "ĪXTZACU(A)"]),
        Object.freeze(["MAHU(I)", "MĀHU(A)"]),
        Object.freeze(["MOTTIT", "MOTTITILIĀ"]),
        Object.freeze(["PAYĀNIL", "PAYĀNILILIĀ"]),
        Object.freeze(["TEH", "TEHTECOPĪNILIĀ"]),
        Object.freeze(["TĒM(A)", "TĒMILIĀ"]),
    ]),
    add: Object.freeze([
        Object.freeze({ sourceOriginal: "CUALTI", targetOriginal: "CUALTILIĀ", csvRowNumber: 4080, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "CĒHUIĀ", targetOriginal: "CĒHUILIA", csvRowNumber: 746, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "(I)LPĪTZ(A)", targetOriginal: "(I)LPĪCHILIĀ", csvRowNumber: 1560, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "MAHU(I)", targetOriginal: "MAHUILIĀ", csvRowNumber: 4907, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "MALĪN(A)", targetOriginal: "MALĪNILIA", csvRowNumber: 1654, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "MAN(I)", targetOriginal: "MANILIĀ", csvRowNumber: 230, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "MĪXIHU(I)", targetOriginal: "MĪXIHUILIĀ", csvRowNumber: 1695, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "MŌTLA", targetOriginal: "MOCHILIĀ", csvRowNumber: 983, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "NĀMICTIĀ", targetOriginal: "NĀMICTILIĀ", csvRowNumber: 543, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "PITZĪN(I)", targetOriginal: "PITZĪNILIĀ", csvRowNumber: 5579, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "TEH-TECOPĪN(A)", targetOriginal: "TEHTECOPĪNILIĀ", csvRowNumber: 5776, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "TLATQUITIĀ", targetOriginal: "TLATQUITILIĀ", csvRowNumber: 2209, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "TOCTIĀ", targetOriginal: "TOCTILIĀ", csvRowNumber: 1109, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "TĒM(A)", targetOriginal: "TEMĪA", csvRowNumber: 5847, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "YAMĀNIĀ", targetOriginal: "YAMĀNILIĀ", csvRowNumber: 1521, relationLabel: "applic" }),
        Object.freeze({ sourceOriginal: "ĀLTIĀ", targetOriginal: "AHĀLTILIĀ", csvRowNumber: 611, relationLabel: "redup. applic" }),
        Object.freeze({ sourceOriginal: "ĪXTZACU(A)", targetOriginal: "ĪXTZACUILIĀ", csvRowNumber: 4815, relationLabel: "Applic" }),
    ]),
});
const CANVAS_EXACT_BOUNDARY_RECORDS = Object.freeze([
    Object.freeze({
        sourceKey: "āhuiya",
        targetKey: "āhuiyaltiā",
        targetBoundaryCandidates: Object.freeze(["āhui-ya-l-tiā"]),
        sourceInternalAnalysisCandidates: Object.freeze(["āhui-ya"]),
        andrewsSections: Object.freeze(["25.4.8"]),
        note: "explicit source-preserving root-plus-ya variant",
    }),
    Object.freeze({
        sourceKey: "pīnāhua",
        targetKey: "pīnāuhtiā",
        targetBoundaryCandidates: Object.freeze(["pīn-ā-uh-tiā"]),
        sourceInternalAnalysisCandidates: Object.freeze(["pīn-ā-hua"]),
        andrewsSections: Object.freeze(["25.8"]),
        note: "exact type-two causative witness",
    }),
    Object.freeze({
        sourceKey: "polihui",
        targetKey: "polihuītiā",
        targetBoundaryCandidates: Object.freeze(["pol-i-huī-tiā"]),
        sourceInternalAnalysisCandidates: Object.freeze(["pol-i-hui"]),
        andrewsSections: Object.freeze(["25.2.4"]),
        note: "explicit intransitive destockal i-hui witness",
    }),
    Object.freeze({
        sourceKey: "tlatzihui",
        targetKey: "tlatzihuītiā",
        targetBoundaryCandidates: Object.freeze(["tlatz-i-huī-tiā"]),
        sourceInternalAnalysisCandidates: Object.freeze(["tlatz-i-hui"]),
        andrewsSections: Object.freeze(["25.2.4"]),
        note: "explicit intransitive destockal i-hui witness",
    }),
]);
const PROFILE_MATRIX = Object.freeze(
    ["A", "B", "C", "D"].flatMap(verbClass => ["intransitive", "specific-projective"].map(sourceValence => Object.freeze({
        verbClass,
        sourceValence,
    })))
);

function assertInvariant(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function getCliValue(name, fallback = "") {
    const inline = process.argv.find(argument => argument.startsWith(`${name}=`));
    if (inline) {
        return inline.slice(name.length + 1);
    }
    const index = process.argv.indexOf(name);
    return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function parseCsvRecords(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;
    for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        if (character === '"') {
            if (quoted && text[index + 1] === '"') {
                cell += '"';
                index += 1;
            } else {
                quoted = !quoted;
            }
            continue;
        }
        if (!quoted && character === ",") {
            row.push(cell);
            cell = "";
            continue;
        }
        if (!quoted && (character === "\n" || character === "\r")) {
            if (character === "\r" && text[index + 1] === "\n") {
                index += 1;
            }
            row.push(cell);
            if (row.some(value => value !== "")) {
                rows.push(row);
            }
            row = [];
            cell = "";
            continue;
        }
        cell += character;
    }
    assertInvariant(!quoted, "CSV ended inside a quoted field");
    row.push(cell);
    if (row.some(value => value !== "")) {
        rows.push(row);
    }
    return rows;
}

function normalizeNfc(value = "") {
    return String(value == null ? "" : value).normalize("NFC");
}

function expandDictionaryOptionality(value = "") {
    return normalizeNfc(value).replace(/\(([AI])\)/gu, "$1");
}

function getBoundarylessIdentity(value = "") {
    return expandDictionaryOptionality(value)
        .replace(/[\p{Dash_Punctuation}\s]/gu, "")
        .toLowerCase();
}

function getPairIdentity(source = "", target = "") {
    return `${getBoundarylessIdentity(source)}\u0000${getBoundarylessIdentity(target)}`;
}

function getRawPairIdentity(source = "", target = "") {
    return `${normalizeNfc(source)}\u0000${normalizeNfc(target)}`;
}

function sortKarttunenRelations(relations) {
    return relations.sort((left, right) => (
        getBoundarylessIdentity(left.sourceOriginal).localeCompare(getBoundarylessIdentity(right.sourceOriginal), "en")
        || getBoundarylessIdentity(left.targetOriginal).localeCompare(getBoundarylessIdentity(right.targetOriginal), "en")
        || left.csvRowNumbers[0] - right.csvRowNumbers[0]
    ));
}

function extractKarttunenRelationsByMarker(csvText, markerPattern) {
    const rows = parseCsvRecords(csvText);
    assertInvariant(rows.length > 1, "Karttunen CSV contains no data rows");
    const header = rows[0];
    const karttunenIndex = header.indexOf("Karttunen");
    assertInvariant(karttunenIndex >= 0, "Karttunen CSV is missing the Karttunen column");
    const relationsByRawPair = new Map();
    let acceptedMarkerOccurrences = 0;
    let dottedMarkerOccurrences = 0;
    let bareMarkerOccurrences = 0;

    for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
        const cell = normalizeNfc(rows[rowIndex][karttunenIndex] || "");
        if (!cell) {
            continue;
        }
        const entry = cell.match(ENTRY_PATTERN)?.[1] || "";
        markerPattern.lastIndex = 0;
        let markerMatch;
        while ((markerMatch = markerPattern.exec(cell)) !== null) {
            const source = cell.slice(markerMatch.index + markerMatch[0].length).match(SOURCE_PATTERN)?.[1] || "";
            let target = cell.slice(0, markerMatch.index).match(EXPLICIT_TARGET_PATTERN)?.[1] || "";
            if (target.replace(/[()]/gu, "").length <= 1) {
                target = "";
            }
            target = target || entry;
            if (!source || !target) {
                continue;
            }
            acceptedMarkerOccurrences += 1;
            if (/\./u.test(markerMatch[0])) {
                dottedMarkerOccurrences += 1;
            } else {
                bareMarkerOccurrences += 1;
            }
            const relationKey = getRawPairIdentity(source, target);
            const existing = relationsByRawPair.get(relationKey) || {
                sourceOriginal: source,
                targetOriginal: target,
                csvRowNumbers: [],
                relationLabels: [],
                occurrenceCount: 0,
            };
            const logicalRowNumber = rowIndex + 1;
            if (!existing.csvRowNumbers.includes(logicalRowNumber)) {
                existing.csvRowNumbers.push(logicalRowNumber);
            }
            const relationLabel = markerMatch[0].trim().replace(/\s+/gu, " ");
            if (!existing.relationLabels.includes(relationLabel)) {
                existing.relationLabels.push(relationLabel);
            }
            existing.occurrenceCount += 1;
            relationsByRawPair.set(relationKey, existing);
        }
    }

    const relations = sortKarttunenRelations(Array.from(relationsByRawPair.values()).map(relation => Object.freeze({
        ...relation,
        csvRowNumbers: Object.freeze([...relation.csvRowNumbers].sort((left, right) => left - right)),
        relationLabels: Object.freeze([...relation.relationLabels].sort()),
    })));

    return Object.freeze({
        logicalCsvRowsIncludingHeader: rows.length,
        acceptedMarkerOccurrences,
        dottedMarkerOccurrences,
        bareMarkerOccurrences,
        relations: Object.freeze(relations),
    });
}

function reconcileKarttunenRelations(extraction, csvText, reconciliation, operation) {
    const rows = parseCsvRecords(csvText);
    const excluded = new Set(reconciliation.exclude.map(([source, target]) => getRawPairIdentity(source, target)));
    const excludedRelations = extraction.relations.filter(relation => excluded.has(getRawPairIdentity(relation.sourceOriginal, relation.targetOriginal)));
    assertInvariant(excludedRelations.length === reconciliation.exclude.length, `${operation} reconciliation exclusions drifted: expected ${reconciliation.exclude.length}, found ${excludedRelations.length}`);
    const retained = extraction.relations.filter(relation => !excluded.has(getRawPairIdentity(relation.sourceOriginal, relation.targetOriginal)));
    const retainedKeys = new Set(retained.map(relation => getRawPairIdentity(relation.sourceOriginal, relation.targetOriginal)));
    const repaired = reconciliation.add.map(repair => {
        const cell = normalizeNfc(rows[repair.csvRowNumber - 1]?.[rows[0].indexOf("Karttunen")] || "");
        assertInvariant(cell.includes(repair.sourceOriginal) && cell.includes(repair.targetOriginal), `${operation} repair row ${repair.csvRowNumber} no longer contains ${repair.sourceOriginal} and ${repair.targetOriginal}`);
        const identity = getRawPairIdentity(repair.sourceOriginal, repair.targetOriginal);
        assertInvariant(!retainedKeys.has(identity), `${operation} repair ${repair.sourceOriginal} -> ${repair.targetOriginal} is already present`);
        retainedKeys.add(identity);
        return Object.freeze({
            sourceOriginal: repair.sourceOriginal,
            targetOriginal: repair.targetOriginal,
            csvRowNumbers: Object.freeze([repair.csvRowNumber]),
            relationLabels: Object.freeze([repair.relationLabel]),
            occurrenceCount: 1,
            reconciliation: "source-row-scoped-conservative-repair",
        });
    });
    return Object.freeze({
        ...extraction,
        genericUniqueRelations: extraction.relations.length,
        reconciliation: Object.freeze({
            operation,
            excludedPairs: reconciliation.exclude.length,
            repairedPairs: reconciliation.add.length,
        }),
        relations: Object.freeze(sortKarttunenRelations([...retained, ...repaired])),
    });
}

function extractKarttunenCausativeRelations(csvText) {
    return reconcileKarttunenRelations(
        extractKarttunenRelationsByMarker(csvText, CAUSATIVE_MARKER_PATTERN),
        csvText,
        CAUSATIVE_RECONCILIATION,
        "causative"
    );
}

function extractKarttunenApplicativeRelations(csvText) {
    return reconcileKarttunenRelations(
        extractKarttunenRelationsByMarker(csvText, APPLICATIVE_MARKER_PATTERN),
        csvText,
        APPLICATIVE_RECONCILIATION,
        "applicative"
    );
}

function extractKarttunenNonactiveRelations(csvText) {
    return reconcileKarttunenRelations(
        extractKarttunenRelationsByMarker(csvText, NONACTIVE_MARKER_PATTERN),
        csvText,
        NONACTIVE_RECONCILIATION,
        "nonactive"
    );
}

function getKarttunenAlignment(relation) {
    const source = expandDictionaryOptionality(relation.sourceOriginal).replace(/[\p{Dash_Punctuation}\s]/gu, "");
    const target = expandDictionaryOptionality(relation.targetOriginal).replace(/[\p{Dash_Punctuation}\s]/gu, "");
    const exactSourcePrefix = Boolean(source && target.startsWith(source));
    const tail = exactSourcePrefix ? target.slice(source.length) : "";
    const coreType = tail === "LTIĀ"
        ? "exact-source-plus-ltia"
        : tail === "TIĀ"
            ? "exact-source-plus-tia"
            : "";
    const editFrontier = getRightEdgeEdit(relation);
    return Object.freeze({
        exactSourcePrefix,
        sourceRightEdgeEditDepth: editFrontier.sourceEditDepth,
        tail,
        coreType,
        alignmentEdge: coreType ? `${source}|${tail}` : "",
        knownCausativeEnding: KNOWN_TARGET_ENDINGS.find(ending => target.endsWith(ending)) || "",
        editFrontier,
    });
}

function getAlignmentBoundaryHypothesis(relation, alignment = getKarttunenAlignment(relation)) {
    if (!alignment.coreType) {
        return "";
    }
    const source = expandDictionaryOptionality(relation.sourceOriginal)
        .replace(/[\p{Dash_Punctuation}\s]/gu, "")
        .toLowerCase();
    return alignment.coreType === "exact-source-plus-ltia"
        ? `${source}-l-tiā`
        : `${source}-tiā`;
}

function getCanvasExactBoundaryRecord(relation) {
    const sourceKey = getBoundarylessIdentity(relation.sourceOriginal);
    const targetKey = getBoundarylessIdentity(relation.targetOriginal);
    return CANVAS_EXACT_BOUNDARY_RECORDS.find(record => record.sourceKey === sourceKey && record.targetKey === targetKey) || null;
}

function getRightEdgeEdit(relation) {
    const source = getBoundarylessIdentity(relation.sourceOriginal);
    const target = getBoundarylessIdentity(relation.targetOriginal);
    const sourceLetters = Array.from(source);
    const targetLetters = Array.from(target);
    let commonPrefixLength = 0;
    while (commonPrefixLength < sourceLetters.length && commonPrefixLength < targetLetters.length && sourceLetters[commonPrefixLength] === targetLetters[commonPrefixLength]) {
        commonPrefixLength += 1;
    }
    const commonPrefix = sourceLetters.slice(0, commonPrefixLength).join("");
    const sourceRemoved = sourceLetters.slice(commonPrefixLength).join("");
    const targetAdded = targetLetters.slice(commonPrefixLength).join("");
    return Object.freeze({
        commonPrefix,
        commonPrefixLength,
        sourceRemoved,
        targetAdded,
        sourceEditDepth: sourceLetters.length - commonPrefixLength,
        signature: `${sourceRemoved}→${targetAdded}`,
    });
}

function getBoundaryPositions(segmentedValue = "") {
    const positions = [];
    let position = 0;
    for (const character of Array.from(normalizeNfc(segmentedValue))) {
        if (/^[\p{Dash_Punctuation}]$/u.test(character)) {
            if (position > 0 && !positions.includes(position)) {
                positions.push(position);
            }
            continue;
        }
        if (!/\s/u.test(character)) {
            position += 1;
        }
    }
    return positions;
}

function applyBoundaryOffsets(targetOriginal, boundaryOffsets) {
    const targetLetters = Array.from(getBoundarylessIdentity(targetOriginal));
    const insertionPositions = new Set(boundaryOffsets.map(offset => targetLetters.length - offset).filter(position => position > 0 && position < targetLetters.length));
    return targetLetters.map((letter, index) => `${insertionPositions.has(index) ? "-" : ""}${letter}`).join("");
}

function buildAndrewsAnchoredEditTemplates(relations, projectionByPair) {
    const templates = new Map();
    relations.forEach(relation => {
        const pairIdentity = getPairIdentity(relation.sourceOriginal, relation.targetOriginal);
        const projection = projectionByPair.get(pairIdentity) || null;
        const canvasRecord = getCanvasExactBoundaryRecord(relation);
        const candidates = projection?.targetBoundaryCandidates?.length
            ? projection.targetBoundaryCandidates
            : canvasRecord?.targetBoundaryCandidates || [];
        if (candidates.length !== 1) {
            return;
        }
        const edit = getRightEdgeEdit(relation);
        const targetLength = Array.from(getBoundarylessIdentity(relation.targetOriginal)).length;
        const boundaryOffsets = getBoundaryPositions(candidates[0])
            .filter(position => position >= edit.commonPrefixLength)
            .map(position => targetLength - position)
            .filter(offset => offset > 0)
            .sort((left, right) => right - left);
        if (!boundaryOffsets.length) {
            return;
        }
        const template = templates.get(edit.signature) || {
            vectors: new Map(),
            anchors: [],
        };
        const vectorKey = boundaryOffsets.join(",");
        template.vectors.set(vectorKey, boundaryOffsets);
        template.anchors.push(Object.freeze({
            sourceOriginal: relation.sourceOriginal,
            targetOriginal: relation.targetOriginal,
            targetBoundary: candidates[0],
            evidence: projection?.targetBoundaryCandidates?.length ? "current-andrews-projection" : "exact-canvas-witness",
        }));
        templates.set(edit.signature, template);
    });
    return new Map(Array.from(templates.entries()).map(([signature, template]) => [signature, Object.freeze({
        signature,
        unambiguous: template.vectors.size === 1,
        boundaryOffsets: Object.freeze(template.vectors.size === 1 ? [...template.vectors.values()][0] : []),
        anchors: Object.freeze(template.anchors),
    })]));
}

function getAnchoredEditHypothesis(relation, template) {
    if (!template?.unambiguous || !template.boundaryOffsets.length) {
        return null;
    }
    const targetBoundary = applyBoundaryOffsets(relation.targetOriginal, template.boundaryOffsets);
    if (getBoundarylessIdentity(targetBoundary) !== getBoundarylessIdentity(relation.targetOriginal)) {
        return null;
    }
    return Object.freeze({
        targetBoundary,
        editSignature: template.signature,
        boundaryOffsetsFromRight: template.boundaryOffsets,
        anchorCount: template.anchors.length,
        anchors: template.anchors,
        evidenceTier: "andrews-exact-edit-signature",
        authority: "none; transfers only a boundary vector, never source analysis or route selection",
    });
}

function getDestockalHuiCompatibilityHypothesis(relation) {
    const source = getBoundarylessIdentity(relation.sourceOriginal);
    const target = getBoundarylessIdentity(relation.targetOriginal);
    const sourceMatch = source.match(/^(.*)([ia])hui$/u);
    if (!sourceMatch || target !== `${source.slice(0, -1)}ītiā`) {
        return null;
    }
    const [, root, stockVowel] = sourceMatch;
    if (!root) {
        return null;
    }
    return Object.freeze({
        targetBoundary: `${root}-${stockVowel}-huī-tiā`,
        sourceAnalysisHypothesis: `${root}-${stockVowel}-hui`,
        templateId: "L25-DESTOCKAL-I-A-HUI-TIA-COMPATIBILITY",
        andrewsSections: Object.freeze(["25.2.4"]),
        typedPrerequisite: "intransitive destockal-i-a-o-hui source analysis",
        evidenceTier: "canvas-category-plus-karttunen-pair",
        authority: "none until the typed source analysis and lexical selection are licensed",
    });
}

function getCanonicalCanvasSourceAnalysis(sourceKey) {
    const analyses = CANVAS_EXACT_BOUNDARY_RECORDS
        .filter(record => record.sourceKey === sourceKey)
        .flatMap(record => record.sourceInternalAnalysisCandidates || []);
    return Array.from(new Set(analyses)).sort()[0] || "";
}

function getNonactiveFamilyMatches(relation, nonactiveRelations) {
    const targetKey = getBoundarylessIdentity(relation.targetOriginal);
    const sourceKey = getBoundarylessIdentity(relation.sourceOriginal);
    const canonicalSourceAnalysis = getCanonicalCanvasSourceAnalysis(sourceKey);
    const matches = [];
    nonactiveRelations.forEach(nonactive => {
        const nonactiveKey = getBoundarylessIdentity(nonactive.targetOriginal);
        const candidates = [];
        if (nonactiveKey.endsWith("lō")) {
            const base = nonactiveKey.slice(0, -2);
            const segmentedBase = canonicalSourceAnalysis && getBoundarylessIdentity(canonicalSourceAnalysis) === base ? canonicalSourceAnalysis : base;
            candidates.push({
                family: "lō",
                predictedTargetKey: `${base}ltiā`,
                targetBoundary: `${segmentedBase}-l-tiā`,
                hiddenNonactiveBoundary: `${segmentedBase}-lō`,
                andrewsSection: "25.4",
            });
        } else if (nonactiveKey.endsWith("ō")) {
            const base = nonactiveKey.slice(0, -1);
            candidates.push({
                family: "ō",
                predictedTargetKey: `${base}tiā`,
                targetBoundary: `${base}-tiā`,
                hiddenNonactiveBoundary: `${base}-ō`,
                andrewsSection: "25.3",
            });
        }
        if (nonactiveKey.endsWith("ohua")) {
            const base = nonactiveKey.slice(0, -4);
            candidates.push({
                family: "o-hua",
                predictedTargetKey: `${base}tiā`,
                targetBoundary: `${base}-tiā`,
                hiddenNonactiveBoundary: `${base}-o-hua`,
                andrewsSection: "25.3",
            });
        }
        if (nonactiveKey.endsWith("hua")) {
            const base = nonactiveKey.slice(0, -3);
            candidates.push({
                family: "hua",
                predictedTargetKey: `${base}tiā`,
                targetBoundary: `${base}-tiā`,
                hiddenNonactiveBoundary: `${base}-hua`,
                andrewsSection: "25.2",
            });
        }
        candidates.filter(candidate => candidate.predictedTargetKey === targetKey).forEach(candidate => {
            matches.push(Object.freeze({
                ...candidate,
                sourceOriginal: relation.sourceOriginal,
                targetOriginal: relation.targetOriginal,
                nonactiveTargetOriginal: nonactive.targetOriginal,
                nonactiveCsvRowNumbers: nonactive.csvRowNumbers,
                evidenceTier: "karttunen-nonactive-corroborated-andrews-family",
                authority: "none; the structured relation corroborates a family transform but does not license it",
            }));
        });
    });
    const byIdentity = new Map(matches.map(match => [`${match.family}\u0000${match.nonactiveTargetOriginal}\u0000${match.targetBoundary}`, match]));
    return Object.freeze(Array.from(byIdentity.values()).sort((left, right) => left.family.localeCompare(right.family) || left.nonactiveTargetOriginal.localeCompare(right.nonactiveTargetOriginal)));
}

function buildSourceFrame(context, stem, { verbClass, sourceValence }) {
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

function getProjectionCandidate(inventory, option, profile, evidenceRecord) {
    const sourceAnalysis = option.sourceAnalysisId
        ? inventory.sourceAnalysisFrame?.analyses?.find(analysis => analysis.analysisId === option.sourceAnalysisId) || null
        : null;
    const segmentedTarget = option.targetStem;
    const targetMatches = getBoundarylessIdentity(segmentedTarget) === getBoundarylessIdentity(evidenceRecord.targetStem);
    const evidenceAttached = (option.lexicalEvidenceMatches || []).some(record => record.sourceRecordId === evidenceRecord.sourceRecordId);
    return Object.freeze({
        segmentedTarget,
        targetMatches,
        evidenceAttached,
        ruleId: option.ruleId || "",
        derivationRoute: option.derivationRoute || "",
        procedure: option.procedure || "",
        andrewsSection: option.andrewsSection || "",
        sourceAnalysisId: option.sourceAnalysisId || "",
        sourceSegments: Object.freeze(sourceAnalysis?.segments ? [...sourceAnalysis.segments] : []),
        hiddenNonactiveStem: option.lesson20NonactiveStemRecord?.nonactiveStem || option.licensedLesson20NonactiveStem || "",
        hiddenNonactiveFamily: option.lesson20NonactiveStemRecord?.suffixFamily || option.licensedLesson20SuffixFamily || "",
        targetConstruction: option.targetConstruction ? Object.freeze({
            operation: option.targetConstruction.operation || "",
            remove: option.targetConstruction.remove || "",
            add: option.targetConstruction.add || "",
            nonactiveStem: option.targetConstruction.nonactiveStem || "",
        }) : null,
        profile: Object.freeze({ ...profile }),
    });
}

function dedupeProjectionCandidates(candidates) {
    const byIdentity = new Map();
    candidates.forEach(candidate => {
        const identity = [
            candidate.segmentedTarget,
            candidate.ruleId,
            candidate.derivationRoute,
            candidate.sourceAnalysisId,
            candidate.hiddenNonactiveStem,
        ].join("\u0000");
        const existing = byIdentity.get(identity);
        if (existing) {
            existing.profiles.push(candidate.profile);
            existing.evidenceAttached = existing.evidenceAttached || candidate.evidenceAttached;
            return;
        }
        byIdentity.set(identity, {
            ...candidate,
            profiles: [candidate.profile],
        });
    });
    return Array.from(byIdentity.values()).map(candidate => Object.freeze({
        ...candidate,
        profiles: Object.freeze(candidate.profiles.sort((left, right) => (
            left.verbClass.localeCompare(right.verbClass) || left.sourceValence.localeCompare(right.sourceValence)
        ))),
    })).sort((left, right) => (
        left.segmentedTarget.localeCompare(right.segmentedTarget, "en")
        || left.ruleId.localeCompare(right.ruleId, "en")
        || left.derivationRoute.localeCompare(right.derivationRoute, "en")
    ));
}

async function replayCurrentAndrewsCausatives() {
    const { context } = await createModuleRuntime({ rootDir: ROOT });
    const evidenceInventory = context.getClassicalNahuatlKarttunen1992DerivationEvidenceInventory();
    const confirmed = evidenceInventory.filter(record => record.operation === "causative" && record.runtimeIntersectionStatus === "confirmed-current-andrews-output");
    const noLicense = evidenceInventory.filter(record => record.operation === "causative" && record.runtimeIntersectionStatus === "explicit-edge-no-current-andrews-overlap");
    const projections = [];

    for (const evidenceRecord of confirmed) {
        const matches = [];
        for (const profile of PROFILE_MATRIX) {
            const sourceFrame = buildSourceFrame(context, evidenceRecord.sourceStem, profile);
            const inventory = context.getClassicalNahuatlVncDerivationOptionInventory(sourceFrame, { derivationType: "causative" });
            for (const option of inventory.options || []) {
                if (getBoundarylessIdentity(option.targetStem) === getBoundarylessIdentity(evidenceRecord.targetStem)) {
                    matches.push(getProjectionCandidate(inventory, option, profile, evidenceRecord));
                }
            }
        }
        const candidates = dedupeProjectionCandidates(matches);
        const targetBoundaryCandidates = Array.from(new Set(candidates.map(candidate => candidate.segmentedTarget))).sort();
        const routeCandidates = Array.from(new Set(candidates.map(candidate => candidate.derivationRoute))).filter(Boolean).sort();
        const status = targetBoundaryCandidates.length === 0
            ? "no-andrews-projection"
            : targetBoundaryCandidates.length > 1
                ? "boundary-ambiguous"
                : routeCandidates.length > 1
                    ? "route-ambiguous-boundary-stable"
                    : "unique-projection";
        projections.push(Object.freeze({
            sourceRecordId: evidenceRecord.sourceRecordId,
            sourceOriginal: evidenceRecord.sourceOriginal,
            targetOriginal: evidenceRecord.targetOriginal,
            pairIdentity: getPairIdentity(evidenceRecord.sourceOriginal, evidenceRecord.targetOriginal),
            status,
            targetBoundaryCandidates: Object.freeze(targetBoundaryCandidates),
            routeCandidates: Object.freeze(routeCandidates),
            candidates: Object.freeze(candidates),
        }));
    }

    return Object.freeze({
        confirmed: Object.freeze(confirmed),
        noLicense: Object.freeze(noLicense),
        projections: Object.freeze(projections),
    });
}

function summarizeRawRelations(relations) {
    const bySource = new Map();
    relations.forEach(relation => {
        const sourceKey = getBoundarylessIdentity(relation.sourceOriginal);
        const values = bySource.get(sourceKey) || [];
        values.push(relation);
        bySource.set(sourceKey, values);
    });
    const multiTargetGroups = Array.from(bySource.values()).filter(values => values.length > 1);
    const alignments = relations.map(relation => getKarttunenAlignment(relation));
    const coreRelations = relations.filter(relation => getKarttunenAlignment(relation).coreType);
    const coreSingleTarget = coreRelations.filter(relation => (bySource.get(getBoundarylessIdentity(relation.sourceOriginal)) || []).length === 1);
    return Object.freeze({
        uniqueSources: bySource.size,
        multiTargetSources: multiTargetGroups.length,
        multiTargetPairs: multiTargetGroups.reduce((sum, values) => sum + values.length, 0),
        exactSourcePrefix: alignments.filter(alignment => alignment.exactSourcePrefix).length,
        exactSourcePlusLtia: alignments.filter(alignment => alignment.coreType === "exact-source-plus-ltia").length,
        exactSourcePlusTia: alignments.filter(alignment => alignment.coreType === "exact-source-plus-tia").length,
        coreExactPrefix: coreRelations.length,
        coreSingleTarget: coreSingleTarget.length,
        coreMultiTarget: coreRelations.length - coreSingleTarget.length,
        rightEdgeEditDepthAtMostTwo: alignments.filter(alignment => alignment.sourceRightEdgeEditDepth <= 2).length,
        knownTargetEnding: alignments.filter(alignment => alignment.knownCausativeEnding).length,
        sourceTargetCounts: bySource,
    });
}

function buildReport(sourcePath, sourceSha256, extraction, nonactiveExtraction, runtimeReplay) {
    const rawSummary = summarizeRawRelations(extraction.relations);
    const projectionByPair = new Map(runtimeReplay.projections.map(projection => [projection.pairIdentity, projection]));
    const confirmedByPair = new Map(runtimeReplay.confirmed.map(record => [getPairIdentity(record.sourceOriginal, record.targetOriginal), record]));
    const noLicenseByPair = new Map(runtimeReplay.noLicense.map(record => [getPairIdentity(record.sourceOriginal, record.targetOriginal), record]));
    const nonactiveBySource = new Map();
    nonactiveExtraction.relations.forEach(relation => {
        const sourceKey = getBoundarylessIdentity(relation.sourceOriginal);
        const values = nonactiveBySource.get(sourceKey) || [];
        values.push(relation);
        nonactiveBySource.set(sourceKey, values);
    });
    const anchoredEditTemplates = buildAndrewsAnchoredEditTemplates(extraction.relations, projectionByPair);
    const records = extraction.relations.map(relation => {
        const pairIdentity = getPairIdentity(relation.sourceOriginal, relation.targetOriginal);
        const alignment = getKarttunenAlignment(relation);
        const editFrontier = getRightEdgeEdit(relation);
        const projection = projectionByPair.get(pairIdentity) || null;
        const canvasExactRecord = getCanvasExactBoundaryRecord(relation);
        const confirmedRecord = confirmedByPair.get(pairIdentity) || null;
        const noLicenseRecord = noLicenseByPair.get(pairIdentity) || null;
        const sourceKey = getBoundarylessIdentity(relation.sourceOriginal);
        const sourceTargetCount = rawSummary.sourceTargetCounts.get(sourceKey)?.length || 0;
        const sameSourceNonactiveRelations = nonactiveBySource.get(sourceKey) || [];
        const nonactiveCorroboration = getNonactiveFamilyMatches(relation, sameSourceNonactiveRelations);
        const anchoredEditHypothesis = getAnchoredEditHypothesis(relation, anchoredEditTemplates.get(editFrontier.signature));
        const destockalHuiCompatibility = getDestockalHuiCompatibilityHypothesis(relation);
        const alignmentBoundaryHypothesis = getAlignmentBoundaryHypothesis(relation, alignment);
        const targetBoundaryCandidates = Array.from(new Set([
            ...(projection?.targetBoundaryCandidates || []),
            ...(canvasExactRecord?.targetBoundaryCandidates || []),
        ])).sort();
        const hypothesisEvidenceByBoundary = new Map();
        const addHypothesisEvidence = (targetBoundary, support) => {
            if (!targetBoundary || targetBoundaryCandidates.length > 0) {
                return;
            }
            const supports = hypothesisEvidenceByBoundary.get(targetBoundary) || [];
            supports.push(Object.freeze(support));
            hypothesisEvidenceByBoundary.set(targetBoundary, supports);
        };
        nonactiveCorroboration.forEach(match => addHypothesisEvidence(match.targetBoundary, {
            evidenceTier: match.evidenceTier,
            family: match.family,
            nonactiveTargetOriginal: match.nonactiveTargetOriginal,
            hiddenNonactiveBoundary: match.hiddenNonactiveBoundary,
            andrewsSection: match.andrewsSection,
        }));
        if (destockalHuiCompatibility) {
            addHypothesisEvidence(destockalHuiCompatibility.targetBoundary, destockalHuiCompatibility);
        }
        if (anchoredEditHypothesis) {
            addHypothesisEvidence(anchoredEditHypothesis.targetBoundary, anchoredEditHypothesis);
        }
        if (alignmentBoundaryHypothesis) {
            addHypothesisEvidence(alignmentBoundaryHypothesis, {
                evidenceTier: "exact-source-tail-alignment",
                alignmentType: alignment.coreType,
                authority: "none; exact spelling continuation does not select an Andrews route",
            });
        }
        const targetBoundaryHypotheses = Array.from(hypothesisEvidenceByBoundary.keys()).sort();
        const boundaryHypothesisEvidence = Object.freeze(targetBoundaryHypotheses.map(targetBoundary => Object.freeze({
            targetBoundary,
            supports: Object.freeze(hypothesisEvidenceByBoundary.get(targetBoundary)),
        })));
        const status = projection?.targetBoundaryCandidates?.length
            ? "andrews-exact"
            : canvasExactRecord
                ? "andrews-canvas-exact-runtime-gap"
            : projection?.status === "boundary-ambiguous"
                ? "ambiguous"
                : nonactiveCorroboration.length
                    ? "karttunen-nonactive-corroborated"
                    : destockalHuiCompatibility
                        ? "canvas-compatibility-hypothesis"
                        : anchoredEditHypothesis
                            ? "andrews-anchored-edit-hypothesis"
                            : alignment.coreType
                    ? "suffix-alignment-hypothesis"
                                : alignment.knownCausativeEnding
                                    ? "edit-frontier-only"
                                    : "unresolved";
        const sourceInternalAnalysisCandidates = Array.from(new Set([
            ...(projection?.candidates || []).map(candidate => candidate.sourceSegments.join("-")).filter(Boolean),
            ...(canvasExactRecord?.sourceInternalAnalysisCandidates || []),
        ])).sort();
        const hiddenNonactiveCandidates = Array.from(new Set([
            ...(projection?.candidates || []).map(candidate => candidate.hiddenNonactiveStem).filter(Boolean),
            ...nonactiveCorroboration.map(match => match.hiddenNonactiveBoundary),
        ])).sort();
        const projectedSourceValences = Array.from(new Set((projection?.candidates || []).flatMap(candidate => (
            candidate.profiles || (candidate.profile ? [candidate.profile] : [])
        )).map(profile => profile.sourceValence).filter(Boolean))).sort();
        const destockalHuiValenceAudit = destockalHuiCompatibility ? Object.freeze({
            requiredSourceValence: "intransitive",
            projectedSourceValences: Object.freeze(projectedSourceValences),
            intransitiveProjectionPresent: projectedSourceValences.includes("intransitive"),
            transitiveOnlyProjection: Boolean(projectedSourceValences.length) && !projectedSourceValences.includes("intransitive"),
            note: "Canvas 25.2.4 requires the destockal i/a-hui source to be intransitive; a transitive-only spelling match is not equivalent authority",
        }) : null;
        return Object.freeze({
            csvRowNumbers: relation.csvRowNumbers,
            sourceOriginal: relation.sourceOriginal,
            targetOriginal: relation.targetOriginal,
            sourceBoundarylessKey: getBoundarylessIdentity(relation.sourceOriginal),
            targetBoundarylessKey: getBoundarylessIdentity(relation.targetOriginal),
            relationLabels: relation.relationLabels,
            sourceTargetCount,
            sourceHasMultipleKarttunenTargets: sourceTargetCount > 1,
            alignment,
            editFrontier: Object.freeze({
                ...editFrontier,
                targetEndingFamily: alignment.knownCausativeEnding,
                interpretation: "orthographic edit frontier only; deleted and inserted spans are not morphemes",
            }),
            status,
            targetBoundaryCandidates: Object.freeze(targetBoundaryCandidates),
            targetBoundaryHypotheses: Object.freeze(targetBoundaryHypotheses),
            boundaryHypothesisEvidence,
            hypothesisAuthority: "none; hypotheses cannot validate a derivation or add a runtime option",
            sourceInternalAnalysisCandidates: Object.freeze(sourceInternalAnalysisCandidates),
            sourceInternalAnalysisHypotheses: Object.freeze(destockalHuiCompatibility?.sourceAnalysisHypothesis ? [destockalHuiCompatibility.sourceAnalysisHypothesis] : []),
            hiddenNonactiveCandidates: Object.freeze(hiddenNonactiveCandidates),
            nonactiveCorroboration,
            sameSourceNonactiveRelations: Object.freeze(sameSourceNonactiveRelations.map(nonactive => Object.freeze({
                sourceOriginal: nonactive.sourceOriginal,
                targetOriginal: nonactive.targetOriginal,
                csvRowNumbers: nonactive.csvRowNumbers,
            }))),
            anchoredEditHypothesis,
            destockalHuiCompatibility,
            destockalHuiValenceAudit,
            canvasExactEvidence: canvasExactRecord,
            andrewsProjectionStatus: projection?.status || (canvasExactRecord ? "exact-canvas-witness-runtime-gap" : "no-andrews-projection"),
            andrewsCandidates: projection?.candidates || Object.freeze([]),
            runtimeOverlapStatus: confirmedRecord?.runtimeIntersectionStatus || noLicenseRecord?.runtimeIntersectionStatus || "outside-runtime-index",
            runtimeSourceRecordId: confirmedRecord?.sourceRecordId || noLicenseRecord?.sourceRecordId || "",
            roundTripProof: Object.freeze({
                rawTargetIdentity: getBoundarylessIdentity(relation.targetOriginal),
                everyProjectedTargetMatches: Boolean(targetBoundaryCandidates.length) && targetBoundaryCandidates.every(candidate => getBoundarylessIdentity(candidate) === getBoundarylessIdentity(relation.targetOriginal)),
                everyHypothesizedTargetMatches: Boolean(targetBoundaryHypotheses.length) && targetBoundaryHypotheses.every(candidate => getBoundarylessIdentity(candidate) === getBoundarylessIdentity(relation.targetOriginal)),
            }),
            authority: Object.freeze({
                grammar: false,
                generation: false,
                targetConstruction: false,
                selection: false,
                formula: false,
                surface: false,
            }),
        });
    });

    const projected = runtimeReplay.projections.filter(projection => projection.targetBoundaryCandidates.length > 0);
    const routeAmbiguous = runtimeReplay.projections.filter(projection => projection.status === "route-ambiguous-boundary-stable");
    const boundaryAmbiguous = runtimeReplay.projections.filter(projection => projection.status === "boundary-ambiguous");
    const unresolvedConfirmed = runtimeReplay.projections.filter(projection => projection.status === "no-andrews-projection");
    const nonactiveFamilyCounts = Object.freeze(Object.fromEntries(["hua", "lō", "o-hua", "ō"].map(family => [
        family,
        records.filter(record => record.nonactiveCorroboration.some(match => match.family === family)).length,
    ])));
    const summary = Object.freeze({
        rawCausativeRelations: extraction.relations.length,
        genericCausativeRelationsBeforeReconciliation: extraction.genericUniqueRelations,
        causativeReconciliationExcluded: extraction.reconciliation.excludedPairs,
        causativeReconciliationRepaired: extraction.reconciliation.repairedPairs,
        reconciledNonactiveRelations: nonactiveExtraction.relations.length,
        genericNonactiveRelationsBeforeReconciliation: nonactiveExtraction.genericUniqueRelations,
        nonactiveReconciliationExcluded: nonactiveExtraction.reconciliation.excludedPairs,
        nonactiveReconciliationRepaired: nonactiveExtraction.reconciliation.repairedPairs,
        acceptedMarkerOccurrences: extraction.acceptedMarkerOccurrences,
        dottedMarkerOccurrences: extraction.dottedMarkerOccurrences,
        bareMarkerOccurrences: extraction.bareMarkerOccurrences,
        uniqueSources: rawSummary.uniqueSources,
        multiTargetSources: rawSummary.multiTargetSources,
        multiTargetPairs: rawSummary.multiTargetPairs,
        exactSourcePrefix: rawSummary.exactSourcePrefix,
        exactSourcePlusLtia: rawSummary.exactSourcePlusLtia,
        exactSourcePlusTia: rawSummary.exactSourcePlusTia,
        coreExactPrefix: rawSummary.coreExactPrefix,
        coreSingleTarget: rawSummary.coreSingleTarget,
        coreMultiTarget: rawSummary.coreMultiTarget,
        recordsWithBoundaryHypotheses: records.filter(record => record.targetBoundaryHypotheses.length > 0).length,
        suffixAlignmentHypotheses: records.filter(record => record.boundaryHypothesisEvidence.some(evidence => evidence.supports.some(support => support.evidenceTier === "exact-source-tail-alignment"))).length,
        alignmentOnlyHypotheses: records.filter(record => record.status === "suffix-alignment-hypothesis").length,
        andrewsAnchoredEditHypotheses: records.filter(record => record.anchoredEditHypothesis && record.targetBoundaryCandidates.length === 0).length,
        destockalHuiCompatibilityPairs: records.filter(record => record.destockalHuiCompatibility).length,
        destockalHuiTransitiveOnlyRuntimeMatches: records.filter(record => record.destockalHuiValenceAudit?.transitiveOnlyProjection).length,
        canvasExactRuntimeGaps: records.filter(record => record.status === "andrews-canvas-exact-runtime-gap").length,
        exactBoundaryRecordsIncludingCanvas: records.filter(record => record.targetBoundaryCandidates.length > 0).length,
        recordsWithAnyBoundaryProjection: records.filter(record => record.targetBoundaryCandidates.length > 0 || record.targetBoundaryHypotheses.length > 0).length,
        editFrontierOnly: records.filter(record => record.status === "edit-frontier-only").length,
        fullyUnresolved: records.filter(record => record.status === "unresolved").length,
        rightEdgeEditDepthAtMostTwo: rawSummary.rightEdgeEditDepthAtMostTwo,
        knownTargetEnding: rawSummary.knownTargetEnding,
        sameSourceNonactiveEvidencePairs: records.filter(record => record.sameSourceNonactiveRelations.length > 0).length,
        nonactiveFamilyCorroboratedPairs: records.filter(record => record.nonactiveCorroboration.length > 0).length,
        nonactiveFamilyCorroboratedWithoutExactBoundary: records.filter(record => record.nonactiveCorroboration.length > 0 && record.targetBoundaryCandidates.length === 0).length,
        nonactiveFamilyCorroboratedWithoutRuntimeProjection: records.filter(record => record.nonactiveCorroboration.length > 0 && !(projectionByPair.get(getPairIdentity(record.sourceOriginal, record.targetOriginal))?.targetBoundaryCandidates?.length)).length,
        nonactiveFamilyCounts,
        claimedConfirmedRuntimeCausatives: runtimeReplay.confirmed.length,
        reproducedRuntimeCausatives: projected.length,
        uniqueProjectedHyphenizations: projected.filter(projection => projection.targetBoundaryCandidates.length === 1).length,
        routeAmbiguousBoundaryStable: routeAmbiguous.length,
        boundaryAmbiguous: boundaryAmbiguous.length,
        unresolvedClaimedConfirmed: unresolvedConfirmed.length,
        unresolvedClaimedConfirmedRecords: Object.freeze(unresolvedConfirmed.map(projection => projection.sourceRecordId)),
        reviewedNoLicenseFixtures: runtimeReplay.noLicense.length,
    });

    return Object.freeze({
        schemaVersion: 2,
        reportKind: "classical-karttunen-1992-causative-boundary-projection",
        source: Object.freeze({
            fileName: path.basename(sourcePath),
            sha256: sourceSha256,
            logicalCsvRowsIncludingHeader: extraction.logicalCsvRowsIncludingHeader,
            field: "Karttunen",
            directionContract: "TARGET marker SOURCE; report stores SOURCE -> TARGET",
        }),
        method: Object.freeze({
            karttunenRole: "quantity-preserving source-target alignment evidence only",
            andrewsRole: "sole authority for morphological segmentation and causative generation",
            exactAlignmentEdge: "SOURCE|LTIĀ or SOURCE|TIĀ",
            nonactiveJoin: "same quantity-preserving source; lō, ō, o-hua, or hua right-edge replacement; lō outranks generic ō",
            editSignatureInheritance: "may transfer an exact boundary vector only; never transfers source analysis, class, valence, lexical choice, or license",
            targetEndingPolicy: "an apparent TIA/LIA/HUIA ending creates only an edit frontier unless a stronger typed, Canvas, nonactive, or anchored record exists",
            profileMatrix: PROFILE_MATRIX,
            formulaAuthority: false,
            surfaceAuthority: false,
        }),
        summary,
        records: Object.freeze(records),
    });
}

function verifyReport(report) {
    const summary = report.summary;
    assertInvariant(summary.rawCausativeRelations === 276, `expected 276 raw causative relations, received ${summary.rawCausativeRelations}`);
    assertInvariant(summary.genericCausativeRelationsBeforeReconciliation === 276 && summary.causativeReconciliationExcluded === 4 && summary.causativeReconciliationRepaired === 4, "Karttunen causative reconciliation drifted");
    assertInvariant(summary.reconciledNonactiveRelations === 808 && summary.genericNonactiveRelationsBeforeReconciliation === 810 && summary.nonactiveReconciliationExcluded === 10 && summary.nonactiveReconciliationRepaired === 8, "Karttunen nonactive reconciliation drifted");
    assertInvariant(summary.acceptedMarkerOccurrences === 284, `expected 284 accepted causative occurrences, received ${summary.acceptedMarkerOccurrences}`);
    assertInvariant(summary.dottedMarkerOccurrences === 280 && summary.bareMarkerOccurrences === 4, `causative marker split drifted: ${summary.dottedMarkerOccurrences} dotted, ${summary.bareMarkerOccurrences} bare`);
    assertInvariant(summary.uniqueSources === 238 && summary.multiTargetSources === 29 && summary.multiTargetPairs === 67, "Karttunen causative source ambiguity counts drifted");
    assertInvariant(summary.exactSourcePrefix === 69 && summary.exactSourcePlusLtia === 62 && summary.exactSourcePlusTia === 4 && summary.coreExactPrefix === 66, "Karttunen exact-prefix alignment counts drifted");
    assertInvariant(summary.coreSingleTarget === 50 && summary.coreMultiTarget === 16, "Karttunen exact-prefix source-choice counts drifted");
    assertInvariant(summary.recordsWithBoundaryHypotheses === 124 && summary.suffixAlignmentHypotheses === 36 && summary.alignmentOnlyHypotheses === 0, "Karttunen boundary-hypothesis counts drifted");
    assertInvariant(summary.andrewsAnchoredEditHypotheses === 109 && summary.destockalHuiCompatibilityPairs === 21 && summary.destockalHuiTransitiveOnlyRuntimeMatches === 6, "Karttunen Andrews-template audit counts drifted");
    assertInvariant(summary.canvasExactRuntimeGaps === 4 && summary.exactBoundaryRecordsIncludingCanvas === 90 && summary.recordsWithAnyBoundaryProjection === 214, "Karttunen exact/expanded boundary coverage drifted");
    assertInvariant(summary.editFrontierOnly === 60 && summary.fullyUnresolved === 2, "Karttunen held-back boundary count drifted");
    assertInvariant(summary.rightEdgeEditDepthAtMostTwo === 259 && summary.knownTargetEnding === 274, "Karttunen right-edge shape counts drifted");
    assertInvariant(summary.sameSourceNonactiveEvidencePairs === 183 && summary.nonactiveFamilyCorroboratedPairs === 97, "Karttunen nonactive join counts drifted");
    assertInvariant(summary.nonactiveFamilyCorroboratedWithoutExactBoundary === 51 && summary.nonactiveFamilyCorroboratedWithoutRuntimeProjection === 52, "Karttunen nonactive incremental-coverage counts drifted");
    assertInvariant(JSON.stringify(summary.nonactiveFamilyCounts) === JSON.stringify({ hua: 56, "lō": 35, "o-hua": 4, "ō": 2 }), "Karttunen nonactive family counts drifted");
    assertInvariant(summary.claimedConfirmedRuntimeCausatives === 88, `expected 88 claimed runtime causatives, received ${summary.claimedConfirmedRuntimeCausatives}`);
    assertInvariant(summary.reproducedRuntimeCausatives === 86 && summary.uniqueProjectedHyphenizations === 86, "current Andrews causative replay count drifted");
    assertInvariant(summary.routeAmbiguousBoundaryStable === 16 && summary.boundaryAmbiguous === 0, "current Andrews boundary ambiguity count drifted");
    assertInvariant(summary.unresolvedClaimedConfirmed === 2, "expected two stale claimed causative intersections");
    assertInvariant(JSON.stringify(summary.unresolvedClaimedConfirmedRecords) === JSON.stringify(["karttunen-all:003511:c1", "karttunen-all:001014:c1"]), "stale claimed causative intersection identities drifted");
    assertInvariant(report.records.every(record => (
        record.authority.grammar === false
        && record.authority.generation === false
        && record.authority.targetConstruction === false
        && record.authority.selection === false
        && record.authority.formula === false
        && record.authority.surface === false
    )), "a projected Karttunen record acquired authority");
    assertInvariant(report.records.filter(record => record.targetBoundaryCandidates.length).every(record => record.roundTripProof.everyProjectedTargetMatches), "a projected target failed exact boundaryless round-trip proof");
    assertInvariant(report.records.filter(record => record.targetBoundaryHypotheses.length).every(record => record.roundTripProof.everyHypothesizedTargetMatches), "a hypothesized target failed exact boundaryless round-trip proof");
    assertInvariant(report.records.every(record => !(record.targetBoundaryCandidates.length && record.targetBoundaryHypotheses.length)), "an exact boundary record retained lower-tier hypotheses");
    assertInvariant(report.records.filter(record => record.nonactiveCorroboration.length).every(record => new Set(record.nonactiveCorroboration.map(match => match.targetBoundary)).size === 1), "a Karttunen nonactive join produced target-boundary ambiguity");
    assertInvariant(report.records.filter(record => record.status === "edit-frontier-only").every(record => record.targetBoundaryCandidates.length === 0 && record.targetBoundaryHypotheses.length === 0 && record.editFrontier.targetEndingFamily), "an edit-frontier-only record acquired morphology or lost its visible ending");
    const mayana = report.records.find(record => record.sourceBoundarylessKey === "mayāna" && record.targetBoundarylessKey === "mayānaltiā");
    const ayil = report.records.find(record => record.sourceBoundarylessKey === "āyi" && record.targetBoundarylessKey === "āyīltiā");
    const pinahua = report.records.find(record => record.sourceBoundarylessKey === "pīnāhua" && record.targetBoundarylessKey === "pīnāhualtiā");
    const pinauhtia = report.records.find(record => record.sourceBoundarylessKey === "pīnāhua" && record.targetBoundarylessKey === "pīnāuhtiā");
    const ahuiya = report.records.find(record => record.sourceBoundarylessKey === "āhuiya" && record.targetBoundarylessKey === "āhuiyaltiā");
    const polihui = report.records.find(record => record.sourceBoundarylessKey === "polihui" && record.targetBoundarylessKey === "polihuītiā");
    assertInvariant(mayana?.targetBoundaryCandidates.includes("mayāna-l-tiā") && mayana.status === "andrews-exact", "MAYĀNA causative projection fixture failed");
    assertInvariant(ayil?.runtimeOverlapStatus === "explicit-edge-no-current-andrews-overlap" && ayil.targetBoundaryCandidates.length === 0 && ayil.targetBoundaryHypotheses.length === 0 && ayil.status === "edit-frontier-only", "ĀYĪLTIĀ no-license fixture acquired a projection");
    assertInvariant(pinahua?.alignment.alignmentEdge === "PĪNĀHUA|LTIĀ" && pinahua.targetBoundaryHypotheses.includes("pīn-ā-hua-l-tiā") && pinahua.nonactiveCorroboration.some(match => match.family === "lō") && pinahua.andrewsProjectionStatus === "no-andrews-projection", "PĪNĀHUALTIĀ nonactive-compatibility fixture drifted");
    assertInvariant(pinauhtia?.targetBoundaryCandidates.includes("pīn-ā-uh-tiā") && pinauhtia.status === "andrews-canvas-exact-runtime-gap", "PĪNĀUHTIĀ exact Canvas fixture drifted");
    assertInvariant(ahuiya?.targetBoundaryCandidates.includes("āhui-ya-l-tiā") && ahuiya.status === "andrews-canvas-exact-runtime-gap", "ĀHUIYALTIĀ exact Canvas fixture drifted");
    assertInvariant(polihui?.targetBoundaryCandidates.includes("pol-i-huī-tiā") && polihui.destockalHuiValenceAudit?.requiredSourceValence === "intransitive", "POLIHUĪTIĀ destockal Canvas fixture drifted");
    assertInvariant(report.records.some(record => record.sourceBoundarylessKey === "cepōhuiya" && record.targetBoundarylessKey === "cepōhuītiā")
        && report.records.some(record => record.sourceBoundarylessKey === "pāqui" && record.targetBoundarylessKey === "pāctiā")
        && report.records.some(record => record.sourceBoundarylessKey === "toca" && record.targetBoundarylessKey === "toctiā")
        && !report.records.some(record => record.sourceBoundarylessKey === "tequipachōl" && record.targetBoundarylessKey === "tequipachōlmaca"), "reconciled causative edge fixtures drifted");
}

function serializeTsv(records) {
    const columns = [
        "csv_rows",
        "source_original",
        "target_original",
        "source_key",
        "target_key",
        "status",
        "karttunen_alignment_edge",
        "karttunen_alignment_type",
        "edit_common_prefix",
        "edit_source_removed",
        "edit_target_added",
        "target_ending_family",
        "source_target_count",
        "andrews_projection_status",
        "target_boundary_candidates",
        "target_boundary_hypotheses",
        "hypothesis_evidence_tiers",
        "source_internal_analysis_candidates",
        "source_internal_analysis_hypotheses",
        "hidden_nonactive_candidates",
        "nonactive_families",
        "nonactive_targets",
        "canvas_exact_sections",
        "destockal_required_valence",
        "destockal_runtime_valences",
        "andrews_rule_ids",
        "andrews_routes",
        "runtime_overlap_status",
        "runtime_source_record_id",
        "roundtrip",
        "grammar_authority",
        "generation_authority",
        "selection_authority",
    ];
    const clean = value => String(value == null ? "" : value).replace(/[\t\r\n]+/gu, " ");
    const lines = [columns.join("\t")];
    records.forEach(record => {
        const values = {
            csv_rows: record.csvRowNumbers.join(","),
            source_original: record.sourceOriginal,
            target_original: record.targetOriginal,
            source_key: record.sourceBoundarylessKey,
            target_key: record.targetBoundarylessKey,
            status: record.status,
            karttunen_alignment_edge: record.alignment.alignmentEdge,
            karttunen_alignment_type: record.alignment.coreType,
            edit_common_prefix: record.editFrontier.commonPrefix,
            edit_source_removed: record.editFrontier.sourceRemoved,
            edit_target_added: record.editFrontier.targetAdded,
            target_ending_family: record.editFrontier.targetEndingFamily,
            source_target_count: record.sourceTargetCount,
            andrews_projection_status: record.andrewsProjectionStatus,
            target_boundary_candidates: record.targetBoundaryCandidates.join(" | "),
            target_boundary_hypotheses: record.targetBoundaryHypotheses.join(" | "),
            hypothesis_evidence_tiers: Array.from(new Set(record.boundaryHypothesisEvidence.flatMap(evidence => evidence.supports.map(support => support.evidenceTier)))).join(" | "),
            source_internal_analysis_candidates: record.sourceInternalAnalysisCandidates.join(" | "),
            source_internal_analysis_hypotheses: record.sourceInternalAnalysisHypotheses.join(" | "),
            hidden_nonactive_candidates: record.hiddenNonactiveCandidates.join(" | "),
            nonactive_families: Array.from(new Set(record.nonactiveCorroboration.map(match => match.family))).join(" | "),
            nonactive_targets: Array.from(new Set(record.nonactiveCorroboration.map(match => match.nonactiveTargetOriginal))).join(" | "),
            canvas_exact_sections: (record.canvasExactEvidence?.andrewsSections || []).join(" | "),
            destockal_required_valence: record.destockalHuiValenceAudit?.requiredSourceValence || "",
            destockal_runtime_valences: (record.destockalHuiValenceAudit?.projectedSourceValences || []).join(" | "),
            andrews_rule_ids: Array.from(new Set(record.andrewsCandidates.map(candidate => candidate.ruleId).filter(Boolean))).join(" | "),
            andrews_routes: Array.from(new Set(record.andrewsCandidates.map(candidate => candidate.derivationRoute).filter(Boolean))).join(" | "),
            runtime_overlap_status: record.runtimeOverlapStatus,
            runtime_source_record_id: record.runtimeSourceRecordId,
            roundtrip: record.targetBoundaryCandidates.length ? record.roundTripProof.everyProjectedTargetMatches : record.roundTripProof.everyHypothesizedTargetMatches,
            grammar_authority: record.authority.grammar,
            generation_authority: record.authority.generation,
            selection_authority: record.authority.selection,
        };
        lines.push(columns.map(column => clean(values[column])).join("\t"));
    });
    return `${lines.join("\n")}\n`;
}

async function runInference({ sourcePath, outputDir = DEFAULT_OUTPUT_DIR } = {}) {
    assertInvariant(sourcePath, "usage: npm run infer:karttunen-causative-boundaries -- --source /path/to/karttunen_all.csv [--output-dir /path]");
    const csvBuffer = fs.readFileSync(sourcePath);
    const sourceSha256 = crypto.createHash("sha256").update(csvBuffer).digest("hex");
    assertInvariant(sourceSha256 === EXPECTED_SOURCE_SHA256, `Karttunen CSV SHA-256 mismatch: ${sourceSha256}`);
    const extraction = extractKarttunenCausativeRelations(csvBuffer.toString("utf8"));
    const nonactiveExtraction = extractKarttunenNonactiveRelations(csvBuffer.toString("utf8"));
    const runtimeReplay = await replayCurrentAndrewsCausatives();
    const report = buildReport(sourcePath, sourceSha256, extraction, nonactiveExtraction, runtimeReplay);
    verifyReport(report);
    fs.mkdirSync(outputDir, { recursive: true });
    const jsonPath = path.join(outputDir, "karttunen_1992_causative_boundary_projection.json");
    const tsvPath = path.join(outputDir, "karttunen_1992_causative_boundary_projection.tsv");
    const summaryPath = path.join(outputDir, "summary.json");
    fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    fs.writeFileSync(tsvPath, serializeTsv(report.records), "utf8");
    fs.writeFileSync(summaryPath, `${JSON.stringify(report.summary, null, 2)}\n`, "utf8");
    return Object.freeze({ report, jsonPath, tsvPath, summaryPath });
}

if (require.main === module) {
    runInference({
        sourcePath: getCliValue("--source"),
        outputDir: path.resolve(getCliValue("--output-dir", DEFAULT_OUTPUT_DIR)),
    }).then(({ report, jsonPath, tsvPath }) => {
        const summary = report.summary;
        process.stdout.write(`Karttunen causative boundary projection: ${summary.exactBoundaryRecordsIncludingCanvas} exact Andrews/Canvas boundaries, ${summary.nonactiveFamilyCorroboratedPairs} nonactive-family corroborations, ${summary.andrewsAnchoredEditHypotheses} Andrews-anchored edit hypotheses, and ${summary.recordsWithAnyBoundaryProjection}/${summary.rawCausativeRelations} records with an exact or explicitly non-authorizing boundary projection; JSON ${jsonPath}; TSV ${tsvPath}\n`);
    }).catch(error => {
        process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
        process.exit(1);
    });
}

module.exports = {
    EXPECTED_SOURCE_SHA256,
    buildReport,
    extractKarttunenApplicativeRelations,
    extractKarttunenCausativeRelations,
    extractKarttunenNonactiveRelations,
    getBoundarylessIdentity,
    getKarttunenAlignment,
    parseCsvRecords,
    replayCurrentAndrewsCausatives,
    runInference,
    verifyReport,
};
