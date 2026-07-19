"use strict";

const path = require("path");
const { createSuite } = require("./runner");
const {
    CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES,
} = require(path.resolve(__dirname, "..", "..", "scripts", "classical_lessons24_25_canvas_catalog.js"));
const {
    buildClassicalLessons2425AuditPlan,
    coverExamplesWithSharedIndex,
    coverExample,
    shapeKey,
    surfaceKey,
} = require(path.resolve(__dirname, "..", "..", "scripts", "audit_classical_lessons24_25_complete_examples.js"));

function jsonClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function buildSource(ctx, stem) {
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
        perfectiveClass: "B",
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "none",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lessons24_25_complete_examples");
    let sharedStemHostileAudit = null;
    const getSharedStemHostileAudit = () => {
        if (sharedStemHostileAudit) return sharedStemHostileAudit;
        const canonicalRow = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.find(example => (
            example.lesson === 24
            && example.section === "24.3.1.a"
            && example.layer === "stem"
            && example.source === "(huā-qui)"
        ));
        const endpointRow = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.find(example => (
            example.lesson === 25
            && example.section === "25.8"
            && example.layer === "stem"
            && example.source === "(huā-qui)"
            && example.result === "tla-(huā-qui-l-tiā)"
        ));
        sharedStemHostileAudit = coverExamplesWithSharedIndex(ctx, [
            canonicalRow,
            { ...canonicalRow, result: "tla-(THIS-IS-NOT-A-CAUSATIVE)" },
            endpointRow,
            { ...endpointRow, result: "tla-(THIS-IS-NOT-A-CAUSATIVE)" },
        ]);
        return sharedStemHostileAudit;
    };

    s.eq(
        "The frozen evidence catalog carries every Lessons 24-25 relation without grammar-authority fields",
        {
            total: CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.length,
            lessons: Object.fromEntries([24, 25].map(lesson => [lesson, CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.filter(row => row.lesson === lesson).length])),
            layers: Object.fromEntries([...new Set(CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.map(row => row.layer))]
                .sort()
                .map(layer => [layer, CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.filter(row => row.layer === layer).length])),
            frozen: Object.isFrozen(CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES)
                && CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.every(Object.isFrozen),
            rowKeys: [...new Set(CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.flatMap(row => Object.keys(row)))].sort(),
            evidenceStatuses: Object.fromEntries([...new Set(CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.map(row => row.evidenceStatus))]
                .sort()
                .map(status => [status, CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.filter(row => row.evidenceStatus === status).length])),
            everyRowHasTypedSource: CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.every(row => row.source.trim()),
        },
        {
            total: 227,
            lessons: { 24: 93, 25: 134 },
            layers: {
                ambiguity: 4,
                coalescence: 4,
                mood: 4,
                negative: 2,
                nonactive: 2,
                perfective: 28,
                stem: 112,
                stock: 2,
                supplementation: 6,
                synonym: 2,
                valence: 11,
                vnc: 41,
                "vnc-reading": 4,
                voice: 5,
            },
            frozen: true,
            rowKeys: ["evidenceStatus", "layer", "lesson", "name", "result", "section", "source"],
            evidenceStatuses: {
                "andrews-implied-exact-source": 1,
                "andrews-presupposed-source": 2,
                "andrews-printed-source": 222,
                "typed-source-reconstruction-from-independent-andrews-evidence": 2,
            },
            everyRowHasTypedSource: true,
        }
    );

    s.eq(
        "The audit does not erase quantity or Canvas boundaries when deciding exact generation",
        {
            exactQuantity: surfaceKey("huā-tz-a") === surfaceKey("hua-tz-a"),
            exactBoundary: surfaceKey("huā-tz-a") === surfaceKey("huā-tza"),
            sameQuantityFreeShape: shapeKey("huā-tz-a") === shapeKey("hua-tza"),
        },
        {
            exactQuantity: false,
            exactBoundary: false,
            sameQuantityFreeShape: true,
        }
    );

    s.eq(
        "The shared audit plan separates target-free generation keys from target-bearing evidence queries",
        (() => {
            const row = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.find(example => (
                example.lesson === 24
                && example.section === "24.8.1"
                && example.layer === "vnc"
            ));
            const plan = buildClassicalLessons2425AuditPlan([
                row,
                { ...row, result: "tiTHISISNOTNAHUATL" },
            ]);
            return {
                rowCount: plan.rowCount,
                uniqueGenerationKeyCount: plan.uniqueGenerationKeyCount,
                sameGenerationKey: plan.rows[0].generationKey === plan.rows[1].generationKey,
                distinctEvidenceQueries: plan.rows[0].queryKey !== plan.rows[1].queryKey,
                expectedTargetsExcluded: plan.expectedTargetsExcludedFromGenerationDescriptors,
                descriptorKeys: Object.keys(plan.rows[0].generationDescriptor).sort(),
                sourceProfileKeys: Object.keys(plan.rows[0].generationDescriptor.typedSourceProfile).sort(),
            };
        })(),
        {
            rowCount: 2,
            uniqueGenerationKeyCount: 1,
            sameGenerationKey: true,
            distinctEvidenceQueries: true,
            expectedTargetsExcluded: true,
            descriptorKeys: ["layer", "typedSourceProfile"],
            sourceProfileKeys: [
                "sourceNonactiveStem",
                "sourceObjectCount",
                "sourceObjectKinds",
                "sourceSpecificObjectPerson",
                "sourceStem",
                "sourceSubject",
                "sourceVoice",
                "verbClass",
            ],
        }
    );

    s.eq(
        "A canonical source generates the witnessed route without receiving the catalog result as input",
        (() => {
            const source = buildSource(ctx, "huā-qui");
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
            return {
                sourceCanonical: ctx.isClassicalNahuatlVncDerivationSourceMachineryFrame(source),
                inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                targetGenerated: inventory.options.some(option => option.targetStem === "huā-tz-a"),
                callerTargetsAllowed: inventory.options.some(option => option.callerSuppliedTargetAllowed !== false),
            };
        })(),
        {
            sourceCanonical: true,
            inventoryCanonical: true,
            targetGenerated: true,
            callerTargetsAllowed: false,
        }
    );

    s.eq(
        "Supplying a Canvas target string cannot select or authorize an operation",
        (() => {
            const source = buildSource(ctx, "huā-qui");
            const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
                derivationType: "causative",
                targetStem: "huā-tz-a",
                targetSubject: "1sg",
            });
            return {
                status: operation.authorizationStatus,
                reason: operation.blockReason,
                selectedOptionId: operation.selectedOptionId,
                targetStem: operation.targetStem,
                canonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
            };
        })(),
        {
            status: "blocked",
            reason: "classical-vnc-derivation-option-selection-required",
            selectedOptionId: "",
            targetStem: "",
            canonical: false,
        }
    );

    s.eq(
        "Forging either a source stem or a generated target invalidates canonical authority",
        (() => {
            const source = buildSource(ctx, "huā-qui");
            const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
            const forgedSource = jsonClone(source);
            forgedSource.stem = "huā-tz-a";
            const forgedSourceInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(forgedSource, { derivationType: "causative" });
            const forgedInventory = jsonClone(inventory);
            forgedInventory.options[0].targetStem = "catalog-forged-causative";
            return {
                originalCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                forgedSourceStatus: forgedSourceInventory.authorizationStatus,
                forgedSourceReason: forgedSourceInventory.blockReason,
                forgedSourceOptionCount: forgedSourceInventory.options.length,
                forgedInventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(forgedInventory),
            };
        })(),
        {
            originalCanonical: true,
            forgedSourceStatus: "blocked",
            forgedSourceReason: "classical-vnc-derivation-base-source-not-canonical",
            forgedSourceOptionCount: 0,
            forgedInventoryCanonical: false,
        }
    );

    s.eq(
        "The five reconstructed sources remain explicit evidence inputs without entering target authority",
        (() => {
            const rows = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES
                .filter(row => row.evidenceStatus !== "andrews-printed-source");
            const plan = buildClassicalLessons2425AuditPlan(rows);
            return {
                targetFreeGenerationDescriptors: plan.expectedTargetsExcludedFromGenerationDescriptors,
                rows: rows.map(row => ({
                    evidenceStatus: row.evidenceStatus,
                    source: row.source,
                    result: row.result,
                })),
            };
        })(),
        {
            targetFreeGenerationDescriptors: true,
            rows: [
                { evidenceStatus: "andrews-implied-exact-source", source: "(chich-ī-ni)", result: "tla-(chich-ī-n-a)" },
                { evidenceStatus: "andrews-presupposed-source", source: "(ciy-ā-hua)", result: "tla-(ciy-ā-hu-a)" },
                { evidenceStatus: "andrews-presupposed-source", source: "(top-ē-hua)", result: "tē-(top-ē-hu-a)" },
                { evidenceStatus: "typed-source-reconstruction-from-independent-andrews-evidence", source: "moitta", result: "nicneittītia" },
                { evidenceStatus: "typed-source-reconstruction-from-independent-andrews-evidence", source: "nicnōtza", result: "tinēchnōtzaltia" },
            ],
        }
    );

    s.eq(
        "A forged Canvas VNC result cannot turn a canonical typed derivation into exact coverage",
        (() => {
            const row = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.find(example => (
                example.lesson === 24
                && example.section === "24.8.1"
                && example.layer === "vnc"
            ));
            const indexed = coverExamplesWithSharedIndex(ctx, [
                row,
                { ...row, result: "tiTHISISNOTNAHUATL" },
            ]);
            const [canonical, forged] = indexed.coverages;
            return {
                canonical: {
                    status: canonical.status,
                    exactEvidenceCompared: canonical.exactEvidenceCompared,
                    generatedSource: canonical.generatedSource,
                    generatedResult: canonical.generatedResult,
                },
                forged: {
                    status: forged.status,
                    reason: forged.reason,
                    generatedSourceWitnessed: (forged.generatedSources || []).includes("tomi"),
                    canonicalResultStillEnumerated: (forged.generatedResults || []).includes("nictoma"),
                    callerResultBecameOutput: (forged.generatedResults || []).includes("tiTHISISNOTNAHUATL"),
                },
                possibilitySetStable: JSON.stringify([...(canonical.enumeratedGeneratedResults || [])].sort())
                    === JSON.stringify([...(forged.generatedResults || [])].sort()),
                sharedIndex: {
                    rows: indexed.index.rowCount,
                    queries: indexed.index.queryCount,
                    uniqueGenerationKeys: indexed.index.uniqueGenerationKeyCount,
                    generationBuilds: indexed.index.byLayer.vnc.generationBuilds,
                    indexedRelationsPresent: indexed.index.indexedRelationCount > 0,
                    duplicateBuilds: indexed.index.generationBuildViolations.length,
                    targetFreeGenerationDescriptors: indexed.index.expectedTargetsExcludedFromGenerationDescriptors,
                    timingRecorded: indexed.index.byLayer.vnc.generationMs >= 0
                        && indexed.index.byLayer.vnc.matchingMs >= 0,
                },
            };
        })(),
        {
            canonical: {
                status: "generated",
                exactEvidenceCompared: true,
                generatedSource: "tomi",
                generatedResult: "nictoma",
            },
            forged: {
                status: "missing",
                reason: "no-independently-enumerated-typed-vnc-source-and-result-match-the-canvas-example",
                generatedSourceWitnessed: true,
                canonicalResultStillEnumerated: true,
                callerResultBecameOutput: false,
            },
            possibilitySetStable: true,
            sharedIndex: {
                rows: 2,
                queries: 2,
                uniqueGenerationKeys: 1,
                generationBuilds: 1,
                indexedRelationsPresent: true,
                duplicateBuilds: 0,
                targetFreeGenerationDescriptors: true,
                timingRecorded: true,
            },
        }
    );

    s.eq(
        "A forged Canvas stem target cannot change the independently enumerated causative relation set",
        (() => {
            const indexed = getSharedStemHostileAudit();
            const [canonical, forged] = indexed.coverages;
            return {
                canonicalStatus: canonical.status,
                canonicalExact: canonical.exactEvidenceCompared,
                forgedStatus: forged.status,
                forgedReason: forged.reason,
                possibilitySetStable: JSON.stringify([...(canonical.enumeratedGeneratedRelations || [])].sort())
                    === JSON.stringify([...(forged.generatedRelations || [])].sort()),
                forgedTargetGenerated: (forged.generatedRelations || []).some(relation => relation.includes("THIS-IS-NOT-A-CAUSATIVE")),
                sharedIndex: {
                    rows: indexed.index.rowCount,
                    queries: indexed.index.queryCount,
                    uniqueGenerationKeys: indexed.index.uniqueGenerationKeyCount,
                    generationBuilds: indexed.index.byLayer.stem.generationBuilds,
                    indexedRelationsPresent: indexed.index.indexedRelationCount > 0,
                    duplicateBuilds: indexed.index.generationBuildViolations.length,
                    targetFreeGenerationDescriptors: indexed.index.expectedTargetsExcludedFromGenerationDescriptors,
                },
            };
        })(),
        {
            canonicalStatus: "generated",
            canonicalExact: true,
            forgedStatus: "missing",
            forgedReason: "no-independently-enumerated-canonical-citation-relation-matches-the-full-canvas-source-and-result",
            possibilitySetStable: true,
            forgedTargetGenerated: false,
            sharedIndex: {
                rows: 4,
                queries: 4,
                uniqueGenerationKeys: 1,
                generationBuilds: 1,
                indexedRelationsPresent: true,
                duplicateBuilds: 0,
                targetFreeGenerationDescriptors: true,
            },
        }
    );

    s.eq(
        "An exact printed endpoint may omit a canonical bridge without letting the printed target select the route",
        (() => {
            const row = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.find(example => (
                example.lesson === 25
                && example.section === "25.8"
                && example.layer === "stem"
                && example.source === "(huā-qui)"
                && example.result === "tla-(huā-qui-l-tiā)"
            ));
            const indexed = getSharedStemHostileAudit();
            const canonical = indexed.coverages[2];
            const forged = indexed.coverages[3];
            return {
                canonicalStatus: canonical.status,
                endpointExact: canonical.exactEndpointEvidenceCompared,
                bridgeRetained: canonical.unprintedCanonicalBridgeRetained,
                printedEndpointRelations: canonical.generatedPrintedEndpointRelations,
                fullRelations: canonical.generatedRelations,
                bridgeStages: canonical.unprintedBridgeStages,
                forgedStatus: forged.status,
                forgedReason: forged.reason,
                possibilitySetStable: JSON.stringify([...(canonical.enumeratedGeneratedRelations || [])].sort())
                    === JSON.stringify([...(forged.generatedRelations || [])].sort()),
                forgedTargetGenerated: (forged.generatedRelations || []).some(relation => relation.includes("THIS-IS-NOT-A-CAUSATIVE")),
            };
        })(),
        {
            canonicalStatus: "generated",
            endpointExact: true,
            bridgeRetained: true,
            printedEndpointRelations: ["(huā-qui) > tla-(huā-qui-l-tiā)"],
            fullRelations: ["(huā-qui) > *(huā-qui-lō) > tla-(huā-qui-l-tiā)"],
            bridgeStages: [["*(huā-qui-lō)"]],
            forgedStatus: "missing",
            forgedReason: "no-independently-enumerated-canonical-citation-relation-matches-the-full-canvas-source-and-result",
            possibilitySetStable: true,
            forgedTargetGenerated: false,
        }
    );

    s.eq(
        "Lesson 25.13 reads its alternative-source quantity from a signed projection that hostile Canvas strings cannot alter",
        (() => {
            const row = CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES.find(example => (
                example.lesson === 25
                && example.section === "25.13"
                && example.layer === "ambiguity"
                && example.source.includes("caquitīa")
            ));
            const canonical = coverExample(ctx, row);
            const forgedSource = coverExample(ctx, {
                ...row,
                source: "THIS-IS-NOT-A-SOURCE | NOR-IS-THIS",
            });
            const forgedResult = coverExample(ctx, {
                ...row,
                result: "THIS-IS-NOT-A-CAUSATIVE",
            });
            return {
                canonicalStatus: canonical.status,
                generatedSources: canonical.generatedSources,
                generatedResults: canonical.generatedResults,
                signedProjectionCount: (canonical.alternativeSourceProjectionSignatures || []).filter(Boolean).length,
                projectionRuleIds: canonical.alternativeSourceProjectionRuleIds,
                forgedSourceStatus: forgedSource.status,
                forgedSourceProjectionStable: JSON.stringify(forgedSource.generatedSources)
                    === JSON.stringify(canonical.generatedSources),
                forgedResultStatus: forgedResult.status,
                forgedResultProjectionStable: JSON.stringify(forgedResult.generatedSources)
                    === JSON.stringify(canonical.generatedSources),
                callerStringsBecameOutput: [
                    ...(forgedSource.generatedSources || []),
                    ...(forgedResult.generatedResults || []),
                ].some(value => value.includes("THIS-IS-NOT")),
            };
        })(),
        {
            canonicalStatus: "generated",
            generatedSources: ["nictēcaquitīa", "nicaquitīlo"],
            generatedResults: ["tinēchtēcaquitīltia", "tinēchtēcaquitīltia"],
            signedProjectionCount: 2,
            projectionRuleIds: [
                "cn-l25-2513-active-alternative-source-caqui-ti-quantity",
                "cn-l25-2513-passive-alternative-source-quantity-identity",
            ],
            forgedSourceStatus: "missing",
            forgedSourceProjectionStable: true,
            forgedResultStatus: "missing",
            forgedResultProjectionStable: true,
            callerStringsBecameOutput: false,
        }
    );

    s.eq(
        "Both explicitly unattested causatives are proved by absence from canonical option inventories",
        (() => {
            const checks = [
                ["pil-i-hui", "pil-o-ā"],
                ["ihc-i-hui", "ihz-o-ā"],
            ].map(([sourceStem, forbiddenTarget]) => {
                const source = buildSource(ctx, sourceStem);
                const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, { derivationType: "causative" });
                return {
                    sourceStem,
                    canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
                    forbiddenGenerated: inventory.options.some(option => shapeKey(option.targetStem) === shapeKey(forbiddenTarget)),
                };
            });
            return checks;
        })(),
        [
            { sourceStem: "pil-i-hui", canonical: true, forbiddenGenerated: false },
            { sourceStem: "ihc-i-hui", canonical: true, forbiddenGenerated: false },
        ]
    );

    return s;
}

module.exports = { run };
