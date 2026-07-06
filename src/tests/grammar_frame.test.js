"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("grammar_frame");

    s.eq(
        "LCM grammar frame exposes the canonical layer keys",
        ctx.GRAMMAR_FRAME_KEYS,
        [
            "authorityFrame",
            "orthographyFrame",
            "unitFrame",
            "morphBoundaryFrame",
            "stemFrame",
            "nuclearClauseFrame",
            "participantFrame",
            "inflectionFrame",
            "routeContract",
            "astFrame",
            "resultFrame",
            "diagnosticFrame",
        ]
    );
    s.eq(
        "Andrews formula slot schema renders formulas from structured slots",
        (() => {
            const ordinary = ctx.getAndrewsFormulaSlotSchema("ordinary-nnc-shell");
            const possessive = ctx.getAndrewsFormulaSlotSchema("possessive-state-nnc");
            const vnc = ctx.getAndrewsFormulaSlotSchema("vnc-shell");
            const connector = ctx.getAndrewsFormulaSlotDefinition("ordinary-nnc-shell", "num1-num2");
            const possessiveState = ctx.getAndrewsFormulaSlotDefinition("possessive-state-nnc", "st1-st2");
            const possessiveNumber = ctx.getAndrewsFormulaSlotDefinition("possessive-state-nnc", "num1-num2");
            const vncValence = ctx.getAndrewsFormulaSlotDefinition("vnc-shell", "va1-va2");
            const vncTense = ctx.getAndrewsFormulaSlotDefinition("vnc-shell", "tns");
            const vncNumber = ctx.getAndrewsFormulaSlotDefinition("vnc-shell", "num1-num2");
            const blockedTense = ctx.diagnoseAndrewsFormulaSlotInterpretation("ordinary-nnc-shell", "num1-num2", "tense");
            const blockedStemSuffix = ctx.diagnoseAndrewsFormulaSlotInterpretation("ordinary-nnc-shell", "num1-num2", "stem-suffix");
            const blockedPossessiveStateAsSubject = ctx.diagnoseAndrewsFormulaSlotInterpretation("possessive-state-nnc", "st1-st2", "subject-connector");
            const blockedPossessiveNumberAsState = ctx.diagnoseAndrewsFormulaSlotInterpretation("possessive-state-nnc", "num1-num2", "predicate-state");
            const blockedVncValenceAsStem = ctx.diagnoseAndrewsFormulaSlotInterpretation("vnc-shell", "va1-va2", "stem");
            const blockedVncTenseAsSubjectNumber = ctx.diagnoseAndrewsFormulaSlotInterpretation("vnc-shell", "tns", "subject-number-connector");
            const generationContract = ctx.getAndrewsFormulaGenerationContract("ordinary-nnc-shell");
            const possessiveGenerationContract = ctx.getAndrewsFormulaGenerationContract("possessive-state-nnc");
            const vncGenerationContract = ctx.getAndrewsFormulaGenerationContract("vnc-shell");
            const missingSource = ctx.evaluateAndrewsFormulaSourceRequirements("ordinary-nnc-shell", {
                inputValue: "",
            });
            const missingPossessiveSource = ctx.evaluateAndrewsFormulaSourceRequirements("possessive-state-nnc", {
                inputValue: "",
            });
            const missingVncSource = ctx.evaluateAndrewsFormulaSourceRequirements("vnc-shell", {
                inputValue: "",
            });
            const satisfiedSource = ctx.evaluateAndrewsFormulaSourceRequirements("ordinary-nnc-shell", {
                inputValue: "kal",
            });
            const missingFormulaAuthority = ctx.evaluateAndrewsFormulaGenerationAuthority("ordinary-nnc-shell", {
                inputValue: "",
            });
            const satisfiedFormulaAuthority = ctx.evaluateAndrewsFormulaGenerationAuthority("ordinary-nnc-shell", {
                inputValue: "kal",
            });
            return {
                ordinaryFormula: ctx.renderAndrewsFormulaTemplate("ordinary-nnc-shell"),
                vncFormula: ctx.renderAndrewsFormulaTemplate("vnc-shell"),
                vncIntransitiveFormula: ctx.renderAndrewsFormulaTemplate("vnc-shell", {
                    omitSlots: ["valence", "va1-va2"],
                }),
                vncMonadicFormula: ctx.renderAndrewsFormulaTemplate("vnc-shell", {
                    slotTokens: { valence: "va" },
                }),
                vncDyadicFormula: ctx.renderAndrewsFormulaTemplate("vnc-shell", {
                    slotTokens: { valence: "va1-va2" },
                }),
                possessiveDyadicFormula: ctx.renderAndrewsFormulaTemplate("possessive-state-nnc"),
                possessiveMonadicFormula: ctx.renderAndrewsFormulaTemplate("possessive-state-nnc", {
                    slotTokens: { possessiveState: "st" },
                }),
                echo: ctx.renderAndrewsFormulaEchoFromSchema("ordinary-nnc-shell", {
                    pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                    predicateStem: { stem: "kal" },
                    num1Num2: { displayConnector: "Ø" },
                }),
                fullDyadEcho: ctx.renderAndrewsFormulaEchoFromSchema("ordinary-nnc-shell", {
                    pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                    predicateStem: { stem: "kal" },
                    num1Num2: { displayDyad: "Ø-Ø", displayConnector: "Ø" },
                }),
                vncIntransitiveEcho: ctx.renderAndrewsFormulaEchoFromSchema("vnc-shell", {
                    renderOptions: { omitSlots: ["valence", "va1-va2"] },
                    pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                    predicateStem: { stem: "nemi" },
                    tensePosition: { display: "0" },
                    num1Num2: { displayDyad: "0-0", displayConnector: "Ø" },
                }),
                vncMonadicStructuralEcho: ctx.renderAndrewsFormulaEchoFromSchema("vnc-shell", {
                    pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                    valence: { display: "tla" },
                    predicateStem: { stem: "ijpiya" },
                    tensePosition: { display: "0" },
                    num1Num2: { displayDyad: "qui-0", displayConnector: "ki" },
                }),
                vncMonadicNawatEcho: ctx.renderAndrewsFormulaEchoFromSchema("vnc-shell", {
                    pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                    valence: { display: "ta" },
                    predicateStem: { stem: "ijpiya" },
                    tensePosition: { display: "Ø" },
                    num1Num2: { displayDyad: "ki-0 ~ k-0", displayConnector: "ki/k" },
                }),
                possessiveStructuralEcho: ctx.renderAndrewsFormulaEchoFromSchema("possessive-state-nnc", {
                    pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                    possessiveState: { display: "n-o" },
                    predicateStem: { stem: "kal" },
                    num1Num2: { displayDyad: "Ø-Ø", displayConnector: "Ø" },
                }),
                possessiveNawatEcho: ctx.renderAndrewsFormulaEchoFromSchema("possessive-state-nnc", {
                    pers1Pers2: { displayPrefix: "Ø", displaySuffix: "Ø" },
                    possessiveState: { display: "n-u" },
                    predicateStem: { stem: "kal" },
                    num1Num2: { displayDyad: "Ø-Ø", displayConnector: "Ø" },
                }),
                schemaId: ordinary.id,
                possessiveSchemaId: possessive.id,
                possessiveStateOwner: possessiveState.owner,
                possessiveStatePath: possessiveState.path,
                possessiveStateBlocked: possessiveState.blockedInterpretations,
                possessiveNumberOwner: possessiveNumber.owner,
                connectorOwner: connector.owner,
                connectorPath: connector.path,
                connectorBlockedInterpretations: connector.blockedInterpretations,
                vncValenceOwner: vncValence.owner,
                vncValencePath: vncValence.path,
                vncValenceBlocked: vncValence.blockedInterpretations,
                vncTenseOwner: vncTense.owner,
                vncTensePath: vncTense.path,
                vncTenseBlocked: vncTense.blockedInterpretations,
                vncNumberOwner: vncNumber.owner,
                vncNumberPath: vncNumber.path,
                vncNumberBlocked: vncNumber.blockedInterpretations,
                hasTensePosition: ordinary.hasTensePosition,
                possessiveHasTensePosition: possessive.hasTensePosition,
                vncHasTensePosition: vnc.hasTensePosition,
                generationContract,
                possessiveGenerationContract,
                vncGenerationContract,
                missingSourceOk: missingSource.ok,
                missingSourceDiagnosticId: missingSource.diagnostics[0].id,
                missingPossessiveSourceOk: missingPossessiveSource.ok,
                missingPossessiveSourceDiagnosticId: missingPossessiveSource.diagnostics[0].id,
                missingVncSourceOk: missingVncSource.ok,
                missingVncSourceDiagnosticId: missingVncSource.diagnostics[0].id,
                satisfiedSourceOk: satisfiedSource.ok,
                satisfiedSourceRequirementValue: satisfiedSource.satisfiedRequirements[0].value,
                missingFormulaAuthority: {
                    allowed: missingFormulaAuthority.allowed,
                    gate: missingFormulaAuthority.gate,
                    status: missingFormulaAuthority.status,
                    blockedReasons: missingFormulaAuthority.blockedReasons,
                    diagnosticId: missingFormulaAuthority.diagnostics[0].id,
                },
                satisfiedFormulaAuthority: {
                    allowed: satisfiedFormulaAuthority.allowed,
                    gate: satisfiedFormulaAuthority.gate,
                    status: satisfiedFormulaAuthority.status,
                    logicAuthority: satisfiedFormulaAuthority.logicAuthority,
                    orthographyAuthority: satisfiedFormulaAuthority.orthographyAuthority,
                    spellingEvidenceRole: satisfiedFormulaAuthority.spellingEvidenceRole,
                    classicalSurfaceImport: satisfiedFormulaAuthority.classicalSurfaceImport,
                    routeFamily: satisfiedFormulaAuthority.generationContract.routeFamily,
                },
                blockedTense,
                blockedStemSuffix,
                blockedPossessiveStateAsSubject,
                blockedPossessiveNumberAsState,
                blockedVncValenceAsStem,
                blockedVncTenseAsSubjectNumber,
            };
        })(),
        {
            ordinaryFormula: "#pers1-pers2(STEM)num1-num2#",
            vncFormula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
            vncIntransitiveFormula: "#pers1-pers2(STEM)tns+num1-num2#",
            vncMonadicFormula: "#pers1-pers2+va(STEM)tns+num1-num2#",
            vncDyadicFormula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
            possessiveDyadicFormula: "#pers1-pers2+st1-st2(STEM)num1-num2#",
            possessiveMonadicFormula: "#pers1-pers2+st(STEM)num1-num2#",
            echo: "#Ø-Ø(kal)Ø#",
            fullDyadEcho: "#Ø-Ø(kal)Ø-Ø#",
            vncIntransitiveEcho: "#Ø-Ø(nemi)0+0-0#",
            vncMonadicStructuralEcho: "#Ø-Ø+tla(ijpiya)0+qui-0#",
            vncMonadicNawatEcho: "#Ø-Ø+ta(ijpiya)Ø+ki-0 ~ k-0#",
            possessiveStructuralEcho: "#Ø-Ø+n-o(kal)Ø-Ø#",
            possessiveNawatEcho: "#Ø-Ø+n-u(kal)Ø-Ø#",
            schemaId: "ordinary-nnc-shell",
            possessiveSchemaId: "possessive-state-nnc",
            possessiveStateOwner: "predicate",
            possessiveStatePath: "predicate.state.st1-st2",
            possessiveStateBlocked: ["subject-connector", "tense"],
            possessiveNumberOwner: "subject",
            connectorOwner: "subject",
            connectorPath: "subject.num1-num2",
            connectorBlockedInterpretations: ["tense", "stem-suffix", "nounstem", "predicate-state"],
            vncValenceOwner: "predicate",
            vncValencePath: "predicate.valence.va1-va2",
            vncValenceBlocked: ["stem", "subject-connector", "subject-number-connector", "tense"],
            vncTenseOwner: "predicate",
            vncTensePath: "predicate.tense",
            vncTenseBlocked: ["nnc-state", "subject-number-connector", "object-valence"],
            vncNumberOwner: "subject",
            vncNumberPath: "subject.num1-num2",
            vncNumberBlocked: ["tense", "stem-suffix", "object-valence", "predicate-state"],
            hasTensePosition: false,
            possessiveHasTensePosition: false,
            vncHasTensePosition: true,
            generationContract: {
                routeFamily: "ordinary-nnc",
                routeStage: "formula-workbench",
                generationStatus: "generated",
                generationAllowed: true,
                sourceGated: false,
                diagnosticOnlyWhenMissingSource: true,
                unsupportedWhenBlocked: true,
                outputPolicy: "Generate through Andrews ordinary NNC/S formula logic; never treat num1-num2 as tense or a stem suffix.",
            },
            possessiveGenerationContract: {
                routeFamily: "possessive-state-nnc",
                routeStage: "formula-workbench",
                generationStatus: "source-gated",
                generationAllowed: true,
                sourceGated: true,
                diagnosticOnlyWhenMissingSource: true,
                unsupportedWhenBlocked: true,
                outputPolicy: "Generate possessive-state structure from Andrews logic; keep Classical spelling structural and realize Nawat/Pipil spelling through the orthography bridge.",
            },
            vncGenerationContract: {
                routeFamily: "vnc-valence",
                routeStage: "formula-workbench",
                generationStatus: "source-gated",
                generationAllowed: true,
                sourceGated: true,
                diagnosticOnlyWhenMissingSource: true,
                unsupportedWhenBlocked: true,
                outputPolicy: "VNC formulas use Andrews as the grammar logic authority; orthographic examples only illustrate realization, and spelling still passes through the orthography bridge.",
            },
            missingSourceOk: false,
            missingSourceDiagnosticId: "ordinary-nnc-missing-predicate-stem",
            missingPossessiveSourceOk: false,
            missingPossessiveSourceDiagnosticId: "possessive-nnc-missing-predicate-stem",
            missingVncSourceOk: false,
            missingVncSourceDiagnosticId: "vnc-missing-predicate-stem",
            satisfiedSourceOk: true,
            satisfiedSourceRequirementValue: "kal",
            missingFormulaAuthority: {
                allowed: false,
                gate: "andrews-formula-generation-blocked",
                status: "blocked",
                blockedReasons: ["formula-source-requirement-missing"],
                diagnosticId: "ordinary-nnc-missing-predicate-stem",
            },
            satisfiedFormulaAuthority: {
                allowed: true,
                gate: "andrews-formula-authorized-generation",
                status: "generated",
                logicAuthority: "Andrews PDF",
                orthographyAuthority: "Nawat/Pipil orthography bridge",
                spellingEvidenceRole: "spelling-realization-only",
                classicalSurfaceImport: "blocked",
                routeFamily: "ordinary-nnc",
            },
            blockedTense: {
                ok: false,
                schemaId: "ordinary-nnc-shell",
                slotId: "num1-num2",
                slotPath: "subject.num1-num2",
                slotRole: "subject-number-connector",
                slotOwner: "subject",
                interpretation: "tense",
                blocked: true,
                diagnostic: {
                    id: "formula-slot-num1-num2-not-tense",
                    severity: "blocked",
                    message: "ordinary-nnc-shell slot num1-num2 cannot be interpreted as tense.",
                    failedLayer: "nuclear-clause",
                    contractLayer: "nuclearClauseFrame",
                },
            },
            blockedStemSuffix: {
                ok: false,
                schemaId: "ordinary-nnc-shell",
                slotId: "num1-num2",
                slotPath: "subject.num1-num2",
                slotRole: "subject-number-connector",
                slotOwner: "subject",
                interpretation: "stem-suffix",
                blocked: true,
                diagnostic: {
                    id: "formula-slot-num1-num2-not-stem-suffix",
                    severity: "blocked",
                    message: "ordinary-nnc-shell slot num1-num2 cannot be interpreted as stem-suffix.",
                    failedLayer: "nuclear-clause",
                    contractLayer: "nuclearClauseFrame",
                },
            },
            blockedPossessiveStateAsSubject: {
                ok: false,
                schemaId: "possessive-state-nnc",
                slotId: "st1-st2",
                slotPath: "predicate.state.st1-st2",
                slotRole: "possessive-state",
                slotOwner: "predicate",
                interpretation: "subject-connector",
                blocked: true,
                diagnostic: {
                    id: "formula-slot-st1-st2-not-subject-connector",
                    severity: "blocked",
                    message: "possessive-state-nnc slot st1-st2 cannot be interpreted as subject-connector.",
                    failedLayer: "nuclear-clause",
                    contractLayer: "nuclearClauseFrame",
                },
            },
            blockedPossessiveNumberAsState: {
                ok: false,
                schemaId: "possessive-state-nnc",
                slotId: "num1-num2",
                slotPath: "subject.num1-num2",
                slotRole: "subject-number-connector",
                slotOwner: "subject",
                interpretation: "predicate-state",
                blocked: true,
                diagnostic: {
                    id: "formula-slot-num1-num2-not-predicate-state",
                    severity: "blocked",
                    message: "possessive-state-nnc slot num1-num2 cannot be interpreted as predicate-state.",
                    failedLayer: "nuclear-clause",
                    contractLayer: "nuclearClauseFrame",
                },
            },
            blockedVncValenceAsStem: {
                ok: false,
                schemaId: "vnc-shell",
                slotId: "va1-va2",
                slotPath: "predicate.valence.va1-va2",
                slotRole: "object-valence",
                slotOwner: "predicate",
                interpretation: "stem",
                blocked: true,
                diagnostic: {
                    id: "formula-slot-va1-va2-not-stem",
                    severity: "blocked",
                    message: "vnc-shell slot va1-va2 cannot be interpreted as stem.",
                    failedLayer: "nuclear-clause",
                    contractLayer: "nuclearClauseFrame",
                },
            },
            blockedVncTenseAsSubjectNumber: {
                ok: false,
                schemaId: "vnc-shell",
                slotId: "tns",
                slotPath: "predicate.tense",
                slotRole: "tense",
                slotOwner: "predicate",
                interpretation: "subject-number-connector",
                blocked: true,
                diagnostic: {
                    id: "formula-slot-tns-not-subject-number-connector",
                    severity: "blocked",
                    message: "vnc-shell slot tns cannot be interpreted as subject-number-connector.",
                    failedLayer: "nuclear-clause",
                    contractLayer: "nuclearClauseFrame",
                },
            },
        }
    );
    s.eq(
        "Andrews logic authority policy makes Nawat examples non-decisive for grammar generation",
        {
            policy: ctx.getAndrewsLogicAuthorityPolicy(),
            generationAuthorityEnabled: ctx.isAndrewsLogicGenerationAuthorityEnabled(),
        },
        {
            policy: {
                version: 1,
                grammarLogicAuthority: "Andrews PDF",
                grammarLogicDecidesGeneration: true,
                orthographyExamplesDecideGrammarLogic: false,
                grammarLogicGate: "andrews-licensed-route-plus-required-source-context",
                orthographyExamplesRole: "spelling-realization-only",
                orthographyAuthority: "Nawat/Pipil orthography bridge",
                orthographyBridgeRequired: true,
                noClassicalSurfaceImport: true,
                scope: "Andrews-licensed route, slot, boundary, and derivation logic",
            },
            generationAuthorityEnabled: true,
        }
    );
    s.eq(
        "core CNV tense authority marks Nawat finite extensions as non-generative",
        (() => {
            const summarize = (tense) => {
                const frame = ctx.getAndrewsCnvTenseLogicAuthorityFrame(tense);
                const gate = ctx.getAndrewsCnvTenseLogicGenerationGateFrame(frame);
                return {
                    scope: frame.scope,
                    slot: frame.slot,
                    family: frame.family,
                    generationGate: gate.generationGate,
                    outputRole: gate.outputRole,
                    nawatEvidenceRole: gate.nawatEvidenceRole,
                    allowed: ctx.isAndrewsCnvTenseLogicGenerationAllowed(tense),
                };
            };
            return {
                preterito: summarize("preterito"),
                condicional: summarize("condicional"),
                perfecto: summarize("perfecto"),
                unknown: summarize("inventado"),
            };
        })(),
        {
            preterito: {
                scope: "andrews-licensed",
                slot: "tns",
                family: "indicative-perfective-preterit",
                generationGate: "andrews-licensed-generation",
                outputRole: "orthography-realization",
                nawatEvidenceRole: "orthography-realization-only",
                allowed: true,
            },
            condicional: {
                scope: "nawat-extension",
                slot: "tns",
                family: "nawat-extension-condicional",
                generationGate: "not-andrews-grammar-gate",
                outputRole: "surface-evidence-only",
                nawatEvidenceRole: "surface-extension-only",
                allowed: false,
            },
            perfecto: {
                scope: "nawat-extension",
                slot: "tns",
                family: "nawat-extension-perfecto",
                generationGate: "not-andrews-grammar-gate",
                outputRole: "surface-evidence-only",
                nawatEvidenceRole: "surface-extension-only",
                allowed: false,
            },
            unknown: {
                scope: "unknown",
                slot: "andrews-frame-required",
                family: "inventado",
                generationGate: "unclassified-andrews-frame-required",
                outputRole: "blocked-until-andrews-frame",
                nawatEvidenceRole: "not-a-grammar-gate",
                allowed: false,
            },
        }
    );
    s.eq(
        "grammar authority frame treats source context as the generation gate and preserves source evidence as a compatibility alias",
        (() => {
            const frame = ctx.buildGrammarAuthorityFrame({
                evidenceStatus: "source-context-satisfied",
                sourceContext: {
                    kind: "andrews-route-source-context",
                    status: "source-context-satisfied",
                    targetAuthority: "Andrews",
                    contextSource: "generated NNC stage",
                    boundaries: {
                        sourceContextFromSelectedGeneratedStage: true,
                    },
                },
                sourceEvidence: {
                    kind: "legacy-nawat-evidence-object",
                    status: "source-evidence-satisfied",
                },
                supported: true,
            });
            return {
                sourceContextKind: frame.sourceContext.kind,
                sourceEvidenceKind: frame.sourceEvidence.kind,
                sameObject: frame.sourceEvidence === frame.sourceContext,
                status: frame.evidenceStatus,
                targetAuthority: frame.sourceContext.targetAuthority,
                contextSource: frame.sourceContext.contextSource,
                legacyEvidenceNotDecisive: frame.sourceEvidence.kind !== "legacy-nawat-evidence-object",
            };
        })(),
        {
            sourceContextKind: "andrews-route-source-context",
            sourceEvidenceKind: "andrews-route-source-context",
            sameObject: true,
            status: "source-context-satisfied",
            targetAuthority: "Andrews",
            contextSource: "generated NNC stage",
            legacyEvidenceNotDecisive: true,
        }
    );
    s.eq(
        "subject-number connector schema keeps subject dyads distinct from tense, object, and state",
        (() => {
            const schema = ctx.getAndrewsFormulaSlotSchema("subject-number-connectors");
            const subjectDyad = ctx.getAndrewsFormulaSlotDefinition("subject-number-connectors", "pers1-pers2");
            const numberDyad = ctx.getAndrewsFormulaSlotDefinition("subject-number-connectors", "num1-num2");
            const predicateSide = ctx.getAndrewsFormulaSlotDefinition("subject-number-connectors", "predicate-side");
            const blockedTense = ctx.diagnoseAndrewsFormulaSlotInterpretation("subject-number-connectors", "num1-num2", "tense");
            const blockedObject = ctx.diagnoseAndrewsFormulaSlotInterpretation("subject-number-connectors", "num1-num2", "object-valence");
            const blockedState = ctx.diagnoseAndrewsFormulaSlotInterpretation("subject-number-connectors", "num1-num2", "predicate-state");
            return {
                formula: ctx.renderAndrewsFormulaTemplate("subject-number-connectors"),
                schemaId: schema.id,
                hasTensePosition: schema.hasTensePosition,
                slotIds: schema.slots.map((slot) => slot.id),
                subjectDyad: {
                    role: subjectDyad.role,
                    owner: subjectDyad.owner,
                    path: subjectDyad.path,
                    blocked: subjectDyad.blockedInterpretations,
                },
                predicateSide: {
                    role: predicateSide.role,
                    owner: predicateSide.owner,
                    path: predicateSide.path,
                },
                numberDyad: {
                    role: numberDyad.role,
                    owner: numberDyad.owner,
                    path: numberDyad.path,
                    blocked: numberDyad.blockedInterpretations,
                },
                blockedTenseId: blockedTense.diagnostic.id,
                blockedObjectId: blockedObject.diagnostic.id,
                blockedStateId: blockedState.diagnostic.id,
            };
        })(),
        {
            formula: "pers1-pers2(STEM)num1-num2",
            schemaId: "subject-number-connectors",
            hasTensePosition: null,
            slotIds: ["pers1-pers2", "predicate-side", "num1-num2"],
            subjectDyad: {
                role: "subject-person",
                owner: "subject",
                path: "subject.pers1-pers2",
                blocked: ["predicate-state", "tense", "object-valence"],
            },
            predicateSide: {
                role: "predicate-boundary",
                owner: "predicate",
                path: "predicate.side",
            },
            numberDyad: {
                role: "subject-number-connector",
                owner: "subject",
                path: "subject.num1-num2",
                blocked: ["tense", "stem-suffix", "nounstem", "object-valence", "predicate-state"],
            },
            blockedTenseId: "formula-slot-num1-num2-not-tense",
            blockedObjectId: "formula-slot-num1-num2-not-object-valence",
            blockedStateId: "formula-slot-num1-num2-not-predicate-state",
        }
    );
    s.eq(
        "grammar frame preserves independent route/result/diagnostic contracts",
        (() => {
            const diagnostic = {
                id: "adjectival-nnc-requires-patientive-surface",
                severity: "error",
            };
            const frame = ctx.buildGrammarFrame({
                authorityFrame: ctx.buildGrammarAuthorityFrame({
                    evidenceStatus: "source-evidence-missing",
                    andrewsRefs: ["Andrews 40.4"],
                    supported: false,
                }),
                routeContract: ctx.buildGrammarRouteContractFrame({
                    routeFamily: "adjectival-nnc",
                    routeStage: "execute",
                    generationAllowed: false,
                    blockingDiagnostics: [diagnostic],
                }),
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    outputKind: "adjectival-nnc-patientive-function",
                    generationRoute: "adjectival-nnc",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [diagnostic],
                }),
            });
            return {
                keys: ctx.GRAMMAR_FRAME_KEYS.filter((key) => Object.prototype.hasOwnProperty.call(frame, key)),
                version: frame.version,
                firstLayer: frame.layerOrder[0],
                secondLayer: frame.layerOrder[1],
                thirdLayer: frame.layerOrder[2],
                evidenceStatus: frame.authorityFrame.evidenceStatus,
                routeFamily: frame.routeContract.routeFamily,
                generationAllowed: frame.routeContract.generationAllowed,
                resultOk: frame.resultFrame.ok,
                diagnosticId: frame.diagnosticFrame.diagnostics[0].id,
                emptyStemFrame: frame.stemFrame,
            };
        })(),
        {
            keys: ctx.GRAMMAR_FRAME_KEYS,
            version: 1,
            firstLayer: "authority-evidence",
            secondLayer: "orthography",
            thirdLayer: "unit-kind",
            evidenceStatus: "source-evidence-missing",
            routeFamily: "adjectival-nnc",
            generationAllowed: false,
            resultOk: false,
            diagnosticId: "adjectival-nnc-requires-patientive-surface",
            emptyStemFrame: null,
        }
    );
    s.eq(
        "grammar result contract exposes the common ok/surface/frames shape",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: true,
                    surface: "nemi",
                    surfaceForms: ["nemi"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "generated",
                    diagnostics: [],
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: { result: "nemi", diagnostics: [{ id: "kept", severity: "note" }] },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
                hasFrames: contract.frames === frame,
                diagnosticIds: contract.diagnostics.map((entry) => entry.id),
            };
        })(),
        {
            ok: true,
            surface: "nemi",
            surfaceForms: ["nemi"],
            hasFrames: true,
            diagnosticIds: ["kept"],
        }
    );
    s.eq(
        "grammar result contract accepts structured frame surface forms without stale result text",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surfaceForms: ["frame-only-a", "frame-only-b"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: { result: "—" },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "frame-only-a",
            surfaceForms: ["frame-only-a", "frame-only-b"],
        }
    );
    s.eq(
        "grammar result contract blocks slash-joined result-frame forms instead of splitting display strings",
        (() => {
            const frame = {
                resultFrame: {
                    kind: "grammar-result-frame",
                    surface: "frame-slash-surface-a / frame-slash-surface-b",
                    surfaceForms: ["frame-slash-a / frame-slash-b"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                },
            };
            const contract = ctx.buildGrammarResultContract({
                result: {
                    surface: "top-surface",
                    surfaceForms: ["stale-top-a / stale-top-b"],
                    result: "stale-result-a / stale-result-b",
                },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
            };
        })(),
        {
            ok: false,
            surface: "",
            surfaceForms: [],
        }
    );
    s.eq(
        "grammar result contract selects the first surface form before singular surfaces",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    surface: "frame-surface",
                    surfaceForms: ["frame-primary-a", "frame-primary-b"],
                    outputKind: "vnc",
                    generationRoute: "vnc",
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: {
                    surface: "top-surface",
                    surfaceForms: ["stale-top-primary"],
                    result: "stale-stale-result",
                },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
            };
        })(),
        {
            ok: true,
            surface: "frame-primary-a",
            surfaceForms: [
                "frame-primary-a",
                "frame-primary-b",
                "frame-surface",
            ],
        }
    );
    s.eq(
        "grammar result contract treats the stale no-output marker as blank surface",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "—",
                    surfaceForms: ["—"],
                    outputKind: "vnc",
                    generationRoute: "nuclear-clause-surface",
                }),
                diagnosticFrame: ctx.buildGrammarDiagnosticFrame({
                    status: "blocked",
                    diagnostics: [{ id: "blocked", severity: "error" }],
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: {
                    result: "—",
                    surface: "stale-blocked-surface",
                    surfaceForms: ["stale-blocked-a"],
                    error: true,
                },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                resultSurface: frame.resultFrame.surface,
                resultSurfaceForms: frame.resultFrame.surfaceForms,
                diagnosticId: contract.diagnostics[0].id,
            };
        })(),
        {
            ok: false,
            surface: "",
            resultSurface: "",
            resultSurfaceForms: [],
            diagnosticId: "blocked",
        }
    );
    s.eq(
        "grammar result contract stops at empty result frames before top-level surfaces",
        (() => {
            const frame = ctx.buildGrammarFrame({
                resultFrame: ctx.buildGrammarResultFrame({
                    ok: false,
                    surface: "",
                    surfaceForms: [],
                    outputKind: "vnc",
                    generationRoute: "nuclear-clause-surface",
                }),
            });
            const contract = ctx.buildGrammarResultContract({
                result: {
                    result: "stale-empty-result",
                    surface: "stale-empty-surface",
                    surfaceForms: ["stale-empty-a / stale-empty-b"],
                },
                grammarFrame: frame,
            });
            return {
                ok: contract.ok,
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
            };
        })(),
        {
            ok: false,
            surface: "",
            surfaceForms: [],
        }
    );
    s.eq(
        "grammar AST contract preserves AST diagnostics while filling astFrame",
        (() => {
            const ast = ctx.attachGrammarAstContract({
                kind: "adjectival-modification-ast",
                supported: false,
                surface: "",
                structuralSource: "Andrews Lessons 42-43",
                targetAuthority: "Nawat/Pipil clause outputs supplied to this builder",
                generationAllowed: false,
                newWordGenerationAllowed: false,
                diagnostics: ["adjectival-modification-requires-head-surface"],
            }, {
                astKind: "adjectival-modification-ast",
                lessons: [42, 43],
            });
            return {
                ok: ast.ok,
                surface: ast.surface,
                framesIsGrammarFrame: ast.frames === ast.grammarFrame,
                astKind: ast.frames.astFrame.kind,
                routeStage: ast.frames.routeContract.routeStage,
                generationAllowed: ast.frames.routeContract.generationAllowed,
                diagnosticStatus: ast.frames.diagnosticFrame.status,
                originalDiagnostics: ast.diagnostics,
                contractDiagnosticId: ast.contractDiagnostics[0].id,
                contractDiagnosticFailedLayer: ast.contractDiagnostics[0].failedLayer,
                contractDiagnosticContractLayer: ast.contractDiagnostics[0].contractLayer,
            };
        })(),
        {
            ok: false,
            surface: "",
            framesIsGrammarFrame: true,
            astKind: "adjectival-modification-ast",
            routeStage: "compose-ast",
            generationAllowed: false,
            diagnosticStatus: "blocked",
            originalDiagnostics: ["adjectival-modification-requires-head-surface"],
            contractDiagnosticId: "adjectival-modification-requires-head-surface",
            contractDiagnosticFailedLayer: "output",
            contractDiagnosticContractLayer: "resultFrame",
        }
    );
    s.eq(
        "grammar metadata contract fills diagnostic-only route frames without changing JSON shape",
        (() => {
            const source = {
                kind: "comparison-candidate-classification",
                lesson: 53,
                structuralSource: "Andrews Lesson 53",
                candidate: "translation label",
                generationAllowed: false,
                diagnostics: ["comparison-source-gated"],
            };
            const metadata = ctx.attachGrammarMetadataContract(source, {
                unitKind: "comparison-clause-unit",
                routeFamily: "comparison",
                routeStage: "classify-boundary",
                morphBoundaryFrame: { kind: "comparison-boundary" },
            });
            return {
                jsonShape: Object.keys(metadata),
                hasGrammarFrame: Boolean(metadata.grammarFrame),
                framesIsGrammarFrame: metadata.frames === metadata.grammarFrame,
                routeStage: metadata.frames.routeContract.routeStage,
                unitKind: metadata.frames.unitFrame.unitKind,
                generationAllowed: metadata.frames.routeContract.generationAllowed,
                diagnosticId: metadata.contractDiagnostics[0].id,
                diagnosticFailedLayer: metadata.contractDiagnostics[0].failedLayer,
                diagnosticContractLayer: metadata.contractDiagnostics[0].contractLayer,
                frameDiagnosticFailedLayer: metadata.frames.diagnosticFrame.diagnostics[0].failedLayer,
                blockingDiagnosticContractLayer: metadata.frames.routeContract.blockingDiagnostics[0].contractLayer,
                enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(metadata, "grammarFrame"),
            };
        })(),
        {
            jsonShape: [
                "kind",
                "lesson",
                "structuralSource",
                "candidate",
                "generationAllowed",
                "diagnostics",
            ],
            hasGrammarFrame: true,
            framesIsGrammarFrame: true,
            routeStage: "classify-boundary",
            unitKind: "comparison-clause-unit",
            generationAllowed: false,
            diagnosticId: "comparison-source-gated",
            diagnosticFailedLayer: "authority",
            diagnosticContractLayer: "authorityFrame",
            frameDiagnosticFailedLayer: "authority",
            blockingDiagnosticContractLayer: "authorityFrame",
            enumerableGrammarFrame: false,
        }
    );
    s.eq(
        "grammar diagnostic contract infers LCM layers for raw blocked diagnostics",
        ctx.normalizeGrammarDiagnosticContractEntries([
            "adjectival-modification-requires-head-surface",
            "relational-nnc-option-one-requires-possessive-state",
            "patientivo-compound-embed-missing-incorporated-root",
            "nuclear-clause-surface-intrans-potencial-combo-blocked",
            "unsupported-linked-promote-route",
            "comparison-source-gated",
            {
                id: "custom-layer",
                failedLayer: "route",
                contractLayer: "routeContract",
            },
        ]).map((entry) => ({
            id: entry.id,
            failedLayer: entry.failedLayer,
            contractLayer: entry.contractLayer,
        })),
        [
            {
                id: "adjectival-modification-requires-head-surface",
                failedLayer: "output",
                contractLayer: "resultFrame",
            },
            {
                id: "relational-nnc-option-one-requires-possessive-state",
                failedLayer: "agreement",
                contractLayer: "participantFrame",
            },
            {
                id: "patientivo-compound-embed-missing-incorporated-root",
                failedLayer: "stem",
                contractLayer: "stemFrame",
            },
            {
                id: "nuclear-clause-surface-intrans-potencial-combo-blocked",
                failedLayer: "inflection",
                contractLayer: "inflectionFrame",
            },
            {
                id: "unsupported-linked-promote-route",
                failedLayer: "route",
                contractLayer: "routeContract",
            },
            {
                id: "comparison-source-gated",
                failedLayer: "authority",
                contractLayer: "authorityFrame",
            },
            {
                id: "custom-layer",
                failedLayer: "route",
                contractLayer: "routeContract",
            },
        ]
    );
    s.eq(
        "grammar metadata contract suppresses stale aliases when result frame exists",
        (() => {
            const metadata = ctx.attachGrammarMetadataContract({
                kind: "metadata-frame-reader",
                result: "stale-meta-result",
                surface: "stale-surface",
                surfaceForms: ["stale-meta-a / stale-meta-b"],
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: true,
                        surface: "frame-meta-surface",
                        surfaceForms: ["frame-meta-a", "frame-meta-b"],
                        sourceInput: "frame-source-input",
                    }),
                }),
                candidate: "stale-metadata-candidate",
                sourceName: "stale-source-name",
            }, {
                unitKind: "metadata-frame-reader-unit",
                routeFamily: "metadata-frame-reader",
                routeStage: "test-frame-reader",
                supported: true,
                sourceInput: "stale-options-source-input",
                sourceContract: {
                    unitKind: "metadata-frame-reader-unit",
                    metadataKind: "metadata-frame-reader",
                    sourceInput: "stale-source-contract-input",
                    sourceSurface: "stale-source-contract-surface",
                },
                orthographyFrame: {
                    spellingAuthority: "Nawat/Pipil orthography bridge",
                    noClassicalSurfaceImport: true,
                    surface: "stale-orthography-surface",
                    surfaceForms: ["stale-orthography-a / stale-orthography-b"],
                },
            });
            return {
                surface: metadata.surface,
                topLevelSurfaceForms: metadata.surfaceForms || [],
                frameSurface: metadata.frames.resultFrame.surface,
                frameSurfaceForms: metadata.frames.resultFrame.surfaceForms,
                frameSourceInput: metadata.frames.resultFrame.sourceInput,
                routeSourceInput: metadata.frames.routeContract.sourceContract.sourceInput,
                routeSourceSurface: metadata.frames.routeContract.sourceContract.sourceSurface,
                orthographySurface: metadata.frames.orthographyFrame.surface,
                orthographySurfaceForms: metadata.frames.orthographyFrame.surfaceForms,
                resultStillEnumerable: Object.keys(metadata).includes("result"),
                enumerableSurface: Object.prototype.propertyIsEnumerable.call(metadata, "surface"),
            };
        })(),
        {
            surface: "frame-meta-a",
            topLevelSurfaceForms: ["frame-meta-a", "frame-meta-b", "frame-meta-surface"],
            frameSurface: "frame-meta-a",
            frameSurfaceForms: ["frame-meta-a", "frame-meta-b", "frame-meta-surface"],
            frameSourceInput: "frame-source-input",
            routeSourceInput: "frame-source-input",
            routeSourceSurface: "frame-source-input",
            orthographySurface: "frame-meta-a",
            orthographySurfaceForms: ["frame-meta-a", "frame-meta-b", "frame-meta-surface"],
            resultStillEnumerable: true,
            enumerableSurface: false,
        }
    );
    s.eq(
        "grammar metadata contract blocks slash-joined result-frame forms instead of splitting display strings",
        (() => {
            const metadata = ctx.attachGrammarMetadataContract({
                kind: "metadata-frame-slash-reader",
                result: "stale-meta-result-a / stale-meta-result-b",
                surface: "stale-surface",
                surfaceForms: ["stale-meta-a / stale-meta-b"],
                frames: {
                    resultFrame: {
                        kind: "grammar-result-frame",
                        surface: "frame-meta-surface-a / frame-meta-surface-b",
                        surfaceForms: ["frame-meta-a / frame-meta-b"],
                        sourceInput: "frame-source-input",
                    },
                },
            }, {
                unitKind: "metadata-frame-reader-unit",
                routeFamily: "metadata-frame-reader",
                routeStage: "test-frame-slash-reader",
            });
            return {
                ok: metadata.ok,
                surface: metadata.surface,
                topLevelSurfaceForms: metadata.surfaceForms || [],
                frameSurface: metadata.frames.resultFrame.surface,
                frameSurfaceForms: metadata.frames.resultFrame.surfaceForms,
                orthographySurface: metadata.frames.orthographyFrame.surface,
                orthographySurfaceForms: metadata.frames.orthographyFrame.surfaceForms,
            };
        })(),
        {
            ok: false,
            surface: "",
            topLevelSurfaceForms: [],
            frameSurface: "",
            frameSurfaceForms: [],
            orthographySurface: "",
            orthographySurfaceForms: [],
        }
    );
    s.eq(
        "grammar metadata contract keeps empty result frames from reviving stale orthography options",
        (() => {
            const metadata = ctx.attachGrammarMetadataContract({
                kind: "metadata-empty-frame-reader",
                result: "stale-empty-meta-result",
                surface: "stale-empty-meta-surface",
                surfaceForms: ["stale-empty-meta-a / stale-empty-meta-b"],
                output: {
                    surface: "stale-empty-output-surface",
                    surfaceForms: ["stale-empty-output-a / stale-empty-output-b"],
                },
                candidate: "stale-empty-candidate",
                sourceName: "stale-empty-source-name",
                frames: ctx.buildGrammarFrame({
                    resultFrame: ctx.buildGrammarResultFrame({
                        ok: false,
                        surface: "",
                        surfaceForms: [],
                    }),
                }),
            }, {
                unitKind: "metadata-empty-frame-reader-unit",
                routeFamily: "metadata-empty-frame-reader",
                routeStage: "test-empty-frame-reader",
                supported: false,
                sourceInput: "stale-empty-options-source-input",
                sourceContract: {
                    unitKind: "metadata-empty-frame-reader-unit",
                    metadataKind: "metadata-empty-frame-reader",
                    sourceInput: "stale-empty-source-contract-input",
                    sourceSurface: "stale-empty-source-contract-surface",
                },
                orthographyFrame: {
                    spellingAuthority: "Nawat/Pipil orthography bridge",
                    noClassicalSurfaceImport: true,
                    surface: "stale-empty-orthography-surface",
                    surfaceForms: ["stale-empty-orthography-a / stale-empty-orthography-b"],
                },
            });
            return {
                surface: metadata.surface,
                topLevelSurfaceForms: metadata.surfaceForms || [],
                frameSurface: metadata.frames.resultFrame.surface,
                frameSurfaceForms: metadata.frames.resultFrame.surfaceForms,
                frameSourceInput: metadata.frames.resultFrame.sourceInput,
                routeSourceInput: metadata.frames.routeContract.sourceContract.sourceInput,
                routeSourceSurface: metadata.frames.routeContract.sourceContract.sourceSurface,
                orthographySurface: metadata.frames.orthographyFrame.surface,
                orthographySurfaceForms: metadata.frames.orthographyFrame.surfaceForms,
            };
        })(),
        {
            surface: "",
            topLevelSurfaceForms: [],
            frameSurface: "",
            frameSurfaceForms: [],
            frameSourceInput: "",
            routeSourceInput: "",
            routeSourceSurface: "",
            orthographySurface: "",
            orthographySurfaceForms: [],
        }
    );
    s.eq(
        "grammar metadata contract ignores stale output primarySurface when contract output surfaces exist",
        (() => {
            const metadata = ctx.attachGrammarMetadataContract({
                kind: "metadata-output-frame-reader",
                result: "stale-form",
                output: {
                    primarySurface: "stale-primary-output",
                    surface: "output-surface",
                    surfaceForms: ["output-a / output-b"],
                },
            }, {
                unitKind: "metadata-output-reader-unit",
                routeFamily: "metadata-output-reader",
                routeStage: "test-output-reader",
                supported: true,
            });
            return {
                surface: metadata.surface,
                frameSurface: metadata.frames.resultFrame.surface,
                frameSurfaceForms: metadata.frames.resultFrame.surfaceForms,
            };
        })(),
        {
            surface: "output-a",
            frameSurface: "output-a",
            frameSurfaceForms: ["output-a", "output-b", "output-surface"],
        }
    );
    s.eq(
        "canonical CNV formula realization wins when formulaEcho result surface and resultFrame surfaces lie",
        (() => {
            const generated = ctx.executeGenerateWordRequest({
                options: {
                    silent: true,
                    skipValidation: true,
                    override: {
                        tenseMode: ctx.TENSE_MODE.verbo,
                        derivationMode: ctx.DERIVATION_MODE.active,
                        voiceMode: ctx.VOICE_MODE.active,
                        tiempo: "preterito",
                        posicionesFormula: {
                            pers1: "",
                            obj1: "ki",
                            tronco: "maka",
                            pers2: "",
                        },
                    },
                },
            });
            const hostileFrame = {
                ...generated.grammarFrame,
                resultFrame: {
                    ...generated.grammarFrame.resultFrame,
                    surface: "frame-lie",
                    surfaceForms: ["frame-lie / frame-alt-lie"],
                    formulaEcho: "#BAD-FORMULA#",
                },
            };
            const metadata = ctx.attachGrammarMetadataContract({
                ...generated,
                grammarFrame: hostileFrame,
                formulaEcho: "#BAD-FORMULA#",
                result: "top-lie / top-alt-lie",
                surface: "top-lie",
                surfaceForms: ["top-lie"],
            }, {
                supported: true,
                generationAllowed: true,
            });
            return {
                surface: metadata.surface,
                surfaceForms: metadata.surfaceForms,
                resultFrameSurface: metadata.frames.resultFrame.surface,
                formulaRecord: metadata.frames.resultFrame.formulaRecord.formula,
                realizationSurface: metadata.frames.resultFrame.formulaRealizationRecord.surface,
                firstPair: metadata.formulaSurfacePairs?.[0]
                    ? `${metadata.formulaSurfacePairs[0].surface}=>${metadata.formulaSurfacePairs[0].targetFormulaEcho}`
                    : "",
            };
        })(),
        {
            surface: "kimak",
            surfaceForms: ["kimak", "kimakak"],
            resultFrameSurface: "kimak",
            formulaRecord: "#Ø-Ø+ki-0(mak)Ø+0-0#",
            realizationSurface: "kimak",
            firstPair: "kimak=>#Ø-Ø+ki-0(mak)Ø+0-0#",
        }
    );
    s.eq(
        "formula realization records derive #2 from segment frames before supplied display surfaces",
        (() => {
            const formulaRecord = ctx.buildGrammarFormulaRecord({
                id: "hostile-realization-formula",
                unit: "CNV",
                formula: "#0-0(kwal)0+0-0#",
                formulaSlots: {
                    predicateStem: { slot: "STEM", stem: "kwal" },
                },
            });
            const record = ctx.buildGrammarFormulaRealizationRecord({
                id: "",
                formulaRecord,
                segmentFrames: [
                    { slot: "predicateStem", role: "predicate", formulaValue: "kwal", surface: "kwal" },
                    { slot: "tns", role: "tense", formulaValue: "0", surface: "" },
                ],
                surface: "surface-lie",
                surfaceForms: ["forms-lie-a / forms-lie-b"],
                deriveSurfaceFromSegments: true,
            });
            const normalized = ctx.normalizeGrammarFormulaRealizationRecords([{
                ...record,
                surface: "normalized-lie",
                surfaceForms: ["normalized-lie-a / normalized-lie-b"],
                deriveSurfaceFromSegments: true,
            }])[0];
            return {
                surface: record.surface,
                surfaceForms: record.surfaceForms,
                idHasSurfaceLie: record.id.includes("surface-lie") || record.id.includes("forms-lie"),
                normalizedSurface: normalized.surface,
                normalizedSurfaceForms: normalized.surfaceForms,
            };
        })(),
        {
            surface: "kwal",
            surfaceForms: ["kwal"],
            idHasSurfaceLie: false,
            normalizedSurface: "kwal",
            normalizedSurfaceForms: ["kwal"],
        }
    );
    s.eq(
        "canonical NNC formula realization wins when formulaEcho result surface and resultFrame surfaces lie",
        (() => {
            const generated = ctx.generateOrdinaryNncParadigm({
                stem: "kal",
                state: "absolutive",
                number: "singular",
            });
            const framed = ctx.attachGrammarMetadataContract({
                ...generated,
                result: "top-lie / top-alt-lie",
                surface: "top-lie",
                surfaceForms: ["top-lie"],
                formulaEcho: "#BAD-FORMULA#",
            }, {
                metadataKind: "ordinary-nnc",
                unitKind: "nominal-nuclear-clause",
                routeStage: "hostile-nnc-contract-test",
                supported: true,
                generationAllowed: true,
            });
            const hostileFrame = {
                ...framed.grammarFrame,
                resultFrame: {
                    ...framed.grammarFrame.resultFrame,
                    surface: "frame-lie",
                    surfaceForms: ["frame-lie"],
                    formulaEcho: "#BAD-FORMULA#",
                },
            };
            const contract = ctx.buildGrammarResultContract({
                result: {
                    ...framed,
                    result: "top-lie",
                    surface: "top-lie",
                    surfaceForms: ["top-lie"],
                },
                grammarFrame: hostileFrame,
            });
            return {
                surface: contract.surface,
                surfaceForms: contract.surfaceForms,
                formulaRecord: contract.frames.resultFrame.formulaRecord.formula,
                realizationSurface: contract.frames.resultFrame.formulaRealizationRecord.surface,
            };
        })(),
        {
            surface: "kal",
            surfaceForms: ["kal"],
            formulaRecord: "#Ø-Ø(kal)Ø-Ø#",
            realizationSurface: "kal",
        }
    );

    return s;
}

module.exports = { run };
