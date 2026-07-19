"use strict";

/**
 * Tests for src/core/orthography/orthography.mjs
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

    s.eq("orthography and Classical firewall APIs are exported", [
        typeof ctx.classifyOrthographyInput,
        typeof ctx.buildOrthographyBridgeMetadata,
        typeof ctx.convertClassicalLettersToNawat,
        typeof ctx.getClassicalLettersAsNawat,
        typeof ctx.splitOrthographyGraphemes,
        typeof ctx.buildLesson2SoundSpellingFrame,
        typeof ctx.getLesson2CoverageInventory,
        typeof ctx.buildLesson2CoverageFrame,
        typeof ctx.buildClassicalNahuatlProfileWallFrame,
        typeof ctx.buildClassicalNahuatlLesson2OrthographyFrame,
        typeof ctx.getClassicalNahuatlLesson2SpellingChangeRules,
        typeof ctx.buildClassicalNahuatlLesson2SpellingChangeFrame,
        typeof ctx.getClassicalNahuatlLesson2OpenTransitionRules,
        typeof ctx.buildClassicalNahuatlLesson2OpenTransitionFrame,
        typeof ctx.getClassicalNahuatlLesson2SyllableStructureRules,
        typeof ctx.buildClassicalNahuatlLesson2SyllableStructureFrame,
        typeof ctx.getClassicalNahuatlLesson2StressRules,
        typeof ctx.buildClassicalNahuatlLesson2StressFrame,
        typeof ctx.getClassicalNahuatlLesson2ConsonantalLengthRules,
        typeof ctx.buildClassicalNahuatlLesson2ConsonantalLengthFrame,
        typeof ctx.getClassicalNahuatlLesson2AssimilationRules,
        typeof ctx.buildClassicalNahuatlLesson2AssimilationFrame,
        typeof ctx.getClassicalNahuatlLesson2ConsonantLossRules,
        typeof ctx.buildClassicalNahuatlLesson2ConsonantLossFrame,
        typeof ctx.getClassicalNahuatlLesson2ConsonantPhoneShiftRules,
        typeof ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame,
        typeof ctx.getClassicalNahuatlLesson2VowelElisionRules,
        typeof ctx.buildClassicalNahuatlLesson2VowelElisionFrame,
        typeof ctx.getClassicalNahuatlLesson2LongVowelGlottalRules,
        typeof ctx.buildClassicalNahuatlLesson2LongVowelGlottalFrame,
        typeof ctx.getClassicalNahuatlLesson2ProsodicContourRules,
        typeof ctx.buildClassicalNahuatlLesson2ProsodicContourFrame,
        typeof ctx.findClassicalNahuatlLesson3ParticleEntries,
        typeof ctx.getClassicalNahuatlLesson3FunctionalClassRules,
        typeof ctx.buildClassicalNahuatlLesson3FunctionalClassFrame,
        typeof ctx.getClassicalNahuatlLesson3NegativizingParticleRules,
        typeof ctx.buildClassicalNahuatlLesson3NegativizingParticleFrame,
        typeof ctx.getClassicalNahuatlLesson3ParticleCollocationRules,
        typeof ctx.buildClassicalNahuatlLesson3ParticleCollocationFrame,
        typeof ctx.getClassicalNahuatlLesson3HonorificizedParticleRules,
        typeof ctx.getClassicalNahuatlLesson3HonorificizedParticleExamples,
        typeof ctx.buildClassicalNahuatlLesson3HonorificizedParticleFrame,
        typeof ctx.buildClassicalNahuatlLesson3ParticlesFrame,
        typeof ctx.buildClassicalNahuatlLesson4NuclearClauseFrame,
        typeof ctx.getClassicalNahuatlFirewallRules,
    ], ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]);

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

    s.eq(
        "Classical Nahuatl profile keeps Lesson 2 macron vowels as Classical graphemes",
        {
            letters: ctx.getOrthographyProfileInventory()["classical-nahuatl"].letters.filter((letter) => ["ā", "ē", "ī", "ō"].includes(letter)),
            graphemes: ctx.splitOrthographyGraphemes("xīhuitl", { profileId: "classical-nahuatl" }),
            invalidGraphemes: ctx.getInvalidOrthographyGraphemes("xīhuitl", { profileId: "classical-nahuatl" }),
        },
        {
            letters: ["ā", "ē", "ī", "ō"],
            graphemes: ["x", "ī", "hu", "i", "tl"],
            invalidGraphemes: [],
        }
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
        "Classical tab Lesson 2 orthography preserves Andrews transcription directly",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson2OrthographyFrame("xīhuitl");
            return {
                kind: frame.kind,
                normalized: frame.normalized,
                surface: frame.surface,
                surfaceForms: frame.surfaceForms,
                sourceProfileId: frame.sourceProfileId,
                targetProfileId: frame.targetProfileId,
                graphemes: frame.graphemes,
                invalidGraphemes: frame.invalidGraphemes,
                sourceAuthority: frame.sourceAuthority,
                sourceDocument: frame.sourceDocument,
                lessonTitle: frame.lessonTitle,
                outputLanguage: frame.outputLanguage,
                outputAuthority: frame.outputAuthority,
                orthographyPolicy: frame.orthographyPolicy,
                nawatPipilOrthographyBridge: frame.nawatPipilOrthographyBridge,
                nawatPipilOutputAuthority: frame.nawatPipilOutputAuthority,
                profileWallKind: frame.profileWallKind,
                profileSeparationMechanism: frame.profileSeparationMechanism,
                spellingInspection: frame.spellingInspection,
                oldNawatPipilConjugatorAuthority: frame.oldNawatPipilConjugatorAuthority,
                nawatPipilGrammarAuthorityForClassical: frame.nawatPipilGrammarAuthorityForClassical,
                classicalOutputImport: frame.classicalOutputImport,
                orthographyOutputAllowed: frame.orthographyOutputAllowed,
                grammarGenerationAllowed: frame.grammarGenerationAllowed,
                coverageRefCount: frame.coverageRefs.length,
                coverageCategoryCount: frame.coverageCategories.length,
                grammarFrameSurface: frame.grammarFrame?.orthographyFrame?.surface || "",
                grammarFrameBridge: frame.grammarFrame?.orthographyFrame?.nawatPipilOrthographyBridge || "",
                grammarFrameNoClassicalImport: frame.grammarFrame?.orthographyFrame?.noClassicalSurfaceImport,
                proofPremiseLayers: frame.proofFrame.premises.map((premise) => premise.layer),
                spellingChangeRuleIds: frame.spellingChangeRuleIds,
                openTransitionRuleIds: frame.openTransitionRuleIds,
                syllableStructureRuleIds: frame.syllableStructureRuleIds,
                stressRuleIds: frame.stressRuleIds,
                consonantalLengthRuleIds: frame.consonantalLengthRuleIds,
                assimilationRuleIds: frame.assimilationRuleIds,
                consonantLossRuleIds: frame.consonantLossRuleIds,
                consonantPhoneShiftRuleIds: frame.consonantPhoneShiftRuleIds,
                vowelElisionRuleIds: frame.vowelElisionRuleIds,
                longVowelGlottalRuleIds: frame.longVowelGlottalRuleIds,
                prosodicContourRuleIds: frame.prosodicContourRuleIds,
            };
        })(),
        {
            kind: "classical-nahuatl-lesson2-orthography-frame",
            normalized: "xīhuitl",
            surface: "xīhuitl",
            surfaceForms: ["xīhuitl"],
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "classical-nahuatl",
            graphemes: ["x", "ī", "hu", "i", "tl"],
            invalidGraphemes: [],
            sourceAuthority: "Andrews transcription",
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            lessonTitle: "Pronunciation. Orthography",
            outputLanguage: "Classical Nahuatl",
            outputAuthority: "Andrews transcription",
            orthographyPolicy: "transcription-direct",
            nawatPipilOrthographyBridge: "not-applied",
            nawatPipilOutputAuthority: "not-authority-for-classical-lane",
            profileWallKind: "classical-nahuatl-profile-wall-frame",
            profileSeparationMechanism: "profile-selection",
            spellingInspection: "not-performed",
            oldNawatPipilConjugatorAuthority: "not-authority-for-classical-lane",
            nawatPipilGrammarAuthorityForClassical: "not-authority-for-classical-lane",
            classicalOutputImport: "authorized-within-classical-lane",
            orthographyOutputAllowed: true,
            grammarGenerationAllowed: false,
            coverageRefCount: 14,
            coverageCategoryCount: 14,
            grammarFrameSurface: "xīhuitl",
            grammarFrameBridge: "not-applied",
            grammarFrameNoClassicalImport: false,
            proofPremiseLayers: [
                "profile-wall",
                "transcription-source",
                "grapheme-inventory",
                "spelling-changes-2-4",
                "open-transition-2-5",
                "syllable-structure-2-6",
                "stress-2-7",
                "consonantal-length-2-8",
                "assimilation-2-9-2-11",
                "consonant-loss-2-12",
                "consonant-phone-shift-2-13",
                "vowel-elision-2-14",
                "long-vowel-glottal-2-15",
                "prosodic-contours-2-16",
                "orthography-policy",
            ],
            spellingChangeRuleIds: [
                "cn-l2-24-k-initial-before-a-o",
                "cn-l2-24-k-initial-before-e-i",
                "cn-l2-24-k-final",
                "cn-l2-24-s-initial-before-a-o",
                "cn-l2-24-s-initial-before-e-i",
                "cn-l2-24-s-final",
                "cn-l2-24-w-nonfinal",
                "cn-l2-24-w-final",
                "cn-l2-24-kw-nonfinal",
                "cn-l2-24-kw-final",
            ],
            openTransitionRuleIds: [
                "cn-l2-25-compound-boundary-open-transition",
                "cn-l2-25-supportive-i-kept",
                "cn-l2-25-stem-final-w-vocable-final",
                "cn-l2-25-stem-final-k-before-e-i-qu",
                "cn-l2-25-stem-final-kw-before-vowel-cu",
                "cn-l2-25-stem-final-w-before-vowel-hu-variant",
            ],
            syllableStructureRuleIds: [
                "cn-l2-26-vowel-count-no-diphthongs",
                "cn-l2-26-four-syllable-shapes",
                "cn-l2-26-intervocalic-consonant-onset",
                "cn-l2-26-vowel-sequence-separated",
                "cn-l2-26-u-is-digraph-only",
                "cn-l2-26-two-consonant-cluster-split",
                "cn-l2-26-digraphs-single-consonant",
                "cn-l2-26-supportive-i-illegal-sequence",
                "cn-l2-26-phonological-not-morphological",
            ],
            stressRuleIds: [
                "cn-l2-27-penultimate-vocable-stress",
                "cn-l2-27-final-short-vowel-contrast",
                "cn-l2-27-vocative-particle-exception",
                "cn-l2-27-stress-group-connected-speech",
            ],
            consonantalLengthRuleIds: [
                "cn-l2-28-identical-consonants-create-long-consonant",
                "cn-l2-28-single-bridging-pronunciation",
                "cn-l2-28-affricate-release-feature-loss",
                "cn-l2-28-within-vocable-double-spelling",
                "cn-l2-28-traditional-text-spelling-warning",
            ],
            assimilationRuleIds: [
                "cn-l2-29-grammatical-unlike-consonants",
                "cn-l2-29-progressive-vs-regressive",
                "cn-l2-210-progressive-l-tl-ll",
                "cn-l2-210-progressive-l-y-ll",
                "cn-l2-210-progressive-s-y-ss",
                "cn-l2-210-progressive-x-y-xx",
                "cn-l2-210-progressive-tz-y-tztz",
                "cn-l2-210-progressive-ch-y-chch",
                "cn-l2-210-ll-only-listed",
                "cn-l2-211-regressive-nasal-sibilant",
                "cn-l2-211-regressive-sibilant-group",
                "cn-l2-211-regressive-w-bilabial",
                "cn-l2-211-regressive-m-n-nn",
                "cn-l2-211-regressive-m-partial",
                "cn-l2-211-regressive-n-m-mm",
                "cn-l2-211-regressive-n-p-mp",
                "cn-l2-211-low-frequency-ch-p-pp",
                "cn-l2-211-regressive-dissimilation-kk-hk",
            ],
            consonantLossRuleIds: [
                "cn-l2-212-loss-general",
                "cn-l2-212-tz-w-tz",
                "cn-l2-212-ch-w-ch",
                "cn-l2-212-glottal-y-h",
                "cn-l2-212-glottal-y-y",
                "cn-l2-212-glottal-y-y-reduplication-block",
                "cn-l2-212-initial-y-unstable-note",
                "cn-l2-212-y-between-long-a-o-vowels",
                "cn-l2-212-nasal-y-y",
                "cn-l2-212-nasal-w-w",
                "cn-l2-212-w-w-w",
            ],
            consonantPhoneShiftRuleIds: [
                "cn-l2-213-phone-shift-general",
                "cn-l2-213-glottal-vowel-y",
                "cn-l2-213-intervocalic-y-disappears",
                "cn-l2-213-m-exposed-n",
                "cn-l2-213-y-exposed-x",
                "cn-l2-213-y-exposed-prior-s",
                "cn-l2-213-kw-exposed-k",
                "cn-l2-213-t-final-h",
                "cn-l2-213-rare-glottal-nonfinal-t",
            ],
            vowelElisionRuleIds: [
                "cn-l2-214-short-vowel-stress-group-elision",
                "cn-l2-214-long-vowel-resists-elision",
                "cn-l2-214-listed-stress-group-examples",
                "cn-l2-214-spelling-change-required",
                "cn-l2-214-supportive-i-not-proper-elision",
            ],
            longVowelGlottalRuleIds: [
                "cn-l2-215-irregular-short-vowel-glottal-morph",
                "cn-l2-215-small-number-of-morphemes",
                "cn-l2-215-embed-subposition-required",
                "cn-l2-215-matrix-determines-choice",
                "cn-l2-215-listed-examples",
            ],
            prosodicContourRuleIds: [
                "cn-l2-216-sentences-had-prosodic-contours",
                "cn-l2-216-known-stress-rules",
                "cn-l2-216-long-final-vowel-low-pitch",
                "cn-l2-216-sentential-prosody-unknown",
            ],
        }
    );

    s.eq(
        "Classical Lesson 2.4 spelling changes select k, s, w, and kw spelling by environment",
        (() => {
            const kBeforeE = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "/k/",
                syllablePosition: "initial",
                followingVowel: "e",
            });
            const kFinalAfterE = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "/k/",
                syllablePosition: "final",
                precedingVowel: "e",
            });
            const sBeforeA = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "/s/",
                syllablePosition: "initial",
                followingVowel: "a",
            });
            const sBeforeI = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "/s/",
                syllablePosition: "initial",
                followingVowel: "i",
            });
            const sFinalAfterI = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "/s/",
                syllablePosition: "final",
                precedingVowel: "i",
            });
            const wNonfinalBeforeE = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "[w]",
                syllablePosition: "nonfinal",
                followingVowel: "e",
            });
            const wFinalAfterO = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "[w̥]",
                syllablePosition: "final",
                precedingVowel: "o",
            });
            const kwNonfinalBeforeI = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "[kʷ]",
                syllablePosition: "nonfinal",
                followingVowel: "i",
            });
            const kwFinalAfterA = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "[kʷ̥]",
                syllablePosition: "final",
                precedingVowel: "a",
            });
            const blocked = ctx.buildClassicalNahuatlLesson2SpellingChangeFrame({
                phoneme: "/k/",
                syllablePosition: "initial",
                followingVowel: "e",
                requestedSpelling: "c",
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2SpellingChangeRules().length,
                kBeforeE: {
                    outputSpelling: kBeforeE.outputSpelling,
                    outputExample: kBeforeE.outputExample,
                    pronunciationChanged: kBeforeE.pronunciationChanged,
                    authorizationStatus: kBeforeE.authorizationStatus,
                },
                kFinalAfterE: {
                    outputSpelling: kFinalAfterE.outputSpelling,
                    outputExample: kFinalAfterE.outputExample,
                },
                sBeforeA: {
                    outputSpelling: sBeforeA.outputSpelling,
                    outputExample: sBeforeA.outputExample,
                },
                sBeforeI: {
                    outputSpelling: sBeforeI.outputSpelling,
                    outputExample: sBeforeI.outputExample,
                },
                sFinalAfterI: {
                    outputSpelling: sFinalAfterI.outputSpelling,
                    outputExample: sFinalAfterI.outputExample,
                },
                wNonfinalBeforeE: {
                    operationId: wNonfinalBeforeE.operationId,
                    outputSpelling: wNonfinalBeforeE.outputSpelling,
                    outputExample: wNonfinalBeforeE.outputExample,
                    pronunciationPhone: wNonfinalBeforeE.selectedRule?.pronunciationPhone || "",
                    pronunciationChanged: wNonfinalBeforeE.pronunciationChanged,
                },
                wFinalAfterO: {
                    outputSpelling: wFinalAfterO.outputSpelling,
                    outputExample: wFinalAfterO.outputExample,
                    pronunciationPhone: wFinalAfterO.selectedRule?.pronunciationPhone || "",
                    pronunciationChanged: wFinalAfterO.pronunciationChanged,
                },
                kwNonfinalBeforeI: {
                    outputSpelling: kwNonfinalBeforeI.outputSpelling,
                    outputExample: kwNonfinalBeforeI.outputExample,
                    pronunciationPhone: kwNonfinalBeforeI.selectedRule?.pronunciationPhone || "",
                    pronunciationChanged: kwNonfinalBeforeI.pronunciationChanged,
                },
                kwFinalAfterA: {
                    outputSpelling: kwFinalAfterA.outputSpelling,
                    outputExample: kwFinalAfterA.outputExample,
                    pronunciationPhone: kwFinalAfterA.selectedRule?.pronunciationPhone || "",
                    pronunciationChanged: kwFinalAfterA.pronunciationChanged,
                },
                blocked: {
                    authorizationStatus: blocked.authorizationStatus,
                    outputSpelling: blocked.outputSpelling,
                    blockReason: blocked.blockReason,
                    expectedSpelling: blocked.premises.find((premise) => premise.layer === "requested-spelling")?.expectedSpelling || "",
                },
                witness: kBeforeE.exactWitness,
                secondWitness: wFinalAfterO.exactWitness,
                sourceDocument: kBeforeE.sourceDocument,
            };
        })(),
        {
            ruleCount: 10,
            kBeforeE: {
                outputSpelling: "qu",
                outputExample: "que",
                pronunciationChanged: false,
                authorizationStatus: "authorized",
            },
            kFinalAfterE: {
                outputSpelling: "c",
                outputExample: "ec",
            },
            sBeforeA: {
                outputSpelling: "z",
                outputExample: "za",
            },
            sBeforeI: {
                outputSpelling: "c",
                outputExample: "ci",
            },
            sFinalAfterI: {
                outputSpelling: "z",
                outputExample: "iz",
            },
            wNonfinalBeforeE: {
                operationId: "cn-l2-spelling-changes-w-kw-syllable-final",
                outputSpelling: "hu",
                outputExample: "hue",
                pronunciationPhone: "[w]",
                pronunciationChanged: true,
            },
            wFinalAfterO: {
                outputSpelling: "uh",
                outputExample: "ouh",
                pronunciationPhone: "[w̥]",
                pronunciationChanged: true,
            },
            kwNonfinalBeforeI: {
                outputSpelling: "cu",
                outputExample: "cui",
                pronunciationPhone: "[kʷ]",
                pronunciationChanged: true,
            },
            kwFinalAfterA: {
                outputSpelling: "uc",
                outputExample: "auc",
                pronunciationPhone: "[kʷ̥]",
                pronunciationChanged: true,
            },
            blocked: {
                authorizationStatus: "blocked",
                outputSpelling: "",
                blockReason: "requested-spelling-conflicts-with-transcription-environment",
                expectedSpelling: "qu",
            },
            witness: "/k/: ca co que qui; ac oc ec ic\n/s/: za zo ce ci; az oz ez iz",
            secondWitness: "This depends on whether the sounds are syllable-final or not.\n[w]: hua hue hui; [w̥]: auh euh iuh ouh\n[kʷ]: cua cue cui; [kʷ̥]: auc euc iuc ouc",
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        }
    );

    s.eq(
        "Classical Lesson 2.5 open transition preserves compound boundaries and listed exceptions",
        (() => {
            const boundary = ctx.buildClassicalNahuatlLesson2OpenTransitionFrame({
                boundaryType: "compound",
            });
            const supportiveI = ctx.buildClassicalNahuatlLesson2OpenTransitionFrame({
                boundaryType: "compound",
                stemInitialSupportiveI: true,
            });
            const wVocableFinal = ctx.buildClassicalNahuatlLesson2OpenTransitionFrame({
                boundaryType: "compound",
                stemFinalPhoneme: "[w]",
                followingVowel: "e",
            });
            const kBeforeI = ctx.buildClassicalNahuatlLesson2OpenTransitionFrame({
                boundaryType: "compound",
                stemFinalPhoneme: "/k/",
                followingVowel: "i",
            });
            const kwBeforeA = ctx.buildClassicalNahuatlLesson2OpenTransitionFrame({
                boundaryType: "compound",
                stemFinalPhoneme: "[kʷ]",
                followingVowel: "a",
            });
            const wHuVariant = ctx.buildClassicalNahuatlLesson2OpenTransitionFrame({
                boundaryType: "compound",
                stemFinalPhoneme: "[w̥]",
                followingVowel: "e",
                requestedSpelling: "hu",
            });
            const blocked = ctx.buildClassicalNahuatlLesson2OpenTransitionFrame({
                boundaryType: "compound",
                stemFinalPhoneme: "/k/",
                followingVowel: "e",
                requestedSpelling: "c",
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2OpenTransitionRules().length,
                boundary: {
                    selectedRuleId: boundary.selectedRuleId,
                    authorizationStatus: boundary.authorizationStatus,
                    exactWitness: boundary.exactWitness,
                },
                supportiveI: {
                    selectedRuleId: supportiveI.selectedRuleId,
                    outputSpelling: supportiveI.outputSpelling,
                    outputExample: supportiveI.outputExample,
                },
                wVocableFinal: {
                    selectedRuleId: wVocableFinal.selectedRuleId,
                    outputSpelling: wVocableFinal.outputSpelling,
                    outputExample: wVocableFinal.outputExample,
                    spelledAsVocableFinal: wVocableFinal.conclusion.spelledAsVocableFinal,
                    pronunciationPhone: wVocableFinal.selectedRule?.pronunciationPhone || "",
                },
                kBeforeI: {
                    selectedRuleId: kBeforeI.selectedRuleId,
                    outputSpelling: kBeforeI.outputSpelling,
                    outputExample: kBeforeI.outputExample,
                    exception: kBeforeI.conclusion.exception,
                },
                kwBeforeA: {
                    selectedRuleId: kwBeforeA.selectedRuleId,
                    outputSpelling: kwBeforeA.outputSpelling,
                    outputExample: kwBeforeA.outputExample,
                    exception: kwBeforeA.conclusion.exception,
                },
                wHuVariant: {
                    selectedRuleId: wHuVariant.selectedRuleId,
                    outputSpelling: wHuVariant.outputSpelling,
                    outputExample: wHuVariant.outputExample,
                    exception: wHuVariant.conclusion.exception,
                },
                blocked: {
                    authorizationStatus: blocked.authorizationStatus,
                    outputSpelling: blocked.outputSpelling,
                    blockReason: blocked.blockReason,
                },
            };
        })(),
        {
            ruleCount: 6,
            boundary: {
                selectedRuleId: "cn-l2-25-compound-boundary-open-transition",
                authorizationStatus: "authorized",
                exactWitness: "When two stems are joined by compounding\n(see primarily Lessons 30 and 31), their boundaries, as a rule, are preserved by open\ntransition",
            },
            supportiveI: {
                selectedRuleId: "cn-l2-25-supportive-i-kept",
                outputSpelling: "i",
                outputExample: "tekoma + ikšiλ",
            },
            wVocableFinal: {
                selectedRuleId: "cn-l2-25-stem-final-w-vocable-final",
                outputSpelling: "uh",
                outputExample: "cuauhēhuatl",
                spelledAsVocableFinal: true,
                pronunciationPhone: "[w̥]",
            },
            kBeforeI: {
                selectedRuleId: "cn-l2-25-stem-final-k-before-e-i-qu",
                outputSpelling: "qu",
                outputExample: "tēyēquihtoa",
                exception: true,
            },
            kwBeforeA: {
                selectedRuleId: "cn-l2-25-stem-final-kw-before-vowel-cu",
                outputSpelling: "cu",
                outputExample: "necuātl",
                exception: true,
            },
            wHuVariant: {
                selectedRuleId: "cn-l2-25-stem-final-w-before-vowel-hu-variant",
                outputSpelling: "hu",
                outputExample: "cuācuahueh",
                exception: true,
            },
            blocked: {
                authorizationStatus: "blocked",
                outputSpelling: "",
                blockReason: "requested-spelling-conflicts-with-open-transition-rule",
            },
        }
    );

    s.eq(
        "Classical Lesson 2.6 syllable structure follows Andrews examples",
        (() => {
            const examples = [
                "cāna",
                "nāhui",
                "teotl",
                "quitzacuia",
                "nauh",
                "iucci",
                "nocuauh",
                "cachuah",
                "ōmpa",
                "calli",
                "iztatl",
                "atzan",
                "tōchtli",
            ];
            const divisions = Object.fromEntries(examples.map((example) => {
                const frame = ctx.buildClassicalNahuatlLesson2SyllableStructureFrame(example);
                return [example, {
                    division: frame.division,
                    vowelCount: frame.vowelCount,
                    syllableCount: frame.syllableCount,
                    authorizationStatus: frame.authorizationStatus,
                }];
            }));
            const blocked = ctx.buildClassicalNahuatlLesson2SyllableStructureFrame("ptla");
            const nauh = ctx.buildClassicalNahuatlLesson2SyllableStructureFrame("nauh");
            const cachuah = ctx.buildClassicalNahuatlLesson2SyllableStructureFrame("cachuah");
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2SyllableStructureRules().length,
                divisions,
                nauhSounds: nauh.sounds,
                cachuahSounds: cachuah.sounds,
                cachuahShapes: cachuah.syllables.map((syllable) => syllable.shape),
                blocked: {
                    authorizationStatus: blocked.authorizationStatus,
                    blockReason: blocked.blockReason,
                    violations: blocked.violations,
                },
                premiseLayers: cachuah.premises.map((premise) => premise.layer),
                exactWitness: cachuah.exactWitness,
            };
        })(),
        {
            ruleCount: 9,
            divisions: {
                "cāna": {
                    division: "cā-na",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "nāhui": {
                    division: "nā-hui",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "teotl": {
                    division: "te-otl",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "quitzacuia": {
                    division: "qui-tza-cui-a",
                    vowelCount: 4,
                    syllableCount: 4,
                    authorizationStatus: "authorized",
                },
                "nauh": {
                    division: "nauh",
                    vowelCount: 1,
                    syllableCount: 1,
                    authorizationStatus: "authorized",
                },
                "iucci": {
                    division: "iuc-ci",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "nocuauh": {
                    division: "no-cuauh",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "cachuah": {
                    division: "cac-huah",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "ōmpa": {
                    division: "ōm-pa",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "calli": {
                    division: "cal-li",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "iztatl": {
                    division: "iz-tatl",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "atzan": {
                    division: "a-tzan",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
                "tōchtli": {
                    division: "tōch-tli",
                    vowelCount: 2,
                    syllableCount: 2,
                    authorizationStatus: "authorized",
                },
            },
            nauhSounds: ["n", "a", "uh"],
            cachuahSounds: ["c", "a", "c", "hu", "a", "h"],
            cachuahShapes: ["CVC", "CVC"],
            blocked: {
                authorizationStatus: "blocked",
                blockReason: "initial-consonant-cluster",
                violations: ["initial-consonant-cluster"],
            },
            premiseLayers: [
                "vowel-count",
                "syllable-shapes",
                "u-digraph-only",
                "consonant-clusters",
                "phonology-not-morphology",
            ],
            exactWitness: "2.6. Syllable Structure. A vocable in Nahuatl has as many syllables as it has vowels",
        }
    );

    s.eq(
        "Classical Lesson 2.7 stress uses penultimate stress with Andrews exceptions",
        (() => {
            const choloa = ctx.buildClassicalNahuatlLesson2StressFrame("choloa");
            const ninihiyotia = ctx.buildClassicalNahuatlLesson2StressFrame("ninihiyōtia");
            const calaqui = ctx.buildClassicalNahuatlLesson2StressFrame("calaqui");
            const calac = ctx.buildClassicalNahuatlLesson2StressFrame("calac");
            const vocative = ctx.buildClassicalNahuatlLesson2StressFrame("nopiltziné");
            const stressGroup = ctx.buildClassicalNahuatlLesson2StressFrame("in in", {
                stressGroup: true,
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2StressRules().length,
                choloa: {
                    division: choloa.division,
                    stressedSyllable: choloa.stressedSyllable,
                    stressRule: choloa.stressRule,
                    stressIndex: choloa.stressIndex,
                },
                ninihiyotia: {
                    division: ninihiyotia.division,
                    stressedSyllable: ninihiyotia.stressedSyllable,
                },
                contrast: {
                    calaquiDivision: calaqui.division,
                    calaquiStress: calaqui.stressedSyllable,
                    calacDivision: calac.division,
                    calacStress: calac.stressedSyllable,
                },
                vocative: {
                    division: vocative.division,
                    stressedSyllable: vocative.stressedSyllable,
                    stressRule: vocative.stressRule,
                    vocativeParticle: vocative.vocativeParticle,
                    premiseResults: vocative.premises.map((premise) => premise.passed),
                },
                stressGroup: {
                    division: stressGroup.division,
                    stressGroupDivision: stressGroup.stressGroupDivision,
                    stressedSyllable: stressGroup.stressedSyllable,
                    stressGroup: stressGroup.stressGroup,
                },
                exactWitness: choloa.exactWitness,
            };
        })(),
        {
            ruleCount: 4,
            choloa: {
                division: "cho-lo-a",
                stressedSyllable: "lo",
                stressRule: "penultimate",
                stressIndex: 1,
            },
            ninihiyotia: {
                division: "ni-ni-hi-yō-ti-a",
                stressedSyllable: "ti",
            },
            contrast: {
                calaquiDivision: "ca-la-qui",
                calaquiStress: "la",
                calacDivision: "ca-lac",
                calacStress: "ca",
            },
            vocative: {
                division: "no-pil-tzi-ne",
                stressedSyllable: "ne",
                stressRule: "vocative-final-stress",
                vocativeParticle: true,
                premiseResults: [true, true, true, true],
            },
            stressGroup: {
                division: "i-nin",
                stressGroupDivision: "i-nin",
                stressedSyllable: "i",
                stressGroup: true,
            },
            exactWitness: "Stress in Nahuatl vocables falls on the penultimate (next-to-the-last) syllable.",
        }
    );

    s.eq(
        "Classical Lesson 2.8 consonantal length requires identical consonants from grammatical construction",
        (() => {
            const pp = ctx.buildClassicalNahuatlLesson2ConsonantalLengthFrame({
                leftConsonant: "p",
                rightConsonant: "p",
                grammaticalConstruction: true,
            });
            const nn = ctx.buildClassicalNahuatlLesson2ConsonantalLengthFrame({
                leftConsonant: "n",
                rightConsonant: "n",
            });
            const chch = ctx.buildClassicalNahuatlLesson2ConsonantalLengthFrame({
                leftConsonant: "ch",
                rightConsonant: "č",
            });
            const tztz = ctx.buildClassicalNahuatlLesson2ConsonantalLengthFrame({
                leftConsonant: "tz",
                rightConsonant: "¢",
            });
            const unlike = ctx.buildClassicalNahuatlLesson2ConsonantalLengthFrame({
                leftConsonant: "p",
                rightConsonant: "t",
            });
            const notConstruction = ctx.buildClassicalNahuatlLesson2ConsonantalLengthFrame({
                leftConsonant: "p",
                rightConsonant: "p",
                grammaticalConstruction: false,
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2ConsonantalLengthRules().length,
                pp: {
                    outputSpelling: pp.outputSpelling,
                    pronunciationMode: pp.pronunciationMode,
                    authorizationStatus: pp.authorizationStatus,
                    premiseLayers: pp.premises.map((premise) => premise.layer),
                },
                nn: {
                    outputSpelling: nn.outputSpelling,
                    longConsonant: nn.longConsonant,
                },
                chch: {
                    outputSpelling: chch.outputSpelling,
                    releaseFeatureLost: chch.releaseFeatureLost,
                    releasePronunciation: chch.releasePronunciation,
                },
                tztz: {
                    outputSpelling: tztz.outputSpelling,
                    releaseFeatureLost: tztz.releaseFeatureLost,
                    releasePronunciation: tztz.releasePronunciation,
                },
                unlike: {
                    authorizationStatus: unlike.authorizationStatus,
                    blockReason: unlike.blockReason,
                    outputSpelling: unlike.outputSpelling,
                },
                notConstruction: {
                    authorizationStatus: notConstruction.authorizationStatus,
                    blockReason: notConstruction.blockReason,
                },
                exactWitness: pp.exactWitness,
            };
        })(),
        {
            ruleCount: 5,
            pp: {
                outputSpelling: "pp",
                pronunciationMode: "single-bridging-pronunciation",
                authorizationStatus: "authorized",
                premiseLayers: [
                    "grammatical-construction",
                    "identical-consonants",
                    "single-pronunciation",
                    "within-vocable-spelling",
                    "affricate-release",
                ],
            },
            nn: {
                outputSpelling: "nn",
                longConsonant: true,
            },
            chch: {
                outputSpelling: "chch",
                releaseFeatureLost: true,
                releasePronunciation: "[tč]",
            },
            tztz: {
                outputSpelling: "tztz",
                releaseFeatureLost: true,
                releasePronunciation: "[t¢]",
            },
            unlike: {
                authorizationStatus: "blocked",
                blockReason: "consonants-not-identical",
                outputSpelling: "",
            },
            notConstruction: {
                authorizationStatus: "blocked",
                blockReason: "not-grammatical-construction",
            },
            exactWitness: "When two identical consonants come together as a result of grammatical\nconstruction, they create a long consonant.",
        }
    );

    s.eq(
        "Classical Lesson 2.9-2.11 assimilation follows Andrews progressive and regressive rules",
        (() => {
            const lTl = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "l",
                rightConsonant: "λ",
            });
            const sY = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "s",
                rightConsonant: "y",
            });
            const nasalSibilant = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "m",
                rightConsonant: "x",
            });
            const sibilantGroup = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "ch",
                rightConsonant: "tz",
            });
            const wBilabial = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "w",
                rightConsonant: "m",
            });
            const mPartial = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "m",
                rightConsonant: "kʷ",
            });
            const nP = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "n",
                rightConsonant: "p",
            });
            const lowFrequency = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "č",
                rightConsonant: "p",
            });
            const dissimilation = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "k",
                rightConsonant: "k",
            });
            const badPair = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "p",
                rightConsonant: "t",
            });
            const badConstruction = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "l",
                rightConsonant: "tl",
                grammaticalConstruction: false,
            });
            const spellingConflict = ctx.buildClassicalNahuatlLesson2AssimilationFrame({
                leftConsonant: "l",
                rightConsonant: "tl",
                requestedSpelling: "ltl",
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2AssimilationRules().length,
                lTl: {
                    selectedRuleId: lTl.selectedRuleId,
                    direction: lTl.direction,
                    dominantSide: lTl.dominantSide,
                    outputSpelling: lTl.outputSpelling,
                    outputSound: lTl.outputSound,
                    premiseLayers: lTl.premises.map((premise) => premise.layer),
                },
                sY: {
                    selectedRuleId: sY.selectedRuleId,
                    outputSpelling: sY.outputSpelling,
                    outputSound: sY.outputSound,
                },
                nasalSibilant: {
                    selectedRuleId: nasalSibilant.selectedRuleId,
                    outputSpelling: nasalSibilant.outputSpelling,
                    outputSound: nasalSibilant.outputSound,
                    traditionalSpellingMayHidePronunciation: nasalSibilant.traditionalSpellingMayHidePronunciation,
                },
                sibilantGroup: {
                    selectedRuleId: sibilantGroup.selectedRuleId,
                    outputSpelling: sibilantGroup.outputSpelling,
                    releasePronunciation: sibilantGroup.releasePronunciation,
                    releaseFeatureLost: sibilantGroup.releaseFeatureLost,
                },
                wBilabial: {
                    selectedRuleId: wBilabial.selectedRuleId,
                    outputSpelling: wBilabial.outputSpelling,
                    outputSound: wBilabial.outputSound,
                },
                mPartial: {
                    selectedRuleId: mPartial.selectedRuleId,
                    assimilationType: mPartial.assimilationType,
                    outputSpelling: mPartial.outputSpelling,
                    outputSound: mPartial.outputSound,
                },
                nP: {
                    selectedRuleId: nP.selectedRuleId,
                    assimilationType: nP.assimilationType,
                    outputSpelling: nP.outputSpelling,
                },
                lowFrequency: {
                    selectedRuleId: lowFrequency.selectedRuleId,
                    lowFrequency: lowFrequency.lowFrequency,
                    outputSpelling: lowFrequency.outputSpelling,
                },
                dissimilation: {
                    selectedRuleId: dissimilation.selectedRuleId,
                    processKind: dissimilation.processKind,
                    optional: dissimilation.optional,
                    outputSpelling: dissimilation.outputSpelling,
                },
                badPair: {
                    authorizationStatus: badPair.authorizationStatus,
                    blockReason: badPair.blockReason,
                    outputSpelling: badPair.outputSpelling,
                },
                badConstruction: {
                    authorizationStatus: badConstruction.authorizationStatus,
                    blockReason: badConstruction.blockReason,
                },
                spellingConflict: {
                    authorizationStatus: spellingConflict.authorizationStatus,
                    blockReason: spellingConflict.blockReason,
                },
                exactWitness: lTl.exactWitness,
            };
        })(),
        {
            ruleCount: 18,
            lTl: {
                selectedRuleId: "cn-l2-210-progressive-l-tl-ll",
                direction: "progressive",
                dominantSide: "left",
                outputSpelling: "ll",
                outputSound: "ll",
                premiseLayers: [
                    "grammatical-construction",
                    "unlike-consonants",
                    "rule-selection",
                    "direction",
                    "outcome",
                    "requested-spelling",
                ],
            },
            sY: {
                selectedRuleId: "cn-l2-210-progressive-s-y-ss",
                outputSpelling: "zz",
                outputSound: "ss",
            },
            nasalSibilant: {
                selectedRuleId: "cn-l2-211-regressive-nasal-sibilant",
                outputSpelling: "xx",
                outputSound: "šš",
                traditionalSpellingMayHidePronunciation: true,
            },
            sibilantGroup: {
                selectedRuleId: "cn-l2-211-regressive-sibilant-group",
                outputSpelling: "tztz",
                releasePronunciation: "[t¢]",
                releaseFeatureLost: true,
            },
            wBilabial: {
                selectedRuleId: "cn-l2-211-regressive-w-bilabial",
                outputSpelling: "mm",
                outputSound: "mm",
            },
            mPartial: {
                selectedRuleId: "cn-l2-211-regressive-m-partial",
                assimilationType: "partial",
                outputSpelling: "ncu",
                outputSound: "ŋkʷ",
            },
            nP: {
                selectedRuleId: "cn-l2-211-regressive-n-p-mp",
                assimilationType: "partial",
                outputSpelling: "mp",
            },
            lowFrequency: {
                selectedRuleId: "cn-l2-211-low-frequency-ch-p-pp",
                lowFrequency: true,
                outputSpelling: "pp",
            },
            dissimilation: {
                selectedRuleId: "cn-l2-211-regressive-dissimilation-kk-hk",
                processKind: "dissimilation",
                optional: true,
                outputSpelling: "hc",
            },
            badPair: {
                authorizationStatus: "blocked",
                blockReason: "no-lesson2-assimilation-rule",
                outputSpelling: "",
            },
            badConstruction: {
                authorizationStatus: "blocked",
                blockReason: "not-grammatical-construction",
            },
            spellingConflict: {
                authorizationStatus: "blocked",
                blockReason: "requested-spelling-conflicts-with-assimilation-rule",
            },
            exactWitness: "1. /l/ + /λ/ > [ll]: mil- + -tlah > millah",
        }
    );

    s.eq(
        "Classical Lesson 2.10 realizes general progressive assimilation at analyzed morph boundaries",
        (() => {
            const cases = [
                ["cal-tlah", "cal-lah", "callah", "cn-l2-210-progressive-l-tl-ll"],
                ["cal-yō", "cal-lō", "callō", "cn-l2-210-progressive-l-y-ll"],
                ["nequiz-yoh", "nequiz-zoh", "nequizzoh", "cn-l2-210-progressive-s-y-ss"],
                ["tex-yoh", "tex-xoh", "texxoh", "cn-l2-210-progressive-x-y-xx"],
                ["quetz-yoh", "quetz-tzoh", "quetztzoh", "cn-l2-210-progressive-tz-y-tztz"],
                ["teach-yō", "teach-chō", "teachchō", "cn-l2-210-progressive-ch-y-chch"],
            ].map(([source, analyzed, solid, ruleId]) => {
                const frame = ctx.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame(source);
                return {
                    source,
                    analyzed: frame.realizedAnalyzedStem,
                    solid: frame.realizedSolidStem,
                    ruleId: frame.appliedRuleIds[0],
                    authorized: frame.authorizationStatus,
                    expected: [analyzed, solid, ruleId],
                };
            });
            const untouched = ctx.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame("cal-na");
            const inventedLl = ctx.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame("ol-lin");
            const poisoned = ctx.buildClassicalNahuatlLesson210ProgressiveAssimilationFrame("cal-yō", {
                requestedRealizedStem: "cal-yō",
            });
            return {
                cases: cases.map((entry) => ({
                    source: entry.source,
                    actual: [entry.analyzed, entry.solid, entry.ruleId],
                    expected: entry.expected,
                    authorized: entry.authorized,
                })),
                untouched: {
                    analyzed: untouched.realizedAnalyzedStem,
                    transformationApplied: untouched.transformationApplied,
                    authorizationStatus: untouched.authorizationStatus,
                },
                inventedLl: {
                    authorizationStatus: inventedLl.authorizationStatus,
                    blockReason: inventedLl.blockReason,
                },
                poisoned: {
                    authorizationStatus: poisoned.authorizationStatus,
                    blockReason: poisoned.blockReason,
                },
            };
        })(),
        {
            cases: [
                { source: "cal-tlah", actual: ["cal-lah", "callah", "cn-l2-210-progressive-l-tl-ll"], expected: ["cal-lah", "callah", "cn-l2-210-progressive-l-tl-ll"], authorized: "authorized" },
                { source: "cal-yō", actual: ["cal-lō", "callō", "cn-l2-210-progressive-l-y-ll"], expected: ["cal-lō", "callō", "cn-l2-210-progressive-l-y-ll"], authorized: "authorized" },
                { source: "nequiz-yoh", actual: ["nequiz-zoh", "nequizzoh", "cn-l2-210-progressive-s-y-ss"], expected: ["nequiz-zoh", "nequizzoh", "cn-l2-210-progressive-s-y-ss"], authorized: "authorized" },
                { source: "tex-yoh", actual: ["tex-xoh", "texxoh", "cn-l2-210-progressive-x-y-xx"], expected: ["tex-xoh", "texxoh", "cn-l2-210-progressive-x-y-xx"], authorized: "authorized" },
                { source: "quetz-yoh", actual: ["quetz-tzoh", "quetztzoh", "cn-l2-210-progressive-tz-y-tztz"], expected: ["quetz-tzoh", "quetztzoh", "cn-l2-210-progressive-tz-y-tztz"], authorized: "authorized" },
                { source: "teach-yō", actual: ["teach-chō", "teachchō", "cn-l2-210-progressive-ch-y-chch"], expected: ["teach-chō", "teachchō", "cn-l2-210-progressive-ch-y-chch"], authorized: "authorized" },
            ],
            untouched: {
                analyzed: "cal-na",
                transformationApplied: false,
                authorizationStatus: "authorized",
            },
            inventedLl: {
                authorizationStatus: "blocked",
                blockReason: "ll-not-authorized-outside-lesson2-10-rules-1-2",
            },
            poisoned: {
                authorizationStatus: "blocked",
                blockReason: "requested-realization-conflicts-with-lesson2-10",
            },
        }
    );

    s.eq(
        "Classical Lesson 2.10 progressive assimilation reaches selected VNC output before class realization",
        (() => {
            const assimilated = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(cal-yō)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            const prohibitedLl = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(ol-lin)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "A",
            });
            return {
                status: assimilated.authorizationStatus,
                formula: assimilated.formulaRealization,
                classTargetStem: assimilated.classTargetStem,
                operationApplied: assimilated.progressiveAssimilationFrame?.transformationApplied,
                operationRuleIds: assimilated.selectedOutputLogicFrame?.outputFillers?.progressiveAssimilationRuleIds,
                prohibitedStatus: prohibitedLl.authorizationStatus,
                prohibitedFormula: prohibitedLl.formulaRealization,
                prohibitedReason: prohibitedLl.progressiveAssimilationFrame?.blockReason,
            };
        })(),
        {
            status: "authorized",
            formula: "#ni-0(cal-lo)0+0-0#",
            classTargetStem: "cal-lō",
            operationApplied: true,
            operationRuleIds: ["cn-l2-210-progressive-l-y-ll"],
            prohibitedStatus: "blocked",
            prohibitedFormula: "",
            prohibitedReason: "ll-not-authorized-outside-lesson2-10-rules-1-2",
        }
    );

    s.eq(
        "Classical Lesson 2.12 consonant loss follows Andrews optional and blocked cases",
        (() => {
            const tzW = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "tz",
                rightConsonant: "w",
            });
            const chW = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "č",
                rightConsonant: "hu",
            });
            const glottalH = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "ʔ",
                rightConsonant: "y",
            });
            const glottalY = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "glottal",
                rightConsonant: "y",
                firstConsonantLost: true,
            });
            const reduplicationBlocked = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "glottal",
                rightConsonant: "y",
                firstConsonantLost: true,
                reduplicationGlottal: true,
            });
            const initialY = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "y",
                position: "stem-initial",
            });
            const longVowelY = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "y",
                leftVowel: "ā",
                rightVowel: "ō",
            });
            const nasalY = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "m",
                rightConsonant: "y",
            });
            const nasalW = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "n",
                rightConsonant: "w",
            });
            const wW = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "w",
                rightConsonant: "w",
            });
            const badPair = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "p",
                rightConsonant: "t",
            });
            const spellingConflict = ctx.buildClassicalNahuatlLesson2ConsonantLossFrame({
                leftConsonant: "tz",
                rightConsonant: "w",
                requestedSpelling: "tzw",
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2ConsonantLossRules().length,
                tzW: {
                    selectedRuleId: tzW.selectedRuleId,
                    optional: tzW.optional,
                    lostConsonant: tzW.lostConsonant,
                    outputSpelling: tzW.outputSpelling,
                    premiseLayers: tzW.premises.map((premise) => premise.layer),
                },
                chW: {
                    selectedRuleId: chW.selectedRuleId,
                    outputSpelling: chW.outputSpelling,
                },
                glottalH: {
                    selectedRuleId: glottalH.selectedRuleId,
                    outputSpelling: glottalH.outputSpelling,
                    optional: glottalH.optional,
                },
                glottalY: {
                    selectedRuleId: glottalY.selectedRuleId,
                    lostSide: glottalY.lostSide,
                    outputSpelling: glottalY.outputSpelling,
                },
                reduplicationBlocked: {
                    authorizationStatus: reduplicationBlocked.authorizationStatus,
                    blockReason: reduplicationBlocked.blockReason,
                },
                initialY: {
                    selectedRuleId: initialY.selectedRuleId,
                    requiresGrammaticalConstruction: initialY.requiresGrammaticalConstruction,
                    lostConsonant: initialY.lostConsonant,
                },
                longVowelY: {
                    selectedRuleId: longVowelY.selectedRuleId,
                    outputSound: longVowelY.outputSound,
                    lostConsonant: longVowelY.lostConsonant,
                },
                nasalY: {
                    selectedRuleId: nasalY.selectedRuleId,
                    outputSpelling: nasalY.outputSpelling,
                    nasalizationTrace: nasalY.nasalizationTrace,
                },
                nasalW: {
                    selectedRuleId: nasalW.selectedRuleId,
                    outputSpelling: nasalW.outputSpelling,
                    nasalizationTrace: nasalW.nasalizationTrace,
                },
                wW: {
                    selectedRuleId: wW.selectedRuleId,
                    lostSide: wW.lostSide,
                    outputSpelling: wW.outputSpelling,
                },
                badPair: {
                    authorizationStatus: badPair.authorizationStatus,
                    blockReason: badPair.blockReason,
                },
                spellingConflict: {
                    authorizationStatus: spellingConflict.authorizationStatus,
                    blockReason: spellingConflict.blockReason,
                },
                exactWitness: tzW.exactWitness,
            };
        })(),
        {
            ruleCount: 11,
            tzW: {
                selectedRuleId: "cn-l2-212-tz-w-tz",
                optional: true,
                lostConsonant: "w",
                outputSpelling: "tz",
                premiseLayers: [
                    "consonant-sequence",
                    "grammatical-construction",
                    "loss-outcome",
                    "reduplication-block",
                    "requested-spelling",
                ],
            },
            chW: {
                selectedRuleId: "cn-l2-212-ch-w-ch",
                outputSpelling: "ch",
            },
            glottalH: {
                selectedRuleId: "cn-l2-212-glottal-y-h",
                outputSpelling: "h",
                optional: true,
            },
            glottalY: {
                selectedRuleId: "cn-l2-212-glottal-y-y",
                lostSide: "left",
                outputSpelling: "y",
            },
            reduplicationBlocked: {
                authorizationStatus: "blocked",
                blockReason: "reduplicative-glottal-blocks-rule",
            },
            initialY: {
                selectedRuleId: "cn-l2-212-initial-y-unstable-note",
                requiresGrammaticalConstruction: false,
                lostConsonant: "y",
            },
            longVowelY: {
                selectedRuleId: "cn-l2-212-y-between-long-a-o-vowels",
                outputSound: "long-vowel-sequence",
                lostConsonant: "y",
            },
            nasalY: {
                selectedRuleId: "cn-l2-212-nasal-y-y",
                outputSpelling: "ny",
                nasalizationTrace: true,
            },
            nasalW: {
                selectedRuleId: "cn-l2-212-nasal-w-w",
                outputSpelling: "nhu",
                nasalizationTrace: true,
            },
            wW: {
                selectedRuleId: "cn-l2-212-w-w-w",
                lostSide: "left",
                outputSpelling: "hu",
            },
            badPair: {
                authorizationStatus: "blocked",
                blockReason: "no-lesson2-consonant-loss-rule",
            },
            spellingConflict: {
                authorizationStatus: "blocked",
                blockReason: "requested-spelling-conflicts-with-consonant-loss-rule",
            },
            exactWitness: "1. /¢/ + /w/ > [¢]. This is an optional rule.",
        }
    );

    s.eq(
        "Classical Lesson 2.13 consonant-phone shift uses listed vowel and exposed-position environments",
        (() => {
            const glottalVowel = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "ʔ",
                followingVowel: "o",
            });
            const glottalDisappears = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "glottal",
                followingVowel: "i",
                intervocalicYDisappears: true,
            });
            const exposedM = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "m",
                position: "vocable-final",
            });
            const mReverts = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "m",
                position: "vocable-final",
                followingVocableBeginsWithVowel: true,
            });
            const exposedY = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "y",
                position: "syllable-final",
            });
            const yPriorS = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "y",
                position: "syllable-final",
                priorSSound: true,
            });
            const kwExposed = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "kʷ",
                position: "vocable-final",
            });
            const tFinal = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "t",
                position: "final",
            });
            const rareGlottal = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "glottal",
                position: "nonfinal",
            });
            const bad = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "p",
                position: "final",
            });
            const conflict = ctx.buildClassicalNahuatlLesson2ConsonantPhoneShiftFrame({
                sourceConsonant: "t",
                position: "final",
                requestedSpelling: "t",
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson2ConsonantPhoneShiftRules().length,
                glottalVowel: {
                    selectedRuleId: glottalVowel.selectedRuleId,
                    outputSpelling: glottalVowel.outputSpelling,
                    optional: glottalVowel.optional,
                    premiseLayers: glottalVowel.premises.map((premise) => premise.layer),
                },
                glottalDisappears: {
                    selectedRuleId: glottalDisappears.selectedRuleId,
                    outputSpelling: glottalDisappears.outputSpelling,
                    intervocalicYDisappears: glottalDisappears.intervocalicYDisappears,
                },
                exposedM: {
                    selectedRuleId: exposedM.selectedRuleId,
                    outputSound: exposedM.outputSound,
                    outputSpelling: exposedM.outputSpelling,
                },
                mReverts: {
                    selectedRuleId: mReverts.selectedRuleId,
                    outputSound: mReverts.outputSound,
                    revertsToOriginalM: mReverts.revertsToOriginalM,
                },
                exposedY: {
                    selectedRuleId: exposedY.selectedRuleId,
                    outputSpelling: exposedY.outputSpelling,
                    outputSound: exposedY.outputSound,
                },
                yPriorS: {
                    selectedRuleId: yPriorS.selectedRuleId,
                    outputSpelling: yPriorS.outputSpelling,
                    outputSound: yPriorS.outputSound,
                },
                kwExposed: {
                    selectedRuleId: kwExposed.selectedRuleId,
                    outputSpelling: kwExposed.outputSpelling,
                    optional: kwExposed.optional,
                },
                tFinal: {
                    selectedRuleId: tFinal.selectedRuleId,
                    outputSpelling: tFinal.outputSpelling,
                    optional: tFinal.optional,
                },
                rareGlottal: {
                    selectedRuleId: rareGlottal.selectedRuleId,
                    outputSpelling: rareGlottal.outputSpelling,
                    rare: rareGlottal.rare,
                },
                bad: {
                    authorizationStatus: bad.authorizationStatus,
                    blockReason: bad.blockReason,
                },
                conflict: {
                    authorizationStatus: conflict.authorizationStatus,
                    blockReason: conflict.blockReason,
                },
                exactWitness: glottalVowel.exactWitness,
            };
        })(),
        {
            ruleCount: 9,
            glottalVowel: {
                selectedRuleId: "cn-l2-213-glottal-vowel-y",
                outputSpelling: "yo",
                optional: true,
                premiseLayers: [
                    "grammatical-construction",
                    "environment",
                    "phone-shift-selection",
                    "output-phone",
                    "requested-spelling",
                ],
            },
            glottalDisappears: {
                selectedRuleId: "cn-l2-213-intervocalic-y-disappears",
                outputSpelling: "i",
                intervocalicYDisappears: true,
            },
            exposedM: {
                selectedRuleId: "cn-l2-213-m-exposed-n",
                outputSound: "n̥",
                outputSpelling: "n",
            },
            mReverts: {
                selectedRuleId: "cn-l2-213-m-exposed-n",
                outputSound: "m",
                revertsToOriginalM: true,
            },
            exposedY: {
                selectedRuleId: "cn-l2-213-y-exposed-x",
                outputSpelling: "x",
                outputSound: "š",
            },
            yPriorS: {
                selectedRuleId: "cn-l2-213-y-exposed-prior-s",
                outputSpelling: "z",
                outputSound: "s",
            },
            kwExposed: {
                selectedRuleId: "cn-l2-213-kw-exposed-k",
                outputSpelling: "c",
                optional: true,
            },
            tFinal: {
                selectedRuleId: "cn-l2-213-t-final-h",
                outputSpelling: "h",
                optional: true,
            },
            rareGlottal: {
                selectedRuleId: "cn-l2-213-rare-glottal-nonfinal-t",
                outputSpelling: "t",
                rare: true,
            },
            bad: {
                authorizationStatus: "blocked",
                blockReason: "no-lesson2-consonant-phone-shift-rule",
            },
            conflict: {
                authorizationStatus: "blocked",
                blockReason: "requested-spelling-conflicts-with-consonant-phone-shift-rule",
            },
            exactWitness: "1. /ʔ/ + /vowel/ > [y] + [vowel]. This is an optional change.",
        }
    );

    s.eq(
        "Classical Lesson 2.14-2.16 final orthography rules gate elision, glottal morphs, and prosodic contour output",
        (() => {
            const elision = ctx.buildClassicalNahuatlLesson2VowelElisionFrame({
                vowelLength: "short",
                stressGroupCombination: true,
            });
            const longBlocked = ctx.buildClassicalNahuatlLesson2VowelElisionFrame({
                vowelLength: "long",
            });
            const supportiveI = ctx.buildClassicalNahuatlLesson2VowelElisionFrame({
                supportiveI: true,
            });
            const spellingChange = ctx.buildClassicalNahuatlLesson2VowelElisionFrame({
                ruleId: "cn-l2-214-spelling-change-required",
                indicatedInWriting: true,
            });
            const glottal = ctx.buildClassicalNahuatlLesson2LongVowelGlottalFrame({
                morpheme: "teō",
                compoundSubposition: "embed",
                matrixMorpheme: "calli",
            });
            const glottalBadMorpheme = ctx.buildClassicalNahuatlLesson2LongVowelGlottalFrame({
                morpheme: "nemi",
                compoundSubposition: "embed",
                matrixMorpheme: "calli",
            });
            const glottalBadPosition = ctx.buildClassicalNahuatlLesson2LongVowelGlottalFrame({
                morpheme: "teō",
                compoundSubposition: "matrix",
                matrixMorpheme: "calli",
            });
            const knownStress = ctx.buildClassicalNahuatlLesson2ProsodicContourFrame({
                contourType: "nuclear-clause-stress",
            });
            const lowPitch = ctx.buildClassicalNahuatlLesson2ProsodicContourFrame({
                contourType: "long-final-vowel-low-pitch",
            });
            const unknownSentence = ctx.buildClassicalNahuatlLesson2ProsodicContourFrame({
                contourType: "sentential-prosody",
            });
            return {
                ruleCounts: {
                    vowelElision: ctx.getClassicalNahuatlLesson2VowelElisionRules().length,
                    longVowelGlottal: ctx.getClassicalNahuatlLesson2LongVowelGlottalRules().length,
                    prosodicContour: ctx.getClassicalNahuatlLesson2ProsodicContourRules().length,
                },
                elision: {
                    selectedRuleId: elision.selectedRuleId,
                    authorizationStatus: elision.authorizationStatus,
                    properElision: elision.properElision,
                },
                longBlocked: {
                    authorizationStatus: longBlocked.authorizationStatus,
                    blockReason: longBlocked.blockReason,
                },
                supportiveI: {
                    selectedRuleId: supportiveI.selectedRuleId,
                    properElision: supportiveI.properElision,
                },
                spellingChange: {
                    selectedRuleId: spellingChange.selectedRuleId,
                    spellingChangeOftenNecessary: spellingChange.spellingChangeOftenNecessary,
                },
                glottal: {
                    selectedRuleId: glottal.selectedRuleId,
                    outputMorphType: glottal.outputMorphType,
                    authorizationStatus: glottal.authorizationStatus,
                    premiseLayers: glottal.premises.map((premise) => premise.layer),
                },
                glottalBadMorpheme: {
                    authorizationStatus: glottalBadMorpheme.authorizationStatus,
                    blockReason: glottalBadMorpheme.blockReason,
                },
                glottalBadPosition: {
                    authorizationStatus: glottalBadPosition.authorizationStatus,
                    blockReason: glottalBadPosition.blockReason,
                },
                knownStress: {
                    selectedRuleId: knownStress.selectedRuleId,
                    authorizationStatus: knownStress.authorizationStatus,
                    outputGenerationAllowed: knownStress.outputGenerationAllowed,
                },
                lowPitch: {
                    selectedRuleId: lowPitch.selectedRuleId,
                    authorizationStatus: lowPitch.authorizationStatus,
                },
                unknownSentence: {
                    selectedRuleId: unknownSentence.selectedRuleId,
                    authorizationStatus: unknownSentence.authorizationStatus,
                    blockReason: unknownSentence.blockReason,
                    outputGenerationAllowed: unknownSentence.outputGenerationAllowed,
                },
                witnesses: [
                    elision.exactWitness,
                    glottal.exactWitness,
                    unknownSentence.exactWitness,
                ],
            };
        })(),
        {
            ruleCounts: {
                vowelElision: 5,
                longVowelGlottal: 5,
                prosodicContour: 4,
            },
            elision: {
                selectedRuleId: "cn-l2-214-short-vowel-stress-group-elision",
                authorizationStatus: "authorized",
                properElision: true,
            },
            longBlocked: {
                authorizationStatus: "blocked",
                blockReason: "long-vowel-resists-elision",
            },
            supportiveI: {
                selectedRuleId: "cn-l2-214-supportive-i-not-proper-elision",
                properElision: false,
            },
            spellingChange: {
                selectedRuleId: "cn-l2-214-spelling-change-required",
                spellingChangeOftenNecessary: true,
            },
            glottal: {
                selectedRuleId: "cn-l2-215-irregular-short-vowel-glottal-morph",
                outputMorphType: "short-vowel-plus-glottal-stop",
                authorizationStatus: "authorized",
                premiseLayers: [
                    "small-morpheme-class",
                    "embed-subposition",
                    "matrix-determination",
                ],
            },
            glottalBadMorpheme: {
                authorizationStatus: "blocked",
                blockReason: "morpheme-not-in-small-permitted-class",
            },
            glottalBadPosition: {
                authorizationStatus: "blocked",
                blockReason: "not-embed-subposition",
            },
            knownStress: {
                selectedRuleId: "cn-l2-216-known-stress-rules",
                authorizationStatus: "authorized",
                outputGenerationAllowed: true,
            },
            lowPitch: {
                selectedRuleId: "cn-l2-216-long-final-vowel-low-pitch",
                authorizationStatus: "authorized",
            },
            unknownSentence: {
                selectedRuleId: "cn-l2-216-sentential-prosody-unknown",
                authorizationStatus: "blocked",
                blockReason: "sentential-prosody-lacks-information",
                outputGenerationAllowed: false,
            },
            witnesses: [
                "An initial or final short vowel of certain vocables can be elided",
                "certain morphemes with a long\nfinal vowel have in their morphic repertory an irregular morph that has a short vowel plus a glottal\nstop",
                "practically nothing is known of the language's sentential prosodic features",
            ],
        }
    );

    s.eq(
        "Classical tab Lesson 2 frame does not reuse the Nawat bridge conversion",
        {
            classical: ctx.buildClassicalNahuatlLesson2OrthographyFrame("xochitl").surface,
            nawatBridge: ctx.getClassicalLettersAsNawat("xochitl"),
            classicalBridgePolicy: ctx.buildClassicalNahuatlLesson2OrthographyFrame("xochitl").nawatPipilOrthographyBridge,
        },
        {
            classical: "xochitl",
            nawatBridge: "shuchit",
            classicalBridgePolicy: "not-applied",
        }
    );

    s.eq(
        "Classical Lesson 2 machinery is the active Transcription path",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson2MachineryFrame("xochitl");
            const blocked = ctx.buildClassicalNahuatlLesson2MachineryFrame("kw");
            return {
                kind: frame.kind,
                lessonTitle: frame.lessonTitle,
                machineryScope: frame.machineryScope,
                activeAuthority: frame.activeAuthority,
                output: frame.output,
                outputForms: frame.outputForms,
                acceptsInput: frame.acceptsInput,
                sourceProfileId: frame.sourceProfileId,
                targetProfileId: frame.targetProfileId,
                controllingFrameKind: frame.controllingFrameKind,
                nawatPipilSystem: frame.nawatPipilSystem,
                nawatPipilOrthographyBridge: frame.nawatPipilOrthographyBridge,
                grammarGenerationAllowed: frame.grammarGenerationAllowed,
                blockedOutput: blocked.output,
                blocksInput: blocked.blocksInput,
                blockedReason: blocked.blockReason,
                blockedInvalidGraphemes: blocked.orthographyFrame.invalidGraphemes,
            };
        })(),
        {
            kind: "classical-nahuatl-lesson2-machinery-frame",
            lessonTitle: "Pronunciation. Orthography",
            machineryScope: "pronunciation-orthography",
            activeAuthority: "Andrews transcription",
            output: "xochitl",
            outputForms: ["xochitl"],
            acceptsInput: true,
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "classical-nahuatl",
            controllingFrameKind: "classical-nahuatl-lesson2-orthography-frame",
            nawatPipilSystem: "not-used",
            nawatPipilOrthographyBridge: "not-applied",
            grammarGenerationAllowed: false,
            blockedOutput: "",
            blocksInput: true,
            blockedReason: "invalid-lesson2-graphemes",
            blockedInvalidGraphemes: ["k", "w"],
        }
    );

    s.eq(
        "Classical Lesson 3 machinery preserves Andrews particle transcription directly",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson3ParticlesFrame("tla");
            const cuix = ctx.buildClassicalNahuatlLesson3ParticlesFrame("cuix");
            const groupedCount = frame.inventoryGroups.reduce((sum, group) => sum + group.entries.length, 0);
            return {
                kind: frame.kind,
                lessonTitle: frame.lessonTitle,
                machineryScope: frame.machineryScope,
                activeAuthority: frame.activeAuthority,
                output: frame.output,
                candidateSection: frame.candidateEntry?.section || "",
                sourceProfileId: frame.sourceProfileId,
                targetProfileId: frame.targetProfileId,
                outputLanguage: frame.outputLanguage,
                outputAuthority: frame.outputAuthority,
                bridge: frame.nawatPipilOrthographyBridge,
                nawatPipilSystem: frame.nawatPipilSystem,
                grammarGenerationAllowed: frame.grammarGenerationAllowed,
                groupedCountMatches: groupedCount === frame.entries.length,
                cuixOutput: cuix.output,
                oldBridgeWouldChangeTla: ctx.getClassicalLettersAsNawat("tla"),
            };
        })(),
        {
            kind: "classical-nahuatl-lesson3-particles-machinery-frame",
            lessonTitle: "Particles",
            machineryScope: "particles",
            activeAuthority: "Andrews transcription",
            output: "tla",
            candidateSection: "3.2.1",
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "classical-nahuatl",
            outputLanguage: "Classical Nahuatl",
            outputAuthority: "Andrews transcription",
            bridge: "not-applied",
            nawatPipilSystem: "not-used",
            grammarGenerationAllowed: false,
            groupedCountMatches: true,
            cuixOutput: "cuix?",
            oldBridgeWouldChangeTla: "ta",
        }
    );

    s.eq(
        "Classical Lesson 3 rule logic is particle authority only",
        (() => {
            const functional = ctx.buildClassicalNahuatlLesson3FunctionalClassFrame("auh");
            const ah = ctx.buildClassicalNahuatlLesson3NegativizingParticleFrame("ah#");
            const caNeedsContext = ctx.buildClassicalNahuatlLesson3NegativizingParticleFrame("ca#");
            const caAfterMa = ctx.buildClassicalNahuatlLesson3NegativizingParticleFrame("ca#", {
                precedingParticle: "ma",
            });
            const collocation = ctx.buildClassicalNahuatlLesson3ParticleCollocationFrame("in tla ca#");
            const honorific = ctx.buildClassicalNahuatlLesson3HonorificizedParticleFrame("ca no zotzin");
            return {
                functionalKind: functional.kind,
                functionalStatus: functional.authorizationStatus,
                functionalScopes: functional.proofFrame.conclusion.authorizedFunctionScopes,
                functionalNuclear: functional.proofFrame.conclusion.authorizedForNuclearClause,
                ahStatus: ah.authorizationStatus,
                ahPrefix: ah.proofFrame.conclusion.negativePrefix,
                caNeedsContext: caNeedsContext.authorizationStatus,
                caContextRequired: caNeedsContext.caContextRequired,
                caAfterMaStatus: caAfterMa.authorizationStatus,
                caAfterMaContext: caAfterMa.caContext,
                caSentenceNegation: caAfterMa.proofFrame.conclusion.sentenceNegationAllowed,
                collocationStatus: collocation.authorizationStatus,
                collocationComponents: collocation.components,
                collocationWrittenSeparate: collocation.proofFrame.premises.find((premise) => premise.layer === "written-separately")?.passed,
                collocationNuclear: collocation.proofFrame.conclusion.authorizedForNuclearClause,
                honorificStatus: honorific.authorizationStatus,
                honorificFinalMember: honorific.proofFrame.conclusion.finalMember,
                honorificWholeCollocation: honorific.proofFrame.conclusion.entireCollocationHonorific,
                honorificNuclear: honorific.proofFrame.conclusion.authorizedForNuclearClause,
            };
        })(),
        {
            functionalKind: "classical-nahuatl-lesson3-functional-class-frame",
            functionalStatus: "authorized",
            functionalScopes: ["conjunctor", "interjection"],
            functionalNuclear: false,
            ahStatus: "authorized",
            ahPrefix: "ah#",
            caNeedsContext: "context-required",
            caContextRequired: true,
            caAfterMaStatus: "authorized",
            caAfterMaContext: "ma",
            caSentenceNegation: false,
            collocationStatus: "authorized",
            collocationComponents: ["in", "tla", "ca#"],
            collocationWrittenSeparate: true,
            collocationNuclear: false,
            honorificStatus: "authorized",
            honorificFinalMember: "zo",
            honorificWholeCollocation: true,
            honorificNuclear: false,
        }
    );

    s.eq(
        "Classical Lesson 4 machinery makes the nuclear-clause formula frame authoritative",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson4NuclearClauseFrame("(tlacatl)");
            return {
                kind: frame.kind,
                lessonTitle: frame.lessonTitle,
                machineryScope: frame.machineryScope,
                activeAuthority: frame.activeAuthority,
                stem: frame.stem,
                predicate: frame.predicateFrame.display,
                formula: frame.formulaRealization,
                selectedNuclearClauseKind: frame.selectedNuclearClauseKind,
                vncFormulaCount: frame.vncFormulaFrames.length,
                nncFormulaCount: frame.nncFormulaFrames.length,
                tenseSlot: frame.predicateFrame.tenseSlot,
                sourceProfileId: frame.sourceProfileId,
                targetProfileId: frame.targetProfileId,
                bridge: frame.nawatPipilOrthographyBridge,
                nawatPipilSystem: frame.nawatPipilSystem,
                grammarGenerationAllowed: frame.grammarGenerationAllowed,
                surfaceGenerationAllowed: frame.surfaceGenerationAllowed,
                proofKind: frame.proofFrame.proofKind,
                proofStatus: frame.proofFrame.proofStatus,
                proofDepth: frame.proofFrame.proofDepth,
                proofPremises: frame.proofFrame.premises.map((premise) => premise.passed),
                proofConclusionAuthorized: frame.proofFrame.conclusion.authorized,
                proofFormula: frame.proofFrame.conclusion.authorizedFormula,
                personalPronounKind: frame.personalPronounFrame.kind,
                personalPronounStatus: frame.personalPronounFrame.authorizationStatus,
                personalPronounCase: frame.personalPronounFrame.pronounCase,
                personalPronounSlots: frame.personalPronounFrame.proofFrame.conclusion.formulaSlots,
                personalPronounGenderAllowed: frame.personalPronounFrame.genderFeatureAllowed,
                oldBridgeWouldChangeTlacatl: ctx.getClassicalLettersAsNawat("tlacatl"),
            };
        })(),
        {
            kind: "classical-nahuatl-lesson4-nuclear-clause-machinery-frame",
            lessonTitle: "Nuclear Clauses",
            machineryScope: "nuclear-clause-formula",
            activeAuthority: "Andrews transcription",
            stem: "tlacatl",
            predicate: "(tlacatl)",
            formula: "#pers1-pers2(tlacatl)num1-num2#",
            selectedNuclearClauseKind: "nominal-nuclear-clause",
            vncFormulaCount: 3,
            nncFormulaCount: 3,
            tenseSlot: "none",
            sourceProfileId: "classical-nahuatl",
            targetProfileId: "classical-nahuatl",
            bridge: "not-applied",
            nawatPipilSystem: "not-used",
            grammarGenerationAllowed: false,
            surfaceGenerationAllowed: false,
            proofKind: "logic-proof",
            proofStatus: "proven",
            proofDepth: "rule-chain",
            proofPremises: [true, true, true, true, true, true],
            proofConclusionAuthorized: true,
            proofFormula: "#pers1-pers2(tlacatl)num1-num2#",
            personalPronounKind: "classical-nahuatl-lesson4-personal-pronoun-frame",
            personalPronounStatus: "authorized",
            personalPronounCase: "nominative",
            personalPronounSlots: ["pers1-pers2", "num1-num2"],
            personalPronounGenderAllowed: false,
            oldBridgeWouldChangeTlacatl: "takat",
        }
    );

    s.eq(
        "Classical Lesson 4 personal pronouns are affixal formula-position logic",
        (() => {
            const nominativeNnc = ctx.buildClassicalNahuatlLesson4PersonalPronounFrame({
                pronounCase: "nominative",
                nuclearClauseKind: "nominal-nuclear-clause",
                positionRole: "subject",
            });
            const objectiveVnc = ctx.buildClassicalNahuatlLesson4PersonalPronounFrame({
                pronounCase: "objective",
                nuclearClauseKind: "verbal-nuclear-clause",
                positionRole: "predicate",
            });
            const objectiveNnc = ctx.buildClassicalNahuatlLesson4PersonalPronounFrame({
                pronounCase: "objective",
                nuclearClauseKind: "nominal-nuclear-clause",
                positionRole: "predicate",
            });
            const possessiveNnc = ctx.buildClassicalNahuatlLesson4PersonalPronounFrame({
                pronounCase: "possessive",
                nuclearClauseKind: "nominal-nuclear-clause",
                positionRole: "predicate",
            });
            const gendered = ctx.buildClassicalNahuatlLesson4PersonalPronounFrame({
                pronounCase: "nominative",
                nuclearClauseKind: "verbal-nuclear-clause",
                positionRole: "subject",
                gender: "feminine",
            });
            return {
                ruleCount: ctx.getClassicalNahuatlLesson4PersonalPronounRules().length,
                caseFrames: ctx.getClassicalNahuatlLesson4PersonalPronounCaseFrames().map((frame) => ({
                    id: frame.id,
                    formulaRegion: frame.formulaRegion,
                    allowedClauseKinds: frame.allowedClauseKinds,
                    formulaSlots: frame.formulaSlots,
                })),
                statuses: [
                    nominativeNnc.authorizationStatus,
                    objectiveVnc.authorizationStatus,
                    objectiveNnc.authorizationStatus,
                    possessiveNnc.authorizationStatus,
                    gendered.authorizationStatus,
                ],
                slots: {
                    nominativeNnc: nominativeNnc.proofFrame.conclusion.formulaSlots,
                    objectiveVnc: objectiveVnc.proofFrame.conclusion.formulaSlots,
                    possessiveNnc: possessiveNnc.proofFrame.conclusion.formulaSlots,
                },
                genderAllowed: gendered.genderFeatureAllowed,
                genderPremise: gendered.proofFrame.premises.find((premise) => premise.layer === "no-gender-category")?.passed,
                bridge: nominativeNnc.nawatPipilOrthographyBridge,
                fillerGenerationAllowed: nominativeNnc.fillerGenerationAllowed,
            };
        })(),
        {
            ruleCount: 5,
            caseFrames: [
                {
                    id: "nominative",
                    formulaRegion: "subject",
                    allowedClauseKinds: ["verbal-nuclear-clause", "nominal-nuclear-clause"],
                    formulaSlots: ["pers1-pers2", "num1-num2"],
                },
                {
                    id: "objective",
                    formulaRegion: "vnc-predicate",
                    allowedClauseKinds: ["verbal-nuclear-clause"],
                    formulaSlots: ["va1-va2", "va"],
                },
                {
                    id: "possessive",
                    formulaRegion: "nnc-predicate",
                    allowedClauseKinds: ["nominal-nuclear-clause"],
                    formulaSlots: ["st1-st2", "st"],
                },
            ],
            statuses: ["authorized", "authorized", "blocked", "authorized", "blocked"],
            slots: {
                nominativeNnc: ["pers1-pers2", "num1-num2"],
                objectiveVnc: ["va1-va2", "va"],
                possessiveNnc: ["st1-st2", "st"],
            },
            genderAllowed: false,
            genderPremise: false,
            bridge: "not-applied",
            fillerGenerationAllowed: false,
        }
    );

    s.eq(
        "Classical Lesson 4 selects VNC formulas from active transitivity instead of defaulting to NNC",
        (() => {
            const intransitive = ctx.buildClassicalNahuatlLesson4NuclearClauseFrame("(ilpia)", {
                tenseMode: "verbo",
                transitivity: "intransitive",
            });
            const transitive = ctx.buildClassicalNahuatlLesson4NuclearClauseFrame("(ilpia)", {
                tenseMode: "verbo",
                transitivity: "transitive",
            });
            const dashedTransitive = ctx.buildClassicalNahuatlLesson4NuclearClauseFrame("-(ilpia)", {
                tenseMode: "verbo",
                transitivity: "transitive",
            });
            return {
                intransitiveKind: intransitive.selectedNuclearClauseKind,
                intransitiveFormulaId: intransitive.selectedFormulaId,
                intransitiveFormula: intransitive.formulaRealization,
                intransitivePredicateKind: intransitive.predicateFrame.predicateKind,
                intransitivePredicateTenseSlot: intransitive.predicateFrame.tenseSlot,
                intransitiveReason: intransitive.selectedFormulaReason,
                transitiveFormulaId: transitive.selectedFormulaId,
                transitiveFormula: transitive.formulaRealization,
                transitiveReason: transitive.selectedFormulaReason,
                dashedTransitiveStem: dashedTransitive.stem,
                dashedTransitivePredicate: dashedTransitive.predicateFrame.display,
                dashedTransitiveFormula: dashedTransitive.formulaRealization,
                proofFormulaId: dashedTransitive.proofFrame.conclusion.authorizedFormulaId,
                proofPremiseRules: dashedTransitive.proofFrame.premises.map((premise) => premise.layer),
                proofCarriesForward: dashedTransitive.proofFrame.nextLessonContract.carriesForward,
                stage3Formula: dashedTransitive.stageFrames.find((stage) => stage.id === "lesson4-stage3")?.formula || "",
            };
        })(),
        {
            intransitiveKind: "verbal-nuclear-clause",
            intransitiveFormulaId: "vnc-valence-vacant",
            intransitiveFormula: "#pers1-pers2(ilpia)tns+num1-num2#",
            intransitivePredicateKind: "verbal-predicate",
            intransitivePredicateTenseSlot: "present",
            intransitiveReason: "verbal-intransitive-selection",
            transitiveFormulaId: "vnc-valence-dyadic",
            transitiveFormula: "#pers1-pers2+va1-va2(ilpia)tns+num1-num2#",
            transitiveReason: "verbal-transitive-selection",
            dashedTransitiveStem: "ilpia",
            dashedTransitivePredicate: "(ilpia)",
            dashedTransitiveFormula: "#pers1-pers2+va1-va2(ilpia)tns+num1-num2#",
            proofFormulaId: "vnc-valence-dyadic",
            proofPremiseRules: [
                "orthography-pronunciation",
                "particles",
                "nuclear-clause-formulas",
                "personal-pronouns",
                "predicate-boundary",
                "formula-selection",
            ],
            proofCarriesForward: [
                "sourceProfileId",
                "stem",
                "authorizedClauseKind",
                "authorizedFormulaId",
                "authorizedFormula",
                "predicateStemBoundary",
                "subjectConnectorBoundary",
                "personalPronounProofStatus",
                "lesson2ProofStatus",
                "lesson3ProofStatus",
            ],
            stage3Formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
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
            "Classical Nahuatl tab output uses Andrews transcription directly, not the Nawat/Pipil orthography bridge",
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
