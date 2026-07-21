"use strict";

const { createSuite } = require("./runner");

function captureError(operation) {
    try {
        operation();
        return null;
    } catch (error) {
        return {
            code: error.code || "",
            message: error.message || "",
            details: error.details || null,
        };
    }
}

function buildDefinition(overrides = {}) {
    return {
        contractKind: "test-typed-frame",
        version: 1,
        authorityRole: "provisional",
        producer: "test-engine",
        consumers: ["test-application"],
        validator: (frame) => frame?.payload === "valid",
        description: "A test-only typed frame.",
        requiredCapabilities: ["deriveTestFrame"],
        ...overrides,
    };
}

function buildCapability(overrides = {}) {
    return {
        requirementId: "derive-test-frame",
        capability: "grammar.deriveTestFrame",
        expectedType: "function",
        requiredBy: ["test-application"],
        reason: "The application must derive the registered test frame.",
        ...overrides,
    };
}

function buildGeneratedDerivationContracts(runtimeApi) {
    const application = runtimeApi.createClassicalNahuatlVncApplication(runtimeApi);
    const request = {
        sourceStem: "tomi",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
    const preview = application.evaluate(request);
    const inventory = preview.controlFrame.derivationOptionInventory;
    const selectedOption = inventory.options.find((option) => option.targetStem === "tom-a");
    const generated = application.evaluate({
        ...request,
        derivationOptionId: selectedOption.optionId,
    });
    return {
        inventory,
        operation: generated.resultFrame.derivationOperationFrame,
        derivedMachinery: generated.resultFrame.activeMachineryFrame,
    };
}

function buildGeneratedMultiObjectDerivationContracts(runtimeApi) {
    const application = runtimeApi.createClassicalNahuatlVncApplication(runtimeApi);
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
    const preview = application.evaluate(request);
    const selectedOption = preview.controlFrame.derivationOptionInventory.options
        .find((option) => option.targetStem === "chīhua-l-tiā");
    const generated = application.evaluate({
        ...request,
        derivationOptionId: selectedOption.optionId,
    });
    return {
        operation: generated.resultFrame.derivationOperationFrame,
        derivedMachinery: generated.resultFrame.activeMachineryFrame,
    };
}

function run(ctx = {}) {
    const s = createSuite("grammar_contract_registry");
    const registryApi = ctx;

    s.eq("registry factory is exported", typeof registryApi.createGrammarContractRegistry, "function");
    s.eq("module runtime exposes contract inspection", typeof registryApi.inspectRegisteredGrammarContract, "function");
    s.ok(
        "default registry is a real isolated registry",
        registryApi.isGrammarContractRegistry(registryApi.getDefaultGrammarContractRegistry())
    );
    s.eq(
        "default shared-action contracts are registered in one catalog",
        registryApi.listGrammarContractDefinitions(registryApi.getDefaultGrammarContractRegistry())
            .map((definition) => definition.contractKind),
        [
            "classical-nahuatl-canonical-source-stem-inventory-audit",
            "classical-nahuatl-canonical-source-stem-record",
            "classical-nahuatl-canvas-derivation-choice-frame",
            "classical-nahuatl-lesson24-identical-vowel-coalescence-frame",
            "classical-nahuatl-lesson24-identical-vowel-coalescence-operation-frame",
            "classical-nahuatl-lesson24-identical-vowel-source-morphology-frame",
            "classical-nahuatl-lesson24-root-stock-source-morphology-frame",
            "classical-nahuatl-lesson24-stock-formation-frame",
            "classical-nahuatl-lesson24-synonym-derivation-frame",
            "classical-nahuatl-lesson24-synonym-option",
            "classical-nahuatl-lesson24-synonym-option-inventory",
            "classical-nahuatl-lesson24.2-nonactive-printed-surface-frame",
            "classical-nahuatl-lesson24.2-nonactive-printed-surface-operation-frame",
            "classical-nahuatl-lesson25-13-alternative-source-projection-frame",
            "classical-nahuatl-lesson25-13-source-predicate-quantity-frame",
            "classical-nahuatl-lesson25-mood-transformation-frame",
            "classical-nahuatl-lesson25-retained-source-reflexive-shuntline-rule-frame",
            "classical-nahuatl-lesson25.3-specific-shuntline-realization-rule-frame",
            "classical-nahuatl-lessons24-25-canvas-citation-projection-frame",
            "classical-nahuatl-lessons24-25-canvas-citation-projection-inventory",
            "classical-nahuatl-lessons24-25-canvas-citation-projection-option",
            "classical-nahuatl-lessons24-25-canvas-citation-stage-frame",
            "classical-nahuatl-lessons24-25-canvas-schematic-citation-possibility",
            "classical-nahuatl-lessons24-25-canvas-schematic-citation-possibility-inventory",
            "classical-nahuatl-vnc-application-control-frame",
            "classical-nahuatl-vnc-application-frame",
            "classical-nahuatl-vnc-application-request",
            "classical-nahuatl-vnc-application-result-frame",
            "classical-nahuatl-vnc-application-service",
            "classical-nahuatl-vnc-derivation-operation-batch-frame",
            "classical-nahuatl-vnc-derivation-operation-frame",
            "classical-nahuatl-vnc-derivation-option-inventory",
            "classical-nahuatl-vnc-derivation-source-analysis",
            "classical-nahuatl-vnc-derivation-type-control-inventory-validation-frame",
            "classical-nahuatl-vnc-derivation-type-selection-frame",
            "classical-nahuatl-vnc-derivation-type-vocabulary",
            "classical-nahuatl-vnc-derived-machinery-frame",
            "classical-nahuatl-vnc-exact-nonactive-bridge-frame",
            "classical-nahuatl-vnc-finite-surface-frame",
            "classical-nahuatl-vnc-semantic-control-inventory-validation-frame",
            "classical-nahuatl-vnc-semantic-input-vocabulary",
            "classical-nahuatl-vnc-semantic-selection-frame",
            "classical-nahuatl-vnc-voice-control-inventory-validation-frame",
            "classical-nahuatl-vnc-voice-selection-frame",
            "classical-nahuatl-vnc-voice-vocabulary",
            "classical-result-output-scope-control-inventory-validation-frame",
            "classical-result-output-scope-selection-frame",
            "classical-result-output-scope-vocabulary",
            "generation-source-transitivity-control-inventory-validation-frame",
            "generation-source-transitivity-selection-frame",
            "generation-source-transitivity-vocabulary",
            "ordinary-nnc-noun-class-control-inventory-validation-frame",
            "ordinary-nnc-noun-class-selection-frame",
            "ordinary-nnc-noun-class-vocabulary",
        ]
    );
    s.eq(
        "default catalog declares the application capability consumers",
        registryApi.listGrammarCapabilityRequirements(registryApi.getDefaultGrammarContractRegistry())
            .map((requirement) => [requirement.capability, requirement.requiredBy]),
        [[
            "evaluateClassicalNahuatlVncApplication",
            ["classical-presentation", "classical-verification"],
        ]]
    );

    const registry = registryApi.createGrammarContractRegistry({ registryId: "test-registry" });
    const definition = registryApi.registerGrammarContractDefinition(registry, buildDefinition());
    s.eq("registered definition keeps explicit identity", {
        contractKind: definition.contractKind,
        version: definition.version,
        authorityRole: definition.authorityRole,
        producer: definition.producer,
        consumers: definition.consumers,
        requiredCapabilities: definition.requiredCapabilities,
    }, {
        contractKind: "test-typed-frame",
        version: 1,
        authorityRole: "provisional",
        producer: "test-engine",
        consumers: ["test-application"],
        requiredCapabilities: ["deriveTestFrame"],
    });
    s.ok("registered definitions are immutable", Object.isFrozen(definition) && Object.isFrozen(definition.consumers));
    s.eq("exact definition lookup succeeds", registryApi.getGrammarContractDefinition(registry, "test-typed-frame", 1), definition);
    s.eq("definition inventory is deterministic", registryApi.listGrammarContractDefinitions(registry), [definition]);

    const versionTwo = registryApi.registerGrammarContractDefinition(registry, buildDefinition({
        version: 2,
        validator: (frame) => frame?.payload === "version-two",
    }));
    s.eq("unversioned lookup returns the newest registered version", registryApi.getGrammarContractDefinition(registry, "test-typed-frame"), versionTwo);
    s.eq(
        "duplicate kind and version fails loudly",
        captureError(() => registryApi.registerGrammarContractDefinition(registry, buildDefinition())).code,
        "DUPLICATE_GRAMMAR_CONTRACT_DEFINITION"
    );
    s.eq(
        "definitions require an explicit authority role",
        captureError(() => registryApi.registerGrammarContractDefinition(
            registryApi.createGrammarContractRegistry(),
            buildDefinition({ authorityRole: "" })
        )).code,
        "GRAMMAR_CONTRACT_AUTHORITY_ROLE_REQUIRED"
    );
    s.eq(
        "definitions require an explicit validator",
        captureError(() => registryApi.registerGrammarContractDefinition(
            registryApi.createGrammarContractRegistry(),
            buildDefinition({ validator: null })
        )).code,
        "GRAMMAR_CONTRACT_VALIDATOR_REQUIRED"
    );

    const validFrame = { kind: "test-typed-frame", version: 1, payload: "valid" };
    s.ok("registered frame validates", registryApi.inspectRegisteredGrammarContract(registry, validFrame).ok);
    s.ok("boolean validator helper accepts the frame", registryApi.isRegisteredGrammarContract(registry, validFrame));
    s.eq("assert returns the original typed frame", registryApi.assertRegisteredGrammarContract(registry, validFrame), validFrame);
    s.eq(
        "caller-selected wrong kind cannot pass",
        registryApi.inspectRegisteredGrammarContract(registry, validFrame, { contractKind: "other-frame" }).errors,
        ["unexpected-contract-kind"]
    );
    s.eq(
        "missing frame version fails closed",
        registryApi.inspectRegisteredGrammarContract(registry, { kind: "test-typed-frame", payload: "valid" }).errors,
        ["contract-version-missing-or-invalid"]
    );
    s.eq(
        "caller-selected wrong contract version cannot pass",
        registryApi.inspectRegisteredGrammarContract(registry, validFrame, { version: 2 }).errors,
        ["unexpected-contract-version"]
    );
    s.eq(
        "validator rejection fails closed",
        registryApi.inspectRegisteredGrammarContract(
            registry,
            { kind: "test-typed-frame", version: 1, payload: "caller-poison" }
        ).errors,
        ["contract-validator-rejected-frame"]
    );
    s.eq(
        "unregistered string-only authority fails closed",
        captureError(() => registryApi.assertRegisteredGrammarContract(registry, "test-typed-frame")).code,
        "INVALID_REGISTERED_GRAMMAR_CONTRACT"
    );

    const throwingRegistry = registryApi.createGrammarContractRegistry({
        definitions: [buildDefinition({ validator: () => { throw new Error("poison"); } })],
    });
    s.eq(
        "validator exceptions fail closed without authorizing",
        registryApi.inspectRegisteredGrammarContract(throwingRegistry, validFrame).errors,
        ["contract-validator-threw"]
    );

    const capabilityRegistry = registryApi.createGrammarContractRegistry();
    const requirement = registryApi.registerGrammarCapabilityRequirement(capabilityRegistry, buildCapability());
    s.ok("capability requirement is immutable", Object.isFrozen(requirement) && Object.isFrozen(requirement.requiredBy));
    s.eq("capability lookup succeeds", registryApi.getGrammarCapabilityRequirement(capabilityRegistry, "derive-test-frame"), requirement);
    s.eq("capability inventory is deterministic", registryApi.listGrammarCapabilityRequirements(capabilityRegistry), [requirement]);

    const missingReport = registryApi.inspectGrammarCapabilityRequirements(capabilityRegistry, { grammar: {} });
    s.no("missing required capability does not pass", missingReport.ok);
    s.eq("missing capability is named", missingReport.missing.map((entry) => entry.requirementId), ["derive-test-frame"]);
    const invalidReport = registryApi.inspectGrammarCapabilityRequirements(capabilityRegistry, {
        grammar: { deriveTestFrame: "not-a-function" },
    });
    s.no("wrong capability type does not pass", invalidReport.ok);
    s.eq("wrong capability type is explicit", invalidReport.invalid[0].actualType, "string");
    const capabilitySource = { grammar: { deriveTestFrame: () => validFrame } };
    const satisfiedReport = registryApi.inspectGrammarCapabilityRequirements(capabilityRegistry, capabilitySource);
    s.ok("present correctly typed capability passes", satisfiedReport.ok);
    s.eq("capability assertion returns the original source", registryApi.assertGrammarCapabilityRequirements(capabilityRegistry, capabilitySource), capabilitySource);
    s.eq(
        "capability assertion fails loudly instead of degrading",
        captureError(() => registryApi.assertGrammarCapabilityRequirements(capabilityRegistry, { grammar: {} })).code,
        "UNSATISFIED_GRAMMAR_CAPABILITY_REQUIREMENTS"
    );
    s.eq(
        "capabilities require explicit consumers",
        captureError(() => registryApi.registerGrammarCapabilityRequirement(
            registryApi.createGrammarContractRegistry(),
            buildCapability({ requiredBy: [] })
        )).code,
        "GRAMMAR_CAPABILITY_CONSUMER_REQUIRED"
    );

    const runtimeRegistry = registryApi.getDefaultGrammarContractRegistry();
    s.eq(
        "application and derivation contracts expose canonical live-runtime validators",
        [
            "isClassicalNahuatlVncApplicationResultFrame",
            "isClassicalNahuatlVncApplicationFrame",
            "isClassicalNahuatlVncDerivationOptionInventory",
            "isClassicalNahuatlVncDerivationOperationFrame",
            "isClassicalNahuatlDerivedVncMachineryFrame",
        ].map((validatorName) => [validatorName, typeof registryApi[validatorName]]),
        [
            ["isClassicalNahuatlVncApplicationResultFrame", "function"],
            ["isClassicalNahuatlVncApplicationFrame", "function"],
            ["isClassicalNahuatlVncDerivationOptionInventory", "function"],
            ["isClassicalNahuatlVncDerivationOperationFrame", "function"],
            ["isClassicalNahuatlDerivedVncMachineryFrame", "function"],
        ]
    );
    s.eq(
        "real generated inventory, operation, and derived machinery pass their registered canonical contracts",
        (() => {
            const { inventory, operation, derivedMachinery } = buildGeneratedDerivationContracts(registryApi);
            return [inventory, operation, derivedMachinery].map((frame) => ({
                kind: frame.kind,
                status: frame.authorizationStatus,
                registered: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, frame).ok,
            }));
        })(),
        [
            {
                kind: "classical-nahuatl-vnc-derivation-option-inventory",
                status: "authorized",
                registered: true,
            },
            {
                kind: "classical-nahuatl-vnc-derivation-operation-frame",
                status: "authorized",
                registered: true,
            },
            {
                kind: "classical-nahuatl-vnc-derived-machinery-frame",
                status: "authorized",
                registered: true,
            },
        ]
    );
    s.eq(
        "plausible signature strings and target lies cannot forge authorized derivation contracts",
        (() => {
            const { inventory, operation, derivedMachinery } = buildGeneratedDerivationContracts(registryApi);
            const forgedInventory = {
                ...inventory,
                canonicalSignature: "signed:plausible-inventory",
                options: inventory.options.map((option, index) => index === 0 ? {
                    ...option,
                    targetStem: "LIE",
                    canonicalSignature: "signed:plausible-option",
                } : option),
            };
            const forgedOperation = {
                ...operation,
                targetStem: "LIE",
                canonicalSignature: "signed:plausible-operation",
            };
            const forgedDerivedMachinery = {
                ...derivedMachinery,
                targetStem: "LIE",
                derivationOperationFrame: forgedOperation,
                canonicalSignature: "signed:plausible-derived-machinery",
            };
            return [forgedInventory, forgedOperation, forgedDerivedMachinery].map((frame) => {
                const report = registryApi.inspectRegisteredGrammarContract(runtimeRegistry, frame);
                return {
                    kind: frame.kind,
                    ok: report.ok,
                    canonicalFailure: report.errors.some((error) => error.includes("canonical-validator-required")),
                };
            });
        })(),
        [
            {
                kind: "classical-nahuatl-vnc-derivation-option-inventory",
                ok: false,
                canonicalFailure: true,
            },
            {
                kind: "classical-nahuatl-vnc-derivation-operation-frame",
                ok: false,
                canonicalFailure: true,
            },
            {
                kind: "classical-nahuatl-vnc-derived-machinery-frame",
                ok: false,
                canonicalFailure: true,
            },
        ]
    );
    s.eq(
        "stale signatures cannot hide forged nested selected-option metadata",
        (() => {
            const { operation } = buildGeneratedDerivationContracts(registryApi);
            const inspectMutation = (mutate) => {
                const forged = JSON.parse(JSON.stringify(operation));
                const oldOptionSignature = forged.selectedOption.canonicalSignature;
                const oldOperationSignature = forged.canonicalSignature;
                mutate(forged.selectedOption);
                const report = registryApi.inspectRegisteredGrammarContract(runtimeRegistry, forged);
                return {
                    staleSignaturesPreserved: forged.selectedOption.canonicalSignature === oldOptionSignature
                        && forged.canonicalSignature === oldOperationSignature,
                    canonical: registryApi.isClassicalNahuatlVncDerivationOperationFrame(forged),
                    registered: report.ok,
                    canonicalFailure: report.errors.some((error) => error.includes("canonical-validator-required")),
                };
            };
            return {
                label: inspectMutation((option) => {
                    option.label = "FORGED-LABEL";
                }),
                suffix: inspectMutation((option) => {
                    option.suffix = "FORGED-SUFFIX";
                }),
                exactWitness: inspectMutation((option) => {
                    option.exactWitness = false;
                }),
                authorityFlags: inspectMutation((option) => {
                    option.formulaArtifactAuthority = true;
                    option.surfaceArtifactAuthority = true;
                    option.callerSuppliedTargetAllowed = true;
                }),
            };
        })(),
        {
            label: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
            suffix: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
            exactWitness: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
            authorityFlags: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
        }
    );
    s.eq(
        "duplicate Lesson 23 object identities cannot survive canonical machinery validation",
        (() => {
            const { derivedMachinery } = buildGeneratedMultiObjectDerivationContracts(registryApi);
            const forgedCluster = JSON.parse(JSON.stringify(derivedMachinery.targetObjectClusterFrame));
            forgedCluster.objectRequests[1].objectId = forgedCluster.objectRequests[0].objectId;
            const forgedMachinery = JSON.parse(JSON.stringify(derivedMachinery));
            forgedMachinery.targetObjectClusterFrame.objectRequests[1].objectId =
                forgedMachinery.targetObjectClusterFrame.objectRequests[0].objectId;
            const report = registryApi.inspectRegisteredGrammarContract(runtimeRegistry, forgedMachinery);
            return {
                objectCount: forgedCluster.objectRequests.length,
                duplicateIds: new Set(forgedCluster.objectRequests.map((request) => request.objectId)).size === 1,
                clusterCanonical: registryApi.isClassicalNahuatlLesson23ObjectClusterFrame(
                    forgedCluster,
                    forgedCluster.sourceStem
                ),
                machineryCanonical: registryApi.isClassicalNahuatlDerivedVncMachineryFrame(forgedMachinery),
                registered: report.ok,
                canonicalFailure: report.errors.some((error) => error.includes("canonical-validator-required")),
            };
        })(),
        {
            objectCount: 2,
            duplicateIds: true,
            clusterCanonical: false,
            machineryCanonical: false,
            registered: false,
            canonicalFailure: true,
        }
    );
    s.eq(
        "canonical derivation contracts reject poisoned operation aliases, participant authority, and forged lower typed sources",
        (() => {
            const { operation, derivedMachinery } = buildGeneratedDerivationContracts(registryApi);
            const poisonOperation = (mutate) => {
                const forged = JSON.parse(JSON.stringify(operation));
                mutate(forged);
                return registryApi.isClassicalNahuatlVncDerivationOperationFrame(forged);
            };
            const forgedMachinery = JSON.parse(JSON.stringify(derivedMachinery));
            forgedMachinery.derivationOperationFrame.participantTransformFrame.formulaArtifactAuthority = true;
            forgedMachinery.derivationOperationFrame.participantTransformFrame.targetObjectCount = 999;

            const forgedBase = registryApi.buildClassicalNahuatlLesson7VerbstemClassFrame("xeloa", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
                perfectiveClass: "C",
                requestedSourceValence: "specific-projective",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const forgedBaseClone = JSON.parse(JSON.stringify(forgedBase));
            const typedSource = forgedBaseClone.proofFrame.conclusion.finalTypedVncSlotFrame;
            typedSource.slots.prePredicate[0].carrier = "LIE";
            typedSource.semanticIdentity = [
                typedSource.slots.subject.pers1,
                typedSource.slots.subject.pers2,
                ...typedSource.slots.prePredicate.map((slot) => slot.carrier),
                typedSource.slots.predicate.stem,
                typedSource.slots.predicate.tns,
                typedSource.slots.number.num1,
                typedSource.slots.number.num2,
            ].join("|");
            const forgedBaseInventory = registryApi.getClassicalNahuatlVncDerivationOptionInventory(forgedBaseClone, {
                derivationType: "applicative",
            });
            return {
                participantAuthority: poisonOperation((forged) => {
                    forged.participantTransformFrame.formulaArtifactAuthority = true;
                }),
                participantCount: poisonOperation((forged) => {
                    forged.participantTransformFrame.targetObjectCount = 999;
                }),
                sourceStemAlias: poisonOperation((forged) => {
                    forged.sourceStem = "LIE";
                }),
                sourceTypedAlias: poisonOperation((forged) => {
                    forged.sourceTypedVncSlotFrame.semanticIdentity = "LIE";
                }),
                requestedOptionAlias: poisonOperation((forged) => {
                    forged.requestedOptionId = "LIE";
                }),
                derivedMachinery: registryApi.isClassicalNahuatlDerivedVncMachineryFrame(forgedMachinery),
                forgedBaseInventory: {
                    status: forgedBaseInventory.authorizationStatus,
                    reason: forgedBaseInventory.blockReason,
                    canonical: registryApi.isClassicalNahuatlVncDerivationOptionInventory(forgedBaseInventory),
                },
            };
        })(),
        {
            participantAuthority: false,
            participantCount: false,
            sourceStemAlias: false,
            sourceTypedAlias: false,
            requestedOptionAlias: false,
            derivedMachinery: false,
            forgedBaseInventory: {
                status: "blocked",
                reason: "classical-vnc-derivation-base-source-not-canonical",
                canonical: false,
            },
        }
    );
    s.eq("module runtime returns its canonical default catalog", runtimeRegistry, registryApi.DEFAULT_GRAMMAR_CONTRACT_REGISTRY);
    s.eq("module runtime validates contracts without a DOM", typeof registryApi.inspectRegisteredGrammarContract, "function");
    s.ok("module runtime default catalog remains immutable", Object.isFrozen(runtimeRegistry));
    s.eq(
        "foreign registry-shaped objects are rejected",
        captureError(() => registryApi.listGrammarContractDefinitions({ kind: "grammar-contract-registry" })).code,
        "INVALID_GRAMMAR_CONTRACT_REGISTRY"
    );

    return s;
}

module.exports = { run };
