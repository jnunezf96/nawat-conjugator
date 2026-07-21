"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_application_continuity");

    s.eq(
        "The actual shell Mood and Tense options, Canvas ledger, and UI normalizers match the canonical semantic contract",
        (() => {
            const shell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
            const readOptions = (id) => {
                const idIndex = shell.indexOf(`id="${id}"`);
                const start = shell.lastIndexOf("<select", idIndex);
                const end = shell.indexOf("</select>", idIndex);
                const markup = start >= 0 && end >= 0 ? shell.slice(start, end) : "";
                return Array.from(markup.matchAll(/<option\s+value="([^"]*)"[^>]*data-classical-authority-option-tag="([^"]+)"/gu))
                    .map((match) => ({ value: match[1], tagId: match[2] }));
            };
            const moodOptions = readOptions("classical-rule-logic-mood");
            const tenseOptions = readOptions("classical-rule-logic-tense");
            const vocabulary = ctx.getClassicalNahuatlVncSemanticInputVocabulary();
            const validation = ctx.validateClassicalNahuatlVncSemanticControlInventory({
                moodOptions,
                tenseOptions,
                authorityOptionTags: ctx.getClassicalRuleLogicAuthorityOptionTags(),
            });
            const hostileValidation = ctx.validateClassicalNahuatlVncSemanticControlInventory({
                moodOptions,
                tenseOptions: tenseOptions.map((option, index) => index === 0 ? { ...option, value: "fabricated-present" } : option),
                authorityOptionTags: ctx.getClassicalRuleLogicAuthorityOptionTags(),
            });
            return {
                status: validation.authorizationStatus,
                blockReason: validation.blockReason,
                moodInventoryMatches: validation.moodInventoryMatches,
                tenseInventoryMatches: validation.tenseInventoryMatches,
                mismatchedAuthorityOptions: validation.mismatchedAuthorityOptions,
                moodNormalizerMatches: vocabulary.moods.every((mood) => ctx.normalizeClassicalRuleLogicSurfaceMood(mood) === mood),
                tenseNormalizerMatches: vocabulary.tenses.every((tense) => ctx.normalizeClassicalRuleLogicSurfaceTense(tense) === tense),
                hostileStatus: hostileValidation.authorizationStatus,
                hostileReason: hostileValidation.blockReason,
            };
        })(),
        {
            status: "authorized",
            blockReason: "",
            moodInventoryMatches: true,
            tenseInventoryMatches: true,
            mismatchedAuthorityOptions: [],
            moodNormalizerMatches: true,
            tenseNormalizerMatches: true,
            hostileStatus: "blocked",
            hostileReason: "vnc-semantic-control-inventory-does-not-match-canonical-contract",
        }
    );

    s.eq(
        "Unknown and contextually unavailable semantic selections fail closed inside Lesson 11",
        [
            ctx.buildClassicalNahuatlLesson11ParadigmPlan("nemi", { mood: "indicative", tense: "fabricated-past" }),
            ctx.buildClassicalNahuatlLesson11ParadigmPlan("nemi", { mood: "fabricated-mood", tense: "present" }),
            ctx.buildClassicalNahuatlLesson11ParadigmPlan("pāca", { mood: "indicative", tense: "general-past" }),
            ctx.buildClassicalNahuatlLesson11ParadigmPlan("nemi", { mood: "indicative", tense: "nonpast" }),
        ].map((plan) => [plan.authorizationStatus, plan.blockReason]),
        [
            ["blocked", "vnc-semantic-tense-not-recognized"],
            ["blocked", "vnc-semantic-mood-not-recognized"],
            ["blocked", "vnc-semantic-tense-not-authorized-for-selected-verbstem"],
            ["blocked", "vnc-semantic-tense-not-authorized-for-mood"],
        ]
    );

    s.eq(
        "The actual derivation buttons and Canvas ledger match the canonical derivation-type contract",
        (() => {
            const shell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
            const options = Array.from(shell.matchAll(/data-derivation-type="([^"]+)"\s+data-classical-authority-option-tag="([^"]+)"/gu))
                .map((match) => ({ value: match[1], tagId: match[2] }));
            const vocabulary = ctx.getClassicalNahuatlVncDerivationTypeVocabulary();
            const validation = ctx.validateClassicalNahuatlVncDerivationTypeControlInventory({
                options,
                authorityOptionTags: ctx.getClassicalRuleLogicAuthorityOptionTags(),
            });
            const hostile = ctx.validateClassicalNahuatlVncDerivationTypeControlInventory({
                options: options.map((option, index) => index === 1 ? { ...option, value: "fabricated-causative" } : option),
                authorityOptionTags: ctx.getClassicalRuleLogicAuthorityOptionTags(),
            });
            return {
                types: vocabulary.derivationTypes,
                derivedTypes: vocabulary.derivedTypes,
                status: validation.authorizationStatus,
                mismatches: validation.mismatchedAuthorityOptions,
                hostileStatus: hostile.authorizationStatus,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            types: ["direct", "causative", "applicative"],
            derivedTypes: ["causative", "applicative"],
            status: "authorized",
            mismatches: [],
            hostileStatus: "blocked",
            hostileReason: "classical-vnc-derivation-type-control-inventory-mismatch",
        }
    );

    s.eq(
        "A fabricated derivation cannot be normalized into an authorized Direct surface",
        (() => {
            const state = ctx.getClassicalRuleLogicSurfaceState({
                basalUnit: "vnc",
                lesson: "7",
                stem: "nemi",
                derivationType: "fabricated-derivation",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
            });
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame(state);
            return {
                requested: state.requestedDerivation,
                safeLayoutType: state.derivationType,
                selectionStatus: state.derivationTypeSelectionFrame.authorizationStatus,
                applicationStatus: state.vncApplicationFrame.authorizationStatus,
                reason: state.vncApplicationFrame.blockReason,
                formula: surface.formula || "",
                surface: surface.surface || "",
            };
        })(),
        {
            requested: "fabricated-derivation",
            safeLayoutType: "direct",
            selectionStatus: "blocked",
            applicationStatus: "blocked",
            reason: "classical-vnc-derivation-type-not-recognized",
            formula: "",
            surface: "",
        }
    );

    s.eq(
        "Target and causative-source voice controls preserve exact ordered Canvas parity",
        (() => {
            const shell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
            const readOptions = id => {
                const idIndex = shell.indexOf(`id="${id}"`);
                const start = shell.lastIndexOf("<select", idIndex);
                const end = shell.indexOf("</select>", idIndex);
                const markup = start >= 0 && end >= 0 ? shell.slice(start, end) : "";
                return Array.from(markup.matchAll(/<option\s+value="([^"]*)"[^>]*data-classical-authority-option-tag="([^"]+)"/gu))
                    .map(match => ({ value: match[1], tagId: match[2] }));
            };
            const targetVoiceOptions = readOptions("classical-rule-logic-vnc-voice");
            const causativeSourceVoiceOptions = readOptions("classical-rule-logic-causative-source-voice");
            const vocabulary = ctx.getClassicalNahuatlVncVoiceVocabulary();
            const validation = ctx.validateClassicalNahuatlVncVoiceControlInventory({
                targetVoiceOptions,
                causativeSourceVoiceOptions,
                authorityOptionTags: ctx.getClassicalRuleLogicAuthorityOptionTags(),
            });
            const hostile = ctx.validateClassicalNahuatlVncVoiceControlInventory({
                targetVoiceOptions: targetVoiceOptions.map((option, index) => index === 1 ? { ...option, value: "fabricated-passive" } : option),
                causativeSourceVoiceOptions,
                authorityOptionTags: ctx.getClassicalRuleLogicAuthorityOptionTags(),
            });
            return {
                targetVoices: vocabulary.targetVoices,
                sourceVoices: vocabulary.causativeSourceVoices,
                contextualSubset: vocabulary.causativeSourceVoiceIsContextualSubset,
                higherLayersSeparate: vocabulary.higherVoiceLayersAreSeparate,
                status: validation.authorizationStatus,
                mismatches: validation.mismatchedAuthorityOptions,
                hostileStatus: hostile.authorizationStatus,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            targetVoices: ["active", "passive", "impersonal", "inherent-impersonal", "tla-impersonal"],
            sourceVoices: ["active", "passive", "impersonal"],
            contextualSubset: true,
            higherLayersSeparate: true,
            status: "authorized",
            mismatches: [],
            hostileStatus: "blocked",
            hostileReason: "classical-vnc-voice-control-inventory-mismatch",
        }
    );

    s.eq(
        "Fabricated target and causative-source voices survive only as blocked diagnostics in surface state",
        (() => {
            const summarize = overrides => {
                const state = ctx.getClassicalRuleLogicSurfaceState({
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "nemi",
                    derivationType: overrides.derivationType || "direct",
                    subject: "3sg",
                    mood: "indicative",
                    tense: "present",
                    ...overrides,
                });
                return {
                    requestedTarget: state.requestedVncVoice,
                    targetSelectionStatus: state.targetVoiceSelectionFrame.authorizationStatus,
                    requestedSource: state.requestedSourceVoice,
                    sourceSelectionStatus: state.sourceVoiceSelectionFrame.authorizationStatus,
                    safeTarget: state.vncVoice,
                    safeSource: state.sourceVoice,
                    applicationStatus: state.vncApplicationFrame.authorizationStatus,
                    reason: state.vncApplicationFrame.blockReason,
                    formula: state.vncApplicationFrame.resultFrame.formulaRealization,
                    surface: state.vncApplicationFrame.resultFrame.surfaceRealization,
                };
            };
            return {
                target: summarize({ vncVoice: "fabricated-target-voice" }),
                source: summarize({ derivationType: "causative", sourceVoice: "fabricated-source-voice" }),
            };
        })(),
        {
            target: {
                requestedTarget: "fabricated-target-voice",
                targetSelectionStatus: "blocked",
                requestedSource: "active",
                sourceSelectionStatus: "authorized",
                safeTarget: "active",
                safeSource: "active",
                applicationStatus: "blocked",
                reason: "classical-vnc-target-voice-not-recognized",
                formula: "",
                surface: "",
            },
            source: {
                requestedTarget: "active",
                targetSelectionStatus: "authorized",
                requestedSource: "fabricated-source-voice",
                sourceSelectionStatus: "blocked",
                safeTarget: "active",
                safeSource: "active",
                applicationStatus: "blocked",
                reason: "classical-vnc-causative-source-voice-not-recognized",
                formula: "",
                surface: "",
            },
        }
    );

    s.eq(
        "The application boundary cannot authorize a fabricated semantic tense",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const result = application.evaluate({
                sourceStem: "(nemi)",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "fabricated-past",
                derivationType: "direct",
                requestedVoice: "active",
            });
            return {
                status: result.authorizationStatus,
                resultStatus: result.resultFrame?.authorizationStatus || "",
                blockReason: result.blockReason || result.resultFrame?.blockReason || "",
                formula: result.resultFrame?.formulaRealization || "",
                surface: result.resultFrame?.surfaceRealization || "",
            };
        })(),
        {
            status: "blocked",
            resultStatus: "blocked",
            blockReason: "vnc-semantic-tense-not-recognized",
            formula: "",
            surface: "",
        }
    );

    s.eq(
        "A restored or injected invalid semantic selection cannot inherit the UI fallback's output",
        (() => {
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                stem: "(nemi)",
                basalUnit: "vnc",
                lesson: "7",
                sourceTransitivity: "intransitive",
                valence: "intransitive",
                verbClass: "B",
                subject: "3sg",
                mood: "fabricated-mood",
                tense: "general-past",
                derivationType: "direct",
                vncVoice: "active",
            });
            return {
                status: surface.authorizationStatus,
                blockReason: surface.blockReason,
                requestedMood: surface.state.semanticSelectionFrame.requestedMood,
                layoutMood: surface.state.mood,
                applicationStatus: surface.state.vncApplicationFrame?.authorizationStatus || "",
                formula: surface.selectedFormula,
                surface: surface.sentenceSurfaceDisplay,
            };
        })(),
        {
            status: "blocked",
            blockReason: "vnc-semantic-mood-not-recognized",
            requestedMood: "fabricated-mood",
            layoutMood: "indicative",
            applicationStatus: "blocked",
            formula: "",
            surface: "",
        }
    );

    s.eq(
        "Direct application preserves the Lesson 11 typed paradigm member through selected Result",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const generalPast = application.evaluate({
                sourceStem: "(nemi)",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "general-past",
                derivationType: "direct",
                requestedVoice: "active",
            });
            return {
                status: generalPast.authorizationStatus,
                source: generalPast.normalizedRequest.sourceStem,
                selectedStem: generalPast.resultFrame.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                semanticTense: generalPast.resultFrame.sourceMachineryFrame?.lesson11ParadigmPlan?.requestedSemanticTense || "",
                morphologicalTense: generalPast.resultFrame.sourceMachineryFrame?.lesson11ParadigmPlan?.morphologicalTense || "",
                formula: generalPast.resultFrame.formulaRealization,
                surface: generalPast.resultFrame.surfaceRealization,
            };
        })(),
        {
            status: "authorized",
            source: "nemi",
            selectedStem: "nen",
            semanticTense: "general-past",
            morphologicalTense: "distant-past",
            formula: "#0-0(nen)ca+0-0#",
            surface: "nenca",
        }
    );

    s.eq(
        "Visible Result consumes the authorized application frame instead of rebuilding from source spelling",
        (() => {
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem: "(nemi)",
                subject: "3sg",
                mood: "indicative",
                tense: "general-past",
                verbClass: "B",
                valence: "intransitive",
                derivationType: "direct",
                vncVoice: "active",
            });
            return {
                status: surface.authorizationStatus,
                stateTense: surface.state?.tense || "",
                applicationStem: surface.state?.vncApplicationFrame?.resultFrame?.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                machineryStem: surface.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
                formula: surface.selectedFormula,
                surface: surface.sentenceSurfaceDisplay,
            };
        })(),
        {
            status: "authorized",
            stateTense: "general-past",
            applicationStem: "nen",
            machineryStem: "nen",
            formula: "#0-0(nen)ca+0-0#",
            surface: "Nenca.",
        }
    );

    s.eq(
        "Sibling Lesson 11 general-past routes retain their typed paradigm members after surface normalization",
        [
            ["nemi", "3sg"],
            ["mani", "3sg"],
            ["ih-ca", "1sg"],
            ["ye", "1sg"],
        ].map(([stem, subject]) => {
            const surface = ctx.buildClassicalRuleLogicSurfaceFrame({
                basalUnit: "vnc",
                lesson: "7",
                stem,
                subject,
                mood: "indicative",
                tense: "general-past",
                verbClass: "B",
                valence: "intransitive",
                derivationType: "direct",
                vncVoice: "active",
            });
            const slots = surface.machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame?.slots || {};
            return [stem, surface.state?.tense || "", slots.predicate?.stem || "", slots.predicate?.tns || "", surface.selectedFormula];
        }),
        [
            ["nemi", "general-past", "nen", "ca", "#0-0(nen)ca+0-0#"],
            ["mani", "general-past", "man", "ca", "#0-0(man)ca+0-0#"],
            ["ih-ca", "general-past", "ih-ca", "ca", "#n-0(ih-ca)ca+0-0#"],
            ["ye", "general-past", "ca-t", "ca", "#ni-0(ca-t)ca+0-0#"],
        ]
    );

    return s;
}

module.exports = { run };
