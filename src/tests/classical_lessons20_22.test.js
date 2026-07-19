"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lessons20_22");
    const root = path.resolve(__dirname, "..", "..");
    const shell = fs.readFileSync(path.join(root, "src", "ui", "shell", "classical_shell.mjs"), "utf8");
    const rendering = fs.readFileSync(path.join(root, "src", "ui", "rendering", "rendering.mjs"), "utf8");
    const vncApplication = fs.readFileSync(
        path.join(root, "src", "application", "classical", "vnc_application.mjs"),
        "utf8"
    );
    const {
        runAudit: runLesson20CanvasAudit,
        runVisualRuleLogicAudit: runLesson20VisualRuleLogicAudit,
        runSupplementAudit: runCrossLessonNonactiveSupplementAudit,
        runAdditionalProductiveAudit: runAdditionalProductiveNonactiveAudit,
        runUnlistedProductiveShapeAudit,
        runNonactiveCandidateLatticeMatrixAudit,
        runLaterActiveToNonactiveEvidenceAudit,
    } = require(path.join(root, "scripts", "audit_classical_lesson20_nonactive_examples.js"));
    const {
        MISSING_RULE_LOGIC_EXAMPLES: lesson21To23MultipleObjectExamples,
        buildExampleFrame: buildLesson21To23CanvasExampleFrame,
        assembleCanvasFormula: assembleLesson21To23CanvasFormula,
    } = require(path.join(root, "scripts", "audit_classical_lessons20_22_canvas_examples.js"));

    s.eq(
        "Every explicit Lesson 20 Canvas source/result inventory is executable rule logic",
        (() => {
            const report = runLesson20CanvasAudit(ctx);
            return {
                status: report.authorizationStatus,
                cases: report.caseCount,
                passed: report.passedCount,
                failures: report.failureCount,
            };
        })(),
        {
            status: "authorized",
            cases: 84,
            passed: 84,
            failures: 0,
        }
    );

    s.eq(
        "Every PDF-corrected Lesson 20 spelling is either productively derived or explicitly exception-authorized",
        (() => {
            const report = runLesson20VisualRuleLogicAudit(ctx);
            return {
                status: report.authorizationStatus,
                cases: report.caseCount,
                productive: report.productiveCaseCount,
                exceptions: report.exceptionCaseCount,
                passed: report.passedCount,
                failures: report.failureCount,
            };
        })(),
        {
            status: "authorized",
            cases: 15,
            productive: 10,
            exceptions: 5,
            passed: 15,
            failures: 0,
        }
    );

    s.eq(
        "Every productive Lesson 20 final-shape branch derives stems absent from the evidence lists",
        (() => {
            const report = runUnlistedProductiveShapeAudit(ctx);
            return {
                status: report.authorizationStatus,
                cases: report.caseCount,
                passed: report.passedCount,
                failures: report.failureCount,
            };
        })(),
        {
            status: "authorized",
            cases: 24,
            passed: 24,
            failures: 0,
        }
    );

    s.eq(
        "The nonactive candidate lattice resolves licensed e-allomorphs and documents every uncovered final-shape cell",
        (() => {
            const report = runNonactiveCandidateLatticeMatrixAudit(ctx);
            const chiye = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("chiye", {
                verbClass: "B",
                sourceValence: "specific-projective",
                sourceIdentityFrame: {
                    enteredStem: "FORGED",
                    exactNonactiveFormations: [{ nonactiveStem: "FORGED-lō" }],
                },
            });
            const piye = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("piye", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const meme = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("mēmē", {
                verbClass: "D",
                sourceValence: "specific-projective",
            });
            const unknownE = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("xele", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const collectedRoutes = ctx.buildClassicalNahuatlLesson20ProductiveCandidateSet("palata", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const piyeRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("piye", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            return {
                matrix: {
                    status: report.authorizationStatus,
                    cells: report.caseCount,
                    passed: report.passedCount,
                    axisFailures: report.axisFailureCount,
                    resolutions: report.axisCoverage.candidateResolutions,
                    finalShapes: report.axisCoverage.finalShapeCategories,
                    classes: report.axisCoverage.verbClasses,
                },
                chiye: {
                    stems: chiye.options.map((option) => option.nonactiveStem),
                    identity: chiye.sourceIdentityFrame.lexicalIdentityId,
                    entered: chiye.sourceIdentityFrame.enteredStem,
                    canonical: chiye.sourceIdentityFrame.canonicalImperfectiveStem,
                    selector: chiye.selectorRequired,
                    resolution: chiye.candidateResolutionStatus,
                    identityCallerAllowed: chiye.sourceIdentityFrame.callerSuppliedIdentityAllowed,
                },
                piye: {
                    stems: piye.options.map((option) => option.nonactiveStem),
                    identity: piye.sourceIdentityFrame.lexicalIdentityId,
                    selector: piye.selectorRequired,
                    resolution: piye.candidateResolutionStatus,
                },
                meme: {
                    status: meme.authorizationStatus,
                    resolution: meme.candidateResolutionStatus,
                    reason: meme.blockReason,
                    identity: meme.sourceIdentityFrame.lexicalIdentityId,
                    license: meme.sourceIdentityFrame.exactNonactiveLicenseStatus,
                },
                unknownE: {
                    status: unknownE.authorizationStatus,
                    reason: unknownE.blockReason,
                    productiveCandidates: unknownE.candidateLattice.productiveCandidateSet.resolvedOptions.length,
                },
                collectedRoutes: collectedRoutes.routeEvaluations.map((route) => ({
                    category: route.decisionCategory,
                    resolution: route.resolution,
                })),
                piyeRecord: {
                    status: piyeRecord.authorizationStatus,
                    stem: piyeRecord.nonactiveStem,
                    identity: piyeRecord.lexicalIdentityId,
                    category: piyeRecord.decisionCategory,
                    typed: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(piyeRecord, "piye"),
                },
            };
        })(),
        {
            matrix: {
                status: "authorized",
                cells: 36,
                passed: 36,
                axisFailures: 0,
                resolutions: ["determinate", "documented-unresolved", "selectable-alternatives"],
                finalShapes: ["C", "a", "e", "i", "o", "ā", "ē", "ī", "ō"],
                classes: ["A", "B", "C", "D"],
            },
            chiye: {
                stems: ["chiye-lō"],
                identity: "chiya-chiye-wait",
                entered: "chiye",
                canonical: "chiya",
                selector: false,
                resolution: "determinate",
                identityCallerAllowed: false,
            },
            piye: {
                stems: ["piye-lō"],
                identity: "piya-piye-guard",
                selector: false,
                resolution: "determinate",
            },
            meme: {
                status: "blocked",
                resolution: "documented-unresolved",
                reason: "lesson20-active-allomorph-nonactive-formation-documented-unresolved",
                identity: "mama-meme-carry-on-back",
                license: "documented-unresolved",
            },
            unknownE: {
                status: "blocked",
                reason: "lesson20-final-e-requires-licensed-active-identity-and-nonactive-witness",
                productiveCandidates: 0,
            },
            collectedRoutes: [
                { category: "transitive-final-ta", resolution: "selected" },
                { category: "general-final-a", resolution: "superseded-by-more-specific-rule" },
            ],
            piyeRecord: {
                status: "authorized",
                stem: "piye-lō",
                identity: "piya-piye-guard",
                category: "licensed-active-allomorph-formation",
                typed: true,
            },
        }
    );

    s.eq(
        "Every later Canvas nonactive witness is an engine-owned optional choice after the Lesson 20 default",
        (() => {
            const report = runCrossLessonNonactiveSupplementAudit(ctx);
            return {
                status: report.authorizationStatus,
                sources: report.caseCount,
                options: report.optionCount,
                passed: report.passedCount,
                failures: report.failureCount,
            };
        })(),
        {
            status: "authorized",
            sources: 40,
            options: 50,
            passed: 40,
            failures: 0,
        }
    );

    s.eq(
        "Later active-to-nonactive evidence preserves direct, higher-order, and ambiguous-family boundaries",
        (() => {
            const report = runLaterActiveToNonactiveEvidenceAudit(ctx);
            return {
                status: report.authorizationStatus,
                cases: report.caseCount,
                direct: report.directCaseCount,
                formations: report.directFormationCount,
                higherOrder: report.higherOrderCaseCount,
                ambiguous: report.ambiguousCaseCount,
                passed: report.passedCount,
                failures: report.failureCount,
            };
        })(),
        {
            status: "authorized",
            cases: 54,
            direct: 44,
            formations: 54,
            higherOrder: 7,
            ambiguous: 3,
            passed: 54,
            failures: 0,
        }
    );

    s.eq(
        "Ordered voice layers derive every higher-order witness and block adjacent-o or forged authority",
        (() => {
            const yohuaInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("yohua", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            const tlaYohuaFirstPass = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("tla-yohua", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            const routeInventory = ctx.getClassicalNahuatlOrderedVoiceLayerOptions("yohua");
            const layer2Cascade = ctx.getClassicalNahuatlOrderedVoiceLayerCascadeOptions(
                "yohua",
                ["inherent-impersonal"]
            );
            const partialTlaCascade = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("yohua", {
                operations: ["inherent-impersonal", "tla-impersonal"],
            });
            const layer3Cascade = ctx.getClassicalNahuatlOrderedVoiceLayerCascadeOptions(
                "yohua",
                partialTlaCascade.operations
            );
            const completeCascade = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("yohua", {
                operations: ["inherent-impersonal", "tla-impersonal", "nonactive-lō"],
            });
            const triple = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("yohua", {
                routeId: "cn-l38-yohua-triply-impersonal",
                targetStem: "TARGET-LIE",
                layers: [{ targetStem: "LAYER-LIE" }],
                formulaArtifact: "#FORMULA-LIE#",
                surfaceArtifact: "SURFACE-LIE",
            });
            const forged = JSON.parse(JSON.stringify(triple));
            forged.layers[1].targetStem = "FORGED";
            const wrongSource = ctx.deriveClassicalNahuatlOrderedVoiceLayerChain("nēci", {
                routeId: "cn-l38-yohua-triply-impersonal",
            });
            const report = runLaterActiveToNonactiveEvidenceAudit(ctx);
            return {
                yohuaOptions: yohuaInventory.options.map((option) => option.nonactiveStem),
                yohuaAutomatic: yohuaInventory.automaticOptionId,
                badAdjacentOAbsent: !JSON.stringify(yohuaInventory).includes("yoō-hua"),
                tlaYohuaFirstPassStatus: tlaYohuaFirstPass.authorizationStatus,
                tlaYohuaFirstPassOptions: tlaYohuaFirstPass.options.length,
                routeIds: routeInventory.options.map((option) => option.routeId),
                layer2Options: layer2Cascade.options.map((option) => `${option.operationId}:${option.targetStem}`),
                partialTlaTarget: partialTlaCascade.targetStem,
                partialTlaComplete: partialTlaCascade.completeRoute,
                partialTlaValid: ctx.isClassicalNahuatlOrderedVoiceLayerChain(partialTlaCascade, "yohua"),
                layer3Options: layer3Cascade.options.map((option) => `${option.operationId}:${option.targetStem}`),
                completeCascadeRoute: completeCascade.routeId,
                completeCascadeTarget: completeCascade.targetStem,
                tripleStatus: triple.authorizationStatus,
                tripleTarget: triple.targetStem,
                tripleLayers: triple.layers.map((layer) => `${layer.sourceStem}>${layer.targetStem}`),
                tripleDepth: triple.impersonalDepth,
                tripleValid: ctx.isClassicalNahuatlOrderedVoiceLayerChain(triple, "yohua"),
                poisonSurvives: JSON.stringify(triple).includes("LIE"),
                forgedValid: ctx.isClassicalNahuatlOrderedVoiceLayerChain(forged, "yohua"),
                wrongSourceStatus: wrongSource.authorizationStatus,
                executableHigherOrderCount: report.higherOrderResults.filter((result) => (
                    result.actual === result.expected
                    && result.layerCount === result.expectedLayerCount
                    && result.passed
                )).length,
            };
        })(),
        {
            yohuaOptions: ["yohua-lō"],
            yohuaAutomatic: "lō:yohua-lō",
            badAdjacentOAbsent: true,
            tlaYohuaFirstPassStatus: "blocked",
            tlaYohuaFirstPassOptions: 0,
            routeIds: [
                "cn-l38-yohua-doubly-impersonal",
                "cn-l38-yohua-triply-impersonal",
            ],
            layer2Options: ["nonactive-lō:yohua-lō", "tla-impersonal:tla-yohua"],
            partialTlaTarget: "tla-yohua",
            partialTlaComplete: false,
            partialTlaValid: true,
            layer3Options: ["nonactive-lō:tla-yohua-lō"],
            completeCascadeRoute: "cn-l38-yohua-triply-impersonal",
            completeCascadeTarget: "tla-yohua-lō",
            tripleStatus: "authorized",
            tripleTarget: "tla-yohua-lō",
            tripleLayers: [
                "yohua>yohua",
                "yohua>tla-yohua",
                "tla-yohua>tla-yohua-lō",
            ],
            tripleDepth: 3,
            tripleValid: true,
            poisonSurvives: false,
            forgedValid: false,
            wrongSourceStatus: "blocked",
            executableHigherOrderCount: 7,
        }
    );

    s.eq(
        "Valence-neutral, root-plus-ya, Class D, and frequentative Canvas rules remain productive",
        (() => {
            const report = runAdditionalProductiveNonactiveAudit(ctx);
            return {
                status: report.authorizationStatus,
                cases: report.caseCount,
                passed: report.passedCount,
                failures: report.failureCount,
            };
        })(),
        {
            status: "authorized",
            cases: 7,
            passed: 7,
            failures: 0,
        }
    );

    s.eq(
        "Lesson 20 models one-to-three-unit macron and hyphen final shapes on both sides of every formation",
        (() => {
            const decomposedClassCStem = "pol-o-a\u0304";
            const classCInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions(decomposedClassCStem, {
                verbClass: "C",
                sourceValence: "projective-nonhuman",
                sourceFinalShapeFrame: {
                    stem: "THIS-CALLER-SHAPE-LIES",
                    orthographicTail: { three: "xyz" },
                },
            });
            const classCOption = classCInventory.options[0];
            const paTiShape = ctx.buildClassicalNahuatlLesson20StemFinalShapeFrame("pa-ti");
            const peWaInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("pewa", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const classCRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord(decomposedClassCStem, {
                verbClass: "C",
                sourceValence: "projective-nonhuman",
            });
            return {
                normalizedSource: classCInventory.sourceStem,
                sourceOrthographicTail: classCInventory.sourceFinalShapeFrame.orthographicTail,
                sourceMorphemeTail: classCInventory.sourceFinalShapeFrame.morphemeTail,
                sourceMacron: classCInventory.sourceFinalShapeFrame.finalLetterHasMacron,
                sourceBoundary: classCInventory.sourceFinalShapeFrame.finalThreeContainsBoundary,
                paTiOrthographicTail: paTiShape.orthographicTail,
                paTiLetterTail: paTiShape.letterTail,
                target: classCOption.nonactiveStem,
                targetMorphemeTail: classCOption.nonactiveFinalShapeFrame.morphemeTail,
                replacement: classCOption.finalShapeRelation.replacementShape,
                relationAuthority: classCOption.finalShapeRelation.shapeAuthority,
                callerShapeAllowed: classCOption.finalShapeRelation.callerSuppliedShapeAllowed,
                peWaFamilyTail: peWaInventory.options[0].nonactiveFinalShapeFrame.morphemeTail.two,
                recordStatus: classCRecord.authorizationStatus,
                recordRelation: classCRecord.finalShapeRelation?.replacementShape,
                recordIsTyped: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(classCRecord, "pol-o-ā"),
                unitLimit: classCInventory.finalShapeUnitLimit,
                preservesMacronAndHyphen: classCInventory.macronAndHyphenPreserved,
            };
        })(),
        {
            normalizedSource: "pol-o-ā",
            sourceOrthographicTail: { one: "ā", two: "-ā", three: "o-ā" },
            sourceMorphemeTail: { one: "ā", two: "o-ā", three: "pol-o-ā" },
            sourceMacron: true,
            sourceBoundary: true,
            paTiOrthographicTail: { one: "i", two: "ti", three: "-ti" },
            paTiLetterTail: { one: "i", two: "ti", three: "ati" },
            target: "pol-ō-lō",
            targetMorphemeTail: { one: "lō", two: "ō-lō", three: "pol-ō-lō" },
            replacement: "o-ā > ō-lō",
            relationAuthority: "computed-from-generated-source-and-target-stems",
            callerShapeAllowed: false,
            peWaFamilyTail: "peō-hua",
            recordStatus: "authorized",
            recordRelation: "o-ā > ō-lō",
            recordIsTyped: true,
            unitLimit: 3,
            preservesMacronAndHyphen: true,
        }
    );

    s.eq(
        "The six nonactive surfaces resolve through three shared formation cores",
        (() => {
            const inventories = {
                "ō": ctx.getClassicalNahuatlLesson20NonactiveStemOptions("āna", {
                    verbClass: "B",
                    sourceValence: "specific-projective",
                }),
                "o-hua": ctx.getClassicalNahuatlLesson20NonactiveStemOptions("miqui", {
                    verbClass: "B",
                    sourceValence: "intransitive",
                }),
                "lō": ctx.getClassicalNahuatlLesson20NonactiveStemOptions("mayāna", {
                    verbClass: "B",
                    sourceValence: "intransitive",
                }),
                "lo-hua": ctx.getClassicalNahuatlLesson20NonactiveStemOptions("ye", {
                    verbClass: "A",
                    sourceValence: "intransitive",
                }),
                "hua": ctx.getClassicalNahuatlLesson20NonactiveStemOptions("cochi", {
                    verbClass: "B",
                    sourceValence: "intransitive",
                }),
                "hua-lō": ctx.getClassicalNahuatlLesson20NonactiveStemOptions("cui", {
                    verbClass: "A",
                    sourceValence: "specific-projective",
                }),
            };
            const structures = Object.fromEntries(Object.entries(inventories).map(([family, inventory]) => {
                const option = inventory.options.find((candidate) => candidate.suffixFamily === family);
                return [family, {
                    core: option?.formationCore,
                    continuation: option?.formationContinuation,
                    sequence: option?.formationSequence,
                    allomorph: option?.formationStructure?.surfaceAllomorph,
                    surfaceIsRealization: option?.surfaceFamilyIsRealization,
                }];
            }));
            const mahui = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const yeRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("ye", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            return {
                structures,
                formationCores: inventories["ō"].formationCores,
                coreAuthority: inventories["ō"].formationCoreAuthority,
                compensatoryAllomorph: mahui.options.find((option) => option.nonactiveStem === "ma-ō-hua")?.formationStructure?.surfaceAllomorph,
                yeRecord: {
                    status: yeRecord.authorizationStatus,
                    family: yeRecord.suffixFamily,
                    core: yeRecord.formationCore,
                    continuation: yeRecord.formationContinuation,
                    sequence: yeRecord.formationSequence,
                    typed: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(yeRecord, "ye"),
                },
                invalidFamilyStatus: ctx.getClassicalNahuatlLesson20NonactiveFormationStructure("lexical-exception").authorizationStatus,
            };
        })(),
        {
            structures: {
                "ō": { core: "o", continuation: "terminal", sequence: ["o"], allomorph: "ō", surfaceIsRealization: true },
                "o-hua": { core: "o", continuation: "hua", sequence: ["o", "hua"], allomorph: "o-hua", surfaceIsRealization: true },
                "lō": { core: "lo", continuation: "terminal", sequence: ["lo"], allomorph: "lō", surfaceIsRealization: true },
                "lo-hua": { core: "lo", continuation: "hua", sequence: ["lo", "hua"], allomorph: "lo-hua", surfaceIsRealization: true },
                "hua": { core: "hua", continuation: "terminal", sequence: ["hua"], allomorph: "hua", surfaceIsRealization: true },
                "hua-lō": { core: "hua", continuation: "lo", sequence: ["hua", "lo"], allomorph: "hua-lō", surfaceIsRealization: true },
            },
            formationCores: ["o", "lo", "hua"],
            coreAuthority: "andrews-three-core-system-with-six-surface-realizations",
            compensatoryAllomorph: "ō-hua",
            yeRecord: {
                status: "authorized",
                family: "lo-hua",
                core: "lo",
                continuation: "hua",
                sequence: ["lo", "hua"],
                typed: true,
            },
            invalidFamilyStatus: "blocked",
        }
    );

    s.eq(
        "Lesson 20 productive shape rules cover unlisted stems and Appendix classes cannot be caller-forged",
        (() => {
            const rootPlusYa = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("nequi-ya", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const finalCui = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("xocui", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const finalTa = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("patata", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const postvocalicTi = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("meloti", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const intransitivePostvocalicTi = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("pa-ti", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const huaRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("cochi", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const oRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("āna", {
                verbClass: "B",
                sourceValence: "specific-projective",
                optionId: "ō:ān-ō",
            });
            const ayi = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("āyi", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            return {
                rootPlusYa: rootPlusYa.options.map((option) => option.nonactiveStem),
                finalCui: finalCui.options.map((option) => option.nonactiveStem),
                finalTa: finalTa.options.map((option) => option.nonactiveStem),
                postvocalicTi: postvocalicTi.options.map((option) => option.nonactiveStem),
                intransitivePostvocalicTi: intransitivePostvocalicTi.options.map((option) => option.nonactiveStem),
                intransitivePostvocalicTiSelector: intransitivePostvocalicTi.selectorRequired,
                huaClass: huaRecord.targetClass,
                oClass: oRecord.targetClass,
                ayiAspectStems: [ayi.imperfectiveNonactiveStem, ayi.perfectiveNonactiveStem],
            };
        })(),
        {
            rootPlusYa: ["nequi-lō"],
            finalCui: ["xoc-ō"],
            finalTa: ["patat-ō"],
            postvocalicTi: ["meloch-ō"],
            intransitivePostvocalicTi: ["pa-tī-hua", "pa-ch-ō"],
            intransitivePostvocalicTiSelector: true,
            huaClass: "A-1",
            oClass: "A-2",
            ayiAspectStems: ["āyī-hua", "āyī-hua"],
        }
    );

    s.eq(
        "Lesson 20 inventory identity and root-plus-ya analysis ignore editorial hyphens without folding vowel quantity",
        (() => {
            const getInventory = (sourceStem, verbClass, sourceValence) => ctx.getClassicalNahuatlLesson20NonactiveStemOptions(sourceStem, {
                verbClass,
                sourceValence,
            });
            const itta = getInventory("itta", "B", "specific-projective");
            const segmentedItta = getInventory("itt-a", "B", "specific-projective");
            const cocoya = getInventory("cocoya", "B", "intransitive");
            const segmentedCocoya = getInventory("coco-ya", "B", "intransitive");
            const quantityChangedCocoya = getInventory("cōcoya", "B", "intransitive");
            const rootPlusYa = getInventory("nequi-ya", "B", "intransitive");
            const unsegmentedRootPlusYa = getInventory("nequiya", "B", "intransitive");
            const huaqui = getInventory("huā-qui", "B", "intransitive");
            const unsegmentedHuaqui = getInventory("huāqui", "B", "intransitive");
            const quantityChangedHuaqui = getInventory("huaqui", "B", "intransitive");
            const genericSegmentedTa = getInventory("palat-a", "B", "specific-projective");
            const ittaRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("itta", {
                verbClass: "B",
                sourceValence: "specific-projective",
                optionId: "ō:itt-ō",
            });
            const segmentedIttaRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("itt-a", {
                verbClass: "B",
                sourceValence: "specific-projective",
                optionId: "ō:itt-ō",
            });
            const optionSignature = (inventory) => inventory.options.map((option) => `${option.ruleId}:${option.nonactiveStem}`);
            const huaquiSupplement = (inventory) => inventory.options.find((option) => option.ruleId === "cn-l25-8-huaqui-lo-base");
            return {
                fixedItta: {
                    solid: optionSignature(itta),
                    segmented: optionSignature(segmentedItta),
                    targetPreserved: segmentedItta.options[0]?.nonactiveStem,
                    doubledBoundaryAbsent: segmentedItta.options.every((option) => !option.nonactiveStem.includes("--")),
                    canonicalRecords: [
                        ctx.isClassicalNahuatlLesson20NonactiveStemRecord(ittaRecord, "itta"),
                        ctx.isClassicalNahuatlLesson20NonactiveStemRecord(segmentedIttaRecord, "itt-a"),
                    ],
                },
                fixedCocoya: {
                    solid: optionSignature(cocoya),
                    segmented: optionSignature(segmentedCocoya),
                    quantityChanged: optionSignature(quantityChangedCocoya),
                    quantityChangedDidNotUseExactRule: quantityChangedCocoya.options.every((option) => option.ruleId !== "cn-l20-2-class-b-root-plus-ya-cocoya"),
                },
                productiveRootPlusYa: {
                    solid: optionSignature(unsegmentedRootPlusYa),
                    segmented: optionSignature(rootPlusYa),
                    solidBoundaryObserved: unsegmentedRootPlusYa.sourceIdentityFrame.internalMorphology.explicitRootPlusYaBoundary,
                    segmentedBoundaryObserved: rootPlusYa.sourceIdentityFrame.internalMorphology.explicitRootPlusYaBoundary,
                    solidAnalysisAuthorized: unsegmentedRootPlusYa.sourceIdentityFrame.internalMorphology.rootPlusYaAnalysisAuthorized,
                    boundaryAuthority: unsegmentedRootPlusYa.sourceIdentityFrame.internalMorphology.rootPlusYaBoundaryAuthority,
                },
                crossLessonHuaqui: {
                    solid: huaquiSupplement(unsegmentedHuaqui)?.nonactiveStem || "",
                    segmented: huaquiSupplement(huaqui)?.nonactiveStem || "",
                    rule: huaquiSupplement(unsegmentedHuaqui)?.ruleId || "",
                    section: huaquiSupplement(unsegmentedHuaqui)?.andrewsSection || "",
                    quantityChangedHasSupplement: Boolean(huaquiSupplement(quantityChangedHuaqui)),
                },
                genericBoundaryJoin: genericSegmentedTa.options.map((option) => option.nonactiveStem),
            };
        })(),
        {
            fixedItta: {
                solid: [
                    "cn-l20-4-itta:itt-ō",
                    "cn-l20-4-itta-lo-variant:itta-lō",
                    "cn-l25-2-itta-hua-base:itt-ī-hua",
                    "cn-l25-4-itta-itztli-route:itz-ti-lō",
                    "cn-l36-5-itta-ithualo-witness:it-hu-a-lō",
                ],
                segmented: [
                    "cn-l20-4-itta:itt-ō",
                    "cn-l20-4-itta-lo-variant:itta-lō",
                    "cn-l25-2-itta-hua-base:itt-ī-hua",
                    "cn-l25-4-itta-itztli-route:itz-ti-lō",
                    "cn-l36-5-itta-ithualo-witness:it-hu-a-lō",
                ],
                targetPreserved: "itt-ō",
                doubledBoundaryAbsent: true,
                canonicalRecords: [true, true],
            },
            fixedCocoya: {
                solid: ["cn-l20-2-class-b-root-plus-ya-cocoya:coco-lō"],
                segmented: ["cn-l20-2-class-b-root-plus-ya-cocoya:coco-lō"],
                quantityChanged: ["cn-l20-2-class-b-root-plus-ya-deletion:cōco-lō"],
                quantityChangedDidNotUseExactRule: true,
            },
            productiveRootPlusYa: {
                solid: ["cn-l20-2-class-b-root-plus-ya-deletion:nequi-lō"],
                segmented: ["cn-l20-2-class-b-root-plus-ya-deletion:nequi-lō"],
                solidBoundaryObserved: false,
                segmentedBoundaryObserved: true,
                solidAnalysisAuthorized: true,
                boundaryAuthority: false,
            },
            crossLessonHuaqui: {
                solid: "huā-qui-lō",
                segmented: "huā-qui-lō",
                rule: "cn-l25-8-huaqui-lo-base",
                section: "25.8",
                quantityChangedHasSupplement: false,
            },
            genericBoundaryJoin: ["palat-ō"],
        }
    );

    s.eq(
        "Lesson 20 records come only from generated rule options and reject typed answers or artifact poison",
        (() => {
            const record = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
                formulaArtifact: "#THIS-FORMULA-LIES#",
                surfaceArtifact: "THIS SURFACE LIES",
            });
            const typedAnswer = ctx.buildClassicalNahuatlLesson20NonactiveStemRecord("mayāna", {
                nonactiveStem: "mayāna-lō",
                suffixFamily: "lō",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const forgedOption = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: "hua:mayāna-lō",
            });
            return {
                status: record.authorizationStatus,
                kind: record.kind,
                source: record.sourceStem,
                target: record.nonactiveStem,
                family: record.suffixFamily,
                targetClass: record.targetClass,
                formulaAuthority: record.formulaArtifactAuthority,
                surfaceAuthority: record.surfaceArtifactAuthority,
                formulaPoisonSurvives: record.nonactiveStem.includes("LIES"),
                typedAnswerStatus: typedAnswer.authorizationStatus,
                typedAnswerReason: typedAnswer.blockReason,
                forgedOptionStatus: forgedOption.authorizationStatus,
                forgedOptionReason: forgedOption.blockReason,
            };
        })(),
        {
            status: "authorized",
            kind: "classical-nahuatl-lesson20-nonactive-stem-record",
            source: "mayāna",
            target: "mayāna-lō",
            family: "lō",
            targetClass: "A-2",
            formulaAuthority: false,
            surfaceAuthority: false,
            formulaPoisonSurvives: false,
            typedAnswerStatus: "blocked",
            typedAnswerReason: "lesson20-user-supplied-derived-stem-not-authorized",
            forgedOptionStatus: "blocked",
            forgedOptionReason: "lesson20-selected-option-was-not-generated",
        }
    );

    s.eq(
        "Lesson 20 attaches raw nonactive evidence after candidate formation and rejects hostile evidence without changing Andrews choices",
        (() => {
            const exact = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("aqui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const segmented = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("a-qui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const quantityMarked = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("cāhua", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const quantityFree = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("cahua", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const exactEvidence = exact.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const segmentedEvidence = segmented.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const quantityMarkedEvidence = quantityMarked.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const quantityFreeEvidence = quantityFree.options.flatMap(option => option.lexicalEvidenceMatches || []);
            const exactRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("aqui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const segmentedRecord = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("a-qui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const callerEvidencePoison = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("aqui", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: exact.options[0].optionId,
                lexicalEvidenceMatches: [{ generationAuthority: true }],
                lexicalEvidenceSignature: "forged",
            });
            const forgedEvidence = {
                ...exactRecord,
                lexicalEvidenceMatches: exactRecord.lexicalEvidenceMatches.map((record, index) => index === 0
                    ? { ...record, grammarAuthority: true }
                    : record),
            };
            const forgedSignature = {
                ...exactRecord,
                lexicalEvidenceSignature: "karttunen-1992:v1:forged",
            };
            const removedEvidence = {
                ...exactRecord,
                lexicalEvidenceMatches: [],
            };
            return {
                exact: {
                    targets: exact.options.map(option => option.nonactiveStem),
                    selectorRequired: exact.selectorRequired,
                    recordId: exactEvidence[0]?.sourceRecordId || "",
                    citation: [exactEvidence[0]?.sourceOriginal || "", exactEvidence[0]?.targetOriginal || ""],
                    provenance: [exactEvidence[0]?.relationExtractionField || "", exactEvidence[0]?.provenanceDisplay || ""],
                    direction: exactEvidence[0]?.directionContract || "",
                    authority: [
                        exactEvidence[0]?.grammarAuthority,
                        exactEvidence[0]?.generationAuthority,
                        exactEvidence[0]?.targetConstructionAuthority,
                        exactEvidence[0]?.formulaAuthority,
                        exactEvidence[0]?.surfaceAuthority,
                    ],
                    recordEvidenceRecomputed: exactRecord.lexicalEvidenceSignature === exact.options[0].lexicalEvidenceSignature
                        && exactRecord.lexicalEvidenceMatches[0]?.sourceRecordId === exactEvidence[0]?.sourceRecordId,
                    canonical: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(exactRecord, "aqui"),
                },
                segmented: {
                    targets: segmented.options.map(option => option.nonactiveStem),
                    sameRule: segmented.options[0]?.ruleId === exact.options[0]?.ruleId,
                    sameEvidenceRecord: segmentedEvidence[0]?.sourceRecordId === exactEvidence[0]?.sourceRecordId,
                    canonical: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(segmentedRecord, "a-qui"),
                },
                quantityPreserved: {
                    markedOptionCount: quantityMarked.options.length,
                    quantityFreeOptionCount: quantityFree.options.length,
                    sameRule: quantityMarked.options[0]?.ruleId === quantityFree.options[0]?.ruleId,
                    sameSelector: quantityMarked.selectorRequired === quantityFree.selectorRequired,
                    markedEvidence: quantityMarkedEvidence.map(record => record.sourceRecordId),
                    quantityFreeEvidenceCount: quantityFreeEvidence.length,
                },
                callerEvidencePoison: {
                    recordId: callerEvidencePoison.lexicalEvidenceMatches[0]?.sourceRecordId || "",
                    signatureRecomputed: callerEvidencePoison.lexicalEvidenceSignature === exactRecord.lexicalEvidenceSignature,
                    canonical: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(callerEvidencePoison, "aqui"),
                },
                hostileCanonical: {
                    evidence: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(forgedEvidence, "aqui"),
                    signature: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(forgedSignature, "aqui"),
                    removed: ctx.isClassicalNahuatlLesson20NonactiveStemRecord(removedEvidence, "aqui"),
                },
            };
        })(),
        {
            exact: {
                targets: ["ac-o-hua"],
                selectorRequired: false,
                recordId: "karttunen-all:000009:n1",
                citation: ["AQU(I)", "ACOHUA"],
                provenance: ["Karttunen", "raw Karttunen column"],
                direction: "TARGET marker SOURCE; inventory stores SOURCE -> TARGET",
                authority: [false, false, false, false, false],
                recordEvidenceRecomputed: true,
                canonical: true,
            },
            segmented: {
                targets: ["a-c-o-hua"],
                sameRule: true,
                sameEvidenceRecord: true,
                canonical: true,
            },
            quantityPreserved: {
                markedOptionCount: 1,
                quantityFreeOptionCount: 1,
                sameRule: true,
                sameSelector: true,
                markedEvidence: ["karttunen-all:000186:n1"],
                quantityFreeEvidenceCount: 0,
            },
            callerEvidencePoison: {
                recordId: "karttunen-all:000009:n1",
                signatureRecomputed: true,
                canonical: true,
            },
            hostileCanonical: {
                evidence: false,
                signature: false,
                removed: false,
            },
        }
    );

    s.eq(
        "Lesson 20 derives deterministic, irregular, and genuinely alternative formations from active analysis",
        (() => {
            const mayana = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const ana = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("āna", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const poloa = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("pol-o-ā", {
                verbClass: "C",
                sourceValence: "projective-nonhuman",
            });
            const yauh = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("ya-uh", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            return {
                mayana: mayana.options.map((option) => option.nonactiveStem),
                mayanaSelector: mayana.selectorRequired,
                ana: ana.options.map((option) => option.nonactiveStem),
                anaSelector: ana.selectorRequired,
                poloa: poloa.options.map((option) => option.nonactiveStem),
                yauh: yauh.options.map((option) => option.nonactiveStem),
                callerMayTypeDerivedStem: mayana.userSuppliedDerivedStemAllowed,
            };
        })(),
        {
            mayana: ["mayāna-lō"],
            mayanaSelector: false,
            ana: ["ān-ō", "āna-lō"],
            anaSelector: true,
            poloa: ["pol-ō-lō"],
            yauh: ["hui-lo-hua"],
            callerMayTypeDerivedStem: false,
        }
    );

    s.eq(
        "Lesson 20 derives shape options without defaulting alternatives and applies determinate exceptions automatically",
        (() => {
            const miqui = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("miqui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const mahui = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const derivedMahui = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const selectedMahuiHypothetical = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mahui", {
                verbClass: "B",
                sourceValence: "intransitive",
                optionId: "o-hua:mahu-o-hua",
            });
            const unlisted = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("xochi", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const zo = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("zō", {
                verbClass: "A",
                sourceValence: "mainline-reflexive",
            });
            const selectedZoVariant = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("zō", {
                verbClass: "A",
                sourceValence: "mainline-reflexive",
                optionId: "lō:zō-lō",
            });
            const ahci = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("ahci", {
                verbClass: "A",
                sourceValence: "intransitive",
            });
            return {
                miqui: miqui.options.map((option) => ({
                    stem: option.nonactiveStem,
                    family: option.suffixFamily,
                    authority: option.formationAuthority,
                    optional: option.optionalForUser,
                })),
                miquiSelector: miqui.selectorRequired,
                mahui: mahui.options.map((option) => ({
                    stem: option.nonactiveStem,
                    family: option.suffixFamily,
                    rule: option.ruleId,
                    authority: option.formationAuthority,
                    section: option.andrewsSection,
                    optional: option.optionalForUser,
                })),
                mahuiSelector: mahui.selectorRequired,
                mahuiSelectionRequired: mahui.selectionRequired,
                mahuiDefaultOptionId: mahui.defaultOptionId,
                mahuiSelectionPolicy: mahui.alternativeSelectionPolicy,
                derivedMahui: {
                    status: derivedMahui.authorizationStatus,
                    stem: derivedMahui.nonactiveStem,
                    reason: derivedMahui.blockReason,
                },
                selectedMahuiHypothetical: {
                    status: selectedMahuiHypothetical.authorizationStatus,
                    stem: selectedMahuiHypothetical.nonactiveStem,
                    authority: selectedMahuiHypothetical.selectedFormationAuthority,
                    optional: selectedMahuiHypothetical.selectedOptionWasUserOptional,
                    reason: selectedMahuiHypothetical.blockReason,
                },
                unlisted: unlisted.options.map((option) => option.nonactiveStem),
                unlistedRuleAuthority: unlisted.options[0]?.formationAuthority,
                zo: zo.options.map((option) => ({
                    stem: option.nonactiveStem,
                    role: option.optionRole,
                    authority: option.formationAuthority,
                    optional: option.optionalForUser,
                })),
                zoSelector: zo.selectorRequired,
                selectedZoVariant: {
                    status: selectedZoVariant.authorizationStatus,
                    stem: selectedZoVariant.nonactiveStem,
                    authority: selectedZoVariant.selectedFormationAuthority,
                    optional: selectedZoVariant.selectedOptionWasUserOptional,
                },
                ahci: ahci.options.map((option) => ({
                    stem: option.nonactiveStem,
                    authority: option.formationAuthority,
                    optional: option.optionalForUser,
                })),
                ahciSelector: ahci.selectorRequired,
                exceptionPolicy: ahci.exceptionSelectionPolicy,
            };
        })(),
        {
            miqui: [{ stem: "mic-o-hua", family: "o-hua", authority: "productive-rule", optional: false }],
            miquiSelector: false,
            mahui: [
                {
                    stem: "ma-ō-hua",
                    family: "o-hua",
                    rule: "cn-l20-5-mahui",
                    authority: "productive-lexical-class-rule",
                    section: "20",
                    optional: true,
                },
                {
                    stem: "mahu-o-hua",
                    family: "o-hua",
                    rule: "cn-l25-3-mahui-hypothetical-nonactive-base",
                    authority: "hypothetical-causative-source",
                    section: "25.3",
                    optional: true,
                },
            ],
            mahuiSelector: true,
            mahuiSelectionRequired: true,
            mahuiDefaultOptionId: "",
            mahuiSelectionPolicy: "explicit-user-choice-required-no-default",
            derivedMahui: {
                status: "blocked",
                stem: "",
                reason: "lesson20-nonactive-option-selection-required",
            },
            selectedMahuiHypothetical: {
                status: "authorized",
                stem: "mahu-o-hua",
                authority: "hypothetical-causative-source",
                optional: true,
                reason: "",
            },
            unlisted: ["xochī-hua"],
            unlistedRuleAuthority: "productive-rule",
            zo: [
                { stem: "zō-hua", role: "user-choice", authority: "productive-rule", optional: true },
                { stem: "zō-lō", role: "user-choice", authority: "optional-variant", optional: true },
            ],
            zoSelector: true,
            selectedZoVariant: {
                status: "authorized",
                stem: "zō-lō",
                authority: "optional-variant",
                optional: true,
            },
            ahci: [{ stem: "ahxī-hua", authority: "obligatory-exception", optional: false }],
            ahciSelector: false,
            exceptionPolicy: "all-canvas-witnessed-alternatives-including-hypothetical-bases-are-user-selectable",
        }
    );

    const voiceAvailabilityRuntimeLoaded = typeof ctx.getClassicalNahuatlVncApplicationAllowedVoices === "function"
        && typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function";
    s.eq(
        "Canvas voice availability follows the completed active analysis and normalizes incompatible requests",
        voiceAvailabilityRuntimeLoaded ? (() => {
            const mayanaInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const anaInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("āna", {
                verbClass: "B",
                sourceValence: "specific-projective",
            });
            const unsupportedInventory = ctx.getClassicalNahuatlLesson20NonactiveStemOptions("xyz", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const normalizedSurface = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                stem: "mayāna",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                valence: "intransitive",
                vncVoice: "passive",
                vncOutputScope: "single",
            });
            return {
                noStem: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "",
                    sourceValence: "intransitive",
                    nonactiveOptionInventory: mayanaInventory,
                }),
                intransitive: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "mayāna",
                    sourceValence: "intransitive",
                    nonactiveOptionInventory: mayanaInventory,
                }),
                specific: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "āna",
                    sourceValence: "specific-projective",
                    nonactiveOptionInventory: anaInventory,
                }),
                unsupported: ctx.getClassicalNahuatlVncApplicationAllowedVoices({
                    sourceStem: "xyz",
                    sourceValence: "intransitive",
                    nonactiveOptionInventory: unsupportedInventory,
                }),
                normalizedRequestedVoice: normalizedSurface.state?.vncVoice,
                normalizedStatus: normalizedSurface.authorizationStatus,
            };
        })() : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: vncApplication.includes("function getClassicalNahuatlVncApplicationAllowedVoices({")
                && vncApplication.includes('"source-stem-required-before-derived-voice"'),
        },
        voiceAvailabilityRuntimeLoaded ? {
            noStem: ["active"],
            intransitive: ["active", "impersonal", "inherent-impersonal", "tla-impersonal"],
            specific: ["active", "passive"],
            unsupported: ["active", "inherent-impersonal", "tla-impersonal"],
            normalizedRequestedVoice: "active",
            normalizedStatus: "authorized",
        } : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: true,
        }
    );

    const buildActive = ({
        stem = "mayāna",
        subject = "3pl",
        valence = "intransitive",
        objectPerson = "2sg",
        verbClass = "B",
    } = {}) => ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence,
        transitivity: valence === "intransitive" ? "intransitive" : "transitive",
        objectKind: valence,
        objectPerson,
    });

    s.eq(
        "Lesson 20 and Appendix A select A-1/A-2 boundary behavior and the correct aspect stem",
        (() => {
            const buildPassive = ({
                stem,
                verbClass = "B",
                objectPerson = "1sg",
                mood = "indicative",
                tense = "present",
                nonactiveOptionId = "",
            }) => {
                const active = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
                    subject: "3sg",
                    mood,
                    tense,
                    verbClass,
                    perfectiveClass: verbClass,
                    valence: "specific-projective",
                    transitivity: "transitive",
                    objectKind: "specific-projective",
                    objectPerson,
                });
                const nonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord(stem, {
                    verbClass,
                    sourceValence: "specific-projective",
                    optionId: nonactiveOptionId,
                });
                return ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
                    voice: "passive",
                    nonactiveStemRecord: nonactive,
                    sourceValence: "specific-projective",
                    sourceSubject: "3sg",
                    sourceObjectPerson: objectPerson,
                    mood,
                    tense,
                    verbClass,
                });
            };
            const ihcaliPresent = buildPassive({
                stem: "ihcali",
                nonactiveOptionId: "hua:ihcalī-hua",
            });
            const pohuaPresent = buildPassive({ stem: "pōhu-a" });
            const pohuaFuture = buildPassive({ stem: "pōhu-a", tense: "future" });
            const pohuaPreterit = buildPassive({ stem: "pōhu-a", tense: "preterit" });
            const anaPresent = buildPassive({ stem: "āna", nonactiveOptionId: "ō:ān-ō" });
            const anaFuture = buildPassive({
                stem: "āna",
                tense: "future",
                nonactiveOptionId: "ō:ān-ō",
            });
            const ayiPreterit = buildPassive({ stem: "āyi", objectPerson: "3sg", tense: "preterit" });
            const chihuaPreterit = buildPassive({ stem: "chihua", tense: "preterit" });
            return {
                ihcaliPresent: [ihcaliPresent.nonactiveTargetClass, ihcaliPresent.selectedNonactiveAspect, ihcaliPresent.formulaRealization],
                pohuaPresent: [pohuaPresent.nonactiveTargetClass, pohuaPresent.formulaRealization],
                pohuaFuture: [pohuaFuture.nonactiveTargetClass, pohuaFuture.formulaRealization],
                pohuaPreterit: [pohuaPreterit.selectedNonactiveAspect, pohuaPreterit.formulaRealization],
                anaPresent: [anaPresent.nonactiveTargetClass, anaPresent.formulaRealization],
                anaFuture: [anaFuture.nonactiveTargetClass, anaFuture.formulaRealization],
                ayiPreterit: [ayiPreterit.stem, ayiPreterit.selectedNonactiveAspect, ayiPreterit.formulaRealization],
                chihuaPreterit: [chihuaPreterit.stem, chihuaPreterit.selectedNonactiveAspect, chihuaPreterit.formulaRealization],
            };
        })(),
        {
            ihcaliPresent: ["A-1", "imperfective", "#n-0(ihcalī-hua)0+0-0#"],
            pohuaPresent: ["A-2", "#ni-0(pōhu-a-lo)0+0-0#"],
            pohuaFuture: ["A-2", "#ni-0(pōhu-a-lō)z+⎕-0#"],
            pohuaPreterit: ["perfective", "#ni-0(pōhu-a-lō)0+c-0#"],
            anaPresent: ["A-2", "#n-0(ān-o)0+0-0#"],
            anaFuture: ["A-2", "#n-0(ān-ō)z+⎕-0#"],
            ayiPreterit: ["āyī-hua", "perfective", "#0-0(āyī-hua)0+c-0#"],
            chihuaPreterit: ["chīhua-lō", "perfective", "#ni-0(chīhua-lō)0+c-0#"],
        }
    );

    s.eq(
        "Lesson 21 passive consumes a typed active VNC and promotes its one specific object",
        (() => {
            const active = buildActive({
                stem: "chihua",
                subject: "2pl",
                valence: "specific-projective",
                objectPerson: "1sg",
                verbClass: "A",
            });
            const nonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("chihua", {
                verbClass: "A",
                sourceValence: "specific-projective",
            });
            const passive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
                voice: "passive",
                nonactiveStemRecord: nonactive,
                sourceValence: "specific-projective",
                sourceSubject: "2pl",
                sourceObjectPerson: "1sg",
                mood: "indicative",
                tense: "present",
            });
            const voiceFrame = passive.voiceTransformationFrame || {};
            return {
                sourceStatus: active.proofFrame.authorizationStatus,
                status: passive.proofFrame.authorizationStatus,
                voice: passive.voice,
                sourceStem: voiceFrame.sourceStem,
                targetStem: voiceFrame.targetStem,
                sourceSubject: voiceFrame.sourceSubject,
                sourceSubjectDeleted: voiceFrame.sourceSubjectDeleted,
                sourceValence: voiceFrame.sourceValence,
                targetValence: voiceFrame.targetValence,
                targetSubject: voiceFrame.targetSubject,
                promoted: voiceFrame.promotedObjectBecomesSubject,
                agentExpressible: voiceFrame.agentExpressible,
                formula: passive.formulaRealization,
                formulaHasActiveSubject: passive.formulaRealization.includes("an-0"),
                formulaHasObjectDyad: /\+(?:n-ēch|n-ech)/u.test(passive.formulaRealization),
            };
        })(),
        {
            sourceStatus: "authorized",
            status: "authorized",
            voice: "passive",
            sourceStem: "chihua",
            targetStem: "chīhua-lō",
            sourceSubject: "2pl",
            sourceSubjectDeleted: true,
            sourceValence: "specific-projective",
            targetValence: "intransitive",
            targetSubject: "1sg",
            promoted: true,
            agentExpressible: false,
            formula: "#ni-0(chīhua-lo)0+0-0#",
            formulaHasActiveSubject: false,
            formulaHasObjectDyad: false,
        }
    );

    s.eq(
        "Lesson 22 impersonal is complementary to passive and imports a referentially empty third-singular subject",
        (() => {
            const nonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const intransitive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(buildActive(), {
                voice: "impersonal",
                nonactiveStemRecord: nonactive,
                sourceValence: "intransitive",
                sourceSubject: "3pl",
                mood: "indicative",
                tense: "present",
            });
            const nonspecific = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(buildActive({
                valence: "projective-human",
            }), {
                voice: "impersonal",
                nonactiveStemRecord: nonactive,
                sourceValence: "projective-human",
                sourceSubject: "3pl",
                mood: "indicative",
                tense: "present",
            });
            return {
                intransitiveStatus: intransitive.proofFrame.authorizationStatus,
                intransitiveSubject: intransitive.voiceTransformationFrame?.targetSubject,
                impersonalReferent: intransitive.voiceTransformationFrame?.impersonalSubjectReferent,
                subjectImported: intransitive.voiceTransformationFrame?.impersonalSubjectImportedFromOutsideSource,
                sourceSubjectDeleted: intransitive.voiceTransformationFrame?.sourceSubjectDeleted,
                intransitiveFormula: intransitive.formulaRealization,
                nonspecificStatus: nonspecific.proofFrame.authorizationStatus,
                nonspecificTargetValence: nonspecific.voiceTransformationFrame?.targetValence,
                nonspecificFormula: nonspecific.formulaRealization,
                nonspecificObjectPreserved: /\+te\(/u.test(nonspecific.formulaRealization),
            };
        })(),
        {
            intransitiveStatus: "authorized",
            intransitiveSubject: "3sg",
            impersonalReferent: "none",
            subjectImported: true,
            sourceSubjectDeleted: true,
            intransitiveFormula: "#0-0(mayāna-lo)0+0-0#",
            nonspecificStatus: "authorized",
            nonspecificTargetValence: "projective-human",
            nonspecificFormula: "#0-0+te(mayāna-lo)0+0-0#",
            nonspecificObjectPreserved: true,
        }
    );

    s.eq(
        "Lessons 21 and 22 fail closed on each other's source gates and on a string-only nonactive claim",
        (() => {
            const record = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mayāna", {
                verbClass: "B",
                sourceValence: "intransitive",
            });
            const passiveIntransitive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(buildActive(), {
                voice: "passive",
                nonactiveStemRecord: record,
                sourceValence: "intransitive",
                sourceSubject: "3pl",
            });
            const impersonalSpecific = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(buildActive({
                valence: "specific-projective",
            }), {
                voice: "impersonal",
                nonactiveStemRecord: record,
                sourceValence: "specific-projective",
                sourceSubject: "3pl",
                sourceObjectPerson: "2sg",
            });
            const fakeRecord = {
                kind: "classical-nahuatl-lesson20-nonactive-stem-record",
                authorizationStatus: "authorized",
                sourceStem: "mayāna",
                nonactiveStem: "FORMULA-LIE",
                selectionAuthority: "string-only",
                formulaArtifactAuthority: true,
                surfaceArtifactAuthority: true,
            };
            const stringOnly = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(buildActive(), {
                voice: "impersonal",
                nonactiveStemRecord: fakeRecord,
                sourceValence: "intransitive",
                sourceSubject: "3pl",
            });
            return {
                passiveStatus: passiveIntransitive.proofFrame.authorizationStatus,
                passiveReason: passiveIntransitive.blockReason,
                impersonalStatus: impersonalSpecific.proofFrame.authorizationStatus,
                impersonalReason: impersonalSpecific.blockReason,
                stringOnlyStatus: stringOnly.proofFrame.authorizationStatus,
                stringOnlyReason: stringOnly.blockReason,
                stringLieSurvives: String(stringOnly.formulaRealization || "").includes("LIE"),
            };
        })(),
        {
            passiveStatus: "blocked",
            passiveReason: "lesson21-passive-requires-specific-projective-or-reflexive-object",
            impersonalStatus: "blocked",
            impersonalReason: "lesson22-impersonal-blocks-specific-projective-object-source",
            stringOnlyStatus: "blocked",
            stringOnlyReason: "lesson20-authorized-typed-nonactive-stem-record-required",
            stringLieSurvives: false,
        }
    );

    s.eq(
        "Reflexive sources retain typed ne while passive and impersonal choose different subjects",
        (() => {
            const active = buildActive({
                stem: "zahua",
                subject: "1sg",
                valence: "mainline-reflexive",
                verbClass: "A",
            });
            const nonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("zahua", {
                verbClass: "A",
                sourceValence: "mainline-reflexive",
            });
            const passive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
                voice: "passive",
                nonactiveStemRecord: nonactive,
                sourceValence: "mainline-reflexive",
                sourceSubject: "1sg",
            });
            const impersonal = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
                voice: "impersonal",
                nonactiveStemRecord: nonactive,
                sourceValence: "mainline-reflexive",
                sourceSubject: "1sg",
            });
            return {
                passiveStatus: passive.authorizationStatus,
                passiveSubject: passive.subject,
                passiveValence: passive.valence,
                passiveFormula: passive.formulaRealization,
                impersonalStatus: impersonal.authorizationStatus,
                impersonalSubject: impersonal.subject,
                impersonalValence: impersonal.valence,
                impersonalFormula: impersonal.formulaRealization,
            };
        })(),
        {
            passiveStatus: "authorized",
            passiveSubject: "1sg",
            passiveValence: "shuntline-reflexive",
            passiveFormula: "#ni-0+ne(zahua-lo)0+0-0#",
            impersonalStatus: "authorized",
            impersonalSubject: "3sg",
            impersonalValence: "shuntline-reflexive",
            impersonalFormula: "#0-0+ne(zahua-lo)0+0-0#",
        }
    );

    s.eq(
        "Lesson 22 distinguishes inherent and exact tla-impersonal lexical routes",
        (() => {
            const inherentSource = buildActive({ stem: "yohua", subject: "1sg", valence: "intransitive", verbClass: "A" });
            const inherentRecord = ctx.buildClassicalNahuatlLesson22InherentImpersonalRecord("yohua", {
                selectionAuthority: "user-supplied-lexical-analysis",
                formulaArtifact: "#LIE#",
            });
            const inherent = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(inherentSource, {
                voice: "inherent-impersonal",
                inherentImpersonalRecord: inherentRecord,
                sourceValence: "intransitive",
                sourceSubject: "1sg",
                verbClass: "A",
            });
            const tlaSource = buildActive({ stem: "nēci", subject: "2pl", valence: "intransitive", verbClass: "B" });
            const tlaRecord = ctx.buildClassicalNahuatlLesson22TlaImpersonalStemRecord("nēci", {
                impersonalStem: "tla-nēci",
                selectionAuthority: "user-supplied-lexical-analysis",
                surfaceArtifact: "LIE",
            });
            const tla = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(tlaSource, {
                voice: "tla-impersonal",
                tlaImpersonalStemRecord: tlaRecord,
                sourceValence: "intransitive",
                sourceSubject: "2pl",
                verbClass: "B",
            });
            const fakeTla = ctx.buildClassicalNahuatlLesson22TlaImpersonalStemRecord("nēci", {
                impersonalStem: "nēci",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            return {
                inherentRecordStatus: inherentRecord.authorizationStatus,
                inherentStatus: inherent.authorizationStatus,
                inherentSubject: inherent.subject,
                inherentStem: inherent.stem,
                inherentFormula: inherent.formulaRealization,
                tlaRecordStatus: tlaRecord.authorizationStatus,
                tlaStatus: tla.authorizationStatus,
                tlaSubject: tla.subject,
                tlaStem: tla.stem,
                tlaFormula: tla.formulaRealization,
                fakeTlaStatus: fakeTla.authorizationStatus,
                fakeTlaReason: fakeTla.blockReason,
                stringPoisonSurvives: `${inherent.formulaRealization}${tla.formulaRealization}`.includes("LIE"),
            };
        })(),
        {
            inherentRecordStatus: "authorized",
            inherentStatus: "authorized",
            inherentSubject: "3sg",
            inherentStem: "yohua",
            inherentFormula: "#0-0(yohua)0+0-0#",
            tlaRecordStatus: "authorized",
            tlaStatus: "authorized",
            tlaSubject: "3sg",
            tlaStem: "tla-nēci",
            tlaFormula: "#0-0(tla-nēci)0+0-0#",
            fakeTlaStatus: "blocked",
            fakeTlaReason: "lesson22-tla-impersonal-stem-must-differ-from-source",
            stringPoisonSurvives: false,
        }
    );

    s.eq(
        "Canvas formula rules preserve second-plural, silent-object, and irregular source environments",
        (() => {
            const activeAn = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("āna", {
                subject: "2pl",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "1sg",
            });
            const silentObject = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("āyi", {
                subject: "3pl",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
                perfectiveClass: "B",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                silentSpecificObject: true,
            });
            const beSource = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("ye", {
                subject: "1pl",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
            });
            const beImpersonal = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(beSource, {
                voice: "impersonal",
                nonactiveStemRecord: ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("ye", {
                    verbClass: "A",
                    sourceValence: "intransitive",
                }),
                sourceValence: "intransitive",
                sourceSubject: "1pl",
                mood: "indicative",
                tense: "present",
            });
            const comeSource = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("hui-tz", {
                subject: "2pl",
                mood: "indicative",
                tense: "general-past",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "intransitive",
                transitivity: "intransitive",
            });
            const comeImpersonal = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(comeSource, {
                voice: "impersonal",
                nonactiveStemRecord: ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("hui-tz", {
                    verbClass: "A",
                    sourceValence: "intransitive",
                }),
                sourceValence: "intransitive",
                sourceSubject: "2pl",
                mood: "indicative",
                tense: "general-past",
            });
            return {
                secondPluralBeforeNech: activeAn.formulaRealization,
                silentThirdObject: silentObject.formulaRealization,
                beImpersonal: beImpersonal.formulaRealization,
                comeImpersonal: comeImpersonal.formulaRealization,
            };
        })(),
        {
            secondPluralBeforeNech: "#an-0+n-ech(āna)z+qu-eh#",
            silentThirdObject: "#0-0+⎕-0(āx)0+qu-eh#",
            beImpersonal: "#0-0(ye-lo-hua)0+c-0#",
            comeImpersonal: "#0-0(huī-lo-hua-tz)a+0-0#",
        }
    );

    s.eq(
        "All fourteen formerly missing co-occurring-object formulas execute through typed Lesson 23 clusters",
        (() => {
            const results = lesson21To23MultipleObjectExamples.map((example) => {
                const frame = buildLesson21To23CanvasExampleFrame(ctx, example);
                return {
                    id: example.id,
                    status: frame.authorizationStatus,
                    formula: assembleLesson21To23CanvasFormula(frame),
                    expected: example.expectedFormula,
                    sourceClusterKind: frame.sourceObjectClusterFrame?.kind
                        || frame.multipleObjectClusterFrame?.kind
                        || "",
                    formulaAuthority: frame.sourceObjectClusterFrame?.formulaArtifactAuthority
                        ?? frame.multipleObjectClusterFrame?.formulaArtifactAuthority,
                };
            });
            return {
                count: results.length,
                exact: results.filter((result) => result.formula === result.expected).length,
                authorized: results.filter((result) => result.status === "authorized").length,
                typed: results.filter((result) => result.sourceClusterKind === "classical-nahuatl-lesson23-object-cluster-frame").length,
                formulaArtifactsAuthorize: results.some((result) => result.formulaAuthority !== false),
            };
        })(),
        {
            count: 14,
            exact: 14,
            authorized: 14,
            typed: 14,
            formulaArtifactsAuthorize: false,
        }
    );

    s.eq(
        "Lesson 23 ignores carrier and formula poison while forged object clusters fail closed",
        (() => {
            const lower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("maca", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const typed = ctx.buildClassicalNahuatlLesson23MultipleObjectVncFrame(lower, {
                formulaArtifact: "#FORMULA-LIE#",
                surfaceArtifact: "SURFACE-LIE",
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1, carrier: "CARRIER-LIE" },
                    { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2, carrier: "CARRIER-LIE" },
                ],
            });
            const forgedCluster = JSON.parse(JSON.stringify(typed.multipleObjectClusterFrame));
            forgedCluster.positions[0].carrier = "CARRIER-LIE";
            forgedCluster.positions[0].va1 = "CARRIER-LIE";
            const duplicateIdCluster = JSON.parse(JSON.stringify(typed.multipleObjectClusterFrame));
            duplicateIdCluster.objectRequests[1].objectId = duplicateIdCluster.objectRequests[0].objectId;
            const forgedTransform = ctx.buildClassicalNahuatlLesson23VoiceObjectClusterFrame(forgedCluster, {
                voice: "passive",
                tense: "future",
            });
            const forgedApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lower, forgedCluster);
            const duplicateIdApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lower, duplicateIdCluster);
            const forgedPassive = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(typed, {
                voice: "passive",
                sourceObjectClusterFrame: forgedCluster,
                nonactiveStemRecord: ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("maca", {
                    verbClass: "A",
                    sourceValence: "specific-projective",
                    optionId: "ō:mac-ō",
                }),
                sourceValence: "multiple-object",
                sourceSubject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
            });
            return {
                typedStatus: typed.authorizationStatus,
                typedFormula: typed.formulaRealization,
                typedCarriers: typed.multipleObjectClusterFrame.linearCarriers,
                formulaArtifactAuthority: typed.multipleObjectClusterFrame.formulaArtifactAuthority,
                surfaceArtifactAuthority: typed.multipleObjectClusterFrame.surfaceArtifactAuthority,
                poisonSurvives: JSON.stringify(typed).includes("CARRIER-LIE")
                    || typed.formulaRealization.includes("LIE"),
                forgedTransformStatus: forgedTransform.authorizationStatus,
                forgedTransformReason: forgedTransform.blockReason,
                forgedApplyAccepted: forgedApply?.authorizationStatus === "authorized",
                duplicateIdApplyAccepted: duplicateIdApply?.authorizationStatus === "authorized",
                forgedPassiveStatus: forgedPassive.authorizationStatus,
                forgedPassiveHasLie: JSON.stringify(forgedPassive).includes("CARRIER-LIE"),
            };
        })(),
        {
            typedStatus: "authorized",
            typedFormula: "#0-0+qui-0+te(maca)z+⎕-0#",
            typedCarriers: ["qui-0", "te"],
            formulaArtifactAuthority: false,
            surfaceArtifactAuthority: false,
            poisonSurvives: false,
            forgedTransformStatus: "blocked",
            forgedTransformReason: "lesson23-authorized-source-object-cluster-required",
            forgedApplyAccepted: false,
            duplicateIdApplyAccepted: false,
            forgedPassiveStatus: "blocked",
            forgedPassiveHasLie: false,
        }
    );

    s.eq(
        "Lesson 23 voice clusters reject canonical cross-source mixing while direct clusters still apply",
        (() => {
            const buildLower = (objectPerson) => ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("maca", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson,
            });
            const humanLower = buildLower("3sg");
            const humanSource = ctx.buildClassicalNahuatlLesson23MultipleObjectVncFrame(humanLower, {
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-human", objectKind: "nonspecific-human", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const nonhumanSource = ctx.buildClassicalNahuatlLesson23MultipleObjectVncFrame(buildLower("2sg"), {
                objectRequests: [
                    { objectId: "direct-specific", objectKind: "specific-projective", objectPerson: "2sg", governor: "directive", derivationalLevel: 1 },
                    { objectId: "applied-nonhuman", objectKind: "nonspecific-nonhuman", governor: "applicative", derivationalLevel: 2 },
                ],
            });
            const macaNonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("maca", {
                verbClass: "A",
                sourceValence: "specific-projective",
                optionId: "ō:mac-ō",
            });
            const anaNonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("āna", {
                verbClass: "A",
                sourceValence: "specific-projective",
                optionId: "ō:ān-ō",
            });
            const directVoice = ctx.buildClassicalNahuatlLesson23VoiceObjectClusterFrame(humanSource.multipleObjectClusterFrame, {
                voice: "passive",
                tense: "future",
                sourceMachineryFrame: humanSource,
                nonactiveStemRecord: macaNonactive,
            });
            const mixedVoice = ctx.buildClassicalNahuatlLesson23VoiceObjectClusterFrame(humanSource.multipleObjectClusterFrame, {
                voice: "passive",
                tense: "future",
                sourceMachineryFrame: nonhumanSource,
                nonactiveStemRecord: macaNonactive,
            });
            const mixedRecordVoice = ctx.buildClassicalNahuatlLesson23VoiceObjectClusterFrame(humanSource.multipleObjectClusterFrame, {
                voice: "passive",
                tense: "future",
                sourceMachineryFrame: humanSource,
                nonactiveStemRecord: anaNonactive,
            });
            const mixedDerived = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(nonhumanSource, {
                voice: "passive",
                sourceObjectClusterFrame: humanSource.multipleObjectClusterFrame,
                nonactiveStemRecord: macaNonactive,
                sourceValence: "multiple-object",
                sourceSubject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
            });
            const directCluster = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(humanLower, humanSource.multipleObjectClusterFrame);
            const licensedTargetLower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mac-o", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const unrelatedTargetLower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("nemi", {
                subject: "3sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const licensedVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(licensedTargetLower, directVoice);
            const unrelatedVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(unrelatedTargetLower, directVoice);
            const wrongSubjectLower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mac-o", {
                subject: "1sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const wrongTenseLower = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mac-o", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                perfectiveClass: "A",
                valence: "projective-human",
                transitivity: "transitive",
                objectKind: "nonspecific-human",
            });
            const wrongSubjectVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(wrongSubjectLower, directVoice);
            const wrongTenseVoiceApply = ctx.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(wrongTenseLower, directVoice);
            return {
                humanSourceStatus: humanSource.authorizationStatus,
                nonhumanSourceStatus: nonhumanSource.authorizationStatus,
                directVoiceStatus: directVoice.authorizationStatus,
                mixedVoiceStatus: mixedVoice.authorizationStatus,
                mixedVoiceReason: mixedVoice.blockReason,
                mixedRecordStatus: mixedRecordVoice.authorizationStatus,
                mixedRecordReason: mixedRecordVoice.blockReason,
                mixedDerivedStatus: mixedDerived.authorizationStatus,
                mixedDerivedReason: mixedDerived.blockReason,
                directClusterStatus: directCluster?.authorizationStatus || "blocked",
                licensedVoiceApplyStatus: licensedVoiceApply?.authorizationStatus || "blocked",
                unrelatedVoiceApplyAccepted: unrelatedVoiceApply?.authorizationStatus === "authorized",
                wrongSubjectVoiceApplyAccepted: wrongSubjectVoiceApply?.authorizationStatus === "authorized",
                wrongTenseVoiceApplyAccepted: wrongTenseVoiceApply?.authorizationStatus === "authorized",
            };
        })(),
        {
            humanSourceStatus: "authorized",
            nonhumanSourceStatus: "authorized",
            directVoiceStatus: "authorized",
            mixedVoiceStatus: "blocked",
            mixedVoiceReason: "lesson23-validated-source-machinery-context-required",
            mixedRecordStatus: "blocked",
            mixedRecordReason: "lesson20-authorized-source-nonactive-record-context-required",
            mixedDerivedStatus: "blocked",
            mixedDerivedReason: "lesson23-validated-source-machinery-context-required",
            directClusterStatus: "authorized",
            licensedVoiceApplyStatus: "authorized",
            unrelatedVoiceApplyAccepted: false,
            wrongSubjectVoiceApplyAccepted: false,
            wrongTenseVoiceApplyAccepted: false,
        }
    );

    const surfaceRuntimeLoaded = typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function";
    s.eq(
        "Classical surface pipeline consumes the Lesson 20-22 controls instead of static examples",
        surfaceRuntimeLoaded ? (() => {
            const passive = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                stem: "chihua",
                subject: "2pl",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
                valence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "1sg",
                vncVoice: "passive",
                nonactiveStem: "THIS-CALLER-ANSWER-MUST-NOT-SURVIVE",
                vncOutputScope: "single",
            });
            const tla = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                stem: "nēci",
                subject: "2pl",
                mood: "indicative",
                tense: "present",
                verbClass: "B",
                valence: "intransitive",
                vncVoice: "tla-impersonal",
                nonactiveStem: "THIS-CALLER-ANSWER-MUST-NOT-SURVIVE",
                vncOutputScope: "single",
            });
            return {
                passiveStatus: passive.authorizationStatus,
                passiveVoice: passive.machineryFrame?.voice,
                passiveFormula: passive.selectedFormula,
                passiveTargetSubject: passive.machineryFrame?.voiceTransformationFrame?.targetSubject,
                tlaStatus: tla.authorizationStatus,
                tlaVoice: tla.machineryFrame?.voice,
                tlaFormula: tla.selectedFormula,
                tlaTargetSubject: tla.machineryFrame?.voiceTransformationFrame?.targetSubject,
            };
        })() : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: rendering.includes("evaluateClassicalNahuatlVncApplication(")
                && rendering.includes("vncApplicationFrame?.resultFrame?.selectedMachineryFrame")
                && !rendering.includes("typedTlaImpersonalStemRecord")
                && !rendering.includes("typedInherentImpersonalRecord"),
        },
        surfaceRuntimeLoaded ? {
            passiveStatus: "authorized",
            passiveVoice: "passive",
            passiveFormula: "#ni-0(chīhua-lo)0+0-0#",
            passiveTargetSubject: "1sg",
            tlaStatus: "authorized",
            tlaVoice: "tla-impersonal",
            tlaFormula: "#0-0(tla-nēci)0+0-0#",
            tlaTargetSubject: "3sg",
        } : {
            runtimeStatus: "not-loaded-in-core-harness",
            staticWiring: true,
        }
    );

    s.ok(
        "Lesson 20-22 single-voice action is shared through the application boundary, not reconstructed by presentation",
        rendering.includes("evaluateClassicalNahuatlVncApplication(")
            && !rendering.includes("getClassicalNahuatlLesson20NonactiveStemOptions(")
            && !rendering.includes("deriveClassicalNahuatlLesson20NonactiveStemRecord(")
            && !rendering.includes("buildClassicalNahuatlLesson22InherentImpersonalRecord(")
            && !rendering.includes("buildClassicalNahuatlLesson22TlaImpersonalStemRecord(")
            && !rendering.includes("buildClassicalNahuatlLessons20To22DerivedVncFrame(")
            && vncApplication.includes("getClassicalNahuatlLesson20NonactiveStemOptions(")
            && vncApplication.includes("buildClassicalNahuatlLessons20To22DerivedVncFrame(")
    );

    s.ok(
        "Classical Canvas exposes voice plus explicit generated alternatives with no default or expected-answer input",
        shell.includes('id="classical-rule-logic-vnc-voice"')
            && shell.includes('id="classical-rule-logic-voice-layer-2"')
            && shell.includes('id="classical-rule-logic-voice-layer-3"')
            && shell.includes('data-classical-vnc-authority-order="predicate-voice-layer-2"')
            && shell.includes('data-classical-vnc-authority-order="predicate-voice-layer-3"')
            && shell.includes('id="classical-rule-logic-nonactive-family"')
            && !shell.includes('id="classical-rule-logic-nonactive-stem"')
            && shell.includes('value="passive"')
            && shell.includes('value="impersonal"')
            && shell.includes('value="inherent-impersonal"')
            && shell.includes('value="tla-impersonal"')
            && shell.includes('data-classical-authority-option-tag="cn-option-nonactive-generated-choice-required" data-classical-authority-option-status="explicit-choice-required" selected>Choose a generated formation</option>')
            && !shell.includes('value="lō" data-classical-authority-option-tag="cn-option-nonactive-family-lo-long" selected')
            && rendering.includes('nonactiveInventory?.selectorRequired === true')
            && rendering.includes('nonactiveInventory.selectionRequired === true')
            && rendering.includes('Choose a generated formation')
            && rendering.includes('selectedOptionId || ""')
            && !rendering.includes('nonactiveInventory.defaultOptionId')
            && vncApplication.includes('dependencySource.deriveClassicalNahuatlLesson20NonactiveStemRecord(')
            && !rendering.includes('getClassicalRuleLogicSurfaceControlValue("classical-rule-logic-nonactive-stem"')
            && vncApplication.includes('dependencySource.buildClassicalNahuatlLessons20To22DerivedVncFrame(')
            && vncApplication.includes('"active-source-analysis-must-authorize-before-derived-voice"')
            && rendering.includes('allowedVncVoices = applicationControlFrame.allowedVoices')
            && rendering.includes('label: "Derived subject"')
            && rendering.includes('label: "Derived valence"')
    );

    return s;
}

module.exports = { run };
