"use strict";

/**
 * Tests for src/core/vnc/vnc.js
 * Covers: getPers1Obj1Pers2Key, startsWithAny, getTotalVowelCount,
 *         isWalThirdPersonMarker, splitSearchInput.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("vnc");

    // getPers1Obj1Pers2Key — joins pers1, obj1, pers2 with pipe
    s.eq("pers1/obj1/pers2 key: ni|ki|", ctx.getPers1Obj1Pers2Key("ni", "ki", ""), "ni|ki|");
    s.eq("pers1/obj1/pers2 key: 3sg pers1", ctx.getPers1Obj1Pers2Key("", "ki", ""), "|ki|");
    s.eq("pers1/obj1/pers2 key: ti|ki|t", ctx.getPers1Obj1Pers2Key("ti", "ki", "t"), "ti|ki|t");
    s.eq("pers1/obj1/pers2 key: all empty", ctx.getPers1Obj1Pers2Key("", "", ""), "||");

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

    s.eq(
        "nuclear clause surface API keeps generateWord as a compatibility alias",
        [
            typeof ctx.generateNuclearClauseSurface,
            typeof ctx.generateWord,
            typeof ctx.executeNuclearClauseSurfaceRequest,
            typeof ctx.executeGenerateWordRequest,
            typeof ctx.getNuclearClauseSurfaceEngineInvariants,
        ],
        ["function", "function", "function", "function", "function"]
    );
    s.eq(
        "compatibility API delegates toward canonical nuclear-clause surface names",
        {
            generateWordCallsCanonical: /\bgenerateNuclearClauseSurface\(/.test(String(ctx.generateWord)),
            executeGenerateWordRequestCallsCanonical: /\bexecuteNuclearClauseSurfaceRequest\(/.test(String(ctx.executeGenerateWordRequest)),
            canonicalSurfaceCallsOldName: /\bgenerateWord\(/.test(String(ctx.generateNuclearClauseSurface)),
            canonicalExecutorCallsOldName: /\bexecuteGenerateWordRequest\(/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
        },
        {
            generateWordCallsCanonical: true,
            executeGenerateWordRequestCallsCanonical: true,
            canonicalSurfaceCallsOldName: false,
            canonicalExecutorCallsOldName: false,
        }
    );
    const lesson5Pursuit = ctx.buildVncLesson5PursuitFrame();
    s.eq(
        "Lesson 5 pursuit frame audits all intransitive CNV subsections",
        {
            stepNumber: lesson5Pursuit.stepNumber,
            aimStatus: lesson5Pursuit.aimStatus,
            plannedArrowIds: lesson5Pursuit.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson5Pursuit.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            pdfRefs: lesson5Pursuit.pdfRefs,
            subsectionRefs: lesson5Pursuit.subsectionInventory.map((entry) => entry.pdfRef),
            categories: lesson5Pursuit.subsectionInventory.map((entry) => entry.category),
            closestPass: lesson5Pursuit.closestPass,
            remainingGaps: lesson5Pursuit.remainingGaps,
        },
        {
            stepNumber: 5,
            aimStatus: "closest-pass",
            plannedArrowIds: [
                "lesson-5-intransitive-vnc-audit",
                "lesson-5-optative-formula-authority-audit",
                "lesson-5-tense-morph-formula-authority-audit",
            ],
            firedArrowIds: [
                ["lesson-5-intransitive-vnc-audit", "hit"],
                ["lesson-5-optative-formula-authority-audit", "hit"],
                ["lesson-5-tense-morph-formula-authority-audit", "hit"],
            ],
            pdfRefs: [
                "Andrews Lesson 5.1",
                "Andrews Lesson 5.2",
                "Andrews Lesson 5.3",
                "Andrews Lesson 5.4",
                "Andrews Lesson 5.5",
            ],
            subsectionRefs: [
                "Andrews Lesson 5.1",
                "Andrews Lesson 5.2",
                "Andrews Lesson 5.3",
                "Andrews Lesson 5.4",
                "Andrews Lesson 5.5",
            ],
            categories: [
                "intransitive-vnc-formula",
                "subject-positions",
                "subject-morphic-fillers",
                "subject-pronoun-paradigms",
                "predicate-tense-morphs",
            ],
            closestPass: true,
            remainingGaps: [],
        }
    );
    s.eq(
        "Lesson 5 frame keeps Andrews formula while exposing Spanish/Nawat UI formula",
        {
            pdfFormula: lesson5Pursuit.formulaFrame.pdfFormula,
            visibleFormula: lesson5Pursuit.formulaFrame.visibleFormula,
            valencePosition: lesson5Pursuit.formulaFrame.valencePosition,
            slotOrder: lesson5Pursuit.formulaFrame.slotOrder,
            featureDistribution: lesson5Pursuit.subjectSlotFrame.featureDistribution,
            pluralBridge: lesson5Pursuit.subjectFillerParadigms[0].nawatPluralBridge,
            mainNawatTenses: lesson5Pursuit.subjectFillerParadigms[0].currentNawatTenses,
            tenseInventory: lesson5Pursuit.tenseMorphFrame.currentNawatTenseInventory,
            tenseSlot: lesson5Pursuit.tenseMorphFrame.visibleSlot,
            tenseIsNotTime: lesson5Pursuit.tenseMorphFrame.tenseIsNotTime,
        },
        {
            pdfFormula: "#pers1-pers2(STEM)tns+num1-num2#",
            visibleFormula: "#pers1-pers2(base)tiempo+núm1-núm2#",
            valencePosition: "implicit-vacant-core",
            slotOrder: ["pers1", "pers2", "base", "tiempo", "num1", "num2"],
            featureDistribution: {
                person: ["pers1"],
                case: ["pers2"],
                number: ["num1", "num2"],
                animacyHumanness: "no-separate-subposition",
            },
            pluralBridge: { classicalCarrier: "h", adaptedCarrier: "t" },
            mainNawatTenses: ["presente", "presente-habitual", "imperfecto", "pasado-remoto"],
            tenseInventory: [
                "presente",
                "presente-habitual",
                "presente-desiderativo",
                "imperfecto",
                "futuro",
                "preterito",
                "pasado-remoto",
                "condicional",
                "optativo",
                "perfecto",
                "pluscuamperfecto",
                "condicional-perfecto",
            ],
            tenseSlot: "tiempo",
            tenseIsNotTime: true,
        }
    );
    const lesson5ProbeText = [
        ...lesson5Pursuit.plannedArrows.map((arrow) => arrow.aim),
        ...lesson5Pursuit.firedArrows.map((arrow) => arrow.correction),
    ].join(" ");
    s.ok(
        "Lesson 5 pursuit frame carries correctness-before-existence miss probe",
        /Correcci[oó]n antes de existencia/.test(lesson5ProbeText)
            && /ruta de entrada a salida/.test(lesson5ProbeText)
            && /comportamiento/.test(lesson5ProbeText)
            && /sonda de fallo/.test(lesson5ProbeText)
            && /shi/.test(lesson5ProbeText)
            && /ti\/an|ti o an/.test(lesson5ProbeText)
    );
    const lesson6Pursuit = ctx.buildVncLesson6PursuitFrame();
    s.eq(
        "Lesson 6 pursuit frame audits all transitive CNV subsections",
        {
            stepNumber: lesson6Pursuit.stepNumber,
            aimStatus: lesson6Pursuit.aimStatus,
            plannedArrowIds: lesson6Pursuit.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson6Pursuit.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            pdfRefs: lesson6Pursuit.pdfRefs,
            subsectionRefs: lesson6Pursuit.subsectionInventory.map((entry) => entry.pdfRef),
            shotRefs: lesson6Pursuit.shotReport.map((entry) => entry.andrewsRef),
            shotStatuses: Array.from(new Set(lesson6Pursuit.shotReport.map((entry) => entry.shotStatus))),
            invalidFinalShotStatuses: lesson6Pursuit.shotReport
                .filter((entry) => !["hit-no-edit", "hit-edit"].includes(entry.shotStatus))
                .map((entry) => [entry.andrewsRef, entry.shotStatus]),
            reportCompleteness: lesson6Pursuit.shotReport.every((entry) => (
                entry.requirementEs
                && entry.missProbeEs
                && Array.isArray(entry.changedFiles)
                && Array.isArray(entry.validationRefs)
                && entry.validationRefs.includes("src/tests/vnc.test.js")
            )),
            editedShotRefs: lesson6Pursuit.shotReport
                .filter((entry) => entry.shotStatus === "hit-edit")
                .map((entry) => [entry.andrewsRef, entry.changedFiles.includes("src/core/vnc/vnc.js")]),
            categories: lesson6Pursuit.subsectionInventory.map((entry) => entry.category),
            closestPass: lesson6Pursuit.closestPass,
            remainingGaps: lesson6Pursuit.remainingGaps,
        },
        {
            stepNumber: 6,
            aimStatus: "closest-pass",
            plannedArrowIds: [
                "lesson-6-transitive-vnc-audit",
                "lesson-6-valence-formula-authority-audit",
                "lesson-6-shuntline-ne-direct-generation-audit",
            ],
            firedArrowIds: [
                ["lesson-6-transitive-vnc-audit", "hit"],
                ["lesson-6-valence-formula-authority-audit", "hit"],
                ["lesson-6-shuntline-ne-direct-generation-audit", "hit"],
            ],
            pdfRefs: [
                "Andrews Lesson 6.1",
                "Andrews Lesson 6.2",
                "Andrews Lesson 6.3",
                "Andrews Lesson 6.4",
                "Andrews Lesson 6.5",
                "Andrews Lesson 6.6",
                "Andrews Lesson 6.7",
            ],
            subsectionRefs: [
                "Andrews Lesson 6.1",
                "Andrews Lesson 6.2",
                "Andrews Lesson 6.3",
                "Andrews Lesson 6.4",
                "Andrews Lesson 6.5",
                "Andrews Lesson 6.6",
                "Andrews Lesson 6.7",
            ],
            shotRefs: [
                "Andrews Lesson 6.1",
                "Andrews Lesson 6.2",
                "Andrews Lesson 6.2.1",
                "Andrews Lesson 6.2.2a",
                "Andrews Lesson 6.2.2b",
                "Andrews Lesson 6.3",
                "Andrews Lesson 6.4",
                "Andrews Lesson 6.4.1",
                "Andrews Lesson 6.4.1a",
                "Andrews Lesson 6.4.1b",
                "Andrews Lesson 6.4.2",
                "Andrews Lesson 6.4.2a",
                "Andrews Lesson 6.4.2b",
                "Andrews Lesson 6.5",
                "Andrews Lesson 6.6",
                "Andrews Lesson 6.6.1",
                "Andrews Lesson 6.6.2",
                "Andrews Lesson 6.7",
            ],
            shotStatuses: ["hit-no-edit", "hit-edit"],
            invalidFinalShotStatuses: [],
            reportCompleteness: true,
            editedShotRefs: [
                ["Andrews Lesson 6.4.2a", true],
                ["Andrews Lesson 6.5", true],
            ],
            categories: [
                "transitive-vnc-formulas",
                "monadic-valence-position",
                "dyadic-valence-formula",
                "projective-object-distribution",
                "projective-object-paradigm",
                "mainline-reflexive-distribution",
                "mainline-reflexive-paradigm",
            ],
            closestPass: true,
            remainingGaps: [],
        }
    );
    s.eq(
        "Lesson 6 frame separates monadic dyadic and Nawat object realization",
        {
            monadicFormula: lesson6Pursuit.formulaFrame.formulas.monadicValence.visibleFormula,
            dyadicFormula: lesson6Pursuit.formulaFrame.formulas.dyadicValence.visibleFormula,
            objectiveDistinctions: lesson6Pursuit.objectCategoryFrame.additionalObjectiveDistinctions
                || lesson6Pursuit.formulaFrame.additionalObjectiveDistinctions,
            monadicFillers: lesson6Pursuit.monadicValenceFillers.map((entry) => [
                entry.classicalCarrier,
                entry.currentNawatSlotValue,
                entry.currentNawatSlotStatus || "confirmed",
                entry.specificity,
                entry.humanness || entry.trajectory,
            ]),
            projectivePrefixes: lesson6Pursuit.projectiveObjectParadigm.map((entry) => [
                entry.person,
                entry.classicalDyad,
                entry.currentNawatDyad,
                entry.currentNawatPrefix,
            ]),
            dyadicSpecificPrefixes: lesson6Pursuit.dyadicObjectFrame.currentNawatSpecificPrefixes,
            directDyads: lesson6Pursuit.dyadicObjectFrame.directNawatDyadByPrefix,
            reflexiveSlot: lesson6Pursuit.reflexiveObjectFrame.currentNawatReflexiveSlot,
            directReflexive: lesson6Pursuit.reflexiveObjectFrame.directNawatReflexiveParadigm,
            directReflexiveCondition: lesson6Pursuit.reflexiveObjectFrame.directNawatReflexiveCondition,
            reflexiveBehavior: lesson6Pursuit.reflexiveObjectFrame.engineBehavior,
        },
        {
            monadicFormula: "#pers1-pers2+val(base)tiempo+núm1-núm2#",
            dyadicFormula: "#pers1-pers2+val1-val2(base)tiempo+núm1-núm2#",
            objectiveDistinctions: ["trajectory", "specificity", "prominence"],
            monadicFillers: [
                ["ne", "ne", "direct-nawat-generation", "specific", "reflexive-reciprocative"],
                ["te", "te", "confirmed", "nonspecific", "human"],
                ["tla", "ta", "confirmed", "nonspecific", "nonhuman"],
            ],
            projectivePrefixes: [
                ["1sg", "n-ech", "n-ech", "nech"],
                ["1pl", "t-ech", "t-ech", "tech"],
                ["2sg", "m-itz", "m-etz", "metz"],
                ["2pl", "am-ech", "m-etz-in", "metzin"],
                ["3sg", "c-0/qu-0/qui-0", "ki-0/k-0", "ki/k"],
                ["3pl", "qu-im", "k-in", "kin"],
            ],
            dyadicSpecificPrefixes: ["nech", "tech", "metz", "metzin", "ki", "k", "kin"],
            directDyads: {
                nech: "n-ech",
                tech: "t-ech",
                metz: "m-etz",
                metzin: "m-etz-in",
                ki: "ki-0",
                k: "k-0",
                kin: "k-in",
            },
            reflexiveSlot: "mu",
            directReflexive: "m-u/m-0",
            directReflexiveCondition: "m-u cuando la alomorfía conserva mu; m-0 cuando obj1-mu-before-vowel-m reduce mu a m",
            reflexiveBehavior: "same-person specific objects are redirected to dyadic mainline mu by reflexive slot logic",
        }
    );
    const lesson6ProbeText = [
        ...lesson6Pursuit.plannedArrows.map((arrow) => arrow.aim),
        ...lesson6Pursuit.firedArrows.map((arrow) => arrow.correction),
    ].join(" ");
    s.ok(
        "Lesson 6 pursuit frame carries formula authority miss probes",
        /Correcci[oó]n antes de existencia/.test(lesson6ProbeText)
            && /ruta de entrada a salida/.test(lesson6ProbeText)
            && /sonda de fallo/.test(lesson6ProbeText)
            && /ki como mon[aá]dico/.test(lesson6ProbeText)
            && /ta como di[aá]dico/.test(lesson6ProbeText)
            && /mu-mu/.test(lesson6ProbeText)
            && /ne de l[ií]nea secundaria/.test(lesson6ProbeText)
            && /bloquear ne/.test(lesson6ProbeText)
    );
    const lesson7Pursuit = ctx.buildVncLesson7PursuitFrame();
    s.eq(
        "Lesson 7 pursuit frame audits all verbstem-class subsections",
        {
            stepNumber: lesson7Pursuit.stepNumber,
            aimStatus: lesson7Pursuit.aimStatus,
            plannedArrowIds: lesson7Pursuit.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson7Pursuit.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            pdfRefs: lesson7Pursuit.pdfRefs,
            subsectionRefs: lesson7Pursuit.subsectionInventory.map((entry) => entry.pdfRef),
            categories: lesson7Pursuit.subsectionInventory.map((entry) => entry.category),
            closestPass: lesson7Pursuit.closestPass,
            remainingGaps: lesson7Pursuit.remainingGaps,
        },
        {
            stepNumber: 7,
            aimStatus: "closest-pass",
            plannedArrowIds: ["lesson-7-verbstem-class-audit"],
            firedArrowIds: [["lesson-7-verbstem-class-audit", "hit"]],
            pdfRefs: [
                "Andrews Lesson 7.1",
                "Andrews Lesson 7.2",
                "Andrews Lesson 7.3",
                "Andrews Lesson 7.4",
                "Andrews Lesson 7.5",
                "Andrews Lesson 7.6",
                "Andrews Lesson 7.7",
                "Andrews Lesson 7.8",
                "Andrews Lesson 7.9",
                "Andrews Lesson 7.10",
            ],
            subsectionRefs: [
                "Andrews Lesson 7.1",
                "Andrews Lesson 7.2",
                "Andrews Lesson 7.3",
                "Andrews Lesson 7.4",
                "Andrews Lesson 7.5",
                "Andrews Lesson 7.6",
                "Andrews Lesson 7.7",
                "Andrews Lesson 7.8",
                "Andrews Lesson 7.9",
                "Andrews Lesson 7.10",
            ],
            categories: [
                "verbstem-morphemic-structure",
                "verbcore-citation-form",
                "verbstem-classes",
                "class-b-perfective-changes",
                "variable-class-membership",
                "class-determination-guidelines",
                "core-tense-predicate-formation",
                "vnc-analysis-translation",
                "indefinite-personal-object-relationship",
                "ta-fusion-derivation",
            ],
            closestPass: true,
            remainingGaps: [],
        }
    );
    s.eq(
        "Lesson 7 frame anchors class routing citation and ta fusion",
        {
            stemRole: lesson7Pursuit.verbstemStructureFrame.stemRole,
            citationUnit: lesson7Pursuit.citationFormFrame.citationUnit,
            nonhumanCitation: lesson7Pursuit.citationFormFrame.citationObjectMarkers.projectiveNonhuman,
            classIds: Object.keys(lesson7Pursuit.verbstemClassFrame.classes),
            classBasis: lesson7Pursuit.verbstemClassFrame.classBasis,
            classBTrigger: lesson7Pursuit.classBChangeFrame.trigger,
            variableOptions: lesson7Pursuit.variableClassFrame.classOptions,
            guidelineIds: lesson7Pursuit.classGuidelines.map((entry) => entry.id),
            predicateConstituents: lesson7Pursuit.predicateFormationFrame.predicateConstituents,
            analysisDivision: lesson7Pursuit.analysisFrame.requiredDivision,
            indefiniteHuman: lesson7Pursuit.objectRelationshipFrame.humanIndefinite.currentNawat,
            indefiniteNonhuman: lesson7Pursuit.objectRelationshipFrame.nonhumanIndefinite.currentNawat,
            fusionName: lesson7Pursuit.taFusionFrame.visibleNawatName,
            fusionTarget: lesson7Pursuit.taFusionFrame.targetStructure,
            fusionObjectSlot: lesson7Pursuit.taFusionFrame.objectSlotAfterFusion,
        },
        {
            stemRole: "lexical-meaning-locus",
            citationUnit: "verbcore",
            nonhumanCitation: {
                classical: "tla",
                currentNawat: "ta",
                orthographyBridge: "Classical tla -> Nawat ta",
            },
            classIds: ["A", "B", "C", "D"],
            classBasis: "perfective-stem-shape",
            classBTrigger: "loss-or-silencing-of-final-vowel",
            variableOptions: ["A", "B"],
            guidelineIds: [
                "monosyllabic-long-a",
                "final-vowel-after-cluster",
                "final-ka",
                "final-tla",
                "intransitive-wa-change",
                "final-ya",
                "final-o",
                "class-d-list",
            ],
            predicateConstituents: ["core", "tense"],
            analysisDivision: "subject-plus-predicate",
            indefiniteHuman: "te",
            indefiniteNonhuman: "ta",
            fusionName: "fusión ta",
            fusionTarget: "derived intransitive verbstem",
            fusionObjectSlot: "none",
        }
    );
    s.eq(
        "Lesson 7 CNV formula path uses one aspect resolver for imperfective and perfective slots",
        {
            unifiedResolver: typeof ctx.getCnvFormulaLesson7SurfaceSlots,
            oldPreteritResolver: typeof ctx.getCnvFormulaPreteritFoldedSurfaceSlots,
            oldPerfectiveResolver: typeof ctx.getCnvFormulaClassPerfectiveSurfaceSlots,
            oldSuffixResolver: typeof ctx.getCnvFormulaSuffixSurfaceSlots,
            oldWholeResolver: typeof ctx.getCnvFormulaWholeSurfaceSlots,
            buildRecordCallsUnifiedResolver: /getCnvFormulaLesson7SurfaceSlots/.test(String(ctx.buildCnvFormulaSurfacePathRecord)),
            buildRecordCallsOldResolvers: /getCnvFormula(?:PreteritFolded|ClassPerfective|Suffix|Whole)SurfaceSlots/.test(String(ctx.buildCnvFormulaSurfacePathRecord)),
        },
        {
            unifiedResolver: "function",
            oldPreteritResolver: "undefined",
            oldPerfectiveResolver: "undefined",
            oldSuffixResolver: "undefined",
            oldWholeResolver: "undefined",
            buildRecordCallsUnifiedResolver: true,
            buildRecordCallsOldResolvers: false,
        }
    );
    const muBeforeIAllomorphy = ctx.applyObj1Allomorphy({
        verb: "ilnamiqui",
        analysisVerb: "ilnamiqui",
        obj1: "mu",
    });
    const muBeforeAjsiAllomorphy = ctx.applyObj1Allomorphy({
        verb: "ajsi",
        analysisVerb: "ajsi",
        obj1: "mu",
    });
    const muBeforeAltiaAllomorphy = ctx.applyObj1Allomorphy({
        verb: "altia",
        analysisVerb: "altia",
        obj1: "mu",
    });
    const supportiveIAllomorphy = ctx.applyObj1Allomorphy({
        verb: "ilnamiqui",
        analysisVerb: "ilnamiqui",
        obj1: "ta",
        hasOptionalSupportiveI: true,
        optionalSupportiveLetter: "i",
        hasNonspecificValence: true,
    });
    s.eq(
        "obj1 allomorphy exposes Lesson 2 frame for mu before vowel-contact boundary",
        {
            obj1: muBeforeIAllomorphy.obj1,
            morphologyObj1: muBeforeIAllomorphy.morphologyObj1,
            frames: muBeforeIAllomorphy.soundSpellingFrames.map((frame) => ({
                ruleId: frame.ruleId,
                source: frame.sourceSurface,
                target: frame.target,
                slot: frame.grammarSlot,
                sourceSegment: frame.sourceSegmentValue,
                targetSegment: frame.targetSegmentValue,
            })),
        },
        {
            obj1: "m",
            morphologyObj1: "m",
            frames: [{
                ruleId: "obj1-mu-before-vowel-m",
                source: "mu",
                target: "m",
                slot: "obj1",
                sourceSegment: "mu",
                targetSegment: "m",
            }],
        }
    );
    s.eq(
        "obj1 allomorphy distinguishes mu+ajsi from mu+altia",
        {
            ajsi: {
                obj1: muBeforeAjsiAllomorphy.obj1,
                morphologyObj1: muBeforeAjsiAllomorphy.morphologyObj1,
                frameCount: muBeforeAjsiAllomorphy.soundSpellingFrames.length,
            },
            altia: {
                obj1: muBeforeAltiaAllomorphy.obj1,
                morphologyObj1: muBeforeAltiaAllomorphy.morphologyObj1,
                frames: muBeforeAltiaAllomorphy.soundSpellingFrames.map((frame) => ({
                    ruleId: frame.ruleId,
                    source: frame.sourceSurface,
                    target: frame.target,
                    slot: frame.grammarSlot,
                    position: frame.syllablePosition,
                    sourceSegment: frame.sourceSegmentValue,
                    targetSegment: frame.targetSegmentValue,
                })),
            },
        },
        {
            ajsi: {
                obj1: "mu",
                morphologyObj1: "mu",
                frameCount: 0,
            },
            altia: {
                obj1: "m",
                morphologyObj1: "m",
                frames: [{
                    ruleId: "obj1-mu-before-vowel-m",
                    source: "mu",
                    target: "m",
                    slot: "obj1",
                    position: "before-al-stem",
                    sourceSegment: "mu",
                    targetSegment: "m",
                }],
            },
        }
    );
    s.eq(
        "obj1 allomorphy exposes Lesson 2 frame for supportive i deletion",
        {
            verb: supportiveIAllomorphy.verb,
            analysisVerb: supportiveIAllomorphy.analysisVerb,
            frames: supportiveIAllomorphy.soundSpellingFrames.map((frame) => ({
                ruleId: frame.ruleId,
                source: frame.sourceSurface,
                target: frame.target,
                slot: frame.grammarSlot,
                sourceSegment: frame.sourceSegmentValue,
                targetSegment: frame.targetSegmentValue,
            })),
        },
        {
            verb: "lnamiqui",
            analysisVerb: "lnamiqui",
            frames: [{
                ruleId: "supportive-i-stem-initial-elision",
                source: "i",
                target: "",
                slot: "stem-initial",
                sourceSegment: "ilnamiqui",
                targetSegment: "lnamiqui",
            }],
        }
    );
    s.eq(
        "nuclear-clause executor names internal surface builders as surfaces, not words",
        {
            hasSurfaceBuilder: /buildActiveNuclearClauseSurfaceText/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasCurrentSlotBuilder: /buildSurfaceFromCurrentSlots/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasSlotPartsBuilder: /buildSurfaceFromSlotParts/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasTroncoSlotInput: /troncoSlot/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldVerbValueParam: /\bverbValue\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldMutableSubjectPrefix: /\blet\s+subjectPrefix\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldMutableObjectPrefix: /\blet\s+objectPrefix\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldMutableVerb: /\blet\s+verb\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldRenderVerbBinding: /\bconst\s+renderVerb\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
            hasOldBuildWordName: /buildWord(?:FromParts)?\b/.test(String(ctx.executeNuclearClauseSurfaceRequest)),
        },
        {
            hasSurfaceBuilder: true,
            hasCurrentSlotBuilder: true,
            hasSlotPartsBuilder: true,
            hasTroncoSlotInput: true,
            hasOldVerbValueParam: false,
            hasOldMutableSubjectPrefix: false,
            hasOldMutableObjectPrefix: false,
            hasOldMutableVerb: false,
            hasOldRenderVerbBinding: false,
            hasOldBuildWordName: false,
        }
    );
    s.eq(
        "nuclear-clause validation blocks before parsed/rendered stem is required",
        (() => {
            const result = ctx.executeNuclearClauseSurfaceRequest({
                options: {
                    silent: true,
                    skipValidation: false,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                    },
                },
                posicionesFormula: {
                    pers1: "ni",
                    obj1: "",
                    tronco: "(nem!)",
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
            return {
                blocked: Boolean(result?.error),
                diagnosticId: result?.diagnostics?.[0]?.id || "",
                routeStage: result?.frames?.routeContract?.routeStage || "",
                sourceInput: result?.frames?.resultFrame?.sourceInput || "",
                stemFrameStem: result?.frames?.stemFrame?.stem || "",
                surface: result?.surface || "",
                surfaceOutputIsGrammarSource: result?.frames?.resultFrame?.surfaceOutputIsGrammarSource,
            };
        })(),
        {
            blocked: true,
            diagnosticId: "nuclear-clause-surface-validation-error",
            routeStage: "validate",
            sourceInput: "(nem!)",
            stemFrameStem: "(nem!)",
            surface: "",
            surfaceOutputIsGrammarSource: false,
        }
    );
    s.eq(
        "compatibility facade can sync input without requiring the visual mirror hook",
        (() => {
            const originalRenderVerbMirror = ctx.renderVerbMirror;
            const originalRenderAllOutputs = ctx.renderAllOutputs;
            const originalRememberScreenCalculatorAnsState = ctx.rememberScreenCalculatorAnsState;
            const originalUpdateVerbRuleHint = ctx.updateVerbRuleHint;
            const originalUpdateVerbDisambiguation = ctx.updateVerbDisambiguation;
            const originalMaybeAutoScrollToConjugationRow = ctx.maybeAutoScrollToConjugationRow;
            try {
                ctx.renderVerbMirror = undefined;
                ctx.renderAllOutputs = () => {};
                ctx.rememberScreenCalculatorAnsState = () => {};
                ctx.updateVerbRuleHint = () => {};
                ctx.updateVerbDisambiguation = () => {};
                ctx.maybeAutoScrollToConjugationRow = () => {};
                const control = ctx.document?.getElementById
                    ? ctx.document.getElementById("verb")
                    : null;
                if (control) {
                    control.value = "";
                    control.dataset = control.dataset || {};
                }
                const result = ctx.generateNuclearClauseSurface({
                    silent: false,
                    posicionesFormula: {
                        pers1: "ni",
                        obj1: "",
                        tronco: "(nemi)",
                        pers2: "",
                        num2: "",
                        poseedor: "",
                        tiempo: "presente",
                    },
                });
                return {
                    surface: result?.surface || result?.result || "",
                    inputSynced: Boolean(control?.value),
                    hasMirrorHook: typeof ctx.renderVerbMirror,
                };
            } finally {
                if (typeof originalRenderVerbMirror === "function") {
                    ctx.renderVerbMirror = originalRenderVerbMirror;
                } else {
                    delete ctx.renderVerbMirror;
                }
                ctx.renderAllOutputs = originalRenderAllOutputs;
                ctx.rememberScreenCalculatorAnsState = originalRememberScreenCalculatorAnsState;
                ctx.updateVerbRuleHint = originalUpdateVerbRuleHint;
                ctx.updateVerbDisambiguation = originalUpdateVerbDisambiguation;
                ctx.maybeAutoScrollToConjugationRow = originalMaybeAutoScrollToConjugationRow;
            }
        })(),
        {
            surface: "ninemi",
            inputSynced: true,
            hasMirrorHook: "undefined",
        }
    );

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
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "",
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
        "executeGenerateWordRequest: validation error exposes the blocked LCM contract",
        {
            error: validationError.error,
            ok: validationError.ok,
            surface: validationError.surface,
            framesIsGrammarFrame: validationError.frames === validationError.grammarFrame,
            routeStage: validationError.frames.routeContract.routeStage,
            routeFamily: validationError.frames.routeContract.routeFamily,
            generationAllowed: validationError.frames.routeContract.generationAllowed,
            canonicalExecuteFunction: validationError.surfaceEngineContract?.canonicalExecuteFunction,
            compatibilityExecuteFunction: validationError.surfaceEngineContract?.compatibilityExecuteFunction,
            surfaceIsSource: validationError.surfaceEngineContract?.surfaceOutputIsGrammarSource,
            diagnosticId: validationError.diagnostics[0].id,
            diagnosticMessage: validationError.diagnostics[0].message,
            enumerableContract: Object.prototype.propertyIsEnumerable.call(validationError, "grammarFrame"),
        },
        {
            error: "El verbo no puede estar vacío. Ingrese verbo.",
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            routeStage: "validate",
            routeFamily: "nuclear-clause-surface",
            generationAllowed: false,
            canonicalExecuteFunction: "executeNuclearClauseSurfaceRequest",
            compatibilityExecuteFunction: "executeGenerateWordRequest",
            surfaceIsSource: false,
            diagnosticId: "nuclear-clause-surface-validation-error",
            diagnosticMessage: "El verbo no puede estar vacío. Ingrese verbo.",
            enumerableContract: false,
        }
    );

    const nonactiveOverride = ctx.applyNonactiveGenerateOverrides({
        nonactiveDerivation: {
            nonactiveObjectPrefixOverride: "mu",
            nonactiveIndirectMarkerOverride: "te",
        },
        obj1: "ki",
        morphologyObj1: "ki",
        obj1Base: "ki",
        obj2: "ta",
        obj3: "te",
        isReflexive: false,
    });
    s.eq("nonactive override: obj1 forced to mu", nonactiveOverride.obj1, "mu");
    s.eq("nonactive override: obj2 overridden", nonactiveOverride.obj2, "te");
    s.eq("nonactive override: obj3 cleared", nonactiveOverride.obj3, "");
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

    const normalizedOptions = ctx.normalizeNuclearClauseSurfaceOptions({
        skipValidation: true,
    });
    s.ok("normalizeNuclearClauseSurfaceOptions keeps canonical skip flag", normalizedOptions.skipValidation === true);

    const sanitizedOptions = ctx.sanitizeNuclearClauseSurfaceOptions({
        skipValidation: true,
    });
    s.ok("sanitizeNuclearClauseSurfaceOptions keeps canonical skipValidation", sanitizedOptions.skipValidation === true);
    s.eq(
        "compatibility request helper aliases delegate to nuclear-clause surface helpers",
        {
            normalizeAlias: /normalizeNuclearClauseSurfaceOptions/.test(String(ctx.normalizeGenerateWordOptions)),
            sanitizeAlias: /sanitizeNuclearClauseSurfaceOptions/.test(String(ctx.sanitizeGenerateWordOptions)),
            formulaAlias: /getNuclearClauseSurfacePosicionesFormula/.test(String(ctx.getGenerateWordPosicionesFormula)),
            internalInputAlias: /buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula/.test(String(ctx.buildGenerateWordEntradasInternasFromPosicionesFormula)),
            canonicalHelpers: [
                typeof ctx.normalizeNuclearClauseSurfaceOptions,
                typeof ctx.sanitizeNuclearClauseSurfaceOptions,
                typeof ctx.getNuclearClauseSurfacePosicionesFormula,
                typeof ctx.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula,
            ],
        },
        {
            normalizeAlias: true,
            sanitizeAlias: true,
            formulaAlias: true,
            internalInputAlias: true,
            canonicalHelpers: ["function", "function", "function", "function"],
        }
    );

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

    s.eq(
        "getNuclearClauseSurfacePosicionesFormula emits Andrews/Spanish runtime keys",
        ctx.getNuclearClauseSurfacePosicionesFormula({
            override: {
                obj1: "mu",
                tiempo: "presente",
                obj2: "tech",
                obj3: "kin",
                poseedor: "nu",
            },
            pers1Control: { value: "ni" },
            pers2Control: { value: "t" },
            troncoControl: { value: "(ilpia)" },
            troncoInputSource: { parseValue: "ilpia" },
        }),
        {
            pers1: "ni",
            obj1: "mu",
            tronco: "ilpia",
            pers2: "t",
            num2: "t",
            poseedor: "nu",
            obj2: "tech",
            obj3: "kin",
            reflexivo: "mu",
            tiempo: "presente",
        }
    );
    s.eq(
        "internal generation input can be rebuilt from Andrews/Spanish posicionesFormula",
        ctx.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula({
            pers1: "ti",
            obj1: "ki",
            tronco: "(maka)",
            pers2: "t",
            poseedor: "tu",
        }),
        {
            pers1: "ti",
            obj1: "ki",
            tronco: "(maka)",
            pers2: "t",
            num2: "t",
            poseedor: "tu",
            obj2: "",
            obj3: "",
            reflexivo: "",
            tiempo: "",
        }
    );
    s.eq(
        "surface-producing path uses Andrews CNV formula slots directly",
        (() => {
            const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                pers1: "ti",
                obj1: "ki",
                tronco: "(maka)",
                pers2: "t",
                num2: "t",
                poseedor: "tu",
                obj2: "tech",
                obj3: "kin",
                reflexivo: "",
                tiempo: "presente",
            });
            const bySurfaceSlot = Object.fromEntries(
                bridge.slots.map((slot) => [slot.surfaceSlot, slot])
            );
            return {
                surfaceProducingSlotCount: bridge.surfaceProducingSlotCount,
                cnvFormulaSlotCount: bridge.cnvFormulaSlotCount,
                surfaceProducingSlots: bridge.surfaceProducingSlots,
                cnvFormulaSlots: bridge.cnvFormulaSlots,
                pers2: {
                    formulaSlot: bySurfaceSlot.pers2.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.pers2.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.pers2.surfaceSegmentRole,
                },
                va1: {
                    formulaSlot: bySurfaceSlot.va1.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.va1.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.va1.surfaceSegmentRole,
                },
                va2: {
                    formulaSlot: bySurfaceSlot.va2.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.va2.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.va2.surfaceSegmentRole,
                },
                base: {
                    formulaSlot: bySurfaceSlot.base.cnvFormulaSlot,
                    formulaName: bySurfaceSlot.base.cnvFormulaName,
                    surfaceRole: bySurfaceSlot.base.surfaceSegmentRole,
                },
            };
        })(),
        {
            surfaceProducingSlotCount: 8,
            cnvFormulaSlotCount: 8,
            surfaceProducingSlots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
            cnvFormulaSlots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
            pers2: {
                formulaSlot: "pers2",
                formulaName: "pers2",
                surfaceRole: "pers2",
            },
            va1: {
                formulaSlot: "va1",
                formulaName: "va1",
                surfaceRole: "obj1",
            },
            va2: {
                formulaSlot: "va2",
                formulaName: "va2",
                surfaceRole: "obj1",
            },
            base: {
                formulaSlot: "base",
                formulaName: "base",
                surfaceRole: "tronco",
            },
        }
    );
    s.eq(
        "CNV formula path exposes all base surface realizations for piya preterit variants",
        (() => {
            const nuclearClauseShell = {
                formulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
                formulaSlots: {
                    pers1Pers2: { displayPrefix: "Ø", displayCase: "Ø" },
                    obj1: { displayPrefix: "ki-0" },
                    reflexivo: { displayPrefix: "Ø" },
                    predicateStem: { displayStem: "piya" },
                    tensePosition: { displayMorph: "Ø" },
                    num1Num2: { displayConnector: "ki-0" },
                },
            };
            const surfaceRecords = [
                {
                    surface: "kipishki",
                    segments: [
                        { role: "obj1", slot: "obj1", value: "ki" },
                        { role: "tronco", slot: "tronco", value: "pish" },
                        { role: "pers2", slot: "pers2", value: "ki" },
                    ],
                },
                {
                    surface: "kipiyak",
                    segments: [
                        { role: "obj1", slot: "obj1", value: "ki" },
                        { role: "tronco", slot: "tronco", value: "piya" },
                        { role: "pers2", slot: "pers2", value: "k" },
                    ],
                },
            ];
            const path = ctx.buildGeneratedCnvFormulaSurfacePath({
                nuclearClauseShell,
                surfaceRecord: surfaceRecords[0],
                surfaceRecords,
            });
            const basePath = Object.fromEntries(
                (path.paths || []).map((entry) => [entry.formulaSlotKey, entry])
            ).base || {};
            return {
                formulaEcho: path.formulaEcho,
                primarySurface: path.surface,
                formulaBase: basePath.formulaMorph,
                primaryBaseSurface: basePath.surfaceValue,
                baseSurfaceRealizations: basePath.surfaceRealizations,
                topLevelBaseSurfaceRealizations: path.surfaceStemRealizations,
                pathsBySurface: (path.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        formulaBase: bySlot.base?.formulaMorph || "",
                        surfaceBase: bySlot.base?.surfaceValue || "",
                        baseStatus: bySlot.base?.status || "",
                        num1Surface: bySlot.num1?.surfaceValue || "",
                    };
                }),
            };
        })(),
        {
            formulaEcho: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
            primarySurface: "kipishki",
            formulaBase: "piya",
            primaryBaseSurface: "pish",
            baseSurfaceRealizations: ["pish", "piya"],
            topLevelBaseSurfaceRealizations: ["pish", "piya"],
            pathsBySurface: [
                {
                    surface: "kipishki",
                    formulaBase: "piya",
                    surfaceBase: "pish",
                    baseStatus: "surface-rule-required",
                    num1Surface: "ki",
                },
                {
                    surface: "kipiyak",
                    formulaBase: "piya",
                    surfaceBase: "piya",
                    baseStatus: "matched",
                    num1Surface: "k",
                },
            ],
        }
    );
    s.eq(
        "CNV formula path splits piya preterit stem variants from number connector",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "",
                            tronco: "piya",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "piya",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        num1: bySlot.num1?.surfaceValue || "",
                        num2: bySlot.num2?.surfaceValue || "",
                    };
                }),
            };
        })(),
        {
            surfaceForms: ["pishki", "piyak"],
            formula: "#Ø-Ø(piya)Ø+ki-0#",
            baseRealizations: ["pish", "piya"],
            connectorRealizations: ["ki-0", "k-0"],
            pathsBySurface: [
                { surface: "pishki", base: "pish", num1: "ki", num2: "0" },
                { surface: "piyak", base: "piya", num1: "k", num2: "0" },
            ],
        }
    );
    s.eq(
        "Lesson 5.1 intransitive preterit keeps pers1 allomorph outside i-initial stem in formula and path",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "",
                            tronco: "ina",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "",
                    tronco: "ina",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => {
                const bySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    result: result.result,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    path: {
                        pers1: bySlot.pers1?.surfaceValue || "",
                        base: bySlot.base?.surfaceValue || "",
                        tns: bySlot.tns?.surfaceValue || bySlot.tns?.formulaMorph || "",
                        num1: bySlot.num1?.surfaceValue || bySlot.num1?.formulaMorph || "",
                        num2: bySlot.num2?.surfaceValue || bySlot.num2?.formulaMorph || "",
                    },
                    surfaceProducingPath: {
                        pers1: bridgeBySlot.pers1?.value || "",
                        base: bridgeBySlot.base?.value || "",
                        tns: bridgeBySlot.tns?.value || "",
                        num1: bridgeBySlot.num1?.value || "",
                        num2: bridgeBySlot.num2?.value || "",
                    },
                };
            };
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
            ];
        })(),
        [
            {
                result: "ninak",
                formula: "#n-Ø(ina)Ø+k-0#",
                path: { pers1: "n", base: "ina", tns: "Ø", num1: "k", num2: "0" },
                surfaceProducingPath: { pers1: "n", base: "ina", tns: "Ø", num1: "k", num2: "0" },
            },
            {
                result: "tinak",
                formula: "#t-Ø(ina)Ø+k-0#",
                path: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "0" },
                surfaceProducingPath: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "0" },
            },
            {
                result: "tinaket",
                formula: "#t-Ø(ina)Ø+k-et#",
                path: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "et" },
                surfaceProducingPath: { pers1: "t", base: "ina", tns: "Ø", num1: "k", num2: "et" },
            },
            {
                result: "anhinaket",
                formula: "#anh-Ø(ina)Ø+k-et#",
                path: { pers1: "anh", base: "ina", tns: "Ø", num1: "k", num2: "et" },
                surfaceProducingPath: { pers1: "anh", base: "ina", tns: "Ø", num1: "k", num2: "et" },
            },
        ]
    );
    s.eq(
        "CNV formula path keeps transitive object outside piya preterit stem variants",
        (() => {
            const buildProbe = (pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco: "piya",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco: "piya",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                object: result.nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    const va1Surface = bySlot.va1?.surfaceValue || "";
                    const va2Surface = bySlot.va2?.surfaceValue || "";
                    return {
                        surface: record.surface,
                        object: va2Surface ? `${va1Surface}-${va2Surface}` : va1Surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                    };
                }),
            });
            return [summarize(buildProbe("")), summarize(buildProbe("t"))];
        })(),
        [
            {
                surfaceForms: ["kipishki", "kipiyak"],
                formula: "#Ø-Ø+ki-0(piya)Ø+ki-0#",
                object: "ki-0",
                baseRealizations: ["pish", "piya"],
                connectorRealizations: ["ki-0", "k-0"],
                pathsBySurface: [
                    { surface: "kipishki", object: "ki-0", base: "pish", connector: "ki-0" },
                    { surface: "kipiyak", object: "ki-0", base: "piya", connector: "k-0" },
                ],
            },
            {
                surfaceForms: ["kipishket", "kipiyaket"],
                formula: "#Ø-Ø+ki-0(piya)Ø+k-et#",
                object: "ki-0",
                baseRealizations: ["pish", "piya"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "kipishket", object: "ki-0", base: "pish", connector: "k-et" },
                    { surface: "kipiyaket", object: "ki-0", base: "piya", connector: "k-et" },
                ],
            },
        ]
    );
    s.eq(
        "CNV formula path assigns piki short preterit final k to stem and zero connector",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco: "piki",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco: "piki",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                surfaceForms: result.surfaceForms,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        formula: `#0-0+ki-0(${bySlot.base?.surfaceValue || ""})0+${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}#`,
                    };
                }),
            };
        })(),
        {
            surfaceForms: ["kipik", "kipikik"],
            pathsBySurface: [
                { surface: "kipik", formula: "#0-0+ki-0(pik)0+0-0#" },
                { surface: "kipikik", formula: "#0-0+ki-0(piki)0+k-0#" },
            ],
        }
    );
    s.eq(
        "CNV formula path expands tzuma optional preterit surfaces into separate stem and connector records",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "ni",
                            obj1: "ki",
                            tronco: "tzuma",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "ni",
                    obj1: "ki",
                    tronco: "tzuma",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                result: result.result,
                surfaceForms: result.surfaceForms,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                        hasParentheticalLeak: /\([^)]*\)/.test(record.surface)
                            || /\([^)]*\)/.test(bySlot.base?.surfaceValue || ""),
                    };
                }),
            };
        })(),
        {
            result: "niktzun / niktzunki",
            surfaceForms: ["niktzun", "niktzunki"],
            baseRealizations: ["tzun"],
            connectorRealizations: ["0-0", "ki-0"],
            pathsBySurface: [
                { surface: "niktzun", base: "tzun", connector: "0-0", hasParentheticalLeak: false },
                { surface: "niktzunki", base: "tzun", connector: "ki-0", hasParentheticalLeak: false },
            ],
        }
    );
    s.eq(
        "CNV formula path audits transitive preterit stems across different pre-final consonants",
        (() => {
            const verbs = ["piki", "tzuma", "tala", "tana", "tasa", "tacha", "paya", "mati", "taka"];
            const buildProbe = (tronco) => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco,
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco,
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return verbs.map((tronco) => {
                const result = buildProbe(tronco);
                return {
                    tronco,
                    result: result.result,
                    paths: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                        const bySlot = Object.fromEntries(
                            (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                        );
                        return `${record.surface}:${bySlot.base?.surfaceValue || ""}+${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`;
                    }),
                };
            });
        })(),
        [
            {
                tronco: "piki",
                result: "kipik / kipikik",
                paths: ["kipik:pik+0-0", "kipikik:piki+k-0"],
            },
            {
                tronco: "tzuma",
                result: "kitzun / kitzunki",
                paths: ["kitzun:tzun+0-0", "kitzunki:tzun+ki-0"],
            },
            {
                tronco: "tala",
                result: "kital",
                paths: ["kital:tal+0-0"],
            },
            {
                tronco: "tana",
                result: "kitanki",
                paths: ["kitanki:tan+ki-0"],
            },
            {
                tronco: "tasa",
                result: "kitaski",
                paths: ["kitaski:tas+ki-0"],
            },
            {
                tronco: "tacha",
                result: "kitachki / kitachak",
                paths: ["kitachki:tach+ki-0", "kitachak:tacha+k-0"],
            },
            {
                tronco: "paya",
                result: "kipashki / kipayak",
                paths: ["kipashki:pash+ki-0", "kipayak:paya+k-0"],
            },
            {
                tronco: "mati",
                result: "kimatki / kimatik",
                paths: ["kimatki:mat+ki-0", "kimatik:mati+k-0"],
            },
            {
                tronco: "taka",
                result: "kitak / kitakak",
                paths: ["kitak:tak+0-0", "kitakak:taka+k-0"],
            },
        ]
    );
    s.eq(
        "CNV formula path keeps maka preterit stem variant as stem, not connector-stripped ma",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "maka",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "maka",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                        shallowWrongBase: bySlot.base?.surfaceValue === "ma",
                    };
                }),
            });
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
                summarize(buildProbe("", "t")),
            ];
        })(),
        [
            {
                surfaceForms: ["nikmak", "nikmakak"],
                formula: "#ni-Ø+k-0(maka)Ø+k-0#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "nikmak", base: "mak", connector: "0-0", shallowWrongBase: false },
                    { surface: "nikmakak", base: "maka", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tikmak", "tikmakak"],
                formula: "#ti-Ø+k-0(maka)Ø+k-0#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "tikmak", base: "mak", connector: "0-0", shallowWrongBase: false },
                    { surface: "tikmakak", base: "maka", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kimak", "kimakak"],
                formula: "#Ø-Ø+ki-0(maka)Ø+k-0#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "kimak", base: "mak", connector: "0-0", shallowWrongBase: false },
                    { surface: "kimakak", base: "maka", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tikmakket", "tikmakaket"],
                formula: "#ti-Ø+k-0(maka)Ø+k-et#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "tikmakket", base: "mak", connector: "k-et", shallowWrongBase: false },
                    { surface: "tikmakaket", base: "maka", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["ankimakket", "ankimakaket"],
                formula: "#an-Ø+ki-0(maka)Ø+k-et#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "ankimakket", base: "mak", connector: "k-et", shallowWrongBase: false },
                    { surface: "ankimakaket", base: "maka", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kimakket", "kimakaket"],
                formula: "#Ø-Ø+ki-0(maka)Ø+k-et#",
                baseRealizations: ["mak", "maka"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "kimakket", base: "mak", connector: "k-et", shallowWrongBase: false },
                    { surface: "kimakaket", base: "maka", connector: "k-et", shallowWrongBase: false },
                ],
            },
        ]
    );
    s.eq(
        "CNV formula path keeps neki preterit stem variant as stem, not connector-stripped ne",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "neki",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "neki",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                connectorRealizations: result.cnvFormulaSurfacePath?.surfaceNumberConnectorRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                        shallowWrongBase: bySlot.base?.surfaceValue === "ne",
                    };
                }),
            });
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
                summarize(buildProbe("", "t")),
            ];
        })(),
        [
            {
                surfaceForms: ["niknek", "niknekik"],
                formula: "#ni-Ø+k-0(neki)Ø+k-0#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "niknek", base: "nek", connector: "0-0", shallowWrongBase: false },
                    { surface: "niknekik", base: "neki", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tiknek", "tiknekik"],
                formula: "#ti-Ø+k-0(neki)Ø+k-0#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "tiknek", base: "nek", connector: "0-0", shallowWrongBase: false },
                    { surface: "tiknekik", base: "neki", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kinek", "kinekik"],
                formula: "#Ø-Ø+ki-0(neki)Ø+k-0#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["0-0", "k-0"],
                pathsBySurface: [
                    { surface: "kinek", base: "nek", connector: "0-0", shallowWrongBase: false },
                    { surface: "kinekik", base: "neki", connector: "k-0", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["tiknekket", "tiknekiket"],
                formula: "#ti-Ø+k-0(neki)Ø+k-et#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "tiknekket", base: "nek", connector: "k-et", shallowWrongBase: false },
                    { surface: "tiknekiket", base: "neki", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["ankinekket", "ankinekiket"],
                formula: "#an-Ø+ki-0(neki)Ø+k-et#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "ankinekket", base: "nek", connector: "k-et", shallowWrongBase: false },
                    { surface: "ankinekiket", base: "neki", connector: "k-et", shallowWrongBase: false },
                ],
            },
            {
                surfaceForms: ["kinekket", "kinekiket"],
                formula: "#Ø-Ø+ki-0(neki)Ø+k-et#",
                baseRealizations: ["nek", "neki"],
                connectorRealizations: ["k-et"],
                pathsBySurface: [
                    { surface: "kinekket", base: "nek", connector: "k-et", shallowWrongBase: false },
                    { surface: "kinekiket", base: "neki", connector: "k-et", shallowWrongBase: false },
                ],
            },
        ]
    );
    s.eq(
        "CNV formula path and surface-producing path agree for ilpia perfective object contact",
        (() => {
            const buildProbe = (tiempo) => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo,
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco: "ilpia",
                            pers2: "",
                            num2: "",
                            tiempo,
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "ki",
                    tronco: "ilpia",
                    pers2: "",
                    num2: "",
                    tiempo,
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (tiempo) => {
                const result = buildProbe(tiempo);
                const pathBySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    tiempo,
                    result: result.result,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    cnvPath: {
                        va1: pathBySlot.va1?.surfaceValue || "",
                        va2: pathBySlot.va2?.formulaMorph || "",
                        base: pathBySlot.base?.surfaceValue || "",
                        tns: pathBySlot.tns?.surfaceValue || pathBySlot.tns?.formulaMorph || "",
                        num1: pathBySlot.num1?.surfaceValue || pathBySlot.num1?.formulaMorph || "",
                        num2: pathBySlot.num2?.surfaceValue || pathBySlot.num2?.formulaMorph || "",
                    },
                    surfaceProducingPath: {
                        va1: bridgeBySlot.va1?.value || "",
                        va2: bridgeBySlot.va2?.value || "",
                        base: bridgeBySlot.base?.value || "",
                        tns: bridgeBySlot.tns?.value || "",
                        num1: bridgeBySlot.num1?.value || "",
                        num2: bridgeBySlot.num2?.value || "",
                    },
                };
            };
            return [
                summarize("preterito"),
                summarize("perfecto"),
                summarize("pasado-remoto"),
            ];
        })(),
        [
            {
                tiempo: "preterito",
                result: "kilpij",
                formula: "#Ø-Ø+k-0(ilpij)Ø+Ø-Ø#",
                cnvPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "Ø", num1: "Ø", num2: "Ø" },
                surfaceProducingPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "Ø", num1: "Ø", num2: "Ø" },
            },
            {
                tiempo: "perfecto",
                result: "kilpijtuk",
                formula: "#Ø-Ø+k-0(ilpij)tuk+Ø-Ø#",
                cnvPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "tuk", num1: "Ø", num2: "Ø" },
                surfaceProducingPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "tuk", num1: "Ø", num2: "Ø" },
            },
            {
                tiempo: "pasado-remoto",
                result: "kilpijka",
                formula: "#Ø-Ø+k-0(ilpij)ka+Ø-Ø#",
                cnvPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "ka", num1: "Ø", num2: "Ø" },
                surfaceProducingPath: { va1: "k-0", va2: "0", base: "ilpij", tns: "ka", num1: "Ø", num2: "Ø" },
            },
        ]
    );
    s.eq(
        "CNV formula path keeps i-final preterit zero/k connector alternates per output",
        (() => {
            const result = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "",
                            tronco: "ijkali",
                            pers2: "",
                            num2: "",
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1: "",
                    tronco: "ijkali",
                    pers2: "",
                    num2: "",
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            return {
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        base: bySlot.base?.surfaceValue || "",
                        connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                    };
                }),
            };
        })(),
        {
            surfaceForms: ["ijkal", "ijkalik"],
            formula: "#Ø-Ø(ijkali)Ø+k-0#",
            pathsBySurface: [
                { surface: "ijkal", base: "ijkal", connector: "0-0" },
                { surface: "ijkalik", base: "ijkali", connector: "k-0" },
            ],
        }
    );
    s.eq(
        "CNV formula path keeps transitive ijkali external slots out of the preterit base",
        (() => {
            const buildProbe = (pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "ijkali",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "ijkali",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => {
                const bySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                return {
                    result: result.result,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    pers1: bySlot.pers1?.surfaceValue || "",
                    obj: bySlot.va1?.surfaceValue || "",
                    base: bySlot.base?.surfaceValue || "",
                    connector: `${bySlot.num1?.surfaceValue || "0"}-${bySlot.num2?.surfaceValue || "0"}`,
                    leakedBase: ["nikijkal", "tikijkal", "ankijkal", "ikijkal", "jkal"]
                        .includes(bySlot.base?.surfaceValue || ""),
                };
            };
            return [
                summarize(buildProbe("ni")),
                summarize(buildProbe("ti")),
                summarize(buildProbe("")),
                summarize(buildProbe("ti", "t")),
                summarize(buildProbe("an", "t")),
                summarize(buildProbe("", "t")),
            ];
        })(),
        [
            {
                result: "nikijkal",
                formula: "#ni-Ø+k-0(ijkali)Ø+Ø-Ø#",
                pers1: "ni",
                obj: "k-0",
                base: "ijkal",
                connector: "0-0",
                leakedBase: false,
            },
            {
                result: "tikijkal",
                formula: "#ti-Ø+k-0(ijkali)Ø+Ø-Ø#",
                pers1: "ti",
                obj: "k-0",
                base: "ijkal",
                connector: "0-0",
                leakedBase: false,
            },
            {
                result: "kijkal",
                formula: "#Ø-Ø+k-0(ijkali)Ø+Ø-Ø#",
                pers1: "",
                obj: "k-0",
                base: "ijkal",
                connector: "0-0",
                leakedBase: false,
            },
            {
                result: "tikijkalket",
                formula: "#ti-Ø+k-0(ijkali)Ø+k-et#",
                pers1: "ti",
                obj: "k-0",
                base: "ijkal",
                connector: "k-et",
                leakedBase: false,
            },
            {
                result: "ankijkalket",
                formula: "#an-Ø+k-0(ijkali)Ø+k-et#",
                pers1: "an",
                obj: "k-0",
                base: "ijkal",
                connector: "k-et",
                leakedBase: false,
            },
            {
                result: "kijkalket",
                formula: "#Ø-Ø+k-0(ijkali)Ø+k-et#",
                pers1: "",
                obj: "k-0",
                base: "ijkal",
                connector: "k-et",
                leakedBase: false,
            },
        ]
    );
    s.eq(
        "CNV formula path keeps transitive ijkali external slots out of every perfective-family base",
        (() => {
            const tenses = ["preterito", "pasado-remoto", "perfecto", "pluscuamperfecto", "condicional-perfecto"];
            const subjects = [["ni", ""], ["ti", ""], ["", ""], ["ti", "t"], ["an", "t"], ["", "t"]];
            const expectedTenseMorph = {
                preterito: "Ø",
                "pasado-remoto": "ka",
                perfecto: {
                    singular: "tuk",
                    plural: "tiwi",
                },
                pluscuamperfecto: "tuya",
                "condicional-perfecto": "tuskia",
            };
            const issues = [];
            const formulas = [];
            const buildProbe = (tiempo, pers1, pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo,
                        posicionesFormula: {
                            pers1,
                            obj1: "ki",
                            tronco: "ijkali",
                            pers2,
                            num2: pers2,
                            tiempo,
                        },
                    },
                },
                posicionesFormula: {
                    pers1,
                    obj1: "ki",
                    tronco: "ijkali",
                    pers2,
                    num2: pers2,
                    tiempo,
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            tenses.forEach((tiempo) => subjects.forEach(([pers1, pers2]) => {
                const result = buildProbe(tiempo, pers1, pers2);
                const bySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const formula = result.nuclearClauseShell?.formulaEcho || "";
                formulas.push(formula);
                const tenseTarget = typeof expectedTenseMorph[tiempo] === "object"
                    ? expectedTenseMorph[tiempo][pers2 ? "plural" : "singular"]
                    : expectedTenseMorph[tiempo];
                const leakedBase = ["nikijkal", "tikijkal", "ankijkal", "ikijkal", "kijkal", "jkal"]
                    .includes(bySlot.base?.surfaceValue || "");
                if (!formula.includes("+k-0(ijkali)") || bySlot.va1?.surfaceValue !== "k-0") {
                    issues.push(["object", tiempo, pers1, pers2, formula, bySlot.va1?.surfaceValue || ""]);
                }
                if (bySlot.base?.surfaceValue !== "ijkal" || leakedBase) {
                    issues.push(["base", tiempo, pers1, pers2, bySlot.base?.surfaceValue || ""]);
                }
                if ((bySlot.tns?.surfaceValue || bySlot.tns?.formulaMorph || "") !== tenseTarget) {
                    issues.push(["tense", tiempo, pers1, pers2, bySlot.tns?.surfaceValue || bySlot.tns?.formulaMorph || ""]);
                }
            }));
            return {
                checked: tenses.length * subjects.length,
                uniqueFormulaCount: Array.from(new Set(formulas)).length,
                issues: issues.slice(0, 10),
                issueCount: issues.length,
            };
        })(),
        {
            checked: 30,
            uniqueFormulaCount: 30,
            issues: [],
            issueCount: 0,
        }
    );
    s.eq(
        "CNV formula path and surface-producing path stay slot-equal across representative active VNC outputs",
        (() => {
            const verbs = ["piya", "ilpia", "miki", "maka", "neki", "ajsi", "altia", "nemi", "kisa", "ilwia", "awiltia", "chiwa", "mati", "ijkali"];
            const objects = ["", "ki", "kin", "metzin", "mu", "ta"];
            const subjects = [["", ""], ["ni", ""], ["ti", ""], ["ti", "t"], ["an", "t"], ["", "t"]];
            const tenses = [
                "presente",
                "presente-habitual",
                "imperfecto",
                "futuro",
                "preterito",
                "perfecto",
                "pasado-remoto",
                "condicional",
                "optativo",
                "pluscuamperfecto",
                "condicional-perfecto",
            ];
            const bySlot = (paths = []) => Object.fromEntries(
                paths.map((entry) => [entry.formulaSlotKey || entry.surfaceSlot, entry])
            );
            const bridgeValueForPath = (path, slot, fallback = "") => {
                if (!path) {
                    return fallback || "";
                }
                if (slot === "base") {
                    return String(path.surfaceValue || path.formulaMorph || fallback || "");
                }
                if (slot === "tns") {
                    return String(path.formulaMorph || path.surfaceValue || fallback || "Ø");
                }
                if (slot === "num1" || slot === "num2") {
                    return String(path.surfaceValue || path.formulaMorph || fallback || "Ø");
                }
                if (slot === "va2" && !path.surfaceValue && String(path.formulaMorph || "") === "0") {
                    return "0";
                }
                return String(path.surfaceValue || path.formulaMorph || fallback || "");
            };
            const buildProbe = ({ tronco, obj1, pers1, pers2, tiempo }) => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo,
                        posicionesFormula: { pers1, obj1, tronco, pers2, num2: pers2, tiempo },
                    },
                },
                posicionesFormula: { pers1, obj1, tronco, pers2, num2: pers2, tiempo },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const issues = [];
            let generated = 0;
            verbs.forEach((tronco) => objects.forEach((obj1) => subjects.forEach(([pers1, pers2]) => tenses.forEach((tiempo) => {
                const result = buildProbe({ tronco, obj1, pers1, pers2, tiempo });
                if (!result || result.result === "—" || result.error || !Array.isArray(result.surfaceForms) || !result.surfaceForms.length) {
                    return;
                }
                generated += 1;
                const pathRecords = result.cnvFormulaSurfacePath?.pathsBySurface || [];
                const pathSurfaces = pathRecords.map((record) => record.surface);
                const bridgeRecords = result.slotNameBridge?.pathsBySurface || [];
                const bridgeSurfaces = bridgeRecords.map((record) => record.surface);
                if (JSON.stringify(pathSurfaces) !== JSON.stringify(result.surfaceForms)) {
                    issues.push(["surfaceForms-vs-path", tronco, obj1, pers1, pers2, tiempo, result.result]);
                }
                if (JSON.stringify(bridgeSurfaces) !== JSON.stringify(pathSurfaces)) {
                    issues.push(["path-vs-bridge", tronco, obj1, pers1, pers2, tiempo, result.result]);
                }
                pathRecords.forEach((record) => {
                    const bridge = bridgeRecords.find((entry) => entry.surface === record.surface);
                    const pathBySlot = bySlot(record.paths || []);
                    const bridgeBySlot = bySlot(bridge?.slots || []);
                    ["pers1", "pers2", "va", "va1", "va2", "base", "tns", "num1", "num2"].forEach((slot) => {
                        if (!pathBySlot[slot] && !bridgeBySlot[slot]) {
                            return;
                        }
                        const expected = bridgeValueForPath(pathBySlot[slot], slot, bridgeBySlot[slot]?.value || "");
                        const actual = String(bridgeBySlot[slot]?.value || "");
                        if (actual !== expected) {
                            issues.push(["slot", tronco, obj1, pers1, pers2, tiempo, record.surface, slot, expected, actual]);
                        }
                    });
                    (record.paths || []).forEach((entry) => {
                        if (entry.status === "formula-only") {
                            issues.push(["formula-only", tronco, obj1, pers1, pers2, tiempo, record.surface, entry.formulaSlotKey]);
                        }
                    });
                    const base = pathBySlot.base;
                    const hasSoundedExternalSurface = [
                        pathBySlot.pers1?.surfaceValue,
                        pathBySlot.va?.surfaceValue,
                        pathBySlot.va1?.surfaceValue,
                        pathBySlot.tns?.surfaceValue,
                        pathBySlot.num1?.surfaceValue,
                        pathBySlot.num2?.surfaceValue,
                    ].some((value) => {
                        const normalized = String(value || "");
                        return normalized && normalized !== "0" && normalized !== "Ø";
                    });
                    if (
                        base
                        && String(base.surfaceValue || "") === record.surface
                        && hasSoundedExternalSurface
                    ) {
                        issues.push(["whole-surface-base", tronco, obj1, pers1, pers2, tiempo, record.surface]);
                    }
                });
            }))));
            return { generated, issues: issues.slice(0, 10), issueCount: issues.length };
        })(),
        { generated: 5544, issues: [], issueCount: 0 }
    );
    s.eq(
        "CNV formula path strips copied valence residue from piya preterit base",
        (() => {
            const buildProbe = (obj1 = "", pers2 = "") => ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1,
                            tronco: "piya",
                            pers2,
                            num2: pers2,
                            tiempo: "preterito",
                        },
                    },
                },
                posicionesFormula: {
                    pers1: "",
                    obj1,
                    tronco: "piya",
                    pers2,
                    num2: pers2,
                    tiempo: "preterito",
                },
                entradaTronco: {
                    tieneControlTronco: false,
                    valorTronco: "",
                },
            });
            const summarize = (result) => ({
                surfaceForms: result.surfaceForms,
                formula: result.nuclearClauseShell?.formulaEcho,
                baseRealizations: result.cnvFormulaSurfacePath?.surfaceStemRealizations,
                pathsBySurface: (result.cnvFormulaSurfacePath?.pathsBySurface || []).map((record) => {
                    const bySlot = Object.fromEntries(
                        (record.paths || []).map((entry) => [entry.formulaSlotKey, entry])
                    );
                    return {
                        surface: record.surface,
                        va1: bySlot.va1?.surfaceValue || "",
                        va2: bySlot.va2?.surfaceValue || "",
                        base: bySlot.base?.surfaceValue || "",
                        copyRelations: bySlot.base?.surfaceCopyRelations || [],
                    };
                }),
            });
            return [
                summarize(buildProbe("kin")),
                summarize(buildProbe("metzin")),
                summarize(buildProbe("kin", "t")),
                summarize(buildProbe("metzin", "t")),
            ];
        })(),
        [
            {
                surfaceForms: ["kinpishki", "kinpiyak"],
                formula: "#Ø-Ø+k-in(piya)Ø+ki-0#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "kinpishki",
                        va1: "k-0",
                        va2: "in",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                    {
                        surface: "kinpiyak",
                        va1: "k-0",
                        va2: "in",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                ],
            },
            {
                surfaceForms: ["metzinpishki", "metzinpiyak"],
                formula: "#Ø-Ø+m-etz-in(piya)Ø+ki-0#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "metzinpishki",
                        va1: "m-in",
                        va2: "etz",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                    {
                        surface: "metzinpiyak",
                        va1: "m-in",
                        va2: "etz",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                ],
            },
            {
                surfaceForms: ["kinpishket", "kinpiyaket"],
                formula: "#Ø-Ø+k-in(piya)Ø+k-et#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "kinpishket",
                        va1: "k-0",
                        va2: "in",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                    {
                        surface: "kinpiyaket",
                        va1: "k-0",
                        va2: "in",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "k-in",
                            surfacePrefix: "kin",
                        }],
                    },
                ],
            },
            {
                surfaceForms: ["metzinpishket", "metzinpiyaket"],
                formula: "#Ø-Ø+m-etz-in(piya)Ø+k-et#",
                baseRealizations: ["pish", "piya"],
                pathsBySurface: [
                    {
                        surface: "metzinpishket",
                        va1: "m-in",
                        va2: "etz",
                        base: "pish",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                    {
                        surface: "metzinpiyaket",
                        va1: "m-in",
                        va2: "etz",
                        base: "piya",
                        copyRelations: [{
                            sourceSlot: "val1-val2",
                            targetSlot: "base",
                            relation: "copied-into-base",
                            formulaPrefix: "m-etz-in",
                            surfacePrefix: "metzin",
                        }],
                    },
                ],
            },
        ]
    );
    s.eq(
        "surface-producing path resolves Andrews future preterit number connector options",
        (() => {
            const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                pers1: "",
                obj1: "",
                tronco: "(miki)",
                pers2: "t",
                num2: "t",
                tiempo: "preterito",
            });
            const bySurfaceSlot = Object.fromEntries(
                bridge.slots.map((slot) => [slot.surfaceSlot, slot])
            );
            return {
                slots: bridge.surfaceProducingSlots,
                num1: {
                    value: bySurfaceSlot.num1?.value || "",
                    options: bySurfaceSlot.num1?.formulaOptions || [],
                    dyads: bySurfaceSlot.num1?.formulaDyadOptions || [],
                    andrews: bySurfaceSlot.num1?.andrewsConnectorPattern || "",
                    nawat: bySurfaceSlot.num1?.nawatConnectorPattern || "",
                },
                num2: {
                    value: bySurfaceSlot.num2?.value || "",
                    options: bySurfaceSlot.num2?.formulaOptions || [],
                    dyads: bySurfaceSlot.num2?.formulaDyadOptions || [],
                    andrews: bySurfaceSlot.num2?.andrewsConnectorPattern || "",
                    nawat: bySurfaceSlot.num2?.nawatConnectorPattern || "",
                },
            };
        })(),
        {
            slots: ["pers1", "pers2", "base", "tns", "num1", "num2"],
            num1: {
                value: "k",
                options: ["ki", "k", "0"],
                dyads: ["ki-0", "k-et", "0-et"],
                andrews: "c/qu/qui~0 + 0/eh",
                nawat: "k~ki~0 + 0/et",
            },
            num2: {
                value: "et",
                options: ["0", "et"],
                dyads: ["ki-0", "k-et", "0-et"],
                andrews: "c/qu/qui~0 + 0/eh",
                nawat: "k~ki~0 + 0/et",
            },
        }
    );
    s.eq(
        "surface-producing path resolves Andrews 6.4 object subslots with surface-scoped ki allomorphy",
        (() => {
            const summarize = (posicionesFormula) => {
                const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                    tronco: "piya",
                    pers2: "",
                    num2: "",
                    tiempo: "presente",
                    ...posicionesFormula,
                });
                const bySurfaceSlot = Object.fromEntries(
                    bridge.slots.map((slot) => [slot.surfaceSlot, slot])
                );
                return {
                    slots: bridge.surfaceProducingSlots,
                    va1: {
                        value: bySurfaceSlot.va1?.value || "",
                        features: bySurfaceSlot.va1?.formulaFeatures || null,
                        visibleLinearMorph: bySurfaceSlot.va1?.visibleLinearMorph || "",
                    },
                    va2: {
                        value: bySurfaceSlot.va2?.value || "",
                        features: bySurfaceSlot.va2?.formulaFeatures || null,
                        visibleLinearMorph: bySurfaceSlot.va2?.visibleLinearMorph || "",
                    },
                };
            };
            return {
                thirdSubjectKi: summarize({ pers1: "", obj1: "ki" }),
                firstSubjectKi: summarize({ pers1: "ni", obj1: "ki" }),
                secondSubjectKi: summarize({ pers1: "ti", obj1: "ki" }),
                explicitK: summarize({ pers1: "", obj1: "k" }),
                thirdPlural: summarize({ pers1: "", obj1: "kin" }),
                secondPluralObject: summarize({ pers1: "", obj1: "metzin" }),
            };
        })(),
        {
            thirdSubjectKi: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "ki-0", features: { person: "ki", objective: "0" }, visibleLinearMorph: "ki-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "ki-0" },
            },
            firstSubjectKi: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "k-0" },
            },
            secondSubjectKi: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "k-0" },
            },
            explicitK: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-0" },
                va2: { value: "0", features: { number: "0" }, visibleLinearMorph: "k-0" },
            },
            thirdPlural: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: { value: "k-0", features: { person: "k", objective: "0" }, visibleLinearMorph: "k-in" },
                va2: { value: "in", features: { number: "in" }, visibleLinearMorph: "k-in" },
            },
            secondPluralObject: {
                slots: ["pers1", "pers2", "va1", "va2", "base", "tns", "num1", "num2"],
                va1: {
                    value: "m-in",
                    features: { person: "m", number: "in" },
                    visibleLinearMorph: "m-etz-in",
                },
                va2: {
                    value: "etz",
                    features: { objective: "etz" },
                    visibleLinearMorph: "m-etz-in",
                },
            },
        }
    );
    s.eq(
        "surface-producing path resolves Andrews main indicative and optative connector options",
        (() => {
            const summarize = (tiempo, num2) => {
                const bridge = ctx.buildNuclearClauseSurfaceSlotNameBridge({
                    pers1: "",
                    obj1: "",
                    tronco: "(miki)",
                    pers2: num2,
                    num2,
                    tiempo,
                });
                const bySurfaceSlot = Object.fromEntries(
                    bridge.slots.map((slot) => [slot.surfaceSlot, slot])
                );
                return {
                    tiempo,
                    num1: {
                        value: bySurfaceSlot.num1?.value || "",
                        options: bySurfaceSlot.num1?.formulaOptions || [],
                        dyads: bySurfaceSlot.num1?.formulaDyadOptions || [],
                        andrews: bySurfaceSlot.num1?.andrewsConnectorPattern || "",
                        nawat: bySurfaceSlot.num1?.nawatConnectorPattern || "",
                    },
                    num2: {
                        value: bySurfaceSlot.num2?.value || "",
                        options: bySurfaceSlot.num2?.formulaOptions || [],
                        dyads: bySurfaceSlot.num2?.formulaDyadOptions || [],
                        andrews: bySurfaceSlot.num2?.andrewsConnectorPattern || "",
                        nawat: bySurfaceSlot.num2?.nawatConnectorPattern || "",
                    },
                };
            };
            return [
                summarize("presente", "t"),
                summarize("presente-habitual", "t"),
                summarize("imperfecto", "t"),
                summarize("pasado-remoto", "t"),
                summarize("optativo", "t"),
            ];
        })(),
        [
            {
                tiempo: "presente",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "presente-habitual",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "imperfecto",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "pasado-remoto",
                num1: { value: "0", options: ["0"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
                num2: { value: "t", options: ["0", "t"], dyads: ["0-0", "0-t"], andrews: "0 + 0/h", nawat: "0 + 0/t" },
            },
            {
                tiempo: "optativo",
                num1: { value: "k", options: ["0", "k"], dyads: ["0-0", "k-an"], andrews: "0-0 / c-an", nawat: "0-0 / k-an" },
                num2: { value: "an", options: ["0", "an"], dyads: ["0-0", "k-an"], andrews: "0-0 / c-an", nawat: "0-0 / k-an" },
            },
        ]
    );
    const canonicalSurfaceResult = ctx.generateNuclearClauseSurface({
        silent: true,
        skipValidation: true,
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "(maka)",
            pers2: "",
            num2: "",
            poseedor: "",
            tiempo: "presente",
        },
        override: {
            tenseMode: ctx.TENSE_MODE.verbo,
            derivationMode: ctx.DERIVATION_MODE.active,
            voiceMode: ctx.VOICE_MODE.active,
        },
    });
    s.eq(
        "generateNuclearClauseSurface accepts Andrews/Spanish posicionesFormula as the public slot API",
        {
            forms: canonicalSurfaceResult.surfaceForms,
            posicionesFormula: canonicalSurfaceResult.posicionesFormula,
        },
        {
            forms: ["nikmaka"],
            posicionesFormula: {
                pers1: "ni",
                obj1: "ki",
                tronco: "(maka)",
                pers2: "",
                num2: "",
                poseedor: "",
                obj2: "",
                obj3: "",
                reflexivo: "",
                tiempo: "presente",
            },
        }
    );

    const boundOverride = ctx.applyBoundMarkerSlotOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki"
    );
    s.eq("bound override drops occupied obj1", boundOverride.obj1, "");
    s.eq("bound override drops occupied base obj1", boundOverride.baseObj1, "");
    const sparseBoundEntradaParsed = ctx.parseMovingTargetRegexInput("(a)+ta-(ish-kwi)");
    const sparseBoundEntradaGrammarObject = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+ta-(ish-kwi)",
        sparseBoundEntradaParsed
    );
    const fixedBoundEntradaGrammarObject = ctx.buildEntradaGrammarObjectFromMovingTargetParsed(
        "(a)+ta-(ish-kwi)",
        sparseBoundEntradaParsed,
        null,
        {
            sourceFormulaSlots: {
                predicateStem: { slot: "STEM", stem: "kwi" },
                obj1: { slot: "obj1", token: "ta" },
            },
            sourceFormulaEcho: "#Ø-ta(kwi)Ø#",
        }
    );
    const blockedBoundOverride = ctx.applyBoundMarkerSlotOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki",
        {
            entradaGrammarObject: sparseBoundEntradaGrammarObject,
        }
    );
    const fixedBoundOverride = ctx.applyBoundMarkerSlotOverrides(
        {
            hasBoundMarker: true,
            derivationValencyDelta: 0,
            derivationType: "",
            boundPrefixes: ["ki"],
        },
        "ki",
        "ki",
        {
            entradaGrammarObject: fixedBoundEntradaGrammarObject,
        }
    );
    s.eq(
        "bound marker object deletion is gated until entrada valence frame is fixed",
        {
            blockedStatus: blockedBoundOverride.valencyObjectSlotGate?.status || "",
            blockedObj1Preserved: blockedBoundOverride.obj1,
            blockedGenerationAllowed: blockedBoundOverride.generationAllowed,
            blockedValenceFixed: blockedBoundOverride.valencyObjectSlotGate?.valenceFrameFixed,
            fixedStatus: fixedBoundOverride.valencyObjectSlotGate?.status || "",
            fixedObj1: fixedBoundOverride.obj1,
            fixedGenerationAllowed: fixedBoundOverride.valencyObjectSlotGate?.generationAllowed,
            fixedValenceFixed: fixedBoundOverride.valencyObjectSlotGate?.valenceFrameFixed,
        },
        {
            blockedStatus: "blocked",
            blockedObj1Preserved: "ki",
            blockedGenerationAllowed: false,
            blockedValenceFixed: false,
            fixedStatus: "pass",
            fixedObj1: "",
            fixedGenerationAllowed: true,
            fixedValenceFixed: true,
        }
    );
    const unresolvedRouteFrameMutationGate = ctx.buildGenerationValencyObjectSlotMutationGate({
        operation: "test-route-frame-object-slot-mutation",
        mutationKind: "delete-object-slot",
        sourceObj1: "ki",
        sourceBaseObj1: "ki",
        targetObj1: "",
        targetBaseObj1: "",
        options: {
            sourceRouteFrame: {
                kind: "andrews-incorporation-route-frame",
                remainingExternalObjectSlots: [
                    { slotId: "obj1", prefix: "ki" },
                ],
            },
        },
    });
    const fixedRouteFrameMutationGate = ctx.buildGenerationValencyObjectSlotMutationGate({
        operation: "test-route-frame-object-slot-mutation",
        mutationKind: "delete-object-slot",
        sourceObj1: "ki",
        sourceBaseObj1: "ki",
        targetObj1: "",
        targetBaseObj1: "",
        options: {
            sourceRouteFrame: {
                kind: "andrews-incorporation-route-frame",
                remainingExternalObjectSlots: [
                    { slotId: "obj1", prefix: "ki" },
                ],
                objectSlotOwnership: {
                    matrixValenceFrameFixed: true,
                },
            },
        },
    });
    s.eq(
        "valency object-slot mutation gate reads route-frame valence ownership before deleting slots",
        {
            unresolvedStatus: unresolvedRouteFrameMutationGate.status,
            unresolvedReason: unresolvedRouteFrameMutationGate.reason,
            unresolvedRequiresFixedFrame: unresolvedRouteFrameMutationGate.requiresFixedValenceFrame,
            unresolvedFrameSignal: unresolvedRouteFrameMutationGate.frameHasValenceObjectSignal,
            unresolvedValenceFixed: unresolvedRouteFrameMutationGate.valenceFrameFixed,
            fixedStatus: fixedRouteFrameMutationGate.status,
            fixedReason: fixedRouteFrameMutationGate.reason,
            fixedRequiresFixedFrame: fixedRouteFrameMutationGate.requiresFixedValenceFrame,
            fixedFrameSignal: fixedRouteFrameMutationGate.frameHasValenceObjectSignal,
            fixedValenceFixed: fixedRouteFrameMutationGate.valenceFrameFixed,
        },
        {
            unresolvedStatus: "blocked",
            unresolvedReason: "generation-valency-source-frame-unfixed",
            unresolvedRequiresFixedFrame: true,
            unresolvedFrameSignal: true,
            unresolvedValenceFixed: false,
            fixedStatus: "pass",
            fixedReason: "generation-valency-object-slot-mutation-licensed",
            fixedRequiresFixedFrame: true,
            fixedFrameSignal: true,
            fixedValenceFixed: true,
        }
    );
    const preParsedBoundMaka = {
        ...ctx.parseVerbInput("maka"),
        sourceRawVerb: "maka",
        hasBoundMarker: true,
        boundPrefixes: ["ki"],
        derivationValencyDelta: 0,
        derivationType: "",
    };
    const boundGenerationBlocked = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: preParsedBoundMaka,
                entradaGrammarObject: sparseBoundEntradaGrammarObject,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "maka",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "maka",
        },
    });
    s.eq(
        "generation hard-gates bound-marker object deletion when entrada valence is unresolved",
        {
            error: boundGenerationBlocked.error === true,
            diagnosticId: boundGenerationBlocked.diagnostics?.[0]?.id || "",
            routeStage: boundGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            gateStatus: boundGenerationBlocked.valencyObjectSlotGate?.status || "",
            generationAllowed: boundGenerationBlocked.valencyObjectSlotGate?.generationAllowed,
            routeRankingAllowed: boundGenerationBlocked.valencyObjectSlotGate?.routeRankingAllowed,
        },
        {
            error: true,
            diagnosticId: "generation-valency-object-slot-frame-unfixed",
            routeStage: "generation-valency-object-slot-gate",
            gateStatus: "blocked",
            generationAllowed: false,
            routeRankingAllowed: false,
        }
    );

    const passiveAdjustments = ctx.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        pers1: "",
        pers2: "",
        obj1: "ki",
        obj2: "ta",
        obj3: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObj1: "ki",
        hasPromotableObject: true,
    });
    s.eq("passive valency adjusts clears obj1", passiveAdjustments.obj1, "");
    s.eq("passive valency adjusts clears obj2", passiveAdjustments.obj2, "");
    s.ok("passive valency adjusts preserves subject for promoted passive", passiveAdjustments.preserveSubjectForPassive);
    const passiveAdjustmentsBlocked = ctx.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        pers1: "",
        pers2: "",
        obj1: "ki",
        obj2: "ta",
        obj3: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObj1: "ki",
        hasPromotableObject: true,
        entradaGrammarObject: sparseBoundEntradaGrammarObject,
    });
    const passiveAdjustmentsFixed = ctx.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode: true,
        verb: "nemi",
        analysisVerb: "nemi",
        fusionPrefixes: [],
        targetValency: 1,
        pers1: "",
        pers2: "",
        obj1: "ki",
        obj2: "ta",
        obj3: "",
        preserveSubjectForPassive: false,
        allowPassiveObject: false,
        morphologyObj1: "ki",
        hasPromotableObject: true,
        entradaGrammarObject: fixedBoundEntradaGrammarObject,
    });
    s.eq(
        "passive impersonal object clearing is gated until entrada valence frame is fixed",
        {
            blockedStatus: passiveAdjustmentsBlocked.valencyObjectSlotGate?.status || "",
            blockedObj1Preserved: passiveAdjustmentsBlocked.obj1,
            blockedObj2Preserved: passiveAdjustmentsBlocked.obj2,
            blockedGenerationAllowed: passiveAdjustmentsBlocked.generationAllowed,
            fixedStatus: passiveAdjustmentsFixed.valencyObjectSlotGate?.status || "",
            fixedObj1: passiveAdjustmentsFixed.obj1,
            fixedObj2: passiveAdjustmentsFixed.obj2,
            fixedGenerationAllowed: passiveAdjustmentsFixed.valencyObjectSlotGate?.generationAllowed,
        },
        {
            blockedStatus: "blocked",
            blockedObj1Preserved: "ki",
            blockedObj2Preserved: "ta",
            blockedGenerationAllowed: false,
            fixedStatus: "pass",
            fixedObj1: "",
            fixedObj2: "",
            fixedGenerationAllowed: true,
        }
    );
    const passiveGenerationBlocked = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: {
                    ...ctx.parseVerbInput("maka"),
                    sourceRawVerb: "maka",
                },
                entradaGrammarObject: sparseBoundEntradaGrammarObject,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.passive,
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ki",
            tronco: "maka",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "ta",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "maka",
        },
    });
    s.eq(
        "generation hard-gates passive impersonal object clearing when entrada valence is unresolved",
        {
            error: passiveGenerationBlocked.error === true,
            diagnosticId: passiveGenerationBlocked.diagnostics?.[0]?.id || "",
            routeStage: passiveGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            gateStatus: passiveGenerationBlocked.valencyObjectSlotGate?.status || "",
            mutationKind: passiveGenerationBlocked.valencyObjectSlotGate?.mutationKind || "",
            generationAllowed: passiveGenerationBlocked.valencyObjectSlotGate?.generationAllowed,
            routeRankingAllowed: passiveGenerationBlocked.valencyObjectSlotGate?.routeRankingAllowed,
        },
        {
            error: true,
            diagnosticId: "generation-valency-object-slot-frame-unfixed",
            routeStage: "generation-valency-object-slot-gate",
            gateStatus: "blocked",
            mutationKind: "delete-object-slots",
            generationAllowed: false,
            routeRankingAllowed: false,
        }
    );
    const lesson21Passive = ctx.buildLesson21PassiveVoicePursuitFrame();
    s.eq(
        "Lesson 21 passive pursuit frame keeps Andrews passive separate from current combined route",
        {
            stepNumber: lesson21Passive.stepNumber,
            aimStatus: lesson21Passive.aimStatus,
            pdfRefs: lesson21Passive.pdfRefs,
            categories: lesson21Passive.subsectionInventory.map((entry) => entry.category),
            requiresSpecificObject: lesson21Passive.transformationFrame.requiresSpecificObjectPronoun,
            sourceIntransitiveAllowed: lesson21Passive.transformationFrame.sourceIntransitiveAllowed,
            sourceNonspecificObjectAllowed: lesson21Passive.transformationFrame.sourceNonspecificObjectAllowed,
            caseIds: lesson21Passive.generationCases.map((entry) => entry.id),
            combinedRouteGap: lesson21Passive.currentEngineBoundary.combinedPassiveImpersonalLabelStillVisible,
            nonspecificGateMissing: lesson21Passive.currentEngineBoundary.nonspecificObjectPassiveGateMissing,
            closestPass: lesson21Passive.closestPass,
            remainingGapCount: lesson21Passive.remainingGaps.length,
        },
        {
            stepNumber: 21,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 21.1",
                "Andrews Lesson 21.2",
                "Andrews Lesson 21.3",
                "Andrews Lesson 21.4",
            ],
            categories: [
                "passive-transformation",
                "passive-generation-cases",
                "passive-sentence-moods",
                "active-reflexive-passive-notion",
            ],
            requiresSpecificObject: true,
            sourceIntransitiveAllowed: false,
            sourceNonspecificObjectAllowed: false,
            caseIds: [
                "single-specific-projective-object",
                "single-specific-reflexive-object",
                "projective-plus-reflexive-object",
                "two-specific-projective-objects",
                "one-specific-one-nonspecific-projective-object",
                "three-object-pronouns",
            ],
            combinedRouteGap: true,
            nonspecificGateMissing: true,
            closestPass: false,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 21 passive pursuit frame exposes non-enumerable LCM audit metadata",
        {
            hasFrame: Boolean(lesson21Passive.grammarFrame),
            routeFamily: lesson21Passive.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson21Passive.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson21Passive.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson21Passive.ok,
            targetVoice: lesson21Passive.grammarFrame?.nuclearClauseFrame?.targetVoice || "",
            sourceSubject: lesson21Passive.grammarFrame?.participantFrame?.sourceSubject || "",
            nonspecificRedirect: lesson21Passive.grammarFrame?.participantFrame?.nonspecificObjectRedirect || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson21Passive, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "generation-valency",
            routeStage: "audit-lesson-21",
            generationAllowed: false,
            ok: true,
            targetVoice: "passive",
            sourceSubject: "deleted",
            nonspecificRedirect: "Andrews Lesson 22",
            enumerableGrammarFrame: false,
        }
    );
    s.eq(
        "Lesson 21 passive subject override maps a specific object into subject slots",
        ctx.getPassiveSubjectOverride("nech"),
        { pers1: "ni", pers2: "" }
    );
    const lesson22Impersonal = ctx.buildLesson22ImpersonalVoicePursuitFrame();
    s.eq(
        "Lesson 22 impersonal pursuit frame keeps Andrews impersonal separate from passive",
        {
            stepNumber: lesson22Impersonal.stepNumber,
            aimStatus: lesson22Impersonal.aimStatus,
            pdfRefs: lesson22Impersonal.pdfRefs,
            categories: lesson22Impersonal.subsectionInventory.map((entry) => entry.category),
            inherentSubjectReferent: lesson22Impersonal.inherentImpersonalFrame.subjectReferent,
            inherentSubjectSupplementable: lesson22Impersonal.inherentImpersonalFrame.subjectSupplementable,
            nonanimateSupplementable: /can be supplemented/.test(lesson22Impersonal.nonanimateDistinctionFrame.nonanimateSubjectReferent),
            intransitiveAllowed: lesson22Impersonal.impersonalTransformationFrame.activeSourceMayBeIntransitive,
            transitiveAllowed: lesson22Impersonal.impersonalTransformationFrame.activeSourceMayBeTransitive,
            transitiveRestriction: lesson22Impersonal.impersonalTransformationFrame.transitiveRestriction,
            formulaPolicy: lesson22Impersonal.impersonalGenerationFrame.formulaPolicy,
            objectBridge: lesson22Impersonal.impersonalGenerationFrame.nawatNonspecificObjectBridge.map((entry) => [entry.andrews, entry.nawat]),
            taPrefix: lesson22Impersonal.taImpersonalFrame.derivationalPrefix,
            taNotObject: lesson22Impersonal.taImpersonalFrame.notObjectPronoun,
            combinedRouteGap: lesson22Impersonal.currentEngineBoundary.combinedPassiveImpersonalLabelStillVisible,
            specificGateMissing: lesson22Impersonal.currentEngineBoundary.specificProjectiveObjectImpersonalGateMissing,
            closestPass: lesson22Impersonal.closestPass,
            remainingGapCount: lesson22Impersonal.remainingGaps.length,
        },
        {
            stepNumber: 22,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 22.1",
                "Andrews Lesson 22.2",
                "Andrews Lesson 22.3",
                "Andrews Lesson 22.4",
                "Andrews Lesson 22.5",
                "Andrews Lesson 22.6",
            ],
            categories: [
                "inherent-impersonal-vnc",
                "nonanimate-impersonal-distinction",
                "impersonal-voice-transform",
                "impersonal-generation-rules",
                "impersonal-sentence-moods",
                "ta-impersonal-derivation",
            ],
            inherentSubjectReferent: "none",
            inherentSubjectSupplementable: false,
            nonanimateSupplementable: true,
            intransitiveAllowed: true,
            transitiveAllowed: true,
            transitiveRestriction: "source must not contain a specific projective object",
            formulaPolicy: "use the same VNC formula as the active source",
            objectBridge: [["te", "te"], ["tla", "ta"]],
            taPrefix: { andrews: "tla", nawat: "ta" },
            taNotObject: true,
            combinedRouteGap: true,
            specificGateMissing: true,
            closestPass: false,
            remainingGapCount: 5,
        }
    );
    s.eq(
        "Lesson 22 impersonal pursuit frame exposes non-enumerable LCM audit metadata",
        {
            hasFrame: Boolean(lesson22Impersonal.grammarFrame),
            routeFamily: lesson22Impersonal.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson22Impersonal.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson22Impersonal.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson22Impersonal.ok,
            targetVoice: lesson22Impersonal.grammarFrame?.nuclearClauseFrame?.targetVoice || "",
            subjectReferent: lesson22Impersonal.grammarFrame?.participantFrame?.subjectReferent || "",
            subjectSupplementable: lesson22Impersonal.grammarFrame?.participantFrame?.subjectSupplementable,
            derivationalPrefix: lesson22Impersonal.grammarFrame?.orthographyFrame?.derivationalPrefixBridge || null,
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson22Impersonal, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "generation-valency",
            routeStage: "audit-lesson-22",
            generationAllowed: false,
            ok: true,
            targetVoice: "impersonal",
            subjectReferent: "none",
            subjectSupplementable: false,
            derivationalPrefix: { andrews: "tla", nawat: "ta" },
            enumerableGrammarFrame: false,
        }
    );

    const resetNominalSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears nominal pers1", resetNominalSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears nominal pers2", resetNominalSubject.pers2, "");
    const resetPresentAgentivoSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo-presente", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears present-agentive pers1", resetPresentAgentivoSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears present-agentive pers2", resetPresentAgentivoSubject.pers2, "");
    const resetPreteritAgentivoSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo-preterito", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears preterit-agentive pers1", resetPreteritAgentivoSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears preterit-agentive pers2", resetPreteritAgentivoSubject.pers2, "");
    const resetFutureAgentivoSubject = ctx.resetPers1Pers2ForNominalTiempos({ tiempo: "agentivo-futuro", pers1: "ni", pers2: "t" });
    s.eq("resetPers1Pers2ForNominalTiempos clears future-agentive pers1", resetFutureAgentivoSubject.pers1, "");
    s.eq("resetPers1Pers2ForNominalTiempos clears future-agentive pers2", resetFutureAgentivoSubject.pers2, "");

    let clearedTarget = "";
    const reflexiveSwitch = ctx.applyReflexivoAutoSwitch({
        pers1: "ni",
        pers2: "",
        obj1: "nech",
        isPassiveImpersonal: false,
        clearError: (id) => {
            clearedTarget = id;
        },
    });
    s.eq("reflexive auto switch rewrites same-person obj1 to mu", reflexiveSwitch.obj1, "mu");
    s.ok("reflexive auto switch marks reflexive", reflexiveSwitch.isReflexive);
    s.eq("reflexive auto switch clears object-prefix error", clearedTarget, "object-prefix");
    let blockedReflexiveClearedTarget = "";
    const blockedReflexiveSwitch = ctx.applyReflexivoAutoSwitch({
        pers1: "ni",
        pers2: "",
        obj1: "nech",
        isPassiveImpersonal: false,
        entradaGrammarObject: sparseBoundEntradaGrammarObject,
        clearError: (id) => {
            blockedReflexiveClearedTarget = id;
        },
    });
    const fixedReflexiveSwitch = ctx.applyReflexivoAutoSwitch({
        pers1: "ni",
        pers2: "",
        obj1: "nech",
        isPassiveImpersonal: false,
        entradaGrammarObject: fixedBoundEntradaGrammarObject,
    });
    s.eq(
        "reflexive auto switch is gated until entrada valence frame is fixed",
        {
            blockedStatus: blockedReflexiveSwitch.valencyObjectSlotGate?.status || "",
            blockedObj1Preserved: blockedReflexiveSwitch.obj1,
            blockedIsReflexive: blockedReflexiveSwitch.isReflexive,
            blockedGenerationAllowed: blockedReflexiveSwitch.generationAllowed,
            blockedClearedTarget: blockedReflexiveClearedTarget,
            fixedStatus: fixedReflexiveSwitch.valencyObjectSlotGate?.status || "",
            fixedObj1: fixedReflexiveSwitch.obj1,
            fixedIsReflexive: fixedReflexiveSwitch.isReflexive,
            fixedGenerationAllowed: fixedReflexiveSwitch.valencyObjectSlotGate?.generationAllowed,
        },
        {
            blockedStatus: "blocked",
            blockedObj1Preserved: "nech",
            blockedIsReflexive: false,
            blockedGenerationAllowed: false,
            blockedClearedTarget: "",
            fixedStatus: "pass",
            fixedObj1: "mu",
            fixedIsReflexive: true,
            fixedGenerationAllowed: true,
        }
    );
    const reflexiveGenerationBlocked = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            skipValidation: true,
            override: {
                parsedVerb: {
                    ...ctx.parseVerbInput("maka"),
                    sourceRawVerb: "maka",
                },
                entradaGrammarObject: sparseBoundEntradaGrammarObject,
                tenseMode: ctx.TENSE_MODE.verbo,
                derivationMode: ctx.DERIVATION_MODE.active,
                voiceMode: ctx.VOICE_MODE.active,
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "nech",
            tronco: "maka",
            pers2: "",
            num2: "",
            poseedor: "",
            obj2: "",
            obj3: "",
            reflexivo: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "maka",
        },
    });
    s.eq(
        "generation hard-gates reflexive object reclassification when entrada valence is unresolved",
        {
            error: reflexiveGenerationBlocked.error === true,
            diagnosticId: reflexiveGenerationBlocked.diagnostics?.[0]?.id || "",
            routeStage: reflexiveGenerationBlocked.diagnostics?.[0]?.routeStage || "",
            gateStatus: reflexiveGenerationBlocked.valencyObjectSlotGate?.status || "",
            mutationKind: reflexiveGenerationBlocked.valencyObjectSlotGate?.mutationKind || "",
            generationAllowed: reflexiveGenerationBlocked.valencyObjectSlotGate?.generationAllowed,
            routeRankingAllowed: reflexiveGenerationBlocked.valencyObjectSlotGate?.routeRankingAllowed,
        },
        {
            error: true,
            diagnosticId: "generation-valency-object-slot-frame-unfixed",
            routeStage: "generation-valency-object-slot-gate",
            gateStatus: "blocked",
            mutationKind: "reclassify-object-slot-reflexive",
            generationAllowed: false,
            routeRankingAllowed: false,
        }
    );

    const executeEngineResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(nemi)",
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
    const executeEngineSlotInputResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(nemi)",
            pers2: "",
            tiempo: "presente",
        },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
        },
    });
    s.eq(
        "executeGenerateWordRequest reads Andrews/Spanish posicionesFormula as the slot input",
        {
            result: executeEngineSlotInputResult.result,
            posicionesFormula: executeEngineSlotInputResult.posicionesFormula,
            framePosicionesFormula: executeEngineSlotInputResult.grammarFrame?.participantFrame?.posicionesFormula || null,
            slotNameBridge: {
                surfaceProducingSlotCount: executeEngineSlotInputResult.slotNameBridge?.surfaceProducingSlotCount,
                cnvFormulaSlotCount: executeEngineSlotInputResult.grammarFrame?.participantFrame?.slotNameBridge?.cnvFormulaSlotCount,
                surfaceProducingSlots: executeEngineSlotInputResult.slotNameBridge?.surfaceProducingSlots,
            },
        },
        {
            result: "nemi",
            posicionesFormula: {
                pers1: "",
                obj1: "",
                tronco: "(nemi)",
                pers2: "",
                num2: "",
                poseedor: "",
                obj2: "",
                obj3: "",
                reflexivo: "",
                tiempo: "presente",
            },
            framePosicionesFormula: {
                pers1: "",
                obj1: "",
                tronco: "(nemi)",
                pers2: "",
                num2: "",
                poseedor: "",
                obj2: "",
                obj3: "",
                reflexivo: "",
                tiempo: "presente",
            },
            slotNameBridge: {
                surfaceProducingSlotCount: 6,
                cnvFormulaSlotCount: 6,
                surfaceProducingSlots: ["pers1", "pers2", "base", "tns", "num1", "num2"],
            },
        }
    );
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
            formulaAbbreviation: executeEngineResult.nuclearClauseShell?.formulaAbbreviation,
            formulaLabel: executeEngineResult.nuclearClauseShell?.formulaLabel,
            displayLabel: executeEngineResult.nuclearClauseShell?.displayLabel,
            hasTensePosition: executeEngineResult.nuclearClauseShell?.hasTensePosition,
            generationAllowed: executeEngineResult.nuclearClauseShell?.generationAllowed,
            predicateStem: executeEngineResult.nuclearClauseShell?.slots?.predicateStem?.stem,
            tenseValue: executeEngineResult.nuclearClauseShell?.slots?.tensePosition?.tenseValue,
            formulaEcho: executeEngineResult.nuclearClauseShell?.formulaEcho,
            formulaSlotKeys: Object.keys(executeEngineResult.nuclearClauseShell?.formulaSlots || {}),
            valencyKind: executeEngineResult.vncValencyFrame?.kind,
            valency: executeEngineResult.vncValencyFrame?.valency,
            pers1Pers2Slot: executeEngineResult.vncValencyFrame?.pers1Pers2?.slot,
            obj1Slot: executeEngineResult.vncValencyFrame?.obj1?.slot,
            obj2Slot: executeEngineResult.vncValencyFrame?.obj2?.slot,
            obj3Slot: executeEngineResult.vncValencyFrame?.obj3?.slot,
            obj1Display: executeEngineResult.vncValencyFrame?.obj1?.displayPrefix,
        },
        {
            kind: "nuclear-clause-shell",
            clauseKind: "verbal-nuclear-clause",
            formulaType: "VNC",
            formulaAbbreviation: "CNV",
            formulaLabel: "Fórmula CNV",
            displayLabel: "cláusula nuclear verbal (CNV)",
            hasTensePosition: true,
            generationAllowed: false,
            predicateStem: "nemi",
            tenseValue: "presente",
            formulaEcho: "#Ø-Ø(nemi)Ø+Ø-Ø#",
            formulaSlotKeys: ["pers1Pers2", "obj1", "obj2", "obj3", "reflexivo", "predicateStem", "tensePosition", "num1Num2"],
            valencyKind: "vnc-valency-frame",
            valency: "intransitive",
            pers1Pers2Slot: "pers1-pers2",
            obj1Slot: "obj1",
            obj2Slot: "obj2",
            obj3Slot: "obj3",
            obj1Display: "Ø",
        }
    );
    {
        const buildFormulaProbe = (
            tiempo,
            derivationMode = ctx.DERIVATION_MODE.active,
            { pers1 = "", pers2 = "t" } = {}
        ) => ctx.executeGenerateWordRequest({
            options: {
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: ctx.TENSE_MODE.verbo,
                    derivationMode,
                    voiceMode: derivationMode === ctx.DERIVATION_MODE.nonactive ? ctx.VOICE_MODE.passive : ctx.VOICE_MODE.active,
                    tiempo,
                    posicionesFormula: {
                        pers1,
                        obj1: "",
                        tronco: "miki",
                        pers2,
                        num2: pers2,
                        tiempo,
                    },
                },
            },
            posicionesFormula: {
                pers1,
                obj1: "",
                tronco: "miki",
                pers2,
                num2: pers2,
                tiempo,
            },
            entradaTronco: {
                tieneControlTronco: false,
                valorTronco: "",
            },
        });
        const activePreterit = buildFormulaProbe("preterito");
        const activePreteritFirstPlural = buildFormulaProbe("preterito", ctx.DERIVATION_MODE.active, {
            pers1: "ti",
            pers2: "t",
        });
        const nonactivePreterit = buildFormulaProbe("preterito", ctx.DERIVATION_MODE.nonactive);
        s.eq(
            "VNC formula echo keeps perfective/nonactive stems inside predicate and subject/number outside it",
            {
                activeSurface: activePreterit.result,
                activeFormula: activePreterit.nuclearClauseShell?.formulaEcho,
                activePredicate: activePreterit.nuclearClauseShell?.slots?.predicateStem?.stem,
                activeConnector: activePreterit.nuclearClauseShell?.slots?.num1Num2?.displayConnector,
                activeFirstPluralSurface: activePreteritFirstPlural.result,
                activeFirstPluralFormula: activePreteritFirstPlural.nuclearClauseShell?.formulaEcho,
                activeFirstPluralPredicate: activePreteritFirstPlural.nuclearClauseShell?.slots?.predicateStem?.stem,
                activeFirstPluralSubject: activePreteritFirstPlural.nuclearClauseShell?.slots?.pers1Pers2?.displayPrefix,
                activeFirstPluralConnector: activePreteritFirstPlural.nuclearClauseShell?.slots?.num1Num2?.displayConnector,
                nonactiveSurface: nonactivePreterit.result,
                nonactiveFormula: nonactivePreterit.nuclearClauseShell?.formulaEcho,
                nonactivePredicate: nonactivePreterit.nuclearClauseShell?.slots?.predicateStem?.stem,
                nonactiveConnector: nonactivePreterit.nuclearClauseShell?.slots?.num1Num2?.displayConnector,
            },
            {
                activeSurface: "mikiket",
                activeFormula: "#Ø-Ø(miki)Ø+k-et#",
                activePredicate: "miki",
                activeConnector: "k-et",
                activeFirstPluralSurface: "timikiket",
                activeFirstPluralFormula: "#ti-Ø(miki)Ø+k-et#",
                activeFirstPluralPredicate: "miki",
                activeFirstPluralSubject: "ti",
                activeFirstPluralConnector: "k-et",
                nonactiveSurface: "mikiwak / mikuwak",
                nonactiveFormula: "#Ø-Ø(mikiwa)Ø+k-et#",
                nonactivePredicate: "mikiwa",
                nonactiveConnector: "k-et",
            }
        );
        const formulaSummary = (result) => {
            const connectorOptions = result.nuclearClauseShell?.formulaSlots?.num1Num2?.connectorOptions || [];
            const num1Options = result.nuclearClauseShell?.formulaSlots?.num1Num2?.num1Options || [];
            const num2Options = result.nuclearClauseShell?.formulaSlots?.num1Num2?.num2Options || [];
            const pathNum1 = result.cnvFormulaSurfacePath?.paths
                ?.find((path) => path.formulaSlotKey === "num1") || {};
            const pathNum2 = result.cnvFormulaSurfacePath?.paths
                ?.find((path) => path.formulaSlotKey === "num2") || {};
            const summary = {
                routeFamily: result.grammarFrame?.routeContract?.routeFamily,
                clauseKind: result.nuclearClauseShell?.clauseKind,
                formulaType: result.nuclearClauseShell?.formulaType,
                category: result.nuclearClauseShell?.formulaAbbreviation,
                tenseSlot: result.nuclearClauseShell?.formulaSlots?.tensePosition?.slot,
                numSlot: result.nuclearClauseShell?.formulaSlots?.num1Num2?.slot,
                connectorOwner: result.nuclearClauseShell?.formulaSlots?.num1Num2?.belongsTo,
                connectorNotTense: result.nuclearClauseShell?.formulaSlots?.num1Num2?.notTense,
                formula: result.nuclearClauseShell?.formulaEcho,
                tenseLabel: result.nuclearClauseShell?.formulaSlots?.tensePosition?.label,
                compatibilityLabel: result.nuclearClauseShell?.formulaSlots?.tensePosition?.compatibilityLabel,
                morph: result.nuclearClauseShell?.formulaSlots?.tensePosition?.displayMorph,
                mood: result.nuclearClauseShell?.formulaSlots?.tensePosition?.mood,
                andrewsTense: result.nuclearClauseShell?.formulaSlots?.tensePosition?.andrewsTense,
                connector: result.nuclearClauseShell?.formulaSlots?.num1Num2?.displayConnector,
                num1: result.nuclearClauseShell?.formulaSlots?.num1Num2?.num1,
                num2: result.nuclearClauseShell?.formulaSlots?.num1Num2?.num2,
            };
            if (connectorOptions.length) {
                summary.connectorOptions = connectorOptions;
                summary.num1Options = num1Options;
                summary.num2Options = num2Options;
                summary.pathNum1Options = pathNum1.formulaOptions || [];
                summary.pathNum2Options = pathNum2.formulaOptions || [];
                summary.pathDyadOptions = pathNum1.formulaDyadOptions || [];
            }
            return summary;
        };
        const vncFormulaAuthorityBase = {
            routeFamily: "vnc",
            clauseKind: "verbal-nuclear-clause",
            formulaType: "VNC",
            category: "CNV",
            tenseSlot: "tns",
            numSlot: "num1-num2",
            connectorOwner: "subject",
            connectorNotTense: true,
        };
        const mainIndicativeOptions = {
            connectorOptions: ["0-0", "0-t"],
            num1Options: ["0"],
            num2Options: ["0", "t"],
            pathNum1Options: ["0"],
            pathNum2Options: ["0", "t"],
            pathDyadOptions: ["0-0", "0-t"],
        };
        const futurePreteritOptions = {
            connectorOptions: ["ki-0", "k-et", "0-et"],
            num1Options: ["ki", "k", "0"],
            num2Options: ["0", "et"],
            pathNum1Options: ["ki", "k", "0"],
            pathNum2Options: ["0", "et"],
            pathDyadOptions: ["ki-0", "k-et", "0-et"],
        };
        const optativeOptions = {
            connectorOptions: ["0-0", "k-an"],
            num1Options: ["0", "k"],
            num2Options: ["0", "an"],
            pathNum1Options: ["0", "k"],
            pathNum2Options: ["0", "an"],
            pathDyadOptions: ["0-0", "k-an"],
        };
        s.eq(
            "Lesson 5 CNV formula compares each implemented tense against Andrews tense morphs and number dyads",
            [
                ["presente sg", formulaSummary(buildFormulaProbe("presente", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "" }))],
                ["presente pl", formulaSummary(buildFormulaProbe("presente", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["presente habitual pl", formulaSummary(buildFormulaProbe("presente-habitual", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["presente desiderativo pl", formulaSummary(buildFormulaProbe("presente-desiderativo", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["imperfecto pl", formulaSummary(buildFormulaProbe("imperfecto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["futuro pl", formulaSummary(buildFormulaProbe("futuro", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["preterito pl", formulaSummary(buildFormulaProbe("preterito", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["pasado remoto pl", formulaSummary(buildFormulaProbe("pasado-remoto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["condicional pl", formulaSummary(buildFormulaProbe("condicional", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["optativo no pasado 1pl", formulaSummary(buildFormulaProbe("optativo", ctx.DERIVATION_MODE.active, { pers1: "ti", pers2: "t" }))],
                ["optativo no pasado 2pl", formulaSummary(buildFormulaProbe("optativo", ctx.DERIVATION_MODE.active, { pers1: "an", pers2: "t" }))],
                ["optativo no pasado 3pl", formulaSummary(buildFormulaProbe("optativo", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["perfecto sg", formulaSummary(buildFormulaProbe("perfecto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "" }))],
                ["perfecto pl", formulaSummary(buildFormulaProbe("perfecto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["pluscuamperfecto pl", formulaSummary(buildFormulaProbe("pluscuamperfecto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
                ["condicional perfecto pl", formulaSummary(buildFormulaProbe("condicional-perfecto", ctx.DERIVATION_MODE.active, { pers1: "", pers2: "t" }))],
            ],
            [
                ["presente sg", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+Ø-Ø#", tenseLabel: "indicativo presente", compatibilityLabel: "presente", morph: "Ø", mood: "indicative", andrewsTense: "present", connector: "Ø-Ø", num1: "", num2: "" }],
                ["presente pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+Ø-t#", tenseLabel: "indicativo presente", compatibilityLabel: "presente", morph: "Ø", mood: "indicative", andrewsTense: "present", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["presente habitual pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)ni+Ø-t#", tenseLabel: "indicativo presente habitual", compatibilityLabel: "presente-habitual", morph: "ni", mood: "indicative", andrewsTense: "customary-present", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["presente desiderativo pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)sneki+Ø-t#", tenseLabel: "desiderativo presente", compatibilityLabel: "presente-desiderativo", morph: "sneki", mood: "desiderative", andrewsTense: "present-desiderative", connector: "Ø-t", num1: "", num2: "t" }],
                ["imperfecto pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)ya+Ø-t#", tenseLabel: "indicativo imperfecto", compatibilityLabel: "imperfecto", morph: "ya", mood: "indicative", andrewsTense: "imperfect", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["futuro pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)s+k-et#", tenseLabel: "indicativo futuro", compatibilityLabel: "futuro", morph: "s", mood: "indicative", andrewsTense: "future", connector: "k-et", num1: "k", num2: "et", ...futurePreteritOptions }],
                ["preterito pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+k-et#", tenseLabel: "indicativo pretérito", compatibilityLabel: "preterito", morph: "Ø", mood: "indicative", andrewsTense: "preterit", connector: "k-et", num1: "k", num2: "et", ...futurePreteritOptions }],
                ["pasado remoto pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)ka+Ø-t#", tenseLabel: "indicativo pasado remoto", compatibilityLabel: "pasado-remoto", morph: "ka", mood: "indicative", andrewsTense: "distant-past", connector: "Ø-t", num1: "", num2: "t", ...mainIndicativeOptions }],
                ["condicional pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)skia+Ø-t#", tenseLabel: "condicional", compatibilityLabel: "condicional", morph: "skia", mood: "conditional", andrewsTense: "conditional", connector: "Ø-t", num1: "", num2: "t" }],
                ["optativo no pasado 1pl", { ...vncFormulaAuthorityBase, formula: "#ti-Ø(miki)Ø+k-an#", tenseLabel: "optativo no pasado", compatibilityLabel: "optativo", morph: "Ø", mood: "optative", andrewsTense: "nonpast", connector: "k-an", num1: "k", num2: "an", ...optativeOptions }],
                ["optativo no pasado 2pl", { ...vncFormulaAuthorityBase, formula: "#shi-Ø(miki)Ø+k-an#", tenseLabel: "optativo no pasado", compatibilityLabel: "optativo", morph: "Ø", mood: "optative", andrewsTense: "nonpast", connector: "k-an", num1: "k", num2: "an", ...optativeOptions }],
                ["optativo no pasado 3pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)Ø+k-an#", tenseLabel: "optativo no pasado", compatibilityLabel: "optativo", morph: "Ø", mood: "optative", andrewsTense: "nonpast", connector: "k-an", num1: "k", num2: "an", ...optativeOptions }],
                ["perfecto sg", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)tuk+Ø-Ø#", tenseLabel: "perfecto", compatibilityLabel: "perfecto", morph: "tuk", mood: "perfect", andrewsTense: "perfect", connector: "Ø-Ø", num1: "", num2: "" }],
                ["perfecto pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)tiwi+Ø-t#", tenseLabel: "perfecto", compatibilityLabel: "perfecto", morph: "tiwi", mood: "perfect", andrewsTense: "perfect", connector: "Ø-t", num1: "", num2: "t" }],
                ["pluscuamperfecto pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)tuya+Ø-t#", tenseLabel: "pluscuamperfecto", compatibilityLabel: "pluscuamperfecto", morph: "tuya", mood: "pluperfect", andrewsTense: "pluperfect", connector: "Ø-t", num1: "", num2: "t" }],
                ["condicional perfecto pl", { ...vncFormulaAuthorityBase, formula: "#Ø-Ø(miki)tuskia+Ø-t#", tenseLabel: "condicional perfecto", compatibilityLabel: "condicional-perfecto", morph: "tuskia", mood: "conditional-perfect", andrewsTense: "conditional-perfect", connector: "Ø-t", num1: "", num2: "t" }],
            ]
        );
        const optativeConnectorProbe = (subjectPrefix, numberConnector) => {
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "vnc",
                subject: {
                    prefix: subjectPrefix,
                    suffix: "",
                    numberConnector,
                },
                predicate: { stem: "miki" },
                tenseValue: "optativo",
                tenseLabel: "optativo",
            });
            return {
                inputConnector: numberConnector,
                formula: shell.formulaEcho,
                connector: shell.formulaSlots?.num1Num2?.displayConnector,
                num1: shell.formulaSlots?.num1Num2?.num1,
                num2: shell.formulaSlots?.num1Num2?.num2,
                tenseMorph: shell.formulaSlots?.tensePosition?.displayMorph,
                mood: shell.formulaSlots?.tensePosition?.mood,
            };
        };
        s.eq(
            "Andrews formula authority rewrites plural optative number probes to k-an",
            [
                optativeConnectorProbe("ti", "t"),
                optativeConnectorProbe("shi", "Ø-t"),
                optativeConnectorProbe("", "k-et"),
                optativeConnectorProbe("", "k-an"),
                optativeConnectorProbe("ti", "Ø-Ø"),
            ],
            [
                { inputConnector: "t", formula: "#ti-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "Ø-t", formula: "#shi-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "k-et", formula: "#Ø-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "k-an", formula: "#Ø-Ø(miki)Ø+k-an#", connector: "k-an", num1: "k", num2: "an", tenseMorph: "Ø", mood: "optative" },
                { inputConnector: "Ø-Ø", formula: "#ti-Ø(miki)Ø+Ø-Ø#", connector: "Ø-Ø", num1: "", num2: "", tenseMorph: "Ø", mood: "optative" },
            ]
        );
        const buildObjectFormulaProbe = (obj1, tronco = "miki", pers1 = "", pers2 = "t") => ctx.executeGenerateWordRequest({
            options: {
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: ctx.TENSE_MODE.verbo,
                    derivationMode: ctx.DERIVATION_MODE.active,
                    voiceMode: ctx.VOICE_MODE.active,
                    tiempo: "presente",
                    posicionesFormula: {
                        pers1,
                        obj1,
                        tronco,
                        pers2,
                        num2: pers2,
                        tiempo: "presente",
                    },
                },
            },
            posicionesFormula: {
                pers1,
                obj1,
                tronco,
                pers2,
                num2: pers2,
                tiempo: "presente",
            },
            entradaTronco: {
                tieneControlTronco: false,
                valorTronco: "",
            },
        });
        const objectFormulaSummary = (obj1) => {
            const result = buildObjectFormulaProbe(obj1);
            return {
                inputObject: obj1,
                formulaKind: result.nuclearClauseShell?.formula,
                predicatePositionStatus: result.nuclearClauseShell?.predicatePositionStatus,
                formula: result.nuclearClauseShell?.formulaEcho,
                obj1: result.nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix,
                reflexive: result.nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix,
                connector: result.nuclearClauseShell?.formulaSlots?.num1Num2?.displayConnector,
                valencePosition: result.vncValencyFrame?.lesson6ValencePosition || "",
                visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
            };
        };
        const reflexiveStemFormulaSummary = (tronco) => {
            const result = buildObjectFormulaProbe("mu", tronco);
            return {
                tronco,
                formula: result.nuclearClauseShell?.formulaEcho,
                reflexive: result.nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix,
                visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
            };
        };
        s.eq(
            "Lesson 6 formula follows realized ki/k object slot for piya",
            (() => {
                const firstPerson = buildObjectFormulaProbe("ki", "piya", "ni", "");
                const thirdPerson = buildObjectFormulaProbe("ki", "piya", "", "");
                const summarize = (result) => ({
                    surface: result.surface,
                    formula: result.nuclearClauseShell?.formulaEcho,
                    formulaObj: result.nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix,
                    visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    pathObject: (() => {
                        const pathBySlot = Object.fromEntries(
                            (result.cnvFormulaSurfacePath?.paths || [])
                                .map((entry) => [entry.formulaSlotKey, entry])
                        );
                        const framePathBySlot = Object.fromEntries(
                            (result.grammarFrame?.morphBoundaryFrame?.cnvFormulaSurfacePath?.paths || [])
                                .map((entry) => [entry.formulaSlotKey, entry])
                        );
                        return {
                            va1: {
                                formulaMorph: pathBySlot.va1?.formulaMorph || "",
                                expectedSurfaceMorph: pathBySlot.va1?.expectedSurfaceMorph || "",
                                surfaceValue: pathBySlot.va1?.surfaceValue || "",
                                status: pathBySlot.va1?.status || "",
                                grammarFrameFormulaMorph: framePathBySlot.va1?.formulaMorph || "",
                                grammarFrameSurfaceValue: framePathBySlot.va1?.surfaceValue || "",
                            },
                            va2: {
                                formulaMorph: pathBySlot.va2?.formulaMorph || "",
                                expectedSurfaceMorph: pathBySlot.va2?.expectedSurfaceMorph || "",
                                surfaceValue: pathBySlot.va2?.surfaceValue || "",
                                status: pathBySlot.va2?.status || "",
                                grammarFrameFormulaMorph: framePathBySlot.va2?.formulaMorph || "",
                                grammarFrameSurfaceValue: framePathBySlot.va2?.surfaceValue || "",
                            },
                        };
                    })(),
                    frames: (result.grammarFrame?.orthographyFrame?.soundSpellingFrames || [])
                        .filter((frame) => frame.ruleId === "obj1-ki-after-ni-ti-k")
                        .map((frame) => ({
                            ruleId: frame.ruleId,
                            slot: frame.grammarSlot,
                            source: frame.sourceSurface,
                            target: frame.target,
                            sourceSegment: frame.sourceSegmentValue,
                            targetSegment: frame.targetSegmentValue,
                        })),
                });
                return [summarize(firstPerson), summarize(thirdPerson)];
            })(),
            [
                {
                    surface: "nikpiya",
                    formula: "#ni-Ø+k-0(piya)Ø+Ø-Ø#",
                    formulaObj: "k-0",
                    visibleFormulaObject: "k-0",
                    pathObject: {
                        va1: {
                            formulaMorph: "k-0",
                            expectedSurfaceMorph: "k",
                            surfaceValue: "k-0",
                            status: "matched",
                            grammarFrameFormulaMorph: "k-0",
                            grammarFrameSurfaceValue: "k-0",
                        },
                        va2: {
                            formulaMorph: "0",
                            expectedSurfaceMorph: "",
                            surfaceValue: "",
                            status: "matched-zero",
                            grammarFrameFormulaMorph: "0",
                            grammarFrameSurfaceValue: "",
                        },
                    },
                    frames: [{
                        ruleId: "obj1-ki-after-ni-ti-k",
                        slot: "obj1",
                        source: "ki",
                        target: "k",
                        sourceSegment: "ki",
                        targetSegment: "k",
                    }],
                },
                {
                    surface: "kipiya",
                    formula: "#Ø-Ø+ki-0(piya)Ø+Ø-Ø#",
                    formulaObj: "ki-0",
                    visibleFormulaObject: "ki-0",
                    pathObject: {
                        va1: {
                            formulaMorph: "ki-0",
                            expectedSurfaceMorph: "ki",
                            surfaceValue: "ki-0",
                            status: "matched",
                            grammarFrameFormulaMorph: "ki-0",
                            grammarFrameSurfaceValue: "ki-0",
                        },
                        va2: {
                            formulaMorph: "0",
                            expectedSurfaceMorph: "",
                            surfaceValue: "",
                            status: "matched-zero",
                            grammarFrameFormulaMorph: "0",
                            grammarFrameSurfaceValue: "",
                        },
                    },
                    frames: [],
                },
            ]
        );
        s.eq(
            "Lesson 6 formula authority separates direct Nawat dyads monadic objects and reflexive mu",
            [
                objectFormulaSummary("nech"),
                objectFormulaSummary("tech"),
                objectFormulaSummary("metz"),
                objectFormulaSummary("metzin"),
                objectFormulaSummary("ki"),
                objectFormulaSummary("k"),
                objectFormulaSummary("kin"),
                objectFormulaSummary("ne"),
                objectFormulaSummary("ta"),
                objectFormulaSummary("te"),
                objectFormulaSummary("mu"),
            ],
            [
                {
                    inputObject: "nech",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+n-ech(miki)Ø+Ø-t#",
                    obj1: "n-ech",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "n-ech",
                },
                {
                    inputObject: "tech",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+t-ech(miki)Ø+Ø-t#",
                    obj1: "t-ech",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "t-ech",
                },
                {
                    inputObject: "metz",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+m-etz(miki)Ø+Ø-t#",
                    obj1: "m-etz",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "m-etz",
                },
                {
                    inputObject: "metzin",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+m-etz-in(miki)Ø+Ø-t#",
                    obj1: "m-etz-in",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "m-etz-in",
                },
                {
                    inputObject: "ki",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+ki-0(miki)Ø+Ø-t#",
                    obj1: "ki-0",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "ki-0",
                },
                {
                    inputObject: "k",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+k-0(miki)Ø+Ø-t#",
                    obj1: "k-0",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "k-0",
                },
                {
                    inputObject: "kin",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+k-in(miki)Ø+Ø-t#",
                    obj1: "k-in",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "k-in",
                },
                {
                    inputObject: "ne",
                    formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    predicatePositionStatus: "monadic",
                    formula: "#Ø-Ø+ne(miki)Ø+Ø-t#",
                    obj1: "ne",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va",
                    visibleFormulaObject: "ne",
                },
                {
                    inputObject: "ta",
                    formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    predicatePositionStatus: "monadic",
                    formula: "#Ø-Ø+ta(miki)Ø+Ø-t#",
                    obj1: "ta",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va",
                    visibleFormulaObject: "ta",
                },
                {
                    inputObject: "te",
                    formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                    predicatePositionStatus: "monadic",
                    formula: "#Ø-Ø+te(miki)Ø+Ø-t#",
                    obj1: "te",
                    reflexive: "Ø",
                    connector: "Ø-t",
                    valencePosition: "va",
                    visibleFormulaObject: "te",
                },
                {
                    inputObject: "mu",
                    formulaKind: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                    predicatePositionStatus: "dyadic",
                    formula: "#Ø-Ø+m-u(miki)Ø+Ø-t#",
                    obj1: "Ø",
                    reflexive: "m-u",
                    connector: "Ø-t",
                    valencePosition: "va1-va2",
                    visibleFormulaObject: "m-u",
                },
            ]
        );
        s.eq(
            "CNV formula-surface path assigns 2pl object in to val1 number not val2",
            (() => {
                const result = buildObjectFormulaProbe("metzin");
                const pathBySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    formula: result.nuclearClauseShell?.formulaEcho,
                    visibleObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    formulaSlotFunctional: result.nuclearClauseShell?.formulaSlots?.obj1?.functionalSubslots || null,
                    cnvPath: {
                        va1: {
                            morph: pathBySlot.va1?.formulaMorph || "",
                            surface: pathBySlot.va1?.surfaceValue || "",
                            features: pathBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va1?.visibleLinearMorph || "",
                            status: pathBySlot.va1?.status || "",
                        },
                        va2: {
                            morph: pathBySlot.va2?.formulaMorph || "",
                            surface: pathBySlot.va2?.surfaceValue || "",
                            features: pathBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va2?.visibleLinearMorph || "",
                            status: pathBySlot.va2?.status || "",
                        },
                    },
                    uiPath: {
                        va1: {
                            value: bridgeBySlot.va1?.value || "",
                            features: bridgeBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va1?.visibleLinearMorph || "",
                        },
                        va2: {
                            value: bridgeBySlot.va2?.value || "",
                            features: bridgeBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va2?.visibleLinearMorph || "",
                        },
                    },
                };
            })(),
            {
                formula: "#Ø-Ø+m-etz-in(miki)Ø+Ø-t#",
                visibleObject: "m-etz-in",
                formulaSlotFunctional: {
                    va1: "m-in",
                    va2: "etz",
                    val1Features: { person: "m", number: "in" },
                    val2Features: { objective: "etz" },
                    visibleLinearMorph: "m-etz-in",
                },
                cnvPath: {
                    va1: {
                        morph: "m-in",
                        surface: "m-in",
                        features: { person: "m", number: "in" },
                        visibleLinearMorph: "m-etz-in",
                        status: "matched",
                    },
                    va2: {
                        morph: "etz",
                        surface: "etz",
                        features: { objective: "etz" },
                        visibleLinearMorph: "m-etz-in",
                        status: "matched",
                    },
                },
                uiPath: {
                    va1: {
                        value: "m-in",
                        features: { person: "m", number: "in" },
                        visibleLinearMorph: "m-etz-in",
                    },
                    va2: {
                        value: "etz",
                        features: { objective: "etz" },
                        visibleLinearMorph: "m-etz-in",
                    },
                },
            }
        );
        s.eq(
            "CNV formula-surface path assigns 3pl object in to val2 number",
            (() => {
                const result = buildObjectFormulaProbe("kin");
                const pathBySlot = Object.fromEntries(
                    (result.cnvFormulaSurfacePath?.paths || [])
                        .map((entry) => [entry.formulaSlotKey, entry])
                );
                const bridgeBySlot = Object.fromEntries(
                    (result.slotNameBridge?.slots || [])
                        .map((entry) => [entry.surfaceSlot, entry])
                );
                return {
                    formula: result.nuclearClauseShell?.formulaEcho,
                    visibleObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                    formulaSlotFunctional: result.nuclearClauseShell?.formulaSlots?.obj1?.functionalSubslots || null,
                    cnvPath: {
                        va1: {
                            morph: pathBySlot.va1?.formulaMorph || "",
                            surface: pathBySlot.va1?.surfaceValue || "",
                            features: pathBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va1?.visibleLinearMorph || "",
                            status: pathBySlot.va1?.status || "",
                        },
                        va2: {
                            morph: pathBySlot.va2?.formulaMorph || "",
                            surface: pathBySlot.va2?.surfaceValue || "",
                            features: pathBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: pathBySlot.va2?.visibleLinearMorph || "",
                            status: pathBySlot.va2?.status || "",
                        },
                    },
                    uiPath: {
                        va1: {
                            value: bridgeBySlot.va1?.value || "",
                            features: bridgeBySlot.va1?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va1?.visibleLinearMorph || "",
                        },
                        va2: {
                            value: bridgeBySlot.va2?.value || "",
                            features: bridgeBySlot.va2?.formulaFeatures || null,
                            visibleLinearMorph: bridgeBySlot.va2?.visibleLinearMorph || "",
                        },
                    },
                };
            })(),
            {
                formula: "#Ø-Ø+k-in(miki)Ø+Ø-t#",
                visibleObject: "k-in",
                formulaSlotFunctional: {
                    va1: "k-0",
                    va2: "in",
                    val1Features: { person: "k", objective: "0" },
                    val2Features: { number: "in" },
                    visibleLinearMorph: "k-in",
                },
                cnvPath: {
                    va1: {
                        morph: "k-0",
                        surface: "k-0",
                        features: { person: "k", objective: "0" },
                        visibleLinearMorph: "k-in",
                        status: "matched",
                    },
                    va2: {
                        morph: "in",
                        surface: "in",
                        features: { number: "in" },
                        visibleLinearMorph: "k-in",
                        status: "matched",
                    },
                },
                uiPath: {
                    va1: {
                        value: "k-0",
                        features: { person: "k", objective: "0" },
                        visibleLinearMorph: "k-in",
                    },
                    va2: {
                        value: "in",
                        features: { number: "in" },
                        visibleLinearMorph: "k-in",
                    },
                },
            }
        );
        s.eq(
            "Lesson 6 reflexive formula uses m-u or m-0 conditionally by stem",
            [
                reflexiveStemFormulaSummary("ajsi"),
                reflexiveStemFormulaSummary("altia"),
                reflexiveStemFormulaSummary("ilwia"),
                reflexiveStemFormulaSummary("awiltia"),
            ],
            [
                {
                    tronco: "ajsi",
                    formula: "#Ø-Ø+m-u(ajsi)Ø+Ø-t#",
                    reflexive: "m-u",
                    visibleFormulaObject: "m-u",
                },
                {
                    tronco: "altia",
                    formula: "#Ø-Ø+m-0(altia)Ø+Ø-t#",
                    reflexive: "m-0",
                    visibleFormulaObject: "m-0",
                },
                {
                    tronco: "ilwia",
                    formula: "#Ø-Ø+m-u(ilwia)Ø+Ø-t#",
                    reflexive: "m-u",
                    visibleFormulaObject: "m-u",
                },
                {
                    tronco: "awiltia",
                    formula: "#Ø-Ø+m-0(awiltia)Ø+Ø-t#",
                    reflexive: "m-0",
                    visibleFormulaObject: "m-0",
                },
            ]
        );
        const reflexiveFormulaSurfaceCouplingSummary = (tronco) => {
            const result = buildObjectFormulaProbe("mu", tronco);
            const frames = result.grammarFrame?.orthographyFrame?.soundSpellingFrames || [];
            return {
                tronco,
                surface: result.result,
                formula: result.nuclearClauseShell?.formulaEcho,
                reflexive: result.nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix,
                visibleFormulaObject: result.vncValencyFrame?.lesson6VisibleFormulaObjectPrefix || "",
                muAllomorphyFrames: frames
                    .filter((frame) => frame.ruleId === "obj1-mu-before-vowel-m")
                    .map((frame) => ({
                        ruleId: frame.ruleId,
                        source: frame.sourceSurface,
                        target: frame.target,
                        slot: frame.grammarSlot,
                        sourceSegment: frame.sourceSegmentValue,
                        targetSegment: frame.targetSegmentValue,
                    })),
            };
        };
        s.eq(
            "Lesson 6 couples reflexive formula slots to the same mu allomorphy that renders output",
            [
                reflexiveFormulaSurfaceCouplingSummary("ajsi"),
                reflexiveFormulaSurfaceCouplingSummary("altia"),
            ],
            [
                {
                    tronco: "ajsi",
                    surface: "muajsit",
                    formula: "#Ø-Ø+m-u(ajsi)Ø+Ø-t#",
                    reflexive: "m-u",
                    visibleFormulaObject: "m-u",
                    muAllomorphyFrames: [],
                },
                {
                    tronco: "altia",
                    surface: "maltiat",
                    formula: "#Ø-Ø+m-0(altia)Ø+Ø-t#",
                    reflexive: "m-0",
                    visibleFormulaObject: "m-0",
                    muAllomorphyFrames: [{
                        ruleId: "obj1-mu-before-vowel-m",
                        source: "mu",
                        target: "m",
                        slot: "obj1",
                        sourceSegment: "mu",
                        targetSegment: "m",
                    }],
                },
            ]
        );
        const shuntlineNeProbe = buildObjectFormulaProbe("ne");
        const shuntlineNeShell = shuntlineNeProbe.nuclearClauseShell
            || shuntlineNeProbe.grammarFrame?.nuclearClauseFrame
            || {};
        s.eq(
            "Lesson 6 generates shuntline ne surface while preserving monadic formula diagnostics",
            {
                blocked: Boolean(shuntlineNeProbe.error),
                result: shuntlineNeProbe.result,
                surface: shuntlineNeProbe.surface,
                formulaKind: shuntlineNeShell.formula,
                predicatePositionStatus: shuntlineNeShell.predicatePositionStatus,
                formula: shuntlineNeShell.formulaEcho,
                obj1: shuntlineNeShell.formulaSlots?.obj1?.displayPrefix,
                reflexive: shuntlineNeShell.formulaSlots?.reflexivo?.displayPrefix,
                connector: shuntlineNeShell.formulaSlots?.num1Num2?.displayConnector,
                generationAllowed: shuntlineNeProbe.grammarFrame?.routeContract?.generationAllowed,
                valencePosition: shuntlineNeProbe.vncValencyFrame?.lesson6ValencePosition || "",
                diagnosticCount: shuntlineNeProbe.diagnostics?.length || 0,
            },
            {
                blocked: false,
                result: "nemikit",
                surface: "nemikit",
                formulaKind: "#pers1-pers2+va(STEM)tns+num1-num2#",
                predicatePositionStatus: "monadic",
                formula: "#Ø-Ø+ne(miki)Ø+Ø-t#",
                obj1: "ne",
                reflexive: "Ø",
                connector: "Ø-t",
                generationAllowed: true,
                valencePosition: "va",
                diagnosticCount: 0,
            }
        );
    }
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
            shellFormulaAbbreviation: executeEngineResult.grammarFrame.nuclearClauseFrame.formulaAbbreviation,
            shellFormulaLabel: executeEngineResult.grammarFrame.nuclearClauseFrame.formulaLabel,
            routeFamily: executeEngineResult.grammarFrame.routeContract.routeFamily,
            tiempo: executeEngineResult.grammarFrame.inflectionFrame.tiempo,
            pers1Prefix: executeEngineResult.grammarFrame.participantFrame.pers1Pers2.prefix,
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
            shellFormulaAbbreviation: "CNV",
            shellFormulaLabel: "Fórmula CNV",
            routeFamily: "vnc",
            tiempo: "presente",
            pers1Prefix: "",
        }
    );
    const executeSurfaceAliasResult = ctx.executeNuclearClauseSurfaceRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "",
            tronco: "(nemi)",
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
    const surfaceEngineTargetContract = executeEngineResult.grammarFrame.routeContract.targetContract.surfaceEngineContract;
    s.eq(
        "nuclear clause surface contract separates output, source, slots, stem, affix, derivation, inflection, and wordhood",
        {
            aliasMatchesResult: executeSurfaceAliasResult.result === executeEngineResult.result,
            aliasMatchesSurface: executeSurfaceAliasResult.surface === executeEngineResult.surface,
            invariantIds: ctx.getNuclearClauseSurfaceEngineInvariants().map((entry) => entry.id),
            topContract: executeEngineResult.surfaceEngineContract,
            frameContract: surfaceEngineTargetContract,
            resultSurfaceIsSource: executeEngineResult.grammarFrame.resultFrame.surfaceOutputIsGrammarSource,
            resultNuclearClauseIsWord: executeEngineResult.grammarFrame.resultFrame.nuclearClauseIsWord,
            slotIsSpelling: executeEngineResult.grammarFrame.morphBoundaryFrame.formulaSlotIsLiteralSpelling,
            stemIsOutput: executeEngineResult.grammarFrame.stemFrame.stemIsWholeOutput,
            affixIsStem: executeEngineResult.grammarFrame.stemFrame.affixIsStem,
            derivationScope: executeEngineResult.grammarFrame.stemFrame.derivationScope,
            inflectionScope: executeEngineResult.grammarFrame.inflectionFrame.inflectionScope,
            inflectionInsideStem: executeEngineResult.grammarFrame.inflectionFrame.inflectionInsideStem,
        },
        {
            aliasMatchesResult: true,
            aliasMatchesSurface: true,
            invariantIds: [
                "surface-output-not-grammar-source",
                "formula-slot-not-literal-spelling",
                "stem-not-whole-output",
                "affix-not-stem",
                "derivation-inside-stem",
                "inflection-outside-stem",
                "vnc-nnc-not-word",
            ],
            topContract: surfaceEngineTargetContract,
            frameContract: {
                canonicalGenerateFunction: "generateNuclearClauseSurface",
                canonicalExecuteFunction: "executeNuclearClauseSurfaceRequest",
                compatibilityGenerateFunction: "generateWord",
                compatibilityExecuteFunction: "executeGenerateWordRequest",
                generatedUnit: "nuclear-clause-surface",
                routeFamily: "vnc",
                routeStage: "execute",
                compatibilityFunction: "executeGenerateWordRequest",
                invariants: ctx.getNuclearClauseSurfaceEngineInvariants(),
                surfaceOutputIsGrammarSource: false,
                formulaSlotIsLiteralSpelling: false,
                stemIsWholeOutput: false,
                affixIsStem: false,
                derivationScope: "inside-stem",
                inflectionScope: "outside-stem",
                nuclearClauseIsWord: false,
            },
            resultSurfaceIsSource: false,
            resultNuclearClauseIsWord: false,
            slotIsSpelling: false,
            stemIsOutput: false,
            affixIsStem: false,
            derivationScope: "inside-stem",
            inflectionScope: "outside-stem",
            inflectionInsideStem: false,
        }
    );
    const inheritedSurfaceOnlyRouteFrame = {
        kind: "inherited-surface-only-route-frame",
        objectSlotOwnership: {
            kind: "inherited-surface-only-object-slot-ownership-frame",
            matrixValenceFrameFixed: true,
        },
        routeFrameLicensesObjectSlotOwnership: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
    };
    const priorResultFrame = ctx.buildGrammarFrame({
        routeContract: ctx.buildGrammarRouteContractFrame({
            routeFamily: "inherited-source-route",
            routeStage: "execute",
            sourceContract: {
                sourceRouteFrame: inheritedSurfaceOnlyRouteFrame,
            },
            generationAllowed: true,
        }),
        resultFrame: ctx.buildGrammarResultFrame({
            ok: true,
            surface: "frame-engine-surface",
            surfaceForms: ["frame-engine-a", "frame-engine-b"],
        }),
    });
    const rebuiltGenerateFrame = ctx.buildNuclearClauseSurfaceGrammarFrame({
        result: {
            result: "stale-engine-result",
            frames: priorResultFrame,
            surface: "top-engine-surface",
            surfaceForms: ["stale-engine-a / stale-engine-b"],
        },
        renderVerb: "—",
        verb: "stale-source",
        resolvedTenseMode: "verbo",
        tense: "presente",
        routeFamily: "vnc",
        unitKind: "verbal-nuclear-clause",
    });
    s.eq(
        "generate word grammar frame reads framed result surface forms before stale no-output text",
        {
            surface: rebuiltGenerateFrame.resultFrame.surface,
            surfaceForms: rebuiltGenerateFrame.resultFrame.surfaceForms,
            ok: rebuiltGenerateFrame.resultFrame.ok,
            sourceInput: rebuiltGenerateFrame.resultFrame.sourceInput,
            stem: rebuiltGenerateFrame.stemFrame.stem,
            routeFrameKind: rebuiltGenerateFrame.routeContract.sourceContract.sourceRouteFrame.kind,
            participantRouteFrameKind: rebuiltGenerateFrame.participantFrame.sourceRouteFrame.kind,
            participantOwnershipKind: rebuiltGenerateFrame.participantFrame.objectSlotOwnership.kind,
            participantMatrixValenceFrameFixed: rebuiltGenerateFrame.participantFrame.objectSlotOwnership.matrixValenceFrameFixed === true,
        },
        {
            surface: "frame-engine-a",
            surfaceForms: ["frame-engine-a", "frame-engine-b", "frame-engine-surface"],
            ok: true,
            sourceInput: "frame-engine-a",
            stem: "frame-engine-a",
            routeFrameKind: "inherited-surface-only-route-frame",
            participantRouteFrameKind: "inherited-surface-only-route-frame",
            participantOwnershipKind: "inherited-surface-only-object-slot-ownership-frame",
            participantMatrixValenceFrameFixed: true,
        }
    );
    s.eq(
        "generate runtime blocked wrapper preserves framed surface forms before stale stale text",
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
        "VNC allomorphy primary surface reads framed result before stale no-output text",
        typeof ctx.getVncAllomorphyContractSurface === "function"
            ? ctx.getVncAllomorphyContractSurface({
                result: "stale-allomorphy-result",
                surface: "top-allomorphy-surface",
                outputSurface: "stale-output-surface",
                selectedOutputSurface: "stale-selected-output",
                nawatSurfaceSuffix: "stale-suffix",
                forms: ["stale-stale-form"],
                frames: priorResultFrame,
            })
            : "vnc-allomorphy-helper-not-loaded",
        "frame-engine-a"
    );
    s.eq(
        "VNC allomorphy source forms prefer framed result before stale stale forms",
        typeof ctx.getVncAllomorphySourceSurfaceForms === "function"
            ? ctx.getVncAllomorphySourceSurfaceForms({
                result: "stale-allomorphy-result",
                surface: "top-allomorphy-surface",
                outputSurface: "stale-output-surface",
                selectedOutputSurface: "stale-selected-output",
                nawatSurfaceSuffix: "stale-suffix",
                forms: ["stale-stale-form"],
                frames: priorResultFrame,
            })
            : ["vnc-allomorphy-source-helper-not-loaded"],
        ["frame-engine-a", "frame-engine-b", "frame-engine-surface"]
    );
    s.eq(
        "VNC allomorphy source forms keep stale forms for metadata-only frames",
        typeof ctx.getVncAllomorphySourceSurfaceForms === "function"
            ? ctx.getVncAllomorphySourceSurfaceForms({
                forms: ["stale-allomorphy-a / stale-allomorphy-b"],
                frames: ctx.buildGrammarFrame({
                    routeContract: ctx.buildGrammarRouteContractFrame({
                        routeFamily: "vnc-allomorphy",
                        routeStage: "metadata-only",
                        generationAllowed: true,
                    }),
                }),
            })
            : ["vnc-allomorphy-source-helper-not-loaded"],
        ["stale-allomorphy-a", "stale-allomorphy-b"]
    );
    const transitiveFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "-maka",
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
        "VNC valency frame explains transitive subject and object slots without changing output",
        {
            valency: transitiveFrameResult.vncValencyFrame?.valency,
            subjectPrefix: transitiveFrameResult.vncValencyFrame?.pers1Pers2?.prefix,
            objectPrefix: transitiveFrameResult.vncValencyFrame?.obj1?.prefix,
            baseObjectPrefix: transitiveFrameResult.vncValencyFrame?.obj1?.basePrefix,
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
                derivationMode: ctx.DERIVATION_MODE.nonactive,
                voiceMode: ctx.VOICE_MODE.passive,
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ki",
            tronco: "-maka",
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
        "derived voice frame explains passive/impersonal valency without changing output",
        {
            kind: passiveFrameResult.derivedVoiceFrame?.kind,
            voiceLabel: passiveFrameResult.derivedVoiceFrame?.voice?.label,
            sourceValency: passiveFrameResult.derivedVoiceFrame?.valency?.sourceValency,
            targetValency: passiveFrameResult.derivedVoiceFrame?.valency?.targetValency,
            baseObj1: passiveFrameResult.derivedVoiceFrame?.valency?.baseObj1,
            selectedObj1: passiveFrameResult.derivedVoiceFrame?.valency?.selectedObj1,
            obj1ClearedByVoice: passiveFrameResult.derivedVoiceFrame?.valency?.obj1ClearedByVoice,
            changesSurfaceForms: passiveFrameResult.derivedVoiceFrame?.boundaries?.changesSurfaceForms,
            forms: passiveFrameResult.surfaceForms,
        },
        {
            kind: "derived-voice-frame",
            voiceLabel: "pasivo/impersonal",
            sourceValency: 2,
            targetValency: 1,
            baseObj1: "ki",
            selectedObj1: "",
            obj1ClearedByVoice: true,
            changesSurfaceForms: false,
            forms: ["makalu", "makilu"],
        }
    );
    const causativeFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                derivationType: ctx.DERIVATION_TYPE.causative,
                parsedVerb: ctx.parseVerbInput("(nemi)"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "(nemi)",
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
    const generateCausativeThirdSingular = (verb) => ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                derivationType: ctx.DERIVATION_TYPE.causative,
                parsedVerb: ctx.parseVerbInput(verb),
            },
        },
        posicionesFormula: {
            pers1: "",
            obj1: "ki",
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
    const panuCausativeFrameResult = generateCausativeThirdSingular("panu");
    const tejkuCausativeFrameResult = generateCausativeThirdSingular("tejku");
    s.eq(
        "Nawat -u causative exceptions keep attested panu and tejku outputs",
        {
            panuForms: panuCausativeFrameResult.surfaceForms,
            panuSelectedStem: panuCausativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
            tejkuForms: tejkuCausativeFrameResult.surfaceForms,
            tejkuSelectedStem: tejkuCausativeFrameResult.forwardDerivationFrame?.stem?.selectedStem,
        },
        {
            panuForms: ["kipanawia", "kipanultia"],
            panuSelectedStem: "panawia",
            tejkuForms: ["kitejkawia", "kitejkultia"],
            tejkuSelectedStem: "tejkawia",
        }
    );
    s.eq(
        "Andrews 24.7 stock-formative selection remains explicit for destockal wi reverse lookup",
        {
            petz: ctx.getDestockalWiReverseBaseSuffixes("petz"),
            patz: ctx.getDestockalWiReverseBaseSuffixes("patz"),
            pish: ctx.getDestockalWiReverseBaseSuffixes("pish"),
            pul: ctx.getDestockalWiReverseBaseSuffixes("pul"),
            unknown: ctx.getDestockalWiReverseBaseSuffixes(""),
        },
        {
            petz: ["iwi"],
            patz: ["iwi"],
            pish: ["awi"],
            pul: ["iwi"],
            unknown: ["iwi", "awi"],
        }
    );
    const applicativeFrameResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                derivationType: ctx.DERIVATION_TYPE.applicative,
                parsedVerb: ctx.parseVerbInput("-maka"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "ki",
            tronco: "-maka",
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
                parsedVerb: ctx.parseVerbInput("(shuchi)-(kwi)"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "(shuchi)-(kwi)",
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
    const compoundObjectRouteResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(a)+ta-(kwi)"),
            },
        },
        posicionesFormula: {
            pers1: "ni",
            obj1: "",
            tronco: "(a)+ta-(kwi)",
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
    const unresolvedGeneratedCompoundRouteFrame = ctx.buildGeneratedCompoundRouteFrameMetadata({
        compoundAst: {
            kind: "compound",
            source: { rawInput: "(shuchi)-(unknown)" },
            matrix: { stem: "unknown", ruleBase: "unknown" },
            valency: {},
        },
        embeds: [{ value: "shuchi", role: "outer-lexical", source: "test" }],
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
            routeFrameKind: compoundFrameResult.compoundFrame?.compoundRouteFrame?.kind || "",
            routeFrameShape: compoundFrameResult.compoundFrame?.compoundRouteFrame?.finalFormulaShape || "",
            routeFrameEmbedRole: compoundFrameResult.compoundFrame?.compoundRouteFrame?.embedRole || "",
            routeFrameMatrixValence: compoundFrameResult.compoundFrame?.compoundRouteFrame?.matrixValence || "",
            routeFrameSourceSurface: compoundFrameResult.compoundFrame?.compoundRouteFrame?.sourcePrincipalVnc?.surface || "",
            routeFrameRouteLicensesRole: compoundFrameResult.compoundFrame?.compoundRouteFrame?.routeFrameLicensesEmbedRole === true,
            routeFrameShapeDoesNotLicenseRole: compoundFrameResult.compoundFrame?.compoundRouteFrame?.finalFormulaShapeDoesNotLicenseRole === true,
            routeFrameOwnershipKind: compoundFrameResult.compoundFrame?.compoundRouteFrame?.objectSlotOwnership?.kind || "",
            routeFrameMatrixValenceFrameFixed: compoundFrameResult.compoundFrame?.compoundRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
            routeFrameLicensesObjectSlots: compoundFrameResult.compoundFrame?.compoundRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
            routeFrameShapeDoesNotLicenseObjectSlots: compoundFrameResult.compoundFrame?.compoundRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
            routeFrameFunctionUseDoesNotLicenseObjectSlots: compoundFrameResult.compoundFrame?.compoundRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
            grammarSourceRouteFrameKind: compoundFrameResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.kind || "",
            grammarStemRouteFrameKind: compoundFrameResult.grammarFrame?.stemFrame?.sourceRouteFrame?.kind || "",
            grammarMorphRouteFrameKind: compoundFrameResult.grammarFrame?.morphBoundaryFrame?.sourceRouteFrame?.kind || "",
            grammarParticipantRouteFrameKind: compoundFrameResult.grammarFrame?.participantFrame?.sourceRouteFrame?.kind || "",
            grammarParticipantOwnershipKind: compoundFrameResult.grammarFrame?.participantFrame?.objectSlotOwnership?.kind || "",
            grammarParticipantMatrixValenceFrameFixed: compoundFrameResult.grammarFrame?.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
            grammarParticipantFunctionUseDoesNotLicenseObjectSlots: compoundFrameResult.grammarFrame?.participantFrame?.functionUseDoesNotLicenseObjectSlots === true,
            changesSurfaceForms: compoundFrameResult.compoundFrame?.boundaries?.changesSurfaceForms,
            forms: compoundFrameResult.surfaceForms,
            objectRoute: {
                forms: compoundObjectRouteResult.surfaceForms,
                routeFrameKind: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.kind || "",
                routeFrameShape: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.finalFormulaShape || "",
                objectSlotPrefixes: (
                    compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots || []
                ).map((slot) => [slot.slotId, slot.prefix, slot.owner]),
                ownershipKind: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.kind || "",
                sourceExternalObjectSlotsOwnedBy: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.sourceExternalObjectSlotsOwnedBy || "",
                remainingExternalObjectSlotsOwnedBy: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.remainingExternalObjectSlotsOwnedBy || "",
                matrixValenceFrameFixed: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
                functionUseOwnsObjectSlots: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.functionUseOwnsObjectSlots === true,
                finalFormulaShapeOwnsObjectSlots: compoundObjectRouteResult.grammarFrame?.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.finalFormulaShapeOwnsObjectSlots === true,
                participantRouteFrameKind: compoundObjectRouteResult.grammarFrame?.participantFrame?.sourceRouteFrame?.kind || "",
                participantOwnershipKind: compoundObjectRouteResult.grammarFrame?.participantFrame?.objectSlotOwnership?.kind || "",
                participantMatrixValenceFrameFixed: compoundObjectRouteResult.grammarFrame?.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
            },
            unresolvedRouteFrame: {
                matrixValence: unresolvedGeneratedCompoundRouteFrame?.matrixValence || "",
                matrixValenceFrameFixed: unresolvedGeneratedCompoundRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true,
                routeFrameOwnsObjectSlotLicensing: unresolvedGeneratedCompoundRouteFrame?.objectSlotOwnership?.routeFrameOwnsObjectSlotLicensing === true,
                matrixValenceFrameMustBeFixed: unresolvedGeneratedCompoundRouteFrame?.objectSlotOwnership?.matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership === true,
                routeLicensesObjectSlotOwnership: unresolvedGeneratedCompoundRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
                finalShapeDoesNotLicenseObjectSlots: unresolvedGeneratedCompoundRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
                functionUseDoesNotLicenseObjectSlots: unresolvedGeneratedCompoundRouteFrame?.functionUseDoesNotLicenseObjectSlots === true,
            },
        },
        {
            kind: "compound-frame",
            lessonRange: "28,30",
            matrixStem: "kwi",
            embedRoles: ["outer-lexical"],
            embedValues: ["shuchi"],
            rawInput: "(shuchi)-(kwi)",
            routeFrameKind: "generated-compound-route-frame",
            routeFrameShape: "compound-verbstem-adjacent-embed-before-matrix",
            routeFrameEmbedRole: "outer-lexical",
            routeFrameMatrixValence: "transitive",
            routeFrameSourceSurface: "(shuchi)-(kwi)",
            routeFrameRouteLicensesRole: true,
            routeFrameShapeDoesNotLicenseRole: true,
            routeFrameOwnershipKind: "generated-compound-object-slot-ownership-frame",
            routeFrameMatrixValenceFrameFixed: true,
            routeFrameLicensesObjectSlots: true,
            routeFrameShapeDoesNotLicenseObjectSlots: true,
            routeFrameFunctionUseDoesNotLicenseObjectSlots: true,
            grammarSourceRouteFrameKind: "generated-compound-route-frame",
            grammarStemRouteFrameKind: "generated-compound-route-frame",
            grammarMorphRouteFrameKind: "generated-compound-route-frame",
            grammarParticipantRouteFrameKind: "generated-compound-route-frame",
            grammarParticipantOwnershipKind: "generated-compound-object-slot-ownership-frame",
            grammarParticipantMatrixValenceFrameFixed: true,
            grammarParticipantFunctionUseDoesNotLicenseObjectSlots: true,
            changesSurfaceForms: false,
            forms: ["nishuchikwi"],
            objectRoute: {
                forms: ["niatakwi"],
                routeFrameKind: "generated-compound-route-frame",
                routeFrameShape: "compound-verbstem-marked-boundary",
                objectSlotPrefixes: [["obj1", "ta", "compound-valency"]],
                ownershipKind: "generated-compound-object-slot-ownership-frame",
                sourceExternalObjectSlotsOwnedBy: "source-compound-route-frame",
                remainingExternalObjectSlotsOwnedBy: "matrix-route-frame",
                matrixValenceFrameFixed: true,
                functionUseOwnsObjectSlots: false,
                finalFormulaShapeOwnsObjectSlots: false,
                participantRouteFrameKind: "generated-compound-route-frame",
                participantOwnershipKind: "generated-compound-object-slot-ownership-frame",
                participantMatrixValenceFrameFixed: true,
            },
            unresolvedRouteFrame: {
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
    const sentenceLayerResult = ctx.executeGenerateWordRequest({
        options: {
            silent: true,
            override: {
                parsedVerb: ctx.parseVerbInput("(nemi)"),
                sentenceLayer: {
                    enabled: true,
                    polarity: "negative",
                    questionType: "yes-no",
                    moodScope: "command",
                },
            },
        },
        posicionesFormula: {
            pers1: "ti",
            obj1: "",
            tronco: "(nemi)",
            pers2: "",
            num2: "",
            poseedor: "",

            tiempo: "optativo",

            },
        entradaTronco: {
            tieneControlTronco: false,
            valorTronco: "",
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
