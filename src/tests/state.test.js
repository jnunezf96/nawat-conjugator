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
        suffixContract: profile.suffixContract ? {
            classicalSuffix: profile.suffixContract.classicalSuffix || "",
            nawatRuleSuffix: profile.suffixContract.nawatRuleSuffix || "",
            nawatVerbalizer: profile.suffixContract.nawatVerbalizer || "",
            routeVerbalizer: profile.suffixContract.routeVerbalizer || "",
        } : null,
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
    const summarizeDenominalAndrewsContracts = (entries) => Array.isArray(entries)
        ? entries.map((entry) => ({
            id: entry.id,
            range: entry.range,
            sourceCategory: entry.sourceCategory,
            sourceState: entry.sourceState,
            valency: entry.valency,
            suffixes: Array.isArray(entry.suffixContracts)
                ? entry.suffixContracts.map((contract) => `${contract.role}:${contract.classicalSuffix}->${contract.nawatRuleSuffix}`)
                : [],
            currentRouteFamilies: entry.currentRouteFamilies,
            currentRouteIds: entry.currentRouteIds,
            supportStatus: entry.supportStatus,
            generationStatus: entry.generationStatus,
            noNewSurfaceForms: entry.boundaries?.noNewSurfaceForms === true,
            structuralInventoryOnly: entry.boundaries?.structuralInventoryOnly === true,
        }))
        : [];
    const summarizeDenominalRoutePreview = (preview) => preview && ({
        outputKind: preview.outputKind,
        sourceVerb: preview.sourceVerb,
        supportStatus: preview.supportStatus,
        isCompleteLesson54_55: preview.isCompleteLesson54_55,
        familyCount: Array.isArray(preview.families) ? preview.families.length : 0,
        andrewsContractCount: Array.isArray(preview.andrewsContracts) ? preview.andrewsContracts.length : 0,
        andrewsContractRouteCount: Number(preview.andrewsContractRouteCount || 0),
        pendingAndrewsContractCount: Number(preview.andrewsContractCoverage?.unmodeledContractCount || 0)
            + Number(preview.andrewsContractCoverage?.targetUnmodeledContractCount || 0),
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
    const summarizeDenominalAndrewsContractRoute = (route) => route && ({
        contractId: route.contractId,
        routeTemplateId: route.routeTemplateId,
        range: route.range,
        denominalFamily: route.denominalFamily,
        sourceCategory: route.sourceCategory,
        sourceState: route.sourceState,
        targetRole: route.targetRole,
        targetValency: route.targetValency,
        classicalSuffixSequence: route.classicalSuffixSequence,
        nawatRuleSuffix: route.nawatRuleSuffix,
        nawatSurfaceSuffix: route.nawatSurfaceSuffix,
        targetVerbStem: route.targetVerbStem,
        targetInputValue: route.targetInputValue,
        currentRouteFamilies: route.currentRouteFamilies,
        currentRouteIds: route.currentRouteIds,
        supportStatus: route.supportStatus,
        routeTargetGenerated: route.routeTargetGenerated === true,
        generationAllowed: route.generationAllowed === true,
        doesNotGenerateFiniteVnc: route.boundaries?.doesNotGenerateFiniteVnc === true,
        noFixtureEvidence: route.boundaries?.noFixtureEvidence === true,
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
        "future nawat route target exposes non-enumerable LCM route frame",
        {
            hasFrame: Boolean(tiPreteritTarget.grammarFrame),
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(tiPreteritTarget, "grammarFrame"),
            routeFamily: tiPreteritTarget.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: tiPreteritTarget.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: tiPreteritTarget.grammarFrame?.routeContract?.generationAllowed,
            authorityRef: tiPreteritTarget.grammarFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            unitKind: tiPreteritTarget.grammarFrame?.unitFrame?.unitKind || "",
        },
        {
            hasFrame: true,
            enumerableGrammarFrame: false,
            routeFamily: "patientivo-tronco-conversion",
            routeStage: "resolve-route-target",
            generationAllowed: true,
            authorityRef: "Andrews Lessons 54-55",
            unitKind: "nawat-route-control",
        }
    );
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
            suffixContract: {
                classicalSuffix: "ti",
                nawatRuleSuffix: "ti",
                nawatVerbalizer: "-ti",
                routeVerbalizer: "-ti",
            },
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
    const tiPreteritSurfaceResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: tiPreteritTarget,
    });
    s.eq(
        "denominal finite route surface exposes LCM result contract",
        {
            surface: tiPreteritSurfaceResult.surface,
            ok: tiPreteritSurfaceResult.ok,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(tiPreteritSurfaceResult, "grammarFrame"),
            routeFamily: tiPreteritSurfaceResult.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: tiPreteritSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            authorityRef: tiPreteritSurfaceResult.grammarFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            outputKind: tiPreteritSurfaceResult.grammarFrame?.resultFrame?.outputKind || "",
        },
        {
            surface: "pusuktik",
            ok: true,
            enumerableGrammarFrame: false,
            routeFamily: "patientivo-tronco-conversion",
            routeStage: "finite-surface",
            authorityRef: "Andrews Lessons 54-55",
            outputKind: "nawat-route-finite-surface-result",
        }
    );
    const framedStateSurface = {
        result: "stale-state-result",
        surface: "top-state-surface",
        surfaceForms: ["stale-state-a / stale-state-b"],
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surface: "frame-state-surface",
                surfaceForms: ["frame-state-a / frame-state-b"],
            }),
        }),
    };
    s.eq(
        "nawat route state reads LCM result-frame surfaces before legacy result text",
        {
            forms: ctx.getStateResultSurfaceForms(framedStateSurface),
            primary: ctx.getPrimaryNawatRouteSurfaceForm(framedStateSurface),
            display: ctx.getStateResultDisplaySurface(framedStateSurface),
        },
        {
            forms: ["frame-state-a", "frame-state-b", "frame-state-surface"],
            primary: "frame-state-a",
            display: "frame-state-a / frame-state-b / frame-state-surface",
        }
    );
    const framedRouteTarget = ctx.attachNawatStaticRouteGrammarFrame({
        result: "—",
        surface: "legacy-route-control",
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surfaceForms: ["frame-route-a / frame-route-b"],
                outputKind: "nawat-static-route-target",
                generationRoute: "test-frame-reader",
            }),
        }),
    }, {
        profile: {
            id: "test-static-route",
            routePlacement: "patientivo-tronco-conversion",
            structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
        },
        routeStage: "test-frame-reader",
        targetSurface: "legacy-target-surface",
    });
    s.eq(
        "nawat static route target reads LCM result-frame surfaces before local target surface",
        {
            surface: framedRouteTarget.surface,
            surfaceForms: framedRouteTarget.surfaceForms,
            frameSurface: framedRouteTarget.grammarFrame.resultFrame.surface,
            frameForms: framedRouteTarget.grammarFrame.resultFrame.surfaceForms,
        },
        {
            surface: "frame-route-a",
            surfaceForms: ["frame-route-a", "frame-route-b"],
            frameSurface: "frame-route-a",
            frameForms: ["frame-route-a", "frame-route-b"],
        }
    );
    const emptyFramedRouteTarget = ctx.attachNawatStaticRouteGrammarFrame({
        result: "stale-route-result",
        surface: "legacy-route-control",
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: false,
                surfaceForms: [],
                outputKind: "nawat-static-route-target",
                generationRoute: "test-empty-frame-reader",
            }),
        }),
    }, {
        profile: {
            id: "test-static-route",
            routePlacement: "patientivo-tronco-conversion",
            structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
        },
        routeStage: "test-empty-frame-reader",
        targetSurface: "legacy-target-surface",
    });
    s.eq(
        "nawat static route target keeps an empty LCM result frame authoritative",
        {
            surface: emptyFramedRouteTarget.surface,
            surfaceForms: emptyFramedRouteTarget.surfaceForms,
            frameSurface: emptyFramedRouteTarget.grammarFrame.resultFrame.surface,
            frameForms: emptyFramedRouteTarget.grammarFrame.resultFrame.surfaceForms,
        },
        {
            surface: "",
            surfaceForms: [],
            frameSurface: "",
            frameForms: [],
        }
    );
    s.eq(
        "nawat route station surface text reads LCM result-frame surfaces",
        ctx.getNawatRouteStationSurfaceText({
            surface: "legacy-station-surface",
            frames: ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surfaceForms: ["frame-station-a / frame-station-b"],
                }),
            }),
        }),
        "frame-station-a / frame-station-b"
    );
    s.eq(
        "nawat route station surface text suppresses legacy surface for an empty LCM result frame",
        ctx.getNawatRouteStationSurfaceText({
            surface: "legacy-station-surface",
            renderVerb: "legacy-render",
            inputValue: "legacy-input",
            frames: ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surfaceForms: [],
                }),
            }),
        }),
        ""
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
    s.eq(
        "future nawat -na route frame marks Nawat-only suffix status",
        {
            hasFrame: Boolean(naPreteritTarget.grammarFrame),
            authorityRefs: naPreteritTarget.grammarFrame?.authorityFrame?.andrewsRefs || [],
            evidenceStatus: naPreteritTarget.grammarFrame?.authorityFrame?.evidenceStatus || "",
            noAndrewsSuffixContract: naPreteritTarget.grammarFrame?.morphBoundaryFrame?.noAndrewsSuffixContract,
        },
        {
            hasFrame: true,
            authorityRefs: [],
            evidenceStatus: "nawat-route-no-andrews-suffix",
            noAndrewsSuffixContract: true,
        }
    );
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
            curriculumRef: { source: "Nawat route data", range: "static_modes", role: "legacy-denominal-route" },
            outputKind: "denominal-route",
            routeFamily: "vt-na",
            structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
            routeId: "denominal-vt-na-preterit",
            routeProfileSource: "static-modes",
            sourceState: "patientivo-tronco",
            sourceSlot: "noun/inc.obj.",
            sourceCategory: "noun-or-incorporated-object",
            sourceSurface: "pusuk",
            suffixContract: null,
            verbalizer: "-na",
            verbalizerType: "denominal-transitive",
            valency: "transitive",
            targetTense: "preterito",
            surfaceSuffix: "-naj",
            supportStatus: "current-route-supported-nawat-only",
            isCompleteLesson54_55: false,
            boundaries: {
                noNewSurfaceForms: true,
                routeBasedOnly: true,
                suffixFamilyInventoryComplete: false,
                includedPossessorModeled: false,
                possessionDenominalModeled: false,
                temporalDenominalModeled: false,
                causativeApplicativeFamilyModeled: false,
                noAndrewsSuffixContract: true,
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
            suffixContract: {
                classicalSuffix: "i-hui",
                nawatRuleSuffix: "i-wi",
                nawatVerbalizer: "-iwi",
                routeVerbalizer: "-iwi",
            },
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
            suffixContract: {
                classicalSuffix: "a-hui",
                nawatRuleSuffix: "a-wi",
                nawatVerbalizer: "-awi",
                routeVerbalizer: "-awi",
            },
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
                structuralAnalogue: "nawat-transitive-route-no-andrews-suffix",
                verbalizer: "-na",
                verbalizerType: "denominal-transitive",
                valency: "transitive",
                routePlacement: "patientivo-tronco-conversion",
                routeProfileSource: "static-modes",
                routeIds: ["denominal-vt-na-preterit", "denominal-vt-na-perfect"],
                targetTenses: ["preterito", "perfecto"],
                surfaceSuffixes: ["-naj", "-najtuk"],
                sourceSlots: ["noun/inc.obj."],
                supportStatus: "current-route-supported-nawat-only-partial",
                isCompleteLesson54_55: false,
                noNewSurfaceForms: true,
            },
        ]
    );
    const andrewsDenominalContracts = ctx.getNawatDenominalAndrewsContractInventory();
    s.eq(
        "Lessons 54-55 Andrews contract inventory keeps NNC source and VNC valency boundaries",
        summarizeDenominalAndrewsContracts(andrewsDenominalContracts).filter((entry) => [
            "54.2.2-inceptive-stative-hui",
            "54.2.2-hui-lia-causative",
            "54.2.3-inceptive-stative-ya",
            "54.2.3-ti-ya-deverbal",
            "54.2.3-hui-ya-deverbal",
            "54.2.3-ya-lia-causative",
            "54.2.4-inceptive-stative-a",
            "54.2.5-inceptive-stative-hua",
            "54.3-included-possessor-ti",
            "55.1-temporal-tia",
            "55.2-causative-tla",
            "55.2-tla-ti-lia-applicative",
            "55.2-intransitive-tla",
            "55.2-intransitive-tla-ti-a-causative",
            "55.2-intransitive-tla-ti-lia-applicative",
            "55.3-intransitive-o-a-applicative-huia",
            "55.3-o-a-il-huia-al-huia-applicative-note",
            "55.6-i-hui-a-hui-to-o-a",
            "55.7-transitive-i-a",
        ].includes(entry.id)),
        [
            {
                id: "54.2.2-inceptive-stative-hui",
                range: "54.2.2",
                sourceCategory: "absolutive-state-nnc-predicate",
                sourceState: "absolutive",
                valency: "intransitive",
                suffixes: ["verbalizer:hui->wi"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.2.2-hui-lia-causative",
                range: "54.2.2",
                sourceCategory: "intransitive-hui-vnc",
                sourceState: "derived",
                valency: "single-object-causative",
                suffixes: ["source-verbalizer:hui->wi", "causative:lia->lia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.2.3-inceptive-stative-ya",
                range: "54.2.3",
                sourceCategory: "nounroot-or-nounstem-as-root",
                sourceState: "absolutive",
                valency: "intransitive",
                suffixes: ["verbalizer:ya->ya"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.2.3-ti-ya-deverbal",
                range: "54.2.3",
                sourceCategory: "intransitive-ti-vnc",
                sourceState: "derived",
                valency: "intransitive",
                suffixes: ["source-verbalizer:ti->ti", "deverbal-inceptive-stative:ya->ya"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.2.3-hui-ya-deverbal",
                range: "54.2.3",
                sourceCategory: "intransitive-hui-vnc",
                sourceState: "derived",
                valency: "intransitive",
                suffixes: ["source-verbalizer:hui->wi", "deverbal-inceptive-stative:ya->ya"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.2.3-ya-lia-causative",
                range: "54.2.3",
                sourceCategory: "intransitive-ya-vnc",
                sourceState: "derived",
                valency: "single-object-causative-or-applicative",
                suffixes: ["source-verbalizer:ya->ya", "causative-or-applicative:lia->lia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.2.4-inceptive-stative-a",
                range: "54.2.4",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                valency: "intransitive",
                suffixes: ["verbalizer:a->a"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.2.5-inceptive-stative-hua",
                range: "54.2.5",
                sourceCategory: "deverbal-yo-nounstem",
                sourceState: "absolutive",
                valency: "intransitive",
                suffixes: ["verbalizer:hua->wa"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "54.3-included-possessor-ti",
                range: "54.3",
                sourceCategory: "possessive-state-nnc-predicate",
                sourceState: "possessive",
                valency: "intransitive",
                suffixes: ["verbalizer:ti->ti"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.1-temporal-tia",
                range: "55.1",
                sourceCategory: "compound-temporal-nnc",
                sourceState: "absolutive",
                valency: "intransitive",
                suffixes: ["temporal-intransitive:tia->tia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.2-causative-tla",
                range: "55.2",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                valency: "causative",
                suffixes: ["causative:tla->ta"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.2-tla-ti-lia-applicative",
                range: "55.2",
                sourceCategory: "causative-tla-vnc",
                sourceState: "derived",
                valency: "applicative",
                suffixes: ["source-causative:tla->ta", "applicative-replacement:ti-lia->ti-lia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.2-intransitive-tla",
                range: "55.2",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                valency: "intransitive",
                suffixes: ["intransitive:tla->ta"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.2-intransitive-tla-ti-a-causative",
                range: "55.2 note",
                sourceCategory: "intransitive-tla-vnc",
                sourceState: "derived",
                valency: "causative",
                suffixes: ["source-intransitive:tla->ta", "replacement-before-causative:ti-a->ti-a"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.2-intransitive-tla-ti-lia-applicative",
                range: "55.2 note",
                sourceCategory: "intransitive-tla-vnc",
                sourceState: "derived",
                valency: "applicative",
                suffixes: ["source-intransitive:tla->ta", "applicative-replacement:ti-lia->ti-lia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.3-intransitive-o-a-applicative-huia",
                range: "55.3",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                valency: "intransitive-and-single-object-applicative",
                suffixes: ["intransitive:o-a->u-a", "applicative-counterpart:huia->wia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.3-o-a-il-huia-al-huia-applicative-note",
                range: "55.3 note 2",
                sourceCategory: "intransitive-o-a-vnc",
                sourceState: "derived",
                valency: "single-object-applicative",
                suffixes: [
                    "source-intransitive:o-a->u-a",
                    "hypothetical-i-hui-applicative:i-l-huia->i-l-wia",
                    "hypothetical-a-hui-applicative:a-l-huia->a-l-wia",
                ],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.6-i-hui-a-hui-to-o-a",
                range: "55.6",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                valency: "intransitive-to-transitive-causative",
                suffixes: ["source-intransitive:i-hui->i-wi", "source-intransitive:a-hui->a-wi", "target-causative:o-a->u-a"],
                currentRouteFamilies: ["vi-iwi", "vi-awi"],
                currentRouteIds: [
                    "denominal-vi-iwi-preterit",
                    "denominal-vi-iwi-perfect",
                    "denominal-vi-awi-preterit",
                    "denominal-vi-awi-perfect",
                ],
                supportStatus: "source-route-supported-target-unmodeled",
                generationStatus: "source-route-surface-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
            {
                id: "55.7-transitive-i-a",
                range: "55.7",
                sourceCategory: "nounstem-plus-i",
                sourceState: "absolutive",
                valency: "transitive",
                suffixes: ["transitive:i-a->i-a"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                generationStatus: "not-generated",
                noNewSurfaceForms: true,
                structuralInventoryOnly: true,
            },
        ]
    );
    s.eq(
        "Lessons 54-55 Andrews contract coverage keeps vt-na outside Andrews-backed routes",
        ctx.getNawatDenominalAndrewsContractCoverageSummary(),
        {
            version: 1,
            curriculumRef: { source: "Andrews", range: "54.2-55.7", role: "denominal-contract-inventory" },
            outputKind: "denominal-andrews-contract-coverage",
            contractCount: 26,
            routeCoveredContractCount: 3,
            unmodeledContractCount: 23,
            targetUnmodeledContractCount: 1,
            nawatOnlyRouteFamilies: ["vt-na"],
            unmodeledContractIds: [
                "54.2.2-inceptive-stative-hui",
                "54.2.2-hui-lia-causative",
                "54.2.3-inceptive-stative-ya",
                "54.2.3-ti-ya-deverbal",
                "54.2.3-hui-ya-deverbal",
                "54.2.3-ya-lia-causative",
                "54.2.4-inceptive-stative-a",
                "54.2.5-inceptive-stative-hua",
                "54.3-included-possessor-ti",
                "54.2-54.4-ti-lia-causative",
                "54.5-ti-a-causative",
                "54.6-t-ia-applicative",
                "55.1-temporal-tia",
                "55.2-causative-tla",
                "55.2-tla-ti-lia-applicative",
                "55.2-intransitive-tla",
                "55.2-intransitive-tla-ti-a-causative",
                "55.2-intransitive-tla-ti-lia-applicative",
                "55.3-intransitive-o-a-applicative-huia",
                "55.3-o-a-il-huia-al-huia-applicative-note",
                "55.4-adverbial-huia",
                "55.5-relational-compound-o-a-huia",
                "55.7-transitive-i-a",
            ],
            targetUnmodeledContractIds: ["55.6-i-hui-a-hui-to-o-a"],
            boundaries: {
                noNewSurfaceForms: true,
                noFixtureEvidence: true,
                structuralInventoryOnly: true,
                fullLessonGenerationModeled: false,
            },
        }
    );
    const andrewsContractRoutePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "pusuk",
    });
    s.eq(
        "Lessons 54-55 Andrews contract route preview is stem-only and Andrews-backed",
        {
            outputKind: andrewsContractRoutePreview.outputKind,
            sourceStem: andrewsContractRoutePreview.sourceStem,
            contractCount: andrewsContractRoutePreview.contractCount,
            routeCount: andrewsContractRoutePreview.routeCount,
            finiteRouteRequestCount: andrewsContractRoutePreview.finiteRouteRequestCount,
            finiteRouteObjectPrefixRequiredCount: andrewsContractRoutePreview.finiteRouteObjectPrefixRequiredCount,
            finiteRouteStemClassContractCount: andrewsContractRoutePreview.finiteRouteStemClassContractCount,
            finiteRouteSourceEvidenceRequiredCount: andrewsContractRoutePreview.finiteRouteSourceEvidenceRequiredCount,
            routeDiagnosticCount: andrewsContractRoutePreview.routeDiagnosticCount,
            routeWarningCount: andrewsContractRoutePreview.routeWarningCount,
            routeNoteCount: andrewsContractRoutePreview.routeNoteCount,
            diagnosticCount: andrewsContractRoutePreview.diagnostics.length,
            boundaries: andrewsContractRoutePreview.boundaries,
        },
        {
            outputKind: "denominal-andrews-contract-route-preview",
            sourceStem: "pusuk",
            contractCount: 26,
            routeCount: 31,
            finiteRouteRequestCount: 13,
            finiteRouteObjectPrefixRequiredCount: 3,
            finiteRouteStemClassContractCount: 11,
            finiteRouteSourceEvidenceRequiredCount: 18,
            routeDiagnosticCount: 20,
            routeWarningCount: 0,
            routeNoteCount: 20,
            diagnosticCount: 0,
            boundaries: {
                noNewSurfaceForms: true,
                noFixtureEvidence: true,
                doesNotCreateLexicalEvidence: true,
                doesNotGenerateFiniteVnc: true,
                noFiniteVncSurface: true,
                generatesVncStemsOnly: true,
                classicalRuleSpellingsConvertedToNawat: true,
                finiteGenerationRequiresExplicitRequest: true,
                finiteGenerationRequiresTargetTense: true,
            },
        }
    );
    const findAndrewsContractRoute = (contractId, routeTemplateId) => (
        andrewsContractRoutePreview.routes.find((route) => (
            route.contractId === contractId && route.routeTemplateId === routeTemplateId
        ))
    );
    s.eq(
        "Lessons 54-55 Andrews contract previews and requests expose LCM frames",
        (() => {
            const route = findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui");
            const request = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(route, {
                tense: "presente",
            });
            return {
                previewFrame: {
                    hasFrame: Boolean(andrewsContractRoutePreview.grammarFrame),
                    routeFamily: andrewsContractRoutePreview.frames?.routeContract?.routeFamily || "",
                    routeStage: andrewsContractRoutePreview.frames?.routeContract?.routeStage || "",
                    generationAllowed: andrewsContractRoutePreview.frames?.routeContract?.generationAllowed,
                    sourceStem: andrewsContractRoutePreview.frames?.routeContract?.sourceContract?.sourceStem || "",
                    andrewsRef: andrewsContractRoutePreview.frames?.authorityFrame?.andrewsRefs?.[0] || "",
                    enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(andrewsContractRoutePreview, "grammarFrame"),
                },
                routeFrame: {
                    hasFrame: Boolean(route?.grammarFrame),
                    routeStage: route?.frames?.routeContract?.routeStage || "",
                    generationAllowed: route?.frames?.routeContract?.generationAllowed,
                    sourceStem: route?.frames?.routeContract?.sourceContract?.sourceStem || "",
                    targetVerbStem: route?.frames?.routeContract?.targetContract?.targetVerbStem || "",
                    nawatRuleSpelling: route?.frames?.orthographyFrame?.nawatRuleSpelling || "",
                    routeOk: route?.frames?.resultFrame?.ok,
                    enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(route || {}, "grammarFrame"),
                },
                requestFrame: {
                    hasFrame: Boolean(request?.denominalAndrewsContractRoute?.grammarFrame),
                    routeStage: request?.denominalAndrewsContractRoute?.frames?.routeContract?.routeStage || "",
                    generationAllowed: request?.denominalAndrewsContractRoute?.frames?.routeContract?.generationAllowed,
                    targetInput: request?.denominalAndrewsContractRoute?.frames?.routeContract?.targetContract?.targetInput || "",
                    tense: request?.denominalAndrewsContractRoute?.tense || "",
                    enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(request?.denominalAndrewsContractRoute || {}, "grammarFrame"),
                },
            };
        })(),
        {
            previewFrame: {
                hasFrame: true,
                routeFamily: "denominal-andrews-contract",
                routeStage: "preview-route-family",
                generationAllowed: false,
                sourceStem: "pusuk",
                andrewsRef: "Andrews Lessons 54-55",
                enumerableGrammarFrame: false,
            },
            routeFrame: {
                hasFrame: true,
                routeStage: "preview-stem-route",
                generationAllowed: false,
                sourceStem: "pusuk",
                targetVerbStem: "pusukwi",
                nawatRuleSpelling: "wi",
                routeOk: true,
                enumerableGrammarFrame: false,
            },
            requestFrame: {
                hasFrame: true,
                routeStage: "request-finite-generation",
                generationAllowed: true,
                targetInput: "(pusukwi)",
                tense: "presente",
                enumerableGrammarFrame: false,
            },
        }
    );
    s.eq(
        "Lessons 54-55 Andrews contract route preview converts Classical suffix letters to Nawat route targets",
        [
            findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui"),
            findAndrewsContractRoute("54.2.2-hui-lia-causative", "hui-lia"),
            findAndrewsContractRoute("54.2.3-inceptive-stative-ya", "ya"),
            findAndrewsContractRoute("54.2.3-ti-ya-deverbal", "ti-ya"),
            findAndrewsContractRoute("54.2.3-hui-ya-deverbal", "hui-ya"),
            findAndrewsContractRoute("54.2.3-ya-lia-causative", "ya-lia"),
            findAndrewsContractRoute("54.2.4-inceptive-stative-a", "a"),
            findAndrewsContractRoute("54.2.5-inceptive-stative-hua", "hua"),
            findAndrewsContractRoute("55.1-temporal-tia", "tia"),
            findAndrewsContractRoute("55.2-causative-tla", "tla"),
            findAndrewsContractRoute("55.2-tla-ti-lia-applicative", "tla-ti-lia"),
            findAndrewsContractRoute("55.2-intransitive-tla", "intransitive-tla"),
            findAndrewsContractRoute("55.3-intransitive-o-a-applicative-huia", "o-a"),
            findAndrewsContractRoute("55.3-intransitive-o-a-applicative-huia", "huia"),
            findAndrewsContractRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-i-l-huia"),
            findAndrewsContractRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-a-l-huia"),
            findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "i-hui"),
            findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "a-hui"),
            findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "o-a"),
            findAndrewsContractRoute("55.7-transitive-i-a", "i-a"),
        ].map(summarizeDenominalAndrewsContractRoute),
        [
            {
                contractId: "54.2.2-inceptive-stative-hui",
                routeTemplateId: "hui",
                range: "54.2.2",
                denominalFamily: "inceptive-stative-hui",
                sourceCategory: "absolutive-state-nnc-predicate",
                sourceState: "absolutive",
                targetRole: "inceptive-stative",
                targetValency: "intransitive",
                classicalSuffixSequence: "hui",
                nawatRuleSuffix: "wi",
                nawatSurfaceSuffix: "wi",
                targetVerbStem: "pusukwi",
                targetInputValue: "(pusukwi)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "54.2.2-hui-lia-causative",
                routeTemplateId: "hui-lia",
                range: "54.2.2",
                denominalFamily: "hui-lia-causative",
                sourceCategory: "intransitive-hui-vnc",
                sourceState: "derived",
                targetRole: "single-object-causative",
                targetValency: "transitive",
                classicalSuffixSequence: "hui-lia",
                nawatRuleSuffix: "wi-lia",
                nawatSurfaceSuffix: "wilia",
                targetVerbStem: "pusukwilia",
                targetInputValue: "(pusukwi)-(lia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "54.2.3-inceptive-stative-ya",
                routeTemplateId: "ya",
                range: "54.2.3",
                denominalFamily: "inceptive-stative-ya",
                sourceCategory: "nounroot-or-nounstem-as-root",
                sourceState: "absolutive",
                targetRole: "inceptive-stative",
                targetValency: "intransitive",
                classicalSuffixSequence: "ya",
                nawatRuleSuffix: "ya",
                nawatSurfaceSuffix: "ya",
                targetVerbStem: "pusukya",
                targetInputValue: "(pusukya)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "54.2.3-ti-ya-deverbal",
                routeTemplateId: "ti-ya",
                range: "54.2.3",
                denominalFamily: "ti-ya-deverbal-inceptive-stative",
                sourceCategory: "intransitive-ti-vnc",
                sourceState: "derived",
                targetRole: "deverbal-inceptive-stative-from-ti",
                targetValency: "intransitive",
                classicalSuffixSequence: "ti-ya",
                nawatRuleSuffix: "ti-ya",
                nawatSurfaceSuffix: "tiya",
                targetVerbStem: "pusuktiya",
                targetInputValue: "(pusukti)-(ya)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "54.2.3-hui-ya-deverbal",
                routeTemplateId: "hui-ya",
                range: "54.2.3",
                denominalFamily: "hui-ya-deverbal-inceptive-stative",
                sourceCategory: "intransitive-hui-vnc",
                sourceState: "derived",
                targetRole: "deverbal-inceptive-stative-from-hui",
                targetValency: "intransitive",
                classicalSuffixSequence: "hui-ya",
                nawatRuleSuffix: "wi-ya",
                nawatSurfaceSuffix: "wiya",
                targetVerbStem: "pusukwiya",
                targetInputValue: "(pusukwi)-(ya)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "54.2.3-ya-lia-causative",
                routeTemplateId: "ya-lia",
                range: "54.2.3",
                denominalFamily: "ya-lia-causative",
                sourceCategory: "intransitive-ya-vnc",
                sourceState: "derived",
                targetRole: "single-object-causative-or-applicative",
                targetValency: "transitive",
                classicalSuffixSequence: "lia",
                nawatRuleSuffix: "lia",
                nawatSurfaceSuffix: "lia",
                targetVerbStem: "pusuklia",
                targetInputValue: "(pusuk)-(lia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "54.2.4-inceptive-stative-a",
                routeTemplateId: "a",
                range: "54.2.4",
                denominalFamily: "inceptive-stative-a",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "inceptive-stative",
                targetValency: "intransitive",
                classicalSuffixSequence: "a",
                nawatRuleSuffix: "a",
                nawatSurfaceSuffix: "a",
                targetVerbStem: "pusuka",
                targetInputValue: "(pusuka)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "54.2.5-inceptive-stative-hua",
                routeTemplateId: "hua",
                range: "54.2.5",
                denominalFamily: "inceptive-stative-hua",
                sourceCategory: "deverbal-yo-nounstem",
                sourceState: "absolutive",
                targetRole: "inceptive-stative",
                targetValency: "intransitive",
                classicalSuffixSequence: "hua",
                nawatRuleSuffix: "wa",
                nawatSurfaceSuffix: "wa",
                targetVerbStem: "pusukwa",
                targetInputValue: "(pusukwa)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.1-temporal-tia",
                routeTemplateId: "tia",
                range: "55.1",
                denominalFamily: "temporal-tia",
                sourceCategory: "compound-temporal-nnc",
                sourceState: "absolutive",
                targetRole: "temporal-intransitive",
                targetValency: "intransitive",
                classicalSuffixSequence: "tia",
                nawatRuleSuffix: "tia",
                nawatSurfaceSuffix: "tia",
                targetVerbStem: "pusuktia",
                targetInputValue: "(pusuktia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.2-causative-tla",
                routeTemplateId: "tla",
                range: "55.2",
                denominalFamily: "causative-tla",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "causative",
                targetValency: "transitive",
                classicalSuffixSequence: "tla",
                nawatRuleSuffix: "ta",
                nawatSurfaceSuffix: "ta",
                targetVerbStem: "pusukta",
                targetInputValue: "(pusuk)-(ta)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.2-tla-ti-lia-applicative",
                routeTemplateId: "tla-ti-lia",
                range: "55.2",
                denominalFamily: "tla-ti-lia-applicative",
                sourceCategory: "causative-tla-vnc",
                sourceState: "derived",
                targetRole: "applicative-counterpart",
                targetValency: "applicative",
                classicalSuffixSequence: "ti-lia",
                nawatRuleSuffix: "ti-lia",
                nawatSurfaceSuffix: "tilia",
                targetVerbStem: "pusuktilia",
                targetInputValue: "(pusukti)-(lia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.2-intransitive-tla",
                routeTemplateId: "intransitive-tla",
                range: "55.2",
                denominalFamily: "intransitive-tla",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "intransitive-become",
                targetValency: "intransitive",
                classicalSuffixSequence: "tla",
                nawatRuleSuffix: "ta",
                nawatSurfaceSuffix: "ta",
                targetVerbStem: "pusukta",
                targetInputValue: "(pusukta)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "o-a",
                range: "55.3",
                denominalFamily: "intransitive-o-a-applicative-huia",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "intransitive",
                targetValency: "intransitive",
                classicalSuffixSequence: "o-a",
                nawatRuleSuffix: "u-a",
                nawatSurfaceSuffix: "ua",
                targetVerbStem: "pusukua",
                targetInputValue: "(pusukua)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "huia",
                range: "55.3",
                denominalFamily: "intransitive-o-a-applicative-huia",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "applicative-counterpart",
                targetValency: "applicative",
                classicalSuffixSequence: "huia",
                nawatRuleSuffix: "wia",
                nawatSurfaceSuffix: "wia",
                targetVerbStem: "pusukwia",
                targetInputValue: "(pusuk)-(wia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.3-o-a-il-huia-al-huia-applicative-note",
                routeTemplateId: "o-a-i-l-huia",
                range: "55.3 note 2",
                denominalFamily: "o-a-il-huia-al-huia-applicative-note",
                sourceCategory: "intransitive-o-a-vnc",
                sourceState: "derived",
                targetRole: "single-object-applicative-via-hypothetical-i-hui",
                targetValency: "applicative",
                classicalSuffixSequence: "i-l-huia",
                nawatRuleSuffix: "i-l-wia",
                nawatSurfaceSuffix: "ilwia",
                targetVerbStem: "pusukilwia",
                targetInputValue: "(pusuk)-(ilwia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.3-o-a-il-huia-al-huia-applicative-note",
                routeTemplateId: "o-a-a-l-huia",
                range: "55.3 note 2",
                denominalFamily: "o-a-il-huia-al-huia-applicative-note",
                sourceCategory: "intransitive-o-a-vnc",
                sourceState: "derived",
                targetRole: "single-object-applicative-via-hypothetical-a-hui",
                targetValency: "applicative",
                classicalSuffixSequence: "a-l-huia",
                nawatRuleSuffix: "a-l-wia",
                nawatSurfaceSuffix: "alwia",
                targetVerbStem: "pusukalwia",
                targetInputValue: "(pusuk)-(alwia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.6-i-hui-a-hui-to-o-a",
                routeTemplateId: "i-hui",
                range: "55.6",
                denominalFamily: "i-hui-a-hui-to-o-a",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "source-intransitive",
                targetValency: "intransitive",
                classicalSuffixSequence: "i-hui",
                nawatRuleSuffix: "i-wi",
                nawatSurfaceSuffix: "iwi",
                targetVerbStem: "pusukiwi",
                targetInputValue: "(pusukiwi)",
                currentRouteFamilies: ["vi-iwi", "vi-awi"],
                currentRouteIds: [
                    "denominal-vi-iwi-preterit",
                    "denominal-vi-iwi-perfect",
                    "denominal-vi-awi-preterit",
                    "denominal-vi-awi-perfect",
                ],
                supportStatus: "source-route-supported-target-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.6-i-hui-a-hui-to-o-a",
                routeTemplateId: "a-hui",
                range: "55.6",
                denominalFamily: "i-hui-a-hui-to-o-a",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "source-intransitive",
                targetValency: "intransitive",
                classicalSuffixSequence: "a-hui",
                nawatRuleSuffix: "a-wi",
                nawatSurfaceSuffix: "awi",
                targetVerbStem: "pusukawi",
                targetInputValue: "(pusukawi)",
                currentRouteFamilies: ["vi-iwi", "vi-awi"],
                currentRouteIds: [
                    "denominal-vi-iwi-preterit",
                    "denominal-vi-iwi-perfect",
                    "denominal-vi-awi-preterit",
                    "denominal-vi-awi-perfect",
                ],
                supportStatus: "source-route-supported-target-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.6-i-hui-a-hui-to-o-a",
                routeTemplateId: "o-a",
                range: "55.6",
                denominalFamily: "i-hui-a-hui-to-o-a",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
                targetRole: "target-causative",
                targetValency: "transitive",
                classicalSuffixSequence: "o-a",
                nawatRuleSuffix: "u-a",
                nawatSurfaceSuffix: "ua",
                targetVerbStem: "pusukua",
                targetInputValue: "(pusuk)-(ua)",
                currentRouteFamilies: ["vi-iwi", "vi-awi"],
                currentRouteIds: [
                    "denominal-vi-iwi-preterit",
                    "denominal-vi-iwi-perfect",
                    "denominal-vi-awi-preterit",
                    "denominal-vi-awi-perfect",
                ],
                supportStatus: "source-route-supported-target-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
            {
                contractId: "55.7-transitive-i-a",
                routeTemplateId: "i-a",
                range: "55.7",
                denominalFamily: "transitive-i-a",
                sourceCategory: "nounstem-plus-i",
                sourceState: "absolutive",
                targetRole: "transitive-denominal",
                targetValency: "transitive",
                classicalSuffixSequence: "i-a",
                nawatRuleSuffix: "i-a",
                nawatSurfaceSuffix: "ia",
                targetVerbStem: "pusukia",
                targetInputValue: "(pusuk)-(ia)",
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "andrews-verified-unmodeled",
                routeTargetGenerated: true,
                generationAllowed: false,
                doesNotGenerateFiniteVnc: true,
                noFixtureEvidence: true,
            },
        ]
    );
    s.eq(
        "Lessons 54-55 Andrews contract route preview carries verified verbstem class contracts",
        [
            findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti"),
            findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui"),
            findAndrewsContractRoute("54.2.3-inceptive-stative-ya", "ya"),
            findAndrewsContractRoute("54.2.3-ti-ya-deverbal", "ti-ya"),
            findAndrewsContractRoute("54.2.3-hui-ya-deverbal", "hui-ya"),
            findAndrewsContractRoute("54.2.4-inceptive-stative-a", "a"),
            findAndrewsContractRoute("54.2.5-inceptive-stative-hua", "hua"),
            findAndrewsContractRoute("54.3-included-possessor-ti", "included-possessor-ti"),
            findAndrewsContractRoute("54.4-possession-ti", "possession-ti"),
            findAndrewsContractRoute("54.2-54.4-ti-lia-causative", "ti-lia"),
            findAndrewsContractRoute("54.5-ti-a-causative", "ti-a"),
            findAndrewsContractRoute("54.6-t-ia-applicative", "t-ia"),
            findAndrewsContractRoute("55.2-causative-tla", "tla"),
            findAndrewsContractRoute("55.3-intransitive-o-a-applicative-huia", "o-a"),
            findAndrewsContractRoute("55.3-intransitive-o-a-applicative-huia", "huia"),
            findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "i-hui"),
            findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "a-hui"),
            findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "o-a"),
        ].map((route) => ({
            contractId: route?.contractId || "",
            routeTemplateId: route?.routeTemplateId || "",
            targetStemClass: route?.targetStemClass || "",
            targetStemClassVerified: route?.boundaries?.targetStemClassVerified === true,
        })),
        [
            {
                contractId: "54.2.1-inceptive-stative-ti",
                routeTemplateId: "ti",
                targetStemClass: "A",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.2.2-inceptive-stative-hui",
                routeTemplateId: "hui",
                targetStemClass: "A",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.2.3-inceptive-stative-ya",
                routeTemplateId: "ya",
                targetStemClass: "A/B",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.2.3-ti-ya-deverbal",
                routeTemplateId: "ti-ya",
                targetStemClass: "A/B",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.2.3-hui-ya-deverbal",
                routeTemplateId: "hui-ya",
                targetStemClass: "B",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.2.4-inceptive-stative-a",
                routeTemplateId: "a",
                targetStemClass: "C",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.2.5-inceptive-stative-hua",
                routeTemplateId: "hua",
                targetStemClass: "A",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.3-included-possessor-ti",
                routeTemplateId: "included-possessor-ti",
                targetStemClass: "A",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.4-possession-ti",
                routeTemplateId: "possession-ti",
                targetStemClass: "A/B",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.2-54.4-ti-lia-causative",
                routeTemplateId: "ti-lia",
                targetStemClass: "C",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.5-ti-a-causative",
                routeTemplateId: "ti-a",
                targetStemClass: "C",
                targetStemClassVerified: true,
            },
            {
                contractId: "54.6-t-ia-applicative",
                routeTemplateId: "t-ia",
                targetStemClass: "C",
                targetStemClassVerified: true,
            },
            {
                contractId: "55.2-causative-tla",
                routeTemplateId: "tla",
                targetStemClass: "A",
                targetStemClassVerified: true,
            },
            {
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "o-a",
                targetStemClass: "C",
                targetStemClassVerified: true,
            },
            {
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "huia",
                targetStemClass: "C",
                targetStemClassVerified: true,
            },
            {
                contractId: "55.6-i-hui-a-hui-to-o-a",
                routeTemplateId: "i-hui",
                targetStemClass: "B",
                targetStemClassVerified: true,
            },
            {
                contractId: "55.6-i-hui-a-hui-to-o-a",
                routeTemplateId: "a-hui",
                targetStemClass: "B",
                targetStemClassVerified: true,
            },
            {
                contractId: "55.6-i-hui-a-hui-to-o-a",
                routeTemplateId: "o-a",
                targetStemClass: "C",
                targetStemClassVerified: true,
            },
        ]
    );
    const vowelFinalClassContractPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "a",
        contractId: "54.2.1-inceptive-stative-ti",
    });
    const vowelFinalHuiClassContractPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "a",
        contractId: "54.2.2-inceptive-stative-hui",
    });
    s.eq(
        "Andrews 54.2 ti and hui class contracts follow Nawat source-final type",
        [
            vowelFinalClassContractPreview.routes?.[0],
            vowelFinalHuiClassContractPreview.routes?.[0],
            findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti"),
            findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui"),
        ].map((route) => ({
            contractId: route?.contractId || "",
            routeTemplateId: route?.routeTemplateId || "",
            sourceStemFinalLetter: route?.sourceStemFinalLetter || "",
            sourceStemFinalType: route?.sourceStemFinalType || "",
            targetStemClass: route?.targetStemClass || "",
            targetStemClassRule: route?.targetStemClassRule || "",
            sourceFinalDeterminesTargetStemClass: route?.boundaries?.sourceFinalDeterminesTargetStemClass === true,
        })),
        [
            {
                contractId: "54.2.1-inceptive-stative-ti",
                routeTemplateId: "ti",
                sourceStemFinalLetter: "a",
                sourceStemFinalType: "vowel",
                targetStemClass: "A/B",
                targetStemClassRule: "54.2.1-source-final",
                sourceFinalDeterminesTargetStemClass: true,
            },
            {
                contractId: "54.2.2-inceptive-stative-hui",
                routeTemplateId: "hui",
                sourceStemFinalLetter: "a",
                sourceStemFinalType: "vowel",
                targetStemClass: "B",
                targetStemClassRule: "54.2.2-source-final",
                sourceFinalDeterminesTargetStemClass: true,
            },
            {
                contractId: "54.2.1-inceptive-stative-ti",
                routeTemplateId: "ti",
                sourceStemFinalLetter: "k",
                sourceStemFinalType: "consonant",
                targetStemClass: "A",
                targetStemClassRule: "54.2.1-source-final",
                sourceFinalDeterminesTargetStemClass: true,
            },
            {
                contractId: "54.2.2-inceptive-stative-hui",
                routeTemplateId: "hui",
                sourceStemFinalLetter: "k",
                sourceStemFinalType: "consonant",
                targetStemClass: "A",
                targetStemClassRule: "54.2.2-source-final",
                sourceFinalDeterminesTargetStemClass: true,
            },
        ]
    );
    const wFinalIAContractRoutePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "tlaw",
        contractId: "55.7-transitive-i-a",
    });
    const wFinalIARoute = wFinalIAContractRoutePreview.routes?.[0] || null;
    const wFinalIARequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        wFinalIARoute,
        { tense: "presente", objectPrefix: "ta" }
    );
    const wFinalIAExecution = ctx.executeNawatDenominalAndrewsContractRoute(
        wFinalIARoute,
        { tense: "presente", objectPrefix: "ta" }
    );
    const iaClassicalSourceFinalPattern = {
        majority: ["[c]", "/l/"],
        attestedMinority: ["/k/", "/n/"],
        nawatOrthographyBoundary: "Classical [c] and /k/ both realize as Nawat k here.",
    };
    s.eq(
        "Andrews 55.7 i-a route carries w-final ambiguity into request and execution provenance",
        {
            sourceStem: wFinalIAContractRoutePreview.sourceStem,
            routeCount: wFinalIAContractRoutePreview.routeCount,
            routeDiagnosticCount: wFinalIAContractRoutePreview.routeDiagnosticCount,
            routeWarningCount: wFinalIAContractRoutePreview.routeWarningCount,
            routeNoteCount: wFinalIAContractRoutePreview.routeNoteCount,
            routeTemplateId: wFinalIARoute?.routeTemplateId || "",
            targetInputValue: wFinalIARoute?.targetInputValue || "",
            noIntransitiveCounterpart: wFinalIARoute?.boundaries?.noIntransitiveCounterpart === true,
            majoritySourceFinalLetters: wFinalIARoute?.boundaries?.majoritySourceFinalLetters || [],
            sourceFinalPatternStatus: wFinalIARoute?.sourceFinalPatternStatus || "",
            sourceFinalPatternLabel: wFinalIARoute?.sourceFinalPatternLabel || "",
            attestedSourceFinalLetters: wFinalIARoute?.attestedSourceFinalLetters || [],
            attestedMinoritySourceFinalLetters: wFinalIARoute?.attestedMinoritySourceFinalLetters || [],
            classicalSourceFinalPattern: wFinalIARoute?.classicalSourceFinalPattern || null,
            wFinalSourceMayBeHuia: wFinalIARoute?.boundaries?.wFinalSourceMayBeHuia === true,
            sourceIFormMayBelongToNounstem: wFinalIARoute?.boundaries?.sourceIFormMayBelongToNounstem === true,
            sourceIHuiCausativePathPossible: wFinalIARoute?.boundaries?.sourceIHuiCausativePathPossible === true,
            diagnosticIds: (wFinalIARoute?.routeDiagnostics || []).map((diagnostic) => diagnostic.id),
            alternateContractId: wFinalIARoute?.routeDiagnostics?.[0]?.alternateContractId || "",
            requestDiagnosticCount: wFinalIARequest?.denominalAndrewsContractRoute?.routeDiagnosticCount || 0,
            requestWarningCount: wFinalIARequest?.denominalAndrewsContractRoute?.routeWarningCount || 0,
            requestNoteCount: wFinalIARequest?.denominalAndrewsContractRoute?.routeNoteCount || 0,
            requestDiagnosticIds: (wFinalIARequest?.denominalAndrewsContractRoute?.routeDiagnostics || []).map((diagnostic) => diagnostic.id),
            requestWFinalSourceMayBeHuia: wFinalIARequest?.denominalAndrewsContractRoute?.boundaries?.wFinalSourceMayBeHuia === true,
            requestSourceFinalPatternStatus: wFinalIARequest?.denominalAndrewsContractRoute?.sourceFinalPatternStatus || "",
            requestSourceFinalPatternLabel: wFinalIARequest?.denominalAndrewsContractRoute?.sourceFinalPatternLabel || "",
            requestAttestedSourceFinalLetters: wFinalIARequest?.denominalAndrewsContractRoute?.attestedSourceFinalLetters || [],
            requestAttestedMinoritySourceFinalLetters: wFinalIARequest?.denominalAndrewsContractRoute?.attestedMinoritySourceFinalLetters || [],
            requestClassicalSourceFinalPattern: wFinalIARequest?.denominalAndrewsContractRoute?.classicalSourceFinalPattern || null,
            executionDiagnosticCount: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.routeDiagnosticCount || 0,
            executionWarningCount: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.routeWarningCount || 0,
            executionNoteCount: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.routeNoteCount || 0,
            executionDiagnosticIds: (wFinalIAExecution?.denominalAndrewsContractRouteExecution?.routeDiagnostics || []).map((diagnostic) => diagnostic.id),
            executionWFinalSourceMayBeHuia: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.boundaries?.wFinalSourceMayBeHuia === true,
            executionSourceFinalPatternStatus: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.sourceFinalPatternStatus || "",
            executionSourceFinalPatternLabel: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.sourceFinalPatternLabel || "",
            executionAttestedSourceFinalLetters: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.attestedSourceFinalLetters || [],
            executionAttestedMinoritySourceFinalLetters: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.attestedMinoritySourceFinalLetters || [],
            executionClassicalSourceFinalPattern: wFinalIAExecution?.denominalAndrewsContractRouteExecution?.classicalSourceFinalPattern || null,
        },
        {
            sourceStem: "tlaw",
            routeCount: 1,
            routeDiagnosticCount: 3,
            routeWarningCount: 1,
            routeNoteCount: 2,
            routeTemplateId: "i-a",
            targetInputValue: "(tlaw)-(ia)",
            noIntransitiveCounterpart: true,
            majoritySourceFinalLetters: ["k", "l"],
            sourceFinalPatternStatus: "w-final-huia-ambiguous",
            sourceFinalPatternLabel: "final w: puede ser huia",
            attestedSourceFinalLetters: ["k", "l", "n"],
            attestedMinoritySourceFinalLetters: ["n"],
            classicalSourceFinalPattern: iaClassicalSourceFinalPattern,
            wFinalSourceMayBeHuia: true,
            sourceIFormMayBelongToNounstem: true,
            sourceIHuiCausativePathPossible: true,
            diagnosticIds: [
                "andrews-55.7-i-a-w-final-source-may-be-huia",
                "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
                "andrews-55.7-i-a-source-i-hui-causative-path-possible",
            ],
            alternateContractId: "55.3-intransitive-o-a-applicative-huia",
            requestDiagnosticCount: 3,
            requestWarningCount: 1,
            requestNoteCount: 2,
            requestDiagnosticIds: [
                "andrews-55.7-i-a-w-final-source-may-be-huia",
                "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
                "andrews-55.7-i-a-source-i-hui-causative-path-possible",
            ],
            requestWFinalSourceMayBeHuia: true,
            requestSourceFinalPatternStatus: "w-final-huia-ambiguous",
            requestSourceFinalPatternLabel: "final w: puede ser huia",
            requestAttestedSourceFinalLetters: ["k", "l", "n"],
            requestAttestedMinoritySourceFinalLetters: ["n"],
            requestClassicalSourceFinalPattern: iaClassicalSourceFinalPattern,
            executionDiagnosticCount: 3,
            executionWarningCount: 1,
            executionNoteCount: 2,
            executionDiagnosticIds: [
                "andrews-55.7-i-a-w-final-source-may-be-huia",
                "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
                "andrews-55.7-i-a-source-i-hui-causative-path-possible",
            ],
            executionWFinalSourceMayBeHuia: true,
            executionSourceFinalPatternStatus: "w-final-huia-ambiguous",
            executionSourceFinalPatternLabel: "final w: puede ser huia",
            executionAttestedSourceFinalLetters: ["k", "l", "n"],
            executionAttestedMinoritySourceFinalLetters: ["n"],
            executionClassicalSourceFinalPattern: iaClassicalSourceFinalPattern,
        }
    );
    const nFinalIAContractRoutePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "ton",
        contractId: "55.7-transitive-i-a",
    });
    const nFinalIARoute = nFinalIAContractRoutePreview.routes?.[0] || null;
    const nFinalIARequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        nFinalIARoute,
        { tense: "presente", objectPrefix: "ta" }
    );
    s.eq(
        "Andrews 55.7 i-a route keeps n-final examples as diagnostic source-final metadata",
        {
            sourceStem: nFinalIAContractRoutePreview.sourceStem,
            routeCount: nFinalIAContractRoutePreview.routeCount,
            routeDiagnosticCount: nFinalIAContractRoutePreview.routeDiagnosticCount,
            routeWarningCount: nFinalIAContractRoutePreview.routeWarningCount,
            routeNoteCount: nFinalIAContractRoutePreview.routeNoteCount,
            sourceStemFinalLetter: nFinalIARoute?.sourceStemFinalLetter || "",
            sourceFinalPatternStatus: nFinalIARoute?.sourceFinalPatternStatus || "",
            sourceFinalPatternLabel: nFinalIARoute?.sourceFinalPatternLabel || "",
            diagnosticIds: (nFinalIARoute?.routeDiagnostics || []).map((diagnostic) => diagnostic.id),
            requestSourceFinalPatternStatus: nFinalIARequest?.denominalAndrewsContractRoute?.sourceFinalPatternStatus || "",
            requestSourceFinalPatternLabel: nFinalIARequest?.denominalAndrewsContractRoute?.sourceFinalPatternLabel || "",
            requestAttestedSourceFinalLetters: nFinalIARequest?.denominalAndrewsContractRoute?.attestedSourceFinalLetters || [],
            requestAttestedMinoritySourceFinalLetters: nFinalIARequest?.denominalAndrewsContractRoute?.attestedMinoritySourceFinalLetters || [],
            requestClassicalSourceFinalPattern: nFinalIARequest?.denominalAndrewsContractRoute?.classicalSourceFinalPattern || null,
        },
        {
            sourceStem: "ton",
            routeCount: 1,
            routeDiagnosticCount: 3,
            routeWarningCount: 0,
            routeNoteCount: 3,
            sourceStemFinalLetter: "n",
            sourceFinalPatternStatus: "attested-minority",
            sourceFinalPatternLabel: "final atestiguada Andrews 55.7: n",
            diagnosticIds: [
                "andrews-55.7-i-a-source-final-attested-minority",
                "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
                "andrews-55.7-i-a-source-i-hui-causative-path-possible",
            ],
            requestSourceFinalPatternStatus: "attested-minority",
            requestSourceFinalPatternLabel: "final atestiguada Andrews 55.7: n",
            requestAttestedSourceFinalLetters: ["k", "l", "n"],
            requestAttestedMinoritySourceFinalLetters: ["n"],
            requestClassicalSourceFinalPattern: iaClassicalSourceFinalPattern,
        }
    );
    s.eq(
        "Lessons 54-55 Andrews contract route preview keeps ti-derived causative and applicative target inputs segmented",
        [
            findAndrewsContractRoute("54.2-54.4-ti-lia-causative", "ti-lia"),
            findAndrewsContractRoute("54.5-ti-a-causative", "ti-a"),
            findAndrewsContractRoute("54.6-t-ia-applicative", "t-ia"),
            findAndrewsContractRoute("55.2-tla-ti-lia-applicative", "tla-ti-lia"),
            findAndrewsContractRoute("55.2-intransitive-tla-ti-a-causative", "intransitive-tla-ti-a"),
            findAndrewsContractRoute("55.2-intransitive-tla-ti-lia-applicative", "intransitive-tla-ti-lia"),
        ].map((route) => ({
            contractId: route.contractId,
            routeTemplateId: route.routeTemplateId,
            targetVerbStem: route.targetVerbStem,
            targetInputValue: route.targetInputValue,
            targetValency: route.targetValency,
            replaciveTiFinalIDeleted: route.boundaries.replaciveTiFinalIDeleted,
            sourceTlaReplacedByTiBeforeA: route.boundaries.sourceTlaReplacedByTiBeforeA,
            sourceTlaReplacedByTiBeforeLia: route.boundaries.sourceTlaReplacedByTiBeforeLia,
        })),
        [
            {
                contractId: "54.2-54.4-ti-lia-causative",
                routeTemplateId: "ti-lia",
                targetVerbStem: "pusuktilia",
                targetInputValue: "(pusukti)-(lia)",
                targetValency: "transitive",
                replaciveTiFinalIDeleted: false,
                sourceTlaReplacedByTiBeforeA: false,
                sourceTlaReplacedByTiBeforeLia: false,
            },
            {
                contractId: "54.5-ti-a-causative",
                routeTemplateId: "ti-a",
                targetVerbStem: "pusuktia",
                targetInputValue: "(pusukti)-(a)",
                targetValency: "transitive",
                replaciveTiFinalIDeleted: false,
                sourceTlaReplacedByTiBeforeA: false,
                sourceTlaReplacedByTiBeforeLia: false,
            },
            {
                contractId: "54.6-t-ia-applicative",
                routeTemplateId: "t-ia",
                targetVerbStem: "pusuktia",
                targetInputValue: "(pusukt)-(ia)",
                targetValency: "applicative",
                replaciveTiFinalIDeleted: true,
                sourceTlaReplacedByTiBeforeA: false,
                sourceTlaReplacedByTiBeforeLia: false,
            },
            {
                contractId: "55.2-tla-ti-lia-applicative",
                routeTemplateId: "tla-ti-lia",
                targetVerbStem: "pusuktilia",
                targetInputValue: "(pusukti)-(lia)",
                targetValency: "applicative",
                replaciveTiFinalIDeleted: false,
                sourceTlaReplacedByTiBeforeA: false,
                sourceTlaReplacedByTiBeforeLia: true,
            },
            {
                contractId: "55.2-intransitive-tla-ti-a-causative",
                routeTemplateId: "intransitive-tla-ti-a",
                targetVerbStem: "pusuktia",
                targetInputValue: "(pusukti)-(a)",
                targetValency: "transitive",
                replaciveTiFinalIDeleted: false,
                sourceTlaReplacedByTiBeforeA: true,
                sourceTlaReplacedByTiBeforeLia: false,
            },
            {
                contractId: "55.2-intransitive-tla-ti-lia-applicative",
                routeTemplateId: "intransitive-tla-ti-lia",
                targetVerbStem: "pusuktilia",
                targetInputValue: "(pusukti)-(lia)",
                targetValency: "applicative",
                replaciveTiFinalIDeleted: false,
                sourceTlaReplacedByTiBeforeA: false,
                sourceTlaReplacedByTiBeforeLia: true,
            },
        ]
    );
    const huiRouteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui"),
        { tense: "presente" }
    );
    const includedPossessorRoute = findAndrewsContractRoute("54.3-included-possessor-ti", "included-possessor-ti");
    const tiLiaRoute = findAndrewsContractRoute("54.2-54.4-ti-lia-causative", "ti-lia");
    const tiARoute = findAndrewsContractRoute("54.5-ti-a-causative", "ti-a");
    const tIaRoute = findAndrewsContractRoute("54.6-t-ia-applicative", "t-ia");
    const huiLiaRoute = findAndrewsContractRoute("54.2.2-hui-lia-causative", "hui-lia");
    const yaLiaRoute = findAndrewsContractRoute("54.2.3-ya-lia-causative", "ya-lia");
    const temporalRoute = findAndrewsContractRoute("55.1-temporal-tia", "tia");
    const tlaApplicativeRoute = findAndrewsContractRoute("55.2-tla-ti-lia-applicative", "tla-ti-lia");
    const intransitiveTlaTiARoute = findAndrewsContractRoute("55.2-intransitive-tla-ti-a-causative", "intransitive-tla-ti-a");
    const intransitiveTlaTiLiaRoute = findAndrewsContractRoute("55.2-intransitive-tla-ti-lia-applicative", "intransitive-tla-ti-lia");
    const oAIlHuiaRoute = findAndrewsContractRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-i-l-huia");
    const oAAlHuiaRoute = findAndrewsContractRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-a-l-huia");
    const adverbialHuiaRoute = findAndrewsContractRoute("55.4-adverbial-huia", "adverbial-huia");
    const relationalOaRoute = findAndrewsContractRoute("55.5-relational-compound-o-a-huia", "relational-o-a");
    const relationalHuiaRoute = findAndrewsContractRoute("55.5-relational-compound-o-a-huia", "relational-huia");
    const ihuiCausativeRoute = findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "o-a");
    const includedPossessorSatisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "nukal",
        contractId: "54.3-included-possessor-ti",
        sourceEvidence: { possessiveState: true },
    });
    const includedPossessorSatisfiedRoute = includedPossessorSatisfiedPreview.routes?.[0] || null;
    s.eq(
        "Andrews source-limited denominal routes require source evidence before finite VNC requests",
        {
            includedFiniteAvailable: includedPossessorRoute?.finiteGenerationContractAvailable === true,
            includedRequirementIds: includedPossessorRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            includedRequest: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                includedPossessorRoute,
                { tense: "presente" }
            ),
            tiLiaRequirementIds: tiLiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            tiLiaRequest: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tiLiaRoute,
                { tense: "presente", objectPrefix: "ta" }
            ),
            tiARequirementIds: tiARoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            tiARequest: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tiARoute,
                { tense: "presente", objectPrefix: "ta" }
            ),
            tIaRequirementIds: tIaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            tIaRequest: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tIaRoute,
                { tense: "presente", objectPrefix: "ta" }
            ),
            huiLiaRequirementIds: huiLiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            huiLiaRequest: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiLiaRoute,
                { tense: "presente", objectPrefix: "ta" }
            ),
            yaLiaRequirementIds: yaLiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            yaLiaRequest: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                yaLiaRoute,
                { tense: "presente", objectPrefix: "ta" }
            ),
            temporalRequirementIds: temporalRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            tlaApplicativeRequirementIds: tlaApplicativeRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            intransitiveTlaTiARequirementIds: intransitiveTlaTiARoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            intransitiveTlaTiLiaRequirementIds: intransitiveTlaTiLiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            oAIlHuiaRequirementIds: oAIlHuiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            oAAlHuiaRequirementIds: oAAlHuiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            adverbialRequirementIds: adverbialHuiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            relationalOaRequirementIds: relationalOaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            relationalHuiaRequirementIds: relationalHuiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            ihuiCausativeRequirementIds: ihuiCausativeRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            satisfiedFiniteAvailable: includedPossessorSatisfiedRoute?.finiteGenerationContractAvailable === true,
            satisfiedRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                includedPossessorSatisfiedRoute,
                { tense: "presente" }
            )?.prefixInputs?.verb || "",
        },
        {
            includedFiniteAvailable: false,
            includedRequirementIds: ["possessive-state-nnc-predicate"],
            includedRequest: null,
            tiLiaRequirementIds: ["intransitive-ti-verbstem-source"],
            tiLiaRequest: null,
            tiARequirementIds: ["intransitive-ti-verbstem-source"],
            tiARequest: null,
            tIaRequirementIds: ["intransitive-ti-verbstem-source"],
            tIaRequest: null,
            huiLiaRequirementIds: ["intransitive-hui-verbstem-source"],
            huiLiaRequest: null,
            yaLiaRequirementIds: ["intransitive-ya-verbstem-source"],
            yaLiaRequest: null,
            temporalRequirementIds: ["temporal-compound-nounstem"],
            tlaApplicativeRequirementIds: ["tla-causative-source"],
            intransitiveTlaTiARequirementIds: ["intransitive-tla-verbstem-source"],
            intransitiveTlaTiLiaRequirementIds: ["intransitive-tla-verbstem-source"],
            oAIlHuiaRequirementIds: ["intransitive-o-a-verbstem-source"],
            oAAlHuiaRequirementIds: ["intransitive-o-a-verbstem-source"],
            adverbialRequirementIds: ["adverbial-nounstem"],
            relationalOaRequirementIds: ["relational-compound-or-possessive-relational-predicate"],
            relationalHuiaRequirementIds: ["relational-compound-or-possessive-relational-predicate"],
            ihuiCausativeRequirementIds: ["i-hui-a-hui-source"],
            satisfiedFiniteAvailable: true,
            satisfiedRequestVerb: "(nukalti)",
        }
    );
    const temporalTiaSourcePreview = ctx.previewNawatDenominalAndrewsTemporalTiaRouteFromSource({
        sourceStem: "seilwi",
        timeSegmentMatrix: "ilwi",
        numeralEmbed: "se",
    });
    const temporalTiaSatisfiedRoute = temporalTiaSourcePreview?.routePreview?.routes?.[0] || null;
    const locativoTemporalPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "nemiyan",
        contractId: "55.1-temporal-tia",
        sourceEvidence: {
            sourceCategory: "locativo-temporal",
            sourceBaseStem: "nemiyan",
        },
    });
    const locativoTemporalRoute = locativoTemporalPreview?.routes?.[0] || null;
    s.eq(
        "Andrews 55.1 explicit temporal-compound source classification satisfies the temporal tia route contract",
        {
            temporalSourceEvidence: temporalTiaSourcePreview?.sourceEvidence || null,
            temporalCandidateRouteCount: temporalTiaSourcePreview?.candidateRouteCount || 0,
            temporalFiniteRouteRequestCount: temporalTiaSourcePreview?.finiteRouteRequestCount || 0,
            temporalFiniteRouteObjectPrefixRequiredCount: temporalTiaSourcePreview?.finiteRouteObjectPrefixRequiredCount || 0,
            temporalRequirementStatus: temporalTiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            temporalRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                temporalTiaSatisfiedRoute,
                { tense: "presente" }
            )?.prefixInputs?.verb || "",
            temporalObjectExpected: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                temporalTiaSatisfiedRoute,
                { tense: "presente" }
            )?.denominalAndrewsContractRoute?.objectSlotExpected === true,
            rejectsMissingSource: ctx.previewNawatDenominalAndrewsTemporalTiaRouteFromSource({}),
            rejectsMissingTemporalMatrix: ctx.previewNawatDenominalAndrewsTemporalTiaRouteFromSource({
                sourceStem: "seilwi",
                numeralEmbed: "se",
            }),
            rejectsMissingTemporalNumeral: ctx.previewNawatDenominalAndrewsTemporalTiaRouteFromSource({
                sourceStem: "seilwi",
                timeSegmentMatrix: "ilwi",
            }),
            locativoTemporalRequirementStatus: locativoTemporalRoute?.sourceRequirement?.validationStatus || "",
            locativoTemporalRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                locativoTemporalRoute,
                { tense: "presente" }
            )?.prefixInputs?.verb || "",
        },
        {
            temporalSourceEvidence: {
                temporalCompoundSource: true,
                sourceState: "absolutive",
                sourceCategory: "compound-temporal-nounstem",
                sourceSurface: "seilwi",
                sourceBaseStem: "seilwi",
                timeSegmentMatrix: "ilwi",
                numeralEmbed: "se",
                sourceFormulaEcho: "",
                sourceNote: "",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromExplicitSourceClassification: true,
                    sourceEvidenceSupportsTemporalTiaIntransitive: true,
                    sourceMustBeConfirmedTemporalCompoundNounstem: true,
                    temporalMatrixMustBeTimeSegment: true,
                    temporalEmbedMustBeNumeralNounstem: true,
                    doesNotTreatLocativoTemporalNominalAsAutomaticEvidence: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            temporalCandidateRouteCount: 1,
            temporalFiniteRouteRequestCount: 1,
            temporalFiniteRouteObjectPrefixRequiredCount: 0,
            temporalRequirementStatus: "source-evidence-satisfied",
            temporalRequestVerb: "(seilwitia)",
            temporalObjectExpected: false,
            rejectsMissingSource: null,
            rejectsMissingTemporalMatrix: null,
            rejectsMissingTemporalNumeral: null,
            locativoTemporalRequirementStatus: "source-evidence-required",
            locativoTemporalRequestVerb: "",
        }
    );
    const adverbialHuiaSourcePreview = ctx.previewNawatDenominalAndrewsAdverbialHuiaRouteFromSource({
        sourceStem: "achpa",
    });
    const adverbialHuiaSatisfiedRoute = adverbialHuiaSourcePreview?.routePreview?.routes?.[0] || null;
    const relationalSourcePreview = ctx.previewNawatDenominalAndrewsRelationalCompoundRouteFromSource({
        sourceStem: "kalpan",
    });
    const relationalOaSatisfiedRoute = relationalSourcePreview?.routePreview?.routes
        ?.find((route) => route.routeTemplateId === "relational-o-a");
    const relationalHuiaSatisfiedRoute = relationalSourcePreview?.routePreview?.routes
        ?.find((route) => route.routeTemplateId === "relational-huia");
    s.eq(
        "Andrews 55.4 and 55.5 explicit source classifications satisfy adverbial and relational route contracts",
        {
            adverbialSourceEvidence: adverbialHuiaSourcePreview?.sourceEvidence || null,
            adverbialCandidateRouteCount: adverbialHuiaSourcePreview?.candidateRouteCount || 0,
            adverbialFiniteRouteRequestCount: adverbialHuiaSourcePreview?.finiteRouteRequestCount || 0,
            adverbialRequirementStatus: adverbialHuiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            adverbialRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                adverbialHuiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            relationalSourceEvidence: relationalSourcePreview?.sourceEvidence || null,
            relationalCandidateRouteCount: relationalSourcePreview?.candidateRouteCount || 0,
            relationalFiniteRouteRequestCount: relationalSourcePreview?.finiteRouteRequestCount || 0,
            relationalOaRequirementStatus: relationalOaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            relationalOaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                relationalOaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            relationalHuiaRequirementStatus: relationalHuiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            relationalHuiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                relationalHuiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            adverbialSourceEvidence: {
                adverbialSource: true,
                sourceState: "adverbialized",
                sourceCategory: "adverbial-nounstem",
                sourceSurface: "achpa",
                sourceBaseStem: "achpa",
                sourceFormulaEcho: "",
                sourceNote: "",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromExplicitSourceClassification: true,
                    sourceEvidenceSupportsAdverbialHuiaApplicative: true,
                    sourceMustBeConfirmedAdverbialNounstem: true,
                    doesNotTreatLegacyAdverbioAsAutomaticEvidence: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            adverbialCandidateRouteCount: 1,
            adverbialFiniteRouteRequestCount: 1,
            adverbialRequirementStatus: "source-evidence-satisfied",
            adverbialRequestVerb: "(achpa)-(wia)",
            relationalSourceEvidence: {
                relationalCompoundSource: true,
                sourceState: "relational",
                sourceCategory: "compound-relational-nounstem",
                sourceSurface: "kalpan",
                sourceBaseStem: "kalpan",
                sourceFormulaEcho: "",
                sourceNote: "",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromExplicitSourceClassification: true,
                    sourceEvidenceSupportsRelationalOaHuia: true,
                    sourceMustBeConfirmedRelationalCompoundOrPredicate: true,
                    doesNotTreatRelationalBoundaryFrameAsAutomaticEvidence: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            relationalCandidateRouteCount: 2,
            relationalFiniteRouteRequestCount: 2,
            relationalOaRequirementStatus: "source-evidence-satisfied",
            relationalOaRequestVerb: "(kalpan)-(ua)",
            relationalHuiaRequirementStatus: "source-evidence-satisfied",
            relationalHuiaRequestVerb: "(kalpan)-(wia)",
        }
    );
    const kalPossessiveNnc = ctx.generateOrdinaryNncParadigm({
        stem: "kal",
        state: "possessive",
        possessor: "nu",
    });
    const kalAbsolutiveNnc = ctx.generateOrdinaryNncParadigm({
        stem: "kal",
        state: "absolutive",
    });
    const includedPossessorFromNncPreview = ctx.previewNawatDenominalAndrewsIncludedPossessorRouteFromOrdinaryNncOutput(
        kalPossessiveNnc
    );
    const includedPossessorFromNncRoute = includedPossessorFromNncPreview?.routePreview?.routes?.[0] || null;
    s.eq(
        "Andrews 54.3 included-possessor route consumes generated possessive NNC output as source evidence",
        {
            sourceEvidence: includedPossessorFromNncPreview?.sourceEvidence || null,
            routeCount: includedPossessorFromNncPreview?.candidateRouteCount || 0,
            routeRequirementStatus: includedPossessorFromNncRoute?.sourceRequirement?.validationStatus || "",
            requestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                includedPossessorFromNncRoute,
                { tense: "presente" }
            )?.prefixInputs?.verb || "",
            requestObjectExpected: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                includedPossessorFromNncRoute,
                { tense: "presente" }
            )?.denominalAndrewsContractRoute?.objectSlotExpected === true,
            absolutiveEvidence: ctx.buildNawatDenominalAndrewsRouteSourceEvidenceFromOrdinaryNncOutput(kalAbsolutiveNnc),
        },
        {
            sourceEvidence: {
                possessiveState: true,
                sourceState: "possessive",
                sourceCategory: "possessive-state-nnc-predicate",
                sourceSurface: "nukal",
                sourceBaseStem: "nukal",
                sourcePredicateStem: "kal",
                sourcePossessorPrefix: "nu",
                sourceFormulaEcho: "#Ø...Ø(kal)Ø#",
                sourceOutputKind: "nominal-nuclear-clause",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                    possessorIncludedInsideVerbstem: true,
                    possessiveCaseNotTransformedToObjective: true,
                    usesNawatSourceSurface: true,
                },
            },
            routeCount: 1,
            routeRequirementStatus: "source-evidence-satisfied",
            requestVerb: "(nukalti)",
            requestObjectExpected: false,
            absolutiveEvidence: null,
        }
    );
    const possessionTiFromNncPreview = ctx.previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput(
        kalAbsolutiveNnc
    );
    const possessionTiFromPossessiveNncPreview = ctx.previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput(
        kalPossessiveNnc
    );
    const possessionTiFromNncRoute = possessionTiFromNncPreview?.routePreview?.routes?.[0] || null;
    s.eq(
        "Andrews 54.4 possession ti route consumes generated ordinary NNC predicate stem as source",
        {
            sourceEvidence: possessionTiFromNncPreview?.sourceEvidence || null,
            routeCount: possessionTiFromNncPreview?.candidateRouteCount || 0,
            routeTargetStemClass: possessionTiFromNncRoute?.targetStemClass || "",
            routeNoDeverbalYa: possessionTiFromNncRoute?.boundaries?.possessionTiDoesNotFormDeverbalYa === true,
            requestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                possessionTiFromNncRoute,
                { tense: "presente" }
            )?.prefixInputs?.verb || "",
            possessivePreviewSourceStem: possessionTiFromPossessiveNncPreview?.sourceStem || "",
        },
        {
            sourceEvidence: {
                possessionTiSource: true,
                sourceState: "absolutive",
                sourceCategory: "ordinary-nnc-predicate-nounstem",
                sourceSurface: "kal",
                sourceBaseStem: "kal",
                sourcePredicateStem: "kal",
                sourceFormulaEcho: "#Ø...Ø(kal)Ø#",
                sourceOutputKind: "nominal-nuclear-clause",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                    sourceNounstemFromPredicate: true,
                    possessionTiSourceFocusesNounstem: true,
                    possessionTiDoesNotFormDeverbalYa: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            routeCount: 1,
            routeTargetStemClass: "A/B",
            routeNoDeverbalYa: true,
            requestVerb: "(kalti)",
            possessivePreviewSourceStem: "kal",
        }
    );
    const inceptiveTiRoute = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
    const inceptiveTiNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(inceptiveTiRoute);
    const inceptiveTiLiaSatisfiedRoute = inceptiveTiNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2-54.4-ti-lia-causative" && route.routeTemplateId === "ti-lia");
    const inceptiveTiASatisfiedRoute = inceptiveTiNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.5-ti-a-causative" && route.routeTemplateId === "ti-a");
    const inceptiveTIaSatisfiedRoute = inceptiveTiNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.6-t-ia-applicative" && route.routeTemplateId === "t-ia");
    s.eq(
        "Andrews 54.2 generated inceptive-stative ti source satisfies ti-derived continuation contracts",
        {
            sourceEvidence: inceptiveTiNextPreview?.sourceEvidence || null,
            nextSource: inceptiveTiNextPreview?.nextSource || null,
            tiLiaFiniteAvailable: inceptiveTiLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiLiaRequirementStatus: inceptiveTiLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            tiLiaRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.objectPrefix || "",
            tiAFiniteAvailable: inceptiveTiASatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiARequirementStatus: inceptiveTiASatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiASatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            tIaFiniteAvailable: inceptiveTIaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tIaRequirementStatus: inceptiveTIaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tIaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTIaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            sourceEvidence: {
                tiSource: true,
                sourceCategory: "inceptive-stative-ti-source",
                sourceState: "derived",
                sourceContractId: "54.2.1-inceptive-stative-ti",
                sourceRouteTemplateId: "ti",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukti",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsTiLiaCausative: true,
                    sourceEvidenceSupportsTiACausative: true,
                    sourceEvidenceSupportsTIaApplicative: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusukti)",
                displaySurface: "pusukti",
                sourceEvidence: {
                    tiSource: true,
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceState: "derived",
                    sourceContractId: "54.2.1-inceptive-stative-ti",
                    sourceRouteTemplateId: "ti",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                        sourceEvidenceSupportsTiLiaCausative: true,
                        sourceEvidenceSupportsTiACausative: true,
                        sourceEvidenceSupportsTIaApplicative: true,
                    },
                },
            },
            tiLiaFiniteAvailable: true,
            tiLiaRequirementStatus: "source-evidence-satisfied",
            tiLiaRequestVerb: "(pusukti)-(lia)",
            tiLiaRequestObjectPrefix: "ta",
            tiAFiniteAvailable: true,
            tiARequirementStatus: "source-evidence-satisfied",
            tiARequestVerb: "(pusukti)-(a)",
            tIaFiniteAvailable: true,
            tIaRequirementStatus: "source-evidence-satisfied",
            tIaRequestVerb: "(pusukt)-(ia)",
        }
    );
    const possessionTiNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(possessionTiFromNncRoute);
    const possessionTiLiaSatisfiedRoute = possessionTiNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2-54.4-ti-lia-causative" && route.routeTemplateId === "ti-lia");
    const possessionTiASatisfiedRoute = possessionTiNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.5-ti-a-causative" && route.routeTemplateId === "ti-a");
    const possessionTIaSatisfiedRoute = possessionTiNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.6-t-ia-applicative" && route.routeTemplateId === "t-ia");
    s.eq(
        "Andrews 54.4 generated possession ti source also satisfies ti-derived continuation contracts",
        {
            sourceEvidence: possessionTiNextPreview?.sourceEvidence || null,
            tiLiaFiniteAvailable: possessionTiLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiLiaRequirementStatus: possessionTiLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                possessionTiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            tiAFiniteAvailable: possessionTiASatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiARequirementStatus: possessionTiASatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                possessionTiASatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            tIaFiniteAvailable: possessionTIaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tIaRequirementStatus: possessionTIaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tIaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                possessionTIaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            sourceEvidence: {
                tiSource: true,
                possessionTiVerbstemSource: true,
                sourceCategory: "possession-ti-verbstem-source",
                sourceState: "derived",
                sourceContractId: "54.4-possession-ti",
                sourceRouteTemplateId: "possession-ti",
                sourceBaseStem: "kal",
                sourceVerbStem: "kalti",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsTiLiaCausative: true,
                    sourceEvidenceSupportsTiACausative: true,
                    sourceEvidenceSupportsTIaApplicative: true,
                    possessionTiSourceFocusesNounstem: true,
                    possessionTiDoesNotFormDeverbalYa: true,
                },
            },
            tiLiaFiniteAvailable: true,
            tiLiaRequirementStatus: "source-evidence-satisfied",
            tiLiaRequestVerb: "(kalti)-(lia)",
            tiAFiniteAvailable: true,
            tiARequirementStatus: "source-evidence-satisfied",
            tiARequestVerb: "(kalti)-(a)",
            tIaFiniteAvailable: true,
            tIaRequirementStatus: "source-evidence-satisfied",
            tIaRequestVerb: "(kalt)-(ia)",
        }
    );
    const huiAndrewsRoute = findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui");
    const huiAndrewsNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(huiAndrewsRoute);
    const huiLiaSatisfiedRoute = huiAndrewsNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.2-hui-lia-causative" && route.routeTemplateId === "hui-lia");
    s.eq(
        "Andrews 54.2 generated hui source satisfies the following hui-lia causative contract",
        {
            sourceEvidence: huiAndrewsNextPreview?.sourceEvidence || null,
            nextSource: huiAndrewsNextPreview?.nextSource || null,
            huiLiaFiniteAvailable: huiLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            huiLiaRequirementStatus: huiLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            huiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            huiLiaRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.objectPrefix || "",
        },
        {
            sourceEvidence: {
                huiSource: true,
                sourceCategory: "inceptive-stative-hui-source",
                sourceState: "derived",
                sourceContractId: "54.2.2-inceptive-stative-hui",
                sourceRouteTemplateId: "hui",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukwi",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsHuiLiaCausative: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusukwi)",
                displaySurface: "pusukwi",
                sourceEvidence: {
                    huiSource: true,
                    sourceCategory: "inceptive-stative-hui-source",
                    sourceState: "derived",
                    sourceContractId: "54.2.2-inceptive-stative-hui",
                    sourceRouteTemplateId: "hui",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                        sourceEvidenceSupportsHuiLiaCausative: true,
                    },
                },
            },
            huiLiaFiniteAvailable: true,
            huiLiaRequirementStatus: "source-evidence-satisfied",
            huiLiaRequestVerb: "(pusukwi)-(lia)",
            huiLiaRequestObjectPrefix: "ta",
        }
    );
    const yaAndrewsRoute = findAndrewsContractRoute("54.2.3-inceptive-stative-ya", "ya");
    const yaAndrewsNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(yaAndrewsRoute);
    const yaLiaSatisfiedRoute = yaAndrewsNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-ya-lia-causative" && route.routeTemplateId === "ya-lia");
    s.eq(
        "Andrews 54.2 generated ya source satisfies the following ya-deleting lia causative contract",
        {
            sourceEvidence: yaAndrewsNextPreview?.sourceEvidence || null,
            nextSource: yaAndrewsNextPreview?.nextSource || null,
            yaLiaFiniteAvailable: yaLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            yaLiaRequirementStatus: yaLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            yaLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                yaLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            yaLiaRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                yaLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.objectPrefix || "",
        },
        {
            sourceEvidence: {
                yaSource: true,
                sourceCategory: "inceptive-stative-ya-source",
                sourceState: "derived",
                sourceContractId: "54.2.3-inceptive-stative-ya",
                sourceRouteTemplateId: "ya",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukya",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsYaLiaCausative: true,
                    sourceYaDeletedBeforeLia: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusukya)",
                displaySurface: "pusukya",
                sourceEvidence: {
                    yaSource: true,
                    sourceCategory: "inceptive-stative-ya-source",
                    sourceState: "derived",
                    sourceContractId: "54.2.3-inceptive-stative-ya",
                    sourceRouteTemplateId: "ya",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukya",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                        sourceEvidenceSupportsYaLiaCausative: true,
                        sourceYaDeletedBeforeLia: true,
                    },
                },
            },
            yaLiaFiniteAvailable: true,
            yaLiaRequirementStatus: "source-evidence-satisfied",
            yaLiaRequestVerb: "(pusuk)-(lia)",
            yaLiaRequestObjectPrefix: "ta",
        }
    );
    const tlaCausativeRoute = findAndrewsContractRoute("55.2-causative-tla", "tla");
    const tlaCausativeNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(tlaCausativeRoute);
    const tlaApplicativeSatisfiedRoute = tlaCausativeNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "55.2-tla-ti-lia-applicative" && route.routeTemplateId === "tla-ti-lia");
    const tlaCausativeRouteRequestWithEvidence = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        tlaCausativeRoute,
        { tense: "presente", objectPrefix: "ta" }
    );
    const tlaCausativeRouteExecutionWithEvidence = ctx.executeNawatDenominalAndrewsContractRoute(
        tlaCausativeRoute,
        { tense: "presente", objectPrefix: "ta" }
    );
    s.eq(
        "Andrews 55.2 generated tla source satisfies the following tla to ti-lia route contract",
        {
            sourceEvidence: tlaCausativeNextPreview?.sourceEvidence || null,
            nextSource: tlaCausativeNextPreview?.nextSource || null,
            contractPreviewSourceStem: tlaCausativeNextPreview?.routePreview?.sourceStem || "",
            tlaApplicativeFiniteAvailable: tlaApplicativeSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tlaApplicativeRequirementStatus: tlaApplicativeSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tlaApplicativeRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tlaApplicativeSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            tlaApplicativeRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tlaApplicativeSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.objectPrefix || "",
            sourceRequestCanSatisfyLaterEvidence: tlaCausativeRouteRequestWithEvidence?.denominalAndrewsContractRoute?.boundaries?.canSatisfyLaterSourceEvidence === true,
            sourceExecutionCanSatisfyLaterEvidence: tlaCausativeRouteExecutionWithEvidence?.denominalAndrewsContractRouteExecution?.boundaries?.canSatisfyLaterSourceEvidence === true,
        },
        {
            sourceEvidence: {
                tlaCausativeSource: true,
                sourceCategory: "causative-tla",
                sourceContractId: "55.2-causative-tla",
                sourceRouteTemplateId: "tla",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukta",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusuk)-(ta)",
                displaySurface: "pusukta",
                sourceEvidence: {
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceContractId: "55.2-causative-tla",
                    sourceRouteTemplateId: "tla",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                    },
                },
            },
            contractPreviewSourceStem: "pusuk",
            tlaApplicativeFiniteAvailable: true,
            tlaApplicativeRequirementStatus: "source-evidence-satisfied",
            tlaApplicativeRequestVerb: "(pusukti)-(lia)",
            tlaApplicativeRequestObjectPrefix: "ta",
            sourceRequestCanSatisfyLaterEvidence: true,
            sourceExecutionCanSatisfyLaterEvidence: true,
        }
    );
    const intransitiveTlaRoute = findAndrewsContractRoute("55.2-intransitive-tla", "intransitive-tla");
    const intransitiveTlaNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(intransitiveTlaRoute);
    const intransitiveTlaTiASatisfiedRoute = intransitiveTlaNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "55.2-intransitive-tla-ti-a-causative" && route.routeTemplateId === "intransitive-tla-ti-a");
    const intransitiveTlaTiLiaSatisfiedRoute = intransitiveTlaNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "55.2-intransitive-tla-ti-lia-applicative" && route.routeTemplateId === "intransitive-tla-ti-lia");
    s.eq(
        "Andrews 55.2 generated intransitive tla source satisfies the ti-a and ti-lia note contracts",
        {
            sourceEvidence: intransitiveTlaNextPreview?.sourceEvidence || null,
            nextSource: intransitiveTlaNextPreview?.nextSource || null,
            contractPreviewSourceStem: intransitiveTlaNextPreview?.routePreview?.sourceStem || "",
            finiteRouteRequestCount: intransitiveTlaNextPreview?.routePreview?.finiteRouteRequestCount || 0,
            finiteRouteObjectPrefixRequiredCount: intransitiveTlaNextPreview?.routePreview?.finiteRouteObjectPrefixRequiredCount || 0,
            finiteRouteSourceEvidenceRequiredCount: intransitiveTlaNextPreview?.routePreview?.finiteRouteSourceEvidenceRequiredCount || 0,
            tiAFiniteAvailable: intransitiveTlaTiASatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiARequirementStatus: intransitiveTlaTiASatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                intransitiveTlaTiASatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            tiLiaFiniteAvailable: intransitiveTlaTiLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiLiaRequirementStatus: intransitiveTlaTiLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                intransitiveTlaTiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            sourceEvidence: {
                tlaIntransitiveSource: true,
                sourceCategory: "intransitive-tla",
                sourceContractId: "55.2-intransitive-tla",
                sourceRouteTemplateId: "intransitive-tla",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukta",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsIntransitiveTlaTiACausative: true,
                    sourceEvidenceSupportsIntransitiveTlaTiLiaApplicative: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusukta)",
                displaySurface: "pusukta",
                sourceEvidence: {
                    tlaIntransitiveSource: true,
                    sourceCategory: "intransitive-tla",
                    sourceContractId: "55.2-intransitive-tla",
                    sourceRouteTemplateId: "intransitive-tla",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                        sourceEvidenceSupportsIntransitiveTlaTiACausative: true,
                        sourceEvidenceSupportsIntransitiveTlaTiLiaApplicative: true,
                    },
                },
            },
            contractPreviewSourceStem: "pusuk",
            finiteRouteRequestCount: 15,
            finiteRouteObjectPrefixRequiredCount: 5,
            finiteRouteSourceEvidenceRequiredCount: 16,
            tiAFiniteAvailable: true,
            tiARequirementStatus: "source-evidence-satisfied",
            tiARequestVerb: "(pusukti)-(a)",
            tiLiaFiniteAvailable: true,
            tiLiaRequirementStatus: "source-evidence-satisfied",
            tiLiaRequestVerb: "(pusukti)-(lia)",
        }
    );
    const intransitiveOaRoute = findAndrewsContractRoute("55.3-intransitive-o-a-applicative-huia", "o-a");
    const intransitiveOaNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(intransitiveOaRoute);
    const oAIlHuiaSatisfiedRoute = intransitiveOaNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "55.3-o-a-il-huia-al-huia-applicative-note" && route.routeTemplateId === "o-a-i-l-huia");
    const oAAlHuiaSatisfiedRoute = intransitiveOaNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "55.3-o-a-il-huia-al-huia-applicative-note" && route.routeTemplateId === "o-a-a-l-huia");
    s.eq(
        "Andrews 55.3 generated intransitive o-a source satisfies the note 2 i-l-huia/a-l-huia applicative contracts",
        {
            sourceEvidence: intransitiveOaNextPreview?.sourceEvidence || null,
            nextSource: intransitiveOaNextPreview?.nextSource || null,
            contractPreviewSourceStem: intransitiveOaNextPreview?.routePreview?.sourceStem || "",
            finiteRouteRequestCount: intransitiveOaNextPreview?.routePreview?.finiteRouteRequestCount || 0,
            finiteRouteObjectPrefixRequiredCount: intransitiveOaNextPreview?.routePreview?.finiteRouteObjectPrefixRequiredCount || 0,
            finiteRouteSourceEvidenceRequiredCount: intransitiveOaNextPreview?.routePreview?.finiteRouteSourceEvidenceRequiredCount || 0,
            ilHuiaFiniteAvailable: oAIlHuiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            ilHuiaRequirementStatus: oAIlHuiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            ilHuiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                oAIlHuiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            alHuiaFiniteAvailable: oAAlHuiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            alHuiaRequirementStatus: oAAlHuiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            alHuiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                oAAlHuiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            sourceEvidence: {
                intransitiveOaSource: true,
                sourceCategory: "intransitive-o-a",
                sourceContractId: "55.3-intransitive-o-a-applicative-huia",
                sourceRouteTemplateId: "o-a",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukua",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsOaIlHuiaApplicative: true,
                    sourceOaBypassesTransitiveOaStep: true,
                    hypotheticalIHuiAHuiSource: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusukua)",
                displaySurface: "pusukua",
                sourceEvidence: {
                    intransitiveOaSource: true,
                    sourceCategory: "intransitive-o-a",
                    sourceContractId: "55.3-intransitive-o-a-applicative-huia",
                    sourceRouteTemplateId: "o-a",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukua",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                        sourceEvidenceSupportsOaIlHuiaApplicative: true,
                        sourceOaBypassesTransitiveOaStep: true,
                        hypotheticalIHuiAHuiSource: true,
                    },
                },
            },
            contractPreviewSourceStem: "pusuk",
            finiteRouteRequestCount: 15,
            finiteRouteObjectPrefixRequiredCount: 5,
            finiteRouteSourceEvidenceRequiredCount: 16,
            ilHuiaFiniteAvailable: true,
            ilHuiaRequirementStatus: "source-evidence-satisfied",
            ilHuiaRequestVerb: "(pusuk)-(ilwia)",
            alHuiaFiniteAvailable: true,
            alHuiaRequirementStatus: "source-evidence-satisfied",
            alHuiaRequestVerb: "(pusuk)-(alwia)",
        }
    );
    const iHuiAndrewsRoute = findAndrewsContractRoute("55.6-i-hui-a-hui-to-o-a", "i-hui");
    const iHuiAndrewsNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(iHuiAndrewsRoute);
    const iHuiAndrewsSatisfiedOA = iHuiAndrewsNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "55.6-i-hui-a-hui-to-o-a" && route.routeTemplateId === "o-a");
    s.eq(
        "Andrews 55.6 generated i-hui source also satisfies the o-a counterpart route contract",
        {
            sourceEvidence: iHuiAndrewsNextPreview?.sourceEvidence || null,
            oAFiniteAvailable: iHuiAndrewsSatisfiedOA?.finiteGenerationContractAvailable === true,
            oARequirementStatus: iHuiAndrewsSatisfiedOA?.sourceRequirement?.validationStatus || "",
            oARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                iHuiAndrewsSatisfiedOA,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            sourceEvidence: {
                iHuiOrAHuiSource: true,
                sourceCategory: "i-hui-a-hui-source",
                sourceContractId: "55.6-i-hui-a-hui-to-o-a",
                sourceRouteTemplateId: "i-hui",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukiwi",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            oAFiniteAvailable: true,
            oARequirementStatus: "source-evidence-satisfied",
            oARequestVerb: "(pusuk)-(ua)",
        }
    );
    const tiBaseAndrewsRoute = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
    const huiBaseAndrewsRoute = findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui");
    const tiBaseAndrewsNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(tiBaseAndrewsRoute);
    const huiBaseAndrewsNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(huiBaseAndrewsRoute);
    const tiYaSatisfiedRoute = tiBaseAndrewsNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-ti-ya-deverbal" && route.routeTemplateId === "ti-ya");
    const huiYaSatisfiedRoute = huiBaseAndrewsNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-hui-ya-deverbal" && route.routeTemplateId === "hui-ya");
    const tiYaNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(tiYaSatisfiedRoute);
    const huiYaNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(huiYaSatisfiedRoute);
    const tiYaLiaSatisfiedRoute = tiYaNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-ya-lia-causative" && route.routeTemplateId === "ya-lia");
    const huiYaLiaSatisfiedRoute = huiYaNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-ya-lia-causative" && route.routeTemplateId === "ya-lia");
    s.eq(
        "Andrews 54.2 ti-ya and hui-ya require generated ti/hui sources and then supply ya-lia source evidence",
        {
            tiYaFiniteAvailable: tiYaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiYaRequirementStatus: tiYaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiYaTargetStemClass: tiYaSatisfiedRoute?.targetStemClass || "",
            tiYaTraditionalSpelling: tiYaSatisfiedRoute?.traditionalSpelling || "",
            tiYaTraditionalSpellingConfusableWith: tiYaSatisfiedRoute?.traditionalSpellingConfusableWith || "",
            tiYaTraditionalSpellingAmbiguous: tiYaSatisfiedRoute?.boundaries?.traditionalSpellingAmbiguous === true,
            tiYaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tiYaSatisfiedRoute,
                { tense: "presente" }
            )?.prefixInputs?.verb || "",
            huiYaFiniteAvailable: huiYaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            huiYaRequirementStatus: huiYaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            huiYaTargetStemClass: huiYaSatisfiedRoute?.targetStemClass || "",
            huiYaTraditionalSpelling: huiYaSatisfiedRoute?.traditionalSpelling || "",
            huiYaTraditionalSpellingConfusableWith: huiYaSatisfiedRoute?.traditionalSpellingConfusableWith || "",
            huiYaTraditionalSpellingAmbiguous: huiYaSatisfiedRoute?.boundaries?.traditionalSpellingAmbiguous === true,
            huiYaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiYaSatisfiedRoute,
                { tense: "presente" }
            )?.prefixInputs?.verb || "",
            tiYaNextSourceEvidence: tiYaNextPreview?.sourceEvidence || null,
            tiYaNextPreviewSourceStem: tiYaNextPreview?.routePreview?.sourceStem || "",
            tiYaLiaFiniteAvailable: tiYaLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiYaLiaRequirementStatus: tiYaLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiYaLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tiYaLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
            huiYaNextSourceEvidence: huiYaNextPreview?.sourceEvidence || null,
            huiYaNextPreviewSourceStem: huiYaNextPreview?.routePreview?.sourceStem || "",
            huiYaLiaFiniteAvailable: huiYaLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            huiYaLiaRequirementStatus: huiYaLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            huiYaLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiYaLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            tiYaFiniteAvailable: true,
            tiYaRequirementStatus: "source-evidence-satisfied",
            tiYaTargetStemClass: "A/B",
            tiYaTraditionalSpelling: "tia",
            tiYaTraditionalSpellingConfusableWith: "causative-tia",
            tiYaTraditionalSpellingAmbiguous: true,
            tiYaRequestVerb: "(pusukti)-(ya)",
            huiYaFiniteAvailable: true,
            huiYaRequirementStatus: "source-evidence-satisfied",
            huiYaTargetStemClass: "B",
            huiYaTraditionalSpelling: "huia",
            huiYaTraditionalSpellingConfusableWith: "applicative-huia",
            huiYaTraditionalSpellingAmbiguous: true,
            huiYaRequestVerb: "(pusukwi)-(ya)",
            tiYaNextSourceEvidence: {
                yaSource: true,
                tiYaSource: true,
                sourceCategory: "deverbal-ti-ya-source",
                sourceState: "derived",
                sourceContractId: "54.2.3-ti-ya-deverbal",
                sourceRouteTemplateId: "ti-ya",
                sourceNounStem: "pusuk",
                sourceBaseStem: "pusukti",
                sourceVerbStem: "pusuktiya",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsYaLiaCausative: true,
                    sourceYaDeletedBeforeLia: true,
                    sourceTiYaDerivedFromGeneratedTi: true,
                },
            },
            tiYaNextPreviewSourceStem: "pusukti",
            tiYaLiaFiniteAvailable: true,
            tiYaLiaRequirementStatus: "source-evidence-satisfied",
            tiYaLiaRequestVerb: "(pusukti)-(lia)",
            huiYaNextSourceEvidence: {
                yaSource: true,
                huiYaSource: true,
                sourceCategory: "deverbal-hui-ya-source",
                sourceState: "derived",
                sourceContractId: "54.2.3-hui-ya-deverbal",
                sourceRouteTemplateId: "hui-ya",
                sourceNounStem: "pusuk",
                sourceBaseStem: "pusukwi",
                sourceVerbStem: "pusukwiya",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsYaLiaCausative: true,
                    sourceYaDeletedBeforeLia: true,
                    sourceHuiYaDerivedFromGeneratedHui: true,
                },
            },
            huiYaNextPreviewSourceStem: "pusukwi",
            huiYaLiaFiniteAvailable: true,
            huiYaLiaRequirementStatus: "source-evidence-satisfied",
            huiYaLiaRequestVerb: "(pusukwi)-(lia)",
        }
    );
    const tlaRouteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        findAndrewsContractRoute("55.2-causative-tla", "tla"),
        { tense: "presente", objectPrefix: "ta" }
    );
    const tlaMissingObjectRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        findAndrewsContractRoute("55.2-causative-tla", "tla"),
        { tense: "presente" }
    );
    const huiRouteExecution = ctx.executeNawatDenominalAndrewsContractRoute(
        findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui"),
        { tense: "presente" }
    );
    s.eq(
        "Lessons 54-55 Andrews contract routes can build explicit VNC generation requests without fixture evidence",
        {
            huiVerb: huiRouteRequest?.prefixInputs?.verb || "",
            huiTense: huiRouteRequest?.options?.override?.tense || "",
            huiMode: huiRouteRequest?.options?.override?.tenseMode || "",
            huiObjectExpected: huiRouteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
            huiContractId: huiRouteRequest?.denominalAndrewsContractRoute?.contractId || "",
            tlaVerb: tlaRouteRequest?.prefixInputs?.verb || "",
            tlaObjectPrefix: tlaRouteRequest?.prefixInputs?.objectPrefix || "",
            tlaObjectExpected: tlaRouteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
            tlaRequiresObjectPrefix: tlaRouteRequest?.denominalAndrewsContractRoute?.finiteGenerationRequiresObjectPrefix === true,
            tlaTargetStemClass: tlaRouteRequest?.denominalAndrewsContractRoute?.targetStemClass || "",
            tlaUsesExistingVncEngine: tlaRouteRequest?.denominalAndrewsContractRoute?.boundaries?.usesExistingVncEngine === true,
            tlaMissingObjectRequest,
            missingTenseRequest: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui")
            ),
            executionResult: huiRouteExecution?.result || "",
            executionContractId: huiRouteExecution?.denominalAndrewsContractRouteExecution?.contractId || "",
            executionNoFixtureEvidence: huiRouteExecution?.denominalAndrewsContractRouteExecution?.boundaries?.noFixtureEvidence === true,
        },
        {
            huiVerb: "(pusukwi)",
            huiTense: "presente",
            huiMode: "verbo",
            huiObjectExpected: false,
            huiContractId: "54.2.2-inceptive-stative-hui",
            tlaVerb: "(pusuk)-(ta)",
            tlaObjectPrefix: "ta",
            tlaObjectExpected: true,
            tlaRequiresObjectPrefix: true,
            tlaTargetStemClass: "A",
            tlaUsesExistingVncEngine: true,
            tlaMissingObjectRequest: null,
            missingTenseRequest: null,
            executionResult: "pusukwi",
            executionContractId: "54.2.2-inceptive-stative-hui",
            executionNoFixtureEvidence: true,
        }
    );
    const huiRouteActivation = ctx.activateNawatDenominalAndrewsContractRouteTarget(
        findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui"),
        { targetTense: "preterito" }
    );
    s.eq(
        "Lessons 54-55 Andrews contract route activation selects a VNC target without creating fixture evidence",
        {
            outputKind: huiRouteActivation?.outputKind || "",
            contractId: huiRouteActivation?.contractId || "",
            routeTemplateId: huiRouteActivation?.routeTemplateId || "",
            targetInput: huiRouteActivation?.targetInput || "",
            tense: huiRouteActivation?.tense || "",
            requestVerb: huiRouteActivation?.request?.prefixInputs?.verb || "",
            usesExistingVncEngine: huiRouteActivation?.boundaries?.usesExistingVncEngine === true,
            explicitUserRouteActivation: huiRouteActivation?.boundaries?.explicitUserRouteActivation === true,
            noFixtureEvidence: huiRouteActivation?.boundaries?.noFixtureEvidence === true,
        },
        {
            outputKind: "denominal-andrews-contract-route-activation",
            contractId: "54.2.2-inceptive-stative-hui",
            routeTemplateId: "hui",
            targetInput: "(pusukwi)",
            tense: "preterito",
            requestVerb: "(pusukwi)",
            usesExistingVncEngine: true,
            explicitUserRouteActivation: true,
            noFixtureEvidence: true,
        }
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
            andrewsContractCount: 26,
            andrewsContractRouteCount: 31,
            pendingAndrewsContractCount: 24,
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
    const viTiLinkedSourceEvidence = {
        tiSource: true,
        sourceCategory: "inceptive-stative-ti-source",
        sourceRouteFamily: "vi-ti",
        sourceRouteId: "denominal-vi-ti-preterit",
        sourceStageKey: "verbalizer",
        sourceBaseStem: "pusuk",
        sourceVerbStem: "pusukti",
        boundaries: {
            noFixtureEvidence: true,
            sourceEvidenceFromSelectedGeneratedStage: true,
            classicalRuleSpellingsConvertedToNawat: true,
            sourceEvidenceSupportsTiLiaCausative: true,
            sourceEvidenceSupportsTiACausative: true,
            sourceEvidenceSupportsTIaApplicative: true,
        },
    };
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
                sourceEvidence: viTiLinkedSourceEvidence,
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
                sourceEvidence: viTiLinkedSourceEvidence,
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
    const viTiSourceSatisfiedTiLia = viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.routes
        ?.find((route) => route.contractId === "54.2-54.4-ti-lia-causative" && route.routeTemplateId === "ti-lia");
    s.eq(
        "linked vi-ti denominal stage satisfies Andrews 54.2/54.4 ti-lia source evidence for next routing",
        {
            selectedSourceEvidence: viTiVerbalizerNextPreview?.selectedStage?.sourceEvidence || null,
            nextSourceEvidence: viTiVerbalizerNextPreview?.nextSource?.sourceEvidence || null,
            contractPreviewSourceEvidence: viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.sourceEvidence || null,
            contractPreviewSourceStem: viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.sourceStem || "",
            finiteRouteRequestCount: viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteRequestCount || 0,
            finiteRouteObjectPrefixRequiredCount: viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteObjectPrefixRequiredCount || 0,
            finiteRouteStemClassContractCount: viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteStemClassContractCount || 0,
            finiteRouteSourceEvidenceRequiredCount: viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteSourceEvidenceRequiredCount || 0,
            routeNoteCount: viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.routeNoteCount || 0,
            tiLiaFiniteAvailable: viTiSourceSatisfiedTiLia?.finiteGenerationContractAvailable === true,
            tiLiaSourceRequirementStatus: viTiSourceSatisfiedTiLia?.sourceRequirement?.validationStatus || "",
            tiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                viTiSourceSatisfiedTiLia,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            selectedSourceEvidence: viTiLinkedSourceEvidence,
            nextSourceEvidence: viTiLinkedSourceEvidence,
            contractPreviewSourceEvidence: viTiLinkedSourceEvidence,
            contractPreviewSourceStem: "pusuk",
            finiteRouteRequestCount: 17,
            finiteRouteObjectPrefixRequiredCount: 6,
            finiteRouteStemClassContractCount: 15,
            finiteRouteSourceEvidenceRequiredCount: 14,
            routeNoteCount: 16,
            tiLiaFiniteAvailable: true,
            tiLiaSourceRequirementStatus: "source-evidence-satisfied",
            tiLiaRequestVerb: "(pusukti)-(lia)",
        }
    );
    const viIwiVerbalizerNextPreview = ctx.previewNawatLinkedGrammarPathNextSource(
        denominalRoutePreview.routes
            .find((route) => route.routeId === "denominal-vi-iwi-preterit")
            ?.stages.find((stage) => stage.key === "verbalizer")
    );
    const viIwiSourceSatisfiedOA = viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.routes
        ?.find((route) => route.contractId === "55.6-i-hui-a-hui-to-o-a" && route.routeTemplateId === "o-a");
    s.eq(
        "linked i-hui/a-hui denominal stage satisfies Andrews 55.6 o-a source evidence for next routing",
        {
            selectedSourceEvidence: viIwiVerbalizerNextPreview?.selectedStage?.sourceEvidence || null,
            nextSourceEvidence: viIwiVerbalizerNextPreview?.nextSource?.sourceEvidence || null,
            contractPreviewSourceEvidence: viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.sourceEvidence || null,
            contractPreviewSourceStem: viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.sourceStem || "",
            finiteRouteRequestCount: viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteRequestCount || 0,
            finiteRouteObjectPrefixRequiredCount: viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteObjectPrefixRequiredCount || 0,
            finiteRouteStemClassContractCount: viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteStemClassContractCount || 0,
            finiteRouteSourceEvidenceRequiredCount: viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.finiteRouteSourceEvidenceRequiredCount || 0,
            routeNoteCount: viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.routeNoteCount || 0,
            oAFiniteAvailable: viIwiSourceSatisfiedOA?.finiteGenerationContractAvailable === true,
            oASourceRequirementStatus: viIwiSourceSatisfiedOA?.sourceRequirement?.validationStatus || "",
            oARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                viIwiSourceSatisfiedOA,
                { tense: "presente", objectPrefix: "ta" }
            )?.prefixInputs?.verb || "",
        },
        {
            selectedSourceEvidence: {
                iHuiOrAHuiSource: true,
                sourceCategory: "i-hui-a-hui-source",
                sourceRouteFamily: "vi-iwi",
                sourceRouteId: "denominal-vi-iwi-preterit",
                sourceStageKey: "verbalizer",
                sourceBaseStem: "pusuk",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromSelectedGeneratedStage: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            nextSourceEvidence: {
                iHuiOrAHuiSource: true,
                sourceCategory: "i-hui-a-hui-source",
                sourceRouteFamily: "vi-iwi",
                sourceRouteId: "denominal-vi-iwi-preterit",
                sourceStageKey: "verbalizer",
                sourceBaseStem: "pusuk",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromSelectedGeneratedStage: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            contractPreviewSourceEvidence: {
                iHuiOrAHuiSource: true,
                sourceCategory: "i-hui-a-hui-source",
                sourceRouteFamily: "vi-iwi",
                sourceRouteId: "denominal-vi-iwi-preterit",
                sourceStageKey: "verbalizer",
                sourceBaseStem: "pusuk",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromSelectedGeneratedStage: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            contractPreviewSourceStem: "pusuk",
            finiteRouteRequestCount: 14,
            finiteRouteObjectPrefixRequiredCount: 4,
            finiteRouteStemClassContractCount: 12,
            finiteRouteSourceEvidenceRequiredCount: 17,
            routeNoteCount: 19,
            oAFiniteAvailable: true,
            oASourceRequirementStatus: "source-evidence-satisfied",
            oARequestVerb: "(pusuk)-(ua)",
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
                        sourceEvidence: viTiLinkedSourceEvidence,
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
                        sourceEvidence: viTiLinkedSourceEvidence,
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
                        sourceEvidence: {
                            iHuiOrAHuiSource: true,
                            sourceCategory: "i-hui-a-hui-source",
                            sourceRouteFamily: "vi-iwi",
                            sourceRouteId: "denominal-vi-iwi-preterit",
                            sourceStageKey: "verbalizer",
                            sourceBaseStem: "pusukti",
                            boundaries: {
                                noFixtureEvidence: true,
                                sourceEvidenceFromSelectedGeneratedStage: true,
                                classicalRuleSpellingsConvertedToNawat: true,
                            },
                        },
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
                        sourceEvidence: {
                            iHuiOrAHuiSource: true,
                            sourceCategory: "i-hui-a-hui-source",
                            sourceRouteFamily: "vi-iwi",
                            sourceRouteId: "denominal-vi-iwi-preterit",
                            sourceStageKey: "verbalizer",
                            sourceBaseStem: "pusukti",
                            boundaries: {
                                noFixtureEvidence: true,
                                sourceEvidenceFromSelectedGeneratedStage: true,
                                classicalRuleSpellingsConvertedToNawat: true,
                            },
                        },
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
    const summarizeLinkedPathContract = (record) => record && ({
        hasFrame: Boolean(record.grammarFrame),
        enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(record, "grammarFrame"),
        routeFamily: record.frames?.routeContract?.routeFamily || "",
        routeStage: record.frames?.routeContract?.routeStage || "",
        generationAllowed: record.frames?.routeContract?.generationAllowed,
        authorityRef: record.frames?.authorityFrame?.andrewsRefs?.[0] || "",
        evidenceStatus: record.frames?.authorityFrame?.evidenceStatus || "",
        resultSurface: record.frames?.resultFrame?.surface || "",
        diagnosticStatus: record.frames?.diagnosticFrame?.status || "",
        diagnosticIds: (record.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id || entry.code || ""),
    });
    s.eq(
        "linked grammar path UI previews and summaries expose non-enumerable LCM route contracts",
        {
            nextPreview: summarizeLinkedPathContract(viTiVerbalizerNextPreview),
            chainPreview: summarizeLinkedPathContract(ctx.previewNawatLinkedGrammarPathChain({
                sourceVerb: "(pusuni)",
                selections: [
                    { routeId: "denominal-vi-ti-preterit", stageKey: "verbalizer" },
                ],
            })),
            summary: summarizeLinkedPathContract(linkedPathSelectionSummary),
            unresolvedSummary: summarizeLinkedPathContract(ctx.buildNawatLinkedGrammarPathSelectionSummary({
                sourceVerb: "(pusuni)",
                selections: [
                    { routeId: "missing-route", stageKey: "verbalizer" },
                ],
            })),
        },
        {
            nextPreview: {
                hasFrame: true,
                enumerableGrammarFrame: false,
                routeFamily: "linked-grammar-path",
                routeStage: "preview-next-source",
                generationAllowed: false,
                authorityRef: "Andrews Lessons 54-55",
                evidenceStatus: "source-evidence-linked",
                resultSurface: "(pusukti)",
                diagnosticStatus: "source-evidence-linked",
                diagnosticIds: [],
            },
            chainPreview: {
                hasFrame: true,
                enumerableGrammarFrame: false,
                routeFamily: "linked-grammar-path",
                routeStage: "preview-chain",
                generationAllowed: false,
                authorityRef: "Andrews Lessons 54-55",
                evidenceStatus: "chain-preview",
                resultSurface: "(pusukti)",
                diagnosticStatus: "chain-preview",
                diagnosticIds: [],
            },
            summary: {
                hasFrame: true,
                enumerableGrammarFrame: false,
                routeFamily: "linked-grammar-path",
                routeStage: "summarize-selection",
                generationAllowed: false,
                authorityRef: "Andrews Lessons 54-55",
                evidenceStatus: "selection-summary",
                resultSurface: "(pusuktiiwi)",
                diagnosticStatus: "selection-summary",
                diagnosticIds: [],
            },
            unresolvedSummary: {
                hasFrame: true,
                enumerableGrammarFrame: false,
                routeFamily: "linked-grammar-path",
                routeStage: "summarize-selection",
                generationAllowed: false,
                authorityRef: "Andrews Lessons 54-55",
                evidenceStatus: "blocked",
                resultSurface: "(pusuni)",
                diagnosticStatus: "blocked",
                diagnosticIds: ["linked-grammar-path-unresolved-route"],
            },
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
                generated: step.generated && {
                    result: step.generated.result || "",
                    surface: step.generated.surface || "",
                    surfaceForms: Array.isArray(step.generated.surfaceForms) ? step.generated.surfaceForms : [],
                    ok: step.generated.ok === true,
                    frameAlias: step.generated.frames === step.generated.grammarFrame,
                    routeFamily: step.generated.frames?.routeContract?.routeFamily || "",
                },
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
            generatedSurfaces: activeLinkedPathExecution.steps.map((step) => step.generated?.surface || ""),
            generatedResults: activeLinkedPathExecution.steps.map((step) => step.generated?.result || ""),
            generatedFrameAliases: activeLinkedPathExecution.steps.map((step) => step.generated?.frames === step.generated?.grammarFrame),
            generatedOk: activeLinkedPathExecution.steps.map((step) => step.generated?.ok === true),
            storedOutputKind: ctx.getNawatRouteStateStore().activeLinkedGrammarPathExecution?.outputKind || "",
            doesExecuteStages: activeLinkedPathExecution.boundaries?.doesExecuteStages === true,
            doesNotMutateState: activeLinkedPathExecution.boundaries?.doesNotMutateState === true,
        },
        {
            outputKind: "linked-grammar-path-chain-execution",
            requestedSelectionCount: 2,
            stepStatuses: ["executed", "executed"],
            generatedSurfaces: ["pusukti", "pusuktiiwi"],
            generatedResults: ["pusukti", "pusuktiiwi"],
            generatedFrameAliases: [true, true],
            generatedOk: [true, true],
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
    s.eq(
        "linked grammar path execution source options read LCM result-frame surfaces before generated result text",
        typeof ctx.getNawatLinkedGrammarPathExecutionSourceOptions === "function"
            ? ctx.getNawatLinkedGrammarPathExecutionSourceOptions({
                outputKind: "linked-grammar-path-chain-execution",
                steps: [
                    {
                        index: 0,
                        status: "executed",
                        selection: { routeId: "frame-route" },
                        selectedStage: {
                            stationKey: "verbalizer",
                            sourceVerb: "legacy-stage-source",
                            displaySurface: "legacy stage",
                        },
                        nextSource: {
                            sourceVerb: "legacy-next-source",
                            displaySurface: "legacy next",
                        },
                        generated: {
                            result: "—",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: true,
                                    surfaceForms: ["frame-generated-source"],
                                }),
                            }),
                        },
                    },
                ],
            })
            : [],
        [
            {
                sourceVerb: "frame-generated-source",
                sourceObjectPrefix: "",
                displaySurface: "frame-generated-source",
                sourceInput: "legacy-next-source",
                sourceInputDisplay: "legacy next",
                generatedSurface: "frame-generated-source",
                routeId: "frame-route",
                stageKey: "verbalizer",
                fromStepIndex: 0,
            },
        ]
    );
    const framedLinkedStageRequest = typeof ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest === "function"
        && typeof ctx.buildGrammarFrame === "function"
        && typeof ctx.buildGrammarResultFrame === "function"
        ? ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest({
            surface: "legacy-stage-surface",
            inputValue: "legacy-input",
            renderVerb: "legacy-render",
            nextSource: {
                sourceVerb: "legacy-source",
                displaySurface: "legacy-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surfaceForms: ["frame-request-source"],
                    }),
                }),
                mode: ctx.TENSE_MODE?.adjetivo || "adjetivo",
                tenseValue: "preterit",
                routeId: "frame-route",
                stationKey: "verbalizer",
            },
        })
        : null;
    s.eq(
        "linked grammar path stage generation requests read LCM result-frame source surfaces before legacy stage fields",
        framedLinkedStageRequest ? (() => {
            const frame = framedLinkedStageRequest.linkedGrammarPathStage?.grammarFrame
                || framedLinkedStageRequest.linkedGrammarPathStage?.frames
                || null;
            return {
                inputVerb: framedLinkedStageRequest.prefixInputs?.verb || "",
                stageSourceVerb: framedLinkedStageRequest.linkedGrammarPathStage?.sourceVerb || "",
                stageDisplaySurface: framedLinkedStageRequest.linkedGrammarPathStage?.displaySurface || "",
                frameSurface: frame?.resultFrame?.surface || "",
                frameSurfaceForms: frame?.resultFrame?.surfaceForms || [],
            };
        })() : null,
        {
            inputVerb: "frame-request-source",
            stageSourceVerb: "frame-request-source",
            stageDisplaySurface: "frame-request-source",
            frameSurface: "frame-request-source",
            frameSurfaceForms: ["frame-request-source"],
        }
    );
    const emptyFramedLinkedStageRequest = typeof ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest === "function"
        && typeof ctx.buildGrammarFrame === "function"
        && typeof ctx.buildGrammarResultFrame === "function"
        ? ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest({
            surface: "legacy-stage-surface",
            inputValue: "legacy-input",
            renderVerb: "legacy-render",
            nextSource: {
                sourceVerb: "legacy-source",
                displaySurface: "legacy-display",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surfaceForms: [],
                    }),
                }),
                mode: ctx.TENSE_MODE?.adjetivo || "adjetivo",
                tenseValue: "preterit",
                routeId: "frame-route",
                stationKey: "verbalizer",
            },
        })
        : null;
    s.eq(
        "linked grammar path stage generation requests suppress legacy source fields for an empty LCM result frame",
        emptyFramedLinkedStageRequest,
        null
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
                        sourceEvidence: viTiLinkedSourceEvidence,
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
                        surface: "pusukti",
                        surfaceForms: ["pusukti"],
                        ok: true,
                        frameAlias: true,
                        routeFamily: "vnc",
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
                        sourceEvidence: viTiLinkedSourceEvidence,
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
                        sourceEvidence: viTiLinkedSourceEvidence,
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
                        sourceEvidence: {
                            iHuiOrAHuiSource: true,
                            sourceCategory: "i-hui-a-hui-source",
                            sourceRouteFamily: "vi-iwi",
                            sourceRouteId: "denominal-vi-iwi-preterit",
                            sourceStageKey: "verbalizer",
                            sourceBaseStem: "pusukti",
                            boundaries: {
                                noFixtureEvidence: true,
                                sourceEvidenceFromSelectedGeneratedStage: true,
                                classicalRuleSpellingsConvertedToNawat: true,
                            },
                        },
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
                        surface: "pusuktiiwi",
                        surfaceForms: ["pusuktiiwi"],
                        ok: true,
                        frameAlias: true,
                        routeFamily: "vnc",
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
                        sourceEvidence: {
                            iHuiOrAHuiSource: true,
                            sourceCategory: "i-hui-a-hui-source",
                            sourceRouteFamily: "vi-iwi",
                            sourceRouteId: "denominal-vi-iwi-preterit",
                            sourceStageKey: "verbalizer",
                            sourceBaseStem: "pusukti",
                            boundaries: {
                                noFixtureEvidence: true,
                                sourceEvidenceFromSelectedGeneratedStage: true,
                                classicalRuleSpellingsConvertedToNawat: true,
                            },
                        },
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
                        sourceEvidence: {
                            iHuiOrAHuiSource: true,
                            sourceCategory: "i-hui-a-hui-source",
                            sourceRouteFamily: "vi-iwi",
                            sourceRouteId: "denominal-vi-iwi-preterit",
                            sourceStageKey: "verbalizer",
                            sourceBaseStem: "pusukti",
                            boundaries: {
                                noFixtureEvidence: true,
                                sourceEvidenceFromSelectedGeneratedStage: true,
                                classicalRuleSpellingsConvertedToNawat: true,
                            },
                        },
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
    const patientivoPerfectiveSourceSurfaceResult = ctx.getNawatRouteSourceSurfaceResult(patientivoPerfectiveNounRoute, {
        sourceVerb: "(ketza)",
        routeTarget: patientivoPerfectiveNounTarget,
    });
    const patientivoPerfectiveFiniteSurfaceResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPerfectiveNounRoute, {
        sourceVerb: "(ketza)",
        routeTarget: patientivoPerfectiveNounTarget,
    });
    s.eq(
        "patientivo source and finite route surfaces expose LCM result contracts",
        {
            sourceSurface: patientivoPerfectiveSourceSurfaceResult.surface,
            sourceRouteStage: patientivoPerfectiveSourceSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            finiteSurface: patientivoPerfectiveFiniteSurfaceResult.surface,
            finiteRouteStage: patientivoPerfectiveFiniteSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            authorityRef: patientivoPerfectiveFiniteSurfaceResult.grammarFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            generationAllowed: patientivoPerfectiveFiniteSurfaceResult.grammarFrame?.routeContract?.generationAllowed,
        },
        {
            sourceSurface: "ketzki",
            sourceRouteStage: "source-surface",
            finiteSurface: "ketzti",
            finiteRouteStage: "finite-surface",
            authorityRef: "Andrews Lesson 39",
            generationAllowed: true,
        }
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
    const framedReduplicatedResult = ctx.buildReduplicatedConjugationResult({
        result: "—",
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surface: "tichipaknaj",
            }),
        }),
    }, { prefixChain: "ti" });
    s.eq(
        "reduplicated result reads LCM result-frame surface before legacy result text",
        {
            result: framedReduplicatedResult.result,
            surfaceForms: framedReduplicatedResult.surfaceForms,
        },
        {
            result: "tichijchipaknaj",
            surfaceForms: ["tichijchipaknaj"],
        }
    );

    return s;
}

module.exports = { run };
