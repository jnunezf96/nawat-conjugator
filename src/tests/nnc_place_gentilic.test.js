"use strict";

/**
 * Tests for src/core/nnc/place_gentilic/place_gentilic.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_place_gentilic");

    s.eq(
        "Lesson 48 place/gentilic NNC API is exported",
        [
            typeof ctx.buildPlaceGentilicNncBoundaryMetadata,
            typeof ctx.classifyPlaceGentilicNncCandidate,
            typeof ctx.classifyPlaceGentilicNncFalsePositive,
            typeof ctx.buildPlaceGentilicNncUsageFrame,
            typeof ctx.getPlaceGentilicNncAntiConflationRules,
        ],
        ["function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildPlaceGentilicNncBoundaryMetadata();
    s.eq(
        "place/gentilic NNC boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "place-gentilic-nnc-boundary",
            lesson: 48,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasOrdinaryNncGeneration: true,
                hasRelationalNncBoundary: true,
                hasPlaceGentilicUsageFrame: true,
                hasPlaceNameNncGeneration: false,
                hasGentilicNncGeneration: false,
                hasStaticPlaceData: false,
                hasStaticGentilicData: false,
                hasConfirmedFixtureData: false,
                changesOrdinaryNncGeneration: false,
                changesRelationalNncGeneration: false,
                changesNominalizationGeneration: false,
                changesRouteBehavior: false,
                treatsPlaceTranslationsAsEvidence: false,
                treatsProfessionLabelsAsEvidence: false,
            },
            questionFields: [
                "placeNameSource",
                "gentilicSource",
                "placeGentilicKind",
                "associatedPlace",
                "collectivity",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized place/gentilic category remains unconfirmed without Nawat evidence",
        ctx.classifyPlaceGentilicNncCandidate({
            candidate: "place translation",
            placeNameSource: "unknown",
            placeGentilicKind: "place-name",
            associatedPlace: "unknown",
            falsePositiveSource: "place-translation",
        }),
        {
            kind: "place-gentilic-nnc-candidate-classification",
            version: 1,
            candidate: "place translation",
            placeNameSource: "unknown",
            gentilicSource: "",
            placeGentilicKind: "place-name",
            associatedPlace: "unknown",
            collectivity: "",
            evidenceSource: "",
            falsePositiveSource: "place-translation",
            sourceKind: "",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "place-gentilic-nnc-needs-nawat-evidence",
                "place-gentilic-nnc-kind-recognized",
                "place-gentilic-nnc-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "locative-temporal nominal output is not place-name NNC evidence",
        ctx.classifyPlaceGentilicNncFalsePositive("locative-temporal-nominal"),
        {
            kind: "place-gentilic-nnc-false-positive",
            version: 1,
            source: "locative-temporal-nominal",
            isPlaceNameNncEvidence: false,
            isGentilicNncEvidence: false,
            isCalendarNameEvidence: false,
            generationAllowed: false,
            diagnostics: ["place-gentilic-nnc-false-positive-source"],
            antiConflationRules: ctx.getPlaceGentilicNncAntiConflationRules(),
        }
    );

    s.eq(
        "place/gentilic NNC metadata carries anti-conflation rules",
        ctx.getPlaceGentilicNncAntiConflationRules(),
        [
            "place-name/gentilic NNC boundary metadata is not generation",
            "ordinary NNC fixtures are not place-name or gentilic fixture evidence",
            "open-stem ordinary NNC previews are not place-name or gentilic data",
            "locative-temporal nominal outputs are not place-name NNC evidence",
            "relational NNC boundary metadata is not place-name or gentilic evidence",
            "place, profession, or gentilic translations are not Nawat/Pipil form evidence",
            "Andrews place-name and gentilic categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("place/gentilic NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("place/gentilic NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    const placeNameFrame = ctx.buildPlaceGentilicNncUsageFrame({
        candidate: "Atenco-style place-name",
        placeNameSource: "Atenco",
        placeGentilicKind: "place-name",
        usage: "adverbial",
        placeGroup: "co",
        subjectReference: "unique",
        embeddedStem: "water/beach source",
        translationLabel: "at/on",
    });
    s.eq(
        "place-name frame records unique adverbialized-subject contract without generating forms",
        {
            kind: placeNameFrame.kind,
            lesson: placeNameFrame.lesson,
            placeGentilicKind: placeNameFrame.placeGentilicKind,
            usage: placeNameFrame.usage,
            placeGroup: placeNameFrame.placeGroup,
            placeMatrix: placeNameFrame.placeMatrix,
            placeNameContract: placeNameFrame.placeNameContract,
            supported: placeNameFrame.supported,
            generationContract: placeNameFrame.generationContract,
            translationLabelsAreMorphology: placeNameFrame.translationWarning.labelsAreMorphology,
            diagnostics: placeNameFrame.diagnostics,
        },
        {
            kind: "place-gentilic-nnc-usage-frame",
            lesson: 48,
            placeGentilicKind: "place-name",
            usage: "adverbial-nnc",
            placeGroup: "co-c-group",
            placeMatrix: "co/c",
            placeNameContract: {
                adverbializedSubjectPronoun: true,
                uniqueReferenceRequired: true,
                subjectReference: "unique-socially-designated-place",
                contextualLocativeContrast: "ordinary adverbialized locative NNC has context-chosen reference",
                topographicalFeatureIsPlaceName: false,
                topographicalFeatureMayEmbedInPlaceName: true,
                functions: ["ordinary-nnc", "adverbial-nnc", "adjectival-nnc"],
            },
            supported: true,
            generationContract: {
                frameGeneratesSurface: false,
                changesSurfaceForms: false,
                newWordGenerationAllowed: false,
            },
            translationLabelsAreMorphology: false,
            diagnostics: [
                "place-gentilic-nnc-usage-frame-non-generative",
                "place-gentilic-nnc-translation-label-is-not-morphology",
            ],
        }
    );
    s.no(
        "place-name usage frame does not expose generated forms",
        Object.prototype.hasOwnProperty.call(placeNameFrame, "surfaceForms")
            || Object.prototype.hasOwnProperty.call(placeNameFrame, "generatedForms")
    );

    const contextualLocativeFrame = ctx.buildPlaceGentilicNncUsageFrame({
        candidate: "atenco as ordinary locative relation",
        placeGentilicKind: "place-name",
        usage: "adverbial",
        placeGroup: "co",
        subjectReference: "context-chosen",
    });
    s.eq(
        "context-chosen locative relation is not treated as a place-name",
        {
            supported: contextualLocativeFrame.supported,
            subjectReference: contextualLocativeFrame.placeNameContract.subjectReference,
            diagnostics: contextualLocativeFrame.diagnostics,
        },
        {
            supported: false,
            subjectReference: "context-chosen-locative-relation",
            diagnostics: [
                "place-gentilic-nnc-usage-frame-non-generative",
                "place-name-nnc-requires-unique-social-reference",
            ],
        }
    );

    const twoClauseGentilicFrame = ctx.buildPlaceGentilicNncUsageFrame({
        candidate: "place-name + tlaca",
        placeGentilicKind: "gentilic",
        gentilicFormation: "two-clause",
        sourcePlaceName: "place-name NNC",
        associatedPlace: "confirmed place-name source required",
        headNounstem: "tlaca",
        state: "absolutive",
    });
    s.eq(
        "gentilic two-clause frame keeps place-name supplement separate from the absolutive head",
        {
            placeGentilicKind: twoClauseGentilicFrame.placeGentilicKind,
            gentilicFormation: twoClauseGentilicFrame.gentilicFormation,
            allowedStates: twoClauseGentilicFrame.allowedStates,
            gentilicContract: twoClauseGentilicFrame.gentilicContract,
            supported: twoClauseGentilicFrame.supported,
            generationAllowed: twoClauseGentilicFrame.generationAllowed,
        },
        {
            placeGentilicKind: "gentilic",
            gentilicFormation: "two-clause-concatenate",
            allowedStates: ["absolutive"],
            gentilicContract: {
                semanticRole: "human-associated-with-place",
                formation: "two-clause-concatenate",
                headNounstem: "tlaca",
                clauseStructure: "place-name-adjoined-to-absolutive-head-nnc",
                matrixStem: "",
                relationToAssociatedEntity: "",
                possessiveNum1Variants: [],
                adjectivalUseAllowed: false,
            },
            supported: true,
            generationAllowed: false,
        }
    );

    const panEcaGentilicFrame = ctx.buildPlaceGentilicNncUsageFrame({
        candidate: "pan-e-ca gentilic formation",
        placeGentilicKind: "gentilic",
        gentilicFormation: "pan-e-ca",
        sourcePlaceName: "pan place-name",
        state: "absolutive",
    });
    s.eq(
        "pan-e-ca gentilic frame is distinct from pan-ca associated-entity structure",
        {
            gentilicFormation: panEcaGentilicFrame.gentilicFormation,
            relationToAssociatedEntity: panEcaGentilicFrame.gentilicContract.relationToAssociatedEntity,
            diagnostics: panEcaGentilicFrame.diagnostics,
        },
        {
            gentilicFormation: "ca-matrix-pan-e-ca",
            relationToAssociatedEntity: "gentilic pan-e-ca, not associated-entity pan-ca",
            diagnostics: [
                "place-gentilic-nnc-usage-frame-non-generative",
                "gentilic-pan-e-ca-distinct-from-associated-entity-pan-ca",
            ],
        }
    );

    const collectivityFrame = ctx.buildPlaceGentilicNncUsageFrame({
        candidate: "gentilic collectivity",
        placeGentilicKind: "gentilic-collective",
        gentilicFormation: "collectivity",
        gentilicSource: "confirmed gentilic source required",
        state: "possessive",
    });
    s.eq(
        "gentilic collectivity frame records yo matrix and possessive num1 variants without generating",
        {
            placeGentilicKind: collectivityFrame.placeGentilicKind,
            allowedStates: collectivityFrame.allowedStates,
            gentilicContract: collectivityFrame.gentilicContract,
            supported: collectivityFrame.supported,
            diagnostics: collectivityFrame.diagnostics,
        },
        {
            placeGentilicKind: "gentilic-collective",
            allowedStates: ["absolutive", "possessive"],
            gentilicContract: {
                semanticRole: "collective-body-or-characteristic-of-people",
                formation: "collectivity-yo",
                headNounstem: "",
                clauseStructure: "",
                matrixStem: "yo",
                relationToAssociatedEntity: "",
                possessiveNum1Variants: ["zero", "uh"],
                adjectivalUseAllowed: true,
            },
            supported: true,
            diagnostics: [
                "place-gentilic-nnc-usage-frame-non-generative",
                "gentilic-collectivity-yo-matrix",
            ],
        }
    );

    return s;
}

module.exports = { run };
