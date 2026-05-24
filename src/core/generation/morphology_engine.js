"use strict";

// core/generation/morphology_engine.js
// Shared morphology engine.
// Global-scope module: all functions defined directly on the global object.
// Deps (resolved at call time): all globals and functions in global scope from
// script.js and other extracted modules.

function applyMorphologyRules({
    subjectPrefix,
    objectPrefix,
    subjectSuffix,
    verb,
    tense,
    analysisVerb,
    rawAnalysisVerb,
    sourceRawVerb = "",
    analysisExactVerb,
    isYawi,
    isWeya,
    directionalPrefix,
    directionalRuleMode = "",
    suppletiveStemSet,
    suppletiveTenseSuffixes = null,
    hasSlashMarker = false,
    hasSuffixSeparator = false,
    hasLeadingDash = false,
    hasDoubleDash = false,
    hasBoundMarker = false,
    hasCompoundMarker = false,
    hasImpersonalTaPrefix = false,
    hasOptionalSupportiveI = false,
    optionalSupportiveLetter = "",
    hasNonspecificValence = false,
    isTaFusion = false,
    indirectObjectMarker = "",
    thirdObjectMarker = "",
    skipPretClass = false,
    isUnderlyingTransitive = false,
    hasSubjectValent = true,
    boundPrefix = "",
    embeddedPrefix = "",
    boundPrefixes = [],
    boundExplicitFlags = [],
    directionalPrefixFromSlash = "",
    sourceSplitPrefix = "",
    sourcePrefix = "",
    sourceBase = "",
    sourceCompositeBase = "",
    verbSegment = "",
    isNounContext = false,
    patientivoSource = "nonactive",
    patientivoNominalSuffix = null,
    stemProvenanceSeed = null,
    rootPlusYaBase = "",
    rootPlusYaBasePronounceable = "",
    derivationType = "",
    isNonactiveMode = false,
}) {
    subjectPrefix = typeof subjectPrefix === "string" ? subjectPrefix : "";
    objectPrefix = typeof objectPrefix === "string" ? objectPrefix : "";
    subjectSuffix = typeof subjectSuffix === "string" ? subjectSuffix : "";
    verb = typeof verb === "string" ? verb : "";
    analysisVerb = typeof analysisVerb === "string" ? analysisVerb : "";
    const baseSubjectSuffix = subjectSuffix;
    const baseSubjectPrefix = subjectPrefix;
    const isAgentivoTense = tense === "agentivo";
    const isPotencialHabitualProfile = isPotencialHabitualTense(tense);
    const isPotencialActiveProfile = isPotencialActiveTense(tense);
    const isPatientivoAdjectiveProfile = isPatientivoAdjectiveTense(tense);
    const isPotencialNounLikeTense = tense === "potencial";
    const isSustantivoVerbalLikeTense = tense === "sustantivo-verbal" || isPotencialNounLikeTense;
    const agentivoNumberSlot = isAgentivoTense ? baseSubjectSuffix : "";
    const sustantivoVerbalLikeNumberSlot = isSustantivoVerbalLikeTense ? baseSubjectSuffix : "";
    const morphologyTense = isAgentivoTense
        ? "presente-habitual"
        : (isPotencialNounLikeTense
            ? "sustantivo-verbal"
            : (isPotencialHabitualProfile ? "presente-habitual" : tense));
    if (isAgentivoTense) {
        subjectSuffix = "";
    }
    let baseObjectPrefix = objectPrefix;
    const prefixCheckCandidate = rawAnalysisVerb || analysisExactVerb || analysisVerb || verb;
    const prefixCheckBase = getDerivationRuleBase(
        prefixCheckCandidate,
        buildDerivationRuleBaseOptions({
            analysisVerb: prefixCheckCandidate,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            boundPrefix,
        }),
    );
    const prefixCheckTarget = prefixCheckBase || verb;
    const canonicalSourceSplit = resolveCanonicalSourceSplit({
        hasSlashMarker,
        hasBoundMarker,
        hasImpersonalTaPrefix,
        boundPrefixes,
        boundExplicitFlags,
        directionalPrefix,
        directionalPrefixFromSlash,
        analysisVerb: analysisVerb || rawAnalysisVerb || verb,
        verb,
    }, {
        verb,
        analysisVerb: analysisVerb || rawAnalysisVerb || verb,
    });
    const resolvedSourceSplitPrefix = sourceSplitPrefix
        || canonicalSourceSplit.sourcePrefix
        || "";
    const resolvedSourceCompositeBase = sourceCompositeBase
        || canonicalSourceSplit.slashCompositeBase
        || "";
    const directionalInputPrefix = directionalPrefix || "";
    let directionalOutputPrefix = directionalInputPrefix;
    let directionalPlan = null;
    const alternateForms = [];
    const pushAlternateForm = (verbValue = "", suffixValue = subjectSuffix, options = {}) => {
        const normalizedVerb = String(verbValue || "").trim();
        if (!normalizedVerb) {
            return;
        }
        if (isNounContextFinal) {
            alternateForms.push(buildNominalFormEntry(normalizedVerb, suffixValue, options));
            return;
        }
        alternateForms.push({
            ...options,
            verb: normalizedVerb,
            subjectSuffix: typeof suffixValue === "string" ? suffixValue : "",
        });
    };
    let suppressPreferredPerfectAlternates = false;
    let suppressSustantivoIEndingSVariant = false;
    const isIntransitiveVerb =
        objectPrefix === ""
        && !isTaFusion
        && !indirectObjectMarker
        && !thirdObjectMarker
        && !isUnderlyingTransitive;
    const forceTransitiveBase = isTaFusion || isUnderlyingTransitive;
    const isNounTense = isNonanimateNounTense(tense)
        || isPotencialProfileTense(tense)
        || isPatientivoAdjectiveProfile
        || tense === "agentivo"
        || tense === "patientivo"
        || tense === "instrumentivo"
        || tense === "calificativo-instrumentivo"
        || tense === "locativo-temporal";
    const isNounContextFinal = isNounContext || isNounTense;
    const forceTransitiveDirectional = directionalRuleMode === "transitive";
    const forceIntransitiveDirectional = directionalRuleMode === "intransitive";
    const forceNonspecificDirectional = directionalRuleMode === "nonspecific";
    const directionalPrefixResult = applyDirectionalRules({
        directionalInputPrefix,
        directionalOutputPrefix,
        subjectPrefix,
        objectPrefix,
        verb,
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
        isNounTense: isNounContextFinal,
    }, "prefix");
    ({
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix,
    } = directionalPrefixResult);
    let nounContextPrimaryFormSpec = null;
    const markerChain = [indirectObjectMarker || "", thirdObjectMarker || ""];
    objectPrefix = composeProjectiveObjectPrefix({
        objectPrefix,
        markers: markerChain,
        subjectPrefix: baseSubjectPrefix,
    });
    const shouldApplyEarlyContactElision = !isPerfectiveTense(tense);

    subjectSuffix = applyTenseSuffixRules(morphologyTense, subjectSuffix);
    if (suppletiveTenseSuffixes && Object.prototype.hasOwnProperty.call(suppletiveTenseSuffixes, morphologyTense)) {
        const overrideMap = suppletiveTenseSuffixes[morphologyTense];
        if (overrideMap && Object.prototype.hasOwnProperty.call(overrideMap, baseSubjectSuffix)) {
            subjectSuffix = overrideMap[baseSubjectSuffix];
        }
    }
    const exactAnalysisVerb = analysisExactVerb || analysisVerb || verb;
    const hasYaEndingMatrixRoot = exactAnalysisVerb.endsWith("ya");
    const rawAnalysis = analysisVerb || verb;
    const nonRedupAnalysis = getNonReduplicatedRoot(rawAnalysis);
    const useAnalysisForCounts = Boolean(directionalInputPrefix) || nonRedupAnalysis !== rawAnalysis;
    const analysisTarget = useAnalysisForCounts ? nonRedupAnalysis : rawAnalysis;
    if (tense === "imperativo") {
        const isImperativeSecondSingular =
            baseSubjectPrefix === "ti"
            && baseSubjectSuffix === "";
        const isImperativeSecondPlural =
            baseSubjectPrefix === "an"
            && baseSubjectSuffix === "t";
        if (isImperativeSecondSingular || isImperativeSecondPlural) {
            subjectPrefix = "shi";
        }
    }
    const dropClassCNucleusTenses = new Set(["presente-desiderativo", "futuro", "condicional"]);
    if (isSustantivoVerbalLikeTense && !isPotencialActiveProfile) {
        const sustantivoVerbalStemCandidates = buildSustantivoVerbalStemCandidates({
            verb,
            analysisVerb,
            rawAnalysisVerb,
            sourceRawVerb,
            directionalPrefix: directionalInputPrefix,
            boundPrefix,
            boundPrefixes,
            boundExplicitFlags,
            directionalPrefixFromSlash,
            sourceSplitPrefix: resolvedSourceSplitPrefix,
            sourcePrefix,
            sourceBase,
            sourceCompositeBase: resolvedSourceCompositeBase,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            isIntransitive: isIntransitiveVerb,
            isYawi,
            isWeya,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
        });
        if (!sustantivoVerbalStemCandidates.length) {
            return { error: true };
        }
        const [primarySustantivoStem, ...alternateSustantivoStems] = sustantivoVerbalStemCandidates;
        verb = primarySustantivoStem.verb;
        nounContextPrimaryFormSpec = primarySustantivoStem.formSpec || null;
        suppressSustantivoIEndingSVariant = primarySustantivoStem.suppressIEndingSVariant === true;
        alternateSustantivoStems.forEach((entry) => {
            pushAlternateForm(entry.verb, "", {
                formSpec: entry.formSpec || buildStemNominalFormSpec(
                    buildLiteralMorphStemSpec(entry.verb),
                    "",
                    { stem: entry.verb }
                ),
            });
        });
    }
    if (isPatientivoAdjectiveProfile) {
        const patientivoAdjectiveSource = getPatientivoAdjectiveSourceForTense(tense) || "nonactive";
        const isTransitive = !isIntransitiveVerb && !hasImpersonalTaPrefix;
        if (patientivoAdjectiveSource === "tronco-verbal" && isTransitive && objectPrefix !== "ta") {
            return { error: true };
        }
        const patientivoInput = buildPatientivoDerivationInput({
            verb,
            analysisVerb,
            rawAnalysisVerb,
            sourceRawVerb,
            isTransitive,
            objectPrefix,
            directionalPrefix: directionalInputPrefix,
            isYawi,
            hasImpersonalTaPrefix,
            boundPrefix,
            boundPrefixes,
            boundExplicitFlags,
            directionalPrefixFromSlash,
            sourceSplitPrefix: resolvedSourceSplitPrefix,
            sourcePrefix,
            sourceBase,
            sourceCompositeBase: resolvedSourceCompositeBase,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            exactBaseVerb: exactAnalysisVerb,
            suppletiveStemSet,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            blockPerfectivoClassC: patientivoAdjectiveSource === "perfectivo",
        });
        const patientivoDerivations = getPatientivoDerivationBuilder(patientivoAdjectiveSource)(patientivoInput);
        const patientivoAdjectiveForms = buildPatientivoAdjectiveDerivations(
            patientivoDerivations,
            patientivoAdjectiveSource,
        );
        if (!patientivoAdjectiveForms.length) {
            return { error: true };
        }
        const [primary, ...alternates] = patientivoAdjectiveForms;
        verb = primary.verb;
        subjectSuffix = primary.subjectSuffix;
        alternateForms.length = 0;
        alternates.forEach((entry) => {
            pushAlternateForm(entry.verb, entry.subjectSuffix, {
                formSpec: entry.formSpec || buildLiteralNominalFormSpec(entry.verb, entry.subjectSuffix),
            });
        });
        }
    if (tense === "patientivo") {
        const isTransitive = !isIntransitiveVerb && !hasImpersonalTaPrefix;
        if (patientivoSource === "tronco-verbal" && isTransitive && objectPrefix !== "ta") {
            return { error: true };
        }
        const pluralMarker = baseSubjectSuffix === "p"
            ? "wan"
            : (baseSubjectSuffix === "t" ? "met" : "");
        const applyPatientivoSuffix = (suffix) => {
            if (pluralMarker) {
                return pluralMarker;
            }
            return suffix || "";
        };
        const patientivoInput = buildPatientivoDerivationInput({
            verb,
            analysisVerb,
            rawAnalysisVerb,
            sourceRawVerb,
            isTransitive,
            objectPrefix,
            directionalPrefix: directionalInputPrefix,
            isYawi,
            hasImpersonalTaPrefix,
            boundPrefix,
            boundPrefixes,
            boundExplicitFlags,
            directionalPrefixFromSlash,
            sourceSplitPrefix: resolvedSourceSplitPrefix,
            sourcePrefix,
            sourceBase,
            sourceCompositeBase: resolvedSourceCompositeBase,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            hasOptionalSupportiveI,
            hasNonspecificValence,
            exactBaseVerb: exactAnalysisVerb,
            suppletiveStemSet,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
        });
        const patientivoDerivationBuilder = getPatientivoDerivationBuilder(patientivoSource);
        const derivations = normalizePatientivoDerivationEntries(
            patientivoDerivationBuilder(patientivoInput),
            patientivoSource,
        );
        const patientivoNominalDerivations = expandPatientivoNominalMarkerOptions(
            derivations,
            patientivoSource,
        );
        let resolvedPatientivoDerivations = patientivoNominalDerivations.length
            ? patientivoNominalDerivations
            : derivations;
        const resolvedPatientivoNominalSuffix = normalizePatientivoNominalSuffixSelection(patientivoNominalSuffix);
        if (resolvedPatientivoNominalSuffix !== null) {
            resolvedPatientivoDerivations = resolvedPatientivoDerivations.filter((entry) => (
                String(entry?.subjectSuffix || "") === resolvedPatientivoNominalSuffix
            ));
        }
        if (
            !resolvedPatientivoDerivations.length
            && (
                resolvedPatientivoNominalSuffix !== null
                || isStrictPatientivoDerivationSource(patientivoSource)
            )
        ) {
            return { error: true };
        }
        if (resolvedPatientivoDerivations.length) {
            const [primary, ...alternates] = normalizePatientivoDerivationEntries(
                resolvedPatientivoDerivations,
                patientivoSource,
            );
            verb = primary.verb;
            subjectSuffix = applyPatientivoSuffix(primary.subjectSuffix);
            alternates.forEach((entry) => {
                const nextSuffix = applyPatientivoSuffix(entry.subjectSuffix);
                pushAlternateForm(entry.verb, nextSuffix, {
                    formSpec: withNominalFormSpecSuffix(entry.formSpec || null, nextSuffix, {
                        verb: entry.verb,
                        subjectSuffix: nextSuffix,
                    }),
                });
            });
        }
    }

    const resolveOutputVerbForCurrentPrefixes = (verbValue = "", prefixOverrides = {}) => (
        resolveOptionalSupportiveOutputVerb({
            subjectPrefix: prefixOverrides.subjectPrefix ?? subjectPrefix,
            objectPrefix: prefixOverrides.objectPrefix ?? objectPrefix,
            verb: verbValue,
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
        })
    );
    const isVerbNonactiveMode = !isNounContextFinal && (
        isNonactiveMode === true
        || (
            getActiveTenseMode() === TENSE_MODE.verbo
            && getActiveDerivationMode() === DERIVATION_MODE.nonactive
        )
    );
    const pretDerivationSharedOptions = {
        verb,
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        tense,
        analysisVerb,
        exactBaseVerb: resolveOutputVerbForCurrentPrefixes(exactAnalysisVerb),
        isYawi,
        isWeya,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        hasImpersonalTaPrefix,
        hasOptionalSupportiveI,
        optionalSupportiveLetter,
        hasNonspecificValence,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        derivationType,
        directionalInputPrefix,
        directionalOutputPrefix,
        baseSubjectPrefix,
        baseObjectPrefix,
        suppletiveStemSet,
        forceTransitive: forceTransitiveBase,
        indirectObjectMarker,
        hasDoubleDash,
        forceClassBOnly: isVerbNonactiveMode,
    };

    if (PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        const universalOutput = buildPretUniversalResultWithProvenance(
            pretDerivationSharedOptions,
        );
        const resolvedUniversalForms = (universalOutput.forms || [])
            .map((f) => resolveOptionalSupportiveOutputText({
                value: f,
                hasOptionalSupportiveI,
                optionalSupportiveLetter,
            }))
            .filter(Boolean);
        const primaryUniversalVerb = resolvedUniversalForms[0] || "—";
        resolvedUniversalForms.slice(1).forEach((f) => pushAlternateForm(f, ""));
        return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: primaryUniversalVerb,
            alternateForms,
            stemProvenance: universalOutput.provenance || null,
        };
    }

    if (!skipPretClass && PRETERITO_CLASS_TENSES.has(tense)) {
        const isAdjectiveMode = getActiveTenseMode() === TENSE_MODE.adjetivo;
        const forceAdjectiveClassB = isAdjectiveMode && hasYaEndingMatrixRoot;
        if (isVerbNonactiveMode) {
            const nonactiveResult = buildNonactivePerfectiveResult({
                verb,
                subjectPrefix,
                objectPrefix,
                subjectSuffix,
                tense,
                directionalInputPrefix,
                directionalOutputPrefix,
                baseSubjectPrefix,
                baseObjectPrefix,
                indirectObjectMarker,
                hasOptionalSupportiveI,
                optionalSupportiveLetter,
            });
            const nonactiveForms = nonactiveResult?.forms || [];
            const primaryNonactiveVerb = nonactiveForms[0] || "—";
            nonactiveForms.slice(1).forEach((f) => pushAlternateForm(f, ""));
            return {
                subjectPrefix: "",
                objectPrefix: "",
                subjectSuffix: "",
                verb: primaryNonactiveVerb,
                alternateForms,
                stemProvenance: null,
            };
        }
        const classOutput = buildClassBasedResultWithProvenance({
            ...pretDerivationSharedOptions,
            classFilter: forceAdjectiveClassB
                ? "B"
                : getCurrentResolvedConjugationSelectionState().classFilter,
            allowAllClasses: false,
            forceClassBSelection: forceAdjectiveClassB,
            forceClassBOnly: isVerbNonactiveMode,
        });
        const resolvedClassForms = (classOutput.forms || [])
            .map((f) => resolveOptionalSupportiveOutputText({
                value: f,
                hasOptionalSupportiveI,
                optionalSupportiveLetter,
            }))
            .filter(Boolean);
        const primaryClassVerb = resolvedClassForms[0] || "—";
        resolvedClassForms.slice(1).forEach((f) => pushAlternateForm(f, ""));
        return {
            subjectPrefix: "",
            objectPrefix: "",
            subjectSuffix: "",
            verb: primaryClassVerb,
            alternateForms,
            stemProvenance: classOutput.provenance || null,
        };
    }

    const isTransitive = objectPrefix !== "" || forceTransitiveBase;
    const directionalPostResult = applyDirectionalRules({
        directionalInputPrefix,
        directionalOutputPrefix,
        directionalPlan,
        subjectPrefix,
        objectPrefix,
        verb,
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
        isNounTense: isNounContextFinal,
    }, "post-elision");
    ({
        subjectPrefix,
        objectPrefix,
        verb,
        directionalPlan,
        directionalOutputPrefix,
    } = directionalPostResult);
    const isSlashDenominalMatrixInput = hasSlashMarker
        && hasBoundMarker
        && (exactAnalysisVerb === "tiya" || exactAnalysisVerb === "wiya");
    const isPotencialActiveBoundInput = isPotencialActiveProfile
        && hasSlashMarker
        && hasBoundMarker;
    const disallowRootPlusYa = (
        exactAnalysisVerb === "ya"
        && (hasSlashMarker || hasSuffixSeparator || hasLeadingDash)
    ) || isSlashDenominalMatrixInput || isPotencialActiveBoundInput;
    const finalYaPerfectiveAlternateBase = isPerfectiveTense(tense) && !disallowRootPlusYa
        ? (
            rootPlusYaBasePronounceable
            || resolveFinalYaPerfectiveAlternateBase(verb, {
                isTransitive,
                isYawi,
                isWeya,
                requirePronounceable: true,
            })
        )
        : "";
    if (finalYaPerfectiveAlternateBase) {
        pushAlternateForm(finalYaPerfectiveAlternateBase, subjectSuffix);
    }
    if (suppressPreferredPerfectAlternates) {
        alternateForms.length = 0;
    }
    const hasDerivedMuPrefix = Boolean(hasSuffixSeparator || hasCompoundMarker || hasSlashMarker || directionalInputPrefix);
    ({
        objectPrefix,
        verb,
    } = realizeDerivedMuStemInteraction({
        objectPrefix,
        verb,
        alternateForms,
        enable: hasDerivedMuPrefix,
    }));
    if (isPotencialActiveProfile) {
        const potentialForms = buildPotencialActiveForms({
            verb,
            subjectPrefix,
            objectPrefix,
            subjectSuffix,
            analysisVerb,
            exactAnalysisVerb,
            prefixCheckTarget,
            isTransitive,
            isYawi,
            directionalPrefix: directionalInputPrefix,
            directionalOutputPrefix,
            baseSubjectPrefix,
            baseObjectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            suppletiveStemSet,
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
            markerChain,
            hasDoubleDash,
            isNounContextFinal,
        });
        if (!potentialForms.length) {
            return { error: true };
        }
        const [primaryPotential, ...alternatePotentials] = potentialForms;
        verb = primaryPotential.verb;
        subjectSuffix = primaryPotential.subjectSuffix;
        alternatePotentials.forEach((entry) => {
            pushAlternateForm(entry.verb, entry.subjectSuffix, {
                formSpec: entry.formSpec || null,
            });
        });
    }
    if (tense === "calificativo-instrumentivo") {
        const calificativoResult = getCalificativoInstrumentivoResult({
            verb,
            analysisVerb,
            exactAnalysisVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            isYawi,
            directionalPrefix: directionalInputPrefix,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            boundPrefix,
            boundPrefixes,
            boundExplicitFlags,
            directionalPrefixFromSlash,
            sourceSplitPrefix: resolvedSourceSplitPrefix,
            sourcePrefix,
            sourceBase,
            sourceCompositeBase: resolvedSourceCompositeBase,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
        });
        if (!calificativoResult || calificativoResult.error) {
            return { error: true };
        }
        verb = calificativoResult.verb;
        subjectSuffix = calificativoResult.subjectSuffix;
        if (Array.isArray(calificativoResult.alternateForms) && calificativoResult.alternateForms.length) {
            alternateForms.length = 0;
            calificativoResult.alternateForms.forEach((entry) => {
                pushAlternateForm(entry.verb, entry.subjectSuffix, {
                    formSpec: entry.formSpec || null,
                });
            });
        }
    }
    if (tense === "instrumentivo") {
        const instrumentivoResult = getInstrumentivoResult({
            verb,
            analysisVerb,
            exactAnalysisVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            isYawi,
            directionalPrefix: directionalInputPrefix,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            boundPrefix,
            boundPrefixes,
            boundExplicitFlags,
            directionalPrefixFromSlash,
            sourceSplitPrefix: resolvedSourceSplitPrefix,
            sourcePrefix,
            sourceBase,
            sourceCompositeBase: resolvedSourceCompositeBase,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
        });
        if (!instrumentivoResult || instrumentivoResult.error) {
            return { error: true };
        }
        verb = instrumentivoResult.verb;
        subjectSuffix = instrumentivoResult.subjectSuffix;
        if (Array.isArray(instrumentivoResult.alternateForms) && instrumentivoResult.alternateForms.length) {
            alternateForms.length = 0;
            instrumentivoResult.alternateForms.forEach((entry) => {
                pushAlternateForm(entry.verb, entry.subjectSuffix, {
                    formSpec: entry.formSpec || null,
                });
            });
        }
    }
    if (tense === "locativo-temporal") {
        const locativoResult = getLocativoTemporalResult({
            verb,
            analysisVerb,
            exactAnalysisVerb,
            rootPlusYaBase,
            rootPlusYaBasePronounceable,
            isYawi,
            directionalPrefix: directionalInputPrefix,
            hasSlashMarker,
            hasSuffixSeparator,
            hasLeadingDash,
            hasBoundMarker,
            hasCompoundMarker,
            boundPrefix,
            boundPrefixes,
            boundExplicitFlags,
            directionalPrefixFromSlash,
            sourceSplitPrefix: resolvedSourceSplitPrefix,
            sourcePrefix,
            sourceBase,
            sourceCompositeBase: resolvedSourceCompositeBase,
            hasImpersonalTaPrefix,
            hasOptionalSupportiveI,
            optionalSupportiveLetter,
        });
        if (!locativoResult || locativoResult.error) {
            return { error: true };
        }
        verb = locativoResult.verb;
        subjectSuffix = locativoResult.subjectSuffix;
        if (Array.isArray(locativoResult.alternateForms) && locativoResult.alternateForms.length) {
            alternateForms.length = 0;
            locativoResult.alternateForms.forEach((entry) => {
                pushAlternateForm(entry.verb, entry.subjectSuffix, {
                    formSpec: entry.formSpec || null,
                });
            });
        }
    }

    if (tense === "activo-no-finito") {
        subjectPrefix = "";
        objectPrefix = "";
        subjectSuffix = "";
    }

    const isCompositeDerivedInput = Boolean(
        hasSuffixSeparator
        || hasCompoundMarker
        || (hasSlashMarker && (hasBoundMarker || Boolean(sourcePrefix)))
    );
    if (tense === "activo-tronco-preterito" || tense === "activo-tronco-perfecto") {
        const isAdjectiveMode = getActiveTenseMode() === TENSE_MODE.adjetivo;
        const activeWrapperSourceTense = tense === "activo-tronco-preterito" ? "preterito" : "perfecto";
        const isTroncoTikActiveWrapper = tense === "activo-tronco-preterito";
        const isTroncoNajActiveWrapper = tense === "activo-tronco-perfecto";
        const isTroncoActiveWrapper = isTroncoTikActiveWrapper || isTroncoNajActiveWrapper;
        const sourceSubjectSuffix = resolveTroncoSourceSuffix(activeWrapperSourceTense, baseSubjectSuffix);
        const wrapperObjectPrefix = isTroncoNajActiveWrapper && !forceTransitiveBase ? "ta" : objectPrefix;
        const wrapperIndirectObjectMarker = isTroncoNajActiveWrapper
            ? composeProjectiveObjectPrefix({
                objectPrefix: "",
                markers: [indirectObjectMarker || "", thirdObjectMarker || ""],
                subjectPrefix: baseSubjectPrefix,
            })
            : indirectObjectMarker;
        const inputMatrixRoot = normalizeRuleBase(exactAnalysisVerb);
        const baseStemCandidates = isCompositeDerivedInput
            ? buildActiveWrapperBaseStemCandidates({
                verb,
                analysisVerb,
                exactAnalysisVerb,
                rawAnalysisVerb,
                sourceRawVerb,
                directionalPrefix: directionalInputPrefix,
                boundPrefix,
                boundPrefixes,
                boundExplicitFlags,
                directionalPrefixFromSlash,
                sourceSplitPrefix: resolvedSourceSplitPrefix,
                sourcePrefix,
                sourceBase,
                sourceCompositeBase: resolvedSourceCompositeBase,
                verbSegment,
                hasImpersonalTaPrefix,
                hasOptionalSupportiveI,
                hasSlashMarker,
                hasSuffixSeparator,
                hasLeadingDash,
                hasBoundMarker,
                hasCompoundMarker,
                hasNonspecificValence,
                rootPlusYaBase,
                rootPlusYaBasePronounceable,
                isYawi,
                isWeya,
                derivationType,
                isUnderlyingTransitive,
                isTaFusion,
                suppletiveStemSet,
            })
            : [{ verb, analysisVerb: exactAnalysisVerb }];
        const wrapperStemCandidates = [];
        const precomputedWrapperForms = [];
        const addWrapperStemCandidate = (sourceVerb = "", sourceAnalysis = "") => {
            const normalizedSourceVerb = String(sourceVerb || "").trim();
            if (!normalizedSourceVerb) {
                return;
            }
            wrapperStemCandidates.push({
                verb: normalizedSourceVerb,
                analysisVerb: String(sourceAnalysis || "").trim() || normalizedSourceVerb,
                rootPlusYaProxyBase: "",
            });
        };
        const addPrecomputedWrapperForm = (value = "") => {
            const form = String(value || "").trim();
            if (!form) {
                return;
            }
            precomputedWrapperForms.push(form);
        };
        if (isTroncoActiveWrapper && baseStemCandidates.length) {
            if (activeWrapperSourceTense === "perfecto" && patientivoSource === "perfectivo") {
                const objectMatrixRoot = buildObjectMatrixRootFromInput({
                    sourceVerb: exactAnalysisVerb,
                    sourceAnalysis: exactAnalysisVerb,
                });
                baseStemCandidates.forEach((candidate) => {
                    const sourceVerb = String(candidate?.verb || "").trim();
                    if (!sourceVerb) {
                        return;
                    }
                    const sourceAnalysis = String(candidate?.analysisVerb || "")
                        || (directionalInputPrefix
                            ? stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix)
                            : sourceVerb);
                    const sourceSubjectSuffix = activeWrapperSourceTense === "perfecto" ? "tuk" : "k";
                    const passthroughNaj = shouldPassthroughNajPerfectoWrapper({
                        activeWrapperSourceTense,
                        sourceVerb,
                        sourceAnalysis,
                    });
                    if (passthroughNaj) {
                        const matrixStem = selectPreferredPatientivoPerfectivoStem({
                            sourceVerb,
                            sourceAnalysis,
                            objectMatrixRoot,
                            directionalPrefix: directionalInputPrefix,
                            boundPrefix,
                            boundPrefixes,
                            boundExplicitFlags,
                            directionalPrefixFromSlash,
                            sourceSplitPrefix: resolvedSourceSplitPrefix,
                            sourcePrefix,
                            sourceBase,
                            sourceCompositeBase: resolvedSourceCompositeBase,
                            hasImpersonalTaPrefix,
                            hasOptionalSupportiveI,
                            hasSlashMarker,
                            hasSuffixSeparator,
                            hasLeadingDash,
                            hasBoundMarker,
                            hasCompoundMarker,
                            hasNonspecificValence,
                            rootPlusYaBase,
                            rootPlusYaBasePronounceable,
                            patientivoSource,
                        });
                        const incorporatedStem = buildObjectIncorporatedSourceStem({
                            sourceVerb,
                            sourceAnalysis,
                            matrixStem,
                            allowedMatrixStems: PRETERIT_OBJECT_MATRIX_STEMS,
                        });
                        if (incorporatedStem) {
                            buildPreteritObjectIncorporatedStems({
                                matrixStem,
                                incorporatedStem,
                            }).forEach((stem) => addPrecomputedWrapperForm(`${stem}${MATRIX_NA_STEM}j${sourceSubjectSuffix}`));
                        }
                    } else {
                        const pretSimpleNajSourceBuilder = shouldMirrorNajFinalYaPretSimple(sourceAnalysis || sourceVerb)
                            ? buildObjectWrapperPretSimpleForms
                            : buildTroncoNajBaseForms;
                        const pretSimpleNajSourceForms = pretSimpleNajSourceBuilder({
                            sourceVerb,
                            sourceAnalysis,
                        });
                        const pretSimpleNajSourceValues = Array.isArray(pretSimpleNajSourceForms)
                            ? pretSimpleNajSourceForms
                            : (pretSimpleNajSourceForms?.baseForms || []);
                        pretSimpleNajSourceValues.forEach((stem) => addPrecomputedWrapperForm(`${stem}${MATRIX_NA_STEM}j${sourceSubjectSuffix}`));
                    }
                });
            } else {
                const troncoIsTransitive = forceTransitiveBase && !hasImpersonalTaPrefix;
                baseStemCandidates.forEach((candidate) => {
                    const sourceVerb = String(candidate?.verb || "").trim();
                    if (!sourceVerb) {
                        return;
                    }
                    const sourceAnalysis = String(candidate?.analysisVerb || "")
                        || (directionalInputPrefix
                            ? stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix)
                            : sourceVerb);
                    const troncoDerivations = buildPatientivoTroncoDerivations({
                        verb: sourceVerb,
                        analysisVerb: sourceAnalysis || sourceVerb,
                        rawAnalysisVerb: sourceAnalysis || sourceVerb,
                        isTransitive: troncoIsTransitive,
                        directionalPrefix: directionalInputPrefix,
                        boundPrefix,
                        boundPrefixes,
                        boundExplicitFlags,
                        directionalPrefixFromSlash,
                        sourceSplitPrefix: resolvedSourceSplitPrefix,
                        sourceCompositeBase: resolvedSourceCompositeBase,
                        hasImpersonalTaPrefix,
                        hasOptionalSupportiveI,
                        hasSlashMarker,
                        hasSuffixSeparator,
                        hasLeadingDash,
                        hasBoundMarker,
                        hasCompoundMarker,
                    });
                    const troncoWrapperSuffix = activeWrapperSourceTense === "perfecto" ? "tuk" : "k";
                    const troncoSourceForms = buildTroncoNajBaseForms({
                        sourceVerb,
                        sourceAnalysis,
                    });
                    const troncoBaseForms = Array.isArray(troncoSourceForms)
                        ? []
                        : (troncoSourceForms?.baseForms || []);
                    if (troncoBaseForms.length) {
                        troncoBaseForms.forEach((troncoEntry) => {
                            const normalizedEntry = normalizeNominalFormEntry(troncoEntry, {
                                subjectSuffix: "",
                            });
                            if (!normalizedEntry.verb) {
                                return;
                            }
                            addPrecomputedWrapperForm(buildNominalOutputText({
                                verb: normalizedEntry.verb,
                                subjectSuffix: "ti",
                                trailingSuffix: troncoWrapperSuffix,
                            }));
                        });
                        return;
                    }
                    const troncoTiForms = Array.isArray(troncoSourceForms)
                        ? []
                        : (troncoSourceForms?.tiForms || []);
                    troncoTiForms.forEach((troncoEntry) => {
                        const normalizedEntry = normalizeNominalFormEntry(troncoEntry);
                        if (!normalizedEntry.verb) {
                            return;
                        }
                        addPrecomputedWrapperForm(buildNominalOutputText({
                            verb: normalizedEntry.verb,
                            subjectSuffix: normalizedEntry.subjectSuffix,
                            trailingSuffix: troncoWrapperSuffix,
                        }));
                    });
                });
            }
        } else {
            baseStemCandidates.forEach((candidate) => {
                const sourceVerb = String(candidate?.verb || "").trim();
                if (!sourceVerb) {
                    return;
                }
                const sourceAnalysis = String(candidate?.analysisVerb || "")
                    || (directionalInputPrefix
                        ? stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix)
                        : sourceVerb);
                addWrapperStemCandidate(sourceVerb, sourceAnalysis);
            });
        }
        const wrapperForms = [];
        const seenWrapperForms = new Set();
        const addWrapperForm = (formValue = "") => {
            const form = String(formValue || "").trim();
            if (!form || form === "—" || seenWrapperForms.has(form)) {
                return;
            }
            seenWrapperForms.add(form);
            wrapperForms.push(form);
        };
        precomputedWrapperForms.forEach((formValue) => addWrapperForm(formValue));
        wrapperStemCandidates.forEach((candidate) => {
            const sourceVerb = String(candidate?.verb || "");
            if (!sourceVerb) {
                return;
            }
            const sourceAnalysis = String(candidate?.analysisVerb || "")
                || (directionalInputPrefix
                    ? stripDirectionalPrefixFromStem(sourceVerb, directionalInputPrefix)
                    : sourceVerb);
            const candidateRootPlusYaProxyBase = String(candidate?.rootPlusYaProxyBase || "").trim();
            const candidateRootPlusYaProxyBasePronounceable = (
                candidateRootPlusYaProxyBase
                && isSyllableSequencePronounceable(candidateRootPlusYaProxyBase)
            )
                ? candidateRootPlusYaProxyBase
                : "";
            const shouldCarryRootPlusYaIntoWrapper = !isTroncoActiveWrapper;
            const candidateExactBaseVerb = isTroncoNajActiveWrapper
                ? (sourceAnalysis || "")
                : exactAnalysisVerb;
            const candidateMatrix = normalizeRuleBase(candidateExactBaseVerb);
            const adjectiveClassPolicy = resolveActiveAdjectiveClassPolicy({
                tenseValue: tense,
                sourceTense: activeWrapperSourceTense,
                isAdjectiveMode,
                hasSlashMarker,
                hasBoundMarker,
                inputMatrix: inputMatrixRoot,
                candidateMatrix,
            });
            const classOutput = buildClassBasedResultWithProvenance({
                verb: sourceVerb,
                subjectPrefix,
                objectPrefix: wrapperObjectPrefix,
                subjectSuffix: activeWrapperSourceTense === "preterito"
                    ? baseSubjectSuffix
                    : sourceSubjectSuffix,
                tense: activeWrapperSourceTense,
                analysisVerb: sourceAnalysis || sourceVerb,
                exactBaseVerb: candidateExactBaseVerb,
                classFilter: adjectiveClassPolicy.classFilter,
                allowAllClasses: false,
                isYawi,
                isWeya,
                hasSlashMarker,
                hasSuffixSeparator,
                hasLeadingDash,
                hasBoundMarker,
                hasCompoundMarker,
                hasImpersonalTaPrefix,
                hasOptionalSupportiveI,
                optionalSupportiveLetter,
                hasNonspecificValence,
                rootPlusYaBase: candidateRootPlusYaProxyBase
                    || (shouldCarryRootPlusYaIntoWrapper ? rootPlusYaBase : ""),
                rootPlusYaBasePronounceable: candidateRootPlusYaProxyBasePronounceable
                    || (shouldCarryRootPlusYaIntoWrapper ? rootPlusYaBasePronounceable : ""),
                derivationType,
                directionalInputPrefix,
                directionalOutputPrefix,
                baseSubjectPrefix,
                baseObjectPrefix: wrapperObjectPrefix,
                suppletiveStemSet,
                forceTransitive: isTroncoNajActiveWrapper ? true : forceTransitiveBase,
                indirectObjectMarker: wrapperIndirectObjectMarker,
                hasDoubleDash,
                forceClassBSelection: adjectiveClassPolicy.forceClassBSelection,
            });
            let candidateForms = selectPreferredActiveAdjectiveForms(
                classOutput?.forms || [],
                {
                    sourceVerb: sourceAnalysis || sourceVerb,
                    sourceTense: activeWrapperSourceTense,
                    selectionMode: adjectiveClassPolicy.preferredFinalYaSurfaceMode,
                    isYawi,
                    isWeya,
                }
            );
            if (adjectiveClassPolicy.preferredFinalYaSurfaceMode === "deleted-perfect" && candidateForms.length) {
                suppressPreferredPerfectAlternates = true;
            }
            candidateForms.forEach((formValue) => addWrapperForm(formValue));
        });
        if (!wrapperForms.length) {
            return { error: true };
        }
        const [primaryWrapperForm, ...alternateWrapperForms] = wrapperForms;
        const splitTroncoTikWrapperForm = (formValue = "") => {
            const form = String(formValue || "").trim();
            if (!form) {
                return { verb: "", suffix: "" };
            }
            if (activeWrapperSourceTense === "perfecto" && form.endsWith("tuk")) {
                return {
                    verb: form.slice(0, -3),
                    suffix: resolveTroncoTikWrapperSuffix(activeWrapperSourceTense),
                };
            }
            if (activeWrapperSourceTense === "preterito" && form.endsWith("k")) {
                return {
                    verb: form.slice(0, -1),
                    suffix: resolveTroncoTikWrapperSuffix(activeWrapperSourceTense),
                };
            }
            return {
                verb: form,
                suffix: resolveTroncoTikWrapperSuffix(activeWrapperSourceTense),
            };
        };
        if (isTroncoTikActiveWrapper) {
            const primaryWrapperParts = splitTroncoTikWrapperForm(primaryWrapperForm);
            verb = primaryWrapperParts.verb;
            subjectSuffix = primaryWrapperParts.suffix;
        } else {
            verb = primaryWrapperForm;
            subjectSuffix = "";
        }
        alternateForms.length = 0;
        alternateWrapperForms.forEach((formValue) => {
            if (isTroncoTikActiveWrapper) {
                const alternateWrapperParts = splitTroncoTikWrapperForm(formValue);
                pushAlternateForm(alternateWrapperParts.verb, alternateWrapperParts.suffix);
                return;
            }
            pushAlternateForm(formValue, subjectSuffix);
        });
        if (!isTroncoTikActiveWrapper && suppressPreferredPerfectAlternates) {
            alternateForms.length = 0;
        }
        subjectPrefix = (isTroncoTikActiveWrapper || isTroncoNajActiveWrapper)
            ? baseSubjectPrefix
            : "";
        objectPrefix = "";
    }
    if (isAgentivoTense) {
        const baseSuffix = subjectSuffix;
        subjectSuffix = applyAgentivoNumberSuffix(baseSuffix, agentivoNumberSlot);
        if (alternateForms.length) {
            alternateForms.forEach((form) => {
                if (!form) {
                    return;
                }
                const formSuffix = typeof form.subjectSuffix === "string"
                    ? form.subjectSuffix
                    : baseSuffix;
                form.subjectSuffix = applyAgentivoNumberSuffix(formSuffix, agentivoNumberSlot);
                if (isNounContextFinal) {
                    form.formSpec = withNominalFormSpecSuffix(form.formSpec || null, form.subjectSuffix, form);
                }
            });
        }
    }
    if (isSustantivoVerbalLikeTense) {
        const pluralSlot = sustantivoVerbalLikeNumberSlot === "t" ? "t" : "";
        const getSustantivoVerbalSuffixVariants = (stemValue = "") => {
            const stem = typeof stemValue === "string" ? stemValue : "";
            const variants = ["lis"];
            if (stem.endsWith("i") && !suppressSustantivoIEndingSVariant) {
                variants.push("s");
            }
            return variants
                .map((value) => applyAgentivoNumberSuffix(value, pluralSlot))
                .filter((value, index, list) => list.indexOf(value) === index);
        };
        const baseVariants = getSustantivoVerbalSuffixVariants(verb);
        subjectSuffix = baseVariants[0] || applyAgentivoNumberSuffix("lis", pluralSlot);
        if (isNounContextFinal && nounContextPrimaryFormSpec) {
            nounContextPrimaryFormSpec = withNominalFormSpecSuffix(
                nounContextPrimaryFormSpec,
                subjectSuffix,
                {
                    verb,
                    subjectSuffix,
                }
            );
        }
        const nounAlternatesWithSuffixes = baseVariants
            .slice(1)
            .map((value) => buildNominalFormEntry(verb, value));
        if (alternateForms.length) {
            alternateForms.forEach((form) => {
                if (!form) {
                    return;
                }
                const normalizedForm = isNounContextFinal
                    ? normalizeNominalFormEntry(form, { verb, subjectSuffix: form.subjectSuffix ?? baseSuffix })
                    : form;
                const formStem = typeof normalizedForm.verb === "string" ? normalizedForm.verb : verb;
                const formVariants = getSustantivoVerbalSuffixVariants(formStem);
                normalizedForm.subjectSuffix = formVariants[0] || applyAgentivoNumberSuffix("lis", pluralSlot);
                if (isNounContextFinal) {
                    normalizedForm.formSpec = withNominalFormSpecSuffix(
                        normalizedForm.formSpec || null,
                        normalizedForm.subjectSuffix,
                        normalizedForm
                    );
                }
                formVariants.slice(1).forEach((value) => {
                    nounAlternatesWithSuffixes.push(
                        isNounContextFinal
                            ? withNominalFormEntrySuffix(normalizedForm, value, normalizedForm)
                            : { ...normalizedForm, subjectSuffix: value }
                    );
                });
            });
        }
        nounAlternatesWithSuffixes.forEach((entry) => alternateForms.push(entry));
    }
    if (isPatientivoAdjectiveProfile) {
        const pluralSlot = baseSubjectSuffix === "t" ? "t" : "";
        subjectSuffix = applyPatientivoAdjectiveNumberSuffix(pluralSlot);
        if (alternateForms.length) {
            alternateForms.forEach((form) => {
                if (!form) {
                    return;
                }
                form.subjectSuffix = applyPatientivoAdjectiveNumberSuffix(pluralSlot);
                if (isNounContextFinal) {
                    form.formSpec = withNominalFormSpecSuffix(form.formSpec || null, form.subjectSuffix, form);
                }
            });
        }
    }

    let sourceOuterPrefixForNominalOutput = "";
    if (isNounContextFinal && objectPrefix && sourceRawVerb) {
        const nounOutputSourceModel = buildVerbDerivedNominalSourceModel({
            sourceRawVerb,
            verb,
            analysisVerb,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
        });
        const nominalSurfacePlacement = resolveVerbDerivedNominalSourceOuterSurfacePlacement({
            sourceModel: nounOutputSourceModel,
            runtimeObjectPrefix: objectPrefix,
            objectPrefix,
            verb,
            surfaceRuleMeta: null,
        });
        sourceOuterPrefixForNominalOutput = String(
            nominalSurfacePlacement?.surfaceRuleMeta?.sourceOuterPrefix || ""
        );
        if (sourceOuterPrefixForNominalOutput) {
            verb = nominalSurfacePlacement.verb;
            if (nounContextPrimaryFormSpec) {
                nounContextPrimaryFormSpec = buildLiteralNominalFormSpec(verb, subjectSuffix);
            }
            if (alternateForms.length) {
                for (let index = 0; index < alternateForms.length; index += 1) {
                    alternateForms[index] = applyVerbDerivedNominalPlacementToEntry(
                        alternateForms[index],
                        nounOutputSourceModel,
                        {
                            runtimeObjectPrefix: objectPrefix,
                            objectPrefix,
                        }
                    );
                }
            }
        }
    }

    objectPrefix = normalizeValenceMarkerOrder(objectPrefix);
    const surfaceRuleMeta = {
        sourceOuterPrefix: sourceOuterPrefixForNominalOutput,
        imperativeKiReduction: tense === "imperativo"
            && (
                (baseSubjectPrefix === "ti" && baseSubjectSuffix === "")
                || (baseSubjectPrefix === "an" && baseSubjectSuffix === "t")
            ),
        dropVerbInitialIAfterObjectI: shouldApplyEarlyContactElision,
        dropInitialIFromIskaliaAfterMu: objectPrefix === "mu" || markerChain.includes("mu"),
        trimFinalIAUAVowel: tense === "imperativo" || dropClassCNucleusTenses.has(tense),
    };
    const directionalChainMeta = directionalInputPrefix
        ? {
            directionalInputPrefix,
            directionalOutputPrefix,
            directionalPlan,
            baseSubjectPrefix,
            baseSubjectSuffix,
            baseObjectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            directionalRuleMode,
            tense,
            isIntransitiveVerb,
            hasSubjectValent,
            isTaFusion,
            isYawi,
            isNounTense: isNounContextFinal,
        }
        : null;
    const normalizedAlternateForms = isNounContextFinal
        ? alternateForms.map((form) => normalizeNominalFormEntry(form, {
            subjectSuffix,
        })).filter((form) => form && form.subjectSuffix !== null)
        : alternateForms;
    return {
        subjectPrefix,
        objectPrefix,
        subjectSuffix,
        verb,
        formSpec: isNounContextFinal
            ? (nounContextPrimaryFormSpec || buildLiteralNominalFormSpec(verb, subjectSuffix))
            : null,
        alternateForms: normalizedAlternateForms,
        surfaceRuleMeta,
        directionalChainMeta,
        stemProvenance: stemProvenanceSeed || null,
    };
}
