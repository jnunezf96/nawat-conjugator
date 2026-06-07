// Native wrapper generated from src/core/derivation/source_model.js.

export function createDerivationSourceModelGlobals(targetObject = globalThis) {
    function buildNonactiveSourceChain(verbMeta, verb, analysisVerb) {
      const model = buildDerivationSourceModel(verbMeta, verb, analysisVerb);
      const outerPieces = Array.isArray(model?.outerPieces) ? model.outerPieces : [];
      const directionalPrefixes = outerPieces.filter(piece => piece?.type === "directional" && piece?.value).map(piece => piece.value);
      const lexicalPrefixes = outerPieces.filter(piece => piece?.type === "lexical" && piece?.value).map(piece => piece.value);
      const explicitBoundNonspecificPrefixes = outerPieces.filter(piece => piece?.type === "valence" && piece?.value).map(piece => piece.value);
      const impersonalPrefixes = outerPieces.filter(piece => piece?.type === "impersonal" && piece?.value).map(piece => piece.value);
      const prefixParts = outerPieces.map(piece => piece?.value || "").filter(Boolean);
      const corePrefixParts = Array.isArray(model?.corePrefixParts) ? model.corePrefixParts.filter(piece => piece?.type === "adjacent-embed" && piece?.value).map(piece => piece.value) : [];
      const supportiveMarker = String(model?.supportiveMarker || "");
      const normalizedSourceBase = targetObject.normalizeRuleBase(model?.matrixBase || analysisVerb || verb || "");
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
        model
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
      preserveAdjacentEmbed: true
    });
    const PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    const PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    const SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    const CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY = Object.freeze({
      preserveDirectional: true,
      preserveLexical: true,
      preserveValence: true,
      preserveImpersonal: true,
      preserveSupportive: true,
      preserveAdjacentEmbed: true
    });
    function normalizeDerivationSourceOuterPiece(piece = null) {
      if (!piece || !piece.type || !piece.value) {
        return null;
      }
      if (piece.type === "lexical") {
        const lexicalValue = targetObject.normalizeRuleBase(piece.value);
        return lexicalValue ? {
          type: "lexical",
          value: lexicalValue
        } : null;
      }
      if (piece.type === "valence") {
        const valenceValue = targetObject.normalizeComposerSecondaryValenceSurfaceToken(piece.value) || targetObject.normalizeComposerValenceToken(piece.value) || targetObject.normalizeComposerStem(piece.value);
        return valenceValue ? {
          type: "valence",
          value: valenceValue
        } : null;
      }
      if (piece.type === "directional") {
        const directionalValue = targetObject.normalizeComposerStem(piece.value);
        return directionalValue ? {
          type: "directional",
          value: directionalValue
        } : null;
      }
      if (piece.type === "impersonal") {
        const impersonalValue = targetObject.normalizeRuleBase(piece.value);
        return impersonalValue ? {
          type: "impersonal",
          value: impersonalValue
        } : null;
      }
      return null;
    }
    function buildCurrentRegexDerivationSourceModel(rawValue = "") {
      const raw = targetObject.serializeRegexInputValue(String(rawValue || "").trim());
      if (!raw) {
        return null;
      }
      const movingTargetParsed = targetObject.parseMovingTargetRegexInput(raw);
      if (!movingTargetParsed || movingTargetParsed.isValid !== true) {
        return null;
      }
      const outerPieces = (Array.isArray(movingTargetParsed.outerPieces) ? movingTargetParsed.outerPieces : []).map(piece => normalizeDerivationSourceOuterPiece(piece)).filter(Boolean);
      const markedCore = targetObject.convertEnvelopeSupportiveMarkersToRegexInput(targetObject.normalizeRegexCoreTokenCase(String(movingTargetParsed.coreText || "").trim()));
      const supportiveMatch = String(markedCore || "").match(/^\[([iy])\]/i);
      const supportiveMarker = supportiveMatch ? String(supportiveMatch[1] || "").toLowerCase() : "";
      const plainCore = String(markedCore || "").replace(/^\[([iy])\]/i, "").trim().toLowerCase();
      const inline = targetObject.parseInlineTiCausativeClassFromBase(targetObject.collapseSerialStemDashInput(plainCore));
      const normalizedCoreBase = String(inline.base || plainCore || "").trim().toLowerCase();
      const adjacentCoreEmbed = targetObject.getMovingTargetAdjacentEmbedParts(normalizedCoreBase);
      const matrixBase = targetObject.normalizeRuleBase(adjacentCoreEmbed ? adjacentCoreEmbed.stem : normalizedCoreBase);
      const corePrefixParts = [];
      if (supportiveMarker) {
        corePrefixParts.push({
          type: "supportive",
          value: supportiveMarker
        });
      }
      if (adjacentCoreEmbed?.embed) {
        const normalizedEmbed = targetObject.normalizeRuleBase(adjacentCoreEmbed.embed);
        if (normalizedEmbed) {
          corePrefixParts.push({
            type: "adjacent-embed",
            value: normalizedEmbed
          });
        }
      }
      return {
        sourceKind: "current-regex",
        parseLanguage: "current-regex",
        rawRegex: raw,
        transitivity: movingTargetParsed.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        corePrefixParts,
        supportiveMarker,
        adjacentCoreEmbed: targetObject.normalizeRuleBase(adjacentCoreEmbed?.embed || ""),
        matrixBase
      };
    }
    function buildFallbackDerivationSourceModel(verbMeta = {}, verb = "", analysisVerb = "") {
      const meta = verbMeta || {};
      const parseLanguage = String(meta?.parseLanguage || meta?.canonical?.parseLanguage || "");
      const splitSource = targetObject.resolveCanonicalSourceSplit(meta, {
        verb: verb || "",
        analysisVerb: analysisVerb || ""
      });
      const structuralOuterPieces = Array.isArray(meta?.structuralOuterPieces) ? meta.structuralOuterPieces : Array.isArray(meta?.canonical?.structuralOuterPieces) ? meta.canonical.structuralOuterPieces : null;
      const structuralCorePrefixParts = Array.isArray(meta?.coreStructuralPrefixParts) ? meta.coreStructuralPrefixParts : Array.isArray(meta?.canonical?.coreStructuralPrefixParts) ? meta.canonical.coreStructuralPrefixParts : null;
      const boundPrefixes = Array.isArray(meta?.boundPrefixes) ? meta.boundPrefixes : [];
      const boundExplicitFlags = Array.isArray(meta?.boundExplicitFlags) ? meta.boundExplicitFlags : [];
      const outerPieces = parseLanguage === "current-regex" && Array.isArray(structuralOuterPieces) ? structuralOuterPieces.map(piece => normalizeDerivationSourceOuterPiece(piece)).filter(Boolean) : (() => {
        const lexicalPieces = (Array.isArray(meta?.lexicalBoundPrefixes) && meta.lexicalBoundPrefixes.length ? meta.lexicalBoundPrefixes : targetObject.getLexicalBoundPrefixes(boundPrefixes, boundExplicitFlags)).map(value => targetObject.normalizeRuleBase(value)).filter(Boolean).map(value => ({
          type: "lexical",
          value
        }));
        const valencePieces = targetObject.getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags).map(value => targetObject.normalizeComposerSecondaryValenceSurfaceToken(value) || targetObject.normalizeComposerValenceToken(value)).filter(Boolean).map(value => ({
          type: "valence",
          value
        }));
        const directionalPrefix = targetObject.normalizeComposerStem(meta?.directionalPrefix || splitSource?.directionalPrefix || "");
        const directionalPieces = directionalPrefix ? [{
          type: "directional",
          value: directionalPrefix
        }] : [];
        const impersonalPieces = meta?.hasImpersonalTaPrefix === true ? [{
          type: "impersonal",
          value: "ta"
        }] : [];
        return [...directionalPieces, ...lexicalPieces, ...valencePieces, ...impersonalPieces];
      })();
      const sourcePrefix = targetObject.normalizeRuleBase(meta?.sourcePrefix || meta?.canonical?.sourcePrefix || splitSource?.sourcePrefix || "");
      const supportiveMarker = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts) ? structuralCorePrefixParts.find(piece => piece?.type === "supportive" && piece?.value)?.value || "" : meta?.hasOptionalSupportiveI === true ? String(meta?.optionalSupportiveLetter || "").toLowerCase() : "";
      const corePrefixParts = parseLanguage === "current-regex" && Array.isArray(structuralCorePrefixParts) ? structuralCorePrefixParts.map(piece => {
        if (!piece || !piece.type || !piece.value) {
          return null;
        }
        const normalizedType = String(piece.type || "").trim();
        const normalizedValue = targetObject.normalizeRuleBase(piece.value);
        if (!normalizedType || !normalizedValue) {
          return null;
        }
        return {
          type: normalizedType,
          value: normalizedValue
        };
      }).filter(Boolean) : (() => {
        const embeddedPrefix = targetObject.normalizeRuleBase(targetObject.getEmbeddedVerbPrefix(meta) || "");
        const nextCorePrefixParts = [];
        if (supportiveMarker) {
          nextCorePrefixParts.push({
            type: "supportive",
            value: supportiveMarker
          });
        }
        if (embeddedPrefix && embeddedPrefix !== sourcePrefix) {
          nextCorePrefixParts.push({
            type: "adjacent-embed",
            value: embeddedPrefix
          });
        }
        return nextCorePrefixParts;
      })();
      const adjacentCoreEmbed = Array.isArray(corePrefixParts) ? corePrefixParts.find(piece => piece?.type === "adjacent-embed" && piece?.value)?.value || "" : "";
      return {
        sourceKind: "fallback",
        parseLanguage,
        rawRegex: "",
        transitivity: meta?.isMarkedTransitive ? Number.isFinite(meta?.semanticObjectSlotCount) && Number(meta.semanticObjectSlotCount) >= 2 ? targetObject.COMPOSER_TRANSITIVITY.bitransitive : targetObject.COMPOSER_TRANSITIVITY.transitive : targetObject.COMPOSER_TRANSITIVITY.intransitive,
        outerPieces,
        corePrefixParts,
        supportiveMarker,
        adjacentCoreEmbed,
        matrixBase: targetObject.normalizeRuleBase(meta?.exactBaseVerb || meta?.sourceBase || meta?.canonical?.sourceBase || meta?.canonicalRuleBase || splitSource?.matrixBase || analysisVerb || verb || "")
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
      const outerPieces = Array.isArray(sourceModel?.outerPieces) ? sourceModel.outerPieces : [];
      return outerPieces.map(piece => String(piece?.value || "").trim().toLowerCase()).filter(Boolean).join("");
    }
    function buildSupportivePrecedingSurfaceFromVerbMeta(meta = null, verb = "", analysisVerb = "") {
      const normalizedMeta = meta && typeof meta === "object" ? meta : {};
      const sourceModel = buildDerivationSourceModel(normalizedMeta, normalizedMeta?.sourceRawVerb || verb || normalizedMeta?.verb || "", analysisVerb || normalizedMeta?.analysisVerb || verb || normalizedMeta?.verb || "");
      return getDerivationSourceOuterSurface(sourceModel);
    }
    function buildSupportivePrecedingSurfaceFromMorphologyInput({
      sourceRawVerb = "",
      directionalPrefix = "",
      sourcePrefix = "",
      hasImpersonalTaPrefix = false,
      boundPrefixes = [],
      boundExplicitFlags = []
    } = {}) {
      const currentRegexModel = buildCurrentRegexDerivationSourceModel(sourceRawVerb || "");
      if (currentRegexModel) {
        return getDerivationSourceOuterSurface(currentRegexModel);
      }
      const lexicalPrefix = targetObject.normalizeRuleBase(sourcePrefix || "");
      const explicitPrefixes = targetObject.getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags).map(value => targetObject.normalizeComposerSecondaryValenceSurfaceToken(value) || targetObject.normalizeComposerValenceToken(value)).filter(Boolean);
      return [targetObject.normalizeComposerStem(directionalPrefix || ""), lexicalPrefix, ...explicitPrefixes, hasImpersonalTaPrefix ? "ta" : ""].filter(Boolean).join("");
    }
    function getCurrentRegexStructuralOccupiedLexicalSourceSlots(verbMeta = null) {
      if (!verbMeta || typeof verbMeta !== "object") {
        return 0;
      }
      const sourceModel = buildDerivationSourceModel(verbMeta, verbMeta?.sourceRawVerb || verbMeta?.verb || "", verbMeta?.analysisVerb || verbMeta?.verb || "");
      if (!sourceModel || sourceModel.sourceKind !== "current-regex") {
        return 0;
      }
      const transitivity = sourceModel.transitivity || targetObject.COMPOSER_TRANSITIVITY.intransitive;
      if (transitivity === targetObject.COMPOSER_TRANSITIVITY.intransitive) {
        return 0;
      }
      const outerPieces = Array.isArray(sourceModel.outerPieces) ? sourceModel.outerPieces : [];
      const lexicalPieceCount = outerPieces.filter(piece => piece?.type === "lexical" && piece?.value).length;
      if (!lexicalPieceCount) {
        return 0;
      }
      const hasExplicitValenceOuterPiece = outerPieces.some(piece => piece?.type === "valence" && piece?.value);
      if (hasExplicitValenceOuterPiece) {
        return 0;
      }
      const maxStructuralSlots = transitivity === targetObject.COMPOSER_TRANSITIVITY.bitransitive ? 2 : 1;
      return Math.min(maxStructuralSlots, lexicalPieceCount);
    }
    function getDerivationSourceChainPrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      if (!chain || typeof chain !== "object") {
        return [];
      }
      const resolvedPolicy = policy && typeof policy === "object" ? policy : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
      const preserveDirectional = resolvedPolicy.preserveDirectional !== false;
      const preserveLexical = resolvedPolicy.preserveLexical !== false;
      const preserveValence = resolvedPolicy.preserveValence !== false;
      const preserveImpersonal = resolvedPolicy.preserveImpersonal !== false;
      const modelOuterPieces = Array.isArray(chain?.model?.outerPieces) ? chain.model.outerPieces : null;
      if (modelOuterPieces) {
        return modelOuterPieces.filter(piece => {
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
        }).map(piece => piece.value).filter(Boolean);
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
      if (!prefixParts.length && preserveDirectional && preserveLexical && preserveValence && preserveImpersonal && Array.isArray(chain.prefixParts)) {
        return chain.prefixParts.filter(Boolean);
      }
      return prefixParts;
    }
    function getDerivationSourceChainCorePrefixParts(chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      if (!chain || typeof chain !== "object") {
        return [];
      }
      const resolvedPolicy = policy && typeof policy === "object" ? policy : FULL_SOURCE_CHAIN_REALIZATION_POLICY;
      const preserveSupportive = resolvedPolicy.preserveSupportive !== false;
      const preserveAdjacentEmbed = resolvedPolicy.preserveAdjacentEmbed !== false;
      const modelCorePrefixParts = Array.isArray(chain?.model?.corePrefixParts) ? chain.model.corePrefixParts : null;
      if (modelCorePrefixParts) {
        return modelCorePrefixParts.filter(piece => {
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
        }).map(piece => piece.value).filter(Boolean);
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
      policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY
    } = {}) {
      const resolvedSpec = stemSpec && typeof stemSpec === "object" && stemSpec.kind ? stemSpec : fallbackStem ? targetObject.buildLiteralMorphStemSpec(fallbackStem) : null;
      if (!resolvedSpec) {
        return null;
      }
      const prefixParts = [...getDerivationSourceChainPrefixParts(chain, policy), ...getDerivationSourceChainCorePrefixParts(chain, policy)];
      if (!prefixParts.length) {
        return resolvedSpec;
      }
      return prefixParts.reduceRight((current, prefixPart) => targetObject.buildPrependMorphStemSpec(current, prefixPart, {
        sourceBase: prefixPart,
        sourceSuffix
      }), resolvedSpec);
    }
    function realizeSourceChainStemByPolicy(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      const normalizedStem = String(stem || "");
      if (!normalizedStem) {
        return "";
      }
      const prefixParts = [...getDerivationSourceChainPrefixParts(chain, policy), ...getDerivationSourceChainCorePrefixParts(chain, policy)];
      return `${prefixParts.join("")}${normalizedStem}`;
    }
    function getNonactiveDerivationSource(verbMeta, verb, analysisVerb) {
      const chain = buildNonactiveSourceChain(verbMeta, verb, analysisVerb);
      return {
        baseVerb: chain.baseVerb,
        prefix: chain.prefix,
        chain
      };
    }
    function getNonactiveSourceChainPrefixParts(chain = null) {
      return getDerivationSourceChainPrefixParts(chain, FULL_SOURCE_CHAIN_REALIZATION_POLICY);
    }
    function applyNonactiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null, {
      sourceSuffix = "",
      policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY
    } = {}) {
      return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        sourceSuffix,
        policy
      });
    }
    function realizeNonactiveSourceChainStem(stem = "", chain = null, policy = FULL_SOURCE_CHAIN_REALIZATION_POLICY) {
      return realizeSourceChainStemByPolicy(stem, chain, policy);
    }
    function buildPatientivoImperfectiveSourceChain(verbMeta, verb, analysisVerb) {
      return buildFullDerivationSourceChain(verbMeta, verb, analysisVerb);
    }
    function resolvePatientivoImperfectiveBaseStemSpec(chain = null) {
      const baseVerb = targetObject.normalizeDerivationStemValue(chain?.baseVerb || "");
      if (!baseVerb) {
        return null;
      }
      const normalizedSourceBase = targetObject.normalizeRuleBase(chain?.sourceBase || baseVerb);
      let sourceStemSpec = null;
      if (targetObject.endsWithAny(baseVerb, targetObject.IA_UA_SUFFIXES)) {
        sourceStemSpec = targetObject.buildReplaceSuffixMorphStemSpec(baseVerb, "a", "", {
          sourceBase: normalizedSourceBase,
          sourceSuffix: "a"
        });
      }
      const baseStemSpec = sourceStemSpec || targetObject.buildLiteralMorphStemSpec(baseVerb, {
        sourceBase: normalizedSourceBase
      });
      const baseStem = targetObject.realizeMorphStemSpec(baseStemSpec, baseVerb);
      return targetObject.buildAppendMorphStemSpec(baseStem, "ya", {
        sourceStemSpec: baseStemSpec,
        sourceBase: normalizedSourceBase,
        sourceSuffix: "ya"
      });
    }
    function applyPatientivoImperfectiveSourceChainStemSpec(stemSpec = null, fallbackStem = "", chain = null) {
      return applySourceChainStemSpecByPolicy(stemSpec, fallbackStem, chain, {
        policy: PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY
      });
    }
    function realizePatientivoImperfectiveSourceChainStem(stem = "", chain = null) {
      return realizeSourceChainStemByPolicy(stem, chain, PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY);
    }
    const PATIENTIVO_PRELOCATIVE_SOURCE_TENSES = Object.freeze(["imperfecto", "pasado-remoto"]);
    const DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT = "tajtani";
    const PATIENTIVO_PRELOCATIVE_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "tla-itta",
      classicalMatrix: "te- ~ tla-(itta)",
      nawatRoot: "ita",
      aliases: ["itta"],
      label: "perceive/see",
      status: "nawat-data-backed",
      sourceStates: ["absolutive"],
      evidence: ["data/data.csv: -ita", "data/basic-data.csv: -itta", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-mati",
      classicalMatrix: "te- ~ tla-(mati)",
      nawatRoot: "mati",
      label: "consider/know",
      status: "nawat-data-backed",
      sourceStates: ["absolutive"],
      evidence: ["data/data.csv: -mati", "Andrews 30.15.2", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-nequi",
      classicalMatrix: "te- ~ tla-(nequi)",
      nawatRoot: "neki",
      aliases: ["nejneki"],
      label: "want/pretend",
      status: "nawat-data-backed",
      sourceStates: ["absolutive"],
      evidence: ["data/data.csv: -neki", "data/basic-data.csv: -nejneki", "Andrews 30.15.2", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-toca",
      classicalMatrix: "te- ~ tla-(toca)",
      nawatRoot: "tuka",
      label: "consider without foundation",
      status: "nawat-data-backed",
      sourceStates: ["absolutive", "possessive"],
      evidence: ["data/data.csv: -tuka", "Andrews 30.15.2", "Andrews 39.7"]
    }), Object.freeze({
      id: "tla-tlani",
      classicalMatrix: "tla-(tlani)",
      nawatRoot: "tajtani",
      label: "want/request",
      status: "nawat-data-backed",
      sourceStates: ["absolutive", "possessive"],
      evidence: ["data/data.csv: -tajtani", "Andrews 39.7", "Andrews 39.8"]
    }), Object.freeze({
      id: "tla-ih-tlani",
      classicalMatrix: "tla-(ih-tlani)",
      nawatRoot: "tatajtania",
      label: "request",
      status: "nawat-data-backed",
      sourceStates: ["possessive"],
      evidence: ["data/basic-data.csv: -tatajtania", "Andrews 39.8"]
    }), Object.freeze({
      id: "tla-tem-o-a",
      classicalMatrix: "tla-(tem-o-a)",
      nawatRoot: "temua",
      label: "seek",
      status: "nawat-data-backed",
      sourceStates: ["possessive"],
      evidence: ["data/basic-data.csv: -ishtemua/-shuchitemua", "Andrews 39.8"]
    })]);
    const DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT = "miki";
    const PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "miqui",
      classicalMatrix: "(miqui)",
      nawatRoot: "miki",
      aliases: ["miqui"],
      label: "die/be affected as",
      status: "nawat-data-backed",
      matrixValency: "intransitive",
      evidence: ["data/data.csv: miki", "Andrews 39.6"]
    })]);
    const DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT = "kal";
    const PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "cal-li",
      classicalMatrix: "(cal)-li",
      nawatRoot: "kal",
      nounClass: "zero",
      animacy: "inanimate",
      label: "house/place noun matrix",
      status: "nawat-data-backed",
      evidence: ["data/static_nnc.json: kal", "data/basic-data.csv: kal", "Andrews 39.6"]
    })]);
    const PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX = "yut";
    const PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX = "yu";
    const DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT = "chikawa";
    const PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS = Object.freeze([Object.freeze({
      id: "chic-a-hu-a",
      classicalMatrix: "(chic-a-hu-a)",
      nawatRoot: "chikawa",
      label: "strengthen/intensify by the embedded property",
      status: "nawat-data-backed",
      matrixValency: "transitive",
      evidence: ["data/basic-data.csv: -yulchikawa", "data/exact_rules.json: kakchikawa/akchikawa", "Andrews 39.9"]
    })]);
    function getPatientivoPrelocativeMatrixInventory() {
      return PATIENTIVO_PRELOCATIVE_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function resolvePatientivoPrelocativeMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT;
      const spec = PATIENTIVO_PRELOCATIVE_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        label: "",
        status: "unsupported",
        supported: false,
        diagnostics: ["patientivo-prelocative-unsupported-matrix"]
      };
    }
    function resolvePatientivoPrelocativeConnectorSuffix(patientivoNominalSuffix = "") {
      const normalized = typeof targetObject.normalizePatientivoNominalSuffixSelection === "function" ? targetObject.normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix) : String(patientivoNominalSuffix || "").trim();
      return normalized === null ? "t" : normalized;
    }
    function getPatientivoCompoundEmbedMatrixInventory() {
      return PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getPatientivoNominalCompoundMatrixInventory() {
      return PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function getPatientivoCharacteristicPropertyMatrixInventory() {
      return PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS.map(entry => ({
        ...entry
      }));
    }
    function resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT;
      const spec = PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        label: "",
        status: "unsupported",
        matrixValency: "",
        supported: false,
        diagnostics: ["patientivo-compound-embed-unsupported-matrix"]
      };
    }
    function resolvePatientivoNominalCompoundMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT;
      const spec = PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        nounClass: "",
        animacy: "",
        label: "",
        status: "unsupported",
        supported: false,
        diagnostics: ["patientivo-nominal-compound-unsupported-matrix"]
      };
    }
    function resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT) {
      const normalizedRoot = String(matrixRoot || DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT).trim().toLowerCase() || DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT;
      const spec = PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS.find(entry => entry.nawatRoot === normalizedRoot || Array.isArray(entry.aliases) && entry.aliases.includes(normalizedRoot));
      return spec ? {
        ...spec,
        supported: true,
        diagnostics: []
      } : {
        id: "",
        classicalMatrix: "",
        nawatRoot: normalizedRoot,
        label: "",
        status: "unsupported",
        matrixValency: "",
        supported: false,
        diagnostics: ["patientivo-characteristic-property-unsupported-matrix"]
      };
    }
    function buildPatientivoCompoundEmbedVerbInput({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
      return `${transitiveMarker}(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
    }
    function buildPatientivoNominalCompoundStem({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoNominalCompoundMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      return `${normalizedIncorporatedRoot}${normalizedMatrixRoot}`;
    }
    function formatPatientivoNominalCompoundOrdinaryNncInput({
      compoundStem = "",
      nounClass = ""
    } = {}) {
      const normalizedStem = String(compoundStem || "").trim();
      if (!normalizedStem) {
        return "";
      }
      const normalizedClass = String(nounClass || "").trim();
      const connector = ["t", "ti", "in"].includes(normalizedClass) ? normalizedClass : "";
      return `(${normalizedStem})${connector}`;
    }
    function stripPatientivoCharacteristicPropertySuffix(surface = "", {
      suffix = PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
      possessivePrefix = ""
    } = {}) {
      const normalized = String(surface || "").trim();
      const normalizedSuffix = String(suffix || PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX).trim();
      if (!normalized) {
        return "";
      }
      if (normalizedSuffix && normalized.length > normalizedSuffix.length && normalized.endsWith(normalizedSuffix)) {
        return normalized.slice(0, -normalizedSuffix.length);
      }
      const normalizedPossessivePrefix = String(possessivePrefix || "").trim();
      const possessiveSuffix = PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX;
      if (normalizedPossessivePrefix && normalized.startsWith(normalizedPossessivePrefix) && normalized.length > normalizedPossessivePrefix.length + possessiveSuffix.length && normalized.endsWith(possessiveSuffix)) {
        return normalized.slice(normalizedPossessivePrefix.length, -possessiveSuffix.length);
      }
      return "";
    }
    function resolvePatientivoCharacteristicPropertyEmbedSource({
      characteristicSurface = "",
      possessorPrefix = ""
    } = {}) {
      const normalizedSurface = String(characteristicSurface || "").trim();
      const absolutiveRoot = stripPatientivoCharacteristicPropertySuffix(normalizedSurface);
      if (absolutiveRoot) {
        return {
          sourceState: "absolutive",
          sourceRole: "subject",
          incorporatedRoot: absolutiveRoot,
          omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
          possessorPrefix: "",
          objectPrefix: "ki",
          objectTransfer: {
            sourceState: "absolutive",
            sourceRole: "subject",
            objectPrefix: "ki",
            objectCase: "objective",
            objectLine: "mainline",
            diagnostics: []
          },
          diagnostics: []
        };
      }
      const normalizedPossessor = String(possessorPrefix || "").trim();
      if (!normalizedPossessor) {
        return {
          sourceState: "",
          sourceRole: "",
          incorporatedRoot: "",
          omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
          possessorPrefix: "",
          objectPrefix: "",
          objectTransfer: null,
          diagnostics: ["patientivo-characteristic-property-missing-yut-suffix"]
        };
      }
      const map = getPatientivoPrelocativePossessiveObjectMap();
      const objectPrefix = String(map[normalizedPossessor] || "").trim();
      if (!objectPrefix) {
        return {
          sourceState: "possessive",
          sourceRole: "possessor",
          incorporatedRoot: "",
          omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX,
          possessorPrefix: normalizedPossessor,
          objectPrefix: "",
          objectTransfer: null,
          diagnostics: ["patientivo-characteristic-property-unmapped-possessor"]
        };
      }
      const possessiveRoot = stripPatientivoCharacteristicPropertySuffix(normalizedSurface, {
        possessivePrefix: normalizedPossessor
      });
      return {
        sourceState: "possessive",
        sourceRole: "possessor",
        incorporatedRoot: possessiveRoot,
        omittedSuffix: PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX,
        possessorPrefix: normalizedPossessor,
        objectPrefix,
        objectTransfer: {
          sourceState: "possessive",
          sourceRole: "possessor",
          sourcePrefix: normalizedPossessor,
          objectPrefix,
          objectCase: "objective",
          objectLine: "mainline",
          diagnostics: []
        },
        diagnostics: possessiveRoot ? [] : ["patientivo-characteristic-property-missing-yu-suffix"]
      };
    }
    function buildPatientivoCharacteristicPropertyEmbedVerbInput({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      const transitiveMarker = matrixSpec.matrixValency === "transitive" ? "-" : "";
      return `${transitiveMarker}(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
    }
    function stripPatientivoPrelocativeConnector(surface = "", {
      patientivoNominalSuffix = ""
    } = {}) {
      const normalized = String(surface || "").trim();
      if (!normalized) {
        return "";
      }
      const suffix = resolvePatientivoPrelocativeConnectorSuffix(patientivoNominalSuffix);
      if (suffix && normalized.endsWith(suffix)) {
        return normalized.slice(0, -suffix.length);
      }
      return normalized.endsWith("t") ? normalized.slice(0, -1) : normalized;
    }
    function buildPatientivoPrelocativeVerbInput({
      incorporatedRoot = "",
      matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT
    } = {}) {
      const normalizedIncorporatedRoot = String(incorporatedRoot || "").trim();
      const matrixSpec = resolvePatientivoPrelocativeMatrixSpec(matrixRoot);
      const normalizedMatrixRoot = matrixSpec.supported ? matrixSpec.nawatRoot : "";
      if (!normalizedIncorporatedRoot || !normalizedMatrixRoot) {
        return "";
      }
      return `-(${normalizedIncorporatedRoot}/${normalizedMatrixRoot})`;
    }
    function isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec = null, sourceState = "") {
      if (!matrixSpec || matrixSpec.supported === false) {
        return false;
      }
      const allowedStates = Array.isArray(matrixSpec.sourceStates) ? matrixSpec.sourceStates : [];
      return !allowedStates.length || allowedStates.includes(String(sourceState || "").trim());
    }
    function getPatientivoPrelocativePossessiveObjectMap(explicitMap = null) {
      if (explicitMap && typeof explicitMap === "object") {
        return explicitMap;
      }
      return typeof targetObject.POSSESSIVE_TO_OBJECT_PREFIX !== "undefined" ? targetObject.POSSESSIVE_TO_OBJECT_PREFIX : {};
    }
    function getPatientivoPrelocativeSubjectObjectMap(explicitMap = null) {
      if (explicitMap && typeof explicitMap === "object") {
        return explicitMap;
      }
      const subjectObjectMap = {};
      const objectSubjectMap = typeof targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP !== "undefined" ? targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP : {};
      Object.entries(objectSubjectMap || {}).forEach(([objectPrefix, subject]) => {
        const key = `${subject?.subjectPrefix || ""}|${subject?.subjectSuffix || ""}`;
        if (objectPrefix && key && !subjectObjectMap[key]) {
          subjectObjectMap[key] = objectPrefix;
        }
      });
      if (Object.keys(subjectObjectMap).length) {
        return subjectObjectMap;
      }
      const possessiveMap = getPatientivoPrelocativePossessiveObjectMap();
      if (typeof targetObject.getPossessivePrefixForSubject !== "function") {
        return subjectObjectMap;
      }
      [{
        subjectPrefix: "ni",
        subjectSuffix: ""
      }, {
        subjectPrefix: "ti",
        subjectSuffix: ""
      }, {
        subjectPrefix: "",
        subjectSuffix: ""
      }, {
        subjectPrefix: "ti",
        subjectSuffix: "t"
      }, {
        subjectPrefix: "an",
        subjectSuffix: "t"
      }, {
        subjectPrefix: "",
        subjectSuffix: "t"
      }].forEach(subject => {
        const possessivePrefix = targetObject.getPossessivePrefixForSubject(subject.subjectPrefix, subject.subjectSuffix);
        const objectPrefix = possessivePrefix ? String(possessiveMap[possessivePrefix] || "").trim() : "";
        const key = `${subject.subjectPrefix}|${subject.subjectSuffix}`;
        if (objectPrefix && !subjectObjectMap[key]) {
          subjectObjectMap[key] = objectPrefix;
        }
      });
      return subjectObjectMap;
    }
    function resolvePatientivoPrelocativeSubjectObjectTransfer({
      selection = {},
      subjectToObjectPrefix = null
    } = {}) {
      const subjectPrefix = String(selection?.subjectPrefix || "").trim();
      const subjectSuffix = String(selection?.subjectSuffix || "").trim();
      const key = `${subjectPrefix}|${subjectSuffix}`;
      const map = getPatientivoPrelocativeSubjectObjectMap(subjectToObjectPrefix);
      const objectPrefix = String(map[key] || "").trim();
      return {
        available: Boolean(objectPrefix),
        sourceState: "absolutive",
        sourceRole: "subject",
        sourcePrefix: subjectPrefix,
        sourceSuffix: subjectSuffix,
        sourceSubject: {
          subjectPrefix,
          subjectSuffix
        },
        objectPrefix,
        objectCase: "objective",
        objectLine: "mainline",
        label: objectPrefix ? `sujeto NNC > objeto ${objectPrefix}` : "sujeto NNC sin objeto configurado",
        diagnostics: objectPrefix ? [] : ["patientivo-prelocative-unmapped-subject"]
      };
    }
    function resolvePatientivoPrelocativeObjectTransfer({
      selection = {},
      possessorPrefix = "",
      possessiveToObjectPrefix = null,
      subjectToObjectPrefix = null
    } = {}) {
      const map = getPatientivoPrelocativePossessiveObjectMap(possessiveToObjectPrefix);
      const normalizedPossessor = String(possessorPrefix || "").trim();
      if (normalizedPossessor) {
        const objectPrefix = String(map[normalizedPossessor] || "").trim();
        return {
          available: Boolean(objectPrefix),
          sourceState: "possessive",
          sourceRole: "possessor",
          sourcePrefix: normalizedPossessor,
          objectPrefix,
          objectCase: "objective",
          objectLine: "mainline",
          label: objectPrefix ? `poseedor ${normalizedPossessor} > objeto ${objectPrefix}` : `poseedor ${normalizedPossessor} sin objeto configurado`,
          diagnostics: objectPrefix ? [] : ["patientivo-prelocative-unmapped-possessor"]
        };
      }
      return resolvePatientivoPrelocativeSubjectObjectTransfer({
        selection,
        subjectToObjectPrefix
      });
    }
    function buildPatientivoCharacteristicPropertyEmbedContinuationContract({
      characteristicSurface = "",
      sourceSurface = "",
      possessorPrefix = "",
      matrixRoot = DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const normalizedCharacteristicSurface = String(characteristicSurface || "").trim();
      const embedSource = resolvePatientivoCharacteristicPropertyEmbedSource({
        characteristicSurface: normalizedCharacteristicSurface,
        possessorPrefix
      });
      const incorporatedRoot = embedSource.incorporatedRoot;
      if (!normalizedCharacteristicSurface) {
        diagnostics.push("patientivo-characteristic-property-missing-surface");
      }
      if (normalizedCharacteristicSurface && !incorporatedRoot) {
        diagnostics.push(...embedSource.diagnostics);
      }
      const matrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundVerbInput = matrixSpec.supported && incorporatedRoot ? buildPatientivoCharacteristicPropertyEmbedVerbInput({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("patientivo-characteristic-property-missing-verb-input");
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      return {
        outputKind: "patientivo-characteristic-property-embed-continuation-contract",
        grammarSource: "Andrews 39.9",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        characteristicSurface: normalizedCharacteristicSurface,
        sourceState: embedSource.sourceState,
        sourceRole: embedSource.sourceRole,
        possessorPrefix: embedSource.possessorPrefix,
        omittedSuffix: embedSource.omittedSuffix || PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX,
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        objectPrefix: embedSource.objectPrefix || "ki",
        objectTransfer: embedSource.objectTransfer,
        diagnostics: uniqueDiagnostics
      };
    }
    function buildPatientivoPrelocativeContinuationContract({
      patientivoSurface = "",
      sourceSurface = "",
      selection = {},
      possessorPrefix = "",
      patientivoSource = "",
      sourceTenseValue = "",
      sourceCombinedMode = "",
      patientivoNominalSuffix = "",
      matrixRoot = DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT,
      possessiveToObjectPrefix = null,
      subjectToObjectPrefix = null
    } = {}) {
      const diagnostics = [];
      const normalizedPatientivoSource = String(patientivoSource || "").trim();
      const normalizedSourceCombinedMode = String(sourceCombinedMode || "").trim();
      const activeMode = typeof targetObject.COMBINED_MODE !== "undefined" && targetObject.COMBINED_MODE?.active ? targetObject.COMBINED_MODE.active : "active";
      if (normalizedPatientivoSource !== "imperfectivo") {
        diagnostics.push("patientivo-prelocative-requires-imperfective-source");
      }
      if (normalizedSourceCombinedMode !== activeMode) {
        diagnostics.push("patientivo-prelocative-requires-active-source");
      }
      if (!PATIENTIVO_PRELOCATIVE_SOURCE_TENSES.includes(String(sourceTenseValue || "").trim())) {
        diagnostics.push("patientivo-prelocative-requires-imperfective-tense");
      }
      const incorporatedRoot = stripPatientivoPrelocativeConnector(patientivoSurface, {
        patientivoNominalSuffix
      });
      if (!String(patientivoSurface || "").trim()) {
        diagnostics.push("patientivo-prelocative-missing-patientivo-surface");
      }
      if (!incorporatedRoot) {
        diagnostics.push("patientivo-prelocative-missing-incorporated-root");
      }
      const objectTransfer = resolvePatientivoPrelocativeObjectTransfer({
        selection,
        possessorPrefix,
        possessiveToObjectPrefix,
        subjectToObjectPrefix
      });
      if (!objectTransfer.available) {
        diagnostics.push(...objectTransfer.diagnostics);
      }
      const matrixSpec = resolvePatientivoPrelocativeMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const matrixSourceCompatible = isPatientivoPrelocativeMatrixCompatibleWithSourceState(matrixSpec, objectTransfer.sourceState);
      if (matrixSpec.supported && !matrixSourceCompatible) {
        diagnostics.push("patientivo-prelocative-matrix-source-state-unsupported");
      }
      const prelocativeVerbInput = matrixSpec.supported && matrixSourceCompatible ? buildPatientivoPrelocativeVerbInput({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!prelocativeVerbInput) {
        if (!matrixSpec.supported) {
          diagnostics.push("patientivo-prelocative-missing-verb-input");
        }
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      return {
        outputKind: "patientivo-prelocative-continuation-contract",
        grammarSource: "Andrews 39.7-39.8",
        supported: uniqueDiagnostics.length === 0,
        sourceState: objectTransfer.sourceState,
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        matrixSourceCompatible,
        prelocativeVerbInput,
        objectTransfer,
        diagnostics: uniqueDiagnostics
      };
    }
    function buildPatientivoCompoundEmbedContinuationContract({
      patientivoSurface = "",
      sourceSurface = "",
      patientivoNominalSuffix = "",
      matrixRoot = DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const incorporatedRoot = stripPatientivoPrelocativeConnector(patientivoSurface, {
        patientivoNominalSuffix
      });
      if (!String(patientivoSurface || "").trim()) {
        diagnostics.push("patientivo-compound-embed-missing-patientivo-surface");
      }
      if (!incorporatedRoot) {
        diagnostics.push("patientivo-compound-embed-missing-incorporated-root");
      }
      const matrixSpec = resolvePatientivoCompoundEmbedMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundVerbInput = matrixSpec.supported ? buildPatientivoCompoundEmbedVerbInput({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundVerbInput && !matrixSpec.supported) {
        diagnostics.push("patientivo-compound-embed-missing-verb-input");
      }
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      return {
        outputKind: "patientivo-compound-embed-continuation-contract",
        grammarSource: "Andrews 39.6",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundVerbInput,
        diagnostics: uniqueDiagnostics
      };
    }
    function buildPatientivoNominalCompoundContinuationContract({
      patientivoSurface = "",
      sourceSurface = "",
      patientivoNominalSuffix = "",
      matrixRoot = DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT
    } = {}) {
      const diagnostics = [];
      const incorporatedRoot = stripPatientivoPrelocativeConnector(patientivoSurface, {
        patientivoNominalSuffix
      });
      if (!String(patientivoSurface || "").trim()) {
        diagnostics.push("patientivo-nominal-compound-missing-patientivo-surface");
      }
      if (!incorporatedRoot) {
        diagnostics.push("patientivo-nominal-compound-missing-incorporated-root");
      }
      const matrixSpec = resolvePatientivoNominalCompoundMatrixSpec(matrixRoot);
      if (!matrixSpec.supported) {
        diagnostics.push(...matrixSpec.diagnostics);
      }
      const compoundStem = matrixSpec.supported ? buildPatientivoNominalCompoundStem({
        incorporatedRoot,
        matrixRoot: matrixSpec.nawatRoot
      }) : "";
      if (!compoundStem && !matrixSpec.supported) {
        diagnostics.push("patientivo-nominal-compound-missing-nnc-input");
      }
      const ordinaryNncInput = compoundStem ? formatPatientivoNominalCompoundOrdinaryNncInput({
        compoundStem,
        nounClass: matrixSpec.nounClass || "zero"
      }) : "";
      const uniqueDiagnostics = diagnostics.filter((item, index, list) => item && list.indexOf(item) === index);
      return {
        outputKind: "patientivo-nominal-compound-continuation-contract",
        grammarSource: "Andrews 39.6",
        supported: uniqueDiagnostics.length === 0,
        sourceSurface: String(sourceSurface || "").trim(),
        patientivoSurface: String(patientivoSurface || "").trim(),
        incorporatedRoot,
        matrixRoot: matrixSpec.supported ? matrixSpec.nawatRoot : String(matrixRoot || "").trim(),
        matrix: matrixSpec,
        compoundStem,
        ordinaryNncInput,
        ordinaryNncRequest: compoundStem ? {
          stem: ordinaryNncInput || compoundStem,
          state: "absolutive",
          number: "singular",
          pluralType: "auto",
          nounClass: matrixSpec.nounClass || "zero",
          animacy: matrixSpec.animacy || "inanimate"
        } : null,
        diagnostics: uniqueDiagnostics
      };
    }

    const api = {};
    api.buildNonactiveSourceChain = buildNonactiveSourceChain;
    api.buildFullDerivationSourceChain = buildFullDerivationSourceChain;
    Object.defineProperty(api, "FULL_SOURCE_CHAIN_REALIZATION_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return FULL_SOURCE_CHAIN_REALIZATION_POLICY; },
        set(value) { FULL_SOURCE_CHAIN_REALIZATION_POLICY = value; },
    });
    Object.defineProperty(api, "PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_IMPERFECTIVE_SOURCE_CHAIN_POLICY; },
    });
    Object.defineProperty(api, "PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_PERFECTIVO_SOURCE_CHAIN_POLICY; },
    });
    Object.defineProperty(api, "SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return SUSTANTIVO_VERBAL_SOURCE_CHAIN_POLICY; },
    });
    Object.defineProperty(api, "CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY", {
        configurable: true,
        enumerable: true,
        get() { return CALIFICATIVO_INSTRUMENTIVO_SOURCE_CHAIN_POLICY; },
    });
    api.normalizeDerivationSourceOuterPiece = normalizeDerivationSourceOuterPiece;
    api.buildCurrentRegexDerivationSourceModel = buildCurrentRegexDerivationSourceModel;
    api.buildFallbackDerivationSourceModel = buildFallbackDerivationSourceModel;
    api.buildDerivationSourceModel = buildDerivationSourceModel;
    api.getDerivationSourceOuterSurface = getDerivationSourceOuterSurface;
    api.buildSupportivePrecedingSurfaceFromVerbMeta = buildSupportivePrecedingSurfaceFromVerbMeta;
    api.buildSupportivePrecedingSurfaceFromMorphologyInput = buildSupportivePrecedingSurfaceFromMorphologyInput;
    api.getCurrentRegexStructuralOccupiedLexicalSourceSlots = getCurrentRegexStructuralOccupiedLexicalSourceSlots;
    api.getDerivationSourceChainPrefixParts = getDerivationSourceChainPrefixParts;
    api.getDerivationSourceChainCorePrefixParts = getDerivationSourceChainCorePrefixParts;
    api.applySourceChainStemSpecByPolicy = applySourceChainStemSpecByPolicy;
    api.realizeSourceChainStemByPolicy = realizeSourceChainStemByPolicy;
    api.getNonactiveDerivationSource = getNonactiveDerivationSource;
    api.getNonactiveSourceChainPrefixParts = getNonactiveSourceChainPrefixParts;
    api.applyNonactiveSourceChainStemSpec = applyNonactiveSourceChainStemSpec;
    api.realizeNonactiveSourceChainStem = realizeNonactiveSourceChainStem;
    api.buildPatientivoImperfectiveSourceChain = buildPatientivoImperfectiveSourceChain;
    api.resolvePatientivoImperfectiveBaseStemSpec = resolvePatientivoImperfectiveBaseStemSpec;
    api.applyPatientivoImperfectiveSourceChainStemSpec = applyPatientivoImperfectiveSourceChainStemSpec;
    api.realizePatientivoImperfectiveSourceChainStem = realizePatientivoImperfectiveSourceChainStem;
    Object.defineProperty(api, "PATIENTIVO_PRELOCATIVE_SOURCE_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_PRELOCATIVE_SOURCE_TENSES; },
    });
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_PRELOCATIVE_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_PRELOCATIVE_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_PRELOCATIVE_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_COMPOUND_EMBED_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_COMPOUND_EMBED_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_NOMINAL_COMPOUND_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_NOMINAL_COMPOUND_MATRIX_SPECS; },
    });
    Object.defineProperty(api, "PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_CHARACTERISTIC_PROPERTY_SUFFIX; },
    });
    Object.defineProperty(api, "PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_CHARACTERISTIC_PROPERTY_POSSESSIVE_SUFFIX; },
    });
    Object.defineProperty(api, "DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_ROOT; },
    });
    Object.defineProperty(api, "PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return PATIENTIVO_CHARACTERISTIC_PROPERTY_MATRIX_SPECS; },
    });
    api.getPatientivoPrelocativeMatrixInventory = getPatientivoPrelocativeMatrixInventory;
    api.resolvePatientivoPrelocativeMatrixSpec = resolvePatientivoPrelocativeMatrixSpec;
    api.resolvePatientivoPrelocativeConnectorSuffix = resolvePatientivoPrelocativeConnectorSuffix;
    api.getPatientivoCompoundEmbedMatrixInventory = getPatientivoCompoundEmbedMatrixInventory;
    api.getPatientivoNominalCompoundMatrixInventory = getPatientivoNominalCompoundMatrixInventory;
    api.getPatientivoCharacteristicPropertyMatrixInventory = getPatientivoCharacteristicPropertyMatrixInventory;
    api.resolvePatientivoCompoundEmbedMatrixSpec = resolvePatientivoCompoundEmbedMatrixSpec;
    api.resolvePatientivoNominalCompoundMatrixSpec = resolvePatientivoNominalCompoundMatrixSpec;
    api.resolvePatientivoCharacteristicPropertyMatrixSpec = resolvePatientivoCharacteristicPropertyMatrixSpec;
    api.buildPatientivoCompoundEmbedVerbInput = buildPatientivoCompoundEmbedVerbInput;
    api.buildPatientivoNominalCompoundStem = buildPatientivoNominalCompoundStem;
    api.formatPatientivoNominalCompoundOrdinaryNncInput = formatPatientivoNominalCompoundOrdinaryNncInput;
    api.stripPatientivoCharacteristicPropertySuffix = stripPatientivoCharacteristicPropertySuffix;
    api.resolvePatientivoCharacteristicPropertyEmbedSource = resolvePatientivoCharacteristicPropertyEmbedSource;
    api.buildPatientivoCharacteristicPropertyEmbedVerbInput = buildPatientivoCharacteristicPropertyEmbedVerbInput;
    api.stripPatientivoPrelocativeConnector = stripPatientivoPrelocativeConnector;
    api.buildPatientivoPrelocativeVerbInput = buildPatientivoPrelocativeVerbInput;
    api.isPatientivoPrelocativeMatrixCompatibleWithSourceState = isPatientivoPrelocativeMatrixCompatibleWithSourceState;
    api.getPatientivoPrelocativePossessiveObjectMap = getPatientivoPrelocativePossessiveObjectMap;
    api.getPatientivoPrelocativeSubjectObjectMap = getPatientivoPrelocativeSubjectObjectMap;
    api.resolvePatientivoPrelocativeSubjectObjectTransfer = resolvePatientivoPrelocativeSubjectObjectTransfer;
    api.resolvePatientivoPrelocativeObjectTransfer = resolvePatientivoPrelocativeObjectTransfer;
    api.buildPatientivoCharacteristicPropertyEmbedContinuationContract = buildPatientivoCharacteristicPropertyEmbedContinuationContract;
    api.buildPatientivoPrelocativeContinuationContract = buildPatientivoPrelocativeContinuationContract;
    api.buildPatientivoCompoundEmbedContinuationContract = buildPatientivoCompoundEmbedContinuationContract;
    api.buildPatientivoNominalCompoundContinuationContract = buildPatientivoNominalCompoundContinuationContract;
    return api;
}

export function installDerivationSourceModelGlobals(targetObject = globalThis) {
    const api = createDerivationSourceModelGlobals(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
