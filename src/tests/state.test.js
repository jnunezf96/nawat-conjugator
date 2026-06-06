"use strict";

/**
 * Tests for src/ui/state.js — Toggle Lock functions.
 * Covers: isToggleLockEnabled, getToggleLockStateKey,
 *         getToggleStateValue, setToggleStateValue,
 *         clearToggleLockValueState, clearAllToggleStateMaps,
 *         applyDefaultToggleStateOnce.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("state");
    const summarizeRouteSourceState = (sourceState) => sourceState && ({
        version: sourceState.version,
        routeId: sourceState.routeId,
        legacyTenseValue: sourceState.legacyTenseValue,
        routePlacement: sourceState.routePlacement,
        sourceMode: sourceState.sourceMode,
        sourceTenseValue: sourceState.sourceTenseValue,
        sourceState: sourceState.sourceState,
        sourceSlot: sourceState.sourceSlot,
        sourceCategory: sourceState.sourceCategory,
        sourceSurface: sourceState.sourceSurface,
        sourceInput: sourceState.sourceInput,
        sourceVerb: sourceState.sourceVerb,
        verbalizer: sourceState.verbalizer,
        verbalizerType: sourceState.verbalizerType,
        targetMode: sourceState.targetMode,
        targetTense: sourceState.targetTense,
        targetVerb: sourceState.targetVerb,
        valency: sourceState.valency,
        stationKeys: Array.isArray(sourceState.stations)
            ? sourceState.stations.map((station) => station.key)
            : [],
        flags: sourceState.flags,
    });

    // isToggleLockEnabled — ToggleLockState starts disabled
    s.no("toggle lock off by default", ctx.isToggleLockEnabled());
    s.eq("nawat mode scaffold includes particle", ctx.NAWAT_TENSE_MODE.particula, "particula");
    s.eq("european mode scaffold remains available", ctx.TENSE_MODE_SYSTEM.european, "european");
    s.eq(
        "ordinary NNC UI state helpers are exported",
        [
            typeof ctx.isOrdinaryNncGenerationModeEnabled,
            typeof ctx.setOrdinaryNncGenerationModeEnabled,
            typeof ctx.setOrdinaryNncGenerationState,
            typeof ctx.getOrdinaryNncGenerationState,
            typeof ctx.buildOrdinaryNncGenerateWordRequest,
            typeof ctx.parseOrdinaryNncGenerationAnalogueInput,
            typeof ctx.formatOrdinaryNncGenerationAnalogueInput,
        ],
        ["function", "function", "function", "function", "function", "function", "function"]
    );
    const isOrdinaryNncGenerationModeEnabled = typeof ctx.isOrdinaryNncGenerationModeEnabled === "function"
        ? () => ctx.isOrdinaryNncGenerationModeEnabled()
        : () => undefined;
    const setOrdinaryNncGenerationModeEnabled = typeof ctx.setOrdinaryNncGenerationModeEnabled === "function"
        ? (enabled, options) => ctx.setOrdinaryNncGenerationModeEnabled(enabled, options)
        : () => undefined;
    const setOrdinaryNncGenerationState = typeof ctx.setOrdinaryNncGenerationState === "function"
        ? (options) => ctx.setOrdinaryNncGenerationState(options)
        : () => undefined;
    const getOrdinaryNncGenerationState = typeof ctx.getOrdinaryNncGenerationState === "function"
        ? () => ctx.getOrdinaryNncGenerationState()
        : () => undefined;
    const buildOrdinaryNncGenerateWordRequest = typeof ctx.buildOrdinaryNncGenerateWordRequest === "function"
        ? (options) => ctx.buildOrdinaryNncGenerateWordRequest(options)
        : () => ({ options: { override: {} }, prefixInputs: {} });
    s.eq(
        "ordinary NNC analogue input parser separates stem and connector",
        ["(siwa)t", "(xilun)ti", "(tekpan)in", "(kal)"].map((value) => ctx.parseOrdinaryNncGenerationAnalogueInput(value)),
        [
            { stem: "siwa", nounClass: "t", connector: "t", predicateFormula: "(siwa)t" },
            { stem: "xilun", nounClass: "ti", connector: "ti", predicateFormula: "(xilun)ti" },
            { stem: "tekpan", nounClass: "in", connector: "in", predicateFormula: "(tekpan)in" },
            { stem: "kal", nounClass: "zero", connector: "", predicateFormula: "(kal)" },
        ]
    );
    s.eq(
        "ordinary NNC analogue formatter keeps the connector outside parentheses",
        [
            { stem: "siwa", nounClass: "t" },
            { stem: "xilun", nounClass: "ti" },
            { stem: "tekpan", nounClass: "in" },
            { stem: "siwa", nounClass: "zero" },
        ].map((request) => ctx.formatOrdinaryNncGenerationAnalogueInput(request)),
        ["(siwa)t", "(xilun)ti", "(tekpan)in", "(siwa)"]
    );
    s.no("ordinary NNC UI mode starts disabled", isOrdinaryNncGenerationModeEnabled());
    s.no(
        "ordinary NNC override is absent without explicit mode",
        buildOrdinaryNncGenerateWordRequest({ stem: "xilun", explicit: false }).options.override.ordinaryNnc
    );
    setOrdinaryNncGenerationModeEnabled(true);
    setOrdinaryNncGenerationState({ state: "possessive", number: "singular", possessor: "nu" });
    s.eq(
        "ordinary NNC UI state records explicit slot selection",
        getOrdinaryNncGenerationState(),
        {
            enabled: true,
            state: "possessive",
            number: "singular",
            pluralType: "auto",
            subjectPrefix: "",
            subjectSuffix: "",
            subjectKey: "3sg",
            possessor: "nu",
            nounClass: "",
            animacy: "inanimate",
        }
    );
    s.eq(
        "ordinary NNC UI request builder emits explicit override",
        buildOrdinaryNncGenerateWordRequest({ stem: "kal" }).options.override,
        {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            verb: "kal",
            tense: "ordinary-nnc",
            tenseMode: ctx.TENSE_MODE.sustantivo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
            possessivePrefix: "nu",
            ordinaryNnc: {
                enabled: true,
                stem: "kal",
                state: "possessive",
                number: "singular",
                pluralType: "auto",
                subjectPrefix: "",
                subjectSuffix: "",
                subjectKey: "3sg",
                possessor: "nu",
                nounClass: "",
                animacy: "inanimate",
            },
        }
    );
    setOrdinaryNncGenerationState({ state: "absolutive", number: "plural", possessor: "mu" });
    s.eq(
        "ordinary NNC UI state clears possessor outside possessive state without changing subject agreement",
        buildOrdinaryNncGenerateWordRequest({ stem: "kal" }).options.override,
        {
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            verb: "kal",
            tense: "ordinary-nnc",
            tenseMode: ctx.TENSE_MODE.sustantivo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
            possessivePrefix: "",
            ordinaryNnc: {
                enabled: true,
                stem: "kal",
                state: "absolutive",
                number: "plural",
                pluralType: "auto",
                subjectPrefix: "",
                subjectSuffix: "",
                subjectKey: "3sg",
                possessor: "",
                nounClass: "",
                animacy: "inanimate",
            },
        }
    );
    setOrdinaryNncGenerationState({ subjectKey: "2pl", number: "plural", animacy: "animate" });
    s.eq(
        "ordinary NNC UI request builder emits explicit NNC subject",
        buildOrdinaryNncGenerateWordRequest({ stem: "mistun" }).options.override,
        {
            subjectPrefix: "an",
            subjectSuffix: "t",
            objectPrefix: "",
            verb: "mistun",
            tense: "ordinary-nnc",
            tenseMode: ctx.TENSE_MODE.sustantivo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
            possessivePrefix: "",
            ordinaryNnc: {
                enabled: true,
                stem: "mistun",
                state: "absolutive",
                number: "plural",
                pluralType: "auto",
                subjectPrefix: "an",
                subjectSuffix: "t",
                subjectKey: "2pl",
                possessor: "",
                nounClass: "",
                animacy: "animate",
            },
        }
    );
    s.eq(
        "ordinary NNC UI request builder normalizes visible nounstem classes",
        ["t", "ti", "in", "Ø"].map((nounClass) => (
            buildOrdinaryNncGenerateWordRequest({ stem: "xilun", nounClass }).options.override.ordinaryNnc.nounClass
        )),
        ["t", "ti", "in", "zero"]
    );
    setOrdinaryNncGenerationState({ nounClass: "zero" });
    s.eq(
        "ordinary NNC UI request builder keeps fixture class unspecified when requested",
        buildOrdinaryNncGenerateWordRequest({ stem: "mistun", nounClass: "" }).options.override.ordinaryNnc.nounClass,
        ""
    );
    s.eq(
        "ordinary NNC UI request builder accepts analogue entrada values",
        (() => {
            const override = buildOrdinaryNncGenerateWordRequest({
                stem: "(siwa)t",
                state: "absolutive",
                number: "singular",
                animacy: "inanimate",
            }).options.override;
            return {
                verb: override.verb,
                tense: override.tense,
                nounClass: override.ordinaryNnc.nounClass,
                stem: override.ordinaryNnc.stem,
            };
        })(),
        {
            verb: "siwa",
            tense: "ordinary-nnc",
            nounClass: "t",
            stem: "siwa",
        }
    );
    setOrdinaryNncGenerationState({ subjectKey: "3sg", subjectPrefix: "", subjectSuffix: "", animacy: "inanimate" });
    setOrdinaryNncGenerationModeEnabled(false);
    s.no("ordinary NNC UI mode can be disabled", isOrdinaryNncGenerationModeEnabled());
    const tiPreteritRoute = ctx.getNawatRouteProfile("adjetivo-preterito-tik");
    s.eq("future nawat route maps legacy -tik preterit id", tiPreteritRoute.id, "denominal-vi-ti-preterit");
    s.eq("future nawat route keeps source slot", tiPreteritRoute.sourceSlot, "noun/inc.root");
    s.eq("future nawat route keeps denominal VI verbalizer", tiPreteritRoute.verbalizer, "-ti");
    s.eq("future nawat route maps to nawat verb mode", tiPreteritRoute.nawatMode, "verbo");
    s.eq(
        "future nawat route stays inside nawat verb convention",
        ctx.formatNawatRouteNawatTargetLabel(tiPreteritRoute, false),
        "Nawat: Verbo > pretérito perfecto simple"
    );
    s.eq(
        "future nawat route foregrounds noun to verb conversion",
        ctx.formatNawatRouteConversionLabel(tiPreteritRoute, false),
        "Sustantivo -> Verbo"
    );
    s.no(
        "future nawat breadcrumb target does not point to european convention",
        ctx.formatNawatRouteNawatTargetLabel(tiPreteritRoute, false).includes("Europea")
    );
    const tiPreteritTarget = ctx.resolveNawatRouteTarget("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq("nawat denominal source-state helper is exported", typeof ctx.resolveNawatRouteSourceStateMetadata, "function");
    s.eq("future nawat route verbalizes pusuni with -ti before traveling", tiPreteritTarget.targetVerb, "pusukti");
    s.eq("future nawat route keeps source convention mode", tiPreteritTarget.sourceMode, ctx.TENSE_MODE.verbo);
    s.eq("future nawat route keeps source station", tiPreteritTarget.sourceTenseValue, "presente");
    s.eq("future nawat route targets verb mode", tiPreteritTarget.targetMode, ctx.TENSE_MODE.verbo);
    s.eq("future nawat route targets ordinary verb preterite", tiPreteritTarget.targetTenseValue, "preterito");
    s.eq(
        "future nawat route exposes source breadcrumb stop",
        ctx.formatNawatRouteNawatOriginLabel(tiPreteritRoute, false),
        "Nawat: Verbo > presente"
    );
    const tiRouteStations = ctx.getNawatRouteStationModels("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "future nawat route exposes clickable station keys",
        tiRouteStations.map((station) => station.key),
        ["source-mode", "source-tense", "stem", "verbalizer", "target-mode", "finite-tense"]
    );
    s.eq(
        "future nawat route lets #1 entrada change by station",
        tiRouteStations.map((station) => station.inputValue),
        ["(pusuni)", "(pusuni)", "pusuk", "(pusukti)", "(pusukti)", "(pusukti)"]
    );
    s.eq(
        "future nawat route separates verb source and noun patientive stem stations",
        tiRouteStations.map((station) => `${station.mode}:${station.tenseValue}`),
        ["verbo:presente", "verbo:presente", "sustantivo:patientivo", "verbo:presente", "verbo:presente", "verbo:preterito"]
    );
    s.eq(
        "future nawat route exposes the active station segment as grammar metadata",
        ctx.formatNawatRouteStationConversionLabel(tiPreteritRoute, "verbalizer", false, {
            stationModels: tiRouteStations,
        }),
        "tronco verbal -> [noun/inc.root]ti"
    );
    s.eq(
        "future nawat route conversion follows surface train trail",
        ctx.formatNawatRouteSurfaceTrailLabel(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            stationModels: tiRouteStations,
            routeTarget: tiPreteritTarget,
        }),
        "(pusuni) → pusuk → (pusukti) → pusuktik"
    );
    s.eq(
        "denominal VI -ti route exposes source-state metadata",
        summarizeRouteSourceState(ctx.resolveNawatRouteSourceStateMetadata("denominal-vi-ti-preterit", {
            sourceVerb: "(pusuni)",
            routeTarget: tiPreteritTarget,
            stationModels: tiRouteStations,
        })),
        {
            version: 1,
            routeId: "denominal-vi-ti-preterit",
            legacyTenseValue: "adjetivo-preterito-tik",
            routePlacement: "patientivo-tronco-conversion",
            sourceMode: ctx.TENSE_MODE.verbo,
            sourceTenseValue: "presente",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.root",
            sourceCategory: "noun-or-incorporated-root",
            sourceSurface: "pusuk",
            sourceInput: "(pusuni)",
            sourceVerb: "(pusuni)",
            verbalizer: "-ti",
            verbalizerType: "denominal-intransitive",
            targetMode: ctx.TENSE_MODE.verbo,
            targetTense: "preterito",
            targetVerb: "pusukti",
            valency: "intransitive",
            stationKeys: ["source-mode", "source-tense", "stem", "verbalizer", "target-mode", "finite-tense"],
            flags: {
                denominal: true,
                patientivoTroncoConversion: true,
                transitive: false,
                intransitive: true,
            },
        }
    );
    s.eq(
        "denominal source-state metadata leaves VI -ti finite output unchanged",
        ctx.getNawatRouteFiniteSurfaceForm(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: tiPreteritTarget,
        }),
        "pusuktik"
    );
    const tiRouteFromTroncoOutputTarget = ctx.resolveNawatRouteTarget("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
    });
    const tiRouteFromTroncoOutputStations = ctx.getNawatRouteStationModels("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
        routeTarget: tiRouteFromTroncoOutputTarget,
    });
    s.eq(
        "future nawat route can start conversion from a clicked tronco output",
        ctx.formatNawatRouteSurfaceTrailLabel(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            sourceStem: "pusuchti",
            stationModels: tiRouteFromTroncoOutputStations,
            routeTarget: tiRouteFromTroncoOutputTarget,
        }),
        "(pusuni) → pusuchti → (pusuchtiti) → pusuchtitik"
    );
    const naPerfectRoute = ctx.getNawatRouteProfile("denominal-vt-na-perfect");
    s.eq("canonical future nawat route resolves legacy tense", naPerfectRoute.legacyTenseValue, "adjetivo-perfecto-naj");
    s.eq("canonical future nawat route keeps denominal VT verbalizer", naPerfectRoute.verbalizer, "-na");
    const naPreteritRoute = ctx.getNawatRouteProfile("denominal-vt-na-preterit");
    const naPreteritTarget = ctx.resolveNawatRouteTarget("denominal-vt-na-preterit", {
        sourceVerb: "(pusuni)",
    });
    const naRouteStations = ctx.getNawatRouteStationModels("denominal-vt-na-preterit", {
        sourceVerb: "(pusuni)",
        routeTarget: naPreteritTarget,
    });
    s.eq(
        "future nawat -na route keeps verbalizer inside transitive input",
        naRouteStations.map((station) => station.inputValue),
        ["(pusuni)", "(pusuni)", "pusuk", "(pusuk)-(na)", "(pusuk)-(na)", "(pusuk)-(na)"]
    );
    s.eq(
        "future nawat -na conversion follows segmented transitive trail",
        ctx.formatNawatRouteSurfaceTrailLabel(naPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: naPreteritTarget,
            stationModels: naRouteStations,
        }),
        "(pusuni) → pusuk → (pusuk)-(na) → pusuknaj"
    );
    s.eq(
        "denominal VT -na route exposes source-state metadata",
        summarizeRouteSourceState(ctx.resolveNawatRouteSourceStateMetadata("denominal-vt-na-preterit", {
            sourceVerb: "(pusuni)",
            routeTarget: naPreteritTarget,
            stationModels: naRouteStations,
        })),
        {
            version: 1,
            routeId: "denominal-vt-na-preterit",
            legacyTenseValue: "adjetivo-preterito-naj",
            routePlacement: "patientivo-tronco-conversion",
            sourceMode: ctx.TENSE_MODE.verbo,
            sourceTenseValue: "presente",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.obj.",
            sourceCategory: "noun-or-incorporated-object",
            sourceSurface: "pusuk",
            sourceInput: "(pusuni)",
            sourceVerb: "(pusuni)",
            verbalizer: "-na",
            verbalizerType: "denominal-transitive",
            targetMode: ctx.TENSE_MODE.verbo,
            targetTense: "preterito",
            targetVerb: "pusukna",
            valency: "transitive",
            stationKeys: ["source-mode", "source-tense", "stem", "verbalizer", "target-mode", "finite-tense"],
            flags: {
                denominal: true,
                patientivoTroncoConversion: true,
                transitive: true,
                intransitive: false,
            },
        }
    );
    s.eq(
        "denominal source-state metadata leaves VT -na finite output unchanged",
        ctx.getNawatRouteFiniteSurfaceForm(naPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: naPreteritTarget,
        }),
        "pusuknaj"
    );
    const iwiPreteritRoute = ctx.getNawatRouteProfile("denominal-vi-iwi-preterit");
    s.eq("future nawat -iwi route has no european legacy tense", iwiPreteritRoute.legacyTenseValue, "");
    s.eq("future nawat -iwi route keeps denominal VI verbalizer", iwiPreteritRoute.verbalizer, "-iwi");
    const iwiPreteritTarget = ctx.resolveNawatRouteTarget("denominal-vi-iwi-preterit", {
        sourceVerb: "(pusuni)",
    });
    const iwiPreteritStations = ctx.getNawatRouteStationModels("denominal-vi-iwi-preterit", {
        sourceVerb: "(pusuni)",
        routeTarget: iwiPreteritTarget,
    });
    s.eq("future nawat -iwi route verbalizes patientivo tronco stem", iwiPreteritTarget.targetVerb, "pusukiwi");
    s.eq(
        "future nawat -iwi preterit follows patientivo tronco trail",
        ctx.formatNawatRouteSurfaceTrailLabel(iwiPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: iwiPreteritTarget,
            stationModels: iwiPreteritStations,
        }),
        "(pusuni) → pusuk → (pusukiwi) → pusukiwik"
    );
    s.eq(
        "denominal VI -iwi route exposes source-state metadata",
        summarizeRouteSourceState(ctx.resolveNawatRouteSourceStateMetadata("denominal-vi-iwi-preterit", {
            sourceVerb: "(pusuni)",
            routeTarget: iwiPreteritTarget,
            stationModels: iwiPreteritStations,
        })),
        {
            version: 1,
            routeId: "denominal-vi-iwi-preterit",
            legacyTenseValue: "",
            routePlacement: "patientivo-tronco-conversion",
            sourceMode: ctx.TENSE_MODE.verbo,
            sourceTenseValue: "presente",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.root",
            sourceCategory: "noun-or-incorporated-root",
            sourceSurface: "pusuk",
            sourceInput: "(pusuni)",
            sourceVerb: "(pusuni)",
            verbalizer: "-iwi",
            verbalizerType: "denominal-intransitive",
            targetMode: ctx.TENSE_MODE.verbo,
            targetTense: "preterito",
            targetVerb: "pusukiwi",
            valency: "intransitive",
            stationKeys: ["source-mode", "source-tense", "stem", "verbalizer", "target-mode", "finite-tense"],
            flags: {
                denominal: true,
                patientivoTroncoConversion: true,
                transitive: false,
                intransitive: true,
            },
        }
    );
    s.eq(
        "denominal source-state metadata leaves VI -iwi finite output unchanged",
        ctx.getNawatRouteFiniteSurfaceForm(iwiPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: iwiPreteritTarget,
        }),
        "pusukiwik"
    );
    const iwiPerfectRoute = ctx.getNawatRouteProfile("denominal-vi-iwi-perfect");
    const iwiPerfectTarget = ctx.resolveNawatRouteTarget("denominal-vi-iwi-perfect", {
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "future nawat -iwi perfect follows patientivo tronco trail",
        ctx.formatNawatRouteSurfaceTrailLabel(iwiPerfectRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: iwiPerfectTarget,
        }),
        "(pusuni) → pusuk → (pusukiwi) → pusukiwtuk"
    );
    const awiPreteritRoute = ctx.getNawatRouteProfile("denominal-vi-awi-preterit");
    const awiPreteritTarget = ctx.resolveNawatRouteTarget("denominal-vi-awi-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq("future nawat -awi route verbalizes patientivo tronco stem", awiPreteritTarget.targetVerb, "pusukawi");
    s.eq(
        "future nawat -awi preterit follows patientivo tronco trail",
        ctx.formatNawatRouteSurfaceTrailLabel(awiPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: awiPreteritTarget,
        }),
        "(pusuni) → pusuk → (pusukawi) → pusukawik"
    );
    const awiPerfectRoute = ctx.getNawatRouteProfile("denominal-vi-awi-perfect");
    const awiPerfectTarget = ctx.resolveNawatRouteTarget("denominal-vi-awi-perfect", {
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "future nawat -awi perfect follows patientivo tronco trail",
        ctx.formatNawatRouteSurfaceTrailLabel(awiPerfectRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: awiPerfectTarget,
        }),
        "(pusuni) → pusuk → (pusukawi) → pusukawtuk"
    );
    s.eq(
        "agentive manner is no longer a nawat rail route",
        ctx.getNawatRouteProfile("agentive-manner-adverb"),
        null
    );
    s.no(
        "agentive manner is absent from the nawat route inventory",
        ctx.getNawatRouteProfiles().some((profile) => profile.id === "agentive-manner-adverb")
    );
    s.ok(
        "legacy adverb tense remains outside the nawat rail",
        ctx.getTenseOrderForMode(ctx.TENSE_MODE.adverbio).includes("pasado-remoto-adverbio-activo")
    );
    const directPreteritRoute = ctx.getNawatRouteProfile("direct-active-preterit");
    s.eq("direct active preterit route resolves legacy tense", directPreteritRoute.legacyTenseValue, "adjetivo-preterito");
    s.ok(
        "all future nawat routes expose spanish-side route labels",
        ctx.getNawatRouteProfiles().every((profile) => ctx.formatNawatRouteProfileLabel(profile, false))
    );
    s.ok(
        "all future nawat routes expose nawat-side route labels",
        ctx.getNawatRouteProfiles().every((profile) => ctx.formatNawatRouteProfileLabel(profile, true))
    );
    s.eq(
        "direct active preterit route has a nawat-side spanish label",
        ctx.formatNawatRouteProfileLabel(directPreteritRoute, false),
        "verbo → pretérito perfecto simple"
    );
    s.eq(
        "direct active preterit route has a nawat label",
        ctx.formatNawatRouteProfileLabel(directPreteritRoute, true),
        "muchiwalis → ipan muchiwki"
    );
    s.eq(
        "direct active preterit route has a nawat-side meta label",
        ctx.formatNawatRouteProfileMetaLabel(directPreteritRoute, false),
        "presente → pretérito perfecto simple"
    );
    s.eq(
        "direct active preterit route is verb to verb",
        ctx.formatNawatRouteConversionLabel(directPreteritRoute, false),
        "Verbo -> Verbo"
    );
    const directPreteritTarget = ctx.resolveNawatRouteTarget(directPreteritRoute, { sourceVerb: "(pusuni)" });
    const directPreteritStations = ctx.getNawatRouteStationModels(directPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: directPreteritTarget,
    });
    s.eq(
        "non-denominal direct route source-state metadata is null",
        ctx.resolveNawatRouteSourceStateMetadata(directPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: directPreteritTarget,
            stationModels: directPreteritStations,
        }),
        null
    );
    s.eq(
        "direct active preterit route hides redundant source tense and target mode stations",
        directPreteritStations.map((station) => station.key),
        ["source-mode", "finite-tense"]
    );
    s.eq(
        "direct active preterit route lands in ordinary verb preterite",
        ctx.formatNawatRouteSurfaceTrailLabel(directPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: directPreteritTarget,
            stationModels: directPreteritStations,
        }),
        "(pusuni) → pusunki"
    );
    const directPerfectRoute = ctx.getNawatRouteProfile("direct-active-perfect");
    s.eq(
        "direct active perfect route lands in ordinary verb perfect",
        ctx.formatNawatRouteSurfaceTrailLabel(directPerfectRoute, {
            sourceVerb: "(pusuni)",
        }),
        "(pusuni) → pusuntuk"
    );
    const patientivoNonactiveRoute = ctx.getNawatRouteProfile("patientivo-nonactive-ti");
    s.eq(
        "patientivo nonactive route has a nawat label",
        ctx.formatNawatRouteProfileLabel(patientivoNonactiveRoute, true),
        "muchiwalis → tachiwal te muselia -ti"
    );
    const patientivoNonactiveTarget = ctx.resolveNawatRouteTarget(patientivoNonactiveRoute, { sourceVerb: "(pusuni)" });
    const patientivoNonactiveStations = ctx.getNawatRouteStationModels(patientivoNonactiveRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: patientivoNonactiveTarget,
    });
    s.eq(
        "patientivo nonactive route is verb to noun",
        ctx.formatNawatRouteConversionLabel(patientivoNonactiveRoute, false),
        "Verbo -> Sustantivo"
    );
    s.eq(
        "patientivo nonactive route exposes branch and suffix stations",
        patientivoNonactiveStations.map((station) => station.key),
        ["source-mode", "source-tense", "patientivo-branch", "surface-profile", "target-mode", "finite-tense"]
    );
    s.eq(
        "patientivo nonactive route keeps its branch metadata",
        patientivoNonactiveStations.find((station) => station.key === "patientivo-branch").patientivoSource,
        "nonactive"
    );
    s.eq(
        "patientivo nonactive route lands in patientivo -ti surface",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoNonactiveRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: patientivoNonactiveTarget,
            stationModels: patientivoNonactiveStations,
        }),
        "(pusuni) → pusuniwa → patientivo · pasivo/impersonal → -ti → pusuniti"
    );
    const patientivoPerfectiveRoute = ctx.getNawatRouteProfile("patientivo-perfective-ti");
    const patientivoPerfectiveTarget = ctx.resolveNawatRouteTarget(patientivoPerfectiveRoute, {
        sourceVerb: "(pusuni)",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "patientivo perfective route rides through the explicit perfective verb surface",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoPerfectiveRoute, {
            sourceVerb: "(pusuni)",
            sourceTenseValue: "preterito",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: patientivoPerfectiveTarget,
        }),
        "(pusuni) → pusunki → patientivo · perfectivo → -ti → pusunti"
    );
    const patientivoImperfectiveNounRoute = ctx.getNawatRouteProfile("patientivo-imperfective-t");
    s.eq(
        "patientivo noun route defaults to present source tense",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoImperfectiveNounRoute, {
            sourceVerb: "(kuchi)",
        }),
        "(kuchi) → kuchi → patientivo · imperfectivo → -t → kuchit"
    );
    const patientivoImperfectiveNounTarget = ctx.resolveNawatRouteTarget(patientivoImperfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "patientivo imperfective noun route rides through the explicit imperfective verb surface",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoImperfectiveNounRoute, {
            sourceVerb: "(kuchi)",
            sourceTenseValue: "imperfecto",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: patientivoImperfectiveNounTarget,
        }),
        "(kuchi) → kuchiya → patientivo · imperfectivo → -t → kuchiyat"
    );
    const patientivoPerfectiveNounRoute = ctx.getNawatRouteProfile("patientivo-perfective-ti-noun");
    const patientivoPerfectiveNounTarget = ctx.resolveNawatRouteTarget(patientivoPerfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "patientivo perfective noun route rides through the explicit perfective verb surface",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoPerfectiveNounRoute, {
            sourceVerb: "(kuchi)",
            sourceTenseValue: "preterito",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: patientivoPerfectiveNounTarget,
        }),
        "(kuchi) → kuchki → patientivo · perfectivo → -ti → kuchti"
    );
    const patientivoNonactiveNounRoute = ctx.getNawatRouteProfile("patientivo-nonactive-t");
    const patientivoNonactiveNounTarget = ctx.resolveNawatRouteTarget(patientivoNonactiveNounRoute, {
        sourceVerb: "(kuchi)",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
    });
    s.eq(
        "patientivo nonactive noun route rides through the explicit nonactive verb surface",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoNonactiveNounRoute, {
            sourceVerb: "(kuchi)",
            sourceTenseValue: "preterito",
            sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
            routeTarget: patientivoNonactiveNounTarget,
        }),
        "(kuchi) → kuchiwak → patientivo · pasivo/impersonal → -t → kuchit"
    );
    const kuchiVerbNounRouteExpectations = [
        ["active", "presente", "kuchit"],
        ["active", "presente-habitual", "kuchinit"],
        ["active", "presente-desiderativo", "kuchisti"],
        ["active", "imperfecto", "kuchiyat"],
        ["active", "preterito", "kuchti"],
        ["active", "pasado-remoto", "kuchkat"],
        ["active", "perfecto", "kuchti"],
        ["active", "pluscuamperfecto", "kuchti"],
        ["active", "condicional-perfecto", "kuchti"],
        ["active", "futuro", "kuchisti"],
        ["active", "condicional", "kuchisti"],
        ["active", "imperativo", "kuchit"],
        ["nonactive", "presente", "kuchit"],
        ["nonactive", "presente-habitual", "kuchiwanit"],
        ["nonactive", "presente-desiderativo", "kuchiwasti"],
        ["nonactive", "imperfecto", "kuchiwayat"],
        ["nonactive", "preterito", "kuchit"],
        ["nonactive", "pasado-remoto", "kuchiwakat"],
        ["nonactive", "perfecto", "kuchit"],
        ["nonactive", "pluscuamperfecto", "kuchit"],
        ["nonactive", "condicional-perfecto", "kuchit"],
        ["nonactive", "futuro", "kuchiwasti"],
        ["nonactive", "condicional", "kuchiwasti"],
        ["nonactive", "imperativo", "kuchit"],
    ];
    kuchiVerbNounRouteExpectations.forEach(([mode, tenseValue, expectedSurface]) => {
        const sourceCombinedMode = mode === "nonactive"
            ? ctx.COMBINED_MODE.nonactive
            : ctx.COMBINED_MODE.active;
        const routeKey = ctx.resolveNawatVerbNounConversionRouteKeyForSource({
            sourceTenseValue: tenseValue,
            sourceCombinedMode,
        });
        const routeProfile = ctx.getNawatRouteProfile(routeKey);
        const routeTarget = ctx.resolveNawatRouteTarget(routeProfile, {
            sourceVerb: "(kuchi)",
            sourceTenseValue: tenseValue,
            sourceCombinedMode,
        });
        s.eq(
            `kuchi ${mode} ${tenseValue} V→S lands in expected patientivo noun`,
            ctx.getNawatRouteFiniteSurfaceForm(routeProfile, {
                sourceVerb: "(kuchi)",
                routeTarget,
            }),
            expectedSurface
        );
    });
    s.eq(
        "active pasado remoto V→S uses the imperfective patientive track",
        ctx.resolveNawatVerbNounConversionRouteKeyForSource({
            sourceTenseValue: "pasado-remoto",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
        }),
        "patientivo-imperfective-t"
    );
    const activeRemotePatientivoSpec = ctx.resolveNawatPatientivoRouteSpec({
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "active pasado remoto V→S route spec keeps source tense separate from patientivo class",
        activeRemotePatientivoSpec,
        {
            sourceTenseValue: "pasado-remoto",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            patientivoSource: "imperfectivo",
            routeKey: "patientivo-imperfective-t",
            suffix: "t",
            surfaceSuffix: "-t",
        }
    );
    const activeRemotePatientivoRoute = ctx.getNawatRouteProfile(activeRemotePatientivoSpec.routeKey);
    const activeRemotePatientivoTarget = ctx.resolveNawatRouteTarget(activeRemotePatientivoRoute, {
        sourceVerb: "(kuchi)",
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "active pasado remoto V→S trail names the destination as imperfective patientivo",
        ctx.formatNawatRouteSurfaceTrailLabel(activeRemotePatientivoRoute, {
            sourceVerb: "(kuchi)",
            sourceTenseValue: "pasado-remoto",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: activeRemotePatientivoTarget,
        }),
        "(kuchi) → kuchka → patientivo · imperfectivo → -t → kuchkat"
    );
    const activeRemotePatientivoStations = ctx.getNawatRouteStationModels(activeRemotePatientivoRoute, {
        sourceVerb: "(kuchi)",
        routeTarget: activeRemotePatientivoTarget,
    });
    s.eq(
        "active pasado remoto V→S station model keeps patientivo branch imperfective",
        activeRemotePatientivoStations.find((station) => station.key === "patientivo-branch")?.patientivoSource,
        "imperfectivo"
    );
    const puluaVerbNounRouteExpectations = [
        ["", "pulut"],
        ["ta", "tapulut"],
    ];
    puluaVerbNounRouteExpectations.forEach(([sourceObjectPrefix, expectedSurface]) => {
        const routeKey = ctx.resolveNawatVerbNounConversionRouteKeyForSource({
            sourceTenseValue: "presente",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
        });
        const routeProfile = ctx.getNawatRouteProfile(routeKey);
        const routeTarget = ctx.resolveNawatRouteTarget(routeProfile, {
            sourceVerb: "(pulua)",
            sourceObjectPrefix,
            sourceTenseValue: "presente",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
        });
        s.eq(
            `pulua active present V→S strips final -a before patientivo -t${sourceObjectPrefix ? " with object prefix" : ""}`,
            ctx.getNawatRouteFiniteSurfaceForm(routeProfile, {
                sourceVerb: "(pulua)",
                sourceObjectPrefix,
                routeTarget,
            }),
            expectedSurface
        );
    });
    const puluaNonactivePatientivoRoute = ctx.getNawatRouteProfile("patientivo-nonactive-t");
    const puluaNonactivePatientivoTarget = ctx.resolveNawatRouteTarget(puluaNonactivePatientivoRoute, {
        sourceVerb: "(pulua)",
        sourceTenseValue: "presente",
        sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
    });
    s.eq(
        "pulua nonactive V→S deletes -lu before core patientivo nominal family",
        ctx.getNawatRouteFiniteSurfaceForm(puluaNonactivePatientivoRoute, {
            sourceVerb: "(pulua)",
            routeTarget: puluaNonactivePatientivoTarget,
        }),
        "pulul"
    );
    const nonactiveHabitualRoute = ctx.getNawatRouteProfile("nonactive-habitual-potential");
    const nonactiveHabitualTarget = ctx.resolveNawatRouteTarget(nonactiveHabitualRoute, { sourceVerb: "(pusuni)" });
    const nonactiveHabitualStations = ctx.getNawatRouteStationModels(nonactiveHabitualRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: nonactiveHabitualTarget,
    });
    s.eq(
        "nonactive habitual route is verb to verb",
        ctx.formatNawatRouteConversionLabel(nonactiveHabitualRoute, false),
        "Verbo -> Verbo"
    );
    s.eq(
        "nonactive habitual route exposes a nonactive switch station",
        nonactiveHabitualStations.map((station) => station.key),
        ["source-mode", "source-tense", "nonactive-switch", "target-mode", "finite-tense"]
    );
    s.eq(
        "nonactive habitual route lands in ordinary verb habitual",
        ctx.formatNawatRouteSurfaceTrailLabel(nonactiveHabitualRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: nonactiveHabitualTarget,
            stationModels: nonactiveHabitualStations,
        }),
        "(pusuni) → no activo → pusuniwani"
    );
    s.eq("legacy helper resolves future nawat route id", ctx.getLegacyTenseForNawatRoute("denominal-vi-ti-perfect"), "adjetivo-perfecto-tik");
    s.eq(
        "future nawat route exposes train-station values",
        ctx.getNawatRouteStationList("denominal-vi-ti-preterit").map((station) => station.value),
        ["[noun/inc.root]", "-ti", "preterit", "-tik"]
    );
    const routeRestore = {
        tenseMode: ctx.getActiveTenseMode(),
        europeanMode: ctx.getActiveEuropeanTenseMode(),
        nawatMode: ctx.getActiveNawatTenseMode(),
        selection: ctx.getCurrentResolvedConjugationSelectionState(),
        combined: ctx.getCombinedMode(),
        sourceScope: ctx.getVerbSourceScope(),
    };
    ctx.setActiveEuropeanTenseMode(ctx.TENSE_MODE.adjetivo);
    ctx.setActiveNawatTenseMode(ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo);
    s.eq("nawat mode click can render noun output", ctx.getActiveTenseMode(), ctx.TENSE_MODE.sustantivo);
    s.eq("nawat mode click does not move european mode", ctx.getActiveEuropeanTenseMode(), ctx.TENSE_MODE.adjetivo);
    ctx.setActiveEuropeanTenseMode(ctx.TENSE_MODE.verbo);
    s.eq("european mode click can render verb output", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq(
        "european mode click does not move nawat mode",
        ctx.getActiveNawatTenseModeForCurrentSelection(),
        ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo
    );
    ctx.setActiveTenseMode(ctx.TENSE_MODE.sustantivo);
    ctx.setActiveNawatTenseMode(ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo, { syncOutput: false });
    ctx.setActiveNawatRouteProfile("denominal-vt-na-preterit");
    s.eq("direct nawat route state is not marked as chip travel", ctx.getActiveNawatRouteProfile().activeRouteTravelSource, "");
    s.eq(
        "embedded nawat route stays anchored in sustantivo mode",
        ctx.getActiveNawatTenseModeForCurrentSelection(),
        ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo
    );
    ctx.clearActiveNawatRouteProfile();
    ctx.setActiveTenseMode(routeRestore.tenseMode);
    ctx.applyResolvedConjugationSelectionState(routeRestore.selection);
    const activatedNawatRoute = ctx.activateNawatRouteProfile("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq("nawat route activation starts from canonical route id", activatedNawatRoute.id, "denominal-vi-ti-preterit");
    s.eq("nawat route activation stores canonical route state", ctx.getActiveNawatRouteProfile().id, "denominal-vi-ti-preterit");
    s.eq("nawat route activation is marked as chip travel", ctx.getActiveNawatRouteProfile().activeRouteTravelSource, "chip");
    s.eq("nawat route activation verbalizes before reaching verb convention", activatedNawatRoute.targetVerb, "pusukti");
    s.eq("nawat route activation goes to verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route activation selects ordinary preterite", ctx.getSelectedTenseTab(), "preterito");
    s.eq("nawat route activation stores finite station", ctx.getActiveNawatRouteProfile().activeStationKey, "finite-tense");
    s.eq("nawat route activation makes target verb available as entrada", ctx.getActiveNawatRouteProfile().activeStationInput, "(pusukti)");
    s.eq("active nawat mode remains verb for denominal route", ctx.getActiveNawatTenseModeForCurrentSelection(), "verbo");
    const returnedNawatRoute = ctx.activateNawatRouteOrigin("denominal-vi-ti-preterit");
    s.eq("nawat route can travel back to source convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route can travel back to source station", ctx.getSelectedTenseTab(), "presente");
    s.eq("nawat route keeps target verb after traveling back", returnedNawatRoute.targetVerb, "pusukti");
    s.eq("nawat route remains selected after traveling back", ctx.getActiveNawatRouteProfile().id, "denominal-vi-ti-preterit");
    s.eq("nawat route stores source station after traveling back", ctx.getActiveNawatRouteProfile().activeStationKey, "source-mode");
    s.eq("nawat route restores source entrada after traveling back", ctx.getActiveNawatRouteProfile().activeStationInput, "(pusuni)");
    const stemNawatRoute = ctx.activateNawatRouteStation("denominal-vi-ti-preterit", "stem");
    s.eq("nawat route can travel to stem station", stemNawatRoute.activeStationKey, "stem");
    s.eq("nawat route stem station goes to noun convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.sustantivo);
    s.eq("nawat route stem station selects patientivo", ctx.getSelectedTenseTab(), "patientivo");
    s.eq("nawat route stem station changes entrada to the stem", stemNawatRoute.activeStationInput, "pusuk");
    const verbalizerNawatRoute = ctx.activateNawatRouteStation("denominal-vi-ti-preterit", "verbalizer");
    s.eq("nawat route can travel forward from stem to verb station", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route verb station selects present for pusukti", ctx.getSelectedTenseTab(), "presente");
    s.eq("nawat route verb station changes entrada to pusukti", verbalizerNawatRoute.activeStationInput, "(pusukti)");
    const finiteNawatRoute = ctx.activateNawatRouteStation("denominal-vi-ti-preterit", "finite-tense");
    s.eq("nawat route finite surface station stays in verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nawat route finite surface station selects preterite for pusuktik", ctx.getSelectedTenseTab(), "preterito");
    s.eq("nawat route finite surface station keeps pusukti as entrada", finiteNawatRoute.activeStationInput, "(pusukti)");
    const restoredAfterStemForwardRoute = ctx.activateNawatRouteOrigin("denominal-vi-ti-preterit");
    s.eq("nawat route preserves original source after stem-to-verb travel", restoredAfterStemForwardRoute.activeStationInput, "(pusuni)");
    const verbalizerNaNawatRoute = ctx.activateNawatRouteStation("denominal-vt-na-preterit", "verbalizer", {
        sourceVerb: "(pusuni)",
    });
    s.eq("nawat -na route station changes entrada to segmented transitive input", verbalizerNaNawatRoute.activeStationInput, "(pusuk)-(na)");
    s.eq("nawat -na route station renders from segmented transitive input", verbalizerNaNawatRoute.activeStationVerb, "(pusuk)-(na)");
    const activatedDirectRoute = ctx.activateNawatRouteProfile("direct-active-preterit", {
        sourceVerb: "(pusuni)",
    });
    s.eq("direct preterit route travels inside verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("direct preterit route selects ordinary preterite", ctx.getSelectedTenseTab(), "preterito");
    s.eq("direct preterit route keeps source entrada", activatedDirectRoute.activeStationInput, "(pusuni)");
    const activatedPatientivoRoute = ctx.activateNawatRouteProfile("patientivo-nonactive-ti", {
        sourceVerb: "(pusuni)",
    });
    s.eq("patientivo nonactive route travels into noun convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.sustantivo);
    s.eq("patientivo nonactive route selects patientivo", ctx.getSelectedTenseTab(), "patientivo");
    s.eq("patientivo nonactive route stores branch state", activatedPatientivoRoute.activePatientivoBranch, "nonactive");
    s.eq("patientivo nonactive route switches combined mode", ctx.getCombinedMode(), ctx.COMBINED_MODE.nonactive);
    const activatedPatientivoPerfectiveRoute = ctx.activateNawatRouteProfile("patientivo-perfective-ti", {
        sourceVerb: "(pusuni)",
    });
    s.eq("patientivo perfective route stores branch state", activatedPatientivoPerfectiveRoute.activePatientivoBranch, "perfectivo");
    s.eq("patientivo perfective route switches back to active combined mode", ctx.getCombinedMode(), ctx.COMBINED_MODE.active);
    const activatedNonactiveHabitualRoute = ctx.activateNawatRouteProfile("nonactive-habitual-potential", {
        sourceVerb: "(pusuni)",
    });
    s.eq("nonactive habitual route travels inside verb convention", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq("nonactive habitual route selects ordinary present habitual", ctx.getSelectedTenseTab(), "presente-habitual");
    s.eq("nonactive habitual route stores nonactive target", activatedNonactiveHabitualRoute.targetCombinedMode, ctx.COMBINED_MODE.nonactive);
    s.eq("nonactive habitual route switches combined mode", ctx.getCombinedMode(), ctx.COMBINED_MODE.nonactive);
    ctx.setCombinedMode(routeRestore.combined);
    ctx.setVerbSourceScope(routeRestore.sourceScope, { syncCombinedMode: false });
    ctx.setActiveEuropeanTenseMode(routeRestore.europeanMode, { syncOutput: false });
    ctx.setActiveNawatTenseMode(routeRestore.nawatMode, { syncOutput: false });
    ctx.setActiveTenseMode(routeRestore.tenseMode, { syncConventionState: false });
    ctx.applyResolvedConjugationSelectionState(routeRestore.selection);

    // getToggleLockStateKey — pure string key normalization
    s.eq("key: empty → empty", ctx.getToggleLockStateKey(""), "");
    s.eq("key: short key (< 3 parts) returned unchanged", ctx.getToggleLockStateKey("nemi|t"), "nemi|t");
    s.eq("key: 3-part key strips tense segment", ctx.getToggleLockStateKey("nemi|present|sg"), "nemi|sg");
    s.eq("key: 4-part key with nonactive strips both tense segments", ctx.getToggleLockStateKey("nemi|nonactive|past|t"), "nemi|t");
    s.eq("key: 3-part key, nonactive at tenseIndex+1 yields stem only", ctx.getToggleLockStateKey("ki|nonactive|t"), "ki");

    const sourceScopeBeforeLock = ctx.getVerbSourceScope();
    const combinedModeBeforeLock = ctx.getCombinedMode();
    ctx.setVerbSourceScope(ctx.VERB_SOURCE_SCOPE.active);
    ctx.setToggleLockEnabled(true, { persist: false, refreshUi: false });
    ctx.setCombinedMode(ctx.COMBINED_MODE.nonactive);
    s.eq(
        "toggle lock pins ACT source scope through combined-mode changes",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.active
    );
    ctx.setVerbSourceScope(ctx.VERB_SOURCE_SCOPE.nonactive, { syncCombinedMode: false });
    s.eq(
        "toggle lock ignores automatic source scope restores",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.active
    );
    ctx.setVerbSourceScope(ctx.VERB_SOURCE_SCOPE.nonactive, { syncLock: true, respectLock: false });
    s.eq(
        "manual source scope selection updates the locked choice",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.nonactive
    );
    ctx.setToggleLockEnabled(false, { resetToDefaults: true, persist: false, refreshUi: false });
    s.eq(
        "unlocking the toggle lock resets source scope to TODOS",
        ctx.getVerbSourceScope(),
        ctx.VERB_SOURCE_SCOPE.both
    );
    ctx.setCombinedMode(combinedModeBeforeLock);
    ctx.setVerbSourceScope(sourceScopeBeforeLock, {
        syncCombinedMode: false,
        syncLock: false,
        respectLock: false,
    });

    // getToggleStateValue — reads from an arbitrary Map
    const m1 = new Map([["a|b", "val1"]]);
    s.eq("getToggleStateValue: existing key returns value", ctx.getToggleStateValue(m1, "a|b"), "val1");
    s.eq("getToggleStateValue: missing key returns undefined", ctx.getToggleStateValue(m1, "missing"), undefined);
    s.eq("getToggleStateValue: missing key with fallback", ctx.getToggleStateValue(m1, "missing", "fb"), "fb");
    s.eq("getToggleStateValue: null map returns fallback", ctx.getToggleStateValue(null, "k", "fb"), "fb");
    s.eq("getToggleStateValue: empty stateKey returns fallback", ctx.getToggleStateValue(m1, "", "fb"), "fb");

    // setToggleStateValue — writes to map, no lock sync
    const m2 = new Map();
    ctx.setToggleStateValue(m2, "x|y", "hello");
    s.eq("setToggleStateValue: value written to map", ctx.getToggleStateValue(m2, "x|y"), "hello");
    ctx.setToggleStateValue(m2, "x|y", "world");
    s.eq("setToggleStateValue: overwrites existing value", ctx.getToggleStateValue(m2, "x|y"), "world");
    ctx.setToggleStateValue(null, "x|y", "ignored"); // should not throw
    s.ok("setToggleStateValue: null map is a no-op (no throw)", true);

    // applyDefaultToggleStateOnce — applies only the first time for a given verbKey+stateKey pair
    const m3 = new Map();
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbA", "ki");
    s.eq("applyDefaultToggleStateOnce: first call sets value", ctx.getToggleStateValue(m3, "slot|sg"), "ki");
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbA", "kin");
    s.eq("applyDefaultToggleStateOnce: second call with same verbKey is ignored", ctx.getToggleStateValue(m3, "slot|sg"), "ki");
    ctx.applyDefaultToggleStateOnce(m3, "slot|sg", "verbB", "kin");
    s.eq("applyDefaultToggleStateOnce: different verbKey can overwrite", ctx.getToggleStateValue(m3, "slot|sg"), "kin");

    s.eq(
        "reduplicated distributive keeps existing 1pl prefix",
        ctx.reduplicateConjugationDisplay("tichipaknaj", { prefixChain: "ti" }),
        "tichijchipaknaj"
    );
    s.eq(
        "reduplicated distributive can restore omitted 1pl prefix",
        ctx.reduplicateConjugationDisplay("chipaknaj", {
            prefixChain: "ti",
            applyMissingPrefixChain: true,
        }),
        "tichijchipaknaj"
    );
    const reduplicatedResult = ctx.buildReduplicatedConjugationResult({
        result: "tichipaknaj",
        surfaceForms: ["tichipaknaj"],
    }, { prefixChain: "ti" });
    s.eq("reduplicated result updates display string", reduplicatedResult.result, "tichijchipaknaj");
    s.eq("reduplicated result updates surface forms", reduplicatedResult.surfaceForms, ["tichijchipaknaj"]);

    return s;
}

module.exports = { run };
