// Canonical modern ESM module.

export function createClassicalNahuatlLesson3ParticlesApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON3_PROFILE_ID = "classical-nahuatl";
    const CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE = "Lesson 3 authorizes particle frames only; it does not authorize nuclear-clause formulas.";
    const CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS = Object.freeze(["cn-l3-particle-inventory", "cn-l3-particle-separation", "cn-l3-functional-classes", "cn-l3-negativizing-particles", "cn-l3-particle-collocations", "cn-l3-honorificized-particles"]);
    const CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES = Object.freeze([Object.freeze({
      id: "cn-l3-32-particle-use-limits",
      section: "3.2",
      lineStart: 2037,
      lineEnd: 2042,
      exactWitness: "Particles never serve as\na matrix stem.",
      rule: "Particles are not normal independent principal clauses and never serve as a matrix stem.",
      particleAuthorityOnly: true
    }), Object.freeze({
      id: "cn-l3-32-clause-introducers",
      section: "3.2.1",
      lineStart: 2050,
      lineEnd: 2059,
      exactWitness: "1. Clause introducers:",
      functionScope: "clause-introducer",
      forms: Object.freeze(["ca", "cuix?", "tla", "ma", "o"]),
      rule: "These particles introduce clauses; this is particle-boundary authority, not clause generation authority."
    }), Object.freeze({
      id: "cn-l3-32-adjunctors",
      section: "3.2.2",
      lineStart: 2060,
      lineEnd: 2102,
      exactWitness: "2. Adjunctors (adjoined-clause introducers):",
      functionScope: "adjunctor",
      forms: Object.freeze(["in", "anca", "mah"]),
      rule: "Adjunctors mark adjoined material; the particle frame cannot decide the adjoined clause itself."
    }), Object.freeze({
      id: "cn-l3-32-conjunctor",
      section: "3.2.3",
      lineStart: 2103,
      lineEnd: 2104,
      exactWitness: "3. Clause and sentence conjunctor:",
      functionScope: "conjunctor",
      forms: Object.freeze(["auh"]),
      rule: "The conjunctor is a particle relation marker; it does not become a nuclear-clause predicate."
    }), Object.freeze({
      id: "cn-l3-32-adverbial-modifiers",
      section: "3.2.4",
      lineStart: 2105,
      lineEnd: 2125,
      exactWitness: "4. Adverbial modifiers:",
      functionScope: "adverbial-modifier",
      forms: Object.freeze(["mec", "nee", "tel", "oc", "zan", "za", "ye", "o#", "no", "zo", "quin", "ach", "at", "ac"]),
      rule: "Adverbial particles modify from the particle lane and do not occupy predicate-stem slots."
    }), Object.freeze({
      id: "cn-l3-32-interjections",
      section: "3.2.5",
      lineStart: 2126,
      lineEnd: 2152,
      exactWitness: "5. Interjections (most can occur alone as an utterance",
      functionScope: "interjection",
      forms: Object.freeze(["o", "#e", "a", "ax", "hue", "hueya", "ihyo", "no", "auh", "hui", "elele", "ahcua", "ye ye", "ih i", "yeya", "xi", "xiuh", "iye"]),
      rule: "Interjections can be utterance-level particles; that does not make them nuclear clauses."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES = Object.freeze([Object.freeze({
      id: "cn-l3-33-negative-particle-set",
      section: "3.3",
      lineStart: 2153,
      lineEnd: 2156,
      exactWitness: "Nahuatl has two negative particles: ah# and ca#",
      forms: Object.freeze(["ah#", "ca#"]),
      rule: "Lesson 3 recognizes ah# and ca# as negativizing particles."
    }), Object.freeze({
      id: "cn-l3-33-prefixal-adverbs",
      section: "3.3",
      lineStart: 2153,
      lineEnd: 2156,
      exactWitness: "They are prefixal adverbs and therefore modify the item that is attached to their right",
      attachment: "bound-to-following",
      rule: "Negativizing particles attach to the item on their right as particle-prefix authority only."
    }), Object.freeze({
      id: "cn-l3-33-ca-complementary-distribution",
      section: "3.3",
      lineStart: 2156,
      lineEnd: 2159,
      exactWitness: "ca# occurs only after the particles ma and tla",
      caLicensedAfter: Object.freeze(["ma", "tla", "mah"]),
      rule: "ca# requires a preceding ma, tla, or mah particle context; ah# is the elsewhere member."
    }), Object.freeze({
      id: "cn-l3-33-ca-written-as-prefix",
      section: "3.3",
      lineStart: 2171,
      lineEnd: 2174,
      exactWitness: "In these lessons ca# is treated as the prefix it is.",
      rule: "Traditional solid spelling is not authority; ca# remains a prefixal particle in the proof frame."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES = Object.freeze([Object.freeze({
      id: "cn-l3-34-sequence",
      section: "3.4",
      lineStart: 2181,
      lineEnd: 2185,
      exactWitness: "Very frequently two or more particles are combined in sequence.",
      rule: "A collocation is a sequence of two or more particles."
    }), Object.freeze({
      id: "cn-l3-34-fixed-order",
      section: "3.4",
      lineStart: 2181,
      lineEnd: 2185,
      exactWitness: "Normally they occur in a fixed order.",
      rule: "Lesson 3 collocation output must preserve the witnessed particle order."
    }), Object.freeze({
      id: "cn-l3-34-written-separately",
      section: "3.4",
      lineStart: 2185,
      lineEnd: 2188,
      exactWitness: "In these lessons the members of particle collocations are written separately.",
      rule: "Classical output keeps collocation members separate even when traditional spelling writes them solid."
    }), Object.freeze({
      id: "cn-l3-34-adjunctor-in-optional",
      section: "3.4",
      lineStart: 2189,
      lineEnd: 2191,
      exactWitness: "The adjunctor in is frequently\nthe first member",
      rule: "Initial in is collocation-member authority and does not itself build the subordinate clause."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES = Object.freeze([Object.freeze({
      id: "cn-l3-35-tzin-attaches-to-particle",
      section: "3.5",
      lineStart: 2239,
      lineEnd: 2243,
      exactWitness: "It can also be attached to a single\nparticle",
      rule: "(tzin)-tli- can attach to a single particle."
    }), Object.freeze({
      id: "cn-l3-35-tzin-final-collocation-member",
      section: "3.5",
      lineStart: 2241,
      lineEnd: 2244,
      exactWitness: "or to the final member of a particle collocation",
      rule: "When tzin attaches to the final member of a collocation, the whole collocation is honorificized."
    }), Object.freeze({
      id: "cn-l3-35-english-translation-limit",
      section: "3.5",
      lineStart: 2242,
      lineEnd: 2244,
      exactWitness: "There is no way to capture the honorific quality",
      rule: "English gloss cannot authorize or exhaust the honorific particle quality."
    })]);
    const CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES = Object.freeze([Object.freeze({
      sourceForm: "otzin",
      baseParticle: "o",
      finalMember: "o",
      honorificMarker: "tzin",
      hostKind: "single-particle",
      lineStart: 2245,
      lineEnd: 2245
    }), Object.freeze({
      sourceForm: "auhtzin",
      baseParticle: "auh",
      finalMember: "auh",
      honorificMarker: "tzin",
      hostKind: "single-particle",
      lineStart: 2246,
      lineEnd: 2246
    }), Object.freeze({
      sourceForm: "ca no zotzin",
      baseCollocation: "ca no zo",
      finalMember: "zo",
      honorificMarker: "tzin",
      hostKind: "collocation-final-member",
      lineStart: 2247,
      lineEnd: 2247
    })]);
    function getClassicalNahuatlLesson3RuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function getClassicalNahuatlLesson3ProfileWallFrame(options = {}) {
      const builder = getClassicalNahuatlLesson3RuntimeTarget()?.buildClassicalNahuatlProfileWallFrame;
      if (typeof builder === "function") {
        return builder(CLASSICAL_NAHUATL_LESSON3_PROFILE_ID, {
          sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT
        });
      }
      return {
        kind: "classical-nahuatl-profile-wall-frame",
        separationMechanism: "profile-selection",
        spellingInspection: "not-performed",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
        oldNawatPipilConjugatorAuthority: "not-authority-for-classical-lane",
        nawatPipilGrammarAuthorityForClassical: "not-authority-for-classical-lane"
      };
    }
    function normalizeClassicalNahuatlLesson3ParticleLookupValue(value = "") {
      const normalizer = getClassicalNahuatlLesson3RuntimeTarget()?.normalizeParticleInventoryLookupValue;
      if (typeof normalizer === "function") {
        return normalizer(value).replace(/\?/g, "");
      }
      return String(value == null ? "" : value).trim().toLowerCase().replace(/[¡!?]/g, "").replace(/\s+/g, " ");
    }
    function cloneClassicalNahuatlLesson3Rule(rule = {}) {
      const cloned = {
        ...rule
      };
      ["forms", "caLicensedAfter"].forEach(key => {
        if (Array.isArray(rule[key])) {
          cloned[key] = Array.from(rule[key]);
        }
      });
      return cloned;
    }
    function cloneClassicalNahuatlLesson3HonorificizedExample(example = {}) {
      return {
        ...example
      };
    }
    function getClassicalNahuatlLesson3FunctionalClassRules() {
      return CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlLesson3NegativizingParticleRules() {
      return CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlLesson3ParticleCollocationRules() {
      return CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlLesson3HonorificizedParticleRules() {
      return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES.map(cloneClassicalNahuatlLesson3Rule);
    }
    function getClassicalNahuatlLesson3HonorificizedParticleExamples() {
      return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES.map(cloneClassicalNahuatlLesson3HonorificizedExample);
    }
    function getClassicalNahuatlLesson3ParticleFunctionClassFrames() {
      const framesBuilder = getClassicalNahuatlLesson3RuntimeTarget()?.getParticleFunctionClassFrames;
      return typeof framesBuilder === "function" ? framesBuilder() : [];
    }
    function getClassicalNahuatlLesson3ParticleGroups() {
      const groups = typeof targetObject.getParticleLesson3InventoryGroups === "function" ? targetObject.getParticleLesson3InventoryGroups() : [];
      return groups.map(group => ({
        id: group.id || "",
        label: group.label || "",
        sectionPrefix: group.sectionPrefix || "",
        sectionLabel: group.sectionLabel || group.sectionPrefix || "",
        description: group.description || ""
      }));
    }
    function getClassicalNahuatlLesson3ParticleEntries(options = {}) {
      const entries = typeof targetObject.getParticleSeedInventoryEntries === "function" ? targetObject.getParticleSeedInventoryEntries({
        limit: 0
      }) : [];
      const limit = Number(options.limit || 0);
      const mapped = entries.map(entry => {
        const sourceForm = String(entry.sourceForm || "").trim();
        const aliases = [sourceForm, ...(Array.isArray(entry.aliases) ? entry.aliases : [])].map(value => String(value || "").trim()).filter(Boolean);
        return {
          kind: "classical-nahuatl-lesson3-particle-entry",
          version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
          id: entry.id || "",
          sourceForm,
          displayForm: sourceForm,
          aliases,
          lookupKeys: aliases.map(normalizeClassicalNahuatlLesson3ParticleLookupValue).filter(Boolean).filter((value, index, list) => list.indexOf(value) === index),
          functionScope: entry.functionScope || "",
          functionClass: entry.functionClass || null,
          placement: entry.placement || null,
          gloss: entry.gloss || "",
          section: entry.section || "",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
          outputLanguage: "Classical Nahuatl",
          outputAuthority: "Andrews transcription",
          orthographyPolicy: "transcription-direct",
          nawatPipilOrthographyBridge: "not-applied",
          nawatPipilSystem: "not-used",
          grammarGenerationAllowed: false,
          particleOutputAllowed: Boolean(sourceForm)
        };
      }).filter(entry => entry.sourceForm);
      return limit > 0 ? mapped.slice(0, limit) : mapped;
    }
    function findClassicalNahuatlLesson3ParticleEntries(candidate = "") {
      const lookup = normalizeClassicalNahuatlLesson3ParticleLookupValue(candidate);
      if (!lookup) {
        return [];
      }
      return getClassicalNahuatlLesson3ParticleEntries().filter(entry => entry.lookupKeys.includes(lookup));
    }
    function findClassicalNahuatlLesson3ParticleEntry(candidate = "") {
      return findClassicalNahuatlLesson3ParticleEntries(candidate)[0] || null;
    }
    function groupClassicalNahuatlLesson3ParticleEntries(entries = []) {
      const groups = getClassicalNahuatlLesson3ParticleGroups();
      return groups.map(group => ({
        ...group,
        entries: entries.filter(entry => entry.section === group.sectionLabel || entry.section?.startsWith(`${group.sectionPrefix}.`) || entry.section === group.sectionPrefix)
      })).filter(group => group.entries.length > 0);
    }
    function isClassicalNahuatlLesson3OutOfParticleScope(input = "") {
      return /[()]/.test(String(input == null ? "" : input));
    }
    function getClassicalNahuatlLesson3ParticleComponents(value = "") {
      return String(value == null ? "" : value).trim().replace(/[!?]/g, " ").split(/\s+/g).map(token => token.trim()).filter(token => token && token !== "...");
    }
    function getClassicalNahuatlLesson3CaContext(sourceForm = "", options = {}) {
      const explicit = normalizeClassicalNahuatlLesson3ParticleLookupValue(options.precedingParticle || options.preceding || "").replace(/#/g, "");
      if (explicit) {
        return explicit;
      }
      const source = normalizeClassicalNahuatlLesson3ParticleLookupValue(sourceForm).replace(/[!?]/g, "");
      const tokens = source.split(/\s+/g).filter(Boolean);
      for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index];
        if (token === "ca#" || /^ca[a-z]*/.test(token)) {
          return (tokens[index - 1] || "").replace(/#/g, "");
        }
      }
      return "";
    }
    function sourceUsesClassicalNahuatlLesson3CaNegative(sourceForm = "") {
      const source = normalizeClassicalNahuatlLesson3ParticleLookupValue(sourceForm).replace(/[!?]/g, "");
      return source === "ca#" || /\bca#\b/.test(source) || /(^|\s)(ma|tla|mah)\s+ca/.test(source);
    }
    function buildClassicalNahuatlLesson3FunctionalClassFrame(candidate = "", options = {}) {
      const input = String(candidate == null ? "" : candidate).trim();
      const hasInput = Boolean(input);
      const candidateOutOfScope = isClassicalNahuatlLesson3OutOfParticleScope(input);
      const entries = getClassicalNahuatlLesson3ParticleEntries();
      const candidateEntries = hasInput && !candidateOutOfScope ? findClassicalNahuatlLesson3ParticleEntries(input) : [];
      const functionalEntries = entries.filter(entry => String(entry.section || "").startsWith("3.2"));
      const selectedFunctionalEntries = candidateEntries.filter(entry => String(entry.section || "").startsWith("3.2"));
      const functionClassFrames = getClassicalNahuatlLesson3ParticleFunctionClassFrames();
      const functionClassInventory = functionClassFrames.map(frame => ({
        ...frame,
        entryCount: functionalEntries.filter(entry => entry.functionScope === frame.scope).length
      })).filter(frame => frame.entryCount > 0);
      const allFunctionalEntriesClassed = functionalEntries.length > 0 && functionalEntries.every(entry => Boolean(entry.functionScope));
      const authorized = hasInput && !candidateOutOfScope && selectedFunctionalEntries.length > 0 && allFunctionalEntriesClassed;
      const proofStatus = authorized ? "proven" : hasInput ? "blocked" : "inventory-preview";
      const proofFrame = {
        kind: "classical-nahuatl-lesson3-functional-class-proof-frame",
        lesson: "Andrews Lesson 3",
        section: "3.2",
        proofKind: "logic-proof",
        proofStatus,
        authorizationStatus: authorized ? "authorized" : hasInput ? "blocked" : "preview",
        sourceAuthority: "Andrews transcription",
        input,
        legalWitnessTagIds: ["cn-l3-functional-classes", "cn-l3-particle-separation"],
        premises: [{
          layer: "functional-class-inventory",
          rule: "Andrews 3.2 supplies the functional particle classes.",
          passed: allFunctionalEntriesClassed,
          inventoryCount: functionalEntries.length,
          ruleIds: getClassicalNahuatlLesson3FunctionalClassRules().map(rule => rule.id)
        }, {
          layer: "particle-use-limits",
          rule: "Particles never serve as a matrix stem.",
          passed: true,
          authorizedForNuclearClause: false
        }, {
          layer: "selected-functional-class",
          rule: "When a particle is selected, it must be classed by the Andrews 3.2 inventory.",
          passed: hasInput ? selectedFunctionalEntries.length > 0 : true,
          selectedFunctionScopes: selectedFunctionalEntries.map(entry => entry.functionScope)
        }],
        conclusion: {
          authorized,
          authorizedForNuclearClause: false,
          particleAuthorityOnly: true,
          authorizedParticle: authorized ? selectedFunctionalEntries[0]?.sourceForm || "" : "",
          authorizedFunctionScopes: selectedFunctionalEntries.map(entry => entry.functionScope).filter((value, index, list) => value && list.indexOf(value) === index)
        }
      };
      return {
        kind: "classical-nahuatl-lesson3-functional-class-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        lesson: "Andrews Lesson 3",
        section: "3.2",
        machineryScope: "particle-functional-classes",
        activeAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
        input,
        candidateEntries,
        selectedFunctionalEntries,
        functionClassInventory,
        ruleRefs: getClassicalNahuatlLesson3FunctionalClassRules(),
        legalWitnessTagIds: ["cn-l3-functional-classes", "cn-l3-particle-separation"],
        proofFrame,
        proofStatus: proofFrame.proofStatus,
        authorizationStatus: proofFrame.authorizationStatus,
        outputLanguage: "Classical Nahuatl",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        grammarGenerationAllowed: false,
        nuclearClauseAuthorityAllowed: false,
        particleAuthorityNote: CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE
      };
    }
    function buildClassicalNahuatlLesson3NegativizingParticleFrame(candidate = "", options = {}) {
      const input = String(candidate == null ? "" : candidate).trim();
      const hasInput = Boolean(input);
      const candidateOutOfScope = isClassicalNahuatlLesson3OutOfParticleScope(input);
      const entries = getClassicalNahuatlLesson3ParticleEntries();
      const candidateEntry = hasInput && !candidateOutOfScope ? findClassicalNahuatlLesson3ParticleEntry(input) : null;
      const sourceForm = candidateEntry?.sourceForm || input;
      const negativizingEntries = entries.filter(entry => String(entry.section || "").startsWith("3.3") || entry.sourceForm === "ah#" || entry.sourceForm === "ca#");
      const isNegativizingEntry = Boolean(candidateEntry) && (String(candidateEntry.section || "").startsWith("3.3") || candidateEntry.functionScope === "negation");
      const usesCaNegative = isNegativizingEntry && sourceUsesClassicalNahuatlLesson3CaNegative(sourceForm);
      const caContext = usesCaNegative ? getClassicalNahuatlLesson3CaContext(sourceForm, options) : "";
      const caLicensedAfter = CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES.find(rule => rule.id === "cn-l3-33-ca-complementary-distribution")?.caLicensedAfter || [];
      const caContextRequired = usesCaNegative && !caContext;
      const caDistributionLicensed = !usesCaNegative || caLicensedAfter.includes(caContext);
      const authorized = hasInput && !candidateOutOfScope && isNegativizingEntry && !caContextRequired && caDistributionLicensed;
      const proofStatus = authorized ? "proven" : hasInput ? caContextRequired ? "context-required" : "blocked" : "inventory-preview";
      const negativePrefix = usesCaNegative ? "ca#" : isNegativizingEntry ? "ah#" : "";
      const proofFrame = {
        kind: "classical-nahuatl-lesson3-negativizing-particle-proof-frame",
        lesson: "Andrews Lesson 3",
        section: "3.3",
        proofKind: "logic-proof",
        proofStatus,
        authorizationStatus: authorized ? "authorized" : proofStatus,
        sourceAuthority: "Andrews transcription",
        input,
        legalWitnessTagIds: ["cn-l3-negativizing-particles"],
        premises: [{
          layer: "negative-particle-set",
          rule: "Andrews 3.3 gives ah# and ca# as the two negative particles.",
          passed: negativizingEntries.some(entry => entry.sourceForm === "ah#") && negativizingEntries.some(entry => entry.sourceForm === "ca#"),
          forms: ["ah#", "ca#"]
        }, {
          layer: "prefixal-adverb-attachment",
          rule: "The negative particle modifies the item attached to its right.",
          passed: hasInput ? isNegativizingEntry : true,
          attachment: "bound-to-following"
        }, {
          layer: "ca-complementary-distribution",
          rule: "ca# occurs only after ma, tla, or mah; ah# occurs elsewhere.",
          passed: hasInput ? caDistributionLicensed && !caContextRequired : true,
          usesCaNegative,
          caContext,
          contextRequired: caContextRequired,
          caLicensedAfter: Array.from(caLicensedAfter)
        }, {
          layer: "not-sentence-negation",
          rule: "This frame recognizes particle negativization only and does not authorize sentence or clause negation generation.",
          passed: true,
          sentenceNegationAllowed: false,
          clauseNegationAllowed: false
        }],
        conclusion: {
          authorized,
          authorizedForNuclearClause: false,
          particleAuthorityOnly: true,
          particleNegativizationAllowed: authorized,
          sentenceNegationAllowed: false,
          clauseNegationAllowed: false,
          authorizedParticle: authorized ? sourceForm : "",
          negativePrefix: authorized ? negativePrefix : ""
        }
      };
      return {
        kind: "classical-nahuatl-lesson3-negativizing-particle-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        lesson: "Andrews Lesson 3",
        section: "3.3",
        machineryScope: "particle-negativization",
        activeAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
        input,
        sourceForm,
        candidateEntry,
        negativePrefix,
        caContext,
        caContextRequired,
        caDistributionLicensed,
        negativizingEntries,
        ruleRefs: getClassicalNahuatlLesson3NegativizingParticleRules(),
        legalWitnessTagIds: ["cn-l3-negativizing-particles"],
        proofFrame,
        proofStatus: proofFrame.proofStatus,
        authorizationStatus: proofFrame.authorizationStatus,
        outputLanguage: "Classical Nahuatl",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        grammarGenerationAllowed: false,
        sentenceNegationAllowed: false,
        clauseNegationAllowed: false,
        nuclearClauseAuthorityAllowed: false,
        particleAuthorityNote: CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE
      };
    }
    function buildClassicalNahuatlLesson3ParticleCollocationFrame(candidate = "", options = {}) {
      const input = Array.isArray(candidate) ? candidate.map(part => String(part == null ? "" : part).trim()).filter(Boolean).join(" ") : String(candidate == null ? "" : candidate).trim();
      const hasInput = Boolean(input);
      const candidateOutOfScope = isClassicalNahuatlLesson3OutOfParticleScope(input);
      const entries = getClassicalNahuatlLesson3ParticleEntries();
      const candidateEntry = hasInput && !candidateOutOfScope ? findClassicalNahuatlLesson3ParticleEntry(input) : null;
      const sourceForm = candidateEntry?.sourceForm || input;
      const collocationEntries = entries.filter(entry => String(entry.section || "").startsWith("3.4") || entry.functionScope === "collocation");
      const components = getClassicalNahuatlLesson3ParticleComponents(sourceForm);
      const componentFrames = components.map(component => {
        const componentEntry = findClassicalNahuatlLesson3ParticleEntry(component);
        return {
          sourceForm: component,
          matched: Boolean(componentEntry),
          entryId: componentEntry?.id || "",
          functionScope: componentEntry?.functionScope || ""
        };
      });
      const candidateIsCollocation = Boolean(candidateEntry) && (String(candidateEntry.section || "").startsWith("3.4") || candidateEntry.functionScope === "collocation");
      const componentsAreParticles = components.length >= 2 && componentFrames.every(frame => frame.matched);
      const authorized = hasInput && !candidateOutOfScope && candidateIsCollocation && components.length >= 2;
      const proofStatus = authorized ? "proven" : hasInput ? "blocked" : "inventory-preview";
      const proofFrame = {
        kind: "classical-nahuatl-lesson3-particle-collocation-proof-frame",
        lesson: "Andrews Lesson 3",
        section: "3.4",
        proofKind: "logic-proof",
        proofStatus,
        authorizationStatus: authorized ? "authorized" : hasInput ? "blocked" : "preview",
        sourceAuthority: "Andrews transcription",
        input,
        legalWitnessTagIds: ["cn-l3-particle-collocations", "cn-l3-particle-separation"],
        premises: [{
          layer: "collocation-inventory",
          rule: "Andrews 3.4 supplies witnessed particle collocations.",
          passed: collocationEntries.length > 0,
          inventoryCount: collocationEntries.length
        }, {
          layer: "two-or-more-particles",
          rule: "A collocation combines two or more particles in sequence.",
          passed: hasInput ? components.length >= 2 : true,
          components
        }, {
          layer: "fixed-order-witness",
          rule: "The witnessed collocation order is the authority.",
          passed: hasInput ? candidateIsCollocation : true,
          sourceForm: candidateEntry?.sourceForm || ""
        }, {
          layer: "written-separately",
          rule: "In these lessons collocation members are written separately.",
          passed: hasInput ? /\s/.test(sourceForm) : true,
          writtenSeparately: /\s/.test(sourceForm)
        }, {
          layer: "not-nuclear-clause",
          rule: "A particle collocation does not authorize a nuclear-clause formula.",
          passed: true,
          authorizedForNuclearClause: false
        }],
        conclusion: {
          authorized,
          authorizedForNuclearClause: false,
          particleAuthorityOnly: true,
          collocationOutputAllowed: authorized,
          authorizedCollocation: authorized ? sourceForm : "",
          componentsAreParticles
        }
      };
      return {
        kind: "classical-nahuatl-lesson3-particle-collocation-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        lesson: "Andrews Lesson 3",
        section: "3.4",
        machineryScope: "particle-collocations",
        activeAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
        input,
        sourceForm,
        candidateEntry,
        components,
        componentFrames,
        collocationEntries,
        ruleRefs: getClassicalNahuatlLesson3ParticleCollocationRules(),
        legalWitnessTagIds: ["cn-l3-particle-collocations", "cn-l3-particle-separation"],
        proofFrame,
        proofStatus: proofFrame.proofStatus,
        authorizationStatus: proofFrame.authorizationStatus,
        outputLanguage: "Classical Nahuatl",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        grammarGenerationAllowed: false,
        nuclearClauseAuthorityAllowed: false,
        particleAuthorityNote: CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE
      };
    }
    function buildClassicalNahuatlLesson3HonorificizedParticleFrame(candidate = "", options = {}) {
      const input = String(candidate == null ? "" : candidate).trim();
      const hasInput = Boolean(input);
      const candidateOutOfScope = isClassicalNahuatlLesson3OutOfParticleScope(input);
      const entries = getClassicalNahuatlLesson3ParticleEntries();
      const candidateEntry = hasInput && !candidateOutOfScope ? findClassicalNahuatlLesson3ParticleEntry(input) : null;
      const sourceForm = candidateEntry?.sourceForm || input;
      const honorificizedEntries = entries.filter(entry => String(entry.section || "").startsWith("3.5") || entry.functionScope === "honorificized");
      const example = getClassicalNahuatlLesson3HonorificizedParticleExamples().find(item => normalizeClassicalNahuatlLesson3ParticleLookupValue(item.sourceForm) === normalizeClassicalNahuatlLesson3ParticleLookupValue(sourceForm)) || null;
      const finalMemberEntry = example?.finalMember ? findClassicalNahuatlLesson3ParticleEntry(example.finalMember) : null;
      const baseParticleEntry = example?.baseParticle ? findClassicalNahuatlLesson3ParticleEntry(example.baseParticle) : null;
      const candidateIsHonorificized = Boolean(candidateEntry) && (String(candidateEntry.section || "").startsWith("3.5") || candidateEntry.functionScope === "honorificized");
      const markerPresent = /tzin\b/.test(sourceForm);
      const authorized = hasInput && !candidateOutOfScope && candidateIsHonorificized && Boolean(example) && markerPresent;
      const proofStatus = authorized ? "proven" : hasInput ? "blocked" : "inventory-preview";
      const proofFrame = {
        kind: "classical-nahuatl-lesson3-honorificized-particle-proof-frame",
        lesson: "Andrews Lesson 3",
        section: "3.5",
        proofKind: "logic-proof",
        proofStatus,
        authorizationStatus: authorized ? "authorized" : hasInput ? "blocked" : "preview",
        sourceAuthority: "Andrews transcription",
        input,
        legalWitnessTagIds: ["cn-l3-honorificized-particles", "cn-l3-particle-separation"],
        premises: [{
          layer: "honorificized-particle-inventory",
          rule: "Andrews 3.5 supplies witnessed honorificized particles.",
          passed: honorificizedEntries.length > 0,
          inventoryCount: honorificizedEntries.length
        }, {
          layer: "tzin-particle-attachment",
          rule: "(tzin)-tli- may attach to a single particle.",
          passed: hasInput ? Boolean(example) : true,
          hostKind: example?.hostKind || ""
        }, {
          layer: "final-collocation-member",
          rule: "If tzin attaches to a final collocation member, the whole collocation is honorificized.",
          passed: hasInput ? example?.hostKind !== "collocation-final-member" || Boolean(example.finalMember) : true,
          finalMember: example?.finalMember || ""
        }, {
          layer: "translation-not-authority",
          rule: "English gloss cannot capture the honorific quality and cannot authorize the particle operation.",
          passed: true
        }, {
          layer: "not-nuclear-clause",
          rule: "Honorificized particle logic does not authorize honorific nuclear-clause generation.",
          passed: true,
          authorizedForNuclearClause: false
        }],
        conclusion: {
          authorized,
          authorizedForNuclearClause: false,
          particleAuthorityOnly: true,
          honorificizedParticleOutputAllowed: authorized,
          authorizedParticle: authorized ? sourceForm : "",
          finalMember: authorized ? example?.finalMember || "" : "",
          entireCollocationHonorific: authorized && example?.hostKind === "collocation-final-member"
        }
      };
      return {
        kind: "classical-nahuatl-lesson3-honorificized-particle-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        lesson: "Andrews Lesson 3",
        section: "3.5",
        machineryScope: "honorificized-particles",
        activeAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
        input,
        sourceForm,
        candidateEntry,
        example,
        finalMemberEntry,
        baseParticleEntry,
        honorificizedEntries,
        ruleRefs: getClassicalNahuatlLesson3HonorificizedParticleRules(),
        legalWitnessTagIds: ["cn-l3-honorificized-particles", "cn-l3-particle-separation"],
        proofFrame,
        proofStatus: proofFrame.proofStatus,
        authorizationStatus: proofFrame.authorizationStatus,
        outputLanguage: "Classical Nahuatl",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        grammarGenerationAllowed: false,
        nuclearClauseAuthorityAllowed: false,
        particleAuthorityNote: CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE
      };
    }
    function buildClassicalNahuatlLesson3ProofFrame({
      input = "",
      candidateEntry = null,
      candidateOutOfScope = false,
      entries = [],
      lesson2Frame = null,
      profileWallFrame = null
    } = {}) {
      const hasInput = Boolean(String(input || "").trim());
      const inventoryAvailable = Array.isArray(entries) && entries.length > 0;
      const lesson2Authorized = !hasInput || lesson2Frame?.proofFrame?.conclusion?.authorized === true;
      const candidateMatched = Boolean(candidateEntry);
      const particleSyntaxAccepted = candidateOutOfScope !== true;
      const authorized = hasInput && lesson2Authorized && inventoryAvailable && particleSyntaxAccepted && candidateMatched;
      return {
        kind: "classical-nahuatl-lesson3-logic-proof-frame",
        lesson: "Andrews Lesson 3",
        proofKind: "logic-proof",
        proofStatus: authorized ? "proven" : hasInput ? "blocked" : "inventory-preview",
        authorizationStatus: authorized ? "authorized" : hasInput ? "blocked" : "preview",
        sourceAuthority: "Andrews transcription",
        proofDepth: "particle-inventory-and-separation",
        input,
        legalWitnessTagIds: CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS,
        premises: [{
          lesson: "Andrews Lesson 2",
          layer: "orthography-pronunciation",
          rule: "Particle output still uses direct Classical transcription from Lesson 2.",
          passed: lesson2Authorized,
          frameKind: lesson2Frame?.kind || "",
          lesson2ProofStatus: lesson2Frame?.proofFrame?.proofStatus || ""
        }, {
          lesson: "Andrews Lesson 3",
          layer: "particle-inventory",
          rule: "A particle output must come from the Andrews Lesson 3 particle inventory.",
          passed: inventoryAvailable,
          legalWitnessTagId: "cn-l3-particle-inventory",
          inventoryCount: Array.isArray(entries) ? entries.length : 0
        }, {
          lesson: "Andrews Lesson 3",
          layer: "particle-not-nuclear-clause",
          rule: "Particle syntax is not nuclear-clause syntax.",
          passed: particleSyntaxAccepted,
          legalWitnessTagId: "cn-l3-particle-separation",
          candidateOutOfScope
        }, {
          lesson: "Andrews Lesson 3",
          layer: "selected-particle",
          rule: "When an input is supplied, it must match an Andrews particle entry.",
          passed: hasInput ? candidateMatched : true,
          selectedParticle: candidateEntry?.sourceForm || ""
        }, {
          lesson: "Andrews Lesson 3",
          layer: "authority-separation",
          rule: "A particle proof cannot authorize a Lesson 4 nuclear-clause formula.",
          passed: true,
          legalWitnessTagId: "cn-l3-particle-separation",
          authorizedForNuclearClause: false,
          profileWallKind: profileWallFrame?.kind || "classical-nahuatl-profile-wall-frame"
        }],
        conclusion: {
          authorized,
          particleOutputAllowed: authorized,
          authorizedParticle: authorized ? candidateEntry?.sourceForm || "" : "",
          authorizedForNuclearClause: false,
          particleAuthorityOnly: true
        },
        nextLessonContract: {
          kind: "classical-nahuatl-lesson3-to-lesson4-contract",
          carriesForward: ["authorizedForNuclearClause", "particleAuthorityOnly", "authorizedParticle"],
          laterLessonsBuildOnPreviousLessons: true
        }
      };
    }
    function buildClassicalNahuatlLesson3ParticlesFrame(candidate = "", options = {}) {
      const profileWallFrame = getClassicalNahuatlLesson3ProfileWallFrame(options);
      const input = String(candidate == null ? "" : candidate).trim();
      const entries = getClassicalNahuatlLesson3ParticleEntries();
      const candidateEntry = findClassicalNahuatlLesson3ParticleEntry(input);
      const candidateOutOfScope = isClassicalNahuatlLesson3OutOfParticleScope(input);
      const lesson2Builder = getClassicalNahuatlLesson3RuntimeTarget()?.buildClassicalNahuatlLesson2OrthographyFrame;
      const lesson2Frame = input && !candidateOutOfScope && typeof lesson2Builder === "function" ? lesson2Builder(candidateEntry?.sourceForm || input, {
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT
      }) : null;
      const proofFrame = buildClassicalNahuatlLesson3ProofFrame({
        input,
        candidateEntry,
        candidateOutOfScope,
        entries,
        lesson2Frame,
        profileWallFrame
      });
      const diagnostics = [];
      if (!input) {
        diagnostics.push("classical-lesson3-particle-inventory-preview");
      } else if (candidateOutOfScope) {
        diagnostics.push("classical-lesson3-rejects-nuclear-clause-syntax");
      } else if (!candidateEntry) {
        diagnostics.push("classical-lesson3-particle-candidate-unmatched");
      } else {
        diagnostics.push("classical-lesson3-particle-candidate-matched");
      }
      const functionalClassFrame = buildClassicalNahuatlLesson3FunctionalClassFrame(input, options);
      const negativizingParticleFrame = buildClassicalNahuatlLesson3NegativizingParticleFrame(input, options);
      const particleCollocationFrame = buildClassicalNahuatlLesson3ParticleCollocationFrame(input, options);
      const honorificizedParticleFrame = buildClassicalNahuatlLesson3HonorificizedParticleFrame(input, options);
      return {
        kind: "classical-nahuatl-lesson3-particles-machinery-frame",
        version: CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION,
        lesson: "Andrews Lesson 3",
        lessonTitle: "Particles",
        machineryScope: "particles",
        activeAuthority: "Andrews transcription",
        sourceAuthority: "Andrews transcription",
        grammarAuthority: "Andrews transcription",
        outputAuthority: "Andrews transcription",
        sourceDocument: options.sourceDocument || CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT,
        profileWallFrame,
        profileWallKind: profileWallFrame?.kind || "classical-nahuatl-profile-wall-frame",
        profileSeparationMechanism: profileWallFrame?.separationMechanism || "profile-selection",
        spellingInspection: profileWallFrame?.spellingInspection || "not-performed",
        input,
        normalized: normalizeClassicalNahuatlLesson3ParticleLookupValue(input),
        output: candidateEntry?.sourceForm || "",
        outputForms: candidateEntry?.sourceForm ? [candidateEntry.sourceForm] : [],
        candidateEntry,
        entries,
        lesson2Frame,
        proofFrame,
        proofStatus: proofFrame.proofStatus,
        authorizationStatus: proofFrame.authorizationStatus,
        legalWitnessTagIds: CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS,
        functionalClassFrame,
        negativizingParticleFrame,
        particleCollocationFrame,
        honorificizedParticleFrame,
        ruleLogicFrames: [functionalClassFrame, negativizingParticleFrame, particleCollocationFrame, honorificizedParticleFrame],
        ruleLogicStatuses: {
          functionalClasses: functionalClassFrame.authorizationStatus,
          negativizingParticles: negativizingParticleFrame.authorizationStatus,
          particleCollocations: particleCollocationFrame.authorizationStatus,
          honorificizedParticles: honorificizedParticleFrame.authorizationStatus
        },
        inventoryGroups: groupClassicalNahuatlLesson3ParticleEntries(entries),
        functionClassFrames: typeof targetObject.getParticleFunctionClassFrames === "function" ? targetObject.getParticleFunctionClassFrames() : [],
        placementFrames: typeof targetObject.getParticlePlacementFrames === "function" ? targetObject.getParticlePlacementFrames() : [],
        languageProfileId: CLASSICAL_NAHUATL_LESSON3_PROFILE_ID,
        sourceProfileId: CLASSICAL_NAHUATL_LESSON3_PROFILE_ID,
        targetProfileId: CLASSICAL_NAHUATL_LESSON3_PROFILE_ID,
        outputLanguage: "Classical Nahuatl",
        orthographyPolicy: "transcription-direct",
        nawatPipilSystem: "not-used",
        nawatPipilOrthographyBridge: "not-applied",
        oldNawatPipilConjugatorAuthority: profileWallFrame?.oldNawatPipilConjugatorAuthority || "not-authority-for-classical-lane",
        nawatPipilGrammarAuthorityForClassical: profileWallFrame?.nawatPipilGrammarAuthorityForClassical || "not-authority-for-classical-lane",
        grammarGenerationAllowed: false,
        particleOutputAllowed: proofFrame.conclusion.authorized === true,
        blocksInput: Boolean(input) && proofFrame.conclusion.authorized !== true,
        blockReason: candidateOutOfScope ? "not-particle-syntax" : input && !candidateEntry ? "particle-candidate-unmatched" : "",
        diagnostics
      };
    }
    function installClassicalNahuatlLesson3ParticlesClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlLesson3ParticleEntries,
        findClassicalNahuatlLesson3ParticleEntries,
        findClassicalNahuatlLesson3ParticleEntry,
        getClassicalNahuatlLesson3ParticleGroups,
        getClassicalNahuatlLesson3FunctionalClassRules,
        getClassicalNahuatlLesson3NegativizingParticleRules,
        getClassicalNahuatlLesson3ParticleCollocationRules,
        getClassicalNahuatlLesson3HonorificizedParticleRules,
        getClassicalNahuatlLesson3HonorificizedParticleExamples,
        buildClassicalNahuatlLesson3ProofFrame,
        buildClassicalNahuatlLesson3FunctionalClassFrame,
        buildClassicalNahuatlLesson3NegativizingParticleFrame,
        buildClassicalNahuatlLesson3ParticleCollocationFrame,
        buildClassicalNahuatlLesson3HonorificizedParticleFrame,
        buildClassicalNahuatlLesson3ParticlesFrame
      });
      return globalTarget;
    }
    installClassicalNahuatlLesson3ParticlesClassicGlobals();

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PARTICLES_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PROFILE_ID", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PROFILE_ID; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PARTICLE_AUTHORITY_NOTE; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_LEGAL_WITNESS_TAG_IDS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_FUNCTIONAL_CLASS_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_NEGATIVIZING_PARTICLE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_PARTICLE_COLLOCATION_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON3_HONORIFICIZED_PARTICLE_EXAMPLES; },
    });
    api.getClassicalNahuatlLesson3RuntimeTarget = getClassicalNahuatlLesson3RuntimeTarget;
    api.getClassicalNahuatlLesson3ProfileWallFrame = getClassicalNahuatlLesson3ProfileWallFrame;
    api.normalizeClassicalNahuatlLesson3ParticleLookupValue = normalizeClassicalNahuatlLesson3ParticleLookupValue;
    api.cloneClassicalNahuatlLesson3Rule = cloneClassicalNahuatlLesson3Rule;
    api.cloneClassicalNahuatlLesson3HonorificizedExample = cloneClassicalNahuatlLesson3HonorificizedExample;
    api.getClassicalNahuatlLesson3FunctionalClassRules = getClassicalNahuatlLesson3FunctionalClassRules;
    api.getClassicalNahuatlLesson3NegativizingParticleRules = getClassicalNahuatlLesson3NegativizingParticleRules;
    api.getClassicalNahuatlLesson3ParticleCollocationRules = getClassicalNahuatlLesson3ParticleCollocationRules;
    api.getClassicalNahuatlLesson3HonorificizedParticleRules = getClassicalNahuatlLesson3HonorificizedParticleRules;
    api.getClassicalNahuatlLesson3HonorificizedParticleExamples = getClassicalNahuatlLesson3HonorificizedParticleExamples;
    api.getClassicalNahuatlLesson3ParticleFunctionClassFrames = getClassicalNahuatlLesson3ParticleFunctionClassFrames;
    api.getClassicalNahuatlLesson3ParticleGroups = getClassicalNahuatlLesson3ParticleGroups;
    api.getClassicalNahuatlLesson3ParticleEntries = getClassicalNahuatlLesson3ParticleEntries;
    api.findClassicalNahuatlLesson3ParticleEntries = findClassicalNahuatlLesson3ParticleEntries;
    api.findClassicalNahuatlLesson3ParticleEntry = findClassicalNahuatlLesson3ParticleEntry;
    api.groupClassicalNahuatlLesson3ParticleEntries = groupClassicalNahuatlLesson3ParticleEntries;
    api.isClassicalNahuatlLesson3OutOfParticleScope = isClassicalNahuatlLesson3OutOfParticleScope;
    api.getClassicalNahuatlLesson3ParticleComponents = getClassicalNahuatlLesson3ParticleComponents;
    api.getClassicalNahuatlLesson3CaContext = getClassicalNahuatlLesson3CaContext;
    api.sourceUsesClassicalNahuatlLesson3CaNegative = sourceUsesClassicalNahuatlLesson3CaNegative;
    api.buildClassicalNahuatlLesson3FunctionalClassFrame = buildClassicalNahuatlLesson3FunctionalClassFrame;
    api.buildClassicalNahuatlLesson3NegativizingParticleFrame = buildClassicalNahuatlLesson3NegativizingParticleFrame;
    api.buildClassicalNahuatlLesson3ParticleCollocationFrame = buildClassicalNahuatlLesson3ParticleCollocationFrame;
    api.buildClassicalNahuatlLesson3HonorificizedParticleFrame = buildClassicalNahuatlLesson3HonorificizedParticleFrame;
    api.buildClassicalNahuatlLesson3ProofFrame = buildClassicalNahuatlLesson3ProofFrame;
    api.buildClassicalNahuatlLesson3ParticlesFrame = buildClassicalNahuatlLesson3ParticlesFrame;
    api.installClassicalNahuatlLesson3ParticlesClassicGlobals = installClassicalNahuatlLesson3ParticlesClassicGlobals;
    return api;
}

export function installClassicalNahuatlLesson3ParticlesGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLesson3ParticlesApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
