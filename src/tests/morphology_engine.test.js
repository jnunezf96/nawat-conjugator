"use strict";

/**
 * Tests for src/core/generation/morphology_engine.js
 * Covers: direct applyMorphologyRules execution without the browser wrapper.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("morphology_engine");

    const present = ctx.applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix: "",
        subjectSuffix: "",
        verb: "nemi",
        tense: "presente",
        analysisVerb: "nemi",
        rawAnalysisVerb: "nemi",
        analysisExactVerb: "nemi",
        isYawi: false,
        isWeya: false,
        directionalPrefix: "",
    });
    s.eq("applyMorphologyRules present keeps nemi stem", present.verb, "nemi");
    s.eq("applyMorphologyRules present keeps empty subject suffix", present.subjectSuffix, "");
    s.eq("applyMorphologyRules present returns no alternates", present.alternateForms.length, 0);
    s.ok("applyMorphologyRules present returns surfaceRuleMeta", present.surfaceRuleMeta && typeof present.surfaceRuleMeta === "object");

    const imperative = ctx.applyMorphologyRules({
        subjectPrefix: "ti",
        objectPrefix: "",
        subjectSuffix: "",
        verb: "nemi",
        tense: "imperativo",
        analysisVerb: "nemi",
        rawAnalysisVerb: "nemi",
        analysisExactVerb: "nemi",
        isYawi: false,
        isWeya: false,
        directionalPrefix: "",
    });
    s.eq("applyMorphologyRules imperative rewrites second person prefix to shi", imperative.subjectPrefix, "shi");
    s.eq("applyMorphologyRules imperative keeps nemi stem", imperative.verb, "nemi");

    const agentivo = ctx.applyMorphologyRules({
        subjectPrefix: "",
        objectPrefix: "",
        subjectSuffix: "p",
        verb: "nemi",
        tense: "agentivo",
        analysisVerb: "nemi",
        rawAnalysisVerb: "nemi",
        analysisExactVerb: "nemi",
        isYawi: false,
        isWeya: false,
        directionalPrefix: "",
    });
    s.eq("applyMorphologyRules agentivo plural applies niwan suffix", agentivo.subjectSuffix, "niwan");
    s.eq("applyMorphologyRules agentivo keeps nemi stem", agentivo.verb, "nemi");
    s.ok("applyMorphologyRules agentivo returns nominal formSpec", agentivo.formSpec && typeof agentivo.formSpec === "object");

    const buildSilentAdverbRequest = ({ verb, objectPrefix = "" }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense: "pasado-remoto-adverbio-activo",
                tenseMode: ctx.TENSE_MODE.adverbio,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix,
            verb,
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    const adverbioMatiVi = ctx.executeGenerateWordRequest(buildSilentAdverbRequest({ verb: "(mati)" }));
    s.ok("adverbio mati VI generates", adverbioMatiVi && !adverbioMatiVi.error);
    s.eq("adverbio mati VI uses active preterit adverb forms", adverbioMatiVi.surfaceForms, ["matka", "matika"]);

    const adverbioMatiVtTa = ctx.executeGenerateWordRequest(buildSilentAdverbRequest({
        verb: "-(mati)",
        objectPrefix: "ta",
    }));
    s.ok("adverbio mati VT ta generates", adverbioMatiVtTa && !adverbioMatiVtTa.error);
    s.eq("adverbio mati VT ta does not double-prefix ta", adverbioMatiVtTa.surfaceForms, ["tamatka", "tamatika"]);

    const adverbioMatiVtZero = ctx.executeGenerateWordRequest(buildSilentAdverbRequest({ verb: "-(mati)" }));
    s.eq("adverbio mati VT rejects zero object", adverbioMatiVtZero.error, "Adverbio activo transitivo solo con ta/te/mu.");

    const buildSilentActiveAdjectiveRequest = ({
        tense,
        verb,
        subjectPrefix = "",
        subjectSuffix = "",
    }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense,
                tenseMode: ctx.TENSE_MODE.adjetivo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
                subjectPrefix,
                subjectSuffix,
            },
        },
        prefixInputs: {
            subjectPrefix,
            objectPrefix: "",
            verb,
            subjectSuffix,
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    const chipawaPreteritoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-tik",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo preterito -tik uses patientivo tronco -k core", chipawaPreteritoTik.surfaceForms, ["chipaktik"]);
    const chipawaPerfectoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-tik",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo perfecto -tik uses patientivo tronco -kti core", chipawaPerfectoTik.surfaceForms, ["chipaktituk"]);
    const chipawaPreteritoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo preterito -naj uses patientivo tronco -k core", chipawaPreteritoNaj.surfaceForms, ["chipaknaj"]);
    const chipawaPreteritoNajFirstPlural = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(chipawa)",
        subjectPrefix: "ti",
        subjectSuffix: "t",
    }));
    s.eq("adjetivo preterito -naj plural keeps preterite plural tail", chipawaPreteritoNajFirstPlural.surfaceForms, ["tichipaknajket"]);
    const chipawaPreteritoNajEachOfUsBase = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(chipawa)",
        subjectPrefix: "ti",
    }));
    s.eq(
        "adjetivo preterito -naj distributive plural reduplicates singular surface",
        ctx.reduplicateConjugationDisplay(chipawaPreteritoNajEachOfUsBase.result, {
            prefixChain: "ti",
            applyMissingPrefixChain: true,
        }),
        "tichijchipaknaj"
    );
    const chipawaPerfectoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-naj",
        verb: "(chipawa)",
    }));
    s.eq("adjetivo perfecto -naj uses patientivo tronco -k core", chipawaPerfectoNaj.surfaceForms, ["chipaknajtuk"]);

    const restoreState = {
        tenseMode: typeof ctx.getActiveTenseMode === "function" ? ctx.getActiveTenseMode() : null,
        derivationMode: typeof ctx.getActiveDerivationMode === "function" ? ctx.getActiveDerivationMode() : null,
        derivationType: typeof ctx.getActiveDerivationType === "function" ? ctx.getActiveDerivationType() : null,
        voiceMode: typeof ctx.getActiveVoiceMode === "function" ? ctx.getActiveVoiceMode() : null,
        combinedMode: typeof ctx.getCombinedMode === "function" ? ctx.getCombinedMode() : null,
    };
    const callIfExists = (name, ...args) => {
        if (typeof ctx[name] === "function") {
            ctx[name](...args);
        }
    };
    const advertisedRouteFailures = [];
    const routeSamples = [
        { label: "VI mati", verb: "(mati)" },
        { label: "VT mati", verb: "-(mati)" },
        { label: "VI nemi", verb: "(nemi)" },
        { label: "VT maka", verb: "-(maka)" },
    ];
    const routeModeNames = ["verbo", "sustantivo", "adjetivo", "adverbio"];
    const routeDerivationTypeNames = ["direct", "causative", "applicative"];
    const getRouteObjectPrefixes = (modeName, tense, verb) => {
        const parsed = ctx.parseVerbInput(verb);
        if (modeName === "sustantivo" || modeName === "adjetivo" || modeName === "adverbio") {
            const bundle = ctx.getNounObjectSlotPlansFromMeta(parsed, tense, {
                combinedMode: ctx.COMBINED_MODE.active,
            });
            const primarySlot = bundle.slotPlans.find((slot) => slot.id === "object");
            return primarySlot ? primarySlot.toggleValues : [""];
        }
        return ctx.getBaseObjectSlots(parsed) > 0 ? ["", "ki", "ta", "te", "mu"] : [""];
    };
    routeModeNames.forEach((modeName) => {
        const mode = ctx.TENSE_MODE[modeName];
        callIfExists("setActiveTenseMode", mode);
        callIfExists("setActiveDerivationMode", ctx.DERIVATION_MODE.active);
        callIfExists("setActiveVoiceMode", ctx.VOICE_MODE.active);
        callIfExists("setCombinedMode", ctx.COMBINED_MODE.active);
        ctx.getTenseOrderForMode(mode).forEach((tense) => {
            routeDerivationTypeNames.forEach((derivationTypeName) => {
                const derivationType = ctx.DERIVATION_TYPE[derivationTypeName];
                callIfExists("setActiveDerivationType", derivationType);
                routeSamples.forEach((sample) => {
                    getRouteObjectPrefixes(modeName, tense, sample.verb).forEach((objectPrefix) => {
                        try {
                            ctx.executeGenerateWordRequest({
                                options: {
                                    silent: true,
                                    skipValidation: false,
                                    override: {
                                        tense,
                                        tenseMode: mode,
                                        derivationMode: ctx.DERIVATION_MODE.active,
                                        derivationType,
                                        voiceMode: ctx.VOICE_MODE.active,
                                    },
                                },
                                prefixInputs: {
                                    subjectPrefix: "",
                                    objectPrefix,
                                    verb: sample.verb,
                                    subjectSuffix: "",
                                    possessivePrefix: "",
                                },
                                liveInput: {
                                    hasVerbInput: false,
                                    verbInputValue: "",
                                },
                            });
                        } catch (error) {
                            advertisedRouteFailures.push({
                                mode: modeName,
                                tense,
                                derivationType: derivationTypeName,
                                sample: sample.label,
                                objectPrefix: objectPrefix || "Ø",
                                error: error && error.message ? error.message : String(error),
                            });
                        }
                    });
                });
            });
        });
    });
    callIfExists("setActiveTenseMode", restoreState.tenseMode);
    callIfExists("setActiveDerivationMode", restoreState.derivationMode);
    callIfExists("setActiveDerivationType", restoreState.derivationType);
    callIfExists("setActiveVoiceMode", restoreState.voiceMode);
    callIfExists("setCombinedMode", restoreState.combinedMode);
    s.eq("advertised direct mode routes do not throw", advertisedRouteFailures, []);

    return s;
}

module.exports = { run };
