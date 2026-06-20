"use strict";

/**
 * Tests for src/core/nnc/compound/compound.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_compound");

    s.eq(
        "Lessons 31-32 compound/affective NNC API is exported",
        [
            typeof ctx.buildCompoundNncAffectiveBoundaryMetadata,
            typeof ctx.classifyCompoundNncAffectiveCandidate,
            typeof ctx.classifyCompoundNncAffectiveFalsePositive,
            typeof ctx.getCompoundNncAntiConflationRules,
            typeof ctx.buildLesson31CompoundNounstemPursuitFrame,
            typeof ctx.getLesson31CompoundNounstemSubsectionInventory,
            typeof ctx.buildLesson32AffectiveNncPursuitFrame,
            typeof ctx.getLesson32AffectiveNncSubsectionInventory,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildCompoundNncAffectiveBoundaryMetadata();
    s.eq(
        "compound/affective NNC boundary is explicit and non-generative",
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
            kind: "compound-nnc-affective-boundary",
            lessons: [31, 32],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncCompoundParserMetadata: true,
                hasCompoundNncGeneration: false,
                hasAffectiveNncGeneration: false,
                hasStaticAffectiveData: false,
                treatsVncCompoundAstAsNncEvidence: false,
                changesOrdinaryNncGeneration: false,
                changesVncGeneration: false,
            },
            questionFields: [
                "headStem",
                "embeddedStem",
                "compoundKind",
                "affectiveValue",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "outer lexical VNC compound stays unconfirmed compound-NNC evidence",
        ctx.classifyCompoundNncAffectiveCandidate({
            candidate: "(shuchi)-(kwi)",
            headStem: "kwi",
            embeddedStem: "shuchi",
            compoundKind: "lexical-embed",
            hasCompoundAst: true,
            sourceKind: "fixture",
            falsePositiveSource: "outer-lexical-embed",
        }),
        {
            kind: "compound-nnc-affective-candidate-classification",
            version: 1,
            candidate: "(shuchi)-(kwi)",
            headStem: "kwi",
            embeddedStem: "shuchi",
            compoundKind: "lexical-embed",
            affectiveValue: "",
            evidenceSource: "",
            falsePositiveSource: "outer-lexical-embed",
            hasCompoundAst: true,
            sourceKind: "fixture",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "compound-nnc-needs-nawat-evidence",
                "vnc-compound-ast-not-nnc-evidence",
                "compound-nnc-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "compound/affective classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyCompoundNncAffectiveCandidate({
                candidate: "(shuchi)-(kwi)",
                headStem: "kwi",
                embeddedStem: "shuchi",
                compoundKind: "lexical-embed",
                falsePositiveSource: "outer-lexical-embed",
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
            unitKind: "compound-nnc",
            routeStage: "classify-boundary",
            generationAllowed: false,
            stemKind: "compound-nounstem-candidate",
            diagnosticId: "compound-nnc-needs-nawat-evidence",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "ordinary NNC fixture is classified as false positive affective evidence",
        ctx.classifyCompoundNncAffectiveFalsePositive("ordinary-nnc-fixture"),
        {
            kind: "compound-nnc-affective-false-positive",
            version: 1,
            source: "ordinary-nnc-fixture",
            isCompoundNncEvidence: false,
            isAffectiveNncEvidence: false,
            generationAllowed: false,
            diagnostics: ["compound-nnc-false-positive-source"],
            antiConflationRules: ctx.getCompoundNncAntiConflationRules(),
        }
    );

    s.eq(
        "compound/affective NNC metadata carries anti-conflation rules",
        ctx.getCompoundNncAntiConflationRules(),
        [
            "VNC compoundAst metadata is not compound NNC generation",
            "outer lexical embeds are not compound nounstem fixture evidence",
            "ordinary NNC fixtures are not affective NNC fixtures",
            "open-stem ordinary NNC previews are not compound NNC evidence",
            "parser punctuation is not a compound NNC schema",
            "Andrews compound/affective categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("compound/affective boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("compound/affective boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    const lesson31Frame = ctx.buildLesson31CompoundNounstemPursuitFrame();
    s.eq(
        "lesson 31 pursuit frame covers every subsection",
        {
            stepNumber: lesson31Frame.stepNumber,
            pdfRefs: lesson31Frame.pdfRefs.length,
            subsectionSections: lesson31Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            plannedArrowIds: lesson31Frame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson31Frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            hitCount: lesson31Frame.hitCount,
            missCount: lesson31Frame.missCount,
            closestPass: lesson31Frame.closestPass,
            generationAllowed: lesson31Frame.generationAllowed,
        },
        {
            stepNumber: 31,
            pdfRefs: 13,
            subsectionSections: [
                "31.1",
                "31.2",
                "31.3",
                "31.4",
                "31.5",
                "31.6",
                "31.7",
                "31.8",
                "31.9",
                "31.10",
                "31.11",
                "31.12",
                "31.13",
            ],
            plannedArrowIds: ["lesson-31-compound-nounstem-audit"],
            firedArrowIds: [["lesson-31-compound-nounstem-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            generationAllowed: false,
        }
    );
    s.eq(
        "lesson 31 pursuit frame records Andrews compound nounstem architecture",
        {
            formula: lesson31Frame.typeFrame.sourceFormula,
            structureTypes: lesson31Frame.typeFrame.structureTypes,
            embedBeforeMatrix: lesson31Frame.typeFrame.embedBeforeMatrix,
            matrixGovernsClass: lesson31Frame.typeFrame.matrixGovernsCompoundNounstemClass,
            embedSources: lesson31Frame.meaningFrame.embedSources,
            roleCount: lesson31Frame.meaningFrame.possibleMeaningRoles.length,
            linkedEmbedOriented: lesson31Frame.possessorFrame.linkedStructureAlwaysEmbedOriented,
            integratedUsuallyMatrix: lesson31Frame.possessorFrame.integratedStructureUsuallyMatrixOriented,
            translationWarning: lesson31Frame.matrixFrame.translationMustNotReverseEmbedAndMatrix,
            embedClassExamples: lesson31Frame.exampleFrame.embedClassesCovered,
            negativeAhAdverbialEmbed: lesson31Frame.exampleFrame.negativeAhMayServeAsAdverbialEmbed,
            prolificMatrixStems: lesson31Frame.uniqueFrame.prolificMatrixStems.map((entry) => entry.stem),
            conjunctiveStructure: lesson31Frame.conjunctiveFrame.structure,
            recursiveTargets: [
                lesson31Frame.recursiveFrame.compoundStemCanFillEmbed,
                lesson31Frame.recursiveFrame.compoundStemCanFillMatrix,
                lesson31Frame.recursiveFrame.compoundStemsCanFillBothSubpositions,
            ],
            specialFunctions: lesson31Frame.specialFunctionFrame.functions.map((entry) => entry.id),
            affinityTargetsBoth: lesson31Frame.pluralStemFrame.affinity.reduplicationMayTargetBoth,
            distributiveTargetsEmbed: lesson31Frame.pluralStemFrame.distributiveVarietal.reduplicationTargetsEmbed,
            routeFrame: {
                kind: lesson31Frame.compoundNounstemRouteFrame.kind,
                sourcePrincipal: lesson31Frame.compoundNounstemRouteFrame.sourcePrincipalNnc.formulaType,
                sourceAdjunct: lesson31Frame.compoundNounstemRouteFrame.sourceAdjunctNnc.formulaType,
                embedRole: lesson31Frame.compoundNounstemRouteFrame.embedRole,
                matrixValence: lesson31Frame.compoundNounstemRouteFrame.matrixValence,
                consumedObjectSlot: lesson31Frame.compoundNounstemRouteFrame.consumedObjectSlot,
                valenceDelta: lesson31Frame.compoundNounstemRouteFrame.valenceDelta,
                finalFormulaShape: lesson31Frame.compoundNounstemRouteFrame.finalFormulaShape,
                finalFormulaShapeDoesNotLicenseRole: lesson31Frame.compoundNounstemRouteFrame.finalFormulaShapeDoesNotLicenseRole,
                routeFrameLicensesObjectSlotOwnership: lesson31Frame.compoundNounstemRouteFrame.routeFrameLicensesObjectSlotOwnership,
                routeFrameOwnsObjectSlotLicensing: lesson31Frame.compoundNounstemRouteFrame.objectSlotOwnership.routeFrameOwnsObjectSlotLicensing,
                objectSlotOwnershipAbsentByNncStateFrame: lesson31Frame.compoundNounstemRouteFrame.objectSlotOwnership.objectSlotOwnershipAbsentByNncStateFrame,
                functionUseOwnsObjectSlots: lesson31Frame.compoundNounstemRouteFrame.objectSlotOwnership.functionUseOwnsObjectSlots,
                sourceRouteFrameRequired: lesson31Frame.compoundNounstemRouteFrame.sourceRouteFrameRequired,
                generationStatus: lesson31Frame.compoundNounstemRouteFrame.generationStatus,
            },
        },
        {
            formula: "NNC + NNC = compound NNC",
            structureTypes: [
                "linked-connective-t",
                "linked-connectiveless",
                "integrated",
            ],
            embedBeforeMatrix: true,
            matrixGovernsClass: true,
            embedSources: ["supplement", "modifier"],
            roleCount: 15,
            linkedEmbedOriented: true,
            integratedUsuallyMatrix: true,
            translationWarning: true,
            embedClassExamples: [
                "tli-in-zero-stem",
                "ti-subclass-1-stem",
                "ti-subclass-2-stem",
            ],
            negativeAhAdverbialEmbed: true,
            prolificMatrixStems: ["ca", "yo"],
            conjunctiveStructure: "conjunct + conjunct",
            recursiveTargets: [true, true, true],
            specialFunctions: [
                "sex-distinction",
                "progeny",
                "fellowship",
            ],
            affinityTargetsBoth: true,
            distributiveTargetsEmbed: true,
            routeFrame: {
                kind: "lesson-31-compound-nounstem-route-frame",
                sourcePrincipal: "CNN",
                sourceAdjunct: "CNN",
                embedRole: "compound-nounstem-embed",
                matrixValence: "compound-nounstem-no-verbal-object-slots",
                consumedObjectSlot: "",
                valenceDelta: {
                    incorporatedObjectSlots: 0,
                    complementSlots: 0,
                    adverbialFunctionSlots: 0,
                    remainingExternalObjectSlots: 0,
                },
                finalFormulaShape: "NNC + NNC = compound NNC",
                finalFormulaShapeDoesNotLicenseRole: true,
                routeFrameLicensesObjectSlotOwnership: false,
                routeFrameOwnsObjectSlotLicensing: false,
                objectSlotOwnershipAbsentByNncStateFrame: true,
                functionUseOwnsObjectSlots: false,
                sourceRouteFrameRequired: true,
                generationStatus: "diagnostic-only-nawat-evidence-required",
            },
        }
    );
    s.eq(
        "lesson 31 pursuit frame has LCM redirect contract",
        {
            routeFamily: lesson31Frame.frames.routeContract.routeFamily,
            routeStage: lesson31Frame.frames.routeContract.routeStage,
            generationAllowed: lesson31Frame.frames.routeContract.generationAllowed,
            unitKind: lesson31Frame.frames.unitFrame.unitKind,
            targetGenerationAllowed: lesson31Frame.frames.routeContract.targetContract.generationAllowed,
            orthographyStatus: lesson31Frame.frames.orthographyFrame.orthographyStatus,
            stemKind: lesson31Frame.frames.stemFrame.stemKind,
            sourceFormula: lesson31Frame.frames.stemFrame.sourceFormula,
            resultClauseKind: lesson31Frame.frames.nuclearClauseFrame.resultClauseKind,
            participantRouteKind: lesson31Frame.frames.participantFrame.compoundNounstemRouteFrame.kind,
            participantOwnershipKind: lesson31Frame.frames.participantFrame.objectSlotOwnership.kind,
        },
        {
            routeFamily: "compound-nnc",
            routeStage: "audit-lesson-31",
            generationAllowed: false,
            unitKind: "compound-nounstem-boundary",
            targetGenerationAllowed: false,
            orthographyStatus: "nawat-evidence-required",
            stemKind: "compound-nounstem",
            sourceFormula: "NNC + NNC = compound NNC",
            resultClauseKind: "compound NNC",
            participantRouteKind: "lesson-31-compound-nounstem-route-frame",
            participantOwnershipKind: "lesson-31-compound-nounstem-object-slot-ownership-frame",
        }
    );

    const lesson32Frame = ctx.buildLesson32AffectiveNncPursuitFrame();
    s.eq(
        "lesson 32 pursuit frame covers every subsection",
        {
            stepNumber: lesson32Frame.stepNumber,
            pdfRefs: lesson32Frame.pdfRefs.length,
            subsectionSections: lesson32Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            plannedArrowIds: lesson32Frame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson32Frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            hitCount: lesson32Frame.hitCount,
            missCount: lesson32Frame.missCount,
            closestPass: lesson32Frame.closestPass,
            generationAllowed: lesson32Frame.generationAllowed,
        },
        {
            stepNumber: 32,
            pdfRefs: 8,
            subsectionSections: [
                "32.1",
                "32.2",
                "32.3",
                "32.4",
                "32.5",
                "32.6",
                "32.7",
                "32.8",
            ],
            plannedArrowIds: ["lesson-32-affective-nnc-audit"],
            firedArrowIds: [["lesson-32-affective-nnc-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            generationAllowed: false,
        }
    );
    s.eq(
        "lesson 32 pursuit frame records Andrews affective NNC architecture",
        {
            attitudeSites: lesson32Frame.overviewFrame.attitudeSites,
            affectiveMatrixInMatrix: lesson32Frame.overviewFrame.affectiveMatrixFillsMatrixSubposition,
            zeroClassMatrices: lesson32Frame.zeroClassFrame.matrixStems.map((entry) => [entry.stem, entry.classResult]),
            lexicalClassShift: lesson32Frame.zeroClassFrame.lexicalizedSpecialMeaningMayShiftToTiClass,
            classDependentMatrices: lesson32Frame.classDependentFrame.matrixStems.map((entry) => entry.stem),
            zeroEmbedYieldsZero: lesson32Frame.classDependentFrame.zeroEmbedYieldsZeroClassCompound,
            zolRestriction: lesson32Frame.zolFrame.embedRestriction,
            zolDenominalSources: lesson32Frame.zolFrame.denominalVerbstemSource,
            affinityShape: lesson32Frame.affinityFrame.pluralSubjectShape,
            affinityShortVowel: lesson32Frame.affinityFrame.reduplicatedVowelLength,
            possessiveOptions: lesson32Frame.affinityFrame.possessivePluralDyadRule.options,
            pilValues: lesson32Frame.pilFrame.extendedValues,
            pilChildNobleAmbiguity: lesson32Frame.pilFrame.nobleFrame.childNobleAmbiguityMustBePreserved,
            nonanimateAgreementDiscrepancy: lesson32Frame.nonanimateFrame.numberAgreementDiscrepancyMustBeTracked,
            flawedProcedure: lesson32Frame.flawedSubjectFrame.procedure,
            flawedRestriction: lesson32Frame.flawedSubjectFrame.restrictedToAbsolutiveStateSingularCommonSubject,
        },
        {
            attitudeSites: ["nounstem", "subject-pronoun"],
            affectiveMatrixInMatrix: true,
            zeroClassMatrices: [["pil", "zero"], ["pol", "zero"]],
            lexicalClassShift: true,
            classDependentMatrices: ["tzin", "ton"],
            zeroEmbedYieldsZero: true,
            zolRestriction: "nonanimate nounstems only",
            zolDenominalSources: ["zol-i-hui", "zol-o-a"],
            affinityShape: "reduplicated prefix on affective matrix stem",
            affinityShortVowel: "short",
            possessiveOptions: ["hu-an", "zero-zero"],
            pilValues: ["child", "noble"],
            pilChildNobleAmbiguity: true,
            nonanimateAgreementDiscrepancy: true,
            flawedProcedure: "replace sounded num1 ti/tli/in with irregular silent variant",
            flawedRestriction: true,
        }
    );
    s.eq(
        "lesson 32 pursuit frame has LCM redirect contract",
        {
            routeFamily: lesson32Frame.frames.routeContract.routeFamily,
            routeStage: lesson32Frame.frames.routeContract.routeStage,
            generationAllowed: lesson32Frame.frames.routeContract.generationAllowed,
            unitKind: lesson32Frame.frames.unitFrame.unitKind,
            targetGenerationAllowed: lesson32Frame.frames.routeContract.targetContract.generationAllowed,
            orthographyStatus: lesson32Frame.frames.orthographyFrame.orthographyStatus,
            stemKind: lesson32Frame.frames.stemFrame.stemKind,
            zeroClassMatrices: lesson32Frame.frames.stemFrame.zeroClassMatrices,
            affectiveSites: lesson32Frame.frames.nuclearClauseFrame.affectiveSites,
        },
        {
            routeFamily: "compound-nnc",
            routeStage: "audit-lesson-32",
            generationAllowed: false,
            unitKind: "affective-nnc-boundary",
            targetGenerationAllowed: false,
            orthographyStatus: "nawat-evidence-required",
            stemKind: "compound-affective-nounstem",
            zeroClassMatrices: ["pil", "pol"],
            affectiveSites: ["nounstem", "subject-pronoun"],
        }
    );

    return s;
}

module.exports = { run };
