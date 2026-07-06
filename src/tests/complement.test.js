"use strict";

/**
 * Tests for src/core/clause/complement/complement.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("complement");

    s.eq(
        "Lesson 51 complement API is exported",
        [
            typeof ctx.buildComplementClauseBoundaryMetadata,
            typeof ctx.classifyComplementClauseCandidate,
            typeof ctx.classifyComplementClauseFalsePositive,
            typeof ctx.buildComplementClauseAst,
            typeof ctx.getComplementClauseAntiConflationRules,
            typeof ctx.getLesson51ComplementClauseSubsectionInventory,
            typeof ctx.buildLesson51ComplementClausePursuitFrame,
        ],
        ["function", "function", "function", "function", "function", "function", "function"]
    );

    const boundary = ctx.buildComplementClauseBoundaryMetadata();
    s.eq(
        "complement boundary is explicit and non-generative",
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
            kind: "complement-clause-boundary",
            lesson: 51,
            status: "partial",
            generationAllowed: false,
            confirmedExamples: [],
            boundaries: {
                hasVncGeneration: true,
                hasNncGeneration: true,
                hasNominalizationProfileMetadata: true,
                hasComplementAst: true,
                hasConfirmedClauseExamples: false,
                hasStaticComplementData: false,
                changesVncGeneration: false,
                changesNncGeneration: false,
                changesNominalizationGeneration: false,
                changesValencyBehavior: false,
                treatsGeneratedWordAsComplementEvidence: false,
                treatsObjectControlAsComplementEvidence: false,
            },
            questionFields: [
                "principalClause",
                "complement",
                "complementRole",
                "complementUnitType",
                "linkingEvidence",
                "evidenceSource",
            ],
        }
    );

    s.eq(
        "recognized complement role remains unconfirmed without Andrews clause-source context",
        ctx.classifyComplementClauseCandidate({
            principalClause: "unknown",
            complement: "single generated word",
            complementRole: "object-complement",
            complementUnitType: "vnc",
            falsePositiveSource: "single-generated-word",
        }),
        {
            kind: "complement-clause-candidate-classification",
            version: 1,
            principalClause: "unknown",
            complement: "single generated word",
            candidate: "",
            complementRole: "object-complement",
            complementUnitType: "vnc",
            linkingEvidence: "",
            evidenceSource: "",
            falsePositiveSource: "single-generated-word",
            confirmed: false,
            generationAllowed: false,
            diagnostics: [
                "complement-clause-source-gated",
                "complement-clause-role-recognized",
                "complement-clause-unit-recognized",
                "complement-clause-false-positive-source",
            ],
            boundary,
        }
    );

    s.eq(
        "object controls are not complement evidence",
        ctx.classifyComplementClauseFalsePositive("object-control-label"),
        {
            kind: "complement-clause-false-positive",
            version: 1,
            source: "object-control-label",
            isComplementClauseEvidence: false,
            isComplementAstEvidence: false,
            generationAllowed: false,
            diagnostics: ["complement-clause-false-positive-source"],
            antiConflationRules: ctx.getComplementClauseAntiConflationRules(),
        }
    );

    s.eq(
        "complement metadata carries anti-conflation rules",
        ctx.getComplementClauseAntiConflationRules(),
        [
            "complement-clause boundary metadata is not generation",
            "object controls and subject labels are not complement-clause evidence",
            "ordinary VNC or NNC output is not a complement AST",
            "nominalizationProfile is not a clause-level complement relation",
            "single generated words do not prove object, subject, or adverbial complements",
            "Andrews complementation categories are architecture, not Nawat/Pipil orthography authority",
        ]
    );
    s.no("complement boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("complement boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));

    s.eq(
        "Lesson 51 pursuit frame covers every Andrews complementation subsection",
        (() => {
            const inventory = ctx.getLesson51ComplementClauseSubsectionInventory();
            const frame = ctx.buildLesson51ComplementClausePursuitFrame();
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
                remainingGapsMentionRelational: frame.remainingGaps.some((gap) => /relational lexicalized/.test(gap)),
            };
        })(),
        {
            kind: "lesson-51-complement-clause-pursuit-frame",
            stepNumber: 51,
            routeStage: "audit-lesson-51",
            pdfRefCount: 4,
            firstPdfRef: "Andrews Lesson 51.1",
            lastPdfRef: "Andrews Lesson 51.4",
            subsectionCount: 19,
            subsectionRefs: [
                "51.1",
                "51.2",
                "51.2.1",
                "51.2.2",
                "51.2.3",
                "51.2.4",
                "51.3",
                "51.3.1",
                "51.3.2",
                "51.3.3",
                "51.3.4",
                "51.4",
                "51.4.1",
                "51.4.2",
                "51.4.3",
                "51.4.4",
                "51.4.5",
                "51.4.6",
                "51.4.7",
            ],
            plannedArrowIds: ["lesson-51-complement-clause-audit"],
            firedArrowIds: [["lesson-51-complement-clause-audit", "hit"]],
            hitCount: 1,
            missCount: 0,
            generationAllowed: false,
            closestPass: false,
            remainingGapsMentionRelational: true,
        }
    );

    s.eq(
        "Lesson 51 frame records object, subject, adverbial, passive, and relational complement boundaries",
        (() => {
            const frame = ctx.buildLesson51ComplementClausePursuitFrame();
            return {
                doubleNucleusRoles: frame.doubleNucleusFrame.complementKinds,
                objectLink: frame.objectComplementFrame.link,
                objectCategories: Object.keys(frame.objectComplementFrame.semanticCategories),
                designationPossessor: frame.objectComplementFrame.semanticCategories.designation.possessiveNameConstructionChangesObjectComplementToPossessorComplement,
                subjectLink: frame.subjectComplementFrame.link,
                subjectStateCentersOnSubject: frame.subjectComplementFrame.semanticCategories.state.resemblesAdverbialMannerButCentersOnSubjectPronoun,
                subjectFrequentStems: frame.subjectComplementFrame.semanticCategories.state.frequentNounstems,
                passiveTransform: frame.subjectComplementFrame.semanticCategories.passiveObjectComplementTransform.passiveTransformOfObjectComplementPossible,
                adverbialCategories: Object.keys(frame.adverbialComplementFrame.semanticCategories),
                pehuaContrast: frame.adverbialComplementFrame.semanticCategories.beginning.resemblesPurposeOrConjunctionButBelongsFullyToNeither,
                relationalVocabulary: frame.adverbialComplementFrame.semanticCategories.relationalLexicalized.combinationMustBeLearnedAsVocabulary,
                activeActionIncorporation: frame.adverbialComplementFrame.semanticCategories.relationalLexicalized.activeActionDerivationCanIncorporateAdverbializedNnc,
                generationBoundary: frame.currentEngineBoundary,
                orthographySlotScoped: frame.frames?.orthographyFrame?.slotScopedOrthographyRequiredBeforeVisibleNawatSurface,
                grammarRouteStage: frame.frames?.routeContract?.routeStage || frame.routeStage,
                diagnosticIds: (frame.frames?.diagnosticFrame?.diagnostics || []).map((entry) => entry.id),
            };
        })(),
        {
            doubleNucleusRoles: ["object-complement", "subject-complement", "adverbial-complement"],
            objectLink: "object-pronoun-to-complement-subject",
            objectCategories: ["change", "materialComposition", "designation", "state"],
            designationPossessor: true,
            subjectLink: "subject-pronoun-to-complement-subject",
            subjectStateCentersOnSubject: true,
            subjectFrequentStems: ["ce-l", "el", "iyo-h-0"],
            passiveTransform: true,
            adverbialCategories: ["coverage", "beginning", "satisfaction", "daring", "cessation", "tarrying", "relationalLexicalized"],
            pehuaContrast: true,
            relationalVocabulary: true,
            activeActionIncorporation: true,
            generationBoundary: {
                complementBoundaryMetadataImplemented: true,
                complementAstImplemented: true,
                relationContractImplemented: true,
                objectComplementFrameDiagnosticOnly: true,
                subjectComplementFrameDiagnosticOnly: true,
                adverbialComplementFrameDiagnosticOnly: true,
                passiveTransformDiagnosticOnly: true,
                relationalLexicalizedFrameDiagnosticOnly: true,
                parserDetectionImplemented: false,
                staticComplementDataImplemented: false,
                newWordGenerationAllowed: false,
                fullLesson51GenerationImplemented: false,
            },
            orthographySlotScoped: true,
            grammarRouteStage: "audit-lesson-51",
            diagnosticIds: ["complement-clause-lesson-51-diagnostic-partial", "complement-clause-source-gated"],
        }
    );

    const objectComplementAst = ctx.buildComplementClauseAst({
        principalSurface: "kichiwa",
        complementSurface: "tayekanki",
        complementRole: "object-complement",
        complementUnitType: "nnc",
        semanticCategory: "change",
        principalVerbStem: "chiwa",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 object complement AST links principal object pronoun to complement subject",
        {
            kind: objectComplementAst.kind,
            supported: objectComplementAst.supported,
            confirmed: objectComplementAst.confirmed,
            complementRole: objectComplementAst.complementRole,
            complementUnitType: objectComplementAst.complementUnitType,
            semanticCategory: objectComplementAst.semanticCategory,
            order: objectComplementAst.order,
            surface: objectComplementAst.surface,
            link: objectComplementAst.link,
            relationContract: objectComplementAst.relationContract,
            changesNawatSurfaceForms: objectComplementAst.changesNawatSurfaceForms,
            changesValencyBehavior: objectComplementAst.changesValencyBehavior,
            generationAllowed: objectComplementAst.generationAllowed,
            ok: objectComplementAst.ok,
            frameAstKind: objectComplementAst.frames?.astFrame?.kind || "",
            frameRouteStage: objectComplementAst.frames?.routeContract?.routeStage || "",
            frameGenerationAllowed: objectComplementAst.frames?.routeContract?.generationAllowed,
            frameStatus: objectComplementAst.frames?.diagnosticFrame?.status || "",
            diagnostics: objectComplementAst.diagnostics,
        },
        {
            kind: "complement-clause-ast",
            supported: true,
            confirmed: false,
            complementRole: "object-complement",
            complementUnitType: "nnc",
            semanticCategory: "change",
            order: "complement-principal",
            surface: "tayekanki kichiwa",
            link: {
                type: "object-pronoun-to-complement-subject",
                sharedReferenceRequired: true,
                distinguishesFromSupplementation: true,
            },
            relationContract: {
                role: "object-complement",
                semanticCategory: "change",
                link: "object-pronoun-to-complement-subject",
                principalVerbStem: "chiwa",
                complementState: "",
                complementTense: "",
                distinctFromSupplementation: true,
                incorporatedComplementAlternative: true,
                headPronounSlot: "object",
                complementSubjectSharesWith: "principal-object-pronoun",
                objectComplementTypes: ["change", "material-composition", "designation", "state"],
                possessiveNameComplementPossible: false,
            },
            changesNawatSurfaceForms: false,
            changesValencyBehavior: false,
            generationAllowed: false,
            ok: true,
            frameAstKind: "complement-clause-ast",
            frameRouteStage: "compose-ast",
            frameGenerationAllowed: false,
            frameStatus: "composed",
            diagnostics: [],
        }
    );
    s.eq(
        "complement AST reads LCM result-frame surface forms from input nodes",
        (() => {
            const principalFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-principal", "frame-principal-alt"],
                    outputKind: "vnc",
                }),
            });
            const complementFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-complement", "frame-complement-alt"],
                    outputKind: "nnc",
                }),
            });
            const principalInput = {
                result: "stale-principal-result",
                surface: "top-principal-surface",
                surfaceForms: ["stale-principal-a / stale-principal-b"],
                surfaceDisplay: "stale-principal-display",
                word: "stale-principal-word",
                frames: principalFrame,
            };
            const complementInput = {
                result: "stale-complement-result",
                surface: "top-complement-surface",
                surfaceForms: ["stale-complement-a / stale-complement-b"],
                surfaceDisplay: "stale-complement-display",
                word: "stale-complement-word",
                frames: complementFrame,
            };
            const ast = ctx.buildComplementClauseAst({
                principalClause: principalInput,
                complement: complementInput,
                complementRole: "object-complement",
                complementUnitType: "nnc",
                semanticCategory: "change",
                principalVerbStem: "frame",
                evidenceSource: "test-framed-generated-output-contract",
            });
            return {
                surface: ast.surface,
                principalSurface: ast.principalClause.surface,
                complementSurface: ast.complement.surface,
                principalForms: ctx.getComplementClauseSurfaceForms(principalInput),
                complementForms: ctx.getComplementClauseSurfaceForms(complementInput),
                ok: ast.ok,
                routeStage: ast.frames?.routeContract?.routeStage || "",
            };
        })(),
        {
            surface: "frame-complement frame-principal",
            principalSurface: "frame-principal",
            complementSurface: "frame-complement",
            principalForms: ["frame-principal", "frame-principal-alt"],
            complementForms: ["frame-complement", "frame-complement-alt"],
            ok: true,
            routeStage: "compose-ast",
        }
    );
    s.eq(
        "complement surface helper suppresses fallback for an empty LCM result frame",
        (() => {
            const emptyFrame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "blocked-complement-source",
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
                surface: ctx.getComplementClauseSurface(input, "fallback-complement"),
                forms: ctx.getComplementClauseSurfaceForms(input),
            };
        })(),
        {
            surface: "",
            forms: [],
        }
    );
    s.eq(
        "complement AST reads surfaceForms before stale result",
        (() => {
            const ast = ctx.buildComplementClauseAst({
                principalClause: {
                    result: "stale-principal",
                    surface: "top-principal-surface",
                    surfaceForms: ["top-principal-a / top-principal-b"],
                },
                complement: {
                    result: "stale-complement",
                    surface: "top-complement-surface",
                    surfaceForms: ["top-complement-a / top-complement-b"],
                },
                complementRole: "object-complement",
                complementUnitType: "nnc",
                semanticCategory: "change",
                principalVerbStem: "test",
                evidenceSource: "test-surface-forms-contract",
            });
            return {
                surface: ast.surface,
                principalSurface: ast.principalClause.surface,
                complementSurface: ast.complement.surface,
                ok: ast.ok,
            };
        })(),
        {
            surface: "top-complement-a top-principal-a",
            principalSurface: "top-principal-a",
            complementSurface: "top-complement-a",
            ok: true,
        }
    );

    const subjectComplementAst = ctx.buildComplementClauseAst({
        principalSurface: "yes",
        complementSurface: "nukniw",
        complementRole: "subject-complement",
        complementUnitType: "nnc",
        semanticCategory: "identity",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 subject complement AST links principal subject to complement subject",
        {
            surface: subjectComplementAst.surface,
            linkType: subjectComplementAst.link.type,
            relationContract: subjectComplementAst.relationContract,
            supported: subjectComplementAst.supported,
        },
        {
            surface: "nukniw yes",
            linkType: "subject-pronoun-to-complement-subject",
            relationContract: {
                role: "subject-complement",
                semanticCategory: "identity",
                link: "subject-pronoun-to-complement-subject",
                principalVerbStem: "",
                complementState: "",
                complementTense: "",
                distinctFromSupplementation: true,
                incorporatedComplementAlternative: false,
                headPronounSlot: "subject",
                complementSubjectSharesWith: "principal-subject-pronoun",
                subjectComplementTypes: ["identity", "composition", "state"],
                passiveTransformOfObjectComplement: false,
            },
            supported: true,
        }
    );

    const passiveTransformAst = ctx.buildComplementClauseAst({
        principalSurface: "tokayotilo",
        complementSurface: "Tumi",
        complementRole: "subject-complement",
        complementUnitType: "nnc",
        semanticCategory: "designation",
        passiveTransformOfObjectComplement: true,
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 passive transform of object-complement naming is recorded as subject complement",
        {
            complementRole: passiveTransformAst.complementRole,
            semanticCategory: passiveTransformAst.semanticCategory,
            passiveTransformOfObjectComplement: passiveTransformAst.relationContract.passiveTransformOfObjectComplement,
            supported: passiveTransformAst.supported,
        },
        {
            complementRole: "subject-complement",
            semanticCategory: "designation",
            passiveTransformOfObjectComplement: true,
            supported: true,
        }
    );

    const pehuaAst = ctx.buildComplementClauseAst({
        principalSurface: "pewa",
        complementSurface: "nitaketsa",
        complementRole: "adverbial-complement",
        complementUnitType: "vnc",
        semanticCategory: "beginning",
        principalVerbStem: "pewa",
        complementTense: "present",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 adverbial complement records pehua beginning contract without treating it as purpose",
        {
            surface: pehuaAst.surface,
            relationContract: pehuaAst.relationContract,
            supported: pehuaAst.supported,
            diagnostics: pehuaAst.diagnostics,
        },
        {
            surface: "nitaketsa pewa",
            relationContract: {
                role: "adverbial-complement",
                semanticCategory: "beginning",
                link: "principal-subject-to-adjoined-subject",
                principalVerbStem: "pewa",
                complementState: "",
                complementTense: "present",
                distinctFromSupplementation: true,
                incorporatedComplementAlternative: false,
                headPronounSlot: "principal-subject-or-compatible-relation",
                complementSubjectSharesWith: "principal-subject-pronoun",
                adverbialComplementTypes: [
                    "coverage",
                    "beginning",
                    "satisfaction",
                    "daring",
                    "cessation",
                    "tarrying",
                    "relational-lexicalized",
                ],
                pehuaComplementUsuallyPresentTense: true,
                activeActionCanIncorporateRelationalNnc: false,
            },
            supported: true,
            diagnostics: [],
        }
    );

    const relationalComplementAst = ctx.buildComplementClauseAst({
        principalSurface: "nikpia",
        complementSurface: "itech",
        complementRole: "adverbial-complement",
        complementUnitType: "nnc",
        semanticCategory: "relational-lexicalized",
        link: "relational",
        principalVerbStem: "pia",
        evidenceSource: "test-supplied-nawat-clause-surfaces",
    });
    s.eq(
        "Lesson 51 relational adverbial complement records lexicalized compatibility and later incorporation risk",
        {
            semanticCategory: relationalComplementAst.semanticCategory,
            linkType: relationalComplementAst.link.type,
            complementSubjectSharesWith: relationalComplementAst.relationContract.complementSubjectSharesWith,
            activeActionCanIncorporateRelationalNnc: relationalComplementAst.relationContract.activeActionCanIncorporateRelationalNnc,
            supported: relationalComplementAst.supported,
        },
        {
            semanticCategory: "relational-lexicalized",
            linkType: "relational-nnc-to-compatible-verbstem",
            complementSubjectSharesWith: "relational-nnc-compatible-verbstem",
            activeActionCanIncorporateRelationalNnc: true,
            supported: true,
        }
    );

    s.eq(
        "complement AST rejects single generated word as complete complement structure",
        (() => {
            const ast = ctx.buildComplementClauseAst({
                complementSurface: "tayekanki",
                complementRole: "object-complement",
                complementUnitType: "nnc",
                semanticCategory: "change",
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
                "complement-clause-requires-principal-surface",
                "complement-clause-source-gated",
            ],
        }
    );
    s.eq(
        "complement clause handoff reads canonical realization before split display surfaces",
        (() => {
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "complement-handoff-formula",
                unit: "NNC",
                formula: "#0-0(canonical-complement)0-0#",
                formulaSlots: {
                    predicateStem: { stem: "canonical-complement", slot: "STEM" },
                },
            });
            const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                id: "complement-handoff-realization",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", formulaValue: "canonical-complement", surface: "canonical-complement" },
                ],
                surfaceForms: ["canonical-complement"],
            });
            const input = {
                surface: "top-lie / top-alt-lie",
                result: "result-lie / result-alt-lie",
                grammarFrame: ctx.buildGrammarFrame({
                    resultFrame: {
                        ...ctx.buildGrammarResultFrame({
                            ok: true,
                            formulaRecord,
                            formulaRealizationRecord,
                        }),
                        surface: "frame-lie",
                        surfaceForms: ["frame-lie / frame-alt-lie"],
                        formulaRecord,
                        formulaRecords: [formulaRecord],
                        formulaRealizationRecord,
                        formulaRealizationRecords: [formulaRealizationRecord],
                    },
                }),
            };
            return {
                surface: ctx.getComplementClauseSurface(input, "fallback-lie"),
                forms: ctx.getComplementClauseSurfaceForms(input),
            };
        })(),
        {
            surface: "canonical-complement",
            forms: ["canonical-complement"],
        }
    );
    s.eq(
        "complement clause AST carries canonical selected variant ids instead of display surfaces",
        (() => {
            const makeInput = (label) => {
                const formulaRecord = ctx.buildGrammarFormulaRecord({
                    id: `${label}-formula`,
                    unit: "NNC",
                    formula: `#0-0(${label})0-0#`,
                    formulaSlots: {
                        predicateStem: { stem: label, slot: "STEM" },
                    },
                });
                const formulaRealizationRecord = ctx.buildGrammarFormulaRealizationRecord({
                    id: `${label}-realization`,
                    formulaRecord,
                    segmentFrames: [
                        { slot: "predicateStem", formulaValue: label, surface: `${label}-canonical` },
                    ],
                    surfaceForms: [`${label}-canonical`],
                });
                return {
                    surface: `${label}-surface-lie`,
                    result: `${label}-result-lie / ${label}-result-alt-lie`,
                    grammarFrame: ctx.buildGrammarFrame({
                        resultFrame: {
                            ...ctx.buildGrammarResultFrame({
                                ok: true,
                                formulaRecord,
                                formulaRealizationRecord,
                            }),
                            surface: `${label}-frame-lie`,
                            surfaceForms: [`${label}-frame-lie / ${label}-frame-alt-lie`],
                            formulaRecord,
                            formulaRealizationRecord,
                            formulaRealizationRecords: [formulaRealizationRecord],
                        },
                    }),
                };
            };
            const ast = ctx.buildComplementClauseAst({
                principalClause: makeInput("principal-complement"),
                complement: makeInput("object-complement"),
                complementRole: "object-complement",
                complementUnitType: "nnc",
                semanticCategory: "change",
                order: "complement-principal",
                evidenceSource: "test-selected-variant-contract",
            });
            return {
                surface: ast.surface,
                principalVariantId: ast.principalClause.selectedVariantId,
                complementVariantId: ast.complement.selectedVariantId,
                principalRealizationId: ast.principalClause.formulaRealizationRecordId,
                complementRealizationId: ast.complement.formulaRealizationRecordId,
            };
        })(),
        {
            surface: "object-complement-canonical principal-complement-canonical",
            principalVariantId: "principal-complement-realization::surface-0",
            complementVariantId: "object-complement-realization::surface-0",
            principalRealizationId: "principal-complement-realization",
            complementRealizationId: "object-complement-realization",
        }
    );
    s.eq(
        "complement clause handoff blocks slash-joined result-frame display strings",
        (() => {
            const input = {
                surface: "top-complement-lie",
                result: "result-complement-lie",
                grammarFrame: {
                    resultFrame: {
                        kind: "grammar-result-frame",
                        ok: true,
                        surface: "frame-complement-a / frame-complement-b",
                        surfaceForms: ["frame-complement-a / frame-complement-b"],
                    },
                },
            };
            return {
                surface: ctx.getComplementClauseSurface(input, "fallback-lie"),
                forms: ctx.getComplementClauseSurfaceForms(input),
            };
        })(),
        {
            surface: "",
            forms: [],
        }
    );

    return s;
}

module.exports = { run };
