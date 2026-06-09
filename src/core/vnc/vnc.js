// core/vnc/vnc.js
// Browser-facing generation facade.
// Global-scope module: generateWord remains available as a compatibility wrapper
// over the extracted request + engine modules.

"use strict";

// Shared agreement combo validation extracted to src/core/agreement/combo_validation.js
// Shared morphology support extracted to src/core/generation/morphology_support.js
// Shared morphology engine extracted to src/core/generation/morphology_engine.js

function parseAdjectivalNncFunctionEntryContract(dataset = {}) {
    const rawContract = String(dataset.adjectivalNncFunctionContract || "").trim();
    if (!rawContract) {
        return null;
    }
    try {
        const parsed = JSON.parse(rawContract);
        return parsed && typeof parsed === "object" ? parsed : null;
    } catch (_error) {
        return null;
    }
}

function normalizeAdjectivalNncFunctionSurfaceValue(value = "") {
    const surface = String(value || "").trim();
    return surface === "—" ? "" : surface;
}

function splitAdjectivalNncFunctionSurfaceText(value = "") {
    return String(value || "")
        .split(/\s*\/\s*/g)
        .map((entry) => normalizeAdjectivalNncFunctionSurfaceValue(entry))
        .filter(Boolean);
}

function getAdjectivalNncFunctionEntryContractFrame(contract = null) {
    const source = contract && typeof contract === "object" ? contract : {};
    return (
        (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null)
        || (source.frames && typeof source.frames === "object" ? source.frames : null)
    );
}

function hasAdjectivalNncFunctionEntryContractResultFrame(contract = null) {
    const frame = getAdjectivalNncFunctionEntryContractFrame(contract);
    return Boolean(frame?.resultFrame && typeof frame.resultFrame === "object");
}

function getAdjectivalNncFunctionEntryContractSurface(contract = null) {
    const source = contract && typeof contract === "object" ? contract : {};
    const frame = getAdjectivalNncFunctionEntryContractFrame(source);
    const resultFrame = frame?.resultFrame && typeof frame.resultFrame === "object"
        ? frame.resultFrame
        : null;
    const forms = [];
    if (Array.isArray(resultFrame?.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
    }
    if (resultFrame?.surface) {
        forms.push(resultFrame.surface);
    }
    if (resultFrame) {
        return forms
            .flatMap((entry) => splitAdjectivalNncFunctionSurfaceText(entry))
            .find(Boolean)
            || "";
    }
    if (source.surface) {
        forms.push(source.surface);
    }
    return forms
        .flatMap((entry) => splitAdjectivalNncFunctionSurfaceText(entry))
        .find(Boolean)
        || "";
}

function getAdjectivalNncFunctionEntrySourceFormulaSlots(frame = null) {
    const source = frame && typeof frame === "object" ? frame : {};
    const formulaSlots = source.morphBoundaryFrame?.formulaSlots;
    return formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
}

function getAdjectivalNncFunctionEntryFormulaSlotSurface(slot = null, fields = []) {
    const source = slot && typeof slot === "object" ? slot : {};
    const fieldNames = Array.isArray(fields) ? fields : [fields];
    for (const field of fieldNames) {
        const value = normalizeAdjectivalNncFunctionSurfaceValue(source[field]);
        if (value) {
            return value === "Ø" ? "" : value;
        }
    }
    return "";
}

function getAdjectivalNncFunctionEntryNounClass(connectorSlot = null) {
    const slot = connectorSlot && typeof connectorSlot === "object" ? connectorSlot : {};
    const nounClass = String(slot.nounClass || "").trim().toLowerCase();
    if (nounClass === "0" || nounClass === "ø" || nounClass === "zero") {
        return "zero";
    }
    if (["t", "ti", "in"].includes(nounClass)) {
        return nounClass;
    }
    const connector = String(slot.connector || slot.surface || "").trim().toLowerCase();
    if (!connector || connector === "ø") {
        return "zero";
    }
    return ["t", "ti", "in"].includes(connector) ? connector : "";
}

function resolveAdjectivalNncFunctionOverrideFromInput(verbInput = null) {
    const dataset = verbInput?.dataset || {};
    const currentSurface = String(verbInput?.value || "").trim();
    const entryRouteContract = parseAdjectivalNncFunctionEntryContract(dataset);
    const entryGrammarFrame = getAdjectivalNncFunctionEntryContractFrame(entryRouteContract);
    const hasEntryResultFrame = hasAdjectivalNncFunctionEntryContractResultFrame(entryRouteContract);
    const targetSurface = getAdjectivalNncFunctionEntryContractSurface(entryRouteContract)
        || (!hasEntryResultFrame
            ? normalizeAdjectivalNncFunctionSurfaceValue(dataset.adjectivalNncFunctionSurface)
            : "");
    if (!currentSurface || !targetSurface || currentSurface !== targetSurface) {
        return null;
    }
    const formation = String(dataset.adjectivalNncFormation || "").trim();
    const nominalizedVncKind = String(dataset.nominalizedVncKind || "").trim();
    const patientivoSource = String(dataset.patientivoSource || "").trim();
    const formulaEcho = String(dataset.adjectivalNncFormulaEcho || "").trim();
    const sourceContract = entryGrammarFrame?.routeContract?.sourceContract || {};
    const stemFrame = entryGrammarFrame?.stemFrame || {};
    const inflectionFrame = entryGrammarFrame?.inflectionFrame || {};
    const formulaSlots = getAdjectivalNncFunctionEntrySourceFormulaSlots(entryGrammarFrame);
    const entrySourceFormulaSlots = entryRouteContract?.sourceFormulaSlots
        && typeof entryRouteContract.sourceFormulaSlots === "object"
        ? entryRouteContract.sourceFormulaSlots
        : null;
    const entrySourceFormulaEcho = String(entryRouteContract?.sourceFormulaEcho || "").trim();
    const entrySourceCompoundFrame = entryRouteContract?.sourceCompoundFrame
        && typeof entryRouteContract.sourceCompoundFrame === "object"
        ? entryRouteContract.sourceCompoundFrame
        : null;
    const entrySourceDenominalCompoundFrame = entryRouteContract?.sourceDenominalCompoundFrame
        && typeof entryRouteContract.sourceDenominalCompoundFrame === "object"
        ? entryRouteContract.sourceDenominalCompoundFrame
        : null;
    const predicateSlot = formulaSlots?.predicate || null;
    const subjectSlot = formulaSlots?.subjectPerson || null;
    const connectorSlot = formulaSlots?.subjectNumberConnector || null;
    const adjectivalNnc = {
        enabled: true,
        stem: targetSurface,
        surface: targetSurface,
        surfaceForms: targetSurface ? [targetSurface] : [],
        state: "absolutive",
        role: "predicate-surface",
    };
    if (entryGrammarFrame) {
        adjectivalNnc.grammarFrame = entryGrammarFrame;
        adjectivalNnc.frames = entryGrammarFrame;
    }
    if (formation) {
        adjectivalNnc.formation = formation;
    }
    if (formation === "patientive-adjectival") {
        adjectivalNnc.patientivoSurface = targetSurface;
        adjectivalNnc.patientivoSource = patientivoSource;
    }
    if (formation === "ordinary-absolutive") {
        const sourceStem = getAdjectivalNncFunctionEntryFormulaSlotSurface(predicateSlot, ["stem", "surface"])
            || String(stemFrame.sourceStem || stemFrame.stem || "").trim();
        if (sourceStem) {
            adjectivalNnc.stem = sourceStem;
            adjectivalNnc.sourceStem = sourceStem;
            adjectivalNnc.predicateStem = sourceStem;
        }
        adjectivalNnc.subjectPrefix = String(subjectSlot?.prefix || "").trim();
        adjectivalNnc.subjectSuffix = String(subjectSlot?.suffix || "").trim();
        adjectivalNnc.subjectKey = String(subjectSlot?.personSubKey || subjectSlot?.label || "").trim();
        adjectivalNnc.nounClass = getAdjectivalNncFunctionEntryNounClass(connectorSlot);
        adjectivalNnc.number = String(connectorSlot?.referenceNumber || "").trim() || "singular";
        adjectivalNnc.pluralType = String(connectorSlot?.pluralType || "").trim() || "auto";
    }
    if (formation === "intensified-adjectival") {
        const sourceFormulaSlots = entrySourceFormulaSlots || formulaSlots;
        if (sourceFormulaSlots) {
            adjectivalNnc.sourceFormulaSlots = sourceFormulaSlots;
            adjectivalNnc.formulaSlots = sourceFormulaSlots;
        }
        const sourceFormulaEcho = entrySourceFormulaEcho
            || formulaEcho
            || String(entryGrammarFrame?.morphBoundaryFrame?.formulaEcho || "").trim();
        if (sourceFormulaEcho) {
            adjectivalNnc.sourceFormulaEcho = sourceFormulaEcho;
            adjectivalNnc.formulaEcho = sourceFormulaEcho;
        }
    }
    if (formation === "compound-source-adjectival") {
        const sourceFormulaSlots = entrySourceFormulaSlots || formulaSlots;
        const sourceFormulaEcho = entrySourceFormulaEcho
            || formulaEcho
            || String(entryGrammarFrame?.morphBoundaryFrame?.formulaEcho || "").trim();
        adjectivalNnc.compoundSourceSurface = targetSurface;
        adjectivalNnc.nominalizedSurface = targetSurface;
        adjectivalNnc.sourceCompoundFrame = entrySourceCompoundFrame;
        adjectivalNnc.compoundFrame = entrySourceCompoundFrame;
        adjectivalNnc.nominalizedVncKind = nominalizedVncKind || "adjectival-surface";
        adjectivalNnc.nominalizationProfile = {
            role: {
                nominalizationKind: nominalizedVncKind || "adjectival-surface",
                adjectivalFunction: "predicate-surface",
            },
            predicateState: { value: "absolutive" },
        };
        if (sourceFormulaSlots) {
            adjectivalNnc.sourceFormulaSlots = sourceFormulaSlots;
            adjectivalNnc.formulaSlots = sourceFormulaSlots;
        }
        if (sourceFormulaEcho) {
            adjectivalNnc.sourceFormulaEcho = sourceFormulaEcho;
            adjectivalNnc.formulaEcho = sourceFormulaEcho;
        }
    }
    if (formation === "denominal-compound-adjectival") {
        const sourceFormulaSlots = entrySourceFormulaSlots || formulaSlots;
        const sourceFormulaEcho = entrySourceFormulaEcho
            || formulaEcho
            || String(entryGrammarFrame?.morphBoundaryFrame?.formulaEcho || "").trim();
        adjectivalNnc.denominalCompoundSurface = targetSurface;
        adjectivalNnc.nominalizedSurface = targetSurface;
        adjectivalNnc.sourceDenominalCompoundFrame = entrySourceDenominalCompoundFrame;
        adjectivalNnc.denominalCompoundFrame = entrySourceDenominalCompoundFrame;
        adjectivalNnc.nominalizedVncKind = nominalizedVncKind || "preterit-agentive";
        adjectivalNnc.nominalizationProfile = {
            role: {
                nominalizationKind: nominalizedVncKind || "preterit-agentive",
                adjectivalFunction: "predicate-surface",
            },
            predicateState: { value: "absolutive" },
        };
        if (sourceFormulaSlots) {
            adjectivalNnc.sourceFormulaSlots = sourceFormulaSlots;
            adjectivalNnc.formulaSlots = sourceFormulaSlots;
        }
        if (sourceFormulaEcho) {
            adjectivalNnc.sourceFormulaEcho = sourceFormulaEcho;
            adjectivalNnc.formulaEcho = sourceFormulaEcho;
        }
    }
    if (formation === "vnc-adjectival") {
        adjectivalNnc.vncSurface = targetSurface;
        adjectivalNnc.sourceVerb = String(
            sourceContract.sourceVerb
            || stemFrame.sourceVerb
            || stemFrame.sourceStem
            || ""
        ).trim();
        adjectivalNnc.sourceTenseValue = String(
            sourceContract.sourceTenseValue
            || inflectionFrame.sourceTenseValue
            || ""
        ).trim();
        adjectivalNnc.sourceCombinedMode = String(
            sourceContract.sourceCombinedMode
            || inflectionFrame.sourceCombinedMode
            || ""
        ).trim();
        adjectivalNnc.sourceVoiceMode = String(
            sourceContract.sourceVoiceMode
            || inflectionFrame.sourceVoiceMode
            || ""
        ).trim();
    }
    if (formation === "nominalized-vnc-adjectival") {
        adjectivalNnc.nominalizedSurface = targetSurface;
        adjectivalNnc.nominalizationProfile = {
            role: { nominalizationKind: nominalizedVncKind },
            predicateState: { value: "absolutive" },
        };
    }
    if (formulaEcho) {
        adjectivalNnc.formulaEcho = formulaEcho;
    }
    if (entryRouteContract) {
        adjectivalNnc.entryRouteContract = entryRouteContract;
        adjectivalNnc.sourceAuthorityRefs = Array.isArray(entryRouteContract.authorityRefs)
            ? entryRouteContract.authorityRefs.slice()
            : [];
        adjectivalNnc.sourceEvidenceStatus = entryRouteContract.evidenceStatus || "";
        adjectivalNnc.sourceRouteFamily = entryRouteContract.routeFamily || "";
        adjectivalNnc.sourceRouteStage = entryRouteContract.routeStage || "";
    }
    return {
        verb: targetSurface,
        tense: "adjectival-nnc",
        tenseMode: TENSE_MODE.adjetivo,
        derivationMode: DERIVATION_MODE.active,
        voiceMode: VOICE_MODE.active,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
        adjectivalNnc,
    };
}

function generateWord(options = {}) {
    if (typeof Event !== "undefined" && options instanceof Event) {
        options = {};
    }
    options = sanitizeGenerateWordOptions(options);
    const silent = options.silent === true;
    const subjectPrefixInput = document.getElementById("subject-prefix");
    const subjectSuffixInput = document.getElementById("subject-suffix");
    const verbInput = document.getElementById("verb");
    const inputAdjectivalOverride = options.override
        ? null
        : resolveAdjectivalNncFunctionOverrideFromInput(verbInput);
    const override = options.override || inputAdjectivalOverride;
    if (inputAdjectivalOverride) {
        options = {
            ...options,
            override,
        };
    }
    const verbInputSource = resolveVerbInputSource(verbInput?.value || "");
    const prefixInputs = getPrefixInputs({
        override,
        subjectPrefixInput,
        subjectSuffixInput,
        verbInput,
        verbInputSource,
    });
    return executeGenerateWordRequest({
        options,
        prefixInputs,
        liveInput: {
            hasVerbInput: Boolean(verbInput),
            verbInputValue: verbInput?.value || "",
        },
        uiHooks: {
            clearError: (id) => {
                if (silent) {
                    return;
                }
                const el = document.getElementById(id);
                if (el) {
                    el.classList.remove("error");
                }
                if (id === "verb" && verbInput) {
                    verbInput.classList.remove("error");
                }
            },
            setError: (id) => {
                if (silent) {
                    return;
                }
                const el = document.getElementById(id);
                if (el) {
                    el.classList.add("error");
                }
                if (id === "verb" && verbInput) {
                    verbInput.classList.add("error");
                }
            },
            onSearchQueryOnly: ({ verbInputValue: currentValue }) => {
                updateVerbRuleHint({ verb: "" });
                updateVerbDisambiguation("");
                maybeAutoScrollToConjugationRow(currentValue, { allowSwitch: false });
            },
            onValidationError: ({ tense, baseObjectPrefix }) => {
                updateVerbRuleHint({ verb: "" });
                updateVerbDisambiguation("");
                renderAllOutputs({
                    verb: getVerbInputMeta().displayVerb,
                    objectPrefix: baseObjectPrefix,
                    tense,
                });
            },
            onVerbInputSync: ({ nextVerbInputValue }) => {
                if (!verbInput) {
                    return;
                }
                verbInput.value = nextVerbInputValue;
                verbInput.dataset.prevValue = nextVerbInputValue;
                renderVerbMirror();
            },
            onVerbAnalysisResolved: ({
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
            }) => {
                updateVerbRuleHint({
                    verb,
                    analysisVerb,
                    exactBaseVerb: analysisExactVerb,
                    objectPrefix: morphologyObjectPrefix,
                    forceTransitive: forceTransitiveBase,
                    isYawi,
                    isWeya,
                    ...buildMorphologyMetaOptions(parsedVerb),
                    derivationType: resolvedDerivationType,
                });
                updateVerbDisambiguation(verbInput ? verbInput.value : renderVerb);
            },
            onComplete: ({
                generatedText,
                parsedVerb,
                stemProvenance,
                tense,
                renderVerb,
                baseObjectPrefix,
            }) => {
                rememberScreenCalculatorAnsState({
                    generatedText,
                    parsedVerb,
                    stemProvenance,
                    tense,
                });
                renderAllOutputs({
                    verb: renderVerb,
                    objectPrefix: baseObjectPrefix,
                    tense,
                });
            },
        },
    });
}
