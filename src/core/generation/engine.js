// core/generation/engine.js
// Core execution path for generateWord(): takes resolved inputs and optional UI hooks.

"use strict";

const GENERATE_WORD_NOOP = () => {};

function resolveGenerateWordUiHook(uiHooks = null, key = "") {
    const hook = uiHooks && typeof uiHooks === "object"
        ? uiHooks[key]
        : null;
    return typeof hook === "function" ? hook : GENERATE_WORD_NOOP;
}

function isOrdinaryNncGenerationOptIn(override = null) {
    const ordinaryNnc = override?.ordinaryNnc;
    return ordinaryNnc === true
        || (ordinaryNnc && typeof ordinaryNnc === "object" && ordinaryNnc.enabled === true);
}

function isAdjectivalNncGenerationOptIn(override = null) {
    const adjectivalNnc = override?.adjectivalNnc;
    return adjectivalNnc === true
        || (adjectivalNnc && typeof adjectivalNnc === "object" && adjectivalNnc.enabled === true);
}

function getOrdinaryNncGenerationOptions(override = null) {
    return override?.ordinaryNnc && typeof override.ordinaryNnc === "object"
        ? override.ordinaryNnc
        : {};
}

function getAdjectivalNncGenerationOptions(override = null) {
    return override?.adjectivalNnc && typeof override.adjectivalNnc === "object"
        ? override.adjectivalNnc
        : {};
}

function executeAdjectivalNncGenerationRoute({
    override = null,
    verb = "",
    subjectPrefix = "",
    subjectSuffix = "",
} = {}) {
    const adjectivalNnc = getAdjectivalNncGenerationOptions(override);
    const shouldUseRootPlusYaRoute = typeof shouldGenerateRootPlusYaAdjectivalNnc === "function"
        && shouldGenerateRootPlusYaAdjectivalNnc(adjectivalNnc);
    const result = shouldUseRootPlusYaRoute && typeof generateRootPlusYaAdjectivalNncOutput === "function"
        ? generateRootPlusYaAdjectivalNncOutput({
            stem: adjectivalNnc.stem ?? verb,
            state: adjectivalNnc.state ?? "absolutive",
            subject: {
                subjectPrefix: adjectivalNnc.subjectPrefix ?? subjectPrefix,
                subjectSuffix: adjectivalNnc.subjectSuffix ?? subjectSuffix,
                personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? "",
            },
            role: adjectivalNnc.role ?? "predicate-surface",
        })
        : typeof generateAdjectivalNncFunctionOutput === "function"
        ? generateAdjectivalNncFunctionOutput({
            stem: adjectivalNnc.stem ?? verb,
            state: adjectivalNnc.state ?? "absolutive",
            subject: {
                subjectPrefix: adjectivalNnc.subjectPrefix ?? subjectPrefix,
                subjectSuffix: adjectivalNnc.subjectSuffix ?? subjectSuffix,
                personSubKey: adjectivalNnc.subjectKey ?? adjectivalNnc.personSubKey ?? "",
            },
            number: adjectivalNnc.number ?? "singular",
            pluralType: adjectivalNnc.pluralType ?? "auto",
            nounClass: adjectivalNnc.nounClass ?? "",
            animacy: adjectivalNnc.animacy ?? "",
            role: adjectivalNnc.role ?? "modifier-candidate",
        })
        : {
            outputKind: "adjectival-nnc-function",
            clauseKind: "nominal-nuclear-clause",
            supported: false,
            result: "",
            surfaceForms: [],
            stem: String(adjectivalNnc.stem ?? verb ?? ""),
            state: adjectivalNnc.state ?? "absolutive",
            generationRoute: "adjectival-nnc",
            diagnostics: [{
                id: "adjectival-nnc-unavailable",
                severity: "error",
                message: "Adjectival NNC function generation is unavailable.",
            }],
        };
    const nuclearClauseShell = typeof buildNuclearClauseShellMetadata === "function"
        ? buildNuclearClauseShellMetadata({
            clauseKind: "nominal-nuclear-clause",
            formulaSlots: result.adjectivalNncFunctionFrame?.sourceFormulaSlots
                || result.nncBasic?.formulaSlots
                || result.clauseFrame?.formulaSlots
                || null,
            formulaEcho: result.adjectivalNncFunctionFrame?.sourceFormulaEcho
                || result.nncBasic?.formulaEcho
                || result.clauseFrame?.formulaEcho
                || "",
            predicate: {
                stem: result.stem || adjectivalNnc.stem || verb,
                state: result.state || "absolutive",
            },
            predicateState: result.state || "absolutive",
        })
        : null;
    const sentenceLayer = typeof buildGeneratedSentenceLayerMetadata === "function"
        ? buildGeneratedSentenceLayerMetadata({
            override,
            tense: result.tense || adjectivalNnc.targetTense || "",
            nuclearClauseShell,
            clauseKind: "nominal-nuclear-clause",
        })
        : null;
    return {
        ...result,
        generationRoute: "adjectival-nnc",
        isReflexive: false,
        stemProvenance: null,
        nuclearClauseShell,
        sentenceLayer,
    };
}

function executeOrdinaryNncGenerationRoute({
    override = null,
    verb = "",
    subjectPrefix = "",
    subjectSuffix = "",
    possessivePrefix = "",
} = {}) {
    const ordinaryNnc = getOrdinaryNncGenerationOptions(override);
    const possessor = ordinaryNnc.possessor ?? ordinaryNnc.possessivePrefix ?? possessivePrefix;
    const state = ordinaryNnc.state ?? (possessor ? "possessive" : "absolutive");
    const result = typeof generateOrdinaryNncParadigm === "function"
        ? generateOrdinaryNncParadigm({
            stem: ordinaryNnc.stem ?? verb,
            state,
            subject: {
                subjectPrefix: ordinaryNnc.subjectPrefix ?? subjectPrefix,
                subjectSuffix: ordinaryNnc.subjectSuffix ?? subjectSuffix,
                personSubKey: ordinaryNnc.subjectKey ?? ordinaryNnc.personSubKey ?? "",
            },
            possessor,
            possessivePrefix: possessor,
            number: ordinaryNnc.number ?? "singular",
            pluralType: ordinaryNnc.pluralType ?? "auto",
            nounClass: ordinaryNnc.nounClass ?? "",
            animacy: ordinaryNnc.animacy ?? "",
            possessionKind: ordinaryNnc.possessionKind ?? "",
            stateCase: ordinaryNnc.stateCase ?? "",
            possessionType: ordinaryNnc.possessionType ?? "",
        })
        : {
            outputKind: "nominal-nuclear-clause",
            clauseKind: "nominal-nuclear-clause",
            supported: false,
            result: "",
            surfaceForms: [],
            stem: String(ordinaryNnc.stem ?? verb ?? ""),
            state,
            nounClass: "",
            animacy: "",
            number: ordinaryNnc.number ?? "singular",
            pluralType: ordinaryNnc.pluralType ?? "",
            subject: null,
            possessor: null,
            diagnostics: [{
                id: "ordinary-nnc-unavailable",
                severity: "error",
                message: "Ordinary NNC generation is unavailable.",
            }],
        };
    const nuclearClauseShell = typeof buildNuclearClauseShellMetadata === "function"
        ? buildNuclearClauseShellMetadata({
            clauseKind: "nominal-nuclear-clause",
            formulaSlots: result.formulaSlots || result.clauseFrame?.formulaSlots || null,
            formulaEcho: result.formulaEcho || result.clauseFrame?.formulaEcho || "",
            predicate: {
                stem: result.stem || ordinaryNnc.stem || verb,
                state: result.state || state,
            },
            predicateState: result.state || state,
        })
        : null;
    const sentenceLayer = typeof buildGeneratedSentenceLayerMetadata === "function"
        ? buildGeneratedSentenceLayerMetadata({
            override,
            tense: result.tense || ordinaryNnc.targetTense || "",
            nuclearClauseShell,
            clauseKind: "nominal-nuclear-clause",
        })
        : null;
    return {
        ...result,
        generationRoute: "ordinary-nnc",
        isReflexive: false,
        stemProvenance: null,
        nuclearClauseShell,
        sentenceLayer,
    };
}

function buildGeneratedNuclearClauseShellMetadata({
    resolvedTenseMode = "",
    tense = "",
    subjectPrefix = "",
    subjectSuffix = "",
    objectPrefix = "",
    verb = "",
    renderVerb = "",
    nominalClauseMetadata = null,
} = {}) {
    if (typeof buildNuclearClauseShellMetadata !== "function") {
        return null;
    }
    const isNominalShell = Boolean(nominalClauseMetadata?.nominalClauseFrame)
        || resolvedTenseMode === TENSE_MODE.sustantivo
        || resolvedTenseMode === TENSE_MODE.adjetivo
        || resolvedTenseMode === TENSE_MODE.adverbio;
    if (isNominalShell) {
        const numberConnector = nominalClauseMetadata?.subjectNumberConnector
            || nominalClauseMetadata?.nominalClauseFrame?.subject?.numberConnector
            || null;
        return buildNuclearClauseShellMetadata({
            clauseKind: "nominal-nuclear-clause",
            formulaSlots: {
                subjectPerson: {
                    slot: "pers1-pers2",
                    prefix: subjectPrefix,
                    suffix: "",
                },
                predicate: {
                    slot: "STEM",
                    stem: renderVerb || verb,
                    state: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal",
                    stateSlot: nominalClauseMetadata?.nominalClauseFrame?.predicate?.stateSlot || null,
                },
                subjectNumberConnector: {
                    slot: "num1-num2",
                    connector: numberConnector
                        ? String(numberConnector.surface || "")
                        : String(subjectSuffix || ""),
                    displayConnector: numberConnector
                        ? String(numberConnector.displaySurface || numberConnector.surface || "Ø")
                        : (String(subjectSuffix || "") || "Ø"),
                    nounClass: numberConnector?.nounClass || "",
                },
            },
            predicateState: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal",
        });
    }
    return buildNuclearClauseShellMetadata({
        clauseKind: "verbal-nuclear-clause",
        subject: {
            prefix: subjectPrefix,
            suffix: subjectSuffix,
        },
        object: {
            prefix: objectPrefix,
        },
        predicate: {
            stem: renderVerb || verb,
        },
        tenseValue: tense,
        tenseLabel: tense,
    });
}

function buildGeneratedVncValencyFrameMetadata({
    resolvedTenseMode = "",
    subjectPrefix = "",
    subjectSuffix = "",
    objectPrefix = "",
    baseObjectPrefix = "",
    indirectObjectMarker = "",
    thirdObjectMarker = "",
    parsedVerb = null,
    valencySummary = null,
    targetValency = null,
    isPassiveImpersonalMode = false,
    nuclearClauseShell = null,
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.verbo) {
        return null;
    }
    const normalizedObjectPrefix = String(objectPrefix || "");
    const normalizedBaseObjectPrefix = String(baseObjectPrefix || normalizedObjectPrefix || "");
    const normalizedIndirect = String(indirectObjectMarker || "");
    const normalizedThird = String(thirdObjectMarker || "");
    const selectedObjectMarkers = [normalizedObjectPrefix, normalizedIndirect, normalizedThird].filter(Boolean);
    const baseObjectSlots = Number.isFinite(valencySummary?.baseObjectSlots)
        ? valencySummary.baseObjectSlots
        : (typeof getBaseObjectSlots === "function" ? getBaseObjectSlots(parsedVerb) : selectedObjectMarkers.length);
    const availableObjectSlots = Number.isFinite(valencySummary?.availableObjectSlots)
        ? valencySummary.availableObjectSlots
        : Math.max(0, baseObjectSlots);
    const resolvedTargetValency = Number.isFinite(targetValency)
        ? targetValency
        : Math.max(1, baseObjectSlots + 1);
    const subjectInfo = typeof getSubjectPersonInfo === "function"
        ? getSubjectPersonInfo(subjectPrefix, subjectSuffix)
        : null;
    const objectInfo = typeof getObjectPersonInfo === "function"
        ? getObjectPersonInfo(normalizedObjectPrefix)
        : null;
    const selectedValency = Math.max(1, 1 + selectedObjectMarkers.length);
    const isTransitiveFrame = baseObjectSlots > 0 || selectedObjectMarkers.length > 0 || resolvedTargetValency > 1;
    return {
        kind: "vnc-valency-frame",
        version: 1,
        lessonRange: "5-6",
        source: "generate-word",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        valency: isTransitiveFrame ? "transitive" : "intransitive",
        valencyLabel: isTransitiveFrame ? "transitiva" : "intransitiva",
        baseObjectSlots,
        availableObjectSlots,
        selectedObjectSlots: selectedObjectMarkers.length,
        selectedValency,
        targetValency: resolvedTargetValency,
        isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
        subject: {
            slot: "subject",
            prefix: String(subjectPrefix || ""),
            suffix: String(subjectSuffix || ""),
            displayPrefix: String(subjectPrefix || "") || "Ø",
            displaySuffix: String(subjectSuffix || "") || "Ø",
            person: subjectInfo?.person ?? null,
            number: subjectInfo?.number || "",
        },
        object: {
            slot: "object",
            prefix: normalizedObjectPrefix,
            basePrefix: normalizedBaseObjectPrefix,
            displayPrefix: normalizedObjectPrefix || "Ø",
            displayBasePrefix: normalizedBaseObjectPrefix || "Ø",
            person: objectInfo?.person ?? null,
            number: objectInfo?.number || "",
            isPresent: Boolean(normalizedObjectPrefix),
            indirectObjectMarker: normalizedIndirect,
            thirdObjectMarker: normalizedThird,
        },
        nuclearClauseFormulaSlots: nuclearClauseShell?.formulaSlots || null,
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            objectLabelsAreNotEvidenceForSentenceObjects: true,
        },
    };
}

function buildGeneratedDerivedVoiceFrameMetadata({
    resolvedTenseMode = "",
    resolvedDerivationMode = "",
    resolvedVoiceMode = "",
    isNonactive = false,
    isPassiveImpersonalMode = false,
    sourceValency = null,
    targetValency = null,
    valencySummary = null,
    parsedVerb = null,
    verb = "",
    analysisVerb = "",
    subjectPrefix = "",
    subjectSuffix = "",
    objectPrefix = "",
    baseObjectPrefix = "",
    hasPromotableObject = false,
    preserveSubjectForPassive = false,
    allowPassiveObject = false,
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.verbo) {
        return null;
    }
    const hasImpersonalPrefix = parsedVerb?.hasImpersonalTaPrefix === true;
    if (!isNonactive && !isPassiveImpersonalMode && !hasImpersonalPrefix) {
        return null;
    }
    const normalizedObjectPrefix = String(objectPrefix || "");
    const normalizedBaseObjectPrefix = String(baseObjectPrefix || normalizedObjectPrefix || "");
    const normalizedSourceValency = Number.isFinite(sourceValency)
        ? sourceValency
        : Math.max(1, (Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : 0) + 1);
    const normalizedTargetValency = Number.isFinite(targetValency)
        ? targetValency
        : normalizedSourceValency;
    const isImpersonalFrame = hasImpersonalPrefix || (isPassiveImpersonalMode && !hasPromotableObject);
    const voiceLabel = hasImpersonalPrefix
        ? "impersonal ta-"
        : (isPassiveImpersonalMode ? "pasivo/impersonal" : "no activo");
    return {
        kind: "derived-voice-frame",
        version: 1,
        lessonRange: "20-23",
        source: "generate-word",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
            mode: String(resolvedDerivationMode || ""),
            isNonactive: Boolean(isNonactive),
            label: isNonactive ? "no activo" : "activo",
            finalStem: String(verb || ""),
            analysisStem: String(analysisVerb || verb || ""),
        },
        voice: {
            mode: String(resolvedVoiceMode || ""),
            label: voiceLabel,
            isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
            isImpersonalFrame,
            hasImpersonalTaPrefix: hasImpersonalPrefix,
            hasPromotableObject: Boolean(hasPromotableObject),
            preserveSubjectForPassive: Boolean(preserveSubjectForPassive),
            allowPassiveObject: Boolean(allowPassiveObject),
        },
        valency: {
            sourceValency: normalizedSourceValency,
            targetValency: normalizedTargetValency,
            baseObjectSlots: Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : null,
            fusionObjectSlots: Number.isFinite(valencySummary?.fusionObjectSlots) ? valencySummary.fusionObjectSlots : null,
            availableObjectSlots: Number.isFinite(valencySummary?.availableObjectSlots) ? valencySummary.availableObjectSlots : null,
            selectedObjectPrefix: normalizedObjectPrefix,
            baseObjectPrefix: normalizedBaseObjectPrefix,
            objectClearedByVoice: Boolean(normalizedBaseObjectPrefix && !normalizedObjectPrefix && isPassiveImpersonalMode),
        },
        subject: {
            prefix: String(subjectPrefix || ""),
            suffix: String(subjectSuffix || ""),
            displayPrefix: String(subjectPrefix || "") || "Ø",
            displaySuffix: String(subjectSuffix || "") || "Ø",
        },
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            noNewVoiceBehavior: true,
        },
    };
}

function getGeneratedForwardDerivationLabel(derivationType = "") {
    if (derivationType === DERIVATION_TYPE.causative) {
        return "causativa";
    }
    if (derivationType === DERIVATION_TYPE.applicative) {
        return "aplicativa";
    }
    return String(derivationType || "");
}

function buildGeneratedForwardDerivationFrameMetadata({
    resolvedTenseMode = "",
    resolvedDerivationType = "",
    derivationValencyDelta = 0,
    sourceValency = null,
    forwardDerivations = null,
    forwardStemProvenance = null,
    causativeAllStems = null,
    applicativeAllStems = null,
    renderVerb = "",
    verb = "",
    analysisVerb = "",
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.verbo) {
        return null;
    }
    const config = typeof getForwardDerivationConfig === "function"
        ? getForwardDerivationConfig(resolvedDerivationType)
        : null;
    if (!config) {
        return null;
    }
    const selectedMeta = resolvedDerivationType === DERIVATION_TYPE.causative
        ? forwardDerivations?.causativeSelectionMeta
        : forwardDerivations?.applicativeSelectionMeta;
    const candidateStems = resolvedDerivationType === DERIVATION_TYPE.causative
        ? causativeAllStems
        : applicativeAllStems;
    const normalizedCandidateStems = Array.isArray(candidateStems)
        ? candidateStems.map((stem) => String(stem || "")).filter(Boolean)
        : [];
    const sourceStemForComparison = normalizeDerivationStemValue(renderVerb || "");
    const derivedCandidateStem = normalizedCandidateStems.find((stem) => (
        normalizeDerivationStemValue(stem) !== sourceStemForComparison
    )) || normalizedCandidateStems[0] || "";
    const selectedStemCandidate = normalizeDerivationStemValue(
        selectedMeta?.surfaceStem
        || forwardStemProvenance?.surfaceStem
        || (selectedMeta?.stemSpec ? realizeMorphStemSpec(selectedMeta.stemSpec, selectedMeta.stem || "") : "")
        || selectedMeta?.stem
        || ""
    );
    const selectedStem = normalizeDerivationStemValue(
        (
            selectedStemCandidate
            && selectedStemCandidate !== sourceStemForComparison
        )
            ? selectedStemCandidate
            : (
                derivedCandidateStem
                || selectedStemCandidate
                || analysisVerb
                || verb
                || ""
            )
    );
    const delta = Number.isFinite(derivationValencyDelta) ? derivationValencyDelta : 0;
    const derivedValency = Number.isFinite(sourceValency)
        ? sourceValency
        : null;
    const baseValency = Number.isFinite(derivedValency)
        ? Math.max(1, derivedValency - delta)
        : null;
    const lessonRange = resolvedDerivationType === DERIVATION_TYPE.causative
        ? "24-25"
        : "26";
    return {
        kind: "forward-derivation-frame",
        version: 1,
        lessonRange,
        source: "generate-word",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
            type: resolvedDerivationType,
            label: getGeneratedForwardDerivationLabel(resolvedDerivationType),
            valencyDelta: delta,
            rule: String(selectedMeta?.rule || forwardStemProvenance?.rule || ""),
            patternType: String(selectedMeta?.patternType || forwardStemProvenance?.patternType || ""),
            guidanceRouteText: String(
                selectedMeta?.guidanceRoute?.text
                || forwardStemProvenance?.guidanceRoute?.text
                || ""
            ),
        },
        stem: {
            sourceVerb: String(renderVerb || ""),
            selectedStem,
            finalStem: String(verb || ""),
            analysisStem: String(analysisVerb || verb || ""),
            candidateStems: normalizedCandidateStems,
        },
        valency: {
            sourceValency: baseValency,
            derivedValency,
            delta,
        },
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            noNewDerivationBehavior: true,
        },
    };
}

function buildGeneratedCompoundFrameMetadata({
    resolvedTenseMode = "",
    parsedVerb = null,
} = {}) {
    const compoundAst = parsedVerb?.compoundAst || null;
    if (resolvedTenseMode !== TENSE_MODE.verbo || !compoundAst || compoundAst.kind !== "compound") {
        return null;
    }
    const embeds = Array.isArray(compoundAst.embeds)
        ? compoundAst.embeds.map((entry) => ({
            role: String(entry?.role || ""),
            kind: String(entry?.kind || ""),
            value: String(entry?.value || ""),
            source: String(entry?.source || ""),
            explicit: entry?.explicit === true,
        }))
        : [];
    if (!embeds.length) {
        return null;
    }
    return {
        kind: "compound-frame",
        version: 1,
        lessonRange: "28,30",
        source: "parse-compoundAst",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        matrix: {
            role: "matrix",
            stem: String(compoundAst.matrix?.stem || ""),
            ruleBase: String(compoundAst.matrix?.ruleBase || ""),
        },
        embeds,
        sourceInput: {
            rawInput: String(compoundAst.source?.rawInput || ""),
            displayVerb: String(compoundAst.source?.displayVerb || ""),
            displayCore: String(compoundAst.source?.displayCore || ""),
            verb: String(compoundAst.source?.verb || ""),
            analysisVerb: String(compoundAst.source?.analysisVerb || ""),
        },
        valency: compoundAst.valency && typeof compoundAst.valency === "object"
            ? { ...compoundAst.valency }
            : null,
        flags: compoundAst.flags && typeof compoundAst.flags === "object"
            ? { ...compoundAst.flags }
            : {},
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            notCompoundNncGeneration: true,
        },
    };
}

function buildGeneratedAdverbialNuclearFrameMetadata({
    resolvedTenseMode = "",
    tense = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    objectPrefix = "",
    baseObjectPrefix = "",
} = {}) {
    if (resolvedTenseMode !== TENSE_MODE.adverbio) {
        return null;
    }
    const knownTenses = typeof getKnownLegacyAdverbioTensesForAdverbialBoundary === "function"
        ? getKnownLegacyAdverbioTensesForAdverbialBoundary()
        : ["pasado-remoto-adverbio-activo"];
    if (!knownTenses.includes(tense)) {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const normalizedObjectPrefix = String(objectPrefix || "");
    const normalizedBaseObjectPrefix = String(baseObjectPrefix || normalizedObjectPrefix || "");
    const classification = typeof classifyAdverbialNuclearCandidate === "function"
        ? classifyAdverbialNuclearCandidate({
            source: sourceStem,
            candidate: "",
            tense,
            adverbialKind: "manner-surface",
            falsePositiveSource: "legacy-adverbio-surface",
        })
        : null;
    return {
        kind: "adverbial-nuclear-frame",
        version: 1,
        lesson: 44,
        source: "generate-word",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        adverbial: {
            kind: "manner-surface",
            label: "manera",
            degree: "legacy-adverbio",
            isFullLesson44Engine: false,
        },
        sourceVnc: {
            stem: sourceStem,
            finalStem: String(verb || ""),
            analysisStem: String(analysisVerb || verb || ""),
            valency: normalizedObjectPrefix || normalizedBaseObjectPrefix ? "transitive" : "intransitive",
            objectPrefix: normalizedObjectPrefix,
            baseObjectPrefix: normalizedBaseObjectPrefix,
        },
        tense,
        classification: classification
            ? {
                kind: classification.kind,
                adverbialKind: classification.adverbialKind,
                hasKnownLegacyAdverbioTense: classification.hasKnownLegacyAdverbioTense === true,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isSentenceEngine: false,
            isGenerationRule: false,
            changesSurfaceForms: false,
            noFullAdverbialClauseEngine: true,
            legacyAdverbioSurfaceOnly: true,
        },
    };
}

function buildGeneratedRelationalNncBoundaryFrameMetadata({
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    nominalizationProfile = null,
} = {}) {
    if (nominalKind !== "locativo-temporal") {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const sourceTense = String(nominalizationProfile?.source?.sourceTense || "imperfecto");
    const classification = typeof classifyRelationalNncCandidate === "function"
        ? classifyRelationalNncCandidate({
            candidate: String(renderVerb || verb || ""),
            relationalStem: "",
            relationalKind: "locative",
            relationalOption: "unknown",
            governedArgument: "",
            falsePositiveSource: "locative-temporal-nominal",
            sourceKind: "generated-verb-derived-nominal",
        })
        : null;
    return {
        kind: "relational-nnc-boundary-frame",
        version: 1,
        lessonRange: "45-47",
        source: "generate-word",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmado",
        candidate: {
            nominalKind,
            kindLabel: "locativo-temporal generado",
            sourceVnc: sourceStem,
            sourceTense,
            sourceKind: "generated-verb-derived-nominal",
        },
        classification: classification
            ? {
                kind: classification.kind,
                relationalKind: classification.relationalKind,
                relationalOption: classification.relationalOption,
                falsePositiveSource: classification.falsePositiveSource,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isGenerationRule: false,
            changesSurfaceForms: false,
            noRelationalNncGeneration: true,
            locativeTemporalNominalIsEvidence: false,
            noStaticRelationalFixture: true,
        },
    };
}

function buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    nominalizationProfile = null,
} = {}) {
    if (nominalKind !== "locativo-temporal") {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const sourceTense = String(nominalizationProfile?.source?.sourceTense || "imperfecto");
    const classification = typeof classifyPlaceGentilicNncCandidate === "function"
        ? classifyPlaceGentilicNncCandidate({
            candidate: String(renderVerb || verb || ""),
            placeNameSource: "",
            gentilicSource: "",
            placeGentilicKind: "place-name",
            associatedPlace: "",
            collectivity: "",
            falsePositiveSource: "locative-temporal-nominal",
            sourceKind: "generated-verb-derived-nominal",
        })
        : null;
    return {
        kind: "place-gentilic-nnc-boundary-frame",
        version: 1,
        lesson: 48,
        source: "generate-word",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmado",
        candidate: {
            nominalKind,
            kindLabel: "locativo-temporal generado",
            placeGentilicKind: "place-name",
            sourceVnc: sourceStem,
            sourceTense,
            sourceKind: "generated-verb-derived-nominal",
        },
        classification: classification
            ? {
                kind: classification.kind,
                placeGentilicKind: classification.placeGentilicKind,
                falsePositiveSource: classification.falsePositiveSource,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isGenerationRule: false,
            changesSurfaceForms: false,
            noPlaceNameNncGeneration: true,
            noGentilicNncGeneration: true,
            locativeTemporalNominalIsEvidence: false,
            noStaticPlaceOrGentilicFixture: true,
        },
    };
}

function buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
    resolvedTenseMode = "",
    tense = "",
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
    sourceTense = "",
} = {}) {
    const isLegacyAdverbio = resolvedTenseMode === TENSE_MODE.adverbio
        && tense === "pasado-remoto-adverbio-activo";
    const isLocativoTemporal = nominalKind === "locativo-temporal";
    if (!isLegacyAdverbio && !isLocativoTemporal) {
        return null;
    }
    const sourceStem = String(analysisVerb || verb || renderVerb || "");
    const semanticRelation = isLegacyAdverbio ? "manner" : "place";
    const adjoinedUnitType = isLegacyAdverbio ? "vnc" : "nnc";
    const falsePositiveSource = isLegacyAdverbio
        ? "legacy-adverbio-surface"
        : "single-generated-word";
    const candidateLabel = isLegacyAdverbio
        ? "adverbio heredado"
        : "locativo-temporal generado";
    const classification = typeof classifyAdverbialAdjunctionCandidate === "function"
        ? classifyAdverbialAdjunctionCandidate({
            principalClause: "",
            adjoinedUnit: candidateLabel,
            candidate: String(renderVerb || verb || ""),
            semanticRelation,
            adjoinedUnitType,
            marking: "",
            falsePositiveSource,
        })
        : null;
    return {
        kind: "adverbial-adjunction-boundary-frame",
        version: 1,
        lessonRange: "49-50",
        source: "generate-word",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmada",
        candidate: {
            label: candidateLabel,
            sourceVnc: sourceStem,
            sourceTense: String(sourceTense || tense || ""),
            semanticRelation,
            adjoinedUnitType,
            falsePositiveSource,
        },
        classification: classification
            ? {
                kind: classification.kind,
                semanticRelation: classification.semanticRelation,
                adjoinedUnitType: classification.adjoinedUnitType,
                falsePositiveSource: classification.falsePositiveSource,
                confirmed: classification.confirmed === true,
                generationAllowed: classification.generationAllowed === true,
                diagnostics: Array.isArray(classification.diagnostics)
                    ? Array.from(classification.diagnostics)
                    : [],
            }
            : null,
        boundaries: {
            isGenerationRule: false,
            changesSurfaceForms: false,
            noClauseAdjunctionAst: true,
            singleGeneratedWordIsEvidence: false,
            noStaticAdjunctionData: true,
        },
    };
}

const GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE = Object.freeze({
    "adjetivo-preterito-tik": {
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-preterit",
        sourceSlot: "noun/inc.root",
        sourceCategory: "noun-or-incorporated-root",
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "preterito",
        surfaceSuffix: "-tik",
    },
    "adjetivo-perfecto-tik": {
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-perfect",
        sourceSlot: "noun/inc.root",
        sourceCategory: "noun-or-incorporated-root",
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "perfecto",
        surfaceSuffix: "-tituk",
    },
    "adjetivo-preterito-naj": {
        routeFamily: "vt-na",
        structuralAnalogue: "transitive-denominal-route",
        routeId: "denominal-vt-na-preterit",
        sourceSlot: "noun/inc.obj.",
        sourceCategory: "noun-or-incorporated-object",
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "preterito",
        surfaceSuffix: "-naj",
    },
    "adjetivo-perfecto-naj": {
        routeFamily: "vt-na",
        structuralAnalogue: "transitive-denominal-route",
        routeId: "denominal-vt-na-perfect",
        sourceSlot: "noun/inc.obj.",
        sourceCategory: "noun-or-incorporated-object",
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "perfecto",
        surfaceSuffix: "-najtuk",
    },
});

function resolveGeneratedDenominalRouteProfileSpec(nominalKind = "") {
    const key = String(nominalKind || "").trim();
    if (!key) {
        return null;
    }
    if (typeof getNawatRouteProfile === "function") {
        const profile = getNawatRouteProfile(key);
        if (
            profile
            && typeof profile === "object"
            && profile.routePlacement === "patientivo-tronco-conversion"
            && profile.denominalFamily
        ) {
            return {
                ...profile,
                routeProfileSource: "static-modes",
            };
        }
    }
    const fallback = GENERATED_DENOMINAL_ROUTE_PROFILE_BY_TENSE[key];
    return fallback
        ? {
            ...fallback,
            routeProfileSource: "legacy-fallback",
        }
        : null;
}

function buildGeneratedDenominalFamilyProfileMetadata({
    nominalKind = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
} = {}) {
    const spec = resolveGeneratedDenominalRouteProfileSpec(nominalKind);
    if (!spec) {
        return null;
    }
    return {
        version: 1,
        curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
        outputKind: "denominal-route",
        routeFamily: spec.denominalFamily || spec.routeFamily || "",
        structuralAnalogue: spec.structuralAnalogue || "",
        routeId: spec.id || spec.routeId || "",
        routePlacement: spec.routePlacement || "patientivo-tronco-conversion",
        routeProfileSource: spec.routeProfileSource || "legacy-fallback",
        sourceState: "patientivo-tronco",
        sourceSlot: spec.sourceSlot,
        sourceCategory: spec.sourceCategory,
        sourceSurface: String(renderVerb || analysisVerb || verb || "").trim(),
        sourceInput: String(verb || analysisVerb || renderVerb || "").trim(),
        verbalizer: spec.verbalizer,
        verbalizerType: spec.verbalizerType,
        valency: spec.valency,
        targetTense: spec.nawatTenseValue || spec.targetTenseValue || spec.finiteTense || spec.targetTense || "",
        surfaceSuffix: spec.surfaceSuffix,
        supportStatus: "current-route-supported",
        isCompleteLesson54_55: false,
        boundaries: {
            noNewSurfaceForms: true,
            routeBasedOnly: true,
            suffixFamilyInventoryComplete: false,
            includedPossessorModeled: false,
            possessionDenominalModeled: false,
            temporalDenominalModeled: false,
            causativeApplicativeFamilyModeled: false,
        },
    };
}

function buildGeneratedNominalSubjectNumberConnectorMetadata({
    subjectSuffix = "",
    nominalKind = "",
    possessivePrefix = "",
    source = "generate-word",
    sourceTense = "",
    sourceCombinedMode = "",
    actionNounStemUse = "",
    patientivoSource = "",
    renderVerb = "",
    verb = "",
    analysisVerb = "",
} = {}) {
    const connector = typeof buildNominalSubjectNumberConnector === "function"
        ? buildNominalSubjectNumberConnector({
            subjectSuffix,
            nominalKind,
            predicateState: "derived-nominal",
            source,
        })
        : {
            version: 1,
            role: "subject-number-connector",
            slot: "subject.num1-num2",
            belongsTo: "subject",
            surface: String(subjectSuffix || ""),
            displaySurface: String(subjectSuffix || "") || "Ø",
            nominalKind: String(nominalKind || ""),
            predicateState: "derived-nominal",
            source,
            notNounSuffix: true,
            notStatePosition: true,
        };
    const hasPossessor = Boolean(possessivePrefix);
    const predicateStateSlot = {
        role: "predicate-state",
        slot: "predicate.state",
        state: hasPossessor ? "possessive" : "absolutive",
        statePosition: hasPossessor ? "possessor" : "vacant",
        isVacant: !hasPossessor,
        hasPossessor,
        participantRole: hasPossessor ? "possessor" : "",
        possessorPrefix: possessivePrefix || "",
        notSubjectConnector: true,
        notTense: true,
    };
    const nominalizationProfile = typeof buildVerbDerivedNominalizationProfile === "function"
        ? buildVerbDerivedNominalizationProfile({
            nominalKind,
            sourceTense,
            sourceModel: (sourceCombinedMode || actionNounStemUse) ? {
                matrixBase: analysisVerb || verb || renderVerb || "",
                sourceRawVerb: renderVerb || verb || analysisVerb || "",
                analysisVerb: analysisVerb || verb || "",
                combinedMode: sourceCombinedMode,
                actionNounStemUse,
            } : null,
            predicateStateSlot,
            subjectNumberConnector: connector,
            patientivoSource,
        })
        : null;
    return {
        subjectNumberConnector: connector,
        nominalizationProfile,
        relationalNncBoundaryFrame: buildGeneratedRelationalNncBoundaryFrameMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
            nominalizationProfile,
        }),
        placeGentilicNncBoundaryFrame: buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
            nominalizationProfile,
        }),
        denominalFamilyProfile: buildGeneratedDenominalFamilyProfileMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
        }),
        adverbialAdjunctionBoundaryFrame: buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
            nominalKind,
            renderVerb,
            verb,
            analysisVerb,
            sourceTense,
        }),
        nominalClauseFrame: {
            version: 1,
            clauseKind: "nominal-nuclear-clause",
            predicateKind: String(nominalKind || ""),
            hasTensePosition: false,
            tense: null,
            subject: {
                numberConnector: connector,
                numberConnectors: [connector],
            },
            predicate: {
                kind: String(nominalKind || ""),
                state: predicateStateSlot.state,
                stateSlot: predicateStateSlot,
            },
            stateSlot: predicateStateSlot,
        },
    };
}

function executeGenerateWordRequest(request = {}) {
    let options = request?.options || {};
    if (typeof Event !== "undefined" && options instanceof Event) {
        options = {};
    }
    options = sanitizeGenerateWordOptions(options);
    const silent = options.silent === true;
    const skipValidation = options.skipValidation === true;
    const override = options.override || null;
    const resolvedTenseMode = Object.values(TENSE_MODE).includes(override?.tenseMode)
        ? override.tenseMode
        : getActiveTenseMode();
    const resolvedDerivationMode = Object.values(DERIVATION_MODE).includes(override?.derivationMode)
        ? override.derivationMode
        : getActiveDerivationMode();
    const resolvedDerivationType = Object.values(DERIVATION_TYPE).includes(override?.derivationType)
        ? override.derivationType
        : getActiveDerivationType();
    const derivationValencyDelta = getDerivationValencyDelta(resolvedDerivationType);
    const resolvedVoiceMode = Object.values(VOICE_MODE).includes(override?.voiceMode)
        ? override.voiceMode
        : getActiveVoiceMode();
    const preservePassiveSubject = override?.preservePassiveSubject === true;
    const allowPassiveObject = options.allowPassiveObject === true || override?.allowPassiveObject === true;
    const prefixInputs = request?.prefixInputs && typeof request.prefixInputs === "object"
        ? request.prefixInputs
        : {};
    let subjectPrefix = prefixInputs.subjectPrefix || "";
    let objectPrefix = prefixInputs.objectPrefix || "";
    let verb = prefixInputs.verb || "";
    let subjectSuffix = prefixInputs.subjectSuffix || "";
    let possessivePrefix = prefixInputs.possessivePrefix || "";
    const inputSubjectSuffix = subjectSuffix;
    const liveInput = request?.liveInput && typeof request.liveInput === "object"
        ? request.liveInput
        : {};
    const hasVerbInput = liveInput.hasVerbInput === true;
    const verbInputValue = String(liveInput.verbInputValue || "");
    const clearError = resolveGenerateWordUiHook(request?.uiHooks, "clearError");
    const setError = resolveGenerateWordUiHook(request?.uiHooks, "setError");
    const onSearchQueryOnly = resolveGenerateWordUiHook(request?.uiHooks, "onSearchQueryOnly");
    const onValidationError = resolveGenerateWordUiHook(request?.uiHooks, "onValidationError");
    const onVerbInputSync = resolveGenerateWordUiHook(request?.uiHooks, "onVerbInputSync");
    const onVerbAnalysisResolved = resolveGenerateWordUiHook(request?.uiHooks, "onVerbAnalysisResolved");
    const onComplete = resolveGenerateWordUiHook(request?.uiHooks, "onComplete");
    const patientivoOwnership = override?.patientivoOwnership ?? DEFAULT_PATIENTIVO_OWNERSHIP;
    const patientivoSource = override?.patientivoSource ?? "nonactive";
    const patientivoNominalSuffix = override?.patientivoNominalSuffix ?? null;
    const actionNounStemUse = String(override?.actionNounStemUse || "");
    let searchQuery = "";
    let hasSearchQuery = false;
    let hasSearchSeparator = false;
    if (!override?.verb && hasVerbInput) {
        const searchParts = getSearchParts(verb);
        searchQuery = searchParts.query;
        hasSearchQuery = searchParts.trimmedQuery.length > 0;
        hasSearchSeparator = searchParts.hasQuery;
        const baseValue = rememberNonSearchValue(searchParts);
        if (baseValue) {
            verb = searchParts.base;
        } else if (hasSearchQuery && VerbInputState.lastNonSearchValue) {
            verb = VerbInputState.lastNonSearchValue;
        }
        if (hasSearchQuery && !verb) {
            if (!silent) {
                onSearchQueryOnly({
                    verbInputValue,
                });
            }
            return null;
        }
    }
    let tense = override?.tense || "";
    if (!tense) {
        const selectionState = getCurrentResolvedConjugationSelectionState();
        tense = selectionState.group === CONJUGATION_GROUPS.universal
            ? selectionState.universalTenseValue
            : selectionState.tenseValue;
    }
    if (isOrdinaryNncGenerationOptIn(override)) {
        return executeOrdinaryNncGenerationRoute({
            override,
            verb,
            subjectPrefix,
            subjectSuffix,
            possessivePrefix,
        });
    }
    if (isAdjectivalNncGenerationOptIn(override)) {
        return executeAdjectivalNncGenerationRoute({
            override,
            verb,
            subjectPrefix,
            subjectSuffix,
        });
    }
    const isTroncoNajActiveWrapperTense = isPotencialTroncoNajActiveTense(tense);
    const isPatientivoAdjectiveProfile = isPatientivoAdjectiveTense(tense);
    const isNominalOutputProfile = isNominalMorphProfileTense(tense);
    if (isPotencialProfileTense(tense) && tense !== "potencial") {
        possessivePrefix = "";
    }
    if (isPatientivoAdjectiveProfile) {
        possessivePrefix = "";
    }
    if (isTroncoNajActiveWrapperTense) {
        objectPrefix = "";
    }
    let baseObjectPrefix = objectPrefix;
    let isReflexive = objectPrefix === "mu";
    let isYawiImperativeSingular = false;
    let shouldAddYuVariant = false;
    const yawiSurfaceBase = getSuppletiveYawiImperfective();
    const yawiPresentLong = yawiSurfaceBase;
    const yawiPresentShort = yawiSurfaceBase;
    const yawiHabitual = yawiSurfaceBase;
    const yawiLegacyLong = getSuppletiveYawiCanonical();
    const yawiLegacyShort = getSuppletiveYawiShort();
    const yawiYuVariant = getSuppletiveYawiYuVariant();
    let primaryFormSpec = null;

    const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
            return null;
        }
        errorTargets.forEach((target) => setError(target));
        if (!silent) {
            onValidationError({
                tense,
                baseObjectPrefix,
            });
        }
        return { error: message };
    };
    const returnIfError = (message, errorTargets = []) => {
        const error = returnError(message, errorTargets);
        return error || null;
    };
    const buildActiveOutputWordText = ({
        subjectPrefix: subjectPrefixValue = "",
        objectPrefix: objectPrefixValue = "",
        subjectSuffix: subjectSuffixValue = "",
        verb: verbValue = "",
        trailingSuffix = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null,
        isYawiImperative = false,
    } = {}) => {
        const usePossessivePrefix = (
            tense === "sustantivo-verbal"
            || isPotencialProfileTense(tense)
            || tense === "agentivo"
            || tense === "patientivo"
            || tense === "instrumentivo"
            || tense === "calificativo-instrumentivo"
            || tense === "locativo-temporal"
        );
        const preposedParticle = tense === "imperativo"
            ? (
                isYawiImperative
                    ? "ma "
                    : (
                        getSubjectPersonInfo(subjectPrefixValue, subjectSuffixValue)?.person === 2
                            ? ""
                            : "ma "
                    )
            )
            : "";
        const outputTextOptions = {
            preposedParticle,
            subjectPrefix: subjectPrefixValue,
            possessivePrefix: usePossessivePrefix ? possessivePrefix : "",
            objectPrefix: objectPrefixValue,
            verb: verbValue,
            subjectSuffix: subjectSuffixValue,
            hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI === true,
            optionalSupportiveLetter: parsedVerb.optionalSupportiveLetter || "",
            directionalChainMeta,
            surfaceRuleMeta,
        };
        return isNominalOutputProfile
            ? buildNominalOutputText({
                ...outputTextOptions,
                trailingSuffix,
            })
            : buildOutputWordText(outputTextOptions);
    };
    let appliedMorphology = null;
    const mergeSurfaceRuleMeta = (...metas) => {
        const merged = {};
        let hasMeta = false;
        metas.forEach((meta) => {
            if (!meta || typeof meta !== "object") {
                return;
            }
            Object.assign(merged, meta);
            hasMeta = true;
        });
        return hasMeta ? merged : null;
    };
    const getCurrentSurfaceRuleMeta = () => (
        mergeSurfaceRuleMeta(appliedMorphology?.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta)
    );
    const buildWord = (overrideVerb = verb, overrideSuffix = subjectSuffix) => {
        const realizedNominal = isNominalOutputProfile
            ? realizeNominalFormSpec(primaryFormSpec, {
                verb: overrideVerb,
                subjectSuffix: overrideSuffix,
            })
            : null;
        return buildActiveOutputWordText({
            subjectPrefix,
            objectPrefix,
            subjectSuffix: realizedNominal ? realizedNominal.subjectSuffix : overrideSuffix,
            verb: realizedNominal ? realizedNominal.verb : overrideVerb,
            trailingSuffix: appliedMorphology?.trailingSuffix || "",
            directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
            surfaceRuleMeta: getCurrentSurfaceRuleMeta(),
            isYawiImperative: isYawiImperativeSingular,
        });
    };
    const buildWordFromParts = ({
        subjectPrefix: subjectPrefixValue,
        objectPrefix: objectPrefixValue,
        subjectSuffix: subjectSuffixValue,
        verb: verbValue,
        formSpec = null,
        trailingSuffix = "",
        isYawiImperative = false,
        directionalChainMeta = null,
        surfaceRuleMeta = null,
    }) => {
        const realizedNominal = isNominalOutputProfile
            ? realizeNominalFormSpec(formSpec, {
                verb: verbValue,
                subjectSuffix: subjectSuffixValue,
            })
            : null;
        return buildActiveOutputWordText({
            subjectPrefix: subjectPrefixValue,
            objectPrefix: objectPrefixValue,
            subjectSuffix: realizedNominal ? realizedNominal.subjectSuffix : subjectSuffixValue,
            verb: realizedNominal ? realizedNominal.verb : verbValue,
            trailingSuffix,
            directionalChainMeta,
            surfaceRuleMeta,
            isYawiImperative,
        });
    };

    clearError("subject-prefix");
    clearError("object-prefix");
    clearError("subject-suffix");

    const rawVerb = String(verb || "");
    const parseInputVerb = rawVerb;
    const rawVerbTiMetadata = getRawInputTiCausativeMetadata(parseInputVerb);
    const invalidCharacters = getInvalidVerbCharacters(parseInputVerb);
    const invalidLetters = getInvalidVerbLetters(parseInputVerb);
    const invalidStructure = getInvalidVerbStructure(parseInputVerb, {
        expectRegexEnvelope: false,
    });
    if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        const invalidList = Array.from(new Set([...invalidCharacters, ...invalidLetters])).join(", ");
        const message = invalidStructure
            ? getInvalidVerbStructureMessage(invalidStructure, {
                expectRegexEnvelope: false,
            })
            : (invalidList
                ? `El verbo contiene letras invalidas: ${invalidList}`
                : "El verbo contiene letras invalidas.");
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    }
    const preParsedVerb = override?.parsedVerb;
    const shouldReusePreParsed = canReusePreParsedVerb({
        parsedVerb: preParsedVerb,
        rawVerb: parseInputVerb,
    });
    const parsedVerb = shouldReusePreParsed
        ? { ...preParsedVerb }
        : parseVerbInput(parseInputVerb);
    parsedVerb.derivationType = resolvedDerivationType;
    parsedVerb.derivationValencyDelta = derivationValencyDelta;
    parsedVerb.tiCausativeClass = parsedVerb.tiCausativeClass
        || rawVerbTiMetadata.tiCausativeClass
        || normalizeTiCausativeClass(getComposerActiveTiCausativeClass())
        || "";
    verb = parsedVerb.verb;
    const renderVerb = parsedVerb.displayVerb;
    const rootPlusYaAdjectivalSource = typeof resolveRootPlusYaAdjectivalNncSource === "function"
        ? resolveRootPlusYaAdjectivalNncSource(parsedVerb)
        : {
            supported: parsedVerb.isRootPlusYa === true
                && parsedVerb.isWeya !== true
                && parsedVerb.hasSlashMarker !== true,
        };
    if (
        tense === "adjetivo-preterito"
        && resolvedTenseMode === TENSE_MODE.adjetivo
        && resolvedDerivationMode === DERIVATION_MODE.active
        && rootPlusYaAdjectivalSource.supported === true
    ) {
        return executeAdjectivalNncGenerationRoute({
            override: {
                ...override,
                adjectivalNnc: {
                    ...(override?.adjectivalNnc && typeof override.adjectivalNnc === "object" ? override.adjectivalNnc : {}),
                    enabled: true,
                    stem: rawVerb || renderVerb || verb,
                    state: "absolutive",
                    formation: "root-plus-ya-obsolete-preterit",
                    role: "predicate-surface",
                },
            },
            verb: rawVerb || renderVerb || verb,
            subjectPrefix,
            subjectSuffix,
        });
    }
    let analysisVerb = parsedVerb.analysisVerb;
    const analysisExactVerb = parsedVerb.exactBaseVerb || parsedVerb.analysisVerb || parsedVerb.verb;
    let indirectObjectMarker = parsedVerb.indirectObjectMarker;
    if (override && Object.prototype.hasOwnProperty.call(override, "indirectObjectMarker")) {
        indirectObjectMarker = override.indirectObjectMarker || "";
    }
    let thirdObjectMarker = "";
    if (override && Object.prototype.hasOwnProperty.call(override, "thirdObjectMarker")) {
        thirdObjectMarker = override.thirdObjectMarker || "";
    }
    const sourceSelectedProjectiveObjectPrefix = objectPrefix;
    const sourceSelectedProjectiveMarkers = [objectPrefix, indirectObjectMarker, thirdObjectMarker]
        .filter((marker) => marker === "ta" || marker === "te");
    const passivePatientivoSelectedProjectiveObjectPrefix = (
        tense === "patientivo"
        && normalizeVerbDerivedPatientiveFamily(patientivoSource) === "passive"
        && sourceSelectedProjectiveMarkers.length > 1
        && (sourceSelectedProjectiveObjectPrefix === "ta" || sourceSelectedProjectiveObjectPrefix === "te")
    ) ? sourceSelectedProjectiveObjectPrefix : "";
    ({ objectPrefix, baseObjectPrefix } = applyBoundMarkerPrefixOverrides(
        parsedVerb,
        objectPrefix,
        baseObjectPrefix,
        {
            preserveOccupiedSourceObjectPrefix: isNominalOutputProfile,
        }
    ));
    if (parsedVerb.hasImpersonalTaPrefix) {
        objectPrefix = "";
        baseObjectPrefix = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
    }
    ({
        objectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
    } = resolveValencePositionPrefixes({
        objectPrefix,
        indirectObjectMarker,
        derivationType: resolvedDerivationType,
    }));
    if (isTroncoNajActiveWrapperTense) {
        objectPrefix = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
    }
    baseObjectPrefix = objectPrefix;
    const sourceValency = getActiveVerbValency(parsedVerb);
    const fusionPrefixes = Array.isArray(parsedVerb.fusionPrefixes) ? parsedVerb.fusionPrefixes : [];
    const validationVerb = verb;
    const hasObjectSelection = Boolean(objectPrefix || indirectObjectMarker || thirdObjectMarker);
    const allowIntransitiveSuppletiveContext = isSuppletiveIntransitiveOnlyContext(parsedVerb, {
        hasObjectSelection,
    });
    let isYawi = parsedVerb.isYawi === true && allowIntransitiveSuppletiveContext;
    const isWeya = parsedVerb.isWeya === true && allowIntransitiveSuppletiveContext;
    isReflexive = objectPrefix === "mu";
    const directionalPrefix = parsedVerb.directionalPrefix;
    const rawSuppletivePath = getSuppletiveStemPath(parsedVerb);
    const suppletivePath = (
        rawSuppletivePath
        && isIntransitiveOnlySuppletiveId(rawSuppletivePath.id)
        && !allowIntransitiveSuppletiveContext
    ) ? null : rawSuppletivePath;
    let suppletiveStemSet = suppletivePath?.stemSet || null;
    const isYawiSuppletive = suppletivePath?.id === "yawi";
    const yawiPrefix = isYawiSuppletive
        && analysisVerb
        && verb.endsWith(analysisVerb)
        ? verb.slice(0, -analysisVerb.length)
        : "";
    const applyYawiPrefix = (form) => (yawiPrefix ? `${yawiPrefix}${form}` : form);
    if (suppletiveStemSet && isYawiSuppletive && yawiPrefix) {
        suppletiveStemSet = applySuppletiveYawiPrefixToStemSet(suppletiveStemSet, applyYawiPrefix);
    }
    const suppletiveTenseSuffixes = suppletivePath?.tenseSuffixOverrides || null;
    const suppletiveVerbOverrides = suppletivePath?.verbOverrides || null;
    const suppletiveNonactiveTenses = suppletivePath?.nonactiveTenses || null;
    const yawiPresentLongPrefixed = applyYawiPrefix(yawiPresentLong);
    const yawiPresentShortPrefixed = applyYawiPrefix(yawiPresentShort);
    const yawiHabitualPrefixed = applyYawiPrefix(yawiHabitual);
    const yawiLegacyLongPrefixed = applyYawiPrefix(yawiLegacyLong);
    const yawiLegacyShortPrefixed = applyYawiPrefix(yawiLegacyShort);
    const yawiYuVariantPrefixed = applyYawiPrefix(yawiYuVariant);
    if (suppletiveStemSet?.imperfective && !isPerfectiveTense(tense)) {
        verb = suppletiveStemSet.imperfective.verb;
        analysisVerb = suppletiveStemSet.imperfective.analysisVerb;
    }
    const isPotencialHabitualNominalProfile = isPotencialHabitualTense(tense)
        && resolvedTenseMode === TENSE_MODE.adjetivo
        && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    const isPotencialHabitualNominalNonactive = isPotencialHabitualNominalProfile;
    const isSustantivoVerbalImpersonalActionProfile = tense === "sustantivo-verbal"
        && resolvedTenseMode === TENSE_MODE.sustantivo
        && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    const isCalificativoInstrumentivoPassiveActionProfile = tense === "calificativo-instrumentivo"
        && resolvedTenseMode === TENSE_MODE.sustantivo
        && resolvedDerivationMode === DERIVATION_MODE.nonactive;
    const isPassiveImpersonalMode =
        (resolvedTenseMode === TENSE_MODE.verbo && resolvedVoiceMode === VOICE_MODE.passive)
        || isPotencialHabitualNominalNonactive
        || isSustantivoVerbalImpersonalActionProfile
        || isCalificativoInstrumentivoPassiveActionProfile;
    const targetValency = isPassiveImpersonalMode ? Math.max(0, sourceValency - 1) : sourceValency;
    let preserveSubjectForPassive = preservePassiveSubject;
    const valencySummary = getVerbValencySummary(parsedVerb);
    const hasOpenObjectSlot = valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots;
    const hasPromotableObject = PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(objectPrefix)
        || fusionPrefixes.some((prefix) => PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix))
        || hasOpenObjectSlot;
    const hasSubjectValent = !isPassiveImpersonalMode || (targetValency > 0 && hasPromotableObject);
    const shouldDelayPretAllomorphy = shouldDelaySlashSupportiveIAllomorphyForPret({
        parsedVerb,
        tense,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
    });
    const allomorphyResult = shouldDelayPretAllomorphy
        ? {
            verb,
            analysisVerb,
            morphologyObjectPrefix: objectPrefix,
        }
        : applyObjectAllomorphy({
            verb,
            analysisVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            isPassiveImpersonalMode,
            ...buildObjectAllomorphyMetaOptions(parsedVerb),
        });
    verb = allomorphyResult.verb;
    analysisVerb = allomorphyResult.analysisVerb;
    let morphologyObjectPrefix = allomorphyResult.morphologyObjectPrefix;
    if (!silent) {
        const resolvedComposerDisplayValue = isVerbInputModeComposer()
            ? resolveVerbInputSource(verbInputValue || rawVerb, { mode: VERB_INPUT_MODE.composer }).displayValue
            : "";
        const nextVerbInputValue = isVerbInputModeComposer()
            ? (resolvedComposerDisplayValue || rawVerb)
            : (serializeRegexInputValue(parseInputVerb) || parseInputVerb);
        onVerbInputSync({
            nextVerbInputValue,
        });
    }

    const isNonactive =
        (resolvedTenseMode === TENSE_MODE.verbo && resolvedDerivationMode === DERIVATION_MODE.nonactive)
        || isPotencialHabitualNominalNonactive
        || isSustantivoVerbalImpersonalActionProfile
        || isCalificativoInstrumentivoPassiveActionProfile;
    if (isNonactive && PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        tense = getCurrentResolvedConjugationSelectionState({ tenseMode: resolvedTenseMode }).tenseValue;
    }
    const resolvedDirectionalRuleMode = resolveDirectionalRuleMode(parsedVerb, {
        isNonactive,
        derivationType: resolvedDerivationType,
    });
    const getCurrentDerivationOptions = (overrides = {}) => {
        const optionVerb = overrides.verb ?? verb;
        const optionAnalysisVerb = overrides.analysisVerb ?? analysisVerb;
        const optionIsYawi = overrides.isYawi ?? isYawi;
        const optionSuppletiveStemSet = overrides.suppletiveStemSet ?? suppletiveStemSet;
        const reducedPotencialHabitualSource = resolvePotencialHabitualReducedNonactiveSource({
            parsedVerb,
            verb: optionVerb,
            analysisVerb: optionAnalysisVerb,
            objectPrefix,
            tense,
            tenseMode: resolvedTenseMode,
            derivationMode: resolvedDerivationMode,
        });
        return buildNonactiveDerivationOptions({
            verb: optionVerb,
            analysisVerb: optionAnalysisVerb,
            objectPrefix,
            parsedVerb,
            directionalPrefix,
            isYawi: optionIsYawi,
            suppletiveStemSet: optionSuppletiveStemSet,
            tense,
            tenseMode: resolvedTenseMode,
            derivationMode: resolvedDerivationMode,
            preferredNonactiveBaseVerb: reducedPotencialHabitualSource?.preferredNonactiveBaseVerb || "",
            preferredNonactiveSourceMeta: reducedPotencialHabitualSource?.preferredNonactiveSourceMeta || null,
            preferredNonactiveSourcePrefix: reducedPotencialHabitualSource?.preferredNonactiveSourcePrefix || "",
        });
    };
    const forwardDerivations = applyGenerateForwardDerivations({
        resolvedDerivationType,
        buildDerivationOptions: ({ verb, analysisVerb, isYawi, suppletiveStemSet }) => ({
            ...getCurrentDerivationOptions({
                verb,
                analysisVerb,
                isYawi,
                suppletiveStemSet,
            }),
            causativeSubtype: getActiveCausativeSubtype(),
        }),
        silent,
        renderVerb,
        baseObjectPrefix,
        tense,
        isReflexive,
        initialState: { verb, analysisVerb, isYawi, suppletiveStemSet },
    });
    if (forwardDerivations.noStemMask) {
        return forwardDerivations.noStemMask;
    }
    ({
        verb,
        analysisVerb,
        isYawi,
        suppletiveStemSet,
    } = forwardDerivations);
    let causativeAllStems = forwardDerivations.causativeAllStems;
    let applicativeAllStems = forwardDerivations.applicativeAllStems;
    let causativeAllStemSpecs = forwardDerivations.causativeAllStemSpecs || null;
    let applicativeAllStemSpecs = forwardDerivations.applicativeAllStemSpecs || null;
    const forwardStemProvenance = (
        !isNonactive
        && resolvedDerivationType === DERIVATION_TYPE.causative
        && forwardDerivations.causativeSelectionMeta
    )
        ? buildForwardDerivationProvenance({
            sourceVerb: renderVerb,
            analysisTarget: analysisVerb,
            tense,
            derivationType: resolvedDerivationType,
            isTransitive: getBaseObjectSlots(parsedVerb) > 0,
            selectedMeta: forwardDerivations.causativeSelectionMeta,
        })
        : null;
    const nonactiveDerivation = applyNonactiveDerivationFromOptions({
        isNonactive,
        derivationType: resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        derivationOptions: getCurrentDerivationOptions(),
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
    let nonactiveAllStems = nonactiveDerivation.nonactiveAllStems;
    let nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs)
        ? nonactiveDerivation.nonactiveAllStemSpecs
        : null;
    ({
        objectPrefix,
        morphologyObjectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        isReflexive,
    } = applyNonactiveGenerateOverrides({
        nonactiveDerivation,
        objectPrefix,
        morphologyObjectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        isReflexive,
    }));
    const passiveValencyAdjustments = applyPassiveImpersonalValencyAdjustments({
        isPassiveImpersonalMode,
        verb,
        analysisVerb,
        fusionPrefixes,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        targetValency,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObjectPrefix,
        hasPromotableObject,
    });
    verb = passiveValencyAdjustments.verb;
    analysisVerb = passiveValencyAdjustments.analysisVerb;
    subjectPrefix = passiveValencyAdjustments.subjectPrefix;
    subjectSuffix = passiveValencyAdjustments.subjectSuffix;
    objectPrefix = passiveValencyAdjustments.objectPrefix;
    indirectObjectMarker = passiveValencyAdjustments.indirectObjectMarker;
    thirdObjectMarker = passiveValencyAdjustments.thirdObjectMarker;
    preserveSubjectForPassive = passiveValencyAdjustments.preserveSubjectForPassive;
    morphologyObjectPrefix = passiveValencyAdjustments.morphologyObjectPrefix;
    const shouldApplyDerivedAllomorphy = !!getForwardDerivationConfig(resolvedDerivationType);
    if (shouldApplyDerivedAllomorphy) {
        const derivedAllomorphy = applyObjectAllomorphy({
            verb,
            analysisVerb,
            subjectPrefix,
            subjectSuffix,
            objectPrefix: morphologyObjectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
            isPassiveImpersonalMode,
            ...buildObjectAllomorphyMetaOptions(parsedVerb),
        });
        verb = derivedAllomorphy.verb;
        analysisVerb = derivedAllomorphy.analysisVerb;
        morphologyObjectPrefix = derivedAllomorphy.morphologyObjectPrefix;
    }
    const isWitziNonactive = isNonactive && suppletivePath?.id === "witzi";
    const isWitzInput = validationVerb === "witz";
    const allowConsonantEnding = isWitzInput;
    if (
        isNonactive
        && resolvedTenseMode === TENSE_MODE.verbo
        && suppletiveNonactiveTenses
        && !suppletiveNonactiveTenses.has(tense)
    ) {
        const error = returnIfError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) return error;
    }
    if (!isNonactive && suppletiveVerbOverrides && Object.prototype.hasOwnProperty.call(suppletiveVerbOverrides, tense)) {
        const overrideVerb = suppletiveVerbOverrides[tense];
        verb = overrideVerb;
        analysisVerb = overrideVerb;
    }
    if (
        !isNonactive
        && resolvedTenseMode === TENSE_MODE.verbo
        && suppletivePath?.activeTenses
        && !suppletivePath.activeTenses.has(tense)
    ) {
        const error = returnIfError("Solo pretérito y pasado remoto.", ["verb"]);
        if (error) return error;
    }
    isYawiImperativeSingular = isYawi && tense === "imperativo" && subjectSuffix === "";
    shouldAddYuVariant = isYawi && (tense === "presente" || isYawiImperativeSingular);

    if (validationVerb === "") {
        const message = "El verbo no puede estar vacío. Ingrese verbo.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    if (!VOWEL_RE.test(validationVerb)) {
        const message = "El verbo no está escrito correctamente.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    const authoritativeDerivationalRawInputSource = getAuthoritativeDerivationalSourceForRawInputGate({
        tense,
        patientivoSource,
    });
    const shouldBypassGenericRawInputGates = Boolean(authoritativeDerivationalRawInputSource);
    if (
        !VOWEL_END_RE.test(validationVerb)
        && !allowConsonantEnding
        && !shouldBypassGenericRawInputGates
    ) {
        if (skipValidation) {
            return {
                result: "—",
                error: true,
                isReflexive,
            };
        }
        const message = "El verbo debe terminar en vocal.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    const stemGate = evaluateVerbStemInputGate(rawVerb, parsedVerb);
    if (!stemGate.isValid && !shouldBypassGenericRawInputGates) {
        if (skipValidation) {
            return {
                result: "—",
                error: true,
                isReflexive,
            };
        }
        const message = "El segmento final del verbo no cumple un patrón silábico válido.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
    } else {
        clearError("verb");
    }
    if (isYawi && (tense === "presente" || isYawiImperativeSingular)) {
        const useLongYawiSlot = subjectSuffix === "t" || subjectPrefix === "";
        if (useLongYawiSlot) {
            verb = yawiPresentLongPrefixed;
        } else {
            verb = yawiPresentShortPrefixed;
        }
    }
    if (isYawi && (tense === "presente-habitual" || tense === "agentivo" || tense === "potencial-habitual")) {
        verb = yawiHabitualPrefixed;
    }
    ({ subjectPrefix, subjectSuffix } = resetSubjectForNounTenses(
        tense,
        override,
        subjectPrefix,
        subjectSuffix
    ));
    const isPassiveImpersonal = isPassiveImpersonalMode;
    if (isPassiveImpersonal) {
        const passiveOverrides = applyPassiveImpersonalOverrides({
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            analysisVerb,
            preserveSubjectForPassive,
            allowPassiveObject,
        });
        subjectPrefix = passiveOverrides.subjectPrefix;
        subjectSuffix = passiveOverrides.subjectSuffix;
        objectPrefix = passiveOverrides.objectPrefix;
        morphologyObjectPrefix = passiveOverrides.morphologyObjectPrefix;
    }

    const allowReflexiveAutoSwitch =
        (!indirectObjectMarker && !thirdObjectMarker) || resolvedDerivationType === DERIVATION_TYPE.applicative;
    const reflexiveUpdate = allowReflexiveAutoSwitch
        ? applyReflexiveAutoSwitch({
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            isPassiveImpersonal,
            clearError,
        })
        : { objectPrefix, isReflexive: objectPrefix === "mu" };
    objectPrefix = reflexiveUpdate.objectPrefix;
    isReflexive = reflexiveUpdate.isReflexive;

    const isCalificativoInstrumentivo = tense === "calificativo-instrumentivo";
    const isNounTense = isNonanimateNounTense(tense)
        || isPotencialProfileTense(tense)
        || isPatientivoAdjectiveProfile
        || tense === "agentivo"
        || tense === "patientivo"
        || tense === "instrumentivo"
        || tense === "calificativo-instrumentivo"
        || tense === "locativo-temporal";
    const invalidComboObjectPrefix = resolveComboValidationObjectPrefix({
        objectPrefix,
        indirectObjectMarker,
        derivationType: resolvedDerivationType,
    });
    if (!skipValidation && !isNounTense && INVALID_COMBINATION_KEYS.has(
        getComboKey(subjectPrefix, invalidComboObjectPrefix, subjectSuffix)
    )) {
        const message = "Combinacion inválida";
        const error = returnIfError(message, [
            "subject-prefix",
            "object-prefix",
            "subject-suffix",
        ]);
        if (error) return error;
    }
    clearError("object-prefix");

    if (isNounTense) {
        if (isNonanimateNounTense(tense) && !isNonanimateSubject(subjectPrefix, subjectSuffix)) {
            const message = tense === "sustantivo-verbal"
                ? "Sustantivo verbal solo con 3a persona no animada común."
                : "Solo 3a persona no animada (singular o plural).";
            const error = returnIfError(message, ["subject-prefix", "subject-suffix"]);
            if (error) return error;
        }
        const isTransitiveVerb = getBaseObjectSlots(parsedVerb) > 0;
        if (
            (
                (tense === "patientivo" && patientivoSource === "tronco-verbal")
                || (isPatientivoAdjectiveProfile && getPatientivoAdjectiveSourceForTense(tense) === "tronco-verbal")
            )
            && isTransitiveVerb
            && !objectPrefix
        ) {
            objectPrefix = "ta";
            morphologyObjectPrefix = "ta";
        }
        if (
            resolvedTenseMode === TENSE_MODE.adjetivo
            && isIntransitiveOnlyActiveAdjectiveTense(tense)
            && isTransitiveVerb
        ) {
            if (skipValidation) {
                return {
                    result: "—",
                    error: true,
                    isReflexive,
                };
            }
            const error = returnIfError(
                "Adjetivo activo solo para verbos intransitivos.",
                ["verb"]
            );
            if (error) return error;
        }
        const nounCombinedMode = resolvedDerivationMode === DERIVATION_MODE.nonactive
            ? COMBINED_MODE.nonactive
            : COMBINED_MODE.active;
        const slotPlanBundle = getNounObjectSlotPlansFromMeta(parsedVerb, tense, {
            combinedMode: nounCombinedMode,
        });
        const slotPlans = slotPlanBundle.slotPlans;
        const selectedBySlot = {
            object: objectPrefix || "",
            object2: indirectObjectMarker || "",
            object3: thirdObjectMarker || "",
        };
        const hasDerivedValencyIncrease = getDerivationValencyDelta(resolvedDerivationType) > 0;
        const derivationLabel = getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
        const derivedSlots = slotPlans.filter((slotPlan) => slotPlan.isAddedSlot);
        const allowCollapsedDerivedSlot = allowsCollapsedDerivedNounSlot({
            tenseValue: tense,
            combinedMode: nounCombinedMode,
            slotPlanBundle,
            derivationType: resolvedDerivationType,
        });
        if (hasDerivedValencyIncrease && !derivedSlots.length && !allowCollapsedDerivedSlot) {
            const error = returnIfError(
                `La derivación ${derivationLabel} no tiene espacio para prefijo no específico (ta/te/mu).`,
                ["object-prefix"]
            );
            if (error) return error;
        }
        const overflowedSlot = NOUN_OBJECT_SLOT_SCHEMA
            .slice(slotPlans.length)
            .find((slotMeta) => Boolean(selectedBySlot[slotMeta.id]));
        if (overflowedSlot) {
            const derivationLabel = getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
            const error = returnIfError(
                `La derivación ${derivationLabel} no tiene espacio para marcadores de valencia adicionales.`,
                ["object-prefix"]
            );
            if (error) return error;
        }
        const invalidSlotPlan = slotPlans.find((slotPlan) => (
            !slotPlan.toggleValues.includes(selectedBySlot[slotPlan.id] || "")
        ));
        if (invalidSlotPlan) {
            if (invalidSlotPlan.id !== "object") {
                const slotNumber = Number.isFinite(invalidSlotPlan.index) ? invalidSlotPlan.index + 1 : 2;
                const error = returnIfError(
                    `Derivación ${derivationLabel} nominal requiere ta/te/mu en objeto ${slotNumber}.`,
                    ["object-prefix"]
                );
                if (error) return error;
            }
            if (isCalificativoInstrumentivo) {
                if (isTransitiveVerb && slotPlans.length > 0) {
                    const error = returnIfError("Calificativo transitivo solo con ta/te/mu.", ["object-prefix"]);
                    if (error) return error;
                } else {
                    const error = returnIfError("Calificativo intransitivo va sin prefijo.", ["object-prefix"]);
                    if (error) return error;
                }
            }
            const primaryUsesDerivedSlot = slotPlans[0]?.isAddedSlot === true;
            const transitiveMessage = (() => {
                if (hasDerivedValencyIncrease && primaryUsesDerivedSlot) {
                    return `Derivación ${derivationLabel} nominal transitiva solo con ta/te/mu.`;
                }
                switch (tense) {
                    case "agentivo":
                        return "Agentivo transitivo solo con ta/te/mu.";
                    case "patientivo":
                        return "Patientivo transitivo solo con ta/te/mu o Ø.";
                    case "instrumentivo":
                        return "Instrumentivo transitivo solo con ta/te/mu o Ø.";
                    case "potencial":
                        return "Potencial transitivo solo con Ø.";
                    case "adjetivo-preterito":
                    case "adjetivo-perfecto":
                    case "adjetivo-preterito-tik":
                    case "adjetivo-perfecto-tik":
                    case "adjetivo-preterito-naj":
                    case "adjetivo-perfecto-naj":
                        return "Adjetivo activo solo para verbos intransitivos.";
                    case "adjetivo-patientivo-no-activo":
                    case "adjetivo-patientivo-perfectivo":
                        return "Adjetivo patientivo transitivo solo con ta/te/mu o Ø.";
                    case "potencial-habitual":
                        return "Adjetivo no activo transitivo solo con ta/te/mu.";
                    case "pasado-remoto-adverbio-activo":
                        return "Adverbio activo transitivo solo con ta/te/mu.";
                    case "sustantivo-verbal":
                        return "Sustantivo verbal transitivo solo con ta/te/mu.";
                    default:
                        return "Sustantivo verbal transitivo solo con ta/te/mu.";
                }
            })();
            const intransitiveMessage = (() => {
                switch (tense) {
                    case "agentivo":
                        return "Agentivo intransitivo va sin prefijo.";
                    case "patientivo":
                        return "Patientivo intransitivo va sin prefijo.";
                    case "instrumentivo":
                        return "Instrumentivo intransitivo va sin prefijo.";
                    case "potencial":
                        return "Potencial intransitivo va sin prefijo.";
                    case "adjetivo-preterito":
                    case "adjetivo-perfecto":
                    case "adjetivo-preterito-tik":
                    case "adjetivo-perfecto-tik":
                    case "adjetivo-preterito-naj":
                    case "adjetivo-perfecto-naj":
                        return "Adjetivo activo solo para verbos intransitivos.";
                    case "adjetivo-patientivo-no-activo":
                    case "adjetivo-patientivo-perfectivo":
                        return "Adjetivo patientivo intransitivo va sin prefijo.";
                    case "potencial-habitual":
                        return "Adjetivo no activo intransitivo va sin prefijo.";
                    case "pasado-remoto-adverbio-activo":
                        return "Adverbio activo intransitivo va sin prefijo.";
                    default:
                        return "Sustantivo verbal intransitivo va sin prefijo.";
                }
            })();
            if (isTransitiveVerb && slotPlans.length > 0) {
                const error = returnIfError(transitiveMessage, ["object-prefix"]);
                if (error) return error;
            }
            const error = returnIfError(intransitiveMessage, ["object-prefix"]);
            if (error) return error;
        }
        if (slotPlans.length >= 3 && !isValidValence4Combo({
            objectPrefix,
            indirectObjectMarker,
            thirdObjectMarker,
        })) {
            const error = returnIfError(
                "Combinación de objetos no permitida para valencia nominal 4.",
                ["object-prefix"]
            );
            if (error) return error;
        }
        if (!slotPlans.length) {
            const hasUnexpectedObjectMarker = Boolean(
                selectedBySlot.object
                || selectedBySlot.object2
                || selectedBySlot.object3
            );
            if (hasUnexpectedObjectMarker) {
                const intransitiveMessage = (() => {
                    switch (tense) {
                        case "agentivo":
                            return "Agentivo intransitivo va sin prefijo.";
                        case "patientivo":
                            return "Patientivo intransitivo va sin prefijo.";
                        case "instrumentivo":
                            return "Instrumentivo intransitivo va sin prefijo.";
                        case "potencial":
                            return "Potencial intransitivo va sin prefijo.";
                        case "adjetivo-preterito":
                        case "adjetivo-perfecto":
                        case "adjetivo-preterito-tik":
                        case "adjetivo-perfecto-tik":
                        case "adjetivo-preterito-naj":
                        case "adjetivo-perfecto-naj":
                            return "Adjetivo activo solo para verbos intransitivos.";
                        case "adjetivo-patientivo-no-activo":
                        case "adjetivo-patientivo-perfectivo":
                            return "Adjetivo patientivo intransitivo va sin prefijo.";
                        case "potencial-habitual":
                            return "Adjetivo no activo intransitivo va sin prefijo.";
                        case "pasado-remoto-adverbio-activo":
                            return "Adverbio activo intransitivo va sin prefijo.";
                        default:
                            return "Sustantivo verbal intransitivo va sin prefijo.";
                    }
                })();
                const error = returnIfError(intransitiveMessage, ["object-prefix"]);
                if (error) return error;
            }
        }
    }

    if (isWitziNonactive && tense === "preterito" && subjectSuffix === "t") {
        subjectSuffix = "et";
    }
    if (
        isPotencialHabitualNominalProfile
        && sourceSelectedProjectiveObjectPrefix === "mu"
    ) {
        morphologyObjectPrefix = "ne";
    }
    const skipPretClass = isWitziNonactive && SUPPLETIVE_WITZI_NONACTIVE_TENSES.has(tense);
    const isUnderlyingTransitive = !isNonactive
        ? (resolvedDerivationType === DERIVATION_TYPE.causative || parsedVerb.isMarkedTransitive || parsedVerb.isTaFusion)
        : Boolean(morphologyObjectPrefix || indirectObjectMarker || thirdObjectMarker || parsedVerb.isTaFusion);
    const forceTransitiveBase = parsedVerb.isTaFusion || isUnderlyingTransitive;

    if (!silent) {
        onVerbAnalysisResolved({
            verb,
            analysisVerb,
            analysisExactVerb,
            morphologyObjectPrefix,
            forceTransitiveBase,
            isYawi,
            isWeya,
            resolvedDerivationType,
            parsedVerb,
            renderVerb,
        });
    }

    const baseMorphologyInput = {
        subjectPrefix,
        objectPrefix: morphologyObjectPrefix,
        subjectSuffix,
        verb,
        tense,
        analysisVerb,
        rawAnalysisVerb: parsedVerb.rawAnalysisVerb,
        rawVerb,
        sourceRawVerb: parsedVerb.sourceRawVerb,
        analysisExactVerb,
        verbMeta: parsedVerb,
        isYawi,
        isWeya,
        directionalPrefix,
        directionalRuleMode: resolvedDirectionalRuleMode,
        suppletiveStemSet,
        suppletiveTenseSuffixes,
        ...buildMorphologyMetaOptions(parsedVerb, {
            hasDoubleDash: parsedVerb.hasDoubleDash,
            indirectObjectMarker,
            isUnderlyingTransitive,
        }),
        thirdObjectMarker,
        skipPretClass,
        hasSubjectValent,
        boundPrefix: parsedVerb.hasBoundMarker
            ? (
                parsedVerb.sourcePrefix
                || parsedVerb.canonical?.sourcePrefix
                || (parsedVerb.boundPrefixes || []).join("")
            )
            : "",
        embeddedPrefix: getEmbeddedVerbPrefix(parsedVerb),
        boundPrefixes: Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes.slice() : [],
        boundExplicitFlags: Array.isArray(parsedVerb.boundExplicitFlags) ? parsedVerb.boundExplicitFlags.slice() : [],
        directionalPrefixFromSlash: parsedVerb.directionalPrefixFromSlash
            || parsedVerb.canonical?.directionalPrefixFromSlash
            || "",
        sourceSplitPrefix: parsedVerb.hasBoundMarker
            ? (parsedVerb.sourcePrefix || parsedVerb.canonical?.sourcePrefix || "")
            : "",
        sourceCompositeBase: parsedVerb.canonical?.slashCompositeRuleBase || "",
        verbSegment: parsedVerb.verbSegment || "",
        patientivoOwnership: override?.patientivoOwnership ?? DEFAULT_PATIENTIVO_OWNERSHIP,
        patientivoSource,
        patientivoNominalSuffix,
        passivePatientivoSelectedProjectiveObjectPrefix,
        possessivePrefix,
        actionNounStemUse,
        combinedMode: isNonactive ? COMBINED_MODE.nonactive : COMBINED_MODE.active,
        customaryPresentPatientiveNnc: isPotencialHabitualNominalProfile,
        customaryPresentPatientivePlural: isPotencialHabitualNominalProfile && inputSubjectSuffix === "t",
        instrumentivoMode: possessivePrefix === ""
            ? INSTRUMENTIVO_MODE.absolutivo
            : INSTRUMENTIVO_MODE.posesivo,
        derivationType: resolvedDerivationType,
        isNonactiveMode: isNonactive,
        stemProvenanceSeed: forwardStemProvenance,
    };
    appliedMorphology = applyMorphologyRules(baseMorphologyInput);
    if (appliedMorphology?.error) {
        return { error: true };
    }
    if (isPotencialHabitualNominalProfile) {
        const customaryPresentSubjectSuffix = String(appliedMorphology.subjectSuffix || "");
        const customaryPresentPluralSuffix = inputSubjectSuffix === "t" ? "met" : "";
        const shouldMoveCustomaryPresentNi = customaryPresentSubjectSuffix === "ni"
            || customaryPresentSubjectSuffix === "nit";
        const customaryPresentVerb = shouldMoveCustomaryPresentNi
            ? `${appliedMorphology.verb || ""}ni`
            : appliedMorphology.verb;
        const customaryPresentConnector = shouldMoveCustomaryPresentNi
            ? customaryPresentPluralSuffix
            : customaryPresentSubjectSuffix;
        appliedMorphology = {
            ...appliedMorphology,
            verb: customaryPresentVerb,
            subjectSuffix: customaryPresentConnector,
            formSpec: isNominalOutputProfile
                ? buildLiteralNominalFormSpec(customaryPresentVerb, customaryPresentConnector)
                : appliedMorphology.formSpec,
            alternateForms: (appliedMorphology.alternateForms || []).map((form) => {
                const formSubjectSuffix = String(form.subjectSuffix || "");
                const moveFormNi = formSubjectSuffix === "ni" || formSubjectSuffix === "nit";
                const formVerb = moveFormNi ? `${form.verb || ""}ni` : form.verb;
                const formConnector = moveFormNi ? customaryPresentPluralSuffix : formSubjectSuffix;
                return {
                    ...form,
                    verb: formVerb,
                    subjectSuffix: formConnector,
                    formSpec: isNominalOutputProfile
                        ? buildLiteralNominalFormSpec(formVerb, formConnector)
                        : form.formSpec,
                };
            }),
        };
    }
    ({ subjectPrefix, objectPrefix, subjectSuffix, verb } = appliedMorphology);
    const isPatientivoPossessed = tense === "patientivo" && Boolean(possessivePrefix);
    if (isPatientivoPossessed) {
        subjectSuffix = adjustPatientivoPossessiveSuffix(
            subjectSuffix,
            true,
            patientivoOwnership,
            {
                stem: verb,
            }
        );
        if (subjectSuffix === null) {
            return { error: true };
        }
    }
    primaryFormSpec = appliedMorphology.formSpec
        || (isNominalOutputProfile ? buildLiteralNominalFormSpec(verb, subjectSuffix) : null);
    if (isNominalOutputProfile && isPatientivoPossessed) {
        primaryFormSpec = withNominalFormSpecSuffix(primaryFormSpec, subjectSuffix, {
            verb,
            subjectSuffix,
        });
    }
    const alternateForms = (appliedMorphology.alternateForms || []).map((form) => {
        if (!form) {
            return form;
        }
        if (!isPatientivoPossessed) {
            return isNominalOutputProfile
                ? normalizeNominalFormEntry(form, {
                    subjectSuffix,
                })
                : form;
        }
        const adjustedSubjectSuffix = adjustPatientivoPossessiveSuffix(
            form.subjectSuffix ?? subjectSuffix,
            true,
            patientivoOwnership,
            {
                stem: form.verb,
            }
        );
        return {
            ...form,
            subjectSuffix: adjustedSubjectSuffix,
            formSpec: isNominalOutputProfile
                ? withNominalFormSpecSuffix(form.formSpec || null, adjustedSubjectSuffix, {
                    verb: form.verb,
                    subjectSuffix: adjustedSubjectSuffix,
                })
                : form.formSpec,
        };
    }).filter((form) => form && form.subjectSuffix !== null);
    let stemProvenance = appliedMorphology.stemProvenance || null;
    const verbstemClassProfile = stemProvenance?.verbstemClassProfile
        || (typeof buildVncVerbstemClassProfileFromProvenance === "function"
            ? buildVncVerbstemClassProfileFromProvenance(stemProvenance)
            : null);
    if (stemProvenance && verbstemClassProfile && !stemProvenance.verbstemClassProfile) {
        stemProvenance = {
            ...stemProvenance,
            verbstemClassProfile,
        };
    }
    let forms = [];
    const embeddedPrefix = getEmbeddedVerbPrefix(parsedVerb);
    const stemMorphologyArgs = {
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
    };
    const stemCollectionPool = resolveStemCollectionPool({
        isNonactive,
        nonactiveAllStems,
        nonactiveAllStemSpecs,
        resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        causativeAllStemSpecs,
        applicativeAllStemSpecs,
    });
    if (Array.isArray(stemCollectionPool) && stemCollectionPool.length > 1) {
        stemCollectionPool.forEach((stemCandidate) => {
            const morphResult = resolveStemCandidateMorphologyResult({
                stemCandidate,
                ...stemMorphologyArgs,
            });
            if (!morphResult) {
                return;
            }
            const baseText = buildWordFromParts({
                subjectPrefix: morphResult.subjectPrefix,
                objectPrefix: morphResult.objectPrefix,
                subjectSuffix: morphResult.subjectSuffix,
                verb: morphResult.verb,
                formSpec: morphResult.formSpec,
                trailingSuffix: morphResult.trailingSuffix || "",
                isYawiImperative: morphResult.isYawiImperative,
                directionalChainMeta: morphResult.directionalChainMeta,
                surfaceRuleMeta: mergeSurfaceRuleMeta(morphResult.surfaceRuleMeta, suppletiveStemSet?.surfaceRuleMeta),
            });
            if (baseText && !forms.includes(baseText)) {
                forms.push(baseText);
            }
            morphResult.alternateForms.forEach((form) => {
                if (!form || !form.verb) {
                    return;
                }
                const altText = buildWordFromParts({
                    subjectPrefix: morphResult.subjectPrefix,
                    objectPrefix: form.surfaceObjectPrefix ?? morphResult.objectPrefix,
                    subjectSuffix: form.subjectSuffix,
                    verb: form.verb,
                    formSpec: form.formSpec,
                    trailingSuffix: form.trailingSuffix || "",
                    isYawiImperative: morphResult.isYawiImperative,
                    directionalChainMeta: morphResult.directionalChainMeta,
                    surfaceRuleMeta: mergeSurfaceRuleMeta(
                        morphResult.surfaceRuleMeta,
                        suppletiveStemSet?.surfaceRuleMeta,
                        form.surfaceRuleMeta
                    ),
                });
                if (altText && !forms.includes(altText)) {
                    forms.push(altText);
                }
            });
        });
    } else {
        const baseText = buildWord();
        forms.push(baseText);
        alternateForms.forEach((form) => {
            if (!form || !form.verb) {
                return;
            }
            const altText = buildWordFromParts({
                subjectPrefix,
                objectPrefix: form.surfaceObjectPrefix ?? objectPrefix,
                subjectSuffix: form.subjectSuffix ?? subjectSuffix,
                verb: form.verb,
                formSpec: form.formSpec || null,
                trailingSuffix: form.trailingSuffix || "",
                directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
                surfaceRuleMeta: mergeSurfaceRuleMeta(
                    appliedMorphology?.surfaceRuleMeta,
                    suppletiveStemSet?.surfaceRuleMeta,
                    form.surfaceRuleMeta
                ),
                isYawiImperative: isYawiImperativeSingular,
            });
            if (!forms.includes(altText)) {
                forms.push(altText);
            }
        });
    }
    if (isYawi && tense === "presente" && directionalPrefix !== "wal") {
        const useLongYawiSlot = subjectSuffix === "t" || subjectPrefix === "";
        const legacyYawiForm = useLongYawiSlot
            ? yawiLegacyLongPrefixed
            : yawiLegacyShortPrefixed;
        const legacyText = buildWord(legacyYawiForm, subjectSuffix);
        if (legacyText && !forms.includes(legacyText)) {
            forms.push(legacyText);
        }
    }
    if (shouldAddYuVariant && (verb === yawiPresentShortPrefixed || verb === yawiPresentLongPrefixed)) {
        const yuText = buildWord(yawiYuVariantPrefixed);
        if (!forms.includes(yuText)) {
            forms.push(yuText);
        }
    }
    const generatedText = forms.join(" / ");

    if (!silent) {
        onComplete({
            generatedText,
            parsedVerb,
            stemProvenance,
            tense,
            renderVerb,
            baseObjectPrefix,
        });
    }

    const nominalClauseMetadata = isNominalOutputProfile
        ? buildGeneratedNominalSubjectNumberConnectorMetadata({
            subjectSuffix,
            nominalKind: tense,
            possessivePrefix,
            patientivoSource,
            sourceCombinedMode: isNonactive ? COMBINED_MODE.nonactive : "",
            actionNounStemUse,
            renderVerb,
            verb,
            analysisVerb,
        })
        : {};
    const nuclearClauseShell = buildGeneratedNuclearClauseShellMetadata({
        resolvedTenseMode,
        tense,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        verb,
        renderVerb,
        nominalClauseMetadata,
    });
    const vncValencyFrame = buildGeneratedVncValencyFrameMetadata({
        resolvedTenseMode,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        baseObjectPrefix,
        indirectObjectMarker,
        thirdObjectMarker,
        parsedVerb,
        valencySummary,
        targetValency,
        isPassiveImpersonalMode,
        nuclearClauseShell,
    });
    const derivedVoiceFrame = buildGeneratedDerivedVoiceFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationMode,
        resolvedVoiceMode,
        isNonactive,
        isPassiveImpersonalMode,
        sourceValency,
        targetValency,
        valencySummary,
        parsedVerb,
        verb,
        analysisVerb,
        subjectPrefix,
        subjectSuffix,
        objectPrefix,
        baseObjectPrefix,
        hasPromotableObject,
        preserveSubjectForPassive,
        allowPassiveObject,
    });
    const forwardDerivationFrame = buildGeneratedForwardDerivationFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationType,
        derivationValencyDelta,
        sourceValency,
        forwardDerivations,
        forwardStemProvenance,
        causativeAllStems,
        applicativeAllStems,
        renderVerb,
        verb,
        analysisVerb,
    });
    const compoundFrame = buildGeneratedCompoundFrameMetadata({
        resolvedTenseMode,
        parsedVerb,
    });
    const adverbialNuclearFrame = buildGeneratedAdverbialNuclearFrameMetadata({
        resolvedTenseMode,
        tense,
        renderVerb,
        verb,
        analysisVerb,
        objectPrefix,
        baseObjectPrefix,
    });
    const generatedAdverbialAdjunctionBoundaryFrame = buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
        resolvedTenseMode,
        tense,
        renderVerb,
        verb,
        analysisVerb,
    });
    const sentenceLayer = typeof buildGeneratedSentenceLayerMetadata === "function"
        ? buildGeneratedSentenceLayerMetadata({
            override,
            tense,
            nuclearClauseShell,
            clauseKind: nuclearClauseShell?.clauseKind || "",
        })
        : null;
    return {
        result: generatedText,
        surfaceForms: forms,
        isReflexive,
        stemProvenance,
        verbstemClassProfile,
        ...nominalClauseMetadata,
        nuclearClauseShell,
        vncValencyFrame,
        derivedVoiceFrame,
        forwardDerivationFrame,
        compoundFrame,
        adverbialNuclearFrame,
        adverbialAdjunctionBoundaryFrame: generatedAdverbialAdjunctionBoundaryFrame
            || nominalClauseMetadata?.adverbialAdjunctionBoundaryFrame
            || null,
        sentenceLayer,
    };
}
