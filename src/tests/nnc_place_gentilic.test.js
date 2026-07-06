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
            typeof ctx.buildLesson48PlaceGentilicPursuitFrame,
            typeof ctx.getLesson48PlaceGentilicSubsectionInventory,
            typeof ctx.buildPlaceGentilicNncSourceFrame,
            typeof ctx.buildPlaceGentilicNncOperationFrame,
            typeof ctx.getPlaceGentilicNncOperationFrameMismatch,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
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
        "recognized place/gentilic category remains blocked without Andrews source gate",
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
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "place-translation",
            sourceKind: "",
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "place-gentilic-nnc-source-gate-required",
                "place-gentilic-nnc-kind-recognized",
                "place-gentilic-nnc-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "place/gentilic classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyPlaceGentilicNncCandidate({
                candidate: "place translation",
                placeNameSource: "unknown",
                placeGentilicKind: "place-name",
                falsePositiveSource: "place-translation",
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
            unitKind: "place-gentilic-nnc",
            routeStage: "classify-boundary",
            generationAllowed: false,
            stemKind: "place-gentilic-source-candidate",
            diagnosticId: "place-gentilic-nnc-source-gate-required",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "structured Andrews place-name candidate generates through orthography bridge",
        (() => {
            const formulaSlots = Object.freeze({
                placeStem: Object.freeze({ slot: "place-name-stem", structural: "teopan", surface: "teupan" }),
            });
            const sourceFrame = ctx.buildPlaceGentilicNncSourceFrame({
                candidate: "teopan",
                placeNameSource: "teopan",
                placeGentilicKind: "place-name",
                associatedPlace: "teopan",
                sourceGate: "Andrews 48 place-name NNC route",
                sourceKind: "place-name",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "place-name-stem", role: "place-name", formulaValue: "teopan", surface: "teupan" },
                ],
            });
            const operationFrame = ctx.buildPlaceGentilicNncOperationFrame(sourceFrame);
            const classification = ctx.classifyPlaceGentilicNncCandidate({
                candidate: "lying-candidate",
                placeNameSource: "lying-place",
                placeGentilicKind: "place-name",
                associatedPlace: "lying-place",
                sourceGate: "lying gate",
                structuredSource: true,
                sourceKind: "place-name",
                sourceFrame,
                operationFrame,
            });
            return {
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                operationId: classification.operationFrame.operationId,
                formulaStem: classification.formulaSlots.placeStem.surface,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                targetStem: classification.frames.stemFrame.targetStem,
            };
        })(),
        {
            confirmed: true,
            supported: true,
            generationAllowed: true,
            surface: "teupan",
            operationId: "andrews-48-place-gentilic-nnc-realization",
            formulaStem: "teupan",
            diagnostics: [
                "place-gentilic-nnc-andrews-source-generated",
                "place-gentilic-nnc-kind-recognized",
                "place-gentilic-nnc-structured-source",
            ],
            routeStage: "generate-structured-place-gentilic-nnc",
            frameGenerationAllowed: true,
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            targetStem: "teupan",
        }
    );
    s.eq(
        "place/gentilic NNC candidate blocks legacy string gates and contradictory frames",
        (() => {
            const formulaSlots = Object.freeze({
                placeStem: Object.freeze({ slot: "place-name-stem", structural: "teopan", surface: "teupan" }),
            });
            const sourceFrame = ctx.buildPlaceGentilicNncSourceFrame({
                candidate: "teopan",
                placeNameSource: "teopan",
                placeGentilicKind: "place-name",
                associatedPlace: "teopan",
                sourceGate: "Andrews 48 place-name NNC route",
                sourceKind: "place-name",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "place-name-stem", role: "place-name", formulaValue: "teopan", surface: "teupan" },
                ],
            });
            const operationFrame = ctx.buildPlaceGentilicNncOperationFrame(sourceFrame);
            const otherSourceFrame = ctx.buildPlaceGentilicNncSourceFrame({
                candidate: "altepet",
                placeNameSource: "altepet",
                placeGentilicKind: "place-name",
                associatedPlace: "altepet",
                sourceGate: "Andrews 48 place-name NNC route",
                sourceKind: "place-name",
                targetFormulaSlots: Object.freeze({
                    placeStem: Object.freeze({ slot: "place-name-stem", structural: "altepet", surface: "altepet" }),
                }),
                targetSegmentFrames: [
                    { slot: "place-name-stem", role: "place-name", formulaValue: "altepet", surface: "altepet" },
                ],
            });
            const otherOperationFrame = ctx.buildPlaceGentilicNncOperationFrame(otherSourceFrame);
            const originalNormalizer = ctx.normalizePlaceGentilicNncCandidateSurface;
            if (typeof ctx.normalizePlaceGentilicNncCandidateSurface === "function") {
                ctx.normalizePlaceGentilicNncCandidateSurface = () => "poison";
            }
            const poisoned = ctx.classifyPlaceGentilicNncCandidate({
                candidate: "poison",
                placeNameSource: "poison",
                placeGentilicKind: "place-name",
                associatedPlace: "poison",
                sourceGate: "poison",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            if (originalNormalizer) {
                ctx.normalizePlaceGentilicNncCandidateSurface = originalNormalizer;
            }
            const stringOnly = ctx.classifyPlaceGentilicNncCandidate({
                candidate: "teopan",
                placeNameSource: "teopan",
                placeGentilicKind: "place-name",
                associatedPlace: "teopan",
                sourceGate: "Andrews 48 place-name NNC route",
                structuredSource: true,
            });
            const missingOperation = ctx.classifyPlaceGentilicNncCandidate({
                candidate: "teopan",
                placeNameSource: "teopan",
                placeGentilicKind: "place-name",
                associatedPlace: "teopan",
                sourceGate: "Andrews 48 place-name NNC route",
                structuredSource: true,
                sourceFrame,
            });
            const contradictory = ctx.classifyPlaceGentilicNncCandidate({
                candidate: "teopan",
                placeNameSource: "teopan",
                placeGentilicKind: "place-name",
                associatedPlace: "teopan",
                sourceGate: "Andrews 48 place-name NNC route",
                structuredSource: true,
                sourceFrame,
                operationFrame: otherOperationFrame,
            });
            const changedStrings = ctx.classifyPlaceGentilicNncCandidate({
                candidate: "changed",
                placeNameSource: "changed",
                placeGentilicKind: "place-name",
                associatedPlace: "changed",
                sourceGate: "changed",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            return {
                poisoned: {
                    surface: poisoned.surface,
                    targetStem: poisoned.frames.stemFrame.targetStem,
                },
                stringOnly: {
                    generationAllowed: stringOnly.generationAllowed,
                    surface: stringOnly.surface,
                    diagnostics: stringOnly.diagnostics,
                },
                missingOperation: missingOperation.diagnostics,
                contradictory: contradictory.diagnostics,
                changedStrings: {
                    surface: changedStrings.surface,
                    targetStem: changedStrings.frames.stemFrame.targetStem,
                },
            };
        })(),
        {
            poisoned: {
                surface: "teupan",
                targetStem: "teupan",
            },
            stringOnly: {
                generationAllowed: false,
                surface: "",
                diagnostics: [
                    "place-gentilic-nnc-source-frame-required",
                    "place-gentilic-nnc-kind-recognized",
                    "place-gentilic-nnc-unconfirmed",
                ],
            },
            missingOperation: [
                "place-gentilic-nnc-operation-frame-required",
                "place-gentilic-nnc-kind-recognized",
                "place-gentilic-nnc-unconfirmed",
            ],
            contradictory: [
                "place-gentilic-nnc-contradictory-source-frame",
                "place-gentilic-nnc-kind-recognized",
                "place-gentilic-nnc-unconfirmed",
            ],
            changedStrings: {
                surface: "teupan",
                targetStem: "teupan",
            },
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
            "place, profession, or gentilic translations are not orthography-bridge form evidence",
            "Andrews place-name and gentilic categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    s.no("place/gentilic NNC boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("place/gentilic NNC boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    s.eq(
        "Lesson 48 pursuit frame covers every Andrews place/gentilic subsection",
        (() => {
            const inventory = ctx.getLesson48PlaceGentilicSubsectionInventory();
            const frame = ctx.buildLesson48PlaceGentilicPursuitFrame();
            return {
                kind: frame.kind,
                stepNumber: frame.stepNumber,
                routeStage: frame.routeStage,
                pdfRefCount: frame.pdfRefs.length,
                firstPdfRef: frame.pdfRefs[0],
                lastPdfRef: frame.pdfRefs[frame.pdfRefs.length - 1],
                subsectionCount: inventory.length,
                firstSubsection: inventory[0].andrewsSection,
                lastSubsection: inventory[inventory.length - 1].andrewsSection,
                plannedArrowIds: frame.plannedArrows.map((arrow) => arrow.id),
                firedArrowIds: frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
                hitCount: frame.hitCount,
                missCount: frame.missCount,
                generationAllowed: frame.generationAllowed,
                closestPass: frame.closestPass,
                remainingGapsMentionUniqueReference: frame.remainingGaps.some((gap) => /unique-reference/.test(gap)),
            };
        })(),
        {
            kind: "lesson-48-place-gentilic-pursuit-frame",
            stepNumber: 48,
            routeStage: "audit-lesson-48",
            pdfRefCount: 13,
            firstPdfRef: "Andrews Lesson 48.1",
            lastPdfRef: "Andrews Lesson 48.13",
            subsectionCount: 27,
            firstSubsection: "48.1",
            lastSubsection: "48.13",
            plannedArrowIds: ["lesson-48-place-gentilic-audit"],
            firedArrowIds: [["lesson-48-place-gentilic-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionUniqueReference: true,
        }
    );
    s.eq(
        "Lesson 48 frame records place groups, gentilic routes, and extension boundaries",
        (() => {
            const frame = ctx.buildLesson48PlaceGentilicPursuitFrame();
            return {
                placeFunctions: frame.placeNameFrame.functions,
                uniqueReference: frame.placeNameFrame.uniqueSociallyDesignatedReference,
                topographicalWarning: frame.placeNameFrame.topographicalFeatureIsNotPlaceNameByDefault,
                placeGroupKeys: frame.placeGroupsFrame.groups.map((group) => group.group),
                nFormations: frame.placeGroupsFrame.groups[0].formationTypes,
                panCrossing: frame.placeGroupsFrame.groups[1].crossingOrFordingMeaningPossible,
                coCAmbiguity: frame.placeGroupsFrame.groups[2].placeNamePlusAffectiveCanBeAmbiguousAfterSilentReplacement,
                gentilicFormationIds: frame.gentilicFrame.formations.map((formation) => formation.id),
                gentilicCount: frame.gentilicFrame.principalFormationCount,
                spellingAmbiguity: frame.gentilicFrame.notesFrame.defectiveTraditionalSpellingCanHideTlanVsTlah,
                incorporationWarning: frame.extensionsFrame.incorporationFrame.associatedEntityVersusGentilicAnalysisRequiresCare,
                collectivityVariants: frame.extensionsFrame.collectivityFrame.possessiveNum1Variants,
                professionStates: frame.extensionsFrame.professionFrame.states,
                generationBoundary: frame.currentEngineBoundary,
                orthographySlotScoped: frame.frames?.orthographyFrame?.slotScopedOrthographyRequiredBeforeVisibleNawatSurface,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            placeFunctions: ["ordinary-nnc", "adverbial-nnc", "adjectival-nnc"],
            uniqueReference: true,
            topographicalWarning: true,
            placeGroupKeys: ["n-group", "pan-group", "co-c-group", "tlah-group", "tzalan-group", "ti-tlan-group", "chan-group"],
            nFormations: [
                "nominalized-imperfect-predicate-active-or-nonactive",
                "ya-n-perfective-core",
                "ma-n-place-of-area",
                "tla-n-place-in-vicinity",
                "ca-n-non-vnc-nounstem",
                "preterit-agentive-general-use",
                "action-noun-with-distant-past-ca",
            ],
            panCrossing: true,
            coCAmbiguity: true,
            gentilicFormationIds: [
                "nonlocative-absolutive",
                "two-clause-concatenate",
                "preterit-agentive-place",
                "ca-matrix-from-place-name",
            ],
            gentilicCount: 4,
            spellingAmbiguity: true,
            incorporationWarning: true,
            collectivityVariants: ["zero", "uh"],
            professionStates: ["absolutive", "possessive"],
            generationBoundary: {
                placeGentilicBoundaryMetadataImplemented: true,
                placeGentilicUsageFrameImplemented: true,
                placeNameUniqueReferenceDiagnosticOnly: true,
                placeNameGroupInventoryDiagnosticOnly: true,
                gentilicFormationInventoryDiagnosticOnly: true,
                gentilicCollectivityDiagnosticOnly: true,
                professionTitleExtensionDiagnosticOnly: true,
                parserDetectionImplemented: false,
                staticPlaceDataImplemented: false,
                staticGentilicDataImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson48GenerationImplemented: false,
            },
            orthographySlotScoped: true,
            grammarRouteStage: "audit-lesson-48",
            diagnosticIds: ["place-gentilic-nnc-lesson-48-diagnostic-partial", "place-gentilic-nnc-source-gated"],
        }
    );

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
    s.eq(
        "place-name usage frames carry stem and nuclear-clause LCM frames",
        {
            routeStage: placeNameFrame.frames.routeContract.routeStage,
            stemKind: placeNameFrame.frames.stemFrame.stemKind,
            nuclearKind: placeNameFrame.frames.nuclearClauseFrame.kind,
            generationAllowed: placeNameFrame.frames.routeContract.generationAllowed,
        },
        {
            routeStage: "describe-usage-frame",
            stemKind: "place-gentilic-nounstem",
            nuclearKind: "place-gentilic-nnc-usage-frame",
            generationAllowed: false,
        }
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
