"use strict";

/**
 * Tests for derivation source-model and source-chain helpers.
 * Covers: buildDerivationSourceModel, buildNonactiveSourceChain,
 *         getDerivationSourceOuterSurface, apply/realize source-chain stems.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("derivation");

    const verbMeta = {
        exactBaseVerb: "nemi",
        sourcePrefix: "ki",
        lexicalBoundPrefixes: ["ki"],
        isMarkedTransitive: true,
    };

    const sourceModel = ctx.buildDerivationSourceModel(verbMeta, "kinemi", "nemi");
    s.eq("source model: fallback kind", sourceModel.sourceKind, "fallback");
    s.eq("source model: matrix base = nemi", sourceModel.matrixBase, "nemi");
    s.eq("source model: outer surface = ki", ctx.getDerivationSourceOuterSurface(sourceModel), "ki");

    const chain = ctx.buildNonactiveSourceChain(verbMeta, "kinemi", "nemi");
    s.eq("nonactive chain: base verb = nemi", chain.baseVerb, "nemi");
    s.eq("nonactive chain: prefix = ki", chain.prefix, "ki");
    s.eq("nonactive chain: source prefix = ki", chain.sourcePrefix, "ki");

    const prefixedStem = ctx.realizeNonactiveSourceChainStem("nemu", chain);
    s.eq("nonactive chain realize: ki + nemu = kinemu", prefixedStem, "kinemu");

    const prefixedStemSpec = ctx.applyNonactiveSourceChainStemSpec(
        ctx.buildLiteralMorphStemSpec("nemu"),
        "nemu",
        chain
    );
    s.eq(
        "nonactive stem spec realize: ki + nemu = kinemu",
        ctx.realizeMorphStemSpec(prefixedStemSpec, ""),
        "kinemu"
    );

    const imperfectiveChain = ctx.buildPatientivoImperfectiveSourceChain(
        { exactBaseVerb: "nemia" },
        "nemia",
        "nemia"
    );
    const imperfectiveBaseSpec = ctx.resolvePatientivoImperfectiveBaseStemSpec(imperfectiveChain);
    s.eq(
        "patientivo imperfective base spec preserves imperfective -ya from -ia stem",
        ctx.realizeMorphStemSpec(imperfectiveBaseSpec, ""),
        "nemiya"
    );

    const absolutivePrelocativeContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "tamatiya",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
    });
    s.eq(
        "Andrews 39.7 absolutive patientive source promotes NNC subject into prelocative object",
        {
            supported: absolutivePrelocativeContract.supported,
            sourceState: absolutivePrelocativeContract.sourceState,
            incorporatedRoot: absolutivePrelocativeContract.incorporatedRoot,
            prelocativeVerbInput: absolutivePrelocativeContract.prelocativeVerbInput,
            sourceRole: absolutivePrelocativeContract.objectTransfer.sourceRole,
            sourcePrefix: absolutivePrelocativeContract.objectTransfer.sourcePrefix,
            objectPrefix: absolutivePrelocativeContract.objectTransfer.objectPrefix,
        },
        {
            supported: true,
            sourceState: "absolutive",
            incorporatedRoot: "tamatiya",
            prelocativeVerbInput: "-(tamatiya/tajtani)",
            sourceRole: "subject",
            sourcePrefix: "ni",
            objectPrefix: "nech",
        }
    );
    s.eq(
        "derivation continuation contracts expose non-enumerable LCM frames",
        {
            hasFrame: Boolean(absolutivePrelocativeContract.grammarFrame),
            framesAlias: absolutivePrelocativeContract.frames === absolutivePrelocativeContract.grammarFrame,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(absolutivePrelocativeContract, "grammarFrame"),
            ok: absolutivePrelocativeContract.ok,
            surface: absolutivePrelocativeContract.surface,
            routeFamily: absolutivePrelocativeContract.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: absolutivePrelocativeContract.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: absolutivePrelocativeContract.grammarFrame?.routeContract?.generationAllowed,
            unitKind: absolutivePrelocativeContract.grammarFrame?.unitFrame?.unitKind || "",
            sourceInput: absolutivePrelocativeContract.grammarFrame?.resultFrame?.sourceInput || "",
            targetInput: absolutivePrelocativeContract.grammarFrame?.routeContract?.targetContract?.targetInput || "",
        },
        {
            hasFrame: true,
            framesAlias: true,
            enumerableGrammarFrame: false,
            ok: true,
            surface: "",
            routeFamily: "derivation-continuation",
            routeStage: "preview-continuation",
            generationAllowed: true,
            unitKind: "derivation-continuation-contract",
            sourceInput: "tamatiya",
            targetInput: "-(tamatiya/tajtani)",
        }
    );
    s.eq(
        "derivation continuation contract reads framed source surface before stale source aliases",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surfaceForms: ["frame-source-a / frame-source-b"],
                    outputKind: "derivation-source-output",
                    generationRoute: "test-frame-reader",
                }),
            });
            const contract = ctx.attachDerivationContinuationGrammarContract({
                outputKind: "test-derivation-continuation-contract",
                grammarSource: "Andrews 39.8",
                supported: true,
                surface: "stale-top-surface",
                surfaceForms: ["stale-top-a / stale-top-b"],
                result: "stale-result",
                sourceSurface: "stale-source-surface",
                patientivoSurface: "stale-patientive-surface",
                compoundVerbInput: "-(frame-source-a/tajtani)",
                grammarFrame,
                frames: grammarFrame,
                diagnostics: [],
            });
            return {
                sourceInput: contract.grammarFrame?.resultFrame?.sourceInput || "",
                sourceSurface: contract.grammarFrame?.routeContract?.sourceContract?.sourceSurface || "",
                targetInput: contract.grammarFrame?.routeContract?.targetContract?.targetInput || "",
            };
        })(),
        {
            sourceInput: "frame-source-a",
            sourceSurface: "frame-source-a",
            targetInput: "-(frame-source-a/tajtani)",
        }
    );
    s.eq(
        "derivation continuation contract suppresses stale source aliases for empty result frame",
        (() => {
            const grammarFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "derivation-source-output",
                    generationRoute: "test-empty-frame-reader",
                }),
            });
            const contract = ctx.attachDerivationContinuationGrammarContract({
                outputKind: "test-derivation-continuation-contract",
                grammarSource: "Andrews 39.8",
                supported: false,
                sourceSurface: "stale-source-surface",
                patientivoSurface: "stale-patientive-surface",
                compoundVerbInput: "-(stale-source/tajtani)",
                grammarFrame,
                frames: grammarFrame,
                diagnostics: ["patientivo-compound-embed-missing-patientivo-surface"],
            });
            return {
                ok: contract.ok,
                sourceInput: contract.grammarFrame?.resultFrame?.sourceInput || "",
                sourceSurface: contract.grammarFrame?.routeContract?.sourceContract?.sourceSurface || "",
                diagnosticLayer: contract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.failedLayer || "",
            };
        })(),
        {
            ok: false,
            sourceInput: "",
            sourceSurface: "",
            diagnosticLayer: "stem",
        }
    );
    s.eq(
        "Andrews 39.7 absolutive patientive source uses direct subject-to-object mapping",
        [
            { subjectPrefix: "ni", subjectSuffix: "" },
            { subjectPrefix: "ti", subjectSuffix: "" },
            { subjectPrefix: "", subjectSuffix: "" },
            { subjectPrefix: "ti", subjectSuffix: "t" },
            { subjectPrefix: "an", subjectSuffix: "t" },
            { subjectPrefix: "", subjectSuffix: "t" },
        ].map((selection) => {
            const transfer = ctx.resolvePatientivoPrelocativeSubjectObjectTransfer({ selection });
            return {
                subject: `${selection.subjectPrefix || "Ø"}...${selection.subjectSuffix || "Ø"}`,
                sourcePrefix: transfer.sourcePrefix || "Ø",
                sourceSuffix: transfer.sourceSuffix || "Ø",
                objectPrefix: transfer.objectPrefix,
            };
        }),
        [
            { subject: "ni...Ø", sourcePrefix: "ni", sourceSuffix: "Ø", objectPrefix: "nech" },
            { subject: "ti...Ø", sourcePrefix: "ti", sourceSuffix: "Ø", objectPrefix: "metz" },
            { subject: "Ø...Ø", sourcePrefix: "Ø", sourceSuffix: "Ø", objectPrefix: "ki" },
            { subject: "ti...t", sourcePrefix: "ti", sourceSuffix: "t", objectPrefix: "tech" },
            { subject: "an...t", sourcePrefix: "an", sourceSuffix: "t", objectPrefix: "metzin" },
            { subject: "Ø...t", sourcePrefix: "Ø", sourceSuffix: "t", objectPrefix: "kin" },
        ]
    );
    const parsedPrelocativeContractInput = ctx.parseVerbInput(absolutivePrelocativeContract.prelocativeVerbInput);
    s.eq(
        "patientive prelocative contract builds a parsed transitive incorporated-object input",
        {
            sourceRawVerb: parsedPrelocativeContractInput.sourceRawVerb,
            verb: parsedPrelocativeContractInput.verb,
            sourceBase: parsedPrelocativeContractInput.sourceBase,
            hasLeadingDash: parsedPrelocativeContractInput.hasLeadingDash,
            isMarkedTransitive: parsedPrelocativeContractInput.isMarkedTransitive,
        },
        {
            sourceRawVerb: "-(tamatiya/tajtani)",
            verb: "tamatiyatajtani",
            sourceBase: "tajtani",
            hasLeadingDash: true,
            isMarkedTransitive: true,
        }
    );
    const generatedPrelocativeContractSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: absolutivePrelocativeContract.objectTransfer.objectPrefix,
            tronco: absolutivePrelocativeContract.prelocativeVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "patientive prelocative contract reaches actual finite V output",
        generatedPrelocativeContractSurface.result,
        "nechtamatiyatajtani"
    );
    const compoundEmbedInventory = ctx.getPatientivoCompoundEmbedMatrixInventory();
    s.eq(
        "Andrews 39.6 patientive compound-embed matrix inventory is explicit",
        compoundEmbedInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "miqui",
                classicalMatrix: "(miqui)",
                nawatRoot: "miki",
                status: "nawat-data-backed",
                matrixValency: "intransitive",
            },
        ]
    );
    const compoundEmbedContract = ctx.buildPatientivoCompoundEmbedContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "tamatiya",
        patientivoNominalSuffix: "t",
        matrixRoot: "miki",
    });
    const parsedCompoundEmbedInput = ctx.parseVerbInput(compoundEmbedContract.compoundVerbInput);
    const generatedCompoundEmbedSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: compoundEmbedContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.6 patientive nounstem can become a verbal compound embed",
        {
            supported: compoundEmbedContract.supported,
            incorporatedRoot: compoundEmbedContract.incorporatedRoot,
            compoundVerbInput: compoundEmbedContract.compoundVerbInput,
            parsedVerb: parsedCompoundEmbedInput.verb,
            isMarkedTransitive: parsedCompoundEmbedInput.isMarkedTransitive,
            result: generatedCompoundEmbedSurface.result,
        },
        {
            supported: true,
            incorporatedRoot: "tamatiya",
            compoundVerbInput: "(tamatiya/miki)",
            parsedVerb: "tamatiyamiki",
            isMarkedTransitive: false,
            result: "tamatiyamiki",
        }
    );
    const unsupportedCompoundEmbedContract = ctx.buildPatientivoCompoundEmbedContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "tamatiya",
        patientivoNominalSuffix: "t",
        matrixRoot: "ni",
    });
    s.eq(
        "Andrews 39.6 patientive compound-embed contract rejects unsupported matrices",
        {
            supported: unsupportedCompoundEmbedContract.supported,
            compoundVerbInput: unsupportedCompoundEmbedContract.compoundVerbInput,
            diagnostics: unsupportedCompoundEmbedContract.diagnostics,
        },
        {
            supported: false,
            compoundVerbInput: "",
            diagnostics: [
                "patientivo-compound-embed-unsupported-matrix",
                "patientivo-compound-embed-missing-verb-input",
            ],
        }
    );
    s.eq(
        "blocked derivation continuation contracts expose failed LCM layer",
        {
            ok: unsupportedCompoundEmbedContract.ok,
            routeStage: unsupportedCompoundEmbedContract.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: unsupportedCompoundEmbedContract.grammarFrame?.routeContract?.generationAllowed,
            diagnosticStatus: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.status || "",
            diagnosticId: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            diagnosticFailedLayer: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.failedLayer || "",
            diagnosticContractLayer: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.contractLayer || "",
            diagnosticRouteFamily: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.routeFamily || "",
            diagnosticRouteStage: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.routeStage || "",
            secondDiagnosticFailedLayer: unsupportedCompoundEmbedContract.grammarFrame?.diagnosticFrame?.diagnostics?.[1]?.failedLayer || "",
            blockingDiagnosticFailedLayer: unsupportedCompoundEmbedContract.grammarFrame?.routeContract?.blockingDiagnostics?.[0]?.failedLayer || "",
            contractDiagnosticFailedLayer: unsupportedCompoundEmbedContract.contractDiagnostics?.[0]?.failedLayer || "",
            diagnosticsEnumerable: Object.prototype.propertyIsEnumerable.call(unsupportedCompoundEmbedContract, "diagnostics"),
        },
        {
            ok: false,
            routeStage: "blocked",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            diagnosticId: "patientivo-compound-embed-unsupported-matrix",
            diagnosticFailedLayer: "route",
            diagnosticContractLayer: "routeContract",
            diagnosticRouteFamily: "derivation-continuation",
            diagnosticRouteStage: "blocked",
            secondDiagnosticFailedLayer: "output",
            blockingDiagnosticFailedLayer: "route",
            contractDiagnosticFailedLayer: "route",
            diagnosticsEnumerable: true,
        }
    );
    const nominalCompoundInventory = ctx.getPatientivoNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 39.6 patientive nominal-matrix inventory is explicit",
        nominalCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                status: "nawat-data-backed",
            },
        ]
    );
    const nominalCompoundContract = ctx.buildPatientivoNominalCompoundContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "tamatiya",
        patientivoNominalSuffix: "t",
        matrixRoot: "kal",
    });
    const generatedNominalCompoundSurface = ctx.generateOrdinaryNncParadigm(nominalCompoundContract.ordinaryNncRequest);
    s.eq(
        "Andrews 39.6 patientive nounstem can become an ordinary NNC compound stem",
        {
            supported: nominalCompoundContract.supported,
            incorporatedRoot: nominalCompoundContract.incorporatedRoot,
            compoundStem: nominalCompoundContract.compoundStem,
            ordinaryNncInput: nominalCompoundContract.ordinaryNncInput,
            result: generatedNominalCompoundSurface.result,
            sourceKind: generatedNominalCompoundSurface.source.sourceKind,
            nounClass: generatedNominalCompoundSurface.nounClass,
        },
        {
            supported: true,
            incorporatedRoot: "tamatiya",
            compoundStem: "tamatiyakal",
            ordinaryNncInput: "(tamatiyakal)",
            result: "tamatiyakal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    s.eq(
        "Andrews 39.6 patientive compound contracts expose embed/matrix formation frames",
        {
            verbal: {
                grammarSource: compoundEmbedContract.formationFrame.grammarSource,
                compoundStemType: compoundEmbedContract.formationFrame.compoundStemType,
                embedRole: compoundEmbedContract.formationFrame.embed.role,
                embedRoot: compoundEmbedContract.formationFrame.embed.root,
                matrixType: compoundEmbedContract.formationFrame.matrix.type,
                matrixRoot: compoundEmbedContract.formationFrame.matrix.root,
                outputKind: compoundEmbedContract.formationFrame.output.kind,
                verbInput: compoundEmbedContract.formationFrame.output.verbInput,
                createsFixture: compoundEmbedContract.formationFrame.evidencePolicy.createsOrdinaryNncFixture,
            },
            nominal: {
                grammarSource: nominalCompoundContract.formationFrame.grammarSource,
                compoundStemType: nominalCompoundContract.formationFrame.compoundStemType,
                embedRole: nominalCompoundContract.formationFrame.embed.role,
                embedRoot: nominalCompoundContract.formationFrame.embed.root,
                matrixType: nominalCompoundContract.formationFrame.matrix.type,
                matrixRoot: nominalCompoundContract.formationFrame.matrix.root,
                outputKind: nominalCompoundContract.formationFrame.output.kind,
                ordinaryNncInput: nominalCompoundContract.formationFrame.output.ordinaryNncInput,
                sourceKind: nominalCompoundContract.formationFrame.output.sourceKind,
                createsFixture: nominalCompoundContract.formationFrame.evidencePolicy.createsOrdinaryNncFixture,
            },
        },
        {
            verbal: {
                grammarSource: "Andrews 39.6",
                compoundStemType: "verbal",
                embedRole: "compound-embed",
                embedRoot: "tamatiya",
                matrixType: "verbal",
                matrixRoot: "miki",
                outputKind: "compound-vnc-input",
                verbInput: "(tamatiya/miki)",
                createsFixture: false,
            },
            nominal: {
                grammarSource: "Andrews 39.6",
                compoundStemType: "nominal",
                embedRole: "compound-embed",
                embedRoot: "tamatiya",
                matrixType: "nominal",
                matrixRoot: "kal",
                outputKind: "ordinary-nnc-compound-input",
                ordinaryNncInput: "(tamatiyakal)",
                sourceKind: "open-stem",
                createsFixture: false,
            },
        }
    );
    const activeActionCompoundEmbedInventory = ctx.getActiveActionCompoundEmbedMatrixInventory();
    s.eq(
        "Andrews 37.5.4 active-action compound-embed matrix inventory is explicit",
        activeActionCompoundEmbedInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "tzahtzi",
                classicalMatrix: "(tzahtzi)",
                nawatRoot: "tzajtzi",
                status: "nawat-data-backed",
                matrixValency: "intransitive",
            },
        ]
    );
    const activeActionCompoundContract = ctx.buildActiveActionCompoundEmbedContinuationContract({
        actionNominalSurface: "chukilis",
        sourceSurface: "chuka",
        matrixRoot: "tzajtzi",
    });
    const parsedActiveActionCompoundInput = ctx.parseVerbInput(activeActionCompoundContract.compoundVerbInput);
    const generatedActiveActionCompoundSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: activeActionCompoundContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 37.5.4 active-action nounstem can become a verbal compound embed from #3 output",
        {
            supported: activeActionCompoundContract.supported,
            incorporatedRoot: activeActionCompoundContract.incorporatedRoot,
            compoundVerbInput: activeActionCompoundContract.compoundVerbInput,
            parsedVerb: parsedActiveActionCompoundInput.verb,
            isMarkedTransitive: parsedActiveActionCompoundInput.isMarkedTransitive,
            result: generatedActiveActionCompoundSurface.result,
        },
        {
            supported: true,
            incorporatedRoot: "chukilis",
            compoundVerbInput: "(chukilis/tzajtzi)",
            parsedVerb: "chukilistzajtzi",
            isMarkedTransitive: false,
            result: "chukilistzajtzi",
        }
    );
    const activeActionNominalCompoundInventory = ctx.getActiveActionNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 37.5.4 active-action nominal-matrix inventory is explicit",
        activeActionNominalCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                status: "nawat-data-backed",
            },
        ]
    );
    const activeActionNominalContract = ctx.buildActiveActionNominalCompoundContinuationContract({
        actionNominalSurface: "chukilis",
        sourceSurface: "chuka",
        matrixRoot: "kal",
    });
    const generatedActiveActionNominalSurface = ctx.generateOrdinaryNncParadigm(activeActionNominalContract.ordinaryNncRequest);
    s.eq(
        "Andrews 37.5.4 active-action nounstem can become an ordinary NNC compound stem from #3 output",
        {
            supported: activeActionNominalContract.supported,
            incorporatedRoot: activeActionNominalContract.incorporatedRoot,
            compoundStem: activeActionNominalContract.compoundStem,
            ordinaryNncInput: activeActionNominalContract.ordinaryNncInput,
            result: generatedActiveActionNominalSurface.result,
            sourceKind: generatedActiveActionNominalSurface.source.sourceKind,
            nounClass: generatedActiveActionNominalSurface.nounClass,
        },
        {
            supported: true,
            incorporatedRoot: "chukilis",
            compoundStem: "chukiliskal",
            ordinaryNncInput: "(chukiliskal)",
            result: "chukiliskal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    const customaryAgentiveNominalInventory = ctx.getCustomaryAgentiveNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 36.3 customary-present agentive nominal-matrix inventory is explicit",
        customaryAgentiveNominalInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                grammarSource: "Andrews 36.3",
                nounClass: "zero",
                animacy: "inanimate",
                status: "nawat-data-backed",
            },
        ]
    );
    const customaryAgentiveNominalContract = ctx.buildCustomaryAgentiveNominalCompoundContinuationContract({
        customaryAgentiveStem: "nemini",
        sourceSurface: "nemini",
        matrixRoot: "kal",
    });
    const generatedCustomaryAgentiveNominalSurface = ctx.generateOrdinaryNncParadigm(
        customaryAgentiveNominalContract.ordinaryNncRequest
    );
    s.eq(
        "Andrews 36.3 fully nominalized customary-present agentive stem can become an ordinary NNC compound stem from #3 output",
        {
            supported: customaryAgentiveNominalContract.supported,
            customaryAgentiveStem: customaryAgentiveNominalContract.customaryAgentiveStem,
            incorporatedRoot: customaryAgentiveNominalContract.incorporatedRoot,
            compoundStem: customaryAgentiveNominalContract.compoundStem,
            ordinaryNncInput: customaryAgentiveNominalContract.ordinaryNncInput,
            result: generatedCustomaryAgentiveNominalSurface.result,
            sourceKind: generatedCustomaryAgentiveNominalSurface.source.sourceKind,
            nounClass: generatedCustomaryAgentiveNominalSurface.nounClass,
        },
        {
            supported: true,
            customaryAgentiveStem: "nemini",
            incorporatedRoot: "nemini",
            compoundStem: "neminikal",
            ordinaryNncInput: "(neminikal)",
            result: "neminikal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    const customaryAgentiveCompoundInventory = ctx.getCustomaryAgentiveCompoundEmbedMatrixInventory();
    s.eq(
        "Andrews 36.3 customary-present agentive compound-embed matrix inventory is explicit",
        customaryAgentiveCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            status: entry.status,
            matrixValency: entry.matrixValency,
            objectPrefix: entry.objectPrefix,
        })),
        [
            {
                id: "toca-incorporated-complement",
                classicalMatrix: "(toca)",
                nawatRoot: "tuka",
                grammarSource: "Andrews 36.3",
                status: "andrews-authoritative-nawat-data-backed",
                matrixValency: "transitive",
                objectPrefix: "ki",
            },
        ]
    );
    const customaryAgentiveCompoundContract = ctx.buildCustomaryAgentiveCompoundEmbedContinuationContract({
        customaryAgentiveStem: "nemini",
        sourceSurface: "nemini",
        matrixRoot: "tuka",
    });
    const parsedCustomaryAgentiveCompoundInput = ctx.parseVerbInput(customaryAgentiveCompoundContract.compoundVerbInput);
    const generatedCustomaryAgentiveCompoundSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: customaryAgentiveCompoundContract.objectPrefix,
            tronco: customaryAgentiveCompoundContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 36.3 fully nominalized customary-present agentive stem can become a transitive VNC compound embed from #3 output",
        {
            supported: customaryAgentiveCompoundContract.supported,
            customaryAgentiveStem: customaryAgentiveCompoundContract.customaryAgentiveStem,
            incorporatedRoot: customaryAgentiveCompoundContract.incorporatedRoot,
            compoundVerbInput: customaryAgentiveCompoundContract.compoundVerbInput,
            objectPrefix: customaryAgentiveCompoundContract.objectPrefix,
            parsedVerb: parsedCustomaryAgentiveCompoundInput.verb,
            isMarkedTransitive: parsedCustomaryAgentiveCompoundInput.isMarkedTransitive,
            result: generatedCustomaryAgentiveCompoundSurface.result,
        },
        {
            supported: true,
            customaryAgentiveStem: "nemini",
            incorporatedRoot: "nemini",
            compoundVerbInput: "-(nemini/tuka)",
            objectPrefix: "ki",
            parsedVerb: "neminituka",
            isMarkedTransitive: true,
            result: "kineminituka",
        }
    );
    const unsupportedCustomaryAgentiveCompoundContract = ctx.buildCustomaryAgentiveCompoundEmbedContinuationContract({
        customaryAgentiveStem: "nemini",
        matrixRoot: "kal",
    });
    s.eq(
        "Andrews 36.3 customary-present agentive compound embed rejects non-verbal matrices",
        {
            supported: unsupportedCustomaryAgentiveCompoundContract.supported,
            compoundVerbInput: unsupportedCustomaryAgentiveCompoundContract.compoundVerbInput,
            diagnostics: unsupportedCustomaryAgentiveCompoundContract.diagnostics,
        },
        {
            supported: false,
            compoundVerbInput: "",
            diagnostics: [
                "customary-agentive-compound-embed-unsupported-matrix",
                "customary-agentive-compound-embed-missing-verb-input",
            ],
        }
    );
    const unsupportedCustomaryAgentiveNominalContract = ctx.buildCustomaryAgentiveNominalCompoundContinuationContract({
        customaryAgentiveStem: "nemini",
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 36.3 customary-present agentive nominal compound rejects non-nominal matrices",
        {
            supported: unsupportedCustomaryAgentiveNominalContract.supported,
            compoundStem: unsupportedCustomaryAgentiveNominalContract.compoundStem,
            ordinaryNncInput: unsupportedCustomaryAgentiveNominalContract.ordinaryNncInput,
            diagnostics: unsupportedCustomaryAgentiveNominalContract.diagnostics,
        },
        {
            supported: false,
            compoundStem: "",
            ordinaryNncInput: "",
            diagnostics: [
                "customary-agentive-nominal-compound-unsupported-matrix",
                "customary-agentive-nominal-compound-missing-nnc-input",
            ],
        }
    );
    const preteritAgentiveCompoundInventory = ctx.getPreteritAgentiveCompoundEmbedMatrixInventory();
    s.eq(
        "Andrews 35.7 preterit-agentive compound-embed matrix inventory is explicit",
        preteritAgentiveCompoundInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "tzahtzi",
                classicalMatrix: "(tzahtzi)",
                nawatRoot: "tzajtzi",
                grammarSource: "Andrews 35.7",
                status: "nawat-data-backed",
                matrixValency: "intransitive",
            },
        ]
    );
    const preteritAgentiveCompoundContract = ctx.buildPreteritAgentiveCompoundEmbedContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "tzajtzi",
    });
    const parsedPreteritAgentiveCompoundInput = ctx.parseVerbInput(preteritAgentiveCompoundContract.compoundVerbInput);
    const generatedPreteritAgentiveCompoundSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: preteritAgentiveCompoundContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.7 preterit-agentive general-use stem can become a verbal compound embed from #3 output",
        {
            supported: preteritAgentiveCompoundContract.supported,
            preteritAgentiveStem: preteritAgentiveCompoundContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveCompoundContract.incorporatedRoot,
            compoundVerbInput: preteritAgentiveCompoundContract.compoundVerbInput,
            parsedVerb: parsedPreteritAgentiveCompoundInput.verb,
            result: generatedPreteritAgentiveCompoundSurface.result,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            compoundVerbInput: "(tamatka/tzajtzi)",
            parsedVerb: "tamatkatzajtzi",
            result: "tamatkatzajtzi",
        }
    );
    const preteritAgentiveNominalInventory = ctx.getPreteritAgentiveNominalCompoundMatrixInventory();
    s.eq(
        "Andrews 35.7 preterit-agentive nominal-matrix inventory is explicit",
        preteritAgentiveNominalInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            grammarSource: entry.grammarSource,
            nounClass: entry.nounClass,
            animacy: entry.animacy,
            status: entry.status,
        })),
        [
            {
                id: "cal-li",
                classicalMatrix: "(cal)-li",
                nawatRoot: "kal",
                grammarSource: "Andrews 35.7",
                nounClass: "zero",
                animacy: "inanimate",
                status: "nawat-data-backed",
            },
        ]
    );
    const preteritAgentiveNominalContract = ctx.buildPreteritAgentiveNominalCompoundContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "kal",
    });
    const generatedPreteritAgentiveNominalSurface = ctx.generateOrdinaryNncParadigm(preteritAgentiveNominalContract.ordinaryNncRequest);
    s.eq(
        "Andrews 35.7 preterit-agentive general-use stem can become an ordinary NNC compound stem from #3 output",
        {
            supported: preteritAgentiveNominalContract.supported,
            preteritAgentiveStem: preteritAgentiveNominalContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveNominalContract.incorporatedRoot,
            compoundStem: preteritAgentiveNominalContract.compoundStem,
            ordinaryNncInput: preteritAgentiveNominalContract.ordinaryNncInput,
            result: generatedPreteritAgentiveNominalSurface.result,
            sourceKind: generatedPreteritAgentiveNominalSurface.source.sourceKind,
            nounClass: generatedPreteritAgentiveNominalSurface.nounClass,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            compoundStem: "tamatkakal",
            ordinaryNncInput: "(tamatkakal)",
            result: "tamatkakal",
            sourceKind: "open-stem",
            nounClass: "zero",
        }
    );
    const preteritAgentiveOwnerhoodInventory = ctx.getPreteritAgentiveOwnerhoodMatrixInventory();
    s.eq(
        "Andrews 35.9-35.10 preterit-agentive ownerhood matrices use Nawat orthography",
        preteritAgentiveOwnerhoodInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            surfaceMatrix: entry.surfaceMatrix,
            ownerhoodKind: entry.ownerhoodKind,
            grammarSource: entry.grammarSource,
            status: entry.status,
        })),
        [
            {
                id: "tla-hua-ownerhood",
                classicalMatrix: "*tla-(-hua)",
                nawatRoot: "wa",
                surfaceMatrix: "waj",
                ownerhoodKind: "ownerhood",
                grammarSource: "Andrews 35.9",
                status: "andrews-authoritative-nawat-matrix-evidence",
            },
            {
                id: "tla-yo-a-abundant-ownerhood",
                classicalMatrix: "*tla-(-yo-a)",
                nawatRoot: "yua",
                surfaceMatrix: "yuj",
                ownerhoodKind: "abundant-ownerhood",
                grammarSource: "Andrews 35.10",
                status: "andrews-authoritative-nawat-matrix-evidence",
            },
        ]
    );
    const preteritAgentiveOwnerhoodContract = ctx.buildPreteritAgentiveOwnerhoodContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "wa",
    });
    const generatedPreteritAgentiveOwnerhoodSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: preteritAgentiveOwnerhoodContract.ownerhoodVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "pasado-remoto",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.9 preterit-agentive general-use stem can feed the ownerhood VNC matrix",
        {
            supported: preteritAgentiveOwnerhoodContract.supported,
            preteritAgentiveStem: preteritAgentiveOwnerhoodContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveOwnerhoodContract.incorporatedRoot,
            matrixRoot: preteritAgentiveOwnerhoodContract.matrixRoot,
            surfaceMatrix: preteritAgentiveOwnerhoodContract.surfaceMatrix,
            ownerhoodKind: preteritAgentiveOwnerhoodContract.ownerhoodKind,
            ownerhoodVerbInput: preteritAgentiveOwnerhoodContract.ownerhoodVerbInput,
            result: generatedPreteritAgentiveOwnerhoodSurface.result,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            matrixRoot: "wa",
            surfaceMatrix: "waj",
            ownerhoodKind: "ownerhood",
            ownerhoodVerbInput: "(tamatka)-(wa)",
            result: "tamatkawajka",
        }
    );
    const preteritAgentiveAbundantOwnerhoodContract = ctx.buildPreteritAgentiveOwnerhoodContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "yua",
    });
    const generatedPreteritAgentiveAbundantOwnerhoodSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: preteritAgentiveAbundantOwnerhoodContract.ownerhoodVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "pasado-remoto",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.10 preterit-agentive general-use stem can feed the abundant-ownerhood VNC matrix",
        {
            supported: preteritAgentiveAbundantOwnerhoodContract.supported,
            matrixRoot: preteritAgentiveAbundantOwnerhoodContract.matrixRoot,
            surfaceMatrix: preteritAgentiveAbundantOwnerhoodContract.surfaceMatrix,
            ownerhoodKind: preteritAgentiveAbundantOwnerhoodContract.ownerhoodKind,
            ownerhoodVerbInput: preteritAgentiveAbundantOwnerhoodContract.ownerhoodVerbInput,
            result: generatedPreteritAgentiveAbundantOwnerhoodSurface.result,
        },
        {
            supported: true,
            matrixRoot: "yua",
            surfaceMatrix: "yuj",
            ownerhoodKind: "abundant-ownerhood",
            ownerhoodVerbInput: "(tamatka)-(yua)",
            result: "tamatkayujka",
        }
    );
    const unsupportedPreteritAgentiveOwnerhoodContract = ctx.buildPreteritAgentiveOwnerhoodContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "e",
    });
    s.eq(
        "Andrews 35.9 preterit-agentive ownerhood rejects non-authorized ownerhood matrices for this path",
        {
            supported: unsupportedPreteritAgentiveOwnerhoodContract.supported,
            ownerhoodVerbInput: unsupportedPreteritAgentiveOwnerhoodContract.ownerhoodVerbInput,
            diagnostics: unsupportedPreteritAgentiveOwnerhoodContract.diagnostics,
        },
        {
            supported: false,
            ownerhoodVerbInput: "",
            diagnostics: [
                "preterit-agentive-ownerhood-unsupported-matrix",
                "preterit-agentive-ownerhood-missing-verb-input",
            ],
        }
    );
    const preteritAgentiveComplementInventory = ctx.getPreteritAgentiveComplementMatrixInventory();
    s.eq(
        "Andrews 35.12 preterit-agentive incorporated-complement matrices are Nawat data-backed",
        preteritAgentiveComplementInventory.map((entry) => ({
            id: entry.id,
            nawatRoot: entry.nawatRoot,
            objectPrefix: entry.objectPrefix,
            grammarSource: entry.grammarSource,
            status: entry.status,
        })),
        [
            {
                id: "te-tlalia",
                nawatRoot: "talia",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-nawat-data-backed",
            },
            {
                id: "te-cahua",
                nawatRoot: "kawa",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-nawat-data-backed",
            },
            {
                id: "te-pehpena",
                nawatRoot: "pejpena",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-nawat-data-backed",
            },
            {
                id: "te-tla-mati",
                nawatRoot: "mati",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-nawat-data-backed",
            },
            {
                id: "te-toca",
                nawatRoot: "tuka",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-nawat-data-backed",
            },
            {
                id: "te-nehnequi",
                nawatRoot: "nejneki",
                objectPrefix: "ki",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-nawat-data-backed",
            },
        ]
    );
    const preteritAgentiveComplementContract = ctx.buildPreteritAgentiveComplementContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "mati",
    });
    const generatedPreteritAgentiveComplementSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: preteritAgentiveComplementContract.objectPrefix,
            tronco: preteritAgentiveComplementContract.complementVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.12 preterit-agentive general-use stem can feed incorporated-complement VNC matrices",
        {
            supported: preteritAgentiveComplementContract.supported,
            preteritAgentiveStem: preteritAgentiveComplementContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveComplementContract.incorporatedRoot,
            matrixRoot: preteritAgentiveComplementContract.matrixRoot,
            objectPrefix: preteritAgentiveComplementContract.objectPrefix,
            complementVerbInput: preteritAgentiveComplementContract.complementVerbInput,
            result: generatedPreteritAgentiveComplementSurface.result,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            matrixRoot: "mati",
            objectPrefix: "ki",
            complementVerbInput: "-(tamatka/mati)",
            result: "kitamatkamati",
        }
    );
    const preteritAgentiveComplementTaliaContract = ctx.buildPreteritAgentiveComplementContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "talia",
    });
    const generatedPreteritAgentiveComplementTaliaSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: preteritAgentiveComplementTaliaContract.objectPrefix,
            tronco: preteritAgentiveComplementTaliaContract.complementVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.12 incorporated-complement continuation can use talia as a Nawat matrix",
        {
            supported: preteritAgentiveComplementTaliaContract.supported,
            complementVerbInput: preteritAgentiveComplementTaliaContract.complementVerbInput,
            result: generatedPreteritAgentiveComplementTaliaSurface.result,
        },
        {
            supported: true,
            complementVerbInput: "-(tamatka/talia)",
            result: "kitamatkatalia",
        }
    );
    const unsupportedPreteritAgentiveComplementContract = ctx.buildPreteritAgentiveComplementContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 35.12 preterit-agentive complement rejects non-complement matrices",
        {
            supported: unsupportedPreteritAgentiveComplementContract.supported,
            complementVerbInput: unsupportedPreteritAgentiveComplementContract.complementVerbInput,
            diagnostics: unsupportedPreteritAgentiveComplementContract.diagnostics,
        },
        {
            supported: false,
            complementVerbInput: "",
            diagnostics: [
                "preterit-agentive-complement-unsupported-matrix",
                "preterit-agentive-complement-missing-verb-input",
            ],
        }
    );
    const preteritAgentiveAdverbialInventory = ctx.getPreteritAgentiveAdverbialMatrixInventory();
    s.eq(
        "Andrews 35.12 preterit-agentive adverbial-manner matrix inventory is Nawat data-backed",
        preteritAgentiveAdverbialInventory.map((entry) => ({
            id: entry.id,
            nawatRoot: entry.nawatRoot,
            matrixValency: entry.matrixValency,
            adverbialFocus: entry.adverbialFocus,
            grammarSource: entry.grammarSource,
            status: entry.status,
        })),
        [
            {
                id: "nemi-adverbial-manner",
                nawatRoot: "nemi",
                matrixValency: "intransitive",
                adverbialFocus: "subject",
                grammarSource: "Andrews 35.12",
                status: "andrews-authoritative-nawat-data-backed",
            },
        ]
    );
    const preteritAgentiveAdverbialContract = ctx.buildPreteritAgentiveAdverbialContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "nemi",
    });
    const generatedPreteritAgentiveAdverbialSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: preteritAgentiveAdverbialContract.objectPrefix,
            tronco: preteritAgentiveAdverbialContract.adverbialVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.12 preterit-agentive general-use stem can feed an adverbial-manner VNC matrix",
        {
            supported: preteritAgentiveAdverbialContract.supported,
            preteritAgentiveStem: preteritAgentiveAdverbialContract.preteritAgentiveStem,
            incorporatedRoot: preteritAgentiveAdverbialContract.incorporatedRoot,
            matrixRoot: preteritAgentiveAdverbialContract.matrixRoot,
            adverbialFocus: preteritAgentiveAdverbialContract.adverbialFocus,
            objectPrefix: preteritAgentiveAdverbialContract.objectPrefix,
            adverbialVerbInput: preteritAgentiveAdverbialContract.adverbialVerbInput,
            result: generatedPreteritAgentiveAdverbialSurface.result,
        },
        {
            supported: true,
            preteritAgentiveStem: "tamatka",
            incorporatedRoot: "tamatka",
            matrixRoot: "nemi",
            adverbialFocus: "subject",
            objectPrefix: "",
            adverbialVerbInput: "(tamatka/nemi)",
            result: "tamatkanemi",
        }
    );
    const unsupportedPreteritAgentiveAdverbialContract = ctx.buildPreteritAgentiveAdverbialContinuationContract({
        preteritAgentiveStem: "tamatka",
        sourceSurface: "tamatki",
        matrixRoot: "tzajtzi",
    });
    s.eq(
        "Andrews 35.12 preterit-agentive adverbial rejects non-adverbial matrices",
        {
            supported: unsupportedPreteritAgentiveAdverbialContract.supported,
            adverbialVerbInput: unsupportedPreteritAgentiveAdverbialContract.adverbialVerbInput,
            diagnostics: unsupportedPreteritAgentiveAdverbialContract.diagnostics,
        },
        {
            supported: false,
            adverbialVerbInput: "",
            diagnostics: [
                "preterit-agentive-adverbial-unsupported-matrix",
                "preterit-agentive-adverbial-missing-verb-input",
            ],
        }
    );
    const ordinaryNounOwnerhoodInventory = ctx.getOrdinaryNounOwnerhoodMatrixInventory();
    s.eq(
        "Andrews 35.9-35.10 ordinary noun ownerhood matrices keep class compatibility explicit",
        ordinaryNounOwnerhoodInventory.map((entry) => ({
            id: entry.id,
            nawatRoot: entry.nawatRoot,
            surfaceMatrix: entry.surfaceMatrix,
            ownerhoodKind: entry.ownerhoodKind,
            defaultForNounClasses: entry.defaultForNounClasses,
        })),
        [
            {
                id: "tla-e-ownerhood",
                nawatRoot: "e",
                surfaceMatrix: "ej",
                ownerhoodKind: "ownerhood",
                defaultForNounClasses: ["t"],
            },
            {
                id: "tla-hua-ownerhood",
                nawatRoot: "wa",
                surfaceMatrix: "waj",
                ownerhoodKind: "ownerhood",
                defaultForNounClasses: ["in", "zero"],
            },
            {
                id: "tla-yo-a-abundant-ownerhood",
                nawatRoot: "yua",
                surfaceMatrix: "yuj",
                ownerhoodKind: "abundant-ownerhood",
                defaultForNounClasses: ["t", "ti", "in", "zero"],
            },
        ]
    );
    const ordinaryTClassOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "shuchi",
        nounClass: "t",
        sourceSurface: "shuchit",
        sourceKind: "fixture",
    });
    const generatedOrdinaryTClassOwnerhoodSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: ordinaryTClassOwnerhoodContract.ownerhoodVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "pasado-remoto",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.9 ordinary t-class nouns feed the e/ej ownerhood matrix from #3 output",
        {
            supported: ordinaryTClassOwnerhoodContract.supported,
            evidenceStatus: ordinaryTClassOwnerhoodContract.evidenceStatus,
            nounStem: ordinaryTClassOwnerhoodContract.nounStem,
            nounClass: ordinaryTClassOwnerhoodContract.nounClass,
            matrixRoot: ordinaryTClassOwnerhoodContract.matrixRoot,
            surfaceMatrix: ordinaryTClassOwnerhoodContract.surfaceMatrix,
            ownerhoodVerbInput: ordinaryTClassOwnerhoodContract.ownerhoodVerbInput,
            result: generatedOrdinaryTClassOwnerhoodSurface.result,
        },
        {
            supported: true,
            evidenceStatus: "source-fixture-backed",
            nounStem: "shuchi",
            nounClass: "t",
            matrixRoot: "e",
            surfaceMatrix: "ej",
            ownerhoodVerbInput: "(shuchi)-(e)",
            result: "shuchiejka",
        }
    );
    const ordinaryZeroClassFormulaSlots = {
        pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "" },
        predicateStem: { slot: "STEM", stem: "kal", displayStem: "kal" },
        num1Num2: { slot: "num1-num2", connector: "", displayConnector: "Ø" },
    };
    const ordinaryZeroClassFormulaEcho = "#Ø-Ø(kal)Ø#";
    const ordinaryZeroClassOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "kal",
        nounClass: "zero",
        sourceSurface: "kal",
        sourceKind: "fixture",
        sourceFormulaSlots: ordinaryZeroClassFormulaSlots,
        sourceFormulaEcho: ordinaryZeroClassFormulaEcho,
    });
    const generatedOrdinaryZeroClassOwnerhoodSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: ordinaryZeroClassOwnerhoodContract.ownerhoodVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "pasado-remoto",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.9 ordinary zero-class nouns feed the wa/waj ownerhood matrix from #3 output",
        {
            supported: ordinaryZeroClassOwnerhoodContract.supported,
            nounStem: ordinaryZeroClassOwnerhoodContract.nounStem,
            nounClass: ordinaryZeroClassOwnerhoodContract.nounClass,
            matrixRoot: ordinaryZeroClassOwnerhoodContract.matrixRoot,
            surfaceMatrix: ordinaryZeroClassOwnerhoodContract.surfaceMatrix,
            sourceFormulaEcho: ordinaryZeroClassOwnerhoodContract.sourceFormulaEcho,
            frameFormulaEcho: ordinaryZeroClassOwnerhoodContract.grammarFrame?.morphBoundaryFrame?.formulaEcho || "",
            framePredicateStem: ordinaryZeroClassOwnerhoodContract.grammarFrame?.morphBoundaryFrame?.formulaSlots?.predicateStem?.stem || "",
            ownerhoodVerbInput: ordinaryZeroClassOwnerhoodContract.ownerhoodVerbInput,
            result: generatedOrdinaryZeroClassOwnerhoodSurface.result,
        },
        {
            supported: true,
            nounStem: "kal",
            nounClass: "zero",
            matrixRoot: "wa",
            surfaceMatrix: "waj",
            sourceFormulaEcho: ordinaryZeroClassFormulaEcho,
            frameFormulaEcho: ordinaryZeroClassFormulaEcho,
            framePredicateStem: "kal",
            ownerhoodVerbInput: "(kal)-(wa)",
            result: "kalwajka",
        }
    );
    const ordinaryAbundantOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "shuchi",
        nounClass: "t",
        sourceSurface: "shuchit",
        sourceKind: "fixture",
        ownerhoodKind: "abundant-ownerhood",
    });
    const generatedOrdinaryAbundantOwnerhoodSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: ordinaryAbundantOwnerhoodContract.ownerhoodVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "pasado-remoto",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 35.10 ordinary nouns feed the yua/yuj abundant-ownerhood matrix from #3 output",
        {
            supported: ordinaryAbundantOwnerhoodContract.supported,
            matrixRoot: ordinaryAbundantOwnerhoodContract.matrixRoot,
            surfaceMatrix: ordinaryAbundantOwnerhoodContract.surfaceMatrix,
            ownerhoodKind: ordinaryAbundantOwnerhoodContract.ownerhoodKind,
            ownerhoodVerbInput: ordinaryAbundantOwnerhoodContract.ownerhoodVerbInput,
            result: generatedOrdinaryAbundantOwnerhoodSurface.result,
        },
        {
            supported: true,
            matrixRoot: "yua",
            surfaceMatrix: "yuj",
            ownerhoodKind: "abundant-ownerhood",
            ownerhoodVerbInput: "(shuchi)-(yua)",
            result: "shuchiyujka",
        }
    );
    const ambiguousTiOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "xilun",
        nounClass: "ti",
        sourceSurface: "xilunti",
        sourceKind: "open-stem",
    });
    const mismatchedZeroOwnerhoodInput = ctx.buildOrdinaryNounOwnerhoodVerbInput({
        nounStem: "kal",
        nounClass: "zero",
        matrixRoot: "e",
    });
    s.eq(
        "Andrews 35.9 ordinary ti-class ownerhood remains diagnostic without a confirmed subclass route",
        {
            supported: ambiguousTiOwnerhoodContract.supported,
            evidenceStatus: ambiguousTiOwnerhoodContract.evidenceStatus,
            ownerhoodVerbInput: ambiguousTiOwnerhoodContract.ownerhoodVerbInput,
            diagnostics: ambiguousTiOwnerhoodContract.diagnostics,
            mismatchedZeroOwnerhoodInput,
        },
        {
            supported: false,
            evidenceStatus: "structural-open-stem",
            ownerhoodVerbInput: "",
            diagnostics: [
                "ordinary-noun-ownerhood-ambiguous-ti-class",
                "ordinary-noun-ownerhood-unsupported-matrix",
                "ordinary-noun-ownerhood-missing-verb-input",
            ],
            mismatchedZeroOwnerhoodInput: "",
        }
    );
    const unsupportedActiveActionCompoundContract = ctx.buildActiveActionCompoundEmbedContinuationContract({
        actionNominalSurface: "chukilis",
        sourceSurface: "chuka",
        matrixRoot: "ni",
    });
    s.eq(
        "Andrews 37.5.4 active-action compound-embed contract rejects unsupported matrices",
        {
            supported: unsupportedActiveActionCompoundContract.supported,
            compoundVerbInput: unsupportedActiveActionCompoundContract.compoundVerbInput,
            diagnostics: unsupportedActiveActionCompoundContract.diagnostics,
        },
        {
            supported: false,
            compoundVerbInput: "",
            diagnostics: [
                "active-action-compound-embed-unsupported-matrix",
                "active-action-compound-embed-missing-verb-input",
            ],
        }
    );
    const characteristicMatrixInventory = ctx.getPatientivoCharacteristicPropertyMatrixInventory();
    s.eq(
        "Andrews 39.9 characteristic-property matrix inventory is data-backed",
        characteristicMatrixInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            matrixValency: entry.matrixValency,
        })),
        [
            {
                id: "chic-a-hu-a",
                classicalMatrix: "(chic-a-hu-a)",
                nawatRoot: "chikawa",
                status: "nawat-data-backed",
                matrixValency: "transitive",
            },
        ]
    );
    const characteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "mikkayut",
        sourceSurface: "mikkayut",
        matrixRoot: "chikawa",
    });
    const generatedCharacteristicSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: characteristicContract.objectPrefix,
            tronco: characteristicContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.9 characteristic-property embed omits Nawat -yut before V matrix generation",
        {
            supported: characteristicContract.supported,
            sourceState: characteristicContract.sourceState,
            characteristicSurface: characteristicContract.characteristicSurface,
            omittedSuffix: characteristicContract.omittedSuffix,
            incorporatedRoot: characteristicContract.incorporatedRoot,
            compoundVerbInput: characteristicContract.compoundVerbInput,
            objectPrefix: characteristicContract.objectPrefix,
            result: generatedCharacteristicSurface.result,
        },
        {
            supported: true,
            sourceState: "absolutive",
            characteristicSurface: "mikkayut",
            omittedSuffix: "yut",
            incorporatedRoot: "mikka",
            compoundVerbInput: "-(mikka/chikawa)",
            objectPrefix: "ki",
            result: "kimikkachikawa",
        }
    );
    const possessedCharacteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "numikkayu",
        sourceSurface: "numikkayu",
        possessorPrefix: "nu",
        matrixRoot: "chikawa",
    });
    const generatedPossessedCharacteristicSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: possessedCharacteristicContract.objectPrefix,
            tronco: possessedCharacteristicContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.9 possessive characteristic-property embed omits Nawat -yu and promotes possessor",
        {
            supported: possessedCharacteristicContract.supported,
            sourceState: possessedCharacteristicContract.sourceState,
            sourceRole: possessedCharacteristicContract.sourceRole,
            possessorPrefix: possessedCharacteristicContract.possessorPrefix,
            omittedSuffix: possessedCharacteristicContract.omittedSuffix,
            incorporatedRoot: possessedCharacteristicContract.incorporatedRoot,
            compoundVerbInput: possessedCharacteristicContract.compoundVerbInput,
            objectPrefix: possessedCharacteristicContract.objectPrefix,
            result: generatedPossessedCharacteristicSurface.result,
        },
        {
            supported: true,
            sourceState: "possessive",
            sourceRole: "possessor",
            possessorPrefix: "nu",
            omittedSuffix: "yu",
            incorporatedRoot: "mikka",
            compoundVerbInput: "-(mikka/chikawa)",
            objectPrefix: "nech",
            result: "nechmikkachikawa",
        }
    );
    s.eq(
        "Andrews 39.9 characteristic-property contract exposes matrix-omission formation frame",
        {
            absolutive: {
                grammarSource: characteristicContract.formationFrame.grammarSource,
                sourceState: characteristicContract.formationFrame.sourceState,
                omittedClassicalMatrix: characteristicContract.formationFrame.omittedMatrix.classical,
                omittedNawatMatrix: characteristicContract.formationFrame.omittedMatrix.nawat,
                incorporatedRole: characteristicContract.formationFrame.incorporated.role,
                incorporatedRoot: characteristicContract.formationFrame.incorporated.root,
                outsideObjectOriginRole: characteristicContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: characteristicContract.formationFrame.outsideObject.prefix,
                doesNotPreserveYoMatrix: characteristicContract.formationFrame.valencePolicy.doesNotPreserveYoMatrix,
            },
            possessive: {
                grammarSource: possessedCharacteristicContract.formationFrame.grammarSource,
                sourceState: possessedCharacteristicContract.formationFrame.sourceState,
                omittedClassicalMatrix: possessedCharacteristicContract.formationFrame.omittedMatrix.classical,
                omittedNawatMatrix: possessedCharacteristicContract.formationFrame.omittedMatrix.nawat,
                incorporatedRole: possessedCharacteristicContract.formationFrame.incorporated.role,
                incorporatedRoot: possessedCharacteristicContract.formationFrame.incorporated.root,
                outsideObjectOriginRole: possessedCharacteristicContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: possessedCharacteristicContract.formationFrame.outsideObject.prefix,
                possessorBecomesOutsideObject: possessedCharacteristicContract.formationFrame.valencePolicy.possessorBecomesOutsideObject,
            },
        },
        {
            absolutive: {
                grammarSource: "Andrews 39.9",
                sourceState: "absolutive",
                omittedClassicalMatrix: "(-yo)-tl",
                omittedNawatMatrix: "yut",
                incorporatedRole: "incorporated-object",
                incorporatedRoot: "mikka",
                outsideObjectOriginRole: "matrix-default-object",
                outsideObjectPrefix: "ki",
                doesNotPreserveYoMatrix: true,
            },
            possessive: {
                grammarSource: "Andrews 39.9",
                sourceState: "possessive",
                omittedClassicalMatrix: "(-yo)-tl",
                omittedNawatMatrix: "yu",
                incorporatedRole: "incorporated-object",
                incorporatedRoot: "mikka",
                outsideObjectOriginRole: "possessor",
                outsideObjectPrefix: "nech",
                possessorBecomesOutsideObject: true,
            },
        }
    );
    s.eq(
        "Andrews incorporation route frames distinguish object, complement, and adverb roles behind a shared final formula shape",
        (() => {
            const routeFrames = [
                characteristicContract.incorporationRouteFrame,
                preteritAgentiveComplementContract.incorporationRouteFrame,
                preteritAgentiveAdverbialContract.incorporationRouteFrame,
            ];
            const unresolvedMatrixValenceRouteFrame = ctx.buildDerivationContinuationIncorporationRouteFrame({
                outputKind: "test-incorporated-object-continuation-contract",
                grammarSource: "Andrews test",
                supported: true,
                sourceSurface: "source-vnc",
                sourceFormulaSlots: {
                    obj1: { slot: "obj1", prefix: "ki" },
                    predicateStem: { slot: "STEM", stem: "source" },
                },
                incorporatedRoot: "kal",
                formationFrame: {
                    incorporated: {
                        role: "incorporated-object",
                        root: "kal",
                    },
                    matrix: {
                        root: "mati",
                    },
                },
            }, {
                outputKind: "test-incorporated-object-continuation-contract",
                supported: true,
                targetInput: "-(kal/mati)",
                routeStage: "preview-continuation",
                andrewsRefs: ["Andrews test"],
            });
            return {
                finalFormulaShapes: routeFrames.map((frame) => frame?.finalFormulaShape || ""),
                embedRoles: routeFrames.map((frame) => frame?.embedRole || ""),
                consumedObjectSlots: routeFrames.map((frame) => frame?.consumedObjectSlot || ""),
                matrixValences: routeFrames.map((frame) => frame?.matrixValence || ""),
                valenceDeltas: routeFrames.map((frame) => frame?.valenceDelta ?? null),
                stemInternalObjectSlotDeltas: routeFrames.map((frame) => frame?.valenceEffects?.stemInternalObjectSlotDelta ?? null),
                complementSlotDeltas: routeFrames.map((frame) => frame?.valenceEffects?.complementSlotDelta ?? null),
                adverbialFunctionDeltas: routeFrames.map((frame) => frame?.valenceEffects?.adverbialFunctionDelta ?? null),
                remainingExternalObjectSlots: routeFrames.map((frame) => (
                    Array.isArray(frame?.remainingExternalObjectSlots)
                        ? frame.remainingExternalObjectSlots.map((slot) => `${slot.slotId}:${slot.prefix}`)
                        : []
                )),
                objectSlotOwnershipKinds: routeFrames.map((frame) => frame?.objectSlotOwnership?.kind || ""),
                consumedObjectSlotOwners: routeFrames.map((frame) => frame?.objectSlotOwnership?.consumedObjectSlotOwnedBy || ""),
                remainingObjectSlotOwners: routeFrames.map((frame) => frame?.objectSlotOwnership?.remainingExternalObjectSlotsOwnedBy || ""),
                embeddedRoleLicensers: routeFrames.map((frame) => frame?.objectSlotOwnership?.embeddedRoleLicensedBy || ""),
                matrixValenceFramesFixed: routeFrames.map((frame) => frame?.objectSlotOwnership?.matrixValenceFrameFixed === true),
                sourcePrincipalSurfaces: routeFrames.map((frame) => frame?.sourcePrincipalVnc?.surface || ""),
                sourceAdjunctKinds: routeFrames.map((frame) => frame?.sourceAdjunctNnc?.kind || ""),
                andrewsSections: routeFrames.map((frame) => frame?.andrewsSection || ""),
                generationStatuses: routeFrames.map((frame) => frame?.generationStatus || ""),
                topLevelRouteFrameKind: characteristicContract.routeFrame?.kind || "",
                contractCarriesFrame: characteristicContract.grammarFrame?.morphBoundaryFrame?.incorporationRouteFrame?.embedRole || "",
                grammarSourceRouteFrameKind: characteristicContract.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.kind || "",
                grammarTargetRouteFrameKind: characteristicContract.grammarFrame?.routeContract?.targetContract?.sourceRouteFrame?.kind || "",
                grammarStemRouteFrameKind: characteristicContract.grammarFrame?.stemFrame?.sourceRouteFrame?.kind || "",
                grammarMorphRouteFrameKind: characteristicContract.grammarFrame?.morphBoundaryFrame?.sourceRouteFrame?.kind || "",
                grammarParticipantRouteFrameKind: characteristicContract.grammarFrame?.participantFrame?.sourceRouteFrame?.kind || "",
                routeLicensesRole: routeFrames.every((frame) => frame?.routeFrameLicensesEmbedRole === true),
                finalShapeDoesNotLicenseRole: routeFrames.every((frame) => frame?.finalFormulaShapeDoesNotLicenseRole === true),
                functionUseDoesNotLicenseRole: routeFrames.every((frame) => frame?.functionUseDoesNotLicenseRole === true),
                routeLicensesObjectSlotOwnership: routeFrames.every((frame) => frame?.routeFrameLicensesObjectSlotOwnership === true),
                finalShapeDoesNotLicenseObjectSlots: routeFrames.every((frame) => frame?.finalFormulaShapeDoesNotLicenseObjectSlots === true),
                functionUseDoesNotLicenseObjectSlots: routeFrames.every((frame) => (
                    frame?.functionUseDoesNotLicenseObjectSlots === true
                    && frame?.objectSlotOwnership?.functionUseOwnsObjectSlots === false
                    && frame?.objectSlotOwnership?.finalFormulaShapeOwnsObjectSlots === false
                )),
                participantOwnershipFrameKind: characteristicContract.grammarFrame?.participantFrame?.objectSlotOwnership?.kind || "",
                unresolvedMatrixValenceRouteFrame: {
                    matrixValence: unresolvedMatrixValenceRouteFrame?.matrixValence || "",
                    matrixValenceFrameFixed: unresolvedMatrixValenceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
                    routeFrameOwnsObjectSlotLicensing: unresolvedMatrixValenceRouteFrame?.objectSlotOwnership?.routeFrameOwnsObjectSlotLicensing === true,
                    matrixValenceFrameMustBeFixed: unresolvedMatrixValenceRouteFrame?.objectSlotOwnership?.matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership === true,
                    routeLicensesObjectSlotOwnership: unresolvedMatrixValenceRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
                    finalShapeDoesNotLicenseObjectSlots: unresolvedMatrixValenceRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
                    functionUseDoesNotLicenseObjectSlots: unresolvedMatrixValenceRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
                },
            };
        })(),
        {
            finalFormulaShapes: [
                "compound-vnc-embed-before-matrix",
                "compound-vnc-embed-before-matrix",
                "compound-vnc-embed-before-matrix",
            ],
            embedRoles: [
                "incorporated-object",
                "incorporated-complement",
                "incorporated-adverb",
            ],
            consumedObjectSlots: ["obj1", "complement", ""],
            matrixValences: ["transitive", "transitive", "intransitive"],
            valenceDeltas: [1, 1, 0],
            stemInternalObjectSlotDeltas: [1, 0, 0],
            complementSlotDeltas: [0, 1, 0],
            adverbialFunctionDeltas: [0, 0, 1],
            remainingExternalObjectSlots: [
                ["obj1:ki"],
                ["obj1:ki"],
                [],
            ],
            objectSlotOwnershipKinds: [
                "andrews-incorporation-object-slot-ownership-frame",
                "andrews-incorporation-object-slot-ownership-frame",
                "andrews-incorporation-object-slot-ownership-frame",
            ],
            consumedObjectSlotOwners: ["route-frame", "route-frame", "none"],
            remainingObjectSlotOwners: ["matrix-route-frame", "matrix-route-frame", "none"],
            embeddedRoleLicensers: [
                "andrews-incorporation-route-frame",
                "andrews-incorporation-route-frame",
                "andrews-incorporation-route-frame",
            ],
            matrixValenceFramesFixed: [true, true, true],
            sourcePrincipalSurfaces: ["mikkayut", "tamatki", "tamatki"],
            sourceAdjunctKinds: [
                "characteristic-property-nounstem",
                "preterit-agentive-nounstem",
                "preterit-agentive-nounstem",
            ],
            andrewsSections: ["Andrews 39.9", "Andrews 35.12", "Andrews 35.12"],
            generationStatuses: ["supported", "supported", "supported"],
            topLevelRouteFrameKind: "andrews-incorporation-route-frame",
            contractCarriesFrame: "incorporated-object",
            grammarSourceRouteFrameKind: "andrews-incorporation-route-frame",
            grammarTargetRouteFrameKind: "andrews-incorporation-route-frame",
            grammarStemRouteFrameKind: "andrews-incorporation-route-frame",
            grammarMorphRouteFrameKind: "andrews-incorporation-route-frame",
            grammarParticipantRouteFrameKind: "andrews-incorporation-route-frame",
            routeLicensesRole: true,
            finalShapeDoesNotLicenseRole: true,
            functionUseDoesNotLicenseRole: true,
            routeLicensesObjectSlotOwnership: true,
            finalShapeDoesNotLicenseObjectSlots: true,
            functionUseDoesNotLicenseObjectSlots: true,
            participantOwnershipFrameKind: "andrews-incorporation-object-slot-ownership-frame",
            unresolvedMatrixValenceRouteFrame: {
                matrixValence: "",
                matrixValenceFrameFixed: false,
                routeFrameOwnsObjectSlotLicensing: false,
                matrixValenceFrameMustBeFixed: true,
                routeLicensesObjectSlotOwnership: false,
                finalShapeDoesNotLicenseObjectSlots: true,
                functionUseDoesNotLicenseObjectSlots: true,
            },
        }
    );
    const yulCharacteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "yulyut",
        sourceSurface: "yulyut",
        matrixRoot: "chikawa",
    });
    const generatedYulCharacteristicSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: yulCharacteristicContract.objectPrefix,
            tronco: yulCharacteristicContract.compoundVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.9 contraction reaches the repo-backed yulchikawa pattern",
        {
            incorporatedRoot: yulCharacteristicContract.incorporatedRoot,
            compoundVerbInput: yulCharacteristicContract.compoundVerbInput,
            result: generatedYulCharacteristicSurface.result,
        },
        {
            incorporatedRoot: "yul",
            compoundVerbInput: "-(yul/chikawa)",
            result: "kiyulchikawa",
        }
    );
    const unsupportedCharacteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "mikka",
        sourceSurface: "mikka",
        matrixRoot: "chikawa",
    });
    s.eq(
        "Andrews 39.9 characteristic-property contraction does not strip non-yut surfaces",
        {
            supported: unsupportedCharacteristicContract.supported,
            incorporatedRoot: unsupportedCharacteristicContract.incorporatedRoot,
            compoundVerbInput: unsupportedCharacteristicContract.compoundVerbInput,
            diagnostics: unsupportedCharacteristicContract.diagnostics,
        },
        {
            supported: false,
            incorporatedRoot: "",
            compoundVerbInput: "",
            diagnostics: ["patientivo-characteristic-property-missing-yut-suffix"],
        }
    );

    const possessivePrelocativeContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "mutamatiyat",
        possessorPrefix: "mu",
        patientivoSource: "imperfectivo",
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
    });
    s.eq(
        "Andrews 39.8 possessive patientive source promotes possessor into outside object",
        {
            supported: possessivePrelocativeContract.supported,
            sourceState: possessivePrelocativeContract.sourceState,
            sourceRole: possessivePrelocativeContract.objectTransfer.sourceRole,
            objectCase: possessivePrelocativeContract.objectTransfer.objectCase,
            objectLine: possessivePrelocativeContract.objectTransfer.objectLine,
            objectPrefix: possessivePrelocativeContract.objectTransfer.objectPrefix,
            prelocativeVerbInput: possessivePrelocativeContract.prelocativeVerbInput,
        },
        {
            supported: true,
            sourceState: "possessive",
            sourceRole: "possessor",
            objectCase: "objective",
            objectLine: "mainline",
            objectPrefix: "metz",
            prelocativeVerbInput: "-(tamatiya/tajtani)",
        }
    );
    const matrixInventory = ctx.getPatientivoPrelocativeMatrixInventory();
    s.eq(
        "Andrews 39.8 patientive prelocative matrix inventory is explicit",
        matrixInventory.map((entry) => ({
            id: entry.id,
            classicalMatrix: entry.classicalMatrix,
            nawatRoot: entry.nawatRoot,
            status: entry.status,
            sourceStates: entry.sourceStates,
        })),
        [
            {
                id: "tla-itta",
                classicalMatrix: "te- ~ tla-(itta)",
                nawatRoot: "ita",
                status: "nawat-data-backed",
                sourceStates: ["absolutive"],
            },
            {
                id: "tla-mati",
                classicalMatrix: "te- ~ tla-(mati)",
                nawatRoot: "mati",
                status: "nawat-data-backed",
                sourceStates: ["absolutive"],
            },
            {
                id: "tla-nequi",
                classicalMatrix: "te- ~ tla-(nequi)",
                nawatRoot: "neki",
                status: "nawat-data-backed",
                sourceStates: ["absolutive"],
            },
            {
                id: "tla-toca",
                classicalMatrix: "te- ~ tla-(toca)",
                nawatRoot: "tuka",
                status: "nawat-data-backed",
                sourceStates: ["absolutive", "possessive"],
            },
            {
                id: "tla-tlani",
                classicalMatrix: "tla-(tlani)",
                nawatRoot: "tajtani",
                status: "nawat-data-backed",
                sourceStates: ["absolutive", "possessive"],
            },
            {
                id: "tla-ih-tlani",
                classicalMatrix: "tla-(ih-tlani)",
                nawatRoot: "tatajtania",
                status: "nawat-data-backed",
                sourceStates: ["possessive"],
            },
            {
                id: "tla-tem-o-a",
                classicalMatrix: "tla-(tem-o-a)",
                nawatRoot: "temua",
                status: "nawat-data-backed",
                sourceStates: ["possessive"],
            },
        ]
    );
    const unsupportedNiMatrixContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "tamatiya",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "ni",
    });
    s.eq(
        "Andrews 39.7-39.8 patientive continuation rejects the previous non-Andrews ni matrix",
        {
            supported: unsupportedNiMatrixContract.supported,
            matrixSupported: unsupportedNiMatrixContract.matrix.supported,
            prelocativeVerbInput: unsupportedNiMatrixContract.prelocativeVerbInput,
            diagnostics: unsupportedNiMatrixContract.diagnostics,
        },
        {
            supported: false,
            matrixSupported: false,
            prelocativeVerbInput: "",
            diagnostics: [
                "patientivo-prelocative-unsupported-matrix",
                "patientivo-prelocative-missing-verb-input",
            ],
        }
    );
    s.eq(
        "Andrews 39.7 absolutive source can generate repo-backed incorporated-complement matrices",
        ["ita", "mati", "neki", "tuka"].map((matrixRoot) => {
            const contract = ctx.buildPatientivoPrelocativeContinuationContract({
                patientivoSurface: "tamatiyat",
                sourceSurface: "tamatiya",
                selection: {
                    subjectPrefix: "ni",
                    subjectSuffix: "",
                },
                patientivoSource: "imperfectivo",
                sourceTenseValue: "imperfecto",
                sourceCombinedMode: ctx.COMBINED_MODE.active,
                patientivoNominalSuffix: "t",
                matrixRoot,
            });
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: contract.objectTransfer.objectPrefix,
                    tronco: contract.prelocativeVerbInput,
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "presente",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        combinedMode: ctx.COMBINED_MODE.active,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                matrixRoot,
                supported: contract.supported,
                prelocativeVerbInput: contract.prelocativeVerbInput,
                result: generated.result,
            };
        }),
        [
            {
                matrixRoot: "ita",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/ita)",
                result: "nechtamatiyaita",
            },
            {
                matrixRoot: "mati",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/mati)",
                result: "nechtamatiyamati",
            },
            {
                matrixRoot: "neki",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/neki)",
                result: "nechtamatiyaneki",
            },
            {
                matrixRoot: "tuka",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/tuka)",
                result: "nechtamatiyatuka",
            },
        ]
    );
    const perfectivePatientivoComplementContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "taketzti",
        sourceSurface: "taketz",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "perfectivo",
        sourceTenseValue: "preterito",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "ti",
        matrixRoot: "tajtani",
    });
    const generatedPerfectivePatientivoComplement = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: perfectivePatientivoComplementContract.objectTransfer.objectPrefix,
            tronco: perfectivePatientivoComplementContract.prelocativeVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.7 incorporated-complement contract accepts perfective patientive nounstems",
        {
            supported: perfectivePatientivoComplementContract.supported,
            patientivoSource: perfectivePatientivoComplementContract.patientivoSource,
            incorporatedRoot: perfectivePatientivoComplementContract.incorporatedRoot,
            prelocativeVerbInput: perfectivePatientivoComplementContract.prelocativeVerbInput,
            result: generatedPerfectivePatientivoComplement.result,
        },
        {
            supported: true,
            patientivoSource: "perfectivo",
            incorporatedRoot: "taketz",
            prelocativeVerbInput: "-(taketz/tajtani)",
            result: "nechtaketztajtani",
        }
    );
    const nonactivePatientivoComplementContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "machti",
        sourceSurface: "machti",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "nonactive",
        sourceTenseValue: "presente",
        sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
        patientivoNominalSuffix: "ti",
        matrixRoot: "tajtani",
    });
    const generatedNonactivePatientivoComplement = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: nonactivePatientivoComplementContract.objectTransfer.objectPrefix,
            tronco: nonactivePatientivoComplementContract.prelocativeVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.7 incorporated-complement contract accepts nonactive patientive nounstems",
        {
            supported: nonactivePatientivoComplementContract.supported,
            patientivoSource: nonactivePatientivoComplementContract.patientivoSource,
            sourceCombinedMode: nonactivePatientivoComplementContract.sourceCombinedMode,
            incorporatedRoot: nonactivePatientivoComplementContract.incorporatedRoot,
            prelocativeVerbInput: nonactivePatientivoComplementContract.prelocativeVerbInput,
            result: generatedNonactivePatientivoComplement.result,
        },
        {
            supported: true,
            patientivoSource: "nonactive",
            sourceCombinedMode: ctx.COMBINED_MODE.nonactive,
            incorporatedRoot: "mach",
            prelocativeVerbInput: "-(mach/tajtani)",
            result: "nechmachtajtani",
        }
    );
    const possessiveMatiContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "mutamatiyat",
        possessorPrefix: "mu",
        patientivoSource: "imperfectivo",
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "mati",
    });
    s.eq(
        "Andrews 39.7 possessive source blocks absolutive-only incorporated-complement matrices",
        {
            supported: possessiveMatiContract.supported,
            prelocativeVerbInput: possessiveMatiContract.prelocativeVerbInput,
            diagnostics: possessiveMatiContract.diagnostics,
        },
        {
            supported: false,
            prelocativeVerbInput: "",
            diagnostics: ["patientivo-prelocative-matrix-source-state-unsupported"],
        }
    );
    s.eq(
        "Andrews 39.7-39.8 possessive source generates source-compatible continuation matrices",
        ["tuka", "tajtani", "tatajtania", "temua"].map((matrixRoot) => {
            const contract = ctx.buildPatientivoPrelocativeContinuationContract({
                patientivoSurface: "tamatiyat",
                sourceSurface: "mutamatiyat",
                possessorPrefix: "mu",
                patientivoSource: "imperfectivo",
                sourceTenseValue: "pasado-remoto",
                sourceCombinedMode: ctx.COMBINED_MODE.active,
                patientivoNominalSuffix: "t",
                matrixRoot,
            });
            const generated = ctx.executeGenerateWordRequest({
                posicionesFormula: {
                    pers1: "",
                    obj1: contract.objectTransfer.objectPrefix,
                    tronco: contract.prelocativeVerbInput,
                    pers2: "",
                    num2: "",
                    poseedor: "",

                    tiempo: "presente",

                    },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        combinedMode: ctx.COMBINED_MODE.active,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
            });
            return {
                matrixRoot,
                supported: contract.supported,
                prelocativeVerbInput: contract.prelocativeVerbInput,
                result: generated.result,
            };
        }),
        [
            {
                matrixRoot: "tuka",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/tuka)",
                result: "metztamatiyatuka",
            },
            {
                matrixRoot: "tajtani",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/tajtani)",
                result: "metztamatiyatajtani",
            },
            {
                matrixRoot: "tatajtania",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/tatajtania)",
                result: "metztamatiyatatajtania",
            },
            {
                matrixRoot: "temua",
                supported: true,
                prelocativeVerbInput: "-(tamatiya/temua)",
                result: "metztamatiyatemua",
            },
        ]
    );
    const absolutiveTlaniContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "tamatiya",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "tajtani",
    });
    const absolutiveSeekMatrixContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "tamatiya",
        selection: {
            subjectPrefix: "ni",
            subjectSuffix: "",
        },
        patientivoSource: "imperfectivo",
        sourceTenseValue: "imperfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "temua",
    });
    s.eq(
        "Andrews 39.7 absolutive source only allows source-compatible matrix roots",
        {
            tlaniSupported: absolutiveTlaniContract.supported,
            tlaniInput: absolutiveTlaniContract.prelocativeVerbInput,
            seekSupported: absolutiveSeekMatrixContract.supported,
            seekCompatible: absolutiveSeekMatrixContract.matrixSourceCompatible,
            seekInput: absolutiveSeekMatrixContract.prelocativeVerbInput,
            seekDiagnostics: absolutiveSeekMatrixContract.diagnostics,
        },
        {
            tlaniSupported: true,
            tlaniInput: "-(tamatiya/tajtani)",
            seekSupported: false,
            seekCompatible: false,
            seekInput: "",
            seekDiagnostics: ["patientivo-prelocative-matrix-source-state-unsupported"],
        }
    );
    const seekMatrixContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        sourceSurface: "mutamatiyat",
        possessorPrefix: "mu",
        patientivoSource: "imperfectivo",
        sourceTenseValue: "pasado-remoto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "temua",
    });
    const generatedSeekMatrixSurface = ctx.executeGenerateWordRequest({
        posicionesFormula: {
            pers1: "",
            obj1: seekMatrixContract.objectTransfer.objectPrefix,
            tronco: seekMatrixContract.prelocativeVerbInput,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                combinedMode: ctx.COMBINED_MODE.active,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
    });
    s.eq(
        "Andrews 39.8 seek matrix builds actual prelocative V output",
        {
            supported: seekMatrixContract.supported,
            matrixId: seekMatrixContract.matrix.id,
            prelocativeVerbInput: seekMatrixContract.prelocativeVerbInput,
            result: generatedSeekMatrixSurface.result,
        },
        {
            supported: true,
            matrixId: "tla-tem-o-a",
            prelocativeVerbInput: "-(tamatiya/temua)",
            result: "metztamatiyatemua",
        }
    );
    s.eq(
        "Andrews 39.7-39.8 prelocative contract exposes incorporated-role and valence policy",
        {
            absolutive: {
                grammarSource: absolutiveTlaniContract.formationFrame.grammarSource,
                sourceState: absolutiveTlaniContract.formationFrame.sourceState,
                incorporatedRole: absolutiveTlaniContract.formationFrame.incorporated.role,
                outsideObjectOriginRole: absolutiveTlaniContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: absolutiveTlaniContract.formationFrame.outsideObject.prefix,
                absolutiveSubjectBecomesObject: absolutiveTlaniContract.formationFrame.valencePolicy.absolutiveSubjectBecomesObject,
                preservesSourceValence: absolutiveTlaniContract.formationFrame.valencePolicy.preservesSourceValence,
            },
            possessive: {
                grammarSource: seekMatrixContract.formationFrame.grammarSource,
                sourceState: seekMatrixContract.formationFrame.sourceState,
                incorporatedRole: seekMatrixContract.formationFrame.incorporated.role,
                outsideObjectOriginRole: seekMatrixContract.formationFrame.outsideObject.originRole,
                outsideObjectPrefix: seekMatrixContract.formationFrame.outsideObject.prefix,
                possessorBecomesObjectWithoutApplicativeSuffix: seekMatrixContract.formationFrame.valencePolicy.possessorBecomesObjectWithoutApplicativeSuffix,
                preservesSourceValence: seekMatrixContract.formationFrame.valencePolicy.preservesSourceValence,
            },
        },
        {
            absolutive: {
                grammarSource: "Andrews 39.7",
                sourceState: "absolutive",
                incorporatedRole: "object-complement",
                outsideObjectOriginRole: "subject",
                outsideObjectPrefix: "nech",
                absolutiveSubjectBecomesObject: true,
                preservesSourceValence: false,
            },
            possessive: {
                grammarSource: "Andrews 39.8",
                sourceState: "possessive",
                incorporatedRole: "incorporated-object",
                outsideObjectOriginRole: "possessor",
                outsideObjectPrefix: "metz",
                possessorBecomesObjectWithoutApplicativeSuffix: true,
                preservesSourceValence: true,
            },
        }
    );
    const unsupportedPrelocativeContract = ctx.buildPatientivoPrelocativeContinuationContract({
        patientivoSurface: "tamatiyat",
        possessorPrefix: "bad",
        patientivoSource: "perfectivo",
        sourceTenseValue: "perfecto",
        sourceCombinedMode: ctx.COMBINED_MODE.active,
        patientivoNominalSuffix: "t",
        matrixRoot: "tajtan",
    });
    s.eq(
        "patientive prelocative contract diagnoses unsupported source, matrix, and unmapped possessor",
        {
            supported: unsupportedPrelocativeContract.supported,
            diagnostics: unsupportedPrelocativeContract.diagnostics,
            frameFailedLayers: unsupportedPrelocativeContract.grammarFrame?.diagnosticFrame?.diagnostics.map((entry) => entry.failedLayer) || [],
            frameContractLayers: unsupportedPrelocativeContract.grammarFrame?.diagnosticFrame?.diagnostics.map((entry) => entry.contractLayer) || [],
        },
        {
            supported: false,
            diagnostics: [
                "patientivo-prelocative-unmapped-possessor",
                "patientivo-prelocative-unsupported-matrix",
                "patientivo-prelocative-missing-verb-input",
            ],
            frameFailedLayers: ["agreement", "route", "output"],
            frameContractLayers: ["participantFrame", "routeContract", "resultFrame"],
        }
    );

    const causativeConfig = ctx.getForwardDerivationConfig("causative");
    s.eq("forward config: causative result field", causativeConfig.resultField, "causativeAllStems");
    s.eq("forward config: causative result spec field", causativeConfig.resultSpecField, "causativeAllStemSpecs");

    const selectedForward = ctx.applySelectedForwardDerivation({
        derivationType: "causative",
        derivationOptions: {
            verb: "nemi",
            analysisVerb: "nemi",
            isYawi: false,
            suppletiveStemSet: null,
        },
        enabled: false,
    });
    s.eq("forward derivation disabled keeps verb", selectedForward.verb, "nemi");
    s.eq("forward derivation disabled keeps analysis verb", selectedForward.analysisVerb, "nemi");

    s.eq(
        "stem pool prefers forward specs when present",
        ctx.resolveStemCollectionPool({
            resolvedDerivationType: "causative",
            causativeAllStems: ["nemitia"],
            causativeAllStemSpecs: [ctx.buildLiteralMorphStemSpec("nemitia")],
        }).length,
        1
    );

    s.eq(
        "primary nonactive selection stem falls back to first selected stem",
        ctx.getPrimaryNonactiveSelectionStem({
            selectedStems: ["nemu", "nemilu"],
        }),
        "nemu"
    );
    s.eq(
        "primary nonactive selection stem spec falls back to literal spec",
        ctx.realizeMorphStemSpec(
            ctx.getPrimaryNonactiveSelectionStemSpec({
                selectedStems: ["nemu"],
            }),
            ""
        ),
        "nemu"
    );

    const prefixedSelection = ctx.buildPrefixedNonactiveSelectionEntry({
        selection: {
            selectedStem: "nemu",
            selectedStemSpec: ctx.buildLiteralMorphStemSpec("nemu"),
            selectedStemSpecs: [ctx.buildLiteralMorphStemSpec("nemu")],
            allStemSpecs: [ctx.buildLiteralMorphStemSpec("nemu"), ctx.buildLiteralMorphStemSpec("nemilu")],
            selectedSuffix: "u",
        },
        prefix: "ki",
        directionalPrefix: "",
        nonactiveObjectSlots: 0,
    });
    s.eq("prefixed nonactive entry realizes selected stem", prefixedSelection.selectedStem, "kinemu");
    s.eq("prefixed nonactive entry realizes all stems", prefixedSelection.allStems[1], "kinemilu");

    const nonactiveFallback = ctx.applyNonactiveDerivation({
        isNonactive: false,
        verb: "nemi",
        analysisVerb: "nemi",
        objectPrefix: "",
        parsedVerb: ctx.parseVerbInput("(nemi)"),
        directionalPrefix: "",
        derivationType: "",
        causativeAllStems: null,
        applicativeAllStems: null,
        isYawi: false,
        suppletiveStemSet: null,
    });
    s.eq("nonactive derivation passthrough keeps verb", nonactiveFallback.verb, "nemi");
    s.eq("nonactive derivation passthrough keeps null override keys", nonactiveFallback.nonactiveObjectPrefixOverride, null);

    const transitiveMatiNonactiveOptions = ctx.getVisibleNonactiveDerivationOptions("mati", "mati", {
        isTransitive: true,
        ruleBase: "mati",
    });
    const transitiveMatiUStems = transitiveMatiNonactiveOptions
        .filter((entry) => entry.suffix === "u")
        .map((entry) => entry.stem);
    s.ok("transitive mati plain u route replaces final i with u", transitiveMatiUStems.includes("matu"));
    s.no("transitive mati plain u route does not append u after final i", transitiveMatiUStems.includes("matiu"));
    s.no(
        "transitive mati does not expose intransitive-only uwa",
        transitiveMatiNonactiveOptions.some((entry) => entry.suffix === "uwa")
    );

    const transitivePetawaNonactiveOptions = ctx.getVisibleNonactiveDerivationOptions("petawa", "petawa", {
        isTransitive: true,
        ruleBase: "petawa",
    });
    s.no(
        "transitive wa-final stems do not expose intransitive-only uwa",
        transitivePetawaNonactiveOptions.some((entry) => entry.suffix === "uwa")
    );

    const lesson20Nonactive = ctx.buildLesson20NonactivePursuitFrame();
    s.eq(
        "Lesson 20 nonactive pursuit frame covers Andrews suffix families as Nawat realization",
        {
            stepNumber: lesson20Nonactive.stepNumber,
            aimStatus: lesson20Nonactive.aimStatus,
            pdfRefs: lesson20Nonactive.pdfRefs,
            subsectionSections: lesson20Nonactive.subsectionInventory.map((entry) => entry.andrewsSection),
            suffixBridge: lesson20Nonactive.suffixBridge.map((entry) => [entry.andrews, entry.nawat]),
            source: lesson20Nonactive.overviewFrame.derivationSource,
            closestPass: lesson20Nonactive.closestPass,
            generationAllowed: lesson20Nonactive.generationAllowed,
            remainingGapCount: lesson20Nonactive.remainingGaps.length,
        },
        {
            stepNumber: 20,
            aimStatus: "closest-pass",
            pdfRefs: [
                "Andrews Lesson 20.1",
                "Andrews Lesson 20.2",
                "Andrews Lesson 20.3",
                "Andrews Lesson 20.4",
                "Andrews Lesson 20.5",
                "Andrews Lesson 20.6",
                "Andrews Lesson 20.7",
                "Andrews Lesson 20.8",
            ],
            subsectionSections: ["20.1", "20.2", "20.3", "20.4", "20.5", "20.6", "20.7", "20.8"],
            suffixBridge: [["o", "u"], ["lo", "lu"], ["hua", "wa"], ["o-hua", "uwa"], ["lo-hua", "luwa"], ["hua-lo", "walu"]],
            source: "imperfective active stem",
            closestPass: true,
            generationAllowed: true,
            remainingGapCount: 0,
        }
    );
    s.eq(
        "Lesson 20 nonactive pursuit frame records Andrews route boundaries",
        {
            luSource: lesson20Nonactive.luFrame.mainSource,
            uBaseIsReplacive: lesson20Nonactive.uFrame.baseIsReplaciveImperfective,
            uwaMainSource: lesson20Nonactive.uwaFrame.mainSource,
            waMainlyIntransitive: lesson20Nonactive.waWaluFrame.wa.mainlyIntransitive,
            waluFreeVariant: lesson20Nonactive.waWaluFrame.walu.freeVariantOfWa,
            classMembership: lesson20Nonactive.classMembershipFrame.classMembership,
            noClassicalSurfaceImport: lesson20Nonactive.currentEngineBoundary.noClassicalSurfaceImport,
        },
        {
            luSource: "transitive verbstems ending in a",
            uBaseIsReplacive: true,
            uwaMainSource: "active intransitive source",
            waMainlyIntransitive: true,
            waluFreeVariant: true,
            classMembership: "Class A-2",
            noClassicalSurfaceImport: true,
        }
    );
    s.eq(
        "Lesson 20 nonactive pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson20Nonactive.grammarFrame),
            routeFamily: lesson20Nonactive.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson20Nonactive.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson20Nonactive.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson20Nonactive.ok,
            classMembership: lesson20Nonactive.grammarFrame?.nuclearClauseFrame?.classMembership || "",
            suffixBridge: lesson20Nonactive.grammarFrame?.orthographyFrame?.suffixBridge?.map((entry) => entry.nawat) || [],
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson20Nonactive, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-20",
            generationAllowed: false,
            ok: true,
            classMembership: "Class A-2",
            suffixBridge: ["u", "lu", "wa", "uwa", "luwa", "walu"],
            enumerableGrammarFrame: false,
        }
    );
    const lesson24Causative = ctx.buildLesson24FirstTypeCausativePursuitFrame();
    s.eq(
        "Lesson 24 first-type causative pursuit frame keeps Andrews coverage partial",
        {
            stepNumber: lesson24Causative.stepNumber,
            aimStatus: lesson24Causative.aimStatus,
            pdfRefs: lesson24Causative.pdfRefs,
            categories: lesson24Causative.subsectionInventory.map((entry) => entry.category),
            finalVowelPredictable: lesson24Causative.finalVowelValenceFrame.valencePredictableFromFinalVowel,
            valenceNeutralViolatesPrinciple: lesson24Causative.valenceNeutralFrame.violatesValencePrinciple,
            causativeMorpheme: lesson24Causative.typeOneCausativeFrame.causativeMorpheme,
            iFinalProcedures: lesson24Causative.typeOneCausativeFrame.iFinalProcedures.map((entry) => entry.id),
            aFinalProcedures: lesson24Causative.typeOneCausativeFrame.aFinalProcedures.map((entry) => entry.id),
            destockalProcess: lesson24Causative.destockalArchitectureFrame.process,
            destockalTypes: lesson24Causative.destockalArchitectureFrame.destockalTypes,
            niHuiClassPolicy: lesson24Causative.destockalNiHuiFrame.derivedClassPolicy,
            huaAlwaysReplacement: lesson24Causative.destockalHuaFrame.causativeAlwaysReplacement,
            ihuiOperation: lesson24Causative.destockalIhuiAhuiFrame.causativeOperation,
            sourceSubjectTransform: lesson24Causative.causativeVncGenerationFrame.sourceSubjectBecomesCausativeObject,
            causativeAControls: lesson24Causative.causativeAControlFrame.causativeAControls,
            engineHasForwardFrame: lesson24Causative.currentEngineBoundary.forwardDerivationFrameImplemented,
            closestPass: lesson24Causative.closestPass,
            remainingGapCount: lesson24Causative.remainingGaps.length,
        },
        {
            stepNumber: 24,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 24.1",
                "Andrews Lesson 24.2",
                "Andrews Lesson 24.3",
                "Andrews Lesson 24.4",
                "Andrews Lesson 24.5",
                "Andrews Lesson 24.6",
                "Andrews Lesson 24.7",
                "Andrews Lesson 24.8",
                "Andrews Lesson 24.9",
            ],
            categories: [
                "final-vowel-valence-boundary",
                "valence-neutral-verbstems",
                "type-one-causative-a",
                "destockal-stock-architecture",
                "destockal-ni-hui",
                "destockal-hua",
                "destockal-ihui-ahui",
                "causative-vnc-generation",
                "causative-a-control",
            ],
            finalVowelPredictable: false,
            valenceNeutralViolatesPrinciple: true,
            causativeMorpheme: { andrews: "a", nawat: "a" },
            iFinalProcedures: ["i-final-replacement", "i-final-addition"],
            aFinalProcedures: ["a-final-non-ya-replacement", "ya-final-replacement"],
            destockalProcess: [
                "root-plus-stock-formative-creates-stock",
                "stock-plus-stem-formative-creates-intransitive-verbstem",
                "type-one-causative-creates-transitive-mate",
            ],
            destockalTypes: ["ni-or-hui", "hua", "i-hui-or-a-hui"],
            niHuiClassPolicy: {
                "n-a": "Class B",
                "hu-a": "Class B",
                "ni-a": "Class C",
                "hui-a": "Class C",
            },
            huaAlwaysReplacement: true,
            ihuiOperation: "replace i-hui or a-hui with o-a",
            sourceSubjectTransform: true,
            causativeAControls: ["source subject", "source core"],
            engineHasForwardFrame: true,
            closestPass: false,
            remainingGapCount: 5,
        }
    );
    s.eq(
        "Lesson 24 first-type causative pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson24Causative.grammarFrame),
            routeFamily: lesson24Causative.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson24Causative.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson24Causative.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson24Causative.ok,
            sourceClauseKind: lesson24Causative.grammarFrame?.nuclearClauseFrame?.sourceClauseKind || "",
            targetClauseKind: lesson24Causative.grammarFrame?.nuclearClauseFrame?.targetClauseKind || "",
            sourceSubjectBecomesObject: lesson24Causative.grammarFrame?.participantFrame?.sourceSubjectBecomesCausativeObject,
            destockalBridge: lesson24Causative.grammarFrame?.orthographyFrame?.destockalBridge || null,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson24Causative, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-24",
            generationAllowed: false,
            ok: true,
            sourceClauseKind: "intransitive VNC",
            targetClauseKind: "single-object causative VNC",
            sourceSubjectBecomesObject: true,
            destockalBridge: {
                "hui": "wi",
                "hua": "wa",
                "o-a": "u-a",
            },
            enumerableGrammarFrame: false,
        }
    );
    const lesson25Causative = ctx.buildLesson25SecondTypeCausativePursuitFrame();
    s.eq(
        "Lesson 25 second-type causative pursuit frame keeps Andrews coverage partial",
        {
            stepNumber: lesson25Causative.stepNumber,
            aimStatus: lesson25Causative.aimStatus,
            pdfRefs: lesson25Causative.pdfRefs,
            subsectionCount: lesson25Causative.subsectionInventory.length,
            categories: lesson25Causative.subsectionInventory.map((entry) => entry.category),
            suffixalUnits: lesson25Causative.overviewFrame.suffixalUnits,
            coreCausativeCluster: lesson25Causative.overviewFrame.coreCausativeCluster,
            tiaComposition: lesson25Causative.overviewFrame.tiaComposition,
            derivesObjectCounts: lesson25Causative.overviewFrame.derivesObjectCounts,
            nonactiveSourceFamilies: lesson25Causative.overviewFrame.nonactiveSourceFamilies,
            huaOperation: lesson25Causative.sourceFormationFrame.huaSource.operation,
            oOHuaOperation: lesson25Causative.sourceFormationFrame.oOHuaSource.operation,
            loOperation: lesson25Causative.sourceFormationFrame.loSource.operation,
            loClassRoute: lesson25Causative.sourceFormationFrame.loSource.classCDUseThisProcedure,
            liaAmbiguous: lesson25Causative.sourceFormationFrame.liaSource.phonologicallyIdenticalToApplicativeLia,
            huiaAmbiguous: lesson25Causative.sourceFormationFrame.huiaSource.phonologicallyIdenticalToApplicativeHuia,
            classMembership: lesson25Causative.classAndParallelFrame.classMembership,
            typeOneAndTypeTwoSameSourceAllowed: lesson25Causative.classAndParallelFrame.typeOneAndTypeTwoSameSourceAllowed,
            transformOperations: lesson25Causative.causativeTransformationFrame.operations,
            causativeObjectIsObjectInFormSubjectInFunction: lesson25Causative.causativeTransformationFrame.causativeObjectIsObjectInFormSubjectInFunction,
            singleObjectSource: lesson25Causative.objectTransformFrame.singleObject.source,
            doubleObjectSources: lesson25Causative.objectTransformFrame.doubleObject.sources,
            tripleMainline: lesson25Causative.objectTransformFrame.tripleObject.mainline,
            objectFormsAmbiguous: lesson25Causative.boundaryFrame.ambiguity.objectFormsDoNotDiscriminateFunction,
            sentenceMoods: lesson25Causative.boundaryFrame.sentenceMoods,
            passiveImpersonalAllowed: lesson25Causative.boundaryFrame.passiveImpersonalTransformsAllowed,
            silentObjectCanBeSupplemented: lesson25Causative.boundaryFrame.silentObjectPronounCanBeSupplemented,
            doubleTripleObjectRoutingIncomplete: lesson25Causative.currentEngineBoundary.doubleTripleObjectRoutingIncomplete,
            closestPass: lesson25Causative.closestPass,
            remainingGapCount: lesson25Causative.remainingGaps.length,
        },
        {
            stepNumber: 25,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 25.1",
                "Andrews Lesson 25.2",
                "Andrews Lesson 25.3",
                "Andrews Lesson 25.4",
                "Andrews Lesson 25.5",
                "Andrews Lesson 25.6",
                "Andrews Lesson 25.7",
                "Andrews Lesson 25.8",
                "Andrews Lesson 25.9",
                "Andrews Lesson 25.10",
                "Andrews Lesson 25.11",
                "Andrews Lesson 25.12",
                "Andrews Lesson 25.13",
                "Andrews Lesson 25.14",
                "Andrews Lesson 25.15",
                "Andrews Lesson 25.16",
            ],
            subsectionCount: 16,
            categories: [
                "type-two-causative-overview",
                "hua-nonactive-source",
                "o-ohua-nonactive-source",
                "lo-nonactive-source",
                "lia-causative",
                "huia-causative",
                "type-two-class-c",
                "type-one-type-two-parallel",
                "causative-transformation",
                "single-object-causative-vnc",
                "double-object-causative-vnc",
                "triple-object-causative-vnc",
                "causative-transform-ambiguity",
                "causative-sentence-moods",
                "causative-passive-impersonal",
                "silent-object-supplementation",
            ],
            suffixalUnits: ["tia", "lia", "huia"],
            coreCausativeCluster: "tia",
            tiaComposition: ["semantically empty ti", "causative a from Lesson 24"],
            derivesObjectCounts: ["single-object", "double-object", "triple-object"],
            nonactiveSourceFamilies: ["hua", "o", "o-hua", "lo"],
            huaOperation: "tia replaces hua",
            oOHuaOperation: "tia replaces o or o-hua",
            loOperation: "tia replaces the o of lo, leaving l before tia",
            loClassRoute: true,
            liaAmbiguous: true,
            huiaAmbiguous: true,
            classMembership: "Class C",
            typeOneAndTypeTwoSameSourceAllowed: true,
            transformOperations: [
                "compact-source-vnc-into-causative-predicate",
                "replace-source-stem-with-causative-stem",
                "change-source-subject-pronoun-into-causative-object",
                "import-new-causative-subject-from-outside-source",
            ],
            causativeObjectIsObjectInFormSubjectInFunction: true,
            singleObjectSource: "active or impersonal intransitive VNC",
            doubleObjectSources: ["active single-object transitive VNC", "passive intransitive VNC", "single-object impersonal VNC"],
            tripleMainline: "causative object",
            objectFormsAmbiguous: true,
            sentenceMoods: ["wish", "command/exhortation", "admonition"],
            passiveImpersonalAllowed: true,
            silentObjectCanBeSupplemented: true,
            doubleTripleObjectRoutingIncomplete: true,
            closestPass: false,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 25 second-type causative pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson25Causative.grammarFrame),
            routeFamily: lesson25Causative.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson25Causative.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson25Causative.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson25Causative.ok,
            stemKind: lesson25Causative.grammarFrame?.stemFrame?.stemKind || "",
            classMembership: lesson25Causative.grammarFrame?.stemFrame?.classMembership || "",
            sourceSubjectBecomesObject: lesson25Causative.grammarFrame?.participantFrame?.sourceSubjectBecomesCausativeObject,
            maxObjectDepth: lesson25Causative.grammarFrame?.nuclearClauseFrame?.maxObjectDepth,
            suffixalUnits: lesson25Causative.grammarFrame?.orthographyFrame?.suffixalUnits || [],
            wiaBridge: lesson25Causative.grammarFrame?.orthographyFrame?.classicalToNawatHints?.huia || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson25Causative, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-25",
            generationAllowed: false,
            ok: true,
            stemKind: "second-type-causative-verbstem",
            classMembership: "Class C",
            sourceSubjectBecomesObject: true,
            maxObjectDepth: 3,
            suffixalUnits: ["tia", "lia", "huia"],
            wiaBridge: "wia",
            enumerableGrammarFrame: false,
        }
    );
    const lesson26Applicative = ctx.buildLesson26ApplicativePursuitFrame();
    s.eq(
        "Lesson 26 applicative pursuit frame keeps Andrews coverage partial",
        {
            stepNumber: lesson26Applicative.stepNumber,
            aimStatus: lesson26Applicative.aimStatus,
            pdfRefCount: lesson26Applicative.pdfRefs.length,
            firstPdfRef: lesson26Applicative.pdfRefs[0],
            lastPdfRef: lesson26Applicative.pdfRefs[lesson26Applicative.pdfRefs.length - 1],
            subsectionCount: lesson26Applicative.subsectionInventory.length,
            categories: lesson26Applicative.subsectionInventory.map((entry) => entry.category),
            mainlineConstituents: lesson26Applicative.natureFrame.mainlineConstituents,
            irregularBoundaries: lesson26Applicative.natureFrame.irregularBoundaries,
            typeOneSuffix: lesson26Applicative.formationFrame.typeOne.suffixalUnit,
            typeOneOperation: lesson26Applicative.formationFrame.typeOne.operation,
            typeTwoSuffixes: lesson26Applicative.formationFrame.typeTwo.suffixalUnits,
            sourceReflexiveBecomesNe: lesson26Applicative.formationFrame.typeTwo.sourceReflexiveBecomesShuntlineNe,
            classMembership: lesson26Applicative.formationFrame.classMembership,
            finalIChanges: {
                siToXi: lesson26Applicative.sourceShapeFrame.finalI.siToXi,
                postvocalicTiToChi: lesson26Applicative.sourceShapeFrame.finalI.postvocalicTiToChiPossible,
            },
            finalConsonantAChanges: {
                saToXilia: lesson26Applicative.sourceShapeFrame.finalAAfterConsonant.saToXilia,
                tlaOrTzaToChilia: lesson26Applicative.sourceShapeFrame.finalAAfterConsonant.tlaOrTzaToChilia,
                occasionalTlaToTilia: lesson26Applicative.sourceShapeFrame.finalAAfterConsonant.occasionalTlaToTilia,
            },
            huiaGeneralUnit: lesson26Applicative.huiaTiaFrame.oaSources.generalSuffixalUnit,
            rareTiaNotCausative: lesson26Applicative.huiaTiaFrame.rareTiaApplicative.notCausative,
            transformOperations: lesson26Applicative.transformationFrame.operations,
            mainlineObject: lesson26Applicative.transformationFrame.mainlineObject,
            singleTarget: lesson26Applicative.objectDepthFrame.singleObject.target,
            doubleTarget: lesson26Applicative.objectDepthFrame.doubleObject.target,
            tripleOvertCounts: lesson26Applicative.objectDepthFrame.tripleObject.overtObjectCountsAllowed,
            ambiguityRequiresAppendixC: lesson26Applicative.boundaryFrame.ambiguity.appendixCRequired,
            sentenceMoods: lesson26Applicative.boundaryFrame.sentenceMoods,
            passiveImpersonalAllowed: lesson26Applicative.boundaryFrame.passiveImpersonalTransformsAllowed,
            objectPlusSuffixUnit: lesson26Applicative.boundaryFrame.applicativeUnitControl.discontinuousObjectPlusSuffixUnit,
            generationImplemented: lesson26Applicative.currentEngineBoundary.applicativeGenerationImplemented,
            closestPass: lesson26Applicative.closestPass,
            remainingGapCount: lesson26Applicative.remainingGaps.length,
        },
        {
            stepNumber: 26,
            aimStatus: "shooting",
            pdfRefCount: 23,
            firstPdfRef: "Andrews Lesson 26.1",
            lastPdfRef: "Andrews Lesson 26.23",
            subsectionCount: 23,
            categories: [
                "applicative-object-role",
                "type-one-applicative-ia",
                "type-two-applicative-lia-huia",
                "final-i-source",
                "final-a-source-frame",
                "final-ia-source",
                "final-consonant-a-source",
                "applicative-source-exceptions",
                "oa-huia-source",
                "long-o-huia-source",
                "rare-tia-applicative",
                "type-one-type-two-parallel",
                "applicative-class-c",
                "applicative-transformation",
                "single-object-applicative-vnc",
                "double-object-applicative-vnc",
                "triple-object-applicative-vnc",
                "applicative-transform-ambiguity",
                "applicative-sentence-moods",
                "applicative-passive-impersonal",
                "human-nonhuman-object-translation",
                "deceptive-applicative-vnc",
                "object-plus-suffix-unit",
            ],
            mainlineConstituents: ["applicative suffix", "obligatorily concomitant applicative object pronoun"],
            irregularBoundaries: [
                "inherently applicative double-object maca without applicative suffix",
                "itta from defective itzi with unusual sound shift and applicative a",
                "valence-neutral pairs with applicative-like transitive member",
            ],
            typeOneSuffix: "ia",
            typeOneOperation: "add ia to a replacive imperfective stem lacking the final source vowel",
            typeTwoSuffixes: ["lia", "huia"],
            sourceReflexiveBecomesNe: true,
            classMembership: "Class C",
            finalIChanges: {
                siToXi: true,
                postvocalicTiToChi: true,
            },
            finalConsonantAChanges: {
                saToXilia: true,
                tlaOrTzaToChilia: true,
                occasionalTlaToTilia: true,
            },
            huiaGeneralUnit: "huia",
            rareTiaNotCausative: true,
            transformOperations: [
                "replace-source-stem-with-applicative-stem",
                "import-applicative-object-pronoun-from-outside-source-vnc",
                "make-last-added-applicative-object-the-mainline-object",
                "demote-source-objects-to-shuntline-levels",
            ],
            mainlineObject: "applicative object",
            singleTarget: "single-object applicative VNC",
            doubleTarget: "double-object applicative VNC",
            tripleOvertCounts: [3, 2, 1],
            ambiguityRequiresAppendixC: true,
            sentenceMoods: ["wish", "command/exhortation", "admonition"],
            passiveImpersonalAllowed: true,
            objectPlusSuffixUnit: true,
            generationImplemented: true,
            closestPass: false,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 26 applicative pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson26Applicative.grammarFrame),
            routeFamily: lesson26Applicative.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson26Applicative.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson26Applicative.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson26Applicative.ok,
            unitKind: lesson26Applicative.grammarFrame?.unitFrame?.unitKind || "",
            stemKind: lesson26Applicative.grammarFrame?.stemFrame?.stemKind || "",
            classMembership: lesson26Applicative.grammarFrame?.stemFrame?.classMembership || "",
            applicativeObjectIsMainline: lesson26Applicative.grammarFrame?.participantFrame?.applicativeObjectIsMainline,
            sourceObjectsBecomeShuntline: lesson26Applicative.grammarFrame?.participantFrame?.sourceObjectsBecomeShuntline,
            maxObjectDepth: lesson26Applicative.grammarFrame?.nuclearClauseFrame?.maxObjectDepth,
            suffixalUnits: lesson26Applicative.grammarFrame?.orthographyFrame?.suffixalUnits || [],
            wiaBridge: lesson26Applicative.grammarFrame?.orthographyFrame?.classicalToNawatHints?.huia || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson26Applicative, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "vnc-allomorphy",
            routeStage: "audit-lesson-26",
            generationAllowed: false,
            ok: true,
            unitKind: "applicative-verbstem",
            stemKind: "applicative-verbstem",
            classMembership: "Class C",
            applicativeObjectIsMainline: true,
            sourceObjectsBecomeShuntline: true,
            maxObjectDepth: 3,
            suffixalUnits: ["ia", "lia", "huia", "tia"],
            wiaBridge: "wia",
            enumerableGrammarFrame: false,
        }
    );

    const patientivoFromUwa = ctx.getPatientivoStemFromNonactive("kelunuwa", "uwa", {
        isTransitive: false,
        baseInfo: { lastOnset: "n" },
    });
    const patientivoTVariant = patientivoFromUwa.find((entry) => entry.suffix === "t");
    s.ok("patientivo from -uwa exposes base+i+t variant", patientivoTVariant && patientivoTVariant.stem === "keluni");
    s.ok(
        "patientivo from -uwa marks base+i+t variant as no absolutive zero class",
        patientivoTVariant && patientivoTVariant.blocksAbsolutiveZeroNominalMarker === true
    );
    s.eq(
        "Andrews nonactive o-hua patientivo variant is locked to its tli-class connector",
        patientivoTVariant && patientivoTVariant.allowedSuffixes,
        ["t"]
    );

    const patientivoFromPassiveMatu = ctx.getPatientivoStemFromNonactive("matu", "u", {
        isTransitive: true,
    });
    const patientivoConsonantFinalTiVariant = patientivoFromPassiveMatu.find((entry) => entry.suffix === "ti");
    const patientivoVowelFinalTVariant = patientivoFromPassiveMatu.find((entry) => entry.suffix === "t");
    s.eq(
        "Andrews nonactive o patientivo consonant-final variant is locked to ti",
        patientivoConsonantFinalTiVariant && patientivoConsonantFinalTiVariant.allowedSuffixes,
        ["ti"]
    );
    s.ok(
        "patientivo from passive matu uses mati+t without extra supportive i",
        patientivoVowelFinalTVariant && patientivoVowelFinalTVariant.stem === "mati"
    );
    s.no(
        "patientivo supportive i does not create ii before t",
        patientivoFromPassiveMatu.some((entry) => entry.stem === "matii")
    );

    const patientivoTEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "nonactive",
        stemSpec: patientivoTVariant.stemSpec,
        fallbackStem: patientivoTVariant.stem,
        subjectSuffix: patientivoTVariant.suffix,
        metadata: {
            blocksAbsolutiveZeroNominalMarker: patientivoTVariant.blocksAbsolutiveZeroNominalMarker === true,
        },
    });
    const expandedPatientivoTEntry = ctx.expandPatientivoNominalMarkerOptions([patientivoTEntry], "nonactive");
    const expandedPatientivoTSuffixes = expandedPatientivoTEntry.map((entry) => entry.subjectSuffix);
    s.no(
        "patientivo from -uwa base+i+t forbids absolutive zero nominal marker",
        expandedPatientivoTSuffixes.includes("")
    );
    s.ok(
        "patientivo from -uwa base+i+t keeps t-class absolutive marker",
        expandedPatientivoTSuffixes.includes("t")
    );
    const patientivoLuEntry = ctx.getPatientivoStemFromNonactive("pululu", "lu", {
        isTransitive: false,
    })[0];
    s.eq(
        "Andrews nonactive lo patientivo deletes final u and produces tli-class Nawat connector",
        {
            stem: patientivoLuEntry && patientivoLuEntry.stem,
            suffix: patientivoLuEntry && patientivoLuEntry.suffix,
            allowedSuffixes: patientivoLuEntry && patientivoLuEntry.allowedSuffixes,
            blocksZero: patientivoLuEntry && patientivoLuEntry.blocksAbsolutiveZeroNominalMarker,
        },
        {
            stem: "pulul",
            suffix: "ti",
            allowedSuffixes: ["ti"],
            blocksZero: true,
        }
    );
    const patientivoLuExpanded = ctx.expandPatientivoNominalMarkerOptions([
        ctx.buildPatientivoDerivationEntry({
            sourceType: "nonactive",
            stemSpec: patientivoLuEntry.stemSpec,
            fallbackStem: patientivoLuEntry.stem,
            subjectSuffix: patientivoLuEntry.suffix,
            metadata: patientivoLuEntry,
        }),
    ], "nonactive").map((entry) => `${entry.verb}${entry.subjectSuffix}`);
    s.eq(
        "Andrews nonactive lo patientivo does not expand to zero or in outputs",
        patientivoLuExpanded,
        ["pululti"]
    );

    const patientivoFromWa = ctx.getPatientivoStemFromNonactive("temiwa", "wa", {
        isTransitive: false,
    });
    const patientivoWaTVariant = patientivoFromWa.find((entry) => entry.suffix === "t");
    s.ok("patientivo from -wa exposes t-class variant", patientivoWaTVariant && patientivoWaTVariant.stem === "temi");
    s.ok(
        "patientivo from -wa marks t-class variant as no absolutive zero class",
        patientivoWaTVariant && patientivoWaTVariant.blocksAbsolutiveZeroNominalMarker === true
    );
    const patientivoWaEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "nonactive",
        stemSpec: patientivoWaTVariant.stemSpec,
        fallbackStem: patientivoWaTVariant.stem,
        subjectSuffix: patientivoWaTVariant.suffix,
        metadata: {
            blocksAbsolutiveZeroNominalMarker: patientivoWaTVariant.blocksAbsolutiveZeroNominalMarker === true,
        },
    });
    const expandedPatientivoWaEntry = ctx.expandPatientivoNominalMarkerOptions([patientivoWaEntry], "nonactive");
    const expandedPatientivoWaSuffixes = expandedPatientivoWaEntry.map((entry) => entry.subjectSuffix);
    s.no(
        "patientivo from -wa t-class forbids absolutive zero nominal marker",
        expandedPatientivoWaSuffixes.includes("")
    );
    s.ok(
        "patientivo from -wa t-class keeps t marker",
        expandedPatientivoWaSuffixes.includes("t")
    );
    const nonactiveTClassSuffixes = ctx.resolveDefaultPatientivoAllowedSuffixes({
        sourceType: "nonactive",
        stem: "temi",
        defaultSuffix: "t",
        lockNominalMarker: false,
    });
    s.no(
        "patientivo default suffix resolver forbids absolutive zero for nonactive t-class",
        nonactiveTClassSuffixes.includes("")
    );
    const tFinalPatientivoSuffixes = ctx.resolveDefaultPatientivoAllowedSuffixes({
        sourceType: "nonactive",
        stem: "mat",
        defaultSuffix: "ti",
        lockNominalMarker: false,
    });
    s.no(
        "patientivo default suffix resolver omits in marker for t-final stems",
        tFinalPatientivoSuffixes.includes("in")
    );
    const chFinalPatientivoSuffixes = ctx.resolveDefaultPatientivoAllowedSuffixes({
        sourceType: "nonactive",
        stem: "mach",
        defaultSuffix: "ti",
        lockNominalMarker: false,
    });
    s.ok(
        "patientivo default suffix resolver keeps in marker for non-t consonant stems",
        chFinalPatientivoSuffixes.includes("in")
    );

    const originalNonactiveOptionPronounceability = ctx.isSyllableSequencePronounceable;
    try {
        ctx.isSyllableSequencePronounceable = (value) => value === "kinemu";
        const prefixedNonactiveRuleSource = ctx.buildNonactiveRuleSourceContext("kinemi", "nemi", {
            parsedVerb: verbMeta,
            verbMeta,
            isTransitive: true,
        });
        const prefixedNonactiveOptions = ctx.getNonactiveDerivationOptions("kinemi", "nemi", {
            parsedVerb: verbMeta,
            verbMeta,
            isTransitive: true,
            nonactiveRuleSource: prefixedNonactiveRuleSource,
        });
        const realizedPrefixedNonactiveOptions = prefixedNonactiveOptions
            .map((option) => ctx.realizeNonactiveDerivationOption(option, prefixedNonactiveRuleSource))
            .filter(Boolean);
        s.ok(
            "nonactive derivation options keep source-aware prefixed surfaces",
            realizedPrefixedNonactiveOptions.some((entry) => entry.suffix === "u" && entry.stem === "kinemu")
        );
    } finally {
        ctx.isSyllableSequencePronounceable = originalNonactiveOptionPronounceability;
    }

    const classCPerfectiveProvenance = {
        baseSpec: ctx.buildPretPerfectiveReplacementBaseSpec("salua", {
            isTransitive: true,
        }),
        surfaceStem: "saluj",
    };
    const resolvedClassCPerfectiveStem = ctx.resolveCalificativoInstrumentivoStemFromProvenanceEntry(
        classCPerfectiveProvenance,
        "salua"
    );
    s.eq(
        "patientivo perfectivo keeps class c replacive j in provenance stem core",
        resolvedClassCPerfectiveStem.fallbackStem,
        "saluj"
    );
    const classCPatientivoEntry = ctx.buildPatientivoDerivationEntry({
        sourceType: "perfectivo",
        stemSpec: resolvedClassCPerfectiveStem.stemSpec,
        fallbackStem: resolvedClassCPerfectiveStem.fallbackStem,
        subjectSuffix: "ti",
        lockNominalMarker: true,
        nominalMarkerPolicy: ctx.buildPatientivoNominalMarkerPolicy({
            sourceType: "perfectivo",
            defaultSuffix: "ti",
            allowedSuffixes: ["ti"],
            adjectiveSuffix: "ti",
            lockNominalMarker: true,
        }),
    });
    s.eq(
        "patientivo perfectivo class c builds salujti from provenance stem core",
        `${classCPatientivoEntry.verb}${classCPatientivoEntry.subjectSuffix}`,
        "salujti"
    );

    const originalResolvePretUniversalContextBundle = ctx.resolvePretUniversalContextBundle;
    const originalPretContextHasRightEdge = ctx.pretContextHasRightEdge;
    const originalGetPretUniversalClassCandidates = ctx.getPretUniversalClassCandidates;
    const originalBuildClassBasedResultWithProvenance = ctx.buildClassBasedResultWithProvenance;
    const originalIsSyllableSequencePronounceable = ctx.isSyllableSequencePronounceable;
    try {
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.pretContextHasRightEdge = () => true;
        ctx.getPretUniversalClassCandidates = () => new Set(["A", "C"]);
        ctx.buildClassBasedResultWithProvenance = () => ({
            result: "saluj",
            provenance: {
                variants: [
                    {
                        base: "salu",
                        suffix: "",
                        surfaceStem: "saluj",
                    },
                ],
            },
        });
        ctx.isSyllableSequencePronounceable = () => true;
        const prioritizedClassCDerivations = ctx.buildPatientivoPerfectivoDerivations({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.eq(
            "patientivo perfectivo prefers class c provenance stem over class a/b trim fallback",
            `${prioritizedClassCDerivations[0].verb}${prioritizedClassCDerivations[0].subjectSuffix}`,
            "salujti"
        );
    } finally {
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundle;
        ctx.pretContextHasRightEdge = originalPretContextHasRightEdge;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidates;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenance;
        ctx.isSyllableSequencePronounceable = originalIsSyllableSequencePronounceable;
    }

    const originalResolvePretUniversalContextBundleForPerfectivoGate = ctx.resolvePretUniversalContextBundle;
    const originalPretContextHasRightEdgeForPerfectivoGate = ctx.pretContextHasRightEdge;
    const originalGetPretUniversalClassCandidatesForPerfectivoGate = ctx.getPretUniversalClassCandidates;
    const originalBuildClassBasedResultWithProvenanceForPerfectivoGate = ctx.buildClassBasedResultWithProvenance;
    const originalPerfectivoGatePronounceability = ctx.isSyllableSequencePronounceable;
    try {
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.pretContextHasRightEdge = () => true;
        ctx.getPretUniversalClassCandidates = () => new Set(["A", "C"]);
        ctx.buildClassBasedResultWithProvenance = () => ({
            result: "saluj",
            provenance: {
                variants: [
                    {
                        base: "salu",
                        suffix: "",
                        surfaceStem: "saluj",
                    },
                ],
            },
        });
        ctx.isSyllableSequencePronounceable = (value) => value === "salujti";
        const gatedPerfectivoStemEntries = ctx.buildPatientivoPerfectivoStemEntries({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.ok(
            "patientivo perfectivo stem entries keep class c stem when ti surface is the authority",
            gatedPerfectivoStemEntries.some((entry) => entry.verb === "saluj")
        );
        const gatedPerfectivoDerivations = ctx.buildPatientivoPerfectivoDerivations({
            verb: "salua",
            analysisVerb: "salua",
            sourceRawVerb: "-salua",
            exactBaseVerb: "salua",
            isTransitive: true,
            hasLeadingDash: true,
        });
        s.eq(
            "patientivo perfectivo derivations still gate on the surfaced ti form",
            gatedPerfectivoDerivations.map((entry) => `${entry.verb}${entry.subjectSuffix}`).join(" / "),
            "salujti"
        );
    } finally {
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundleForPerfectivoGate;
        ctx.pretContextHasRightEdge = originalPretContextHasRightEdgeForPerfectivoGate;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidatesForPerfectivoGate;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenanceForPerfectivoGate;
        ctx.isSyllableSequencePronounceable = originalPerfectivoGatePronounceability;
    }

    const originalPasadoRemotoPronounceability = ctx.isSyllableSequencePronounceable;
    const originalResolvePretUniversalContextBundleForPasadoRemotoGate = ctx.resolvePretUniversalContextBundle;
    const originalGetPretUniversalClassCandidatesForPasadoRemotoGate = ctx.getPretUniversalClassCandidates;
    const originalGetPretUniversalClassOrderForPasadoRemotoGate = ctx.getPretUniversalClassOrder;
    const originalBuildClassBasedResultWithProvenanceForPasadoRemotoGate = ctx.buildClassBasedResultWithProvenance;
    try {
        ctx.isSyllableSequencePronounceable = (value) => value === "takawajka";
        ctx.resolvePretUniversalContextBundle = () => ({
            context: {
                isMonosyllable: false,
            },
        });
        ctx.getPretUniversalClassCandidates = () => new Set(["D"]);
        ctx.getPretUniversalClassOrder = () => ["D"];
        ctx.buildClassBasedResultWithProvenance = () => ({
            provenance: {
                variants: [
                    {
                        base: "waj",
                        suffix: "",
                        surfaceStem: "waj",
                    },
                ],
            },
        });
        const parsedCalificativoClassD = ctx.parseVerbInput("(taka)-(wa)");
        const gatedPasadoRemotoStemEntries = ctx.buildPasadoRemotoStemEntries({
            verb: parsedCalificativoClassD.verb,
            analysisVerb: parsedCalificativoClassD.analysisVerb,
            rawAnalysisVerb: parsedCalificativoClassD.rawAnalysisVerb || "",
            sourceRawVerb: parsedCalificativoClassD.sourceRawVerb || "(taka)-(wa)",
            isTransitive: true,
            directionalPrefix: parsedCalificativoClassD.directionalPrefix || "",
            boundPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            boundPrefixes: Array.isArray(parsedCalificativoClassD.boundPrefixes) ? parsedCalificativoClassD.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(parsedCalificativoClassD.boundExplicitFlags) ? parsedCalificativoClassD.boundExplicitFlags : [],
            directionalPrefixFromSlash: parsedCalificativoClassD.directionalPrefixFromSlash || "",
            sourceSplitPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            sourcePrefix: parsedCalificativoClassD.sourcePrefix || "",
            sourceBase: parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.canonicalRuleBase || "",
            sourceCompositeBase: parsedCalificativoClassD.canonical?.slashCompositeRuleBase || "",
            hasImpersonalTaPrefix: parsedCalificativoClassD.hasImpersonalTaPrefix === true,
            hasOptionalSupportiveI: parsedCalificativoClassD.hasOptionalSupportiveI === true,
            hasSlashMarker: parsedCalificativoClassD.hasSlashMarker === true,
            hasSuffixSeparator: parsedCalificativoClassD.hasSuffixSeparator === true,
            hasLeadingDash: parsedCalificativoClassD.hasLeadingDash === true,
            hasBoundMarker: parsedCalificativoClassD.hasBoundMarker === true,
            hasCompoundMarker: parsedCalificativoClassD.hasCompoundMarker === true,
            hasNonspecificValence: parsedCalificativoClassD.hasNonspecificValence === true,
            exactBaseVerb: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
            suppletiveStemSet: null,
            rootPlusYaBase: parsedCalificativoClassD.rootPlusYaBase || "",
            rootPlusYaBasePronounceable: parsedCalificativoClassD.rootPlusYaBasePronounceable || "",
            matrixBaseOverride: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
        });
        s.eq(
            "pasado remoto stem entries keep stems when the predicate surface is pronounceable",
            gatedPasadoRemotoStemEntries.map((entry) => entry.verb).join(" / "),
            "takawaj"
        );
    } finally {
        ctx.isSyllableSequencePronounceable = originalPasadoRemotoPronounceability;
        ctx.resolvePretUniversalContextBundle = originalResolvePretUniversalContextBundleForPasadoRemotoGate;
        ctx.getPretUniversalClassCandidates = originalGetPretUniversalClassCandidatesForPasadoRemotoGate;
        ctx.getPretUniversalClassOrder = originalGetPretUniversalClassOrderForPasadoRemotoGate;
        ctx.buildClassBasedResultWithProvenance = originalBuildClassBasedResultWithProvenanceForPasadoRemotoGate;
    }

    const transitiveLuaTroncoDerivations = ctx.buildPatientivoTroncoDerivations({
        verb: "-(salua)",
        analysisVerb: "salua",
        rawAnalysisVerb: "salua",
        isTransitive: true,
        sourceBase: "salua",
        hasLeadingDash: true,
    });
    s.ok(
        "patientivo tronco transitive l|VV ua keeps the raw stem family",
        transitiveLuaTroncoDerivations.some((entry) => `${entry?.verb || ""}${entry?.subjectSuffix || ""}` === "sal")
    );
    const expandedTransitiveLuaTronco = ctx.expandPatientivoNominalMarkerOptions(
        transitiveLuaTroncoDerivations,
        "tronco-verbal"
    );
    s.eq(
        "patientivo tronco transitive l|VV ua expands only route and tli-class markers",
        expandedTransitiveLuaTronco.map((entry) => `${entry?.verb || ""}${entry?.subjectSuffix || ""}`).join(" / "),
        "sal / salti"
    );

    return s;
}

module.exports = { run };
