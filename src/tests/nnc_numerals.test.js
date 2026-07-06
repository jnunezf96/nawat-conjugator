"use strict";

/**
 * Tests for src/core/nnc/numerals/numerals.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_numerals");

    s.eq(
        "Lesson 34 and Appendix D numeral NNC API is exported",
        [
            typeof ctx.buildNumeralNncBoundaryMetadata,
            typeof ctx.classifyNumeralNncCandidate,
            typeof ctx.classifyNumeralNncFalsePositive,
            typeof ctx.getNumeralNncAntiConflationRules,
            typeof ctx.buildLesson34CardinalNumeralNncPursuitFrame,
            typeof ctx.getLesson34CardinalNumeralNncSubsectionInventory,
            typeof ctx.getBasicCardinalNumeralNncStem,
            typeof ctx.getBasicCardinalNumeralNncStemInventory,
            typeof ctx.buildBasicCardinalNumeralNncSourceFrame,
            typeof ctx.buildBasicCardinalNumeralNncOperationFrame,
            typeof ctx.getBasicCardinalNumeralNncOperationFrameMismatch,
            typeof ctx.buildAndrewsBasicCardinalNumeralNnc,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildNumeralNncBoundaryMetadata();
    s.eq(
        "numeral NNC boundary is explicit about scoped Andrews generation",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            appendices: boundary.appendices,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "numeral-nnc-boundary",
            lesson: 34,
            appendices: ["D"],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasNumeralNncGeneration: true,
                hasBasicCardinalGeneration: true,
                hasStaticNumberData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesNncFormulaSlots: false,
                treatsUiNumberLabelsAsEvidence: false,
            },
            questionFields: [
                "numeralBase",
                "numeralKind",
                "nncRole",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized cardinal category remains blocked without Andrews source gate",
        ctx.classifyNumeralNncCandidate({
            candidate: "number label",
            numeralBase: "1",
            numeralKind: "cardinal",
            falsePositiveSource: "ui-number-label",
        }),
        {
            kind: "numeral-nnc-candidate-classification",
            version: 1,
            candidate: "number label",
            numeralBase: "1",
            numeralKind: "cardinal",
            nncRole: "",
            evidenceSource: "",
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "ui-number-label",
            sourceKind: "",
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "numeral-nnc-source-gate-required",
                "numeral-nnc-category-recognized",
                "numeral-nnc-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "numeral NNC classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyNumeralNncCandidate({
                candidate: "number label",
                numeralBase: "1",
                numeralKind: "cardinal",
                falsePositiveSource: "ui-number-label",
            });
            return {
                hasFrame: Boolean(classification.grammarFrame),
                unitKind: classification.frames.unitFrame.unitKind,
                routeStage: classification.frames.routeContract.routeStage,
                generationAllowed: classification.frames.routeContract.generationAllowed,
                diagnosticId: classification.contractDiagnostics[0].id,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(classification, "grammarFrame"),
            };
        })(),
        {
            hasFrame: true,
            unitKind: "numeral-nnc",
            routeStage: "classify-boundary",
            generationAllowed: false,
            diagnosticId: "numeral-nnc-source-gate-required",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "structured Andrews numeral candidate generates through orthography bridge",
        (() => {
            const sourceFrame = ctx.buildBasicCardinalNumeralNncSourceFrame({ value: "ce" });
            const operationFrame = ctx.buildBasicCardinalNumeralNncOperationFrame(sourceFrame);
            const classification = ctx.classifyNumeralNncCandidate({
                candidate: "poison",
                numeralBase: "poison",
                numeralKind: "cardinal",
                nncRole: "cardinal numeral NNC",
                sourceGate: "poison",
                structuredSource: true,
                sourceKind: "basic-set",
                sourceFrame,
                operationFrame,
            });
            return {
                candidate: classification.candidate,
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                formulaStem: classification.formulaSlots.numeralStem.surface,
                operationId: classification.operationFrame.operationId,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                targetStem: classification.frames.stemFrame.targetStem,
                realizedTargetStem: classification.frames.stemFrame.realizedTargetStem,
            };
        })(),
        {
            candidate: "poison",
            confirmed: true,
            supported: true,
            generationAllowed: true,
            surface: "se",
            formulaStem: "se",
            operationId: "andrews-34-basic-cardinal-numeral-nnc-realization",
            diagnostics: [
                "basic-cardinal-numeral-nnc-andrews-generated",
                "numeral-nnc-category-recognized",
                "numeral-nnc-structured-source",
            ],
            routeStage: "generate-structured-numeral-nnc",
            frameGenerationAllowed: true,
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            targetStem: "ce",
            realizedTargetStem: "se",
        }
    );

    s.eq(
        "basic cardinal numeral NNC inventory preserves Andrews stems",
        ctx.getBasicCardinalNumeralNncStemInventory().map((entry) => entry.structuralStem),
        ["ce", "ome", "eyi", "nahui"]
    );

    s.eq(
        "Andrews basic cardinal numeral NNC builds formula slots before surface",
        (() => {
            const sourceFrame = ctx.buildBasicCardinalNumeralNncSourceFrame({ value: 4 });
            const operationFrame = ctx.buildBasicCardinalNumeralNncOperationFrame(sourceFrame);
            const generated = ctx.buildAndrewsBasicCardinalNumeralNnc({
                value: "poison",
                sourceFrame,
                operationFrame,
            });
            return {
                value: generated.value,
                targetStemClassical: generated.targetStemClassical,
                structuralStem: generated.structuralStem,
                surface: generated.surface,
                structuralFormula: generated.structuralFormula,
                formulaSlots: {
                    pers: generated.formulaSlots.pers1Pers2.structural,
                    stem: generated.formulaSlots.numeralStem.structural,
                    stemSurface: generated.formulaSlots.numeralStem.surface,
                    num: generated.formulaSlots.num1Num2.structural,
                },
                operationId: generated.operationFrame.operationId,
                routeStage: generated.frames.routeContract.routeStage,
                frameGenerationAllowed: generated.frames.routeContract.generationAllowed,
                finiteSurfaceExpansionAllowed: generated.frames.routeContract.targetContract.finiteSurfaceExpansionAllowed,
                tenseSlotAllowed: generated.frames.nuclearClauseFrame.tenseSlotAllowed,
            };
        })(),
        {
            value: 4,
            targetStemClassical: "nahui",
            structuralStem: "nahui",
            surface: "nawi",
            structuralFormula: "#0-0(nahui)0-0#",
            formulaSlots: {
                pers: "0-0",
                stem: "nahui",
                stemSurface: "nawi",
                num: "0-0",
            },
            operationId: "andrews-34-basic-cardinal-numeral-nnc-realization",
            routeStage: "generate-basic-cardinal-numeral-nnc",
            frameGenerationAllowed: true,
            finiteSurfaceExpansionAllowed: false,
            tenseSlotAllowed: false,
        }
    );

    s.eq(
        "omitted basic cardinal candidate generates from Andrews numeral base",
        (() => {
            const sourceFrame = ctx.buildBasicCardinalNumeralNncSourceFrame({ value: "2" });
            const operationFrame = ctx.buildBasicCardinalNumeralNncOperationFrame(sourceFrame);
            const classification = ctx.classifyNumeralNncCandidate({
                numeralBase: "poison",
                numeralKind: "cardinal",
                nncRole: "cardinal numeral NNC",
                sourceFrame,
                operationFrame,
            });
            return {
                candidate: classification.candidate,
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                structuralFormula: classification.structuralFormula,
                formulaSlots: {
                    pers: classification.formulaSlots.pers1Pers2.structural,
                    stem: classification.formulaSlots.numeralStem.structural,
                    stemSurface: classification.formulaSlots.numeralStem.surface,
                    num: classification.formulaSlots.num1Num2.structural,
                },
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                sourceSurface: classification.frames.orthographyFrame.sourceSurface,
                targetStem: classification.frames.stemFrame.targetStem,
                realizedTargetStem: classification.frames.stemFrame.realizedTargetStem,
                basicCardinalGenerated: classification.frames.routeContract.targetContract.basicCardinalGenerated,
            };
        })(),
        {
            candidate: "ome",
            confirmed: true,
            supported: true,
            generationAllowed: true,
            surface: "ume",
            structuralFormula: "#0-0(ome)0-0#",
            formulaSlots: {
                pers: "0-0",
                stem: "ome",
                stemSurface: "ume",
                num: "0-0",
            },
            diagnostics: [
                "basic-cardinal-numeral-nnc-andrews-generated",
                "numeral-nnc-category-recognized",
                "numeral-nnc-structured-source",
            ],
            routeStage: "generate-structured-numeral-nnc",
            frameGenerationAllowed: true,
            sourceSurface: "ome",
            targetStem: "ome",
            realizedTargetStem: "ume",
            basicCardinalGenerated: true,
        }
    );

    s.eq(
        "basic cardinal numeral NNC blocks string-only and contradictory generation",
        (() => {
            const sourceFrame = ctx.buildBasicCardinalNumeralNncSourceFrame({ value: 4 });
            const operationFrame = ctx.buildBasicCardinalNumeralNncOperationFrame(sourceFrame);
            const otherSourceFrame = ctx.buildBasicCardinalNumeralNncSourceFrame({ value: 1 });
            const otherOperationFrame = ctx.buildBasicCardinalNumeralNncOperationFrame(otherSourceFrame);
            const originalNormalizer = ctx.normalizeNumeralNncCandidateSurface;
            if (typeof ctx.normalizeNumeralNncCandidateSurface === "function") {
                ctx.normalizeNumeralNncCandidateSurface = () => "poison";
            }
            const poisoned = ctx.buildAndrewsBasicCardinalNumeralNnc({
                value: "poison",
                numeralBase: "poison",
                sourceFrame,
                operationFrame,
            });
            if (originalNormalizer) {
                ctx.normalizeNumeralNncCandidateSurface = originalNormalizer;
            }
            const stringOnlyGenerator = ctx.buildAndrewsBasicCardinalNumeralNnc({ value: 4 });
            const stringOnlyClassifier = ctx.classifyNumeralNncCandidate({
                candidate: "nahui",
                numeralBase: "4",
                numeralKind: "cardinal",
                sourceGate: "Andrews 34.4",
                structuredSource: true,
            });
            const missingOperation = ctx.buildAndrewsBasicCardinalNumeralNnc({
                value: 4,
                sourceFrame,
            });
            const contradictory = ctx.buildAndrewsBasicCardinalNumeralNnc({
                value: 4,
                sourceFrame,
                operationFrame: otherOperationFrame,
            });
            const changedStrings = ctx.classifyNumeralNncCandidate({
                candidate: "changed",
                numeralBase: "changed",
                numeralKind: "cardinal",
                sourceGate: "changed",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            return {
                poisoned: {
                    surface: poisoned.surface,
                    structuralFormula: poisoned.structuralFormula,
                    targetStem: poisoned.frames.stemFrame.realizedTargetStem,
                },
                stringOnlyGenerator: stringOnlyGenerator.diagnostics,
                stringOnlyClassifier: {
                    generationAllowed: stringOnlyClassifier.generationAllowed,
                    surface: stringOnlyClassifier.surface,
                    diagnostics: stringOnlyClassifier.diagnostics,
                },
                missingOperation: missingOperation.diagnostics,
                contradictory: contradictory.diagnostics,
                changedStrings: {
                    surface: changedStrings.surface,
                    structuralFormula: changedStrings.structuralFormula,
                    targetStem: changedStrings.frames.stemFrame.realizedTargetStem,
                },
            };
        })(),
        {
            poisoned: {
                surface: "nawi",
                structuralFormula: "#0-0(nahui)0-0#",
                targetStem: "nawi",
            },
            stringOnlyGenerator: ["basic-cardinal-numeral-nnc-source-frame-required"],
            stringOnlyClassifier: {
                generationAllowed: false,
                surface: "",
                diagnostics: [
                    "basic-cardinal-numeral-nnc-source-frame-required",
                    "numeral-nnc-category-recognized",
                    "numeral-nnc-unconfirmed",
                ],
            },
            missingOperation: ["basic-cardinal-numeral-nnc-operation-frame-required"],
            contradictory: ["basic-cardinal-numeral-nnc-contradictory-source-frame"],
            changedStrings: {
                surface: "nawi",
                structuralFormula: "#0-0(nahui)0-0#",
                targetStem: "nawi",
            },
        }
    );

    s.eq(
        "ordinary NNC open stems are classified as false positive numeral evidence",
        ctx.classifyNumeralNncFalsePositive("ordinary-nnc-open-stem"),
        {
            kind: "numeral-nnc-false-positive",
            version: 1,
            source: "ordinary-nnc-open-stem",
            isNumeralNncEvidence: false,
            isNumberLexemeEvidence: false,
            generationAllowed: false,
            diagnostics: ["numeral-nnc-false-positive-source"],
            antiConflationRules: ctx.getNumeralNncAntiConflationRules(),
        }
    );

    s.eq(
        "numeral NNC metadata carries anti-conflation rules",
        ctx.getNumeralNncAntiConflationRules(),
        [
            "numeral NNC boundary metadata is not generation",
            "ordinary NNC open-stem output is not numeral NNC fixture evidence",
            "UI number labels are not orthography-bridge numeral data",
            "Appendix D headings are not fixture cells",
            "English or Spanish number translations are not orthography-bridge form evidence",
            "Andrews numeral categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    const lesson34Frame = ctx.buildLesson34CardinalNumeralNncPursuitFrame();
    s.eq(
        "Lesson 34 pursuit frame covers every Andrews cardinal-numeral subsection",
        {
            kind: lesson34Frame.kind,
            stepNumber: lesson34Frame.stepNumber,
            aimStatus: lesson34Frame.aimStatus,
            pdfRefs: lesson34Frame.pdfRefs,
            subsectionRefs: lesson34Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson34Frame.generationAllowed,
            closestPass: lesson34Frame.closestPass,
            hitCount: lesson34Frame.hitCount,
            missCount: lesson34Frame.missCount,
        },
        {
            kind: "lesson-34-cardinal-numeral-nnc-pursuit-frame",
            stepNumber: 34,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 34.1",
                "Andrews Lesson 34.2",
                "Andrews Lesson 34.3",
                "Andrews Lesson 34.4",
                "Andrews Lesson 34.5",
                "Andrews Lesson 34.6",
                "Andrews Lesson 34.7",
                "Andrews Lesson 34.8",
                "Andrews Lesson 34.9",
                "Andrews Lesson 34.10",
                "Andrews Lesson 34.11",
                "Andrews Lesson 34.12",
                "Andrews Lesson 34.13",
                "Andrews Lesson 34.14",
                "Andrews Lesson 34.15",
                "Andrews Lesson 34.16",
            ],
            subsectionRefs: [
                "34.1",
                "34.2",
                "34.3",
                "34.4",
                "34.5",
                "34.6",
                "34.7",
                "34.8",
                "34.9",
                "34.10",
                "34.11",
                "34.12",
                "34.13",
                "34.14",
                "34.15",
                "34.16",
            ],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
        }
    );
    s.eq(
        "Lesson 34 frame records Andrews numeral architecture and scoped output boundary",
        {
            base: lesson34Frame.numeralSystemFrame.numericalBase,
            orders: lesson34Frame.numeralSystemFrame.successiveOrders,
            absolutiveFormula: lesson34Frame.numeralSystemFrame.cardinalNumeralNncsUseAbsolutiveStateFormula,
            ordinaryPossessiveAllowed: lesson34Frame.numeralSystemFrame.ordinaryPossessiveStateLicensed,
            grossCountPlural: lesson34Frame.numeralSystemFrame.simpleVsGrossCount.grossCountRequiresPluralSubject,
            basicEntityKinds: lesson34Frame.basicSetFrame.countedEntityKinds,
            highOrderValues: lesson34Frame.highOrderFrame.orderMatrices.map((entry) => entry.value),
            conjoinedStructure: lesson34Frame.conjoinedNumeralFrame.structure,
            classifierSetIds: lesson34Frame.classifierSetFrame.unitClassifierSets.map((entry) => entry.id),
            specialTwentySetIds: lesson34Frame.classifierSetFrame.specialTwentySets.map((entry) => entry.id),
            reduplicatesAllConjuncts: lesson34Frame.reduplicationFrame.conjoinedStructuresReduplicateAllConjuncts,
            measureJoinsByModification: lesson34Frame.modifierMeasureFrame.measuredThingJoinsByAdjectivalModification,
            cardinalGeneration: lesson34Frame.currentEngineBoundary.cardinalNumeralGenerationImplemented,
            basicOneThroughFourGeneration: lesson34Frame.currentEngineBoundary.basicSimpleCountOneThroughFourGenerationImplemented,
            routeStage: lesson34Frame.frames.routeContract.routeStage,
            diagnosticId: lesson34Frame.contractDiagnostics[0].id,
        },
        {
            base: "vigesimal",
            orders: [1, 20, 400, 8000],
            absolutiveFormula: true,
            ordinaryPossessiveAllowed: false,
            grossCountPlural: true,
            basicEntityKinds: ["animate", "flat", "long-cylindrical"],
            highOrderValues: [20, 400, 8000],
            conjoinedStructure: "conjunctorless conjunction",
            classifierSetIds: ["rock", "row", "thing", "maize-cob"],
            specialTwentySetIds: ["tecpan", "ipil", "quimil"],
            reduplicatesAllConjuncts: true,
            measureJoinsByModification: true,
            cardinalGeneration: true,
            basicOneThroughFourGeneration: true,
            routeStage: "audit-lesson-34",
            diagnosticId: "cardinal-numeral-nnc-diagnostic-only",
        }
    );
    s.no("numeral NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("numeral NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
