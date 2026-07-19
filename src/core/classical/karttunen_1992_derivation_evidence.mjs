// Canonical modern ESM lexical-evidence helper.
//
// The compact index is a positive intersection: Karttunen explicitly records
// the relation and the current Andrews evaluator independently generates the
// same quantity-preserving source/target pair for at least one typed profile.
// It never creates, suppresses, selects, or authorizes a grammar option.

import { KARTTUNEN_1992_CONFIRMED_OVERLAP_DATA } from "./karttunen_1992_confirmed_overlap_data.mjs";

const OPERATION_BY_CODE = Object.freeze({ a: "applicative", c: "causative", n: "nonactive" });

// Retained specifically to prove that an explicit dictionary edge still cannot
// create an Andrews option when the current typed rules do not generate it.
const REVIEWED_NO_LICENSE_FIXTURES = Object.freeze([
  Object.freeze(["c", "ĀY(I)", "ĀYĪLTIĀ", Object.freeze([3597]), Object.freeze(["altern. caus"])]),
]);

function freezeEvidenceValue(value) {
  if (Array.isArray(value)) {
    return Object.freeze(value.map(freezeEvidenceValue));
  }
  if (!value || typeof value !== "object") {
    return value;
  }
  return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, freezeEvidenceValue(entry)])));
}

function normalizeCitationStem(value = "") {
  return String(value == null ? "" : value)
    .normalize("NFC")
    .replace(/\(([AI])\)/gu, "$1")
    .replace(/[\p{Dash_Punctuation}\s]/gu, "")
    .toLowerCase();
}

function normalizeRelationLabel(value = "", operation = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized) {
    return normalized.endsWith(".") ? normalized : `${normalized}.`;
  }
  return operation === "applicative" ? "applic." : operation === "causative" ? "caus." : "nonact.";
}

function buildEvidenceRecords() {
  const rowOperationCounts = new Map();
  const tuples = [
    ...KARTTUNEN_1992_CONFIRMED_OVERLAP_DATA.records.map(tuple => ({ tuple, intersectionStatus: "confirmed-current-andrews-output" })),
    ...REVIEWED_NO_LICENSE_FIXTURES.map(tuple => ({ tuple, intersectionStatus: "explicit-edge-no-current-andrews-overlap" })),
  ];
  return Object.freeze(tuples.map(({ tuple, intersectionStatus }, index) => {
    const [operationCode, sourceOriginal, targetOriginal, csvRowNumbers, relationLabels] = tuple;
    const operation = OPERATION_BY_CODE[operationCode] || "";
    const firstRow = Number(csvRowNumbers[0] || 0);
    const rowOperationKey = `${firstRow}:${operationCode}`;
    const rowOperationIndex = (rowOperationCounts.get(rowOperationKey) || 0) + 1;
    rowOperationCounts.set(rowOperationKey, rowOperationIndex);
    const relationLabel = normalizeRelationLabel(relationLabels[0], operation);
    return freezeEvidenceValue({
      evidenceRole: "lexical-attestation-only",
      sourceName: "1992 Karttunen",
      sourceRecordId: `karttunen-all:${String(firstRow).padStart(6, "0")}:${operationCode}${rowOperationIndex}`,
      evidenceIndex: index + 1,
      operation,
      sourceStem: normalizeCitationStem(sourceOriginal),
      targetStem: normalizeCitationStem(targetOriginal),
      sourceOriginal,
      targetOriginal,
      relationLabel,
      relationLabels,
      relationOriginal: `${targetOriginal} ${relationLabel} ${sourceOriginal}`,
      sourceDataset: "karttunen_all CSV supplied 2026-07-16",
      sourceFileName: "karttunen_all - karttunen_all.csv",
      sourceFileSha256: KARTTUNEN_1992_CONFIRMED_OVERLAP_DATA.sourceSha256,
      sourceRowNumbers: csvRowNumbers,
      relationExtractionField: KARTTUNEN_1992_CONFIRMED_OVERLAP_DATA.sourceField,
      relationExtractionBlock: "raw CSV cell",
      relationExtractionMarker: relationLabel,
      provenanceDisplay: "raw Karttunen column",
      normalizedTranslationUsed: false,
      normalizedTranslationAuthority: false,
      normalizationCommit: "",
      boundaryStatus: "unsegmented-dictionary-notation",
      directionStatus: "source-after-marker-to-derivative-before-marker",
      directionContract: KARTTUNEN_1992_CONFIRMED_OVERLAP_DATA.directionContract,
      quantityStatus: "classical-vowel-quantity-preserved",
      runtimeIntersectionStatus: intersectionStatus,
      reviewStatus: intersectionStatus === "confirmed-current-andrews-output"
        ? "reviewed-explicit-current-andrews-overlap"
        : "reviewed-explicit-no-license-fixture",
      grammarAuthority: false,
      generationAuthority: false,
      targetConstructionAuthority: false,
      formulaAuthority: false,
      surfaceAuthority: false,
    });
  }));
}

export const CLASSICAL_NAHUATL_KARTTUNEN_1992_DERIVATION_EVIDENCE = buildEvidenceRecords();

function normalizeKarttunen1992Stem(value = "") {
  return String(value == null ? "" : value).trim().replace(/^\((.*)\)$/u, "$1").normalize("NFC");
}

// The dictionary citations omit morphological hyphens. Only boundary hyphens
// and whitespace are ignored here; macrons remain part of lexical identity.
export function getClassicalNahuatlKarttunen1992BoundarylessKey(value = "") {
  return normalizeKarttunen1992Stem(value)
    .toLowerCase()
    .replace(/[\p{Dash_Punctuation}\s]/gu, "");
}

function getKarttunen1992EvidenceLookupKey(operation = "", sourceStem = "", targetStem = "") {
  return [
    String(operation || "").trim(),
    getClassicalNahuatlKarttunen1992BoundarylessKey(sourceStem),
    getClassicalNahuatlKarttunen1992BoundarylessKey(targetStem),
  ].join("\u0000");
}

// Keep option generation O(1) with respect to the evidence corpus. This index
// is lookup infrastructure only; it has no route, selection, or generation role.
const KARTTUNEN_1992_DERIVATION_EVIDENCE_BY_LOOKUP_KEY = (() => {
  const mutableIndex = new Map();
  CLASSICAL_NAHUATL_KARTTUNEN_1992_DERIVATION_EVIDENCE.forEach(record => {
    const key = getKarttunen1992EvidenceLookupKey(record.operation, record.sourceStem, record.targetStem);
    const existing = mutableIndex.get(key) || [];
    existing.push(record);
    mutableIndex.set(key, existing);
  });
  return new Map(Array.from(mutableIndex, ([key, records]) => [key, Object.freeze([...records])]));
})();

export function getClassicalNahuatlKarttunen1992DerivationEvidenceInventory() {
  return CLASSICAL_NAHUATL_KARTTUNEN_1992_DERIVATION_EVIDENCE;
}

export function getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({ operation = "", derivationType = "", sourceStem = "", targetStem = "" } = {}) {
  const normalizedOperation = String(operation || derivationType || "").trim();
  const sourceBoundarylessKey = getClassicalNahuatlKarttunen1992BoundarylessKey(sourceStem);
  const targetBoundarylessKey = getClassicalNahuatlKarttunen1992BoundarylessKey(targetStem);
  if (!["causative", "applicative", "nonactive"].includes(normalizedOperation) || !sourceBoundarylessKey || !targetBoundarylessKey) {
    return Object.freeze([]);
  }
  const matchedRecords = KARTTUNEN_1992_DERIVATION_EVIDENCE_BY_LOOKUP_KEY.get(
    getKarttunen1992EvidenceLookupKey(normalizedOperation, sourceBoundarylessKey, targetBoundarylessKey)
  ) || [];
  return Object.freeze(matchedRecords.map(record => freezeEvidenceValue({
    ...record,
    reviewStatus: record.runtimeIntersectionStatus === "confirmed-current-andrews-output"
      ? "confirmed-andrews-candidate"
      : record.reviewStatus,
    matchBasis: "exact-classical-boundaryless",
  })));
}

function stableKarttunen1992EvidenceValue(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableKarttunen1992EvidenceValue).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableKarttunen1992EvidenceValue(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value === undefined ? null : value);
}

export function getClassicalNahuatlKarttunen1992EvidenceSignature(matches = []) {
  const serialized = stableKarttunen1992EvidenceValue(matches);
  let hash = 2166136261;
  for (let index = 0; index < serialized.length; index += 1) {
    hash ^= serialized.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `karttunen-1992:v1:${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function isClassicalNahuatlKarttunen1992EvidenceMatchSet(matches = [], query = {}) {
  const expected = getClassicalNahuatlKarttunen1992DerivationEvidenceMatches(query);
  return stableKarttunen1992EvidenceValue(matches) === stableKarttunen1992EvidenceValue(expected)
    && getClassicalNahuatlKarttunen1992EvidenceSignature(matches) === getClassicalNahuatlKarttunen1992EvidenceSignature(expected);
}
