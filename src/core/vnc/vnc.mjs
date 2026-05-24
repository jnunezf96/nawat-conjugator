export function createVncFacadeApi(targetObject = globalThis) {
    function generateWord(options = {}) {
        if (typeof Event !== "undefined" && options instanceof Event) {
            options = {};
        }
        options = targetObject.sanitizeGenerateWordOptions(options);
        const silent = options.silent === true;
        const override = options.override || null;
        const documentObject = targetObject.document;
        const subjectPrefixInput = documentObject.getElementById("subject-prefix");
        const subjectSuffixInput = documentObject.getElementById("subject-suffix");
        const verbInput = documentObject.getElementById("verb");
        const verbInputSource = targetObject.resolveVerbInputSource(verbInput?.value || "");
        const prefixInputs = targetObject.getPrefixInputs({
            override,
            subjectPrefixInput,
            subjectSuffixInput,
            verbInput,
            verbInputSource,
        });
        return targetObject.executeGenerateWordRequest({
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
                    const el = documentObject.getElementById(id);
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
                    const el = documentObject.getElementById(id);
                    if (el) {
                        el.classList.add("error");
                    }
                    if (id === "verb" && verbInput) {
                        verbInput.classList.add("error");
                    }
                },
                onSearchQueryOnly: ({ verbInputValue: currentValue }) => {
                    targetObject.updateVerbRuleHint({ verb: "" });
                    targetObject.updateVerbDisambiguation("");
                    targetObject.maybeAutoScrollToConjugationRow(currentValue, { allowSwitch: false });
                },
                onValidationError: ({ tense, baseObjectPrefix }) => {
                    targetObject.updateVerbRuleHint({ verb: "" });
                    targetObject.updateVerbDisambiguation("");
                    targetObject.renderAllOutputs({
                        verb: targetObject.getVerbInputMeta().displayVerb,
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
                    targetObject.renderVerbMirror();
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
                    targetObject.updateVerbRuleHint({
                        verb,
                        analysisVerb,
                        exactBaseVerb: analysisExactVerb,
                        objectPrefix: morphologyObjectPrefix,
                        forceTransitive: forceTransitiveBase,
                        isYawi,
                        isWeya,
                        ...targetObject.buildMorphologyMetaOptions(parsedVerb),
                        derivationType: resolvedDerivationType,
                    });
                    targetObject.updateVerbDisambiguation(verbInput ? verbInput.value : renderVerb);
                },
                onComplete: ({
                    generatedText,
                    parsedVerb,
                    stemProvenance,
                    tense,
                    renderVerb,
                    baseObjectPrefix,
                }) => {
                    targetObject.rememberScreenCalculatorAnsState({
                        generatedText,
                        parsedVerb,
                        stemProvenance,
                        tense,
                    });
                    targetObject.renderAllOutputs({
                        verb: renderVerb,
                        objectPrefix: baseObjectPrefix,
                        tense,
                    });
                },
            },
        });
    }

    return { generateWord };
}

export function installVncFacadeGlobals(targetObject = globalThis) {
    const api = createVncFacadeApi(targetObject);
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
