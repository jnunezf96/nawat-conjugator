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
    ], ["function", "function", "function", "function", "function"]);

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
