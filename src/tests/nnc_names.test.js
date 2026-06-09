"use strict";

/**
 * Tests for src/core/nnc/names/names.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_names");

    s.eq(
        "Lesson 56 personal-name NNC API is exported",
        [
            typeof ctx.buildPersonalNameNncBoundaryMetadata,
            typeof ctx.classifyPersonalNameNncCandidate,
            typeof ctx.classifyPersonalNameNncFalsePositive,
            typeof ctx.getPersonalNameNncAntiConflationRules,
        ],
        ["function", "function", "function", "function"]
    );

    const boundary = ctx.buildPersonalNameNncBoundaryMetadata();
    s.eq(
        "personal-name NNC boundary is explicit and non-generative",
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
            kind: "personal-name-nnc-boundary",
            lesson: 56,
            appendices: ["E"],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasPlaceGentilicBoundary: true,
                hasAdverbialAdjunctionBoundary: true,
                hasConjunctionBoundary: true,
                hasPersonalNameNncGeneration: false,
                hasCalendarNameGeneration: false,
                hasStaticNameData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesPlaceGentilicGeneration: false,
                changesAdjunctionBehavior: false,
                changesConjunctionBehavior: false,
                treatsCapitalizationAsNameEvidence: false,
                treatsTranslationsAsNameEvidence: false,
            },
            questionFields: [
                "nameSource",
                "sourceClauseType",
                "clauseSource",
                "adjunctionSource",
                "conjunctionSource",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized personal-name source remains unconfirmed without Nawat evidence",
        ctx.classifyPersonalNameNncCandidate({
            candidate: "capitalized label",
            nameSource: "unknown",
            personalNameKind: "single-clause-name",
            sourceClauseType: "single-clause-name",
            falsePositiveSource: "capitalization-label",
        }),
        {
            kind: "personal-name-nnc-candidate-classification",
            version: 1,
            candidate: "capitalized label",
            nameSource: "unknown",
            personalNameKind: "single-clause-name",
            sourceClauseType: "single-clause-name",
            clauseSource: "",
            adjunctionSource: "",
            conjunctionSource: "",
            evidenceSource: "",
            falsePositiveSource: "capitalization-label",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "personal-name-nnc-needs-nawat-evidence",
                "personal-name-nnc-kind-recognized",
                "personal-name-nnc-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "personal-name classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyPersonalNameNncCandidate({
                candidate: "capitalized label",
                nameSource: "unknown",
                personalNameKind: "single-clause-name",
                falsePositiveSource: "capitalization-label",
            });
            return {
                hasFrame: Boolean(classification.grammarFrame),
                unitKind: classification.frames.unitFrame.unitKind,
                routeStage: classification.frames.routeContract.routeStage,
                generationAllowed: classification.frames.routeContract.generationAllowed,
                stemKind: classification.frames.stemFrame.stemKind,
                diagnosticId: classification.contractDiagnostics[0].id,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(classification, "grammarFrame"),
            };
        })(),
        {
            hasFrame: true,
            unitKind: "personal-name-nnc",
            routeStage: "classify-boundary",
            generationAllowed: false,
            stemKind: "personal-name-source-candidate",
            diagnosticId: "personal-name-nnc-needs-nawat-evidence",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "capitalization label is not personal-name NNC evidence",
        ctx.classifyPersonalNameNncFalsePositive("capitalization-label"),
        {
            kind: "personal-name-nnc-false-positive",
            version: 1,
            source: "capitalization-label",
            isPersonalNameNncEvidence: false,
            isCalendarNameEvidence: false,
            generationAllowed: false,
            diagnostics: ["personal-name-nnc-false-positive-source"],
            antiConflationRules: ctx.getPersonalNameNncAntiConflationRules(),
        }
    );

    s.eq(
        "personal-name NNC metadata carries anti-conflation rules",
        ctx.getPersonalNameNncAntiConflationRules(),
        [
            "personal-name NNC boundary metadata is not generation",
            "ordinary NNC fixtures or open-stem previews are not personal-name fixture evidence",
            "capitalization labels and proper-name translations are not Nawat/Pipil name evidence",
            "place/gentilic, adjunction, or conjunction boundary metadata is not personal-name NNC evidence",
            "calendar roadmap text is not personal-name NNC data",
            "Andrews personal-name categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("personal-name NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("personal-name NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
