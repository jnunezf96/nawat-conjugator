"use strict";

/**
 * Tests for src/core/derivation/frequentative/frequentative.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("frequentative");

    s.eq(
        "Lesson 27 frequentative API is exported",
        [
            typeof ctx.buildFrequentativeBoundaryMetadata,
            typeof ctx.buildLesson27FrequentativePursuitFrame,
            typeof ctx.classifyFrequentativeCandidate,
            typeof ctx.classifyFrequentativeFalsePositive,
            typeof ctx.getLesson27FrequentativeSubsectionInventory,
            typeof ctx.getFrequentativeAntiConflationRules,
        ],
        ["function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildFrequentativeBoundaryMetadata();
    s.eq(
        "frequentative boundary is explicit and non-generative",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            pdfRefs: boundary.pdfRefs,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            subsectionCategories: boundary.subsectionInventory.map((entry) => entry.category),
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "frequentative-boundary",
            lesson: 27,
            status: "partial",
            pdfRefs: [
                "Andrews Lesson 27.1",
                "Andrews Lesson 27.2",
                "Andrews Lesson 27.3",
                "Andrews Lesson 27.4",
                "Andrews Lesson 27.5",
                "Andrews Lesson 27.6",
            ],
            generationAllowed: false,
            confirmedExamples: [],
            subsectionCategories: [
                "frequentative-overview",
                "ordinary-short-vowel-glottal",
                "ordinary-long-vowel",
                "ordinary-short-vowel",
                "object-pronoun-tla-reduplication",
                "reflexive-object-reduplication",
                "intransitive-destockal-frequentative",
                "causative-destockal-frequentative",
                "lexicalized-destockal-frequentative",
                "tza-causative-applicative-ambiguity",
                "destockal-frequentative-applicative",
                "destockal-frequentative-type-two-causative",
                "uncertain-ca-frequentative",
                "uncertain-tzca-frequentative",
                "nonactive-frequentative",
            ],
            boundaries: {
                hasFrequentativeGeneration: false,
                hasConfirmedFixtureData: false,
                reusesGenericReduplicationAsEvidence: false,
                changesExistingReduplicationHelpers: false,
                changesVncGeneration: false,
            },
            questionFields: [
                "sourceStem",
                "frequentativeType",
                "reduplicationTarget",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "frequentative candidate classifier records categories without confirming forms",
        ctx.classifyFrequentativeCandidate({
            sourceStem: "nemi",
            candidate: "nenemi",
            frequentativeType: "ordinary",
            reduplicationTarget: "stem",
        }),
        {
            kind: "frequentative-candidate-classification",
            version: 1,
            sourceStem: "nemi",
            candidate: "nenemi",
            frequentativeType: "ordinary",
            reduplicationTarget: "stem",
            evidenceSource: "",
            sourceGate: "",
            structuredSource: false,
            falsePositiveSource: "unknown",
            confirmed: false,
            supported: false,
            generationAllowed: false,
            surfaceForms: [],
            diagnostics: [
                "frequentative-source-gate-required",
                "frequentative-unconfirmed",
            ],
            boundary,
        }
    );

    s.eq(
        "structured Andrews frequentative candidate generates through orthography bridge",
        (() => {
            const classification = ctx.classifyFrequentativeCandidate({
                sourceStem: "nemi",
                candidate: "ne-nemi",
                frequentativeType: "ordinary",
                reduplicationTarget: "stem",
                sourceGate: "Andrews 27.2 ordinary frequentative source",
                structuredSource: true,
            });
            return {
                confirmed: classification.confirmed,
                supported: classification.supported,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface,
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
            surface: "nenemi",
            diagnostics: [
                "frequentative-andrews-source-generated",
                "frequentative-structured-source",
            ],
            routeStage: "generate-structured-frequentative",
            frameGenerationAllowed: true,
            orthographyStatus: "orthography-bridge-realized",
            spellingAuthority: "Nawat/Pipil orthography bridge",
            targetStem: "nenemi",
        }
    );

    s.eq(
        "generic reduplication is classified as a false positive, not evidence",
        ctx.classifyFrequentativeFalsePositive("generic-reduplication"),
        {
            kind: "frequentative-false-positive",
            version: 1,
            source: "generic-reduplication",
            isFrequentativeEvidence: false,
            generationAllowed: false,
            diagnostics: ["frequentative-false-positive-source"],
            antiConflationRules: ctx.getFrequentativeAntiConflationRules(),
        }
    );

    s.eq(
        "frequentative metadata carries anti-conflation rules",
        ctx.getFrequentativeAntiConflationRules(),
        [
            "frequentative boundary metadata is not generation",
            "generic reduplication is not a frequentative derivation engine",
            "preterit reduplication diagnostics are not frequentative evidence",
            "ordinary NNC distributive reduplication is not VNC frequentative derivation",
            "patientive/adjectival reduplication is not VNC frequentative derivation",
            "Andrews frequentative categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    const lesson27Frame = ctx.buildLesson27FrequentativePursuitFrame();
    s.eq(
        "Lesson 27 frequentative pursuit frame keeps Andrews coverage diagnostic-only",
        {
            stepNumber: lesson27Frame.stepNumber,
            aimStatus: lesson27Frame.aimStatus,
            pdfRefs: lesson27Frame.pdfRefs,
            subsectionCount: lesson27Frame.subsectionInventory.length,
            meanings: lesson27Frame.overviewFrame.meanings,
            prefixShapes: lesson27Frame.overviewFrame.prefixShapes,
            ordinaryShapeIds: lesson27Frame.ordinaryFrame.shapes.map((entry) => entry.id),
            noStrictShapeSelectionRules: lesson27Frame.ordinaryFrame.noStrictShapeSelectionRules,
            tlaForms: lesson27Frame.objectPronounFrame.tlaFusion.reduplicatedForms,
            reflexiveForms: lesson27Frame.objectPronounFrame.reflexiveObject.partialReduplicatedForms,
            intransitiveDestockalTarget: lesson27Frame.destockalFrame.intransitiveDestockal.targetThemeSuffix,
            intransitiveDestockalNonactive: lesson27Frame.destockalFrame.intransitiveDestockal.nonactiveStems,
            causativeDestockalTarget: lesson27Frame.destockalFrame.causativeDestockal.targetFormative,
            destockalApplicative: lesson27Frame.destockalFrame.applicativeOfCausativeDestockal,
            uncertainDetailsUnclear: lesson27Frame.uncertainFrame.detailsUnclear,
            nonactiveCanFrequentativize: lesson27Frame.nonactiveFrame.nonactiveVerbstemsCanUndergoFrequentativeDerivation,
            generationImplemented: lesson27Frame.currentEngineBoundary.frequentativeGenerationImplemented,
            genericReduplicationNotEvidence: lesson27Frame.currentEngineBoundary.genericReduplicationNotEvidence,
            closestPass: lesson27Frame.closestPass,
            remainingGapCount: lesson27Frame.remainingGaps.length,
        },
        {
            stepNumber: 27,
            aimStatus: "shooting",
            pdfRefs: [
                "Andrews Lesson 27.1",
                "Andrews Lesson 27.2",
                "Andrews Lesson 27.3",
                "Andrews Lesson 27.4",
                "Andrews Lesson 27.5",
                "Andrews Lesson 27.6",
            ],
            subsectionCount: 15,
            meanings: [
                "repetition",
                "continuity",
                "intensity",
                "multiplicity of agents, patients, occasions, or places",
            ],
            prefixShapes: [
                "optional consonant plus short vowel plus glottal stop",
                "optional consonant plus long vowel",
                "optional consonant plus short vowel",
            ],
            ordinaryShapeIds: ["short-vowel-glottal", "long-vowel", "short-vowel"],
            noStrictShapeSelectionRules: true,
            tlaForms: ["tlah-tla", "tla-tla"],
            reflexiveForms: ["m-oh-o", "n-oh-o", "t-oh-o"],
            intransitiveDestockalTarget: "ca",
            intransitiveDestockalNonactive: ["c-o", "c-o-hua"],
            causativeDestockalTarget: "tz-a",
            destockalApplicative: "change tz-a to ch-i and add lia",
            uncertainDetailsUnclear: true,
            nonactiveCanFrequentativize: true,
            generationImplemented: false,
            genericReduplicationNotEvidence: true,
            closestPass: false,
            remainingGapCount: 4,
        }
    );
    s.eq(
        "Lesson 27 frequentative pursuit frame exposes non-enumerable LCM audit frames",
        {
            hasFrame: Boolean(lesson27Frame.grammarFrame),
            routeFamily: lesson27Frame.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: lesson27Frame.grammarFrame?.routeContract?.routeStage || "",
            generationAllowed: lesson27Frame.grammarFrame?.routeContract?.generationAllowed,
            ok: lesson27Frame.ok,
            unitKind: lesson27Frame.grammarFrame?.unitFrame?.unitKind || "",
            stemKind: lesson27Frame.grammarFrame?.stemFrame?.stemKind || "",
            frequentativeTypes: lesson27Frame.grammarFrame?.stemFrame?.frequentativeTypes || [],
            andrewsRef: lesson27Frame.grammarFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(lesson27Frame, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "frequentative",
            routeStage: "audit-lesson-27",
            generationAllowed: false,
            ok: true,
            unitKind: "vnc-derivation-boundary",
            stemKind: "frequentative-verbstem",
            frequentativeTypes: ["ordinary", "object-pronoun-reduplicating", "destockal", "uncertain", "nonactive"],
            andrewsRef: "Andrews Lesson 27.1",
            enumerableGrammarFrame: false,
        }
    );
    s.no("frequentative boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("frequentative boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));
    const frequentativeCandidate = ctx.classifyFrequentativeCandidate({
        sourceStem: "nemi",
        candidate: "nenemi",
        frequentativeType: "ordinary",
        reduplicationTarget: "stem",
    });
    const frequentativeFrame = frequentativeCandidate.grammarFrame;
    s.eq(
        "frequentative metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(frequentativeFrame),
            routeFamily: frequentativeFrame?.routeContract?.routeFamily || "",
            routeStage: frequentativeFrame?.routeContract?.routeStage || "",
            generationAllowed: frequentativeFrame?.routeContract?.generationAllowed,
            sourceStem: frequentativeFrame?.stemFrame?.sourceStem || "",
            andrewsRef: frequentativeFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(frequentativeCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "frequentative",
            routeStage: "classify-candidate",
            generationAllowed: false,
            sourceStem: "nemi",
            andrewsRef: "Andrews Lesson 27",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
