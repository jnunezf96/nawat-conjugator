// Dev-only browser verification for the regex/composer architecture.
// This file stays intentionally small and only guards the live translation path.

(() => {
    "use strict";

    function createCollector() {
        const failures = [];
        return {
            failures,
            equal(label, actual, expected) {
                const actualJson = JSON.stringify(actual);
                const expectedJson = JSON.stringify(expected);
                if (actualJson !== expectedJson) {
                    failures.push(`${label}: expected ${expectedJson} but got ${actualJson}`);
                }
            },
            truthy(label, value) {
                if (!value) {
                    failures.push(`${label}: expected truthy value`);
                }
            },
        };
    }

    function summarize(label, total, collector) {
        const summary = {
            total,
            passed: total - collector.failures.length,
            failed: collector.failures.length,
            failures: collector.failures,
        };
        if (summary.failed > 0) {
            console.error(`${label} failed:`, summary);
        } else {
            console.log(`${label} passed:`, summary);
        }
        return summary;
    }

    function getComposerSurfaceElements() {
        return {
            verbInput: document.getElementById("verb"),
            mirrorContent: document.getElementById("verb-mirror-content"),
        };
    }

    function withComposerSnapshot(callback) {
        const { verbInput } = getComposerSurfaceElements();
        const snapshot = {
            state: { ...VERB_COMPOSER_STATE },
            mode: isVerbInputModeComposer() ? VERB_INPUT_MODE.composer : VERB_INPUT_MODE.regex,
            value: verbInput?.value || "",
            prevValue: verbInput?.dataset.prevValue || "",
        };
        try {
            return callback();
        } finally {
            Object.assign(VERB_COMPOSER_STATE, snapshot.state);
            renderVerbComposerFromState();
            if (verbInput) {
                verbInput.value = snapshot.value;
                verbInput.dataset.prevValue = snapshot.prevValue;
            }
            setVerbInputMode(snapshot.mode, { syncFromInput: false });
            if (verbInput) {
                verbInput.value = snapshot.value;
                verbInput.dataset.prevValue = snapshot.prevValue;
            }
            renderVerbMirror();
        }
    }

    function runRegexEnvelopeLanguageTests() {
        const collector = createCollector();

        [
            { input: "(tzin/pewa)", dashPrefix: "", coreText: "tzin/pewa" },
            { input: "(shuchi-temua)", dashPrefix: "", coreText: "shuchi-temua" },
            { input: "(a/T-i)", dashPrefix: "", coreText: "a/T-i" },
            { input: "-(TA-ish/piya)", dashPrefix: "-", coreText: "TA-ish/piya" },
            { input: "-(kal-ish/piya)", dashPrefix: "-", coreText: "kal-ish/piya" },
            { input: "(michti1)", dashPrefix: "", coreText: "michti1" },
            { input: "([i]stat)", dashPrefix: "", coreText: "[i]stat" },
        ].forEach((testCase) => {
            const parsed = parseRegexEnvelope(testCase.input);
            collector.truthy(`${testCase.input} valid`, parsed.isValid);
            collector.equal(`${testCase.input} dashPrefix`, parsed.dashPrefix, testCase.dashPrefix);
            collector.equal(`${testCase.input} coreText`, parsed.coreText, testCase.coreText);
            collector.equal(`${testCase.input} displayVerb`, parsed.displayVerb, testCase.input);
        });

        [
            ["tzin/pewa", "core-envelope"],
            ["-(kal-ish/piya", "core-envelope"],
            ["-(kal-ish/piya))", "core-envelope"],
            ["-(kal-ish/piya)?-lis", "search"],
            ["((i)stat)", "legacy-parentheses"],
            ["((ta)/piya)", "legacy-parentheses"],
        ].forEach(([input, expected]) => {
            collector.equal(
                `${input} invalid`,
                getInvalidVerbStructure(input, { expectRegexEnvelope: true }),
                expected
            );
        });

        const translatedLegacy = convertLegacyBaseToRegexEnvelopeParts("a/(t)-i");
        collector.equal("legacy a/(t)-i displayVerb", translatedLegacy.displayVerb, "(a/T-i)");
        collector.equal("legacy a/(t)-i coreText", translatedLegacy.coreText, "a/T-i");
        collector.equal("serialize canonical tzin/pewa", serializeCanonicalRegexEnvelope("tzin/pewa"), "(tzin/pewa)");
        collector.equal("serialize canonical a/t-i", serializeCanonicalRegexEnvelope("a/t-i"), "(a/T-i)");
        collector.equal("regex input from envelope (a/T-i)", serializeRegexInputValue("(a/T-i)"), "a/(t)-i");
        collector.equal("regex input from envelope (michti1)", serializeRegexInputValue("(michti1)"), "michti1");

        return summarize("Regex envelope language tests", 17, collector);
    }

    function runVerbModeTranslationChecks() {
        const collector = createCollector();
        const cases = [
            {
                regex: "tzin/pewa",
                composerScreen: "(tzin-pewa)",
                envelope: "(tzin/pewa)",
            },
            {
                regex: "-(ta)-ish/piya",
                composerScreen: "-(ta-ish-piya)",
                envelope: "-(TA-ish/piya)",
            },
            {
                regex: "-kal-ish/piya",
                composerScreen: "-(kal-ish-piya)",
                envelope: "-(kal-ish/piya)",
            },
            {
                regex: "a/(t)-i",
                composerScreen: "(a-t-i)",
                envelope: "(a/T-i)",
            },
            {
                regex: "michti1",
                composerScreen: "(michti1)",
                envelope: "(michti1)",
            },
            {
                regex: "-(i)tta",
                composerScreen: "-(itta)",
                envelope: "-([i]tta)",
            },
            {
                regex: "(tajta)-ish/piya",
                composerScreen: "(tajta-ish-piya)",
                envelope: "((tajta)-ish/piya)",
            },
            {
                regex: "(tejte)-ish/piya",
                composerScreen: "(tejte-ish-piya)",
                envelope: "((tejte)-ish/piya)",
            },
            {
                regex: "-(mujmu)-ish/piya",
                composerScreen: "-(mujmu-ish-piya)",
                envelope: "-((mujmu)-ish/piya)",
            },
        ];

        withComposerSnapshot(() => {
            cases.forEach((testCase) => {
                const parsedState = parseComposerStateFromRegexValue(testCase.regex);
                const composerBundle = buildComposerModeBundle(parsedState);
                const regexSource = resolveVerbInputSource(testCase.regex, { mode: VERB_INPUT_MODE.regex });

                collector.equal(`${testCase.regex} regex rebuild`, buildLegacyRegexBaseFromComposerState(parsedState), testCase.regex);
                collector.equal(`${testCase.regex} composer display`, composerBundle.displayValue, testCase.composerScreen);
                collector.equal(`${testCase.regex} envelope`, composerBundle.envelopeValue, testCase.envelope);
                collector.equal(`${testCase.regex} regex source display`, regexSource.displayValue, testCase.regex);
                collector.equal(`${testCase.regex} regex source regex`, regexSource.regexValue, testCase.regex);
                collector.equal(`${testCase.regex} regex source parse`, regexSource.parseValue, testCase.regex);
                collector.equal(`${testCase.regex} regex source mode`, regexSource.mode, VERB_INPUT_MODE.regex);

                Object.assign(VERB_COMPOSER_STATE, parsedState, { mode: VERB_INPUT_MODE.composer });
                const resolvedSource = resolveVerbInputSource(testCase.composerScreen, { mode: VERB_INPUT_MODE.composer });
                collector.equal(`${testCase.regex} composer source display`, resolvedSource.displayValue, testCase.composerScreen);
                collector.equal(`${testCase.regex} composer source regex`, resolvedSource.regexValue, testCase.regex);
                collector.equal(`${testCase.regex} composer source parse`, resolvedSource.parseValue, testCase.regex);
            });
        });

        return summarize("Verb mode translation checks", cases.length * 10, collector);
    }

    function runComposerWritebackChecks() {
        const collector = createCollector();
        const { verbInput, mirrorContent } = getComposerSurfaceElements();
        if (!verbInput || !mirrorContent) {
            collector.failures.push("missing composer surface");
            return summarize("Composer writeback checks", 1, collector);
        }

        withComposerSnapshot(() => {
            [
                { token: "tajta", rooted: "(tajta-ketza)", placeholder: "(tajta)-_" },
                { token: "tejte", rooted: "(tejte-ketza)", placeholder: "(tejte)-_" },
                { token: "mujmu", rooted: "(mujmu-ketza)", placeholder: "(mujmu)-_" },
            ].forEach((testCase) => {
                Object.assign(VERB_COMPOSER_STATE, {
                    mode: VERB_INPUT_MODE.composer,
                    transitivity: COMPOSER_TRANSITIVITY.transitive,
                    valenceIntransitive: "",
                    valenceIntransitiveEmbed: "",
                    valence: testCase.token,
                    valenceEmbedPrimary: "",
                    valenceSecondary: "",
                    valenceEmbedSecondary: "",
                    slotAStem: "",
                    slotAEmbed: "",
                    slotBStem: "ketza",
                    slotBEmbed: "",
                    slotCStem: "",
                    slotCEmbed: "",
                    supportiveI: false,
                    tiCausativeClass: "",
                    preserveRawRegexBase: false,
                    rawRegexBase: "",
                });
                renderVerbComposerFromState();
                applyComposerStateToVerbInput({ triggerGenerate: false });
                generateWord({ skipValidation: true });
                collector.equal(`${testCase.token} rooted input`, verbInput.value, testCase.rooted);
                collector.equal(`${testCase.token} rooted mirror`, String(mirrorContent.textContent || "").trim(), testCase.rooted);

                VERB_COMPOSER_STATE.slotBStem = "";
                renderVerbComposerFromState();
                applyComposerStateToVerbInput({ triggerGenerate: false });
                generateWord({ skipValidation: true });
                collector.equal(`${testCase.token} placeholder input`, verbInput.value, testCase.placeholder);
                collector.equal(`${testCase.token} placeholder mirror`, String(mirrorContent.textContent || "").trim(), testCase.placeholder);
            });
        });

        return summarize("Composer writeback checks", 12, collector);
    }

    function runComposerPlaceholderChecks() {
        const collector = createCollector();

        collector.equal("display _", serializeComposerDisplayValue("_"), "(_)");
        collector.equal("display -_", serializeComposerDisplayValue("-_"), "-(_)");
        collector.equal("display (tajta)-_", serializeComposerDisplayValue("(tajta)-_"), "(tajta)-_");
        collector.equal("display (tejte)-_", serializeComposerDisplayValue("(tejte)-_"), "(tejte)-_");
        collector.equal("display (mujmu)-_", serializeComposerDisplayValue("(mujmu)-_"), "(mujmu)-_");
        collector.equal("display directional", serializeComposerDisplayValue("([wal]/pewa)"), "(wal-pewa)");
        collector.equal("display supportive envelope", serializeComposerDisplayValue("-([un]/[i]mati)"), "-(un-imati)");
        collector.equal("envelope _", serializeCanonicalRegexEnvelope("_"), "(_)");
        collector.equal("envelope -_", serializeCanonicalRegexEnvelope("-_"), "-(_)");

        return summarize("Composer placeholder checks", 9, collector);
    }

    function runComposerSupportiveChecks() {
        const collector = createCollector();

        collector.equal(
            "initial supportive y",
            applyComposerSupportiveIMarkerToRootPath({
                stem: "yawi",
                supportiveI: true,
                afterObjectMarker: false,
            }).stem,
            "(y)awi"
        );
        collector.equal(
            "post-vowel supportive y before non-e",
            applyComposerSupportiveIMarkerToRootPath({
                stem: "yawi",
                supportiveI: true,
                afterObjectMarker: true,
                precedingSurface: "(ta)-",
            }).stem,
            "(y)awi"
        );
        collector.equal(
            "post-vowel supportive y before e",
            applyComposerSupportiveIMarkerToRootPath({
                stem: "yeti",
                supportiveI: true,
                afterObjectMarker: true,
                precedingSurface: "(ta)-",
            }).stem,
            "eti"
        );
        collector.equal(
            "post-consonant supportive y",
            applyComposerSupportiveIMarkerToRootPath({
                stem: "yawi",
                supportiveI: true,
                afterObjectMarker: true,
                precedingSurface: "k-",
            }).stem,
            "awi"
        );
        collector.equal(
            "post-i supportive y",
            applyComposerSupportiveIMarkerToRootPath({
                stem: "yawi",
                supportiveI: true,
                afterObjectMarker: true,
                precedingSurface: "ki-",
            }).stem,
            "awi"
        );
        collector.equal(
            "initial reduplicative supportive y",
            applyComposerSupportiveIMarkerToRootPath({
                stem: "yejyekua",
                supportiveI: true,
                afterObjectMarker: false,
            }).stem,
            "(y)ej(y)ekua"
        );

        const transitiveState = {
            ...VERB_COMPOSER_STATE,
            mode: VERB_INPUT_MODE.composer,
            transitivity: COMPOSER_TRANSITIVITY.transitive,
            valenceIntransitive: "",
            valenceIntransitiveEmbed: "",
            valence: "ta",
            valenceEmbedPrimary: "",
            valenceSecondary: "",
            valenceEmbedSecondary: "",
            slotAStem: "",
            slotAEmbed: "",
            slotBStem: "yawi",
            slotBEmbed: "",
            slotCStem: "",
            slotCEmbed: "",
            supportiveI: true,
            tiCausativeClass: "",
            preserveRawRegexBase: false,
            rawRegexBase: "",
        };
        collector.equal("transitive ta regex", buildLegacyRegexBaseFromComposerState(transitiveState), "(ta)-(y)awi");
        collector.equal("transitive ta display", buildComposerModeBundle(transitiveState).displayValue, "(ta-yawi)");

        const intransitiveState = {
            ...transitiveState,
            transitivity: COMPOSER_TRANSITIVITY.intransitive,
            valence: "",
            slotAStem: "yawi",
            slotBStem: "",
        };
        collector.equal("initial regex", buildLegacyRegexBaseFromComposerState(intransitiveState), "(y)awi");
        collector.equal("initial display", buildComposerModeBundle(intransitiveState).displayValue, "(yawi)");

        const redupState = {
            ...intransitiveState,
            slotAStem: "yejyekua",
            stem: "yejyekua",
        };
        collector.equal("redup regex", buildLegacyRegexBaseFromComposerState(redupState), "(y)ej(y)ekua");
        collector.equal("redup display", buildComposerModeBundle(redupState).displayValue, "(yejyekua)");

        const supportiveRoot = "ankwilia";
        collector.equal("parse after ta", parseVerbInput(`(ta)-(y)${supportiveRoot}`).verb, `tay${supportiveRoot}`);
        collector.equal("parse after consonant", parseVerbInput("(kal)-(y)awi").verb, "kalawi");
        collector.equal("parse after vowel before e", parseVerbInput("(ta)-(y)eti").verb, "taeti");
        collector.equal("parse after i", parseVerbInput(`(ki)-(y)${supportiveRoot}`).verb, `ki${supportiveRoot}`);
        collector.equal("parse initial redup", parseVerbInput("(y)ej(y)ekua").verb, "ejekua");
        collector.equal("parse noninitial redup", parseVerbInput(`(ki)-(y)ej(y)ekua`).verb, "kiejekua");

        const output = generateWord({
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: TENSE_MODE.verbo,
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                derivationType: DERIVATION_TYPE.direct,
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "",
                verb: `(ta)-(y)${supportiveRoot}`,
                tense: "presente",
                parsedVerb: parseVerbInput(`(ta)-(y)${supportiveRoot}`),
            },
        }) || {};
        collector.equal("output after ta", output.result, `nitay${supportiveRoot}`);
        const redupOutput = generateWord({
            silent: true,
            skipValidation: true,
            override: {
                tenseMode: TENSE_MODE.verbo,
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                derivationType: DERIVATION_TYPE.direct,
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "k",
                verb: "(y)ej(y)ekua",
                tense: "presente",
                parsedVerb: parseVerbInput("(y)ej(y)ekua"),
            },
        }) || {};
        collector.equal("output noninitial redup", redupOutput.result, "nikejekua");

        return summarize("Composer supportive checks", 20, collector);
    }

    function runComposerShortFormChecks() {
        const collector = createCollector();
        const buildState = (overrides = {}) => ({
            ...VERB_COMPOSER_STATE,
            mode: VERB_INPUT_MODE.composer,
            transitivity: COMPOSER_TRANSITIVITY.transitive,
            valenceIntransitive: "",
            valenceIntransitiveEmbed: "",
            valence: "",
            valenceEmbedPrimary: "",
            valenceSecondary: "",
            valenceEmbedSecondary: "",
            slotAStem: "",
            slotAEmbed: "",
            slotBStem: "",
            slotBEmbed: "",
            slotCStem: "",
            slotCEmbed: "",
            supportiveI: false,
            tiCausativeClass: "",
            preserveRawRegexBase: false,
            rawRegexBase: "",
            ...overrides,
        });

        collector.equal(
            "ta before consonant",
            getComposerSecondaryValenceFamilyInventoryForContext("ta", {
                state: buildState({ slotBStem: "ketza" }),
                scope: "primary",
            }),
            ["ta", "tajta"]
        );
        collector.equal(
            "mu before consonant",
            getComposerSecondaryValenceFamilyInventoryForContext("mu", {
                state: buildState({ slotBStem: "ketza" }),
                scope: "primary",
            }),
            ["mu", "mujmu"]
        );
        collector.equal(
            "ta before nucleus",
            getComposerSecondaryValenceFamilyInventoryForContext("ta", {
                state: buildState({ slotBStem: "ishpiya" }),
                scope: "primary",
            }),
            ["ta", "tajta", "t"]
        );
        collector.equal(
            "mu before nucleus",
            getComposerSecondaryValenceFamilyInventoryForContext("mu", {
                state: buildState({ slotBStem: "ishpiya" }),
                scope: "primary",
            }),
            ["mu", "mujmu", "m"]
        );

        return summarize("Composer short-form checks", 4, collector);
    }

    function runComposerDisplayBridgeTests() {
        const results = [
            runVerbModeTranslationChecks(),
            runComposerWritebackChecks(),
            runComposerPlaceholderChecks(),
            runComposerSupportiveChecks(),
            runComposerShortFormChecks(),
        ];
        const failures = results.flatMap((result) => result.failures || []);
        const total = results.reduce((sum, result) => sum + Number(result.total || 0), 0);
        const collector = createCollector();
        collector.failures.push(...failures);
        return summarize("Composer display bridge tests", total, collector);
    }

    if (typeof window === "object" && window) {
        window.runRegexEnvelopeLanguageTests = runRegexEnvelopeLanguageTests;
        window.runComposerDisplayBridgeTests = runComposerDisplayBridgeTests;
    }
})();
