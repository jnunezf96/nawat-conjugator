// Canonical modern ESM module.

export const CLASSICAL_RESULT_OUTPUT_SCOPE_VERSION = 1;
export const CLASSICAL_RESULT_OUTPUT_SCOPES = Object.freeze(["single", "paradigm"]);
export const CLASSICAL_RESULT_OUTPUT_SCOPE_ROLES = Object.freeze(["nnc", "vnc"]);
export const CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS = Object.freeze({
  nnc: Object.freeze({
    role: "nnc",
    controlId: "classical-rule-logic-nnc-output-scope",
    options: Object.freeze([
      Object.freeze({ value: "single", label: "single form", tagId: "cn-option-nnc-output-single" }),
      Object.freeze({ value: "paradigm", label: "full paradigm", tagId: "cn-option-nnc-output-paradigm" }),
    ]),
    paradigmDimensions: Object.freeze(["state", "subject", "possessor", "stem-relation", "number-form"]),
    paradigmRequiresActiveVoice: false,
  }),
  vnc: Object.freeze({
    role: "vnc",
    controlId: "classical-rule-logic-vnc-output-scope",
    options: Object.freeze([
      Object.freeze({ value: "single", label: "single form", tagId: "cn-option-vnc-output-single" }),
      Object.freeze({ value: "paradigm", label: "full paradigm", tagId: "cn-option-vnc-output-paradigm" }),
    ]),
    paradigmDimensions: Object.freeze(["valence", "subject", "mood", "tense"]),
    paradigmRequiresActiveVoice: true,
  }),
});

export const CLASSICAL_RESULT_OUTPUT_SCOPE_VOCABULARY_CONTRACT = Object.freeze({
  kind: "classical-result-output-scope-vocabulary",
  version: CLASSICAL_RESULT_OUTPUT_SCOPE_VERSION,
  outputScopes: CLASSICAL_RESULT_OUTPUT_SCOPES,
  roles: CLASSICAL_RESULT_OUTPUT_SCOPE_ROLES,
  controls: CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS,
  absentDefaultsToSingle: true,
  invalidExplicitInputBlocks: true,
  roleSpecificParadigmBuildersRemainSeparate: true,
  shellCanvasAndUrlAreNotGrammarAuthority: true,
});

function normalizeClassicalResultOutputScopeToken(value = "") {
  return String(value == null ? "" : value).trim();
}

export function normalizeClassicalResultOutputScope(value = "") {
  const normalized = normalizeClassicalResultOutputScopeToken(value);
  return CLASSICAL_RESULT_OUTPUT_SCOPES.includes(normalized) ? normalized : "";
}

export function buildClassicalResultOutputScopeSelectionFrame(value = "", options = {}) {
  const requestedValue = normalizeClassicalResultOutputScopeToken(value);
  const explicit = options.explicit === true || (options.explicit !== false && requestedValue !== "");
  const role = CLASSICAL_RESULT_OUTPUT_SCOPE_ROLES.includes(String(options.role || ""))
    ? String(options.role)
    : "";
  const normalizedValue = normalizeClassicalResultOutputScope(requestedValue);
  const recognized = Boolean(normalizedValue);
  const blocked = explicit && !recognized;
  const outputScope = recognized ? normalizedValue : blocked ? "" : "single";
  return Object.freeze({
    kind: "classical-result-output-scope-selection-frame",
    version: CLASSICAL_RESULT_OUTPUT_SCOPE_VERSION,
    role,
    requestedValue,
    outputScope,
    recognized,
    explicit,
    defaulted: !explicit,
    provenance: normalizeClassicalResultOutputScopeToken(options.provenance) || (explicit ? "typed-request" : "absent-default"),
    authorizationStatus: blocked ? "blocked" : "authorized",
    blockReason: blocked ? "classical-result-output-scope-not-recognized" : "",
    presentationScopeCannotAuthorizeGrammar: true,
    roleSpecificParadigmBuildersRemainSeparate: true,
  });
}

export function validateClassicalResultOutputScopeSelection(value = "", options = {}) {
  return buildClassicalResultOutputScopeSelectionFrame(value, options);
}

function normalizeInventoryRecords(records = []) {
  return (Array.isArray(records) ? records : []).map(record => ({
    controlId: normalizeClassicalResultOutputScopeToken(record?.controlId),
    value: normalizeClassicalResultOutputScopeToken(record?.value),
    tagId: normalizeClassicalResultOutputScopeToken(record?.tagId),
  }));
}

function getExpectedInventoryRecords(role = "") {
  const contract = CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS[role];
  return contract ? contract.options.map(option => ({
    controlId: contract.controlId,
    value: option.value,
    tagId: option.tagId,
  })) : [];
}

function recordsMatch(left = [], right = []) {
  return left.length === right.length && left.every((record, index) => (
    record.controlId === right[index]?.controlId
    && record.value === right[index]?.value
    && record.tagId === right[index]?.tagId
  ));
}

export function validateClassicalResultOutputScopeControlInventory({ shellRecords = [], ledgerRecords = [] } = {}) {
  const expectedRecords = CLASSICAL_RESULT_OUTPUT_SCOPE_ROLES.flatMap(getExpectedInventoryRecords);
  const normalizedShellRecords = normalizeInventoryRecords(shellRecords);
  const normalizedLedgerRecords = normalizeInventoryRecords(ledgerRecords);
  const shellMatches = recordsMatch(normalizedShellRecords, expectedRecords);
  const ledgerMatches = recordsMatch(normalizedLedgerRecords, expectedRecords);
  const duplicateShellKeys = normalizedShellRecords.map(record => `${record.controlId}:${record.value}`).filter((key, index, values) => values.indexOf(key) !== index);
  const duplicateLedgerKeys = normalizedLedgerRecords.map(record => `${record.controlId}:${record.value}`).filter((key, index, values) => values.indexOf(key) !== index);
  return Object.freeze({
    kind: "classical-result-output-scope-control-inventory-validation-frame",
    version: CLASSICAL_RESULT_OUTPUT_SCOPE_VERSION,
    authorizationStatus: shellMatches && ledgerMatches && !duplicateShellKeys.length && !duplicateLedgerKeys.length ? "authorized" : "blocked",
    blockReason: shellMatches && ledgerMatches && !duplicateShellKeys.length && !duplicateLedgerKeys.length ? "" : "classical-result-output-scope-control-inventory-mismatch",
    expectedRecords: Object.freeze(expectedRecords.map(Object.freeze)),
    shellRecords: Object.freeze(normalizedShellRecords.map(Object.freeze)),
    ledgerRecords: Object.freeze(normalizedLedgerRecords.map(Object.freeze)),
    shellMatches,
    ledgerMatches,
    duplicateShellKeys: Object.freeze(duplicateShellKeys),
    duplicateLedgerKeys: Object.freeze(duplicateLedgerKeys),
    shellCanvasAndUrlAreNotGrammarAuthority: true,
    roleSpecificParadigmBuildersRemainSeparate: true,
  });
}

export function createClassicalResultOutputScopeApi() {
  return {
    CLASSICAL_RESULT_OUTPUT_SCOPE_VERSION,
    CLASSICAL_RESULT_OUTPUT_SCOPES,
    CLASSICAL_RESULT_OUTPUT_SCOPE_ROLES,
    CLASSICAL_RESULT_OUTPUT_SCOPE_CONTROL_CONTRACTS,
    CLASSICAL_RESULT_OUTPUT_SCOPE_VOCABULARY_CONTRACT,
    normalizeClassicalResultOutputScope,
    buildClassicalResultOutputScopeSelectionFrame,
    validateClassicalResultOutputScopeSelection,
    validateClassicalResultOutputScopeControlInventory,
  };
}

export function installClassicalResultOutputScopeGlobals(targetObject = globalThis) {
  const api = createClassicalResultOutputScopeApi();
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
