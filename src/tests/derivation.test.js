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
        prefixInputs: {
            verb: absolutivePrelocativeContract.prelocativeVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: absolutivePrelocativeContract.objectTransfer.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: compoundEmbedContract.compoundVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: activeActionCompoundContract.compoundVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: customaryAgentiveCompoundContract.compoundVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: customaryAgentiveCompoundContract.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: preteritAgentiveCompoundContract.compoundVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: preteritAgentiveOwnerhoodContract.ownerhoodVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "pasado-remoto",
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
        prefixInputs: {
            verb: preteritAgentiveAbundantOwnerhoodContract.ownerhoodVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "pasado-remoto",
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
        prefixInputs: {
            verb: preteritAgentiveComplementContract.complementVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: preteritAgentiveComplementContract.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: preteritAgentiveComplementTaliaContract.complementVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: preteritAgentiveComplementTaliaContract.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: preteritAgentiveAdverbialContract.adverbialVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: preteritAgentiveAdverbialContract.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: ordinaryTClassOwnerhoodContract.ownerhoodVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "pasado-remoto",
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
    const ordinaryZeroClassOwnerhoodContract = ctx.buildOrdinaryNounOwnerhoodContinuationContract({
        nounStem: "kal",
        nounClass: "zero",
        sourceSurface: "kal",
        sourceKind: "fixture",
    });
    const generatedOrdinaryZeroClassOwnerhoodSurface = ctx.executeGenerateWordRequest({
        prefixInputs: {
            verb: ordinaryZeroClassOwnerhoodContract.ownerhoodVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "pasado-remoto",
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
            ownerhoodVerbInput: ordinaryZeroClassOwnerhoodContract.ownerhoodVerbInput,
            result: generatedOrdinaryZeroClassOwnerhoodSurface.result,
        },
        {
            supported: true,
            nounStem: "kal",
            nounClass: "zero",
            matrixRoot: "wa",
            surfaceMatrix: "waj",
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
        prefixInputs: {
            verb: ordinaryAbundantOwnerhoodContract.ownerhoodVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "pasado-remoto",
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
        prefixInputs: {
            verb: characteristicContract.compoundVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: characteristicContract.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: possessedCharacteristicContract.compoundVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: possessedCharacteristicContract.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
    const yulCharacteristicContract = ctx.buildPatientivoCharacteristicPropertyEmbedContinuationContract({
        characteristicSurface: "yulyut",
        sourceSurface: "yulyut",
        matrixRoot: "chikawa",
    });
    const generatedYulCharacteristicSurface = ctx.executeGenerateWordRequest({
        prefixInputs: {
            verb: yulCharacteristicContract.compoundVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: yulCharacteristicContract.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
    const legacyNiMatrixContract = ctx.buildPatientivoPrelocativeContinuationContract({
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
        "Andrews 39.7-39.8 patientive continuation rejects the old non-Andrews ni matrix",
        {
            supported: legacyNiMatrixContract.supported,
            matrixSupported: legacyNiMatrixContract.matrix.supported,
            prelocativeVerbInput: legacyNiMatrixContract.prelocativeVerbInput,
            diagnostics: legacyNiMatrixContract.diagnostics,
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
                prefixInputs: {
                    verb: contract.prelocativeVerbInput,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: contract.objectTransfer.objectPrefix,
                    possessivePrefix: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tense: "presente",
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
        prefixInputs: {
            verb: perfectivePatientivoComplementContract.prelocativeVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: perfectivePatientivoComplementContract.objectTransfer.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        prefixInputs: {
            verb: nonactivePatientivoComplementContract.prelocativeVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: nonactivePatientivoComplementContract.objectTransfer.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
                prefixInputs: {
                    verb: contract.prelocativeVerbInput,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: contract.objectTransfer.objectPrefix,
                    possessivePrefix: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tense: "presente",
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
        prefixInputs: {
            verb: seekMatrixContract.prelocativeVerbInput,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: seekMatrixContract.objectTransfer.objectPrefix,
            possessivePrefix: "",
        },
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tense: "presente",
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
        },
        {
            supported: false,
            diagnostics: [
                "patientivo-prelocative-unmapped-possessor",
                "patientivo-prelocative-unsupported-matrix",
                "patientivo-prelocative-missing-verb-input",
            ],
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
