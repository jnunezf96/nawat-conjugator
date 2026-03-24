(function () {
    const raw = "-(i)sh/ilpia";
    const result = {};
    if (typeof parseVerbInput !== "function" || typeof generateWord !== "function") {
        return JSON.stringify({ error: "missing-runtime-functions" });
    }
    const parsedVerb = parseVerbInput(raw);
    result.parsedVerb = parsedVerb ? {
        verb: parsedVerb.verb,
        analysisVerb: parsedVerb.analysisVerb,
        rawAnalysisVerb: parsedVerb.rawAnalysisVerb,
        exactBaseVerb: parsedVerb.exactBaseVerb,
        hasSlashMarker: parsedVerb.hasSlashMarker,
        hasBoundMarker: parsedVerb.hasBoundMarker,
        hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI,
        optionalSupportiveLetter: parsedVerb.optionalSupportiveLetter,
    } : null;
    if (typeof buildObjectAllomorphyMetaOptions === "function" && typeof applyObjectAllomorphy === "function") {
        result.objectAllomorphy = applyObjectAllomorphy({
            verb: parsedVerb.verb,
            analysisVerb: parsedVerb.analysisVerb,
            subjectPrefix: "ni",
            subjectSuffix: "",
            objectPrefix: "ta",
            indirectObjectMarker: "",
            thirdObjectMarker: "",
            isPassiveImpersonalMode: false,
            ...buildObjectAllomorphyMetaOptions(parsedVerb),
        });
    }
    if (typeof shouldDelaySlashSupportiveIAllomorphyForPret === "function") {
        result.delayPretAllomorphy = shouldDelaySlashSupportiveIAllomorphyForPret({
            parsedVerb,
            tense: "perfecto",
            objectPrefix: "ta",
            indirectObjectMarker: "",
            thirdObjectMarker: "",
        });
    }
    const makeCase = (tense, {
        subjectPrefix = "ni",
        subjectSuffix = "",
        objectPrefix = "ta",
        derivationMode = DERIVATION_MODE.active,
        voiceMode = VOICE_MODE.active,
    } = {}) => generateWord({
        silent: true,
        skipValidation: true,
        override: {
            tenseMode: TENSE_MODE.verbo,
            derivationMode,
            voiceMode,
            derivationType: DERIVATION_TYPE.direct,
            subjectPrefix,
            subjectSuffix,
            objectPrefix,
            verb: raw,
            tense,
            parsedVerb,
        },
    });
    result.present = makeCase("presente");
    result.perfecto = makeCase("perfecto");
    result.preterito = makeCase("preterito");
    result.passivePerfecto = makeCase("perfecto", {
        subjectPrefix: "ni",
        objectPrefix: "",
        derivationMode: DERIVATION_MODE.nonactive,
        voiceMode: VOICE_MODE.passive,
    });
    const activeSlots = [
        { label: "1sg", subjectPrefix: "ni", subjectSuffix: "" },
        { label: "2sg", subjectPrefix: "ti", subjectSuffix: "" },
        { label: "3sg", subjectPrefix: "", subjectSuffix: "" },
        { label: "1pl", subjectPrefix: "ti", subjectSuffix: "t" },
        { label: "2pl", subjectPrefix: "an", subjectSuffix: "t" },
        { label: "3pl", subjectPrefix: "", subjectSuffix: "t" },
    ];
    result.perfectoActiveSlots = activeSlots.map((slot) => ({
        ...slot,
        output: makeCase("perfecto", {
            subjectPrefix: slot.subjectPrefix,
            subjectSuffix: slot.subjectSuffix,
            objectPrefix: "ta",
        }).result,
    }));
    return JSON.stringify(result);
})();
