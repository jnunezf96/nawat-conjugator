// core/parsing/parsing.js
// Input parser, canonical spec builders, verb meta builder, verb input parser.
// Extracted from script.js:
//   Input Validation section (lines 15,725–16,753): core regex parsing and CanonicalVerbSpec
//   Verb Parsing section (lines 18,283–19,041): parseVerbInput and directional rule helpers
// Global-scope module: all functions defined directly on the global object.
// Deps (var in script.js): COMPOSER_TRANSITIVITY, DERIVATION_TYPE, DEFAULT_DIRECTIONAL_RULES,
//   DIRECTIONAL_RULES, SPECIFIC_VALENCE_PREFIX_SET, NONSPECIFIC_VALENCE_AFFIX_SET,
//   VALID_VOWEL_SET, VALID_CONSONANTS, COMPOUND_MARKER_RE, COMPOUND_MARKER_SPLIT_RE,
//   COMPOUND_ALLOWED_RE, REGEX_ENVELOPE_OBJECT_MARKERS, SUPPORTIVE_MARKER_FORMAT,
//   MAX_OBJECT_SLOTS, SUPPLETIVE_WEYA_FORMS, DIGRAPH_SET.
// Runtime deps (function decls in script.js, accessible via global scope):
//   normalizeComposerStem, getComposerValenceFamilyToken, buildComposerSemanticState,
//   normalizeRuleBase, getRawInputTiCausativeMetadata, getCurrentRegexShorthandParseInput,
//   and many others from Nonspecific Object Allomorphy / Conjugation Utilities.

"use strict";


function normalizeMovingTargetCoreText(value = "") {
    const placeholderProtected = convertRegexInputSupportiveMarkersToEnvelope(String(value || ""));
    return normalizeRegexSpecialSerialShorthandCore(restoreBracketSupportiveMarkers(
        placeholderProtected
            .replace(/\//g, "-")
            .toLowerCase()
    ));
}

function getMovingTargetOuterPieceDescriptors(semantic = {}) {
    const pieces = [];
    const addLexicalEmbedPieces = (embed = "") => {
        getComposerEmbedTokens(embed).forEach((token) => {
            const normalized = normalizeComposerStem(token);
            if (normalized) {
                pieces.push({ type: "lexical", value: normalized });
            }
        });
    };
    const addValencePiece = (token = "") => {
        const normalized = normalizeComposerSecondaryValenceSurfaceToken(token)
            || normalizeComposerValenceToken(token);
        if (normalized) {
            pieces.push({ type: "valence", value: normalized });
        }
    };
    const directionalPrefix = normalizeComposerStem(semantic?.directional?.prefix || "");
    if (directionalPrefix) {
        pieces.push({ type: "directional", value: directionalPrefix });
    }
    const transitivity = semantic?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        addLexicalEmbedPieces(semantic?.valence?.intransitive?.embed || "");
        addValencePiece(semantic?.valence?.intransitive?.token || "");
        return pieces;
    }
    if (transitivity === COMPOSER_TRANSITIVITY.transitive) {
        addLexicalEmbedPieces(semantic?.valence?.primary?.embed || "");
        addValencePiece(semantic?.valence?.primary?.token || "");
        return pieces;
    }
    addLexicalEmbedPieces(
        semantic?.valence?.secondary?.embed
        || semantic?.valence?.primary?.embed
        || ""
    );
    const secondaryPair = parseComposerSecondaryValenceSelection(
        semantic?.valence?.secondary?.raw || ""
    );
    let firstToken = secondaryPair.first || semantic?.valence?.primary?.token || "";
    let secondToken = secondaryPair.second || semantic?.valence?.secondary?.token || "";
    addValencePiece(firstToken);
    addValencePiece(secondToken);
    return pieces;
}

function formatMovingTargetOuterPiece(piece = null) {
    if (!piece || !piece.value) {
        return "";
    }
    return piece.type === "lexical"
        ? `(${piece.value})`
        : piece.value;
}

function buildMovingTargetRegexFromCoreAndPieces({
    transitivity = COMPOSER_TRANSITIVITY.intransitive,
    coreText = "",
    outerPieces = [],
} = {}) {
    const normalizedCore = normalizeMovingTargetCoreText(coreText);
    if (!normalizedCore) {
        return "";
    }
    const normalizedPieces = (Array.isArray(outerPieces) ? outerPieces : [])
        .map((piece) => formatMovingTargetOuterPiece(piece))
        .filter(Boolean);
    const isPlaceholderCore = /^_+[a-z0-9]*$/i.test(normalizedCore);
    if (!normalizedPieces.length && isPlaceholderCore) {
        if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
            return normalizedCore;
        }
        return `-${normalizedCore}`;
    }
    const wrappedCore = `(${normalizedCore})`;
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        return normalizedPieces.length
            ? `${normalizedPieces.join("+")}+${wrappedCore}`
            : wrappedCore;
    }
    const transitiveCore = `-${wrappedCore}`;
    return normalizedPieces.length
        ? `${normalizedPieces.join("+")}${transitiveCore}`
        : transitiveCore;
}

function stripPrefixOnce(value = "", prefix = "") {
    const source = String(value || "");
    const matchPrefix = String(prefix || "");
    return source.startsWith(matchPrefix) ? source.slice(matchPrefix.length) : source;
}

function getComposerDisplayExternalValenceSegments(semantic = {}) {
    const transitivity = semantic?.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    const toSurface = (token = "") => (
        normalizeComposerSecondaryValenceSurfaceToken(token)
        || normalizeComposerValenceToken(token)
    );
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        const token = toSurface(semantic?.valence?.intransitive?.token || "");
        return token ? [token] : [];
    }
    if (transitivity === COMPOSER_TRANSITIVITY.transitive) {
        const token = toSurface(semantic?.valence?.primary?.token || "");
        return token ? [token] : [];
    }
    const secondaryPair = parseComposerSecondaryValenceSelection(
        semantic?.valence?.secondary?.raw || ""
    );
    let slotOneValue = toSurface(secondaryPair.first || "");
    let slotTwoValue = toSurface(secondaryPair.second || "");
    if (!slotOneValue && !slotTwoValue) {
        slotOneValue = toSurface(semantic?.valence?.primary?.token || "");
        slotTwoValue = toSurface(semantic?.valence?.secondary?.token || "");
    }
    return [slotOneValue, slotTwoValue].filter(Boolean);
}

function stripLeadingComposerDisplaySegments(screenCore = "", targetSegments = []) {
    const parts = String(screenCore || "")
        .split("-")
        .map((part) => String(part || "").trim())
        .filter(Boolean);
    const removed = [];
    let index = 0;
    const normalizedTargets = (Array.isArray(targetSegments) ? targetSegments : [])
        .map((segment) => String(segment || "").trim().toLowerCase())
        .filter(Boolean);
    while (
        index < normalizedTargets.length
        && removed.length < Math.max(0, parts.length - 1)
        && parts[removed.length]
        && parts[removed.length].toLowerCase() === normalizedTargets[index]
    ) {
        removed.push(parts[removed.length]);
        index += 1;
    }
    return {
        removed,
        remaining: parts.slice(removed.length).join("-"),
    };
}

function buildComposerDisplayVerbFromEnvelope(dashPrefix = "", coreText = "", options = {}) {
    const normalizedDashPrefix = String(dashPrefix || "").startsWith("--")
        ? "--"
        : (String(dashPrefix || "").startsWith("-") ? "-" : "");
    let workingCore = String(coreText || "").trim();
    if (!workingCore) {
        return normalizedDashPrefix;
    }

    const semantic = options.semantic && typeof options.semantic === "object"
        ? options.semantic
        : null;
    const semanticTransitivity = String(semantic?.transitivity || "");
    const composerCoreDashPrefix = (
        semanticTransitivity === COMPOSER_TRANSITIVITY.transitive
        || semanticTransitivity === COMPOSER_TRANSITIVITY.bitransitive
    )
        ? "-"
        : normalizedDashPrefix;
    let directionalPrefix = "";
    const semanticDirectional = String(semantic?.directional?.prefix || "").trim().toLowerCase();
    const directionalMatch = workingCore.match(/^\[([a-z]+)\]\//i);
    if (semanticDirectional && workingCore.startsWith(`[${semanticDirectional}]/`)) {
        directionalPrefix = semanticDirectional;
        workingCore = workingCore.slice(semanticDirectional.length + 3);
    } else if (directionalMatch && isDirectionalPrefixToken(directionalMatch[1] || "")) {
        directionalPrefix = String(directionalMatch[1] || "").toLowerCase();
        workingCore = workingCore.slice(directionalMatch[0].length);
    }

    const screenCore = normalizeComposerScreenCoreValue(workingCore, options);
    const semanticExternalSegments = semantic
        ? getComposerDisplayExternalValenceSegments(semantic)
        : [];
    const stripped = stripLeadingComposerDisplaySegments(screenCore, semanticExternalSegments);
    let outsideSegments = [];
    if (directionalPrefix) {
        outsideSegments.push(directionalPrefix);
    }
    if (stripped.removed.length) {
        outsideSegments.push(...stripped.removed);
    }

    if (!outsideSegments.length) {
        let externalMarker = "";
        const externalMarkerMatch = workingCore.match(/^((?:TA|TE|MU|T|M))-(.+)$/);
        if (externalMarkerMatch) {
            externalMarker = String(externalMarkerMatch[1] || "").toLowerCase();
            workingCore = String(externalMarkerMatch[2] || "");
        }
        if (!directionalPrefix && !externalMarker) {
            return buildRegexDisplayVerb(composerCoreDashPrefix, screenCore);
        }
        const fallbackOutsideSegments = [];
        if (directionalPrefix) {
            fallbackOutsideSegments.push(directionalPrefix);
        }
        if (externalMarker) {
            fallbackOutsideSegments.push(externalMarker);
        }
        const fallbackWrappedCore = buildRegexDisplayVerb(
            composerCoreDashPrefix,
            normalizeComposerScreenCoreValue(workingCore, options)
        );
        return `${fallbackOutsideSegments.join("+")}${fallbackWrappedCore}`;
    }

    const remainingCore = stripped.remaining || screenCore;
    if (!remainingCore) {
        return buildRegexDisplayVerb(composerCoreDashPrefix, screenCore);
    }
    const outsideText = outsideSegments.join("+");
    const wrappedCore = buildRegexDisplayVerb(composerCoreDashPrefix, remainingCore);
    return `${outsideText}${wrappedCore}`;
}

function buildComposerDisplayVerbFromMovingTargetParts(parsed = null, options = {}) {
    if (!parsed || parsed.isValid !== true) {
        return "";
    }
    const transitivity = parsed.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    const dashPrefix = (
        transitivity === COMPOSER_TRANSITIVITY.transitive
        || transitivity === COMPOSER_TRANSITIVITY.bitransitive
    )
        ? "-"
        : "";
    const outsidePieces = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : [])
        .map((piece) => formatComposerDisplayMovingTargetPiece(piece, options))
        .filter(Boolean);
    const screenCore = normalizeComposerScreenCoreValue(parsed.coreText || "", options);
    const wrappedCore = buildRegexDisplayVerb(dashPrefix, screenCore);
    if (!outsidePieces.length) {
        return wrappedCore;
    }
    return `${outsidePieces.join("+")}${wrappedCore}`;
}

function serializeRegexInputValue(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw) {
        return "";
    }
    const shorthandDisplayValue = serializeRegexSpecialSerialShorthandValue(raw);
    if (shorthandDisplayValue) {
        return shorthandDisplayValue;
    }
    const movingTargetParsed = parseMovingTargetRegexInput(raw);
    if (movingTargetParsed.isValid) {
        return serializeRegexSpecialSerialShorthandValue(movingTargetParsed.regexValue)
            || movingTargetParsed.regexValue;
    }
    return raw;
}

function findFinalTopLevelWrappedCore(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw.endsWith(")")) {
        return null;
    }
    let depth = 0;
    let startIndex = -1;
    for (let index = raw.length - 1; index >= 0; index -= 1) {
        const char = raw[index];
        if (char === ")") {
            depth += 1;
        } else if (char === "(") {
            depth -= 1;
            if (depth === 0) {
                startIndex = index;
                break;
            }
            if (depth < 0) {
                return null;
            }
        }
    }
    if (startIndex < 0) {
        return null;
    }
    return {
        startIndex,
        coreText: raw.slice(startIndex + 1, -1),
        prefix: raw.slice(0, startIndex),
    };
}

function splitTopLevelByPlus(rawValue = "") {
    const raw = String(rawValue || "");
    const parts = [];
    let depth = 0;
    let current = "";
    for (let index = 0; index < raw.length; index += 1) {
        const char = raw[index];
        if (char === "(") {
            depth += 1;
            current += char;
            continue;
        }
        if (char === ")") {
            depth -= 1;
            if (depth < 0) {
                return null;
            }
            current += char;
            continue;
        }
        if (char === "+" && depth === 0) {
            if (!current.trim()) {
                return null;
            }
            parts.push(current.trim());
            current = "";
            continue;
        }
        current += char;
    }
    if (depth !== 0 || !current.trim()) {
        return null;
    }
    parts.push(current.trim());
    return parts;
}

function parseMovingTargetOuterPiece(rawPiece = "") {
    const raw = String(rawPiece || "").trim();
    if (!raw) {
        return null;
    }
    const lexicalMatch = raw.match(/^\(([^()]+)\)$/);
    if (lexicalMatch) {
        return {
            type: "lexical",
            value: normalizeComposerStem(lexicalMatch[1] || ""),
        };
    }
    const normalized = normalizeComposerStem(raw);
    if (!normalized) {
        return null;
    }
    if (isDirectionalPrefixToken(normalized)) {
        return { type: "directional", value: normalized };
    }
    if (getComposerValenceFamilyToken(normalized)) {
        return { type: "valence", value: normalized };
    }
    return null;
}

function getLegacyTransitiveEmbeddedSlashSlotCount(rawValue = "") {
    const raw = String(rawValue || "").trim().toLowerCase();
    if (!raw.startsWith("-") || raw.startsWith("--")) {
        return null;
    }
    const body = raw.slice(1);
    if (!body || !body.includes("/")) {
        return null;
    }
    const slashIndex = body.indexOf("/");
    if (slashIndex <= 0 || slashIndex === body.length - 1) {
        return null;
    }
    const left = String(body.slice(0, slashIndex) || "").trim();
    if (!left) {
        return null;
    }
    if (left.startsWith("[i]") || left.startsWith("[y]")) {
        return null;
    }
    if (getBracketDirectionalPrefixToken(left)) {
        return null;
    }
    if (getComposerValenceFamilyToken(left)) {
        return null;
    }
    if (REGEX_ENVELOPE_OBJECT_MARKERS.includes(left.toUpperCase())) {
        return null;
    }
    return 1;
}

function getMovingTargetAdjacentEmbedParts(coreText = "") {
    const normalizedCore = convertEnvelopeSupportiveMarkersToRegexInput(
        normalizeRegexCoreTokenCase(String(coreText || "").trim())
    ).toLowerCase();
    if (!normalizedCore || !normalizedCore.includes("-")) {
        return null;
    }
    const segments = normalizedCore
        .split("-")
        .map((segment) => String(segment || "").trim())
        .filter(Boolean);
    if (segments.length !== 2) {
        return null;
    }
    const [embed, stem] = segments;
    if (!embed || !stem) {
        return null;
    }
    if (embed.startsWith("[i]") || embed.startsWith("[y]")) {
        return null;
    }
    if (isDirectionalPrefixToken(embed)) {
        return null;
    }
    if (getComposerValenceFamilyToken(embed)) {
        return null;
    }
    if (REGEX_ENVELOPE_OBJECT_MARKERS.includes(embed.toUpperCase())) {
        return null;
    }
    return {
        embed,
        stem,
    };
}

function parseMovingTargetRegexInput(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw || raw.includes("?")) {
        return { isValid: false, regexValue: "" };
    }
    const finalCore = findFinalTopLevelWrappedCore(raw);
    if (!finalCore) {
        return { isValid: false, regexValue: "" };
    }
    const coreText = normalizeMovingTargetCoreText(String(finalCore.coreText || "").trim()).replace(/^-+/, "");
    if (!coreText || /[()]/.test(coreText)) {
        return { isValid: false, regexValue: "" };
    }
    const prefix = finalCore.prefix;
    let transitivity = COMPOSER_TRANSITIVITY.intransitive;
    let outerPrefix = "";
    if (!prefix) {
        transitivity = COMPOSER_TRANSITIVITY.intransitive;
    } else if (prefix === "-") {
        transitivity = COMPOSER_TRANSITIVITY.transitive;
    } else if (prefix.endsWith("+")) {
        transitivity = COMPOSER_TRANSITIVITY.intransitive;
        outerPrefix = prefix.slice(0, -1);
    } else if (prefix.endsWith("-")) {
        transitivity = COMPOSER_TRANSITIVITY.transitive;
        outerPrefix = prefix.slice(0, -1);
    } else {
        return { isValid: false, regexValue: "" };
    }
    const outerRawPieces = outerPrefix ? splitTopLevelByPlus(outerPrefix) : [];
    if (outerPrefix && !outerRawPieces) {
        return { isValid: false, regexValue: "" };
    }
    const parsedPieces = [];
    let directionalPrefix = "";
    for (let index = 0; index < outerRawPieces.length; index += 1) {
        const parsedPiece = parseMovingTargetOuterPiece(outerRawPieces[index]);
        if (!parsedPiece || !parsedPiece.value) {
            return { isValid: false, regexValue: "" };
        }
        if (parsedPiece.type === "directional") {
            if (index !== 0 || directionalPrefix) {
                return { isValid: false, regexValue: "" };
            }
            directionalPrefix = parsedPiece.value;
        }
        parsedPieces.push(parsedPiece);
    }
    const valenceCount = parsedPieces.filter((piece) => piece.type === "valence").length;
    const resolvedTransitivity = (
        transitivity === COMPOSER_TRANSITIVITY.transitive && valenceCount >= 2
    )
        ? COMPOSER_TRANSITIVITY.bitransitive
        : transitivity;
    const regexValue = buildMovingTargetRegexFromCoreAndPieces({
        transitivity: resolvedTransitivity,
        coreText,
        outerPieces: parsedPieces,
    });
    return {
        isValid: Boolean(regexValue),
        regexValue,
        transitivity: resolvedTransitivity,
        outerPieces: parsedPieces,
        directionalPrefix,
        coreText,
    };
}

// ─── CanonicalVerbSpec ────────────────────────────────────────────────────────
// Intermediate upstream object using composer vocabulary as canonical field
// names. Both the regex parsing path and the composer semantic path produce
// one of these, which is then consumed by buildVerbMetaFromCanonicalSpec().
//
// Fields (composer vocabulary → regex syntax alias):
//   matrixStem       – the verb root                    (matrix.stem)
//   adjacentEmbed    – slash-adjacent embed prefix      (matrix.adjacentEmbed / hasSuffixSeparator)
//   transitivity     – "intransitive"|"transitive"|…    (transitivity / hasLeadingDash)
//   valenceTokens    – object markers [primary, …]      (valence.primary.token / outerValenceTokens)
//   valenceEmbeds    – lexical bound prefixes           (valence.primary.embed / outerLexicalPrefixes)
//   directionalPrefix– directional prefix token         (directional.prefix)
//   supportiveMarker – "i"|"y"|""                       (supportiveMarker / hasOptionalSupportiveI)
//   tiCausativeClass – "become"|"have"|""               (ti.causativeClass)
//   isYawi / isWeya  – suppletive flags
// ─────────────────────────────────────────────────────────────────────────────

// Builds a CanonicalVerbSpec from the output of parseMovingTargetRegexInput().
function buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, movingTargetParsed, tiInputMetadata) {
    if (!movingTargetParsed || movingTargetParsed.isValid !== true) {
        return null;
    }
    const parsed = movingTargetParsed;
    const outerPieces = Array.isArray(parsed.outerPieces) ? parsed.outerPieces : [];
    // directionalPrefix — composer: directional.prefix
    const directionalPrefix = normalizeComposerStem(parsed.directionalPrefix || "");
    // valenceTokens — composer: valence.primary.token, valence.secondary.token
    const valenceTokens = outerPieces
        .filter((piece) => piece && piece.type === "valence" && piece.value)
        .map((piece) => normalizeComposerSecondaryValenceSurfaceToken(piece.value) || normalizeComposerValenceToken(piece.value))
        .filter(Boolean);
    // valenceEmbeds — composer: valence.primary.embed (lexical bound prefixes)
    const valenceEmbeds = outerPieces
        .filter((piece) => piece && piece.type === "lexical" && piece.value)
        .map((piece) => normalizeRuleBase(piece.value))
        .filter(Boolean);
    // supportiveMarker — composer: supportiveMarker ("i"|"y"|"")
    const markedCore = convertEnvelopeSupportiveMarkersToRegexInput(
        normalizeRegexCoreTokenCase(String(parsed.coreText || "").trim())
    );
    const supportiveResolution = resolveOptionalSupportiveMarkedSurface({
        precedingSurface: `${directionalPrefix}${valenceTokens.join("")}${valenceEmbeds.join("")}`,
        markedSurface: markedCore,
        inputFormat: SUPPORTIVE_MARKER_FORMAT.legacy,
        outputFormat: SUPPORTIVE_MARKER_FORMAT.legacy,
        preserveMarkers: false,
    });
    const supportiveMarker = supportiveResolution.markerLetter || "";
    // adjacentEmbed — composer: matrix.adjacentEmbed (slash-adjacent prefix)
    const plainCore = String(supportiveResolution.plainSurface || markedCore || "").trim().toLowerCase();
    const inlineSurface = parseInlineTiCausativeClassFromBase(collapseSerialStemDashInput(plainCore));
    const normalizedCoreBase = String(inlineSurface.base || plainCore || "").trim().toLowerCase();
    const supportFreeCore = stripLeadingSupportiveLetterFromCoreSurface(normalizedCoreBase, supportiveMarker);
    const inlineRuleBase = parseInlineTiCausativeClassFromBase(collapseSerialStemDashInput(supportFreeCore));
    const normalizedRuleCoreBase = String(inlineRuleBase.base || supportFreeCore || "").trim().toLowerCase();
    const transitivity = parsed.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedCoreBase);
    const adjacentEmbed = adjacentCoreEmbed ? normalizeRuleBase(adjacentCoreEmbed.embed) : "";
    // matrixStem — composer: matrix.stem (the rightmost verb root)
    const matrixStem = normalizeRuleBase(adjacentCoreEmbed ? adjacentCoreEmbed.stem : normalizedCoreBase);
    const ruleAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedRuleCoreBase);
    const matrixRuleBase = normalizeRuleBase(
        ruleAdjacentCoreEmbed ? ruleAdjacentCoreEmbed.stem : normalizedRuleCoreBase
    );
    // tiCausativeClass — composer: ti.causativeClass
    const tiCausativeClass = tiInputMetadata?.tiCausativeClass
        || inlineSurface.tiCausativeClass
        || inlineRuleBase.tiCausativeClass
        || "";
    // isYawi / isWeya — suppletive form detection
    const isSpecificToken = (token = "") => SPECIFIC_VALENCE_PREFIX_SET.has(token) || token === "k";
    const isNonspecificToken = (token = "") => NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
    const hasExplicitTransitivityMarkers = (transitivity !== COMPOSER_TRANSITIVITY.intransitive)
        || valenceTokens.some(isSpecificToken)
        || valenceTokens.some(isNonspecificToken);
    const yawiCanonical = getSuppletiveYawiCanonical();
    const yawiWithoutSupportive = yawiCanonical.startsWith("y") ? yawiCanonical.slice(1) : "";
    const matchesOptionalSupportiveYawi = supportiveMarker === "y"
        && Boolean(yawiWithoutSupportive)
        && matrixStem === yawiWithoutSupportive;
    const isYawi = !hasExplicitTransitivityMarkers
        && (matrixStem === yawiCanonical || matchesOptionalSupportiveYawi);
    const isWeya = !hasExplicitTransitivityMarkers && SUPPLETIVE_WEYA_FORMS.has(matrixStem);
    return {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed,
        transitivity,
        valenceTokens,
        valenceEmbeds,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass,
        isYawi,
        isWeya,
    };
}

// Builds a CanonicalVerbSpec from the output of buildComposerSemanticState().
function buildCanonicalVerbSpecFromComposerSemantic(semantic = {}) {
    if (!semantic || typeof semantic !== "object") {
        return null;
    }
    const transitivity = semantic.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    // matrixStem — the active slot's verb root
    const matrixStem = normalizeRuleBase(
        String(semantic.matrix?.stem || semantic.matrix?.regexStem || "").trim().toLowerCase()
    );
    // adjacentEmbed — slash-adjacent embed prefix inside the core slot
    const adjacentEmbed = normalizeRuleBase(
        String(semantic.matrix?.adjacentEmbed || "").trim().toLowerCase()
    );
    // valenceTokens — primary and secondary object markers per transitivity
    const valenceTokensRaw = [];
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        const tok = normalizeComposerSecondaryValenceSurfaceToken(semantic.valence?.intransitive?.token || "")
            || normalizeComposerValenceToken(semantic.valence?.intransitive?.token || "");
        if (tok) valenceTokensRaw.push(tok);
    } else {
        const tok = normalizeComposerSecondaryValenceSurfaceToken(semantic.valence?.primary?.token || "")
            || normalizeComposerValenceToken(semantic.valence?.primary?.token || "");
        if (tok) valenceTokensRaw.push(tok);
        if (transitivity === COMPOSER_TRANSITIVITY.bitransitive) {
            const tok2 = normalizeComposerSecondaryValenceSurfaceToken(semantic.valence?.secondary?.token || "")
                || normalizeComposerValenceToken(semantic.valence?.secondary?.token || "");
            if (tok2) valenceTokensRaw.push(tok2);
        }
    }
    const valenceTokens = valenceTokensRaw.filter(Boolean);
    // valenceEmbeds — lexical bound prefixes paired with the valence slots
    const valenceEmbedsRaw = [];
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        const emb = normalizeRuleBase(semantic.valence?.intransitive?.embed || "");
        if (emb) valenceEmbedsRaw.push(emb);
    } else {
        const emb = normalizeRuleBase(semantic.valence?.primary?.embed || "");
        if (emb) valenceEmbedsRaw.push(emb);
        if (transitivity === COMPOSER_TRANSITIVITY.bitransitive) {
            const emb2 = normalizeRuleBase(semantic.valence?.secondary?.embed || "");
            if (emb2) valenceEmbedsRaw.push(emb2);
        }
    }
    const valenceEmbeds = valenceEmbedsRaw.filter(Boolean);
    const directionalPrefix = normalizeComposerStem(semantic.directional?.prefix || "");
    const supportiveMarker = normalizeSupportiveMarkerValue(semantic.supportiveMarker || "");
    const surfaceCorePath = adjacentEmbed ? `${adjacentEmbed}-${matrixStem}` : matrixStem;
    const supportFreeCorePath = stripLeadingSupportiveLetterFromCoreSurface(
        surfaceCorePath,
        supportiveMarker
    );
    const ruleAdjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(supportFreeCorePath);
    const matrixRuleBase = normalizeRuleBase(
        ruleAdjacentCoreEmbed ? ruleAdjacentCoreEmbed.stem : supportFreeCorePath
    );
    const tiCausativeClass = normalizeTiCausativeClass(semantic.ti?.causativeClass || "");
    // isYawi / isWeya — suppletive form detection (same logic as parsing path)
    const isSpecificToken = (token = "") => SPECIFIC_VALENCE_PREFIX_SET.has(token) || token === "k";
    const isNonspecificToken = (token = "") => NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
    const hasExplicitTransitivityMarkers = (transitivity !== COMPOSER_TRANSITIVITY.intransitive)
        || valenceTokens.some(isSpecificToken)
        || valenceTokens.some(isNonspecificToken);
    const yawiCanonical = getSuppletiveYawiCanonical();
    const yawiWithoutSupportive = yawiCanonical.startsWith("y") ? yawiCanonical.slice(1) : "";
    const matchesOptionalSupportiveYawi = supportiveMarker === "y"
        && Boolean(yawiWithoutSupportive)
        && matrixStem === yawiWithoutSupportive;
    const isYawi = !hasExplicitTransitivityMarkers
        && (matrixStem === yawiCanonical || matchesOptionalSupportiveYawi);
    const isWeya = !hasExplicitTransitivityMarkers && SUPPLETIVE_WEYA_FORMS.has(matrixStem);
    return {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed,
        transitivity,
        valenceTokens,
        valenceEmbeds,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass,
        isYawi,
        isWeya,
    };
}

function buildCompoundAstMetadata({
    sourceRawVerb = "",
    displayVerb = "",
    displayCore = "",
    verb = "",
    analysisVerb = "",
    matrixStem = "",
    matrixRuleBase = "",
    transitivity = "",
    outerValenceTokens = [],
    outerLexicalPrefixes = [],
    structuralOuterPieces = [],
    coreStructuralPrefixParts = [],
    embeddedPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    verbSegment = "",
    parts = [],
    hasCompoundMarker = false,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasBoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasSpecificValence = false,
    hasNonspecificValence = false,
    isMarkedTransitive = false,
    isTaFusion = false,
    valenceSlotCount = 0,
} = {}) {
    const normalizedOuterPieces = (Array.isArray(structuralOuterPieces) ? structuralOuterPieces : [])
        .map((piece, index) => ({
            type: String(piece?.type || ""),
            value: normalizeRuleBase(piece?.value || ""),
            index,
        }))
        .filter((piece) => piece.type && piece.value);
    const normalizedCorePieces = (Array.isArray(coreStructuralPrefixParts) ? coreStructuralPrefixParts : [])
        .map((piece, index) => ({
            type: String(piece?.type || ""),
            value: normalizeRuleBase(piece?.value || ""),
            index,
        }))
        .filter((piece) => piece.type && piece.value);
    const hasCompoundStructure = Boolean(
        hasCompoundMarker
        || normalizedCorePieces.some((piece) => piece.type === "adjacent-embed")
        || normalizedOuterPieces.some((piece) => piece.type === "lexical")
    );
    if (!hasCompoundStructure) {
        return null;
    }
    const embeds = [];
    normalizedOuterPieces.forEach((piece) => {
        if (piece.type === "directional") {
            return;
        }
        const isLexical = piece.type === "lexical";
        const role = isLexical
            ? "outer-lexical"
            : (hasImpersonalTaPrefix ? "impersonal-valence" : "outer-valence");
        embeds.push({
            role,
            kind: piece.type,
            value: piece.value,
            source: "outer",
            index: piece.index,
            explicit: !isLexical,
        });
    });
    normalizedCorePieces
        .filter((piece) => piece.type === "adjacent-embed")
        .forEach((piece) => {
            embeds.push({
                role: "adjacent-core-embed",
                kind: "lexical",
                value: piece.value,
                source: "core",
                index: piece.index,
                explicit: false,
            });
        });
    if (!embeds.length) {
        return null;
    }
    return {
        version: 1,
        kind: "compound",
        matrix: {
            role: "matrix",
            stem: normalizeRuleBase(matrixStem || sourceBase || ""),
            ruleBase: normalizeRuleBase(matrixRuleBase || sourceBase || matrixStem || ""),
        },
        embeds,
        source: {
            rawInput: String(sourceRawVerb || ""),
            displayVerb: String(displayVerb || ""),
            displayCore: String(displayCore || ""),
            verb: String(verb || ""),
            analysisVerb: String(analysisVerb || ""),
            embeddedPrefix: String(embeddedPrefix || ""),
            sourcePrefix: String(sourcePrefix || ""),
            sourceBase: String(sourceBase || ""),
            verbSegment: String(verbSegment || ""),
            parts: Array.isArray(parts) ? parts.filter(Boolean) : [],
        },
        valency: {
            transitivity: String(transitivity || ""),
            tokens: (Array.isArray(outerValenceTokens) ? outerValenceTokens : []).filter(Boolean),
            slotCount: Number.isFinite(valenceSlotCount) ? valenceSlotCount : 0,
            hasSpecific: hasSpecificValence === true,
            hasNonspecific: hasNonspecificValence === true,
            isMarkedTransitive: isMarkedTransitive === true,
            isTaFusion: isTaFusion === true,
        },
        flags: {
            hasCompoundMarker: hasCompoundMarker === true,
            hasSlashMarker: hasSlashMarker === true,
            hasSuffixSeparator: hasSuffixSeparator === true,
            hasBoundMarker: hasBoundMarker === true,
            hasImpersonalTaPrefix: hasImpersonalTaPrefix === true,
        },
        outerPieces: normalizedOuterPieces,
        corePieces: normalizedCorePieces,
        lexicalPrefixes: (Array.isArray(outerLexicalPrefixes) ? outerLexicalPrefixes : [])
            .map((value) => normalizeRuleBase(value))
            .filter(Boolean),
    };
}

function resolveOrdinaryNncParseFixture(value = "") {
    if (typeof resolveOrdinaryNncFixture !== "function") {
        return null;
    }
    return resolveOrdinaryNncFixture({ stem: value });
}

function buildOrdinaryNncParseClassification(role = "", value = "") {
    const normalizedValue = normalizeRuleBase(value);
    if (!normalizedValue) {
        return null;
    }
    const candidate = resolveOrdinaryNncParseFixture(normalizedValue);
    if (!candidate || !candidate.fixture) {
        return null;
    }
    return {
        kind: "ordinary-nnc-fixture-classification",
        outputKind: candidate.outputKind || candidate.clauseKind || "nominal-nuclear-clause",
        clauseKind: candidate.clauseKind || "nominal-nuclear-clause",
        role,
        value: normalizedValue,
        normalizedInput: candidate.normalizedInput || normalizedValue,
        fixture: {
            id: candidate.fixture.id || "",
            stem: candidate.fixture.stem || "",
            lemma: candidate.fixture.lemma || "",
            nounClass: candidate.fixture.nounClass || "",
            animacy: candidate.fixture.animacy || "",
            aliases: Array.isArray(candidate.fixture.aliases) ? [...candidate.fixture.aliases] : [],
            sourceRefs: Array.isArray(candidate.fixture.sourceRefs) ? [...candidate.fixture.sourceRefs] : [],
        },
    };
}

function buildOrdinaryNncFixtureClassifications({
    matrixStem = "",
    lexicalBoundPrefixes = [],
    compoundAst = null,
} = {}) {
    const candidates = [];
    const seen = new Set();
    const addCandidate = (role = "", value = "") => {
        const normalizedValue = normalizeRuleBase(value);
        const key = `${role}|${normalizedValue}`;
        if (!role || !normalizedValue || seen.has(key)) {
            return;
        }
        seen.add(key);
        candidates.push({ role, value: normalizedValue });
    };
    addCandidate("matrix", matrixStem);
    (Array.isArray(lexicalBoundPrefixes) ? lexicalBoundPrefixes : [])
        .forEach((value) => addCandidate("outer-lexical", value));
    (Array.isArray(compoundAst?.embeds) ? compoundAst.embeds : [])
        .filter((entry) => entry?.kind === "lexical" && entry?.role)
        .forEach((entry) => addCandidate(entry.role, entry.value));
    return candidates
        .map((candidate) => buildOrdinaryNncParseClassification(candidate.role, candidate.value))
        .filter(Boolean);
}

// Universal downstream builder: derives the full verbMeta from a CanonicalVerbSpec.
// rawValue and rawParsed are optional and used only for display/provenance fields.
function buildVerbMetaFromCanonicalSpec(spec, rawValue, rawParsed, tiInputMetadata) {
    if (!spec) return null;
    const {
        matrixStem,
        matrixRuleBase,
        adjacentEmbed: coreEmbeddedPrefix,
        transitivity,
        valenceTokens: outerValenceTokens,
        valenceEmbeds: outerLexicalPrefixes,
        directionalPrefix,
        supportiveMarker,
        tiCausativeClass,
        isYawi,
        isWeya,
    } = spec;
    const optionalSupportiveLetter = supportiveMarker;
    const hasOptionalSupportiveI = Boolean(optionalSupportiveLetter);
    const lexicalSourcePrefix = outerLexicalPrefixes.join("");
    const isIntransitiveOuterValenceCompound = (
        transitivity === COMPOSER_TRANSITIVITY.intransitive
        && outerValenceTokens.length > 0
        && !outerLexicalPrefixes.length
        && !coreEmbeddedPrefix
    );
    const isOuterLexicalBoundValence = (
        transitivity !== COMPOSER_TRANSITIVITY.intransitive
        && outerLexicalPrefixes.length > 0
        && outerValenceTokens.length > 0
        && !coreEmbeddedPrefix
    );
    const isOuterLexicalBoundValenceWithAdjacentEmbed = (
        transitivity !== COMPOSER_TRANSITIVITY.intransitive
        && outerLexicalPrefixes.length > 0
        && outerValenceTokens.length > 0
        && Boolean(coreEmbeddedPrefix)
    );
    const embeddedPrefix = isIntransitiveOuterValenceCompound
        ? outerValenceTokens.join("")
        : (
            isOuterLexicalBoundValenceWithAdjacentEmbed
                ? coreEmbeddedPrefix
                : `${lexicalSourcePrefix}${coreEmbeddedPrefix}`
        );
    const analysisCore = isIntransitiveOuterValenceCompound
        ? matrixStem
        : (
            isOuterLexicalBoundValence
                ? matrixStem
                : (
                    isOuterLexicalBoundValenceWithAdjacentEmbed
                        ? `${embeddedPrefix}${matrixStem}`
                        : `${outerValenceTokens.join("")}${embeddedPrefix}${matrixStem}`
                )
        );
    const verbCore = isIntransitiveOuterValenceCompound
        ? `${embeddedPrefix}${matrixStem}`
        : (
            transitivity !== COMPOSER_TRANSITIVITY.intransitive
            && outerLexicalPrefixes.length > 0
            && outerValenceTokens.length > 0
            && (!coreEmbeddedPrefix || isOuterLexicalBoundValenceWithAdjacentEmbed)
        )
            ? `${lexicalSourcePrefix}${outerValenceTokens.join("")}${coreEmbeddedPrefix}${matrixStem}`
            : `${analysisCore}`;
    const verb = `${directionalPrefix}${verbCore}`;
    const analysisVerb = analysisCore || verb;
    const rawAnalysisVerb = analysisVerb;
    const exactBaseVerb = normalizeRuleBase(matrixRuleBase || matrixStem);
    const hasLeadingDash = transitivity !== COMPOSER_TRANSITIVITY.intransitive;
    const dashCount = hasLeadingDash ? 1 : 0;
    const hasDoubleDash = false;
    const baseObjectSlots = transitivity === COMPOSER_TRANSITIVITY.bitransitive
        ? 2
        : (transitivity === COMPOSER_TRANSITIVITY.transitive ? 1 : 0);
    const isMarkedTransitive = baseObjectSlots > 0;
    const isSpecificToken = (token = "") => SPECIFIC_VALENCE_PREFIX_SET.has(token) || token === "k";
    const isNonspecificToken = (token = "") => NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
    const hasSpecificValence = outerValenceTokens.some((token) => isSpecificToken(token));
    const hasNonspecificValence = outerValenceTokens.some((token) => isNonspecificToken(token));
    const trailingValenceTokens = outerValenceTokens.slice(1);
    const hasNonactiveSpecificValence = trailingValenceTokens.some((token) => isSpecificToken(token));
    const hasNonactiveNonspecificValence = trailingValenceTokens.some((token) => isNonspecificToken(token));
    const hasConsecutiveSpecificValences = outerValenceTokens.length >= 2
        && outerValenceTokens.every((token) => isSpecificToken(token));
    const directionalRuleMode = computeDirectionalRuleModeCore({
        directionalPrefix,
        hasSpecificValence,
        hasNonspecificValence,
        derivationValencyDelta: 0,
        isNonactive: false,
        phase: "resolved",
    });
    const directObjectToken = "";
    const indirectObjectMarker = "";
    const structuralOuterPieces = [
        ...(directionalPrefix ? [{ type: "directional", value: directionalPrefix }] : []),
        ...outerLexicalPrefixes.map((value) => ({ type: "lexical", value })),
        ...outerValenceTokens.map((value) => ({ type: "valence", value })),
    ];
    const coreStructuralPrefixParts = [];
    if (optionalSupportiveLetter) {
        coreStructuralPrefixParts.push({ type: "supportive", value: optionalSupportiveLetter });
    }
    if (coreEmbeddedPrefix) {
        coreStructuralPrefixParts.push({ type: "adjacent-embed", value: coreEmbeddedPrefix });
    }
    const parts = embeddedPrefix ? [embeddedPrefix, matrixStem].filter(Boolean) : [matrixStem].filter(Boolean);
    const verbSegment = embeddedPrefix ? `${embeddedPrefix}-${matrixStem}` : matrixStem;
    const objectSegment = "";
    const hasCompoundMarker = Boolean(embeddedPrefix) || isIntransitiveOuterValenceCompound;
    const hasSuffixSeparator = Boolean(coreEmbeddedPrefix);
    const hasSlashMarker = Boolean(coreEmbeddedPrefix);
    const hasBoundMarker = isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed;
    const boundPrefixes = (isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed)
        ? [...outerLexicalPrefixes, ...outerValenceTokens]
        : [];
    const boundExplicitFlags = (isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed)
        ? [
            ...outerLexicalPrefixes.map(() => false),
            ...outerValenceTokens.map(() => true),
        ]
        : [];
    const fusionPrefixes = isIntransitiveOuterValenceCompound
        ? []
        : (
            (isOuterLexicalBoundValence || isOuterLexicalBoundValenceWithAdjacentEmbed)
                ? [...outerLexicalPrefixes, ...outerValenceTokens]
                : outerValenceTokens.slice()
        );
    const isTaFusion = fusionPrefixes.length > 0 && Boolean(analysisVerb);
    const finalYaAnalysis = analyzeFinalYaStructure(exactBaseVerb, {
        isTransitive: isMarkedTransitive,
        isYawi: false,
        isWeya: false,
    });
    const yawiImperfective = getSuppletiveYawiImperfective();
    const normalizedAnalysisVerb = isYawi ? yawiImperfective : analysisVerb;
    const normalizedVerb = isYawi
        ? `${directionalPrefix}${outerValenceTokens.join("")}${embeddedPrefix}${yawiImperfective}`
        : verb;
    const sourceRawVerb = String(rawValue || "");
    const displayVerb = tiInputMetadata?.displayVerb || (rawParsed ? rawParsed.regexValue : "") || "";
    const displayCore = tiInputMetadata?.displayCore || (rawParsed ? rawParsed.coreText : "") || "";
    const compoundAst = buildCompoundAstMetadata({
        sourceRawVerb,
        displayVerb,
        displayCore,
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        matrixStem,
        matrixRuleBase: exactBaseVerb,
        transitivity,
        outerValenceTokens,
        outerLexicalPrefixes,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        embeddedPrefix,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        verbSegment,
        parts,
        hasCompoundMarker,
        hasSlashMarker,
        hasSuffixSeparator,
        hasBoundMarker,
        hasImpersonalTaPrefix: isIntransitiveOuterValenceCompound,
        hasSpecificValence,
        hasNonspecificValence,
        isMarkedTransitive,
        isTaFusion,
        valenceSlotCount: baseObjectSlots,
    });
    const ordinaryNncFixtureClassifications = buildOrdinaryNncFixtureClassifications({
        matrixStem: exactBaseVerb,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        compoundAst,
    });
    const canonical = {
        parseLanguage: "current-regex",
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        rawAnalysisVerb,
        ruleBase: exactBaseVerb,
        fullRuleBase: exactBaseVerb,
        hasSlashMarker,
        hasLeadingDash,
        dashCount,
        objectSegment,
        verbSegment,
        objectToken: directObjectToken,
        directObjectToken,
        indirectObjectMarker,
        parts,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        embeddedPrefix,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        lexicalBoundPrefix: lexicalSourcePrefix,
        fusionPrefixes,
        directionalPrefix,
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: directionalRuleMode,
        directionalRuleMode,
        hasImpersonalTaPrefix: isIntransitiveOuterValenceCompound,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasSuffixSeparator,
        hasCompoundMarker,
        hasBoundMarker,
        hasSpecificValence,
        hasNonspecificValence,
        hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences,
        valenceSlotCount: baseObjectSlots,
        embeddedValenceCount: 0,
        totalValenceSlotCount: baseObjectSlots,
        hasFinalYaSuffix: finalYaAnalysis.hasFinalYaSuffix === true,
        finalYaHost: finalYaAnalysis.finalYaHost || "",
        finalYaHostKind: finalYaAnalysis.finalYaHostKind || "",
        bareRootPlusYaBase: finalYaAnalysis.bareRootPlusYaBase || "",
        bareRootPlusYaBasePronounceable: finalYaAnalysis.bareRootPlusYaBasePronounceable || "",
        rootPlusYaBase: finalYaAnalysis.isRootPlusYa ? (finalYaAnalysis.bareRootPlusYaBase || "") : "",
        rootPlusYaBasePronounceable: finalYaAnalysis.isRootPlusYa ? (finalYaAnalysis.bareRootPlusYaBasePronounceable || "") : "",
        isRootPlusYa: finalYaAnalysis.isRootPlusYa === true,
        isMarkedTransitive,
        isTaFusion,
        isYawi,
        isWeya,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        slashCompositeRuleBase: "",
        compoundAst,
        ordinaryNncFixtureClassifications,
    };
    const semanticObjectSlotCount = Number.isFinite(tiInputMetadata?.semanticObjectSlotCount)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, Number(tiInputMetadata.semanticObjectSlotCount) || 0))
        : baseObjectSlots;
    return {
        parseLanguage: "current-regex",
        sourceRawVerb,
        verb: normalizedVerb,
        analysisVerb: normalizedAnalysisVerb,
        rawAnalysisVerb,
        hasCompoundMarker,
        hasSlashMarker,
        hasSuffixSeparator,
        hasImpersonalTaPrefix: isIntransitiveOuterValenceCompound,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasBoundMarker,
        isMarkedTransitive,
        isTaFusion,
        isYawi,
        isWeya,
        hasFinalYaSuffix: canonical.hasFinalYaSuffix,
        finalYaHost: canonical.finalYaHost,
        finalYaHostKind: canonical.finalYaHostKind,
        bareRootPlusYaBase: canonical.bareRootPlusYaBase,
        bareRootPlusYaBasePronounceable: canonical.bareRootPlusYaBasePronounceable,
        rootPlusYaBase: canonical.rootPlusYaBase,
        rootPlusYaBasePronounceable: canonical.rootPlusYaBasePronounceable,
        isRootPlusYa: canonical.isRootPlusYa,
        directionalPrefix,
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: directionalRuleMode,
        directionalRuleMode,
        hasSpecificValence,
        hasNonspecificValence,
        hasNonactiveSpecificValence,
        hasNonactiveNonspecificValence,
        hasConsecutiveSpecificValences,
        directObjectToken,
        indirectObjectMarker,
        structuralOuterPieces,
        coreStructuralPrefixParts,
        displayVerb,
        displayCore,
        coreText: displayCore,
        dashPrefix: tiInputMetadata?.dashPrefix || (hasLeadingDash ? "-" : ""),
        hasExternalObjectDash: tiInputMetadata?.hasExternalObjectDash === true,
        semanticObjectSlotCount,
        exactBaseVerb,
        hasLeadingDash,
        dashCount,
        hasDoubleDash,
        valenceSlotCount: baseObjectSlots,
        embeddedValenceCount: 0,
        totalValenceSlotCount: baseObjectSlots,
        parts,
        embeddedPrefix,
        fusionPrefixes,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes: outerLexicalPrefixes,
        sourcePrefix: lexicalSourcePrefix,
        sourceBase: exactBaseVerb,
        objectSegment,
        verbSegment,
        objectToken: directObjectToken,
        canonical,
        compoundAst,
        ordinaryNncFixtureClassifications,
        canonicalRuleBase: canonical.ruleBase,
        canonicalFullRuleBase: canonical.fullRuleBase,
        tiCausativeClass,
    };
}

function buildParsedVerbFromMovingTargetInput(rawValue = "", movingTargetParsed = null, tiInputMetadata = null) {
    const spec = buildCanonicalVerbSpecFromMovingTargetParsed(rawValue, movingTargetParsed, tiInputMetadata);
    if (!spec) return null;
    return buildVerbMetaFromCanonicalSpec(spec, rawValue, movingTargetParsed, tiInputMetadata);
}

function isVerbValueAllowed(rawValue) {
    return (
        getInvalidVerbCharacters(rawValue).length === 0
        && getInvalidVerbLetters(rawValue).length === 0
        && !getInvalidVerbStructure(rawValue, { allowPartial: true })
    );
}

function getInputGateRightmostStem(rawValue, parsedVerb = null) {
    if (parsedVerb && typeof parsedVerb.exactBaseVerb === "string" && parsedVerb.exactBaseVerb) {
        return parsedVerb.exactBaseVerb;
    }
    const raw = (
        getRawInputTiCausativeMetadata(rawValue).normalizedInput
        || String(rawValue || "")
    ).toLowerCase();
    const cleaned = raw.replace(COMPOUND_ALLOWED_RE, "").replace(/\s+/g, "");
    const cleanedSupportive = hasOptionalSupportiveMarker(cleaned)
        ? replaceOptionalSupportiveMarkersWithLetters(cleaned)
        : cleaned;
    return getExactBaseVerbFromCleaned(cleanedSupportive);
}

function startsWithConsonantCluster(stem) {
    const letters = splitVerbLetters(stem);
    return letters.length >= 2
        && isVerbLetterConsonant(letters[0])
        && isVerbLetterConsonant(letters[1]);
}

function evaluateVerbStemInputGate(rawValue, parsedVerb = null) {
    const stem = getInputGateRightmostStem(rawValue, parsedVerb);
    if (!stem) {
        return {
            stem: "",
            gateStem: "",
            basePronounceable: false,
            supportiveCandidate: "",
            supportivePronounceable: false,
            isValid: false,
        };
    }
    // Keep reduplicated inputs aligned with their base stem gate behavior.
    const gateStem = getNonReduplicatedRoot(stem) || stem;
    const basePronounceable = isSyllableSequencePronounceable(gateStem);
    const letters = splitVerbLetters(gateStem);
    const startsWithConsonant = letters.length > 0 && isVerbLetterConsonant(letters[0]);
    const startsWithVowel = letters.length > 0 && isVerbLetterVowel(letters[0]);
    const hasOptionalSupportiveMarkerFlag = hasOptionalSupportiveMarker(rawValue)
        || Boolean(parsedVerb?.hasOptionalSupportiveI);
    const hasInitialCluster = startsWithConsonantCluster(gateStem);
    const requiresExplicitSupportiveI = hasInitialCluster && !hasOptionalSupportiveMarkerFlag;
    const supportiveCandidate = startsWithConsonant && !startsWithVowel ? `i${gateStem}` : "";
    const supportivePronounceable = supportiveCandidate
        ? isSyllableSequencePronounceable(supportiveCandidate)
        : false;
    const canUseBaseAsTyped = basePronounceable && !requiresExplicitSupportiveI;
    const canUseSupportiveFallback = supportivePronounceable && !requiresExplicitSupportiveI;
    return {
        stem,
        gateStem,
        basePronounceable: canUseBaseAsTyped,
        supportiveCandidate,
        supportivePronounceable: canUseSupportiveFallback,
        isValid: canUseBaseAsTyped || canUseSupportiveFallback,
    };
}

function getAuthoritativeDerivationalSourceForRawInputGate({
    tense = "",
    patientivoSource = "",
} = {}) {
    if (tense === "patientivo" && isStrictPatientivoDerivationSource(patientivoSource)) {
        return patientivoSource;
    }
    if (!isPatientivoAdjectiveTense(tense)) {
        return "";
    }
    const adjectiveSource = getPatientivoAdjectiveSourceForTense(tense);
    return isStrictPatientivoDerivationSource(adjectiveSource)
        ? adjectiveSource
        : "";
}


// === Verb Parsing ===
const DEFAULT_NONSPECIFIC_VALENCE_AFFIXES = Object.freeze([
    "ta",
    "te",
    "mu",
    "tajta",
    "tejte",
    "t",
    "mujmu",
    "m",
]);
const DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET = new Set(DEFAULT_NONSPECIFIC_VALENCE_AFFIXES);
const EXPLICIT_VALENCE_SHORTHAND_MAP = Object.freeze({
    m: "m",
    mu: "mu",
});

function getNonspecificValenceAffixSetForMatching() {
    return NONSPECIFIC_VALENCE_AFFIX_SET.size
        ? NONSPECIFIC_VALENCE_AFFIX_SET
        : DEFAULT_NONSPECIFIC_VALENCE_AFFIX_SET;
}

function normalizeExplicitValenceToken(value = "") {
    const normalized = String(value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
    if (!normalized) {
        return "";
    }
    const mapped = EXPLICIT_VALENCE_SHORTHAND_MAP[normalized] || normalized;
    return isNonspecificValenceAffixToken(mapped, { explicit: true }) ? mapped : "";
}

function isNonspecificValenceAffixToken(value = "", options = {}) {
    const token = String(value || "").trim().toLowerCase().replace(/[^a-z]/g, "");
    if (!token) {
        return false;
    }
    if (getNonspecificValenceAffixSetForMatching().has(token)) {
        return true;
    }
    // "(m)" remains an explicit shorthand for nonspecific "mu".
    if (options.explicit === true && token === "m") {
        return true;
    }
    return false;
}

function getExplicitValenceTokenFromSegment(segment = "") {
    const normalized = String(segment || "").trim().toLowerCase();
    const match = normalized.match(/^\(([^)]+)\)(?=[/-]|$)/);
    if (!match) {
        return "";
    }
    return normalizeExplicitValenceToken(match[1] || "");
}

function splitCompoundPartsWithExplicitFlags(segment = "") {
    const rawParts = String(segment || "")
        .split(/[|~#\\/?-]/)
        .map((part) => String(part || "").trim())
        .filter(Boolean);
    const parts = [];
    const explicitFlags = [];
    rawParts.forEach((rawPart) => {
        const explicitToken = getExplicitValenceTokenFromSegment(rawPart);
        const normalizedPart = explicitToken || rawPart.replace(/[()]/g, "");
        if (!normalizedPart) {
            return;
        }
        parts.push(normalizedPart);
        explicitFlags.push(Boolean(explicitToken));
    });
    return { parts, explicitFlags };
}

function isFusionPrefixTokenForParsing(token = "", explicitFlag = false) {
    if (FUSION_PREFIXES.has(token)) {
        return !isNonspecificValenceAffixToken(token) || explicitFlag === true;
    }
    return explicitFlag === true && token === "m";
}

function isObjectMarkerTokenForParsing(token = "", explicitFlag = false) {
    if (OBJECT_MARKERS.has(token)) {
        return !isNonspecificValenceAffixToken(token) || explicitFlag === true;
    }
    return explicitFlag === true && token === "m";
}

function getValenceSlotsFromCleaned(cleaned) {
    const slots = [];
    let token = "";
    for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "-") {
            slots.push(token);
            token = "";
            continue;
        }
        token += char;
    }
    return slots;
}

function getExactBaseVerbFromCleaned(cleaned) {
    if (!cleaned) {
        return "";
    }
    const segments = cleaned.split(/[-/]/).filter(Boolean);
    if (!segments.length) {
        return "";
    }
    const lastSegment = segments[segments.length - 1];
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
    return lastSegment.replace(markerRe, "");
}

function stripLeadingSupportiveLetterFromCoreSurface(coreSurface = "", supportiveMarker = "") {
    const normalizedCoreSurface = String(coreSurface || "").trim().toLowerCase();
    const normalizedSupportiveMarker = normalizeSupportiveMarkerValue(supportiveMarker);
    if (!normalizedCoreSurface || !normalizedSupportiveMarker) {
        return normalizedCoreSurface;
    }
    if (!normalizedCoreSurface.startsWith(normalizedSupportiveMarker)) {
        return normalizedCoreSurface;
    }
    return normalizedCoreSurface.slice(normalizedSupportiveMarker.length);
}

const SLASH_MATRIX_FUSED_RULEBASES = new Set(["ti"]);
const SLASH_MATRIX_FUSED_SUFFIXES = Object.freeze([
    "awi",
    "iwi",
    "uwi",
    "ewi",
    "awa",
    "iwa",
    "uwa",
    "ewa",
    "wi",
    "wa",
]);

function shouldFuseSlashMatrixRuleBase(matrixBase = "") {
    if (!matrixBase) {
        return false;
    }
    if (SLASH_MATRIX_FUSED_RULEBASES.has(matrixBase)) {
        return true;
    }
    return SLASH_MATRIX_FUSED_SUFFIXES.some((suffix) => matrixBase.endsWith(suffix));
}

function getLexicalBoundPrefixes(boundPrefixes = [], boundExplicitFlags = []) {
    const explicitFlags = Array.isArray(boundExplicitFlags) ? boundExplicitFlags : [];
    return (Array.isArray(boundPrefixes) ? boundPrefixes : [])
        .map((prefix) => getBracketDirectionalPrefixToken(String(prefix || "")) || String(prefix || ""))
        .map((prefix) => normalizeRuleBase(prefix))
        .filter((prefix, index) => {
            if (!prefix) {
                return false;
            }
            if (isDirectionalPrefixToken(prefix)) {
                return false;
            }
            if (SPECIFIC_VALENCE_PREFIX_SET.has(prefix) || prefix === "k") {
                return false;
            }
            const explicitFlag = explicitFlags[index] === true;
            if (explicitFlag && isNonspecificValenceAffixToken(prefix, { explicit: true })) {
                return false;
            }
            return true;
        });
}

function getExplicitBoundNonspecificPrefixes(boundPrefixes = [], boundExplicitFlags = []) {
    const explicitFlags = Array.isArray(boundExplicitFlags) ? boundExplicitFlags : [];
    return (Array.isArray(boundPrefixes) ? boundPrefixes : [])
        .map((prefix) => getBracketDirectionalPrefixToken(String(prefix || "")) || String(prefix || ""))
        .map((prefix) => normalizeRuleBase(prefix))
        .filter((prefix, index) => {
            if (!prefix) {
                return false;
            }
            if (isDirectionalPrefixToken(prefix)) {
                return false;
            }
            return explicitFlags[index] === true
                && isNonspecificValenceAffixToken(prefix, { explicit: true });
        });
}

function getSlashMatrixCompositeRuleBase({
    hasSlashMarker = false,
    hasBoundMarker = false,
    hasImpersonalTaPrefix = false,
    boundPrefixes = [],
    boundExplicitFlags = [],
    analysisVerb = "",
    sourceVerb = "",
} = {}) {
    if (!hasSlashMarker || !hasBoundMarker || hasImpersonalTaPrefix) {
        return "";
    }
    const matrixBase = normalizeRuleBase(analysisVerb || sourceVerb || "");
    if (!shouldFuseSlashMatrixRuleBase(matrixBase)) {
        return "";
    }
    const lexicalBoundPrefixes = getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags);
    if (!lexicalBoundPrefixes.length) {
        return "";
    }
    return `${lexicalBoundPrefixes.join("")}${matrixBase}`;
}

function resolveCanonicalSourceSplit(verbMeta = {}, { verb = "", analysisVerb = "" } = {}) {
    const meta = verbMeta || {};
    const sourceVerb = String(verb || meta.verb || "");
    const sourceAnalysis = String(analysisVerb || meta.analysisVerb || sourceVerb);
    const parseLanguage = String(
        meta.parseLanguage
        || meta.inputLanguage
        || meta.canonical?.parseLanguage
        || meta.canonical?.inputLanguage
        || ""
    );
    if (parseLanguage === "current-regex") {
        const lexicalBoundPrefixes = Array.isArray(meta.lexicalBoundPrefixes)
            ? meta.lexicalBoundPrefixes.filter(Boolean)
            : (
                Array.isArray(meta.canonical?.lexicalBoundPrefixes)
                    ? meta.canonical.lexicalBoundPrefixes.filter(Boolean)
                    : []
            );
        const lexicalBoundPrefix = lexicalBoundPrefixes.join("");
        const sourcePrefix = String(
            meta.sourcePrefix
            || meta.canonical?.sourcePrefix
            || lexicalBoundPrefix
            || ""
        );
        const sourceBase = normalizeRuleBase(
            meta.sourceBase
            || meta.canonical?.sourceBase
            || meta.exactBaseVerb
            || meta.canonicalRuleBase
            || meta.canonical?.ruleBase
            || sourceAnalysis
            || sourceVerb
            || ""
        );
        return {
            sourceVerb,
            sourceAnalysis,
            hasSlashMarker: false,
            hasBoundMarker: meta.hasBoundMarker === true
                || (Array.isArray(meta.boundPrefixes) && meta.boundPrefixes.length > 0),
            hasImpersonalTaPrefix: meta.hasImpersonalTaPrefix === true,
            directionalPrefix: String(meta.directionalPrefix || meta.canonical?.directionalPrefix || ""),
            directionalPrefixFromSlash: "",
            boundPrefixes: Array.isArray(meta.boundPrefixes) ? meta.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(meta.boundExplicitFlags) ? meta.boundExplicitFlags : [],
            lexicalBoundPrefixes,
            lexicalBoundPrefix,
            sourcePrefix,
            matrixBase: sourceBase,
            slashCompositeBase: "",
            sourceBase,
        };
    }
    const hasSlashMarker = meta.hasSlashMarker === true;
    const hasBoundMarker = meta.hasBoundMarker === true
        || (Array.isArray(meta.boundPrefixes) && meta.boundPrefixes.length > 0);
    const hasImpersonalTaPrefix = meta.hasImpersonalTaPrefix === true;
    const boundPrefixes = Array.isArray(meta.boundPrefixes) ? meta.boundPrefixes : [];
    const boundExplicitFlags = Array.isArray(meta.boundExplicitFlags) ? meta.boundExplicitFlags : [];
    const directionalPrefix = String(meta.directionalPrefix || "");
    const directionalPrefixFromSlash = String(
        meta.directionalPrefixFromSlash
        || (meta.canonical && meta.canonical.directionalPrefixFromSlash)
        || ""
    );
    const lexicalBoundPrefixes = getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags);
    const lexicalBoundPrefix = lexicalBoundPrefixes.join("");
    const fusionPrefixes = Array.isArray(meta.fusionPrefixes) ? meta.fusionPrefixes : [];
    const grammaticalPrefixes = fusionPrefixes.filter(Boolean);
    if (meta.indirectObjectMarker && !grammaticalPrefixes.includes(meta.indirectObjectMarker)) {
        grammaticalPrefixes.push(meta.indirectObjectMarker);
    }
    if (meta.directObjectToken && !grammaticalPrefixes.includes(meta.directObjectToken)) {
        grammaticalPrefixes.push(meta.directObjectToken);
    }
    const includeDirectionalFromSlash = Boolean(
        directionalPrefix
        && directionalPrefixFromSlash
        && directionalPrefixFromSlash === directionalPrefix
    );
    const sourcePrefixParts = includeDirectionalFromSlash
        ? [directionalPrefix, ...lexicalBoundPrefixes]
        : lexicalBoundPrefixes;
    const sourcePrefix = sourcePrefixParts.join("");
    const matrixBase = normalizeRuleBase(sourceAnalysis || sourceVerb || "");
    const slashCompositeBase = getSlashMatrixCompositeRuleBase({
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
        boundPrefixes,
        boundExplicitFlags,
        analysisVerb: sourceAnalysis || sourceVerb || "",
        sourceVerb: sourceVerb || sourceAnalysis || "",
    });
    return {
        sourceVerb,
        sourceAnalysis,
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
        directionalPrefix,
        directionalPrefixFromSlash,
        boundPrefixes,
        boundExplicitFlags,
        lexicalBoundPrefixes,
        lexicalBoundPrefix,
        sourcePrefix,
        matrixBase,
        slashCompositeBase,
        sourceBase: slashCompositeBase || stripLeadingPrefixes(matrixBase, grammaticalPrefixes),
    };
}

function getEmbeddedVerbPrefixFromParts(parts = []) {
    const list = Array.isArray(parts) ? parts : [];
    if (list.length <= 1) {
        return "";
    }
    const prefixParts = list.slice(0, -1).filter((part) => (
        part && !isDirectionalPrefixToken(part)
    ));
    return prefixParts.length ? prefixParts.join("") : "";
}

function getValenceCategoryFromToken(token) {
    if (!token) {
        return "specific";
    }
    const explicitValenceToken = getExplicitValenceTokenFromSegment(token);
    if (explicitValenceToken && isNonspecificValenceAffixToken(explicitValenceToken, { explicit: true })) {
        return "nonspecific";
    }
    const parts = token.split(COMPOUND_MARKER_SPLIT_RE).filter(Boolean);
    const suffix = parts.length ? parts[parts.length - 1] : "";
    if (!suffix) {
        return "specific";
    }
    if (isNonspecificValenceAffixToken(suffix)) {
        return "embedded";
    }
    if (SPECIFIC_VALENCE_PREFIX_SET.has(suffix) || suffix === "k") {
        return "specific";
    }
    return "embedded";
}

function hasConsecutiveSpecificValences(valenceSlots) {
    let prevCategory = "";
    for (let i = 0; i < valenceSlots.length; i += 1) {
        const category = getValenceCategoryFromToken(valenceSlots[i]);
        if (category === "embedded") {
            continue;
        }
        if (prevCategory === "specific" && category === "specific") {
            return true;
        }
        prevCategory = category;
    }
    return false;
}

function computeDirectionalRuleModeCore({
    directionalPrefix = "",
    hasSpecificValence = false,
    hasNonspecificValence = false,
    derivationValencyDelta = 0,
    isNonactive = false,
    phase = "resolved",
}) {
    if (!directionalPrefix || !isDirectionalPrefixToken(directionalPrefix)) {
        return "";
    }
    if (hasSpecificValence) {
        return "transitive";
    }
    if (phase === "resolved" && !isNonactive && derivationValencyDelta > 0) {
        return "transitive";
    }
    if (hasNonspecificValence) {
        return "nonspecific";
    }
    return "intransitive";
}

function resolveDirectionalRuleMode(parsedVerb, options = {}) {
    if (!parsedVerb) {
        return "";
    }
    const directionalPrefix = parsedVerb.directionalPrefix || "";
    const isNonactive = options.isNonactive === true;
    const derivationType = Object.values(DERIVATION_TYPE).includes(options.derivationType)
        ? options.derivationType
        : (parsedVerb.derivationType || "");
    const derivationDelta = Number.isFinite(parsedVerb.derivationValencyDelta)
        ? parsedVerb.derivationValencyDelta
        : getDerivationValencyDelta(derivationType);
    const hasSpecificValence = isNonactive
        ? parsedVerb.hasNonactiveSpecificValence
        : parsedVerb.hasSpecificValence;
    const hasNonspecificValence = isNonactive
        ? parsedVerb.hasNonactiveNonspecificValence
        : parsedVerb.hasNonspecificValence;
    const resolvedMode = computeDirectionalRuleModeCore({
        directionalPrefix,
        hasSpecificValence,
        hasNonspecificValence,
        derivationValencyDelta: derivationDelta,
        isNonactive,
        phase: "resolved",
    });
    parsedVerb.directionalRuleModeResolved = resolvedMode;
    parsedVerb.directionalRuleMode = resolvedMode;
    return resolvedMode;
}

function getDirectionalRulesForPrefix(prefix, stage) {
    if (!prefix) {
        return [];
    }
    const rules = DIRECTIONAL_RULES.length ? DIRECTIONAL_RULES : DEFAULT_DIRECTIONAL_RULES;
    return rules.filter((rule) => {
        if (!rule || rule.enabled === false) {
            return false;
        }
        if (!Array.isArray(rule.prefixes) || !rule.prefixes.includes(prefix)) {
            return false;
        }
        if (!stage) {
            return true;
        }
        return Array.isArray(rule.stages) && rule.stages.includes(stage);
    });
}

function applyDirectionalRules(context, stage) {
    let next = { ...context };
    const rules = getDirectionalRulesForPrefix(next.directionalInputPrefix, stage);
    rules.forEach((rule) => {
        if (next.isNounTense && rule.applyToNouns === false) {
            return;
        }
        if (!next.isNounTense && rule.applyToVerbs === false) {
            return;
        }
        const handler = DIRECTIONAL_RULE_HANDLERS.get(rule.handler);
        if (handler) {
            const updated = handler(next, rule, stage);
            if (updated) {
                next = updated;
            }
        }
    });
    return next;
}

function applyWalDirectionalRule(context, rule, stage) {
    let {
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix,
        directionalInputPrefix,
        baseSubjectPrefix,
        baseSubjectSuffix,
        baseObjectPrefix,
        isIntransitiveVerb,
        hasSubjectValent,
        isTaFusion,
        indirectObjectMarker,
        forceTransitiveDirectional,
        forceIntransitiveDirectional,
        forceNonspecificDirectional,
        directionalRuleMode,
        tense,
        isYawi,
        thirdObjectMarker,
        isNounTense,
    } = context;
    if (stage === "prefix") {
        directionalPlan = buildWalDirectionalPlan({
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            directionalRuleMode,
            hasSubjectValent,
            isTaFusion,
            isIntransitiveVerb,
        });
        directionalOutputPrefix = directionalPlan.directionalOutputPrefix;
    }
    if (stage === "post-elision" && !isNounTense && verb.startsWith(directionalInputPrefix)) {
        let stem = verb.slice(directionalInputPrefix.length);
        if (directionalInputPrefix === "wal" && isYawi && stem.startsWith("ya")) {
            stem = stem.slice(1);
        }
        verb = stem;
    }
    return {
        ...context,
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix,
    };
}

function applyWalNounPlacement(context) {
    if (!context.isNounTense) {
        return context;
    }
    if (context.directionalInputPrefix !== "wal") {
        return context;
    }
    const nounObjectPrefixes = new Set(["ta", "te", "mu"]);
    if (!nounObjectPrefixes.has(context.objectPrefix)) {
        return context;
    }
    const verb = context.verb || "";
    if (!verb.startsWith("wal")) {
        return context;
    }
    const stem = verb.slice(3);
    if (!stem) {
        return context;
    }
    return {
        ...context,
        objectPrefix: `wal${context.objectPrefix}`,
        verb: stem,
    };
}

const DIRECTIONAL_RULE_HANDLERS = new Map([
    ["wal-alternation", applyWalDirectionalRule],
    ["wal-noun-placement", applyWalNounPlacement],
]);

function getCurrentRegexShorthandParseInput(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw || raw.includes("?")) {
        return "";
    }
    const protectedSupportives = raw.replace(/\[[iy]\]/gi, "__supportive__");
    if (/[()[\]+]/.test(protectedSupportives)) {
        return "";
    }
    if (protectedSupportives.includes("/")) {
        return "";
    }
    const hasLeadingDash = raw.startsWith("-");
    const bare = hasLeadingDash ? raw.slice(1).trim() : raw;
    if (!bare || bare.startsWith("-")) {
        return "";
    }
    const normalizedBare = normalizeRegexSpecialSerialShorthandCore(bare);
    return hasLeadingDash ? `-(${normalizedBare})` : `(${normalizedBare})`;
}

function buildEmptyParsedVerb(rawValue = "", tiInputMetadata = null) {
    const displayVerb = String(tiInputMetadata?.displayVerb || rawValue || "");
    const displayCore = String(tiInputMetadata?.displayCore || "");
    const sourceRawVerb = String(rawValue || "");
    const tiCausativeClass = String(tiInputMetadata?.tiCausativeClass || "");
    const dashPrefix = String(tiInputMetadata?.dashPrefix || "");
    const semanticObjectSlotCount = Number.isFinite(tiInputMetadata?.semanticObjectSlotCount)
        ? Math.max(0, Math.min(MAX_OBJECT_SLOTS, Number(tiInputMetadata.semanticObjectSlotCount) || 0))
        : 0;
    const canonical = {
        parseLanguage: "current-regex",
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        ruleBase: "",
        fullRuleBase: "",
        hasSlashMarker: false,
        hasLeadingDash: dashPrefix === "-",
        dashCount: dashPrefix === "-" ? 1 : 0,
        objectSegment: "",
        verbSegment: "",
        objectToken: "",
        directObjectToken: "",
        indirectObjectMarker: "",
        parts: [],
        embeddedPrefix: "",
        boundPrefixes: [],
        boundExplicitFlags: [],
        lexicalBoundPrefixes: [],
        lexicalBoundPrefix: "",
        fusionPrefixes: [],
        directionalPrefix: "",
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasImpersonalTaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        hasSuffixSeparator: false,
        hasCompoundMarker: false,
        hasBoundMarker: false,
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        valenceSlotCount: semanticObjectSlotCount,
        embeddedValenceCount: 0,
        totalValenceSlotCount: semanticObjectSlotCount,
        hasFinalYaSuffix: false,
        finalYaHost: "",
        finalYaHostKind: "",
        bareRootPlusYaBase: "",
        bareRootPlusYaBasePronounceable: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        isMarkedTransitive: semanticObjectSlotCount > 0,
        isTaFusion: false,
        isYawi: false,
        isWeya: false,
        sourcePrefix: "",
        sourceBase: "",
        slashCompositeRuleBase: "",
        compoundAst: null,
        ordinaryNncFixtureClassifications: [],
    };
    return {
        parseLanguage: "current-regex",
        sourceRawVerb,
        verb: "",
        analysisVerb: "",
        rawAnalysisVerb: "",
        hasCompoundMarker: false,
        hasSlashMarker: false,
        hasSuffixSeparator: false,
        hasImpersonalTaPrefix: false,
        hasOptionalSupportiveI: false,
        optionalSupportiveLetter: "",
        hasBoundMarker: false,
        isMarkedTransitive: semanticObjectSlotCount > 0,
        isTaFusion: false,
        isYawi: false,
        isWeya: false,
        hasFinalYaSuffix: false,
        finalYaHost: "",
        finalYaHostKind: "",
        bareRootPlusYaBase: "",
        bareRootPlusYaBasePronounceable: "",
        rootPlusYaBase: "",
        rootPlusYaBasePronounceable: "",
        isRootPlusYa: false,
        directionalPrefix: "",
        directionalPrefixFromSlash: "",
        directionalRuleModeProvisional: "",
        directionalRuleMode: "",
        hasSpecificValence: false,
        hasNonspecificValence: false,
        hasNonactiveSpecificValence: false,
        hasNonactiveNonspecificValence: false,
        hasConsecutiveSpecificValences: false,
        directObjectToken: "",
        indirectObjectMarker: "",
        displayVerb,
        displayCore,
        coreText: displayCore,
        dashPrefix,
        hasExternalObjectDash: tiInputMetadata?.hasExternalObjectDash === true,
        semanticObjectSlotCount,
        exactBaseVerb: "",
        hasLeadingDash: dashPrefix === "-",
        dashCount: dashPrefix === "-" ? 1 : 0,
        hasDoubleDash: false,
        valenceSlotCount: semanticObjectSlotCount,
        embeddedValenceCount: 0,
        totalValenceSlotCount: semanticObjectSlotCount,
        parts: [],
        embeddedPrefix: "",
        fusionPrefixes: [],
        boundPrefixes: [],
        boundExplicitFlags: [],
        lexicalBoundPrefixes: [],
        sourcePrefix: "",
        sourceBase: "",
        objectSegment: "",
        verbSegment: "",
        objectToken: "",
        canonical,
        compoundAst: null,
        ordinaryNncFixtureClassifications: [],
        canonicalRuleBase: "",
        canonicalFullRuleBase: "",
        tiCausativeClass,
    };
}

function parseVerbInput(value) {
    const sourceRawVerb = String(value || "");
    const tiInputMetadata = getRawInputTiCausativeMetadata(sourceRawVerb);
    const movingTargetParsed = parseMovingTargetRegexInput(sourceRawVerb);
    if (movingTargetParsed.isValid) {
        const directParsed = buildParsedVerbFromMovingTargetInput(
            sourceRawVerb,
            movingTargetParsed,
            tiInputMetadata
        );
        if (directParsed) {
            return directParsed;
        }
    }
    const shorthandInput = getCurrentRegexShorthandParseInput(sourceRawVerb);
    if (shorthandInput) {
        const shorthandParsed = parseMovingTargetRegexInput(shorthandInput);
        if (shorthandParsed.isValid) {
            const shorthandMetadata = {
                ...tiInputMetadata,
                normalizedBase: shorthandParsed.regexValue,
                normalizedInput: shorthandParsed.regexValue,
                displayVerb: tiInputMetadata.displayVerb || sourceRawVerb,
                displayCore: tiInputMetadata.displayCore || shorthandParsed.coreText || "",
                dashPrefix: tiInputMetadata.dashPrefix || (shorthandParsed.transitivity === COMPOSER_TRANSITIVITY.intransitive ? "" : "-"),
                hasExternalObjectDash: tiInputMetadata.hasExternalObjectDash === true
                    || shorthandParsed.transitivity !== COMPOSER_TRANSITIVITY.intransitive,
                semanticObjectSlotCount: Number.isFinite(tiInputMetadata.semanticObjectSlotCount)
                    ? tiInputMetadata.semanticObjectSlotCount
                    : (shorthandParsed.transitivity === COMPOSER_TRANSITIVITY.bitransitive
                        ? 2
                        : (shorthandParsed.transitivity === COMPOSER_TRANSITIVITY.transitive ? 1 : 0)),
            };
            const directParsed = buildParsedVerbFromMovingTargetInput(
                sourceRawVerb,
                shorthandParsed,
                shorthandMetadata
            );
            if (directParsed) {
                return directParsed;
            }
        }
    }
    return buildEmptyParsedVerb(sourceRawVerb, tiInputMetadata);
}

function getParsedSyllableAnalysisTarget(rawVerb, options = {}) {
    const parsed = parseVerbInput(rawVerb);
    const target = options.analysis ? parsed.analysisVerb : parsed.verb;
    return applySyllableAnalysisTargetOptions(target, options);
}

// === Suppletive Stem Paths ===

function startsWithKSeries(raw) {
    const letters = splitVerbLetters(String(raw || ""));
    const first = letters[0] || "";
    return first === "k" || first === "kw";
}

function getDisambiguationPrefixCandidates(core) {
    const candidates = new Set();
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    DIRECTIONAL_PREFIXES.forEach((prefix) => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
            candidates.add(prefix);
        }
    });
    NONSPECIFIC_VALENCE_PREFIXES.forEach((prefix) => {
        if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
            candidates.add(prefix);
        }
    });
    return Array.from(candidates).sort((a, b) => b.length - a.length);
}

function getDisambiguationAffixCandidates(core) {
    const candidates = new Set();
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    NONSPECIFIC_VALENCE_AFFIXES.forEach((affix) => {
        if (normalized.startsWith(affix) && normalized.length > affix.length) {
            candidates.add(affix);
        }
    });
    return Array.from(candidates).sort((a, b) => b.length - a.length);
}

function getDisambiguationSuffixCandidates(core) {
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    const suffixes = ["kwi", "kwa"];
    const candidates = [];
    suffixes.forEach((suffix) => {
        if (!normalized.endsWith(suffix)) {
            return;
        }
        const prefix = normalized.slice(0, -suffix.length);
        if (prefix.length < 2) {
            return;
        }
        candidates.push({ prefix, suffix });
    });
    return candidates;
}

function getDisambiguationKnownSuffixCandidates(core, options = {}) {
    const normalized = String(core || "");
    const baseInfo = VerbDisambiguationBaseInfo;
    if (!normalized || !baseInfo.size) {
        return [];
    }
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
    if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
            return [];
        }
    }
    const syllables = splitVerbSyllables(normalized);
    if (syllables.length < 2) {
        return [];
    }
    const candidates = [];
    const seen = new Set();
    const isValidSuffixStart = (index) => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
    };
    const addCandidate = (prefix, suffix) => {
        const allowShortPrefix = prefix.length === 1 && VOWELS.includes(prefix);
        if ((!allowShortPrefix && prefix.length < 2) || suffix.length < 2) {
            return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        candidates.push({ prefix, suffix });
    };
    const wantsTransitive = options.isTransitive === true;
    const wantsIntransitive = options.isTransitive === false;
    for (let i = 1; i <= syllables.length - 1; i += 1) {
        if (!isValidSuffixStart(i)) {
            continue;
        }
        const prefix = syllables.slice(0, i).map((syllable) => syllable.text).join("");
        const suffix = syllables.slice(i).map((syllable) => syllable.text).join("");
        const info = baseInfo.get(suffix.toLowerCase());
        if (!info) {
            continue;
        }
        if (wantsTransitive && !info.transitive) {
            continue;
        }
        if (wantsIntransitive && !info.intransitive) {
            continue;
        }
        if (info) {
            const displaySuffix = info.displayBase || suffix;
            addCandidate(prefix, displaySuffix);
            break;
        }
    }
    return candidates;
}

function getDisambiguationLongSplitCandidates(core) {
    const normalized = String(core || "");
    if (!normalized) {
        return [];
    }
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
    if (markerRe) {
        markerRe.lastIndex = 0;
        if (markerRe.test(normalized)) {
            return [];
        }
    }
    const syllables = splitVerbSyllables(normalized);
    const letterCount = getVerbLetterCount(normalized);
    const isLong = syllables.length >= VERB_DISAMBIGUATION_LONG_SYLLABLES
        || letterCount >= VERB_DISAMBIGUATION_LONG_LETTERS;
    if (!isLong || syllables.length < 3) {
        return [];
    }
    const candidates = [];
    const seen = new Set();
    const isValidSuffixStart = (index) => {
        const syllable = syllables[index];
        return !!(syllable && syllable.nucleus);
    };
    const addCandidate = (prefix, suffix) => {
        if (prefix.length < 2 || suffix.length < 2) {
            return;
        }
        const key = `${prefix}/${suffix}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);
        candidates.push({ prefix, suffix });
    };
    const positions = [];
    if (syllables.length >= 4) {
        for (let i = 2; i <= syllables.length - 2; i += 1) {
            positions.push(i);
        }
        const midpoint = syllables.length / 2;
        positions.sort((a, b) => Math.abs(a - midpoint) - Math.abs(b - midpoint));
        positions.forEach((index) => {
            if (!isValidSuffixStart(index)) {
                return;
            }
            const prefix = syllables.slice(0, index).map((syllable) => syllable.text).join("");
            const suffix = syllables.slice(index).map((syllable) => syllable.text).join("");
            addCandidate(prefix, suffix);
        });
    }
    return candidates;
}

function getShapePatternLabels(context) {
    if (typeof getPretUniversalShapeLabels === "function") {
        return getPretUniversalShapeLabels(context);
    }
    if (!context) {
        return [];
    }
    const descriptorState = context.descriptorState || {};
    const shapeDescriptors = Array.isArray(descriptorState.shapeDescriptors)
        ? descriptorState.shapeDescriptors
        : [];
    if (typeof formatPretDescriptorLabel === "function") {
        return shapeDescriptors
            .map((descriptor) => formatPretDescriptorLabel(descriptor, {
                activeRightEdgeProfile: context.rightEdgeProfile,
            }))
            .filter(Boolean);
    }
    return [];
}

function getPretClassSignatureFromParsed(parsedVerb) {
    if (!parsedVerb || !parsedVerb.verb) {
        return null;
    }
    const isTransitive = getBaseObjectSlots(parsedVerb) > 0;
    const contextOptions = buildPretContextOptionsFromMeta(parsedVerb);
    const resolvedBundle = resolvePretUniversalContextBundle({
        verb: parsedVerb.verb,
        analysisVerb: parsedVerb.analysisVerb || parsedVerb.verb,
        analysisTarget: parsedVerb.analysisVerb || parsedVerb.verb,
        isTransitive,
        contextOptions,
        includeSummary: true,
    });
    const context = resolvedBundle.context;
    const summary = resolvedBundle.summary;
    let classList = "";
    if (summary && typeof summary.resolvedClassList === "string" && summary.resolvedClassList) {
        classList = summary.resolvedClassList;
    } else if (summary && typeof summary.classList === "string") {
        classList = summary.classList;
    } else {
        const candidates = getPretUniversalClassCandidates(context);
        classList = candidates.size
            ? (typeof formatPretUniversalClassList === "function"
                ? formatPretUniversalClassList(candidates)
                : Array.from(candidates).sort().join("/"))
            : "";
    }
    const shapeLabels = summary && Array.isArray(summary.shapeLabels)
        ? summary.shapeLabels.slice()
        : getShapePatternLabels(context);
    return { classList, shapeLabels, parsedVerb };
}

function getPretClassSignatureFromValue(rawValue) {
    return getPretClassSignatureFromParsed(parseVerbInput(rawValue));
}

function buildVerbDisambiguationCandidates(rawValue) {
    const parsedBase = parseVerbInput(rawValue);
    const display = stripOptionalSupportiveI(parsedBase.displayVerb || "");
    if (!display) {
        return { suggestions: [], patterns: [] };
    }
    const signatureCache = new Map();
    const getCachedSignature = (value) => {
        if (!value) {
            return null;
        }
        if (signatureCache.has(value)) {
            return signatureCache.get(value);
        }
        const signature = getPretClassSignatureFromValue(value);
        signatureCache.set(value, signature || null);
        return signature || null;
    };
    const original = getPretClassSignatureFromParsed(parsedBase);
    if (!original) {
        return { suggestions: [], patterns: [] };
    }
    signatureCache.set(display, original);
    const isTransitive = getBaseObjectSlots(parsedBase) > 0;
    const suggestions = [];
    const seen = new Set();
    const originalClassList = original.classList;
    const patternSet = new Set(original.shapeLabels || []);
    const patterns = Array.from(patternSet);
    const maxDashCount = Math.max(
        1,
        Math.min(2, Number.isFinite(parsedBase.dashCount) ? parsedBase.dashCount : 0)
    );
    const considerCandidate = (candidateValue, options = {}) => {
        if (!candidateValue || candidateValue === display || seen.has(candidateValue)) {
            return;
        }
        const candidateDashCount = (candidateValue.match(/-/g) || []).length;
        if (candidateDashCount > maxDashCount) {
            return;
        }
        const candidate = getCachedSignature(candidateValue);
        if (!candidate || !candidate.classList) {
            return;
        }
        const allowSameClass = options.allowSameClass === true;
        if (candidate.classList === originalClassList && !allowSameClass) {
            return;
        }
        seen.add(candidateValue);
        suggestions.push({
            value: candidateValue,
            classList: candidate.classList,
            shapeLabels: candidate.shapeLabels || [],
        });
    };
    const supportiveCandidate = (() => {
        const hasLeadingDash = display.startsWith("-");
        const core = hasLeadingDash ? display.slice(1) : display;
        if (!isSupportiveIClusterBase(core)) {
            return "";
        }
        const letters = splitVerbLetters(core);
        const nextCore = letters.slice(1).join("");
        if (!nextCore) {
            return "";
        }
        const marker = getRegexOptionalSupportiveMarkerForLetter(letters[0]);
        const candidateCore = `${marker}${nextCore}`;
        return `${hasLeadingDash ? "-" : ""}${candidateCore}`;
    })();
    if (display.includes("/")) {
        const noSlash = display.replace(/\//g, "");
        considerCandidate(noSlash);
    } else {
        if (supportiveCandidate) {
            considerCandidate(supportiveCandidate, { allowSameClass: true });
        }
        const hasLeadingDash = display.startsWith("-");
        const core = hasLeadingDash ? display.slice(1) : display;
        const affixes = getDisambiguationAffixCandidates(core);
        affixes.forEach((affix) => {
            const remainder = core.slice(affix.length);
            if (!remainder) {
                return;
            }
            if (
                (affix === "te" || affix === "ta")
                && remainder.startsWith("n")
                && startsWithKSeries(remainder.slice(1))
            ) {
                return;
            }
            const candidateValue = `${hasLeadingDash ? "-" : ""}${affix}-${remainder}`;
            considerCandidate(candidateValue, { allowSameClass: true });
        });
        const prefixes = getDisambiguationPrefixCandidates(core);
        prefixes.forEach((prefix) => {
            const remainder = core.slice(prefix.length);
            if (!remainder) {
                return;
            }
            if (
                (prefix === "te" || prefix === "ta")
                && remainder.startsWith("n")
                && startsWithKSeries(remainder.slice(1))
            ) {
                return;
            }
            const candidateValue = `${hasLeadingDash ? "-" : ""}${prefix}/${remainder}`;
            considerCandidate(candidateValue);
        });
        const suffixCandidates = getDisambiguationSuffixCandidates(core);
        suffixCandidates.forEach((candidate) => {
            const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
            considerCandidate(candidateValue, { allowSameClass: true });
        });
        const knownSuffixCandidates = getDisambiguationKnownSuffixCandidates(core, {
            isTransitive,
        });
        knownSuffixCandidates.forEach((candidate) => {
            const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
            considerCandidate(candidateValue, { allowSameClass: true });
        });
        if (!knownSuffixCandidates.length) {
            const longSplitCandidates = getDisambiguationLongSplitCandidates(core);
            longSplitCandidates.forEach((candidate) => {
                const candidateValue = `${hasLeadingDash ? "-" : ""}${candidate.prefix}/${candidate.suffix}`;
                considerCandidate(candidateValue, { allowSameClass: true });
            });
        }
    }
    return {
        suggestions: suggestions.slice(0, VERB_DISAMBIGUATION_LIMIT),
        patterns,
    };
}

// === CSV Export ===
// === Input Validation ===
function isRecognizedCurrentRegexValue(rawValue, { allowPartial = false } = {}) {
    const trimmed = String(rawValue || "").trim();
    if (!trimmed) {
        return false;
    }
    if (parseMovingTargetRegexInput(trimmed).isValid) {
        return true;
    }
    const shorthandInput = getCurrentRegexShorthandParseInput(trimmed);
    if (shorthandInput && parseMovingTargetRegexInput(shorthandInput).isValid) {
        return true;
    }
    if (allowPartial && isAllowedPartialRegexEnvelopeValue(trimmed)) {
        return true;
    }
    return false;
}

function getInvalidVerbCharacters(rawValue) {
    if (isRecognizedCurrentRegexValue(rawValue, { allowPartial: true })) {
        return [];
    }
    const raw = getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "");
    const invalid = new Set();
    for (const char of raw) {
        if (/[a-z0-9|~#()\[\]{}\/\s-]/i.test(char)) {
            continue;
        }
        invalid.add(char);
    }
    return Array.from(invalid);
}

function getInvalidVerbLetters(rawValue) {
    if (isRecognizedCurrentRegexValue(rawValue, { allowPartial: true })) {
        return [];
    }
    const raw = (getRawInputTiCausativeMetadata(rawValue).normalizedInput || String(rawValue || "")).toLowerCase();
    const cleaned = raw.replace(COMPOUND_MARKER_RE, "").replace(/\s+/g, "");
    const letters = splitVerbLetters(cleaned);
    const invalid = new Set();
    letters.forEach((letter) => {
        if (!letter) {
            return;
        }
        if (/^[0-9]+$/.test(letter)) {
            return;
        }
        if (DIGRAPH_SET.has(letter)) {
            return;
        }
        if (VALID_VOWEL_SET.has(letter)) {
            return;
        }
        if (VALID_CONSONANTS.has(letter)) {
            return;
        }
        invalid.add(letter);
    });
    return Array.from(invalid);
}

function getInvalidLegacyVerbStructure(rawValue, options = {}) {
    const raw = (
        getRawInputTiCausativeMetadata(rawValue).normalizedInput
        || String(rawValue || "")
    ).toLowerCase();
    const cleaned = raw.replace(COMPOUND_ALLOWED_RE, "").replace(/\s+/g, "");
    const allowPartial = options.allowPartial === true;
    if (cleaned.includes("/-") || cleaned.includes("-/")) {
        return "separator";
    }
    const markerRe = COMPOUND_MARKER_RE || /[|~#()\[\]\\/?-]/g;
    const tokens = [];
    const separators = [];
    let current = "";
    for (let i = 0; i < cleaned.length; i += 1) {
        const char = cleaned[i];
        if (char === "/" || char === "-") {
            tokens.push(current);
            separators.push(char);
            current = "";
        } else {
            current += char;
        }
    }
    tokens.push(current);
    const isNonspecificToken = (token) => NONSPECIFIC_VALENCE_AFFIX_SET.has(token);
    const isPrefixToken = (token) => (
        SPECIFIC_VALENCE_PREFIX_SET.has(token)
        || isNonspecificToken(token)
        || token === "k"
    );
    for (let i = 0; i < separators.length; i += 1) {
        const sep = separators[i];
        const leftRaw = tokens[i] ?? "";
        const rightRaw = tokens[i + 1] ?? "";
        const left = leftRaw.replace(markerRe, "");
        const right = rightRaw.replace(markerRe, "");
        if (!right) {
            if (allowPartial && i === separators.length - 1) {
                return "";
            }
            if (sep === "-") {
                let hasNonEmptyLater = false;
                let onlyDashes = true;
                for (let j = i + 1; j < separators.length; j += 1) {
                    if (separators[j] !== "-") {
                        onlyDashes = false;
                        break;
                    }
                    const nextToken = (tokens[j + 1] ?? "").replace(markerRe, "");
                    if (nextToken) {
                        hasNonEmptyLater = true;
                        break;
                    }
                }
                if (onlyDashes && hasNonEmptyLater) {
                    continue;
                }
            }
            return "separator";
        }
        if (sep === "/") {
            // PREFIX/ can bind only to nonspecific or verbstem (not to specific prefixes).
            const rightIsPrefix = separators[i + 1] === "/";
            if (isPrefixToken(right) && !isNonspecificToken(right)) {
                return "separator";
            }
            if (rightIsPrefix && !isNonspecificToken(right)) {
                const nextRaw = tokens[i + 2] ?? "";
                const next = nextRaw.replace(markerRe, "");
                const allowImpersonalTaRightEmbed = (
                    left === "ta"
                    && Boolean(right)
                    && Boolean(next)
                    && !isPrefixToken(right)
                );
                const leftDirectionalFromBracket = getBracketDirectionalPrefixToken(leftRaw.replace(/^-+/, ""));
                const allowDirectionalRightEmbed = (
                    Boolean(leftDirectionalFromBracket)
                    && Boolean(right)
                    && Boolean(next)
                    && !isPrefixToken(right)
                );
                if (!allowImpersonalTaRightEmbed && !allowDirectionalRightEmbed) {
                    return "separator";
                }
            }
        }
    }
    const valenceSlots = getValenceSlotsFromCleaned(cleaned);
    if (valenceSlots.length >= 2) {
        for (let i = 0; i < valenceSlots.length; i += 1) {
            if (getValenceCategoryFromToken(valenceSlots[i]) === "embedded") {
                return "embedded-between-dashes";
            }
        }
    }
    return "";
}

function getInvalidVerbStructure(rawValue, options = {}) {
    const expectRegexEnvelope = options.expectRegexEnvelope === true
        ? true
        : (options.expectRegexEnvelope === false
            ? false
            : true);
    const allowPartial = options.allowPartial === true;
    const trimmed = String(rawValue || "").trim();
    if (!trimmed) {
        return "";
    }
    const movingTargetParsed = parseMovingTargetRegexInput(trimmed);
    if (movingTargetParsed.isValid) {
        return "";
    }
    const shorthandInput = getCurrentRegexShorthandParseInput(trimmed);
    if (shorthandInput && parseMovingTargetRegexInput(shorthandInput).isValid) {
        return "";
    }
    if (allowPartial && isAllowedPartialRegexEnvelopeValue(trimmed)) {
        return "";
    }
    if (trimmed.includes("?")) {
        return "search";
    }
    if (expectRegexEnvelope) {
        return "core-envelope";
    }
    return "core-envelope";
}

function getInvalidVerbStructureMessage(invalidStructure = "", options = {}) {
    switch (String(invalidStructure || "")) {
        case "search":
            return "La búsqueda con ? ya no forma parte del regex.";
        case "core-envelope":
            return "Regex usa solo la gramática nueva: (...) o -(...) con piezas exteriores unidas por +.";
        case "core-empty":
            return "El core no puede ir vacío.";
        case "legacy-parentheses":
            return "Regex nuevo usa valencias exteriores y [i] o [y]; no uses la notación anterior.";
        case "supportive-marker":
            return "Regex usa [i] o [y] como apoyo opcional.";
        case "dash":
            return "El regex nuevo solo usa -(...) para núcleos transitivos.";
        case "separator":
            return "El verbo contiene separadores inválidos.";
        default:
            return "La estructura del regex es inválida.";
    }
}

function serializeCanonicalRegexEnvelope(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw) {
        return "";
    }
    return serializeRegexInputValue(raw) || raw;
}

function normalizeComposerScreenCoreValue(value = "", options = {}) {
    const preserveSupportiveMarkers = options.preserveSupportiveMarkers === true;
    const supportivePattern = /\[([iy])\]/g;
    const supportiveReplacement = preserveSupportiveMarkers ? "[$1]" : "$1";
    const boundSupportiveIPattern = /(^|[-/])\[i\]([a-z]+)\/i([a-z]+)/gi;
    return String(value || "")
        .replace(/\[([a-z]+)\]/gi, (match) => getBracketDirectionalPrefixToken(match) || match)
        .replace(boundSupportiveIPattern, (_match, separator, embed, stem) => {
            const normalizedSeparator = String(separator || "");
            const normalizedEmbed = String(embed || "").toLowerCase();
            const normalizedStem = `i${String(stem || "").toLowerCase()}`;
            if (preserveSupportiveMarkers) {
                return `${normalizedSeparator}[i]${normalizedEmbed}/${normalizedStem}`;
            }
            return `${normalizedSeparator}i${normalizedEmbed}/${normalizedStem}`;
        })
        .replace(/\//g, "-")
        .toLowerCase()
        .replace(supportivePattern, supportiveReplacement)
        .replace(/\((ta|te|mu|t|m)\)/g, "$1")
        .replace(/\((tajta|tejte|mujmu)\)/g, "$1");
}

function restoreBracketSupportiveMarkers(value = "") {
    return String(value || "")
        .replace(/__supportive_i__/gi, "[i]")
        .replace(/__supportive_y__/gi, "[y]");
}

function stripBracketSupportiveMarkersForDisplay(value = "") {
    return String(value || "")
        .replace(/\[i\]/gi, "i")
        .replace(/\[y\]/gi, "y")
        .replace(/\/i\//gi, "i")
        .replace(/\/y\//gi, "y");
}

function formatComposerDisplayMovingTargetPiece(piece = null, options = {}) {
    if (!piece || !piece.value) {
        return "";
    }
    const value = normalizeComposerScreenCoreValue(piece.value, options);
    if (!value) {
        return "";
    }
    if (piece.type === "lexical") {
        return `(${value})`;
    }
    return value;
}
// Core parsing functions extracted to src/core/parsing/parsing.js

function triggerInputShake(target) {
    if (!target || !target.classList) {
        return;
    }
    target.classList.remove("shake");
    void target.offsetWidth;
    target.classList.add("shake");
    if (target._shakeTimeout) {
        clearTimeout(target._shakeTimeout);
    }
    target._shakeTimeout = setTimeout(() => {
        target.classList.remove("shake");
    }, 350);
}

function handleVerbBeforeInput(event) {
    if (event.isComposing) {
        return;
    }
    if (event.inputType && event.inputType.startsWith("delete")) {
        return;
    }
    const data = event.data;
    if (!data) {
        return;
    }
    const target = event.target;
    if (!target || typeof target.value !== "string") {
        return;
    }
    const value = target.value;
    const start = target.selectionStart ?? value.length;
    const end = target.selectionEnd ?? value.length;
    const writableSelection = target.id === "verb"
        ? getVerbInputWritableSelection(value)
        : null;
    const selectionInsideWritableSlot = Boolean(
        writableSelection
        && (
            (start === end && start >= writableSelection.start && start <= writableSelection.end)
            || (end > writableSelection.start && start < writableSelection.end)
        )
    );
    if (selectionInsideWritableSlot) {
        const nextValue = value.slice(0, writableSelection.start)
            + data
            + value.slice(writableSelection.end);
        if (nextValue.includes("/-") || nextValue.includes("-/")) {
            event.preventDefault();
            triggerInputShake(target);
            return;
        }
        event.preventDefault();
        target.value = nextValue;
        if (typeof target.setSelectionRange === "function") {
            const caret = writableSelection.start + data.length;
            target.setSelectionRange(caret, caret);
        }
        dispatchTextInputUpdate(target);
        return;
    }
    const nextValue = value.slice(0, start) + data + value.slice(end);
    if (nextValue.includes("/-") || nextValue.includes("-/")) {
        event.preventDefault();
        triggerInputShake(target);
    }
}

// === Verb Parsing ===
// Extracted to src/core/parsing/parsing.js

var SUPPLETIVE_KATI_FORMS = new Set();
var SUPPLETIVE_KATI_IMPERFECTIVE = "";
var SUPPLETIVE_KATI_CLASS_A = "";
var SUPPLETIVE_KATI_CLASS_D = "";
var SUPPLETIVE_KATI_CLASS_EXCLUSIONS = {};
var SUPPLETIVE_KATI_NONACTIVE = "";
var SUPPLETIVE_YAWI_FORMS = new Set();
var SUPPLETIVE_YAWI_CANONICAL = "";
var SUPPLETIVE_YAWI_IMPERFECTIVE = "";
var SUPPLETIVE_YAWI_SHORT = "";
var SUPPLETIVE_YAWI_YU_VARIANT = "";
var SUPPLETIVE_YAWI_CAUSATIVE_ACTIVE = "";
var SUPPLETIVE_YAWI_CAUSATIVE_NONACTIVE = "";
var SUPPLETIVE_WEYA_FORMS = new Set();
var SUPPLETIVE_WEYA_ROOT = "";
var SUPPLETIVE_WEYA_CANONICAL = "";
var SUPPLETIVE_WITZI_FORMS = new Set();
var SUPPLETIVE_WITZI_IMPERFECTIVE = "";
var SUPPLETIVE_WITZI_PERFECTIVE = "";
var SUPPLETIVE_WITZI_IMPERATIVE = "";
var SUPPLETIVE_WITZI_NONACTIVE = "";
var SUPPLETIVE_WITZI_NONACTIVE_IMPERFECTIVE = "";
var SUPPLETIVE_WITZI_NONACTIVE_PERFECTIVE = "";
var SUPPLETIVE_WITZI_NONACTIVE_TENSES = new Set();
var SUPPLETIVE_STEM_PATHS = [];
var INTRANSITIVE_ONLY_SUPPLETIVE_IDS = new Set(["yawi", "weya", "kati", "witzi"]);
// Getter/builder functions extracted to src/core/irregulars/irregulars.js

function isPerfectiveTense(tense) {
    return (
        PRETERITO_CLASS_TENSES.has(tense)
        || PRETERITO_UNIVERSAL_ORDER.includes(tense)
        || tense === "preterito"
        || isPotencialActiveTense(tense)
        || tense === "pasado-remoto-adverbio-activo"
    );
}

function getEmptyNonactiveStemMetadataResult() {
    return {
        nonactiveStems: null,
        nonactiveAllStems: null,
        nonactiveAllStemSpecs: null,
        derivedNonactiveStems: null,
    };
}

function buildNonactiveDerivationOptions({
    verb = "",
    analysisVerb = "",
    objectPrefix = "",
    parsedVerb = null,
    directionalPrefix = "",
    isYawi = false,
    suppletiveStemSet = null,
    tense = "",
    tenseMode = "",
    derivationMode = "",
    preferredNonactiveBaseVerb = "",
    preferredNonactiveSourceMeta = null,
    preferredNonactiveSourcePrefix = "",
    selectedSuffix = undefined,
}) {
    return {
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb,
        directionalPrefix,
        isYawi,
        suppletiveStemSet,
        tense,
        tenseMode,
        derivationMode,
        preferredNonactiveBaseVerb,
        preferredNonactiveSourceMeta,
        preferredNonactiveSourcePrefix,
        selectedSuffix,
    };
}

function getLexicallyAttestedValencyReducedTransitiveVariant(baseVerb = "", targetObjectSlots = 0) {
    if (!baseVerb || !BASIC_DATA_CANONICAL_MAP.size) {
        return null;
    }
    const normalizedBase = normalizeRuleBase(baseVerb);
    if (!normalizedBase) {
        return null;
    }
    const normalizedTargetSlots = Math.max(0, Math.min(MAX_OBJECT_SLOTS, Number(targetObjectSlots) || 0));
    const nonRedupBase = normalizeRuleBase(getNonReduplicatedRoot(normalizedBase) || normalizedBase);
    const exactRedupCandidate = nonRedupBase && nonRedupBase !== normalizedBase
        ? normalizeRuleBase(buildReduplicatedSurfaceForm(nonRedupBase) || "")
        : "";
    const directCandidates = Array.from(new Set([
        exactRedupCandidate,
        normalizedBase,
        nonRedupBase,
    ].filter(Boolean)));
    for (const candidate of directCandidates) {
        const info = BASIC_DATA_CANONICAL_MAP.get(candidate.toLowerCase());
        const parsed = info?.transitiveParsed || null;
        if (parsed && getBaseObjectSlots(parsed) === normalizedTargetSlots) {
            return parsed;
        }
    }
    const matches = [];
    BASIC_DATA_CANONICAL_MAP.forEach((info) => {
        const parsed = info?.transitiveParsed || null;
        if (!parsed || getBaseObjectSlots(parsed) !== normalizedTargetSlots) {
            return;
        }
        const parsedBase = normalizeRuleBase(
            parsed.canonicalRuleBase
            || parsed.canonical?.ruleBase
            || parsed.verb
            || ""
        );
        const parsedNonRedup = normalizeRuleBase(getNonReduplicatedRoot(parsedBase) || parsedBase);
        if (!parsedNonRedup || parsedNonRedup !== nonRedupBase) {
            return;
        }
        matches.push({
            parsed,
            isExactRedup: Boolean(exactRedupCandidate && parsedBase === exactRedupCandidate),
            isExactBase: parsedBase === normalizedBase,
            length: getVerbLetterCount(parsedBase),
        });
    });
    matches.sort((left, right) => {
        if (left.isExactRedup !== right.isExactRedup) {
            return left.isExactRedup ? -1 : 1;
        }
        if (left.isExactBase !== right.isExactBase) {
            return left.isExactBase ? -1 : 1;
        }
        return left.length - right.length;
    });
    return matches[0]?.parsed || null;
}

function resolvePotencialHabitualReducedNonactiveSource({
    parsedVerb = null,
    verb = "",
    analysisVerb = "",
    objectPrefix = "",
    tense = "",
    tenseMode = "",
    derivationMode = "",
}) {
    if (
        !parsedVerb
        || !isPotencialHabitualTense(tense)
        || tenseMode !== TENSE_MODE.adjetivo
        || derivationMode !== DERIVATION_MODE.nonactive
    ) {
        return null;
    }
    const sourceObjectSlots = getBaseObjectSlots(parsedVerb);
    if (sourceObjectSlots < 2 || !SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(objectPrefix)) {
        return null;
    }
    const source = getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
    const baseVerb = stripBoundSourcePrefixFromNonactiveBase(
        source.baseVerb || "",
        source.prefix || "",
        parsedVerb,
    );
    if (!baseVerb) {
        return null;
    }
    const reducedParsed = getLexicallyAttestedValencyReducedTransitiveVariant(
        baseVerb,
        Math.max(0, sourceObjectSlots - 1),
    );
    if (!reducedParsed) {
        return null;
    }
    const reducedBaseVerb = normalizeRuleBase(
        reducedParsed.canonicalRuleBase
        || reducedParsed.canonical?.ruleBase
        || reducedParsed.analysisVerb
        || reducedParsed.verb
        || ""
    );
    if (!reducedBaseVerb || reducedBaseVerb === normalizeRuleBase(baseVerb)) {
        return null;
    }
    return {
        preferredNonactiveBaseVerb: reducedBaseVerb,
        preferredNonactiveSourceMeta: reducedParsed,
        preferredNonactiveSourcePrefix: source.prefix || "",
    };
}

function applyNonactiveDerivationFromOptions({
    isNonactive = false,
    derivationType = "",
    causativeAllStems = null,
    applicativeAllStems = null,
    derivationOptions = null,
}) {
    return applyNonactiveDerivation({
        ...(derivationOptions || {}),
        isNonactive,
        derivationType,
        causativeAllStems,
        applicativeAllStems,
    });
}

function getParsedVerbNonactiveStemMetadata(parsedVerb, options = {}) {
    if (!parsedVerb || !parsedVerb.verb) {
        return getEmptyNonactiveStemMetadataResult();
    }
    const derivationType = Object.values(DERIVATION_TYPE).includes(options.derivationType)
        ? options.derivationType
        : DERIVATION_TYPE.direct;
    const objectPrefix = typeof options.objectPrefix === "string"
        ? options.objectPrefix
        : "";
    const uniqueStems = uniqueNonEmptyValues;
    const parsedWithDerivation = {
        ...parsedVerb,
        derivationType,
        derivationValencyDelta: getDerivationValencyDelta(derivationType),
    };
    const emptyResult = getEmptyNonactiveStemMetadataResult();
    let verb = parsedWithDerivation.verb || "";
    let analysisVerb = parsedWithDerivation.analysisVerb || verb;
    let isYawi = parsedWithDerivation.isYawi === true;
    let suppletiveStemSet = getSuppletiveStemSet(parsedWithDerivation);
    const forwardDerivation = applySelectedForwardDerivation({
        derivationType,
        derivationOptions: buildNonactiveDerivationOptions({
            verb,
            analysisVerb,
            objectPrefix,
            parsedVerb: parsedWithDerivation,
            directionalPrefix: parsedWithDerivation.directionalPrefix || "",
            isYawi,
            suppletiveStemSet,
            selectedSuffix: null,
        }),
        uniqueStems,
    });
    if (forwardDerivation.blocked) {
        return emptyResult;
    }
    ({
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet,
    } = extractForwardDerivationState(
        forwardDerivation,
        { verb, analysisVerb, isYawi, suppletiveStemSet }
    ));
    const causativeAllStems = forwardDerivation.causativeAllStems;
    const applicativeAllStems = forwardDerivation.applicativeAllStems;

    const nonactiveDerivation = applyNonactiveDerivationFromOptions({
        isNonactive: true,
        derivationType,
        causativeAllStems,
        applicativeAllStems,
        derivationOptions: buildNonactiveDerivationOptions({
            verb,
            analysisVerb,
            objectPrefix,
            parsedVerb: parsedWithDerivation,
            directionalPrefix: parsedWithDerivation.directionalPrefix || "",
            isYawi,
            suppletiveStemSet,
            selectedSuffix: null,
        }),
    });
    ({
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet,
    } = extractForwardDerivationState(
        nonactiveDerivation,
        { verb, analysisVerb, isYawi, suppletiveStemSet }
    ));
    const nonactiveStems = uniqueStems([verb, analysisVerb]);
    const nonactiveAllStems = uniqueStems(
        Array.isArray(nonactiveDerivation.nonactiveAllStems)
            ? nonactiveDerivation.nonactiveAllStems
            : nonactiveStems
    );
    const nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs)
        ? getUniqueMorphStemSpecs(nonactiveDerivation.nonactiveAllStemSpecs)
        : null;
    const derivedNonactiveStems = derivationType === DERIVATION_TYPE.direct
        ? null
        : nonactiveAllStems;

    return {
        nonactiveStems: nonactiveStems.length ? nonactiveStems : null,
        nonactiveAllStems: nonactiveAllStems.length ? nonactiveAllStems : null,
        nonactiveAllStemSpecs: nonactiveAllStemSpecs && nonactiveAllStemSpecs.length
            ? nonactiveAllStemSpecs
            : null,
        derivedNonactiveStems: derivedNonactiveStems && derivedNonactiveStems.length
            ? derivedNonactiveStems
            : null,
    };
}

function buildParsedVerbForTab(tabId, rawValue, options = {}) {
    const raw = typeof rawValue === "string" ? rawValue : "";
    const rawTiMetadata = getRawInputTiCausativeMetadata(raw);
    const effectiveRaw = options.useSearchBase === false ? raw : getSearchInputBase(raw);
    const tiInputMetadata = getRawInputTiCausativeMetadata(effectiveRaw);
    const parseInput = tiInputMetadata.normalizedInput || effectiveRaw;
    const parsed = parseVerbInput(parseInput);
    const derivationType = Object.values(DERIVATION_TYPE).includes(options.derivationType)
        ? options.derivationType
        : DERIVATION_TYPE.direct;
    const derivationValencyDelta = getDerivationValencyDelta(derivationType);
    const explicitTiCausativeClass = normalizeTiCausativeClass(options.tiCausativeClass || "");
    const tiCausativeClass = explicitTiCausativeClass
        || tiInputMetadata.tiCausativeClass
        || rawTiMetadata.tiCausativeClass
        || "";
    const parsedWithContext = {
        ...parsed,
        tabId: tabId || "",
        derivationType,
        derivationValencyDelta,
        tiCausativeClass,
    };
    const includeNonactiveStemMetadata = options.includeNonactiveStemMetadata !== false;
    if (!includeNonactiveStemMetadata) {
        return parsedWithContext;
    }
    const nonactiveStemMetadata = getParsedVerbNonactiveStemMetadata(parsedWithContext, {
        derivationType,
        objectPrefix: options.objectPrefix,
    });
    return {
        ...parsedWithContext,
        ...nonactiveStemMetadata,
    };
}

function createEmptyComposerRegexState(rawValue = "") {
    void rawValue;
    return {
        mode: VERB_INPUT_MODE.composer,
        transitivity: COMPOSER_TRANSITIVITY.intransitive,
        valenceIntransitive: "",
        valenceIntransitiveEmbed: "",
        valence: "",
        valenceEmbedPrimary: "",
        valenceSecondary: "",
        valenceEmbedSecondary: "",
        slotAEmbed: "",
        slotAStem: "",
        slotBEmbed: "",
        slotBStem: "",
        slotCEmbed: "",
        slotCStem: "",
        directionalPrefix: "",
        embedPrefix: "",
        supportiveMarker: "",
        syllableMode: COMPOSER_SYLLABLE_MODE.multisyllable,
        tiCausativeClass: "",
    };
}

function buildComposerStateFromMovingTargetParsed(parsed = null, rawValue = "") {
    const state = createEmptyComposerRegexState(rawValue);
    if (!parsed || parsed.isValid !== true) {
        return state;
    }
    const normalizedCore = String(parsed.coreText || "").trim();
    const inline = parseInlineTiCausativeClassFromBase(normalizedCore);
    const coreText = String(inline.base || normalizedCore || "").trim();
    const outerLexical = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : [])
        .filter((piece) => piece && piece.type === "lexical" && piece.value)
        .map((piece) => normalizeComposerStem(piece.value))
        .filter(Boolean)
        .join("-");
    const outerValences = (Array.isArray(parsed.outerPieces) ? parsed.outerPieces : [])
        .filter((piece) => piece && piece.type === "valence" && piece.value)
        .map((piece) => normalizeComposerSecondaryValenceSurfaceToken(piece.value) || normalizeComposerValenceToken(piece.value))
        .filter(Boolean);
    const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(coreText);
    const normalizedCoreStem = normalizeComposerStem(coreText);
    const supportiveMarker = normalizeSupportiveMarkerValue(
        getRegexOptionalSupportiveMarkerLetter(coreText)
    );
    const activeStem = adjacentCoreEmbed
        ? normalizeComposerStem(adjacentCoreEmbed.stem)
        : normalizedCoreStem;
    const activeEmbed = adjacentCoreEmbed
        ? normalizeComposerEmbedValue(adjacentCoreEmbed.embed)
        : "";
    state.transitivity = parsed.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    state.directionalPrefix = normalizeComposerStem(parsed.directionalPrefix || "");
    state.supportiveMarker = supportiveMarker;
    state.tiCausativeClass = normalizeTiCausativeClass(inline.tiCausativeClass || "");
    if (state.transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        state.valenceIntransitive = outerValences[0] || "";
        state.valenceIntransitiveEmbed = state.valenceIntransitive ? outerLexical : "";
        state.slotAStem = activeStem;
        state.slotAEmbed = state.valenceIntransitive ? activeEmbed : normalizeComposerEmbedValue(activeEmbed || outerLexical);
        state.embedPrefix = state.slotAEmbed;
    } else if (state.transitivity === COMPOSER_TRANSITIVITY.transitive) {
        state.valence = outerValences[0] || "";
        state.valenceEmbedPrimary = outerLexical;
        state.slotBStem = activeStem;
        state.slotBEmbed = activeEmbed;
        state.embedPrefix = state.slotBEmbed;
    } else {
        const firstValence = outerValences[0] || "";
        const secondValence = outerValences[1] || "";
        state.valenceSecondary = encodeComposerSecondaryValenceSelection(firstValence, secondValence);
        state.valenceEmbedSecondary = outerLexical;
        state.slotCStem = activeStem;
        state.slotCEmbed = activeEmbed;
        state.embedPrefix = state.slotCEmbed;
    }
    const syllables = getComposerStemSyllableCount(getComposerActiveStemValue(state));
    state.syllableMode = syllables === 1
        ? COMPOSER_SYLLABLE_MODE.monosyllable
        : COMPOSER_SYLLABLE_MODE.multisyllable;
    return state;
}

function normalizeRegexCoreTokenCase(value = "", options = {}) {
    const forceUppercaseMarkers = options.forceUppercaseMarkers === true;
    const protectedSupportives = String(value || "")
        .replace(/(?:\/([iy])\/|\[([iy])\])/gi, (_match, letterA, letterB) => `__regex_supportive_${String(letterA || letterB || "").toLowerCase()}__`);
    return protectedSupportives
        .replace(/\//g, "-")
        .split(/([-\u0000])/)
        .map((part) => {
            if (part === "-") {
                return "-";
            }
            const trimmed = String(part || "").trim();
            if (!trimmed) {
                return "";
            }
            const restoredSupportives = trimmed
                .replace(/__regex_supportive_i__/gi, "[i]")
                .replace(/__regex_supportive_y__/gi, "[y]");
            if (restoredSupportives !== trimmed) {
                return restoredSupportives;
            }
            if (/^\[[a-z]+\]$/i.test(trimmed)) {
                return `[${trimmed.slice(1, -1).toLowerCase()}]`;
            }
            const supportiveMatch = trimmed.match(/^\[([iy])\]/i);
            if (supportiveMatch) {
                const supportiveLetter = String(supportiveMatch[1] || "").toLowerCase();
                const remainder = trimmed.slice(supportiveMatch[0].length).toLowerCase();
                return `${getRegexOptionalSupportiveMarkerForLetter(supportiveLetter)}${remainder}`;
            }
            const normalized = trimmed.toLowerCase();
            const shouldUppercaseMarker = (
                REGEX_ENVELOPE_OBJECT_MARKERS.includes(trimmed.toUpperCase())
                && (forceUppercaseMarkers || trimmed === trimmed.toUpperCase())
            );
            return shouldUppercaseMarker ? trimmed.toUpperCase() : normalized;
        })
        .join("");
}

function parseComposerPlaceholderLegacyBase(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw) {
        return null;
    }
    const match = raw.match(/^(--|-)?(_+(?:[a-z]+)?)$/i);
    if (!match) {
        return null;
    }
    const dashPrefix = match[1] === "--"
        ? "--"
        : (match[1] === "-" ? "-" : "");
    const coreText = String(match[2] || "").toLowerCase();
    if (!coreText) {
        return null;
    }
    return {
        dashPrefix,
        coreText,
        displayCore: coreText,
        displayVerb: buildRegexDisplayVerb(dashPrefix, coreText),
    };
}

function normalizeRegexSpecialSerialShorthandCore(coreValue = "") {
    const normalized = String(coreValue || "").trim().toLowerCase();
    if (!normalized) {
        return "";
    }
    return REGEX_SPECIAL_SERIAL_SHORTHAND_CORE_MAP[normalized] || normalized;
}

function serializeRegexSpecialSerialShorthandValue(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw) {
        return "";
    }
    const shorthandMatch = raw.match(/^(--|-)?(_wi-auto|_wiauto)$/i);
    if (shorthandMatch) {
        const dashPrefix = shorthandMatch[1] === "--"
            ? "--"
            : (shorthandMatch[1] === "-" ? "-" : "");
        const displayCore = REGEX_SPECIAL_SERIAL_CANONICAL_DISPLAY_MAP[String(shorthandMatch[2] || "").toLowerCase()] || "";
        return displayCore ? `${dashPrefix}${displayCore}` : "";
    }
    const wrappedMatch = raw.match(/^(--|-)?\((_wi-auto|_wiauto)\)$/i);
    if (wrappedMatch) {
        const dashPrefix = wrappedMatch[1] === "--"
            ? "--"
            : (wrappedMatch[1] === "-" ? "-" : "");
        const displayCore = REGEX_SPECIAL_SERIAL_CANONICAL_DISPLAY_MAP[String(wrappedMatch[2] || "").toLowerCase()] || "";
        return displayCore ? `${dashPrefix}${displayCore}` : "";
    }
    return "";
}

function serializeComposerPlaceholderValenceScreen(rawValue = "") {
    const raw = String(rawValue || "").trim();
    if (!raw) {
        return "";
    }
    const directMatch = raw.match(/^(--|-)?\((tajta|tejte|mujmu)\)-(_+(?:[a-z]+)?)$/i);
    if (directMatch) {
        const dashPrefix = directMatch[1] === "--"
            ? "--"
            : (directMatch[1] === "-" ? "-" : "");
        const token = String(directMatch[2] || "").toLowerCase();
        const placeholderStem = String(directMatch[3] || "").toLowerCase();
        return `${dashPrefix}(${token})-${placeholderStem}`;
    }
    const wrappedMatch = raw.match(/^(--|-)?\(\((tajta|tejte|mujmu)\)-(_+(?:[a-z]+)?)\)$/i);
    if (wrappedMatch) {
        const dashPrefix = wrappedMatch[1] === "--"
            ? "--"
            : (wrappedMatch[1] === "-" ? "-" : "");
        const token = String(wrappedMatch[2] || "").toLowerCase();
        const placeholderStem = String(wrappedMatch[3] || "").toLowerCase();
        return `${dashPrefix}(${token})-${placeholderStem}`;
    }
    return "";
}

function convertRegexCoreUppercaseMarkersToLegacyExplicitMarkers(value = "") {
    return String(value || "").replace(
        /(^|[-/])((?:TA|TE|MU|T|M))(?=$|[-/])/g,
        (_match, separator, token) => `${separator}(${String(token || "").toLowerCase()})`
    );
}

function getRegexCoreMainObjectCount(coreText = "") {
    const normalized = String(coreText || "").trim();
    if (!normalized) {
        return 0;
    }
    const splitIndex = normalized.lastIndexOf("-");
    if (splitIndex <= 0 || splitIndex >= normalized.length - 1) {
        return 0;
    }
    const head = normalized.slice(0, splitIndex).trim();
    const tail = normalized.slice(splitIndex + 1).trim();
    return head && tail ? 1 : 0;
}

function buildRegexDisplayVerb(dashPrefix = "", coreText = "", options = {}) {
    const normalizedDashPrefix = String(dashPrefix || "").startsWith("-") ? "-" : "";
    let normalizedCore = normalizeRegexCoreTokenCase(coreText, options);
    while (normalizedCore.startsWith("-")) {
        normalizedCore = normalizedCore.slice(1);
    }
    if (!normalizedCore) {
        return normalizedDashPrefix;
    }
    return `${normalizedDashPrefix}(${normalizedCore})`;
}

function parseRegexCore(coreText = "", options = {}) {
    const rawCore = String(coreText || "").trim();
    if (!rawCore) {
        return {
            rawCore,
            coreText: "",
            displayCore: "",
            coreObjectCount: 0,
            isValid: false,
            invalidReason: options.allowEmpty === true ? "" : "core-empty",
        };
    }
    const withoutRegexMarkers = rawCore.replace(REGEX_OPTIONAL_SUPPORTIVE_MARKER_RE, "");
    if (/[()]/.test(rawCore)) {
        return {
            rawCore,
            coreText: rawCore,
            displayCore: "",
            coreObjectCount: 0,
            isValid: false,
            invalidReason: "legacy-parentheses",
        };
    }
    if (/[{}]/.test(withoutRegexMarkers)) {
        return {
            rawCore,
            coreText: rawCore,
            displayCore: "",
            coreObjectCount: 0,
            isValid: false,
            invalidReason: "supportive-marker",
        };
    }
    const displayCore = normalizeRegexCoreTokenCase(rawCore);
    return {
        rawCore,
        coreText: displayCore,
        displayCore,
        coreObjectCount: getRegexCoreMainObjectCount(displayCore),
        isValid: true,
        invalidReason: "",
    };
}

function serializeRegexEnvelope({ dashPrefix = "", coreText = "" } = {}) {
    return buildRegexDisplayVerb(dashPrefix, coreText);
}

function serializeRegexCore(coreState = {}) {
    if (typeof coreState === "string") {
        return normalizeRegexCoreTokenCase(coreState);
    }
    if (coreState && typeof coreState === "object") {
        if (typeof coreState.coreText === "string" && coreState.coreText) {
            return normalizeRegexCoreTokenCase(coreState.coreText);
        }
        if (typeof coreState.displayCore === "string" && coreState.displayCore) {
            return normalizeRegexCoreTokenCase(coreState.displayCore);
        }
    }
    return "";
}

function isAllowedPartialRegexEnvelopeValue(rawValue = "") {
    const trimmed = String(rawValue || "").trim();
    if (!trimmed) {
        return true;
    }
    if (trimmed.includes("?")) {
        return false;
    }
    if (parseMovingTargetRegexInput(trimmed).isValid) {
        return true;
    }
    const strippedSupportive = trimmed.replace(/(?:\/[iy]\/|\[[iy]\])/gi, "");
    if (/[^a-z0-9()+-]/i.test(strippedSupportive)) {
        return false;
    }
    let depth = 0;
    for (let index = 0; index < strippedSupportive.length; index += 1) {
        const char = strippedSupportive[index];
        if (char === "(") {
            depth += 1;
        } else if (char === ")") {
            depth -= 1;
            if (depth < 0) {
                return false;
            }
        }
    }
    return depth >= 0;
}

function getStemLeadingSupportiveLetter(stem = "") {
    const normalized = normalizeComposerStem(stem);
    if (!normalized) {
        return "";
    }
    if (normalized.startsWith("i")) {
        return "i";
    }
    if (normalized.startsWith("y")) {
        return "y";
    }
    return "";
}

function resolveComposerSupportiveMarkerCandidate({
    stem = "",
    embed = "",
} = {}) {
    const fromStem = getStemLeadingSupportiveLetter(stem);
    if (fromStem) {
        return fromStem;
    }
    return getStemLeadingSupportiveLetter(embed);
}

function resolveOptionalSupportiveLetter(letter = "", analysisVerb = "") {
    const explicit = String(letter || "").trim().toLowerCase();
    if (explicit === "i" || explicit === "y") {
        return explicit;
    }
    const fromAnalysis = getStemLeadingSupportiveLetter(analysisVerb);
    if (fromAnalysis) {
        return fromAnalysis;
    }
    return "i";
}

function getDirectionalPrefixesSource() {
    if (Array.isArray(DIRECTIONAL_PREFIXES) && DIRECTIONAL_PREFIXES.length) {
        return DIRECTIONAL_PREFIXES;
    }
    return FALLBACK_DIRECTIONAL_PREFIXES;
}

function isDirectionalPrefixToken(value = "") {
    const token = String(value || "");
    if (!token) {
        return false;
    }
    return getDirectionalPrefixesSource().includes(token);
}

function getBracketDirectionalPrefixToken(value = "") {
    const token = String(value || "").trim().toLowerCase();
    const match = token.match(/^\[([a-z]+)\]$/);
    if (!match) {
        return "";
    }
    const directional = match[1];
    return isDirectionalPrefixToken(directional) ? directional : "";
}
