"use strict";

/**
 * Tests for derivation source-model and source-chain helpers.
 * Covers: buildDerivationSourceModel, buildNonactiveSourceChain,
 *         getDerivationSourceOuterSurface, apply/realize source-chain stems.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("derivation");

    const verbMeta = {
        exactBaseVerb: "nemi",
        sourcePrefix: "ki",
        lexicalBoundPrefixes: ["ki"],
        isMarkedTransitive: true,
    };

    const sourceModel = ctx.buildDerivationSourceModel(verbMeta, "kinemi", "nemi");
    s.eq("source model: fallback kind", sourceModel.sourceKind, "fallback");
    s.eq("source model: matrix base = nemi", sourceModel.matrixBase, "nemi");
    s.eq("source model: outer surface = ki", ctx.getDerivationSourceOuterSurface(sourceModel), "ki");

    const currentRegexParseTree = ctx.buildCurrentRegexDerivationSourceParseTree("(ki)-(nemi)");
    s.eq(
        "current-regex source parse tree is typed",
        currentRegexParseTree?.kind,
        "current-regex-derivation-source-parse-tree"
    );
    s.eq(
        "current-regex source parse tree carries matrix core frame",
        currentRegexParseTree?.coreFrame?.matrixBase,
        "nemi"
    );
    const currentRegexModelFromTree = ctx.buildCurrentRegexDerivationSourceModel(currentRegexParseTree);
    s.eq(
        "current-regex source model consumes typed parse tree matrix",
        currentRegexModelFromTree.matrixBase,
        "nemi"
    );
    s.eq(
        "current-regex source model consumes typed parse tree outer frame",
        ctx.getDerivationSourceOuterSurface(currentRegexModelFromTree),
        "ki"
    );
    const lyingCurrentRegexParseTree = {
        ...currentRegexParseTree,
        rawRegex: "(ta)-(miki)",
    };
    const currentRegexModelFromLyingRawText = ctx.buildCurrentRegexDerivationSourceModel(lyingCurrentRegexParseTree);
    s.eq(
        "current-regex source model ignores poisoned raw regex text when typed core frame is present",
        {
            matrixBase: currentRegexModelFromLyingRawText.matrixBase,
            outerSurface: ctx.getDerivationSourceOuterSurface(currentRegexModelFromLyingRawText),
        },
        {
            matrixBase: "nemi",
            outerSurface: "ki",
        }
    );
    const currentRegexModelFromExplicitTree = ctx.buildDerivationSourceModel({
        currentRegexSourceParseTree: currentRegexParseTree,
        sourceRawVerb: "(ta)-(miki)",
    }, "(ta)-(miki)", "miki");
    s.eq(
        "derivation source model prefers explicit current-regex parse tree over contradictory sourceRawVerb",
        {
            sourceKind: currentRegexModelFromExplicitTree.sourceKind,
            matrixBase: currentRegexModelFromExplicitTree.matrixBase,
            outerSurface: ctx.getDerivationSourceOuterSurface(currentRegexModelFromExplicitTree),
        },
        {
            sourceKind: "current-regex",
            matrixBase: "nemi",
            outerSurface: "ki",
        }
    );
    const serialDashSourceFrame = ctx.buildSerialStemDashSourceFrame("nemi-a-wi");
    const serialDashOperationFrame = ctx.buildSerialStemDashOperationFrame(serialDashSourceFrame);
    const serialDashChangedRequestFrame = ctx.buildSerialStemDashSourceFrame("paka-a-wi");
    const serialDashContradictoryOperationFrame = {
        ...serialDashOperationFrame,
        targetInput: "poisoned",
    };
    const serialDashParseTree = ctx.buildCurrentRegexDerivationSourceParseTree("(nemi-a-wi)");
    const serialDashSourceModel = ctx.buildCurrentRegexDerivationSourceModel(serialDashParseTree);
    s.eq(
        "serial dash stem collapse requires typed source and operation frames",
        {
            helperTypes: [
                typeof ctx.buildSerialStemDashSourceFrame,
                typeof ctx.buildSerialStemDashOperationFrame,
                typeof ctx.getSerialStemDashFrameMismatch,
            ],
            operation: serialDashSourceFrame.routeOperation,
            root: serialDashSourceFrame.root,
            segments: serialDashSourceFrame.sourceSegments,
            targetInput: serialDashOperationFrame.targetInput,
            directStringHelper: ctx.collapseSerialStemDashInput("nemi-a-wi"),
            framedHelper: ctx.collapseSerialStemDashInput("nemi-a-wi", {
                serialStemDashSourceFrame: serialDashSourceFrame,
                serialStemDashOperationFrame: serialDashOperationFrame,
            }),
            wrapperHelper: ctx.collapseSerialStemDashInputFromSourceFrame("nemi-a-wi"),
            changedRequest: ctx.getSerialStemDashFrameMismatch({
                sourceFrame: serialDashSourceFrame,
                operationFrame: serialDashOperationFrame,
                requestFrame: serialDashChangedRequestFrame,
            }),
            contradictoryTarget: ctx.getSerialStemDashFrameMismatch({
                sourceFrame: serialDashSourceFrame,
                operationFrame: serialDashContradictoryOperationFrame,
            }),
            matrixBase: serialDashSourceModel.matrixBase,
        },
        {
            helperTypes: ["function", "function", "function"],
            operation: "serial-awi-stem-dash-collapse",
            root: "nemi",
            segments: ["a", "wi"],
            targetInput: "nemiawi",
            directStringHelper: "nemi-a-wi",
            framedHelper: "nemiawi",
            wrapperHelper: "nemiawi",
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
            matrixBase: "nemiawi",
        }
    );
    const boundSourceFrameMeta = {
        hasBoundMarker: true,
        currentRegexSourceParseTree: currentRegexParseTree,
        sourceRawVerb: "(ta)-(miki)",
    };
    s.eq(
        "nonactive bound-source base strips only through structured source frame",
        ctx.stripBoundSourcePrefixFromNonactiveBase("kinemi", "ki", boundSourceFrameMeta),
        "nemi"
    );
    s.eq(
        "nonactive bound-source base ignores poisoned sourceRawVerb when source parse tree is explicit",
        ctx.buildNonactiveBoundSourceBaseFrame({
            baseVerb: "kinemi",
            sourcePrefix: "ki",
            verbMeta: boundSourceFrameMeta,
        }).matrixBase,
        "nemi"
    );
    s.eq(
        "nonactive bound-source base blocks missing structured source frame instead of slicing display text",
        {
            stripped: ctx.stripBoundSourcePrefixFromNonactiveBase("kinemi", "ki", {
                hasBoundMarker: true,
                sourcePrefix: "ki",
            }),
            diagnostic: ctx.buildNonactiveBoundSourceBaseFrame({
                baseVerb: "kinemi",
                sourcePrefix: "ki",
                verbMeta: {
                    hasBoundMarker: true,
                    sourcePrefix: "ki",
                },
            }).diagnostics[0],
        },
        {
            stripped: "",
            diagnostic: "nonactive-bound-source-missing-structured-source-frame",
        }
    );
    s.eq(
        "nonactive bound-source base blocks contradictory source frame instead of slicing prefix",
        {
            stripped: ctx.stripBoundSourcePrefixFromNonactiveBase("kimiki", "ki", boundSourceFrameMeta),
            diagnostic: ctx.buildNonactiveBoundSourceBaseFrame({
                baseVerb: "kimiki",
                sourcePrefix: "ki",
                verbMeta: boundSourceFrameMeta,
            }).diagnostics[0],
        },
        {
            stripped: "",
            diagnostic: "nonactive-bound-source-contradictory-base-frame",
        }
    );

    const chain = ctx.buildNonactiveSourceChain(verbMeta, "kinemi", "nemi");
    s.eq("nonactive chain: base verb = nemi", chain.baseVerb, "nemi");
    s.eq("nonactive chain: prefix = ki", chain.prefix, "ki");
    s.eq("nonactive chain: source prefix = ki", chain.sourcePrefix, "ki");

    const prefixedStem = ctx.realizeNonactiveSourceChainStem("nemu", chain);
    s.eq("nonactive chain realize: ki + nemu = kinemu", prefixedStem, "kinemu");

    const prefixedStemSpec = ctx.applyNonactiveSourceChainStemSpec(
        ctx.buildLiteralMorphStemSpec("nemu"),
        "nemu",
        chain
    );
    s.eq(
        "nonactive stem spec realize: ki + nemu = kinemu",
        ctx.realizeMorphStemSpec(prefixedStemSpec, ""),
        "kinemu"
    );

    const imperfectiveChain = ctx.buildPatientivoImperfectiveSourceChain(
        { exactBaseVerb: "nemia" },
        "nemia",
        "nemia"
    );
    const imperfectiveBaseSpec = ctx.resolvePatientivoImperfectiveBaseStemSpec(imperfectiveChain);
    s.eq(
        "patientivo imperfective base spec stays on the VNC core and does not append finite -ya",
        ctx.realizeMorphStemSpec(imperfectiveBaseSpec, ""),
        "nemi"
    );
    s.eq(
        "intransitive type-one stem realization consumes typed right-edge operation frames",
        (() => {
            const sourceFrame = ctx.buildIntransitiveTypeOneSourceFrame({
                baseStem: "nemini",
                typeOneTarget: "na",
            });
            const operationFrame = ctx.buildIntransitiveTypeOneOperationFrame(sourceFrame);
            const spec = ctx.buildIntransitiveTypeOneMorphStemSpec("nemini", "na");
            const stringOnly = ctx.buildIntransitiveTypeOneStem("nemini", "na");
            const framed = ctx.buildIntransitiveTypeOneStem("nemini", "na", {
                sourceFrame,
                operationFrame,
            });
            const changedString = ctx.buildIntransitiveTypeOneStem("poison", "na", {
                sourceFrame,
                operationFrame,
            });
            const missingOperation = ctx.buildIntransitiveTypeOneStem("nemini", "na", {
                sourceFrame,
            });
            const contradictorySource = ctx.buildIntransitiveTypeOneStem("nemini", "na", {
                sourceFrame: {
                    ...sourceFrame,
                    sourceSignature: "poison",
                },
                operationFrame,
            });
            const contradictoryTarget = ctx.buildIntransitiveTypeOneStem("nemini", "na", {
                sourceFrame,
                operationFrame: {
                    ...operationFrame,
                    targetStem: "poison",
                },
            });
            return {
                helperTypes: [
                    typeof ctx.buildIntransitiveTypeOneSourceFrame,
                    typeof ctx.buildIntransitiveTypeOneOperationFrame,
                    typeof ctx.getIntransitiveTypeOneFrameMismatch,
                ],
                stringOnly,
                framed,
                realizedSpec: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.typeOneOperationFrame?.operationId || "",
                changedString,
                missingOperation,
                contradictorySource,
                contradictoryTarget,
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            stringOnly: "",
            framed: "nemina",
            realizedSpec: "nemina",
            operationId: "andrews-intransitive-type-one-stem-realization",
            changedString: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );

    s.eq(
        "append morph stem realization consumes typed append operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemAppendSourceFrame({
                sourceStem: "nemi",
                appendText: "wa",
            });
            const operationFrame = ctx.buildMorphStemAppendOperationFrame(sourceFrame);
            const spec = ctx.buildAppendMorphStemSpec("nemi", "wa");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "nemi",
                appendText: "wa",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemAppendSourceFrame,
                    typeof ctx.buildMorphStemAppendOperationFrame,
                    typeof ctx.getMorphStemAppendFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "nemiwa",
            specRealized: "nemiwa",
            operationId: "andrews-morph-stem-append-realization",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "prepend morph stem realization consumes typed prepend operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemPrependSourceFrame({
                sourceStem: "nemi",
                prependText: "ki",
            });
            const operationFrame = ctx.buildMorphStemPrependOperationFrame(sourceFrame);
            const spec = ctx.buildPrependMorphStemSpec("nemi", "ki");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "nemi",
                prependText: "ki",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemPrependSourceFrame,
                    typeof ctx.buildMorphStemPrependOperationFrame,
                    typeof ctx.getMorphStemPrependFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "kinemi",
            specRealized: "kinemi",
            operationId: "andrews-morph-stem-prepend-realization",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "replace-suffix morph stem realization consumes typed replace operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemReplaceSuffixSourceFrame({
                sourceStem: "nemia",
                sourceSuffix: "ia",
                replacement: "ilia",
            });
            const operationFrame = ctx.buildMorphStemReplaceSuffixOperationFrame(sourceFrame);
            const spec = ctx.buildReplaceSuffixMorphStemSpec("nemia", "ia", "ilia");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "nemia",
                sourceSuffix: "ia",
                replacement: "ilia",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemReplaceSuffixSourceFrame,
                    typeof ctx.buildMorphStemReplaceSuffixOperationFrame,
                    typeof ctx.getMorphStemReplaceSuffixFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "nemilia",
            specRealized: "nemilia",
            operationId: "andrews-morph-stem-replace-suffix-realization",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "strip-prefix morph stem realization consumes typed strip operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemStripPrefixSourceFrame({
                sourceStem: "kinemi",
                prefix: "ki",
            });
            const operationFrame = ctx.buildMorphStemStripPrefixOperationFrame(sourceFrame);
            const spec = ctx.buildStripPrefixMorphStemSpec("kinemi", "ki");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "kinemi",
                prependText: "ki",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemStripPrefixSourceFrame,
                    typeof ctx.buildMorphStemStripPrefixOperationFrame,
                    typeof ctx.getMorphStemStripPrefixFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "nemi",
            specRealized: "nemi",
            operationId: "andrews-morph-stem-strip-prefix-realization",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "deletion-shift morph stem realization consumes typed deletion operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemDeletionShiftSourceFrame({
                sourceStem: "chikw",
                deletionVariant: "kw-to-k",
            });
            const operationFrame = ctx.buildMorphStemDeletionShiftOperationFrame(sourceFrame);
            const spec = ctx.buildDeletionShiftMorphStemSpec("chikw", "kw-to-k");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "chikw",
                deletionVariant: "kw-to-k",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemDeletionShiftSourceFrame,
                    typeof ctx.buildMorphStemDeletionShiftOperationFrame,
                    typeof ctx.getMorphStemDeletionShiftFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "chik",
            specRealized: "chik",
            operationId: "andrews-morph-stem-deletion-shift-realization",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "truncate nonactive-base morph stem realization consumes typed truncate operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemTruncateNonactiveBaseSourceFrame({
                sourceStem: "metza",
                tzToCh: true,
            });
            const operationFrame = ctx.buildMorphStemTruncateNonactiveBaseOperationFrame(sourceFrame);
            const spec = ctx.buildTruncateNonactiveBaseMorphStemSpec("metza", {
                tzToCh: true,
            });
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "metza",
                tzToCh: true,
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemTruncateNonactiveBaseSourceFrame,
                    typeof ctx.buildMorphStemTruncateNonactiveBaseOperationFrame,
                    typeof ctx.getMorphStemTruncateNonactiveBaseFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                directStringHelper: ctx.truncateNonactiveBase("metza", { tzToCh: true }),
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "mech",
            specRealized: "mech",
            operationId: "andrews-morph-stem-truncate-nonactive-base-realization",
            directStringHelper: "",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "wa-onset-variant morph stem realization consumes typed onset operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemWaOnsetVariantSourceFrame({
                sourceStem: "mati",
            });
            const operationFrame = ctx.buildMorphStemWaOnsetVariantOperationFrame(sourceFrame);
            const spec = ctx.buildWaOnsetVariantMorphStemSpec("mati");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "mati",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemWaOnsetVariantSourceFrame,
                    typeof ctx.buildMorphStemWaOnsetVariantOperationFrame,
                    typeof ctx.getMorphStemWaOnsetVariantFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "machiwa",
            specRealized: "machiwa",
            operationId: "andrews-morph-stem-wa-onset-variant-realization",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "nonactive-u morph stem realization consumes typed u operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemNonactiveUSourceFrame({
                sourceStem: "mati",
                lastOnset: "t",
                lastNucleus: "i",
            });
            const operationFrame = ctx.buildMorphStemNonactiveUOperationFrame(sourceFrame);
            const spec = ctx.buildNonactiveUStemMorphStemSpec("mati", "t", "i");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "mati",
                lastOnset: "t",
                lastNucleus: "i",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemNonactiveUSourceFrame,
                    typeof ctx.buildMorphStemNonactiveUOperationFrame,
                    typeof ctx.getMorphStemNonactiveUFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                directStringHelper: ctx.buildNonactiveUStem("mati", "t", "i"),
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "machu",
            specRealized: "machu",
            operationId: "andrews-morph-stem-nonactive-u-realization",
            directStringHelper: "",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "nonactive-uwa morph stem realization consumes typed uwa operation frames",
        (() => {
            const sourceFrame = ctx.buildMorphStemNonactiveUwaSourceFrame({
                sourceStem: "mati",
                lastOnset: "t",
                lastNucleus: "i",
            });
            const operationFrame = ctx.buildMorphStemNonactiveUwaOperationFrame(sourceFrame);
            const spec = ctx.buildNonactiveUwaStemMorphStemSpec("mati", "t", "i");
            const legacySpec = {
                kind: spec.kind,
                transformKind: spec.transformKind,
                sourceStem: "mati",
                lastOnset: "t",
                lastNucleus: "i",
            };
            const changedSourceSpec = {
                ...spec,
                sourceStem: "poison",
            };
            const missingOperationSpec = {
                ...spec,
                morphStemOperationFrame: null,
            };
            const contradictorySourceSpec = {
                ...spec,
                morphStemSourceFrame: {
                    ...spec.morphStemSourceFrame,
                    sourceSignature: "poison",
                },
            };
            const contradictoryTargetSpec = {
                ...spec,
                morphStemOperationFrame: {
                    ...spec.morphStemOperationFrame,
                    targetStem: "poison",
                },
            };
            return {
                helperTypes: [
                    typeof ctx.buildMorphStemNonactiveUwaSourceFrame,
                    typeof ctx.buildMorphStemNonactiveUwaOperationFrame,
                    typeof ctx.getMorphStemNonactiveUwaFrameMismatch,
                ],
                framed: ctx.realizeMorphStemSpec({
                    ...spec,
                    morphStemSourceFrame: sourceFrame,
                    morphStemOperationFrame: operationFrame,
                }, ""),
                specRealized: ctx.realizeMorphStemSpec(spec, ""),
                operationId: spec.morphStemOperationFrame?.operationId || "",
                directStringHelper: ctx.buildNonactiveUwaStem("mati", "t", "i"),
                legacySpec: ctx.realizeMorphStemSpec(legacySpec, ""),
                changedSource: ctx.realizeMorphStemSpec(changedSourceSpec, ""),
                missingOperation: ctx.realizeMorphStemSpec(missingOperationSpec, ""),
                contradictorySource: ctx.realizeMorphStemSpec(contradictorySourceSpec, ""),
                contradictoryTarget: ctx.realizeMorphStemSpec(contradictoryTargetSpec, ""),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            framed: "machuwa",
            specRealized: "machuwa",
            operationId: "andrews-morph-stem-nonactive-uwa-realization",
            directStringHelper: "",
            legacySpec: "",
            changedSource: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
        }
    );
    s.eq(
        "nonactive stem selection consumes typed selection operation frames",
        (() => {
            const sourceFrame = ctx.buildNonactiveStemSelectionSourceFrame({
                verb: "pix",
                analysisVerb: "pix",
                options: { isTransitive: true },
            });
            const operationFrame = ctx.buildNonactiveStemSelectionOperationFrame(sourceFrame);
            const resolveSelection = ctx.resolveNonactiveStemSelection("pix", "pix", {
                isTransitive: true,
            });
            const changedRequest = ctx.deriveNonactiveStem("poison", "poison", {
                isTransitive: true,
                nonactiveStemSelectionSourceFrame: sourceFrame,
                nonactiveStemSelectionOperationFrame: operationFrame,
            });
            const missingOperation = ctx.deriveNonactiveStem("pix", "pix", {
                isTransitive: true,
                nonactiveStemSelectionSourceFrame: sourceFrame,
            });
            const contradictorySource = ctx.deriveNonactiveStem("pix", "pix", {
                isTransitive: true,
                nonactiveStemSelectionSourceFrame: {
                    ...sourceFrame,
                    sourceSignature: "poison",
                },
                nonactiveStemSelectionOperationFrame: operationFrame,
            });
            const contradictoryTarget = ctx.deriveNonactiveStem("pix", "pix", {
                isTransitive: true,
                nonactiveStemSelectionSourceFrame: sourceFrame,
                nonactiveStemSelectionOperationFrame: {
                    ...operationFrame,
                    targetStem: "poison",
                    targetFrame: {
                        ...operationFrame.targetFrame,
                        stem: "poison",
                    },
                },
            });
            return {
                helperTypes: [
                    typeof ctx.buildNonactiveStemSelectionSourceFrame,
                    typeof ctx.buildNonactiveStemSelectionOperationFrame,
                    typeof ctx.getNonactiveStemSelectionFrameMismatch,
                ],
                operationId: operationFrame.operationId,
                framed: ctx.deriveNonactiveStem("pix", "pix", {
                    isTransitive: true,
                    nonactiveStemSelectionSourceFrame: sourceFrame,
                    nonactiveStemSelectionOperationFrame: operationFrame,
                }),
                directString: ctx.deriveNonactiveStem("pix", "pix", {
                    isTransitive: true,
                }),
                changedRequest,
                missingOperation,
                contradictorySource,
                contradictoryTarget,
                continuation: {
                    selectedStem: resolveSelection.selectedStem,
                    selectedStemSpecKind: resolveSelection.selectedStemSpec?.kind || "",
                    allStems: resolveSelection.allStems,
                },
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            operationId: "andrews-nonactive-stem-selection-realization",
            framed: "pix",
            directString: "",
            changedRequest: "",
            missingOperation: "",
            contradictorySource: "",
            contradictoryTarget: "",
            continuation: {
                selectedStem: "pix",
                selectedStemSpecKind: "literal",
                allStems: ["pix"],
            },
        }
    );

    const absolutivePrelocativeContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "tamati",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
    });
    s.eq(
        "Andrews 39.7 absolutive patientive source promotes NNC subject into prelocative object",
        {
            supported: absolutivePrelocativeContract.supported,
            sourceState: absolutivePrelocativeContract.sourceState,
            incorporatedRoot: absolutivePrelocativeContract.incorporatedRoot,
            prelocativeVerbInput: absolutivePrelocativeContract.prelocativeVerbInput,
            sourceRole: absolutivePrelocativeContract.objectTransfer.sourceRole,
            sourcePrefix: absolutivePrelocativeContract.objectTransfer.sourcePrefix,
            objectPrefix: absolutivePrelocativeContract.objectTransfer.objectPrefix,
        },
        {
            supported: true,
            sourceState: "absolutive",
            incorporatedRoot: "tamati",
            prelocativeVerbInput: "-(tamati/tajtani)",
            sourceRole: "subject",
            sourcePrefix: "ni",
            objectPrefix: "nech",
        }
    );
    s.eq(
        "derivation continuation contracts expose non-enumerable LCM frames",
        {
            hasFrame: Boolean(absolutivePrelocativeContract.grammarFrame),
            framesAlias: absolutivePrelocativeContract.frames === absolutivePrelocativeContract.grammarFrame,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(absolutivePrelocativeContract, "grammarFrame"),
            ok: absolutivePrelocativeContract.ok,
            surface: absolutivePrelocativeContract.surface,
            routeFamily: absolutivePrelocativeContract.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: absolutivePrelocativeContract.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: absolutivePrelocativeContract.grammarFrame?.routeContract?.generationAllowed,
            unitKind: absolutivePrelocativeContract.grammarFrame?.unitFrame?.unitKind || "",
            sourceInput: absolutivePrelocativeContract.grammarFrame?.resultFrame?.sourceInput || "",
            targetInput: absolutivePrelocativeContract.grammarFrame?.routeContract?.targetContract?.targetInput || "",
        },
        {
            hasFrame: true,
            framesAlias: true,
            enumerableGrammarFrame: false,
            ok: true,
            surface: "",
            routeFamily: "derivation-continuation",
            routeStage: "preview-continuation",
            generationAllowed: true,
            unitKind: "derivation-continuation-contract",
            sourceInput: "tamati",
            targetInput: "-(tamati/tajtani)",
        }
    );
    s.eq(
        "derivation continuation contract reads framed source surface before stale source aliases",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surfaceForms: ["frame-source-a", "frame-source-b"],
                    outputKind: "derivation-source-output",
                    generationRoute: "test-frame-reader",
                }),
            });
            const contract = ctx.attachDerivationContinuationGrammarContract({
                outputKind: "test-derivation-continuation-contract",
                grammarSource: "Andrews 39.8",
                supported: true,
                surface: "stale-top-surface",
                surfaceForms: ["stale-top-a / stale-top-b"],
                result: "stale-result",
                sourceSurface: "stale-source-surface",
                patientivoSurface: "stale-patientive-surface",
                compoundVerbInput: "-(frame-source-a/tajtani)",
                grammarFrame,
                frames: grammarFrame,
                diagnostics: [],
            });
            return {
                sourceInput: contract.grammarFrame?.resultFrame?.sourceInput || "",
                sourceSurface: contract.grammarFrame?.routeContract?.sourceContract?.sourceSurface || "",
                targetInput: contract.grammarFrame?.routeContract?.targetContract?.targetInput || "",
            };
        })(),
        {
            sourceInput: "frame-source-a",
            sourceSurface: "frame-source-a",
            targetInput: "-(frame-source-a/tajtani)",
        }
    );
    s.eq(
        "derivation continuation contract suppresses stale source aliases for empty result frame",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "derivation-source-output",
                    generationRoute: "test-empty-frame-reader",
                }),
            });
            const contract = ctx.attachDerivationContinuationGrammarContract({
                outputKind: "test-derivation-continuation-contract",
                grammarSource: "Andrews 39.8",
                supported: false,
                sourceSurface: "stale-source-surface",
                patientivoSurface: "stale-patientive-surface",
                compoundVerbInput: "-(stale-source/tajtani)",
                grammarFrame,
                frames: grammarFrame,
                diagnostics: ["patientivo-compound-embed-missing-patientivo-surface"],
            });
            return {
                ok: contract.ok,
                sourceInput: contract.grammarFrame?.resultFrame?.sourceInput || "",
                sourceSurface: contract.grammarFrame?.routeContract?.sourceContract?.sourceSurface || "",
                diagnosticLayer: contract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.failedLayer || "",
            };
        })(),
        {
            ok: false,
            sourceInput: "",
            sourceSurface: "",
            diagnosticLayer: "stem",
        }
    );
    s.eq(
        "derivation continuation contract blocks slash-joined result-frame source forms instead of splitting display strings",
        (() => {
            const grammarFrame = {
                resultFrame: {
                    kind: "grammar-result-frame",
                    ok: true,
                    surface: "frame-source-a / frame-source-b",
                    surfaceForms: ["frame-source-a / frame-source-b"],
                    outputKind: "derivation-source-output",
                    generationRoute: "test-frame-slash-reader",
                },
            };
            const contract = ctx.attachDerivationContinuationGrammarContract({
                outputKind: "test-derivation-continuation-contract",
                grammarSource: "Andrews 39.8",
                supported: true,
                surface: "stale-top-surface",
                surfaceForms: ["stale-top-a / stale-top-b"],
                result: "stale-result",
                sourceSurface: "stale-source-surface",
                patientivoSurface: "stale-patientive-surface",
                compoundVerbInput: "-(frame-source-a/tajtani)",
                grammarFrame,
                frames: grammarFrame,
                diagnostics: [],
            });
            return {
                ok: contract.ok,
                sourceInput: contract.grammarFrame?.resultFrame?.sourceInput || "",
                sourceSurface: contract.grammarFrame?.routeContract?.sourceContract?.sourceSurface || "",
                targetInput: contract.grammarFrame?.routeContract?.targetContract?.targetInput || "",
            };
        })(),
        {
            ok: false,
            sourceInput: "",
            sourceSurface: "",
            targetInput: "-(frame-source-a/tajtani)",
        }
    );
    s.eq(
        "Andrews 39.7 absolutive patientive source uses direct subject-to-object mapping",
        [
            { subjectPrefix: "ni", subjectSuffix: "" },
            { subjectPrefix: "ti", subjectSuffix: "" },
            { subjectPrefix: "", subjectSuffix: "" },
            { subjectPrefix: "ti", subjectSuffix: "t" },
            { subjectPrefix: "an", subjectSuffix: "t" },
            { subjectPrefix: "", subjectSuffix: "t" },
        ].map((selection) => {
            const transfer = ctx.resolvePatientivoPrelocativeSubjectObjectTransfer({ selection });
            return {
                subject: `${selection.subjectPrefix || "Ø"}...${selection.subjectSuffix || "Ø"}`,
                sourcePrefix: transfer.sourcePrefix || "Ø",
                sourceSuffix: transfer.sourceSuffix || "Ø",
                objectPrefix: transfer.objectPrefix,
            };
        }),
        [
            { subject: "ni...Ø", sourcePrefix: "ni", sourceSuffix: "Ø", objectPrefix: "nech" },
            { subject: "ti...Ø", sourcePrefix: "ti", sourceSuffix: "Ø", objectPrefix: "metz" },
            { subject: "Ø...Ø", sourcePrefix: "Ø", sourceSuffix: "Ø", objectPrefix: "ki" },
            { subject: "ti...t", sourcePrefix: "ti", sourceSuffix: "t", objectPrefix: "tech" },
            { subject: "an...t", sourcePrefix: "an", sourceSuffix: "t", objectPrefix: "metzin" },
            { subject: "Ø...t", sourcePrefix: "Ø", sourceSuffix: "t", objectPrefix: "kin" },
        ]
    );
    const parsedPrelocativeContractInput = ctx.parseVerbInput(absolutivePrelocativeContract.prelocativeVerbInput);
    s.eq(
        "patientive prelocative contract builds a parsed transitive incorporated-object input",
        {
            sourceRawVerb: parsedPrelocativeContractInput.sourceRawVerb,
            verb: parsedPrelocativeContractInput.verb,
            sourceBase: parsedPrelocativeContractInput.sourceBase,
            hasLeadingDash: parsedPrelocativeContractInput.hasLeadingDash,
            isMarkedTransitive: parsedPrelocativeContractInput.isMarkedTransitive,
        },
        {
            sourceRawVerb: "-(tamati/tajtani)",
            verb: "tamatitajtani",
            sourceBase: "tajtani",
            hasLeadingDash: true,
            isMarkedTransitive: true,
        }
    );
    const generatedPrelocativeContractSurface = ctx.executeGenerateWordRequest(
        absolutivePrelocativeContract.prelocativeRequest.request
    );
    const poisonedPrelocativeRequest = {
        ...absolutivePrelocativeContract.prelocativeRequest.request,
        posicionesFormula: {
            ...absolutivePrelocativeContract.prelocativeRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedPrelocativeSurface = ctx.executeGenerateWordRequest(poisonedPrelocativeRequest);
    const poisonedPrelocativeDisplayInputContract = {
        ...absolutivePrelocativeContract,
        prelocativeVerbInput: "-(poisoned/tajtani)",
    };
    const generatedPoisonedPrelocativeDisplayInputSurface = ctx.executeGenerateWordRequest(
        poisonedPrelocativeDisplayInputContract.prelocativeRequest.request
    );
    const missingPrelocativeOperationRequest = ctx.buildPatientivoPrelocativeGenerationRequestFromOperationFrame(null);
    const invalidPrelocativeOperationFrameSurface = ctx.executeGenerateWordRequest({
        ...absolutivePrelocativeContract.prelocativeRequest.request,
        options: {
            ...absolutivePrelocativeContract.prelocativeRequest.request.options,
            override: {
                ...absolutivePrelocativeContract.prelocativeRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-patientivo-prelocative-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryPrelocativeOperationFrameSurface = ctx.executeGenerateWordRequest({
        ...absolutivePrelocativeContract.prelocativeRequest.request,
        options: {
            ...absolutivePrelocativeContract.prelocativeRequest.request.options,
            override: {
                ...absolutivePrelocativeContract.prelocativeRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...absolutivePrelocativeContract.prelocativeOperationFrame,
                    targetFrame: {
                        ...absolutivePrelocativeContract.prelocativeOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    s.eq(
        "patientive prelocative contract reaches actual finite V output through typed operation frames",
        {
            operationFrameKind: absolutivePrelocativeContract.prelocativeOperationFrame.kind,
            targetStem: absolutivePrelocativeContract.prelocativeOperationFrame.targetFrame.stem,
            requestStem: absolutivePrelocativeContract.prelocativeRequest.request.posicionesFormula.tronco,
            displayInputIsAuthority: absolutivePrelocativeContract.prelocativeOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            formationTargetStem: absolutivePrelocativeContract.formationFrame.targetStem,
            result: generatedPrelocativeContractSurface.result,
            poisonedResult: generatedPoisonedPrelocativeSurface.result,
            poisonedDisplayInputResult: generatedPoisonedPrelocativeDisplayInputSurface.result,
            missingOperationSupported: missingPrelocativeOperationRequest.supported,
            missingOperationDiagnostic: missingPrelocativeOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidPrelocativeOperationFrameSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryPrelocativeOperationFrameSurface.diagnostics[0].id,
        },
        {
            operationFrameKind: "andrews-patientivo-prelocative-operation-frame",
            targetStem: "tamatitajtani",
            requestStem: "tamatitajtani",
            displayInputIsAuthority: false,
            formationTargetStem: "tamatitajtani",
            result: "nechtamatitajtani",
            poisonedResult: "nechtamatitajtani",
            poisonedDisplayInputResult: "nechtamatitajtani",
            missingOperationSupported: false,
            missingOperationDiagnostic: "patientivo-prelocative-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const compoundEmbedInventory = ctx.getPatientivoCompoundEmbedMatrixInventory();
    s.eq(
        "Andrews 39.6 patientive compound-embed matrix inventory is explicit",
        compoundEmbedInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "miqui",
                classicalMatrix: "(miqui)",
                nawatRoot: "miki",
                status: "orthography-bridge-data-backed",
                matrixValency: "intransitive",
            },
        ]
    );
    const compoundEmbedContract = ctx.buildPatientivoCompoundEmbedContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "tamati",
        patientivoSource: "imperfectivo",
        patientivoNominalSuffix: "t",
        matrixRoot: "miki",
    });
    const generatedCompoundEmbedSurface = ctx.executeGenerateWordRequest(compoundEmbedContract.compoundRequest.request);
    const poisonedCompoundRequest = {
        ...compoundEmbedContract.compoundRequest.request,
        posicionesFormula: {
            ...compoundEmbedContract.compoundRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedCompoundEmbedSurface = ctx.executeGenerateWordRequest(poisonedCompoundRequest);
    const poisonedDisplayInputContract = {
        ...compoundEmbedContract,
        compoundVerbInput: "(poisoned/miki)",
    };
    const generatedPoisonedDisplayInputSurface = ctx.executeGenerateWordRequest(
        poisonedDisplayInputContract.compoundRequest.request
    );
    const missingOperationRequest = ctx.buildPatientivoCompoundEmbedGenerationRequestFromOperationFrame(null);
    const invalidOperationFrameSurface = ctx.executeGenerateWordRequest({
        ...compoundEmbedContract.compoundRequest.request,
        options: {
            ...compoundEmbedContract.compoundRequest.request.options,
            override: {
                ...compoundEmbedContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-patientivo-compound-embed-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryOperationFrameSurface = ctx.executeGenerateWordRequest({
        ...compoundEmbedContract.compoundRequest.request,
        options: {
            ...compoundEmbedContract.compoundRequest.request.options,
            override: {
                ...compoundEmbedContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...compoundEmbedContract.compoundOperationFrame,
                    targetFrame: {
                        ...compoundEmbedContract.compoundOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    s.eq(
        "Andrews 39.6 patientive nounstem can become a verbal compound embed",
        {
            supported: compoundEmbedContract.supported,
            incorporatedRoot: compoundEmbedContract.incorporatedRoot,
            compoundVerbInput: compoundEmbedContract.compoundVerbInput,
            displayInputIsAuthority: compoundEmbedContract.compoundOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            operationFrameKind: compoundEmbedContract.compoundOperationFrame.kind,
            targetStem: compoundEmbedContract.compoundOperationFrame.targetFrame.stem,
            requestStem: compoundEmbedContract.compoundRequest.request.posicionesFormula.tronco,
            result: generatedCompoundEmbedSurface.result,
            poisonedResult: generatedPoisonedCompoundEmbedSurface.result,
            poisonedDisplayInputResult: generatedPoisonedDisplayInputSurface.result,
            missingOperationSupported: missingOperationRequest.supported,
            missingOperationDiagnostic: missingOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidOperationFrameSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryOperationFrameSurface.diagnostics[0].id,
        },
        {
            supported: true,
            incorporatedRoot: "tamati",
            compoundVerbInput: "(tamati/miki)",
            displayInputIsAuthority: false,
            operationFrameKind: "andrews-patientivo-compound-embed-operation-frame",
            targetStem: "tamatimiki",
            requestStem: "tamatimiki",
            result: "tamatimiki",
            poisonedResult: "tamatimiki",
            poisonedDisplayInputResult: "tamatimiki",
            missingOperationSupported: false,
            missingOperationDiagnostic: "patientivo-compound-embed-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const unsupportedCompoundEmbedContract = ctx.buildPatientivoCompoundEmbedContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "tamati",
        patientivoSource: "imperfectivo",
        patientivoNominalSuffix: "t",
        matrixRoot: "ni",
    });
    s.eq(
        "Andrews 39.6 patientive compound-embed contract rejects unsupported matrices",
        {
            supported: unsupportedCompoundEmbedContract.supported,
            compoundVerbInput: unsupportedCompoundEmbedContract.compoundVerbInput,
            diagnostics: unsupportedCompoundEmbedContract.diagnostics,
        },
        {
            supported: false,
            compoundVerbInput: "",
            diagnostics: [
                "patientivo-compound-embed-unsupported-matrix",
                "patientivo-compound-embed-missing-verb-input",
            ],
        }
    );
    s.eq(
        "Andrews 39.6 patientive compound continuations require source provenance",
        {
            verbal: ctx.buildPatientivoCompoundEmbedContinuationContract({
                patientivoSurface: "tamatit",
                sourceSurface: "tamati",
                patientivoNominalSuffix: "t",
                matrixRoot: "miki",
            }).diagnostics,
            nominal: ctx.buildPatientivoNominalCompoundContinuationContract({
                patientivoSurface: "tamatit",
                sourceSurface: "tamati",
                patientivoNominalSuffix: "t",
                matrixRoot: "kal",
            }).diagnostics,
        },
        {
            verbal: ["patientivo-compound-embed-missing-patientivo-source"],
            nominal: ["patientivo-nominal-compound-missing-patientivo-source"],
        }
    );
    s.eq(
        "blocked derivation continuation contracts expose failed LCM layer",
        {
            ok: unsupportedCompoundEmbedContract.ok,
            routeStage: unsupportedCompoundEmbedContract.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: unsupportedCompoundEmbedContract.grammarFrame?.routeContract?.generationAllowed,
            diagnosticStatus: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.status || "",
            diagnosticId: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            diagnosticFailedLayer: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.failedLayer || "",
            diagnosticContractLayer: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.contractLayer || "",
            diagnosticRouteFamily: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.routeFamily || "",
            diagnosticRouteStage: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.routeStage || "",
            secondDiagnosticFailedLayer: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[1]?.failedLayer || "",
            blockingDiagnosticFailedLayer: unsupportedCompoundEmbedContract.grammarFrame?.routeContract?.blockingDiagnostics?.[0]?.failedLayer || "",
            contractDiagnosticFailedLayer: unsupportedCompoundEmbedContract.contractDiagnostics?.[0]?.failedLayer || "",
            diagnosticsEnumerable: Object.prototype.propertyIsEnumerable.call(unsupportedCompoundEmbedContract, "diagnostics"),
        },
        {
            ok: false,
            routeStage: "blocked",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            diagnosticId: "patientivo-compound-embed-unsupported-matrix",
            diagnosticFailedLayer: "route",
            diagnosticContractLayer: "routeContract",
            diagnosticRouteFamily: "derivation-continuation",
            diagnosticRouteStage: "blocked",
            secondDiagnosticFailedLayer: "output",
            blockingDiagnosticFailedLayer: "route",
            contractDiagnosticFailedLayer: "route",
            diagnosticsEnumerable: true,
        }
    );
    const nominalCompoundInventory = ctx.getPatientivoNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 39.6 patientive nominal-matrix inventory is explicit",
        nominalCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                status: "orthography-bridge-data-backed",
            },
        ]
    );
    const nominalCompoundContract = ctx.buildPatientivoNominalCompoundContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "tamati",
        patientivoSource: "imperfectivo",
        patientivoNominalSuffix: "t",
        matrixRoot: "kal",
    });
    const generatedNominalCompoundSurface = ctx.generateOrdinaryNncParadigm(nominalCompoundContract.ordinaryNncRequest);
    const generatedNominalCompoundSurfaceWithLyingStem = ctx.generateOrdinaryNncParadigm({
        ...nominalCompoundContract.ordinaryNncRequest,
        stem: "poisoned-string",
    });
    s.eq(
        "Andrews 39.6 patientive nounstem can become an ordinary NNC compound stem",
        {
            supported: nominalCompoundContract.supported,
            incorporatedRoot: nominalCompoundContract.incorporatedRoot,
            compoundStem: nominalCompoundContract.compoundStem,
            ordinaryNncInput: nominalCompoundContract.ordinaryNncInput,
            requestStem: nominalCompoundContract.ordinaryNncRequest.stem,
            requestSlotStem: nominalCompoundContract.ordinaryNncRequest.formulaSlots.predicateStem.stem,
            requestSlotNounClass: nominalCompoundContract.ordinaryNncRequest.formulaSlots.num1Num2.nounClass,
            result: generatedNominalCompoundSurface.result,
            poisonedResult: generatedNominalCompoundSurfaceWithLyingStem.result,
            sourceKind: generatedNominalCompoundSurface.source.sourceKind,
            nounClass: generatedNominalCompoundSurface.nounClass,
        },
        {
            supported: true,
            incorporatedRoot: "tamati",
            compoundStem: "tamatikal",
            ordinaryNncInput: "(tamatikal)",
            requestStem: "tamatikal",
            requestSlotStem: "tamatikal",
            requestSlotNounClass: "zero",
            result: "tamatikal",
            poisonedResult: "tamatikal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    s.eq(
        "Andrews 39.6 patientive compound contracts expose embed/matrix formation frames",
        {
            verbal: {
                grammarSource: compoundEmbedContract.formationFrame.grammarSource,
                compoundStemType: compoundEmbedContract.formationFrame.compoundStemType,
                embedRole: compoundEmbedContract.formationFrame.embed.role,
                embedRoot: compoundEmbedContract.formationFrame.embed.root,
                matrixType: compoundEmbedContract.formationFrame.matrix.type,
                matrixRoot: compoundEmbedContract.formationFrame.matrix.root,
                outputKind: compoundEmbedContract.formationFrame.output.kind,
                verbInput: compoundEmbedContract.formationFrame.output.verbInput,
                createsFixture: compoundEmbedContract.formationFrame.evidencePolicy.createsOrdinaryNncFixture,
            },
            nominal: {
                grammarSource: nominalCompoundContract.formationFrame.grammarSource,
                compoundStemType: nominalCompoundContract.formationFrame.compoundStemType,
                embedRole: nominalCompoundContract.formationFrame.embed.role,
                embedRoot: nominalCompoundContract.formationFrame.embed.root,
                matrixType: nominalCompoundContract.formationFrame.matrix.type,
                matrixRoot: nominalCompoundContract.formationFrame.matrix.root,
                outputKind: nominalCompoundContract.formationFrame.output.kind,
                ordinaryNncInput: nominalCompoundContract.formationFrame.output.ordinaryNncInput,
                sourceKind: nominalCompoundContract.formationFrame.output.sourceKind,
                createsFixture: nominalCompoundContract.formationFrame.evidencePolicy.createsOrdinaryNncFixture,
            },
        },
        {
            verbal: {
                grammarSource: "Andrews 39.6",
                compoundStemType: "verbal",
                embedRole: "compound-embed",
                embedRoot: "tamati",
                matrixType: "verbal",
                matrixRoot: "miki",
                outputKind: "compound-vnc-input",
                verbInput: "(tamati/miki)",
                createsFixture: false,
            },
            nominal: {
                grammarSource: "Andrews 39.6",
                compoundStemType: "nominal",
                embedRole: "compound-embed",
                embedRoot: "tamati",
                matrixType: "nominal",
                matrixRoot: "kal",
                outputKind: "ordinary-nnc-compound-input",
                ordinaryNncInput: "(tamatikal)",
                sourceKind: "open-stem",
                createsFixture: false,
            },
        }
    );
    const activeActionCompoundEmbedInventory = ctx.getActiveActionCompoundEmbedMatrixInventory();
    const buildTypedActiveActionSourceFrame = (surface = "chukilis") => {
        const formulaRecord = ctx.buildGrammarFormulaRecord({
            id: `active-action-source-${surface}`,
            unit: "NNC",
            formula: `#Ø-Ø(${surface})Ø#`,
            formulaSlots: {
                predicateStem: { slot: "STEM", stem: surface, role: "active-action-nounstem" },
            },
            operationFrames: [{ operationId: "active-action-nominalization" }],
        });
        const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
            id: `active-action-realization-${surface}`,
            formulaRecord,
            surface,
            surfaceForms: [surface],
            segmentFrames: [{
                slot: "predicateStem",
                role: "active-action-nounstem",
                formulaValue: surface,
                surface,
                operationId: "nawat-pipil-orthography-realization",
            }],
            deriveSurfaceFromSegments: true,
        });
        return {
            kind: "generated-output-typed-continuation-frame",
            role: "source",
            unit: "NNC",
            formulaRecord,
            formulaRealizationRecord,
            selectedVariant: {
                kind: "grammar-formula-realization-selected-variant",
                surface,
                variantIndex: 0,
                variantId: `${formulaRealizationRecord.id}#variant:0`,
                formulaRecordId: formulaRecord.id,
                formulaRealizationRecordId: formulaRealizationRecord.id,
            },
            formulaSlots: formulaRecord.formulaSlots,
        };
    };
    const activeActionSourceFrame = buildTypedActiveActionSourceFrame("chukilis");
    s.eq(
        "Andrews 37.5.4 active-action compound-embed matrix inventory is explicit",
        activeActionCompoundEmbedInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "tzahtzi",
                classicalMatrix: "(tzahtzi)",
                nawatRoot: "tzajtzi",
                status: "orthography-bridge-data-backed",
                matrixValency: "intransitive",
            },
        ]
    );
    const activeActionCompoundContract = ctx.buildActiveActionCompoundEmbedContinuationContract({
        actionNominalSurface: "chukilis",
        sourceSurface: "chuka",
        sourceContinuationFrame: activeActionSourceFrame,
        matrixRoot: "tzajtzi",
    });
    const generatedActiveActionCompoundSurface = ctx.executeGenerateWordRequest(activeActionCompoundContract.compoundRequest.request);
    const poisonedActiveActionRequest = {
        ...activeActionCompoundContract.compoundRequest.request,
        posicionesFormula: {
            ...activeActionCompoundContract.compoundRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedActiveActionCompoundSurface = ctx.executeGenerateWordRequest(poisonedActiveActionRequest);
    const poisonedActiveActionDisplayContract = {
        ...activeActionCompoundContract,
        compoundVerbInput: "(poisoned/tzajtzi)",
    };
    const generatedPoisonedActiveActionDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedActiveActionDisplayContract.compoundRequest.request
    );
    const missingActiveActionOperationRequest = ctx.buildActiveActionCompoundEmbedGenerationRequestFromOperationFrame(null);
    const invalidActiveActionOperationSurface = ctx.executeGenerateWordRequest({
        ...activeActionCompoundContract.compoundRequest.request,
        options: {
            ...activeActionCompoundContract.compoundRequest.request.options,
            override: {
                ...activeActionCompoundContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-active-action-compound-embed-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryActiveActionOperationSurface = ctx.executeGenerateWordRequest({
        ...activeActionCompoundContract.compoundRequest.request,
        options: {
            ...activeActionCompoundContract.compoundRequest.request.options,
            override: {
                ...activeActionCompoundContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...activeActionCompoundContract.compoundOperationFrame,
                    targetFrame: {
                        ...activeActionCompoundContract.compoundOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    s.eq(
        "Andrews 37.5.4 active-action nounstem can become a verbal compound embed from #3 output",
        {
            supported: activeActionCompoundContract.supported,
            incorporatedRoot: activeActionCompoundContract.incorporatedRoot,
            compoundVerbInput: activeActionCompoundContract.compoundVerbInput,
            sourceFrameKind: activeActionCompoundContract.sourceContinuationFrame?.kind || "",
            targetFrameKind: activeActionCompoundContract.targetContinuationFrame?.kind || "",
            operationId: activeActionCompoundContract.targetContinuationFrame?.operationFrame?.operationId || "",
            operationFrameKind: activeActionCompoundContract.compoundOperationFrame.kind,
            displayInputIsAuthority: activeActionCompoundContract.compoundOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: activeActionCompoundContract.compoundOperationFrame.targetFrame.stem,
            requestStem: activeActionCompoundContract.compoundRequest.request.posicionesFormula.tronco,
            result: generatedActiveActionCompoundSurface.result,
            poisonedResult: generatedPoisonedActiveActionCompoundSurface.result,
            poisonedDisplayInputResult: generatedPoisonedActiveActionDisplaySurface.result,
            missingOperationSupported: missingActiveActionOperationRequest.supported,
            missingOperationDiagnostic: missingActiveActionOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidActiveActionOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryActiveActionOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            incorporatedRoot: "chukilis",
            compoundVerbInput: "(chukilis/tzajtzi)",
            sourceFrameKind: "generated-output-typed-continuation-frame",
            targetFrameKind: "andrews-typed-operation-continuation-frame",
            operationId: "active-action-nounstem-as-compound-embed",
            operationFrameKind: "andrews-active-action-compound-embed-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "chukilistzajtzi",
            requestStem: "chukilistzajtzi",
            result: "chukilistzajtzi",
            poisonedResult: "chukilistzajtzi",
            poisonedDisplayInputResult: "chukilistzajtzi",
            missingOperationSupported: false,
            missingOperationDiagnostic: "active-action-compound-embed-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const stringOnlyActiveActionCompoundContract = ctx.buildActiveActionCompoundEmbedContinuationContract({
        actionNominalSurface: "chukilis",
        sourceSurface: "chuka",
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 37.5.4 active-action compound embed blocks string-only continuation payloads",
        {
            supported: stringOnlyActiveActionCompoundContract.supported,
            compoundVerbInput: stringOnlyActiveActionCompoundContract.compoundVerbInput,
            diagnostics: stringOnlyActiveActionCompoundContract.diagnostics,
        },
        {
            supported: false,
            compoundVerbInput: "",
            diagnostics: [
                "active-action-compound-embed-missing-typed-source-frame",
                "active-action-compound-embed-missing-typed-action-nominal-realization",
                "active-action-compound-embed-missing-typed-target-frame",
            ],
        }
    );
    const contradictoryActiveActionCompoundContract = ctx.buildActiveActionCompoundEmbedContinuationContract({
        actionNominalSurface: "surface-lie",
        sourceSurface: "surface-lie",
        sourceContinuationFrame: activeActionSourceFrame,
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 37.5.4 active-action compound embed blocks contradictory display surfaces",
        {
            supported: contradictoryActiveActionCompoundContract.supported,
            incorporatedRoot: contradictoryActiveActionCompoundContract.incorporatedRoot,
            diagnostics: contradictoryActiveActionCompoundContract.diagnostics,
        },
        {
            supported: false,
            incorporatedRoot: "chukilis",
            diagnostics: [
                "active-action-compound-embed-display-surface-contradicts-source-frame",
            ],
        }
    );
    const activeActionNominalCompoundInventory = ctx.getActiveActionNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 37.5.4 active-action nominal-matrix inventory is explicit",
        activeActionNominalCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                status: "orthography-bridge-data-backed",
            },
        ]
    );
    const activeActionNominalContract = ctx.buildActiveActionNominalCompoundContinuationContract({
        actionNominalSurface: "chukilis",
        sourceSurface: "chuka",
        matrixRoot: "kal",
    });
    const generatedActiveActionNominalSurface = ctx.generateOrdinaryNncParadigm(activeActionNominalContract.ordinaryNncRequest);
    s.eq(
        "Andrews 37.5.4 active-action nounstem can become an ordinary NNC compound stem from #3 output",
        {
            supported: activeActionNominalContract.supported,
            incorporatedRoot: activeActionNominalContract.incorporatedRoot,
            compoundStem: activeActionNominalContract.compoundStem,
            ordinaryNncInput: activeActionNominalContract.ordinaryNncInput,
            result: generatedActiveActionNominalSurface.result,
            sourceKind: generatedActiveActionNominalSurface.source.sourceKind,
            nounClass: generatedActiveActionNominalSurface.nounClass,
        },
        {
            supported: true,
            incorporatedRoot: "chukilis",
            compoundStem: "chukiliskal",
            ordinaryNncInput: "(chukiliskal)",
            result: "chukiliskal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    const customaryAgentiveNominalInventory = ctx.getCustomaryAgentiveNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 36.3 customary-present agentive nominal-matrix inventory is explicit",
        customaryAgentiveNominalInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                grammarSource: "Andrews 36.3",
                nounClass: "zero",
                animacy: "inanimate",
                status: "orthography-bridge-data-backed",
            },
        ]
    );
    const customaryAgentiveNominalContract = ctx.buildCustomaryAgentiveNominalCompoundContinuationContract({
        customaryAgentiveStem: "nemini",
        sourceSurface: "nemini",
        matrixRoot: "kal",
    });
    const generatedCustomaryAgentiveNominalSurface = ctx.generateOrdinaryNncParadigm(
        customaryAgentiveNominalContract.ordinaryNncRequest
    );
    s.eq(
        "Andrews 36.3 fully nominalized customary-present agentive stem can become an ordinary NNC compound stem from #3 output",
        {
            supported: customaryAgentiveNominalContract.supported,
            customaryAgentiveStem: customaryAgentiveNominalContract.customaryAgentiveStem,
            incorporatedRoot: customaryAgentiveNominalContract.incorporatedRoot,
            compoundStem: customaryAgentiveNominalContract.compoundStem,
            ordinaryNncInput: customaryAgentiveNominalContract.ordinaryNncInput,
            result: generatedCustomaryAgentiveNominalSurface.result,
            sourceKind: generatedCustomaryAgentiveNominalSurface.source.sourceKind,
            nounClass: generatedCustomaryAgentiveNominalSurface.nounClass,
        },
        {
            supported: true,
            customaryAgentiveStem: "nemini",
            incorporatedRoot: "nemini",
            compoundStem: "neminikal",
            ordinaryNncInput: "(neminikal)",
            result: "neminikal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    const customaryAgentiveCompoundInventory = ctx.getCustomaryAgentiveCompoundEmbedMatrixInventory();
    s.eq(
        "Andrews 36.3 customary-present agentive compound-embed matrix inventory is explicit",
        customaryAgentiveCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            status: entry.status,
            matrixValency: entry.matrixValency,
            objectPrefix: entry.objectPrefix,
        })),
        [
            {
                id: "toca-incorporated-complement",
                classicalMatrix: "(toca)",
                nawatRoot: "tuka",
                grammarSource: "Andrews 36.3",
                status: "andrews-authoritative-orthography-bridge-data-backed",
                matrixValency: "transitive",
                objectPrefix: "ki",
            },
        ]
    );
    const customaryAgentiveCompoundContract = ctx.buildCustomaryAgentiveCompoundEmbedContinuationContract({
        customaryAgentiveStem: "nemini",
        sourceSurface: "nemini",
        matrixRoot: "tuka",
    });
    const generatedCustomaryAgentiveCompoundSurface = ctx.executeGenerateWordRequest(
        customaryAgentiveCompoundContract.compoundRequest.request
    );
    const poisonedCustomaryAgentiveRequest = {
        ...customaryAgentiveCompoundContract.compoundRequest.request,
        posicionesFormula: {
            ...customaryAgentiveCompoundContract.compoundRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedCustomaryAgentiveCompoundSurface = ctx.executeGenerateWordRequest(poisonedCustomaryAgentiveRequest);
    const poisonedCustomaryAgentiveDisplayContract = {
        ...customaryAgentiveCompoundContract,
        compoundVerbInput: "-(poisoned/tuka)",
    };
    const generatedPoisonedCustomaryAgentiveDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedCustomaryAgentiveDisplayContract.compoundRequest.request
    );
    const missingCustomaryAgentiveOperationRequest = ctx.buildCustomaryAgentiveCompoundEmbedGenerationRequestFromOperationFrame(null);
    const invalidCustomaryAgentiveOperationSurface = ctx.executeGenerateWordRequest({
        ...customaryAgentiveCompoundContract.compoundRequest.request,
        options: {
            ...customaryAgentiveCompoundContract.compoundRequest.request.options,
            override: {
                ...customaryAgentiveCompoundContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-customary-agentive-compound-embed-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryCustomaryAgentiveOperationSurface = ctx.executeGenerateWordRequest({
        ...customaryAgentiveCompoundContract.compoundRequest.request,
        options: {
            ...customaryAgentiveCompoundContract.compoundRequest.request.options,
            override: {
                ...customaryAgentiveCompoundContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...customaryAgentiveCompoundContract.compoundOperationFrame,
                    targetFrame: {
                        ...customaryAgentiveCompoundContract.compoundOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    s.eq(
        "Andrews 36.3 fully nominalized customary-present agentive stem can become a transitive VNC compound embed from #3 output",
        {
            supported: customaryAgentiveCompoundContract.supported,
            customaryAgentiveStem: customaryAgentiveCompoundContract.customaryAgentiveStem,
            incorporatedRoot: customaryAgentiveCompoundContract.incorporatedRoot,
            compoundVerbInput: customaryAgentiveCompoundContract.compoundVerbInput,
            objectPrefix: customaryAgentiveCompoundContract.objectPrefix,
            operationFrameKind: customaryAgentiveCompoundContract.compoundOperationFrame.kind,
            displayInputIsAuthority: customaryAgentiveCompoundContract.compoundOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: customaryAgentiveCompoundContract.compoundOperationFrame.targetFrame.stem,
            requestStem: customaryAgentiveCompoundContract.compoundRequest.request.posicionesFormula.tronco,
            result: generatedCustomaryAgentiveCompoundSurface.result,
            poisonedResult: generatedPoisonedCustomaryAgentiveCompoundSurface.result,
            poisonedDisplayInputResult: generatedPoisonedCustomaryAgentiveDisplaySurface.result,
            missingOperationSupported: missingCustomaryAgentiveOperationRequest.supported,
            missingOperationDiagnostic: missingCustomaryAgentiveOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidCustomaryAgentiveOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryCustomaryAgentiveOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            customaryAgentiveStem: "nemini",
            incorporatedRoot: "nemini",
            compoundVerbInput: "-(nemini/tuka)",
            objectPrefix: "ki",
            operationFrameKind: "andrews-customary-agentive-compound-embed-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "neminituka",
            requestStem: "neminituka",
            result: "kineminituka",
            poisonedResult: "kineminituka",
            poisonedDisplayInputResult: "kineminituka",
            missingOperationSupported: false,
            missingOperationDiagnostic: "customary-agentive-compound-embed-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const unsupportedCustomaryAgentiveCompoundContract = ctx.buildCustomaryAgentiveCompoundEmbedContinuationContract({
        customaryAgentiveStem: "nemini",
        matrixRoot: "kal",
    });
    s.eq(
        "Andrews 36.3 customary-present agentive compound embed rejects non-verbal matrices",
        {
            supported: unsupportedCustomaryAgentiveCompoundContract.supported,
            compoundVerbInput: unsupportedCustomaryAgentiveCompoundContract.compoundVerbInput,
            diagnostics: unsupportedCustomaryAgentiveCompoundContract.diagnostics,
        },
        {
            supported: false,
            compoundVerbInput: "",
            diagnostics: [
                "customary-agentive-compound-embed-unsupported-matrix",
                "customary-agentive-compound-embed-missing-verb-input",
            ],
        }
    );
    const unsupportedCustomaryAgentiveNominalContract = ctx.buildCustomaryAgentiveNominalCompoundContinuationContract({
        customaryAgentiveStem: "nemini",
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 36.3 customary-present agentive nominal compound rejects non-nominal matrices",
        {
            supported: unsupportedCustomaryAgentiveNominalContract.supported,
            compoundStem: unsupportedCustomaryAgentiveNominalContract.compoundStem,
            ordinaryNncInput: unsupportedCustomaryAgentiveNominalContract.ordinaryNncInput,
            diagnostics: unsupportedCustomaryAgentiveNominalContract.diagnostics,
        },
        {
            supported: false,
            compoundStem: "",
            ordinaryNncInput: "",
            diagnostics: [
                "customary-agentive-nominal-compound-unsupported-matrix",
                "customary-agentive-nominal-compound-missing-nnc-input",
            ],
        }
    );
    const preteritAgentiveCompoundInventory = ctx.getPreteritAgentiveCompoundEmbedMatrixInventory();
    s.eq(
        "Andrews 35.7 preterit-agentive compound-embed matrix inventory is explicit",
        preteritAgentiveCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "tzahtzi",
                classicalMatrix: "(tzahtzi)",
                nawatRoot: "tzajtzi",
                grammarSource: "Andrews 35.7",
                status: "orthography-bridge-data-backed",
                matrixValency: "intransitive",
            },
        ]
    );
    const preteritAgentiveCompoundContract = ctx.buildPreteritAgentiveCompoundEmbedContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "tzajtzi",
    });
    const generatedPreteritAgentiveCompoundSurface = ctx.executeGenerateWordRequest(
        preteritAgentiveCompoundContract.compoundRequest.request
    );
    const poisonedPreteritAgentiveRequest = {
        ...preteritAgentiveCompoundContract.compoundRequest.request,
        posicionesFormula: {
            ...preteritAgentiveCompoundContract.compoundRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedPreteritAgentiveCompoundSurface = ctx.executeGenerateWordRequest(poisonedPreteritAgentiveRequest);
    const poisonedPreteritAgentiveDisplayContract = {
        ...preteritAgentiveCompoundContract,
        compoundVerbInput: "(poisoned/tzajtzi)",
    };
    const generatedPoisonedPreteritAgentiveDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedPreteritAgentiveDisplayContract.compoundRequest.request
    );
    const missingPreteritAgentiveOperationRequest = ctx.buildPreteritAgentiveCompoundEmbedGenerationRequestFromOperationFrame(null);
    const invalidPreteritAgentiveOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveCompoundContract.compoundRequest.request,
        options: {
            ...preteritAgentiveCompoundContract.compoundRequest.request.options,
            override: {
                ...preteritAgentiveCompoundContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-preterit-agentive-compound-embed-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryPreteritAgentiveOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveCompoundContract.compoundRequest.request,
        options: {
            ...preteritAgentiveCompoundContract.compoundRequest.request.options,
            override: {
                ...preteritAgentiveCompoundContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...preteritAgentiveCompoundContract.compoundOperationFrame,
                    targetFrame: {
                        ...preteritAgentiveCompoundContract.compoundOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    s.eq(
        "Andrews 35.7 preterit-agentive general-use stem can become a verbal compound embed from #3 output",
        {
            supported: preteritAgentiveCompoundContract.supported,
            preteritAgentiveStem: preteritAgentiveCompoundContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveCompoundContract.incorporatedRoot,
            compoundVerbInput: preteritAgentiveCompoundContract.compoundVerbInput,
            operationFrameKind: preteritAgentiveCompoundContract.compoundOperationFrame.kind,
            displayInputIsAuthority: preteritAgentiveCompoundContract.compoundOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: preteritAgentiveCompoundContract.compoundOperationFrame.targetFrame.stem,
            requestStem: preteritAgentiveCompoundContract.compoundRequest.request.posicionesFormula.tronco,
            result: generatedPreteritAgentiveCompoundSurface.result,
            poisonedResult: generatedPoisonedPreteritAgentiveCompoundSurface.result,
            poisonedDisplayInputResult: generatedPoisonedPreteritAgentiveDisplaySurface.result,
            missingOperationSupported: missingPreteritAgentiveOperationRequest.supported,
            missingOperationDiagnostic: missingPreteritAgentiveOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidPreteritAgentiveOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryPreteritAgentiveOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            compoundVerbInput: "(tamatka/tzajtzi)",
            operationFrameKind: "andrews-preterit-agentive-compound-embed-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "tamatkatzajtzi",
            requestStem: "tamatkatzajtzi",
            result: "tamatkatzajtzi",
            poisonedResult: "tamatkatzajtzi",
            poisonedDisplayInputResult: "tamatkatzajtzi",
            missingOperationSupported: false,
            missingOperationDiagnostic: "preterit-agentive-compound-embed-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const preteritAgentiveNominalInventory = ctx.getPreteritAgentiveNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 35.7 preterit-agentive nominal-matrix inventory is explicit",
        preteritAgentiveNominalInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                grammarSource: "Andrews 35.7",
                nounClass: "zero",
                animacy: "inanimate",
                status: "orthography-bridge-data-backed",
            },
        ]
    );
    const preteritAgentiveNominalContract = ctx.buildPreteritAgentiveNominalCompoundContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "kal",
    });
    const generatedPreteritAgentiveNominalSurface = ctx.generateOrdinaryNncParadigm(preteritAgentiveNominalContract.ordinaryNncRequest);
    s.eq(
        "Andrews 35.7 preterit-agentive general-use stem can become an ordinary NNC compound stem from #3 output",
        {
            supported: preteritAgentiveNominalContract.supported,
            preteritAgentiveStem: preteritAgentiveNominalContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveNominalContract.incorporatedRoot,
            compoundStem: preteritAgentiveNominalContract.compoundStem,
            ordinaryNncInput: preteritAgentiveNominalContract.ordinaryNncInput,
            result: generatedPreteritAgentiveNominalSurface.result,
            sourceKind: generatedPreteritAgentiveNominalSurface.source.sourceKind,
            nounClass: generatedPreteritAgentiveNominalSurface.nounClass,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            compoundStem: "tamatkakal",
            ordinaryNncInput: "(tamatkakal)",
            result: "tamatkakal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    const preteritAgentiveOwnerhoodInventory = ctx.getPreteritAgentiveOwnerhoodMatrixInventory();
    s.eq(
        "Andrews 35.9-35.10 preterit-agentive ownerhood matrices use Nawat orthography",
        preteritAgentiveOwnerhoodInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            surfaceMatrix: entry.surfaceMatrix,
            ownerhoodKind: entry.ownerhoodKind,
            grammarSource: entry.grammarSource,
            status: entry.status,
        })),
        [
            {
                id: "tla-hua-ownerhood",
                classicalMatrix: "*tla-(-hua)",
                nawatRoot: "wa",
                surfaceMatrix: "waj",
                ownerhoodKind: "ownerhood",
                grammarSource: "Andrews 35.9",
                status: "andrews-authoritative-matrix-orthography-bridge",
            },
            {
                id: "tla-yo-a-abundant-ownerhood",
                classicalMatrix: "*tla-(-yo-a)",
                nawatRoot: "yua",
                surfaceMatrix: "yuj",
                ownerhoodKind: "abundant-ownerhood",
                grammarSource: "Andrews 35.10",
                status: "andrews-authoritative-matrix-orthography-bridge",
            },
        ]
    );
    const preteritAgentiveOwnerhoodContract = ctx.buildPreteritAgentiveOwnerhoodContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "wa",
    });
    const generatedPreteritAgentiveOwnerhoodSurface = ctx.executeGenerateWordRequest(
        preteritAgentiveOwnerhoodContract.ownerhoodRequest.request
    );
    const poisonedPreteritAgentiveOwnerhoodRequest = {
        ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request,
        posicionesFormula: {
            ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedPreteritAgentiveOwnerhoodSurface = ctx.executeGenerateWordRequest(
        poisonedPreteritAgentiveOwnerhoodRequest
    );
    const poisonedPreteritAgentiveOwnerhoodDisplayContract = {
        ...preteritAgentiveOwnerhoodContract,
        ownerhoodVerbInput: "(poisoned)-(wa)",
    };
    const generatedPoisonedPreteritAgentiveOwnerhoodDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedPreteritAgentiveOwnerhoodDisplayContract.ownerhoodRequest.request
    );
    const missingPreteritAgentiveOwnerhoodOperationRequest = ctx.buildPreteritAgentiveOwnerhoodGenerationRequestFromOperationFrame(null);
    const invalidPreteritAgentiveOwnerhoodOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request,
        options: {
            ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.options,
            override: {
                ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-preterit-agentive-ownerhood-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryPreteritAgentiveOwnerhoodOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request,
        options: {
            ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.options,
            override: {
                ...preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...preteritAgentiveOwnerhoodContract.ownerhoodOperationFrame,
                    targetFrame: {
                        ...preteritAgentiveOwnerhoodContract.ownerhoodOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    const originalPreteritAgentiveOwnerhoodBuilder = ctx.buildPreteritAgentiveOwnerhoodVerbInput;
    let generatedPoisonedPreteritAgentiveOwnerhoodBuilderSurface = null;
    try {
        ctx.buildPreteritAgentiveOwnerhoodVerbInput = () => "(poisoned)-(wa)";
        generatedPoisonedPreteritAgentiveOwnerhoodBuilderSurface = ctx.executeGenerateWordRequest(
            preteritAgentiveOwnerhoodContract.ownerhoodRequest.request
        );
    } finally {
        ctx.buildPreteritAgentiveOwnerhoodVerbInput = originalPreteritAgentiveOwnerhoodBuilder;
    }
    s.eq(
        "Andrews 35.9 preterit-agentive general-use stem can feed the ownerhood VNC matrix through typed frames",
        {
            supported: preteritAgentiveOwnerhoodContract.supported,
            preteritAgentiveStem: preteritAgentiveOwnerhoodContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveOwnerhoodContract.incorporatedRoot,
            matrixRoot: preteritAgentiveOwnerhoodContract.matrixRoot,
            surfaceMatrix: preteritAgentiveOwnerhoodContract.surfaceMatrix,
            ownerhoodKind: preteritAgentiveOwnerhoodContract.ownerhoodKind,
            ownerhoodVerbInput: preteritAgentiveOwnerhoodContract.ownerhoodVerbInput,
            operationFrameKind: preteritAgentiveOwnerhoodContract.ownerhoodOperationFrame.kind,
            displayInputIsAuthority: preteritAgentiveOwnerhoodContract.ownerhoodOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: preteritAgentiveOwnerhoodContract.ownerhoodOperationFrame.targetFrame.stem,
            requestStem: preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.posicionesFormula.tronco,
            parsedFrameSourceRawVerb: preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.options.override.parsedVerb.sourceRawVerb,
            parsedFrameSourcePrefix: preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.options.override.parsedVerb.sourcePrefix,
            parsedFrameSourceBase: preteritAgentiveOwnerhoodContract.ownerhoodRequest.request.options.override.parsedVerb.sourceBase,
            result: generatedPreteritAgentiveOwnerhoodSurface.result,
            poisonedResult: generatedPoisonedPreteritAgentiveOwnerhoodSurface.result,
            poisonedDisplayInputResult: generatedPoisonedPreteritAgentiveOwnerhoodDisplaySurface.result,
            poisonedLegacyBuilderResult: generatedPoisonedPreteritAgentiveOwnerhoodBuilderSurface.result,
            missingOperationSupported: missingPreteritAgentiveOwnerhoodOperationRequest.supported,
            missingOperationDiagnostic: missingPreteritAgentiveOwnerhoodOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidPreteritAgentiveOwnerhoodOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryPreteritAgentiveOwnerhoodOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            matrixRoot: "wa",
            surfaceMatrix: "waj",
            ownerhoodKind: "ownerhood",
            ownerhoodVerbInput: "(tamatka)-(wa)",
            operationFrameKind: "andrews-preterit-agentive-ownerhood-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "tamatkawa",
            requestStem: "tamatkawa",
            parsedFrameSourceRawVerb: "tamatkawa",
            parsedFrameSourcePrefix: "tamatka",
            parsedFrameSourceBase: "wa",
            result: "tamatkawajka",
            poisonedResult: "tamatkawajka",
            poisonedDisplayInputResult: "tamatkawajka",
            poisonedLegacyBuilderResult: "tamatkawajka",
            missingOperationSupported: false,
            missingOperationDiagnostic: "preterit-agentive-ownerhood-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const preteritAgentiveAbundantOwnerhoodContract = ctx.buildPreteritAgentiveOwnerhoodContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "yua",
    });
    const generatedPreteritAgentiveAbundantOwnerhoodSurface = ctx.executeGenerateWordRequest(
        preteritAgentiveAbundantOwnerhoodContract.ownerhoodRequest.request
    );
    s.eq(
        "Andrews 35.10 preterit-agentive general-use stem can feed the abundant-ownerhood VNC matrix",
        {
            supported: preteritAgentiveAbundantOwnerhoodContract.supported,
            matrixRoot: preteritAgentiveAbundantOwnerhoodContract.matrixRoot,
            surfaceMatrix: preteritAgentiveAbundantOwnerhoodContract.surfaceMatrix,
            ownerhoodKind: preteritAgentiveAbundantOwnerhoodContract.ownerhoodKind,
            ownerhoodVerbInput: preteritAgentiveAbundantOwnerhoodContract.ownerhoodVerbInput,
            targetStem: preteritAgentiveAbundantOwnerhoodContract.ownerhoodOperationFrame.targetFrame.stem,
            requestStem: preteritAgentiveAbundantOwnerhoodContract.ownerhoodRequest.request.posicionesFormula.tronco,
            result: generatedPreteritAgentiveAbundantOwnerhoodSurface.result,
        },
        {
            supported: true,
            matrixRoot: "yua",
            surfaceMatrix: "yuj",
            ownerhoodKind: "abundant-ownerhood",
            ownerhoodVerbInput: "(tamatka)-(yua)",
            targetStem: "tamatkayua",
            requestStem: "tamatkayua",
            result: "tamatkayujka",
        }
    );
    const unsupportedPreteritAgentiveOwnerhoodContract = ctx.buildPreteritAgentiveOwnerhoodContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "e",
    });
    s.eq(
        "Andrews 35.9 preterit-agentive ownerhood rejects non-authorized ownerhood matrices for this path",
        {
            supported: unsupportedPreteritAgentiveOwnerhoodContract.supported,
            ownerhoodVerbInput: unsupportedPreteritAgentiveOwnerhoodContract.ownerhoodVerbInput,
            diagnostics: unsupportedPreteritAgentiveOwnerhoodContract.diagnostics,
        },
        {
            supported: false,
            ownerhoodVerbInput: "",
            diagnostics: [
                "preterit-agentive-ownerhood-unsupported-matrix",
                "preterit-agentive-ownerhood-missing-verb-input",
            ],
        }
    );
    const preteritAgentiveComplementInventory = ctx.getPreteritAgentiveComplementMatrixInventory();
    s.eq(
        "Andrews 35.12 preterit-agentive incorporated-complement matrices are Nawat data-backed",
        preteritAgentiveComplementInventory.map((entry) => ({
            id: entry.id,
            nawatRoot: entry.nawatRoot,
            objectPrefix: entry.objectPrefix,
            grammarSource: entry.grammarSource,
            status: entry.status,
        })),
        [
            {
                id: "te-tlalia",
                nawatRoot: "talia",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-orthography-bridge-data-backed",
            },
            {
                id: "te-cahua",
                nawatRoot: "kawa",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-orthography-bridge-data-backed",
            },
            {
                id: "te-pehpena",
                nawatRoot: "pejpena",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-orthography-bridge-data-backed",
            },
            {
                id: "te-tla-mati",
                nawatRoot: "mati",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-orthography-bridge-data-backed",
            },
            {
                id: "te-toca",
                nawatRoot: "tuka",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-orthography-bridge-data-backed",
            },
            {
                id: "te-nehnequi",
                nawatRoot: "nejneki",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-orthography-bridge-data-backed",
            },
        ]
    );
    const preteritAgentiveComplementContract = ctx.buildPreteritAgentiveComplementContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "mati",
    });
    const generatedPreteritAgentiveComplementSurface = ctx.executeGenerateWordRequest(
        preteritAgentiveComplementContract.complementRequest.request
    );
    const poisonedPreteritAgentiveComplementRequest = {
        ...preteritAgentiveComplementContract.complementRequest.request,
        posicionesFormula: {
            ...preteritAgentiveComplementContract.complementRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedPreteritAgentiveComplementSurface = ctx.executeGenerateWordRequest(
        poisonedPreteritAgentiveComplementRequest
    );
    const poisonedPreteritAgentiveComplementDisplayContract = {
        ...preteritAgentiveComplementContract,
        complementVerbInput: "-(poisoned/mati)",
        sourceFormulaEcho: "#Ø-Ø(poisoned)ki-Ø#",
    };
    const generatedPoisonedPreteritAgentiveComplementDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedPreteritAgentiveComplementDisplayContract.complementRequest.request
    );
    const missingPreteritAgentiveComplementOperationRequest = ctx.buildPreteritAgentiveComplementGenerationRequestFromOperationFrame(null);
    const invalidPreteritAgentiveComplementOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveComplementContract.complementRequest.request,
        options: {
            ...preteritAgentiveComplementContract.complementRequest.request.options,
            override: {
                ...preteritAgentiveComplementContract.complementRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-preterit-agentive-complement-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryPreteritAgentiveComplementOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveComplementContract.complementRequest.request,
        options: {
            ...preteritAgentiveComplementContract.complementRequest.request.options,
            override: {
                ...preteritAgentiveComplementContract.complementRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...preteritAgentiveComplementContract.complementOperationFrame,
                    targetFrame: {
                        ...preteritAgentiveComplementContract.complementOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    const originalPreteritAgentiveComplementBuilder = ctx.buildPreteritAgentiveComplementVerbInput;
    let generatedPoisonedPreteritAgentiveComplementBuilderSurface = null;
    try {
        ctx.buildPreteritAgentiveComplementVerbInput = () => "-(poisoned/mati)";
        generatedPoisonedPreteritAgentiveComplementBuilderSurface = ctx.executeGenerateWordRequest(
            preteritAgentiveComplementContract.complementRequest.request
        );
    } finally {
        ctx.buildPreteritAgentiveComplementVerbInput = originalPreteritAgentiveComplementBuilder;
    }
    s.eq(
        "Andrews 35.12 preterit-agentive general-use stem can feed incorporated-complement VNC matrices through typed frames",
        {
            supported: preteritAgentiveComplementContract.supported,
            preteritAgentiveStem: preteritAgentiveComplementContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveComplementContract.incorporatedRoot,
            matrixRoot: preteritAgentiveComplementContract.matrixRoot,
            objectPrefix: preteritAgentiveComplementContract.objectPrefix,
            complementVerbInput: preteritAgentiveComplementContract.complementVerbInput,
            operationFrameKind: preteritAgentiveComplementContract.complementOperationFrame.kind,
            displayInputIsAuthority: preteritAgentiveComplementContract.complementOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: preteritAgentiveComplementContract.complementOperationFrame.targetFrame.stem,
            requestStem: preteritAgentiveComplementContract.complementRequest.request.posicionesFormula.tronco,
            requestObjectPrefix: preteritAgentiveComplementContract.complementRequest.request.posicionesFormula.obj1,
            result: generatedPreteritAgentiveComplementSurface.result,
            poisonedResult: generatedPoisonedPreteritAgentiveComplementSurface.result,
            poisonedDisplayInputResult: generatedPoisonedPreteritAgentiveComplementDisplaySurface.result,
            poisonedLegacyBuilderResult: generatedPoisonedPreteritAgentiveComplementBuilderSurface.result,
            missingOperationSupported: missingPreteritAgentiveComplementOperationRequest.supported,
            missingOperationDiagnostic: missingPreteritAgentiveComplementOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidPreteritAgentiveComplementOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryPreteritAgentiveComplementOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            matrixRoot: "mati",
            objectPrefix: "ki",
            complementVerbInput: "-(tamatka/mati)",
            operationFrameKind: "andrews-preterit-agentive-complement-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "tamatkamati",
            requestStem: "tamatkamati",
            requestObjectPrefix: "ki",
            result: "kitamatkamati",
            poisonedResult: "kitamatkamati",
            poisonedDisplayInputResult: "kitamatkamati",
            poisonedLegacyBuilderResult: "kitamatkamati",
            missingOperationSupported: false,
            missingOperationDiagnostic: "preterit-agentive-complement-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const preteritAgentiveComplementTaliaContract = ctx.buildPreteritAgentiveComplementContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "talia",
    });
    const generatedPreteritAgentiveComplementTaliaSurface = ctx.executeGenerateWordRequest(
        preteritAgentiveComplementTaliaContract.complementRequest.request
    );
    s.eq(
        "Andrews 35.12 incorporated-complement continuation can use talia as a Nawat matrix",
        {
            supported: preteritAgentiveComplementTaliaContract.supported,
            complementVerbInput: preteritAgentiveComplementTaliaContract.complementVerbInput,
            targetStem: preteritAgentiveComplementTaliaContract.complementOperationFrame.targetFrame.stem,
            requestStem: preteritAgentiveComplementTaliaContract.complementRequest.request.posicionesFormula.tronco,
            result: generatedPreteritAgentiveComplementTaliaSurface.result,
        },
        {
            supported: true,
            complementVerbInput: "-(tamatka/talia)",
            targetStem: "tamatkatalia",
            requestStem: "tamatkatalia",
            result: "kitamatkatalia",
        }
    );
    const unsupportedPreteritAgentiveComplementContract = ctx.buildPreteritAgentiveComplementContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 35.12 preterit-agentive complement rejects non-complement matrices",
        {
            supported: unsupportedPreteritAgentiveComplementContract.supported,
            complementVerbInput: unsupportedPreteritAgentiveComplementContract.complementVerbInput,
            diagnostics: unsupportedPreteritAgentiveComplementContract.diagnostics,
        },
        {
            supported: false,
            complementVerbInput: "",
            diagnostics: [
                "preterit-agentive-complement-unsupported-matrix",
                "preterit-agentive-complement-missing-verb-input",
            ],
        }
    );
    const preteritAgentiveAdverbialInventory = ctx.getPreteritAgentiveAdverbialMatrixInventory();
    s.eq(
        "Andrews 35.12 preterit-agentive adverbial-manner matrix inventory is Nawat data-backed",
        preteritAgentiveAdverbialInventory.map((entry) => ({
            id: entry.id,
            nawatRoot: entry.nawatRoot,
            matrixValency: entry.matrixValency,
            adverbialFocus: entry.adverbialFocus,
            grammarSource: entry.grammarSource,
            status: entry.status,
        })),
        [
            {
                id: "nemi-adverbial-manner",
                nawatRoot: "nemi",
                matrixValency: "intransitive",
                adverbialFocus: "subject",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-orthography-bridge-data-backed",
            },
        ]
    );
    const preteritAgentiveAdverbialContract = ctx.buildPreteritAgentiveAdverbialContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "nemi",
    });
    const generatedPreteritAgentiveAdverbialSurface = ctx.executeGenerateWordRequest(
        preteritAgentiveAdverbialContract.adverbialRequest.request
    );
    const poisonedPreteritAgentiveAdverbialRequest = {
        ...preteritAgentiveAdverbialContract.adverbialRequest.request,
        posicionesFormula: {
            ...preteritAgentiveAdverbialContract.adverbialRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedPreteritAgentiveAdverbialSurface = ctx.executeGenerateWordRequest(
        poisonedPreteritAgentiveAdverbialRequest
    );
    const poisonedPreteritAgentiveAdverbialDisplayContract = {
        ...preteritAgentiveAdverbialContract,
        adverbialVerbInput: "(poisoned/nemi)",
        sourceFormulaEcho: "#Ø-Ø(poisoned)ki-Ø#",
    };
    const generatedPoisonedPreteritAgentiveAdverbialDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedPreteritAgentiveAdverbialDisplayContract.adverbialRequest.request
    );
    const missingPreteritAgentiveAdverbialOperationRequest = ctx.buildPreteritAgentiveAdverbialGenerationRequestFromOperationFrame(null);
    const invalidPreteritAgentiveAdverbialOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveAdverbialContract.adverbialRequest.request,
        options: {
            ...preteritAgentiveAdverbialContract.adverbialRequest.request.options,
            override: {
                ...preteritAgentiveAdverbialContract.adverbialRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-preterit-agentive-adverbial-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryPreteritAgentiveAdverbialOperationSurface = ctx.executeGenerateWordRequest({
        ...preteritAgentiveAdverbialContract.adverbialRequest.request,
        options: {
            ...preteritAgentiveAdverbialContract.adverbialRequest.request.options,
            override: {
                ...preteritAgentiveAdverbialContract.adverbialRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...preteritAgentiveAdverbialContract.adverbialOperationFrame,
                    targetFrame: {
                        ...preteritAgentiveAdverbialContract.adverbialOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    const originalPreteritAgentiveAdverbialBuilder = ctx.buildPreteritAgentiveAdverbialVerbInput;
    let generatedPoisonedPreteritAgentiveAdverbialBuilderSurface = null;
    try {
        ctx.buildPreteritAgentiveAdverbialVerbInput = () => "(poisoned/nemi)";
        generatedPoisonedPreteritAgentiveAdverbialBuilderSurface = ctx.executeGenerateWordRequest(
            preteritAgentiveAdverbialContract.adverbialRequest.request
        );
    } finally {
        ctx.buildPreteritAgentiveAdverbialVerbInput = originalPreteritAgentiveAdverbialBuilder;
    }
    s.eq(
        "Andrews 35.12 preterit-agentive general-use stem can feed an adverbial-manner VNC matrix through typed frames",
        {
            supported: preteritAgentiveAdverbialContract.supported,
            preteritAgentiveStem: preteritAgentiveAdverbialContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveAdverbialContract.incorporatedRoot,
            matrixRoot: preteritAgentiveAdverbialContract.matrixRoot,
            adverbialFocus: preteritAgentiveAdverbialContract.adverbialFocus,
            objectPrefix: preteritAgentiveAdverbialContract.objectPrefix,
            adverbialVerbInput: preteritAgentiveAdverbialContract.adverbialVerbInput,
            operationFrameKind: preteritAgentiveAdverbialContract.adverbialOperationFrame.kind,
            displayInputIsAuthority: preteritAgentiveAdverbialContract.adverbialOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: preteritAgentiveAdverbialContract.adverbialOperationFrame.targetFrame.stem,
            requestStem: preteritAgentiveAdverbialContract.adverbialRequest.request.posicionesFormula.tronco,
            requestObjectPrefix: preteritAgentiveAdverbialContract.adverbialRequest.request.posicionesFormula.obj1,
            result: generatedPreteritAgentiveAdverbialSurface.result,
            poisonedResult: generatedPoisonedPreteritAgentiveAdverbialSurface.result,
            poisonedDisplayInputResult: generatedPoisonedPreteritAgentiveAdverbialDisplaySurface.result,
            poisonedLegacyBuilderResult: generatedPoisonedPreteritAgentiveAdverbialBuilderSurface.result,
            missingOperationSupported: missingPreteritAgentiveAdverbialOperationRequest.supported,
            missingOperationDiagnostic: missingPreteritAgentiveAdverbialOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidPreteritAgentiveAdverbialOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryPreteritAgentiveAdverbialOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            matrixRoot: "nemi",
            adverbialFocus: "subject",
            objectPrefix: "",
            adverbialVerbInput: "(tamatka/nemi)",
            operationFrameKind: "andrews-preterit-agentive-adverbial-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "tamatkanemi",
            requestStem: "tamatkanemi",
            requestObjectPrefix: "",
            result: "tamatkanemi",
            poisonedResult: "tamatkanemi",
            poisonedDisplayInputResult: "tamatkanemi",
            poisonedLegacyBuilderResult: "tamatkanemi",
            missingOperationSupported: false,
            missingOperationDiagnostic: "preterit-agentive-adverbial-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const unsupportedPreteritAgentiveAdverbialContract = ctx.buildPreteritAgentiveAdverbialContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 35.12 preterit-agentive adverbial rejects non-adverbial matrices",
        {
            supported: unsupportedPreteritAgentiveAdverbialContract.supported,
            adverbialVerbInput: unsupportedPreteritAgentiveAdverbialContract.adverbialVerbInput,
            diagnostics: unsupportedPreteritAgentiveAdverbialContract.diagnostics,
        },
        {
            supported: false,
            adverbialVerbInput: "",
            diagnostics: [
                "preterit-agentive-adverbial-unsupported-matrix",
                "preterit-agentive-adverbial-missing-verb-input",
            ],
        }
    );
    const ordinaryNounOwnerhoodInventory = ctx.getOrdinaryNounOwnerhoodMatrixInventory();
    s.eq(
        "Andrews 35.9-35.10 ordinary noun ownerhood matrices keep class compatibility explicit",
        ordinaryNounOwnerhoodInventory.map((entry) => ({
            id: entry.id,
            nawatRoot: entry.nawatRoot,
            surfaceMatrix: entry.surfaceMatrix,
            ownerhoodKind: entry.ownerhoodKind,
            defaultForNounClasses: entry.defaultForNounClasses,
        })),
        [
            {
                id: "tla-e-ownerhood",
                nawatRoot: "e",
                surfaceMatrix: "ej",
                ownerhoodKind: "ownerhood",
                defaultForNounClasses: ["t"],
            },
            {
                id: "tla-hua-ownerhood",
                nawatRoot: "wa",
                surfaceMatrix: "waj",
                ownerhoodKind: "ownerhood",
                defaultForNounClasses: ["in", "zero"],
            },
            {
                id: "tla-yo-a-abundant-ownerhood",
                nawatRoot: "yua",
                surfaceMatrix: "yuj",
                ownerhoodKind: "abundant-ownerhood",
                defaultForNounClasses: ["t", "ti", "in", "zero"],
            },
        ]
    );
    const ordinaryTClassOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "shuchi",
        nounClass: "t",
        sourceSurface: "shuchit",
        sourceKind: "fixture",
    });
    const generatedOrdinaryTClassOwnerhoodSurface = ctx.executeGenerateWordRequest(
        ordinaryTClassOwnerhoodContract.ownerhoodRequest.request
    );
    const poisonedOrdinaryTClassOwnerhoodRequest = {
        ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request,
        posicionesFormula: {
            ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedOrdinaryTClassOwnerhoodSurface = ctx.executeGenerateWordRequest(
        poisonedOrdinaryTClassOwnerhoodRequest
    );
    const poisonedOrdinaryTClassDisplayContract = {
        ...ordinaryTClassOwnerhoodContract,
        ownerhoodVerbInput: "(poisoned)-(e)",
        sourceFormulaEcho: "#Ø-Ø(poisoned)t#",
    };
    const generatedPoisonedOrdinaryTClassDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedOrdinaryTClassDisplayContract.ownerhoodRequest.request
    );
    const missingOrdinaryOwnerhoodOperationRequest = ctx.buildOrdinaryNounOwnerhoodGenerationRequestFromOperationFrame(null);
    const invalidOrdinaryOwnerhoodOperationSurface = ctx.executeGenerateWordRequest({
        ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request,
        options: {
            ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.options,
            override: {
                ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-ordinary-noun-ownerhood-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryOrdinaryOwnerhoodOperationSurface = ctx.executeGenerateWordRequest({
        ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request,
        options: {
            ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.options,
            override: {
                ...ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...ordinaryTClassOwnerhoodContract.ownerhoodOperationFrame,
                    targetFrame: {
                        ...ordinaryTClassOwnerhoodContract.ownerhoodOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    const originalOrdinaryOwnerhoodBuilder = ctx.buildOrdinaryNounOwnerhoodVerbInput;
    let generatedPoisonedOrdinaryOwnerhoodBuilderSurface = null;
    try {
        ctx.buildOrdinaryNounOwnerhoodVerbInput = () => "(poisoned)-(e)";
        generatedPoisonedOrdinaryOwnerhoodBuilderSurface = ctx.executeGenerateWordRequest(
            ordinaryTClassOwnerhoodContract.ownerhoodRequest.request
        );
    } finally {
        ctx.buildOrdinaryNounOwnerhoodVerbInput = originalOrdinaryOwnerhoodBuilder;
    }
    s.eq(
        "Andrews 35.9 ordinary t-class nouns feed the e/ej ownerhood matrix through typed frames",
        {
            supported: ordinaryTClassOwnerhoodContract.supported,
            evidenceStatus: ordinaryTClassOwnerhoodContract.evidenceStatus,
            nounStem: ordinaryTClassOwnerhoodContract.nounStem,
            nounClass: ordinaryTClassOwnerhoodContract.nounClass,
            matrixRoot: ordinaryTClassOwnerhoodContract.matrixRoot,
            surfaceMatrix: ordinaryTClassOwnerhoodContract.surfaceMatrix,
            ownerhoodVerbInput: ordinaryTClassOwnerhoodContract.ownerhoodVerbInput,
            operationFrameKind: ordinaryTClassOwnerhoodContract.ownerhoodOperationFrame.kind,
            displayInputIsAuthority: ordinaryTClassOwnerhoodContract.ownerhoodOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: ordinaryTClassOwnerhoodContract.ownerhoodOperationFrame.targetFrame.stem,
            requestStem: ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.posicionesFormula.tronco,
            parsedFrameSourceRawVerb: ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.options.override.parsedVerb.sourceRawVerb,
            parsedFrameSourcePrefix: ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.options.override.parsedVerb.sourcePrefix,
            parsedFrameSourceBase: ordinaryTClassOwnerhoodContract.ownerhoodRequest.request.options.override.parsedVerb.sourceBase,
            result: generatedOrdinaryTClassOwnerhoodSurface.result,
            poisonedResult: generatedPoisonedOrdinaryTClassOwnerhoodSurface.result,
            poisonedDisplayInputResult: generatedPoisonedOrdinaryTClassDisplaySurface.result,
            poisonedLegacyBuilderResult: generatedPoisonedOrdinaryOwnerhoodBuilderSurface.result,
            missingOperationSupported: missingOrdinaryOwnerhoodOperationRequest.supported,
            missingOperationDiagnostic: missingOrdinaryOwnerhoodOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidOrdinaryOwnerhoodOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryOrdinaryOwnerhoodOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            evidenceStatus: "source-fixture-backed",
            nounStem: "shuchi",
            nounClass: "t",
            matrixRoot: "e",
            surfaceMatrix: "ej",
            ownerhoodVerbInput: "(shuchi)-(e)",
            operationFrameKind: "andrews-ordinary-noun-ownerhood-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "shuchie",
            requestStem: "shuchie",
            parsedFrameSourceRawVerb: "shuchie",
            parsedFrameSourcePrefix: "shuchi",
            parsedFrameSourceBase: "e",
            result: "shuchiejka",
            poisonedResult: "shuchiejka",
            poisonedDisplayInputResult: "shuchiejka",
            poisonedLegacyBuilderResult: "shuchiejka",
            missingOperationSupported: false,
            missingOperationDiagnostic: "ordinary-noun-ownerhood-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const ordinaryZeroClassFormulaSlots = {
        pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "" },
        predicateStem: { slot: "STEM", stem: "kal", displayStem: "kal" },
        num1Num2: { slot: "num1-num2", connector: "", displayConnector: "Ø" },
    };
    const ordinaryZeroClassFormulaEcho = "#Ø-Ø(kal)Ø#";
    const ordinaryZeroClassOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "kal",
        nounClass: "zero",
        sourceSurface: "kal",
        sourceKind: "fixture",
        sourceFormulaSlots: ordinaryZeroClassFormulaSlots,
        sourceFormulaEcho: ordinaryZeroClassFormulaEcho,
    });
    const generatedOrdinaryZeroClassOwnerhoodSurface = ctx.executeGenerateWordRequest(
        ordinaryZeroClassOwnerhoodContract.ownerhoodRequest.request
    );
    s.eq(
        "Andrews 35.9 ordinary zero-class nouns feed the wa/waj ownerhood matrix from #3 output",
        {
            supported: ordinaryZeroClassOwnerhoodContract.supported,
            nounStem: ordinaryZeroClassOwnerhoodContract.nounStem,
            nounClass: ordinaryZeroClassOwnerhoodContract.nounClass,
            matrixRoot: ordinaryZeroClassOwnerhoodContract.matrixRoot,
            surfaceMatrix: ordinaryZeroClassOwnerhoodContract.surfaceMatrix,
            sourceFormulaEcho: ordinaryZeroClassOwnerhoodContract.sourceFormulaEcho,
            frameFormulaEcho: ordinaryZeroClassOwnerhoodContract.grammarFrame?.morphBoundaryFrame?.formulaEcho || "",
            framePredicateStem: ordinaryZeroClassOwnerhoodContract.grammarFrame?.morphBoundaryFrame?.formulaSlots?.predicateStem?.stem || "",
            ownerhoodVerbInput: ordinaryZeroClassOwnerhoodContract.ownerhoodVerbInput,
            targetStem: ordinaryZeroClassOwnerhoodContract.ownerhoodOperationFrame.targetFrame.stem,
            requestStem: ordinaryZeroClassOwnerhoodContract.ownerhoodRequest.request.posicionesFormula.tronco,
            result: generatedOrdinaryZeroClassOwnerhoodSurface.result,
        },
        {
            supported: true,
            nounStem: "kal",
            nounClass: "zero",
            matrixRoot: "wa",
            surfaceMatrix: "waj",
            sourceFormulaEcho: ordinaryZeroClassFormulaEcho,
            frameFormulaEcho: ordinaryZeroClassFormulaEcho,
            framePredicateStem: "kal",
            ownerhoodVerbInput: "(kal)-(wa)",
            targetStem: "kalwa",
            requestStem: "kalwa",
            result: "kalwajka",
        }
    );
    const ordinaryAbundantOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "shuchi",
        nounClass: "t",
        sourceSurface: "shuchit",
        sourceKind: "fixture",
        ownerhoodKind: "abundant-ownerhood",
    });
    const generatedOrdinaryAbundantOwnerhoodSurface = ctx.executeGenerateWordRequest(
        ordinaryAbundantOwnerhoodContract.ownerhoodRequest.request
    );
    s.eq(
        "Andrews 35.10 ordinary nouns feed the yua/yuj abundant-ownerhood matrix from #3 output",
        {
            supported: ordinaryAbundantOwnerhoodContract.supported,
            matrixRoot: ordinaryAbundantOwnerhoodContract.matrixRoot,
            surfaceMatrix: ordinaryAbundantOwnerhoodContract.surfaceMatrix,
            ownerhoodKind: ordinaryAbundantOwnerhoodContract.ownerhoodKind,
            ownerhoodVerbInput: ordinaryAbundantOwnerhoodContract.ownerhoodVerbInput,
            targetStem: ordinaryAbundantOwnerhoodContract.ownerhoodOperationFrame.targetFrame.stem,
            requestStem: ordinaryAbundantOwnerhoodContract.ownerhoodRequest.request.posicionesFormula.tronco,
            result: generatedOrdinaryAbundantOwnerhoodSurface.result,
        },
        {
            supported: true,
            matrixRoot: "yua",
            surfaceMatrix: "yuj",
            ownerhoodKind: "abundant-ownerhood",
            ownerhoodVerbInput: "(shuchi)-(yua)",
            targetStem: "shuchiyua",
            requestStem: "shuchiyua",
            result: "shuchiyujka",
        }
    );
    const ambiguousTiOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "xilun",
        nounClass: "ti",
        sourceSurface: "xilunti",
        sourceKind: "open-stem",
    });
    const mismatchedZeroOwnerhoodInput = ctx.buildOrdinaryNounOwnerhoodVerbInput({
        nounStem: "kal",
        nounClass: "zero",
        matrixRoot: "e",
    });
    s.eq(
        "Andrews 35.9 ordinary ti-class ownerhood remains diagnostic without a confirmed subclass route",
        {
            supported: ambiguousTiOwnerhoodContract.supported,
            evidenceStatus: ambiguousTiOwnerhoodContract.evidenceStatus,
            ownerhoodVerbInput: ambiguousTiOwnerhoodContract.ownerhoodVerbInput,
            diagnostics: ambiguousTiOwnerhoodContract.diagnostics,
            mismatchedZeroOwnerhoodInput,
        },
        {
            supported: false,
            evidenceStatus: "structural-open-stem",
            ownerhoodVerbInput: "",
            diagnostics: [
                "ordinary-noun-ownerhood-ambiguous-ti-class",
                "ordinary-noun-ownerhood-unsupported-matrix",
                "ordinary-noun-ownerhood-missing-verb-input",
            ],
            mismatchedZeroOwnerhoodInput: "",
        }
    );
    const unsupportedActiveActionCompoundContract = ctx.buildActiveActionCompoundEmbedContinuationContract({
        actionNominalSurface: "chukilis",
        sourceSurface: "chuka",
        sourceContinuationFrame: activeActionSourceFrame,
        matrixRoot: "ni",
    });
    s.eq(
        "Andrews 37.5.4 active-action compound-embed contract rejects unsupported matrices",
        {
            supported: unsupportedActiveActionCompoundContract.supported,
            compoundVerbInput: unsupportedActiveActionCompoundContract.compoundVerbInput,
            diagnostics: unsupportedActiveActionCompoundContract.diagnostics,
        },
        {
            supported: false,
            compoundVerbInput: "",
            diagnostics: [
                "active-action-compound-embed-unsupported-matrix",
                "active-action-compound-embed-missing-verb-input",
                "active-action-compound-embed-missing-typed-target-frame",
            ],
        }
    );
    const characteristicMatrixInventory = ctx.getPatientivoCharacteristicPropertyMatrixInventory();
    s.eq(
        "Andrews 39.9 characteristic-property matrix inventory is data-backed",
        characteristicMatrixInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "chic-a-hu-a",
                classicalMatrix: "(chic-a-hu-a)",
                nawatRoot: "chikawa",
                status: "orthography-bridge-data-backed",
                matrixValency: "transitive",
            },
        ]
    );
    const characteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "mikkayut",
        sourceSurface: "mikkayut",
        matrixRoot: "chikawa",
    });
    const generatedCharacteristicSurface = ctx.executeGenerateWordRequest(characteristicContract.compoundRequest.request);
    const poisonedCharacteristicRequest = {
        ...characteristicContract.compoundRequest.request,
        posicionesFormula: {
            ...characteristicContract.compoundRequest.request.posicionesFormula,
            tronco: "poisonedstring",
        },
    };
    const generatedPoisonedCharacteristicSurface = ctx.executeGenerateWordRequest(poisonedCharacteristicRequest);
    const poisonedCharacteristicDisplayContract = {
        ...characteristicContract,
        compoundVerbInput: "-(poisoned/chikawa)",
    };
    const generatedPoisonedCharacteristicDisplaySurface = ctx.executeGenerateWordRequest(
        poisonedCharacteristicDisplayContract.compoundRequest.request
    );
    const missingCharacteristicOperationRequest = ctx.buildPatientivoCharacteristicPropertyEmbedGenerationRequestFromOperationFrame(null);
    const invalidCharacteristicOperationSurface = ctx.executeGenerateWordRequest({
        ...characteristicContract.compoundRequest.request,
        options: {
            ...characteristicContract.compoundRequest.request.options,
            override: {
                ...characteristicContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    kind: "andrews-patientivo-characteristic-property-embed-operation-frame",
                    targetFrame: { stem: "poisonedstring" },
                },
            },
        },
    });
    const contradictoryCharacteristicOperationSurface = ctx.executeGenerateWordRequest({
        ...characteristicContract.compoundRequest.request,
        options: {
            ...characteristicContract.compoundRequest.request.options,
            override: {
                ...characteristicContract.compoundRequest.request.options.override,
                typedCompoundOperationFrame: {
                    ...characteristicContract.compoundOperationFrame,
                    targetFrame: {
                        ...characteristicContract.compoundOperationFrame.targetFrame,
                        stem: "poisonedstring",
                    },
                },
            },
        },
    });
    s.eq(
        "Andrews 39.9 characteristic-property embed omits Nawat -yut before V matrix generation",
        {
            supported: characteristicContract.supported,
            sourceState: characteristicContract.sourceState,
            characteristicSurface: characteristicContract.characteristicSurface,
            omittedSuffix: characteristicContract.omittedSuffix,
            incorporatedRoot: characteristicContract.incorporatedRoot,
            compoundVerbInput: characteristicContract.compoundVerbInput,
            objectPrefix: characteristicContract.objectPrefix,
            operationFrameKind: characteristicContract.compoundOperationFrame.kind,
            displayInputIsAuthority: characteristicContract.compoundOperationFrame.operationFrame.displayInputIsNotAuthority === false,
            targetStem: characteristicContract.compoundOperationFrame.targetFrame.stem,
            requestStem: characteristicContract.compoundRequest.request.posicionesFormula.tronco,
            result: generatedCharacteristicSurface.result,
            poisonedResult: generatedPoisonedCharacteristicSurface.result,
            poisonedDisplayInputResult: generatedPoisonedCharacteristicDisplaySurface.result,
            missingOperationSupported: missingCharacteristicOperationRequest.supported,
            missingOperationDiagnostic: missingCharacteristicOperationRequest.diagnostics[0],
            invalidOperationDiagnostic: invalidCharacteristicOperationSurface.diagnostics[0].id,
            contradictoryOperationDiagnostic: contradictoryCharacteristicOperationSurface.diagnostics[0].id,
        },
        {
            supported: true,
            sourceState: "absolutive",
            characteristicSurface: "mikkayut",
            omittedSuffix: "yut",
            incorporatedRoot: "mikka",
            compoundVerbInput: "-(mikka/chikawa)",
            objectPrefix: "ki",
            operationFrameKind: "andrews-patientivo-characteristic-property-embed-operation-frame",
            displayInputIsAuthority: false,
            targetStem: "mikkachikawa",
            requestStem: "mikkachikawa",
            result: "kimikkachikawa",
            poisonedResult: "kimikkachikawa",
            poisonedDisplayInputResult: "kimikkachikawa",
            missingOperationSupported: false,
            missingOperationDiagnostic: "patientivo-characteristic-property-missing-typed-operation-frame",
            invalidOperationDiagnostic: "compound-continuation-missing-typed-operation-frame",
            contradictoryOperationDiagnostic: "compound-continuation-contradictory-typed-operation-frame",
        }
    );
    const possessedCharacteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "numikkayu",
        sourceSurface: "numikkayu",
        possessorPrefix: "nu",
        matrixRoot: "chikawa",
    });
    const generatedPossessedCharacteristicSurface = ctx.executeGenerateWordRequest(
        possessedCharacteristicContract.compoundRequest.request
    );
    s.eq(
        "Andrews 39.9 possessive characteristic-property embed omits Nawat -yu and promotes possessor",
        {
            supported: possessedCharacteristicContract.supported,
            sourceState: possessedCharacteristicContract.sourceState,
            sourceRole: possessedCharacteristicContract.sourceRole,
            possessorPrefix: possessedCharacteristicContract.possessorPrefix,
            omittedSuffix: possessedCharacteristicContract.omittedSuffix,
            incorporatedRoot: possessedCharacteristicContract.incorporatedRoot,
            compoundVerbInput: possessedCharacteristicContract.compoundVerbInput,
            objectPrefix: possessedCharacteristicContract.objectPrefix,
            result: generatedPossessedCharacteristicSurface.result,
        },
        {
            supported: true,
            sourceState: "possessive",
            sourceRole: "possessor",
            possessorPrefix: "nu",
            omittedSuffix: "yu",
            incorporatedRoot: "mikka",
            compoundVerbInput: "-(mikka/chikawa)",
            objectPrefix: "nech",
            result: "nechmikkachikawa",
        }
    );
    s.eq(
        "Andrews 39.9 characteristic-property contract exposes matrix-omission formation frame",
        {
            absolutive: {
                grammarSource: characteristicContract.formationFrame.grammarSource,
                sourceState: characteristicContract.formationFrame.sourceState,
                omittedClassicalMatrix: characteristicContract.formationFrame.omittedMatrix.classical,
                omittedNawatMatrix: characteristicContract.formationFrame.omittedMatrix.nawat,
                incorporatedRole: characteristicContract.formationFrame.incorporated.role,
                incorporatedRoot: characteristicContract.formationFrame.incorporated.root,
                outsideObjectOriginRole: characteristicContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: characteristicContract.formationFrame.outsideObject.prefix,
                doesNotPreserveYoMatrix: characteristicContract.formationFrame.valencePolicy.doesNotPreserveYoMatrix,
            },
            possessive: {
                grammarSource: possessedCharacteristicContract.formationFrame.grammarSource,
                sourceState: possessedCharacteristicContract.formationFrame.sourceState,
                omittedClassicalMatrix: possessedCharacteristicContract.formationFrame.omittedMatrix.classical,
                omittedNawatMatrix: possessedCharacteristicContract.formationFrame.omittedMatrix.nawat,
                incorporatedRole: possessedCharacteristicContract.formationFrame.incorporated.role,
                incorporatedRoot: possessedCharacteristicContract.formationFrame.incorporated.root,
                outsideObjectOriginRole: possessedCharacteristicContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: possessedCharacteristicContract.formationFrame.outsideObject.prefix,
                possessorBecomesOutsideObject: possessedCharacteristicContract.formationFrame.valencePolicy.possessorBecomesOutsideObject,
            },
        },
        {
            absolutive: {
                grammarSource: "Andrews 39.9",
                sourceState: "absolutive",
                omittedClassicalMatrix: "(-yo)-tl",
                omittedNawatMatrix: "yut",
                incorporatedRole: "incorporated-object",
                incorporatedRoot: "mikka",
                outsideObjectOriginRole: "matrix-default-object",
                outsideObjectPrefix: "ki",
                doesNotPreserveYoMatrix: true,
            },
            possessive: {
                grammarSource: "Andrews 39.9",
                sourceState: "possessive",
                omittedClassicalMatrix: "(-yo)-tl",
                omittedNawatMatrix: "yu",
                incorporatedRole: "incorporated-object",
                incorporatedRoot: "mikka",
                outsideObjectOriginRole: "possessor",
                outsideObjectPrefix: "nech",
                possessorBecomesOutsideObject: true,
            },
        }
    );
    s.eq(
        "Andrews incorporation route frames distinguish object, complement, and adverb roles behind a shared final formula shape",
        (() => {
            const routeFrames = [
                characteristicContract.incorporationRouteFrame,
                preteritAgentiveComplementContract.incorporationRouteFrame,
                preteritAgentiveAdverbialContract.incorporationRouteFrame,
            ];
            const unresolvedMatrixValenceRouteFrame = ctx.buildDerivationContinuationIncorporationRouteFrame({
                outputKind: "test-incorporated-object-continuation-contract",
                grammarSource: "Andrews test",
                supported: true,
                sourceSurface: "source-vnc",
                sourceFormulaSlots: {
                    obj1: { slot: "obj1", prefix: "ki" },
                    predicateStem: { slot: "STEM", stem: "source" },
                },
                incorporatedRoot: "kal",
                formationFrame: {
                    incorporated: {
                        role: "incorporated-object",
                        root: "kal",
                    },
                    matrix: {
                        root: "mati",
                    },
                },
            }, {
                outputKind: "test-incorporated-object-continuation-contract",
                supported: true,
                targetInput: "-(kal/mati)",
                routeStage: "preview-continuation",
                andrewsRefs: ["Andrews test"],
            });
            return {
                finalFormulaShapes: routeFrames.map((frame) => frame?.finalFormulaShape || ""),
                embedRoles: routeFrames.map((frame) => frame?.embedRole || ""),
                consumedObjectSlots: routeFrames.map((frame) => frame?.consumedObjectSlot || ""),
                matrixValences: routeFrames.map((frame) => frame?.matrixValence || ""),
                valenceDeltas: routeFrames.map((frame) => frame?.valenceDelta ?? null),
                stemInternalObjectSlotDeltas: routeFrames.map((frame) => frame?.valenceEffects?.stemInternalObjectSlotDelta ?? null),
                complementSlotDeltas: routeFrames.map((frame) => frame?.valenceEffects?.complementSlotDelta ?? null),
                adverbialFunctionDeltas: routeFrames.map((frame) => frame?.valenceEffects?.adverbialFunctionDelta ?? null),
                remainingExternalObjectSlots: routeFrames.map((frame) => (
                    Array.isArray(frame?.remainingExternalObjectSlots)
                        ? frame.remainingExternalObjectSlots.map((slot) => `${slot.slotId}:${slot.prefix}`)
                        : []
                )),
                ownershipSourceExternalObjectSlots: routeFrames.map((frame) => (
                    Array.isArray(frame?.objectSlotOwnership?.sourceExternalObjectSlots)
                        ? frame.objectSlotOwnership.sourceExternalObjectSlots.map((slot) => `${slot.slotId}:${slot.prefix}`)
                        : []
                )),
                ownershipRemainingExternalObjectSlots: routeFrames.map((frame) => (
                    Array.isArray(frame?.objectSlotOwnership?.remainingExternalObjectSlots)
                        ? frame.objectSlotOwnership.remainingExternalObjectSlots.map((slot) => `${slot.slotId}:${slot.prefix}`)
                        : []
                )),
                objectSlotOwnershipKinds: routeFrames.map((frame) => frame?.objectSlotOwnership?.kind || ""),
                consumedObjectSlotOwners: routeFrames.map((frame) => frame?.objectSlotOwnership?.consumedObjectSlotOwnedBy || ""),
                remainingObjectSlotOwners: routeFrames.map((frame) => frame?.objectSlotOwnership?.remainingExternalObjectSlotsOwnedBy || ""),
                embeddedRoleLicensers: routeFrames.map((frame) => frame?.objectSlotOwnership?.embeddedRoleLicensedBy || ""),
                matrixValenceFramesFixed: routeFrames.map((frame) => frame?.objectSlotOwnership?.matrixValenceFrameFixed === true),
                sourcePrincipalSurfaces: routeFrames.map((frame) => frame?.sourcePrincipalVnc?.surface || ""),
                sourceAdjunctKinds: routeFrames.map((frame) => frame?.sourceAdjunctNnc?.kind || ""),
                andrewsSections: routeFrames.map((frame) => frame?.andrewsSection || ""),
                generationStatuses: routeFrames.map((frame) => frame?.generationStatus || ""),
                topLevelRouteFrameKind: characteristicContract.routeFrame?.kind || "",
                contractCarriesFrame: characteristicContract.grammarFrame?.morphBoundaryFrame?.incorporationRouteFrame?.embedRole || "",
                grammarSourceRouteFrameKind: characteristicContract.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.kind || "",
                grammarTargetRouteFrameKind: characteristicContract.grammarFrame?.routeContract?.targetContract?.sourceRouteFrame?.kind || "",
                grammarStemRouteFrameKind: characteristicContract.grammarFrame?.stemFrame?.sourceRouteFrame?.kind || "",
                grammarMorphRouteFrameKind: characteristicContract.grammarFrame?.morphBoundaryFrame?.sourceRouteFrame?.kind || "",
                grammarParticipantRouteFrameKind: characteristicContract.grammarFrame?.participantFrame?.sourceRouteFrame?.kind || "",
                routeLicensesRole: routeFrames.every((frame) => frame?.routeFrameLicensesEmbedRole === true),
                finalShapeDoesNotLicenseRole: routeFrames.every((frame) => frame?.finalFormulaShapeDoesNotLicenseRole === true),
                functionUseDoesNotLicenseRole: routeFrames.every((frame) => frame?.functionUseDoesNotLicenseRole === true),
                routeLicensesObjectSlotOwnership: routeFrames.every((frame) => frame?.routeFrameLicensesObjectSlotOwnership === true),
                finalShapeDoesNotLicenseObjectSlots: routeFrames.every((frame) => frame?.finalFormulaShapeDoesNotLicenseObjectSlots === true),
                functionUseDoesNotLicenseObjectSlots: routeFrames.every((frame) => (
                    frame?.functionUseDoesNotLicenseObjectSlots === true
                    && frame?.objectSlotOwnership?.functionUseOwnsObjectSlots === false
                    && frame?.objectSlotOwnership?.finalFormulaShapeOwnsObjectSlots === false
                )),
                participantOwnershipFrameKind: characteristicContract.grammarFrame?.participantFrame?.objectSlotOwnership?.kind || "",
                unresolvedMatrixValenceRouteFrame: {
                    matrixValence: unresolvedMatrixValenceRouteFrame?.matrixValence || "",
                    matrixValenceFrameFixed: unresolvedMatrixValenceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
                    routeFrameOwnsObjectSlotLicensing: unresolvedMatrixValenceRouteFrame?.objectSlotOwnership?.routeFrameOwnsObjectSlotLicensing === true,
                    matrixValenceFrameMustBeFixed: unresolvedMatrixValenceRouteFrame?.objectSlotOwnership?.matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership === true,
                    routeLicensesObjectSlotOwnership: unresolvedMatrixValenceRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
                    finalShapeDoesNotLicenseObjectSlots: unresolvedMatrixValenceRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
                    functionUseDoesNotLicenseObjectSlots: unresolvedMatrixValenceRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
                },
            };
        })(),
        {
            finalFormulaShapes: [
                "compound-vnc-embed-before-matrix",
                "compound-vnc-embed-before-matrix",
                "compound-vnc-embed-before-matrix",
            ],
            embedRoles: [
                "incorporated-object",
                "incorporated-complement",
                "incorporated-adverb",
            ],
            consumedObjectSlots: ["obj1", "complement", ""],
            matrixValences: ["transitive", "transitive", "intransitive"],
            valenceDeltas: [1, 1, 0],
            stemInternalObjectSlotDeltas: [1, 0, 0],
            complementSlotDeltas: [0, 1, 0],
            adverbialFunctionDeltas: [0, 0, 1],
            remainingExternalObjectSlots: [
                ["obj1:ki"],
                ["obj1:ki"],
                [],
            ],
            ownershipSourceExternalObjectSlots: [
                [],
                [],
                [],
            ],
            ownershipRemainingExternalObjectSlots: [
                ["obj1:ki"],
                ["obj1:ki"],
                [],
            ],
            objectSlotOwnershipKinds: [
                "andrews-incorporation-object-slot-ownership-frame",
                "andrews-incorporation-object-slot-ownership-frame",
                "andrews-incorporation-object-slot-ownership-frame",
            ],
            consumedObjectSlotOwners: ["route-frame", "route-frame", "none"],
            remainingObjectSlotOwners: ["matrix-route-frame", "matrix-route-frame", "none"],
            embeddedRoleLicensers: [
                "andrews-incorporation-route-frame",
                "andrews-incorporation-route-frame",
                "andrews-incorporation-route-frame",
            ],
            matrixValenceFramesFixed: [true, true, true],
            sourcePrincipalSurfaces: ["mikkayut", "tamatki", "tamatki"],
            sourceAdjunctKinds: [
                "characteristic-property-nounstem",
                "preterit-agentive-nounstem",
                "preterit-agentive-nounstem",
            ],
            andrewsSections: ["Andrews 39.9", "Andrews 35.12", "Andrews 35.12"],
            generationStatuses: ["supported", "supported", "supported"],
            topLevelRouteFrameKind: "andrews-incorporation-route-frame",
            contractCarriesFrame: "incorporated-object",
            grammarSourceRouteFrameKind: "andrews-incorporation-route-frame",
            grammarTargetRouteFrameKind: "andrews-incorporation-route-frame",
            grammarStemRouteFrameKind: "andrews-incorporation-route-frame",
            grammarMorphRouteFrameKind: "andrews-incorporation-route-frame",
            grammarParticipantRouteFrameKind: "andrews-incorporation-route-frame",
            routeLicensesRole: true,
            finalShapeDoesNotLicenseRole: true,
            functionUseDoesNotLicenseRole: true,
            routeLicensesObjectSlotOwnership: true,
            finalShapeDoesNotLicenseObjectSlots: true,
            functionUseDoesNotLicenseObjectSlots: true,
            participantOwnershipFrameKind: "andrews-incorporation-object-slot-ownership-frame",
            unresolvedMatrixValenceRouteFrame: {
                matrixValence: "",
                matrixValenceFrameFixed: false,
                routeFrameOwnsObjectSlotLicensing: false,
                matrixValenceFrameMustBeFixed: true,
                routeLicensesObjectSlotOwnership: false,
                finalShapeDoesNotLicenseObjectSlots: true,
                functionUseDoesNotLicenseObjectSlots: true,
            },
        }
    );
    s.eq(
        "derivation route frame final shape comes from structured route fields instead of targetInput text",
        (() => {
            const structuredFrame = ctx.buildDerivationContinuationIncorporationRouteFrame({
                outputKind: "test-incorporated-object-continuation-contract",
                grammarSource: "Andrews test",
                supported: true,
                sourceSurface: "source-vnc",
                incorporatedRoot: "kal",
                matrix: {
                    root: "mati",
                    valency: "transitive",
                },
                formationFrame: {
                    incorporated: {
                        role: "incorporated-object",
                        root: "kal",
                    },
                    matrix: {
                        root: "mati",
                        valency: "transitive",
                    },
                },
            }, {
                outputKind: "test-incorporated-object-continuation-contract",
                supported: true,
                targetInput: "(lying-owner)-(shape)",
                routeStage: "preview-continuation",
                andrewsRefs: ["Andrews test"],
            });
            const stringOnlyFrame = ctx.buildDerivationContinuationIncorporationRouteFrame({
                outputKind: "test-string-only-continuation-contract",
                grammarSource: "Andrews test",
                supported: true,
                sourceSurface: "source-vnc",
            }, {
                outputKind: "test-string-only-continuation-contract",
                supported: true,
                targetInput: "-(fake/mati)",
                routeStage: "preview-continuation",
                andrewsRefs: ["Andrews test"],
            });
            return {
                structuredFinalShape: structuredFrame?.finalFormulaShape || "",
                structuredEmbedRole: structuredFrame?.embedRole || "",
                structuredMatrixRoot: structuredFrame?.matrix?.root || "",
                stringOnlyFrameBuilt: Boolean(stringOnlyFrame),
            };
        })(),
        {
            structuredFinalShape: "compound-vnc-embed-before-matrix",
            structuredEmbedRole: "incorporated-object",
            structuredMatrixRoot: "mati",
            stringOnlyFrameBuilt: false,
        }
    );
    const yulCharacteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "yulyut",
        sourceSurface: "yulyut",
        matrixRoot: "chikawa",
    });
    const generatedYulCharacteristicSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: yulCharacteristicContract.objectPrefix,
            tronco: yulCharacteristicContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.9 contraction reaches the repo-backed yulchikawa pattern",
        {
            incorporatedRoot: yulCharacteristicContract.incorporatedRoot,
            compoundVerbInput: yulCharacteristicContract.compoundVerbInput,
            result: generatedYulCharacteristicSurface.result,
        },
        {
            incorporatedRoot: "yul",
            compoundVerbInput: "-(yul/chikawa)",
            result: "kiyulchikawa",
        }
    );
    const unsupportedCharacteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "mikka",
        sourceSurface: "mikka",
        matrixRoot: "chikawa",
    });
    s.eq(
        "Andrews 39.9 characteristic-property contraction does not strip non-yut surfaces",
        {
            supported: unsupportedCharacteristicContract.supported,
            incorporatedRoot: unsupportedCharacteristicContract.incorporatedRoot,
            compoundVerbInput: unsupportedCharacteristicContract.compoundVerbInput,
            diagnostics: unsupportedCharacteristicContract.diagnostics,
        },
        {
            supported: false,
            incorporatedRoot: "",
            compoundVerbInput: "",
            diagnostics: ["patientivo-characteristic-property-missing-yut-suffix"],
        }
    );

    const possessivePrelocativeContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "mutamatit",
        possessorPrefix: "mu",
        patientivoSource: "imperfectivo",
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
    });
    s.eq(
        "Andrews 39.8 possessive patientive source promotes possessor into outside object",
        {
            supported: possessivePrelocativeContract.supported,
            sourceState: possessivePrelocativeContract.sourceState,
            sourceRole: possessivePrelocativeContract.objectTransfer.sourceRole,
            objectCase: possessivePrelocativeContract.objectTransfer.objectCase,
            objectLine: possessivePrelocativeContract.objectTransfer.objectLine,
            objectPrefix: possessivePrelocativeContract.objectTransfer.objectPrefix,
            prelocativeVerbInput: possessivePrelocativeContract.prelocativeVerbInput,
        },
        {
            supported: true,
            sourceState: "possessive",
            sourceRole: "possessor",
            objectCase: "objective",
            objectLine: "mainline",
            objectPrefix: "metz",
            prelocativeVerbInput: "-(tamati/tajtani)",
        }
    );
    const matrixInventory = ctx.getPatientivoPrelocativeMatrixInventory();
    s.eq(
        "Andrews 39.8 patientive prelocative matrix inventory is explicit",
        matrixInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            sourceStates: entry.sourceStates,
        })),
        [
            {
                id: "tla-itta",
                classicalMatrix: "te- ~ tla-(itta)",
                nawatRoot: "ita",
                status: "orthography-bridge-data-backed",
                sourceStates: ["absolutive"],
            },
            {
                id: "tla-mati",
                classicalMatrix: "te- ~ tla-(mati)",
                nawatRoot: "mati",
                status: "orthography-bridge-data-backed",
                sourceStates: ["absolutive"],
            },
            {
                id: "tla-nequi",
                classicalMatrix: "te- ~ tla-(nequi)",
                nawatRoot: "neki",
                status: "orthography-bridge-data-backed",
                sourceStates: ["absolutive"],
            },
            {
                id: "tla-toca",
                classicalMatrix: "te- ~ tla-(toca)",
                nawatRoot: "tuka",
                status: "orthography-bridge-data-backed",
                sourceStates: ["absolutive", "possessive"],
            },
            {
                id: "tla-tlani",
                classicalMatrix: "tla-(tlani)",
                nawatRoot: "tajtani",
                status: "orthography-bridge-data-backed",
                sourceStates: ["absolutive", "possessive"],
            },
            {
                id: "tla-ih-tlani",
                classicalMatrix: "tla-(ih-tlani)",
                nawatRoot: "tatajtania",
                status: "orthography-bridge-data-backed",
                sourceStates: ["possessive"],
            },
            {
                id: "tla-tem-o-a",
                classicalMatrix: "tla-(tem-o-a)",
                nawatRoot: "temua",
                status: "orthography-bridge-data-backed",
                sourceStates: ["possessive"],
            },
        ]
    );
    const unsupportedNiMatrixContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "tamati",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "ni",
    });
    s.eq(
        "Andrews 39.7-39.8 patientive continuation rejects the previous non-Andrews ni matrix",
        {
            supported: unsupportedNiMatrixContract.supported,
            matrixSupported: unsupportedNiMatrixContract.matrix.supported,
            prelocativeVerbInput: unsupportedNiMatrixContract.prelocativeVerbInput,
            diagnostics: unsupportedNiMatrixContract.diagnostics,
        },
        {
            supported: false,
            matrixSupported: false,
            prelocativeVerbInput: "",
            diagnostics: [
                "patientivo-prelocative-unsupported-matrix",
                "patientivo-prelocative-missing-verb-input",
            ],
        }
    );
    s.eq(
        "Andrews 39.7 absolutive source can generate repo-backed incorporated-complement matrices",
        ["ita", "mati", "neki", "tuka"].map((matrixRoot) => {
            const contract = ctx.buildPatientivoPrelocativeContinuationContract({
                patientivoSurface: "tamatit",
                sourceSurface: "tamati",
                selection: {
                    subjectPrefix: "ni",
                    subjectSuffix: "",
                },
                patientivoSource: "imperfectivo",
                sourceTenseValue: "imperfecto",
                sourceCombinedMode: ctx.COMBINED_MODE.active,
                patientivoNominalSuffix: "t",
                matrixRoot,
            });
            const generated = ctx.executeGenerateWordRequest(contract.prelocativeRequest.request);
            return {
                matrixRoot,
                supported: contract.supported,
                prelocativeVerbInput: contract.prelocativeVerbInput,
                result: generated.result,
            };
        }),
        [
            {
                matrixRoot: "ita",
                supported: true,
                prelocativeVerbInput: "-(tamati/ita)",
                result: "nechtamatiita",
            },
            {
                matrixRoot: "mati",
                supported: true,
                prelocativeVerbInput: "-(tamati/mati)",
                result: "nechtamatimati",
            },
            {
                matrixRoot: "neki",
                supported: true,
                prelocativeVerbInput: "-(tamati/neki)",
                result: "nechtamatineki",
            },
            {
                matrixRoot: "tuka",
                supported: true,
                prelocativeVerbInput: "-(tamati/tuka)",
                result: "nechtamatituka",
            },
        ]
    );
    const perfectivePatientivoComplementContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "taketzti",
        sourceSurface: "taketz",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "perfectivo",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "ti",
        matrixRoot: "tajtani",
    });
    const generatedPerfectivePatientivoComplement = ctx.executeGenerateWordRequest(
        perfectivePatientivoComplementContract.prelocativeRequest.request
    );
    s.eq(
        "Andrews 39.7 incorporated-complement contract accepts perfective patientive nounstems",
        {
            supported: perfectivePatientivoComplementContract.supported,
            patientivoSource: perfectivePatientivoComplementContract.patientivoSource,
            incorporatedRoot: perfectivePatientivoComplementContract.incorporatedRoot,
            prelocativeVerbInput: perfectivePatientivoComplementContract.prelocativeVerbInput,
            result: generatedPerfectivePatientivoComplement.result,
        },
        {
            supported: true,
            patientivoSource: "perfectivo",
            incorporatedRoot: "taketz",
            prelocativeVerbInput: "-(taketz/tajtani)",
            result: "nechtaketztajtani",
        }
    );
    const nonactivePatientivoComplementContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "machti",
        sourceSurface: "machti",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "nonactive",
        sourceTenseValue: "presente",
        sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
        patientivoNominalSuffix: "ti",
        matrixRoot: "tajtani",
    });
    const generatedNonactivePatientivoComplement = ctx.executeGenerateWordRequest(
        nonactivePatientivoComplementContract.prelocativeRequest.request
    );
    s.eq(
        "Andrews 39.7 incorporated-complement contract accepts nonactive patientive nounstems",
        {
            supported: nonactivePatientivoComplementContract.supported,
            patientivoSource: nonactivePatientivoComplementContract.patientivoSource,
            sourceCombinedMode: nonactivePatientivoComplementContract.sourceCombinedMode,
            incorporatedRoot: nonactivePatientivoComplementContract.incorporatedRoot,
            prelocativeVerbInput: nonactivePatientivoComplementContract.prelocativeVerbInput,
            result: generatedNonactivePatientivoComplement.result,
        },
        {
            supported: true,
            patientivoSource: "nonactive",
            sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
            incorporatedRoot: "mach",
            prelocativeVerbInput: "-(mach/tajtani)",
            result: "nechmachtajtani",
        }
    );
    const possessiveMatiContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "mutamatit",
        possessorPrefix: "mu",
        patientivoSource: "imperfectivo",
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "mati",
    });
    s.eq(
        "Andrews 39.7 possessive source blocks absolutive-only incorporated-complement matrices",
        {
            supported: possessiveMatiContract.supported,
            prelocativeVerbInput: possessiveMatiContract.prelocativeVerbInput,
            diagnostics: possessiveMatiContract.diagnostics,
        },
        {
            supported: false,
            prelocativeVerbInput: "",
            diagnostics: ["patientivo-prelocative-matrix-source-state-unsupported"],
        }
    );
    s.eq(
        "Andrews 39.7-39.8 possessive source generates source-compatible continuation matrices",
        ["tuka", "tajtani", "tatajtania", "temua"].map((matrixRoot) => {
            const contract = ctx.buildPatientivoPrelocativeContinuationContract({
                patientivoSurface: "tamatit",
                sourceSurface: "mutamatit",
                possessorPrefix: "mu",
                patientivoSource: "imperfectivo",
                sourceTenseValue: "pasado-remoto",
                sourceCombinedMode: ctx.COMBINED_MODE.active,
                patientivoNominalSuffix: "t",
                matrixRoot,
            });
            const generated = ctx.executeGenerateWordRequest(contract.prelocativeRequest.request);
            return {
                matrixRoot,
                supported: contract.supported,
                prelocativeVerbInput: contract.prelocativeVerbInput,
                result: generated.result,
            };
        }),
        [
            {
                matrixRoot: "tuka",
                supported: true,
                prelocativeVerbInput: "-(tamati/tuka)",
                result: "metztamatituka",
            },
            {
                matrixRoot: "tajtani",
                supported: true,
                prelocativeVerbInput: "-(tamati/tajtani)",
                result: "metztamatitajtani",
            },
            {
                matrixRoot: "tatajtania",
                supported: true,
                prelocativeVerbInput: "-(tamati/tatajtania)",
                result: "metztamatitatajtania",
            },
            {
                matrixRoot: "temua",
                supported: true,
                prelocativeVerbInput: "-(tamati/temua)",
                result: "metztamatitemua",
            },
        ]
    );
    const absolutiveTlaniContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "tamati",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "tajtani",
    });
    const absolutiveSeekMatrixContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "tamati",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "temua",
    });
    s.eq(
        "Andrews 39.7 absolutive source only allows source-compatible matrix roots",
        {
            tlaniSupported: absolutiveTlaniContract.supported,
            tlaniInput: absolutiveTlaniContract.prelocativeVerbInput,
            seekSupported: absolutiveSeekMatrixContract.supported,
            seekCompatible: absolutiveSeekMatrixContract.matrixSourceCompatible,
            seekInput: absolutiveSeekMatrixContract.prelocativeVerbInput,
            seekDiagnostics: absolutiveSeekMatrixContract.diagnostics,
        },
        {
            tlaniSupported: true,
            tlaniInput: "-(tamati/tajtani)",
            seekSupported: false,
            seekCompatible: false,
            seekInput: "",
            seekDiagnostics: ["patientivo-prelocative-matrix-source-state-unsupported"],
        }
    );
    const seekMatrixContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        sourceSurface: "mutamatit",
        possessorPrefix: "mu",
        patientivoSource: "imperfectivo",
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "temua",
    });
    const generatedSeekMatrixSurface = ctx.executeGenerateWordRequest(
        seekMatrixContract.prelocativeRequest.request
    );
    s.eq(
        "Andrews 39.8 seek matrix builds actual prelocative V output",
        {
            supported: seekMatrixContract.supported,
            matrixId: seekMatrixContract.matrix.id,
            prelocativeVerbInput: seekMatrixContract.prelocativeVerbInput,
            result: generatedSeekMatrixSurface.result,
        },
        {
            supported: true,
            matrixId: "tla-tem-o-a",
            prelocativeVerbInput: "-(tamati/temua)",
            result: "metztamatitemua",
        }
    );
    s.eq(
        "Andrews 39.7-39.8 prelocative contract exposes incorporated-role and valence policy",
        {
            absolutive: {
                grammarSource: absolutiveTlaniContract.formationFrame.grammarSource,
                sourceState: absolutiveTlaniContract.formationFrame.sourceState,
                incorporatedRole: absolutiveTlaniContract.formationFrame.incorporated.role,
                outsideObjectOriginRole: absolutiveTlaniContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: absolutiveTlaniContract.formationFrame.outsideObject.prefix,
                absolutiveSubjectBecomesObject: absolutiveTlaniContract.formationFrame.valencePolicy.absolutiveSubjectBecomesObject,
                preservesSourceValence: absolutiveTlaniContract.formationFrame.valencePolicy.preservesSourceValence,
            },
            possessive: {
                grammarSource: seekMatrixContract.formationFrame.grammarSource,
                sourceState: seekMatrixContract.formationFrame.sourceState,
                incorporatedRole: seekMatrixContract.formationFrame.incorporated.role,
                outsideObjectOriginRole: seekMatrixContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: seekMatrixContract.formationFrame.outsideObject.prefix,
                possessorBecomesObjectWithoutApplicativeSuffix: seekMatrixContract.formationFrame.valencePolicy.possessorBecomesObjectWithoutApplicativeSuffix,
                preservesSourceValence: seekMatrixContract.formationFrame.valencePolicy.preservesSourceValence,
            },
        },
        {
            absolutive: {
                grammarSource: "Andrews 39.7",
                sourceState: "absolutive",
                incorporatedRole: "object-complement",
                outsideObjectOriginRole: "subject",
                outsideObjectPrefix: "nech",
                absolutiveSubjectBecomesObject: true,
                preservesSourceValence: false,
            },
            possessive: {
                grammarSource: "Andrews 39.8",
                sourceState: "possessive",
                incorporatedRole: "incorporated-object",
                outsideObjectOriginRole: "possessor",
                outsideObjectPrefix: "metz",
                possessorBecomesObjectWithoutApplicativeSuffix: true,
                preservesSourceValence: true,
            },
        }
    );
    const unsupportedPrelocativeContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatit",
        possessorPrefix: "bad",
        patientivoSource: "perfectivo",
        sourceTenseValue: "perfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "tajtan",
    });
    s.eq(
        "patientive prelocative contract diagnoses unsupported source, matrix, and unmapped possessor",
        {
            supported: unsupportedPrelocativeContract.supported,
            diagnostics: unsupportedPrelocativeContract.diagnostics,
            frameFailedLayers: unsupportedPrelocativeContract.grammarFrame?.diagnosticFrame?.diagnostics.map((entry) => entry.failedLayer) || [],
            frameContractLayers: unsupportedPrelocativeContract.grammarFrame?.diagnosticFrame?.diagnostics.map((entry) => entry.contractLayer) || [],
        },
        {
            supported: false,
            diagnostics: [
                "patientivo-prelocative-unmapped-possessor",
                "patientivo-prelocative-unsupported-matrix",
                "patientivo-prelocative-missing-verb-input",
            ],
            frameFailedLayers: ["agreement", "route", "output"],
            frameContractLayers: ["participantFrame", "routeContract", "resultFrame"],
        }
    );

    const causativeConfig = ctx.getForwardDerivationConfig("causative");
    s.eq("forward config: causative result field", causativeConfig.resultField, "causativeAllStems");
    s.eq("forward config: causative result spec field", causativeConfig.resultSpecField, "causativeAllStemSpecs");

    const selectedForward = ctx.applySelectedForwardDerivation({
        derivationType: "causative",
        derivationOptions: {
            verb: "nemi",
            analysisVerb: "nemi",
            isYawi: false,
            suppletiveStemSet: null,
        },
        enabled: false,
    });
    s.eq("forward derivation disabled keeps verb", selectedForward.verb, "nemi");
    s.eq("forward derivation disabled keeps analysis verb", selectedForward.analysisVerb, "nemi");

    s.eq(
        "stem pool prefers forward specs when present",
        ctx.resolveStemCollectionPool({
            resolvedDerivationType: "causative",
            causativeAllStems: ["nemitia"],
            causativeAllStemSpecs: [ctx.buildLiteralMorphStemSpec("nemitia")],
        }).length,
        1
    );

    s.eq(
        "primary nonactive selection stem falls back to first selected stem",
        ctx.getPrimaryNonactiveSelectionStem({
            selectedStems: ["nemu", "nemilu"],
        }),
        "nemu"
    );
    s.eq(
        "primary nonactive selection stem spec falls back to literal spec",
        ctx.realizeMorphStemSpec(
            ctx.getPrimaryNonactiveSelectionStemSpec({
                selectedStems: ["nemu"],
            }),
            ""
        ),
        "nemu"
    );

    const prefixedSelection = ctx.buildPrefixedNonactiveSelectionEntry({
        selection: {
            selectedStem: "nemu",
            selectedStemSpec: ctx.buildLiteralMorphStemSpec("nemu"),
            selectedStemSpecs: [ctx.buildLiteralMorphStemSpec("nemu")],
            allStemSpecs: [ctx.buildLiteralMorphStemSpec("nemu"), ctx.buildLiteralMorphStemSpec("nemilu")],
            selectedSuffix: "u",
        },
        prefix: "ki",
        directionalPrefix: "",
        nonactiveObjectSlots: 0,
    });
    s.eq("prefixed nonactive entry realizes selected stem", prefixedSelection.selectedStem, "kinemu");
    s.eq("prefixed nonactive entry realizes all stems", prefixedSelection.allStems[1], "kinemilu");

    const nonactiveFallback = ctx.applyNonactiveDerivation({
        isNonactive: false,
        verb: "nemi",
        analysisVerb: "nemi",
        objectPrefix: "",
        parsedVerb: ctx.parseVerbInput("(nemi)"),
        directionalPrefix: "",
        derivationType: "",
        causativeAllStems: null,
        applicativeAllStems: null,
        isYawi: false,
        suppletiveStemSet: null,
    });
    s.eq("nonactive derivation passthrough keeps verb", nonactiveFallback.verb, "nemi");
    s.eq("nonactive derivation passthrough keeps null override keys", nonactiveFallback.nonactiveObjectPrefixOverride, null);

    const transitiveMatiNonactiveOptions = ctx.getVisibleNonactiveDerivationOptions("mati", "mati", {
        isTransitive: true,
        ruleBase: "mati",
    });
    const transitiveMatiUStems = transitiveMatiNonactiveOptions
        .filter((entry) => entry.suffix === "u")
        .map((entry) => entry.stem);
    s.ok("transitive mati plain u route replaces final i with u", transitiveMatiUStems.includes("matu"));
    s.no("transitive mati plain u route does not append u after final i", transitiveMatiUStems.includes("matiu"));
    s.no(
        "transitive mati does not expose intransitive-only uwa",
        transitiveMatiNonactiveOptions.some((entry) => entry.suffix === "uwa")
    );

    const transitivePetawaNonactiveOptions = ctx.getVisibleNonactiveDerivationOptions("petawa", "petawa", {
        isTransitive: true,
        ruleBase: "petawa",
    });
    s.no(
        "transitive wa-final stems do not expose intransitive-only uwa",
        transitivePetawaNonactiveOptions.some((entry) => entry.suffix === "uwa")
    );

    const lesson20Nonactive = ctx.buildLesson20NonactivePursuitFrame();
    s.eq(
        "Lesson 20 nonactive pursuit frame covers Andrews suffix families as Nawat realization",
        {
            stepNumber: lesson20Nonactive.stepNumber,
            aimStatus: lesson20Nonactive.aimStatus,
            pdfRefs: lesson20Nonactive.pdfRefs,
            subsectionSections: lesson20Nonactive.subsectionInventory.map((entry) => entry.andrewsSection),
            suffixBridge: lesson20Nonactive.suffixBridge.map((entry) => [entry.andrews, entry.nawat]),
            source: lesson20Nonactive.overviewFrame.derivationSource,
            closestPass: lesson20Nonactive.closestPass,
            generationAllowed: lesson20Nonactive.generationAllowed,
            remainingGapCount: lesson20Nonactive.remainingGaps.length,
        },
        {
            stepNumber: 20,
            aimStatus: "closest-pass",
            pdfRefs: [
                "Andrews Lesson 20.1",
                "Andrews Lesson 20.2",
                "Andrews Lesson 20.3",
                "Andrews Lesson 20.4",
                "Andrews Lesson 20.5",
                "Andrews Lesson 20.6",
                "Andrews Lesson 20.7",
                "Andrews Lesson 20.8",
            ],
            subsectionSections: ["20.1", "20.2", "20.3", "20.4", "20.5", "20.6", "20.7", "20.8"],
            suffixBridge: [["o", "u"], ["lo", "lu"], ["hua", "wa"], ["o-hua", "uwa"], ["lo-hua", "luwa"], ["hua-lo", "walu"]],
            source: "imperfective active stem",
            closestPass: true,
            generationAllowed: true,
            remainingGapCount: 0,
        }
    );
    s.eq(
        "Lesson 20 nonactive pursuit frame records Andrews route boundaries",
        {
            luSource: lesson20Nonactive.luFrame.mainSource,
            uBaseIsReplacive: lesson20Nonactive.uFrame.baseIsReplaciveImperfective,
            uwaMainSource: lesson20Nonactive.uwaFrame.mainSource,
            waMainlyIntransitive: lesson20Nonactive.waWaluFrame.wa.mainlyIntransitive,
            waluFreeVariant: lesson20Nonactive.waWaluFrame.walu.freeVariantOfWa,
            classMembership: lesson20Nonactive.classMembershipFrame.classMembership,
            noClassicalSurfaceImport: lesson20Nonactive.currentEngineBoundary.noClassicalSurfaceImport,
        },
        {
            luSource: "transitive verbstems ending in a",
            uBaseIsReplacive: true,
            uwaMainSource: "active intransitive source",
            waMainlyIntransitive: true,
            waluFreeVariant: true,
            classMembership: "Class A-2",
            noClassicalSurfaceImport: true,
        }
    );
    s.eq(
        "Lesson 20 nonactive pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson20Nonactive.grammarFrame),
            routeFamily: lesson20Nonactive.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson20Nonactive.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson20Nonactive.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson20Nonactive.ok,
            classMembership: lesson20Nonactive.grammarFrame?.nuclearClauseFrame?.classMembership || "",
            suffixBridge: lesson20Nonactive.grammarFrame?.orthographyFrame?.suffixBridge?.map((entry) => entry.nawat) || [],
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson20Nonactive, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-20",
            generationAllowed: false,
            ok: true,
            classMembership: "Class A-2",
            suffixBridge: ["u", "lu", "wa", "uwa", "luwa", "walu"],
            enumerableGrammarFrame: false,
        }
    );
    const lesson24Causative = ctx.buildLesson24FirstTypeCausativePursuitFrame();
    s.eq(
        "Lesson 24 first-type causative pursuit frame keeps Andrews coverage partial",
        {
            stepNumber: lesson24Causative.stepNumber,
            aimStatus: lesson24Causative.aimStatus,
            pdfRefs: lesson24Causative.pdfRefs,
            categories: lesson24Causative.subsectionInventory.map((entry) => entry.category),
            finalVowelPredictable: lesson24Causative.finalVowelValenceFrame.valencePredictableFromFinalVowel,
            valenceNeutralViolatesPrinciple: lesson24Causative.valenceNeutralFrame.violatesValencePrinciple,
            causativeMorpheme: lesson24Causative.typeOneCausativeFrame.causativeMorpheme,
            iFinalProcedures: lesson24Causative.typeOneCausativeFrame.iFinalProcedures.map((entry) => entry.id),
            aFinalProcedures: lesson24Causative.typeOneCausativeFrame.aFinalProcedures.map((entry) => entry.id),
            destockalProcess: lesson24Causative.destockalArchitectureFrame.process,
            destockalTypes: lesson24Causative.destockalArchitectureFrame.destockalTypes,
            niHuiClassPolicy: lesson24Causative.destockalNiHuiFrame.derivedClassPolicy,
            huaAlwaysReplacement: lesson24Causative.destockalHuaFrame.causativeAlwaysReplacement,
            ihuiOperation: lesson24Causative.destockalIhuiAhuiFrame.causativeOperation,
            sourceSubjectTransform: lesson24Causative.causativeVncGenerationFrame.sourceSubjectBecomesCausativeObject,
            causativeAControls: lesson24Causative.causativeAControlFrame.causativeAControls,
            engineHasForwardFrame: lesson24Causative.currentEngineBoundary.forwardDerivationFrameImplemented,
            closestPass: lesson24Causative.closestPass,
            remainingGapCount: lesson24Causative.remainingGaps.length,
        },
        {
            stepNumber: 24,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 24.1",
                "Andrews Lesson 24.2",
                "Andrews Lesson 24.3",
                "Andrews Lesson 24.4",
                "Andrews Lesson 24.5",
                "Andrews Lesson 24.6",
                "Andrews Lesson 24.7",
                "Andrews Lesson 24.8",
                "Andrews Lesson 24.9",
            ],
            categories: [
                "final-vowel-valence-boundary",
                "valence-neutral-verbstems",
                "type-one-causative-a",
                "destockal-stock-architecture",
                "destockal-ni-hui",
                "destockal-hua",
                "destockal-ihui-ahui",
                "causative-vnc-generation",
                "causative-a-control",
            ],
            finalVowelPredictable: false,
            valenceNeutralViolatesPrinciple: true,
            causativeMorpheme: { andrews: "a", nawat: "a" },
            iFinalProcedures: ["i-final-replacement", "i-final-addition"],
            aFinalProcedures: ["a-final-non-ya-replacement", "ya-final-replacement"],
            destockalProcess: [
                "root-plus-stock-formative-creates-stock",
                "stock-plus-stem-formative-creates-intransitive-verbstem",
                "type-one-causative-creates-transitive-mate",
            ],
            destockalTypes: ["ni-or-hui", "hua", "i-hui-or-a-hui"],
            niHuiClassPolicy: {
                "n-a": "Class B",
                "hu-a": "Class B",
                "ni-a": "Class C",
                "hui-a": "Class C",
            },
            huaAlwaysReplacement: true,
            ihuiOperation: "replace i-hui or a-hui with o-a",
            sourceSubjectTransform: true,
            causativeAControls: ["source subject", "source core"],
            engineHasForwardFrame: true,
            closestPass: false,
            remainingGapCount: 5,
        }
    );
    s.eq(
        "Lesson 24 first-type causative pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson24Causative.grammarFrame),
            routeFamily: lesson24Causative.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson24Causative.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson24Causative.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson24Causative.ok,
            sourceClauseKind: lesson24Causative.grammarFrame?.nuclearClauseFrame?.sourceClauseKind || "",
            targetClauseKind: lesson24Causative.grammarFrame?.nuclearClauseFrame?.targetClauseKind || "",
            sourceSubjectBecomesObject: lesson24Causative.grammarFrame?.participantFrame?.sourceSubjectBecomesCausativeObject,
            destockalBridge: lesson24Causative.grammarFrame?.orthographyFrame?.destockalBridge || null,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson24Causative, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-24",
            generationAllowed: false,
            ok: true,
            sourceClauseKind: "intransitive VNC",
            targetClauseKind: "single-object causative VNC",
            sourceSubjectBecomesObject: true,
            destockalBridge: {
                "hui": "wi",
                "hua": "wa",
                "o-a": "u-a",
            },
            enumerableGrammarFrame: false,
        }
    );
    const lesson25Causative = ctx.buildLesson25SecondTypeCausativePursuitFrame();
    s.eq(
        "Lesson 25 second-type causative pursuit frame keeps Andrews coverage partial",
        {
            stepNumber: lesson25Causative.stepNumber,
            aimStatus: lesson25Causative.aimStatus,
            pdfRefs: lesson25Causative.pdfRefs,
            subsectionCount: lesson25Causative.subsectionInventory.length,
            categories: lesson25Causative.subsectionInventory.map((entry) => entry.category),
            suffixalUnits: lesson25Causative.overviewFrame.suffixalUnits,
            coreCausativeCluster: lesson25Causative.overviewFrame.coreCausativeCluster,
            tiaComposition: lesson25Causative.overviewFrame.tiaComposition,
            derivesObjectCounts: lesson25Causative.overviewFrame.derivesObjectCounts,
            nonactiveSourceFamilies: lesson25Causative.overviewFrame.nonactiveSourceFamilies,
            huaOperation: lesson25Causative.sourceFormationFrame.huaSource.operation,
            oOHuaOperation: lesson25Causative.sourceFormationFrame.oOHuaSource.operation,
            loOperation: lesson25Causative.sourceFormationFrame.loSource.operation,
            loClassRoute: lesson25Causative.sourceFormationFrame.loSource.classCDUseThisProcedure,
            liaAmbiguous: lesson25Causative.sourceFormationFrame.liaSource.phonologicallyIdenticalToApplicativeLia,
            huiaAmbiguous: lesson25Causative.sourceFormationFrame.huiaSource.phonologicallyIdenticalToApplicativeHuia,
            classMembership: lesson25Causative.classAndParallelFrame.classMembership,
            typeOneAndTypeTwoSameSourceAllowed: lesson25Causative.classAndParallelFrame.typeOneAndTypeTwoSameSourceAllowed,
            transformOperations: lesson25Causative.causativeTransformationFrame.operations,
            causativeObjectIsObjectInFormSubjectInFunction: lesson25Causative.causativeTransformationFrame.causativeObjectIsObjectInFormSubjectInFunction,
            singleObjectSource: lesson25Causative.objectTransformFrame.singleObject.source,
            doubleObjectSources: lesson25Causative.objectTransformFrame.doubleObject.sources,
            tripleMainline: lesson25Causative.objectTransformFrame.tripleObject.mainline,
            objectFormsAmbiguous: lesson25Causative.boundaryFrame.ambiguity.objectFormsDoNotDiscriminateFunction,
            sentenceMoods: lesson25Causative.boundaryFrame.sentenceMoods,
            passiveImpersonalAllowed: lesson25Causative.boundaryFrame.passiveImpersonalTransformsAllowed,
            silentObjectCanBeSupplemented: lesson25Causative.boundaryFrame.silentObjectPronounCanBeSupplemented,
            doubleTripleObjectRoutingIncomplete: lesson25Causative.currentEngineBoundary.doubleTripleObjectRoutingIncomplete,
            closestPass: lesson25Causative.closestPass,
            remainingGapCount: lesson25Causative.remainingGaps.length,
        },
        {
            stepNumber: 25,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 25.1",
                "Andrews Lesson 25.2",
                "Andrews Lesson 25.3",
                "Andrews Lesson 25.4",
                "Andrews Lesson 25.5",
                "Andrews Lesson 25.6",
                "Andrews Lesson 25.7",
                "Andrews Lesson 25.8",
                "Andrews Lesson 25.9",
                "Andrews Lesson 25.10",
                "Andrews Lesson 25.11",
                "Andrews Lesson 25.12",
                "Andrews Lesson 25.13",
                "Andrews Lesson 25.14",
                "Andrews Lesson 25.15",
                "Andrews Lesson 25.16",
            ],
            subsectionCount: 16,
            categories: [
                "type-two-causative-overview",
                "hua-nonactive-source",
                "o-ohua-nonactive-source",
                "lo-nonactive-source",
                "lia-causative",
                "huia-causative",
                "type-two-class-c",
                "type-one-type-two-parallel",
                "causative-transformation",
                "single-object-causative-vnc",
                "double-object-causative-vnc",
                "triple-object-causative-vnc",
                "causative-transform-ambiguity",
                "causative-sentence-moods",
                "causative-passive-impersonal",
                "silent-object-supplementation",
            ],
            suffixalUnits: ["tia", "lia", "huia"],
            coreCausativeCluster: "tia",
            tiaComposition: ["semantically empty ti", "causative a from Lesson 24"],
            derivesObjectCounts: ["single-object", "double-object", "triple-object"],
            nonactiveSourceFamilies: ["hua", "o", "o-hua", "lo"],
            huaOperation: "tia replaces hua",
            oOHuaOperation: "tia replaces o or o-hua",
            loOperation: "tia replaces the o of lo, leaving l before tia",
            loClassRoute: true,
            liaAmbiguous: true,
            huiaAmbiguous: true,
            classMembership: "Class C",
            typeOneAndTypeTwoSameSourceAllowed: true,
            transformOperations: [
                "compact-source-vnc-into-causative-predicate",
                "replace-source-stem-with-causative-stem",
                "change-source-subject-pronoun-into-causative-object",
                "import-new-causative-subject-from-outside-source",
            ],
            causativeObjectIsObjectInFormSubjectInFunction: true,
            singleObjectSource: "active or impersonal intransitive VNC",
            doubleObjectSources: ["active single-object transitive VNC", "passive intransitive VNC", "single-object impersonal VNC"],
            tripleMainline: "causative object",
            objectFormsAmbiguous: true,
            sentenceMoods: ["wish", "command/exhortation", "admonition"],
            passiveImpersonalAllowed: true,
            silentObjectCanBeSupplemented: true,
            doubleTripleObjectRoutingIncomplete: true,
            closestPass: false,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 25 second-type causative pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson25Causative.grammarFrame),
            routeFamily: lesson25Causative.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson25Causative.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson25Causative.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson25Causative.ok,
            stemKind: lesson25Causative.grammarFrame?.stemFrame?.stemKind || "",
            classMembership: lesson25Causative.grammarFrame?.stemFrame?.classMembership || "",
            sourceSubjectBecomesObject: lesson25Causative.grammarFrame?.participantFrame?.sourceSubjectBecomesCausativeObject,
            maxObjectDepth: lesson25Causative.grammarFrame?.nuclearClauseFrame?.maxObjectDepth,
            suffixalUnits: lesson25Causative.grammarFrame?.orthographyFrame?.suffixalUnits || [],
            wiaBridge: lesson25Causative.grammarFrame?.orthographyFrame?.classicalToNawatHints?.huia || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson25Causative, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-25",
            generationAllowed: false,
            ok: true,
            stemKind: "second-type-causative-verbstem",
            classMembership: "Class C",
            sourceSubjectBecomesObject: true,
            maxObjectDepth: 3,
            suffixalUnits: ["tia", "lia", "huia"],
            wiaBridge: "wia",
            enumerableGrammarFrame: false,
        }
    );
    const lesson26Applicative = ctx.buildLesson26ApplicativePursuitFrame();
    s.eq(
        "Lesson 26 applicative pursuit frame keeps Andrews coverage partial",
        {
            stepNumber: lesson26Applicative.stepNumber,
            aimStatus: lesson26Applicative.aimStatus,
            pdfRefCount: lesson26Applicative.pdfRefs.length,
            firstPdfRef: lesson26Applicative.pdfRefs[0],
            lastPdfRef: lesson26Applicative.pdfRefs[lesson26Applicative.pdfRefs.length - 1],
            subsectionCount: lesson26Applicative.subsectionInventory.length,
            categories: lesson26Applicative.subsectionInventory.map((entry) => entry.category),
            mainlineConstituents: lesson26Applicative.natureFrame.mainlineConstituents,
            irregularBoundaries: lesson26Applicative.natureFrame.irregularBoundaries,
            typeOneSuffix: lesson26Applicative.formationFrame.typeOne.suffixalUnit,
            typeOneOperation: lesson26Applicative.formationFrame.typeOne.operation,
            typeTwoSuffixes: lesson26Applicative.formationFrame.typeTwo.suffixalUnits,
            sourceReflexiveBecomesNe: lesson26Applicative.formationFrame.typeTwo.sourceReflexiveBecomesShuntlineNe,
            classMembership: lesson26Applicative.formationFrame.classMembership,
            finalIChanges: {
                siToXi: lesson26Applicative.sourceShapeFrame.finalI.siToXi,
                postvocalicTiToChi: lesson26Applicative.sourceShapeFrame.finalI.postvocalicTiToChiPossible,
            },
            finalConsonantAChanges: {
                saToXilia: lesson26Applicative.sourceShapeFrame.finalAAfterConsonant.saToXilia,
                tlaOrTzaToChilia: lesson26Applicative.sourceShapeFrame.finalAAfterConsonant.tlaOrTzaToChilia,
                occasionalTlaToTilia: lesson26Applicative.sourceShapeFrame.finalAAfterConsonant.occasionalTlaToTilia,
            },
            huiaGeneralUnit: lesson26Applicative.huiaTiaFrame.oaSources.generalSuffixalUnit,
            rareTiaNotCausative: lesson26Applicative.huiaTiaFrame.rareTiaApplicative.notCausative,
            transformOperations: lesson26Applicative.transformationFrame.operations,
            mainlineObject: lesson26Applicative.transformationFrame.mainlineObject,
            singleTarget: lesson26Applicative.objectDepthFrame.singleObject.target,
            doubleTarget: lesson26Applicative.objectDepthFrame.doubleObject.target,
            tripleOvertCounts: lesson26Applicative.objectDepthFrame.tripleObject.overtObjectCountsAllowed,
            ambiguityRequiresAppendixC: lesson26Applicative.boundaryFrame.ambiguity.appendixCRequired,
            sentenceMoods: lesson26Applicative.boundaryFrame.sentenceMoods,
            passiveImpersonalAllowed: lesson26Applicative.boundaryFrame.passiveImpersonalTransformsAllowed,
            objectPlusSuffixUnit: lesson26Applicative.boundaryFrame.applicativeUnitControl.discontinuousObjectPlusSuffixUnit,
            generationImplemented: lesson26Applicative.currentEngineBoundary.applicativeGenerationImplemented,
            closestPass: lesson26Applicative.closestPass,
            remainingGapCount: lesson26Applicative.remainingGaps.length,
        },
        {
            stepNumber: 26,
            aimStatus: "shooting",
            pdfRefCount: 23,
            firstPdfRef: "Andrews Lesson 26.1",
            lastPdfRef: "Andrews Lesson 26.23",
            subsectionCount: 23,
            categories: [
                "applicative-object-role",
                "type-one-applicative-ia",
                "type-two-applicative-lia-huia",
                "final-i-source",
                "final-a-source-frame",
                "final-ia-source",
                "final-consonant-a-source",
                "applicative-source-exceptions",
                "oa-huia-source",
                "long-o-huia-source",
                "rare-tia-applicative",
                "type-one-type-two-parallel",
                "applicative-class-c",
                "applicative-transformation",
                "single-object-applicative-vnc",
                "double-object-applicative-vnc",
                "triple-object-applicative-vnc",
                "applicative-transform-ambiguity",
                "applicative-sentence-moods",
                "applicative-passive-impersonal",
                "human-nonhuman-object-translation",
                "deceptive-applicative-vnc",
                "object-plus-suffix-unit",
            ],
            mainlineConstituents: ["applicative suffix", "obligatorily concomitant applicative object pronoun"],
            irregularBoundaries: [
                "inherently applicative double-object maca without applicative suffix",
                "itta from defective itzi with unusual sound shift and applicative a",
                "valence-neutral pairs with applicative-like transitive member",
            ],
            typeOneSuffix: "ia",
            typeOneOperation: "add ia to a replacive imperfective stem lacking the final source vowel",
            typeTwoSuffixes: ["lia", "huia"],
            sourceReflexiveBecomesNe: true,
            classMembership: "Class C",
            finalIChanges: {
                siToXi: true,
                postvocalicTiToChi: true,
            },
            finalConsonantAChanges: {
                saToXilia: true,
                tlaOrTzaToChilia: true,
                occasionalTlaToTilia: true,
            },
            huiaGeneralUnit: "huia",
            rareTiaNotCausative: true,
            transformOperations: [
                "replace-source-stem-with-applicative-stem",
                "import-applicative-object-pronoun-from-outside-source-vnc",
                "make-last-added-applicative-object-the-mainline-object",
                "demote-source-objects-to-shuntline-levels",
            ],
            mainlineObject: "applicative object",
            singleTarget: "single-object applicative VNC",
            doubleTarget: "double-object applicative VNC",
            tripleOvertCounts: [3, 2, 1],
            ambiguityRequiresAppendixC: true,
            sentenceMoods: ["wish", "command/exhortation", "admonition"],
            passiveImpersonalAllowed: true,
            objectPlusSuffixUnit: true,
            generationImplemented: true,
            closestPass: false,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 26 applicative pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson26Applicative.grammarFrame),
            routeFamily: lesson26Applicative.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson26Applicative.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson26Applicative.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson26Applicative.ok,
            unitKind: lesson26Applicative.grammarFrame?.unitFrame?.unitKind || "",
            stemKind: lesson26Applicative.grammarFrame?.stemFrame?.stemKind || "",
            classMembership: lesson26Applicative.grammarFrame?.stemFrame?.classMembership || "",
            applicativeObjectIsMainline: lesson26Applicative.grammarFrame?.participantFrame?.applicativeObjectIsMainline,
            sourceObjectsBecomeShuntline: lesson26Applicative.grammarFrame?.participantFrame?.sourceObjectsBecomeShuntline,
            maxObjectDepth: lesson26Applicative.grammarFrame?.nuclearClauseFrame?.maxObjectDepth,
            suffixalUnits: lesson26Applicative.grammarFrame?.orthographyFrame?.suffixalUnits || [],
            wiaBridge: lesson26Applicative.grammarFrame?.orthographyFrame?.classicalToNawatHints?.huia || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson26Applicative, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-26",
            generationAllowed: false,
            ok: true,
            unitKind: "applicative-verbstem",
            stemKind: "applicative-verbstem",
            classMembership: "Class C",
            applicativeObjectIsMainline: true,
            sourceObjectsBecomeShuntline: true,
            maxObjectDepth: 3,
            suffixalUnits: ["ia", "lia", "huia", "tia"],
            wiaBridge: "wia",
            enumerableGrammarFrame: false,
        }
    );

    const getFramedPatientivoFromNonactive = (stem, suffix, options = {}) => {
        const sourceFrame = ctx.buildPatientivoNonactiveStemSourceFrame({
            stem,
            suffix,
            isTransitive: options.isTransitive === true,
            baseInfo: options.baseInfo || null,
            stemSpec: options.stemSpec || null,
        });
        const operationFrame = ctx.buildPatientivoNonactiveStemOperationFrame(sourceFrame);
        return ctx.getPatientivoStemFromNonactive(stem, suffix, {
            ...options,
            patientivoNonactiveSourceFrame: sourceFrame,
            patientivoNonactiveOperationFrame: operationFrame,
        });
    };
    s.eq(
        "patientivo nonactive source realization consumes typed operation frames",
        (() => {
            const sourceFrame = ctx.buildPatientivoNonactiveStemSourceFrame({
                stem: "matu",
                suffix: "u",
                isTransitive: true,
            });
            const operationFrame = ctx.buildPatientivoNonactiveStemOperationFrame(sourceFrame);
            const changedRequest = ctx.getPatientivoStemFromNonactive("poison", "u", {
                isTransitive: true,
                patientivoNonactiveSourceFrame: sourceFrame,
                patientivoNonactiveOperationFrame: operationFrame,
            });
            const missingOperation = ctx.getPatientivoStemFromNonactive("matu", "u", {
                isTransitive: true,
                patientivoNonactiveSourceFrame: sourceFrame,
            });
            const contradictorySource = ctx.getPatientivoStemFromNonactive("matu", "u", {
                isTransitive: true,
                patientivoNonactiveSourceFrame: {
                    ...sourceFrame,
                    sourceSignature: "poison",
                },
                patientivoNonactiveOperationFrame: operationFrame,
            });
            const contradictoryTarget = ctx.getPatientivoStemFromNonactive("matu", "u", {
                isTransitive: true,
                patientivoNonactiveSourceFrame: sourceFrame,
                patientivoNonactiveOperationFrame: {
                    ...operationFrame,
                    targetEntries: operationFrame.targetEntries.map((entry, index) => (
                        index === 0 ? { ...entry, stem: "poison" } : entry
                    )),
                },
            });
            return {
                helperTypes: [
                    typeof ctx.buildPatientivoNonactiveStemSourceFrame,
                    typeof ctx.buildPatientivoNonactiveStemOperationFrame,
                    typeof ctx.getPatientivoNonactiveStemFrameMismatch,
                ],
                operationId: operationFrame.operationId,
                framed: ctx.getPatientivoStemFromNonactive("matu", "u", {
                    isTransitive: true,
                    patientivoNonactiveSourceFrame: sourceFrame,
                    patientivoNonactiveOperationFrame: operationFrame,
                }).map((entry) => `${entry.stem}:${entry.suffix}`),
                directString: ctx.getPatientivoStemFromNonactive("matu", "u", {
                    isTransitive: true,
                }),
                changedRequest,
                missingOperation,
                contradictorySource,
                contradictoryTarget,
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            operationId: "andrews-patientivo-nonactive-stem-realization",
            framed: ["mat:ti", "mati:t"],
            directString: [],
            changedRequest: [],
            missingOperation: [],
            contradictorySource: [],
            contradictoryTarget: [],
        }
    );
    const patientivoFromUwa = getFramedPatientivoFromNonactive("kelunuwa", "uwa", {
        isTransitive: false,
        baseInfo: { lastOnset: "n" },
    });
    const patientivoTVariant = patientivoFromUwa.find((entry) => entry.suffix === "t");
    s.ok("patientivo from -uwa exposes base+i+t variant", patientivoTVariant && patientivoTVariant.stem === "keluni");
    s.ok(
        "patientivo from -uwa marks base+i+t variant as no absolutive zero class",
        patientivoTVariant && patientivoTVariant.blocksAbsolutiveZeroNominalMarker === true
    );
    s.eq(
        "Andrews nonactive o-hua patientivo variant is locked to its tli-class connector",
        patientivoTVariant && patientivoTVariant.allowedSuffixes,
        ["t"]
    );

    const patientivoFromPassiveMatu = getFramedPatientivoFromNonactive("matu", "u", {
        isTransitive: true,
    });
    const patientivoConsonantFinalTiVariant = patientivoFromPassiveMatu.find((entry) => entry.suffix === "ti");
    const patientivoVowelFinalTVariant = patientivoFromPassiveMatu.find((entry) => entry.suffix === "t");
    s.eq(
        "Andrews nonactive o patientivo consonant-final variant is locked to ti",
        patientivoConsonantFinalTiVariant && patientivoConsonantFinalTiVariant.allowedSuffixes,
        ["ti"]
    );
    s.ok(
        "patientivo from passive matu uses mati+t without extra supportive i",
        patientivoVowelFinalTVariant && patientivoVowelFinalTVariant.stem === "mati"
    );
    s.no(
        "patientivo supportive i does not create ii before t",
        patientivoFromPassiveMatu.some((entry) => entry.stem === "matii")
    );

    const patientivoTEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "nonactive",
        stemSpec: patientivoTVariant.stemSpec,
        fallbackStem: patientivoTVariant.stem,
        subjectSuffix: patientivoTVariant.suffix,
        metadata: {
            blocksAbsolutiveZeroNominalMarker: patientivoTVariant.blocksAbsolutiveZeroNominalMarker === true,
        },
    });
    const expandedPatientivoTEntry = ctx.expandPatientivoNominalMarkerOptions([patientivoTEntry], "nonactive");
    const expandedPatientivoTSuffixes = expandedPatientivoTEntry.map((entry) => entry.subjectSuffix);
    s.no(
        "patientivo from -uwa base+i+t forbids absolutive zero nominal marker",
        expandedPatientivoTSuffixes.includes("")
    );
    s.ok(
        "patientivo from -uwa base+i+t keeps t-class absolutive marker",
        expandedPatientivoTSuffixes.includes("t")
    );
    const patientivoLuEntry = getFramedPatientivoFromNonactive("pululu", "lu", {
        isTransitive: false,
    })[0];
    s.eq(
        "Andrews nonactive lo patientivo deletes final u and produces tli-class Nawat connector",
        {
            stem: patientivoLuEntry && patientivoLuEntry.stem,
            suffix: patientivoLuEntry && patientivoLuEntry.suffix,
            allowedSuffixes: patientivoLuEntry && patientivoLuEntry.allowedSuffixes,
            blocksZero: patientivoLuEntry && patientivoLuEntry.blocksAbsolutiveZeroNominalMarker,
        },
        {
            stem: "pulul",
            suffix: "ti",
            allowedSuffixes: ["ti"],
            blocksZero: true,
        }
    );
    const patientivoLuExpanded = ctx.expandPatientivoNominalMarkerOptions([
        ctx.buildPatientivoDerivationEntry({
            sourceType: "nonactive",
            stemSpec: patientivoLuEntry.stemSpec,
            fallbackStem: patientivoLuEntry.stem,
            subjectSuffix: patientivoLuEntry.suffix,
            metadata: patientivoLuEntry,
        }),
    ], "nonactive").map((entry) => `${entry.verb}${entry.subjectSuffix}`);
    s.eq(
        "Andrews nonactive lo patientivo does not expand to zero or in outputs",
        patientivoLuExpanded,
        ["pululti"]
    );

    const patientivoFromWa = getFramedPatientivoFromNonactive("temiwa", "wa", {
        isTransitive: false,
    });
    const patientivoWaTVariant = patientivoFromWa.find((entry) => entry.suffix === "t");
    s.ok("patientivo from -wa exposes t-class variant", patientivoWaTVariant && patientivoWaTVariant.stem === "temi");
    s.ok(
        "patientivo from -wa marks t-class variant as no absolutive zero class",
        patientivoWaTVariant && patientivoWaTVariant.blocksAbsolutiveZeroNominalMarker === true
    );
    const patientivoWaEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "nonactive",
        stemSpec: patientivoWaTVariant.stemSpec,
        fallbackStem: patientivoWaTVariant.stem,
        subjectSuffix: patientivoWaTVariant.suffix,
        metadata: {
            blocksAbsolutiveZeroNominalMarker: patientivoWaTVariant.blocksAbsolutiveZeroNominalMarker === true,
        },
    });
    const expandedPatientivoWaEntry = ctx.expandPatientivoNominalMarkerOptions([patientivoWaEntry], "nonactive");
    const expandedPatientivoWaSuffixes = expandedPatientivoWaEntry.map((entry) => entry.subjectSuffix);
    s.no(
        "patientivo from -wa t-class forbids absolutive zero nominal marker",
        expandedPatientivoWaSuffixes.includes("")
    );
    s.ok(
        "patientivo from -wa t-class keeps t marker",
        expandedPatientivoWaSuffixes.includes("t")
    );
    const nonactiveTClassSuffixes = ctx.resolveDefaultPatientivoAllowedSuffixes({
        sourceType: "nonactive",
        stem: "temi",
        defaultSuffix: "t",
        lockNominalMarker: false,
    });
    s.no(
        "patientivo default suffix resolver forbids absolutive zero for nonactive t-class",
        nonactiveTClassSuffixes.includes("")
    );
    const tFinalPatientivoSuffixes = ctx.resolveDefaultPatientivoAllowedSuffixes({
        sourceType: "nonactive",
        stem: "mat",
        defaultSuffix: "ti",
        lockNominalMarker: false,
    });
    s.no(
        "patientivo default suffix resolver omits in marker for t-final stems",
        tFinalPatientivoSuffixes.includes("in")
    );
    const chFinalPatientivoSuffixes = ctx.resolveDefaultPatientivoAllowedSuffixes({
        sourceType: "nonactive",
        stem: "mach",
        defaultSuffix: "ti",
        lockNominalMarker: false,
    });
    s.ok(
        "patientivo default suffix resolver keeps in marker for non-t consonant stems",
        chFinalPatientivoSuffixes.includes("in")
    );

    const originalNonactiveOptionPronounceability = ctx.isSyllableSequencePronounceable;
    try {
        ctx.isSyllableSequencePronounceable = (value) => value === "kinemu";
        const prefixedNonactiveRuleSource = ctx.buildNonactiveRuleSourceContext("kinemi", "nemi", {
            parsedVerb: verbMeta,
            verbMeta,
            isTransitive: true,
        });
        const prefixedNonactiveOptions = ctx.getNonactiveDerivationOptions("kinemi", "nemi", {
            parsedVerb: verbMeta,
            verbMeta,
            isTransitive: true,
            nonactiveRuleSource: prefixedNonactiveRuleSource,
        });
        const realizedPrefixedNonactiveOptions = prefixedNonactiveOptions
            .map((option) => ctx.realizeNonactiveDerivationOption(option, prefixedNonactiveRuleSource))
            .filter(Boolean);
        s.ok(
            "nonactive derivation options keep source-aware prefixed surfaces",
            realizedPrefixedNonactiveOptions.some((entry) => entry.suffix === "u" && entry.stem === "kinemu")
        );
    } finally {
        ctx.isSyllableSequencePronounceable = originalNonactiveOptionPronounceability;
    }

    const classCPerfectiveProvenance = {
        baseSpec: ctx.buildPretPerfectiveReplacementBaseSpec("salua", {
            isTransitive: true,
        }),
        surfaceStem: "saluj",
    };
    const resolvedClassCPerfectiveStem = ctx.resolveCalificativoInstrumentivoStemFromProvenanceEntry(
        classCPerfectiveProvenance,
        "salua"
    );
    s.eq(
        "patientivo perfectivo keeps class c replacive j in provenance stem core",
        resolvedClassCPerfectiveStem.fallbackStem,
        "saluj"
    );
    const classCPatientivoEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "perfectivo",
        stemSpec: resolvedClassCPerfectiveStem.stemSpec,
        fallbackStem: resolvedClassCPerfectiveStem.fallbackStem,
        subjectSuffix: "ti",
        lockNominalMarker: true,
        nominalMarkerPolicy: ctx.buildPatientivoNominalMarkerPolicy({
            sourceType: "perfectivo",
            defaultSuffix: "ti",
            allowedSuffixes: ["ti"],
            adjectiveSuffix: "ti",
            lockNominalMarker: true,
        }),
    });
    s.eq(
        "patientivo perfectivo class c builds salujti from provenance stem core",
        `${classCPatientivoEntry.verb}${classCPatientivoEntry.subjectSuffix}`,
        "salujti"
    );

    const originalResolvePretUniversalContextBundle = ctx.resolvePretUniversalContextBundle;
    const originalPretContextHasRightEdge = ctx.pretContextHasRightEdge;
    const originalGetPretUniversalClassCandidates = ctx.getPretUniversalClassCandidates;
    const originalBuildClassBasedResultWithProvenance = ctx.buildClassBasedResultWithProvenance;
    const originalIsSyllableSequencePronounceable = ctx.isSyllableSequencePronounceable;
    try {
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.pretContextHasRightEdge = () => true;
        ctx.getPretUniversalClassCandidates = () => new Set(["A", "C"]);
        ctx.buildClassBasedResultWithProvenance = () => ({
            result: "saluj",
            provenance: {
                variants: [
                    {
                        base: "salu",
                        suffix: "",
                        surfaceStem: "saluj",
                    },
                ],
            },
        });
        ctx.isSyllableSequencePronounceable = () => true;
        const prioritizedClassCDerivations = ctx.buildPatientivoPerfectivoDerivations({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.eq(
            "patientivo perfectivo prefers class c provenance stem over class a/b trim fallback",
            `${prioritizedClassCDerivations[0].verb}${prioritizedClassCDerivations[0].subjectSuffix}`,
            "salujti"
        );
    } finally {
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundle;
        ctx.pretContextHasRightEdge = originalPretContextHasRightEdge;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidates;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenance;
        ctx.isSyllableSequencePronounceable = originalIsSyllableSequencePronounceable;
    }

    const originalResolvePretUniversalContextBundleForPerfectivoGate = ctx.resolvePretUniversalContextBundle;
    const originalPretContextHasRightEdgeForPerfectivoGate = ctx.pretContextHasRightEdge;
    const originalGetPretUniversalClassCandidatesForPerfectivoGate = ctx.getPretUniversalClassCandidates;
    const originalBuildClassBasedResultWithProvenanceForPerfectivoGate = ctx.buildClassBasedResultWithProvenance;
    const originalPerfectivoGatePronounceability = ctx.isSyllableSequencePronounceable;
    try {
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.pretContextHasRightEdge = () => true;
        ctx.getPretUniversalClassCandidates = () => new Set(["A", "C"]);
        ctx.buildClassBasedResultWithProvenance = () => ({
            result: "saluj",
            provenance: {
                variants: [
                    {
                        base: "salu",
                        suffix: "",
                        surfaceStem: "saluj",
                    },
                ],
            },
        });
        ctx.isSyllableSequencePronounceable = (value) => value === "salujti";
        const gatedPerfectivoStemEntries = ctx.buildPatientivoPerfectivoStemEntries({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.ok(
            "patientivo perfectivo stem entries keep class c stem when ti surface is the authority",
            gatedPerfectivoStemEntries.some((entry) => entry.verb === "saluj")
        );
        const gatedPerfectivoDerivations = ctx.buildPatientivoPerfectivoDerivations({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.eq(
            "patientivo perfectivo derivations still gate on the surfaced ti form",
            gatedPerfectivoDerivations.map((entry) => `${entry.verb}${entry.subjectSuffix}`).join(" / "),
            "salujti"
        );
    } finally {
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundleForPerfectivoGate;
        ctx.pretContextHasRightEdge = originalPretContextHasRightEdgeForPerfectivoGate;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidatesForPerfectivoGate;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenanceForPerfectivoGate;
        ctx.isSyllableSequencePronounceable = originalPerfectivoGatePronounceability;
    }

    const originalPasadoRemotoPronounceability = ctx.isSyllableSequencePronounceable;
    const originalResolvePretUniversalContextBundleForPasadoRemotoGate = ctx.resolvePretUniversalContextBundle;
    const originalGetPretUniversalClassCandidatesForPasadoRemotoGate = ctx.getPretUniversalClassCandidates;
    const originalGetPretUniversalClassOrderForPasadoRemotoGate = ctx.getPretUniversalClassOrder;
    const originalBuildClassBasedResultWithProvenanceForPasadoRemotoGate = ctx.buildClassBasedResultWithProvenance;
    try {
        ctx.isSyllableSequencePronounceable = (value) => value === "takawajka";
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.getPretUniversalClassCandidates = () => new Set(["D"]);
        ctx.getPretUniversalClassOrder = () => ["D"];
        ctx.buildClassBasedResultWithProvenance = () => ({
            provenance: {
                variants: [
                    {
                        base: "waj",
                        suffix: "",
                        surfaceStem: "waj",
                    },
                ],
            },
        });
        const parsedCalificativoClassD = ctx.parseVerbInput("(taka)-(wa)");
        const gatedPasadoRemotoStemEntries = ctx.buildPasadoRemotoStemEntries({
            verb: parsedCalificativoClassD.verb,
            analysisVerb: parsedCalificativoClassD.analysisVerb,
            rawAnalysisVerb: parsedCalificativoClassD.rawAnalysisVerb || "",
            sourceRawVerb: parsedCalificativoClassD.sourceRawVerb || "(taka)-(wa)",
            isTransitive: true,
            directionalPrefix: parsedCalificativoClassD.directionalPrefix || "",
            boundPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            boundPrefixes: Array.isArray(parsedCalificativoClassD.boundPrefixes) ? parsedCalificativoClassD.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(parsedCalificativoClassD.boundExplicitFlags) ? parsedCalificativoClassD.boundExplicitFlags : [],
            directionalPrefixFromSlash: parsedCalificativoClassD.directionalPrefixFromSlash || "",
            sourceSplitPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            sourcePrefix: parsedCalificativoClassD.sourcePrefix || "",
            sourceBase: parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.canonicalRuleBase || "",
            sourceCompositeBase: parsedCalificativoClassD.canonical?.slashCompositeRuleBase || "",
            hasImpersonalTaPrefix: parsedCalificativoClassD.hasImpersonalTaPrefix === true,
            hasOptionalSupportiveI: parsedCalificativoClassD.hasOptionalSupportiveI === true,
            hasSlashMarker: parsedCalificativoClassD.hasSlashMarker === true,
            hasSuffixSeparator: parsedCalificativoClassD.hasSuffixSeparator === true,
            hasLeadingDash: parsedCalificativoClassD.hasLeadingDash === true,
            hasBoundMarker: parsedCalificativoClassD.hasBoundMarker === true,
            hasCompoundMarker: parsedCalificativoClassD.hasCompoundMarker === true,
            hasNonspecificValence: parsedCalificativoClassD.hasNonspecificValence === true,
            exactBaseVerb: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
            suppletiveStemSet: null,
            rootPlusYaBase: parsedCalificativoClassD.rootPlusYaBase || "",
            rootPlusYaBasePronounceable: parsedCalificativoClassD.rootPlusYaBasePronounceable || "",
            matrixBaseOverride: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
        });
        s.eq(
            "pasado remoto stem entries keep stems when the predicate surface is pronounceable",
            gatedPasadoRemotoStemEntries.map((entry) => entry.verb).join(" / "),
            "takawaj"
        );
    } finally {
        ctx.isSyllableSequencePronounceable = originalPasadoRemotoPronounceability;
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundleForPasadoRemotoGate;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidatesForPasadoRemotoGate;
        ctx.getPretUniversalClassOrder = originalGetPretUniversalClassOrderForPasadoRemotoGate;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenanceForPasadoRemotoGate;
    }

    const intransitiveProductiveNiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(pusuni)",
        analysisVerb: "pusuni",
        rawAnalysisVerb: "pusuni",
        isTransitive: false,
        sourceBase: "pusuni",
    });
    const intransitiveProductiveNiRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "pusuni",
        gateStem: "pusuni",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("pusuni", { sourceBase: "pusuni" }),
        isTransitive: false,
    });
    const intransitiveProductiveNiRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveProductiveNiRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive productive ni source frame exposes structural root-stock variants",
        {
            source: intransitiveProductiveNiRootStockFrame.sourceStem,
            family: intransitiveProductiveNiRootStockFrame.routeFamily,
            suffix: intransitiveProductiveNiRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveProductiveNiRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveProductiveNiRootStockFrame.rightEdgeFrame.sourceCore,
            variants: intransitiveProductiveNiRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitiveProductiveNiRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveProductiveNiRootStockFrame.consumesRenderedInput,
        },
        {
            source: "pusuni",
            family: "patientivo-root-stock-source",
            suffix: "ni",
            operation: "productive-ni-root-stock-stem",
            core: "pusu",
            variants: ["k", "ch", "s", "sh"],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ni operation frame carries route stems and tli-class targets",
        {
            operation: intransitiveProductiveNiRootStockOperation.operationId,
            targets: intransitiveProductiveNiRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
            routeOnly: intransitiveProductiveNiRootStockOperation.targetEntries
                .filter((entry) => entry.rootStockSourceContract?.routeStemOnly === true)
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "pusuk / pusukti / pusuch / pusuchti / pusus / pususti / pusush / pusushti / pusut",
            routeOnly: "pusuk / pusuch / pusus / pusush",
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ni live route consumes typed root-stock operation",
        intransitiveProductiveNiTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "pusuk", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pusukti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pusuch", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pusuchti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pusus", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pususti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pusush", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pusushti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
            { surface: "pusut", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ni-root-stock-stem" },
        ]
    );
    const poisonedProductiveNiRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonni",
        gateStem: "poisonni",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonni", { sourceBase: "poisonni" }),
        isTransitive: false,
    });
    const contradictedProductiveNiOperation = {
        ...intransitiveProductiveNiRootStockOperation,
        targetEntries: intransitiveProductiveNiRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo intransitive root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveNiRootStockFrame,
                operationFrame: intransitiveProductiveNiRootStockOperation,
                requestFrame: poisonedProductiveNiRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveNiRootStockFrame,
                operationFrame: contradictedProductiveNiOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitivePlainWaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(chipawa)",
        analysisVerb: "chipawa",
        rawAnalysisVerb: "chipawa",
        isTransitive: false,
        sourceBase: "chipawa",
    });
    const intransitivePlainWaRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "chipawa",
        gateStem: "chipawa",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("chipawa", { sourceBase: "chipawa" }),
        isTransitive: false,
    });
    const intransitivePlainWaRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitivePlainWaRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive plain wa source frame exposes structural root-stock variants",
        {
            source: intransitivePlainWaRootStockFrame.sourceStem,
            suffix: intransitivePlainWaRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitivePlainWaRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitivePlainWaRootStockFrame.rightEdgeFrame.sourceCore,
            variants: intransitivePlainWaRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitivePlainWaRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitivePlainWaRootStockFrame.consumesRenderedInput,
        },
        {
            source: "chipawa",
            suffix: "wa",
            operation: "plain-wa-root-stock-stem",
            core: "chipa",
            variants: ["k", "ch", "s", "sh"],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo tronco intransitive plain wa operation frame carries route stems and tli-class targets",
        {
            operation: intransitivePlainWaRootStockOperation.operationId,
            targets: intransitivePlainWaRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "chipak / chipakti / chipach / chipachti / chipas / chipasti / chipash / chipashti / chipat",
        }
    );
    s.eq(
        "patientivo tronco intransitive plain wa live route consumes typed root-stock operation",
        intransitivePlainWaTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "chipak", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wa-root-stock-stem" },
            { surface: "chipach", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wa-root-stock-stem" },
            { surface: "chipas", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wa-root-stock-stem" },
            { surface: "chipash", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wa-root-stock-stem" },
            { surface: "chipat", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wa-root-stock-stem" },
        ]
    );
    const poisonedPlainWaRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonwa",
        gateStem: "poisonwa",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonwa", { sourceBase: "poisonwa" }),
        isTransitive: false,
    });
    const contradictedPlainWaOperation = {
        ...intransitivePlainWaRootStockOperation,
        targetEntries: intransitivePlainWaRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo plain-wa root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitivePlainWaRootStockFrame,
                operationFrame: intransitivePlainWaRootStockOperation,
                requestFrame: poisonedPlainWaRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitivePlainWaRootStockFrame,
                operationFrame: contradictedPlainWaOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveProductiveKiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(waki)",
        analysisVerb: "waki",
        rawAnalysisVerb: "waki",
        isTransitive: false,
        sourceBase: "waki",
    });
    const intransitiveProductiveKiRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "waki",
        gateStem: "waki",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("waki", { sourceBase: "waki" }),
        isTransitive: false,
    });
    const displayPoisonedProductiveKiRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "waki",
        gateStem: "waki",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("waki", { sourceBase: "waki" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveProductiveKiRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveProductiveKiRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive productive ki source frame exposes structural root-stock variants",
        {
            source: intransitiveProductiveKiRootStockFrame.sourceStem,
            suffix: intransitiveProductiveKiRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveProductiveKiRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveProductiveKiRootStockFrame.rightEdgeFrame.sourceCore,
            variants: intransitiveProductiveKiRootStockFrame.rightEdgeFrame.variantConsonants,
            additionalVariants: intransitiveProductiveKiRootStockFrame.rightEdgeFrame.additionalVariantConsonants,
            sVariant: intransitiveProductiveKiRootStockFrame.rightEdgeFrame.hasProductiveKiSVariant,
            supported: intransitiveProductiveKiRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveProductiveKiRootStockFrame.consumesRenderedInput,
        },
        {
            source: "waki",
            suffix: "ki",
            operation: "productive-ki-root-stock-stem",
            core: "wa",
            variants: ["k", "ch", "s", "sh"],
            additionalVariants: ["j"],
            sVariant: true,
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo productive-ki source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedProductiveKiRootStockFrame.sourceSignature,
            operation: displayPoisonedProductiveKiRootStockFrame.rightEdgeFrame.routeOperation,
            core: displayPoisonedProductiveKiRootStockFrame.rightEdgeFrame.sourceCore,
            variants: displayPoisonedProductiveKiRootStockFrame.rightEdgeFrame.variantConsonants,
        },
        {
            signature: intransitiveProductiveKiRootStockFrame.sourceSignature,
            operation: "productive-ki-root-stock-stem",
            core: "wa",
            variants: ["k", "ch", "s", "sh"],
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ki operation frame carries route stems and tli-class targets",
        {
            operation: intransitiveProductiveKiRootStockOperation.operationId,
            targets: intransitiveProductiveKiRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "wak / wakti / wach / wachti / waj / wajti / was / wasti",
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ki live route consumes typed root-stock operation",
        intransitiveProductiveKiTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "wak", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
            { surface: "wakti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
            { surface: "wach", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
            { surface: "wachti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
            { surface: "waj", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
            { surface: "wajti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
            { surface: "was", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
            { surface: "wasti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ki-root-stock-stem" },
        ]
    );
    const poisonedProductiveKiRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonki",
        gateStem: "poisonki",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonki", { sourceBase: "poisonki" }),
        isTransitive: false,
    });
    const contradictedProductiveKiOperation = {
        ...intransitiveProductiveKiRootStockOperation,
        targetEntries: intransitiveProductiveKiRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo productive-ki root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveKiRootStockFrame,
                operationFrame: intransitiveProductiveKiRootStockOperation,
                requestFrame: poisonedProductiveKiRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveKiRootStockFrame,
                operationFrame: contradictedProductiveKiOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveProductiveKaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(chuchuka)",
        analysisVerb: "chuchuka",
        rawAnalysisVerb: "chuchuka",
        isTransitive: false,
        sourceBase: "chuchuka",
    });
    const intransitiveProductiveKaRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "chuchuka",
        gateStem: "chuchuka",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("chuchuka", { sourceBase: "chuchuka" }),
        isTransitive: false,
    });
    const displayPoisonedProductiveKaRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "chuchuka",
        gateStem: "chuchuka",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("chuchuka", { sourceBase: "chuchuka" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveProductiveKaRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveProductiveKaRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive productive ka source frame exposes structural root-stock variants",
        {
            source: intransitiveProductiveKaRootStockFrame.sourceStem,
            suffix: intransitiveProductiveKaRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveProductiveKaRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveProductiveKaRootStockFrame.rightEdgeFrame.sourceCore,
            redup: intransitiveProductiveKaRootStockFrame.rightEdgeFrame.startsWithInitialRedup,
            variants: intransitiveProductiveKaRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitiveProductiveKaRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveProductiveKaRootStockFrame.consumesRenderedInput,
        },
        {
            source: "chuchuka",
            suffix: "ka",
            operation: "productive-ka-root-stock-stem",
            core: "chuchu",
            redup: true,
            variants: ["k", "ch", "j"],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo productive-ka source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedProductiveKaRootStockFrame.sourceSignature,
            operation: displayPoisonedProductiveKaRootStockFrame.rightEdgeFrame.routeOperation,
            core: displayPoisonedProductiveKaRootStockFrame.rightEdgeFrame.sourceCore,
        },
        {
            signature: intransitiveProductiveKaRootStockFrame.sourceSignature,
            operation: "productive-ka-root-stock-stem",
            core: "chuchu",
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ka operation frame carries route stems and tli-class targets",
        {
            operation: intransitiveProductiveKaRootStockOperation.operationId,
            targets: intransitiveProductiveKaRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "chuchuk / chuchukti / chuchuch / chuchuchti / chuchuj / chuchujti",
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ka live route consumes typed root-stock operation",
        intransitiveProductiveKaTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "chuchuk", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ka-root-stock-stem" },
            { surface: "chuchukti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ka-root-stock-stem" },
            { surface: "chuchuch", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ka-root-stock-stem" },
            { surface: "chuchuchti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ka-root-stock-stem" },
            { surface: "chuchuj", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ka-root-stock-stem" },
            { surface: "chuchujti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ka-root-stock-stem" },
        ]
    );
    const poisonedProductiveKaRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonka",
        gateStem: "poisonka",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonka", { sourceBase: "poisonka" }),
        isTransitive: false,
    });
    const contradictedProductiveKaOperation = {
        ...intransitiveProductiveKaRootStockOperation,
        targetEntries: intransitiveProductiveKaRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo productive-ka root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveKaRootStockFrame,
                operationFrame: intransitiveProductiveKaRootStockOperation,
                requestFrame: poisonedProductiveKaRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveKaRootStockFrame,
                operationFrame: contradictedProductiveKaOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveProductiveYaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(istaya)",
        analysisVerb: "istaya",
        rawAnalysisVerb: "istaya",
        isTransitive: false,
        sourceBase: "istaya",
    });
    const intransitiveProductiveYaRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "istaya",
        gateStem: "istaya",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("istaya", { sourceBase: "istaya" }),
        isTransitive: false,
    });
    const displayPoisonedProductiveYaRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "istaya",
        gateStem: "istaya",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("istaya", { sourceBase: "istaya" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveProductiveYaRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveProductiveYaRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive productive ya source frame exposes structural root-stock replacement",
        {
            source: intransitiveProductiveYaRootStockFrame.sourceStem,
            suffix: intransitiveProductiveYaRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveProductiveYaRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveProductiveYaRootStockFrame.rightEdgeFrame.sourceCore,
            target: intransitiveProductiveYaRootStockFrame.rightEdgeFrame.targetStem,
            replacement: intransitiveProductiveYaRootStockFrame.rightEdgeFrame.replacementSegment,
            supported: intransitiveProductiveYaRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveProductiveYaRootStockFrame.consumesRenderedInput,
        },
        {
            source: "istaya",
            suffix: "ya",
            operation: "productive-ya-l-root-stock-stem",
            core: "ista",
            target: "istal",
            replacement: "l",
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo productive-ya source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedProductiveYaRootStockFrame.sourceSignature,
            operation: displayPoisonedProductiveYaRootStockFrame.rightEdgeFrame.routeOperation,
            target: displayPoisonedProductiveYaRootStockFrame.rightEdgeFrame.targetStem,
        },
        {
            signature: intransitiveProductiveYaRootStockFrame.sourceSignature,
            operation: "productive-ya-l-root-stock-stem",
            target: "istal",
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ya operation frame carries route stem and tli-class target",
        {
            operation: intransitiveProductiveYaRootStockOperation.operationId,
            targets: intransitiveProductiveYaRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "istal / istalti",
        }
    );
    s.eq(
        "patientivo tronco intransitive productive ya live route consumes typed root-stock operation",
        intransitiveProductiveYaTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "istal", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ya-l-root-stock-stem" },
            { surface: "istalti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "productive-ya-l-root-stock-stem" },
        ]
    );
    const intransitiveProductiveTiyaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(matiya)",
        analysisVerb: "matiya",
        rawAnalysisVerb: "matiya",
        isTransitive: false,
        sourceBase: "matiya",
    });
    s.eq(
        "patientivo tronco intransitive productive tiya live route consumes typed deletion operation",
        intransitiveProductiveTiyaTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "ma", targetOperation: "productive-tiya-root-stock-stem" },
            { surface: "mat", targetOperation: "productive-tiya-root-stock-stem" },
        ]
    );
    const poisonedProductiveYaRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonya",
        gateStem: "poisonya",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonya", { sourceBase: "poisonya" }),
        isTransitive: false,
    });
    const contradictedProductiveYaOperation = {
        ...intransitiveProductiveYaRootStockOperation,
        targetEntries: intransitiveProductiveYaRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo productive-ya root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveYaRootStockFrame,
                operationFrame: intransitiveProductiveYaRootStockOperation,
                requestFrame: poisonedProductiveYaRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveProductiveYaRootStockFrame,
                operationFrame: contradictedProductiveYaOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveShortWiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(chiwi)",
        analysisVerb: "chiwi",
        rawAnalysisVerb: "chiwi",
        isTransitive: false,
        sourceBase: "chiwi",
    });
    const intransitiveShortWiRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "chiwi",
        gateStem: "chiwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("chiwi", { sourceBase: "chiwi" }),
        isTransitive: false,
    });
    const displayPoisonedShortWiRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "chiwi",
        gateStem: "chiwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("chiwi", { sourceBase: "chiwi" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveShortWiRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveShortWiRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive short-wi source frame exposes structural superposition",
        {
            source: intransitiveShortWiRootStockFrame.sourceStem,
            suffix: intransitiveShortWiRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveShortWiRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveShortWiRootStockFrame.rightEdgeFrame.sourceCore,
            coreSyllables: intransitiveShortWiRootStockFrame.rightEdgeFrame.gateCoreSyllableCount,
            variants: intransitiveShortWiRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitiveShortWiRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveShortWiRootStockFrame.consumesRenderedInput,
        },
        {
            source: "chiwi",
            suffix: "wi",
            operation: "short-wi-superposition-root-stock-stem",
            core: "chi",
            coreSyllables: 1,
            variants: ["k"],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo short-wi source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedShortWiRootStockFrame.sourceSignature,
            operation: displayPoisonedShortWiRootStockFrame.rightEdgeFrame.routeOperation,
            core: displayPoisonedShortWiRootStockFrame.rightEdgeFrame.sourceCore,
            variants: displayPoisonedShortWiRootStockFrame.rightEdgeFrame.variantConsonants,
        },
        {
            signature: intransitiveShortWiRootStockFrame.sourceSignature,
            operation: "short-wi-superposition-root-stock-stem",
            core: "chi",
            variants: ["k"],
        }
    );
    s.eq(
        "patientivo tronco intransitive short-wi operation frame carries route and mirror targets",
        {
            operation: intransitiveShortWiRootStockOperation.operationId,
            targets: intransitiveShortWiRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
            routeOnly: intransitiveShortWiRootStockOperation.targetEntries
                .filter((entry) => entry.rootStockSourceContract?.routeStemOnly === true)
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "chik / chikti / chit",
            routeOnly: "chik / chit",
        }
    );
    s.eq(
        "patientivo tronco intransitive short-wi live route consumes typed root-stock operation",
        intransitiveShortWiTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "chik", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "short-wi-superposition-root-stock-stem" },
            { surface: "chit", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "short-wi-superposition-root-stock-stem" },
        ]
    );
    const poisonedShortWiRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonwi",
        gateStem: "poisonwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonwi", { sourceBase: "poisonwi" }),
        isTransitive: false,
    });
    const contradictedShortWiOperation = {
        ...intransitiveShortWiRootStockOperation,
        targetEntries: intransitiveShortWiRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo short-wi root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveShortWiRootStockFrame,
                operationFrame: intransitiveShortWiRootStockOperation,
                requestFrame: poisonedShortWiRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveShortWiRootStockFrame,
                operationFrame: contradictedShortWiOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitivePlainWiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(tepewi)",
        analysisVerb: "tepewi",
        rawAnalysisVerb: "tepewi",
        isTransitive: false,
        sourceBase: "tepewi",
    });
    const intransitivePlainWiRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "tepewi",
        gateStem: "tepewi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("tepewi", { sourceBase: "tepewi" }),
        isTransitive: false,
    });
    const displayPoisonedPlainWiRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "tepewi",
        gateStem: "tepewi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("tepewi", { sourceBase: "tepewi" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitivePlainWiRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitivePlainWiRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive plain-wi source frame exposes structural variants",
        {
            source: intransitivePlainWiRootStockFrame.sourceStem,
            suffix: intransitivePlainWiRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitivePlainWiRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitivePlainWiRootStockFrame.rightEdgeFrame.sourceCore,
            variants: intransitivePlainWiRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitivePlainWiRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitivePlainWiRootStockFrame.consumesRenderedInput,
        },
        {
            source: "tepewi",
            suffix: "wi",
            operation: "plain-wi-root-stock-stem",
            core: "tepe",
            variants: ["k", "ch", "s", "sh"],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo plain-wi source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedPlainWiRootStockFrame.sourceSignature,
            operation: displayPoisonedPlainWiRootStockFrame.rightEdgeFrame.routeOperation,
            core: displayPoisonedPlainWiRootStockFrame.rightEdgeFrame.sourceCore,
            variants: displayPoisonedPlainWiRootStockFrame.rightEdgeFrame.variantConsonants,
        },
        {
            signature: intransitivePlainWiRootStockFrame.sourceSignature,
            operation: "plain-wi-root-stock-stem",
            core: "tepe",
            variants: ["k", "ch", "s", "sh"],
        }
    );
    s.eq(
        "patientivo tronco intransitive plain-wi operation frame carries variant and reduced tli-class targets",
        {
            operation: intransitivePlainWiRootStockOperation.operationId,
            targets: intransitivePlainWiRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
            routeOnly: intransitivePlainWiRootStockOperation.targetEntries
                .filter((entry) => entry.rootStockSourceContract?.routeStemOnly === true)
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "tepek / tepekti / tepech / tepechti / tepes / tepesti / tepesh / tepeshti / tepti",
            routeOnly: "tepek / tepech / tepes / tepesh",
        }
    );
    s.eq(
        "patientivo tronco intransitive plain-wi live route consumes typed root-stock operation",
        intransitivePlainWiTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "tepek", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wi-root-stock-stem" },
            { surface: "tepech", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wi-root-stock-stem" },
            { surface: "tepes", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wi-root-stock-stem" },
            { surface: "tepesh", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wi-root-stock-stem" },
            { surface: "tepti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "plain-wi-root-stock-stem" },
        ]
    );
    const poisonedPlainWiRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonwi",
        gateStem: "poisonwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonwi", { sourceBase: "poisonwi" }),
        isTransitive: false,
    });
    const contradictedPlainWiOperation = {
        ...intransitivePlainWiRootStockOperation,
        targetEntries: intransitivePlainWiRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo plain-wi root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitivePlainWiRootStockFrame,
                operationFrame: intransitivePlainWiRootStockOperation,
                requestFrame: poisonedPlainWiRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitivePlainWiRootStockFrame,
                operationFrame: contradictedPlainWiOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveIwiFamilyTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(tekiwi)",
        analysisVerb: "tekiwi",
        rawAnalysisVerb: "tekiwi",
        isTransitive: false,
        sourceBase: "tekiwi",
    });
    const intransitiveIwiFamilyRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "tekiwi",
        gateStem: "tekiwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("tekiwi", { sourceBase: "tekiwi" }),
        isTransitive: false,
    });
    const displayPoisonedIwiFamilyRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "tekiwi",
        gateStem: "tekiwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("tekiwi", { sourceBase: "tekiwi" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveIwiFamilyRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveIwiFamilyRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive iwi-family source frame exposes structural root-stock target",
        {
            source: intransitiveIwiFamilyRootStockFrame.sourceStem,
            suffix: intransitiveIwiFamilyRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveIwiFamilyRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveIwiFamilyRootStockFrame.rightEdgeFrame.sourceCore,
            target: intransitiveIwiFamilyRootStockFrame.rightEdgeFrame.targetStem,
            variants: intransitiveIwiFamilyRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitiveIwiFamilyRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveIwiFamilyRootStockFrame.consumesRenderedInput,
        },
        {
            source: "tekiwi",
            suffix: "iwi",
            operation: "iwi-family-root-stock-stem",
            core: "tek",
            target: "tek",
            variants: [],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo iwi-family source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedIwiFamilyRootStockFrame.sourceSignature,
            operation: displayPoisonedIwiFamilyRootStockFrame.rightEdgeFrame.routeOperation,
            core: displayPoisonedIwiFamilyRootStockFrame.rightEdgeFrame.sourceCore,
            target: displayPoisonedIwiFamilyRootStockFrame.rightEdgeFrame.targetStem,
        },
        {
            signature: intransitiveIwiFamilyRootStockFrame.sourceSignature,
            operation: "iwi-family-root-stock-stem",
            core: "tek",
            target: "tek",
        }
    );
    s.eq(
        "patientivo tronco intransitive iwi-family operation frame carries route and tli-class targets",
        {
            operation: intransitiveIwiFamilyRootStockOperation.operationId,
            targets: intransitiveIwiFamilyRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
            routeOnly: intransitiveIwiFamilyRootStockOperation.targetEntries
                .filter((entry) => entry.rootStockSourceContract?.routeStemOnly === true)
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "tek / tekti",
            routeOnly: "tek",
        }
    );
    s.eq(
        "patientivo tronco intransitive iwi-family live route consumes typed root-stock operation",
        intransitiveIwiFamilyTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "tek", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "iwi-family-root-stock-stem" },
            { surface: "tekti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "iwi-family-root-stock-stem" },
        ]
    );
    const poisonedIwiFamilyRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisoniwi",
        gateStem: "poisoniwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisoniwi", { sourceBase: "poisoniwi" }),
        isTransitive: false,
    });
    const contradictedIwiFamilyOperation = {
        ...intransitiveIwiFamilyRootStockOperation,
        targetEntries: intransitiveIwiFamilyRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo iwi-family root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveIwiFamilyRootStockFrame,
                operationFrame: intransitiveIwiFamilyRootStockOperation,
                requestFrame: poisonedIwiFamilyRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveIwiFamilyRootStockFrame,
                operationFrame: contradictedIwiFamilyOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveAwiFamilyTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(nemawi)",
        analysisVerb: "nemawi",
        rawAnalysisVerb: "nemawi",
        isTransitive: false,
        sourceBase: "nemawi",
    });
    const intransitiveAwiFamilyRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "nemawi",
        gateStem: "nemawi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("nemawi", { sourceBase: "nemawi" }),
        isTransitive: false,
    });
    const displayPoisonedAwiFamilyRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "nemawi",
        gateStem: "nemawi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("nemawi", { sourceBase: "nemawi" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveAwiFamilyRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveAwiFamilyRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive awi-family source frame exposes structural variants and mirrors",
        {
            source: intransitiveAwiFamilyRootStockFrame.sourceStem,
            suffix: intransitiveAwiFamilyRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveAwiFamilyRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveAwiFamilyRootStockFrame.rightEdgeFrame.sourceCore,
            variants: intransitiveAwiFamilyRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitiveAwiFamilyRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveAwiFamilyRootStockFrame.consumesRenderedInput,
        },
        {
            source: "nemawi",
            suffix: "awi",
            operation: "awi-family-root-stock-stem",
            core: "nem",
            variants: ["k", "ch", "s", "sh"],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo awi-family source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedAwiFamilyRootStockFrame.sourceSignature,
            operation: displayPoisonedAwiFamilyRootStockFrame.rightEdgeFrame.routeOperation,
            core: displayPoisonedAwiFamilyRootStockFrame.rightEdgeFrame.sourceCore,
            variants: displayPoisonedAwiFamilyRootStockFrame.rightEdgeFrame.variantConsonants,
        },
        {
            signature: intransitiveAwiFamilyRootStockFrame.sourceSignature,
            operation: "awi-family-root-stock-stem",
            core: "nem",
            variants: ["k", "ch", "s", "sh"],
        }
    );
    s.eq(
        "patientivo tronco intransitive awi-family operation frame carries route, variant, and mirror targets",
        {
            operation: intransitiveAwiFamilyRootStockOperation.operationId,
            targets: intransitiveAwiFamilyRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
            routeOnly: intransitiveAwiFamilyRootStockOperation.targetEntries
                .filter((entry) => entry.rootStockSourceContract?.routeStemOnly === true)
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "nem / nemti / nemak / nemakti / nemach / nemachti / nemas / nemasti / nemash / nemashti / nemat / nemawit",
            routeOnly: "nem / nemak / nemach / nemas / nemash / nemat / nemawit",
        }
    );
    s.eq(
        "patientivo tronco intransitive awi-family live route consumes typed root-stock operation",
        intransitiveAwiFamilyTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "nem", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
            { surface: "nemti", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
            { surface: "nemak", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
            { surface: "nemach", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
            { surface: "nemas", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
            { surface: "nemash", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
            { surface: "nemat", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
            { surface: "nemawit", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-family-root-stock-stem" },
        ]
    );
    const poisonedAwiFamilyRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonawi",
        gateStem: "poisonawi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonawi", { sourceBase: "poisonawi" }),
        isTransitive: false,
    });
    const contradictedAwiFamilyOperation = {
        ...intransitiveAwiFamilyRootStockOperation,
        targetEntries: intransitiveAwiFamilyRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo awi-family root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveAwiFamilyRootStockFrame,
                operationFrame: intransitiveAwiFamilyRootStockOperation,
                requestFrame: poisonedAwiFamilyRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveAwiFamilyRootStockFrame,
                operationFrame: contradictedAwiFamilyOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveUaFamilyRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "sakamua",
        gateStem: "sakamua",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("sakamua", { sourceBase: "sakamua" }),
        isTransitive: false,
    });
    const displayPoisonedUaFamilyRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "sakamua",
        gateStem: "sakamua",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("sakamua", { sourceBase: "sakamua" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveUaFamilyRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveUaFamilyRootStockFrame
    );
    const intransitiveUaYMirrorRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "tayua",
        gateStem: "tayua",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("tayua", { sourceBase: "tayua" }),
        isTransitive: false,
    });
    const intransitiveUaYMirrorRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveUaYMirrorRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive ua-family source frame exposes structural targets and mirrors",
        {
            source: intransitiveUaFamilyRootStockFrame.sourceStem,
            suffix: intransitiveUaFamilyRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveUaFamilyRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveUaFamilyRootStockFrame.rightEdgeFrame.sourceCore,
            target: intransitiveUaFamilyRootStockFrame.rightEdgeFrame.targetStem,
            variants: intransitiveUaFamilyRootStockFrame.rightEdgeFrame.variantConsonants,
            supported: intransitiveUaFamilyRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: intransitiveUaFamilyRootStockFrame.consumesRenderedInput,
        },
        {
            source: "sakamua",
            suffix: "ua",
            operation: "ua-family-root-stock-stem",
            core: "sakam",
            target: "sakam",
            variants: [],
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo ua-family source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedUaFamilyRootStockFrame.sourceSignature,
            operation: displayPoisonedUaFamilyRootStockFrame.rightEdgeFrame.routeOperation,
            core: displayPoisonedUaFamilyRootStockFrame.rightEdgeFrame.sourceCore,
            target: displayPoisonedUaFamilyRootStockFrame.rightEdgeFrame.targetStem,
        },
        {
            signature: intransitiveUaFamilyRootStockFrame.sourceSignature,
            operation: "ua-family-root-stock-stem",
            core: "sakam",
            target: "sakam",
        }
    );
    s.eq(
        "patientivo tronco intransitive ua-family operation frame carries route, tli-class, and y-joined mirror targets",
        {
            operation: intransitiveUaFamilyRootStockOperation.operationId,
            targets: intransitiveUaFamilyRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
            yMirrorTargets: intransitiveUaYMirrorRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "sakam / sakamti",
            yMirrorTargets: "tay / tayti / tat",
        }
    );
    const poisonedUaFamilyRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonua",
        gateStem: "poisonua",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonua", { sourceBase: "poisonua" }),
        isTransitive: false,
    });
    const contradictedUaFamilyOperation = {
        ...intransitiveUaFamilyRootStockOperation,
        targetEntries: intransitiveUaFamilyRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo ua-family root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveUaFamilyRootStockFrame,
                operationFrame: intransitiveUaFamilyRootStockOperation,
                requestFrame: poisonedUaFamilyRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveUaFamilyRootStockFrame,
                operationFrame: contradictedUaFamilyOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );

    const intransitiveIwiFinalClusterTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(ijsiwi)",
        analysisVerb: "ijsiwi",
        rawAnalysisVerb: "ijsiwi",
        isTransitive: false,
        sourceBase: "ijsiwi",
    });
    const intransitiveIwiFinalClusterRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "ijsiwi",
        gateStem: "ijsiwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("ijsiwi", { sourceBase: "ijsiwi" }),
        isTransitive: false,
    });
    const displayPoisonedIwiFinalClusterRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "ijsiwi",
        gateStem: "ijsiwi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("ijsiwi", { sourceBase: "ijsiwi" }),
        isTransitive: false,
        stem: "poisoned",
        surface: "poisoned",
        result: "poisoned",
        surfaceForms: ["poisoned"],
        formulaEcho: "#poisoned#",
    });
    const intransitiveIwiFinalClusterRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveIwiFinalClusterRootStockFrame
    );
    s.eq(
        "patientivo tronco intransitive iwi final-cluster source frame exposes structural vowel recovery",
        {
            source: intransitiveIwiFinalClusterRootStockFrame.sourceStem,
            suffix: intransitiveIwiFinalClusterRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveIwiFinalClusterRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveIwiFinalClusterRootStockFrame.rightEdgeFrame.sourceCore,
            target: intransitiveIwiFinalClusterRootStockFrame.rightEdgeFrame.targetStem,
            replacement: intransitiveIwiFinalClusterRootStockFrame.rightEdgeFrame.replacementSegment,
            consumesRenderedInput: intransitiveIwiFinalClusterRootStockFrame.consumesRenderedInput,
        },
        {
            source: "ijsiwi",
            suffix: "iwi",
            operation: "iwi-final-cluster-root-stock-stem",
            core: "ijs",
            target: "ijsi",
            replacement: "i",
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo iwi final-cluster source frame ignores display strings during suffix and syllable analysis",
        {
            signature: displayPoisonedIwiFinalClusterRootStockFrame.sourceSignature,
            operation: displayPoisonedIwiFinalClusterRootStockFrame.rightEdgeFrame.routeOperation,
            target: displayPoisonedIwiFinalClusterRootStockFrame.rightEdgeFrame.targetStem,
        },
        {
            signature: intransitiveIwiFinalClusterRootStockFrame.sourceSignature,
            operation: "iwi-final-cluster-root-stock-stem",
            target: "ijsi",
        }
    );
    s.eq(
        "patientivo tronco intransitive iwi final-cluster operation frame carries recovered route and tli-class targets",
        {
            operation: intransitiveIwiFinalClusterRootStockOperation.operationId,
            targets: intransitiveIwiFinalClusterRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            targets: "ijsi / ijsit",
        }
    );
    s.eq(
        "patientivo tronco intransitive iwi final-cluster live route consumes typed root-stock operation",
        intransitiveIwiFinalClusterTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "ijsi", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "iwi-final-cluster-root-stock-stem" },
            { surface: "ijsit", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "iwi-final-cluster-root-stock-stem" },
        ]
    );

    const intransitiveAwiFinalClusterTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "(ishtawi)",
        analysisVerb: "ishtawi",
        rawAnalysisVerb: "ishtawi",
        isTransitive: false,
        sourceBase: "ishtawi",
    });
    const intransitiveAwiFinalClusterRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "ishtawi",
        gateStem: "ishtawi",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("ishtawi", { sourceBase: "ishtawi" }),
        isTransitive: false,
    });
    const intransitiveAwiFinalClusterRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        intransitiveAwiFinalClusterRootStockFrame
    );
    const contradictedAwiFinalClusterOperation = {
        ...intransitiveAwiFinalClusterRootStockOperation,
        targetEntries: intransitiveAwiFinalClusterRootStockOperation.targetEntries.map((entry, index) => (
            index === 0 ? { ...entry, stem: "poisoned" } : entry
        )),
    };
    s.eq(
        "patientivo tronco intransitive awi final-cluster source and operation frames expose recovery variants",
        {
            suffix: intransitiveAwiFinalClusterRootStockFrame.rightEdgeFrame.sourceSuffix,
            operation: intransitiveAwiFinalClusterRootStockFrame.rightEdgeFrame.routeOperation,
            core: intransitiveAwiFinalClusterRootStockFrame.rightEdgeFrame.sourceCore,
            target: intransitiveAwiFinalClusterRootStockFrame.rightEdgeFrame.targetStem,
            variants: intransitiveAwiFinalClusterRootStockFrame.rightEdgeFrame.variantConsonants,
            targets: intransitiveAwiFinalClusterRootStockOperation.targetEntries
                .map((entry) => `${entry.stem}${entry.suffix}`)
                .join(" / "),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: intransitiveAwiFinalClusterRootStockFrame,
                operationFrame: contradictedAwiFinalClusterOperation,
            }),
        },
        {
            suffix: "awi",
            operation: "awi-final-cluster-root-stock-stem",
            core: "isht",
            target: "ishta",
            variants: ["k", "ch", "s", "sh"],
            targets: "ishta / ishtat / ishtak / ishtakti / ishtach / ishtachti / ishtas / ishtasti / ishtash / ishtashti / ishtawit",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    s.eq(
        "patientivo tronco intransitive awi final-cluster live route consumes typed root-stock operation",
        intransitiveAwiFinalClusterTroncoDerivations.map((entry) => ({
            surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
            operation: entry.rootStockOperationFrame?.operationId || "",
            targetOperation: entry.rootStockTargetFrame?.routeOperation || "",
        })),
        [
            { surface: "ishta", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-final-cluster-root-stock-stem" },
            { surface: "ishtat", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-final-cluster-root-stock-stem" },
            { surface: "ishtak", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-final-cluster-root-stock-stem" },
            { surface: "ishtach", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-final-cluster-root-stock-stem" },
            { surface: "ishtas", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-final-cluster-root-stock-stem" },
            { surface: "ishtash", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-final-cluster-root-stock-stem" },
            { surface: "ishtawit", operation: "andrews-patientivo-root-stock-stem-realization", targetOperation: "awi-final-cluster-root-stock-stem" },
        ]
    );

    const transitiveLuaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "-(salua)",
        analysisVerb: "salua",
        rawAnalysisVerb: "salua",
        isTransitive: true,
        sourceBase: "salua",
        hasLeadingDash: true,
    });
    s.ok(
        "patientivo tronco transitive l|VV ua keeps the raw stem family",
        transitiveLuaTroncoDerivations.some((entry) => `${entry?.verb || ""}${entry?.subjectSuffix || ""}` === "sal")
    );
    const transitiveLuaRootStockFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "salua",
        gateStem: "salua",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("salua", { sourceBase: "salua" }),
        isTransitive: true,
    });
    const transitiveLuaRootStockOperation = ctx.buildPatientivoRootStockStemOperationFrame(
        transitiveLuaRootStockFrame
    );
    s.eq(
        "patientivo tronco transitive lua source frame exposes structural root-stock route",
        {
            source: transitiveLuaRootStockFrame.sourceStem,
            family: transitiveLuaRootStockFrame.routeFamily,
            suffix: transitiveLuaRootStockFrame.rightEdgeFrame.sourceSuffix,
            core: transitiveLuaRootStockFrame.rightEdgeFrame.sourceCore,
            supported: transitiveLuaRootStockFrame.rightEdgeFrame.routeSupported,
            consumesRenderedInput: transitiveLuaRootStockFrame.consumesRenderedInput,
        },
        {
            source: "salua",
            family: "patientivo-root-stock-source",
            suffix: "ua",
            core: "sal",
            supported: true,
            consumesRenderedInput: false,
        }
    );
    s.eq(
        "patientivo tronco transitive lua operation frame carries target entries",
        {
            operation: transitiveLuaRootStockOperation.operationId,
            target: transitiveLuaRootStockOperation.targetEntries.map((entry) => `${entry.stem}${entry.suffix}`).join(" / "),
            contractSurface: transitiveLuaRootStockOperation.targetEntries[0]?.rootStockSourceContract?.outputSurface || "",
            routeStemOnly: transitiveLuaRootStockOperation.targetEntries[0]?.rootStockSourceContract?.routeStemOnly === true,
        },
        {
            operation: "andrews-patientivo-root-stock-stem-realization",
            target: "sal",
            contractSurface: "sal",
            routeStemOnly: true,
        }
    );
    s.eq(
        "patientivo root-stock direct operation blocks without source and operation frames",
        {
            noSourceEntries: ctx.derivePatientivoRootStockEntriesFromSourceFrame(null),
            noSourceOperation: ctx.buildPatientivoRootStockStemOperationFrame(null),
            missingOperation: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: transitiveLuaRootStockFrame,
                operationFrame: null,
            }),
        },
        {
            noSourceEntries: [],
            noSourceOperation: null,
            missingOperation: "operation-frame-required",
        }
    );
    const poisonedLuaRootStockRequestFrame = ctx.buildPatientivoRootStockStemSourceFrame({
        sourceStem: "poisonlua",
        gateStem: "poisonlua",
        sourceStemSpec: ctx.buildLiteralMorphStemSpec("poisonlua", { sourceBase: "poisonlua" }),
        isTransitive: true,
    });
    const contradictedLuaRootStockOperation = {
        ...transitiveLuaRootStockOperation,
        targetEntries: transitiveLuaRootStockOperation.targetEntries.map((entry) => ({
            ...entry,
            stem: "poisoned",
        })),
    };
    s.eq(
        "patientivo root-stock frames block changed caller strings and contradictory targets",
        {
            changedRequest: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: transitiveLuaRootStockFrame,
                operationFrame: transitiveLuaRootStockOperation,
                requestFrame: poisonedLuaRootStockRequestFrame,
            }),
            contradictoryTarget: ctx.getPatientivoRootStockStemFrameMismatch({
                sourceFrame: transitiveLuaRootStockFrame,
                operationFrame: contradictedLuaRootStockOperation,
            }),
        },
        {
            changedRequest: "contradictory-source-frame",
            contradictoryTarget: "contradictory-target-frame",
        }
    );
    const originalRootStockContractBuilder = ctx.getPatientivoRootStockSourceContract;
    try {
        ctx.getPatientivoRootStockSourceContract = () => ({
            kind: "patientive-root-stock-source-contract",
            supported: true,
            outputConnector: "poison",
            outputSurface: "poisoned",
        });
        const poisonedLegacyBuilderTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "-(salua)",
            analysisVerb: "salua",
            rawAnalysisVerb: "salua",
            isTransitive: true,
            sourceBase: "salua",
            hasLeadingDash: true,
        });
        s.eq(
            "patientivo tronco transitive route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyBuilderTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [{
                surface: "sal",
                operation: "andrews-patientivo-root-stock-stem-realization",
                contractSurface: "sal",
            }]
        );
        const poisonedLegacyProductiveNiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(pusuni)",
            analysisVerb: "pusuni",
            rawAnalysisVerb: "pusuni",
            isTransitive: false,
            sourceBase: "pusuni",
        });
        s.eq(
            "patientivo tronco intransitive route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyProductiveNiTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "pusuk", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusuk" },
                { surface: "pusukti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusukti" },
                { surface: "pusuch", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusuch" },
                { surface: "pusuchti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusuchti" },
                { surface: "pusus", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusus" },
                { surface: "pususti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pususti" },
                { surface: "pusush", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusush" },
                { surface: "pusushti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusushti" },
                { surface: "pusut", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "pusut" },
            ]
        );
        const poisonedLegacyPlainWaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(chipawa)",
            analysisVerb: "chipawa",
            rawAnalysisVerb: "chipawa",
            isTransitive: false,
            sourceBase: "chipawa",
        });
        s.eq(
            "patientivo tronco plain-wa route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyPlainWaTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "chipak", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chipak" },
                { surface: "chipach", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chipach" },
                { surface: "chipas", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chipas" },
                { surface: "chipash", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chipash" },
                { surface: "chipat", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chipat" },
            ]
        );
        const poisonedLegacyProductiveKiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(waki)",
            analysisVerb: "waki",
            rawAnalysisVerb: "waki",
            isTransitive: false,
            sourceBase: "waki",
        });
        s.eq(
            "patientivo tronco productive-ki route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyProductiveKiTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "wak", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "wak" },
                { surface: "wakti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "wakti" },
                { surface: "wach", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "wach" },
                { surface: "wachti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "wachti" },
                { surface: "waj", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "waj" },
                { surface: "wajti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "wajti" },
                { surface: "was", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "was" },
                { surface: "wasti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "wasti" },
            ]
        );
        const poisonedLegacyProductiveYaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(istaya)",
            analysisVerb: "istaya",
            rawAnalysisVerb: "istaya",
            isTransitive: false,
            sourceBase: "istaya",
        });
        s.eq(
            "patientivo tronco productive-ya route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyProductiveYaTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "istal", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "istal" },
                { surface: "istalti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "istalti" },
            ]
        );
        const poisonedLegacyProductiveKaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(chuchuka)",
            analysisVerb: "chuchuka",
            rawAnalysisVerb: "chuchuka",
            isTransitive: false,
            sourceBase: "chuchuka",
        });
        s.eq(
            "patientivo tronco productive-ka route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyProductiveKaTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "chuchuk", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chuchuk" },
                { surface: "chuchukti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chuchukti" },
                { surface: "chuchuch", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chuchuch" },
                { surface: "chuchuchti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chuchuchti" },
                { surface: "chuchuj", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chuchuj" },
                { surface: "chuchujti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chuchujti" },
            ]
        );
        const poisonedLegacyShortWiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(chiwi)",
            analysisVerb: "chiwi",
            rawAnalysisVerb: "chiwi",
            isTransitive: false,
            sourceBase: "chiwi",
        });
        s.eq(
            "patientivo tronco short-wi route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyShortWiTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "chik", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chik" },
                { surface: "chit", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "chit" },
            ]
        );
        const poisonedLegacyPlainWiTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(tepewi)",
            analysisVerb: "tepewi",
            rawAnalysisVerb: "tepewi",
            isTransitive: false,
            sourceBase: "tepewi",
        });
        s.eq(
            "patientivo tronco plain-wi route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyPlainWiTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "tepek", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "tepek" },
                { surface: "tepech", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "tepech" },
                { surface: "tepes", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "tepes" },
                { surface: "tepesh", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "tepesh" },
                { surface: "tepti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "tepti" },
            ]
        );
        const poisonedLegacyIwiFamilyTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(tekiwi)",
            analysisVerb: "tekiwi",
            rawAnalysisVerb: "tekiwi",
            isTransitive: false,
            sourceBase: "tekiwi",
        });
        s.eq(
            "patientivo tronco iwi-family route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyIwiFamilyTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "tek", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "tek" },
                { surface: "tekti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "tekti" },
            ]
        );
        const poisonedLegacyAwiFamilyTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(nemawi)",
            analysisVerb: "nemawi",
            rawAnalysisVerb: "nemawi",
            isTransitive: false,
            sourceBase: "nemawi",
        });
        s.eq(
            "patientivo tronco awi-family route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyAwiFamilyTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "nem", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nem" },
                { surface: "nemti", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nemti" },
                { surface: "nemak", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nemak" },
                { surface: "nemach", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nemach" },
                { surface: "nemas", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nemas" },
                { surface: "nemash", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nemash" },
                { surface: "nemat", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nemat" },
                { surface: "nemawit", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "nemawit" },
            ]
        );
        const poisonedLegacyIwiFinalClusterTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(ijsiwi)",
            analysisVerb: "ijsiwi",
            rawAnalysisVerb: "ijsiwi",
            isTransitive: false,
            sourceBase: "ijsiwi",
        });
        s.eq(
            "patientivo tronco iwi final-cluster route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyIwiFinalClusterTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "ijsi", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ijsi" },
                { surface: "ijsit", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ijsit" },
            ]
        );
        const poisonedLegacyAwiFinalClusterTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
            verb: "(ishtawi)",
            analysisVerb: "ishtawi",
            rawAnalysisVerb: "ishtawi",
            isTransitive: false,
            sourceBase: "ishtawi",
        });
        s.eq(
            "patientivo tronco awi final-cluster route ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyAwiFinalClusterTroncoDerivations.map((entry) => ({
                surface: `${entry?.verb || ""}${entry?.subjectSuffix || ""}`,
                operation: entry.rootStockOperationFrame?.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
            })),
            [
                { surface: "ishta", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ishta" },
                { surface: "ishtat", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ishtat" },
                { surface: "ishtak", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ishtak" },
                { surface: "ishtach", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ishtach" },
                { surface: "ishtas", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ishtas" },
                { surface: "ishtash", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ishtash" },
                { surface: "ishtawit", operation: "andrews-patientivo-root-stock-stem-realization", contractSurface: "ishtawit" },
            ]
        );
    } finally {
        ctx.getPatientivoRootStockSourceContract = originalRootStockContractBuilder;
    }
    const originalUaRootStockContractBuilder = ctx.getPatientivoRootStockSourceContract;
    try {
        ctx.getPatientivoRootStockSourceContract = () => ({
            kind: "patientive-root-stock-source-contract",
            supported: true,
            outputConnector: "poison",
            outputSurface: "poisoned",
        });
        const poisonedLegacyUaFamilyOperation = ctx.buildPatientivoRootStockStemOperationFrame(
            intransitiveUaFamilyRootStockFrame
        );
        s.eq(
            "patientivo tronco ua-family typed operation ignores monkeypatched legacy root-stock string contract helper",
            poisonedLegacyUaFamilyOperation.targetEntries.map((entry) => ({
                surface: `${entry?.stem || ""}${entry?.suffix || ""}`,
                operation: poisonedLegacyUaFamilyOperation.operationId || "",
                contractSurface: entry.rootStockSourceContract?.outputSurface || "",
                targetOperation: entry.routeOperation || "",
            })),
            [
                {
                    surface: "sakam",
                    operation: "andrews-patientivo-root-stock-stem-realization",
                    contractSurface: "sakam",
                    targetOperation: "ua-family-root-stock-stem",
                },
                {
                    surface: "sakamti",
                    operation: "andrews-patientivo-root-stock-stem-realization",
                    contractSurface: "sakamti",
                    targetOperation: "ua-family-root-stock-stem",
                },
            ]
        );
    } finally {
        ctx.getPatientivoRootStockSourceContract = originalUaRootStockContractBuilder;
    }
    const expandedTransitiveLuaTronco = ctx.expandPatientivoNominalMarkerOptions(
        transitiveLuaTroncoDerivations,
        "tronco-verbal"
    );
    s.eq(
        "patientivo tronco transitive l|VV ua expands only route and tli-class markers",
        expandedTransitiveLuaTronco.map((entry) => `${entry?.verb || ""}${entry?.subjectSuffix || ""}`).join(" / "),
        "sal / salti"
    );

    return s;
}

module.exports = { run };
