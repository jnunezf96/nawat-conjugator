// core/derivation/source_model.js
// Source-model and source-chain helpers shared by derivation, patientivo,
// nominal, and explainability paths.
// Depends on parsing helpers, allomorphy stem-spec builders, and global config.

"use strict";

function buildNonactiveSourceChain(verbMeta, verb, analysisVerb) {
    const model = buildDerivationSourceModel(verbMeta, verb, analysisVerb);
    const outerPieces = Array.isArray(model?.outerPieces) ? model.outerPieces : [];
    const directionalPrefixes = outerPieces
        .filter((piece) => piece?.type === "directional" && piece?.value)
        .map((piece) => piece.value);
    const lexicalPrefixes = outerPieces
        .filter((piece) => piece?.type === "lexical" && piece?.value)
        .map((piece) => piece.value);
    const explicitBoundNonspecificPrefixes = outerPieces
        .filter((piece) => piece?.type === "valence" && piece?.value)
        .map((piece) => piece.value);
    const impersonalPrefixes = outerPieces
        .filter((piece) => piece?.type === "impersonal" && piece?.value)
        .map((piece) => piece.value);
    const prefixParts = outerPieces.map((piece) => piece?.value || "").filter(Boolean);
    const corePrefixParts = Array.isArray(model?.corePrefixParts)
        ? model.corePrefixParts
            .filter((piece) => piece?.type === "adjacent-embed" && piece?.value)
            .map((piece) => piece.value)
        : [];
    const supportiveMarker = String(model?.supportiveMarker || "");
    const normalizedSourceBase = normalizeRuleBase(model?.matrixBase || analysisVerb || verb || "");
    const normalizedSourcePrefix = lexicalPrefixes.join("");
    return {
        baseVerb: normalizedSourceBase,
        prefix: prefixParts.join(""),
        prefixParts,
        corePrefixParts,
        supportiveMarker,
        directionalPrefixes,
        lexicalPrefixes,
        valencePrefixes: explicitBoundNonspecificPrefixes,
        impersonalPrefixes,
        sourceKind: String(model?.sourceKind || "surface"),
        sourceBase: normalizedSourceBase,
        sourcePrefix: normalizedSourcePrefix,
        model,
    };
}

function buildFullDerivationSourceChain(verbMeta, verb, analysisVerb) {
    return buildNonactiveSourceChain(verbMeta, verb, analysisVerb);
}

var FULL_SOURCE_CHAIN_REALIZATION_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

const CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
    preserveDirectional: true,
    preserveLexical: true,
    preserveValence: true,
    preserveImpersonal: true,
    preserveSupportive: true,
    preserveAdjacentEmbed: true,
});

function normalizeDerivationSourceOuterPiece(piece = null) {
    if (!piece || !piece.type || !piece.value) {
        return null;
    }
    if (piece.type === "lexical") {
        const lexicalValue = normalizeRuleBase(piece.value);
        return lexicalValue ? { type: "lexical", value: lexicalValue } : null;
    }
    if (piece.type === "valence") {
        const valenceValue = normalizeComposerSecondaryValenceSurfaceToken(piece.value)
            || normalizeComposerValenceToken(piece.value)
            || normalizeComposerStem(piece.value);
        return valenceValue ? { type: "valence", value: valenceValue } : null;
    }
    if (piece.type === "directional") {
        const directionalValue = normalizeComposerStem(piece.value);
        return directionalValue ? { type: "directional", value: directionalValue } : null;
    }
    if (piece.type === "impersonal") {
        const impersonalValue = normalizeRuleBase(piece.value);
        return impersonalValue ? { type: "impersonal", value: impersonalValue } : null;
    }
    return null;
}

function buildCurrentRegexDerivationSourceModel(rawValue = "") {
    const raw = serializeRegexInputValue(String(rawValue || "").trim());
    if (!raw) {
        return null;
    }
    const movingTargetParsed = parseMovingTargetRegexInput(raw);
    if (!movingTargetParsed || movingTargetParsed.isValid !== true) {
        return null;
    }
    const outerPieces = (Array.isArray(movingTargetParsed.outerPieces) ? movingTargetParsed.outerPieces : [])
        .map((piece) => normalizeDerivationSourceOuterPiece(piece))
        .filter(Boolean);
    const markedCore = convertEnvelopeSupportiveMarkersToRegexInput(
        normalizeRegexCoreTokenCase(String(movingTargetParsed.coreText || "").trim())
    );
    const supportiveMatch = String(markedCore || "").match(/^\[([iy])\]/i);
    const supportiveMarker = supportiveMatch
        ? String(supportiveMatch[1] || "").toLowerCase()
        : "";
    const plainCore = String(markedCore || "")
        .replace(/^\[([iy])\]/i, "")
        .trim()
        .toLowerCase();
    const inline = parseInlineTiCausativeClassFromBase(collapseSerialStemDashInput(plainCore));
    const normalizedCoreBase = String(inline.base || plainCore || "").trim().toLowerCase();
    const adjacentCoreEmbed = getMovingTargetAdjacentEmbedParts(normalizedCoreBase);
    const matrixBase = normalizeRuleBase(adjacentCoreEmbed ? adjacentCoreEmbed.stem : normalizedCoreBase);
    const corePrefixParts = [];
    if (supportiveMarker) {
        corePrefixParts.push({ type: "supportive", value: supportiveMarker });
    }
    if (adjacentCoreEmbed?.embed) {
        const normalizedEmbed = normalizeRuleBase(adjacentCoreEmbed.embed);
        if (normalizedEmbed) {
            corePrefixParts.push({ type: "adjacent-embed", value: normalizedEmbed });
        }
    }
    return {
        sourceKind: "current-regex",
        parseLanguage: "current-regex",
        rawRegex: raw,
        transitivity: movingTargetParsed.transitivity || COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        corePrefixParts,
        supportiveMarker,
        adjacentCoreEmbed: normalizeRuleBase(adjacentCoreEmbed?.embed || ""),
        matrixBase,
    };
}

function buildFallbackDerivationSourceModel(verbMeta = {}, verb = "", analysisVerb = "") {
    const meta = verbMeta || {};
    const parseLanguage = String(meta?.parseLanguage || meta?.canonical?.parseLanguage || "");
    const splitSource = resolveCanonicalSourceSplit(meta, {
        verb: verb || "",
        analysisVerb: analysisVerb || "",
    });
    const structuralOuterPieces = Array.isArray(meta?.structuralOuterPieces)
        ? meta.structuralOuterPieces
        : (
            Array.isArray(meta?.canonical?.structuralOuterPieces)
                ? meta.canonical.structuralOuterPieces
                : null
        );
    const structuralCorePrefixParts = Array.isArray(meta?.coreStructuralPrefixParts)
        ? meta.coreStructuralPrefixParts
        : (
            Array.isArray(meta?.canonical?.coreStructuralPrefixParts)
                ? meta.canonical.coreStructuralPrefixParts
                : null
        );
    const boundPrefixes = Array.isArray(meta?.boundPrefixes) ? meta.boundPrefixes : [];
    const boundExplicitFlags = Array.isArray(meta?.boundExplicitFlags) ? meta.boundExplicitFlags : [];
    const outerPieces = parseLanguage === "current-regex" && Array.isArray(structuralOuterPieces)
        ? structuralOuterPieces
            .map((piece) => normalizeDerivationSourceOuterPiece(piece))
            .filter(Boolean)
        : (() => {
            const lexicalPieces = (
                Array.isArray(meta?.lexicalBoundPrefixes) && meta.lexicalBoundPrefixes.length
                    ? meta.lexicalBoundPrefixes
                    : getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags)
            )
                .map((value) => normalizeRuleBase(value))
                .filter(Boolean)
                .map((value) => ({ type: "lexical", value }));
            const valencePieces = getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags)
                .map((value) => normalizeComposerSecondaryValenceSurfaceToken(value) || normalizeComposerValenceToken(value))
                .filter(Boolean)
                .map((value) => ({ type: "valence", value }));
            const directionalPrefix = normalizeComposerStem(
                meta?.directionalPrefix || splitSource?.directionalPrefix || ""
            );
            const directionalPieces = directionalPrefix
                ? [{ type: "directional", value: directionalPrefix }]
                : [];
            const impersonalPieces = meta?.hasImpersonalTaPrefix === true
                ? [{ type: "impersonal", value: "ta" }]
                : [];
            return [
                ...directionalPieces,
                ...lexicalPieces,
                ...valencePieces,
                ...impersonalPieces,
            ];
        })();
    const sourcePrefix = normalizeRuleBase(
        meta?.sourcePrefix
        || meta?.canonical?.sourcePrefix
        || splitSource?.sourcePrefix
        || ""
    );
    const supportiveMarker = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts)
        ? (
            structuralCorePrefixParts.find((piece) => piece?.type === "supportive" && piece?.value)?.value
            || ""
        )
        : (
            meta?.hasOptionalSupportiveI === true
                ? String(meta?.optionalSupportiveLetter || "").toLowerCase()
                : ""
        );
    const corePrefixParts = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts)
        ? structuralCorePrefixParts
            .map((piece) => {
                if (!piece || !piece.type || !piece.value) {
                    return null;
                }
                const normalizedType = String(piece.type || "").trim();
                const normalizedValue = normalizeRuleBase(piece.value);
                if (!normalizedType || !normalizedValue) {
                    return null;
                }
                return { type: normalizedType, value: normalizedValue };
            })
            .filter(Boolean)
        : (() => {
            const embeddedPrefix = normalizeRuleBase(getEmbeddedVerbPrefix(meta) || "");
            const nextCorePrefixParts = [];
            if (supportiveMarker) {
                nextCorePrefixParts.push({ type: "supportive", value: supportiveMarker });
            }
            if (embeddedPrefix && embeddedPrefix !== sourcePrefix) {
                nextCorePrefixParts.push({ type: "adjacent-embed", value: embeddedPrefix });
            }
            return nextCorePrefixParts;
        })();
    const adjacentCoreEmbed = Array.isArray(corePrefixParts)
        ? (
            corePrefixParts.find((piece) => piece?.type === "adjacent-embed" && piece?.value)?.value
            || ""
        )
        : "";
    return {
        sourceKind: "fallback",
        parseLanguage,
        rawRegex: "",
        transitivity: meta?.isMarkedTransitive
            ? (
                Number.isFinite(meta?.semanticObjectSlotCount) && Number(meta.semanticObjectSlotCount) >= 2
                    ? COMPOSER_TRANSITIVITY.bitransitive
                    : COMPOSER_TRANSITIVITY.transitive
            )
            : COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        corePrefixParts,
        supportiveMarker,
        adjacentCoreEmbed,
        matrixBase: normalizeRuleBase(
            meta?.exactBaseVerb
            || meta?.sourceBase
            || meta?.canonical?.sourceBase
            || meta?.canonicalRuleBase
            || splitSource?.matrixBase
            || analysisVerb
            || verb
            || ""
        ),
    };
}

function buildDerivationSourceModel(verbMeta = {}, verb = "", analysisVerb = "") {
    const meta = verbMeta || {};
    const rawRegexCandidate = String(meta?.sourceRawVerb || verb || "").trim();
    const currentRegexModel = buildCurrentRegexDerivationSourceModel(rawRegexCandidate);
    if (currentRegexModel) {
        return currentRegexModel;
    }
    return buildFallbackDerivationSourceModel(meta, verb, analysisVerb);
}

function getDerivationSourceOuterSurface(sourceModel = null) {
    const outerPieces = Array.isArray(sourceModel?.outerPieces)
        ? sourceModel.outerPieces
        : [];
    return outerPieces
        .map((piece) => String(piece?.value || "").trim().toLowerCase())
        .filter(Boolean)
        .join("");
}

function buildSupportivePrecedingSurfaceFromVerbMeta(meta = null, verb = "", analysisVerb = "") {
    const normalizedMeta = meta && typeof meta === "object" ? meta : {};
    const sourceModel = buildDerivationSourceModel(
        normalizedMeta,
        normalizedMeta?.sourceRawVerb || verb || normalizedMeta?.verb || "",
        analysisVerb || normalizedMeta?.analysisVerb || verb || normalizedMeta?.verb || ""
    );
    return getDerivationSourceOuterSurface(sourceModel);
}

function buildSupportivePrecedingSurfaceFromMorphologyInput({
    sourceRawVerb = "",
    directionalPrefix = "",
    sourcePrefix = "",
    hasImpersonalTaPrefix = false,
    boundPrefixes = [],
    boundExplicitFlags = [],
} = {}) {
    const currentRegexModel = buildCurrentRegexDerivationSourceModel(sourceRawVerb || "");
    if (currentRegexModel) {
        return getDerivationSourceOuterSurface(currentRegexModel);
    }
    const lexicalPrefix = normalizeRuleBase(sourcePrefix || "");
    const explicitPrefixes = getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags)
        .map((value) => normalizeComposerSecondaryValenceSurfaceToken(value) || normalizeComposerValenceToken(value))
        .filter(Boolean);
    return [
        normalizeComposerStem(directionalPrefix || ""),
        lexicalPrefix,
        ...explicitPrefixes,
        hasImpersonalTaPrefix ? "ta" : "",
    ].filter(Boolean).join("");
}

function getCurrentRegexStructuralOccupiedLexicalSourceSlots(verbMeta = null) {
    if (!verbMeta || typeof verbMeta !== "object") {
        return 0;
    }
    const sourceModel = buildDerivationSourceModel(
        verbMeta,
        verbMeta?.sourceRawVerb || verbMeta?.verb || "",
        verbMeta?.analysisVerb || verbMeta?.verb || ""
    );
    if (!sourceModel || sourceModel.sourceKind !== "current-regex") {
        return 0;
    }
    const transitivity = sourceModel.transitivity || COMPOSER_TRANSITIVITY.intransitive;
    if (transitivity === COMPOSER_TRANSITIVITY.intransitive) {
        return 0;
    }
    const outerPieces = Array.isArray(sourceModel.outerPieces) ? sourceModel.outerPieces : [];
    const lexicalPieceCount = outerPieces.filter((piece) => (
        piece?.type === "lexical" && piece?.value
    )).length;
    if (!lexicalPieceCount) {
        return 0;
    }
    const hasExplicitValenceOuterPiece = outerPieces.some((piece) => (
        piece?.type === "valence" && piece?.value
    ));
    if (hasExplicitValenceOuterPiece) {
        return 0;
    }
    const maxStructuralSlots = transitivity === COMPOSER_TRANSITIVITY.bitransitive ? 2 : 1;
    return Math.min(maxStructuralSlots, lexicalPieceCount);
}

function getDerivationSourceChainPrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    if (!chain || typeof chain !== "object") {
        return [];
    }
    const resolvedPolicy = policy && typeof policy === "object"
        ? policy
        : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
    const preserveDirectional = resolvedPolicy.preserveDirectional !== false;
    const preserveLexical = resolvedPolicy.preserveLexical !== false;
    const preserveValence = resolvedPolicy.preserveValence !== false;
    const preserveImpersonal = resolvedPolicy.preserveImpersonal !== false;
    const modelOuterPieces = Array.isArray(chain?.model?.outerPieces)
        ? chain.model.outerPieces
        : null;
    if (modelOuterPieces) {
        return modelOuterPieces
            .filter((piece) => {
                if (!piece || !piece.type || !piece.value) {
                    return false;
                }
                if (piece.type === "directional") {
                    return preserveDirectional;
                }
                if (piece.type === "lexical") {
                    return preserveLexical;
                }
                if (piece.type === "valence") {
                    return preserveValence;
                }
                if (piece.type === "impersonal") {
                    return preserveImpersonal;
                }
                return false;
            })
            .map((piece) => piece.value)
            .filter(Boolean);
    }
    const prefixParts = [];
    if (preserveDirectional && Array.isArray(chain.directionalPrefixes)) {
        prefixParts.push(...chain.directionalPrefixes.filter(Boolean));
    }
    if (preserveLexical && Array.isArray(chain.lexicalPrefixes)) {
        prefixParts.push(...chain.lexicalPrefixes.filter(Boolean));
    }
    if (preserveValence && Array.isArray(chain.valencePrefixes)) {
        prefixParts.push(...chain.valencePrefixes.filter(Boolean));
    }
    if (preserveImpersonal && Array.isArray(chain.impersonalPrefixes)) {
        prefixParts.push(...chain.impersonalPrefixes.filter(Boolean));
    }
    if (
        !prefixParts.length
        && preserveDirectional
        && preserveLexical
        && preserveValence
        && preserveImpersonal
        && Array.isArray(chain.prefixParts)
    ) {
        return chain.prefixParts.filter(Boolean);
    }
    return prefixParts;
}

function getDerivationSourceChainCorePrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    if (!chain || typeof chain !== "object") {
        return [];
    }
    const resolvedPolicy = policy && typeof policy === "object"
        ? policy
        : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
    const preserveSupportive = resolvedPolicy.preserveSupportive !== false;
    const preserveAdjacentEmbed = resolvedPolicy.preserveAdjacentEmbed !== false;
    const modelCorePrefixParts = Array.isArray(chain?.model?.corePrefixParts)
        ? chain.model.corePrefixParts
        : null;
    if (modelCorePrefixParts) {
        return modelCorePrefixParts
            .filter((piece) => {
                if (!piece || !piece.type || !piece.value) {
                    return false;
                }
                if (piece.type === "supportive") {
                    return preserveSupportive;
                }
                if (piece.type === "adjacent-embed") {
                    return preserveAdjacentEmbed;
                }
                return false;
            })
            .map((piece) => piece.value)
            .filter(Boolean);
    }
    const corePrefixParts = [];
    if (preserveSupportive && chain.supportiveMarker) {
        corePrefixParts.push(chain.supportiveMarker);
    }
    if (preserveAdjacentEmbed && Array.isArray(chain.corePrefixParts)) {
        corePrefixParts.push(...chain.corePrefixParts.filter(Boolean));
    }
    return corePrefixParts;
}

function applySourceChainStemSpecByPolicy(stemSpec = null, fallbackStem = "", chain = null, {
    sourceSuffix = "",
    policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY,
} = {}) {
    const resolvedSpec = (
        stemSpec
        && typeof stemSpec === "object"
        && stemSpec.kind
    ) ? stemSpec : (fallbackStem ? buildLiteralMorphStemSpec(fallbackStem) : null);
    if (!resolvedSpec) {
        return null;
    }
    const prefixParts = [
        ...getDerivationSourceChainPrefixParts(chain, policy),
        ...getDerivationSourceChainCorePrefixParts(chain, policy),
    ];
    if (!prefixParts.length) {
        return resolvedSpec;
    }
    return prefixParts.reduceRight((current, prefixPart) => (
        buildPrependMorphStemSpec(current, prefixPart, {
            sourceBase: prefixPart,
            sourceSuffix,
        })
    ), resolvedSpec);
}

function realizeSourceChainStemByPolicy(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    const normalizedStem = String(stem || "");
    if (!normalizedStem) {
        return "";
    }
    const prefixParts = [
        ...getDerivationSourceChainPrefixParts(chain, policy),
        ...getDerivationSourceChainCorePrefixParts(chain, policy),
    ];
    return `${prefixParts.join("")}${normalizedStem}`;
}

function getNonactiveDerivationSource(verbMeta, verb, analysisVerb) {
    const chain = buildNonactiveSourceChain(verbMeta, verb, analysisVerb);
    return {
        baseVerb: chain.baseVerb,
        prefix: chain.prefix,
        chain,
    };
}

function getNonactiveSourceChainPrefixParts(chain = null) {
    return getDerivationSourceChainPrefixParts(chain, FULL_SOURCE_CHAIN_REALIZATION_POLICY);
}

function applyNonactiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null, {
    sourceSuffix = "",
    policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY,
} = {}) {
    return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        sourceSuffix,
        policy,
    });
}

function realizeNonactiveSourceChainStem(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
    return realizeSourceChainStemByPolicy(stem, chain, policy);
}

function buildPatientivoImperfectiveSourceChain(verbMeta, verb, analysisVerb) {
    return buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
}

function resolvePatientivoImperfectiveBaseStemSpec(chain = null) {
    const baseVerb = normalizeDerivationStemValue(chain?.baseVerb || "");
    if (!baseVerb) {
        return null;
    }
    const normalizedSourceBase = normalizeRuleBase(chain?.sourceBase || baseVerb);
    if (endsWithAny(baseVerb, IA_UA_SUFFIXES)) {
        const spec = buildReplaceSuffixMorphStemSpec(baseVerb, "a", "", {
            sourceBase: normalizedSourceBase,
            sourceSuffix: "a",
        });
        if (spec) {
            return spec;
        }
    }
    return buildLiteralMorphStemSpec(baseVerb, {
        sourceBase: normalizedSourceBase,
    });
}

function applyPatientivoImperfectiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null) {
    return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        policy: PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY,
    });
}

function realizePatientivoImperfectiveSourceChainStem(stem = "", chain = null) {
    return realizeSourceChainStemByPolicy(stem, chain, PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY);
}
