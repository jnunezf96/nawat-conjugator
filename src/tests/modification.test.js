"use strict";

/**
 * Tests for src/core/clause/modification/modification.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("modification");

    s.eq(
        "Lessons 42-43 adjectival modification API is exported",
        [
            typeof ctx.buildAdjectivalModificationBoundaryMetadata,
            typeof ctx.classifyAdjectivalModificationCandidate,
            typeof ctx.classifyAdjectivalModificationFalsePositive,
            typeof ctx.getAdjectivalModificationAntiConflationRules,
            typeof ctx.buildAdjectivalModificationAst,
            typeof ctx.buildLesson42AdjectivalModificationPursuitFrame,
            typeof ctx.getLesson42AdjectivalModificationSubsectionInventory,
            typeof ctx.buildLesson43AdjectivalModificationPursuitFrame,
            typeof ctx.getLesson43AdjectivalModificationSubsectionInventory,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildAdjectivalModificationBoundaryMetadata();
    s.eq(
        "adjectival modification boundary is explicit and non-generative",
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
            kind: "adjectival-modification-boundary",
            lessons: [42, 43],
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasAdjectiveLikeWordOutputs: true,
                hasNominalizationProfileMetadata: true,
                hasModificationAst: true,
                hasConfirmedClauseExamples: false,
                changesAdjectiveGeneration: false,
                changesNncGeneration: false,
                changesVncGeneration: false,
                treatsSingleGeneratedWordAsModificationEvidence: false,
            },
            questionFields: [
                "head",
                "modifier",
                "relation",
                "order",
                "evidenceSource",
            ],
        }
    );
    s.eq(
        "Lesson 42 pursuit frame covers every Andrews adjectival-modification subsection",
        (() => {
            const inventory = ctx.getLesson42AdjectivalModificationSubsectionInventory();
            const frame = ctx.buildLesson42AdjectivalModificationPursuitFrame();
            return {
                kind: frame.kind,
                stepNumber: frame.stepNumber,
                routeStage: frame.routeStage,
                pdfRefCount: frame.pdfRefs.length,
                firstPdfRef: frame.pdfRefs[0],
                lastPdfRef: frame.pdfRefs[frame.pdfRefs.length - 1],
                subsectionCount: inventory.length,
                subsectionRefs: inventory.map((entry) => entry.andrewsSection),
                plannedArrowIds: frame.plannedArrows.map((arrow) => arrow.id),
                firedArrowIds: frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
                hitCount: frame.hitCount,
                missCount: frame.missCount,
                generationAllowed: frame.generationAllowed,
                closestPass: frame.closestPass,
                remainingGapsMentionEvidence: frame.remainingGaps.some((gap) => /Confirmed Nawat\/Pipil/.test(gap)),
            };
        })(),
        {
            kind: "lesson-42-adjectival-modification-pursuit-frame",
            stepNumber: 42,
            routeStage: "audit-lesson-42",
            pdfRefCount: 19,
            firstPdfRef: "Andrews Lesson 42.1",
            lastPdfRef: "Andrews Lesson 42.10",
            subsectionCount: 19,
            subsectionRefs: [
                "42.1",
                "42.2",
                "42.3",
                "42.4",
                "42.5",
                "42.6",
                "42.7",
                "42.8",
                "42.8.1",
                "42.8.2",
                "42.8.3",
                "42.8.4",
                "42.8.5",
                "42.8.6",
                "42.8.7",
                "42.8.8",
                "42.8.9",
                "42.9",
                "42.10",
            ],
            plannedArrowIds: ["lesson-42-adjectival-modification-audit"],
            firedArrowIds: [["lesson-42-adjectival-modification-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionEvidence: true,
        }
    );
    s.eq(
        "Lesson 42 frame records modifier/head syntax and current AST boundaries",
        (() => {
            const frame = ctx.buildLesson42AdjectivalModificationPursuitFrame();
            return {
                noRelativePronounLink: frame.multipleNucleusFrame.noRelativePronounLink,
                headDefinition: frame.multipleNucleusFrame.modificationStructure.head,
                preposedNotTopic: frame.preposedModifierFrame.preposingDoesNotCreateTopic,
                adjoinedWholeStructure: frame.adjoinedUnitFrame.adjunctorBeforePreposedModifierSubordinatesWholeStructure,
                principalUnit: frame.principalUnitFrame.modificationStructureCanServeAsPrincipalUnit,
                ambiguityNoSpecialAdjunctor: frame.supplementationAmbiguityFrame.noSpecialAdjunctorDistinguishesModification,
                compoundHeadMatrix: frame.compoundHeadModifierFrame.modifierOfCompoundHeadTendsToRelateToMatrix,
                transitiveVncSubjectOrObject: frame.modifierFunctionTypesFrame.transitiveVncFrame.specificProjectiveObjectCanLinkThroughSubjectOrObjectPronoun,
                measureHead: frame.modifierFunctionTypesFrame.measureNncFrame.measureNncServesAsHead,
                recursive: frame.recursionFrame.modificationTransformationIsRecursive,
                incorporatedKeepsPronouns: frame.incorporatedModificationFrame.constituentNncsKeepSubjectPronounsInsideCompoundStem,
                incorporatedDeletesHeadNumberDyad: frame.incorporatedModificationFrame.headNncNumberDyadOfIncorporatedStructureDeleted,
                generationBoundary: frame.currentEngineBoundary,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            noRelativePronounLink: true,
            headDefinition: "core in an NNC functioning as principal clause",
            preposedNotTopic: true,
            adjoinedWholeStructure: true,
            principalUnit: true,
            ambiguityNoSpecialAdjunctor: true,
            compoundHeadMatrix: true,
            transitiveVncSubjectOrObject: true,
            measureHead: true,
            recursive: true,
            incorporatedKeepsPronouns: true,
            incorporatedDeletesHeadNumberDyad: true,
            generationBoundary: {
                adjectivalModificationBoundaryMetadataImplemented: true,
                modificationAstCompositionImplemented: true,
                preposedModifierDiagnosticImplemented: true,
                markedAdjoinedUnitDiagnosticImplemented: true,
                supplementationAmbiguityDiagnosticPartial: true,
                modifierClauseTypeInventoryDiagnosticOnly: true,
                recursionDiagnosticOnly: true,
                incorporatedModificationDiagnosticOnly: true,
                parserDetectionImplemented: false,
                fixtureBackedClauseExamplesImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson42GenerationImplemented: false,
            },
            grammarRouteStage: "audit-lesson-42",
            diagnosticIds: ["adjectival-modification-lesson-42-diagnostic-partial", "adjectival-modification-needs-nawat-clause-evidence"],
        }
    );
    s.eq(
        "Lesson 43 pursuit frame covers every Andrews part-two adjectival-modification subsection",
        (() => {
            const inventory = ctx.getLesson43AdjectivalModificationSubsectionInventory();
            const frame = ctx.buildLesson43AdjectivalModificationPursuitFrame();
            return {
                kind: frame.kind,
                stepNumber: frame.stepNumber,
                routeStage: frame.routeStage,
                pdfRefCount: frame.pdfRefs.length,
                firstPdfRef: frame.pdfRefs[0],
                lastPdfRef: frame.pdfRefs[frame.pdfRefs.length - 1],
                subsectionCount: inventory.length,
                subsectionRefs: inventory.map((entry) => entry.andrewsSection),
                plannedArrowIds: frame.plannedArrows.map((arrow) => arrow.id),
                firedArrowIds: frame.firedArrows.map((arrow) => [arrow.id, arrow.result]),
                hitCount: frame.hitCount,
                missCount: frame.missCount,
                generationAllowed: frame.generationAllowed,
                closestPass: frame.closestPass,
                remainingGapsMentionEvidence: frame.remainingGaps.some((gap) => /Confirmed Nawat\/Pipil/.test(gap)),
            };
        })(),
        {
            kind: "lesson-43-adjectival-modification-pursuit-frame",
            stepNumber: 43,
            routeStage: "audit-lesson-43",
            pdfRefCount: 15,
            firstPdfRef: "Andrews Lesson 43.1",
            lastPdfRef: "Andrews Lesson 43.9",
            subsectionCount: 21,
            subsectionRefs: [
                "43.1 item 1",
                "43.1 item 2",
                "43.1 item 3",
                "43.1 item 4",
                "43.2",
                "43.3 source transform",
                "43.3 no adjunctor",
                "43.3 shifted modifier",
                "43.4",
                "43.4 in warning",
                "43.4.1",
                "43.4.2",
                "43.4 remark",
                "43.5",
                "43.6",
                "43.6.1",
                "43.6.2",
                "43.7.1",
                "43.7.2",
                "43.8",
                "43.9",
            ],
            plannedArrowIds: ["lesson-43-adjectival-modification-audit"],
            firedArrowIds: [["lesson-43-adjectival-modification-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionEvidence: true,
        }
    );
    s.eq(
        "Lesson 43 frame records discontinuity, interrogative-head ambiguity, and idiomatic modifier boundaries",
        (() => {
            const frame = ctx.buildLesson43AdjectivalModificationPursuitFrame();
            return {
                nonpreposedSupplements: frame.nonpreposedModifierFrame.supplementaryElementsAllowedBeyondPreposedModifier,
                distantSupplement: frame.nonpreposedModifierFrame.supplementaryElementMayStandAtDistance,
                pronominalHeadTranslationWarning: frame.nonpreposedModifierFrame.englishTranslationOftenFalsifiesNahuatlStructure,
                sameHeadCooperation: frame.preposedNonpreposedCooperationFrame.preposedAndNonpreposedModifiersMayAdjoinToSameHead,
                topicalizedHeadDiscontinuity: frame.discontinuousModifierFrame.frequentSourceTopicalizesHeadAndLeavesModifierInPlace,
                modifierMayLackAdjunctor: frame.discontinuousModifierFrame.modifierMayLackAdjunctor,
                acTlehNotRelativePronouns: frame.interrogativeHeadFrame.acAndTlehAreNotRelativePronouns,
                solidWritingWarning: frame.interrogativeHeadFrame.solidTraditionalWritingDisguisesInAsUnitWithFollowingClause,
                ocCeHead: frame.ocCeCollocationFrame.ocCeMayServeAsHeadInModification,
                sharedReferentViolation: frame.sharedReferentViolationFrame.idiomaticModificationMayViolateSharedReferentRestriction,
                cemPluralPreferred: frame.sharedReferentViolationFrame.pronominalGroupFrame.pluralSubjectPronounOnCemNncPreferred,
                acahOneOf: frame.oneOfNoneOfFrame.acahFrame.acahMayReplaceCemeh,
                ayacNoneOf: frame.oneOfNoneOfFrame.ayacFrame.ayacMayExpressNoneOfGroup,
                maleBondingFirstPlural: frame.maleBondingModifierFrame.maleSpeakerWithSocialOrFamilialTieUsesFirstPersonPluralSubjectPronoun,
                namedPartnerOnlyThirdEntity: frame.namedPartnerModifierFrame.modifierNormallyMentionsOnlyNamedThirdPersonEntity,
                generationBoundary: frame.currentEngineBoundary,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            nonpreposedSupplements: true,
            distantSupplement: true,
            pronominalHeadTranslationWarning: true,
            sameHeadCooperation: true,
            topicalizedHeadDiscontinuity: true,
            modifierMayLackAdjunctor: true,
            acTlehNotRelativePronouns: true,
            solidWritingWarning: true,
            ocCeHead: true,
            sharedReferentViolation: true,
            cemPluralPreferred: true,
            acahOneOf: true,
            ayacNoneOf: true,
            maleBondingFirstPlural: true,
            namedPartnerOnlyThirdEntity: true,
            generationBoundary: {
                adjectivalModificationBoundaryMetadataImplemented: true,
                modificationAstCompositionImplemented: true,
                nonpreposedModifierDiagnosticsPartial: true,
                preposedNonpreposedCooperationDiagnosticOnly: true,
                discontinuousModifierDiagnosticPartial: true,
                interrogativeHeadAmbiguityDiagnosticOnly: true,
                ocCeCollocationDiagnosticOnly: true,
                sharedReferentViolationDiagnosticOnly: true,
                oneOfNoneOfDiagnosticOnly: true,
                maleBondingModifierDiagnosticOnly: true,
                namedPartnerModifierDiagnosticOnly: true,
                parserDetectionImplemented: false,
                fixtureBackedClauseExamplesImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson43GenerationImplemented: false,
            },
            grammarRouteStage: "audit-lesson-43",
            diagnosticIds: ["adjectival-modification-lesson-43-diagnostic-partial", "adjectival-modification-needs-nawat-clause-evidence"],
        }
    );

    s.eq(
        "Andrews 42.2 modification AST composes generated head and modifier outputs without changing forms",
        (() => {
            const head = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "absolutive",
                number: "singular",
            });
            const modifier = ctx.generateRootPlusYaAdjectivalNncOutput({ stem: "yektiya" });
            const ast = ctx.buildAdjectivalModificationAst({
                head,
                modifier,
                order: "head-modifier",
                linkRole: "shared-subject",
                evidenceSource: "test-generated-output-contract",
            });
            return {
                supported: ast.supported,
                confirmed: ast.confirmed,
                relation: ast.relation,
                order: ast.order,
                scope: ast.scope,
                surface: ast.surface,
                headSurface: ast.head.surface,
                modifierSurface: ast.modifier.surface,
                headFormula: ast.head.formulaEcho,
                modifierFormula: ast.modifier.formulaEcho,
                linkRole: ast.link.role,
                changesNawatSurfaceForms: ast.changesNawatSurfaceForms,
                newWordGenerationAllowed: ast.newWordGenerationAllowed,
                generationAllowed: ast.generationAllowed,
                ok: ast.ok,
                frameAstKind: ast.frames?.astFrame?.kind || "",
                frameRouteStage: ast.frames?.routeContract?.routeStage || "",
                frameGenerationAllowed: ast.frames?.routeContract?.generationAllowed,
                frameStatus: ast.frames?.diagnosticFrame?.status || "",
                hasTopLevelFormulaSlots: Object.prototype.hasOwnProperty.call(ast, "formulaSlots"),
                diagnostics: ast.diagnostics,
            };
        })(),
        {
            supported: true,
            confirmed: false,
            relation: "attributive-modifier",
            order: "head-modifier",
            scope: "standalone",
            surface: "kal yektik",
            headSurface: "kal",
            modifierSurface: "yektik",
            headFormula: "#Ø...Ø(kal)Ø#",
            modifierFormula: "#Ø...Ø(yekti)k#",
            linkRole: "shared-subject",
            changesNawatSurfaceForms: false,
            newWordGenerationAllowed: false,
            generationAllowed: false,
            ok: true,
            frameAstKind: "adjectival-modification-ast",
            frameRouteStage: "compose-ast",
            frameGenerationAllowed: false,
            frameStatus: "composed",
            hasTopLevelFormulaSlots: false,
            diagnostics: [],
        }
    );
    s.eq(
        "modification AST reads LCM result-frame surface forms from input nodes",
        (() => {
            const headFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-head / frame-head-alt"],
                    outputKind: "nnc",
                }),
            });
            const modifierFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-modifier / frame-modifier-alt"],
                    outputKind: "adjectival-nnc",
                }),
            });
            const headInput = {
                result: "stale-head-result",
                surface: "top-head-surface",
                surfaceForms: ["stale-head-a / stale-head-b"],
                surfaceDisplay: "stale-head-display",
                word: "stale-head-word",
                frames: headFrame,
            };
            const modifierInput = {
                result: "stale-modifier-result",
                surface: "top-modifier-surface",
                surfaceForms: ["stale-modifier-a / stale-modifier-b"],
                surfaceDisplay: "stale-modifier-display",
                word: "stale-modifier-word",
                frames: modifierFrame,
            };
            const ast = ctx.buildAdjectivalModificationAst({
                head: headInput,
                modifier: modifierInput,
                order: "head-modifier",
                evidenceSource: "test-framed-generated-output-contract",
            });
            return {
                surface: ast.surface,
                headSurface: ast.head.surface,
                modifierSurface: ast.modifier.surface,
                headForms: ctx.getAdjectivalModificationSurfaceForms(headInput),
                modifierForms: ctx.getAdjectivalModificationSurfaceForms(modifierInput),
                ok: ast.ok,
                routeStage: ast.frames?.routeContract?.routeStage || "",
            };
        })(),
        {
            surface: "frame-head frame-modifier",
            headSurface: "frame-head",
            modifierSurface: "frame-modifier",
            headForms: ["frame-head", "frame-head-alt"],
            modifierForms: ["frame-modifier", "frame-modifier-alt"],
            ok: true,
            routeStage: "compose-ast",
        }
    );
    s.eq(
        "modification surface helper suppresses fallback for an empty LCM result frame",
        (() => {
            const emptyFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "blocked-modification-source",
                }),
            });
            const input = {
                surface: "stale-surface",
                surfaceForms: ["stale-a / stale-b"],
                surfaceDisplay: "stale-display",
                result: "stale-result",
                word: "stale-word",
                frames: emptyFrame,
            };
            return {
                surface: ctx.getAdjectivalModificationSurface(input, "fallback-head"),
                forms: ctx.getAdjectivalModificationSurfaceForms(input),
            };
        })(),
        {
            surface: "",
            forms: [],
        }
    );
    s.eq(
        "modification AST reads surfaceForms before stale result",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                head: {
                    result: "stale-head",
                    surface: "top-head-surface",
                    surfaceForms: ["top-head-a / top-head-b"],
                },
                modifier: {
                    result: "stale-modifier",
                    surface: "top-modifier-surface",
                    surfaceForms: ["top-modifier-a / top-modifier-b"],
                },
                order: "head-modifier",
                evidenceSource: "test-surface-forms-contract",
            });
            return {
                surface: ast.surface,
                headSurface: ast.head.surface,
                modifierSurface: ast.modifier.surface,
                ok: ast.ok,
            };
        })(),
        {
            surface: "top-head-a top-modifier-a",
            headSurface: "top-head-a",
            modifierSurface: "top-modifier-a",
            ok: true,
        }
    );

    s.eq(
        "Andrews 42.3 preposed modifier AST is not a topic transform",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                headSurface: "kal",
                modifierSurface: "yektik",
                order: "modifier-head-preposed",
                evidenceSource: "test-generated-output-contract",
            });
            return {
                surface: ast.surface,
                order: ast.order,
                isPreposed: ast.transformations.isPreposed,
                isTopic: ast.transformations.isTopic,
                diagnostics: ast.diagnostics,
            };
        })(),
        {
            surface: "yektik kal",
            order: "modifier-head-preposed",
            isPreposed: true,
            isTopic: false,
            diagnostics: ["adjectival-modification-preposed-modifier-is-not-topic"],
        }
    );

    s.eq(
        "Andrews 42.4 marked preposed modifier is an adjoined-unit structure",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                headSurface: "kal",
                modifierSurface: "yektik",
                marker: "ne",
                order: "marked-modifier-head-adjoined",
                scope: "adjoined-unit",
                evidenceSource: "test-generated-output-contract",
            });
            const standalone = ctx.buildAdjectivalModificationAst({
                headSurface: "kal",
                modifierSurface: "yektik",
                marker: "ne",
                order: "marked-modifier-head-adjoined",
                scope: "standalone",
                evidenceSource: "test-generated-output-contract",
            });
            return {
                supported: ast.supported,
                surface: ast.surface,
                scope: ast.scope,
                isMarked: ast.transformations.isMarked,
                standaloneDiagnostics: standalone.diagnostics,
            };
        })(),
        {
            supported: true,
            surface: "ne yektik kal",
            scope: "adjoined-unit",
            isMarked: true,
            standaloneDiagnostics: ["adjectival-modification-marked-preposed-unit-requires-adjoined-scope"],
        }
    );

    s.eq(
        "adjectival modification AST rejects single generated words as complete structure",
        (() => {
            const ast = ctx.buildAdjectivalModificationAst({
                modifierSurface: "yektik",
                order: "head-modifier",
            });
            return {
                supported: ast.supported,
                surface: ast.surface,
                diagnostics: ast.diagnostics,
            };
        })(),
        {
            supported: false,
            surface: "",
            diagnostics: [
                "adjectival-modification-requires-head-surface",
                "adjectival-modification-needs-nawat-clause-evidence",
            ],
        }
    );

    s.eq(
        "adjetivo route output remains unconfirmed modification evidence",
        ctx.classifyAdjectivalModificationCandidate({
            head: "unknown",
            modifier: "chipaktik",
            candidate: "chipaktik",
            relation: "predicate-function",
            falsePositiveSource: "adjective-mode-output",
        }),
        {
            kind: "adjectival-modification-candidate-classification",
            version: 1,
            head: "unknown",
            modifier: "chipaktik",
            candidate: "chipaktik",
            relation: "predicate-function",
            order: "",
            evidenceSource: "",
            falsePositiveSource: "adjective-mode-output",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "adjectival-modification-needs-nawat-clause-evidence",
                "adjectival-modification-relation-recognized",
                "adjectival-modification-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "nominalization profile is classified as false positive AST evidence",
        ctx.classifyAdjectivalModificationFalsePositive("nominalization-profile"),
        {
            kind: "adjectival-modification-false-positive",
            version: 1,
            source: "nominalization-profile",
            isModificationEvidence: false,
            isSupplementationEvidence: false,
            isTopicEvidence: false,
            generationAllowed: false,
            diagnostics: ["adjectival-modification-false-positive-source"],
            antiConflationRules: ctx.getAdjectivalModificationAntiConflationRules(),
        }
    );

    s.eq(
        "adjectival modification metadata carries anti-conflation rules",
        ctx.getAdjectivalModificationAntiConflationRules(),
        [
            "adjectival modification boundary metadata is not generation",
            "modificationAst composes existing clause outputs; it does not create new Nawat word forms",
            "adjetivo route output is not a clause-level modification AST",
            "nominalizationProfile is not adjectival modification syntax",
            "ordinary NNC formulaSlots are not modifier/head relation metadata",
            "single generated words do not prove modification, supplementation, or topic relations",
            "Andrews modification categories are architecture, not Nawat/Pipil form authority",
        ]
    );
    s.no("adjectival modification boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("adjectival modification boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    return s;
}

module.exports = { run };
