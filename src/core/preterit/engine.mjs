// Native wrapper generated from src/core/preterit/engine.js.

export function createPreteritEngineModule(targetObject = globalThis) {
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
    const PRET_BASE_SOURCE_FRAME_KIND = "preterit-base-source-frame";
    const PRET_BASE_SEGMENT_FRAME_KIND = "preterit-base-segment-frame";
    const PRET_BASE_OPERATION_FRAME_KIND = "preterit-base-transform-operation-frame";
    const PRET_PREFIX_BASE_CONTACT_FRAME_KIND = "preterit-prefix-base-contact-frame";
    const PRET_PREFIX_BASE_CONTACT_SEGMENT_FRAME_KIND = "preterit-prefix-base-contact-segment-frame";
    const PRET_VARIANT_ASSEMBLY_FRAME_KIND = "preterit-variant-assembly-frame";
    const PRET_VARIANT_ASSEMBLY_SOURCE_FRAME_KIND = "preterit-variant-assembly-source-frame";
    const PRET_VARIANT_ASSEMBLY_OPERATION_FRAME_KIND = "preterit-variant-assembly-operation-frame";
    function normalizePretBaseFrameText(value = "") {
      return typeof targetObject.normalizeRuleBase === "function" ? targetObject.normalizeRuleBase(String(value || "").trim().toLowerCase()) : String(value || "").trim().toLowerCase();
    }
    function buildPretBaseSourceFrame(sourceBase = "") {
      const surfaceBase = normalizePretBaseFrameText(sourceBase);
      if (!surfaceBase) {
        return null;
      }
      return Object.freeze({
        kind: PRET_BASE_SOURCE_FRAME_KIND,
        role: "preterit-source-base",
        surfaceBase
      });
    }
    function buildPretBaseSegmentFrame(role = "", value = "") {
      return Object.freeze({
        kind: PRET_BASE_SEGMENT_FRAME_KIND,
        role,
        text: normalizePretBaseFrameText(value)
      });
    }
    function buildPretBaseOperationFrame({
      transformKind = "",
      sourceFrame = null,
      sourceSuffix = "",
      appendText = "",
      replacement = "",
      deletionVariant = "",
      isTransitive = false
    } = {}) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== PRET_BASE_SOURCE_FRAME_KIND || !sourceFrame.surfaceBase || !transformKind) {
        return null;
      }
      return Object.freeze({
        kind: PRET_BASE_OPERATION_FRAME_KIND,
        transformKind,
        sourceFrame: Object.freeze({
          ...sourceFrame
        }),
        sourceSuffixFrame: buildPretBaseSegmentFrame("source-suffix", sourceSuffix),
        appendFrame: buildPretBaseSegmentFrame("append", appendText),
        replacementFrame: buildPretBaseSegmentFrame("replacement", replacement),
        deletionVariant: String(deletionVariant || ""),
        isTransitive: isTransitive === true
      });
    }
    function getPretContactLetters(value = "") {
      const normalized = normalizePretBaseFrameText(value);
      return typeof targetObject.splitVerbLetters === "function" ? targetObject.splitVerbLetters(normalized) : normalized.split("");
    }
    function joinPretContactLetters(letters = []) {
      return (Array.isArray(letters) ? letters : []).join("");
    }
    function buildPretPrefixBaseContactSegmentFrame(role = "", value = "") {
      const text = normalizePretBaseFrameText(value);
      const letters = getPretContactLetters(text);
      return Object.freeze({
        kind: PRET_PREFIX_BASE_CONTACT_SEGMENT_FRAME_KIND,
        role,
        text,
        letters: Object.freeze(letters.slice()),
        first: letters[0] || "",
        second: letters[1] || "",
        penultimate: letters[letters.length - 2] || "",
        final: letters[letters.length - 1] || ""
      });
    }
    function buildPretPrefixBaseContactFrame({
      prefix = "",
      base = "",
      baseSubjectPrefix = "",
      contactKind = "prefix-base",
      composedObjectPrefix = false,
      suppressBareKBeforeK = false,
      allowZeroBitransitiveDrop = false,
      dropYAfterWal = false
    } = {}) {
      const prefixFrame = buildPretPrefixBaseContactSegmentFrame("prefix", prefix);
      const baseFrame = buildPretPrefixBaseContactSegmentFrame("base", base);
      if (!prefixFrame.text && !baseFrame.text) {
        return null;
      }
      return Object.freeze({
        kind: PRET_PREFIX_BASE_CONTACT_FRAME_KIND,
        contactKind: String(contactKind || "prefix-base"),
        prefixFrame,
        baseFrame,
        baseSubjectPrefixFrame: buildPretPrefixBaseContactSegmentFrame("base-subject-prefix", baseSubjectPrefix),
        operationFrame: Object.freeze({
          kind: "preterit-prefix-base-contact-operation-frame",
          composedObjectPrefix: composedObjectPrefix === true,
          suppressBareKBeforeK: suppressBareKBeforeK === true,
          allowZeroBitransitiveDrop: allowZeroBitransitiveDrop === true,
          dropYAfterWal: dropYAfterWal === true
        })
      });
    }
    function buildPretVariantAssemblyFrame({
      variants = [],
      subjectPrefix = "",
      objectPrefix = "",
      subjectSuffix = "",
      directionalInputPrefix = "",
      directionalOutputPrefix = "",
      baseSubjectPrefix = subjectPrefix,
      baseObjectPrefix = objectPrefix,
      pluralSuffix = null,
      indirectObjectMarker = "",
      hasDoubleDash = false,
      isYawi = false,
      hasOptionalSupportiveI = false,
      optionalSupportiveLetter = ""
    } = {}) {
      const structuralVariants = Array.isArray(variants) ? variants.slice() : [];
      return Object.freeze({
        kind: PRET_VARIANT_ASSEMBLY_FRAME_KIND,
        sourceFrame: Object.freeze({
          kind: PRET_VARIANT_ASSEMBLY_SOURCE_FRAME_KIND,
          variants: Object.freeze(structuralVariants),
          variantCount: structuralVariants.length
        }),
        participantFrame: Object.freeze({
          subjectPrefix: String(subjectPrefix || ""),
          objectPrefix: String(objectPrefix || ""),
          subjectSuffix: String(subjectSuffix || ""),
          baseSubjectPrefix: String(baseSubjectPrefix || subjectPrefix || ""),
          baseObjectPrefix: String(baseObjectPrefix || objectPrefix || ""),
          indirectObjectMarker: String(indirectObjectMarker || ""),
          hasDoubleDash: hasDoubleDash === true
        }),
        directionalFrame: Object.freeze({
          inputPrefix: String(directionalInputPrefix || ""),
          outputPrefix: String(directionalOutputPrefix || ""),
          isYawi: isYawi === true
        }),
        inflectionFrame: Object.freeze({
          pluralSuffix: pluralSuffix === null ? null : String(pluralSuffix || ""),
          hasOptionalSupportiveI: hasOptionalSupportiveI === true,
          optionalSupportiveLetter: String(optionalSupportiveLetter || "")
        }),
        operationFrame: Object.freeze({
          kind: PRET_VARIANT_ASSEMBLY_OPERATION_FRAME_KIND,
          operation: "assemble-preterit-variant-surfaces"
        })
      });
    }
    function buildPretLiteralBaseSpec(base = "") {
      const normalizedBase = normalizePretBaseFrameText(base);
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
      const sourceFrame = buildPretBaseSourceFrame(sourceBase);
      const operationFrame = buildPretBaseOperationFrame({
        transformKind,
        sourceFrame,
        sourceSuffix,
        appendText,
        replacement,
        deletionVariant,
        isTransitive
      });
      const normalizedSourceBase = sourceFrame?.surfaceBase || "";
      if (!normalizedSourceBase || !transformKind) {
        return null;
      }
      return Object.freeze({
        kind: PRET_STEM_SPEC_KIND.transform,
        transformKind,
        sourceBase: normalizedSourceBase,
        sourceSuffix: normalizePretBaseFrameText(sourceSuffix),
        appendText: normalizePretBaseFrameText(appendText),
        replacement: normalizePretBaseFrameText(replacement),
        deletionVariant: String(deletionVariant || ""),
        isTransitive: isTransitive === true,
        operationFrame
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
    function buildPretTransformBaseSpecFromOperationFrame(operationFrame = null) {
      const sourceBase = getPretOperationFrameSourceBase(operationFrame);
      const transformKind = String(operationFrame?.transformKind || "");
      if (!operationFrame || typeof operationFrame !== "object" || operationFrame.kind !== PRET_BASE_OPERATION_FRAME_KIND || !sourceBase || !transformKind) {
        return null;
      }
      return Object.freeze({
        kind: PRET_STEM_SPEC_KIND.transform,
        transformKind,
        sourceBase,
        sourceSuffix: normalizePretBaseFrameText(operationFrame.sourceSuffixFrame?.text || ""),
        appendText: normalizePretBaseFrameText(operationFrame.appendFrame?.text || ""),
        replacement: normalizePretBaseFrameText(operationFrame.replacementFrame?.text || ""),
        deletionVariant: String(operationFrame.deletionVariant || ""),
        isTransitive: operationFrame.isTransitive === true,
        operationFrame
      });
    }
    function buildPretBaseSourceFrameFromRootPlusYaSourceFrame(rootPlusYaFrame = null) {
      if (!rootPlusYaFrame || typeof rootPlusYaFrame !== "object" || rootPlusYaFrame.kind !== "preterit-root-plus-ya-source-frame" || !rootPlusYaFrame.sourceVerbFrame || rootPlusYaFrame.sourceVerbFrame.kind !== "preterit-root-plus-ya-source-segment-frame") {
        return null;
      }
      return buildPretBaseSourceFrame(rootPlusYaFrame.sourceVerbFrame.text || "");
    }
    function buildPretPerfectiveReplacementBaseSpecFromRootPlusYaSourceFrame(rootPlusYaFrame = null, options = {}) {
      const sourceFrame = buildPretBaseSourceFrameFromRootPlusYaSourceFrame(rootPlusYaFrame);
      const operationFrame = buildPretBaseOperationFrame({
        transformKind: PRET_STEM_TRANSFORM_KIND.perfectiveReplacement,
        sourceFrame,
        isTransitive: options.isTransitive === true
      });
      return buildPretTransformBaseSpecFromOperationFrame(operationFrame);
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
    function buildPretBaseSpecDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-base-transform-operation-frame",
        ...details
      };
    }
    function blockPretBaseSpec(id = "", details = {}) {
      return {
        ok: false,
        base: "",
        diagnostics: [buildPretBaseSpecDiagnostic(id, details)]
      };
    }
    function getPretOperationFrameSourceBase(operationFrame = null) {
      return typeof operationFrame?.sourceFrame?.surfaceBase === "string" ? normalizePretBaseFrameText(operationFrame.sourceFrame.surfaceBase) : "";
    }
    function evaluatePretBaseOperationFrame(operationFrame = null, expected = {}) {
      if (!operationFrame || typeof operationFrame !== "object") {
        return blockPretBaseSpec("preterit-base-missing-operation-frame", {
          expectedTransformKind: expected.transformKind || ""
        });
      }
      const sourceBase = getPretOperationFrameSourceBase(operationFrame);
      const transformKind = String(operationFrame.transformKind || "");
      if (operationFrame.kind !== PRET_BASE_OPERATION_FRAME_KIND || !sourceBase || expected.transformKind && transformKind !== expected.transformKind) {
        return blockPretBaseSpec("preterit-base-contradictory-operation-frame", {
          expectedTransformKind: expected.transformKind || "",
          actualTransformKind: transformKind,
          actualSourceBase: sourceBase
        });
      }
      if (transformKind === PRET_STEM_TRANSFORM_KIND.append) {
        return {
          ok: true,
          base: `${sourceBase}${operationFrame.appendFrame?.text || ""}`,
          diagnostics: [],
          operationFrame
        };
      }
      if (transformKind === PRET_STEM_TRANSFORM_KIND.replaceSuffix) {
        const sourceSuffix = normalizePretBaseFrameText(operationFrame.sourceSuffixFrame?.text || "");
        const replacement = normalizePretBaseFrameText(operationFrame.replacementFrame?.text || "");
        if (!sourceSuffix) {
          return {
            ok: true,
            base: `${sourceBase}${replacement}`,
            diagnostics: [],
            operationFrame
          };
        }
        return {
          ok: true,
          base: sourceBase.endsWith(sourceSuffix) ? `${sourceBase.slice(0, -sourceSuffix.length)}${replacement}` : `${sourceBase}${replacement}`,
          diagnostics: [],
          operationFrame
        };
      }
      if (transformKind === PRET_STEM_TRANSFORM_KIND.perfectiveReplacement) {
        if (sourceBase.endsWith("ya")) {
          const letters = targetObject.splitVerbLetters(sourceBase);
          const recent = letters.slice(Math.max(0, letters.length - 6));
          const hasRecentS = recent.includes("s");
          const base = sourceBase.slice(0, -2);
          if (!operationFrame.isTransitive && hasRecentS) {
            return {
              ok: true,
              base: base.endsWith("s") ? base : `${base}s`,
              diagnostics: [],
              operationFrame
            };
          }
          return {
            ok: true,
            base: `${base}sh`,
            diagnostics: [],
            operationFrame
          };
        }
        return {
          ok: true,
          base: `${sourceBase.slice(0, -1)}j`,
          diagnostics: [],
          operationFrame
        };
      }
      if (transformKind === PRET_STEM_TRANSFORM_KIND.deletionShift) {
        if (operationFrame.deletionVariant === "kw-to-k") {
          return {
            ok: sourceBase.endsWith("kw"),
            base: sourceBase.endsWith("kw") ? `${sourceBase.slice(0, -2)}k` : "",
            diagnostics: sourceBase.endsWith("kw") ? [] : [buildPretBaseSpecDiagnostic("preterit-base-contradictory-operation-frame", {
              expectedFinal: "kw",
              actualSourceBase: sourceBase
            })],
            operationFrame
          };
        }
        if (operationFrame.deletionVariant === "w-keep") {
          return {
            ok: true,
            base: sourceBase,
            diagnostics: [],
            operationFrame
          };
        }
        if (operationFrame.deletionVariant === "w-to-j") {
          return {
            ok: sourceBase.endsWith("w"),
            base: sourceBase.endsWith("w") ? `${sourceBase.slice(0, -1)}j` : "",
            diagnostics: sourceBase.endsWith("w") ? [] : [buildPretBaseSpecDiagnostic("preterit-base-contradictory-operation-frame", {
              expectedFinal: "w",
              actualSourceBase: sourceBase
            })],
            operationFrame
          };
        }
        if (operationFrame.deletionVariant === "m-to-n") {
          return {
            ok: sourceBase.endsWith("m"),
            base: sourceBase.endsWith("m") ? `${sourceBase.slice(0, -1)}n` : "",
            diagnostics: sourceBase.endsWith("m") ? [] : [buildPretBaseSpecDiagnostic("preterit-base-contradictory-operation-frame", {
              expectedFinal: "m",
              actualSourceBase: sourceBase
            })],
            operationFrame
          };
        }
        if (operationFrame.deletionVariant === "y-shift") {
          if (!sourceBase.endsWith("y")) {
            return blockPretBaseSpec("preterit-base-contradictory-operation-frame", {
              expectedFinal: "y",
              actualSourceBase: sourceBase
            });
          }
          const letters = targetObject.splitVerbLetters(sourceBase);
          const recent = letters.slice(Math.max(0, letters.length - 6));
          const hasRecentS = recent.includes("s");
          const base = sourceBase.slice(0, -1);
          if (!operationFrame.isTransitive && hasRecentS) {
            return {
              ok: true,
              base: base.endsWith("s") ? base : `${base}s`,
              diagnostics: [],
              operationFrame
            };
          }
          return {
            ok: true,
            base: `${base}sh`,
            diagnostics: [],
            operationFrame
          };
        }
        if (operationFrame.deletionVariant === "identity") {
          return {
            ok: true,
            base: sourceBase,
            diagnostics: [],
            operationFrame
          };
        }
      }
      if (transformKind === PRET_STEM_TRANSFORM_KIND.coalesceFinalI) {
        return {
          ok: true,
          base: targetObject.shouldCoalesceFinalI(sourceBase) ? `${sourceBase.slice(0, -1)}y` : sourceBase,
          diagnostics: [],
          operationFrame
        };
      }
      return blockPretBaseSpec("preterit-base-unsupported-operation-frame", {
        actualTransformKind: transformKind
      });
    }
    function evaluatePretBaseSpec(spec = null) {
      if (!spec || typeof spec !== "object") {
        return blockPretBaseSpec("preterit-base-missing-stem-spec");
      }
      if (spec.kind === PRET_STEM_SPEC_KIND.literal) {
        const base = normalizePretBaseFrameText(spec.surfaceBase || "");
        return base ? {
          ok: true,
          base,
          diagnostics: [],
          spec
        } : blockPretBaseSpec("preterit-base-missing-literal-base");
      }
      if (spec.kind === PRET_STEM_SPEC_KIND.transform) {
        return evaluatePretBaseOperationFrame(spec.operationFrame, {
          transformKind: spec.transformKind
        });
      }
      return blockPretBaseSpec("preterit-base-unsupported-stem-spec", {
        actualKind: spec.kind || ""
      });
    }
    function realizePretBaseSpec(spec = null, fallbackBase = "") {
      const result = evaluatePretBaseSpec(spec);
      if (result.ok) {
        return result.base;
      }
      if (!spec || typeof spec !== "object") {
        return normalizePretBaseFrameText(fallbackBase);
      }
      return "";
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
        routePolicyFrame: variant.routePolicyFrame || null,
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
      const variant = {
        base: realizedBase,
        baseSpec,
        suffix: String(suffix || "")
      };
      if (options.routePolicyFrame && typeof options.routePolicyFrame === "object") {
        variant.routePolicyFrame = options.routePolicyFrame;
      }
      return variant;
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
      const classCFrameResult = buildPretClassCBaseSpecsFromSourceFrame(context.classCSourceFrame, context);
      if (!classCFrameResult.ok) {
        return null;
      }
      const replacementBaseSpec = classCFrameResult.baseSpecs[0] || null;
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
        const classDFrameResult = buildPretClassDBaseSpecsFromSourceFrame(context.classDSourceFrame, context);
        if (!classDFrameResult.ok) {
          return null;
        }
        const baseSpec = classDFrameResult.baseSpecs[0] || null;
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
      const classDFrameResult = buildPretClassDBaseSpecsFromSourceFrame(context.classDSourceFrame, context);
      if (!classDFrameResult.ok) {
        return null;
      }
      const baseSpec = classDFrameResult.baseSpecs[0] || null;
      const base = realizePretBaseSpec(baseSpec, "");
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
    function buildPretRootPlusYaClassADiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-class-a-root-plus-ya-source-frame",
        ...details
      };
    }
    function blockPretRootPlusYaClassABaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        baseSpecs: [],
        diagnostics: [buildPretRootPlusYaClassADiagnostic(id, details)]
      };
    }
    function buildPretRootPlusYaClassABaseSpecsFromSourceFrame(rootPlusYaFrame = null, context = {}) {
      if (!rootPlusYaFrame || typeof rootPlusYaFrame !== "object" || rootPlusYaFrame.kind !== "preterit-root-plus-ya-source-frame") {
        return blockPretRootPlusYaClassABaseSpecs("preterit-class-a-root-plus-ya-missing-source-frame");
      }
      const rootBase = normalizePretBaseFrameText(rootPlusYaFrame.rootFrame?.text || "");
      const sourceVerb = normalizePretBaseFrameText(rootPlusYaFrame.sourceVerbFrame?.text || "");
      if (!rootBase || !sourceVerb) {
        return blockPretRootPlusYaClassABaseSpecs("preterit-class-a-root-plus-ya-incomplete-source-frame", {
          rootBase,
          sourceVerb
        });
      }
      if (rootPlusYaFrame.isWeya === true || context.isWeya === true) {
        return {
          ok: true,
          baseSpecs: [buildPretLiteralBaseSpec(rootBase)].filter(Boolean),
          diagnostics: []
        };
      }
      if (!sourceVerb.endsWith("ya")) {
        return blockPretRootPlusYaClassABaseSpecs("preterit-class-a-root-plus-ya-contradictory-source-frame", {
          sourceVerb,
          expectedFinal: "ya"
        });
      }
      const baseSpec = buildPretPerfectiveReplacementBaseSpecFromRootPlusYaSourceFrame(rootPlusYaFrame, {
        isTransitive: context.isTransitive === true
      });
      return baseSpec ? {
        ok: true,
        baseSpecs: [baseSpec],
        diagnostics: []
      } : blockPretRootPlusYaClassABaseSpecs("preterit-class-a-root-plus-ya-missing-operation-frame");
    }
    function buildPretRootPlusYaClassBDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-root-plus-ya-source-frame",
        ...details
      };
    }
    function blockPretRootPlusYaClassBBaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        sourceVerb: "",
        rootBase: "",
        deletedYaBase: "",
        sourceVerbBaseSpec: null,
        deletedYaBaseSpec: null,
        rootBaseSpec: null,
        diagnostics: [buildPretRootPlusYaClassBDiagnostic(id, details)]
      };
    }
    function buildPretRootPlusYaClassBBaseSpecsFromSourceFrame(rootPlusYaFrame = null, _context = {}) {
      if (!rootPlusYaFrame || typeof rootPlusYaFrame !== "object" || rootPlusYaFrame.kind !== "preterit-root-plus-ya-source-frame") {
        return blockPretRootPlusYaClassBBaseSpecs("preterit-class-b-root-plus-ya-missing-source-frame");
      }
      const rootBase = normalizePretBaseFrameText(rootPlusYaFrame.rootFrame?.text || "");
      const sourceVerb = normalizePretBaseFrameText(rootPlusYaFrame.sourceVerbFrame?.text || "");
      const suffix = normalizePretBaseFrameText(rootPlusYaFrame.suffixFrame?.text || "");
      if (!rootBase || !sourceVerb || suffix !== "ya") {
        return blockPretRootPlusYaClassBBaseSpecs("preterit-class-b-root-plus-ya-incomplete-source-frame", {
          rootBase,
          sourceVerb,
          suffix
        });
      }
      if (sourceVerb !== `${rootBase}${suffix}`) {
        return blockPretRootPlusYaClassBBaseSpecs("preterit-class-b-root-plus-ya-contradictory-source-frame", {
          sourceVerb,
          rootBase,
          suffix
        });
      }
      const sourceVerbBaseSpec = buildPretLiteralBaseSpec(sourceVerb);
      const deletedYaBaseSpec = buildPretReplaceSuffixBaseSpec(sourceVerb, suffix, "");
      const rootBaseSpec = buildPretLiteralBaseSpec(rootBase);
      if (!sourceVerbBaseSpec || !deletedYaBaseSpec || !rootBaseSpec) {
        return blockPretRootPlusYaClassBBaseSpecs("preterit-class-b-root-plus-ya-missing-base-frame");
      }
      return {
        ok: true,
        sourceVerb,
        rootBase,
        deletedYaBase: rootBase,
        sourceVerbBaseSpec,
        deletedYaBaseSpec,
        rootBaseSpec,
        diagnostics: []
      };
    }
    function buildPretClassAYyaDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-class-a-yya-source-frame",
        ...details
      };
    }
    function blockPretClassAYyaBaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        baseSpecs: [],
        diagnostics: [buildPretClassAYyaDiagnostic(id, details)]
      };
    }
    function getPretClassAYyaFrameText(frame = null, role = "") {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const candidates = [frame.sourceVerbFrame, frame.retainedBaseFrame, frame.suffixFrame, frame.previousYFrame, frame.finalOnsetFrame, frame.finalNucleusFrame];
      const segment = candidates.find(entry => entry?.role === role) || null;
      return normalizePretBaseFrameText(segment?.text || "");
    }
    function buildPretClassAYyaBaseSpecsFromSourceFrame(sourceFrame = null, context = {}) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "preterit-class-a-yya-source-frame") {
        return blockPretClassAYyaBaseSpecs("preterit-class-a-yya-missing-source-frame");
      }
      const sourceVerb = getPretClassAYyaFrameText(sourceFrame, "source-verb");
      const retainedBase = getPretClassAYyaFrameText(sourceFrame, "retained-base");
      const suffix = getPretClassAYyaFrameText(sourceFrame, "deleted-yya-suffix");
      const previousY = getPretClassAYyaFrameText(sourceFrame, "previous-y");
      const finalOnset = getPretClassAYyaFrameText(sourceFrame, "final-onset");
      const finalNucleus = getPretClassAYyaFrameText(sourceFrame, "final-nucleus");
      if (!sourceVerb || !retainedBase || !suffix) {
        return blockPretClassAYyaBaseSpecs("preterit-class-a-yya-incomplete-source-frame", {
          sourceVerb,
          retainedBase,
          suffix
        });
      }
      if (suffix !== "ya" || previousY !== "y" || finalOnset !== "y" || finalNucleus !== "a" || `${retainedBase}${suffix}` !== sourceVerb) {
        return blockPretClassAYyaBaseSpecs("preterit-class-a-yya-contradictory-source-frame", {
          sourceVerb,
          retainedBase,
          suffix,
          previousY,
          finalOnset,
          finalNucleus
        });
      }
      const operationFrame = buildPretBaseOperationFrame({
        transformKind: PRET_STEM_TRANSFORM_KIND.replaceSuffix,
        sourceFrame: buildPretBaseSourceFrame(sourceVerb),
        sourceSuffix: suffix,
        replacement: "",
        isTransitive: context.isTransitive === true
      });
      const baseSpec = buildPretTransformBaseSpecFromOperationFrame(operationFrame);
      return baseSpec ? {
        ok: true,
        baseSpecs: [baseSpec],
        diagnostics: []
      } : blockPretClassAYyaBaseSpecs("preterit-class-a-yya-missing-operation-frame");
    }
    function buildPretClassAItaDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-class-a-ita-source-frame",
        ...details
      };
    }
    function blockPretClassAItaBaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        baseSpecs: [],
        diagnostics: [buildPretClassAItaDiagnostic(id, details)]
      };
    }
    function getPretClassAItaFrameText(frame = null, role = "") {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const candidates = [frame.sourceVerbFrame, frame.retainedBaseFrame, frame.sourceSuffixFrame, frame.replacementFrame, frame.firstNucleusFrame, frame.finalOnsetFrame, frame.finalNucleusFrame];
      const segment = candidates.find(entry => entry?.role === role) || null;
      return normalizePretBaseFrameText(segment?.text || "");
    }
    function buildPretClassAItaBaseSpecsFromSourceFrame(sourceFrame = null, context = {}) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "preterit-class-a-ita-source-frame") {
        return blockPretClassAItaBaseSpecs("preterit-class-a-ita-missing-source-frame");
      }
      const sourceVerb = getPretClassAItaFrameText(sourceFrame, "source-verb");
      const retainedBase = getPretClassAItaFrameText(sourceFrame, "retained-base");
      const sourceSuffix = getPretClassAItaFrameText(sourceFrame, "source-suffix");
      const replacement = getPretClassAItaFrameText(sourceFrame, "replacement");
      const firstNucleus = getPretClassAItaFrameText(sourceFrame, "first-nucleus");
      const finalOnset = getPretClassAItaFrameText(sourceFrame, "final-onset");
      const finalNucleus = getPretClassAItaFrameText(sourceFrame, "final-nucleus");
      if (!sourceVerb || !retainedBase || !sourceSuffix || !replacement) {
        return blockPretClassAItaBaseSpecs("preterit-class-a-ita-incomplete-source-frame", {
          sourceVerb,
          retainedBase,
          sourceSuffix,
          replacement
        });
      }
      if (retainedBase !== "i" || sourceSuffix !== "ta" || replacement !== "tz" || firstNucleus !== "i" || finalOnset !== "t" || finalNucleus !== "a" || `${retainedBase}${sourceSuffix}` !== sourceVerb) {
        return blockPretClassAItaBaseSpecs("preterit-class-a-ita-contradictory-source-frame", {
          sourceVerb,
          retainedBase,
          sourceSuffix,
          replacement,
          firstNucleus,
          finalOnset,
          finalNucleus
        });
      }
      const operationFrame = buildPretBaseOperationFrame({
        transformKind: PRET_STEM_TRANSFORM_KIND.replaceSuffix,
        sourceFrame: buildPretBaseSourceFrame(sourceVerb),
        sourceSuffix,
        replacement,
        isTransitive: context.isTransitive === true
      });
      const baseSpec = buildPretTransformBaseSpecFromOperationFrame(operationFrame);
      return baseSpec ? {
        ok: true,
        baseSpecs: [baseSpec],
        diagnostics: []
      } : blockPretClassAItaBaseSpecs("preterit-class-a-ita-missing-operation-frame");
    }
    function buildPretClassAFinalVowelDeletionDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-class-a-final-vowel-deletion-source-frame",
        ...details
      };
    }
    function blockPretClassAFinalVowelDeletionBaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        baseSpecs: [],
        diagnostics: [buildPretClassAFinalVowelDeletionDiagnostic(id, details)]
      };
    }
    function getPretClassADeletionFrameText(frame = null, role = "") {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const candidates = [frame.sourceVerbFrame, frame.deletedBaseFrame, frame.finalVowelFrame, frame.finalBaseSegmentFrame];
      const segment = candidates.find(entry => entry?.role === role) || null;
      return normalizePretBaseFrameText(segment?.text || "");
    }
    function buildPretClassAFinalVowelDeletionBaseSpecsFromSourceFrame(sourceFrame = null, context = {}) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "preterit-class-a-final-vowel-deletion-source-frame") {
        return blockPretClassAFinalVowelDeletionBaseSpecs("preterit-class-a-missing-final-vowel-deletion-source-frame");
      }
      const sourceVerb = getPretClassADeletionFrameText(sourceFrame, "source-verb");
      const deletedBase = getPretClassADeletionFrameText(sourceFrame, "deleted-base");
      const finalVowel = getPretClassADeletionFrameText(sourceFrame, "deleted-final-vowel");
      const finalBaseSegment = getPretClassADeletionFrameText(sourceFrame, "deleted-base-final-segment");
      if (!sourceVerb || !finalVowel) {
        return blockPretClassAFinalVowelDeletionBaseSpecs("preterit-class-a-incomplete-final-vowel-deletion-source-frame", {
          sourceVerb,
          finalVowel
        });
      }
      if (`${deletedBase}${finalVowel}` !== sourceVerb) {
        return blockPretClassAFinalVowelDeletionBaseSpecs("preterit-class-a-contradictory-final-vowel-deletion-source-frame", {
          sourceVerb,
          deletedBase,
          finalVowel
        });
      }
      if (context.isCausativeTypeTwo) {
        return {
          ok: true,
          baseSpecs: [buildPretLiteralBaseSpec(sourceVerb)].filter(Boolean),
          diagnostics: []
        };
      }
      const shiftSpecs = (() => {
        if (finalBaseSegment === "kw") {
          return [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
            isTransitive: context.isTransitive
          })];
        }
        if (finalBaseSegment === "w") {
          return [buildPretDeletionShiftBaseSpec(deletedBase, "w-keep", {
            isTransitive: context.isTransitive
          }), buildPretDeletionShiftBaseSpec(deletedBase, "w-to-j", {
            isTransitive: context.isTransitive
          })];
        }
        if (finalBaseSegment === "m") {
          return [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
            isTransitive: context.isTransitive
          })];
        }
        if (finalBaseSegment === "y") {
          return [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
            isTransitive: context.isTransitive
          })];
        }
        return [buildPretDeletionShiftBaseSpec(deletedBase, "identity", {
          isTransitive: context.isTransitive
        })];
      })().filter(Boolean);
      return shiftSpecs.length ? {
        ok: true,
        baseSpecs: shiftSpecs,
        diagnostics: []
      } : blockPretClassAFinalVowelDeletionBaseSpecs("preterit-class-a-missing-final-vowel-deletion-operation-frame");
    }
    function buildPretClassBDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-class-b-source-frame",
        ...details
      };
    }
    function blockPretClassBBaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        baseSpecs: [],
        sourceVerb: "",
        diagnostics: [buildPretClassBDiagnostic(id, details)]
      };
    }
    function getPretClassBFrameText(frame = null, role = "") {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const candidates = [frame.sourceVerbFrame, frame.vowelCountFrame, frame.syllableCountFrame, frame.finalFormFrame, frame.finalOnsetFrame, frame.finalNucleusFrame];
      const segment = candidates.find(entry => entry?.role === role) || null;
      return normalizePretBaseFrameText(segment?.text || "");
    }
    function buildPretClassBBaseSpecsFromSourceFrame(sourceFrame = null, _context = {}) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "preterit-class-b-source-frame") {
        return blockPretClassBBaseSpecs("preterit-class-b-missing-source-frame");
      }
      if (!sourceFrame.operationFrame || typeof sourceFrame.operationFrame !== "object" || sourceFrame.operationFrame.kind !== "preterit-class-b-literal-base-operation-frame" || sourceFrame.operationFrame.operation !== "select-source-verb-as-class-b-base") {
        return blockPretClassBBaseSpecs("preterit-class-b-missing-operation-frame");
      }
      const sourceVerb = getPretClassBFrameText(sourceFrame, "source-verb");
      const vowelCountText = getPretClassBFrameText(sourceFrame, "vowel-count");
      const syllableCountText = getPretClassBFrameText(sourceFrame, "syllable-count");
      if (!sourceVerb || !vowelCountText || !syllableCountText) {
        return blockPretClassBBaseSpecs("preterit-class-b-incomplete-source-frame", {
          sourceVerb,
          vowelCount: vowelCountText,
          syllableCount: syllableCountText
        });
      }
      const syllables = typeof targetObject.getSyllables === "function" ? targetObject.getSyllables(sourceVerb, {
        analysis: true,
        assumeFinalV: true
      }) : [];
      const edge = typeof targetObject.buildPretRightEdgeDescriptor === "function" ? targetObject.buildPretRightEdgeDescriptor(syllables) : {};
      const vowelCount = typeof targetObject.getTrailingVowelCountFromSyllables === "function" ? targetObject.getTrailingVowelCountFromSyllables(syllables) : targetObject.getPretUniversalCoreVowelCount(sourceVerb);
      const frameVowelCount = Number.parseInt(vowelCountText, 10);
      const frameSyllableCount = Number.parseInt(syllableCountText, 10);
      const finalForm = getPretClassBFrameText(sourceFrame, "final-form");
      const finalOnset = getPretClassBFrameText(sourceFrame, "final-onset");
      const finalNucleus = getPretClassBFrameText(sourceFrame, "final-nucleus");
      if (!syllables.length || frameVowelCount !== vowelCount || frameSyllableCount !== syllables.length || finalForm !== normalizePretBaseFrameText(edge.finalForm || "") || finalOnset !== normalizePretBaseFrameText(edge.finalOnset || "") || finalNucleus !== normalizePretBaseFrameText(edge.finalNucleus || "")) {
        return blockPretClassBBaseSpecs("preterit-class-b-contradictory-source-frame", {
          sourceVerb,
          vowelCount: vowelCountText,
          syllableCount: syllableCountText,
          finalForm,
          finalOnset,
          finalNucleus
        });
      }
      const baseSpec = buildPretLiteralBaseSpec(sourceVerb);
      return baseSpec ? {
        ok: true,
        baseSpecs: [baseSpec],
        sourceVerb,
        diagnostics: []
      } : blockPretClassBBaseSpecs("preterit-class-b-missing-literal-base-frame");
    }
    function buildPretClassCDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-class-c-source-frame",
        ...details
      };
    }
    function blockPretClassCBaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        baseSpecs: [],
        diagnostics: [buildPretClassCDiagnostic(id, details)]
      };
    }
    function getPretClassCFrameText(frame = null, role = "") {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const candidates = [frame.sourceVerbFrame, frame.retainedBaseFrame, frame.finalVowelFrame, frame.previousNucleusFrame, frame.finalFormFrame];
      const segment = candidates.find(entry => entry?.role === role) || null;
      return normalizePretBaseFrameText(segment?.text || "");
    }
    function buildPretClassCBaseSpecsFromSourceFrame(sourceFrame = null, context = {}) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "preterit-class-c-source-frame") {
        return blockPretClassCBaseSpecs("preterit-class-c-missing-source-frame");
      }
      const sourceVerb = getPretClassCFrameText(sourceFrame, "source-verb");
      const retainedBase = getPretClassCFrameText(sourceFrame, "retained-base");
      const finalVowel = getPretClassCFrameText(sourceFrame, "final-vowel");
      if (!sourceVerb || !retainedBase || !finalVowel) {
        return blockPretClassCBaseSpecs("preterit-class-c-incomplete-source-frame", {
          sourceVerb,
          retainedBase,
          finalVowel
        });
      }
      if (`${retainedBase}${finalVowel}` !== sourceVerb) {
        return blockPretClassCBaseSpecs("preterit-class-c-contradictory-source-frame", {
          sourceVerb,
          retainedBase,
          finalVowel
        });
      }
      const operationFrame = buildPretBaseOperationFrame({
        transformKind: PRET_STEM_TRANSFORM_KIND.perfectiveReplacement,
        sourceFrame: buildPretBaseSourceFrame(sourceVerb),
        isTransitive: context.isTransitive === true
      });
      const baseSpec = buildPretTransformBaseSpecFromOperationFrame(operationFrame);
      return baseSpec ? {
        ok: true,
        baseSpecs: [baseSpec],
        diagnostics: []
      } : blockPretClassCBaseSpecs("preterit-class-c-missing-operation-frame");
    }
    function buildPretClassDDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-class-d-source-frame",
        ...details
      };
    }
    function blockPretClassDBaseSpecs(id = "", details = {}) {
      return {
        ok: false,
        baseSpecs: [],
        diagnostics: [buildPretClassDDiagnostic(id, details)]
      };
    }
    function getPretClassDFrameText(frame = null, role = "") {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      const candidates = [frame.sourceVerbFrame, frame.appendFrame, frame.syllableCountFrame, frame.finalFormFrame, frame.finalNucleusFrame];
      const segment = candidates.find(entry => entry?.role === role) || null;
      return normalizePretBaseFrameText(segment?.text || "");
    }
    function buildPretClassDBaseSpecsFromSourceFrame(sourceFrame = null, context = {}) {
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== "preterit-class-d-source-frame") {
        return blockPretClassDBaseSpecs("preterit-class-d-missing-source-frame");
      }
      const sourceVerb = getPretClassDFrameText(sourceFrame, "source-verb");
      const appendText = getPretClassDFrameText(sourceFrame, "append");
      if (!sourceVerb || !appendText) {
        return blockPretClassDBaseSpecs("preterit-class-d-incomplete-source-frame", {
          sourceVerb,
          appendText
        });
      }
      if (appendText !== "j") {
        return blockPretClassDBaseSpecs("preterit-class-d-contradictory-source-frame", {
          sourceVerb,
          appendText
        });
      }
      const operationFrame = buildPretBaseOperationFrame({
        transformKind: PRET_STEM_TRANSFORM_KIND.append,
        sourceFrame: buildPretBaseSourceFrame(sourceVerb),
        appendText,
        isTransitive: context.isTransitive === true
      });
      const baseSpec = buildPretTransformBaseSpecFromOperationFrame(operationFrame);
      return baseSpec ? {
        ok: true,
        baseSpecs: [baseSpec],
        diagnostics: []
      } : blockPretClassDBaseSpecs("preterit-class-d-missing-operation-frame");
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
    function hasAuthoritativePretClassASlashAkiZeroFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassASlashAkiFrameMismatch === "function" && !targetObject.getPretClassASlashAkiFrameMismatch({
        sourceFrame: context.classASlashAkiSourceFrame,
        operationFrame: context.classASlashAkiOperationFrame
      }));
    }
    function hasAuthoritativePretClassAKwvForceFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAKwvFrameMismatch === "function" && !targetObject.getPretClassAKwvFrameMismatch({
        sourceFrame: context.classAKwvSourceFrame,
        operationFrame: context.classAKwvOperationFrame
      }));
    }
    function hasAuthoritativePretClassAKvAllowFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAKvAllowFrameMismatch === "function" && !targetObject.getPretClassAKvAllowFrameMismatch({
        sourceFrame: context.classAKvAllowSourceFrame,
        operationFrame: context.classAKvAllowOperationFrame
      }));
    }
    function hasAuthoritativePretClassAChiAllowFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAChiAllowFrameMismatch === "function" && !targetObject.getPretClassAChiAllowFrameMismatch({
        sourceFrame: context.classAChiAllowSourceFrame,
        operationFrame: context.classAChiAllowOperationFrame
      }));
    }
    function hasAuthoritativePretClassATaRedupFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassATaRedupFrameMismatch === "function" && !targetObject.getPretClassATaRedupFrameMismatch({
        sourceFrame: context.classATaRedupSourceFrame,
        operationFrame: context.classATaRedupOperationFrame
      }));
    }
    function hasAuthoritativePretClassAPaTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAPaTransitiveFrameMismatch === "function" && !targetObject.getPretClassAPaTransitiveFrameMismatch({
        sourceFrame: context.classAPaTransitiveSourceFrame,
        operationFrame: context.classAPaTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassAMTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAMTransitiveFrameMismatch === "function" && !targetObject.getPretClassAMTransitiveFrameMismatch({
        sourceFrame: context.classAMTransitiveSourceFrame,
        operationFrame: context.classAMTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassAPiIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAPiIntransitiveFrameMismatch === "function" && !targetObject.getPretClassAPiIntransitiveFrameMismatch({
        sourceFrame: context.classAPiIntransitiveSourceFrame,
        operationFrame: context.classAPiIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassAPiCvTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAPiCvTransitiveFrameMismatch === "function" && !targetObject.getPretClassAPiCvTransitiveFrameMismatch({
        sourceFrame: context.classAPiCvTransitiveSourceFrame,
        operationFrame: context.classAPiCvTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvwiTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvwiTransitiveFrameMismatch === "function" && !targetObject.getPretClassACvwiTransitiveFrameMismatch({
        sourceFrame: context.classACvwiTransitiveSourceFrame,
        operationFrame: context.classACvwiTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvcvwiTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvcvwiTransitiveFrameMismatch === "function" && !targetObject.getPretClassACvcvwiTransitiveFrameMismatch({
        sourceFrame: context.classACvcvwiTransitiveSourceFrame,
        operationFrame: context.classACvcvwiTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvwaiTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvwaiTransitiveFrameMismatch === "function" && !targetObject.getPretClassACvwaiTransitiveFrameMismatch({
        sourceFrame: context.classACvwaiTransitiveSourceFrame,
        operationFrame: context.classACvwaiTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvewaTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvewaTransitiveFrameMismatch === "function" && !targetObject.getPretClassACvewaTransitiveFrameMismatch({
        sourceFrame: context.classACvewaTransitiveSourceFrame,
        operationFrame: context.classACvewaTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvawaTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvawaTransitiveFrameMismatch === "function" && !targetObject.getPretClassACvawaTransitiveFrameMismatch({
        sourceFrame: context.classACvawaTransitiveSourceFrame,
        operationFrame: context.classACvawaTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassAPaCvIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassAPaCvIntransitiveFrameMismatch === "function" && !targetObject.getPretClassAPaCvIntransitiveFrameMismatch({
        sourceFrame: context.classAPaCvIntransitiveSourceFrame,
        operationFrame: context.classAPaCvIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassANaCvIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassANaCvIntransitiveFrameMismatch === "function" && !targetObject.getPretClassANaCvIntransitiveFrameMismatch({
        sourceFrame: context.classANaCvIntransitiveSourceFrame,
        operationFrame: context.classANaCvIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBVnaIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBVnaIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBVnaIntransitiveFrameMismatch({
        sourceFrame: context.classBVnaIntransitiveSourceFrame,
        operationFrame: context.classBVnaIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBTaIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBTaIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBTaIntransitiveFrameMismatch({
        sourceFrame: context.classBTaIntransitiveSourceFrame,
        operationFrame: context.classBTaIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBTaTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBTaTransitiveFrameMismatch === "function" && !targetObject.getPretClassBTaTransitiveFrameMismatch({
        sourceFrame: context.classBTaTransitiveSourceFrame,
        operationFrame: context.classBTaTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBKwiCvIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBKwiCvIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBKwiCvIntransitiveFrameMismatch({
        sourceFrame: context.classBKwiCvIntransitiveSourceFrame,
        operationFrame: context.classBKwiCvIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBVcvcuIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBVcvcuIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBVcvcuIntransitiveFrameMismatch({
        sourceFrame: context.classBVcvcuIntransitiveSourceFrame,
        operationFrame: context.classBVcvcuIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBVlcvwiIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBVlcvwiIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBVlcvwiIntransitiveFrameMismatch({
        sourceFrame: context.classBVlcvwiIntransitiveSourceFrame,
        operationFrame: context.classBVlcvwiIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBCvniuIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBCvniuIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBCvniuIntransitiveFrameMismatch({
        sourceFrame: context.classBCvniuIntransitiveSourceFrame,
        operationFrame: context.classBCvniuIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvvniIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvvniIntransitiveFrameMismatch === "function" && !targetObject.getPretClassACvvniIntransitiveFrameMismatch({
        sourceFrame: context.classACvvniIntransitiveSourceFrame,
        operationFrame: context.classACvvniIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvsvIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvsvIntransitiveFrameMismatch === "function" && !targetObject.getPretClassACvsvIntransitiveFrameMismatch({
        sourceFrame: context.classACvsvIntransitiveSourceFrame,
        operationFrame: context.classACvsvIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvwiIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvwiIntransitiveFrameMismatch === "function" && !targetObject.getPretClassACvwiIntransitiveFrameMismatch({
        sourceFrame: context.classACvwiIntransitiveSourceFrame,
        operationFrame: context.classACvwiIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassACvcvwiIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassACvcvwiIntransitiveFrameMismatch === "function" && !targetObject.getPretClassACvcvwiIntransitiveFrameMismatch({
        sourceFrame: context.classACvcvwiIntransitiveSourceFrame,
        operationFrame: context.classACvcvwiIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBVjwaIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBVjwaIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBVjwaIntransitiveFrameMismatch({
        sourceFrame: context.classBVjwaIntransitiveSourceFrame,
        operationFrame: context.classBVjwaIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassBCuwaIntransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassBCuwaIntransitiveFrameMismatch === "function" && !targetObject.getPretClassBCuwaIntransitiveFrameMismatch({
        sourceFrame: context.classBCuwaIntransitiveSourceFrame,
        operationFrame: context.classBCuwaIntransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassANiCvTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassANiCvTransitiveFrameMismatch === "function" && !targetObject.getPretClassANiCvTransitiveFrameMismatch({
        sourceFrame: context.classANiCvTransitiveSourceFrame,
        operationFrame: context.classANiCvTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassANaCvTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassANaCvTransitiveFrameMismatch === "function" && !targetObject.getPretClassANaCvTransitiveFrameMismatch({
        sourceFrame: context.classANaCvTransitiveSourceFrame,
        operationFrame: context.classANaCvTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassANaCvcvcvTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassANaCvcvcvTransitiveFrameMismatch === "function" && !targetObject.getPretClassANaCvcvcvTransitiveFrameMismatch({
        sourceFrame: context.classANaCvcvcvTransitiveSourceFrame,
        operationFrame: context.classANaCvcvcvTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassANaCvlvcvTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassANaCvlvcvTransitiveFrameMismatch === "function" && !targetObject.getPretClassANaCvlvcvTransitiveFrameMismatch({
        sourceFrame: context.classANaCvlvcvTransitiveSourceFrame,
        operationFrame: context.classANaCvlvcvTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassANaVlcvcvTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassANaVlcvcvTransitiveFrameMismatch === "function" && !targetObject.getPretClassANaVlcvcvTransitiveFrameMismatch({
        sourceFrame: context.classANaVlcvcvTransitiveSourceFrame,
        operationFrame: context.classANaVlcvcvTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassANaVjcvcvTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassANaVjcvcvTransitiveFrameMismatch === "function" && !targetObject.getPretClassANaVjcvcvTransitiveFrameMismatch({
        sourceFrame: context.classANaVjcvcvTransitiveSourceFrame,
        operationFrame: context.classANaVjcvcvTransitiveOperationFrame
      }));
    }
    function hasAuthoritativePretClassATzaTransitiveFrame(context = null) {
      return Boolean(context && typeof targetObject.getPretClassATzaTransitiveFrameMismatch === "function" && !targetObject.getPretClassATzaTransitiveFrameMismatch({
        sourceFrame: context.classATzaTransitiveSourceFrame,
        operationFrame: context.classATzaTransitiveOperationFrame
      }));
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
        const baseSpecFrameResult = buildPretRootPlusYaClassABaseSpecsFromSourceFrame(context.rootPlusYaSourceFrame, context);
        if (!baseSpecFrameResult.ok) {
          return null;
        }
        const baseSpecs = baseSpecFrameResult.baseSpecs;
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
      const allowIntransitiveChiClassA = hasAuthoritativePretClassAChiAllowFrame(context);
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
      const hasMTransitiveRightEdge = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        finalOnset: "m",
        finalNuclei: ["a", "i"]
      });
      const allowMTransitiveClassA = hasAuthoritativePretClassAMTransitiveFrame(context);
      const classAMTransitivePolicyFrame = allowMTransitiveClassA ? context.classAMTransitiveOperationFrame : null;
      const hasPiIntransitiveRightEdge = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "p+i"
      });
      const allowPiIntransitiveClassA = hasAuthoritativePretClassAPiIntransitiveFrame(context);
      const classAPiIntransitivePolicyFrame = allowPiIntransitiveClassA ? context.classAPiIntransitiveOperationFrame : null;
      const hasPiCvTransitiveShape = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "p+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowPiCvTransitiveClassA = hasAuthoritativePretClassAPiCvTransitiveFrame(context);
      const classAPiCvTransitivePolicyFrame = allowPiCvTransitiveClassA ? context.classAPiCvTransitiveOperationFrame : null;
      const hasCvwiTransitiveShape = context.isTransitive && !context.isMonosyllable && context.isReduplicated !== true && hasRightEdge({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowCvwiTransitiveClassA = hasAuthoritativePretClassACvwiTransitiveFrame(context);
      const classACvwiTransitivePolicyFrame = allowCvwiTransitiveClassA ? context.classACvwiTransitiveOperationFrame : null;
      const hasCvcvwiTransitiveShape = context.isTransitive && !context.isMonosyllable && context.isReduplicated !== true && targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.wiCV_CV_CV);
      const allowCvcvwiTransitiveClassA = hasAuthoritativePretClassACvcvwiTransitiveFrame(context);
      const classACvcvwiTransitivePolicyFrame = allowCvcvwiTransitiveClassA ? context.classACvcvwiTransitiveOperationFrame : null;
      const hasCvwaiTransitiveShape = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+a",
        rightEdgeProfiles: ["CV|CV"],
        previousNucleus: "i"
      });
      const allowCvwaiTransitiveClassA = hasAuthoritativePretClassACvwaiTransitiveFrame(context);
      const classACvwaiTransitivePolicyFrame = allowCvwaiTransitiveClassA ? context.classACvwaiTransitiveOperationFrame : null;
      const hasCvewaTransitiveShape = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+a",
        rightEdgeProfiles: ["CV|CV"],
        previousNucleus: "e"
      });
      const allowCvewaTransitiveClassA = hasAuthoritativePretClassACvewaTransitiveFrame(context);
      const classACvewaTransitivePolicyFrame = allowCvewaTransitiveClassA ? context.classACvewaTransitiveOperationFrame : null;
      const hasCvawaTransitiveShape = context.isTransitive && !context.isMonosyllable && context.isReduplicated !== true && context.hasSlashMarker !== true && hasRightEdge({
        endingFamily: "w+a",
        rightEdgeProfiles: ["CV|CV"],
        previousNucleus: "a"
      });
      const allowCvawaTransitiveClassA = hasAuthoritativePretClassACvawaTransitiveFrame(context);
      const classACvawaTransitivePolicyFrame = allowCvawaTransitiveClassA ? context.classACvawaTransitiveOperationFrame : null;
      const hasPaTransitiveRightEdge = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "p+a"
      });
      const allowPaTransitiveClassA = hasAuthoritativePretClassAPaTransitiveFrame(context);
      const classAPaTransitivePolicyFrame = allowPaTransitiveClassA ? context.classAPaTransitiveOperationFrame : null;
      const hasPaCvIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "p+a",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowPaCvIntransitiveClassA = hasAuthoritativePretClassAPaCvIntransitiveFrame(context);
      const classAPaCvIntransitivePolicyFrame = allowPaCvIntransitiveClassA ? context.classAPaCvIntransitiveOperationFrame : null;
      const hasNaCvIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowNaCvIntransitiveClassA = hasAuthoritativePretClassANaCvIntransitiveFrame(context);
      const classANaCvIntransitivePolicyFrame = allowNaCvIntransitiveClassA ? context.classANaCvIntransitiveOperationFrame : null;
      const hasCvvniIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+i",
        rightEdgeProfiles: ["CV|V|CV"]
      });
      const allowCvvniIntransitiveClassA = hasAuthoritativePretClassACvvniIntransitiveFrame(context);
      const classACvvniIntransitivePolicyFrame = allowCvvniIntransitiveClassA ? context.classACvvniIntransitiveOperationFrame : null;
      const hasCvsvIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "s+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowCvsvIntransitiveClassA = hasAuthoritativePretClassACvsvIntransitiveFrame(context);
      const classACvsvIntransitivePolicyFrame = allowCvsvIntransitiveClassA ? context.classACvsvIntransitiveOperationFrame : null;
      const hasCvwiIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowCvwiIntransitiveClassA = hasAuthoritativePretClassACvwiIntransitiveFrame(context);
      const classACvwiIntransitivePolicyFrame = allowCvwiIntransitiveClassA ? context.classACvwiIntransitiveOperationFrame : null;
      const hasCvcvwiIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV|CV"]
      });
      const allowCvcvwiIntransitiveClassA = hasAuthoritativePretClassACvcvwiIntransitiveFrame(context);
      const classACvcvwiIntransitivePolicyFrame = allowCvcvwiIntransitiveClassA ? context.classACvcvwiIntransitiveOperationFrame : null;
      const hasNiCvTransitiveShape = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowNiCvTransitiveClassA = hasAuthoritativePretClassANiCvTransitiveFrame(context);
      const classANiCvTransitivePolicyFrame = allowNiCvTransitiveClassA ? context.classANiCvTransitiveOperationFrame : null;
      const hasNaCvTransitiveShape = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowNaCvTransitiveClassA = hasAuthoritativePretClassANaCvTransitiveFrame(context);
      const classANaCvTransitivePolicyFrame = allowNaCvTransitiveClassA ? context.classANaCvTransitiveOperationFrame : null;
      const isTransitiveShapeCVCVna = context.isTransitive && targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.naCV_CV_CV);
      const allowNaCvcvcvTransitiveClassA = hasAuthoritativePretClassANaCvcvcvTransitiveFrame(context);
      const classANaCvcvcvTransitivePolicyFrame = allowNaCvcvcvTransitiveClassA ? context.classANaCvcvcvTransitiveOperationFrame : null;
      const hasNaCvlvcvTransitiveShape = context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CVl|V|CV"]
      });
      const allowNaCvlvcvTransitiveClassA = hasAuthoritativePretClassANaCvlvcvTransitiveFrame(context);
      const classANaCvlvcvTransitivePolicyFrame = allowNaCvlvcvTransitiveClassA ? context.classANaCvlvcvTransitiveOperationFrame : null;
      const hasNaVlcvcvTransitiveShape = context.isTransitive && !context.isMonosyllable && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vlcvna);
      const allowNaVlcvcvTransitiveClassA = hasAuthoritativePretClassANaVlcvcvTransitiveFrame(context);
      const classANaVlcvcvTransitivePolicyFrame = allowNaVlcvcvTransitiveClassA ? context.classANaVlcvcvTransitiveOperationFrame : null;
      const hasNaVjcvcvTransitiveShape = context.isTransitive && !context.isMonosyllable && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vjcvna);
      const allowNaVjcvcvTransitiveClassA = hasAuthoritativePretClassANaVjcvcvTransitiveFrame(context);
      const classANaVjcvcvTransitivePolicyFrame = allowNaVjcvcvTransitiveClassA ? context.classANaVjcvcvTransitiveOperationFrame : null;
      const hasTzaTransitiveShape = context.isTransitive && !context.isMonosyllable && (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvtza) || patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vjcvtza));
      const allowTzaTransitiveClassA = hasAuthoritativePretClassATzaTransitiveFrame(context);
      const classATzaTransitivePolicyFrame = allowTzaTransitiveClassA ? context.classATzaTransitiveOperationFrame : null;
      const isTransitiveCVnaAllowZero = context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvna) && (context.isReduplicated || context.isBitransitive);
      const isTransitiveShapeNi = context.isTransitive && !patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvnV) && patterns.hasShapeEndingFamily("n+i");
      const isTransitiveTaRedupCVCV = hasAuthoritativePretClassATaRedupFrame(context);
      const allowSlashAkiZero = !context.isTransitive && context.hasSlashMarker && hasAuthoritativePretClassASlashAkiZeroFrame(context);
      const forceClassAForKWV = hasAuthoritativePretClassAKwvForceFrame(context);
      const isDenominalWiVowelSourceClassA = !context.isTransitive && context.isDenominalMatrixInput && context.isDenominalWiMatrix && context.denominalSourceEndsWithVowel;
      if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvsV)) {
        if (hasCvsvIntransitiveShape && !allowCvsvIntransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
      }
      if (hasPiCvTransitiveShape) {
        if (!allowPiCvTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      } else if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvpV)) {
        if (hasPaTransitiveRightEdge) {
          if (!allowPaTransitiveClassA) {
            return null;
          }
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasCvwiTransitiveShape) {
        if (!allowCvwiTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasCvcvwiTransitiveShape) {
        if (!allowCvcvwiTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = classACvcvwiTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classACvcvwiTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (hasCvwaiTransitiveShape) {
        if (!allowCvwaiTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = classACvwaiTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classACvwaiTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (hasCvewaTransitiveShape) {
        if (!allowCvewaTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = classACvewaTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classACvewaTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (hasCvawaTransitiveShape) {
        if (!allowCvawaTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = classACvawaTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classACvawaTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (hasPaCvIntransitiveShape) {
        if (!allowPaCvIntransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasNaCvIntransitiveShape) {
        if (!allowNaCvIntransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasCvvniIntransitiveShape) {
        if (!allowCvvniIntransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasCvwiIntransitiveShape) {
        if (!allowCvwiIntransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasCvcvwiIntransitiveShape) {
        if (!allowCvcvwiIntransitiveClassA) {
          return null;
        }
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (!context.isTransitive && (patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.waPattern) || patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.lwaPattern)) && !isEwaAllowZero) {
        allowZeroSuffix = false;
      }
      const isKSeriesNoU = ["k", "kw"].includes(finalOnset) && finalNucleus !== "u";
      const allowIntransitiveKV = finalOnset === "kw" ? forceClassAForKWV : finalOnset === "k" ? hasAuthoritativePretClassAKvAllowFrame(context) : context.allowIntransitiveKV === true;
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
        if (hasTzaTransitiveShape && !allowTzaTransitiveClassA) {
          return null;
        }
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
      if (hasPaTransitiveRightEdge && !allowPaTransitiveClassA) {
        return null;
      }
      if (allowPaTransitiveClassA) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasMTransitiveRightEdge && !allowMTransitiveClassA) {
        return null;
      }
      if (hasPiIntransitiveRightEdge && !allowPiIntransitiveClassA) {
        return null;
      }
      if (hasNiCvTransitiveShape && !allowNiCvTransitiveClassA) {
        return null;
      }
      if (allowNiCvTransitiveClassA) {
        allowZeroSuffix = classANiCvTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classANiCvTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (hasNaCvTransitiveShape && !allowNaCvTransitiveClassA) {
        return null;
      }
      if (allowNaCvTransitiveClassA) {
        allowZeroSuffix = classANaCvTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classANaCvTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (isTransitiveShapeCVCVna && !allowNaCvcvcvTransitiveClassA) {
        return null;
      }
      if (hasNaCvlvcvTransitiveShape && !allowNaCvlvcvTransitiveClassA) {
        return null;
      }
      if (allowNaCvlvcvTransitiveClassA) {
        allowZeroSuffix = classANaCvlvcvTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classANaCvlvcvTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (hasNaVlcvcvTransitiveShape && !allowNaVlcvcvTransitiveClassA) {
        return null;
      }
      if (hasNaVjcvcvTransitiveShape && !allowNaVjcvcvTransitiveClassA) {
        return null;
      }
      if (hasTzaTransitiveShape && !allowTzaTransitiveClassA) {
        return null;
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
        if (context.totalVowels <= 2 && !hasNaCvIntransitiveShape && !patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvna)) {
          return null;
        }
        if (hasNaCvIntransitiveShape && !allowNaCvIntransitiveClassA) {
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
          if (!allowNaCvTransitiveClassA) {
            return null;
          }
          allowZeroSuffix = classANaCvTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
          allowKiSuffix = classANaCvTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
        } else if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvni)) {
          if (!allowNiCvTransitiveClassA) {
            return null;
          }
          allowZeroSuffix = classANiCvTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
          allowKiSuffix = classANiCvTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
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
        if (!allowNaCvcvcvTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = classANaCvcvcvTransitivePolicyFrame?.targetFrame?.allowZeroSuffix === true;
        allowKiSuffix = classANaCvcvcvTransitivePolicyFrame?.targetFrame?.allowKiSuffix === true;
      }
      if (isTransitiveCVnaAllowZero && !allowNaCvTransitiveClassA) {
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (isTransitiveShapeNi) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (hasMTransitiveRightEdge) {
        if (!allowMTransitiveClassA) {
          return null;
        }
        allowZeroSuffix = true;
        allowKiSuffix = true;
      }
      if (allowPiIntransitiveClassA) {
        allowZeroSuffix = false;
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
      if (!forceClassAForKWV) {
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
        if (classACvcvwiTransitivePolicyFrame) {
          allowZeroSuffix = classACvcvwiTransitivePolicyFrame.targetFrame?.allowZeroSuffix === true;
          allowKiSuffix = classACvcvwiTransitivePolicyFrame.targetFrame?.allowKiSuffix === true;
        } else {
          allowZeroSuffix = true;
          allowKiSuffix = false;
        }
      }
      if (isTransitiveTaRedupCVCV) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      if (context.classAKiOnly) {
        allowZeroSuffix = false;
        allowKiSuffix = true;
      }
      const hasItaClassASourceShape = context.isTransitive && context.isItaVerb && Array.isArray(context.syllableForms) && context.syllableForms.length === 2 && context.syllableForms[0] === "V" && context.syllableForms[1] === "CV" && context.rightEdgeDescriptor?.previousNucleus === "i" && context.rightEdgeDescriptor?.finalOnset === "t" && context.rightEdgeDescriptor?.finalNucleus === "a";
      if (hasItaClassASourceShape) {
        const itaFrameResult = buildPretClassAItaBaseSpecsFromSourceFrame(context.itaClassASourceFrame, context);
        if (!itaFrameResult.ok) {
          return null;
        }
        const variants = [];
        const itaStemSpec = itaFrameResult.baseSpecs[0] || null;
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
      const hasDirectYyaRightEdge = !context.isTransitive && context.rightEdgeDescriptor?.finalOnset === "y" && context.rightEdgeDescriptor?.finalNucleus === "a" && context.rightEdgeDescriptor?.previousForm === "C" && context.rightEdgeDescriptor?.previousOnset === "y";
      if (hasDirectYyaRightEdge) {
        const yyaFrameResult = buildPretClassAYyaBaseSpecsFromSourceFrame(context.yyaClassASourceFrame, context);
        if (!yyaFrameResult.ok) {
          return null;
        }
        const baseSpec = yyaFrameResult.baseSpecs[0] || null;
        const base = realizePretBaseSpec(baseSpec, "");
        if (!isAllowedStem(base)) {
          return null;
        }
        return [buildPretVariant("", "ki", {
          baseSpec
        })];
      }
      const deletionFrameResult = buildPretClassAFinalVowelDeletionBaseSpecsFromSourceFrame(context.classAFinalVowelDeletionSourceFrame, context);
      if (!deletionFrameResult.ok) {
        return null;
      }
      let deletedVariants = deletionFrameResult.baseSpecs.map(baseSpec => buildPretVariant("", "", {
        baseSpec
      })).filter(Boolean);
      if (context.isTransitive && patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.vccawa)) {
        deletedVariants = deletedVariants.filter(variant => !getPretVariantBase(variant).endsWith("j"));
      }
      if (classACvawaTransitivePolicyFrame?.targetFrame?.allowJBaseVariant === false || context.isTransitive && patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.kawa) && !(context.isReduplicated || context.hasSlashMarker)) {
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
            baseSpec: variant.baseSpec,
            routePolicyFrame: classAMTransitivePolicyFrame || classAPiIntransitivePolicyFrame || classAPaTransitivePolicyFrame || classAPiCvTransitivePolicyFrame || classACvwiTransitivePolicyFrame || classACvcvwiTransitivePolicyFrame || classACvwaiTransitivePolicyFrame || classACvewaTransitivePolicyFrame || classACvawaTransitivePolicyFrame || classAPaCvIntransitivePolicyFrame || classANaCvIntransitivePolicyFrame || classACvvniIntransitivePolicyFrame || classACvsvIntransitivePolicyFrame || classANiCvTransitivePolicyFrame || classANaCvTransitivePolicyFrame || classANaCvcvcvTransitivePolicyFrame || classANaCvlvcvTransitivePolicyFrame || classANaVlcvcvTransitivePolicyFrame || classANaVjcvcvTransitivePolicyFrame || classATzaTransitivePolicyFrame || classACvwiIntransitivePolicyFrame || classACvcvwiIntransitivePolicyFrame
          });
        }
        if (allowZeroSuffix) {
          addUniquePretVariant(variants, "", "", {
            baseSpec: variant.baseSpec,
            routePolicyFrame: classAMTransitivePolicyFrame || classAPiIntransitivePolicyFrame || classAPaTransitivePolicyFrame || classAPiCvTransitivePolicyFrame || classACvwiTransitivePolicyFrame || classACvcvwiTransitivePolicyFrame || classACvwaiTransitivePolicyFrame || classACvewaTransitivePolicyFrame || classACvawaTransitivePolicyFrame || classAPaCvIntransitivePolicyFrame || classANaCvIntransitivePolicyFrame || classACvvniIntransitivePolicyFrame || classACvsvIntransitivePolicyFrame || classANiCvTransitivePolicyFrame || classANaCvTransitivePolicyFrame || classANaCvcvcvTransitivePolicyFrame || classANaCvlvcvTransitivePolicyFrame || classANaVlcvcvTransitivePolicyFrame || classANaVjcvcvTransitivePolicyFrame || classATzaTransitivePolicyFrame || classACvwiIntransitivePolicyFrame || classACvcvwiIntransitivePolicyFrame
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
      const hasTaIntransitiveRightEdge = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "t+a"
      });
      const allowTaIntransitiveClassB = hasAuthoritativePretClassBTaIntransitiveFrame(context);
      const classBTaIntransitivePolicyFrame = allowTaIntransitiveClassB ? context.classBTaIntransitiveOperationFrame : null;
      const hasTaTransitiveRightEdge = context.isTransitive && !context.isMonosyllable && context.isItaVerb !== true && hasRightEdge({
        endingFamily: "t+a"
      });
      const allowTaTransitiveClassB = hasAuthoritativePretClassBTaTransitiveFrame(context);
      const classBTaTransitivePolicyFrame = allowTaTransitiveClassB ? context.classBTaTransitiveOperationFrame : null;
      const hasPiIntransitiveRightEdge = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "p+i"
      });
      const allowPiIntransitiveClassB = hasAuthoritativePretClassAPiIntransitiveFrame(context);
      const classAPiIntransitivePolicyFrame = allowPiIntransitiveClassB ? context.classAPiIntransitiveOperationFrame : null;
      const hasPaCvIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "p+a",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowPaCvIntransitiveClassB = hasAuthoritativePretClassAPaCvIntransitiveFrame(context);
      const classAPaCvIntransitivePolicyFrame = allowPaCvIntransitiveClassB ? context.classAPaCvIntransitiveOperationFrame : null;
      const hasNaCvIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+a",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowNaCvIntransitiveClassB = hasAuthoritativePretClassANaCvIntransitiveFrame(context);
      const classANaCvIntransitivePolicyFrame = allowNaCvIntransitiveClassB ? context.classANaCvIntransitiveOperationFrame : null;
      const hasVnaIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+a",
        rightEdgeProfiles: ["V|CV"]
      });
      const allowVnaIntransitiveClassB = hasAuthoritativePretClassBVnaIntransitiveFrame(context);
      const classBVnaIntransitivePolicyFrame = allowVnaIntransitiveClassB ? context.classBVnaIntransitiveOperationFrame : null;
      const hasKwiCvIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "kw+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowKwiCvIntransitiveClassB = hasAuthoritativePretClassBKwiCvIntransitiveFrame(context);
      const classBKwiCvIntransitivePolicyFrame = allowKwiCvIntransitiveClassB ? context.classBKwiCvIntransitiveOperationFrame : null;
      const hasVcvcuIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        rightEdgeProfiles: ["V|CV|CV"],
        finalNucleus: "u"
      });
      const allowVcvcuIntransitiveClassB = hasAuthoritativePretClassBVcvcuIntransitiveFrame(context);
      const classBVcvcuIntransitivePolicyFrame = allowVcvcuIntransitiveClassB ? context.classBVcvcuIntransitiveOperationFrame : null;
      const hasVlcvwiIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+i",
        rightEdgeProfiles: ["Vl|CV|CV"]
      });
      const allowVlcvwiIntransitiveClassB = hasAuthoritativePretClassBVlcvwiIntransitiveFrame(context);
      const classBVlcvwiIntransitivePolicyFrame = allowVlcvwiIntransitiveClassB ? context.classBVlcvwiIntransitiveOperationFrame : null;
      const hasCvniuIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+i",
        rightEdgeProfiles: ["CV|CV"],
        previousNucleus: "u"
      });
      const allowCvniuIntransitiveClassB = hasAuthoritativePretClassBCvniuIntransitiveFrame(context);
      const classBCvniuIntransitivePolicyFrame = allowCvniuIntransitiveClassB ? context.classBCvniuIntransitiveOperationFrame : null;
      const hasCvvniIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "n+i",
        rightEdgeProfiles: ["CV|V|CV"]
      });
      const allowCvvniIntransitiveClassB = hasAuthoritativePretClassACvvniIntransitiveFrame(context);
      const classACvvniIntransitivePolicyFrame = allowCvvniIntransitiveClassB ? context.classACvvniIntransitiveOperationFrame : null;
      const hasCvsvIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "s+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowCvsvIntransitiveClassB = hasAuthoritativePretClassACvsvIntransitiveFrame(context);
      const classACvsvIntransitivePolicyFrame = allowCvsvIntransitiveClassB ? context.classACvsvIntransitiveOperationFrame : null;
      const hasCvwiTransitiveShape = context.isTransitive && !context.isMonosyllable && context.isReduplicated !== true && hasRightEdge({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowCvwiTransitiveClassB = hasAuthoritativePretClassACvwiTransitiveFrame(context);
      const classACvwiTransitivePolicyFrame = allowCvwiTransitiveClassB ? context.classACvwiTransitiveOperationFrame : null;
      const hasCvcvwiTransitiveShape = context.isTransitive && !context.isMonosyllable && context.isReduplicated !== true && targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.wiCV_CV_CV);
      const allowCvcvwiTransitiveClassB = hasAuthoritativePretClassACvcvwiTransitiveFrame(context);
      const classACvcvwiTransitivePolicyFrame = allowCvcvwiTransitiveClassB ? context.classACvcvwiTransitiveOperationFrame : null;
      const hasCvwiIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV"]
      });
      const allowCvwiIntransitiveClassB = hasAuthoritativePretClassACvwiIntransitiveFrame(context);
      const classACvwiIntransitivePolicyFrame = allowCvwiIntransitiveClassB ? context.classACvwiIntransitiveOperationFrame : null;
      const hasCvcvwiIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+i",
        rightEdgeProfiles: ["CV|CV|CV"]
      });
      const allowCvcvwiIntransitiveClassB = hasAuthoritativePretClassACvcvwiIntransitiveFrame(context);
      const classACvcvwiIntransitivePolicyFrame = allowCvcvwiIntransitiveClassB ? context.classACvcvwiIntransitiveOperationFrame : null;
      const hasVjwaIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+a",
        rightEdgeProfiles: ["Vj|CV"]
      });
      const allowVjwaIntransitiveClassB = hasAuthoritativePretClassBVjwaIntransitiveFrame(context);
      const classBVjwaIntransitivePolicyFrame = allowVjwaIntransitiveClassB ? context.classBVjwaIntransitiveOperationFrame : null;
      const hasCuwaIntransitiveShape = !context.isTransitive && !context.isMonosyllable && hasRightEdge({
        endingFamily: "w+a",
        rightEdgeProfiles: ["CV|CV"],
        previousNucleus: "u"
      });
      const allowCuwaIntransitiveClassB = hasAuthoritativePretClassBCuwaIntransitiveFrame(context);
      const classBCuwaIntransitivePolicyFrame = allowCuwaIntransitiveClassB ? context.classBCuwaIntransitiveOperationFrame : null;
      if (!context.isTransitive && context.fromRootPlusYa) {
        const rootPlusYaFrameResult = buildPretRootPlusYaClassBBaseSpecsFromSourceFrame(context.rootPlusYaSourceFrame, context);
        if (!rootPlusYaFrameResult.ok) {
          return null;
        }
        if (isSlashDenominalRootPlusYaMatrix(context)) {
          const deletedYaBase = rootPlusYaFrameResult.deletedYaBase;
          if (!deletedYaBase || !isAllowedStem(deletedYaBase)) {
            return null;
          }
          return [buildPretVariant("", "k", {
            baseSpec: rootPlusYaFrameResult.deletedYaBaseSpec
          })];
        }
        if (context.isWeya) {
          return [buildPretVariant("", "k", {
            baseSpec: rootPlusYaFrameResult.sourceVerbBaseSpec
          })];
        }
        const variants = [buildPretVariant("", "k", {
          baseSpec: rootPlusYaFrameResult.sourceVerbBaseSpec
        })].filter(Boolean);
        const rootPlusYaBase = rootPlusYaFrameResult.rootBase;
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
        const slashEmbeddedYaBase = context.hasSlashMarker ? rootPlusYaFrameResult.deletedYaBase : "";
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
      if (!context.isTransitive && (patterns.hasAggregate(targetObject.PRET_DESCRIPTOR_QUERIES.aggregate.waPattern) || hasCuwaIntransitiveShape)) {
        const classBFrameResult = buildPretClassBBaseSpecsFromSourceFrame(context.classBSourceFrame, context);
        if (!classBFrameResult.ok) {
          return null;
        }
        if (hasCuwaIntransitiveShape) {
          if (!allowCuwaIntransitiveClassB) {
            return null;
          }
          const cuwaTargetSuffix = classBCuwaIntransitivePolicyFrame?.targetFrame?.targetSuffix || "";
          if (!cuwaTargetSuffix) {
            return null;
          }
          return [buildPretVariant("", cuwaTargetSuffix, {
            baseSpec: classBFrameResult.baseSpecs[0],
            routePolicyFrame: classBCuwaIntransitivePolicyFrame
          })].filter(Boolean);
        }
        if (context.isReduplicated || !targetObject.pretContextHasRightEdge(context, targetObject.PRET_RIGHT_EDGE_RULE_QUERIES.waCV_CV_CV)) {
          return null;
        }
        return [buildPretVariant("", "k", {
          baseSpec: classBFrameResult.baseSpecs[0]
        })].filter(Boolean);
      }
      if (patterns.hasShape(targetObject.PRET_DESCRIPTOR_QUERIES.shape.cvsV) && !hasRightEdge({
        finalForm: "V",
        finalNucleus: "u"
      })) {
        if (hasCvsvIntransitiveShape && !allowCvsvIntransitiveClassB) {
          return null;
        }
        if (context.lastNucleus !== "i" || context.isTransitive) {
          return null;
        }
      }
      if (context.vowelCount !== 1) {
        return null;
      }
      if (hasTaIntransitiveRightEdge && !allowTaIntransitiveClassB) {
        return null;
      }
      if (hasTaTransitiveRightEdge && !allowTaTransitiveClassB) {
        return null;
      }
      if (hasPiIntransitiveRightEdge && !allowPiIntransitiveClassB) {
        return null;
      }
      if (hasPaCvIntransitiveShape && !allowPaCvIntransitiveClassB) {
        return null;
      }
      if (hasNaCvIntransitiveShape && !allowNaCvIntransitiveClassB) {
        return null;
      }
      if (hasVnaIntransitiveShape && !allowVnaIntransitiveClassB) {
        return null;
      }
      if (hasKwiCvIntransitiveShape && !allowKwiCvIntransitiveClassB) {
        return null;
      }
      if (hasVcvcuIntransitiveShape && !allowVcvcuIntransitiveClassB) {
        return null;
      }
      if (hasVlcvwiIntransitiveShape && !allowVlcvwiIntransitiveClassB) {
        return null;
      }
      if (hasCvniuIntransitiveShape && !allowCvniuIntransitiveClassB) {
        return null;
      }
      if (hasCvvniIntransitiveShape && !allowCvvniIntransitiveClassB) {
        return null;
      }
      if (hasCvsvIntransitiveShape && !allowCvsvIntransitiveClassB) {
        return null;
      }
      if (hasCvwiTransitiveShape && !allowCvwiTransitiveClassB) {
        return null;
      }
      if (hasCvcvwiTransitiveShape && !allowCvcvwiTransitiveClassB) {
        return null;
      }
      if (hasCvwiIntransitiveShape && !allowCvwiIntransitiveClassB) {
        return null;
      }
      if (hasCvcvwiIntransitiveShape && !allowCvcvwiIntransitiveClassB) {
        return null;
      }
      if (hasVjwaIntransitiveShape && !allowVjwaIntransitiveClassB) {
        return null;
      }
      if (hasCuwaIntransitiveShape && !allowCuwaIntransitiveClassB) {
        return null;
      }
      const classBFrameResult = buildPretClassBBaseSpecsFromSourceFrame(context.classBSourceFrame, context);
      if (!classBFrameResult.ok) {
        return null;
      }
      if (!isAllowedStem(classBFrameResult.sourceVerb)) {
        return null;
      }
      let classBTargetSuffix = "k";
      if (hasTaIntransitiveRightEdge) {
        classBTargetSuffix = classBTaIntransitivePolicyFrame?.targetFrame?.targetSuffix || "";
      } else if (hasTaTransitiveRightEdge) {
        classBTargetSuffix = classBTaTransitivePolicyFrame?.targetFrame?.targetSuffix || "";
      } else if (hasVjwaIntransitiveShape) {
        classBTargetSuffix = classBVjwaIntransitivePolicyFrame?.targetFrame?.targetSuffix || "";
      }
      if (!classBTargetSuffix) {
        return null;
      }
      const variants = [buildPretVariant("", classBTargetSuffix, {
        baseSpec: classBFrameResult.baseSpecs[0],
        routePolicyFrame: classBTaIntransitivePolicyFrame || classBTaTransitivePolicyFrame || classAPiIntransitivePolicyFrame || classAPaCvIntransitivePolicyFrame || classANaCvIntransitivePolicyFrame || classBVnaIntransitivePolicyFrame || classBKwiCvIntransitivePolicyFrame || classBVcvcuIntransitivePolicyFrame || classBVlcvwiIntransitivePolicyFrame || classBCvniuIntransitivePolicyFrame || classACvvniIntransitivePolicyFrame || classACvsvIntransitivePolicyFrame || classACvwiTransitivePolicyFrame || classACvcvwiTransitivePolicyFrame || classACvwiIntransitivePolicyFrame || classACvcvwiIntransitivePolicyFrame || classBVjwaIntransitivePolicyFrame || classBCuwaIntransitivePolicyFrame
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
      if (!context) {
        return null;
      }
      const classBFrameResult = buildPretClassBBaseSpecsFromSourceFrame(context.classBSourceFrame, context);
      if (!classBFrameResult.ok) {
        return null;
      }
      const allowUnpronounceableStems = context.allowUnpronounceableStems === true;
      if (!allowUnpronounceableStems && !targetObject.isSyllableSequencePronounceable(classBFrameResult.sourceVerb)) {
        return null;
      }
      return [buildPretVariant("", "k", {
        baseSpec: classBFrameResult.baseSpecs[0]
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
      if (typeof targetObject.composeObj1Chain === "function") {
        return targetObject.composeObj1Chain({
          obj1: objectPrefix,
          markers: [indirectObjectMarker || ""],
          pers1: baseSubjectPrefix
        });
      }
      let adjustedObjectPrefix = objectPrefix;
      adjustedObjectPrefix = targetObject.applyObj2ToObj1Chain(adjustedObjectPrefix, indirectObjectMarker);
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
      if (adjustedPrefix && adjustedBase && targetObject.VOWEL_START_RE.test(adjustedBase) && adjustedPrefix.endsWith("n") && !adjustedPrefix.endsWith("nh") && adjustedPrefix.length >= 2 && targetObject.VOWEL_RE.test(adjustedPrefix[adjustedPrefix.length - 2] || "")) {
        adjustedPrefix = `${adjustedPrefix}h`;
      }
      return {
        prefix: adjustedPrefix,
        base: adjustedBase
      };
    }
    function adjustPretSubjectSupportiveIBeforeIStem(prefix, base) {
      const adjustedBase = String(base || "");
      const adjustedPrefix = String(prefix || "");
      if (!adjustedBase.startsWith("i")) {
        return {
          prefix: adjustedPrefix,
          base: adjustedBase
        };
      }
      if (adjustedPrefix === "ni") {
        return {
          prefix: "n",
          base: adjustedBase
        };
      }
      if (adjustedPrefix === "ti") {
        return {
          prefix: "t",
          base: adjustedBase
        };
      }
      return {
        prefix: adjustedPrefix,
        base: adjustedBase
      };
    }
    function buildPretPrefixBaseContactDiagnostic(id = "", details = {}) {
      return {
        id,
        layer: "preterit-prefix-base-contact-frame",
        ...details
      };
    }
    function blockPretPrefixBaseContact(id = "", details = {}) {
      return {
        ok: false,
        prefix: "",
        base: "",
        diagnostics: [buildPretPrefixBaseContactDiagnostic(id, details)]
      };
    }
    function evaluatePretPrefixBaseContactFrame(contactFrame = null) {
      if (!contactFrame || typeof contactFrame !== "object" || contactFrame.kind !== PRET_PREFIX_BASE_CONTACT_FRAME_KIND || contactFrame.prefixFrame?.kind !== PRET_PREFIX_BASE_CONTACT_SEGMENT_FRAME_KIND || contactFrame.baseFrame?.kind !== PRET_PREFIX_BASE_CONTACT_SEGMENT_FRAME_KIND || contactFrame.operationFrame?.kind !== "preterit-prefix-base-contact-operation-frame") {
        return blockPretPrefixBaseContact("preterit-prefix-base-contact-missing-frame");
      }
      const operationFrame = contactFrame.operationFrame;
      const prefixLetters = Array.isArray(contactFrame.prefixFrame.letters) ? contactFrame.prefixFrame.letters.slice() : getPretContactLetters(contactFrame.prefixFrame.text || "");
      const baseLetters = Array.isArray(contactFrame.baseFrame.letters) ? contactFrame.baseFrame.letters.slice() : getPretContactLetters(contactFrame.baseFrame.text || "");
      if (joinPretContactLetters(prefixLetters) !== normalizePretBaseFrameText(contactFrame.prefixFrame.text || "") || joinPretContactLetters(baseLetters) !== normalizePretBaseFrameText(contactFrame.baseFrame.text || "")) {
        return blockPretPrefixBaseContact("preterit-prefix-base-contact-contradictory-frame", {
          prefix: contactFrame.prefixFrame.text || "",
          base: contactFrame.baseFrame.text || ""
        });
      }
      if (operationFrame.suppressBareKBeforeK === true && joinPretContactLetters(prefixLetters) === "k" && (baseLetters[0] === "k" || baseLetters[0] === "kw")) {
        prefixLetters.length = 0;
      }
      if (operationFrame.composedObjectPrefix === true && prefixLetters[prefixLetters.length - 1] === "k" && (baseLetters[0] === "k" || baseLetters[0] === "kw")) {
        if (baseLetters[0] === "kw") {
          prefixLetters.pop();
        } else {
          baseLetters.shift();
        }
      }
      if (prefixLetters.length && prefixLetters[prefixLetters.length - 1] === "i" && baseLetters[0] === "i") {
        baseLetters.shift();
      }
      if (operationFrame.dropYAfterWal === true && baseLetters[0] === "y" && baseLetters[1] === "a") {
        baseLetters.shift();
      }
      if (prefixLetters.length && baseLetters.length && targetObject.isVerbLetterVowel(baseLetters[0]) && prefixLetters[prefixLetters.length - 1] === "n" && prefixLetters[prefixLetters.length - 2] !== "h" && targetObject.isVerbLetterVowel(prefixLetters[prefixLetters.length - 2] || "")) {
        prefixLetters.push("h");
      }
      return {
        ok: true,
        prefix: joinPretContactLetters(prefixLetters),
        base: joinPretContactLetters(baseLetters),
        diagnostics: [],
        contactFrame
      };
    }
    function adjustPretPrefixBaseContact(contactFrame) {
      return evaluatePretPrefixBaseContactFrame(contactFrame);
    }
    function adjustPretComposedObjectPrefixContact({
      objectPrefix = "",
      base = "",
      baseSubjectPrefix = "",
      allowZeroBitransitiveDrop = false,
      suppressBareKBeforeK = false,
      dropYAfterWal = false
    }) {
      return adjustPretPrefixBaseContact(buildPretPrefixBaseContactFrame({
        prefix: objectPrefix,
        base,
        baseSubjectPrefix,
        contactKind: "composed-object-prefix-base",
        composedObjectPrefix: true,
        suppressBareKBeforeK,
        allowZeroBitransitiveDrop,
        dropYAfterWal
      }));
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
      const adjustedObjectPrefix = composePretUniversalObjectPrefix({
        objectPrefix,
        baseSubjectPrefix,
        indirectObjectMarker,
        hasDoubleDash
      });
      return adjustPretComposedObjectPrefixContact({
        objectPrefix: adjustedObjectPrefix,
        base,
        baseSubjectPrefix,
        allowZeroBitransitiveDrop,
        suppressBareKBeforeK: suppressBareKBeforeK && !indirectObjectMarker,
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
        const subjectAdjusted = adjustPretSubjectSupportiveIBeforeIStem(subjectPrefix + contactAdjusted.prefix, contactAdjusted.base);
        return adjustPretNhBeforeVowel(subjectAdjusted.prefix, subjectAdjusted.base);
      }
      const isThirdPersonMarker = value => value === "ki" || value === "kin" || value === "k";
      const isThirdPersonObject = isThirdPersonMarker(baseObjectPrefix);
      const isShuntlineThirdPersonObject = !isThirdPersonObject && isThirdPersonMarker(indirectObjectMarker);
      const isThirdPersonSubject = baseSubjectPrefix === "" && subjectPrefix === "";
      const subjectHead = isThirdPersonSubject && outputDirectional === "al" && !isThirdPersonObject ? "k" : subjectPrefix;
      if (isThirdPersonObject && outputDirectional === "al") {
        const dropK = baseSubjectPrefix === "ni" || baseSubjectPrefix === "ti" || baseSubjectPrefix === "n" || baseSubjectPrefix === "t";
        const objectTail = baseObjectPrefix === "kin" ? "in" : "";
        const objectHead = targetObject.applyObj2ToObj1Chain(`${dropK ? "" : "k"}${objectTail}`, indirectObjectMarker);
        const directionalizedObjectHead = objectHead.startsWith("k") ? `k${outputDirectional}${objectHead.slice(1)}` : `${outputDirectional}${objectHead}`;
        return adjustPretPrefixBaseContact(buildPretPrefixBaseContactFrame({
          prefix: `${subjectHead}${directionalizedObjectHead}`,
          base: baseCore,
          baseSubjectPrefix,
          contactKind: "directional-object-prefix-base",
          dropYAfterWal
        }));
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
    function normalizePretVariantAssemblySurfaceValue(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitPretVariantAssemblySurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizePretVariantAssemblySurfaceValue(entry)).filter(Boolean);
    }
    function getPretVariantAssemblyResultFrame(result = null) {
      const output = result && typeof result === "object" ? result : {};
      if (output.grammarFrame && typeof output.grammarFrame === "object") {
        return output.grammarFrame;
      }
      if (output.frames && typeof output.frames === "object") {
        return output.frames;
      }
      return null;
    }
    function getPretVariantAssemblyResultFramePayload(result = null) {
      const grammarFrame = getPretVariantAssemblyResultFrame(result);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function getPretVariantAssemblySurfaceForms(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const frameResult = getPretVariantAssemblyResultFramePayload(output);
      const hasResultFrame = Boolean(frameResult);
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.flatMap(entry => splitPretVariantAssemblySurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(output.forms)) {
        forms.push(...output.forms);
      }
      if (!hasResultFrame && output.surface) {
        forms.push(output.surface);
      }
      if (!hasResultFrame && output.result) {
        forms.push(output.result);
      }
      return forms.flatMap(entry => splitPretVariantAssemblySurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getPretVariantAssemblySurface(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const frameResult = getPretVariantAssemblyResultFramePayload(output);
      const candidates = [getPretVariantAssemblySurfaceForms(output)[0], frameResult?.surface, !frameResult ? output.surface || output.result : ""];
      for (const candidate of candidates) {
        const surface = normalizePretVariantAssemblySurfaceValue(candidate);
        if (surface) {
          return surface;
        }
      }
      return "";
    }
    function buildPretUniversalVariantAssemblyDiagnostic({
      id = "preterit-variant-assembly-blocked",
      message = "La ruta preterita/perfectiva no produjo variantes.",
      failedLayer = "route",
      contractLayer = "routeContract",
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || "preterit-variant-assembly-blocked").trim();
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: "error",
        message: String(message || "La ruta preterita/perfectiva no produjo variantes.").trim(),
        failedLayer: String(failedLayer || "route").trim(),
        contractLayer: String(contractLayer || "routeContract").trim(),
        routeFamily: "preterit-variant-assembly",
        routeStage: String(routeStage || "").trim()
      };
    }
    function getPretUniversalSoundSpellingFrameKey(frame = null) {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      return [frame.ruleId || "", frame.grammarSlot || "", frame.syllablePosition || "", frame.sourceSurface || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.segmentRole || "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join(":");
    }
    function pushUniquePretUniversalSoundSpellingFrame(target = [], frame = null) {
      if (!Array.isArray(target) || !frame || typeof frame !== "object" || !frame.ruleId) {
        return;
      }
      const key = getPretUniversalSoundSpellingFrameKey(frame);
      if (!key || target.some(entry => getPretUniversalSoundSpellingFrameKey(entry) === key)) {
        return;
      }
      target.push({
        ...frame
      });
    }
    function collectPretUniversalSoundSpellingFrames(target = [], frames = []) {
      if (!Array.isArray(target)) {
        return target;
      }
      (Array.isArray(frames) ? frames : []).forEach(frame => {
        pushUniquePretUniversalSoundSpellingFrame(target, frame);
      });
      return target;
    }
    function getPretUniversalOutputSoundSpellingFrames(output = null) {
      const source = output && typeof output === "object" ? output : {};
      const grammarFrame = (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null) || (source.frames && typeof source.frames === "object" ? source.frames : null);
      return [...(Array.isArray(source.soundSpellingFrames) ? source.soundSpellingFrames : []), ...(Array.isArray(source.orthographyFrame?.soundSpellingFrames) ? source.orthographyFrame.soundSpellingFrames : []), ...(Array.isArray(grammarFrame?.orthographyFrame?.soundSpellingFrames) ? grammarFrame.orthographyFrame.soundSpellingFrames : [])];
    }
    function buildPretUniversalMCodaSoundSpellingFrame({
      sourceSegmentValue = "",
      targetSegmentValue = "",
      grammarSlot = "STEM",
      syllablePosition = "preterit-perfective-coda"
    } = {}) {
      if (typeof targetObject.buildLesson2SoundSpellingFrame !== "function") {
        return null;
      }
      const frame = targetObject.buildLesson2SoundSpellingFrame({
        ruleId: "m-coda-n",
        source: "m",
        target: "n",
        slot: grammarSlot,
        syllablePosition
      });
      return frame ? {
        ...frame,
        segmentRole: grammarSlot,
        sourceSegmentValue: String(sourceSegmentValue || ""),
        targetSegmentValue: String(targetSegmentValue || "")
      } : null;
    }
    function attachPretUniversalVariantAssemblyGrammarContract(output = null, {
      variants = [],
      subjectPrefix = "",
      objectPrefix = "",
      subjectSuffix = "",
      directionalInputPrefix = "",
      directionalOutputPrefix = "",
      baseSubjectPrefix = "",
      baseObjectPrefix = "",
      pluralSuffix = null,
      indirectObjectMarker = "",
      hasDoubleDash = false,
      isYawi = false,
      routeStage = "assemble-variants",
      enumerable = false,
      diagnosticsOverride = null
    } = {}) {
      const result = output && typeof output === "object" ? output : {};
      const forms = getPretVariantAssemblySurfaceForms(result);
      const surface = getPretVariantAssemblySurface(result);
      const soundSpellingFrames = getPretUniversalOutputSoundSpellingFrames(result);
      const ok = Boolean(surface && forms.length);
      const diagnostics = Array.isArray(diagnosticsOverride) ? diagnosticsOverride : ok ? [] : [buildPretUniversalVariantAssemblyDiagnostic({
        failedLayer: "route",
        contractLayer: "routeContract",
        routeStage
      })];
      if (!Object.prototype.hasOwnProperty.call(result, "diagnostics")) {
        Object.defineProperty(result, "diagnostics", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: diagnostics
        });
      }
      const grammarFrame = typeof targetObject.buildGrammarFrame === "function" ? targetObject.buildGrammarFrame({
        authorityFrame: typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
          sourceEvidence: {
            kind: "preterit-variant-assembly",
            variantCount: Array.isArray(variants) ? variants.length : 0
          },
          evidenceStatus: ok ? "assembled" : "blocked",
          andrewsRefs: ["Andrews Lesson 7"],
          supported: ok
        }) : null,
        unitFrame: {
          unitKind: "verbal-nuclear-clause",
          outputKind: "preterit-variant-assembly",
          generationRoute: "preterit-perfective-class-variants"
        },
        orthographyFrame: {
          surface,
          surfaceForms: forms,
          soundSpellingFrames,
          spellingAuthority: "Nawat/Pipil orthography bridge",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          subjectPrefix: String(subjectPrefix || ""),
          objectPrefix: String(objectPrefix || ""),
          subjectSuffix: String(subjectSuffix || ""),
          baseSubjectPrefix: String(baseSubjectPrefix || subjectPrefix || ""),
          baseObjectPrefix: String(baseObjectPrefix || objectPrefix || ""),
          pluralSuffix: pluralSuffix === null ? null : String(pluralSuffix || ""),
          indirectObjectMarker: String(indirectObjectMarker || ""),
          directionalInputPrefix: String(directionalInputPrefix || ""),
          directionalOutputPrefix: String(directionalOutputPrefix || ""),
          hasDoubleDash: hasDoubleDash === true,
          isYawi: isYawi === true
        },
        stemFrame: {
          variants: Array.isArray(variants) ? variants : [],
          variantCount: Array.isArray(variants) ? variants.length : 0
        },
        nuclearClauseFrame: {
          clauseKind: "verbal-nuclear-clause",
          formula: "#pers1-pers2(STEM)tense-num1-num2#",
          predicateInsideParentheses: true,
          tenseSlot: true
        },
        participantFrame: {
          subject: {
            prefix: String(subjectPrefix || ""),
            suffix: String(subjectSuffix || "")
          },
          object: {
            prefix: String(objectPrefix || ""),
            indirectObjectMarker: String(indirectObjectMarker || "")
          }
        },
        inflectionFrame: {
          route: "preterit-perfective-class-variants",
          pluralSuffix: pluralSuffix === null ? null : String(pluralSuffix || "")
        },
        routeContract: typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
          routeFamily: "preterit-variant-assembly",
          routeStage,
          sourceContract: {
            variantCount: Array.isArray(variants) ? variants.length : 0
          },
          targetContract: {
            outputKind: "preterit-variant-assembly"
          },
          generationAllowed: ok,
          blockingDiagnostics: ok ? [] : diagnostics
        }) : null,
        astFrame: null,
        resultFrame: typeof targetObject.buildGrammarResultFrame === "function" ? targetObject.buildGrammarResultFrame({
          ok,
          surface,
          surfaceForms: forms,
          outputKind: "preterit-variant-assembly",
          generationRoute: "preterit-perfective-class-variants"
        }) : null,
        diagnosticFrame: typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
          status: ok ? "assembled" : "blocked",
          diagnostics,
          blockers: ok ? [] : diagnostics
        }) : null
      }) : null;
      const resultContract = typeof targetObject.buildGrammarResultContract === "function" ? targetObject.buildGrammarResultContract({
        result,
        grammarFrame
      }) : {
        ok,
        surface,
        frames: grammarFrame,
        diagnostics
      };
      Object.defineProperties(result, {
        grammarFrame: {
          configurable: true,
          enumerable,
          writable: true,
          value: grammarFrame
        },
        ok: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.ok
        },
        surface: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.surface
        },
        frames: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.frames
        },
        contractDiagnostics: {
          configurable: true,
          enumerable,
          writable: true,
          value: resultContract.diagnostics
        }
      });
      return result;
    }
    function blockPretVariantAssemblyFromFrame(id = "", routeStage = "variant-assembly-frame-gate", details = {}) {
      return attachPretUniversalVariantAssemblyGrammarContract({
        result: null,
        forms: []
      }, {
        variants: [],
        routeStage,
        diagnosticsOverride: [buildPretUniversalVariantAssemblyDiagnostic({
          id,
          failedLayer: "frame",
          contractLayer: "variantAssemblyFrame",
          routeStage,
          ...details
        })]
      });
    }
    function buildPretUniversalResultDetailedFromVariants(assemblyFrame) {
      if (!assemblyFrame || typeof assemblyFrame !== "object" || assemblyFrame.kind !== PRET_VARIANT_ASSEMBLY_FRAME_KIND) {
        return blockPretVariantAssemblyFromFrame("preterit-variant-assembly-missing-frame");
      }
      const sourceFrame = assemblyFrame.sourceFrame;
      const operationFrame = assemblyFrame.operationFrame;
      if (!sourceFrame || typeof sourceFrame !== "object" || sourceFrame.kind !== PRET_VARIANT_ASSEMBLY_SOURCE_FRAME_KIND || !Array.isArray(sourceFrame.variants)) {
        return blockPretVariantAssemblyFromFrame("preterit-variant-assembly-missing-source-frame");
      }
      if (!operationFrame || typeof operationFrame !== "object" || operationFrame.kind !== PRET_VARIANT_ASSEMBLY_OPERATION_FRAME_KIND) {
        return blockPretVariantAssemblyFromFrame("preterit-variant-assembly-missing-operation-frame");
      }
      if (sourceFrame.variantCount !== sourceFrame.variants.length) {
        return blockPretVariantAssemblyFromFrame("preterit-variant-assembly-contradictory-source-frame");
      }
      const variants = sourceFrame.variants.slice();
      const participantFrame = assemblyFrame.participantFrame || {};
      const directionalFrame = assemblyFrame.directionalFrame || {};
      const inflectionFrame = assemblyFrame.inflectionFrame || {};
      const subjectPrefix = String(participantFrame.subjectPrefix || "");
      const objectPrefix = String(participantFrame.objectPrefix || "");
      const subjectSuffix = String(participantFrame.subjectSuffix || "");
      const directionalInputPrefix = String(directionalFrame.inputPrefix || "");
      const directionalOutputPrefix = String(directionalFrame.outputPrefix || "");
      const baseSubjectPrefix = String(participantFrame.baseSubjectPrefix || subjectPrefix || "");
      const baseObjectPrefix = String(participantFrame.baseObjectPrefix || objectPrefix || "");
      const pluralSuffix = inflectionFrame.pluralSuffix === null ? null : String(inflectionFrame.pluralSuffix || "");
      const indirectObjectMarker = String(participantFrame.indirectObjectMarker || "");
      const hasDoubleDash = participantFrame.hasDoubleDash === true;
      const isYawi = directionalFrame.isYawi === true;
      const hasOptionalSupportiveI = inflectionFrame.hasOptionalSupportiveI === true;
      const optionalSupportiveLetter = String(inflectionFrame.optionalSupportiveLetter || "");
      if (!variants || variants.length === 0) {
        return attachPretUniversalVariantAssemblyGrammarContract({
          result: null,
          forms: []
        }, {
          variants,
          subjectPrefix,
          objectPrefix,
          subjectSuffix,
          directionalInputPrefix,
          directionalOutputPrefix,
          baseSubjectPrefix,
          baseObjectPrefix,
          pluralSuffix,
          indirectObjectMarker,
          hasDoubleDash,
          isYawi,
          routeStage: "variant-source-gate"
        });
      }
      const canUseSegments = typeof targetObject.buildOutputWordSegments === "function" && typeof targetObject.joinOutputWordSegments === "function";
      const soundSpellingFrames = [];
      // Realize a verb core + suffix into a surface text string.
      // When segments are available, buildOutputWordSegments handles the supportive
      // marker and the universal m→n rule (stem-final "m"→"n" before any suffix).
      // For the zero-suffix case the m→n rule must be applied explicitly because
      // buildOutputWordSegments only fires it when subjectSuffix is truthy.
      const realizeForm = (verbCore, suffix, surfaceRuleMeta = null) => {
        if (canUseSegments) {
          const segments = targetObject.buildOutputWordSegments({
            pers1: "",
            obj1: "",
            tronco: verbCore,
            pers2: suffix || "",
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
            surfaceRuleMeta
          });
          if (typeof targetObject.buildOutputSurfaceSoundSpellingFrames === "function") {
            collectPretUniversalSoundSpellingFrames(soundSpellingFrames, targetObject.buildOutputSurfaceSoundSpellingFrames(segments));
          }
          const text = targetObject.joinOutputWordSegments(segments);
          if (!suffix && text.endsWith("m")) {
            const shiftedText = `${text.slice(0, -1)}n`;
            pushUniquePretUniversalSoundSpellingFrame(soundSpellingFrames, buildPretUniversalMCodaSoundSpellingFrame({
              sourceSegmentValue: text,
              targetSegmentValue: shiftedText
            }));
            return shiftedText;
          }
          return text;
        }
        // String fallback when output-segment helpers are not loaded.
        const coreRaw = typeof targetObject.resolveOptionalSupportiveOutputVerb === "function" ? targetObject.resolveOptionalSupportiveOutputVerb({
          pers1: "",
          obj1: "",
          tronco: verbCore,
          hasOptionalSupportiveI,
          optionalSupportiveLetter
        }) : verbCore;
        const core = coreRaw.endsWith("m") ? `${coreRaw.slice(0, -1)}n` : coreRaw;
        if (core !== coreRaw) {
          pushUniquePretUniversalSoundSpellingFrame(soundSpellingFrames, buildPretUniversalMCodaSoundSpellingFrame({
            sourceSegmentValue: coreRaw,
            targetSegmentValue: core
          }));
        }
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
        return attachPretUniversalVariantAssemblyGrammarContract({
          result: results.join(" / "),
          forms: results,
          soundSpellingFrames
        }, {
          variants,
          subjectPrefix,
          objectPrefix,
          subjectSuffix,
          directionalInputPrefix,
          directionalOutputPrefix,
          baseSubjectPrefix,
          baseObjectPrefix,
          pluralSuffix,
          indirectObjectMarker,
          hasDoubleDash,
          isYawi
        });
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
      return attachPretUniversalVariantAssemblyGrammarContract({
        result: results.join(" / "),
        forms: results,
        soundSpellingFrames
      }, {
        variants,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        pluralSuffix,
        indirectObjectMarker,
        hasDoubleDash,
        isYawi
      });
    }
    function buildPretUniversalResultFromVariants(assemblyFrame) {
      return buildPretUniversalResultDetailedFromVariants(assemblyFrame).result;
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
            pers1: "",
            obj1: "",
            tronco: resultVerb,
            pers2: resultSubjectSuffix,
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
          pers1: "",
          obj1: "",
          tronco: resultVerb,
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
      const allowSlashAkiZero = !!(context && !isTransitive && context.hasSlashMarker && hasAuthoritativePretClassASlashAkiZeroFrame(context));
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
      const forceClassAForKWV = hasAuthoritativePretClassAKwvForceFrame(context);
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
        }) && !context.isMonosyllable && hasAuthoritativePretClassAPiIntransitiveFrame(context)),
        isCVVniPattern: Boolean(context && targetObject.pretContextHasRightEdge(context, {
          endingFamily: "n+i",
          rightEdgeProfiles: ["CV|V|CV"]
        }) && !context.isTransitive && hasAuthoritativePretClassACvvniIntransitiveFrame(context))
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
      allowUnpronounceableStems = false,
      forceClassBSelection = false,
      forceClassBOnly = false,
      returnDetailed = false
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
          allowUnpronounceableStems,
          forceClassBOnly
        });
        if (!isTransitive && ["k", "kw"].includes(context?.rightEdgeDescriptor?.finalOnset || "") && (context?.rightEdgeDescriptor?.finalNucleus || "") !== "u" && tense !== "preterito") {
          context.allowIntransitiveKV = true;
        }
        variantsByClass = getPretUniversalVariantsByClass(context);
      }
      if (!variantsByClass.size) {
        return returnDetailed ? {
          result: null,
          forms: [],
          soundSpellingFrames: []
        } : null;
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
      const soundSpellingFrames = [];
      if (shouldMaskClassBSelection) {
        return returnDetailed ? {
          result: "—",
          forms: [],
          soundSpellingFrames
        } : "—";
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
          const detailedClassResult = buildPretUniversalResultDetailedFromVariants(buildPretVariantAssemblyFrame({
            variants,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            pluralSuffix: pretPluralSuffix,
            indirectObjectMarker,
            hasDoubleDash,
            isYawi,
            hasOptionalSupportiveI,
            optionalSupportiveLetter
          }));
          classResult = detailedClassResult.result;
          collectPretUniversalSoundSpellingFrames(soundSpellingFrames, getPretUniversalOutputSoundSpellingFrames(detailedClassResult));
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
              pers1: "",
              obj1: "",
              tronco: `${prefix}${baseCore}`,
              hasOptionalSupportiveI,
              optionalSupportiveLetter
            }) : `${prefix}${baseCore}`;
            // Universal m→n rule: stem-final "m" always converts to "n"
            const rawCore = resolvedCore.endsWith("m") ? `${resolvedCore.slice(0, -1)}n` : resolvedCore;
            if (rawCore !== resolvedCore) {
              pushUniquePretUniversalSoundSpellingFrame(soundSpellingFrames, buildPretUniversalMCodaSoundSpellingFrame({
                sourceSegmentValue: resolvedCore,
                targetSegmentValue: rawCore
              }));
            }
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
      const resultText = results.join(" / ");
      return returnDetailed ? {
        result: resultText,
        forms: results,
        soundSpellingFrames
      } : resultText;
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
        if (hasAuthoritativePretClassAKwvForceFrame(context)) {
          if (hasClassAVariants) {
            blockedReason = "class-b-fallback-to-a-kwv";
            const {
              result: resultKWV,
              forms: formsKWV
            } = buildPretUniversalResultDetailedFromVariants(buildPretVariantAssemblyFrame({
              variants: classAVariants,
              subjectPrefix,
              objectPrefix,
              subjectSuffix,
              directionalInputPrefix,
              directionalOutputPrefix,
              baseSubjectPrefix,
              baseObjectPrefix,
              pluralSuffix: null,
              indirectObjectMarker,
              hasDoubleDash,
              isYawi,
              hasOptionalSupportiveI,
              optionalSupportiveLetter
            }));
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
            } = buildPretUniversalResultDetailedFromVariants(buildPretVariantAssemblyFrame({
              variants: classAVariants,
              subjectPrefix,
              objectPrefix,
              subjectSuffix,
              directionalInputPrefix,
              directionalOutputPrefix,
              baseSubjectPrefix,
              baseObjectPrefix,
              pluralSuffix: null,
              indirectObjectMarker,
              hasDoubleDash,
              isYawi,
              hasOptionalSupportiveI,
              optionalSupportiveLetter
            }));
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
      } = buildPretUniversalResultDetailedFromVariants(buildPretVariantAssemblyFrame({
        variants,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        pluralSuffix,
        indirectObjectMarker,
        hasDoubleDash,
        isYawi,
        hasOptionalSupportiveI,
        optionalSupportiveLetter
      }));
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
    Object.defineProperty(api, "PRET_BASE_SOURCE_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_BASE_SOURCE_FRAME_KIND; },
    });
    Object.defineProperty(api, "PRET_BASE_SEGMENT_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_BASE_SEGMENT_FRAME_KIND; },
    });
    Object.defineProperty(api, "PRET_BASE_OPERATION_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_BASE_OPERATION_FRAME_KIND; },
    });
    Object.defineProperty(api, "PRET_PREFIX_BASE_CONTACT_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_PREFIX_BASE_CONTACT_FRAME_KIND; },
    });
    Object.defineProperty(api, "PRET_PREFIX_BASE_CONTACT_SEGMENT_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_PREFIX_BASE_CONTACT_SEGMENT_FRAME_KIND; },
    });
    Object.defineProperty(api, "PRET_VARIANT_ASSEMBLY_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_VARIANT_ASSEMBLY_FRAME_KIND; },
    });
    Object.defineProperty(api, "PRET_VARIANT_ASSEMBLY_SOURCE_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_VARIANT_ASSEMBLY_SOURCE_FRAME_KIND; },
    });
    Object.defineProperty(api, "PRET_VARIANT_ASSEMBLY_OPERATION_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PRET_VARIANT_ASSEMBLY_OPERATION_FRAME_KIND; },
    });
    api.normalizePretBaseFrameText = normalizePretBaseFrameText;
    api.buildPretBaseSourceFrame = buildPretBaseSourceFrame;
    api.buildPretBaseSegmentFrame = buildPretBaseSegmentFrame;
    api.buildPretBaseOperationFrame = buildPretBaseOperationFrame;
    api.getPretContactLetters = getPretContactLetters;
    api.joinPretContactLetters = joinPretContactLetters;
    api.buildPretPrefixBaseContactSegmentFrame = buildPretPrefixBaseContactSegmentFrame;
    api.buildPretPrefixBaseContactFrame = buildPretPrefixBaseContactFrame;
    api.buildPretVariantAssemblyFrame = buildPretVariantAssemblyFrame;
    api.buildPretLiteralBaseSpec = buildPretLiteralBaseSpec;
    api.buildPretTransformBaseSpec = buildPretTransformBaseSpec;
    api.buildPretAppendBaseSpec = buildPretAppendBaseSpec;
    api.buildPretReplaceSuffixBaseSpec = buildPretReplaceSuffixBaseSpec;
    api.buildPretPerfectiveReplacementBaseSpec = buildPretPerfectiveReplacementBaseSpec;
    api.buildPretTransformBaseSpecFromOperationFrame = buildPretTransformBaseSpecFromOperationFrame;
    api.buildPretBaseSourceFrameFromRootPlusYaSourceFrame = buildPretBaseSourceFrameFromRootPlusYaSourceFrame;
    api.buildPretPerfectiveReplacementBaseSpecFromRootPlusYaSourceFrame = buildPretPerfectiveReplacementBaseSpecFromRootPlusYaSourceFrame;
    api.buildPretDeletionShiftBaseSpec = buildPretDeletionShiftBaseSpec;
    api.buildPretCoalescedIBaseSpec = buildPretCoalescedIBaseSpec;
    api.buildPretBaseSpecDiagnostic = buildPretBaseSpecDiagnostic;
    api.blockPretBaseSpec = blockPretBaseSpec;
    api.getPretOperationFrameSourceBase = getPretOperationFrameSourceBase;
    api.evaluatePretBaseOperationFrame = evaluatePretBaseOperationFrame;
    api.evaluatePretBaseSpec = evaluatePretBaseSpec;
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
    api.buildPretRootPlusYaClassADiagnostic = buildPretRootPlusYaClassADiagnostic;
    api.blockPretRootPlusYaClassABaseSpecs = blockPretRootPlusYaClassABaseSpecs;
    api.buildPretRootPlusYaClassABaseSpecsFromSourceFrame = buildPretRootPlusYaClassABaseSpecsFromSourceFrame;
    api.buildPretRootPlusYaClassBDiagnostic = buildPretRootPlusYaClassBDiagnostic;
    api.blockPretRootPlusYaClassBBaseSpecs = blockPretRootPlusYaClassBBaseSpecs;
    api.buildPretRootPlusYaClassBBaseSpecsFromSourceFrame = buildPretRootPlusYaClassBBaseSpecsFromSourceFrame;
    api.buildPretClassAYyaDiagnostic = buildPretClassAYyaDiagnostic;
    api.blockPretClassAYyaBaseSpecs = blockPretClassAYyaBaseSpecs;
    api.getPretClassAYyaFrameText = getPretClassAYyaFrameText;
    api.buildPretClassAYyaBaseSpecsFromSourceFrame = buildPretClassAYyaBaseSpecsFromSourceFrame;
    api.buildPretClassAItaDiagnostic = buildPretClassAItaDiagnostic;
    api.blockPretClassAItaBaseSpecs = blockPretClassAItaBaseSpecs;
    api.getPretClassAItaFrameText = getPretClassAItaFrameText;
    api.buildPretClassAItaBaseSpecsFromSourceFrame = buildPretClassAItaBaseSpecsFromSourceFrame;
    api.buildPretClassAFinalVowelDeletionDiagnostic = buildPretClassAFinalVowelDeletionDiagnostic;
    api.blockPretClassAFinalVowelDeletionBaseSpecs = blockPretClassAFinalVowelDeletionBaseSpecs;
    api.getPretClassADeletionFrameText = getPretClassADeletionFrameText;
    api.buildPretClassAFinalVowelDeletionBaseSpecsFromSourceFrame = buildPretClassAFinalVowelDeletionBaseSpecsFromSourceFrame;
    api.buildPretClassBDiagnostic = buildPretClassBDiagnostic;
    api.blockPretClassBBaseSpecs = blockPretClassBBaseSpecs;
    api.getPretClassBFrameText = getPretClassBFrameText;
    api.buildPretClassBBaseSpecsFromSourceFrame = buildPretClassBBaseSpecsFromSourceFrame;
    api.buildPretClassCDiagnostic = buildPretClassCDiagnostic;
    api.blockPretClassCBaseSpecs = blockPretClassCBaseSpecs;
    api.getPretClassCFrameText = getPretClassCFrameText;
    api.buildPretClassCBaseSpecsFromSourceFrame = buildPretClassCBaseSpecsFromSourceFrame;
    api.buildPretClassDDiagnostic = buildPretClassDDiagnostic;
    api.blockPretClassDBaseSpecs = blockPretClassDBaseSpecs;
    api.getPretClassDFrameText = getPretClassDFrameText;
    api.buildPretClassDBaseSpecsFromSourceFrame = buildPretClassDBaseSpecsFromSourceFrame;
    api.createPretDescriptorTierMatcher = createPretDescriptorTierMatcher;
    api.createPretDescriptorMatcher = createPretDescriptorMatcher;
    api.hasAuthoritativePretClassASlashAkiZeroFrame = hasAuthoritativePretClassASlashAkiZeroFrame;
    api.hasAuthoritativePretClassAKwvForceFrame = hasAuthoritativePretClassAKwvForceFrame;
    api.hasAuthoritativePretClassAKvAllowFrame = hasAuthoritativePretClassAKvAllowFrame;
    api.hasAuthoritativePretClassAChiAllowFrame = hasAuthoritativePretClassAChiAllowFrame;
    api.hasAuthoritativePretClassATaRedupFrame = hasAuthoritativePretClassATaRedupFrame;
    api.hasAuthoritativePretClassAPaTransitiveFrame = hasAuthoritativePretClassAPaTransitiveFrame;
    api.hasAuthoritativePretClassAMTransitiveFrame = hasAuthoritativePretClassAMTransitiveFrame;
    api.hasAuthoritativePretClassAPiIntransitiveFrame = hasAuthoritativePretClassAPiIntransitiveFrame;
    api.hasAuthoritativePretClassAPiCvTransitiveFrame = hasAuthoritativePretClassAPiCvTransitiveFrame;
    api.hasAuthoritativePretClassACvwiTransitiveFrame = hasAuthoritativePretClassACvwiTransitiveFrame;
    api.hasAuthoritativePretClassACvcvwiTransitiveFrame = hasAuthoritativePretClassACvcvwiTransitiveFrame;
    api.hasAuthoritativePretClassACvwaiTransitiveFrame = hasAuthoritativePretClassACvwaiTransitiveFrame;
    api.hasAuthoritativePretClassACvewaTransitiveFrame = hasAuthoritativePretClassACvewaTransitiveFrame;
    api.hasAuthoritativePretClassACvawaTransitiveFrame = hasAuthoritativePretClassACvawaTransitiveFrame;
    api.hasAuthoritativePretClassAPaCvIntransitiveFrame = hasAuthoritativePretClassAPaCvIntransitiveFrame;
    api.hasAuthoritativePretClassANaCvIntransitiveFrame = hasAuthoritativePretClassANaCvIntransitiveFrame;
    api.hasAuthoritativePretClassBVnaIntransitiveFrame = hasAuthoritativePretClassBVnaIntransitiveFrame;
    api.hasAuthoritativePretClassBTaIntransitiveFrame = hasAuthoritativePretClassBTaIntransitiveFrame;
    api.hasAuthoritativePretClassBTaTransitiveFrame = hasAuthoritativePretClassBTaTransitiveFrame;
    api.hasAuthoritativePretClassBKwiCvIntransitiveFrame = hasAuthoritativePretClassBKwiCvIntransitiveFrame;
    api.hasAuthoritativePretClassBVcvcuIntransitiveFrame = hasAuthoritativePretClassBVcvcuIntransitiveFrame;
    api.hasAuthoritativePretClassBVlcvwiIntransitiveFrame = hasAuthoritativePretClassBVlcvwiIntransitiveFrame;
    api.hasAuthoritativePretClassBCvniuIntransitiveFrame = hasAuthoritativePretClassBCvniuIntransitiveFrame;
    api.hasAuthoritativePretClassACvvniIntransitiveFrame = hasAuthoritativePretClassACvvniIntransitiveFrame;
    api.hasAuthoritativePretClassACvsvIntransitiveFrame = hasAuthoritativePretClassACvsvIntransitiveFrame;
    api.hasAuthoritativePretClassACvwiIntransitiveFrame = hasAuthoritativePretClassACvwiIntransitiveFrame;
    api.hasAuthoritativePretClassACvcvwiIntransitiveFrame = hasAuthoritativePretClassACvcvwiIntransitiveFrame;
    api.hasAuthoritativePretClassBVjwaIntransitiveFrame = hasAuthoritativePretClassBVjwaIntransitiveFrame;
    api.hasAuthoritativePretClassBCuwaIntransitiveFrame = hasAuthoritativePretClassBCuwaIntransitiveFrame;
    api.hasAuthoritativePretClassANiCvTransitiveFrame = hasAuthoritativePretClassANiCvTransitiveFrame;
    api.hasAuthoritativePretClassANaCvTransitiveFrame = hasAuthoritativePretClassANaCvTransitiveFrame;
    api.hasAuthoritativePretClassANaCvcvcvTransitiveFrame = hasAuthoritativePretClassANaCvcvcvTransitiveFrame;
    api.hasAuthoritativePretClassANaCvlvcvTransitiveFrame = hasAuthoritativePretClassANaCvlvcvTransitiveFrame;
    api.hasAuthoritativePretClassANaVlcvcvTransitiveFrame = hasAuthoritativePretClassANaVlcvcvTransitiveFrame;
    api.hasAuthoritativePretClassANaVjcvcvTransitiveFrame = hasAuthoritativePretClassANaVjcvcvTransitiveFrame;
    api.hasAuthoritativePretClassATzaTransitiveFrame = hasAuthoritativePretClassATzaTransitiveFrame;
    api.buildPretUniversalClassA = buildPretUniversalClassA;
    api.buildPretUniversalClassB = buildPretUniversalClassB;
    api.getPretUniversalVariants = getPretUniversalVariants;
    api.getPronounceableClassBFallback = getPronounceableClassBFallback;
    api.getPretUniversalVariantsByClass = getPretUniversalVariantsByClass;
    api.splitDirectionalPrefixFromBase = splitDirectionalPrefixFromBase;
    api.maybeShortenZeroBitransitiveKi = maybeShortenZeroBitransitiveKi;
    api.composePretUniversalObjectPrefix = composePretUniversalObjectPrefix;
    api.shouldAllowZeroBitransitiveKiDrop = shouldAllowZeroBitransitiveKiDrop;
    api.adjustPretNhBeforeVowel = adjustPretNhBeforeVowel;
    api.adjustPretSubjectSupportiveIBeforeIStem = adjustPretSubjectSupportiveIBeforeIStem;
    api.buildPretPrefixBaseContactDiagnostic = buildPretPrefixBaseContactDiagnostic;
    api.blockPretPrefixBaseContact = blockPretPrefixBaseContact;
    api.evaluatePretPrefixBaseContactFrame = evaluatePretPrefixBaseContactFrame;
    api.adjustPretPrefixBaseContact = adjustPretPrefixBaseContact;
    api.adjustPretComposedObjectPrefixContact = adjustPretComposedObjectPrefixContact;
    api.resolvePretObjectPrefixContact = resolvePretObjectPrefixContact;
    api.getPretUniversalPrefixForBase = getPretUniversalPrefixForBase;
    api.normalizePretYawiPreteriteVariants = normalizePretYawiPreteriteVariants;
    api.normalizePretVariantAssemblySurfaceValue = normalizePretVariantAssemblySurfaceValue;
    api.splitPretVariantAssemblySurfaceText = splitPretVariantAssemblySurfaceText;
    api.getPretVariantAssemblyResultFrame = getPretVariantAssemblyResultFrame;
    api.getPretVariantAssemblyResultFramePayload = getPretVariantAssemblyResultFramePayload;
    api.getPretVariantAssemblySurfaceForms = getPretVariantAssemblySurfaceForms;
    api.getPretVariantAssemblySurface = getPretVariantAssemblySurface;
    api.buildPretUniversalVariantAssemblyDiagnostic = buildPretUniversalVariantAssemblyDiagnostic;
    api.getPretUniversalSoundSpellingFrameKey = getPretUniversalSoundSpellingFrameKey;
    api.pushUniquePretUniversalSoundSpellingFrame = pushUniquePretUniversalSoundSpellingFrame;
    api.collectPretUniversalSoundSpellingFrames = collectPretUniversalSoundSpellingFrames;
    api.getPretUniversalOutputSoundSpellingFrames = getPretUniversalOutputSoundSpellingFrames;
    api.buildPretUniversalMCodaSoundSpellingFrame = buildPretUniversalMCodaSoundSpellingFrame;
    api.attachPretUniversalVariantAssemblyGrammarContract = attachPretUniversalVariantAssemblyGrammarContract;
    api.blockPretVariantAssemblyFromFrame = blockPretVariantAssemblyFromFrame;
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
    const api = createPreteritEngineModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
