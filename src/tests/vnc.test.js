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
            plannedArrowIds: ["lesson-5-intransitive-vnc-audit"],
            firedArrowIds: [["lesson-5-intransitive-vnc-audit", "hit"]],
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
            tenseSlot: "tiempo",
            tenseIsNotTime: true,
        }
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
            categories: lesson6Pursuit.subsectionInventory.map((entry) => entry.category),
            closestPass: lesson6Pursuit.closestPass,
            remainingGaps: lesson6Pursuit.remainingGaps,
        },
        {
            stepNumber: 6,
            aimStatus: "closest-pass",
            plannedArrowIds: ["lesson-6-transitive-vnc-audit"],
            firedArrowIds: [["lesson-6-transitive-vnc-audit", "hit"]],
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
                entry.specificity,
                entry.humanness || entry.trajectory,
            ]),
            projectivePrefixes: lesson6Pursuit.projectiveObjectParadigm.map((entry) => [
                entry.person,
                entry.classicalDyad,
                entry.currentNawatPrefix,
            ]),
            dyadicSpecificPrefixes: lesson6Pursuit.dyadicObjectFrame.currentNawatSpecificPrefixes,
            reflexiveSlot: lesson6Pursuit.reflexiveObjectFrame.currentNawatReflexiveSlot,
            reflexiveBehavior: lesson6Pursuit.reflexiveObjectFrame.engineBehavior,
        },
        {
            monadicFormula: "#pers1-pers2+val(base)tiempo+núm1-núm2#",
            dyadicFormula: "#pers1-pers2+val1-val2(base)tiempo+núm1-núm2#",
            objectiveDistinctions: ["trajectory", "specificity", "prominence"],
            monadicFillers: [
                ["ne", "mu", "specific", "reflexive-reciprocative"],
                ["te", "te", "nonspecific", "human"],
                ["tla", "ta", "nonspecific", "nonhuman"],
            ],
            projectivePrefixes: [
                ["1sg", "n-ech", "nech"],
                ["1pl", "t-ech", "tech"],
                ["2sg", "m-itz", "metz"],
                ["2pl", "am-ech", "metzin"],
                ["3sg", "c-0/qu-0/qui-0", "ki/k"],
                ["3pl", "qu-im", "kin"],
            ],
            dyadicSpecificPrefixes: ["nech", "tech", "metz", "metzin", "ki", "kin"],
            reflexiveSlot: "mu",
            reflexiveBehavior: "same-person specific objects are redirected to mu by reflexive slot logic",
        }
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
    const muBeforeIAllomorphy = ctx.applyObj1Allomorphy({
        verb: "ilnamiqui",
        analysisVerb: "ilnamiqui",
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
        }
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
                tiempo: "presente",
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
            predicateStem: "(nemi)",
            tenseValue: "presente",
            formulaEcho: "#Ø-Ø-Ø-Ø(nemi)-Ø-presente#",
            formulaSlotKeys: ["pers1Pers2", "obj1", "obj2", "obj3", "reflexivo", "predicateStem", "tensePosition"],
            valencyKind: "vnc-valency-frame",
            valency: "intransitive",
            pers1Pers2Slot: "pers1-pers2",
            obj1Slot: "obj1",
            obj2Slot: "obj2",
            obj3Slot: "obj3",
            obj1Display: "Ø",
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
    const priorResultFrame = ctx.buildGrammarFrame({
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

            tiempo: "imperativo",

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
