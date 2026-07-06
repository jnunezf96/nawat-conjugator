"use strict";

/**
 * Tests for src/core/vnc/honorific_pejorative/honorific_pejorative.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("honorific_pejorative");

    s.eq(
        "Lesson 33 honorific/pejorative API is exported",
        [
            typeof ctx.buildHonorificPejorativeBoundaryMetadata,
            typeof ctx.classifyHonorificPejorativeCandidate,
            typeof ctx.classifyHonorificPejorativeFalsePositive,
            typeof ctx.getHonorificPejorativeAntiConflationRules,
            typeof ctx.buildLesson33HonorificPejorativePursuitFrame,
            typeof ctx.getLesson33HonorificPejorativeSubsectionInventory,
            typeof ctx.getHonorificPejorativePreteritEmbedMatrix,
            typeof ctx.buildHonorificPejorativePreteritEmbedSourceFrame,
            typeof ctx.buildHonorificPejorativePreteritEmbedOperationFrame,
            typeof ctx.buildAndrewsHonorificPejorativePreteritEmbedVnc,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildHonorificPejorativeBoundaryMetadata();
    s.eq(
        "honorific/pejorative VNC boundary is explicit and scoped",
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
            kind: "honorific-pejorative-boundary",
            lesson: 33,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncGeneration: true,
                hasHonorificGeneration: true,
                hasPejorativeGeneration: true,
                hasPreteritEmbedGeneration: true,
                hasConfirmedFixtureData: false,
                changesCausativeGeneration: false,
                changesApplicativeGeneration: false,
                changesNonactiveGeneration: false,
                changesVncGeneration: false,
                treatsTranslationToneAsEvidence: false,
            },
            questionFields: [
                "sourceStem",
                "polarity",
                "morphologicalStrategy",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized honorific category remains blocked without Andrews source gate",
        ctx.classifyHonorificPejorativeCandidate({
            sourceStem: "palehuia",
            candidate: "polite translation label",
            polarity: "honorific",
            falsePositiveSource: "polite-translation",
        }),
        {
            kind: "honorific-pejorative-candidate-classification",
            version: 1,
            sourceStem: "palehuia",
            candidate: "polite translation label",
            polarity: "honorific",
            morphologicalStrategy: "",
            evidenceSource: "",
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "polite-translation",
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "honorific-pejorative-source-gate-required",
                "honorific-pejorative-category-recognized",
                "honorific-pejorative-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "honorific candidate strings are diagnostic only even with old source-gate flags",
        (() => {
            const classification = ctx.classifyHonorificPejorativeCandidate({
                sourceStem: "palehuia",
                candidate: "m-o-palehui-lia",
                polarity: "honorific",
                morphologicalStrategy: "honorific-via-applicative-reflexive",
                sourceGate: "Andrews 33.3 intransitive applicative honorific route",
                structuredSource: true,
            });
            return {
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
                surfaceForms: classification.surfaceForms,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
                targetStem: classification.frames.stemFrame.targetStem,
                evidenceSource: classification.frames.participantFrame.evidenceSource,
            };
        })(),
        {
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surface: "",
            surfaceForms: [],
            diagnostics: [
                "honorific-pejorative-candidate-diagnostic-only",
                "honorific-pejorative-category-recognized",
                "honorific-pejorative-unconfirmed",
            ],
            routeStage: "classify-candidate",
            frameGenerationAllowed: false,
            orthographyStatus: "orthography-bridge-required",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            targetStem: "m-o-palehui-lia",
            evidenceSource: "Andrews 33.3 intransitive applicative honorific route",
        }
    );

    s.eq(
        "Andrews preterit-embed matrices generate honorific and pejorative target stems",
        [
            ctx.getHonorificPejorativePreteritEmbedMatrix("honorific"),
            ctx.getHonorificPejorativePreteritEmbedMatrix("pejorative"),
        ].map((entry) => ({
            polarity: entry.polarity,
            matrixStem: entry.matrixStem,
            matrixSource: entry.matrixSource,
            andrewsSection: entry.andrewsSection,
        })),
        [
            {
                polarity: "honorific",
                matrixStem: "tzin-o-a",
                matrixSource: "tla-(tzin-o-a)",
                andrewsSection: "33.7",
            },
            {
                polarity: "pejorative",
                matrixStem: "pol-o-a",
                matrixSource: "tla-(pol-o-a)",
                andrewsSection: "33.9",
            },
        ]
    );
    s.eq(
        "Andrews honorific preterit embed generates from typed operation frame",
        (() => {
            const sourceFrame = ctx.buildHonorificPejorativePreteritEmbedSourceFrame({
                preteritEmbedStem: "tlal-i-h-0",
            });
            const operationFrame = ctx.buildHonorificPejorativePreteritEmbedOperationFrame({
                sourceFrame,
                objectPrefix: "m-o",
                personPrefix: "ti-0",
                polarity: "honorific",
            });
            const generated = ctx.buildAndrewsHonorificPejorativePreteritEmbedVnc({ operationFrame });
            return {
                kind: generated.kind,
                operationFrameKind: generated.operationFrame.kind,
                targetStemClassical: generated.targetStemClassical,
                targetStem: generated.targetStem,
                structuralFormula: generated.structuralFormula,
                generationAllowed: generated.generationAllowed,
                formulaSlots: generated.formulaSlots,
                diagnostics: generated.diagnostics,
                routeStage: generated.frames.routeContract.routeStage,
                finiteSurfaceExpansionAllowed: generated.frames.routeContract.targetContract.finiteSurfaceExpansionAllowed,
            };
        })(),
        {
            kind: "honorific-pejorative-preterit-embed-generation",
            operationFrameKind: "andrews-honorific-pejorative-preterit-embed-operation-frame",
            targetStemClassical: "tlal-i-h-0-tzin-o-a",
            targetStem: "talijtzinua",
            structuralFormula: "#ti-0+m-o(tlal-i-h-0-tzin-o-a)0+0-0#",
            generationAllowed: true,
            formulaSlots: {
                pers: "ti-0",
                objectPrefix: "m-o",
                preteritEmbedStem: "tlal-i-h-0",
                matrixStem: "tzin-o-a",
                matrixSource: "tla-(tzin-o-a)",
                tenseMorph: "0",
                num1: "0",
                num2: "0",
            },
            diagnostics: [
                "honorific-preterit-embed-andrews-generated",
                "preterit-predicate-replaces-matrix-specific-object",
                "orthography-bridge-realized",
            ],
            routeStage: "generate-preterit-embed-honorific-pejorative",
            finiteSurfaceExpansionAllowed: false,
        }
    );
    s.eq(
        "old string-only honorific preterit embed API blocks without typed operation frame",
        (() => {
            const generated = ctx.buildAndrewsHonorificPejorativePreteritEmbedVnc({
                preteritEmbedStem: "tlal-i-h-0",
                objectPrefix: "m-o",
                personPrefix: "ti-0",
                polarity: "honorific",
            });
            return {
                generationAllowed: generated.generationAllowed,
                diagnostic: generated.diagnostics[0],
                routeStage: generated.frames.routeContract.routeStage,
            };
        })(),
        {
            generationAllowed: false,
            diagnostic: "honorific-pejorative-preterit-embed-missing-typed-operation-frame",
            routeStage: "block-preterit-embed-generation",
        }
    );
    s.eq(
        "honorific preterit embed blocks contradictory typed target frame",
        (() => {
            const sourceFrame = ctx.buildHonorificPejorativePreteritEmbedSourceFrame({
                preteritEmbedStem: "tlal-i-h-0",
            });
            const operationFrame = ctx.buildHonorificPejorativePreteritEmbedOperationFrame({
                sourceFrame,
                objectPrefix: "m-o",
                personPrefix: "ti-0",
                polarity: "honorific",
            });
            const generated = ctx.buildAndrewsHonorificPejorativePreteritEmbedVnc({
                operationFrame: {
                    ...operationFrame,
                    targetFrame: {
                        ...operationFrame.targetFrame,
                        targetStemClassical: "poisoned-tzin-o-a",
                    },
                },
            });
            return {
                generationAllowed: generated.generationAllowed,
                diagnostic: generated.diagnostics[0],
                routeStage: generated.frames.routeContract.routeStage,
            };
        })(),
        {
            generationAllowed: false,
            diagnostic: "honorific-pejorative-preterit-embed-contradictory-typed-operation-frame",
            routeStage: "block-contradictory-preterit-embed-frame",
        }
    );
    s.eq(
        "poisoning legacy honorific string normalizer does not affect typed operation output",
        (() => {
            const originalNormalizer = ctx.normalizeHonorificPejorativeCandidateSurface;
            try {
                ctx.normalizeHonorificPejorativeCandidateSurface = () => "poisoned";
                const sourceFrame = ctx.buildHonorificPejorativePreteritEmbedSourceFrame({
                    preteritEmbedStem: "tlal-i-h-0",
                });
                const operationFrame = ctx.buildHonorificPejorativePreteritEmbedOperationFrame({
                    sourceFrame,
                    objectPrefix: "m-o",
                    personPrefix: "ti-0",
                    polarity: "honorific",
                });
                return ctx.buildAndrewsHonorificPejorativePreteritEmbedVnc({ operationFrame }).targetStem;
            } finally {
                ctx.normalizeHonorificPejorativeCandidateSurface = originalNormalizer;
            }
        })(),
        "talijtzinua"
    );
    s.eq(
        "honorific/pejorative classifier generates pejorative preterit embed when candidate is omitted",
        (() => {
            const sourceFrame = ctx.buildHonorificPejorativePreteritEmbedSourceFrame({
                preteritEmbedStem: "chiuh-0",
            });
            const classification = ctx.classifyHonorificPejorativeCandidate({
                sourceFrame,
                polarity: "pejorative",
                objectPrefix: "c-0",
                personPrefix: "ni-0",
            });
            return {
                candidate: classification.candidate,
                surface: classification.surface,
                structuralFormula: classification.structuralFormula,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                preteritEmbedGenerated: classification.frames.routeContract.targetContract.preteritEmbedGenerated,
                sourceSurface: classification.frames.orthographyFrame.sourceSurface,
            };
        })(),
        {
            candidate: "chiuh-0-pol-o-a",
            surface: "chiwpulua",
            structuralFormula: "#ni-0+c-0(chiuh-0-pol-o-a)0+0-0#",
            diagnostics: [
                "pejorative-preterit-embed-andrews-generated",
                "honorific-pejorative-category-recognized",
                "honorific-pejorative-structured-source",
            ],
            routeStage: "generate-structured-honorific-pejorative",
            frameGenerationAllowed: true,
            preteritEmbedGenerated: true,
            sourceSurface: "chiuh-0-pol-o-a",
        }
    );

    s.eq(
        "ordinary causative derivation is classified as false positive evidence",
        ctx.classifyHonorificPejorativeFalsePositive("ordinary-causative"),
        {
            kind: "honorific-pejorative-false-positive",
            version: 1,
            source: "ordinary-causative",
            isHonorificEvidence: false,
            isPejorativeEvidence: false,
            generationAllowed: false,
            diagnostics: ["honorific-pejorative-false-positive-source"],
            antiConflationRules: ctx.getHonorificPejorativeAntiConflationRules(),
        }
    );

    s.eq(
        "honorific/pejorative metadata carries anti-conflation rules",
        ctx.getHonorificPejorativeAntiConflationRules(),
        [
            "honorific/pejorative boundary metadata is not generation",
            "polite or insulting translation labels are not orthography-bridge fixture evidence",
            "ordinary causative/applicative derivation is not honorific or pejorative VNC generation",
            "nonactive/passive/impersonal derivation is not honorific or pejorative VNC generation",
            "person or agreement labels are not honorific or pejorative VNC evidence",
            "Andrews honorific/pejorative categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    s.no("honorific/pejorative boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("honorific/pejorative boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));
    const honorificCandidate = ctx.classifyHonorificPejorativeCandidate({
        sourceStem: "palehuia",
        candidate: "polite translation label",
        polarity: "honorific",
        falsePositiveSource: "polite-translation",
    });
    const honorificFrame = honorificCandidate.grammarFrame;
    s.eq(
        "honorific/pejorative metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(honorificFrame),
            routeFamily: honorificFrame?.routeContract?.routeFamily || "",
            routeStage: honorificFrame?.routeContract?.routeStage || "",
            generationAllowed: honorificFrame?.routeContract?.generationAllowed,
            polarity: honorificFrame?.participantFrame?.honorificPejorativePolarity || "",
            andrewsRef: honorificFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(honorificCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "honorific-pejorative",
            routeStage: "classify-candidate",
            generationAllowed: false,
            polarity: "honorific",
            andrewsRef: "Andrews Lesson 33",
            enumerableGrammarFrame: false,
        }
    );

    const lesson33Frame = ctx.buildLesson33HonorificPejorativePursuitFrame();
    s.eq(
        "lesson 33 pursuit frame covers every subsection",
        {
            stepNumber: lesson33Frame.stepNumber,
            pdfRefs: lesson33Frame.pdfRefs.length,
            subsectionSections: lesson33Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            plannedArrowIds: lesson33Frame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson33Frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            hitCount: lesson33Frame.hitCount,
            missCount: lesson33Frame.missCount,
            closestPass: lesson33Frame.closestPass,
            generationAllowed: lesson33Frame.generationAllowed,
        },
        {
            stepNumber: 33,
            pdfRefs: 10,
            subsectionSections: [
                "33.1",
                "33.2",
                "33.3",
                "33.4",
                "33.5",
                "33.6",
                "33.7",
                "33.8",
                "33.9",
                "33.10",
            ],
            plannedArrowIds: ["lesson-33-honorific-pejorative-vnc-audit"],
            firedArrowIds: [["lesson-33-honorific-pejorative-vnc-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            generationAllowed: false,
        }
    );
    s.eq(
        "lesson 33 pursuit frame records Andrews honorific and pejorative architecture",
        {
            honorificMeaning: lesson33Frame.overviewFrame.honorificMeaning,
            selfHonorificWarning: lesson33Frame.overviewFrame.selfHonorificWarning,
            intransitiveCausativeFamilies: lesson33Frame.intransitiveCausativeFrame.causativeFamilies,
            yaUhUsesHuica: lesson33Frame.intransitiveCausativeFrame.irregularIntransitiveBoundary.yaUhAndHualLaUhUseMoHuica,
            intransitiveApplicativeOwnSake: lesson33Frame.intransitiveApplicativeFrame.semanticPresentation,
            projectiveAmbiguity: lesson33Frame.projectiveApplicativeFrame.ambiguityBecauseNoSignalIdentifiesHonoredEntity,
            causativeApplicativeSourceRule: lesson33Frame.causativeApplicativeSourceFrame.followsProjectiveObjectGeneralRule,
            projectiveCausativeAmbiguity: lesson33Frame.projectiveCausativeFrame.ambiguityBecauseAgentStillCausesSelfToAct,
            reflexiveStrategy: lesson33Frame.reflexiveSourceFrame.strategy,
            reflexiveMatrix: lesson33Frame.reflexiveSourceFrame.matrixStem,
            reflexiveClasses: lesson33Frame.reflexiveSourceFrame.validForVerbstemClasses,
            reverentialStrategy: lesson33Frame.reverentialFrame.strategy,
            pejorativeMatrix: lesson33Frame.pejorativeFrame.matrixStem,
            pejorativeSources: lesson33Frame.pejorativeFrame.sourceKinds,
            selfPejorativePermitted: lesson33Frame.pejorativeFrame.selfPejorativePermitted,
            compoundSharedObjectMatrix: lesson33Frame.compoundVerbstemFrame.sharedObjectCompoundTransformsMatrixStem,
        },
        {
            honorificMeaning: "respect or high esteem toward another entity",
            selfHonorificWarning: "one should not use an honorific to speak of oneself",
            intransitiveCausativeFamilies: ["type-one-causative", "type-two-causative", "lia-causative"],
            yaUhUsesHuica: true,
            intransitiveApplicativeOwnSake: "honored subject acts for own sake or interest",
            projectiveAmbiguity: true,
            causativeApplicativeSourceRule: true,
            projectiveCausativeAmbiguity: true,
            reflexiveStrategy: "preterit-embed integrated compound",
            reflexiveMatrix: "tla-(tzin-o-a)",
            reflexiveClasses: ["A", "B", "C", "D"],
            reverentialStrategy: "double honorific construction",
            pejorativeMatrix: "tla-(pol-o-a)",
            pejorativeSources: ["intransitive VNC", "projective-object VNC", "reflexive-object VNC"],
            selfPejorativePermitted: true,
            compoundSharedObjectMatrix: true,
        }
    );
    s.eq(
        "lesson 33 pursuit frame has LCM redirect contract",
        {
            routeFamily: lesson33Frame.frames.routeContract.routeFamily,
            routeStage: lesson33Frame.frames.routeContract.routeStage,
            generationAllowed: lesson33Frame.frames.routeContract.generationAllowed,
            unitKind: lesson33Frame.frames.unitFrame.unitKind,
            targetGenerationAllowed: lesson33Frame.frames.routeContract.targetContract.generationAllowed,
            orthographyStatus: lesson33Frame.frames.orthographyFrame.orthographyStatus,
            stemKind: lesson33Frame.frames.stemFrame.stemKind,
            pejorativeMeaning: lesson33Frame.frames.participantFrame.pejorativeMeaning,
            honoredEntityMayBeSubjectOrObject: lesson33Frame.frames.participantFrame.honoredEntityMayBeSubjectOrObject,
        },
        {
            routeFamily: "honorific-pejorative",
            routeStage: "audit-lesson-33",
            generationAllowed: false,
            unitKind: "honorific-pejorative-vnc-boundary",
            targetGenerationAllowed: false,
            orthographyStatus: "orthography-bridge-plus-source-gate-required",
            stemKind: "honorific-pejorative-vnc",
            pejorativeMeaning: "contempt or scorn",
            honoredEntityMayBeSubjectOrObject: true,
        }
    );

    return s;
}

module.exports = { run };
