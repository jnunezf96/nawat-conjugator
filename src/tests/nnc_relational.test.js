"use strict";

/**
 * Tests for src/core/nnc/relational/relational.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_relational");

    s.eq(
        "Lessons 45-47 relational NNC API is exported",
        [
            typeof ctx.buildRelationalNncBoundaryMetadata,
            typeof ctx.classifyRelationalNncCandidate,
            typeof ctx.classifyRelationalNncFalsePositive,
            typeof ctx.buildRelationalNncUsageFrame,
            typeof ctx.getRelationalNncAntiConflationRules,
        ],
        ["function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildRelationalNncBoundaryMetadata();
    s.eq(
        "relational NNC boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "relational-nnc-boundary",
            lessons: [45, 46, 47],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasRelationalNncUsageFrame: true,
                hasRelationalNncGeneration: false,
                hasStaticRelationalData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesNominalizationGeneration: false,
                changesRouteBehavior: false,
                treatsTranslationAsRelationalEvidence: false,
            },
            questionFields: [
                "relationalStem",
                "relationalKind",
                "relationalOption",
                "governedArgument",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized relational category remains unconfirmed without Nawat evidence",
        ctx.classifyRelationalNncCandidate({
            candidate: "place translation",
            relationalStem: "unknown",
            relationalKind: "locative",
            relationalOption: "2",
            governedArgument: "unknown",
            falsePositiveSource: "preposition-translation",
        }),
        {
            kind: "relational-nnc-candidate-classification",
            version: 1,
            candidate: "place translation",
            relationalStem: "unknown",
            relationalKind: "locative",
            relationalOption: "option-two",
            governedArgument: "unknown",
            evidenceSource: "",
            falsePositiveSource: "preposition-translation",
            sourceKind: "",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "relational-nnc-needs-nawat-evidence",
                "relational-nnc-kind-recognized",
                "relational-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "locative-temporal nominal output is classified as false positive relational evidence",
        ctx.classifyRelationalNncFalsePositive("locative-temporal-nominal"),
        {
            kind: "relational-nnc-false-positive",
            version: 1,
            source: "locative-temporal-nominal",
            isRelationalNncEvidence: false,
            isPlaceNameEvidence: false,
            isGentilicEvidence: false,
            generationAllowed: false,
            diagnostics: ["relational-nnc-false-positive-source"],
            antiConflationRules: ctx.getRelationalNncAntiConflationRules(),
        }
    );

    s.eq(
        "relational NNC metadata carries anti-conflation rules",
        ctx.getRelationalNncAntiConflationRules(),
        [
            "relational NNC boundary metadata is not generation",
            "ordinary NNC fixtures are not relational NNC fixture evidence",
            "open-stem ordinary NNC previews are not relational nounstem data",
            "locative-temporal nominal outputs are not full relational NNC options",
            "preposition or place translations are not Nawat/Pipil relational form evidence",
            "Andrews relational categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("relational NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("relational NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    const optionOneFrame = ctx.buildRelationalNncUsageFrame({
        candidate: "nohuan",
        relationalStem: "huan",
        relationalKind: "associated-entity",
        relationalOption: "1",
        optionGroup: "one-only",
        sourceState: "possessive",
        governedArgument: "possessor",
        evidenceSource: "Andrews structural option one; Nawat surface not generated here",
        translationLabel: "with",
    });
    s.eq(
        "option-one relational usage frame is possessive, non-generative, and supplementary-possessor bounded",
        {
            kind: optionOneFrame.kind,
            lessonRange: optionOneFrame.lessonRange,
            relationalStem: optionOneFrame.relationalStem,
            relationalKind: optionOneFrame.relationalKind,
            relationalOption: optionOneFrame.relationalOption,
            optionGroup: optionOneFrame.optionGroup,
            stemPosition: optionOneFrame.stemPosition,
            sourceState: optionOneFrame.sourceState,
            allowedStates: optionOneFrame.allowedStates,
            supplementaryPossessorOnly: optionOneFrame.supplementaryPossessorOnly,
            supported: optionOneFrame.supported,
            generationContract: optionOneFrame.generationContract,
            translationLabelsAreMorphology: optionOneFrame.translationWarning.labelsAreMorphology,
            diagnostics: optionOneFrame.diagnostics,
        },
        {
            kind: "relational-nnc-usage-frame",
            lessonRange: "45-47",
            relationalStem: "huan",
            relationalKind: "associated-entity",
            relationalOption: "option-one",
            optionGroup: "option-one-only",
            stemPosition: "simple-stem-predicate",
            sourceState: "possessive",
            allowedStates: ["possessive"],
            supplementaryPossessorOnly: true,
            supported: true,
            generationContract: {
                frameGeneratesSurface: false,
                changesSurfaceForms: false,
                newWordGenerationAllowed: false,
            },
            translationLabelsAreMorphology: false,
            diagnostics: [
                "relational-nnc-usage-frame-non-generative",
                "relational-nnc-option-one-supplementary-possessor-only",
                "relational-nnc-translation-label-is-not-morphology",
            ],
        }
    );
    s.no(
        "relational usage frame still does not expose generated forms",
        Object.prototype.hasOwnProperty.call(optionOneFrame, "surfaceForms")
            || Object.prototype.hasOwnProperty.call(optionOneFrame, "generatedForms")
    );

    const invalidOptionOne = ctx.buildRelationalNncUsageFrame({
        candidate: "huan",
        relationalStem: "huan",
        relationalKind: "associated-entity",
        relationalOption: "option-one",
        sourceState: "absolutive",
    });
    s.eq(
        "option-one relational usage rejects absolutive state instead of generating",
        {
            supported: invalidOptionOne.supported,
            sourceState: invalidOptionOne.sourceState,
            diagnostics: invalidOptionOne.diagnostics,
        },
        {
            supported: false,
            sourceState: "absolutive",
            diagnostics: [
                "relational-nnc-usage-frame-non-generative",
                "relational-nnc-option-one-requires-possessive-state",
                "relational-nnc-option-one-supplementary-possessor-only",
            ],
        }
    );

    const impersonalLocativeFrame = ctx.buildRelationalNncUsageFrame({
        candidate: "impersonal locative matrix",
        relationalStem: "n",
        relationalKind: "locative",
        relationalOption: "2",
        optionGroup: "two-only",
        sourceState: "absolutive",
        sourceVoice: "impersonal",
        sourceTense: "imperfecto",
        matrixStem: "n",
        embeddedStem: "source VNC",
    });
    s.eq(
        "option-two impersonal source is modeled as absolutive-state structural metadata only",
        {
            relationalOption: impersonalLocativeFrame.relationalOption,
            optionGroup: impersonalLocativeFrame.optionGroup,
            stemPosition: impersonalLocativeFrame.stemPosition,
            sourceState: impersonalLocativeFrame.sourceState,
            sourceMapping: impersonalLocativeFrame.sourceMapping,
            supported: impersonalLocativeFrame.supported,
            generationAllowed: impersonalLocativeFrame.generationAllowed,
        },
        {
            relationalOption: "option-two",
            optionGroup: "option-two-only",
            stemPosition: "integrated-matrix",
            sourceState: "absolutive",
            sourceMapping: {
                sourceVoice: "impersonal",
                sourceTense: "imperfecto",
                sourceSubject: "",
                possessorPrefix: "",
                possessorFromSourceSubject: false,
                stateRule: "impersonal-source-absolutive-only",
            },
            supported: true,
            generationAllowed: false,
        }
    );

    const invalidImpersonalLocativeFrame = ctx.buildRelationalNncUsageFrame({
        candidate: "impersonal locative matrix",
        relationalStem: "n",
        relationalKind: "locative",
        relationalOption: "2",
        sourceState: "possessive",
        sourceVoice: "impersonal",
    });
    s.eq(
        "option-two impersonal source rejects possessive-state frame",
        {
            supported: invalidImpersonalLocativeFrame.supported,
            sourceState: invalidImpersonalLocativeFrame.sourceState,
            diagnostics: invalidImpersonalLocativeFrame.diagnostics,
        },
        {
            supported: false,
            sourceState: "possessive",
            diagnostics: [
                "relational-nnc-usage-frame-non-generative",
                "relational-nnc-impersonal-source-requires-absolutive-state",
            ],
        }
    );

    return s;
}

module.exports = { run };
