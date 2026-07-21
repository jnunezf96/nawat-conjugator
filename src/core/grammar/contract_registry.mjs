// Canonical modern ESM module.

import { CLASSICAL_RESULT_OUTPUT_SCOPES } from "../output/scope.mjs?v=20260719-output-scope-contract-053";

export function createGrammarContractRegistryModule(targetObject = globalThis) {
    var GRAMMAR_CONTRACT_REGISTRY_VERSION = 1;
    var GRAMMAR_CONTRACT_REGISTRY_STATE = new WeakMap();
    var GRAMMAR_CAPABILITY_EXPECTED_TYPES = Object.freeze(["array", "boolean", "function", "number", "object", "string"]);
    function normalizeGrammarRegistryToken(value = "") {
      return String(value || "").trim();
    }
    function normalizeGrammarRegistryStringList(values = []) {
      if (!Array.isArray(values)) {
        throw new TypeError("Expected an explicit array of strings.");
      }
      return Object.freeze(Array.from(new Set(values.map(normalizeGrammarRegistryToken).filter(Boolean))));
    }
    function createGrammarRegistryError(code, message, details = null) {
      const error = new Error(message);
      error.code = code;
      if (details) {
        error.details = details;
      }
      return error;
    }
    function getGrammarContractRegistryState(registry) {
      const state = GRAMMAR_CONTRACT_REGISTRY_STATE.get(registry);
      if (!state) {
        throw createGrammarRegistryError("INVALID_GRAMMAR_CONTRACT_REGISTRY", "A registry created by createGrammarContractRegistry() is required.");
      }
      return state;
    }
    function isGrammarContractRegistry(registry) {
      return GRAMMAR_CONTRACT_REGISTRY_STATE.has(registry);
    }
    function createGrammarContractRegistry(options = {}) {
      const registry = Object.freeze({
        kind: "grammar-contract-registry",
        version: GRAMMAR_CONTRACT_REGISTRY_VERSION,
        registryId: normalizeGrammarRegistryToken(options.registryId) || "default"
      });
      GRAMMAR_CONTRACT_REGISTRY_STATE.set(registry, {
        definitions: new Map(),
        capabilityRequirements: new Map()
      });
      (Array.isArray(options.definitions) ? options.definitions : []).forEach(definition => {
        registerGrammarContractDefinition(registry, definition);
      });
      (Array.isArray(options.capabilityRequirements) ? options.capabilityRequirements : []).forEach(requirement => {
        registerGrammarCapabilityRequirement(registry, requirement);
      });
      return registry;
    }
    function getGrammarContractDefinitionKey(contractKind = "", version = 0) {
      return `${normalizeGrammarRegistryToken(contractKind)}@${Number(version) || 0}`;
    }
    function normalizeGrammarContractDefinition(definition = {}) {
      const contractKind = normalizeGrammarRegistryToken(definition.contractKind || definition.kind);
      const version = Number(definition.version);
      const authorityRole = normalizeGrammarRegistryToken(definition.authorityRole);
      const producer = normalizeGrammarRegistryToken(definition.producer);
      if (!contractKind) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_KIND_REQUIRED", "Contract definition requires contractKind.");
      }
      if (!Number.isInteger(version) || version < 1) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_VERSION_REQUIRED", `${contractKind} requires a positive integer version.`);
      }
      if (!authorityRole) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_AUTHORITY_ROLE_REQUIRED", `${contractKind}@${version} requires authorityRole.`);
      }
      if (!producer) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_PRODUCER_REQUIRED", `${contractKind}@${version} requires producer.`);
      }
      if (!Array.isArray(definition.consumers)) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_CONSUMERS_REQUIRED", `${contractKind}@${version} requires an explicit consumers array.`);
      }
      if (typeof definition.validator !== "function") {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_VALIDATOR_REQUIRED", `${contractKind}@${version} requires a validator function.`);
      }
      return Object.freeze({
        contractKind,
        version,
        authorityRole,
        producer,
        consumers: normalizeGrammarRegistryStringList(definition.consumers),
        validator: definition.validator,
        description: normalizeGrammarRegistryToken(definition.description),
        requiredCapabilities: normalizeGrammarRegistryStringList(definition.requiredCapabilities || [])
      });
    }
    function registerGrammarContractDefinition(registry, definition = {}) {
      const state = getGrammarContractRegistryState(registry);
      const normalized = normalizeGrammarContractDefinition(definition);
      const key = getGrammarContractDefinitionKey(normalized.contractKind, normalized.version);
      if (state.definitions.has(key)) {
        throw createGrammarRegistryError("DUPLICATE_GRAMMAR_CONTRACT_DEFINITION", `Contract ${key} is already registered.`);
      }
      state.definitions.set(key, normalized);
      return normalized;
    }
    function getGrammarContractDefinition(registry, contractKind = "", version = null) {
      const state = getGrammarContractRegistryState(registry);
      const normalizedKind = normalizeGrammarRegistryToken(contractKind);
      if (!normalizedKind) {
        return null;
      }
      if (version !== null && version !== undefined && version !== "") {
        return state.definitions.get(getGrammarContractDefinitionKey(normalizedKind, version)) || null;
      }
      return Array.from(state.definitions.values()).filter(definition => definition.contractKind === normalizedKind).sort((left, right) => right.version - left.version)[0] || null;
    }
    function listGrammarContractDefinitions(registry) {
      return Object.freeze(Array.from(getGrammarContractRegistryState(registry).definitions.values()).sort((left, right) => left.contractKind.localeCompare(right.contractKind) || left.version - right.version));
    }
    function normalizeGrammarContractValidationResult(result) {
      if (result === true) {
        return {
          ok: true,
          diagnostics: []
        };
      }
      if (result && typeof result === "object") {
        return {
          ok: result.ok === true,
          diagnostics: Array.isArray(result.diagnostics) ? result.diagnostics.map(normalizeGrammarRegistryToken).filter(Boolean) : []
        };
      }
      return {
        ok: false,
        diagnostics: []
      };
    }
    function inspectRegisteredGrammarContract(registry, frame, expected = {}) {
      getGrammarContractRegistryState(registry);
      const errors = [];
      const expectedKind = normalizeGrammarRegistryToken(expected.contractKind || expected.kind);
      const hasExpectedVersion = expected.version !== null && expected.version !== undefined && expected.version !== "";
      const expectedVersion = hasExpectedVersion ? Number(expected.version) : null;
      const frameIsObject = Boolean(frame && typeof frame === "object" && !Array.isArray(frame));
      const contractKind = frameIsObject ? normalizeGrammarRegistryToken(frame.kind) : "";
      const version = frameIsObject ? Number(frame.version) : 0;
      if (!frameIsObject) {
        errors.push("contract-frame-object-required");
      }
      if (!contractKind) {
        errors.push("contract-kind-missing");
      }
      if (!Number.isInteger(version) || version < 1) {
        errors.push("contract-version-missing-or-invalid");
      }
      if (expectedKind && contractKind && expectedKind !== contractKind) {
        errors.push("unexpected-contract-kind");
      }
      if (hasExpectedVersion && (!Number.isInteger(expectedVersion) || expectedVersion < 1)) {
        errors.push("expected-contract-version-invalid");
      } else if (expectedVersion && version && expectedVersion !== version) {
        errors.push("unexpected-contract-version");
      }
      const definition = contractKind && version ? getGrammarContractDefinition(registry, contractKind, version) : null;
      if (contractKind && version && !definition) {
        errors.push("unregistered-contract-kind-or-version");
      }
      if (definition && !errors.length) {
        try {
          const validation = normalizeGrammarContractValidationResult(definition.validator(frame));
          if (!validation.ok) {
            errors.push("contract-validator-rejected-frame");
          }
          errors.push(...validation.diagnostics);
        } catch (_error) {
          errors.push("contract-validator-threw");
        }
      }
      return Object.freeze({
        kind: "grammar-contract-validation-report",
        version: 1,
        ok: errors.length === 0,
        status: errors.length ? "invalid" : "valid",
        contractKind,
        contractVersion: version || null,
        authorityRole: definition?.authorityRole || "",
        definition,
        errors: Object.freeze(errors)
      });
    }
    function isRegisteredGrammarContract(registry, frame, expected = {}) {
      return inspectRegisteredGrammarContract(registry, frame, expected).ok;
    }
    function assertRegisteredGrammarContract(registry, frame, expected = {}) {
      const report = inspectRegisteredGrammarContract(registry, frame, expected);
      if (!report.ok) {
        throw createGrammarRegistryError("INVALID_REGISTERED_GRAMMAR_CONTRACT", `Registered grammar contract validation failed: ${report.errors.join(", ")}.`, report);
      }
      return frame;
    }
    function normalizeGrammarCapabilityRequirement(requirement = {}) {
      const requirementId = normalizeGrammarRegistryToken(requirement.requirementId || requirement.id || requirement.capability);
      const capability = normalizeGrammarRegistryToken(requirement.capability);
      const expectedType = normalizeGrammarRegistryToken(requirement.expectedType || "function");
      const requiredBy = normalizeGrammarRegistryStringList(requirement.requiredBy || []);
      const reason = normalizeGrammarRegistryToken(requirement.reason);
      if (!requirementId || !capability) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_ID_REQUIRED", "Capability requirement requires requirementId and capability.");
      }
      if (!GRAMMAR_CAPABILITY_EXPECTED_TYPES.includes(expectedType)) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_TYPE_INVALID", `${requirementId} has unsupported expectedType ${expectedType}.`);
      }
      if (!requiredBy.length) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_CONSUMER_REQUIRED", `${requirementId} requires at least one requiredBy entry.`);
      }
      if (!reason) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_REASON_REQUIRED", `${requirementId} requires a reason.`);
      }
      return Object.freeze({
        requirementId,
        capability,
        expectedType,
        requiredBy,
        reason
      });
    }
    function registerGrammarCapabilityRequirement(registry, requirement = {}) {
      const state = getGrammarContractRegistryState(registry);
      const normalized = normalizeGrammarCapabilityRequirement(requirement);
      if (state.capabilityRequirements.has(normalized.requirementId)) {
        throw createGrammarRegistryError("DUPLICATE_GRAMMAR_CAPABILITY_REQUIREMENT", `Capability requirement ${normalized.requirementId} is already registered.`);
      }
      state.capabilityRequirements.set(normalized.requirementId, normalized);
      return normalized;
    }
    function getGrammarCapabilityRequirement(registry, requirementId = "") {
      return getGrammarContractRegistryState(registry).capabilityRequirements.get(normalizeGrammarRegistryToken(requirementId)) || null;
    }
    function listGrammarCapabilityRequirements(registry) {
      return Object.freeze(Array.from(getGrammarContractRegistryState(registry).capabilityRequirements.values()).sort((left, right) => left.requirementId.localeCompare(right.requirementId)));
    }
    function getGrammarCapabilityValue(capabilitySource, capability = "") {
      const path = normalizeGrammarRegistryToken(capability).split(".").filter(Boolean);
      let current = capabilitySource;
      for (const segment of path) {
        if (current === null || current === undefined || !(segment in Object(current))) {
          return {
            found: false,
            value: undefined
          };
        }
        current = current[segment];
      }
      return {
        found: path.length > 0,
        value: current
      };
    }
    function getGrammarCapabilityValueType(value) {
      if (Array.isArray(value)) {
        return "array";
      }
      if (value === null) {
        return "null";
      }
      return typeof value;
    }
    function inspectGrammarCapabilityRequirements(registry, capabilitySource = globalThis) {
      const satisfied = [];
      const missing = [];
      const invalid = [];
      listGrammarCapabilityRequirements(registry).forEach(requirement => {
        const resolution = getGrammarCapabilityValue(capabilitySource, requirement.capability);
        const record = Object.freeze({
          requirementId: requirement.requirementId,
          capability: requirement.capability,
          expectedType: requirement.expectedType,
          actualType: resolution.found ? getGrammarCapabilityValueType(resolution.value) : "missing",
          requiredBy: requirement.requiredBy,
          reason: requirement.reason
        });
        if (!resolution.found) {
          missing.push(record);
        } else if (record.actualType !== requirement.expectedType) {
          invalid.push(record);
        } else {
          satisfied.push(record);
        }
      });
      return Object.freeze({
        kind: "grammar-capability-requirement-report",
        version: 1,
        ok: missing.length === 0 && invalid.length === 0,
        satisfied: Object.freeze(satisfied),
        missing: Object.freeze(missing),
        invalid: Object.freeze(invalid)
      });
    }
    function assertGrammarCapabilityRequirements(registry, capabilitySource = globalThis) {
      const report = inspectGrammarCapabilityRequirements(registry, capabilitySource);
      if (!report.ok) {
        const unsatisfied = [...report.missing, ...report.invalid].map(requirement => requirement.requirementId).join(", ");
        throw createGrammarRegistryError("UNSATISFIED_GRAMMAR_CAPABILITY_REQUIREMENTS", `Required grammar capabilities are unavailable: ${unsatisfied}.`, report);
      }
      return capabilitySource;
    }
    function buildGrammarContractValidationResult(checks = []) {
      const diagnostics = checks.filter(check => check?.ok !== true).map(check => normalizeGrammarRegistryToken(check?.diagnostic)).filter(Boolean);
      return {
        ok: diagnostics.length === 0,
        diagnostics
      };
    }
    function isAuthorizedGrammarContractCanonical(frame = null, validatorName = "") {
      if (frame?.authorizationStatus !== "authorized") {
        return true;
      }
      return isGrammarContractCanonicalFrame(frame, validatorName);
    }
    function isGrammarContractCanonicalFrame(frame = null, validatorName = "") {
      const canonicalValidator = targetObject?.[normalizeGrammarRegistryToken(validatorName)];
      if (typeof canonicalValidator !== "function") {
        return false;
      }
      try {
        return canonicalValidator.call(targetObject, frame) === true;
      } catch (_error) {
        return false;
      }
    }
    function buildClassicalAuxiliaryGrammarContractDefinition(definition = {}) {
      const consumers = Array.isArray(definition.consumers) ? definition.consumers : ["classical-verification"];
      const requiredCapabilities = Array.isArray(definition.requiredCapabilities)
        ? definition.requiredCapabilities
        : ["classical-vnc-derivation-evaluator"];
      return Object.freeze({
        ...definition,
        version: 1,
        consumers: Object.freeze([...consumers]),
        requiredCapabilities: Object.freeze([...requiredCapabilities])
      });
    }
    var DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS = Object.freeze([Object.freeze({
      contractKind: "ordinary-nnc-noun-class-vocabulary",
      version: 1,
      authorityRole: "canonical-profile-aware-ordinary-nnc-noun-class-vocabulary",
      producer: "ordinary-nnc-engine",
      consumers: ["ordinary-nnc-state", "ordinary-nnc-presentation", "classical-nnc-engine", "classical-url-state", "classical-verification"],
      description: "Distinct ordered Nawat and Classical ordinary-NNC noun-class vocabularies with profile-specific aliases and an explicit orthographic bridge.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.profiles?.nawat?.values?.join("|") === "t|ti|in|zero" && frame?.profiles?.classical?.values?.join("|") === "tl|tli|in|zero",
        diagnostic: "ordinary-nnc-noun-class-profile-vocabularies-invalid"
      }, {
        ok: frame?.nawatToClassical?.t === "tl" && frame?.nawatToClassical?.ti === "tli" && frame?.classicalToNawat?.tl === "t" && frame?.classicalToNawat?.tli === "ti",
        diagnostic: "ordinary-nnc-noun-class-profile-bridge-invalid"
      }, {
        ok: frame?.profiles?.nawat?.aliases?.ti === "ti" && frame?.profiles?.classical?.aliases?.ti === "tl",
        diagnostic: "ordinary-nnc-noun-class-profile-alias-separation-invalid"
      }, {
        ok: frame?.manuallyWrittenFormulaAuthority === false,
        diagnostic: "ordinary-nnc-manual-formula-authority-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "ordinary-nnc-noun-class-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-profile-aware-noun-class-control-parity-audit",
      producer: "ordinary-nnc-presentation",
      consumers: ["ordinary-nnc-presentation", "classical-presentation", "classical-verification"],
      description: "An exact parity audit of active Nawat Result controls and Classical shell and Canvas records against their distinct profiles.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "ordinary-nnc-noun-class-control-inventory-status-invalid"
      }, {
        ok: Array.isArray(frame?.expectedNawatValues) && Array.isArray(frame?.expectedClassicalValues) && Array.isArray(frame?.nawatValues) && Array.isArray(frame?.classicalValues) && Array.isArray(frame?.classicalLedgerValues),
        diagnostic: "ordinary-nnc-noun-class-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.nawatMatches === true && frame?.classicalMatches === true && frame?.classicalLedgerMatches === true,
        diagnostic: "authorized-ordinary-nnc-noun-class-control-inventory-invalid"
      }, {
        ok: frame?.controlsAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "ordinary-nnc-noun-class-control-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "ordinary-nnc-noun-class-selection-frame",
      version: 1,
      authorityRole: "typed-profile-aware-ordinary-nnc-noun-class-recognition",
      producer: "ordinary-nnc-engine",
      consumers: ["ordinary-nnc-engine", "ordinary-nnc-state", "ordinary-nnc-presentation", "classical-url-state", "classical-verification"],
      description: "A typed selection that distinguishes absent, recognized, and invalid explicit class intent without granting raw formula strings authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "absent"].includes(frame?.authorizationStatus),
        diagnostic: "ordinary-nnc-noun-class-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.recognized === true && Boolean(frame?.normalizedValue),
        diagnostic: "authorized-ordinary-nnc-noun-class-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.inputProvided === true && Boolean(frame?.requestedValue) && Boolean(frame?.blockReason) && frame?.normalizedValue === "",
        diagnostic: "blocked-ordinary-nnc-noun-class-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "absent" || frame?.inputProvided === false,
        diagnostic: "absent-ordinary-nnc-noun-class-selection-invalid"
      }, {
        ok: frame?.rawFormulaStringAuthority === false,
        diagnostic: "ordinary-nnc-noun-class-selection-raw-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-semantic-input-vocabulary",
      version: 1,
      authorityRole: "canonical-semantic-vnc-input-vocabulary",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-lesson11-engine", "classical-presentation", "classical-verification"],
      description: "The Andrews-authorized semantic VNC mood and tense vocabulary, kept distinct from morphological fillers.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.moods) && frame.moods.length > 0 && Array.isArray(frame?.tenses) && frame.tenses.length > 0,
        diagnostic: "semantic-vnc-vocabulary-moods-and-tenses-required"
      }, {
        ok: frame?.tensesByMood && frame.moods?.every(mood => Array.isArray(frame.tensesByMood[mood]) && frame.tensesByMood[mood].every(tense => frame.tenses.includes(tense))),
        diagnostic: "semantic-vnc-vocabulary-mood-mapping-invalid"
      }, {
        ok: frame?.morphologicalFillersAreSeparate === true,
        diagnostic: "semantic-vnc-vocabulary-morphological-separation-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-semantic-selection-frame",
      version: 1,
      authorityRole: "typed-semantic-vnc-selection-authorization",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-lesson11-engine", "classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "A fail-closed semantic mood and tense selection validated before lexeme-specific realization.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "semantic-vnc-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.mood && frame?.semanticTense && frame?.moodTenses?.includes(frame.semanticTense) && frame?.allowedSemanticTenses?.includes(frame.semanticTense)),
        diagnostic: "authorized-semantic-vnc-selection-mood-and-tense-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || Boolean(frame?.blockReason),
        diagnostic: "blocked-semantic-vnc-selection-reason-required"
      }, {
        ok: frame?.semanticTenseIsNotMorphologicalFiller === true,
        diagnostic: "semantic-vnc-selection-morphological-separation-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-semantic-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-semantic-control-parity-audit",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A parity audit proving shell controls and Canvas ledger tags reproduce the canonical semantic vocabulary without becoming grammar authority.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "semantic-vnc-control-inventory-status-invalid"
      }, {
        ok: Array.isArray(frame?.moodValues) && Array.isArray(frame?.tenseValues) && Array.isArray(frame?.expectedMoodValues) && Array.isArray(frame?.expectedTenseValues),
        diagnostic: "semantic-vnc-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.moodInventoryMatches === true && frame?.tenseInventoryMatches === true && frame?.duplicateMoodValues?.length === 0 && frame?.duplicateTenseValues?.length === 0 && frame?.mismatchedAuthorityOptions?.length === 0,
        diagnostic: "authorized-semantic-vnc-control-inventory-parity-invalid"
      }, {
        ok: frame?.shellAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "semantic-vnc-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "generation-source-transitivity-vocabulary",
      version: 1,
      authorityRole: "canonical-source-topology-vocabulary",
      producer: "generation-valency-engine",
      consumers: ["classical-lesson4", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The ordered intransitive, transitive, and bitransitive source topology with A/B/C slots and vi/vt/vb aliases, separate from Canvas Valence authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.sourceTransitivities) && frame.sourceTransitivities.join("|") === "intransitive|transitive|bitransitive",
        diagnostic: "source-transitivity-vocabulary-invalid"
      }, {
        ok: frame?.aliases?.vi === "intransitive" && frame?.aliases?.vt === "transitive" && frame?.aliases?.vb === "bitransitive",
        diagnostic: "source-transitivity-aliases-invalid"
      }, {
        ok: frame?.sourceSlotByTransitivity?.intransitive === "a" && frame?.sourceSlotByTransitivity?.transitive === "b" && frame?.sourceSlotByTransitivity?.bitransitive === "c",
        diagnostic: "source-transitivity-slot-topology-invalid"
      }, {
        ok: frame?.structuralTopologyIsNotCanvasValenceAuthority === true,
        diagnostic: "source-transitivity-canvas-valence-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "generation-source-transitivity-selection-frame",
      version: 1,
      authorityRole: "typed-source-topology-recognition",
      producer: "generation-valency-engine",
      consumers: ["classical-lesson4", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "A recognition frame that distinguishes absent structural input from valid and invalid explicit source transitivity.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "not-applicable"].includes(frame?.authorizationStatus),
        diagnostic: "source-transitivity-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.recognized === true && ["a", "b", "c"].includes(frame?.sourceSlotKey),
        diagnostic: "authorized-source-transitivity-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.explicit === true && Boolean(frame?.blockReason) && frame?.sourceTransitivity === "" && frame?.sourceSlotKey === "",
        diagnostic: "blocked-source-transitivity-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "not-applicable" || frame?.explicit === false && frame?.sourceTransitivity === "" && frame?.sourceSlotKey === "",
        diagnostic: "absent-source-transitivity-selection-invalid"
      }, {
        ok: frame?.structuralTopologyIsNotCanvasValenceAuthority === true,
        diagnostic: "source-transitivity-selection-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "generation-source-transitivity-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-source-topology-control-parity-audit",
      producer: "classical-composer",
      consumers: ["classical-presentation", "classical-verification"],
      description: "An exact parity audit of three visible tab groups, the hidden state select, and A/B/C slot shells without granting those controls Canvas Valence authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "not-applicable"].includes(frame?.authorizationStatus),
        diagnostic: "source-transitivity-control-inventory-status-invalid"
      }, {
        ok: frame?.authorizationStatus === "not-applicable" || Array.isArray(frame?.expectedValues) && Array.isArray(frame?.visibleGroupValues) && Array.isArray(frame?.hiddenSelectValues) && Array.isArray(frame?.slotShellValues),
        diagnostic: "source-transitivity-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.inventoryMatches === true && frame?.hiddenSelectMatches === true && frame?.visibleGroupsMatch === true && frame?.slotShellsMatch === true,
        diagnostic: "authorized-source-transitivity-control-inventory-invalid"
      }, {
        ok: frame?.structuralControlsAreNotCanvasValenceAuthority === true,
        diagnostic: "source-transitivity-control-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-type-vocabulary",
      version: 1,
      authorityRole: "canonical-vnc-derivation-type-vocabulary",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The shared Direct, Causative, and Applicative protocol vocabulary whose contextual authorization remains with the typed Andrews derivation evaluator.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.derivationTypes) && frame.derivationTypes.length === 3 && frame.derivationTypes.includes(frame?.directType),
        diagnostic: "vnc-derivation-type-vocabulary-invalid"
      }, {
        ok: Array.isArray(frame?.derivedTypes) && frame.derivedTypes.every(type => frame.derivationTypes.includes(type) && type !== frame.directType),
        diagnostic: "vnc-derived-type-subset-invalid"
      }, {
        ok: frame?.contextualAuthorizationRemainsTyped === true,
        diagnostic: "vnc-derivation-contextual-authorization-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-type-selection-frame",
      version: 1,
      authorityRole: "typed-vnc-derivation-type-recognition",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "A fail-closed recognition frame for derivation type before typed source-specific causative or applicative authorization.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-derivation-type-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.allowedDerivationTypes?.includes(frame?.derivationType),
        diagnostic: "authorized-vnc-derivation-type-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || Boolean(frame?.blockReason) && frame?.derivationType === "",
        diagnostic: "blocked-vnc-derivation-type-selection-invalid"
      }, {
        ok: frame?.contextualAuthorizationRemainsTyped === true,
        diagnostic: "vnc-derivation-type-selection-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-type-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-vnc-derivation-control-parity-audit",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A parity audit of canonical derivation types, shell button values, and their Canvas evidence tags without granting grammar authority to the shell or ledger.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-derivation-control-inventory-status-invalid"
      }, {
        ok: Array.isArray(frame?.values) && Array.isArray(frame?.expectedValues),
        diagnostic: "vnc-derivation-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.inventoryMatches === true && frame?.duplicateValues?.length === 0 && frame?.mismatchedAuthorityOptions?.length === 0,
        diagnostic: "authorized-vnc-derivation-control-inventory-parity-invalid"
      }, {
        ok: frame?.shellAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "vnc-derivation-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-voice-vocabulary",
      version: 1,
      authorityRole: "canonical-vnc-voice-vocabulary",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The ordered target-voice inventory and intentional causative source-voice subset, separate from higher ordered voice-layer operations.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.targetVoices) && frame.targetVoices.length === 5 && Array.isArray(frame?.causativeSourceVoices) && frame.causativeSourceVoices.length === 3,
        diagnostic: "vnc-voice-vocabulary-invalid"
      }, {
        ok: frame?.causativeSourceVoiceIsContextualSubset === true && frame.causativeSourceVoices.every(voice => frame.targetVoices.includes(voice)),
        diagnostic: "vnc-causative-source-voice-subset-invalid"
      }, {
        ok: frame?.higherVoiceLayersAreSeparate === true,
        diagnostic: "vnc-higher-voice-layer-separation-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-voice-selection-frame",
      version: 1,
      authorityRole: "typed-vnc-voice-recognition",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "A fail-closed target or causative-source voice recognition frame whose contextual availability remains application-derived.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["target", "causative-source"].includes(frame?.role) && ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-voice-selection-role-or-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.allowedVoices?.includes(frame?.voice),
        diagnostic: "authorized-vnc-voice-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || Boolean(frame?.blockReason) && frame?.voice === "",
        diagnostic: "blocked-vnc-voice-selection-invalid"
      }, {
        ok: frame?.contextualAvailabilityRemainsApplicationDerived === true,
        diagnostic: "vnc-voice-contextual-availability-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-voice-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-vnc-voice-control-parity-audit",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-presentation", "classical-url-state", "classical-verification"],
      description: "A parity audit of ordered target/source voice controls and Canvas evidence tags, preserving entrada v1 positional meaning without granting UI authority.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-voice-control-inventory-status-invalid"
      }, {
        ok: Array.isArray(frame?.targetValues) && Array.isArray(frame?.sourceValues) && Array.isArray(frame?.expectedTargetValues) && Array.isArray(frame?.expectedSourceValues),
        diagnostic: "vnc-voice-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.targetInventoryMatches === true && frame?.sourceInventoryMatches === true && frame?.duplicateTargetValues?.length === 0 && frame?.duplicateSourceValues?.length === 0 && frame?.mismatchedAuthorityOptions?.length === 0,
        diagnostic: "authorized-vnc-voice-control-inventory-parity-invalid"
      }, {
        ok: frame?.shellAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "vnc-voice-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-result-output-scope-vocabulary",
      version: 1,
      authorityRole: "canonical-result-projection-vocabulary",
      producer: "classical-output-scope-contract",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The shared ordered single/paradigm Result vocabulary whose NNC and VNC paradigm builders remain role-specific.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.outputScopes)
          && frame.outputScopes.length === CLASSICAL_RESULT_OUTPUT_SCOPES.length
          && frame.outputScopes.every((scope, index) => scope === CLASSICAL_RESULT_OUTPUT_SCOPES[index]),
        diagnostic: "classical-result-output-scope-vocabulary-invalid"
      }, {
        ok: frame?.absentDefaultsToSingle === true && frame?.invalidExplicitInputBlocks === true,
        diagnostic: "classical-result-output-scope-default-or-block-boundary-invalid"
      }, {
        ok: frame?.roleSpecificParadigmBuildersRemainSeparate === true && frame?.shellCanvasAndUrlAreNotGrammarAuthority === true,
        diagnostic: "classical-result-output-scope-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-result-output-scope-selection-frame",
      version: 1,
      authorityRole: "typed-result-projection-scope-recognition",
      producer: "classical-output-scope-contract",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "A typed scope frame that defaults absent intent to single and blocks malformed explicit intent.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["nnc", "vnc", ""].includes(frame?.role) && ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "classical-result-output-scope-selection-role-or-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || CLASSICAL_RESULT_OUTPUT_SCOPES.includes(frame?.outputScope),
        diagnostic: "authorized-classical-result-output-scope-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.explicit === true && frame?.outputScope === "" && Boolean(frame?.blockReason),
        diagnostic: "blocked-classical-result-output-scope-selection-invalid"
      }, {
        ok: frame?.presentationScopeCannotAuthorizeGrammar === true && frame?.roleSpecificParadigmBuildersRemainSeparate === true,
        diagnostic: "classical-result-output-scope-selection-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-result-output-scope-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-result-scope-control-parity-audit",
      producer: "classical-presentation",
      consumers: ["classical-verification"],
      description: "An exact ordered shell and Canvas-ledger parity audit for NNC and VNC Result scope controls.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "not-applicable"].includes(frame?.authorizationStatus),
        diagnostic: "classical-result-output-scope-control-inventory-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.shellMatches === true && frame?.ledgerMatches === true && frame?.duplicateShellKeys?.length === 0 && frame?.duplicateLedgerKeys?.length === 0,
        diagnostic: "authorized-classical-result-output-scope-control-inventory-invalid"
      }, {
        ok: frame?.shellCanvasAndUrlAreNotGrammarAuthority === true && frame?.roleSpecificParadigmBuildersRemainSeparate === true,
        diagnostic: "classical-result-output-scope-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-request",
      version: 1,
      authorityRole: "normalized-user-intent",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-grammar-engine", "classical-presentation"],
      description: "A normalized request whose caller-provided surfaces and results are non-authoritative.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: typeof frame?.sourceStem === "string",
        diagnostic: "application-request-source-stem-string-required"
      }, {
        ok: typeof frame?.voice === "string",
        diagnostic: "application-request-selected-voice-required"
      }, {
        ok: frame?.outputScopeSelectionFrame?.kind === "classical-result-output-scope-selection-frame"
          && frame?.requestedOutputScopeRecognized === (frame.outputScopeSelectionFrame.authorizationStatus === "authorized"),
        diagnostic: "application-request-output-scope-selection-frame-required"
      }, {
        ok: frame?.callerSuppliedDerivedAuthorityAllowed === false,
        diagnostic: "application-request-caller-authority-must-be-disabled"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-control-frame",
      version: 1,
      authorityRole: "application-control-selection",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation"],
      description: "The allowed and selected voice inventory produced by the application boundary.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.allowedVoices) && frame.allowedVoices.length > 0,
        diagnostic: "application-control-allowed-voices-required"
      }, {
        ok: frame?.allowedVoices?.includes(frame?.selectedVoice),
        diagnostic: "application-control-selected-voice-must-be-allowed"
      }, {
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "application-control-status-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-result-frame",
      version: 1,
      authorityRole: "validated-typed-result",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The typed result selected by the application boundary after grammar authorization.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "application-result-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncApplicationResultFrame"),
        diagnostic: "authorized-application-result-canonical-validator-required"
      }, {
        ok: frame?.typedFrameAuthority === true,
        diagnostic: "application-result-typed-authority-required"
      }, {
        ok: frame?.formulaStringAuthority === false,
        diagnostic: "application-result-formula-string-authority-forbidden"
      }, {
        ok: frame?.surfaceStringAuthority === false,
        diagnostic: "application-result-surface-string-authority-forbidden"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "application-result-caller-authority-forbidden"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.selectedMachineryFrame && frame?.finalTypedVncSlotFrame),
        diagnostic: "authorized-application-result-requires-selected-machinery-and-final-typed-slot"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.formulaRealization === "" && frame?.selectedMachineryFrame == null && frame?.finalTypedVncSlotFrame == null && Array.isArray(frame?.appliedTypedFrames) && frame.appliedTypedFrames.length === 0,
        diagnostic: "blocked-application-result-authority-payload-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-frame",
      version: 1,
      authorityRole: "shared-action-envelope",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The shared request, control, and result envelope consumed outside the grammar engine.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.normalizedRequest?.kind === "classical-nahuatl-vnc-application-request",
        diagnostic: "application-frame-normalized-request-required"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncApplicationFrame"),
        diagnostic: "authorized-application-frame-canonical-validator-required"
      }, {
        ok: frame?.controlFrame?.kind === "classical-nahuatl-vnc-application-control-frame",
        diagnostic: "application-frame-control-frame-required"
      }, {
        ok: frame?.resultFrame?.kind === "classical-nahuatl-vnc-application-result-frame",
        diagnostic: "application-frame-result-frame-required"
      }, {
        ok: frame?.authorizationStatus === frame?.resultFrame?.authorizationStatus,
        diagnostic: "application-frame-result-status-mismatch"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || (
          frame?.resultFrame?.authorizationStatus === "blocked"
          && frame?.resultFrame?.formulaRealization === ""
          && frame?.resultFrame?.selectedMachineryFrame == null
          && frame?.resultFrame?.finalTypedVncSlotFrame == null
          && Array.isArray(frame?.resultFrame?.appliedTypedFrames)
          && frame.resultFrame.appliedTypedFrames.length === 0
          && (frame?.controlFrame?.authorizationStatus === "blocked" || (
            frame?.blockReason === "classical-vnc-causative-object-kind-choice-required"
            && frame?.controlFrame?.authorizationStatus === "authorized"
            && frame?.controlFrame?.causativeObjectKindChoiceEligible === true
            && frame?.controlFrame?.causativeObjectKindSelectionRequired === true
            && frame?.controlFrame?.selectedCausativeObjectKind === ""
          ))
        ),
        diagnostic: "blocked-application-frame-status-and-authority-payload-mismatch"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "application-frame-caller-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-service",
      version: 1,
      authorityRole: "application-capability",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The injected service that performs the shared Lesson 20-22 application action.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "application-service-status-invalid"
      }, {
        ok: typeof frame?.evaluate === "function",
        diagnostic: "application-service-evaluate-function-required"
      }, {
        ok: Array.isArray(frame?.requiredCapabilities),
        diagnostic: "application-service-required-capability-list-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-source-analysis",
      version: 1,
      authorityRole: "engine-derived-source-morphology-authority",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-derivation-evaluator", "classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "A canonical boundary-free Lessons 24-25 analysis that binds the active formation basis to its active, passive, or impersonal participant source; editorial hyphens are observations and never authority.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-source-analysis-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationSourceAnalysisFrame"),
        diagnostic: "authorized-derivation-source-analysis-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceSignature && frame?.sourceStem && frame?.lexicalStem && frame?.sourceMachineryFrame),
        diagnostic: "authorized-derivation-source-analysis-source-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || ["active", "passive", "impersonal"].includes(frame?.sourceVoice) && Boolean(frame?.formationSourceSignature && frame?.formationSourceMachineryFrame && frame?.participantSourceTypedIdentity && frame?.participantSurfaceSubject) && Array.isArray(frame?.participantSurfaceObjectRequests),
        diagnostic: "authorized-derivation-source-analysis-formation-and-participant-bases-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.analyses) && frame?.analysisCount === frame.analyses.length,
        diagnostic: "derivation-source-analysis-array-required"
      }, {
        ok: frame?.callerSuppliedAnalysisAllowed === false && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false,
        diagnostic: "derivation-source-analysis-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-canvas-derivation-choice-frame",
      version: 1,
      authorityRole: "compiled-canvas-derivation-choice-authority",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "One source-bound Canvas derivation identity with typed formation, exact realization, and eligibility metadata. Target spelling is not operation identity.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized",
        diagnostic: "canvas-derivation-choice-authorized-status-required"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlCanvasDerivationChoiceFrame"),
        diagnostic: "authorized-canvas-derivation-choice-canonical-validator-required"
      }, {
        ok: Boolean(frame?.identity?.choiceId && frame?.identity?.operationId && frame?.source?.signature && frame?.formation?.operation && frame?.targetRealization?.canonicalStem),
        diagnostic: "canvas-derivation-choice-identity-source-formation-and-realization-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.callerSuppliedTargetAllowed === false && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false,
        diagnostic: "canvas-derivation-choice-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-option-inventory",
      version: 1,
      authorityRole: "engine-derived-option-authority",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "The derivational candidates rebuilt from an authorized typed source VNC and Andrews rule evidence.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-option-inventory-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationOptionInventory"),
        diagnostic: "authorized-derivation-option-inventory-canonical-validator-required"
      }, {
        ok: ["direct", "causative", "applicative"].includes(frame?.derivationType),
        diagnostic: "derivation-option-inventory-type-invalid"
      }, {
        ok: Array.isArray(frame?.options),
        diagnostic: "derivation-option-inventory-options-array-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame.derivationType === "direct" || frame.options.length > 0,
        diagnostic: "authorized-derived-option-inventory-requires-options"
      }, {
        ok: frame?.selectorRequired === (frame?.options?.length > 1 || frame?.analysisSelectionRequired === true) && frame?.selectionRequired === frame?.selectorRequired,
        diagnostic: "derivation-option-inventory-selector-state-invalid"
      }, {
        ok: frame?.options?.length === 1 && frame?.selectorRequired !== true ? frame.automaticOptionId === frame.options[0].optionId : frame?.automaticOptionId === "",
        diagnostic: "derivation-option-inventory-automatic-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.sourceAnalysisFrame?.kind === "classical-nahuatl-vnc-derivation-source-analysis" && isAuthorizedGrammarContractCanonical(frame.sourceAnalysisFrame, "isClassicalNahuatlVncDerivationSourceAnalysisFrame"),
        diagnostic: "derivation-option-inventory-canonical-source-analysis-required"
      }, {
        ok: typeof frame?.sourceSignature === "string" && (frame.authorizationStatus !== "authorized" || Boolean(frame.sourceSignature)),
        diagnostic: "derivation-option-inventory-source-signature-required"
      }, {
        ok: typeof frame?.canonicalSignature === "string" && Boolean(frame.canonicalSignature),
        diagnostic: "derivation-option-inventory-canonical-signature-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false,
        diagnostic: "derivation-option-inventory-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-operation-frame",
      version: 1,
      authorityRole: "typed-derivation-operation-authority",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-vnc-derived-machinery-builder", "classical-verification"],
      description: "A source-bound operation that selects an engine-generated stem candidate and derives its participant transformation.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-operation-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationOperationFrame"),
        diagnostic: "authorized-derivation-operation-canonical-validator-required"
      }, {
        ok: ["direct", "causative", "applicative"].includes(frame?.derivationType),
        diagnostic: "derivation-operation-type-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.selectedOptionId && frame?.selectedOption && frame?.targetStem && frame?.targetClass),
        diagnostic: "authorized-derivation-operation-requires-selected-option-and-target"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.participantTransformFrame?.authorizationStatus === "authorized" && Array.isArray(frame?.targetObjectRequests) && frame.targetObjectRequests.length >= 1 && frame.targetObjectRequests.length <= 3,
        diagnostic: "authorized-derivation-operation-requires-participant-transform"
      }, {
        ok: typeof frame?.sourceSignature === "string" && typeof frame?.canonicalSignature === "string" && (frame.authorizationStatus !== "authorized" || Boolean(frame.sourceSignature && frame.canonicalSignature)),
        diagnostic: "derivation-operation-signatures-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false && frame?.rawNawatForwardPoolUsed === false,
        diagnostic: "derivation-operation-external-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derived-machinery-frame",
      version: 1,
      authorityRole: "typed-source-operation-target-machinery",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-canvas-layer-finalizers", "classical-verification"],
      description: "The Lesson 7 and Lesson 23 target machinery produced from a validated typed source and derivation operation.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derived-vnc-machinery-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDerivedVncMachineryFrame"),
        diagnostic: "authorized-derived-vnc-machinery-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMachineryFrame && frame?.derivationOperationFrame && frame?.targetTypedVncSlotFrame && frame?.proofFrame),
        diagnostic: "authorized-derived-vnc-machinery-requires-source-operation-target"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.derivationOperationFrame?.targetStem === frame?.targetStem && frame?.derivationOperationFrame?.targetClass === frame?.targetClass,
        diagnostic: "derived-vnc-machinery-operation-target-continuity-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.targetObjectRequests) && frame.targetObjectRequests.length >= 1 && frame.targetObjectRequests.length <= 3,
        diagnostic: "authorized-derived-vnc-machinery-target-objects-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.rawNawatForwardPoolUsed === false,
        diagnostic: "derived-vnc-machinery-typed-authority-boundary-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || typeof frame?.canonicalSignature === "string" && Boolean(frame.canonicalSignature),
        diagnostic: "authorized-derived-vnc-machinery-canonical-signature-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-finite-surface-frame",
      version: 1,
      authorityRole: "typed-canvas-finite-word-finalizer",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "The exact finite Classical word projected from canonical typed VNC machinery after the active Lessons 24-25 Canvas layer has finalized quantity, participant order, and boundary allomorphy.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "classical-vnc-finite-surface-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncFiniteSurfaceFrame"),
        diagnostic: "authorized-classical-vnc-finite-surface-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.machineryFrame && frame?.typedFrame && frame?.wordRealization && frame?.canonicalSignature),
        diagnostic: "authorized-classical-vnc-finite-surface-typed-source-and-word-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.participantPositions) && Array.isArray(frame?.orderedParticipantRoles) && frame?.participantCount === frame.participantPositions.length,
        diagnostic: "authorized-classical-vnc-finite-surface-participant-projection-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.grammarAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "classical-vnc-finite-surface-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-lesson25-13-alternative-source-projection-frame",
      version: 1,
      authorityRole: "typed-canvas-alternative-source-quantity-projection",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-verification"],
      description: "The signed alternative Lesson 25.13 source reading projected from a canonical recursive causative operation and its engine-owned reverse-source analysis.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson25-13-alternative-source-projection-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLesson2513AlternativeSourceProjectionFrame"),
        diagnostic: "authorized-lesson25-13-alternative-source-projection-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.operationFrame && frame?.sourceMachineryFrame && frame?.reverseSourceAnalysis && frame?.sourceFiniteSurfaceFrame && frame?.sourcePredicateQuantityFrame && frame?.sourceWordRealization && frame?.canonicalSignature),
        diagnostic: "authorized-lesson25-13-alternative-source-projection-typed-history-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || ["active", "passive"].includes(frame?.sourceVoice),
        diagnostic: "authorized-lesson25-13-alternative-source-projection-voice-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.grammarAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lesson25-13-alternative-source-projection-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-lessons24-25-canvas-citation-projection-frame",
      version: 1,
      authorityRole: "typed-canvas-citation-history-projection",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A canonical Canvas citation and complete source-to-target history projected from typed source, operation, participant, and target machinery.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons24-25-canvas-citation-projection-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLessons2425CanvasCitationProjectionFrame"),
        diagnostic: "authorized-lessons24-25-canvas-citation-projection-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.machineryFrame && frame?.typedFrame && frame?.citationRealization && frame?.relationRealization && frame?.canonicalSignature),
        diagnostic: "authorized-lessons24-25-canvas-citation-projection-history-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.citationStages) && frame.citationStages.length >= 1 && Array.isArray(frame?.orderedParticipantRoles),
        diagnostic: "authorized-lessons24-25-canvas-citation-projection-stages-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.grammarAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lessons24-25-canvas-citation-projection-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-lessons24-25-canvas-citation-projection-inventory",
      version: 1,
      authorityRole: "typed-canvas-causative-option-inventory",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-presentation", "classical-verification"],
      description: "All canonical causative citation projections independently enumerated from the source inventory and typed participant choices, without consulting an expected target.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons24-25-canvas-citation-inventory-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLessons2425CanvasCitationProjectionInventory"),
        diagnostic: "authorized-lessons24-25-canvas-citation-inventory-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.options) && frame?.optionCount === frame.options.length,
        diagnostic: "lessons24-25-canvas-citation-inventory-options-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMachineryFrame && frame?.derivationOptionInventory && frame?.canonicalSignature) && frame.options.length > 0,
        diagnostic: "authorized-lessons24-25-canvas-citation-inventory-source-and-options-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lessons24-25-canvas-citation-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-lessons24-25-canvas-schematic-citation-possibility-inventory",
      version: 1,
      authorityRole: "typed-canvas-schematic-citation-possibility-inventory",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-verification"],
      description: "A signed machinery-light enumeration of Canvas causative citation relations from one canonical source inventory and four engine-owned participant profiles; expected catalog targets are never inputs.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons24-25-canvas-schematic-citation-inventory-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLessons2425CanvasSchematicCitationPossibilityInventory"),
        diagnostic: "authorized-lessons24-25-canvas-schematic-citation-inventory-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.possibilities) && frame?.possibilityCount === frame.possibilities.length,
        diagnostic: "lessons24-25-canvas-schematic-citation-inventory-possibilities-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMachineryFrame && frame?.derivationOptionInventory && frame?.sourceProjectionFrame && frame?.canonicalSignature) && frame.possibilities.length > 0,
        diagnostic: "authorized-lessons24-25-canvas-schematic-citation-inventory-source-and-possibilities-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lessons24-25-canvas-schematic-citation-inventory-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24.2-nonactive-printed-surface-operation-frame",
      authorityRole: "typed-later-surface-operation",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-verification"],
      description: "The Lesson 24.2 operation that projects a printed finite nonactive surface from an unchanged canonical Lesson 20 stem record.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-2-nonactive-surface-operation-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.inputCanonicalNonactiveStem && frame?.operation && frame?.quantityChange),
        diagnostic: "authorized-lesson24-2-nonactive-surface-operation-input-and-operation-required"
      }, {
        ok: frame?.analysisBoundariesRemainInLowerRecord === true && frame?.canonicalQuantityRemainsInLowerRecord === true && frame?.callerSuppliedSurfaceAllowed === false && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson24-2-nonactive-surface-operation-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24.2-nonactive-printed-surface-frame",
      authorityRole: "typed-later-nonactive-surface-finalizer",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-presentation", "classical-verification"],
      description: "The exact Lesson 24.2 finite nonactive surface projected from a canonical lower Lesson 20 record without mutating its stem analysis.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-2-nonactive-surface-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLesson242NonactiveSurfaceFrame"),
        diagnostic: "authorized-lesson24-2-nonactive-surface-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.lowerNonactiveStemRecord && frame?.canonicalNonactiveStem && frame?.printedSurfaceWord && frame?.surfaceOperationFrame),
        diagnostic: "authorized-lesson24-2-nonactive-surface-history-required"
      }, {
        ok: frame?.lowerRecordMutated === false && frame?.canonicalStemRemainsAuthoritative === true && frame?.callerSuppliedSurfaceAllowed === false && frame?.targetStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson24-2-nonactive-surface-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-root-stock-source-morphology-frame",
      authorityRole: "typed-root-stock-source-morphology",
      producer: "classical-vnc-layer-evaluator",
      description: "The ordered root, stock-formative, and optional stem-formative source consumed by Lesson 24 stock formation.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-root-stock-source-status-invalid"
      }, {
        ok: frame?.root?.role === "root" && frame?.root?.rank === "root" && frame?.stockFormative?.role === "stock-formative" && frame?.stockFormative?.rank === "stock-formative",
        diagnostic: "lesson24-root-stock-source-ranked-morphology-required"
      }, {
        ok: Array.isArray(frame?.morphOrder) && frame.morphOrder[0] === "root" && frame.morphOrder[1] === "stock-formative" && (!frame?.stemFormative || frame.morphOrder[2] === "stem-formative"),
        diagnostic: "lesson24-root-stock-source-order-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.root?.morph && frame?.stockFormative?.morph),
        diagnostic: "authorized-lesson24-root-stock-source-morphs-required"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-stock-formation-frame",
      authorityRole: "typed-root-to-stock-formation",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-presentation", "classical-verification"],
      description: "A canonical Lesson 24 root-to-stock or root-to-stock-to-verbstem formation licensed by the engine-owned Andrews profile.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-stock-formation-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLesson24StockFormationFrame"),
        diagnostic: "authorized-lesson24-stock-formation-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMorphologyFrame && frame?.stockStem && frame?.targetStem && frame?.formationSteps?.length),
        diagnostic: "authorized-lesson24-stock-formation-history-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.targetStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.surfaceGenerationAllowed === false,
        diagnostic: "lesson24-stock-formation-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-identical-vowel-source-morphology-frame",
      authorityRole: "typed-identical-vowel-source-morphology",
      producer: "classical-vnc-layer-evaluator",
      description: "The ranked root-final vowel, stock formative, and stem formative consumed by the Lesson 24 identical-vowel coalescence rule.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-identical-vowel-source-status-invalid"
      }, {
        ok: frame?.root?.role === "root" && frame?.root?.rank === "root" && frame?.stockFormative?.role === "stock-formative" && frame?.stockFormative?.rank === "stock-formative" && frame?.stemFormative?.role === "stem-formative" && frame?.stemFormative?.rank === "stem-formative",
        diagnostic: "lesson24-identical-vowel-source-ranked-morphology-required"
      }, {
        ok: Array.isArray(frame?.morphOrder) && frame.morphOrder.join("|") === "root|stock-formative|stem-formative",
        diagnostic: "lesson24-identical-vowel-source-order-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.root?.morph && frame?.root?.finalVowel && frame?.stockFormative?.morph && frame?.stockFormative?.underlyingShortVowel && frame?.stemFormative?.morph),
        diagnostic: "authorized-lesson24-identical-vowel-source-morphs-required"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-identical-vowel-coalescence-operation-frame",
      authorityRole: "typed-identical-vowel-coalescence-operation",
      producer: "classical-vnc-layer-evaluator",
      description: "The typed two-vowel-to-one-long-vowel operation nested in a canonical Lesson 24 coalescence frame.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-identical-vowel-operation-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.leftVowel && frame?.rightVowel && frame?.sharedVowelQuality && frame?.outputVowel),
        diagnostic: "authorized-lesson24-identical-vowel-operation-vowels-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.consumesTwoUnderlyingVowels === true && frame?.producesOneLongVowel === true,
        diagnostic: "authorized-lesson24-identical-vowel-operation-effect-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-identical-vowel-coalescence-frame",
      authorityRole: "typed-identical-vowel-coalescence-result",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-presentation", "classical-verification"],
      description: "A canonical Lesson 24 stem formed by identical root-final and stock-formative vowel coalescence.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-identical-vowel-coalescence-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLesson24VowelCoalescenceFrame"),
        diagnostic: "authorized-lesson24-identical-vowel-coalescence-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMorphologyFrame && frame?.coalescenceOperationFrame && frame?.uncoalescedStem && frame?.targetStem),
        diagnostic: "authorized-lesson24-identical-vowel-coalescence-history-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.targetStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.surfaceGenerationAllowed === false,
        diagnostic: "lesson24-identical-vowel-coalescence-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-synonym-option",
      authorityRole: "engine-owned-exact-synonym-option",
      producer: "classical-vnc-layer-evaluator",
      description: "One engine-owned Andrews Lesson 24.6.3 source-to-synonym route selectable only by its option identity.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.optionId && frame?.sourceStem && frame?.targetStem && frame?.andrewsSection),
        diagnostic: "lesson24-synonym-option-identity-and-endpoints-required"
      }, {
        ok: frame?.operation === "select-exact-destockal-synonym" && frame?.selectionAuthority === "engine-owned-Andrews-exact-route-id",
        diagnostic: "lesson24-synonym-option-selection-authority-invalid"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false,
        diagnostic: "lesson24-synonym-option-caller-target-forbidden"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-synonym-option-inventory",
      authorityRole: "engine-owned-exact-synonym-inventory",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-presentation", "classical-verification"],
      description: "The exact Lesson 24.6.3 synonym routes independently enumerated from a source lexical identity.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-synonym-inventory-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLesson24SynonymOptionInventory"),
        diagnostic: "authorized-lesson24-synonym-inventory-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.options) && frame.options.every(option => option?.kind === "classical-nahuatl-lesson24-synonym-option" && option?.version === 1),
        diagnostic: "lesson24-synonym-inventory-versioned-options-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.targetStringAuthority === false,
        diagnostic: "lesson24-synonym-inventory-caller-target-forbidden"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson24-synonym-derivation-frame",
      authorityRole: "typed-exact-synonym-selection",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-presentation", "classical-verification"],
      description: "A Lesson 24.6.3 synonym selected by an engine-owned option ID rather than a caller-supplied target string.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-synonym-derivation-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLesson24SynonymFrame"),
        diagnostic: "authorized-lesson24-synonym-derivation-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.optionInventory && frame?.selectedOptionId && frame?.sourceStem && frame?.targetStem),
        diagnostic: "authorized-lesson24-synonym-derivation-selection-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.targetStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.surfaceGenerationAllowed === false,
        diagnostic: "lesson24-synonym-derivation-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson25.3-specific-shuntline-realization-rule-frame",
      authorityRole: "typed-specific-object-shuntline-rule",
      producer: "classical-vnc-layer-evaluator",
      description: "The Lesson 25.3 silent-or-sounded realization rule for an eligible retained specific object on the shuntline.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.section === "25.3" && ["silent", "sounded"].includes(frame?.selectedRealization),
        diagnostic: "lesson25-3-specific-shuntline-section-and-realization-invalid"
      }, {
        ok: Boolean(frame?.specificShuntlineObjectId && frame?.causativeMainlineObjectId),
        diagnostic: "lesson25-3-specific-shuntline-object-identities-required"
      }, {
        ok: frame?.silentIsGeneralPractice === true && frame?.soundedIsDocumentedWriterVariant === true && frame?.callerSuppliedCarrierAllowed === false,
        diagnostic: "lesson25-3-specific-shuntline-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-vnc-exact-nonactive-bridge-frame",
      authorityRole: "signed-exact-nonactive-bridge-evidence",
      producer: "classical-vnc-derivation-evaluator",
      description: "A signed Andrews exact nonactive bridge bound to one canonical typed source analysis and one causative option.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized",
        diagnostic: "exact-nonactive-bridge-must-be-authorized"
      }, {
        ok: Boolean(frame?.sourceStem && frame?.sourceSignature && frame?.sourceClass && frame?.sourceValence && frame?.nonactiveStem && frame?.suffixFamily && frame?.ruleId && frame?.andrewsSection && frame?.canonicalSignature),
        diagnostic: "exact-nonactive-bridge-source-witness-and-signature-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false && frame?.callerSuppliedTargetAllowed === false,
        diagnostic: "exact-nonactive-bridge-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson25-retained-source-reflexive-shuntline-rule-frame",
      authorityRole: "typed-retained-reflexive-shuntline-rule",
      producer: "classical-vnc-derivation-evaluator",
      description: "The Lesson 25.13 participant rule that moves a retained source reflexive from mainline person to nonfirst-common shuntline realization.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized" && frame?.section === "25.13",
        diagnostic: "retained-reflexive-shuntline-rule-status-and-section-invalid"
      }, {
        ok: Array.isArray(frame?.sourceReflexiveObjectIds) && frame.sourceReflexiveObjectIds.length > 0 && new Set(frame.sourceReflexiveObjectIds).size === frame.sourceReflexiveObjectIds.length && frame?.targetObjectPerson === "nonfirst-common",
        diagnostic: "retained-reflexive-shuntline-rule-object-contract-invalid"
      }, {
        ok: frame?.typedParticipantAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "retained-reflexive-shuntline-rule-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-vnc-derivation-operation-batch-frame",
      authorityRole: "typed-source-bound-operation-batch",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-lesson25-later-layers", "classical-verification"],
      description: "A canonical batch of derivation operations generated from one signed source and one canonical option inventory before evidence matching.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-operation-batch-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationOperationBatchFrame"),
        diagnostic: "authorized-derivation-operation-batch-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.operationRequests) && Array.isArray(frame?.operationFrames) && frame?.operationCount === frame.operationRequests.length && frame.operationCount === frame.operationFrames.length,
        diagnostic: "derivation-operation-batch-count-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false && frame?.callerSuppliedTargetAllowed === false,
        diagnostic: "derivation-operation-batch-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lesson25-13-source-predicate-quantity-frame",
      authorityRole: "typed-alternative-source-quantity-operation",
      producer: "classical-lesson25-later-layers",
      description: "The bounded Lesson 25.13 source-predicate quantity operation nested in the signed alternative-source projection.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized" && frame?.andrewsSection === "25.13" && ["active", "passive"].includes(frame?.sourceVoice),
        diagnostic: "lesson25-13-source-predicate-quantity-context-invalid"
      }, {
        ok: Boolean(frame?.sourcePredicateStem && frame?.projectedPredicateStem && frame?.operation && frame?.ruleId),
        diagnostic: "lesson25-13-source-predicate-quantity-operation-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson25-13-source-predicate-quantity-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lessons24-25-canvas-citation-stage-frame",
      authorityRole: "typed-canvas-citation-stage",
      producer: "classical-lesson25-later-layers",
      description: "One typed source, bridge, or target stage in a complete Lessons 24-25 Canvas citation history.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.stageRole && frame?.predicateStem && frame?.sourceAuthority && frame?.citationRealization),
        diagnostic: "canvas-citation-stage-role-predicate-authority-and-realization-required"
      }, {
        ok: Array.isArray(frame?.participantPositions) && Array.isArray(frame?.orderedParticipantRoles) && frame?.participantCount === frame.orderedParticipantRoles.length,
        diagnostic: "canvas-citation-stage-participant-projection-invalid"
      }, {
        ok: frame?.orderedParticipantRoles.every(role => Boolean(role?.objectId && role?.objectKind && role?.surface)),
        diagnostic: "canvas-citation-stage-ordered-role-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lessons24-25-canvas-citation-projection-option",
      authorityRole: "signed-canvas-citation-projection-option",
      producer: "classical-lesson25-later-layers",
      description: "One signed citation projection generated from a canonical derivation option, operation, participant profile, and target machinery.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.optionId && frame?.derivationOptionId && frame?.canonicalSignature && frame?.relationRealization),
        diagnostic: "canvas-citation-projection-option-identities-and-signature-required"
      }, {
        ok: isGrammarContractCanonicalFrame(frame?.operationFrame, "isClassicalNahuatlVncDerivationOperationFrame") && isGrammarContractCanonicalFrame(frame?.machineryFrame, "isClassicalNahuatlDerivedVncMachineryFrame") && isGrammarContractCanonicalFrame(frame?.projectionFrame, "isClassicalNahuatlLessons2425CanvasCitationProjectionFrame"),
        diagnostic: "canvas-citation-projection-option-canonical-frames-required"
      }, {
        ok: frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.catalogTargetAuthority === false,
        diagnostic: "canvas-citation-projection-option-string-authority-forbidden"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-lessons24-25-canvas-schematic-citation-possibility",
      authorityRole: "signed-canvas-schematic-citation-possibility",
      producer: "classical-lesson25-later-layers",
      description: "One signed machinery-light source-to-target citation relation generated before any expected Canvas target is queried.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.profile && frame?.derivationOptionId && frame?.derivationOptionSignature && frame?.operationFrame && frame?.canonicalSignature),
        diagnostic: "canvas-schematic-citation-possibility-profile-option-and-signature-required"
      }, {
        ok: isGrammarContractCanonicalFrame(frame?.operationFrame, "isClassicalNahuatlVncDerivationOperationFrame"),
        diagnostic: "canvas-schematic-citation-possibility-canonical-operation-required"
      }, {
        ok: Boolean(frame?.sourceCitationRealization && frame?.sourceHistoryRealization && frame?.citationRealization && frame?.relationRealization) && Array.isArray(frame?.participantPositions) && Array.isArray(frame?.orderedParticipantRoles) && frame?.participantCount === frame.orderedParticipantRoles.length,
        diagnostic: "canvas-schematic-citation-possibility-history-and-participants-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "canvas-schematic-citation-possibility-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-canonical-source-stem-record",
      version: 1,
      authorityRole: "non-authorizing-canonical-source-selection-record",
      producer: "classical-source-stem-inventory",
      consumers: ["classical-source-ui", "classical-verification"],
      description: "One exact lexical VNC verbstem or NNC nounstem citation for Source selection without formula or grammar authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["vnc", "nnc"].includes(frame?.basalUnit) && typeof frame?.stem === "string" && Boolean(frame.stem) && typeof frame?.citation === "string" && Boolean(frame.citation),
        diagnostic: "canonical-source-stem-record-basal-unit-stem-and-citation-required"
      }, {
        ok: frame?.selectionAuthority === "source-only" && frame?.grammarAuthority === false && frame?.formulaStringAuthority === false,
        diagnostic: "canonical-source-stem-record-authority-boundary-invalid"
      }, {
        ok: !/[#>+=□]/u.test(String(frame?.citation || "")),
        diagnostic: "canonical-source-stem-record-formula-shaped-citation-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-canonical-source-stem-inventory-audit",
      version: 1,
      authorityRole: "non-authorizing-source-inventory-audit",
      producer: "classical-source-stem-inventory",
      consumers: ["classical-verification"],
      description: "A structural audit of the canonical Source picker inventory, including duplicate and root-quantity conflict checks.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Number.isInteger(frame?.recordCount) && Number.isInteger(frame?.vncCount) && Number.isInteger(frame?.nncCount) && frame.recordCount === frame.vncCount + frame.nncCount,
        diagnostic: "canonical-source-stem-inventory-audit-counts-invalid"
      }, {
        ok: frame?.invalidRecordCount === 0 && frame?.duplicateCount === 0,
        diagnostic: "canonical-source-stem-inventory-audit-record-failure-present"
      }, {
        ok: frame?.quantityConflictPresent === false && frame?.canonicalQuantityPresent === true && frame?.ok === true,
        diagnostic: "canonical-source-stem-inventory-audit-quantity-adjudication-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-lesson25-mood-transformation-frame",
      version: 1,
      authorityRole: "typed-causative-assertion-mood-transformation",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-canvas-layer-finalizers", "classical-presentation", "classical-verification"],
      description: "A canonical Lesson 25.14 transform that preserves causative lexical and participant identities while Lessons 9 and 10 rebuild the finite mood and sentence environment.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson25-mood-transformation-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlLesson2514MoodTransformationFrame"),
        diagnostic: "authorized-lesson25-mood-transformation-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceFrame && frame?.sourceTypedFrame && frame?.targetTypedFrame && frame?.targetSentenceFrame),
        diagnostic: "authorized-lesson25-mood-transformation-typed-source-target-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || ["wish", "command", "exhortation", "indirect-admonition"].includes(frame?.transformationType),
        diagnostic: "authorized-lesson25-mood-transformation-type-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.lexicalDerivationIdentityPreserved === true && frame?.participantIdentityPreserved === true,
        diagnostic: "authorized-lesson25-mood-transformation-identity-continuity-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lesson25-mood-transformation-authority-boundary-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || typeof frame?.canonicalSignature === "string" && Boolean(frame.canonicalSignature),
        diagnostic: "authorized-lesson25-mood-transformation-signature-required"
      }])
    })]);
    var DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS = Object.freeze([Object.freeze({
      requirementId: "classical-vnc-application",
      capability: "evaluateClassicalNahuatlVncApplication",
      expectedType: "function",
      requiredBy: ["classical-presentation", "classical-verification"],
      reason: "Presentation and verification require the same shared Lesson 20-22 application action."
    })]);
    var DEFAULT_GRAMMAR_CONTRACT_REGISTRY = createGrammarContractRegistry({
      registryId: "default-grammar-contracts",
      definitions: DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS,
      capabilityRequirements: DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS
    });
    function getDefaultGrammarContractRegistry() {
      return DEFAULT_GRAMMAR_CONTRACT_REGISTRY;
    }
    function getGrammarContractRegistryPublicApi() {
      return {
        GRAMMAR_CONTRACT_REGISTRY_VERSION,
        GRAMMAR_CAPABILITY_EXPECTED_TYPES,
        DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS,
        DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS,
        DEFAULT_GRAMMAR_CONTRACT_REGISTRY,
        createGrammarContractRegistry,
        isGrammarContractRegistry,
        registerGrammarContractDefinition,
        getGrammarContractDefinition,
        listGrammarContractDefinitions,
        inspectRegisteredGrammarContract,
        isRegisteredGrammarContract,
        assertRegisteredGrammarContract,
        registerGrammarCapabilityRequirement,
        getGrammarCapabilityRequirement,
        listGrammarCapabilityRequirements,
        inspectGrammarCapabilityRequirements,
        assertGrammarCapabilityRequirements,
        getDefaultGrammarContractRegistry,
        installGrammarContractRegistryClassicGlobals
      };
    }
    function installGrammarContractRegistryClassicGlobals(globalTarget = globalThis) {
      if (!globalTarget || typeof globalTarget !== "object" && typeof globalTarget !== "function") {
        throw new TypeError("Grammar contract registry globals require an object target.");
      }
      const descriptors = Object.getOwnPropertyDescriptors(getGrammarContractRegistryPublicApi());
      Object.entries(descriptors).forEach(([name, descriptor]) => {
        const existing = Object.getOwnPropertyDescriptor(globalTarget, name);
        if (!existing) {
          Object.defineProperty(globalTarget, name, descriptor);
          return;
        }
        if ("value" in descriptor && existing.writable === true) {
          globalTarget[name] = descriptor.value;
        }
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = getGrammarContractRegistryPublicApi();
    }
    if (typeof targetObject.window !== "undefined") {
      installGrammarContractRegistryClassicGlobals(targetObject.window);
    }

    const api = {};
    Object.defineProperty(api, "GRAMMAR_CONTRACT_REGISTRY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_CONTRACT_REGISTRY_VERSION; },
        set(value) { GRAMMAR_CONTRACT_REGISTRY_VERSION = value; },
    });
    Object.defineProperty(api, "GRAMMAR_CONTRACT_REGISTRY_STATE", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_CONTRACT_REGISTRY_STATE; },
        set(value) { GRAMMAR_CONTRACT_REGISTRY_STATE = value; },
    });
    Object.defineProperty(api, "GRAMMAR_CAPABILITY_EXPECTED_TYPES", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_CAPABILITY_EXPECTED_TYPES; },
        set(value) { GRAMMAR_CAPABILITY_EXPECTED_TYPES = value; },
    });
    api.normalizeGrammarRegistryToken = normalizeGrammarRegistryToken;
    api.normalizeGrammarRegistryStringList = normalizeGrammarRegistryStringList;
    api.createGrammarRegistryError = createGrammarRegistryError;
    api.getGrammarContractRegistryState = getGrammarContractRegistryState;
    api.isGrammarContractRegistry = isGrammarContractRegistry;
    api.createGrammarContractRegistry = createGrammarContractRegistry;
    api.getGrammarContractDefinitionKey = getGrammarContractDefinitionKey;
    api.normalizeGrammarContractDefinition = normalizeGrammarContractDefinition;
    api.registerGrammarContractDefinition = registerGrammarContractDefinition;
    api.getGrammarContractDefinition = getGrammarContractDefinition;
    api.listGrammarContractDefinitions = listGrammarContractDefinitions;
    api.normalizeGrammarContractValidationResult = normalizeGrammarContractValidationResult;
    api.inspectRegisteredGrammarContract = inspectRegisteredGrammarContract;
    api.isRegisteredGrammarContract = isRegisteredGrammarContract;
    api.assertRegisteredGrammarContract = assertRegisteredGrammarContract;
    api.normalizeGrammarCapabilityRequirement = normalizeGrammarCapabilityRequirement;
    api.registerGrammarCapabilityRequirement = registerGrammarCapabilityRequirement;
    api.getGrammarCapabilityRequirement = getGrammarCapabilityRequirement;
    api.listGrammarCapabilityRequirements = listGrammarCapabilityRequirements;
    api.getGrammarCapabilityValue = getGrammarCapabilityValue;
    api.getGrammarCapabilityValueType = getGrammarCapabilityValueType;
    api.inspectGrammarCapabilityRequirements = inspectGrammarCapabilityRequirements;
    api.assertGrammarCapabilityRequirements = assertGrammarCapabilityRequirements;
    api.buildGrammarContractValidationResult = buildGrammarContractValidationResult;
    Object.defineProperty(api, "DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS; },
        set(value) { DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS = value; },
    });
    Object.defineProperty(api, "DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS; },
        set(value) { DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS = value; },
    });
    Object.defineProperty(api, "DEFAULT_GRAMMAR_CONTRACT_REGISTRY", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_GRAMMAR_CONTRACT_REGISTRY; },
        set(value) { DEFAULT_GRAMMAR_CONTRACT_REGISTRY = value; },
    });
    api.getDefaultGrammarContractRegistry = getDefaultGrammarContractRegistry;
    api.getGrammarContractRegistryPublicApi = getGrammarContractRegistryPublicApi;
    api.installGrammarContractRegistryClassicGlobals = installGrammarContractRegistryClassicGlobals;
    return api;
}

export function installGrammarContractRegistryGlobals(targetObject = globalThis) {
    const api = createGrammarContractRegistryModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
