// Native wrapper generated from src/core/orthography/orthography.js.

export function createOrthographyApi(targetObject = globalThis) {
    const ORTHOGRAPHY_BRIDGE_VERSION = 1;
    const ORTHOGRAPHY_PROFILE_IDS = Object.freeze({
      nawatModern: "nawat-modern",
      classicalNahuatl: "classical-nahuatl",
      unknown: "unknown"
    });
    const ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES = Object.freeze(["letter normalization is not morphology", "orthography match is not lexical evidence", "Classical Nahuatl form is not Nawat/Pipil fixture", "open-stem is not fixture evidence", "sourceKind is not grammar class", "topic is not nounClass", "supplementation is not word generation", "pronominal NNC is not ordinary NNC", "nonactive stem derivation is not identical to passive output", "Andrews grammar authority is not Classical spelling authority for Nawat output"]);
    const CLASSICAL_NAHUATL_LETTERS = Object.freeze("acehilmnopqtuxyz".split(""));
    const CLASSICAL_NAHUATL_DIGRAPHS = Object.freeze(["ch", "cu", "hu", "qu", "tz", "tl", "uc", "uh"]);
    const ORTHOGRAPHY_BRIDGE_RULES = Object.freeze([Object.freeze({
      id: "same-ch",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "ch",
      targetGrapheme: "ch",
      confidence: "confirmed-overlap",
      action: "profile-overlap",
      generationAllowed: false
    }), Object.freeze({
      id: "same-tz",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "tz",
      targetGrapheme: "tz",
      confidence: "confirmed-overlap",
      action: "profile-overlap",
      generationAllowed: false
    }), Object.freeze({
      id: "qu-k",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "qu",
      targetGrapheme: "k",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "cu-kw",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "cu",
      targetGrapheme: "kw",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "uc-kw",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "uc",
      targetGrapheme: "kw",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "hu-w",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "hu",
      targetGrapheme: "w",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "uh-w",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "uh",
      targetGrapheme: "w",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "x-sh",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "x",
      targetGrapheme: "sh",
      confidence: "candidate",
      action: "suggest-only",
      generationAllowed: false
    }), Object.freeze({
      id: "c-z-s",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "c/z",
      targetGrapheme: "s",
      confidence: "lossy",
      action: "diagnostic-only",
      generationAllowed: false
    }), Object.freeze({
      id: "long-vowel",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: ":",
      targetGrapheme: "",
      confidence: "lossy",
      action: "blocked",
      generationAllowed: false
    }), Object.freeze({
      id: "o-u",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "o",
      targetGrapheme: "u",
      confidence: "lossy",
      action: "blocked",
      generationAllowed: false
    }), Object.freeze({
      id: "tl",
      sourceProfile: "classical-nahuatl",
      targetProfile: "nawat-modern",
      sourceGrapheme: "tl",
      targetGrapheme: "",
      confidence: "blocked-morphology",
      action: "blocked",
      generationAllowed: false
    })]);
    function attachOrthographyGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "orthography-bridge",
        routeFamily: "orthography",
        structuralSource: "Andrews Lesson 2",
        andrewsRefs: ["Andrews Lesson 2"],
        ...options
      });
    }
    function normalizeOrthographyInput(value) {
      return String(value == null ? "" : value).trim().toLowerCase();
    }
    function getStaticNawatVowels() {
      if (typeof targetObject.VOWELS === "string" && targetObject.VOWELS) {
        return targetObject.VOWELS.split("");
      }
      return ["a", "e", "i", "u"];
    }
    function getStaticNawatConsonants() {
      if (typeof targetObject.VALID_CONSONANTS !== "undefined" && targetObject.VALID_CONSONANTS && typeof targetObject.VALID_CONSONANTS.forEach === "function") {
        return Array.from(targetObject.VALID_CONSONANTS);
      }
      return ["p", "t", "k", "m", "n", "s", "l", "w", "y", "j", "c", "z", "d"];
    }
    function getStaticNawatDigraphs() {
      if (typeof targetObject.DIGRAPH_SET !== "undefined" && targetObject.DIGRAPH_SET && typeof targetObject.DIGRAPH_SET.forEach === "function") {
        return Array.from(targetObject.DIGRAPH_SET);
      }
      return ["tz", "sh", "ch", "kw", "nh"];
    }
    function getOrthographyProfileInventory() {
      const nawatVowels = getStaticNawatVowels();
      const nawatConsonants = getStaticNawatConsonants();
      const nawatDigraphs = getStaticNawatDigraphs();
      return Object.freeze({
        [ORTHOGRAPHY_PROFILE_IDS.nawatModern]: Object.freeze({
          id: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
          label: "Modern Nawat/Pipil",
          authority: "repo/static_phonology.json",
          vowels: Object.freeze(nawatVowels),
          consonants: Object.freeze(nawatConsonants),
          digraphs: Object.freeze(nawatDigraphs)
        }),
        [ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl]: Object.freeze({
          id: ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl,
          label: "Classical Nahuatl orthography",
          authority: "Andrews Lesson 2 source profile, not Nawat output spelling",
          letters: CLASSICAL_NAHUATL_LETTERS,
          digraphs: CLASSICAL_NAHUATL_DIGRAPHS
        }),
        [ORTHOGRAPHY_PROFILE_IDS.unknown]: Object.freeze({
          id: ORTHOGRAPHY_PROFILE_IDS.unknown,
          label: "Unknown orthography",
          authority: "diagnostic-only"
        })
      });
    }
    function getOrthographyAntiConflationRules() {
      return Array.from(ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES);
    }
    function getOrthographyDigraphs(profileId) {
      if (profileId === ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl) {
        return CLASSICAL_NAHUATL_DIGRAPHS;
      }
      if (profileId === ORTHOGRAPHY_PROFILE_IDS.nawatModern) {
        return getStaticNawatDigraphs();
      }
      return Array.from(new Set([...getStaticNawatDigraphs(), ...CLASSICAL_NAHUATL_DIGRAPHS]));
    }
    function isOrthographyBoundaryChar(char) {
      return /[\s#()[\]{}|~\/-]/.test(char);
    }
    function splitOrthographyGraphemes(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const profileId = options.profileId || ORTHOGRAPHY_PROFILE_IDS.unknown;
      const digraphs = getOrthographyDigraphs(profileId).slice().sort((left, right) => right.length - left.length);
      const graphemes = [];
      let index = 0;
      while (index < normalized.length) {
        const char = normalized[index];
        if (isOrthographyBoundaryChar(char)) {
          index += 1;
          continue;
        }
        const match = digraphs.find(digraph => normalized.slice(index, index + digraph.length) === digraph);
        if (match) {
          graphemes.push(match);
          index += match.length;
          continue;
        }
        graphemes.push(char);
        index += 1;
      }
      return graphemes;
    }
    function getModernNawatAllowedGraphemeSet() {
      return new Set([...getStaticNawatVowels(), ...getStaticNawatConsonants(), ...getStaticNawatDigraphs()]);
    }
    function getClassicalAllowedGraphemeSet() {
      return new Set([...CLASSICAL_NAHUATL_LETTERS, ...CLASSICAL_NAHUATL_DIGRAPHS]);
    }
    function getInvalidOrthographyGraphemes(value, options = {}) {
      const profileId = options.profileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern;
      const allowed = profileId === ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl ? getClassicalAllowedGraphemeSet() : getModernNawatAllowedGraphemeSet();
      return splitOrthographyGraphemes(value, {
        profileId
      }).filter(grapheme => !allowed.has(grapheme));
    }
    function getOrthographyRuleMatches(normalized) {
      if (!normalized) {
        return [];
      }
      return ORTHOGRAPHY_BRIDGE_RULES.filter(rule => {
        if (rule.sourceGrapheme === "c/z") {
          return /(^|[^s])c(?!h)/.test(normalized);
        }
        if (rule.sourceGrapheme === ":") {
          return normalized.includes(":");
        }
        return normalized.includes(rule.sourceGrapheme);
      });
    }
    function inferOrthographyProfileId(value) {
      const normalized = normalizeOrthographyInput(value);
      if (!normalized) {
        return ORTHOGRAPHY_PROFILE_IDS.unknown;
      }
      const classicalMarkers = getOrthographyRuleMatches(normalized).filter(rule => rule.id !== "same-ch" && rule.id !== "same-tz");
      const nawatInvalid = getInvalidOrthographyGraphemes(normalized, {
        profileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern
      });
      if (classicalMarkers.length || nawatInvalid.some(grapheme => ["q", "x", "h", "o", ":"].includes(grapheme))) {
        return ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl;
      }
      if (!nawatInvalid.length) {
        return ORTHOGRAPHY_PROFILE_IDS.nawatModern;
      }
      return ORTHOGRAPHY_PROFILE_IDS.unknown;
    }
    function getOrthographyBridgeDiagnostics(matches, options = {}) {
      const diagnostics = [{
        id: "orthography-bridge-no-generation",
        severity: "info",
        message: "Orthography bridge metadata never authorizes Nawat/Pipil generation."
      }];
      const blocked = matches.filter(match => match.action === "blocked");
      if (blocked.length) {
        diagnostics.push({
          id: "orthography-bridge-blocked-lossy",
          severity: "warning",
          ruleIds: blocked.map(match => match.id),
          message: "A spelling correspondence is lossy or morphology-sensitive and must remain diagnostic-only."
        });
      }
      if (options.requireNawatEvidence !== false) {
        diagnostics.push({
          id: "orthography-bridge-needs-nawat-evidence",
          severity: "info",
          message: "A spelling match is not lexical evidence; confirmed Nawat/Pipil data is still required."
        });
      }
      return diagnostics;
    }
    function convertClassicalLettersToNawat(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const correspondences = [];
      let output = "";
      let index = 0;
      const pushConverted = (source, target, ruleId, note = "") => {
        correspondences.push({
          source,
          target,
          ruleId,
          note
        });
        output += target;
        index += source.length;
      };
      while (index < normalized.length) {
        const rest = normalized.slice(index);
        const char = normalized[index];
        if (rest.startsWith("ch")) {
          pushConverted("ch", "ch", "same-ch");
        } else if (rest.startsWith("tz")) {
          pushConverted("tz", "tz", "same-tz");
        } else if (rest.startsWith("tl")) {
          pushConverted("tl", "t", "tl-t", "Nawat/Pipil realizes the Classical lateral affricate spelling without l in the current grammar-rule surface.");
        } else if (rest.startsWith("qu")) {
          pushConverted("qu", "k", "qu-k");
        } else if (rest.startsWith("cu")) {
          pushConverted("cu", "kw", "cu-kw");
        } else if (rest.startsWith("uc")) {
          pushConverted("uc", "kw", "uc-kw");
        } else if (rest.startsWith("hu")) {
          pushConverted("hu", "w", "hu-w");
        } else if (rest.startsWith("uh")) {
          pushConverted("uh", "w", "uh-w");
        } else if (char === "x") {
          pushConverted("x", "sh", "x-sh");
        } else if (char === "z") {
          pushConverted("z", "s", "z-s");
        } else if (char === "c") {
          const next = normalized[index + 1] || "";
          const target = next === "e" || next === "i" ? "s" : "k";
          pushConverted("c", target, target === "s" ? "c-front-s" : "c-k");
        } else if (char === "o") {
          pushConverted("o", "u", "o-u");
        } else if (char === ":") {
          correspondences.push({
            source: ":",
            target: "",
            ruleId: "long-vowel-dropped",
            note: "Modern Nawat/Pipil output does not use Classical vowel-length notation."
          });
          index += 1;
        } else {
          output += char;
          index += 1;
        }
      }
      const conversion = {
        kind: "classical-to-nawat-letter-conversion",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        output,
        sourceProfileId: ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl,
        targetProfileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
        correspondences,
        orthographyConversionAllowed: true,
        generationAllowed: false,
        evidence: {
          grammarAuthority: "Andrews PDF",
          targetAuthority: "Modern Nawat/Pipil orthography",
          contract: options.contract || "grammar-rule-surface-realization"
        },
        diagnostics: ["classical-to-nawat-orthography-conversion", "orthography-conversion-is-not-lexical-evidence"]
      };
      return attachOrthographyGrammarContract(conversion, {
        metadataKind: "classical-to-nawat-letter-conversion",
        routeStage: "convert-rule-spelling",
        sourceInput: conversion.input,
        surface: output,
        surfaceForms: output ? [output] : [],
        supported: true,
        diagnostics: conversion.diagnostics,
        evidenceStatus: "orthography-conversion-only",
        orthographyFrame: {
          sourceProfileId: conversion.sourceProfileId,
          targetProfileId: conversion.targetProfileId,
          sourceSurface: conversion.normalized,
          surface: output,
          surfaceForms: output ? [output] : [],
          correspondences,
          spellingAuthority: "Modern Nawat/Pipil orthography",
          noClassicalSurfaceImport: true,
          orthographyConversionAllowed: true
        },
        targetContract: {
          metadataKind: "classical-to-nawat-letter-conversion",
          generationAllowed: false,
          orthographyConversionAllowed: true,
          doesNotCreateLexicalEvidence: true
        }
      });
    }
    function getClassicalLettersAsNawat(value, options = {}) {
      return convertClassicalLettersToNawat(value, options).output;
    }
    function buildOrthographyBridgeMetadata(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const sourceProfileId = options.sourceProfileId || inferOrthographyProfileId(normalized);
      const targetProfileId = options.targetProfileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern;
      const graphemes = splitOrthographyGraphemes(normalized, {
        profileId: sourceProfileId
      });
      const matches = getOrthographyRuleMatches(normalized).filter(rule => (sourceProfileId === ORTHOGRAPHY_PROFILE_IDS.unknown || rule.sourceProfile === sourceProfileId) && rule.targetProfile === targetProfileId);
      const blocked = matches.filter(match => match.action === "blocked");
      const bridge = {
        kind: "orthography-bridge",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        sourceProfileId,
        targetProfileId,
        graphemes,
        correspondences: matches.map(match => ({
          id: match.id,
          sourceGrapheme: match.sourceGrapheme,
          targetGrapheme: match.targetGrapheme,
          confidence: match.confidence,
          action: match.action,
          generationAllowed: false
        })),
        blocked: blocked.map(match => match.id),
        generationAllowed: false,
        antiConflationRules: Array.from(ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES),
        diagnostics: getOrthographyBridgeDiagnostics(matches, options),
        evidence: {
          grammarAuthority: "Andrews PDF",
          orthographySource: "Andrews Lesson 2 / Appendix F source profiles",
          targetAuthority: "Modern Nawat/Pipil orthography"
        }
      };
      return attachOrthographyGrammarContract(bridge, {
        metadataKind: "orthography-bridge",
        routeStage: "classify-bridge",
        sourceInput: bridge.input,
        supported: blocked.length === 0,
        diagnostics: bridge.diagnostics,
        evidenceStatus: blocked.length ? "orthography-blocked" : "orthography-diagnostic",
        orthographyFrame: {
          sourceProfileId,
          targetProfileId,
          sourceSurface: normalized,
          surface: "",
          surfaceForms: [],
          graphemes,
          correspondences: bridge.correspondences,
          blocked: bridge.blocked,
          spellingAuthority: "Modern Nawat/Pipil orthography",
          noClassicalSurfaceImport: true
        },
        targetContract: {
          metadataKind: "orthography-bridge",
          generationAllowed: false,
          doesNotCreateLexicalEvidence: true,
          blocked: bridge.blocked
        }
      });
    }
    function classifyOrthographyInput(value, options = {}) {
      const normalized = normalizeOrthographyInput(value);
      const profileId = options.profileId || inferOrthographyProfileId(normalized);
      const profiles = getOrthographyProfileInventory();
      const graphemes = splitOrthographyGraphemes(normalized, {
        profileId
      });
      const invalidGraphemes = getInvalidOrthographyGraphemes(normalized, {
        profileId
      });
      const bridge = buildOrthographyBridgeMetadata(normalized, {
        sourceProfileId: profileId,
        targetProfileId: options.targetProfileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern,
        requireNawatEvidence: options.requireNawatEvidence
      });
      const classification = {
        kind: "orthography-classification",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        profileId,
        profileLabel: profiles[profileId]?.label || profiles[ORTHOGRAPHY_PROFILE_IDS.unknown].label,
        graphemes,
        invalidGraphemes,
        bridge,
        generationAllowed: false
      };
      return attachOrthographyGrammarContract(classification, {
        metadataKind: "orthography-classification",
        routeStage: "classify-input",
        sourceInput: classification.input,
        supported: invalidGraphemes.length === 0,
        diagnostics: bridge.diagnostics,
        evidenceStatus: invalidGraphemes.length ? "orthography-invalid" : "orthography-profile-classified",
        orthographyFrame: {
          sourceProfileId: profileId,
          targetProfileId: classification.bridge.targetProfileId,
          sourceSurface: normalized,
          surface: "",
          surfaceForms: [],
          graphemes,
          invalidGraphemes,
          spellingAuthority: "Modern Nawat/Pipil orthography",
          noClassicalSurfaceImport: true
        },
        targetContract: {
          metadataKind: "orthography-classification",
          generationAllowed: false,
          profileId,
          invalidGraphemes
        }
      });
    }

    const api = {};
    Object.defineProperty(api, "ORTHOGRAPHY_BRIDGE_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_BRIDGE_VERSION; },
    });
    Object.defineProperty(api, "ORTHOGRAPHY_PROFILE_IDS", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_PROFILE_IDS; },
    });
    Object.defineProperty(api, "ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LETTERS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LETTERS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_DIGRAPHS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_DIGRAPHS; },
    });
    Object.defineProperty(api, "ORTHOGRAPHY_BRIDGE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return ORTHOGRAPHY_BRIDGE_RULES; },
    });
    api.attachOrthographyGrammarContract = attachOrthographyGrammarContract;
    api.normalizeOrthographyInput = normalizeOrthographyInput;
    api.getStaticNawatVowels = getStaticNawatVowels;
    api.getStaticNawatConsonants = getStaticNawatConsonants;
    api.getStaticNawatDigraphs = getStaticNawatDigraphs;
    api.getOrthographyProfileInventory = getOrthographyProfileInventory;
    api.getOrthographyAntiConflationRules = getOrthographyAntiConflationRules;
    api.getOrthographyDigraphs = getOrthographyDigraphs;
    api.isOrthographyBoundaryChar = isOrthographyBoundaryChar;
    api.splitOrthographyGraphemes = splitOrthographyGraphemes;
    api.getModernNawatAllowedGraphemeSet = getModernNawatAllowedGraphemeSet;
    api.getClassicalAllowedGraphemeSet = getClassicalAllowedGraphemeSet;
    api.getInvalidOrthographyGraphemes = getInvalidOrthographyGraphemes;
    api.getOrthographyRuleMatches = getOrthographyRuleMatches;
    api.inferOrthographyProfileId = inferOrthographyProfileId;
    api.getOrthographyBridgeDiagnostics = getOrthographyBridgeDiagnostics;
    api.convertClassicalLettersToNawat = convertClassicalLettersToNawat;
    api.getClassicalLettersAsNawat = getClassicalLettersAsNawat;
    api.buildOrthographyBridgeMetadata = buildOrthographyBridgeMetadata;
    api.classifyOrthographyInput = classifyOrthographyInput;
    return api;
}

export function installOrthographyGlobals(targetObject = globalThis) {
    const api = createOrthographyApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
