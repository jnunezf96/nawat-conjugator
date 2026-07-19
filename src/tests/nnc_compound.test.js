"use strict";

/**
 * Tests for src/core/nnc/compound/compound.mjs
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
            typeof ctx.buildCompoundNncAffectiveSourceFrame,
            typeof ctx.buildCompoundNncAffectiveOperationFrame,
            typeof ctx.getCompoundNncAffectiveOperationFrameMismatch,
            typeof ctx.buildLesson31CompoundNounstemPursuitFrame,
            typeof ctx.getLesson31CompoundNounstemSubsectionInventory,
            typeof ctx.buildLesson32AffectiveNncPursuitFrame,
            typeof ctx.getLesson32AffectiveNncSubsectionInventory,
            typeof ctx.getLesson32PilChildNncSideRows,
            typeof ctx.buildLesson32PilChildNncSideSourceFrame,
            typeof ctx.buildLesson32PilChildNncSideOperationFrame,
            typeof ctx.generateLesson32PilChildNncSideOutput,
            typeof ctx.generateLesson32PilChildNncSideOutputs,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildCompoundNncAffectiveBoundaryMetadata();
    s.eq(
        "compound/affective NNC boundary is explicit and Andrews source-gated",
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
                hasCompoundNncGeneration: true,
                hasAffectiveNncGeneration: true,
                hasGeneralAffectiveNncGeneration: false,
                hasPilChildNncSideGeneration: true,
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
                "compound-nnc-source-gate-required",
                "vnc-compound-ast-not-nnc-evidence",
                "compound-nnc-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "structured compound NNC source generates through Andrews slot order and orthography bridge",
        (() => {
            const sourceFrame = ctx.buildCompoundNncAffectiveSourceFrame({
                candidate: "NNC(kal)+NNC(tan)",
                headStem: "tan",
                embeddedStem: "kal",
                compoundKind: "compound-nounstem",
            });
            const operationFrame = ctx.buildCompoundNncAffectiveOperationFrame(sourceFrame);
            const classification = ctx.classifyCompoundNncAffectiveCandidate({
                candidate: "poison",
                headStem: "poison",
                embeddedStem: "poison",
                compoundKind: "compound-nounstem",
                sourceFrame,
                operationFrame,
            });
            return {
                kind: classification.kind,
                compoundKind: classification.compoundKind,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                surfaceForms: classification.surfaceForms,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                resultSurface: classification.frames.resultFrame.surface,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                formulaSlots: {
                    embedded: classification.formulaSlots.embeddedStem.surface,
                    head: classification.formulaSlots.headStem.surface,
                },
                operationId: classification.operationFrame.operationId,
                stemFrame: {
                    matrix: classification.frames.stemFrame.matrix,
                    embed: classification.frames.stemFrame.embed,
                    embedBeforeMatrix: classification.frames.stemFrame.embedBeforeMatrix,
                    matrixGovernsCompoundNounstemClass: classification.frames.stemFrame.matrixGovernsCompoundNounstemClass,
                },
            };
        })(),
        {
            kind: "compound-nnc-affective-candidate-classification",
            compoundKind: "compound-nounstem",
            generationAllowed: true,
            surface: "kaltan",
            surfaceForms: ["kaltan"],
            diagnostics: [
                "compound-nnc-andrews-source-generated",
                "compound-nnc-no-compound-ast",
                "compound-nnc-structured-source",
            ],
            routeStage: "generate-structured-compound",
            frameGenerationAllowed: true,
            resultSurface: "kaltan",
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            formulaSlots: {
                embedded: "kal",
                head: "tan",
            },
            operationId: "andrews-31-compound-nounstem-source-realization",
            stemFrame: {
                matrix: "tan",
                embed: "kal",
                embedBeforeMatrix: true,
                matrixGovernsCompoundNounstemClass: true,
            },
        }
    );
    s.eq(
        "structured compound NNC candidate blocks string-only and contradictory generation",
        (() => {
            const sourceFrame = ctx.buildCompoundNncAffectiveSourceFrame({
                candidate: "NNC(kal)+NNC(tan)",
                headStem: "tan",
                embeddedStem: "kal",
                compoundKind: "compound-nounstem",
            });
            const operationFrame = ctx.buildCompoundNncAffectiveOperationFrame(sourceFrame);
            const otherSourceFrame = ctx.buildCompoundNncAffectiveSourceFrame({
                candidate: "NNC(shuchi)+NNC(kwi)",
                headStem: "kwi",
                embeddedStem: "shuchi",
                compoundKind: "compound-nounstem",
            });
            const otherOperationFrame = ctx.buildCompoundNncAffectiveOperationFrame(otherSourceFrame);
            const originalNormalizer = ctx.normalizeCompoundNncSurfacePart;
            if (typeof ctx.normalizeCompoundNncSurfacePart === "function") {
                ctx.normalizeCompoundNncSurfacePart = () => "poison";
            }
            const poisoned = ctx.classifyCompoundNncAffectiveCandidate({
                candidate: "poison",
                headStem: "poison",
                embeddedStem: "poison",
                compoundKind: "compound-nounstem",
                sourceFrame,
                operationFrame,
            });
            if (originalNormalizer) {
                ctx.normalizeCompoundNncSurfacePart = originalNormalizer;
            }
            const stringOnly = ctx.classifyCompoundNncAffectiveCandidate({
                candidate: "NNC(kal)+NNC(tan)",
                headStem: "tan",
                embeddedStem: "kal",
                compoundKind: "compound-nounstem",
            });
            const missingOperation = ctx.classifyCompoundNncAffectiveCandidate({
                candidate: "NNC(kal)+NNC(tan)",
                headStem: "tan",
                embeddedStem: "kal",
                compoundKind: "compound-nounstem",
                sourceFrame,
            });
            const contradictory = ctx.classifyCompoundNncAffectiveCandidate({
                candidate: "NNC(kal)+NNC(tan)",
                headStem: "tan",
                embeddedStem: "kal",
                compoundKind: "compound-nounstem",
                sourceFrame,
                operationFrame: otherOperationFrame,
            });
            const changedStrings = ctx.classifyCompoundNncAffectiveCandidate({
                candidate: "changed",
                headStem: "changed",
                embeddedStem: "changed",
                compoundKind: "compound-nounstem",
                sourceFrame,
                operationFrame,
            });
            return {
                poisoned: {
                    surface: poisoned.surface,
                    matrix: poisoned.frames.stemFrame.matrix,
                    embed: poisoned.frames.stemFrame.embed,
                    resultSurface: poisoned.frames.resultFrame.surface,
                },
                stringOnly: {
                    generationAllowed: stringOnly.generationAllowed,
                    diagnostics: stringOnly.diagnostics,
                    surface: stringOnly.surface || "",
                },
                missingOperation: missingOperation.diagnostics,
                contradictory: contradictory.diagnostics,
                changedStrings: {
                    surface: changedStrings.surface,
                    matrix: changedStrings.frames.stemFrame.matrix,
                    embed: changedStrings.frames.stemFrame.embed,
                },
            };
        })(),
        {
            poisoned: {
                surface: "kaltan",
                matrix: "tan",
                embed: "kal",
                resultSurface: "kaltan",
            },
            stringOnly: {
                generationAllowed: false,
                diagnostics: [
                    "compound-nnc-affective-source-frame-required",
                    "compound-nnc-no-compound-ast",
                    "compound-nnc-unconfirmed",
                ],
                surface: "",
            },
            missingOperation: [
                "compound-nnc-affective-operation-frame-required",
                "compound-nnc-no-compound-ast",
                "compound-nnc-unconfirmed",
            ],
            contradictory: [
                "compound-nnc-affective-contradictory-source-frame",
                "compound-nnc-no-compound-ast",
                "compound-nnc-unconfirmed",
            ],
            changedStrings: {
                surface: "kaltan",
                matrix: "tan",
                embed: "kal",
            },
        }
    );
    s.eq(
        "Lesson 32 p294 pil NNC-side rows generate slot-aware output",
        (() => {
            const generated = ctx.generateLesson32PilChildNncSideOutputs();
            const first = generated.entries[0];
            const fourth = generated.entries[3];
            const last = generated.entries[8];
            return {
                rowCount: generated.rowCount,
                generationAllowed: generated.generationAllowed,
                routeStage: generated.frames.routeContract.routeStage,
                surfaces: generated.entries.map((entry) => entry.surface),
                formulas: generated.entries.map((entry) => entry.structuralFormula),
                firstSlots: {
                    subject: first.formulaSlots.pers1Pers2.surface,
                    stateOwner: first.formulaSlots.possessiveState.owner,
                    stateSurface: first.formulaSlots.possessiveState.surface,
                    predicateInside: first.formulaSlots.predicateStem.insideParentheses,
                    connectorOwner: first.formulaSlots.num1Num2.owner,
                    connectorSurface: first.formulaSlots.num1Num2.surface,
                    connectorNotTense: first.formulaSlots.num1Num2.notTense,
                },
                fourthSlots: {
                    stateStructural: fourth.formulaSlots.possessiveState.structural,
                    stateSurface: fourth.formulaSlots.possessiveState.surface,
                    predicateSurface: fourth.formulaSlots.predicateStem.surface,
                    connectorSurface: fourth.formulaSlots.num1Num2.surface,
                },
                lastSlots: {
                    predicateSurface: last.formulaSlots.predicateStem.surface,
                    connectorSurface: last.formulaSlots.num1Num2.surface,
                    formulaFamily: last.frames.nuclearClauseFrame.formulaFamily,
                },
                allNoTense: generated.entries.every((entry) => entry.frames.nuclearClauseFrame.hasTensePosition === false),
                ordinaryGateUnchanged: generated.frames.routeContract.targetContract.noOrdinaryNncGenerationGateChange,
            };
        })(),
        {
            rowCount: 9,
            generationAllowed: true,
            routeStage: "generate-lesson-32-pil-child-nnc-side-set",
            surfaces: [
                "annupilwan",
                "nupilwantzitzinwan",
                "nupilwantzitzin",
                "inpijpilwantzitzin",
                "pipiltin",
                "ukichpipiltin",
                "siwapipiltin",
                "tipiltzinti",
                "piltunti",
            ],
            formulas: [
                "#an-0+n-o(pil)hu-an#",
                "#0-0+n-o(pil-hu-an-tzi-tzin)hu-an#",
                "#0-0+n-o(pil-hu-an-tzi-tzin)0-[sq0]#",
                "#0-0+i-m(pih-pil-hu-an-tzi-tzin)0-[sq0]#",
                "#0-0(pi-pil)t-in#",
                "#0-0(oquich-pi-pil)t-in#",
                "#0-0(cihua-pi-pil)t-in#",
                "#ti-0(pil-tzin)tli-0#",
                "#0-0(pil-ton)tli-0#",
            ],
            firstSlots: {
                subject: "an",
                stateOwner: "predicate",
                stateSurface: "nu",
                predicateInside: true,
                connectorOwner: "subject",
                connectorSurface: "wan",
                connectorNotTense: true,
            },
            fourthSlots: {
                stateStructural: "i-m",
                stateSurface: "in",
                predicateSurface: "pijpilwantzitzin",
                connectorSurface: "",
            },
            lastSlots: {
                predicateSurface: "piltun",
                connectorSurface: "ti",
                formulaFamily: "absolutive-state NNC",
            },
            allNoTense: true,
            ordinaryGateUnchanged: true,
        }
    );
    s.eq(
        "Lesson 32 p294 pil NNC-side row consumes typed source and operation frames instead of row strings",
        (() => {
            const rows = ctx.getLesson32PilChildNncSideRows();
            const firstSourceFrame = ctx.buildLesson32PilChildNncSideSourceFrame(rows[0]);
            const firstOperationFrame = ctx.buildLesson32PilChildNncSideOperationFrame(firstSourceFrame);
            const otherSourceFrame = ctx.buildLesson32PilChildNncSideSourceFrame(rows[3]);
            const otherOperationFrame = ctx.buildLesson32PilChildNncSideOperationFrame(otherSourceFrame);
            const originalNormalizer = ctx.normalizeCompoundNncSurfacePart;
            if (typeof ctx.normalizeCompoundNncSurfacePart === "function") {
                ctx.normalizeCompoundNncSurfacePart = () => "poison";
            }
            const poisoned = ctx.generateLesson32PilChildNncSideOutput({
                id: "poison-row",
                formula: "#poison(formula)#",
                predicateStem: "poison",
                state: "absolutive",
            }, {
                sourceFrame: firstSourceFrame,
                operationFrame: firstOperationFrame,
            });
            if (originalNormalizer) {
                ctx.normalizeCompoundNncSurfacePart = originalNormalizer;
            }
            const stringOnly = ctx.generateLesson32PilChildNncSideOutput(rows[0].id);
            const missingOperation = ctx.generateLesson32PilChildNncSideOutput(rows[0], {
                sourceFrame: firstSourceFrame,
            });
            const contradictory = ctx.generateLesson32PilChildNncSideOutput(rows[0], {
                sourceFrame: firstSourceFrame,
                operationFrame: otherOperationFrame,
            });
            const changedStrings = ctx.generateLesson32PilChildNncSideOutput({
                ...rows[0],
                formula: "#changed(formula)#",
                predicateStem: "changed",
            }, {
                sourceFrame: firstSourceFrame,
                operationFrame: firstOperationFrame,
            });
            return {
                poisoned: {
                    surface: poisoned.surface,
                    formula: poisoned.structuralFormula,
                    sourceStem: poisoned.frames.stemFrame.sourceStem,
                    targetStem: poisoned.frames.stemFrame.targetStem,
                    operationId: poisoned.operationFrame?.operationId || "",
                },
                stringOnly: stringOnly.diagnostics,
                missingOperation: missingOperation.diagnostics,
                contradictory: contradictory.diagnostics,
                changedStrings: {
                    surface: changedStrings.surface,
                    formula: changedStrings.structuralFormula,
                    sourceStem: changedStrings.frames.stemFrame.sourceStem,
                },
            };
        })(),
        {
            poisoned: {
                surface: "annupilwan",
                formula: "#an-0+n-o(pil)hu-an#",
                sourceStem: "pil",
                targetStem: "pil",
                operationId: "andrews-32-6-pil-child-nnc-side-row-realization",
            },
            stringOnly: ["lesson-32-pil-child-nnc-side-source-frame-required"],
            missingOperation: ["lesson-32-pil-child-nnc-side-operation-frame-required"],
            contradictory: ["lesson-32-pil-child-nnc-side-contradictory-source-frame"],
            changedStrings: {
                surface: "annupilwan",
                formula: "#an-0+n-o(pil)hu-an#",
                sourceStem: "pil",
            },
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
            diagnosticId: "compound-nnc-source-gate-required",
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
            "Andrews compound/affective categories are architecture, not Classical surface authority",
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
                generationStatus: "andrews-logic-generated",
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
            orthographyStatus: "orthography-bridge-required",
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
            orthographyStatus: "orthography-bridge-required",
            stemKind: "compound-affective-nounstem",
            zeroClassMatrices: ["pil", "pol"],
            affectiveSites: ["nounstem", "subject-pronoun"],
        }
    );

    return s;
}

module.exports = { run };
