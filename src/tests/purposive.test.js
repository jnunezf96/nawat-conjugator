"use strict";

/**
 * Tests for src/core/vnc/purposive/purposive.mjs
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("purposive");

    s.eq(
        "Lesson 29 purposive/directional API is exported",
        [
            typeof ctx.buildPurposiveDirectionalBoundaryMetadata,
            typeof ctx.classifyPurposiveDirectionalCandidate,
            typeof ctx.classifyPurposiveDirectionalFalsePositive,
            typeof ctx.getPurposiveDirectionalAntiConflationRules,
            typeof ctx.getLesson29PurposiveSubsectionInventory,
            typeof ctx.buildLesson29PurposivePursuitFrame,
            typeof ctx.getPurposiveMatrixShape,
            typeof ctx.buildPurposiveDirectionalSourceFrame,
            typeof ctx.buildPurposiveDirectionalOperationFrame,
            typeof ctx.buildAndrewsPurposiveDirectionalVnc,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildPurposiveDirectionalBoundaryMetadata();
    s.eq(
        "purposive/directional boundary is explicit and Andrews source-gated",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            generationAllowed: boundary.generationAllowed,
            confirmedExamples: boundary.confirmedExamples,
            pdfRefs: boundary.pdfRefs,
            subsectionSections: boundary.subsectionInventory.map((entry) => entry.andrewsSection),
            knownDirectionalPrefixes: boundary.knownDirectionalPrefixes,
            internalMatrixDirectionalMorphs: boundary.internalMatrixDirectionalMorphs,
            externalDirectionalHints: boundary.externalDirectionalHints,
            boundaries: boundary.boundaries,
            questionFields: boundary.structuralQuestions.map((question) => question.field),
        },
        {
            kind: "purposive-directional-boundary",
            lesson: 29,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            pdfRefs: [
                "Andrews Lesson 29.1",
                "Andrews Lesson 29.2",
                "Andrews Lesson 29.3",
                "Andrews Lesson 29.4",
                "Andrews Lesson 29.5",
                "Andrews Lesson 29.6",
                "Andrews Lesson 29.7",
            ],
            subsectionSections: ["29.1", "29.2", "29.3", "29.4", "29.5", "29.6", "29.7"],
            knownDirectionalPrefixes: ["wal", "un"],
            internalMatrixDirectionalMorphs: [
                { classical: "t", direction: "outbound", nawatLetterHint: "t" },
                { classical: "c/qu", direction: "inbound", nawatLetterHint: "k" },
            ],
            externalDirectionalHints: [
                { classical: "hual", currentNawatHint: "wal" },
                { classical: "on", currentNawatHint: "un" },
            ],
            boundaries: {
                hasDirectionalPrefixMechanics: true,
                hasPurposiveGeneration: true,
                hasConfirmedPurposiveFixtureData: false,
                hasLesson29PursuitFrame: true,
                changesDirectionalGeneration: false,
                changesVncGeneration: false,
                treatsDirectionalPrefixAsPurposiveEvidence: false,
                treatsInternalDirectionalAsConnectiveT: false,
            },
            questionFields: [
                "sourceStem",
                "directionalPrefix",
                "relation",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized directional prefix remains unconfirmed purposive evidence",
        ctx.classifyPurposiveDirectionalCandidate({
            sourceStem: "ya",
            candidate: "[wal]/ya",
            directionalPrefix: "wal",
            relation: "directional",
        }),
        {
            kind: "purposive-directional-candidate-classification",
            version: 1,
            sourceStem: "ya",
            candidate: "[wal]/ya",
            directionalPrefix: "wal",
            hasKnownDirectionalPrefix: true,
            relation: "directional",
            evidenceSource: "",
            falsePositiveSource: "unknown",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "purposive-directional-source-gate-required",
                "directional-prefix-recognized",
                "purposive-directional-unconfirmed",
            ],
            boundary,
        }
    );
    s.eq(
        "purposive candidate strings are diagnostic only and cannot authorize generation",
        (() => {
            const classification = ctx.classifyPurposiveDirectionalCandidate({
                sourceStem: "chiwa",
                candidate: "chiwa-t-i-hui",
                relation: "purposive-directional",
            });
            return {
                kind: classification.kind,
                relation: classification.relation,
                generationAllowed: classification.generationAllowed,
                surface: classification.surface || "",
                surfaceForms: classification.surfaceForms || [],
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                resultSurface: classification.frames.resultFrame.surface || "",
                orthographyStatus: classification.frames.orthographyFrame.orthographyStatus,
                spellingAuthority: classification.frames.orthographyFrame.spellingAuthority,
            };
        })(),
        {
            kind: "purposive-directional-candidate-classification",
            relation: "purposive-directional",
            generationAllowed: false,
            surface: "",
            surfaceForms: [],
            diagnostics: [
                "purposive-directional-candidate-diagnostic-only",
                "directional-prefix-unconfirmed",
                "purposive-directional-unconfirmed",
            ],
            routeStage: "classify-candidate",
            frameGenerationAllowed: false,
            resultSurface: "",
            orthographyStatus: "source-gated",
            spellingAuthority: "Nawat/Pipil orthography bridge",
        }
    );
    s.eq(
        "Andrews purposive matrix shapes generate across direction mood and tense",
        [
            ctx.getPurposiveMatrixShape({ direction: "outbound", mood: "indicative", tense: "nonpast", number: "singular" }).matrixShape,
            ctx.getPurposiveMatrixShape({ direction: "outbound", mood: "indicative", tense: "nonpast", number: "plural" }).matrixShape,
            ctx.getPurposiveMatrixShape({ direction: "outbound", mood: "indicative", tense: "past" }).matrixShape,
            ctx.getPurposiveMatrixShape({ direction: "outbound", mood: "optative", tense: "nonpast" }).matrixShape,
            ctx.getPurposiveMatrixShape({ direction: "inbound", mood: "indicative", tense: "nonfuture" }).matrixShape,
            ctx.getPurposiveMatrixShape({ direction: "inbound", mood: "indicative", tense: "future", number: "plural" }).matrixShape,
            ctx.getPurposiveMatrixShape({ direction: "inbound", mood: "optative", tense: "nonpast" }).matrixShape,
        ],
        ["t-i-uh", "t-i-hui", "t-o", "t-i", "c-o", "qu-i-hui", "qu-i"]
    );
    s.eq(
        "Andrews purposive generator builds target stem from typed operation frame",
        (() => {
            const sourceFrame = ctx.buildPurposiveDirectionalSourceFrame({ embedStem: "chiwa" });
            const operationFrame = ctx.buildPurposiveDirectionalOperationFrame({
                sourceFrame,
                direction: "outbound",
                mood: "indicative",
                tense: "nonpast",
                number: "plural",
                personPrefix: "ti-0",
            });
            const generated = ctx.buildAndrewsPurposiveDirectionalVnc({ operationFrame });
            return {
                kind: generated.kind,
                operationFrameKind: generated.operationFrame.kind,
                targetStemClassical: generated.targetStemClassical,
                targetStem: generated.targetStem,
                structuralFormula: generated.structuralFormula,
                generationAllowed: generated.generationAllowed,
                formulaSlots: generated.formulaSlots,
                routeStage: generated.frames.routeContract.routeStage,
                orthographyStatus: generated.frames.orthographyFrame.orthographyStatus,
                finiteSurfaceExpansionAllowed: generated.frames.routeContract.targetContract.finiteSurfaceExpansionAllowed,
            };
        })(),
        {
            kind: "purposive-directional-andrews-generation",
            operationFrameKind: "andrews-purposive-directional-operation-frame",
            targetStemClassical: "chiwa-□-t-i-hui",
            targetStem: "chiwatiwi",
            structuralFormula: "#ti-0(chiwa-□-t-i-hui)0+0-h#",
            generationAllowed: true,
            formulaSlots: {
                pers: "ti-0",
                objectPrefix: "",
                embedStem: "chiwa",
                silentFutureTenseMorph: "□",
                matrixDirectionalMorph: "t",
                matrixBaseStem: "i-hui",
                matrixShape: "t-i-hui",
                tense: "0",
                num1: "0",
                num2: "h",
            },
            routeStage: "generate-andrews-purposive-paradigm",
            orthographyStatus: "orthography-bridge-realized",
            finiteSurfaceExpansionAllowed: false,
        }
    );
    s.eq(
        "old string-only Andrews purposive API blocks without typed operation frame",
        (() => {
            const generated = ctx.buildAndrewsPurposiveDirectionalVnc({
                sourceStem: "chiwa",
                direction: "outbound",
                mood: "indicative",
                tense: "nonpast",
                number: "plural",
                personPrefix: "ti-0",
            });
            return {
                generationAllowed: generated.generationAllowed,
                diagnostic: generated.diagnostics[0],
                routeStage: generated.frames.routeContract.routeStage,
            };
        })(),
        {
            generationAllowed: false,
            diagnostic: "purposive-directional-missing-typed-operation-frame",
            routeStage: "block-unsupported-purposive-paradigm",
        }
    );
    s.eq(
        "Andrews purposive generator blocks contradictory typed target frame",
        (() => {
            const sourceFrame = ctx.buildPurposiveDirectionalSourceFrame({ embedStem: "chiwa" });
            const operationFrame = ctx.buildPurposiveDirectionalOperationFrame({
                sourceFrame,
                direction: "outbound",
                mood: "indicative",
                tense: "nonpast",
                number: "plural",
                personPrefix: "ti-0",
            });
            const generated = ctx.buildAndrewsPurposiveDirectionalVnc({
                operationFrame: {
                    ...operationFrame,
                    targetFrame: {
                        ...operationFrame.targetFrame,
                        targetStemClassical: "poisoned-□-t-i-hui",
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
            diagnostic: "purposive-directional-contradictory-typed-operation-frame",
            routeStage: "block-contradictory-purposive-frame",
        }
    );
    s.eq(
        "poisoning legacy purposive string normalizer does not affect typed operation output",
        (() => {
            const originalNormalizer = ctx.normalizePurposiveDirectionalCandidateSurface;
            try {
                ctx.normalizePurposiveDirectionalCandidateSurface = () => "poisoned";
                const sourceFrame = ctx.buildPurposiveDirectionalSourceFrame({ embedStem: "chiwa" });
                const operationFrame = ctx.buildPurposiveDirectionalOperationFrame({
                    sourceFrame,
                    direction: "outbound",
                    mood: "indicative",
                    tense: "nonpast",
                    number: "plural",
                    personPrefix: "ti-0",
                });
                return ctx.buildAndrewsPurposiveDirectionalVnc({ operationFrame }).targetStem;
            } finally {
                ctx.normalizePurposiveDirectionalCandidateSurface = originalNormalizer;
            }
        })(),
        "chiwatiwi"
    );
    s.eq(
        "purposive classifier generates from Andrews slots when candidate is omitted",
        (() => {
            const sourceFrame = ctx.buildPurposiveDirectionalSourceFrame({ embedStem: "chiwa" });
            const classification = ctx.classifyPurposiveDirectionalCandidate({
                sourceFrame,
                relation: "purposive-directional",
                direction: "inbound",
                mood: "indicative",
                tense: "future",
                number: "singular",
                objectPrefix: "te",
                personPrefix: "ni-0",
            });
            return {
                candidate: classification.candidate,
                surface: classification.surface,
                structuralFormula: classification.structuralFormula,
                diagnostics: classification.diagnostics,
                routeStage: classification.frames.routeContract.routeStage,
                frameGenerationAllowed: classification.frames.routeContract.generationAllowed,
                andrewsParadigmGenerated: classification.frames.routeContract.targetContract.andrewsParadigmGenerated,
                sourceSurface: classification.frames.orthographyFrame.sourceSurface,
            };
        })(),
        {
            candidate: "chiwa-□-qu-i-uh",
            surface: "chiwakiw",
            structuralFormula: "#ni-0+te(chiwa-□-qu-i-uh)0+0-0#",
            diagnostics: [
                "purposive-directional-andrews-paradigm-generated",
                "directional-prefix-unconfirmed",
                "purposive-directional-structured-source",
            ],
            routeStage: "generate-structured-purposive",
            frameGenerationAllowed: true,
            andrewsParadigmGenerated: true,
            sourceSurface: "chiwa-□-qu-i-uh",
        }
    );

    s.eq(
        "parser bracket syntax is classified as false positive evidence",
        ctx.classifyPurposiveDirectionalFalsePositive("parser-bracket-syntax"),
        {
            kind: "purposive-directional-false-positive",
            version: 1,
            source: "parser-bracket-syntax",
            isPurposiveEvidence: false,
            generationAllowed: false,
            diagnostics: ["purposive-directional-false-positive-source"],
            antiConflationRules: ctx.getPurposiveDirectionalAntiConflationRules(),
        }
    );

    s.eq(
        "purposive/directional metadata carries anti-conflation rules",
        ctx.getPurposiveDirectionalAntiConflationRules(),
        [
            "directional prefix mechanics are not purposive VNC generation",
            "bracketed directional parser syntax is not purposive evidence",
            "composer directional controls are not confirmed purposive forms",
            "purpose translations are not Andrews source gates",
            "compound parsing is not purposive VNC generation",
            "Andrews purposive categories are architecture, not Classical surface authority",
        ]
    );
    s.no("purposive/directional boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("purposive/directional boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));
    const purposiveCandidate = ctx.classifyPurposiveDirectionalCandidate({
        sourceStem: "ya",
        candidate: "[wal]/ya",
        directionalPrefix: "wal",
        relation: "directional",
    });
    const purposiveFrame = purposiveCandidate.grammarFrame;
    s.eq(
        "purposive/directional metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(purposiveFrame),
            routeFamily: purposiveFrame?.routeContract?.routeFamily || "",
            routeStage: purposiveFrame?.routeContract?.routeStage || "",
            generationAllowed: purposiveFrame?.routeContract?.generationAllowed,
            relation: purposiveFrame?.stemFrame?.relation || "",
            andrewsRef: purposiveFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            unitKind: purposiveFrame?.unitFrame?.unitKind || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(purposiveCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "purposive-directional",
            routeStage: "classify-candidate",
            generationAllowed: false,
            relation: "directional",
            andrewsRef: "Andrews Lesson 29.1",
            unitKind: "purposive-vnc-boundary",
            enumerableGrammarFrame: false,
        }
    );
    const lesson29Frame = ctx.buildLesson29PurposivePursuitFrame();
    s.eq(
        "lesson 29 pursuit frame covers all purposive subsections",
        {
            stepNumber: lesson29Frame.stepNumber,
            pdfRefs: lesson29Frame.pdfRefs.length,
            subsectionSections: lesson29Frame.subsectionInventory.map((entry) => entry.andrewsSection),
            plannedArrowIds: lesson29Frame.plannedArrows.map((arrow) => arrow.id),
            firedArrowIds: lesson29Frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
            hitCount: lesson29Frame.hitCount,
            missCount: lesson29Frame.missCount,
            closestPass: lesson29Frame.closestPass,
            generationAllowed: lesson29Frame.generationAllowed,
        },
        {
            stepNumber: 29,
            pdfRefs: 7,
            subsectionSections: ["29.1", "29.2", "29.3", "29.4", "29.5", "29.6", "29.7"],
            plannedArrowIds: ["lesson-29-purposive-vnc-audit"],
            firedArrowIds: [["lesson-29-purposive-vnc-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            closestPass: false,
            generationAllowed: false,
        }
    );
    s.eq(
        "lesson 29 pursuit frame records Andrews purposive architecture",
        {
            compoundType: lesson29Frame.purposiveVerbstemFrame.compoundType,
            embedFutureMorph: lesson29Frame.purposiveVerbstemFrame.embed.futureMorph,
            internalMorphs: lesson29Frame.purposiveVerbstemFrame.matrix.directionalMorphs.map((entry) => [entry.classical, entry.direction, entry.nawatLetterHint]),
            movementSets: lesson29Frame.vncParadigmFrame.movementSets,
            outboundParadigms: lesson29Frame.outboundFrame.paradigms.map((entry) => entry.id),
            inboundParadigms: lesson29Frame.inboundFrame.paradigms.map((entry) => entry.id),
            nonactiveVoices: lesson29Frame.nonactiveEmbedFrame.voices,
            compoundEmbed: lesson29Frame.compoundEmbedFrame.compoundStemmedPredicateMayOccupyEmbed,
            externalDirectionals: lesson29Frame.externalDirectionalFrame.externalDirectionals.map((entry) => [entry.classical, entry.currentNawatHint]),
            directionCanDisagree: lesson29Frame.externalDirectionalFrame.externalAndInternalDirectionCanDisagree,
        },
        {
            compoundType: "future-embed linked connectiveless compound",
            embedFutureMorph: "silent variant of z",
            internalMorphs: [["t", "outbound/thither", "t"], ["c/qu", "inbound/hither", "k"]],
            movementSets: ["outbound", "inbound"],
            outboundParadigms: ["outbound-nonpast-indicative", "outbound-past-indicative", "outbound-nonpast-optative"],
            inboundParadigms: ["inbound-nonfuture-indicative", "inbound-future-indicative", "inbound-nonpast-optative"],
            nonactiveVoices: ["passive", "impersonal"],
            compoundEmbed: true,
            externalDirectionals: [["hual", "wal"], ["on", "un"]],
            directionCanDisagree: true,
        }
    );
    s.eq(
        "lesson 29 pursuit frame records Andrews paradigm generation boundary",
        lesson29Frame.currentEngineBoundary,
        {
            directionalPrefixMechanicsImplemented: true,
            boundaryMetadataImplemented: true,
            candidateClassifierImplemented: true,
            falsePositiveClassifierImplemented: true,
            purposiveGenerationImplemented: true,
            confirmedPurposiveFixtureData: false,
            outboundParadigmGenerationImplemented: true,
            inboundParadigmGenerationImplemented: true,
            nonactiveEmbedGenerationImplemented: false,
            compoundStemmedEmbedGenerationImplemented: false,
            externalDirectionalPurposiveGenerationImplemented: false,
            finiteOutputExpansionAllowed: false,
        }
    );
    s.eq(
        "lesson 29 pursuit frame has LCM redirect contract",
        {
            routeFamily: lesson29Frame.frames.routeContract.routeFamily,
            routeStage: lesson29Frame.frames.routeContract.routeStage,
            generationAllowed: lesson29Frame.frames.routeContract.generationAllowed,
            unitKind: lesson29Frame.frames.unitFrame.unitKind,
            targetGenerationAllowed: lesson29Frame.frames.routeContract.targetContract.generationAllowed,
            orthographyStatus: lesson29Frame.frames.orthographyFrame.orthographyStatus,
            stemKind: lesson29Frame.frames.stemFrame.stemKind,
            optativeTenseSystem: lesson29Frame.frames.inflectionFrame.optativeTenseSystem,
        },
        {
            routeFamily: "purposive-directional",
            routeStage: "audit-lesson-29",
            generationAllowed: false,
            unitKind: "purposive-vnc-boundary",
            targetGenerationAllowed: false,
            orthographyStatus: "orthography-bridge-required",
            stemKind: "purposive-compound-verbstem",
            optativeTenseSystem: "nonpast only",
        }
    );

    return s;
}

module.exports = { run };
