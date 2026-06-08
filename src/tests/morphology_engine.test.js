"use strict";

/**
 * Tests for src/core/generation/morphology_engine.js
 * Covers: direct applyMorphologyRules execution without the browser wrapper.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("morphology_engine");
    const summarizeNominalizationProfile = (profile) => profile && ({
        curriculumRef: profile.curriculumRef,
        outputKind: profile.outputKind,
        nominalKind: profile.nominalKind,
        sourceTense: profile.source?.sourceTense || "",
        nominalizationKind: profile.role?.nominalizationKind || "",
        semanticRole: profile.role?.semanticRole || "",
        patientiveFamily: profile.role?.patientiveFamily || "",
        adjectivalFunction: profile.role?.adjectivalFunction || "",
        categoryTransition: profile.categoryTransition,
        nominalizationScope: profile.boundaries?.nominalizationScope || "",
        isFunctionalSupplementation: profile.boundaries?.isFunctionalSupplementation === true,
        isAdjectivalModification: profile.boundaries?.isAdjectivalModification === true,
        doesNotImplementLessons42_43: profile.boundaries?.doesNotImplementLessons42_43 === true,
    });
    const summarizePossessorSourceFrame = (frame) => frame && ({
        grammarSource: frame.grammarSource || "",
        possessorOrigin: frame.possessorOrigin || "",
        sourceSubjectRelation: frame.sourceSubjectRelation || "",
        contrastNominalKind: frame.contrastNominalKind || "",
        notSourceSubjectTransform: frame.notSourceSubjectTransform === true,
        notExternalPossessorImport: frame.notExternalPossessorImport === true,
        sourceSubject: frame.sourceSubject ? {
            prefix: frame.sourceSubject.prefix || "",
            suffix: frame.sourceSubject.suffix || "",
        } : null,
    });
    const summarizeDenominalFamilyProfile = (profile) => profile && ({
        curriculumRef: profile.curriculumRef,
        outputKind: profile.outputKind,
        routeFamily: profile.routeFamily,
        structuralAnalogue: profile.structuralAnalogue,
        routeId: profile.routeId,
        routePlacement: profile.routePlacement,
        routeProfileSource: profile.routeProfileSource,
        sourceState: profile.sourceState,
        verbalizer: profile.verbalizer,
        verbalizerType: profile.verbalizerType,
        valency: profile.valency,
        targetTense: profile.targetTense,
        surfaceSuffix: profile.surfaceSuffix,
        supportStatus: profile.supportStatus,
        isCompleteLesson54_55: profile.isCompleteLesson54_55,
        noNewSurfaceForms: profile.boundaries?.noNewSurfaceForms === true,
    });
    s.eq(
        "runtime exposes shared nominalization metadata helpers",
        [
            typeof ctx.getVerbDerivedNominalProfileDefaults,
            typeof ctx.buildVerbDerivedPatientiveFamilyProfile,
            typeof ctx.buildVerbDerivedNominalizationProfile,
            typeof ctx.buildGeneratedNominalSubjectNumberConnectorMetadata,
        ],
        ["function", "function", "function", "function"]
    );

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

    const nemiImperativeSecondSingular = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "imperativo",
            subjectPrefix: "ti",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq("generateWord imperative 2sg suppresses ma after shi rewrite", nemiImperativeSecondSingular.surfaceForms, ["shinemi"]);

    const asiImperativeSecondPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "asi",
            tense: "imperativo",
            subjectPrefix: "an",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq("generateWord imperative 2pl suppresses ma after shi rewrite", asiImperativeSecondPlural.surfaceForms, ["shiasikan"]);

    const nemiImperativeThirdSingular = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "imperativo",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq("generateWord imperative 3sg keeps ma", nemiImperativeThirdSingular.surfaceForms, ["ma nemi"]);

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
    s.eq("applyMorphologyRules agentivo keeps customary ni inside predicate stem", agentivo.verb, "nemini");
    s.eq("applyMorphologyRules agentivo plural uses NNC connector without reusing ni", agentivo.subjectSuffix, "wan");
    s.ok("applyMorphologyRules agentivo returns nominal formSpec", agentivo.formSpec && typeof agentivo.formSpec === "object");
    const generatedAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq("generateWord agentivo surface remains unchanged", generatedAgentivo.surfaceForms, ["nemini"]);
    s.eq("generateWord agentivo formula uses generated predicate stem and vacant connector", {
        connector: generatedAgentivo.subjectNumberConnector?.displaySurface || "",
        formulaEcho: generatedAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        connector: "Ø",
        formulaEcho: "#Ø...Ø(nemini)Ø#",
    });
    s.eq("generateWord agentivo exposes customary-present agentive nominalization profile", summarizeNominalizationProfile(generatedAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo",
        sourceTense: "presente-habitual",
        nominalizationKind: "customary-present-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedPresentAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo-presente",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq("Andrews 36.7 present-agentive NNC reanalyzes the present predicate as the nounstem", generatedPresentAgentivo.surfaceForms, ["nemi"]);
    s.eq("Andrews 36.7 present-agentive formula uses the generated present predicate and vacant connector", {
        connector: generatedPresentAgentivo.subjectNumberConnector?.displaySurface || "",
        formulaEcho: generatedPresentAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        connector: "Ø",
        formulaEcho: "#Ø...Ø(nemi)Ø#",
    });
    s.eq("Andrews 36.7 present-agentive profile stays distinct from customary-present agentive", summarizeNominalizationProfile(generatedPresentAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo-presente",
        sourceTense: "presente",
        nominalizationKind: "present-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedPresentAgentivoPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo-presente",
            subjectPrefix: "ti",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq("Andrews 36.7 present-agentive plural keeps the present source number connector", {
        forms: generatedPresentAgentivoPlural.surfaceForms,
        connector: generatedPresentAgentivoPlural.subjectNumberConnector?.displaySurface || "",
        formulaEcho: generatedPresentAgentivoPlural.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tinemit"],
        connector: "t",
        formulaEcho: "#ti...Ø(nemi)t#",
    });
    const generatedPresentAgentivoTransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "agentivo-presente",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq("Andrews 36.7 present-agentive transitive source keeps the generated object inside the nounstem", {
        forms: generatedPresentAgentivoTransitive.surfaceForms,
        formulaEcho: generatedPresentAgentivoTransitive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tamati"],
        formulaEcho: "#Ø...Ø(tamati)Ø#",
    });
    const generatedPresentAgentivoPossessiveProbe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo-presente",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "nu",
        },
    });
    s.eq("Andrews 36.7 present-agentive is absolutive-only even when a possessive probe is supplied", {
        forms: generatedPresentAgentivoPossessiveProbe.surfaceForms,
        predicateState: generatedPresentAgentivoPossessiveProbe.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedPresentAgentivoPossessiveProbe.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nemi"],
        predicateState: "absolutive",
        formulaEcho: "#Ø...Ø(nemi)Ø#",
    });
    const generatedPreteritAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo-preterito",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq("Andrews 35.3 preterit-agentive restricted NNC reanalyzes the preterit predicate as the nounstem", {
        forms: generatedPreteritAgentivo.surfaceForms,
        connector: generatedPreteritAgentivo.subjectNumberConnector?.displaySurface || "",
        formulaEcho: generatedPreteritAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nenki", "nemik"],
        connector: "ki",
        formulaEcho: "#Ø...Ø(nen)ki#",
    });
    s.eq("Andrews 35 preterit-agentive profile stays distinct from customary, present, and future agentives", summarizeNominalizationProfile(generatedPreteritAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo-preterito",
        sourceTense: "preterito",
        nominalizationKind: "preterit-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedPreteritAgentivoPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo-preterito",
            subjectPrefix: "ti",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq("Andrews 35.3 preterit-agentive plural exposes the preterit NNC connector", {
        forms: generatedPreteritAgentivoPlural.surfaceForms,
        connector: generatedPreteritAgentivoPlural.subjectNumberConnector?.displaySurface || "",
        formulaEcho: generatedPreteritAgentivoPlural.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tinenket", "tinemiket"],
        connector: "ket",
        formulaEcho: "#ti...Ø(nen)ket#",
    });
    const generatedPreteritAgentivoTransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "agentivo-preterito",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq("Andrews 35.3 preterit-agentive transitive source keeps the projective object inside the nounstem", {
        forms: generatedPreteritAgentivoTransitive.surfaceForms,
        formulaEcho: generatedPreteritAgentivoTransitive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tamatki", "tamatik"],
        formulaEcho: "#Ø...Ø(tamat)ki#",
    });
    const generatedPreteritAgentivoPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "agentivo-preterito",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            possessivePrefix: "nu",
        },
    });
    s.eq("Andrews 35.5-35.6 preterit-agentive general-use possessive adds Nawat ka matrix before possessive connector", {
        forms: generatedPreteritAgentivoPossessive.surfaceForms,
        connector: generatedPreteritAgentivoPossessive.subjectNumberConnector?.displaySurface || "",
        predicateState: generatedPreteritAgentivoPossessive.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedPreteritAgentivoPossessive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nutamatkaw", "nutamatikaw"],
        connector: "w",
        predicateState: "possessive",
        formulaEcho: "#Ø...Ø(tamatka)w#",
    });
    const generatedPreteritAgentivoReflexivePossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "agentivo-preterito",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
            possessivePrefix: "nu",
        },
    });
    s.eq("Andrews 35.5 preterit-agentive general-use reflexive source maps mainline mu to shuntline ne", {
        forms: generatedPreteritAgentivoReflexivePossessive.surfaceForms,
        formulaEcho: generatedPreteritAgentivoReflexivePossessive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nunematkaw", "nunematikaw"],
        formulaEcho: "#Ø...Ø(nematka)w#",
    });
    const generatedPreteritAgentivoMikiPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(miki)",
            tense: "agentivo-preterito",
            subjectPrefix: "ni",
            subjectSuffix: "",
            objectPrefix: "",
            possessivePrefix: "nu",
        },
    });
    s.eq("Andrews 36.12 preterit-agentive keeps the source subject as NNC subject and imports an external possessor", {
        forms: generatedPreteritAgentivoMikiPossessive.surfaceForms,
        predicateState: generatedPreteritAgentivoMikiPossessive.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedPreteritAgentivoMikiPossessive.nuclearClauseShell?.formulaEcho || "",
        possessorSourceFrame: summarizePossessorSourceFrame(generatedPreteritAgentivoMikiPossessive.nominalizationProfile?.possessorSourceFrame),
    }, {
        forms: ["ninumikikaw"],
        predicateState: "possessive",
        formulaEcho: "#ni...Ø(mikika)w#",
        possessorSourceFrame: {
            grammarSource: "Andrews 36.12",
            possessorOrigin: "external",
            sourceSubjectRelation: "retained-as-nnc-subject",
            contrastNominalKind: "calificativo-instrumentivo",
            notSourceSubjectTransform: true,
            notExternalPossessorImport: false,
            sourceSubject: null,
        },
    });
    const generatedFutureAgentivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo-futuro",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq("Andrews 36.8 future-agentive restricted NNC keeps future s inside the nounstem and adds ki connector", {
        forms: generatedFutureAgentivo.surfaceForms,
        connector: generatedFutureAgentivo.subjectNumberConnector?.displaySurface || "",
        formulaEcho: generatedFutureAgentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nemiski"],
        connector: "ki",
        formulaEcho: "#Ø...Ø(nemis)ki#",
    });
    s.eq("Andrews 36.8 future-agentive profile stays distinct from customary and present agentive", summarizeNominalizationProfile(generatedFutureAgentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "agentivo-futuro",
        sourceTense: "futuro",
        nominalizationKind: "future-agentive",
        semanticRole: "agent",
        patientiveFamily: "",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const generatedFutureAgentivoPlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "agentivo-futuro",
            subjectPrefix: "ti",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq("Andrews 36.8 future-agentive restricted plural keeps future s and exposes ket connector", {
        forms: generatedFutureAgentivoPlural.surfaceForms,
        connector: generatedFutureAgentivoPlural.subjectNumberConnector?.displaySurface || "",
        formulaEcho: generatedFutureAgentivoPlural.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tinemisket"],
        connector: "ket",
        formulaEcho: "#ti...Ø(nemis)ket#",
    });
    const generatedFutureAgentivoTransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "agentivo-futuro",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq("Andrews 36.8 future-agentive restricted transitive source keeps projective object inside the nounstem", {
        forms: generatedFutureAgentivoTransitive.surfaceForms,
        formulaEcho: generatedFutureAgentivoTransitive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["tamatiski"],
        formulaEcho: "#Ø...Ø(tamatis)ki#",
    });
    const generatedFutureAgentivoPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "agentivo-futuro",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            possessivePrefix: "nu",
        },
    });
    s.eq("Andrews 36.8 future-agentive general-use possessive adds Nawat ka matrix before possessive connector", {
        forms: generatedFutureAgentivoPossessive.surfaceForms,
        connector: generatedFutureAgentivoPossessive.subjectNumberConnector?.displaySurface || "",
        predicateState: generatedFutureAgentivoPossessive.nominalizationProfile?.predicateState?.value || "",
        formulaEcho: generatedFutureAgentivoPossessive.nuclearClauseShell?.formulaEcho || "",
    }, {
        forms: ["nutamatiskaw"],
        connector: "w",
        predicateState: "possessive",
        formulaEcho: "#Ø...Ø(tamatiska)w#",
    });

    const nemiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action z/liz maps to Nawat s/lis from the future core",
        {
            forms: nemiActionNominal.surfaceForms,
            sourceTense: nemiActionNominal.nominalizationProfile?.source?.sourceTense || "",
            kind: nemiActionNominal.nominalizationProfile?.role?.nominalizationKind || "",
            subjectConnector: nemiActionNominal.subjectNumberConnector?.displaySurface || "",
            shellConnector: nemiActionNominal.nuclearClauseShell?.slots?.subjectNumberConnector?.displayConnector || "",
            lisRole: nemiActionNominal.subjectNumberConnector?.derivationalSuffixRole || "",
        },
        {
            forms: ["nemilis", "nemis"],
            sourceTense: "futuro",
            kind: "action-nominal",
            subjectConnector: "Ø",
            shellConnector: "Ø",
            lisRole: "predicate.action-nominalizer",
        }
    );
    const chukaActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "chuka",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 ka-final active-action NNC uses the configured replacive imperfective stem",
        chukaActionNominal.surfaceForms,
        ["chukilis"]
    );
    const nesiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nesi",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 si-final active-action NNC uses Nawat shi replacive imperfective stem",
        nesiActionNominal.surfaceForms,
        ["neshilis"]
    );
    const ajsiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(ajsi)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 37 transitive si-final active-action NNC uses Nawat shi with the projective object",
        ajsiActionNominal.surfaceForms,
        ["taajshilis"]
    );
    const teomatiActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(teomati)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 37 ti-final active-action NNC keeps the configured optional Nawat chi alternate",
        teomatiActionNominal.surfaceForms,
        ["tateomatilis", "tateomachilis", "tateomatis"]
    );
    const kuawiyaActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "kuawiya",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 ya-stem active-action alternates keep s/lis nominalizer",
        {
            forms: kuawiyaActionNominal.surfaceForms,
            hasBareSourceStem: kuawiyaActionNominal.surfaceForms.includes("kuawiya"),
            allAlternatesNominalized: kuawiyaActionNominal.surfaceForms.every((form) => /(?:lis|s)$/.test(form)),
        },
        {
            forms: ["kuawilis", "kuawiyalis"],
            hasBareSourceStem: false,
            allAlternatesNominalized: true,
        }
    );
    const istayaActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "istaya",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 root-plus-ya active-action NNC deletes ya when configured from the PDF example",
        {
            forms: istayaActionNominal.surfaceForms,
            hasStemVariant: istayaActionNominal.surfaceForms.includes("istayalis"),
        },
        {
            forms: ["istalis"],
            hasStemVariant: false,
        }
    );
    const pluralRequestedActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "nemi",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action NNC remains common-number even if plural is probed",
        pluralRequestedActionNominal.surfaceForms,
        ["nemilis", "nemis"]
    );
    const invalidActionNominalSubject = ctx.generateWord({
        silent: true,
        skipValidation: false,
        override: {
            verb: "nemi",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "t",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action NNC rejects plural subject connector in validated generation",
        invalidActionNominalSubject.error,
        "Sustantivo verbal solo con 3a persona no animada común."
    );
    const transitiveActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action transitive NNC keeps the object pronoun",
        transitiveActionNominal.surfaceForms,
        ["tamatilis", "tamatis"]
    );
    const reflexiveActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(maka)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action reflexive NNC maps mainline mu to shuntline ne",
        reflexiveActionNominal.surfaceForms,
        ["nemakalis"]
    );
    const reflexiveProjectiveActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
            indirectObjectMarker: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action double-object reflexive NNC drops the projective object and keeps shuntline ne",
        {
            forms: reflexiveProjectiveActionNominal.surfaceForms,
            kind: reflexiveProjectiveActionNominal.nominalizationProfile?.role?.nominalizationKind || "",
        },
        {
            forms: ["nematilis", "nematis"],
            kind: "action-nominal",
        }
    );
    const reflexiveVowelStemActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(cuepa)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action reflexive NNC keeps ne before a vowel-final source",
        reflexiveVowelStemActionNominal.surfaceForms,
        ["necuepalis"]
    );
    const reflexiveSupportiveIActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(ihmati)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action reflexive NNC allows supportive i to drop after ne",
        reflexiveSupportiveIActionNominal.surfaceForms,
        ["neihmatilis", "nehmatilis", "neihmatis", "nehmatis"]
    );
    const supportiveIActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(ilnamiqui)",
            tense: "sustantivo-verbal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 37 active-action NNC drops source supportive i after ta",
        supportiveIActionNominal.surfaceForms,
        ["talnamiquilis", "talnamiquis"]
    );
    const impersonalActionNominal = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "sustantivo-verbal",
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 37 impersonal-action liz NNC is generated from the nonactive core",
        {
            forms: impersonalActionNominal.surfaceForms,
            sourceMode: impersonalActionNominal.nominalizationProfile?.source?.sourceCombinedMode || "",
            sourceTense: impersonalActionNominal.nominalizationProfile?.source?.sourceTense || "",
            kind: impersonalActionNominal.nominalizationProfile?.role?.nominalizationKind || "",
            semanticRole: impersonalActionNominal.nominalizationProfile?.role?.semanticRole || "",
        },
        {
            forms: ["machulis", "matulis", "matilulis"],
            sourceMode: "nonactive",
            sourceTense: "impersonal-core",
            kind: "impersonal-action-nominal",
            semanticRole: "general action",
        }
    );
    s.eq(
        "Andrews Lesson 37 impersonal-action liz NNC does not use the active-action short s subtype",
        impersonalActionNominal.surfaceForms.some((form) => form.endsWith("s") && !form.endsWith("lis")),
        false
    );
    const passiveActionCharacteristic = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "calificativo-instrumentivo",
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 36 passive-action characteristic NNC is generated from the nonactive distant-past core",
        {
            forms: passiveActionCharacteristic.surfaceForms,
            sourceMode: passiveActionCharacteristic.nominalizationProfile?.source?.sourceCombinedMode || "",
            sourceTense: passiveActionCharacteristic.nominalizationProfile?.source?.sourceTense || "",
        },
        {
            forms: ["machukayut", "matukayut", "matilukayut"],
            sourceMode: "nonactive",
            sourceTense: "pasado-remoto",
        }
    );
    const possessedPassiveActionCharacteristic = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "calificativo-instrumentivo",
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            possessivePrefix: "nu",
        },
    });
    s.eq(
        "Andrews Lesson 36 default possessed passive-action characteristic keeps the restricted yu matrix",
        possessedPassiveActionCharacteristic.surfaceForms,
        ["numachukayu", "numatukayu", "numatilukayu"]
    );
    const passiveActionGeneralUse = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "calificativo-instrumentivo",
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            possessivePrefix: "nu",
            actionNounStemUse: "general-use",
        },
    });
    s.eq(
        "Andrews Lesson 36 possessive passive-action general-use NNC uses the nonactive ka stem without the restricted yu matrix",
        {
            forms: passiveActionGeneralUse.surfaceForms,
            sourceMode: passiveActionGeneralUse.nominalizationProfile?.source?.sourceCombinedMode || "",
            sourceTense: passiveActionGeneralUse.nominalizationProfile?.source?.sourceTense || "",
            kind: passiveActionGeneralUse.nominalizationProfile?.role?.nominalizationKind || "",
            semanticRole: passiveActionGeneralUse.nominalizationProfile?.role?.semanticRole || "",
        },
        {
            forms: ["numachuka", "numatuka", "numatiluka"],
            sourceMode: "nonactive",
            sourceTense: "pasado-remoto",
            kind: "passive-action-nominal",
            semanticRole: "patient/action",
        }
    );
    const passiveActionGeneralUseFromSourceSubject = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "calificativo-instrumentivo",
            tenseMode: "sustantivo",
            derivationMode: "nonactive",
            voiceMode: "passive-impersonal",
            subjectPrefix: "ti",
            subjectSuffix: "t",
            objectPrefix: "ta",
            actionNounStemUse: "general-use",
        },
    });
    s.eq(
        "Andrews Lesson 36 passive-action general-use derives possessor from the source VNC subject",
        {
            forms: passiveActionGeneralUseFromSourceSubject.surfaceForms,
            predicateState: passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.predicateState?.possessorPrefix || "",
            sourceMode: passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.source?.sourceCombinedMode || "",
        },
        {
            forms: ["tumachuka", "tumatuka", "tumatiluka"],
            predicateState: "possessive",
            possessorPrefix: "tu",
            sourceMode: "nonactive",
        }
    );
    s.eq(
        "Andrews 36.10/36.12 passive-action records source subject as transformed possessor",
        summarizePossessorSourceFrame(passiveActionGeneralUseFromSourceSubject.nominalizationProfile?.possessorSourceFrame),
        {
            grammarSource: "Andrews 36.10/36.12",
            possessorOrigin: "source-vnc-subject",
            sourceSubjectRelation: "transformed-to-possessor",
            contrastNominalKind: "agentivo-preterito",
            notSourceSubjectTransform: false,
            notExternalPossessorImport: true,
            sourceSubject: { prefix: "ti", suffix: "t" },
        }
    );
    const transitivePotentialPatient = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews Lesson 37 potential-patient NNC strips transitive object pronouns even in generation probes",
        {
            forms: transitivePotentialPatient.surfaceForms,
            kind: transitivePotentialPatient.nominalizationProfile?.role?.nominalizationKind || "",
            semanticRole: transitivePotentialPatient.nominalizationProfile?.role?.semanticRole || "",
            sourceTense: transitivePotentialPatient.nominalizationProfile?.source?.sourceTense || "",
        },
        {
            forms: ["matilis", "matis"],
            kind: "potential-patient",
            semanticRole: "patient/capability",
            sourceTense: "futuro",
        }
    );
    const firstPersonPotentialPatient = ctx.generateWord({
        silent: true,
        skipValidation: false,
        override: {
            verb: "mati",
            tense: "potencial",
            subjectPrefix: "ni",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq(
        "Andrews Lesson 37 potential-patient NNC is not limited to third-person common-number subjects",
        firstPersonPotentialPatient.surfaceForms,
        ["nimatilis", "nimatis"]
    );
    const possessedPotentialPatient = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial",
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            possessivePrefix: "nu",
        },
    });
    s.eq(
        "Andrews Lesson 37 potential-patient NNC preserves possessive state",
        {
            forms: possessedPotentialPatient.surfaceForms,
            predicateState: possessedPotentialPatient.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: possessedPotentialPatient.nominalizationProfile?.predicateState?.possessorPrefix || "",
            kind: possessedPotentialPatient.nominalizationProfile?.role?.nominalizationKind || "",
        },
        {
            forms: ["numatilis", "numatis"],
            predicateState: "possessive",
            possessorPrefix: "nu",
            kind: "potential-patient",
        }
    );
    const customaryPresentPatientiveReflexive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial-habitual",
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
            subjectPrefix: "ti",
            subjectSuffix: "",
            objectPrefix: "mu",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive maps source reflexive mu to shuntline ne",
        {
            forms: customaryPresentPatientiveReflexive.surfaceForms,
            kind: customaryPresentPatientiveReflexive.nominalizationProfile?.role?.nominalizationKind || "",
            family: customaryPresentPatientiveReflexive.nominalizationProfile?.role?.patientiveFamily || "",
            sourcePattern: customaryPresentPatientiveReflexive.nominalizationProfile?.patientiveFamilyProfile?.sourcePattern || "",
            sourceTense: customaryPresentPatientiveReflexive.nominalizationProfile?.source?.sourceTense || "",
        },
        {
            forms: ["tinemachuni", "tinematuni", "tinematiluni"],
            kind: "customary-present-patientive",
            family: "customary-present-passive",
            sourcePattern: "customary-present-passive-core",
            sourceTense: "presente-habitual",
        }
    );
    const customaryPresentPatientiveProjective = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial-habitual",
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
            subjectPrefix: "ti",
            subjectSuffix: "",
            objectPrefix: "ta",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive does not keep single projective object pronouns",
        customaryPresentPatientiveProjective.surfaceForms,
        ["timachuni", "timatuni", "timatiluni"]
    );
    const customaryPresentPatientiveDoubleProjectiveTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial-habitual",
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            indirectObjectMarker: "te",
        },
    });
    const customaryPresentPatientiveDoubleProjectiveTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial-habitual",
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            indirectObjectMarker: "ta",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive keeps selected ta from double-projective source",
        customaryPresentPatientiveDoubleProjectiveTa.surfaceForms,
        ["tamachuni", "tamatuni", "tamatiluni"]
    );
    s.eq(
        "Andrews 36.5 customary-present patientive keeps selected te from double-projective source",
        customaryPresentPatientiveDoubleProjectiveTe.surfaceForms,
        ["temachuni", "tematuni", "tematiluni"]
    );
    const customaryPresentPatientivePossessiveProbe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial-habitual",
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
            subjectPrefix: "ti",
            subjectSuffix: "",
            objectPrefix: "mu",
            possessivePrefix: "nu",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive cannot enter possessive state",
        {
            forms: customaryPresentPatientivePossessiveProbe.surfaceForms,
            hasPossessiveSurface: customaryPresentPatientivePossessiveProbe.surfaceForms.some((form) => form.startsWith("nu")),
            predicateState: customaryPresentPatientivePossessiveProbe.nominalizationProfile?.predicateState?.value || "",
        },
        {
            forms: customaryPresentPatientiveReflexive.surfaceForms,
            hasPossessiveSurface: false,
            predicateState: "absolutive",
        }
    );
    const customaryPresentPatientivePlural = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "potencial-habitual",
            tenseMode: ctx.TENSE_MODE.adjetivo,
            derivationMode: ctx.DERIVATION_MODE.nonactive,
            voiceMode: ctx.VOICE_MODE.passive,
            subjectPrefix: "ti",
            subjectSuffix: "t",
            objectPrefix: "mu",
        },
    });
    s.eq(
        "Andrews 36.5 customary-present patientive plural uses the NNC plural connector, not finite t",
        {
            forms: customaryPresentPatientivePlural.surfaceForms,
            connector: customaryPresentPatientivePlural.subjectNumberConnector?.displaySurface || "",
            formulaEcho: customaryPresentPatientivePlural.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["tinemachunimet", "tinematunimet", "tinematilunimet"],
            connector: "met",
            formulaEcho: "#ti...Ø(nematiluni)met#",
        }
    );
    const absolutiveInstrumentiveReflexive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "instrumentivo",
            tenseMode: ctx.TENSE_MODE.sustantivo,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
        },
    });
    s.eq(
        "Andrews 36.6 absolutive instrumentive maps source reflexive mu to shuntline ne",
        {
            forms: absolutiveInstrumentiveReflexive.surfaceForms,
            sourceTense: absolutiveInstrumentiveReflexive.nominalizationProfile?.source?.sourceTense || "",
            connector: absolutiveInstrumentiveReflexive.subjectNumberConnector?.displaySurface || "",
            formulaEcho: absolutiveInstrumentiveReflexive.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["nemachuni", "nematuni", "nematiluni"],
            sourceTense: "presente-habitual",
            connector: "Ø",
            formulaEcho: "#Ø...Ø(nemachuni)Ø#",
        }
    );
    const possessedInstrumentiveReflexive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "instrumentivo",
            tenseMode: ctx.TENSE_MODE.sustantivo,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
            possessivePrefix: "nu",
        },
    });
    s.eq(
        "Andrews 36.6 possessive instrumentive maps source reflexive mu to shuntline ne",
        {
            forms: possessedInstrumentiveReflexive.surfaceForms,
            sourceTense: possessedInstrumentiveReflexive.nominalizationProfile?.source?.sourceTense || "",
            predicateState: possessedInstrumentiveReflexive.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: possessedInstrumentiveReflexive.nominalizationProfile?.predicateState?.possessorPrefix || "",
            connector: possessedInstrumentiveReflexive.subjectNumberConnector?.displaySurface || "",
            formulaEcho: possessedInstrumentiveReflexive.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["nunematiya"],
            sourceTense: "imperfecto",
            predicateState: "possessive",
            possessorPrefix: "nu",
            connector: "Ø",
            formulaEcho: "#Ø...Ø(nematiya)Ø#",
        }
    );
    const generatedInstrumentiveSourceSubjectPossessive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "instrumentivo",
            tenseMode: ctx.TENSE_MODE.sustantivo,
            subjectPrefix: "ti",
            subjectSuffix: "t",
            objectPrefix: "ta",
            possessivePrefix: "",
            instrumentivoMode: ctx.INSTRUMENTIVO_MODE.posesivo,
        },
    });
    s.eq(
        "Andrews 36.6 generated possessive instrumentive transforms source subject into possessor",
        {
            forms: generatedInstrumentiveSourceSubjectPossessive.surfaceForms,
            predicateState: generatedInstrumentiveSourceSubjectPossessive.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: generatedInstrumentiveSourceSubjectPossessive.nominalizationProfile?.predicateState?.possessorPrefix || "",
            formulaEcho: generatedInstrumentiveSourceSubjectPossessive.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["tutamatiya"],
            predicateState: "possessive",
            possessorPrefix: "tu",
            formulaEcho: "#Ø...Ø(tamatiya)Ø#",
        }
    );

    const matiPatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            patientivoSource: "nonactive",
        },
    });
    s.eq(
        "patientivo mati ta keeps Andrews tli-class nonactive outputs without zero/in spillover",
        matiPatientivo.surfaceForms,
        ["tamachti", "tamachit", "tamatti", "tamatit", "tamatilti"]
    );
    s.eq(
        "patientivo mati ta display groups nominal markers compactly",
        ctx.formatConjugationDisplay(matiPatientivo.result),
        "tamachti\ntamachit\ntamatti\ntamatit\ntamatilti"
    );
    s.eq("generateWord patientivo exposes patientive nominalization profile", summarizeNominalizationProfile(matiPatientivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "patientivo",
        sourceTense: "",
        nominalizationKind: "patientive",
        semanticRole: "patient/result",
        patientiveFamily: "nonactive",
        adjectivalFunction: "",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    s.eq(
        "patientivo profile derives Lessons 37.9-39 family metadata separately from generation",
        {
            family: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.family,
            sourcePattern: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourcePattern,
            sourceFamilyIds: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceFamilyIds,
            sourceFamilyLabel: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceFamilyLabel,
            sourceFamilyBoundary: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceFamilyBoundary,
            sourceTense: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceTense,
            curriculumRange: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.curriculumRef.range,
            outputSlot: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.sourceStageModel.slot,
            generatedOnly: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.isGeneratedSurfaceOnly,
            completeTaxonomy: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.isCompletePatientiveTaxonomy,
            noNewSurfaceForms: matiPatientivo.nominalizationProfile.patientiveFamilyProfile.boundaries.noNewSurfaceForms,
        },
        {
            family: "nonactive",
            sourcePattern: "nonactive-passive-impersonal",
            sourceFamilyIds: ["passive-core", "impersonal-core"],
            sourceFamilyLabel: "pasivo + impersonal (no distinguido)",
            sourceFamilyBoundary: "current-nonactive-branch-does-not-distinguish-passive-vs-impersonal",
            sourceTense: "",
            curriculumRange: "37.9-39",
            outputSlot: "#3 salida",
            generatedOnly: true,
            completeTaxonomy: false,
            noNewSurfaceForms: true,
        }
    );

    const patientiveFamilyExamples = [
        {
            label: "perfective",
            verb: "-(ketza)",
            objectPrefix: "ta",
            source: "perfectivo",
            surfaceForms: ["taketzti"],
            sourcePattern: "perfective-active-stem",
            sourceFamilyIds: ["perfective-active-core"],
            sourceFamilyLabel: "perfectivo activo",
            sourceTense: "preterito",
        },
        {
            label: "imperfective",
            verb: "-(mati)",
            objectPrefix: "ta",
            source: "imperfectivo",
            surfaceForms: ["tamatiyat"],
            sourcePattern: "imperfective-active-stem",
            sourceFamilyIds: ["imperfective-active-core"],
            sourceFamilyLabel: "imperfectivo activo",
            sourceTense: "imperfecto",
        },
        {
            label: "root/stock",
            verb: "(pusuni)",
            objectPrefix: "",
            source: "tronco-verbal",
            surfaceForms: ["pusukti", "pusuchti", "pususti", "pusushti", "pusut"],
            sourcePattern: "root-or-stock-stem",
            sourceFamilyIds: ["root-or-stock"],
            sourceFamilyLabel: "raiz/tronco",
            sourceTense: "",
        },
    ];
    patientiveFamilyExamples.forEach((example) => {
        const generated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                verb: example.verb,
                tense: "patientivo",
                derivationMode: ctx.DERIVATION_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: example.objectPrefix,
                patientivoSource: example.source,
            },
        });
        s.eq(`patientivo ${example.label} family keeps existing surfaces`, generated.surfaceForms, example.surfaceForms);
        s.eq(`patientivo ${example.label} family profile records source pattern`, {
            family: generated.nominalizationProfile.patientiveFamilyProfile.family,
            sourcePattern: generated.nominalizationProfile.patientiveFamilyProfile.sourcePattern,
            sourceFamilyIds: generated.nominalizationProfile.patientiveFamilyProfile.sourceFamilyIds,
            sourceFamilyLabel: generated.nominalizationProfile.patientiveFamilyProfile.sourceFamilyLabel,
            sourceTense: generated.nominalizationProfile.patientiveFamilyProfile.sourceTense,
            completeTaxonomy: generated.nominalizationProfile.patientiveFamilyProfile.isCompletePatientiveTaxonomy,
        }, {
            family: example.source,
            sourcePattern: example.sourcePattern,
            sourceFamilyIds: example.sourceFamilyIds,
            sourceFamilyLabel: example.sourceFamilyLabel,
            sourceTense: example.sourceTense,
            completeTaxonomy: false,
        });
    });
    const generatedRootStockDefault = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(pusuni)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "tronco-verbal",
        },
    });
    const explicitTroncoStemForRoute = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(pusuni)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "",
        },
    });
    const explicitTroncoInClass = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(pusuni)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "in",
        },
    });
    const explicitTroncoZeroClass = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(pusuni)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "zero",
        },
    });
    const explicitTransitiveTroncoInClass = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(salua)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            patientivoSource: "tronco-verbal",
            patientivoNominalSuffix: "in",
        },
    });
    s.eq(
        "Andrews 39.4 root/stock default output does not advertise zero or in noun-class spillover",
        generatedRootStockDefault.surfaceForms.some((form) => form.endsWith("in") || !/(?:t|ti)$/.test(form)),
        false
    );
    s.eq(
        "explicit tronco-verbal stem request remains available for route composition",
        explicitTroncoStemForRoute.surfaceForms,
        ["pusuk", "pusuch", "pusus", "pusush"]
    );
    s.eq(
        "explicit tronco-verbal in-class request is rejected for intransitive root/stock patientive",
        explicitTroncoInClass.error,
        true
    );
    s.eq(
        "explicit tronco-verbal zero-class request is rejected for root/stock patientive noun output",
        explicitTroncoZeroClass.error,
        true
    );
    s.eq(
        "explicit tronco-verbal in-class request is rejected for transitive root/stock patientive",
        explicitTransitiveTroncoInClass.error,
        true
    );
    [
        {
            source: "perfectivo",
            verb: "-(ketza)",
            taForms: ["taketzti"],
            reflexiveForms: ["neketzti"],
        },
        {
            source: "imperfectivo",
            verb: "-(mati)",
            taForms: ["tamatiyat"],
            reflexiveForms: ["nematiyat"],
        },
    ].forEach((example) => {
        const generated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                verb: example.verb,
                tense: "patientivo",
                derivationMode: ctx.DERIVATION_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "te",
                patientivoSource: example.source,
            },
        });
        s.eq(
            `Andrews 39 ${example.source} patientivo maps single-object te source to ta pattern`,
            generated.surfaceForms,
            example.taForms
        );
        s.no(
            `Andrews 39 ${example.source} patientivo does not retain te as nounstem prefix`,
            generated.surfaceForms.some((form) => form.startsWith("te"))
        );
        const reflexiveGenerated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                verb: example.verb,
                tense: "patientivo",
                derivationMode: ctx.DERIVATION_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "mu",
                patientivoSource: example.source,
            },
        });
        s.eq(
            `Andrews 39 ${example.source} patientivo maps source reflexive mu to shuntline ne`,
            reflexiveGenerated.surfaceForms,
            example.reflexiveForms
        );
        s.no(
            `Andrews 39 ${example.source} patientivo does not keep source reflexive mu as the nounstem prefix`,
            reflexiveGenerated.surfaceForms.some((form) => form.startsWith("mu"))
        );
    });
    const blockedPerfectiveTCore = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            patientivoSource: "perfectivo",
        },
    });
    s.eq(
        "Andrews 39.1 blocks perfective patientivo when the perfective source core ends in t",
        blockedPerfectiveTCore.error,
        true
    );
    const blockedPerfectiveChCore = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(kuchi)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "perfectivo",
        },
    });
    s.eq(
        "Andrews 39.1 blocks perfective patientivo when the perfective source core ends in ch",
        blockedPerfectiveChCore.error,
        true
    );
    const possessedPerfectivePatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(ketza)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            possessivePrefix: "nu",
            patientivoSource: "perfectivo",
        },
    });
    s.eq(
        "Andrews 39.1 possessed tli-class patientivo drops Nawat ti connector instead of erroring",
        possessedPerfectivePatientivo.surfaceForms,
        ["nutaketz"]
    );

    const passiveTransitiveZero = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "passive",
        },
    });
    ["ta", "te"].forEach((objectPrefix) => {
        const generated = ctx.generateWord({
            silent: true,
            skipValidation: true,
            override: {
                verb: "-(mati)",
                tense: "patientivo",
                derivationMode: ctx.DERIVATION_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix,
                patientivoSource: "passive",
            },
        });
        const profile = generated.nominalizationProfile.patientiveFamilyProfile;
        s.eq(
            `Andrews 37.9 passive patientivo clears single-object ${objectPrefix} from nounstem`,
            generated.surfaceForms,
            passiveTransitiveZero.surfaceForms
        );
        s.no(
            `passive patientivo ${objectPrefix} output does not retain nonspecific prefix`,
            generated.surfaceForms.some((form) => form.startsWith(objectPrefix))
        );
        s.eq(`patientivo passive exposes Andrews source core separately for ${objectPrefix}`, {
            family: profile.family,
            sourcePattern: profile.sourcePattern,
            sourceFamilyIds: profile.sourceFamilyIds,
            sourceFamilyLabel: profile.sourceFamilyLabel,
            boundary: profile.sourceFamilyBoundary,
            outputSlot: profile.sourceStageModel.slot,
        }, {
            family: "passive",
            sourcePattern: "passive-core",
            sourceFamilyIds: ["passive-core"],
            sourceFamilyLabel: "pasivo",
            boundary: "realized-through-current-nonactive-builder",
            outputSlot: "#3 salida",
        });
    });
    s.eq(
        "Andrews 41.2 patientive compound-source output preserves the underlying compound source when surfaces match",
        (() => {
            const generateCompoundPatientive = (patientivoSource) => ctx.executeGenerateWordRequest({
                prefixInputs: {
                    verb: "-(tal/chiwa)",
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    possessivePrefix: "",
                },
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tense: "patientivo",
                        tenseMode: ctx.TENSE_MODE.sustantivo,
                        derivationMode: ctx.DERIVATION_MODE.nonactive,
                        voiceMode: ctx.VOICE_MODE.passive,
                        patientivoSource,
                    },
                },
            });
            const passive = generateCompoundPatientive("passive");
            const impersonal = generateCompoundPatientive("impersonal");
            const summarize = (generated) => ({
                surfaceForms: generated.surfaceForms,
                compoundFrame: {
                    kind: generated.compoundFrame?.kind || "",
                    matrixStem: generated.compoundFrame?.matrix?.stem || "",
                    embedValues: generated.compoundFrame?.embeds?.map((entry) => entry.value) || [],
                    rawInput: generated.compoundFrame?.sourceInput?.rawInput || "",
                },
                patientiveCompoundSourceFrame: {
                    kind: generated.patientiveCompoundSourceFrame?.kind || "",
                    lessonRef: generated.patientiveCompoundSourceFrame?.lessonRef || "",
                    outputKind: generated.patientiveCompoundSourceFrame?.outputKind || "",
                    patientiveFamily: generated.patientiveCompoundSourceFrame?.patientiveFamily || "",
                    sourcePattern: generated.patientiveCompoundSourceFrame?.sourcePattern || "",
                    sourceMatrixStem: generated.patientiveCompoundSourceFrame?.sourceCompoundFrame?.matrix?.stem || "",
                    sourceEmbedValues: generated.patientiveCompoundSourceFrame?.sourceCompoundFrame?.embeds?.map((entry) => entry.value) || [],
                    sourceRawInput: generated.patientiveCompoundSourceFrame?.sourceCompoundFrame?.sourceInput?.rawInput || "",
                    cannotInferFromSurfaceAlone: generated.patientiveCompoundSourceFrame?.cannotInferFromSurfaceAlone,
                    changesSurfaceForms: generated.patientiveCompoundSourceFrame?.boundaries?.changesSurfaceForms,
                },
            });
            return {
                sameSurface: passive.surfaceForms.join("/") === impersonal.surfaceForms.join("/"),
                passive: summarize(passive),
                impersonal: summarize(impersonal),
            };
        })(),
        {
            sameSurface: true,
            passive: {
                surfaceForms: ["talchiwalti"],
                compoundFrame: {
                    kind: "compound-frame",
                    matrixStem: "chiwa",
                    embedValues: ["tal"],
                    rawInput: "-(tal/chiwa)",
                },
                patientiveCompoundSourceFrame: {
                    kind: "patientive-compound-source-frame",
                    lessonRef: "Andrews 41.2.3",
                    outputKind: "patientive-nnc-compound-source",
                    patientiveFamily: "passive",
                    sourcePattern: "passive-core",
                    sourceMatrixStem: "chiwa",
                    sourceEmbedValues: ["tal"],
                    sourceRawInput: "-(tal/chiwa)",
                    cannotInferFromSurfaceAlone: true,
                    changesSurfaceForms: false,
                },
            },
            impersonal: {
                surfaceForms: ["talchiwalti"],
                compoundFrame: {
                    kind: "compound-frame",
                    matrixStem: "chiwa",
                    embedValues: ["tal"],
                    rawInput: "-(tal/chiwa)",
                },
                patientiveCompoundSourceFrame: {
                    kind: "patientive-compound-source-frame",
                    lessonRef: "Andrews 41.2.3",
                    outputKind: "patientive-nnc-compound-source",
                    patientiveFamily: "impersonal",
                    sourcePattern: "impersonal-core",
                    sourceMatrixStem: "chiwa",
                    sourceEmbedValues: ["tal"],
                    sourceRawInput: "-(tal/chiwa)",
                    cannotInferFromSurfaceAlone: true,
                    changesSurfaceForms: false,
                },
            },
        }
    );
    const passiveReflexiveSource = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
            patientivoSource: "passive",
        },
    });
    s.eq(
        "Andrews 37.9.2 passive patientivo maps source reflexive mu to shuntline ne",
        passiveReflexiveSource.surfaceForms,
        ["nemachti", "nemachit", "nematti", "nematit", "nematilti"]
    );
    const passiveDoubleProjectiveTaTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            indirectObjectMarker: "te",
            patientivoSource: "passive",
        },
    });
    const passiveDoubleProjectiveTeTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            indirectObjectMarker: "ta",
            patientivoSource: "passive",
        },
    });
    s.eq(
        "Andrews 37.9.3 passive patientivo can keep the selected ta projective from a double-object source",
        passiveDoubleProjectiveTaTe.surfaceForms,
        ["tamachti", "tamachit", "tamatti", "tamatit", "tamatilti"]
    );
    s.eq(
        "Andrews 37.9.3 passive patientivo can keep selected te and also delete it from a double-object source",
        passiveDoubleProjectiveTeTa.surfaceForms,
        [
            "temachti", "machti",
            "temachit", "machit",
            "tematti", "matti",
            "tematit", "matit",
            "tematilti", "matilti",
        ]
    );
    const possessedPassivePatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            possessivePrefix: "nu",
            patientivoSource: "passive",
        },
    });
    s.eq(
        "Andrews 37.9 possessed passive patientivo uses generated nounstem state, not route labels",
        possessedPassivePatientivo.surfaceForms,
        ["numach", "numachiw", "numat", "numatiw", "numatil"]
    );
    const possessedPassiveSelectedTePatientivo = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            indirectObjectMarker: "ta",
            possessivePrefix: "nu",
            patientivoSource: "passive",
        },
    });
    s.eq(
        "Andrews 37.9.3 possessed passive selected-te patientivo includes the deleted-te nounstem",
        possessedPassiveSelectedTePatientivo.surfaceForms,
        [
            "nutemach", "numach",
            "nutemachiw", "numachiw",
            "nutemat", "numat",
            "nutematiw", "numatiw",
            "nutematil", "numatil",
        ]
    );
    const impersonalTransitiveTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            patientivoSource: "impersonal",
        },
    });
    const impersonalTransitiveProfile = impersonalTransitiveTa.nominalizationProfile.patientiveFamilyProfile;
    s.eq(
        "Andrews 38.1 impersonal patientivo keeps transitive ta object inside nounstem",
        impersonalTransitiveTa.surfaceForms,
        matiPatientivo.surfaceForms
    );
    const impersonalReflexiveSource = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "mu",
            patientivoSource: "impersonal",
        },
    });
    s.eq(
        "Andrews 38.1.2 impersonal patientivo maps source reflexive mu to shuntline ne",
        impersonalReflexiveSource.surfaceForms,
        ["nemachti", "nemachit", "nematti", "nematit", "nematilti"]
    );
    const impersonalTransitiveTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            patientivoSource: "impersonal",
        },
    });
    s.eq(
        "Andrews 38.1.4 impersonal patientivo maps single-object te source to ta pattern",
        impersonalTransitiveTe.surfaceForms,
        impersonalTransitiveTa.surfaceForms
    );
    s.no(
        "impersonal patientivo te source does not retain te as nounstem prefix",
        impersonalTransitiveTe.surfaceForms.some((form) => form.startsWith("te"))
    );
    const impersonalTransitiveTeWithShuntlineTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            indirectObjectMarker: "te",
            patientivoSource: "impersonal",
        },
    });
    s.eq(
        "Andrews 38.1.3 impersonal patientivo maps mainline te to ta even with shuntline te present",
        impersonalTransitiveTeWithShuntlineTe.surfaceForms,
        ["tetamachti", "tetamachit", "tetamatti", "tetamatit", "tetamatilti"]
    );
    const impersonalTransitiveTeWithShuntlineTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            indirectObjectMarker: "ta",
            patientivoSource: "impersonal",
        },
    });
    s.eq(
        "Andrews 38.1.3 impersonal patientivo preserves te+tla when shuntline ta already marks the nonhuman patient",
        impersonalTransitiveTeWithShuntlineTa.surfaceForms,
        ["tetamachti", "tetamachit", "tetamatti", "tetamatit", "tetamatilti"]
    );
    const perfectiveMainlineTeWithShuntlineTe = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(ketza)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            indirectObjectMarker: "te",
            patientivoSource: "perfectivo",
        },
    });
    s.eq(
        "Andrews 39.1 patientivo analogy maps mainline te to ta even with shuntline te present",
        perfectiveMainlineTeWithShuntlineTe.surfaceForms,
        ["tetaketzti"]
    );
    const imperfectiveTeWithShuntlineTa = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "-(mati)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "te",
            indirectObjectMarker: "ta",
            patientivoSource: "imperfectivo",
        },
    });
    s.eq(
        "Andrews 39.2 imperfective patientivo preserves te+tla under impersonal analogy when shuntline ta already marks the patient",
        imperfectiveTeWithShuntlineTa.surfaceForms,
        ["tetamatiyat"]
    );
    s.eq("patientivo impersonal exposes Andrews source core separately", {
        family: impersonalTransitiveProfile.family,
        sourcePattern: impersonalTransitiveProfile.sourcePattern,
        sourceFamilyIds: impersonalTransitiveProfile.sourceFamilyIds,
        sourceFamilyLabel: impersonalTransitiveProfile.sourceFamilyLabel,
        boundary: impersonalTransitiveProfile.sourceFamilyBoundary,
        outputSlot: impersonalTransitiveProfile.sourceStageModel.slot,
    }, {
        family: "impersonal",
        sourcePattern: "impersonal-core",
        sourceFamilyIds: ["impersonal-core"],
        sourceFamilyLabel: "impersonal",
        boundary: "realized-through-current-nonactive-builder",
        outputSlot: "#3 salida",
    });

    const passiveFromIntransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(pusuni)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "passive",
        },
    });
    s.eq(
        "Andrews 37.9 contract blocks passive patientivo from intransitive ultimate source",
        passiveFromIntransitive.error,
        true
    );
    const impersonalFromIntransitive = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(pusuni)",
            tense: "patientivo",
            derivationMode: ctx.DERIVATION_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            patientivoSource: "impersonal",
        },
    });
    s.eq(
        "Andrews 38.1 contract permits impersonal patientivo from intransitive source",
        impersonalFromIntransitive.surfaceForms,
        ["pusunit", "pusunti"]
    );
    s.eq(
        "impersonal intransitive patientivo keeps impersonal-core family metadata",
        impersonalFromIntransitive.nominalizationProfile.patientiveFamilyProfile.sourceFamilyIds,
        ["impersonal-core"]
    );

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
    s.eq(
        "adverbio generated output carries diagnostic Lesson 44 frame without changing forms",
        {
            kind: adverbioMatiVi.adverbialNuclearFrame?.kind,
            lesson: adverbioMatiVi.adverbialNuclearFrame?.lesson,
            adverbialKind: adverbioMatiVi.adverbialNuclearFrame?.adverbial?.kind,
            sourceStem: adverbioMatiVi.adverbialNuclearFrame?.sourceVnc?.stem,
            sourceValency: adverbioMatiVi.adverbialNuclearFrame?.sourceVnc?.valency,
            clauseFrameKind: adverbioMatiVi.adverbialNuclearClauseFrame?.kind,
            clauseFrameDegree: adverbioMatiVi.adverbialNuclearClauseFrame?.adverbialization?.degree,
            clauseFrameDomain: adverbioMatiVi.adverbialNuclearClauseFrame?.adverbialization?.semanticDomain,
            clauseFrameSubjectNum1Changes: adverbioMatiVi.adverbialNuclearClauseFrame?.adverbialization?.subjectPronoun?.num1?.changesSoundedFillerToSilent,
            clauseFrameChangesSurfaceForms: adverbioMatiVi.adverbialNuclearClauseFrame?.generationContract?.changesSurfaceForms,
            hasKnownLegacyAdverbioTense: adverbioMatiVi.adverbialNuclearFrame?.classification?.hasKnownLegacyAdverbioTense,
            changesSurfaceForms: adverbioMatiVi.adverbialNuclearFrame?.boundaries?.changesSurfaceForms,
            forms: adverbioMatiVi.surfaceForms,
        },
        {
            kind: "adverbial-nuclear-frame",
            lesson: 44,
            adverbialKind: "manner-surface",
            sourceStem: "mati",
            sourceValency: "intransitive",
            clauseFrameKind: "adverbial-nuclear-clause-frame",
            clauseFrameDegree: "first-degree",
            clauseFrameDomain: "manner",
            clauseFrameSubjectNum1Changes: false,
            clauseFrameChangesSurfaceForms: false,
            hasKnownLegacyAdverbioTense: true,
            changesSurfaceForms: false,
            forms: ["matka", "matika"],
        }
    );
    s.eq(
        "adverbio generated output carries diagnostic Lessons 49-50 adjunction boundary frame",
        {
            kind: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.kind,
            lessonRange: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.lessonRange,
            statusLabel: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.statusLabel,
            candidateLabel: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.candidate?.label,
            semanticRelation: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.classification?.semanticRelation,
            adjoinedUnitType: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.classification?.adjoinedUnitType,
            falsePositiveSource: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.classification?.falsePositiveSource,
            singleGeneratedWordIsEvidence: adverbioMatiVi.adverbialAdjunctionBoundaryFrame?.boundaries?.singleGeneratedWordIsEvidence,
            forms: adverbioMatiVi.surfaceForms,
        },
        {
            kind: "adverbial-adjunction-boundary-frame",
            lessonRange: "49-50",
            statusLabel: "no confirmada",
            candidateLabel: "adverbio heredado",
            semanticRelation: "manner",
            adjoinedUnitType: "vnc",
            falsePositiveSource: "legacy-adverbio-surface",
            singleGeneratedWordIsEvidence: false,
            forms: ["matka", "matika"],
        }
    );

    const adverbioMatiVtTa = ctx.executeGenerateWordRequest(buildSilentAdverbRequest({
        verb: "-(mati)",
        objectPrefix: "ta",
    }));
    s.ok("adverbio mati VT ta generates", adverbioMatiVtTa && !adverbioMatiVtTa.error);
    s.eq("adverbio mati VT ta does not double-prefix ta", adverbioMatiVtTa.surfaceForms, ["tamatka", "tamatika"]);
    s.eq(
        "transitive adverbio frame records source valency only",
        {
            sourceValency: adverbioMatiVtTa.adverbialNuclearFrame?.sourceVnc?.valency,
            objectPrefix: adverbioMatiVtTa.adverbialNuclearFrame?.sourceVnc?.objectPrefix,
            baseObjectPrefix: adverbioMatiVtTa.adverbialNuclearFrame?.sourceVnc?.baseObjectPrefix,
            forms: adverbioMatiVtTa.surfaceForms,
        },
        {
            sourceValency: "transitive",
            objectPrefix: "",
            baseObjectPrefix: "ta",
            forms: ["tamatka", "tamatika"],
        }
    );

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
    s.eq("adjetivo preterito -tik profile marks adjectival surface but not modification", summarizeNominalizationProfile(chipawaPreteritoTik.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "adjetivo-preterito-tik",
        sourceTense: "preterito",
        nominalizationKind: "adjectival-surface",
        semanticRole: "property",
        patientiveFamily: "",
        adjectivalFunction: "predicate-surface",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
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
    const pusuniPreteritoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-tik",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VI -ti preterit keeps legacy generation", pusuniPreteritoTik.surfaceForms, ["pusuktik"]);
    s.eq("pusuni denominal VI -ti preterit exposes route-family metadata without adding surfaces", summarizeDenominalFamilyProfile(pusuniPreteritoTik.denominalFamilyProfile), {
        curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
        outputKind: "denominal-route",
        routeFamily: "vi-ti",
        structuralAnalogue: "inceptive-stative-ti-route",
        routeId: "denominal-vi-ti-preterit",
        routePlacement: "patientivo-tronco-conversion",
        routeProfileSource: "static-modes",
        sourceState: "patientivo-tronco",
        verbalizer: "-ti",
        verbalizerType: "denominal-intransitive",
        valency: "intransitive",
        targetTense: "preterito",
        surfaceSuffix: "-tik",
        supportStatus: "current-route-supported",
        isCompleteLesson54_55: false,
        noNewSurfaceForms: true,
    });
    const viTiRouteProfile = ctx.getNawatRouteProfile("adjetivo-preterito-tik");
    s.eq("generated VI -ti denominal metadata derives from static route profile", {
        routeFamily: pusuniPreteritoTik.denominalFamilyProfile.routeFamily,
        structuralAnalogue: pusuniPreteritoTik.denominalFamilyProfile.structuralAnalogue,
        routeId: pusuniPreteritoTik.denominalFamilyProfile.routeId,
        verbalizer: pusuniPreteritoTik.denominalFamilyProfile.verbalizer,
        valency: pusuniPreteritoTik.denominalFamilyProfile.valency,
        targetTense: pusuniPreteritoTik.denominalFamilyProfile.targetTense,
        surfaceSuffix: pusuniPreteritoTik.denominalFamilyProfile.surfaceSuffix,
    }, {
        routeFamily: viTiRouteProfile.denominalFamily,
        structuralAnalogue: viTiRouteProfile.structuralAnalogue,
        routeId: viTiRouteProfile.id,
        verbalizer: viTiRouteProfile.verbalizer,
        valency: viTiRouteProfile.valency,
        targetTense: viTiRouteProfile.nawatTenseValue,
        surfaceSuffix: viTiRouteProfile.surfaceSuffix,
    });
    const pusuktiVerbPreterito = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tense: "preterito",
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
            },
        },
        prefixInputs: {
            subjectPrefix: "",
            objectPrefix: "",
            verb: "pusukti",
            subjectSuffix: "",
            possessivePrefix: "",
        },
        liveInput: {
            hasVerbInput: false,
            verbInputValue: "",
        },
    });
    s.eq("pusukti lives in verb convention preterite", pusuktiVerbPreterito.surfaceForms, ["pusuktik"]);
    const pusuniPerfectoTik = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-tik",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VI -ti perfect keeps legacy generation", pusuniPerfectoTik.surfaceForms, ["pusuktituk"]);
    const pusuniPreteritoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-preterito-naj",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VT -na preterit keeps legacy generation", pusuniPreteritoNaj.surfaceForms, ["pusuknaj"]);
    s.eq("pusuni denominal VT -na preterit exposes route-family metadata without adding surfaces", summarizeDenominalFamilyProfile(pusuniPreteritoNaj.denominalFamilyProfile), {
        curriculumRef: { source: "Andrews", range: "54-55", role: "structural-analogue" },
        outputKind: "denominal-route",
        routeFamily: "vt-na",
        structuralAnalogue: "transitive-denominal-route",
        routeId: "denominal-vt-na-preterit",
        routePlacement: "patientivo-tronco-conversion",
        routeProfileSource: "static-modes",
        sourceState: "patientivo-tronco",
        verbalizer: "-na",
        verbalizerType: "denominal-transitive",
        valency: "transitive",
        targetTense: "preterito",
        surfaceSuffix: "-naj",
        supportStatus: "current-route-supported",
        isCompleteLesson54_55: false,
        noNewSurfaceForms: true,
    });
    const pusuniPerfectoNaj = ctx.executeGenerateWordRequest(buildSilentActiveAdjectiveRequest({
        tense: "adjetivo-perfecto-naj",
        verb: "(pusuni)",
    }));
    s.eq("pusuni future nawat denominal VT -na perfect keeps legacy generation", pusuniPerfectoNaj.surfaceForms, ["pusuknajtuk"]);
    s.eq("denominal-style adjective profile remains a surface classification only", summarizeNominalizationProfile(pusuniPerfectoNaj.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "adjetivo-perfecto-naj",
        sourceTense: "perfecto",
        nominalizationKind: "adjectival-surface",
        semanticRole: "property",
        patientiveFamily: "",
        adjectivalFunction: "predicate-surface",
        categoryTransition: { sourceCategory: "VNC", targetCategory: "NNC", process: "structural-nominalization" },
        nominalizationScope: "structural-word-output",
        isFunctionalSupplementation: false,
        isAdjectivalModification: false,
        doesNotImplementLessons42_43: true,
    });
    const segmentedNaPreterit = ctx.generateWord({
        silent: true,
        skipValidation: true,
        override: {
            verb: "(pusuk)-(na)",
            tense: "preterito",
            tenseMode: ctx.TENSE_MODE.verbo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        },
    });
    s.eq("segmented nawat -na verb convention preterite produces -naj", segmentedNaPreterit.surfaceForms, ["pusuknaj"]);

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
