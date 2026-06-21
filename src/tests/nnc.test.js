"use strict";

/**
 * Tests for src/core/nnc/nnc.js.
 * These cover verb-derived nominal outputs plus the explicit nominal nuclear clause API.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc");
    const summarizeOrdinaryNnc = (result) => {
        if (!result) {
            return result;
        }
        const summary = {
            supported: result.supported,
            result: result.result,
            surfaceForms: result.surfaceForms,
            stem: result.stem,
            state: result.state,
            nounClass: result.nounClass,
            animacy: result.animacy,
            number: result.number,
            pluralType: result.pluralType || undefined,
            subject: result.subject,
            possessor: result.possessor,
            diagnostics: result.diagnostics,
        };
        return summary;
    };
    const summarizeGeneratedOrdinaryNnc = (result) => {
        if (!result) {
            return result;
        }
        const summary = {
            generationRoute: result.generationRoute || "",
            supported: result.supported === true,
            result: result.result || "",
            surfaceForms: result.surfaceForms || [],
            stem: result.stem || "",
            state: result.state || "",
            nounClass: result.nounClass || "",
            animacy: result.animacy || "",
            number: result.number || "",
            pluralType: result.pluralType || undefined,
            subjectKey: result.subject ? result.subject.personSubKey : null,
            possessorPrefix: result.possessor ? result.possessor.prefix : null,
            diagnostics: result.diagnostics || [],
            isReflexive: result.isReflexive === true,
            stemProvenance: result.stemProvenance || null,
        };
        return summary;
    };
    const summarizeOrdinaryNncSet = (result) => result && ({
        supported: result.supported,
        stem: result.stem,
        nounClass: result.nounClass,
        animacy: result.animacy,
        entries: Array.isArray(result.entries)
            ? result.entries.map((entry) => {
                const summary = {
                    result: entry.result,
                    surfaceForms: entry.surfaceForms,
                    state: entry.state,
                    number: entry.number,
                    pluralType: entry.pluralType || undefined,
                    possessor: entry.possessor ? entry.possessor.prefix : null,
                };
                return summary;
            })
            : [],
        diagnostics: result.diagnostics,
        source: result.source,
    });
    const summarizeOrdinaryNncFixtureProbe = (result) => result && ({
        supported: result.supported,
        kind: result.kind,
        input: result.input,
        normalizedInput: result.normalizedInput,
        fixture: result.fixture,
        paradigmSet: summarizeOrdinaryNncSet(result.paradigmSet),
    });
    const summarizeNominalizationProfile = (profile) => profile && ({
        curriculumRef: profile.curriculumRef,
        outputKind: profile.outputKind,
        nominalKind: profile.nominalKind,
        source: {
            sourceMode: profile.source?.sourceMode || "",
            sourceTense: profile.source?.sourceTense || "",
            sourceCategory: profile.source?.sourceCategory || "",
            matrixBase: profile.source?.matrixBase || "",
        },
        role: {
            nominalizationKind: profile.role?.nominalizationKind || "",
            semanticRole: profile.role?.semanticRole || "",
            patientiveFamily: profile.role?.patientiveFamily || "",
            adjectivalFunction: profile.role?.adjectivalFunction || "",
        },
        categoryTransition: profile.categoryTransition,
        predicateState: {
            value: profile.predicateState?.value || "",
            hasPossessor: profile.predicateState?.hasPossessor === true,
            possessorPrefix: profile.predicateState?.possessorPrefix || "",
        },
        boundaries: {
            nominalizationScope: profile.boundaries?.nominalizationScope || "",
            isGeneratedSurface: profile.boundaries?.isGeneratedSurface === true,
            isFullParadigm: profile.boundaries?.isFullParadigm === true,
            isFunctionalSupplementation: profile.boundaries?.isFunctionalSupplementation === true,
            isAdjectivalModification: profile.boundaries?.isAdjectivalModification === true,
            doesNotImplementLessons42_43: profile.boundaries?.doesNotImplementLessons42_43 === true,
        },
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

    const buildSilentNounRequest = ({
        tense,
        verb,
        objectPrefix = "",
        possessivePrefix = "",
        subjectPrefix = "",
        subjectSuffix = "",
        derivationMode = ctx.DERIVATION_MODE.active,
        voiceMode = ctx.VOICE_MODE.active,
        actionNounStemUse = "",
        entradaGrammarObject = null,
    }) => ({
        entradaGrammarObject,
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.sustantivo,
                derivationMode,
                voiceMode,
                actionNounStemUse,
            },
        },
        posicionesFormula: {
            pers1: subjectPrefix,
            obj1: objectPrefix,
            tronco: verb,
            pers2: subjectSuffix,
            num2: subjectSuffix,
            poseedor: possessivePrefix,
            tiempo: tense,
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    const buildSilentOrdinaryNncRequest = ({
        stem,
        state = "absolutive",
        number = "singular",
        pluralType = "auto",
        possessor = "",
        animacy = "",
        nounClass = "",
        possessionKind = "",
        stateCase = "",
        subjectPrefix = "",
        subjectSuffix = "",
    }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.sustantivo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
                ordinaryNnc: {
                    enabled: true,
                    state,
                    number,
                    pluralType,
                    possessor,
                    animacy,
                    nounClass,
                    possessionKind,
                    stateCase,
                },
            },
        },
        posicionesFormula: {
            pers1: subjectPrefix,
            obj1: "",
            tronco: stem,
            pers2: subjectSuffix,
            num2: subjectSuffix,
            poseedor: possessor,
            tiempo: "ordinary-nnc",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });

    s.eq(
        "Lesson 12 absolutive NNC audit API is exposed",
        typeof ctx.buildNncLesson12PursuitFrame,
        "function"
    );
    const lesson12 = ctx.buildNncLesson12PursuitFrame();
    s.eq("Lesson 12 pursuit frame is diagnostic and subsection-complete", {
        stepNumber: lesson12.stepNumber,
        aimStatus: lesson12.aimStatus,
        pdfRefs: lesson12.pdfRefs,
        subsectionCount: lesson12.subsectionInventory.length,
        generationAllowed: lesson12.generationAllowed,
        closestPass: lesson12.closestPass,
        hitCount: lesson12.hitCount,
        missCount: lesson12.missCount,
    }, {
        stepNumber: 12,
        aimStatus: "shooting",
        pdfRefs: [
            "Andrews Lesson 12.1",
            "Andrews Lesson 12.2",
            "Andrews Lesson 12.3",
            "Andrews Lesson 12.4",
            "Andrews Lesson 12.5",
            "Andrews Lesson 12.6",
            "Andrews Lesson 12.7",
        ],
        subsectionCount: 7,
        generationAllowed: false,
        closestPass: false,
        hitCount: 1,
        missCount: 0,
    });
    s.eq("Lesson 12 formula frame keeps CNN/NNC contrast against CNV/VNC", {
        nncFormula: lesson12.formulaContrastFrame.nncFormula,
        hasTensePosition: lesson12.formulaContrastFrame.hasTensePosition,
        stateFunction: lesson12.formulaContrastFrame.stateFunction,
        absolutiveStatePosition: lesson12.absolutiveFormulaFrame.statePosition,
        predicateStemInsideParentheses: lesson12.absolutiveFormulaFrame.predicateStemInsideParentheses,
        subjectConnectorOutsideParentheses: lesson12.absolutiveFormulaFrame.subjectConnectorOutsideParentheses,
    }, {
        nncFormula: "#pers1-pers2(STEM)num1-num2#",
        hasTensePosition: false,
        stateFunction: "State brings a possessor participant into the predicate.",
        absolutiveStatePosition: "vacant",
        predicateStemInsideParentheses: true,
        subjectConnectorOutsideParentheses: true,
    });
    s.eq("Lesson 12 subject frame keeps num1-num2 in the subject", {
        absentCarriers: lesson12.subjectPositionFrame.pers1Pers2Rule.absentCarriers,
        num1BelongsTo: lesson12.subjectPositionFrame.num1Num2Rule.num1BelongsTo,
        num1DoesNotBelongTo: lesson12.subjectPositionFrame.num1Num2Rule.num1DoesNotBelongTo,
        singularDyads: lesson12.subjectPositionFrame.num1Num2Rule.singularCommonDyads,
        pluralDyads: lesson12.subjectPositionFrame.num1Num2Rule.pluralDyads,
        pluralNum2Morphs: lesson12.subjectPositionFrame.num1Num2Rule.pluralNum2Morphs,
    }, {
        absentCarriers: ["x", "xi"],
        num1BelongsTo: "subject-personal-pronoun",
        num1DoesNotBelongTo: ["predicate-state", "nounstem", "noun suffix"],
        singularDyads: ["tl-0", "tli-0", "li-0", "in-0", "0-0"],
        pluralDyads: ["t-in", "m-eh", "0-h"],
        pluralNum2Morphs: ["in", "eh", "h"],
    });
    s.eq("Lesson 12 predicate and animacy frames keep no-tense and reference boundaries", {
        predicateState: lesson12.predicateFrame.predicateState,
        hasTenseMorph: lesson12.predicateFrame.hasTenseMorph,
        timeReferenceSource: lesson12.predicateFrame.timeReferenceSource,
        predicateFunctions: lesson12.predicateFrame.predicateFunctions,
        subjectReferenceIsDecisive: lesson12.animacyFrame.subjectReferenceIsDecisive,
        nonanimateCommonOnly: lesson12.animacyFrame.nonanimateNncAllowsCommonNumberOnly,
        numberNotNounstem: lesson12.animacyFrame.numberPositionNotInflectionOnNounstem,
        stateRestrictionDeferred: lesson12.stateNounstemFrame.restrictedStateStemsDeferredToLesson15,
    }, {
        predicateState: "absolutive",
        hasTenseMorph: false,
        timeReferenceSource: "discourse-context",
        predicateFunctions: ["identify", "describe", "locate"],
        subjectReferenceIsDecisive: true,
        nonanimateCommonOnly: true,
        numberNotNounstem: true,
        stateRestrictionDeferred: true,
    });
    s.eq("Lesson 12 LCM frame blocks unlicensed paradigm generation", {
        routeFamily: lesson12.grammarFrame?.routeContract?.routeFamily,
        routeStage: lesson12.grammarFrame?.routeContract?.routeStage,
        generationAllowed: lesson12.grammarFrame?.routeContract?.generationAllowed,
        diagnosticId: lesson12.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id,
        nuclearFormula: lesson12.grammarFrame?.nuclearClauseFrame?.formula,
        hasTensePosition: lesson12.grammarFrame?.inflectionFrame?.hasTensePosition,
    }, {
        routeFamily: "ordinary-nnc",
        routeStage: "audit-lesson-12",
        generationAllowed: false,
        diagnosticId: "lesson-12-absolutive-nnc-partial",
        nuclearFormula: "#pers1-pers2(STEM)num1-num2#",
        hasTensePosition: false,
    });

    s.eq(
        "Lesson 13 possessive NNC audit API is exposed",
        typeof ctx.buildNncLesson13PursuitFrame,
        "function"
    );
    const lesson13 = ctx.buildNncLesson13PursuitFrame();
    s.eq("Lesson 13 pursuit frame is diagnostic and subsection-complete", {
        stepNumber: lesson13.stepNumber,
        aimStatus: lesson13.aimStatus,
        pdfRefs: lesson13.pdfRefs,
        subsectionCount: lesson13.subsectionInventory.length,
        generationAllowed: lesson13.generationAllowed,
        closestPass: lesson13.closestPass,
        hitCount: lesson13.hitCount,
        missCount: lesson13.missCount,
    }, {
        stepNumber: 13,
        aimStatus: "shooting",
        pdfRefs: [
            "Andrews Lesson 13.1",
            "Andrews Lesson 13.2",
            "Andrews Lesson 13.3",
            "Andrews Lesson 13.4",
            "Andrews Lesson 13.5",
            "Andrews Lesson 13.6",
        ],
        subsectionCount: 6,
        generationAllowed: false,
        closestPass: false,
        hitCount: 1,
        missCount: 0,
    });
    s.eq("Lesson 13 formula frame keeps monadic and dyadic State in predicate", {
        formulas: lesson13.possessiveFormulaFrame.formulas.map((entry) => [entry.id, entry.linearFormula, entry.predicateLine]),
        statePosition: lesson13.possessiveFormulaFrame.statePosition,
        stateParticipant: lesson13.possessiveFormulaFrame.stateBringsParticipantRole,
        hasTensePosition: lesson13.possessiveFormulaFrame.hasTensePosition,
        stemProblemDeferredToLesson14: lesson13.possessiveFormulaFrame.stemProblemDeferredToLesson14,
    }, {
        formulas: [
            ["monadic-state-position", "#pers1-pers2+st(STEM)num1-num2#", "+st(STEM)"],
            ["dyadic-state-position", "#pers1-pers2+st1-st2(STEM)num1-num2#", "+st1-st2(STEM)"],
        ],
        statePosition: "present-in-predicate",
        stateParticipant: "possessor",
        hasTensePosition: false,
        stemProblemDeferredToLesson14: true,
    });
    s.eq("Lesson 13 subject frame keeps possessive num1-num2 in the subject", {
        num1BelongsTo: lesson13.subjectPositionFrame.num1Num2Rule.num1BelongsTo,
        num1DoesNotBelongTo: lesson13.subjectPositionFrame.num1Num2Rule.num1DoesNotBelongTo,
        num1Variants: lesson13.subjectPositionFrame.num1Num2Rule.num1Variants,
        singularCommonNum2: lesson13.subjectPositionFrame.num1Num2Rule.singularCommonNum2,
        pluralNum2: lesson13.subjectPositionFrame.num1Num2Rule.pluralNum2,
        uhAfterVowel: lesson13.subjectPositionFrame.num1Num2Rule.uhAfterVowel,
        huiAfterConsonant: lesson13.subjectPositionFrame.num1Num2Rule.huiAfterConsonant,
    }, {
        num1BelongsTo: "subject-personal-pronoun",
        num1DoesNotBelongTo: ["predicate-state", "possessor", "nounstem", "noun suffix"],
        num1Variants: ["uh/hu", "hui", "0"],
        singularCommonNum2: "0",
        pluralNum2: "an",
        uhAfterVowel: true,
        huiAfterConsonant: true,
    });
    s.eq("Lesson 13 monadic and dyadic State frames follow Andrews", {
        monadicFillers: lesson13.monadicStateFrame.fillers.map((entry) => [entry.id, entry.andrewsMorph, entry.nawatCandidate || ""]),
        st1FirstSecondFillers: lesson13.dyadicStateFrame.st1.firstSecondPerson.fillers,
        st1Third: lesson13.dyadicStateFrame.st1.thirdPerson.filler,
        st2ThirdPlural: lesson13.dyadicStateFrame.st2.thirdPerson.plural,
        st2FirstSecondFiller: lesson13.dyadicStateFrame.st2.firstSecondPerson.filler,
        st2VowelAllomorph: lesson13.dyadicStateFrame.st2.firstSecondPerson.vowelInitialStemAllomorph,
    }, {
        monadicFillers: [
            ["reciprocative-possessor", "ne", ""],
            ["human-nonspecific-possessor", "te", "te"],
            ["nonhuman-nonspecific-possessor", "tla", "ta"],
        ],
        st1FirstSecondFillers: ["m", "am", "n", "t"],
        st1Third: "i",
        st2ThirdPlural: "m~n...",
        st2FirstSecondFiller: "o",
        st2VowelAllomorph: "□",
    });
    s.eq("Lesson 13 specific possessor frame separates Andrews from current Nawat prefixes", {
        possessors: lesson13.specificPossessorFrame.possessors.map((entry) => [entry.id, entry.andrews, entry.currentNawatPrefix]),
        hasTraditionalSpellingWarning: /#am-0\+m-o/.test(lesson13.specificPossessorFrame.traditionalSpellingWarning),
    }, {
        possessors: [
            ["1sg", "n-o ~ n-□", "nu"],
            ["1pl", "t-o ~ t-□", "tu"],
            ["2sg", "m-o ~ m-□", "mu"],
            ["2pl", "am-o ~ am-□", "anmu"],
            ["3sg-common", "i-0", "i"],
            ["3pl", "i-m ~ i-n...", "in"],
        ],
        hasTraditionalSpellingWarning: true,
    });
    s.eq("Lesson 13 LCM frame blocks unlicensed possessive paradigms", {
        routeFamily: lesson13.grammarFrame?.routeContract?.routeFamily,
        routeStage: lesson13.grammarFrame?.routeContract?.routeStage,
        generationAllowed: lesson13.grammarFrame?.routeContract?.generationAllowed,
        diagnosticId: lesson13.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id,
        statePosition: lesson13.grammarFrame?.nuclearClauseFrame?.statePosition,
        predicateState: lesson13.grammarFrame?.inflectionFrame?.predicateState,
        possessorKind: lesson13.grammarFrame?.participantFrame?.possessor?.kind,
    }, {
        routeFamily: "ordinary-nnc",
        routeStage: "audit-lesson-13",
        generationAllowed: false,
        diagnosticId: "lesson-13-possessive-nnc-partial",
        statePosition: "present-in-predicate",
        predicateState: "possessive",
        possessorKind: "lesson-13-specific-possessor-frame",
    });

    s.eq(
        "Lesson 14 nounstem class audit API is exposed",
        typeof ctx.buildNncLesson14PursuitFrame,
        "function"
    );
    const lesson14 = ctx.buildNncLesson14PursuitFrame();
    s.eq("Lesson 14 pursuit frame is diagnostic and subsection-complete", {
        stepNumber: lesson14.stepNumber,
        aimStatus: lesson14.aimStatus,
        pdfRefs: lesson14.pdfRefs,
        subsectionCount: lesson14.subsectionInventory.length,
        generationAllowed: lesson14.generationAllowed,
        closestPass: lesson14.closestPass,
        hitCount: lesson14.hitCount,
        missCount: lesson14.missCount,
    }, {
        stepNumber: 14,
        aimStatus: "shooting",
        pdfRefs: [
            "Andrews Lesson 14.1",
            "Andrews Lesson 14.2",
            "Andrews Lesson 14.3",
            "Andrews Lesson 14.4",
            "Andrews Lesson 14.5",
            "Andrews Lesson 14.6",
            "Andrews Lesson 14.7",
            "Andrews Lesson 14.8",
        ],
        subsectionCount: 8,
        generationAllowed: false,
        closestPass: false,
        hitCount: 1,
        missCount: 0,
    });
    s.eq("Lesson 14 use-stem and class frames keep Andrews classes mapped to current Nawat classes", {
        restrictedUse: lesson14.useStemFrame.restrictedUseStem.usedIn,
        generalUse: lesson14.useStemFrame.generalUseStem.usedIn,
        generalShapes: lesson14.useStemFrame.generalUseStem.shapeOptions,
        classes: lesson14.nounstemClassFrame.classes.map((entry) => [
            entry.andrewsClass,
            entry.currentNawatClass,
            entry.absolutiveSingularCommonNum1,
            entry.stemFinalShape,
        ]),
        liIsSeparateClass: lesson14.nounstemClassFrame.classes.find((entry) => entry.andrewsClass === "tli").liIsSeparateClass,
        currentEngineClasses: lesson14.nounstemClassFrame.currentEngineClasses,
    }, {
        restrictedUse: ["absolutive-state NNC"],
        generalUse: ["possessive-state NNC", "compound-stem embed subposition"],
        generalShapes: ["base", "truncated", "glottalized"],
        classes: [
            ["ti", "t", "tl", "vowel-final"],
            ["tli", "ti", "tli/li", "consonant-final"],
            ["in", "in", "in", "consonant-final"],
            ["0", "zero", "0", "consonant-or-vowel-final"],
        ],
        liIsSeparateClass: false,
        currentEngineClasses: ["t", "ti", "in", "zero"],
    });
    s.eq("Lesson 14 number frame keeps plural meaning out of the predicate nounstem", {
        numberBelongsTo: lesson14.nounstemNumberFrame.numberBelongsTo,
        predicateMarksNumber: lesson14.nounstemNumberFrame.predicateMarksNumber,
        derivedStemTypes: lesson14.nounstemNumberFrame.derivedStemTypes.map((entry) => entry.id),
        derivedStemIsNotSubjectPluralInflection: lesson14.nounstemNumberFrame.derivedStemIsNotSubjectPluralInflection,
        animateNonanimateDistinctionMaintained: lesson14.nounstemNumberFrame.animateNonanimateDistinctionMaintained,
    }, {
        numberBelongsTo: "personal-pronoun subject",
        predicateMarksNumber: false,
        derivedStemTypes: ["plain", "affinity", "distributive-varietal"],
        derivedStemIsNotSubjectPluralInflection: true,
        animateNonanimateDistinctionMaintained: true,
    });
    s.eq("Lesson 14 state-specific stem-selection frames stay diagnostic", {
        absolutiveSingularShape: lesson14.absolutiveSingularCommonFrame.requiredStemShape,
        absolutivePluralStemTypes: lesson14.absolutivePluralFrame.allowedStemTypes,
        possessivePluralNormalStem: lesson14.possessivePluralFrame.normalStemType,
        possessiveSingularShapes: lesson14.possessiveSingularCommonFrame.possibleGeneralUseShapes,
        possessiveTiSubclassIds: lesson14.possessiveSingularCommonFrame.classRules.ti.subclasses.map((entry) => entry.id),
        num1DoesNotBelongTo: lesson14.possessiveSingularCommonFrame.num1DoesNotBelongTo,
    }, {
        absolutiveSingularShape: "restricted-use base shape",
        absolutivePluralStemTypes: ["plain base", "affinity base", "distributive/varietal base"],
        possessivePluralNormalStem: "plain general-use stem",
        possessiveSingularShapes: ["base", "truncated"],
        possessiveTiSubclassIds: ["ti-1-a", "ti-1-b", "ti-2-a", "ti-2-b", "ti-2-c"],
        num1DoesNotBelongTo: ["predicate-state", "nounstem", "noun suffix"],
    });
    s.eq("Lesson 14 analysis frame and LCM frame block unlicensed nounstem-class paradigms", {
        ambiguousBackCount: lesson14.constituentAnalysisFrame.ambiguousBackConstituents.length,
        ambiguousFrontCount: lesson14.constituentAnalysisFrame.ambiguousFrontConstituents.length,
        routeStage: lesson14.grammarFrame?.routeContract?.routeStage,
        diagnosticId: lesson14.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id,
        hasTensePosition: lesson14.grammarFrame?.nuclearClauseFrame?.hasTensePosition,
        nounstemClassValues: lesson14.grammarFrame?.inflectionFrame?.nounstemClassValues,
    }, {
        ambiguousBackCount: 3,
        ambiguousFrontCount: 2,
        routeStage: "audit-lesson-14",
        diagnosticId: "lesson-14-nounstem-class-partial",
        hasTensePosition: false,
        nounstemClassValues: ["t", "ti", "in", "zero"],
    });

    s.eq(
        "Lesson 15 further NNC audit API is exposed",
        typeof ctx.buildNncLesson15PursuitFrame,
        "function"
    );
    const lesson15 = ctx.buildNncLesson15PursuitFrame();
    s.eq("Lesson 15 pursuit frame is diagnostic and subsection-complete", {
        stepNumber: lesson15.stepNumber,
        aimStatus: lesson15.aimStatus,
        pdfRefs: lesson15.pdfRefs,
        subsectionCount: lesson15.subsectionInventory.length,
        generationAllowed: lesson15.generationAllowed,
        closestPass: lesson15.closestPass,
        hitCount: lesson15.hitCount,
        missCount: lesson15.missCount,
    }, {
        stepNumber: 15,
        aimStatus: "shooting",
        pdfRefs: [
            "Andrews Lesson 15.1",
            "Andrews Lesson 15.2",
            "Andrews Lesson 15.3",
        ],
        subsectionCount: 3,
        generationAllowed: false,
        closestPass: false,
        hitCount: 1,
        missCount: 0,
    });
    s.eq("Lesson 15 possessive peculiarity frame blocks unlicensed state-case generation", {
        assimilationConnector: lesson15.possessivePeculiaritiesFrame.possessivePluralAssimilation.connector,
        affectedStemFinals: lesson15.possessivePeculiaritiesFrame.possessivePluralAssimilation.affectedStemFinals,
        suppletiveCount: lesson15.possessivePeculiaritiesFrame.suppletivePossessiveStems.length,
        secondaryStemOperation: lesson15.possessivePeculiaritiesFrame.secondaryGeneralUseStem.operation,
        analogicalPossessor: lesson15.possessivePeculiaritiesFrame.analogicalTlaStem.possessor,
        nuclearPossessorRule: /nuclear/.test(lesson15.possessivePeculiaritiesFrame.nuclearPossessorRule),
    }, {
        assimilationConnector: "hu-an",
        affectedStemFinals: ["voiceless uh/w", "n"],
        suppletiveCount: 4,
        secondaryStemOperation: "possessive-state predicate downgraded to general-use stem",
        analogicalPossessor: "tla",
        nuclearPossessorRule: true,
    });
    s.eq("Lesson 15 natural-possession and sentence frames stay evidence-bound", {
        naturalTypes: lesson15.naturallyPossessedFrame.naturalPossessionTypes.map((entry) => entry.id),
        dictionarySuffixOnlyClass: lesson15.naturallyPossessedFrame.dictionaryAbsolutiveSuffixCanOnlyIdentifyClass,
        metaphorOverride: lesson15.naturallyPossessedFrame.unavailablePossessiveContrast.metaphorCanOverrideRestriction,
        sentenceFunctions: lesson15.sentenceStructureFrame.equationalPredicateFunctions,
        sentenceTypes: lesson15.sentenceStructureFrame.equativeSentenceTypes,
        havingTranslation: lesson15.sentenceStructureFrame.possessiveStateMayTranslateAsHaving,
    }, {
        naturalTypes: ["property", "kinship-human-relations", "body-parts"],
        dictionarySuffixOnlyClass: true,
        metaphorOverride: true,
        sentenceFunctions: ["equative", "attributive", "adverbial"],
        sentenceTypes: ["simple affirmative", "negative", "emphatic", "yes/no question", "wish"],
        havingTranslation: true,
    });
    s.eq("Lesson 15 LCM frame blocks unlicensed NNC sentence generation", {
        routeStage: lesson15.grammarFrame?.routeContract?.routeStage,
        diagnosticId: lesson15.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id,
        generationAllowed: lesson15.grammarFrame?.routeContract?.generationAllowed,
        hasTensePosition: lesson15.grammarFrame?.nuclearClauseFrame?.hasTensePosition,
        sentenceCanConstitute: lesson15.grammarFrame?.nuclearClauseFrame?.sentenceStructureFrame?.nncCanConstituteSentence,
        predicateState: lesson15.grammarFrame?.inflectionFrame?.predicateState,
    }, {
        routeStage: "audit-lesson-15",
        diagnosticId: "lesson-15-further-nnc-partial",
        generationAllowed: false,
        hasTensePosition: false,
        sentenceCanConstitute: true,
        predicateState: "possessive-state-diagnostic",
    });

    s.eq(
        "Lesson 16 pronominal NNC audit API is exposed",
        typeof ctx.buildNncLesson16PursuitFrame,
        "function"
    );
    const lesson16 = ctx.buildNncLesson16PursuitFrame();
    s.eq("Lesson 16 pursuit frame is diagnostic and subsection-complete", {
        stepNumber: lesson16.stepNumber,
        aimStatus: lesson16.aimStatus,
        pdfRefs: lesson16.pdfRefs,
        subsectionCount: lesson16.subsectionInventory.length,
        generationAllowed: lesson16.generationAllowed,
        closestPass: lesson16.closestPass,
        hitCount: lesson16.hitCount,
        missCount: lesson16.missCount,
    }, {
        stepNumber: 16,
        aimStatus: "shooting",
        pdfRefs: [
            "Andrews Lesson 16.1",
            "Andrews Lesson 16.2",
            "Andrews Lesson 16.3",
            "Andrews Lesson 16.4",
            "Andrews Lesson 16.5",
            "Andrews Lesson 16.6",
            "Andrews Lesson 16.7",
            "Andrews Lesson 16.8",
            "Andrews Lesson 16.9",
        ],
        subsectionCount: 9,
        generationAllowed: false,
        closestPass: false,
        hitCount: 1,
        missCount: 0,
    });
    s.eq("Lesson 16 overview and entitive frames keep pronominal NNCs absolutive-only", {
        nncKind: lesson16.overviewFrame.nncKind,
        stateRestriction: lesson16.overviewFrame.stateRestriction,
        semanticKinds: lesson16.overviewFrame.semanticKinds,
        pluralStructuralTypes: lesson16.overviewFrame.pluralStructuralTypes,
        pluralizedStemRule: /inside the stem/.test(lesson16.overviewFrame.pluralizedStemRule),
        entitiveSubtypes: lesson16.entitiveFrame.subtypes,
        hasRelativePronouns: lesson16.entitiveFrame.hasRelativePronouns,
    }, {
        nncKind: "pronominal",
        stateRestriction: "absolutive-only",
        semanticKinds: ["entitive", "quantitive"],
        pluralStructuralTypes: ["plain-stem plural", "pluralized-stem plural"],
        pluralizedStemRule: true,
        entitiveSubtypes: ["personal", "interrogative", "indefinite", "demonstrative"],
        hasRelativePronouns: false,
    });
    s.eq("Lesson 16 entitive subtype frames block English pronoun-word drift", {
        realPersonalPronounsAreAffixal: lesson16.personalFrame.realPersonalPronounsAreAffixal,
        personalStems: lesson16.personalFrame.stems.map((entry) => [entry.id, entry.stems]),
        interrogativeStems: lesson16.interrogativeFrame.stems.map((entry) => entry.id),
        tlehFusion: lesson16.interrogativeFrame.tlehInFusion.fusedForms,
        demonstratives: lesson16.demonstrativeFrame.stems.map((entry) => entry.stem),
        indefiniteStems: lesson16.indefiniteFrame.stems.map((entry) => entry.id),
    }, {
        realPersonalPronounsAreAffixal: true,
        personalStems: [
            ["simple-eh", ["eh-0", "yeh-0"]],
            ["compound-eh-hua", ["eh-hua-tl", "yeh-hua-tl"]],
        ],
        interrogativeStems: ["what-entity", "what-entity-compound", "which-entity", "who"],
        tlehFusion: ["tlein", "tlei", "tlen"],
        demonstratives: ["in", "on"],
        indefiniteStems: ["someone", "something"],
    });
    s.eq("Lesson 16 quantitive frames expose matrix architecture without generation", {
        matrixStems: lesson16.quantitiveOverviewFrame.matrixStems,
        morphDeploymentPredictable: lesson16.quantitiveOverviewFrame.morphDeploymentPredictable,
        quichStems: lesson16.quichFrame.stems.map((entry) => entry.id),
        quiChiPluralRule: /derivational n/.test(lesson16.quiChiFrame.pluralizedStemRule),
        quiChiStemCount: lesson16.quiChiFrame.stems.length,
        interrogativeQualityLost: lesson16.quiChiFrame.interrogativeQualityLostWhenNotInitial,
    }, {
        matrixStems: ["chi/ch", "qui/c", "qui-ch"],
        morphDeploymentPredictable: false,
        quichStems: ["all", "how-much-general", "how-many-varietal"],
        quiChiPluralRule: true,
        quiChiStemCount: 8,
        interrogativeQualityLost: true,
    });
    s.eq("Lesson 16 LCM frame blocks unlicensed pronominal NNC generation", {
        routeStage: lesson16.grammarFrame?.routeContract?.routeStage,
        diagnosticId: lesson16.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id,
        generationAllowed: lesson16.grammarFrame?.routeContract?.generationAllowed,
        nncKind: lesson16.grammarFrame?.nuclearClauseFrame?.nncKind,
        stateRestriction: lesson16.grammarFrame?.nuclearClauseFrame?.stateRestriction,
        predicateState: lesson16.grammarFrame?.inflectionFrame?.predicateState,
    }, {
        routeStage: "audit-lesson-16",
        diagnosticId: "lesson-16-pronominal-nnc-partial",
        generationAllowed: false,
        nncKind: "pronominal",
        stateRestriction: "absolutive-only",
        predicateState: "absolutive-only",
    });

    const nemiMeta = ctx.parseVerbInput("(nemi)");
    const directInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        mode: ctx.INSTRUMENTIVO_MODE.absolutivo,
        possessivePrefix: "",
    });
    s.eq("direct instrumentivo returns stable display text", directInstrumentivo.result, "nemiwani / nemuwani");
    s.eq("direct instrumentivo returns structured entries", directInstrumentivo.entries.length, 2);
    s.eq("direct instrumentivo records derivation kind", directInstrumentivo.nounDerivationKind, "instrumentivo");
    s.eq("direct instrumentivo records source tense", directInstrumentivo.entries[0].sourceTense, "presente-habitual");
    const activeImperfectAbsolutiveInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        mode: ctx.INSTRUMENTIVO_MODE.absolutivoImperfectoActivo,
        possessivePrefix: "",
    });
    s.eq("direct instrumentivo exposes Andrews 36.6 note 2 active-imperfect absolutive exception", {
        result: activeImperfectAbsolutiveInstrumentivo.result,
        sourceTense: activeImperfectAbsolutiveInstrumentivo.entries?.[0]?.sourceTense || "",
        connector: activeImperfectAbsolutiveInstrumentivo.num1Num2?.displaySurface || "",
        exceptionSource: activeImperfectAbsolutiveInstrumentivo.instrumentivoImperfectActiveAbsolutiveException?.grammarSource || "",
    }, {
        result: "nemiyat",
        sourceTense: "imperfecto",
        connector: "t",
        exceptionSource: "Andrews 36.6 note 2",
    });
    s.eq("direct instrumentivo exposes the LCM verb-derived nominal contract", {
        ok: directInstrumentivo.ok,
        surface: directInstrumentivo.surface,
        framesIsGrammarFrame: directInstrumentivo.frames === directInstrumentivo.grammarFrame,
        routeFamily: directInstrumentivo.frames.routeContract.routeFamily,
        routeStage: directInstrumentivo.frames.routeContract.routeStage,
        unitKind: directInstrumentivo.frames.unitFrame.unitKind,
        generationAllowed: directInstrumentivo.frames.routeContract.generationAllowed,
        hasInstrumentivoAuthority: directInstrumentivo.frames.authorityFrame.andrewsRefs.includes("Andrews 36.6"),
        enumerableContract: Object.prototype.propertyIsEnumerable.call(directInstrumentivo, "grammarFrame"),
    }, {
        ok: true,
        surface: "nemiwani",
        framesIsGrammarFrame: true,
        routeFamily: "verb-derived-nominal",
        routeStage: "execute",
        unitKind: "nominal-nuclear-clause",
        generationAllowed: true,
        hasInstrumentivoAuthority: true,
        enumerableContract: false,
    });
    const instrumentivoReflexiveEntradaParsed = ctx.parseMovingTargetRegexInput("(a)+mu-(ish-cuepa)");
    const sparseInstrumentivoReflexiveEntrada = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+mu-(ish-cuepa)",
        instrumentivoReflexiveEntradaParsed
    );
    const fixedInstrumentivoReflexiveEntrada = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+mu-(ish-cuepa)",
        instrumentivoReflexiveEntradaParsed,
        null,
        {
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "cuepa" },
                obj1: { slot: "obj1", token: "mu" },
            },
            sourceFormulaEcho: "#Ø-mu(cuepa)Ø#",
        }
    );
    const cuepaInstrumentivoMeta = ctx.parseVerbInput("-(cuepa)");
    const sparseReflexiveInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(cuepa)",
        verbMeta: cuepaInstrumentivoMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "mu",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "nu",
        entradaGrammarObject: sparseInstrumentivoReflexiveEntrada,
    });
    const fixedReflexiveInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(cuepa)",
        verbMeta: cuepaInstrumentivoMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "mu",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "nu",
        entradaGrammarObject: fixedInstrumentivoReflexiveEntrada,
    });
    s.eq(
        "instrumentivo reflexive source object reclassification is gated until entrada valence frame is fixed",
        {
            sparseStatus: sparseReflexiveInstrumentivo.valencyObjectSlotGate?.status || "",
            sparseOperation: sparseReflexiveInstrumentivo.valencyObjectSlotGate?.operation || "",
            sparseMutationKind: sparseReflexiveInstrumentivo.valencyObjectSlotGate?.mutationKind || "",
            sparseSourceObj1: sparseReflexiveInstrumentivo.valencyObjectSlotGate?.sourceVector?.obj1 || "",
            sparseTargetObj1: sparseReflexiveInstrumentivo.valencyObjectSlotGate?.targetVector?.obj1 || "",
            sparseRouteRankingAllowed: sparseReflexiveInstrumentivo.valencyObjectSlotGate?.routeRankingAllowed,
            fixedError: fixedReflexiveInstrumentivo.error === true,
            fixedResult: fixedReflexiveInstrumentivo.result || "",
            fixedRuntimePrefix: fixedReflexiveInstrumentivo.entries?.[0]?.runtimeObjectPrefix || "",
        },
        {
            sparseStatus: "blocked",
            sparseOperation: "instrumentivo-reflexive-source-object-reclassification",
            sparseMutationKind: "reclassify-object-slot",
            sparseSourceObj1: "mu",
            sparseTargetObj1: "ne",
            sparseRouteRankingAllowed: false,
            fixedError: false,
            fixedResult: "nunecuepaya",
            fixedRuntimePrefix: "ne",
        }
    );
    s.eq(
        "verb-derived nominal reader prefers LCM result-frame surfaces before stale stale aliases",
        (() => {
            const framed = {
                result: "stale-nnc-result",
                surface: "top-nnc-surface",
                surfaceForms: ["stale-nnc-a / stale-nnc-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-nnc-surface",
                        surfaceForms: ["frame-nnc-a / frame-nnc-b"],
                    }),
                }),
            };
            return {
                surface: ctx.getVerbDerivedNominalSurface(framed),
                forms: ctx.getVerbDerivedNominalSurfaceForms(framed),
                hasSurface: ctx.hasVerbDerivedNominalSurface(framed),
            };
        })(),
        {
            surface: "frame-nnc-a",
            forms: ["frame-nnc-a", "frame-nnc-b", "frame-nnc-surface"],
            hasSurface: true,
        }
    );
    s.eq(
        "verb-derived nominal reader suppresses stale aliases for empty result frames",
        (() => {
            const framed = {
                result: "stale-nnc-result",
                surface: "top-nnc-surface",
                surfaceForms: ["stale-nnc-a / stale-nnc-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            };
            return {
                surface: ctx.getVerbDerivedNominalSurface(framed),
                forms: ctx.getVerbDerivedNominalSurfaceForms(framed),
                hasSurface: ctx.hasVerbDerivedNominalSurface(framed),
            };
        })(),
        {
            surface: "",
            forms: [],
            hasSurface: false,
        }
    );
    s.eq(
        "verb-derived nominal reader keeps top-level surface forms before surface/result fallbacks",
        (() => {
            const result = {
                result: "stale-nnc",
                surface: "surface-nnc",
                surfaceForms: ["surface-nnc-a / surface-nnc-b"],
            };
            return {
                surface: ctx.getVerbDerivedNominalSurface(result),
                forms: ctx.getVerbDerivedNominalSurfaceForms(result),
            };
        })(),
        {
            surface: "surface-nnc-a",
            forms: ["surface-nnc-a", "surface-nnc-b", "surface-nnc", "stale-nnc"],
        }
    );
    s.eq("direct instrumentivo exposes category-first nominalization profile", summarizeNominalizationProfile(directInstrumentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "instrumentivo",
        source: {
            sourceMode: "verbo",
            sourceTense: "presente-habitual",
            sourceCategory: "VNC",
            matrixBase: "nemi",
        },
        role: {
            nominalizationKind: "instrumentive",
            semanticRole: "instrument",
            patientiveFamily: "",
            adjectivalFunction: "",
        },
        categoryTransition: {
            sourceCategory: "VNC",
            targetCategory: "NNC",
            process: "structural-nominalization",
        },
        predicateState: {
            value: "absolutive",
            hasPossessor: false,
            possessorPrefix: "",
        },
        boundaries: {
            nominalizationScope: "structural-word-output",
            isGeneratedSurface: true,
            isFullParadigm: false,
            isFunctionalSupplementation: false,
            isAdjectivalModification: false,
            doesNotImplementLessons42_43: true,
        },
    });
    s.eq(
        "direct instrumentivo keeps source tense morph inside the predicate stem",
        directInstrumentivo.num1Num2Alternates.map((entry) => entry.displaySurface),
        ["Ø"]
    );
    s.eq(
        "direct instrumentivo frames the connector as subject material",
        directInstrumentivo.num1Num2.belongsTo,
        "subject"
    );

    const generatedInstrumentivo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "instrumentivo",
        verb: "(nemi)",
    }));
    s.eq("generateWord instrumentivo matches direct helper text", generatedInstrumentivo.result, directInstrumentivo.result);
    s.eq("generateWord instrumentivo exposes surface forms", generatedInstrumentivo.surfaceForms, ["nemiwani", "nemuwani"]);
    s.eq("generateWord instrumentivo exposes diagnostic NNC shell metadata", {
        kind: generatedInstrumentivo.nuclearClauseShell?.kind,
        clauseKind: generatedInstrumentivo.nuclearClauseShell?.clauseKind,
        formulaType: generatedInstrumentivo.nuclearClauseShell?.formulaType,
        formulaAbbreviation: generatedInstrumentivo.nuclearClauseShell?.formulaAbbreviation,
        formulaLabel: generatedInstrumentivo.nuclearClauseShell?.formulaLabel,
        displayLabel: generatedInstrumentivo.nuclearClauseShell?.displayLabel,
        hasTensePosition: generatedInstrumentivo.nuclearClauseShell?.hasTensePosition,
        generationAllowed: generatedInstrumentivo.nuclearClauseShell?.generationAllowed,
        connector: generatedInstrumentivo.nuclearClauseShell?.slots?.num1Num2?.displayConnector,
        formulaEcho: generatedInstrumentivo.nuclearClauseShell?.formulaEcho,
    }, {
        kind: "nuclear-clause-shell",
        clauseKind: "nominal-nuclear-clause",
        formulaType: "NNC",
        formulaAbbreviation: "CNN",
        formulaLabel: "Fórmula CNN",
        displayLabel: "cláusula nuclear nominal (CNN)",
        hasTensePosition: false,
        generationAllowed: false,
        connector: "Ø",
        formulaEcho: "#Ø-Ø(nemiwani)Ø#",
    });
    s.eq("generateWord instrumentivo exposes derived nominalization profile", summarizeNominalizationProfile(generatedInstrumentivo.nominalizationProfile), {
        curriculumRef: { source: "Andrews", range: "35-41", role: "curriculum-index" },
        outputKind: "verb-derived-nominal",
        nominalKind: "instrumentivo",
        source: {
            sourceMode: "verbo",
            sourceTense: "presente-habitual",
            sourceCategory: "VNC",
            matrixBase: "",
        },
        role: {
            nominalizationKind: "instrumentive",
            semanticRole: "instrument",
            patientiveFamily: "",
            adjectivalFunction: "",
        },
        categoryTransition: {
            sourceCategory: "VNC",
            targetCategory: "NNC",
            process: "structural-nominalization",
        },
        predicateState: {
            value: "absolutive",
            hasPossessor: false,
            possessorPrefix: "",
        },
        boundaries: {
            nominalizationScope: "structural-word-output",
            isGeneratedSurface: true,
            isFullParadigm: false,
            isFunctionalSupplementation: false,
            isAdjectivalModification: false,
            doesNotImplementLessons42_43: true,
        },
    });
    s.eq(
        "generateWord instrumentivo exposes nominal clause connector metadata",
        {
            clauseKind: generatedInstrumentivo.nominalClauseFrame.clauseKind,
            hasTensePosition: generatedInstrumentivo.nominalClauseFrame.hasTensePosition,
            predicateState: generatedInstrumentivo.nominalClauseFrame.predicate.state,
            predicateNotTense: generatedInstrumentivo.nominalClauseFrame.predicate.stateSlot.notTense,
            belongsTo: generatedInstrumentivo.num1Num2.belongsTo,
            notNounSuffix: generatedInstrumentivo.num1Num2.notNounSuffix,
            notStatePosition: generatedInstrumentivo.num1Num2.notStatePosition,
        },
        {
            clauseKind: "nominal-nuclear-clause",
            hasTensePosition: false,
            predicateState: "absolutive",
            predicateNotTense: true,
            belongsTo: "subject",
            notNounSuffix: true,
            notStatePosition: true,
        }
    );

    const mikiMeta = ctx.parseVerbInput("(miki)");
    const directCalificativo = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
    });
    s.eq("direct calificativo-instrumentivo keeps nominal yut suffix", directCalificativo.result, "mikkayut");
    s.eq("direct calificativo-instrumentivo records source tense", directCalificativo.entries[0].sourceTense, "pasado-remoto");
    s.eq("direct calificativo-instrumentivo exposes quality/result profile", summarizeNominalizationProfile(directCalificativo.nominalizationProfile).role, {
        nominalizationKind: "quality-result",
        semanticRole: "quality/result",
        patientiveFamily: "",
        adjectivalFunction: "",
    });
    const directPossessedCalificativo = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "nu",
    });
    s.eq(
        "Andrews 39.3 possessed characteristic-property keeps Nawat yu matrix and drops only absolutive t",
        directPossessedCalificativo.result,
        "numikkayu"
    );
    s.eq(
        "possessed characteristic-property profile marks possessive predicate state",
        summarizeNominalizationProfile(directPossessedCalificativo.nominalizationProfile).predicateState,
        {
            value: "possessive",
            hasPossessor: true,
            possessorPrefix: "nu",
        }
    );
    const directGeneralUseActiveAction = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
    });
    s.eq(
        "Andrews 36.11 explicit possessive active-action general-use stem keeps ka without restricted yu",
        {
            result: directGeneralUseActiveAction.result,
            role: summarizeNominalizationProfile(directGeneralUseActiveAction.nominalizationProfile).role,
        },
        {
            result: "numikka",
            role: {
                nominalizationKind: "active-action-nominal",
                semanticRole: "agent/action",
                patientiveFamily: "",
                adjectivalFunction: "",
            },
        }
    );
    const directGeneralUseActiveActionSourceSubjectPossessors = [
        { subjectPrefix: "ni", subjectSuffix: "", result: "numikka", possessor: "nu", grammarSource: "Andrews 36.11" },
        { subjectPrefix: "ti", subjectSuffix: "", result: "mumikka", possessor: "mu", grammarSource: "Andrews 36.11" },
        { subjectPrefix: "", subjectSuffix: "", result: "imikka", possessor: "i", grammarSource: "Andrews 36.11" },
        { subjectPrefix: "ti", subjectSuffix: "t", result: "tumikka", possessor: "tu", grammarSource: "Andrews 36.11" },
        { subjectPrefix: "an", subjectSuffix: "t", result: "anmumikka", possessor: "anmu", grammarSource: "Andrews 36.11" },
        { subjectPrefix: "", subjectSuffix: "t", result: "inmikka", possessor: "in", grammarSource: "Andrews 36.11" },
    ].map((example) => {
        const result = ctx.getCalificativoInstrumentivoResult({
            rawVerb: "(miki)",
            verbMeta: mikiMeta,
            subjectPrefix: example.subjectPrefix,
            subjectSuffix: example.subjectSuffix,
            objectPrefix: "",
            possessivePrefix: "",
            actionNounStemUse: "general-use",
        });
        return {
            subject: `${example.subjectPrefix || "Ø"}...${example.subjectSuffix || "Ø"}`,
            result: result.result,
            possessorPrefix: result.nominalizationProfile?.predicateState?.possessorPrefix || "",
            grammarSource: result.actionNounSourceSubjectPossessor?.grammarSource || "",
            derivedFromSourceSubject: result.actionNounSourceSubjectPossessor?.derivedFromSourceSubject === true,
        };
    });
    s.eq(
        "Andrews 36.11 active-action general-use derives possessor from the source VNC subject",
        directGeneralUseActiveActionSourceSubjectPossessors,
        [
            { subject: "ni...Ø", result: "numikka", possessorPrefix: "nu", grammarSource: "Andrews 36.11", derivedFromSourceSubject: true },
            { subject: "ti...Ø", result: "mumikka", possessorPrefix: "mu", grammarSource: "Andrews 36.11", derivedFromSourceSubject: true },
            { subject: "Ø...Ø", result: "imikka", possessorPrefix: "i", grammarSource: "Andrews 36.11", derivedFromSourceSubject: true },
            { subject: "ti...t", result: "tumikka", possessorPrefix: "tu", grammarSource: "Andrews 36.11", derivedFromSourceSubject: true },
            { subject: "an...t", result: "anmumikka", possessorPrefix: "anmu", grammarSource: "Andrews 36.11", derivedFromSourceSubject: true },
            { subject: "Ø...t", result: "inmikka", possessorPrefix: "in", grammarSource: "Andrews 36.11", derivedFromSourceSubject: true },
        ]
    );
    const directGeneralUseActiveActionWithoutMappableSourceSubject = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "an",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
        actionNounStemUse: "general-use",
    });
    s.eq(
        "Andrews 36.11 active-action general-use remains possessive-state only when no source-subject possessor is mappable",
        directGeneralUseActiveActionWithoutMappableSourceSubject.error,
        true
    );
    const transitiveMakaMeta = ctx.parseVerbInput("-(maka)");
    const blockedTransitiveGeneralUseActiveAction = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "-(maka)",
        verbMeta: transitiveMakaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "ta",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
    });
    s.eq(
        "Andrews 36.11 active-action general-use rejects non-reflexive transitive sources",
        blockedTransitiveGeneralUseActiveAction.error,
        true
    );
    s.eq("blocked active-action direct route exposes the LCM contract", {
        ok: blockedTransitiveGeneralUseActiveAction.ok,
        surface: blockedTransitiveGeneralUseActiveAction.surface,
        framesIsGrammarFrame: blockedTransitiveGeneralUseActiveAction.frames === blockedTransitiveGeneralUseActiveAction.grammarFrame,
        routeFamily: blockedTransitiveGeneralUseActiveAction.frames.routeContract.routeFamily,
        routeStage: blockedTransitiveGeneralUseActiveAction.frames.routeContract.routeStage,
        generationAllowed: blockedTransitiveGeneralUseActiveAction.frames.routeContract.generationAllowed,
        diagnosticId: blockedTransitiveGeneralUseActiveAction.diagnostics[0].id,
        diagnosticFailedLayer: blockedTransitiveGeneralUseActiveAction.diagnostics[0].failedLayer,
        diagnosticContractLayer: blockedTransitiveGeneralUseActiveAction.diagnostics[0].contractLayer,
    }, {
        ok: false,
        surface: "",
        framesIsGrammarFrame: true,
        routeFamily: "verb-derived-nominal",
        routeStage: "blocked",
        generationAllowed: false,
        diagnosticId: "calificativo-instrumentivo-transitive-source-blocked",
        diagnosticFailedLayer: "route",
        diagnosticContractLayer: "routeContract",
    });
    const reflexiveCuepaMeta = ctx.parseVerbInput("-(cuepa)");
    const sparseReflexiveGeneralUseActiveAction = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "-(cuepa)",
        verbMeta: reflexiveCuepaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "mu",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
        entradaGrammarObject: sparseInstrumentivoReflexiveEntrada,
    });
    const reflexiveGeneralUseActiveAction = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "-(cuepa)",
        verbMeta: reflexiveCuepaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "mu",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
        entradaGrammarObject: fixedInstrumentivoReflexiveEntrada,
    });
    s.eq(
        "calificativo-instrumentivo active-action reflexive source reclassification is gated until entrada valence frame is fixed",
        {
            sparseStatus: sparseReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.status || "",
            sparseOperation: sparseReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.operation || "",
            sparseMutationKind: sparseReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.mutationKind || "",
            sparseSourceObj1: sparseReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.sourceVector?.obj1 || "",
            sparseTargetObj1: sparseReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.targetVector?.obj1 || "",
            sparseRouteRankingAllowed: sparseReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.routeRankingAllowed,
            fixedError: reflexiveGeneralUseActiveAction.error === true,
            fixedResult: reflexiveGeneralUseActiveAction.result || "",
            fixedResultCarriesShuntlinePrefix: /(^|u)necuepka$/.test(reflexiveGeneralUseActiveAction.result || ""),
        },
        {
            sparseStatus: "blocked",
            sparseOperation: "calificativo-instrumentivo-active-action-reflexive-source-object-reclassification",
            sparseMutationKind: "reclassify-object-slot",
            sparseSourceObj1: "mu",
            sparseTargetObj1: "ne",
            sparseRouteRankingAllowed: false,
            fixedError: false,
            fixedResult: "nunecuepka",
            fixedResultCarriesShuntlinePrefix: true,
        }
    );

    const generatedCalificativo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "(miki)",
    }));
    s.eq("generateWord calificativo-instrumentivo matches direct helper text", generatedCalificativo.result, directCalificativo.result);
    s.eq("generateWord calificativo-instrumentivo exposes surface form", generatedCalificativo.surfaceForms, ["mikkayut"]);
    s.eq("generateWord calificativo-instrumentivo profile keeps source tense", generatedCalificativo.nominalizationProfile.source.sourceTense, "pasado-remoto");
    const generatedPossessedCalificativo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "(miki)",
        possessivePrefix: "nu",
    }));
    s.eq(
        "generateWord possessed calificativo-instrumentivo keeps Nawat yu matrix",
        generatedPossessedCalificativo.surfaceForms,
        ["numikkayu"]
    );
    const generatedGeneralUseActiveAction = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "(miki)",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
    }));
    s.eq(
        "generateWord explicit possessive active-action general-use stem keeps ka without restricted yu",
        {
            forms: generatedGeneralUseActiveAction.surfaceForms,
            role: summarizeNominalizationProfile(generatedGeneralUseActiveAction.nominalizationProfile).role,
        },
        {
            forms: ["numikka"],
            role: {
                nominalizationKind: "active-action-nominal",
                semanticRole: "agent/action",
                patientiveFamily: "",
                adjectivalFunction: "",
            },
        }
    );
    const generatedSourceSubjectGeneralUseActiveAction = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "(miki)",
        subjectPrefix: "ti",
        subjectSuffix: "t",
        actionNounStemUse: "general-use",
    }));
    s.eq(
        "generateWord active-action general-use derives possessor from source subject before output",
        {
            forms: generatedSourceSubjectGeneralUseActiveAction.surfaceForms,
            predicateState: generatedSourceSubjectGeneralUseActiveAction.nominalizationProfile?.predicateState?.value || "",
            possessorPrefix: generatedSourceSubjectGeneralUseActiveAction.nominalizationProfile?.predicateState?.possessorPrefix || "",
            formulaEcho: generatedSourceSubjectGeneralUseActiveAction.nuclearClauseShell?.formulaEcho || "",
        },
        {
            forms: ["tumikka"],
            predicateState: "possessive",
            possessorPrefix: "tu",
            formulaEcho: "#Ø-Ø(mikka)Ø#",
        }
    );
    s.eq(
        "Andrews 36.12 active-action records source subject as transformed possessor, not an external import",
        summarizePossessorSourceFrame(generatedSourceSubjectGeneralUseActiveAction.nominalizationProfile?.possessorSourceFrame),
        {
            grammarSource: "Andrews 36.11/36.12",
            possessorOrigin: "source-vnc-subject",
            sourceSubjectRelation: "transformed-to-possessor",
            contrastNominalKind: "agentivo-preterito",
            notSourceSubjectTransform: false,
            notExternalPossessorImport: true,
            sourceSubject: { prefix: "ti", suffix: "t" },
        }
    );
    const blockedGeneratedTransitiveGeneralUseActiveAction = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "-(maka)",
        objectPrefix: "ta",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
    }));
    s.eq(
        "generateWord explicit active-action general-use rejects non-reflexive transitive sources",
        blockedGeneratedTransitiveGeneralUseActiveAction.error,
        true
    );
    const blockedGeneratedReflexiveGeneralUseActiveAction = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "-(cuepa)",
        objectPrefix: "mu",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
    }));
    s.eq(
        "generateWord explicit active-action reflexive general-use blocks shuntline reclassification without fixed entrada valence frame",
        {
            error: blockedGeneratedReflexiveGeneralUseActiveAction.error === true,
            gateStatus: blockedGeneratedReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.status || "",
            operation: blockedGeneratedReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.operation || "",
            routeRankingAllowed: blockedGeneratedReflexiveGeneralUseActiveAction.valencyObjectSlotGate?.routeRankingAllowed,
        },
        {
            error: true,
            gateStatus: "blocked",
            operation: "calificativo-instrumentivo-active-action-reflexive-source-object-reclassification",
            routeRankingAllowed: false,
        }
    );
    const generatedReflexiveGeneralUseActiveAction = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "-(cuepa)",
        objectPrefix: "mu",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
        entradaGrammarObject: fixedInstrumentivoReflexiveEntrada,
    }));
    s.eq(
        "generateWord explicit active-action reflexive general-use maps mu to shuntline ne",
        generatedReflexiveGeneralUseActiveAction.surfaceForms,
        ["nunecuepka"]
    );
    const istayaMeta = ctx.parseVerbInput("(istaya)");
    const rootPlusYaCharacteristic = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(istaya)",
        verbMeta: istayaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
    });
    s.eq(
        "Andrews 36.11 root-plus-ya active-action restricted stem uses the obsolete root plus ka",
        rootPlusYaCharacteristic.result,
        "istakayut"
    );
    const rootPlusYaPossessedCharacteristic = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(istaya)",
        verbMeta: istayaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "nu",
    });
    s.eq(
        "Andrews 36.11 root-plus-ya active-action possessed restricted stem keeps obsolete root plus ka before yu",
        rootPlusYaPossessedCharacteristic.result,
        "nuistakayu"
    );
    const rootPlusYaGeneralUse = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(istaya)",
        verbMeta: istayaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
    });
    s.eq(
        "Andrews 36.11 root-plus-ya active-action general-use stem suppresses regular ya variants",
        rootPlusYaGeneralUse.result,
        "nuistaka"
    );
    const generatedRootPlusYaGeneralUse = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "calificativo-instrumentivo",
        verb: "(istaya)",
        possessivePrefix: "nu",
        actionNounStemUse: "general-use",
    }));
    s.eq(
        "generateWord root-plus-ya active-action general-use emits only the obsolete root plus ka form",
        generatedRootPlusYaGeneralUse.surfaceForms,
        ["nuistaka"]
    );

    const directLocativo = ctx.getLocativoTemporalResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        objectPrefix: "",
        possessivePrefix: "",
        combinedMode: ctx.COMBINED_MODE.active,
    });
    s.eq("direct locativo-temporal keeps trailing n", directLocativo.result, "nemiyan");
    s.eq("direct locativo-temporal records source tense", directLocativo.entries[0].sourceTense, "imperfecto");
    s.eq("direct locativo-temporal exposes place/time profile", summarizeNominalizationProfile(directLocativo.nominalizationProfile).role, {
        nominalizationKind: "locative-temporal",
        semanticRole: "place/time",
        patientiveFamily: "",
        adjectivalFunction: "",
    });
    const locativoTemporalObjectEntradaParsed = ctx.parseMovingTargetRegexInput("(a)+(ish-mati)");
    const sparseLocativoTemporalObjectEntrada = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+(ish-mati)",
        locativoTemporalObjectEntradaParsed
    );
    const fixedLocativoTemporalObjectEntrada = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+(ish-mati)",
        locativoTemporalObjectEntradaParsed,
        null,
        {
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "mati" },
                obj1: { slot: "obj1", token: "ki" },
            },
            sourceFormulaEcho: "#Ø-ki(mati)Ø#",
        }
    );
    const locativoTemporalMatiMeta = ctx.parseVerbInput("-(mati)");
    const sparseNonactiveLocativoTemporal = ctx.getLocativoTemporalResult({
        rawVerb: "-(mati)",
        verbMeta: locativoTemporalMatiMeta,
        objectPrefix: "ki",
        possessivePrefix: "",
        combinedMode: ctx.COMBINED_MODE.nonactive,
        entradaGrammarObject: sparseLocativoTemporalObjectEntrada,
    });
    const fixedNonactiveLocativoTemporal = ctx.getLocativoTemporalResult({
        rawVerb: "-(mati)",
        verbMeta: locativoTemporalMatiMeta,
        objectPrefix: "ki",
        possessivePrefix: "",
        combinedMode: ctx.COMBINED_MODE.nonactive,
        entradaGrammarObject: fixedLocativoTemporalObjectEntrada,
    });
    s.eq(
        "locativo-temporal nonactive source object adjustment is gated until entrada valence frame is fixed",
        {
            sparseStatus: sparseNonactiveLocativoTemporal.valencyObjectSlotGate?.status || "",
            sparseOperation: sparseNonactiveLocativoTemporal.valencyObjectSlotGate?.operation || "",
            sparseMutationKind: sparseNonactiveLocativoTemporal.valencyObjectSlotGate?.mutationKind || "",
            sparseSourceObj1: sparseNonactiveLocativoTemporal.valencyObjectSlotGate?.sourceVector?.obj1 || "",
            sparseTargetObj1: sparseNonactiveLocativoTemporal.valencyObjectSlotGate?.targetVector?.obj1 || "",
            sparseRouteRankingAllowed: sparseNonactiveLocativoTemporal.valencyObjectSlotGate?.routeRankingAllowed,
            fixedError: fixedNonactiveLocativoTemporal.error === true,
            fixedResult: fixedNonactiveLocativoTemporal.result || "",
            fixedRuntimePrefixes: fixedNonactiveLocativoTemporal.entries?.map((entry) => entry.runtimeObjectPrefix || "") || [],
        },
        {
            sparseStatus: "blocked",
            sparseOperation: "locativo-temporal-nonactive-source-object-adjustment",
            sparseMutationKind: "delete-object-slot",
            sparseSourceObj1: "ki",
            sparseTargetObj1: "",
            sparseRouteRankingAllowed: false,
            fixedError: false,
            fixedResult: "machuyan / matuyan / matiluyan",
            fixedRuntimePrefixes: ["", "", ""],
        }
    );

    const generatedLocativo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "locativo-temporal",
        verb: "(nemi)",
    }));
    s.eq("generateWord locativo-temporal matches direct helper text", generatedLocativo.result, directLocativo.result);
    s.eq("generateWord locativo-temporal exposes surface form", generatedLocativo.surfaceForms, ["nemiyan"]);
    s.eq("generateWord locativo-temporal profile keeps source tense", generatedLocativo.nominalizationProfile.source.sourceTense, "imperfecto");
    s.eq(
        "generated locativo-temporal carries relational boundary frame without treating it as evidence",
        {
            kind: generatedLocativo.relationalNncBoundaryFrame?.kind,
            lessonRange: generatedLocativo.relationalNncBoundaryFrame?.lessonRange,
            statusLabel: generatedLocativo.relationalNncBoundaryFrame?.statusLabel,
            candidateKind: generatedLocativo.relationalNncBoundaryFrame?.candidate?.nominalKind,
            sourceVnc: generatedLocativo.relationalNncBoundaryFrame?.candidate?.sourceVnc,
            relationalKind: generatedLocativo.relationalNncBoundaryFrame?.classification?.relationalKind,
            falsePositiveSource: generatedLocativo.relationalNncBoundaryFrame?.classification?.falsePositiveSource,
            locativeTemporalNominalIsEvidence: generatedLocativo.relationalNncBoundaryFrame?.boundaries?.locativeTemporalNominalIsEvidence,
            forms: generatedLocativo.surfaceForms,
        },
        {
            kind: "relational-nnc-boundary-frame",
            lessonRange: "45-47",
            statusLabel: "no confirmado",
            candidateKind: "locativo-temporal",
            sourceVnc: "nemi",
            relationalKind: "locative",
            falsePositiveSource: "locative-temporal-nominal",
            locativeTemporalNominalIsEvidence: false,
            forms: ["nemiyan"],
        }
    );
    s.eq(
        "generated locativo-temporal carries place/gentilic boundary frame without treating it as evidence",
        {
            kind: generatedLocativo.placeGentilicNncBoundaryFrame?.kind,
            lesson: generatedLocativo.placeGentilicNncBoundaryFrame?.lesson,
            statusLabel: generatedLocativo.placeGentilicNncBoundaryFrame?.statusLabel,
            candidateKind: generatedLocativo.placeGentilicNncBoundaryFrame?.candidate?.nominalKind,
            sourceVnc: generatedLocativo.placeGentilicNncBoundaryFrame?.candidate?.sourceVnc,
            placeGentilicKind: generatedLocativo.placeGentilicNncBoundaryFrame?.classification?.placeGentilicKind,
            falsePositiveSource: generatedLocativo.placeGentilicNncBoundaryFrame?.classification?.falsePositiveSource,
            locativeTemporalNominalIsEvidence: generatedLocativo.placeGentilicNncBoundaryFrame?.boundaries?.locativeTemporalNominalIsEvidence,
            forms: generatedLocativo.surfaceForms,
        },
        {
            kind: "place-gentilic-nnc-boundary-frame",
            lesson: 48,
            statusLabel: "no confirmado",
            candidateKind: "locativo-temporal",
            sourceVnc: "nemi",
            placeGentilicKind: "place-name",
            falsePositiveSource: "locative-temporal-nominal",
            locativeTemporalNominalIsEvidence: false,
            forms: ["nemiyan"],
        }
    );
    s.eq(
        "generated locativo-temporal carries adverbial adjunction boundary frame without treating it as clause evidence",
        {
            kind: generatedLocativo.adverbialAdjunctionBoundaryFrame?.kind,
            lessonRange: generatedLocativo.adverbialAdjunctionBoundaryFrame?.lessonRange,
            statusLabel: generatedLocativo.adverbialAdjunctionBoundaryFrame?.statusLabel,
            candidateLabel: generatedLocativo.adverbialAdjunctionBoundaryFrame?.candidate?.label,
            semanticRelation: generatedLocativo.adverbialAdjunctionBoundaryFrame?.classification?.semanticRelation,
            adjoinedUnitType: generatedLocativo.adverbialAdjunctionBoundaryFrame?.classification?.adjoinedUnitType,
            falsePositiveSource: generatedLocativo.adverbialAdjunctionBoundaryFrame?.classification?.falsePositiveSource,
            singleGeneratedWordIsEvidence: generatedLocativo.adverbialAdjunctionBoundaryFrame?.boundaries?.singleGeneratedWordIsEvidence,
            forms: generatedLocativo.surfaceForms,
        },
        {
            kind: "adverbial-adjunction-boundary-frame",
            lessonRange: "49-50",
            statusLabel: "no confirmada",
            candidateLabel: "locativo-temporal generado",
            semanticRelation: "place",
            adjoinedUnitType: "nnc",
            falsePositiveSource: "single-generated-word",
            singleGeneratedWordIsEvidence: false,
            forms: ["nemiyan"],
        }
    );

    const piyaMeta = ctx.parseVerbInput("-(piya)");
    const directPossessedInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(piya)",
        verbMeta: piyaMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "ta",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "i",
    });
    const generatedPossessedInstrumentivo = ctx.executeGenerateWordRequest(buildSilentNounRequest({
        tense: "instrumentivo",
        verb: "-(piya)",
        objectPrefix: "ta",
        possessivePrefix: "i",
    }));
    s.eq("generateWord possessed instrumentivo matches direct helper text", generatedPossessedInstrumentivo.result, directPossessedInstrumentivo.result);
    s.eq("generateWord possessed instrumentivo exposes surface form", generatedPossessedInstrumentivo.surfaceForms, ["itapiyaya"]);
    s.eq("generateWord possessed instrumentivo keeps imperfect ya inside the predicate stem", {
        connector: generatedPossessedInstrumentivo.num1Num2?.displaySurface || "",
        formulaEcho: generatedPossessedInstrumentivo.nuclearClauseShell?.formulaEcho || "",
    }, {
        connector: "Ø",
        formulaEcho: "#Ø-Ø(tapiyaya)Ø#",
    });
    s.eq("generateWord possessed instrumentivo profile marks possessive predicate state", summarizeNominalizationProfile(generatedPossessedInstrumentivo.nominalizationProfile).predicateState, {
        value: "possessive",
        hasPossessor: true,
        possessorPrefix: "i",
    });
    s.eq("generateWord possessed instrumentivo profile uses imperfect source", generatedPossessedInstrumentivo.nominalizationProfile.source.sourceTense, "imperfecto");
    const directSourceSubjectInstrumentivePossessors = [
        { subjectPrefix: "ni", subjectSuffix: "", form: "nutapiyaya", possessor: "nu" },
        { subjectPrefix: "ti", subjectSuffix: "", form: "mutapiyaya", possessor: "mu" },
        { subjectPrefix: "", subjectSuffix: "", form: "itapiyaya", possessor: "i" },
        { subjectPrefix: "ti", subjectSuffix: "t", form: "tutapiyaya", possessor: "tu" },
        { subjectPrefix: "an", subjectSuffix: "t", form: "anmutapiyaya", possessor: "anmu" },
        { subjectPrefix: "", subjectSuffix: "t", form: "intapiyaya", possessor: "in" },
    ].map((example) => {
        const result = ctx.getInstrumentivoResult({
            rawVerb: "-(piya)",
            verbMeta: piyaMeta,
            subjectPrefix: example.subjectPrefix,
            subjectSuffix: example.subjectSuffix,
            objectPrefix: "ta",
            mode: ctx.INSTRUMENTIVO_MODE.posesivo,
            possessivePrefix: "",
        });
        return {
            subject: `${example.subjectPrefix || "Ø"}...${example.subjectSuffix || "Ø"}`,
            result: result.result,
            possessorPrefix: result.nominalizationProfile?.predicateState?.possessorPrefix || "",
            derivedFromSourceSubject: result.instrumentivoSourceSubjectPossessor?.derivedFromSourceSubject === true,
        };
    });
    s.eq(
        "Andrews 36.6 direct possessive instrumentive derives possessor from the source VNC subject",
        directSourceSubjectInstrumentivePossessors,
        [
            { subject: "ni...Ø", result: "nutapiyaya", possessorPrefix: "nu", derivedFromSourceSubject: true },
            { subject: "ti...Ø", result: "mutapiyaya", possessorPrefix: "mu", derivedFromSourceSubject: true },
            { subject: "Ø...Ø", result: "itapiyaya", possessorPrefix: "i", derivedFromSourceSubject: true },
            { subject: "ti...t", result: "tutapiyaya", possessorPrefix: "tu", derivedFromSourceSubject: true },
            { subject: "an...t", result: "anmutapiyaya", possessorPrefix: "anmu", derivedFromSourceSubject: true },
            { subject: "Ø...t", result: "intapiyaya", possessorPrefix: "in", derivedFromSourceSubject: true },
        ]
    );

    const unsupportedCalificativo = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "ni",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
    });
    s.eq("direct calificativo-instrumentivo rejects animate subject", unsupportedCalificativo.error, true);

    const generateVerbFirstPresent = (verb) => ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: verb,
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "presente",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "ordinary NNC fixture input remains verb-first without opt-in",
        ["kal", "shuchit", "mistun", "xilun"].map((stem) => {
            const result = generateVerbFirstPresent(stem);
            return {
                error: result.error === true,
                result: result.result || "",
                surfaceForms: result.surfaceForms || [],
                generationRoute: result.generationRoute || "",
            };
        }),
        [
            { error: true, result: "—", surfaceForms: [], generationRoute: "" },
            { error: true, result: "—", surfaceForms: [], generationRoute: "" },
            { error: true, result: "—", surfaceForms: [], generationRoute: "" },
            { error: true, result: "—", surfaceForms: [], generationRoute: "" },
        ]
    );
    [
        {
            label: "ordinary NNC opt-in generation returns kal absolutive",
            request: buildSilentOrdinaryNncRequest({ stem: "kal" }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "kal",
                surfaceForms: ["kal"],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns kal possessive nu",
            request: buildSilentOrdinaryNncRequest({
                stem: "kal",
                state: "possessive",
                possessor: "nu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "nukal",
                surfaceForms: ["nukal"],
                stem: "kal",
                state: "possessive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "nu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns mistun possessive nu",
            request: buildSilentOrdinaryNncRequest({
                stem: "mistun",
                state: "possessive",
                possessor: "nu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "numistun",
                surfaceForms: ["numistun"],
                stem: "mistun",
                state: "possessive",
                nounClass: "zero",
                animacy: "animate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "nu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns mistun possessive mu",
            request: buildSilentOrdinaryNncRequest({
                stem: "mistun",
                state: "possessive",
                possessor: "mu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "mumistun",
                surfaceForms: ["mumistun"],
                stem: "mistun",
                state: "possessive",
                nounClass: "zero",
                animacy: "animate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "mu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation returns kal distributive plural",
            request: buildSilentOrdinaryNncRequest({
                stem: "kal",
                number: "plural",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "kajkal",
                surfaceForms: ["kajkal"],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "plural",
                pluralType: "distributive",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation accepts fixture-free absolutive stems",
            request: buildSilentOrdinaryNncRequest({ stem: "xilun" }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "xilun",
                surfaceForms: ["xilun"],
                stem: "xilun",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation prefixes fixture-free possessive stems",
            request: buildSilentOrdinaryNncRequest({
                stem: "xilun",
                state: "possessive",
                possessor: "nu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "nuxilun",
                surfaceForms: ["nuxilun"],
                stem: "xilun",
                state: "possessive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "nu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation applies possessive nh before vowel cores",
            request: buildSilentOrdinaryNncRequest({
                stem: "awat",
                state: "possessive",
                possessor: "in",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "inhawat",
                surfaceForms: ["inhawat"],
                stem: "awat",
                state: "possessive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "in",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC opt-in generation rejects nonanimate plural subject agreement",
            request: buildSilentOrdinaryNncRequest({
                stem: "kal",
                number: "plural",
                subjectSuffix: "t",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: false,
                result: "",
                surfaceForms: [],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "plural",
                pluralType: "distributive",
                subjectKey: "3pl",
                possessorPrefix: null,
                diagnostics: [{
                    id: "ordinary-nnc-unsupported-subject",
                    severity: "unsupported",
                    message: "Nominal nuclear clause fixture \"kal\" is nonanimate and only supports 3rd singular subject agreement.",
                }],
                isReflexive: false,
                stemProvenance: null,
            },
        },
    ].forEach(({ label, request, expected }) => {
        s.eq(label, summarizeGeneratedOrdinaryNnc(ctx.executeGenerateWordRequest(request)), expected);
    });
    const generatedKalShell = ctx.executeGenerateWordRequest(
        buildSilentOrdinaryNncRequest({ stem: "kal" })
    ).nuclearClauseShell;
    s.eq(
        "ordinary NNC opt-in generation exposes diagnostic NNC clause shell",
        {
            kind: generatedKalShell?.kind,
            clauseKind: generatedKalShell?.clauseKind,
            formulaType: generatedKalShell?.formulaType,
            formulaAbbreviation: generatedKalShell?.formulaAbbreviation,
            formulaLabel: generatedKalShell?.formulaLabel,
            displayLabel: generatedKalShell?.displayLabel,
            formula: generatedKalShell?.formula,
            formulaEcho: generatedKalShell?.formulaEcho,
            hasTensePosition: generatedKalShell?.hasTensePosition,
            generationAllowed: generatedKalShell?.generationAllowed,
            predicateStem: generatedKalShell?.slots?.predicateStem?.stem,
            connector: generatedKalShell?.slots?.num1Num2?.displayConnector,
        },
        {
            kind: "nuclear-clause-shell",
            clauseKind: "nominal-nuclear-clause",
            formulaType: "NNC",
            formulaAbbreviation: "CNN",
            formulaLabel: "Fórmula CNN",
            displayLabel: "cláusula nuclear nominal (CNN)",
            formula: "#pers1-pers2(STEM)num1-num2#",
            formulaEcho: "#Ø-Ø(kal)Ø#",
            hasTensePosition: false,
            generationAllowed: false,
            predicateStem: "kal",
            connector: "Ø",
        }
    );
    const buildOrdinaryNncGenerateWordRequest = typeof ctx.buildOrdinaryNncGenerateWordRequest === "function"
        ? (options) => ctx.buildOrdinaryNncGenerateWordRequest(options)
        : () => ({});
    [
        {
            label: "ordinary NNC UI request path returns kal absolutive",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "kal",
                state: "absolutive",
                number: "singular",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "kal",
                surfaceForms: ["kal"],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path returns kal possessive nu",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "kal",
                state: "possessive",
                number: "singular",
                possessor: "nu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "nukal",
                surfaceForms: ["nukal"],
                stem: "kal",
                state: "possessive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "nu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path returns mistun possessive mu",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "mistun",
                state: "possessive",
                number: "singular",
                possessor: "mu",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "mumistun",
                surfaceForms: ["mumistun"],
                stem: "mistun",
                state: "possessive",
                nounClass: "zero",
                animacy: "animate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "mu",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path returns kal distributive plural",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "kal",
                state: "absolutive",
                number: "plural",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "kajkal",
                surfaceForms: ["kajkal"],
                stem: "kal",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "plural",
                pluralType: "distributive",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path accepts fixture-free inanimate stems",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "xilun",
                state: "absolutive",
                number: "plural",
                animacy: "inanimate",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "xijxilun",
                surfaceForms: ["xijxilun"],
                stem: "xilun",
                state: "absolutive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "plural",
                pluralType: "distributive",
                subjectKey: "3sg",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path accepts fixture-free animate stems",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "xilun",
                state: "absolutive",
                number: "plural",
                animacy: "animate",
                subjectKey: "1pl",
                subjectPrefix: "ti",
                subjectSuffix: "t",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "tixilunmet",
                surfaceForms: ["tixilunmet"],
                stem: "xilun",
                state: "absolutive",
                nounClass: "zero",
                animacy: "animate",
                number: "plural",
                pluralType: "count",
                subjectKey: "1pl",
                possessorPrefix: null,
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
        {
            label: "ordinary NNC UI request path applies subject and possessive surface rules",
            request: buildOrdinaryNncGenerateWordRequest({
                explicit: true,
                stem: "awat",
                state: "possessive",
                number: "singular",
                possessor: "in",
            }),
            expected: {
                generationRoute: "ordinary-nnc",
                supported: true,
                result: "inhawat",
                surfaceForms: ["inhawat"],
                stem: "awat",
                state: "possessive",
                nounClass: "zero",
                animacy: "inanimate",
                number: "singular",
                subjectKey: "3sg",
                possessorPrefix: "in",
                diagnostics: [],
                isReflexive: false,
                stemProvenance: null,
            },
        },
    ].forEach(({ label, request, expected }) => {
        s.eq(label, summarizeGeneratedOrdinaryNnc(ctx.executeGenerateWordRequest(request)), expected);
    });

    s.eq("ordinary NNC direct helper is exported", typeof ctx.generateOrdinaryNncParadigm, "function");
    s.eq("ordinary NNC formula echo helper is exported", typeof ctx.buildOrdinaryNncFormulaEchoFromSlots, "function");
    s.eq("ordinary NNC clause helper aliases are exported", [
        typeof ctx.generateOrdinaryNncClause,
        typeof ctx.generateOrdinaryNncClauseSet,
    ], ["function", "function"]);
    const kalAbsolutive = ctx.generateOrdinaryNncParadigm({
        stem: "kal",
        state: "absolutive",
        subject: { subjectPrefix: "", subjectSuffix: "" },
        number: "singular",
    });
    s.eq("ordinary NNC clause alias matches direct helper", ctx.generateOrdinaryNncClause({
        stem: "kal",
        state: "absolutive",
        number: "singular",
    }).result, "kal");
    s.eq("ordinary NNC direct helper marks nominal nuclear clause output", kalAbsolutive.clauseKind, "nominal-nuclear-clause");
    s.eq("ordinary NNC direct helper exposes output kind", kalAbsolutive.outputKind, "nominal-nuclear-clause");
    s.eq("ordinary NNC direct helper exposes clause frame", kalAbsolutive.clauseFrame, {
        kind: "nominal-nuclear-clause",
        formula: "#pers1-pers2(STEM)num1-num2#",
        formulaSlots: {
            pers1Pers2: {
                role: "subject-person",
                slot: "pers1-pers2",
                prefix: "",
                suffix: "",
                displayPrefix: "Ø",
                displaySuffix: "Ø",
                label: "3sg",
            },
            predicateStem: {
                role: "predicate",
                slot: "STEM",
                stem: "kal",
                state: "absolutive",
            },
            num1Num2: {
                role: "subject-number-connector",
                slot: "num1-num2",
                nounClass: "zero",
                connector: "Ø",
                surface: "",
                label: "subject number connector",
                belongsTo: "subject",
                referenceNumber: "singular",
                pluralType: "",
            },
        },
        formulaEcho: "#Ø-Ø(kal)Ø#",
        predicateFormula: "(kal)",
        hasTensePosition: false,
        tense: null,
        subject: {
            subjectPrefix: "",
            subjectSuffix: "",
            person: 3,
            number: "singular",
            personSubKey: "3sg",
            numberConnector: {
                role: "subject-number-connector",
                slot: "subject.num1-num2",
                belongsTo: "subject",
                nounStemClass: "zero",
                classLabel: "Ø",
                surface: "",
                displaySurface: "Ø",
                predicateState: "absolutive",
                referenceNumber: "singular",
                pluralType: "",
                notNounSuffix: true,
                notStatePosition: true,
            },
        },
        predicate: {
            state: "absolutive",
            stateSlot: {
                role: "predicate-state",
                slot: "predicate.state",
                state: "absolutive",
                statePosition: "vacant",
                isVacant: true,
                hasPossessor: false,
                participantRole: "",
                possessor: null,
                notSubjectConnector: true,
                notTense: true,
            },
            formula: "(kal)",
            stem: "kal",
            nounClass: "zero",
            animacy: "inanimate",
        },
        stateSlot: {
            role: "predicate-state",
            slot: "predicate.state",
            state: "absolutive",
            statePosition: "vacant",
            isVacant: true,
            hasPossessor: false,
            participantRole: "",
            possessor: null,
            notSubjectConnector: true,
            notTense: true,
        },
        possessor: null,
        referenceNumber: "singular",
        surfaceStrategy: "plain",
    });
    s.eq(
        "ordinary NNC clause frame records visible class as subject-number connector metadata",
        ctx.generateOrdinaryNncParadigm({
            stem: "xilun",
            state: "absolutive",
            number: "singular",
            nounClass: "ti",
        }).clauseFrame.subject.numberConnector,
        {
            role: "subject-number-connector",
            slot: "subject.num1-num2",
            belongsTo: "subject",
            nounStemClass: "ti",
            classLabel: "ti",
            surface: "ti",
            displaySurface: "ti",
            predicateState: "absolutive",
            referenceNumber: "singular",
            pluralType: "",
            notNounSuffix: true,
            notStatePosition: true,
        }
    );
    s.eq(
        "ordinary NNC formulaSlots map the NNC formula slots before display echo",
        (() => {
            const zeroOpen = ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ni", subjectSuffix: "" },
                number: "singular",
            });
            const tOpen = ctx.generateOrdinaryNncParadigm({
                stem: "siwa",
                state: "absolutive",
                nounClass: "t",
                number: "singular",
            });
            return {
                zeroSlots: zeroOpen.nncBasic.formulaSlots,
                zeroEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(zeroOpen.nncBasic.formulaSlots),
                zeroClass: zeroOpen.nounClass,
                zeroSourceKind: zeroOpen.source.sourceKind,
                tSlots: tOpen.nncBasic.formulaSlots,
                tEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(tOpen.nncBasic.formulaSlots),
            };
        })(),
        {
            zeroSlots: {
                pers1Pers2: {
                    role: "subject-person",
                    slot: "pers1-pers2",
                    prefix: "ni",
                    suffix: "",
                    displayPrefix: "ni",
                    displaySuffix: "Ø",
                    label: "1sg",
                },
                predicateStem: {
                    role: "predicate",
                    slot: "STEM",
                    stem: "tapiyal",
                    state: "absolutive",
                },
                num1Num2: {
                    role: "subject-number-connector",
                    slot: "num1-num2",
                    nounClass: "zero",
                    connector: "Ø",
                    surface: "",
                    label: "subject number connector",
                    belongsTo: "subject",
                    referenceNumber: "singular",
                    pluralType: "",
                },
            },
            zeroEcho: "#ni-Ø(tapiyal)Ø#",
            zeroClass: "zero",
            zeroSourceKind: "open-stem",
            tSlots: {
                pers1Pers2: {
                    role: "subject-person",
                    slot: "pers1-pers2",
                    prefix: "",
                    suffix: "",
                    displayPrefix: "Ø",
                    displaySuffix: "Ø",
                    label: "3sg",
                },
                predicateStem: {
                    role: "predicate",
                    slot: "STEM",
                    stem: "siwa",
                    state: "absolutive",
                },
                num1Num2: {
                    role: "subject-number-connector",
                    slot: "num1-num2",
                    nounClass: "t",
                    connector: "t",
                    surface: "t",
                    label: "subject number connector",
                    belongsTo: "subject",
                    referenceNumber: "singular",
                    pluralType: "",
                },
            },
            tEcho: "#Ø-Ø(siwa)t#",
        }
    );
    s.eq(
        "ordinary NNC formula echo reads LCM result-frame slot surfaces before stale slot text",
        ctx.buildOrdinaryNncFormulaEchoFromSlots({
            pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
            predicateStem: {
                stem: "stale-predicate",
                surface: "stale-surface",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        surfaceForms: ["frame-predicate"],
                    }),
                }),
            },
            num1Num2: {
                connector: "stale-connector",
                surface: "stale-surface",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        surface: "frame-connector",
                    }),
                }),
            },
        }),
        "#Ø-Ø(frame-predicate)frame-connector#"
    );
    s.eq(
        "ordinary NNC formula echo stops before stale slot text after an empty result frame",
        {
            emptyPredicate: ctx.buildOrdinaryNncFormulaEchoFromSlots({
                pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                predicateStem: {
                    stem: "stale-predicate",
                    surface: "stale-surface",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            surface: "",
                            surfaceForms: [],
                        }),
                    }),
                },
                num1Num2: {
                    connector: "stale-connector",
                    surface: "stale-surface",
                },
            }),
            emptyConnector: ctx.buildOrdinaryNncFormulaEchoFromSlots({
                pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                predicateStem: { stem: "frame-safe-predicate" },
                num1Num2: {
                    connector: "stale-connector",
                    surface: "stale-surface",
                    frames: ctx.buildGrammarFrame({
                        resultFrame: ctx.buildGrammarResultFrame({
                            surface: "",
                            surfaceForms: [],
                        }),
                    }),
                },
            }),
        },
        {
            emptyPredicate: "",
            emptyConnector: "#Ø-Ø(frame-safe-predicate)Ø#",
        }
    );
    s.eq(
        "ordinary NNC fixture generates kal absolutive",
        summarizeOrdinaryNnc(kalAbsolutive),
        {
            supported: true,
            result: "kal",
            surfaceForms: ["kal"],
            stem: "kal",
            state: "absolutive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: null,
            diagnostics: [],
        }
    );
    const mistunPossessiveWithSubject = ctx.generateOrdinaryNncParadigm({
        stem: "mistun",
        state: "possessive",
        subject: { subjectPrefix: "ti", subjectSuffix: "" },
        possessor: "nu",
        number: "singular",
    });
    s.eq(
        "ordinary NNC fixture keeps animate possessor separate from subject",
        summarizeOrdinaryNnc(mistunPossessiveWithSubject),
        {
            supported: true,
            result: "tinumistun",
            surfaceForms: ["tinumistun"],
            stem: "mistun",
            state: "possessive",
            nounClass: "zero",
            animacy: "animate",
            number: "singular",
            subject: { subjectPrefix: "ti", subjectSuffix: "", person: 2, number: "singular", personSubKey: "2sg" },
            possessor: { id: "1s", prefix: "nu", personSubKey: "1sg", number: "singular" },
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC fixture covers configured kal singular possessive prefixes",
        ["nu", "mu", "i", "tu", "anmu", "in"].map((prefix) => (
            ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "possessive",
                possessor: prefix,
                number: "singular",
            }).result
        )),
        ["nukal", "mukal", "ikal", "tukal", "anmukal", "inkal"]
    );
    s.eq(
        "ordinary NNC nonanimate plural request derives distributive from third singular",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "kal",
            state: "absolutive",
            number: "pl",
        })),
        {
            supported: true,
            result: "kajkal",
            surfaceForms: ["kajkal"],
            stem: "kal",
            state: "absolutive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "plural",
            pluralType: "distributive",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: null,
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC possessive plural noun request is not plural possessor",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "kal",
            state: "possessive",
            possessor: "in",
            number: "plural",
        })),
        {
            supported: true,
            result: "inkajkal",
            surfaceForms: ["inkajkal"],
            stem: "kal",
            state: "possessive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "plural",
            pluralType: "distributive",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: { id: "3p", prefix: "in", personSubKey: "3pl", number: "plural" },
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC possessive plural derives nukajkal from nukal",
        ctx.generateOrdinaryNncParadigm({
            stem: "kal",
            state: "possessive",
            possessor: "nu",
            number: "plural",
        }).result,
        "nukajkal"
    );
    s.eq(
        "ordinary NNC fixture generates shuchi absolutive only from explicit data",
        ctx.generateOrdinaryNncParadigm({
            stem: "shuchi",
            state: "absolutive",
            number: "singular",
        }).surfaceForms,
        ["shuchit"]
    );
    s.eq(
        "ordinary NNC fixture formulates t-class connector outside the predicate stem",
        (() => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem: "shuchit",
                state: "absolutive",
                number: "singular",
            });
            return {
                result: result.result,
                stem: result.stem,
                predicateFormula: result.predicateFormula,
                connectorSurface: result.clauseFrame.subject.numberConnector.surface,
                connectorSlot: result.clauseFrame.subject.numberConnector.slot,
                predicateStem: result.clauseFrame.predicate.stem,
            };
        })(),
        {
            result: "shuchit",
            stem: "shuchi",
            predicateFormula: "(shuchi)t",
            connectorSurface: "t",
            connectorSlot: "subject.num1-num2",
            predicateStem: "shuchi",
        }
    );
    s.eq(
        "ordinary NNC fixture generates user-provided shuchi singular possessives",
        ["nu", "mu"].map((possessor) => (
            ctx.generateOrdinaryNncParadigm({
                stem: "shuchit",
                state: "possessive",
                possessor,
                number: "singular",
            }).result
        )),
        ["nushuchiw", "mushuchiw"]
    );
    s.eq(
        "ordinary NNC fixture generates user-provided mistun singular forms",
        [
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "absolutive",
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "possessive",
                possessor: "nu",
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "possessive",
                possessor: "mu",
                number: "singular",
            }).result,
        ],
        ["mistun", "numistun", "mumistun"]
    );
    s.eq(
        "ordinary NNC animate nouns allow subject persons and both plural types",
        [
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "absolutive",
                subject: { subjectPrefix: "ni", subjectSuffix: "" },
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "absolutive",
                subject: { subjectPrefix: "ti", subjectSuffix: "t" },
                number: "plural",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "absolutive",
                subject: { subjectPrefix: "ti", subjectSuffix: "t" },
                number: "plural",
                pluralType: "distributive",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "possessive",
                subject: { subjectPrefix: "ti", subjectSuffix: "t" },
                possessor: "nu",
                number: "plural",
            }).result,
        ],
        ["nimistun", "timistunmet", "timijmistunmet", "tinumistun"]
    );
    s.eq(
        "ordinary NNC dynamic open-stem generation returns tapiyal absolutive paradigm",
        [
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ni", subjectSuffix: "" },
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ti", subjectSuffix: "" },
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "", subjectSuffix: "" },
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ti", subjectSuffix: "t" },
                number: "plural",
                pluralType: "count",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "an", subjectSuffix: "t" },
                number: "plural",
                pluralType: "count",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "", subjectSuffix: "t" },
                number: "plural",
                pluralType: "count",
            }).result,
        ],
        ["nitapiyal", "titapiyal", "tapiyal", "titapiyalmet", "antapiyalmet", "tapiyalmet"]
    );
    s.eq(
        "ordinary NNC dynamic open-stem generation returns tapiyal distributive absolutive plural",
        [
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ti", subjectSuffix: "t" },
                number: "plural",
                pluralType: "distributive",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "an", subjectSuffix: "t" },
                number: "plural",
                pluralType: "distributive",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "tapiyal",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "", subjectSuffix: "t" },
                number: "plural",
                pluralType: "distributive",
            }).result,
        ],
        ["titajtapiyalmet", "antajtapiyalmet", "tajtapiyalmet"]
    );
    s.eq(
        "ordinary NNC dynamic open-stem generation returns tapiyal possessive common and distributive",
        {
            common: ["nu", "mu", "i", "tu", "anmu", "in"].map((possessor) => (
                ctx.generateOrdinaryNncParadigm({
                    stem: "tapiyal",
                    state: "possessive",
                    possessor,
                    number: "singular",
                    animacy: "animate",
                }).result
            )),
            distributive: ["nu", "mu", "i", "tu", "anmu", "in"].map((possessor) => (
                ctx.generateOrdinaryNncParadigm({
                    stem: "tapiyal",
                    state: "possessive",
                    possessor,
                    number: "plural",
                    pluralType: "distributive",
                    animacy: "animate",
                }).result
            )),
        },
        {
            common: ["nutapiyal", "mutapiyal", "itapiyal", "tutapiyalwan", "anmutapiyalwan", "intajtapiyalwan"],
            distributive: ["nutapiyal", "mutapiyal", "itapiyal", "tutajtapiyalwan", "anmutajtapiyalwan", "intajtapiyalwan"],
        }
    );
    s.eq(
        "ordinary NNC tapiyal generation is open-stem dynamic, not fixture-backed",
        (() => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem: "(tapiyal)",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ni", subjectSuffix: "" },
                number: "singular",
            });
            return {
                result: result.result,
                openStem: result.openStem,
                sourceKind: result.source?.sourceKind || "",
                fixtureId: result.source?.fixtureId || "",
            };
        })(),
        {
            result: "nitapiyal",
            openStem: true,
            sourceKind: "open-stem",
            fixtureId: "",
        }
    );
    s.eq(
        "ordinary NNC rejects count plural for nonanimate nouns",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "kal",
            state: "absolutive",
            number: "plural",
            pluralType: "count",
        })),
        {
            supported: false,
            result: "",
            surfaceForms: [],
            stem: "kal",
            state: "absolutive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "plural",
            pluralType: "count",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: null,
            diagnostics: [{
                id: "ordinary-nnc-unsupported-plural-type",
                severity: "unsupported",
                message: "Nominal nuclear clause fixture \"kal\" is nonanimate; plural count -met is only configured for animate nouns.",
            }],
        }
    );
    s.eq(
        "ordinary NNC lexical label fixtures generate explicit absolutives",
        ["tukayit", "machiyut", "majmachiyut"].map((stem) => (
            ctx.generateOrdinaryNncParadigm({
                stem,
                state: "absolutive",
                number: "singular",
            }).surfaceForms
        )),
        [["tukayit"], ["machiyut"], ["majmachiyut"]]
    );
    s.eq(
        "ordinary NNC lexical label fixtures expose evidence refs",
        [
            { stem: "a", refs: ["src/tests/parsing.test.js:95"] },
            { stem: "tukayit", refs: ["data/static_labels.json:4", "data/static_modes.json:14"] },
            { stem: "machiyut", refs: ["data/static_labels.json:29", "data/basic-data.csv:1623"] },
            { stem: "majmachiyut", refs: ["data/static_labels.json:25"] },
        ].map(({ stem }) => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem,
                state: "absolutive",
                number: "singular",
            });
            return {
                stem: result.stem,
                result: result.result,
                fixtureId: result.source && result.source.fixtureId,
                sourceRefs: result.source && result.source.sourceRefs,
            };
        }),
        [
            { stem: "a", result: "at", fixtureId: "a", sourceRefs: ["src/tests/parsing.test.js:95"] },
            { stem: "tukayit", result: "tukayit", fixtureId: "tukayit", sourceRefs: ["data/static_labels.json:4", "data/static_modes.json:14"] },
            { stem: "machiyut", result: "machiyut", fixtureId: "machiyut", sourceRefs: ["data/static_labels.json:29", "data/basic-data.csv:1623"] },
            { stem: "majmachiyut", result: "majmachiyut", fixtureId: "majmachiyut", sourceRefs: ["data/static_labels.json:25"] },
        ]
    );
    s.eq(
        "ordinary NNC lexical label fixture keeps unconfigured possessive unsupported",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "tukayit",
            state: "possessive",
            possessor: "nu",
            number: "singular",
        })),
        {
            supported: false,
            result: "",
            surfaceForms: [],
            stem: "tukayit",
            state: "possessive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: { id: "1s", prefix: "nu", personSubKey: "1sg", number: "singular" },
            diagnostics: [{
                id: "ordinary-nnc-unsupported-possessive-state",
                severity: "unsupported",
                message: "No nominal nuclear clause possessive forms are configured for stem \"tukayit\".",
            }],
        }
    );
    s.eq(
        "ordinary NNC fixture generates shuchi user-provided possessive state",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "shuchi",
            state: "possessive",
            possessor: "nu",
            number: "singular",
        })),
        {
            supported: true,
            result: "nushuchiw",
            surfaceForms: ["nushuchiw"],
            stem: "shuchi",
            state: "possessive",
            nounClass: "t",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: { id: "1s", prefix: "nu", personSubKey: "1sg", number: "singular" },
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC direct helper accepts fixture-free stems",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "xilun",
            state: "absolutive",
            number: "singular",
        })),
        {
            supported: true,
            result: "xilun",
            surfaceForms: ["xilun"],
            stem: "xilun",
            state: "absolutive",
            nounClass: "zero",
            animacy: "inanimate",
            number: "singular",
            subject: { subjectPrefix: "", subjectSuffix: "", person: 3, number: "singular", personSubKey: "3sg" },
            possessor: null,
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC fixture-free class formulas keep connectors outside the predicate stem",
        [
            { stem: "siwa", nounClass: "t" },
            { stem: "siwat", nounClass: "t" },
            { stem: "xilun", nounClass: "ti" },
            { stem: "xilunti", nounClass: "ti" },
            { stem: "tekpan", nounClass: "in" },
            { stem: "tekpanin", nounClass: "in" },
            { stem: "kal", nounClass: "zero" },
        ].map((request) => {
            const result = ctx.generateOrdinaryNncParadigm({
                ...request,
                state: "absolutive",
                number: "singular",
            });
            return {
                input: request.stem,
                nounClass: result.nounClass,
                stem: result.stem,
                result: result.result,
                predicateFormula: result.predicateFormula,
                connectorSurface: result.clauseFrame.subject.numberConnector.surface,
                connectorDisplay: result.clauseFrame.subject.numberConnector.displaySurface,
            };
        }),
        [
            {
                input: "siwa",
                nounClass: "t",
                stem: "siwa",
                result: "siwat",
                predicateFormula: "(siwa)t",
                connectorSurface: "t",
                connectorDisplay: "t",
            },
            {
                input: "siwat",
                nounClass: "t",
                stem: "siwa",
                result: "siwat",
                predicateFormula: "(siwa)t",
                connectorSurface: "t",
                connectorDisplay: "t",
            },
            {
                input: "xilun",
                nounClass: "ti",
                stem: "xilun",
                result: "xilunti",
                predicateFormula: "(xilun)ti",
                connectorSurface: "ti",
                connectorDisplay: "ti",
            },
            {
                input: "xilunti",
                nounClass: "ti",
                stem: "xilun",
                result: "xilunti",
                predicateFormula: "(xilun)ti",
                connectorSurface: "ti",
                connectorDisplay: "ti",
            },
            {
                input: "tekpan",
                nounClass: "in",
                stem: "tekpan",
                result: "tekpanin",
                predicateFormula: "(tekpan)in",
                connectorSurface: "in",
                connectorDisplay: "in",
            },
            {
                input: "tekpanin",
                nounClass: "in",
                stem: "tekpan",
                result: "tekpanin",
                predicateFormula: "(tekpan)in",
                connectorSurface: "in",
                connectorDisplay: "in",
            },
            {
                input: "kal",
                nounClass: "zero",
                stem: "kal",
                result: "kal",
                predicateFormula: "(kal)",
                connectorSurface: "",
                connectorDisplay: "Ø",
            },
        ]
    );
    s.eq(
        "ordinary NNC analogue input parses connector outside the predicate stem",
        ["(siwa)t", "(xilun)ti", "(tekpan)in", "(kal)"].map((stem) => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem,
                state: "absolutive",
                number: "singular",
            });
            return {
                input: stem,
                nounClass: result.nounClass,
                stem: result.stem,
                result: result.result,
                predicateFormula: result.predicateFormula,
            };
        }),
        [
            { input: "(siwa)t", nounClass: "t", stem: "siwa", result: "siwat", predicateFormula: "(siwa)t" },
            { input: "(xilun)ti", nounClass: "ti", stem: "xilun", result: "xilunti", predicateFormula: "(xilun)ti" },
            { input: "(tekpan)in", nounClass: "in", stem: "tekpan", result: "tekpanin", predicateFormula: "(tekpan)in" },
            { input: "(kal)", nounClass: "zero", stem: "kal", result: "kal", predicateFormula: "(kal)" },
        ]
    );
    s.eq(
        "ordinary NNC rejects class/stem shape mismatches",
        [
            { stem: "naka", nounClass: "ti" },
            { stem: "nakati", nounClass: "ti" },
            { stem: "(naka)ti" },
            { stem: "tekpan", nounClass: "t" },
            { stem: "siwa", nounClass: "in" },
        ].map((request) => {
            const result = ctx.generateOrdinaryNncParadigm({
                ...request,
                state: "absolutive",
                number: "singular",
            });
            return {
                input: request.stem,
                supported: result.supported,
                result: result.result,
                stem: result.stem,
                nounClass: result.nounClass,
                diagnostic: result.diagnostics[0]?.id,
                formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(result.nncBasic.formulaSlots),
            };
        }),
        [
            {
                input: "naka",
                supported: false,
                result: "",
                stem: "naka",
                nounClass: "ti",
                diagnostic: "ordinary-nnc-class-stem-incompatible",
                formulaEcho: "#Ø-Ø(naka)ti#",
            },
            {
                input: "nakati",
                supported: false,
                result: "",
                stem: "naka",
                nounClass: "ti",
                diagnostic: "ordinary-nnc-class-stem-incompatible",
                formulaEcho: "#Ø-Ø(naka)ti#",
            },
            {
                input: "(naka)ti",
                supported: false,
                result: "",
                stem: "naka",
                nounClass: "ti",
                diagnostic: "ordinary-nnc-class-stem-incompatible",
                formulaEcho: "#Ø-Ø(naka)ti#",
            },
            {
                input: "tekpan",
                supported: false,
                result: "",
                stem: "tekpan",
                nounClass: "t",
                diagnostic: "ordinary-nnc-class-stem-incompatible",
                formulaEcho: "#Ø-Ø(tekpan)t#",
            },
            {
                input: "siwa",
                supported: false,
                result: "",
                stem: "siwa",
                nounClass: "in",
                diagnostic: "ordinary-nnc-class-stem-incompatible",
                formulaEcho: "#Ø-Ø(siwa)in#",
            },
        ]
    );
    s.eq(
        "ordinary NNC direct helper marks fixture-free stems as open source",
        (() => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem: "xilun",
                state: "possessive",
                possessor: "nu",
                number: "singular",
            });
            return {
                result: result.result,
                openStem: result.openStem,
                source: result.source,
            };
        })(),
        {
            result: "nuxilun",
            openStem: true,
            source: { fixtureId: "", sourceRefs: [], sourceKind: "open-stem" },
        }
    );
    s.eq(
        "ordinary NNC direct helper supports explicit animate fixture-free stems",
        summarizeOrdinaryNnc(ctx.generateOrdinaryNncParadigm({
            stem: "xilun",
            state: "absolutive",
            animacy: "animate",
            subject: { subjectPrefix: "ti", subjectSuffix: "t" },
            number: "plural",
        })),
        {
            supported: true,
            result: "tixilunmet",
            surfaceForms: ["tixilunmet"],
            stem: "xilun",
            state: "absolutive",
            nounClass: "zero",
            animacy: "animate",
            number: "plural",
            pluralType: "count",
            subject: { subjectPrefix: "ti", subjectSuffix: "t", person: 1, number: "plural", personSubKey: "1pl" },
            possessor: null,
            diagnostics: [],
        }
    );
    s.eq(
        "ordinary NNC direct helper applies patientivo-style subject and possessive surface rules",
        [
            ctx.generateOrdinaryNncParadigm({
                stem: "awat",
                state: "possessive",
                possessor: "in",
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "ishkat",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ni", subjectSuffix: "" },
                number: "singular",
            }).result,
            ctx.generateOrdinaryNncParadigm({
                stem: "awat",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "an", subjectSuffix: "t" },
                number: "plural",
            }).result,
        ],
        ["inhawat", "nishkat", "anhawatmet"]
    );
    s.eq(
        "ordinary NNC onset changes expose Lesson 2 frames without changing surfaces",
        (() => {
            const possessive = ctx.generateOrdinaryNncParadigm({
                stem: "awat",
                state: "possessive",
                possessor: "in",
                number: "singular",
            });
            const subjectPlural = ctx.generateOrdinaryNncParadigm({
                stem: "awat",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "an", subjectSuffix: "t" },
                number: "plural",
                pluralType: "count",
            });
            const summarizeFrame = (result) => {
                const frame = (result.soundSpellingFrames || [])
                    .find((entry) => entry.ruleId === "n-open-transition-nh") || {};
                return {
                    result: result.result,
                    ruleId: frame.ruleId || "",
                    source: frame.sourceSurface || "",
                    target: frame.target || "",
                    grammarSlot: frame.grammarSlot || "",
                    segmentRole: frame.segmentRole || "",
                    sourceSegmentValue: frame.sourceSegmentValue || "",
                    targetSegmentValue: frame.targetSegmentValue || "",
                };
            };
            return [summarizeFrame(possessive), summarizeFrame(subjectPlural)];
        })(),
        [
            {
                result: "inhawat",
                ruleId: "n-open-transition-nh",
                source: "n",
                target: "nh",
                grammarSlot: "poseedor",
                segmentRole: "poseedor",
                sourceSegmentValue: "in",
                targetSegmentValue: "inh",
            },
            {
                result: "anhawatmet",
                ruleId: "n-open-transition-nh",
                source: "n",
                target: "nh",
                grammarSlot: "pers1",
                segmentRole: "pers1",
                sourceSegmentValue: "an",
                targetSegmentValue: "anh",
            },
        ]
    );
    s.eq(
        "Andrews 39.3.4 organic possession builds a real Nawat -yu possessive NNC",
        (() => {
            const direct = ctx.generateOrdinaryNncParadigm({
                stem: "naka",
                state: "possessive",
                possessor: "nu",
                possessionKind: "organic",
            });
            const generated = ctx.executeGenerateWordRequest(buildSilentOrdinaryNncRequest({
                stem: "naka",
                state: "possessive",
                possessor: "nu",
                possessionKind: "organic",
            }));
            return {
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    stem: direct.stem,
                    sourceStem: direct.sourceStem,
                    nounClass: direct.nounClass,
                    possessionKind: direct.possessionKind,
                    source: direct.source,
                    frame: direct.organicPossessionFrame,
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(direct.nncBasic.formulaSlots),
                },
                generated: {
                    result: generated.result,
                    surfaceForms: generated.surfaceForms,
                    generationRoute: generated.generationRoute,
                    frame: generated.organicPossessionFrame,
                },
            };
        })(),
        {
            direct: {
                supported: true,
                result: "nunakayu",
                stem: "nakayu",
                sourceStem: "naka",
                nounClass: "t",
                possessionKind: "organic",
                source: {
                    fixtureId: "",
                    sourceRefs: ["Andrews 39.3.4"],
                    sourceKind: "open-stem",
                    sourceStem: "naka",
                },
                frame: {
                    version: 1,
                    outputKind: "ordinary-nnc-organic-possession",
                    lessonRef: "Andrews 39.3.4",
                    stateCase: "organic-possession",
                    possessionKind: "organic",
                    sourceStem: "naka",
                    matrixStem: "yu",
                    classicalAnalogue: "(-yo)-tl",
                    nawatMatrix: "-yu",
                    predicateStem: "nakayu",
                    requiredState: "possessive",
                    possessorPrefix: "nu",
                    semanticRelation: "integral-part-to-whole",
                    spellingAuthority: "Nawat/Pipil orthography",
                    grammarAuthority: "Andrews PDF",
                },
                formulaEcho: "#Ø-Ø(nakayu)t#",
            },
            generated: {
                result: "nunakayu",
                surfaceForms: ["nunakayu"],
                generationRoute: "ordinary-nnc",
                frame: {
                    version: 1,
                    outputKind: "ordinary-nnc-organic-possession",
                    lessonRef: "Andrews 39.3.4",
                    stateCase: "organic-possession",
                    possessionKind: "organic",
                    sourceStem: "naka",
                    matrixStem: "yu",
                    classicalAnalogue: "(-yo)-tl",
                    nawatMatrix: "-yu",
                    predicateStem: "nakayu",
                    requiredState: "possessive",
                    possessorPrefix: "nu",
                    semanticRelation: "integral-part-to-whole",
                    spellingAuthority: "Nawat/Pipil orthography",
                    grammarAuthority: "Andrews PDF",
                },
            },
        }
    );
    s.eq(
        "Andrews 39.3.4 organic possession rejects absolutive and missing-possessor requests",
        [
            ctx.generateOrdinaryNncParadigm({
                stem: "naka",
                state: "absolutive",
                possessionKind: "organic",
            }),
            ctx.generateOrdinaryNncParadigm({
                stem: "naka",
                state: "possessive",
                possessionKind: "organic",
            }),
        ].map((result) => ({
            supported: result.supported,
            stem: result.stem,
            possessionKind: result.possessionKind,
            sourceStem: result.source?.sourceStem,
            diagnostic: result.diagnostics[0]?.id,
        })),
        [
            {
                supported: false,
                stem: "nakayu",
                possessionKind: "organic",
                sourceStem: "naka",
                diagnostic: "ordinary-nnc-organic-possession-requires-possessive-state",
            },
            {
                supported: false,
                stem: "nakayu",
                possessionKind: "organic",
                sourceStem: "naka",
                diagnostic: "ordinary-nnc-organic-possession-requires-possessor",
            },
        ]
    );
    s.eq(
        "ordinary NNC basico contract labels singular subject slots explicitly",
        [
            { subjectPrefix: "ni", subjectSuffix: "" },
            { subjectPrefix: "ti", subjectSuffix: "" },
            { subjectPrefix: "", subjectSuffix: "" },
        ].map((subject) => ctx.generateOrdinaryNncParadigm({
            stem: "mistun",
            state: "absolutive",
            animacy: "animate",
            subject,
        }).nncBasic.subject.affixLabel),
        ["ni...Ø", "ti...Ø", "Ø...Ø"]
    );
    s.eq(
        "ordinary NNC basico contract labels common singular reference",
        ctx.generateOrdinaryNncParadigm({
            stem: "mistun",
            state: "absolutive",
            animacy: "animate",
            subject: { subjectPrefix: "ni", subjectSuffix: "" },
        }).nncBasic.reference,
        {
            number: "singular",
            pluralType: "",
            label: "referencia comun",
            countSuffix: "",
            animateCountSuffix: "met",
            distributiveReduplication: false,
            nonanimatePluralIsDistributive: false,
        }
    );
    s.eq(
        "ordinary NNC direct helper exposes NNC basico engine contract",
        (() => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "absolutive",
                animacy: "animate",
                subject: { subjectPrefix: "ti", subjectSuffix: "t" },
                number: "plural",
                pluralType: "distributive",
            });
            const profile = result.nncBasic;
            return {
                curriculumRef: profile.curriculumRef,
                formula: profile.formula,
                hasTensePosition: profile.hasTensePosition,
                stateReplacesValence: profile.stateReplacesValence,
                sourceKind: profile.sourceKind,
                subject: {
                    affixLabel: profile.subject.affixLabel,
                    personSubKey: profile.subject.personSubKey,
                    nonanimateThirdOnly: profile.subject.nonanimateThirdOnly,
                    connectorBelongsTo: profile.subject.numberConnector.belongsTo,
                    connectorNotNounSuffix: profile.subject.numberConnector.notNounSuffix,
                },
                predicate: {
                    formula: profile.predicate.formula,
                    stateLabel: profile.predicate.stateLabel,
                    statePosition: profile.predicate.stateSlot.statePosition,
                    nounClass: profile.predicate.nounClass,
                    animacy: profile.predicate.animacy,
                },
                reference: profile.reference,
                futureSyntaxLayer: profile.futureSyntaxLayer,
            };
        })(),
        {
            curriculumRef: { source: "Andrews", range: "12-19", role: "curriculum-index" },
            formula: "#pers1-pers2(STEM)num1-num2#",
            hasTensePosition: false,
            stateReplacesValence: true,
            sourceKind: "fixture",
            subject: {
                affixLabel: "ti...t",
                personSubKey: "1pl",
                nonanimateThirdOnly: false,
                connectorBelongsTo: "subject",
                connectorNotNounSuffix: true,
            },
            predicate: {
                formula: "(mistun)",
                stateLabel: "predicado absolutivo",
                statePosition: "vacant",
                nounClass: "zero",
                animacy: "animate",
            },
            reference: {
                number: "plural",
                pluralType: "distributive",
                label: "distributivo",
                countSuffix: "",
                animateCountSuffix: "met",
                distributiveReduplication: true,
                nonanimatePluralIsDistributive: false,
            },
            futureSyntaxLayer: [
                "pronominal-nnc",
                "supplementation",
                "included-referent-clause",
            ],
        }
    );
    s.eq(
        "ordinary NNC basico contract marks nonanimate distributive reference",
        (() => {
            const profile = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "absolutive",
                number: "plural",
            }).nncBasic;
            return {
                subjectAffix: profile.subject.affixLabel,
                nonanimateThirdOnly: profile.subject.nonanimateThirdOnly,
                reference: profile.reference,
            };
        })(),
        {
            subjectAffix: "Ø...Ø",
            nonanimateThirdOnly: true,
            reference: {
                number: "plural",
                pluralType: "distributive",
                label: "distributivo",
                countSuffix: "",
                animateCountSuffix: "",
                distributiveReduplication: true,
                nonanimatePluralIsDistributive: true,
            },
        }
    );
    s.eq(
        "ordinary NNC clause frame separates subject connector from vacant absolutive state",
        (() => {
            const frame = ctx.generateOrdinaryNncParadigm({
                stem: "xilun",
                state: "absolutive",
                number: "singular",
            }).clauseFrame;
            return {
                formula: frame.formula,
                hasTensePosition: frame.hasTensePosition,
                tense: frame.tense,
                connectorSlot: frame.subject.numberConnector.slot,
                connectorBelongsTo: frame.subject.numberConnector.belongsTo,
                connectorNotState: frame.subject.numberConnector.notStatePosition,
                predicateStateSlot: frame.predicate.stateSlot.slot,
                predicateStatePosition: frame.predicate.stateSlot.statePosition,
                predicateStateVacant: frame.predicate.stateSlot.isVacant,
                predicateStateNotConnector: frame.predicate.stateSlot.notSubjectConnector,
            };
        })(),
        {
            formula: "#pers1-pers2(STEM)num1-num2#",
            hasTensePosition: false,
            tense: null,
            connectorSlot: "subject.num1-num2",
            connectorBelongsTo: "subject",
            connectorNotState: true,
            predicateStateSlot: "predicate.state",
            predicateStatePosition: "vacant",
            predicateStateVacant: true,
            predicateStateNotConnector: true,
        }
    );
    s.eq(
        "ordinary NNC clause frame records possessive state as predicate possessor slot",
        (() => {
            const frame = ctx.generateOrdinaryNncParadigm({
                stem: "xilun",
                state: "possessive",
                possessor: "nu",
                number: "singular",
            }).clauseFrame;
            return {
                state: frame.predicate.state,
                stateSlot: frame.predicate.stateSlot.slot,
                statePosition: frame.predicate.stateSlot.statePosition,
                participantRole: frame.predicate.stateSlot.participantRole,
                possessorPrefix: frame.predicate.stateSlot.possessor.prefix,
                notTense: frame.predicate.stateSlot.notTense,
            };
        })(),
        {
            state: "possessive",
            stateSlot: "predicate.state",
            statePosition: "possessor",
            participantRole: "possessor",
            possessorPrefix: "nu",
            notTense: true,
        }
    );
    s.eq(
        "ordinary NNC categoryProfile explains predicate, possession, animacy, and reference categories",
        (() => {
            const absolutive = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "absolutive",
                number: "singular",
            });
            const possessive = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "possessive",
                possessor: "nu",
                number: "singular",
            });
            const unsupportedPossessive = ctx.generateOrdinaryNncParadigm({
                stem: "tukayit",
                state: "possessive",
                possessor: "nu",
                number: "singular",
            });
            const animatePlural = ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                state: "absolutive",
                number: "plural",
                pluralType: "count",
            });
            const inanimateDistributive = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "absolutive",
                number: "plural",
            });
            return {
                absolutive: absolutive.nncBasic.categoryProfile,
                possessive: possessive.nncBasic.categoryProfile,
                unsupportedPossessive: {
                    supported: unsupportedPossessive.supported,
                    profile: unsupportedPossessive.nncBasic.categoryProfile,
                    diagnostic: unsupportedPossessive.diagnostics[0].id,
                },
                animatePlural: animatePlural.nncBasic.categoryProfile,
                inanimateDistributive: inanimateDistributive.nncBasic.categoryProfile,
                derivedFromSlots: {
                    formulaSlot: animatePlural.nncBasic.formulaSlots.num1Num2.slot,
                    categoryConnectorSlot: animatePlural.nncBasic.categoryProfile.reference.connectorSlot,
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(animatePlural.nncBasic.formulaSlots),
                },
            };
        })(),
        {
            absolutive: {
                predicateState: {
                    value: "absolutive",
                    label: "absolutivo",
                    slot: "predicate.state",
                    isSupportedState: true,
                },
                possessiveState: {
                    isPossessive: false,
                    possessorPrefix: "",
                    markingRequested: false,
                    markingAvailable: false,
                },
                animacy: {
                    value: "inanimate",
                    label: "inanimado",
                    affectsSubjectAgreement: true,
                    affectsReferencePlural: false,
                },
                reference: {
                    number: "singular",
                    pluralType: "",
                    label: "singular",
                    connectorSlot: "num1-num2",
                },
            },
            possessive: {
                predicateState: {
                    value: "possessive",
                    label: "posesivo",
                    slot: "predicate.state",
                    isSupportedState: true,
                },
                possessiveState: {
                    isPossessive: true,
                    possessorPrefix: "nu",
                    markingRequested: true,
                    markingAvailable: true,
                },
                animacy: {
                    value: "inanimate",
                    label: "inanimado",
                    affectsSubjectAgreement: true,
                    affectsReferencePlural: false,
                },
                reference: {
                    number: "singular",
                    pluralType: "",
                    label: "singular",
                    connectorSlot: "num1-num2",
                },
            },
            unsupportedPossessive: {
                supported: false,
                profile: {
                    predicateState: {
                        value: "possessive",
                        label: "posesivo",
                        slot: "predicate.state",
                        isSupportedState: true,
                    },
                    possessiveState: {
                        isPossessive: true,
                        possessorPrefix: "nu",
                        markingRequested: true,
                        markingAvailable: false,
                    },
                    animacy: {
                        value: "inanimate",
                        label: "inanimado",
                        affectsSubjectAgreement: true,
                        affectsReferencePlural: false,
                    },
                    reference: {
                        number: "singular",
                        pluralType: "",
                        label: "singular",
                        connectorSlot: "num1-num2",
                    },
                },
                diagnostic: "ordinary-nnc-unsupported-possessive-state",
            },
            animatePlural: {
                predicateState: {
                    value: "absolutive",
                    label: "absolutivo",
                    slot: "predicate.state",
                    isSupportedState: true,
                },
                possessiveState: {
                    isPossessive: false,
                    possessorPrefix: "",
                    markingRequested: false,
                    markingAvailable: false,
                },
                animacy: {
                    value: "animate",
                    label: "animado",
                    affectsSubjectAgreement: true,
                    affectsReferencePlural: true,
                },
                reference: {
                    number: "plural",
                    pluralType: "count",
                    label: "plural",
                    connectorSlot: "num1-num2",
                },
            },
            inanimateDistributive: {
                predicateState: {
                    value: "absolutive",
                    label: "absolutivo",
                    slot: "predicate.state",
                    isSupportedState: true,
                },
                possessiveState: {
                    isPossessive: false,
                    possessorPrefix: "",
                    markingRequested: false,
                    markingAvailable: false,
                },
                animacy: {
                    value: "inanimate",
                    label: "inanimado",
                    affectsSubjectAgreement: true,
                    affectsReferencePlural: true,
                },
                reference: {
                    number: "plural",
                    pluralType: "distributive",
                    label: "plural",
                    connectorSlot: "num1-num2",
                },
            },
            derivedFromSlots: {
                formulaSlot: "num1-num2",
                categoryConnectorSlot: "num1-num2",
                formulaEcho: "#Ø-Ø(mistun)Ø#",
            },
        }
    );
    s.eq(
        "category-first ordinary NNC coverage separates fixture evidence from open-stem structure",
        (() => {
            const shuchi = ctx.generateOrdinaryNncParadigm({ stem: "shuchit" });
            const kalPossessive = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "possessive",
                possessor: "nu",
            });
            const mistunCount = ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                number: "plural",
                pluralType: "count",
            });
            const mistunDistributive = ctx.generateOrdinaryNncParadigm({
                stem: "mistun",
                number: "plural",
                pluralType: "distributive",
            });
            const tukayitAbsolutive = ctx.generateOrdinaryNncParadigm({ stem: "tukayit" });
            const tukayitUnsupportedPossessive = ctx.generateOrdinaryNncParadigm({
                stem: "tukayit",
                state: "possessive",
                possessor: "nu",
            });
            const xilunTiOpen = ctx.generateOrdinaryNncParadigm({
                stem: "xilun",
                nounClass: "ti",
            });
            const tekpanOpen = ctx.generateOrdinaryNncParadigm({
                stem: "tekpan",
                nounClass: "in",
            });
            const nounClasses = [
                shuchi,
                kalPossessive,
                mistunCount,
                tukayitAbsolutive,
                xilunTiOpen,
                tekpanOpen,
            ].map((result) => result.nounClass);
            return {
                shuchi: {
                    sourceKind: shuchi.source?.sourceKind,
                    nounClass: shuchi.nounClass,
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(shuchi.nncBasic.formulaSlots),
                    connectorClass: shuchi.nncBasic.formulaSlots.num1Num2.nounClass,
                },
                kal: {
                    sourceKind: kalPossessive.source?.sourceKind,
                    nounClass: kalPossessive.nounClass,
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(kalPossessive.nncBasic.formulaSlots),
                    markingAvailable: kalPossessive.nncBasic.categoryProfile.possessiveState.markingAvailable,
                    possessorPrefix: kalPossessive.nncBasic.categoryProfile.possessiveState.possessorPrefix,
                },
                mistun: {
                    sourceKind: mistunCount.source?.sourceKind,
                    animacy: mistunCount.animacy,
                    animacyProfile: mistunCount.nncBasic.categoryProfile.animacy.value,
                    count: {
                        result: mistunCount.result,
                        pluralType: mistunCount.pluralType,
                        referenceType: mistunCount.nncBasic.categoryProfile.reference.pluralType,
                    },
                    distributive: {
                        result: mistunDistributive.result,
                        pluralType: mistunDistributive.pluralType,
                        referenceType: mistunDistributive.nncBasic.categoryProfile.reference.pluralType,
                    },
                },
                tukayit: {
                    sourceKind: tukayitAbsolutive.source?.sourceKind,
                    supportedPossessive: tukayitUnsupportedPossessive.supported,
                    diagnostic: tukayitUnsupportedPossessive.diagnostics[0]?.id,
                    markingAvailable: tukayitUnsupportedPossessive.nncBasic.categoryProfile.possessiveState.markingAvailable,
                    markingRequested: tukayitUnsupportedPossessive.nncBasic.categoryProfile.possessiveState.markingRequested,
                },
                xilunTiOpen: {
                    fixtureProbe: ctx.resolveOrdinaryNncFixture({ stem: "xilun" }),
                    sourceKind: xilunTiOpen.source?.sourceKind,
                    openStem: xilunTiOpen.openStem,
                    nounClass: xilunTiOpen.nounClass,
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(xilunTiOpen.nncBasic.formulaSlots),
                    connectorClass: xilunTiOpen.nncBasic.formulaSlots.num1Num2.nounClass,
                },
                tekpanOpen: {
                    fixtureProbe: ctx.resolveOrdinaryNncFixture({ stem: "tekpan" }),
                    sourceKind: tekpanOpen.source?.sourceKind,
                    openStem: tekpanOpen.openStem,
                    nounClass: tekpanOpen.nounClass,
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(tekpanOpen.nncBasic.formulaSlots),
                    connectorClass: tekpanOpen.nncBasic.formulaSlots.num1Num2.nounClass,
                },
                nounClasses,
                noPseudoClasses: nounClasses.every((nounClass) => (
                    ["t", "ti", "in", "zero"].includes(nounClass)
                )),
            };
        })(),
        {
            shuchi: {
                sourceKind: "fixture",
                nounClass: "t",
                formulaEcho: "#Ø-Ø(shuchi)t#",
                connectorClass: "t",
            },
            kal: {
                sourceKind: "fixture",
                nounClass: "zero",
                formulaEcho: "#Ø-Ø(kal)Ø#",
                markingAvailable: true,
                possessorPrefix: "nu",
            },
            mistun: {
                sourceKind: "fixture",
                animacy: "animate",
                animacyProfile: "animate",
                count: {
                    result: "mistunmet",
                    pluralType: "count",
                    referenceType: "count",
                },
                distributive: {
                    result: "mijmistunmet",
                    pluralType: "distributive",
                    referenceType: "distributive",
                },
            },
            tukayit: {
                sourceKind: "fixture",
                supportedPossessive: false,
                diagnostic: "ordinary-nnc-unsupported-possessive-state",
                markingAvailable: false,
                markingRequested: true,
            },
            xilunTiOpen: {
                fixtureProbe: null,
                sourceKind: "open-stem",
                openStem: true,
                nounClass: "ti",
                formulaEcho: "#Ø-Ø(xilun)ti#",
                connectorClass: "ti",
            },
            tekpanOpen: {
                fixtureProbe: null,
                sourceKind: "open-stem",
                openStem: true,
                nounClass: "in",
                formulaEcho: "#Ø-Ø(tekpan)in#",
                connectorClass: "in",
            },
            nounClasses: ["t", "zero", "zero", "zero", "ti", "in"],
            noPseudoClasses: true,
        }
    );
    s.eq("ordinary NNC paradigm-set helper is exported", typeof ctx.generateOrdinaryNncParadigmSet, "function");
    s.eq("ordinary NNC read-only fixture probe is exported", typeof ctx.resolveOrdinaryNncFixture, "function");
    s.eq(
        "ordinary NNC paradigm set marks nominal nuclear clause output",
        ctx.generateOrdinaryNncParadigmSet({ stem: "kal", states: ["absolutive"], numbers: ["singular"] }).clauseKind,
        "nominal-nuclear-clause"
    );
    s.eq(
        "ordinary NNC paradigm set exposes output kind",
        ctx.generateOrdinaryNncParadigmSet({ stem: "kal", states: ["absolutive"], numbers: ["singular"] }).outputKind,
        "nominal-nuclear-clause"
    );
    const resolveOrdinaryNncFixture = typeof ctx.resolveOrdinaryNncFixture === "function"
        ? (request) => ctx.resolveOrdinaryNncFixture(request)
        : () => undefined;
    s.eq(
        "ordinary NNC fixture probe marks nominal nuclear clause output",
        resolveOrdinaryNncFixture({ stem: "kal" }).clauseKind,
        "nominal-nuclear-clause"
    );
    s.eq(
        "ordinary NNC fixture probe exposes output kind",
        resolveOrdinaryNncFixture({ stem: "kal" }).outputKind,
        "nominal-nuclear-clause"
    );
    s.eq(
        "ordinary NNC read-only fixture probe resolves supported fixture stem",
        summarizeOrdinaryNncFixtureProbe(resolveOrdinaryNncFixture({
            stem: "kal",
            states: ["absolutive"],
            numbers: ["singular"],
        })),
        {
            supported: true,
            kind: "ordinary-nnc-fixture",
            input: "kal",
            normalizedInput: "kal",
            fixture: {
                id: "kal",
                stem: "kal",
                lemma: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                aliases: [],
                sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
            },
            paradigmSet: {
                supported: true,
                stem: "kal",
                nounClass: "zero",
                animacy: "inanimate",
                entries: [
                    { result: "kal", surfaceForms: ["kal"], state: "absolutive", number: "singular", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "kal",
                    sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
                },
            },
        }
    );
    s.eq(
        "ordinary NNC read-only fixture probe resolves lemma input",
        summarizeOrdinaryNncFixtureProbe(resolveOrdinaryNncFixture("shuchit")),
        {
            supported: true,
            kind: "ordinary-nnc-fixture",
            input: "shuchit",
            normalizedInput: "shuchit",
            fixture: {
                id: "shuchi",
                stem: "shuchi",
                lemma: "shuchit",
                nounClass: "t",
                animacy: "inanimate",
                aliases: [],
                sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
            },
            paradigmSet: {
                supported: true,
                stem: "shuchi",
                nounClass: "t",
                animacy: "inanimate",
                entries: [
                    { result: "shuchit", surfaceForms: ["shuchit"], state: "absolutive", number: "singular", possessor: null },
                    { result: "shujshuchit", surfaceForms: ["shujshuchit"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                    { result: "nushuchiw", surfaceForms: ["nushuchiw"], state: "possessive", number: "singular", possessor: "nu" },
                    { result: "mushuchiw", surfaceForms: ["mushuchiw"], state: "possessive", number: "singular", possessor: "mu" },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "shuchi",
                    sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
                },
            },
        }
    );
    s.eq(
        "ordinary NNC read-only fixture probe returns null for unsupported stem",
        resolveOrdinaryNncFixture({ stem: "unconfigured-nnc" }),
        null
    );
    const ordinaryNncProbeRequest = {
        stem: "kal",
        states: ["possessive"],
        numbers: ["singular"],
        possessors: ["nu", "mu"],
    };
    s.eq(
        "ordinary NNC read-only fixture probe returns the direct paradigm set",
        resolveOrdinaryNncFixture(ordinaryNncProbeRequest).paradigmSet,
        ctx.generateOrdinaryNncParadigmSet(ordinaryNncProbeRequest)
    );
    s.eq(
        "ordinary NNC read-only fixture probe preserves requested possessive plural slots",
        summarizeOrdinaryNncFixtureProbe(resolveOrdinaryNncFixture({
            stem: "shuchi",
            states: ["absolutive", "possessive"],
            numbers: ["singular", "plural"],
            possessors: ["nu"],
        })),
        {
            supported: true,
            kind: "ordinary-nnc-fixture",
            input: "shuchi",
            normalizedInput: "shuchi",
            fixture: {
                id: "shuchi",
                stem: "shuchi",
                lemma: "shuchit",
                nounClass: "t",
                animacy: "inanimate",
                aliases: [],
                sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
            },
            paradigmSet: {
                supported: true,
                stem: "shuchi",
                nounClass: "t",
                animacy: "inanimate",
                entries: [
                    { result: "shuchit", surfaceForms: ["shuchit"], state: "absolutive", number: "singular", possessor: null },
                    { result: "shujshuchit", surfaceForms: ["shujshuchit"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                    { result: "nushuchiw", surfaceForms: ["nushuchiw"], state: "possessive", number: "singular", possessor: "nu" },
                    { result: "nushujshuchiw", surfaceForms: ["nushujshuchiw"], state: "possessive", number: "plural", pluralType: "distributive", possessor: "nu" },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "shuchi",
                    sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
                },
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set enumerates only fixture-backed kal entries",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem: "kal" })),
        {
            supported: true,
            stem: "kal",
            nounClass: "zero",
            animacy: "inanimate",
            entries: [
                { result: "kal", surfaceForms: ["kal"], state: "absolutive", number: "singular", possessor: null },
                { result: "kajkal", surfaceForms: ["kajkal"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                { result: "nukal", surfaceForms: ["nukal"], state: "possessive", number: "singular", possessor: "nu" },
                { result: "mukal", surfaceForms: ["mukal"], state: "possessive", number: "singular", possessor: "mu" },
                { result: "ikal", surfaceForms: ["ikal"], state: "possessive", number: "singular", possessor: "i" },
                { result: "tukal", surfaceForms: ["tukal"], state: "possessive", number: "singular", possessor: "tu" },
                { result: "anmukal", surfaceForms: ["anmukal"], state: "possessive", number: "singular", possessor: "anmu" },
                { result: "inkal", surfaceForms: ["inkal"], state: "possessive", number: "singular", possessor: "in" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "kal",
                sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set keeps shuchi supported absolutive and possessive entries",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({
            stem: "shuchi",
            states: ["absolutive", "possessive"],
            numbers: ["singular"],
            possessors: ["nu"],
        })),
        {
            supported: true,
            stem: "shuchi",
            nounClass: "t",
            animacy: "inanimate",
            entries: [
                { result: "shuchit", surfaceForms: ["shuchit"], state: "absolutive", number: "singular", possessor: null },
                { result: "nushuchiw", surfaceForms: ["nushuchiw"], state: "possessive", number: "singular", possessor: "nu" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "shuchi",
                sourceRefs: ["data/static_parse_tests.json:16", "src/tests/parsing.test.js:91", "user-provided:2026-06-04"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set includes lexical label fixtures",
        ["tukayit", "machiyut", "majmachiyut"].map((stem) => summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem }))),
        [
            {
                supported: true,
                stem: "tukayit",
                nounClass: "zero",
                animacy: "inanimate",
                entries: [
                    { result: "tukayit", surfaceForms: ["tukayit"], state: "absolutive", number: "singular", possessor: null },
                    { result: "tujtukayit", surfaceForms: ["tujtukayit"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "tukayit",
                    sourceRefs: ["data/static_labels.json:4", "data/static_modes.json:14"],
                },
            },
            {
                supported: true,
                stem: "machiyut",
                nounClass: "zero",
                animacy: "inanimate",
                entries: [
                    { result: "machiyut", surfaceForms: ["machiyut"], state: "absolutive", number: "singular", possessor: null },
                    { result: "majmachiyut", surfaceForms: ["majmachiyut"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "machiyut",
                    sourceRefs: ["data/static_labels.json:29", "data/basic-data.csv:1623"],
                },
            },
            {
                supported: true,
                stem: "majmachiyut",
                nounClass: "zero",
                animacy: "inanimate",
                entries: [
                    { result: "majmachiyut", surfaceForms: ["majmachiyut"], state: "absolutive", number: "singular", possessor: null },
                    { result: "majmajmachiyut", surfaceForms: ["majmajmachiyut"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                ],
                diagnostics: [],
                source: {
                    fixtureId: "majmachiyut",
                    sourceRefs: ["data/static_labels.json:25"],
                },
            },
        ]
    );
    s.eq(
        "ordinary NNC paradigm-set records requested distributive plural without fallback",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({
            stem: "kal",
            states: ["absolutive"],
            numbers: ["singular", "plural"],
        })),
        {
            supported: true,
            stem: "kal",
            nounClass: "zero",
            animacy: "inanimate",
            entries: [
                { result: "kal", surfaceForms: ["kal"], state: "absolutive", number: "singular", possessor: null },
                { result: "kajkal", surfaceForms: ["kajkal"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
            ],
            diagnostics: [],
            source: {
                fixtureId: "kal",
                sourceRefs: ["data/static_parse_tests.json:49", "data/basic-data.csv:174"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set enumerates user-provided mistun entries",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem: "mistun" })),
        {
            supported: true,
            stem: "mistun",
            nounClass: "zero",
            animacy: "animate",
            entries: [
                { result: "mistun", surfaceForms: ["mistun"], state: "absolutive", number: "singular", possessor: null },
                { result: "mistunmet", surfaceForms: ["mistunmet"], state: "absolutive", number: "plural", pluralType: "count", possessor: null },
                { result: "mijmistunmet", surfaceForms: ["mijmistunmet"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                { result: "numistun", surfaceForms: ["numistun"], state: "possessive", number: "singular", possessor: "nu" },
                { result: "mumistun", surfaceForms: ["mumistun"], state: "possessive", number: "singular", possessor: "mu" },
                { result: "numistun", surfaceForms: ["numistun"], state: "possessive", number: "plural", pluralType: "count", possessor: "nu" },
                { result: "mumistun", surfaceForms: ["mumistun"], state: "possessive", number: "plural", pluralType: "count", possessor: "mu" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "mistun",
                sourceRefs: ["user-provided:2026-06-04"],
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set accepts fixture-free stems",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem: "xilun" })),
        {
            supported: true,
            stem: "xilun",
            nounClass: "zero",
            animacy: "inanimate",
            entries: [
                { result: "xilun", surfaceForms: ["xilun"], state: "absolutive", number: "singular", possessor: null },
                { result: "xijxilun", surfaceForms: ["xijxilun"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                { result: "nuxilun", surfaceForms: ["nuxilun"], state: "possessive", number: "singular", possessor: "nu" },
                { result: "muxilun", surfaceForms: ["muxilun"], state: "possessive", number: "singular", possessor: "mu" },
                { result: "ixilun", surfaceForms: ["ixilun"], state: "possessive", number: "singular", possessor: "i" },
                { result: "tuxilun", surfaceForms: ["tuxilun"], state: "possessive", number: "singular", possessor: "tu" },
                { result: "anmuxilun", surfaceForms: ["anmuxilun"], state: "possessive", number: "singular", possessor: "anmu" },
                { result: "inxilun", surfaceForms: ["inxilun"], state: "possessive", number: "singular", possessor: "in" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "",
                sourceRefs: [],
                sourceKind: "open-stem",
            },
        }
    );
    s.eq(
        "ordinary NNC paradigm-set applies possessive nh before vowel cores",
        summarizeOrdinaryNncSet(ctx.generateOrdinaryNncParadigmSet({ stem: "awat" })),
        {
            supported: true,
            stem: "awat",
            nounClass: "zero",
            animacy: "inanimate",
            entries: [
                { result: "awat", surfaceForms: ["awat"], state: "absolutive", number: "singular", possessor: null },
                { result: "ajawat", surfaceForms: ["ajawat"], state: "absolutive", number: "plural", pluralType: "distributive", possessor: null },
                { result: "nuawat", surfaceForms: ["nuawat"], state: "possessive", number: "singular", possessor: "nu" },
                { result: "muawat", surfaceForms: ["muawat"], state: "possessive", number: "singular", possessor: "mu" },
                { result: "iawat", surfaceForms: ["iawat"], state: "possessive", number: "singular", possessor: "i" },
                { result: "tuawat", surfaceForms: ["tuawat"], state: "possessive", number: "singular", possessor: "tu" },
                { result: "anmuawat", surfaceForms: ["anmuawat"], state: "possessive", number: "singular", possessor: "anmu" },
                { result: "inhawat", surfaceForms: ["inhawat"], state: "possessive", number: "singular", possessor: "in" },
            ],
            diagnostics: [],
            source: {
                fixtureId: "",
                sourceRefs: [],
                sourceKind: "open-stem",
            },
        }
    );

    return s;
}

module.exports = { run };
