// core/vnc/vnc.js
// Browser-facing generation facade.
// Global-scope module: generateWord remains available as a compatibility wrapper
// over the extracted request + engine modules.

"use strict";

// Shared agreement combo validation extracted to src/core/agreement/combo_validation.js
// Shared morphology support extracted to src/core/generation/morphology_support.js
// Shared morphology engine extracted to src/core/generation/morphology_engine.js

function generateWord(options = {}) {
    if (typeof Event !== "undefined" && options instanceof Event) {
        options = {};
    }
    options = sanitizeGenerateWordOptions(options);
    const silent = options.silent === true;
    const override = options.override || null;
    const subjectPrefixInput = document.getElementById("subject-prefix");
    const subjectSuffixInput = document.getElementById("subject-suffix");
    const verbInput = document.getElementById("verb");
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
