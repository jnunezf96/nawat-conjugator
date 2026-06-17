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
        ],
        ["function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildHonorificPejorativeBoundaryMetadata();
    s.eq(
        "honorific/pejorative VNC boundary is explicit and non-generative",
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
                hasHonorificGeneration: false,
                hasPejorativeGeneration: false,
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
        "recognized honorific category remains unconfirmed without Nawat evidence",
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
            falsePositiveSource: "polite-translation",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "honorific-pejorative-needs-nawat-evidence",
                "honorific-pejorative-category-recognized",
                "honorific-pejorative-false-positive-source",
            ],
            boundary,
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
            "polite or insulting translation labels are not Nawat/Pipil fixture evidence",
            "ordinary causative/applicative derivation is not honorific or pejorative VNC generation",
            "nonactive/passive/impersonal derivation is not honorific or pejorative VNC generation",
            "person or agreement labels are not honorific or pejorative VNC evidence",
            "Andrews honorific/pejorative categories are architecture, not Nawat/Pipil form authority",
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
            pejorativeMatrix: "ta-(pul-u-a)",
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
            orthographyStatus: "nawat-evidence-required",
            stemKind: "honorific-pejorative-vnc",
            pejorativeMeaning: "contempt or scorn",
            honoredEntityMayBeSubjectOrObject: true,
        }
    );

    return s;
}

module.exports = { run };
