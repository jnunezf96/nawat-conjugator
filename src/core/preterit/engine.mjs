// Native wrapper generated from src/core/preterit/engine.js.

export function createPreteritEngineApi(targetObject = globalThis) {
    // Preterit/perfective universal runtime (class builders + policy + assembly).
    // Depends on pret_universal_context.js.
    const PRET_STEM_SPEC_KIND = Object.freeze({
      literal: "literal",
      transform: "transform"
    });
    const PRET_STEM_TRANSFORM_KIND = Object.freeze({
      append: "append",
      replaceSuffix: "replace-suffix",
      perfectiveReplacement: "perfective-replacement",
      deletionShift: "deletion-shift",
      coalesceFinalI: "coalesce-final-i"
    });
    function buildPretLiteralBaseSpec(base = "") {
      const normalizedBase = typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(base || "").trim().toLowerCase()) : String(base || "").trim().toLowerCase();
      if (!normalizedBase) {
        return null;
      }
      return Object.freeze({
        kind: PRET_STEM_SPEC_KIND.literal,
        surfaceBase: normalizedBase
      });
    }
    function buildPretTransformBaseSpec({
      transformKind = "",
      sourceBase = "",
      sourceSuffix = "",
      appendText = "",
      replacement = "",
      deletionVariant = "",
      isTransitive = false
    } = {}) {
      const normalizedSourceBase = typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(sourceBase || "").trim().toLowerCase()) : String(sourceBase || "").trim().toLowerCase();
      if (!normalizedSourceBase || !transformKind) {
        return null;
      }
      return Object.freeze({
        kind: PRET_STEM_SPEC_KIND.transform,
        transformKind,
        sourceBase: normalizedSourceBase,
        sourceSuffix: typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(sourceSuffix || "").trim().toLowerCase()) : String(sourceSuffix || "").trim().toLowerCase(),
        appendText: typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(appendText || "").trim().toLowerCase()) : String(appendText || "").trim().toLowerCase(),
        replacement: typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(replacement || "").trim().toLowerCase()) : String(replacement || "").trim().toLowerCase(),
        deletionVariant: String(deletionVariant || ""),
        isTransitive: isTransitive === true
      });
    }
    function buildPretAppendBaseSpec(sourceBase = "", appendText = "") {
      return buildPretTransformBaseSpec({
        transformKind: PRET_STEM_TRANSFORM_KIND.append,
        sourceBase,
        appendText
      });
    }
    function buildPretReplaceSuffixBaseSpec(sourceBase = "", sourceSuffix = "", replacement = "") {
      return buildPretTransformBaseSpec({
        transformKind: PRET_STEM_TRANSFORM_KIND.replaceSuffix,
        sourceBase,
        sourceSuffix,
        replacement
      });
    }
    function buildPretPerfectiveReplacementBaseSpec(sourceBase = "", options = {}) {
      return buildPretTransformBaseSpec({
        transformKind: PRET_STEM_TRANSFORM_KIND.perfectiveReplacement,
        sourceBase,
        isTransitive: options.isTransitive === true
      });
    }
    function buildPretDeletionShiftBaseSpec(sourceBase = "", deletionVariant = "", options = {}) {
      return buildPretTransformBaseSpec({
        transformKind: PRET_STEM_TRANSFORM_KIND.deletionShift,
        sourceBase,
        deletionVariant,
        isTransitive: options.isTransitive === true
      });
    }
    function buildPretCoalescedIBaseSpec(sourceBase = "") {
      return buildPretTransformBaseSpec({
        transformKind: PRET_STEM_TRANSFORM_KIND.coalesceFinalI,
        sourceBase
      });
    }
    function realizePretBaseSpec(spec = null, fallbackBase = "") {
      if (!spec || typeof spec !== "object") {
        return typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(fallbackBase || "").trim().toLowerCase()) : String(fallbackBase || "").trim().toLowerCase();
      }
      if (spec.kind === PRET_STEM_SPEC_KIND.literal) {
        return typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(spec.surfaceBase || "").trim().toLowerCase()) : String(spec.surfaceBase || "").trim().toLowerCase();
      }
      if (spec.kind === PRET_STEM_SPEC_KIND.transform) {
        const sourceBase = typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(spec.sourceBase || fallbackBase || "").trim().toLowerCase()) : String(spec.sourceBase || fallbackBase || "").trim().toLowerCase();
        if (!sourceBase) {
          return "";
        }
        if (spec.transformKind === PRET_STEM_TRANSFORM_KIND.append) {
          return `${sourceBase}${spec.appendText || ""}`;
        }
        if (spec.transformKind === PRET_STEM_TRANSFORM_KIND.replaceSuffix) {
          const sourceSuffix = typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(spec.sourceSuffix || "").trim().toLowerCase()) : String(spec.sourceSuffix || "").trim().toLowerCase();
          const replacement = typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(spec.replacement || "").trim().toLowerCase()) : String(spec.replacement || "").trim().toLowerCase();
          if (!sourceSuffix) {
            return `${sourceBase}${replacement}`;
          }
          if (!sourceBase.endsWith(sourceSuffix)) {
            return `${sourceBase}${replacement}`;
          }
          return `${sourceBase.slice(0, -sourceSuffix.length)}${replacement}`;
        }
        if (spec.transformKind === PRET_STEM_TRANSFORM_KIND.perfectiveReplacement) {
          if (sourceBase.endsWith("ya")) {
            const letters = targetObject.splitVerbLetters(sourceBase);
            const recent = letters.slice(Math.max(0, letters.length - 6));
            const hasRecentS = recent.includes("s");
            const base = sourceBase.slice(0, -2);
            if (!spec.isTransitive && hasRecentS) {
              return base.endsWith("s") ? base : `${base}s`;
            }
            return `${base}sh`;
          }
          return `${sourceBase.slice(0, -1)}j`;
        }
        if (spec.transformKind === PRET_STEM_TRANSFORM_KIND.deletionShift) {
          if (spec.deletionVariant === "kw-to-k") {
            return sourceBase.endsWith("kw") ? `${sourceBase.slice(0, -2)}k` : "";
          }
          if (spec.deletionVariant === "w-keep") {
            return sourceBase;
          }
          if (spec.deletionVariant === "w-to-j") {
            return sourceBase.endsWith("w") ? `${sourceBase.slice(0, -1)}j` : "";
          }
          if (spec.deletionVariant === "m-to-n") {
            return sourceBase.endsWith("m") ? `${sourceBase.slice(0, -1)}n` : "";
          }
          if (spec.deletionVariant === "y-shift") {
            if (!sourceBase.endsWith("y")) {
              return "";
            }
            const letters = targetObject.splitVerbLetters(sourceBase);
            const recent = letters.slice(Math.max(0, letters.length - 6));
            const hasRecentS = recent.includes("s");
            const base = sourceBase.slice(0, -1);
            if (!spec.isTransitive && hasRecentS) {
              return base.endsWith("s") ? base : `${base}s`;
            }
            return `${base}sh`;
          }
          if (spec.deletionVariant === "identity") {
            return sourceBase;
          }
        }
        if (spec.transformKind === PRET_STEM_TRANSFORM_KIND.coalesceFinalI) {
          return targetObject.shouldCoalesceFinalI(sourceBase) ? `${sourceBase.slice(0, -1)}y` : sourceBase;
        }
      }
      return typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(fallbackBase || "").trim().toLowerCase()) : String(fallbackBase || "").trim().toLowerCase();
    }
    function getPretVariantBase(variant = null) {
      if (!variant || typeof variant !== "object") {
        return "";
      }
      return realizePretBaseSpec(variant.baseSpec, variant.base || "");
    }
    function getPretVariantSuffix(variant = null) {
      if (!variant || typeof variant !== "object") {
        return "";
      }
      return String(variant.suffix || "");
    }
    function getPretVariantSurfaceRuleMeta(variant = null) {
      if (!variant || typeof variant !== "object") {
        return null;
      }
      return variant.surfaceRuleMeta && typeof variant.surfaceRuleMeta === "object" ? variant.surfaceRuleMeta : null;
    }
    function buildPretProvenanceVariantEntry(variant = null) {
      if (!variant || typeof variant !== "object") {
        return {
          base: "",
          suffix: "",
          baseSpec: null,
          surfaceStem: ""
        };
      }
      const base = getPretVariantBase(variant);
      const suffix = getPretVariantSuffix(variant);
      return {
        base,
        suffix,
        baseSpec: variant.baseSpec || null,
        surfaceRuleMeta: getPretVariantSurfaceRuleMeta(variant),
        surfaceStem: `${base || ""}${suffix || ""}`
      };
    }
    function buildPretVariant(base = "", suffix = "", options = {}) {
      const baseSpec = options.baseSpec || buildPretLiteralBaseSpec(base);
      const realizedBase = getPretVariantBase({
        base,
        baseSpec
      });
      if (!realizedBase && !suffix) {
        return null;
      }
      return {
        base: realizedBase,
        baseSpec,
        suffix: String(suffix || "")
      };
    }
    function addUniquePretVariant(target = [], base = "", suffix = "", options = {}) {
      const variant = buildPretVariant(base, suffix, options);
      if (!variant) {
        return;
      }
      const baseValue = getPretVariantBase(variant);
      const suffixValue = getPretVariantSuffix(variant);
      const alreadyPresent = (Array.isArray(target) ? target : []).some(entry => getPretVariantBase(entry) === baseValue && getPretVariantSuffix(entry) === suffixValue);
      if (!alreadyPresent) {
        target.push(variant);
      }
    }
    function buildPretUniversalClassC(context) {
      const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
      const isAllowedStem = base => allowUnpronounceableStems || targetObject.isSyllableSequencePronounceable(base);
      const patterns = createPretDescriptorMatcher(context);
      const allowShapeCVV = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvv);
      const allowShapeVV = !context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vv);
      if (!context.endsInOpenSyllableNonU && !(allowShapeCVV || allowShapeVV)) {
        return null;
      }
      if (context.vowelCount !== 2 || !targetObject.pretContextHasRightEdge(context, {
        finalForm: "V",
        finalNucleus: "a",
        previousHasCoda: false,
        previousNuclei: ["i", "u"]
      }) && !allowShapeCVV && !allowShapeVV) {
        return null;
      }
      const replacementBaseSpec = buildPretPerfectiveReplacementBaseSpec(context.verb, {
        isTransitive: context.isTransitive
      });
      const replaced = realizePretBaseSpec(replacementBaseSpec, "");
      if (!isAllowedStem(replaced)) {
        return null;
      }
      return [buildPretVariant("", "", {
        baseSpec: replacementBaseSpec
      })];
    }
    function buildPretUniversalClassD(context) {
      const patterns = createPretDescriptorMatcher(context);
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vwaI)) {
        const baseSpec = buildPretAppendBaseSpec(context.verb, "j");
        const base = realizePretBaseSpec(baseSpec, "");
        if (!targetObject.isSyllableSequencePronounceable(base)) {
          return null;
        }
        return [buildPretVariant("", "", {
          baseSpec
        })];
      }
      if (context.vowelCount !== 1 || !context.isDerivedMonosyllable) {
        return null;
      }
      const monosyllableStemPath = context.monosyllableStemPath;
      if (!monosyllableStemPath) {
        return null;
      }
      const baseSpec = monosyllableStemPath.classDBaseSpec || buildPretAppendBaseSpec(context.verb, "j");
      const base = realizePretBaseSpec(baseSpec, monosyllableStemPath.classDBase || "");
      if (!targetObject.isSyllableSequencePronounceable(base)) {
        return null;
      }
      return [buildPretVariant("", "", {
        baseSpec
      })];
    }
    function getRootPlusYaSurfaceVerb(context) {
      const normalizeYaCandidate = value => {
        const normalized = String(value || "");
        if (!normalized) {
          return "";
        }
        return normalized.endsWith("ya") ? normalized : `${normalized}ya`;
      };
      const candidates = [normalizeYaCandidate(context?.verb), normalizeYaCandidate(context?.analysisVerb), normalizeYaCandidate(context?.exactBaseVerb), normalizeYaCandidate(context?.rootPlusYaBase)].filter(Boolean);
      if (!candidates.length) {
        return "";
      }
      return candidates.reduce((best, current) => current.length > best.length ? current : best);
    }
    function isSlashDenominalRootPlusYaMatrix(context) {
      return Boolean(context && !context.isTransitive && context.hasSlashMarker && context.isDenominalMatrixInput && (context.denominalMatrixStem === "tiya" || context.denominalMatrixStem === "wiya"));
    }
    function createPretDescriptorTierMatcher(descriptors = []) {
      return Object.freeze({
        has(query) {
          return targetObject.pretDescriptorListHasQuery(descriptors, query);
        },
        hasEndingFamily(endingFamily) {
          return targetObject.pretDescriptorListHasQuery(descriptors, {
            endingFamily
          });
        },
        hasModifier(modifier, options = {}) {
          return targetObject.pretDescriptorListHasQuery(descriptors, {
            endingFamily: options.endingFamily || "",
            modifiers: [modifier]
          });
        }
      });
    }
    function createPretDescriptorMatcher(context) {
      const descriptorState = context?.descriptorState || {};
      const shapeDescriptors = Array.isArray(descriptorState.shapeDescriptors) ? descriptorState.shapeDescriptors : [];
      const aggregateDescriptors = Array.isArray(descriptorState.aggregateDescriptors) ? descriptorState.aggregateDescriptors : [];
      const shape = createPretDescriptorTierMatcher(shapeDescriptors);
      const aggregate = createPretDescriptorTierMatcher(aggregateDescriptors);
      return {
        hasShape(query) {
          return shape.has(query);
        },
        hasAggregate(query) {
          return aggregate.has(query);
        },
        hasShapeEndingFamily(endingFamily) {
          return shape.hasEndingFamily(endingFamily);
        },
        hasAggregateEndingFamily(endingFamily) {
          return aggregate.hasEndingFamily(endingFamily);
        },
        hasShapeModifier(modifier, options = {}) {
          return shape.hasModifier(modifier, options);
        },
        hasAggregateModifier(modifier, options = {}) {
          return aggregate.hasModifier(modifier, options);
        }
      };
    }
    function buildPretUniversalClassA(context) {
      const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
      const isAllowedStem = base => allowUnpronounceableStems || targetObject.isSyllableSequencePronounceable(base);
      const patterns = createPretDescriptorMatcher(context);
      const hasRightEdge = (query = {}) => targetObject.pretContextHasRightEdge(context, query);
      const hasAnyRightEdge = (queries = []) => targetObject.pretContextHasAnyRightEdge(context, queries);
      const rightEdgeDescriptor = context?.rightEdgeDescriptor || {};
      const finalOnset = rightEdgeDescriptor.finalOnset || "";
      const finalNucleus = rightEdgeDescriptor.finalNucleus || "";
      if (!context.isTransitive && context.fromRootPlusYa) {
        if (isSlashDenominalRootPlusYaMatrix(context)) {
          return null;
        }
        if (context.isWeya && context.rootPlusYaBase) {
          const baseSpec = buildPretLiteralBaseSpec(context.rootPlusYaBase);
          const base = realizePretBaseSpec(baseSpec, context.rootPlusYaBase);
          if (!isAllowedStem(base)) {
            return null;
          }
          return [buildPretVariant("", "ki", {
            baseSpec
          })];
        }
        const rootPlusYaVerb = getRootPlusYaSurfaceVerb(context);
        const baseSpecs = rootPlusYaVerb ? [buildPretPerfectiveReplacementBaseSpec(rootPlusYaVerb, {
          isTransitive: context.isTransitive
        })].filter(Boolean) : [];
        const variants = baseSpecs.map(baseSpec => {
          const base = realizePretBaseSpec(baseSpec, "");
          if (!isAllowedStem(base)) {
            return null;
          }
          return buildPretVariant("", "ki", {
            baseSpec
          });
        }).filter(Boolean);
        return variants.length ? variants : null;
      }
      if (context.vowelCount !== 1) {
        return null;
      }
      if (!context.endsInOpenSyllableNonU) {
        return null;
      }
      let allowZeroSuffix = context.totalVowels > 2;
      let allowKiSuffix = true;
      if (!context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvniU)) {
        return null;
      }
      const isIntransitiveWiKiOnly = !context.isTransitive && (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vwi) || targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.wiV_CV_CV) && !context.supportiveInitialI || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vjcvwi) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vlvwi) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvlvwi));
      const allowIntransitiveChiClassA = !context.isTransitive && hasRightEdge({
        endingFamily: "ch+i"
      });
      const isShapeLVIKiOnly = !hasAnyRightEdge([{
        rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"]
      }]) && context.lastNucleus === "i" && (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vlv) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvlv));
      const isIntransitiveLWaKiOnly = !context.isTransitive && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern);
      const isEwaKiOnly = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cewa);
      const isTransitiveVwaKiOnly = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vwa) && !patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vwaI);
      const isEwaAllowZero = context.isTransitive && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.ewaPattern) && !patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cewa);
      const isTransitiveCawa = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvwaA);
      const isTransitiveCVwaI = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvwaI);
      const isTransitiveCawaZeroOnly = isTransitiveCawa && context.hasSlashMarker;
      const isTransitiveCawaAllowZero = isTransitiveCawa && context.isReduplicated;
      const isTransitiveCawaKiOnly = isTransitiveCawa && !isTransitiveCawaZeroOnly && !isTransitiveCawaAllowZero;
      const isTransitiveAwaAllowZero = context.isTransitive && (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvcawa) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvlawa));
      const isTransitiveCVwi = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvwi);
      const isTransitiveMV = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        finalOnset: "m",
        finalNuclei: ["a", "i"]
      });
      const isTransitiveShapeCVCVna = context.isTransitive && targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV);
      const isTransitiveCVnaAllowZero = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvna) && (context.isReduplicated || context.isBitransitive);
      const isTransitiveShapeNi = context.isTransitive && !patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvnV) && patterns.hasShapeEndingFamily("n+i");
      const isTransitiveTaRedupCVCV = context.isTransitive && hasRightEdge({
        endingFamily: "t+a"
      }) && context.isReduplicatedCVCV && context.analysisVerb !== "ita";
      const allowSlashAkiZero = !context.isTransitive && context.hasSlashMarker && context.analysisVerb === "aki";
      const isDenominalWiVowelSourceClassA = !context.isTransitive && context.isDenominalMatrixInput && context.isDenominalWiMatrix && context.denominalSourceEndsWithVowel;
      if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvsV)) {
        allowZeroSuffix = false;
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvpV)) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (!context.isTransitive && (patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.waPattern) || patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern)) && !isEwaAllowZero) {
        allowZeroSuffix = false;
      }
      const isKSeriesNoU = ["k", "kw"].includes(finalOnset) && finalNucleus !== "u";
      const allowIntransitiveKV = context.allowIntransitiveKV === true;
      if (!context.isTransitive && isKSeriesNoU && !context.hasSlashMarker && !allowIntransitiveKV) {
        return null;
      }
      if (context.isTransitive && hasRightEdge({
        endingFamily: "k+a"
      }) && !hasRightEdge({
        endingFamily: "k+a",
        previousForm: "CV",
        previousNucleus: "a"
      })) {
        return null;
      }
      if (!context.isTransitive && hasRightEdge({
        endingFamily: "k+a",
        previousForm: "V"
      })) {
        return null;
      }
      if (!context.isTransitive && hasRightEdge({
        endingFamily: "k+a",
        previousForm: "CV"
      })) {
        return null;
      }
      if (context.isTransitive && hasRightEdge({
        endingFamily: "tz+a"
      })) {
        allowZeroSuffix = false;
      }
      if (hasRightEdge({
        finalOnset: "tz"
      }) && !hasAnyRightEdge([{
        rightEdgeProfileSuffixes: ["V|C|CV", "CV|C|CV"]
      }])) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "p+a"
      })) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (isKSeriesNoU) {
        allowKiSuffix = false;
        allowZeroSuffix = true;
      }
      if (finalOnset === "t" && !isKSeriesNoU) {
        allowZeroSuffix = false;
      }
      if (!context.isTransitive && finalOnset === "w" && !isKSeriesNoU && !isEwaAllowZero) {
        allowZeroSuffix = false;
      }
      if (!context.isTransitive && hasRightEdge({
        endingFamily: "n+a"
      })) {
        if (context.totalVowels <= 2 && !patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvna)) {
          return null;
        }
        allowZeroSuffix = false;
      }
      if (hasRightEdge({
        endingFamily: "y+a"
      })) {
        allowZeroSuffix = false;
      }
      if (!context.isTransitive && hasRightEdge({
        finalOnset: "n",
        previousForm: "CV"
      })) {
        allowZeroSuffix = false;
      }
      if (!context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvlvni)) {
        allowZeroSuffix = false;
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vnV)) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvnV)) {
        if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvna)) {
          allowZeroSuffix = true;
          allowKiSuffix = true;
        } else if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvni)) {
          allowZeroSuffix = true;
          allowKiSuffix = true;
        } else {
          allowZeroSuffix = context.isReduplicated;
          allowKiSuffix = !context.isReduplicated;
        }
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vjcvna)) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vlcvna)) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (isTransitiveShapeCVCVna) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveCVnaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveShapeNi) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvmV)) {
        if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvma)) {
          allowZeroSuffix = true;
          allowKiSuffix = true;
        } else {
          allowZeroSuffix = context.isReduplicated;
          allowKiSuffix = !context.isReduplicated;
        }
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vjcvma)) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveMV) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (!context.isTransitive && hasRightEdge({
        finalOnset: "s",
        previousForm: "CV",
        previousOnset: "k",
        previousNucleus: "i",
        antepenultimateForms: ["V", "CV", "Vj", "CVj", "Vl", "CVl", "C"]
      })) {
        allowZeroSuffix = false;
      }
      if (!context.forceClassAForKWV) {
        const allowIntransitiveWiVtV = !context.isTransitive && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern);
        if (context.isMonosyllable && finalOnset !== "t" && !isDenominalWiVowelSourceClassA || !context.isTransitive && (context.isVtVStart || context.isVVtVStart) && !allowIntransitiveWiVtV && !allowIntransitiveChiClassA) {
          return null;
        }
      }
      if (isIntransitiveWiKiOnly || isShapeLVIKiOnly || isIntransitiveLWaKiOnly || isEwaKiOnly || isTransitiveVwaKiOnly || isTransitiveCawaKiOnly) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (isEwaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveCawaZeroOnly) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
      }
      if (isTransitiveCawaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveAwaAllowZero) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveCVwaI) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (context.isTransitive && (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vjcvwa) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vlcvwa))) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvjcvwa)) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasAnyRightEdge([{
        rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"]
      }])) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
      }
      if (!context.isTransitive && !hasAnyRightEdge([{
        rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"]
      }])) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (allowSlashAkiZero) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
      }
      if (!context.isTransitive && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern) && context.isReduplicated && !isIntransitiveWiKiOnly) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveCVwi) {
        allowZeroSuffix = context.isReduplicated;
        allowKiSuffix = true;
      }
      if (context.isTransitive && targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.wiCV_CV_CV)) {
        allowZeroSuffix = true;
        allowKiSuffix = false;
      }
      if (isTransitiveTaRedupCVCV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (context.classAKiOnly) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      const isShapeItaVerb = context.analysisVerb === "ita";
      if (context.isTransitive && context.isItaVerb && isShapeItaVerb) {
        const variants = [];
        const itaStemSpec = buildPretReplaceSuffixBaseSpec(context.verb, "ta", "tz");
        const itaStem = realizePretBaseSpec(itaStemSpec, "");
        if (!isAllowedStem(itaStem)) {
          return null;
        }
        if (allowKiSuffix) {
          addUniquePretVariant(variants, "", "ki", {
            baseSpec: itaStemSpec
          });
        }
        if (allowZeroSuffix) {
          addUniquePretVariant(variants, "", "", {
            baseSpec: itaStemSpec
          });
        }
        return variants.length ? variants : null;
      }
      if (!context.isTransitive && context.verb.endsWith("yya")) {
        const baseSpec = buildPretReplaceSuffixBaseSpec(context.verb, "ya", "");
        const base = realizePretBaseSpec(baseSpec, "");
        if (!isAllowedStem(base)) {
          return null;
        }
        return [buildPretVariant("", "ki", {
          baseSpec
        })];
      }
      const deletedBase = context.verb.slice(0, -1);
      let deletedVariants = context.isCausativeTypeTwo ? [buildPretVariant("", "", {
        baseSpec: buildPretLiteralBaseSpec(context.verb)
      })] : (deletedBase.endsWith("kw") ? [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
        isTransitive: context.isTransitive
      })] : deletedBase.endsWith("w") ? [buildPretDeletionShiftBaseSpec(deletedBase, "w-keep", {
        isTransitive: context.isTransitive
      }), buildPretDeletionShiftBaseSpec(deletedBase, "w-to-j", {
        isTransitive: context.isTransitive
      })] : deletedBase.endsWith("m") ? [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
        isTransitive: context.isTransitive
      })] : deletedBase.endsWith("y") ? [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
        isTransitive: context.isTransitive
      })] : [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
        isTransitive: context.isTransitive
      })]).filter(Boolean).map(baseSpec => buildPretVariant("", "", {
        baseSpec
      }));
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vccawa)) {
        deletedVariants = deletedVariants.filter(variant => !getPretVariantBase(variant).endsWith("j"));
      }
      if (context.isTransitive && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.kawa) && !(context.isReduplicated || context.hasSlashMarker)) {
        deletedVariants = deletedVariants.filter(variant => !getPretVariantBase(variant).endsWith("j"));
      }
      const variants = [];
      deletedVariants.forEach(variant => {
        const base = getPretVariantBase(variant);
        if (!isAllowedStem(base)) {
          return;
        }
        if (allowKiSuffix) {
          addUniquePretVariant(variants, "", "ki", {
            baseSpec: variant.baseSpec
          });
        }
        if (allowZeroSuffix) {
          addUniquePretVariant(variants, "", "", {
            baseSpec: variant.baseSpec
          });
        }
      });
      return variants.length ? variants : null;
    }
    function buildPretUniversalClassB(context) {
      const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
      const isAllowedStem = base => allowUnpronounceableStems || targetObject.isSyllableSequencePronounceable(base);
      const patterns = createPretDescriptorMatcher(context);
      const hasRightEdge = (query = {}) => targetObject.pretContextHasRightEdge(context, query);
      if (!context.isTransitive && context.fromRootPlusYa) {
        if (isSlashDenominalRootPlusYaMatrix(context)) {
          const rootPlusYaVerb = getRootPlusYaSurfaceVerb(context) || context.verb || "";
          const deletedYaBase = rootPlusYaVerb.endsWith("ya") ? rootPlusYaVerb.slice(0, -2) : context.rootPlusYaBase || rootPlusYaVerb;
          const baseSpec = rootPlusYaVerb.endsWith("ya") ? buildPretReplaceSuffixBaseSpec(rootPlusYaVerb, "ya", "") : buildPretLiteralBaseSpec(context.rootPlusYaBase || rootPlusYaVerb);
          if (!deletedYaBase || !isAllowedStem(deletedYaBase)) {
            return null;
          }
          return [buildPretVariant("", "k", {
            baseSpec
          })];
        }
        if (context.isWeya) {
          return [buildPretVariant("", "k", {
            baseSpec: buildPretLiteralBaseSpec(context.verb)
          })];
        }
        const rootPlusYaVerb = getRootPlusYaSurfaceVerb(context);
        const variants = [buildPretVariant("", "k", {
          baseSpec: buildPretLiteralBaseSpec(rootPlusYaVerb || context.verb)
        })].filter(Boolean);
        const rootPlusYaBase = context.rootPlusYaBase;
        const addRootPlusYaVariant = candidateBase => {
          if (!candidateBase || !isAllowedStem(candidateBase)) {
            return;
          }
          const baseSpec = targetObject.shouldCoalesceFinalI(candidateBase) ? buildPretCoalescedIBaseSpec(candidateBase) : buildPretLiteralBaseSpec(candidateBase);
          addUniquePretVariant(variants, "", targetObject.shouldCoalesceFinalI(candidateBase) ? "ka" : "k", {
            baseSpec
          });
        };
        const isShortRootPlusYaBase = (() => {
          if (!rootPlusYaBase) {
            return false;
          }
          const baseSyllables = targetObject.getSyllables(rootPlusYaBase, {
            analysis: true,
            assumeFinalV: true
          });
          if (baseSyllables.length !== 1) {
            return false;
          }
          const form = baseSyllables[0]?.form;
          return form === "V" || form === "CV" || form === "Vj";
        })();
        if (!isShortRootPlusYaBase && rootPlusYaBase) {
          addRootPlusYaVariant(rootPlusYaBase);
        }
        const slashEmbeddedYaBase = context.hasSlashMarker && rootPlusYaVerb.endsWith("ya") ? rootPlusYaVerb.slice(0, -2) : "";
        if (slashEmbeddedYaBase) {
          addRootPlusYaVariant(slashEmbeddedYaBase);
        }
        return variants;
      }
      const isShapeNaPattern = patterns.hasShapeEndingFamily("n+a");
      const isShapeNiPattern = patterns.hasShapeEndingFamily("n+i");
      const isShapeNiaPattern = patterns.hasShapeEndingFamily("n+ia");
      if (context.isTransitive && (isShapeNaPattern || isShapeNiPattern || isShapeNiaPattern)) {
        return null;
      }
      if (!context.isTransitive && targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV_CV)) {
        return null;
      }
      if (!context.isTransitive && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.waPattern)) {
        if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cuwa)) {
          return [buildPretVariant("", "k", {
            baseSpec: buildPretLiteralBaseSpec(context.verb)
          })];
        }
        if (context.isReduplicated || !targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.waCV_CV_CV)) {
          return null;
        }
        return [buildPretVariant("", "k", {
          baseSpec: buildPretLiteralBaseSpec(context.verb)
        })];
      }
      if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvsV) && !hasRightEdge({
        finalForm: "V",
        finalNucleus: "u"
      })) {
        if (context.lastNucleus !== "i" || context.isTransitive) {
          return null;
        }
      }
      if (context.vowelCount !== 1) {
        return null;
      }
      if (!isAllowedStem(context.verb)) {
        return null;
      }
      const variants = [buildPretVariant("", "k", {
        baseSpec: buildPretLiteralBaseSpec(context.verb)
      })].filter(Boolean);
      const disallowRootPlusYa = context.analysisVerb === "ya" && (context.hasSlashMarker || context.hasSuffixSeparator || context.hasLeadingDash);
      const rootPlusYaBase = disallowRootPlusYa ? null : context.rootPlusYaBasePronounceable || "";
      if (rootPlusYaBase) {
        let base = rootPlusYaBase;
        const suffix = targetObject.shouldCoalesceFinalI(base) ? "ka" : "k";
        const baseSpec = targetObject.shouldCoalesceFinalI(base) ? buildPretCoalescedIBaseSpec(base) : buildPretLiteralBaseSpec(base);
        addUniquePretVariant(variants, "", suffix, {
          baseSpec
        });
      }
      return variants;
    }
    function getPretUniversalVariants(verb, tense, isTransitive, analysisVerb = verb, options = {}) {
      const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tense];
      if (!classKey) {
        return null;
      }
      const context = targetObject.buildPretUniversalContext(verb, analysisVerb, isTransitive, options);
      if (!isTransitive && ["k", "kw"].includes(context?.rightEdgeDescriptor?.finalOnset || "") && (context?.rightEdgeDescriptor?.finalNucleus || "") !== "u") {
        context.allowIntransitiveKV = true;
      }
      const candidates = targetObject.getPretUniversalClassCandidates(context);
      if (!candidates.has(classKey)) {
        return null;
      }
      switch (classKey) {
        case "A":
          return buildPretUniversalClassA(context);
        case "B":
          return buildPretUniversalClassB(context);
        case "C":
          return buildPretUniversalClassC(context);
        case "D":
          return buildPretUniversalClassD(context);
        default:
          return null;
      }
    }
    function getPronounceableClassBFallback(context) {
      if (!context || !context.verb) {
        return null;
      }
      const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
      if (!allowUnpronounceableStems && !targetObject.isSyllableSequencePronounceable(context.verb)) {
        return null;
      }
      return [buildPretVariant("", "k", {
        baseSpec: buildPretLiteralBaseSpec(context.verb)
      })];
    }
    function getPretUniversalVariantsByClass(context) {
      const candidates = targetObject.getPretUniversalClassCandidates(context);
      const variantsByClass = new Map();
      if (candidates.has("A")) {
        const variants = buildPretUniversalClassA(context);
        if (variants) {
          variantsByClass.set("A", variants);
        }
      }
      if (candidates.has("B")) {
        const variants = buildPretUniversalClassB(context);
        if (variants) {
          variantsByClass.set("B", variants);
        }
      }
      if (candidates.has("C")) {
        const variants = buildPretUniversalClassC(context);
        if (variants) {
          variantsByClass.set("C", variants);
        }
      }
      if (candidates.has("D")) {
        const variants = buildPretUniversalClassD(context);
        if (variants) {
          variantsByClass.set("D", variants);
        }
      }
      if (!variantsByClass.size) {
        const fallback = getPronounceableClassBFallback(context);
        if (fallback) {
          variantsByClass.set("B", fallback);
        }
      }
      return variantsByClass;
    }
    function splitDirectionalPrefixFromBase(base, directionalPrefix) {
      if (!directionalPrefix || directionalPrefix !== "wal") {
        return {
          directional: "",
          base
        };
      }
      if (base.startsWith(directionalPrefix)) {
        return {
          directional: directionalPrefix,
          base: base.slice(directionalPrefix.length)
        };
      }
      return {
        directional: "",
        base
      };
    }
    function maybeShortenZeroBitransitiveKi(prefix, baseSubjectPrefix, allowZeroBitransitiveDrop) {
      if (!allowZeroBitransitiveDrop) {
        return prefix;
      }
      if (prefix === "ki" && ["ni", "ti"].includes(baseSubjectPrefix)) {
        return "k";
      }
      return prefix;
    }
    function composePretUniversalObjectPrefix({
      objectPrefix = "",
      baseSubjectPrefix = "",
      indirectObjectMarker = "",
      hasDoubleDash = false
    }) {
      const allowZeroBitransitiveDrop = shouldAllowZeroBitransitiveKiDrop({
        hasDoubleDash,
        indirectObjectMarker
      });
      if (typeof targetObject.composeProjectiveObjectPrefix === "function") {
        return targetObject.composeProjectiveObjectPrefix({
          objectPrefix,
          markers: [indirectObjectMarker || ""],
          subjectPrefix: baseSubjectPrefix
        });
      }
      let adjustedObjectPrefix = objectPrefix;
      adjustedObjectPrefix = targetObject.applyIndirectObjectMarker(adjustedObjectPrefix, indirectObjectMarker);
      adjustedObjectPrefix = maybeShortenZeroBitransitiveKi(adjustedObjectPrefix, baseSubjectPrefix, allowZeroBitransitiveDrop);
      return adjustedObjectPrefix;
    }
    function shouldAllowZeroBitransitiveKiDrop({
      hasDoubleDash = false,
      indirectObjectMarker = ""
    }) {
      return hasDoubleDash && indirectObjectMarker === "ki";
    }
    function adjustPretNhBeforeVowel(prefix, base) {
      let adjustedPrefix = prefix || "";
      const adjustedBase = base || "";
      if (adjustedPrefix && adjustedBase && targetObject.VOWEL_START_RE?.test(adjustedBase) && adjustedPrefix.endsWith("n") && !adjustedPrefix.endsWith("nh") && adjustedPrefix.length >= 2 && targetObject.VOWEL_RE?.test(adjustedPrefix[adjustedPrefix.length - 2] || "")) {
        adjustedPrefix = `${adjustedPrefix}h`;
      }
      return {
        prefix: adjustedPrefix,
        base: adjustedBase
      };
    }
    function adjustPretPrefixBaseContact(prefix, base, baseSubjectPrefix = "", options = {}) {
      let adjustedPrefix = prefix || "";
      let adjustedBase = base || "";
      const shouldDropLeadingI = adjustedPrefix && adjustedPrefix.endsWith("i") && adjustedBase.startsWith("i");
      if (shouldDropLeadingI) {
        adjustedBase = adjustedBase.slice(1);
      }
      if (options.dropYAfterWal === true && adjustedBase.startsWith("ya")) {
        adjustedBase = adjustedBase.slice(1);
      }
      return adjustPretNhBeforeVowel(adjustedPrefix, adjustedBase);
    }
    function adjustPretComposedObjectPrefixContact({
      objectPrefix = "",
      base = "",
      baseSubjectPrefix = "",
      allowZeroBitransitiveDrop = false,
      dropYAfterWal = false
    }) {
      let adjustedObjectPrefix = objectPrefix;
      let adjustedBase = base;
      if (adjustedObjectPrefix.endsWith("k") && adjustedBase.startsWith("k")) {
        if (adjustedBase.startsWith("kw")) {
          adjustedObjectPrefix = adjustedObjectPrefix.slice(0, -1);
        } else {
          adjustedBase = adjustedBase.slice(1);
        }
      }
      return adjustPretPrefixBaseContact(adjustedObjectPrefix, adjustedBase, baseSubjectPrefix, {
        allowZeroBitransitiveDrop,
        dropYAfterWal
      });
    }
    function resolvePretObjectPrefixContact({
      objectPrefix = "",
      base = "",
      baseSubjectPrefix = "",
      indirectObjectMarker = "",
      hasDoubleDash = false,
      suppressBareKBeforeK = false,
      dropYAfterWal = false
    }) {
      const allowZeroBitransitiveDrop = shouldAllowZeroBitransitiveKiDrop({
        hasDoubleDash,
        indirectObjectMarker
      });
      let adjustedObjectPrefix = objectPrefix;
      if (suppressBareKBeforeK && adjustedObjectPrefix === "k" && base.startsWith("k") && !indirectObjectMarker) {
        adjustedObjectPrefix = "";
      }
      adjustedObjectPrefix = composePretUniversalObjectPrefix({
        objectPrefix: adjustedObjectPrefix,
        baseSubjectPrefix,
        indirectObjectMarker,
        hasDoubleDash
      });
      return adjustPretComposedObjectPrefixContact({
        objectPrefix: adjustedObjectPrefix,
        base,
        baseSubjectPrefix,
        allowZeroBitransitiveDrop,
        dropYAfterWal
      });
    }
    function getPretUniversalPrefixForBase(base, subjectPrefix, objectPrefix, directionalInputPrefix = "", directionalOutputPrefix = "", baseSubjectPrefix = subjectPrefix, baseObjectPrefix = objectPrefix, indirectObjectMarker = "", hasDoubleDash = false, isYawi = false) {
      const split = splitDirectionalPrefixFromBase(base, directionalInputPrefix);
      const outputDirectional = split.directional ? directionalOutputPrefix || split.directional : "";
      const baseCore = split.base;
      const dropYAfterWal = Boolean(isYawi && split.directional);
      if (!split.directional) {
        const contactAdjusted = resolvePretObjectPrefixContact({
          objectPrefix,
          base: baseCore,
          baseSubjectPrefix,
          indirectObjectMarker,
          hasDoubleDash,
          suppressBareKBeforeK: true,
          dropYAfterWal: false
        });
        return adjustPretNhBeforeVowel(subjectPrefix + contactAdjusted.prefix, contactAdjusted.base);
      }
      const isThirdPersonMarker = value => value === "ki" || value === "kin" || value === "k";
      const isThirdPersonObject = isThirdPersonMarker(baseObjectPrefix);
      const isShuntlineThirdPersonObject = !isThirdPersonObject && isThirdPersonMarker(indirectObjectMarker);
      const isThirdPersonSubject = baseSubjectPrefix === "" && subjectPrefix === "";
      const subjectHead = isThirdPersonSubject && outputDirectional === "al" && !isThirdPersonObject ? "k" : subjectPrefix;
      if (isThirdPersonObject && outputDirectional === "al") {
        const dropK = baseSubjectPrefix === "ni" || baseSubjectPrefix === "ti" || baseSubjectPrefix === "n" || baseSubjectPrefix === "t";
        const objectTail = baseObjectPrefix === "kin" ? "in" : "";
        const objectHead = targetObject.applyIndirectObjectMarker(`${dropK ? "" : "k"}${objectTail}`, indirectObjectMarker);
        const directionalizedObjectHead = objectHead.startsWith("k") ? `k${outputDirectional}${objectHead.slice(1)}` : `${outputDirectional}${objectHead}`;
        return adjustPretNhBeforeVowel(`${subjectHead}${directionalizedObjectHead}`, dropYAfterWal && baseCore.startsWith("ya") ? baseCore.slice(1) : baseCore);
      }
      if (isShuntlineThirdPersonObject && outputDirectional === "al") {
        const allowZeroBitransitiveDrop = shouldAllowZeroBitransitiveKiDrop({
          hasDoubleDash,
          indirectObjectMarker
        });
        let adjustedObjectPrefix = composePretUniversalObjectPrefix({
          objectPrefix,
          baseSubjectPrefix,
          indirectObjectMarker,
          hasDoubleDash
        });
        let adjustedBase = baseCore;
        const startsWithK = adjustedObjectPrefix.startsWith("k");
        const objectTail = startsWithK ? adjustedObjectPrefix === "kin" ? "in" : "" : adjustedObjectPrefix;
        const isSecondPluralSubject = baseSubjectPrefix === "an" || subjectPrefix === "an";
        if (startsWithK && isSecondPluralSubject) {
          adjustedObjectPrefix = `k${outputDirectional}${objectTail}`;
        } else if (startsWithK) {
          adjustedObjectPrefix = `${outputDirectional}${objectTail}`;
        } else {
          adjustedObjectPrefix = `${outputDirectional}${adjustedObjectPrefix}`;
        }
        const contactAdjusted = adjustPretComposedObjectPrefixContact({
          objectPrefix: adjustedObjectPrefix,
          base: adjustedBase,
          baseSubjectPrefix,
          allowZeroBitransitiveDrop,
          dropYAfterWal
        });
        return adjustPretNhBeforeVowel(subjectHead + contactAdjusted.prefix, contactAdjusted.base);
      }
      const contactAdjusted = resolvePretObjectPrefixContact({
        objectPrefix,
        base: baseCore,
        baseSubjectPrefix,
        indirectObjectMarker,
        hasDoubleDash,
        suppressBareKBeforeK: true,
        dropYAfterWal
      });
      return adjustPretNhBeforeVowel(subjectHead + outputDirectional + contactAdjusted.prefix, contactAdjusted.base);
    }
    function normalizePretYawiPreteriteVariants(variants, tense, isYawi) {
      return variants;
    }
    function buildPretUniversalResultDetailedFromVariants(variants, subjectPrefix, objectPrefix, subjectSuffix, directionalInputPrefix = "", directionalOutputPrefix = "", baseSubjectPrefix = subjectPrefix, baseObjectPrefix = objectPrefix, pluralSuffix = null, indirectObjectMarker = "", hasDoubleDash = false, isYawi = false, hasOptionalSupportiveI = false, optionalSupportiveLetter = "") {
      if (!variants || variants.length === 0) {
        return {
          result: null,
          forms: []
        };
      }
      const canUseSegments = typeof targetObject.buildOutputWordSegments === "function" && typeof targetObject.joinOutputWordSegments === "function";
      // Realize a verb core + suffix into a surface text string.
      // When segments are available, buildOutputWordSegments handles the supportive
      // marker and the universal m→n rule (stem-final "m"→"n" before any suffix).
      // For the zero-suffix case the m→n rule must be applied explicitly because
      // buildOutputWordSegments only fires it when subjectSuffix is truthy.
      const realizeForm = (verbCore, suffix, surfaceRuleMeta = null) => {
        if (canUseSegments) {
          const segments = targetObject.buildOutputWordSegments({
            subjectPrefix: "",
            objectPrefix: "",
            verb: verbCore,
            subjectSuffix: suffix || "",
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
            surfaceRuleMeta
          });
          const text = targetObject.joinOutputWordSegments(segments);
          if (!suffix && text.endsWith("m")) {
            return `${text.slice(0, -1)}n`;
          }
          return text;
        }
        // String fallback when output-segment helpers are not loaded.
        const coreRaw = typeof targetObject.resolveOptionalSupportiveOutputVerb === "function" ? targetObject.resolveOptionalSupportiveOutputVerb({
          subjectPrefix: "",
          objectPrefix: "",
          verb: verbCore,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        }) : verbCore;
        const core = coreRaw.endsWith("m") ? `${coreRaw.slice(0, -1)}n` : coreRaw;
        return `${core}${suffix || ""}`;
      };
      const isPlural = subjectSuffix === "t";
      if (isPlural) {
        const resolvedPluralSuffix = pluralSuffix || "ket";
        const seen = new Set();
        const results = [];
        variants.forEach(variant => {
          const variantBase = getPretVariantBase(variant);
          const surfaceRuleMeta = getPretVariantSurfaceRuleMeta(variant);
          const {
            prefix,
            base
          } = getPretUniversalPrefixForBase(variantBase, subjectPrefix, objectPrefix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, indirectObjectMarker, hasDoubleDash, isYawi);
          const form = realizeForm(`${prefix}${base}`, resolvedPluralSuffix, surfaceRuleMeta);
          if (!seen.has(form)) {
            seen.add(form);
            results.push(form);
          }
        });
        return {
          result: results.join(" / "),
          forms: results
        };
      }
      const groups = new Map();
      const order = [];
      variants.forEach(variant => {
        const variantBase = getPretVariantBase(variant);
        const variantSuffix = getPretVariantSuffix(variant);
        const surfaceRuleMeta = getPretVariantSurfaceRuleMeta(variant);
        const {
          prefix,
          base
        } = getPretUniversalPrefixForBase(variantBase, subjectPrefix, objectPrefix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, indirectObjectMarker, hasDoubleDash, isYawi);
        const verbCore = `${prefix}${base}`;
        // Compute the deduplication key using the zero-suffix realized form.
        const baseKey = realizeForm(verbCore, "", surfaceRuleMeta);
        let entry = groups.get(baseKey);
        if (!entry) {
          entry = {
            suffixes: new Set(),
            order: [],
            verbCore,
            surfaceRuleMeta
          };
          groups.set(baseKey, entry);
          order.push(baseKey);
        }
        if (!entry.suffixes.has(variantSuffix)) {
          entry.suffixes.add(variantSuffix);
          entry.order.push(variantSuffix);
        }
      });
      const results = [];
      order.forEach(baseKey => {
        const entry = groups.get(baseKey);
        const {
          verbCore,
          surfaceRuleMeta
        } = entry;
        const hasEmpty = entry.suffixes.has("");
        const hasKi = entry.suffixes.has("ki");
        let emittedOptional = false;
        let emittedBase = false;
        if (hasEmpty && hasKi) {
          results.push(`${realizeForm(verbCore, "", surfaceRuleMeta)}(ki)`);
          emittedOptional = true;
        } else if (hasEmpty) {
          results.push(realizeForm(verbCore, "", surfaceRuleMeta));
          emittedBase = true;
        }
        entry.order.forEach(suffix => {
          if (suffix === "") {
            if (!emittedOptional && !emittedBase) {
              results.push(realizeForm(verbCore, "", surfaceRuleMeta));
              emittedBase = true;
            }
            return;
          }
          if (suffix === "ki") {
            if (emittedOptional) {
              return;
            }
            results.push(realizeForm(verbCore, "ki", surfaceRuleMeta));
            return;
          }
          results.push(realizeForm(verbCore, suffix, surfaceRuleMeta));
        });
      });
      return {
        result: results.join(" / "),
        forms: results
      };
    }
    function buildPretUniversalResultFromVariants(variants, subjectPrefix, objectPrefix, subjectSuffix, directionalInputPrefix = "", directionalOutputPrefix = "", baseSubjectPrefix = subjectPrefix, baseObjectPrefix = objectPrefix, pluralSuffix = null, indirectObjectMarker = "", hasDoubleDash = false, isYawi = false, hasOptionalSupportiveI = false, optionalSupportiveLetter = "") {
      return buildPretUniversalResultDetailedFromVariants(variants, subjectPrefix, objectPrefix, subjectSuffix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, pluralSuffix, indirectObjectMarker, hasDoubleDash, isYawi, hasOptionalSupportiveI, optionalSupportiveLetter).result;
    }
    function buildNonactivePerfectiveResult({
      verb,
      subjectPrefix,
      objectPrefix,
      subjectSuffix,
      tense,
      directionalInputPrefix = "",
      directionalOutputPrefix = "",
      baseSubjectPrefix = subjectPrefix,
      baseObjectPrefix = objectPrefix,
      indirectObjectMarker = "",
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = ""
    }) {
      const buildNonactivePerfectiveWordResult = ({
        verb: resultVerb = "",
        subjectSuffix: resultSubjectSuffix = ""
      } = {}) => {
        if (typeof targetObject.buildOutputWordSegments === "function") {
          const segments = targetObject.buildOutputWordSegments({
            subjectPrefix: "",
            objectPrefix: "",
            verb: resultVerb,
            subjectSuffix: resultSubjectSuffix,
            hasOptionalSupportiveI,
            optionalSupportiveLetter
          });
          const text = typeof targetObject.joinOutputWordSegments === "function" ? targetObject.joinOutputWordSegments(segments) : Array.isArray(segments) ? segments.map(segment => String(segment?.value || "")).join("") : "";
          return {
            text,
            segments
          };
        }
        const resolvedCore = typeof targetObject.resolveOptionalSupportiveOutputVerb === "function" ? targetObject.resolveOptionalSupportiveOutputVerb({
          subjectPrefix: "",
          objectPrefix: "",
          verb: resultVerb,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        }) : resultVerb;
        return {
          text: `${resolvedCore}${resultSubjectSuffix || ""}`,
          segments: null
        };
      };
      const suffix = subjectSuffix === "t" ? tense === "preterito" ? "ket" : subjectSuffix : tense === "preterito" ? "k" : subjectSuffix || "";
      const {
        prefix,
        base
      } = getPretUniversalPrefixForBase(verb, subjectPrefix, objectPrefix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, indirectObjectMarker);
      const wordResult = buildNonactivePerfectiveWordResult({
        verb: `${prefix}${base}`,
        subjectSuffix: suffix
      });
      return {
        ...wordResult,
        forms: wordResult.text && wordResult.text !== "—" ? [wordResult.text] : []
      };
    }
    function getKVClassPolicy({
      context,
      isTransitive,
      isPreterit,
      classFilter,
      baseObjectPrefix,
      hasClassA,
      hasClassB,
      allowAllClasses = false
    }) {
      const patterns = createPretDescriptorMatcher(context);
      const hasRightEdge = (query = {}) => targetObject.pretContextHasRightEdge(context, query);
      const rightEdgeDescriptor = context?.rightEdgeDescriptor || {};
      const isRootPlusYaIntransitive = !!(context && !context.isTransitive && context.fromRootPlusYa);
      const isTVEnding = !!(context && rightEdgeDescriptor.finalOnset === "t");
      const mvSource = context?.analysisVerb || context?.verb || "";
      const isMVEnding = !!(context && !isTransitive && (hasRightEdge({
        finalOnset: "m",
        finalNuclei: ["a", "i"]
      }) || /m[ai]$/.test(mvSource)));
      const allowSlashAkiZero = !!(context && !isTransitive && context.hasSlashMarker && context.analysisVerb === "aki");
      if (allowSlashAkiZero) {
        return {
          shouldMaskClassBSelection: false,
          shouldSkipClassA: false,
          shouldSkipClassB: false
        };
      }
      const allowClassBWithA = !allowAllClasses && context && !isTransitive && (targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.waCV_CV_CV) && !context.isReduplicated || patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvna));
      const baseMaskClassB = !allowAllClasses && classFilter === "B" && !isTransitive && !isPreterit && !isRootPlusYaIntransitive && !isTVEnding && !isMVEnding && !allowClassBWithA && hasClassA && hasClassB;
      const baseSkipClassB = !allowAllClasses && !isTransitive && !isPreterit && !classFilter && !isRootPlusYaIntransitive && !isTVEnding && !isMVEnding && !allowClassBWithA && hasClassA && hasClassB;
      if (!context || !hasClassA || !hasClassB) {
        return {
          shouldMaskClassBSelection: baseMaskClassB,
          shouldSkipClassA: false,
          shouldSkipClassB: baseSkipClassB
        };
      }
      const forceClassAForKWV = context.forceClassAForKWV;
      const allowBothForKi = isTransitive && baseObjectPrefix === "ki";
      const isKOnlyNoU = ["k", "kw"].includes(rightEdgeDescriptor.finalOnset || "") && (rightEdgeDescriptor.finalNucleus || "") !== "u";
      const preferClassBForKV = !allowAllClasses && isPreterit && !classFilter && isKOnlyNoU && !allowBothForKi;
      const preferClassAForKV = !allowAllClasses && !isPreterit && !classFilter && isKOnlyNoU;
      return {
        shouldMaskClassBSelection: baseMaskClassB || classFilter === "B" && forceClassAForKWV,
        shouldSkipClassA: preferClassBForKV,
        shouldSkipClassB: baseSkipClassB || preferClassAForKV || forceClassAForKWV
      };
    }
    function makePretClassPolicyState(policy = {}) {
      return {
        shouldMaskClassBSelection: Boolean(policy.shouldMaskClassBSelection),
        shouldSkipClassA: Boolean(policy.shouldSkipClassA),
        shouldSkipClassB: Boolean(policy.shouldSkipClassB)
      };
    }
    function buildPretClassPolicyResult(isPreterit, state = {}) {
      return {
        isPreterit,
        shouldMaskClassBSelection: Boolean(state.shouldMaskClassBSelection),
        shouldSkipClassA: Boolean(state.shouldSkipClassA),
        shouldSkipClassB: Boolean(state.shouldSkipClassB)
      };
    }
    function buildForcedClassBPolicyResult(isPreterit) {
      return {
        isPreterit,
        shouldMaskClassBSelection: false,
        shouldSkipClassA: true,
        shouldSkipClassB: false
      };
    }
    function buildPretOpenClassPolicyResult(isPreterit) {
      return buildPretClassPolicyResult(isPreterit, {
        shouldMaskClassBSelection: false,
        shouldSkipClassA: false,
        shouldSkipClassB: false
      });
    }
    function buildPretSkipClassBPolicyResult(isPreterit, classFilter) {
      return buildPretClassPolicyResult(isPreterit, {
        shouldMaskClassBSelection: classFilter === "B",
        shouldSkipClassA: false,
        shouldSkipClassB: true
      });
    }
    function isPretPolicyPreteritSingular(ruleContext) {
      return Boolean(ruleContext?.isPreterit && ruleContext?.subjectSuffix !== "t");
    }
    function applyPretSkipClassBState(state, ruleContext) {
      const next = makePretClassPolicyState(state);
      next.shouldSkipClassB = true;
      if (ruleContext?.classFilter === "B") {
        next.shouldMaskClassBSelection = true;
      }
      return next;
    }
    function applyPretPreferClassBState(state, ruleContext) {
      const next = makePretClassPolicyState(state);
      next.shouldSkipClassA = Boolean(ruleContext?.hasClassB);
      next.shouldSkipClassB = false;
      next.shouldMaskClassBSelection = false;
      return next;
    }
    function applyPretSingularElseSkipClassBState(state, ruleContext) {
      return isPretPolicyPreteritSingular(ruleContext) ? applyPretPreferClassBState(state, ruleContext) : applyPretSkipClassBState(state, ruleContext);
    }
    function applyPretClassPolicyRulePipeline({
      state,
      ruleContext,
      rules = [],
      isPreterit = false
    }) {
      let nextState = makePretClassPolicyState(state);
      for (const rule of rules) {
        if (!rule || typeof rule.when !== "function" || typeof rule.run !== "function") {
          continue;
        }
        if (!rule.when(ruleContext, nextState)) {
          continue;
        }
        const outcome = rule.run(ruleContext, nextState) || {};
        if (outcome.state) {
          nextState = makePretClassPolicyState(outcome.state);
        }
        if (outcome.terminal) {
          return {
            terminated: true,
            policy: outcome.policy || buildPretClassPolicyResult(isPreterit, nextState)
          };
        }
      }
      return {
        terminated: false,
        policy: buildPretClassPolicyResult(isPreterit, nextState)
      };
    }
    function resolvePretClassPolicy({
      context,
      tense,
      isTransitive,
      classFilter,
      baseObjectPrefix,
      hasClassA,
      hasClassB,
      allowAllClasses = false,
      subjectSuffix = ""
    }) {
      const isPreterit = tense === "preterito";
      const patterns = createPretDescriptorMatcher(context);
      const forceClassBOnly = Array.isArray(context?.verbOverride?.classes) && context.verbOverride.classes.length === 1 && context.verbOverride.classes[0] === "B";
      const state = makePretClassPolicyState(getKVClassPolicy({
        context,
        isTransitive,
        isPreterit,
        classFilter,
        baseObjectPrefix,
        hasClassA,
        hasClassB,
        allowAllClasses
      }));
      const ruleContext = {
        context,
        classFilter,
        hasClassA,
        hasClassB,
        subjectSuffix,
        isPreterit,
        forceClassBOnly,
        isCJunctureIntransitive: Boolean(context && !context.isTransitive && context.hasCJunctureIntransitive),
        isRootPlusYaIntransitive: Boolean(context && !context.isTransitive && context.fromRootPlusYa),
        isDenominalWiFromVowelSource: Boolean(context && context.isDenominalMatrixInput && context.isDenominalWiMatrix && context.denominalSourceEndsWithVowel),
        isWiPattern: Boolean(context && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.wiPattern) && !context.isTransitive && !context.fromRootPlusYa),
        isCVliPattern: Boolean(context && !context.isTransitive && (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvlv) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vlv) || targetObject.pretContextHasAnyRightEdge(context, [{
          rightEdgeProfileSuffixes: ["Vl|V", "CVl|V"]
        }])) && context.lastNucleus === "i"),
        isCVpVPattern: Boolean(context && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvpV) && !context.isTransitive),
        isIntransitivePiPattern: Boolean(context && !context.isTransitive && targetObject.pretContextHasRightEdge(context, {
          endingFamily: "p+i"
        }) && !context.isMonosyllable),
        isCVVniPattern: Boolean(context && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvvni) && !context.isTransitive)
      };
      const rules = [{
        name: "force-class-b-only",
        when: ctx => ctx.forceClassBOnly,
        run: () => ({
          terminal: true,
          policy: buildForcedClassBPolicyResult(isPreterit)
        })
      }, {
        name: "c-juncture-intransitive",
        when: ctx => ctx.isCJunctureIntransitive,
        run: () => ({
          terminal: true,
          policy: buildForcedClassBPolicyResult(isPreterit)
        })
      }, {
        name: "root-plus-ya-intransitive",
        when: ctx => ctx.isRootPlusYaIntransitive,
        run: (ctx, currentState) => ({
          terminal: true,
          policy: buildPretClassPolicyResult(isPreterit, currentState)
        })
      }, {
        name: "denominal-wi-vowel-source",
        when: ctx => ctx.isDenominalWiFromVowelSource,
        run: ctx => ({
          terminal: true,
          policy: ctx.isPreterit ? buildPretOpenClassPolicyResult(ctx.isPreterit) : buildPretSkipClassBPolicyResult(ctx.isPreterit, ctx.classFilter)
        })
      }, {
        name: "wi-pattern",
        when: ctx => ctx.isWiPattern,
        run: (ctx, currentState) => {
          if (ctx.context.isMonosyllable) {
            return {
              terminal: true,
              policy: buildForcedClassBPolicyResult(ctx.isPreterit)
            };
          }
          const isReduplicated = ctx.context.isReduplicated;
          if (isReduplicated) {
            return {
              state: applyPretSkipClassBState(currentState, ctx)
            };
          }
          return {
            state: applyPretSingularElseSkipClassBState(currentState, ctx)
          };
        }
      }, {
        name: "cvli-pattern",
        when: ctx => ctx.isCVliPattern,
        run: (ctx, currentState) => {
          const penult = ctx.context.penultimateNucleus;
          if (penult === "e") {
            return {
              state: applyPretPreferClassBState(currentState, ctx)
            };
          } else if (penult === "u") {
            return {
              state: isPretPolicyPreteritSingular(ctx) ? applyPretPreferClassBState(currentState, ctx) : applyPretSkipClassBState(currentState, ctx)
            };
          }
          return {
            state: makePretClassPolicyState(currentState)
          };
        }
      }, {
        name: "cvpv-pattern",
        when: ctx => ctx.isCVpVPattern,
        run: (ctx, currentState) => ({
          state: applyPretSingularElseSkipClassBState(currentState, ctx)
        })
      }, {
        name: "intransitive-pi-pattern",
        when: ctx => ctx.isIntransitivePiPattern,
        run: (ctx, currentState) => ({
          state: applyPretSingularElseSkipClassBState(currentState, ctx)
        })
      }, {
        name: "cvvni-pattern",
        when: ctx => ctx.isCVVniPattern,
        run: (ctx, currentState) => ({
          state: applyPretSingularElseSkipClassBState(currentState, ctx)
        })
      }];
      return applyPretClassPolicyRulePipeline({
        state,
        ruleContext,
        rules,
        isPreterit
      }).policy;
    }
    function buildClassBasedResult({
      verb,
      subjectPrefix,
      objectPrefix,
      subjectSuffix,
      tense,
      analysisVerb,
      exactBaseVerb,
      classFilter = null,
      allowAllClasses = false,
      isYawi = false,
      isWeya = false,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasLeadingDash = false,
      hasBoundMarker = false,
      hasCompoundMarker = false,
      hasImpersonalTaPrefix = false,
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = "",
      hasNonspecificValence = false,
      rootPlusYaBase = "",
      rootPlusYaBasePronounceable = "",
      derivationType = "",
      directionalInputPrefix = "",
      directionalOutputPrefix = "",
      baseSubjectPrefix = subjectPrefix,
      baseObjectPrefix = objectPrefix,
      suppletiveStemSet = null,
      forceTransitive = false,
      indirectObjectMarker = "",
      hasDoubleDash = false,
      forceClassBSelection = false,
      forceClassBOnly = false
    }) {
      const resolvedClassFilter = forceClassBOnly ? "B" : classFilter;
      const resolvedForceClassBSelection = forceClassBOnly || forceClassBSelection;
      const analysisTarget = targetObject.getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker
      });
      const isTransitive = forceTransitive || objectPrefix !== "";
      const isBitransitive = Boolean(baseObjectPrefix && (indirectObjectMarker || hasNonspecificValence));
      let variantsByClass = null;
      let context = null;
      if (suppletiveStemSet) {
        variantsByClass = suppletiveStemSet.variantsByClass;
      } else {
        context = targetObject.buildPretUniversalContext(verb, analysisTarget, isTransitive, {
          isYawi,
          isWeya,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasNonspecificValence,
          isBitransitive,
          exactBaseVerb,
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          derivationType,
          forceClassBOnly
        });
        if (!isTransitive && ["k", "kw"].includes(context?.rightEdgeDescriptor?.finalOnset || "") && (context?.rightEdgeDescriptor?.finalNucleus || "") !== "u" && tense !== "preterito") {
          context.allowIntransitiveKV = true;
        }
        variantsByClass = getPretUniversalVariantsByClass(context);
      }
      if (!variantsByClass.size) {
        return null;
      }
      const classOrder = resolvedClassFilter ? [resolvedClassFilter] : typeof targetObject.getPretUniversalClassOrder === "function" ? targetObject.getPretUniversalClassOrder() : ["A", "B", "C", "D"];
      const hasClassA = variantsByClass.has("A");
      const hasClassB = variantsByClass.has("B");
      let {
        isPreterit,
        shouldMaskClassBSelection,
        shouldSkipClassA,
        shouldSkipClassB
      } = resolvePretClassPolicy({
        context,
        tense,
        isTransitive,
        classFilter: resolvedClassFilter,
        baseObjectPrefix,
        hasClassA,
        hasClassB,
        allowAllClasses,
        subjectSuffix
      });
      if (resolvedForceClassBSelection && resolvedClassFilter === "B") {
        shouldMaskClassBSelection = false;
        shouldSkipClassA = true;
        shouldSkipClassB = false;
      }
      const usePretPluralOverride = isPreterit && subjectSuffix === "t" && suppletiveStemSet;
      const pretPluralSuffix = usePretPluralOverride ? suppletiveStemSet.pretPluralSuffix : null;
      const pretPluralClasses = usePretPluralOverride ? suppletiveStemSet.pretPluralClasses : null;
      const classExclusionsByTense = suppletiveStemSet?.classExclusionsByTense || null;
      const tenseVariantsByClass = suppletiveStemSet?.tenseVariantsByClass || null;
      const tenseClassVariants = tenseVariantsByClass && tenseVariantsByClass[tense] ? tenseVariantsByClass[tense] : null;
      const excludedClasses = classExclusionsByTense && classExclusionsByTense[tense] ? classExclusionsByTense[tense] : null;
      const results = [];
      const seen = new Set();
      if (shouldMaskClassBSelection) {
        return "—";
      }
      classOrder.forEach(classKey => {
        if (shouldSkipClassA && classKey === "A") {
          return;
        }
        if (shouldSkipClassB && classKey === "B") {
          return;
        }
        if (excludedClasses && excludedClasses.has(classKey)) {
          return;
        }
        if (pretPluralClasses && !pretPluralClasses.has(classKey)) {
          return;
        }
        const variants = normalizePretYawiPreteriteVariants(tenseClassVariants && tenseClassVariants.get(classKey) || variantsByClass.get(classKey), tense, isYawi);
        if (!variants || variants.length === 0) {
          return;
        }
        let classResult = null;
        if (isPreterit) {
          classResult = buildPretUniversalResultFromVariants(variants, subjectPrefix, objectPrefix, subjectSuffix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, pretPluralSuffix, indirectObjectMarker, hasDoubleDash, isYawi, hasOptionalSupportiveI, optionalSupportiveLetter);
        } else {
          const suffix = subjectSuffix || "";
          const bases = [];
          const seenBase = new Set();
          variants.forEach(variant => {
            const variantBase = getPretVariantBase(variant);
            if (!seenBase.has(variantBase)) {
              seenBase.add(variantBase);
              bases.push(variantBase);
            }
          });
          const forms = [];
          const seenForm = new Set();
          bases.forEach(base => {
            const {
              prefix,
              base: baseCore
            } = getPretUniversalPrefixForBase(base, subjectPrefix, objectPrefix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, indirectObjectMarker, hasDoubleDash, isYawi);
            const resolvedCore = typeof targetObject.resolveOptionalSupportiveOutputVerb === "function" ? targetObject.resolveOptionalSupportiveOutputVerb({
              subjectPrefix: "",
              objectPrefix: "",
              verb: `${prefix}${baseCore}`,
              hasOptionalSupportiveI,
              optionalSupportiveLetter
            }) : `${prefix}${baseCore}`;
            // Universal m→n rule: stem-final "m" always converts to "n"
            const rawCore = resolvedCore.endsWith("m") ? `${resolvedCore.slice(0, -1)}n` : resolvedCore;
            const form = `${rawCore}${suffix}`;
            if (!seenForm.has(form)) {
              seenForm.add(form);
              forms.push(form);
            }
          });
          classResult = forms.join(" / ");
        }
        if (!classResult) {
          return;
        }
        classResult.split(" / ").forEach(form => {
          if (!seen.has(form)) {
            seen.add(form);
            results.push(form);
          }
        });
      });
      return results.join(" / ");
    }
    function buildPretUniversalProvenance({
      verb,
      analysisTarget,
      tense,
      classKey,
      isTransitive,
      context,
      variants,
      subjectSuffix,
      blockedReason = null,
      suppletiveStemSet = null
    }) {
      return {
        verb,
        analysisTarget,
        tense,
        classKey,
        isTransitive,
        stemPath: context?.stemPath || null,
        fromRootPlusYa: Boolean(context?.fromRootPlusYa),
        isMonosyllable: Boolean(context?.isMonosyllable),
        variants: (variants || []).map(variant => buildPretProvenanceVariantEntry(variant)),
        subjectSuffix,
        blockedReason,
        usesSuppletiveSet: Boolean(suppletiveStemSet)
      };
    }
    function buildPretUniversalResultWithProvenance({
      verb,
      subjectPrefix,
      objectPrefix,
      subjectSuffix,
      tense,
      analysisVerb,
      exactBaseVerb,
      isYawi = false,
      isWeya = false,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasLeadingDash = false,
      hasBoundMarker = false,
      hasCompoundMarker = false,
      hasImpersonalTaPrefix = false,
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = "",
      hasNonspecificValence = false,
      rootPlusYaBase = "",
      rootPlusYaBasePronounceable = "",
      derivationType = "",
      directionalInputPrefix = "",
      directionalOutputPrefix = "",
      baseSubjectPrefix = subjectPrefix,
      baseObjectPrefix = objectPrefix,
      suppletiveStemSet = null,
      forceTransitive = false,
      indirectObjectMarker = "",
      hasDoubleDash = false,
      forceClassBOnly = false
    }) {
      const analysisTarget = targetObject.getDerivationRuleBase(analysisVerb || verb, {
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker
      });
      const isTransitive = forceTransitive || objectPrefix !== "";
      const isBitransitive = Boolean(baseObjectPrefix && (indirectObjectMarker || hasNonspecificValence));
      const classKey = forceClassBOnly ? "B" : targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tense];
      let context = null;
      let variants = null;
      let pluralSuffix = null;
      let blockedReason = null;
      if (classKey === "B") {
        context = targetObject.buildPretUniversalContext(verb, analysisTarget, isTransitive, {
          isYawi,
          isWeya,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasNonspecificValence,
          isBitransitive,
          exactBaseVerb,
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          derivationType,
          forceClassBOnly
        });
        const candidates = targetObject.getPretUniversalClassCandidates(context);
        const classAVariants = normalizePretYawiPreteriteVariants(candidates.has("A") ? buildPretUniversalClassA(context) : null, tense, isYawi);
        const hasClassAVariants = Array.isArray(classAVariants) && classAVariants.length > 0;
        if (context.forceClassAForKWV) {
          if (hasClassAVariants) {
            blockedReason = "class-b-fallback-to-a-kwv";
            const {
              result: resultKWV,
              forms: formsKWV
            } = buildPretUniversalResultDetailedFromVariants(classAVariants, subjectPrefix, objectPrefix, subjectSuffix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, null, indirectObjectMarker, hasDoubleDash, isYawi, hasOptionalSupportiveI, optionalSupportiveLetter);
            return {
              result: resultKWV,
              forms: formsKWV,
              provenance: buildPretUniversalProvenance({
                verb,
                analysisTarget,
                tense,
                classKey,
                isTransitive,
                context,
                variants: classAVariants,
                subjectSuffix,
                blockedReason,
                suppletiveStemSet
              })
            };
          }
        }
        if (!isTransitive && !context.fromRootPlusYa) {
          const mvSource = context.analysisVerb || context.verb || "";
          const isMVEnding = targetObject.pretContextHasRightEdge(context, {
            finalOnset: "m",
            finalNuclei: ["a", "i"]
          }) || /m[ai]$/.test(mvSource);
          const patterns = createPretDescriptorMatcher(context);
          const allowClassBWithA = (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvsV) && context.lastNucleus === "i" || targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.waCV_CV_CV)) && !isTransitive && !context.isReduplicated;
          if (candidates.has("A") && hasClassAVariants && !isMVEnding && !allowClassBWithA) {
            blockedReason = "class-b-fallback-to-a";
            const {
              result: resultFallbackA,
              forms: formsFallbackA
            } = buildPretUniversalResultDetailedFromVariants(classAVariants, subjectPrefix, objectPrefix, subjectSuffix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, null, indirectObjectMarker, hasDoubleDash, isYawi, hasOptionalSupportiveI, optionalSupportiveLetter);
            return {
              result: resultFallbackA,
              forms: formsFallbackA,
              provenance: buildPretUniversalProvenance({
                verb,
                analysisTarget,
                tense,
                classKey,
                isTransitive,
                context,
                variants: classAVariants,
                subjectSuffix,
                blockedReason,
                suppletiveStemSet
              })
            };
          }
        }
      }
      if (suppletiveStemSet && classKey) {
        if (subjectSuffix === "t" && suppletiveStemSet.pretPluralClasses && !suppletiveStemSet.pretPluralClasses.has(classKey)) {
          blockedReason = "suppletive-plural-class-blocked";
          context = context || targetObject.buildPretUniversalContext(verb, analysisTarget, isTransitive, {
            isYawi,
            isWeya,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            isBitransitive,
            exactBaseVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            derivationType,
            forceClassBOnly
          });
          return {
            result: null,
            forms: [],
            provenance: buildPretUniversalProvenance({
              verb,
              analysisTarget,
              tense,
              classKey,
              isTransitive,
              context,
              variants,
              subjectSuffix,
              blockedReason,
              suppletiveStemSet
            })
          };
        }
        variants = normalizePretYawiPreteriteVariants(suppletiveStemSet.variantsByClass.get(classKey) || null, tense, isYawi);
        if (subjectSuffix === "t" && suppletiveStemSet.pretPluralSuffix) {
          pluralSuffix = suppletiveStemSet.pretPluralSuffix;
        }
      } else {
        variants = normalizePretYawiPreteriteVariants(getPretUniversalVariants(verb, tense, isTransitive, analysisTarget, {
          isYawi,
          isWeya,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasNonspecificValence,
          isBitransitive,
          exactBaseVerb,
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          derivationType,
          forceClassBOnly
        }), tense, isYawi);
      }
      if (!context) {
        context = targetObject.buildPretUniversalContext(verb, analysisTarget, isTransitive, {
          isYawi,
          isWeya,
          hasSlashMarker,
          hasSuffixSeparator,
          hasLeadingDash,
          hasBoundMarker,
          hasCompoundMarker,
          hasImpersonalTaPrefix,
          hasOptionalSupportiveI,
          hasNonspecificValence,
          isBitransitive,
          exactBaseVerb,
          rootPlusYaBase,
          rootPlusYaBasePronounceable,
          derivationType,
          forceClassBOnly
        });
      }
      if (!variants || variants.length === 0) {
        blockedReason = blockedReason || "no-variants";
        return {
          result: null,
          forms: [],
          provenance: buildPretUniversalProvenance({
            verb,
            analysisTarget,
            tense,
            classKey,
            isTransitive,
            context,
            variants,
            subjectSuffix,
            blockedReason,
            suppletiveStemSet
          })
        };
      }
      const {
        result,
        forms
      } = buildPretUniversalResultDetailedFromVariants(variants, subjectPrefix, objectPrefix, subjectSuffix, directionalInputPrefix, directionalOutputPrefix, baseSubjectPrefix, baseObjectPrefix, pluralSuffix, indirectObjectMarker, hasDoubleDash, isYawi, hasOptionalSupportiveI, optionalSupportiveLetter);
      return {
        result,
        forms,
        provenance: buildPretUniversalProvenance({
          verb,
          analysisTarget,
          tense,
          classKey,
          isTransitive,
          context,
          variants,
          subjectSuffix,
          blockedReason,
          suppletiveStemSet
        })
      };
    }

    const api = {};
    Object.defineProperty(api, "PRET_STEM_SPEC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_STEM_SPEC_KIND; },
    });
    Object.defineProperty(api, "PRET_STEM_TRANSFORM_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_STEM_TRANSFORM_KIND; },
    });
    api.buildPretLiteralBaseSpec = buildPretLiteralBaseSpec;
    api.buildPretTransformBaseSpec = buildPretTransformBaseSpec;
    api.buildPretAppendBaseSpec = buildPretAppendBaseSpec;
    api.buildPretReplaceSuffixBaseSpec = buildPretReplaceSuffixBaseSpec;
    api.buildPretPerfectiveReplacementBaseSpec = buildPretPerfectiveReplacementBaseSpec;
    api.buildPretDeletionShiftBaseSpec = buildPretDeletionShiftBaseSpec;
    api.buildPretCoalescedIBaseSpec = buildPretCoalescedIBaseSpec;
    api.realizePretBaseSpec = realizePretBaseSpec;
    api.getPretVariantBase = getPretVariantBase;
    api.getPretVariantSuffix = getPretVariantSuffix;
    api.getPretVariantSurfaceRuleMeta = getPretVariantSurfaceRuleMeta;
    api.buildPretProvenanceVariantEntry = buildPretProvenanceVariantEntry;
    api.buildPretVariant = buildPretVariant;
    api.addUniquePretVariant = addUniquePretVariant;
    api.buildPretUniversalClassC = buildPretUniversalClassC;
    api.buildPretUniversalClassD = buildPretUniversalClassD;
    api.getRootPlusYaSurfaceVerb = getRootPlusYaSurfaceVerb;
    api.isSlashDenominalRootPlusYaMatrix = isSlashDenominalRootPlusYaMatrix;
    api.createPretDescriptorTierMatcher = createPretDescriptorTierMatcher;
    api.createPretDescriptorMatcher = createPretDescriptorMatcher;
    api.buildPretUniversalClassA = buildPretUniversalClassA;
    api.buildPretUniversalClassB = buildPretUniversalClassB;
    api.getPretUniversalVariants = getPretUniversalVariants;
    api.getPronounceableClassBFallback = getPronounceableClassBFallback;
    api.getPretUniversalVariantsByClass = getPretUniversalVariantsByClass;
    api.splitDirectionalPrefixFromBase = splitDirectionalPrefixFromBase;
    api.maybeShortenZeroBitransitiveKi = maybeShortenZeroBitransitiveKi;
    api.composePretUniversalObjectPrefix = composePretUniversalObjectPrefix;
    api.shouldAllowZeroBitransitiveKiDrop = shouldAllowZeroBitransitiveKiDrop;
    api.adjustPretPrefixBaseContact = adjustPretPrefixBaseContact;
    api.adjustPretComposedObjectPrefixContact = adjustPretComposedObjectPrefixContact;
    api.resolvePretObjectPrefixContact = resolvePretObjectPrefixContact;
    api.getPretUniversalPrefixForBase = getPretUniversalPrefixForBase;
    api.normalizePretYawiPreteriteVariants = normalizePretYawiPreteriteVariants;
    api.buildPretUniversalResultDetailedFromVariants = buildPretUniversalResultDetailedFromVariants;
    api.buildPretUniversalResultFromVariants = buildPretUniversalResultFromVariants;
    api.buildNonactivePerfectiveResult = buildNonactivePerfectiveResult;
    api.getKVClassPolicy = getKVClassPolicy;
    api.makePretClassPolicyState = makePretClassPolicyState;
    api.buildPretClassPolicyResult = buildPretClassPolicyResult;
    api.buildForcedClassBPolicyResult = buildForcedClassBPolicyResult;
    api.buildPretOpenClassPolicyResult = buildPretOpenClassPolicyResult;
    api.buildPretSkipClassBPolicyResult = buildPretSkipClassBPolicyResult;
    api.isPretPolicyPreteritSingular = isPretPolicyPreteritSingular;
    api.applyPretSkipClassBState = applyPretSkipClassBState;
    api.applyPretPreferClassBState = applyPretPreferClassBState;
    api.applyPretSingularElseSkipClassBState = applyPretSingularElseSkipClassBState;
    api.applyPretClassPolicyRulePipeline = applyPretClassPolicyRulePipeline;
    api.resolvePretClassPolicy = resolvePretClassPolicy;
    api.buildClassBasedResult = buildClassBasedResult;
    api.buildPretUniversalProvenance = buildPretUniversalProvenance;
    api.buildPretUniversalResultWithProvenance = buildPretUniversalResultWithProvenance;
    return api;
}

export function installPreteritEngineGlobals(targetObject = globalThis) {
    const api = createPreteritEngineApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
