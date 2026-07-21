"use strict";

/**
 * Tests for src/ui/state.mjs — Toggle Lock functions.
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
        routeTenseValue: sourceState.routeTenseValue,
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
    s.eq("particle mode is a selectable output mode", ctx.TENSE_MODE.particula, "particula");
    s.eq("particle mode has no tense paradigm tabs", ctx.getTenseOrderForMode(ctx.TENSE_MODE.particula), []);
    s.eq(
        "Andrews formal tense modes stay limited to CNV, CNN, and Partícula",
        Object.keys(ctx.FORMAL_TENSE_MODE || {}),
        ["verbo", "sustantivo", "particula"]
    );
    s.eq(
        "adjectival/adverbial functions remain routes, not formal classes",
        Object.keys(ctx.FUNCTION_TENSE_MODE || {}),
        ["adjetivo", "adverbio"]
    );
    s.eq("european mode scaffold remains available", ctx.TENSE_MODE_SYSTEM.european, "european");
    s.eq(
        "Andrews syntactical/formal class mode-system aliases are available",
        {
            function: ctx.TENSE_MODE_SYSTEM.function,
            unit: ctx.TENSE_MODE_SYSTEM.unit,
        },
        {
            function: "function",
            unit: "unit",
        }
    );
    s.eq(
        "Andrews syntactical/formal class state helpers are exported",
        [
            typeof ctx.getActiveFunctionMode,
            typeof ctx.getActiveFunctionRole,
            typeof ctx.setActiveFunctionMode,
            typeof ctx.setActiveFunctionRole,
            typeof ctx.getActiveUnitKind,
            typeof ctx.setActiveUnitMode,
            typeof ctx.setActiveUnitKind,
        ],
        ["function", "function", "function", "function", "function", "function", "function"]
    );
    s.eq(
        "unit source-target route options are authorized by typed Andrews source and operation frames",
        (() => {
            const sourceFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsSourceFrame("verbo");
            const operationFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(sourceFrame);
            const result = ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(operationFrame);
            return {
                ok: result.ok,
                targetFormulaType: result.targetFormulaType,
                sourceTargetOptions: result.sourceTargetOptions,
                sourceTargetOptionList: result.sourceTargetOptionList,
                sourceKind: operationFrame.sourceFrame?.kind || "",
                operation: operationFrame.operation || "",
            };
        })(),
        {
            ok: true,
            targetFormulaType: "CNV",
            sourceTargetOptions: "CNV->CNV|CNN->CNV|CNV/CNN->CNV/CNN",
            sourceTargetOptionList: ["CNV->CNV", "CNN->CNV", "CNV/CNN->CNV/CNN"],
            sourceKind: "andrews-unit-source-target-route-options-source-frame",
            operation: "resolve-unit-target-route-options-from-andrews-source-frame",
        }
    );
    s.eq(
        "unit source-target route options block string-only and contradictory operation authority",
        (() => {
            const sourceFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsSourceFrame("sustantivo");
            const poisonedDisplaySourceFrame = {
                ...sourceFrame,
                displaySourceTargetOptions: "CNV->CNV|CNN->CNV",
                sourceTargetOptions: "CNV->CNV|CNN->CNV",
                formulaEcho: "CNV->CNV",
                result: "CNV->CNV",
                surface: "CNV->CNV",
            };
            const displayPoisonResult = ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(
                ctx.buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(poisonedDisplaySourceFrame),
            );
            const operationFrame = ctx.buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(sourceFrame);
            const contradictoryTarget = {
                ...operationFrame,
                targetFrame: {
                    ...operationFrame.targetFrame,
                    targetFormulaFrame: {
                        ...operationFrame.targetFrame.targetFormulaFrame,
                        formulaType: "CNV",
                    },
                },
            };
            const fakeOperators = {
                dataset: {
                    sourceTargetOptions: "CNV->CNV|CNN->CNV",
                    targetFormulaType: "CNV",
                },
            };
            const applied = ctx.applyAndrewsUnitSourceTargetRouteOptionsDataset(fakeOperators, operationFrame);
            return {
                directString: ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame("CNV->CNV|CNN->CNV").diagnosticId,
                missingOperation: ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(null).diagnosticId,
                displayPoison: {
                    ok: displayPoisonResult.ok,
                    targetFormulaType: displayPoisonResult.targetFormulaType,
                    sourceTargetOptions: displayPoisonResult.sourceTargetOptions,
                },
                contradictoryTarget: ctx.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(contradictoryTarget).diagnosticId,
                applied: {
                    ok: applied.ok,
                    sourceTargetOptions: fakeOperators.dataset.sourceTargetOptions,
                    targetFormulaType: fakeOperators.dataset.targetFormulaType,
                    status: fakeOperators.dataset.sourceTargetOptionsStatus,
                    authority: fakeOperators.dataset.sourceTargetOptionsAuthority,
                },
            };
        })(),
        {
            directString: "andrews-unit-source-target-route-options-missing-operation-frame",
            missingOperation: "andrews-unit-source-target-route-options-missing-operation-frame",
            displayPoison: {
                ok: true,
                targetFormulaType: "CNN",
                sourceTargetOptions: "CNV->CNN|CNN->CNN|CNV/CNN->CNV/CNN",
            },
            contradictoryTarget: "andrews-unit-source-target-route-options-contradictory-target-frame",
            applied: {
                ok: true,
                sourceTargetOptions: "CNV->CNN|CNN->CNN|CNV/CNN->CNV/CNN",
                targetFormulaType: "CNN",
                status: "andrews-structured-authorized",
                authority: "andrews-unit-source-target-route-options-operation-frame",
            },
        }
    );
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
        : () => ({ options: { override: {} }, posicionesFormula: {} });
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
                message: "Ortografia: correspondencia candidata; requiere verificacion ortografica.",
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
            tenseMode: ctx.TENSE_MODE.sustantivo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
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
            tenseMode: ctx.TENSE_MODE.sustantivo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
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
            tenseMode: ctx.TENSE_MODE.sustantivo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
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
    s.eq(
        "ordinary NNC UI request builder leaves manual formula text for the engine gate",
        buildOrdinaryNncGenerateWordRequest({ stem: "(nemi)" }).options.override.ordinaryNnc,
        {
            ...buildOrdinaryNncGenerateWordRequest({ stem: "nemi" }).options.override.ordinaryNnc,
            stem: "(nemi)",
        }
    );
    s.eq(
        "ordinary NNC UI request builder carries an explicit Andrews p294 output set",
        buildOrdinaryNncGenerateWordRequest({
            stem: "pil",
            outputSet: "lesson32-pil-child-nnc-side",
        }).options.override.ordinaryNnc,
        {
            enabled: true,
            stem: "pil",
            state: "absolutive",
            number: "plural",
            pluralType: "auto",
            subjectPrefix: "an",
            subjectSuffix: "t",
            subjectKey: "2pl",
            possessor: "",
            nounClass: "",
            animacy: "animate",
            outputSet: "lesson32-pil-child-nnc-side",
        }
    );
    setOrdinaryNncGenerationState({ nounClass: "zero" });
    s.eq(
        "ordinary NNC UI request builder keeps fixture class unspecified when requested",
        buildOrdinaryNncGenerateWordRequest({ stem: "mistun", nounClass: "" }).options.override.ordinaryNnc.nounClass,
        ""
    );
    s.eq(
        "ordinary NNC UI request builder preserves analogue text for the engine gate",
        (() => {
            const request = buildOrdinaryNncGenerateWordRequest({
                stem: "(siwa)t",
                state: "absolutive",
                number: "singular",
                animacy: "inanimate",
            });
            return {
                tronco: request.posicionesFormula.tronco,
                tiempo: request.posicionesFormula.tiempo,
                nounClass: request.options.override.ordinaryNnc.nounClass,
                stem: request.options.override.ordinaryNnc.stem,
            };
        })(),
        {
            tronco: "(siwa)t",
            tiempo: "ordinary-nnc",
            nounClass: "zero",
            stem: "(siwa)t",
        }
    );
    s.eq(
        "entrada URL segment helpers are exported",
        [
            typeof ctx.getEntradaUrlSegmentFieldKeys,
            typeof ctx.normalizeEntradaUrlStateSnapshot,
            typeof ctx.buildEntradaUrlSegmentString,
            typeof ctx.parseEntradaUrlSegmentString,
            typeof ctx.buildEntradaUrlHash,
        ],
        ["function", "function", "function", "function", "function"]
    );
    const entradaUrlFieldKeys = ctx.getEntradaUrlSegmentFieldKeys();
    s.eq(
        "entrada URL schema covers all current #1 Entrada control families",
        [
            "input",
            "board",
            "transitivity",
            "slotAEmbed",
            "slotAStem",
            "slotAObjectEmbed",
            "slotBEmbed",
            "slotBStem",
            "slotBObjectEmbed",
            "slotCEmbed",
            "slotCStem",
            "slotCObjectEmbed",
            "valenceIntransitive",
            "valence",
            "valenceSecondary",
            "directionalPrefix",
            "supportiveMarker",
            "vncOutputScope",
            "slotASerialType",
            "slotATemplateSuffix",
            "slotATemplateSurface",
            "slotATemplateTiCausativeClass",
            "ordinaryNncEnabled",
            "ordinaryNncState",
            "ordinaryNncNumber",
            "ordinaryNncPluralType",
            "ordinaryNncPers1",
            "ordinaryNncPers2",
            "ordinaryNncSubjectKey",
            "ordinaryNncPossessor",
            "ordinaryNncNounClass",
            "ordinaryNncAnimacy",
            "classicalNncEnabled",
            "classicalNncSubject",
            "classicalNncType",
            "classicalNncState",
            "classicalNncClass",
            "classicalNncPossessor",
            "classicalNncUseShape",
            "classicalNncSubclass",
            "classicalNncStemRelation",
            "classicalNncNumberForm",
            "classicalNncOutputScope",
            "classicalNncReferent",
            "classicalNncQuantitiveMatrix",
            "classicalNncQuantitiveMatrixForm",
            "classicalNncQuantitivePredicatePluralization",
        ].every((fieldKey) => entradaUrlFieldKeys.includes(fieldKey)),
        true
    );
    const composerEntradaHash = ctx.buildEntradaUrlHash({
        input: "[wal]/ish/(ta)-mati",
        board: "noun-to-verb",
        transitivity: "transitive",
        valence: "ta",
        directionalPrefix: "wal",
        supportiveMarker: "i",
        slots: {
            a: {
                embed: "kal",
                stem: "ti",
                objectEmbed: "ish",
                serialType: "ti-have",
                templateSuffix: "ti",
                templateSurface: "kal",
                templateTiCausativeClass: "have",
            },
            b: {
                embed: "ish",
                stem: "mati",
                objectEmbed: "",
                serialType: "auto",
            },
        },
    });
    const parsedComposerEntrada = ctx.parseEntradaUrlSegmentString(composerEntradaHash);
    s.eq(
        "entrada URL segments round-trip V and S->V composer controls",
        {
            hashPrefix: composerEntradaHash.startsWith("#entrada/v1/"),
            board: parsedComposerEntrada.board,
            input: parsedComposerEntrada.input,
            transitivity: parsedComposerEntrada.transitivity,
            directionalPrefix: parsedComposerEntrada.directionalPrefix,
            supportiveMarker: parsedComposerEntrada.supportiveMarker,
            valence: parsedComposerEntrada.valence,
            slotA: parsedComposerEntrada.slots.a,
            slotB: parsedComposerEntrada.slots.b,
        },
        {
            hashPrefix: true,
            board: "noun-to-verb",
            input: "[wal]/ish/(ta)-mati",
            transitivity: "transitive",
            directionalPrefix: "wal",
            supportiveMarker: "i",
            valence: "ta",
            slotA: {
                embed: "kal",
                stem: "ti",
                objectEmbed: "ish",
                serialType: "ti-have",
                templateSuffix: "ti",
                templateSurface: "kal",
                templateTiCausativeClass: "have",
            },
            slotB: {
                embed: "ish",
                stem: "mati",
                objectEmbed: "",
                serialType: "auto",
                templateSuffix: "",
                templateSurface: "",
                templateTiCausativeClass: "",
            },
        }
    );
    const originalLanguageProfileGetter = ctx.getActiveLanguageProfileMode;
    const originalUiDensityGetter = ctx.getActiveUiDensityMode;
    const originalClassListContains = ctx.document.body.classList.contains;
    const originalGetClientRects = ctx.document.body.getClientRects;
    const originalVerbComposerState = { ...ctx.VerbComposerState };
    const originalVerbInputValue = ctx.document.getElementById("verb").value;
    try {
        ctx.getActiveLanguageProfileMode = () => ctx.LANGUAGE_PROFILE_MODE.classicalNahuatl;
        ctx.document.body.classList.contains = (className) => className === "is-language-classical";
        ctx.document.body.getClientRects = () => [{ width: 1, height: 1 }];
        ctx.getActiveUiDensityMode = () => ctx.UI_DENSITY_MODE.simple;
        s.eq(
            "Classical entrada stem normalization preserves macrons",
            {
                macronStem: ctx.normalizeComposerStem("zōmā"),
                boundedStem: ctx.normalizeComposerStem("pa-tla"),
                wrappedStem: ctx.normalizeComposerStem("-(zōmā)"),
            },
            {
                macronStem: "zōmā",
                boundedStem: "patla",
                wrappedStem: "zōmā",
            }
        );
        const staleClassicalRoute = ctx.parseEntradaUrlSegmentString("#entrada/v1/verb/-(z%C5%8Dm%C4%81)/tr/transitive/b-stem/zm");
        ctx.applyEntradaUrlStateSnapshot(staleClassicalRoute, {
            triggerGenerate: false,
            immediateRefresh: false,
        });
        s.eq(
            "Classical entrada input stem outranks stale ASCII b-stem route cache",
            {
                transitivity: ctx.VerbComposerState.transitivity,
                slotBStem: ctx.VerbComposerState.slotBStem,
                visibleInput: ctx.document.getElementById("verb").value,
                serialized: ctx.buildComposerModeBundle(ctx.VerbComposerState, "").regexValue,
            },
            {
                transitivity: "transitive",
                slotBStem: "zōmā",
                visibleInput: "-(zōmā)",
                serialized: "-(zōmā)",
            }
        );
        ctx.getActiveLanguageProfileMode = () => ctx.LANGUAGE_PROFILE_MODE.nawatPipil;
        ctx.document.body.classList.contains = (className) => className === "is-language-nawat-pipil";
        s.eq(
            "Nawat/Pipil composer stem normalization remains ASCII-only",
            {
                macronStem: ctx.normalizeComposerStem("zōmā"),
                boundedStem: ctx.normalizeComposerStem("pa-tla"),
            },
            {
                macronStem: "zm",
                boundedStem: "patla",
            }
        );
    } finally {
        ctx.getActiveLanguageProfileMode = originalLanguageProfileGetter;
        ctx.getActiveUiDensityMode = originalUiDensityGetter;
        ctx.document.body.classList.contains = originalClassListContains;
        ctx.document.body.getClientRects = originalGetClientRects;
        Object.assign(ctx.VerbComposerState, originalVerbComposerState);
        ctx.document.getElementById("verb").value = originalVerbInputValue;
    }
    const ordinaryEntrada = ctx.parseEntradaUrlSegmentString(ctx.buildEntradaUrlSegmentString({
        input: "(siwa)t",
        board: "ordinary-nnc",
        ordinaryNnc: {
            enabled: true,
            state: "possessive",
            number: "plural",
            pluralType: "distributive",
            pers1: "ti",
            pers2: "t",
            subjectKey: "1pl",
            possessor: "nu",
            nounClass: "t",
            animacy: "animate",
        },
    }));
    s.eq(
        "entrada URL segments round-trip explicit S/NNC controls",
        {
            board: ordinaryEntrada.board,
            input: ordinaryEntrada.input,
            ordinaryNnc: ordinaryEntrada.ordinaryNnc,
        },
        {
            board: "ordinary-nnc",
            input: "(siwa)t",
            ordinaryNnc: {
                enabled: true,
                state: "possessive",
                number: "plural",
                pluralType: "distributive",
                pers1: "ti",
                pers2: "t",
                subjectKey: "1pl",
                possessor: "nu",
                nounClass: "t",
                animacy: "animate",
            },
        }
    );
    const classicalNncEntrada = ctx.parseEntradaUrlSegmentString(ctx.buildEntradaUrlSegmentString({
        input: "(toma)",
        board: "ordinary-nnc",
        ordinaryNnc: { enabled: true },
        classicalNnc: {
            active: true,
            subject: "1pl",
            type: "ordinary",
            statePolicy: "never-possessive",
            state: "possessive",
            possessorCompatibility: "relational-tla",
            thirdPluralPossessorOptions: "n",
            thirdPluralPossessorSt2: "n",
            constituentAmbiguityKind: "front-o",
            constituentAlternativeStem: "mī",
            constituentAnalysisId: "alternative-typed-slots",
            possessiveFormation: "suppletive",
            lesson15TargetStem: "tlāca",
            suppletiveConnector: "uh",
            secondaryPossessorCarrier: "tē",
            possessorReduplication: true,
            nounClass: "tl",
            possessor: "3pl",
            useShape: "truncated-a-supportive-i",
            subclass: "tl-2c",
            stemRelation: "affinity",
            numberForm: "m-eh",
            outputScope: "paradigm",
            referent: "metaphorical",
            quantitiveMatrix: "quich",
            quantitiveMatrixForm: "qui-ch",
            quantitivePredicatePluralization: "plain-qui-ch",
            clausePosition: "noninitial",
            doubledFirstPlural: true,
            dependentClauseIntroducedByIn: true,
            specialHumanUse: true,
        },
    }));
    s.eq(
        "entrada URL keeps Classical NNC Authority separate from the Nawat ordinary-NNC mirror",
        {
            hasClassicalSegments: ["cn-subj", "cn-state-policy", "cn-state", "cn-poss-compat", "cn-3pl-options", "cn-3pl-form", "cn-ambiguity", "cn-alt-stem", "cn-analysis", "cn-formation", "cn-l15-stem", "cn-l15-connector", "cn-l15-carrier", "cn-l15-redup", "cn-class", "cn-subclass", "cn-relation", "cn-number", "cn-output", "cn-position", "cn-l16-double", "cn-l16-in", "cn-l16-human", "cn-l16-matrix-form", "cn-l16-predicate-plural"]
                .every((segment) => ctx.buildEntradaUrlSegmentString(classicalNncEntrada).includes(`/${segment}/`)),
            classicalNnc: classicalNncEntrada.classicalNnc,
            nawatNounClass: classicalNncEntrada.ordinaryNnc.nounClass,
        },
        {
            hasClassicalSegments: true,
            classicalNnc: {
                active: true,
                subject: "1pl",
                type: "ordinary",
                statePolicy: "never-possessive",
                state: "possessive",
                possessorCompatibility: "relational-tla",
                thirdPluralPossessorOptions: "n",
                thirdPluralPossessorSt2: "n",
                constituentAmbiguityKind: "front-o",
                constituentAlternativeStem: "mī",
                constituentAnalysisId: "alternative-typed-slots",
                possessiveFormation: "suppletive",
                lesson15TargetStem: "tlāca",
                suppletiveConnector: "uh",
                secondaryPossessorCarrier: "tē",
                possessorReduplication: true,
                nounClass: "tl",
                possessor: "3pl",
                useShape: "truncated-a-supportive-i",
                subclass: "tl-2c",
                stemRelation: "affinity",
                numberForm: "m-eh",
                outputScope: "paradigm",
                referent: "metaphorical",
                quantitiveMatrix: "quich",
                quantitiveMatrixForm: "qui-ch",
                quantitivePredicatePluralization: "plain-qui-ch",
                clausePosition: "noninitial",
                doubledFirstPlural: true,
                dependentClauseIntroducedByIn: true,
                specialHumanUse: true,
            },
            nawatNounClass: "",
        }
    );
    setOrdinaryNncGenerationState({ subjectKey: "3sg", subjectPrefix: "", subjectSuffix: "", animacy: "inanimate" });
    setOrdinaryNncGenerationModeEnabled(false);
    s.no("ordinary NNC UI mode can be disabled", isOrdinaryNncGenerationModeEnabled());
    const tiPreteritRoute = ctx.getNawatRouteProfile("adjetivo-preterito-tik");
    s.eq("future nawat route maps stale -tik preterit id", tiPreteritRoute.id, "denominal-vi-ti-preterit");
    s.eq("future nawat route keeps source slot", tiPreteritRoute.sourceSlot, "noun/inc.root");
    s.eq("future nawat route keeps denominal VI verbalizer", tiPreteritRoute.verbalizer, "-ti");
    s.eq("future nawat route keeps configured denominal family", tiPreteritRoute.denominalFamily, "vi-ti");
    s.eq("future nawat route keeps configured structural analogue", tiPreteritRoute.structuralAnalogue, "inceptive-stative-ti-route");
    s.eq("future nawat route maps to nawat verb mode", tiPreteritRoute.nawatMode, "verbo");
    s.eq(
        "future nawat route stays inside nawat verb convention",
        ctx.formatNawatRouteNawatTargetLabel(tiPreteritRoute, false),
        "Nawat: CNV > pretérito perfecto simple"
    );
    s.eq(
        "future nawat route foregrounds noun to verb conversion",
        ctx.formatNawatRouteConversionLabel(tiPreteritRoute, false),
        "CNN -> CNV"
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
        "Nawat: CNV > presente"
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
            routeTenseValue: "adjetivo-preterito-tik",
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
            routeStage: "finite-surface-structural-class-b",
            authorityRef: "Andrews Lessons 54-55",
            outputKind: "nawat-route-finite-surface-result",
        }
    );
    const poisonedDefaultTiRouteTarget = {
        ...tiPreteritTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        targetVerbSourceFrame: {
            ...tiPreteritTarget.targetVerbSourceFrame,
            targetVerb: "poison",
            stem: "poison",
            surface: "poison",
            result: "poison",
            formulaEcho: "#poison#",
        },
    };
    const poisonedDefaultTiSurfaceResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: poisonedDefaultTiRouteTarget,
    });
    s.eq(
        "default denominal VI -ti finite route uses structural target frame over display strings",
        {
            surface: poisonedDefaultTiSurfaceResult.surface,
            stage: poisonedDefaultTiSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            sourceVerb: poisonedDefaultTiSurfaceResult.sourceResult?.classBSourceFrame?.sourceVerbFrame?.text || "",
        },
        {
            surface: "pusuktik",
            stage: "finite-surface-structural-class-b",
            sourceVerb: "pusukti",
        }
    );
    const originalExecuteNuclearClauseSurfaceRequestForDefaultTiRoute = ctx.executeNuclearClauseSurfaceRequest;
    try {
        ctx.executeNuclearClauseSurfaceRequest = () => ({
            result: "poison",
            surface: "poison",
            surfaceForms: ["poison"],
        });
        s.eq(
            "default denominal VI -ti finite route ignores poisoned legacy nuclear string executor",
            ctx.getNawatRouteFiniteSurfaceForm(tiPreteritRoute, {
                sourceVerb: "(pusuni)",
                routeTarget: poisonedDefaultTiRouteTarget,
            }),
            "pusuktik"
        );
    } finally {
        ctx.executeNuclearClauseSurfaceRequest = originalExecuteNuclearClauseSurfaceRequestForDefaultTiRoute;
    }
    const directDefaultTiStringRouteResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "default denominal VI -ti finite route blocks direct string API without target frame",
        {
            surface: directDefaultTiStringRouteResult.surface,
            stage: directDefaultTiStringRouteResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: directDefaultTiStringRouteResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-structural-class-b-blocked",
            diagnostic: "nawat-route-verbalized-verb-missing-source-frame",
        }
    );
    const missingDefaultTiOperationFrameResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: {
            ...tiPreteritTarget,
            targetVerb: "pusukti",
            targetVerbSourceFrame: {
                ...tiPreteritTarget.targetVerbSourceFrame,
                operationFrame: null,
            },
        },
    });
    s.eq(
        "default denominal VI -ti finite route missing operation frame blocks string fallback",
        {
            surface: missingDefaultTiOperationFrameResult.surface,
            stage: missingDefaultTiOperationFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: missingDefaultTiOperationFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-structural-class-b-blocked",
            diagnostic: "nawat-route-verbalized-verb-missing-operation-frame",
        }
    );
    const contradictoryDefaultTiFrameResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: {
            ...tiPreteritTarget,
            targetVerb: "pusukti",
            targetVerbSourceFrame: {
                ...tiPreteritTarget.targetVerbSourceFrame,
                targetVerbFrame: {
                    ...tiPreteritTarget.targetVerbSourceFrame.targetVerbFrame,
                    text: "poison",
                },
            },
        },
    });
    s.eq(
        "default denominal VI -ti finite route contradictory target frame blocks string fallback",
        {
            surface: contradictoryDefaultTiFrameResult.surface,
            stage: contradictoryDefaultTiFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: contradictoryDefaultTiFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-structural-class-b-blocked",
            diagnostic: "nawat-route-verbalized-verb-contradictory-source-frame",
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
        "nawat route state reads LCM result-frame surfaces before stale result text",
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
    s.eq(
        "nawat route subject-number connector reader suppresses stale surfaces for empty LCM result frames",
        (() => {
            const framedConnector = {
                surface: "stale-connector",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surfaceForms: ["frame-connector"],
                    }),
                }),
            };
            const emptyConnector = {
                surface: "stale-connector",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            };
            return {
                framed: ctx.getStateNum1Num2Surface(framedConnector),
                empty: ctx.getStateNum1Num2Surface(emptyConnector),
                stale: ctx.getStateNum1Num2Surface({ surface: "stale-connector" }),
            };
        })(),
        {
            framed: "frame-connector",
            empty: "",
            stale: "stale-connector",
        }
    );
    const framedRouteTarget = ctx.attachNawatStaticRouteGrammarFrame({
        result: "—",
        surface: "stale-route-control",
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok: true,
                surfaceForms: ["frame-route-a", "frame-route-b"],
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
        targetSurface: "stale-target-surface",
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
        surface: "stale-route-control",
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
        targetSurface: "stale-target-surface",
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
            surface: "stale-station-surface",
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
        "nawat route station surface text suppresses stale surface for an empty LCM result frame",
        ctx.getNawatRouteStationSurfaceText({
            surface: "stale-station-surface",
            renderVerb: "stale-render",
            inputValue: "stale-input",
            frames: ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surfaceForms: [],
                }),
            }),
        }),
        ""
    );
    s.eq(
        "nawat route surface trail reads source-tense station LCM result-frame surfaces",
        ctx.formatNawatRouteSurfaceTrailLabel(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: tiPreteritTarget,
            stationModels: [{
                key: "source-tense",
                role: "source",
                surface: "stale-source-tense",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surfaceForms: ["frame-source-tense"],
                    }),
                }),
            }],
        }),
        "frame-source-tense"
    );
    s.eq(
        "nawat route surface trail suppresses stale source-tense station surface for an empty LCM result frame",
        ctx.formatNawatRouteSurfaceTrailLabel(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: tiPreteritTarget,
            stationModels: [{
                key: "source-tense",
                role: "source",
                surface: "stale-source-tense",
                renderVerb: "stale-render",
                inputValue: "stale-input",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            }],
        }),
        ""
    );
    s.eq(
        "nawat route source-state metadata reads LCM station result-frame surfaces before stale station fields",
        (() => {
            const sourceState = ctx.resolveNawatRouteSourceStateMetadata("denominal-vi-ti-preterit", {
                sourceVerb: "(pusuni)",
                routeTarget: {
                    ...tiPreteritTarget,
                    sourceStem: "stale-target-stem",
                },
                stationModels: [
                    {
                        key: "source-mode",
                        role: "source",
                        inputValue: "(pusuni)",
                    },
                    {
                        key: "stem",
                        role: "stem",
                        inputValue: "stale-station-input",
                        surface: "stale-station-surface",
                        frames: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                ok: true,
                                surfaceForms: ["frame-source-stem"],
                            }),
                        }),
                    },
                ],
            });
            return {
                sourceSurface: sourceState?.sourceSurface || "",
                profileSourceSurface: sourceState?.denominalFamilyProfile?.sourceSurface || "",
            };
        })(),
        {
            sourceSurface: "frame-source-stem",
            profileSourceSurface: "frame-source-stem",
        }
    );
    s.eq(
        "nawat route source-state metadata suppresses stale station and target stems for an empty LCM station result frame",
        (() => {
            const sourceState = ctx.resolveNawatRouteSourceStateMetadata("denominal-vi-ti-preterit", {
                sourceVerb: "(pusuni)",
                sourceStem: "stale-explicit-stem",
                routeTarget: {
                    ...tiPreteritTarget,
                    sourceStem: "stale-target-stem",
                },
                stationModels: [
                    {
                        key: "source-mode",
                        role: "source",
                        inputValue: "(pusuni)",
                    },
                    {
                        key: "stem",
                        role: "stem",
                        inputValue: "stale-station-input",
                        surface: "stale-station-surface",
                        frames: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                ok: false,
                                surface: "",
                                surfaceForms: [],
                            }),
                        }),
                    },
                ],
            });
            return {
                sourceSurface: sourceState?.sourceSurface || "",
                profileSourceSurface: sourceState?.denominalFamilyProfile?.sourceSurface || "",
            };
        })(),
        {
            sourceSurface: "",
            profileSourceSurface: "",
        }
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
    const poisonClickedRouteTarget = {
        ...tiRouteFromTroncoOutputTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        targetVerbSourceFrame: {
            ...tiRouteFromTroncoOutputTarget.targetVerbSourceFrame,
            targetVerb: "poison",
            stem: "poison",
            surface: "poison",
            result: "poison",
            formulaEcho: "#poison#",
        },
    };
    s.eq(
        "clicked tronco route finite surface ignores lying display strings when source frame is unchanged",
        ctx.getNawatRouteFiniteSurfaceForm(tiPreteritRoute, {
            sourceVerb: "(pusuni)",
            sourceStem: "pusuchti",
            routeTarget: poisonClickedRouteTarget,
        }),
        "pusuchtitik"
    );
    const originalBuildClassBasedResultForClickedRoute = ctx.buildClassBasedResult;
    try {
        ctx.buildClassBasedResult = () => ({
            result: "poison",
            forms: ["poison"],
        });
        s.eq(
            "clicked tronco route finite surface ignores poisoned legacy class builder",
            ctx.getNawatRouteFiniteSurfaceForm(tiPreteritRoute, {
                sourceVerb: "(pusuni)",
                sourceStem: "pusuchti",
                routeTarget: poisonClickedRouteTarget,
            }),
            "pusuchtitik"
        );
    } finally {
        ctx.buildClassBasedResult = originalBuildClassBasedResultForClickedRoute;
    }
    const missingClickedRouteTargetFrameResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
        routeTarget: {
            ...tiRouteFromTroncoOutputTarget,
            targetVerbSourceFrame: null,
            targetVerb: "pusuchtiti",
        },
    });
    s.eq(
        "clicked tronco route missing target source frame blocks string target fallback",
        {
            surface: missingClickedRouteTargetFrameResult.surface,
            stage: missingClickedRouteTargetFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: missingClickedRouteTargetFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-structural-class-b-blocked",
            diagnostic: "nawat-route-verbalized-verb-missing-source-frame",
        }
    );
    const missingClickedRouteOperationFrame = {
        ...tiRouteFromTroncoOutputTarget.targetVerbSourceFrame,
        operationFrame: null,
    };
    const missingClickedRouteOperationResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
        routeTarget: {
            ...tiRouteFromTroncoOutputTarget,
            targetVerbSourceFrame: missingClickedRouteOperationFrame,
            targetVerb: "pusuchtiti",
        },
    });
    s.eq(
        "clicked tronco route missing target operation frame blocks string target fallback",
        {
            surface: missingClickedRouteOperationResult.surface,
            stage: missingClickedRouteOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: missingClickedRouteOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-structural-class-b-blocked",
            diagnostic: "nawat-route-verbalized-verb-missing-operation-frame",
        }
    );
    const contradictoryClickedRouteFrame = {
        ...tiRouteFromTroncoOutputTarget.targetVerbSourceFrame,
        targetVerbFrame: {
            ...tiRouteFromTroncoOutputTarget.targetVerbSourceFrame.targetVerbFrame,
            text: "poison",
        },
    };
    const contradictoryClickedRouteResult = ctx.getNawatRouteFiniteSurfaceResult(tiPreteritRoute, {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
        routeTarget: {
            ...tiRouteFromTroncoOutputTarget,
            targetVerbSourceFrame: contradictoryClickedRouteFrame,
            targetVerb: "pusuchtiti",
        },
    });
    s.eq(
        "clicked tronco route contradictory target frame blocks string target fallback",
        {
            surface: contradictoryClickedRouteResult.surface,
            stage: contradictoryClickedRouteResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: contradictoryClickedRouteResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-structural-class-b-blocked",
            diagnostic: "nawat-route-verbalized-verb-contradictory-source-frame",
        }
    );
    const naPerfectRoute = ctx.getNawatRouteProfile("denominal-vt-na-perfect");
    s.eq("canonical future nawat route resolves route tense", naPerfectRoute.routeTenseValue, "adjetivo-perfecto-naj");
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
            routeTenseValue: "adjetivo-preterito-naj",
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
            curriculumRef: { source: "Nawat route data", range: "static_modes", role: "configured-denominal-route" },
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
    s.eq("future nawat -iwi route has no configured route tense", iwiPreteritRoute.routeTenseValue, "");
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
            routeTenseValue: "",
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
    const iwiRouteFromTroncoOutputTarget = ctx.resolveNawatRouteTarget("denominal-vi-iwi-preterit", {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
    });
    const poisonedIwiClickedRouteTarget = {
        ...iwiRouteFromTroncoOutputTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        targetVerbSourceFrame: {
            ...iwiRouteFromTroncoOutputTarget.targetVerbSourceFrame,
            targetVerb: "poison",
            stem: "poison",
            surface: "poison",
            result: "poison",
            formulaEcho: "#poison#",
        },
    };
    const iwiClickedFiniteResult = ctx.getNawatRouteFiniteSurfaceResult(iwiPreteritRoute, {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
        routeTarget: poisonedIwiClickedRouteTarget,
    });
    s.eq(
        "clicked tronco -iwi route finite surface uses structural target frame over display strings",
        {
            surface: iwiClickedFiniteResult.surface,
            stage: iwiClickedFiniteResult.grammarFrame?.routeContract?.routeStage || "",
            sourceVerb: iwiClickedFiniteResult.sourceResult?.classBSourceFrame?.sourceVerbFrame?.text || "",
        },
        {
            surface: "pusuchtiiwik",
            stage: "finite-surface-structural-class-b",
            sourceVerb: "pusuchtiiwi",
        }
    );
    const missingIwiClickedRouteOperationResult = ctx.getNawatRouteFiniteSurfaceResult(iwiPreteritRoute, {
        sourceVerb: "(pusuni)",
        sourceStem: "pusuchti",
        routeTarget: {
            ...iwiRouteFromTroncoOutputTarget,
            targetVerbSourceFrame: {
                ...iwiRouteFromTroncoOutputTarget.targetVerbSourceFrame,
                operationFrame: null,
            },
            targetVerb: "pusuchtiiwi",
        },
    });
    s.eq(
        "clicked tronco -iwi route missing operation frame blocks string fallback",
        {
            surface: missingIwiClickedRouteOperationResult.surface,
            stage: missingIwiClickedRouteOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: missingIwiClickedRouteOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-structural-class-b-blocked",
            diagnostic: "nawat-route-verbalized-verb-missing-operation-frame",
        }
    );
    const iwiPerfectRoute = ctx.getNawatRouteProfile("denominal-vi-iwi-perfect");
    const iwiPerfectTarget = ctx.resolveNawatRouteTarget("denominal-vi-iwi-perfect", {
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "future nawat -iwi perfect keeps route stem but blocks finite CNV extension output",
        ctx.formatNawatRouteSurfaceTrailLabel(iwiPerfectRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: iwiPerfectTarget,
        }),
        "(pusuni) → pusuk → (pusukiwi)"
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
        "future nawat -awi perfect keeps route stem but blocks finite CNV extension output",
        ctx.formatNawatRouteSurfaceTrailLabel(awiPerfectRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: awiPerfectTarget,
        }),
        "(pusuni) → pusuk → (pusukawi)"
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
                surfaceSuffixes: ["-iwik", "-iwtuk", "-ijtuk"],
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
                surfaceSuffixes: ["-awik", "-awtuk", "-ajtuk"],
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
    const iwiPerfectProfile = ctx.getNawatRouteProfile("denominal-vi-iwi-perfect");
    const iwiPerfectSuffixSourceFrame = ctx.buildNawatRouteSurfaceSuffixInventorySourceFrame(iwiPerfectProfile);
    const iwiPerfectSuffixOperationFrame = ctx.buildNawatRouteSurfaceSuffixInventoryOperationFrame(iwiPerfectSuffixSourceFrame);
    s.eq(
        "denominal perfect route suffix variants require structured suffix frames",
        {
            sourceKind: iwiPerfectSuffixSourceFrame.kind,
            sourceLayer: iwiPerfectSuffixSourceFrame.sourceLayer,
            displaySurfaceSuffix: iwiPerfectSuffixSourceFrame.displaySurfaceSuffix,
            suffixFrames: iwiPerfectSuffixSourceFrame.suffixFrames.map((frame) => frame.suffix),
            operationKind: iwiPerfectSuffixOperationFrame.kind,
            operationStatus: iwiPerfectSuffixOperationFrame.status,
            suffixes: ctx.getNawatRouteSurfaceSuffixesFromOperationFrame(iwiPerfectProfile, iwiPerfectSuffixOperationFrame),
            directMissingOperation: ctx.getNawatRouteSurfaceSuffixesFromOperationFrame(iwiPerfectProfile),
            staleDisplayProfile: ctx.getNawatRouteSurfaceSuffixesFromOperationFrame({
                ...iwiPerfectProfile,
                surfaceSuffix: "-stale/-display",
            }, iwiPerfectSuffixOperationFrame),
            missingStructuredArrayBlock: ctx.buildNawatRouteSurfaceSuffixInventorySourceFrame({
                ...iwiPerfectProfile,
                surfaceSuffixes: [],
            }).blockReason,
            slashStructuredArrayBlock: ctx.buildNawatRouteSurfaceSuffixInventorySourceFrame({
                ...iwiPerfectProfile,
                surfaceSuffixes: ["-iwtuk/-ijtuk"],
            }).blockReason,
        },
        {
            sourceKind: "nawat-route-surface-suffix-inventory-source-frame",
            sourceLayer: "static-route-profile-structured-suffixes",
            displaySurfaceSuffix: "-iwtuk/-ijtuk",
            suffixFrames: ["-iwtuk", "-ijtuk"],
            operationKind: "andrews-nawat-route-surface-suffix-inventory-operation-frame",
            operationStatus: "authorized",
            suffixes: ["-iwtuk", "-ijtuk"],
            directMissingOperation: [],
            staleDisplayProfile: [],
            missingStructuredArrayBlock: "missing-structured-surface-suffixes",
            slashStructuredArrayBlock: "slash-delimited-structured-suffix",
        }
    );
    const andrewsDenominalContracts = ctx.getNawatDenominalAndrewsContractInventory();
    s.eq(
        "Andrews source-gated derivational route registry normalizes current route families with formula and structure",
        (() => {
            const registry = ctx.buildAndrewsSourceGatedDerivationalRouteRegistry();
            const relational = registry.routes.find((route) => route.id === "lesson-46-3-1-a-preterit-agentive-locative-nnc") || {};
            const denominal = registry.routes.find((route) => route.contractId === "54.2.3-ti-ya-deverbal") || {};
            const cnvCnn = registry.routes.find((route) => route.id === "cnn-nounstem-to-cnv-verbstem-denominal") || {};
            const lesson1 = registry.routes.find((route) => route.id === "lesson-1-grammar-concept-route") || {};
            const lesson2 = registry.routes.find((route) => route.id === "lesson-2-orthography-bridge-route") || {};
            const lesson3 = registry.routes.find((route) => route.id === "lesson-3-particle-boundary-route") || {};
            const passive = registry.routes.find((route) => route.id === "lesson-21-passive-voice") || {};
            const impersonal = registry.routes.find((route) => route.id === "lesson-22-impersonal-voice") || {};
            const lesson5 = registry.routes.find((route) => route.id === "lesson-5-intransitive-vnc") || {};
            const lesson12 = registry.routes.find((route) => route.id === "lesson-12-absolutive-nnc") || {};
            const lesson17 = registry.routes.find((route) => route.id === "lesson-17-supplementation") || {};
            const nonactive = registry.routes.find((route) => route.id === "lesson-20-nonactive-verbstem") || {};
            const verbObjects = registry.routes.find((route) => route.id === "lesson-23-verb-object-valence") || {};
            const firstTypeCausative = registry.routes.find((route) => route.id === "lesson-24-first-type-causative") || {};
            const secondTypeCausative = registry.routes.find((route) => route.id === "lesson-25-second-type-causative") || {};
            const applicative = registry.routes.find((route) => route.id === "lesson-26-applicative") || {};
            const preteritAgentive = registry.routes.find((route) => route.id === "lesson-35-preterit-agentive-nominalization") || {};
            const deverbalNounstem = registry.routes.find((route) => route.id === "lesson-37-deverbal-nounstem") || {};
            const impersonalPatientive = registry.routes.find((route) => route.id === "lesson-38-impersonal-patientive") || {};
            const patientiveOperations = registry.routes.find((route) => route.id === "lesson-39-patientive-operations") || {};
            const frequentative = registry.routes.find((route) => route.id === "lesson-27-frequentative") || {};
            const verbalEmbed = registry.routes.find((route) => route.id === "lesson-28-verbal-embed-compound") || {};
            const purposive = registry.routes.find((route) => route.id === "lesson-29-purposive-directional") || {};
            const nominalEmbed = registry.routes.find((route) => route.id === "lesson-30-nominal-embed-compound") || {};
            const compoundNounstem = registry.routes.find((route) => route.id === "lesson-31-compound-nounstem") || {};
            const affectiveNnc = registry.routes.find((route) => route.id === "lesson-32-affective-nnc") || {};
            const honorificPejorative = registry.routes.find((route) => route.id === "lesson-33-honorific-pejorative") || {};
            const cardinalNumeral = registry.routes.find((route) => route.id === "lesson-34-cardinal-numeral-nnc") || {};
            const adjectivalNnc = registry.routes.find((route) => route.id === "lesson-40-adjectival-nnc-function") || {};
            const intensifiedAdjectival = registry.routes.find((route) => route.id === "lesson-41-intensified-compound-adjectival-nnc") || {};
            const modification = registry.routes.find((route) => route.id === "lesson-42-adjectival-modification") || {};
            const adverbialNuclear = registry.routes.find((route) => route.id === "lesson-44-adverbial-nuclear-clause") || {};
            const relationalOptions = registry.routes.find((route) => route.id === "lesson-45-relational-nnc-options") || {};
            const relationalOptionTwo = registry.routes.find((route) => route.id === "lesson-46-relational-nnc-option-two") || {};
            const placeGentilic = registry.routes.find((route) => route.id === "lesson-48-place-gentilic-nnc") || {};
            const adverbialAdjunction = registry.routes.find((route) => route.id === "lesson-49-adverbial-adjunction") || {};
            const complementClause = registry.routes.find((route) => route.id === "lesson-51-complement-clause") || {};
            const conjunctionClause = registry.routes.find((route) => route.id === "lesson-52-conjunction-clause") || {};
            const comparison = registry.routes.find((route) => route.id === "lesson-53-comparison") || {};
            const personalName = registry.routes.find((route) => route.id === "lesson-56-personal-name-nnc") || {};
            const analysis57 = registry.routes.find((route) => route.id === "lesson-57-analysis-diagnostics") || {};
            const denominal54 = registry.routes.find((route) => route.id === "lesson-54-denominal-verbstem") || {};
            const denominal55 = registry.routes.find((route) => route.id === "lesson-55-denominal-verbstem") || {};
            const routeInvariantFailures = registry.routes.filter((route) => !(
                route.formulaTransition
                && route.formulaTemplate
                && route.structuralInfo
                && typeof route.structuralInfo === "object"
                && route.sourceGate?.gated === true
                && route.sourceGate?.status
            )).map((route) => route.id || route.contractId || "");
            return {
                kind: registry.kind,
                scope: registry.scope,
                routeCountMatches: registry.routeCount === registry.routes.length,
                routeInvariantFailures,
                hasCnvCnnFamily: registry.routeFamilyCounts["cnv-cnn-back-and-forth"] > 0,
                hasDenominalFamily: registry.routeFamilyCounts["denominal-andrews-executable-rule"] > 0,
                hasRelationalFamily: registry.routeFamilyCounts["relational-nnc"] === 1,
                foundationMetadataRouteCount: registry.routeFamilyCounts["foundation-metadata-route"],
                valencyVoiceCount: registry.routeFamilyCounts["valency-voice"],
                foundationRouteCount: registry.routeFamilyCounts["foundation-route"],
                vncSourceRouteCount: registry.routeFamilyCounts["vnc-source-route"],
                forwardDerivationCount: registry.routeFamilyCounts["forward-derivation"],
                nominalizationCount: registry.routeFamilyCounts.nominalization,
                derivationalBoundaryCount: registry.routeFamilyCounts["derivational-boundary"],
                nncFunctionCount: registry.routeFamilyCounts["nnc-function"],
                clauseRelationCount: registry.routeFamilyCounts["clause-relation"],
                diagnosticAnalysisCount: registry.routeFamilyCounts["diagnostic-analysis"],
                denominalLessonCount: registry.routeFamilyCounts["denominal-lesson"],
                relationalFormula: relational.formulaTemplate || "",
                relationalExample: relational.structuralInfo?.exampleTargetFormula || "",
                relationalGate: relational.sourceGate?.status || "",
                denominalFormulaTransition: denominal.formulaTransition || "",
                denominalGateIds: denominal.sourceGate?.requirementIds || [],
                cnvCnnFormulaTransition: cnvCnn.formulaTransition || "",
                cnvCnnRequiredBoundary: cnvCnn.structuralInfo?.requiredBoundary || "",
                lesson1Formula: lesson1.formulaTemplate || "",
                lesson1ConceptCount: lesson1.structuralInfo?.conceptCount || 0,
                lesson1Gate: lesson1.sourceGate?.status || "",
                lesson2Transition: lesson2.formulaTransition || "",
                lesson2Gate: lesson2.sourceGate?.status || "",
                lesson3Formula: lesson3.formulaTemplate || "",
                lesson3Gate: lesson3.sourceGate?.status || "",
                passiveGate: passive.sourceGate?.status || "",
                passiveFormulaTransition: passive.formulaTransition || "",
                impersonalGate: impersonal.sourceGate?.status || "",
                impersonalRefs: impersonal.structuralInfo?.subsectionRefs || [],
                lesson5Formula: lesson5.formulaTemplate || "",
                lesson5Gate: lesson5.sourceGate?.status || "",
                lesson12Formula: lesson12.formulaTemplate || "",
                lesson12Gate: lesson12.sourceGate?.status || "",
                lesson17Formula: lesson17.formulaTemplate || "",
                lesson17Gate: lesson17.sourceGate?.status || "",
                nonactiveFormula: nonactive.formulaTemplate || "",
                nonactiveGate: nonactive.sourceGate?.status || "",
                verbObjectsFormula: verbObjects.formulaTemplate || "",
                verbObjectsGate: verbObjects.sourceGate?.status || "",
                firstTypeFormula: firstTypeCausative.formulaTemplate || "",
                firstTypeGate: firstTypeCausative.sourceGate?.status || "",
                firstTypeMorpheme: firstTypeCausative.structuralInfo?.causativeMorpheme || null,
                secondTypeFormula: secondTypeCausative.formulaTemplate || "",
                secondTypeGate: secondTypeCausative.sourceGate?.status || "",
                secondTypeClass: secondTypeCausative.structuralInfo?.classMembership || "",
                applicativeFormula: applicative.formulaTemplate || "",
                applicativeGate: applicative.sourceGate?.status || "",
                applicativeMainline: applicative.structuralInfo?.applicativeObjectIsMainline,
                preteritAgentiveFormula: preteritAgentive.formulaTemplate || "",
                preteritAgentiveGate: preteritAgentive.sourceGate?.status || "",
                preteritAgentiveStemKind: preteritAgentive.structuralInfo?.stemKind || "",
                deverbalFormula: deverbalNounstem.formulaTemplate || "",
                deverbalGate: deverbalNounstem.sourceGate?.status || "",
                deverbalSuffixes: deverbalNounstem.structuralInfo?.stemFrame?.activeActionNawatSuffixes || [],
                impersonalPatientiveGate: impersonalPatientive.sourceGate?.status || "",
                impersonalPatientiveTransition: impersonalPatientive.structuralInfo?.categoryTransition || "",
                patientiveOperationsGate: patientiveOperations.sourceGate?.status || "",
                patientiveOperationsStemKind: patientiveOperations.structuralInfo?.stemKind || "",
                frequentativeFormula: frequentative.formulaTemplate || "",
                frequentativeGate: frequentative.sourceGate?.status || "",
                verbalEmbedFormula: verbalEmbed.formulaTemplate || "",
                verbalEmbedGate: verbalEmbed.sourceGate?.status || "",
                purposiveTransition: purposive.formulaTransition || "",
                purposiveGate: purposive.sourceGate?.status || "",
                nominalEmbedTransition: nominalEmbed.formulaTransition || "",
                nominalEmbedGate: nominalEmbed.sourceGate?.status || "",
                compoundNounstemFormula: compoundNounstem.formulaTemplate || "",
                compoundNounstemGate: compoundNounstem.sourceGate?.status || "",
                affectiveGate: affectiveNnc.sourceGate?.status || "",
                honorificFormula: honorificPejorative.formulaTemplate || "",
                honorificGate: honorificPejorative.sourceGate?.status || "",
                cardinalFormula: cardinalNumeral.formulaTemplate || "",
                cardinalGate: cardinalNumeral.sourceGate?.status || "",
                adjectivalFormula: adjectivalNnc.formulaTemplate || "",
                adjectivalGate: adjectivalNnc.sourceGate?.status || "",
                intensifiedGate: intensifiedAdjectival.sourceGate?.status || "",
                modificationTransition: modification.formulaTransition || "",
                modificationGate: modification.sourceGate?.status || "",
                adverbialFormula: adverbialNuclear.formulaTemplate || "",
                adverbialGate: adverbialNuclear.sourceGate?.status || "",
                relationalOptionsGate: relationalOptions.sourceGate?.status || "",
                relationalOptionTwoFormula: relationalOptionTwo.formulaTemplate || "",
                relationalOptionTwoGate: relationalOptionTwo.sourceGate?.status || "",
                placeGentilicGate: placeGentilic.sourceGate?.status || "",
                adverbialAdjunctionFormula: adverbialAdjunction.formulaTemplate || "",
                adverbialAdjunctionGate: adverbialAdjunction.sourceGate?.status || "",
                complementFormula: complementClause.formulaTemplate || "",
                complementGate: complementClause.sourceGate?.status || "",
                conjunctionFormula: conjunctionClause.formulaTemplate || "",
                conjunctionGate: conjunctionClause.sourceGate?.status || "",
                comparisonFormula: comparison.formulaTemplate || "",
                comparisonGate: comparison.sourceGate?.status || "",
                personalNameFormula: personalName.formulaTemplate || "",
                personalNameGate: personalName.sourceGate?.status || "",
                analysis57Formula: analysis57.formulaTemplate || "",
                analysis57Gate: analysis57.sourceGate?.status || "",
                denominal54Formula: denominal54.formulaTemplate || "",
                denominal54Gate: denominal54.sourceGate?.status || "",
                denominal55Formula: denominal55.formulaTemplate || "",
                denominal55Gate: denominal55.sourceGate?.status || "",
                coverageAudit: {
                    scope: registry.coverageAudit?.scope,
                    expectedLessonCount: registry.coverageAudit?.expectedLessonCount,
                    coveredLessonCount: registry.coverageAudit?.coveredLessonCount,
                    missingLessonNumbers: registry.coverageAudit?.missingLessonNumbers || [],
                    routeInvariantFailures: registry.coverageAudit?.routeInvariantFailures || [],
                    lessonSourceGatedRouteCount: registry.coverageAudit?.lessonSourceGatedRouteCount,
                    sectionSourceGatedRouteCount: registry.coverageAudit?.sectionSourceGatedRouteCount,
                    internalSourceGatedRouteCount: registry.coverageAudit?.internalSourceGatedRouteCount,
                    allAndrewsRouteContractFailures: registry.coverageAudit?.allAndrewsRouteContractFailures || [],
                    internalEntrySpecificFallbackCount: registry.coverageAudit?.internalEntrySpecificFallbackCount,
                    internalSourcePathFormulaMissingCount: registry.coverageAudit?.internalSourcePathFormulaMissingCount,
                    lessonLevelCoverageComplete: registry.coverageAudit?.lessonLevelCoverageComplete,
                    sectionLevelAndrewsRouteAuditComplete: registry.coverageAudit?.sectionLevelAndrewsRouteAuditComplete,
                    internalLevelAndrewsRouteAuditComplete: registry.coverageAudit?.internalLevelAndrewsRouteAuditComplete,
                },
                complete: registry.boundaries.allAndrewsRoutesComplete,
                noFixtureEvidence: registry.boundaries.noFixtureEvidence,
                formulaAndStructureRequired: registry.boundaries.formulaAndStructureRequired,
            };
        })(),
        {
            kind: "andrews-source-gated-derivational-route-registry",
            scope: "all-andrews-route-contract-coverage",
            routeCountMatches: true,
            routeInvariantFailures: [],
            hasCnvCnnFamily: true,
            hasDenominalFamily: true,
            hasRelationalFamily: true,
            foundationMetadataRouteCount: 3,
            valencyVoiceCount: 2,
            foundationRouteCount: 16,
            vncSourceRouteCount: 2,
            forwardDerivationCount: 3,
            nominalizationCount: 5,
            derivationalBoundaryCount: 8,
            nncFunctionCount: 9,
            clauseRelationCount: 5,
            diagnosticAnalysisCount: 3,
            denominalLessonCount: 2,
            relationalFormula: "(SOURCE-0-ka-n)-0-",
            relationalExample: "(mich-namaka-0-ka-n)-0-",
            relationalGate: "source-formula-required",
            denominalFormulaTransition: "VNC->VNC",
            denominalGateIds: ["generated-ti-verbstem-required"],
            cnvCnnFormulaTransition: "CNN->CNV",
            cnvCnnRequiredBoundary: "No ejecutar generación finita desde un blanco de tronco si falta fuente Andrews concreta, objeto, tiempo o puente ortografico.",
            lesson1Formula: "CONCEPT_TOKEN -> GRAMMAR_CONCEPT_FRAME(CN/CNV/CNN/STEM/SLOT/AFFIX)",
            lesson1ConceptCount: 26,
            lesson1Gate: "concept-token-or-registry-source-required",
            lesson2Transition: "CLASSICAL_LETTERS->NAWAT_LETTERS",
            lesson2Gate: "source-spelling-slot-and-position-required",
            lesson3Formula: "PARTICLE_CANDIDATE -> PARTICLE_BOUNDARY_FRAME(FUNCTION/PLACEMENT)",
            lesson3Gate: "particle-candidate-or-seed-source-required",
            passiveGate: "promotable-object-source-required",
            passiveFormulaTransition: "CNV->CNV",
            impersonalGate: "impersonal-compatible-source-required",
            impersonalRefs: ["22.1", "22.2", "22.3", "22.4", "22.5", "22.6"],
            lesson5Formula: "#pers1(STEM)tense-num1#",
            lesson5Gate: "intransitive-vnc-source-required",
            lesson12Formula: "#pers1-pers2(STEM)num1-num2#",
            lesson12Gate: "absolutive-nnc-source-required",
            lesson17Formula: "HEAD(CN)+SUPPLEMENT(CN) -> SUPPLEMENTATION_FRAME",
            lesson17Gate: "supplementation-source-required",
            nonactiveFormula: "CNV(ACTIVE_IMPERFECTIVE_STEM) -> CNV(NONACTIVE_STEM[-lu/-luwa/-u/-uwa/-wa/-walu])",
            nonactiveGate: "active-imperfective-source-required",
            verbObjectsFormula: "CNV(SOURCE_STEM+OBJECT_ROLES) -> CNV(MAINLINE/SHUNTLINE_OBJECT_FORMULA)",
            verbObjectsGate: "object-role-source-required",
            firstTypeFormula: "CNV(SOURCE_STEM -> TYPE_ONE_CAUSATIVE_STEM[-a])",
            firstTypeGate: "type-one-causative-compatible-source-required",
            firstTypeMorpheme: { andrews: "a", nawat: "a" },
            secondTypeFormula: "CNV(SOURCE_STEM -> TYPE_TWO_CAUSATIVE_STEM[-tia/-lia/-wia])",
            secondTypeGate: "type-two-causative-compatible-source-required",
            secondTypeClass: "Class C",
            applicativeFormula: "CNV(SOURCE_STEM -> APPLICATIVE_STEM[-ia/-lia/-wia/-tia])",
            applicativeGate: "applicative-compatible-source-required",
            applicativeMainline: true,
            preteritAgentiveFormula: "CNV(PRETERIT_SOURCE_CORE) -> CNN(PRETERIT_AGENTIVE_NOUNSTEM)",
            preteritAgentiveGate: "preterit-source-core-required",
            preteritAgentiveStemKind: "preterit-agentive-nnc",
            deverbalFormula: "CNV(SOURCE_CORE) -> CNN(DEVERBAL_NOUNSTEM[-s/-lis/PATIENTIVE])",
            deverbalGate: "deverbal-source-core-required",
            deverbalSuffixes: ["s", "lis"],
            impersonalPatientiveGate: "impersonal-patientive-source-core-required",
            impersonalPatientiveTransition: "impersonal VNC core -> patientive NNC nounstem",
            patientiveOperationsGate: "patientive-family-source-required",
            patientiveOperationsStemKind: "patientive-family",
            frequentativeFormula: "CNV(SOURCE_STEM) -> CNV(FREQUENTATIVE_STEM[REDUP])",
            frequentativeGate: "frequentative-source-stem-required",
            verbalEmbedFormula: "EMBED(CNV/CNN)+MATRIX -> COMPOUND(CNV/CNN)",
            verbalEmbedGate: "verbal-embed-source-and-matrix-required",
            purposiveTransition: "CNV+CNV->CNV",
            purposiveGate: "purposive-embed-and-directional-matrix-required",
            nominalEmbedTransition: "CNN+CNV->CNV",
            nominalEmbedGate: "nominal-embed-source-and-matrix-required",
            compoundNounstemFormula: "CNN(EMBED)+CNN(MATRIX) -> CNN(COMPOUND_NOUNSTEM)",
            compoundNounstemGate: "compound-nounstem-source-and-matrix-required",
            affectiveGate: "affective-nounstem-source-required",
            honorificFormula: "CNV(SOURCE_STEM) -> CNV(HONORIFIC_OR_PEJORATIVE_STEM)",
            honorificGate: "honorific-pejorative-source-required",
            cardinalFormula: "NUMERAL_SOURCE -> CNN(ABSOLUTIVE_CARDINAL_NUMERAL_NNC)",
            cardinalGate: "cardinal-numeral-source-required",
            adjectivalFormula: "CNN/CNV(SOURCE) -> ADJECTIVAL_FUNCTION(SOURCE_STEM)",
            adjectivalGate: "adjectival-function-source-required",
            intensifiedGate: "intensified-or-compound-adjectival-source-required",
            modificationTransition: "CN+CN->MODIFICATION",
            modificationGate: "head-and-modifier-source-clauses-required",
            adverbialFormula: "CNV/CNN(SOURCE) -> ADVERBIAL_FUNCTION(SOURCE)",
            adverbialGate: "adverbializable-nuclear-clause-source-required",
            relationalOptionsGate: "relational-nnc-option-source-required",
            relationalOptionTwoFormula: "SOURCE+RELATIONAL_MATRIX -> CNN(OPTION_TWO_RELATIONAL_NNC)",
            relationalOptionTwoGate: "option-two-relational-source-required",
            placeGentilicGate: "place-or-gentilic-source-required",
            adverbialAdjunctionFormula: "HEAD(CN)+ADVERBIAL_MODIFIER(CN) -> ADVERBIAL_ADJUNCTION_AST",
            adverbialAdjunctionGate: "adverbial-head-and-modifier-source-required",
            complementFormula: "PRINCIPAL(CN)+COMPLEMENT(CN) -> COMPLEMENT_AST",
            complementGate: "principal-and-complement-source-required",
            conjunctionFormula: "CONJUNCT(CN)+CONJUNCT(CN) -> CONJUNCTION_AST",
            conjunctionGate: "conjunct-source-clauses-required",
            comparisonFormula: "COMPARAND(CN)+STANDARD(CN)+COMPARISON_MARKER -> COMPARISON_STRUCTURE",
            comparisonGate: "comparison-source-clauses-required",
            personalNameFormula: "SOURCE_STATEMENT(CN) -> CNN(PERSONAL_NAME_NNC)",
            personalNameGate: "personal-name-source-statement-required",
            analysis57Formula: "TEXT_SOURCE -> ANDREWS_57_DIAGNOSTIC_FRAME",
            analysis57Gate: "textual-analysis-source-required",
            denominal54Formula: "CNN_SOURCE -> CNV(DENOMINAL_VERBSTEM[-ti/-hui/-ya/-a/-hua/-lia])",
            denominal54Gate: "lesson-54-denominal-source-required",
            denominal55Formula: "CNN/RELATIONAL_SOURCE -> CNV(DENOMINAL_VERBSTEM[-tia/-tla/-oa/-huia/-i-a])",
            denominal55Gate: "lesson-55-denominal-source-required",
            coverageAudit: {
                scope: "all-andrews-route-contract-coverage",
                expectedLessonCount: 58,
                coveredLessonCount: 58,
                missingLessonNumbers: [],
                routeInvariantFailures: [],
                lessonSourceGatedRouteCount: 58,
                sectionSourceGatedRouteCount: 505,
                internalSourceGatedRouteCount: 921,
                allAndrewsRouteContractFailures: [],
                internalEntrySpecificFallbackCount: 0,
                internalSourcePathFormulaMissingCount: 0,
                lessonLevelCoverageComplete: true,
                sectionLevelAndrewsRouteAuditComplete: true,
                internalLevelAndrewsRouteAuditComplete: true,
            },
            complete: true,
            noFixtureEvidence: true,
            formulaAndStructureRequired: true,
        }
    );
    s.eq(
        "derivational route formula workbench exposes source, operation, target, and source gates",
        (() => {
            const generated = ctx.buildDerivationalRouteFormulaWorkbenchSlice({ inputValue: "mich-namaka" });
            const pending = ctx.buildDerivationalRouteFormulaWorkbenchSlice({ inputValue: "kal" });
            const model = ctx.getAndrewsFormulaWorkbenchModel({
                activeId: "derivational-routes",
                inputValue: "mich-namaka",
            });
            const sourceSlot = generated.parsedSlots.find((slot) => slot.key === "sourceFormula");
            const operationSlot = generated.parsedSlots.find((slot) => slot.key === "operation");
            const targetSlot = generated.parsedSlots.find((slot) => slot.key === "targetFormula");
            const examples = Object.fromEntries(generated.examples.map((example) => [example.id, {
                status: example.status,
                structuralFormulaEcho: example.structuralFormulaEcho,
                compactFormulaEcho: example.compactFormulaEcho,
                surface: example.surface,
                routeFamily: example.routeFamily,
                sourceGateStatus: example.sourceGateStatus,
                generationAllowed: example.generationAllowed,
            }]));
            return {
                modelActiveId: model.activeId,
                modelSliceKind: model.activeSlice?.kind || "",
                formula: generated.formula,
                structuralFormulaEcho: generated.structuralFormulaEcho,
                compactFormulaEcho: generated.compactFormulaEcho,
                generation: {
                    status: generated.generation.status,
                    allowed: generated.generation.allowed,
                    surface: generated.generation.surface,
                },
                pending: {
                    structuralFormulaEcho: pending.structuralFormulaEcho,
                    status: pending.generation.status,
                    allowed: pending.generation.allowed,
                    surface: pending.generation.surface,
                    diagnostics: pending.diagnostics.map((diagnostic) => diagnostic.id),
                },
                sourceSlot: {
                    role: sourceSlot.role,
                    owner: sourceSlot.owner,
                    path: sourceSlot.path,
                    value: sourceSlot.value,
                },
                operationSlot: {
                    role: operationSlot.role,
                    owner: operationSlot.owner,
                    path: operationSlot.path,
                    value: operationSlot.value,
                    notSurfaceShortcut: operationSlot.modelFields.some((field) => field.label === "no" && field.value === "atajo de superficie"),
                },
                targetSlot: {
                    role: targetSlot.role,
                    owner: targetSlot.owner,
                    path: targetSlot.path,
                    value: targetSlot.value,
                },
                routeRegistrySummary: generated.routeRegistrySummary,
                realizationBoundary: generated.realizationBoundary,
                examples,
            };
        })(),
        {
            modelActiveId: "derivational-routes",
            modelSliceKind: "derivational-route-formula-workbench-slice",
            formula: "SOURCE -> OP -> TARGET",
            structuralFormulaEcho: "(mich-namaka) -> preterit-agentive-general-use-plus-locative-n-plus-zero-connector -> (mich-namaka-0-ka-n)-0-",
            compactFormulaEcho: "CNV->CNN: preterit-agentive-general-use-plus-locative-n-plus-zero-connector",
            generation: {
                status: "generated-scoped",
                allowed: true,
                surface: "michnamakakan",
            },
            pending: {
                structuralFormulaEcho: "(kal) -> preterit-agentive-general-use-plus-locative-n-plus-zero-connector -> (kal-0-ka-n)-0-",
                status: "andrews-logic-generated",
                allowed: true,
                surface: "kalkan",
                diagnostics: [
                    "derivational-route-source-gate-required",
                ],
            },
            sourceSlot: {
                role: "source-formula",
                owner: "route",
                path: "route.source",
                value: "(mich-namaka)",
            },
            operationSlot: {
                role: "derivational-operation",
                owner: "route",
                path: "route.operation",
                value: "preterit-agentive-general-use-plus-locative-n-plus-zero-connector",
                notSurfaceShortcut: true,
            },
            targetSlot: {
                role: "target-formula",
                owner: "route",
                path: "route.target",
                value: "(mich-namaka-0-ka-n)-0-",
            },
            routeRegistrySummary: {
                routeCount: 96,
                familyCounts: {
                    "cnv-cnn-back-and-forth": 7,
                    "denominal-andrews-executable-rule": 30,
                    "foundation-metadata-route": 3,
                    "relational-nnc": 1,
                    "valency-voice": 2,
                    "vnc-source-route": 2,
                    "foundation-route": 16,
                    "forward-derivation": 3,
                    nominalization: 5,
                    "derivational-boundary": 8,
                    "nnc-function": 9,
                    "clause-relation": 5,
                    "diagnostic-analysis": 3,
                    "denominal-lesson": 2,
                },
                sourceGatedRouteCount: 96,
                generationAllowedRouteCount: 2,
                coverageScope: "all-andrews-route-contract-coverage",
            },
            realizationBoundary: {
                structuralFormulaEcho: "(mich-namaka) -> preterit-agentive-general-use-plus-locative-n-plus-zero-connector -> (mich-namaka-0-ka-n)-0-",
                nawatFormulaEcho: "(mich-namaka) -> preterit-agentive-general-use-plus-locative-n-plus-zero-connector -> (mich-namaka-0-ka-n)-0-",
                compactFormulaEcho: "CNV->CNN: preterit-agentive-general-use-plus-locative-n-plus-zero-connector",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: ["CNV->CNV", "CNV->CNN", "CNN->CNV", "EMBED+MATRIX"],
                nawatAuthority: "la ortografia Nawat/Pipil realiza la logica de ruta autorizada por Andrews; los ejemplos ortograficos no deciden la puerta gramatical",
                logicAuthority: "Andrews PDF",
                generationGate: "andrews-licensed-route-plus-required-source-context",
            },
            examples: {
                "route-46-3-1-a": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "(mich-namaka) -> preterit-agentive-general-use-plus-locative-n-plus-zero-connector -> (mich-namaka-0-ka-n)-0-",
                    compactFormulaEcho: "CNV->CNN: preterit-agentive-general-use-plus-locative-n-plus-zero-connector",
                    surface: "michnamakakan",
                    routeFamily: "relational-nnc",
                    sourceGateStatus: "source-formula-required",
                    generationAllowed: true,
                },
                "route-24-causative": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "CNV(panu) -> type-one-causative-source-to-causative-stem -> CNV(panawia)",
                    compactFormulaEcho: "CNV->CNV: type-one-causative-source-to-causative-stem",
                    surface: "panawia",
                    routeFamily: "forward-derivation",
                    sourceGateStatus: "type-one-causative-compatible-source-required",
                    generationAllowed: true,
                },
                "route-25-causative": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "CNV(nemi) -> type-two-causative-source-to-causative-stem -> CNV(nemitia)",
                    compactFormulaEcho: "CNV->CNV: type-two-causative-source-to-causative-stem",
                    surface: "nemitia",
                    routeFamily: "forward-derivation",
                    sourceGateStatus: "type-two-causative-compatible-source-required",
                    generationAllowed: true,
                },
                "route-26-applicative": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "CNV(maka) -> applicative-source-to-applicative-stem -> CNV(makilia)",
                    compactFormulaEcho: "CNV->CNV: applicative-source-to-applicative-stem",
                    surface: "makilia",
                    routeFamily: "forward-derivation",
                    sourceGateStatus: "applicative-compatible-source-required",
                    generationAllowed: true,
                },
                "route-27-frequentative": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "CNV(nemi) -> source-stem-reduplication-to-frequentative-stem -> CNV(ne-nemi)",
                    compactFormulaEcho: "CNV->CNV: source-stem-reduplication-to-frequentative-stem",
                    surface: "nenemi",
                    routeFamily: "derivational-boundary",
                    sourceGateStatus: "frequentative-source-stem-required",
                    generationAllowed: true,
                },
                "route-35-agentive-nominalization": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "CNV(chiwa-0) -> preterit-vnc-core-to-agentive-nounstem -> CNN(chiwa-0-ka)",
                    compactFormulaEcho: "CNV->CNN: preterit-vnc-core-to-agentive-nounstem",
                    surface: "chiwaka",
                    routeFamily: "nominalization",
                    sourceGateStatus: "preterit-source-core-required",
                    generationAllowed: true,
                },
                "route-28-compound": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "NNC(kal)+VNC(chanti) -> embedded-verbal-source-before-matrix-compound -> COMPOUND(kal-chanti)",
                    compactFormulaEcho: "CNV/CNN->CNV/CNN: embedded-verbal-source-before-matrix-compound",
                    surface: "kalchanti",
                    routeFamily: "derivational-boundary",
                    sourceGateStatus: "verbal-embed-source-and-matrix-required",
                    generationAllowed: true,
                },
                "route-29-purposive": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "CNV(chiwa) -> future-embed-plus-directional-matrix-purposive -> #ti-0(chiwa-□-t-i-hui)0+0-h#",
                    compactFormulaEcho: "CNV+CNV->CNV: future-embed-plus-directional-matrix-purposive",
                    surface: "chiwatiwi",
                    routeFamily: "derivational-boundary",
                    sourceGateStatus: "purposive-embed-and-directional-matrix-required",
                    generationAllowed: true,
                },
                "route-54-denominal": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "CNN(kal) -> nounstem-source-to-denominal-verbstem-route-family -> CNV(kal-ti)",
                    compactFormulaEcho: "CNN->CNV: nounstem-source-to-denominal-verbstem-route-family",
                    surface: "kalti",
                    routeFamily: "denominal-lesson",
                    sourceGateStatus: "lesson-54-denominal-source-required",
                    generationAllowed: true,
                },
                "route-56-personal-name": {
                    status: "generated-scoped",
                    structuralFormulaEcho: "SOURCE_STATEMENT(ti-chihua-c) -> downgraded-statement-source-to-personal-name-nnc -> CNN(ti-chihua-c)",
                    compactFormulaEcho: "CN->CNN: downgraded-statement-source-to-personal-name-nnc",
                    surface: "tichiwak",
                    routeFamily: "diagnostic-analysis",
                    sourceGateStatus: "personal-name-source-statement-required",
                    generationAllowed: true,
                },
            },
        }
    );
    s.eq(
        "compound stem formula workbench generates from embed, matrix, and output slots",
        (() => {
            const slice = ctx.buildCompoundStemFormulaWorkbenchSlice({ inputValue: "NNC(kal)+VNC(chanti)" });
            const defaultSlice = ctx.buildCompoundStemFormulaWorkbenchSlice();
            const model = ctx.getAndrewsFormulaWorkbenchModel({
                activeId: "compound-stems",
                inputValue: "NNC(kal)+VNC(chanti)",
            });
            const slotMap = Object.fromEntries(slice.parsedSlots
                .filter((slot) => ["embeddedStem", "matrixStem", "compoundStem"].includes(slot.key))
                .map((slot) => [slot.key, {
                    role: slot.role,
                    owner: slot.owner,
                    path: slot.path,
                    value: slot.value,
                    status: slot.status,
                    orderedEmbed: slot.modelFields.some((field) => field.label === "orden" && field.value === "incluido precede matriz"),
                    matrixDeterminesOutput: slot.modelFields.some((field) => field.label === "salida" && field.value === "la matriz decide VNC/NNC"),
                    noFlattening: slot.modelFields.some((field) => field.label === "no" && field.value === "aplanar cadenas"),
                }]));
            const examples = Object.fromEntries(slice.examples.map((example) => [example.id, {
                status: example.status,
                structuralFormulaEcho: example.structuralFormulaEcho,
                compactFormulaEcho: example.compactFormulaEcho,
                nawatFormulaEcho: example.nawatFormulaEcho,
                surface: example.surface,
                generationAllowed: example.generationAllowed,
            }]));
            return {
                modelActiveId: model.activeId,
                modelSliceKind: model.activeSlice?.kind || "",
                formula: slice.formula,
                structuralFormulaEcho: slice.structuralFormulaEcho,
                nawatFormulaEcho: slice.nawatFormulaEcho,
                compactFormulaEcho: slice.compactFormulaEcho,
                defaultStructuralFormulaEcho: defaultSlice.structuralFormulaEcho,
                defaultCompactFormulaEcho: defaultSlice.compactFormulaEcho,
                generation: {
                    status: slice.generation.status,
                    allowed: slice.generation.allowed,
                    surface: slice.generation.surface,
                    routeFamily: slice.generation.routeFamily,
                },
                sourceMaterial: {
                    rawInput: slice.sourceMaterial.rawInput,
                    inputKind: slice.sourceMaterial.inputKind,
                    sourceKind: slice.sourceMaterial.sourceKind,
                },
                slotMap,
                families: slice.formulaFamilies.map((family) => family.formula),
                diagnostics: slice.diagnostics.map((diagnostic) => diagnostic.id),
                realizationBoundary: slice.realizationBoundary,
                examples,
            };
        })(),
        {
            modelActiveId: "compound-stems",
            modelSliceKind: "compound-stem-formula-workbench-slice",
            formula: "EMBED + MATRIX -> COMPOUND",
            structuralFormulaEcho: "NNC(kal) + VNC(chanti) -> compound VNC(kal-chanti)",
            nawatFormulaEcho: "kalchanti",
            compactFormulaEcho: "NNC + VNC = compound VNC",
            defaultStructuralFormulaEcho: "VNC(nemi) + VNC(mati) -> compound VNC(nemi-mati)",
            defaultCompactFormulaEcho: "VNC + VNC = compound VNC",
            generation: {
                status: "andrews-logic-generated",
                allowed: true,
                surface: "kalchanti",
                routeFamily: "compound-stems",
            },
            sourceMaterial: {
                rawInput: "NNC(kal)+VNC(chanti)",
                inputKind: "compound-stem",
                sourceKind: "compound-source",
            },
            slotMap: {
                embeddedStem: {
                    role: "embedded-stem",
                    owner: "stem",
                    path: "stem.embedded",
                    value: "NNC(kal)",
                    status: "resolved",
                    orderedEmbed: true,
                    matrixDeterminesOutput: false,
                    noFlattening: false,
                },
                matrixStem: {
                    role: "matrix-stem",
                    owner: "stem",
                    path: "stem.matrix",
                    value: "VNC(chanti)",
                    status: "resolved",
                    orderedEmbed: false,
                    matrixDeterminesOutput: true,
                    noFlattening: false,
                },
                compoundStem: {
                    role: "compound-stem",
                    owner: "stem",
                    path: "stem.compound",
                    value: "compound VNC(kal-chanti)",
                    status: "andrews-logic-generated",
                    orderedEmbed: false,
                    matrixDeterminesOutput: false,
                    noFlattening: true,
                },
            },
            families: [
                "VNC + VNC = compound VNC",
                "NNC + VNC = compound VNC",
                "NNC + NNC = compound NNC",
                "[NNC + NNC] + NNC = compound NNC",
                "VNC(preterit embed) + t/ti + MATRIX = diagnostic",
            ],
            diagnostics: [
                "compound-stem-andrews-logic-generated",
                "compound-stem-matrix-determines-output",
                "compound-stem-no-string-flattening",
            ],
            realizationBoundary: {
                structuralFormulaEcho: "NNC(kal) + VNC(chanti) -> compound VNC(kal-chanti)",
                nawatFormulaEcho: "kalchanti",
                compactFormulaEcho: "NNC + VNC = compound VNC",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: [
                    "VNC + VNC = compound VNC",
                    "NNC + VNC = compound VNC",
                    "NNC + NNC = compound NNC",
                    "connective-t",
                ],
                nawatAuthority: "los compuestos preservan incluido, matriz y recursion como arquitectura Andrews; la superficie se realiza por el puente ortografico Nawat/Pipil",
            },
            examples: {
                "vnc-vnc-compound": {
                    status: "andrews-logic-generated",
                    structuralFormulaEcho: "VNC(nemi) + VNC(mati) -> compound VNC(nemi-mati)",
                    compactFormulaEcho: "VNC + VNC = compound VNC",
                    nawatFormulaEcho: "nemimati",
                    surface: "nemimati",
                    generationAllowed: true,
                },
                "nnc-vnc-compound": {
                    status: "andrews-logic-generated",
                    structuralFormulaEcho: "NNC(kal) + VNC(chanti) -> compound VNC(kal-chanti)",
                    compactFormulaEcho: "NNC + VNC = compound VNC",
                    nawatFormulaEcho: "kalchanti",
                    surface: "kalchanti",
                    generationAllowed: true,
                },
                "nnc-nnc-compound": {
                    status: "andrews-logic-generated",
                    structuralFormulaEcho: "NNC(kal) + NNC(tan) -> compound NNC(kal-tan)",
                    compactFormulaEcho: "NNC + NNC = compound NNC",
                    nawatFormulaEcho: "kaltan",
                    surface: "kaltan",
                    generationAllowed: true,
                },
                "recursive-nnc-compound": {
                    status: "andrews-logic-generated",
                    structuralFormulaEcho: "[NNC(kal) + NNC(tan)] + NNC(techan) -> compound NNC(kal-tan-techan)",
                    compactFormulaEcho: "[NNC + NNC] + NNC = compound NNC",
                    nawatFormulaEcho: "kaltantechan",
                    surface: "kaltantechan",
                    generationAllowed: true,
                },
                "connective-t-compound": {
                    status: "unsupported",
                    structuralFormulaEcho: "VNC(PRETERIT_EMBED) + t/ti + VNC(MATRIX) -> compound VNC",
                    compactFormulaEcho: "preterit embed + t/ti + matrix = diagnostic",
                    nawatFormulaEcho: "sin superficie: puerta Andrews de compuesto pendiente",
                    surface: "",
                    generationAllowed: false,
                },
            },
        }
    );
    s.eq(
        "nominalization formula workbench generates concrete Andrews target stems",
        (() => {
            const slice = ctx.buildNominalizationFormulaWorkbenchSlice({ inputValue: "chiwa-0" });
            const defaultSlice = ctx.buildNominalizationFormulaWorkbenchSlice();
            const model = ctx.getAndrewsFormulaWorkbenchModel({
                activeId: "nominalizations",
                inputValue: "chiwa-0",
            });
            const slotMap = Object.fromEntries(slice.parsedSlots
                .filter((slot) => ["sourceCnv", "sourceCore", "targetCnn", "nominalizedStem"].includes(slot.key))
                .map((slot) => [slot.key, {
                    role: slot.role,
                    owner: slot.owner,
                    path: slot.path,
                    value: slot.value,
                    status: slot.status,
                    sourceCoreGate: slot.modelFields.some((field) => field.label === "fuente" && field.value === "nucleo verbal con tiempo fuente"),
                    targetNominalGate: slot.modelFields.some((field) => field.label === "puerta" && field.value === "fuente Andrews"),
                    targetFormula: slot.modelFields.some((field) => field.label === "salida" && field.value === "formula nominal externa"),
                }]));
            const examples = Object.fromEntries(slice.examples.map((example) => [example.id, {
                status: example.status,
                structuralFormulaEcho: example.structuralFormulaEcho,
                compactFormulaEcho: example.compactFormulaEcho,
                nawatFormulaEcho: example.nawatFormulaEcho,
                surface: example.surface,
                generationAllowed: example.generationAllowed,
            }]));
            return {
                modelActiveId: model.activeId,
                modelSliceKind: model.activeSlice?.kind || "",
                formula: slice.formula,
                structuralFormulaEcho: slice.structuralFormulaEcho,
                nawatFormulaEcho: slice.nawatFormulaEcho,
                compactFormulaEcho: slice.compactFormulaEcho,
                defaultStructuralFormulaEcho: defaultSlice.structuralFormulaEcho,
                generation: {
                    status: slice.generation.status,
                    allowed: slice.generation.allowed,
                    surface: slice.generation.surface,
                    routeFamily: slice.generation.routeFamily,
                },
                sourceMaterial: {
                    rawInput: slice.sourceMaterial.rawInput,
                    inputKind: slice.sourceMaterial.inputKind,
                    sourceKind: slice.sourceMaterial.sourceKind,
                },
                hasTensePosition: slice.hasTensePosition,
                slotMap,
                families: slice.formulaFamilies.map((family) => family.formula),
                diagnostics: slice.diagnostics.map((diagnostic) => diagnostic.id),
                realizationBoundary: slice.realizationBoundary,
                operationalLayerSummary: {
                    kind: slice.operationalLayerSummary?.kind || "",
                    source: slice.operationalLayerSummary?.source || "",
                    labelCount: slice.operationalLayerSummary?.labelCount || 0,
                    operationCount: slice.operationalLayerSummary?.operationCount || 0,
                    missingSectionCount: slice.operationalLayerSummary?.missingSectionCount || 0,
                    complete: slice.operationalLayerSummary?.complete === true,
                    importantCounts: Object.fromEntries((slice.operationalLayerSummary?.items || [])
                        .filter((item) => [
                            "agentivo-preterito",
                            "sustantivo-verbal",
                            "patientivo",
                            "instrumentivo",
                            "locativo-temporal",
                        ].includes(item.key))
                        .map((item) => [item.key, {
                            operationCount: item.operationCount,
                            expectedSectionCount: item.expectedSectionCount,
                            missingSectionCount: item.missingSectionCount,
                            complete: item.complete,
                        }])),
                },
                examples,
            };
        })(),
        {
            modelActiveId: "nominalizations",
            modelSliceKind: "nominalization-formula-workbench-slice",
            formula: "CNV(SOURCE_CORE) -> CNN(NOMINALIZED_STEM)",
            structuralFormulaEcho: "CNV(chiwa-0) -> CNN(nominalized(chiwa-0))",
            nawatFormulaEcho: "chiwa",
            compactFormulaEcho: "CNV source -> CNN nominalized target",
            defaultStructuralFormulaEcho: "CNV(PRETERIT_SOURCE_CORE) -> CNN(PRETERIT_AGENTIVE_NOUNSTEM)",
            generation: {
                status: "andrews-logic-generated",
                allowed: true,
                surface: "chiwa",
                routeFamily: "nominalizations",
            },
            sourceMaterial: {
                rawInput: "chiwa-0",
                inputKind: "nominalization-route",
                sourceKind: "nominalization-source",
            },
            hasTensePosition: "source-only",
            slotMap: {
                sourceCnv: {
                    role: "source-formula",
                    owner: "route",
                    path: "route.source.cnv",
                    value: "CNV",
                    status: "resolved",
                    sourceCoreGate: false,
                    targetNominalGate: false,
                    targetFormula: false,
                },
                sourceCore: {
                    role: "source-core",
                    owner: "stem",
                    path: "route.source.core",
                    value: "chiwa-0",
                    status: "resolved",
                    sourceCoreGate: true,
                    targetNominalGate: false,
                    targetFormula: false,
                },
                targetCnn: {
                    role: "target-formula",
                    owner: "route",
                    path: "route.target.cnn",
                    value: "CNN",
                    status: "resolved",
                    sourceCoreGate: false,
                    targetNominalGate: false,
                    targetFormula: true,
                },
                nominalizedStem: {
                    role: "target-stem",
                    owner: "stem",
                    path: "route.target.stem",
                    value: "nominalized(chiwa-0)",
                    status: "andrews-logic-generated",
                    sourceCoreGate: false,
                    targetNominalGate: true,
                    targetFormula: false,
                },
            },
            families: [
                "preterit source -> agentive nominal stem",
                "customary-present source -> agentive nominal stem",
                "passive source -> patientive nominal stem",
                "source subject/impersonal source -> instrumentive nominal stem",
                "active/passive action source -> action nominal stem",
            ],
            diagnostics: [
                "nominalization-andrews-target-generated",
                "nominalization-source-tense-not-target-tense",
                "nominalization-nawat-realization-separated",
            ],
            realizationBoundary: {
                structuralFormulaEcho: "CNV(chiwa-0) -> CNN(nominalized(chiwa-0))",
                nawatFormulaEcho: "chiwa",
                compactFormulaEcho: "CNV source -> CNN nominalized target",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: [
                    "preterit-agentive",
                    "customary-present agentive",
                    "patientive",
                    "instrumentive",
                    "future-agentive",
                ],
                nawatAuthority: "la nominalizacion conserva la ruta fuente y destino como arquitectura Andrews; la superficie se realiza por el puente ortografico Nawat/Pipil",
            },
            operationalLayerSummary: {
                kind: "andrews-cnv-cnn-operational-layer",
                source: "andrews-pdf-section-map",
                labelCount: 16,
                operationCount: 238,
                missingSectionCount: 0,
                complete: true,
                importantCounts: {
                    "agentivo-preterito": {
                        operationCount: 16,
                        expectedSectionCount: 16,
                        missingSectionCount: 0,
                        complete: true,
                    },
                    "sustantivo-verbal": {
                        operationCount: 22,
                        expectedSectionCount: 22,
                        missingSectionCount: 0,
                        complete: true,
                    },
                    patientivo: {
                        operationCount: 62,
                        expectedSectionCount: 62,
                        missingSectionCount: 0,
                        complete: true,
                    },
                    instrumentivo: {
                        operationCount: 5,
                        expectedSectionCount: 4,
                        missingSectionCount: 0,
                        complete: true,
                    },
                    "locativo-temporal": {
                        operationCount: 73,
                        expectedSectionCount: 72,
                        missingSectionCount: 0,
                        complete: true,
                    },
                },
            },
            examples: {
                "preterit-agentive-concrete": {
                    status: "andrews-logic-generated",
                    structuralFormulaEcho: "CNV(chiwa-0) -> CNN(chiwa-0-ka)",
                    compactFormulaEcho: "preterit source + -ka -> agentive nounstem",
                    nawatFormulaEcho: "chiwaka",
                    surface: "chiwaka",
                    generationAllowed: true,
                },
                "preterit-agentive-nominalization": {
                    status: "source-gated",
                    structuralFormulaEcho: "CNV(PRETERIT_SOURCE_CORE) -> CNN(PRETERIT_AGENTIVE_NOUNSTEM)",
                    compactFormulaEcho: "preterit source -> agentive nominal stem",
                    nawatFormulaEcho: "sin superficie: puerta Andrews de nominalizacion pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "customary-agentive-reanalysis": {
                    status: "source-gated",
                    structuralFormulaEcho: "CNV(CUSTOMARY_PRESENT_NI_CORE) -> CNN(AGENTIVE_NI_NOUNSTEM)",
                    compactFormulaEcho: "customary present -> agentive reanalysis",
                    nawatFormulaEcho: "sin superficie: puerta Andrews de nominalizacion pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "fully-nominalized-customary-agentive": {
                    status: "source-gated",
                    structuralFormulaEcho: "CNV(CUSTOMARY_PRESENT_NI_CORE) -> CNN(FULL_NOMINAL_AGENTIVE_NOUNSTEM)",
                    compactFormulaEcho: "customary present -> full nominal number system",
                    nawatFormulaEcho: "sin superficie: puerta Andrews de nominalizacion pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "customary-patientive": {
                    status: "source-gated",
                    structuralFormulaEcho: "CNV(PASSIVE_CUSTOMARY_SOURCE) -> CNN(PATIENTIVE_NOUNSTEM)",
                    compactFormulaEcho: "passive customary source -> patientive nominal stem",
                    nawatFormulaEcho: "sin superficie: puerta Andrews de nominalizacion pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "instrumentive-possessive": {
                    status: "source-gated",
                    structuralFormulaEcho: "CNV(IMPERFECT_ACTIVE_SOURCE) -> CNN(POSSESSIVE_INSTRUMENTIVE_NOUNSTEM)",
                    compactFormulaEcho: "source subject -> possessor; outer nonanimate subject imported",
                    nawatFormulaEcho: "sin superficie: puerta Andrews de nominalizacion pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "future-agentive": {
                    status: "source-gated",
                    structuralFormulaEcho: "CNV(FUTURE_SOURCE_CORE) -> CNN(FUTURE_AGENTIVE_RESTRICTED_STEM)",
                    compactFormulaEcho: "future source -> restricted/general nominal stems",
                    nawatFormulaEcho: "sin superficie: puerta Andrews de nominalizacion pendiente",
                    surface: "",
                    generationAllowed: false,
                },
            },
        }
    );
    s.eq(
        "personal-name embedded NNC formula workbench separates outer shell from inner clause",
        (() => {
            const slice = ctx.buildPersonalNameEmbeddedNncFormulaWorkbenchSlice({ inputValue: "CNV(ti-chihua-c-0)" });
            const defaultSlice = ctx.buildPersonalNameEmbeddedNncFormulaWorkbenchSlice();
            const model = ctx.getAndrewsFormulaWorkbenchModel({
                activeId: "personal-name-embedded-nnc",
                inputValue: "CNV(ti-chihua-c-0)",
            });
            const slotMap = Object.fromEntries(slice.parsedSlots
                .filter((slot) => ["outerSubject", "innerClause", "outerNumber"].includes(slot.key))
                .map((slot) => [slot.key, {
                    role: slot.role,
                    owner: slot.owner,
                    path: slot.path,
                    value: slot.value,
                    status: slot.status,
                    outerSubject: slot.modelFields.some((field) => field.label === "capa" && field.value === "sujeto externo"),
                    innerClauseStem: slot.modelFields.some((field) => field.label === "capa" && field.value === "clausula incluida dentro del tallo"),
                    fixedOuterNumber: slot.modelFields.some((field) => field.label === "dyada" && field.value === "externa fija 0-0"),
                    innerNumberNotOuter: slot.modelFields.some((field) => field.label === "no" && field.value === "numero interno como c-0"),
                }]));
            const examples = Object.fromEntries(slice.examples.map((example) => [example.id, {
                status: example.status,
                structuralFormulaEcho: example.structuralFormulaEcho,
                compactFormulaEcho: example.compactFormulaEcho,
                nawatFormulaEcho: example.nawatFormulaEcho,
                surface: example.surface,
                generationAllowed: example.generationAllowed,
            }]));
            return {
                modelActiveId: model.activeId,
                modelSliceKind: model.activeSlice?.kind || "",
                formula: slice.formula,
                structuralFormulaEcho: slice.structuralFormulaEcho,
                nawatFormulaEcho: slice.nawatFormulaEcho,
                compactFormulaEcho: slice.compactFormulaEcho,
                defaultStructuralFormulaEcho: defaultSlice.structuralFormulaEcho,
                generation: {
                    status: slice.generation.status,
                    allowed: slice.generation.allowed,
                    surface: slice.generation.surface,
                    routeFamily: slice.generation.routeFamily,
                },
                sourceMaterial: {
                    rawInput: slice.sourceMaterial.rawInput,
                    inputKind: slice.sourceMaterial.inputKind,
                    sourceKind: slice.sourceMaterial.sourceKind,
                },
                hasTensePosition: slice.hasTensePosition,
                slotMap,
                families: slice.formulaFamilies.map((family) => family.formula),
                diagnostics: slice.diagnostics.map((diagnostic) => diagnostic.id),
                realizationBoundary: slice.realizationBoundary,
                examples,
            };
        })(),
        {
            modelActiveId: "personal-name-embedded-nnc",
            modelSliceKind: "personal-name-embedded-nnc-formula-workbench-slice",
            formula: "#pers1-pers2(INNER_CLAUSE)0-0#",
            structuralFormulaEcho: "#Ø-Ø(CNV(ti-chihua-c-0))0-0#",
            nawatFormulaEcho: "tichiwak",
            compactFormulaEcho: "#outer-subject(INNER_CLAUSE_AS_STEM)0-0#",
            defaultStructuralFormulaEcho: "#Ø-Ø(CNV(PRETERIT_AGENTIVE_SOURCE))0-0#",
            generation: {
                status: "andrews-logic-generated",
                allowed: true,
                surface: "tichiwak",
                routeFamily: "personal-name-embedded-nnc",
            },
            sourceMaterial: {
                rawInput: "CNV(ti-chihua-c-0)",
                inputKind: "personal-name-embedded-nnc",
                sourceKind: "personal-name-inner-clause",
            },
            hasTensePosition: false,
            slotMap: {
                outerSubject: {
                    role: "outer-subject",
                    owner: "outer-shell",
                    path: "outer.subject",
                    value: "Ø-Ø",
                    status: "resolved",
                    outerSubject: true,
                    innerClauseStem: false,
                    fixedOuterNumber: false,
                    innerNumberNotOuter: false,
                },
                innerClause: {
                    role: "embedded-clause-stem",
                    owner: "predicate",
                    path: "predicate.inner-clause",
                    value: "CNV(ti-chihua-c-0)",
                    status: "andrews-logic-generated",
                    outerSubject: false,
                    innerClauseStem: true,
                    fixedOuterNumber: false,
                    innerNumberNotOuter: false,
                },
                outerNumber: {
                    role: "outer-number",
                    owner: "outer-shell",
                    path: "outer.num1-num2",
                    value: "0-0",
                    status: "resolved",
                    outerSubject: false,
                    innerClauseStem: false,
                    fixedOuterNumber: true,
                    innerNumberNotOuter: true,
                },
            },
            families: [
                "#outer-subject(CNV-as-stem)0-0#",
                "#outer-subject(CNN-as-stem)0-0#",
                "#outer-subject(CN+CN unit as stem)0-0#",
                "inner c-0 stays inside predicate stem",
            ],
            diagnostics: [
                "personal-name-outer-number-fixed-zero",
                "personal-name-inner-outer-subjects-separated",
                "personal-name-andrews-source-generated",
            ],
            realizationBoundary: {
                structuralFormulaEcho: "#Ø-Ø(CNV(ti-chihua-c-0))0-0#",
                nawatFormulaEcho: "tichiwak",
                compactFormulaEcho: "#outer-subject(INNER_CLAUSE_AS_STEM)0-0#",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: [
                    "inner CNV",
                    "inner CNN",
                    "inner c-0",
                    "multiple-clause unit",
                ],
                nawatAuthority: "Andrews decide capas, fuente interna y 0-0 externo; la superficie se realiza por el puente ortografico Nawat/Pipil desde una fuente concreta",
            },
            examples: {
                "personal-name-preterit-agentive": {
                    status: "source-gated",
                    structuralFormulaEcho: "#Ø-Ø(CNV(PRETERIT_AGENTIVE_SOURCE))0-0#",
                    compactFormulaEcho: "outer CNN + inner preterit-agentive clause",
                    nawatFormulaEcho: "sin superficie: fuente interna Andrews concreta pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "personal-name-present-agentive": {
                    status: "source-gated",
                    structuralFormulaEcho: "#Ø-Ø(CNV(PRESENT_AGENTIVE_SOURCE))0-0#",
                    compactFormulaEcho: "outer CNN + inner present-agentive clause",
                    nawatFormulaEcho: "sin superficie: fuente interna Andrews concreta pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "personal-name-customary-agentive": {
                    status: "source-gated",
                    structuralFormulaEcho: "#Ø-Ø(CNV(CUSTOMARY_AGENTIVE_SOURCE))0-0#",
                    compactFormulaEcho: "outer CNN + inner customary-present clause",
                    nawatFormulaEcho: "sin superficie: fuente interna Andrews concreta pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "personal-name-purposive": {
                    status: "source-gated",
                    structuralFormulaEcho: "#Ø-Ø(CNV(PURPOSIVE_SOURCE))0-0#",
                    compactFormulaEcho: "outer CNN + inner purposive clause",
                    nawatFormulaEcho: "sin superficie: fuente interna Andrews concreta pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "personal-name-reflexive-object": {
                    status: "source-gated",
                    structuralFormulaEcho: "#Ø-Ø(CNV(REFLEXIVE_OBJECT_SOURCE))0-0#",
                    compactFormulaEcho: "inner reflexive/object material stays inside stem",
                    nawatFormulaEcho: "sin superficie: fuente interna Andrews concreta pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "personal-name-inner-number-dyad": {
                    status: "source-gated",
                    structuralFormulaEcho: "#Ø-Ø(CNV(INNER_SUBJECT+c-0))0-0#",
                    compactFormulaEcho: "final c-0 belongs to inner clause, not outer number",
                    nawatFormulaEcho: "sin superficie: fuente interna Andrews concreta pendiente",
                    surface: "",
                    generationAllowed: false,
                },
                "personal-name-multiple-clause-unit": {
                    status: "source-gated",
                    structuralFormulaEcho: "#Ø-Ø(ADJUNCTION_OR_CONJUNCTION(CN+CN))0-0#",
                    compactFormulaEcho: "outer CNN + multiple-clause unit as stem",
                    nawatFormulaEcho: "sin superficie: fuente interna Andrews concreta pendiente",
                    surface: "",
                    generationAllowed: false,
                },
            },
        }
    );
    s.eq(
        "unsupported route diagnostics workbench blocks incoherent and evidence-missing routes",
        (() => {
            const slice = ctx.buildUnsupportedRouteDiagnosticsFormulaWorkbenchSlice({ inputValue: "CNN + tns" });
            const defaultSlice = ctx.buildUnsupportedRouteDiagnosticsFormulaWorkbenchSlice();
            const model = ctx.getAndrewsFormulaWorkbenchModel({
                activeId: "unsupported-route-diagnostics",
                inputValue: "CNN + tns",
            });
            const activeKindsByCategory = Object.fromEntries(ctx.getAndrewsFormulaWorkbenchCategories()
                .map((category) => {
                    const categoryModel = ctx.getAndrewsFormulaWorkbenchModel({
                        activeId: category.id,
                        inputValue: category.id === "compound-stems"
                            ? "NNC(kal)+VNC(chanti)"
                            : (category.id === "nominalizations"
                                ? "chiwa-0"
                                : (category.id === "personal-name-embedded-nnc"
                                    ? "CNV(INNER_SUBJECT+c-0)"
                                    : "kal")),
                    });
                    return [category.id, categoryModel.activeSlice?.kind || ""];
                }));
            const slotMap = Object.fromEntries(slice.parsedSlots
                .filter((slot) => ["input", "diagnosticOnly"].includes(slot.key))
                .map((slot) => [slot.key, {
                    role: slot.role,
                    owner: slot.owner,
                    path: slot.path,
                    value: slot.value,
                    status: slot.status,
                    blockedOutput: slot.modelFields.some((field) => field.label === "bloqueo" && field.value === "sin superficie inventada"),
                    sourceInput: slot.modelFields.some((field) => field.label === "fuente" && field.value === "ruta o forma a evaluar"),
                }]));
            const examples = Object.fromEntries(slice.examples.map((example) => [example.id, {
                status: example.status,
                structuralFormulaEcho: example.structuralFormulaEcho,
                compactFormulaEcho: example.compactFormulaEcho,
                nawatFormulaEcho: example.nawatFormulaEcho,
                surface: example.surface,
                generationAllowed: example.generationAllowed,
                diagnosticIds: example.diagnostics.map((diagnostic) => diagnostic.id),
            }]));
            return {
                modelActiveId: model.activeId,
                modelSliceKind: model.activeSlice?.kind || "",
                formula: slice.formula,
                structuralFormulaEcho: slice.structuralFormulaEcho,
                nawatFormulaEcho: slice.nawatFormulaEcho,
                compactFormulaEcho: slice.compactFormulaEcho,
                defaultStructuralFormulaEcho: defaultSlice.structuralFormulaEcho,
                generation: {
                    status: slice.generation.status,
                    allowed: slice.generation.allowed,
                    surface: slice.generation.surface,
                    routeFamily: slice.generation.routeFamily,
                },
                sourceMaterial: {
                    rawInput: slice.sourceMaterial.rawInput,
                    inputKind: slice.sourceMaterial.inputKind,
                    sourceKind: slice.sourceMaterial.sourceKind,
                },
                slotMap,
                diagnostics: slice.diagnostics.map((diagnostic) => diagnostic.id),
                realizationBoundary: slice.realizationBoundary,
                activeKindsByCategory,
                examples,
            };
        })(),
        {
            modelActiveId: "unsupported-route-diagnostics",
            modelSliceKind: "unsupported-route-diagnostics-formula-workbench-slice",
            formula: "INPUT -> DIAGNOSTIC_ONLY",
            structuralFormulaEcho: "CNN + tns -> DIAGNOSTIC_ONLY",
            nawatFormulaEcho: "sin salida Nawat/Pipil",
            compactFormulaEcho: "entrada -> diagnostico sin superficie",
            defaultStructuralFormulaEcho: "unsupported-route -> DIAGNOSTIC_ONLY",
            generation: {
                status: "unsupported",
                allowed: false,
                surface: "",
                routeFamily: "unsupported-route-diagnostics",
            },
            sourceMaterial: {
                rawInput: "CNN + tns",
                inputKind: "unsupported-route-diagnostics",
                sourceKind: "diagnostic-input",
            },
            slotMap: {
                input: {
                    role: "source-input",
                    owner: "diagnostic",
                    path: "diagnostic.input",
                    value: "CNN + tns",
                    status: "resolved",
                    blockedOutput: false,
                    sourceInput: true,
                },
                diagnosticOnly: {
                    role: "blocked-output",
                    owner: "diagnostic",
                    path: "diagnostic.output",
                    value: "DIAGNOSTIC_ONLY",
                    status: "unsupported",
                    blockedOutput: true,
                    sourceInput: false,
                },
            },
            diagnostics: [
                "unsupported-route-no-surface",
                "unsupported-route-slot-boundary-required",
                "unsupported-route-diagnostic-is-output",
            ],
            realizationBoundary: {
                structuralFormulaEcho: "CNN + tns -> DIAGNOSTIC_ONLY",
                nawatFormulaEcho: "sin salida Nawat/Pipil",
                compactFormulaEcho: "entrada -> diagnostico sin superficie",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: [
                    "CNN no tense",
                    "valence outside stem",
                    "Classical structural-only",
                    "source gate",
                ],
                nawatAuthority: "las rutas incompletas, contradictorias o sin puerta Andrews satisfecha quedan bloqueadas; el diagnostico es la salida correcta",
            },
            activeKindsByCategory: {
                "vnc-shell": "vnc-shell-formula-workbench-slice",
                "ordinary-nnc-shell": "ordinary-nnc-formula-workbench-slice",
                "possessive-state-nnc": "possessive-state-nnc-formula-workbench-slice",
                "valence-object-slots": "vnc-valence-formula-workbench-slice",
                "subject-number-connectors": "subject-number-connector-formula-workbench-slice",
                "derivational-routes": "derivational-route-formula-workbench-slice",
                "compound-stems": "compound-stem-formula-workbench-slice",
                nominalizations: "nominalization-formula-workbench-slice",
                "personal-name-embedded-nnc": "personal-name-embedded-nnc-formula-workbench-slice",
                "unsupported-route-diagnostics": "unsupported-route-diagnostics-formula-workbench-slice",
            },
            examples: {
                "unsupported-nnc-tense-slot": {
                    status: "unsupported",
                    structuralFormulaEcho: "CNN + tns -> DIAGNOSTIC_ONLY",
                    compactFormulaEcho: "CNN tense slot -> blocked",
                    nawatFormulaEcho: "sin salida Nawat/Pipil",
                    surface: "",
                    generationAllowed: false,
                    diagnosticIds: ["nnc-tense-slot-blocked"],
                },
                "unsupported-valence-inside-stem": {
                    status: "unsupported",
                    structuralFormulaEcho: "STEM(va1-va2) -> DIAGNOSTIC_ONLY",
                    compactFormulaEcho: "valence inside stem -> blocked",
                    nawatFormulaEcho: "sin salida Nawat/Pipil",
                    surface: "",
                    generationAllowed: false,
                    diagnosticIds: ["valence-inside-stem-blocked"],
                },
                "unsupported-classical-surface-import": {
                    status: "unsupported",
                    structuralFormulaEcho: "Classical surface as Nawat output -> DIAGNOSTIC_ONLY",
                    compactFormulaEcho: "Classical spelling -> structural evidence only",
                    nawatFormulaEcho: "sin salida Nawat/Pipil",
                    surface: "",
                    generationAllowed: false,
                    diagnosticIds: ["classical-surface-import-blocked"],
                },
                "unsupported-compound-flattening": {
                    status: "unsupported",
                    structuralFormulaEcho: "EMBED+MATRIX -> word -> DIAGNOSTIC_ONLY",
                    compactFormulaEcho: "compound string flattening -> blocked",
                    nawatFormulaEcho: "sin salida Nawat/Pipil",
                    surface: "",
                    generationAllowed: false,
                    diagnosticIds: ["compound-flattening-blocked"],
                },
                "unsupported-personal-name-surface": {
                    status: "unsupported",
                    structuralFormulaEcho: "#outer(INNER)c-0# -> DIAGNOSTIC_ONLY",
                    compactFormulaEcho: "inner number read as outer -> blocked",
                    nawatFormulaEcho: "sin salida Nawat/Pipil",
                    surface: "",
                    generationAllowed: false,
                    diagnosticIds: ["personal-name-inner-number-outer-read-blocked"],
                },
                "source-gated-andrews-route": {
                    status: "source-gated",
                    structuralFormulaEcho: "Andrews route with unmet source gate -> DIAGNOSTIC_ONLY",
                    compactFormulaEcho: "Andrews source gate -> diagnostic",
                    nawatFormulaEcho: "sin salida Nawat/Pipil",
                    surface: "",
                    generationAllowed: false,
                    diagnosticIds: ["route-source-gate-unmet"],
                },
            },
        }
    );
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
                supportStatus: "executable-rule-supported-partial",
                generationStatus: "route-surface-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-partial",
                generationStatus: "route-surface-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-partial",
                generationStatus: "route-surface-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
            },
            {
                id: "54.5-ti-a-causative",
                range: "54.5",
                sourceCategory: "ti-vnc-from-nnc",
                sourceState: "absolutive-or-possessive",
                valency: "single-or-double-object-causative",
                suffixes: ["source-verbalizer:ti->ti", "causative:a->a"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
            },
            {
                id: "54.6-t-ia-applicative",
                range: "54.6",
                sourceCategory: "intransitive-ti-vnc",
                sourceState: "derived",
                valency: "applicative",
                suffixes: ["source-verbalizer:ti->ti", "applicative:ia->ia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-partial",
                generationStatus: "route-surface-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-partial",
                generationStatus: "route-surface-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
            },
            {
                id: "55.4-adverbial-huia",
                range: "55.4",
                sourceCategory: "adverbial-nounstem",
                sourceState: "adverbialized",
                valency: "applicative",
                suffixes: ["applicative:huia->wia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
            },
            {
                id: "55.5-relational-compound-o-a-huia",
                range: "55.5",
                sourceCategory: "compound-relational-nounstem",
                sourceState: "relational",
                valency: "usually-transitive-or-applicative",
                suffixes: ["transitive-or-intransitive:o-a->u-a", "applicative:huia->wia"],
                currentRouteFamilies: [],
                currentRouteIds: [],
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-evidence-required",
                generationStatus: "source-evidence-route-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
                supportStatus: "executable-rule-supported-source-final-guarded",
                generationStatus: "route-surface-supported",
                noNewSurfaceForms: true,
                structuralInventoryOnly: false,
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
            unmodeledContractCount: 0,
            targetUnmodeledContractCount: 0,
            nawatOnlyRouteFamilies: ["vt-na"],
            unmodeledContractIds: [],
            targetUnmodeledContractIds: [],
            boundaries: {
                noNewSurfaceForms: true,
                noFixtureEvidence: true,
                structuralInventoryOnly: false,
                fullLessonGenerationModeled: false,
            },
        }
    );
    const lesson54PursuitFrame = ctx.buildLesson54DenominalVerbstemPursuitFrame();
    s.eq(
        "Lesson 54 Plan/Pursue frame covers Andrews 54.1-54.6 without claiming full generation",
        {
            outputKind: lesson54PursuitFrame.outputKind,
            stepNumber: lesson54PursuitFrame.stepNumber,
            pdfRefs: lesson54PursuitFrame.pdfRefs,
            plannedArrowIds: lesson54PursuitFrame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson54PursuitFrame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            hitCount: lesson54PursuitFrame.hitCount,
            missCount: lesson54PursuitFrame.missCount,
            closestPass: lesson54PursuitFrame.closestPass,
            remainingGapMentionsDoubleObject: /ti-a de dos objetos/.test(lesson54PursuitFrame.remainingGap),
            subsectionRanges: lesson54PursuitFrame.subsectionFrames.map((frame) => frame.range),
            subsectionContractCounts: lesson54PursuitFrame.subsectionFrames.map((frame) => frame.contractIds.length),
            contractCoverage: lesson54PursuitFrame.contractCoverage,
            boundaries: lesson54PursuitFrame.boundaries,
        },
        {
            outputKind: "lesson-54-denominal-verbstem-pursuit-frame",
            stepNumber: 54,
            pdfRefs: [
                "Andrews Lesson 54.1",
                "Andrews Lesson 54.2",
                "Andrews Lesson 54.2.1",
                "Andrews Lesson 54.2.2",
                "Andrews Lesson 54.2.3",
                "Andrews Lesson 54.2.4",
                "Andrews Lesson 54.2.5",
                "Andrews Lesson 54.3",
                "Andrews Lesson 54.4",
                "Andrews Lesson 54.5",
                "Andrews Lesson 54.6",
            ],
            plannedArrowIds: ["lesson-54-denominal-verbstem-audit"],
            firedArrowIds: [["lesson-54-denominal-verbstem-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            remainingGapMentionsDoubleObject: true,
            subsectionRanges: ["54.1", "54.2", "54.3", "54.4", "54.5", "54.6"],
            subsectionContractCounts: [0, 9, 1, 2, 1, 1],
            contractCoverage: {
                contractCount: 14,
                routeCoveredContractCount: 2,
                sourceContextRequiredContractCount: 9,
                sourceEvidenceRequiredContractCount: 9,
                executableRuleContractCount: 13,
                routeCoveredContractIds: [
                    "54.2.1-inceptive-stative-ti",
                    "54.4-possession-ti",
                ],
                sourceContextRequiredContractIds: [
                    "54.2.2-hui-lia-causative",
                    "54.2.3-ti-ya-deverbal",
                    "54.2.3-hui-ya-deverbal",
                    "54.2.3-ya-lia-causative",
                    "54.2.5-inceptive-stative-hua",
                    "54.3-included-possessor-ti",
                    "54.2-54.4-ti-lia-causative",
                    "54.5-ti-a-causative",
                    "54.6-t-ia-applicative",
                ],
                sourceEvidenceRequiredContractIds: [
                    "54.2.2-hui-lia-causative",
                    "54.2.3-ti-ya-deverbal",
                    "54.2.3-hui-ya-deverbal",
                    "54.2.3-ya-lia-causative",
                    "54.2.5-inceptive-stative-hua",
                    "54.3-included-possessor-ti",
                    "54.2-54.4-ti-lia-causative",
                    "54.5-ti-a-causative",
                    "54.6-t-ia-applicative",
                ],
                executableRuleIds: [
                    "andrews-54-2-1-ti",
                    "andrews-54-2-2-hui",
                    "andrews-54-2-2-hui-lia",
                    "andrews-54-2-3-ya",
                    "andrews-54-2-3-ti-ya",
                    "andrews-54-2-3-hui-ya",
                    "andrews-54-2-3-ya-lia",
                    "andrews-54-2-4-a",
                    "andrews-54-2-5-hua",
                    "andrews-54-3-included-possessor-ti",
                    "andrews-54-2-54-4-ti-lia",
                    "andrews-54-5-ti-a",
                    "andrews-54-6-t-ia",
                ],
            },
            boundaries: {
                noClassicalSurfaceImport: true,
                noNewFixtureEvidence: true,
                noSilentGeneration: true,
                fullLessonGenerationModeled: false,
                visibleUiSpanishRequired: true,
            },
        }
    );
    const lesson55PursuitFrame = ctx.buildLesson55DenominalVerbstemPursuitFrame();
    s.eq(
        "Lesson 55 Plan/Pursue frame covers Andrews 55.1-55.7 without claiming full generation",
        {
            outputKind: lesson55PursuitFrame.outputKind,
            stepNumber: lesson55PursuitFrame.stepNumber,
            pdfRefs: lesson55PursuitFrame.pdfRefs,
            plannedArrowIds: lesson55PursuitFrame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson55PursuitFrame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            hitCount: lesson55PursuitFrame.hitCount,
            missCount: lesson55PursuitFrame.missCount,
            closestPass: lesson55PursuitFrame.closestPass,
            remainingGapMentionsTemporalParsing: /análisis de compuestos temporales/.test(lesson55PursuitFrame.remainingGap),
            subsectionRanges: lesson55PursuitFrame.subsectionFrames.map((frame) => frame.range),
            subsectionContractCounts: lesson55PursuitFrame.subsectionFrames.map((frame) => frame.contractIds.length),
            contractCoverage: lesson55PursuitFrame.contractCoverage,
            boundaries: lesson55PursuitFrame.boundaries,
        },
        {
            outputKind: "lesson-55-denominal-verbstem-pursuit-frame",
            stepNumber: 55,
            pdfRefs: [
                "Andrews Lesson 55.1",
                "Andrews Lesson 55.2",
                "Andrews Lesson 55.3",
                "Andrews Lesson 55.4",
                "Andrews Lesson 55.5",
                "Andrews Lesson 55.6",
                "Andrews Lesson 55.7",
            ],
            plannedArrowIds: ["lesson-55-denominal-verbstem-audit"],
            firedArrowIds: [["lesson-55-denominal-verbstem-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            remainingGapMentionsTemporalParsing: true,
            subsectionRanges: ["55.1", "55.2", "55.3", "55.4", "55.5", "55.6", "55.7"],
            subsectionContractCounts: [1, 5, 2, 1, 1, 1, 1],
            contractCoverage: {
                contractCount: 12,
                routeCoveredContractCount: 1,
                sourceContextRequiredContractCount: 9,
                sourceEvidenceRequiredContractCount: 9,
                executableRuleContractCount: 17,
                routeCoveredContractIds: [
                    "55.6-i-hui-a-hui-to-o-a",
                ],
                sourceContextRequiredContractIds: [
                    "55.1-temporal-tia",
                    "55.2-tla-ti-lia-applicative",
                    "55.2-intransitive-tla",
                    "55.2-intransitive-tla-ti-a-causative",
                    "55.2-intransitive-tla-ti-lia-applicative",
                    "55.3-o-a-il-huia-al-huia-applicative-note",
                    "55.4-adverbial-huia",
                    "55.5-relational-compound-o-a-huia",
                    "55.6-i-hui-a-hui-to-o-a",
                ],
                sourceEvidenceRequiredContractIds: [
                    "55.1-temporal-tia",
                    "55.2-tla-ti-lia-applicative",
                    "55.2-intransitive-tla",
                    "55.2-intransitive-tla-ti-a-causative",
                    "55.2-intransitive-tla-ti-lia-applicative",
                    "55.3-o-a-il-huia-al-huia-applicative-note",
                    "55.4-adverbial-huia",
                    "55.5-relational-compound-o-a-huia",
                    "55.6-i-hui-a-hui-to-o-a",
                ],
                executableRuleIds: [
                    "andrews-55-1-temporal-tia",
                    "andrews-55-2-causative-tla",
                    "andrews-55-2-tla-ti-lia-applicative",
                    "andrews-55-2-intransitive-tla",
                    "andrews-55-2-intransitive-tla-ti-a",
                    "andrews-55-2-intransitive-tla-ti-lia",
                    "andrews-55-3-o-a",
                    "andrews-55-3-huia",
                    "andrews-55-3-o-a-i-l-huia",
                    "andrews-55-3-o-a-a-l-huia",
                    "andrews-55-4-adverbial-huia",
                    "andrews-55-5-relational-o-a",
                    "andrews-55-5-relational-huia",
                    "andrews-55-6-i-hui",
                    "andrews-55-6-a-hui",
                    "andrews-55-6-o-a",
                    "andrews-55-7-i-a",
                ],
            },
            boundaries: {
                noClassicalSurfaceImport: true,
                noNewFixtureEvidence: true,
                noSilentGeneration: true,
                fullLessonGenerationModeled: false,
                visibleUiSpanishRequired: true,
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
            finiteRouteSourceContextRequiredCount: andrewsContractRoutePreview.finiteRouteSourceContextRequiredCount,
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
            finiteRouteRequestCount: 31,
            finiteRouteObjectPrefixRequiredCount: 17,
            finiteRouteStemClassContractCount: 18,
            finiteRouteSourceContextRequiredCount: 20,
            finiteRouteSourceEvidenceRequiredCount: 20,
            routeDiagnosticCount: 42,
            routeWarningCount: 0,
            routeNoteCount: 22,
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
    s.eq(
        "Andrews contract inventory exposes source-context support statuses before legacy source-evidence labels",
        (() => {
            const sourceContextRequired = andrewsDenominalContracts
                .filter((contract) => /source-context-required/.test(String(contract.sourceContextSupportStatus || "")))
                .map((contract) => contract.id);
            const missingContextStatus = andrewsDenominalContracts
                .filter((contract) => /source-evidence-required/.test(String(contract.supportStatus || "")))
                .filter((contract) => !/source-context-required/.test(String(contract.sourceContextSupportStatus || "")))
                .map((contract) => contract.id);
            const sourceEvidenceAliasBoundaries = andrewsDenominalContracts
                .filter((contract) => /source-context-required/.test(String(contract.sourceContextSupportStatus || "")))
                .filter((contract) => contract.boundaries?.sourceEvidenceStatusCompatibilityAlias !== true)
                .map((contract) => contract.id);
            return {
                count: sourceContextRequired.length,
                first: sourceContextRequired[0] || "",
                missingContextStatus,
                sourceEvidenceAliasBoundaries,
            };
        })(),
        {
            count: 18,
            first: "54.2.2-hui-lia-causative",
            missingContextStatus: [],
            sourceEvidenceAliasBoundaries: [],
        }
    );
    const findAndrewsContractRoute = (contractId, routeTemplateId) => (
        andrewsContractRoutePreview.routes.find((route) => (
            route.contractId === contractId && route.routeTemplateId === routeTemplateId
        ))
    );
    s.eq(
        "Andrews 54.2.1 ti is an executable rule contract with success and blocked frames",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-1-ti");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.1-inceptive-stative-ti"
            ));
            const route = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-1-ti", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
            });
            const blocked = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-1-ti", {
                sourceStem: "nukal",
                sourceEvidence: {
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                routeExecutableRuleId: route?.executableRuleId || "",
                routeUsesExecutableRule: route?.boundaries?.usesExecutableAndrewsRuleContract === true,
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    routeStage: success?.frames?.routeContract?.routeStage || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blocked: {
                    ok: blocked?.ok,
                    surface: blocked?.surface || "",
                    resultFrameSurface: blocked?.frames?.resultFrame?.surface || "",
                    diagnosticId: blocked?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blocked?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blocked?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blocked?.frames?.diagnosticFrame?.status || "",
                    routeGenerationAllowed: blocked?.frames?.routeContract?.generationAllowed,
                    blockingFailedLayer: blocked?.frames?.routeContract?.blockingDiagnostics?.[0]?.failedLayer || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-1-ti",
                contractId: "54.2.1-inceptive-stative-ti",
                routeTemplateId: "ti",
                range: "54.2.1",
                authority: ["Andrews 54.2", "Andrews 54.2.1"],
                input: {
                    unit: "nnc-predicate",
                    state: "absolutive",
                    sourceCategory: "absolutive-state-nnc-predicate",
                    sourceEvidence: "nawat-source-stem-or-generated-nnc-predicate",
                },
                operation: {
                    type: "denominal-verbstem",
                    suffix: "ti",
                    classicalSuffix: "ti",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["A", "B"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-1-ti"],
            inventoryStructuralOnly: false,
            routeExecutableRuleId: "andrews-54-2-1-ti",
            routeUsesExecutableRule: true,
            success: {
                ok: true,
                surface: "pusukti",
                targetVerbStem: "pusukti",
                targetInput: "(pusukti)",
                resultFrameSurface: "pusukti",
                routeStage: "execute-rule-contract",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blocked: {
                ok: false,
                surface: "",
                resultFrameSurface: "",
                diagnosticId: "andrews-54.2.1-ti-absolutive-state-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
                routeGenerationAllowed: false,
                blockingFailedLayer: "agreement",
            },
        }
    );
    s.eq(
        "Andrews executable rule contracts expose sourceContext as the primary generation gate",
        (() => {
            const contracts = ctx.getNawatDenominalAndrewsContractInventory()
                .flatMap((contract) => Array.isArray(contract.executableRuleIds) ? contract.executableRuleIds : [])
                .map((id) => ctx.getNawatDenominalAndrewsExecutableRuleContract(id))
                .filter(Boolean);
            const withLegacyEvidence = contracts.filter((rule) => rule.input?.sourceEvidence);
            const missingSourceContext = withLegacyEvidence
                .filter((rule) => !rule.input?.sourceContext)
                .map((rule) => rule.id);
            const aliasMismatches = withLegacyEvidence
                .filter((rule) => rule.input.sourceContext !== rule.input.sourceEvidence)
                .map((rule) => rule.id);
            const firstGated = withLegacyEvidence[0] || {};
            return {
                checked: withLegacyEvidence.length,
                missingSourceContext,
                aliasMismatches,
                first: {
                    id: firstGated.id || "",
                    sourceContext: firstGated.input?.sourceContext || "",
                    sourceEvidence: firstGated.input?.sourceEvidence || "",
                    boundary: firstGated.boundaries?.andrewsSourceContextDecidesGenerationGate === true,
                },
            };
        })(),
        {
            checked: 30,
            missingSourceContext: [],
            aliasMismatches: [],
            first: {
                id: "andrews-54-2-1-ti",
                sourceContext: "nawat-source-stem-or-generated-nnc-predicate",
                sourceEvidence: "nawat-source-stem-or-generated-nnc-predicate",
                boundary: true,
            },
        }
    );
    s.eq(
        "Andrews 54.2.2 hui is an executable rule contract with orthographic wi output and blocked frames",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.2-inceptive-stative-hui"
            ));
            const route = findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui");
            const consonantSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
            });
            const vowelSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui", {
                sourceStem: "shuchi",
                sourceState: "absolutive",
            });
            const blocked = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui", {
                sourceStem: "nukal",
                sourceEvidence: {
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                routeExecutableRuleId: route?.executableRuleId || "",
                routeUsesExecutableRule: route?.boundaries?.usesExecutableAndrewsRuleContract === true,
                routeTargetVerbStem: route?.targetVerbStem || "",
                consonantSuccess: {
                    ok: consonantSuccess?.ok,
                    surface: consonantSuccess?.surface || "",
                    targetVerbStem: consonantSuccess?.targetVerbStem || "",
                    targetInput: consonantSuccess?.targetInput || "",
                    targetStemClass: consonantSuccess?.targetStemClass || "",
                    resultFrameSurface: consonantSuccess?.frames?.resultFrame?.surface || "",
                    routeStage: consonantSuccess?.frames?.routeContract?.routeStage || "",
                    generationAllowed: consonantSuccess?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: consonantSuccess?.contractDiagnostics?.length || 0,
                },
                vowelSuccess: {
                    ok: vowelSuccess?.ok,
                    surface: vowelSuccess?.surface || "",
                    targetVerbStem: vowelSuccess?.targetVerbStem || "",
                    targetInput: vowelSuccess?.targetInput || "",
                    targetStemClass: vowelSuccess?.targetStemClass || "",
                    sourceStemFinalType: vowelSuccess?.sourceStemFinalType || "",
                    nawatRuleSuffix: vowelSuccess?.nawatRuleSuffix || "",
                },
                blocked: {
                    ok: blocked?.ok,
                    surface: blocked?.surface || "",
                    resultFrameSurface: blocked?.frames?.resultFrame?.surface || "",
                    diagnosticId: blocked?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blocked?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blocked?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blocked?.frames?.diagnosticFrame?.status || "",
                    routeGenerationAllowed: blocked?.frames?.routeContract?.generationAllowed,
                    blockingFailedLayer: blocked?.frames?.routeContract?.blockingDiagnostics?.[0]?.failedLayer || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-2-hui",
                contractId: "54.2.2-inceptive-stative-hui",
                routeTemplateId: "hui",
                range: "54.2.2",
                authority: ["Andrews 54.2", "Andrews 54.2.2"],
                input: {
                    unit: "nnc-predicate",
                    state: "absolutive",
                    sourceCategory: "absolutive-state-nnc-predicate",
                    sourceEvidence: "nawat-source-stem-or-generated-nnc-predicate",
                },
                operation: {
                    type: "denominal-verbstem",
                    suffix: "wi",
                    classicalSuffix: "hui",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["A", "B"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-2-hui"],
            inventoryStructuralOnly: false,
            routeExecutableRuleId: "andrews-54-2-2-hui",
            routeUsesExecutableRule: true,
            routeTargetVerbStem: "pusukwi",
            consonantSuccess: {
                ok: true,
                surface: "pusukwi",
                targetVerbStem: "pusukwi",
                targetInput: "(pusukwi)",
                targetStemClass: "A",
                resultFrameSurface: "pusukwi",
                routeStage: "execute-rule-contract",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            vowelSuccess: {
                ok: true,
                surface: "shuchiwi",
                targetVerbStem: "shuchiwi",
                targetInput: "(shuchiwi)",
                targetStemClass: "B",
                sourceStemFinalType: "vowel",
                nawatRuleSuffix: "wi",
            },
            blocked: {
                ok: false,
                surface: "",
                resultFrameSurface: "",
                diagnosticId: "andrews-54.2.2-hui-absolutive-state-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
                routeGenerationAllowed: false,
                blockingFailedLayer: "agreement",
            },
        }
    );
    s.eq(
        "Andrews 54.2.2 hui-lia can generate from Andrews hui source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui-lia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.2-hui-lia-causative"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.2.2-hui-lia-causative", "hui-lia");
            const huiSourceRoute = findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui");
            const huiSourcePreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(huiSourceRoute);
            const satisfiedRoute = huiSourcePreview?.routePreview?.routes
                ?.find((route) => route.contractId === "54.2.2-hui-lia-causative" && route.routeTemplateId === "hui-lia");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui-lia", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    huiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-hui-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui-lia", {
                sourceStem: "pusukwi",
                sourceState: "derived",
                sourceCategory: "intransitive-hui-vnc",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-2-hui-lia", {
                sourceStem: "pusukti",
                sourceEvidence: {
                    huiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-hui-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.2-hui-lia-hui-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.2-hui-lia-hui-source-evidence-required")?.failedLayer || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-2-hui-lia",
                contractId: "54.2.2-hui-lia-causative",
                routeTemplateId: "hui-lia",
                range: "54.2.2",
                authority: ["Andrews 54.2.2", "Andrews 25.5"],
                input: {
                    unit: "vnc",
                    state: "derived",
                    sourceCategory: "intransitive-hui-vnc",
                    sourceEvidence: "generated-hui-verbstem-required",
                },
                operation: {
                    type: "single-object-causative-verbstem",
                    sourceSuffix: "wi",
                    suffix: "lia",
                    classicalSuffix: "hui-lia",
                    outputValency: "single-object-causative",
                },
                output: {
                    unit: "vnc",
                    valency: "single-object-causative",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-2-hui-lia"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-2-2-hui-lia",
                routeTargetGenerated: true,
                targetVerbStem: "pusukwilia",
                diagnosticId: "andrews-54.2.2-hui-lia-hui-source-evidence-required",
                diagnosticLayer: "authority",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-2-2-hui-lia",
                routeTargetGenerated: true,
                targetVerbStem: "pusukwilia",
                targetInput: "(pusukwi)-(lia)",
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceRequirement: "source-evidence-satisfied",
            },
            success: {
                ok: true,
                surface: "pusukwilia",
                targetVerbStem: "pusukwilia",
                targetInput: "(pusukwi)-(lia)",
                sourceVerbStem: "pusukwi",
                targetValency: "single-object-causative",
                resultFrameSurface: "pusukwilia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusukwilia",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.2-hui-lia-source-final-wi-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.2.3 root-plus-ya is an executable rule contract with stem-rank guards",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.3-inceptive-stative-ya"
            ));
            const route = findAndrewsContractRoute("54.2.3-inceptive-stative-ya", "ya");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya", {
                sourceStem: "shuchi",
                sourceCategory: "nounstem-as-root",
                sourceState: "absolutive",
            });
            const blockedDerivedSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya", {
                sourceStem: "pusukti",
                sourceEvidence: {
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                },
            });
            const blockedPossessiveSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya", {
                sourceStem: "nukal",
                sourceEvidence: {
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                routeExecutableRuleId: route?.executableRuleId || "",
                routeUsesExecutableRule: route?.boundaries?.usesExecutableAndrewsRuleContract === true,
                routeTargetVerbStem: route?.targetVerbStem || "",
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetStemClass: success?.targetStemClass || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    routeStage: success?.frames?.routeContract?.routeStage || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedDerivedSource: {
                    ok: blockedDerivedSource?.ok,
                    surface: blockedDerivedSource?.surface || "",
                    diagnosticId: blockedDerivedSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedDerivedSource?.frames?.diagnosticFrame?.status || "",
                    routeGenerationAllowed: blockedDerivedSource?.frames?.routeContract?.generationAllowed,
                },
                blockedPossessiveSource: {
                    ok: blockedPossessiveSource?.ok,
                    surface: blockedPossessiveSource?.surface || "",
                    diagnosticId: blockedPossessiveSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedPossessiveSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedPossessiveSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedPossessiveSource?.frames?.diagnosticFrame?.status || "",
                    routeGenerationAllowed: blockedPossessiveSource?.frames?.routeContract?.generationAllowed,
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-3-ya",
                contractId: "54.2.3-inceptive-stative-ya",
                routeTemplateId: "ya",
                range: "54.2.3",
                authority: ["Andrews 54.2", "Andrews 54.2.3"],
                input: {
                    unit: "nounroot-or-nounstem-as-root",
                    state: "absolutive",
                    sourceCategory: "nounroot-or-nounstem-as-root",
                    sourceEvidence: "nawat-root-or-stem-as-root",
                },
                operation: {
                    type: "denominal-verbstem",
                    suffix: "ya",
                    classicalSuffix: "ya",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["A", "B"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-3-ya"],
            inventoryStructuralOnly: false,
            routeExecutableRuleId: "andrews-54-2-3-ya",
            routeUsesExecutableRule: true,
            routeTargetVerbStem: "pusukya",
            success: {
                ok: true,
                surface: "shuchiya",
                targetVerbStem: "shuchiya",
                targetInput: "(shuchiya)",
                targetStemClass: "A/B",
                resultFrameSurface: "shuchiya",
                routeStage: "execute-rule-contract",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedDerivedSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.3-ya-root-source-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
                routeGenerationAllowed: false,
            },
            blockedPossessiveSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.3-ya-absolutive-root-state-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
                routeGenerationAllowed: false,
            },
        }
    );
    s.eq(
        "Andrews 54.2.3 ti-ya can generate from Andrews ti source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ti-ya");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.3-ti-ya-deverbal"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.2.3-ti-ya-deverbal", "ti-ya");
            const tiSourceRoute = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
            const tiSourcePreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(tiSourceRoute);
            const satisfiedRoute = tiSourcePreview?.routePreview?.routes
                ?.find((route) => route.contractId === "54.2.3-ti-ya-deverbal" && route.routeTemplateId === "ti-ya");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ti-ya", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ti-ya", {
                sourceStem: "pusukti",
                sourceState: "derived",
                sourceCategory: "intransitive-ti-vnc",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ti-ya", {
                sourceStem: "pusukwi",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.3-ti-ya-ti-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.3-ti-ya-ti-source-evidence-required")?.failedLayer || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetStemClass: success?.targetStemClass || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-3-ti-ya",
                contractId: "54.2.3-ti-ya-deverbal",
                routeTemplateId: "ti-ya",
                range: "54.2.3",
                authority: ["Andrews 54.2.3"],
                input: {
                    unit: "vnc",
                    state: "derived",
                    sourceCategory: "intransitive-ti-vnc",
                    sourceEvidence: "generated-ti-verbstem-required",
                },
                operation: {
                    type: "deverbal-verbstem",
                    sourceSuffix: "ti",
                    suffix: "ya",
                    classicalSuffix: "ti-ya",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["A", "B"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-3-ti-ya"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-2-3-ti-ya",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktiya",
                diagnosticId: "andrews-54.2.3-ti-ya-ti-source-evidence-required",
                diagnosticLayer: "authority",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-2-3-ti-ya",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktiya",
                targetInput: "(pusukti)-(ya)",
                finiteAvailable: true,
                sourceRequirement: "source-evidence-satisfied",
            },
            success: {
                ok: true,
                surface: "pusuktiya",
                targetVerbStem: "pusuktiya",
                targetInput: "(pusukti)-(ya)",
                sourceVerbStem: "pusukti",
                targetStemClass: "A/B",
                resultFrameSurface: "pusuktiya",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusuktiya",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.3-ti-ya-source-final-ti-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.2.3 hui-ya can generate from Andrews hui source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-hui-ya");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.3-hui-ya-deverbal"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.2.3-hui-ya-deverbal", "hui-ya");
            const huiSourceRoute = findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui");
            const huiSourcePreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(huiSourceRoute);
            const satisfiedRoute = huiSourcePreview?.routePreview?.routes
                ?.find((route) => route.contractId === "54.2.3-hui-ya-deverbal" && route.routeTemplateId === "hui-ya");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-hui-ya", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    huiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-hui-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-hui-ya", {
                sourceStem: "pusukwi",
                sourceState: "derived",
                sourceCategory: "intransitive-hui-vnc",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-hui-ya", {
                sourceStem: "pusukti",
                sourceEvidence: {
                    huiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-hui-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.3-hui-ya-hui-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.3-hui-ya-hui-source-evidence-required")?.failedLayer || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetStemClass: success?.targetStemClass || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-3-hui-ya",
                contractId: "54.2.3-hui-ya-deverbal",
                routeTemplateId: "hui-ya",
                range: "54.2.3",
                authority: ["Andrews 54.2.3"],
                input: {
                    unit: "vnc",
                    state: "derived",
                    sourceCategory: "intransitive-hui-vnc",
                    sourceEvidence: "generated-hui-verbstem-required",
                },
                operation: {
                    type: "deverbal-verbstem",
                    sourceSuffix: "wi",
                    suffix: "ya",
                    classicalSuffix: "hui-ya",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["B"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-3-hui-ya"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-2-3-hui-ya",
                routeTargetGenerated: true,
                targetVerbStem: "pusukwiya",
                diagnosticId: "andrews-54.2.3-hui-ya-hui-source-evidence-required",
                diagnosticLayer: "authority",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-2-3-hui-ya",
                routeTargetGenerated: true,
                targetVerbStem: "pusukwiya",
                targetInput: "(pusukwi)-(ya)",
                finiteAvailable: true,
                sourceRequirement: "source-evidence-satisfied",
            },
            success: {
                ok: true,
                surface: "pusukwiya",
                targetVerbStem: "pusukwiya",
                targetInput: "(pusukwi)-(ya)",
                sourceVerbStem: "pusukwi",
                targetStemClass: "B",
                resultFrameSurface: "pusukwiya",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusukwiya",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.3-hui-ya-source-final-wi-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.2.3 ya-lia can generate from Andrews ya source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya-lia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.3-ya-lia-causative"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.2.3-ya-lia-causative", "ya-lia");
            const yaSourceRoute = findAndrewsContractRoute("54.2.3-inceptive-stative-ya", "ya");
            const yaSourcePreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(yaSourceRoute);
            const satisfiedRoute = yaSourcePreview?.routePreview?.routes
                ?.find((route) => route.contractId === "54.2.3-ya-lia-causative" && route.routeTemplateId === "ya-lia");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya-lia", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    yaSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ya-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukya",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya-lia", {
                sourceStem: "pusukya",
                sourceState: "derived",
                sourceCategory: "intransitive-ya-vnc",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ya-lia", {
                sourceStem: "pusukti",
                sourceEvidence: {
                    yaSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ya-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.3-ya-lia-ya-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.3-ya-lia-ya-source-evidence-required")?.failedLayer || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-3-ya-lia",
                contractId: "54.2.3-ya-lia-causative",
                routeTemplateId: "ya-lia",
                range: "54.2.3",
                authority: ["Andrews 54.2.3", "Andrews 25.5.2"],
                input: {
                    unit: "vnc",
                    state: "derived",
                    sourceCategory: "intransitive-ya-vnc",
                    sourceEvidence: "generated-ya-verbstem-required",
                },
                operation: {
                    type: "causative-or-applicative-verbstem",
                    sourceSuffix: "ya",
                    droppedSourceSuffix: "ya",
                    suffix: "lia",
                    classicalSuffix: "lia",
                    outputValency: "single-object-causative-or-applicative",
                },
                output: {
                    unit: "vnc",
                    valency: "single-object-causative-or-applicative",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-3-ya-lia"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-2-3-ya-lia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuklia",
                diagnosticId: "andrews-54.2.3-ya-lia-ya-source-evidence-required",
                diagnosticLayer: "authority",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-2-3-ya-lia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuklia",
                targetInput: "(pusuk)-(lia)",
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceRequirement: "source-evidence-satisfied",
            },
            success: {
                ok: true,
                surface: "pusuklia",
                targetVerbStem: "pusuklia",
                targetInput: "(pusuk)-(lia)",
                sourceVerbStem: "pusukya",
                targetValency: "single-object-causative-or-applicative",
                resultFrameSurface: "pusuklia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusuklia",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.3-ya-lia-source-final-ya-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.2.4 limited inceptive-stative a is an executable Class C rule contract",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-4-a");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.4-inceptive-stative-a"
            ));
            const route = findAndrewsContractRoute("54.2.4-inceptive-stative-a", "a");
            const request = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(route, {
                tense: "presente",
            });
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-4-a", {
                sourceStem: "tlawi",
                sourceCategory: "nounstem",
                sourceState: "absolutive",
            });
            const blockedDerivedSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-4-a", {
                sourceStem: "pusukti",
                sourceEvidence: {
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                },
            });
            const blockedPossessiveSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-4-a", {
                sourceStem: "nukal",
                sourceEvidence: {
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                routeExecutableRuleId: route?.executableRuleId || "",
                routeTargetVerbStem: route?.targetVerbStem || "",
                routeTargetInput: route?.targetInput || "",
                routeTargetStemClass: route?.targetStemClass || "",
                routeLimitedUse: route?.boundaries?.limitedUse === true,
                routeFiniteAvailable: route?.finiteGenerationContractAvailable === true,
                requestVerb: request?.posicionesFormula?.tronco || "",
                requestObjectExpected: request?.denominalAndrewsContractRoute?.objectSlotExpected === true,
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetStemClass: success?.targetStemClass || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedDerivedSource: {
                    ok: blockedDerivedSource?.ok,
                    surface: blockedDerivedSource?.surface || "",
                    diagnosticId: blockedDerivedSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedDerivedSource?.frames?.diagnosticFrame?.status || "",
                },
                blockedPossessiveSource: {
                    ok: blockedPossessiveSource?.ok,
                    surface: blockedPossessiveSource?.surface || "",
                    diagnosticId: blockedPossessiveSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedPossessiveSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedPossessiveSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedPossessiveSource?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-4-a",
                contractId: "54.2.4-inceptive-stative-a",
                routeTemplateId: "a",
                range: "54.2.4",
                authority: ["Andrews 54.2.4"],
                input: {
                    unit: "nounstem",
                    state: "absolutive",
                    sourceCategory: "absolutive-nounstem",
                    sourceEvidence: "nawat-source-nounstem-required",
                },
                operation: {
                    type: "limited-inceptive-stative-verbstem",
                    suffix: "a",
                    classicalSuffix: "a",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["C"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-4-a"],
            inventoryStructuralOnly: false,
            routeExecutableRuleId: "andrews-54-2-4-a",
            routeTargetVerbStem: "pusuka",
            routeTargetInput: "(pusuka)",
            routeTargetStemClass: "C",
            routeLimitedUse: true,
            routeFiniteAvailable: true,
            requestVerb: "(pusuka)",
            requestObjectExpected: false,
            success: {
                ok: true,
                surface: "tlawia",
                targetVerbStem: "tlawia",
                targetInput: "(tlawia)",
                targetStemClass: "C",
                targetValency: "intransitive",
                resultFrameSurface: "tlawia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedDerivedSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.4-a-nounstem-source-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
            blockedPossessiveSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.4-a-absolutive-nounstem-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.2.5 hua can generate from Andrews deverbal yu source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-5-hua");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2.5-inceptive-stative-hua"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.2.5-inceptive-stative-hua", "hua");
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "tukayu",
                contractId: "54.2.5-inceptive-stative-hua",
                sourceEvidence: {
                    deverbalYoSource: true,
                    sourceState: "absolutive",
                    sourceCategory: "deverbal-yu-nounstem",
                    sourceBaseStem: "tukayu",
                },
            });
            const satisfiedRoute = satisfiedPreview?.routes?.[0] || null;
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-5-hua", {
                sourceStem: "tukayu",
                sourceEvidence: {
                    deverbalYoSource: true,
                    sourceState: "absolutive",
                    sourceCategory: "deverbal-yu-nounstem",
                    sourceBaseStem: "tukayu",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-5-hua", {
                sourceStem: "tukayu",
                sourceState: "absolutive",
                sourceCategory: "deverbal-yu-nounstem",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-5-hua", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    deverbalYoSource: true,
                    sourceState: "absolutive",
                    sourceCategory: "deverbal-yu-nounstem",
                    sourceBaseStem: "pusuk",
                },
            });
            const blockedPossessiveSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-5-hua", {
                sourceStem: "nutukayu",
                sourceEvidence: {
                    deverbalYoSource: true,
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                    sourceBaseStem: "nutukayu",
                },
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.5-hua-deverbal-yo-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2.5-hua-deverbal-yo-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    targetStemClass: satisfiedRoute?.targetStemClass || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    notOaFormation: satisfiedRoute?.boundaries?.notOaFormation === true,
                },
                success: {
                    ok: success?.ok,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetStemClass: success?.targetStemClass || "",
                    nawatRuleSuffix: success?.nawatRuleSuffix || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
                blockedPossessiveSource: {
                    ok: blockedPossessiveSource?.ok,
                    surface: blockedPossessiveSource?.surface || "",
                    diagnosticId: blockedPossessiveSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedPossessiveSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedPossessiveSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedPossessiveSource?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-5-hua",
                contractId: "54.2.5-inceptive-stative-hua",
                routeTemplateId: "hua",
                range: "54.2.5",
                authority: ["Andrews 54.2.5", "Andrews 39.3"],
                input: {
                    unit: "deverbal-nounstem",
                    state: "absolutive",
                    sourceCategory: "deverbal-yu-nounstem",
                    sourceEvidence: "andrews-deverbal-yo-tl-yu-source-context-required",
                },
                operation: {
                    type: "deverbal-yo-nounstem-inceptive-stative-verbstem",
                    sourceMatrix: "yu",
                    suffix: "wa",
                    classicalSuffix: "hua",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["A"],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-5-hua"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-2-5-hua",
                routeTargetGenerated: true,
                targetVerbStem: "pusukwa",
                diagnosticId: "andrews-54.2.5-hua-deverbal-yo-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-2-5-hua",
                routeTargetGenerated: true,
                targetVerbStem: "tukayuwa",
                targetInput: "(tukayuwa)",
                targetStemClass: "A",
                finiteAvailable: true,
                sourceRequirement: "source-evidence-satisfied",
                notOaFormation: true,
            },
            success: {
                ok: true,
                surface: "tukayuwa",
                targetVerbStem: "tukayuwa",
                targetInput: "(tukayuwa)",
                targetStemClass: "A",
                nawatRuleSuffix: "wa",
                resultFrameSurface: "tukayuwa",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "tukayuwa",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.5-hua-source-final-yu-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
            blockedPossessiveSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2.5-hua-absolutive-yu-source-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.2.5 hua route consumes generated characteristic-property yut output as deverbal yu source evidence",
        (() => {
            const characteristicOutput = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: "sustantivo",
                    derivationMode: "active",
                    voiceMode: "active",
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(miki)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "calificativo-instrumentivo",
                },
            });
            const possessedCharacteristicOutput = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: "sustantivo",
                    derivationMode: "active",
                    voiceMode: "active",
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "(miki)",
                    pers2: "",
                    num2: "",
                    poseedor: "nu",
                    tiempo: "calificativo-instrumentivo",
                },
            });
            const nonactiveCharacteristicOutput = ctx.generateWord({
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: "sustantivo",
                    derivationMode: "nonactive",
                    voiceMode: "passive-impersonal",
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ta",
                    tronco: "-(mati)",
                    pers2: "",
                    num2: "",
                    poseedor: "",
                    tiempo: "calificativo-instrumentivo",
                },
            });
            const sourceEvidence = ctx.buildNawatDenominalAndrewsHuaSourceEvidenceFromCharacteristicPropertyOutput(
                characteristicOutput
            );
            const routePreview = ctx.previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput(
                characteristicOutput
            );
            const route = routePreview?.routePreview?.routes?.[0] || null;
            const request = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(route, {
                tense: "presente",
            });
            const execution = ctx.executeNawatDenominalAndrewsContractRoute(route, {
                tense: "presente",
            });
            const nonactivePreview = ctx.previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput(
                nonactiveCharacteristicOutput
            );
            return {
                sourceEvidence,
                routeCount: routePreview?.candidateRouteCount || 0,
                routeRequirementStatus: route?.sourceRequirement?.validationStatus || "",
                routeTargetStemClass: route?.targetStemClass || "",
                routeNotOaFormation: route?.boundaries?.notOaFormation === true,
                routeSourceEvidenceLinked: route?.frames?.authorityFrame?.evidenceStatus || "",
                requestVerb: request?.posicionesFormula?.tronco || "",
                executionSurface: execution?.result || "",
                possessedPreview: ctx.previewNawatDenominalAndrewsHuaRouteFromCharacteristicPropertyOutput(
                    possessedCharacteristicOutput
                ),
                multiSourceStems: (nonactivePreview?.sourceEvidences || []).map((evidence) => evidence.sourceBaseStem),
                multiRouteTargets: (nonactivePreview?.routePreview?.routes || []).map((candidate) => candidate.targetInput),
            };
        })(),
        {
            sourceEvidence: {
                deverbalYoSource: true,
                deverbalYuSource: true,
                huaSource: true,
                sourceState: "absolutive",
                sourceCategory: "deverbal-yu-nounstem",
                sourceSurface: "mikkayut",
                sourceBaseStem: "mikkayu",
                sourcePredicateStem: "mikka",
                sourceEmbeddedStem: "mikka",
                sourceFormulaEcho: "#Ø-Ø(mikka)Ø#",
                sourceOutputKind: "verb-derived-nominal",
                sourceNominalKind: "calificativo-instrumentivo",
                sourceNominalizationKind: "quality-result",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromGeneratedOutput: true,
                    sourceEvidenceFromGeneratedCalificativoInstrumentivo: true,
                    sourceEvidenceFromGeneratedCharacteristicPropertyNnc: true,
                    deverbalYuMatrixFromCharacteristicProperty: true,
                    absolutiveConnectorTStrippedForSourceStem: true,
                    sourceNounstemEndsInYu: true,
                    deverbalYuSourceRequiredByAndrews5425Hua: true,
                    notOaFormation: true,
                    noClassicalSurfaceImport: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            routeCount: 1,
            routeRequirementStatus: "source-evidence-satisfied",
            routeTargetStemClass: "A",
            routeNotOaFormation: true,
            routeSourceEvidenceLinked: "source-evidence-linked",
            requestVerb: "(mikkayuwa)",
            executionSurface: "mikkayuwa",
            possessedPreview: null,
            multiSourceStems: ["machukayu", "matukayu", "matilukayu"],
            multiRouteTargets: ["(machukayuwa)", "(matukayuwa)", "(matilukayuwa)"],
        }
    );
    s.eq(
        "Andrews 54.3 included-possessor ti can generate from Andrews possessive source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-3-included-possessor-ti");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.3-included-possessor-ti"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.3-included-possessor-ti", "included-possessor-ti");
            const possessiveSourceEvidence = {
                possessiveState: true,
                sourceState: "possessive",
                sourceCategory: "possessive-state-nnc-predicate",
                sourceSurface: "nukal",
                sourceBaseStem: "nukal",
                sourcePredicateStem: "kal",
                sourcePossessorPrefix: "nu",
            };
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "nukal",
                contractId: "54.3-included-possessor-ti",
                sourceEvidence: possessiveSourceEvidence,
            });
            const satisfiedRoute = satisfiedPreview?.routes?.[0] || null;
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-3-included-possessor-ti", {
                sourceStem: "nukal",
                sourceEvidence: possessiveSourceEvidence,
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-3-included-possessor-ti", {
                sourceStem: "nukal",
                sourceState: "possessive",
                sourceCategory: "possessive-state-nnc-predicate",
            });
            const blockedAbsolutiveSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-3-included-possessor-ti", {
                sourceStem: "kal",
                sourceEvidence: {
                    sourceState: "absolutive",
                    sourceCategory: "ordinary-nnc-predicate-nounstem",
                    sourceBaseStem: "kal",
                },
            });
            const blockedMissingStem = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-3-included-possessor-ti", {
                sourceEvidence: {
                    possessiveState: true,
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                },
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                satisfiedRoute,
                { tense: "presente" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-possessive-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-possessive-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    targetStemClass: satisfiedRoute?.targetStemClass || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    objectSlotExpected: finiteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetStemClass: success?.targetStemClass || "",
                    nawatRuleSuffix: success?.nawatRuleSuffix || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.diagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedAbsolutiveSource: {
                    ok: blockedAbsolutiveSource?.ok === true,
                    surface: blockedAbsolutiveSource?.surface || "",
                    diagnosticId: blockedAbsolutiveSource?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-possessive-state-required")?.id || "",
                    failedLayer: blockedAbsolutiveSource?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-possessive-state-required")?.failedLayer || "",
                    contractLayer: blockedAbsolutiveSource?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-possessive-state-required")?.contractLayer || "",
                    frameStatus: blockedAbsolutiveSource?.frames?.diagnosticFrame?.status || "",
                },
                blockedMissingStem: {
                    ok: blockedMissingStem?.ok === true,
                    surface: blockedMissingStem?.surface || "",
                    diagnosticId: blockedMissingStem?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-source-predicate-required")?.id || "",
                    failedLayer: blockedMissingStem?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-source-predicate-required")?.failedLayer || "",
                    contractLayer: blockedMissingStem?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.3-included-possessor-ti-source-predicate-required")?.contractLayer || "",
                    frameStatus: blockedMissingStem?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-3-included-possessor-ti",
                contractId: "54.3-included-possessor-ti",
                routeTemplateId: "included-possessor-ti",
                range: "54.3",
                authority: ["Andrews 54.3"],
                input: {
                    unit: "nnc-predicate",
                    state: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                    sourceEvidence: "andrews-possessive-state-nnc-predicate-context-required",
                },
                operation: {
                    type: "possessive-state-predicate-included-possessor-verbstem",
                    suffix: "ti",
                    classicalSuffix: "ti",
                    possessorPlacement: "inside-derived-verbstem",
                    possessiveCaseTransformedToObjective: false,
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["A"],
                    surfaceAuthority: "nawat-source-surface-and-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-3-included-possessor-ti"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-3-included-possessor-ti",
                routeTargetGenerated: true,
                targetVerbStem: "pusukti",
                diagnosticId: "andrews-54.3-included-possessor-ti-possessive-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-3-included-possessor-ti",
                routeTargetGenerated: true,
                targetVerbStem: "nukalti",
                targetInput: "(nukalti)",
                targetStemClass: "A",
                finiteAvailable: true,
                sourceRequirement: "source-evidence-satisfied",
                requestVerb: "(nukalti)",
                objectSlotExpected: false,
            },
            success: {
                ok: true,
                surface: "nukalti",
                targetVerbStem: "nukalti",
                targetInput: "(nukalti)",
                targetStemClass: "A",
                nawatRuleSuffix: "ti",
                resultFrameSurface: "nukalti",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "nukalti",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedAbsolutiveSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.3-included-possessor-ti-possessive-state-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
            blockedMissingStem: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.3-included-possessor-ti-source-predicate-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.2.1 and 54.4 ti-lia can generate from Andrews ti source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-54-4-ti-lia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.2-54.4-ti-lia-causative"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.2-54.4-ti-lia-causative", "ti-lia");
            const tiSourceRoute = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
            const tiSourcePreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(tiSourceRoute);
            const satisfiedRoute = tiSourcePreview?.routePreview?.routes
                ?.find((route) => route.contractId === "54.2-54.4-ti-lia-causative" && route.routeTemplateId === "ti-lia");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-54-4-ti-lia", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-54-4-ti-lia", {
                sourceStem: "pusukti",
                sourceState: "derived",
                sourceCategory: "intransitive-ti-vnc",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-54-4-ti-lia", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                },
            });
            const blockedOriginalPossessive = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-54-4-ti-lia", {
                sourceStem: "nukal",
                sourceEvidence: {
                    possessiveState: true,
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                    sourceBaseStem: "nukal",
                },
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                satisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2-54.4-ti-lia-ti-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2-54.4-ti-lia-ti-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    targetStemClass: satisfiedRoute?.targetStemClass || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    requestObjectPrefix: finiteRequest?.posicionesFormula?.obj1 || "",
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetStemClass: success?.targetStemClass || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok === true,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
                blockedOriginalPossessive: {
                    ok: blockedOriginalPossessive?.ok === true,
                    surface: blockedOriginalPossessive?.surface || "",
                    diagnosticId: blockedOriginalPossessive?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2-54.4-ti-lia-derived-ti-source-required")?.id || "",
                    failedLayer: blockedOriginalPossessive?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2-54.4-ti-lia-derived-ti-source-required")?.failedLayer || "",
                    contractLayer: blockedOriginalPossessive?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.2-54.4-ti-lia-derived-ti-source-required")?.contractLayer || "",
                    frameStatus: blockedOriginalPossessive?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-2-54-4-ti-lia",
                contractId: "54.2-54.4-ti-lia-causative",
                routeTemplateId: "ti-lia",
                range: "54.2.1/54.4",
                authority: ["Andrews 54.2.1", "Andrews 54.4", "Andrews 25.5"],
                input: {
                    unit: "vnc-stem",
                    state: "derived",
                    sourceCategory: "intransitive-ti-verbstem-source",
                    sourceEvidence: "generated-ti-verbstem-source-required",
                },
                operation: {
                    type: "single-object-causative-from-ti-verbstem",
                    sourceSuffix: "ti",
                    suffix: "lia",
                    classicalSuffix: "lia",
                    outputValency: "single-object-causative",
                },
                output: {
                    unit: "vnc",
                    valency: "single-object-causative",
                    stemClass: ["C"],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-2-54-4-ti-lia"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-2-54-4-ti-lia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktilia",
                diagnosticId: "andrews-54.2-54.4-ti-lia-ti-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-2-54-4-ti-lia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktilia",
                targetInput: "(pusukti)-(lia)",
                targetStemClass: "C",
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceRequirement: "source-evidence-satisfied",
                requestVerb: "(pusukti)-(lia)",
                requestObjectPrefix: "ta",
            },
            success: {
                ok: true,
                surface: "pusuktilia",
                targetVerbStem: "pusuktilia",
                targetInput: "(pusukti)-(lia)",
                sourceVerbStem: "pusukti",
                targetStemClass: "C",
                targetValency: "single-object-causative",
                resultFrameSurface: "pusuktilia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusuktilia",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2-54.4-ti-lia-source-final-ti-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
            blockedOriginalPossessive: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.2-54.4-ti-lia-derived-ti-source-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.5 ti-a can generate from Andrews ti source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-5-ti-a");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.5-ti-a-causative"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.5-ti-a-causative", "ti-a");
            const tiSourceRoute = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
            const tiSourcePreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(tiSourceRoute);
            const satisfiedRoute = tiSourcePreview?.routePreview?.routes
                ?.find((route) => route.contractId === "54.5-ti-a-causative" && route.routeTemplateId === "ti-a");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-5-ti-a", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-5-ti-a", {
                sourceStem: "pusukti",
                sourceState: "derived",
                sourceCategory: "ti-vnc-from-nnc",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-5-ti-a", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                },
            });
            const blockedPossessiveDoubleObject = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-5-ti-a", {
                sourceStem: "nukal",
                sourceEvidence: {
                    possessiveState: true,
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                    sourceBaseStem: "nukal",
                },
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                satisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.5-ti-a-ti-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.5-ti-a-ti-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    targetStemClass: satisfiedRoute?.targetStemClass || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    requestObjectPrefix: finiteRequest?.posicionesFormula?.obj1 || "",
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetStemClass: success?.targetStemClass || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok === true,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
                blockedPossessiveDoubleObject: {
                    ok: blockedPossessiveDoubleObject?.ok === true,
                    surface: blockedPossessiveDoubleObject?.surface || "",
                    diagnosticId: blockedPossessiveDoubleObject?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.5-ti-a-possessive-double-object-source-unmodeled")?.id || "",
                    failedLayer: blockedPossessiveDoubleObject?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.5-ti-a-possessive-double-object-source-unmodeled")?.failedLayer || "",
                    contractLayer: blockedPossessiveDoubleObject?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.5-ti-a-possessive-double-object-source-unmodeled")?.contractLayer || "",
                    frameStatus: blockedPossessiveDoubleObject?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-5-ti-a",
                contractId: "54.5-ti-a-causative",
                routeTemplateId: "ti-a",
                range: "54.5",
                authority: ["Andrews 54.5", "Andrews 54.5.1"],
                input: {
                    unit: "vnc-stem",
                    state: "derived",
                    sourceCategory: "intransitive-ti-verbstem-source",
                    sourceEvidence: "generated-ti-verbstem-source-required",
                },
                operation: {
                    type: "single-object-first-type-causative-from-ti-verbstem",
                    sourceSuffix: "ti",
                    suffix: "a",
                    classicalSuffix: "a",
                    outputValency: "single-object-causative",
                },
                output: {
                    unit: "vnc",
                    valency: "single-object-causative",
                    stemClass: ["C"],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-5-ti-a"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-5-ti-a",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktia",
                diagnosticId: "andrews-54.5-ti-a-ti-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-5-ti-a",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktia",
                targetInput: "(pusukti)-(a)",
                targetStemClass: "C",
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceRequirement: "source-evidence-satisfied",
                requestVerb: "(pusukti)-(a)",
                requestObjectPrefix: "ta",
            },
            success: {
                ok: true,
                surface: "pusuktia",
                targetVerbStem: "pusuktia",
                targetInput: "(pusukti)-(a)",
                sourceVerbStem: "pusukti",
                targetStemClass: "C",
                targetValency: "single-object-causative",
                resultFrameSurface: "pusuktia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusuktia",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.5-ti-a-source-final-ti-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
            blockedPossessiveDoubleObject: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.5-ti-a-possessive-double-object-source-unmodeled",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 54.6 t-ia can generate from Andrews ti source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-54-6-t-ia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "54.6-t-ia-applicative"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("54.6-t-ia-applicative", "t-ia");
            const tiSourceRoute = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
            const tiSourcePreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(tiSourceRoute);
            const satisfiedRoute = tiSourcePreview?.routePreview?.routes
                ?.find((route) => route.contractId === "54.6-t-ia-applicative" && route.routeTemplateId === "t-ia");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-6-t-ia", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukti",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-6-t-ia", {
                sourceStem: "pusukti",
                sourceState: "derived",
                sourceCategory: "intransitive-ti-vnc",
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-6-t-ia", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tiSource: true,
                    sourceState: "derived",
                    sourceCategory: "inceptive-stative-ti-source",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                },
            });
            const blockedOriginalPossessive = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-6-t-ia", {
                sourceStem: "nukal",
                sourceEvidence: {
                    possessiveState: true,
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                    sourceBaseStem: "nukal",
                },
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                satisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.6-t-ia-ti-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.6-t-ia-ti-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    targetStemClass: satisfiedRoute?.targetStemClass || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    requestObjectPrefix: finiteRequest?.posicionesFormula?.obj1 || "",
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetStemClass: success?.targetStemClass || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok === true,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
                blockedOriginalPossessive: {
                    ok: blockedOriginalPossessive?.ok === true,
                    surface: blockedOriginalPossessive?.surface || "",
                    diagnosticId: blockedOriginalPossessive?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.6-t-ia-generated-ti-source-required")?.id || "",
                    failedLayer: blockedOriginalPossessive?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.6-t-ia-generated-ti-source-required")?.failedLayer || "",
                    contractLayer: blockedOriginalPossessive?.contractDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-54.6-t-ia-generated-ti-source-required")?.contractLayer || "",
                    frameStatus: blockedOriginalPossessive?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-54-6-t-ia",
                contractId: "54.6-t-ia-applicative",
                routeTemplateId: "t-ia",
                range: "54.6",
                authority: ["Andrews 54.6", "Andrews 26.2"],
                input: {
                    unit: "vnc-stem",
                    state: "derived",
                    sourceCategory: "intransitive-ti-verbstem-source",
                    sourceEvidence: "generated-ti-verbstem-source-required",
                },
                operation: {
                    type: "first-type-applicative-from-ti-verbstem",
                    sourceSuffix: "ti",
                    replaciveSourceStem: "delete-final-i",
                    suffix: "ia",
                    classicalSuffix: "ia",
                    outputValency: "applicative",
                },
                output: {
                    unit: "vnc",
                    valency: "applicative",
                    stemClass: ["C"],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-54-6-t-ia"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-54-6-t-ia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktia",
                diagnosticId: "andrews-54.6-t-ia-ti-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-54-6-t-ia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktia",
                targetInput: "(pusukt)-(ia)",
                targetStemClass: "C",
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceRequirement: "source-evidence-satisfied",
                requestVerb: "(pusukt)-(ia)",
                requestObjectPrefix: "ta",
            },
            success: {
                ok: true,
                surface: "pusuktia",
                targetVerbStem: "pusuktia",
                targetInput: "(pusukt)-(ia)",
                sourceVerbStem: "pusukti",
                targetStemClass: "C",
                targetValency: "applicative",
                resultFrameSurface: "pusuktia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusuktia",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.6-t-ia-source-final-ti-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
            blockedOriginalPossessive: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-54.6-t-ia-generated-ti-source-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 55.1 temporal tia can generate from Andrews temporal compound context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.1-temporal-tia"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("55.1-temporal-tia", "tia");
            const explicitPreview = ctx.previewNawatDenominalAndrewsTemporalTiaRouteFromSource({
                sourceStem: "seilwi",
                timeSegmentMatrix: "ilwi",
                numeralEmbed: "se",
            });
            const satisfiedRoute = explicitPreview?.routePreview?.routes?.[0] || null;
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia", {
                sourceStem: "seilwi",
                sourceEvidence: {
                    temporalCompoundSource: true,
                    sourceState: "absolutive",
                    sourceCategory: "compound-temporal-nounstem",
                    sourceBaseStem: "seilwi",
                    timeSegmentMatrix: "ilwi",
                    numeralEmbed: "se",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia", {
                sourceStem: "seilwi",
                sourceState: "absolutive",
                sourceCategory: "compound-temporal-nnc",
            });
            const directAndrewsContext = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia", {
                sourceStem: "seilwi",
                sourceState: "absolutive",
                sourceCategory: "compound-temporal-nnc",
                timeSegmentMatrix: "ilwi",
                numeralEmbed: "se",
            });
            const blockedLocativoTemporal = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia", {
                sourceStem: "nemiyan",
                sourceEvidence: {
                    sourceState: "absolutive",
                    sourceCategory: "locativo-temporal",
                    sourceBaseStem: "nemiyan",
                },
            });
            const blockedMissingStem = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia", {
                sourceEvidence: {
                    temporalCompoundSource: true,
                    sourceState: "absolutive",
                    sourceCategory: "compound-temporal-nounstem",
                    timeSegmentMatrix: "ilwi",
                    numeralEmbed: "se",
                },
            });
            const blockedPossessive = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-1-temporal-tia", {
                sourceStem: "nukal",
                sourceEvidence: {
                    temporalCompoundSource: true,
                    sourceState: "possessive",
                    sourceCategory: "compound-temporal-nounstem",
                    sourceBaseStem: "nukal",
                    timeSegmentMatrix: "ilwi",
                    numeralEmbed: "se",
                },
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                satisfiedRoute,
                { tense: "presente" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.1-temporal-tia-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.1-temporal-tia-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    requestObjectExpected: finiteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                directAndrewsContext: {
                    ok: directAndrewsContext?.ok === true,
                    surface: directAndrewsContext?.surface || "",
                    targetVerbStem: directAndrewsContext?.targetVerbStem || "",
                    targetInput: directAndrewsContext?.targetInput || "",
                    diagnosticCount: directAndrewsContext?.contractDiagnostics?.length || 0,
                    frameStatus: directAndrewsContext?.frames?.diagnosticFrame?.status || "",
                },
                blockedLocativoTemporal: {
                    ok: blockedLocativoTemporal?.ok === true,
                    surface: blockedLocativoTemporal?.surface || "",
                    diagnosticId: blockedLocativoTemporal?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedLocativoTemporal?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedLocativoTemporal?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedLocativoTemporal?.frames?.diagnosticFrame?.status || "",
                },
                blockedMissingStem: {
                    ok: blockedMissingStem?.ok === true,
                    surface: blockedMissingStem?.surface || "",
                    diagnosticId: blockedMissingStem?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedMissingStem?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedMissingStem?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedMissingStem?.frames?.diagnosticFrame?.status || "",
                },
                blockedPossessive: {
                    ok: blockedPossessive?.ok === true,
                    surface: blockedPossessive?.surface || "",
                    diagnosticId: blockedPossessive?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedPossessive?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedPossessive?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedPossessive?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-55-1-temporal-tia",
                contractId: "55.1-temporal-tia",
                routeTemplateId: "tia",
                range: "55.1",
                authority: ["Andrews 55.1"],
                input: {
                    unit: "compound-temporal-nounstem",
                    state: "absolutive",
                    sourceCategory: "compound-temporal-nounstem",
                    sourceEvidence: "andrews-time-segment-matrix-plus-numeral-embed-context-required",
                },
                operation: {
                    type: "temporal-intransitive-denominal-verbstem",
                    suffix: "tia",
                    classicalSuffix: "tia",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-55-1-temporal-tia"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-55-1-temporal-tia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktia",
                diagnosticId: "andrews-55.1-temporal-tia-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-55-1-temporal-tia",
                routeTargetGenerated: true,
                targetVerbStem: "seilwitia",
                targetInput: "(seilwitia)",
                finiteAvailable: true,
                objectPrefixRequired: false,
                sourceRequirement: "source-evidence-satisfied",
                requestVerb: "(seilwitia)",
                requestObjectExpected: false,
            },
            success: {
                ok: true,
                surface: "seilwitia",
                targetVerbStem: "seilwitia",
                targetInput: "(seilwitia)",
                targetValency: "intransitive",
                resultFrameSurface: "seilwitia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.1-temporal-tia-source-evidence-required",
                failedLayer: "authority",
                contractLayer: "authorityFrame",
                frameStatus: "blocked",
            },
            directAndrewsContext: {
                ok: true,
                surface: "seilwitia",
                targetVerbStem: "seilwitia",
                targetInput: "(seilwitia)",
                diagnosticCount: 0,
                frameStatus: "generated",
            },
            blockedLocativoTemporal: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.1-temporal-tia-source-evidence-required",
                failedLayer: "authority",
                contractLayer: "authorityFrame",
                frameStatus: "blocked",
            },
            blockedMissingStem: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.1-temporal-tia-source-stem-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
            blockedPossessive: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.1-temporal-tia-absolutive-source-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 55.2 causative tla is an executable transitive rule contract from a nounstem source",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-causative-tla");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.2-causative-tla"
            ));
            const route = findAndrewsContractRoute("55.2-causative-tla", "tla");
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-causative-tla", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const blockedMissingStem = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-causative-tla", {
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const blockedPossessive = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-causative-tla", {
                sourceStem: "nukal",
                sourceEvidence: {
                    possessiveState: true,
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                    sourceBaseStem: "nukal",
                },
            });
            const blockedDerivedSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-causative-tla", {
                sourceStem: "pusukti",
                sourceState: "derived",
                sourceCategory: "intransitive-ti-vnc",
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                route,
                { tense: "presente", objectPrefix: "ta" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                route: {
                    executableRuleId: route?.executableRuleId || "",
                    routeTargetGenerated: route?.routeTargetGenerated === true,
                    targetVerbStem: route?.targetVerbStem || "",
                    targetInput: route?.targetInput || "",
                    targetStemClass: route?.targetStemClass || "",
                    finiteAvailable: route?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: route?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: route?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    requestObjectPrefix: finiteRequest?.posicionesFormula?.obj1 || "",
                    requestObjectExpected: finiteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetStemClass: success?.targetStemClass || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedMissingStem: {
                    ok: blockedMissingStem?.ok === true,
                    surface: blockedMissingStem?.surface || "",
                    diagnosticId: blockedMissingStem?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedMissingStem?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedMissingStem?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedMissingStem?.frames?.diagnosticFrame?.status || "",
                },
                blockedPossessive: {
                    ok: blockedPossessive?.ok === true,
                    surface: blockedPossessive?.surface || "",
                    diagnosticId: blockedPossessive?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedPossessive?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedPossessive?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedPossessive?.frames?.diagnosticFrame?.status || "",
                },
                blockedDerivedSource: {
                    ok: blockedDerivedSource?.ok === true,
                    surface: blockedDerivedSource?.surface || "",
                    diagnosticId: blockedDerivedSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedDerivedSource?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-55-2-causative-tla",
                contractId: "55.2-causative-tla",
                routeTemplateId: "tla",
                range: "55.2",
                authority: ["Andrews 55.2"],
                input: {
                    unit: "nounstem",
                    state: "absolutive",
                    sourceCategory: "nounstem",
                    sourceEvidence: "nawat-source-nounstem-required",
                },
                operation: {
                    type: "denominal-causative-verbstem",
                    suffix: "ta",
                    classicalSuffix: "tla",
                    outputValency: "causative",
                },
                output: {
                    unit: "vnc",
                    valency: "causative",
                    stemClass: ["A"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-55-2-causative-tla"],
            inventoryStructuralOnly: false,
            route: {
                executableRuleId: "andrews-55-2-causative-tla",
                routeTargetGenerated: true,
                targetVerbStem: "pusukta",
                targetInput: "(pusuk)-(ta)",
                targetStemClass: "A",
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceRequirement: "not-required",
                requestVerb: "(pusuk)-(ta)",
                requestObjectPrefix: "ta",
                requestObjectExpected: true,
            },
            success: {
                ok: true,
                surface: "pusukta",
                targetVerbStem: "pusukta",
                targetInput: "(pusuk)-(ta)",
                targetStemClass: "A",
                targetValency: "causative",
                resultFrameSurface: "pusukta",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedMissingStem: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-causative-tla-source-stem-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
            blockedPossessive: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-causative-tla-absolutive-nounstem-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
            blockedDerivedSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-causative-tla-nounstem-source-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 55.2 tla-ti-lia can generate from Andrews causative tla source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-tla-ti-lia-applicative");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.2-tla-ti-lia-applicative"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("55.2-tla-ti-lia-applicative", "tla-ti-lia");
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "pusuk",
                contractId: "55.2-tla-ti-lia-applicative",
                sourceEvidence: {
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceState: "derived",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                },
            });
            const satisfiedRoute = satisfiedPreview?.routes?.[0] || null;
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-tla-ti-lia-applicative", {
                sourceEvidence: {
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceState: "derived",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-tla-ti-lia-applicative", {
                sourceStem: "pusukta",
                sourceState: "derived",
                sourceCategory: "causative-tla-vnc",
            });
            const blockedOriginalNounstem = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-tla-ti-lia-applicative", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceState: "absolutive",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                },
            });
            const blockedBoundary = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-tla-ti-lia-applicative", {
                sourceStem: "pusuk",
                sourceEvidence: {
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceState: "derived",
                    sourceBaseStem: "pusuk",
                },
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                satisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-tla-ti-lia-causative-tla-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-tla-ti-lia-causative-tla-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    requestObjectPrefix: finiteRequest?.posicionesFormula?.obj1 || "",
                    requestObjectExpected: finiteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    sourceStem: success?.sourceStem || "",
                    sourceVerbStem: success?.sourceVerbStem || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                blockedOriginalNounstem: {
                    ok: blockedOriginalNounstem?.ok === true,
                    surface: blockedOriginalNounstem?.surface || "",
                    diagnosticId: blockedOriginalNounstem?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedOriginalNounstem?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedOriginalNounstem?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedOriginalNounstem?.frames?.diagnosticFrame?.status || "",
                },
                blockedBoundary: {
                    ok: blockedBoundary?.ok === true,
                    surface: blockedBoundary?.surface || "",
                    diagnosticId: blockedBoundary?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedBoundary?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedBoundary?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedBoundary?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-55-2-tla-ti-lia-applicative",
                contractId: "55.2-tla-ti-lia-applicative",
                routeTemplateId: "tla-ti-lia",
                range: "55.2",
                authority: ["Andrews 55.2", "Andrews 26.7"],
                input: {
                    unit: "vnc-stem",
                    state: "derived",
                    sourceCategory: "causative-tla-verbstem-source",
                    sourceEvidence: "generated-causative-tla-verbstem-source-required",
                },
                operation: {
                    type: "applicative-from-causative-tla-verbstem",
                    sourceSuffix: "ta",
                    sourceClassicalSuffix: "tla",
                    replacementBeforeSuffix: "ti",
                    suffix: "lia",
                    classicalSuffix: "ti-lia",
                    outputValency: "applicative",
                },
                output: {
                    unit: "vnc",
                    valency: "applicative",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-55-2-tla-ti-lia-applicative"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-55-2-tla-ti-lia-applicative",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktilia",
                diagnosticId: "andrews-55.2-tla-ti-lia-causative-tla-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-55-2-tla-ti-lia-applicative",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktilia",
                targetInput: "(pusukti)-(lia)",
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceRequirement: "source-evidence-satisfied",
                requestVerb: "(pusukti)-(lia)",
                requestObjectPrefix: "ta",
                requestObjectExpected: true,
            },
            success: {
                ok: true,
                surface: "pusuktilia",
                sourceStem: "pusuk",
                sourceVerbStem: "pusukta",
                targetVerbStem: "pusuktilia",
                targetInput: "(pusukti)-(lia)",
                targetValency: "applicative",
                resultFrameSurface: "pusuktilia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: true,
                surface: "pusuktilia",
                diagnosticId: "",
                failedLayer: "",
                contractLayer: "",
                frameStatus: "generated",
            },
            blockedOriginalNounstem: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-tla-ti-lia-generated-tla-source-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
            blockedBoundary: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-tla-ti-lia-source-final-ta-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 55.2 note intransitive tla can generate from Andrews limited nounstem context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.2-intransitive-tla"
            ));
            const unsatisfiedRoute = findAndrewsContractRoute("55.2-intransitive-tla", "intransitive-tla");
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "ilwi",
                contractId: "55.2-intransitive-tla",
                sourceEvidence: {
                    intransitiveTlaLexicalSource: true,
                    sourceCategory: "intransitive-tla-lexical-source",
                    sourceState: "absolutive",
                    sourceBaseStem: "ilwi",
                },
            });
            const satisfiedRoute = satisfiedPreview?.routes?.[0] || null;
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla", {
                sourceEvidence: {
                    intransitiveTlaLexicalSource: true,
                    sourceCategory: "intransitive-tla-lexical-source",
                    sourceState: "absolutive",
                    sourceBaseStem: "ilwi",
                },
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla", {
                sourceStem: "ilwi",
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const directAndrewsContext = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla", {
                sourceStem: "ilwi",
                sourceState: "absolutive",
                sourceCategory: "intransitive-tla-nounstem-source",
            });
            const blockedPossessive = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla", {
                sourceStem: "nukal",
                sourceEvidence: {
                    intransitiveTlaLexicalSource: true,
                    sourceState: "possessive",
                    sourceCategory: "possessive-state-nnc-predicate",
                    sourceBaseStem: "nukal",
                },
            });
            const blockedDerivedSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla", {
                sourceStem: "ilwita",
                sourceEvidence: {
                    intransitiveTlaLexicalSource: true,
                    sourceState: "derived",
                    sourceCategory: "intransitive-tla-vnc",
                    sourceBaseStem: "ilwita",
                },
            });
            const blockedMissingStem = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla", {
                sourceEvidence: {
                    intransitiveTlaLexicalSource: true,
                    sourceCategory: "intransitive-tla-lexical-source",
                    sourceState: "absolutive",
                },
            });
            const finiteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                satisfiedRoute,
                { tense: "presente" }
            );
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedRoute: {
                    executableRuleId: unsatisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-intransitive-tla-lexical-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-intransitive-tla-lexical-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedRoute?.sourceRequirement?.validationStatus || "",
                },
                satisfiedRoute: {
                    executableRuleId: satisfiedRoute?.executableRuleId || "",
                    routeTargetGenerated: satisfiedRoute?.routeTargetGenerated === true,
                    targetVerbStem: satisfiedRoute?.targetVerbStem || "",
                    targetInput: satisfiedRoute?.targetInput || "",
                    finiteAvailable: satisfiedRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: satisfiedRoute?.finiteGenerationRequiresObjectPrefix === true,
                    sourceRequirement: satisfiedRoute?.sourceRequirement?.validationStatus || "",
                    requestVerb: finiteRequest?.posicionesFormula?.tronco || "",
                    requestObjectExpected: finiteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                directAndrewsContext: {
                    ok: directAndrewsContext?.ok === true,
                    surface: directAndrewsContext?.surface || "",
                    targetVerbStem: directAndrewsContext?.targetVerbStem || "",
                    targetInput: directAndrewsContext?.targetInput || "",
                    diagnosticCount: directAndrewsContext?.contractDiagnostics?.length || 0,
                    frameStatus: directAndrewsContext?.frames?.diagnosticFrame?.status || "",
                },
                blockedPossessive: {
                    ok: blockedPossessive?.ok === true,
                    surface: blockedPossessive?.surface || "",
                    diagnosticId: blockedPossessive?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedPossessive?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedPossessive?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedPossessive?.frames?.diagnosticFrame?.status || "",
                },
                blockedDerivedSource: {
                    ok: blockedDerivedSource?.ok === true,
                    surface: blockedDerivedSource?.surface || "",
                    diagnosticId: blockedDerivedSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedDerivedSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedDerivedSource?.frames?.diagnosticFrame?.status || "",
                },
                blockedMissingStem: {
                    ok: blockedMissingStem?.ok === true,
                    surface: blockedMissingStem?.surface || "",
                    diagnosticId: blockedMissingStem?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedMissingStem?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedMissingStem?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedMissingStem?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-55-2-intransitive-tla",
                contractId: "55.2-intransitive-tla",
                routeTemplateId: "intransitive-tla",
                range: "55.2 note",
                authority: ["Andrews 55.2 note"],
                input: {
                    unit: "nounstem",
                    state: "absolutive",
                    sourceCategory: "nounstem",
                    sourceEvidence: "andrews-very-limited-intransitive-tla-source-context-required",
                },
                operation: {
                    type: "very-limited-denominal-intransitive-tla-verbstem",
                    suffix: "ta",
                    classicalSuffix: "tla",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-55-2-intransitive-tla"],
            inventoryStructuralOnly: false,
            unsatisfiedRoute: {
                executableRuleId: "andrews-55-2-intransitive-tla",
                routeTargetGenerated: true,
                targetVerbStem: "pusukta",
                diagnosticId: "andrews-55.2-intransitive-tla-lexical-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            satisfiedRoute: {
                executableRuleId: "andrews-55-2-intransitive-tla",
                routeTargetGenerated: true,
                targetVerbStem: "ilwita",
                targetInput: "(ilwita)",
                finiteAvailable: true,
                objectPrefixRequired: false,
                sourceRequirement: "source-evidence-satisfied",
                requestVerb: "(ilwita)",
                requestObjectExpected: false,
            },
            success: {
                ok: true,
                surface: "ilwita",
                targetVerbStem: "ilwita",
                targetInput: "(ilwita)",
                targetValency: "intransitive",
                resultFrameSurface: "ilwita",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-lexical-source-evidence-required",
                failedLayer: "authority",
                contractLayer: "authorityFrame",
                frameStatus: "blocked",
            },
            directAndrewsContext: {
                ok: true,
                surface: "ilwita",
                targetVerbStem: "ilwita",
                targetInput: "(ilwita)",
                diagnosticCount: 0,
                frameStatus: "generated",
            },
            blockedPossessive: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-absolutive-nounstem-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
            blockedDerivedSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-nounstem-source-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
            blockedMissingStem: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-source-stem-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 55.2 note intransitive tla ti-a and ti-lia can generate from Andrews intransitive-tla context without a Nawat/Pipil evidence object",
        (() => {
            const tiARule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a");
            const tiLiaRule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-lia");
            const tiAInventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.2-intransitive-tla-ti-a-causative"
            ));
            const tiLiaInventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.2-intransitive-tla-ti-lia-applicative"
            ));
            const unsatisfiedTiARoute = findAndrewsContractRoute("55.2-intransitive-tla-ti-a-causative", "intransitive-tla-ti-a");
            const unsatisfiedTiLiaRoute = findAndrewsContractRoute("55.2-intransitive-tla-ti-lia-applicative", "intransitive-tla-ti-lia");
            const sourceEvidence = {
                tlaIntransitiveSource: true,
                sourceCategory: "intransitive-tla",
                sourceState: "derived",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukta",
            };
            const tiASuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a", {
                sourceEvidence,
            });
            const tiLiaSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-lia", {
                sourceEvidence,
            });
            const blockedNoEvidence = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const directTiASuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a", {
                sourceStem: "pusukta",
                sourceState: "derived",
                sourceCategory: "intransitive-tla-verbstem-source",
            });
            const directTiLiaSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-lia", {
                sourceStem: "pusukta",
                sourceState: "derived",
                sourceCategory: "intransitive-tla-verbstem-source",
            });
            const blockedOriginalSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a", {
                sourceEvidence: {
                    tlaIntransitiveSource: true,
                    sourceCategory: "intransitive-tla",
                    sourceState: "absolutive",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                },
            });
            const blockedWrongSourceCategory = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-a", {
                sourceEvidence: {
                    tlaIntransitiveSource: true,
                    sourceCategory: "causative-tla",
                    sourceState: "derived",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                },
            });
            const blockedWrongFinal = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-lia", {
                sourceEvidence: {
                    tlaIntransitiveSource: true,
                    sourceCategory: "intransitive-tla",
                    sourceState: "derived",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukwi",
                },
            });
            const blockedMissingStem = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-2-intransitive-tla-ti-lia", {
                sourceEvidence: {
                    tlaIntransitiveSource: true,
                    sourceCategory: "intransitive-tla",
                    sourceState: "derived",
                },
            });
            return {
                tiARuleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(tiARule),
                tiLiaRuleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(tiLiaRule),
                tiAInventoryExecutableRuleIds: tiAInventoryContract?.executableRuleIds || [],
                tiLiaInventoryExecutableRuleIds: tiLiaInventoryContract?.executableRuleIds || [],
                tiAInventoryStructuralOnly: tiAInventoryContract?.boundaries?.structuralInventoryOnly === true,
                tiLiaInventoryStructuralOnly: tiLiaInventoryContract?.boundaries?.structuralInventoryOnly === true,
                unsatisfiedTiARoute: {
                    executableRuleId: unsatisfiedTiARoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedTiARoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedTiARoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedTiARoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-intransitive-tla-ti-a-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedTiARoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-intransitive-tla-ti-a-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedTiARoute?.sourceRequirement?.validationStatus || "",
                },
                unsatisfiedTiLiaRoute: {
                    executableRuleId: unsatisfiedTiLiaRoute?.executableRuleId || "",
                    routeTargetGenerated: unsatisfiedTiLiaRoute?.routeTargetGenerated === true,
                    targetVerbStem: unsatisfiedTiLiaRoute?.targetVerbStem || "",
                    diagnosticId: unsatisfiedTiLiaRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-intransitive-tla-ti-lia-source-evidence-required")?.id || "",
                    diagnosticLayer: unsatisfiedTiLiaRoute?.routeDiagnostics?.find((diagnostic) => diagnostic?.id === "andrews-55.2-intransitive-tla-ti-lia-source-evidence-required")?.failedLayer || "",
                    requirementStatus: unsatisfiedTiLiaRoute?.sourceRequirement?.validationStatus || "",
                },
                tiASuccess: {
                    ok: tiASuccess?.ok === true,
                    surface: tiASuccess?.surface || "",
                    targetVerbStem: tiASuccess?.targetVerbStem || "",
                    targetInput: tiASuccess?.targetInput || "",
                    targetValency: tiASuccess?.targetValency || "",
                    resultFrameSurface: tiASuccess?.frames?.resultFrame?.surface || "",
                    generationAllowed: tiASuccess?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: tiASuccess?.contractDiagnostics?.length || 0,
                },
                tiLiaSuccess: {
                    ok: tiLiaSuccess?.ok === true,
                    surface: tiLiaSuccess?.surface || "",
                    targetVerbStem: tiLiaSuccess?.targetVerbStem || "",
                    targetInput: tiLiaSuccess?.targetInput || "",
                    targetValency: tiLiaSuccess?.targetValency || "",
                    resultFrameSurface: tiLiaSuccess?.frames?.resultFrame?.surface || "",
                    generationAllowed: tiLiaSuccess?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: tiLiaSuccess?.contractDiagnostics?.length || 0,
                },
                blockedNoEvidence: {
                    ok: blockedNoEvidence?.ok === true,
                    surface: blockedNoEvidence?.surface || "",
                    diagnosticId: blockedNoEvidence?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedNoEvidence?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedNoEvidence?.frames?.diagnosticFrame?.status || "",
                },
                directTiASuccess: {
                    ok: directTiASuccess?.ok === true,
                    surface: directTiASuccess?.surface || "",
                    targetVerbStem: directTiASuccess?.targetVerbStem || "",
                    targetInput: directTiASuccess?.targetInput || "",
                    diagnosticCount: directTiASuccess?.contractDiagnostics?.length || 0,
                    frameStatus: directTiASuccess?.frames?.diagnosticFrame?.status || "",
                },
                directTiLiaSuccess: {
                    ok: directTiLiaSuccess?.ok === true,
                    surface: directTiLiaSuccess?.surface || "",
                    targetVerbStem: directTiLiaSuccess?.targetVerbStem || "",
                    targetInput: directTiLiaSuccess?.targetInput || "",
                    diagnosticCount: directTiLiaSuccess?.contractDiagnostics?.length || 0,
                    frameStatus: directTiLiaSuccess?.frames?.diagnosticFrame?.status || "",
                },
                blockedOriginalSource: {
                    ok: blockedOriginalSource?.ok === true,
                    surface: blockedOriginalSource?.surface || "",
                    diagnosticId: blockedOriginalSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedOriginalSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedOriginalSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedOriginalSource?.frames?.diagnosticFrame?.status || "",
                },
                blockedWrongSourceCategory: {
                    ok: blockedWrongSourceCategory?.ok === true,
                    surface: blockedWrongSourceCategory?.surface || "",
                    diagnosticId: blockedWrongSourceCategory?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedWrongSourceCategory?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedWrongSourceCategory?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedWrongSourceCategory?.frames?.diagnosticFrame?.status || "",
                },
                blockedWrongFinal: {
                    ok: blockedWrongFinal?.ok === true,
                    surface: blockedWrongFinal?.surface || "",
                    diagnosticId: blockedWrongFinal?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedWrongFinal?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedWrongFinal?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedWrongFinal?.frames?.diagnosticFrame?.status || "",
                },
                blockedMissingStem: {
                    ok: blockedMissingStem?.ok === true,
                    surface: blockedMissingStem?.surface || "",
                    diagnosticId: blockedMissingStem?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedMissingStem?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedMissingStem?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedMissingStem?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            tiARuleSummary: {
                version: 1,
                id: "andrews-55-2-intransitive-tla-ti-a",
                contractId: "55.2-intransitive-tla-ti-a-causative",
                routeTemplateId: "intransitive-tla-ti-a",
                range: "55.2 note",
                authority: ["Andrews 55.2 note"],
                input: {
                    unit: "vnc-stem",
                    state: "derived",
                    sourceCategory: "intransitive-tla-verbstem-source",
                    sourceEvidence: "generated-intransitive-tla-verbstem-source-required",
                },
                operation: {
                    type: "causative-from-intransitive-tla-verbstem",
                    sourceSuffix: "ta",
                    sourceClassicalSuffix: "tla",
                    replacementBeforeSuffix: "ti",
                    suffix: "a",
                    classicalSuffix: "ti-a",
                    outputValency: "causative",
                },
                output: {
                    unit: "vnc",
                    valency: "causative",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            tiLiaRuleSummary: {
                version: 1,
                id: "andrews-55-2-intransitive-tla-ti-lia",
                contractId: "55.2-intransitive-tla-ti-lia-applicative",
                routeTemplateId: "intransitive-tla-ti-lia",
                range: "55.2 note",
                authority: ["Andrews 55.2 note"],
                input: {
                    unit: "vnc-stem",
                    state: "derived",
                    sourceCategory: "intransitive-tla-verbstem-source",
                    sourceEvidence: "generated-intransitive-tla-verbstem-source-required",
                },
                operation: {
                    type: "applicative-from-intransitive-tla-causative-verbstem",
                    sourceSuffix: "ta",
                    sourceClassicalSuffix: "tla",
                    replacementBeforeSuffix: "ti",
                    suffix: "lia",
                    classicalSuffix: "ti-lia",
                    outputValency: "applicative",
                },
                output: {
                    unit: "vnc",
                    valency: "applicative",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            tiAInventoryExecutableRuleIds: ["andrews-55-2-intransitive-tla-ti-a"],
            tiLiaInventoryExecutableRuleIds: ["andrews-55-2-intransitive-tla-ti-lia"],
            tiAInventoryStructuralOnly: false,
            tiLiaInventoryStructuralOnly: false,
            unsatisfiedTiARoute: {
                executableRuleId: "andrews-55-2-intransitive-tla-ti-a",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktia",
                diagnosticId: "andrews-55.2-intransitive-tla-ti-a-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            unsatisfiedTiLiaRoute: {
                executableRuleId: "andrews-55-2-intransitive-tla-ti-lia",
                routeTargetGenerated: true,
                targetVerbStem: "pusuktilia",
                diagnosticId: "andrews-55.2-intransitive-tla-ti-lia-source-evidence-required",
                diagnosticLayer: "authority",
                requirementStatus: "source-evidence-required",
            },
            tiASuccess: {
                ok: true,
                surface: "pusuktia",
                targetVerbStem: "pusuktia",
                targetInput: "(pusukti)-(a)",
                targetValency: "causative",
                resultFrameSurface: "pusuktia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            tiLiaSuccess: {
                ok: true,
                surface: "pusuktilia",
                targetVerbStem: "pusuktilia",
                targetInput: "(pusukti)-(lia)",
                targetValency: "applicative",
                resultFrameSurface: "pusuktilia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedNoEvidence: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-ti-a-source-evidence-required",
                failedLayer: "authority",
                contractLayer: "authorityFrame",
                frameStatus: "blocked",
            },
            directTiASuccess: {
                ok: true,
                surface: "pusuktia",
                targetVerbStem: "pusuktia",
                targetInput: "(pusukti)-(a)",
                diagnosticCount: 0,
                frameStatus: "generated",
            },
            directTiLiaSuccess: {
                ok: true,
                surface: "pusuktilia",
                targetVerbStem: "pusuktilia",
                targetInput: "(pusukti)-(lia)",
                diagnosticCount: 0,
                frameStatus: "generated",
            },
            blockedOriginalSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-ti-a-generated-tla-source-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
            blockedWrongSourceCategory: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-ti-a-intransitive-tla-source-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
            blockedWrongFinal: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-ti-lia-source-final-ta-required",
                failedLayer: "morph-boundary",
                contractLayer: "morphBoundaryFrame",
                frameStatus: "blocked",
            },
            blockedMissingStem: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.2-intransitive-tla-ti-lia-source-verbstem-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 55.3 o-a and huia are executable nounstem route contracts with guarded source layers",
        (() => {
            const oARule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a");
            const huiaRule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-huia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.3-intransitive-o-a-applicative-huia"
            ));
            const oARoute = findAndrewsContractRoute("55.3-intransitive-o-a-applicative-huia", "o-a");
            const huiaRoute = findAndrewsContractRoute("55.3-intransitive-o-a-applicative-huia", "huia");
            const oASuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const huiaSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-huia", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const huiaBlockedObjectRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiaRoute,
                { tense: "presente" }
            );
            const huiaFiniteRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiaRoute,
                { tense: "presente", objectPrefix: "ta" }
            );
            const blockedMissingStem = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a", {
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const blockedPossessive = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-huia", {
                sourceStem: "nukal",
                sourceState: "possessive",
                sourceCategory: "possessive-state-nnc-predicate",
            });
            const blockedGeneratedSource = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a", {
                sourceStem: "pusukta",
                sourceState: "derived",
                sourceCategory: "causative-tla",
            });
            return {
                oARuleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(oARule),
                huiaRuleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(huiaRule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                oARoute: {
                    executableRuleId: oARoute?.executableRuleId || "",
                    routeTargetGenerated: oARoute?.routeTargetGenerated === true,
                    targetVerbStem: oARoute?.targetVerbStem || "",
                    targetInput: oARoute?.targetInput || "",
                    targetStemClass: oARoute?.targetStemClass || "",
                    finiteAvailable: oARoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: oARoute?.finiteGenerationRequiresObjectPrefix === true,
                    diagnosticCount: oARoute?.routeDiagnosticCount || 0,
                },
                huiaRoute: {
                    executableRuleId: huiaRoute?.executableRuleId || "",
                    routeTargetGenerated: huiaRoute?.routeTargetGenerated === true,
                    targetVerbStem: huiaRoute?.targetVerbStem || "",
                    targetInput: huiaRoute?.targetInput || "",
                    targetStemClass: huiaRoute?.targetStemClass || "",
                    finiteAvailable: huiaRoute?.finiteGenerationContractAvailable === true,
                    objectPrefixRequired: huiaRoute?.finiteGenerationRequiresObjectPrefix === true,
                    diagnosticCount: huiaRoute?.routeDiagnosticCount || 0,
                    blockedObjectRequest: huiaBlockedObjectRequest,
                    requestVerb: huiaFiniteRequest?.posicionesFormula?.tronco || "",
                    requestObjectPrefix: huiaFiniteRequest?.posicionesFormula?.obj1 || "",
                },
                oASuccess: {
                    ok: oASuccess?.ok === true,
                    surface: oASuccess?.surface || "",
                    targetVerbStem: oASuccess?.targetVerbStem || "",
                    targetInput: oASuccess?.targetInput || "",
                    targetValency: oASuccess?.targetValency || "",
                    targetStemClass: oASuccess?.targetStemClass || "",
                    resultFrameSurface: oASuccess?.frames?.resultFrame?.surface || "",
                    generationAllowed: oASuccess?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: oASuccess?.contractDiagnostics?.length || 0,
                },
                huiaSuccess: {
                    ok: huiaSuccess?.ok === true,
                    surface: huiaSuccess?.surface || "",
                    targetVerbStem: huiaSuccess?.targetVerbStem || "",
                    targetInput: huiaSuccess?.targetInput || "",
                    targetValency: huiaSuccess?.targetValency || "",
                    targetStemClass: huiaSuccess?.targetStemClass || "",
                    resultFrameSurface: huiaSuccess?.frames?.resultFrame?.surface || "",
                    generationAllowed: huiaSuccess?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: huiaSuccess?.contractDiagnostics?.length || 0,
                },
                blockedMissingStem: {
                    ok: blockedMissingStem?.ok === true,
                    surface: blockedMissingStem?.surface || "",
                    diagnosticId: blockedMissingStem?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedMissingStem?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedMissingStem?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedMissingStem?.frames?.diagnosticFrame?.status || "",
                },
                blockedPossessive: {
                    ok: blockedPossessive?.ok === true,
                    surface: blockedPossessive?.surface || "",
                    diagnosticId: blockedPossessive?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedPossessive?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedPossessive?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedPossessive?.frames?.diagnosticFrame?.status || "",
                },
                blockedGeneratedSource: {
                    ok: blockedGeneratedSource?.ok === true,
                    surface: blockedGeneratedSource?.surface || "",
                    diagnosticId: blockedGeneratedSource?.contractDiagnostics?.[0]?.id || "",
                    failedLayer: blockedGeneratedSource?.contractDiagnostics?.[0]?.failedLayer || "",
                    contractLayer: blockedGeneratedSource?.contractDiagnostics?.[0]?.contractLayer || "",
                    frameStatus: blockedGeneratedSource?.frames?.diagnosticFrame?.status || "",
                },
            };
        })(),
        {
            oARuleSummary: {
                version: 1,
                id: "andrews-55-3-o-a",
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "o-a",
                range: "55.3",
                authority: ["Andrews 55.3"],
                input: {
                    unit: "nounstem",
                    state: "absolutive",
                    sourceCategory: "nounstem",
                    sourceEvidence: "nawat-source-nounstem-required",
                },
                operation: {
                    type: "denominal-intransitive-o-a-verbstem",
                    suffix: "ua",
                    classicalSuffix: "o-a",
                    outputValency: "intransitive",
                },
                output: {
                    unit: "vnc",
                    valency: "intransitive",
                    stemClass: ["C"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            huiaRuleSummary: {
                version: 1,
                id: "andrews-55-3-huia",
                contractId: "55.3-intransitive-o-a-applicative-huia",
                routeTemplateId: "huia",
                range: "55.3",
                authority: ["Andrews 55.3"],
                input: {
                    unit: "nounstem",
                    state: "absolutive",
                    sourceCategory: "nounstem",
                    sourceEvidence: "nawat-source-nounstem-required",
                },
                operation: {
                    type: "denominal-single-object-applicative-huia-verbstem",
                    suffix: "wia",
                    classicalSuffix: "huia",
                    outputValency: "applicative",
                },
                output: {
                    unit: "vnc",
                    valency: "applicative",
                    stemClass: ["C"],
                    surfaceAuthority: "nawat-orthography",
                },
            },
            inventoryExecutableRuleIds: ["andrews-55-3-o-a", "andrews-55-3-huia"],
            inventoryStructuralOnly: false,
            oARoute: {
                executableRuleId: "andrews-55-3-o-a",
                routeTargetGenerated: true,
                targetVerbStem: "pusukua",
                targetInput: "(pusukua)",
                targetStemClass: "C",
                finiteAvailable: true,
                objectPrefixRequired: false,
                diagnosticCount: 0,
            },
            huiaRoute: {
                executableRuleId: "andrews-55-3-huia",
                routeTargetGenerated: true,
                targetVerbStem: "pusukwia",
                targetInput: "(pusuk)-(wia)",
                targetStemClass: "C",
                finiteAvailable: true,
                objectPrefixRequired: true,
                diagnosticCount: 0,
                blockedObjectRequest: null,
                requestVerb: "(pusuk)-(wia)",
                requestObjectPrefix: "ta",
            },
            oASuccess: {
                ok: true,
                surface: "pusukua",
                targetVerbStem: "pusukua",
                targetInput: "(pusukua)",
                targetValency: "intransitive",
                targetStemClass: "C",
                resultFrameSurface: "pusukua",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            huiaSuccess: {
                ok: true,
                surface: "pusukwia",
                targetVerbStem: "pusukwia",
                targetInput: "(pusuk)-(wia)",
                targetValency: "applicative",
                targetStemClass: "C",
                resultFrameSurface: "pusukwia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blockedMissingStem: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.3-o-a-source-stem-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
            blockedPossessive: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.3-huia-absolutive-nounstem-required",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
                frameStatus: "blocked",
            },
            blockedGeneratedSource: {
                ok: false,
                surface: "",
                diagnosticId: "andrews-55.3-o-a-nounstem-source-required",
                failedLayer: "stem",
                contractLayer: "stemFrame",
                frameStatus: "blocked",
            },
        }
    );
    s.eq(
        "Andrews 55.3 note 2 o-a i-l-huia/a-l-huia continuations use Andrews source context contracts",
        (() => {
            const iRule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-i-l-huia");
            const aRule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-a-l-huia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.3-o-a-il-huia-al-huia-applicative-note"
            ));
            const iBaseRoute = findAndrewsContractRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-i-l-huia");
            const aBaseRoute = findAndrewsContractRoute("55.3-o-a-il-huia-al-huia-applicative-note", "o-a-a-l-huia");
            const sourceEvidence = {
                intransitiveOaSource: true,
                sourceCategory: "intransitive-o-a",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukua",
            };
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "pusuk",
                sourceEvidence,
            });
            const iSatisfiedRoute = satisfiedPreview.routes?.find((route) => (
                route.contractId === "55.3-o-a-il-huia-al-huia-applicative-note"
                && route.routeTemplateId === "o-a-i-l-huia"
            ));
            const aSatisfiedRoute = satisfiedPreview.routes?.find((route) => (
                route.contractId === "55.3-o-a-il-huia-al-huia-applicative-note"
                && route.routeTemplateId === "o-a-a-l-huia"
            ));
            const iSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-i-l-huia", {
                sourceState: "derived",
                sourceEvidence,
            });
            const aSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-a-l-huia", {
                sourceState: "derived",
                sourceEvidence,
            });
            const summarizeRoute = (route) => ({
                executableRuleId: route?.executableRuleId || "",
                targetVerbStem: route?.targetVerbStem || "",
                targetInputValue: route?.targetInputValue || "",
                routeTargetGenerated: route?.routeTargetGenerated === true,
                finiteAvailable: route?.finiteGenerationContractAvailable === true,
                requirementStatus: route?.sourceRequirement?.validationStatus || "",
                diagnosticIds: Array.isArray(route?.routeDiagnostics)
                    ? route.routeDiagnostics.map((diagnostic) => diagnostic.id)
                    : [],
            });
            const summarizeSuccess = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                targetVerbStem: result?.targetVerbStem || "",
                targetInput: result?.targetInput || "",
                targetValency: result?.targetValency || "",
                resultFrameSurface: result?.frames?.resultFrame?.surface || "",
                generationAllowed: result?.frames?.routeContract?.generationAllowed === true,
                diagnosticCount: result?.contractDiagnostics?.length || 0,
            });
            const summarizeBlocked = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                diagnosticId: result?.contractDiagnostics?.[0]?.id || "",
                failedLayer: result?.contractDiagnostics?.[0]?.failedLayer || "",
                contractLayer: result?.contractDiagnostics?.[0]?.contractLayer || "",
                frameStatus: result?.frames?.diagnosticFrame?.status || "",
            });
            return {
                ruleIds: [iRule?.id || "", aRule?.id || ""],
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                baseRoutes: [summarizeRoute(iBaseRoute), summarizeRoute(aBaseRoute)],
                satisfiedRoutes: [
                    {
                        ...summarizeRoute(iSatisfiedRoute),
                        requestNoObject: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                            iSatisfiedRoute,
                            { tense: "presente" }
                        ),
                        requestObjectVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                            iSatisfiedRoute,
                            { tense: "presente", objectPrefix: "ta" }
                        )?.posicionesFormula?.tronco || "",
                    },
                    {
                        ...summarizeRoute(aSatisfiedRoute),
                        requestNoObject: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                            aSatisfiedRoute,
                            { tense: "presente" }
                        ),
                        requestObjectVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                            aSatisfiedRoute,
                            { tense: "presente", objectPrefix: "ta" }
                        )?.posicionesFormula?.tronco || "",
                    },
                ],
                iSuccess: summarizeSuccess(iSuccess),
                aSuccess: summarizeSuccess(aSuccess),
                blocked: {
                    noEvidence: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-i-l-huia", {
                        sourceStem: "pusuk",
                        sourceState: "derived",
                        sourceCategory: "intransitive-o-a",
                    })),
                    originalSource: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-i-l-huia", {
                        sourceState: "absolutive",
                        sourceEvidence,
                    })),
                    wrongCategory: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-i-l-huia", {
                        sourceState: "derived",
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceCategory: "causative-tla",
                        },
                    })),
                    wrongFinal: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-a-l-huia", {
                        sourceState: "derived",
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceVerbStem: "pusukta",
                        },
                    })),
                    missingStem: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-3-o-a-a-l-huia", {
                        sourceState: "derived",
                        sourceEvidence: {
                            intransitiveOaSource: true,
                            sourceCategory: "intransitive-o-a",
                            sourceBaseStem: "pusuk",
                        },
                    })),
                },
            };
        })(),
        {
            ruleIds: ["andrews-55-3-o-a-i-l-huia", "andrews-55-3-o-a-a-l-huia"],
            inventoryExecutableRuleIds: ["andrews-55-3-o-a-i-l-huia", "andrews-55-3-o-a-a-l-huia"],
            inventoryStructuralOnly: false,
            baseRoutes: [
                {
                    executableRuleId: "andrews-55-3-o-a-i-l-huia",
                    targetVerbStem: "pusukilwia",
                    targetInputValue: "(pusuk)-(ilwia)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    requirementStatus: "source-evidence-required",
                    diagnosticIds: [
                        "andrews-denominal-route-source-evidence-required",
                        "andrews-55.3-o-a-i-l-huia-source-evidence-required",
                    ],
                },
                {
                    executableRuleId: "andrews-55-3-o-a-a-l-huia",
                    targetVerbStem: "pusukalwia",
                    targetInputValue: "(pusuk)-(alwia)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    requirementStatus: "source-evidence-required",
                    diagnosticIds: [
                        "andrews-denominal-route-source-evidence-required",
                        "andrews-55.3-o-a-a-l-huia-source-evidence-required",
                    ],
                },
            ],
            satisfiedRoutes: [
                {
                    executableRuleId: "andrews-55-3-o-a-i-l-huia",
                    targetVerbStem: "pusukilwia",
                    targetInputValue: "(pusuk)-(ilwia)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    requirementStatus: "source-evidence-satisfied",
                    diagnosticIds: [],
                    requestNoObject: null,
                    requestObjectVerb: "(pusuk)-(ilwia)",
                },
                {
                    executableRuleId: "andrews-55-3-o-a-a-l-huia",
                    targetVerbStem: "pusukalwia",
                    targetInputValue: "(pusuk)-(alwia)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    requirementStatus: "source-evidence-satisfied",
                    diagnosticIds: [],
                    requestNoObject: null,
                    requestObjectVerb: "(pusuk)-(alwia)",
                },
            ],
            iSuccess: {
                ok: true,
                surface: "pusukilwia",
                targetVerbStem: "pusukilwia",
                targetInput: "(pusuk)-(ilwia)",
                targetValency: "applicative",
                resultFrameSurface: "pusukilwia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            aSuccess: {
                ok: true,
                surface: "pusukalwia",
                targetVerbStem: "pusukalwia",
                targetInput: "(pusuk)-(alwia)",
                targetValency: "applicative",
                resultFrameSurface: "pusukalwia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blocked: {
                noEvidence: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.3-o-a-i-l-huia-source-verbstem-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
                originalSource: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.3-o-a-i-l-huia-generated-o-a-source-required",
                    failedLayer: "agreement",
                    contractLayer: "participantFrame",
                    frameStatus: "blocked",
                },
                wrongCategory: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.3-o-a-i-l-huia-intransitive-o-a-source-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
                wrongFinal: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.3-o-a-a-l-huia-source-final-ua-required",
                    failedLayer: "morph-boundary",
                    contractLayer: "morphBoundaryFrame",
                    frameStatus: "blocked",
                },
                missingStem: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.3-o-a-a-l-huia-source-verbstem-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
            },
        }
    );
    s.eq(
        "Andrews 55.4 adverbial huia can generate from Andrews adverbial source context without a Nawat/Pipil evidence object",
        (() => {
            const rule = ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia");
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.4-adverbial-huia"
            ));
            const basePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "achpa",
                contractId: "55.4-adverbial-huia",
            });
            const baseRoute = basePreview.routes?.[0] || null;
            const sourceEvidence = {
                adverbialSource: true,
                sourceCategory: "adverbial-nounstem",
                sourceState: "adverbialized",
                sourceBaseStem: "achpa",
            };
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "achpa",
                contractId: "55.4-adverbial-huia",
                sourceEvidence,
            });
            const satisfiedRoute = satisfiedPreview.routes?.[0] || null;
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia", {
                sourceEvidence,
            });
            const summarizeRoute = (route) => ({
                executableRuleId: route?.executableRuleId || "",
                targetVerbStem: route?.targetVerbStem || "",
                targetInputValue: route?.targetInputValue || "",
                routeTargetGenerated: route?.routeTargetGenerated === true,
                finiteAvailable: route?.finiteGenerationContractAvailable === true,
                requirementStatus: route?.sourceRequirement?.validationStatus || "",
                diagnosticIds: Array.isArray(route?.routeDiagnostics)
                    ? route.routeDiagnostics.map((diagnostic) => diagnostic.id)
                    : [],
            });
            const summarizeBlocked = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                diagnosticId: result?.contractDiagnostics?.[0]?.id || "",
                failedLayer: result?.contractDiagnostics?.[0]?.failedLayer || "",
                contractLayer: result?.contractDiagnostics?.[0]?.contractLayer || "",
                frameStatus: result?.frames?.diagnosticFrame?.status || "",
            });
            return {
                ruleSummary: ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(rule),
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                baseRoute: summarizeRoute(baseRoute),
                satisfiedRoute: {
                    ...summarizeRoute(satisfiedRoute),
                    requestNoObject: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        satisfiedRoute,
                        { tense: "presente" }
                    ),
                    requestObjectVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        satisfiedRoute,
                        { tense: "presente", objectPrefix: "ta" }
                    )?.posicionesFormula?.tronco || "",
                },
                success: {
                    ok: success?.ok === true,
                    surface: success?.surface || "",
                    targetVerbStem: success?.targetVerbStem || "",
                    targetInput: success?.targetInput || "",
                    targetValency: success?.targetValency || "",
                    resultFrameSurface: success?.frames?.resultFrame?.surface || "",
                    generationAllowed: success?.frames?.routeContract?.generationAllowed === true,
                    diagnosticCount: success?.contractDiagnostics?.length || 0,
                },
                blocked: {
                    noEvidence: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia", {
                        sourceStem: "achpa",
                        sourceState: "adverbialized",
                        sourceCategory: "adverbial-nounstem",
                    })),
                    wrongState: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceState: "absolutive",
                        },
                    })),
                    possessive: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceState: "possessive",
                            sourceCategory: "possessive-state-nnc-predicate",
                        },
                    })),
                    wrongCategory: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceCategory: "relational-compound-source",
                        },
                    })),
                    missingStem: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-4-adverbial-huia", {
                        sourceEvidence: {
                            adverbialSource: true,
                            sourceCategory: "adverbial-nounstem",
                            sourceState: "adverbialized",
                        },
                    })),
                },
            };
        })(),
        {
            ruleSummary: {
                version: 1,
                id: "andrews-55-4-adverbial-huia",
                contractId: "55.4-adverbial-huia",
                routeTemplateId: "adverbial-huia",
                range: "55.4",
                authority: ["Andrews 55.4", "Andrews Lesson 44"],
                input: {
                    unit: "nounstem",
                    state: "adverbialized",
                    sourceCategory: "adverbial-nounstem",
                    sourceEvidence: "andrews-adverbial-nounstem-context-required",
                },
                operation: {
                    type: "denominal-single-object-applicative-huia-from-adverbial-nounstem",
                    suffix: "wia",
                    classicalSuffix: "huia",
                    outputValency: "applicative",
                },
                output: {
                    unit: "vnc",
                    valency: "applicative",
                    stemClass: [],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            },
            inventoryExecutableRuleIds: ["andrews-55-4-adverbial-huia"],
            inventoryStructuralOnly: false,
            baseRoute: {
                executableRuleId: "andrews-55-4-adverbial-huia",
                targetVerbStem: "achpawia",
                targetInputValue: "(achpa)-(wia)",
                routeTargetGenerated: true,
                finiteAvailable: true,
                requirementStatus: "source-evidence-required",
                diagnosticIds: [
                    "andrews-denominal-route-source-evidence-required",
                    "andrews-55.4-huia-adverbial-source-evidence-required",
                ],
            },
            satisfiedRoute: {
                executableRuleId: "andrews-55-4-adverbial-huia",
                targetVerbStem: "achpawia",
                targetInputValue: "(achpa)-(wia)",
                routeTargetGenerated: true,
                finiteAvailable: true,
                requirementStatus: "source-evidence-satisfied",
                diagnosticIds: [],
                requestNoObject: null,
                requestObjectVerb: "(achpa)-(wia)",
            },
            success: {
                ok: true,
                surface: "achpawia",
                targetVerbStem: "achpawia",
                targetInput: "(achpa)-(wia)",
                targetValency: "applicative",
                resultFrameSurface: "achpawia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blocked: {
                noEvidence: {
                    ok: true,
                    surface: "achpawia",
                    diagnosticId: "",
                    failedLayer: "",
                    contractLayer: "",
                    frameStatus: "generated",
                },
                wrongState: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.4-huia-adverbial-state-required",
                    failedLayer: "agreement",
                    contractLayer: "participantFrame",
                    frameStatus: "blocked",
                },
                possessive: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.4-huia-adverbial-source-required",
                    failedLayer: "agreement",
                    contractLayer: "participantFrame",
                    frameStatus: "blocked",
                },
                wrongCategory: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.4-huia-adverbial-source-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
                missingStem: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.4-huia-source-stem-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
            },
        }
    );
    s.eq(
        "Andrews 55.5 relational o-a and huia can generate from Andrews relational source context without a Nawat/Pipil evidence object",
        (() => {
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.5-relational-compound-o-a-huia"
            ));
            const basePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "kalpan",
                contractId: "55.5-relational-compound-o-a-huia",
            });
            const sourceEvidence = {
                relationalCompoundSource: true,
                sourceCategory: "compound-relational-nounstem",
                sourceState: "relational",
                sourceBaseStem: "kalpan",
            };
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "kalpan",
                contractId: "55.5-relational-compound-o-a-huia",
                sourceEvidence,
            });
            const relationalOaSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-o-a", {
                sourceEvidence,
            });
            const relationalHuiaSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-huia", {
                sourceEvidence,
            });
            const summarizeRoute = (route) => ({
                executableRuleId: route?.executableRuleId || "",
                targetVerbStem: route?.targetVerbStem || "",
                targetInputValue: route?.targetInputValue || "",
                routeTargetGenerated: route?.routeTargetGenerated === true,
                finiteAvailable: route?.finiteGenerationContractAvailable === true,
                objectPrefixRequired: route?.finiteGenerationRequiresObjectPrefix === true,
                requirementStatus: route?.sourceRequirement?.validationStatus || "",
                diagnosticIds: Array.isArray(route?.routeDiagnostics)
                    ? route.routeDiagnostics.map((diagnostic) => diagnostic.id)
                    : [],
            });
            const summarizeSuccess = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                targetVerbStem: result?.targetVerbStem || "",
                targetInput: result?.targetInput || "",
                targetValency: result?.targetValency || "",
                resultFrameSurface: result?.frames?.resultFrame?.surface || "",
                generationAllowed: result?.frames?.routeContract?.generationAllowed === true,
                diagnosticCount: result?.contractDiagnostics?.length || 0,
            });
            const summarizeBlocked = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                diagnosticId: result?.contractDiagnostics?.[0]?.id || "",
                failedLayer: result?.contractDiagnostics?.[0]?.failedLayer || "",
                contractLayer: result?.contractDiagnostics?.[0]?.contractLayer || "",
                frameStatus: result?.frames?.diagnosticFrame?.status || "",
            });
            return {
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                ruleSummaries: [
                    ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(
                        ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-o-a")
                    ),
                    ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(
                        ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-huia")
                    ),
                ].map((rule) => ({
                    id: rule?.id || "",
                    operationType: rule?.operation?.type || "",
                    suffix: rule?.operation?.suffix || "",
                    outputValency: rule?.output?.valency || "",
                    surfaceAuthority: rule?.output?.surfaceAuthority || "",
                })),
                baseRoutes: (basePreview.routes || []).map(summarizeRoute),
                satisfiedRoutes: (satisfiedPreview.routes || []).map((route) => ({
                    ...summarizeRoute(route),
                    requestNoObject: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        route,
                        { tense: "presente" }
                    ),
                    requestObjectVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        route,
                        { tense: "presente", objectPrefix: "ta" }
                    )?.posicionesFormula?.tronco || "",
                })),
                successes: [
                    summarizeSuccess(relationalOaSuccess),
                    summarizeSuccess(relationalHuiaSuccess),
                ],
                blocked: {
                    noEvidence: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-o-a", {
                        sourceStem: "kalpan",
                        sourceState: "relational",
                        sourceCategory: "compound-relational-nounstem",
                    })),
                    wrongState: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-o-a", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceState: "absolutive",
                        },
                    })),
                    wrongCategory: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-huia", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceCategory: "adverbial-nounstem",
                        },
                    })),
                    missingStem: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-5-relational-huia", {
                        sourceEvidence: {
                            relationalCompoundSource: true,
                            sourceCategory: "compound-relational-nounstem",
                            sourceState: "relational",
                        },
                    })),
                },
            };
        })(),
        {
            inventoryExecutableRuleIds: ["andrews-55-5-relational-o-a", "andrews-55-5-relational-huia"],
            inventoryStructuralOnly: false,
            ruleSummaries: [
                {
                    id: "andrews-55-5-relational-o-a",
                    operationType: "denominal-o-a-from-relational-compound-or-predicate",
                    suffix: "ua",
                    outputValency: "usually-transitive",
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
                {
                    id: "andrews-55-5-relational-huia",
                    operationType: "denominal-single-object-applicative-huia-from-relational-compound-or-predicate",
                    suffix: "wia",
                    outputValency: "applicative",
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            ],
            baseRoutes: [
                {
                    executableRuleId: "andrews-55-5-relational-o-a",
                    targetVerbStem: "kalpanua",
                    targetInputValue: "(kalpan)-(ua)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    objectPrefixRequired: true,
                    requirementStatus: "source-evidence-required",
                    diagnosticIds: [
                        "andrews-denominal-route-source-evidence-required",
                        "andrews-55.5-o-a-relational-source-evidence-required",
                    ],
                },
                {
                    executableRuleId: "andrews-55-5-relational-huia",
                    targetVerbStem: "kalpanwia",
                    targetInputValue: "(kalpan)-(wia)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    objectPrefixRequired: true,
                    requirementStatus: "source-evidence-required",
                    diagnosticIds: [
                        "andrews-denominal-route-source-evidence-required",
                        "andrews-55.5-huia-relational-source-evidence-required",
                    ],
                },
            ],
            satisfiedRoutes: [
                {
                    executableRuleId: "andrews-55-5-relational-o-a",
                    targetVerbStem: "kalpanua",
                    targetInputValue: "(kalpan)-(ua)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    objectPrefixRequired: true,
                    requirementStatus: "source-evidence-satisfied",
                    diagnosticIds: [],
                    requestNoObject: null,
                    requestObjectVerb: "(kalpan)-(ua)",
                },
                {
                    executableRuleId: "andrews-55-5-relational-huia",
                    targetVerbStem: "kalpanwia",
                    targetInputValue: "(kalpan)-(wia)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    objectPrefixRequired: true,
                    requirementStatus: "source-evidence-satisfied",
                    diagnosticIds: [],
                    requestNoObject: null,
                    requestObjectVerb: "(kalpan)-(wia)",
                },
            ],
            successes: [
                {
                    ok: true,
                    surface: "kalpanua",
                    targetVerbStem: "kalpanua",
                    targetInput: "(kalpan)-(ua)",
                    targetValency: "usually-transitive",
                    resultFrameSurface: "kalpanua",
                    generationAllowed: true,
                    diagnosticCount: 0,
                },
                {
                    ok: true,
                    surface: "kalpanwia",
                    targetVerbStem: "kalpanwia",
                    targetInput: "(kalpan)-(wia)",
                    targetValency: "applicative",
                    resultFrameSurface: "kalpanwia",
                    generationAllowed: true,
                    diagnosticCount: 0,
                },
            ],
            blocked: {
                noEvidence: {
                    ok: true,
                    surface: "kalpanua",
                    diagnosticId: "",
                    failedLayer: "",
                    contractLayer: "",
                    frameStatus: "generated",
                },
                wrongState: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.5-o-a-relational-state-required",
                    failedLayer: "agreement",
                    contractLayer: "participantFrame",
                    frameStatus: "blocked",
                },
                wrongCategory: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.5-huia-relational-source-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
                missingStem: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.5-huia-source-stem-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
            },
        }
    );
    s.eq(
        "Andrews 55.6 o-a can generate from Andrews i-hui/a-hui context without a Nawat/Pipil evidence object",
        (() => {
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.6-i-hui-a-hui-to-o-a"
            ));
            const basePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "pusuk",
                contractId: "55.6-i-hui-a-hui-to-o-a",
            });
            const sourceEvidence = {
                iHuiOrAHuiSource: true,
                sourceCategory: "i-hui-a-hui-source",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukiwi",
            };
            const satisfiedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "pusuk",
                contractId: "55.6-i-hui-a-hui-to-o-a",
                sourceEvidence,
            });
            const iHuiSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-i-hui", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const aHuiSuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-a-hui", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
                sourceCategory: "nounstem",
            });
            const oASuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a", {
                sourceEvidence,
            });
            const directOASuccess = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a", {
                sourceStem: "pusukiwi",
                sourceState: "derived",
                sourceCategory: "i-hui-a-hui-source",
            });
            const summarizeRoute = (route) => ({
                routeTemplateId: route?.routeTemplateId || "",
                executableRuleId: route?.executableRuleId || "",
                targetVerbStem: route?.targetVerbStem || "",
                targetInputValue: route?.targetInputValue || "",
                routeTargetGenerated: route?.routeTargetGenerated === true,
                finiteAvailable: route?.finiteGenerationContractAvailable === true,
                objectPrefixRequired: route?.finiteGenerationRequiresObjectPrefix === true,
                requirementStatus: route?.sourceRequirement?.validationStatus || "",
                diagnosticIds: Array.isArray(route?.routeDiagnostics)
                    ? route.routeDiagnostics.map((diagnostic) => diagnostic.id)
                    : [],
            });
            const summarizeSuccess = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                targetVerbStem: result?.targetVerbStem || "",
                targetInput: result?.targetInput || "",
                targetValency: result?.targetValency || "",
                targetStemClass: result?.targetStemClass || "",
                resultFrameSurface: result?.frames?.resultFrame?.surface || "",
                generationAllowed: result?.frames?.routeContract?.generationAllowed === true,
                diagnosticCount: result?.contractDiagnostics?.length || 0,
            });
            const summarizeBlocked = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                diagnosticId: result?.contractDiagnostics?.[0]?.id || "",
                failedLayer: result?.contractDiagnostics?.[0]?.failedLayer || "",
                contractLayer: result?.contractDiagnostics?.[0]?.contractLayer || "",
                frameStatus: result?.frames?.diagnosticFrame?.status || "",
            });
            const satisfiedOaRoute = (satisfiedPreview.routes || []).find((route) => route.routeTemplateId === "o-a");
            return {
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                ruleSummaries: [
                    ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(
                        ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-i-hui")
                    ),
                    ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(
                        ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-a-hui")
                    ),
                    ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(
                        ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a")
                    ),
                ].map((rule) => ({
                    id: rule?.id || "",
                    operationType: rule?.operation?.type || "",
                    suffix: rule?.operation?.suffix || "",
                    outputValency: rule?.output?.valency || "",
                    stemClass: rule?.output?.stemClass || [],
                    surfaceAuthority: rule?.output?.surfaceAuthority || "",
                })),
                baseRoutes: (basePreview.routes || []).map(summarizeRoute),
                satisfiedOaRoute: {
                    ...summarizeRoute(satisfiedOaRoute),
                    requestNoObject: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        satisfiedOaRoute,
                        { tense: "presente" }
                    ),
                    requestObjectVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        satisfiedOaRoute,
                        { tense: "presente", objectPrefix: "ta" }
                    )?.posicionesFormula?.tronco || "",
                },
                successes: [
                    summarizeSuccess(iHuiSuccess),
                    summarizeSuccess(aHuiSuccess),
                    summarizeSuccess(oASuccess),
                    summarizeSuccess(directOASuccess),
                ],
                blocked: {
                    noEvidence: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a", {
                        sourceStem: "pusuk",
                        sourceState: "absolutive",
                        sourceCategory: "nounstem",
                    })),
                    originalSource: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceState: "absolutive",
                        },
                    })),
                    wrongCategory: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceCategory: "intransitive-ti-source",
                            sourceVerbStem: "pusukti",
                        },
                    })),
                    wrongFinal: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a", {
                        sourceEvidence: {
                            ...sourceEvidence,
                            sourceVerbStem: "pusukti",
                        },
                    })),
                    missingStem: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-6-o-a", {
                        sourceEvidence: {
                            iHuiOrAHuiSource: true,
                            sourceCategory: "i-hui-a-hui-source",
                            sourceBaseStem: "pusuk",
                        },
                    })),
                },
            };
        })(),
        {
            inventoryExecutableRuleIds: ["andrews-55-6-i-hui", "andrews-55-6-a-hui", "andrews-55-6-o-a"],
            inventoryStructuralOnly: false,
            ruleSummaries: [
                {
                    id: "andrews-55-6-i-hui",
                    operationType: "denominal-intransitive-i-hui-verbstem",
                    suffix: "iwi",
                    outputValency: "intransitive",
                    stemClass: ["B"],
                    surfaceAuthority: "nawat-orthography",
                },
                {
                    id: "andrews-55-6-a-hui",
                    operationType: "denominal-intransitive-a-hui-verbstem",
                    suffix: "awi",
                    outputValency: "intransitive",
                    stemClass: ["B"],
                    surfaceAuthority: "nawat-orthography",
                },
                {
                    id: "andrews-55-6-o-a",
                    operationType: "causative-o-a-from-i-hui-a-hui-source",
                    suffix: "ua",
                    outputValency: "transitive",
                    stemClass: ["C"],
                    surfaceAuthority: "nawat-orthography-and-andrews-source",
                },
            ],
            baseRoutes: [
                {
                    routeTemplateId: "i-hui",
                    executableRuleId: "andrews-55-6-i-hui",
                    targetVerbStem: "pusukiwi",
                    targetInputValue: "(pusukiwi)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    objectPrefixRequired: false,
                    requirementStatus: "not-required",
                    diagnosticIds: [],
                },
                {
                    routeTemplateId: "a-hui",
                    executableRuleId: "andrews-55-6-a-hui",
                    targetVerbStem: "pusukawi",
                    targetInputValue: "(pusukawi)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    objectPrefixRequired: false,
                    requirementStatus: "not-required",
                    diagnosticIds: [],
                },
                {
                    routeTemplateId: "o-a",
                    executableRuleId: "andrews-55-6-o-a",
                    targetVerbStem: "pusukua",
                    targetInputValue: "(pusuk)-(ua)",
                    routeTargetGenerated: true,
                    finiteAvailable: true,
                    objectPrefixRequired: true,
                    requirementStatus: "source-evidence-required",
                    diagnosticIds: [
                        "andrews-denominal-route-source-evidence-required",
                        "andrews-55.6-o-a-i-hui-a-hui-source-evidence-required",
                    ],
                },
            ],
            satisfiedOaRoute: {
                routeTemplateId: "o-a",
                executableRuleId: "andrews-55-6-o-a",
                targetVerbStem: "pusukua",
                targetInputValue: "(pusuk)-(ua)",
                routeTargetGenerated: true,
                finiteAvailable: true,
                objectPrefixRequired: true,
                requirementStatus: "source-evidence-satisfied",
                diagnosticIds: [],
                requestNoObject: null,
                requestObjectVerb: "(pusuk)-(ua)",
            },
            successes: [
                {
                    ok: true,
                    surface: "pusukiwi",
                    targetVerbStem: "pusukiwi",
                    targetInput: "(pusukiwi)",
                    targetValency: "intransitive",
                    targetStemClass: "B",
                    resultFrameSurface: "pusukiwi",
                    generationAllowed: true,
                    diagnosticCount: 0,
                },
                {
                    ok: true,
                    surface: "pusukawi",
                    targetVerbStem: "pusukawi",
                    targetInput: "(pusukawi)",
                    targetValency: "intransitive",
                    targetStemClass: "B",
                    resultFrameSurface: "pusukawi",
                    generationAllowed: true,
                    diagnosticCount: 0,
                },
                {
                    ok: true,
                    surface: "pusukua",
                    targetVerbStem: "pusukua",
                    targetInput: "(pusuk)-(ua)",
                    targetValency: "transitive",
                    targetStemClass: "C",
                    resultFrameSurface: "pusukua",
                    generationAllowed: true,
                    diagnosticCount: 0,
                },
                {
                    ok: true,
                    surface: "pusukua",
                    targetVerbStem: "pusukua",
                    targetInput: "(pusuk)-(ua)",
                    targetValency: "transitive",
                    targetStemClass: "C",
                    resultFrameSurface: "pusukua",
                    generationAllowed: true,
                    diagnosticCount: 0,
                },
            ],
            blocked: {
                noEvidence: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.6-o-a-i-hui-a-hui-source-evidence-required",
                    failedLayer: "authority",
                    contractLayer: "authorityFrame",
                    frameStatus: "blocked",
                },
                originalSource: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.6-o-a-generated-i-hui-a-hui-source-required",
                    failedLayer: "agreement",
                    contractLayer: "participantFrame",
                    frameStatus: "blocked",
                },
                wrongCategory: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.6-o-a-i-hui-a-hui-source-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
                wrongFinal: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.6-o-a-source-final-iwi-awi-required",
                    failedLayer: "morph-boundary",
                    contractLayer: "morphBoundaryFrame",
                    frameStatus: "blocked",
                },
                missingStem: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.6-o-a-source-verbstem-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
            },
        }
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
        "Lessons 54-55 Andrews contract route target input consumes typed frames before display fields",
        (() => {
            const route = findAndrewsContractRoute("54.2.2-inceptive-stative-hui", "hui");
            const poisonedRoute = {
                ...route,
                targetInputValue: "(poison)",
                targetInput: "(poison)",
                targetVerbStem: "poison",
                result: "poison",
                surface: "poison",
                formulaEcho: "#poison#",
            };
            const poisonedRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(poisonedRoute, {
                tense: "presente",
            });
            const missingOperationRoute = {
                ...route,
                targetInputOperationFrame: null,
            };
            const contradictoryOperationRoute = {
                ...route,
                targetInputOperationFrame: {
                    ...route.targetInputOperationFrame,
                    targetFrame: {
                        ...route.targetInputOperationFrame.targetFrame,
                        targetInput: "(poison)",
                    },
                },
            };
            return {
                frameKinds: {
                    source: route?.targetInputSourceFrame?.kind || "",
                    operation: route?.targetInputOperationFrame?.operationId || "",
                    target: route?.targetInputOperationFrame?.targetFrame?.kind || "",
                },
                poisonedTargetInput: ctx.getNawatDenominalAndrewsRouteTargetInputFromFrames(poisonedRoute),
                poisonedRequest: {
                    input: poisonedRequest?.posicionesFormula?.tronco || "",
                    targetContractInput: poisonedRequest?.denominalAndrewsContractRoute?.frames?.routeContract?.targetContract?.targetInput || "",
                    targetFrameInput: poisonedRequest?.denominalAndrewsContractRoute?.targetInputOperationFrame?.targetFrame?.targetInput || "",
                },
                missingOperation: {
                    mismatch: ctx.getNawatDenominalAndrewsRouteTargetInputFrameMismatch({
                        sourceFrame: route.targetInputSourceFrame,
                        operationFrame: null,
                    }),
                    request: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(missingOperationRoute, {
                        tense: "presente",
                    }),
                    activeContext: ctx.setActiveNawatDenominalAndrewsContractRouteContext(missingOperationRoute, null),
                },
                contradictoryOperation: {
                    mismatch: ctx.getNawatDenominalAndrewsRouteTargetInputFrameMismatch({
                        sourceFrame: route.targetInputSourceFrame,
                        operationFrame: contradictoryOperationRoute.targetInputOperationFrame,
                    }),
                    request: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(contradictoryOperationRoute, {
                        tense: "presente",
                    }),
                    activeContext: ctx.setActiveNawatDenominalAndrewsContractRouteContext(contradictoryOperationRoute, null),
                },
            };
        })(),
        {
            frameKinds: {
                source: "nawat-denominal-andrews-route-target-input-source-frame",
                operation: "andrews-denominal-contract-route-target-input-realization",
                target: "nawat-denominal-andrews-route-target-input-target-frame",
            },
            poisonedTargetInput: "(pusukwi)",
            poisonedRequest: {
                input: "(pusukwi)",
                targetContractInput: "(pusukwi)",
                targetFrameInput: "(pusukwi)",
            },
            missingOperation: {
                mismatch: "operation-frame-required",
                request: null,
                activeContext: null,
            },
            contradictoryOperation: {
                mismatch: "contradictory-target-frame",
                request: null,
                activeContext: null,
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
                supportStatus: "executable-rule-supported-partial",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-partial",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-partial",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-partial",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-partial",
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
                supportStatus: "executable-rule-supported-partial",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-evidence-required",
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
                supportStatus: "executable-rule-supported-source-final-guarded",
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
    s.eq(
        "Andrews 55.7 transitive i-a is an executable source-final-guarded contract",
        (() => {
            const inventoryContract = andrewsDenominalContracts.find((contract) => (
                contract.id === "55.7-transitive-i-a"
            ));
            const basePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "pusuk",
                contractId: "55.7-transitive-i-a",
            });
            const baseRoute = basePreview.routes?.[0] || null;
            const unlistedPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
                sourceStem: "pusu",
                contractId: "55.7-transitive-i-a",
            });
            const unlistedRoute = unlistedPreview.routes?.[0] || null;
            const success = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a", {
                sourceStem: "pusuk",
                sourceState: "absolutive",
                sourceCategory: "nounstem-plus-i",
            });
            const summarizeRoute = (route) => ({
                executableRuleId: route?.executableRuleId || "",
                targetVerbStem: route?.targetVerbStem || "",
                targetInputValue: route?.targetInputValue || "",
                routeTargetGenerated: route?.routeTargetGenerated === true,
                finiteAvailable: route?.finiteGenerationContractAvailable === true,
                objectPrefixRequired: route?.finiteGenerationRequiresObjectPrefix === true,
                sourceFinalPatternStatus: route?.sourceFinalPatternStatus || "",
                diagnosticIds: Array.isArray(route?.routeDiagnostics)
                    ? route.routeDiagnostics.map((diagnostic) => diagnostic.id)
                    : [],
            });
            const summarizeSuccess = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                targetVerbStem: result?.targetVerbStem || "",
                targetInput: result?.targetInput || "",
                targetValency: result?.targetValency || "",
                resultFrameSurface: result?.frames?.resultFrame?.surface || "",
                generationAllowed: result?.frames?.routeContract?.generationAllowed === true,
                diagnosticCount: result?.contractDiagnostics?.length || 0,
            });
            const summarizeBlocked = (result) => ({
                ok: result?.ok === true,
                surface: result?.surface || "",
                diagnosticId: result?.contractDiagnostics?.[0]?.id || "",
                failedLayer: result?.contractDiagnostics?.[0]?.failedLayer || "",
                contractLayer: result?.contractDiagnostics?.[0]?.contractLayer || "",
                frameStatus: result?.frames?.diagnosticFrame?.status || "",
            });
            return {
                inventoryExecutableRuleIds: inventoryContract?.executableRuleIds || [],
                inventoryStructuralOnly: inventoryContract?.boundaries?.structuralInventoryOnly === true,
                ruleSummary: (() => {
                    const rule = ctx.summarizeNawatDenominalAndrewsExecutableRuleContract(
                        ctx.getNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a")
                    );
                    return {
                        id: rule?.id || "",
                        operationType: rule?.operation?.type || "",
                        baseExtension: rule?.operation?.baseExtension || "",
                        suffix: rule?.operation?.suffix || "",
                        outputValency: rule?.output?.valency || "",
                        stemClass: rule?.output?.stemClass || [],
                        surfaceAuthority: rule?.output?.surfaceAuthority || "",
                    };
                })(),
                baseRoute: {
                    ...summarizeRoute(baseRoute),
                    requestNoObject: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        baseRoute,
                        { tense: "presente" }
                    ),
                    requestObjectVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                        baseRoute,
                        { tense: "presente", objectPrefix: "ta" }
                    )?.posicionesFormula?.tronco || "",
                },
                unlistedRoute: summarizeRoute(unlistedRoute),
                success: summarizeSuccess(success),
                blocked: {
                    missingStem: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a", {
                        sourceState: "absolutive",
                        sourceCategory: "nounstem-plus-i",
                    })),
                    possessive: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a", {
                        sourceStem: "pusuk",
                        sourceState: "possessive",
                        sourceCategory: "possessive-state-nnc-predicate",
                    })),
                    generatedSource: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a", {
                        sourceStem: "pusukiwi",
                        sourceState: "derived",
                        sourceCategory: "i-hui-a-hui-source",
                    })),
                    unlistedFinal: summarizeBlocked(ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-55-7-i-a", {
                        sourceStem: "pusu",
                        sourceState: "absolutive",
                        sourceCategory: "nounstem-plus-i",
                    })),
                },
            };
        })(),
        {
            inventoryExecutableRuleIds: ["andrews-55-7-i-a"],
            inventoryStructuralOnly: false,
            ruleSummary: {
                id: "andrews-55-7-i-a",
                operationType: "denominal-transitive-i-a-verbstem",
                baseExtension: "i",
                suffix: "ia",
                outputValency: "transitive",
                stemClass: [],
                surfaceAuthority: "nawat-orthography-and-andrews-source-final",
            },
            baseRoute: {
                executableRuleId: "andrews-55-7-i-a",
                targetVerbStem: "pusukia",
                targetInputValue: "(pusuk)-(ia)",
                routeTargetGenerated: true,
                finiteAvailable: true,
                objectPrefixRequired: true,
                sourceFinalPatternStatus: "majority",
                diagnosticIds: [
                    "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
                    "andrews-55.7-i-a-source-i-hui-causative-path-possible",
                ],
                requestNoObject: null,
                requestObjectVerb: "(pusuk)-(ia)",
            },
            unlistedRoute: {
                executableRuleId: "andrews-55-7-i-a",
                targetVerbStem: "",
                targetInputValue: "",
                routeTargetGenerated: false,
                finiteAvailable: false,
                objectPrefixRequired: true,
                sourceFinalPatternStatus: "unlisted",
                diagnosticIds: [
                    "andrews-55.7-i-a-source-final-unlisted",
                    "andrews-55.7-i-a-source-i-may-belong-to-nounstem",
                    "andrews-55.7-i-a-source-i-hui-causative-path-possible",
                    "andrews-55.7-i-a-source-final-confirmation-required",
                ],
            },
            success: {
                ok: true,
                surface: "pusukia",
                targetVerbStem: "pusukia",
                targetInput: "(pusuk)-(ia)",
                targetValency: "transitive",
                resultFrameSurface: "pusukia",
                generationAllowed: true,
                diagnosticCount: 0,
            },
            blocked: {
                missingStem: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.7-i-a-source-stem-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
                possessive: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.7-i-a-absolutive-nounstem-required",
                    failedLayer: "agreement",
                    contractLayer: "participantFrame",
                    frameStatus: "blocked",
                },
                generatedSource: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.7-i-a-nounstem-source-required",
                    failedLayer: "stem",
                    contractLayer: "stemFrame",
                    frameStatus: "blocked",
                },
                unlistedFinal: {
                    ok: false,
                    surface: "",
                    diagnosticId: "andrews-55.7-i-a-source-final-confirmation-required",
                    failedLayer: "morph-boundary",
                    contractLayer: "morphBoundaryFrame",
                    frameStatus: "blocked",
                },
            },
        }
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
        "Andrews source-limited denominal routes keep source context diagnostic while allowing Andrews finite VNC requests",
        {
            includedFiniteAvailable: includedPossessorRoute?.finiteGenerationContractAvailable === true,
            includedRequirementIds: includedPossessorRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            includedRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                includedPossessorRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            tiLiaRequirementIds: tiLiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            tiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tiLiaRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            tiARequirementIds: tiARoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            tiARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tiARoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            tIaRequirementIds: tIaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            tIaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tIaRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            huiLiaRequirementIds: huiLiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            huiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiLiaRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            yaLiaRequirementIds: yaLiaRoute?.sourceRequirement?.unsatisfied?.map((requirement) => requirement.id) || [],
            yaLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                yaLiaRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
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
            )?.posicionesFormula?.tronco || "",
        },
        {
            includedFiniteAvailable: true,
            includedRequirementIds: ["possessive-state-nnc-predicate"],
            includedRequestVerb: "(pusukti)",
            tiLiaRequirementIds: ["intransitive-ti-verbstem-source"],
            tiLiaRequestVerb: "(pusukti)-(lia)",
            tiARequirementIds: ["intransitive-ti-verbstem-source"],
            tiARequestVerb: "(pusukti)-(a)",
            tIaRequirementIds: ["intransitive-ti-verbstem-source"],
            tIaRequestVerb: "(pusukt)-(ia)",
            huiLiaRequirementIds: ["intransitive-hui-verbstem-source"],
            huiLiaRequestVerb: "(pusukwi)-(lia)",
            yaLiaRequirementIds: ["intransitive-ya-verbstem-source"],
            yaLiaRequestVerb: "(pusuk)-(lia)",
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
            )?.posicionesFormula?.tronco || "",
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
            )?.posicionesFormula?.tronco || "",
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
                    sourceMustBeAndrewsTemporalCompoundNounstemContext: true,
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
    const framedExplicitSource = (surface, {
        ok = true,
        sourceStem = "stale-stem",
        sourceSurface = "stale-surface",
        extra = {},
    } = {}) => ({
        sourceStem,
        sourceSurface,
        ...extra,
        frames: ctx.buildGrammarFrame({
            resultFrame: ctx.buildGrammarResultFrame({
                ok,
                surface,
                surfaceForms: surface ? [surface] : [],
                outputKind: "test-explicit-andrews-source",
            }),
        }),
    });
    const framedTemporalPreview = ctx.previewNawatDenominalAndrewsTemporalTiaRouteFromSource(
        framedExplicitSource("omeilwi", {
            extra: {
                timeSegmentMatrix: "ilwi",
                numeralEmbed: "ome",
            },
        })
    );
    const framedAdverbialEvidence = ctx.buildNawatDenominalAndrewsAdverbialHuiaSourceEvidence(
        framedExplicitSource("achpa")
    );
    const framedRelationalEvidence = ctx.buildNawatDenominalAndrewsRelationalCompoundSourceEvidence(
        framedExplicitSource("kalpan")
    );
    s.eq(
        "Andrews 55 explicit source evidence reads LCM result-frame surfaces before stale source aliases",
        {
            temporalSourceSurface: framedTemporalPreview?.sourceEvidence?.sourceSurface || "",
            temporalSourceBaseStem: framedTemporalPreview?.sourceEvidence?.sourceBaseStem || "",
            adverbialSourceSurface: framedAdverbialEvidence?.sourceSurface || "",
            adverbialSourceBaseStem: framedAdverbialEvidence?.sourceBaseStem || "",
            relationalSourceSurface: framedRelationalEvidence?.sourceSurface || "",
            relationalSourceBaseStem: framedRelationalEvidence?.sourceBaseStem || "",
        },
        {
            temporalSourceSurface: "omeilwi",
            temporalSourceBaseStem: "omeilwi",
            adverbialSourceSurface: "achpa",
            adverbialSourceBaseStem: "achpa",
            relationalSourceSurface: "kalpan",
            relationalSourceBaseStem: "kalpan",
        }
    );
    s.eq(
        "Andrews 55 explicit source evidence suppresses stale aliases for empty LCM result frames",
        {
            temporal: ctx.previewNawatDenominalAndrewsTemporalTiaRouteFromSource(
                framedExplicitSource("", {
                    ok: false,
                    extra: {
                        timeSegmentMatrix: "ilwi",
                        numeralEmbed: "se",
                    },
                })
            ),
            adverbial: ctx.buildNawatDenominalAndrewsAdverbialHuiaSourceEvidence(
                framedExplicitSource("", { ok: false })
            ),
            relational: ctx.buildNawatDenominalAndrewsRelationalCompoundSourceEvidence(
                framedExplicitSource("", { ok: false })
            ),
        },
        {
            temporal: null,
            adverbial: null,
            relational: null,
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
            )?.posicionesFormula?.tronco || "",
            relationalSourceEvidence: relationalSourcePreview?.sourceEvidence || null,
            relationalCandidateRouteCount: relationalSourcePreview?.candidateRouteCount || 0,
            relationalFiniteRouteRequestCount: relationalSourcePreview?.finiteRouteRequestCount || 0,
            relationalOaRequirementStatus: relationalOaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            relationalOaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                relationalOaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            relationalHuiaRequirementStatus: relationalHuiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            relationalHuiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                relationalHuiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
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
                    sourceMustBeAndrewsAdverbialNounstemContext: true,
                    doesNotTreatConfiguredAdverbioAsAutomaticEvidence: true,
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
                    sourceMustBeAndrewsRelationalCompoundOrPredicateContext: true,
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
            )?.posicionesFormula?.tronco || "",
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
                sourceFormulaEcho: "#Ø-Ø(kal)Ø#",
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
    const inceptiveTiFromNncPreview = ctx.previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput(
        kalAbsolutiveNnc
    );
    const inceptiveTiFromPossessiveNncPreview = ctx.previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput(
        kalPossessiveNnc
    );
    const inceptiveTiFromNncRoute = inceptiveTiFromNncPreview?.routePreview?.routes?.[0] || null;
    s.eq(
        "Andrews 54.2.1 inceptive ti route consumes generated absolutive NNC output as source evidence",
        {
            sourceEvidence: inceptiveTiFromNncPreview?.sourceEvidence || null,
            routeCount: inceptiveTiFromNncPreview?.candidateRouteCount || 0,
            routeRequirementStatus: inceptiveTiFromNncRoute?.sourceRequirement?.validationStatus || "",
            routeTargetStemClass: inceptiveTiFromNncRoute?.targetStemClass || "",
            routeSourceEvidenceLinked: inceptiveTiFromNncRoute?.frames?.authorityFrame?.evidenceStatus || "",
            requestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiFromNncRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            possessivePreview: inceptiveTiFromPossessiveNncPreview,
        },
        {
            sourceEvidence: {
                inceptiveTiSource: true,
                sourceState: "absolutive",
                sourceCategory: "absolutive-state-nnc-predicate",
                sourceSurface: "kal",
                sourceBaseStem: "kal",
                sourcePredicateStem: "kal",
                sourceFormulaEcho: "#Ø-Ø(kal)Ø#",
                sourceOutputKind: "nominal-nuclear-clause",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                    sourceNounstemFromPredicate: true,
                    inceptiveTiSourceRequiresAbsolutivePredicate: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            routeCount: 1,
            routeRequirementStatus: "not-required",
            routeTargetStemClass: "A",
            routeSourceEvidenceLinked: "source-evidence-linked",
            requestVerb: "(kalti)",
            possessivePreview: null,
        }
    );
    const inceptiveHuiFromNncPreview = ctx.previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput(
        kalAbsolutiveNnc
    );
    const inceptiveHuiFromPossessiveNncPreview = ctx.previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput(
        kalPossessiveNnc
    );
    const inceptiveHuiFromNncRoute = inceptiveHuiFromNncPreview?.routePreview?.routes?.[0] || null;
    s.eq(
        "Andrews 54.2.2 inceptive hui route consumes generated absolutive NNC output as source evidence",
        {
            sourceEvidence: inceptiveHuiFromNncPreview?.sourceEvidence || null,
            routeCount: inceptiveHuiFromNncPreview?.candidateRouteCount || 0,
            routeRequirementStatus: inceptiveHuiFromNncRoute?.sourceRequirement?.validationStatus || "",
            routeTargetStemClass: inceptiveHuiFromNncRoute?.targetStemClass || "",
            routeNawatSuffix: inceptiveHuiFromNncRoute?.nawatSurfaceSuffix || "",
            routeSourceEvidenceLinked: inceptiveHuiFromNncRoute?.frames?.authorityFrame?.evidenceStatus || "",
            requestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveHuiFromNncRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            possessivePreview: inceptiveHuiFromPossessiveNncPreview,
        },
        {
            sourceEvidence: {
                inceptiveHuiSource: true,
                sourceState: "absolutive",
                sourceCategory: "absolutive-state-nnc-predicate",
                sourceSurface: "kal",
                sourceBaseStem: "kal",
                sourcePredicateStem: "kal",
                sourceFormulaEcho: "#Ø-Ø(kal)Ø#",
                sourceOutputKind: "nominal-nuclear-clause",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                    sourceNounstemFromPredicate: true,
                    inceptiveHuiSourceRequiresAbsolutivePredicate: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            routeCount: 1,
            routeRequirementStatus: "not-required",
            routeTargetStemClass: "A",
            routeNawatSuffix: "wi",
            routeSourceEvidenceLinked: "source-evidence-linked",
            requestVerb: "(kalwi)",
            possessivePreview: null,
        }
    );
    const rootPlusYaFromNncPreview = ctx.previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput(
        kalAbsolutiveNnc
    );
    const rootPlusYaFromPossessiveNncPreview = ctx.previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput(
        kalPossessiveNnc
    );
    const rootPlusYaFromNncRoute = rootPlusYaFromNncPreview?.routePreview?.routes?.[0] || null;
    s.eq(
        "Andrews 54.2.3 root-plus-ya route consumes generated absolutive NNC predicate stem as nounstem-as-root evidence",
        {
            sourceEvidence: rootPlusYaFromNncPreview?.sourceEvidence || null,
            routeCount: rootPlusYaFromNncPreview?.candidateRouteCount || 0,
            routeRequirementStatus: rootPlusYaFromNncRoute?.sourceRequirement?.validationStatus || "",
            routeTargetStemClass: rootPlusYaFromNncRoute?.targetStemClass || "",
            routeSourceEvidenceLinked: rootPlusYaFromNncRoute?.frames?.authorityFrame?.evidenceStatus || "",
            requestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                rootPlusYaFromNncRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            possessivePreview: rootPlusYaFromPossessiveNncPreview,
        },
        {
            sourceEvidence: {
                rootPlusYaSource: true,
                sourceState: "absolutive",
                sourceCategory: "nounstem-as-root",
                sourceSurface: "kal",
                sourceBaseStem: "kal",
                sourcePredicateStem: "kal",
                sourceFormulaEcho: "#Ø-Ø(kal)Ø#",
                sourceOutputKind: "nominal-nuclear-clause",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                    sourceNounstemFromPredicate: true,
                    sourceNounstemDowngradedToRootRank: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            routeCount: 1,
            routeRequirementStatus: "not-required",
            routeTargetStemClass: "A/B",
            routeSourceEvidenceLinked: "source-evidence-linked",
            requestVerb: "(kalya)",
            possessivePreview: null,
        }
    );
    const inceptiveAFromNncPreview = ctx.previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput(
        kalAbsolutiveNnc
    );
    const inceptiveAFromPossessiveNncPreview = ctx.previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput(
        kalPossessiveNnc
    );
    const inceptiveAFromNncRoute = inceptiveAFromNncPreview?.routePreview?.routes?.[0] || null;
    s.eq(
        "Andrews 54.2.4 limited inceptive a route consumes generated absolutive NNC predicate stem as nounstem evidence",
        {
            sourceEvidence: inceptiveAFromNncPreview?.sourceEvidence || null,
            routeCount: inceptiveAFromNncPreview?.candidateRouteCount || 0,
            routeRequirementStatus: inceptiveAFromNncRoute?.sourceRequirement?.validationStatus || "",
            routeTargetStemClass: inceptiveAFromNncRoute?.targetStemClass || "",
            routeLimitedUse: inceptiveAFromNncRoute?.boundaries?.limitedUse === true,
            routeSourceEvidenceLinked: inceptiveAFromNncRoute?.frames?.authorityFrame?.evidenceStatus || "",
            requestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveAFromNncRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            possessivePreview: inceptiveAFromPossessiveNncPreview,
        },
        {
            sourceEvidence: {
                inceptiveASource: true,
                sourceState: "absolutive",
                sourceCategory: "absolutive-nounstem",
                sourceSurface: "kal",
                sourceBaseStem: "kal",
                sourcePredicateStem: "kal",
                sourceFormulaEcho: "#Ø-Ø(kal)Ø#",
                sourceOutputKind: "nominal-nuclear-clause",
                boundaries: {
                    noFixtureEvidence: true,
                    doesNotCreateLexicalEvidence: true,
                    sourceEvidenceFromGeneratedOrdinaryNnc: true,
                    sourceNounstemFromPredicate: true,
                    inceptiveASourceRequiresAbsolutiveNounstem: true,
                    limitedUse: true,
                    notCausativeA: true,
                    targetLooksTransitiveButIsIntransitive: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            routeCount: 1,
            routeRequirementStatus: "not-required",
            routeTargetStemClass: "C",
            routeLimitedUse: true,
            routeSourceEvidenceLinked: "source-evidence-linked",
            requestVerb: "(kala)",
            possessivePreview: null,
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
            )?.posicionesFormula?.tronco || "",
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
                sourceFormulaEcho: "#Ø-Ø(kal)Ø#",
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
    s.eq(
        "Andrews 54.2.1/54.2.2/54.2.3/54.4 source evidence rejects stale ordinary NNC aliases for empty result frame",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "nominal-nuclear-clause",
                    generationRoute: "test-empty-nnc-frame",
                }),
            });
            const staleNncOutput = {
                supported: true,
                state: "absolutive",
                stem: "stale-nounstem",
                surface: "stale-surface",
                surfaceForms: ["stale-surface-a / stale-surface-b"],
                result: "stale-result",
                outputKind: "nominal-nuclear-clause",
                nncBasic: {
                    formulaEcho: "#Ø-Ø(stale-nounstem)Ø#",
                    formulaSlots: {
                        predicateStem: {
                            stem: "stale-nounstem",
                            state: "absolutive",
                        },
                    },
                },
                grammarFrame,
                frames: grammarFrame,
            };
            return {
                inceptiveSourceEvidence: ctx.buildNawatDenominalAndrewsInceptiveTiSourceEvidenceFromOrdinaryNncOutput(staleNncOutput),
                inceptivePreview: ctx.previewNawatDenominalAndrewsInceptiveTiRouteFromOrdinaryNncOutput(staleNncOutput),
                huiSourceEvidence: ctx.buildNawatDenominalAndrewsInceptiveHuiSourceEvidenceFromOrdinaryNncOutput(staleNncOutput),
                huiPreview: ctx.previewNawatDenominalAndrewsInceptiveHuiRouteFromOrdinaryNncOutput(staleNncOutput),
                rootPlusYaSourceEvidence: ctx.buildNawatDenominalAndrewsRootPlusYaSourceEvidenceFromOrdinaryNncOutput(staleNncOutput),
                rootPlusYaPreview: ctx.previewNawatDenominalAndrewsRootPlusYaRouteFromOrdinaryNncOutput(staleNncOutput),
                inceptiveASourceEvidence: ctx.buildNawatDenominalAndrewsInceptiveASourceEvidenceFromOrdinaryNncOutput(staleNncOutput),
                inceptiveAPreview: ctx.previewNawatDenominalAndrewsInceptiveARouteFromOrdinaryNncOutput(staleNncOutput),
                sourceEvidence: ctx.buildNawatDenominalAndrewsPossessionTiSourceEvidenceFromOrdinaryNncOutput(staleNncOutput),
                preview: ctx.previewNawatDenominalAndrewsPossessionTiRouteFromOrdinaryNncOutput(staleNncOutput),
            };
        })(),
        {
            inceptiveSourceEvidence: null,
            inceptivePreview: null,
            huiSourceEvidence: null,
            huiPreview: null,
            rootPlusYaSourceEvidence: null,
            rootPlusYaPreview: null,
            inceptiveASourceEvidence: null,
            inceptiveAPreview: null,
            sourceEvidence: null,
            preview: null,
        }
    );
    const inceptiveTiRoute = findAndrewsContractRoute("54.2.1-inceptive-stative-ti", "ti");
    const inceptiveTiNextPreview = ctx.previewNawatDenominalAndrewsContractRouteNextSource(inceptiveTiRoute);
    const inceptiveTiYaSatisfiedRoute = inceptiveTiNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-ti-ya-deverbal" && route.routeTemplateId === "ti-ya");
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
            tiYaFiniteAvailable: inceptiveTiYaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiYaRequirementStatus: inceptiveTiYaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiYaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiYaSatisfiedRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            tiLiaFiniteAvailable: inceptiveTiLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiLiaRequirementStatus: inceptiveTiLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            tiLiaRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.obj1 || "",
            tiAFiniteAvailable: inceptiveTiASatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiARequirementStatus: inceptiveTiASatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTiASatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            tIaFiniteAvailable: inceptiveTIaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tIaRequirementStatus: inceptiveTIaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tIaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                inceptiveTIaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
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
                    sourceEvidenceSupportsTiYaDeverbal: true,
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
                        sourceEvidenceSupportsTiYaDeverbal: true,
                        sourceEvidenceSupportsTiLiaCausative: true,
                        sourceEvidenceSupportsTiACausative: true,
                        sourceEvidenceSupportsTIaApplicative: true,
                    },
                },
            },
            tiYaFiniteAvailable: true,
            tiYaRequirementStatus: "source-evidence-satisfied",
            tiYaRequestVerb: "(pusukti)-(ya)",
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
            )?.posicionesFormula?.tronco || "",
            tiAFiniteAvailable: possessionTiASatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiARequirementStatus: possessionTiASatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiARequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                possessionTiASatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            tIaFiniteAvailable: possessionTIaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tIaRequirementStatus: possessionTIaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tIaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                possessionTIaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
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
    const huiAndrewsYaSatisfiedRoute = huiAndrewsNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-hui-ya-deverbal" && route.routeTemplateId === "hui-ya");
    const huiLiaSatisfiedRoute = huiAndrewsNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.2-hui-lia-causative" && route.routeTemplateId === "hui-lia");
    s.eq(
        "Andrews 54.2 generated hui source satisfies the following hui-lia causative contract",
        {
            sourceEvidence: huiAndrewsNextPreview?.sourceEvidence || null,
            nextSource: huiAndrewsNextPreview?.nextSource || null,
            huiYaFiniteAvailable: huiAndrewsYaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            huiYaRequirementStatus: huiAndrewsYaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            huiYaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiAndrewsYaSatisfiedRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            huiLiaFiniteAvailable: huiLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            huiLiaRequirementStatus: huiLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            huiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            huiLiaRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.obj1 || "",
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
                    sourceEvidenceSupportsHuiYaDeverbal: true,
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
                        sourceEvidenceSupportsHuiYaDeverbal: true,
                        sourceEvidenceSupportsHuiLiaCausative: true,
                    },
                },
            },
            huiYaFiniteAvailable: true,
            huiYaRequirementStatus: "source-evidence-satisfied",
            huiYaRequestVerb: "(pusukwi)-(ya)",
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
            )?.posicionesFormula?.tronco || "",
            yaLiaRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                yaLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.obj1 || "",
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
            )?.posicionesFormula?.tronco || "",
            tlaApplicativeRequestObjectPrefix: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tlaApplicativeSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.obj1 || "",
            sourceRequestCanSatisfyLaterEvidence: tlaCausativeRouteRequestWithEvidence?.denominalAndrewsContractRoute?.boundaries?.canSatisfyLaterSourceEvidence === true,
            sourceExecutionCanSatisfyLaterEvidence: tlaCausativeRouteExecutionWithEvidence?.denominalAndrewsContractRouteExecution?.boundaries?.canSatisfyLaterSourceEvidence === true,
        },
        {
            sourceEvidence: {
                tlaCausativeSource: true,
                sourceCategory: "causative-tla",
                sourceState: "derived",
                sourceContractId: "55.2-causative-tla",
                sourceRouteTemplateId: "tla",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukta",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromAndrewsContractRoute: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                    sourceEvidenceSupportsTlaTiLiaApplicative: true,
                    sourceTlaReplacedByTiBeforeLia: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusuk)-(ta)",
                displaySurface: "pusukta",
                sourceEvidence: {
                    tlaCausativeSource: true,
                    sourceCategory: "causative-tla",
                    sourceState: "derived",
                    sourceContractId: "55.2-causative-tla",
                    sourceRouteTemplateId: "tla",
                    sourceBaseStem: "pusuk",
                    sourceVerbStem: "pusukta",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                        sourceEvidenceSupportsTlaTiLiaApplicative: true,
                        sourceTlaReplacedByTiBeforeLia: true,
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
    const intransitiveTlaSourcePreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "pusuk",
        contractId: "55.2-intransitive-tla",
        sourceEvidence: {
            intransitiveTlaLexicalSource: true,
            sourceCategory: "intransitive-tla-lexical-source",
            sourceState: "absolutive",
            sourceBaseStem: "pusuk",
        },
    });
    const intransitiveTlaRoute = intransitiveTlaSourcePreview?.routes?.[0] || null;
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
            )?.posicionesFormula?.tronco || "",
            tiLiaFiniteAvailable: intransitiveTlaTiLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiLiaRequirementStatus: intransitiveTlaTiLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                intransitiveTlaTiLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
        },
        {
            sourceEvidence: {
                tlaIntransitiveSource: true,
                sourceCategory: "intransitive-tla",
                sourceState: "derived",
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
                    sourceTlaReplacedByTiBeforeA: true,
                    sourceTlaReplacedByTiBeforeLia: true,
                },
            },
            nextSource: {
                canBecomeSource: true,
                sourceVerb: "(pusukta)",
                displaySurface: "pusukta",
                sourceEvidence: {
                    tlaIntransitiveSource: true,
                    sourceCategory: "intransitive-tla",
                    sourceState: "derived",
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
                        sourceTlaReplacedByTiBeforeA: true,
                        sourceTlaReplacedByTiBeforeLia: true,
                    },
                },
            },
            contractPreviewSourceStem: "pusuk",
            finiteRouteRequestCount: 4,
            finiteRouteObjectPrefixRequiredCount: 3,
            finiteRouteSourceEvidenceRequiredCount: 18,
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
            )?.posicionesFormula?.tronco || "",
            alHuiaFiniteAvailable: oAAlHuiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            alHuiaRequirementStatus: oAAlHuiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            alHuiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                oAAlHuiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
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
            finiteRouteRequestCount: 5,
            finiteRouteObjectPrefixRequiredCount: 2,
            finiteRouteSourceEvidenceRequiredCount: 18,
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
            )?.posicionesFormula?.tronco || "",
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
            )?.posicionesFormula?.tronco || "",
            huiYaFiniteAvailable: huiYaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            huiYaRequirementStatus: huiYaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            huiYaTargetStemClass: huiYaSatisfiedRoute?.targetStemClass || "",
            huiYaTraditionalSpelling: huiYaSatisfiedRoute?.traditionalSpelling || "",
            huiYaTraditionalSpellingConfusableWith: huiYaSatisfiedRoute?.traditionalSpellingConfusableWith || "",
            huiYaTraditionalSpellingAmbiguous: huiYaSatisfiedRoute?.boundaries?.traditionalSpellingAmbiguous === true,
            huiYaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiYaSatisfiedRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
            tiYaNextSourceEvidence: tiYaNextPreview?.sourceEvidence || null,
            tiYaNextPreviewSourceStem: tiYaNextPreview?.routePreview?.sourceStem || "",
            tiYaLiaFiniteAvailable: tiYaLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            tiYaLiaRequirementStatus: tiYaLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            tiYaLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                tiYaLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
            huiYaNextSourceEvidence: huiYaNextPreview?.sourceEvidence || null,
            huiYaNextPreviewSourceStem: huiYaNextPreview?.routePreview?.sourceStem || "",
            huiYaLiaFiniteAvailable: huiYaLiaSatisfiedRoute?.finiteGenerationContractAvailable === true,
            huiYaLiaRequirementStatus: huiYaLiaSatisfiedRoute?.sourceRequirement?.validationStatus || "",
            huiYaLiaRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                huiYaLiaSatisfiedRoute,
                { tense: "presente", objectPrefix: "ta" }
            )?.posicionesFormula?.tronco || "",
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
            huiVerb: huiRouteRequest?.posicionesFormula?.tronco || "",
            huiTense: huiRouteRequest?.posicionesFormula?.tiempo || "",
            huiMode: huiRouteRequest?.options?.override?.tenseMode || "",
            huiObjectExpected: huiRouteRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
            huiContractId: huiRouteRequest?.denominalAndrewsContractRoute?.contractId || "",
            tlaVerb: tlaRouteRequest?.posicionesFormula?.tronco || "",
            tlaObjectPrefix: tlaRouteRequest?.posicionesFormula?.obj1 || "",
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
    const sourceContextTiYa = ctx.executeNawatDenominalAndrewsExecutableRuleContract("andrews-54-2-3-ti-ya", {
        sourceStem: "pusukti",
        sourceContext: {
            sourceVerbStem: "pusukti",
            sourceState: "derived",
            sourceCategory: "intransitive-ti-vnc",
        },
    });
    const sourceContextTemporalPreview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "seilwi",
        contractId: "55.1-temporal-tia",
        sourceContext: {
            temporalCompoundSource: true,
            sourceState: "absolutive",
            sourceCategory: "compound-temporal-nounstem",
            sourceBaseStem: "seilwi",
            timeSegmentMatrix: "ilwi",
            numeralEmbed: "se",
        },
    });
    const sourceContextTemporalRoute = sourceContextTemporalPreview?.routes?.[0] || null;
    s.eq(
        "Andrews sourceContext satisfies generation gates without a Nawat/Pipil evidence object",
        {
            tiYaOk: sourceContextTiYa?.ok === true,
            tiYaSurface: sourceContextTiYa?.surface || "",
            tiYaTargetInput: sourceContextTiYa?.targetInput || "",
            temporalPreviewHasSourceContext: sourceContextTemporalPreview?.sourceContext?.temporalCompoundSource === true,
            temporalPreviewHasLegacyEvidenceAlias: sourceContextTemporalPreview?.sourceEvidence?.temporalCompoundSource === true,
            temporalRequirementStatus: sourceContextTemporalRoute?.sourceRequirement?.validationStatus || "",
            temporalFiniteAvailable: sourceContextTemporalRoute?.finiteGenerationContractAvailable === true,
            temporalRequestVerb: ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
                sourceContextTemporalRoute,
                { tense: "presente" }
            )?.posicionesFormula?.tronco || "",
        },
        {
            tiYaOk: true,
            tiYaSurface: "pusuktiya",
            tiYaTargetInput: "(pusukti)-(ya)",
            temporalPreviewHasSourceContext: true,
            temporalPreviewHasLegacyEvidenceAlias: true,
            temporalRequirementStatus: "source-evidence-satisfied",
            temporalFiniteAvailable: true,
            temporalRequestVerb: "(seilwitia)",
        }
    );
    const sourceContextOnlyRouteCases = [
        {
            name: "included-possessor",
            contractId: "54.3-included-possessor-ti",
            sourceStem: "nukal",
            sourceContext: {
                possessiveState: true,
                sourceState: "possessive",
                sourceCategory: "possessive-state-nnc-predicate",
                sourceBaseStem: "nukal",
            },
            request: { tense: "presente" },
        },
        {
            name: "ti-lia",
            contractId: "54.2-54.4-ti-lia-causative",
            sourceStem: "pusuk",
            sourceContext: {
                tiSource: true,
                sourceState: "derived",
                sourceCategory: "intransitive-ti-vnc",
                sourceVerbStem: "pusukti",
                sourceBaseStem: "pusuk",
            },
            request: { tense: "presente", objectPrefix: "ta" },
        },
        {
            name: "adverbial-huia",
            contractId: "55.4-adverbial-huia",
            sourceStem: "kwal",
            sourceContext: {
                adverbialSource: true,
                sourceState: "adverbialized",
                sourceCategory: "adverbial-nounstem",
                sourceBaseStem: "kwal",
            },
            request: { tense: "presente", objectPrefix: "ta" },
        },
        {
            name: "relational-o-a",
            contractId: "55.5-relational-compound-o-a-huia",
            routeTemplateId: "relational-o-a",
            sourceStem: "iwan",
            sourceContext: {
                relationalCompoundSource: true,
                sourceState: "relational",
                sourceCategory: "compound-relational-nounstem",
                sourceBaseStem: "iwan",
            },
            request: { tense: "presente", objectPrefix: "ta" },
        },
        {
            name: "relational-huia",
            contractId: "55.5-relational-compound-o-a-huia",
            routeTemplateId: "relational-huia",
            sourceStem: "iwan",
            sourceContext: {
                relationalCompoundSource: true,
                sourceState: "relational",
                sourceCategory: "compound-relational-nounstem",
                sourceBaseStem: "iwan",
            },
            request: { tense: "presente", objectPrefix: "ta" },
        },
        {
            name: "i-hui-a-hui-o-a",
            contractId: "55.6-i-hui-a-hui-to-o-a",
            routeTemplateId: "o-a",
            sourceStem: "pusuk",
            sourceContext: {
                iHuiOrAHuiSource: true,
                sourceState: "derived",
                sourceCategory: "i-hui-a-hui-source",
                sourceVerbStem: "pusukiwi",
                sourceBaseStem: "pusuk",
            },
            request: { tense: "presente", objectPrefix: "ta" },
        },
    ];
    const summarizeSourceContextOnlyRouteCase = (routeCase) => {
        const preview = ctx.generateNawatDenominalAndrewsContractRoutePreview({
            sourceStem: routeCase.sourceStem,
            contractId: routeCase.contractId,
            sourceContext: routeCase.sourceContext,
        });
        const route = (preview?.routes || [])
            .find((candidate) => !routeCase.routeTemplateId || candidate.routeTemplateId === routeCase.routeTemplateId)
            || preview?.routes?.[0]
            || null;
        const request = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(route, routeCase.request);
        return {
            name: routeCase.name,
            routeTemplateId: route?.routeTemplateId || "",
            contextStatus: route?.sourceRequirement?.sourceContextValidationStatus || "",
            legacyEvidenceStatus: route?.sourceRequirement?.validationStatus || "",
            finiteAvailable: route?.finiteGenerationContractAvailable === true,
            contextRequiredCount: preview?.finiteRouteSourceContextRequiredCount || 0,
            legacyEvidenceRequiredCount: preview?.finiteRouteSourceEvidenceRequiredCount || 0,
            requestCarriesSourceContext: request?.denominalAndrewsContractRoute?.sourceContext?.sourceCategory || "",
            requestVerb: request?.posicionesFormula?.tronco || "",
            requestObjectPrefix: request?.posicionesFormula?.obj1 || "",
        };
    };
    s.eq(
        "Andrews sourceContext alone opens source-limited finite denominal route requests",
        sourceContextOnlyRouteCases.map(summarizeSourceContextOnlyRouteCase),
        [
            {
                name: "included-possessor",
                routeTemplateId: "included-possessor-ti",
                contextStatus: "source-context-satisfied",
                legacyEvidenceStatus: "source-evidence-satisfied",
                finiteAvailable: true,
                contextRequiredCount: 0,
                legacyEvidenceRequiredCount: 0,
                requestCarriesSourceContext: "possessive-state-nnc-predicate",
                requestVerb: "(nukalti)",
                requestObjectPrefix: "",
            },
            {
                name: "ti-lia",
                routeTemplateId: "ti-lia",
                contextStatus: "source-context-satisfied",
                legacyEvidenceStatus: "source-evidence-satisfied",
                finiteAvailable: true,
                contextRequiredCount: 0,
                legacyEvidenceRequiredCount: 0,
                requestCarriesSourceContext: "intransitive-ti-vnc",
                requestVerb: "(pusukti)-(lia)",
                requestObjectPrefix: "ta",
            },
            {
                name: "adverbial-huia",
                routeTemplateId: "adverbial-huia",
                contextStatus: "source-context-satisfied",
                legacyEvidenceStatus: "source-evidence-satisfied",
                finiteAvailable: true,
                contextRequiredCount: 0,
                legacyEvidenceRequiredCount: 0,
                requestCarriesSourceContext: "adverbial-nounstem",
                requestVerb: "(kwal)-(wia)",
                requestObjectPrefix: "ta",
            },
            {
                name: "relational-o-a",
                routeTemplateId: "relational-o-a",
                contextStatus: "source-context-satisfied",
                legacyEvidenceStatus: "source-evidence-satisfied",
                finiteAvailable: true,
                contextRequiredCount: 0,
                legacyEvidenceRequiredCount: 0,
                requestCarriesSourceContext: "compound-relational-nounstem",
                requestVerb: "(iwan)-(ua)",
                requestObjectPrefix: "ta",
            },
            {
                name: "relational-huia",
                routeTemplateId: "relational-huia",
                contextStatus: "source-context-satisfied",
                legacyEvidenceStatus: "source-evidence-satisfied",
                finiteAvailable: true,
                contextRequiredCount: 0,
                legacyEvidenceRequiredCount: 0,
                requestCarriesSourceContext: "compound-relational-nounstem",
                requestVerb: "(iwan)-(wia)",
                requestObjectPrefix: "ta",
            },
            {
                name: "i-hui-a-hui-o-a",
                routeTemplateId: "o-a",
                contextStatus: "source-context-satisfied",
                legacyEvidenceStatus: "source-evidence-satisfied",
                finiteAvailable: true,
                contextRequiredCount: 0,
                legacyEvidenceRequiredCount: 0,
                requestCarriesSourceContext: "i-hui-a-hui-source",
                requestVerb: "(pusuk)-(ua)",
                requestObjectPrefix: "ta",
            },
        ]
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
            requestVerb: huiRouteActivation?.request?.posicionesFormula?.tronco || "",
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
    const rootYaRouteForNextSource = ctx.generateNawatDenominalAndrewsContractRoutePreview({
        sourceStem: "kal",
        contractId: "54.2.3-inceptive-stative-ya",
        sourceEvidence: {
            rootPlusYaSource: true,
            sourceState: "absolutive",
            sourceCategory: "nounstem-as-root",
            sourceSurface: "kal",
            sourceBaseStem: "kal",
            boundaries: {
                noFixtureEvidence: true,
                sourceEvidenceFromGeneratedOrdinaryNnc: true,
                sourceNounstemDowngradedToRootRank: true,
                classicalRuleSpellingsConvertedToNawat: true,
            },
        },
    })?.routes?.[0] || null;
    const rootYaActivationForNextSource = ctx.activateNawatDenominalAndrewsContractRouteTarget(
        rootYaRouteForNextSource,
        { targetTense: "presente" }
    );
    const activeRootYaContext = ctx.getActiveNawatDenominalAndrewsContractRouteContext({
        inputValue: "(kalya)",
    });
    const activeRootYaNextPreview = ctx.previewActiveNawatDenominalAndrewsContractRouteNextSource({
        inputValue: "(kalya)",
    });
    const staleRootYaNextPreview = ctx.previewActiveNawatDenominalAndrewsContractRouteNextSource({
        inputValue: "(tamati)",
    });
    const activeRootYaLiaRoute = activeRootYaNextPreview?.routePreview?.routes
        ?.find((route) => route.contractId === "54.2.3-ya-lia-causative" && route.routeTemplateId === "ya-lia");
    const activeRootYaLiaMissingObjectRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        activeRootYaLiaRoute,
        { tense: "presente" }
    );
    const activeRootYaLiaObjectRequest = ctx.buildNawatDenominalAndrewsContractRouteGenerateWordRequest(
        activeRootYaLiaRoute,
        { tense: "presente", objectPrefix: "ta" }
    );
    const activeRootYaLiaExecution = ctx.executeNawatDenominalAndrewsContractRoute(
        activeRootYaLiaRoute,
        { tense: "presente", objectPrefix: "ta" }
    );
    s.eq(
        "Andrews 54.2.3 generated root-plus-ya activation exposes ya-lia as the next source-gated object route",
        {
            activationTargetInput: rootYaActivationForNextSource?.targetInput || "",
            activationStoresActiveContext: rootYaActivationForNextSource?.boundaries?.storesActiveAndrewsRouteContext === true,
            activeContext: {
                outputKind: activeRootYaContext?.outputKind || "",
                targetInput: activeRootYaContext?.targetInput || "",
                contractId: activeRootYaContext?.contractId || "",
                routeTemplateId: activeRootYaContext?.routeTemplateId || "",
                nextSourceEvidence: activeRootYaContext?.nextSourceEvidence || null,
            },
            activeNextPreview: {
                outputKind: activeRootYaNextPreview?.outputKind || "",
                sourceStem: activeRootYaNextPreview?.routePreview?.sourceStem || "",
                finiteRouteRequestCount: activeRootYaNextPreview?.routePreview?.finiteRouteRequestCount || 0,
                finiteRouteObjectPrefixRequiredCount: activeRootYaNextPreview?.routePreview?.finiteRouteObjectPrefixRequiredCount || 0,
                finiteRouteSourceEvidenceRequiredCount: activeRootYaNextPreview?.routePreview?.finiteRouteSourceEvidenceRequiredCount || 0,
            },
            staleRootYaNextPreview,
            yaLiaRoute: {
                targetInput: activeRootYaLiaRoute?.targetInput || "",
                targetVerbStem: activeRootYaLiaRoute?.targetVerbStem || "",
                sourceRequirementStatus: activeRootYaLiaRoute?.sourceRequirement?.validationStatus || "",
                finiteAvailable: activeRootYaLiaRoute?.finiteGenerationContractAvailable === true,
                objectSlotExpected: activeRootYaLiaRoute?.objectSlotExpected === true,
            },
            missingObjectRequest: activeRootYaLiaMissingObjectRequest,
            objectRequest: {
                verb: activeRootYaLiaObjectRequest?.posicionesFormula?.tronco || "",
                objectPrefix: activeRootYaLiaObjectRequest?.posicionesFormula?.obj1 || "",
                objectSlotExpected: activeRootYaLiaObjectRequest?.denominalAndrewsContractRoute?.objectSlotExpected === true,
                canSatisfyLaterEvidence: activeRootYaLiaObjectRequest?.denominalAndrewsContractRoute?.boundaries?.canSatisfyLaterSourceEvidence === true,
            },
            execution: {
                result: activeRootYaLiaExecution?.result || "",
                contractId: activeRootYaLiaExecution?.denominalAndrewsContractRouteExecution?.contractId || "",
                objectPrefix: activeRootYaLiaExecution?.denominalAndrewsContractRouteExecution?.objectPrefix || "",
                noFixtureEvidence: activeRootYaLiaExecution?.denominalAndrewsContractRouteExecution?.boundaries?.noFixtureEvidence === true,
            },
        },
        {
            activationTargetInput: "(kalya)",
            activationStoresActiveContext: true,
            activeContext: {
                outputKind: "active-denominal-andrews-contract-route-context",
                targetInput: "(kalya)",
                contractId: "54.2.3-inceptive-stative-ya",
                routeTemplateId: "ya",
                nextSourceEvidence: {
                    yaSource: true,
                    sourceCategory: "inceptive-stative-ya-source",
                    sourceState: "derived",
                    sourceContractId: "54.2.3-inceptive-stative-ya",
                    sourceRouteTemplateId: "ya",
                    sourceBaseStem: "kal",
                    sourceVerbStem: "kalya",
                    boundaries: {
                        noFixtureEvidence: true,
                        sourceEvidenceFromAndrewsContractRoute: true,
                        classicalRuleSpellingsConvertedToNawat: true,
                        sourceEvidenceSupportsYaLiaCausative: true,
                        sourceYaDeletedBeforeLia: true,
                    },
                },
            },
            activeNextPreview: {
                outputKind: "denominal-andrews-contract-route-next-source-preview",
                sourceStem: "kal",
                finiteRouteRequestCount: 2,
                finiteRouteObjectPrefixRequiredCount: 1,
                finiteRouteSourceEvidenceRequiredCount: 19,
            },
            staleRootYaNextPreview: null,
            yaLiaRoute: {
                targetInput: "(kal)-(lia)",
                targetVerbStem: "kallia",
                sourceRequirementStatus: "source-evidence-satisfied",
                finiteAvailable: true,
                objectSlotExpected: true,
            },
            missingObjectRequest: null,
            objectRequest: {
                verb: "(kal)-(lia)",
                objectPrefix: "ta",
                objectSlotExpected: true,
                canSatisfyLaterEvidence: false,
            },
            execution: {
                result: "kallia",
                contractId: "54.2.3-ya-lia-causative",
                objectPrefix: "ta",
                noFixtureEvidence: true,
            },
        }
    );
    if (typeof ctx.clearActiveNawatDenominalAndrewsContractRouteContext === "function") {
        ctx.clearActiveNawatDenominalAndrewsContractRouteContext();
    }
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
            pendingAndrewsContractCount: 0,
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
                    surface: "",
                    surfaceTrail: "(pusuni) → pusuk → (pusukti)",
                    stageCount: 3,
                    reusableStageCount: 3,
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
                    surface: "",
                    surfaceTrail: "(pusuni) → pusuk → (pusukiwi)",
                    stageCount: 3,
                    reusableStageCount: 3,
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
                    surface: "",
                    surfaceTrail: "(pusuni) → pusuk → (pusukawi)",
                    stageCount: 3,
                    reusableStageCount: 3,
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
                    surface: "",
                    surfaceTrail: "(pusuni) → pusuk → (pusuk)-(na)",
                    stageCount: 3,
                    reusableStageCount: 3,
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
    const stripLinkedSourceContextAliases = (value) => {
        if (Array.isArray(value)) {
            return value.map(stripLinkedSourceContextAliases);
        }
        if (!value || typeof value !== "object") {
            return value;
        }
        return Object.fromEntries(Object.entries(value)
            .filter(([key]) => key !== "sourceContext" && key !== "sourceContextFromSelectedGeneratedStage")
            .map(([key, entry]) => [key, stripLinkedSourceContextAliases(entry)]));
    };
    const summarizeLinkedNextSourcePreview = (preview) => preview && ({
        outputKind: preview.outputKind,
        selectedStage: stripLinkedSourceContextAliases(preview.selectedStage),
        nextSource: stripLinkedSourceContextAliases(preview.nextSource),
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
            sourceEvidenceSupportsTiYaDeverbal: true,
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
            selectedSourceEvidence: stripLinkedSourceContextAliases(viTiVerbalizerNextPreview?.selectedStage?.sourceEvidence || null),
            selectedSourceContext: {
                category: viTiVerbalizerNextPreview?.selectedStage?.sourceContext?.sourceCategory || "",
                fromSelectedGeneratedStage: viTiVerbalizerNextPreview?.selectedStage?.sourceContext?.boundaries?.sourceContextFromSelectedGeneratedStage === true,
            },
            nextSourceEvidence: stripLinkedSourceContextAliases(viTiVerbalizerNextPreview?.nextSource?.sourceEvidence || null),
            contractPreviewSourceEvidence: stripLinkedSourceContextAliases(viTiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.sourceEvidence || null),
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
            )?.posicionesFormula?.tronco || "",
        },
        {
            selectedSourceEvidence: viTiLinkedSourceEvidence,
            selectedSourceContext: {
                category: "inceptive-stative-ti-source",
                fromSelectedGeneratedStage: true,
            },
            nextSourceEvidence: viTiLinkedSourceEvidence,
            contractPreviewSourceEvidence: viTiLinkedSourceEvidence,
            contractPreviewSourceStem: "pusuk",
            finiteRouteRequestCount: 7,
            finiteRouteObjectPrefixRequiredCount: 3,
            finiteRouteStemClassContractCount: 7,
            finiteRouteSourceEvidenceRequiredCount: 16,
            routeNoteCount: 18,
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
            selectedSourceEvidence: stripLinkedSourceContextAliases(viIwiVerbalizerNextPreview?.selectedStage?.sourceEvidence || null),
            selectedSourceContext: {
                category: viIwiVerbalizerNextPreview?.selectedStage?.sourceContext?.sourceCategory || "",
                fromSelectedGeneratedStage: viIwiVerbalizerNextPreview?.selectedStage?.sourceContext?.boundaries?.sourceContextFromSelectedGeneratedStage === true,
            },
            nextSourceEvidence: stripLinkedSourceContextAliases(viIwiVerbalizerNextPreview?.nextSource?.sourceEvidence || null),
            contractPreviewSourceEvidence: stripLinkedSourceContextAliases(viIwiVerbalizerNextPreview?.routePreview?.andrewsContractRoutePreview?.sourceEvidence || null),
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
            )?.posicionesFormula?.tronco || "",
        },
        {
            selectedSourceEvidence: {
                iHuiOrAHuiSource: true,
                sourceCategory: "i-hui-a-hui-source",
                sourceRouteFamily: "vi-iwi",
                sourceRouteId: "denominal-vi-iwi-preterit",
                sourceStageKey: "verbalizer",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukiwi",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromSelectedGeneratedStage: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            selectedSourceContext: {
                category: "i-hui-a-hui-source",
                fromSelectedGeneratedStage: true,
            },
            nextSourceEvidence: {
                iHuiOrAHuiSource: true,
                sourceCategory: "i-hui-a-hui-source",
                sourceRouteFamily: "vi-iwi",
                sourceRouteId: "denominal-vi-iwi-preterit",
                sourceStageKey: "verbalizer",
                sourceBaseStem: "pusuk",
                sourceVerbStem: "pusukiwi",
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
                sourceVerbStem: "pusukiwi",
                boundaries: {
                    noFixtureEvidence: true,
                    sourceEvidenceFromSelectedGeneratedStage: true,
                    classicalRuleSpellingsConvertedToNawat: true,
                },
            },
            contractPreviewSourceStem: "pusuk",
            finiteRouteRequestCount: 4,
            finiteRouteObjectPrefixRequiredCount: 1,
            finiteRouteStemClassContractCount: 4,
            finiteRouteSourceEvidenceRequiredCount: 19,
            routeNoteCount: 21,
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
                selectedStage: stripLinkedSourceContextAliases(step.selectedStage),
                nextSource: stripLinkedSourceContextAliases(step.nextSource),
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
                            sourceVerbStem: "pusuktiiwi",
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
                            sourceVerbStem: "pusuktiiwi",
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
                surface: "pusuktiiwitik",
                surfaceTrail: "(pusuktiiwi) → pusuktiiwi → (pusuktiiwiti) → pusuktiiwitik",
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
            appendableSelectionCount: 28,
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
            appendableSelectionCount: 28,
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
                evidenceStatus: "source-context-linked",
                resultSurface: "(pusukti)",
                diagnosticStatus: "source-context-linked",
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
            appendableSelectionCount: 28,
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
            appendableSelectionCount: 26,
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
                selectedStage: stripLinkedSourceContextAliases(step.selectedStage),
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
                linkedGrammarPath: stripLinkedSourceContextAliases(step.linkedGrammarPath),
                nextSource: stripLinkedSourceContextAliases(step.nextSource),
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
                            sourceVerb: "stale-stage-source",
                            displaySurface: "stale stage",
                        },
                        nextSource: {
                            sourceVerb: "stale-next-source",
                            displaySurface: "stale next",
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
                sourceInput: "stale-next-source",
                sourceInputDisplay: "stale next",
                generatedSurface: "frame-generated-source",
                routeId: "frame-route",
                stageKey: "verbalizer",
                fromStepIndex: 0,
            },
        ]
    );
    s.eq(
        "linked grammar path execution source options read framed next-source surfaces before stale next-source fields",
        typeof ctx.getNawatLinkedGrammarPathExecutionSourceOptions === "function"
            ? ctx.getNawatLinkedGrammarPathExecutionSourceOptions({
                outputKind: "linked-grammar-path-chain-execution",
                steps: [
                    {
                        index: 0,
                        status: "executed",
                        selection: { routeId: "next-frame-route", stageKey: "verbalizer" },
                        selectedStage: {
                            stationKey: "verbalizer",
                            sourceVerb: "stale-stage-source",
                            displaySurface: "stale stage",
                        },
                        nextSource: {
                            sourceVerb: "stale-next-source",
                            displaySurface: "stale next",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: true,
                                    surfaceForms: ["frame-next-source"],
                                }),
                            }),
                        },
                        generated: {
                            result: "",
                            surfaceForms: [],
                        },
                    },
                ],
            })
            : [],
        [
            {
                sourceVerb: "frame-next-source",
                sourceObjectPrefix: "",
                displaySurface: "frame-next-source",
                sourceInput: "frame-next-source",
                sourceInputDisplay: "frame-next-source",
                generatedSurface: "",
                routeId: "next-frame-route",
                stageKey: "verbalizer",
                fromStepIndex: 0,
            },
        ]
    );
    s.eq(
        "linked grammar path execution source options suppress stale next-source and selected-stage fields for an empty next-source result frame",
        typeof ctx.getNawatLinkedGrammarPathExecutionSourceOptions === "function"
            ? ctx.getNawatLinkedGrammarPathExecutionSourceOptions({
                outputKind: "linked-grammar-path-chain-execution",
                steps: [
                    {
                        index: 0,
                        status: "executed",
                        selection: { routeId: "empty-next-frame-route" },
                        selectedStage: {
                            stationKey: "verbalizer",
                            sourceVerb: "stale-stage-source",
                            displaySurface: "stale stage",
                        },
                        nextSource: {
                            sourceVerb: "stale-next-source",
                            displaySurface: "stale next",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: false,
                                    surface: "",
                                    surfaceForms: [],
                                }),
                            }),
                        },
                        generated: {
                            result: "",
                            surfaceForms: [],
                        },
                    },
                ],
            })
            : [],
        []
    );
    s.eq(
        "linked grammar path execution source options suppress stale next-source fields for an empty LCM result frame",
        typeof ctx.getNawatLinkedGrammarPathExecutionSourceOptions === "function"
            ? ctx.getNawatLinkedGrammarPathExecutionSourceOptions({
                outputKind: "linked-grammar-path-chain-execution",
                steps: [
                    {
                        index: 0,
                        status: "executed",
                        selection: { routeId: "empty-frame-route" },
                        selectedStage: {
                            stationKey: "verbalizer",
                            sourceVerb: "stale-stage-source",
                            displaySurface: "stale stage",
                        },
                        nextSource: {
                            sourceVerb: "stale-next-source",
                            displaySurface: "stale next",
                        },
                        generated: {
                            result: "stale-generated-result",
                            surface: "stale-generated-surface",
                            frames: ctx.buildGrammarFrame({
                                resultFrame: ctx.buildGrammarResultFrame({
                                    ok: false,
                                    surface: "",
                                    surfaceForms: [],
                                }),
                            }),
                        },
                    },
                ],
            })
            : [],
        []
    );
    s.eq(
        "linked grammar path stage helpers suppress stale next-source fields for an empty LCM result frame",
        typeof ctx.getNawatLinkedGrammarPathStageSourceVerb === "function"
            && typeof ctx.getNawatLinkedGrammarPathStageDisplaySurface === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? {
                sourceVerb: ctx.getNawatLinkedGrammarPathStageSourceVerb({
                    surface: "stale-stage-surface",
                    inputValue: "stale-input",
                    renderVerb: "stale-render",
                    nextSource: {
                        sourceVerb: "stale-source",
                        displaySurface: "stale-display",
                        frames: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                ok: false,
                                surfaceForms: [],
                            }),
                        }),
                    },
                }),
                displaySurface: ctx.getNawatLinkedGrammarPathStageDisplaySurface({
                    surface: "stale-stage-surface",
                    nextSource: {
                        displaySurface: "stale-display",
                        frames: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                ok: false,
                                surfaceForms: [],
                            }),
                        }),
                    },
                }),
            }
            : null,
        {
            sourceVerb: "",
            displaySurface: "",
        }
    );
    s.eq(
        "linked grammar path stage helpers read stage LCM result-frame surfaces before stale stage fields",
        typeof ctx.getNawatLinkedGrammarPathStageSourceVerb === "function"
            && typeof ctx.getNawatLinkedGrammarPathStageDisplaySurface === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? {
                sourceVerb: ctx.getNawatLinkedGrammarPathStageSourceVerb({
                    surface: "stale-stage-surface",
                    sourceVerb: "stale-stage-source",
                    inputValue: "stale-input",
                    renderVerb: "stale-render",
                    displaySurface: "stale-stage-display",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            surfaceForms: ["frame-stage-source"],
                        }),
                    }),
                    nextSource: {
                        sourceVerb: "stale-next-source",
                        displaySurface: "stale-next-display",
                    },
                }),
                displaySurface: ctx.getNawatLinkedGrammarPathStageDisplaySurface({
                    surface: "stale-stage-surface",
                    sourceVerb: "stale-stage-source",
                    displaySurface: "stale-stage-display",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            surfaceForms: ["frame-stage-display"],
                        }),
                    }),
                    nextSource: {
                        displaySurface: "stale-next-display",
                    },
                }),
            }
            : null,
        {
            sourceVerb: "frame-stage-source",
            displaySurface: "frame-stage-display",
        }
    );
    s.eq(
        "linked grammar path stage helpers suppress stale stage fields for an empty LCM result frame",
        typeof ctx.getNawatLinkedGrammarPathStageSourceVerb === "function"
            && typeof ctx.getNawatLinkedGrammarPathStageDisplaySurface === "function"
            && typeof ctx.buildGrammarFrame === "function"
            && typeof ctx.buildGrammarResultFrame === "function"
            ? {
                sourceVerb: ctx.getNawatLinkedGrammarPathStageSourceVerb({
                    surface: "stale-stage-surface",
                    sourceVerb: "stale-stage-source",
                    inputValue: "stale-input",
                    renderVerb: "stale-render",
                    displaySurface: "stale-stage-display",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: false,
                            surfaceForms: [],
                        }),
                    }),
                    nextSource: {
                        sourceVerb: "stale-next-source",
                        displaySurface: "stale-next-display",
                    },
                }),
                displaySurface: ctx.getNawatLinkedGrammarPathStageDisplaySurface({
                    surface: "stale-stage-surface",
                    sourceVerb: "stale-stage-source",
                    displaySurface: "stale-stage-display",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: false,
                            surfaceForms: [],
                        }),
                    }),
                    nextSource: {
                        displaySurface: "stale-next-display",
                    },
                }),
            }
            : null,
        {
            sourceVerb: "",
            displaySurface: "",
        }
    );
    const framedLinkedStageRequest = typeof ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest === "function"
        && typeof ctx.buildGrammarFrame === "function"
        && typeof ctx.buildGrammarResultFrame === "function"
        ? ctx.buildNawatLinkedGrammarPathStageGenerateWordRequest({
            surface: "stale-stage-surface",
            inputValue: "stale-input",
            renderVerb: "stale-render",
            nextSource: {
                sourceVerb: "stale-source",
                displaySurface: "stale-display",
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
        "linked grammar path stage generation requests read LCM result-frame source surfaces before stale stage fields",
        framedLinkedStageRequest ? (() => {
            const frame = framedLinkedStageRequest.linkedGrammarPathStage?.grammarFrame
                || framedLinkedStageRequest.linkedGrammarPathStage?.frames
                || null;
            return {
                inputVerb: framedLinkedStageRequest.posicionesFormula?.tronco || "",
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
            surface: "stale-stage-surface",
            inputValue: "stale-input",
            renderVerb: "stale-render",
            nextSource: {
                sourceVerb: "stale-source",
                displaySurface: "stale-display",
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
        "linked grammar path stage generation requests suppress stale source fields for an empty LCM result frame",
        emptyFramedLinkedStageRequest,
        null
    );
    const framedPromotedInputCalls = [];
    s.eq(
        "linked grammar path promoted source input reads LCM result-frame surfaces before stale source fields",
        typeof ctx.applyNawatLinkedGrammarPathSourceInput === "function"
            ? {
                result: ctx.applyNawatLinkedGrammarPathSourceInput({
                    sourceVerb: "stale-promoted-source",
                    inputValue: "stale-promoted-input",
                    displaySurface: "stale-promoted-display",
                    generatedSurface: "stale-generated-surface",
                    sourceObjectPrefix: "k",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: true,
                            surfaceForms: ["frame-promoted-source"],
                        }),
                    }),
                }, {
                    inputApplier: (sourceVerb, sourceContext) => {
                        framedPromotedInputCalls.push({
                            sourceVerb,
                            displaySurface: sourceContext.displaySurface,
                            generatedSurface: sourceContext.generatedSurface,
                            sourceObjectPrefix: sourceContext.sourceObjectPrefix,
                        });
                    },
                }),
                calls: framedPromotedInputCalls,
            }
            : null,
        {
            result: {
                applied: true,
                method: "input-applier",
                sourceVerb: "frame-promoted-source",
                sourceObjectPrefix: "k",
            },
            calls: [
                {
                    sourceVerb: "frame-promoted-source",
                    displaySurface: "frame-promoted-source",
                    generatedSurface: "frame-promoted-source",
                    sourceObjectPrefix: "k",
                },
            ],
        }
    );
    const emptyPromotedInputCalls = [];
    s.eq(
        "linked grammar path promoted source input suppresses stale fields for an empty LCM result frame",
        typeof ctx.applyNawatLinkedGrammarPathSourceInput === "function"
            ? {
                result: ctx.applyNawatLinkedGrammarPathSourceInput({
                    sourceVerb: "stale-promoted-source",
                    inputValue: "stale-promoted-input",
                    displaySurface: "stale-promoted-display",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            ok: false,
                            surfaceForms: [],
                        }),
                    }),
                }, {
                    inputApplier: (sourceVerb) => {
                        emptyPromotedInputCalls.push(sourceVerb);
                    },
                }),
                calls: emptyPromotedInputCalls,
            }
            : null,
        {
            result: {
                applied: false,
                method: "",
                sourceVerb: "",
                reason: "missing-source",
            },
            calls: [],
        }
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
            appendableSelectionCount: 19,
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
                            sourceVerbStem: "pusuktiiwi",
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
                            sourceVerbStem: "pusuktiiwi",
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
                            sourceVerbStem: "pusuktiiwi",
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
        "stale adverb tense remains outside the nawat rail",
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
    s.eq(
        "#2 Formula CNV tabs keep only Andrews slot-backed finite categories",
        ctx.getTenseOrderForMode(ctx.TENSE_MODE.verbo),
        ["presente", "optativo", "presente-habitual", "imperfecto", "preterito", "pasado-remoto", "futuro"]
    );
    s.eq(
        "#2 Formula CNN tabs keep nominal route/state families, not function or tense aliases",
        ctx.getTenseOrderForMode(ctx.TENSE_MODE.sustantivo),
        [
            "sustantivo-verbal",
            "agentivo",
            "agentivo-presente",
            "agentivo-preterito",
            "agentivo-futuro",
            "patientivo",
            "instrumentivo",
            "predicado-nominal",
            "calificativo-instrumentivo",
            "locativo-temporal",
            "locativo-agentivo-preterito",
        ]
    );
    s.ok(
        "predicado-nominal remains selectable when the nominal source scope is nonactive",
        ctx.getNounTenseOrderForCombinedMode(ctx.COMBINED_MODE.nonactive, ctx.TENSE_MODE.sustantivo)
            .includes("predicado-nominal")
    );
    const directPreteritRoute = ctx.getNawatRouteProfile("direct-active-preterit");
    s.eq("direct active preterit route resolves route tense", directPreteritRoute.routeTenseValue, "adjetivo-preterito");
    s.eq(
        "function-named route profiles are rerouted to Andrews formal owners",
        ctx.getNawatRouteProfiles()
            .filter((profile) => profile.routeTenseValue)
            .map((profile) => ({
                id: profile.id,
                routeMode: profile.routeMode || "",
                targetMode: profile.targetMode || "",
                sourceMode: profile.sourceMode || "",
                routeFunctionMode: profile.routeFunctionMode || "",
            }))
            .filter((profile) => (
                profile.routeMode === "adjetivo"
                || profile.routeMode === "adverbio"
                || profile.targetMode === "adjetivo"
                || profile.targetMode === "adverbio"
                || profile.sourceMode === "adjetivo"
                || profile.sourceMode === "adverbio"
                || (profile.id === "direct-active-preterit" && (profile.routeMode !== "verbo" || profile.routeFunctionMode !== "adjetivo"))
                || (profile.id === "patientivo-nonactive-ti" && (profile.routeMode !== "sustantivo" || profile.routeFunctionMode !== "adjetivo"))
            )),
        []
    );
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
        "CNV -> CNV"
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
    const directPreteritSurfaceResult = ctx.getNawatRouteFiniteSurfaceResult(directPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: directPreteritTarget,
    });
    s.eq(
        "direct active preterit route finite surface consumes structural Class A preterit frame",
        {
            surface: directPreteritSurfaceResult.surface,
            stage: directPreteritSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            sourceVerb: directPreteritSurfaceResult.sourceResult?.directPreteritSourceFrame?.sourceVerbFrame?.text || "",
            targetBase: directPreteritSurfaceResult.sourceResult?.directPreteritSourceFrame?.targetBaseFrame?.text || "",
            suffix: directPreteritSurfaceResult.sourceResult?.directPreteritSourceFrame?.suffixFrame?.text || "",
        },
        {
            surface: "pusunki",
            stage: "finite-surface-direct-preterit-structural",
            sourceVerb: "pusuni",
            targetBase: "pusun",
            suffix: "ki",
        }
    );
    const poisonedDirectPreteritTarget = {
        ...directPreteritTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        directPreteritSourceFrame: {
            ...directPreteritTarget.directPreteritSourceFrame,
            targetSurface: "poison",
        },
    };
    s.eq(
        "direct active preterit route ignores poisoned display fields when source frame is unchanged",
        ctx.getNawatRouteFiniteSurfaceForm(directPreteritRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: poisonedDirectPreteritTarget,
        }),
        "pusunki"
    );
    const originalDirectPreteritNuclearExecutor = ctx.executeNuclearClauseSurfaceRequest;
    try {
        ctx.executeNuclearClauseSurfaceRequest = () => ({
            result: "poison",
            surface: "poison",
            surfaceForms: ["poison"],
        });
        s.eq(
            "direct active preterit route ignores poisoned legacy nuclear string executor",
            ctx.getNawatRouteFiniteSurfaceForm(directPreteritRoute, {
                sourceVerb: "(pusuni)",
                routeTarget: poisonedDirectPreteritTarget,
            }),
            "pusunki"
        );
    } finally {
        ctx.executeNuclearClauseSurfaceRequest = originalDirectPreteritNuclearExecutor;
    }
    const directPreteritNoFrameResult = ctx.getNawatRouteFiniteSurfaceResult(directPreteritRoute, {
        sourceVerb: "(pusuni)",
    });
    s.eq(
        "direct active preterit route blocks direct string API without source frame",
        {
            surface: directPreteritNoFrameResult.surface,
            stage: directPreteritNoFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: directPreteritNoFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-direct-preterit-structural-blocked",
            diagnostic: "nawat-route-direct-preterit-missing-source-frame",
        }
    );
    const directPreteritNoOperationResult = ctx.getNawatRouteFiniteSurfaceResult(directPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: {
            ...directPreteritTarget,
            directPreteritSourceFrame: {
                ...directPreteritTarget.directPreteritSourceFrame,
                operationFrame: null,
            },
        },
    });
    s.eq(
        "direct active preterit route missing operation frame blocks string fallback",
        {
            surface: directPreteritNoOperationResult.surface,
            stage: directPreteritNoOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: directPreteritNoOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-direct-preterit-structural-blocked",
            diagnostic: "nawat-route-direct-preterit-missing-operation-frame",
        }
    );
    const directPreteritContradictoryFrameResult = ctx.getNawatRouteFiniteSurfaceResult(directPreteritRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: {
            ...directPreteritTarget,
            directPreteritSourceFrame: {
                ...directPreteritTarget.directPreteritSourceFrame,
                targetBaseFrame: {
                    ...directPreteritTarget.directPreteritSourceFrame.targetBaseFrame,
                    text: "poison",
                },
            },
        },
    });
    s.eq(
        "direct active preterit route contradictory target base frame blocks string fallback",
        {
            surface: directPreteritContradictoryFrameResult.surface,
            stage: directPreteritContradictoryFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: directPreteritContradictoryFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-direct-preterit-structural-blocked",
            diagnostic: "nawat-route-direct-preterit-contradictory-source-frame",
        }
    );
    const directPerfectRoute = ctx.getNawatRouteProfile("direct-active-perfect");
    s.eq(
        "direct active perfect route keeps source only because Andrews blocks the finite extension",
        ctx.formatNawatRouteSurfaceTrailLabel(directPerfectRoute, {
            sourceVerb: "(pusuni)",
        }),
        "(pusuni)"
    );
    s.eq(
        "poisoned verbalizer route cannot infer target verb by stripping finite surface strings",
        (() => {
            const poisonedProfile = {
                ...directPreteritRoute,
                id: "poisoned-finite-surface-verbalizer",
                routePlacement: "direct-finite",
                routeTenseValue: "preterito",
                routeMode: "verbo",
                targetMode: "verbo",
                targetTenseValue: "preterito",
                verbalizer: "-ti",
                surfaceSuffix: "-ki",
                valency: "intransitive",
            };
            const stringOnly = ctx.resolveNawatRouteTarget(poisonedProfile, {
                sourceVerb: "(paka)",
            });
            const explicitStem = ctx.resolveNawatRouteTarget(poisonedProfile, {
                sourceVerb: "(paka)",
                sourceStem: "kal",
            });
            return {
                stringOnlyTargetVerb: stringOnly?.targetVerb || "",
                stringOnlyGate: stringOnly?.targetVerbSourceFrame?.status || "",
                stringOnlyDiagnostic: stringOnly?.targetVerbSourceFrame?.diagnosticId || "",
                blocksFiniteSuffixInference: stringOnly?.targetVerbSourceFrame?.boundaries?.noFiniteSurfaceSuffixInference === true,
                explicitStemTargetVerb: explicitStem?.targetVerb || "",
                explicitStemGate: explicitStem?.targetVerbSourceFrame?.status || "",
                explicitStemSourceKind: explicitStem?.targetVerbSourceFrame?.sourceKind || "",
            };
        })(),
        {
            stringOnlyTargetVerb: "",
            stringOnlyGate: "blocked",
            stringOnlyDiagnostic: "nawat-route-verbalized-verb-structural-source-required",
            blocksFiniteSuffixInference: true,
            explicitStemTargetVerb: "kalti",
            explicitStemGate: "authorized",
            explicitStemSourceKind: "explicit-source-stem",
        }
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
        "CNV -> CNN"
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
        "(pusuni) → pusuniwa → patientivo · pasivo → -ti → pusuniti"
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
        "patientivo noun route defaults to present source input but derives output from the source VNC core",
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
        "patientivo imperfective noun route displays the finite source row but derives from the VNC core",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoImperfectiveNounRoute, {
            sourceVerb: "(kuchi)",
            sourceTenseValue: "imperfecto",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: patientivoImperfectiveNounTarget,
        }),
        "(kuchi) → kuchiya → patientivo · imperfectivo → -t → kuchit"
    );
    const patientivoImperfectiveSourceSurfaceResult = ctx.getNawatRouteSourceSurfaceResult(patientivoImperfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        routeTarget: patientivoImperfectiveNounTarget,
    });
    const patientivoImperfectiveFiniteSurfaceResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoImperfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        routeTarget: patientivoImperfectiveNounTarget,
    });
    s.eq(
        "patientivo imperfective noun route consumes structural source-stem frame",
        {
            sourceSurface: patientivoImperfectiveSourceSurfaceResult.surface,
            sourceRouteStage: patientivoImperfectiveSourceSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            finiteSurface: patientivoImperfectiveFiniteSurfaceResult.surface,
            finiteRouteStage: patientivoImperfectiveFiniteSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            targetStem: patientivoImperfectiveFiniteSurfaceResult.sourceResult?.patientivoImperfectiveSourceFrame?.targetStemFrame?.text || "",
            suffix: patientivoImperfectiveFiniteSurfaceResult.sourceResult?.patientivoImperfectiveSourceFrame?.suffixFrame?.text || "",
        },
        {
            sourceSurface: "kuchiya",
            sourceRouteStage: "source-surface-patientivo-imperfective-structural",
            finiteSurface: "kuchit",
            finiteRouteStage: "finite-surface",
            targetStem: "kuchi",
            suffix: "t",
        }
    );
    const poisonedPatientivoImperfectiveTarget = {
        ...patientivoImperfectiveNounTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        patientivoImperfectiveSourceFrame: {
            ...patientivoImperfectiveNounTarget.patientivoImperfectiveSourceFrame,
            targetSurface: "poison",
            result: "poison",
            surface: "poison",
            formulaEcho: "#poison#",
        },
    };
    s.eq(
        "patientivo imperfective noun route ignores poisoned display strings when source frame is unchanged",
        {
            sourceSurface: ctx.getNawatRouteSourceSurfaceForm(patientivoImperfectiveNounRoute, {
                sourceVerb: "(kuchi)",
                routeTarget: poisonedPatientivoImperfectiveTarget,
            }),
            finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(patientivoImperfectiveNounRoute, {
                sourceVerb: "(kuchi)",
                routeTarget: poisonedPatientivoImperfectiveTarget,
            }),
        },
        {
            sourceSurface: "kuchiya",
            finiteSurface: "kuchit",
        }
    );
    const originalPatientivoImperfectiveNuclearExecutor = ctx.executeNuclearClauseSurfaceRequest;
    try {
        ctx.executeNuclearClauseSurfaceRequest = () => ({
            result: "poison",
            surface: "poison",
            surfaceForms: ["poison"],
            num1Num2: { surface: "poison" },
        });
        s.eq(
            "patientivo imperfective noun route ignores poisoned legacy patientivo string executor",
            {
                sourceSurface: ctx.getNawatRouteSourceSurfaceForm(patientivoImperfectiveNounRoute, {
                    sourceVerb: "(kuchi)",
                    routeTarget: poisonedPatientivoImperfectiveTarget,
                }),
                finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(patientivoImperfectiveNounRoute, {
                    sourceVerb: "(kuchi)",
                    routeTarget: poisonedPatientivoImperfectiveTarget,
                }),
            },
            {
                sourceSurface: "kuchiya",
                finiteSurface: "kuchit",
            }
        );
    } finally {
        ctx.executeNuclearClauseSurfaceRequest = originalPatientivoImperfectiveNuclearExecutor;
    }
    const patientivoImperfectiveNoFrameResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoImperfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        routeTarget: {
            ...patientivoImperfectiveNounTarget,
            patientivoImperfectiveSourceFrame: null,
        },
    });
    s.eq(
        "patientivo imperfective noun route blocks selected structural route without source frame",
        {
            surface: patientivoImperfectiveNoFrameResult.surface,
            stage: patientivoImperfectiveNoFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoImperfectiveNoFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-imperfective-structural-blocked",
            diagnostic: "nawat-route-patientivo-imperfective-missing-source-frame",
        }
    );
    const patientivoImperfectiveNoOperationResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoImperfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        routeTarget: {
            ...patientivoImperfectiveNounTarget,
            patientivoImperfectiveSourceFrame: {
                ...patientivoImperfectiveNounTarget.patientivoImperfectiveSourceFrame,
                operationFrame: null,
            },
        },
    });
    s.eq(
        "patientivo imperfective noun route missing operation frame blocks string fallback",
        {
            surface: patientivoImperfectiveNoOperationResult.surface,
            stage: patientivoImperfectiveNoOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoImperfectiveNoOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-imperfective-structural-blocked",
            diagnostic: "nawat-route-patientivo-imperfective-missing-operation-frame",
        }
    );
    const patientivoImperfectiveContradictoryResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoImperfectiveNounRoute, {
        sourceVerb: "(kuchi)",
        routeTarget: {
            ...patientivoImperfectiveNounTarget,
            patientivoImperfectiveSourceFrame: {
                ...patientivoImperfectiveNounTarget.patientivoImperfectiveSourceFrame,
                targetStemFrame: {
                    ...patientivoImperfectiveNounTarget.patientivoImperfectiveSourceFrame.targetStemFrame,
                    text: "poison",
                },
            },
        },
    });
    s.eq(
        "patientivo imperfective noun route contradictory target frame blocks string fallback",
        {
            surface: patientivoImperfectiveContradictoryResult.surface,
            stage: patientivoImperfectiveContradictoryResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoImperfectiveContradictoryResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-imperfective-structural-blocked",
            diagnostic: "nawat-route-patientivo-imperfective-contradictory-source-frame",
        }
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
            targetStem: patientivoPerfectiveFiniteSurfaceResult.sourceResult?.patientivoPerfectiveSourceFrame?.targetStemFrame?.text || "",
            suffix: patientivoPerfectiveFiniteSurfaceResult.sourceResult?.patientivoPerfectiveSourceFrame?.suffixFrame?.text || "",
        },
        {
            sourceSurface: "ketzki",
            sourceRouteStage: "source-surface-patientivo-perfective-structural",
            finiteSurface: "ketzti",
            finiteRouteStage: "finite-surface",
            authorityRef: "Andrews Lesson 39",
            generationAllowed: true,
            targetStem: "ketz",
            suffix: "ti",
        }
    );
    const poisonedPatientivoPerfectiveTarget = {
        ...patientivoPerfectiveNounTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        patientivoPerfectiveSourceFrame: {
            ...patientivoPerfectiveNounTarget.patientivoPerfectiveSourceFrame,
            targetSurface: "poison",
            result: "poison",
            surface: "poison",
            formulaEcho: "#poison#",
        },
    };
    s.eq(
        "patientivo perfective noun route ignores poisoned display strings when source frame is unchanged",
        {
            sourceSurface: ctx.getNawatRouteSourceSurfaceForm(patientivoPerfectiveNounRoute, {
                sourceVerb: "(ketza)",
                routeTarget: poisonedPatientivoPerfectiveTarget,
            }),
            finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(patientivoPerfectiveNounRoute, {
                sourceVerb: "(ketza)",
                routeTarget: poisonedPatientivoPerfectiveTarget,
            }),
        },
        {
            sourceSurface: "ketzki",
            finiteSurface: "ketzti",
        }
    );
    const originalPatientivoPerfectiveNuclearExecutor = ctx.executeNuclearClauseSurfaceRequest;
    try {
        ctx.executeNuclearClauseSurfaceRequest = () => ({
            result: "poison",
            surface: "poison",
            surfaceForms: ["poison"],
            num1Num2: { surface: "poison" },
        });
        s.eq(
            "patientivo perfective noun route ignores poisoned legacy patientivo string executor",
            {
                sourceSurface: ctx.getNawatRouteSourceSurfaceForm(patientivoPerfectiveNounRoute, {
                    sourceVerb: "(ketza)",
                    routeTarget: poisonedPatientivoPerfectiveTarget,
                }),
                finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(patientivoPerfectiveNounRoute, {
                    sourceVerb: "(ketza)",
                    routeTarget: poisonedPatientivoPerfectiveTarget,
                }),
            },
            {
                sourceSurface: "ketzki",
                finiteSurface: "ketzti",
            }
        );
    } finally {
        ctx.executeNuclearClauseSurfaceRequest = originalPatientivoPerfectiveNuclearExecutor;
    }
    const patientivoPerfectiveNoFrameResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPerfectiveNounRoute, {
        sourceVerb: "(ketza)",
    });
    s.eq(
        "patientivo perfective noun route blocks direct string API without source frame",
        {
            surface: patientivoPerfectiveNoFrameResult.surface,
            stage: patientivoPerfectiveNoFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoPerfectiveNoFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-perfective-structural-blocked",
            diagnostic: "nawat-route-patientivo-perfective-missing-source-frame",
        }
    );
    const patientivoPerfectiveNoOperationResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPerfectiveNounRoute, {
        sourceVerb: "(ketza)",
        routeTarget: {
            ...patientivoPerfectiveNounTarget,
            patientivoPerfectiveSourceFrame: {
                ...patientivoPerfectiveNounTarget.patientivoPerfectiveSourceFrame,
                operationFrame: null,
            },
        },
    });
    s.eq(
        "patientivo perfective noun route missing operation frame blocks string fallback",
        {
            surface: patientivoPerfectiveNoOperationResult.surface,
            stage: patientivoPerfectiveNoOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoPerfectiveNoOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-perfective-structural-blocked",
            diagnostic: "nawat-route-patientivo-perfective-missing-operation-frame",
        }
    );
    const patientivoPerfectiveContradictoryResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPerfectiveNounRoute, {
        sourceVerb: "(ketza)",
        routeTarget: {
            ...patientivoPerfectiveNounTarget,
            patientivoPerfectiveSourceFrame: {
                ...patientivoPerfectiveNounTarget.patientivoPerfectiveSourceFrame,
                targetStemFrame: {
                    ...patientivoPerfectiveNounTarget.patientivoPerfectiveSourceFrame.targetStemFrame,
                    text: "poison",
                },
            },
        },
    });
    s.eq(
        "patientivo perfective noun route contradictory target frame blocks string fallback",
        {
            surface: patientivoPerfectiveContradictoryResult.surface,
            stage: patientivoPerfectiveContradictoryResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoPerfectiveContradictoryResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-perfective-structural-blocked",
            diagnostic: "nawat-route-patientivo-perfective-contradictory-source-frame",
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
        "(kuchi) → patientivo · perfectivo"
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
        "(kuchi) → kuchiwak → patientivo · pasivo → -t → kuchit"
    );
    const kuchiVerbNounRouteExpectations = [
        ["active", "presente", "kuchit"],
        ["active", "presente-habitual", "kuchit"],
        ["active", "presente-desiderativo", "kuchit"],
        ["active", "imperfecto", "kuchit"],
        ["active", "preterito", ""],
        ["active", "pasado-remoto", "kuchit"],
        ["active", "perfecto", ""],
        ["active", "pluscuamperfecto", ""],
        ["active", "condicional-perfecto", ""],
        ["active", "futuro", "kuchit"],
        ["active", "condicional", "kuchit"],
        ["active", "optativo", "kuchit"],
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
        ["nonactive", "optativo", "kuchit"],
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
    s.eq(
        "patientivo tronco-verbal source gate is root/stock and does not collapse to imperfective route",
        {
            routeSpec: ctx.resolveNawatPatientivoRouteSpec({ patientivoSource: "tronco-verbal" }),
            defaultSourceTense: ctx.getCanonicalNawatPatientivoSourceTenseValue("tronco-verbal"),
            sourceMode: ctx.getNominalSourceModeForTense("patientivo", { patientivoSource: "tronco-verbal" }),
        },
        {
            routeSpec: {
                sourceTenseValue: "",
                sourceCombinedMode: ctx.COMBINED_MODE.active,
                patientivoSource: "tronco-verbal",
                routeKey: "",
                suffix: "",
                surfaceSuffix: "",
            },
            defaultSourceTense: "",
            sourceMode: ctx.COMBINED_MODE.active,
        }
    );
    s.eq(
        "patientivo nonactive-core path preserves passive/impersonal source gates and Andrews authority",
        (() => {
            const route = ctx.getNawatRouteProfile("patientivo-nonactive-t");
            const summarize = (patientivoSource) => {
                const routeTarget = ctx.resolveNawatRouteTarget(route, {
                    sourceVerb: "-(mati)",
                    sourceObjectPrefix: "ta",
                    sourceTenseValue: "preterito",
                    sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
                    patientivoSource,
                });
                const stations = ctx.getNawatRouteStationModels(route, {
                    sourceVerb: "-(mati)",
                    sourceObjectPrefix: "ta",
                    routeTarget,
                });
                const sourceSurface = ctx.getNawatRouteSourceSurfaceResult(route, {
                    sourceVerb: "-(mati)",
                    sourceObjectPrefix: "ta",
                    routeTarget,
                });
                const nominalSurface = ctx.getNawatVerbNounConversionNominalSurfaceResult(route, {
                    sourceVerb: "-(mati)",
                    sourceObjectPrefix: "ta",
                    routeTarget,
                });
                return {
                    targetBranch: routeTarget.activePatientivoBranch,
                    stationBranch: stations.find((station) => station.key === "patientivo-branch")?.patientivoSource || "",
                    stationSurface: stations.find((station) => station.key === "patientivo-branch")?.surface || "",
                    sourceFormula: sourceSurface.sourceResult?.nuclearClauseShell?.formulaEcho || "",
                    nominalFormula: nominalSurface.sourceResult?.nuclearClauseShell?.formulaEcho || "",
                    nominalSurface: nominalSurface.surface || "",
                    family: nominalSurface.sourceResult?.nominalizationProfile?.patientiveFamilyProfile?.family || "",
                    sourceStage: nominalSurface.sourceResult?.nominalizationProfile?.patientiveSourceStageFrame?.slot || "",
                    authorityRef: nominalSurface.grammarFrame?.authorityFrame?.andrewsRefs?.[0] || "",
                };
            };
            return {
                passive: summarize("passive"),
                impersonal: summarize("impersonal"),
            };
        })(),
        {
            passive: {
                targetBranch: "passive",
                stationBranch: "passive",
                stationSurface: "patientivo · pasivo",
                sourceFormula: "#Ø-Ø(machu)Ø+k-0#",
                nominalFormula: "#Ø-Ø(machi)t#",
                nominalSurface: "machit",
                family: "passive",
                sourceStage: "#3 salida",
                authorityRef: "Andrews Lesson 37",
            },
            impersonal: {
                targetBranch: "impersonal",
                stationBranch: "impersonal",
                stationSurface: "patientivo · impersonal",
                sourceFormula: "#Ø-Ø(machu)Ø+k-0#",
                nominalFormula: "#Ø-Ø(tamachi)t#",
                nominalSurface: "tamachit",
                family: "impersonal",
                sourceStage: "#3 salida",
                authorityRef: "Andrews Lesson 38",
            },
        }
    );
    const patientivoPassiveNonactiveRoute = ctx.getNawatRouteProfile("patientivo-nonactive-t");
    const patientivoPassiveNonactiveTarget = ctx.resolveNawatRouteTarget(patientivoPassiveNonactiveRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "ta",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
        patientivoSource: "passive",
    });
    const patientivoPassiveSourceSurfaceResult = ctx.getNawatRouteSourceSurfaceResult(patientivoPassiveNonactiveRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "ta",
        routeTarget: patientivoPassiveNonactiveTarget,
    });
    const patientivoPassiveFiniteSurfaceResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPassiveNonactiveRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "ta",
        routeTarget: patientivoPassiveNonactiveTarget,
    });
    s.eq(
        "patientivo passive nonactive noun route consumes structural source frame",
        {
            sourceSurface: patientivoPassiveSourceSurfaceResult.surface,
            sourceRouteStage: patientivoPassiveSourceSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            finiteSurface: patientivoPassiveFiniteSurfaceResult.surface,
            finiteRouteStage: patientivoPassiveFiniteSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            sourceBase: patientivoPassiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveSourceFrame?.sourceBaseFrame?.text || "",
            sourceEnding: patientivoPassiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveSourceFrame?.sourceEndingFrame?.text || "",
            targetStem: patientivoPassiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveSourceFrame?.targetStemFrame?.text || "",
            operation: patientivoPassiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveOperationFrame?.operation || "",
        },
        {
            sourceSurface: "machu",
            sourceRouteStage: "source-surface-patientivo-nonactive-structural",
            finiteSurface: "machit",
            finiteRouteStage: "finite-surface",
            sourceBase: "ma",
            sourceEnding: "ti",
            targetStem: "machi",
            operation: "append-nonactive-patientivo-suffix-to-source-stem-frame",
        }
    );
    const poisonedPatientivoPassiveNonactiveTarget = {
        ...patientivoPassiveNonactiveTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        patientivoNonactiveSourceFrame: {
            ...patientivoPassiveNonactiveTarget.patientivoNonactiveSourceFrame,
            targetSurface: "poison",
            result: "poison",
            surface: "poison",
            formulaEcho: "#poison#",
        },
    };
    s.eq(
        "patientivo passive nonactive noun route ignores poisoned display strings when source frame is unchanged",
        {
            sourceSurface: ctx.getNawatRouteSourceSurfaceForm(patientivoPassiveNonactiveRoute, {
                sourceVerb: "-(mati)",
                sourceObjectPrefix: "ta",
                routeTarget: poisonedPatientivoPassiveNonactiveTarget,
            }),
            finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(patientivoPassiveNonactiveRoute, {
                sourceVerb: "-(mati)",
                sourceObjectPrefix: "ta",
                routeTarget: poisonedPatientivoPassiveNonactiveTarget,
            }),
        },
        {
            sourceSurface: "machu",
            finiteSurface: "machit",
        }
    );
    const originalPatientivoNonactiveNuclearExecutor = ctx.executeNuclearClauseSurfaceRequest;
    try {
        ctx.executeNuclearClauseSurfaceRequest = () => ({
            result: "poison",
            surface: "poison",
            surfaceForms: ["poison"],
            num1Num2: { surface: "poison" },
        });
        s.eq(
            "patientivo passive nonactive noun route ignores poisoned legacy patientivo string executor",
            {
                sourceSurface: ctx.getNawatRouteSourceSurfaceForm(patientivoPassiveNonactiveRoute, {
                    sourceVerb: "-(mati)",
                    sourceObjectPrefix: "ta",
                    routeTarget: poisonedPatientivoPassiveNonactiveTarget,
                }),
                finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(patientivoPassiveNonactiveRoute, {
                    sourceVerb: "-(mati)",
                    sourceObjectPrefix: "ta",
                    routeTarget: poisonedPatientivoPassiveNonactiveTarget,
                }),
            },
            {
                sourceSurface: "machu",
                finiteSurface: "machit",
            }
        );
    } finally {
        ctx.executeNuclearClauseSurfaceRequest = originalPatientivoNonactiveNuclearExecutor;
    }
    const patientivoPassiveNoFrameResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPassiveNonactiveRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "ta",
        routeTarget: {
            ...patientivoPassiveNonactiveTarget,
            patientivoNonactiveSourceFrame: null,
        },
    });
    s.eq(
        "patientivo passive nonactive noun route blocks selected structural route without source frame",
        {
            surface: patientivoPassiveNoFrameResult.surface,
            stage: patientivoPassiveNoFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoPassiveNoFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-nonactive-structural-blocked",
            diagnostic: "nawat-route-patientivo-nonactive-missing-source-frame",
        }
    );
    const patientivoPassiveNoOperationResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPassiveNonactiveRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "ta",
        routeTarget: {
            ...patientivoPassiveNonactiveTarget,
            patientivoNonactiveSourceFrame: {
                ...patientivoPassiveNonactiveTarget.patientivoNonactiveSourceFrame,
                operationFrame: null,
            },
        },
    });
    s.eq(
        "patientivo passive nonactive noun route missing operation frame blocks string fallback",
        {
            surface: patientivoPassiveNoOperationResult.surface,
            stage: patientivoPassiveNoOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoPassiveNoOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-nonactive-structural-blocked",
            diagnostic: "nawat-route-patientivo-nonactive-missing-operation-frame",
        }
    );
    const patientivoPassiveContradictoryResult = ctx.getNawatRouteFiniteSurfaceResult(patientivoPassiveNonactiveRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "ta",
        routeTarget: {
            ...patientivoPassiveNonactiveTarget,
            patientivoNonactiveSourceFrame: {
                ...patientivoPassiveNonactiveTarget.patientivoNonactiveSourceFrame,
                targetStemFrame: {
                    ...patientivoPassiveNonactiveTarget.patientivoNonactiveSourceFrame.targetStemFrame,
                    text: "poison",
                },
            },
        },
    });
    s.eq(
        "patientivo passive nonactive noun route contradictory target frame blocks string fallback",
        {
            surface: patientivoPassiveContradictoryResult.surface,
            stage: patientivoPassiveContradictoryResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: patientivoPassiveContradictoryResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-nonactive-structural-blocked",
            diagnostic: "nawat-route-patientivo-nonactive-contradictory-source-frame",
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
        "(kuchi) → kuchka → patientivo · imperfectivo → -t → kuchit"
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
        "active imperfect-tense V→S route asks #3 salida so te maps to ta in imperfective patientivo output",
        ctx.getNawatRouteFiniteSurfaceForm(patientivoImperfectiveNounRoute, {
            sourceVerb: "-(mati)",
            sourceObjectPrefix: "te",
            routeTarget: matiTeImperfectivePatientivoTarget,
        }),
        "tamatit"
    );
    s.eq(
        "active imperfect-tense V→S trail shows generated #3 salida rather than static te reconstruction",
        ctx.formatNawatRouteSurfaceTrailLabel(patientivoImperfectiveNounRoute, {
            sourceVerb: "-(mati)",
            sourceObjectPrefix: "te",
            sourceTenseValue: "imperfecto",
            sourceCombinedMode: ctx.COMBINED_MODE.active,
            routeTarget: matiTeImperfectivePatientivoTarget,
        }),
        "-(mati) → tematiya → patientivo · imperfectivo → -t → tamatit"
    );
    const matiTeImperfectiveSourceSurface = ctx.getNawatRouteSourceSurfaceResult(patientivoImperfectiveNounRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "te",
        routeTarget: matiTeImperfectivePatientivoTarget,
    });
    const matiTeImperfectiveNominalSurface = ctx.getNawatVerbNounConversionNominalSurfaceResult(patientivoImperfectiveNounRoute, {
        sourceVerb: "-(mati)",
        sourceObjectPrefix: "te",
        routeTarget: matiTeImperfectivePatientivoTarget,
    });
    s.eq(
        "active imperfect-tense V→S path keeps Andrews imperfective-source formula and CNN patientivo formula",
        {
            sourceSurface: matiTeImperfectiveSourceSurface.surface,
            sourceTenseValue: matiTeImperfectivePatientivoTarget.sourceTenseValue || "",
            sourceFormulaType: matiTeImperfectiveSourceSurface.sourceResult?.nuclearClauseShell?.formulaType || "",
            sourceFormula: matiTeImperfectiveSourceSurface.sourceResult?.nuclearClauseShell?.formula || "",
            sourceFormulaEcho: matiTeImperfectiveSourceSurface.sourceResult?.nuclearClauseShell?.formulaEcho || "",
            sourceHasTenseSlot: Boolean(matiTeImperfectiveSourceSurface.sourceResult?.nuclearClauseShell?.formulaSlots?.tensePosition),
            nominalSurface: matiTeImperfectiveNominalSurface.surface,
            nominalFormulaType: matiTeImperfectiveNominalSurface.sourceResult?.nuclearClauseShell?.formulaType || "",
            nominalFormula: matiTeImperfectiveNominalSurface.sourceResult?.nuclearClauseShell?.formula || "",
            nominalFormulaEcho: matiTeImperfectiveNominalSurface.sourceResult?.nuclearClauseShell?.formulaEcho || "",
            nominalHasTenseSlot: Boolean(matiTeImperfectiveNominalSurface.sourceResult?.nuclearClauseShell?.formulaSlots?.tensePosition),
            patientivoSource: matiTeImperfectiveNominalSurface.sourceResult?.nominalizationProfile?.patientiveFamilyProfile?.family || "",
            sourceStage: matiTeImperfectiveNominalSurface.sourceResult?.nominalizationProfile?.patientiveSourceStageFrame?.slot || "",
            authorityRef: matiTeImperfectiveNominalSurface.grammarFrame?.authorityFrame?.andrewsRefs?.[0] || "",
        },
        {
            sourceSurface: "tematiya",
            sourceTenseValue: "imperfecto",
            sourceFormulaType: "VNC",
            sourceFormula: "#pers1-pers2+va(STEM)tns+num1-num2#",
            sourceFormulaEcho: "#Ø-Ø+te(mati)ya+Ø-Ø#",
            sourceHasTenseSlot: true,
            nominalSurface: "tamatit",
            nominalFormulaType: "NNC",
            nominalFormula: "#pers1-pers2(STEM)num1-num2#",
            nominalFormulaEcho: "#Ø-Ø(tamati)t#",
            nominalHasTenseSlot: false,
            patientivoSource: "imperfectivo",
            sourceStage: "#3 salida",
            authorityRef: "Andrews Lesson 39",
        }
    );
    const summarizePatientivoRouteShellLayers = (shell = null) => ({
        formulaType: shell?.formulaType || "",
        formula: shell?.formula || "",
        formulaEcho: shell?.formulaEcho || "",
        layerKeys: shell?.organizationalLayers?.map((entry) => entry.key) || [],
        slotKeys: Object.keys(shell?.formulaSlots || {}),
        predicateStem: shell?.formulaSlots?.predicateStem?.stem || "",
        obj1: shell?.formulaSlots?.obj1?.displayPrefix || shell?.formulaSlots?.obj1?.prefix || "",
        tenseMorph: shell?.formulaSlots?.tensePosition?.displayMorph || shell?.formulaSlots?.tensePosition?.morph || "",
        connector: shell?.formulaSlots?.num1Num2?.displayConnector || shell?.formulaSlots?.num1Num2?.connector || "",
        predicateChildren: shell?.diagramTree?.root?.children
            ?.find((entry) => entry.key === "predicate")
            ?.children
            ?.map((entry) => entry.key) || [],
    });
    s.eq(
        "active imperfect-tense/imperfective-source patientivo V→S path separates VNC core, VNC predicate, and CNN output layers",
        {
            sourceTenseValue: matiTeImperfectivePatientivoTarget.sourceTenseValue || "",
            patientivoSource: matiTeImperfectivePatientivoTarget.activePatientivoBranch || "",
            source: summarizePatientivoRouteShellLayers(matiTeImperfectiveSourceSurface.sourceResult?.nuclearClauseShell),
            patientivo: summarizePatientivoRouteShellLayers(matiTeImperfectiveNominalSurface.sourceResult?.nuclearClauseShell),
        },
        {
            sourceTenseValue: "imperfecto",
            patientivoSource: "imperfectivo",
            source: {
                formulaType: "VNC",
                formula: "#pers1-pers2+va(STEM)tns+num1-num2#",
                formulaEcho: "#Ø-Ø+te(mati)ya+Ø-Ø#",
                layerKeys: ["verbstem", "verbcore", "predicate", "vnc"],
                slotKeys: [
                    "pers1Pers2",
                    "obj1",
                    "obj2",
                    "obj3",
                    "reflexivo",
                    "predicateStem",
                    "tensePosition",
                    "num1Num2",
                ],
                predicateStem: "mati",
                obj1: "te",
                tenseMorph: "ya",
                connector: "Ø-Ø",
                predicateChildren: ["verbcore", "tense"],
            },
            patientivo: {
                formulaType: "NNC",
                formula: "#pers1-pers2(STEM)num1-num2#",
                formulaEcho: "#Ø-Ø(tamati)t#",
                layerKeys: ["nounstem", "nouncore", "nnc"],
                slotKeys: ["pers1Pers2", "predicateStem", "num1Num2"],
                predicateStem: "tamati",
                obj1: "",
                tenseMorph: "",
                connector: "t",
                predicateChildren: ["state", "stem"],
            },
        }
    );
    s.eq(
        "active patientivo source rows do not leak Andrews-licensed finite tense material into the derived CNN predicate",
        ["presente", "imperfecto", "pasado-remoto", "futuro", "optativo"].map((sourceTenseValue) => {
            const routeKey = ctx.resolveNawatVerbNounConversionRouteKeyForSource({
                sourceTenseValue,
                sourceCombinedMode: ctx.COMBINED_MODE.active,
            });
            const routeProfile = ctx.getNawatRouteProfile(routeKey);
            const routeTarget = ctx.resolveNawatRouteTarget(routeProfile, {
                sourceVerb: "-(mati)",
                sourceObjectPrefix: "te",
                sourceTenseValue,
                sourceCombinedMode: ctx.COMBINED_MODE.active,
            });
            const sourceSurface = ctx.getNawatRouteSourceSurfaceResult(routeProfile, {
                sourceVerb: "-(mati)",
                sourceObjectPrefix: "te",
                routeTarget,
            });
            const nominalSurface = ctx.getNawatVerbNounConversionNominalSurfaceResult(routeProfile, {
                sourceVerb: "-(mati)",
                sourceObjectPrefix: "te",
                routeTarget,
            });
            return {
                sourceTenseValue,
                routeKey,
                finiteSourceFormula: sourceSurface.sourceResult?.nuclearClauseShell?.formula || "",
                finiteSourceHasTenseSlot: Boolean(sourceSurface.sourceResult?.nuclearClauseShell?.formulaSlots?.tensePosition),
                nominalSurface: nominalSurface.surface || "",
                nominalFormulaEcho: nominalSurface.sourceResult?.nuclearClauseShell?.formulaEcho || "",
                nominalHasTenseSlot: Boolean(nominalSurface.sourceResult?.nuclearClauseShell?.formulaSlots?.tensePosition),
            };
        }),
        ["presente", "imperfecto", "pasado-remoto", "futuro", "optativo"].map((sourceTenseValue) => ({
            sourceTenseValue,
            routeKey: "patientivo-imperfective-t",
            finiteSourceFormula: "#pers1-pers2+va(STEM)tns+num1-num2#",
            finiteSourceHasTenseSlot: true,
            nominalSurface: "tamatit",
            nominalFormulaEcho: "#Ø-Ø(tamati)t#",
            nominalHasTenseSlot: false,
        }))
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
        "(pulua) → pululu → patientivo · pasivo → -ti → pululti"
    );
    const puluaNonactiveSourceSurfaceResult = ctx.getNawatRouteSourceSurfaceResult(puluaNonactivePatientivoRoute, {
        sourceVerb: "(pulua)",
        routeTarget: puluaNonactivePatientivoTarget,
    });
    const puluaNonactiveFiniteSurfaceResult = ctx.getNawatRouteFiniteSurfaceResult(puluaNonactivePatientivoRoute, {
        sourceVerb: "(pulua)",
        routeTarget: puluaNonactivePatientivoTarget,
    });
    s.eq(
        "pulua nonactive V→S consumes structural nonactive source frame",
        {
            sourceSurface: puluaNonactiveSourceSurfaceResult.surface,
            sourceRouteStage: puluaNonactiveSourceSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            finiteSurface: puluaNonactiveFiniteSurfaceResult.surface,
            finiteRouteStage: puluaNonactiveFiniteSurfaceResult.grammarFrame?.routeContract?.routeStage || "",
            sourceBase: puluaNonactiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveSourceFrame?.sourceBaseFrame?.text || "",
            sourceEnding: puluaNonactiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveSourceFrame?.sourceEndingFrame?.text || "",
            targetStem: puluaNonactiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveSourceFrame?.targetStemFrame?.text || "",
            suffix: puluaNonactiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveSourceFrame?.suffixFrame?.text || "",
            operation: puluaNonactiveFiniteSurfaceResult.sourceResult?.sourceResult?.patientivoNonactiveOperationFrame?.operation || "",
        },
        {
            sourceSurface: "pululu",
            sourceRouteStage: "source-surface-patientivo-nonactive-structural",
            finiteSurface: "pululti",
            finiteRouteStage: "finite-surface",
            sourceBase: "pul",
            sourceEnding: "ua",
            targetStem: "pulul",
            suffix: "ti",
            operation: "append-nonactive-patientivo-suffix-to-source-stem-frame",
        }
    );
    const poisonedPuluaNonactiveTarget = {
        ...puluaNonactivePatientivoTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        patientivoNonactiveSourceFrame: {
            ...puluaNonactivePatientivoTarget.patientivoNonactiveSourceFrame,
            targetSurface: "poison",
            result: "poison",
            surface: "poison",
            formulaEcho: "#poison#",
        },
    };
    s.eq(
        "pulua nonactive V→S ignores poisoned display strings when source frame is unchanged",
        {
            sourceSurface: ctx.getNawatRouteSourceSurfaceForm(puluaNonactivePatientivoRoute, {
                sourceVerb: "(pulua)",
                routeTarget: poisonedPuluaNonactiveTarget,
            }),
            finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(puluaNonactivePatientivoRoute, {
                sourceVerb: "(pulua)",
                routeTarget: poisonedPuluaNonactiveTarget,
            }),
        },
        {
            sourceSurface: "pululu",
            finiteSurface: "pululti",
        }
    );
    const originalPuluaNonactiveNuclearExecutor = ctx.executeNuclearClauseSurfaceRequest;
    try {
        ctx.executeNuclearClauseSurfaceRequest = () => ({
            result: "poison",
            surface: "poison",
            surfaceForms: ["poison"],
            num1Num2: { surface: "poison" },
        });
        s.eq(
            "pulua nonactive V→S ignores poisoned legacy patientivo string executor",
            {
                sourceSurface: ctx.getNawatRouteSourceSurfaceForm(puluaNonactivePatientivoRoute, {
                    sourceVerb: "(pulua)",
                    routeTarget: poisonedPuluaNonactiveTarget,
                }),
                finiteSurface: ctx.getNawatRouteFiniteSurfaceForm(puluaNonactivePatientivoRoute, {
                    sourceVerb: "(pulua)",
                    routeTarget: poisonedPuluaNonactiveTarget,
                }),
            },
            {
                sourceSurface: "pululu",
                finiteSurface: "pululti",
            }
        );
    } finally {
        ctx.executeNuclearClauseSurfaceRequest = originalPuluaNonactiveNuclearExecutor;
    }
    const puluaNonactiveNoFrameResult = ctx.getNawatRouteFiniteSurfaceResult(puluaNonactivePatientivoRoute, {
        sourceVerb: "(pulua)",
        routeTarget: {
            ...puluaNonactivePatientivoTarget,
            patientivoNonactiveSourceFrame: null,
        },
    });
    s.eq(
        "pulua nonactive V→S blocks selected structural route without source frame",
        {
            surface: puluaNonactiveNoFrameResult.surface,
            stage: puluaNonactiveNoFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: puluaNonactiveNoFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-nonactive-structural-blocked",
            diagnostic: "nawat-route-patientivo-nonactive-missing-source-frame",
        }
    );
    const puluaNonactiveNoOperationResult = ctx.getNawatRouteFiniteSurfaceResult(puluaNonactivePatientivoRoute, {
        sourceVerb: "(pulua)",
        routeTarget: {
            ...puluaNonactivePatientivoTarget,
            patientivoNonactiveSourceFrame: {
                ...puluaNonactivePatientivoTarget.patientivoNonactiveSourceFrame,
                operationFrame: null,
            },
        },
    });
    s.eq(
        "pulua nonactive V→S missing operation frame blocks string fallback",
        {
            surface: puluaNonactiveNoOperationResult.surface,
            stage: puluaNonactiveNoOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: puluaNonactiveNoOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-nonactive-structural-blocked",
            diagnostic: "nawat-route-patientivo-nonactive-missing-operation-frame",
        }
    );
    const puluaNonactiveContradictoryResult = ctx.getNawatRouteFiniteSurfaceResult(puluaNonactivePatientivoRoute, {
        sourceVerb: "(pulua)",
        routeTarget: {
            ...puluaNonactivePatientivoTarget,
            patientivoNonactiveSourceFrame: {
                ...puluaNonactivePatientivoTarget.patientivoNonactiveSourceFrame,
                targetStemFrame: {
                    ...puluaNonactivePatientivoTarget.patientivoNonactiveSourceFrame.targetStemFrame,
                    text: "poison",
                },
            },
        },
    });
    s.eq(
        "pulua nonactive V→S contradictory target frame blocks string fallback",
        {
            surface: puluaNonactiveContradictoryResult.surface,
            stage: puluaNonactiveContradictoryResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: puluaNonactiveContradictoryResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-patientivo-nonactive-structural-blocked",
            diagnostic: "nawat-route-patientivo-nonactive-contradictory-source-frame",
        }
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
        "CNV -> CNV"
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
    const nonactiveHabitualFiniteResult = ctx.getNawatRouteFiniteSurfaceResult(nonactiveHabitualRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: nonactiveHabitualTarget,
    });
    s.eq(
        "nonactive habitual route consumes structural source frame",
        {
            surface: nonactiveHabitualFiniteResult.surface,
            stage: nonactiveHabitualFiniteResult.grammarFrame?.routeContract?.routeStage || "",
            sourceStem: nonactiveHabitualFiniteResult.sourceResult?.nonactiveHabitualSourceFrame?.sourceStemFrame?.text || "",
            targetStem: nonactiveHabitualFiniteResult.sourceResult?.nonactiveHabitualSourceFrame?.targetStemFrame?.text || "",
            suffix: nonactiveHabitualFiniteResult.sourceResult?.nonactiveHabitualSourceFrame?.suffixFrame?.text || "",
            variants: nonactiveHabitualFiniteResult.sourceResult?.surfaceForms || [],
            operation: nonactiveHabitualFiniteResult.sourceResult?.nonactiveHabitualOperationFrame?.operation || "",
        },
        {
            surface: "pusuniwani",
            stage: "finite-surface-nonactive-habitual-structural",
            sourceStem: "pusuni",
            targetStem: "pusuniwa",
            suffix: "ni",
            variants: ["pusuniwani", "pusunuwani"],
            operation: "derive-nonactive-habitual-from-source-frame",
        }
    );
    const poisonedNonactiveHabitualTarget = {
        ...nonactiveHabitualTarget,
        targetVerb: "poison",
        stem: "poison",
        surface: "poison",
        result: "poison",
        formulaEcho: "#poison#",
        dataset: {
            targetVerb: "poison",
            surface: "poison",
        },
        posicionesFormula: {
            tronco: "poison",
        },
        nonactiveHabitualSourceFrame: {
            ...nonactiveHabitualTarget.nonactiveHabitualSourceFrame,
            targetSurface: "poison",
            result: "poison",
            surface: "poison",
            formulaEcho: "#poison#",
        },
    };
    s.eq(
        "nonactive habitual route ignores poisoned display strings when source frame is unchanged",
        ctx.getNawatRouteFiniteSurfaceResult(nonactiveHabitualRoute, {
            sourceVerb: "(pusuni)",
            routeTarget: poisonedNonactiveHabitualTarget,
        }).surface,
        "pusuniwani"
    );
    const originalNonactiveHabitualExecutor = ctx.executeNuclearClauseSurfaceRequest;
    ctx.executeNuclearClauseSurfaceRequest = () => ({
        result: "poison",
        surface: "poison",
        surfaceForms: ["poison"],
    });
    try {
        s.eq(
            "nonactive habitual route ignores poisoned legacy route string executor",
            ctx.getNawatRouteFiniteSurfaceResult(nonactiveHabitualRoute, {
                sourceVerb: "(pusuni)",
                routeTarget: poisonedNonactiveHabitualTarget,
            }).surface,
            "pusuniwani"
        );
    } finally {
        ctx.executeNuclearClauseSurfaceRequest = originalNonactiveHabitualExecutor;
    }
    const nonactiveHabitualNoFrameResult = ctx.getNawatRouteFiniteSurfaceResult(nonactiveHabitualRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: {
            ...nonactiveHabitualTarget,
            nonactiveHabitualSourceFrame: null,
        },
    });
    s.eq(
        "nonactive habitual route blocks selected structural route without source frame",
        {
            surface: nonactiveHabitualNoFrameResult.surface,
            stage: nonactiveHabitualNoFrameResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: nonactiveHabitualNoFrameResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-nonactive-habitual-structural-blocked",
            diagnostic: "nawat-route-nonactive-habitual-missing-source-frame",
        }
    );
    const nonactiveHabitualNoOperationResult = ctx.getNawatRouteFiniteSurfaceResult(nonactiveHabitualRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: {
            ...nonactiveHabitualTarget,
            nonactiveHabitualSourceFrame: {
                ...nonactiveHabitualTarget.nonactiveHabitualSourceFrame,
                operationFrame: null,
            },
        },
    });
    s.eq(
        "nonactive habitual route missing operation frame blocks string fallback",
        {
            surface: nonactiveHabitualNoOperationResult.surface,
            stage: nonactiveHabitualNoOperationResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: nonactiveHabitualNoOperationResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-nonactive-habitual-structural-blocked",
            diagnostic: "nawat-route-nonactive-habitual-missing-operation-frame",
        }
    );
    const nonactiveHabitualContradictoryResult = ctx.getNawatRouteFiniteSurfaceResult(nonactiveHabitualRoute, {
        sourceVerb: "(pusuni)",
        routeTarget: {
            ...nonactiveHabitualTarget,
            nonactiveHabitualSourceFrame: {
                ...nonactiveHabitualTarget.nonactiveHabitualSourceFrame,
                targetStemFrame: {
                    ...nonactiveHabitualTarget.nonactiveHabitualSourceFrame.targetStemFrame,
                    text: "poison",
                },
            },
        },
    });
    s.eq(
        "nonactive habitual route contradictory target frame blocks string fallback",
        {
            surface: nonactiveHabitualContradictoryResult.surface,
            stage: nonactiveHabitualContradictoryResult.grammarFrame?.routeContract?.routeStage || "",
            diagnostic: nonactiveHabitualContradictoryResult.diagnostics?.[0]?.id || "",
        },
        {
            surface: "",
            stage: "finite-surface-nonactive-habitual-structural-blocked",
            diagnostic: "nawat-route-nonactive-habitual-contradictory-source-frame",
        }
    );
    s.eq("route helper resolves future nawat route id", ctx.getRouteTenseForNawatRoute("denominal-vi-ti-perfect"), "adjetivo-perfecto-tik");
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
    ctx.setActiveFunctionRole("adjectival");
    ctx.setActiveUnitKind("cnn");
    s.eq("unit kind can render CNN output while function remains adjectival", {
        outputMode: ctx.getActiveTenseMode(),
        functionRole: ctx.getActiveFunctionRole(),
        unitKind: ctx.getActiveUnitKind(),
    }, {
        outputMode: ctx.TENSE_MODE.sustantivo,
        functionRole: "adjectival",
        unitKind: "cnn",
    });
    ctx.setActiveUnitKind("cnv");
    s.eq("unit kind can render CNV output while function remains adjectival", {
        outputMode: ctx.getActiveTenseMode(),
        functionRole: ctx.getActiveFunctionRole(),
        unitKind: ctx.getActiveUnitKind(),
    }, {
        outputMode: ctx.TENSE_MODE.verbo,
        functionRole: "adjectival",
        unitKind: "cnv",
    });
    ctx.setActiveEuropeanTenseMode(ctx.TENSE_MODE.adjetivo);
    ctx.setActiveNawatTenseMode(ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo);
    s.eq("unit mode click can render noun output", ctx.getActiveTenseMode(), ctx.TENSE_MODE.sustantivo);
    s.eq("unit mode click does not move function mode", ctx.getActiveFunctionMode(), ctx.TENSE_MODE.adjetivo);
    ctx.setActiveFunctionMode(ctx.TENSE_MODE.adjetivo);
    ctx.setSelectedTenseTab("adjetivo-preterito");
    s.eq("adjectival direct finite route is visibly owned by CNV", {
        mode: ctx.getActiveTenseMode(),
        formalMode: ctx.getActiveNawatTenseModeForCurrentSelection(),
        unitKind: ctx.getActiveUnitKind(),
    }, {
        mode: ctx.TENSE_MODE.verbo,
        formalMode: ctx.NAWAT_TENSE_MODE.verbo || ctx.TENSE_MODE.verbo,
        unitKind: "cnv",
    });
    ctx.setSelectedTenseTab("adjetivo-patientivo-no-activo");
    s.eq("adjectival patientive route is visibly owned by CNN", {
        mode: ctx.getActiveTenseMode(),
        formalMode: ctx.getActiveNawatTenseModeForCurrentSelection(),
        unitKind: ctx.getActiveUnitKind(),
    }, {
        mode: ctx.TENSE_MODE.sustantivo,
        formalMode: ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo,
        unitKind: "cnn",
    });
    ctx.setActiveFunctionMode(ctx.TENSE_MODE.adverbio);
    s.eq("adverbial configured route is visibly owned by CNV", {
        mode: ctx.getActiveTenseMode(),
        formalMode: ctx.getActiveNawatTenseModeForCurrentSelection(),
        unitKind: ctx.getActiveUnitKind(),
    }, {
        mode: ctx.TENSE_MODE.verbo,
        formalMode: ctx.NAWAT_TENSE_MODE.verbo || ctx.TENSE_MODE.verbo,
        unitKind: "cnv",
    });
    ctx.setActiveFunctionMode(ctx.TENSE_MODE.verbo);
    s.eq("function mode click can render verb output", ctx.getActiveTenseMode(), ctx.TENSE_MODE.verbo);
    s.eq(
        "function mode click reroutes the visible formal owner",
        ctx.getActiveNawatTenseModeForCurrentSelection(),
        ctx.NAWAT_TENSE_MODE.verbo || ctx.TENSE_MODE.verbo
    );
    ctx.setActiveTenseMode(ctx.TENSE_MODE.sustantivo);
    ctx.setActiveNawatTenseMode(ctx.NAWAT_TENSE_MODE.sustantivo || ctx.TENSE_MODE.sustantivo, { syncOutput: false });
    s.eq("patientive prelocative matrix state initializes as empty route state", ctx.getNawatRouteStateStore().activeLocativeMatrixSpecId, "");
    ctx.setActiveNawatRouteProfile("denominal-vt-na-preterit");
    s.eq("direct nawat route state is not marked as chip travel", ctx.getActiveNawatRouteProfile().activeRouteTravelSource, "");
    s.eq(
        "embedded nawat route resolves to its formal target owner",
        ctx.getActiveNawatTenseModeForCurrentSelection(),
        ctx.NAWAT_TENSE_MODE.verbo || ctx.TENSE_MODE.verbo
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
    s.eq("nawat route stem station syncs function mode to noun convention", ctx.getActiveFunctionMode(), ctx.TENSE_MODE.sustantivo);
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
    s.eq("patientivo nonactive route syncs function mode to noun convention", ctx.getActiveFunctionMode(), ctx.TENSE_MODE.sustantivo);
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
        "reduplicated result reads LCM result-frame surface before stale result text",
        {
            result: framedReduplicatedResult.result,
            surfaceForms: framedReduplicatedResult.surfaceForms,
        },
        {
            result: "tichijchipaknaj",
            surfaceForms: ["tichijchipaknaj"],
        }
    );

    const forgedTransitivitySnapshot = ctx.parseEntradaUrlSegmentString(
        "#entrada/v1/verb/(nemi)/tr/fabricated/a-stem/forged"
    );
    const previousComposerTransitivity = ctx.VerbComposerState.transitivity;
    ctx.VerbComposerState.transitivity = ctx.COMPOSER_TRANSITIVITY.transitive;
    const forgedTransitivityApplied = ctx.applyEntradaUrlStateSnapshot(forgedTransitivitySnapshot, {
        triggerGenerate: false,
    });
    s.eq(
        "Entrada rejects forged source transitivity before slot A or prior state can be applied",
        {
            requested: forgedTransitivitySnapshot.sourceTransitivitySelectionFrame?.requestedSourceTransitivity,
            status: forgedTransitivitySnapshot.sourceTransitivitySelectionFrame?.authorizationStatus,
            normalized: forgedTransitivitySnapshot.transitivity,
            sourceSlot: forgedTransitivitySnapshot.sourceTransitivitySelectionFrame?.sourceSlotKey,
            applied: forgedTransitivityApplied,
            retainedState: ctx.VerbComposerState.transitivity,
        },
        {
            requested: "fabricated",
            status: "blocked",
            normalized: "",
            sourceSlot: "",
            applied: false,
            retainedState: "transitive",
        }
    );
    ctx.VerbComposerState.transitivity = previousComposerTransitivity;
    s.eq(
        "Entrada source-transitivity aliases normalize to canonical full tokens",
        ["vi", "vt", "vb"].map((alias) => {
            const snapshot = ctx.parseEntradaUrlSegmentString(`#entrada/v1/verb/(nemi)/tr/${alias}`);
            return [snapshot.transitivity, snapshot.sourceTransitivitySelectionFrame?.sourceSlotKey];
        }),
        [["intransitive", "a"], ["transitive", "b"], ["bitransitive", "c"]]
    );
    const priorOrdinaryNounClass = ctx.getOrdinaryNncGenerationState().nounClass;
    ctx.setOrdinaryNncGenerationState({ nounClass: "ti" });
    const forgedOrdinaryClass = ctx.parseEntradaUrlSegmentString("#entrada/v1/board/ordinary-nnc/s-enabled/1/s-class/fabricated");
    s.eq(
        "Entrada rejects a forged Nawat noun class before prior state can be replaced",
        {
            requested: forgedOrdinaryClass.ordinaryNnc.nounClassSelectionFrame?.requestedValue,
            status: forgedOrdinaryClass.ordinaryNnc.nounClassSelectionFrame?.authorizationStatus,
            normalized: forgedOrdinaryClass.ordinaryNnc.nounClass,
            applied: ctx.applyEntradaUrlStateSnapshot(forgedOrdinaryClass, { triggerGenerate: false }),
            retainedState: ctx.getOrdinaryNncGenerationState().nounClass,
        },
        {
            requested: "fabricated",
            status: "blocked",
            normalized: "",
            applied: false,
            retainedState: "ti",
        }
    );
    ctx.setOrdinaryNncGenerationState({ nounClass: priorOrdinaryNounClass });
    const forgedClassicalClass = ctx.parseEntradaUrlSegmentString("#entrada/v1/board/ordinary-nnc/s-enabled/1/cn/1/cn-class/fabricated");
    s.eq(
        "Entrada rejects a forged Classical noun class instead of restoring tl",
        {
            requested: forgedClassicalClass.classicalNnc.nounClassSelectionFrame?.requestedValue,
            status: forgedClassicalClass.classicalNnc.nounClassSelectionFrame?.authorizationStatus,
            layoutFallback: forgedClassicalClass.classicalNnc.nounClass,
            applied: ctx.applyEntradaUrlStateSnapshot(forgedClassicalClass, { triggerGenerate: false }),
        },
        {
            requested: "fabricated",
            status: "blocked",
            layoutFallback: "tl",
            applied: false,
        }
    );
    const forgedNncOutputScope = ctx.parseEntradaUrlSegmentString("#entrada/v1/board/ordinary-nnc/s-enabled/1/cn/1/cn-output/fabricated");
    const forgedVncOutputScope = ctx.parseEntradaUrlSegmentString("#entrada/v1/verb/(nemi)/vnc-output/fabricated");
    s.eq(
        "Entrada retains malformed explicit NNC and VNC output scope as blocked",
        {
            nnc: {
                requested: forgedNncOutputScope.classicalNnc.outputScopeSelectionFrame?.requestedValue,
                normalized: forgedNncOutputScope.classicalNnc.outputScope,
                status: forgedNncOutputScope.classicalNnc.outputScopeSelectionFrame?.authorizationStatus,
                applied: ctx.applyEntradaUrlStateSnapshot(forgedNncOutputScope, { triggerGenerate: false }),
            },
            vnc: {
                requested: forgedVncOutputScope.vncOutputScopeSelectionFrame?.requestedValue,
                normalized: forgedVncOutputScope.vncOutputScope,
                status: forgedVncOutputScope.vncOutputScopeSelectionFrame?.authorizationStatus,
                applied: ctx.applyEntradaUrlStateSnapshot(forgedVncOutputScope, { triggerGenerate: false }),
            },
        },
        {
            nnc: { requested: "fabricated", normalized: "", status: "blocked", applied: false },
            vnc: { requested: "fabricated", normalized: "", status: "blocked", applied: false },
        }
    );
    s.eq(
        "Direct VNC and Classical NNC paradigm scope round-trip through literal URL fields",
        {
            vnc: ctx.parseEntradaUrlSegmentString(ctx.buildEntradaUrlHash({ input: "(nemi)", vncOutputScope: "paradigm" }))?.vncOutputScope,
            vncSegment: ctx.buildEntradaUrlHash({ input: "(nemi)", vncOutputScope: "paradigm" }).includes("/vnc-output/paradigm"),
            nnc: ctx.parseEntradaUrlSegmentString(ctx.buildEntradaUrlHash({
                board: "ordinary-nnc",
                ordinaryNnc: { enabled: true },
                classicalNnc: { active: true, outputScope: "paradigm" },
            }))?.classicalNnc?.outputScope,
        },
        { vnc: "paradigm", vncSegment: true, nnc: "paradigm" }
    );

    return s;
}

module.exports = { run };
