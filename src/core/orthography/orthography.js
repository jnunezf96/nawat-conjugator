// core/orthography/orthography.js
// Orthography-profile and bridge metadata. This layer may classify spelling
// correspondences, but it must not generate Nawat/Pipil forms.

"use strict";

const ORTHOGRAPHY_BRIDGE_VERSION = 1;

const ORTHOGRAPHY_PROFILE_IDS = Object.freeze({
    nawatModern: "nawat-modern",
    classicalNahuatl: "classical-nahuatl",
    unknown: "unknown",
});

const ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES = Object.freeze([
    "letter normalization is not morphology",
    "orthography match is not lexical evidence",
    "Classical Nahuatl form is not Nawat/Pipil fixture",
    "open-stem is not fixture evidence",
    "sourceKind is not grammar class",
    "topic is not nounClass",
    "supplementation is not word generation",
    "pronominal NNC is not ordinary NNC",
    "nonactive stem derivation is not identical to passive output",
    "Andrews grammar authority is not Classical spelling authority for Nawat output",
]);

const CLASSICAL_NAHUATL_LETTERS = Object.freeze(
    "acehilmnopqtuxyz".split("")
);

const CLASSICAL_NAHUATL_DIGRAPHS = Object.freeze([
    "ch",
    "cu",
    "hu",
    "qu",
    "tz",
    "tl",
    "uc",
    "uh",
]);

const ORTHOGRAPHY_BRIDGE_RULES = Object.freeze([
    Object.freeze({
        id: "same-ch",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "ch",
        targetGrapheme: "ch",
        confidence: "confirmed-overlap",
        action: "profile-overlap",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "same-tz",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "tz",
        targetGrapheme: "tz",
        confidence: "confirmed-overlap",
        action: "profile-overlap",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "qu-k",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "qu",
        targetGrapheme: "k",
        confidence: "candidate",
        action: "suggest-only",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "cu-kw",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "cu",
        targetGrapheme: "kw",
        confidence: "candidate",
        action: "suggest-only",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "uc-kw",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "uc",
        targetGrapheme: "kw",
        confidence: "candidate",
        action: "suggest-only",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "hu-w",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "hu",
        targetGrapheme: "w",
        confidence: "candidate",
        action: "suggest-only",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "uh-w",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "uh",
        targetGrapheme: "w",
        confidence: "candidate",
        action: "suggest-only",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "x-sh",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "x",
        targetGrapheme: "sh",
        confidence: "candidate",
        action: "suggest-only",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "c-z-s",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "c/z",
        targetGrapheme: "s",
        confidence: "lossy",
        action: "diagnostic-only",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "long-vowel",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: ":",
        targetGrapheme: "",
        confidence: "lossy",
        action: "blocked",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "o-u",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "o",
        targetGrapheme: "u",
        confidence: "lossy",
        action: "blocked",
        generationAllowed: false,
    }),
    Object.freeze({
        id: "tl",
        sourceProfile: "classical-nahuatl",
        targetProfile: "nawat-modern",
        sourceGrapheme: "tl",
        targetGrapheme: "",
        confidence: "blocked-morphology",
        action: "blocked",
        generationAllowed: false,
    }),
]);

function normalizeOrthographyInput(value) {
    return String(value == null ? "" : value)
        .trim()
        .toLowerCase();
}

function getStaticNawatVowels() {
    if (typeof VOWELS === "string" && VOWELS) {
        return VOWELS.split("");
    }
    return ["a", "e", "i", "u"];
}

function getStaticNawatConsonants() {
    if (typeof VALID_CONSONANTS !== "undefined" && VALID_CONSONANTS && typeof VALID_CONSONANTS.forEach === "function") {
        return Array.from(VALID_CONSONANTS);
    }
    return ["p", "t", "k", "m", "n", "s", "l", "w", "y", "j", "c", "z", "d"];
}

function getStaticNawatDigraphs() {
    if (typeof DIGRAPH_SET !== "undefined" && DIGRAPH_SET && typeof DIGRAPH_SET.forEach === "function") {
        return Array.from(DIGRAPH_SET);
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
            digraphs: Object.freeze(nawatDigraphs),
        }),
        [ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl]: Object.freeze({
            id: ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl,
            label: "Classical Nahuatl orthography",
            authority: "Andrews Lesson 2 source profile, not Nawat output spelling",
            letters: CLASSICAL_NAHUATL_LETTERS,
            digraphs: CLASSICAL_NAHUATL_DIGRAPHS,
        }),
        [ORTHOGRAPHY_PROFILE_IDS.unknown]: Object.freeze({
            id: ORTHOGRAPHY_PROFILE_IDS.unknown,
            label: "Unknown orthography",
            authority: "diagnostic-only",
        }),
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
    return Array.from(new Set([
        ...getStaticNawatDigraphs(),
        ...CLASSICAL_NAHUATL_DIGRAPHS,
    ]));
}

function isOrthographyBoundaryChar(char) {
    return /[\s#()[\]{}|~\/-]/.test(char);
}

function splitOrthographyGraphemes(value, options = {}) {
    const normalized = normalizeOrthographyInput(value);
    const profileId = options.profileId || ORTHOGRAPHY_PROFILE_IDS.unknown;
    const digraphs = getOrthographyDigraphs(profileId)
        .slice()
        .sort((left, right) => right.length - left.length);
    const graphemes = [];
    let index = 0;
    while (index < normalized.length) {
        const char = normalized[index];
        if (isOrthographyBoundaryChar(char)) {
            index += 1;
            continue;
        }
        const match = digraphs.find((digraph) => normalized.slice(index, index + digraph.length) === digraph);
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
    return new Set([
        ...getStaticNawatVowels(),
        ...getStaticNawatConsonants(),
        ...getStaticNawatDigraphs(),
    ]);
}

function getClassicalAllowedGraphemeSet() {
    return new Set([
        ...CLASSICAL_NAHUATL_LETTERS,
        ...CLASSICAL_NAHUATL_DIGRAPHS,
    ]);
}

function getInvalidOrthographyGraphemes(value, options = {}) {
    const profileId = options.profileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern;
    const allowed = profileId === ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl
        ? getClassicalAllowedGraphemeSet()
        : getModernNawatAllowedGraphemeSet();
    return splitOrthographyGraphemes(value, { profileId })
        .filter((grapheme) => !allowed.has(grapheme));
}

function getOrthographyRuleMatches(normalized) {
    if (!normalized) {
        return [];
    }
    return ORTHOGRAPHY_BRIDGE_RULES.filter((rule) => {
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
    const classicalMarkers = getOrthographyRuleMatches(normalized)
        .filter((rule) => rule.id !== "same-ch" && rule.id !== "same-tz");
    const nawatInvalid = getInvalidOrthographyGraphemes(normalized, {
        profileId: ORTHOGRAPHY_PROFILE_IDS.nawatModern,
    });
    if (classicalMarkers.length || nawatInvalid.some((grapheme) => ["q", "x", "h", "o", ":"].includes(grapheme))) {
        return ORTHOGRAPHY_PROFILE_IDS.classicalNahuatl;
    }
    if (!nawatInvalid.length) {
        return ORTHOGRAPHY_PROFILE_IDS.nawatModern;
    }
    return ORTHOGRAPHY_PROFILE_IDS.unknown;
}

function getOrthographyBridgeDiagnostics(matches, options = {}) {
    const diagnostics = [
        {
            id: "orthography-bridge-no-generation",
            severity: "info",
            message: "Orthography bridge metadata never authorizes Nawat/Pipil generation.",
        },
    ];
    const blocked = matches.filter((match) => match.action === "blocked");
    if (blocked.length) {
        diagnostics.push({
            id: "orthography-bridge-blocked-lossy",
            severity: "warning",
            ruleIds: blocked.map((match) => match.id),
            message: "A spelling correspondence is lossy or morphology-sensitive and must remain diagnostic-only.",
        });
    }
    if (options.requireNawatEvidence !== false) {
        diagnostics.push({
            id: "orthography-bridge-needs-nawat-evidence",
            severity: "info",
            message: "A spelling match is not lexical evidence; confirmed Nawat/Pipil data is still required.",
        });
    }
    return diagnostics;
}

function buildOrthographyBridgeMetadata(value, options = {}) {
    const normalized = normalizeOrthographyInput(value);
    const sourceProfileId = options.sourceProfileId || inferOrthographyProfileId(normalized);
    const targetProfileId = options.targetProfileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern;
    const graphemes = splitOrthographyGraphemes(normalized, { profileId: sourceProfileId });
    const matches = getOrthographyRuleMatches(normalized)
        .filter((rule) => (
            (sourceProfileId === ORTHOGRAPHY_PROFILE_IDS.unknown || rule.sourceProfile === sourceProfileId)
            && rule.targetProfile === targetProfileId
        ));
    const blocked = matches.filter((match) => match.action === "blocked");
    return {
        kind: "orthography-bridge",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        sourceProfileId,
        targetProfileId,
        graphemes,
        correspondences: matches.map((match) => ({
            id: match.id,
            sourceGrapheme: match.sourceGrapheme,
            targetGrapheme: match.targetGrapheme,
            confidence: match.confidence,
            action: match.action,
            generationAllowed: false,
        })),
        blocked: blocked.map((match) => match.id),
        generationAllowed: false,
        antiConflationRules: Array.from(ORTHOGRAPHY_BRIDGE_ANTI_CONFLATION_RULES),
        diagnostics: getOrthographyBridgeDiagnostics(matches, options),
        evidence: {
            grammarAuthority: "Andrews PDF",
            orthographySource: "Andrews Lesson 2 / Appendix F source profiles",
            targetAuthority: "Modern Nawat/Pipil orthography",
        },
    };
}

function classifyOrthographyInput(value, options = {}) {
    const normalized = normalizeOrthographyInput(value);
    const profileId = options.profileId || inferOrthographyProfileId(normalized);
    const profiles = getOrthographyProfileInventory();
    const graphemes = splitOrthographyGraphemes(normalized, { profileId });
    const invalidGraphemes = getInvalidOrthographyGraphemes(normalized, { profileId });
    const bridge = buildOrthographyBridgeMetadata(normalized, {
        sourceProfileId: profileId,
        targetProfileId: options.targetProfileId || ORTHOGRAPHY_PROFILE_IDS.nawatModern,
        requireNawatEvidence: options.requireNawatEvidence,
    });
    return {
        kind: "orthography-classification",
        version: ORTHOGRAPHY_BRIDGE_VERSION,
        input: String(value == null ? "" : value),
        normalized,
        profileId,
        profileLabel: profiles[profileId]?.label || profiles[ORTHOGRAPHY_PROFILE_IDS.unknown].label,
        graphemes,
        invalidGraphemes,
        bridge,
        generationAllowed: false,
    };
}
