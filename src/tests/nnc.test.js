"use strict";

/**
 * Tests for src/core/nnc/nnc.mjs.
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
        derivationMode = ctx.DERIVATION_MODE.active,
        voiceMode = ctx.VOICE_MODE.active,
        outputSet = "",
        lesson32PilChildNncSide = false,
        formulaSlots = null,
    }) => ({
        options: {
            silent: true,
            skipValidation: false,
            override: {
                tenseMode: ctx.TENSE_MODE.sustantivo,
                derivationMode,
                voiceMode,
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
                    ...(formulaSlots ? { formulaSlots } : {}),
                    ...(outputSet ? { outputSet } : {}),
                    ...(lesson32PilChildNncSide === true ? { lesson32PilChildNncSide: true } : {}),
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
    const buildActionNounSourceSubjectPossessorFrames = ({
        subjectPrefix = "",
        subjectSuffix = "",
        targetPossessivePrefix = "",
        sourceTense = "distant-past-active",
    } = {}) => {
        const sourceSubjectFrame = ctx.buildAndrewsSourceSubjectFrame({
            subjectPrefix,
            subjectSuffix,
            sourceUnit: "CNV",
            sourceTense,
        });
        const sourceSubjectPossessorOperationFrame = ctx.buildSourceSubjectPossessorOperationFrame({
            sourceSubjectFrame,
            targetPossessivePrefix,
            nominalKind: "calificativo-instrumentivo",
            operationId: "andrews-36-11-active-action-source-subject-to-possessor",
            andrewsRef: sourceTense === "distant-past-passive" ? "Andrews 36.10" : "Andrews 36.11",
        });
        return { sourceSubjectFrame, sourceSubjectPossessorOperationFrame };
    };
    const buildInstrumentivoSourceSubjectPossessorFrames = ({
        subjectPrefix = "",
        subjectSuffix = "",
        targetPossessivePrefix = "",
    } = {}) => {
        const sourceSubjectFrame = ctx.buildAndrewsSourceSubjectFrame({
            subjectPrefix,
            subjectSuffix,
            sourceUnit: "CNV",
            sourceTense: "imperfect-active",
        });
        const sourceSubjectPossessorOperationFrame = ctx.buildSourceSubjectPossessorOperationFrame({
            sourceSubjectFrame,
            targetPossessivePrefix,
            nominalKind: "instrumentivo",
            operationId: "andrews-36-6-instrumentive-source-subject-to-possessor",
            andrewsRef: "Andrews 36.6",
        });
        return { sourceSubjectFrame, sourceSubjectPossessorOperationFrame };
    };

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
        nawatPluralDyadBridge: lesson12.subjectPositionFrame.num1Num2Rule.nawatPluralDyadBridge,
        pluralNum2Morphs: lesson12.subjectPositionFrame.num1Num2Rule.pluralNum2Morphs,
    }, {
        absentCarriers: ["x", "xi"],
        num1BelongsTo: "subject-personal-pronoun",
        num1DoesNotBelongTo: ["predicate-state", "nounstem", "noun suffix"],
        singularDyads: ["tl-0", "tli-0", "li-0", "in-0", "0-0"],
        pluralDyads: ["t-in", "m-eh", "0-h"],
        nawatPluralDyadBridge: [{
            classicalDyad: "m-eh",
            currentNawatDyad: "m-et",
            num1: "m",
            classicalNum2: "eh",
            currentNawatNum2: "et",
            orthographyRule: "Classical final -h maps to current Nawat/Pipil -t.",
        }],
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
    s.eq("Lesson 15 natural-possession and sentence frames stay Andrews-source-gated", {
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
    const typedPredicateNominalConnectorFrame = ctx.buildPredicateNominalConnectorOperationFrame({
        sourceTense: "futuro",
        nominalKind: "predicado-nominal",
        nominalConnector: "t",
    });
    const typedFuturePredicateNominal = ctx.getPredicateNominalResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        sourceTense: "futuro",
        nominalConnector: "t",
        predicateNominalConnectorOperationFrame: typedPredicateNominalConnectorFrame,
    });
    const legacyStringFuturePredicateNominal = ctx.getPredicateNominalResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        sourceTense: "futuro",
        nominalConnector: "t",
    });
    const contradictoryFuturePredicateNominal = ctx.getPredicateNominalResult({
        rawVerb: "(nemi)",
        verbMeta: nemiMeta,
        subjectPrefix: "",
        subjectSuffix: "",
        objectPrefix: "",
        sourceTense: "futuro",
        nominalConnector: "t",
        predicateNominalConnectorOperationFrame: ctx.buildPredicateNominalConnectorOperationFrame({
            sourceTense: "imperfecto",
            nominalKind: "predicado-nominal",
            nominalConnector: "t",
        }),
    });
    s.eq(
        "predicate-nominal t/ti connector consumes the typed Andrews operation frame instead of string API",
        {
            typedResult: typedFuturePredicateNominal.result || "",
            typedConnector: typedFuturePredicateNominal.num1Num2?.displaySurface || "",
            typedSelector: typedFuturePredicateNominal.predicateNominalSource?.connectorSelector || "",
            displayInput: typedFuturePredicateNominal.entries?.[0]?.metadata?.absolutiveConnectorInput || "",
            operationKind: typedFuturePredicateNominal.predicateNominalConnectorOperationFrame?.kind || "",
            legacyBlocked: legacyStringFuturePredicateNominal.diagnostics?.[0]?.id || "",
            legacyHelperBlocked: ctx.resolvePredicateNominalAbsolutiveTtiConnector("nemi-s", "t"),
            contradictoryBlocked: contradictoryFuturePredicateNominal.diagnostics?.[0]?.id || "",
        },
        {
            typedResult: "nemisti",
            typedConnector: "ti",
            typedSelector: "typed-predicate-stem-frame-previous-non-zero-segment",
            displayInput: "",
            operationKind: "andrews-predicate-nominal-connector-operation-frame",
            legacyBlocked: "predicado-nominal-absolutive-connector-missing-operation-frame",
            legacyHelperBlocked: "",
            contradictoryBlocked: "predicado-nominal-absolutive-connector-contradictory-source-frame",
        }
    );
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
        const frames = buildActionNounSourceSubjectPossessorFrames({
            subjectPrefix: example.subjectPrefix,
            subjectSuffix: example.subjectSuffix,
            targetPossessivePrefix: example.possessor,
        });
        const result = ctx.getCalificativoInstrumentivoResult({
            rawVerb: "(miki)",
            verbMeta: mikiMeta,
            subjectPrefix: example.subjectPrefix,
            subjectSuffix: example.subjectSuffix,
            objectPrefix: "",
            possessivePrefix: "",
            actionNounStemUse: "general-use",
            ...frames,
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
    const legacyStringSourceSubjectActionNoun = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "ti",
        subjectSuffix: "t",
        objectPrefix: "",
        possessivePrefix: "",
        actionNounStemUse: "general-use",
    });
    const typedActionNounFrames = buildActionNounSourceSubjectPossessorFrames({
        subjectPrefix: "ti",
        subjectSuffix: "t",
        targetPossessivePrefix: "tu",
    });
    const poisonedStringActionNoun = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "ni",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
        actionNounStemUse: "general-use",
        ...typedActionNounFrames,
    });
    const missingOperationActionNoun = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "ti",
        subjectSuffix: "t",
        objectPrefix: "",
        possessivePrefix: "",
        actionNounStemUse: "general-use",
        sourceSubjectFrame: typedActionNounFrames.sourceSubjectFrame,
    });
    const contradictoryActionNoun = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "ti",
        subjectSuffix: "t",
        objectPrefix: "",
        possessivePrefix: "",
        actionNounStemUse: "general-use",
        sourceSubjectFrame: typedActionNounFrames.sourceSubjectFrame,
        sourceSubjectPossessorOperationFrame: ctx.buildSourceSubjectPossessorOperationFrame({
            sourceSubjectFrame: typedActionNounFrames.sourceSubjectFrame,
            targetPossessivePrefix: "nu",
            nominalKind: "calificativo-instrumentivo",
            operationId: "andrews-36-11-active-action-source-subject-to-possessor",
        }),
    });
    s.eq(
        "Andrews 36.11 active-action source-subject possessor consumes typed frames instead of subject strings",
        {
            legacyBlocked: legacyStringSourceSubjectActionNoun.diagnostics?.[0]?.id || "",
            poisonedResult: poisonedStringActionNoun.result || "",
            poisonedPossessor: poisonedStringActionNoun.actionNounSourceSubjectPossessor?.possessivePrefix || "",
            operationId: poisonedStringActionNoun.actionNounSourceSubjectPossessor?.operationFrame?.operationId || "",
            missingOperation: missingOperationActionNoun.diagnostics?.[0]?.id || "",
            contradictory: contradictoryActionNoun.diagnostics?.[0]?.id || "",
        },
        {
            legacyBlocked: "calificativo-instrumentivo-source-subject-frame-required",
            poisonedResult: "tumikka",
            poisonedPossessor: "tu",
            operationId: "andrews-36-11-active-action-source-subject-to-possessor",
            missingOperation: "calificativo-instrumentivo-source-subject-typed-operation-frame-required",
            contradictory: "calificativo-instrumentivo-source-subject-contradictory-frame",
        }
    );
    const directGeneralUseActiveActionWithoutMappableSourceSubject = ctx.getCalificativoInstrumentivoResult({
        rawVerb: "(miki)",
        verbMeta: mikiMeta,
        subjectPrefix: "an",
        subjectSuffix: "",
        objectPrefix: "",
        possessivePrefix: "",
        actionNounStemUse: "general-use",
        ...buildActionNounSourceSubjectPossessorFrames({
            subjectPrefix: "an",
            subjectSuffix: "",
        }),
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
        const frames = buildInstrumentivoSourceSubjectPossessorFrames({
            subjectPrefix: example.subjectPrefix,
            subjectSuffix: example.subjectSuffix,
            targetPossessivePrefix: example.possessor,
        });
        const result = ctx.getInstrumentivoResult({
            rawVerb: "-(piya)",
            verbMeta: piyaMeta,
            subjectPrefix: example.subjectPrefix,
            subjectSuffix: example.subjectSuffix,
            objectPrefix: "ta",
            mode: ctx.INSTRUMENTIVO_MODE.posesivo,
            possessivePrefix: "",
            ...frames,
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
    const legacyStringSourceSubjectInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(piya)",
        verbMeta: piyaMeta,
        subjectPrefix: "ti",
        subjectSuffix: "t",
        objectPrefix: "ta",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "",
    });
    const typedInstrumentivoFrames = buildInstrumentivoSourceSubjectPossessorFrames({
        subjectPrefix: "ti",
        subjectSuffix: "t",
        targetPossessivePrefix: "tu",
    });
    const poisonedStringInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(piya)",
        verbMeta: piyaMeta,
        subjectPrefix: "ni",
        subjectSuffix: "",
        objectPrefix: "ta",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "",
        ...typedInstrumentivoFrames,
    });
    const missingOperationInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(piya)",
        verbMeta: piyaMeta,
        subjectPrefix: "ti",
        subjectSuffix: "t",
        objectPrefix: "ta",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "",
        sourceSubjectFrame: typedInstrumentivoFrames.sourceSubjectFrame,
    });
    const contradictoryInstrumentivo = ctx.getInstrumentivoResult({
        rawVerb: "-(piya)",
        verbMeta: piyaMeta,
        subjectPrefix: "ti",
        subjectSuffix: "t",
        objectPrefix: "ta",
        mode: ctx.INSTRUMENTIVO_MODE.posesivo,
        possessivePrefix: "",
        sourceSubjectFrame: typedInstrumentivoFrames.sourceSubjectFrame,
        sourceSubjectPossessorOperationFrame: ctx.buildSourceSubjectPossessorOperationFrame({
            sourceSubjectFrame: typedInstrumentivoFrames.sourceSubjectFrame,
            targetPossessivePrefix: "nu",
            nominalKind: "instrumentivo",
            operationId: "andrews-36-6-instrumentive-source-subject-to-possessor",
        }),
    });
    s.eq(
        "Andrews 36.6 instrumentivo source-subject possessor consumes typed frames instead of subject strings",
        {
            legacyBlocked: legacyStringSourceSubjectInstrumentivo.diagnostics?.[0]?.id || "",
            poisonedResult: poisonedStringInstrumentivo.result || "",
            poisonedPossessor: poisonedStringInstrumentivo.instrumentivoSourceSubjectPossessor?.possessivePrefix || "",
            operationId: poisonedStringInstrumentivo.instrumentivoSourceSubjectPossessor?.operationFrame?.operationId || "",
            missingOperation: missingOperationInstrumentivo.diagnostics?.[0]?.id || "",
            contradictory: contradictoryInstrumentivo.diagnostics?.[0]?.id || "",
        },
        {
            legacyBlocked: "instrumentivo-source-subject-frame-required",
            poisonedResult: "tutapiyaya",
            poisonedPossessor: "tu",
            operationId: "andrews-36-6-instrumentive-source-subject-to-possessor",
            missingOperation: "instrumentivo-source-subject-typed-operation-frame-required",
            contradictory: "instrumentivo-source-subject-contradictory-frame",
        }
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
            fullFormulaEcho: generatedKalShell?.fullFormulaEcho,
            compactFormulaEcho: generatedKalShell?.compactFormulaEcho,
            hasTensePosition: generatedKalShell?.hasTensePosition,
            generationAllowed: generatedKalShell?.generationAllowed,
            predicateStem: generatedKalShell?.slots?.predicateStem?.stem,
            connector: generatedKalShell?.slots?.num1Num2?.displayConnector,
            connectorDyad: generatedKalShell?.slots?.num1Num2?.displayDyad,
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
            fullFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
            compactFormulaEcho: "#Ø-Ø(kal)Ø#",
            hasTensePosition: false,
            generationAllowed: false,
            predicateStem: "kal",
            connector: "Ø",
            connectorDyad: "Ø-Ø",
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

    const summarizeLesson32PilChildNncSideOrdinaryOutput = (result) => {
        const firstEntry = result?.lesson32PilChildNncSideGeneration?.entries?.[0] || null;
        const firstSlots = firstEntry?.formulaSlots || {};
        const formulaPairs = Array.isArray(result?.formulaSurfacePairs) ? result.formulaSurfacePairs : [];
        return {
            generationRoute: result?.generationRoute || "",
            subGenerationRoute: result?.subGenerationRoute || "",
            outputSet: result?.outputSet || "",
            supported: result?.supported === true,
            result: result?.result || "",
            surfaceForms: result?.surfaceForms || [],
            stem: result?.stem || "",
            state: result?.state || "",
            stateSet: result?.stateSet || [],
            nounClass: result?.nounClass || "",
            animacy: result?.animacy || "",
            number: result?.number || "",
            pluralType: result?.pluralType || "",
            modeScope: result?.modeScope || [],
            requestedDerivationMode: result?.requestedDerivationMode || "",
            requestedVoiceMode: result?.requestedVoiceMode || "",
            hasTensePosition: result?.hasTensePosition === true,
            formulaCount: result?.structuralFormulas?.length || 0,
            firstFormula: result?.structuralFormulas?.[0] || "",
            lastFormula: result?.structuralFormulas?.[result.structuralFormulas.length - 1] || "",
            pairCount: formulaPairs.length,
            firstPair: formulaPairs[0]
                ? `${formulaPairs[0].surface}=>${formulaPairs[0].targetFormulaEcho}`
                : "",
            lastPair: formulaPairs[formulaPairs.length - 1]
                ? `${formulaPairs[formulaPairs.length - 1].surface}=>${formulaPairs[formulaPairs.length - 1].targetFormulaEcho}`
                : "",
            slotOwners: {
                possessiveState: firstSlots.possessiveState?.belongsTo || "",
                predicateInsideParentheses: firstSlots.predicateStem?.insideParentheses === true,
                connector: firstSlots.num1Num2?.belongsTo || "",
                connectorOutsideParentheses: firstSlots.num1Num2?.outsideParentheses === true,
                connectorNotTense: firstSlots.num1Num2?.notTense === true,
            },
            diagnostics: result?.diagnostics || [],
            diagnosticIds: result?.diagnosticIds || [],
            grammarRouteFamily: result?.grammarFrame?.routeContract?.routeFamily || "",
            grammarDerivationMode: result?.grammarFrame?.inflectionFrame?.derivationMode || "",
            grammarVoiceMode: result?.grammarFrame?.inflectionFrame?.voiceMode || "",
        };
    };
    const expectedLesson32PilChildSurfaces = [
        "annupilwan",
        "nupilwantzitzinwan",
        "nupilwantzitzin",
        "inpijpilwantzitzin",
        "pipiltin",
        "ukichpipiltin",
        "siwapipiltin",
        "tipiltzinti",
        "piltunti",
    ];
    s.eq(
        "ordinary CNN output-set route generates Andrews p294 pil NNC-side rows for active and no-active contexts",
        [
            {
                label: "active",
                request: buildSilentOrdinaryNncRequest({
                    stem: "pil",
                    outputSet: "lesson32-pil-child-nnc-side",
                    derivationMode: ctx.DERIVATION_MODE.active,
                    voiceMode: ctx.VOICE_MODE.active,
                }),
            },
            {
                label: "nonactive",
                request: buildSilentOrdinaryNncRequest({
                    stem: "pil",
                    outputSet: "lesson32-pil-child-nnc-side",
                    derivationMode: ctx.DERIVATION_MODE.nonactive,
                    voiceMode: ctx.VOICE_MODE.passive,
                }),
            },
        ].map((entry) => ({
            label: entry.label,
            ...summarizeLesson32PilChildNncSideOrdinaryOutput(ctx.executeGenerateWordRequest(entry.request)),
        })),
        [
            {
                label: "active",
                generationRoute: "ordinary-nnc",
                subGenerationRoute: "lesson-32-pil-child-nnc-side",
                outputSet: "lesson32-pil-child-nnc-side",
                supported: true,
                result: expectedLesson32PilChildSurfaces.join(" / "),
                surfaceForms: expectedLesson32PilChildSurfaces,
                stem: "pil",
                state: "mixed",
                stateSet: ["possessive", "absolutive"],
                nounClass: "mixed",
                animacy: "animate",
                number: "mixed",
                pluralType: "lesson32-p294",
                modeScope: ["active", "nonactive"],
                requestedDerivationMode: ctx.DERIVATION_MODE.active,
                requestedVoiceMode: ctx.VOICE_MODE.active,
                hasTensePosition: false,
                formulaCount: 9,
                firstFormula: "#an-0+n-o(pil)hu-an#",
                lastFormula: "#0-0(pil-ton)tli-0#",
                pairCount: 9,
                firstPair: "annupilwan=>#an-0+n-o(pil)hu-an#",
                lastPair: "piltunti=>#0-0(pil-ton)tli-0#",
                slotOwners: {
                    possessiveState: "predicate",
                    predicateInsideParentheses: true,
                    connector: "subject",
                    connectorOutsideParentheses: true,
                    connectorNotTense: true,
                },
                diagnostics: [],
                diagnosticIds: [
                    "lesson-32-pil-child-nnc-side-output-set",
                    "nnc-side-generation-scoped-to-andrews-p294",
                    "ordinary-nnc-generation-gate-unchanged",
                ],
                grammarRouteFamily: "ordinary-nnc",
                grammarDerivationMode: ctx.DERIVATION_MODE.active,
                grammarVoiceMode: ctx.VOICE_MODE.active,
            },
            {
                label: "nonactive",
                generationRoute: "ordinary-nnc",
                subGenerationRoute: "lesson-32-pil-child-nnc-side",
                outputSet: "lesson32-pil-child-nnc-side",
                supported: true,
                result: expectedLesson32PilChildSurfaces.join(" / "),
                surfaceForms: expectedLesson32PilChildSurfaces,
                stem: "pil",
                state: "mixed",
                stateSet: ["possessive", "absolutive"],
                nounClass: "mixed",
                animacy: "animate",
                number: "mixed",
                pluralType: "lesson32-p294",
                modeScope: ["active", "nonactive"],
                requestedDerivationMode: ctx.DERIVATION_MODE.nonactive,
                requestedVoiceMode: ctx.VOICE_MODE.passive,
                hasTensePosition: false,
                formulaCount: 9,
                firstFormula: "#an-0+n-o(pil)hu-an#",
                lastFormula: "#0-0(pil-ton)tli-0#",
                pairCount: 9,
                firstPair: "annupilwan=>#an-0+n-o(pil)hu-an#",
                lastPair: "piltunti=>#0-0(pil-ton)tli-0#",
                slotOwners: {
                    possessiveState: "predicate",
                    predicateInsideParentheses: true,
                    connector: "subject",
                    connectorOutsideParentheses: true,
                    connectorNotTense: true,
                },
                diagnostics: [],
                diagnosticIds: [
                    "lesson-32-pil-child-nnc-side-output-set",
                    "nnc-side-generation-scoped-to-andrews-p294",
                    "ordinary-nnc-generation-gate-unchanged",
                ],
                grammarRouteFamily: "ordinary-nnc",
                grammarDerivationMode: ctx.DERIVATION_MODE.nonactive,
                grammarVoiceMode: ctx.VOICE_MODE.passive,
            },
        ]
    );

    const lesson32AuthorityProbe = ctx.executeGenerateWordRequest(buildSilentOrdinaryNncRequest({
        stem: "pil",
        outputSet: "lesson32-pil-child-nnc-side",
        derivationMode: ctx.DERIVATION_MODE.active,
        voiceMode: ctx.VOICE_MODE.active,
    }));
    const lesson32Pairs = lesson32AuthorityProbe.formulaSurfacePairs || [];
    const lesson32SourceFrame = lesson32AuthorityProbe.lesson32PilChildNncSideResultTextSourceFrame;
    const lesson32OperationFrame = lesson32AuthorityProbe.lesson32PilChildNncSideResultTextOperationFrame;
    const poisonLesson32PairDisplays = (pair) => {
        const poisoned = {
            ...pair,
            surface: "poison-surface",
            result: "poison-result",
            surfaceForms: ["poison-surface-form"],
            formulaEcho: "#poison(formula)#",
        };
        Object.defineProperty(poisoned, "formulaRealizationRecord", {
            enumerable: false,
            value: pair.formulaRealizationRecord,
        });
        Object.defineProperty(poisoned, "formulaRecord", {
            enumerable: false,
            value: pair.formulaRecord,
        });
        return poisoned;
    };
    const poisonedLesson32Pairs = lesson32Pairs.map(poisonLesson32PairDisplays);
    const poisonedLesson32SourceFrame = ctx.buildLesson32PilChildNncSideResultTextSourceFrame({
        formulaSurfacePairs: poisonedLesson32Pairs,
    });
    const poisonedLesson32OperationFrame = ctx.buildLesson32PilChildNncSideResultTextOperationFrame(poisonedLesson32SourceFrame);
    const contradictoryLesson32OperationFrame = {
        ...poisonedLesson32OperationFrame,
        targetFrame: {
            ...poisonedLesson32OperationFrame.targetFrame,
            resultText: "poison-result",
        },
    };
    s.eq(
        "lesson 32 pil child NNC-side result text is authorized by realization segment frames, not display strings",
        {
            directNoFrame: ctx.buildLesson32PilChildNncSideResultText(lesson32Pairs),
            missingSourceFrame: ctx.buildLesson32PilChildNncSideResultText(lesson32Pairs, {
                operationFrame: lesson32OperationFrame,
            }),
            missingOperationFrame: ctx.buildLesson32PilChildNncSideResultText(lesson32Pairs, {
                sourceFrame: lesson32SourceFrame,
            }),
            missingTargetFrame: ctx.buildLesson32PilChildNncSideResultText(poisonedLesson32Pairs, {
                sourceFrame: poisonedLesson32SourceFrame,
                operationFrame: {
                    ...poisonedLesson32OperationFrame,
                    targetFrame: null,
                },
            }),
            contradictoryTargetFrame: ctx.buildLesson32PilChildNncSideResultText(poisonedLesson32Pairs, {
                sourceFrame: poisonedLesson32SourceFrame,
                operationFrame: contradictoryLesson32OperationFrame,
            }),
            poisonedDisplayResult: ctx.buildLesson32PilChildNncSideResultText(poisonedLesson32Pairs, {
                sourceFrame: poisonedLesson32SourceFrame,
                operationFrame: poisonedLesson32OperationFrame,
            }),
            sourceFrameDisplayAuthority: poisonedLesson32SourceFrame.displayStringsAuthorizeGrammar,
            sourceFrameConsumesRenderedInput: poisonedLesson32SourceFrame.consumesRenderedInput,
            outputResult: lesson32AuthorityProbe.result,
            outputSourceFrameKind: lesson32SourceFrame?.kind || "",
            outputOperationId: lesson32OperationFrame?.operationId || "",
        },
        {
            directNoFrame: "",
            missingSourceFrame: "",
            missingOperationFrame: "",
            missingTargetFrame: "",
            contradictoryTargetFrame: "",
            poisonedDisplayResult: expectedLesson32PilChildSurfaces.join(" / "),
            sourceFrameDisplayAuthority: false,
            sourceFrameConsumesRenderedInput: false,
            outputResult: expectedLesson32PilChildSurfaces.join(" / "),
            outputSourceFrameKind: "lesson-32-pil-child-nnc-side-result-text-source-frame",
            outputOperationId: "lesson-32-pil-child-nnc-side-result-text-render",
        }
    );

    s.eq("ordinary NNC direct helper is exported", typeof ctx.generateOrdinaryNncParadigm, "function");
    s.eq("ordinary NNC formula echo helper is exported", typeof ctx.buildOrdinaryNncFormulaEchoFromSlots, "function");
    const ordinaryNncResultTextProbe = ctx.generateOrdinaryNncParadigm({
        stem: "kal",
        state: "absolutive",
        subject: { subjectPrefix: "", subjectSuffix: "" },
        number: "singular",
    });
    const ordinaryNncResultTextPairs = ordinaryNncResultTextProbe.formulaSurfacePairs || [];
    const ordinaryNncResultTextSourceFrame = ordinaryNncResultTextProbe.ordinaryNncResultTextSourceFrame;
    const ordinaryNncResultTextOperationFrame = ordinaryNncResultTextProbe.ordinaryNncResultTextOperationFrame;
    const poisonOrdinaryNncPairDisplays = (pair) => {
        const poisoned = {
            ...pair,
            surface: "poison-surface",
            result: "poison-result",
            surfaceForms: ["poison-surface-form"],
            formulaEcho: "#poison(formula)#",
        };
        Object.defineProperty(poisoned, "formulaRealizationRecord", {
            enumerable: false,
            value: pair.formulaRealizationRecord,
        });
        Object.defineProperty(poisoned, "formulaRecord", {
            enumerable: false,
            value: pair.formulaRecord,
        });
        return poisoned;
    };
    const poisonedOrdinaryNncResultTextPairs = ordinaryNncResultTextPairs.map(poisonOrdinaryNncPairDisplays);
    const poisonedOrdinaryNncResultTextSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: poisonedOrdinaryNncResultTextPairs,
    });
    const poisonedOrdinaryNncResultTextOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        poisonedOrdinaryNncResultTextSourceFrame
    );
    const staleRealizationOrdinaryNncPair = {
        ...ordinaryNncResultTextPairs[0],
    };
    Object.defineProperty(staleRealizationOrdinaryNncPair, "formulaRealizationRecord", {
        enumerable: false,
        value: {
            ...ordinaryNncResultTextPairs[0].formulaRealizationRecord,
            surface: "poison-surface",
            surfaceForms: ["poison-surface"],
        },
    });
    Object.defineProperty(staleRealizationOrdinaryNncPair, "formulaRecord", {
        enumerable: false,
        value: ordinaryNncResultTextPairs[0].formulaRecord,
    });
    const staleRealizationOrdinaryNncSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: [staleRealizationOrdinaryNncPair],
    });
    const staleRealizationOrdinaryNncOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        staleRealizationOrdinaryNncSourceFrame
    );
    const contradictoryOrdinaryNncResultTextOperationFrame = {
        ...poisonedOrdinaryNncResultTextOperationFrame,
        targetFrame: {
            ...poisonedOrdinaryNncResultTextOperationFrame.targetFrame,
            resultText: "poison-result",
        },
    };
    s.eq(
        "ordinary NNC singular result text is authorized by realization segment frames, not display strings",
        {
            directNoFrame: ctx.buildOrdinaryNncResultText(ordinaryNncResultTextPairs),
            missingSourceFrame: ctx.buildOrdinaryNncResultText(ordinaryNncResultTextPairs, {
                operationFrame: ordinaryNncResultTextOperationFrame,
            }),
            missingOperationFrame: ctx.buildOrdinaryNncResultText(ordinaryNncResultTextPairs, {
                sourceFrame: ordinaryNncResultTextSourceFrame,
            }),
            missingTargetFrame: ctx.buildOrdinaryNncResultText(poisonedOrdinaryNncResultTextPairs, {
                sourceFrame: poisonedOrdinaryNncResultTextSourceFrame,
                operationFrame: {
                    ...poisonedOrdinaryNncResultTextOperationFrame,
                    targetFrame: null,
                },
            }),
            contradictoryTargetFrame: ctx.buildOrdinaryNncResultText(poisonedOrdinaryNncResultTextPairs, {
                sourceFrame: poisonedOrdinaryNncResultTextSourceFrame,
                operationFrame: contradictoryOrdinaryNncResultTextOperationFrame,
            }),
            staleRealizationFrame: ctx.buildOrdinaryNncResultText([staleRealizationOrdinaryNncPair], {
                sourceFrame: staleRealizationOrdinaryNncSourceFrame,
                operationFrame: staleRealizationOrdinaryNncOperationFrame,
            }),
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(poisonedOrdinaryNncResultTextPairs, {
                sourceFrame: poisonedOrdinaryNncResultTextSourceFrame,
                operationFrame: poisonedOrdinaryNncResultTextOperationFrame,
            }),
            outputResult: ordinaryNncResultTextProbe.result,
            sourceFrameKind: ordinaryNncResultTextSourceFrame?.kind || "",
            operationId: ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceFrameSupported: ordinaryNncResultTextSourceFrame?.supported === true,
            staleSourceFrameSupported: staleRealizationOrdinaryNncSourceFrame?.supported === true,
            sourceFrameDisplayAuthority: ordinaryNncResultTextSourceFrame?.displayStringsAuthorizeGrammar,
            sourceFrameConsumesRenderedInput: ordinaryNncResultTextSourceFrame?.consumesRenderedInput,
        },
        {
            directNoFrame: "",
            missingSourceFrame: "",
            missingOperationFrame: "",
            missingTargetFrame: "",
            contradictoryTargetFrame: "",
            staleRealizationFrame: "",
            poisonedDisplayResult: "kal",
            outputResult: "kal",
            sourceFrameKind: "ordinary-nnc-result-text-source-frame",
            operationId: "ordinary-nnc-result-text-render",
            sourceFrameSupported: true,
            staleSourceFrameSupported: false,
            sourceFrameDisplayAuthority: false,
            sourceFrameConsumesRenderedInput: false,
        }
    );
    const absolutiveSingularFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "shuchi",
        state: "absolutive",
        number: "singular",
        nounClass: "t",
    });
    const ordinaryNncAbsolutiveSingularProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: absolutiveSingularFormulaSlots,
        state: "absolutive",
        subject: { subjectPrefix: "", subjectSuffix: "" },
        number: "singular",
        animacy: "inanimate",
    });
    const ordinaryNncAbsolutiveSingularPairs = ordinaryNncAbsolutiveSingularProbe.formulaSurfacePairs || [];
    const ordinaryNncAbsolutiveSingularPoisonedPairs = ordinaryNncAbsolutiveSingularPairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncAbsolutiveSingularPoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncAbsolutiveSingularPoisonedPairs,
    });
    const ordinaryNncAbsolutiveSingularPoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncAbsolutiveSingularPoisonedSourceFrame
    );
    const absolutiveSingularSourceFrame = ctx.buildOrdinaryNncAbsolutiveSingularSourceFrame({
        sourceStem: "shuchi",
        nounClass: "t",
        state: "absolutive",
        number: "singular",
        animacy: "inanimate",
    });
    const absolutiveSingularOperationFrame = ctx.buildOrdinaryNncAbsolutiveSingularOperationFrame(
        absolutiveSingularSourceFrame
    );
    const contradictoryAbsolutiveSingularOperationFrame = {
        ...absolutiveSingularOperationFrame,
        targetFrame: {
            ...absolutiveSingularOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const missingTargetAbsolutiveSingularOperationFrame = {
        ...absolutiveSingularOperationFrame,
        targetFrame: null,
    };
    const oldAbsolutiveSingularFixtures = ctx.ORDINARY_NNC_FIXTURES;
    const oldAbsolutiveSingularSurfaceChainBuilder = ctx.buildOrdinaryNncSurfaceChainResult;
    ctx.ORDINARY_NNC_FIXTURES = oldAbsolutiveSingularFixtures.map((fixture) => (
        fixture.id === "shuchi"
            ? {
                ...fixture,
                states: {
                    ...fixture.states,
                    absolutive: {
                        ...fixture.states.absolutive,
                        numberForms: {
                            ...fixture.states.absolutive.numberForms,
                            singular: {
                                ...fixture.states.absolutive.numberForms.singular,
                                surfaceForms: ["poison-static-surface"],
                            },
                        },
                    },
                },
            }
            : fixture
    ));
    ctx.buildOrdinaryNncSurfaceChainResult = () => ({
        surface: "poison-chain-surface",
        surfaceForms: ["poison-chain-surface"],
        soundSpellingFrames: [],
    });
    const poisonedAbsolutiveSingularSurfaceFormsProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: absolutiveSingularFormulaSlots,
        state: "absolutive",
        subject: { subjectPrefix: "", subjectSuffix: "" },
        number: "singular",
        animacy: "inanimate",
    });
    ctx.ORDINARY_NNC_FIXTURES = oldAbsolutiveSingularFixtures;
    ctx.buildOrdinaryNncSurfaceChainResult = oldAbsolutiveSingularSurfaceChainBuilder;
    s.eq(
        "ordinary NNC absolutive singular consumes formula stem and noun-class frames instead of fixture surfaceForms",
        {
            outputResult: ordinaryNncAbsolutiveSingularProbe.result,
            outputSurfaceForms: ordinaryNncAbsolutiveSingularProbe.surfaceForms,
            outputStem: ordinaryNncAbsolutiveSingularProbe.stem,
            sourceFrameKind: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.kind || "",
            operationId: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularOperationFrames?.[0]?.operationId || "",
            sourceStem: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.sourceStem || "",
            nounClass: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.nounClass || "",
            nounClassSurface: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.nounClassSurface || "",
            resultTextSourceFrameKind: ordinaryNncAbsolutiveSingularProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            resultTextOperationId: ordinaryNncAbsolutiveSingularProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceStemIsGeneratedDisplay: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.sourceStemIsGeneratedDisplay,
            consumesRenderedInput: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.consumesRenderedInput,
            displayAuthority: ordinaryNncAbsolutiveSingularProbe.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncAbsolutiveSingularPoisonedPairs, {
                sourceFrame: ordinaryNncAbsolutiveSingularPoisonedSourceFrame,
                operationFrame: ordinaryNncAbsolutiveSingularPoisonedOperationFrame,
            }),
            poisonedStaticSurfaceFormsResult: poisonedAbsolutiveSingularSurfaceFormsProbe.result,
            directMissingSourceFrame: ctx.buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
                operationFrame: absolutiveSingularOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
                sourceFrame: absolutiveSingularSourceFrame,
            }),
            directMissingTargetFrame: ctx.buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
                sourceFrame: absolutiveSingularSourceFrame,
                operationFrame: missingTargetAbsolutiveSingularOperationFrame,
            }),
            missingStructuredSourceBlocks: ctx.buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
                sourceFrame: ctx.buildOrdinaryNncAbsolutiveSingularSourceFrame({
                    sourceStem: "",
                    nounClass: "t",
                    state: "absolutive",
                    number: "singular",
                    animacy: "inanimate",
                }),
                operationFrame: ctx.buildOrdinaryNncAbsolutiveSingularOperationFrame(ctx.buildOrdinaryNncAbsolutiveSingularSourceFrame({
                    sourceStem: "",
                    nounClass: "t",
                    state: "absolutive",
                    number: "singular",
                    animacy: "inanimate",
                })),
            }),
            contradictoryTarget: ctx.buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
                sourceFrame: absolutiveSingularSourceFrame,
                operationFrame: contradictoryAbsolutiveSingularOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAbsolutiveSingularSurfaceFromFrame({
                sourceFrame: absolutiveSingularSourceFrame,
                operationFrame: absolutiveSingularOperationFrame,
            }),
        },
        {
            outputResult: "shuchit",
            outputSurfaceForms: ["shuchit"],
            outputStem: "shuchi",
            sourceFrameKind: "ordinary-nnc-absolutive-singular-source-frame",
            operationId: "ordinary-nnc-absolutive-singular-realization",
            sourceStem: "shuchi",
            nounClass: "t",
            nounClassSurface: "t",
            resultTextSourceFrameKind: "ordinary-nnc-result-text-source-frame",
            resultTextOperationId: "ordinary-nnc-result-text-render",
            sourceStemIsGeneratedDisplay: false,
            consumesRenderedInput: false,
            displayAuthority: false,
            poisonedDisplayResult: "shuchit",
            poisonedStaticSurfaceFormsResult: "shuchit",
            directMissingSourceFrame: "",
            directMissingOperation: "",
            directMissingTargetFrame: "",
            missingStructuredSourceBlocks: "",
            contradictoryTarget: "",
            framedTarget: "shuchit",
        }
    );
    const ordinaryNncCountPluralResultTextProbe = ctx.generateOrdinaryNncParadigm({
        stem: "xilun",
        state: "absolutive",
        number: "plural",
        animacy: "animate",
        subject: {
            subjectPrefix: "ti",
            subjectSuffix: "t",
            personSubKey: "1pl",
            number: "plural",
        },
    });
    const ordinaryNncCountPluralPairs = ordinaryNncCountPluralResultTextProbe.formulaSurfacePairs || [];
    const ordinaryNncCountPluralPoisonedPairs = ordinaryNncCountPluralPairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncCountPluralPoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncCountPluralPoisonedPairs,
    });
    const ordinaryNncCountPluralPoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncCountPluralPoisonedSourceFrame
    );
    const animateCountPluralSourceFrame = ctx.buildOrdinaryNncAnimateCountPluralSourceFrame({
        sourceStem: "xilun",
        sourceSurface: "xilun",
        subject: {
            subjectPrefix: "ti",
            subjectSuffix: "t",
            personSubKey: "1pl",
            number: "plural",
        },
        state: "absolutive",
        animacy: "animate",
        pluralType: "count",
    });
    const animateCountPluralOperationFrame = ctx.buildOrdinaryNncAnimateCountPluralOperationFrame(
        animateCountPluralSourceFrame
    );
    const contradictoryAnimateCountPluralOperationFrame = {
        ...animateCountPluralOperationFrame,
        targetFrame: {
            ...animateCountPluralOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldSubjectPrefixResult = ctx.applyOrdinaryNncSubjectPrefixResult;
    ctx.applyOrdinaryNncSubjectPrefixResult = () => ({
        surface: "poison-surface",
        soundSpellingFrames: [],
    });
    const monkeypatchedCountPluralResultTextProbe = ctx.generateOrdinaryNncParadigm({
        stem: "xilun",
        state: "absolutive",
        number: "plural",
        animacy: "animate",
        subject: {
            subjectPrefix: "ti",
            subjectSuffix: "t",
            personSubKey: "1pl",
            number: "plural",
        },
    });
    ctx.applyOrdinaryNncSubjectPrefixResult = oldSubjectPrefixResult;
    s.eq(
        "ordinary NNC animate count-plural output consumes typed source and operation frames",
        {
            outputResult: ordinaryNncCountPluralResultTextProbe.result,
            outputSurfaceForms: ordinaryNncCountPluralResultTextProbe.surfaceForms,
            sourceFrameKind: ordinaryNncCountPluralResultTextProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            operationId: ordinaryNncCountPluralResultTextProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceFrameSupported: ordinaryNncCountPluralResultTextProbe.ordinaryNncResultTextSourceFrame?.supported === true,
            countPluralSourceFrameKind: ordinaryNncCountPluralResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.kind || "",
            countPluralOperationId: ordinaryNncCountPluralResultTextProbe.ordinaryNncDerivedPluralOperationFrame?.operationId || "",
            countPluralSourceSurfaceIsGeneratedDisplay: ordinaryNncCountPluralResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.sourceSurfaceIsGeneratedDisplay,
            countPluralSourceFrameConsumesRenderedInput: ordinaryNncCountPluralResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.consumesRenderedInput,
            countPluralSourceFrameDisplayAuthority: ordinaryNncCountPluralResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncCountPluralPoisonedPairs, {
                sourceFrame: ordinaryNncCountPluralPoisonedSourceFrame,
                operationFrame: ordinaryNncCountPluralPoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncAnimateCountPluralSurfaceFromFrame({
                sourceFrame: animateCountPluralSourceFrame,
            }),
            contradictoryTarget: ctx.buildOrdinaryNncAnimateCountPluralSurfaceFromFrame({
                sourceFrame: animateCountPluralSourceFrame,
                operationFrame: contradictoryAnimateCountPluralOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAnimateCountPluralSurfaceFromFrame({
                sourceFrame: animateCountPluralSourceFrame,
                operationFrame: animateCountPluralOperationFrame,
            }),
            monkeypatchedResult: monkeypatchedCountPluralResultTextProbe.result,
        },
        {
            outputResult: "tixilunmet",
            outputSurfaceForms: ["tixilunmet"],
            sourceFrameKind: "ordinary-nnc-result-text-source-frame",
            operationId: "ordinary-nnc-result-text-render",
            sourceFrameSupported: true,
            countPluralSourceFrameKind: "ordinary-nnc-animate-count-plural-source-frame",
            countPluralOperationId: "ordinary-nnc-animate-count-plural-realization",
            countPluralSourceSurfaceIsGeneratedDisplay: false,
            countPluralSourceFrameConsumesRenderedInput: false,
            countPluralSourceFrameDisplayAuthority: false,
            poisonedDisplayResult: "tixilunmet",
            directMissingOperation: "",
            contradictoryTarget: "",
            framedTarget: "tixilunmet",
            monkeypatchedResult: "tixilunmet",
        }
    );
    const ordinaryNncPossessiveCountPluralProbe = ctx.generateOrdinaryNncParadigm({
        stem: "mistun",
        state: "possessive",
        possessor: "nu",
        subject: {
            subjectPrefix: "ti",
            subjectSuffix: "t",
            personSubKey: "1pl",
            number: "plural",
        },
        number: "plural",
        pluralType: "count",
        animacy: "animate",
    });
    const ordinaryNncPossessiveCountPluralPairs = ordinaryNncPossessiveCountPluralProbe.formulaSurfacePairs || [];
    const ordinaryNncPossessiveCountPluralPoisonedPairs = ordinaryNncPossessiveCountPluralPairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncPossessiveCountPluralPoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncPossessiveCountPluralPoisonedPairs,
    });
    const ordinaryNncPossessiveCountPluralPoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncPossessiveCountPluralPoisonedSourceFrame
    );
    const possessiveCountPluralSourceFrame = ctx.buildOrdinaryNncAnimatePossessiveCountPluralSourceFrame({
        sourceStem: "mistun",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        subject: {
            subjectPrefix: "ti",
            subjectSuffix: "t",
            personSubKey: "1pl",
            number: "plural",
        },
        state: "possessive",
        animacy: "animate",
        pluralType: "count",
    });
    const possessiveCountPluralOperationFrame = ctx.buildOrdinaryNncAnimatePossessiveCountPluralOperationFrame(
        possessiveCountPluralSourceFrame
    );
    const contradictoryPossessiveCountPluralOperationFrame = {
        ...possessiveCountPluralOperationFrame,
        targetFrame: {
            ...possessiveCountPluralOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldPossessiveCountPluralSubjectPrefix = ctx.applyOrdinaryNncSubjectPrefixResult;
    ctx.applyOrdinaryNncSubjectPrefixResult = () => ({
        surface: "poison-surface",
        soundSpellingFrames: [],
    });
    const monkeypatchedPossessiveCountPlural = ctx.generateOrdinaryNncParadigm({
        stem: "mistun",
        state: "possessive",
        possessor: "nu",
        subject: {
            subjectPrefix: "ti",
            subjectSuffix: "t",
            personSubKey: "1pl",
            number: "plural",
        },
        number: "plural",
        pluralType: "count",
        animacy: "animate",
    });
    ctx.applyOrdinaryNncSubjectPrefixResult = oldPossessiveCountPluralSubjectPrefix;
    s.eq(
        "ordinary NNC animate possessive count plural consumes typed source and operation frames",
        {
            outputResult: ordinaryNncPossessiveCountPluralProbe.result,
            outputSurfaceForms: ordinaryNncPossessiveCountPluralProbe.surfaceForms,
            resultSourceFrameKind: ordinaryNncPossessiveCountPluralProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            resultOperationId: ordinaryNncPossessiveCountPluralProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            possessiveCountSourceFrameKind: ordinaryNncPossessiveCountPluralProbe.ordinaryNncDerivedPluralSourceFrame?.kind || "",
            possessiveCountOperationId: ordinaryNncPossessiveCountPluralProbe.ordinaryNncDerivedPluralOperationFrame?.operationId || "",
            possessiveCountSourceStemIsGeneratedDisplay: ordinaryNncPossessiveCountPluralProbe.ordinaryNncDerivedPluralSourceFrame?.sourceStemIsGeneratedDisplay,
            possessiveCountConsumesRenderedInput: ordinaryNncPossessiveCountPluralProbe.ordinaryNncDerivedPluralSourceFrame?.consumesRenderedInput,
            possessiveCountDisplayAuthority: ordinaryNncPossessiveCountPluralProbe.ordinaryNncDerivedPluralSourceFrame?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncPossessiveCountPluralPoisonedPairs, {
                sourceFrame: ordinaryNncPossessiveCountPluralPoisonedSourceFrame,
                operationFrame: ordinaryNncPossessiveCountPluralPoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncAnimatePossessiveCountPluralSurfaceFromFrame({
                sourceFrame: possessiveCountPluralSourceFrame,
            }),
            oldStringApiBlocked: ctx.applyOrdinaryNncSubjectPrefixResult(
                "numistun",
                { subjectPrefix: "ti", subjectSuffix: "t" },
                "possessive",
                "animate"
            ).surface,
            contradictoryTarget: ctx.buildOrdinaryNncAnimatePossessiveCountPluralSurfaceFromFrame({
                sourceFrame: possessiveCountPluralSourceFrame,
                operationFrame: contradictoryPossessiveCountPluralOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAnimatePossessiveCountPluralSurfaceFromFrame({
                sourceFrame: possessiveCountPluralSourceFrame,
                operationFrame: possessiveCountPluralOperationFrame,
            }),
            monkeypatchedResult: monkeypatchedPossessiveCountPlural.result,
        },
        {
            outputResult: "tinumistun",
            outputSurfaceForms: ["tinumistun"],
            resultSourceFrameKind: "ordinary-nnc-result-text-source-frame",
            resultOperationId: "ordinary-nnc-result-text-render",
            possessiveCountSourceFrameKind: "ordinary-nnc-animate-possessive-count-plural-source-frame",
            possessiveCountOperationId: "ordinary-nnc-animate-possessive-count-plural-realization",
            possessiveCountSourceStemIsGeneratedDisplay: false,
            possessiveCountConsumesRenderedInput: false,
            possessiveCountDisplayAuthority: false,
            poisonedDisplayResult: "tinumistun",
            directMissingOperation: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "tinumistun",
            monkeypatchedResult: "tinumistun",
        }
    );
    const ordinaryNncDistributiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "xilun",
        state: "absolutive",
        number: "plural",
        pluralType: "distributive",
        nounClass: "zero",
    });
    const ordinaryNncDistributiveResultTextProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: ordinaryNncDistributiveFormulaSlots,
        state: "absolutive",
        number: "plural",
        pluralType: "distributive",
        animacy: "inanimate",
    });
    const ordinaryNncDistributivePairs = ordinaryNncDistributiveResultTextProbe.formulaSurfacePairs || [];
    const ordinaryNncDistributivePoisonedPairs = ordinaryNncDistributivePairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncDistributivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncDistributivePoisonedPairs,
    });
    const ordinaryNncDistributivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncDistributivePoisonedSourceFrame
    );
    const distributivePriorSourceFrame = ctx.buildOrdinaryNncAbsolutiveSingularSourceFrame({
        sourceStem: "xilun",
        nounClass: "zero",
        state: "absolutive",
        number: "singular",
        animacy: "inanimate",
    });
    const distributivePriorOperationFrame = ctx.buildOrdinaryNncAbsolutiveSingularOperationFrame(
        distributivePriorSourceFrame
    );
    const distributiveStringOnlySourceFrame = ctx.buildOrdinaryNncDistributiveReduplicationSourceFrame({
        sourceSurface: "xilun",
        state: "absolutive",
        animacy: "inanimate",
        pluralType: "distributive",
    });
    const distributiveMissingPriorOperationSourceFrame = ctx.buildOrdinaryNncDistributiveReduplicationSourceFrame({
        sourceSurface: "xilun",
        priorSourceFrame: distributivePriorSourceFrame,
        state: "absolutive",
        animacy: "inanimate",
        pluralType: "distributive",
    });
    const distributiveContradictoryPriorSourceFrame = ctx.buildOrdinaryNncDistributiveReduplicationSourceFrame({
        sourceSurface: "poison-source-surface",
        priorSourceFrame: distributivePriorSourceFrame,
        priorOperationFrame: distributivePriorOperationFrame,
        state: "absolutive",
        animacy: "inanimate",
        pluralType: "distributive",
    });
    const distributiveSourceFrame = ctx.buildOrdinaryNncDistributiveReduplicationSourceFrame({
        sourceSurface: "xilun",
        priorSourceFrame: distributivePriorSourceFrame,
        priorOperationFrame: distributivePriorOperationFrame,
        state: "absolutive",
        animacy: "inanimate",
        pluralType: "distributive",
    });
    const distributiveOperationFrame = ctx.buildOrdinaryNncDistributiveReduplicationOperationFrame(distributiveSourceFrame);
    const contradictoryDistributiveOperationFrame = {
        ...distributiveOperationFrame,
        targetFrame: {
            ...distributiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldReduplicatedSurfaceBuilder = ctx.buildOrdinaryNncReduplicatedSurface;
    ctx.buildOrdinaryNncReduplicatedSurface = () => "poison-surface";
    const monkeypatchedDistributive = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: ordinaryNncDistributiveFormulaSlots,
        state: "absolutive",
        number: "plural",
        pluralType: "distributive",
        animacy: "inanimate",
    });
    ctx.buildOrdinaryNncReduplicatedSurface = oldReduplicatedSurfaceBuilder;
    s.eq(
        "ordinary NNC distributive plural reduplication consumes typed source and operation frames",
        {
            outputResult: ordinaryNncDistributiveResultTextProbe.result,
            outputSurfaceForms: ordinaryNncDistributiveResultTextProbe.surfaceForms,
            outputStem: ordinaryNncDistributiveResultTextProbe.stem,
            sourceFrameKind: ordinaryNncDistributiveResultTextProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            operationId: ordinaryNncDistributiveResultTextProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceFrameSupported: ordinaryNncDistributiveResultTextProbe.ordinaryNncResultTextSourceFrame?.supported === true,
            derivedSourceFrameKind: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.kind || "",
            derivedOperationId: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralOperationFrame?.operationId || "",
            derivedSourceSurface: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.sourceSurface || "",
            derivedSourceStem: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.sourceStem || "",
            derivedNounClass: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.nounClass || "",
            derivedSourceSurfaceRole: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.sourceSurfaceRole || "",
            derivedPriorSourceFrameKind: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.priorSourceFrameKind || "",
            derivedPriorOperationId: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.priorOperationId || "",
            derivedPriorTargetSurface: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.priorOperationTargetSurface || "",
            derivedSourceSurfaceIsGeneratedDisplay: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.sourceSurfaceIsGeneratedDisplay,
            derivedSourceFrameConsumesRenderedInput: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.consumesRenderedInput,
            derivedSourceFrameDisplayAuthority: ordinaryNncDistributiveResultTextProbe.ordinaryNncDerivedPluralSourceFrame?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncDistributivePoisonedPairs, {
                sourceFrame: ordinaryNncDistributivePoisonedSourceFrame,
                operationFrame: ordinaryNncDistributivePoisonedOperationFrame,
            }),
            directStringOnlySourceSupported: distributiveStringOnlySourceFrame.supported === true,
            directStringOnlySourceTarget: ctx.buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame({
                sourceFrame: distributiveStringOnlySourceFrame,
                operationFrame: ctx.buildOrdinaryNncDistributiveReduplicationOperationFrame(distributiveStringOnlySourceFrame),
            }),
            missingPriorOperationSupported: distributiveMissingPriorOperationSourceFrame.supported === true,
            contradictoryPriorSupported: distributiveContradictoryPriorSourceFrame.supported === true,
            directMissingOperation: ctx.buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame({
                sourceFrame: distributiveSourceFrame,
            }),
            directMissingTargetFrame: ctx.buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame({
                sourceFrame: distributiveSourceFrame,
                operationFrame: {
                    ...distributiveOperationFrame,
                    targetFrame: null,
                },
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncReduplicatedSurface("xilun"),
            contradictoryTarget: ctx.buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame({
                sourceFrame: distributiveSourceFrame,
                operationFrame: contradictoryDistributiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncDistributiveReduplicatedSurfaceFromFrame({
                sourceFrame: distributiveSourceFrame,
                operationFrame: distributiveOperationFrame,
            }),
            sourceFrameConsumesRenderedInput: distributiveSourceFrame.consumesRenderedInput,
            sourceFrameDisplayAuthority: distributiveSourceFrame.displayStringsAuthorizeGrammar,
            monkeypatchedResult: monkeypatchedDistributive.result,
        },
        {
            outputResult: "xijxilun",
            outputSurfaceForms: ["xijxilun"],
            outputStem: "xilun",
            sourceFrameKind: "ordinary-nnc-result-text-source-frame",
            operationId: "ordinary-nnc-result-text-render",
            sourceFrameSupported: true,
            derivedSourceFrameKind: "ordinary-nnc-distributive-reduplication-source-frame",
            derivedOperationId: "ordinary-nnc-distributive-reduplication",
            derivedSourceSurface: "xilun",
            derivedSourceStem: "xilun",
            derivedNounClass: "zero",
            derivedSourceSurfaceRole: "ordinary-nnc-prior-typed-absolutive-singular-source-form",
            derivedPriorSourceFrameKind: "ordinary-nnc-absolutive-singular-source-frame",
            derivedPriorOperationId: "ordinary-nnc-absolutive-singular-realization",
            derivedPriorTargetSurface: "xilun",
            derivedSourceSurfaceIsGeneratedDisplay: false,
            derivedSourceFrameConsumesRenderedInput: false,
            derivedSourceFrameDisplayAuthority: false,
            poisonedDisplayResult: "xijxilun",
            directStringOnlySourceSupported: false,
            directStringOnlySourceTarget: "",
            missingPriorOperationSupported: false,
            contradictoryPriorSupported: false,
            directMissingOperation: "",
            directMissingTargetFrame: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "xijxilun",
            sourceFrameConsumesRenderedInput: false,
            sourceFrameDisplayAuthority: false,
            monkeypatchedResult: "xijxilun",
        }
    );
    const animateDistributiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "tapiyal",
        state: "absolutive",
        number: "plural",
        pluralType: "distributive",
        nounClass: "zero",
        subject: { subjectPrefix: "ti", subjectSuffix: "t" },
    });
    const ordinaryNncAnimateDistributiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: animateDistributiveFormulaSlots,
        state: "absolutive",
        subject: { subjectPrefix: "ti", subjectSuffix: "t" },
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    const ordinaryNncAnimateDistributivePairs = ordinaryNncAnimateDistributiveProbe.formulaSurfacePairs || [];
    const ordinaryNncAnimateDistributivePoisonedPairs = ordinaryNncAnimateDistributivePairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncAnimateDistributivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncAnimateDistributivePoisonedPairs,
    });
    const ordinaryNncAnimateDistributivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncAnimateDistributivePoisonedSourceFrame
    );
    const animateDistributiveSourceFrame = ctx.buildOrdinaryNncAnimateDistributiveSourceFrame({
        sourceStem: "tapiyal",
        subject: { subjectPrefix: "ti", subjectSuffix: "t" },
        state: "absolutive",
        animacy: "animate",
        pluralType: "distributive",
    });
    const animateDistributiveOperationFrame = ctx.buildOrdinaryNncAnimateDistributiveOperationFrame(
        animateDistributiveSourceFrame
    );
    const contradictoryAnimateDistributiveOperationFrame = {
        ...animateDistributiveOperationFrame,
        targetFrame: {
            ...animateDistributiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldReduplicatedSurfaceBuilderForAnimate = ctx.buildOrdinaryNncReduplicatedSurface;
    ctx.buildOrdinaryNncReduplicatedSurface = () => "poison-surface";
    const monkeypatchedAnimateDistributive = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: animateDistributiveFormulaSlots,
        state: "absolutive",
        subject: { subjectPrefix: "ti", subjectSuffix: "t" },
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    ctx.buildOrdinaryNncReduplicatedSurface = oldReduplicatedSurfaceBuilderForAnimate;
    s.eq(
        "ordinary NNC animate distributive plural consumes typed source and operation frames",
        {
            outputResult: ordinaryNncAnimateDistributiveProbe.result,
            outputSurfaceForms: ordinaryNncAnimateDistributiveProbe.surfaceForms,
            outputStem: ordinaryNncAnimateDistributiveProbe.stem,
            sourceFrameKind: ordinaryNncAnimateDistributiveProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            operationId: ordinaryNncAnimateDistributiveProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceFrameSupported: ordinaryNncAnimateDistributiveProbe.ordinaryNncResultTextSourceFrame?.supported === true,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncAnimateDistributivePoisonedPairs, {
                sourceFrame: ordinaryNncAnimateDistributivePoisonedSourceFrame,
                operationFrame: ordinaryNncAnimateDistributivePoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncAnimateDistributiveSurfaceFromFrame({
                sourceFrame: animateDistributiveSourceFrame,
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncReduplicatedSurface("tapiyal"),
            contradictoryTarget: ctx.buildOrdinaryNncAnimateDistributiveSurfaceFromFrame({
                sourceFrame: animateDistributiveSourceFrame,
                operationFrame: contradictoryAnimateDistributiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAnimateDistributiveSurfaceFromFrame({
                sourceFrame: animateDistributiveSourceFrame,
                operationFrame: animateDistributiveOperationFrame,
            }),
            sourceFrameConsumesRenderedInput: animateDistributiveSourceFrame.consumesRenderedInput,
            sourceFrameDisplayAuthority: animateDistributiveSourceFrame.displayStringsAuthorizeGrammar,
            monkeypatchedResult: monkeypatchedAnimateDistributive.result,
        },
        {
            outputResult: "titajtapiyalmet",
            outputSurfaceForms: ["titajtapiyalmet"],
            outputStem: "tapiyal",
            sourceFrameKind: "ordinary-nnc-result-text-source-frame",
            operationId: "ordinary-nnc-result-text-render",
            sourceFrameSupported: true,
            poisonedDisplayResult: "titajtapiyalmet",
            directMissingOperation: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "titajtapiyalmet",
            sourceFrameConsumesRenderedInput: false,
            sourceFrameDisplayAuthority: false,
            monkeypatchedResult: "titajtapiyalmet",
        }
    );
    const possessiveDistributiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "tapiyal",
        state: "possessive",
        number: "plural",
        pluralType: "distributive",
        nounClass: "zero",
    });
    const ordinaryNncPossessiveDistributiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: possessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "tu",
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    const ordinaryNncPossessiveDistributivePairs = ordinaryNncPossessiveDistributiveProbe.formulaSurfacePairs || [];
    const ordinaryNncPossessiveDistributivePoisonedPairs = ordinaryNncPossessiveDistributivePairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncPossessiveDistributivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncPossessiveDistributivePoisonedPairs,
    });
    const ordinaryNncPossessiveDistributivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncPossessiveDistributivePoisonedSourceFrame
    );
    const possessiveDistributiveSourceFrame = ctx.buildOrdinaryNncPossessiveDistributiveSourceFrame({
        sourceStem: "tapiyal",
        possessor: ctx.resolveOrdinaryNncPossessor("tu"),
        state: "possessive",
        animacy: "animate",
        pluralType: "distributive",
    });
    const possessiveDistributiveOperationFrame = ctx.buildOrdinaryNncPossessiveDistributiveOperationFrame(
        possessiveDistributiveSourceFrame
    );
    const contradictoryPossessiveDistributiveOperationFrame = {
        ...possessiveDistributiveOperationFrame,
        targetFrame: {
            ...possessiveDistributiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldPossessiveDistributiveBuilder = ctx.buildOrdinaryNncPossessiveDistributiveSurface;
    ctx.buildOrdinaryNncPossessiveDistributiveSurface = () => "poison-surface";
    const monkeypatchedPossessiveDistributive = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: possessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "tu",
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    ctx.buildOrdinaryNncPossessiveDistributiveSurface = oldPossessiveDistributiveBuilder;
    s.eq(
        "ordinary NNC possessive distributive plural consumes typed source and operation frames",
        {
            outputResult: ordinaryNncPossessiveDistributiveProbe.result,
            outputSurfaceForms: ordinaryNncPossessiveDistributiveProbe.surfaceForms,
            outputStem: ordinaryNncPossessiveDistributiveProbe.stem,
            sourceFrameKind: ordinaryNncPossessiveDistributiveProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            operationId: ordinaryNncPossessiveDistributiveProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceFrameSupported: ordinaryNncPossessiveDistributiveProbe.ordinaryNncResultTextSourceFrame?.supported === true,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncPossessiveDistributivePoisonedPairs, {
                sourceFrame: ordinaryNncPossessiveDistributivePoisonedSourceFrame,
                operationFrame: ordinaryNncPossessiveDistributivePoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncPossessiveDistributiveSurfaceFromFrame({
                sourceFrame: possessiveDistributiveSourceFrame,
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncPossessiveDistributiveSurface("tutapiyalwan", ctx.resolveOrdinaryNncPossessor("tu")),
            contradictoryTarget: ctx.buildOrdinaryNncPossessiveDistributiveSurfaceFromFrame({
                sourceFrame: possessiveDistributiveSourceFrame,
                operationFrame: contradictoryPossessiveDistributiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncPossessiveDistributiveSurfaceFromFrame({
                sourceFrame: possessiveDistributiveSourceFrame,
                operationFrame: possessiveDistributiveOperationFrame,
            }),
            sourceFrameConsumesRenderedInput: possessiveDistributiveSourceFrame.consumesRenderedInput,
            sourceFrameDisplayAuthority: possessiveDistributiveSourceFrame.displayStringsAuthorizeGrammar,
            monkeypatchedResult: monkeypatchedPossessiveDistributive.result,
        },
        {
            outputResult: "tutajtapiyalwan",
            outputSurfaceForms: ["tutajtapiyalwan"],
            outputStem: "tapiyal",
            sourceFrameKind: "ordinary-nnc-result-text-source-frame",
            operationId: "ordinary-nnc-result-text-render",
            sourceFrameSupported: true,
            poisonedDisplayResult: "tutajtapiyalwan",
            directMissingOperation: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "tutajtapiyalwan",
            sourceFrameConsumesRenderedInput: false,
            sourceFrameDisplayAuthority: false,
            monkeypatchedResult: "tutajtapiyalwan",
        }
    );
    const possessiveDistributiveSubject = {
        subjectPrefix: "ti",
        subjectSuffix: "t",
        personSubKey: "1pl",
        number: "plural",
    };
    const ordinaryNncPossessiveDistributiveSubjectProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: possessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "tu",
        subject: possessiveDistributiveSubject,
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    const ordinaryNncPossessiveDistributiveSubjectPairs = ordinaryNncPossessiveDistributiveSubjectProbe.formulaSurfacePairs || [];
    const ordinaryNncPossessiveDistributiveSubjectPoisonedPairs = ordinaryNncPossessiveDistributiveSubjectPairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncPossessiveDistributiveSubjectPoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncPossessiveDistributiveSubjectPoisonedPairs,
    });
    const ordinaryNncPossessiveDistributiveSubjectPoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncPossessiveDistributiveSubjectPoisonedSourceFrame
    );
    const possessiveDistributiveSubjectSourceFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
        sourceStem: "tapiyal",
        sourceSurface: possessiveDistributiveOperationFrame.targetFrame.surface,
        sourceSurfaceRole: "ordinary-nnc-prior-typed-derived-source-form",
        priorSourceFrame: possessiveDistributiveSourceFrame,
        priorOperationFrame: possessiveDistributiveOperationFrame,
        subject: possessiveDistributiveSubject,
        state: "possessive",
        animacy: "animate",
    });
    const possessiveDistributiveSubjectOperationFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixOperationFrame(
        possessiveDistributiveSubjectSourceFrame
    );
    const contradictoryPossessiveDistributiveSubjectOperationFrame = {
        ...possessiveDistributiveSubjectOperationFrame,
        targetFrame: {
            ...possessiveDistributiveSubjectOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldPossessiveDistributiveSubjectPrefixBuilder = ctx.applyOrdinaryNncSubjectPrefixResult;
    ctx.applyOrdinaryNncSubjectPrefixResult = () => ({
        surface: "poison-subject-surface",
        soundSpellingFrames: [],
    });
    const monkeypatchedPossessiveDistributiveSubject = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: possessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "tu",
        subject: possessiveDistributiveSubject,
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    ctx.applyOrdinaryNncSubjectPrefixResult = oldPossessiveDistributiveSubjectPrefixBuilder;
    s.eq(
        "ordinary NNC possessive distributive subject prefix consumes prior typed frames",
        {
            outputResult: ordinaryNncPossessiveDistributiveSubjectProbe.result,
            outputSurfaceForms: ordinaryNncPossessiveDistributiveSubjectProbe.surfaceForms,
            derivedSourceFrameKind: ordinaryNncPossessiveDistributiveSubjectProbe.ordinaryNncDerivedPluralSourceFrame?.kind || "",
            derivedOperationId: ordinaryNncPossessiveDistributiveSubjectProbe.ordinaryNncDerivedPluralOperationFrame?.operationId || "",
            priorOperationId: ordinaryNncPossessiveDistributiveSubjectProbe.ordinaryNncDerivedPluralSourceFrame?.priorOperationId || "",
            sourceSurfaceRole: ordinaryNncPossessiveDistributiveSubjectProbe.ordinaryNncDerivedPluralSourceFrame?.sourceSurfaceRole || "",
            sourceSurfaceIsGeneratedDisplay: ordinaryNncPossessiveDistributiveSubjectProbe.ordinaryNncDerivedPluralSourceFrame?.sourceSurfaceIsGeneratedDisplay,
            consumesRenderedInput: ordinaryNncPossessiveDistributiveSubjectProbe.ordinaryNncDerivedPluralSourceFrame?.consumesRenderedInput,
            displayAuthority: ordinaryNncPossessiveDistributiveSubjectProbe.ordinaryNncDerivedPluralSourceFrame?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncPossessiveDistributiveSubjectPoisonedPairs, {
                sourceFrame: ordinaryNncPossessiveDistributiveSubjectPoisonedSourceFrame,
                operationFrame: ordinaryNncPossessiveDistributiveSubjectPoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: possessiveDistributiveSubjectSourceFrame,
            }),
            oldStringApiBlocked: ctx.applyOrdinaryNncSubjectPrefixResult(
                "tutajtapiyalwan",
                possessiveDistributiveSubject,
                "possessive",
                "animate"
            ).surface,
            contradictoryTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: possessiveDistributiveSubjectSourceFrame,
                operationFrame: contradictoryPossessiveDistributiveSubjectOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: possessiveDistributiveSubjectSourceFrame,
                operationFrame: possessiveDistributiveSubjectOperationFrame,
            }),
            monkeypatchedResult: monkeypatchedPossessiveDistributiveSubject.result,
        },
        {
            outputResult: "titutajtapiyalwan",
            outputSurfaceForms: ["titutajtapiyalwan"],
            derivedSourceFrameKind: "ordinary-nnc-animate-subject-prefix-source-frame",
            derivedOperationId: "ordinary-nnc-animate-subject-prefix-realization",
            priorOperationId: "ordinary-nnc-possessive-distributive-realization",
            sourceSurfaceRole: "ordinary-nnc-prior-typed-derived-source-form",
            sourceSurfaceIsGeneratedDisplay: false,
            consumesRenderedInput: false,
            displayAuthority: false,
            poisonedDisplayResult: "titutajtapiyalwan",
            directMissingOperation: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "titutajtapiyalwan",
            monkeypatchedResult: "titutajtapiyalwan",
        }
    );
    const possessiveSingularPossessorPluralFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "mistun",
        state: "possessive",
        number: "plural",
        pluralType: "distributive",
        nounClass: "zero",
    });
    const ordinaryNncPossessiveSingularPossessorPluralProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: possessiveSingularPossessorPluralFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    const ordinaryNncPossessiveSingularPossessorPluralPairs = ordinaryNncPossessiveSingularPossessorPluralProbe.formulaSurfacePairs || [];
    const ordinaryNncPossessiveSingularPossessorPluralPoisonedPairs = ordinaryNncPossessiveSingularPossessorPluralPairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncPossessiveSingularPossessorPluralPoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncPossessiveSingularPossessorPluralPoisonedPairs,
    });
    const ordinaryNncPossessiveSingularPossessorPluralPoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncPossessiveSingularPossessorPluralPoisonedSourceFrame
    );
    const singularPossessorPriorSourceFrame = ctx.buildOrdinaryNncOpenStemPossessiveSourceFrame({
        sourceStem: "mistun",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        animacy: "animate",
    });
    const singularPossessorPriorOperationFrame = ctx.buildOrdinaryNncOpenStemPossessiveOperationFrame(
        singularPossessorPriorSourceFrame
    );
    const singularPossessorPluralIdentitySourceFrame = ctx.buildOrdinaryNncAnimatePossessivePluralIdentitySourceFrame({
        sourceStem: "mistun",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        state: "possessive",
        animacy: "animate",
        pluralType: "distributive",
        priorSourceFrame: singularPossessorPriorSourceFrame,
        priorOperationFrame: singularPossessorPriorOperationFrame,
    });
    const singularPossessorPluralIdentityOperationFrame = ctx.buildOrdinaryNncAnimatePossessivePluralIdentityOperationFrame(
        singularPossessorPluralIdentitySourceFrame
    );
    const singularPossessorMissingPriorSourceFrame = ctx.buildOrdinaryNncAnimatePossessivePluralIdentitySourceFrame({
        sourceStem: "mistun",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        state: "possessive",
        animacy: "animate",
        pluralType: "distributive",
        priorSourceFrame: singularPossessorPriorSourceFrame,
    });
    const singularPossessorContradictoryPriorSourceFrame = ctx.buildOrdinaryNncAnimatePossessivePluralIdentitySourceFrame({
        sourceStem: "mistun",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        state: "possessive",
        animacy: "animate",
        pluralType: "distributive",
        priorSourceFrame: singularPossessorPriorSourceFrame,
        priorOperationFrame: {
            ...singularPossessorPriorOperationFrame,
            targetFrame: {
                ...singularPossessorPriorOperationFrame.targetFrame,
                surface: "poison-surface",
            },
        },
    });
    const contradictorySingularPossessorIdentityOperationFrame = {
        ...singularPossessorPluralIdentityOperationFrame,
        targetFrame: {
            ...singularPossessorPluralIdentityOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldAnimatePossessivePluralBuilder = ctx.buildOrdinaryNncAnimatePossessivePluralForms;
    ctx.buildOrdinaryNncAnimatePossessivePluralForms = () => ["poison-surface"];
    const monkeypatchedPossessiveSingularPossessorPlural = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: possessiveSingularPossessorPluralFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "plural",
        pluralType: "distributive",
        animacy: "animate",
    });
    ctx.buildOrdinaryNncAnimatePossessivePluralForms = oldAnimatePossessivePluralBuilder;
    s.eq(
        "ordinary NNC animate possessive singular-possessor plural consumes prior typed possessive frames",
        {
            outputResult: ordinaryNncPossessiveSingularPossessorPluralProbe.result,
            outputSurfaceForms: ordinaryNncPossessiveSingularPossessorPluralProbe.surfaceForms,
            outputStem: ordinaryNncPossessiveSingularPossessorPluralProbe.stem,
            derivedSourceFrameKind: ordinaryNncPossessiveSingularPossessorPluralProbe.ordinaryNncDerivedPluralSourceFrame?.kind || "",
            derivedOperationId: ordinaryNncPossessiveSingularPossessorPluralProbe.ordinaryNncDerivedPluralOperationFrame?.operationId || "",
            priorOperationId: ordinaryNncPossessiveSingularPossessorPluralProbe.ordinaryNncDerivedPluralSourceFrame?.priorOperationId || "",
            priorTargetSurface: ordinaryNncPossessiveSingularPossessorPluralProbe.ordinaryNncDerivedPluralSourceFrame?.priorOperationTargetSurface || "",
            sourceStemIsGeneratedDisplay: ordinaryNncPossessiveSingularPossessorPluralProbe.ordinaryNncDerivedPluralSourceFrame?.sourceStemIsGeneratedDisplay,
            consumesRenderedInput: ordinaryNncPossessiveSingularPossessorPluralProbe.ordinaryNncDerivedPluralSourceFrame?.consumesRenderedInput,
            displayAuthority: ordinaryNncPossessiveSingularPossessorPluralProbe.ordinaryNncDerivedPluralSourceFrame?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncPossessiveSingularPossessorPluralPoisonedPairs, {
                sourceFrame: ordinaryNncPossessiveSingularPossessorPluralPoisonedSourceFrame,
                operationFrame: ordinaryNncPossessiveSingularPossessorPluralPoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame({
                sourceFrame: singularPossessorPluralIdentitySourceFrame,
            }),
            directMissingTargetFrame: ctx.buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame({
                sourceFrame: singularPossessorPluralIdentitySourceFrame,
                operationFrame: {
                    ...singularPossessorPluralIdentityOperationFrame,
                    targetFrame: null,
                },
            }),
            missingPriorOperationSupported: singularPossessorMissingPriorSourceFrame.supported === true,
            contradictoryPriorSupported: singularPossessorContradictoryPriorSourceFrame.supported === true,
            oldStringApiBlocked: ctx.buildOrdinaryNncAnimatePossessivePluralForms(["numistun"], {
                possessor: ctx.resolveOrdinaryNncPossessor("nu"),
                pluralType: "distributive",
            }),
            contradictoryTarget: ctx.buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame({
                sourceFrame: singularPossessorPluralIdentitySourceFrame,
                operationFrame: contradictorySingularPossessorIdentityOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAnimatePossessivePluralIdentitySurfaceFromFrame({
                sourceFrame: singularPossessorPluralIdentitySourceFrame,
                operationFrame: singularPossessorPluralIdentityOperationFrame,
            }),
            monkeypatchedResult: monkeypatchedPossessiveSingularPossessorPlural.result,
        },
        {
            outputResult: "numistun",
            outputSurfaceForms: ["numistun"],
            outputStem: "mistun",
            derivedSourceFrameKind: "ordinary-nnc-animate-possessive-plural-identity-source-frame",
            derivedOperationId: "ordinary-nnc-animate-possessive-plural-identity",
            priorOperationId: "ordinary-nnc-open-stem-possessive-realization",
            priorTargetSurface: "numistun",
            sourceStemIsGeneratedDisplay: false,
            consumesRenderedInput: false,
            displayAuthority: false,
            poisonedDisplayResult: "numistun",
            directMissingOperation: "",
            directMissingTargetFrame: "",
            missingPriorOperationSupported: false,
            contradictoryPriorSupported: false,
            oldStringApiBlocked: [],
            contradictoryTarget: "",
            framedTarget: "numistun",
            monkeypatchedResult: "numistun",
        }
    );
    const nonanimatePossessiveDistributiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "kal",
        state: "possessive",
        number: "plural",
        pluralType: "distributive",
        nounClass: "zero",
    });
    const ordinaryNncNonanimatePossessiveDistributiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: nonanimatePossessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "plural",
        pluralType: "distributive",
        animacy: "inanimate",
    });
    const ordinaryNncNonanimatePossessiveDistributivePairs = ordinaryNncNonanimatePossessiveDistributiveProbe.formulaSurfacePairs || [];
    const ordinaryNncNonanimatePossessiveDistributivePoisonedPairs = ordinaryNncNonanimatePossessiveDistributivePairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncNonanimatePossessiveDistributivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncNonanimatePossessiveDistributivePoisonedPairs,
    });
    const ordinaryNncNonanimatePossessiveDistributivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncNonanimatePossessiveDistributivePoisonedSourceFrame
    );
    const nonanimatePossessiveDistributiveSourceFrame = ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSourceFrame({
        sourceStem: "kal",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        state: "possessive",
        animacy: "inanimate",
        pluralType: "distributive",
    });
    const nonanimatePossessiveDistributiveOperationFrame = ctx.buildOrdinaryNncNonanimatePossessiveDistributiveOperationFrame(
        nonanimatePossessiveDistributiveSourceFrame
    );
    const contradictoryNonanimatePossessiveDistributiveOperationFrame = {
        ...nonanimatePossessiveDistributiveOperationFrame,
        targetFrame: {
            ...nonanimatePossessiveDistributiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldPossessiveDistributiveResultBuilder = ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult;
    const oldPossessiveDistributiveSurfaceChainBuilder = ctx.buildOrdinaryNncSurfaceChainResult;
    ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult = () => ({
        surface: "poison-surface",
        soundSpellingFrames: [],
    });
    ctx.buildOrdinaryNncSurfaceChainResult = () => ({
        surface: "poison-chain-surface",
        soundSpellingFrames: [],
    });
    const monkeypatchedNonanimatePossessiveDistributive = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: nonanimatePossessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "plural",
        pluralType: "distributive",
        animacy: "inanimate",
    });
    ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult = oldPossessiveDistributiveResultBuilder;
    ctx.buildOrdinaryNncSurfaceChainResult = oldPossessiveDistributiveSurfaceChainBuilder;
    s.eq(
        "ordinary NNC nonanimate possessive distributive plural consumes typed source and operation frames",
        {
            outputResult: ordinaryNncNonanimatePossessiveDistributiveProbe.result,
            outputSurfaceForms: ordinaryNncNonanimatePossessiveDistributiveProbe.surfaceForms,
            outputStem: ordinaryNncNonanimatePossessiveDistributiveProbe.stem,
            resultSourceFrameKind: ordinaryNncNonanimatePossessiveDistributiveProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            resultOperationId: ordinaryNncNonanimatePossessiveDistributiveProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            possessiveDistributiveSourceFrameKind: ordinaryNncNonanimatePossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.kind || "",
            possessiveDistributiveOperationId: ordinaryNncNonanimatePossessiveDistributiveProbe.ordinaryNncDerivedPluralOperationFrame?.operationId || "",
            possessiveDistributiveSourceStemIsGeneratedDisplay: ordinaryNncNonanimatePossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.sourceStemIsGeneratedDisplay,
            possessiveDistributiveConsumesRenderedInput: ordinaryNncNonanimatePossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.consumesRenderedInput,
            possessiveDistributiveDisplayAuthority: ordinaryNncNonanimatePossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncNonanimatePossessiveDistributivePoisonedPairs, {
                sourceFrame: ordinaryNncNonanimatePossessiveDistributivePoisonedSourceFrame,
                operationFrame: ordinaryNncNonanimatePossessiveDistributivePoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonanimatePossessiveDistributiveSourceFrame,
            }),
            directMissingSource: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                operationFrame: nonanimatePossessiveDistributiveOperationFrame,
            }),
            directMissingTarget: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonanimatePossessiveDistributiveSourceFrame,
                operationFrame: {
                    ...nonanimatePossessiveDistributiveOperationFrame,
                    targetFrame: null,
                },
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult(
                "nukal",
                ctx.resolveOrdinaryNncPossessor("nu")
            ).surface,
            contradictoryTarget: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonanimatePossessiveDistributiveSourceFrame,
                operationFrame: contradictoryNonanimatePossessiveDistributiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonanimatePossessiveDistributiveSourceFrame,
                operationFrame: nonanimatePossessiveDistributiveOperationFrame,
            }),
            monkeypatchedResult: monkeypatchedNonanimatePossessiveDistributive.result,
        },
        {
            outputResult: "nukajkal",
            outputSurfaceForms: ["nukajkal"],
            outputStem: "kal",
            resultSourceFrameKind: "ordinary-nnc-result-text-source-frame",
            resultOperationId: "ordinary-nnc-result-text-render",
            possessiveDistributiveSourceFrameKind: "ordinary-nnc-nonanimate-possessive-distributive-source-frame",
            possessiveDistributiveOperationId: "ordinary-nnc-nonanimate-possessive-distributive-realization",
            possessiveDistributiveSourceStemIsGeneratedDisplay: false,
            possessiveDistributiveConsumesRenderedInput: false,
            possessiveDistributiveDisplayAuthority: false,
            poisonedDisplayResult: "nukajkal",
            directMissingOperation: "",
            directMissingSource: "",
            directMissingTarget: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "nukajkal",
            monkeypatchedResult: "nukajkal",
        }
    );
    const nonzeroPossessiveDistributiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "shuchi",
        state: "possessive",
        number: "plural",
        pluralType: "distributive",
        nounClass: "t",
    });
    const ordinaryNncNonzeroPossessiveDistributiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: nonzeroPossessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "plural",
        pluralType: "distributive",
        animacy: "inanimate",
    });
    const ordinaryNncNonzeroPossessiveDistributivePairs = ordinaryNncNonzeroPossessiveDistributiveProbe.formulaSurfacePairs || [];
    const ordinaryNncNonzeroPossessiveDistributivePoisonedPairs = ordinaryNncNonzeroPossessiveDistributivePairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncNonzeroPossessiveDistributivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncNonzeroPossessiveDistributivePoisonedPairs,
    });
    const ordinaryNncNonzeroPossessiveDistributivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncNonzeroPossessiveDistributivePoisonedSourceFrame
    );
    const nonzeroPossessiveDistributiveSourceFrame = ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSourceFrame({
        sourceStem: "shuchiw",
        formulaStem: "shuchi",
        sourceStemEvidence: "static-nnc-structured-possessive-stem",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        state: "possessive",
        animacy: "inanimate",
        pluralType: "distributive",
    });
    const nonzeroPossessiveDistributiveOperationFrame = ctx.buildOrdinaryNncNonanimatePossessiveDistributiveOperationFrame(
        nonzeroPossessiveDistributiveSourceFrame
    );
    const contradictoryNonzeroPossessiveDistributiveOperationFrame = {
        ...nonzeroPossessiveDistributiveOperationFrame,
        targetFrame: {
            ...nonzeroPossessiveDistributiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldNonzeroPossessiveDistributiveResultBuilder = ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult;
    const oldNonzeroPossessiveDistributiveSurfaceChainBuilder = ctx.buildOrdinaryNncSurfaceChainResult;
    const oldOrdinaryNncFixturesForNonzeroPossessive = ctx.ORDINARY_NNC_FIXTURES;
    ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult = () => ({
        surface: "poison-surface",
        soundSpellingFrames: [],
    });
    ctx.buildOrdinaryNncSurfaceChainResult = () => ({
        surface: "poison-chain-surface",
        soundSpellingFrames: [],
    });
    ctx.ORDINARY_NNC_FIXTURES = oldOrdinaryNncFixturesForNonzeroPossessive.map((fixture) => (
        fixture.id === "shuchi"
            ? {
                ...fixture,
                states: {
                    ...fixture.states,
                    possessive: {
                        ...fixture.states.possessive,
                        numberFormsByPossessor: {
                            ...fixture.states.possessive.numberFormsByPossessor,
                            singular: {
                                ...fixture.states.possessive.numberFormsByPossessor.singular,
                                nu: {
                                    ...fixture.states.possessive.numberFormsByPossessor.singular.nu,
                                    surfaceForms: ["poison-singular-display"],
                                },
                            },
                        },
                    },
                },
            }
            : fixture
    ));
    const monkeypatchedNonzeroPossessiveDistributive = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: nonzeroPossessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "plural",
        pluralType: "distributive",
        animacy: "inanimate",
    });
    ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult = oldNonzeroPossessiveDistributiveResultBuilder;
    ctx.buildOrdinaryNncSurfaceChainResult = oldNonzeroPossessiveDistributiveSurfaceChainBuilder;
    ctx.ORDINARY_NNC_FIXTURES = oldOrdinaryNncFixturesForNonzeroPossessive;
    s.eq(
        "ordinary NNC nonzero possessive distributive plural consumes structured possessive stem frames",
        {
            outputResult: ordinaryNncNonzeroPossessiveDistributiveProbe.result,
            outputSurfaceForms: ordinaryNncNonzeroPossessiveDistributiveProbe.surfaceForms,
            outputStem: ordinaryNncNonzeroPossessiveDistributiveProbe.stem,
            possessiveDistributiveSourceFrameKind: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.kind || "",
            possessiveDistributiveOperationId: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralOperationFrame?.operationId || "",
            possessiveDistributiveSourceStem: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.sourceStem || "",
            possessiveDistributiveFormulaStem: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.formulaStem || "",
            possessiveDistributiveSourceStemEvidence: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.sourceStemEvidence || "",
            possessiveDistributiveSourceStemIsGeneratedDisplay: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.sourceStemIsGeneratedDisplay,
            possessiveDistributiveConsumesRenderedInput: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.consumesRenderedInput,
            possessiveDistributiveDisplayAuthority: ordinaryNncNonzeroPossessiveDistributiveProbe.ordinaryNncDerivedPluralSourceFrame?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncNonzeroPossessiveDistributivePoisonedPairs, {
                sourceFrame: ordinaryNncNonzeroPossessiveDistributivePoisonedSourceFrame,
                operationFrame: ordinaryNncNonzeroPossessiveDistributivePoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonzeroPossessiveDistributiveSourceFrame,
            }),
            directMissingSource: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                operationFrame: nonzeroPossessiveDistributiveOperationFrame,
            }),
            directMissingTarget: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonzeroPossessiveDistributiveSourceFrame,
                operationFrame: {
                    ...nonzeroPossessiveDistributiveOperationFrame,
                    targetFrame: null,
                },
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult(
                "nushuchiw",
                ctx.resolveOrdinaryNncPossessor("nu")
            ).surface,
            contradictoryTarget: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonzeroPossessiveDistributiveSourceFrame,
                operationFrame: contradictoryNonzeroPossessiveDistributiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncNonanimatePossessiveDistributiveSurfaceFromFrame({
                sourceFrame: nonzeroPossessiveDistributiveSourceFrame,
                operationFrame: nonzeroPossessiveDistributiveOperationFrame,
            }),
            monkeypatchedResult: monkeypatchedNonzeroPossessiveDistributive.result,
        },
        {
            outputResult: "nushujshuchiw",
            outputSurfaceForms: ["nushujshuchiw"],
            outputStem: "shuchi",
            possessiveDistributiveSourceFrameKind: "ordinary-nnc-nonanimate-possessive-distributive-source-frame",
            possessiveDistributiveOperationId: "ordinary-nnc-nonanimate-possessive-distributive-realization",
            possessiveDistributiveSourceStem: "shuchiw",
            possessiveDistributiveFormulaStem: "shuchi",
            possessiveDistributiveSourceStemEvidence: "static-nnc-structured-possessive-stem",
            possessiveDistributiveSourceStemIsGeneratedDisplay: false,
            possessiveDistributiveConsumesRenderedInput: false,
            possessiveDistributiveDisplayAuthority: false,
            poisonedDisplayResult: "nushujshuchiw",
            directMissingOperation: "",
            directMissingSource: "",
            directMissingTarget: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "nushujshuchiw",
            monkeypatchedResult: "nushujshuchiw",
        }
    );
    const oldOrdinaryNncFixturesForMissingPossessiveStem = ctx.ORDINARY_NNC_FIXTURES;
    const oldPossessiveDistributiveBuilderForMissingPossessiveStem = ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult;
    ctx.ORDINARY_NNC_FIXTURES = oldOrdinaryNncFixturesForMissingPossessiveStem.map((fixture) => (
        fixture.id === "shuchi"
            ? {
                ...fixture,
                states: {
                    ...fixture.states,
                    possessive: {
                        ...fixture.states.possessive,
                        numberFormsByPossessor: {
                            ...fixture.states.possessive.numberFormsByPossessor,
                            singular: {
                                ...fixture.states.possessive.numberFormsByPossessor.singular,
                                nu: {
                                    surfaceForms: ["nushuchiw"],
                                },
                            },
                        },
                    },
                },
            }
            : fixture
    ));
    ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult = () => ({
        surface: "poison-legacy-distributive",
        soundSpellingFrames: [],
    });
    const missingPossessiveStemDistributiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: nonzeroPossessiveDistributiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "plural",
        pluralType: "distributive",
        animacy: "inanimate",
    });
    ctx.ORDINARY_NNC_FIXTURES = oldOrdinaryNncFixturesForMissingPossessiveStem;
    ctx.buildOrdinaryNncPossessiveDistributiveSurfaceResult = oldPossessiveDistributiveBuilderForMissingPossessiveStem;
    s.eq(
        "ordinary NNC nonzero possessive distributive blocks without structured possessive stem",
        {
            supported: missingPossessiveStemDistributiveProbe.supported,
            result: missingPossessiveStemDistributiveProbe.result,
            surfaceForms: missingPossessiveStemDistributiveProbe.surfaceForms,
            diagnosticId: missingPossessiveStemDistributiveProbe.diagnostics?.[0]?.id || "",
            derivedPluralSourceFrame: missingPossessiveStemDistributiveProbe.ordinaryNncDerivedPluralSourceFrame || null,
            derivedPluralOperationFrame: missingPossessiveStemDistributiveProbe.ordinaryNncDerivedPluralOperationFrame || null,
        },
        {
            supported: false,
            result: "",
            surfaceForms: [],
            diagnosticId: "ordinary-nnc-unsupported-number",
            derivedPluralSourceFrame: null,
            derivedPluralOperationFrame: null,
        }
    );
    const openStemPossessiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "xilun",
        state: "possessive",
        number: "singular",
        nounClass: "zero",
    });
    const ordinaryNncOpenStemPossessiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: openStemPossessiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "singular",
        animacy: "inanimate",
    });
    const ordinaryNncOpenStemPossessivePairs = ordinaryNncOpenStemPossessiveProbe.formulaSurfacePairs || [];
    const ordinaryNncOpenStemPossessivePoisonedPairs = ordinaryNncOpenStemPossessivePairs.map(poisonOrdinaryNncPairDisplays);
    const ordinaryNncOpenStemPossessivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: ordinaryNncOpenStemPossessivePoisonedPairs,
    });
    const ordinaryNncOpenStemPossessivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        ordinaryNncOpenStemPossessivePoisonedSourceFrame
    );
    const openStemPossessiveSourceFrame = ctx.buildOrdinaryNncOpenStemPossessiveSourceFrame({
        sourceStem: "xilun",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        animacy: "inanimate",
    });
    const openStemPossessiveOperationFrame = ctx.buildOrdinaryNncOpenStemPossessiveOperationFrame(
        openStemPossessiveSourceFrame
    );
    const contradictoryOpenStemPossessiveOperationFrame = {
        ...openStemPossessiveOperationFrame,
        targetFrame: {
            ...openStemPossessiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldOpenStemPossessiveBuilder = ctx.buildOrdinaryNncOpenStemPossessiveSurface;
    ctx.buildOrdinaryNncOpenStemPossessiveSurface = () => "poison-surface";
    const monkeypatchedOpenStemPossessive = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: openStemPossessiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "singular",
        animacy: "inanimate",
    });
    ctx.buildOrdinaryNncOpenStemPossessiveSurface = oldOpenStemPossessiveBuilder;
    s.eq(
        "ordinary NNC open-stem possessive singular consumes typed source and operation frames",
        {
            outputResult: ordinaryNncOpenStemPossessiveProbe.result,
            outputSurfaceForms: ordinaryNncOpenStemPossessiveProbe.surfaceForms,
            outputStem: ordinaryNncOpenStemPossessiveProbe.stem,
            sourceFrameKind: ordinaryNncOpenStemPossessiveProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            operationId: ordinaryNncOpenStemPossessiveProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceFrameSupported: ordinaryNncOpenStemPossessiveProbe.ordinaryNncResultTextSourceFrame?.supported === true,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(ordinaryNncOpenStemPossessivePoisonedPairs, {
                sourceFrame: ordinaryNncOpenStemPossessivePoisonedSourceFrame,
                operationFrame: ordinaryNncOpenStemPossessivePoisonedOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: openStemPossessiveSourceFrame,
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncOpenStemPossessiveSurface("xilun", "nu", "inanimate"),
            contradictoryTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: openStemPossessiveSourceFrame,
                operationFrame: contradictoryOpenStemPossessiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: openStemPossessiveSourceFrame,
                operationFrame: openStemPossessiveOperationFrame,
            }),
            sourceFrameConsumesRenderedInput: openStemPossessiveSourceFrame.consumesRenderedInput,
            sourceFrameDisplayAuthority: openStemPossessiveSourceFrame.displayStringsAuthorizeGrammar,
            monkeypatchedResult: monkeypatchedOpenStemPossessive.result,
        },
        {
            outputResult: "nuxilun",
            outputSurfaceForms: ["nuxilun"],
            outputStem: "xilun",
            sourceFrameKind: "ordinary-nnc-result-text-source-frame",
            operationId: "ordinary-nnc-result-text-render",
            sourceFrameSupported: true,
            poisonedDisplayResult: "nuxilun",
            directMissingOperation: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "nuxilun",
            sourceFrameConsumesRenderedInput: false,
            sourceFrameDisplayAuthority: false,
            monkeypatchedResult: "nuxilun",
        }
    );
    const structuredFixturePossessiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "shuchi",
        state: "possessive",
        number: "singular",
        nounClass: "t",
    });
    const structuredFixturePossessiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: structuredFixturePossessiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "singular",
        animacy: "inanimate",
    });
    const structuredFixturePossessivePairs = structuredFixturePossessiveProbe.formulaSurfacePairs || [];
    const structuredFixturePossessivePoisonedPairs = structuredFixturePossessivePairs.map(poisonOrdinaryNncPairDisplays);
    const structuredFixturePossessivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: structuredFixturePossessivePoisonedPairs,
    });
    const structuredFixturePossessivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        structuredFixturePossessivePoisonedSourceFrame
    );
    const structuredFixturePossessiveSourceFrame = ctx.buildOrdinaryNncOpenStemPossessiveSourceFrame({
        sourceStem: "shuchiw",
        formulaStem: "shuchi",
        sourceStemEvidence: "static-nnc-structured-possessive-stem",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        animacy: "inanimate",
    });
    const structuredFixturePossessiveOperationFrame = ctx.buildOrdinaryNncOpenStemPossessiveOperationFrame(
        structuredFixturePossessiveSourceFrame
    );
    const contradictoryStructuredFixturePossessiveOperationFrame = {
        ...structuredFixturePossessiveOperationFrame,
        targetFrame: {
            ...structuredFixturePossessiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const missingTargetStructuredFixturePossessiveOperationFrame = {
        ...structuredFixturePossessiveOperationFrame,
        targetFrame: null,
    };
    const structuredFixtureDisplayPoisonResults = ctx.buildOrdinaryNncStructuredPossessiveSurfaceResults({
        fixture: { stem: "shuchi" },
        stateCell: {
            possessiveStem: "shuchiw",
            surfaceForms: ["poison-static-surface"],
        },
        state: "possessive",
        number: "singular",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        animacy: "inanimate",
    });
    const missingStructuredPossessiveStemResults = ctx.buildOrdinaryNncStructuredPossessiveSurfaceResults({
        fixture: { stem: "shuchi" },
        stateCell: {
            surfaceForms: ["nushuchiw"],
        },
        state: "possessive",
        number: "singular",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        animacy: "inanimate",
    });
    const oldStructuredFixtureFixtures = ctx.ORDINARY_NNC_FIXTURES;
    const oldStructuredFixtureOpenStemBuilder = ctx.buildOrdinaryNncOpenStemPossessiveSurface;
    const oldStructuredFixtureSurfaceChainBuilder = ctx.buildOrdinaryNncSurfaceChainResult;
    ctx.ORDINARY_NNC_FIXTURES = oldStructuredFixtureFixtures.map((fixture) => (
        fixture.id === "shuchi"
            ? {
                ...fixture,
                states: {
                    ...fixture.states,
                    possessive: {
                        ...fixture.states.possessive,
                        numberFormsByPossessor: {
                            ...fixture.states.possessive.numberFormsByPossessor,
                            singular: {
                                ...fixture.states.possessive.numberFormsByPossessor.singular,
                                nu: {
                                    ...fixture.states.possessive.numberFormsByPossessor.singular.nu,
                                    surfaceForms: ["poison-static-surface"],
                                },
                            },
                        },
                    },
                },
            }
            : fixture
    ));
    ctx.buildOrdinaryNncOpenStemPossessiveSurface = () => "poison-open-stem-string-surface";
    ctx.buildOrdinaryNncSurfaceChainResult = () => ({
        surface: "poison-chain-surface",
        surfaceForms: ["poison-chain-surface"],
        soundSpellingFrames: [],
    });
    const poisonedStaticSurfaceFormsProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: structuredFixturePossessiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "singular",
        animacy: "inanimate",
    });
    ctx.ORDINARY_NNC_FIXTURES = oldStructuredFixtureFixtures;
    ctx.buildOrdinaryNncOpenStemPossessiveSurface = oldStructuredFixtureOpenStemBuilder;
    ctx.buildOrdinaryNncSurfaceChainResult = oldStructuredFixtureSurfaceChainBuilder;
    s.eq(
        "ordinary NNC structured fixture possessive stem, not surfaceForms, authorizes possessive singular",
        {
            outputResult: structuredFixturePossessiveProbe.result,
            outputSurfaceForms: structuredFixturePossessiveProbe.surfaceForms,
            outputStem: structuredFixturePossessiveProbe.stem,
            sourceFrameKind: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.kind || "",
            operationId: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveOperationFrames?.[0]?.operationId || "",
            sourceStem: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.sourceStem || "",
            formulaStem: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.formulaStem || "",
            sourceStemEvidence: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.sourceStemEvidence || "",
            resultTextSourceFrameKind: structuredFixturePossessiveProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            resultTextOperationId: structuredFixturePossessiveProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceStemIsGeneratedDisplay: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.sourceStemIsGeneratedDisplay,
            consumesRenderedInput: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.consumesRenderedInput,
            displayAuthority: structuredFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(structuredFixturePossessivePoisonedPairs, {
                sourceFrame: structuredFixturePossessivePoisonedSourceFrame,
                operationFrame: structuredFixturePossessivePoisonedOperationFrame,
            }),
            poisonedStaticSurfaceFormsResult: poisonedStaticSurfaceFormsProbe.result,
            directHelperIgnoresSurfaceForms: structuredFixtureDisplayPoisonResults.map((entry) => entry.surface),
            missingStructuredPossessiveStemBlocks: missingStructuredPossessiveStemResults.map((entry) => entry.surface),
            directMissingSourceFrame: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                operationFrame: structuredFixturePossessiveOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: structuredFixturePossessiveSourceFrame,
            }),
            directMissingTargetFrame: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: structuredFixturePossessiveSourceFrame,
                operationFrame: missingTargetStructuredFixturePossessiveOperationFrame,
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncOpenStemPossessiveSurface("shuchiw", "nu", "inanimate"),
            contradictoryTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: structuredFixturePossessiveSourceFrame,
                operationFrame: contradictoryStructuredFixturePossessiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: structuredFixturePossessiveSourceFrame,
                operationFrame: structuredFixturePossessiveOperationFrame,
            }),
        },
        {
            outputResult: "nushuchiw",
            outputSurfaceForms: ["nushuchiw"],
            outputStem: "shuchi",
            sourceFrameKind: "ordinary-nnc-open-stem-possessive-source-frame",
            operationId: "ordinary-nnc-open-stem-possessive-realization",
            sourceStem: "shuchiw",
            formulaStem: "shuchi",
            sourceStemEvidence: "static-nnc-structured-possessive-stem",
            resultTextSourceFrameKind: "ordinary-nnc-result-text-source-frame",
            resultTextOperationId: "ordinary-nnc-result-text-render",
            sourceStemIsGeneratedDisplay: false,
            consumesRenderedInput: false,
            displayAuthority: false,
            poisonedDisplayResult: "nushuchiw",
            poisonedStaticSurfaceFormsResult: "nushuchiw",
            directHelperIgnoresSurfaceForms: ["nushuchiw"],
            missingStructuredPossessiveStemBlocks: [],
            directMissingSourceFrame: "",
            directMissingOperation: "",
            directMissingTargetFrame: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "nushuchiw",
        }
    );
    const zeroClassFixturePossessiveFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "kal",
        state: "possessive",
        number: "singular",
        nounClass: "zero",
    });
    const zeroClassFixturePossessiveProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: zeroClassFixturePossessiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "singular",
        animacy: "inanimate",
    });
    const zeroClassFixturePossessivePairs = zeroClassFixturePossessiveProbe.formulaSurfacePairs || [];
    const zeroClassFixturePossessivePoisonedPairs = zeroClassFixturePossessivePairs.map(poisonOrdinaryNncPairDisplays);
    const zeroClassFixturePossessivePoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: zeroClassFixturePossessivePoisonedPairs,
    });
    const zeroClassFixturePossessivePoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        zeroClassFixturePossessivePoisonedSourceFrame
    );
    const zeroClassFixturePossessiveSourceFrame = ctx.buildOrdinaryNncOpenStemPossessiveSourceFrame({
        sourceStem: "kal",
        formulaStem: "kal",
        sourceStemEvidence: "ordinary-nnc-zero-class-formula-stem",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        animacy: "inanimate",
    });
    const zeroClassFixturePossessiveOperationFrame = ctx.buildOrdinaryNncOpenStemPossessiveOperationFrame(
        zeroClassFixturePossessiveSourceFrame
    );
    const contradictoryZeroClassFixturePossessiveOperationFrame = {
        ...zeroClassFixturePossessiveOperationFrame,
        targetFrame: {
            ...zeroClassFixturePossessiveOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const missingTargetZeroClassFixturePossessiveOperationFrame = {
        ...zeroClassFixturePossessiveOperationFrame,
        targetFrame: null,
    };
    const zeroClassFixtureDisplayPoisonResults = ctx.buildOrdinaryNncStructuredPossessiveSurfaceResults({
        fixture: {
            stem: "kal",
            nounClass: "zero",
        },
        stateCell: {
            surfaceForms: ["poison-static-surface"],
        },
        state: "possessive",
        number: "singular",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        nounClass: "zero",
        animacy: "inanimate",
    });
    const missingZeroClassFixtureStemResults = ctx.buildOrdinaryNncStructuredPossessiveSurfaceResults({
        fixture: {
            stem: "",
            nounClass: "zero",
        },
        stateCell: {
            surfaceForms: ["nukal"],
        },
        state: "possessive",
        number: "singular",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        nounClass: "zero",
        animacy: "inanimate",
    });
    const oldZeroClassFixtureFixtures = ctx.ORDINARY_NNC_FIXTURES;
    const oldZeroClassFixtureOpenStemBuilder = ctx.buildOrdinaryNncOpenStemPossessiveSurface;
    const oldZeroClassFixtureSurfaceChainBuilder = ctx.buildOrdinaryNncSurfaceChainResult;
    ctx.ORDINARY_NNC_FIXTURES = oldZeroClassFixtureFixtures.map((fixture) => (
        fixture.id === "kal"
            ? {
                ...fixture,
                states: {
                    ...fixture.states,
                    possessive: {
                        ...fixture.states.possessive,
                        numberFormsByPossessor: {
                            ...fixture.states.possessive.numberFormsByPossessor,
                            singular: {
                                ...fixture.states.possessive.numberFormsByPossessor.singular,
                                nu: {
                                    ...fixture.states.possessive.numberFormsByPossessor.singular.nu,
                                    surfaceForms: ["poison-static-surface"],
                                },
                            },
                        },
                    },
                },
            }
            : fixture
    ));
    ctx.buildOrdinaryNncOpenStemPossessiveSurface = () => "poison-open-stem-string-surface";
    ctx.buildOrdinaryNncSurfaceChainResult = () => ({
        surface: "poison-chain-surface",
        surfaceForms: ["poison-chain-surface"],
        soundSpellingFrames: [],
    });
    const poisonedZeroClassStaticSurfaceFormsProbe = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: zeroClassFixturePossessiveFormulaSlots,
        state: "possessive",
        possessor: "nu",
        number: "singular",
        animacy: "inanimate",
    });
    ctx.ORDINARY_NNC_FIXTURES = oldZeroClassFixtureFixtures;
    ctx.buildOrdinaryNncOpenStemPossessiveSurface = oldZeroClassFixtureOpenStemBuilder;
    ctx.buildOrdinaryNncSurfaceChainResult = oldZeroClassFixtureSurfaceChainBuilder;
    s.eq(
        "ordinary NNC zero-class fixture possessive singular consumes formula stem instead of surfaceForms",
        {
            outputResult: zeroClassFixturePossessiveProbe.result,
            outputSurfaceForms: zeroClassFixturePossessiveProbe.surfaceForms,
            outputStem: zeroClassFixturePossessiveProbe.stem,
            sourceFrameKind: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.kind || "",
            operationId: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveOperationFrames?.[0]?.operationId || "",
            sourceStem: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.sourceStem || "",
            formulaStem: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.formulaStem || "",
            sourceStemEvidence: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.sourceStemEvidence || "",
            resultTextSourceFrameKind: zeroClassFixturePossessiveProbe.ordinaryNncResultTextSourceFrame?.kind || "",
            resultTextOperationId: zeroClassFixturePossessiveProbe.ordinaryNncResultTextOperationFrame?.operationId || "",
            sourceStemIsGeneratedDisplay: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.sourceStemIsGeneratedDisplay,
            consumesRenderedInput: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.consumesRenderedInput,
            displayAuthority: zeroClassFixturePossessiveProbe.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(zeroClassFixturePossessivePoisonedPairs, {
                sourceFrame: zeroClassFixturePossessivePoisonedSourceFrame,
                operationFrame: zeroClassFixturePossessivePoisonedOperationFrame,
            }),
            poisonedStaticSurfaceFormsResult: poisonedZeroClassStaticSurfaceFormsProbe.result,
            directHelperIgnoresSurfaceForms: zeroClassFixtureDisplayPoisonResults.map((entry) => entry.surface),
            missingFormulaSourceStemBlocks: missingZeroClassFixtureStemResults.map((entry) => entry.surface),
            directMissingSourceFrame: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                operationFrame: zeroClassFixturePossessiveOperationFrame,
            }),
            directMissingOperation: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: zeroClassFixturePossessiveSourceFrame,
            }),
            directMissingTargetFrame: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: zeroClassFixturePossessiveSourceFrame,
                operationFrame: missingTargetZeroClassFixturePossessiveOperationFrame,
            }),
            oldStringApiBlocked: ctx.buildOrdinaryNncOpenStemPossessiveSurface("kal", "nu", "inanimate"),
            contradictoryTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: zeroClassFixturePossessiveSourceFrame,
                operationFrame: contradictoryZeroClassFixturePossessiveOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                sourceFrame: zeroClassFixturePossessiveSourceFrame,
                operationFrame: zeroClassFixturePossessiveOperationFrame,
            }),
        },
        {
            outputResult: "nukal",
            outputSurfaceForms: ["nukal"],
            outputStem: "kal",
            sourceFrameKind: "ordinary-nnc-open-stem-possessive-source-frame",
            operationId: "ordinary-nnc-open-stem-possessive-realization",
            sourceStem: "kal",
            formulaStem: "kal",
            sourceStemEvidence: "ordinary-nnc-zero-class-formula-stem",
            resultTextSourceFrameKind: "ordinary-nnc-result-text-source-frame",
            resultTextOperationId: "ordinary-nnc-result-text-render",
            sourceStemIsGeneratedDisplay: false,
            consumesRenderedInput: false,
            displayAuthority: false,
            poisonedDisplayResult: "nukal",
            poisonedStaticSurfaceFormsResult: "nukal",
            directHelperIgnoresSurfaceForms: ["nukal"],
            missingFormulaSourceStemBlocks: [],
            directMissingSourceFrame: "",
            directMissingOperation: "",
            directMissingTargetFrame: "",
            oldStringApiBlocked: "",
            contradictoryTarget: "",
            framedTarget: "nukal",
        }
    );
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
        formulaSchemaId: "ordinary-nnc-shell",
        formulaSchemaVersion: 1,
        formulaSlotSource: "andrews-formula-slot-schema",
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
                compactDisplay: "Ø",
                compactSurface: "",
                num1: "",
                num2: "",
                displayNum1: "Ø",
                displayNum2: "Ø",
                displayDyad: "Ø-Ø",
                dyadSource: "singular-common-class-connector",
                label: "subject number connector",
                belongsTo: "subject",
                referenceNumber: "singular",
                pluralType: "",
            },
        },
        formulaEcho: "#Ø-Ø(kal)Ø#",
        fullFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
        compactFormulaEcho: "#Ø-Ø(kal)Ø#",
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
                formulaSchemaId: "ordinary-nnc-shell",
                formulaSlot: "num1-num2",
                slot: "subject.num1-num2",
                belongsTo: "subject",
                nounStemClass: "zero",
                classLabel: "Ø",
                surface: "",
                displaySurface: "Ø",
                compactDisplay: "Ø",
                compactSurface: "",
                num1: "",
                num2: "",
                displayNum1: "Ø",
                displayNum2: "Ø",
                displayDyad: "Ø-Ø",
                dyadSource: "singular-common-class-connector",
                predicateState: "absolutive",
                referenceNumber: "singular",
                pluralType: "",
                blockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
                notNounSuffix: true,
                notStemSuffix: true,
                notStatePosition: true,
                notTense: true,
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
        "ordinary NNC direct helper exposes one formula pair per generated surface",
        kalAbsolutive.formulaSurfacePairs,
        [
            {
                surface: "kal",
                targetFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
                sourceToTargetFormulaEcho: "NNC(kal) -> #Ø-Ø(kal)Ø-Ø#",
            },
        ]
    );
    const ordinaryNncSurfaceFormulaAudit = (() => {
        const stems = [
            { stem: "kal" },
            { stem: "shuchit" },
            { stem: "mistun", animacy: "animate" },
            { stem: "xilun" },
            { stem: "tukayit" },
            { stem: "machiyut" },
            { stem: "majmachiyut" },
        ];
        const states = [
            { state: "absolutive", possessors: [null] },
            { state: "possessive", possessors: ["nu", "mu", "i", "tu", "anmu", "in"] },
        ];
        const numbers = [
            { number: "singular", pluralType: "" },
            { number: "plural", pluralType: "count" },
            { number: "plural", pluralType: "distributive" },
        ];
        const subjects = [
            null,
            { subjectPrefix: "ti", subjectSuffix: "t", personSubKey: "1pl" },
        ];
        const normalizeSurfaceForms = (forms = []) => [...new Set((Array.isArray(forms) ? forms : [])
            .flatMap((entry) => String(entry || "").split(/\s*\/\s*/))
            .map((entry) => entry.trim())
            .filter(Boolean))];
        const rows = [];
        stems.forEach((stem) => {
            states.forEach((stateSpec) => {
                stateSpec.possessors.forEach((possessor) => {
                    numbers.forEach((numberSpec) => {
                        subjects.forEach((subject) => {
                            const output = ctx.generateOrdinaryNncParadigm({
                                ...stem,
                                state: stateSpec.state,
                                possessor,
                                subject,
                                number: numberSpec.number,
                                pluralType: numberSpec.pluralType,
                            });
                            const surfaces = normalizeSurfaceForms(output.surfaceForms);
                            if (!output.supported || !surfaces.length) {
                                return;
                            }
                            const formulaPairs = Array.isArray(output.formulaSurfacePairs)
                                ? output.formulaSurfacePairs
                                : [];
                            rows.push({
                                label: [
                                    stem.stem,
                                    stateSpec.state,
                                    possessor || "no-possessor",
                                    numberSpec.number,
                                    numberSpec.pluralType || "plain",
                                    subject?.personSubKey || "3sg",
                                ].join("|"),
                                surfaces,
                                pairSurfaces: formulaPairs.map((entry) => String(entry?.surface || "").trim()).filter(Boolean),
                                targetFormulaEchoes: formulaPairs.map((entry) => String(entry?.targetFormulaEcho || "").trim()).filter(Boolean),
                                sourceToTargetFormulaEchoes: formulaPairs.map((entry) => String(entry?.sourceToTargetFormulaEcho || "").trim()).filter(Boolean),
                            });
                        });
                    });
                });
            });
        });
        const mismatches = rows
            .map((row) => {
                const missing = row.surfaces.filter((surface) => !row.pairSurfaces.includes(surface));
                const extra = row.pairSurfaces.filter((surface) => !row.surfaces.includes(surface));
                const repeatedSurfaces = row.pairSurfaces.filter((surface, index) => row.pairSurfaces.indexOf(surface) !== index);
                const incompletePairCount = row.pairSurfaces.length !== row.targetFormulaEchoes.length
                    || row.pairSurfaces.length !== row.sourceToTargetFormulaEchoes.length;
                return {
                    label: row.label,
                    missing,
                    extra,
                    repeatedSurfaces,
                    incompletePairCount,
                    surfaceCount: row.surfaces.length,
                    pairCount: row.pairSurfaces.length,
                };
            })
            .filter((row) => row.missing.length
                || row.extra.length
                || row.repeatedSurfaces.length
                || row.incompletePairCount
                || row.surfaceCount !== row.pairCount);
        return {
            rowCount: rows.length,
            surfaceCount: rows.reduce((sum, row) => sum + row.surfaces.length, 0),
            countPluralPair: rows
                .filter((row) => row.label === "mistun|absolutive|no-possessor|plural|count|3sg")
                .flatMap((row) => row.pairSurfaces.map((surface, index) => `${surface}=>${row.targetFormulaEchoes[index]}`)),
            possessivePair: rows
                .filter((row) => row.label === "kal|possessive|nu|singular|plain|3sg")
                .flatMap((row) => row.pairSurfaces.map((surface, index) => `${surface}=>${row.targetFormulaEchoes[index]}`)),
            mismatches,
        };
    })();
    s.eq(
        "ordinary NNC generated Nawat outputs have one formula pair per surface across state and number",
        {
            countPluralPair: ordinaryNncSurfaceFormulaAudit.countPluralPair,
            possessivePair: ordinaryNncSurfaceFormulaAudit.possessivePair,
            mismatches: ordinaryNncSurfaceFormulaAudit.mismatches,
        },
        {
            countPluralPair: ["mistunmet=>#Ø-Ø(mistun)m-et#"],
            possessivePair: ["nukal=>#Ø-Ø(kal)Ø-Ø#"],
            mismatches: [],
        }
    );
    s.ok(
        "ordinary NNC surface/formula audit covers a broad generated set",
        ordinaryNncSurfaceFormulaAudit.rowCount >= 50
            && ordinaryNncSurfaceFormulaAudit.surfaceCount >= 50
    );
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
            formulaSchemaId: "ordinary-nnc-shell",
            formulaSlot: "num1-num2",
            slot: "subject.num1-num2",
            belongsTo: "subject",
            nounStemClass: "ti",
            classLabel: "ti",
            surface: "ti",
            displaySurface: "ti",
            compactDisplay: "ti",
            compactSurface: "ti",
            num1: "ti",
            num2: "",
            displayNum1: "ti",
            displayNum2: "Ø",
            displayDyad: "ti-Ø",
            dyadSource: "singular-common-class-connector",
            predicateState: "absolutive",
            referenceNumber: "singular",
            pluralType: "",
            blockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
            notNounSuffix: true,
            notStemSuffix: true,
            notStatePosition: true,
            notTense: true,
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
                    compactDisplay: "Ø",
                    compactSurface: "",
                    num1: "",
                    num2: "",
                    displayNum1: "Ø",
                    displayNum2: "Ø",
                    displayDyad: "Ø-Ø",
                    dyadSource: "singular-common-class-connector",
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
                    compactDisplay: "t",
                    compactSurface: "t",
                    num1: "t",
                    num2: "",
                    displayNum1: "t",
                    displayNum2: "Ø",
                    displayDyad: "t-Ø",
                    dyadSource: "singular-common-class-connector",
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
        "ordinary NNC generation reads the shared Andrews formula slot schema",
        (() => {
            const result = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "absolutive",
                number: "singular",
            });
            const connector = result.clauseFrame.subject.numberConnector;
            return {
                clauseFormulaSchemaId: result.clauseFrame.formulaSchemaId,
                clauseFormulaSlotSource: result.clauseFrame.formulaSlotSource,
                clauseFormula: result.clauseFrame.formula,
                schemaFormula: ctx.renderAndrewsFormulaTemplate(result.clauseFrame.formulaSchemaId),
                connectorFormulaSchemaId: connector.formulaSchemaId,
                connectorFormulaSlot: connector.formulaSlot,
                connectorSlotPath: connector.slot,
                connectorBelongsTo: connector.belongsTo,
                connectorBlockedInterpretations: connector.blockedInterpretations,
                connectorNotTense: connector.notTense,
                connectorNotStemSuffix: connector.notStemSuffix,
                blockedTenseDiagnosticId: ctx.diagnoseAndrewsFormulaSlotInterpretation(
                    result.clauseFrame.formulaSchemaId,
                    connector.formulaSlot,
                    "tense"
                ).diagnostic.id,
            };
        })(),
        {
            clauseFormulaSchemaId: "ordinary-nnc-shell",
            clauseFormulaSlotSource: "andrews-formula-slot-schema",
            clauseFormula: "#pers1-pers2(STEM)num1-num2#",
            schemaFormula: "#pers1-pers2(STEM)num1-num2#",
            connectorFormulaSchemaId: "ordinary-nnc-shell",
            connectorFormulaSlot: "num1-num2",
            connectorSlotPath: "subject.num1-num2",
            connectorBelongsTo: "subject",
            connectorBlockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
            connectorNotTense: true,
            connectorNotStemSuffix: true,
            blockedTenseDiagnosticId: "formula-slot-num1-num2-not-tense",
        }
    );
    s.eq(
        "ordinary NNC formula workbench slice is generated and blocked through schema contract",
        (() => {
            const generated = ctx.buildOrdinaryNncFormulaWorkbenchSlice({ inputValue: "kal" });
            const blocked = ctx.buildOrdinaryNncFormulaWorkbenchSlice({ inputValue: "" });
            const predicateSlot = generated.parsedSlots.find((slot) => slot.key === "predicateStem");
            const connectorSlot = generated.parsedSlots.find((slot) => slot.key === "num1Num2");
            return {
                generatedSchemaId: generated.formulaSchemaId,
                generatedSlotSource: generated.formulaSlotSource,
                generatedFormula: generated.formula,
                generatedFormulaEcho: generated.formulaEcho,
                generatedFullFormulaEcho: generated.fullFormulaEcho,
                generatedCompactFormulaEcho: generated.compactFormulaEcho,
                generatedAllowed: generated.generation.allowed,
                generatedStatus: generated.generation.status,
                generatedFormulaAuthorityAllowed: generated.generation.formulaAuthorityAllowed,
                generatedFormulaAuthorityGate: generated.generation.formulaAuthorityGate,
                generatedLogicAuthority: generated.generation.logicAuthority,
                generatedOrthographyAuthority: generated.generation.orthographyAuthority,
                generatedSpellingEvidenceRole: generated.generation.spellingEvidenceRole,
                generatedClassicalSurfaceImport: generated.generation.classicalSurfaceImport,
                generatedSurface: generated.generation.surface,
                sourceRequirementValue: generated.satisfiedRequirements[0].value,
                predicateSlotRenderedValue: predicateSlot.renderedValue,
                predicateSlotBoundary: predicateSlot.boundary,
                connectorSlotOwner: connectorSlot.owner,
                connectorSlotPath: connectorSlot.path,
                connectorSlotValue: connectorSlot.value,
                connectorSlotCompactValue: connectorSlot.compactValue,
                connectorSlotRenderedValue: connectorSlot.renderedValue,
                connectorSlotCompactRenderedValue: connectorSlot.compactRenderedValue,
                connectorBlockedInterpretations: connectorSlot.blockedInterpretations,
                examples: generated.examples.map((example) => ({
                    id: example.id,
                    status: example.status,
                    nounClass: example.nounClass,
                    number: example.number,
                    pluralType: example.pluralType,
                    connectorDyad: example.connectorDyad,
                    fullFormulaEcho: example.fullFormulaEcho,
                    compactFormulaEcho: example.compactFormulaEcho,
                    surface: example.surface,
                })),
                blockedStatus: blocked.generation.status,
                blockedAllowed: blocked.generation.allowed,
                blockedFormulaAuthorityAllowed: blocked.generation.formulaAuthorityAllowed,
                blockedFormulaAuthorityGate: blocked.generation.formulaAuthorityGate,
                blockedFormulaAuthorityReasons: blocked.generation.formulaAuthorityBlockedReasons,
                blockedDiagnosticId: blocked.diagnostics[0].id,
            };
        })(),
        {
            generatedSchemaId: "ordinary-nnc-shell",
            generatedSlotSource: "andrews-formula-slot-schema",
            generatedFormula: "#pers1-pers2(STEM)num1-num2#",
            generatedFormulaEcho: "#Ø-Ø(kal)Ø#",
            generatedFullFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
            generatedCompactFormulaEcho: "#Ø-Ø(kal)Ø#",
            generatedAllowed: true,
            generatedStatus: "generated",
            generatedFormulaAuthorityAllowed: true,
            generatedFormulaAuthorityGate: "andrews-formula-authorized-generation",
            generatedLogicAuthority: "Andrews PDF",
            generatedOrthographyAuthority: "Nawat/Pipil orthography bridge",
            generatedSpellingEvidenceRole: "spelling-realization-only",
            generatedClassicalSurfaceImport: "blocked",
            generatedSurface: "kal",
            sourceRequirementValue: "kal",
            predicateSlotRenderedValue: "(kal)",
            predicateSlotBoundary: "inside-parentheses",
            connectorSlotOwner: "subject",
            connectorSlotPath: "subject.num1-num2",
            connectorSlotValue: "Ø-Ø",
            connectorSlotCompactValue: "Ø",
            connectorSlotRenderedValue: "Ø-Ø",
            connectorSlotCompactRenderedValue: "Ø",
            connectorBlockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
            examples: [
                {
                    id: "zero-common-kal",
                    status: "generated",
                    nounClass: "zero",
                    number: "singular",
                    pluralType: "",
                    connectorDyad: "Ø-Ø",
                    fullFormulaEcho: "#Ø-Ø(kal)Ø-Ø#",
                    compactFormulaEcho: "#Ø-Ø(kal)Ø#",
                    surface: "kal",
                },
                {
                    id: "t-class-siwa",
                    status: "generated",
                    nounClass: "t",
                    number: "singular",
                    pluralType: "",
                    connectorDyad: "t-Ø",
                    fullFormulaEcho: "#Ø-Ø(siwa)t-Ø#",
                    compactFormulaEcho: "#Ø-Ø(siwa)t#",
                    surface: "siwat",
                },
                {
                    id: "ti-class-xilun",
                    status: "generated",
                    nounClass: "ti",
                    number: "singular",
                    pluralType: "",
                    connectorDyad: "ti-Ø",
                    fullFormulaEcho: "#Ø-Ø(xilun)ti-Ø#",
                    compactFormulaEcho: "#Ø-Ø(xilun)ti#",
                    surface: "xilunti",
                },
                {
                    id: "in-class-tekpan",
                    status: "generated",
                    nounClass: "in",
                    number: "singular",
                    pluralType: "",
                    connectorDyad: "in-Ø",
                    fullFormulaEcho: "#Ø-Ø(tekpan)in-Ø#",
                    compactFormulaEcho: "#Ø-Ø(tekpan)in#",
                    surface: "tekpanin",
                },
                {
                    id: "animate-count-mistun",
                    status: "generated",
                    nounClass: "zero",
                    number: "plural",
                    pluralType: "count",
                    connectorDyad: "m-et",
                    fullFormulaEcho: "#Ø-Ø(mistun)m-et#",
                    compactFormulaEcho: "#Ø-Ø(mistun)met#",
                    surface: "mistunmet",
                },
            ],
            blockedStatus: "blocked",
            blockedAllowed: false,
            blockedFormulaAuthorityAllowed: false,
            blockedFormulaAuthorityGate: "andrews-formula-generation-blocked",
            blockedFormulaAuthorityReasons: ["formula-source-requirement-missing"],
            blockedDiagnosticId: "ordinary-nnc-missing-predicate-stem",
        }
    );
    s.eq(
        "possessive-state NNC formula workbench separates Andrews structure from Nawat realization",
        (() => {
            const generated = ctx.buildPossessiveStateNncFormulaWorkbenchSlice({ inputValue: "kal" });
            const blocked = ctx.buildPossessiveStateNncFormulaWorkbenchSlice({ inputValue: "" });
            const stateSlot = generated.parsedSlots.find((slot) => slot.key === "possessiveState");
            const connectorSlot = generated.parsedSlots.find((slot) => slot.key === "num1Num2");
            const specific = generated.examples.find((example) => example.id === "specific-1sg-nu-kal");
            const monadic = generated.examples.find((example) => example.id === "monadic-human-te-kal");
            return {
                schemaId: generated.formulaSchemaId,
                slotSource: generated.formulaSlotSource,
                families: generated.formulaFamilies.map((family) => [family.id, family.formula]),
                structuralFormulaEcho: generated.structuralFormulaEcho,
                nawatFormulaEcho: generated.nawatFormulaEcho,
                compactFormulaEcho: generated.compactFormulaEcho,
                surface: generated.generation.surface,
                generationStatus: generated.generation.status,
                stateSlot: {
                    token: stateSlot.token,
                    role: stateSlot.role,
                    owner: stateSlot.owner,
                    path: stateSlot.path,
                    structuralValue: stateSlot.structuralValue,
                    nawatValue: stateSlot.nawatValue,
                    compactValue: stateSlot.compactValue,
                    blocked: stateSlot.blockedInterpretations,
                },
                connectorSlot: {
                    role: connectorSlot.role,
                    owner: connectorSlot.owner,
                    path: connectorSlot.path,
                    value: connectorSlot.value,
                    compactValue: connectorSlot.compactValue,
                    blocked: connectorSlot.blockedInterpretations,
                },
                realizationBoundary: generated.realizationBoundary,
                specific: {
                    status: specific.status,
                    statePosition: specific.statePosition,
                    possessorKind: specific.possessorKind,
                    structuralFormulaEcho: specific.structuralFormulaEcho,
                    nawatFormulaEcho: specific.nawatFormulaEcho,
                    compactFormulaEcho: specific.compactFormulaEcho,
                    surface: specific.surface,
                    possessorStructural: specific.formulaSlots.possessiveState.andrewsStructural,
                    possessorNawat: specific.formulaSlots.possessiveState.nawatRealization,
                },
                monadic: {
                    status: monadic.status,
                    statePosition: monadic.statePosition,
                    possessorKind: monadic.possessorKind,
                    formulaTemplate: monadic.formulaTemplate,
                    structuralFormulaEcho: monadic.structuralFormulaEcho,
                    nawatFormulaEcho: monadic.nawatFormulaEcho,
                    surface: monadic.surface,
                    sourceFrameKind: monadic.sourceFrame?.kind || "",
                    operationId: monadic.operationFrame?.operationId || "",
                    diagnosticCount: monadic.diagnostics.length,
                },
                blockedStatus: blocked.generation.status,
                blockedDiagnosticId: blocked.diagnostics[0].id,
            };
        })(),
        {
            schemaId: "possessive-state-nnc",
            slotSource: "andrews-formula-slot-schema",
            families: [
                ["monadic-possessive-state", "#pers1-pers2+st(STEM)num1-num2#"],
                ["dyadic-possessive-state", "#pers1-pers2+st1-st2(STEM)num1-num2#"],
            ],
            structuralFormulaEcho: "#Ø-Ø+n-o(kal)Ø-Ø#",
            nawatFormulaEcho: "#Ø-Ø+n-u(kal)Ø-Ø#",
            compactFormulaEcho: "#Ø-Ø+nu(kal)Ø#",
            surface: "nukal",
            generationStatus: "generated",
            stateSlot: {
                token: "st1-st2",
                role: "possessive-state",
                owner: "predicate",
                path: "predicate.state.st1-st2",
                structuralValue: "n-o",
                nawatValue: "n-u",
                compactValue: "nu",
                blocked: ["subject-connector", "tense"],
            },
            connectorSlot: {
                role: "subject-number-connector",
                owner: "subject",
                path: "subject.num1-num2",
                value: "Ø-Ø",
                compactValue: "Ø",
                blocked: ["tense", "stem-suffix", "nounstem", "predicate-state"],
            },
            realizationBoundary: {
                structuralFormulaEcho: "#Ø-Ø+n-o(kal)Ø-Ø#",
                nawatFormulaEcho: "#Ø-Ø+n-u(kal)Ø-Ø#",
                compactFormulaEcho: "#Ø-Ø+nu(kal)Ø#",
                classicalStructuralOnly: true,
                noClassicalSurfaceImport: true,
                structuralExamples: ["hu-an", "uh-0", "hui-0"],
                nawatAuthority: "Nawat/Pipil orthography bridge; examples illustrate spelling only and do not gate grammar logic",
            },
            specific: {
                status: "generated",
                statePosition: "dyadic",
                possessorKind: "specific-dyadic",
                structuralFormulaEcho: "#Ø-Ø+n-o(kal)Ø-Ø#",
                nawatFormulaEcho: "#Ø-Ø+n-u(kal)Ø-Ø#",
                compactFormulaEcho: "#Ø-Ø+nu(kal)Ø#",
                surface: "nukal",
                possessorStructural: "n-o",
                possessorNawat: "n-u",
            },
            monadic: {
                status: "andrews-logic-generated",
                statePosition: "monadic",
                possessorKind: "nonspecific-monadic",
                formulaTemplate: "#pers1-pers2+st(STEM)num1-num2#",
                structuralFormulaEcho: "#Ø-Ø+te(kal)Ø-Ø#",
                nawatFormulaEcho: "#Ø-Ø+te(kal)Ø-Ø#",
                surface: "tekal",
                sourceFrameKind: "possessive-state-nnc-monadic-source-frame",
                operationId: "possessive-state-nnc-monadic-realization",
                diagnosticCount: 0,
            },
            blockedStatus: "blocked",
            blockedDiagnosticId: "possessive-nnc-missing-predicate-stem",
        }
    );
    s.eq(
        "possessive-state monadic example consumes typed frames instead of display strings",
        (() => {
            const formulaSlots = ctx.buildPossessiveStateNncFormulaSlots({
                stem: "kal",
                possessorKind: "monadic",
                possessor: "te",
            });
            const sourceFrame = ctx.buildPossessiveStateNncMonadicSourceFrame({ formulaSlots });
            const operationFrame = ctx.buildPossessiveStateNncMonadicOperationFrame(sourceFrame);
            const summarize = (example) => ({
                supported: example.supported,
                surface: example.surface,
                stem: example.stem,
                diagnostics: example.diagnostics.map((diagnostic) => diagnostic.id),
                sourceFrameKind: example.sourceFrame?.kind || "",
                operationId: example.operationFrame?.operationId || "",
            });
            return {
                helperTypes: [
                    typeof ctx.buildPossessiveStateNncMonadicSourceFrame,
                    typeof ctx.buildPossessiveStateNncMonadicOperationFrame,
                    typeof ctx.getPossessiveStateNncMonadicFrameMismatch,
                ],
                stringOnly: summarize(ctx.buildPossessiveStateNncFormulaWorkbenchExample({
                    stem: "kal",
                    possessorKind: "monadic",
                    possessor: "te",
                })),
                authorized: summarize(ctx.buildPossessiveStateNncFormulaWorkbenchExample({
                    stem: "poison",
                    possessorKind: "monadic",
                    possessor: "te",
                    formulaSlots,
                    sourceFrame,
                    operationFrame,
                })),
                changedString: summarize(ctx.buildPossessiveStateNncFormulaWorkbenchExample({
                    stem: "changed-display",
                    possessorKind: "monadic",
                    possessor: "ne",
                    formulaSlots,
                    sourceFrame,
                    operationFrame,
                })),
                missingOperation: summarize(ctx.buildPossessiveStateNncFormulaWorkbenchExample({
                    possessorKind: "monadic",
                    possessor: "te",
                    formulaSlots,
                    sourceFrame,
                    operationFrame: {},
                })),
                contradictorySource: summarize(ctx.buildPossessiveStateNncFormulaWorkbenchExample({
                    possessorKind: "monadic",
                    possessor: "te",
                    formulaSlots,
                    sourceFrame: {
                        ...sourceFrame,
                        sourceSignature: "poison",
                    },
                    operationFrame,
                })),
                contradictoryTarget: summarize(ctx.buildPossessiveStateNncFormulaWorkbenchExample({
                    possessorKind: "monadic",
                    possessor: "te",
                    formulaSlots,
                    sourceFrame,
                    operationFrame: {
                        ...operationFrame,
                        targetFrame: {
                            ...operationFrame.targetFrame,
                            surface: "poison",
                        },
                    },
                })),
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            stringOnly: {
                supported: false,
                surface: "",
                stem: "kal",
                diagnostics: ["possessive-state-nnc-monadic-missing-source-frame"],
                sourceFrameKind: "",
                operationId: "",
            },
            authorized: {
                supported: true,
                surface: "tekal",
                stem: "kal",
                diagnostics: [],
                sourceFrameKind: "possessive-state-nnc-monadic-source-frame",
                operationId: "possessive-state-nnc-monadic-realization",
            },
            changedString: {
                supported: true,
                surface: "tekal",
                stem: "kal",
                diagnostics: [],
                sourceFrameKind: "possessive-state-nnc-monadic-source-frame",
                operationId: "possessive-state-nnc-monadic-realization",
            },
            missingOperation: {
                supported: false,
                surface: "",
                stem: "kal",
                diagnostics: ["possessive-state-nnc-monadic-missing-operation-frame"],
                sourceFrameKind: "possessive-state-nnc-monadic-source-frame",
                operationId: "",
            },
            contradictorySource: {
                supported: false,
                surface: "",
                stem: "kal",
                diagnostics: ["possessive-state-nnc-monadic-contradictory-frame"],
                sourceFrameKind: "possessive-state-nnc-monadic-source-frame",
                operationId: "possessive-state-nnc-monadic-realization",
            },
            contradictoryTarget: {
                supported: false,
                surface: "",
                stem: "kal",
                diagnostics: ["possessive-state-nnc-monadic-contradictory-frame"],
                sourceFrameKind: "possessive-state-nnc-monadic-source-frame",
                operationId: "possessive-state-nnc-monadic-realization",
            },
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
                stem: "tapiyal",
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
        "ordinary NNC live route blocks legacy formula strings from deciding grammar",
        (() => {
            const blocked = ctx.generateOrdinaryNncParadigm({
                stem: "(siwa)t",
                state: "absolutive",
                number: "singular",
            });
            const authorizedSlots = ctx.buildOrdinaryNncFormulaSlots({
                stem: "siwa",
                state: "absolutive",
                number: "singular",
                nounClass: "t",
            });
            const authorized = ctx.generateOrdinaryNncParadigm({
                stem: "(siwa)t",
                state: "absolutive",
                number: "singular",
                formulaSlots: authorizedSlots,
            });
            const poisonedSlots = ctx.buildOrdinaryNncFormulaSlots({
                stem: "kal",
                state: "absolutive",
                number: "singular",
                nounClass: "zero",
            });
            const poisoned = ctx.generateOrdinaryNncParadigm({
                stem: "(siwa)t",
                state: "absolutive",
                number: "singular",
                formulaSlots: poisonedSlots,
            });
            const blockedParse = ctx.parseOrdinaryNncPredicateFormulaInput("(siwa)t");
            const diagnosticOnlyParse = ctx.parseOrdinaryNncPredicateFormulaInput("(siwa)t", { diagnosticOnly: true });
            const setFromFormulaString = ctx.generateOrdinaryNncParadigmSet({
                stem: "(siwa)t",
                states: ["absolutive"],
                numbers: ["singular"],
            });
            const setFromBareFormulaString = ctx.generateOrdinaryNncParadigmSet({
                stem: "(kal)",
                states: ["absolutive"],
                numbers: ["singular"],
            });
            const fixtureFromFormulaString = ctx.resolveOrdinaryNncFixture({ stem: "(siwa)t" });
            const fixtureFromBareFormulaString = ctx.resolveOrdinaryNncFixture({ stem: "(kal)" });
            return {
                blockedParse,
                diagnosticOnlyParse,
                setFromFormulaString: {
                    supported: setFromFormulaString.supported,
                    stem: setFromFormulaString.stem,
                    entryCount: Array.isArray(setFromFormulaString.entries) ? setFromFormulaString.entries.length : 0,
                },
                setFromBareFormulaString: {
                    supported: setFromBareFormulaString.supported,
                    stem: setFromBareFormulaString.stem,
                    entryCount: Array.isArray(setFromBareFormulaString.entries) ? setFromBareFormulaString.entries.length : 0,
                },
                fixtureFromFormulaString,
                fixtureFromBareFormulaString,
                blocked: {
                    supported: blocked.supported,
                    result: blocked.result,
                    stem: blocked.stem,
                    nounClass: blocked.nounClass,
                    diagnostic: blocked.diagnostics[0]?.id,
                },
                authorized: {
                    supported: authorized.supported,
                    result: authorized.result,
                    stem: authorized.stem,
                    nounClass: authorized.nounClass,
                    formulaEcho: authorized.clauseFrame.formulaEcho,
                },
                poisoned: {
                    supported: poisoned.supported,
                    result: poisoned.result,
                    stem: poisoned.stem,
                    nounClass: poisoned.nounClass,
                    diagnostic: poisoned.diagnostics[0]?.id,
                    formulaEcho: poisoned.clauseFrame.formulaEcho,
                },
            };
        })(),
        {
            blockedParse: {
                status: "blocked",
                diagnosticId: "ordinary-nnc-predicate-formula-string-diagnostic-only",
                authorization: "blocked",
                boundaries: {
                    noStemInference: true,
                    noNounClassInference: true,
                    noGenerationAuthority: true,
                },
            },
            diagnosticOnlyParse: {
                stem: "siwa",
                nounClass: "t",
                connectorSurface: "t",
                predicateFormula: "(siwa)t",
            },
            setFromFormulaString: {
                supported: false,
                stem: "",
                entryCount: 0,
            },
            setFromBareFormulaString: {
                supported: false,
                stem: "",
                entryCount: 0,
            },
            fixtureFromFormulaString: null,
            fixtureFromBareFormulaString: null,
            blocked: {
                supported: false,
                result: "",
                stem: "siwa",
                nounClass: "t",
                diagnostic: "ordinary-nnc-legacy-formula-string-blocked",
            },
            authorized: {
                supported: true,
                result: "siwat",
                stem: "siwa",
                nounClass: "t",
                formulaEcho: "#Ø-Ø(siwa)t#",
            },
            poisoned: {
                supported: false,
                result: "",
                stem: "kal",
                nounClass: "zero",
                diagnostic: "ordinary-nnc-legacy-formula-string-conflicts-with-slots",
                formulaEcho: "#Ø-Ø(kal)Ø#",
            },
        }
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
                diagnostic: "ordinary-nnc-legacy-formula-string-blocked",
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
    const animateSubjectPrefixSourceFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
        sourceStem: "ishkat",
        sourceSurface: "ishkat",
        subject: { subjectPrefix: "ni", subjectSuffix: "" },
        state: "absolutive",
        animacy: "animate",
    });
    const animateSubjectPrefixOperationFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixOperationFrame(
        animateSubjectPrefixSourceFrame
    );
    const contradictoryAnimateSubjectPrefixOperationFrame = {
        ...animateSubjectPrefixOperationFrame,
        targetFrame: {
            ...animateSubjectPrefixOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const oldAnimateSubjectPrefixHelper = ctx.applyOrdinaryNncSubjectPrefixResult;
    ctx.applyOrdinaryNncSubjectPrefixResult = () => ({
        surface: "poison-surface",
        soundSpellingFrames: [],
    });
    const monkeypatchedAnimateSubjectPrefix = ctx.generateOrdinaryNncParadigm({
        stem: "ishkat",
        state: "absolutive",
        animacy: "animate",
        subject: { subjectPrefix: "ni", subjectSuffix: "" },
        number: "singular",
    });
    ctx.applyOrdinaryNncSubjectPrefixResult = oldAnimateSubjectPrefixHelper;
    const typedAnimateSubjectPrefix = ctx.generateOrdinaryNncParadigm({
        stem: "ishkat",
        state: "absolutive",
        animacy: "animate",
        subject: { subjectPrefix: "ni", subjectSuffix: "" },
        number: "singular",
    });
    s.eq(
        "ordinary NNC animate singular subject prefix consumes typed source and operation frames",
        {
            outputResult: typedAnimateSubjectPrefix.result,
            subjectSourceFrameKind: typedAnimateSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.kind || "",
            subjectOperationId: typedAnimateSubjectPrefix.ordinaryNncSubjectPrefixOperationFrames?.[0]?.operationId || "",
            sourceSurfaceIsGeneratedDisplay: typedAnimateSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.sourceSurfaceIsGeneratedDisplay,
            sourceFrameConsumesRenderedInput: typedAnimateSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.consumesRenderedInput,
            sourceFrameDisplayAuthority: typedAnimateSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.displayStringsAuthorizeGrammar,
            directMissingOperation: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animateSubjectPrefixSourceFrame,
            }),
            contradictoryTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animateSubjectPrefixSourceFrame,
                operationFrame: contradictoryAnimateSubjectPrefixOperationFrame,
            }),
            oldStringApiBlocked: ctx.applyOrdinaryNncSubjectPrefixResult(
                "ishkat",
                { subjectPrefix: "ni", subjectSuffix: "" },
                "absolutive",
                "animate"
            ).surface,
            framedTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animateSubjectPrefixSourceFrame,
                operationFrame: animateSubjectPrefixOperationFrame,
            }),
            monkeypatchedResult: monkeypatchedAnimateSubjectPrefix.result,
        },
        {
            outputResult: "nishkat",
            subjectSourceFrameKind: "ordinary-nnc-animate-subject-prefix-source-frame",
            subjectOperationId: "ordinary-nnc-animate-subject-prefix-realization",
            sourceSurfaceIsGeneratedDisplay: false,
            sourceFrameConsumesRenderedInput: false,
            sourceFrameDisplayAuthority: false,
            directMissingOperation: "",
            contradictoryTarget: "",
            oldStringApiBlocked: "",
            framedTarget: "nishkat",
            monkeypatchedResult: "nishkat",
        }
    );
    const animateSubjectFixtureFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "mistun",
        state: "absolutive",
        number: "singular",
        nounClass: "zero",
    });
    const animateSubjectFixtureSubject = {
        subjectPrefix: "ti",
        subjectSuffix: "",
        personSubKey: "2sg",
        number: "singular",
    };
    const typedAnimateFixtureSubjectPrefix = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: animateSubjectFixtureFormulaSlots,
        state: "absolutive",
        animacy: "animate",
        subject: animateSubjectFixtureSubject,
        number: "singular",
    });
    const animateFixtureSubjectPrefixPairs = typedAnimateFixtureSubjectPrefix.formulaSurfacePairs || [];
    const animateFixtureSubjectPrefixPoisonedPairs = animateFixtureSubjectPrefixPairs.map(poisonOrdinaryNncPairDisplays);
    const animateFixtureSubjectPrefixPoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: animateFixtureSubjectPrefixPoisonedPairs,
    });
    const animateFixtureSubjectPrefixPoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        animateFixtureSubjectPrefixPoisonedSourceFrame
    );
    const animateFixtureAbsolutiveSourceFrame = ctx.buildOrdinaryNncAbsolutiveSingularSourceFrame({
        sourceStem: "mistun",
        nounClass: "zero",
        state: "absolutive",
        number: "singular",
        animacy: "animate",
    });
    const animateFixtureAbsolutiveOperationFrame = ctx.buildOrdinaryNncAbsolutiveSingularOperationFrame(
        animateFixtureAbsolutiveSourceFrame
    );
    const animateFixtureSubjectPrefixSourceFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
        sourceStem: "mistun",
        sourceSurface: animateFixtureAbsolutiveOperationFrame.targetFrame.surface,
        sourceSurfaceRole: "ordinary-nnc-prior-typed-absolutive-singular-source-form",
        priorSourceFrame: animateFixtureAbsolutiveSourceFrame,
        priorOperationFrame: animateFixtureAbsolutiveOperationFrame,
        subject: animateSubjectFixtureSubject,
        state: "absolutive",
        animacy: "animate",
    });
    const animateFixtureSubjectPrefixOperationFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixOperationFrame(
        animateFixtureSubjectPrefixSourceFrame
    );
    const contradictoryAnimateFixtureSubjectPrefixOperationFrame = {
        ...animateFixtureSubjectPrefixOperationFrame,
        targetFrame: {
            ...animateFixtureSubjectPrefixOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const missingTargetAnimateFixtureSubjectPrefixOperationFrame = {
        ...animateFixtureSubjectPrefixOperationFrame,
        targetFrame: null,
    };
    const oldAnimateFixtureSubjectFixtures = ctx.ORDINARY_NNC_FIXTURES;
    const oldAnimateFixtureSubjectPrefixHelper = ctx.applyOrdinaryNncSubjectPrefixResult;
    ctx.ORDINARY_NNC_FIXTURES = oldAnimateFixtureSubjectFixtures.map((fixture) => (
        fixture.id === "mistun"
            ? {
                ...fixture,
                states: {
                    ...fixture.states,
                    absolutive: {
                        ...fixture.states.absolutive,
                        numberForms: {
                            ...fixture.states.absolutive.numberForms,
                            singular: {
                                ...fixture.states.absolutive.numberForms.singular,
                                surfaceForms: ["poison-static-surface"],
                            },
                        },
                    },
                },
            }
            : fixture
    ));
    ctx.applyOrdinaryNncSubjectPrefixResult = () => ({
        surface: "poison-subject-prefix-surface",
        soundSpellingFrames: [],
    });
    const poisonedAnimateFixtureSubjectPrefix = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: animateSubjectFixtureFormulaSlots,
        state: "absolutive",
        animacy: "animate",
        subject: animateSubjectFixtureSubject,
        number: "singular",
    });
    ctx.ORDINARY_NNC_FIXTURES = oldAnimateFixtureSubjectFixtures;
    ctx.applyOrdinaryNncSubjectPrefixResult = oldAnimateFixtureSubjectPrefixHelper;
    s.eq(
        "ordinary NNC animate fixture singular subject prefix consumes prior typed absolutive frame",
        {
            outputResult: typedAnimateFixtureSubjectPrefix.result,
            outputSurfaceForms: typedAnimateFixtureSubjectPrefix.surfaceForms,
            absolutiveSourceFrameKind: typedAnimateFixtureSubjectPrefix.ordinaryNncAbsolutiveSingularSourceFrames?.[0]?.kind || "",
            absolutiveOperationId: typedAnimateFixtureSubjectPrefix.ordinaryNncAbsolutiveSingularOperationFrames?.[0]?.operationId || "",
            subjectSourceFrameKind: typedAnimateFixtureSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.kind || "",
            subjectOperationId: typedAnimateFixtureSubjectPrefix.ordinaryNncSubjectPrefixOperationFrames?.[0]?.operationId || "",
            priorOperationId: typedAnimateFixtureSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.priorOperationId || "",
            sourceSurfaceRole: typedAnimateFixtureSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.sourceSurfaceRole || "",
            sourceSurfaceIsGeneratedDisplay: typedAnimateFixtureSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.sourceSurfaceIsGeneratedDisplay,
            sourceFrameConsumesRenderedInput: typedAnimateFixtureSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.consumesRenderedInput,
            sourceFrameDisplayAuthority: typedAnimateFixtureSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(animateFixtureSubjectPrefixPoisonedPairs, {
                sourceFrame: animateFixtureSubjectPrefixPoisonedSourceFrame,
                operationFrame: animateFixtureSubjectPrefixPoisonedOperationFrame,
            }),
            poisonedStaticSurfaceFormsAndMonkeypatchResult: poisonedAnimateFixtureSubjectPrefix.result,
            directMissingOperation: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animateFixtureSubjectPrefixSourceFrame,
            }),
            directMissingTargetFrame: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animateFixtureSubjectPrefixSourceFrame,
                operationFrame: missingTargetAnimateFixtureSubjectPrefixOperationFrame,
            }),
            oldStringApiBlocked: ctx.applyOrdinaryNncSubjectPrefixResult(
                "mistun",
                animateSubjectFixtureSubject,
                "absolutive",
                "animate"
            ).surface,
            oldStringApiAllowBlocked: ctx.applyOrdinaryNncSubjectPrefixResult(
                "mistun",
                animateSubjectFixtureSubject,
                "absolutive",
                "animate",
                { allowLegacyStringSubjectPrefix: true }
            ).surface,
            contradictoryTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animateFixtureSubjectPrefixSourceFrame,
                operationFrame: contradictoryAnimateFixtureSubjectPrefixOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animateFixtureSubjectPrefixSourceFrame,
                operationFrame: animateFixtureSubjectPrefixOperationFrame,
            }),
        },
        {
            outputResult: "timistun",
            outputSurfaceForms: ["timistun"],
            absolutiveSourceFrameKind: "ordinary-nnc-absolutive-singular-source-frame",
            absolutiveOperationId: "ordinary-nnc-absolutive-singular-realization",
            subjectSourceFrameKind: "ordinary-nnc-animate-subject-prefix-source-frame",
            subjectOperationId: "ordinary-nnc-animate-subject-prefix-realization",
            priorOperationId: "ordinary-nnc-absolutive-singular-realization",
            sourceSurfaceRole: "ordinary-nnc-prior-typed-absolutive-singular-source-form",
            sourceSurfaceIsGeneratedDisplay: false,
            sourceFrameConsumesRenderedInput: false,
            sourceFrameDisplayAuthority: false,
            poisonedDisplayResult: "timistun",
            poisonedStaticSurfaceFormsAndMonkeypatchResult: "timistun",
            directMissingOperation: "",
            directMissingTargetFrame: "",
            oldStringApiBlocked: "",
            oldStringApiAllowBlocked: "",
            contradictoryTarget: "",
            framedTarget: "timistun",
        }
    );
    const animatePossessiveSubjectFormulaSlots = ctx.buildOrdinaryNncFormulaSlots({
        stem: "mistun",
        state: "possessive",
        number: "singular",
        nounClass: "zero",
    });
    const typedAnimatePossessiveSubjectPrefix = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: animatePossessiveSubjectFormulaSlots,
        state: "possessive",
        possessor: "nu",
        animacy: "animate",
        subject: animateSubjectFixtureSubject,
        number: "singular",
    });
    const animatePossessiveSubjectPrefixPairs = typedAnimatePossessiveSubjectPrefix.formulaSurfacePairs || [];
    const animatePossessiveSubjectPrefixPoisonedPairs = animatePossessiveSubjectPrefixPairs.map(poisonOrdinaryNncPairDisplays);
    const animatePossessiveSubjectPrefixPoisonedSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
        formulaSurfacePairs: animatePossessiveSubjectPrefixPoisonedPairs,
    });
    const animatePossessiveSubjectPrefixPoisonedOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(
        animatePossessiveSubjectPrefixPoisonedSourceFrame
    );
    const animatePossessivePriorSourceFrame = ctx.buildOrdinaryNncOpenStemPossessiveSourceFrame({
        sourceStem: "mistun",
        formulaStem: "mistun",
        sourceStemEvidence: "ordinary-nnc-zero-class-formula-stem",
        possessor: ctx.resolveOrdinaryNncPossessor("nu"),
        animacy: "animate",
    });
    const animatePossessivePriorOperationFrame = ctx.buildOrdinaryNncOpenStemPossessiveOperationFrame(
        animatePossessivePriorSourceFrame
    );
    const animatePossessiveSubjectPrefixSourceFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixSourceFrame({
        sourceStem: "mistun",
        sourceSurface: animatePossessivePriorOperationFrame.targetFrame.surface,
        sourceSurfaceRole: "ordinary-nnc-prior-typed-possessive-singular-source-form",
        priorSourceFrame: animatePossessivePriorSourceFrame,
        priorOperationFrame: animatePossessivePriorOperationFrame,
        subject: animateSubjectFixtureSubject,
        state: "possessive",
        animacy: "animate",
    });
    const animatePossessiveSubjectPrefixOperationFrame = ctx.buildOrdinaryNncAnimateSubjectPrefixOperationFrame(
        animatePossessiveSubjectPrefixSourceFrame
    );
    const contradictoryAnimatePossessiveSubjectPrefixOperationFrame = {
        ...animatePossessiveSubjectPrefixOperationFrame,
        targetFrame: {
            ...animatePossessiveSubjectPrefixOperationFrame.targetFrame,
            surface: "poison-surface",
        },
    };
    const missingTargetAnimatePossessiveSubjectPrefixOperationFrame = {
        ...animatePossessiveSubjectPrefixOperationFrame,
        targetFrame: null,
    };
    const oldAnimatePossessiveSubjectFixtures = ctx.ORDINARY_NNC_FIXTURES;
    const oldAnimatePossessiveSubjectPrefixHelper = ctx.applyOrdinaryNncSubjectPrefixResult;
    ctx.ORDINARY_NNC_FIXTURES = oldAnimatePossessiveSubjectFixtures.map((fixture) => (
        fixture.id === "mistun"
            ? {
                ...fixture,
                states: {
                    ...fixture.states,
                    possessive: {
                        ...fixture.states.possessive,
                        numberFormsByPossessor: {
                            ...fixture.states.possessive.numberFormsByPossessor,
                            singular: {
                                ...fixture.states.possessive.numberFormsByPossessor.singular,
                                nu: {
                                    ...fixture.states.possessive.numberFormsByPossessor.singular.nu,
                                    surfaceForms: ["poison-static-possessive-surface"],
                                },
                            },
                        },
                    },
                },
            }
            : fixture
    ));
    ctx.applyOrdinaryNncSubjectPrefixResult = () => ({
        surface: "poison-subject-prefix-surface",
        soundSpellingFrames: [],
    });
    const poisonedAnimatePossessiveSubjectPrefix = ctx.generateOrdinaryNncParadigm({
        stem: "poison-display-stem",
        formulaSlots: animatePossessiveSubjectFormulaSlots,
        state: "possessive",
        possessor: "nu",
        animacy: "animate",
        subject: animateSubjectFixtureSubject,
        number: "singular",
    });
    ctx.ORDINARY_NNC_FIXTURES = oldAnimatePossessiveSubjectFixtures;
    ctx.applyOrdinaryNncSubjectPrefixResult = oldAnimatePossessiveSubjectPrefixHelper;
    s.eq(
        "ordinary NNC animate fixture possessive subject prefix consumes prior typed possessive frame",
        {
            outputResult: typedAnimatePossessiveSubjectPrefix.result,
            outputSurfaceForms: typedAnimatePossessiveSubjectPrefix.surfaceForms,
            possessiveSourceFrameKind: typedAnimatePossessiveSubjectPrefix.ordinaryNncStructuredPossessiveSourceFrames?.[0]?.kind || "",
            possessiveOperationId: typedAnimatePossessiveSubjectPrefix.ordinaryNncStructuredPossessiveOperationFrames?.[0]?.operationId || "",
            subjectSourceFrameKind: typedAnimatePossessiveSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.kind || "",
            subjectOperationId: typedAnimatePossessiveSubjectPrefix.ordinaryNncSubjectPrefixOperationFrames?.[0]?.operationId || "",
            priorOperationId: typedAnimatePossessiveSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.priorOperationId || "",
            sourceSurfaceRole: typedAnimatePossessiveSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.sourceSurfaceRole || "",
            sourceSurfaceIsGeneratedDisplay: typedAnimatePossessiveSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.sourceSurfaceIsGeneratedDisplay,
            sourceFrameConsumesRenderedInput: typedAnimatePossessiveSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.consumesRenderedInput,
            sourceFrameDisplayAuthority: typedAnimatePossessiveSubjectPrefix.ordinaryNncSubjectPrefixSourceFrames?.[0]?.displayStringsAuthorizeGrammar,
            poisonedDisplayResult: ctx.buildOrdinaryNncResultText(animatePossessiveSubjectPrefixPoisonedPairs, {
                sourceFrame: animatePossessiveSubjectPrefixPoisonedSourceFrame,
                operationFrame: animatePossessiveSubjectPrefixPoisonedOperationFrame,
            }),
            poisonedStaticSurfaceFormsAndMonkeypatchResult: poisonedAnimatePossessiveSubjectPrefix.result,
            directMissingOperation: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animatePossessiveSubjectPrefixSourceFrame,
            }),
            directMissingTargetFrame: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animatePossessiveSubjectPrefixSourceFrame,
                operationFrame: missingTargetAnimatePossessiveSubjectPrefixOperationFrame,
            }),
            oldStringApiBlocked: ctx.applyOrdinaryNncSubjectPrefixResult(
                "numistun",
                animateSubjectFixtureSubject,
                "possessive",
                "animate"
            ).surface,
            oldStringApiAllowBlocked: ctx.applyOrdinaryNncSubjectPrefixResult(
                "numistun",
                animateSubjectFixtureSubject,
                "possessive",
                "animate",
                { allowLegacyStringSubjectPrefix: true }
            ).surface,
            contradictoryTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animatePossessiveSubjectPrefixSourceFrame,
                operationFrame: contradictoryAnimatePossessiveSubjectPrefixOperationFrame,
            }),
            framedTarget: ctx.buildOrdinaryNncAnimateSubjectPrefixedSurfaceFromFrame({
                sourceFrame: animatePossessiveSubjectPrefixSourceFrame,
                operationFrame: animatePossessiveSubjectPrefixOperationFrame,
            }),
        },
        {
            outputResult: "tinumistun",
            outputSurfaceForms: ["tinumistun"],
            possessiveSourceFrameKind: "ordinary-nnc-open-stem-possessive-source-frame",
            possessiveOperationId: "ordinary-nnc-open-stem-possessive-realization",
            subjectSourceFrameKind: "ordinary-nnc-animate-subject-prefix-source-frame",
            subjectOperationId: "ordinary-nnc-animate-subject-prefix-realization",
            priorOperationId: "ordinary-nnc-open-stem-possessive-realization",
            sourceSurfaceRole: "ordinary-nnc-prior-typed-possessive-singular-source-form",
            sourceSurfaceIsGeneratedDisplay: false,
            sourceFrameConsumesRenderedInput: false,
            sourceFrameDisplayAuthority: false,
            poisonedDisplayResult: "tinumistun",
            poisonedStaticSurfaceFormsAndMonkeypatchResult: "tinumistun",
            directMissingOperation: "",
            directMissingTargetFrame: "",
            oldStringApiBlocked: "",
            oldStringApiAllowBlocked: "",
            contradictoryTarget: "",
            framedTarget: "tinumistun",
        }
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
            const formulaSlots = ctx.buildOrdinaryNncFormulaSlots({
                stem: "naka",
                nounClass: "t",
                state: "possessive",
                number: "singular",
            });
            const stringOnly = ctx.generateOrdinaryNncParadigm({
                stem: "naka",
                state: "possessive",
                possessor: "nu",
                possessionKind: "organic",
            });
            const direct = ctx.generateOrdinaryNncParadigm({
                stem: "poison",
                state: "possessive",
                possessor: "nu",
                possessionKind: "organic",
                formulaSlots,
            });
            const sourceFrame = ctx.buildOrdinaryNncOrganicPossessionSourceFrame({
                formulaSlots,
                possessor: { prefix: "nu" },
                possessionKind: "organic",
            });
            const surfaceSourceFrame = ctx.buildOrdinaryNncOpenStemPossessiveSourceFrame({
                sourceStem: "nakayu",
                possessor: ctx.resolveOrdinaryNncPossessor("nu"),
                animacy: "inanimate",
            });
            const surfaceOperationFrame = ctx.buildOrdinaryNncOpenStemPossessiveOperationFrame(surfaceSourceFrame);
            const contradictorySurfaceOperationFrame = {
                ...surfaceOperationFrame,
                targetFrame: {
                    ...surfaceOperationFrame.targetFrame,
                    surface: "poison-surface",
                },
            };
            const missingOperationStem = ctx.buildOrdinaryNncOrganicPossessionStem("poison", {
                sourceFrame,
            });
            const oldOrganicStemBuilder = ctx.buildOrdinaryNncOrganicPossessionStem;
            const oldSurfaceChainBuilder = ctx.buildOrdinaryNncSurfaceChainResult;
            ctx.buildOrdinaryNncOrganicPossessionStem = () => "poison";
            ctx.buildOrdinaryNncSurfaceChainResult = () => ({ surface: "poison-surface", surfaceForms: ["poison-surface"] });
            const poisoned = ctx.generateOrdinaryNncParadigm({
                stem: "poison",
                state: "possessive",
                possessor: "nu",
                possessionKind: "organic",
                formulaSlots,
            });
            ctx.buildOrdinaryNncOrganicPossessionStem = oldOrganicStemBuilder;
            ctx.buildOrdinaryNncSurfaceChainResult = oldSurfaceChainBuilder;
            const poisonedPairs = direct.formulaSurfacePairs.map(poisonOrdinaryNncPairDisplays);
            const poisonedResultTextSourceFrame = ctx.buildOrdinaryNncResultTextSourceFrame({
                formulaSurfacePairs: poisonedPairs,
            });
            const poisonedResultTextOperationFrame = ctx.buildOrdinaryNncResultTextOperationFrame(poisonedResultTextSourceFrame);
            const generated = ctx.executeGenerateWordRequest(buildSilentOrdinaryNncRequest({
                stem: "poison",
                state: "possessive",
                possessor: "nu",
                possessionKind: "organic",
                formulaSlots,
            }));
            const frameSummary = (frame) => frame ? {
                version: frame.version,
                outputKind: frame.outputKind,
                lessonRef: frame.lessonRef,
                stateCase: frame.stateCase,
                possessionKind: frame.possessionKind,
                sourceStem: frame.sourceStem,
                matrixStem: frame.matrixStem,
                classicalAnalogue: frame.classicalAnalogue,
                nawatMatrix: frame.nawatMatrix,
                predicateStem: frame.predicateStem,
                requiredState: frame.requiredState,
                possessorPrefix: frame.possessorPrefix,
                semanticRelation: frame.semanticRelation,
                spellingAuthority: frame.spellingAuthority,
                grammarAuthority: frame.grammarAuthority,
                sourceFrameKind: frame.sourceFrame?.kind || "",
                operationId: frame.operationFrame?.operationId || "",
            } : null;
            return {
                helperTypes: [
                    typeof ctx.buildOrdinaryNncOrganicPossessionSourceFrame,
                    typeof ctx.buildOrdinaryNncOrganicPossessionOperationFrame,
                    typeof ctx.getOrdinaryNncOrganicPossessionFrameMismatch,
                ],
                stringOnly: {
                    supported: stringOnly.supported,
                    diagnostic: stringOnly.diagnostics[0]?.id || "",
                },
                missingOperationStem,
                direct: {
                    supported: direct.supported,
                    result: direct.result,
                    stem: direct.stem,
                    sourceStem: direct.sourceStem,
                    nounClass: direct.nounClass,
                    possessionKind: direct.possessionKind,
                    source: direct.source,
                    frame: frameSummary(direct.organicPossessionFrame),
                    sourceFrameKind: direct.organicPossessionSourceFrame?.kind || "",
                    operationId: direct.organicPossessionOperationFrame?.operationId || "",
                    surfaceSourceFrameKind: direct.organicSurfaceSourceFrame?.kind || "",
                    surfaceOperationId: direct.organicSurfaceOperationFrame?.operationId || "",
                    poisonedDisplayResult: ctx.buildOrdinaryNncResultText(poisonedPairs, {
                        sourceFrame: poisonedResultTextSourceFrame,
                        operationFrame: poisonedResultTextOperationFrame,
                    }),
                    surfaceMissingOperation: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                        sourceFrame: surfaceSourceFrame,
                    }),
                    surfaceContradictoryTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                        sourceFrame: surfaceSourceFrame,
                        operationFrame: contradictorySurfaceOperationFrame,
                    }),
                    surfaceFramedTarget: ctx.buildOrdinaryNncOpenStemPossessiveSurfaceFromFrame({
                        sourceFrame: surfaceSourceFrame,
                        operationFrame: surfaceOperationFrame,
                    }),
                    oldSurfaceApiBlocked: ctx.buildOrdinaryNncOpenStemPossessiveSurface("nakayu", "nu", "inanimate"),
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(direct.nncBasic.formulaSlots),
                },
                poisoned: {
                    supported: poisoned.supported,
                    result: poisoned.result,
                    stem: poisoned.stem,
                    sourceStem: poisoned.sourceStem,
                },
                generated: {
                    result: generated.result,
                    surfaceForms: generated.surfaceForms,
                    generationRoute: generated.generationRoute,
                    frame: frameSummary(generated.organicPossessionFrame),
                },
            };
        })(),
        {
            helperTypes: ["function", "function", "function"],
            stringOnly: {
                supported: false,
                diagnostic: "ordinary-nnc-organic-possession-missing-source-frame",
            },
            missingOperationStem: "",
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
                    sourceFrameKind: "ordinary-nnc-organic-possession-source-frame",
                    operationId: "ordinary-nnc-organic-possession-yu-realization",
                },
                sourceFrameKind: "ordinary-nnc-organic-possession-source-frame",
                operationId: "ordinary-nnc-organic-possession-yu-realization",
                surfaceSourceFrameKind: "ordinary-nnc-open-stem-possessive-source-frame",
                surfaceOperationId: "ordinary-nnc-open-stem-possessive-realization",
                poisonedDisplayResult: "nunakayu",
                surfaceMissingOperation: "",
                surfaceContradictoryTarget: "",
                surfaceFramedTarget: "nunakayu",
                oldSurfaceApiBlocked: "",
                formulaEcho: "#Ø-Ø(nakayu)t#",
            },
            poisoned: {
                supported: true,
                result: "nunakayu",
                stem: "nakayu",
                sourceStem: "naka",
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
                    sourceFrameKind: "ordinary-nnc-organic-possession-source-frame",
                    operationId: "ordinary-nnc-organic-possession-yu-realization",
                },
            },
        }
    );
    s.eq(
        "Andrews 39.3.4 organic possession rejects absolutive and missing-possessor requests",
        (() => {
            const formulaSlots = ctx.buildOrdinaryNncFormulaSlots({
                stem: "naka",
                nounClass: "t",
                state: "possessive",
                number: "singular",
            });
            const sourceFrame = ctx.buildOrdinaryNncOrganicPossessionSourceFrame({
                formulaSlots,
                possessor: { prefix: "nu" },
                possessionKind: "organic",
            });
            const operationFrame = ctx.buildOrdinaryNncOrganicPossessionOperationFrame(sourceFrame);
            return [
                ctx.generateOrdinaryNncParadigm({
                    stem: "poison",
                    state: "absolutive",
                    possessionKind: "organic",
                    formulaSlots,
                }),
                ctx.generateOrdinaryNncParadigm({
                    stem: "poison",
                    state: "possessive",
                    possessionKind: "organic",
                    formulaSlots,
                }),
                ctx.generateOrdinaryNncParadigm({
                    stem: "poison",
                    state: "possessive",
                    possessor: "nu",
                    possessionKind: "organic",
                    formulaSlots,
                    organicPossessionSourceFrame: {
                        ...sourceFrame,
                        sourceSignature: "poison",
                    },
                    organicPossessionOperationFrame: operationFrame,
                }),
            ].map((result) => ({
                supported: result.supported,
                stem: result.stem,
                possessionKind: result.possessionKind,
                sourceStem: result.source?.sourceStem,
                diagnostic: result.diagnostics[0]?.id,
            }));
        })(),
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
            {
                supported: false,
                stem: "naka",
                possessionKind: "organic",
                sourceStem: "naka",
                diagnostic: "ordinary-nnc-organic-possession-contradictory-frame",
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
                    num1: animatePlural.nncBasic.formulaSlots.num1Num2.num1,
                    num2: animatePlural.nncBasic.formulaSlots.num1Num2.num2,
                    connectorDyad: animatePlural.nncBasic.formulaSlots.num1Num2.displayDyad,
                    formulaEcho: ctx.buildOrdinaryNncFormulaEchoFromSlots(animatePlural.nncBasic.formulaSlots),
                    fullFormulaEcho: ctx.buildOrdinaryNncExpandedFormulaEchoFromSlots(animatePlural.nncBasic.formulaSlots),
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
                num1: "m",
                num2: "et",
                connectorDyad: "m-et",
                formulaEcho: "#Ø-Ø(mistun)met#",
                fullFormulaEcho: "#Ø-Ø(mistun)m-et#",
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

    s.eq(
        "ordinary NNC noun-class contract keeps Nawat and Classical profiles distinct",
        {
            nawat: ctx.ORDINARY_NNC_NOUN_CLASS_CONTRACT.profiles.nawat.values,
            classical: ctx.ORDINARY_NNC_NOUN_CLASS_CONTRACT.profiles.classical.values,
            nawatTi: ctx.normalizeOrdinaryNncNounClassForProfile("ti", "nawat"),
            classicalTi: ctx.normalizeOrdinaryNncNounClassForProfile("ti", "classical"),
            bridge: ctx.ORDINARY_NNC_NOUN_CLASS_CONTRACT.profiles.classical.values.map((value) => (
                ctx.projectOrdinaryNncNounClass(value, { from: "classical", to: "nawat" })
            )),
        },
        {
            nawat: ["t", "ti", "in", "zero"],
            classical: ["tl", "tli", "in", "zero"],
            nawatTi: "ti",
            classicalTi: "tl",
            bridge: ["t", "ti", "in", "zero"],
        }
    );
    s.eq(
        "ordinary NNC noun-class inventory audit rejects a poisoned carrier",
        [
            ctx.buildOrdinaryNncNounClassControlInventoryValidationFrame({
                nawatValues: ["t", "ti", "in", "zero"],
                classicalValues: ["tl", "tli", "in", "zero"],
                classicalLedgerValues: ["tl", "tli", "in", "zero"],
            }),
            ctx.buildOrdinaryNncNounClassControlInventoryValidationFrame({
                nawatValues: ["t", "ti", "fabricated", "zero"],
                classicalValues: ["tl", "tli", "in", "zero"],
                classicalLedgerValues: ["tl", "tli", "in", "zero"],
            }),
        ].map((frame) => [frame.authorizationStatus, frame.nawatMatches, frame.classicalMatches, frame.classicalLedgerMatches]),
        [
            ["authorized", true, true, true],
            ["blocked", false, true, true],
        ]
    );
    s.eq(
        "invalid explicit ordinary NNC class cannot inherit zero or fixture authority",
        [
            ctx.generateOrdinaryNncParadigm({ stem: "nemi", nounClass: "fabricated" }),
            ctx.generateOrdinaryNncParadigm({ stem: "mistun", nounClass: "fabricated" }),
        ].map((result) => ({
            supported: result.supported,
            result: result.result,
            nounClass: result.nounClass,
            diagnosticIds: result.diagnostics.map((entry) => entry.id),
        })),
        [
            { supported: false, result: "", nounClass: "fabricated", diagnosticIds: ["ordinary-nnc-noun-class-not-recognized"] },
            { supported: false, result: "", nounClass: "fabricated", diagnosticIds: ["ordinary-nnc-noun-class-not-recognized"] },
        ]
    );
    s.eq(
        "manually written ordinary NNC formula cannot manufacture zero-class authority",
        (() => {
            const result = ctx.generateOrdinaryNncParadigm({ stem: "(nemi)" });
            return {
                supported: result.supported,
                result: result.result,
                diagnosticIds: result.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            supported: false,
            result: "",
            diagnosticIds: ["ordinary-nnc-legacy-formula-string-blocked"],
        }
    );

    return s;
}

module.exports = { run };
