"use strict";

const { createSuite } = require("./runner");

function summarizeApplicationFrame(frame = {}) {
    return {
        status: frame.authorizationStatus,
        reason: frame.blockReason,
        requestedVoice: frame.controlFrame?.requestedVoice,
        selectedVoice: frame.controlFrame?.selectedVoice,
        accepted: frame.controlFrame?.requestedVoiceAccepted,
        normalization: frame.controlFrame?.voiceNormalizationReason,
        formula: frame.resultFrame?.formulaRealization,
        finalKind: frame.resultFrame?.finalTypedVncSlotFrame?.kind || "",
        selectedKind: frame.resultFrame?.selectedMachineryFrame?.kind || "",
        selectedStatus: frame.resultFrame?.selectedMachineryFrame?.authorizationStatus || "",
        appliedKinds: (frame.resultFrame?.appliedTypedFrames || []).map((typedFrame) => typedFrame.kind),
    };
}

function findNestedFrameByKind(value, expectedKind, seen = new Set()) {
    if (!value || typeof value !== "object" || seen.has(value)) {
        return null;
    }
    seen.add(value);
    if (value.kind === expectedKind) {
        return value;
    }
    for (const child of Object.values(value)) {
        const found = findNestedFrameByKind(child, expectedKind, seen);
        if (found) {
            return found;
        }
    }
    return null;
}

function selectApplicationDerivationOption(application, request, targetStem) {
    const preview = application.evaluate({ ...request, derivationOptionId: "" });
    const inventory = preview.controlFrame?.derivationOptionInventory || null;
    const option = (inventory?.options || []).find(candidate => candidate.targetStem === targetStem) || null;
    return { inventory, option, preview };
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_application");
    const {
        CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        buildClassicalNahuatlVncDerivationExplanationProjection,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication,
        getDefaultGrammarContractRegistry,
        getGrammarContractDefinition,
        inspectRegisteredGrammarContract,
    } = ctx;

    s.eq(
        "The application service declares every grammar dependency and fails closed when any are absent",
        (() => {
            const available = createClassicalNahuatlVncApplication(ctx);
            const unavailable = createClassicalNahuatlVncApplication({});
            const blocked = unavailable.evaluate({
                sourceStem: "chihua",
                sourceValence: "specific-projective",
                requestedVoice: "passive",
            });
            return {
                available: [available.authorizationStatus, available.missingCapabilities],
                unavailable: [unavailable.authorizationStatus, unavailable.missingCapabilities],
                blocked: {
                    status: blocked.authorizationStatus,
                    reason: blocked.blockReason,
                    selectedVoice: blocked.controlFrame.selectedVoice,
                    allowedVoices: blocked.controlFrame.allowedVoices,
                    formula: blocked.resultFrame.formulaRealization,
                },
            };
        })(),
        {
            available: ["authorized", []],
            unavailable: ["blocked", CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES],
            blocked: {
                status: "blocked",
                reason: "classical-vnc-application-required-capabilities-unavailable",
                selectedVoice: "active",
                allowedVoices: ["active"],
                formula: "",
            },
        }
    );

    s.eq(
        "One DOM-free boundary orchestrates active analysis and all four authorized derived voices",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const passive = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
            });
            const impersonal = application.evaluate({
                sourceStem: "mayāna",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3pl",
                requestedVoice: "impersonal",
            });
            const inherent = application.evaluate({
                sourceStem: "tōna",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedVoice: "inherent-impersonal",
            });
            const tla = application.evaluate({
                sourceStem: "nēci",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "2pl",
                requestedVoice: "tla-impersonal",
            });
            return {
                passive: summarizeApplicationFrame(passive),
                impersonal: summarizeApplicationFrame(impersonal),
                inherent: summarizeApplicationFrame(inherent),
                tla: summarizeApplicationFrame(tla),
            };
        })(),
        {
            passive: {
                status: "authorized",
                reason: "",
                requestedVoice: "passive",
                selectedVoice: "passive",
                accepted: true,
                normalization: "",
                formula: "#ni-0(chīhua-lo)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-lesson20-nonactive-stem-record",
                    "classical-nahuatl-lesson21-passive-transformation-frame",
                ],
            },
            impersonal: {
                status: "authorized",
                reason: "",
                requestedVoice: "impersonal",
                selectedVoice: "impersonal",
                accepted: true,
                normalization: "",
                formula: "#0-0(mayāna-lo)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-lesson20-nonactive-stem-record",
                    "classical-nahuatl-lesson22-impersonal-transformation-frame",
                ],
            },
            inherent: {
                status: "authorized",
                reason: "",
                requestedVoice: "inherent-impersonal",
                selectedVoice: "inherent-impersonal",
                accepted: true,
                normalization: "",
                formula: "#0-0(tōna)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-lesson22-inherent-impersonal-record",
                    "classical-nahuatl-lesson22-inherent-impersonal-transformation-frame",
                ],
            },
            tla: {
                status: "authorized",
                reason: "",
                requestedVoice: "tla-impersonal",
                selectedVoice: "tla-impersonal",
                accepted: true,
                normalization: "",
                formula: "#0-0(tla-nēci)0+0-0#",
                finalKind: "classical-nahuatl-vnc-slot-frame",
                selectedKind: "classical-nahuatl-lessons20-22-derived-vnc-machinery-frame",
                selectedStatus: "authorized",
                appliedKinds: [
                    "classical-nahuatl-vnc-derivation-source-analysis",
                    "classical-nahuatl-lesson22-tla-impersonal-stem-record",
                    "classical-nahuatl-lesson22-tla-impersonal-transformation-frame",
                ],
            },
        }
    );

    s.eq(
        "Unavailable voices normalize to active without converting the requested label into authority",
        summarizeApplicationFrame(createClassicalNahuatlVncApplication(ctx).evaluate({
            sourceStem: "mayāna",
            verbClass: "B",
            sourceValence: "intransitive",
            subject: "3sg",
            requestedVoice: "passive",
        })),
        {
            status: "authorized",
            reason: "",
            requestedVoice: "passive",
            selectedVoice: "active",
            accepted: false,
            normalization: "requested-voice-not-authorized-for-source",
            formula: "#0-0(mayāna)0+0-0#",
            finalKind: "classical-nahuatl-vnc-slot-frame",
            selectedKind: "classical-nahuatl-lesson7-verbstem-class-machinery-frame",
            selectedStatus: "authorized",
            appliedKinds: ["classical-nahuatl-vnc-derivation-source-analysis"],
        }
    );

    s.eq(
        "Ambiguous Lesson 20 alternatives stay blocked until the user shares an authorized option id",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "zō",
                verbClass: "A",
                sourceValence: "mainline-reflexive",
                subject: "3sg",
                requestedVoice: "passive",
            };
            const unresolved = application.evaluate(request);
            const resolved = application.evaluate({ ...request, nonactiveOptionId: "lō:zō-lō" });
            return {
                unresolved: {
                    status: unresolved.authorizationStatus,
                    reason: unresolved.blockReason,
                    selectedVoice: unresolved.controlFrame.selectedVoice,
                    selectorRequired: unresolved.controlFrame.nonactiveSelectorRequired,
                    options: unresolved.controlFrame.nonactiveOptionInventory.options.map((option) => option.optionId),
                    selectedKind: unresolved.resultFrame.selectedMachineryFrame?.kind,
                    selectedStatus: unresolved.resultFrame.selectedMachineryFrame?.authorizationStatus,
                    formula: unresolved.resultFrame.formulaRealization,
                },
                resolved: {
                    status: resolved.authorizationStatus,
                    reason: resolved.blockReason,
                    selectedOption: resolved.controlFrame.selectedNonactiveOptionId,
                    formula: resolved.resultFrame.formulaRealization,
                },
            };
        })(),
        {
            unresolved: {
                status: "blocked",
                reason: "lesson20-nonactive-option-selection-required",
                selectedVoice: "passive",
                selectorRequired: true,
                options: ["hua:zō-hua", "lō:zō-lō"],
                selectedKind: undefined,
                selectedStatus: undefined,
                formula: "",
            },
            resolved: {
                status: "authorized",
                reason: "",
                selectedOption: "lō:zō-lō",
                formula: "#0-0+ne(zō-lo)0+0-0#",
            },
        }
    );

    s.eq(
        "The application derives the witnessed distinct and reflexive Lesson 24 causatives through one typed operation",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const baseRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const distinctRequest = { ...baseRequest, sourceSubject: "3sg" };
            const reflexiveRequest = { ...baseRequest, sourceSubject: "1sg" };
            const distinctSelection = selectApplicationDerivationOption(application, distinctRequest, "tom-a");
            const reflexiveSelection = selectApplicationDerivationOption(application, reflexiveRequest, "tom-a");
            const distinct = application.evaluate({
                ...distinctRequest,
                derivationOptionId: distinctSelection.option?.optionId || "missing-tomi-option",
            });
            const reflexive = application.evaluate({
                ...reflexiveRequest,
                derivationOptionId: reflexiveSelection.option?.optionId || "missing-tomi-option",
            });
            const summarize = (frame, selection) => {
                const operation = frame.resultFrame.derivationOperationFrame;
                const addedObject = operation?.participantTransformFrame?.addedObjectRequest
                    || operation?.targetObjectRequests?.[0]
                    || null;
                return {
                    status: frame.authorizationStatus,
                    derivation: frame.controlFrame.derivationType,
                    accepted: frame.controlFrame.requestedDerivationAccepted,
                    inventoryKind: selection.inventory?.kind || "",
                    selectedOptionMatchesInventory: frame.controlFrame.selectedDerivationOptionId === selection.option?.optionId,
                    selectedOptionTarget: selection.option?.targetStem || "",
                    derivedStem: frame.controlFrame.derivedStem,
                    targetObjectCount: frame.controlFrame.targetObjectCount,
                    operationKind: operation?.kind || "",
                    operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                    addedObject: addedObject ? {
                        kind: addedObject.objectKind,
                        person: addedObject.objectPerson,
                        governor: addedObject.governor,
                        level: addedObject.derivationalLevel,
                    } : null,
                    formula: frame.resultFrame.formulaRealization,
                };
            };
            return {
                distinct: summarize(distinct, distinctSelection),
                reflexive: summarize(reflexive, reflexiveSelection),
            };
        })(),
        {
            distinct: {
                status: "authorized",
                derivation: "causative",
                accepted: true,
                inventoryKind: "classical-nahuatl-vnc-derivation-option-inventory",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "tom-a",
                derivedStem: "tom-a",
                targetObjectCount: 1,
                operationKind: "classical-nahuatl-vnc-derivation-operation-frame",
                operationTyped: true,
                addedObject: { kind: "specific-projective", person: "3sg", governor: "causative", level: 1 },
                formula: "#ni-0+c-0(tom-a)0+0-0#",
            },
            reflexive: {
                status: "authorized",
                derivation: "causative",
                accepted: true,
                inventoryKind: "classical-nahuatl-vnc-derivation-option-inventory",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "tom-a",
                derivedStem: "tom-a",
                targetObjectCount: 1,
                operationKind: "classical-nahuatl-vnc-derivation-operation-frame",
                operationTyped: true,
                addedObject: { kind: "reflexive", person: "1sg", governor: "causative", level: 1 },
                formula: "#ni-0+n-o(tom-a)0+0-0#",
            },
        }
    );

    s.eq(
        "Type-two causative and applicative requests preserve their typed source bases and Lesson 23 object routing",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const causativeRequest = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "1sg",
                subject: "2sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const applicativeRequest = {
                sourceStem: "xeloa",
                verbClass: "C",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const causativeSelection = selectApplicationDerivationOption(
                application,
                causativeRequest,
                "chīhua-l-tiā"
            );
            const applicativeSelection = selectApplicationDerivationOption(
                application,
                applicativeRequest,
                "xel-huiā"
            );
            const causative = application.evaluate({
                ...causativeRequest,
                derivationOptionId: causativeSelection.option?.optionId || "missing-type-two-causative-option",
            });
            const applicative = application.evaluate({
                ...applicativeRequest,
                derivationOptionId: applicativeSelection.option?.optionId || "missing-type-two-applicative-option",
            });
            const causativeNonactiveBase = findNestedFrameByKind(
                causative.resultFrame.derivationOperationFrame,
                "classical-nahuatl-lesson20-nonactive-stem-record"
            );
            const applicativeCluster = applicative.resultFrame.activeMachineryFrame?.multipleObjectClusterFrame;
            return {
                causative: {
                    status: causative.authorizationStatus,
                    selectedOptionMatchesInventory: causative.controlFrame.selectedDerivationOptionId === causativeSelection.option?.optionId,
                    selectedOptionTarget: causativeSelection.option?.targetStem || "",
                    stem: causative.resultFrame.activeMachineryFrame?.stem || "",
                    formula: causative.resultFrame.formulaRealization,
                    nonactiveBase: causativeNonactiveBase ? {
                        sourceStem: causativeNonactiveBase.sourceStem,
                        nonactiveStem: causativeNonactiveBase.nonactiveStem,
                        status: causativeNonactiveBase.authorizationStatus,
                    } : null,
                },
                applicative: {
                    status: applicative.authorizationStatus,
                    selectedOptionMatchesInventory: applicative.controlFrame.selectedDerivationOptionId === applicativeSelection.option?.optionId,
                    selectedOptionTarget: applicativeSelection.option?.targetStem || "",
                    stem: applicative.resultFrame.activeMachineryFrame?.stem || "",
                    formula: applicative.resultFrame.formulaRealization,
                    clusterKind: applicativeCluster?.kind || "",
                    positions: (applicativeCluster?.positions || []).map((position) => ({
                        governor: position.governor,
                        level: position.derivationalLevel,
                        prominence: position.prominence,
                        carrier: position.carrier,
                    })),
                },
            };
        })(),
        {
            causative: {
                status: "authorized",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "chīhua-l-tiā",
                stem: "chīhua-l-tiā",
                formula: "#ti-0+n-ech+0-0(chīhua-l-tia)0+0-0#",
                nonactiveBase: {
                    sourceStem: "chihua",
                    nonactiveStem: "chīhua-lō",
                    status: "authorized",
                },
            },
            applicative: {
                status: "authorized",
                selectedOptionMatchesInventory: true,
                selectedOptionTarget: "xel-huiā",
                stem: "xel-huiā",
                formula: "#ni-0+m-itz+0-0(xel-huia)0+0-0#",
                clusterKind: "classical-nahuatl-lesson23-object-cluster-frame",
                positions: [
                    { governor: "applicative", level: 2, prominence: "mainline", carrier: "m-itz" },
                    { governor: "directive", level: 1, prominence: "shuntline", carrier: "0-0" },
                ],
            },
        }
    );

    s.eq(
        "Entered sources outside the exact witness overlays receive productive causative and applicative operations",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const causativeRequest = {
                sourceStem: "miqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const causativeSelection = selectApplicationDerivationOption(application, causativeRequest, "mic-tiā");
            const causative = application.evaluate({
                ...causativeRequest,
                derivationOptionId: causativeSelection.option?.optionId || "missing-productive-causative-option",
            });
            const applicativeRequest = {
                sourceStem: "mati",
                verbClass: "B",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const applicativeSelection = selectApplicationDerivationOption(application, applicativeRequest, "mati-liā");
            const applicative = application.evaluate({
                ...applicativeRequest,
                derivationOptionId: applicativeSelection.option?.optionId || "missing-regular-type-two-applicative-option",
            });
            const summarize = frame => ({
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                selectedTarget: frame.resultFrame.derivationOperationFrame?.selectedOption?.targetStem || "",
                selectedRoute: frame.resultFrame.derivationOperationFrame?.selectedOption?.derivationRoute || "",
                operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(frame.resultFrame.derivationOperationFrame),
                targetObjectCount: frame.controlFrame.targetObjectCount,
                formula: frame.resultFrame.formulaRealization,
            });
            const previewCanvasChoice = causativeSelection.option?.canvasDerivationChoiceFrame || null;
            const selectedCanvasOption = causative.controlFrame.derivationOptionInventory?.options?.find(
                (option) => option.optionId === causative.controlFrame.selectedDerivationOptionId
            ) || null;
            const canvasChoice = selectedCanvasOption?.canvasDerivationChoiceFrame || null;
            const forgedCanvasChoice = canvasChoice ? {
                ...canvasChoice,
                targetRealization: {
                    ...canvasChoice.targetRealization,
                    canonicalStem: "mic-tia",
                },
            } : null;
            return {
                causativePreview: {
                    status: causativeSelection.preview.authorizationStatus,
                    reason: causativeSelection.preview.blockReason,
                    selectorRequired: causativeSelection.preview.controlFrame.derivationSelectorRequired,
                    targets: causativeSelection.inventory.options.map(option => option.targetStem),
                },
                causative: summarize(causative),
                canvasIdentity: {
                    kind: canvasChoice?.kind || "",
                    choiceId: canvasChoice?.identity?.choiceId || "",
                    operationId: canvasChoice?.identity?.operationId || "",
                    nomenclature: canvasChoice?.identity?.nomenclature || "",
                    target: canvasChoice?.targetRealization?.canonicalStem || "",
                    canonical: ctx.isClassicalNahuatlCanvasDerivationChoiceFrame(canvasChoice),
                    registered: ctx.inspectRegisteredGrammarContract(ctx.getDefaultGrammarContractRegistry(), canvasChoice).ok,
                    previewSignatureMatches: previewCanvasChoice?.canonicalSignature === canvasChoice?.canonicalSignature,
                    inventoryToOperation: causative.resultFrame.derivationOperationFrame?.selectedCanvasDerivationChoiceFrame === canvasChoice,
                    operationToControl: causative.controlFrame.selectedCanvasDerivationChoiceFrame === canvasChoice,
                    operationToResult: causative.resultFrame.selectedCanvasDerivationChoiceFrame === canvasChoice,
                    operationToExplanation: causative.derivationExplanationProjection.canvasDerivationChoiceFrame === canvasChoice,
                    signaturesContinuous: [
                        causative.resultFrame.derivationOperationFrame?.selectedChoiceSignature,
                        causative.controlFrame.selectedChoiceSignature,
                        causative.resultFrame.selectedChoiceSignature,
                        causative.derivationExplanationProjection.choiceSignature,
                    ].every((signature) => signature === canvasChoice?.canonicalSignature),
                    forgedSpellingRejected: !ctx.isClassicalNahuatlCanvasDerivationChoiceFrame(forgedCanvasChoice),
                },
                applicative: summarize(applicative),
            };
        })(),
        {
            causativePreview: {
                status: "blocked",
                reason: "classical-vnc-derivation-option-selection-required",
                selectorRequired: true,
                targets: ["mic-a", "miqui-ā", "mic-tiā"],
            },
            causative: {
                status: "authorized",
                reason: "",
                selectedTarget: "mic-tiā",
                selectedRoute: "type-two-tia-from-o-hua-nonactive",
                operationTyped: true,
                targetObjectCount: 1,
                formula: "#ni-0+c-0(mic-tia)0+0-0#",
            },
            canvasIdentity: {
                kind: "classical-nahuatl-canvas-derivation-choice-frame",
                choiceId: "causative:type-two:canvas:l25-253-miqui-o-hua-to-tia",
                operationId: "cn-l25-253-o-hua-to-tia",
                nomenclature: "Type 2 causative · o-hua to tiā",
                target: "mic-tiā",
                canonical: true,
                registered: true,
                previewSignatureMatches: true,
                inventoryToOperation: true,
                operationToControl: true,
                operationToResult: true,
                operationToExplanation: true,
                signaturesContinuous: true,
                forgedSpellingRejected: true,
            },
            applicative: {
                status: "authorized",
                reason: "",
                selectedTarget: "mati-liā",
                selectedRoute: "type-two-final-i-append-lia",
                operationTyped: true,
                targetObjectCount: 2,
                formula: "#ni-0+m-itz+0-0(mati-lia)0+0-0#",
            },
        }
    );

    s.eq(
        "#3 projects Andrews formation, participants, scope, and later voice from one canonical application envelope",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const evaluateSelected = (request, targetStem) => {
                const selection = selectApplicationDerivationOption(application, request, targetStem);
                return application.evaluate({
                    ...request,
                    derivationOptionId: selection.option?.optionId || "missing-option",
                });
            };
            const chihua = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "1sg",
                subject: "2sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            }, "chīhua-l-tiā"));
            const xeloa = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "xeloa",
                verbClass: "C",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            }, "xel-huiā"));
            const tomiPassive = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "passive",
            }, "tom-a"));
            const miquiAddition = buildClassicalNahuatlVncDerivationExplanationProjection(evaluateSelected({
                sourceStem: "miqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            }, "miqui-ā"));
            const summarizeParticipants = projection => projection.participantRows.map(row => ({
                source: row.sourceRole,
                action: row.transformation,
                carrier: row.targetCarrier,
                prominence: row.prominence,
                level: row.derivationalLevel,
                sounded: row.sounded,
            }));
            return {
                chihua: {
                    status: chihua.authorizationStatus,
                    route: chihua.formationSteps.map(step => step.stem),
                    participants: summarizeParticipants(chihua),
                    subjectLinks: {
                        source: chihua.sourceProfile.participantFormulaSegments
                            .filter(segment => segment.participantId === chihua.participantRows.find(row => row.sourceCarrierKind === "subject")?.participantId)
                            .map(segment => segment.text),
                        target: chihua.targetProfile.participantFormulaSegments
                            .filter(segment => segment.participantId === chihua.participantRows.find(row => row.targetCarrierKind === "subject")?.participantId)
                            .map(segment => segment.text),
                    },
                    targetObjectLinks: chihua.participantRows
                        .filter(row => row.targetCarrierKind === "object")
                        .map(row => ({
                            carrier: row.targetCarrier,
                            links: chihua.targetProfile.participantFormulaSegments
                                .filter(segment => segment.participantId === row.participantId)
                                .map(segment => segment.text),
                        })),
                    scope: [chihua.scope.model, chihua.scope.section],
                    evidence: chihua.evidence.sections,
                    procedure: [chihua.derivationProcedure.procedureType, chihua.derivationProcedure.label],
                },
                xeloa: {
                    status: xeloa.authorizationStatus,
                    route: xeloa.formationSteps.map(step => step.stem),
                    participants: summarizeParticipants(xeloa),
                    scope: [xeloa.scope.model, xeloa.scope.section],
                    carriers: xeloa.evidence.lesson23ObjectRouting.linearCarriers,
                    procedure: [xeloa.derivationProcedure.procedureType, xeloa.derivationProcedure.label],
                },
                tomiPassive: {
                    status: tomiPassive.authorizationStatus,
                    route: tomiPassive.formationSteps.map(step => step.stem),
                    activeBeforeVoice: tomiPassive.higherLayers.map(layer => layer.value),
                    finalFormula: tomiPassive.higherLayers[2].value,
                    procedure: [tomiPassive.derivationProcedure.procedureType, tomiPassive.derivationProcedure.label],
                },
                miquiAddition: [miquiAddition.authorizationStatus, miquiAddition.derivationProcedure.procedureType, miquiAddition.derivationProcedure.label],
                authority: [chihua.grammarAuthority, chihua.formulaStringAuthority, chihua.surfaceStringAuthority, chihua.displayTextAuthority],
            };
        })(),
        {
            chihua: {
                status: "authorized",
                route: ["chihua", "chihua", "chīhua-lō", "chīhua-l-tiā"],
                participants: [
                    { source: "2sg new matrix subject", action: "imported as outer subject", carrier: "ti-0…0-0", prominence: "subject", level: 0, sounded: true },
                    { source: "1sg source subject", action: "becomes the causative object", carrier: "n-ech", prominence: "mainline", level: 2, sounded: true },
                    { source: "3sg specific object in the source VNC", action: "retained from the source VNC", carrier: "0-0", prominence: "shuntline", level: 1, sounded: false },
                ],
                subjectLinks: {
                    source: ["ni-0", "0-0"],
                    target: ["ti-0", "0-0"],
                },
                targetObjectLinks: [
                    { carrier: "n-ech", links: ["n-ech"] },
                    { carrier: "0-0", links: ["0-0"] },
                ],
                scope: ["causative-source-vnc-core", "24.9"],
                evidence: ["25.1", "25.4", "25.11.1", "25.15"],
                procedure: ["nonactive-base-replacement", "Nonactive-base replacement"],
            },
            xeloa: {
                status: "authorized",
                route: ["xeloa", "xeloa", "xel-huiā"],
                participants: [
                    { source: "1sg source subject", action: "preserved as outer subject", carrier: "ni-0…0-0", prominence: "subject", level: 0, sounded: true },
                    { source: "new 2sg specific object", action: "is imported by the applicative", carrier: "m-itz", prominence: "mainline", level: 2, sounded: true },
                    { source: "3sg specific object in the source VNC", action: "retained from the source VNC", carrier: "0-0", prominence: "shuntline", level: 1, sounded: false },
                ],
                scope: ["applicative-object-suffix-discontinuous-unit", "26.23"],
                carriers: ["m-itz", "0-0"],
                procedure: ["replacement", "Replacement"],
            },
            tomiPassive: {
                status: "authorized",
                route: ["tomi", "tomi", "tom-a", "tom-a-lō"],
                activeBeforeVoice: ["tom-a", "passive → tom-a-lō", "#0-0(tom-a-lo)0+0-0#"],
                finalFormula: "#0-0(tom-a-lo)0+0-0#",
                procedure: ["replacement", "Replacement"],
            },
            miquiAddition: ["authorized", "addition", "Addition"],
            authority: [false, false, false, false],
        }
    );

    s.eq(
        "#3 projects raw Karttunen source-to-derivative evidence as a frozen lexical attestation, never route authority",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "cā-hua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "1sg",
                subject: "1sg",
                objectPerson: "3sg",
                requestedDerivation: "applicative",
                applicativeObjectKind: "specific-projective",
                applicativeObjectPerson: "2sg",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "cā-hui-liā");
            const canonical = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-cahua-applicative-option",
            });
            const projection = buildClassicalNahuatlVncDerivationExplanationProjection(canonical);
            const attestation = projection.evidence?.lexicalAttestations?.[0] || null;
            const poison = JSON.parse(JSON.stringify(canonical));
            poison.resultFrame.derivationOperationFrame.selectedOption.lexicalEvidenceMatches[0].sourceRecordId = "FORGED";
            return {
                applicationCanonical: ctx.isClassicalNahuatlVncApplicationFrame(canonical),
                target: projection.targetProfile?.stem || "",
                attestation: attestation ? {
                    role: attestation.evidenceRole,
                    recordId: attestation.sourceRecordId,
                    citation: `${attestation.sourceOriginal} → ${attestation.targetOriginal}`,
                    provenance: [attestation.provenanceDisplay, attestation.relationExtractionField, attestation.relationExtractionBlock, attestation.normalizedTranslationUsed, attestation.normalizedTranslationAuthority],
                    boundary: [attestation.boundaryStatus, attestation.matchBasis],
                    direction: [attestation.directionStatus, attestation.directionContract],
                    quantity: attestation.quantityStatus,
                    authority: [attestation.grammarAuthority, attestation.generationAuthority, attestation.targetConstructionAuthority, attestation.formulaAuthority, attestation.surfaceAuthority],
                } : null,
                frozen: Object.isFrozen(projection.evidence.lexicalAttestations)
                    && projection.evidence.lexicalAttestations.every(Object.isFrozen),
                productiveBadgeBasis: [projection.evidence.exactWitness, projection.evidence.productivityStatus],
                poison: {
                    applicationCanonical: ctx.isClassicalNahuatlVncApplicationFrame(poison),
                    projectionStatus: buildClassicalNahuatlVncDerivationExplanationProjection(poison).authorizationStatus,
                },
            };
        })(),
        {
            applicationCanonical: true,
            target: "cā-hui-liā",
            attestation: {
                role: "lexical-attestation-only",
                recordId: "karttunen-all:000041:a1",
                citation: "CĀHU(A) → CĀHUILIĀ",
                provenance: ["raw Karttunen column", "Karttunen", "raw CSV cell", false, false],
                boundary: ["unsegmented-dictionary-notation", "exact-classical-boundaryless"],
                direction: [
                    "source-after-marker-to-derivative-before-marker",
                    "TARGET marker SOURCE; inventory stores SOURCE -> TARGET",
                ],
                quantity: "classical-vowel-quantity-preserved",
                authority: [false, false, false, false, false],
            },
            frozen: true,
            productiveBadgeBasis: [false, "andrews-category-rule"],
            poison: {
                applicationCanonical: false,
                projectionStatus: "blocked",
            },
        }
    );

    s.eq(
        "#3 keeps Lesson 20 bridge evidence distinct from later-voice nonactive evidence and rejects typed evidence poison",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);

            const bridgeRequest = {
                sourceStem: "mayāna",
                verbClass: "A",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const bridgeSelection = selectApplicationDerivationOption(application, bridgeRequest, "mayāna-l-tiā");
            const bridgeApplication = application.evaluate({
                ...bridgeRequest,
                derivationOptionId: bridgeSelection.option?.optionId || "missing-mayana-type-two-option",
            });
            const bridgeProjection = buildClassicalNahuatlVncDerivationExplanationProjection(bridgeApplication);
            const bridgeAttestation = bridgeProjection.evidence?.lesson20Bridge?.lexicalAttestations?.[0] || null;
            const bridgePoison = JSON.parse(JSON.stringify(bridgeApplication));
            const bridgePoisonMatch = bridgePoison.resultFrame?.derivationOperationFrame?.selectedOption
                ?.lesson20NonactiveStemRecord?.lexicalEvidenceMatches?.[0];
            if (bridgePoisonMatch) {
                bridgePoisonMatch.sourceRecordId = "FORGED";
            }

            const laterVoiceRequest = {
                sourceStem: "cuī",
                verbClass: "A",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const laterVoiceSelection = selectApplicationDerivationOption(application, laterVoiceRequest, "cuī-tiā");
            const selectedLaterVoiceRequest = {
                ...laterVoiceRequest,
                derivationOptionId: laterVoiceSelection.option?.optionId || "missing-cui-type-two-option",
            };
            const laterVoiceActive = application.evaluate({
                ...selectedLaterVoiceRequest,
                requestedVoice: "active",
            });
            const nonactiveOptionId = laterVoiceActive.controlFrame.nonactiveOptionInventory?.automaticOptionId
                || laterVoiceActive.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
                || "missing-cui-nonactive-option";
            const laterVoiceApplication = application.evaluate({
                ...selectedLaterVoiceRequest,
                requestedVoice: "passive",
                nonactiveOptionId,
            });
            const laterVoiceProjection = buildClassicalNahuatlVncDerivationExplanationProjection(laterVoiceApplication);
            const laterVoiceAttestation = laterVoiceProjection.evidence?.laterVoiceNonactive?.lexicalAttestations?.[0] || null;
            const laterVoicePoison = JSON.parse(JSON.stringify(laterVoiceApplication));
            const laterVoicePoisonMatch = laterVoicePoison.resultFrame?.selectedMachineryFrame
                ?.nonactiveStemRecord?.lexicalEvidenceMatches?.[0];
            if (laterVoicePoisonMatch) {
                laterVoicePoisonMatch.sourceRecordId = "FORGED";
            }

            const summarizeAttestation = attestation => attestation ? {
                id: attestation.sourceRecordId,
                operation: attestation.operation,
                citation: `${attestation.sourceOriginal} → ${attestation.targetOriginal}`,
                provenance: attestation.provenanceDisplay,
                authority: [attestation.grammarAuthority, attestation.generationAuthority],
            } : null;
            return {
                bridge: {
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(bridgeApplication),
                    route: bridgeProjection.formationSteps.map(step => step.stem),
                    record: bridgeProjection.evidence?.lesson20Bridge ? {
                        source: bridgeProjection.evidence.lesson20Bridge.sourceStem,
                        target: bridgeProjection.evidence.lesson20Bridge.nonactiveStem,
                        attestation: summarizeAttestation(bridgeAttestation),
                    } : null,
                    selectedEvidenceOperation: bridgeProjection.evidence?.lexicalAttestations?.[0]?.operation || "",
                    poisonedCanonical: ctx.isClassicalNahuatlVncApplicationFrame(bridgePoison),
                    poisonedProjectionStatus: buildClassicalNahuatlVncDerivationExplanationProjection(bridgePoison).authorizationStatus,
                },
                laterVoice: {
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(laterVoiceApplication),
                    route: laterVoiceProjection.formationSteps.map(step => step.stem),
                    record: laterVoiceProjection.evidence?.laterVoiceNonactive ? {
                        source: laterVoiceProjection.evidence.laterVoiceNonactive.sourceStem,
                        target: laterVoiceProjection.evidence.laterVoiceNonactive.nonactiveStem,
                        attestation: summarizeAttestation(laterVoiceAttestation),
                    } : null,
                    nonactiveOptionId,
                    poisonedCanonical: ctx.isClassicalNahuatlVncApplicationFrame(laterVoicePoison),
                    poisonedProjectionStatus: buildClassicalNahuatlVncDerivationExplanationProjection(laterVoicePoison).authorizationStatus,
                },
            };
        })(),
        {
            bridge: {
                canonical: true,
                route: ["mayāna", "mayāna", "mayāna-lō", "mayāna-l-tiā"],
                record: {
                    source: "mayāna",
                    target: "mayāna-lō",
                    attestation: {
                        id: "karttunen-all:000225:n1",
                        operation: "nonactive",
                        citation: "MAYĀN(A) → MAYĀNALŌ",
                        provenance: "raw Karttunen column",
                        authority: [false, false],
                    },
                },
                selectedEvidenceOperation: "causative",
                poisonedCanonical: false,
                poisonedProjectionStatus: "blocked",
            },
            laterVoice: {
                canonical: true,
                route: ["cuī", "cuī", "cuī-hua", "cuī-tiā", "cuī-tī-lō"],
                record: {
                    source: "cuī-tiā",
                    target: "cuī-tī-lō",
                    attestation: null,
                },
                nonactiveOptionId: "lō:cuī-tī-lō",
                poisonedCanonical: false,
                poisonedProjectionStatus: "blocked",
            },
        }
    );

    s.eq(
        "#3 derivation explanation ignores display poison and fails closed on typed-envelope poison",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "1sg",
                subject: "2sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "chīhua-l-tiā");
            const canonical = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-option",
            });
            const displayPoison = {
                ...canonical,
                state: {
                    derivedStem: "LIE",
                    derivedClass: "LIE",
                    targetObjectCount: 99,
                    selectedFormula: "#LIE#",
                },
                derivationExplanationFrame: { authorizationStatus: "authorized", prose: "LIE" },
            };
            const poisonedProjection = buildClassicalNahuatlVncDerivationExplanationProjection(displayPoison);
            const mutate = callback => {
                const clone = JSON.parse(JSON.stringify(canonical));
                callback(clone);
                return {
                    applicationValid: ctx.isClassicalNahuatlVncApplicationFrame(clone),
                    projectionStatus: buildClassicalNahuatlVncDerivationExplanationProjection(clone).authorizationStatus,
                };
            };
            return {
                displayPoison: {
                    status: poisonedProjection.authorizationStatus,
                    route: poisonedProjection.formationSteps.map(step => step.stem),
                    poisonSurvived: JSON.stringify(poisonedProjection).includes("LIE"),
                },
                optionTarget: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.selectedOption.targetStem = "LIE";
                }),
                participant: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.participantTransformFrame.addedObjectRequest.objectPerson = "3pl";
                }),
                cluster: mutate(clone => {
                    clone.resultFrame.activeMachineryFrame.targetObjectClusterFrame.positions[0].carrier = "LIE";
                }),
                evidence: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.selectedOption.andrewsSection = "LIE";
                }),
                scope: mutate(clone => {
                    clone.resultFrame.derivationOperationFrame.selectedOption.scopeRule = "LIE";
                }),
            };
        })(),
        {
            displayPoison: {
                status: "authorized",
                route: ["chihua", "chihua", "chīhua-lō", "chīhua-l-tiā"],
                poisonSurvived: false,
            },
            optionTarget: { applicationValid: false, projectionStatus: "blocked" },
            participant: { applicationValid: false, projectionStatus: "blocked" },
            cluster: { applicationValid: false, projectionStatus: "blocked" },
            evidence: { applicationValid: false, projectionStatus: "blocked" },
            scope: { applicationValid: false, projectionStatus: "blocked" },
        }
    );

    s.eq(
        "#3 explanation cannot select among productive causative routes or replay itself as grammar authority",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const canonicalRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const selection = selectApplicationDerivationOption(application, canonicalRequest, "tom-a");
            const canonical = application.evaluate({
                ...canonicalRequest,
                derivationOptionId: selection.option?.optionId || "missing-option",
            });
            const explanation = buildClassicalNahuatlVncDerivationExplanationProjection(canonical);
            const blocked = application.evaluate({
                sourceStem: "miqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                derivationExplanationProjection: explanation,
                derivationExplanationFrame: explanation,
                derivationOperationFrame: explanation,
            });
            return {
                status: blocked.authorizationStatus,
                reason: blocked.blockReason,
                selectorRequired: blocked.controlFrame.derivationSelectorRequired,
                optionTargets: blocked.controlFrame.derivationOptionInventory.options.map(option => option.targetStem),
                rejected: [...blocked.rejectedAuthorityFields].sort(),
                formula: blocked.resultFrame.formulaRealization,
                selectedMachinery: blocked.resultFrame.selectedMachineryFrame,
                explanationSurvived: JSON.stringify(blocked).includes("classical-nahuatl-vnc-derivation-explanation-projection"),
            };
        })(),
        {
            status: "blocked",
            reason: "classical-vnc-derivation-option-selection-required",
            selectorRequired: true,
            optionTargets: ["mic-a", "miqui-ā", "mic-tiā"],
            rejected: ["derivationExplanationFrame", "derivationExplanationProjection", "derivationOperationFrame"],
            formula: "",
            selectedMachinery: null,
            explanationSurvived: false,
        }
    );

    s.eq(
        "A productive type-two causative consumes a typed two-object source and routes the new causee as the third object",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "multiple-object",
                sourceSubject: "1sg",
                subject: "2sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
                objectRequests: [
                    { objectId: "source-object-1", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "source-object-2", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            };
            const selection = selectApplicationDerivationOption(application, request, "chīhua-l-tiā");
            const result = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "forged-three-position-causative-option",
            });
            const operation = result.resultFrame.derivationOperationFrame;
            return {
                inventoryStatus: selection.inventory?.authorizationStatus || "",
                inventoryReason: selection.inventory?.blockReason || "",
                productiveOptionPresent: Boolean(selection.option),
                status: result.authorizationStatus,
                reason: result.blockReason,
                operationAuthorized: operation?.authorizationStatus === "authorized",
                operationTyped: Boolean(operation) && ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                targetObjectCount: result.controlFrame.targetObjectCount,
                formula: result.resultFrame.formulaRealization,
            };
        })(),
        {
            inventoryStatus: "authorized",
            inventoryReason: "",
            productiveOptionPresent: true,
            status: "authorized",
            reason: "",
            operationAuthorized: true,
            operationTyped: true,
            targetObjectCount: 3,
            formula: "#ti-0+n-ech+0-0+te(chīhua-l-tia)0+0-0#",
        }
    );

    s.eq(
        "A later passive derives its nonactive stem from the completed causative target",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const derivationRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const derivationSelection = selectApplicationDerivationOption(
                application,
                derivationRequest,
                "tom-a"
            );
            const selectedDerivationRequest = {
                ...derivationRequest,
                derivationOptionId: derivationSelection.option?.optionId || "missing-tomi-option",
            };
            const active = application.evaluate({ ...selectedDerivationRequest, requestedVoice: "active" });
            const engineOptionId = active.controlFrame.nonactiveOptionInventory?.automaticOptionId
                || active.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
                || "";
            const passive = application.evaluate({
                ...selectedDerivationRequest,
                requestedVoice: "passive",
                nonactiveOptionId: engineOptionId,
            });
            const nonactiveRecord = (passive.resultFrame.appliedTypedFrames || []).find(
                frame => frame?.kind === "classical-nahuatl-lesson20-nonactive-stem-record"
            );
            const voiceFrame = (passive.resultFrame.appliedTypedFrames || []).find(
                frame => frame?.kind === "classical-nahuatl-lesson21-passive-transformation-frame"
            );
            return {
                active: {
                    status: active.authorizationStatus,
                    sourceStem: active.resultFrame.sourceMachineryFrame?.stem || "",
                    derivedStem: active.resultFrame.activeMachineryFrame?.stem || "",
                    formula: active.resultFrame.formulaRealization,
                    engineOptionId,
                },
                passive: {
                    status: passive.authorizationStatus,
                    selectedVoice: passive.controlFrame.selectedVoice,
                    derivationStem: passive.resultFrame.derivationOperationFrame?.targetStem || "",
                    activeDerivedStem: passive.resultFrame.activeMachineryFrame?.stem || "",
                    nonactiveSourceStem: nonactiveRecord?.sourceStem || "",
                    nonactiveStem: nonactiveRecord?.nonactiveStem || "",
                    voiceSourceStem: voiceFrame?.sourceStem || "",
                    voiceTargetStem: voiceFrame?.targetStem || "",
                    selectedStem: passive.resultFrame.selectedMachineryFrame?.stem || "",
                    formula: passive.resultFrame.formulaRealization,
                },
            };
        })(),
        {
            active: {
                status: "authorized",
                sourceStem: "tomi",
                derivedStem: "tom-a",
                formula: "#ni-0+c-0(tom-a)0+0-0#",
                engineOptionId: "lō:tom-a-lō",
            },
            passive: {
                status: "authorized",
                selectedVoice: "passive",
                derivationStem: "tom-a",
                activeDerivedStem: "tom-a",
                nonactiveSourceStem: "tom-a",
                nonactiveStem: "tom-a-lō",
                voiceSourceStem: "tom-a",
                voiceTargetStem: "tom-a-lō",
                selectedStem: "tom-a-lō",
                formula: "#0-0(tom-a-lo)0+0-0#",
            },
        }
    );

    s.eq(
        "Source passive and impersonal are causativized before the independently selected target voice",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const passiveRequest = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                objectPerson: "3sg",
                subject: "2sg",
                requestedDerivation: "causative",
                sourceVoice: "passive",
                requestedVoice: "active",
            };
            const passiveSelection = selectApplicationDerivationOption(application, passiveRequest, "chīhua-l-tiā");
            const sourcePassiveTargetActive = application.evaluate({
                ...passiveRequest,
                derivationOptionId: passiveSelection.option?.optionId || "missing-chihua-causative-option",
            });
            const targetNonactiveOptionId = sourcePassiveTargetActive.controlFrame.nonactiveOptionInventory?.automaticOptionId
                || sourcePassiveTargetActive.controlFrame.nonactiveOptionInventory?.options?.[0]?.optionId
                || "";
            const sourcePassiveTargetPassive = application.evaluate({
                ...passiveRequest,
                derivationOptionId: passiveSelection.option?.optionId || "missing-chihua-causative-option",
                requestedVoice: "passive",
                nonactiveOptionId: targetNonactiveOptionId,
            });
            const impersonalRequest = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "projective-nonhuman",
                sourceSubject: "3sg",
                subject: "2sg",
                requestedDerivation: "causative",
                sourceVoice: "impersonal",
                requestedVoice: "active",
            };
            const impersonalSelection = selectApplicationDerivationOption(application, impersonalRequest, "chīhua-l-tiā");
            const sourceImpersonalTargetActive = application.evaluate({
                ...impersonalRequest,
                derivationOptionId: impersonalSelection.option?.optionId || "missing-chihua-causative-option",
            });
            const summarize = frame => {
                const sourceMachinery = frame.resultFrame.sourceMachineryFrame;
                const activeMachinery = frame.resultFrame.activeMachineryFrame;
                const selectedMachinery = frame.resultFrame.selectedMachineryFrame;
                const operation = frame.resultFrame.derivationOperationFrame;
                return {
                    status: frame.authorizationStatus,
                    reason: frame.blockReason,
                    sourceVoice: frame.controlFrame.selectedSourceVoice,
                    targetVoice: frame.controlFrame.selectedVoice,
                    sourceFrameVoice: sourceMachinery?.voice || "active",
                    operationSourceVoice: operation?.sourceVoice || "",
                    sourceNonactive: sourceMachinery?.nonactiveStemRecord ? {
                        source: sourceMachinery.nonactiveStemRecord.sourceStem,
                        target: sourceMachinery.nonactiveStemRecord.nonactiveStem,
                        option: sourceMachinery.nonactiveStemRecord.selectedOptionId,
                    } : null,
                    activeDerivedStem: activeMachinery?.stem || "",
                    selectedFrameVoice: selectedMachinery?.voice || "active",
                    targetNonactive: selectedMachinery?.nonactiveStemRecord ? {
                        source: selectedMachinery.nonactiveStemRecord.sourceStem,
                        target: selectedMachinery.nonactiveStemRecord.nonactiveStem,
                        option: selectedMachinery.nonactiveStemRecord.selectedOptionId,
                    } : null,
                    targetObjects: (operation?.targetObjectRequests || []).map(request => ({
                        kind: request.objectKind,
                        person: request.objectPerson,
                        governor: request.governor,
                    })),
                    formula: frame.resultFrame.formulaRealization,
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(frame),
                };
            };
            return {
                sourcePassiveTargetActive: summarize(sourcePassiveTargetActive),
                sourcePassiveTargetPassive: summarize(sourcePassiveTargetPassive),
                sourceImpersonalTargetActive: summarize(sourceImpersonalTargetActive),
            };
        })(),
        {
            sourcePassiveTargetActive: {
                status: "authorized",
                reason: "",
                sourceVoice: "passive",
                targetVoice: "active",
                sourceFrameVoice: "passive",
                operationSourceVoice: "passive",
                sourceNonactive: {
                    source: "chihua",
                    target: "chīhua-lō",
                    option: "lō:chīhua-lō",
                },
                activeDerivedStem: "chīhua-l-tiā",
                selectedFrameVoice: "active",
                targetNonactive: null,
                targetObjects: [
                    { kind: "specific-projective", person: "3sg", governor: "directive" },
                    { kind: "nonspecific-human", person: "", governor: "causative" },
                ],
                formula: "#t-0+0-0+te(chīhua-l-tia)0+0-0#",
                canonical: true,
            },
            sourcePassiveTargetPassive: {
                status: "authorized",
                reason: "",
                sourceVoice: "passive",
                targetVoice: "passive",
                sourceFrameVoice: "passive",
                operationSourceVoice: "passive",
                sourceNonactive: {
                    source: "chihua",
                    target: "chīhua-lō",
                    option: "lō:chīhua-lō",
                },
                activeDerivedStem: "chīhua-l-tiā",
                selectedFrameVoice: "passive",
                targetNonactive: {
                    source: "chīhua-l-tiā",
                    target: "chīhua-l-tī-lō",
                    option: "lō:chīhua-l-tī-lō",
                },
                targetObjects: [
                    { kind: "specific-projective", person: "3sg", governor: "directive" },
                    { kind: "nonspecific-human", person: "", governor: "causative" },
                ],
                formula: "#0-0+te(chīhua-l-tī-lo)0+0-0#",
                canonical: true,
            },
            sourceImpersonalTargetActive: {
                status: "authorized",
                reason: "",
                sourceVoice: "impersonal",
                targetVoice: "active",
                sourceFrameVoice: "impersonal",
                operationSourceVoice: "impersonal",
                sourceNonactive: {
                    source: "chihua",
                    target: "chīhua-lō",
                    option: "lō:chīhua-lō",
                },
                activeDerivedStem: "chīhua-l-tiā",
                selectedFrameVoice: "active",
                targetNonactive: null,
                targetObjects: [
                    { kind: "nonspecific-nonhuman", person: "", governor: "directive" },
                    { kind: "nonspecific-human", person: "", governor: "causative" },
                ],
                formula: "#ti-0+te+tla(chīhua-l-tia)0+0-0#",
                canonical: true,
            },
        }
    );

    s.eq(
        "An ambiguous source nonactive is selected before causative formation and forged source options fail closed",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "mahui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                sourceVoice: "impersonal",
                requestedVoice: "active",
            };
            const unresolved = application.evaluate(request);
            const sourceNonactiveOptionId = "o-hua:mahu-o-hua";
            const sourceResolvedPreview = application.evaluate({
                ...request,
                sourceNonactiveOptionId,
            });
            const derivationOption = sourceResolvedPreview.controlFrame.derivationOptionInventory?.options?.find(
                option => option.targetStem === "mauh-tiā"
            );
            const resolved = application.evaluate({
                ...request,
                sourceNonactiveOptionId,
                derivationOptionId: derivationOption?.optionId || "missing-mahui-causative-option",
            });
            const forged = application.evaluate({
                ...request,
                sourceNonactiveOptionId: "forged-source-nonactive-option",
            });
            return {
                unresolved: {
                    status: unresolved.authorizationStatus,
                    reason: unresolved.blockReason,
                    selectorRequired: unresolved.controlFrame.sourceNonactiveSelectorRequired,
                    options: unresolved.controlFrame.sourceNonactiveOptionInventory.options.map(option => option.optionId),
                    selected: unresolved.controlFrame.selectedSourceNonactiveOptionId,
                    derivationInventoryPresent: Boolean(unresolved.controlFrame.derivationOptionInventory),
                    formula: unresolved.resultFrame.formulaRealization,
                },
                resolved: {
                    status: resolved.authorizationStatus,
                    reason: resolved.blockReason,
                    selected: resolved.controlFrame.selectedSourceNonactiveOptionId,
                    sourceRecordSelected: resolved.resultFrame.sourceMachineryFrame?.nonactiveStemRecord?.selectedOptionId || "",
                    sourceVoiceStem: resolved.resultFrame.sourceMachineryFrame?.stem || "",
                    operationRecordSelected: resolved.resultFrame.derivationOperationFrame?.selectedOption?.lesson20NonactiveStemRecord?.selectedOptionId || "",
                    operationTarget: resolved.resultFrame.derivationOperationFrame?.targetStem || "",
                    formula: resolved.resultFrame.formulaRealization,
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(resolved),
                },
                forged: {
                    status: forged.authorizationStatus,
                    reason: forged.blockReason,
                    selected: forged.controlFrame.selectedSourceNonactiveOptionId,
                    poisonSurvived: JSON.stringify(forged).includes("forged-source-nonactive-option"),
                    formula: forged.resultFrame.formulaRealization,
                },
            };
        })(),
        {
            unresolved: {
                status: "blocked",
                reason: "lesson20-nonactive-option-selection-required",
                selectorRequired: true,
                options: ["o-hua:ma-ō-hua", "o-hua:mahu-o-hua"],
                selected: "",
                derivationInventoryPresent: false,
                formula: "",
            },
            resolved: {
                status: "authorized",
                reason: "",
                selected: "o-hua:mahu-o-hua",
                sourceRecordSelected: "o-hua:mahu-o-hua",
                sourceVoiceStem: "mahu-o-hua",
                operationRecordSelected: "o-hua:mahu-o-hua",
                operationTarget: "mauh-tiā",
                formula: "#ni-0+te(mauh-tia)0+0-0#",
                canonical: true,
            },
            forged: {
                status: "blocked",
                reason: "lesson20-selected-option-was-not-generated",
                selected: "",
                poisonSurvived: false,
                formula: "",
            },
        }
    );

    s.eq(
        "The application binds an unhyphenated Lessons 24–25 source analysis into control, inventory, result, applied frames, and #3",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "huāqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "huā-tz-a");
            const derived = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-huaqui-option",
            });
            const direct = application.evaluate({
                sourceStem: "huāqui",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                requestedDerivation: "direct",
            });
            const analysis = derived.resultFrame.sourceAnalysisFrame;
            const formationStep = derived.derivationExplanationProjection.formationSteps.find(step => step.stage === "source-analysis");
            const evidence = derived.derivationExplanationProjection.evidence.sourceAnalysis;
            const freeSourceAnalysisControls = Object.keys(derived.controlFrame).filter(key => /sourceAnalysis(?:Option|Selector|Selection)/u.test(key));
            return {
                status: derived.authorizationStatus,
                target: derived.controlFrame.derivedStem,
                analysis: {
                    kind: analysis?.kind || "",
                    canonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(analysis),
                    categories: analysis?.analyses.map(item => item.category) || [],
                    segments: analysis?.analyses.map(item => item.segments.join(" + ")) || [],
                    explicitBoundaryObserved: analysis?.explicitBoundaryObserved,
                    boundaryAuthority: analysis?.boundaryAuthority,
                },
                continuity: {
                    control: derived.controlFrame.sourceAnalysisFrame?.canonicalSignature === analysis?.canonicalSignature,
                    inventory: derived.controlFrame.derivationOptionInventory?.sourceAnalysisFrame?.canonicalSignature === analysis?.canonicalSignature,
                    result: derived.resultFrame.sourceAnalysisFrame?.canonicalSignature === analysis?.canonicalSignature,
                    appliedFirst: derived.resultFrame.appliedTypedFrames[0]?.kind,
                },
                projection: {
                    stage: formationStep?.stage,
                    categories: formationStep?.analysisCategories,
                    segments: formationStep?.analyses.map(item => item.segments.join(" + ")),
                    display: formationStep?.analyses.map(item => ({
                        label: item.display?.label,
                        parts: item.display?.parts.map(part => `${part.segment}:${part.role}`),
                        effect: item.display?.formationEffect,
                    })),
                    displayGroups: formationStep?.analysisDisplayGroups.map(group => ({
                        parts: group.parts.map(part => `${part.segment}:${part.role}`),
                        readings: group.readings,
                        effects: group.formationEffects,
                    })),
                    boundaryObserved: formationStep?.explicitBoundaryObserved,
                    userHyphensAuthority: formationStep?.userHyphensAuthority,
                    statement: formationStep?.authorityStatement,
                    evidenceCategories: evidence?.analysisCategories,
                    evidenceSegments: evidence?.analyses.map(item => item.segments.join(" + ")),
                    evidenceUserHyphensAuthority: evidence?.userHyphensAuthority,
                },
                freeSourceAnalysisControls,
                direct: {
                    status: direct.authorizationStatus,
                    analysisKind: direct.resultFrame.sourceAnalysisFrame?.kind || "",
                    appliedFirst: direct.resultFrame.appliedTypedFrames[0]?.kind || "",
                    explanationStatus: direct.derivationExplanationProjection.authorizationStatus,
                    explanationReason: direct.derivationExplanationProjection.blockReason,
                },
            };
        })(),
        {
            status: "authorized",
            target: "huā-tz-a",
            analysis: {
                kind: "classical-nahuatl-vnc-derivation-source-analysis",
                canonical: true,
                categories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                segments: ["huā + qui", "huā + qui"],
                explicitBoundaryObserved: false,
                boundaryAuthority: "engine-derived-analysis; editorial hyphens are observation only",
            },
            continuity: {
                control: true,
                inventory: true,
                result: true,
                appliedFirst: "classical-nahuatl-vnc-derivation-source-analysis",
            },
            projection: {
                stage: "source-analysis",
                categories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                segments: ["huā + qui", "huā + qui"],
                display: [
                    {
                        label: "Fused final-i analysis",
                        parts: ["huā:root", "qui:stem formative"],
                        effect: "Identifies the final-i base used by the selected Type 1 formation.",
                    },
                    {
                        label: "Type 1 consonant alternation",
                        parts: ["huā:source base", "qui:stem-final formative"],
                        effect: "Allows the documented consonant replacement before causative a.",
                    },
                ],
                displayGroups: [{
                    parts: ["huā:root", "qui:stem formative"],
                    readings: ["Fused final-i analysis", "Type 1 consonant alternation"],
                    effects: [
                        "Identifies the final-i base used by the selected Type 1 formation.",
                        "Allows the documented consonant replacement before causative a.",
                    ],
                }],
                boundaryObserved: false,
                userHyphensAuthority: false,
                statement: "User-authored hyphens are observations only; they never authorize source analysis.",
                evidenceCategories: ["fused-destockal-final-i", "type-one-consonant-alternation"],
                evidenceSegments: ["huā + qui", "huā + qui"],
                evidenceUserHyphensAuthority: false,
            },
            freeSourceAnalysisControls: [],
            direct: {
                status: "authorized",
                analysisKind: "classical-nahuatl-vnc-derivation-source-analysis",
                appliedFirst: "classical-nahuatl-vnc-derivation-source-analysis",
                explanationStatus: "blocked",
                explanationReason: "classical-vnc-derivation-explanation-derived-result-required",
            },
        }
    );

    s.eq(
        "The Lesson 25 causative card receives the Canvas-authorized internal derived-stem analysis",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "huā-qui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "huā-qui-l-tiā");
            const derived = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-huaqui-type-two-option",
            });
            const step = derived.derivationExplanationProjection.formationSteps.find(item => item.stage === "completed-active-derivation");
            return {
                status: derived.authorizationStatus,
                target: step?.stem,
                analysis: {
                    label: step?.derivedStemAnalysis?.label,
                    parts: step?.derivedStemAnalysis?.parts.map(part => `${part.segment}:${part.role}`),
                    process: step?.derivedStemAnalysis?.process,
                    source: step?.derivedStemAnalysis?.source,
                    grammarAuthority: step?.derivedStemAnalysis?.grammarAuthority,
                },
                frozen: Object.isFrozen(step?.derivedStemAnalysis) && Object.isFrozen(step?.derivedStemAnalysis?.parts),
            };
        })(),
        {
            status: "authorized",
            target: "huā-qui-l-tiā",
            analysis: {
                label: "Andrews derived-stem analysis",
                parts: [
                    "huā:root",
                    "qui:stem formative",
                    "l:retained nonactive formative",
                    "ti:empty connective",
                    "ā:causative formative",
                ],
                process: "The lō nonactive base loses ō; l remains before tiā. The tiā unit is connective ti plus causative ā.",
                source: "Andrews §§25.1, 25.4",
                grammarAuthority: false,
            },
            frozen: true,
        }
    );

    s.eq(
        "Caller source-analysis injection is discarded and hostile analysis mutation fails result and application validation",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "huāqui",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "huā-tz-a");
            const clean = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-huaqui-option",
                sourceAnalysisFrame: {
                    kind: "classical-nahuatl-vnc-derivation-source-analysis",
                    authorizationStatus: "authorized",
                    canonicalSignature: "SOURCE-ANALYSIS-POISON",
                },
                sentenceOptions: {
                    sourceAnalysisFrame: { canonicalSignature: "NESTED-SOURCE-ANALYSIS-POISON" },
                },
            });
            const poisonedAnalysis = {
                ...clean.resultFrame.sourceAnalysisFrame,
                analyses: clean.resultFrame.sourceAnalysisFrame.analyses.map((analysis, index) => index === 0 ? {
                    ...analysis,
                    category: "hostile-source-analysis-category",
                } : analysis),
            };
            const poisonedResult = {
                ...clean.resultFrame,
                sourceAnalysisFrame: poisonedAnalysis,
                appliedTypedFrames: clean.resultFrame.appliedTypedFrames.map((frame, index) => index === 0 ? poisonedAnalysis : frame),
            };
            const poisonedControlEnvelope = {
                ...clean,
                controlFrame: {
                    ...clean.controlFrame,
                    sourceAnalysisFrame: poisonedAnalysis,
                },
            };
            const registry = getDefaultGrammarContractRegistry();
            const poisonedResultReport = inspectRegisteredGrammarContract(registry, poisonedResult);
            const poisonedControlReport = inspectRegisteredGrammarContract(registry, poisonedControlEnvelope);
            return {
                status: clean.authorizationStatus,
                rejected: clean.rejectedAuthorityFields,
                canonical: ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(clean.resultFrame.sourceAnalysisFrame),
                poisonSurvived: JSON.stringify(clean).includes("POISON"),
                poisonedResultRejected: !poisonedResultReport.ok
                    && poisonedResultReport.errors.includes("authorized-application-result-canonical-validator-required"),
                poisonedControlRejected: !poisonedControlReport.ok
                    && poisonedControlReport.errors.includes("authorized-application-frame-canonical-validator-required"),
            };
        })(),
        {
            status: "authorized",
            rejected: ["sourceAnalysisFrame", "sentenceOptions.sourceAnalysisFrame"],
            canonical: true,
            poisonSurvived: false,
            poisonedResultRejected: true,
            poisonedControlRejected: true,
        }
    );

    s.eq(
        "Source-voice authority is immutable, caller source machinery is discarded, and cloned mutations never inherit canonical cache status",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                objectPerson: "3sg",
                subject: "2sg",
                requestedDerivation: "causative",
                sourceVoice: "passive",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, request, "chīhua-l-tiā");
            const clean = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-chihua-causative-option",
            });
            const callerPoisoned = application.evaluate({
                ...request,
                derivationOptionId: selection.option?.optionId || "missing-chihua-causative-option",
                sourceMachineryFrame: { voice: "ACTUAL-SOURCE-MACHINERY-POISON" },
                sourceVoiceMachineryFrame: { voice: "SOURCE-MACHINERY-POISON" },
                formationSourceMachineryFrame: { stem: "FORMATION-SOURCE-POISON" },
                reverseSourceAnalyses: [{ formationStem: "REVERSE-SOURCE-POISON" }],
            });
            const sourceMachinery = clean.resultFrame.sourceMachineryFrame;
            const formationMachinery = clean.resultFrame.formationSourceMachineryFrame;
            const operation = clean.resultFrame.derivationOperationFrame;
            const poisonedSourceVoiceResult = {
                ...clean.resultFrame,
                selectedSourceVoice: "impersonal",
            };
            const poisonedSourceMachineryResult = {
                ...clean.resultFrame,
                sourceMachineryFrame: {
                    ...sourceMachinery,
                    voice: "impersonal",
                },
            };
            const poisonedFormationMachineryResult = {
                ...clean.resultFrame,
                formationSourceMachineryFrame: {
                    ...formationMachinery,
                    stem: "forged-formation-source",
                },
            };
            const poisonedReverseOperation = {
                ...operation,
                reverseSourceAnalyses: operation.reverseSourceAnalyses.map((analysis, index) => index === 0 ? {
                    ...analysis,
                    formationStem: "forged-reverse-source",
                } : analysis),
            };
            const poisonedReverseResult = {
                ...clean.resultFrame,
                derivationOperationFrame: poisonedReverseOperation,
            };
            const poisonedSourceEnvelope = {
                ...clean,
                resultFrame: poisonedSourceMachineryResult,
            };
            const poisonedControlEnvelope = {
                ...clean,
                controlFrame: {
                    ...clean.controlFrame,
                    allowedSourceVoices: [...clean.controlFrame.allowedSourceVoices, "forged-source-voice"],
                    sourceNonactiveOptionInventory: {
                        ...clean.controlFrame.sourceNonactiveOptionInventory,
                        options: [],
                    },
                    sourceNonactiveSelectorRequired: !clean.controlFrame.sourceNonactiveSelectorRequired,
                },
            };
            const sparseAppliedFrames = Array(clean.resultFrame.appliedTypedFrames.length);
            const sparseAppliedFramesResult = {
                ...clean.resultFrame,
                appliedTypedFrames: sparseAppliedFrames,
            };
            const canonicalBeforeMutationAttempts = [
                ctx.isClassicalNahuatlVncApplicationResultFrame(clean.resultFrame),
                ctx.isClassicalNahuatlVncApplicationFrame(clean),
                ctx.isClassicalNahuatlVncApplicationFrame(clean),
            ];
            let sourceVoiceMutationThrew = false;
            let allowedVoiceMutationThrew = false;
            try {
                clean.resultFrame.sourceMachineryFrame.voice = "impersonal";
            } catch (_error) {
                sourceVoiceMutationThrew = true;
            }
            try {
                clean.controlFrame.allowedSourceVoices.push("forged-source-voice");
            } catch (_error) {
                allowedVoiceMutationThrew = true;
            }
            return {
                clean: {
                    status: clean.authorizationStatus,
                    sourceVoice: clean.controlFrame.selectedSourceVoice,
                    sourceMachineryVoice: clean.resultFrame.sourceMachineryFrame?.voice || "",
                    formula: clean.resultFrame.formulaRealization,
                    canonicalBeforeMutationAttempts,
                    canonicalAfterMutationAttempts: ctx.isClassicalNahuatlVncApplicationFrame(clean),
                },
                frozen: {
                    envelope: Object.isFrozen(clean),
                    control: Object.isFrozen(clean.controlFrame),
                    result: Object.isFrozen(clean.resultFrame),
                    allowedSourceVoices: Object.isFrozen(clean.controlFrame.allowedSourceVoices),
                    sourceMachinery: Object.isFrozen(clean.resultFrame.sourceMachineryFrame),
                    reverseAnalyses: Object.isFrozen(operation.reverseSourceAnalyses),
                    reverseAnalysis: Object.isFrozen(operation.reverseSourceAnalyses[0]),
                    sourceVoiceMutationThrew,
                    allowedVoiceMutationThrew,
                    sourceVoiceAfterMutationAttempt: clean.resultFrame.sourceMachineryFrame?.voice || "",
                },
                callerInjection: {
                    status: callerPoisoned.authorizationStatus,
                    rejected: [...callerPoisoned.rejectedAuthorityFields].sort(),
                    poisonSurvived: JSON.stringify(callerPoisoned).includes("POISON"),
                    canonical: ctx.isClassicalNahuatlVncApplicationFrame(callerPoisoned),
                },
                hostileClones: {
                    sourceVoiceResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedSourceVoiceResult),
                    sourceMachineryResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedSourceMachineryResult),
                    formationMachineryResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedFormationMachineryResult),
                    reverseOperationRejected: !ctx.isClassicalNahuatlVncDerivationOperationFrame(poisonedReverseOperation),
                    reverseResultRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(poisonedReverseResult),
                    sourceEnvelopeRejected: !ctx.isClassicalNahuatlVncApplicationFrame(poisonedSourceEnvelope),
                    controlInventoryRejected: !ctx.isClassicalNahuatlVncApplicationFrame(poisonedControlEnvelope),
                    sparseAppliedFramesRejected: !ctx.isClassicalNahuatlVncApplicationResultFrame(sparseAppliedFramesResult),
                },
            };
        })(),
        {
            clean: {
                status: "authorized",
                sourceVoice: "passive",
                sourceMachineryVoice: "passive",
                formula: "#t-0+0-0+te(chīhua-l-tia)0+0-0#",
                canonicalBeforeMutationAttempts: [true, true, true],
                canonicalAfterMutationAttempts: true,
            },
            frozen: {
                envelope: true,
                control: true,
                result: true,
                allowedSourceVoices: true,
                sourceMachinery: true,
                reverseAnalyses: true,
                reverseAnalysis: true,
                sourceVoiceMutationThrew: true,
                allowedVoiceMutationThrew: true,
                sourceVoiceAfterMutationAttempt: "passive",
            },
            callerInjection: {
                status: "authorized",
                rejected: ["formationSourceMachineryFrame", "reverseSourceAnalyses", "sourceMachineryFrame", "sourceVoiceMachineryFrame"],
                poisonSurvived: false,
                canonical: true,
            },
            hostileClones: {
                sourceVoiceResultRejected: true,
                sourceMachineryResultRejected: true,
                formationMachineryResultRejected: true,
                reverseOperationRejected: true,
                reverseResultRejected: true,
                sourceEnvelopeRejected: true,
                controlInventoryRejected: true,
                sparseAppliedFramesRejected: true,
            },
        }
    );

    s.eq(
        "Caller derivation targets, formulae, surfaces, and operation frames cannot replace the engine operation",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const cleanRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const selection = selectApplicationDerivationOption(application, cleanRequest, "tom-a");
            const result = application.evaluate({
                ...cleanRequest,
                derivationOptionId: selection.option?.optionId || "missing-tomi-option",
                targetStem: "TARGET-LIE",
                formula: "#FORMULA-LIE#",
                surface: "SURFACE-LIE",
                derivationOperationFrame: {
                    kind: "classical-nahuatl-vnc-derivation-operation-frame",
                    authorizationStatus: "authorized",
                    targetStem: "OPERATION-LIE",
                },
            });
            const operation = result.resultFrame.derivationOperationFrame;
            return {
                status: result.authorizationStatus,
                rejected: [...result.rejectedAuthorityFields].sort(),
                operationTyped: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
                operationTarget: operation?.targetStem || "",
                formula: result.resultFrame.formulaRealization,
                callerAccepted: result.callerSuppliedAuthorityAccepted,
                poisonSurvived: JSON.stringify(result).includes("LIE"),
            };
        })(),
        {
            status: "authorized",
            rejected: ["derivationOperationFrame", "formula", "surface", "targetStem"],
            operationTyped: true,
            operationTarget: "tom-a",
            formula: "#ni-0+c-0(tom-a)0+0-0#",
            callerAccepted: false,
            poisonSurvived: false,
        }
    );

    s.eq(
        "Caller-built targets, records, formulae, and surfaces are reported but never admitted as authority",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const result = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
                targetStem: "TARGET-LIE",
                formulaArtifact: "#FORMULA-LIE#",
                surfaceArtifact: "SURFACE-LIE",
                nonactiveStemRecord: { targetStem: "RECORD-LIE" },
                sentenceOptions: {
                    targetStem: "NESTED-TARGET-LIE",
                    resultFrame: { formulaRealization: "NESTED-RESULT-LIE" },
                },
            });
            const serialized = JSON.stringify(result);
            return {
                status: result.authorizationStatus,
                formula: result.resultFrame.formulaRealization,
                rejected: result.rejectedAuthorityFields,
                callerAccepted: result.callerSuppliedAuthorityAccepted,
                resultCallerAccepted: result.resultFrame.callerSuppliedAuthorityAccepted,
                formulaAuthority: result.formulaStringAuthority,
                surfaceAuthority: result.surfaceStringAuthority,
                poisonSurvived: serialized.includes("LIE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#ni-0(chīhua-lo)0+0-0#",
            rejected: [
                "targetStem",
                "formulaArtifact",
                "surfaceArtifact",
                "nonactiveStemRecord",
                "sentenceOptions.targetStem",
                "sentenceOptions.resultFrame",
            ],
            callerAccepted: false,
            resultCallerAccepted: false,
            formulaAuthority: false,
            surfaceAuthority: false,
            poisonSurvived: false,
        }
    );

    s.eq(
        "The shared catalog validates the application envelope and rejects a poisoned result contract",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const frame = application.evaluate({
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "2pl",
                objectPerson: "1sg",
                requestedVoice: "passive",
            });
            const direct = application.evaluate({
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
            });
            const alternateDirect = application.evaluate({
                sourceStem: "tēmi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "2sg",
            });
            const directionalDirect = application.evaluate({
                sourceStem: "mati",
                verbClass: "A",
                sourceValence: "specific-projective",
                subject: "1sg",
                objectPerson: "3sg",
                directionalPrefix: "on",
            });
            const causativeRequest = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                sourceSubject: "1sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
            };
            const causativeSelection = selectApplicationDerivationOption(application, causativeRequest, "tom-a");
            const causative = application.evaluate({
                ...causativeRequest,
                derivationOptionId: causativeSelection.option?.optionId || "missing-tomi-option",
            });
            const reflexiveVoiceBase = {
                sourceStem: "chihua",
                verbClass: "A",
                sourceValence: "mainline-reflexive",
                subject: "1sg",
            };
            const reflexivePassive = application.evaluate({ ...reflexiveVoiceBase, requestedVoice: "passive" });
            const reflexiveImpersonal = application.evaluate({ ...reflexiveVoiceBase, requestedVoice: "impersonal" });
            const registry = getDefaultGrammarContractRegistry();
            const poisonedResult = {
                ...frame.resultFrame,
                formulaStringAuthority: true,
            };
            const forgedResult = {
                ...frame.resultFrame,
                selectedMachineryFrame: { kind: "forged-machinery", authorizationStatus: "authorized" },
                finalTypedVncSlotFrame: { kind: "forged-typed-slot", semanticIdentity: "forged" },
                formulaRealization: "#FORGED#",
            };
            const formulaPoisonedResult = {
                ...frame.resultFrame,
                formulaRealization: "#FORGED#",
            };
            const forgedEnvelope = {
                ...frame,
                resultFrame: forgedResult,
            };
            const mixedSourceResult = {
                ...direct.resultFrame,
                sourceMachineryFrame: alternateDirect.resultFrame.sourceMachineryFrame,
            };
            const mixedActiveResult = {
                ...direct.resultFrame,
                activeMachineryFrame: alternateDirect.resultFrame.activeMachineryFrame,
                selectedMachineryFrame: alternateDirect.resultFrame.selectedMachineryFrame,
                finalTypedVncSlotFrame: alternateDirect.resultFrame.finalTypedVncSlotFrame,
                formulaRealization: alternateDirect.resultFrame.formulaRealization,
            };
            const mixedResultEnvelope = {
                ...direct,
                resultFrame: alternateDirect.resultFrame,
            };
            const mixedRequestEnvelope = {
                ...direct,
                normalizedRequest: {
                    ...direct.normalizedRequest,
                    sourceStem: "tēmi",
                },
            };
            const mismatchedFinalTypedResult = {
                ...frame.resultFrame,
                finalTypedVncSlotFrame: {
                    kind: "mismatched-typed-slot-frame",
                    semanticIdentity: frame.resultFrame.finalTypedVncSlotFrame.semanticIdentity,
                    slots: frame.resultFrame.finalTypedVncSlotFrame.slots,
                },
            };
            const mismatchedAppliedResult = {
                ...frame.resultFrame,
                appliedTypedFrames: [{ kind: "mismatched-applied-frame" }],
            };
            const mismatchedDerivationResult = {
                ...causative.resultFrame,
                selectedDerivation: "applicative",
            };
            const invalidNestedControlEnvelope = {
                ...direct,
                controlFrame: {
                    ...direct.controlFrame,
                    allowedVoices: [],
                },
            };
            const blockedAuthorityResult = {
                ...direct.resultFrame,
                authorizationStatus: "blocked",
                formulaRealization: "#MISMATCH#",
                selectedMachineryFrame: { kind: "mismatched-selected-frame" },
                finalTypedVncSlotFrame: { kind: "mismatched-final-frame" },
            };
            const blockedStatusEnvelope = {
                ...direct,
                authorizationStatus: "blocked",
                resultFrame: blockedAuthorityResult,
            };
            const mixedVoiceResult = {
                ...reflexivePassive.resultFrame,
                selectedVoice: "impersonal",
                selectedMachineryFrame: reflexiveImpersonal.resultFrame.selectedMachineryFrame,
                finalTypedVncSlotFrame: reflexiveImpersonal.resultFrame.finalTypedVncSlotFrame,
                formulaRealization: reflexiveImpersonal.resultFrame.formulaRealization,
                appliedTypedFrames: reflexiveImpersonal.resultFrame.appliedTypedFrames,
            };
            const mixedVoiceEnvelope = {
                ...reflexivePassive,
                normalizedRequest: {
                    ...reflexivePassive.normalizedRequest,
                    voice: "impersonal",
                },
                controlFrame: {
                    ...reflexivePassive.controlFrame,
                    selectedVoice: "impersonal",
                    selectedNonactiveOptionId: reflexiveImpersonal.controlFrame.selectedNonactiveOptionId,
                },
                resultFrame: mixedVoiceResult,
            };
            const forgedResultReport = inspectRegisteredGrammarContract(registry, forgedResult);
            const formulaPoisonedReport = inspectRegisteredGrammarContract(registry, formulaPoisonedResult);
            const forgedEnvelopeReport = inspectRegisteredGrammarContract(registry, forgedEnvelope);
            const mixedSourceReport = inspectRegisteredGrammarContract(registry, mixedSourceResult);
            const mixedActiveReport = inspectRegisteredGrammarContract(registry, mixedActiveResult);
            const mixedResultEnvelopeReport = inspectRegisteredGrammarContract(registry, mixedResultEnvelope);
            const mixedRequestEnvelopeReport = inspectRegisteredGrammarContract(registry, mixedRequestEnvelope);
            const mismatchedFinalTypedReport = inspectRegisteredGrammarContract(registry, mismatchedFinalTypedResult);
            const mismatchedAppliedReport = inspectRegisteredGrammarContract(registry, mismatchedAppliedResult);
            const mismatchedDerivationReport = inspectRegisteredGrammarContract(registry, mismatchedDerivationResult);
            const invalidNestedControlReport = inspectRegisteredGrammarContract(registry, invalidNestedControlEnvelope);
            const blockedAuthorityReport = inspectRegisteredGrammarContract(registry, blockedAuthorityResult);
            const blockedStatusEnvelopeReport = inspectRegisteredGrammarContract(registry, blockedStatusEnvelope);
            const mixedVoiceResultReport = inspectRegisteredGrammarContract(registry, mixedVoiceResult);
            const mixedVoiceEnvelopeReport = inspectRegisteredGrammarContract(registry, mixedVoiceEnvelope);
            return {
                envelope: inspectRegisteredGrammarContract(registry, frame).ok,
                request: inspectRegisteredGrammarContract(registry, frame.normalizedRequest).ok,
                control: inspectRegisteredGrammarContract(registry, frame.controlFrame).ok,
                result: inspectRegisteredGrammarContract(registry, frame.resultFrame).ok,
                directionalDirect: inspectRegisteredGrammarContract(registry, directionalDirect).ok,
                poisonedResult: inspectRegisteredGrammarContract(registry, poisonedResult),
                forgedResultRejected: !forgedResultReport.ok
                    && forgedResultReport.errors.includes("authorized-application-result-canonical-validator-required"),
                formulaPoisonRejected: !formulaPoisonedReport.ok
                    && formulaPoisonedReport.errors.includes("authorized-application-result-canonical-validator-required"),
                forgedEnvelopeRejected: !forgedEnvelopeReport.ok
                    && forgedEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                mixedSourceRejected: !mixedSourceReport.ok
                    && mixedSourceReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mixedActiveRejected: !mixedActiveReport.ok
                    && mixedActiveReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mixedResultEnvelopeRejected: !mixedResultEnvelopeReport.ok
                    && mixedResultEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                mixedRequestEnvelopeRejected: !mixedRequestEnvelopeReport.ok
                    && mixedRequestEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                mismatchedFinalTypedRejected: !mismatchedFinalTypedReport.ok
                    && mismatchedFinalTypedReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mismatchedAppliedRejected: !mismatchedAppliedReport.ok
                    && mismatchedAppliedReport.errors.includes("authorized-application-result-canonical-validator-required"),
                mismatchedDerivationRejected: !mismatchedDerivationReport.ok
                    && mismatchedDerivationReport.errors.includes("authorized-application-result-canonical-validator-required"),
                invalidNestedControlRejected: !invalidNestedControlReport.ok
                    && invalidNestedControlReport.errors.includes("authorized-application-frame-canonical-validator-required"),
                blockedAuthorityRejected: !blockedAuthorityReport.ok
                    && blockedAuthorityReport.errors.includes("blocked-application-result-authority-payload-forbidden"),
                blockedStatusEnvelopeRejected: !blockedStatusEnvelopeReport.ok
                    && blockedStatusEnvelopeReport.errors.includes("blocked-application-frame-status-and-authority-payload-mismatch"),
                mixedVoiceResultCanonical: mixedVoiceResultReport.ok,
                mixedVoiceEnvelopeRejected: !mixedVoiceEnvelopeReport.ok
                    && mixedVoiceEnvelopeReport.errors.includes("authorized-application-frame-canonical-validator-required"),
            };
        })(),
        {
            envelope: true,
            request: true,
            control: true,
            result: true,
            directionalDirect: true,
            poisonedResult: {
                kind: "grammar-contract-validation-report",
                version: 1,
                ok: false,
                status: "invalid",
                contractKind: "classical-nahuatl-vnc-application-result-frame",
                contractVersion: 1,
                authorityRole: "validated-typed-result",
                definition: getGrammarContractDefinition(
                    getDefaultGrammarContractRegistry(),
                    "classical-nahuatl-vnc-application-result-frame",
                    1
                ),
                errors: [
                    "contract-validator-rejected-frame",
                    "authorized-application-result-canonical-validator-required",
                    "application-result-formula-string-authority-forbidden",
                ],
            },
            forgedResultRejected: true,
            formulaPoisonRejected: true,
            forgedEnvelopeRejected: true,
            mixedSourceRejected: true,
            mixedActiveRejected: true,
            mixedResultEnvelopeRejected: true,
            mixedRequestEnvelopeRejected: true,
            mismatchedFinalTypedRejected: true,
            mismatchedAppliedRejected: true,
            mismatchedDerivationRejected: true,
            invalidNestedControlRejected: true,
            blockedAuthorityRejected: true,
            blockedStatusEnvelopeRejected: true,
            mixedVoiceResultCanonical: false,
            mixedVoiceEnvelopeRejected: true,
        }
    );

    s.eq(
        "Causative participant choices are exposed only from typed engine eligibility and remain canonical application controls",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const relationBase = {
                sourceStem: "māmā",
                verbClass: "D",
                sourceValence: "specific-projective",
                sourceSubject: "3pl",
                subject: "3pl",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            };
            const relationSelection = selectApplicationDerivationOption(application, relationBase, "māma-l-tiā");
            const relationOptionId = relationSelection.option?.optionId || relationSelection.inventory?.options?.[0]?.optionId || "missing-option";
            const relationRequired = application.evaluate({ ...relationBase, derivationOptionId: relationOptionId });
            const relationDistinct = application.evaluate({
                ...relationBase,
                derivationOptionId: relationOptionId,
                causativeReferentRelation: "distinct",
            });
            const shuntlineBase = {
                sourceStem: "mati",
                verbClass: "B",
                sourceValence: "specific-projective",
                sourceSubject: "3sg",
                subject: "3sg",
                objectPerson: "3sg",
                requestedDerivation: "causative",
                sourceVoice: "passive",
                sourceNonactiveOptionId: "ō:mach-ō",
                requestedVoice: "active",
            };
            const shuntlineSelection = selectApplicationDerivationOption(application, shuntlineBase, "mach-tiā");
            const shuntlineOptionId = shuntlineSelection.option?.optionId || shuntlineSelection.inventory?.options?.[0]?.optionId || "missing-option";
            const shuntlinePreview = application.evaluate({ ...shuntlineBase, derivationOptionId: shuntlineOptionId });
            const shuntlineSilent = application.evaluate({
                ...shuntlineBase,
                derivationOptionId: shuntlineOptionId,
                causativeSpecificShuntlineRealization: "silent",
            });
            const shuntlineSounded = application.evaluate({
                ...shuntlineBase,
                derivationOptionId: shuntlineOptionId,
                causativeSpecificShuntlineRealization: "sounded",
            });
            const poisonedControlInventory = JSON.parse(JSON.stringify(shuntlineSilent));
            poisonedControlInventory.controlFrame.allowedCausativeSpecificShuntlineRealizations = ["caller-invented"];
            return {
                relationRequired: {
                    status: relationRequired.authorizationStatus,
                    reason: relationRequired.blockReason,
                    eligible: relationRequired.controlFrame.causativeReferentRelationChoiceEligible,
                    allowed: relationRequired.controlFrame.allowedCausativeReferentRelations,
                    required: relationRequired.controlFrame.causativeReferentRelationSelectionRequired,
                    selected: relationRequired.controlFrame.selectedCausativeReferentRelation,
                },
                relationDistinct: {
                    status: relationDistinct.authorizationStatus,
                    eligible: relationDistinct.controlFrame.causativeReferentRelationChoiceEligible,
                    selected: relationDistinct.controlFrame.selectedCausativeReferentRelation,
                    specificObject: relationDistinct.resultFrame.derivationOperationFrame?.participantTransformFrame?.addedObjectRequest?.objectKind,
                },
                shuntlinePreview: {
                    status: shuntlinePreview.authorizationStatus,
                    eligible: shuntlinePreview.controlFrame.causativeSpecificShuntlineChoiceEligible,
                    allowed: shuntlinePreview.controlFrame.allowedCausativeSpecificShuntlineRealizations,
                    selected: shuntlinePreview.controlFrame.selectedCausativeSpecificShuntlineRealization,
                },
                shuntlineRealizations: [shuntlineSilent, shuntlineSounded].map(frame => ({
                    status: frame.authorizationStatus,
                    selected: frame.controlFrame.selectedCausativeSpecificShuntlineRealization,
                    formula: frame.resultFrame.formulaRealization,
                })),
                poisonedControlInventoryCanonical: ctx.isClassicalNahuatlVncApplicationFrame(poisonedControlInventory),
            };
        })(),
        {
            relationRequired: {
                status: "blocked",
                reason: "classical-vnc-causative-equal-person-category-referent-choice-required",
                eligible: true,
                allowed: ["distinct", "coreferential"],
                required: true,
                selected: "",
            },
            relationDistinct: {
                status: "authorized",
                eligible: true,
                selected: "distinct",
                specificObject: "specific-projective",
            },
            shuntlinePreview: {
                status: "authorized",
                eligible: true,
                allowed: ["silent", "sounded"],
                selected: "",
            },
            shuntlineRealizations: [{
                status: "authorized",
                selected: "silent",
                formula: "#0-0+0-0+te(mach-tia)0+0-0#",
            }, {
                status: "authorized",
                selected: "sounded",
                formula: "#0-0+qui-0+te(mach-tia)0+0-0#",
            }],
            poisonedControlInventoryCanonical: false,
        }
    );

    s.eq(
        "Typed object requests enter the shared Lesson 23 path while ordered voice layers remain unsupported",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "maca",
                verbClass: "A",
                sourceValence: "multiple-object",
                subject: "3sg",
                tense: "future",
                requestedVoice: "active",
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-human", objectKind: "nonspecific-human", objectPerson: "", governor: "applicative", derivationalLevel: 2 },
                ],
            };
            const accepted = application.evaluate(request);
            const unsupported = application.evaluate({
                ...request,
                sentenceOptions: { orderedVoiceOperations: ["passive", "impersonal"] },
            });
            return {
                accepted: {
                    status: accepted.authorizationStatus,
                    reason: accepted.blockReason,
                    intent: accepted.unsupportedIntentFields,
                    requestCount: accepted.normalizedRequest.sourceObjectRequests.length,
                    selectedKind: accepted.resultFrame.selectedMachineryFrame?.kind || "",
                    clusterKind: accepted.resultFrame.selectedMachineryFrame?.multipleObjectClusterFrame?.kind || "",
                    formula: accepted.resultFrame.formulaRealization,
                },
                unsupported: {
                    status: unsupported.authorizationStatus,
                    reason: unsupported.blockReason,
                    intent: unsupported.unsupportedIntentFields,
                    formula: unsupported.resultFrame.formulaRealization,
                    activeSourceStatus: unsupported.resultFrame.activeMachineryFrame?.authorizationStatus
                        || unsupported.resultFrame.activeMachineryFrame?.proofFrame?.authorizationStatus
                        || "",
                },
            };
        })(),
        {
            accepted: {
                status: "authorized",
                reason: "",
                intent: [],
                requestCount: 2,
                selectedKind: "classical-nahuatl-lesson23-multiple-object-vnc-machinery-frame",
                clusterKind: "classical-nahuatl-lesson23-object-cluster-frame",
                formula: "#0-0+qui-0+te(maca)z+⎕-0#",
            },
            unsupported: {
                status: "blocked",
                reason: "classical-vnc-application-intent-outside-derivation-and-single-voice-scope",
                intent: ["sentenceOptions.orderedVoiceOperations"],
                formula: "",
                activeSourceStatus: "authorized",
            },
        }
    );

    s.eq(
        "The one-shot helper and injected ESM service expose the same application contract",
        (() => {
            const application = createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "nēci",
                verbClass: "B",
                sourceValence: "intransitive",
                requestedVoice: "tla-impersonal",
            };
            const installed = application.evaluate(request);
            const oneShot = evaluateClassicalNahuatlVncApplication(request, ctx);
            return {
                serviceKind: application.kind,
                serviceStatus: application.authorizationStatus,
                createInstalled: typeof createClassicalNahuatlVncApplication,
                installed: [installed.authorizationStatus, installed.resultFrame.formulaRealization],
                oneShot: [oneShot.authorizationStatus, oneShot.resultFrame.formulaRealization],
            };
        })(),
        {
            serviceKind: "classical-nahuatl-vnc-application-service",
            serviceStatus: "authorized",
            createInstalled: "function",
            installed: ["authorized", "#0-0(tla-nēci)0+0-0#"],
            oneShot: ["authorized", "#0-0(tla-nēci)0+0-0#"],
        }
    );

    return s;
}

module.exports = { run };
