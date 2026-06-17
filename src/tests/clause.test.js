"use strict";

/**
 * Tests for src/core/clause/clause.js
 */

const { createSuite } = require("./runner");

function compactShell(shell) {
    return shell && {
        kind: shell.kind,
        version: shell.version,
        clauseKind: shell.clauseKind,
        displayLabel: shell.displayLabel,
        formulaType: shell.formulaType,
        formulaAbbreviation: shell.formulaAbbreviation,
        formulaLabel: shell.formulaLabel,
        terminology: shell.terminology,
        formula: shell.formula,
        expandedFormula: shell.expandedFormula,
        formulaSlots: shell.formulaSlots,
        formulaEcho: shell.formulaEcho,
        lesson4ActiveFormula: shell.lesson4?.activeFormula || null,
        organizationalLayers: shell.organizationalLayers,
        personalPronounCases: shell.personalPronounFrame?.cases || null,
        hasTensePosition: shell.hasTensePosition,
        generationAllowed: shell.generationAllowed,
        slots: shell.slots,
    };
}

function run(ctx) {
    const s = createSuite("clause");

    s.eq(
        "nuclear clause shell API is exported",
        [
            typeof ctx.buildNuclearClauseShellMetadata,
            typeof ctx.normalizeNuclearClauseKind,
            typeof ctx.getNuclearClauseFormulaType,
            typeof ctx.getNuclearClauseLesson4FormulaInventory,
            typeof ctx.getNuclearClauseLesson4SubsectionInventory,
            typeof ctx.buildNuclearClauseLesson4Frame,
            typeof ctx.buildVerbalNuclearClauseFormulaEchoFromSlots,
        ],
        ["function", "function", "function", "function", "function", "function", "function"]
    );

    s.eq(
        "Lesson 4 subsection inventory directs each PDF section without granting generation",
        (() => {
            const inventory = ctx.getNuclearClauseLesson4SubsectionInventory();
            const frame = ctx.buildNuclearClauseLesson4Frame({
                formulaType: "VNC",
                predicatePositionStatus: "monadic",
            });
            return {
                sections: inventory.map((entry) => entry.andrewsSection),
                pdfRefs: frame.pdfRefs,
                categories: inventory.map((entry) => entry.category),
                redirectActions: inventory.map((entry) => entry.redirectAction),
                generationAllowed: inventory.map((entry) => entry.generationAllowed),
                validationRefs: inventory.map((entry) => entry.validationRefs),
                subsectionCount: frame.subsectionInventory.length,
                pursuit: {
                    stepNumber: frame.pursuit.stepNumber,
                    aimStatus: frame.pursuit.aimStatus,
                    plannedArrows: frame.pursuit.plannedArrows.map((arrow) => [arrow.id, arrow.andrewsRefs.length, arrow.expectedFeedbackRefs[0]]),
                    firedArrows: frame.pursuit.firedArrows.map((arrow) => [arrow.id, arrow.result, arrow.andrewsRefs.length, arrow.feedbackRefs[0]]),
                    hitCount: frame.pursuit.hitCount,
                    missCount: frame.pursuit.missCount,
                    remainingGapCount: frame.pursuit.remainingGaps.length,
                    closestPass: frame.pursuit.closestPass,
                },
            };
        })(),
        {
            sections: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6"],
            pdfRefs: [
                "Andrews Lesson 4.1",
                "Andrews Lesson 4.2",
                "Andrews Lesson 4.3",
                "Andrews Lesson 4.4",
                "Andrews Lesson 4.5",
                "Andrews Lesson 4.6",
            ],
            categories: [
                "nuclear-clause-scope",
                "vnc-nnc-kinds",
                "formula-stage-1",
                "formula-stage-2",
                "formula-stage-3",
                "personal-pronouns",
            ],
            redirectActions: ["reframe-metadata", "reframe-metadata", "keep", "keep", "keep", "diagnostic-only"],
            generationAllowed: [false, false, false, false, false, false],
            validationRefs: Array.from({ length: 6 }, () => ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"]),
            subsectionCount: 6,
            pursuit: {
                stepNumber: 4,
                aimStatus: "shooting",
                plannedArrows: [["lesson-4-subsection-coverage-audit", 6, "src/tests/clause.test.js"]],
                firedArrows: [["lesson-4-subsection-coverage-audit", "hit", 6, "src/tests/clause.test.js"]],
                hitCount: 1,
                missCount: 0,
                remainingGapCount: 3,
                closestPass: false,
            },
        }
    );

    s.eq(
        "Lesson 4 exposes six staged formulas and affixal pronoun case boundaries",
        (() => {
            const inventory = ctx.getNuclearClauseLesson4FormulaInventory();
            const frame = ctx.buildNuclearClauseLesson4Frame({
                formulaType: "NNC",
                predicatePositionStatus: "monadic",
            });
            return {
                vocableScope: frame.vocableScopeFrame,
                formulaBoundaries: inventory.formulaBoundaryFrame,
                subjectFrame: inventory.subjectFrame,
                positionComplexity: inventory.positionComplexityFrame.positions,
                stage1: inventory.stage1.formula,
                stage2Vnc: inventory.stage2.formulas.VNC,
                stage2Nnc: inventory.stage2.formulas.NNC,
                vncFormulas: inventory.stage3.VNC.map((entry) => entry.formula),
                nncFormulas: inventory.stage3.NNC.map((entry) => entry.formula),
                activeFormula: frame.activeFormula.formula,
                activeStatus: frame.activeFormula.predicatePositionStatus,
                layerKeys: frame.organizationalLayers.map((entry) => entry.key),
                pronounForm: frame.personalPronounFrame.form,
                pronounMinimumMorphemeCount: frame.personalPronounFrame.minimumMorphemeCount,
                pronounsAreOnlyReferringElements: frame.personalPronounFrame.onlyReferringElements,
                pronounNoGender: frame.personalPronounFrame.noGender,
                pronounCategories: frame.personalPronounFrame.categories,
                pronounCategoryFeatures: frame.personalPronounFrame.categoryFeatures,
                objectiveOccursIn: frame.personalPronounFrame.cases.objective.occursIn,
                possessiveOccursIn: frame.personalPronounFrame.cases.possessive.occursIn,
                boundaries: frame.boundaries,
            };
        })(),
        {
            vocableScope: {
                sourceSection: "Andrews §4.1",
                appliesTo: "all-non-particle-vocables",
                excludedFormalClass: "particle",
                unitKind: "nuclear-clause",
                requiredFunctions: ["subject", "predicate"],
                isMorphologicalWord: false,
                rejectsSentenceWordLabel: true,
                useRoles: ["simple-sentence", "main-clause", "dependent-clause", "conjoined-clause"],
            },
            formulaBoundaries: {
                sourceSections: ["Andrews §4.3", "Andrews §4.4", "Andrews §4.5"],
                foreAftBoundary: "#",
                positionBoundary: "+",
                subpositionBoundary: "-",
                stemBoundary: "()",
                vacantPositionSymbol: "absence",
                formulaRepresentsSlotCategories: true,
                formulaRepresentsMorphicFillers: true,
                stemDimensionsExplicit: true,
            },
            subjectFrame: {
                sourceSection: "Andrews §4.4",
                role: "subject",
                structure: "discontinuous-circumfix",
                prefixPosition: "person",
                suffixPosition: "number",
                genericFormula: "#person+...+number#",
                occursIn: ["VNC", "NNC"],
            },
            positionComplexity: {
                person: { complexity: "dyadic", subpositions: ["pers1", "pers2"] },
                number: { complexity: "dyadic", subpositions: ["num1", "num2"] },
                tense: { complexity: "monadic", slot: "tns", occursIn: ["VNC"] },
                valence: {
                    complexityOptions: ["dyadic", "monadic", "vacant"],
                    slotsByStatus: { dyadic: "va1-va2", monadic: "va", vacant: "Ø" },
                    occursIn: ["VNC"],
                },
                state: {
                    complexityOptions: ["dyadic", "monadic", "vacant"],
                    slotsByStatus: { dyadic: "st1-st2", monadic: "st", vacant: "Ø" },
                    occursIn: ["NNC"],
                },
                stem: { complexityOptions: ["monadic", "polyadic"], lessonsDeferredTo: ["Lesson 7", "Lesson 14"] },
            },
            stage1: "Subject + Predicate",
            stage2Vnc: "#person+valence(STEM)tense+number#",
            stage2Nnc: "#person+state(STEM)number#",
            vncFormulas: [
                "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                "#pers1-pers2+va(STEM)tns+num1-num2#",
                "#pers1-pers2(STEM)tns+num1-num2#",
            ],
            nncFormulas: [
                "#pers1-pers2+st1-st2(STEM)num1-num2#",
                "#pers1-pers2+st(STEM)num1-num2#",
                "#pers1-pers2(STEM)num1-num2#",
            ],
            activeFormula: "#pers1-pers2+st(STEM)num1-num2#",
            activeStatus: "monadic",
            layerKeys: ["nounstem", "nouncore", "nnc"],
            pronounForm: "affixal-only",
            pronounMinimumMorphemeCount: 2,
            pronounsAreOnlyReferringElements: true,
            pronounNoGender: true,
            pronounCategories: ["person", "animacy", "humanness", "number", "case"],
            pronounCategoryFeatures: {
                person: ["first", "second", "third"],
                animacy: ["animate", "nonanimate"],
                humanness: ["human", "nonhuman"],
                number: { animate: ["singular", "plural"], nonanimate: ["common"] },
                case: ["nominative", "objective", "possessive"],
            },
            objectiveOccursIn: ["VNC"],
            possessiveOccursIn: ["NNC"],
            boundaries: {
                formulaInventoryIsNotGeneration: true,
                subjectAndPredicateRequired: true,
                stemIsFoundation: true,
                personalPronounsAreAffixalOnly: true,
                objectiveCaseOnlyInVncPredicate: true,
                possessiveCaseOnlyInNncPredicate: true,
            },
        }
    );

    s.eq(
        "Lesson 4 frame covers clause use predicate function tree controls and pronoun resolution",
        (() => {
            const frame = ctx.buildNuclearClauseLesson4Frame({
                formulaType: "VNC",
                predicatePositionStatus: "dyadic",
                predicatePositionStatusSource: "explicit",
                usageRole: "dependent",
                slots: {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "ni", suffix: "" },
                    obj1: { slot: "obj1", prefix: "ki", role: "mainline-object" },
                    predicateStem: { slot: "STEM", stem: "nemi" },
                    tensePosition: { slot: "tns", label: "presente" },
                },
            });
            return {
                useRole: frame.useFrame.activeRole,
                useOptions: frame.useFrame.options.map((entry) => entry.role),
                functionLabel: frame.predicateFunctionProfile.labelEs,
                functionValues: frame.predicateFunctionProfile.predicatorValuesEs,
                treeTop: frame.diagramTree.root.children.map((entry) => entry.key),
                predicateTree: frame.diagramTree.root.children[1].children.map((entry) => entry.key),
                coreTree: frame.diagramTree.root.children[1].children[0].children.map((entry) => `${entry.key}:${entry.slot || ""}`),
                activeSlot: frame.predicatePositionControl.activeSlot,
                optionSlots: frame.predicatePositionControl.options.map((entry) => entry.predicatePositionSlot),
                diagnosticStatus: frame.predicatePositionControl.diagnosticStatus,
                pronouns: frame.personalPronounFrame.fillers.map((entry) => ({
                    caseKey: entry.caseKey,
                    display: entry.display,
                    person: entry.features?.person,
                    number: entry.features?.number,
                })),
                referenceStatus: frame.personalPronounFrame.referenceResolution.status,
                commonNumber: frame.personalPronounFrame.commonNumberResolution,
                diagnosticIds: frame.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            useRole: "dependent-clause",
            useOptions: ["simple-sentence", "main-clause", "dependent-clause", "conjoined-clause"],
            functionLabel: "CNV: predicado verbal",
            functionValues: ["verbo intransitivo", "verbo transitivo"],
            treeTop: ["subject", "predicate"],
            predicateTree: ["verbcore", "tense"],
            coreTree: ["valence:va1-va2", "stem:"],
            activeSlot: "va1-va2",
            optionSlots: ["va1-va2", "va", "Ø"],
            diagnosticStatus: "explicit",
            pronouns: [
                { caseKey: "nominative", display: "ni", person: 1, number: "sg" },
                { caseKey: "objective", display: "ki", person: 3, number: "sg" },
            ],
            referenceStatus: "context-required",
            commonNumber: { ambiguous: true, status: "context-required" },
            diagnosticIds: [
                "lesson4-nuclear-clause-use-classified",
                "lesson4-predicate-position-explicit",
                "lesson4-objective-third-person-reference-context",
                "lesson4-objective-common-number-context",
            ],
        }
    );

    s.eq(
        "Lesson 4 CNN shell resolves possessive pronoun filler without adding tense",
        (() => {
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "nnc",
                usageRole: "simple-sentence",
                subject: { prefix: "", suffix: "" },
                predicate: {
                    stem: "kal",
                    state: "possessive",
                    stateSlot: {
                        possessorPrefix: "nu",
                        predicatePositionStatus: "monadic",
                    },
                },
            });
            return {
                formula: shell.formula,
                useRole: shell.lesson4.useFrame.activeRole,
                functionLabel: shell.lesson4.predicateFunctionProfile.labelEs,
                activeSlot: shell.lesson4.predicatePositionControl.activeSlot,
                hasTensePosition: shell.hasTensePosition,
                pronouns: shell.lesson4.personalPronounFrame.fillers.map((entry) => ({
                    caseKey: entry.caseKey,
                    display: entry.display,
                    person: entry.features?.person,
                    number: entry.features?.number,
                })),
            };
        })(),
        {
            formula: "#pers1-pers2+st(STEM)num1-num2#",
            useRole: "simple-sentence",
            functionLabel: "CNN: predicado nominal",
            activeSlot: "st",
            hasTensePosition: false,
            pronouns: [
                { caseKey: "nominative", display: "Ø", person: 3, number: "sg" },
                { caseKey: "possessive", display: "nu", person: 1, number: "sg" },
            ],
        }
    );

    s.eq(
        "VNC shell exposes subject predicate object and tense slots without generation",
        compactShell(ctx.buildNuclearClauseShellMetadata({
            clauseKind: "vnc",
            subject: { prefix: "ni", suffix: "" },
            object: { prefix: "ki" },
            predicate: { stem: "nemi", valency: "intransitivo" },
            tenseValue: "presente",
            tenseLabel: "presente",
        })),
        {
            kind: "nuclear-clause-shell",
            version: 1,
            clauseKind: "verbal-nuclear-clause",
            displayLabel: "cláusula nuclear verbal (CNV)",
            formulaType: "VNC",
            formulaAbbreviation: "CNV",
            formulaLabel: "Fórmula CNV",
            terminology: {
                abbreviation: "CNV",
                english: "verbal nuclear clause",
                spanish: "cláusula nuclear verbal",
                conceptId: "vnc",
                legacyFormulaType: "VNC",
            },
            formula: "#pers1-pers2+va(STEM)tns+num1-num2#",
            expandedFormula: "#pers1-obj1-obj2-obj3-reflexivo(STEM)-pers2-tiempo#",
            formulaSlots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "ni",
                    suffix: "",
                    displayPrefix: "ni",
                    displaySuffix: "Ø",
                    label: "",
                },
                obj1: {
                    slot: "obj1",
                    role: "mainline-object",
                    prefix: "ki",
                    displayPrefix: "ki",
                    isPresent: true,
                    label: "",
                },
                obj2: {
                    slot: "obj2",
                    role: "secondary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                obj3: {
                    slot: "obj3",
                    role: "tertiary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                reflexivo: {
                    slot: "reflexivo",
                    role: "reflexive-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                predicateStem: {
                    slot: "STEM",
                    role: "verbal-predicate",
                    stem: "nemi",
                    displayStem: "nemi",
                    valency: "intransitivo",
                },
                tensePosition: {
                    slot: "tns",
                    role: "tense-position",
                    tenseValue: "presente",
                    label: "presente",
                    isPresent: true,
                    notAvailableInOrdinaryNnc: true,
                },
            },
            formulaEcho: "#ni-ki-Ø-Ø-Ø(nemi)-Ø-presente#",
            lesson4ActiveFormula: {
                stage: 3,
                sourceSection: "Andrews §4.5",
                formulaType: "VNC",
                formulaAbbreviation: "CNV",
                predicatePosition: "valence",
                predicatePositionLabel: "valencia",
                predicatePositionStatus: "monadic",
                predicatePositionStatusLabel: "monádica",
                predicatePositionSlot: "va",
                formula: "#pers1-pers2+va(STEM)tns+num1-num2#",
                generationAllowed: false,
            },
            organizationalLayers: [
                { level: 1, key: "verbstem", label: "verbstem", labelEs: "tronco verbal", role: "foundation" },
                { level: 2, key: "verbcore", label: "verbcore = valence + stem", labelEs: "núcleo verbal = valencia + base", role: "core" },
                { level: 3, key: "predicate", label: "predicate = verbcore + tense", labelEs: "predicado = núcleo verbal + tiempo", role: "predicate" },
                { level: 4, key: "vnc", label: "VNC = subject + predicate", labelEs: "CNV = sujeto + predicado", role: "nuclear-clause" },
            ],
            personalPronounCases: {
                nominative: { functionRole: "subject", occursIn: ["VNC", "NNC"] },
                objective: { functionRole: "verb-object", occursIn: ["VNC"] },
                possessive: { functionRole: "possessor", occursIn: ["NNC"] },
            },
            hasTensePosition: true,
            generationAllowed: false,
            slots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "ni",
                    suffix: "",
                    displayPrefix: "ni",
                    displaySuffix: "Ø",
                    label: "",
                },
                obj1: {
                    slot: "obj1",
                    role: "mainline-object",
                    prefix: "ki",
                    displayPrefix: "ki",
                    isPresent: true,
                    label: "",
                },
                obj2: {
                    slot: "obj2",
                    role: "secondary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                obj3: {
                    slot: "obj3",
                    role: "tertiary-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                reflexivo: {
                    slot: "reflexivo",
                    role: "reflexive-object",
                    prefix: "",
                    displayPrefix: "Ø",
                    isPresent: false,
                    label: "",
                },
                predicateStem: {
                    slot: "STEM",
                    role: "verbal-predicate",
                    stem: "nemi",
                    displayStem: "nemi",
                    valency: "intransitivo",
                },
                tensePosition: {
                    slot: "tns",
                    role: "tense-position",
                    tenseValue: "presente",
                    label: "presente",
                    isPresent: true,
                    notAvailableInOrdinaryNnc: true,
                },
            },
        }
    );

    {
        const shell = ctx.buildNuclearClauseShellMetadata({
            clauseKind: "vnc",
            subject: { prefix: "ti", suffix: "t" },
            object: { prefix: "ki" },
            object2: { prefix: "ta" },
            object3: { prefix: "te" },
            reflexive: { prefix: "mu" },
            predicate: { stem: "ilpia" },
            tenseValue: "presente",
        });
        s.eq(
            "VNC shell exposes Andrews-rooted object/reflexive slot inventory",
            {
                formula: shell.formula,
                formulaEcho: shell.formulaEcho,
                slotKeys: Object.keys(shell.formulaSlots || {}),
                obj2: shell.formulaSlots?.obj2?.prefix,
                obj3: shell.formulaSlots?.obj3?.prefix,
                reflexivo: shell.formulaSlots?.reflexivo?.prefix,
            },
            {
                formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
                formulaEcho: "#ti-ki-ta-te-mu(ilpia)-t-presente#",
                slotKeys: ["pers1Pers2", "obj1", "obj2", "obj3", "reflexivo", "predicateStem", "tensePosition"],
                obj2: "ta",
                obj3: "te",
                reflexivo: "mu",
            }
        );
    }

    s.eq(
        "NNC shell keeps tense absent and connector outside predicate",
        compactShell(ctx.buildNuclearClauseShellMetadata({
            clauseKind: "nnc",
            formulaSlots: {
                pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
                predicateStem: { slot: "STEM", stem: "shuchi", state: "absolutive" },
                num1Num2: { slot: "num1-num2", connector: "t", nounClass: "t" },
            },
        })),
        {
            kind: "nuclear-clause-shell",
            version: 1,
            clauseKind: "nominal-nuclear-clause",
            displayLabel: "cláusula nuclear nominal (CNN)",
            formulaType: "NNC",
            formulaAbbreviation: "CNN",
            formulaLabel: "Fórmula CNN",
            terminology: {
                abbreviation: "CNN",
                english: "nominal nuclear clause",
                spanish: "cláusula nuclear nominal",
                conceptId: "nnc",
                legacyFormulaType: "NNC",
            },
            formula: "#pers1-pers2(STEM)num1-num2#",
            expandedFormula: "#pers1-pers2(STEM)num1-num2#",
            formulaSlots: undefined,
            formulaEcho: "#Ø...Ø(shuchi)t#",
            lesson4ActiveFormula: {
                stage: 3,
                sourceSection: "Andrews §4.5",
                formulaType: "NNC",
                formulaAbbreviation: "CNN",
                predicatePosition: "state",
                predicatePositionLabel: "estado",
                predicatePositionStatus: "vacant",
                predicatePositionStatusLabel: "vacante",
                predicatePositionSlot: "Ø",
                formula: "#pers1-pers2(STEM)num1-num2#",
                generationAllowed: false,
            },
            organizationalLayers: [
                { level: 1, key: "nounstem", label: "nounstem", labelEs: "tronco nominal", role: "foundation" },
                { level: 2, key: "nouncore", label: "nouncore = predicate = state + stem", labelEs: "núcleo nominal = predicado = estado + base", role: "predicate" },
                { level: 3, key: "nnc", label: "NNC = subject + predicate", labelEs: "CNN = sujeto + predicado", role: "nuclear-clause" },
            ],
            personalPronounCases: {
                nominative: { functionRole: "subject", occursIn: ["VNC", "NNC"] },
                objective: { functionRole: "verb-object", occursIn: ["VNC"] },
                possessive: { functionRole: "possessor", occursIn: ["NNC"] },
            },
            hasTensePosition: false,
            generationAllowed: false,
            slots: {
                pers1Pers2: {
                    slot: "pers1-pers2",
                    role: "subject",
                    prefix: "",
                    suffix: "",
                    displayPrefix: "Ø",
                    displaySuffix: "Ø",
                    label: "3sg",
                },
                predicateStem: {
                    slot: "STEM",
                    role: "nominal-predicate",
                    stem: "shuchi",
                    displayStem: "shuchi",
                    state: "absolutive",
                    stateSlot: null,
                },
                num1Num2: {
                    slot: "num1-num2",
                    role: "subject-number-connector",
                    connector: "t",
                    displayConnector: "t",
                    nounClass: "t",
                    notLexicalSuffix: true,
                    notTense: true,
                },
            },
        }
    );

    s.eq(
        "NNC shell reads predicate and connector surfaces from LCM result frames",
        (() => {
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "nnc",
                formulaSlots: {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
                    predicateStem: {
                        slot: "STEM",
                        stem: "stale-predicate",
                        surface: "stale-surface",
                        state: "absolutive",
                        grammarFrame: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                surfaceForms: ["frame-predicate"],
                            }),
                        }),
                    },
                    num1Num2: {
                        slot: "num1-num2",
                        connector: "stale-connector",
                        displayConnector: "stale-display",
                        nounClass: "t",
                        grammarFrame: ctx.buildGrammarFrame({
                            resultFrame: ctx.buildGrammarResultFrame({
                                surface: "frame-connector",
                            }),
                        }),
                    },
                },
            });
            return {
                predicateStem: shell.slots.predicateStem.stem,
                predicateDisplay: shell.slots.predicateStem.displayStem,
                connector: shell.slots.num1Num2.connector,
                connectorDisplay: shell.slots.num1Num2.displayConnector,
                formulaEcho: shell.formulaEcho,
            };
        })(),
        {
            predicateStem: "frame-predicate",
            predicateDisplay: "frame-predicate",
            connector: "frame-connector",
            connectorDisplay: "frame-connector",
            formulaEcho: "#Ø...Ø(frame-predicate)frame-connector#",
        }
    );

    s.eq(
        "NNC shell does not revive stale predicate or connector text after an empty result frame",
        (() => {
            const emptyFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surface: "",
                    surfaceForms: [],
                }),
            });
            const shell = ctx.buildNuclearClauseShellMetadata({
                clauseKind: "nnc",
                formulaSlots: {
                    pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
                    predicateStem: {
                        slot: "STEM",
                        stem: "stale-predicate",
                        surface: "stale-surface",
                        state: "absolutive",
                        grammarFrame: emptyFrame,
                    },
                    num1Num2: {
                        slot: "num1-num2",
                        connector: "stale-connector",
                        displayConnector: "stale-display",
                        displaySurface: "stale-surface",
                        nounClass: "t",
                        grammarFrame: emptyFrame,
                    },
                },
                predicate: { stem: "fallback-predicate" },
            });
            return {
                predicateStem: shell.slots.predicateStem.stem,
                predicateDisplay: shell.slots.predicateStem.displayStem,
                connector: shell.slots.num1Num2.connector,
                connectorDisplay: shell.slots.num1Num2.displayConnector,
                formulaEcho: shell.formulaEcho,
            };
        })(),
        {
            predicateStem: "",
            predicateDisplay: "∅",
            connector: "",
            connectorDisplay: "Ø",
            formulaEcho: "#Ø...Ø(∅)Ø#",
        }
    );

    s.eq(
        "VNC formula echo derives from formulaSlots",
        ctx.buildVerbalNuclearClauseFormulaEchoFromSlots({
            pers1Pers2: { prefix: "ti", displayPrefix: "ti" },
            obj1: { prefix: "", displayPrefix: "Ø" },
            predicateStem: { stem: "kisa", displayStem: "kisa" },
            tensePosition: { tenseValue: "preterito", label: "preterito" },
        }),
        "#ti-Ø(kisa)-Ø-preterito#"
    );

    s.eq(
        "VNC formula echo does not double-wrap an already framed predicate",
        ctx.buildVerbalNuclearClauseFormulaEchoFromSlots({
            pers1Pers2: { prefix: "ni", displayPrefix: "ni" },
            obj1: { prefix: "mu", displayPrefix: "mu" },
            predicateStem: { stem: "-(ilpia)", displayStem: "-(ilpia)" },
            tensePosition: { tenseValue: "presente", label: "presente" },
        }),
        "#ni-mu-(ilpia)-Ø-presente#"
    );

    s.eq(
        "VNC formula echo includes nonzero subject suffix slot",
        ctx.buildVerbalNuclearClauseFormulaEchoFromSlots({
            pers1Pers2: { prefix: "", suffix: "t", displayPrefix: "Ø", displaySuffix: "t" },
            obj1: { prefix: "ki", displayPrefix: "ki" },
            predicateStem: { stem: "-(ilpia)", displayStem: "-(ilpia)" },
            tensePosition: { tenseValue: "presente", label: "presente" },
        }),
        "#Ø-ki-(ilpia)-t-presente#"
    );

    s.eq(
        "nuclear clause shell carries anti-conflation boundary",
        ctx.buildNuclearClauseShellMetadata({ clauseKind: "vnc" }).antiConflationRules,
        [
            "nuclear clause shell is not generation",
            "VNC/NNC surface output is not a complete sentence model",
            "CNV/CNN are the visible Andrews-derived names for the legacy VNC/NNC generator categories",
            "Lesson 4 formulas are shell architecture, not generated Nawat/Pipil surfaces",
            "tense position belongs to VNC, not ordinary NNC",
            "objective personal pronouns belong only in VNC predicates",
            "possessive personal pronouns belong only in NNC predicates",
            "topic and supplementation are clause-level relations, not noun classes",
            "Andrews slot order is architecture, not Nawat/Pipil surface evidence",
        ]
    );
    const shell = ctx.buildNuclearClauseShellMetadata({
        clauseKind: "nnc",
        formulaSlots: {
            pers1Pers2: { slot: "pers1-pers2", prefix: "", suffix: "", label: "3sg" },
            predicateStem: { slot: "STEM", stem: "shuchi", state: "absolutive" },
            num1Num2: { slot: "num1-num2", connector: "t", nounClass: "t" },
        },
    });
    const shellFrame = shell.grammarFrame;
    s.eq(
        "nuclear clause shell exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(shellFrame),
            routeFamily: shellFrame?.routeContract?.routeFamily || "",
            routeStage: shellFrame?.routeContract?.routeStage || "",
            generationAllowed: shellFrame?.routeContract?.generationAllowed,
            formulaType: shellFrame?.nuclearClauseFrame?.formulaType || "",
            formulaAbbreviation: shellFrame?.nuclearClauseFrame?.formulaAbbreviation || "",
            formulaLabel: shellFrame?.nuclearClauseFrame?.formulaLabel || "",
            displayLabel: shellFrame?.nuclearClauseFrame?.displayLabel || "",
            hasTensePosition: shellFrame?.inflectionFrame?.hasTensePosition,
            andrewsRef: shellFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(shell, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "nuclear-clause-shell",
            routeStage: "classify-shell",
            generationAllowed: false,
            formulaType: "NNC",
            formulaAbbreviation: "CNN",
            formulaLabel: "Fórmula CNN",
            displayLabel: "cláusula nuclear nominal (CNN)",
            hasTensePosition: false,
            andrewsRef: "Andrews Lesson 4",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
