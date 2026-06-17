"use strict";

/**
 * Tests for src/core/sentence/sentence.js
 */

const { createSuite } = require("./runner");

function compactLayer(layer) {
    return layer && {
        kind: layer.kind,
        version: layer.version,
        clauseKind: layer.clauseKind,
        generationAllowed: layer.generationAllowed,
        slots: {
            polarity: layer.slots?.polarity,
            question: layer.slots?.question,
            emphasis: layer.slots?.emphasis,
            mood: layer.slots?.mood,
        },
        boundaries: layer.boundaries,
        diagnostics: layer.diagnostics,
    };
}

function run(ctx) {
    const s = createSuite("sentence");

    s.eq(
        "Lesson 8-10 and 17-19 sentence API is exported",
        [
            typeof ctx.buildSentenceLayerMetadata,
            typeof ctx.buildBasicSentenceBoundaryMetadata,
            typeof ctx.classifySentenceCandidate,
            typeof ctx.getSentenceLayerAntiConflationRules,
            typeof ctx.buildGeneratedSentenceLayerMetadata,
            typeof ctx.buildSentenceLesson8PursuitFrame,
            typeof ctx.getSentenceLesson8SubsectionInventory,
            typeof ctx.buildSentenceLesson9PursuitFrame,
            typeof ctx.getSentenceLesson9SubsectionInventory,
            typeof ctx.buildSentenceLesson10PursuitFrame,
            typeof ctx.getSentenceLesson10SubsectionInventory,
            typeof ctx.buildSentenceLesson17PursuitFrame,
            typeof ctx.getSentenceLesson17SubsectionInventory,
            typeof ctx.buildSentenceLesson18PursuitFrame,
            typeof ctx.getSentenceLesson18SubsectionInventory,
            typeof ctx.buildSentenceLesson19PursuitFrame,
            typeof ctx.getSentenceLesson19SubsectionInventory,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const vncShell = ctx.buildNuclearClauseShellMetadata({
        clauseKind: "vnc",
        subject: { prefix: "ni", suffix: "" },
        predicate: { stem: "nemi" },
        tenseValue: "presente",
    });
    s.eq(
        "sentence layer records negation question emphasis and mood slots without generation",
        compactLayer(ctx.buildSentenceLayerMetadata({
            nuclearClauseShell: vncShell,
            polarity: "negative",
            questionType: "yes-no",
            emphasisType: "focus",
            moodScope: "wish",
            particleCandidates: {
                negation: "amo",
                question: "?",
                emphasis: "",
                mood: "",
            },
        })),
        {
            kind: "sentence-layer-metadata",
            version: 1,
            clauseKind: "verbal-nuclear-clause",
            generationAllowed: false,
            slots: {
                polarity: {
                    slot: "negation",
                    value: "negative",
                    scope: "sentence",
                    particleCandidate: "amo",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                question: {
                    slot: "question",
                    value: "yes-no",
                    scope: "sentence",
                    particleCandidate: "?",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                emphasis: {
                    slot: "emphasis",
                    value: "focus",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                mood: {
                    slot: "sentence-mood",
                    value: "wish",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
            },
            boundaries: {
                isSentenceEngine: false,
                isWordGeneration: false,
                changesFiniteVncOutput: false,
                hasConfirmedParticleInventory: false,
                finiteMoodIsSentenceSemantics: false,
            },
            diagnostics: [
                "sentence-layer-diagnostic-only",
                "sentence-layer-needs-confirmed-nawat-evidence",
            ],
        }
    );
    s.eq(
        "generated sentence layer is explicit opt-in and wraps the nuclear clause shell",
        compactLayer(ctx.buildGeneratedSentenceLayerMetadata({
            override: {
                sentenceLayer: {
                    enabled: true,
                    polarity: "negative",
                    questionType: "yes-no",
                    moodScope: "command",
                },
            },
            tense: "optativo",
            nuclearClauseShell: vncShell,
        })),
        {
            kind: "sentence-layer-metadata",
            version: 1,
            clauseKind: "verbal-nuclear-clause",
            generationAllowed: false,
            slots: {
                polarity: {
                    slot: "negation",
                    value: "negative",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                question: {
                    slot: "question",
                    value: "yes-no",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                emphasis: {
                    slot: "emphasis",
                    value: "none",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
                mood: {
                    slot: "sentence-mood",
                    value: "command",
                    scope: "sentence",
                    particleCandidate: "",
                    isParticleEvidenceBacked: false,
                    generationAllowed: false,
                },
            },
            boundaries: {
                isSentenceEngine: false,
                isWordGeneration: false,
                changesFiniteVncOutput: false,
                hasConfirmedParticleInventory: false,
                finiteMoodIsSentenceSemantics: false,
            },
            diagnostics: [
                "sentence-layer-diagnostic-only",
                "sentence-layer-needs-confirmed-nawat-evidence",
            ],
        }
    );
    s.eq(
        "generated sentence layer stays absent without explicit opt-in",
        ctx.buildGeneratedSentenceLayerMetadata({
            override: {},
            tense: "optativo",
            nuclearClauseShell: vncShell,
        }),
        null
    );

    const boundary = ctx.buildBasicSentenceBoundaryMetadata({
        moodScope: "admonition",
    });
    s.eq(
        "basic sentence boundary keeps finite VNC forms separate from sentence semantics",
        {
            kind: boundary.kind,
            lessonRange: boundary.lessonRange,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            supportedFiniteFormsRemainInVnc: boundary.supportedFiniteFormsRemainInVnc,
            unsupportedBehavior: boundary.unsupportedBehavior,
            moodValue: boundary.sentenceLayer.slots.mood.value,
        },
        {
            kind: "basic-sentence-boundary",
            lessonRange: "8-10",
            status: "partial",
            generationAllowed: false,
            supportedFiniteFormsRemainInVnc: true,
            unsupportedBehavior: [
                "negation particle generation",
                "question particle generation",
                "emphasis particle generation",
                "sentence-level optative semantics",
                "sentence-level admonitive semantics",
            ],
            moodValue: "admonition",
        }
    );

    s.eq(
        "sentence candidate classification is diagnostic-only",
        ctx.classifySentenceCandidate({
            text: "amo ni nemi?",
            polarity: "negative",
            questionType: "yes-no",
        }),
        {
            kind: "sentence-candidate-classification",
            version: 1,
            text: "amo ni nemi?",
            matched: false,
            status: "unconfirmed",
            sentenceLayer: ctx.buildSentenceLayerMetadata({
                polarity: "negative",
                questionType: "yes-no",
                emphasisType: "unknown",
                moodScope: "unknown",
                source: "candidate",
            }),
            generationAllowed: false,
            diagnostics: ["sentence-candidate-unconfirmed"],
        }
    );

    s.eq(
        "sentence layer carries anti-conflation rules",
        ctx.getSentenceLayerAntiConflationRules(),
        [
            "sentence layer metadata is not generation",
            "finite optative/admonitive form is not full sentence mood semantics",
            "negation/question/emphasis labels are not Nawat/Pipil particle evidence",
            "VNC output is not a complete sentence",
            "topic and supplementation require separate clause metadata",
            "Andrews sentence categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("sentence boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("sentence boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    const lesson8 = ctx.buildSentenceLesson8PursuitFrame();
    s.eq(
        "Lesson 8 pursuit frame covers all PDF subsections without sentence generation",
        {
            stepNumber: lesson8.stepNumber,
            aimStatus: lesson8.aimStatus,
            pdfRefs: lesson8.pdfRefs,
            subsectionSections: lesson8.subsectionInventory.map((entry) => entry.andrewsSection),
            directiveIds: lesson8.subsectionInventory.map((entry) => entry.id),
            generationAllowed: lesson8.generationAllowed,
            closestPass: lesson8.closestPass,
            hitCount: lesson8.hitCount,
            remainingGapCount: lesson8.remainingGaps.length,
        },
        {
            stepNumber: 8,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 8.1",
                "Andrews Lesson 8.2",
                "Andrews Lesson 8.3",
                "Andrews Lesson 8.4",
                "Andrews Lesson 8.5",
                "Andrews Lesson 8.6",
            ],
            subsectionSections: ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6"],
            directiveIds: [
                "lesson8-expanded-vnc",
                "lesson8-basic-vs-transform-sentences",
                "lesson8-simple-affirmative-assertion",
                "lesson8-simple-negative-assertion",
                "lesson8-emphatic-assertion",
                "lesson8-yes-no-question",
            ],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            remainingGapCount: 3,
        }
    );
    s.eq(
        "Lesson 8 expanded VNC frame keeps Andrews prefix boundaries distinct",
        {
            directionalBoundary: lesson8.expandedVncFrame.expandedConstituents[0].vncBoundary,
            directionalAndrewsMarkers: lesson8.expandedVncFrame.expandedConstituents[0].andrewsMorphemes,
            directionalNawatCandidates: lesson8.expandedVncFrame.expandedConstituents[0].nawatCandidates,
            directionalSpecificProjectivePlacement: lesson8.expandedVncFrame.expandedConstituents[0].formulaPlacement.transitiveSpecificProjectiveDyadic,
            antecessiveBoundary: lesson8.expandedVncFrame.expandedConstituents[1].vncBoundary,
            antecessiveRestriction: lesson8.expandedVncFrame.expandedConstituents[1].tenseRestriction,
            negativeOrder: lesson8.expandedVncFrame.expandedConstituents[2].orderWithAntecessive,
            transformIds: lesson8.transformFrame.transformTypes.map((entry) => entry.id),
        },
        {
            directionalBoundary: "inside-vnc-core",
            directionalAndrewsMarkers: ["on", "hual"],
            directionalNawatCandidates: ["un", "wal"],
            directionalSpecificProjectivePlacement: "after-dyadic-valence",
            antecessiveBoundary: "outside-vnc-left-boundary-or-forelying-clausemate",
            antecessiveRestriction: "past-tense-vnc",
            negativeOrder: "negative-before-o#",
            transformIds: [
                "simple-negative-assertion",
                "emphatic-assertion",
                "yes-no-question",
            ],
        }
    );
    s.eq(
        "Lesson 8 pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson8.grammarFrame),
            routeFamily: lesson8.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson8.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson8.grammarFrame?.routeContract?.generationAllowed,
            diagnostic: lesson8.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson8, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "sentence-layer",
            routeStage: "audit-lesson-8",
            generationAllowed: false,
            diagnostic: "lesson-8-sentence-layer-partial",
            enumerableGrammarFrame: false,
        }
    );

    const lesson9 = ctx.buildSentenceLesson9PursuitFrame();
    s.eq(
        "Lesson 9 pursuit frame covers all PDF subsections without optative sentence generation",
        {
            stepNumber: lesson9.stepNumber,
            aimStatus: lesson9.aimStatus,
            pdfRefs: lesson9.pdfRefs,
            subsectionSections: lesson9.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson9.generationAllowed,
            closestPass: lesson9.closestPass,
            hitCount: lesson9.hitCount,
            remainingGapCount: lesson9.remainingGaps.length,
        },
        {
            stepNumber: 9,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 9.1",
                "Andrews Lesson 9.2",
                "Andrews Lesson 9.3",
                "Andrews Lesson 9.4",
                "Andrews Lesson 9.5",
                "Andrews Lesson 9.6",
                "Andrews Lesson 9.7",
                "Andrews Lesson 9.8",
                "Andrews Lesson 9.9",
            ],
            subsectionSections: ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.7", "9.8", "9.9"],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            remainingGapCount: 3,
        }
    );
    s.eq(
        "Lesson 9 optative frame separates finite VNC use from sentence mood",
        {
            distinctiveTenses: lesson9.optativeVncFrame.distinctiveTenses,
            borrowedUseTenses: lesson9.optativeVncFrame.borrowedUseTenses.map((entry) => [entry.tense, entry.sourceForm, entry.identifiedBy]),
            secondPersonMarker: lesson9.optativeVncFrame.distinctiveMarkers[0].andrewsMorphs,
            surfaceIdentityPolicy: lesson9.optativeVncFrame.surfaceIdentityPolicy,
            canonicalFiniteOptativeKey: lesson9.optativeVncFrame.currentEngineBoundary.canonicalFiniteOptativeKey,
            affirmativeWishIntroducers: lesson9.wishSentenceFrame.affirmativeWish.andrewsIntroducers,
            negativeWishPrefixChange: lesson9.wishSentenceFrame.negativeWish.negativePrefixChange,
        },
        {
            distinctiveTenses: ["nonpast-optative", "past-optative"],
            borrowedUseTenses: [
                ["future-optative", "future-indicative", "use-not-form"],
                ["preterit-optative", "preterit-indicative", "use-not-form"],
            ],
            secondPersonMarker: ["x", "xi"],
            surfaceIdentityPolicy: "When optative and indicative VNCs have the same shape, syntax and introductory particles distinguish the optative.",
            canonicalFiniteOptativeKey: "optativo",
            affirmativeWishIntroducers: ["ma", "tla"],
            negativeWishPrefixChange: { fromAndrews: "ah#", toAndrews: "ca#", toNawatCandidate: "ka#" },
        }
    );
    s.eq(
        "Lesson 9 command frame records Andrews no-separate-command-mood boundary",
        {
            noSeparateCommandMood: lesson9.commandExhortationFrame.noSeparateCommandMood,
            construction: lesson9.commandExhortationFrame.affirmativeCommandExhortation.construction,
            subjectFunction: lesson9.commandExhortationFrame.affirmativeCommandExhortation.subjectFunction,
            introducerRule: lesson9.commandExhortationFrame.affirmativeCommandExhortation.introducerRule,
            futureCommandParticle: lesson9.commandExhortationFrame.futureCommand.optionalParticle,
            negativeCommandException: lesson9.commandExhortationFrame.negativeCommandExhortation.brusqueNoMaException,
        },
        {
            noSeparateCommandMood: true,
            construction: "wish-sentence-with-nonpast-optative-vnc-or-future-indicative-as-optative-vnc",
            subjectFunction: {
                secondPerson: "direct-command",
                thirdPerson: "indirect-command",
                firstPerson: "exhortation",
            },
            introducerRule: {
                firstOrThirdPerson: "ma-or-tla-obligatory",
                secondPerson: "ma-or-tla-optional-because-x-xi-is-distinctly-optative",
                omittedSecondPersonEffect: "brusque-command-or-command-to-inferior",
                politenessScale: ["omitted", "ma", "tla"],
            },
            futureCommandParticle: { andrews: "quin", nawatCandidate: "kin", placement: "after-ma" },
            negativeCommandException: { andrews: "ah#", nawatCandidate: "aj#" },
        }
    );
    s.eq(
        "Lesson 9 pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson9.grammarFrame),
            routeFamily: lesson9.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson9.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson9.grammarFrame?.routeContract?.generationAllowed,
            noSeparateCommandMood: lesson9.grammarFrame?.nuclearClauseFrame?.noSeparateCommandMood,
            diagnostic: lesson9.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson9, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "sentence-layer",
            routeStage: "audit-lesson-9",
            generationAllowed: false,
            noSeparateCommandMood: true,
            diagnostic: "lesson-9-optative-sentence-layer-partial",
            enumerableGrammarFrame: false,
        }
    );

    const lesson10 = ctx.buildSentenceLesson10PursuitFrame();
    s.eq(
        "Lesson 10 pursuit frame covers all PDF subsections without admonition generation",
        {
            stepNumber: lesson10.stepNumber,
            aimStatus: lesson10.aimStatus,
            pdfRefs: lesson10.pdfRefs,
            subsectionSections: lesson10.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson10.generationAllowed,
            closestPass: lesson10.closestPass,
            hitCount: lesson10.hitCount,
            remainingGapCount: lesson10.remainingGaps.length,
        },
        {
            stepNumber: 10,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 10.1",
                "Andrews Lesson 10.2",
                "Andrews Lesson 10.3",
                "Andrews Lesson 10.4",
                "Andrews Lesson 10.5",
            ],
            subsectionSections: ["10.1", "10.2", "10.3", "10.4", "10.5"],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            remainingGapCount: 3,
        }
    );
    s.eq(
        "Lesson 10 admonitive frame blocks negative-command drift",
        {
            moodFunction: lesson10.admonitiveMoodFrame.moodFunction,
            rejectedLabels: lesson10.admonitiveMoodFrame.rejectedLabels,
            isPositiveForm: lesson10.admonitiveMoodFrame.isPositiveForm,
            isNegativeInShapeOrMeaning: lesson10.admonitiveMoodFrame.isNegativeInShapeOrMeaning,
            stemSource: lesson10.nonpastAdmonitiveVncFrame.stemSource,
            subjectNumberDyad: lesson10.nonpastAdmonitiveVncFrame.subjectNumberDyad,
            affirmativeTransform: lesson10.affirmativeAdmonitionFrame.transformation,
            affirmativeIntroducer: lesson10.affirmativeAdmonitionFrame.obligatoryIntroducer,
            negativeMeaning: lesson10.negativeAdmonitionFrame.meaning,
        },
        {
            moodFunction: ["warning", "admonition", "advice"],
            rejectedLabels: ["vetitive", "prohibition", "negative-command"],
            isPositiveForm: true,
            isNegativeInShapeOrMeaning: false,
            stemSource: "perfective-stem",
            subjectNumberDyad: {
                singular: "0-0",
                plural: "t-in~t-ih",
                num1RegularMorphCondition: "only with plural num2 morph",
            },
            affirmativeTransform: "replace-present-indicative-vnc-with-admonitive-vnc-and-insert-ma",
            affirmativeIntroducer: { andrews: "ma", nawatCandidate: "ma" },
            negativeMeaning: "cancellation-of-warning-and-recommendation-to-reject-caution",
        }
    );
    s.eq(
        "Lesson 10 contrast frame keeps admonitive optative and indicative apart",
        {
            comparedCategories: lesson10.contrastFrame.comparedCategories,
            disambiguationRuleIds: lesson10.contrastFrame.disambiguationRules.map((rule) => rule.id),
            classAContrast: lesson10.nonpastAdmonitiveVncFrame.classContrast.classA,
            classDContrast: lesson10.nonpastAdmonitiveVncFrame.classContrast.classD,
            translationBoundaries: lesson10.affirmativeAdmonitionFrame.translationBoundaries,
        },
        {
            comparedCategories: [
                "preterit-indicative",
                "nonpast-admonitive",
                "nonpast-optative",
                "present-indicative",
            ],
            disambiguationRuleIds: [
                "second-person-optative",
                "plural-vncs",
                "ma-context",
                "antecessive-o",
                "h-role",
                "glottal-omission-risk",
            ],
            classAContrast: "admonitive tense morph h differs from preterit indicative zero",
            classDContrast: "glottal-stop contrast distinguishes singular admonitive from nonpast optative when represented",
            translationBoundaries: [
                "positive-admonition-is-not-negative-command",
                "do-not-translate-as-dont-as-grammar",
                "do-not-translate-as-may-not",
                "nonanimate-subjects-require-advice-judgment-translation",
            ],
        }
    );
    s.eq(
        "Lesson 10 pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson10.grammarFrame),
            routeFamily: lesson10.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson10.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson10.grammarFrame?.routeContract?.generationAllowed,
            admonitiveIsNotNegativeCommand: lesson10.grammarFrame?.nuclearClauseFrame?.admonitiveIsNotNegativeCommand,
            diagnostic: lesson10.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson10, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "sentence-layer",
            routeStage: "audit-lesson-10",
            generationAllowed: false,
            admonitiveIsNotNegativeCommand: true,
            diagnostic: "lesson-10-admonitive-sentence-layer-partial",
            enumerableGrammarFrame: false,
        }
    );

    const lesson17 = ctx.buildSentenceLesson17PursuitFrame();
    s.eq(
        "Lesson 17 pursuit frame covers all PDF subsections without supplementation generation",
        {
            stepNumber: lesson17.stepNumber,
            aimStatus: lesson17.aimStatus,
            pdfRefs: lesson17.pdfRefs,
            subsectionSections: lesson17.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson17.generationAllowed,
            closestPass: lesson17.closestPass,
            hitCount: lesson17.hitCount,
            missCount: lesson17.missCount,
            remainingGapCount: lesson17.remainingGaps.length,
        },
        {
            stepNumber: 17,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 17.1",
                "Andrews Lesson 17.2",
                "Andrews Lesson 17.3",
                "Andrews Lesson 17.4",
                "Andrews Lesson 17.5",
                "Andrews Lesson 17.6",
            ],
            subsectionSections: ["17.1", "17.2", "17.3", "17.4", "17.5", "17.6"],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 17 supplementation frame keeps Andrews head and role boundaries",
        {
            relationType: lesson17.supplementationFrame.relationType,
            headAlways: lesson17.supplementationFrame.headAlways,
            referenceMechanism: lesson17.supplementationFrame.referenceMechanism,
            expandableNuclearFunctions: lesson17.supplementationFrame.expandableNuclearFunctions,
            supplementRoles: lesson17.supplementationFrame.supplementRoles,
            supplementationKinds: lesson17.supplementationFrame.supplementationKinds,
            includedReferentDeferredTo: lesson17.supplementationFrame.includedReferentDeferredTo,
        },
        {
            relationType: "apposition",
            headAlways: "personal-pronoun",
            referenceMechanism: ["anaphora", "cataphora"],
            expandableNuclearFunctions: ["subject", "object", "possessor"],
            supplementRoles: ["supplementary subject", "supplementary object", "supplementary possessor"],
            supplementationKinds: ["shared-referent", "included-referent"],
            includedReferentDeferredTo: "Andrews §19.3",
        }
    );
    s.eq(
        "Lesson 17 shared referent topic and question frames stay sentence-level",
        {
            roleIds: lesson17.sharedReferentFrame.roles.map((role) => role.id),
            haveConstructionMentionsCah: /ca-h/.test(lesson17.sharedReferentFrame.haveConstruction),
            directPossessorModifierBlocked: lesson17.sharedReferentFrame.directPossessorModifierBlocked,
            recursiveAdjunction: lesson17.furtherParticularsFrame.recursiveAdjunction,
            topicMustBeAdjunctBeforePrincipal: lesson17.topicalizationFrame.topicMustBeAdjunctBeforePrincipal,
            caCanIntroduceComment: lesson17.topicalizationFrame.caCanIntroduceComment,
            informationQuestionPosition: lesson17.informationQuestionFrame.requiredPosition,
            questionDomains: lesson17.informationQuestionFrame.questionDomains,
        },
        {
            roleIds: ["supplementary-subject", "supplementary-object", "supplementary-possessor"],
            haveConstructionMentionsCah: true,
            directPossessorModifierBlocked: true,
            recursiveAdjunction: true,
            topicMustBeAdjunctBeforePrincipal: true,
            caCanIntroduceComment: true,
            informationQuestionPosition: "sentence-initial",
            questionDomains: ["what", "amount", "who", "whose"],
        }
    );
    s.eq(
        "Lesson 17 pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson17.grammarFrame),
            routeFamily: lesson17.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson17.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson17.grammarFrame?.routeContract?.generationAllowed,
            diagnostic: lesson17.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            headAlways: lesson17.grammarFrame?.nuclearClauseFrame?.supplementationFrame?.headAlways || "",
            supplementRoles: lesson17.grammarFrame?.participantFrame?.supplementRoles || [],
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson17, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "sentence-layer",
            routeStage: "audit-lesson-17",
            generationAllowed: false,
            diagnostic: "lesson-17-supplementation-partial",
            headAlways: "personal-pronoun",
            supplementRoles: ["supplementary subject", "supplementary object", "supplementary possessor"],
            enumerableGrammarFrame: false,
        }
    );

    const lesson18 = ctx.buildSentenceLesson18PursuitFrame();
    s.eq(
        "Lesson 18 pursuit frame covers all PDF subsections without supplementation generation",
        {
            stepNumber: lesson18.stepNumber,
            aimStatus: lesson18.aimStatus,
            pdfRefs: lesson18.pdfRefs,
            subsectionSections: lesson18.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson18.generationAllowed,
            closestPass: lesson18.closestPass,
            hitCount: lesson18.hitCount,
            missCount: lesson18.missCount,
            remainingGapCount: lesson18.remainingGaps.length,
        },
        {
            stepNumber: 18,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 18.1",
                "Andrews Lesson 18.2",
                "Andrews Lesson 18.3",
                "Andrews Lesson 18.4",
                "Andrews Lesson 18.5",
                "Andrews Lesson 18.6",
                "Andrews Lesson 18.7",
                "Andrews Lesson 18.8",
                "Andrews Lesson 18.9",
                "Andrews Lesson 18.10",
                "Andrews Lesson 18.11",
                "Andrews Lesson 18.12",
            ],
            subsectionSections: ["18.1", "18.2", "18.3", "18.4", "18.5", "18.6", "18.7", "18.8", "18.9", "18.10", "18.11", "18.12"],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 18 integrated and marked supplementation frames block surface drift",
        {
            integratedConditionMentionsO: /o#/.test(lesson18.integratedSupplementFrame.condition),
            integratedTranslationBoundary: lesson18.integratedSupplementFrame.translationBoundary,
            marker: lesson18.markedSupplementationFrame.marker,
            subordinatesWholeUnit: lesson18.markedSupplementationFrame.subordinatesWholeUnit,
            affectsNncPredicateDeterminacy: lesson18.markedSupplementationFrame.affectsNncPredicateDeterminacy,
            canMarkTopic: lesson18.markedSupplementationFrame.canMarkTopic,
            traditionalSolidSpellingsAreDiagnosticOnly: lesson18.markedSupplementationFrame.traditionalSolidSpellingsAreDiagnosticOnly,
        },
        {
            integratedConditionMentionsO: true,
            integratedTranslationBoundary: "the structural difference is not translated into English",
            marker: "in",
            subordinatesWholeUnit: true,
            affectsNncPredicateDeterminacy: false,
            canMarkTopic: true,
            traditionalSolidSpellingsAreDiagnosticOnly: true,
        }
    );
    s.eq(
        "Lesson 18 exceptional supplementation frames require AST and evidence",
        {
            shortCannotStandAlone: lesson18.shortPronominalFrame.cannotStandAloneAsUtterance,
            shortOrdinaryFunction: lesson18.shortPronominalFrame.ordinaryFunction,
            discontinuityNeedsAst: lesson18.discontinuousFrame.requiresDistanceAwareAst,
            agreementMayMismatch: lesson18.agreementExceptionFrame.agreementMayMismatch,
            namedPartnerRule: lesson18.namedPartnerFrame.rule,
            maleBondingSubjectMismatch: lesson18.maleBondingFrame.subjectMismatch,
            silentObjectDyad: lesson18.silentSpecificObjectFrame.specificPatientObjectDyad,
            appearsIntransitiveButTransitive: lesson18.silentSpecificObjectFrame.appearsIntransitiveButTransitive,
        },
        {
            shortCannotStandAlone: true,
            shortOrdinaryFunction: "supplement",
            discontinuityNeedsAst: true,
            agreementMayMismatch: true,
            namedPartnerRule: "only the named third-person entity is normally mentioned in the supplement",
            maleBondingSubjectMismatch: "first-person plural supplement may cross-reference a third-person head",
            silentObjectDyad: "0-0",
            appearsIntransitiveButTransitive: true,
        }
    );
    s.eq(
        "Lesson 18 vocative and sentence-order frames keep clauses from becoming words",
        {
            principalDeletionResult: lesson18.principalDeletionFrame.result,
            soCalledVocativeIsReal: lesson18.vocativeFrame.soCalledVocative.isRealVocative,
            realVocativeSubjectPerson: lesson18.vocativeFrame.realVocative.subjectPerson,
            maleSpeakerParticle: lesson18.vocativeFrame.realVocative.maleSpeakerParticle,
            femaleSpeakerParticle: lesson18.vocativeFrame.realVocative.femaleSpeakerParticle,
            constituentOrder: lesson18.sentenceOrderFrame.constituentOrder,
            functionMarkersObligatory: lesson18.sentenceOrderFrame.functionMarkersObligatory,
            recursiveSupplementationPossible: lesson18.sentenceOrderFrame.recursiveSupplementationPossible,
            translationWarningMentionsCompleteClauses: /complete clauses/.test(lesson18.sentenceOrderFrame.translationWarning),
        },
        {
            principalDeletionResult: "adverbial adjunct upgrades to proxy principal and former supplementary subject becomes a surface subject",
            soCalledVocativeIsReal: false,
            realVocativeSubjectPerson: "third-person",
            maleSpeakerParticle: "#e",
            femaleSpeakerParticle: "",
            constituentOrder: "free",
            functionMarkersObligatory: false,
            recursiveSupplementationPossible: true,
            translationWarningMentionsCompleteClauses: true,
        }
    );
    s.eq(
        "Lesson 18 pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson18.grammarFrame),
            routeFamily: lesson18.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson18.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson18.grammarFrame?.routeContract?.generationAllowed,
            diagnostic: lesson18.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            silentSpecificObjectHead: lesson18.grammarFrame?.participantFrame?.silentSpecificObjectHead || "",
            marker: lesson18.grammarFrame?.morphBoundaryFrame?.markedSupplementationFrame?.marker || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson18, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "sentence-layer",
            routeStage: "audit-lesson-18",
            generationAllowed: false,
            diagnostic: "lesson-18-supplementation-part-two-partial",
            silentSpecificObjectHead: "silently present specific object pronoun",
            marker: "in",
            enumerableGrammarFrame: false,
        }
    );

    const lesson19 = ctx.buildSentenceLesson19PursuitFrame();
    s.eq(
        "Lesson 19 pursuit frame covers all PDF subsections without supplementation generation",
        {
            stepNumber: lesson19.stepNumber,
            aimStatus: lesson19.aimStatus,
            pdfRefs: lesson19.pdfRefs,
            subsectionSections: lesson19.subsectionInventory.map((entry) => entry.andrewsSection),
            generationAllowed: lesson19.generationAllowed,
            closestPass: lesson19.closestPass,
            hitCount: lesson19.hitCount,
            missCount: lesson19.missCount,
            remainingGapCount: lesson19.remainingGaps.length,
        },
        {
            stepNumber: 19,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 19.1",
                "Andrews Lesson 19.2",
                "Andrews Lesson 19.3",
                "Andrews Lesson 19.4",
                "Andrews Lesson 19.5",
                "Andrews Lesson 19.6",
            ],
            subsectionSections: ["19.1", "19.2", "19.3", "19.4", "19.5", "19.6"],
            generationAllowed: false,
            closestPass: false,
            hitCount: 1,
            missCount: 0,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 19 VNC supplement and pronominal plural frames stay diagnostic",
        {
            supplementClauseTypes: lesson19.vncSupplementsFrame.supplementClauseTypes,
            usualMarker: lesson19.vncSupplementsFrame.usualMarker,
            markerAlmostAlwaysOptional: lesson19.vncSupplementsFrame.markerAlmostAlwaysOptional,
            recursiveAdjunction: lesson19.vncSupplementsFrame.recursiveAdjunction,
            rhetoricalWeightingCanReverseEnglishSubordination: lesson19.vncSupplementsFrame.rhetoricalWeightingCanReverseEnglishSubordination,
            pronominalTargets: lesson19.pronominalPluralFrame.targets,
            principalVncTense: lesson19.pronominalPluralFrame.principalVncTense,
            acPluralAgreementMayMismatch: lesson19.pronominalPluralFrame.acPluralAgreementMayMismatch,
        },
        {
            supplementClauseTypes: ["intransitive VNC", "transitive VNC"],
            usualMarker: "adjunctor in",
            markerAlmostAlwaysOptional: true,
            recursiveAdjunction: true,
            rhetoricalWeightingCanReverseEnglishSubordination: true,
            pronominalTargets: ["in", "on", "ac"],
            principalVncTense: "preterit-as-present",
            acPluralAgreementMayMismatch: true,
        }
    );
    s.eq(
        "Lesson 19 included-referent frame records whole-clause third singular head logic",
        {
            contrastsWith: lesson19.includedReferentFrame.contrastsWith,
            referentIdentityRequired: lesson19.includedReferentFrame.referentIdentityRequired,
            supplementAsWholeIsReferent: lesson19.includedReferentFrame.supplementAsWholeIsReferent,
            wholeSupplementAssessedAs: lesson19.includedReferentFrame.wholeSupplementAssessedAs,
            headInPrincipalMustBe: lesson19.includedReferentFrame.headInPrincipalMustBe,
            principalClauseTypes: lesson19.includedReferentFrame.principalClauseTypes.map((entry) => [entry.clauseType, entry.allowedSupplementFunctions]),
            semanticGroups: lesson19.includedReferentFrame.transitivePrincipalSemanticGroups,
        },
        {
            contrastsWith: "shared-referent supplementation",
            referentIdentityRequired: false,
            supplementAsWholeIsReferent: true,
            wholeSupplementAssessedAs: "third-person singular",
            headInPrincipalMustBe: "third-person singular",
            principalClauseTypes: [
                ["NNC", ["supplementary subject", "supplementary possessor"]],
                ["intransitive VNC", ["supplementary subject"]],
                ["transitive VNC", ["supplementary subject", "supplementary object"]],
            ],
            semanticGroups: [
                "saying-questioning",
                "causing",
                "wanting-desiring-needing",
                "perception",
                "knowing-remembering-forgetting",
                "affect",
            ],
        }
    );
    s.eq(
        "Lesson 19 report and deleted-saying frames block translation shortcuts",
        {
            infinitiveConditions: lesson19.infinitiveTranslationFrame.conditions,
            nequiDistinctive: lesson19.infinitiveTranslationFrame.nequiDistinctive,
            rumoredPrincipal: lesson19.rumoredReportFrame.principalVnc,
            rumoredFixedSubject: lesson19.rumoredReportFrame.fixedSubject,
            rumoredFixedTense: lesson19.rumoredReportFrame.fixedTense,
            deletedPrincipal: lesson19.deletedSayingFrame.deletedPrincipal,
            deletedRequiresSpeechAst: lesson19.deletedSayingFrame.requiresSpeechAst,
        },
        {
            infinitiveConditions: ["included-referent supplementation", "adjoined VNC has future tense morph", "both clauses have subject pronouns with the same referent"],
            nequiDistinctive: ["can form incorporated-object future-embed compound VNC", "can take wish-sentence supplementary object"],
            rumoredPrincipal: "quil",
            rumoredFixedSubject: "third-person singular",
            rumoredFixedTense: "preterit",
            deletedPrincipal: "principal clause of saying",
            deletedRequiresSpeechAst: true,
        }
    );
    s.eq(
        "Lesson 19 pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson19.grammarFrame),
            routeFamily: lesson19.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson19.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson19.grammarFrame?.routeContract?.generationAllowed,
            diagnostic: lesson19.grammarFrame?.diagnosticFrame?.diagnostics?.[0]?.id || "",
            wholeSupplementAssessedAs: lesson19.grammarFrame?.participantFrame?.wholeSupplementAssessedAs || "",
            rumoredPrincipal: lesson19.grammarFrame?.nuclearClauseFrame?.rumoredReportFrame?.principalVnc || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson19, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "sentence-layer",
            routeStage: "audit-lesson-19",
            generationAllowed: false,
            diagnostic: "lesson-19-supplementation-part-three-partial",
            wholeSupplementAssessedAs: "third-person singular",
            rumoredPrincipal: "quil",
            enumerableGrammarFrame: false,
        }
    );

    const sentenceCandidate = ctx.classifySentenceCandidate({
        text: "amo ni nemi?",
        polarity: "negative",
        questionType: "yes-no",
    });
    const sentenceFrame = sentenceCandidate.grammarFrame;
    s.eq(
        "sentence layer metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(sentenceFrame),
            routeFamily: sentenceFrame?.routeContract?.routeFamily || "",
            routeStage: sentenceFrame?.routeContract?.routeStage || "",
            generationAllowed: sentenceFrame?.routeContract?.generationAllowed,
            questionType: sentenceFrame?.participantFrame?.questionType || "",
            andrewsRef: sentenceFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(sentenceCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "sentence-layer",
            routeStage: "classify-candidate",
            generationAllowed: false,
            questionType: "yes-no",
            andrewsRef: "Andrews Lessons 8-10",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
