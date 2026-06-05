export function createGenerationRuntimeSupportApi(targetObject = globalThis) {
    function buildNoStemMaskResult({
        shouldMask = false,
        silent = false,
        renderVerb = "",
        objectPrefix = "",
        tense = "",
        isReflexive = false,
    }) {
        if (!shouldMask) {
            return null;
        }
        if (!silent) {
            targetObject.renderAllOutputs({
                verb: renderVerb,
                objectPrefix,
                tense,
            });
        }
        return { result: "—", surfaceForms: [], isReflexive };
    }

    function applyForwardStageForGenerate({
        derivationType = "",
        enabled = false,
        derivationOptions = null,
        silent = false,
        renderVerb = "",
        baseObjectPrefix = "",
        tense = "",
        isReflexive = false,
    }) {
        const stage = targetObject.applySelectedForwardDerivation({
            derivationType,
            derivationOptions,
            enabled,
        });
        const noStemMask = buildNoStemMaskResult({
            shouldMask: stage.blocked,
            silent,
            renderVerb,
            objectPrefix: baseObjectPrefix,
            tense,
            isReflexive,
        });
        const config = targetObject.getForwardDerivationConfig(derivationType);
        return {
            stage,
            noStemMask,
            derivedStems: config?.resultField ? stage[config.resultField] : null,
            derivedStemSpecs: config?.resultSpecField ? stage[config.resultSpecField] : null,
        };
    }

    function applyGenerateForwardDerivations({
        resolvedDerivationType = "",
        buildDerivationOptions = () => ({}),
        silent = false,
        renderVerb = "",
        baseObjectPrefix = "",
        tense = "",
        isReflexive = false,
        initialState = null,
    }) {
        let {
            verb = "",
            analysisVerb = "",
            isYawi = false,
            suppletiveStemSet = null,
        } = initialState || {};
        const derivedStemPoolByField = {
            causativeAllStems: null,
            applicativeAllStems: null,
        };
        const derivedStemSpecPoolByField = {
            causativeAllStemSpecs: null,
            applicativeAllStemSpecs: null,
        };
        const selectedForwardMetaByType = {
            [targetObject.DERIVATION_TYPE?.causative]: null,
            [targetObject.DERIVATION_TYPE?.applicative]: null,
        };

        const applyStage = (derivationType, enabled) => {
            const stageResult = applyForwardStageForGenerate({
                derivationType,
                derivationOptions: buildDerivationOptions({
                    verb,
                    analysisVerb,
                    isYawi,
                    suppletiveStemSet,
                }),
                enabled,
                silent,
                renderVerb,
                baseObjectPrefix,
                tense,
                isReflexive,
            });
            const stageState = targetObject.extractForwardDerivationState(stageResult.stage, {
                verb,
                analysisVerb,
                isYawi,
                suppletiveStemSet,
            });
            verb = stageState.verb;
            analysisVerb = stageState.analysisVerb;
            isYawi = stageState.isYawi;
            suppletiveStemSet = stageState.suppletiveStemSet;
            return stageResult;
        };

        for (const stageType of targetObject.FORWARD_DERIVATION_STAGE_ORDER || []) {
            const stageResult = applyStage(
                stageType,
                resolvedDerivationType === stageType,
            );
            if (stageResult.noStemMask) {
                return { noStemMask: stageResult.noStemMask };
            }
            const config = targetObject.getForwardDerivationConfig(stageType);
            if (config?.resultField) {
                derivedStemPoolByField[config.resultField] = stageResult.derivedStems;
            }
            if (config?.resultSpecField) {
                derivedStemSpecPoolByField[config.resultSpecField] = stageResult.derivedStemSpecs;
            }
            selectedForwardMetaByType[stageType] = stageResult.stage?.selectedForwardMeta || null;
        }

        return {
            noStemMask: null,
            verb,
            analysisVerb,
            isYawi,
            suppletiveStemSet,
            causativeAllStems: derivedStemPoolByField.causativeAllStems,
            applicativeAllStems: derivedStemPoolByField.applicativeAllStems,
            causativeAllStemSpecs: derivedStemSpecPoolByField.causativeAllStemSpecs,
            applicativeAllStemSpecs: derivedStemSpecPoolByField.applicativeAllStemSpecs,
            causativeSelectionMeta: selectedForwardMetaByType[targetObject.DERIVATION_TYPE?.causative] || null,
            applicativeSelectionMeta: selectedForwardMetaByType[targetObject.DERIVATION_TYPE?.applicative] || null,
        };
    }

    function applySuppletiveYawiPrefixToStemSet(suppletiveStemSet, applyPrefix) {
        if (!suppletiveStemSet || typeof applyPrefix !== "function") {
            return suppletiveStemSet;
        }
        const prefixedVariants = new Map();
        suppletiveStemSet.variantsByClass.forEach((variants, classKey) => {
            prefixedVariants.set(
                classKey,
                variants.map((variant) => ({ ...variant, base: applyPrefix(variant.base) }))
            );
        });
        return {
            ...suppletiveStemSet,
            imperfective: {
                verb: applyPrefix(suppletiveStemSet.imperfective?.verb || ""),
                analysisVerb: suppletiveStemSet.imperfective?.analysisVerb || "",
            },
            variantsByClass: prefixedVariants,
        };
    }

    function applyNonactiveGenerateOverrides({
        nonactiveDerivation,
        objectPrefix,
        morphologyObjectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        isReflexive,
    }) {
        if (nonactiveDerivation?.nonactiveObjectPrefixOverride == null) {
            return {
                objectPrefix,
                morphologyObjectPrefix,
                baseObjectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                isReflexive,
            };
        }
        const overriddenObjectPrefix = nonactiveDerivation.nonactiveObjectPrefixOverride;
        return {
            objectPrefix: overriddenObjectPrefix,
            morphologyObjectPrefix: overriddenObjectPrefix,
            baseObjectPrefix: overriddenObjectPrefix,
            indirectObjectMarker: nonactiveDerivation.nonactiveIndirectMarkerOverride != null
                ? nonactiveDerivation.nonactiveIndirectMarkerOverride
                : indirectObjectMarker,
            thirdObjectMarker: "",
            isReflexive: overriddenObjectPrefix === "mu",
        };
    }

    function resolveStemCandidateMorphologyResult({
        stemCandidate,
        baseMorphologyInput,
        directionalPrefix,
        embeddedPrefix,
        shouldApplyDerivedAllomorphy,
        isPassiveImpersonalMode,
        parsedVerb,
        indirectObjectMarker,
        thirdObjectMarker,
        isNominalOutputProfile,
        tense,
        possessivePrefix,
        patientivoOwnership,
        isYawi,
    }) {
        const stem = (
            stemCandidate
            && typeof stemCandidate === "object"
            && stemCandidate.kind
        ) ? targetObject.realizeMorphStemSpec(stemCandidate, "") : String(stemCandidate || "");
        if (!stem) {
            return null;
        }
        let stemAnalysis = targetObject.stripDirectionalPrefixFromStem(stem, directionalPrefix);
        if (embeddedPrefix && stemAnalysis.startsWith(embeddedPrefix)) {
            stemAnalysis = stemAnalysis.slice(embeddedPrefix.length);
        }
        let stemVerb = stem;
        let stemAnalysisResolved = stemAnalysis;
        let stemObjectPrefix = baseMorphologyInput.objectPrefix;
        if (shouldApplyDerivedAllomorphy) {
            const derivedAllomorphy = targetObject.applyObjectAllomorphy({
                verb: stemVerb,
                analysisVerb: stemAnalysisResolved,
                subjectPrefix: baseMorphologyInput.subjectPrefix,
                subjectSuffix: baseMorphologyInput.subjectSuffix,
                objectPrefix: stemObjectPrefix,
                indirectObjectMarker,
                thirdObjectMarker,
                isPassiveImpersonalMode,
                ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb),
            });
            stemVerb = derivedAllomorphy.verb;
            stemAnalysisResolved = derivedAllomorphy.analysisVerb;
            stemObjectPrefix = derivedAllomorphy.morphologyObjectPrefix;
        }
        const applied = targetObject.applyMorphologyRules({
            ...baseMorphologyInput,
            verb: stemVerb,
            analysisVerb: stemAnalysisResolved,
            analysisExactVerb: stemAnalysisResolved,
            objectPrefix: stemObjectPrefix,
        });
        if (!applied || applied.error || !applied.verb) {
            return null;
        }
        const localSubjectPrefix = applied.subjectPrefix;
        const localObjectPrefix = applied.objectPrefix;
        let localSubjectSuffix = applied.subjectSuffix;
        let localFormSpec = applied.formSpec
            || (isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(applied.verb, localSubjectSuffix) : null);
        if (tense === "patientivo" && Boolean(possessivePrefix)) {
            localSubjectSuffix = targetObject.adjustPatientivoPossessiveSuffix(
                localSubjectSuffix,
                true,
                patientivoOwnership,
                { stem: applied.verb }
            );
            if (localSubjectSuffix === null) {
                return null;
            }
            if (isNominalOutputProfile) {
                localFormSpec = targetObject.withNominalFormSpecSuffix(localFormSpec, localSubjectSuffix, {
                    verb: applied.verb,
                    subjectSuffix: localSubjectSuffix,
                });
            }
        }
        const isYawiImperative = isYawi && tense === "imperativo" && localSubjectSuffix === "";
        const localAlternates = (applied.alternateForms || []).map((form) => {
            const normalizedForm = isNominalOutputProfile
                ? targetObject.normalizeNominalFormEntry(form, { subjectSuffix: localSubjectSuffix })
                : form;
            const altSuffix = (tense === "patientivo" && Boolean(possessivePrefix))
                ? targetObject.adjustPatientivoPossessiveSuffix(
                    form.subjectSuffix ?? localSubjectSuffix,
                    true,
                    patientivoOwnership,
                    { stem: normalizedForm.verb }
                )
                : (form.subjectSuffix ?? localSubjectSuffix);
            if (altSuffix === null) {
                return null;
            }
            const altFormSpec = isNominalOutputProfile
                ? targetObject.withNominalFormSpecSuffix(normalizedForm.formSpec || null, altSuffix, {
                    verb: normalizedForm.verb,
                    subjectSuffix: altSuffix,
                })
                : normalizedForm.formSpec;
            return {
                ...normalizedForm,
                subjectSuffix: altSuffix,
                formSpec: altFormSpec,
                trailingSuffix: normalizedForm.trailingSuffix || "",
            };
        }).filter(Boolean);
        return {
            subjectPrefix: localSubjectPrefix,
            objectPrefix: localObjectPrefix,
            subjectSuffix: localSubjectSuffix,
            verb: applied.verb,
            formSpec: localFormSpec,
            trailingSuffix: applied.trailingSuffix || "",
            alternateForms: localAlternates,
            directionalChainMeta: applied.directionalChainMeta || null,
            surfaceRuleMeta: applied.surfaceRuleMeta || null,
            isYawiImperative,
        };
    }

    return {
        buildNoStemMaskResult,
        applyForwardStageForGenerate,
        applyGenerateForwardDerivations,
        applySuppletiveYawiPrefixToStemSet,
        applyNonactiveGenerateOverrides,
        resolveStemCandidateMorphologyResult,
    };
}

export function installGenerationRuntimeSupportGlobals(targetObject = globalThis) {
    const api = createGenerationRuntimeSupportApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
