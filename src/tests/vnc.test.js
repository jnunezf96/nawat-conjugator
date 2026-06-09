"use strict";

/**
 * Tests for src/core/vnc/vnc.js
 * Covers: getComboKey, startsWithAny, getTotalVowelCount,
 *         isWalThirdPersonMarker, splitSearchInput.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("vnc");

    // getComboKey — joins subject prefix, stem, object prefix with pipe
    s.eq("comboKey: ni|nemi|ki", ctx.getComboKey("ni", "nemi", "ki"), "ni|nemi|ki");
    s.eq("comboKey: 3sg subj (empty prefix)", ctx.getComboKey("", "nemi", ""), "|nemi|");
    s.eq("comboKey: ti|nemi|ki", ctx.getComboKey("ti", "nemi", "ki"), "ti|nemi|ki");
    s.eq("comboKey: all empty", ctx.getComboKey("", "", ""), "||");

    // startsWithAny — returns true if value starts with any of the given prefixes
    s.ok("startsWithAny: nemi starts with ne", ctx.startsWithAny("nemi", ["ne", "ki"]));
    s.no("startsWithAny: nemi doesn't start with ki/mu", ctx.startsWithAny("nemi", ["ki", "mu"]));
    s.ok("startsWithAny: single-char prefix", ctx.startsWithAny("nemi", ["n"]));
    s.no("startsWithAny: empty array", ctx.startsWithAny("nemi", []));

    // getTotalVowelCount — counts vowels in a string
    s.eq("vowelCount: nemi = 2", ctx.getTotalVowelCount("nemi"), 2);
    s.eq("vowelCount: chiwa = 2", ctx.getTotalVowelCount("chiwa"), 2);
    s.eq("vowelCount: ki = 1", ctx.getTotalVowelCount("ki"), 1);
    s.eq("vowelCount: consonants only = 0", ctx.getTotalVowelCount("ch"), 0);
    s.eq("vowelCount: empty = 0", ctx.getTotalVowelCount(""), 0);

    // isWalThirdPersonMarker — true for ki, kin, k (wal-directional capable 3rd-person markers)
    s.ok("isWal3P: ki", ctx.isWalThirdPersonMarker("ki"));
    s.ok("isWal3P: kin", ctx.isWalThirdPersonMarker("kin"));
    s.ok("isWal3P: k", ctx.isWalThirdPersonMarker("k"));
    s.no("isWal3P: ni (1st person)", ctx.isWalThirdPersonMarker("ni"));
    s.no("isWal3P: wal (directional)", ctx.isWalThirdPersonMarker("wal"));
    s.no("isWal3P: empty", ctx.isWalThirdPersonMarker(""));

    // splitSearchInput — splits input into base verb and optional query
    const r1 = ctx.splitSearchInput("nemi");
    s.eq("splitSearch: single verb — base", r1.base, "nemi");
    s.no("splitSearch: single verb — no query", r1.hasQuery);

    const r2 = ctx.splitSearchInput("ni nemi");
    s.eq("splitSearch: prefix+verb — base", r2.base, "ni nemi");
    s.no("splitSearch: prefix+verb — no query", r2.hasQuery);

    const noStemMask = ctx.buildNoStemMaskResult({
        shouldMask: true,
        silent: true,
        renderVerb: "nemi",
        tense: "presente",
    });
    s.eq("noStemMask: masked result marker", noStemMask.result, "—");
    s.eq("noStemMask: masked result exposes empty surfaceForms", noStemMask.surfaceForms, []);
    s.eq(
        "noStemMask: masked result exposes the blocked LCM contract",
        {
            ok: noStemMask.ok,
            surface: noStemMask.surface,
            framesIsGrammarFrame: noStemMask.frames === noStemMask.grammarFrame,
            routeFamily: noStemMask.frames.routeContract.routeFamily,
            routeStage: noStemMask.frames.routeContract.routeStage,
            generationAllowed: noStemMask.frames.routeContract.generationAllowed,
            diagnosticId: noStemMask.diagnostics[0].id,
            enumerableContract: Object.prototype.propertyIsEnumerable.call(noStemMask, "grammarFrame"),
        },
        {
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            routeFamily: "forward-derivation",
            routeStage: "no-stem-mask",
            generationAllowed: false,
            diagnosticId: "generate-forward-derivation-no-stem",
            enumerableContract: false,
        }
    );

    const validationError = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense: "presente",
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        prefixInputs: {
            subjectPrefix: "ni",
            objectPrefix: "",
            verb: "",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "executeGenerateWordRequest: validation error exposes the blocked LCM contract",
        {
            error: validationError.error,
            ok: validationError.ok,
            surface: validationError.surface,
            framesIsGrammarFrame: validationError.frames === validationError.grammarFrame,
            routeStage: validationError.frames.routeContract.routeStage,
            generationAllowed: validationError.frames.routeContract.generationAllowed,
            diagnosticMessage: validationError.diagnostics[0].message,
            enumerableContract: Object.prototype.propertyIsEnumerable.call(validationError, "grammarFrame"),
        },
        {
            error: "El verbo no puede estar vacío. Ingrese verbo.",
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            routeStage: "validate",
            generationAllowed: false,
            diagnosticMessage: "El verbo no puede estar vacío. Ingrese verbo.",
            enumerableContract: false,
        }
    );

    const nonactiveOverride = ctx.applyNonactiveGenerateOverrides({
        nonactiveDerivation: {
            nonactiveObjectPrefixOverride: "mu",
            nonactiveIndirectMarkerOverride: "te",
        },
        objectPrefix: "ki",
        morphologyObjectPrefix: "ki",
        baseObjectPrefix: "ki",
        indirectObjectMarker: "ta",
        thirdObjectMarker: "te",
        isReflexive: false,
    });
    s.eq("nonactive override: object prefix forced to mu", nonactiveOverride.objectPrefix, "mu");
    s.eq("nonactive override: indirect marker overridden", nonactiveOverride.indirectObjectMarker, "te");
    s.eq("nonactive override: third marker cleared", nonactiveOverride.thirdObjectMarker, "");
    s.ok("nonactive override: mu implies reflexive", nonactiveOverride.isReflexive);

    const suppletiveStemSet = {
        imperfective: { verb: "nemi", analysisVerb: "nemi" },
        variantsByClass: new Map([
            ["A", [{ base: "nem", suffix: "ki" }]],
        ]),
    };
    const prefixedSuppletive = ctx.applySuppletiveYawiPrefixToStemSet(
        suppletiveStemSet,
        (value) => `ya${value}`
    );
    s.eq("suppletive yawi prefix: imperfective stem", prefixedSuppletive.imperfective.verb, "yanemi");
    s.eq(
        "suppletive yawi prefix: class A variant base",
        prefixedSuppletive.variantsByClass.get("A")[0].base,
        "yanem"
    );

    const normalizedOptions = ctx.normalizeGenerateWordOptions({
        skipTransitivityValidation: true,
    });
    s.ok("normalizeGenerateWordOptions maps legacy skip flag", normalizedOptions.skipValidation === true);

    const sanitizedOptions = ctx.sanitizeGenerateWordOptions({
        skipTransitivityValidation: true,
        renderOnlyTense: "presente",
    });
    s.ok("sanitizeGenerateWordOptions keeps canonical skipValidation", sanitizedOptions.skipValidation === true);
    s.no("sanitizeGenerateWordOptions removes renderOnlyTense", Object.prototype.hasOwnProperty.call(sanitizedOptions, "renderOnlyTense"));

    s.ok(
        "canReusePreParsedVerb accepts matching source raw verb",
        ctx.canReusePreParsedVerb({ parsedVerb: { sourceRawVerb: "(nemi)" }, rawVerb: "(nemi)" })
    );
    s.no(
        "canReusePreParsedVerb rejects mismatched source raw verb",
        ctx.canReusePreParsedVerb({ parsedVerb: { sourceRawVerb: "(nemi)" }, rawVerb: "(kisa)" })
    );
    s.eq(
        "raw-input gate source: patientivo strict perfective source is authoritative",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "patientivo",
            patientivoSource: "perfectivo",
        }),
        "perfectivo"
    );
    s.eq(
        "raw-input gate source: patientivo adjective perfective source is authoritative",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "adjetivo-patientivo-perfectivo",
        }),
        "perfectivo"
    );
    s.eq(
        "raw-input gate source: non-strict patientivo source keeps generic gates",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "patientivo",
            patientivoSource: "nonactive",
        }),
        ""
    );
    s.eq(
        "raw-input gate source: finite tense keeps generic gates",
        ctx.getAuthoritativeDerivationalSourceForRawInputGate({
            tense: "presente",
            patientivoSource: "perfectivo",
        }),
        ""
    );

    const prefixInputs = ctx.getPrefixInputs({
        override: { objectPrefix: "ki" },
        subjectPrefixInput: { value: "ni" },
        subjectSuffixInput: { value: "" },
        verbInput: { value: "(nemi)" },
        verbInputSource: { parseValue: "nemi" },
    });
    s.eq("getPrefixInputs reads subject prefix from input", prefixInputs.subjectPrefix, "ni");
    s.eq("getPrefixInputs prefers override object prefix", prefixInputs.objectPrefix, "ki");
    s.eq("getPrefixInputs uses parsed verb input source", prefixInputs.verb, "nemi");

    const boundOverride = ctx.applyBoundMarkerPrefixOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki"
    );
    s.eq("bound override drops occupied object prefix", boundOverride.objectPrefix, "");
    s.eq("bound override drops occupied base object prefix", boundOverride.baseObjectPrefix, "");

    const passiveAdjustments = ctx.applyPassiveImpersonalValencyAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "ki",
        indirectObjectMarker: "ta",
        thirdObjectMarker: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObjectPrefix: "ki",
        hasPromotableObject: true,
    });
    s.eq("passive valency adjusts clears direct object", passiveAdjustments.objectPrefix, "");
    s.eq("passive valency adjusts clears indirect object", passiveAdjustments.indirectObjectMarker, "");
    s.ok("passive valency adjusts preserves subject for promoted passive", passiveAdjustments.preserveSubjectForPassive);

    const resetNominalSubject = ctx.resetSubjectForNounTenses("agentivo", {}, "ni", "t");
    s.eq("resetSubjectForNounTenses clears nominal subject prefix", resetNominalSubject.subjectPrefix, "");
    s.eq("resetSubjectForNounTenses clears nominal subject suffix", resetNominalSubject.subjectSuffix, "");
    const resetPresentAgentivoSubject = ctx.resetSubjectForNounTenses("agentivo-presente", {}, "ni", "t");
    s.eq("resetSubjectForNounTenses clears present-agentive subject prefix", resetPresentAgentivoSubject.subjectPrefix, "");
    s.eq("resetSubjectForNounTenses clears present-agentive subject suffix", resetPresentAgentivoSubject.subjectSuffix, "");
    const resetPreteritAgentivoSubject = ctx.resetSubjectForNounTenses("agentivo-preterito", {}, "ni", "t");
    s.eq("resetSubjectForNounTenses clears preterit-agentive subject prefix", resetPreteritAgentivoSubject.subjectPrefix, "");
    s.eq("resetSubjectForNounTenses clears preterit-agentive subject suffix", resetPreteritAgentivoSubject.subjectSuffix, "");
    const resetFutureAgentivoSubject = ctx.resetSubjectForNounTenses("agentivo-futuro", {}, "ni", "t");
    s.eq("resetSubjectForNounTenses clears future-agentive subject prefix", resetFutureAgentivoSubject.subjectPrefix, "");
    s.eq("resetSubjectForNounTenses clears future-agentive subject suffix", resetFutureAgentivoSubject.subjectSuffix, "");

    let clearedTarget = "";
    const reflexiveSwitch = ctx.applyReflexiveAutoSwitch({
        subjectPrefix: "ni",
        subjectSuffix: "",
        objectPrefix: "nech",
        isPassiveImpersonal: false,
        clearError: (id) => {
            clearedTarget = id;
        },
    });
    s.eq("reflexive auto switch rewrites same-person object to mu", reflexiveSwitch.objectPrefix, "mu");
    s.ok("reflexive auto switch marks reflexive", reflexiveSwitch.isReflexive);
    s.eq("reflexive auto switch clears object-prefix error", clearedTarget, "object-prefix");

    const executeEngineResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "presente",
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix: "",
            verb: "(nemi)",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.ok("executeGenerateWordRequest returns a surfaceForms array", Array.isArray(executeEngineResult.surfaceForms));
    s.ok(
        "executeGenerateWordRequest computes present nemi output without DOM access",
        executeEngineResult.result.includes("nemi")
    );
    s.eq(
        "executeGenerateWordRequest exposes diagnostic VNC clause shell",
        {
            kind: executeEngineResult.nuclearClauseShell?.kind,
            clauseKind: executeEngineResult.nuclearClauseShell?.clauseKind,
            formulaType: executeEngineResult.nuclearClauseShell?.formulaType,
            hasTensePosition: executeEngineResult.nuclearClauseShell?.hasTensePosition,
            generationAllowed: executeEngineResult.nuclearClauseShell?.generationAllowed,
            predicateStem: executeEngineResult.nuclearClauseShell?.slots?.predicate?.stem,
            tenseValue: executeEngineResult.nuclearClauseShell?.slots?.tense?.tenseValue,
            formulaEcho: executeEngineResult.nuclearClauseShell?.formulaEcho,
            formulaSlotKeys: Object.keys(executeEngineResult.nuclearClauseShell?.formulaSlots || {}),
            valencyKind: executeEngineResult.vncValencyFrame?.kind,
            valency: executeEngineResult.vncValencyFrame?.valency,
            subjectSlot: executeEngineResult.vncValencyFrame?.subject?.slot,
            objectDisplay: executeEngineResult.vncValencyFrame?.object?.displayPrefix,
        },
        {
            kind: "nuclear-clause-shell",
            clauseKind: "verbal-nuclear-clause",
            formulaType: "VNC",
            hasTensePosition: true,
            generationAllowed: false,
            predicateStem: "(nemi)",
            tenseValue: "presente",
            formulaEcho: "#Ø-Ø(nemi)-presente#",
            formulaSlotKeys: ["subjectPerson", "objectPerson", "predicate", "tense"],
            valencyKind: "vnc-valency-frame",
            valency: "intransitive",
            subjectSlot: "subject",
            objectDisplay: "Ø",
        }
    );
    s.eq(
        "executeGenerateWordRequest also exposes the LCM grammar frame for VNC output",
        {
            frameKeys: ctx.GRAMMAR_FRAME_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(executeEngineResult.grammarFrame, key)),
            topOk: executeEngineResult.ok,
            topSurface: executeEngineResult.surface,
            topFramesIsGrammarFrame: executeEngineResult.frames === executeEngineResult.grammarFrame,
            unitKind: executeEngineResult.grammarFrame.unitFrame.unitKind,
            surface: executeEngineResult.grammarFrame.resultFrame.surface,
            ok: executeEngineResult.grammarFrame.resultFrame.ok,
            shellKind: executeEngineResult.grammarFrame.nuclearClauseFrame.clauseKind,
            routeFamily: executeEngineResult.grammarFrame.routeContract.routeFamily,
            tense: executeEngineResult.grammarFrame.inflectionFrame.tense,
            subjectPrefix: executeEngineResult.grammarFrame.participantFrame.subject.prefix,
        },
        {
            frameKeys: ctx.GRAMMAR_FRAME_KEYS,
            topOk: true,
            topSurface: "nemi",
            topFramesIsGrammarFrame: true,
            unitKind: "verbal-nuclear-clause",
            surface: "nemi",
            ok: true,
            shellKind: "verbal-nuclear-clause",
            routeFamily: "vnc",
            tense: "presente",
            subjectPrefix: "",
        }
    );
    const priorResultFrame = ctx.buildGrammarFrame({
        resultFrame: ctx.buildGrammarResultFrame({
            ok: true,
            surface: "frame-engine-surface",
            surfaceForms: ["frame-engine-a", "frame-engine-b"],
        }),
    });
    const rebuiltGenerateFrame = ctx.buildGenerateWordGrammarFrame({
        result: {
            result: "stale-engine-result",
            frames: priorResultFrame,
            surface: "top-engine-surface",
            surfaceForms: ["stale-engine-a / stale-engine-b"],
        },
        renderVerb: "—",
        verb: "legacy-source",
        resolvedTenseMode: "verbo",
        tense: "presente",
        routeFamily: "vnc",
        unitKind: "verbal-nuclear-clause",
    });
    s.eq(
        "generate word grammar frame reads framed result surface forms before legacy no-output text",
        {
            surface: rebuiltGenerateFrame.resultFrame.surface,
            surfaceForms: rebuiltGenerateFrame.resultFrame.surfaceForms,
            ok: rebuiltGenerateFrame.resultFrame.ok,
            sourceInput: rebuiltGenerateFrame.resultFrame.sourceInput,
            stem: rebuiltGenerateFrame.stemFrame.stem,
        },
        {
            surface: "frame-engine-a",
            surfaceForms: ["frame-engine-a", "frame-engine-b", "frame-engine-surface"],
            ok: true,
            sourceInput: "frame-engine-a",
            stem: "frame-engine-a",
        }
    );
    s.eq(
        "generate runtime blocked wrapper preserves framed surface forms before stale legacy text",
        typeof ctx.resolveGenerateRuntimeContractSurface === "function"
            ? ctx.resolveGenerateRuntimeContractSurface({
                result: "stale-runtime-result",
                surface: "top-runtime-surface",
                surfaceForms: ["stale-runtime-a / stale-runtime-b"],
                frames: priorResultFrame,
            })
            : "runtime-support-not-loaded",
        "frame-engine-a"
    );
    s.eq(
        "generate runtime surface forms ignore stale aliases when result frame exists",
        typeof ctx.getGenerateRuntimeSurfaceForms === "function"
            ? ctx.getGenerateRuntimeSurfaceForms({
                result: "stale-runtime-result",
                surface: "top-runtime-surface",
                surfaceForms: ["stale-runtime-a / stale-runtime-b"],
                frames: priorResultFrame,
            })
            : ["runtime-support-not-loaded"],
        ["frame-engine-a", "frame-engine-b", "frame-engine-surface"]
    );
    s.eq(
        "VNC allomorphy primary surface reads framed result before legacy no-output text",
        typeof ctx.getVncAllomorphyContractSurface === "function"
            ? ctx.getVncAllomorphyContractSurface({
                result: "stale-allomorphy-result",
                surface: "top-allomorphy-surface",
                outputSurface: "stale-output-surface",
                selectedOutputSurface: "stale-selected-output",
                nawatSurfaceSuffix: "stale-suffix",
                forms: ["stale-legacy-form"],
                frames: priorResultFrame,
            })
            : "vnc-allomorphy-helper-not-loaded",
        "frame-engine-a"
    );
    s.eq(
        "VNC allomorphy source forms prefer framed result before stale legacy forms",
        typeof ctx.getVncAllomorphySourceSurfaceForms === "function"
            ? ctx.getVncAllomorphySourceSurfaceForms({
                result: "stale-allomorphy-result",
                surface: "top-allomorphy-surface",
                outputSurface: "stale-output-surface",
                selectedOutputSurface: "stale-selected-output",
                nawatSurfaceSuffix: "stale-suffix",
                forms: ["stale-legacy-form"],
                frames: priorResultFrame,
            })
            : ["vnc-allomorphy-source-helper-not-loaded"],
        ["frame-engine-a", "frame-engine-b", "frame-engine-surface"]
    );
    s.eq(
        "VNC allomorphy source forms keep legacy forms for metadata-only frames",
        typeof ctx.getVncAllomorphySourceSurfaceForms === "function"
            ? ctx.getVncAllomorphySourceSurfaceForms({
                forms: ["legacy-allomorphy-a / legacy-allomorphy-b"],
                frames: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "vnc-allomorphy",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            })
            : ["vnc-allomorphy-source-helper-not-loaded"],
        ["legacy-allomorphy-a", "legacy-allomorphy-b"]
    );
    const transitiveFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "presente",
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        prefixInputs: {
            subjectPrefix: "ni",
            objectPrefix: "ki",
            verb: "-maka",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "VNC valency frame explains transitive subject and object slots without changing output",
        {
            valency: transitiveFrameResult.vncValencyFrame?.valency,
            subjectPrefix: transitiveFrameResult.vncValencyFrame?.subject?.prefix,
            objectPrefix: transitiveFrameResult.vncValencyFrame?.object?.prefix,
            baseObjectPrefix: transitiveFrameResult.vncValencyFrame?.object?.basePrefix,
            changesSurfaceForms: transitiveFrameResult.vncValencyFrame?.boundaries?.changesSurfaceForms,
            forms: transitiveFrameResult.surfaceForms,
        },
        {
            valency: "transitive",
            subjectPrefix: "ni",
            objectPrefix: "k",
            baseObjectPrefix: "ki",
            changesSurfaceForms: false,
            forms: ["nikmaka"],
        }
    );
    const passiveFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "presente",
                derivationMode: ctx.DERIVATION_MODE.nonactive,
                voiceMode: ctx.VOICE_MODE.passive,
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix: "ki",
            verb: "-maka",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "derived voice frame explains passive/impersonal valency without changing output",
        {
            kind: passiveFrameResult.derivedVoiceFrame?.kind,
            voiceLabel: passiveFrameResult.derivedVoiceFrame?.voice?.label,
            sourceValency: passiveFrameResult.derivedVoiceFrame?.valency?.sourceValency,
            targetValency: passiveFrameResult.derivedVoiceFrame?.valency?.targetValency,
            baseObjectPrefix: passiveFrameResult.derivedVoiceFrame?.valency?.baseObjectPrefix,
            selectedObjectPrefix: passiveFrameResult.derivedVoiceFrame?.valency?.selectedObjectPrefix,
            objectClearedByVoice: passiveFrameResult.derivedVoiceFrame?.valency?.objectClearedByVoice,
            changesSurfaceForms: passiveFrameResult.derivedVoiceFrame?.boundaries?.changesSurfaceForms,
            forms: passiveFrameResult.surfaceForms,
        },
        {
            kind: "derived-voice-frame",
            voiceLabel: "pasivo/impersonal",
            sourceValency: 2,
            targetValency: 1,
            baseObjectPrefix: "ki",
            selectedObjectPrefix: "",
            objectClearedByVoice: true,
            changesSurfaceForms: false,
            forms: ["makalu", "makilu"],
        }
    );
    const causativeFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "presente",
                derivationType: ctx.DERIVATION_TYPE.causative,
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        prefixInputs: {
            subjectPrefix: "ni",
            objectPrefix: "",
            verb: "(nemi)",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "forward derivation frame explains causative stem path without changing output",
        {
            kind: causativeFrameResult.forwardDerivationFrame?.kind,
            lessonRange: causativeFrameResult.forwardDerivationFrame?.lessonRange,
            derivationType: causativeFrameResult.forwardDerivationFrame?.derivation?.type,
            derivationLabel: causativeFrameResult.forwardDerivationFrame?.derivation?.label,
            sourceValency: causativeFrameResult.forwardDerivationFrame?.valency?.sourceValency,
            derivedValency: causativeFrameResult.forwardDerivationFrame?.valency?.derivedValency,
            selectedStem: causativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
            changesSurfaceForms: causativeFrameResult.forwardDerivationFrame?.boundaries?.changesSurfaceForms,
            forms: causativeFrameResult.surfaceForms,
        },
        {
            kind: "forward-derivation-frame",
            lessonRange: "24-25",
            derivationType: "causative",
            derivationLabel: "causativa",
            sourceValency: 1,
            derivedValency: 2,
            selectedStem: "nemtia",
            changesSurfaceForms: false,
            forms: ["ninemitia", "ninentia"],
        }
    );
    const applicativeFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "presente",
                derivationType: ctx.DERIVATION_TYPE.applicative,
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        prefixInputs: {
            subjectPrefix: "ni",
            objectPrefix: "ki",
            verb: "-maka",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "forward derivation frame explains applicative valency path without changing output",
        {
            kind: applicativeFrameResult.forwardDerivationFrame?.kind,
            lessonRange: applicativeFrameResult.forwardDerivationFrame?.lessonRange,
            derivationType: applicativeFrameResult.forwardDerivationFrame?.derivation?.type,
            sourceValency: applicativeFrameResult.forwardDerivationFrame?.valency?.sourceValency,
            derivedValency: applicativeFrameResult.forwardDerivationFrame?.valency?.derivedValency,
            selectedStem: applicativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
            changesSurfaceForms: applicativeFrameResult.forwardDerivationFrame?.boundaries?.changesSurfaceForms,
            forms: applicativeFrameResult.surfaceForms,
        },
        {
            kind: "forward-derivation-frame",
            lessonRange: "26",
            derivationType: "applicative",
            sourceValency: 2,
            derivedValency: 3,
            selectedStem: "makilia",
            changesSurfaceForms: false,
            forms: ["nikmaka", "nikmakilia"],
        }
    );
    s.eq(
        "forward derivation frame stops at empty provenance result frames before stale surfaceStem",
        (() => {
            const blockedProvenance = {
                surfaceStem: "stale-forward-surface-stem",
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                        outputKind: "output-provenance",
                    }),
                }),
            };
            const frame = ctx.buildGeneratedForwardDerivationFrameMetadata({
                resolvedTenseMode: ctx.TENSE_MODE?.verbo || "verbo",
                resolvedDerivationType: ctx.DERIVATION_TYPE.causative,
                derivationValencyDelta: 1,
                sourceValency: 2,
                forwardStemProvenance: blockedProvenance,
                renderVerb: "nemi",
                verb: "analysis-fallback",
                analysisVerb: "analysis-fallback",
            });
            return {
                selectedStem: frame?.stem?.selectedStem || "",
                candidateStems: frame?.stem?.candidateStems || [],
            };
        })(),
        {
            selectedStem: "analysisfallback",
            candidateStems: [],
        }
    );
    const compoundFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "presente",
                parsedVerb: ctx.parseVerbInput("(shuchi)-(kwi)"),
            },
        },
        prefixInputs: {
            subjectPrefix: "ni",
            objectPrefix: "",
            verb: "(shuchi)-(kwi)",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "compound frame exposes parser compoundAst metadata without changing output",
        {
            kind: compoundFrameResult.compoundFrame?.kind,
            lessonRange: compoundFrameResult.compoundFrame?.lessonRange,
            matrixStem: compoundFrameResult.compoundFrame?.matrix?.stem,
            embedRoles: compoundFrameResult.compoundFrame?.embeds?.map((entry) => entry.role),
            embedValues: compoundFrameResult.compoundFrame?.embeds?.map((entry) => entry.value),
            rawInput: compoundFrameResult.compoundFrame?.sourceInput?.rawInput,
            changesSurfaceForms: compoundFrameResult.compoundFrame?.boundaries?.changesSurfaceForms,
            forms: compoundFrameResult.surfaceForms,
        },
        {
            kind: "compound-frame",
            lessonRange: "28,30",
            matrixStem: "kwi",
            embedRoles: ["outer-lexical"],
            embedValues: ["shuchi"],
            rawInput: "(shuchi)-(kwi)",
            changesSurfaceForms: false,
            forms: ["nishuchikwi"],
        }
    );
    const sentenceLayerResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                tense: "imperativo",
                parsedVerb: ctx.parseVerbInput("(nemi)"),
                sentenceLayer: {
                    enabled: true,
                    polarity: "negative",
                    questionType: "yes-no",
                    moodScope: "command",
                },
            },
        },
        prefixInputs: {
            subjectPrefix: "ti",
            objectPrefix: "",
            verb: "(nemi)",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq(
        "sentence layer opt-in adds diagnostic metadata without changing VNC output",
        {
            forms: sentenceLayerResult.surfaceForms,
            sentenceKind: sentenceLayerResult.sentenceLayer?.kind,
            polarity: sentenceLayerResult.sentenceLayer?.slots?.polarity?.value,
            question: sentenceLayerResult.sentenceLayer?.slots?.question?.value,
            mood: sentenceLayerResult.sentenceLayer?.slots?.mood?.value,
            changesFiniteVncOutput: sentenceLayerResult.sentenceLayer?.boundaries?.changesFiniteVncOutput,
        },
        {
            forms: ["shinemi"],
            sentenceKind: "sentence-layer-metadata",
            polarity: "negative",
            question: "yes-no",
            mood: "command",
            changesFiniteVncOutput: false,
        }
    );

    return s;
}

module.exports = { run };
