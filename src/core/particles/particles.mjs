// Native wrapper generated from src/core/particles/particles.js.

export function createParticlesApi(targetObject = globalThis) {
    const PARTICLE_METADATA_VERSION = 1;
    const PARTICLE_PLACEMENT_SCOPE = Object.freeze({
      clauseInitial: "clause-initial",
      secondPosition: "second-position",
      prePredicate: "pre-predicate",
      postPredicate: "post-predicate",
      enclitic: "enclitic",
      floating: "floating",
      unknown: "unknown"
    });
    const PARTICLE_FUNCTION_SCOPE = Object.freeze({
      negation: "negation",
      question: "question",
      emphasis: "emphasis",
      discourse: "discourse",
      topic: "topic",
      unknown: "unknown"
    });
    const PARTICLE_PLACEMENT_FRAME = Object.freeze([Object.freeze({
      id: "clause-initial",
      label: "clause initial",
      scope: PARTICLE_PLACEMENT_SCOPE.clauseInitial,
      hostLayer: "sentence",
      beforePredicate: true,
      afterPredicate: false
    }), Object.freeze({
      id: "second-position",
      label: "second position",
      scope: PARTICLE_PLACEMENT_SCOPE.secondPosition,
      hostLayer: "sentence",
      beforePredicate: null,
      afterPredicate: null
    }), Object.freeze({
      id: "pre-predicate",
      label: "pre-predicate",
      scope: PARTICLE_PLACEMENT_SCOPE.prePredicate,
      hostLayer: "nuclear-clause",
      beforePredicate: true,
      afterPredicate: false
    }), Object.freeze({
      id: "post-predicate",
      label: "post-predicate",
      scope: PARTICLE_PLACEMENT_SCOPE.postPredicate,
      hostLayer: "nuclear-clause",
      beforePredicate: false,
      afterPredicate: true
    }), Object.freeze({
      id: "enclitic",
      label: "enclitic",
      scope: PARTICLE_PLACEMENT_SCOPE.enclitic,
      hostLayer: "word-output",
      beforePredicate: false,
      afterPredicate: true
    })]);
    const PARTICLE_ANTI_CONFLATION_RULES = Object.freeze(["particle placement metadata is not particle generation", "particle-looking string is not confirmed Nawat/Pipil particle evidence", "particle mode label is not a particle inventory", "preposed output segment is not a Lesson 3 particle engine", "topic/focus label is not supplementation", "Andrews particle categories are architecture, not Nawat/Pipil form authority"]);
    function cloneParticlePlacementFrame(frame = {}) {
      return {
        ...frame
      };
    }
    function getParticleAntiConflationRules() {
      return Array.from(PARTICLE_ANTI_CONFLATION_RULES);
    }
    function getParticlePlacementFrames() {
      return PARTICLE_PLACEMENT_FRAME.map(cloneParticlePlacementFrame);
    }
    function normalizeParticlePlacementScope(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return Object.values(PARTICLE_PLACEMENT_SCOPE).includes(normalized) ? normalized : PARTICLE_PLACEMENT_SCOPE.unknown;
    }
    function normalizeParticleFunctionScope(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return Object.values(PARTICLE_FUNCTION_SCOPE).includes(normalized) ? normalized : PARTICLE_FUNCTION_SCOPE.unknown;
    }
    function getParticlePlacementFrame(scope = "") {
      const normalizedScope = normalizeParticlePlacementScope(scope);
      const frame = PARTICLE_PLACEMENT_FRAME.find(entry => entry.scope === normalizedScope);
      return frame ? cloneParticlePlacementFrame(frame) : null;
    }
    function buildParticlePlacementMetadata({
      candidate = "",
      placementScope = "",
      functionScope = "",
      hostLayer = "",
      source = "manual-candidate"
    } = {}) {
      const placement = getParticlePlacementFrame(placementScope);
      const normalizedFunctionScope = normalizeParticleFunctionScope(functionScope);
      return {
        kind: "particle-placement-metadata",
        version: PARTICLE_METADATA_VERSION,
        structuralSource: "Andrews Lesson 3",
        targetAuthority: "Nawat/Pipil repo data and user-provided forms",
        candidate: String(candidate == null ? "" : candidate),
        source,
        placement: placement || {
          id: PARTICLE_PLACEMENT_SCOPE.unknown,
          label: "unknown",
          scope: PARTICLE_PLACEMENT_SCOPE.unknown,
          hostLayer: hostLayer || "unknown",
          beforePredicate: null,
          afterPredicate: null
        },
        functionScope: normalizedFunctionScope,
        isInventoryBacked: false,
        generationAllowed: false,
        diagnostics: ["particle-placement-diagnostic-only", "particle-needs-confirmed-nawat-evidence"],
        antiConflationRules: getParticleAntiConflationRules()
      };
    }
    function classifyParticleCandidate(value = "", options = {}) {
      const candidate = String(value == null ? "" : value).trim();
      const placementScope = options.placementScope || options.placement || PARTICLE_PLACEMENT_SCOPE.unknown;
      const functionScope = options.functionScope || options.function || PARTICLE_FUNCTION_SCOPE.unknown;
      const placementMetadata = buildParticlePlacementMetadata({
        candidate,
        placementScope,
        functionScope,
        source: options.source || "candidate"
      });
      return {
        kind: "particle-candidate-classification",
        version: PARTICLE_METADATA_VERSION,
        candidate,
        matched: false,
        status: "unconfirmed",
        placement: placementMetadata.placement,
        functionScope: placementMetadata.functionScope,
        generationAllowed: false,
        diagnostics: candidate ? ["particle-candidate-unconfirmed"] : ["particle-candidate-empty"],
        placementMetadata
      };
    }
    function buildParticleInventoryBoundaryMetadata() {
      return {
        kind: "particle-inventory-boundary",
        version: PARTICLE_METADATA_VERSION,
        lesson: 3,
        status: "partial",
        confirmedParticles: [],
        placementFrames: getParticlePlacementFrames(),
        generationAllowed: false,
        boundaries: {
          hasStaticParticleInventory: false,
          hasParticleGeneration: false,
          hasPlacementEngine: false,
          hasVisibleParticleMode: false,
          existingParticleModeIsPlaceholder: true
        },
        antiConflationRules: getParticleAntiConflationRules()
      };
    }

    const api = {};
    Object.defineProperty(api, "PARTICLE_METADATA_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return PARTICLE_METADATA_VERSION; },
    });
    Object.defineProperty(api, "PARTICLE_PLACEMENT_SCOPE", {
        configurable: true,
        enumerable: true,
        get() { return PARTICLE_PLACEMENT_SCOPE; },
    });
    Object.defineProperty(api, "PARTICLE_FUNCTION_SCOPE", {
        configurable: true,
        enumerable: true,
        get() { return PARTICLE_FUNCTION_SCOPE; },
    });
    Object.defineProperty(api, "PARTICLE_PLACEMENT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return PARTICLE_PLACEMENT_FRAME; },
    });
    Object.defineProperty(api, "PARTICLE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return PARTICLE_ANTI_CONFLATION_RULES; },
    });
    api.cloneParticlePlacementFrame = cloneParticlePlacementFrame;
    api.getParticleAntiConflationRules = getParticleAntiConflationRules;
    api.getParticlePlacementFrames = getParticlePlacementFrames;
    api.normalizeParticlePlacementScope = normalizeParticlePlacementScope;
    api.normalizeParticleFunctionScope = normalizeParticleFunctionScope;
    api.getParticlePlacementFrame = getParticlePlacementFrame;
    api.buildParticlePlacementMetadata = buildParticlePlacementMetadata;
    api.classifyParticleCandidate = classifyParticleCandidate;
    api.buildParticleInventoryBoundaryMetadata = buildParticleInventoryBoundaryMetadata;
    return api;
}

export function installParticlesGlobals(targetObject = globalThis) {
    const api = createParticlesApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
