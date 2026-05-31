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

    function isShown(element) {
        if (!element || element.disabled) {
            return false;
        }
        let current = element;
        while (current && current.nodeType === 1) {
            if (current.hidden) {
                return false;
            }
            const style = typeof window?.getComputedStyle === "function"
                ? window.getComputedStyle(current)
                : null;
            if (style && (style.display === "none" || style.visibility === "hidden")) {
                return false;
            }
            current = current.parentElement;
        }
        return true;
    }

    function clickElement(element) {
        if (!isShown(element)) {
            return false;
        }
        element.click();
        return true;
    }

    function setInputValue(input, nextValue) {
        if (!input) {
            return;
        }
        input.value = nextValue;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function normalizeAuditValue(value) {
        return String(value || "");
    }

    function getComposerDisplaySnapshot() {
        const { verbInput, mirrorContent } = getComposerSurfaceElements();
        const bundle = buildComposerModeBundle(VERB_COMPOSER_STATE, verbInput?.value || "");
        const visibleValue = String(bundle.regexValue || bundle.displayValue || "");
        return {
            inputValue: String(verbInput?.value || ""),
            mirrorValue: String(mirrorContent?.textContent || "").trim() || visibleValue,
            regexValue: String(bundle.regexValue || ""),
            displayValue: visibleValue,
            envelopeValue: String(bundle.envelopeValue || bundle.regexValue || ""),
        };
    }

    function validateComposerDisplayInvariant(label, collector, records = null, metadata = {}) {
        const snapshot = getComposerDisplaySnapshot();
        const resolved = resolveVerbInputSource(snapshot.inputValue, { mode: VERB_INPUT_MODE.composer });
        collector.equal(`${label} input`, snapshot.inputValue, snapshot.displayValue);
        collector.equal(`${label} mirror`, snapshot.mirrorValue, snapshot.displayValue);
        collector.equal(`${label} regex`, resolved.regexValue, snapshot.regexValue);
        collector.equal(`${label} parse`, resolved.parseValue, snapshot.regexValue);
        if (/[[\]/]/.test(snapshot.displayValue)) {
            collector.failures.push(`${label} display leaked regex punctuation: ${JSON.stringify(snapshot.displayValue)}`);
        }
        if (snapshot.displayValue.includes("((") || snapshot.displayValue.includes("))")) {
            collector.failures.push(`${label} display has doubled wrappers: ${JSON.stringify(snapshot.displayValue)}`);
        }
        const firstOpen = snapshot.displayValue.indexOf("(");
        const lastClose = snapshot.displayValue.lastIndexOf(")");
        if (firstOpen >= 0 && lastClose > firstOpen) {
            const inner = snapshot.displayValue.slice(firstOpen + 1, lastClose);
            if (inner.includes("+")) {
                collector.failures.push(`${label} display has + inside core: ${JSON.stringify(snapshot.displayValue)}`);
            }
        }
        const directional = String(VERB_COMPOSER_STATE.directionalPrefix || "").trim().toLowerCase();
        if (directional) {
            const lowerDisplay = snapshot.displayValue.toLowerCase();
            const directionalOutside = (
                lowerDisplay.includes(`${directional}(`)
                || lowerDisplay.includes(`${directional}+`)
                || lowerDisplay.includes(`-${directional}(`)
                || lowerDisplay.includes(`-${directional}+`)
            );
            if (!directionalOutside) {
                collector.failures.push(`${label} directional not outside core: ${JSON.stringify(snapshot.displayValue)}`);
            }
        }
        if (Array.isArray(records)) {
            records.push({
                ...metadata,
                displayValue: snapshot.displayValue,
                regexValue: snapshot.regexValue,
                envelopeValue: snapshot.envelopeValue,
                inputValue: snapshot.inputValue,
                mirrorValue: snapshot.mirrorValue,
                transitivity: VERB_COMPOSER_STATE.transitivity,
                directionalPrefix: VERB_COMPOSER_STATE.directionalPrefix || "",
                valenceIntransitive: VERB_COMPOSER_STATE.valenceIntransitive || "",
                valence: VERB_COMPOSER_STATE.valence || "",
                valenceSecondary: VERB_COMPOSER_STATE.valenceSecondary || "",
                supportiveMarker: getComposerSupportiveMarker(),
                entryBoard: typeof getComposerEntryBoard === "function" ? getComposerEntryBoard() : "",
            });
        }
    }

    function resetComposerScenario(scenario = {}) {
        setVerbInputMode(VERB_INPUT_MODE.composer, { syncFromInput: false });
        const baseState = parseComposerStateFromRegexValue("");
        Object.assign(VERB_COMPOSER_STATE, baseState, {
            mode: VERB_INPUT_MODE.composer,
            transitivity: scenario.transitivity || COMPOSER_TRANSITIVITY.intransitive,
            supportiveMarker: "",
            sourceBase: "",
            stemManualOverride: false,
        });
        COMPOSER_SLOT_KEYS.forEach((slotKey) => {
            COMPOSER_EMBED_OPEN_STATE[slotKey] = false;
            COMPOSER_EMBED_PREVIEW_STATE[slotKey] = false;
            COMPOSER_SERIAL_SLOT_TYPE_BY_SLOT[slotKey] = "auto";
            COMPOSER_TEMPLATE_SURFACE_BY_SLOT[slotKey] = "";
            COMPOSER_NOUN_TO_VERB_TEMPLATE_SUFFIX_BY_SLOT[slotKey] = "";
            COMPOSER_NOUN_TO_VERB_TI_CAUSATIVE_CLASS_BY_SLOT[slotKey] = "";
        });
        renderVerbComposerFromState();
        const refs = getVerbComposerElements();
        const boardButton = Array.from(refs.entryBoardButtons || []).find((button) => (
            String(button.getAttribute("data-composer-entry-board") || "") === String(scenario.board || COMPOSER_ENTRY_BOARD.general)
        ));
        clickElement(boardButton);
        const transitivityButton = Array.from(refs.transitivitySlotButtons || []).find((button) => (
            String(button.getAttribute("data-composer-transitivity") || "") === String(scenario.transitivity || COMPOSER_TRANSITIVITY.intransitive)
        ));
        clickElement(transitivityButton);
        setInputValue(refs.slotAEmbedInput, scenario.slotAEmbed || "");
        setInputValue(refs.slotAStemInput, scenario.slotAStem || "");
        setInputValue(refs.slotAValenceLeftEmbedInput, scenario.slotAObject || "");
        setInputValue(refs.slotBEmbedInput, scenario.slotBEmbed || "");
        setInputValue(refs.slotBStemInput, scenario.slotBStem || "");
        setInputValue(refs.slotBValenceLeftEmbedInput, scenario.slotBObject || "");
        setInputValue(refs.slotCEmbedInput, scenario.slotCEmbed || "");
        setInputValue(refs.slotCStemInput, scenario.slotCStem || "");
        setInputValue(refs.slotCValenceLeftEmbedInput, scenario.slotCObject || "");
        if (refs.supportiveICheckbox) {
            refs.supportiveICheckbox.checked = false;
            refs.supportiveICheckbox.dispatchEvent(new Event("change", { bubbles: true }));
        }
        renderVerbComposerFromState();
        applyComposerStateToVerbInput({ triggerGenerate: false });
        renderVerbMirror();
    }

    function discoverGroupPaths({
        reset,
        getValue,
        listActionIds,
        runActionId,
        normalize = normalizeAuditValue,
        maxStates = 48,
    }) {
        const seen = new Map();
        const replay = (path = []) => {
            (Array.isArray(path) ? path : []).forEach((actionId) => {
                runActionId(actionId);
            });
        };
        reset();
        const startValue = normalize(getValue());
        seen.set(startValue, []);
        const queue = [startValue];
        while (queue.length) {
            const currentValue = queue.shift();
            const currentPath = seen.get(currentValue) || [];
            reset();
            replay(currentPath);
            listActionIds().forEach((actionId) => {
                reset();
                replay(currentPath);
                runActionId(actionId);
                const nextValue = normalize(getValue());
                if (!seen.has(nextValue)) {
                    const nextPath = currentPath.concat(actionId);
                    seen.set(nextValue, nextPath);
                    queue.push(nextValue);
                }
            });
            if (seen.size >= maxStates) {
                break;
            }
        }
        return seen;
    }

    function setSupportiveToggle(targetValue) {
        const refs = getVerbComposerElements();
        const checkbox = refs.supportiveICheckbox || null;
        const nextValue = Boolean(targetValue);
        if (!checkbox || !isShown(checkbox)) {
            return false;
        }
        if (Boolean(checkbox.checked) === nextValue) {
            return true;
        }
        checkbox.checked = nextValue;
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
    }

    function runComposerCoreButtonAudit() {
        const collector = createCollector();
        const records = [];
        const scenarios = [
            {
                name: "general-vi-base",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                slotAStem: "nemi",
                supportiveStates: [false],
            },
            {
                name: "general-vi-supportive-y",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                slotAStem: "yawi",
                supportiveStates: [false, true],
            },
            {
                name: "general-vt-base",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                slotBStem: "ijita",
                supportiveStates: [false],
            },
            {
                name: "general-vt-supportive-y",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                slotBStem: "yawi",
                supportiveStates: [false, true],
            },
            {
                name: "general-vb-base",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.bitransitive,
                slotCStem: "maka",
                supportiveStates: [false],
            },
            {
                name: "noun-vi-base",
                board: COMPOSER_ENTRY_BOARD.nounToVerb,
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                slotAStem: "tepe",
                supportiveStates: [false],
            },
            {
                name: "noun-vt-base",
                board: COMPOSER_ENTRY_BOARD.nounToVerb,
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                slotBStem: "tepe",
                supportiveStates: [false],
            },
        ];

        scenarios.forEach((scenario) => {
            const reset = () => resetComposerScenario(scenario);
            const refsAfterReset = () => getVerbComposerElements();
            const directionalPaths = discoverGroupPaths({
                reset,
                getValue: () => refsAfterReset().directionalSelect?.value || "",
                listActionIds: () => Array.from(refsAfterReset().directionalChips?.querySelectorAll(".verb-chip") || [])
                    .filter(isShown)
                    .map((button) => String(button.dataset.chipValue || "")),
                runActionId: (actionId) => {
                    const button = Array.from(refsAfterReset().directionalChips?.querySelectorAll(".verb-chip") || [])
                        .find((candidate) => isShown(candidate) && String(candidate.dataset.chipValue || "") === actionId);
                    clickElement(button);
                },
            });

            const valenceContainer = scenario.transitivity === COMPOSER_TRANSITIVITY.intransitive
                ? () => refsAfterReset().valenceChipsIntransitive
                : () => refsAfterReset().valenceChips;
            const valenceSelect = scenario.transitivity === COMPOSER_TRANSITIVITY.intransitive
                ? () => refsAfterReset().valenceSelectIntransitive
                : () => refsAfterReset().valenceSelect;
            const primaryPaths = discoverGroupPaths({
                reset,
                getValue: () => valenceSelect()?.value || "",
                listActionIds: () => Array.from(valenceContainer()?.querySelectorAll(".verb-chip") || [])
                    .filter(isShown)
                    .map((button) => String(button.dataset.chipFamily || "")),
                runActionId: (actionId) => {
                    const button = Array.from(valenceContainer()?.querySelectorAll(".verb-chip") || [])
                        .find((candidate) => isShown(candidate) && String(candidate.dataset.chipFamily || "") === actionId);
                    clickElement(button);
                },
            });

            const secondaryPaths = scenario.transitivity === COMPOSER_TRANSITIVITY.bitransitive
                ? discoverGroupPaths({
                    reset,
                    getValue: () => refsAfterReset().valenceSelectSecondary?.value || "",
                    listActionIds: () => Array.from(refsAfterReset().valenceChipsSecondary?.querySelectorAll(".verb-chip") || [])
                        .filter(isShown)
                        .map((button) => `${button.dataset.chipFamily || ""}:${button.dataset.chipOrdinal || "0"}`),
                    runActionId: (actionId) => {
                        const button = Array.from(refsAfterReset().valenceChipsSecondary?.querySelectorAll(".verb-chip") || [])
                            .find((candidate) => isShown(candidate) && `${candidate.dataset.chipFamily || ""}:${candidate.dataset.chipOrdinal || "0"}` === actionId);
                        clickElement(button);
                    },
                    maxStates: 24,
                })
                : new Map([["", []]]);

            const directionalEntries = Array.from(directionalPaths.entries());
            const primaryEntries = Array.from(primaryPaths.entries());
            const secondaryEntries = Array.from(secondaryPaths.entries());
            scenario.supportiveStates.forEach((supportiveValue) => {
                directionalEntries.forEach(([directionalValue, directionalPath]) => {
                    primaryEntries.forEach(([primaryValue, primaryPath]) => {
                        secondaryEntries.forEach(([secondaryValue, secondaryPath]) => {
                            reset();
                            directionalPath.forEach((actionId) => {
                                const button = Array.from(refsAfterReset().directionalChips?.querySelectorAll(".verb-chip") || [])
                                    .find((candidate) => isShown(candidate) && String(candidate.dataset.chipValue || "") === actionId);
                                clickElement(button);
                            });
                            primaryPath.forEach((actionId) => {
                                const button = Array.from(valenceContainer()?.querySelectorAll(".verb-chip") || [])
                                    .find((candidate) => isShown(candidate) && String(candidate.dataset.chipFamily || "") === actionId);
                                clickElement(button);
                            });
                            secondaryPath.forEach((actionId) => {
                                const button = Array.from(refsAfterReset().valenceChipsSecondary?.querySelectorAll(".verb-chip") || [])
                                    .find((candidate) => isShown(candidate) && `${candidate.dataset.chipFamily || ""}:${candidate.dataset.chipOrdinal || "0"}` === actionId);
                                clickElement(button);
                            });
                            setSupportiveToggle(supportiveValue);
                            validateComposerDisplayInvariant(
                                `${scenario.name}:${directionalValue || "none"}:${primaryValue || "none"}:${secondaryValue || "none"}:${supportiveValue ? "supportive" : "plain"}`,
                                collector,
                                records,
                                {
                                    scenario: scenario.name,
                                    directionalValue,
                                    primaryValue,
                                    secondaryValue,
                                }
                            );
                        });
                    });
                });
            });
        });

        return summarize("Composer core button audit", records.length * 4, collector);
    }

    function runComposerMatrixAffixButtonAudit() {
        const collector = createCollector();
        const records = [];
        const scenarios = [
            {
                name: "matrix-vi-general",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                slotAStem: "nemi",
                slotKey: "a",
            },
            {
                name: "matrix-vt-general",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                slotBStem: "ketza",
                slotKey: "b",
            },
            {
                name: "matrix-vb-general",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.bitransitive,
                slotCStem: "maka",
                slotKey: "c",
            },
            {
                name: "matrix-vt-noun",
                board: COMPOSER_ENTRY_BOARD.nounToVerb,
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                slotBStem: "tepe",
                slotKey: "b",
            },
        ];
        scenarios.forEach((scenario) => {
            resetComposerScenario(scenario);
            const refs = getVerbComposerElements();
            const trigger = refs.matrixStemAffixTriggerBySlot?.[scenario.slotKey] || null;
            clickElement(trigger);
            const chipButtons = Array.from(
                refs.matrixStemAffixChipGroupsBySlot?.[scenario.slotKey]?.querySelectorAll(".verb-composer__matrix-affix-chip") || []
            ).filter(isShown);
            chipButtons.forEach((button, index) => {
                resetComposerScenario(scenario);
                const nextRefs = getVerbComposerElements();
                clickElement(nextRefs.matrixStemAffixTriggerBySlot?.[scenario.slotKey] || null);
                const nextButton = Array.from(
                    nextRefs.matrixStemAffixChipGroupsBySlot?.[scenario.slotKey]?.querySelectorAll(".verb-composer__matrix-affix-chip") || []
                ).filter(isShown)[index];
                clickElement(nextButton);
                validateComposerDisplayInvariant(
                    `${scenario.name}:${index}:${String(nextButton?.getAttribute("aria-label") || nextButton?.textContent || "").trim()}`,
                    collector,
                    records,
                    {
                        scenario: scenario.name,
                        slotKey: scenario.slotKey,
                        chipLabel: String(nextButton?.getAttribute("aria-label") || nextButton?.textContent || "").trim(),
                    }
                );
            });
        });
        return summarize("Composer matrix-affix button audit", records.length * 4, collector);
    }

    function runComposerSerialTypeButtonAudit() {
        const collector = createCollector();
        const records = [];
        const scenarios = [
            {
                name: "serial-ti-general",
                board: COMPOSER_ENTRY_BOARD.general,
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                slotAStem: "mati",
                slotKey: "a",
            },
        ];
        scenarios.forEach((scenario) => {
            resetComposerScenario(scenario);
            const refs = getVerbComposerElements();
            const chipsContainer = refs.slots?.[scenario.slotKey]?.serialTypeChips || null;
            const chipButtons = Array.from(chipsContainer?.querySelectorAll(".verb-chip") || [])
                .filter((button) => !button.disabled && !chipsContainer?.hidden);
            chipButtons.forEach((button, index) => {
                resetComposerScenario(scenario);
                const nextRefs = getVerbComposerElements();
                const nextContainer = nextRefs.slots?.[scenario.slotKey]?.serialTypeChips || null;
                const nextButton = Array.from(nextContainer?.querySelectorAll(".verb-chip") || [])
                    .filter((candidate) => !candidate.disabled && !nextContainer?.hidden)[index];
                clickElement(nextButton);
                validateComposerDisplayInvariant(
                    `${scenario.name}:${String(nextButton?.dataset.serialType || "")}`,
                    collector,
                    records,
                    {
                        scenario: scenario.name,
                        slotKey: scenario.slotKey,
                        serialType: String(nextButton?.dataset.serialType || ""),
                    }
                );
            });
        });
        return summarize("Composer serial-type button audit", records.length * 4, collector);
    }

    function runComposerNounToVerbSuffixCompatibilityChecks() {
        const collector = createCollector();
        collector.equal(
            "S→V -ia blocks vowel-final noun stem",
            isComposerNounToVerbTemplateSuffixCompatible("tepe", "ia"),
            false
        );
        collector.equal(
            "S→V -ia allows consonant-final noun stem",
            isComposerNounToVerbTemplateSuffixCompatible("tenmachti", "ia"),
            true
        );
        collector.equal(
            "S→V canonical -ia keeps consonant-final noun base",
            buildComposerNounToVerbCanonicalStem("tenmachti", "ia"),
            "tenmachia"
        );
        withComposerSnapshot(() => {
            resetComposerScenario({
                name: "matrix-vt-noun-tia",
                board: COMPOSER_ENTRY_BOARD.nounToVerb,
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                slotBStem: "tenmachti",
                slotKey: "b",
            });
            const refs = getVerbComposerElements();
            const tiaHaveEntry = getComposerMatrixAffixSpecialCatalog("b")
                .find((entry) => entry.key === "token:tia-have");
            const tiaBecomeEntry = getComposerMatrixAffixSpecialCatalog("b")
                .find((entry) => entry.key === "token:tia-become");
            collector.equal("S→V transitive -tia tener suffix", tiaHaveEntry?.templateSuffix || "", "tia");
            collector.equal("S→V transitive -tia ser suffix", tiaBecomeEntry?.templateSuffix || "", "tia");
            const currentState = getComposerMatrixAffixCurrentState("b", refs.slotBStemInput);
            const groups = buildComposerMatrixAffixPickerGroups("b", refs.matrixStemAffixSelectBySlot?.b, currentState);
            const labels = groups.flatMap((group) => (group.entries || []).map((entry) => String(entry.label || "")));
            collector.equal("S→V popover has no Libre", labels.includes("Libre"), false);
            const serialChipVisibility = COMPOSER_SLOT_KEYS.map((slotKey) => {
                const container = refs.slots?.[slotKey]?.serialTypeChips || null;
                return Boolean(container && !container.hidden);
            });
            collector.equal("S→V hides serial type chips", serialChipVisibility, [false, false, false]);
        });
        return summarize("Composer noun→verb suffix compatibility", 7, collector);
    }

    function runRegexEnvelopeLanguageTests() {
        const collector = createCollector();

        [
            { input: "(nemi)", transitivity: COMPOSER_TRANSITIVITY.intransitive },
            { input: "wal+(nemi)", transitivity: COMPOSER_TRANSITIVITY.intransitive },
            { input: "ta+(nemi)", transitivity: COMPOSER_TRANSITIVITY.intransitive },
            { input: "ta-(chiwa)", transitivity: COMPOSER_TRANSITIVITY.transitive },
            { input: "(a)+ta-(kwi)", transitivity: COMPOSER_TRANSITIVITY.transitive },
            { input: "un+ta-(kwi)", transitivity: COMPOSER_TRANSITIVITY.transitive },
            { input: "(shuchi)-(kwi)", transitivity: COMPOSER_TRANSITIVITY.transitive },
            { input: "te+ta-(maka)", transitivity: COMPOSER_TRANSITIVITY.bitransitive },
        ].forEach((testCase) => {
            const parsed = parseMovingTargetRegexInput(testCase.input);
            collector.truthy(`${testCase.input} valid`, parsed.isValid);
            collector.equal(`${testCase.input} regexValue`, parsed.regexValue, testCase.input);
            collector.equal(`${testCase.input} transitivity`, parsed.transitivity, testCase.transitivity);
        });

        [
            "wal(nemi)",
            "ta(nemi)",
            "ta-(chiwa",
            "un+ta(kwi)",
        ].forEach((input) => {
            collector.equal(`${input} invalid`, parseMovingTargetRegexInput(input).isValid, false);
        });
        collector.equal("-$WI shorthand valid", getInvalidVerbStructure("-$WI", { allowPartial: true }), "");
        collector.equal("-$WI parse", parseVerbInput("-$WI").verb, "_wiauto");
        collector.equal("-$WI serialize", serializeRegexInputValue("-(_wi-auto)"), "-$WI");
        collector.equal("-$WI awi family", buildComposerNounToVerbCanonicalStem("awi", "wiauto"), "iwi");
        collector.equal("-$WI iwi family", buildComposerNounToVerbCanonicalStem("iwi", "wiauto"), "awi");
        collector.equal("-$WI tawi family", buildComposerNounToVerbCanonicalStem("tawi", "wiauto"), "tiwi");
        collector.equal("-$WI tiwi family", buildComposerNounToVerbCanonicalStem("tiwi", "wiauto"), "tawi");
        collector.equal("-$WI mawisti ti-class family", buildComposerNounToVerbCanonicalStem("mawisti", "wiauto"), "mawisawi");
        collector.equal(
            "outer lexical prefix is not embedded",
            getEmbeddedVerbPrefix(parseVerbInput("(taka)-(wa)")),
            ""
        );
        collector.equal(
            "adjacent core embed stays embedded",
            getEmbeddedVerbPrefix(parseVerbInput("-(taka-wa)")),
            "taka"
        );
        collector.equal(
            "outer lexical transitive source occupies object slot",
            getAvailableObjectSlots(parseVerbInput("(taka)-(wa)")),
            0
        );
        collector.equal(
            "embedded transitive core keeps object slot open",
            getAvailableObjectSlots(parseVerbInput("-(taka-wa)")),
            1
        );
        collector.equal(
            "outer lexical transitive object prefixes collapse to empty",
            getObjectPrefixesForTransitividad(parseVerbInput("(taka)-(wa)")).join("|"),
            ""
        );
        collector.equal(
            "embedded transitive core keeps object prefix inventory",
            getObjectPrefixesForTransitividad(parseVerbInput("-(taka-wa)")).join("|"),
            OBJECT_PREFIXES.map((entry) => entry.value).join("|")
        );
        collector.equal(
            "outer lexical transitive drops occupied object prefix in output",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(taka)-(wa)",
                    tense: "adjetivo-preterito",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "ki",
                },
            })?.result || "",
            "takawaj"
        );
        collector.equal(
            "embedded transitive core keeps object prefix in output",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "-(taka-wa)",
                    tense: "adjetivo-preterito",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "ki",
                },
            })?.result || "",
            "kitakawaj"
        );
        return summarize("Regex envelope language tests", 28, collector);
    }

    function runVerbModeTranslationChecks() {
        const collector = createCollector();
        const { verbInput } = getComposerSurfaceElements();
        const cases = [
            {
                regex: "(nemi)",
                composerScreen: "(nemi)",
            },
            {
                regex: "wal+(nemi)",
                composerScreen: "wal+(nemi)",
            },
            {
                regex: "ta+(nemi)",
                composerScreen: "ta+(nemi)",
            },
            {
                regex: "ta-(chiwa)",
                composerScreen: "ta-(chiwa)",
            },
            {
                regex: "(a)+ta-(kwi)",
                composerScreen: "(a)+ta-(kwi)",
            },
            {
                regex: "un+ta-(kwi)",
                composerScreen: "un+ta-(kwi)",
            },
            {
                regex: "(shuchi)-(kwi)",
                composerScreen: "(shuchi)-(kwi)",
            },
            {
                regex: "te+ta-(maka)",
                composerScreen: "te+ta-(maka)",
            },
        ];

        withComposerSnapshot(() => {
            cases.forEach((testCase) => {
                const parsedState = parseComposerStateFromRegexValue(testCase.regex);
                const composerBundle = buildComposerModeBundle(parsedState);

                collector.equal(`${testCase.regex} regex rebuild`, composerBundle.regexValue, testCase.regex);
                collector.equal(`${testCase.regex} composer display`, composerBundle.regexValue, testCase.composerScreen);
                collector.equal(`${testCase.regex} parse roundtrip`, parseMovingTargetRegexInput(composerBundle.regexValue).regexValue, testCase.regex);

                Object.assign(VERB_COMPOSER_STATE, parsedState, { mode: VERB_INPUT_MODE.composer });
                renderVerbComposerFromState();
                applyComposerStateToVerbInput({ triggerGenerate: false });
                collector.equal(`${testCase.regex} composer source display`, String(verbInput?.value || ""), testCase.composerScreen);
                collector.equal(`${testCase.regex} composer source regex`, serializeRegexInputValue(verbInput?.value || ""), testCase.regex);
            });

            setComposerEntryBoard("noun-to-verb");
            const stemInput = getVerbComposerElements().slots.a.stemInput;
            stemInput.value = "mawisti";
            applyComposerTemplateSuffixSelection({
                slotKey: "a",
                templateSuffix: "wiauto",
                stemInput,
            });
            collector.equal("mawisti $WI source regex", resolveVerbInputSource().regexValue, "(mawisawi)");
            collector.equal("mawisti $WI stored surface", getComposerNounToVerbSurfaceValue("a"), "mawisti");
        });

        return summarize("Verb mode translation checks", (cases.length * 5) + 2, collector);
    }

    function runMovingTargetOutputChecks() {
        const collector = createCollector();
        [
            { input: "ta-(chiwa)", output: "nitachiwa" },
            { input: "te+ta-(maka)", output: "nitetamaka" },
            { input: "(a)+ta-(kwi)", output: "niatakwi" },
            { input: "un+ta-(kwi)", output: "niuntakwi" },
            { input: "(shuchi)-(kwi)", output: "nishuchikwi" },
            { input: "ta+(nemi)", output: "nitanemi" },
            { input: "wal+(nemi)", output: "niwalnemi" },
        ].forEach((testCase) => {
            const generated = generateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: testCase.input,
                    tense: "presente",
                    subjectPrefix: "ni",
                    objectPrefix: "",
                    subjectSuffix: "",
                },
            }) || {};
            collector.equal(`${testCase.input} output`, generated.result || "", testCase.output);
        });
        const lexicalOuterOnly = parseVerbInput("(a)-(kwi)");
        const lexicalOuterWithAdjacentEmbed = parseVerbInput("(a)-(ish-kwi)");
        collector.equal(
            "outer lexical-only transitive core occupies one structural source slot",
            getOccupiedLexicalSourceObjectSlots(lexicalOuterOnly),
            1
        );
        collector.equal(
            "outer lexical plus adjacent embed keeps the same occupied source slot count",
            getOccupiedLexicalSourceObjectSlots(lexicalOuterWithAdjacentEmbed),
            1
        );
        collector.equal(
            "active block label stays transitive for occupied transitive valency",
            getActiveVerbBlockLabelType({ labelValency: 2, embeddedObjectFilled: false }),
            "transitive"
        );
        collector.equal(
            "explicit nonspecific object stays before outer lexical plus adjacent embed",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)+ta-(ish-kwi)",
                    tense: "presente",
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                },
            })?.result || "",
            "ataishkwi"
        );
        collector.equal(
            "outer lexical plus explicit nonspecific plus adjacent embed preserves lexical-before-valence order",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)+ta-(yul-kwi)",
                    tense: "presente",
                    subjectPrefix: "ni",
                    subjectSuffix: "",
                    objectPrefix: "",
                },
            })?.result || "",
            "niatayulkwi"
        );
        return summarize("Moving-target output checks", 12, collector);
    }

    function getOperationFinderCaseMatrix() {
        return [
            { label: "plain intransitive core", input: "(nemi)" },
            { label: "supportive intransitive core", input: "([y]awi)" },
            { label: "directional intransitive core", input: "wal+(nemi)" },
            { label: "outer valence intransitive core", input: "ta+(nemi)" },
            { label: "secondary outer valence intransitive core", input: "te+(nemi)" },
            { label: "tertiary outer valence intransitive core", input: "mu+(nemi)" },
            { label: "directional plus outer valence intransitive core", input: "un+ta+(nemi)" },
            { label: "plain transitive core", input: "-(kwi)" },
            { label: "supportive transitive core", input: "-([y]awi)" },
            { label: "outer lexical transitive core", input: "(a)-(kwi)" },
            { label: "outer lexical plus valence transitive core", input: "(a)+ta-(kwi)" },
            { label: "adjacent core embed transitive core", input: "-(ish-kwi)" },
            { label: "outer lexical plus adjacent core embed", input: "(a)-(ish-kwi)" },
            { label: "outer lexical plus valence plus adjacent embed", input: "(a)+ta-(ish-kwi)" },
            { label: "outer lexical plus valence plus adjacent yul embed", input: "(a)+ta-(yul-kwi)" },
            { label: "directional plus transitive core", input: "wal-(piya)" },
            { label: "directional plus explicit valence", input: "un+ta-(kwi)" },
            { label: "plain bitransitive core", input: "te+ta-(maka)" },
            { label: "outer lexical bitransitive core", input: "(a)+te+ta-(maka)" },
            { label: "bitransitive adjacent core embed", input: "te+ta-(ish-maka)" },
            { label: "outer lexical bitransitive adjacent embed", input: "(a)+te+ta-(ish-maka)" },
            { label: "directional plus bitransitive core", input: "un+te+ta-(maka)" },
        ];
    }

    function buildOperationFinderModelShape(model = null) {
        if (!model || typeof model !== "object") {
            return null;
        }
        const outer = (Array.isArray(model.outerPieces) ? model.outerPieces : [])
            .map((piece) => {
                const type = normalizeAuditValue(piece?.type);
                const value = normalizeAuditValue(piece?.value).toLowerCase();
                if (!type) {
                    return "";
                }
                if (type === "lexical") {
                    return "lexical";
                }
                if (type === "adjacent-embed") {
                    return "adjacent-embed";
                }
                return value ? `${type}:${value}` : type;
            })
            .filter(Boolean);
        const core = (Array.isArray(model.corePrefixParts) ? model.corePrefixParts : [])
            .map((piece) => {
                const type = normalizeAuditValue(piece?.type);
                const value = normalizeAuditValue(piece?.value).toLowerCase();
                if (!type) {
                    return "";
                }
                if (type === "adjacent-embed") {
                    return "adjacent-embed";
                }
                return value ? `${type}:${value}` : type;
            })
            .filter(Boolean);
        return {
            transitivity: normalizeAuditValue(model.transitivity),
            outer,
            core,
            matrix: normalizeAuditValue(model.matrixBase) ? "matrix" : "",
        };
    }

    function buildOperationFinderReducedSignature(parsed = null) {
        if (!parsed || typeof parsed !== "object") {
            return null;
        }
        const structuralOuterPieces = Array.isArray(parsed.structuralOuterPieces)
            ? parsed.structuralOuterPieces
            : (
                Array.isArray(parsed.canonical?.structuralOuterPieces)
                    ? parsed.canonical.structuralOuterPieces
                    : []
            );
        const structuralCorePrefixParts = Array.isArray(parsed.coreStructuralPrefixParts)
            ? parsed.coreStructuralPrefixParts
            : (
                Array.isArray(parsed.canonical?.coreStructuralPrefixParts)
                    ? parsed.canonical.coreStructuralPrefixParts
                    : []
            );
        const boundPrefixes = Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [];
        const boundExplicitFlags = Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [];
        const lexicalBoundPrefixes = Array.isArray(parsed.lexicalBoundPrefixes) ? parsed.lexicalBoundPrefixes : [];
        const explicitValencePrefixes = typeof getExplicitBoundNonspecificPrefixes === "function"
            ? getExplicitBoundNonspecificPrefixes(boundPrefixes, boundExplicitFlags)
            : [];
        return {
            transitivity: Number(parsed.semanticObjectSlotCount || 0) >= 2
                ? "bitransitive"
                : (parsed.isMarkedTransitive ? "transitive" : "intransitive"),
            structuralOuter: structuralOuterPieces.map((piece) => `${normalizeAuditValue(piece?.type)}:${normalizeAuditValue(piece?.value)}`),
            structuralCore: structuralCorePrefixParts.map((piece) => `${normalizeAuditValue(piece?.type)}:${normalizeAuditValue(piece?.value)}`),
            sourcePrefix: normalizeAuditValue(parsed.sourcePrefix) ? "source-prefix" : "",
            embeddedPrefix: normalizeAuditValue(parsed.embeddedPrefix) ? "embedded-prefix" : "",
            boundPrefixCount: boundPrefixes.length,
            lexicalBoundCount: lexicalBoundPrefixes.length,
            explicitValence: explicitValencePrefixes.map((value) => normalizeAuditValue(value).toLowerCase()),
            hasSuffixSeparator: parsed.hasSuffixSeparator === true,
            hasBoundMarker: parsed.hasBoundMarker === true,
            supportive: parsed.hasOptionalSupportiveI === true
                ? normalizeAuditValue(parsed.optionalSupportiveLetter).toLowerCase() || "supportive"
                : "",
            occupiedLexicalSourceSlots: typeof getOccupiedLexicalSourceObjectSlots === "function"
                ? Number(getOccupiedLexicalSourceObjectSlots(parsed) || 0)
                : 0,
            availableObjectSlots: typeof getAvailableObjectSlots === "function"
                ? Number(getAvailableObjectSlots(parsed) || 0)
                : 0,
        };
    }

    function serializeOperationFinderShape(value) {
        return JSON.stringify(value || null);
    }

    function describeOperationFinderShapeDrift(fullShape = null, fallbackShape = null) {
        if (!fullShape || !fallbackShape) {
            return ["missing structural shape"];
        }
        const drifts = [];
        const fullOuter = Array.isArray(fullShape.outer) ? fullShape.outer : [];
        const fallbackOuter = Array.isArray(fallbackShape.outer) ? fallbackShape.outer : [];
        const fullCore = Array.isArray(fullShape.core) ? fullShape.core : [];
        const fallbackCore = Array.isArray(fallbackShape.core) ? fallbackShape.core : [];
        if (serializeOperationFinderShape(fullShape) === serializeOperationFinderShape(fallbackShape)) {
            return drifts;
        }
        if (fullShape.transitivity !== fallbackShape.transitivity) {
            drifts.push(`transitivity ${JSON.stringify(fullShape.transitivity)} -> ${JSON.stringify(fallbackShape.transitivity)}`);
        }
        if (serializeOperationFinderShape(fullOuter) !== serializeOperationFinderShape(fallbackOuter)) {
            drifts.push(`outer ${JSON.stringify(fullOuter)} -> ${JSON.stringify(fallbackOuter)}`);
        }
        if (serializeOperationFinderShape(fullCore) !== serializeOperationFinderShape(fallbackCore)) {
            drifts.push(`core ${JSON.stringify(fullCore)} -> ${JSON.stringify(fallbackCore)}`);
        }
        if (fullShape.matrix !== fallbackShape.matrix) {
            drifts.push(`matrix ${JSON.stringify(fullShape.matrix)} -> ${JSON.stringify(fallbackShape.matrix)}`);
        }
        return drifts.length ? drifts : ["shape drift"];
    }

    function buildOperationFinderCollisionGroups(records = [], keyName = "") {
        const groups = new Map();
        records.forEach((record) => {
            const signature = normalizeAuditValue(record?.[keyName]);
            if (!signature) {
                return;
            }
            if (!groups.has(signature)) {
                groups.set(signature, []);
            }
            groups.get(signature).push(record);
        });
        const allGroups = Array.from(groups.values());
        const collisions = allGroups
            .map((group) => {
                const distinctShapes = Array.from(new Set(group.map((record) => record.fullShapeKey)));
                if (group.length < 2 || distinctShapes.length < 2) {
                    return null;
                }
                return {
                    key: keyName,
                    signature: group[0][keyName],
                    cases: group.map((record) => ({
                        label: record.label,
                        input: record.input,
                        fullShape: record.fullShape,
                    })),
                };
            })
            .filter(Boolean);
        return {
            groups: allGroups,
            collisions,
        };
    }

    function classifyOperationFinderRecord(record = null) {
        if (!record || !Array.isArray(record.shapeDrift) || !record.shapeDrift.length) {
            return "";
        }
        const fullOuter = Array.isArray(record?.fullShape?.outer) ? record.fullShape.outer : [];
        const fallbackOuter = Array.isArray(record?.fallbackShape?.outer) ? record.fallbackShape.outer : [];
        const fullCore = Array.isArray(record?.fullShape?.core) ? record.fullShape.core : [];
        const fallbackCore = Array.isArray(record?.fallbackShape?.core) ? record.fallbackShape.core : [];
        const fullValenceCount = fullOuter.filter((piece) => piece.startsWith("valence:")).length;
        const fallbackValenceCount = fallbackOuter.filter((piece) => piece.startsWith("valence:")).length;
        const fullDirectionalCount = fullOuter.filter((piece) => piece.startsWith("directional:")).length;
        const fallbackDirectionalCount = fallbackOuter.filter((piece) => piece.startsWith("directional:")).length;
        const fallbackGainedAdjacentEmbed = fallbackCore.includes("adjacent-embed") && !fullCore.includes("adjacent-embed");
        if (fullValenceCount && !fallbackValenceCount && fallbackGainedAdjacentEmbed) {
            return "outer-valence-recast-as-core-embed";
        }
        if (fullValenceCount && fallbackValenceCount < fullValenceCount && fullDirectionalCount === fallbackDirectionalCount) {
            return fullDirectionalCount
                ? "directional-path-drops-explicit-valence"
                : "explicit-valence-dropped";
        }
        if (record?.fullShape?.transitivity === "bitransitive" && fullValenceCount && !fallbackValenceCount) {
            return "bitransitive-outer-valence-dropped";
        }
        return "fallback-structure-drift";
    }

    function classifyOperationFinderCollision(collision = null) {
        const cases = Array.isArray(collision?.cases) ? collision.cases : [];
        const directionalPresence = new Set(cases.map((entry) => (
            Array.isArray(entry?.fullShape?.outer) && entry.fullShape.outer.some((piece) => String(piece || "").startsWith("directional:"))
        )));
        const valenceCounts = new Set(cases.map((entry) => (
            Array.isArray(entry?.fullShape?.outer)
                ? entry.fullShape.outer.filter((piece) => String(piece || "").startsWith("valence:")).length
                : 0
        )));
        if (directionalPresence.size > 1) {
            return "directional-erased-from-reduced-signature";
        }
        if (valenceCounts.size > 1) {
            return "valence-erased-from-reduced-signature";
        }
        return "reduced-signature-collapse";
    }

    function runOperationFinderAudit() {
        const collector = createCollector();
        const records = [];
        const cases = getOperationFinderCaseMatrix();
        cases.forEach((testCase) => {
            const normalizedInput = normalizeAuditValue(testCase.input);
            const parsed = parseVerbInput(normalizedInput);
            const fullModel = buildCurrentRegexDerivationSourceModel(normalizedInput);
            const fallbackModel = buildFallbackDerivationSourceModel(parsed, parsed?.verb || "", parsed?.analysisVerb || "");
            const fullShape = buildOperationFinderModelShape(fullModel);
            const fallbackShape = buildOperationFinderModelShape(fallbackModel);
            collector.truthy(`${testCase.label} current-regex model`, fullModel);
            collector.truthy(`${testCase.label} parsed verb`, parsed);
            collector.truthy(`${testCase.label} fallback model`, fallbackModel);
            const record = {
                label: testCase.label,
                input: normalizedInput,
                fullShape,
                fullShapeKey: serializeOperationFinderShape(fullShape),
                fallbackShape,
                fallbackShapeKey: serializeOperationFinderShape(fallbackShape),
                reducedSignature: buildOperationFinderReducedSignature(parsed),
            };
            record.reducedSignatureKey = serializeOperationFinderShape(record.reducedSignature);
            record.shapeDrift = describeOperationFinderShapeDrift(fullShape, fallbackShape);
            record.collapseType = classifyOperationFinderRecord(record);
            if (record.shapeDrift.length) {
                collector.failures.push(
                    `${testCase.label} ${JSON.stringify(normalizedInput)} drifted in fallback model [${record.collapseType || "unclassified"}]: ${record.shapeDrift.join("; ")}`
                );
            }
            records.push(record);
        });
        const fallbackGroups = buildOperationFinderCollisionGroups(records, "fallbackShapeKey");
        const reducedGroups = buildOperationFinderCollisionGroups(records, "reducedSignatureKey");
        fallbackGroups.collisions.forEach((collision) => {
            collector.failures.push(
                `fallback-shape collision ${JSON.stringify(collision.signature)} across ${collision.cases.map((entry) => `${entry.label} ${entry.input}`).join(" | ")}`
            );
        });
        reducedGroups.collisions.forEach((collision) => {
            const collisionType = classifyOperationFinderCollision(collision);
            collision.collapseType = collisionType;
            collector.failures.push(
                `reduced-signature collision [${collisionType}] ${JSON.stringify(collision.signature)} across ${collision.cases.map((entry) => `${entry.label} ${entry.input}`).join(" | ")}`
            );
        });
        const total = (cases.length * 3) + fallbackGroups.groups.length + reducedGroups.groups.length;
        const summary = summarize("Operation Finder", total, collector);
        summary.operation = "Operation Finder";
        summary.records = records;
        summary.findings = {
            shapeDrift: records
                .filter((record) => Array.isArray(record.shapeDrift) && record.shapeDrift.length)
                .map((record) => ({
                    label: record.label,
                    input: record.input,
                    collapseType: record.collapseType || "",
                    drift: record.shapeDrift,
                })),
            fallbackCollisions: fallbackGroups.collisions,
            reducedSignatureCollisions: reducedGroups.collisions,
        };
        return summary;
    }

    function getOperationStableExpanseNounToVerbCases() {
        return [
            {
                key: "slot-a-wi",
                label: "S→V intransitive -wi",
                slotKey: "a",
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                surface: "yul",
                templateSuffix: "wi",
            },
            {
                key: "slot-a-wa",
                label: "S→V intransitive -wa",
                slotKey: "a",
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                surface: "tepe",
                templateSuffix: "wa",
            },
            {
                key: "slot-a-wiauto",
                label: "S→V intransitive -$WI",
                slotKey: "a",
                transitivity: COMPOSER_TRANSITIVITY.intransitive,
                surface: "mawisti",
                templateSuffix: "wiauto",
            },
            {
                key: "slot-b-ia",
                label: "S→V transitive -ia",
                slotKey: "b",
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                surface: "tenmachti",
                templateSuffix: "ia",
            },
            {
                key: "slot-b-tia-have",
                label: "S→V transitive -tia tener",
                slotKey: "b",
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                surface: "tenmachti",
                templateSuffix: "tia",
                tiCausativeClass: "have",
            },
            {
                key: "slot-b-tia-become",
                label: "S→V transitive -tia ser",
                slotKey: "b",
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                surface: "tenmachti",
                templateSuffix: "tia",
                tiCausativeClass: "become",
            },
            {
                key: "slot-b-wia",
                label: "S→V transitive -wia",
                slotKey: "b",
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                surface: "tenmachti",
                templateSuffix: "wia",
            },
            {
                key: "slot-b-ta",
                label: "S→V transitive -ta",
                slotKey: "b",
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                surface: "tenmachti",
                templateSuffix: "ta",
            },
            {
                key: "slot-b-tilia",
                label: "S→V transitive -tilia",
                slotKey: "b",
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                surface: "tenmachti",
                templateSuffix: "tilia",
            },
            {
                key: "slot-b-lia",
                label: "S→V transitive -lia",
                slotKey: "b",
                transitivity: COMPOSER_TRANSITIVITY.transitive,
                surface: "tenmachti",
                templateSuffix: "lia",
            },
        ];
    }

    function getOperationStableExpanseDerivationCases() {
        return [
            {
                label: "patientivo perfectivo keeps lexical plus ta source",
                input: "(a)+ta-(kwi)",
                tense: "patientivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
                expected: "atakwijti",
            },
            {
                label: "patientivo imperfectivo keeps lexical plus ta source",
                input: "(a)+ta-(kwi)",
                tense: "patientivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    patientivoSource: "imperfectivo",
                },
                expected: "atakwit",
            },
            {
                label: "patientivo nonactive keeps lexical plus ta source",
                input: "(a)+ta-(kwi)",
                tense: "patientivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    patientivoSource: "nonactive",
                },
                expected: "atakwil / atakwilti / atakwilin / atakwiwal / atakwiwalti / atakwiwalin",
            },
            {
                label: "sustantivo verbal keeps lexical plus ta source",
                input: "(a)+ta-(kwi)",
                tense: "sustantivo-verbal",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                },
                expected: "atakwilis / atakwis",
            },
            {
                label: "patientivo imperfectivo keeps adjacent core embed",
                input: "-(ish-mati)",
                tense: "patientivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    patientivoSource: "imperfectivo",
                },
                expected: "ishmatit",
            },
            {
                label: "patientivo nonactive keeps adjacent core embed",
                input: "-(ish-mati)",
                tense: "patientivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    patientivoSource: "nonactive",
                },
                expected: "ishmatil / ishmatilti / ishmatilin",
            },
            {
                label: "sustantivo verbal keeps adjacent core embed",
                input: "-(ish-mati)",
                tense: "sustantivo-verbal",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                },
                expected: "ishmatilis / ishmatis",
            },
            {
                label: "sustantivo verbal keeps outer lexical before runtime object",
                input: "(a)-(ish-kwi)",
                tense: "sustantivo-verbal",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                },
                expected: "ataishkwilis / ataishkwis",
            },
            {
                label: "instrumentivo keeps outer lexical before runtime object",
                input: "(a)-(ish-kwi)",
                tense: "instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "",
                },
                expected: "ataishkwiluni / ataishkwiwaluni",
            },
            {
                label: "calificativo instrumentivo plain transitive core uses runtime object placement",
                input: "-(kwi)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "",
                },
                expected: "takwijkayut",
            },
            {
                label: "calificativo instrumentivo adjacent core embed uses runtime object placement",
                input: "-(ish-kwi)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "",
                },
                expected: "taishkwijkayut",
            },
            {
                label: "calificativo instrumentivo outer lexical uses runtime object placement",
                input: "(a)-(kwi)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "",
                },
                expected: "atakwijkayut",
            },
            {
                label: "calificativo instrumentivo keeps outer lexical before runtime object",
                input: "(a)-(ish-kwi)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "",
                },
                expected: "ataishkwijkayut",
            },
            {
                label: "calificativo instrumentivo keeps lexical plus ta source and adjacent core embed",
                input: "(a)+ta-(ish-kwi)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "ataishkwijkayut",
            },
            {
                label: "calificativo instrumentivo class d lexical predicate comes from pasado remoto stem",
                input: "(taka)-(wa)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "",
                },
                expected: "takatawajkayut",
            },
            {
                label: "calificativo instrumentivo uses true pasado remoto stem for miki",
                input: "(miki)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "mikkayut",
            },
            {
                label: "calificativo instrumentivo uses true pasado remoto stem for weli",
                input: "(weli)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "welikayut",
            },
            {
                label: "locativo temporal keeps outer lexical before runtime object",
                input: "(a)-(ish-kwi)",
                tense: "locativo-temporal",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "",
                },
                expected: "ataishkwiyan",
            },
            {
                label: "instrumentivo keeps lexical plus ta source",
                input: "(a)+ta-(kwi)",
                tense: "instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "atakwiluni / atakwiwaluni",
            },
            {
                label: "locativo temporal keeps lexical plus ta source",
                input: "(a)+ta-(kwi)",
                tense: "locativo-temporal",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "atakwiyan",
            },
            {
                label: "calificativo instrumentivo keeps lexical plus ta source",
                input: "(a)+ta-(kwi)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "atakwijkayut",
            },
            {
                label: "calificativo instrumentivo keeps source-filled bitransitive valence",
                input: "te+ta-(maka)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "tetamakkayut / tetamakakayut",
            },
            {
                label: "calificativo instrumentivo keeps outer lexical source-filled bitransitive valence",
                input: "(a)+te+ta-(maka)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    possessivePrefix: "",
                },
                expected: "atetamakkayut / atetamakakayut",
            },
            {
                label: "calificativo instrumentivo possessed keeps lexical and runtime object placement",
                input: "(a)-(ish-kwi)",
                tense: "calificativo-instrumentivo",
                extra: {
                    derivationMode: DERIVATION_MODE.active,
                    objectPrefix: "ta",
                    possessivePrefix: "i",
                },
                expected: "iataishkwijka",
            },
        ];
    }

    function runOperationStableExpanse() {
        const collector = createCollector();
        const nounToVerbRecords = [];
        withComposerSnapshot(() => {
            getOperationStableExpanseNounToVerbCases().forEach((testCase) => {
                const scenario = {
                    board: COMPOSER_ENTRY_BOARD.nounToVerb,
                    transitivity: testCase.transitivity,
                    slotAStem: testCase.slotKey === "a" ? testCase.surface : "",
                    slotBStem: testCase.slotKey === "b" ? testCase.surface : "",
                    slotCStem: testCase.slotKey === "c" ? testCase.surface : "",
                };
                resetComposerScenario(scenario);
                const refs = getVerbComposerElements();
                const stemInput = refs.slots?.[testCase.slotKey]?.stemInput || null;
                const applied = applyComposerTemplateSuffixSelection({
                    slotKey: testCase.slotKey,
                    templateSuffix: testCase.templateSuffix,
                    stemInput,
                    tiCausativeClass: testCase.tiCausativeClass || "",
                });
                collector.equal(`${testCase.label} template applied`, applied, true);
                const bundle = buildComposerModeBundle(VERB_COMPOSER_STATE, refs.verbInput?.value || "");
                const expectedCanonicalStem = buildComposerNounToVerbCanonicalStem(
                    testCase.surface,
                    testCase.templateSuffix
                );
                const parsed = parseVerbInput(bundle.regexValue);
                const model = buildCurrentRegexDerivationSourceModel(bundle.regexValue);
                collector.equal(`${testCase.label} canonical stem`, parsed?.exactBaseVerb || "", expectedCanonicalStem);
                collector.equal(`${testCase.label} source model matrix`, model?.matrixBase || "", expectedCanonicalStem);
                collector.equal(`${testCase.label} transitivity`, model?.transitivity || "", testCase.transitivity);
                nounToVerbRecords.push({
                    key: testCase.key,
                    label: testCase.label,
                    regexValue: String(bundle.regexValue || ""),
                    canonicalStem: expectedCanonicalStem,
                    templateSuffix: testCase.templateSuffix,
                    tiCausativeClass: testCase.tiCausativeClass || "",
                });
            });
        });
        const nounToVerbGroups = new Map();
        nounToVerbRecords.forEach((record) => {
            const key = String(record.regexValue || "");
            if (!nounToVerbGroups.has(key)) {
                nounToVerbGroups.set(key, []);
            }
            nounToVerbGroups.get(key).push(record);
        });
        nounToVerbGroups.forEach((group, regexValue) => {
            const distinctCanonicalStems = Array.from(new Set(group.map((record) => record.canonicalStem)));
            if (group.length > 1 && distinctCanonicalStems.length > 1) {
                collector.failures.push(
                    `S→V regex collision ${JSON.stringify(regexValue)} across ${group.map((record) => `${record.label}:${record.canonicalStem}`).join(" | ")}`
                );
            }
        });

        const derivationRecords = [];
        const evaluateNominalDerivationCase = (testCase) => {
            const extra = testCase?.extra && typeof testCase.extra === "object"
                ? testCase.extra
                : {};
            if (
                testCase?.tense === "instrumentivo"
                || testCase?.tense === "calificativo-instrumentivo"
                || testCase?.tense === "locativo-temporal"
            ) {
                const parsed = parseVerbInput(testCase.input);
                if (!parsed) {
                    return "";
                }
                if (testCase.tense === "instrumentivo") {
                    const instrumentivoMode = extra.possessivePrefix === ""
                        ? INSTRUMENTIVO_MODE.absolutivo
                        : INSTRUMENTIVO_MODE.posesivo;
                    return getInstrumentivoResult({
                        rawVerb: testCase.input,
                        verbMeta: parsed,
                        subjectPrefix: extra.subjectPrefix || "",
                        subjectSuffix: extra.subjectSuffix || "",
                        objectPrefix: extra.objectPrefix || "",
                        indirectObjectMarker: extra.indirectObjectMarker || "",
                        thirdObjectMarker: extra.thirdObjectMarker || "",
                        mode: instrumentivoMode,
                        possessivePrefix: extra.possessivePrefix || "",
                    })?.result || "";
                }
                if (testCase.tense === "calificativo-instrumentivo") {
                    return getCalificativoInstrumentivoResult({
                        rawVerb: testCase.input,
                        verbMeta: parsed,
                        subjectPrefix: extra.subjectPrefix || "",
                        subjectSuffix: extra.subjectSuffix || "",
                        objectPrefix: extra.objectPrefix || "",
                        indirectObjectMarker: extra.indirectObjectMarker || "",
                        thirdObjectMarker: extra.thirdObjectMarker || "",
                        possessivePrefix: extra.possessivePrefix || "",
                    })?.result || "";
                }
                return getLocativoTemporalResult({
                    rawVerb: testCase.input,
                    verbMeta: parsed,
                    objectPrefix: extra.objectPrefix || "",
                    indirectObjectMarker: extra.indirectObjectMarker || "",
                    thirdObjectMarker: extra.thirdObjectMarker || "",
                    possessivePrefix: extra.possessivePrefix || "",
                    combinedMode: extra.combinedMode || COMBINED_MODE.active,
                })?.result || "";
            }
            return getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: testCase.input,
                    tense: testCase.tense,
                    subjectPrefix: "",
                    objectPrefix: "",
                    subjectSuffix: "",
                    ...extra,
                },
            })?.result || "";
        };
        getOperationStableExpanseDerivationCases().forEach((testCase) => {
            const generatedResult = evaluateNominalDerivationCase(testCase);
            collector.equal(`${testCase.label} output`, String(generatedResult || ""), testCase.expected);
            const sourceModel = buildCurrentRegexDerivationSourceModel(testCase.input);
            derivationRecords.push({
                label: testCase.label,
                input: testCase.input,
                tense: testCase.tense,
                output: String(generatedResult || ""),
                sourceShape: {
                    outer: (sourceModel?.outerPieces || []).map((piece) => `${piece.type}:${piece.value}`),
                    core: (sourceModel?.corePrefixParts || []).map((piece) => `${piece.type}:${piece.value}`),
                    matrix: String(sourceModel?.matrixBase || ""),
                },
            });
        });

        const sustantivoVerbalSlotParsed = parseVerbInput("(a)-(ish-kwi)");
        const sustantivoVerbalSlotSummary = getNounObjectSlotSummary(
            sustantivoVerbalSlotParsed,
            "sustantivo-verbal",
            { combinedMode: COMBINED_MODE.active }
        );
        const sustantivoVerbalSlotPlans = getNounObjectSlotPlansFromMeta(
            sustantivoVerbalSlotParsed,
            "sustantivo-verbal",
            { combinedMode: COMBINED_MODE.active }
        );
        collector.equal(
            "sustantivo verbal preserves nominal object slot despite occupied lexical source",
            sustantivoVerbalSlotSummary.availableObjectSlots,
            1
        );
        collector.truthy(
            "sustantivo verbal exposes ta in nominal object slot",
            Array.isArray(sustantivoVerbalSlotPlans.slotPlans)
            && sustantivoVerbalSlotPlans.slotPlans[0]
            && Array.isArray(sustantivoVerbalSlotPlans.slotPlans[0].toggleValues)
            && sustantivoVerbalSlotPlans.slotPlans[0].toggleValues.includes("ta")
        );

        const total = (getOperationStableExpanseNounToVerbCases().length * 4)
            + nounToVerbGroups.size
            + getOperationStableExpanseDerivationCases().length
            + 2;
        const summary = summarize("Operation Stable Expanse", total, collector);
        summary.operation = "Operation Stable Expanse";
        summary.findings = {
            nounToVerbRecords,
            derivationRecords,
        };
        return summary;
    }

    function runOperationPatientiveRealization() {
        const collector = createCollector();
        const buildPatientivoInputForAudit = (input = "", {
            source = "nonactive",
            objectPrefix = "",
        } = {}) => {
            const parsed = parseVerbInput(input);
            if (!parsed || typeof buildPatientivoDerivationInput !== "function") {
                return null;
            }
            return buildPatientivoDerivationInput({
                verb: parsed.verb,
                analysisVerb: parsed.analysisVerb,
                rawAnalysisVerb: parsed.rawAnalysisVerb || "",
                sourceRawVerb: parsed.sourceRawVerb || input,
                isTransitive: Boolean(getBaseObjectSlots(parsed) > 0 || parsed.isMarkedTransitive || parsed.isTaFusion),
                objectPrefix,
                directionalPrefix: parsed.directionalPrefix || "",
                isYawi: parsed.isYawi === true,
                hasImpersonalTaPrefix: parsed.hasImpersonalTaPrefix === true,
                boundPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
                boundPrefixes: Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [],
                boundExplicitFlags: Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [],
                directionalPrefixFromSlash: parsed.directionalPrefixFromSlash || "",
                sourceSplitPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
                sourcePrefix: parsed.sourcePrefix || "",
                sourceBase: parsed.sourceBase || parsed.canonicalRuleBase || "",
                sourceCompositeBase: parsed.canonical?.slashCompositeRuleBase || "",
                hasSlashMarker: parsed.hasSlashMarker === true,
                hasSuffixSeparator: parsed.hasSuffixSeparator === true,
                hasLeadingDash: parsed.hasLeadingDash === true,
                hasBoundMarker: parsed.hasBoundMarker === true,
                hasCompoundMarker: parsed.hasCompoundMarker === true,
                hasOptionalSupportiveI: parsed.hasOptionalSupportiveI === true,
                hasNonspecificValence: parsed.hasNonspecificValence === true,
                exactBaseVerb: parsed.analysisExactVerb || parsed.exactBaseVerb || parsed.analysisVerb || parsed.verb,
                suppletiveStemSet: getSuppletiveStemSet(parsed),
                rootPlusYaBase: parsed.rootPlusYaBase || "",
                rootPlusYaBasePronounceable: parsed.rootPlusYaBasePronounceable || "",
                blockPerfectivoClassC: source === "perfectivo",
            });
        };
        const buildPatientivoEntriesForAudit = (input = "", source = "nonactive", options = {}) => {
            const patientivoInput = buildPatientivoInputForAudit(input, {
                source,
                objectPrefix: options.objectPrefix || "",
            });
            if (!patientivoInput) {
                return [];
            }
            return normalizePatientivoDerivationEntries(
                getPatientivoDerivationBuilder(source)(patientivoInput),
                source,
            );
        };
        const structuredCases = [
            {
                label: "plain core nonactive",
                input: "-(kwi)",
                source: "nonactive",
                outer: [],
                core: [],
                matrix: "kwi",
            },
            {
                label: "outer lexical nonactive",
                input: "(a)-(kwi)",
                source: "nonactive",
                outer: ["lexical:a"],
                core: [],
                matrix: "kwi",
            },
            {
                label: "lexical plus valence nonactive",
                input: "(a)+ta-(kwi)",
                source: "nonactive",
                outer: ["lexical:a", "valence:ta"],
                core: [],
                matrix: "kwi",
            },
            {
                label: "lexical plus valence plus adjacent embed imperfectivo",
                input: "(a)+ta-(ish-kwi)",
                source: "imperfectivo",
                outer: ["lexical:a", "valence:ta"],
                core: ["adjacent-embed:ish"],
                matrix: "kwi",
            },
            {
                label: "adjacent embed nonactive",
                input: "-(ish-mati)",
                source: "nonactive",
                outer: [],
                core: ["adjacent-embed:ish"],
                matrix: "mati",
            },
            {
                label: "directional nonactive",
                input: "wal-(piya)",
                source: "nonactive",
                outer: ["directional:wal"],
                core: [],
                matrix: "piya",
            },
            {
                label: "directional plus valence nonactive",
                input: "un+ta-(kwi)",
                source: "nonactive",
                outer: ["directional:un", "valence:ta"],
                core: [],
                matrix: "kwi",
            },
        ];
        structuredCases.forEach((testCase) => {
            const entries = buildPatientivoEntriesForAudit(testCase.input, testCase.source);
            collector.truthy(`${testCase.label} entries`, entries.length > 0);
            collector.truthy(
                `${testCase.label} structured contract`,
                entries.length > 0 && entries.every((entry) => (
                    entry?.formSpec
                    && entry?.stemSpec
                    && entry?.patientivoSourceModel
                ))
            );
            const sourceModel = entries[0]?.patientivoSourceModel?.derivationModel || null;
            collector.equal(
                `${testCase.label} outer pieces`,
                (sourceModel?.outerPieces || []).map((piece) => `${piece.type}:${piece.value}`),
                testCase.outer
            );
            collector.equal(
                `${testCase.label} core pieces`,
                (sourceModel?.corePrefixParts || []).map((piece) => `${piece.type}:${piece.value}`),
                testCase.core
            );
            collector.equal(
                `${testCase.label} matrix base`,
                sourceModel?.matrixBase || "",
                testCase.matrix
            );
        });

        const lexicalEntries = buildPatientivoEntriesForAudit("(a)-(kwi)", "nonactive");
        const lexicalTaEntries = buildPatientivoEntriesForAudit("(a)+ta-(kwi)", "nonactive");
        collector.truthy(
            "distinct patientivo nonactive combinatorials stay distinct",
            lexicalEntries.some((entry) => String(entry?.verb || "").startsWith("akwi"))
            && lexicalTaEntries.some((entry) => String(entry?.verb || "").startsWith("atakwi"))
        );

        const troncoCandidates = [
            "(waki)",
            "(kani)",
            "(piya)",
            "(iwi)",
            "(awi)",
            "(tiya)",
            "(nawa)",
        ].map((input) => ({
            input,
            entries: buildPatientivoEntriesForAudit(input, "tronco-verbal"),
        }));
        const resolvedTroncoCase = troncoCandidates.find((entry) => Array.isArray(entry.entries) && entry.entries.length) || null;
        collector.truthy(
            "patientivo tronco resolves at least one valid structured source case",
            resolvedTroncoCase
        );
        collector.truthy(
            "patientivo tronco valid case uses structured entries",
            resolvedTroncoCase
            && resolvedTroncoCase.entries.every((entry) => (
                entry?.formSpec
                && entry?.stemSpec
                && entry?.patientivoSourceModel
            ))
        );
        collector.truthy(
            "patientivo tronco valid case keeps a matrix base",
            Boolean(resolvedTroncoCase?.entries?.[0]?.patientivoSourceModel?.matrixBase)
        );
        collector.equal(
            "patientivo tronco valid case keeps true matrix base",
            resolvedTroncoCase?.entries?.[0]?.patientivoSourceModel?.derivationModel?.matrixBase || "",
            normalizeRuleBase(resolvedTroncoCase?.entries?.[0]?.patientivoSourceModel?.matrixBase || "")
        );
        collector.truthy(
            "patientivo tronco keeps l|VV ua family",
            buildPatientivoEntriesForAudit("-(salua)", "tronco-verbal").some((entry) => (
                String(entry?.verb || "") === "sal"
                && String(entry?.subjectSuffix || "") === ""
            ))
        );

        const patientivoAdjectiveNonactive = buildPatientivoAdjectiveDerivations(
            buildPatientivoEntriesForAudit("(a)+ta-(kwi)", "nonactive"),
            "nonactive",
        );
        collector.truthy(
            "patientivo adjective nonactive uses structured ti entries",
            patientivoAdjectiveNonactive.length > 0
            && patientivoAdjectiveNonactive.every((entry) => (
                entry?.formSpec
                && entry?.stemSpec
                && entry?.subjectSuffix === "ti"
            ))
        );

        const patientivoAdjectivePerfectivo = buildPatientivoAdjectiveDerivations(
            buildPatientivoEntriesForAudit("(weli)", "perfectivo"),
            "perfectivo",
        );
        collector.truthy(
            "patientivo adjective perfectivo uses structured ti entries",
            patientivoAdjectivePerfectivo.length > 0
            && patientivoAdjectivePerfectivo.every((entry) => (
                entry?.formSpec
                && entry?.stemSpec
                && entry?.subjectSuffix === "ti"
                && entry?.sourceType === "perfectivo"
            ))
        );

        const patientivoAdjectiveTronco = buildPatientivoAdjectiveDerivations(
            buildPatientivoEntriesForAudit("(waki)", "tronco-verbal"),
            "tronco-verbal",
        );
        collector.truthy(
            "patientivo adjective tronco uses structured ti entries",
            patientivoAdjectiveTronco.length > 0
            && patientivoAdjectiveTronco.every((entry) => (
                entry?.formSpec
                && entry?.stemSpec
                && entry?.subjectSuffix === "ti"
                && entry?.sourceType === "tronco-verbal"
            ))
        );

        const patientivoAdjectiveImperfectivo = buildPatientivoAdjectiveDerivations(
            buildPatientivoEntriesForAudit("(a)+ta-(ish-kwi)", "imperfectivo"),
            "imperfectivo",
        );
        collector.truthy(
            "patientivo adjective imperfectivo uses structured ti entries",
            patientivoAdjectiveImperfectivo.length > 0
            && patientivoAdjectiveImperfectivo.every((entry) => (
                entry?.formSpec
                && entry?.stemSpec
                && entry?.subjectSuffix === "ti"
                && entry?.sourceType === "imperfectivo"
            ))
        );

        const outputCases = [
            {
                label: "patientivo perfectivo keeps lexical plus ta source",
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
                expected: "atakwijti",
            },
            {
                label: "patientivo imperfectivo keeps lexical plus ta plus adjacent embed",
                override: {
                    verb: "(a)+ta-(ish-kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "imperfectivo",
                },
                expected: "ataishkwit",
            },
            {
                label: "patientivo nonactive keeps adjacent embed and lexical plus ta source",
                override: {
                    verb: "(a)+ta-(ish-kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "nonactive",
                },
                expected: "ataishkwil / ataishkwilti / ataishkwilin / ataishkwiwal / ataishkwiwalti / ataishkwiwalin",
            },
            {
                label: "patientivo perfectivo class d uses provenance stem",
                override: {
                    verb: "(taka)-(wa)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
                expected: "takawajti",
            },
            {
                label: "patientivo nonactive explicit in suffix selection",
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "nonactive",
                    patientivoNominalSuffix: "in",
                },
                expected: "atakwilin / atakwiwalin",
            },
            {
                label: "patientivo tronco keeps productive ki family",
                override: {
                    verb: "(waki)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "tronco-verbal",
                },
                expected: "wak / wakti / wakin / wach / wachti / wachin / waj / wajti / wajin / was / wasti / wasin",
            },
            {
                label: "patientivo tronco keeps productive ya family",
                override: {
                    verb: "(piya)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "tronco-verbal",
                },
                expected: "pil / pilti / pilin",
            },
            {
                label: "patientivo tronco keeps transitive l|VV ua family",
                override: {
                    verb: "-(salua)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "tronco-verbal",
                },
                expected: "tasal / tasalti / tasalin",
            },
        ];
        outputCases.forEach((testCase) => {
            collector.equal(
                testCase.label,
                getCachedSilentGenerateWord({
                    silent: true,
                    skipValidation: true,
                    override: testCase.override,
                })?.result || "",
                testCase.expected
            );
        });
        collector.equal(
            "patientivo tronco transitive l|VV ua family survives normal validation path",
            getCachedSilentGenerateWord({
                silent: true,
                override: {
                    verb: "-(salua)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "tronco-verbal",
                },
            })?.result || "",
            "tasal / tasalti / tasalin"
        );

        collector.equal(
            "patientivo formatter keeps -in on the same line as zero and -ti",
            formatConjugationDisplay("akwil / akwilti / akwilin / akwiwal / akwiwalti / akwiwalin"),
            "akwil/akwilti, akwilin\nakwiwal/akwiwalti, akwiwalin"
        );
        collector.equal(
            "patientivo formatter groups passive impersonal -in with its zero and -ti family",
            formatConjugationDisplay("nemit / nemi / nenti / nen / nenin"),
            "nemit/nemi\nnenti/nen, nenin"
        );

        const ownershipCases = [
            {
                label: "patientivo ownership yu stays nonempty",
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    possessivePrefix: "i",
                    patientivoSource: "nonactive",
                    patientivoOwnership: "yu",
                    patientivoNominalSuffix: "zero",
                },
            },
            {
                label: "patientivo ownership zero stays nonempty",
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    possessivePrefix: "i",
                    patientivoSource: "nonactive",
                    patientivoOwnership: "zero",
                    patientivoNominalSuffix: "zero",
                },
            },
        ];
        ownershipCases.forEach((testCase) => {
            const result = getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: testCase.override,
            })?.result || "";
            collector.truthy(
                testCase.label,
                Boolean(result) && result !== "—"
            );
        });

        const total = structuredCases.length * 5
            + 10
            + 7
            + 2
            + ownershipCases.length;
        const summary = summarize("Operation Patientive Realization", total, collector);
        summary.operation = "Operation Patientive Realization";
        return summary;
    }

    function runOperationBroughtback() {
        const collector = createCollector();
        const previousNonactiveSuffix = typeof getSelectedNonactiveSuffix === "function"
            ? getSelectedNonactiveSuffix()
            : null;
        const withSelectedNonactiveSuffix = (suffix, callback) => {
            try {
                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix(suffix);
                }
                return callback();
            } finally {
                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix(previousNonactiveSuffix);
                }
            }
        };
        const getSilentResult = (override = {}) => (
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override,
            })?.result || ""
        );
        const buildPatientivoInput = (input = "") => {
            const parsed = parseVerbInput(input);
            if (!parsed || typeof buildPatientivoDerivationInput !== "function") {
                return null;
            }
            return buildPatientivoDerivationInput({
                verb: parsed.verb,
                analysisVerb: parsed.analysisVerb,
                rawAnalysisVerb: parsed.rawAnalysisVerb || "",
                sourceRawVerb: parsed.sourceRawVerb || input,
                isTransitive: Boolean(getBaseObjectSlots(parsed) > 0 || parsed.isMarkedTransitive || parsed.isTaFusion),
                objectPrefix: "",
                directionalPrefix: parsed.directionalPrefix || "",
                isYawi: parsed.isYawi === true,
                hasImpersonalTaPrefix: parsed.hasImpersonalTaPrefix === true,
                boundPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
                boundPrefixes: Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [],
                boundExplicitFlags: Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [],
                directionalPrefixFromSlash: parsed.directionalPrefixFromSlash || "",
                sourceSplitPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
                sourcePrefix: parsed.sourcePrefix || "",
                sourceBase: parsed.sourceBase || parsed.canonical?.sourceBase || "",
                sourceCompositeBase: parsed.canonical?.slashCompositeRuleBase || "",
                hasSlashMarker: parsed.hasSlashMarker === true,
                hasSuffixSeparator: parsed.hasSuffixSeparator === true,
                hasLeadingDash: parsed.hasLeadingDash === true,
                hasBoundMarker: parsed.hasBoundMarker === true,
                hasCompoundMarker: parsed.hasCompoundMarker === true,
                hasOptionalSupportiveI: parsed.hasOptionalSupportiveI === true,
                hasNonspecificValence: typeof resolveHasNonspecificValence === "function"
                    ? resolveHasNonspecificValence(parsed)
                    : parsed.hasNonspecificValence === true,
                exactBaseVerb: parsed.analysisExactVerb || parsed.exactBaseVerb || parsed.analysisVerb || parsed.verb,
                suppletiveStemSet: typeof getSuppletiveStemSet === "function" ? getSuppletiveStemSet(parsed) : null,
                rootPlusYaBase: parsed.rootPlusYaBase || "",
                rootPlusYaBasePronounceable: parsed.rootPlusYaBasePronounceable || "",
            });
        };
        const getPatientivoRawSourceSuffixes = (input = "") => {
            const patientivoInput = buildPatientivoInput(input);
            if (!patientivoInput) {
                return [];
            }
            return (buildPatientivoDerivations(patientivoInput) || []).map((entry) => (
                String(entry?.nonactiveSourceSuffix || entry?.metadata?.nonactiveSourceSuffix || "")
            ));
        };
        collector.equal(
            "raw nonactive families stay visible for lexical kwi",
            getVisibleNonactiveDerivationOptions("akwi", "akwi", {
                isTransitive: true,
                ruleBase: "akwi",
            }).map((option) => option.suffix),
            ["u", "lu"]
        );
        collector.equal(
            "raw nonactive families stay visible for temi",
            getVisibleNonactiveDerivationOptions("temi", "temi", {
                isTransitive: false,
                ruleBase: "temi",
            }).map((option) => option.suffix),
            ["wa", "uwa"]
        );
        collector.equal(
            "raw nonactive families stay visible for short n+i family",
            getVisibleNonactiveDerivationOptions("uni", "uni", {
                isTransitive: false,
                ruleBase: "uni",
            }).map((option) => option.suffix),
            ["wa", "uwa"]
        );
        collector.equal(
            "raw nonactive families stay visible for keluni n+i family",
            getVisibleNonactiveDerivationOptions("keluni", "keluni", {
                isTransitive: false,
                ruleBase: "keluni",
            }).map((option) => option.suffix),
            ["wa", "uwa"]
        );
        collector.equal(
            "raw nonactive families stay visible for mali walu family",
            getVisibleNonactiveDerivationOptions("mali", "mali", {
                isTransitive: false,
                ruleBase: "mali",
            }).map((option) => option.suffix),
            ["wa", "walu"]
        );
        collector.equal(
            "raw nonactive families stay visible for transitive kwi walu family",
            getVisibleNonactiveDerivationOptions("kwi", "kwi", {
                isTransitive: true,
                ruleBase: "kwi",
            }).map((option) => option.suffix),
            ["lu", "walu"]
        );
        collector.equal(
            "iksa nonactive keeps both lu and u families by default",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(iksa)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "iksalu / ikshu"
        );
        collector.equal(
            "iksa nonactive selected u stays realized",
            withSelectedNonactiveSuffix("u", () => getSilentResult({
                verb: "-(iksa)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ikshu"
        );
        collector.equal(
            "iksa nonactive selected lu stays realized",
            withSelectedNonactiveSuffix("lu", () => getSilentResult({
                verb: "-(iksa)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "iksalu"
        );
        collector.equal(
            "kwi nonactive keeps lu and walu families by default",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(kwi)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "kwilu / kwiwalu"
        );
        collector.equal(
            "kwi nonactive selected walu stays realized",
            withSelectedNonactiveSuffix("walu", () => getSilentResult({
                verb: "-(kwi)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "kwiwalu"
        );
        collector.equal(
            "mali nonactive keeps wa and walu families by default",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "(mali)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "maliwa / maliwalu"
        );
        collector.equal(
            "mali nonactive selected walu stays realized",
            withSelectedNonactiveSuffix("walu", () => getSilentResult({
                verb: "(mali)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "maliwalu"
        );
        collector.equal(
            "temi nonactive selected wa stays realized",
            withSelectedNonactiveSuffix("wa", () => getSilentResult({
                verb: "(temi)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "temiwa"
        );
        collector.equal(
            "temi nonactive selected uwa stays realized",
            withSelectedNonactiveSuffix("uwa", () => getSilentResult({
                verb: "(temi)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "temuwa"
        );
        collector.equal(
            "keluni nonactive selected wa stays realized",
            withSelectedNonactiveSuffix("wa", () => getSilentResult({
                verb: "(keluni)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "keluniwa"
        );
        collector.equal(
            "keluni nonactive selected uwa stays realized",
            withSelectedNonactiveSuffix("uwa", () => getSilentResult({
                verb: "(keluni)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "kelunuwa"
        );
        const nemiCausativeNonactiveMetadata = getParsedVerbNonactiveStemMetadata(
            parseVerbInput("(nemi)"),
            {
                derivationType: DERIVATION_TYPE.causative,
                objectPrefix: "ki",
            }
        );
        collector.equal(
            "nemi causative nonactive metadata keeps one-to-one derived stems",
            nemiCausativeNonactiveMetadata?.derivedNonactiveStems || [],
            ["nemitilu", "nentilu"]
        );
        collector.equal(
            "nemi causative passive keeps one-to-one derived alternants",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "(nemi)",
                parsedVerb: parseVerbInput("(nemi)"),
                tense: "presente",
                tenseMode: TENSE_MODE.verbo,
                derivationType: DERIVATION_TYPE.causative,
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.passive,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "ki",
            })),
            "nemitilu / nentilu"
        );
        const mawiCausativeNonactiveMetadata = getParsedVerbNonactiveStemMetadata(
            parseVerbInput("(mawi)"),
            {
                derivationType: DERIVATION_TYPE.causative,
                objectPrefix: "",
            }
        );
        collector.equal(
            "mawi causative nonactive metadata keeps full one-to-one derived stems",
            mawiCausativeNonactiveMetadata?.derivedNonactiveStems || [],
            ["mulu", "mawalu", "mawitilu", "mawtilu"]
        );
        collector.equal(
            "mawi causative active keeps full forward alternants",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "(mawi)",
                parsedVerb: parseVerbInput("(mawi)"),
                tense: "presente",
                tenseMode: TENSE_MODE.verbo,
                derivationType: DERIVATION_TYPE.causative,
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "ki",
            })),
            "kimua / kimawa / kimawitia / kimawtia"
        );
        collector.equal(
            "mawi causative passive keeps full one-to-one derived alternants",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "(mawi)",
                parsedVerb: parseVerbInput("(mawi)"),
                tense: "pasivo",
                tenseMode: TENSE_MODE.verbo,
                derivationType: DERIVATION_TYPE.causative,
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "mulu / mawalu / mawitilu / mawtilu"
        );
        collector.equal(
            "temi patientivo nonactive keeps full wa and uwa families",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "(temi)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "nonactive",
                patientivoOwnership: "absolute",
                patientivoNominalSuffix: null,
            })),
            "temit / temi / tenti / ten / tenin"
        );
        collector.equal(
            "temi patientivo nonactive selected wa keeps wa family only",
            withSelectedNonactiveSuffix("wa", () => getSilentResult({
                verb: "(temi)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "nonactive",
                patientivoOwnership: "absolute",
                patientivoNominalSuffix: null,
            })),
            "temit / temi"
        );
        collector.equal(
            "temi patientivo nonactive selected uwa keeps uwa family only",
            withSelectedNonactiveSuffix("uwa", () => getSilentResult({
                verb: "(temi)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "nonactive",
                patientivoOwnership: "absolute",
                patientivoNominalSuffix: null,
            })),
            "tenti / ten / tenin"
        );
        collector.equal(
            "iksa nonactive perfecto keeps both lu and u families by default",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(iksa)",
                tense: "perfecto",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "iksalutuk / ikshutuk"
        );
        collector.equal(
            "iksa nonactive perfecto selected u stays realized",
            withSelectedNonactiveSuffix("u", () => getSilentResult({
                verb: "-(iksa)",
                tense: "perfecto",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ikshutuk"
        );
        collector.equal(
            "kwi nonactive preterito keeps lu and walu families by default",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(kwi)",
                tense: "preterito",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "kwiluk / kwiwaluk"
        );
        collector.equal(
            "kwi nonactive perfecto selected walu stays realized",
            withSelectedNonactiveSuffix("walu", () => getSilentResult({
                verb: "-(kwi)",
                tense: "perfecto",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "kwiwalutuk"
        );
        collector.equal(
            "iksa nonactive keeps only sh branch in u family",
            getVisibleNonactiveDerivationOptions("iksa", "iksa", {
                isTransitive: true,
                ruleBase: "iksa",
            }).map((option) => `${option.suffix}:${option.stem}`),
            ["lu:iksalu", "u:ikshu"]
        );
        collector.equal(
            "ketza nonactive keeps only ch branch in u family",
            getVisibleNonactiveDerivationOptions("ketza", "ketza", {
                isTransitive: true,
                ruleBase: "ketza",
            }).map((option) => `${option.suffix}:${option.stem}`),
            ["lu:ketzalu", "u:kechu"]
        );
        collector.equal(
            "iksa nonactive present keeps only sh branch",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(iksa)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "iksalu / ikshu"
        );
        collector.equal(
            "iksa nonactive selected u keeps only sh branch",
            withSelectedNonactiveSuffix("u", () => getSilentResult({
                verb: "-(iksa)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ikshu"
        );
        collector.equal(
            "ketza nonactive present keeps only ch branch",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(ketza)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ketzalu / kechu"
        );
        collector.equal(
            "iksa nonactive perfecto keeps only sh branch",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(iksa)",
                tense: "perfecto",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "iksalutuk / ikshutuk"
        );
        collector.equal(
            "iksa nonactive preterito keeps only sh branch",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(iksa)",
                tense: "preterito",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "iksaluk / ikshuk"
        );
        collector.equal(
            "ketza nonactive preterito keeps only ch branch",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(ketza)",
                tense: "preterito",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ketzaluk / kechuk"
        );
        collector.equal(
            "tajta nonactive restores plain u variant",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(tajta)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "tajtilu / tajtalu / tajtu"
        );
        collector.equal(
            "tajta nonactive selected u stays realized",
            withSelectedNonactiveSuffix("u", () => getSilentResult({
                verb: "-(tajta)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "tajtu"
        );
        collector.equal(
            "tajta nonactive perfecto keeps plain u variant",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(tajta)",
                tense: "perfecto",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "tajtilutuk / tajtalutuk / tajtutuk"
        );
        collector.equal(
            "tajta nonactive preterito keeps plain u variant",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-(tajta)",
                tense: "preterito",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "tajtiluk / tajtaluk / tajtuk"
        );
        collector.equal(
            "kisa nonactive uwa keeps sh and drops plain s sibling",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "(kisa)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "kisalu / kishuwa"
        );
        collector.equal(
            "piya active preterito restores y to sh stem",
            getSilentResult({
                verb: "-(piya)",
                tense: "preterito",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "ki",
            }),
            "nikpishki / nikpiyak"
        );
        collector.equal(
            "ma ilpia active supportive i stays resolved behind lexical source",
            getSilentResult({
                verb: "(ma)-([i]lpia)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            }),
            "mailpia"
        );
        collector.equal(
            "ma ish ilpia active supportive i stays resolved behind lexical source",
            getSilentResult({
                verb: "(ma)-([i]sh-ilpia)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            }),
            "maishilpia"
        );
        const supportiveKwiParsed = parseVerbInput("([i]kwi)");
        const supportiveLpiaParsed = parseVerbInput("([i]lpia)");
        collector.equal(
            "supportive i kwi keeps support-free rule base for nonactive classification",
            supportiveKwiParsed?.exactBaseVerb || "",
            "kwi"
        );
        collector.equal(
            "supportive i lpia keeps support-free rule base for nonactive classification",
            supportiveLpiaParsed?.exactBaseVerb || "",
            "lpia"
        );
        collector.equal(
            "supportive i kwi restores full nonactive class inventory",
            getVisibleNonactiveDerivationOptions(
                supportiveKwiParsed?.verb || "",
                supportiveKwiParsed?.analysisVerb || "",
                {
                    parsedVerb: supportiveKwiParsed,
                    verbMeta: supportiveKwiParsed,
                    isTransitive: false,
                    ruleBase: supportiveKwiParsed?.exactBaseVerb || "",
                    canonicalRuleBase: supportiveKwiParsed?.canonicalRuleBase || "",
                }
            ).map((option) => option.suffix),
            ["wa", "lu", "walu"]
        );
        collector.equal(
            "supportive i kwi nonactive selected walu stays realized",
            withSelectedNonactiveSuffix("walu", () => getSilentResult({
                verb: "([i]kwi)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ikwiwalu"
        );
        collector.equal(
            "iksa patientivo raw derivation keeps lu u and original-t branches",
            getPatientivoRawSourceSuffixes("-(iksa)"),
            ["lu", "u", ""]
        );
        collector.equal(
            "matsa patientivo restores original t branch",
            getSilentResult({
                verb: "-(matsa)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "nonactive",
                patientivoOwnership: "absolute",
                patientivoNominalSuffix: null,
            }),
            "matsal / matsalti / matsalin / matshit / matshi / matsat / matsa"
        );
        collector.equal(
            "iksa patientivo restores original t branch",
            getSilentResult({
                verb: "-(iksa)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "nonactive",
                patientivoOwnership: "absolute",
                patientivoNominalSuffix: null,
            }),
            "iksal / iksalti / iksalin / ikshit / ikshi / iksat / iksa"
        );
        collector.equal(
            "tajta patientivo restores original t branch beside lu alternants",
            getSilentResult({
                verb: "-(tajta)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "nonactive",
                patientivoOwnership: "absolute",
                patientivoNominalSuffix: null,
            }),
            "tajtil / tajtilti / tajtilin / tajtal / tajtalti / tajtalin / tajtit / tajti / tajtat / tajta"
        );

        const total = 46;
        const summary = summarize("Operation Broughtback", total, collector);
        summary.operation = "Operation Broughtback";
        return summary;
    }

    function runOperationBackSys() {
        const collector = createCollector();
        const previousNonactiveSuffix = typeof getSelectedNonactiveSuffix === "function"
            ? getSelectedNonactiveSuffix()
            : null;
        const withSelectedNonactiveSuffix = (suffix, callback) => {
            try {
                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix(suffix);
                }
                return callback();
            } finally {
                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix(previousNonactiveSuffix);
                }
            }
        };
        const getSilentResult = (override = {}) => (
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override,
            })?.result || ""
        );
        const supportiveJmati = (() => {
            const parsed = parseVerbInput("([i]jmati)");
            return {
                parsed,
                options: getVisibleNonactiveDerivationOptions(
                    parsed?.verb || "",
                    parsed?.analysisVerb || "",
                    {
                        parsedVerb: parsed,
                        verbMeta: parsed,
                        isTransitive: false,
                        ruleBase: parsed?.exactBaseVerb || "",
                        canonicalRuleBase: parsed?.canonicalRuleBase || "",
                    }
                ),
                result: withSelectedNonactiveSuffix(null, () => getSilentResult({
                    verb: "([i]jmati)",
                    tense: "presente",
                    derivationMode: DERIVATION_MODE.nonactive,
                    voiceMode: VOICE_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                })),
            };
        })();
        const supportiveJmatiTransitive = (() => {
            const parsed = parseVerbInput("-([i]jmati)");
            return {
                parsed,
                options: getVisibleNonactiveDerivationOptions(
                    parsed?.verb || "",
                    parsed?.analysisVerb || "",
                    {
                        parsedVerb: parsed,
                        verbMeta: parsed,
                        isTransitive: true,
                        ruleBase: parsed?.exactBaseVerb || "",
                        canonicalRuleBase: parsed?.canonicalRuleBase || "",
                    }
                ),
                result: withSelectedNonactiveSuffix(null, () => getSilentResult({
                    verb: "-([i]jmati)",
                    tense: "presente",
                    derivationMode: DERIVATION_MODE.nonactive,
                    voiceMode: VOICE_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                })),
            };
        })();
        const supportiveKwi = withSelectedNonactiveSuffix(null, () => getSilentResult({
            verb: "([i]kwi)",
            tense: "presente",
            derivationMode: DERIVATION_MODE.nonactive,
            voiceMode: VOICE_MODE.active,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
        }));
        const supportiveYOutput = getSilentResult({
            verb: "ta-([y]ankwilia)",
            tense: "presente",
            derivationMode: DERIVATION_MODE.active,
            voiceMode: VOICE_MODE.active,
            subjectPrefix: "ni",
            subjectSuffix: "",
            objectPrefix: "",
        });
        const slashSupportiveDelay = shouldDelaySlashSupportiveIAllomorphyForPret({
            parsedVerb: {
                hasSlashMarker: true,
                hasBoundMarker: true,
                hasOptionalSupportiveI: true,
                optionalSupportiveLetter: "i",
                analysisVerb: "mati",
            },
            tense: "preterito",
            objectPrefix: "ta",
        });
        const composerSupportiveBundle = buildComposerModeBundle({
            mode: "composer",
            transitivity: "transitive",
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
            supportiveMarker: "y",
            tiCausativeClass: "",
        });
        const composerKwiBundle = buildComposerModeBundle({
            mode: "composer",
            transitivity: "intransitive",
            valenceIntransitive: "",
            valenceIntransitiveEmbed: "",
            valence: "",
            valenceEmbedPrimary: "",
            valenceSecondary: "",
            valenceEmbedSecondary: "",
            slotAStem: "kwi",
            slotAEmbed: "",
            slotBStem: "",
            slotBEmbed: "",
            slotCStem: "",
            slotCEmbed: "",
            supportiveMarker: "",
            tiCausativeClass: "",
        });

        collector.equal(
            "Back Sys connected supportive i contrast",
            supportiveKwi,
            "ikwiwa / ikwilu / ikwiwalu"
        );
        collector.equal(
            "Back Sys supportive i jmati keeps exact base",
            supportiveJmati.parsed?.exactBaseVerb || "",
            "jmati"
        );
        collector.equal(
            "Back Sys supportive i jmati exposes nonactive families",
            supportiveJmati.options.map((option) => String(option?.suffix || "")),
            ["lu", "wa", "wa", "uwa", "walu"]
        );
        collector.equal(
            "Back Sys supportive i jmati stays connected live",
            supportiveJmati.result,
            "ijmatilu / ijmatiwa / ijmachiwa / ijmachuwa / ijmatiwalu"
        );
        collector.equal(
            "Back Sys supportive i transitive jmati exposes nonactive families",
            supportiveJmatiTransitive.options.map((option) => String(option?.suffix || "")),
            ["u", "u", "lu"]
        );
        collector.equal(
            "Back Sys supportive i transitive jmati stays connected live",
            supportiveJmatiTransitive.result,
            "ijmachu / ijmatu / ijmatilu"
        );
        collector.equal(
            "Back Sys supportive i jmati nonactive tabs stay connected",
            Array.from(resolveNonactiveSuffixOptionMap({
                verbMeta: supportiveJmati.parsed,
                verb: supportiveJmati.parsed?.verb || "",
                analysisVerb: supportiveJmati.parsed?.analysisVerb || "",
            }).keys()),
            ["lu", "wa", "uwa", "walu"]
        );
        collector.equal(
            "Back Sys supportive y stays connected",
            supportiveYOutput,
            "nitayankwilia"
        );
        collector.equal(
            "Back Sys slash-bound supportive helper stays connected",
            slashSupportiveDelay,
            true
        );
        collector.equal(
            "Back Sys y to sh stays connected",
            getSilentResult({
                verb: "-(piya)",
                tense: "preterito",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "ni",
                subjectSuffix: "",
                objectPrefix: "ki",
            }),
            "nikpishki / nikpiyak"
        );
        collector.equal(
            "Back Sys m to n stays connected",
            withSelectedNonactiveSuffix("uwa", () => getSilentResult({
                verb: "(temi)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "nonactive",
                patientivoOwnership: "absolute",
                patientivoNominalSuffix: null,
            })),
            "tenti / ten / tenin"
        );
        collector.equal(
            "Back Sys patientivo perfectivo stays connected",
            getSilentResult({
                verb: "(a)+ta-(kwi)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "perfectivo",
                patientivoNominalSuffix: "ti",
            }),
            "atakwijti"
        );
        collector.equal(
            "Back Sys patientivo tronco stays connected",
            getSilentResult({
                verb: "(waki)",
                tense: "patientivo",
                derivationMode: DERIVATION_MODE.active,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                patientivoSource: "tronco-verbal",
            }),
            "wak / wakti / wakin / wach / wachti / wachin / waj / wajti / wajin / was / wasti / wasin"
        );
        const calificativoMikiParsed = parseVerbInput("(miki)");
        collector.equal(
            "Back Sys calificativo instrumentivo keeps realized stem policy",
            getCalificativoInstrumentivoResult({
                rawVerb: "(miki)",
                verbMeta: calificativoMikiParsed,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
                possessivePrefix: "",
            })?.result || "",
            "mikkayut"
        );
        collector.equal(
            "Back Sys noun suffix grouping authority stays connected",
            typeof formatConjugationDisplay === "function",
            true
        );
        collector.equal(
            "Back Sys composer supportive bundle stays connected",
            composerSupportiveBundle.regexValue,
            "ta-([y]awi)"
        );
        collector.equal(
            "Back Sys composer nonactive exposure stays connected",
            getSilentResult({
                verb: composerKwiBundle.regexValue,
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            }),
            "kwiwa / kwilu / kwiwalu"
        );
        collector.equal(
            "Back Sys selection-state authority stays connected",
            typeof mutateConjugationSelectionState === "function"
                && typeof buildConjugationSelectionStateCacheToken === "function",
            true
        );
        const nonactiveTabParsed = parseVerbInput("(temi)");
        collector.equal(
            "Back Sys nonactive tab authority stays connected",
            Array.from(resolveNonactiveSuffixOptionMap({
                verbMeta: nonactiveTabParsed,
                verb: nonactiveTabParsed?.verb || "",
                analysisVerb: nonactiveTabParsed?.analysisVerb || "",
            }).keys()),
            ["wa", "uwa"]
        );
        collector.equal(
            "Back Sys export/provenance authority stays connected",
            typeof buildViewExportCSV === "function"
                && typeof resolveOutputPanelProvenance === "function",
            true
        );

        const total = 18;
        const summary = summarize("Operation Back Sys", total, collector);
        summary.operation = "Operation Back Sys";
        return summary;
    }

    function runOperationSupportiveINonactive() {
        const collector = createCollector();
        const previousNonactiveSuffix = typeof getSelectedNonactiveSuffix === "function"
            ? getSelectedNonactiveSuffix()
            : null;
        const withSelectedNonactiveSuffix = (suffix, callback) => {
            try {
                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix(suffix);
                }
                return callback();
            } finally {
                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix(previousNonactiveSuffix);
                }
            }
        };
        const getSilentResult = (override = {}) => (
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override,
            })?.result || ""
        );
        const intransitiveParsed = parseVerbInput("([i]jmati)");
        const transitiveParsed = parseVerbInput("-([i]jmati)");

        collector.equal(
            "supportive i intransitive jmati visible families",
            getVisibleNonactiveDerivationOptions(
                intransitiveParsed?.verb || "",
                intransitiveParsed?.analysisVerb || "",
                {
                    parsedVerb: intransitiveParsed,
                    verbMeta: intransitiveParsed,
                    isTransitive: false,
                    ruleBase: intransitiveParsed?.exactBaseVerb || "",
                    canonicalRuleBase: intransitiveParsed?.canonicalRuleBase || "",
                }
            ).map((option) => String(option?.suffix || "")),
            ["lu", "wa", "wa", "uwa", "walu"]
        );
        collector.equal(
            "supportive i intransitive jmati default live output",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "([i]jmati)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ijmatilu / ijmatiwa / ijmachiwa / ijmachuwa / ijmatiwalu"
        );
        collector.equal(
            "supportive i intransitive jmati selected wa stem",
            withSelectedNonactiveSuffix("wa", () => resolveNonactiveStemSelection(
                intransitiveParsed?.verb || "",
                intransitiveParsed?.analysisVerb || "",
                {
                    parsedVerb: intransitiveParsed,
                    verbMeta: intransitiveParsed,
                    isTransitive: false,
                    ruleBase: intransitiveParsed?.exactBaseVerb || "",
                    canonicalRuleBase: intransitiveParsed?.canonicalRuleBase || "",
                }
            ).selectedRealizedStem || ""),
            "ijmatiwa"
        );
        collector.equal(
            "supportive i intransitive jmati selected uwa stem",
            withSelectedNonactiveSuffix("uwa", () => resolveNonactiveStemSelection(
                intransitiveParsed?.verb || "",
                intransitiveParsed?.analysisVerb || "",
                {
                    parsedVerb: intransitiveParsed,
                    verbMeta: intransitiveParsed,
                    isTransitive: false,
                    ruleBase: intransitiveParsed?.exactBaseVerb || "",
                    canonicalRuleBase: intransitiveParsed?.canonicalRuleBase || "",
                }
            ).selectedRealizedStem || ""),
            "ijmachuwa"
        );
        collector.equal(
            "supportive i intransitive jmati nonactive tabs authority",
            Array.from(resolveNonactiveSuffixOptionMap({
                verbMeta: intransitiveParsed,
                verb: intransitiveParsed?.verb || "",
                analysisVerb: intransitiveParsed?.analysisVerb || "",
            }).keys()),
            ["lu", "wa", "uwa", "walu"]
        );
        collector.equal(
            "supportive i transitive jmati visible families",
            getVisibleNonactiveDerivationOptions(
                transitiveParsed?.verb || "",
                transitiveParsed?.analysisVerb || "",
                {
                    parsedVerb: transitiveParsed,
                    verbMeta: transitiveParsed,
                    isTransitive: true,
                    ruleBase: transitiveParsed?.exactBaseVerb || "",
                    canonicalRuleBase: transitiveParsed?.canonicalRuleBase || "",
                }
            ).map((option) => String(option?.suffix || "")),
            ["u", "u", "lu"]
        );
        collector.equal(
            "supportive i transitive jmati default live output",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "-([i]jmati)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ijmachu / ijmatu / ijmatilu"
        );
        collector.equal(
            "supportive i transitive jmati selected u stem",
            withSelectedNonactiveSuffix("u", () => resolveNonactiveStemSelection(
                transitiveParsed?.verb || "",
                transitiveParsed?.analysisVerb || "",
                {
                    parsedVerb: transitiveParsed,
                    verbMeta: transitiveParsed,
                    isTransitive: true,
                    ruleBase: transitiveParsed?.exactBaseVerb || "",
                    canonicalRuleBase: transitiveParsed?.canonicalRuleBase || "",
                }
            ).selectedRealizedStem || ""),
            "ijmachu"
        );
        collector.equal(
            "supportive i transitive jmati nonactive tabs authority",
            Array.from(resolveNonactiveSuffixOptionMap({
                verbMeta: transitiveParsed,
                verb: transitiveParsed?.verb || "",
                analysisVerb: transitiveParsed?.analysisVerb || "",
            }).keys()),
            ["u", "lu"]
        );
        collector.equal(
            "supportive i kwi no regression",
            withSelectedNonactiveSuffix(null, () => getSilentResult({
                verb: "([i]kwi)",
                tense: "presente",
                derivationMode: DERIVATION_MODE.nonactive,
                voiceMode: VOICE_MODE.active,
                subjectPrefix: "",
                subjectSuffix: "",
                objectPrefix: "",
            })),
            "ikwiwa / ikwilu / ikwiwalu"
        );

        const total = 10;
        const summary = summarize("Operation Supportive I Nonactive", total, collector);
        summary.operation = "Operation Supportive I Nonactive";
        return summary;
    }

    function runOperationNounRealPipeline() {
        const collector = createCollector();
        const buildVerbDerivedNominalAuditEntries = (kind = "", input = "", extra = {}) => {
            const parsed = parseVerbInput(input);
            if (!parsed) {
                return [];
            }
            if (kind === "sustantivo-verbal") {
                return normalizeVerbDerivedNominalEntries(buildSustantivoVerbalStemCandidates({
                    verb: parsed.verb,
                    analysisVerb: parsed.analysisVerb,
                    rawAnalysisVerb: parsed.rawAnalysisVerb || "",
                    sourceRawVerb: parsed.sourceRawVerb || input,
                    directionalPrefix: parsed.directionalPrefix || "",
                    boundPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
                    boundPrefixes: Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [],
                    boundExplicitFlags: Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [],
                    directionalPrefixFromSlash: parsed.directionalPrefixFromSlash || "",
                    sourceSplitPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
                    sourcePrefix: parsed.sourcePrefix || "",
                    sourceBase: parsed.sourceBase || parsed.canonicalRuleBase || "",
                    sourceCompositeBase: parsed.canonical?.slashCompositeRuleBase || "",
                    hasImpersonalTaPrefix: parsed.hasImpersonalTaPrefix === true,
                    hasOptionalSupportiveI: parsed.hasOptionalSupportiveI === true,
                    hasSlashMarker: parsed.hasSlashMarker === true,
                    hasSuffixSeparator: parsed.hasSuffixSeparator === true,
                    hasLeadingDash: parsed.hasLeadingDash === true,
                    hasBoundMarker: parsed.hasBoundMarker === true,
                    hasCompoundMarker: parsed.hasCompoundMarker === true,
                    isIntransitive: getBaseObjectSlots(parsed) === 0 && !parsed.isMarkedTransitive,
                    isYawi: parsed.isYawi === true,
                    isWeya: parsed.isWeya === true,
                    rootPlusYaBase: parsed.rootPlusYaBase || "",
                    rootPlusYaBasePronounceable: parsed.rootPlusYaBasePronounceable || "",
                }), {
                    kind: VERB_DERIVED_NOMINAL_KIND.sustantivoVerbal,
                });
            }
            if (kind === "instrumentivo") {
                const mode = String(extra.possessivePrefix || "") === ""
                    ? INSTRUMENTIVO_MODE.absolutivo
                    : INSTRUMENTIVO_MODE.posesivo;
                return normalizeVerbDerivedNominalEntries(
                    getInstrumentivoResult({
                        rawVerb: input,
                        verbMeta: parsed,
                        subjectPrefix: extra.subjectPrefix || "",
                        subjectSuffix: extra.subjectSuffix || "",
                        objectPrefix: extra.objectPrefix || "",
                        indirectObjectMarker: extra.indirectObjectMarker || "",
                        thirdObjectMarker: extra.thirdObjectMarker || "",
                        mode,
                        possessivePrefix: extra.possessivePrefix || "",
                    })?.entries || [],
                    { kind: VERB_DERIVED_NOMINAL_KIND.instrumentivo }
                );
            }
            if (kind === "calificativo-instrumentivo") {
                return normalizeVerbDerivedNominalEntries(
                    getCalificativoInstrumentivoResult({
                        rawVerb: input,
                        verbMeta: parsed,
                        subjectPrefix: extra.subjectPrefix || "",
                        subjectSuffix: extra.subjectSuffix || "",
                        objectPrefix: extra.objectPrefix || "",
                        indirectObjectMarker: extra.indirectObjectMarker || "",
                        thirdObjectMarker: extra.thirdObjectMarker || "",
                        possessivePrefix: extra.possessivePrefix || "",
                    })?.entries || [],
                    { kind: VERB_DERIVED_NOMINAL_KIND.calificativoInstrumentivo }
                );
            }
            if (kind === "locativo-temporal") {
                return normalizeVerbDerivedNominalEntries(
                    getLocativoTemporalResult({
                        rawVerb: input,
                        verbMeta: parsed,
                        objectPrefix: extra.objectPrefix || "",
                        indirectObjectMarker: extra.indirectObjectMarker || "",
                        thirdObjectMarker: extra.thirdObjectMarker || "",
                        possessivePrefix: extra.possessivePrefix || "",
                        combinedMode: extra.combinedMode || COMBINED_MODE.active,
                    })?.entries || [],
                    { kind: VERB_DERIVED_NOMINAL_KIND.locativoTemporal }
                );
            }
            return [];
        };
        const evaluateVerbDerivedNominalAuditResult = (kind = "", input = "", extra = {}) => {
            if (kind === "sustantivo-verbal") {
                return getCachedSilentGenerateWord({
                    silent: true,
                    skipValidation: true,
                    override: {
                        verb: input,
                        tense: "sustantivo-verbal",
                        derivationMode: DERIVATION_MODE.active,
                        subjectPrefix: extra.subjectPrefix || "",
                        subjectSuffix: extra.subjectSuffix || "",
                        objectPrefix: extra.objectPrefix || "",
                        indirectObjectMarker: extra.indirectObjectMarker || "",
                        thirdObjectMarker: extra.thirdObjectMarker || "",
                    },
                })?.result || "";
            }
            if (kind === "instrumentivo") {
                const mode = String(extra.possessivePrefix || "") === ""
                    ? INSTRUMENTIVO_MODE.absolutivo
                    : INSTRUMENTIVO_MODE.posesivo;
                return getInstrumentivoResult({
                    rawVerb: input,
                    verbMeta: parseVerbInput(input),
                    subjectPrefix: extra.subjectPrefix || "",
                    subjectSuffix: extra.subjectSuffix || "",
                    objectPrefix: extra.objectPrefix || "",
                    indirectObjectMarker: extra.indirectObjectMarker || "",
                    thirdObjectMarker: extra.thirdObjectMarker || "",
                    mode,
                    possessivePrefix: extra.possessivePrefix || "",
                })?.result || "";
            }
            if (kind === "calificativo-instrumentivo") {
                return getCalificativoInstrumentivoResult({
                    rawVerb: input,
                    verbMeta: parseVerbInput(input),
                    subjectPrefix: extra.subjectPrefix || "",
                    subjectSuffix: extra.subjectSuffix || "",
                    objectPrefix: extra.objectPrefix || "",
                    indirectObjectMarker: extra.indirectObjectMarker || "",
                    thirdObjectMarker: extra.thirdObjectMarker || "",
                    possessivePrefix: extra.possessivePrefix || "",
                })?.result || "";
            }
            if (kind === "locativo-temporal") {
                return getLocativoTemporalResult({
                    rawVerb: input,
                    verbMeta: parseVerbInput(input),
                    objectPrefix: extra.objectPrefix || "",
                    indirectObjectMarker: extra.indirectObjectMarker || "",
                    thirdObjectMarker: extra.thirdObjectMarker || "",
                    possessivePrefix: extra.possessivePrefix || "",
                    combinedMode: extra.combinedMode || COMBINED_MODE.active,
                })?.result || "";
            }
            return "";
        };
        const structuredCases = [
            {
                label: "sustantivo verbal plain core",
                kind: "sustantivo-verbal",
                input: "-(kwi)",
                outer: [],
                core: [],
                matrix: "kwi",
            },
            {
                label: "sustantivo verbal lexical plus valence plus adjacent embed",
                kind: "sustantivo-verbal",
                input: "(a)+ta-(ish-kwi)",
                outer: ["lexical:a", "valence:ta"],
                core: ["adjacent-embed:ish"],
                matrix: "kwi",
            },
            {
                label: "instrumentivo lexical plus valence",
                kind: "instrumentivo",
                input: "(a)+ta-(kwi)",
                outer: ["lexical:a", "valence:ta"],
                core: [],
                matrix: "kwi",
                extra: { possessivePrefix: "" },
            },
            {
                label: "instrumentivo lexical plus adjacent embed with runtime object",
                kind: "instrumentivo",
                input: "(a)-(ish-kwi)",
                outer: ["lexical:a"],
                core: ["adjacent-embed:ish"],
                matrix: "kwi",
                extra: { objectPrefix: "ta", possessivePrefix: "" },
            },
            {
                label: "calificativo instrumentivo bitransitive lexical plus valence",
                kind: "calificativo-instrumentivo",
                input: "(a)+te+ta-(maka)",
                outer: ["lexical:a", "valence:te", "valence:ta"],
                core: [],
                matrix: "maka",
                extra: { possessivePrefix: "" },
            },
            {
                label: "calificativo instrumentivo keeps weli matrix base",
                kind: "calificativo-instrumentivo",
                input: "(weli)",
                outer: [],
                core: [],
                matrix: "weli",
                extra: { possessivePrefix: "" },
            },
            {
                label: "locativo temporal lexical plus valence",
                kind: "locativo-temporal",
                input: "(a)+ta-(kwi)",
                outer: ["lexical:a", "valence:ta"],
                core: [],
                matrix: "kwi",
                extra: { possessivePrefix: "" },
            },
            {
                label: "locativo temporal bitransitive valence chain",
                kind: "locativo-temporal",
                input: "te+ta-(maka)",
                outer: ["valence:te", "valence:ta"],
                core: [],
                matrix: "maka",
                extra: { possessivePrefix: "" },
            },
        ];
        structuredCases.forEach((testCase) => {
            const entries = buildVerbDerivedNominalAuditEntries(testCase.kind, testCase.input, testCase.extra || {});
            collector.truthy(`${testCase.label} entries`, entries.length > 0);
            collector.truthy(
                `${testCase.label} structured contract`,
                entries.length > 0 && entries.every((entry) => (
                    entry?.formSpec
                    && entry?.stemSpec
                    && entry?.sourceModel
                    && entry?.nounDerivationKind === testCase.kind
                ))
            );
            collector.truthy(
                `${testCase.label} provenance`,
                entries.length > 0 && entries.every((entry) => (
                    entry?.provenance !== undefined
                    && String(entry?.sourceTense || "").length > 0
                ))
            );
            const sourceModel = entries[0]?.sourceModel?.derivationModel || null;
            collector.equal(
                `${testCase.label} outer pieces`,
                (sourceModel?.outerPieces || []).map((piece) => `${piece.type}:${piece.value}`),
                testCase.outer
            );
            collector.equal(
                `${testCase.label} core pieces`,
                (sourceModel?.corePrefixParts || []).map((piece) => `${piece.type}:${piece.value}`),
                testCase.core
            );
            collector.equal(
                `${testCase.label} matrix base`,
                sourceModel?.matrixBase || "",
                testCase.matrix
            );
        });

        const outputCases = [
            {
                label: "sustantivo verbal lexical plus ta source",
                kind: "sustantivo-verbal",
                input: "(a)+ta-(kwi)",
                expected: "atakwilis / atakwis",
            },
            {
                label: "sustantivo verbal keeps outer lexical before runtime object",
                kind: "sustantivo-verbal",
                input: "(a)-(ish-kwi)",
                extra: { objectPrefix: "ta" },
                expected: "ataishkwilis / ataishkwis",
            },
            {
                label: "instrumentivo lexical plus ta source",
                kind: "instrumentivo",
                input: "(a)+ta-(kwi)",
                extra: { possessivePrefix: "" },
                expected: "atakwiluni / atakwiwaluni",
            },
            {
                label: "instrumentivo keeps outer lexical before runtime object",
                kind: "instrumentivo",
                input: "(a)-(ish-kwi)",
                extra: { objectPrefix: "ta", possessivePrefix: "" },
                expected: "ataishkwiluni / ataishkwiwaluni",
            },
            {
                label: "calificativo instrumentivo keeps true pasado remoto stem for miki",
                kind: "calificativo-instrumentivo",
                input: "(miki)",
                extra: { possessivePrefix: "" },
                expected: "mikkayut",
            },
            {
                label: "calificativo instrumentivo keeps true pasado remoto stem for weli",
                kind: "calificativo-instrumentivo",
                input: "(weli)",
                extra: { possessivePrefix: "" },
                expected: "welikayut",
            },
            {
                label: "calificativo instrumentivo keeps lexical plus valence chain",
                kind: "calificativo-instrumentivo",
                input: "(a)+te+ta-(maka)",
                extra: { possessivePrefix: "" },
                expected: "atetamakkayut / atetamakakayut",
            },
            {
                label: "locativo temporal keeps lexical plus ta source",
                kind: "locativo-temporal",
                input: "(a)+ta-(kwi)",
                extra: { possessivePrefix: "" },
                expected: "atakwiyan",
            },
            {
                label: "locativo temporal keeps outer lexical before runtime object",
                kind: "locativo-temporal",
                input: "(a)-(ish-kwi)",
                extra: { objectPrefix: "ta", possessivePrefix: "" },
                expected: "ataishkwiyan",
            },
            {
                label: "locativo temporal nonactive stays structured",
                kind: "locativo-temporal",
                input: "(a)+ta-(kwi)",
                extra: { possessivePrefix: "", combinedMode: COMBINED_MODE.nonactive },
                expected: "atakwiluyan / atakwiwaluyan",
            },
        ];
        outputCases.forEach((testCase) => {
            collector.equal(
                testCase.label,
                evaluateVerbDerivedNominalAuditResult(testCase.kind, testCase.input, testCase.extra || {}),
                testCase.expected
            );
        });

        const exportConsistencyCase = getCalificativoInstrumentivoResult({
            rawVerb: "(weli)",
            verbMeta: parseVerbInput("(weli)"),
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "",
            indirectObjectMarker: "",
            thirdObjectMarker: "",
            possessivePrefix: "",
        });
        collector.truthy(
            "calificativo instrumentivo entries stay aligned with output text",
            Array.isArray(exportConsistencyCase?.entries)
            && exportConsistencyCase.entries.every((entry) => entry?.formSpec && entry?.sourceModel)
            && String(exportConsistencyCase?.result || "").includes("welikayut")
        );

        const nonactiveInstrumentivoEntries = buildVerbDerivedNominalAuditEntries("instrumentivo", "(a)+ta-(kwi)", {
            possessivePrefix: "",
        });
        collector.truthy(
            "instrumentivo nonactive source stays on visible nonactive family entries",
            nonactiveInstrumentivoEntries.some((entry) => String(entry?.verb || "").startsWith("atakwil"))
            && nonactiveInstrumentivoEntries.some((entry) => String(entry?.verb || "").startsWith("atakwiwal"))
        );

        const total = (structuredCases.length * 6)
            + outputCases.length
            + 2;
        const summary = summarize("Operation Noun Real Pipeline", total, collector);
        summary.operation = "Operation Noun Real Pipeline";
        return summary;
    }

    function runNonactiveMorphRealizationChecks() {
        const collector = createCollector();
        const selection = resolveNonactiveStemSelection("piya", "piya", {
            isTransitive: true,
            isYawi: false,
            forceAll: true,
            ruleBase: "piya",
        });
        collector.truthy("nonactive selection selected spec", selection.selectedStemSpec);
        collector.truthy("nonactive selection all specs", Array.isArray(selection.allStemSpecs) && selection.allStemSpecs.length);
        collector.equal(
            "nonactive selection spec realizes to selected stem",
            realizeMorphStemSpec(selection.selectedStemSpec, ""),
            selection.selectedStem
        );

        const parsedWal = parseVerbInput("wal-(piya)");
        const derivedNonactive = applyNonactiveDerivation({
            isNonactive: true,
            verb: parsedWal.verb,
            analysisVerb: parsedWal.analysisVerb,
            objectPrefix: "ki",
            parsedVerb: {
                ...parsedWal,
                derivationType: DERIVATION_TYPE.direct,
                derivationValencyDelta: 0,
            },
            directionalPrefix: parsedWal.directionalPrefix || "",
            derivationType: DERIVATION_TYPE.direct,
            causativeAllStems: null,
            applicativeAllStems: null,
            isYawi: false,
            suppletiveStemSet: null,
        });
        collector.truthy("derived nonactive selected spec", derivedNonactive.nonactiveSelectedStemSpec);
        collector.equal(
            "derived nonactive selected spec realizes to verb",
            realizeMorphStemSpec(derivedNonactive.nonactiveSelectedStemSpec, ""),
            derivedNonactive.verb
        );

        const perfectiveResult = buildNonactivePerfectiveResult({
            verb: derivedNonactive.verb,
            subjectPrefix: "ni",
            objectPrefix: "",
            subjectSuffix: "",
            tense: "pasado-remoto",
            directionalInputPrefix: parsedWal.directionalPrefix || "",
            directionalOutputPrefix: parsedWal.directionalPrefix || "",
            baseSubjectPrefix: "ni",
            baseObjectPrefix: "",
            indirectObjectMarker: "",
            hasOptionalSupportiveI: parsedWal.hasOptionalSupportiveI === true,
            optionalSupportiveLetter: parsedWal.optionalSupportiveLetter || "",
        });
        collector.truthy(
            "nonactive perfective result object",
            perfectiveResult && typeof perfectiveResult === "object" && typeof perfectiveResult.text === "string"
        );
        collector.truthy("nonactive perfective result text", String(perfectiveResult?.text || "").length > 0);

        return summarize("Nonactive morph-realization checks", 7, collector);
    }

    function runNominalMorphRealizationChecks() {
        const collector = createCollector();
        const parsed = parseVerbInput("-(piya)");
        const nounForward = applyNounForwardDerivation({
            verbMeta: {
                ...parsed,
                derivationType: DERIVATION_TYPE.direct,
                derivationValencyDelta: 0,
            },
            verb: parsed.verb,
            analysisVerb: parsed.analysisVerb,
            objectPrefix: "ta",
        });
        collector.truthy(
            "noun forward stem targets",
            Array.isArray(nounForward.stemTargets) && nounForward.stemTargets.length > 0
        );
        collector.truthy(
            "noun forward stem specs",
            nounForward.stemTargets.every((entry) => entry?.stemSpec && entry.stemSpec.kind)
        );

        const nounContexts = buildNounForwardStemContexts({
            stemTargets: getNounForwardStemTargets(nounForward, parsed.verb, parsed.analysisVerb),
            objectPrefix: "ta",
            verbMeta: parsed,
            indirectObjectMarker: "",
            thirdObjectMarker: "",
        });
        collector.truthy("noun forward contexts", nounContexts.length > 0);
        collector.truthy(
            "noun forward context specs",
            nounContexts.every((entry) => entry?.stemSpec && entry.stemSpec.kind)
        );
        const sustantivoVerbalStemCandidates = buildSustantivoVerbalStemCandidates({
            verb: "atakwi",
            analysisVerb: "kwi",
            rawAnalysisVerb: "kwi",
            sourceRawVerb: "(a)+ta-(kwi)",
            directionalPrefix: "",
            boundPrefix: "a",
            boundPrefixes: ["a", "ta"],
            boundExplicitFlags: [false, true],
            directionalPrefixFromSlash: "",
            sourceSplitPrefix: "a",
            sourcePrefix: "a",
            sourceBase: "kwi",
            sourceCompositeBase: "",
            hasImpersonalTaPrefix: false,
            hasOptionalSupportiveI: false,
            hasSlashMarker: false,
            hasSuffixSeparator: false,
            hasLeadingDash: true,
            hasBoundMarker: true,
            hasCompoundMarker: true,
            isIntransitive: false,
            isYawi: false,
            isWeya: false,
            rootPlusYaBase: "",
            rootPlusYaBasePronounceable: "",
        });
        collector.equal(
            "sustantivo verbal stem candidates preserve lexical source and explicit nonspecific valence",
            sustantivoVerbalStemCandidates[0]?.verb || "",
            "atakwi"
        );
        collector.equal(
            "sustantivo verbal stem candidates keep a stem-spec form contract",
            sustantivoVerbalStemCandidates[0]?.formSpec?.kind || "",
            "stem"
        );
        collector.equal(
            "sustantivo verbal preserves lexical source and explicit nonspecific valence",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "sustantivo-verbal",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                },
            })?.result || "",
            "atakwilis / atakwis"
        );
        collector.equal(
            "sustantivo verbal preserves adjacent core embed from current regex",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "-(ish-mati)",
                    tense: "sustantivo-verbal",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                },
            })?.result || "",
            "ishmatilis / ishmatis"
        );
        collector.equal(
            "sustantivo verbal places outer lexical source before runtime object prefix",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)-(ish-kwi)",
                    tense: "sustantivo-verbal",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "ta",
                },
            })?.result || "",
            "ataishkwilis / ataishkwis"
        );

        const patientivoInput = buildPatientivoDerivationInput({
            verb: parsed.verb,
            analysisVerb: parsed.analysisVerb,
            rawAnalysisVerb: parsed.rawAnalysisVerb || "",
            isTransitive: true,
            objectPrefix: "ta",
            directionalPrefix: parsed.directionalPrefix || "",
            isYawi: false,
            hasImpersonalTaPrefix: parsed.hasImpersonalTaPrefix === true,
            boundPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
            boundPrefixes: Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags : [],
            directionalPrefixFromSlash: parsed.directionalPrefixFromSlash || "",
            sourceSplitPrefix: parsed.hasBoundMarker ? (parsed.sourcePrefix || "") : "",
            sourcePrefix: parsed.sourcePrefix || "",
            sourceBase: parsed.sourceBase || parsed.canonicalRuleBase || "",
            sourceCompositeBase: parsed.canonical?.slashCompositeRuleBase || "",
            hasSlashMarker: parsed.hasSlashMarker === true,
            hasSuffixSeparator: parsed.hasSuffixSeparator === true,
            hasLeadingDash: parsed.hasLeadingDash === true,
            hasBoundMarker: parsed.hasBoundMarker === true,
            hasCompoundMarker: parsed.hasCompoundMarker === true,
            hasOptionalSupportiveI: parsed.hasOptionalSupportiveI === true,
            hasNonspecificValence: parsed.hasNonspecificValence === true,
            exactBaseVerb: parsed.analysisExactVerb || parsed.analysisVerb || parsed.verb,
            suppletiveStemSet: null,
            rootPlusYaBase: parsed.rootPlusYaBase || "",
            rootPlusYaBasePronounceable: parsed.rootPlusYaBasePronounceable || "",
        });
        const patientivoDerivations = buildPatientivoDerivations(patientivoInput);
        collector.truthy(
            "patientivo derivations have form specs",
            patientivoDerivations.length > 0 && patientivoDerivations.every((entry) => entry?.formSpec)
        );
        const realizedPatientivo = realizeNominalFormSpec(
            patientivoDerivations[0]?.formSpec || null,
            patientivoDerivations[0] || {}
        );
        collector.equal(
            "patientivo form spec realizes to entry verb",
            realizedPatientivo.verb,
            patientivoDerivations[0]?.verb || ""
        );
        collector.equal(
            "patientivo perfectivo follows perfective provenance stem",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(taka)-(wa)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
            })?.result || "",
            "takawajti"
        );
        collector.equal(
            "patientivo perfectivo keeps wi-family perfective stem",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(tesiwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
            })?.result || "",
            "tesiwti"
        );
        collector.equal(
            "patientivo perfectivo shifts final m to n in class a/b stem core",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(temi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
            })?.result || "",
            "tenti"
        );
        collector.equal(
            "patientivo perfectivo shifts final y to sh in class a/b stem core",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "-(piya)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
            })?.result || "",
            "pishti"
        );
        const parsedPerfectivoOuterTa = parseVerbInput("(a)+ta-(kwi)");
        const patientivoPerfectivoOuterTaDerivations = buildPatientivoPerfectivoDerivations({
            verb: parsedPerfectivoOuterTa.verb,
            analysisVerb: parsedPerfectivoOuterTa.analysisVerb,
            rawAnalysisVerb: parsedPerfectivoOuterTa.rawAnalysisVerb || "",
            sourceRawVerb: parsedPerfectivoOuterTa.sourceRawVerb || "(a)+ta-(kwi)",
            isTransitive: true,
            directionalPrefix: parsedPerfectivoOuterTa.directionalPrefix || "",
            boundPrefix: parsedPerfectivoOuterTa.hasBoundMarker ? (parsedPerfectivoOuterTa.sourcePrefix || "") : "",
            boundPrefixes: Array.isArray(parsedPerfectivoOuterTa.boundPrefixes) ? parsedPerfectivoOuterTa.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(parsedPerfectivoOuterTa.boundExplicitFlags) ? parsedPerfectivoOuterTa.boundExplicitFlags : [],
            directionalPrefixFromSlash: parsedPerfectivoOuterTa.directionalPrefixFromSlash || "",
            sourceSplitPrefix: parsedPerfectivoOuterTa.hasBoundMarker ? (parsedPerfectivoOuterTa.sourcePrefix || "") : "",
            sourcePrefix: parsedPerfectivoOuterTa.sourcePrefix || "",
            sourceBase: parsedPerfectivoOuterTa.sourceBase || parsedPerfectivoOuterTa.canonicalRuleBase || "",
            sourceCompositeBase: parsedPerfectivoOuterTa.canonical?.slashCompositeRuleBase || "",
            hasImpersonalTaPrefix: parsedPerfectivoOuterTa.hasImpersonalTaPrefix === true,
            hasOptionalSupportiveI: parsedPerfectivoOuterTa.hasOptionalSupportiveI === true,
            hasSlashMarker: parsedPerfectivoOuterTa.hasSlashMarker === true,
            hasSuffixSeparator: parsedPerfectivoOuterTa.hasSuffixSeparator === true,
            hasLeadingDash: parsedPerfectivoOuterTa.hasLeadingDash === true,
            hasBoundMarker: parsedPerfectivoOuterTa.hasBoundMarker === true,
            hasCompoundMarker: parsedPerfectivoOuterTa.hasCompoundMarker === true,
            hasNonspecificValence: parsedPerfectivoOuterTa.hasNonspecificValence === true,
            exactBaseVerb: parsedPerfectivoOuterTa.exactBaseVerb || parsedPerfectivoOuterTa.analysisVerb || parsedPerfectivoOuterTa.verb,
            suppletiveStemSet: null,
            rootPlusYaBase: parsedPerfectivoOuterTa.rootPlusYaBase || "",
            rootPlusYaBasePronounceable: parsedPerfectivoOuterTa.rootPlusYaBasePronounceable || "",
        });
        const realizedPatientivoPerfectivoOuterTa = realizeNominalFormSpec(
            patientivoPerfectivoOuterTaDerivations[0]?.formSpec || null,
            patientivoPerfectivoOuterTaDerivations[0] || {}
        );
        collector.equal(
            "patientivo perfectivo builder preserves lexical source and explicit nonspecific valence",
            `${realizedPatientivoPerfectivoOuterTa.verb || ""}${realizedPatientivoPerfectivoOuterTa.subjectSuffix || ""}`,
            "atakwijti"
        );
        collector.equal(
            "patientivo perfectivo preserves lexical source and explicit nonspecific valence",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "perfectivo",
                    patientivoNominalSuffix: "ti",
                },
            })?.result || "",
            "atakwijti"
        );
        collector.equal(
            "patientivo nonactive preserves realized outer lexical kwi families",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "nonactive",
                },
            })?.result || "",
            "akwil / akwilti / akwilin / akwiwal / akwiwalti / akwiwalin"
        );
        const previousNonactiveSuffix = getSelectedNonactiveSuffix();
        setSelectedNonactiveSuffix("wa");
        collector.equal(
            "patientivo nonactive respects selected wa family",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(temi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "nonactive",
                },
            })?.result || "",
            "temit / temi"
        );
        setSelectedNonactiveSuffix("uwa");
        collector.equal(
            "patientivo nonactive respects selected uwa family",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(temi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "nonactive",
                },
            })?.result || "",
            "tenti / ten / tenin"
        );
        setSelectedNonactiveSuffix(previousNonactiveSuffix);
        collector.equal(
            "patientivo nonactive normalizes lexical plus ta source to visible lexical nonactive families",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "nonactive",
                },
            })?.result || "",
            "atakwil / atakwilti / atakwilin / atakwiwal / atakwiwalti / atakwiwalin"
        );
        const parsedCalificativoClassD = parseVerbInput("(taka)-(wa)");
        const calificativoPasadoRemotoStemEntries = buildPasadoRemotoStemEntries({
            verb: parsedCalificativoClassD.verb,
            analysisVerb: parsedCalificativoClassD.analysisVerb,
            rawAnalysisVerb: parsedCalificativoClassD.rawAnalysisVerb || "",
            sourceRawVerb: parsedCalificativoClassD.sourceRawVerb || "(taka)-(wa)",
            isTransitive: true,
            directionalPrefix: parsedCalificativoClassD.directionalPrefix || "",
            boundPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            boundPrefixes: Array.isArray(parsedCalificativoClassD.boundPrefixes) ? parsedCalificativoClassD.boundPrefixes : [],
            boundExplicitFlags: Array.isArray(parsedCalificativoClassD.boundExplicitFlags) ? parsedCalificativoClassD.boundExplicitFlags : [],
            directionalPrefixFromSlash: parsedCalificativoClassD.directionalPrefixFromSlash || "",
            sourceSplitPrefix: parsedCalificativoClassD.hasBoundMarker ? (parsedCalificativoClassD.sourcePrefix || "") : "",
            sourcePrefix: parsedCalificativoClassD.sourcePrefix || "",
            sourceBase: parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.canonicalRuleBase || "",
            sourceCompositeBase: parsedCalificativoClassD.canonical?.slashCompositeRuleBase || "",
            hasImpersonalTaPrefix: parsedCalificativoClassD.hasImpersonalTaPrefix === true,
            hasOptionalSupportiveI: parsedCalificativoClassD.hasOptionalSupportiveI === true,
            hasSlashMarker: parsedCalificativoClassD.hasSlashMarker === true,
            hasSuffixSeparator: parsedCalificativoClassD.hasSuffixSeparator === true,
            hasLeadingDash: parsedCalificativoClassD.hasLeadingDash === true,
            hasBoundMarker: parsedCalificativoClassD.hasBoundMarker === true,
            hasCompoundMarker: parsedCalificativoClassD.hasCompoundMarker === true,
            hasNonspecificValence: parsedCalificativoClassD.hasNonspecificValence === true,
            exactBaseVerb: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
            suppletiveStemSet: null,
            rootPlusYaBase: parsedCalificativoClassD.rootPlusYaBase || "",
            rootPlusYaBasePronounceable: parsedCalificativoClassD.rootPlusYaBasePronounceable || "",
            matrixBaseOverride: parsedCalificativoClassD.exactBaseVerb || parsedCalificativoClassD.sourceBase || parsedCalificativoClassD.analysisVerb || parsedCalificativoClassD.verb,
        });
        collector.truthy(
            "calificativo instrumentivo builds pasado remoto stem entries for class-d lexical source",
            Array.isArray(calificativoPasadoRemotoStemEntries) && calificativoPasadoRemotoStemEntries.length > 0
        );
        const patientivoImperfectivoDerivations = buildPatientivoImperfectivoDerivations({
            verb: "(a)+ta-(kwi)",
            analysisVerb: "atakwi",
            rawAnalysisVerb: "atakwi",
            directionalPrefix: "",
            boundPrefix: "ata",
            boundPrefixes: ["a", "ta"],
            boundExplicitFlags: [false, true],
            directionalPrefixFromSlash: "",
            sourceSplitPrefix: "",
            sourcePrefix: "a",
            sourceBase: "kwi",
            sourceCompositeBase: "",
            hasImpersonalTaPrefix: false,
            hasOptionalSupportiveI: false,
            hasSlashMarker: false,
            hasSuffixSeparator: false,
            hasLeadingDash: true,
            hasBoundMarker: true,
            hasCompoundMarker: false,
        });
        collector.equal(
            "patientivo imperfectivo keeps a stem-spec form contract",
            patientivoImperfectivoDerivations[0]?.formSpec?.kind || "",
            "stem"
        );
        collector.equal(
            "patientivo imperfectivo preserves lexical source and explicit nonspecific valence",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "(a)+ta-(kwi)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "imperfectivo",
                },
            })?.result || "",
            "atakwit"
        );
        collector.equal(
            "patientivo imperfectivo preserves adjacent core embed from current regex",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "-(ish-mati)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "imperfectivo",
                },
            })?.result || "",
            "ishmatit"
        );
        collector.equal(
            "patientivo nonactive preserves adjacent core embed from current regex",
            getCachedSilentGenerateWord({
                silent: true,
                skipValidation: true,
                override: {
                    verb: "-(ish-mati)",
                    tense: "patientivo",
                    derivationMode: DERIVATION_MODE.active,
                    subjectPrefix: "",
                    subjectSuffix: "",
                    objectPrefix: "",
                    patientivoSource: "nonactive",
                },
            })?.result || "",
            "ishmatil / ishmatilti / ishmatilin"
        );
        collector.equal(
            "visible nonactive family map keeps raw nonactive families for lexical kwi",
            getVisibleNonactiveDerivationOptions("akwi", "akwi", {
                isTransitive: true,
                ruleBase: "akwi",
            }).map((option) => option?.suffix || ""),
            ["u", "lu"]
        );

        const instrumentivo = getInstrumentivoResult({
            rawVerb: "-(piya)",
            verbMeta: parsed,
            subjectPrefix: "",
            subjectSuffix: "",
            objectPrefix: "ta",
            indirectObjectMarker: "",
            thirdObjectMarker: "",
            mode: INSTRUMENTIVO_MODE.absolutivo,
            possessivePrefix: "",
        });
        collector.truthy(
            "instrumentivo result text",
            instrumentivo && instrumentivo.error !== true && String(instrumentivo.result || "").length > 0
        );

        const locativoTemporal = getLocativoTemporalResult({
            rawVerb: "-(piya)",
            verbMeta: parsed,
            objectPrefix: "ta",
            indirectObjectMarker: "",
            thirdObjectMarker: "",
            possessivePrefix: "",
            combinedMode: COMBINED_MODE.active,
        });
        collector.truthy(
            "locativo-temporal result text",
            locativoTemporal && locativoTemporal.error !== true && String(locativoTemporal.result || "").length > 0
        );

        return summarize("Nominal morph-realization checks", 12, collector);
    }

    function buildMorphologyInputForCheck({
        input = "",
        tense = "",
        subjectPrefix = "",
        objectPrefix = "",
        subjectSuffix = "",
    } = {}) {
        const parsed = parseVerbInput(input);
        return {
            parsed,
            morphologyInput: {
                subjectPrefix,
                objectPrefix,
                subjectSuffix,
                verb: parsed.verb,
                tense,
                analysisVerb: parsed.analysisVerb,
                rawAnalysisVerb: parsed.rawAnalysisVerb,
                analysisExactVerb: parsed.analysisExactVerb || parsed.analysisVerb || parsed.verb,
                isYawi: parsed.isYawi === true,
                isWeya: parsed.isWeya === true,
                directionalPrefix: parsed.directionalPrefix || "",
                directionalRuleMode: resolveDirectionalRuleMode(parsed),
                suppletiveStemSet: getSuppletiveStemSet(parsed),
                suppletiveTenseSuffixes: null,
                ...buildMorphologyMetaOptions(parsed, {
                    hasDoubleDash: parsed.hasDoubleDash,
                    indirectObjectMarker: "",
                    isUnderlyingTransitive: parsed.isUnderlyingTransitive === true,
                }),
                thirdObjectMarker: "",
                skipPretClass: false,
                hasSubjectValent: false,
                boundPrefix: parsed.hasBoundMarker
                    ? (parsed.sourcePrefix || parsed.canonical?.sourcePrefix || (parsed.boundPrefixes || []).join(""))
                    : "",
                embeddedPrefix: getEmbeddedVerbPrefix(parsed),
                boundPrefixes: Array.isArray(parsed.boundPrefixes) ? parsed.boundPrefixes.slice() : [],
                boundExplicitFlags: Array.isArray(parsed.boundExplicitFlags) ? parsed.boundExplicitFlags.slice() : [],
                directionalPrefixFromSlash: parsed.directionalPrefixFromSlash || parsed.canonical?.directionalPrefixFromSlash || "",
                sourceSplitPrefix: parsed.hasBoundMarker
                    ? (parsed.sourcePrefix || parsed.canonical?.sourcePrefix || "")
                    : "",
                sourceCompositeBase: parsed.canonical?.slashCompositeRuleBase || "",
                verbSegment: parsed.verbSegment || "",
                patientivoOwnership: DEFAULT_PATIENTIVO_OWNERSHIP,
                patientivoSource: "nonactive",
                patientivoNominalSuffix: null,
                derivationType: DERIVATION_TYPE.direct,
                isNonactiveMode: false,
                stemProvenanceSeed: null,
            },
        };
    }

    function runNounMorphRealizationChecks() {
        const collector = createCollector();

        const sustantivoCheck = buildMorphologyInputForCheck({
            input: "(nemi)",
            tense: "sustantivo-verbal",
        });
        const sustantivoApplied = applyMorphologyRules(sustantivoCheck.morphologyInput);
        collector.truthy("sustantivo-verbal formSpec", sustantivoApplied?.formSpec);
        collector.truthy(
            "sustantivo-verbal alternate specs",
            Array.isArray(sustantivoApplied?.alternateForms)
            && sustantivoApplied.alternateForms.every((entry) => !entry || entry.formSpec)
        );
        const sustantivoGenerated = generateWord({
            silent: true,
            skipValidation: true,
            override: {
                verb: "(nemi)",
                tense: "sustantivo-verbal",
                subjectPrefix: "",
                objectPrefix: "",
                subjectSuffix: "",
                possessivePrefix: "",
            },
        }) || {};
        collector.truthy("sustantivo-verbal output", String(sustantivoGenerated.result || "").length > 0);

        const agentivoCheck = buildMorphologyInputForCheck({
            input: "(nemi)",
            tense: "agentivo",
        });
        const agentivoApplied = applyMorphologyRules(agentivoCheck.morphologyInput);
        collector.truthy("agentivo formSpec", agentivoApplied?.formSpec);
        collector.truthy(
            "agentivo alternate specs",
            Array.isArray(agentivoApplied?.alternateForms)
            && agentivoApplied.alternateForms.every((entry) => !entry || entry.formSpec)
        );
        const agentivoGenerated = generateWord({
            silent: true,
            skipValidation: true,
            override: {
                verb: "(nemi)",
                tense: "agentivo",
                subjectPrefix: "",
                objectPrefix: "",
                subjectSuffix: "",
                possessivePrefix: "",
            },
        }) || {};
        collector.truthy("agentivo output", String(agentivoGenerated.result || "").length > 0);

        return summarize("Noun morph-realization checks", 6, collector);
    }

    function runExportProvenanceRealizationChecks() {
        const collector = createCollector();
        const { verbInput } = getComposerSurfaceElements();
        if (!verbInput) {
            collector.failures.push("missing verb input");
            return summarize("Export/provenance realization checks", 1, collector);
        }

        return withComposerSnapshot(() => {
            if (typeof setActiveTenseMode === "function") {
                setActiveTenseMode(TENSE_MODE.verbo);
            }
            if (typeof setCombinedMode === "function") {
                setCombinedMode(COMBINED_MODE.active);
            }
            if (typeof setActiveDerivationType === "function") {
                setActiveDerivationType(DERIVATION_TYPE.direct);
            }
            if (typeof updateTenseModeTabs === "function") {
                updateTenseModeTabs();
            }
            if (typeof updateCombinedModeTabs === "function") {
                updateCombinedModeTabs();
            }
            setInputValue(verbInput, "wal-(piya)");
            if (typeof renderActiveConjugations === "function") {
                renderActiveConjugations({ verb: "wal-(piya)", onlyTense: "presente" });
            }
            const csvBefore = buildViewExportCSV();
            collector.truthy("csv generated", csvBefore);
            collector.truthy(
                "unified output rows",
                Array.isArray(VERB_UNIFIED_OUTPUT_STATE.rows) && VERB_UNIFIED_OUTPUT_STATE.rows.length
            );
            collector.truthy("csv includes nalpiya", String(csvBefore || "").includes("nalpiya"));
            collector.truthy(
                "structured export rows include form",
                VERB_UNIFIED_OUTPUT_STATE.rows.some((row) => String(row.form || "") === "nalpiya")
            );
            const firstRenderedValue = document.querySelector("#all-tense-conjugations .conjugation-value");
            if (firstRenderedValue) {
                const originalText = firstRenderedValue.textContent;
                firstRenderedValue.textContent = "__dom_corruption__";
                collector.equal("csv independent of dom text", buildViewExportCSV(), csvBefore);
                firstRenderedValue.textContent = originalText;
            } else {
                collector.failures.push("missing rendered conjugation value");
            }

            const silentResult = generateWord({
                silent: true,
                skipValidation: true,
                override: {
                    tenseMode: TENSE_MODE.verbo,
                    derivationMode: DERIVATION_MODE.active,
                    voiceMode: VOICE_MODE.active,
                    derivationType: DERIVATION_TYPE.causative,
                    subjectPrefix: "ni",
                    subjectSuffix: "",
                    objectPrefix: "",
                    verb: "(tekiti1)",
                    tense: "presente",
                    parsedVerb: parseVerbInput("(tekiti1)"),
                },
            }) || {};
            const provenance = silentResult.stemProvenance || null;
            collector.truthy("provenance present", provenance);
            collector.equal("provenance stem surface", getProvenancePrimaryStemSurface(provenance), "tekita");
            collector.equal(
                "provenance variant surface",
                Array.isArray(provenance?.variants) && provenance.variants[0]
                    ? provenance.variants[0].surfaceStem
                    : "",
                "tekita"
            );

            return summarize("Export/provenance realization checks", 8, collector);
        });
    }

    function runToggleDiagnosticsRealizationChecks() {
        const collector = createCollector();
        const maskedMaskState = getConjugationMaskState({
            result: { result: "nipiya" },
            subjectPrefix: "ni",
            subjectSuffix: "",
            objectPrefix: "nech",
        });
        collector.equal(
            "masked diagnostic availability",
            maskedMaskState.availabilityState,
            CONJUGATION_AVAILABILITY_STATE.masked
        );
        collector.truthy(
            "masked diagnostic ids",
            Array.isArray(maskedMaskState.diagnosticIds)
            && maskedMaskState.diagnosticIds.includes(CONJUGATION_DIAGNOSTIC_IDS.personAgreement)
        );
        collector.equal("masked visible result", maskedMaskState.hasVisibleResult, false);

        const summary = createToggleAvailabilityRealizationSummary();
        collector.equal(
            "empty availability summary",
            realizeToggleAvailabilitySummary(summary).availabilityState,
            CONJUGATION_AVAILABILITY_STATE.impossible
        );
        recordToggleAvailabilityRealization(summary, buildConjugationEvaluationRecord({
            result: { result: "nipiya" },
            maskState: maskedMaskState,
        }));
        collector.equal(
            "masked availability summary",
            realizeToggleAvailabilitySummary(summary).availabilityState,
            CONJUGATION_AVAILABILITY_STATE.masked
        );
        recordToggleAvailabilityRealization(summary, buildConjugationEvaluationRecord({
            result: { result: "nalpiya" },
        }));
        collector.equal(
            "viable availability summary",
            realizeToggleAvailabilitySummary(summary).availabilityState,
            CONJUGATION_AVAILABILITY_STATE.viable
        );

        return withComposerSnapshot(() => {
            const { verbInput } = getComposerSurfaceElements();
            const modeSnapshot = {
                tenseMode: typeof getActiveTenseMode === "function" ? getActiveTenseMode() : "",
                combinedMode: typeof getCombinedMode === "function" ? getCombinedMode() : "",
                derivationType: typeof getActiveDerivationType === "function" ? getActiveDerivationType() : "",
            };
            try {
                if (typeof setActiveTenseMode === "function") {
                    setActiveTenseMode(TENSE_MODE.verbo);
                }
                if (typeof setCombinedMode === "function") {
                    setCombinedMode(COMBINED_MODE.active);
                }
                if (typeof setActiveDerivationType === "function") {
                    setActiveDerivationType(DERIVATION_TYPE.direct);
                }
                setInputValue(verbInput, "-(piya)");
                if (typeof renderActiveConjugations === "function") {
                    renderActiveConjugations({ verb: "-(piya)", onlyTense: "presente" });
                }
                const activeRow = document.querySelector("#all-tense-conjugations .conjugation-row");
                const activeValue = activeRow?.querySelector(".conjugation-value");
                collector.equal("active row diagnostic state", activeRow?.dataset?.diagnosticState || "", "viable");
                collector.equal("active value diagnostic state", activeValue?.dataset?.diagnosticState || "", "viable");

                if (typeof setActiveTenseMode === "function") {
                    setActiveTenseMode(TENSE_MODE.sustantivo);
                }
                if (typeof renderLocativoTemporalConjugations === "function") {
                    renderLocativoTemporalConjugations({
                        verb: "(nemi)",
                        containerId: "all-tense-conjugations",
                        modeFilter: COMBINED_MODE.active,
                    });
                }
                const locativoRow = document.querySelector("#all-tense-conjugations .conjugation-row");
                const locativoValue = locativoRow?.querySelector(".conjugation-value");
                collector.equal("locativo row diagnostic state", locativoRow?.dataset?.diagnosticState || "", "viable");
                collector.equal("locativo value diagnostic state", locativoValue?.dataset?.diagnosticState || "", "viable");

                const patientivoContext = buildNounTabRenderContext({
                    verb: "-(salua)",
                    tenseValue: "patientivo",
                });
                const patientivoProbeSelection = resolveNominalAvailabilityProbeSelection({
                    tenseValue: "patientivo",
                    patientivoSource: "tronco-verbal",
                    verbMeta: patientivoContext?.verbMeta || null,
                    objectPrefix: "",
                });
                collector.equal("patientivo tronco probe normalizes empty object to ta", patientivoProbeSelection.objectPrefix, "ta");
                const patientivoAvailability = resolveNominalCombinationAvailabilityRecord({
                    verb: "-(salua)",
                    tenseValue: "patientivo",
                    tenseMode: TENSE_MODE.sustantivo,
                    context: patientivoContext,
                    selection: { subjectPrefix: "", subjectSuffix: "" },
                    number: "singular",
                    possessorPrefix: "",
                    objectPrefix: "",
                    indirectObjectMarker: "",
                    thirdObjectMarker: "",
                    patientivoSource: "tronco-verbal",
                    patientivoOwnership: DEFAULT_PATIENTIVO_OWNERSHIP,
                    patientivoNominalSuffix: null,
                });
                collector.equal("patientivo tronco nominal availability stays viable", patientivoAvailability?.availabilityState, CONJUGATION_AVAILABILITY_STATE.viable);
                if (typeof renderNounConjugations === "function") {
                    renderNounConjugations({
                        verb: "-(salua)",
                        containerId: "all-tense-conjugations",
                        tenseValue: "patientivo",
                        modeKey: "noun",
                    });
                }
                const patientivoTroncoRow = document.querySelector("#all-tense-conjugations [data-tense-block$='patientivo-tronco'] .conjugation-row");
                const patientivoTroncoValue = patientivoTroncoRow?.querySelector(".conjugation-value");
                collector.truthy("patientivo tronco row renders", patientivoTroncoRow);
                collector.equal("patientivo tronco row keeps normalized indirect class", patientivoTroncoRow?.classList.contains("conjugation-row--indirect"), true);
                collector.equal("patientivo tronco value diagnostic state", patientivoTroncoValue?.dataset?.diagnosticState || "", "viable");
            } finally {
                if (typeof setActiveTenseMode === "function" && modeSnapshot.tenseMode) {
                    setActiveTenseMode(modeSnapshot.tenseMode);
                }
                if (typeof setCombinedMode === "function" && modeSnapshot.combinedMode) {
                    setCombinedMode(modeSnapshot.combinedMode);
                }
                if (typeof setActiveDerivationType === "function" && modeSnapshot.derivationType) {
                    setActiveDerivationType(modeSnapshot.derivationType);
                }
            }
            return summarize("Toggle/diagnostics realization checks", 15, collector);
        });
    }

    function runTenseTabAvailabilityRealizationChecks() {
        const collector = createCollector();

        const classAvailability = buildPretUniversalTenseAvailability({
            hasVerb: true,
            suppletiveStemSet: null,
            availabilityTargets: [{ verb: "(nemi)", analysisVerb: "(nemi)", isYawi: false, isWeya: false }],
            isTransitive: false,
            verbMeta: parseVerbInput("(nemi)"),
            derivationType: DERIVATION_TYPE.direct,
        });
        const firstAvailableClassEntry = getFirstAvailableEntry(classAvailability, "", "tenseValue");
        collector.truthy(
            "class availability helper returns record",
            firstAvailableClassEntry && typeof firstAvailableClassEntry === "object"
        );
        collector.equal(
            "class availability helper uses record state",
            resolveTenseAvailabilityIsAvailable(firstAvailableClassEntry),
            true
        );

        const parsedVerb = parseVerbInput("-(piya)");
        const activeVerbContext = buildVerbOutputContextForTenseTabs({
            tenseMode: TENSE_MODE.verbo,
            isNonactiveMode: false,
            verbMeta: parsedVerb,
        });
        const activeRecord = resolveVerbTenseAvailabilityRecord({
            tenseValue: "presente",
            verbOutputContext: activeVerbContext,
            hasVerb: true,
            endsWithConsonant: false,
            isNonactiveMode: false,
            displayVerb: "-(piya)",
            availabilityProbeMemo: new Map(),
            availabilityMemoContext: "dev-active",
            tenseOutputCache: new Map(),
        });
        collector.equal("active tense record output", activeRecord.hasOutput, true);
        collector.equal("active tense record state", activeRecord.availabilityState, CONJUGATION_AVAILABILITY_STATE.viable);

        const nominalRecord = resolveNominalTenseAvailabilityRecord({
            verb: "(nemi)",
            tenseValue: "sustantivo-verbal",
            tenseMode: TENSE_MODE.sustantivo,
            combinedMode: COMBINED_MODE.active,
        });
        collector.equal("nominal tense record output", nominalRecord?.hasOutput, true);
        collector.equal("nominal tense record state", nominalRecord?.availabilityState, CONJUGATION_AVAILABILITY_STATE.viable);

        const locativoRecord = resolveLocativoTemporalTenseAvailabilityRecord({
            verb: "(nemi)",
            combinedMode: COMBINED_MODE.active,
        });
        collector.equal("locativo tense record output", locativoRecord?.hasOutput, true);
        collector.equal("locativo tense record state", locativoRecord?.availabilityState, CONJUGATION_AVAILABILITY_STATE.viable);

        return withComposerSnapshot(() => {
            const { verbInput } = getComposerSurfaceElements();
            const modeSnapshot = {
                tenseMode: typeof getActiveTenseMode === "function" ? getActiveTenseMode() : "",
                combinedMode: typeof getCombinedMode === "function" ? getCombinedMode() : "",
            };
            try {
                if (typeof setActiveTenseMode === "function") {
                    setActiveTenseMode(TENSE_MODE.verbo);
                }
                if (typeof setCombinedMode === "function") {
                    setCombinedMode(COMBINED_MODE.active);
                }
                setInputValue(verbInput, "-(piya)");
                if (typeof renderTenseTabs === "function") {
                    renderTenseTabs();
                }
                const presentButton = document.querySelector('.tense-tab[data-tense-group="main"][data-tense-value="presente"]');
                collector.equal("present tab diagnostic state", presentButton?.dataset?.availabilityState || "", CONJUGATION_AVAILABILITY_STATE.viable);

                const universalButton = document.querySelector('.tense-tab[data-tense-group="universal"]');
                collector.truthy(
                    "universal tab diagnostic state",
                    String(universalButton?.dataset?.availabilityState || "").length > 0
                );
            } finally {
                if (typeof setActiveTenseMode === "function" && modeSnapshot.tenseMode) {
                    setActiveTenseMode(modeSnapshot.tenseMode);
                }
                if (typeof setCombinedMode === "function" && modeSnapshot.combinedMode) {
                    setCombinedMode(modeSnapshot.combinedMode);
                }
            }
            return summarize("Tense-tab availability realization checks", 10, collector);
        });
    }

    function runSelectionStateRealizationChecks() {
        const collector = createCollector();
        return withComposerSnapshot(() => {
            const { verbInput } = getComposerSurfaceElements();
            const modeSnapshot = {
                tenseMode: typeof getActiveTenseMode === "function" ? getActiveTenseMode() : "",
                combinedMode: typeof getCombinedMode === "function" ? getCombinedMode() : "",
                activeGroup: typeof getActiveConjugationGroup === "function" ? getActiveConjugationGroup() : "",
                nonactiveSuffix: typeof getSelectedNonactiveSuffix === "function"
                    ? getSelectedNonactiveSuffix()
                    : null,
                selectionState: typeof buildConjugationSelectionState === "function"
                    ? buildConjugationSelectionState()
                    : null,
            };
            try {
                if (typeof setActiveTenseMode === "function") {
                    setActiveTenseMode(TENSE_MODE.verbo);
                }
                if (typeof setCombinedMode === "function") {
                    setCombinedMode(COMBINED_MODE.active);
                }
                setInputValue(verbInput, "(nemi)");
                if (typeof renderTenseTabs === "function") {
                    renderTenseTabs();
                }
                const firstAvailableUniversal = getFirstAvailableEntry(
                    PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                    "",
                    "tenseValue"
                );
                collector.truthy("available universal record", firstAvailableUniversal);
                const availableClassKey = PRET_UNIVERSAL_CLASS_BY_TENSE[firstAvailableUniversal?.tenseValue || ""];
                collector.truthy("available class key", availableClassKey);

                const resolvedUniversalSelection = resolveConjugationSelectionState({
                    tenseMode: TENSE_MODE.verbo,
                    group: CONJUGATION_GROUPS.universal,
                    tenseValue: "presente",
                    universalTenseValue: "__bad__",
                    classFilter: availableClassKey,
                }, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });
                collector.equal("selection fallback keeps universal group", resolvedUniversalSelection.group, CONJUGATION_GROUPS.universal);
                collector.equal(
                    "selection fallback picks available universal",
                    resolvedUniversalSelection.universalTenseValue,
                    firstAvailableUniversal?.tenseValue || ""
                );
                collector.equal("selection fallback clears invalid class on non-class tense", resolvedUniversalSelection.classFilter, null);

                const classTense = Array.from(PRETERITO_CLASS_TENSES || [])[0] || "preterito";
                const resolvedClassSelection = resolveConjugationSelectionState({
                    tenseMode: TENSE_MODE.verbo,
                    group: CONJUGATION_GROUPS.tense,
                    tenseValue: classTense,
                    universalTenseValue: firstAvailableUniversal?.tenseValue || "",
                    classFilter: availableClassKey,
                }, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });
                collector.equal("class selection keeps class filter", resolvedClassSelection.classFilter, availableClassKey);

                applyConjugationSelectionState(resolvedClassSelection, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });
                collector.equal("applied selected tense", getSelectedTenseTab(), classTense);
                collector.equal("applied class filter", CLASS_FILTER_STATE.activeClass, availableClassKey);

                mutateConjugationSelectionState({ classFilter: null }, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });
                collector.equal("mutation helper clears class", CLASS_FILTER_STATE.activeClass, null);
                mutateConjugationSelectionState({ classFilter: availableClassKey }, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });
                collector.equal("mutation helper applies class on", CLASS_FILTER_STATE.activeClass, availableClassKey);

                applyConjugationSelectionState({
                    tenseMode: TENSE_MODE.verbo,
                    group: CONJUGATION_GROUPS.universal,
                    tenseValue: classTense,
                    universalTenseValue: firstAvailableUniversal?.tenseValue || "",
                    classFilter: null,
                }, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });
                if (typeof PRETERITO_UNIVERSAL_TABS_STATE === "object" && PRETERITO_UNIVERSAL_TABS_STATE) {
                    PRETERITO_UNIVERSAL_TABS_STATE.selected = "__bad__";
                }
                if (typeof TENSE_TABS_STATE === "object" && TENSE_TABS_STATE) {
                    TENSE_TABS_STATE.selected = "__bad__";
                }
                renderTenseTabs();
                const repairedSelection = buildConjugationSelectionState();
                collector.equal("render repairs invalid main tense", repairedSelection.tenseValue, "presente");
                collector.equal(
                    "render repairs invalid universal tense",
                    repairedSelection.universalTenseValue,
                    firstAvailableUniversal?.tenseValue || ""
                );

                setActiveTenseMode(TENSE_MODE.sustantivo);
                const nominalSelection = buildConjugationSelectionState({ tenseMode: TENSE_MODE.sustantivo });
                collector.equal("nominal mode resets group", nominalSelection.group, CONJUGATION_GROUPS.tense);
                collector.equal("nominal mode clears class", nominalSelection.classFilter, null);

                setActiveTenseMode(TENSE_MODE.verbo);
                renderTenseTabs();
                applyConjugationSelectionState(resolvedClassSelection, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });

                const snapshot = captureUiDensityGrammarSnapshot();
                applyConjugationSelectionState({
                    tenseMode: TENSE_MODE.verbo,
                    group: CONJUGATION_GROUPS.universal,
                    tenseValue: "presente",
                    universalTenseValue: firstAvailableUniversal?.tenseValue || "",
                    classFilter: null,
                }, {
                    tenseMode: TENSE_MODE.verbo,
                    availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                });
                restoreUiDensityGrammarSnapshot(snapshot);
                const restoredSelection = buildConjugationSelectionState();
                collector.equal("snapshot restore tense", restoredSelection.tenseValue, resolvedClassSelection.tenseValue);
                collector.equal("snapshot restore class", restoredSelection.classFilter, resolvedClassSelection.classFilter);

                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix("uwa");
                }
                setInputValue(verbInput, "(temi)");
                renderTenseTabs();
                collector.equal("precondition keeps explicit uwa selection", getSelectedNonactiveSuffix(), "uwa");
                setInputValue(verbInput, "(keluni)");
                renderTenseTabs();
                collector.equal("verb change clears stale nonactive suffix selection", getSelectedNonactiveSuffix(), null);
                collector.equal(
                    "verb change restores full keluni nonactive output",
                    String(generateWord({ skipValidation: true })?.result || ""),
                    "keluniwa / kelunuwa"
                );
            } finally {
                if (typeof setActiveTenseMode === "function" && modeSnapshot.tenseMode) {
                    setActiveTenseMode(modeSnapshot.tenseMode);
                }
                if (typeof setCombinedMode === "function" && modeSnapshot.combinedMode) {
                    setCombinedMode(modeSnapshot.combinedMode);
                }
                if (typeof setSelectedNonactiveSuffix === "function") {
                    setSelectedNonactiveSuffix(modeSnapshot.nonactiveSuffix);
                }
                if (modeSnapshot.selectionState && typeof applyConjugationSelectionState === "function") {
                    applyConjugationSelectionState(modeSnapshot.selectionState, {
                        tenseMode: modeSnapshot.selectionState.tenseMode || modeSnapshot.tenseMode,
                        availabilityEntries: PRETERITO_UNIVERSAL_AVAILABILITY_CACHE,
                    });
                } else if (typeof setActiveConjugationGroup === "function" && modeSnapshot.activeGroup) {
                    setActiveConjugationGroup(modeSnapshot.activeGroup);
                }
            }
            return summarize("Selection-state realization checks", 18, collector);
        });
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
                    supportiveMarker: "",
                    tiCausativeClass: "",
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

    function runComposerSlotStageChecks() {
        const collector = createCollector();

        return withComposerSnapshot(() => {
            setVerbInputMode(VERB_INPUT_MODE.composer, { syncFromInput: false });
            const stage = document.getElementById("composer-slot-stage");
            if (!stage) {
                collector.failures.push("missing composer slot stage");
                return summarize("Composer slot-stage checks", 1, collector);
            }

            const assertStageForTransitivity = (token, expectedStemId) => {
                const refsBeforeClick = getVerbComposerElements();
                const button = Array.from(refsBeforeClick.transitivitySlotButtons || []).find((candidate) => (
                    String(candidate.getAttribute("data-composer-transitivity") || "") === token
                    && isShown(candidate)
                ));
                if (!button || !clickElement(button)) {
                    collector.failures.push(`missing visible transitivity button for ${token}`);
                    return;
                }
                const refsAfterClick = getVerbComposerElements();
                const liveStemInput = stage.querySelector('input[id^="composer-stem-"]');
                collector.equal(`${token} live stage stem`, liveStemInput?.id || "", expectedStemId);
                collector.equal(`${token} active matrix stem`, refsAfterClick.matrixStemInput?.id || "", expectedStemId);
            };

            assertStageForTransitivity(COMPOSER_TRANSITIVITY.intransitive, "composer-stem-a");
            assertStageForTransitivity(COMPOSER_TRANSITIVITY.transitive, "composer-stem-b");
            assertStageForTransitivity(COMPOSER_TRANSITIVITY.bitransitive, "composer-stem-c");

            return summarize("Composer slot-stage checks", 6, collector);
        });
    }

    function runComposerPlaceholderChecks() {
        const collector = createCollector();

        collector.equal("display _", serializeRegexInputValue("_"), "_");
        collector.equal("display -_", serializeRegexInputValue("-_"), "-_");
        collector.equal("display (tajta)-_", serializeRegexInputValue("(tajta)-_"), "(tajta)-_");
        collector.equal("display (tejte)-_", serializeRegexInputValue("(tejte)-_"), "(tejte)-_");
        collector.equal("display (mujmu)-_", serializeRegexInputValue("(mujmu)-_"), "(mujmu)-_");
        collector.equal("display directional", serializeRegexInputValue("wal+(pewa)"), "wal+(pewa)");
        collector.equal("display supportive envelope", serializeRegexInputValue("un-(mati)"), "un-(mati)");
        collector.equal("envelope _", serializeCanonicalRegexEnvelope("_"), "_");
        collector.equal("envelope -_", serializeCanonicalRegexEnvelope("-_"), "-_");

        return summarize("Composer placeholder checks", 9, collector);
    }

    function runComposerSupportiveChecks() {
        const collector = createCollector();

        collector.equal(
            "initial supportive y",
            applyComposerSupportiveMarkerToRootPath({
                stem: "yawi",
                supportiveMarker: "y",
            }).stem,
            "[y]awi"
        );
        collector.equal(
            "post-vowel supportive y before non-e",
            applyComposerSupportiveMarkerToRootPath({
                stem: "yawi",
                supportiveMarker: "y",
                precedingSurface: "(ta)-",
            }).stem,
            "[y]awi"
        );
        collector.equal(
            "post-vowel supportive y before e",
            applyComposerSupportiveMarkerToRootPath({
                stem: "yeti",
                supportiveMarker: "y",
                precedingSurface: "(ta)-",
            }).stem,
            "eti"
        );
        collector.equal(
            "post-consonant supportive y",
            applyComposerSupportiveMarkerToRootPath({
                stem: "yawi",
                supportiveMarker: "y",
                precedingSurface: "k-",
            }).stem,
            "awi"
        );
        collector.equal(
            "post-i supportive y",
            applyComposerSupportiveMarkerToRootPath({
                stem: "yawi",
                supportiveMarker: "y",
                precedingSurface: "ki-",
            }).stem,
            "awi"
        );
        collector.equal(
            "initial reduplicative supportive y",
            applyComposerSupportiveMarkerToRootPath({
                stem: "yejyekua",
                supportiveMarker: "y",
            }).stem,
            "[y]ej[y]ekua"
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
            supportiveMarker: "y",
            tiCausativeClass: "",
        };
        collector.equal("transitive ta regex", buildComposerModeBundle(transitiveState).regexValue, "ta-([y]awi)");
        collector.equal("transitive ta display", buildComposerModeBundle(transitiveState).regexValue, "ta-([y]awi)");

        const intransitiveState = {
            ...transitiveState,
            transitivity: COMPOSER_TRANSITIVITY.intransitive,
            valence: "",
            slotAStem: "yawi",
            slotBStem: "",
        };
        collector.equal("initial regex", buildComposerModeBundle(intransitiveState).regexValue, "([y]awi)");
        collector.equal("initial display", buildComposerModeBundle(intransitiveState).regexValue, "([y]awi)");

        const redupState = {
            ...intransitiveState,
            slotAStem: "yejyekua",
            stem: "yejyekua",
            supportiveMarker: "y",
        };
        collector.equal("redup regex", buildComposerModeBundle(redupState).regexValue, "([y]ej[y]ekua)");
        collector.equal("redup display", buildComposerModeBundle(redupState).regexValue, "([y]ej[y]ekua)");

        const supportiveRoot = "ankwilia";
        collector.equal("parse after ta", parseVerbInput(`ta-([y]${supportiveRoot})`).verb, `tay${supportiveRoot}`);
        collector.equal("parse after consonant", parseVerbInput("(kal)-([y]awi)").verb, "kalawi");
        collector.equal("parse after vowel before e", parseVerbInput("ta-([y]eti)").verb, "taeti");
        collector.equal("parse after i", parseVerbInput(`(ki)-([y]${supportiveRoot})`).verb, `ki${supportiveRoot}`);
        collector.equal("parse initial redup", parseVerbInput("([y]ej[y]ekua)").verb, "ejekua");
        collector.equal("parse noninitial redup", parseVerbInput("(ki)-([y]ej[y]ekua)").verb, "kiejekua");

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
                verb: `ta-([y]${supportiveRoot})`,
                tense: "presente",
                parsedVerb: parseVerbInput(`ta-([y]${supportiveRoot})`),
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
                verb: "-([y]ej[y]ekua)",
                tense: "presente",
                parsedVerb: parseVerbInput("-([y]ej[y]ekua)"),
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
            supportiveMarker: "",
            tiCausativeClass: "",
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
            runMovingTargetOutputChecks(),
            runComposerSlotStageChecks(),
            runComposerPlaceholderChecks(),
            runComposerSupportiveChecks(),
            runComposerShortFormChecks(),
            runComposerNounToVerbSuffixCompatibilityChecks(),
            runNonactiveMorphRealizationChecks(),
            runNominalMorphRealizationChecks(),
            runOperationSupportiveINonactive(),
            runOperationBackSys(),
            runOperationBroughtback(),
            runOperationPatientiveRealization(),
            runOperationNounRealPipeline(),
            runNounMorphRealizationChecks(),
            runExportProvenanceRealizationChecks(),
            runToggleDiagnosticsRealizationChecks(),
            runTenseTabAvailabilityRealizationChecks(),
            runSelectionStateRealizationChecks(),
        ];
        const failures = results.flatMap((result) => result.failures || []);
        const total = results.reduce((sum, result) => sum + Number(result.total || 0), 0);
        const collector = createCollector();
        collector.failures.push(...failures);
        return summarize("Composer display bridge tests", total, collector);
    }

    function runComposerButtonCombinatorialAudit() {
        return withComposerSnapshot(() => {
            const results = [
                runComposerCoreButtonAudit(),
                runComposerMatrixAffixButtonAudit(),
                runComposerSerialTypeButtonAudit(),
            ];
            const failures = results.flatMap((result) => result.failures || []);
            const total = results.reduce((sum, result) => sum + Number(result.total || 0), 0);
            const collector = createCollector();
            collector.failures.push(...failures);
            return summarize("Composer button combinatorial audit", total, collector);
        });
    }

    if (typeof window === "object" && window) {
        window.runRegexEnvelopeLanguageTests = runRegexEnvelopeLanguageTests;
        window.runComposerDisplayBridgeTests = runComposerDisplayBridgeTests;
        window.runComposerSupportiveChecks = runComposerSupportiveChecks;
        window.runComposerNounToVerbSuffixCompatibilityChecks = runComposerNounToVerbSuffixCompatibilityChecks;
        window.runExportProvenanceRealizationChecks = runExportProvenanceRealizationChecks;
        window.runToggleDiagnosticsRealizationChecks = runToggleDiagnosticsRealizationChecks;
        window.runTenseTabAvailabilityRealizationChecks = runTenseTabAvailabilityRealizationChecks;
        window.runSelectionStateRealizationChecks = runSelectionStateRealizationChecks;
        window.runComposerButtonCombinatorialAudit = runComposerButtonCombinatorialAudit;
        window.runNominalMorphRealizationChecks = runNominalMorphRealizationChecks;
        window.runNounMorphRealizationChecks = runNounMorphRealizationChecks;
        window.runOperationFinderAudit = runOperationFinderAudit;
        window.runOperationStableExpanse = runOperationStableExpanse;
        window.runOperationSupportiveINonactive = runOperationSupportiveINonactive;
        window.runOperationBackSys = runOperationBackSys;
        window.runOperationBroughtback = runOperationBroughtback;
        window.runOperationPatientiveRealization = runOperationPatientiveRealization;
        window.runOperationNounRealPipeline = runOperationNounRealPipeline;
    }
})();
