"use strict";

/**
 * Tests for src/core/nnc/nominalization/nominalization.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("nnc_nominalization");

    s.eq(
        "Lessons 35-39 nominalization boundary API is exported",
        [
            typeof ctx.buildNominalizationBoundaryMetadata,
            typeof ctx.classifyNominalizationBoundaryCandidate,
            typeof ctx.classifyNominalizationFalsePositive,
            typeof ctx.getNominalizationBoundaryAntiConflationRules,
            typeof ctx.buildNominalizationBoundarySourceFrame,
            typeof ctx.buildNominalizationBoundaryOperationFrame,
            typeof ctx.getNominalizationBoundaryOperationFrameMismatch,
            typeof ctx.buildLesson35PreteritAgentivePursuitFrame,
            typeof ctx.getLesson35PreteritAgentiveSubsectionInventory,
            typeof ctx.buildLesson36NominalizedVncPursuitFrame,
            typeof ctx.getLesson36NominalizedVncSubsectionInventory,
            typeof ctx.buildLesson37DeverbalNounstemPursuitFrame,
            typeof ctx.getLesson37DeverbalNounstemSubsectionInventory,
            typeof ctx.buildLesson38ImpersonalPatientivePursuitFrame,
            typeof ctx.getLesson38ImpersonalPatientiveSubsectionInventory,
            typeof ctx.buildLesson39PatientiveOperationsPursuitFrame,
            typeof ctx.getLesson39PatientiveOperationsSubsectionInventory,
            typeof ctx.getAndrewsCnvCnnOperationalLayerKeys,
            typeof ctx.getAndrewsCnvCnnOperationalLayer,
            typeof ctx.getAndrewsCnvCnnOperationalLayerExpectedSections,
            typeof ctx.auditAndrewsCnvCnnOperationalLayerCoverage,
            typeof ctx.auditAllAndrewsCnvCnnOperationalLayerCoverage,
            typeof ctx.buildAndrewsCnvCnnOperationalSourceFrame,
            typeof ctx.buildAndrewsCnvCnnOperationalOperationFrame,
            typeof ctx.getAndrewsCnvCnnOperationalFrameMismatch,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildNominalizationBoundaryMetadata();
    s.eq(
        "nominalization boundary is explicit, partial, and non-generative",
        {
            kind: boundary.kind,
            lessons: boundary.lessons,
            status: boundary.status,
            grammarAuthority: boundary.grammarAuthority,
            orthographyAuthority: boundary.orthographyAuthority,
            targetAuthority: boundary.targetAuthority,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "nominalization-boundary",
            lessons: [35, 36, 37, 38, 39],
            status: "partial",
            grammarAuthority: "Andrews PDF Lessons 35-39",
            orthographyAuthority: "Modern Nawat/Pipil orthography and confirmed orthographic realization examples",
            targetAuthority: "Andrews grammar rules with Nawat/Pipil orthographic realization",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasGeneratedNominalSurfaces: true,
                hasGeneratedSLisActionNominalSurfaces: true,
                hasNominalizationProfile: true,
                hasPatientiveFamilyProfile: true,
                hasOwnerhoodGeneration: false,
                hasDeverbalLizZGeneration: false,
                hasFullPatientiveFamilyGeneration: false,
                hasStaticNominalizedVncData: false,
                changesGeneratedSurfaces: false,
                changesOrdinaryNncGeneration: false,
                changesVncGeneration: false,
            },
            questionFields: [
                "nominalizationKind",
                "sourceVnc",
                "stemUse",
                "semanticRole",
                "evidenceSource",
            ],
        }
    );
    const preteritAgentiveOperationalLayer = ctx.getAndrewsCnvCnnOperationalLayer("agentivo-preterito");
    const sustantivoVerbalOperationalLayer = ctx.getAndrewsCnvCnnOperationalLayer("sustantivo-verbal");
    const patientiveOperationalLayer = ctx.getAndrewsCnvCnnOperationalLayer("patientivo");
    const instrumentiveOperationalLayer = ctx.getAndrewsCnvCnnOperationalLayer("instrumentivo");
    const adjectivalOperationalLayer = ctx.getAndrewsCnvCnnOperationalLayer("calificativo-instrumentivo");
    const locativeOperationalLayer = ctx.getAndrewsCnvCnnOperationalLayer("locativo-temporal");
    const locativeAgentiveOperationalLayer = ctx.getAndrewsCnvCnnOperationalLayer("locativo-agentivo-preterito");
    s.eq(
        "Andrews CNV-to-CNN labels expose operational children rather than broad label-only routes",
        {
            keyCount: ctx.getAndrewsCnvCnnOperationalLayerKeys().length,
            preteritAgentiveTransition: preteritAgentiveOperationalLayer.formulaTransition,
            preteritAgentiveCountAtLeast: preteritAgentiveOperationalLayer.operationCount >= 16,
            preteritAgentiveHasOldPerson: preteritAgentiveOperationalLayer.operationIds.includes("preterit-agentive-old-woman-man"),
            preteritAgentiveHasVocativeBoundary: preteritAgentiveOperationalLayer.operationIds.includes("preterit-agentive-vocative-particle-boundary"),
            sustantivoCountAtLeast: sustantivoVerbalOperationalLayer.operationCount >= 22,
            sustantivoHasCompoundEmbed: sustantivoVerbalOperationalLayer.operationIds.includes("active-action-compound-embed"),
            sustantivoHasImpersonalTlaBranch: sustantivoVerbalOperationalLayer.operationIds.includes("impersonal-action-tla-source"),
            sustantivoHasMultipleNucleus: sustantivoVerbalOperationalLayer.operationIds.includes("active-action-multiple-nucleus-supplement"),
            patientiveCountAtLeast: patientiveOperationalLayer.operationCount >= 62,
            patientiveHasImpersonalHumanTe: patientiveOperationalLayer.operationIds.includes("impersonal-patientive-projective-human-te-source"),
            patientiveHasHumanTeHuaBranch: patientiveOperationalLayer.operationIds.includes("impersonal-patientive-human-te-hua-branch"),
            patientiveHasPossessiveComplementMatrix: patientiveOperationalLayer.operationIds.includes("patientive-possessive-complement-desire-matrix"),
            patientiveHasCharacteristicOmission: patientiveOperationalLayer.operationIds.includes("patientive-characteristic-property-embed-continuation"),
            instrumentiveCountAtLeast: instrumentiveOperationalLayer.operationCount >= 5,
            instrumentiveHasReflexiveCuring: instrumentiveOperationalLayer.operationIds.includes("instrumentive-reflexive-curing-means"),
            adjectivalCountAtLeast: adjectivalOperationalLayer.operationCount >= 38,
            adjectivalHasSynonymTriplet: adjectivalOperationalLayer.operationIds.includes("synonymous-adjectival-triplet"),
            adjectivalHasDenominalLoop: adjectivalOperationalLayer.operationIds.includes("denominal-verbstem-compound-nounstem-adjectival"),
            locativeCountAtLeast: locativeOperationalLayer.operationCount >= 73,
            locativeHasRelationalTime: locativeOperationalLayer.operationIds.includes("relational-time-function"),
            locativeHasImperfectImpersonal: locativeOperationalLayer.operationIds.includes("imperfect-impersonal-locative-result"),
            locativeHasSeemingCompoundMatrix: locativeOperationalLayer.operationIds.includes("yolloco-compound-embed-relational"),
            locativeHasOptionThreeRelational: locativeOperationalLayer.operationIds.includes("relational-pan-connective-t-compound"),
            locativeAgentiveCountAtLeast: locativeAgentiveOperationalLayer.operationCount >= 7,
            locativeAgentiveHasActiveAction: locativeAgentiveOperationalLayer.operationIds.includes("active-action-locative-46-3-1-b"),
            patientiveSourceKeysIncludeSourceFamily: patientiveOperationalLayer.sourceRequirementKeys.includes("sourceFamily"),
            patientiveTransformKeysIncludeYoTlMatrix: patientiveOperationalLayer.transformKeys.includes("yoTlMatrix"),
            patientiveBuildKeysIncludeTargetShell: patientiveOperationalLayer.buildKeys.includes("targetShell"),
        },
        {
            keyCount: 16,
            preteritAgentiveTransition: "CNV->CNN",
            preteritAgentiveCountAtLeast: true,
            preteritAgentiveHasOldPerson: true,
            preteritAgentiveHasVocativeBoundary: true,
            sustantivoCountAtLeast: true,
            sustantivoHasCompoundEmbed: true,
            sustantivoHasImpersonalTlaBranch: true,
            sustantivoHasMultipleNucleus: true,
            patientiveCountAtLeast: true,
            patientiveHasImpersonalHumanTe: true,
            patientiveHasHumanTeHuaBranch: true,
            patientiveHasPossessiveComplementMatrix: true,
            patientiveHasCharacteristicOmission: true,
            instrumentiveCountAtLeast: true,
            instrumentiveHasReflexiveCuring: true,
            adjectivalCountAtLeast: true,
            adjectivalHasSynonymTriplet: true,
            adjectivalHasDenominalLoop: true,
            locativeCountAtLeast: true,
            locativeHasRelationalTime: true,
            locativeHasImperfectImpersonal: true,
            locativeHasSeemingCompoundMatrix: true,
            locativeHasOptionThreeRelational: true,
            locativeAgentiveCountAtLeast: true,
            locativeAgentiveHasActiveAction: true,
            patientiveSourceKeysIncludeSourceFamily: true,
            patientiveTransformKeysIncludeYoTlMatrix: true,
            patientiveBuildKeysIncludeTargetShell: true,
        }
    );
    const operationalCoverageAudit = ctx.auditAllAndrewsCnvCnnOperationalLayerCoverage();
    const locativeCoverageAudit = ctx.auditAndrewsCnvCnnOperationalLayerCoverage("locativo-temporal");
    s.eq(
        "Andrews operational children have explicit section coverage audit",
        {
            complete: operationalCoverageAudit.complete,
            missingSectionCount: operationalCoverageAudit.missingSectionCount,
            labelCount: operationalCoverageAudit.labelCount,
            locativeComplete: locativeCoverageAudit.complete,
            locativeExpectedAtLeast: locativeCoverageAudit.expectedSectionCount >= 70,
            locativeIncludesRelational47: locativeCoverageAudit.expectedSections.includes("47.5.2"),
        },
        {
            complete: true,
            missingSectionCount: 0,
            labelCount: 16,
            locativeComplete: true,
            locativeExpectedAtLeast: true,
            locativeIncludesRelational47: true,
        }
    );
    const operationalLogicAudit = ctx.auditAllAndrewsCnvCnnOperationalLogicCoverage();
    const activeActionLizPlan = ctx.getAndrewsCnvCnnOperationalSuboperationPlan("active-action-liz");
    const patientiveLogicAudit = ctx.auditAndrewsCnvCnnOperationalLogicCoverage("patientivo");
    s.eq(
        "Andrews operational children compile to executable logic plans rather than display-only metadata",
        {
            complete: operationalLogicAudit.complete,
            operationCount: operationalLogicAudit.operationCount,
            executablePlanCount: operationalLogicAudit.executablePlanCount,
            surfaceCapableCount: operationalLogicAudit.surfaceCapableCount,
            diagnosticOnlyCount: operationalLogicAudit.diagnosticOnlyCount,
            missingPlanCount: operationalLogicAudit.missingPlanIds.length,
            activeActionLiz: {
                operationId: activeActionLizPlan.operationId,
                executionKind: activeActionLizPlan.executionKind,
                executableLogic: activeActionLizPlan.executableLogic,
                canAttemptSurface: activeActionLizPlan.canAttemptSurface,
                requirementSlots: activeActionLizPlan.requirementChecks.map((check) => check.slot),
                transformSlots: activeActionLizPlan.transformSteps.map((step) => step.slot),
                buildSlots: activeActionLizPlan.buildSteps.map((step) => step.slot),
                spellingAuthority: activeActionLizPlan.structuralBoundary.outputSpellingAuthority,
            },
            patientiveExecutionKinds: patientiveLogicAudit.executionKinds,
        },
        {
            complete: true,
            operationCount: 238,
            executablePlanCount: 238,
            surfaceCapableCount: 140,
            diagnosticOnlyCount: 82,
            missingPlanCount: 0,
            activeActionLiz: {
                operationId: "active-action-liz",
                executionKind: "affixal-stem-operation",
                executableLogic: true,
                canAttemptSurface: true,
                requirementSlots: ["sourceCore", "projectiveSources"],
                transformSlots: ["classicalLiz", "reflexiveSource", "classAlternations"],
                buildSlots: ["targetShell", "targetRole"],
                spellingAuthority: "Nawat/Pipil orthography bridge",
            },
            patientiveExecutionKinds: [
                "adjectival-function-route",
                "compound-route",
                "diagnostic-boundary",
                "patientive-source",
            ],
        }
    );
    s.eq(
        "Andrews CNV-to-CNN operational children execute source-gated suboperation logic",
        (() => {
            const buildTyped = (options = {}) => {
                const sourceFrame = ctx.buildAndrewsCnvCnnOperationalSourceFrame(options);
                const operationFrame = ctx.buildAndrewsCnvCnnOperationalOperationFrame(sourceFrame);
                return ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                    ...options,
                    sourceStem: "poison",
                    sourceCore: "poison",
                    sourceFrame,
                    operationFrame,
                });
            };
            const futureAgentive = ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                nominalKind: "agentivo-futuro",
                sourceTense: "futuro",
                sourceFrame: ctx.buildAndrewsCnvCnnOperationalSourceFrame({
                    nominalKind: "agentivo-futuro",
                    sourceStem: "nemi",
                    sourceTense: "futuro",
                }),
                operationFrame: ctx.buildAndrewsCnvCnnOperationalOperationFrame(ctx.buildAndrewsCnvCnnOperationalSourceFrame({
                    nominalKind: "agentivo-futuro",
                    sourceStem: "nemi",
                    sourceTense: "futuro",
                })),
            });
            const actionLiz = buildTyped({
                operationId: "active-action-liz",
                sourceStem: "tla-piya",
                sourceTense: "futuro",
            });
            const missingSource = ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                operationId: "active-action-liz",
                sourceTense: "futuro",
            });
            const patientive = buildTyped({
                nominalKind: "patientivo",
                patientiveFamily: "perfectivo",
                sourceStem: "mach",
                patientiveStem: "mach",
                sourceTense: "perfectivo",
            });
            return {
                futureAgentive: {
                    operationId: futureAgentive.operationId,
                    status: futureAgentive.status,
                    executionKind: futureAgentive.executionKind,
                    executableLogic: futureAgentive.executableLogic,
                    operationApplied: futureAgentive.operationApplied,
                    formulaEcho: futureAgentive.formulaEcho,
                    surface: futureAgentive.surface,
                    noClassicalSurfaceImport: futureAgentive.orthography.noClassicalSurfaceImport,
                },
                actionLiz: {
                    operationId: actionLiz.operationId,
                    status: actionLiz.status,
                    operationApplied: actionLiz.operationApplied,
                    formulaEcho: actionLiz.formulaEcho,
                    surface: actionLiz.surface,
                },
                missingSource: {
                    operationId: missingSource.operationId,
                    status: missingSource.status,
                    generationAllowed: missingSource.generationAllowed,
                    missingRequirements: missingSource.missingRequirements,
                    diagnostics: missingSource.diagnostics,
                },
                patientive: {
                    operationId: patientive.operationId,
                    status: patientive.status,
                    operationApplied: patientive.operationApplied,
                    formulaEcho: patientive.formulaEcho,
                    surface: patientive.surface,
                },
            };
        })(),
        {
            futureAgentive: {
                operationId: "future-agentive-restricted-use",
                status: "andrews-logic-generated",
                executionKind: "affixal-stem-operation",
                executableLogic: true,
                operationApplied: "keep-future-s-inside-agentive-nounstem",
                formulaEcho: "CNV(nemi) -> #Ø-Ø(nemis)ki#",
                surface: "nemiski",
                noClassicalSurfaceImport: true,
            },
            actionLiz: {
                operationId: "active-action-liz",
                status: "andrews-logic-generated",
                operationApplied: "append-active-action-liz-to-source-core",
                formulaEcho: "CNV(tla-piya) -> #Ø-Ø(tla-piyaliz)Ø#",
                surface: "tapiyalis",
            },
            missingSource: {
                operationId: "active-action-liz",
                status: "source-gated",
                generationAllowed: false,
                missingRequirements: ["sourceFrame"],
                diagnostics: [
                    "andrews-cnv-cnn-suboperation-recognized",
                    "andrews-cnv-cnn-suboperation-source-gated",
                    "andrews-cnv-cnn-operational-source-frame-required",
                    "missing-sourceFrame",
                ],
            },
            patientive: {
                operationId: "perfective-patientive",
                status: "andrews-logic-generated",
                operationApplied: "derive-perfective-active-core-to-patientive-nounstem",
                formulaEcho: "CNV(mach) -> #Ø-Ø(mach)t#",
                surface: "macht",
            },
        }
    );
    s.eq(
        "Andrews CNV-to-CNN operational suboperation blocks legacy strings and contradictory frames",
        (() => {
            const sourceFrame = ctx.buildAndrewsCnvCnnOperationalSourceFrame({
                operationId: "active-action-liz",
                sourceStem: "tla-piya",
                sourceTense: "futuro",
            });
            const operationFrame = ctx.buildAndrewsCnvCnnOperationalOperationFrame(sourceFrame);
            const stringOnly = ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                operationId: "active-action-liz",
                sourceStem: "tla-piya",
                sourceTense: "futuro",
            });
            const missingOperation = ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                operationId: "active-action-liz",
                sourceFrame,
            });
            const contradictorySource = ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                operationId: "active-action-liz",
                sourceFrame: {
                    ...sourceFrame,
                    sourceSignature: "poison",
                },
                operationFrame,
            });
            const contradictoryTarget = ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                operationId: "active-action-liz",
                sourceFrame,
                operationFrame: {
                    ...operationFrame,
                    targetSurface: "poison",
                },
            });
            const oldSurface = ctx.realizeAndrewsCnvCnnOperationalSurface;
            if (typeof ctx.realizeAndrewsCnvCnnOperationalSurface === "function") {
                ctx.realizeAndrewsCnvCnnOperationalSurface = () => "poison";
            }
            const monkeypatched = ctx.buildAndrewsCnvCnnOperationalSuboperationFrame({
                operationId: "active-action-liz",
                sourceStem: "poison",
                sourceCore: "poison",
                formulaEcho: "poison",
                result: "poison",
                surface: "poison",
                sourceFrame,
                operationFrame,
            });
            if (oldSurface) {
                ctx.realizeAndrewsCnvCnnOperationalSurface = oldSurface;
            }
            return {
                directSurface: ctx.realizeAndrewsCnvCnnOperationalSurface("tla-piyaliz"),
                framedSurface: ctx.realizeAndrewsCnvCnnOperationalSurface("tla-piyaliz", { operationFrame }),
                stringOnly: {
                    status: stringOnly.status,
                    generationAllowed: stringOnly.generationAllowed,
                    diagnostics: stringOnly.diagnostics,
                },
                missingOperation: {
                    status: missingOperation.status,
                    diagnostics: missingOperation.diagnostics,
                },
                contradictorySource: {
                    status: contradictorySource.status,
                    diagnostics: contradictorySource.diagnostics,
                },
                contradictoryTarget: {
                    status: contradictoryTarget.status,
                    diagnostics: contradictoryTarget.diagnostics,
                },
                monkeypatched: {
                    status: monkeypatched.status,
                    surface: monkeypatched.surface,
                    formulaEcho: monkeypatched.formulaEcho,
                    sourceStem: monkeypatched.source.stem,
                },
            };
        })(),
        {
            directSurface: "",
            framedSurface: "tapiyalis",
            stringOnly: {
                status: "source-gated",
                generationAllowed: false,
                diagnostics: [
                    "andrews-cnv-cnn-suboperation-recognized",
                    "andrews-cnv-cnn-suboperation-source-gated",
                    "andrews-cnv-cnn-operational-source-frame-required",
                    "missing-sourceFrame",
                ],
            },
            missingOperation: {
                status: "source-gated",
                diagnostics: [
                    "andrews-cnv-cnn-suboperation-recognized",
                    "andrews-cnv-cnn-suboperation-source-gated",
                    "andrews-cnv-cnn-operational-operation-frame-required",
                    "missing-operationFrame",
                ],
            },
            contradictorySource: {
                status: "source-gated",
                diagnostics: [
                    "andrews-cnv-cnn-suboperation-recognized",
                    "andrews-cnv-cnn-suboperation-source-gated",
                    "andrews-cnv-cnn-operational-contradictory-source-frame",
                ],
            },
            contradictoryTarget: {
                status: "source-gated",
                diagnostics: [
                    "andrews-cnv-cnn-suboperation-recognized",
                    "andrews-cnv-cnn-suboperation-source-gated",
                    "andrews-cnv-cnn-operational-contradictory-target-frame",
                ],
            },
            monkeypatched: {
                status: "andrews-logic-generated",
                surface: "tapiyalis",
                formulaEcho: "CNV(tla-piya) -> #Ø-Ø(tla-piyaliz)Ø#",
                sourceStem: "tla-piya",
            },
        }
    );

    s.eq(
        "generated patientivo surface remains unconfirmed full patientive evidence",
        ctx.classifyNominalizationBoundaryCandidate({
            candidate: "tamachti",
            nominalizationKind: "patientive-family",
            sourceVnc: "-(mati)",
            semanticRole: "patient/result",
            hasNominalizationProfile: true,
            hasPatientiveFamilyProfile: true,
            falsePositiveSource: "patientive-family-profile",
        }),
        {
            kind: "nominalization-boundary-candidate-classification",
            version: 1,
            candidate: "tamachti",
            nominalizationKind: "patientive-family",
            sourceVnc: "-(mati)",
            stemUse: "",
            semanticRole: "patient/result",
            evidenceSource: "",
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "patientive-family-profile",
            hasNominalizationProfile: true,
            hasPatientiveFamilyProfile: true,
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "nominalization-source-gate-required",
                "nominalization-category-recognized",
                "nominalization-profile-is-metadata-only",
                "patientive-family-profile-is-partial",
                "nominalization-false-positive-source",
            ],
            boundary,
        }
    );
    s.eq(
        "nominalization classifiers expose the LCM grammar frame contract",
        (() => {
            const classification = ctx.classifyNominalizationBoundaryCandidate({
                candidate: "tamachti",
                nominalizationKind: "patientive-family",
                sourceVnc: "-(mati)",
                hasNominalizationProfile: true,
                falsePositiveSource: "patientive-family-profile",
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
            unitKind: "nominalization",
            routeStage: "classify-boundary",
            generationAllowed: false,
            stemKind: "nominalization-source-candidate",
            diagnosticId: "nominalization-source-gate-required",
            enumerableGrammarFrame: false,
        }
    );

    s.eq(
        "structured Andrews nominalization candidate generates through orthography bridge",
        (() => {
            const formulaSlots = Object.freeze({
                objectPrefix: Object.freeze({ slot: "object-prefix", structural: "tla", surface: "ta" }),
                predicateStem: Object.freeze({ slot: "STEM", structural: "piya", surface: "piya" }),
                nominalizer: Object.freeze({ slot: "nominalizer", structural: "liz", surface: "lis" }),
            });
            const sourceFrame = ctx.buildNominalizationBoundarySourceFrame({
                candidate: "tla-piya-liz",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "tla-(piya)",
                stemUse: "deverbal-liz",
                semanticRole: "action/result",
                sourceGate: "Andrews 37.2 structured deverbal -liz route",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "object-prefix", role: "object", formulaValue: "tla", surface: "ta" },
                    { slot: "STEM", role: "predicate", formulaValue: "piya", surface: "piya" },
                    { slot: "nominalizer", role: "deverbal-liz", formulaValue: "liz", surface: "lis" },
                ],
            });
            const operationFrame = ctx.buildNominalizationBoundaryOperationFrame(sourceFrame);
            const classification = ctx.classifyNominalizationBoundaryCandidate({
                candidate: "lying-candidate",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "lying-vnc",
                stemUse: "lying-use",
                semanticRole: "lying-role",
                sourceGate: "lying gate",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            return {
                confirmed: classification.confirmed,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                operationId: classification.operationFrame.operationId,
                formulaSlots: {
                    object: classification.formulaSlots.objectPrefix.surface,
                    stem: classification.formulaSlots.predicateStem.surface,
                    nominalizer: classification.formulaSlots.nominalizer.surface,
                },
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                sourceGate: classification.frames.stemFrame.sourceGate,
            };
        })(),
        {
            confirmed: true,
            generationAllowed: true,
            surface: "tapiyalis",
            operationId: "andrews-35-39-nominalization-boundary-realization",
            formulaSlots: {
                object: "ta",
                stem: "piya",
                nominalizer: "lis",
            },
            diagnostics: [
                "nominalization-andrews-source-generated",
                "nominalization-category-recognized",
                "nominalization-profile-absent",
                "patientive-family-profile-absent",
                "nominalization-structured-source",
            ],
            routeStage: "generate-structured-nominalization",
            frameGenerationAllowed: true,
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            sourceGate: "Andrews 37.2 structured deverbal -liz route",
        }
    );
    s.eq(
        "nominalization boundary candidate blocks legacy string gates and contradictory frames",
        (() => {
            const formulaSlots = Object.freeze({
                objectPrefix: Object.freeze({ slot: "object-prefix", structural: "tla", surface: "ta" }),
                predicateStem: Object.freeze({ slot: "STEM", structural: "piya", surface: "piya" }),
                nominalizer: Object.freeze({ slot: "nominalizer", structural: "liz", surface: "lis" }),
            });
            const sourceFrame = ctx.buildNominalizationBoundarySourceFrame({
                candidate: "tla-piya-liz",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "tla-(piya)",
                stemUse: "deverbal-liz",
                semanticRole: "action/result",
                sourceGate: "Andrews 37.2 structured deverbal -liz route",
                targetFormulaSlots: formulaSlots,
                targetSegmentFrames: [
                    { slot: "object-prefix", role: "object", formulaValue: "tla", surface: "ta" },
                    { slot: "STEM", role: "predicate", formulaValue: "piya", surface: "piya" },
                    { slot: "nominalizer", role: "deverbal-liz", formulaValue: "liz", surface: "lis" },
                ],
            });
            const operationFrame = ctx.buildNominalizationBoundaryOperationFrame(sourceFrame);
            const otherSourceFrame = ctx.buildNominalizationBoundarySourceFrame({
                candidate: "chiwa-z",
                nominalizationKind: "deverbal-z",
                sourceVnc: "chiwa",
                stemUse: "deverbal-z",
                semanticRole: "potential/result",
                sourceGate: "Andrews 37.1 structured deverbal -z route",
                targetFormulaSlots: Object.freeze({
                    predicateStem: Object.freeze({ slot: "STEM", structural: "chiwa", surface: "chiwa" }),
                    nominalizer: Object.freeze({ slot: "nominalizer", structural: "z", surface: "z" }),
                }),
                targetSegmentFrames: [
                    { slot: "STEM", role: "predicate", formulaValue: "chiwa", surface: "chiwa" },
                    { slot: "nominalizer", role: "deverbal-z", formulaValue: "z", surface: "z" },
                ],
            });
            const otherOperationFrame = ctx.buildNominalizationBoundaryOperationFrame(otherSourceFrame);
            const originalNormalizer = ctx.normalizeNominalizationCandidateSurface;
            if (typeof ctx.normalizeNominalizationCandidateSurface === "function") {
                ctx.normalizeNominalizationCandidateSurface = () => "poison";
            }
            const poisoned = ctx.classifyNominalizationBoundaryCandidate({
                candidate: "poison",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "poison",
                stemUse: "poison",
                semanticRole: "poison",
                sourceGate: "poison",
                structuredSource: true,
                sourceFrame,
                operationFrame,
            });
            if (originalNormalizer) {
                ctx.normalizeNominalizationCandidateSurface = originalNormalizer;
            }
            const stringOnly = ctx.classifyNominalizationBoundaryCandidate({
                candidate: "tla-piya-liz",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "tla-(piya)",
                stemUse: "deverbal-liz",
                semanticRole: "action/result",
                sourceGate: "Andrews 37.2 structured deverbal -liz route",
                structuredSource: true,
            });
            const missingOperation = ctx.classifyNominalizationBoundaryCandidate({
                candidate: "tla-piya-liz",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "tla-(piya)",
                stemUse: "deverbal-liz",
                semanticRole: "action/result",
                sourceGate: "Andrews 37.2 structured deverbal -liz route",
                structuredSource: true,
                sourceFrame,
            });
            const contradictory = ctx.classifyNominalizationBoundaryCandidate({
                candidate: "tla-piya-liz",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "tla-(piya)",
                stemUse: "deverbal-liz",
                semanticRole: "action/result",
                sourceGate: "Andrews 37.2 structured deverbal -liz route",
                structuredSource: true,
                sourceFrame,
                operationFrame: otherOperationFrame,
            });
            const changedStrings = ctx.classifyNominalizationBoundaryCandidate({
                candidate: "changed",
                nominalizationKind: "deverbal-liz",
                sourceVnc: "changed",
                stemUse: "changed",
                semanticRole: "changed",
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
                surface: "tapiyalis",
                targetStem: "tapiyalis",
            },
            stringOnly: {
                generationAllowed: false,
                surface: "",
                diagnostics: [
                    "nominalization-source-frame-required",
                    "nominalization-category-recognized",
                    "nominalization-profile-absent",
                    "patientive-family-profile-absent",
                    "nominalization-unconfirmed",
                ],
            },
            missingOperation: [
                "nominalization-operation-frame-required",
                "nominalization-category-recognized",
                "nominalization-profile-absent",
                "patientive-family-profile-absent",
                "nominalization-unconfirmed",
            ],
            contradictory: [
                "nominalization-contradictory-source-frame",
                "nominalization-category-recognized",
                "nominalization-profile-absent",
                "patientive-family-profile-absent",
                "nominalization-unconfirmed",
            ],
            changedStrings: {
                surface: "tapiyalis",
                targetStem: "tapiyalis",
            },
        }
    );

    s.eq(
        "ownerhood category is recognized but requires an Andrews source gate",
        ctx.classifyNominalizationBoundaryCandidate({
            candidate: "ownerhood candidate",
            nominalizationKind: "ownerhood",
            stemUse: "general-use",
            semanticRole: "owner",
        }).diagnostics,
        [
            "nominalization-source-frame-required",
            "nominalization-category-recognized",
            "nominalization-profile-absent",
            "patientive-family-profile-absent",
            "nominalization-unconfirmed",
        ]
    );

    s.eq(
        "Andrews examples remain structural false positives for output surfaces",
        ctx.classifyNominalizationFalsePositive("andrews-example"),
        {
            kind: "nominalization-false-positive",
            version: 1,
            source: "andrews-example",
            isNominalizationEvidence: false,
            isOwnerhoodEvidence: false,
            isDeverbalLizZEvidence: false,
            isFullPatientiveFamilyEvidence: false,
            generationAllowed: false,
            diagnostics: ["nominalization-false-positive-source"],
            antiConflationRules: ctx.getNominalizationBoundaryAntiConflationRules(),
        }
    );

    s.ok(
        "nominalization anti-conflation rules reject generated-surface completion claims",
        ctx.getNominalizationBoundaryAntiConflationRules()
            .some((rule) => rule.includes("not complete Lessons 35-39 coverage"))
    );

    const lesson35Frame = ctx.buildLesson35PreteritAgentivePursuitFrame();
    s.eq(
        "Lesson 35 pursuit frame covers every Andrews preterit-agentive subsection",
        {
            kind: lesson35Frame.kind,
            stepNumber: lesson35Frame.stepNumber,
            aimStatus: lesson35Frame.aimStatus,
            pdfRefs: lesson35Frame.pdfRefs,
            subsectionRefs: lesson35Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson35Frame.generationAllowed,
            closestPass: lesson35Frame.closestPass,
            hitCount: lesson35Frame.hitCount,
            missCount: lesson35Frame.missCount,
        },
        {
            kind: "lesson-35-preterit-agentive-pursuit-frame",
            stepNumber: 35,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 35.1",
                "Andrews Lesson 35.2",
                "Andrews Lesson 35.3",
                "Andrews Lesson 35.4",
                "Andrews Lesson 35.5",
                "Andrews Lesson 35.6",
                "Andrews Lesson 35.7",
                "Andrews Lesson 35.8",
                "Andrews Lesson 35.9",
                "Andrews Lesson 35.10",
                "Andrews Lesson 35.11",
                "Andrews Lesson 35.12",
            ],
            subsectionRefs: [
                "35.1",
                "35.2",
                "35.3",
                "35.4",
                "35.5",
                "35.6",
                "35.7",
                "35.8",
                "35.9",
                "35.10",
                "35.11",
                "35.12",
            ],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
        }
    );
    s.eq(
        "Lesson 35 frame records preterit-agentive architecture and current boundaries",
        {
            process: lesson35Frame.overviewFrame.process,
            lessonKind: lesson35Frame.overviewFrame.lesson35Kind,
            restrictedPreteritFinal: lesson35Frame.absolutiveFrame.preteritTenseMorphAlwaysFinalInRestrictedStem,
            numberAlternation: lesson35Frame.numberPositionFrame.quiAndZeroCanAlternate,
            generalUseFormation: lesson35Frame.generalUseFrame.formation,
            possessiveSingular: lesson35Frame.possessiveStateFrame.singularSubjectNumberDyad,
            compoundAffective: lesson35Frame.compoundEmbedFrame.compoundAffectiveNncsSupportedStructurally,
            oldPersonBoundary: lesson35Frame.oldPersonFrame.distinguishesSimpleNounstemFromPreteritAgentiveStem,
            ownerhoodMatrices: lesson35Frame.ownerhoodFrame.ownerhoodMatrices,
            abundantMatrix: lesson35Frame.abundantOwnerhoodFrame.matrix,
            adverbialFocus: lesson35Frame.vncEmbedAdverbialFrame.adverbialModificationCanFocusSubjectOrObject,
            vncEmbedRouteFrames: lesson35Frame.vncEmbedAdverbialFrame.routeFrames.map((frame) => ({
                kind: frame.kind,
                sourcePrincipal: frame.sourcePrincipalVnc.formulaType,
                sourceAdjunct: frame.sourceAdjunctNnc.formulaType,
                embedRole: frame.embedRole,
                consumedObjectSlot: frame.consumedObjectSlot,
                valenceDelta: frame.valenceDelta,
                finalFormulaShape: frame.finalFormulaShape,
                finalFormulaShapeDoesNotLicenseRole: frame.finalFormulaShapeDoesNotLicenseRole,
                functionUseOwnsObjectSlots: frame.objectSlotOwnership.functionUseOwnsObjectSlots,
                sourceRouteFrameRequired: frame.sourceRouteFrameRequired,
                andrewsSection: frame.andrewsSection,
                generationStatus: frame.generationStatus,
            })),
            participantEmbedRoles: [
                lesson35Frame.frames.participantFrame.incorporatedObjectRouteFrame.embedRole,
                lesson35Frame.frames.participantFrame.incorporatedAdverbRouteFrame.embedRole,
            ],
            routeStage: lesson35Frame.frames.routeContract.routeStage,
            diagnosticId: lesson35Frame.contractDiagnostics[0].id,
        },
        {
            process: "VNC takes on NNC characteristics",
            lessonKind: "preterit-agentive-nnc",
            restrictedPreteritFinal: true,
            numberAlternation: true,
            generalUseFormation: "restricted preterit predicate embed plus (ca)-tl matrix",
            possessiveSingular: "uh-0",
            compoundAffective: true,
            oldPersonBoundary: true,
            ownerhoodMatrices: ["*tla-(-e)", "*tla-(-hua)"],
            abundantMatrix: "*tla-(-yo-a)",
            adverbialFocus: true,
            vncEmbedRouteFrames: [
                {
                    kind: "lesson-35-preterit-agentive-incorporation-route-frame",
                    sourcePrincipal: "CNV",
                    sourceAdjunct: "CNN",
                    embedRole: "incorporated-object",
                    consumedObjectSlot: "obj1",
                    valenceDelta: {
                        incorporatedObjectSlots: 1,
                        adverbialFunctionSlots: 0,
                        remainingExternalObjectSlots: 0,
                    },
                    finalFormulaShape: "preterit-agentive-nounstem-incorporated-in-vnc-matrix",
                    finalFormulaShapeDoesNotLicenseRole: true,
                    functionUseOwnsObjectSlots: false,
                    sourceRouteFrameRequired: true,
                    andrewsSection: "Andrews 35.12",
                    generationStatus: "diagnostic-only-source-gated",
                },
                {
                    kind: "lesson-35-preterit-agentive-incorporation-route-frame",
                    sourcePrincipal: "CNV",
                    sourceAdjunct: "CNN",
                    embedRole: "incorporated-adverb",
                    consumedObjectSlot: "",
                    valenceDelta: {
                        incorporatedObjectSlots: 0,
                        adverbialFunctionSlots: 1,
                        remainingExternalObjectSlots: 0,
                    },
                    finalFormulaShape: "preterit-agentive-nounstem-incorporated-in-vnc-matrix",
                    finalFormulaShapeDoesNotLicenseRole: true,
                    functionUseOwnsObjectSlots: false,
                    sourceRouteFrameRequired: true,
                    andrewsSection: "Andrews 35.12",
                    generationStatus: "diagnostic-only-source-gated",
                },
            ],
            participantEmbedRoles: ["incorporated-object", "incorporated-adverb"],
            routeStage: "audit-lesson-35",
            diagnosticId: "preterit-agentive-diagnostic-partial",
        }
    );
    const lesson36Frame = ctx.buildLesson36NominalizedVncPursuitFrame();
    s.eq(
        "Lesson 36 pursuit frame covers every Andrews nominalized-VNC subsection",
        {
            kind: lesson36Frame.kind,
            stepNumber: lesson36Frame.stepNumber,
            aimStatus: lesson36Frame.aimStatus,
            pdfRefs: lesson36Frame.pdfRefs,
            subsectionRefs: lesson36Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson36Frame.generationAllowed,
            closestPass: lesson36Frame.closestPass,
            hitCount: lesson36Frame.hitCount,
            missCount: lesson36Frame.missCount,
        },
        {
            kind: "lesson-36-nominalized-vnc-pursuit-frame",
            stepNumber: 36,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 36.1",
                "Andrews Lesson 36.2",
                "Andrews Lesson 36.3",
                "Andrews Lesson 36.4",
                "Andrews Lesson 36.5",
                "Andrews Lesson 36.6",
                "Andrews Lesson 36.7",
                "Andrews Lesson 36.8",
                "Andrews Lesson 36.9",
                "Andrews Lesson 36.10",
                "Andrews Lesson 36.11",
                "Andrews Lesson 36.12",
            ],
            subsectionRefs: [
                "36.1",
                "36.2",
                "36.3",
                "36.4",
                "36.5",
                "36.6",
                "36.7",
                "36.8",
                "36.9",
                "36.10",
                "36.11",
                "36.12",
            ],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
        }
    );
    s.eq(
        "Lesson 36 frame records nominalized VNC architecture and action contrasts",
        {
            degrees: lesson36Frame.customaryPresentAgentiveFrame.twoDegreesOfNominalization,
            reanalysisNiFinal: lesson36Frame.customaryPresentAgentiveFrame.reanalysisFrame.customaryPresentNiAlwaysFinalConstituent,
            fullNominalEmbed: lesson36Frame.customaryPresentAgentiveFrame.fullyNominalizedFrame.canFillEmbedSubpositionOfCompoundStem,
            patientivePossessiveAllowed: lesson36Frame.customaryPresentPatientiveFrame.possessiveStateAllowed,
            instrumentiveTwoStems: lesson36Frame.instrumentiveFrame.paradigmRequiresTwoDifferentNominalizedStems,
            presentStateRestriction: lesson36Frame.presentAgentiveFrame.stateRestriction,
            futureSingularDyad: lesson36Frame.futureAgentiveFrame.singularSubjectNumberDyad,
            actionTypes: lesson36Frame.actionNncFrame.types,
            passiveActionSource: lesson36Frame.actionNncFrame.passiveActionFrame.sourceVoice,
            activeActionSubjectToPossessor: lesson36Frame.actionNncFrame.activeActionFrame.sourceSubjectTransformsToPossessor,
            contrastKeepsPreteritSubject: lesson36Frame.actionNncFrame.contrastFrame.preteritAgentiveSourceSubjectRemainsNncSubject,
            routeStage: lesson36Frame.frames.routeContract.routeStage,
            diagnosticId: lesson36Frame.contractDiagnostics[0].id,
        },
        {
            degrees: ["reanalysis", "fully nominalized"],
            reanalysisNiFinal: true,
            fullNominalEmbed: true,
            patientivePossessiveAllowed: false,
            instrumentiveTwoStems: true,
            presentStateRestriction: "absolutive-only",
            futureSingularDyad: "qui-0",
            actionTypes: ["passive-action", "active-action"],
            passiveActionSource: "passive",
            activeActionSubjectToPossessor: true,
            contrastKeepsPreteritSubject: true,
            routeStage: "audit-lesson-36",
            diagnosticId: "nominalized-vnc-diagnostic-partial",
        }
    );
    const lesson37Frame = ctx.buildLesson37DeverbalNounstemPursuitFrame();
    s.eq(
        "Lesson 37 pursuit frame covers every Andrews deverbal-nounstem subsection",
        {
            kind: lesson37Frame.kind,
            stepNumber: lesson37Frame.stepNumber,
            aimStatus: lesson37Frame.aimStatus,
            pdfRefs: lesson37Frame.pdfRefs,
            subsectionRefs: lesson37Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson37Frame.generationAllowed,
            closestPass: lesson37Frame.closestPass,
            hitCount: lesson37Frame.hitCount,
            missCount: lesson37Frame.missCount,
        },
        {
            kind: "lesson-37-deverbal-nounstem-pursuit-frame",
            stepNumber: 37,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 37.1",
                "Andrews Lesson 37.2",
                "Andrews Lesson 37.3",
                "Andrews Lesson 37.4",
                "Andrews Lesson 37.5",
                "Andrews Lesson 37.6",
                "Andrews Lesson 37.7",
                "Andrews Lesson 37.8",
                "Andrews Lesson 37.9",
            ],
            subsectionRefs: [
                "37.1",
                "37.2",
                "37.3",
                "37.4",
                "37.5",
                "37.6",
                "37.7",
                "37.8",
                "37.9",
            ],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
        }
    );
    s.eq(
        "Lesson 37 frame records deverbal architecture and patientive source families",
        {
            derivedFromVncCore: lesson37Frame.deverbalOverviewFrame.derivedFromVncCoreNotPredicate,
            zSuffix: lesson37Frame.activeActionZFrame.suffix,
            lizSuffixalUnit: lesson37Frame.activeActionLizFrame.suffixalUnit,
            potentialPatientDropsObject: lesson37Frame.activeActionParticularsFrame.potentialPatientFrame.transitivePotentialPatientLacksObjectPronoun,
            activePossessorAgent: lesson37Frame.activePassiveActionContrastFrame.activeActionPossessorRepresentsAgent,
            multipleNucleusSupplement: lesson37Frame.multipleNucleusFrame.activeActionNncCanServeAsSupplement,
            patientiveFamilies: lesson37Frame.patientiveOverviewFrame.sourceFamilies,
            passiveBlocksIntransitive: lesson37Frame.passivePatientiveFrame.passiveSourceCannotHaveIntransitiveUltimateSource,
            routeStage: lesson37Frame.frames.routeContract.routeStage,
            diagnosticId: lesson37Frame.contractDiagnostics[0].id,
        },
        {
            derivedFromVncCore: true,
            zSuffix: "z",
            lizSuffixalUnit: "liz",
            potentialPatientDropsObject: true,
            activePossessorAgent: true,
            multipleNucleusSupplement: true,
            patientiveFamilies: [
                "passive-core",
                "impersonal-core",
                "perfective-active-core",
                "imperfective-active-core",
                "verb-root-or-stock",
            ],
            passiveBlocksIntransitive: true,
            routeStage: "audit-lesson-37",
            diagnosticId: "deverbal-nounstem-diagnostic-partial",
        }
    );
    const lesson38Frame = ctx.buildLesson38ImpersonalPatientivePursuitFrame();
    s.eq(
        "Lesson 38 pursuit frame covers every Andrews impersonal-patientive subsection",
        {
            kind: lesson38Frame.kind,
            stepNumber: lesson38Frame.stepNumber,
            aimStatus: lesson38Frame.aimStatus,
            pdfRefs: lesson38Frame.pdfRefs,
            subsectionRefs: lesson38Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson38Frame.generationAllowed,
            closestPass: lesson38Frame.closestPass,
            hitCount: lesson38Frame.hitCount,
            missCount: lesson38Frame.missCount,
        },
        {
            kind: "lesson-38-impersonal-patientive-pursuit-frame",
            stepNumber: 38,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 38.1",
                "Andrews Lesson 38.1.1",
                "Andrews Lesson 38.1.1.a",
                "Andrews Lesson 38.1.1.b",
                "Andrews Lesson 38.1.1.c",
                "Andrews Lesson 38.1.1.d",
                "Andrews Lesson 38.1.2",
                "Andrews Lesson 38.1.3",
                "Andrews Lesson 38.1.3.a",
                "Andrews Lesson 38.1.3.b",
                "Andrews Lesson 38.1.3.c",
                "Andrews Lesson 38.1.4",
                "Andrews Lesson 38.1.4.a",
                "Andrews Lesson 38.1.4.b",
                "Andrews Lesson 38.1.4.c",
                "Andrews Lesson 38.1.5",
                "Andrews Lesson 38.1.6",
                "Andrews Lesson 38.2",
                "Andrews Lesson 38.2.1",
                "Andrews Lesson 38.2.2",
            ],
            subsectionRefs: [
                "38.1",
                "38.1.1",
                "38.1.1.a",
                "38.1.1.b",
                "38.1.1.c",
                "38.1.1.d",
                "38.1.2",
                "38.1.3",
                "38.1.3.a",
                "38.1.3.b",
                "38.1.3.c",
                "38.1.4",
                "38.1.4.a",
                "38.1.4.b",
                "38.1.4.c",
                "38.1.5",
                "38.1.6",
                "38.2",
                "38.2.1",
                "38.2.2",
            ],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
        }
    );
    s.eq(
        "Lesson 38 frame records impersonal patientive routing and compound boundaries",
        {
            sourceCore: lesson38Frame.impersonalPatientiveOverviewFrame.sourceCore,
            passiveImpersonalSplit: lesson38Frame.impersonalPatientiveOverviewFrame.passiveAndImpersonalMustNotBeCollapsed,
            rootPlusYaUsesRoot: lesson38Frame.intransitiveSourceFrame.loSourceFrame.rootPlusYaMayUseRootNotStem,
            reflexiveNe: lesson38Frame.reflexiveSourceFrame.reflexiveObjectUsesShuntlineNe,
            nonhumanProjective: lesson38Frame.projectiveNonhumanSourceFrame.directObjectMustBeNonhuman,
            finalAReplaced: lesson38Frame.projectiveNonhumanSourceFrame.huaSourceFrame.finalAReplacedByI,
            humanTeRoute: lesson38Frame.projectiveTeSourceFrame.usesImpersonalTlaPrefix,
            anomalousTeContrast: lesson38Frame.humanNonhumanContrastFrame.teCanNameNonhumanEntityAsAnomalousPattern,
            translationOverlap: lesson38Frame.translationOverlapFrame.sharedTranslationDoesNotMeanSameStructure,
            compoundModes: lesson38Frame.compoundPatientiveFrame.passiveAndImpersonalPatientivesCanBeCompoundInTwoWays,
            routeStage: lesson38Frame.frames.routeContract.routeStage,
            diagnosticId: lesson38Frame.contractDiagnostics[0].id,
        },
        {
            sourceCore: "impersonal VNC core",
            passiveImpersonalSplit: true,
            rootPlusYaUsesRoot: true,
            reflexiveNe: true,
            nonhumanProjective: true,
            finalAReplaced: true,
            humanTeRoute: true,
            anomalousTeContrast: true,
            translationOverlap: true,
            compoundModes: true,
            routeStage: "audit-lesson-38",
            diagnosticId: "impersonal-patientive-diagnostic-partial",
        }
    );
    const lesson39Frame = ctx.buildLesson39PatientiveOperationsPursuitFrame();
    s.eq(
        "Lesson 39 pursuit frame covers every Andrews patientive-operations subsection",
        {
            kind: lesson39Frame.kind,
            stepNumber: lesson39Frame.stepNumber,
            aimStatus: lesson39Frame.aimStatus,
            pdfRefs: lesson39Frame.pdfRefs,
            subsectionRefs: lesson39Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson39Frame.generationAllowed,
            closestPass: lesson39Frame.closestPass,
            hitCount: lesson39Frame.hitCount,
            missCount: lesson39Frame.missCount,
        },
        {
            kind: "lesson-39-patientive-operations-pursuit-frame",
            stepNumber: 39,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 39.1",
                "Andrews Lesson 39.1.1",
                "Andrews Lesson 39.1.2",
                "Andrews Lesson 39.1.3",
                "Andrews Lesson 39.2",
                "Andrews Lesson 39.2.1",
                "Andrews Lesson 39.2.2",
                "Andrews Lesson 39.3",
                "Andrews Lesson 39.3.1",
                "Andrews Lesson 39.3.2",
                "Andrews Lesson 39.3.3",
                "Andrews Lesson 39.3.4",
                "Andrews Lesson 39.3.5",
                "Andrews Lesson 39.3.6",
                "Andrews Lesson 39.4",
                "Andrews Lesson 39.4.1",
                "Andrews Lesson 39.4.2",
                "Andrews Lesson 39.4.3",
                "Andrews Lesson 39.4.4",
                "Andrews Lesson 39.5",
                "Andrews Lesson 39.6",
                "Andrews Lesson 39.7",
                "Andrews Lesson 39.8",
                "Andrews Lesson 39.9",
            ],
            subsectionRefs: [
                "39.1",
                "39.1.1",
                "39.1.2",
                "39.1.3",
                "39.2",
                "39.2.1",
                "39.2.2",
                "39.3",
                "39.3.1",
                "39.3.2",
                "39.3.3",
                "39.3.4",
                "39.3.5",
                "39.3.6",
                "39.4",
                "39.4.1",
                "39.4.2",
                "39.4.3",
                "39.4.4",
                "39.5",
                "39.6",
                "39.7",
                "39.8",
                "39.9",
            ],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
        }
    );
    s.eq(
        "Lesson 39 frame records patientive family operations and valence boundaries",
        {
            perfectiveTli: lesson39Frame.perfectivePatientiveFrame.belongsToTliClass,
            perfectiveEndings: lesson39Frame.perfectivePatientiveFrame.allowedPerfectiveCoreEndingsNawat,
            imperfectiveTi: lesson39Frame.imperfectivePatientiveFrame.belongsToTiClass,
            characteristicMatrix: lesson39Frame.characteristicPropertyFrame.nounstemMatrix,
            organicPossessiveOnly: lesson39Frame.characteristicPropertyFrame.organicPossessionFrame.organicPossessionOnlyPossessiveState,
            rootStockChoices: lesson39Frame.rootStockPatientiveFrame.niDestockalFrame.suffixChoices,
            multipleProcedures: lesson39Frame.multipleDerivationFrame.procedures,
            compoundNominal: lesson39Frame.patientiveCompoundEmbedFrame.patientiveNounstemCanEmbedInNominalCompound,
            complementPossessorToObject: lesson39Frame.incorporatedComplementFrame.possessiveSourceFrame.possessorPronounTransformsToMainlineObjectPronoun,
            objectMatrices: lesson39Frame.incorporatedObjectFrame.matrices,
            complementRoute: {
                kind: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.kind,
                sourcePrincipal: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.sourcePrincipalVnc.formulaType,
                sourceAdjunct: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.sourceAdjunctNnc.formulaType,
                embedRole: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.embedRole,
                consumedObjectSlot: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.consumedObjectSlot,
                remainingExternalObjectSlotIds: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.remainingExternalObjectSlotIds,
                valenceDelta: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.valenceDelta,
                andrewsSection: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.andrewsSection,
                generationStatus: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.generationStatus,
                finalFormulaShapeDoesNotLicenseRole: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.finalFormulaShapeDoesNotLicenseRole,
                functionUseOwnsObjectSlots: lesson39Frame.incorporatedComplementFrame.objectSlotOwnership.functionUseOwnsObjectSlots,
                sourceRouteFrameRequired: lesson39Frame.incorporatedComplementFrame.incorporationRouteFrame.sourceRouteFrameRequired,
            },
            objectRoute: {
                kind: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.kind,
                sourcePrincipal: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.sourcePrincipalVnc.formulaType,
                sourceAdjunct: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.sourceAdjunctNnc.formulaType,
                embedRole: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.embedRole,
                consumedObjectSlot: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.consumedObjectSlot,
                remainingExternalObjectSlotIds: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.remainingExternalObjectSlotIds,
                valenceDelta: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.valenceDelta,
                andrewsSection: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.andrewsSection,
                generationStatus: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.generationStatus,
                finalFormulaShapeDoesNotLicenseObjectSlots: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.finalFormulaShapeDoesNotLicenseObjectSlots,
                functionUseOwnsObjectSlots: lesson39Frame.incorporatedObjectFrame.objectSlotOwnership.functionUseOwnsObjectSlots,
                sourceRouteFrameRequired: lesson39Frame.incorporatedObjectFrame.incorporationRouteFrame.sourceRouteFrameRequired,
            },
            participantRouteRoles: [
                lesson39Frame.frames.participantFrame.incorporatedComplementRouteFrame.embedRole,
                lesson39Frame.frames.participantFrame.incorporatedObjectRouteFrame.embedRole,
            ],
            yoTlOmission: lesson39Frame.characteristicPropertyEmbedFrame.yoTlMatrixCanBeOmittedWithFullDerivedMeaning,
            routeStage: lesson39Frame.frames.routeContract.routeStage,
            diagnosticId: lesson39Frame.contractDiagnostics[0].id,
        },
        {
            perfectiveTli: true,
            perfectiveEndings: ["w", "k", "kw", "s", "sh", "n", "glottal", "l", "tz"],
            imperfectiveTi: true,
            characteristicMatrix: "(-yo)-tl",
            organicPossessiveOnly: true,
            rootStockChoices: ["c", "x", "z", "ch"],
            multipleProcedures: ["passive-core", "impersonal-core", "perfective-active-core", "imperfective-active-core", "root-or-stock"],
            compoundNominal: true,
            complementPossessorToObject: true,
            objectMatrices: ["tla-(tlani)", "tla-(ih-tlani)", "tla-(tem-o-a)"],
            complementRoute: {
                kind: "lesson-39-patientive-incorporation-route-frame",
                sourcePrincipal: "CNV",
                sourceAdjunct: "CNN",
                embedRole: "incorporated-complement",
                consumedObjectSlot: "complement-slot",
                remainingExternalObjectSlotIds: ["mainline-object"],
                valenceDelta: {
                    complementSlots: 1,
                    incorporatedObjectSlots: 0,
                    remainingExternalObjectSlots: 1,
                },
                andrewsSection: "Andrews 39.7",
                generationStatus: "diagnostic-only-source-gated",
                finalFormulaShapeDoesNotLicenseRole: true,
                functionUseOwnsObjectSlots: false,
                sourceRouteFrameRequired: true,
            },
            objectRoute: {
                kind: "lesson-39-patientive-incorporation-route-frame",
                sourcePrincipal: "CNV",
                sourceAdjunct: "CNN",
                embedRole: "incorporated-object",
                consumedObjectSlot: "obj1",
                remainingExternalObjectSlotIds: ["applicative-object"],
                valenceDelta: {
                    complementSlots: 0,
                    incorporatedObjectSlots: 1,
                    remainingExternalObjectSlots: 1,
                },
                andrewsSection: "Andrews 39.8",
                generationStatus: "diagnostic-only-source-gated",
                finalFormulaShapeDoesNotLicenseObjectSlots: true,
                functionUseOwnsObjectSlots: false,
                sourceRouteFrameRequired: true,
            },
            participantRouteRoles: ["incorporated-complement", "incorporated-object"],
            yoTlOmission: true,
            routeStage: "audit-lesson-39",
            diagnosticId: "patientive-operations-diagnostic-partial",
        }
    );

    return s;
}

module.exports = { run };
