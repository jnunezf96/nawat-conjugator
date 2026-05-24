export function createNncApi(targetObject = globalThis) {
    const VERB_DERIVED_NOMINAL_KIND = new Proxy({}, {
        get: (_target, prop) => targetObject.VERB_DERIVED_NOMINAL_KIND?.[prop],
    });
    const INSTRUMENTIVO_MODE = new Proxy({}, {
        get: (_target, prop) => targetObject.INSTRUMENTIVO_MODE?.[prop],
    });
    const COMBINED_MODE = new Proxy({}, {
        get: (_target, prop) => targetObject.COMBINED_MODE?.[prop],
    });

    const buildVerbDerivedNominalBuilderContext = (...args) => targetObject.buildVerbDerivedNominalBuilderContext(...args);
    const buildVerbDerivedNominalEntry = (...args) => targetObject.buildVerbDerivedNominalEntry(...args);
    const buildVerbDerivedNominalResult = (...args) => targetObject.buildVerbDerivedNominalResult(...args);
    const buildNonactiveSourceChain = (...args) => targetObject.buildNonactiveSourceChain(...args);
    const normalizeDerivationStemValue = (...args) => targetObject.normalizeDerivationStemValue(...args);
    const getNounNonactiveRuleBase = (...args) => targetObject.getNounNonactiveRuleBase(...args);
    const getVisibleNonactiveDerivationOptions = (...args) => targetObject.getVisibleNonactiveDerivationOptions(...args);
    const resolveNonactiveStemSelection = (...args) => targetObject.resolveNonactiveStemSelection(...args);
    const shouldForceAllNonactiveOptions = (...args) => targetObject.shouldForceAllNonactiveOptions(...args);
    const getSelectedNonactiveSuffix = (...args) => targetObject.getSelectedNonactiveSuffix(...args);
    const applyNonactiveSourceChainStemSpec = (...args) => targetObject.applyNonactiveSourceChainStemSpec(...args);
    const realizeMorphStemSpec = (...args) => targetObject.realizeMorphStemSpec(...args);
    const buildLiteralMorphStemSpec = (...args) => targetObject.buildLiteralMorphStemSpec(...args);
    const applyMorphologyRules = (...args) => targetObject.applyMorphologyRules(...args);
    const buildMorphologyMetaOptions = (...args) => targetObject.buildMorphologyMetaOptions(...args);
    const resolveNominalSourceOuterSurfacePlacement = (...args) => targetObject.resolveNominalSourceOuterSurfacePlacement(...args);
    const resolvePlacedNominalStemSpec = (...args) => targetObject.resolvePlacedNominalStemSpec(...args);
    const buildOutputPrefixedChain = (...args) => targetObject.buildOutputPrefixedChain(...args);
    const buildStructuredPrefixedStemSpec = (...args) => targetObject.buildStructuredPrefixedStemSpec(...args);
    const buildPasadoRemotoStemEntries = (...args) => targetObject.buildPasadoRemotoStemEntries(...args);
    const buildCalificativoInstrumentivoPredicateStemSpec = (...args) => targetObject.buildCalificativoInstrumentivoPredicateStemSpec(...args);
    const collapseCalificativoMarkerEcho = (...args) => targetObject.collapseCalificativoMarkerEcho(...args);
    const composeProjectiveObjectPrefix = (...args) => targetObject.composeProjectiveObjectPrefix(...args);
    const getForwardDerivationConfig = (...args) => targetObject.getForwardDerivationConfig(...args);
    const getNounDerivationTypeFromMeta = (...args) => targetObject.getNounDerivationTypeFromMeta(...args);
    const normalizeRuleBase = (...args) => targetObject.normalizeRuleBase(...args);
    const getBaseObjectSlots = (...args) => targetObject.getBaseObjectSlots(...args);
    const resolveHasNonspecificValence = (...args) => targetObject.resolveHasNonspecificValence(...args);
    const getSuppletiveStemSet = (...args) => targetObject.getSuppletiveStemSet(...args);
    const stripDirectionalPrefixFromStem = (...args) => targetObject.stripDirectionalPrefixFromStem(...args);
    const applyPassiveImpersonal = (...args) => targetObject.applyPassiveImpersonal(...args);
    const getCombinedMode = (...args) => targetObject.getCombinedMode(...args);

    function getInstrumentivoResult({
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        mode,
        possessivePrefix,
    }) {
        const commonNumberSuffix = "";
        const context = buildVerbDerivedNominalBuilderContext({
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            rawVerb,
            verbMeta,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
        });
        if (context.error) {
            return { error: true };
        }
        const {
            nounSourceModel,
            directionalPrefix,
            derivedIsYawi,
            derivedIsWeya,
            derivationIsTransitive,
            resolvedDirectionalRuleMode,
            forwardStemContexts,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
        } = context;
        if (mode === INSTRUMENTIVO_MODE.absolutivo) {
            const entries = [];
            forwardStemContexts.forEach((stemContext) => {
                const nonactiveSourceChain = buildNonactiveSourceChain(
                    verbMeta,
                    stemContext.verb,
                    stemContext.analysisVerb,
                );
                const baseVerb = normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
                const nonactiveRuleBase = getNounNonactiveRuleBase(baseVerb, verbMeta);
                let options = getVisibleNonactiveDerivationOptions(baseVerb, baseVerb, {
                    isTransitive: derivationIsTransitive,
                    isYawi: derivedIsYawi,
                    ruleBase: nonactiveRuleBase,
                    rootPlusYaBase: verbMeta.rootPlusYaBase,
                });
                const selectedNonactiveSuffix = shouldForceAllNonactiveOptions() ? null : getSelectedNonactiveSuffix();
                if (selectedNonactiveSuffix && options.some((option) => option.suffix === selectedNonactiveSuffix)) {
                    options = options.filter((option) => option.suffix === selectedNonactiveSuffix);
                }
                options.forEach((option) => {
                    const rawOptionStemSpec = option?.stemSpec || buildLiteralMorphStemSpec(
                        realizeMorphStemSpec(option?.stemSpec, option?.stem || "")
                    );
                    const stemSpec = applyNonactiveSourceChainStemSpec(
                        rawOptionStemSpec,
                        option?.stem || "",
                        nonactiveSourceChain,
                        { sourceSuffix: option?.suffix || "" },
                    );
                    const stem = realizeMorphStemSpec(stemSpec, "");
                    const analysisStem = directionalPrefix && stem.startsWith(directionalPrefix)
                        ? stem.slice(directionalPrefix.length)
                        : realizeMorphStemSpec(rawOptionStemSpec, option?.stem || "");
                    const applied = applyMorphologyRules({
                        subjectPrefix,
                        objectPrefix: stemContext.morphologyObjectPrefix,
                        subjectSuffix: commonNumberSuffix,
                        verb: stem,
                        tense: "presente-habitual",
                        analysisVerb: analysisStem,
                        sourceRawVerb: rawVerb,
                        isYawi: false,
                        isWeya: false,
                        directionalPrefix,
                        directionalRuleMode: resolvedDirectionalRuleMode,
                        isNounContext: true,
                        ...buildMorphologyMetaOptions(verbMeta),
                        indirectObjectMarker: resolvedIndirectObjectMarker,
                        thirdObjectMarker: resolvedThirdObjectMarker,
                    });
                    if (!applied || !applied.verb) {
                        return;
                    }
                    const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                        sourceModel: nounSourceModel,
                        runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                        objectPrefix: applied.objectPrefix,
                        verb: applied.verb,
                        surfaceRuleMeta: applied.surfaceRuleMeta || null,
                    });
                    const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemSpec);
                    const core = buildOutputPrefixedChain({
                        subjectPrefix: applied.subjectPrefix,
                        objectPrefix: nominalSurface.objectPrefix,
                        verb: nominalSurface.verb,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    });
                    const coreStemSpec = buildStructuredPrefixedStemSpec({
                        stemSpec: placedStemSpec,
                        verb: nominalSurface.verb,
                        subjectPrefix: applied.subjectPrefix,
                        objectPrefix: nominalSurface.objectPrefix,
                        output: core,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    }) || buildLiteralMorphStemSpec(core);
                    entries.push(buildVerbDerivedNominalEntry({
                        kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
                        sourceModel: nounSourceModel,
                        verb: core,
                        subjectSuffix: applied.subjectSuffix,
                        stemSpec: coreStemSpec,
                        sourceTense: "presente-habitual",
                        provenance: {
                            nonactiveSuffix: option?.suffix || "",
                            forward: stemContext.derivationProvenance || null,
                        },
                        metadata: {
                            runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                        },
                    }));
                });
            });
            const result = buildVerbDerivedNominalResult(entries, {
                kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            });
            if (!result.result) {
                return { error: true };
            }
            return result;
        }

        const resolvedPossessivePrefix = typeof possessivePrefix === "string"
            ? possessivePrefix
            : "";
        const entries = [];
        forwardStemContexts.forEach((stemContext) => {
            const applied = applyMorphologyRules({
                subjectPrefix,
                objectPrefix: stemContext.morphologyObjectPrefix,
                subjectSuffix: commonNumberSuffix,
                verb: stemContext.verb,
                tense: "imperfecto",
                analysisVerb: stemContext.analysisVerb,
                sourceRawVerb: rawVerb,
                isYawi: derivedIsYawi,
                isWeya: derivedIsWeya,
                directionalPrefix,
                directionalRuleMode: resolvedDirectionalRuleMode,
                isNounContext: true,
                ...buildMorphologyMetaOptions(verbMeta),
                indirectObjectMarker: resolvedIndirectObjectMarker,
                thirdObjectMarker: resolvedThirdObjectMarker,
            });
            if (!applied || !applied.verb) {
                return;
            }
            const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                sourceModel: nounSourceModel,
                runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                objectPrefix: applied.objectPrefix,
                verb: applied.verb,
                surfaceRuleMeta: applied.surfaceRuleMeta || null,
            });
            const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, applied.verb, stemContext.stemSpec);
            entries.push(buildVerbDerivedNominalEntry({
                kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
                sourceModel: nounSourceModel,
                verb: nominalSurface.verb,
                subjectSuffix: applied.subjectSuffix,
                stemSpec: placedStemSpec,
                surfaceObjectPrefix: nominalSurface.objectPrefix,
                runtimeObjectPrefix: stemContext.morphologyObjectPrefix,
                surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                sourceTense: "imperfecto",
                provenance: {
                    forward: stemContext.derivationProvenance || null,
                },
            }));
        });
        const result = buildVerbDerivedNominalResult(entries, {
            kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo,
            possessivePrefix: resolvedPossessivePrefix,
            hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
            optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
        });
        if (!result.result) {
            return { error: true };
        }
        return result;
    }

    function getCalificativoInstrumentivoResult({
        rawVerb,
        verbMeta,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        possessivePrefix,
    }) {
        const context = buildVerbDerivedNominalBuilderContext({
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            rawVerb,
            verbMeta,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            requireNonanimateSubject: true,
        });
        if (context.error) {
            return { error: true };
        }
        const {
            nounSourceModel,
            directionalPrefix,
            derivedIsYawi,
            forwardStemContexts,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
        } = context;
        const resolvedPossessivePrefix = typeof possessivePrefix === "string"
            ? possessivePrefix
            : "";
        const shouldCollapseMarkerEcho = Boolean(
            getForwardDerivationConfig(getNounDerivationTypeFromMeta(verbMeta))
            && (resolvedIndirectObjectMarker || resolvedThirdObjectMarker)
        );
        const calificativoMatrixBase = normalizeRuleBase(
            verbMeta?.exactBaseVerb
            || verbMeta?.sourceBase
            || verbMeta?.canonical?.sourceBase
            || nounSourceModel?.matrixBase
            || ""
        );
        const pasadoRemotoIsTransitive = Boolean(
            getBaseObjectSlots(verbMeta) > 0
            || verbMeta?.isMarkedTransitive
            || verbMeta?.isTaFusion
        );
        const entries = [];
        forwardStemContexts.forEach((stemContext) => {
            const pasadoRemotoStemEntries = buildPasadoRemotoStemEntries({
                verb: stemContext.verb || "",
                analysisVerb: stemContext.analysisVerb || stemContext.verb || "",
                rawAnalysisVerb: stemContext.analysisVerb || stemContext.verb || "",
                sourceRawVerb: rawVerb,
                isTransitive: pasadoRemotoIsTransitive,
                directionalPrefix,
                boundPrefix: verbMeta?.hasBoundMarker ? (verbMeta?.sourcePrefix || "") : "",
                boundPrefixes: Array.isArray(verbMeta?.boundPrefixes) ? verbMeta.boundPrefixes : [],
                boundExplicitFlags: Array.isArray(verbMeta?.boundExplicitFlags) ? verbMeta.boundExplicitFlags : [],
                directionalPrefixFromSlash: verbMeta?.directionalPrefixFromSlash || "",
                sourceSplitPrefix: verbMeta?.hasBoundMarker ? (verbMeta?.sourcePrefix || "") : "",
                sourcePrefix: verbMeta?.sourcePrefix || "",
                sourceBase: verbMeta?.sourceBase || verbMeta?.canonical?.sourceBase || verbMeta?.canonicalRuleBase || "",
                sourceCompositeBase: verbMeta?.canonical?.slashCompositeRuleBase || "",
                isYawi: derivedIsYawi,
                hasImpersonalTaPrefix: verbMeta?.hasImpersonalTaPrefix === true,
                hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                hasSlashMarker: verbMeta?.hasSlashMarker === true,
                hasSuffixSeparator: verbMeta?.hasSuffixSeparator === true,
                hasLeadingDash: verbMeta?.hasLeadingDash === true,
                hasBoundMarker: verbMeta?.hasBoundMarker === true,
                hasCompoundMarker: verbMeta?.hasCompoundMarker === true,
                hasNonspecificValence: resolveHasNonspecificValence(verbMeta),
                exactBaseVerb: calificativoMatrixBase,
                suppletiveStemSet: getSuppletiveStemSet(verbMeta),
                rootPlusYaBase: verbMeta?.rootPlusYaBase || "",
                rootPlusYaBasePronounceable: verbMeta?.rootPlusYaBasePronounceable || "",
                matrixBaseOverride: calificativoMatrixBase,
            });
            if (!pasadoRemotoStemEntries.length) {
                return;
            }
            const composedObjectPrefix = composeProjectiveObjectPrefix({
                objectPrefix: stemContext.morphologyObjectPrefix,
                markers: [resolvedIndirectObjectMarker || "", resolvedThirdObjectMarker || ""],
                subjectPrefix: "",
            });
            pasadoRemotoStemEntries.forEach((pasadoRemotoEntry) => {
                const predicateStemSpec = buildCalificativoInstrumentivoPredicateStemSpec(
                    pasadoRemotoEntry.stemSpec || null,
                    pasadoRemotoEntry.verb || "",
                );
                const predicateStem = realizeMorphStemSpec(
                    predicateStemSpec,
                    `${pasadoRemotoEntry.verb || ""}ka`,
                );
                if (!predicateStem || predicateStem === "—") {
                    return;
                }
                const baseForms = [predicateStem]
                    .map((form) => collapseCalificativoMarkerEcho({
                        form,
                        morphologyObjectPrefix: composedObjectPrefix || stemContext.morphologyObjectPrefix,
                        indirectObjectMarker: resolvedIndirectObjectMarker,
                        thirdObjectMarker: resolvedThirdObjectMarker,
                        enable: shouldCollapseMarkerEcho,
                    }));
                if (!baseForms.length) {
                    return;
                }
                baseForms.forEach((form) => {
                    const baseStemSpec = (
                        form === predicateStem
                        && predicateStemSpec
                        && typeof predicateStemSpec === "object"
                        && predicateStemSpec.kind
                    )
                        ? predicateStemSpec
                        : buildLiteralMorphStemSpec(form);
                    const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                        sourceModel: nounSourceModel,
                        runtimeObjectPrefix: composedObjectPrefix || stemContext.morphologyObjectPrefix,
                        objectPrefix: composedObjectPrefix || "",
                        verb: form,
                        surfaceRuleMeta: null,
                    });
                    const placedStemSpec = resolvePlacedNominalStemSpec(nominalSurface, form, baseStemSpec);
                    const objectChainForm = buildOutputPrefixedChain({
                        objectPrefix: nominalSurface.objectPrefix,
                        verb: nominalSurface.verb,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    });
                    const objectChainStemSpec = buildStructuredPrefixedStemSpec({
                        stemSpec: placedStemSpec,
                        verb: nominalSurface.verb,
                        subjectPrefix: "",
                        objectPrefix: nominalSurface.objectPrefix,
                        output: objectChainForm,
                        hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
                        optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
                        surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    }) || buildLiteralMorphStemSpec(objectChainForm);
                    entries.push(buildVerbDerivedNominalEntry({
                        kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
                        sourceModel: nounSourceModel,
                        verb: objectChainForm,
                        subjectSuffix: "",
                        stemSpec: objectChainStemSpec,
                        trailingSuffix: resolvedPossessivePrefix === "" ? "yut" : "",
                        sourceTense: "pasado-remoto",
                        provenance: {
                            pasadoRemotoEntry,
                            forward: stemContext.derivationProvenance || null,
                        },
                    }));
                });
            });
        });
        const result = buildVerbDerivedNominalResult(entries, {
            kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo,
            possessivePrefix: resolvedPossessivePrefix,
            hasOptionalSupportiveI: verbMeta?.hasOptionalSupportiveI === true,
            optionalSupportiveLetter: verbMeta?.optionalSupportiveLetter || "",
        });
        if (!result.result) {
            return { error: true };
        }
        return result;
    }

    function getLocativoTemporalResult({
        rawVerb,
        verbMeta,
        objectPrefix,
        indirectObjectMarker = "",
        thirdObjectMarker = "",
        possessivePrefix,
        combinedMode,
    }) {
        const resolvedMode = combinedMode || getCombinedMode();
        const isNonactive = resolvedMode === COMBINED_MODE.nonactive;
        const context = buildVerbDerivedNominalBuilderContext({
            kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            rawVerb,
            verbMeta,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            combinedMode: resolvedMode,
        });
        if (context.error) {
            return { error: true };
        }
        const {
            nounSourceModel,
            directionalPrefix,
            derivedIsYawi,
            derivedIsWeya,
            derivationIsTransitive,
            resolvedDirectionalRuleMode,
            forwardStemContexts,
            objectPrefix: resolvedObjectPrefix,
            indirectObjectMarker: resolvedIndirectObjectMarker,
            thirdObjectMarker: resolvedThirdObjectMarker,
        } = context;
        const possessorInput = typeof possessivePrefix === "string" ? possessivePrefix : "";
        const isImpersonal = isNonactive && !possessorInput;
        const entries = [];
        forwardStemContexts.forEach((stemContext) => {
            let nonactiveStemSpecs = [stemContext.stemSpec || buildLiteralMorphStemSpec(stemContext.verb)];
            if (isNonactive) {
                const nonactiveSourceChain = buildNonactiveSourceChain(
                    verbMeta,
                    stemContext.verb,
                    stemContext.analysisVerb,
                );
                const nonactiveBaseVerb = normalizeDerivationStemValue(nonactiveSourceChain?.baseVerb || "");
                const nonactiveRuleBase = getNounNonactiveRuleBase(nonactiveBaseVerb, verbMeta);
                const selection = resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
                    isTransitive: derivationIsTransitive,
                    isYawi: derivedIsYawi,
                    forceAll: shouldForceAllNonactiveOptions(),
                    ruleBase: nonactiveRuleBase,
                    rootPlusYaBase: verbMeta.rootPlusYaBase,
                });
                const selectedStemSpecList = Array.isArray(selection.selectedStemSpecs)
                    ? selection.selectedStemSpecs.filter(Boolean)
                    : [];
                const rawStemSpecs = (!selection.selectedSuffix && Array.isArray(selection.allStemSpecs) && selection.allStemSpecs.length > 1)
                    ? selection.allStemSpecs
                    : ((selection.selectedSuffix && selectedStemSpecList.length > 1)
                        ? selectedStemSpecList
                        : [selection.selectedStemSpec || buildLiteralMorphStemSpec(selection.selectedStem)]);
                nonactiveStemSpecs = rawStemSpecs
                    .map((spec, index) => applyNonactiveSourceChainStemSpec(
                        spec,
                        Array.isArray(selection.selectedStems) ? selection.selectedStems[index] || selection.selectedStem || "" : selection.selectedStem || "",
                        nonactiveSourceChain,
                        { sourceSuffix: selection.selectedSuffix || "" },
                    ))
                    .filter(Boolean);
            }
            const nonactiveStemEntries = (nonactiveStemSpecs || [])
                .map((spec) => ({
                    stemSpec: spec,
                    stem: realizeMorphStemSpec(spec, ""),
                }))
                .filter((entry) => Boolean(entry.stem));
            if (!nonactiveStemEntries.length) {
                return;
            }
            let sourceObjectPrefix = resolvedObjectPrefix;
            if (isNonactive) {
                const passive = applyPassiveImpersonal({
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: resolvedObjectPrefix,
                    analysisVerb: stripDirectionalPrefixFromStem(nonactiveStemEntries[0].stem, directionalPrefix),
                });
                sourceObjectPrefix = passive.objectPrefix;
            }
            const locativeObjectPrefix = sourceObjectPrefix === resolvedObjectPrefix
                ? stemContext.morphologyObjectPrefix
                : sourceObjectPrefix;
            nonactiveStemEntries.forEach(({ stemSpec, stem }) => {
                const stemAnalysisLocal = stripDirectionalPrefixFromStem(stem, directionalPrefix);
                const applied = applyMorphologyRules({
                    subjectPrefix: "",
                    objectPrefix: locativeObjectPrefix,
                    subjectSuffix: "",
                    verb: stem,
                    tense: "imperfecto",
                    analysisVerb: stemAnalysisLocal,
                    sourceRawVerb: rawVerb,
                    isYawi: isNonactive ? false : derivedIsYawi,
                    isWeya: isNonactive ? false : derivedIsWeya,
                    directionalPrefix,
                    directionalRuleMode: resolvedDirectionalRuleMode,
                    isNounContext: true,
                    ...buildMorphologyMetaOptions(verbMeta),
                    indirectObjectMarker: resolvedIndirectObjectMarker,
                    thirdObjectMarker: resolvedThirdObjectMarker,
                });
                if (!applied || !applied.verb) {
                    return;
                }
                const nominalSurface = resolveNominalSourceOuterSurfacePlacement({
                    sourceModel: nounSourceModel,
                    runtimeObjectPrefix: locativeObjectPrefix,
                    objectPrefix: applied.objectPrefix,
                    verb: applied.verb,
                    surfaceRuleMeta: applied.surfaceRuleMeta || null,
                });
                const placedStemSpec = resolvePlacedNominalStemSpec(
                    nominalSurface,
                    applied.verb,
                    isNonactive ? stemSpec : null
                );
                entries.push(buildVerbDerivedNominalEntry({
                    kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
                    sourceModel: nounSourceModel,
                    verb: nominalSurface.verb,
                    subjectSuffix: applied.subjectSuffix,
                    stemSpec: placedStemSpec,
                    runtimeObjectPrefix: locativeObjectPrefix,
                    surfaceObjectPrefix: nominalSurface.objectPrefix,
                    surfaceRuleMeta: nominalSurface.surfaceRuleMeta || null,
                    trailingSuffix: "n",
                    sourceTense: isNonactive ? "imperfecto-no-activo" : "imperfecto",
                    provenance: {
                        forward: stemContext.derivationProvenance || null,
                    },
                }));
            });
        });
        const result = buildVerbDerivedNominalResult(entries, {
            kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal,
            possessivePrefix: possessorInput,
        });
        if (!result.result) {
            return { error: true };
        }
        return {
            ...result,
            possessorPrefix: possessorInput,
            isImpersonal,
        };
    }

    return {
        getInstrumentivoResult,
        getCalificativoInstrumentivoResult,
        getLocativoTemporalResult,
    };
}

export function installNncGlobals(targetObject = globalThis) {
    const api = createNncApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
