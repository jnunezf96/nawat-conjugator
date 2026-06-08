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
    const summarizeDenominalFamilyProfile = (profile) => profile && ({
        version: profile.version,
        curriculumRef: profile.curriculumRef,
        outputKind: profile.outputKind,
        routeFamily: profile.routeFamily,
        structuralAnalogue: profile.structuralAnalogue,
        routeId: profile.routeId,
        routeProfileSource: profile.routeProfileSource,
        sourceState: profile.sourceState,
        sourceSlot: profile.sourceSlot,
        sourceCategory: profile.sourceCategory,
        sourceSurface: profile.sourceSurface,
        verbalizer: profile.verbalizer,
        verbalizerType: profile.verbalizerType,
        valency: profile.valency,
        targetTense: profile.targetTense,
        surfaceSuffix: profile.surfaceSuffix,
        supportStatus: profile.supportStatus,
        isCompleteLesson54_55: profile.isCompleteLesson54_55,
        boundaries: profile.boundaries,
    });
    const summarizeDenominalFamilyInventory = (entries) => Array.isArray(entries)
        ? entries.map((entry) => ({
            outputKind: entry.outputKind,
            routeFamily: entry.routeFamily,
            structuralAnalogue: entry.structuralAnalogue,
            verbalizer: entry.verbalizer,
            verbalizerType: entry.verbalizerType,
            valency: entry.valency,
            routePlacement: entry.routePlacement,
            routeProfileSource: entry.routeProfileSource,
            routeIds: entry.routeIds,
            targetTenses: entry.targetTenses,
            surfaceSuffixes: entry.surfaceSuffixes,
            sourceSlots: entry.sourceSlots,
            supportStatus: entry.supportStatus,
            isCompleteLesson54_55: entry.isCompleteLesson54_55,
            noNewSurfaceForms: entry.boundaries?.noNewSurfaceForms === true,
        }))
        : [];
    const summarizeDenominalRoutePreview = (preview) => preview && ({
        outputKind: preview.outputKind,
        sourceVerb: preview.sourceVerb,
        supportStatus: preview.supportStatus,
        isCompleteLesson54_55: preview.isCompleteLesson54_55,
        familyCount: Array.isArray(preview.families) ? preview.families.length : 0,
        routeSurfaces: Array.isArray(preview.routes)
            ? preview.routes.map((route) => ({
                routeId: route.routeId,
                routeFamily: route.routeFamily,
                routeProfileSource: route.routeProfileSource,
                sourceSurface: route.sourceSurface,
                targetVerb: route.targetVerb,
                targetTense: route.targetTense,
                surface: route.surface,
                surfaceTrail: route.surfaceTrail,
                stageCount: Array.isArray(route.stages) ? route.stages.length : 0,
                reusableStageCount: Array.isArray(route.stages)
                    ? route.stages.filter((stage) => stage.nextSource?.canBecomeSource === true).length
                    : 0,
                profileSource: route.denominalFamilyProfile?.routeProfileSource || "",
                noNewSurfaceForms: route.denominalFamilyProfile?.boundaries?.noNewSurfaceForms === true,
            }))
            : [],
        firstRouteStages: Array.isArray(preview.routes?.[0]?.stages)
            ? preview.routes[0].stages.map((stage) => ({
                key: stage.key,
                surface: stage.surface,
                sourceVerb: stage.nextSource?.sourceVerb || "",
                routeSourceVerb: stage.routeContext?.sourceVerb || "",
                routeTargetVerb: stage.routeContext?.targetVerb || "",
                mode: stage.nextSource?.mode || "",
                tenseValue: stage.nextSource?.tenseValue || "",
                canBecomeSource: stage.nextSource?.canBecomeSource === true,
            }))
            : [],
        transitiveRouteStages: Array.isArray(preview.routes)
            ? (preview.routes.find((route) => route.routeId === "denominal-vt-na-preterit")?.stages || []).map((stage) => ({
                key: stage.key,
                surface: stage.surface,
                sourceVerb: stage.nextSource?.sourceVerb || "",
                routeSourceVerb: stage.routeContext?.sourceVerb || "",
                routeTargetVerb: stage.routeContext?.targetVerb || "",
                objectPrefix: stage.nextSource?.objectPrefix || "",
                mode: stage.nextSource?.mode || "",
                tenseValue: stage.nextSource?.tenseValue || "",
                canBecomeSource: stage.nextSource?.canBecomeSource === true,
            }))
            : [],
        noNewSurfaceForms: preview.boundaries?.noNewSurfaceForms === true,
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
            typeof ctx.getCurrentNuclearClauseShell,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function"]
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
        "orthography bridge status is diagnostic and non-generative",
        ["nemi", "quetza", "xochitl"].map((value) => {
            const status = ctx.getOrthographyBridgeStatusInfo(value);
            return status && {
                severity: status.severity,
                message: status.message,
                correspondenceIds: status.correspondenceIds,
                blocked: status.blocked,
                generationAllowed: status.generationAllowed,
            };
        }),
        [
            null,
            {
                severity: "info",
                message: "Ortografia: correspondencia candidata; requiere evidencia Nawat/Pipil.",
                correspondenceIds: ["same-tz", "qu-k"],
                blocked: [],
                generationAllowed: false,
            },
            {
                severity: "warning",
                message: "Ortografia: correspondencia bloqueada; no genera formas.",
                correspondenceIds: ["same-ch", "x-sh", "o-u", "tl"],
                blocked: ["o-u", "tl"],
                generationAllowed: false,
            },
        ]
    );
    const currentShell = ctx.getCurrentNuclearClauseShell();
    s.eq(
        "current UI exposes a diagnostic nuclear-clause shell",
        {
            kind: currentShell?.kind,
            clauseKind: currentShell?.clauseKind,
            generationAllowed: currentShell?.generationAllowed,
        },
        {
            kind: "nuclear-clause-shell",
            clauseKind: "verbal-nuclear-clause",
            generationAllowed: false,
        }
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
    setOrdinaryNncGenerationState({
        state: "possessive",
        number: "singular",
        possessor: "nu",
        nounClass: "",
        animacy: "",
    });
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
            animacy: "",
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
                animacy: "",
            },
        }
    );
    setOrdinaryNncGenerationState({
        state: "absolutive",
        number: "plural",
        possessor: "mu",
        nounClass: "",
        animacy: "",
    });
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
                animacy: "",
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
    s.eq("future nawat route keeps configured denominal family", tiPreteritRoute.denominalFamily, "vi-ti");
    s.eq("future nawat route keeps configured structural analogue", tiPreteritRoute.structuralAnalogue, "inceptive-stative-ti-route");
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
    const tiPreteritSourceState = ctx.resolveNawatRouteSourceStateMetadata("denominal-vi-ti-preterit", {
        sourceVerb: "(pusuni)",
        routeTarget: tiPreteritTarget,
        stationModels: tiRouteStations,
    });
    s.eq(
        "denominal VI -ti route exposes source-state metadata",
        summarizeRouteSourceState(tiPreteritSourceState),
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
        "denominal VI -ti route classifies current Lesson 54-55 route family without claiming complete coverage",
        summarizeDenominalFamilyProfile(tiPreteritSourceState.denominalFamilyProfile),
        {
            version: 1,
            curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
            outputKind: "denominal-route",
            routeFamily: "vi-ti",
            structuralAnalogue: "inceptive-stative-ti-route",
            routeId: "denominal-vi-ti-preterit",
            routeProfileSource: "static-modes",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.root",
            sourceCategory: "noun-or-incorporated-root",
            sourceSurface: "pusuk",
            verbalizer: "-ti",
            verbalizerType: "denominal-intransitive",
            valency: "intransitive",
            targetTense: "preterito",
            surfaceSuffix: "-tik",
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
    const naPreteritSourceState = ctx.resolveNawatRouteSourceStateMetadata("denominal-vt-na-preterit", {
        sourceVerb: "(pusuni)",
        routeTarget: naPreteritTarget,
        stationModels: naRouteStations,
    });
    s.eq(
        "denominal VT -na route exposes source-state metadata",
        summarizeRouteSourceState(naPreteritSourceState),
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
        "denominal VT -na route classifies current transitive denominal route family",
        summarizeDenominalFamilyProfile(naPreteritSourceState.denominalFamilyProfile),
        {
            version: 1,
            curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
            outputKind: "denominal-route",
            routeFamily: "vt-na",
            structuralAnalogue: "transitive-denominal-route",
            routeId: "denominal-vt-na-preterit",
            routeProfileSource: "static-modes",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.obj.",
            sourceCategory: "noun-or-incorporated-object",
            sourceSurface: "pusuk",
            verbalizer: "-na",
            verbalizerType: "denominal-transitive",
            valency: "transitive",
            targetTense: "preterito",
            surfaceSuffix: "-naj",
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
    const iwiPreteritSourceState = ctx.resolveNawatRouteSourceStateMetadata("denominal-vi-iwi-preterit", {
        sourceVerb: "(pusuni)",
        routeTarget: iwiPreteritTarget,
        stationModels: iwiPreteritStations,
    });
    s.eq(
        "denominal VI -iwi route exposes source-state metadata",
        summarizeRouteSourceState(iwiPreteritSourceState),
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
        "denominal VI -iwi route classifies current wi-family analogue without adding surfaces",
        summarizeDenominalFamilyProfile(iwiPreteritSourceState.denominalFamilyProfile),
        {
            version: 1,
            curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
            outputKind: "denominal-route",
            routeFamily: "vi-iwi",
            structuralAnalogue: "inceptive-stative-wi-route",
            routeId: "denominal-vi-iwi-preterit",
            routeProfileSource: "static-modes",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.root",
            sourceCategory: "noun-or-incorporated-root",
            sourceSurface: "pusuk",
            verbalizer: "-iwi",
            verbalizerType: "denominal-intransitive",
            valency: "intransitive",
            targetTense: "preterito",
            surfaceSuffix: "-iwik",
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
    s.eq(
        "denominal VI -awi route classifies current wi-family analogue without adding surfaces",
        summarizeDenominalFamilyProfile(ctx.resolveNawatRouteSourceStateMetadata("denominal-vi-awi-preterit", {
            sourceVerb: "(pusuni)",
            routeTarget: awiPreteritTarget,
        }).denominalFamilyProfile),
        {
            version: 1,
            curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
            outputKind: "denominal-route",
            routeFamily: "vi-awi",
            structuralAnalogue: "inceptive-stative-wi-route",
            routeId: "denominal-vi-awi-preterit",
            routeProfileSource: "static-modes",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.root",
            sourceCategory: "noun-or-incorporated-root",
            sourceSurface: "pusuk",
            verbalizer: "-awi",
            verbalizerType: "denominal-intransitive",
            valency: "intransitive",
            targetTense: "preterito",
            surfaceSuffix: "-awik",
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
        }
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
        "Lessons 54-55 route-family inventory is data-driven and partial",
        summarizeDenominalFamilyInventory(ctx.getNawatDenominalRouteFamilyInventory()),
        [
            {
                outputKind: "denominal-route-family-inventory",
                routeFamily: "vi-ti",
                structuralAnalogue: "inceptive-stative-ti-route",
                verbalizer: "-ti",
                verbalizerType: "denominal-intransitive",
                valency: "intransitive",
                routePlacement: "patientivo-tronco-conversion",
                routeProfileSource: "static-modes",
                routeIds: ["denominal-vi-ti-preterit", "denominal-vi-ti-perfect"],
                targetTenses: ["preterito", "perfecto"],
                surfaceSuffixes: ["-tik", "-tituk"],
                sourceSlots: ["noun/inc.root"],
                supportStatus: "current-route-supported-partial",
                isCompleteLesson54_55: false,
                noNewSurfaceForms: true,
            },
            {
                outputKind: "denominal-route-family-inventory",
                routeFamily: "vi-iwi",
                structuralAnalogue: "inceptive-stative-wi-route",
                verbalizer: "-iwi",
                verbalizerType: "denominal-intransitive",
                valency: "intransitive",
                routePlacement: "patientivo-tronco-conversion",
                routeProfileSource: "static-modes",
                routeIds: ["denominal-vi-iwi-preterit", "denominal-vi-iwi-perfect"],
                targetTenses: ["preterito", "perfecto"],
                surfaceSuffixes: ["-iwik", "-iwtuk/-ijtuk"],
                sourceSlots: ["noun/inc.root"],
                supportStatus: "current-route-supported-partial",
                isCompleteLesson54_55: false,
                noNewSurfaceForms: true,
            },
            {
                outputKind: "denominal-route-family-inventory",
                routeFamily: "vi-awi",
                structuralAnalogue: "inceptive-stative-wi-route",
                verbalizer: "-awi",
                verbalizerType: "denominal-intransitive",
                valency: "intransitive",
                routePlacement: "patientivo-tronco-conversion",
                routeProfileSource: "static-modes",
                routeIds: ["denominal-vi-awi-preterit", "denominal-vi-awi-perfect"],
                targetTenses: ["preterito", "perfecto"],
                surfaceSuffixes: ["-awik", "-awtuk/-ajtuk"],
                sourceSlots: ["noun/inc.root"],
                supportStatus: "current-route-supported-partial",
                isCompleteLesson54_55: false,
                noNewSurfaceForms: true,
            },
            {
                outputKind: "denominal-route-family-inventory",
                routeFamily: "vt-na",
                structuralAnalogue: "transitive-denominal-route",
                verbalizer: "-na",
                verbalizerType: "denominal-transitive",
                valency: "transitive",
                routePlacement: "patientivo-tronco-conversion",
                routeProfileSource: "static-modes",
                routeIds: ["denominal-vt-na-preterit", "denominal-vt-na-perfect"],
                targetTenses: ["preterito", "perfecto"],
                surfaceSuffixes: ["-naj", "-najtuk"],
                sourceSlots: ["noun/inc.obj."],
                supportStatus: "current-route-supported-partial",
                isCompleteLesson54_55: false,
                noNewSurfaceForms: true,
            },
        ]
    );
    const denominalRoutePreview = ctx.generateNawatDenominalRouteFamilyPreview({
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "Lessons 54-55 preview links configured route stages without broadening generation",
        summarizeDenominalRoutePreview(denominalRoutePreview),
        {
            outputKind: "denominal-route-family-preview",
            sourceVerb: "(pusuni)",
            supportStatus: "current-route-supported-partial",
            isCompleteLesson54_55: false,
            familyCount: 4,
            routeSurfaces: [
                {
                    routeId: "denominal-vi-ti-preterit",
                    routeFamily: "vi-ti",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukti",
                    targetTense: "preterito",
                    surface: "pusuktik",
                    surfaceTrail: "(pusuni) → pusuk → (pusukti) → pusuktik",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
                {
                    routeId: "denominal-vi-ti-perfect",
                    routeFamily: "vi-ti",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukti",
                    targetTense: "perfecto",
                    surface: "pusuktituk",
                    surfaceTrail: "(pusuni) → pusuk → (pusukti) → pusuktituk",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
                {
                    routeId: "denominal-vi-iwi-preterit",
                    routeFamily: "vi-iwi",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukiwi",
                    targetTense: "preterito",
                    surface: "pusukiwik",
                    surfaceTrail: "(pusuni) → pusuk → (pusukiwi) → pusukiwik",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
                {
                    routeId: "denominal-vi-iwi-perfect",
                    routeFamily: "vi-iwi",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukiwi",
                    targetTense: "perfecto",
                    surface: "pusukiwtuk",
                    surfaceTrail: "(pusuni) → pusuk → (pusukiwi) → pusukiwtuk",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
                {
                    routeId: "denominal-vi-awi-preterit",
                    routeFamily: "vi-awi",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukawi",
                    targetTense: "preterito",
                    surface: "pusukawik",
                    surfaceTrail: "(pusuni) → pusuk → (pusukawi) → pusukawik",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
                {
                    routeId: "denominal-vi-awi-perfect",
                    routeFamily: "vi-awi",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukawi",
                    targetTense: "perfecto",
                    surface: "pusukawtuk",
                    surfaceTrail: "(pusuni) → pusuk → (pusukawi) → pusukawtuk",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
                {
                    routeId: "denominal-vt-na-preterit",
                    routeFamily: "vt-na",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukna",
                    targetTense: "preterito",
                    surface: "pusuknaj",
                    surfaceTrail: "(pusuni) → pusuk → (pusuk)-(na) → pusuknaj",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
                {
                    routeId: "denominal-vt-na-perfect",
                    routeFamily: "vt-na",
                    routeProfileSource: "static-modes",
                    sourceSurface: "pusuk",
                    targetVerb: "pusukna",
                    targetTense: "perfecto",
                    surface: "pusuknajtuk",
                    surfaceTrail: "(pusuni) → pusuk → (pusuk)-(na) → pusuknajtuk",
                    stageCount: 4,
                    reusableStageCount: 4,
                    profileSource: "static-modes",
                    noNewSurfaceForms: true,
                },
            ],
            firstRouteStages: [
                {
                    key: "source-mode",
                    surface: "(pusuni)",
                    sourceVerb: "(pusuni)",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukti",
                    mode: "verbo",
                    tenseValue: "presente",
                    canBecomeSource: true,
                },
                {
                    key: "stem",
                    surface: "pusuk",
                    sourceVerb: "pusuk",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukti",
                    mode: "sustantivo",
                    tenseValue: "patientivo",
                    canBecomeSource: true,
                },
                {
                    key: "verbalizer",
                    surface: "(pusukti)",
                    sourceVerb: "(pusukti)",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukti",
                    mode: "verbo",
                    tenseValue: "presente",
                    canBecomeSource: true,
                },
                {
                    key: "finite-surface",
                    surface: "pusuktik",
                    sourceVerb: "(pusukti)",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukti",
                    mode: "verbo",
                    tenseValue: "preterito",
                    canBecomeSource: true,
                },
            ],
            transitiveRouteStages: [
                {
                    key: "source-mode",
                    surface: "(pusuni)",
                    sourceVerb: "(pusuni)",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukna",
                    objectPrefix: "",
                    mode: "verbo",
                    tenseValue: "presente",
                    canBecomeSource: true,
                },
                {
                    key: "stem",
                    surface: "pusuk",
                    sourceVerb: "pusuk",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukna",
                    objectPrefix: "",
                    mode: "sustantivo",
                    tenseValue: "patientivo",
                    canBecomeSource: true,
                },
                {
                    key: "verbalizer",
                    surface: "(pusuk)-(na)",
                    sourceVerb: "(pusuk)-(na)",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukna",
                    objectPrefix: "",
                    mode: "verbo",
                    tenseValue: "presente",
                    canBecomeSource: true,
                },
                {
                    key: "finite-surface",
                    surface: "pusuknaj",
                    sourceVerb: "(pusuk)-(na)",
                    routeSourceVerb: "(pusuni)",
                    routeTargetVerb: "pusukna",
                    objectPrefix: "",
                    mode: "verbo",
                    tenseValue: "preterito",
                    canBecomeSource: true,
                },
            ],
            noNewSurfaceForms: true,
        }
    );
    const viTiFiniteStageRequest = ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest(
        denominalRoutePreview.routes[0].stages.find((stage) => stage.key === "finite-surface")
    );
    const viTiFiniteStageResult = ctx.executeNawatLinkedGrammarPathStage(
        denominalRoutePreview.routes[0].stages.find((stage) => stage.key === "finite-surface")
    );
    const summarizeLinkedNextSourcePreview = (preview) => preview && ({
        outputKind: preview.outputKind,
        selectedStage: preview.selectedStage,
        nextSource: preview.nextSource,
        routeContext: preview.routeContext && {
            routeId: preview.routeContext.routeId,
            sourceVerb: preview.routeContext.sourceVerb,
            targetVerb: preview.routeContext.targetVerb,
        },
        previewSourceVerb: preview.routePreview?.sourceVerb || "",
        candidateRouteCount: preview.candidateRouteCount,
        firstCandidate: Array.isArray(preview.routePreview?.routes)
            ? {
                routeId: preview.routePreview.routes[0]?.routeId || "",
                sourceVerb: preview.routePreview.routes[0]?.sourceVerb || "",
                targetVerb: preview.routePreview.routes[0]?.targetVerb || "",
                surface: preview.routePreview.routes[0]?.surface || "",
                surfaceTrail: preview.routePreview.routes[0]?.surfaceTrail || "",
            }
            : null,
        noNewRouteFamilies: preview.boundaries?.noNewRouteFamilies === true,
        noNewSurfaceRules: preview.boundaries?.noNewSurfaceRules === true,
        doesNotMutateState: preview.boundaries?.doesNotMutateState === true,
    });
    const viTiVerbalizerNextPreview = ctx.previewNawatLinkedGrammarPathNextSource(
        denominalRoutePreview.routes[0].stages.find((stage) => stage.key === "verbalizer")
    );
    s.eq(
        "linked denominal stage previews candidate routes for the next source without mutation",
        summarizeLinkedNextSourcePreview(viTiVerbalizerNextPreview),
        {
            outputKind: "linked-grammar-path-next-source-preview",
            selectedStage: {
                routeId: "denominal-vi-ti-preterit",
                stationKey: "verbalizer",
                sourceVerb: "(pusukti)",
                displaySurface: "(pusukti)",
                mode: "verbo",
                tenseValue: "presente",
                objectPrefix: "",
                combinedMode: "active",
                derivationMode: "active",
                voiceMode: "active",
                sourceScope: "active",
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusukti)",
                displaySurface: "(pusukti)",
                mode: "verbo",
                tenseValue: "presente",
                objectPrefix: "",
            },
            routeContext: {
                routeId: "denominal-vi-ti-preterit",
                sourceVerb: "(pusuni)",
                targetVerb: "pusukti",
            },
            previewSourceVerb: "(pusukti)",
            candidateRouteCount: 8,
            firstCandidate: {
                routeId: "denominal-vi-ti-preterit",
                sourceVerb: "(pusukti)",
                targetVerb: "pusukti",
                surface: "pusuktik",
                surfaceTrail: "(pusukti) → pusuk → pusuktik",
            },
            noNewRouteFamilies: true,
            noNewSurfaceRules: true,
            doesNotMutateState: true,
        }
    );
    const summarizeLinkedPathChainPreview = (preview) => preview && ({
        outputKind: preview.outputKind,
        initialSource: preview.initialSource,
        requestedSelectionCount: preview.requestedSelectionCount,
        steps: Array.isArray(preview.steps)
            ? preview.steps.map((step) => ({
                index: step.index,
                status: step.status,
                selection: step.selection,
                route: step.route,
                selectedStage: step.selectedStage,
                nextSource: step.nextSource,
                routeContext: step.routeContext && {
                    routeId: step.routeContext.routeId,
                    sourceVerb: step.routeContext.sourceVerb,
                    targetVerb: step.routeContext.targetVerb,
                },
                candidateRouteCount: step.candidateRouteCount,
                firstCandidateRouteId: step.candidateRouteIds?.[0] || "",
            }))
            : [],
        stoppedReason: preview.stoppedReason,
        currentSourceVerb: preview.currentPreview?.sourceVerb || "",
        candidateRouteCount: preview.candidateRouteCount,
        firstCurrentCandidate: Array.isArray(preview.currentPreview?.routes)
            ? {
                routeId: preview.currentPreview.routes[0]?.routeId || "",
                targetVerb: preview.currentPreview.routes[0]?.targetVerb || "",
                surface: preview.currentPreview.routes[0]?.surface || "",
                surfaceTrail: preview.currentPreview.routes[0]?.surfaceTrail || "",
            }
            : null,
        noNewRouteFamilies: preview.boundaries?.noNewRouteFamilies === true,
        noNewSurfaceRules: preview.boundaries?.noNewSurfaceRules === true,
        doesNotExecuteStages: preview.boundaries?.doesNotExecuteStages === true,
        doesNotMutateState: preview.boundaries?.doesNotMutateState === true,
    });
    s.eq(
        "linked grammar path chain composes selected stages as next sources",
        summarizeLinkedPathChainPreview(ctx.previewNawatLinkedGrammarPathChain({
            sourceVerb: "(pusuni)",
            selections: [
                { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
                { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" },
            ],
        })),
        {
            outputKind: "linked-grammar-path-chain-preview",
            initialSource: {
                sourceVerb: "(pusuni)",
                sourceObjectPrefix: "",
            },
            requestedSelectionCount: 2,
            steps: [
                {
                    index: 0,
                    status: "linked",
                    selection: {
                        routeId: "denominal-vi-ti-preterit",
                        stageKey: "verbalizer",
                    },
                    route: {
                        routeId: "denominal-vi-ti-preterit",
                        routeFamily: "vi-ti",
                        targetVerb: "pusukti",
                        surface: "pusuktik",
                        surfaceTrail: "(pusuni) → pusuk → (pusukti) → pusuktik",
                    },
                    selectedStage: {
                        routeId: "denominal-vi-ti-preterit",
                        stationKey: "verbalizer",
                        sourceVerb: "(pusukti)",
                        displaySurface: "(pusukti)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                        combinedMode: "active",
                        derivationMode: "active",
                        voiceMode: "active",
                        sourceScope: "active",
                    },
                    nextSource: {
                        canBecomeSource: true,
                        sourceVerb: "(pusukti)",
                        displaySurface: "(pusukti)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                    },
                    routeContext: {
                        routeId: "denominal-vi-ti-preterit",
                        sourceVerb: "(pusuni)",
                        targetVerb: "pusukti",
                    },
                    candidateRouteCount: 8,
                    firstCandidateRouteId: "denominal-vi-ti-preterit",
                },
                {
                    index: 1,
                    status: "linked",
                    selection: {
                        routeId: "denominal-vi-iwi-preterit",
                        stageKey: "verbalizer",
                    },
                    route: {
                        routeId: "denominal-vi-iwi-preterit",
                        routeFamily: "vi-iwi",
                        targetVerb: "pusuktiiwi",
                        surface: "pusuktiiwik",
                        surfaceTrail: "(pusukti) → pusukti → (pusuktiiwi) → pusuktiiwik",
                    },
                    selectedStage: {
                        routeId: "denominal-vi-iwi-preterit",
                        stationKey: "verbalizer",
                        sourceVerb: "(pusuktiiwi)",
                        displaySurface: "(pusuktiiwi)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                        combinedMode: "active",
                        derivationMode: "active",
                        voiceMode: "active",
                        sourceScope: "active",
                    },
                    nextSource: {
                        canBecomeSource: true,
                        sourceVerb: "(pusuktiiwi)",
                        displaySurface: "(pusuktiiwi)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                    },
                    routeContext: {
                        routeId: "denominal-vi-iwi-preterit",
                        sourceVerb: "(pusukti)",
                        targetVerb: "pusuktiiwi",
                    },
                    candidateRouteCount: 8,
                    firstCandidateRouteId: "denominal-vi-ti-preterit",
                },
            ],
            stoppedReason: "",
            currentSourceVerb: "(pusuktiiwi)",
            candidateRouteCount: 8,
            firstCurrentCandidate: {
                routeId: "denominal-vi-ti-preterit",
                targetVerb: "pusuktiiwiti",
                surface: "pusuktiiwik",
                surfaceTrail: "(pusuktiiwi) → pusuktiiwi → (pusuktiiwiti) → pusuktiiwik",
            },
            noNewRouteFamilies: true,
            noNewSurfaceRules: true,
            doesNotExecuteStages: true,
            doesNotMutateState: true,
        }
    );
    const summarizeLinkedPathSelectionSummary = (summary) => summary && ({
        outputKind: summary.outputKind,
        initialSource: summary.initialSource,
        currentSource: summary.currentSource,
        requestedSelectionCount: summary.requestedSelectionCount,
        selectedSteps: Array.isArray(summary.selectedSteps)
            ? summary.selectedSteps.map((step) => ({
                index: step.index,
                status: step.status,
                routeId: step.route?.routeId || "",
                stageKey: step.selection?.stageKey || "",
                nextSourceVerb: step.nextSource?.sourceVerb || "",
                candidateRouteCount: step.candidateRouteCount,
            }))
            : [],
        nextRouteCount: Array.isArray(summary.nextRoutes) ? summary.nextRoutes.length : 0,
        firstNextRoute: Array.isArray(summary.nextRoutes)
            ? {
                routeId: summary.nextRoutes[0]?.routeId || "",
                routeFamily: summary.nextRoutes[0]?.routeFamily || "",
                appendableStageCount: summary.nextRoutes[0]?.appendableStageCount || 0,
                firstAppendableSelection: summary.nextRoutes[0]?.appendableStages?.[0]?.selection || null,
                firstAppendableSource: summary.nextRoutes[0]?.appendableStages?.[0]?.sourceVerb || "",
            }
            : null,
        appendableSelectionCount: summary.appendableSelectionCount,
        noNewRouteFamilies: summary.boundaries?.noNewRouteFamilies === true,
        noNewSurfaceRules: summary.boundaries?.noNewSurfaceRules === true,
        doesNotExecuteStages: summary.boundaries?.doesNotExecuteStages === true,
        doesNotMutateState: summary.boundaries?.doesNotMutateState === true,
        summaryOnly: summary.boundaries?.summaryOnly === true,
    });
    const linkedPathSelectionSummary = ctx.buildNawatLinkedGrammarPathSelectionSummary({
        sourceVerb: "(pusuni)",
        selections: [
            { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
            { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" },
        ],
    });
    s.eq(
        "linked grammar path selection summary exposes appendable next-stage choices",
        summarizeLinkedPathSelectionSummary(linkedPathSelectionSummary),
        {
            outputKind: "linked-grammar-path-selection-summary",
            initialSource: {
                sourceVerb: "(pusuni)",
                sourceObjectPrefix: "",
            },
            currentSource: {
                sourceVerb: "(pusuktiiwi)",
                sourceObjectPrefix: "",
            },
            requestedSelectionCount: 2,
            selectedSteps: [
                {
                    index: 0,
                    status: "linked",
                    routeId: "denominal-vi-ti-preterit",
                    stageKey: "verbalizer",
                    nextSourceVerb: "(pusukti)",
                    candidateRouteCount: 8,
                },
                {
                    index: 1,
                    status: "linked",
                    routeId: "denominal-vi-iwi-preterit",
                    stageKey: "verbalizer",
                    nextSourceVerb: "(pusuktiiwi)",
                    candidateRouteCount: 8,
                },
            ],
            nextRouteCount: 8,
            firstNextRoute: {
                routeId: "denominal-vi-ti-preterit",
                routeFamily: "vi-ti",
                appendableStageCount: 4,
                firstAppendableSelection: {
                    routeId: "denominal-vi-ti-preterit",
                    stageKey: "source-mode",
                },
                firstAppendableSource: "(pusuktiiwi)",
            },
            appendableSelectionCount: 32,
            noNewRouteFamilies: true,
            noNewSurfaceRules: true,
            doesNotExecuteStages: true,
            doesNotMutateState: true,
            summaryOnly: true,
        }
    );
    s.eq(
        "linked grammar path selection summary preserves diagnostics for unresolved choices",
        summarizeLinkedPathSelectionSummary(ctx.buildNawatLinkedGrammarPathSelectionSummary({
            sourceVerb: "(pusuni)",
            selections: [
                { routeId: "missing-route", stageKey: "verbalizer" },
            ],
        })),
        {
            outputKind: "linked-grammar-path-selection-summary",
            initialSource: {
                sourceVerb: "(pusuni)",
                sourceObjectPrefix: "",
            },
            currentSource: {
                sourceVerb: "(pusuni)",
                sourceObjectPrefix: "",
            },
            requestedSelectionCount: 1,
            selectedSteps: [
                {
                    index: 0,
                    status: "unresolved-route",
                    routeId: "",
                    stageKey: "verbalizer",
                    nextSourceVerb: "",
                    candidateRouteCount: 0,
                },
            ],
            nextRouteCount: 8,
            firstNextRoute: {
                routeId: "denominal-vi-ti-preterit",
                routeFamily: "vi-ti",
                appendableStageCount: 4,
                firstAppendableSelection: {
                    routeId: "denominal-vi-ti-preterit",
                    stageKey: "source-mode",
                },
                firstAppendableSource: "(pusuni)",
            },
            appendableSelectionCount: 32,
            noNewRouteFamilies: true,
            noNewSurfaceRules: true,
            doesNotExecuteStages: true,
            doesNotMutateState: true,
            summaryOnly: true,
        }
    );
    const summarizeLinkedPathSelectionState = (selectionState) => selectionState && ({
        outputKind: selectionState.outputKind,
        appended: selectionState.appended === true,
        appendedSelection: selectionState.appendedSelection || null,
        activeSelections: selectionState.activeSelections,
        currentSource: selectionState.summary?.currentSource || null,
        appendableSelectionCount: selectionState.summary?.appendableSelectionCount || 0,
        noNewRouteFamilies: selectionState.boundaries?.noNewRouteFamilies === true,
        noNewSurfaceRules: selectionState.boundaries?.noNewSurfaceRules === true,
        doesNotExecuteStages: selectionState.boundaries?.doesNotExecuteStages === true,
        mutatesSelectionStateOnly: selectionState.boundaries?.mutatesSelectionStateOnly === true,
    });
    ctx.clearActiveNawatLinkedGrammarPathSelections();
    ctx.appendActiveNawatLinkedGrammarPathSelection(
        { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
        { sourceVerb: "(pusuni)" }
    );
    const appendedLinkedSelectionState = ctx.appendActiveNawatLinkedGrammarPathSelection(
        { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" }
    );
    s.eq(
        "linked grammar path selection state appends reusable stages without executing them",
        summarizeLinkedPathSelectionState(appendedLinkedSelectionState),
        {
            outputKind: "linked-grammar-path-selection-state",
            appended: true,
            appendedSelection: {
                routeId: "denominal-vi-iwi-preterit",
                stageKey: "verbalizer",
            },
            activeSelections: [
                { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
                { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" },
            ],
            currentSource: {
                sourceVerb: "(pusuktiiwi)",
                sourceObjectPrefix: "",
            },
            appendableSelectionCount: 32,
            noNewRouteFamilies: true,
            noNewSurfaceRules: true,
            doesNotExecuteStages: true,
            mutatesSelectionStateOnly: true,
        }
    );
    s.eq(
        "linked grammar path selection state exposes normalized active selections",
        ctx.getActiveNawatLinkedGrammarPathSelections(),
        [
            { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
            { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" },
        ]
    );
    const backtrackedLinkedSelectionState = ctx.removeLastActiveNawatLinkedGrammarPathSelection();
    s.eq(
        "linked grammar path selection state can backtrack the last selected stage without executing",
        {
            outputKind: backtrackedLinkedSelectionState.outputKind,
            removed: backtrackedLinkedSelectionState.removed,
            removedSelection: backtrackedLinkedSelectionState.removedSelection,
            activeSelections: backtrackedLinkedSelectionState.activeSelections,
            currentSource: backtrackedLinkedSelectionState.summary?.currentSource || null,
            appendableSelectionCount: backtrackedLinkedSelectionState.summary?.appendableSelectionCount || 0,
            backtracksSelectionStateOnly: backtrackedLinkedSelectionState.boundaries?.backtracksSelectionStateOnly === true,
            doesNotExecuteStages: backtrackedLinkedSelectionState.boundaries?.doesNotExecuteStages === true,
        },
        {
            outputKind: "linked-grammar-path-selection-backtrack",
            removed: true,
            removedSelection: {
                routeId: "denominal-vi-iwi-preterit",
                stageKey: "verbalizer",
            },
            activeSelections: [
                { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
            ],
            currentSource: {
                sourceVerb: "(pusukti)",
                sourceObjectPrefix: "",
            },
            appendableSelectionCount: 30,
            backtracksSelectionStateOnly: true,
            doesNotExecuteStages: true,
        }
    );
    s.eq(
        "linked grammar path selection state can be cleared",
        ctx.clearActiveNawatLinkedGrammarPathSelections(),
        []
    );
    const summarizeLinkedPathChainExecution = (execution) => execution && ({
        outputKind: execution.outputKind,
        initialSource: execution.initialSource,
        requestedSelectionCount: execution.requestedSelectionCount,
        steps: Array.isArray(execution.steps)
            ? execution.steps.map((step) => ({
                index: step.index,
                status: step.status,
                selection: step.selection,
                route: step.route,
                selectedStage: step.selectedStage,
                routeContext: step.routeContext && {
                    routeId: step.routeContext.routeId,
                    sourceVerb: step.routeContext.sourceVerb,
                    targetVerb: step.routeContext.targetVerb,
                },
                generated: step.generated,
                linkedGrammarPath: step.linkedGrammarPath,
                nextSource: step.nextSource,
                candidateRouteCount: step.candidateRouteCount,
                firstCandidateRouteId: step.candidateRouteIds?.[0] || "",
            }))
            : [],
        stoppedReason: execution.stoppedReason,
        currentSourceVerb: execution.currentPreview?.sourceVerb || "",
        candidateRouteCount: execution.candidateRouteCount,
        noNewRouteFamilies: execution.boundaries?.noNewRouteFamilies === true,
        noNewSurfaceRules: execution.boundaries?.noNewSurfaceRules === true,
        doesExecuteStages: execution.boundaries?.doesExecuteStages === true,
        doesNotMutateState: execution.boundaries?.doesNotMutateState === true,
    });
    ctx.clearActiveNawatLinkedGrammarPathSelections();
    ctx.setActiveNawatLinkedGrammarPathSelections([
        { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
        { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" },
    ], { sourceVerb: "(pusuni)" });
    const activeLinkedPathExecution = ctx.executeActiveNawatLinkedGrammarPathSelections();
    s.eq(
        "linked grammar path selection state executes the stored selected chain on request",
        {
            outputKind: activeLinkedPathExecution.outputKind,
            requestedSelectionCount: activeLinkedPathExecution.requestedSelectionCount,
            stepStatuses: activeLinkedPathExecution.steps.map((step) => step.status),
            generatedSurfaces: activeLinkedPathExecution.steps.map((step) => step.generated?.primarySurface || ""),
            storedOutputKind: ctx.getNawatRouteStateStore().activeLinkedGrammarPathExecution?.outputKind || "",
            doesExecuteStages: activeLinkedPathExecution.boundaries?.doesExecuteStages === true,
            doesNotMutateState: activeLinkedPathExecution.boundaries?.doesNotMutateState === true,
        },
        {
            outputKind: "linked-grammar-path-chain-execution",
            requestedSelectionCount: 2,
            stepStatuses: ["executed", "executed"],
            generatedSurfaces: ["pusukti", "pusuktiiwi"],
            storedOutputKind: "linked-grammar-path-chain-execution",
            doesExecuteStages: true,
            doesNotMutateState: true,
        }
    );
    s.eq(
        "linked grammar path execution exposes every generated stage as a promotable source",
        typeof ctx.getNawatLinkedGrammarPathExecutionSourceOptions === "function"
            ? ctx.getNawatLinkedGrammarPathExecutionSourceOptions(activeLinkedPathExecution)
            : [],
        [
            {
                sourceVerb: "pusukti",
                sourceObjectPrefix: "",
                displaySurface: "pusukti",
                sourceInput: "(pusukti)",
                sourceInputDisplay: "(pusukti)",
                generatedSurface: "pusukti",
                routeId: "denominal-vi-ti-preterit",
                stageKey: "verbalizer",
                fromStepIndex: 0,
            },
            {
                sourceVerb: "pusuktiiwi",
                sourceObjectPrefix: "",
                displaySurface: "pusuktiiwi",
                sourceInput: "(pusuktiiwi)",
                sourceInputDisplay: "(pusuktiiwi)",
                generatedSurface: "pusuktiiwi",
                routeId: "denominal-vi-iwi-preterit",
                stageKey: "verbalizer",
                fromStepIndex: 1,
            },
        ]
    );
    const promotedInputSyncCalls = [];
    const promotedLinkedPathSource = ctx.promoteActiveNawatLinkedGrammarPathExecutionFinalSource({
        syncInput: true,
        inputApplier: (sourceVerb, sourceContext) => {
            promotedInputSyncCalls.push({
                sourceVerb,
                sourceContext,
            });
        },
    });
    s.eq(
        "linked grammar path selection state can promote the final generated stage as a new source and input",
        {
            outputKind: promotedLinkedPathSource.outputKind,
            promotedSource: promotedLinkedPathSource.promotedSource,
            inputSync: promotedLinkedPathSource.inputSync,
            inputSyncCalls: promotedInputSyncCalls,
            activeSelections: promotedLinkedPathSource.activeSelections,
            currentSource: promotedLinkedPathSource.summary?.currentSource || null,
            appendableSelectionCount: promotedLinkedPathSource.summary?.appendableSelectionCount || 0,
            storedPromotedSource: ctx.getNawatRouteStateStore().activeLinkedGrammarPathPromotedSource || null,
            promotesGeneratedStageAsSource: promotedLinkedPathSource.boundaries?.promotesGeneratedStageAsSource === true,
            syncsPromotedSourceInputOnlyWhenRequested: promotedLinkedPathSource.boundaries?.syncsPromotedSourceInputOnlyWhenRequested === true,
            doesNotExecuteStages: promotedLinkedPathSource.boundaries?.doesNotExecuteStages === true,
        },
        {
            outputKind: "linked-grammar-path-promoted-source",
            promotedSource: {
                sourceVerb: "pusuktiiwi",
                sourceObjectPrefix: "",
                displaySurface: "pusuktiiwi",
                sourceInput: "(pusuktiiwi)",
                sourceInputDisplay: "(pusuktiiwi)",
                generatedSurface: "pusuktiiwi",
                routeId: "denominal-vi-iwi-preterit",
                stageKey: "verbalizer",
                fromStepIndex: 1,
            },
            inputSync: {
                applied: true,
                method: "input-applier",
                sourceVerb: "pusuktiiwi",
                sourceObjectPrefix: "",
            },
            inputSyncCalls: [
                {
                    sourceVerb: "pusuktiiwi",
                    sourceContext: {
                        sourceVerb: "pusuktiiwi",
                        sourceObjectPrefix: "",
                        displaySurface: "pusuktiiwi",
                        sourceInput: "(pusuktiiwi)",
                        sourceInputDisplay: "(pusuktiiwi)",
                        generatedSurface: "pusuktiiwi",
                        fromStepIndex: 1,
                    },
                },
            ],
            activeSelections: [],
            currentSource: {
                sourceVerb: "pusuktiiwi",
                sourceObjectPrefix: "",
            },
            appendableSelectionCount: 24,
            storedPromotedSource: {
                sourceVerb: "pusuktiiwi",
                sourceObjectPrefix: "",
                displaySurface: "pusuktiiwi",
                sourceInput: "(pusuktiiwi)",
                sourceInputDisplay: "(pusuktiiwi)",
                generatedSurface: "pusuktiiwi",
                routeId: "denominal-vi-iwi-preterit",
                stageKey: "verbalizer",
                fromStepIndex: 1,
            },
            promotesGeneratedStageAsSource: true,
            syncsPromotedSourceInputOnlyWhenRequested: true,
            doesNotExecuteStages: true,
        }
    );
    const continuedPromotedLinkedPath = ctx.appendActiveNawatLinkedGrammarPathSelection({
        routeId: "denominal-vt-na-preterit",
        stageKey: "target-mode",
    });
    s.eq(
        "linked grammar path selection state clears stale execution metadata when continuing from a promoted source",
        {
            activeSelections: continuedPromotedLinkedPath.activeSelections,
            storedExecution: ctx.getNawatRouteStateStore().activeLinkedGrammarPathExecution || null,
            storedPromotedSource: ctx.getNawatRouteStateStore().activeLinkedGrammarPathPromotedSource || null,
            currentSource: continuedPromotedLinkedPath.summary?.initialSource || null,
        },
        {
            activeSelections: [
                {
                    routeId: "denominal-vt-na-preterit",
                    stageKey: "target-mode",
                },
            ],
            storedExecution: null,
            storedPromotedSource: null,
            currentSource: {
                sourceVerb: "pusuktiiwi",
                sourceObjectPrefix: "",
            },
        }
    );
    ctx.clearActiveNawatLinkedGrammarPathSelections();
    ctx.setActiveNawatLinkedGrammarPathSelections([
        { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
        { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" },
    ], { sourceVerb: "(pusuni)" });
    ctx.executeActiveNawatLinkedGrammarPathSelections();
    const firstStepInputSyncCalls = [];
    const promotedFirstStepSource = ctx.promoteActiveNawatLinkedGrammarPathExecutionStepSource(0, {
        syncInput: true,
        inputApplier: (sourceVerb, sourceContext) => {
            firstStepInputSyncCalls.push({
                sourceVerb,
                sourceContext,
            });
        },
    });
    s.eq(
        "linked grammar path selection state can promote any generated stage as a new source",
        {
            outputKind: promotedFirstStepSource.outputKind,
            promotedSource: promotedFirstStepSource.promotedSource,
            inputSync: promotedFirstStepSource.inputSync,
            inputSyncCalls: firstStepInputSyncCalls,
            currentSource: promotedFirstStepSource.summary?.currentSource || null,
            promotesSelectedGeneratedStageAsSource: promotedFirstStepSource.boundaries?.promotesSelectedGeneratedStageAsSource === true,
            doesNotExecuteStages: promotedFirstStepSource.boundaries?.doesNotExecuteStages === true,
        },
        {
            outputKind: "linked-grammar-path-promoted-source",
            promotedSource: {
                sourceVerb: "pusukti",
                sourceObjectPrefix: "",
                displaySurface: "pusukti",
                sourceInput: "(pusukti)",
                sourceInputDisplay: "(pusukti)",
                generatedSurface: "pusukti",
                routeId: "denominal-vi-ti-preterit",
                stageKey: "verbalizer",
                fromStepIndex: 0,
            },
            inputSync: {
                applied: true,
                method: "input-applier",
                sourceVerb: "pusukti",
                sourceObjectPrefix: "",
            },
            inputSyncCalls: [
                {
                    sourceVerb: "pusukti",
                    sourceContext: {
                        sourceVerb: "pusukti",
                        sourceObjectPrefix: "",
                        displaySurface: "pusukti",
                        sourceInput: "(pusukti)",
                        sourceInputDisplay: "(pusukti)",
                        generatedSurface: "pusukti",
                        fromStepIndex: 0,
                    },
                },
            ],
            currentSource: {
                sourceVerb: "pusukti",
                sourceObjectPrefix: "",
            },
            promotesSelectedGeneratedStageAsSource: true,
            doesNotExecuteStages: true,
        }
    );
    ctx.clearActiveNawatLinkedGrammarPathSelections();
    s.eq(
        "linked grammar path chain executes selected stages without mutating state",
        summarizeLinkedPathChainExecution(ctx.executeNawatLinkedGrammarPathChain({
            sourceVerb: "(pusuni)",
            selections: [
                { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
                { routeId: "denominal-vi-iwi-preterit", stageKey: "verbalizer" },
            ],
        })),
        {
            outputKind: "linked-grammar-path-chain-execution",
            initialSource: {
                sourceVerb: "(pusuni)",
                sourceObjectPrefix: "",
            },
            requestedSelectionCount: 2,
            steps: [
                {
                    index: 0,
                    status: "executed",
                    selection: {
                        routeId: "denominal-vi-ti-preterit",
                        stageKey: "verbalizer",
                    },
                    route: {
                        routeId: "denominal-vi-ti-preterit",
                        routeFamily: "vi-ti",
                        targetVerb: "pusukti",
                        surface: "pusuktik",
                        surfaceTrail: "(pusuni) → pusuk → (pusukti) → pusuktik",
                    },
                    selectedStage: {
                        routeId: "denominal-vi-ti-preterit",
                        stationKey: "verbalizer",
                        sourceVerb: "(pusukti)",
                        displaySurface: "(pusukti)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                        combinedMode: "active",
                        derivationMode: "active",
                        voiceMode: "active",
                        sourceScope: "active",
                    },
                    routeContext: {
                        routeId: "denominal-vi-ti-preterit",
                        sourceVerb: "(pusuni)",
                        targetVerb: "pusukti",
                    },
                    generated: {
                        result: "pusukti",
                        surfaceForms: ["pusukti"],
                        primarySurface: "pusukti",
                    },
                    linkedGrammarPath: {
                        version: 1,
                        source: "linked-grammar-path-stage",
                        routeId: "denominal-vi-ti-preterit",
                        stationKey: "verbalizer",
                        sourceVerb: "(pusukti)",
                        displaySurface: "(pusukti)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                        canBecomeSource: true,
                        doesNotBroadenGeneration: true,
                    },
                    nextSource: {
                        canBecomeSource: true,
                        sourceVerb: "(pusukti)",
                        displaySurface: "(pusukti)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                    },
                    candidateRouteCount: 8,
                    firstCandidateRouteId: "denominal-vi-ti-preterit",
                },
                {
                    index: 1,
                    status: "executed",
                    selection: {
                        routeId: "denominal-vi-iwi-preterit",
                        stageKey: "verbalizer",
                    },
                    route: {
                        routeId: "denominal-vi-iwi-preterit",
                        routeFamily: "vi-iwi",
                        targetVerb: "pusuktiiwi",
                        surface: "pusuktiiwik",
                        surfaceTrail: "(pusukti) → pusukti → (pusuktiiwi) → pusuktiiwik",
                    },
                    selectedStage: {
                        routeId: "denominal-vi-iwi-preterit",
                        stationKey: "verbalizer",
                        sourceVerb: "(pusuktiiwi)",
                        displaySurface: "(pusuktiiwi)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                        combinedMode: "active",
                        derivationMode: "active",
                        voiceMode: "active",
                        sourceScope: "active",
                    },
                    routeContext: {
                        routeId: "denominal-vi-iwi-preterit",
                        sourceVerb: "(pusukti)",
                        targetVerb: "pusuktiiwi",
                    },
                    generated: {
                        result: "pusuktiiwi",
                        surfaceForms: ["pusuktiiwi"],
                        primarySurface: "pusuktiiwi",
                    },
                    linkedGrammarPath: {
                        version: 1,
                        source: "linked-grammar-path-stage",
                        routeId: "denominal-vi-iwi-preterit",
                        stationKey: "verbalizer",
                        sourceVerb: "(pusuktiiwi)",
                        displaySurface: "(pusuktiiwi)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                        canBecomeSource: true,
                        doesNotBroadenGeneration: true,
                    },
                    nextSource: {
                        canBecomeSource: true,
                        sourceVerb: "(pusuktiiwi)",
                        displaySurface: "(pusuktiiwi)",
                        mode: "verbo",
                        tenseValue: "presente",
                        objectPrefix: "",
                    },
                    candidateRouteCount: 8,
                    firstCandidateRouteId: "denominal-vi-ti-preterit",
                },
            ],
            stoppedReason: "",
            currentSourceVerb: "(pusuktiiwi)",
            candidateRouteCount: 8,
            noNewRouteFamilies: true,
            noNewSurfaceRules: true,
            doesExecuteStages: true,
            doesNotMutateState: true,
        }
    );
    s.eq(
        "linked denominal finite stage can become a direct generation source",
        {
            linkedStage: viTiFiniteStageRequest.linkedGrammarPathStage,
            linkedPath: viTiFiniteStageResult.linkedGrammarPath,
            surfaceForms: viTiFiniteStageResult.surfaceForms,
        },
        {
            linkedStage: {
                routeId: "denominal-vi-ti-preterit",
                stationKey: "finite-tense",
                sourceVerb: "(pusukti)",
                displaySurface: "pusuktik",
                mode: "verbo",
                tenseValue: "preterito",
                objectPrefix: "",
                combinedMode: "active",
                derivationMode: "active",
                voiceMode: "active",
                sourceScope: "active",
            },
            linkedPath: {
                version: 1,
                source: "linked-grammar-path-stage",
                routeId: "denominal-vi-ti-preterit",
                stationKey: "finite-tense",
                sourceVerb: "(pusukti)",
                displaySurface: "pusuktik",
                mode: "verbo",
                tenseValue: "preterito",
                objectPrefix: "",
                canBecomeSource: true,
                doesNotBroadenGeneration: true,
            },
            surfaceForms: ["pusuktik"],
        }
    );
    const vtNaVerbalizerStageRequest = ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest(
        denominalRoutePreview.routes.find((route) => route.routeId === "denominal-vt-na-preterit").stages.find((stage) => stage.key === "verbalizer")
    );
    const vtNaVerbalizerStageResult = ctx.executeNawatLinkedGrammarPathStage(
        denominalRoutePreview.routes.find((route) => route.routeId === "denominal-vt-na-preterit").stages.find((stage) => stage.key === "verbalizer")
    );
    s.eq(
        "linked transitive denominal verbalizer stage can become a direct generation source",
        {
            linkedStage: vtNaVerbalizerStageRequest.linkedGrammarPathStage,
            linkedPath: vtNaVerbalizerStageResult.linkedGrammarPath,
            surfaceForms: vtNaVerbalizerStageResult.surfaceForms,
        },
        {
            linkedStage: {
                routeId: "denominal-vt-na-preterit",
                stationKey: "verbalizer",
                sourceVerb: "(pusuk)-(na)",
                displaySurface: "(pusuk)-(na)",
                mode: "verbo",
                tenseValue: "presente",
                objectPrefix: "",
                combinedMode: "active",
                derivationMode: "active",
                voiceMode: "active",
                sourceScope: "active",
            },
            linkedPath: {
                version: 1,
                source: "linked-grammar-path-stage",
                routeId: "denominal-vt-na-preterit",
                stationKey: "verbalizer",
                sourceVerb: "(pusuk)-(na)",
                displaySurface: "(pusuk)-(na)",
                mode: "verbo",
                tenseValue: "presente",
                objectPrefix: "",
                canBecomeSource: true,
                doesNotBroadenGeneration: true,
            },
            surfaceForms: ["pusukna"],
        }
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
    s.ok(
        "present/preterit/future agentive NNC routes are exposed only in sustantivo mode",
        ctx.getTenseOrderForMode(ctx.TENSE_MODE.sustantivo).includes("agentivo-presente")
            && ctx.getTenseOrderForMode(ctx.TENSE_MODE.sustantivo).includes("agentivo-preterito")
            && ctx.getTenseOrderForMode(ctx.TENSE_MODE.sustantivo).includes("agentivo-futuro")
            && !ctx.getTenseOrderForMode(ctx.TENSE_MODE.verbo).includes("agentivo-presente")
            && !ctx.getTenseOrderForMode(ctx.TENSE_MODE.verbo).includes("agentivo-preterito")
            && !ctx.getTenseOrderForMode(ctx.TENSE_MODE.verbo).includes("agentivo-futuro")
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
        "patientivo noun route defaults to present source input but uses #3 salida imperfective output",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoImperfectiveNounRoute, {
            sourceVerb: "(kuchi)",
        }),
        "(kuchi) → kuchi → patientivo · imperfectivo → -t → kuchiyat"
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
        sourceVerb: "(ketza)",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "patientivo perfective noun route rides through #3 salida for an allowed perfective source ending",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoPerfectiveNounRoute, {
            sourceVerb: "(ketza)",
            sourceTenseValue: "preterito",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: patientivoPerfectiveNounTarget,
        }),
        "(ketza) → ketzki → patientivo · perfectivo → -ti → ketzti"
    );
    const blockedPatientivoPerfectiveNounTarget = ctx.resolveNawatRouteTarget(patientivoPerfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "patientivo perfective noun route does not reconstruct an invalid ch-ending source statically",
        ctx.getNawatRouteFiniteSurfaceForm(patientivoPerfectiveNounRoute, {
            sourceVerb: "(kuchi)",
            routeTarget: blockedPatientivoPerfectiveNounTarget,
        }),
        ""
    );
    s.eq(
        "patientivo perfective noun route trail omits suffix/output when #3 salida blocks the source",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoPerfectiveNounRoute, {
            sourceVerb: "(kuchi)",
            sourceTenseValue: "preterito",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: blockedPatientivoPerfectiveNounTarget,
        }),
        "(kuchi) → kuchki → patientivo · perfectivo"
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
        ["active", "presente", "kuchiyat"],
        ["active", "presente-habitual", "kuchiyat"],
        ["active", "presente-desiderativo", "kuchiyat"],
        ["active", "imperfecto", "kuchiyat"],
        ["active", "preterito", ""],
        ["active", "pasado-remoto", "kuchiyat"],
        ["active", "perfecto", ""],
        ["active", "pluscuamperfecto", ""],
        ["active", "condicional-perfecto", ""],
        ["active", "futuro", "kuchiyat"],
        ["active", "condicional", "kuchiyat"],
        ["active", "imperativo", "kuchiyat"],
        ["nonactive", "presente", "kuchit"],
        ["nonactive", "presente-habitual", "kuchit"],
        ["nonactive", "presente-desiderativo", "kuchit"],
        ["nonactive", "imperfecto", "kuchit"],
        ["nonactive", "preterito", "kuchit"],
        ["nonactive", "pasado-remoto", "kuchit"],
        ["nonactive", "perfecto", "kuchit"],
        ["nonactive", "pluscuamperfecto", "kuchit"],
        ["nonactive", "condicional-perfecto", "kuchit"],
        ["nonactive", "futuro", "kuchit"],
        ["nonactive", "condicional", "kuchit"],
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
    ["passive", "impersonal"].forEach((patientivoSource) => {
        s.eq(
            `patientivo ${patientivoSource} route spec stays on nonactive-core route`,
            ctx.resolveNawatPatientivoRouteSpec({ patientivoSource }),
            {
                sourceTenseValue: "preterito",
                sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
                patientivoSource,
                routeKey: "patientivo-nonactive-t",
                suffix: "t",
                surfaceSuffix: "-t",
            }
        );
        s.ok(
            `patientivo ${patientivoSource} is nonactive for route selection`,
            ctx.isNawatRouteNonactiveSource({ patientivoSource })
        );
    });
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
        "(kuchi) → kuchka → patientivo · imperfectivo → -t → kuchiyat"
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
        ["", "puluyat"],
        ["ta", "tapuluyat"],
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
            `pulua active present V→S uses #3 salida imperfective patientivo output${sourceObjectPrefix ? " with object prefix" : ""}`,
            ctx.getNawatRouteFiniteSurfaceForm(routeProfile, {
                sourceVerb: "(pulua)",
                sourceObjectPrefix,
                routeTarget,
            }),
            expectedSurface
        );
    });
    const matiTeImperfectivePatientivoTarget = ctx.resolveNawatRouteTarget(patientivoImperfectiveNounRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "te",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq(
        "active imperfective V→S route asks #3 salida so te maps to ta in patientivo output",
        ctx.getNawatRouteFiniteSurfaceForm(patientivoImperfectiveNounRoute, {
            sourceVerb: "-(mati)",
            sourceObjectPrefix: "te",
            routeTarget: matiTeImperfectivePatientivoTarget,
        }),
        "tamatiyat"
    );
    s.eq(
        "active imperfective V→S trail shows generated #3 salida rather than static te reconstruction",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoImperfectiveNounRoute, {
            sourceVerb: "-(mati)",
            sourceObjectPrefix: "te",
            sourceTenseValue: "imperfecto",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: matiTeImperfectivePatientivoTarget,
        }),
        "-(mati) → tematiya → patientivo · imperfectivo → -t → tamatiyat"
    );
    const puluaNonactivePatientivoRoute = ctx.getNawatRouteProfile("patientivo-nonactive-t");
    const puluaNonactivePatientivoTarget = ctx.resolveNawatRouteTarget(puluaNonactivePatientivoRoute, {
        sourceVerb: "(pulua)",
        sourceTenseValue: "presente",
        sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
    });
    s.eq(
        "pulua nonactive V→S uses generated #3 patientivo connector instead of static route suffix",
        ctx.getNawatRouteFiniteSurfaceForm(puluaNonactivePatientivoRoute, {
            sourceVerb: "(pulua)",
            routeTarget: puluaNonactivePatientivoTarget,
        }),
        "pululti"
    );
    s.eq(
        "pulua nonactive V→S route trail shows the generated patientivo connector",
        ctx.formatNawatRouteSurfaceTrailLabel(puluaNonactivePatientivoRoute, {
            sourceVerb: "(pulua)",
            routeTarget: puluaNonactivePatientivoTarget,
        }),
        "(pulua) → pululu → patientivo · pasivo/impersonal → -ti → pululti"
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
    s.eq("patientive prelocative matrix state initializes as empty route state", ctx.getNawatRouteStateStore().activeLocativeMatrixSpecId, "");
    ctx.setActiveNawatRouteProfile("denominal-vt-na-preterit");
    s.eq("direct nawat route state is not marked as chip travel", ctx.getActiveNawatRouteProfile().activeRouteTravelSource, "");
    s.eq(
        "embedded nawat route stays anchored in sustantivo mode",
        ctx.getActiveNawatTenseModeForCurrentSelection(),
        ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo
    );
    ctx.getNawatRouteStateStore().activeLocativeMatrixSpecId = "tla-tem-o-a";
    ctx.clearActiveNawatRouteProfile();
    s.eq("clearing nawat route state also clears patientive prelocative matrix id", ctx.getNawatRouteStateStore().activeLocativeMatrixSpecId, "");
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
