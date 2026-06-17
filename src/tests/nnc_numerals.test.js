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
        ],
        ["function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildNumeralNncBoundaryMetadata();
    s.eq(
        "numeral NNC boundary is explicit and non-generative",
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
                hasNumeralNncGeneration: false,
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
        "recognized cardinal category remains unconfirmed without Nawat evidence",
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
            falsePositiveSource: "ui-number-label",
            sourceKind: "",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "numeral-nnc-needs-nawat-evidence",
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
            diagnosticId: "numeral-nnc-needs-nawat-evidence",
            enumerableGrammarFrame: false,
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
            "UI number labels are not Nawat/Pipil numeral data",
            "Appendix D headings are not fixture cells",
            "English or Spanish number translations are not Nawat/Pipil form evidence",
            "Andrews numeral categories are architecture, not Nawat/Pipil form authority",
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
        "Lesson 34 frame records Andrews numeral architecture without licensing output",
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
            routeStage: "audit-lesson-34",
            diagnosticId: "cardinal-numeral-nnc-diagnostic-only",
        }
    );
    s.no("numeral NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("numeral NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
