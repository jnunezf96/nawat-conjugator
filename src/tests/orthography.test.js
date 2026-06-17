"use strict";

/**
 * Tests for src/core/orthography/orthography.js
 */

const { createSuite } = require("./runner");

function compactBridge(bridge) {
    return {
        kind: bridge.kind,
        version: bridge.version,
        sourceProfileId: bridge.sourceProfileId,
        targetProfileId: bridge.targetProfileId,
        correspondences: bridge.correspondences.map((item) => [
            item.id,
            item.sourceGrapheme,
            item.targetGrapheme,
            item.confidence,
            item.action,
            item.generationAllowed,
        ]),
        blocked: bridge.blocked,
        generationAllowed: bridge.generationAllowed,
        evidence: bridge.evidence,
        diagnostics: bridge.diagnostics.map((diagnostic) => diagnostic.id),
    };
}

function run(ctx) {
    const s = createSuite("orthography");

    s.eq("orthography API is exported", [
        typeof ctx.classifyOrthographyInput,
        typeof ctx.buildOrthographyBridgeMetadata,
        typeof ctx.convertClassicalLettersToNawat,
        typeof ctx.getClassicalLettersAsNawat,
        typeof ctx.splitOrthographyGraphemes,
        typeof ctx.buildLesson2SoundSpellingFrame,
        typeof ctx.getLesson2CoverageInventory,
        typeof ctx.buildLesson2CoverageFrame,
    ], ["function", "function", "function", "function", "function", "function", "function", "function"]);

    s.eq(
        "modern Nawat profile uses repo phonology inventory",
        ctx.getOrthographyProfileInventory()["nawat-modern"].digraphs,
        ["tz", "sh", "ch", "kw", "nh"]
    );

    s.eq(
        "modern Nawat grapheme splitting keeps current digraphs",
        ctx.splitOrthographyGraphemes("kwachi", { profileId: "nawat-modern" }),
        ["kw", "a", "ch", "i"]
    );

    const modern = ctx.classifyOrthographyInput("nemi");
    s.eq("modern Nawat classification stays diagnostic", {
        profileId: modern.profileId,
        graphemes: modern.graphemes,
        invalidGraphemes: modern.invalidGraphemes,
        generationAllowed: modern.generationAllowed,
        bridgeGenerationAllowed: modern.bridge.generationAllowed,
    }, {
        profileId: "nawat-modern",
        graphemes: ["n", "e", "m", "i"],
        invalidGraphemes: [],
        generationAllowed: false,
        bridgeGenerationAllowed: false,
    });

    s.eq(
        "Classical-looking qu/tz input is bridge metadata only",
        compactBridge(ctx.buildOrthographyBridgeMetadata("quetza")),
        {
            kind: "orthography-bridge",
            version: 1,
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "nawat-modern",
            correspondences: [
                ["same-tz", "tz", "tz", "confirmed-overlap", "profile-overlap", false],
                ["qu-k", "qu", "k", "candidate", "suggest-only", false],
            ],
            blocked: [],
            generationAllowed: false,
            evidence: {
                grammarAuthority: "Andrews PDF",
                orthographySource: "Andrews Lesson 2 / Appendix F source profiles",
                targetAuthority: "Modern Nawat/Pipil orthography",
            },
            diagnostics: [
                "orthography-bridge-no-generation",
                "orthography-bridge-needs-nawat-evidence",
            ],
        }
    );

    s.eq(
        "lossy Classical-looking input is blocked rather than converted",
        compactBridge(ctx.buildOrthographyBridgeMetadata("xochitl")),
        {
            kind: "orthography-bridge",
            version: 1,
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "nawat-modern",
            correspondences: [
                ["same-ch", "ch", "ch", "confirmed-overlap", "profile-overlap", false],
                ["x-sh", "x", "sh", "candidate", "suggest-only", false],
                ["long-vowel", ":", "", "lossy", "blocked", false],
                ["o-u", "o", "u", "lossy", "blocked", false],
                ["tl", "tl", "", "blocked-morphology", "blocked", false],
            ].filter((entry) => entry[0] !== "long-vowel"),
            blocked: ["o-u", "tl"],
            generationAllowed: false,
            evidence: {
                grammarAuthority: "Andrews PDF",
                orthographySource: "Andrews Lesson 2 / Appendix F source profiles",
                targetAuthority: "Modern Nawat/Pipil orthography",
            },
            diagnostics: [
                "orthography-bridge-no-generation",
                "orthography-bridge-blocked-lossy",
                "orthography-bridge-needs-nawat-evidence",
            ],
        }
    );

    s.eq(
        "Classical grammar-rule spelling converts to Nawat/Pipil letters without becoming lexical evidence",
        {
            zLiz: ctx.getClassicalLettersAsNawat("z/liz"),
            loHua: ctx.getClassicalLettersAsNawat("lo-hua"),
            huaLo: ctx.getClassicalLettersAsNawat("hua-lo"),
            xochitl: ctx.getClassicalLettersAsNawat("(xochi)-tl"),
            cTiya: ctx.getClassicalLettersAsNawat("c-ti-ya"),
            cihuatl: ctx.getClassicalLettersAsNawat("cihuatl"),
            conversion: (() => {
                const converted = ctx.convertClassicalLettersToNawat("xochitl");
                return {
                    kind: converted.kind,
                    output: converted.output,
                    orthographyConversionAllowed: converted.orthographyConversionAllowed,
                    generationAllowed: converted.generationAllowed,
                    diagnostics: converted.diagnostics,
                    ruleIds: converted.correspondences.map((entry) => entry.ruleId),
                };
            })(),
        },
        {
            zLiz: "s/lis",
            loHua: "lu-wa",
            huaLo: "wa-lu",
            xochitl: "(shuchi)-t",
            cTiya: "k-ti-ya",
            cihuatl: "siwat",
            conversion: {
                kind: "classical-to-nawat-letter-conversion",
                output: "shuchit",
                orthographyConversionAllowed: true,
                generationAllowed: false,
                diagnostics: [
                    "classical-to-nawat-orthography-conversion",
                    "orthography-conversion-is-not-lexical-evidence",
                ],
                ruleIds: ["x-sh", "o-u", "same-ch", "tl-t"],
            },
        }
    );

    s.eq(
        "syllable-final glottal -h maps to j while num2 -h keeps its connector rule",
        (() => {
            const particle = ctx.convertClassicalLettersToNawat("mah", {
                grammarSlot: "particle",
            });
            const initial = ctx.convertClassicalLettersToNawat("haci", {
                grammarSlot: "particle",
            });
            return {
                particleOutput: particle.output,
                particleRuleIds: particle.correspondences.map((entry) => entry.ruleId),
                initialOutput: initial.output,
                initialRuleIds: initial.correspondences.map((entry) => entry.ruleId),
                genericFinalH: ctx.getClassicalLettersAsNawat("-h"),
                num2FinalH: ctx.getClassicalLettersAsNawat("-h", {
                    slot: "num2",
                    syllablePosition: "slot-final",
                }),
            };
        })(),
        {
            particleOutput: "maj",
            particleRuleIds: ["h-syllable-final-glottal-j"],
            initialOutput: "hasi",
            initialRuleIds: ["c-front-s"],
            genericFinalH: "-j",
            num2FinalH: "-t",
        }
    );

    s.eq(
        "Lesson 2 sound-spelling frame separates num2 -h from syllable-final glottal -h",
        {
            num2: (() => {
                const frame = ctx.buildLesson2SoundSpellingFrame({
                    source: "-h",
                    slot: "num2",
                    syllablePosition: "slot-final",
                });
                return {
                    kind: frame.kind,
                    ruleId: frame.ruleId,
                    sourceSurface: frame.sourceSurface,
                    target: frame.target,
                    grammarSlot: frame.grammarSlot,
                    syllablePosition: frame.syllablePosition,
                    ruleScope: frame.ruleScope,
                    generationAllowed: frame.generationAllowed,
                };
            })(),
            stem: (() => {
                const frame = ctx.buildLesson2SoundSpellingFrame({
                    source: "h",
                    slot: "stem",
                    syllablePosition: "final",
                });
                return {
                    ruleId: frame.ruleId,
                    target: frame.target,
                    grammarSlot: frame.grammarSlot,
                    ruleScope: frame.ruleScope,
                };
            })(),
        },
        {
            num2: {
                kind: "lesson2-sound-spelling-frame",
                ruleId: "h-num2-t",
                sourceSurface: "-h",
                target: "-t",
                grammarSlot: "num2",
                syllablePosition: "slot-final",
                ruleScope: "graphic-representation",
                generationAllowed: false,
            },
            stem: {
                ruleId: "h-syllable-final-glottal-j",
                target: "j",
                grammarSlot: "stem",
                ruleScope: "graphic-representation",
            },
        }
    );

    s.eq(
        "Lesson 2 sound-spelling frame keeps syllable-final uh/uc evidence-sensitive",
        {
            uh: (() => {
                const frame = ctx.buildLesson2SoundSpellingFrame({
                    source: "-uh",
                    slot: "stem",
                    syllablePosition: "final",
                });
                return {
                    ruleId: frame.ruleId,
                    target: frame.target,
                    targetCandidates: frame.targetCandidates,
                    evidenceStatus: frame.evidenceStatus,
                    diagnostics: frame.diagnostics.map((diagnostic) => diagnostic.id),
                };
            })(),
            uc: (() => {
                const frame = ctx.buildLesson2SoundSpellingFrame({
                    source: "-uc",
                    slot: "stem",
                    syllablePosition: "final",
                });
                return {
                    ruleId: frame.ruleId,
                    targetCandidates: frame.targetCandidates,
                    evidenceStatus: frame.evidenceStatus,
                    generationAllowed: frame.generationAllowed,
                };
            })(),
        },
        {
            uh: {
                ruleId: "uh-final-candidates",
                target: "",
                targetCandidates: ["w", "uj", "j"],
                evidenceStatus: "nawat-evidence-required",
                diagnostics: ["lesson2-sound-spelling-choice-needs-evidence"],
            },
            uc: {
                ruleId: "uc-final-candidates",
                targetCandidates: ["k", "ku"],
                evidenceStatus: "nawat-evidence-required",
                generationAllowed: false,
            },
        }
    );

    s.eq(
        "orthography conversion carries Lesson 2 sound-spelling frame in grammar metadata",
        (() => {
            const converted = ctx.convertClassicalLettersToNawat("-h", {
                slot: "num2",
                syllablePosition: "slot-final",
            });
            const frame = converted.grammarFrame?.orthographyFrame?.soundSpellingFrame;
            return {
                output: converted.output,
                ruleId: frame?.ruleId || "",
                target: frame?.target || "",
                grammarSlot: frame?.grammarSlot || "",
                sourceLevel: frame?.sourceLevel || "",
                targetLevel: frame?.targetLevel || "",
                generationAllowed: frame?.generationAllowed,
            };
        })(),
        {
            output: "-t",
            ruleId: "h-num2-t",
            target: "-t",
            grammarSlot: "num2",
            sourceLevel: "Andrews grammar-rule spelling",
            targetLevel: "Modern Nawat/Pipil spelling realization",
            generationAllowed: false,
        }
    );

    s.eq(
        "Lesson 2 frame can represent Nawat-internal surface realization without Classical source import",
        (() => {
            const frame = ctx.buildLesson2SoundSpellingFrame({
                ruleId: "m-coda-n",
                source: "m",
                target: "n",
                slot: "tronco",
                syllablePosition: "coda",
            });
            return {
                ruleId: frame.ruleId,
                sourceProfileId: frame.sourceProfileId,
                targetProfileId: frame.targetProfileId,
                sourceLevel: frame.sourceLevel,
                targetLevel: frame.targetLevel,
                ruleScope: frame.ruleScope,
                andrewsSection: frame.andrewsSection,
                andrewsProcess: frame.andrewsProcess,
                spanishProcess: frame.spanishProcess,
                processFamily: frame.processFamily,
                generationAllowed: frame.generationAllowed,
                evidenceStatus: frame.evidenceStatus,
            };
        })(),
        {
            ruleId: "m-coda-n",
            sourceProfileId: "nawat-modern",
            targetProfileId: "nawat-modern",
            sourceLevel: "underlying Nawat surface segment",
            targetLevel: "realized Nawat output surface",
            ruleScope: "assimilation-or-consonant-phone-shift",
            andrewsSection: "2.11.5 / 2.13.2",
            andrewsProcess: "Regressive Assimilation / Consonant-Phone Shift Other Than Assimilation",
            spanishProcess: "asimilación regresiva / cambio consonántico",
            processFamily: "assimilation-or-consonant-phone-shift",
            generationAllowed: false,
            evidenceStatus: "slot-sensitive-spelling",
        }
    );

    s.eq(
        "Lesson 2 open transition stays in Andrews 2.5 and not syllable-structure 2.6",
        (() => {
            const frame = ctx.buildLesson2SoundSpellingFrame({
                ruleId: "n-open-transition-nh",
                source: "n",
                target: "nh",
                slot: "tronco",
                syllablePosition: "open-transition",
            });
            return {
                ruleId: frame.ruleId,
                ruleScope: frame.ruleScope,
                andrewsSection: frame.andrewsSection,
                andrewsProcess: frame.andrewsProcess,
                spanishProcess: frame.spanishProcess,
                processFamily: frame.processFamily,
                generationAllowed: frame.generationAllowed,
            };
        })(),
        {
            ruleId: "n-open-transition-nh",
            ruleScope: "open-transition",
            andrewsSection: "2.5",
            andrewsProcess: "Open Transition",
            spanishProcess: "transición abierta",
            processFamily: "open-transition",
            generationAllowed: false,
        }
    );

    s.eq(
        "Lesson 2 coverage inventory maps Andrews pronunciation categories without granting generation",
        (() => {
            const frame = ctx.buildLesson2CoverageFrame();
            const inventory = frame.inventory || [];
            return {
                kind: frame.kind,
                routeFamily: frame.grammarFrame?.routeContract?.routeFamily || "",
                routeStage: frame.grammarFrame?.routeContract?.routeStage || "",
                generationAllowed: frame.grammarFrame?.routeContract?.generationAllowed,
                count: inventory.length,
                pdfRefs: frame.pdfRefs,
                categories: inventory.map((entry) => entry.category),
                andrewsProcesses: inventory.map((entry) => entry.andrewsProcess),
                generationAllowedEntries: inventory.map((entry) => entry.generationAllowed),
                redirectActions: inventory.map((entry) => entry.redirectAction),
                validationRefs: inventory.map((entry) => entry.validationRefs),
                coverageCounts: frame.coverageCounts,
                pursuit: {
                    stepNumber: frame.pursuit?.stepNumber,
                    aimStatus: frame.pursuit?.aimStatus,
                    plannedArrows: frame.pursuit?.plannedArrows?.map((arrow) => [arrow.id, arrow.andrewsRefs.length, arrow.expectedFeedbackRefs[0]]),
                    firedArrows: frame.pursuit?.firedArrows?.map((arrow) => [arrow.id, arrow.result, arrow.andrewsRefs.length, arrow.feedbackRefs[0]]),
                    hitCount: frame.pursuit?.hitCount,
                    missCount: frame.pursuit?.missCount,
                    remainingGapCount: frame.pursuit?.remainingGaps?.length,
                    closestPass: frame.pursuit?.closestPass,
                },
                blockedCategories: inventory
                    .filter((entry) => entry.generationScope === "not-generated" || entry.generationScope === "blocked-for-generation")
                    .map((entry) => entry.category),
            };
        })(),
        {
            kind: "lesson2-coverage-frame",
            routeFamily: "orthography",
            routeStage: "classify-lesson-2-coverage",
            generationAllowed: false,
            count: 14,
            pdfRefs: [
                "Andrews Lesson 2.1",
                "Andrews Lesson 2.2",
                "Andrews Lesson 2.3",
                "Andrews Lesson 2.4",
                "Andrews Lesson 2.5",
                "Andrews Lesson 2.6",
                "Andrews Lesson 2.7",
                "Andrews Lesson 2.8",
                "Andrews Lesson 2.9-2.11",
                "Andrews Lesson 2.12",
                "Andrews Lesson 2.13",
                "Andrews Lesson 2.14",
                "Andrews Lesson 2.15",
                "Andrews Lesson 2.16",
            ],
            categories: [
                "phonemes-and-graphic-representations",
                "vowels-and-length",
                "consonants-and-digraphs",
                "traditional-spelling-conventions",
                "internal-open-transition",
                "syllable-structure",
                "stress",
                "long-consonants",
                "assimilation",
                "consonant-loss",
                "consonant-phone-shift",
                "vowel-elision",
                "long-vowel-to-short-vowel-plus-glottal-stop",
                "prosodic-contours",
            ],
            andrewsProcesses: [
                "The Phonemes and Their Graphic Representations",
                "Vowels",
                "Consonants",
                "Traditional Spelling",
                "Spelling at Points of Internal Open Transition",
                "Syllable Structure",
                "Stress",
                "Long Consonants",
                "Assimilation",
                "Consonant Loss",
                "Consonant-Phone Shift Other Than Assimilation",
                "Vowel Elision",
                "Long Vowel to Short Vowel Plus Glottal Stop",
                "Prosodic Contours",
            ],
            generationAllowedEntries: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            redirectActions: [
                "keep",
                "block-generation",
                "needs-nawat-evidence",
                "diagnostic-only",
                "diagnostic-only",
                "diagnostic-only",
                "block-generation",
                "block-generation",
                "diagnostic-only",
                "diagnostic-only",
                "diagnostic-only",
                "diagnostic-only",
                "block-generation",
                "block-generation",
            ],
            validationRefs: Array.from({ length: 14 }, () => ["src/tests/orthography.test.js"]),
            coverageCounts: {
                "implemented-foundation": 1,
                "boundary-diagnostic": 5,
                "partial-implemented": 8,
            },
            pursuit: {
                stepNumber: 2,
                aimStatus: "shooting",
                plannedArrows: [
                    ["lesson-2-subsection-coverage-audit", 14, "src/tests/orthography.test.js"],
                    ["lesson-2-formula-orthography-authority-audit", 14, "src/tests/orthography.test.js"],
                ],
                firedArrows: [
                    ["lesson-2-subsection-coverage-audit", "hit", 14, "src/tests/orthography.test.js"],
                    ["lesson-2-formula-orthography-authority-audit", "hit", 14, "src/tests/orthography.test.js"],
                ],
                hitCount: 2,
                missCount: 0,
                remainingGapCount: 13,
                closestPass: false,
            },
            blockedCategories: [
                "vowels-and-length",
                "stress",
                "long-consonants",
                "long-vowel-to-short-vowel-plus-glottal-stop",
                "prosodic-contours",
            ],
        }
    );

    const quAsNawat = ctx.classifyOrthographyInput("quetza", { profileId: "nawat-modern" });
    s.eq(
        "profile-forced Nawat diagnostics catch q without reclassifying as generation",
        {
            invalidGraphemes: quAsNawat.invalidGraphemes,
            generationAllowed: quAsNawat.generationAllowed,
        },
        {
            invalidGraphemes: ["q"],
            generationAllowed: false,
        }
    );

    s.eq(
        "orthography bridge carries anti-conflation rules",
        ctx.getOrthographyAntiConflationRules(),
        [
            "letter normalization is not morphology",
            "orthography match is not lexical evidence",
            "Classical Nahuatl form is not Nawat/Pipil fixture",
            "open-stem is not fixture evidence",
            "sourceKind is not grammar class",
            "topic is not nounClass",
            "supplementation is not word generation",
            "pronominal NNC is not ordinary NNC",
            "nonactive stem derivation is not identical to passive output",
            "Andrews grammar authority is not Classical spelling authority for Nawat output",
            "orthography bridge cannot change Andrews formula slots or slot owners",
        ]
    );

    const lossy = ctx.buildOrthographyBridgeMetadata("co:tl");
    s.no("orthography bridge does not expose surface forms", Object.prototype.hasOwnProperty.call(lossy, "surfaceForms"));
    s.no("orthography bridge does not expose generated forms", Object.prototype.hasOwnProperty.call(lossy, "generatedForms"));
    const conversion = ctx.convertClassicalLettersToNawat("cihuatl");
    const conversionFrame = conversion.grammarFrame;
    s.eq(
        "orthography conversion exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(conversionFrame),
            routeFamily: conversionFrame?.routeContract?.routeFamily || "",
            routeStage: conversionFrame?.routeContract?.routeStage || "",
            generationAllowed: conversionFrame?.routeContract?.generationAllowed,
            sourceProfileId: conversionFrame?.orthographyFrame?.sourceProfileId || "",
            output: conversionFrame?.orthographyFrame?.surface || "",
            andrewsRef: conversionFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(conversion, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "orthography",
            routeStage: "convert-rule-spelling",
            generationAllowed: false,
            sourceProfileId: "classical-nahuatl",
            output: "siwat",
            andrewsRef: "Andrews Lesson 2",
            enumerableGrammarFrame: false,
        }
    );

    return s;
}

module.exports = { run };
