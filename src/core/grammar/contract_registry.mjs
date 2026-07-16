// Canonical modern ESM module.

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
    var DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS = Object.freeze([Object.freeze({
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
        ok: frame?.controlFrame?.kind === "classical-nahuatl-vnc-application-control-frame",
        diagnostic: "application-frame-control-frame-required"
      }, {
        ok: frame?.resultFrame?.kind === "classical-nahuatl-vnc-application-result-frame",
        diagnostic: "application-frame-result-frame-required"
      }, {
        ok: frame?.authorizationStatus === frame?.resultFrame?.authorizationStatus,
        diagnostic: "application-frame-result-status-mismatch"
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
