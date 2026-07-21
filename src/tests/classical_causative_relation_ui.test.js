"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_causative_relation_ui");
    const composerSource = fs.readFileSync(
        path.resolve(__dirname, "..", "ui", "composer", "composer.mjs"),
        "utf8"
    );

    s.eq(
        "Only Canvas-supported causative participant controls forward whitelisted user intent",
        typeof ctx.getClassicalCausativeParticipantControlRequestOverrides === "function"
            ? {
                objectKind: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-object-kind",
                    value: "specific-projective",
                    derivedStem: "forged-target",
                }),
                referentRelation: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-referent-relation",
                    value: "distinct",
                    result: "forged-result",
                }),
                specificShuntline: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-specific-shuntline-realization",
                    value: "sounded",
                    formulaEcho: "forged-formula",
                }),
                intentionalReset: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-causative-referent-relation",
                    value: "",
                }),
                unrelated: ctx.getClassicalCausativeParticipantControlRequestOverrides({
                    id: "classical-rule-logic-subject",
                    value: "1sg",
                    causativeReferentRelation: "coreferential",
                }),
            }
            : null,
        {
            objectKind: {},
            referentRelation: {
                causativeReferentRelation: "distinct",
                causativeSpecificShuntlineRealization: "",
            },
            specificShuntline: {
                causativeReferentRelation: "",
                causativeSpecificShuntlineRealization: "sounded",
            },
            intentionalReset: {
                causativeReferentRelation: "",
                causativeSpecificShuntlineRealization: "",
            },
            unrelated: {},
        }
    );

    s.ok(
        "Direct and delegated change listeners cover existing and late participant controls without double rendering",
        composerSource.includes("getClassicalCausativeParticipantControlRequestOverrides(control)")
            && composerSource.includes('documentObject.addEventListener("change", handleClassicalCausativeParticipantControlChange, true);')
            && composerSource.includes('documentObject.addEventListener("click", handleClassicalCausativeParticipantRevisionClick);')
            && composerSource.includes('const classicalRuleLogicControls = targetObject.document.querySelectorAll("[data-classical-rule-logic-control]");\n      initClassicalCausativeParticipantControlEvents();\n      if (!ansButton')
            && (composerSource.match(/documentObject\.addEventListener\("change", handleClassicalCausativeParticipantControlChange, true\);/g) || []).length === 1
            && composerSource.includes('if (isClassicalCausativeParticipantControl(control)) {\n          // Keep the delegated listener')
            && composerSource.includes('control.addEventListener("change", handleClassicalCausativeParticipantControlChange);')
            && composerSource.includes("HandledClassicalCausativeParticipantChangeEvents.has(event)")
            && composerSource.includes('CLASSICAL_CAUSATIVE_PARTICIPANT_CONTROL_REQUEST_KEYS[String(option.dataset?.classicalSegmentControl || "")]')
    );

    s.eq(
        "The delegated event path accepts participant changes and ignores unrelated controls",
        typeof ctx.handleClassicalCausativeParticipantControlChange === "function"
            ? (() => {
                const originalRenderClassicalRuleLogicSurfaceBlock = ctx.renderClassicalRuleLogicSurfaceBlock;
                ctx.renderClassicalRuleLogicSurfaceBlock = () => null;
                try {
                    return {
                        selected: ctx.handleClassicalCausativeParticipantControlChange({
                            target: {
                                id: "classical-rule-logic-causative-object-kind",
                                value: "nonspecific-nonhuman",
                            },
                        }),
                        lateRelation: ctx.handleClassicalCausativeParticipantControlChange({
                            target: {
                                id: "classical-rule-logic-causative-referent-relation",
                                value: "distinct",
                            },
                        }),
                        unrelated: ctx.handleClassicalCausativeParticipantControlChange({
                            target: {
                                id: "classical-rule-logic-subject",
                                value: "2sg",
                            },
                        }),
                    };
                } finally {
                    ctx.renderClassicalRuleLogicSurfaceBlock = originalRenderClassicalRuleLogicSurfaceBlock;
                }
            })()
            : null,
        {
            selected: false,
            lateRelation: true,
            unrelated: false,
        }
    );

    s.eq(
        "The live-shaped relation control retains eligible shuntline intent and Change resets the relation",
        typeof ctx.getClassicalCausativeParticipantControlRequestOverrides === "function"
            && typeof ctx.handleClassicalCausativeParticipantRevisionClick === "function"
            && ctx.document
            ? (() => {
                const originalGetElementById = ctx.document.getElementById;
                const priorSurfaceFrame = ctx.ActiveClassicalRuleLogicSurfaceFrame;
                const originalRenderClassicalRuleLogicSurfaceBlock = ctx.renderClassicalRuleLogicSurfaceBlock;
                const controls = {
                    "classical-rule-logic-causative-referent-relation": {
                        id: "classical-rule-logic-causative-referent-relation",
                        value: "",
                    },
                    "classical-rule-logic-causative-specific-shuntline-realization": {
                        id: "classical-rule-logic-causative-specific-shuntline-realization",
                        value: "silent",
                    },
                };
                ctx.document.getElementById = (id) => controls[id] || null;
                ctx.renderClassicalRuleLogicSurfaceBlock = () => null;
                try {
                    controls["classical-rule-logic-causative-referent-relation"].value = "distinct";
                    const relationRequest = ctx.getClassicalCausativeParticipantControlRequestOverrides(
                        controls["classical-rule-logic-causative-referent-relation"]
                    );
                    const revisionButton = {
                        disabled: false,
                        dataset: {
                            classicalSegmentControl: "classical-rule-logic-causative-referent-relation",
                            classicalSegmentValue: "",
                            classicalSegmentReset: "true",
                        },
                        closest() {
                            return this;
                        },
                    };
                    const resetAccepted = ctx.handleClassicalCausativeParticipantRevisionClick({
                        target: revisionButton,
                    });
                    return {
                        relationRequest,
                        resetAccepted,
                        relationAfterReset: controls["classical-rule-logic-causative-referent-relation"].value,
                    };
                } finally {
                    ctx.document.getElementById = originalGetElementById;
                    ctx.ActiveClassicalRuleLogicSurfaceFrame = priorSurfaceFrame;
                    ctx.renderClassicalRuleLogicSurfaceBlock = originalRenderClassicalRuleLogicSurfaceBlock;
                }
            })()
            : null,
        {
            relationRequest: {
                causativeReferentRelation: "distinct",
                causativeSpecificShuntlineRealization: "silent",
            },
            resetAccepted: true,
            relationAfterReset: "",
        }
    );

    s.eq(
        "The iuc-ci equal-person causative recomputes from required relation to an authorized typed result",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "iuc-ci",
                    sourceTransitivity: "intransitive",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "3sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "causative",
                    causativeSourceSubject: "3sg",
                    causativeSourceVoice: "active",
                    vncVoice: "active",
                    mood: "indicative",
                    tense: "present",
                    lesson11Construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const option = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "iuc-xi-tiā"
                );
                const pending = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId: option?.optionId || "",
                    causativeObjectKind: "specific-projective",
                });
                const priorSurfaceFrame = ctx.ActiveClassicalRuleLogicSurfaceFrame;
                ctx.ActiveClassicalRuleLogicSurfaceFrame = pending;
                let selected;
                try {
                    selected = ctx.buildClassicalRuleLogicSurfaceFrame({
                        ...base,
                        derivationOptionId: option?.optionId || "",
                        causativeObjectKind: "specific-projective",
                        causativeReferentRelation: "distinct",
                    });
                } finally {
                    ctx.ActiveClassicalRuleLogicSurfaceFrame = priorSurfaceFrame;
                }
                return {
                    pending: [pending.authorizationStatus, pending.blockReason],
                    selected: [selected.authorizationStatus, selected.blockReason],
                    requestedRelation: selected.state?.requestedCausativeReferentRelation || "",
                    selectedRelation: selected.state?.causativeReferentRelation || "",
                    normalizedRelation: selected.state?.vncApplicationFrame?.normalizedRequest?.causativeReferentRelation || "",
                    selectedFormula: selected.selectedFormula,
                    sentenceSurface: selected.sentenceSurfaceDisplay,
                };
            })()
            : null,
        {
            pending: ["blocked", "classical-vnc-causative-equal-person-category-referent-choice-required"],
            selected: ["authorized", ""],
            requestedRelation: "distinct",
            selectedRelation: "distinct",
            normalizedRelation: "distinct",
            selectedFormula: "#0-0+qu-0(iuc-xi-tia)0+0-0#",
            sentenceSurface: "Quiucxitia.",
        }
    );

    s.eq(
        "Stale downstream causative choices are cleared by the application boundary rather than becoming grammar input",
        typeof ctx.buildClassicalRuleLogicSurfaceFrame === "function"
            ? (() => {
                const base = {
                    basalUnit: "vnc",
                    lesson: "7",
                    stem: "iuc-ci",
                    sourceTransitivity: "intransitive",
                    verbClass: "A",
                    valence: "intransitive",
                    subject: "1sg",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    derivationType: "causative",
                    causativeSourceSubject: "3sg",
                    causativeSourceVoice: "active",
                    vncVoice: "active",
                    mood: "indicative",
                    tense: "present",
                    lesson11Construction: "none",
                    vncOutputScope: "single",
                    sentenceSurfaceMode: "statement",
                    sentenceNegativeMode: "positive",
                };
                const preview = ctx.buildClassicalRuleLogicSurfaceFrame(base);
                const option = preview.state?.derivationOptionInventory?.options?.find(
                    (candidate) => candidate.targetStem === "iuc-xi-tiā"
                );
                const selected = ctx.buildClassicalRuleLogicSurfaceFrame({
                    ...base,
                    derivationOptionId: option?.optionId || "",
                    causativeObjectKind: "nonspecific-nonhuman",
                    causativeReferentRelation: "distinct",
                    causativeSpecificShuntlineRealization: "sounded",
                });
                return {
                    status: [selected.authorizationStatus, selected.blockReason],
                    relationEligible: selected.state?.causativeReferentRelationChoiceEligible === true,
                    shuntlineEligible: selected.state?.causativeSpecificShuntlineChoiceEligible === true,
                    selectedRelation: selected.state?.causativeReferentRelation || "",
                    selectedShuntline: selected.state?.causativeSpecificShuntlineRealization || "",
                    normalizedRelation: selected.state?.vncApplicationFrame?.normalizedRequest?.causativeReferentRelation || "",
                    normalizedShuntline: selected.state?.vncApplicationFrame?.normalizedRequest?.causativeSpecificShuntlineRealization || "",
                    selectedFormula: selected.selectedFormula,
                    sentenceSurface: selected.sentenceSurfaceDisplay,
                };
            })()
            : null,
        {
            status: ["authorized", ""],
            relationEligible: false,
            shuntlineEligible: false,
            selectedRelation: "",
            selectedShuntline: "",
            normalizedRelation: "",
            normalizedShuntline: "",
            selectedFormula: "#ni-0+qu-0(iuc-xi-tia)0+0-0#",
            sentenceSurface: "Niquiucxitia.",
        }
    );

    return s;
}

module.exports = { run };
