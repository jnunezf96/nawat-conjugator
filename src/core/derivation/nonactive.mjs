export function createNonactiveDerivationApi(targetObject = globalThis) {
    function getPrimaryNonactiveSelectionStem(entry) {
        if (!entry) {
            return "";
        }
        if (entry.selectedStem) {
            return entry.selectedStem;
        }
        if (Array.isArray(entry.selectedStems) && entry.selectedStems.length) {
            return entry.selectedStems[0];
        }
        if (Array.isArray(entry.allStems) && entry.allStems.length) {
            return entry.allStems[0];
        }
        return "";
    }

    function getPrimaryNonactiveSelectionStemSpec(entry) {
        if (!entry) {
            return null;
        }
        if (entry.selectedStemSpec) {
            return entry.selectedStemSpec;
        }
        if (Array.isArray(entry.selectedStemSpecs) && entry.selectedStemSpecs.length) {
            return entry.selectedStemSpecs[0];
        }
        if (Array.isArray(entry.allStemSpecs) && entry.allStemSpecs.length) {
            return entry.allStemSpecs[0];
        }
        const primaryStem = getPrimaryNonactiveSelectionStem(entry);
        return primaryStem ? targetObject.buildLiteralMorphStemSpec(primaryStem) : null;
    }

    function buildPrefixedNonactiveSelectionEntry({
        selection = null,
        prefix = "",
        directionalPrefix = "",
        nonactiveObjectSlots = null,
    }) {
        const withPrefixSpec = (spec = null, fallbackStem = "") => {
            const resolvedSpec = (
                spec
                && typeof spec === "object"
                && spec.kind
            ) ? spec : (fallbackStem ? targetObject.buildLiteralMorphStemSpec(fallbackStem) : null);
            if (!resolvedSpec) {
                return null;
            }
            if (!prefix) {
                return resolvedSpec;
            }
            return targetObject.buildPrependMorphStemSpec(resolvedSpec, prefix, {
                sourceBase: prefix,
                sourceSuffix: selection?.selectedSuffix || "",
            });
        };
        const selectedStemSpec = withPrefixSpec(
            selection?.selectedStemSpec || null,
            selection?.selectedStem || ""
        );
        const selectedStemSpecs = targetObject.getUniqueMorphStemSpecs(
            (Array.isArray(selection?.selectedStemSpecs) ? selection.selectedStemSpecs : [])
                .map((spec, index) => withPrefixSpec(
                    spec,
                    Array.isArray(selection?.selectedStems) ? selection.selectedStems[index] || "" : ""
                ))
        );
        const allStemSpecs = targetObject.getUniqueMorphStemSpecs(
            (Array.isArray(selection?.allStemSpecs) ? selection.allStemSpecs : [])
                .map((spec, index) => withPrefixSpec(
                    spec,
                    Array.isArray(selection?.allStems) ? selection.allStems[index] || "" : ""
                ))
        );
        return {
            selectedStem: targetObject.realizeMorphStemSpec(selectedStemSpec, ""),
            selectedStemSpec,
            selectedStems: selectedStemSpecs.map((spec) => targetObject.realizeMorphStemSpec(spec)).filter(Boolean),
            selectedStemSpecs,
            allStems: allStemSpecs.map((spec) => targetObject.realizeMorphStemSpec(spec)).filter(Boolean),
            allStemSpecs,
            selectedSuffix: selection?.selectedSuffix || "",
            directionalPrefix: directionalPrefix || "",
            nonactiveObjectSlots,
        };
    }

    function stripBoundSourcePrefixFromNonactiveBase(baseVerb = "", sourcePrefix = "", verbMeta = null) {
        const base = String(baseVerb || "");
        const prefix = String(sourcePrefix || "");
        if (!base || !prefix || !verbMeta?.hasBoundMarker || !base.startsWith(prefix)) {
            return base;
        }
        const splitSource = targetObject.resolveCanonicalSourceSplit(verbMeta, {
            verb: verbMeta?.verb || "",
            analysisVerb: verbMeta?.analysisVerb || base,
        });
        const matrixBase = targetObject.normalizeRuleBase(splitSource?.matrixBase || "");
        if (matrixBase && targetObject.normalizeRuleBase(base) === matrixBase) {
            return base;
        }
        const stripped = base.slice(prefix.length);
        return stripped || base;
    }

    function resolveDerivedNonactiveSelectionEntry({
        stem = "",
        parsedVerb = null,
        objectPrefix = "",
        nonactiveIsTransitive = false,
        isYawi = false,
        forceAllNonactiveOptions = false,
    }) {
        const key = String(stem || "").toLowerCase();
        if (!key) {
            return null;
        }
        const info = targetObject.BASIC_DATA_CANONICAL_MAP.get(key);
        const parsedMatch = info ? (info.transitiveParsed || info.intransitiveParsed) : null;
        const sourceVerb = parsedMatch ? parsedMatch.verb : stem;
        const sourceAnalysisVerb = parsedMatch ? parsedMatch.analysisVerb : stem;
        const sourceMeta = parsedMatch || null;
        const matchSource = parsedMatch
            ? targetObject.getNonactiveDerivationSource(
                sourceMeta,
                sourceVerb,
                sourceAnalysisVerb
            )
            : {
                baseVerb: sourceAnalysisVerb || sourceVerb,
                prefix: "",
                chain: {
                    baseVerb: sourceAnalysisVerb || sourceVerb,
                    prefix: "",
                    prefixParts: [],
                },
            };
        const matchBaseVerb = parsedMatch
            ? stripBoundSourcePrefixFromNonactiveBase(
                matchSource.baseVerb || "",
                matchSource.prefix || "",
                sourceMeta,
            )
            : targetObject.normalizeRuleBase(sourceAnalysisVerb || sourceVerb);
        const matchRuleBase = targetObject.normalizeRuleBase(matchBaseVerb || "");
        const matchIsTransitive = parsedMatch
            ? targetObject.isNonactiveTransitiveVerb(objectPrefix, parsedMatch)
            : nonactiveIsTransitive;
        const matchSelection = targetObject.resolveNonactiveStemSelection(matchBaseVerb, matchBaseVerb, {
            isTransitive: matchIsTransitive,
            isYawi: parsedMatch ? parsedMatch.isYawi : isYawi,
            forceAll: forceAllNonactiveOptions,
            ruleBase: matchRuleBase,
            rootPlusYaBase: parsedMatch
                ? parsedMatch.rootPlusYaBase
                : parsedVerb?.rootPlusYaBase,
        });
        const matchSummary = targetObject.getVerbValencySummary(parsedMatch || parsedVerb);
        const entry = buildPrefixedNonactiveSelectionEntry({
            selection: matchSelection,
            prefix: parsedMatch ? (matchSource.prefix || "") : "",
            directionalPrefix: (parsedMatch ? parsedMatch.directionalPrefix : parsedVerb?.directionalPrefix) || "",
            nonactiveObjectSlots: matchSummary.nonactiveObjectSlots,
        });
        return { key, entry };
    }

    function getNonactiveSelectionEntry(selectionByStem, stem) {
        const key = String(stem || "").toLowerCase();
        if (!key) {
            return null;
        }
        return selectionByStem.get(key) || null;
    }

    function resolveNonactiveAllStems({
        selection,
        selectionHasPrefixedStems = false,
        syncedAllStems = null,
        syncedSelectedStems = null,
        applyPrefix = (value) => value,
    }) {
        let nonactiveAllStems = null;
        const selectedStems = Array.isArray(selection?.selectedStems)
            ? selection.selectedStems.filter(Boolean)
            : [];
        const selectedStemVariants = selectionHasPrefixedStems
            ? (
                (syncedSelectedStems && syncedSelectedStems.length)
                    ? syncedSelectedStems
                    : selectedStems
            )
            : selectedStems;
        if (selectionHasPrefixedStems && selectedStemVariants.length > 1) {
            nonactiveAllStems = selectedStemVariants;
        } else if (!selection?.selectedSuffix && Array.isArray(selection?.allStems) && selection.allStems.length > 1) {
            if (selectionHasPrefixedStems) {
                const stems = syncedAllStems && syncedAllStems.length ? syncedAllStems : selection.allStems;
                nonactiveAllStems = stems;
            } else {
                nonactiveAllStems = selection.allStems.map((stem) => applyPrefix(stem));
            }
        } else if (selection?.selectedSuffix && selectedStemVariants.length > 1) {
            if (selectionHasPrefixedStems) {
                nonactiveAllStems = selectedStemVariants;
            } else {
                nonactiveAllStems = selectedStemVariants.map((stem) => applyPrefix(stem));
            }
        }
        return nonactiveAllStems;
    }

    function resolveNonactiveAllStemSpecs({
        selection,
        selectionHasPrefixedStems = false,
        syncedAllStemSpecs = null,
        syncedSelectedStemSpecs = null,
        applyPrefixSpec = (value) => value,
    }) {
        let nonactiveAllStemSpecs = null;
        const selectedStemSpecs = Array.isArray(selection?.selectedStemSpecs)
            ? selection.selectedStemSpecs.filter(Boolean)
            : [];
        const selectedStemSpecVariants = selectionHasPrefixedStems
            ? (
                (syncedSelectedStemSpecs && syncedSelectedStemSpecs.length)
                    ? syncedSelectedStemSpecs
                    : selectedStemSpecs
            )
            : selectedStemSpecs;
        if (selectionHasPrefixedStems && selectedStemSpecVariants.length > 1) {
            nonactiveAllStemSpecs = selectedStemSpecVariants;
        } else if (!selection?.selectedSuffix && Array.isArray(selection?.allStemSpecs) && selection.allStemSpecs.length > 1) {
            if (selectionHasPrefixedStems) {
                const specs = syncedAllStemSpecs && syncedAllStemSpecs.length
                    ? syncedAllStemSpecs
                    : selection.allStemSpecs;
                nonactiveAllStemSpecs = specs;
            } else {
                nonactiveAllStemSpecs = selection.allStemSpecs
                    .map((spec) => applyPrefixSpec(spec))
                    .filter(Boolean);
            }
        } else if (selection?.selectedSuffix && selectedStemSpecVariants.length > 1) {
            if (selectionHasPrefixedStems) {
                nonactiveAllStemSpecs = selectedStemSpecVariants;
            } else {
                nonactiveAllStemSpecs = selectedStemSpecVariants
                    .map((spec) => applyPrefixSpec(spec))
                    .filter(Boolean);
            }
        }
        return nonactiveAllStemSpecs ? targetObject.getUniqueMorphStemSpecs(nonactiveAllStemSpecs) : null;
    }

    function applyNonactiveDerivation({
        isNonactive,
        verb,
        analysisVerb,
        objectPrefix,
        parsedVerb,
        directionalPrefix,
        derivationType,
        causativeAllStems,
        applicativeAllStems,
        isYawi,
        suppletiveStemSet,
        preferredNonactiveBaseVerb = "",
        preferredNonactiveSourceMeta = null,
        preferredNonactiveSourcePrefix = "",
    }) {
        if (!isNonactive) {
            return {
                verb,
                analysisVerb,
                isYawi,
                nonactiveAllStems: null,
                nonactiveObjectPrefixOverride: null,
                nonactiveIndirectMarkerOverride: null,
                suppletiveStemSet,
            };
        }
        suppletiveStemSet = null;
        const nonactiveIsTransitive = targetObject.isNonactiveTransitiveVerb(objectPrefix, parsedVerb);
        const effectiveSourceMeta = preferredNonactiveSourceMeta || parsedVerb;
        const nonactiveSource = preferredNonactiveBaseVerb
            ? {
                baseVerb: preferredNonactiveBaseVerb,
                prefix: typeof preferredNonactiveSourcePrefix === "string"
                    ? preferredNonactiveSourcePrefix
                    : "",
                chain: {
                    baseVerb: preferredNonactiveBaseVerb,
                    prefix: typeof preferredNonactiveSourcePrefix === "string"
                        ? preferredNonactiveSourcePrefix
                        : "",
                    prefixParts: preferredNonactiveSourcePrefix ? [preferredNonactiveSourcePrefix] : [],
                },
            }
            : targetObject.getNonactiveDerivationSource(parsedVerb, verb, analysisVerb);
        const nonactiveSourceChain = nonactiveSource.chain || targetObject.buildNonactiveSourceChain(
            effectiveSourceMeta,
            verb,
            analysisVerb,
        );
        const nonactiveBaseVerb = nonactiveSourceChain?.baseVerb || stripBoundSourcePrefixFromNonactiveBase(
            nonactiveSource.baseVerb || "",
            nonactiveSource.prefix || "",
            effectiveSourceMeta,
        );
        const forwardDerivationConfig = targetObject.getForwardDerivationConfig(derivationType);
        const derivedStemPoolByField = { causativeAllStems, applicativeAllStems };
        const shouldUseDerivedRuleBase = !!forwardDerivationConfig;
        const forceAllNonactiveOptions = targetObject.shouldForceAllNonactiveOptions();
        const nonactiveRuleSource = targetObject.buildNonactiveRuleSourceContext(
            verb,
            analysisVerb,
            {
                verbMeta: effectiveSourceMeta || parsedVerb,
                parsedVerb: parsedVerb || effectiveSourceMeta,
                nonactiveSourceChain,
                matrixBase: nonactiveBaseVerb,
                ...(shouldUseDerivedRuleBase && {
                    ruleBase: targetObject.normalizeRuleBase(nonactiveBaseVerb || ""),
                }),
                isTransitive: nonactiveIsTransitive,
                isYawi,
                rootPlusYaBase: effectiveSourceMeta?.rootPlusYaBase || parsedVerb?.rootPlusYaBase,
            }
        );
        const nonactiveRuleBase = nonactiveRuleSource.ruleBase;
        let selection = targetObject.resolveNonactiveStemSelection(nonactiveBaseVerb, nonactiveBaseVerb, {
            isTransitive: nonactiveIsTransitive,
            isYawi,
            forceAll: forceAllNonactiveOptions,
            ruleBase: nonactiveRuleBase,
            rootPlusYaBase: effectiveSourceMeta?.rootPlusYaBase || parsedVerb?.rootPlusYaBase,
            verbMeta: effectiveSourceMeta || parsedVerb,
            parsedVerb: parsedVerb || effectiveSourceMeta,
            nonactiveSourceChain,
            nonactiveRuleSource,
        });
        let resolvedDirectionalPrefix = directionalPrefix;
        let selectionHasPrefixedStems = false;
        let syncedAllStems = null;
        let syncedSelectedStems = null;
        let syncedAllStemSpecs = null;
        let syncedSelectedStemSpecs = null;
        let nonactiveObjectPrefixOverride = null;
        let nonactiveIndirectMarkerOverride = null;
        const selectedStemMatchesBareNonactiveBase = targetObject.normalizeDerivationStemValue(
            selection?.selectedStem || ""
        ) === targetObject.normalizeDerivationStemValue(nonactiveBaseVerb || "");
        const shouldRetrySupportiveSurfaceSelection = Boolean(
            parsedVerb?.hasOptionalSupportiveI === true
            && !selection?.selectedSuffix
            && selectedStemMatchesBareNonactiveBase
            && (verb || analysisVerb)
        );
        if (shouldRetrySupportiveSurfaceSelection) {
            const supportiveSurfaceSelection = targetObject.resolveNonactiveStemSelection(
                verb || analysisVerb || nonactiveBaseVerb,
                analysisVerb || verb || nonactiveBaseVerb,
                {
                    isTransitive: nonactiveIsTransitive,
                    isYawi,
                    forceAll: forceAllNonactiveOptions,
                    ruleBase: nonactiveRuleBase,
                    rootPlusYaBase: effectiveSourceMeta?.rootPlusYaBase || parsedVerb?.rootPlusYaBase,
                    parsedVerb,
                    verbMeta: effectiveSourceMeta || parsedVerb,
                    nonactiveSourceChain,
                    nonactiveRuleSource,
                }
            );
            const supportiveSelectedStem = targetObject.normalizeDerivationStemValue(
                supportiveSurfaceSelection?.selectedStem || ""
            );
            if (
                supportiveSelectedStem
                && supportiveSelectedStem !== targetObject.normalizeDerivationStemValue(nonactiveBaseVerb || "")
            ) {
                selection = supportiveSurfaceSelection;
                selectionHasPrefixedStems = true;
            }
        }
        if (
            !selectionHasPrefixedStems
            && selection?.selectedRealizedStemSpec
        ) {
            selection = {
                ...selection,
                selectedStem: selection.selectedRealizedStem || selection.selectedStem,
                selectedStemSpec: selection.selectedRealizedStemSpec || selection.selectedStemSpec,
                selectedStems: Array.isArray(selection.selectedRealizedStems) && selection.selectedRealizedStems.length
                    ? selection.selectedRealizedStems
                    : selection.selectedStems,
                selectedStemSpecs: Array.isArray(selection.selectedRealizedStemSpecs) && selection.selectedRealizedStemSpecs.length
                    ? selection.selectedRealizedStemSpecs
                    : selection.selectedStemSpecs,
                allStems: Array.isArray(selection.allRealizedStems) && selection.allRealizedStems.length
                    ? selection.allRealizedStems
                    : selection.allStems,
                allStemSpecs: Array.isArray(selection.allRealizedStemSpecs) && selection.allRealizedStemSpecs.length
                    ? selection.allRealizedStemSpecs
                    : selection.allStemSpecs,
            };
            selectionHasPrefixedStems = true;
        }
        const isDerivedSyncType = !!forwardDerivationConfig;
        const derivedAllStems = isDerivedSyncType
            ? targetObject.getDerivedStemPoolValue(forwardDerivationConfig.resultField, derivedStemPoolByField)
            : null;
        if (
            isDerivedSyncType
            && targetObject.BASIC_DATA_CANONICAL_MAP.size
            && Array.isArray(derivedAllStems)
            && derivedAllStems.length
        ) {
            const selectionByStem = new Map();
            const unique = targetObject.uniqueNonEmptyValues;
            derivedAllStems.forEach((stem) => {
                const resolvedEntry = resolveDerivedNonactiveSelectionEntry({
                    stem,
                    parsedVerb,
                    objectPrefix,
                    nonactiveIsTransitive,
                    isYawi,
                    forceAllNonactiveOptions,
                });
                if (!resolvedEntry) {
                    return;
                }
                selectionByStem.set(resolvedEntry.key, resolvedEntry.entry);
            });
            const orderedOneToOneStems = unique(
                derivedAllStems.map((stem) => {
                    const entry = getNonactiveSelectionEntry(selectionByStem, stem);
                    if (!entry) {
                        return "";
                    }
                    return getPrimaryNonactiveSelectionStem(entry);
                })
            );
            const orderedOneToOneStemSpecs = targetObject.getUniqueMorphStemSpecs(
                derivedAllStems.map((stem) => {
                    const entry = getNonactiveSelectionEntry(selectionByStem, stem);
                    return entry ? getPrimaryNonactiveSelectionStemSpec(entry) : null;
                })
            );
            const matchedSelection = getNonactiveSelectionEntry(selectionByStem, verb);
            if (matchedSelection) {
                const matchedPrimaryStem = getPrimaryNonactiveSelectionStem(matchedSelection);
                const matchedPrimaryStemSpec = getPrimaryNonactiveSelectionStemSpec(matchedSelection);
                selection = {
                    selectedStem: matchedPrimaryStem,
                    selectedStemSpec: matchedPrimaryStemSpec,
                    selectedStems: matchedPrimaryStem ? [matchedPrimaryStem] : [],
                    selectedStemSpecs: matchedPrimaryStemSpec ? [matchedPrimaryStemSpec] : [],
                    allStems: matchedPrimaryStem ? [matchedPrimaryStem] : [],
                    allStemSpecs: matchedPrimaryStemSpec ? [matchedPrimaryStemSpec] : [],
                    selectedSuffix: matchedSelection.selectedSuffix,
                };
                selectionHasPrefixedStems = true;
                resolvedDirectionalPrefix = matchedSelection.directionalPrefix || resolvedDirectionalPrefix;
                const shouldForceZeroNonactiveObjects = targetObject.getDerivationValencyDelta(derivationType) <= 0
                    && Number.isFinite(matchedSelection.nonactiveObjectSlots)
                    && matchedSelection.nonactiveObjectSlots <= 0;
                if (shouldForceZeroNonactiveObjects) {
                    nonactiveObjectPrefixOverride = "";
                    nonactiveIndirectMarkerOverride = "";
                }
                syncedAllStems = orderedOneToOneStems;
                syncedSelectedStems = orderedOneToOneStems;
                syncedAllStemSpecs = orderedOneToOneStemSpecs;
                syncedSelectedStemSpecs = orderedOneToOneStemSpecs;
            }
        }
        const nonactiveChainPolicy = parsedVerb?.hasNonspecificValence
            ? { ...targetObject.FULL_SOURCE_CHAIN_REALIZATION_POLICY, preserveSupportive: false }
            : targetObject.FULL_SOURCE_CHAIN_REALIZATION_POLICY;
        const applyPrefixSpec = (stemSpec = null, fallbackStem = "") => {
            const resolvedSpec = (
                stemSpec
                && typeof stemSpec === "object"
                && stemSpec.kind
            ) ? stemSpec : (fallbackStem ? targetObject.buildLiteralMorphStemSpec(fallbackStem) : null);
            if (!resolvedSpec) {
                return null;
            }
            if (selectionHasPrefixedStems) {
                return resolvedSpec;
            }
            return targetObject.applyNonactiveSourceChainStemSpec(
                resolvedSpec,
                fallbackStem,
                nonactiveSourceChain,
                { sourceSuffix: selection?.selectedSuffix || "", policy: nonactiveChainPolicy },
            );
        };
        const applyPrefix = (stem) => (
            selectionHasPrefixedStems
                ? stem
                : targetObject.realizeNonactiveSourceChainStem(stem, nonactiveSourceChain, nonactiveChainPolicy)
        );
        const selectedStemSpec = applyPrefixSpec(selection.selectedStemSpec, selection.selectedStem || "");
        verb = selectedStemSpec
            ? targetObject.realizeMorphStemSpec(selectedStemSpec, "")
            : (selection.selectedStem ? applyPrefix(selection.selectedStem) : "");
        analysisVerb = verb;
        const nonactiveAllStemSpecs = resolveNonactiveAllStemSpecs({
            selection,
            selectionHasPrefixedStems,
            syncedAllStemSpecs,
            syncedSelectedStemSpecs,
            applyPrefixSpec,
        });
        const nonactiveAllStems = resolveNonactiveAllStems({
            selection,
            selectionHasPrefixedStems,
            syncedAllStems,
            syncedSelectedStems,
            applyPrefix,
        });
        if (resolvedDirectionalPrefix && verb.startsWith(resolvedDirectionalPrefix)) {
            analysisVerb = verb.slice(resolvedDirectionalPrefix.length);
        }
        return {
            verb,
            analysisVerb,
            isYawi: false,
            nonactiveAllStems,
            nonactiveAllStemSpecs,
            nonactiveSelectedStemSpec: selectedStemSpec,
            suppletiveStemSet,
            nonactiveObjectPrefixOverride,
            nonactiveIndirectMarkerOverride,
        };
    }

    return {
        getPrimaryNonactiveSelectionStem,
        getPrimaryNonactiveSelectionStemSpec,
        buildPrefixedNonactiveSelectionEntry,
        stripBoundSourcePrefixFromNonactiveBase,
        resolveDerivedNonactiveSelectionEntry,
        getNonactiveSelectionEntry,
        resolveNonactiveAllStems,
        resolveNonactiveAllStemSpecs,
        applyNonactiveDerivation,
    };
}

export function installNonactiveDerivationGlobals(targetObject = globalThis) {
    const api = createNonactiveDerivationApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
