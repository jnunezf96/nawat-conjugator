"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11");
    const buildPronominalNncCooperationFrame = (subject = "3sg") => (
        ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "personal-simple", subject })
            .lesson11CooperationFrame
    );

    s.eq(
        "Lesson 11.1-11.6 Canvas claims are represented with exact line authority",
        (() => {
            const rules = ctx.getClassicalNahuatlLesson11Rules();
            return {
                sections: Array.from(new Set(rules.map((rule) => rule.section))),
                count: rules.length,
                allWitnessed: rules.every((rule) => rule.lineStart > 0 && rule.lineEnd >= rule.lineStart && rule.exactWitness),
            };
        })(),
        {
            sections: ["11.1", "11.2", "11.3.1", "11.3.2", "11.4", "11.4.1", "11.4.2", "11.4.3", "11.4.4", "11.4.5", "11.4.5 Note 1", "11.4.5 Note 2", "11.4.6", "11.4.7", "11.4.8", "11.4.9", "11.5", "11.5.1", "11.5.1.c.i", "11.5.2", "11.5.2 Note", "11.5.3", "11.6"],
            count: 35,
            allWitnessed: true,
        }
    );

    s.eq(
        "Lesson 11.1-11.2 preserve the regular system and reuse ce-ya Lesson 7.4 authority",
        (() => {
            const unknown = ctx.buildClassicalNahuatlLesson11ParadigmPlan("pāca", { tense: "preterit" });
            const ceya = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ce-ya", { tense: "preterit" });
            return {
                unknownApplies: unknown.applies,
                unknownAuthorized: unknown.authorizationStatus,
                unknownRegularAuthority: unknown.regularSystemRemainsAuthority,
                ceyaKind: ceya.irregularityKind,
                ceyaActions: ceya.actions,
                ceyaStemOverride: ceya.selectedStemOverride,
            };
        })(),
        {
            unknownApplies: false,
            unknownAuthorized: "authorized",
            unknownRegularAuthority: true,
            ceyaKind: "lesson7-delegated-irregular-sound-change",
            ceyaActions: ["reuse-regular-sound-rule"],
            ceyaStemOverride: "",
        }
    );

    s.eq(
        "Lesson 11 builds complete Canvas paradigm relations for Result without user paradigm entry",
        (() => {
            const plan = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ye", {
                subject: "3sg",
                mood: "indicative",
                tense: "present",
            });
            const go = ctx.getClassicalNahuatlLesson11ParadigmRelationFrame("yā");
            const come = ctx.getClassicalNahuatlLesson11ParadigmRelationFrame("huāl-lā");
            const conditioned = ctx.getClassicalNahuatlLesson11ParadigmRelationFrame("mati");
            const defective = ctx.getClassicalNahuatlLesson11ParadigmRelationFrame("ā");
            const zeroRoot = ctx.getClassicalNahuatlLesson11ParadigmRelationFrame("i-ā");
            const unknown = ctx.getClassicalNahuatlLesson11ParadigmRelationFrame("pāca");
            return {
                kind: plan.paradigmRelationFrame.kind,
                be: plan.paradigmRelationFrame.relationDisplay,
                go: go.relationDisplay,
                come: come.relationDisplay,
                conditioned: conditioned.relationDisplay,
                defective: defective.relationDisplay,
                defectiveImperfectiveUnavailable: defective.imperfectiveUnavailable,
                zeroRootLexeme: zeroRoot.lexemeId,
                zeroRootCanvasLexeme: zeroRoot.canvasLexemeId,
                zeroRootRelation: zeroRoot.relationDisplay,
                zeroRootCanvasRelation: zeroRoot.canvasRelationDisplay,
                zeroRootPerfectiveMembers: zeroRoot.perfectiveMembers,
                zeroRootCanvasPerfectiveMembers: zeroRoot.canvasPerfectiveMembers,
                generatedFromCanvas: plan.paradigmRelationFrame.generatedFromCanvasIdentity,
                userEntryRequired: plan.paradigmRelationFrame.userEntryRequired,
                selectedStem: plan.selectedStemOverride,
                unknown,
            };
        })(),
        {
            kind: "classical-nahuatl-lesson11-paradigm-relation-frame",
            be: "(ye) > (ye) ~ (ca-t) ~ (ca-h)",
            go: "(yā) ~ (ya-uh) ~ (hui) > (yah) ~ (hui)",
            come: "(huāl-lā) ~ (huāl-la-uh) ~ (huāl-hui) > (huāl-lah) ~ (huāl-hui)",
            conditioned: "(mati) > (mat) ~ (mah)",
            defective: "*(ā) > (ā)",
            defectiveImperfectiveUnavailable: true,
            zeroRootLexeme: "0-i-ā",
            zeroRootCanvasLexeme: "Ø-i-ā",
            zeroRootRelation: "*(0-i-ā) > (0-i-h)",
            zeroRootCanvasRelation: "*(Ø-i-ā) > (Ø-i-h)",
            zeroRootPerfectiveMembers: ["0-i-h"],
            zeroRootCanvasPerfectiveMembers: ["Ø-i-h"],
            generatedFromCanvas: true,
            userEntryRequired: false,
            selectedStem: "ca-h",
            unknown: null,
        }
    );

    s.eq(
        "Lesson 11.3 separates compound class shift from conditioned ti-stem alternatives",
        (() => {
            const compound = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ahco-cui", { tense: "preterit" });
            const singular = ctx.buildClassicalNahuatlLesson11ParadigmPlan("mati", { subject: "1sg", mood: "indicative", tense: "preterit" });
            const plural = ctx.buildClassicalNahuatlLesson11ParadigmPlan("mati", { subject: "1pl", mood: "indicative", tense: "preterit" });
            const distant = ctx.buildClassicalNahuatlLesson11ParadigmPlan("mati", { subject: "1sg", mood: "indicative", tense: "distant-past" });
            const nearby = ctx.buildClassicalNahuatlLesson11ParadigmPlan("pati", { subject: "1sg", mood: "indicative", tense: "preterit" });
            return {
                compoundClass: compound.selectedClassOverride,
                compoundSelected: compound.selectedStemOverride,
                compoundAlternatives: compound.alternatives,
                singularSelected: singular.selectedStemOverride,
                singularAlternatives: singular.alternatives,
                singularPreference: singular.preference,
                pluralSelected: plural.selectedStemOverride,
                distantSelected: distant.selectedStemOverride,
                nearbyApplies: nearby.applies,
            };
        })(),
        {
            compoundClass: "B",
            compoundSelected: "ahco-uc",
            compoundAlternatives: ["ahco-c"],
            singularSelected: "mah",
            singularAlternatives: ["mat"],
            singularPreference: "irregular-preferred-regular-authorized",
            pluralSelected: "",
            distantSelected: "",
            nearbyApplies: false,
        }
    );

    s.eq(
        "Lesson 11.4 distinguishes semantic tense, morphological tense, defectiveness, and construction requirements",
        (() => {
            const ihca = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ih-ca", { tense: "present" });
            const ihcaPast = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ih-ca", { semanticTense: "general-past" });
            const aFuture = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ā", { tense: "future" });
            const itzPresent = ctx.buildClassicalNahuatlLesson11ParadigmPlan("hui-tz", { tense: "present" });
            const itzFuture = ctx.buildClassicalNahuatlLesson11ParadigmPlan("hui-tz", { tense: "future" });
            const amiaBlocked = ctx.buildClassicalNahuatlLesson11ParadigmPlan("am-i-ā", { tense: "present" });
            const amiaAllowed = ctx.buildClassicalNahuatlLesson11ParadigmPlan("am-i-ā", { tense: "present", construction: "quēn" });
            const zeroBlocked = ctx.buildClassicalNahuatlLesson11ParadigmPlan("i-ā", { tense: "present" });
            const zeroAllowed = ctx.buildClassicalNahuatlLesson11ParadigmPlan("i-ā", {
                tense: "present",
                pronominalNncCooperationFrame: buildPronominalNncCooperationFrame("3sg"),
            });
            const mani = ctx.buildClassicalNahuatlLesson11ParadigmPlan("mani", { tense: "preterit" });
            const nemi = ctx.buildClassicalNahuatlLesson11ParadigmPlan("nemi", { semanticTense: "general-past" });
            const hostileInternalZero = ctx.buildClassicalNahuatlLesson11ZeroRootOperationFrame("am-Ø-i-h");
            const hostileNoZero = ctx.buildClassicalNahuatlLesson11ZeroRootOperationFrame("am-i-h");
            return {
                ihcaMorphologicalTense: ihca.morphologicalTense,
                ihcaPastMorphologicalTense: ihcaPast.morphologicalTense,
                aFutureStatus: aFuture.authorizationStatus,
                aFutureReason: aFuture.blockReason,
                itzPresentTense: itzPresent.morphologicalTense,
                itzKDeletion: itzPresent.kDeletionAfterStem,
                itzFutureStatus: itzFuture.authorizationStatus,
                amiaBlocked: amiaBlocked.authorizationStatus,
                amiaAllowed: amiaAllowed.authorizationStatus,
                zeroBlocked: zeroBlocked.authorizationStatus,
                zeroAllowed: zeroAllowed.authorizationStatus,
                zeroSelectedStem: zeroAllowed.selectedStemOverride,
                zeroRoot: [zeroAllowed.rootMorpheme, zeroAllowed.rootMorphemeRole, zeroAllowed.zeroRootPreserved],
                zeroRootOperation: zeroAllowed.zeroRootOperationFrame
                    ? {
                        canvasStem: zeroAllowed.zeroRootOperationFrame.canvasStemMember,
                        formulaStem: zeroAllowed.zeroRootOperationFrame.formulaStemMember,
                        surfaceStem: zeroAllowed.zeroRootOperationFrame.surfaceStemMember,
                        canvasRoot: zeroAllowed.zeroRootOperationFrame.canvasRootMorpheme,
                        formulaRoot: zeroAllowed.zeroRootOperationFrame.formulaRootMorpheme,
                        silent: zeroAllowed.zeroRootOperationFrame.zeroRootSilentOnSurface,
                        status: zeroAllowed.zeroRootOperationFrame.authorizationStatus,
                    }
                    : null,
                nearbyAmiaHasNoZeroRootOperation: amiaAllowed.zeroRootOperationFrame === null,
                hostileInternalZero: [hostileInternalZero.authorizationStatus, hostileInternalZero.blockReason],
                hostileNoZero: [hostileNoZero.authorizationStatus, hostileNoZero.blockReason],
                zeroActions: zeroAllowed.actions,
                maniPreteritStem: mani.selectedStemOverride,
                nemiMorphologicalTense: nemi.morphologicalTense,
            };
        })(),
        {
            ihcaMorphologicalTense: "preterit",
            ihcaPastMorphologicalTense: "distant-past",
            aFutureStatus: "blocked",
            aFutureReason: "defective-a-only-preterit-as-present",
            itzPresentTense: "preterit",
            itzKDeletion: true,
            itzFutureStatus: "blocked",
            amiaBlocked: "blocked",
            amiaAllowed: "authorized",
            zeroBlocked: "blocked",
            zeroAllowed: "authorized",
            zeroSelectedStem: "0-i-h",
            zeroRoot: ["0", "verbstem-root", true],
            zeroRootOperation: {
                canvasStem: "Ø-i-h",
                formulaStem: "0-i-h",
                surfaceStem: "i-h",
                canvasRoot: "Ø",
                formulaRoot: "0",
                silent: true,
                status: "authorized",
            },
            nearbyAmiaHasNoZeroRootOperation: true,
            hostileInternalZero: ["blocked", "canvas-stem-member-does-not-have-zero-root"],
            hostileNoZero: ["blocked", "canvas-stem-member-does-not-have-zero-root"],
            zeroActions: ["preserve-zero-root-inside-verbstem", "require-authorized-construction"],
            maniPreteritStem: "mani",
            nemiMorphologicalTense: "distant-past",
        }
    );

    s.eq(
        "Lesson 11.3-11.4 witnessed stem and boundary forms reach selected output",
        (() => {
            const cases = [
                ["ca-ti-singular", "ca-ti", { subject: "1sg", tense: "preterit" }],
                ["ca-ti-plural", "ca-ti", { subject: "1pl", tense: "preterit" }],
                ["huehueti-singular", "huē-huē-ti", { subject: "1sg", tense: "preterit" }],
                ["ilamati-singular", "ilama-ti", { subject: "1sg", tense: "preterit" }],
                ["ihca-present", "ih-ca", { subject: "1sg", tense: "present" }],
                ["ihca-general-past", "ih-ca", { subject: "1sg", tense: "general-past" }],
                ["ono-present", "on-o", { subject: "1sg", tense: "present" }],
                ["pilca-present", "pil-ca", { subject: "3sg", tense: "present" }],
                ["a-present", "ā", { subject: "1sg", tense: "present" }],
                ["huitz-present", "hui-tz", { subject: "1sg", tense: "present" }],
                ["huitz-present-plural", "hui-tz", { subject: "1pl", tense: "present" }],
                ["huitz-general-past", "hui-tz", { subject: "2sg", tense: "general-past" }],
                ["amia-quen", "am-i-ā", { subject: "3sg", tense: "present", construction: "quēn" }],
                ["zero-ia", "i-ā", { subject: "3pl", tense: "present", pronominalNncCooperationFrame: buildPronominalNncCooperationFrame("3pl") }],
                ["mani-present", "mani", { subject: "3sg", tense: "present" }],
                ["mani-preterit", "mani", { subject: "3sg", tense: "preterit" }],
                ["mani-general-past", "mani", { subject: "3sg", tense: "general-past" }],
                ["nemi-general-past", "nemi", { subject: "3sg", tense: "general-past" }],
            ];
            return cases.map(([id, stem, options]) => {
                const frame = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(`(${stem})`, {
                    valence: "intransitive",
                    mood: "indicative",
                    ...options,
                });
                return [id, frame.authorizationStatus, frame.formulaRealization];
            });
        })(),
        [
            ["ca-ti-singular", "authorized", "#ni-0(ca-h)0+⎕-0#"],
            ["ca-ti-plural", "authorized", "#ti-0(ca-t)0+qu-eh#"],
            ["huehueti-singular", "authorized", "#ni-0(huē-hue-h)0+⎕-0#"],
            ["ilamati-singular", "authorized", "#n-0(ilama-h)0+⎕-0#"],
            ["ihca-present", "authorized", "#n-0(ih-ca)0+c-0#"],
            ["ihca-general-past", "authorized", "#n-0(ih-ca)ca+0-0#"],
            ["ono-present", "authorized", "#n-0(on-o)0+c-0#"],
            ["pilca-present", "authorized", "#0-0(pil-ca)0+c-0#"],
            ["a-present", "authorized", "#n-0(ā)0+c-0#"],
            ["huitz-present", "authorized", "#ni-0(hui-tz)0+⎕-0#"],
            ["huitz-present-plural", "authorized", "#ti-0(hui-tz)0+⎕-eh#"],
            ["huitz-general-past", "authorized", "#ti-0(hui-tz)a+0-0#"],
            ["amia-quen", "authorized", "#0-0(am-i-h)0+⎕-0#"],
            ["zero-ia", "authorized", "#0-0(0-i-h)0+qu-eh#"],
            ["mani-present", "authorized", "#0-0(mani)0+0-0#"],
            ["mani-preterit", "authorized", "#0-0(mani)0+c-0#"],
            ["mani-general-past", "authorized", "#0-0(man)ca+0-0#"],
            ["nemi-general-past", "authorized", "#0-0(nen)ca+0-0#"],
        ]
    );

    s.eq(
        "Lesson 11.5 selects suppletive stems by semantic environment and subject number",
        (() => {
            const cases = [
                ["yā", { subject: "1sg", mood: "indicative", tense: "present" }],
                ["yā", { subject: "1pl", mood: "indicative", tense: "present" }],
                ["yā", { subject: "1sg", mood: "indicative", tense: "future" }],
                ["yā", { subject: "1sg", mood: "indicative", tense: "preterit" }],
                ["huāl-lā", { subject: "1sg", mood: "indicative", tense: "present" }],
                ["huāl-lā", { subject: "1pl", mood: "indicative", tense: "present" }],
                ["ye", { subject: "1sg", mood: "indicative", tense: "present" }],
                ["ye", { subject: "1pl", mood: "indicative", tense: "present" }],
            ].map(([stem, options]) => ctx.buildClassicalNahuatlLesson11ParadigmPlan(stem, options));
            return cases.map((plan) => [plan.lexemeId, plan.selectedStemOverride, plan.selectedClassOverride]);
        })(),
        [
            ["go-suppletive", "ya-uh", "D"],
            ["go-suppletive", "hui", "D"],
            ["go-suppletive", "yā", "D"],
            ["go-suppletive", "yah", "D"],
            ["come-suppletive", "huāl-la-uh", "D"],
            ["come-suppletive", "huāl-hui", "D"],
            ["be-suppletive", "ca-h", "A"],
            ["be-suppletive", "ca-t", "A"],
        ]
    );

    s.eq(
        "Lesson 11.5 suppletive paradigm cells reach the exact typed VNC output",
        (() => {
            const cases = [
                ["be-customary", "ye", "2sg", "indicative", "customary-present"],
                ["be-imperfect", "ye", "3sg", "indicative", "imperfect"],
                ["be-future-singular", "ye", "1sg", "indicative", "future"],
                ["be-future-plural", "ye", "2pl", "indicative", "future"],
                ["be-optative-singular", "ye", "2sg", "optative", "nonpast"],
                ["be-optative-plural", "ye", "3pl", "optative", "nonpast"],
                ["be-past-optative", "ye", "1pl", "optative", "past"],
                ["be-admonitive", "ye", "2sg", "admonitive", "nonpast"],
                ["be-present-singular", "ye", "1sg", "indicative", "present"],
                ["be-present-plural", "ye", "1pl", "indicative", "present"],
                ["be-general-past", "ye", "1sg", "indicative", "general-past"],
                ["go-present-singular", "yā", "1sg", "indicative", "present"],
                ["go-present-plural", "yā", "1pl", "indicative", "present"],
                ["go-optative-singular", "yā", "2sg", "optative", "nonpast"],
                ["go-optative-plural", "yā", "2pl", "optative", "nonpast"],
                ["go-general-past", "yā", "1sg", "indicative", "general-past"],
                ["go-customary", "yā", "1sg", "indicative", "customary-present"],
                ["go-imperfect", "yā", "2sg", "indicative", "imperfect"],
                ["go-future", "yā", "1sg", "indicative", "future"],
                ["go-past-optative", "yā", "1sg", "optative", "past"],
                ["go-preterit", "yā", "1sg", "indicative", "preterit"],
                ["go-distant-past", "yā", "2sg", "indicative", "distant-past"],
                ["go-admonitive", "yā", "2sg", "admonitive", "nonpast"],
                ["come-present", "huāl-lā", "2sg", "indicative", "present"],
                ["come-present-plural", "huāl-lā", "2pl", "indicative", "present"],
                ["come-optative-plural", "huāl-lā", "2pl", "optative", "nonpast"],
                ["come-general-past", "huāl-lā", "1sg", "indicative", "general-past"],
                ["come-customary", "huāl-lā", "3sg", "indicative", "customary-present"],
                ["come-preterit-plural", "huāl-lā", "1pl", "indicative", "preterit"],
                ["come-distant-past", "huāl-lā", "2sg", "indicative", "distant-past"],
                ["come-admonitive", "huāl-lā", "2sg", "admonitive", "nonpast"],
            ];
            return cases.map(([id, stem, subject, mood, tense]) => {
                const frame = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(`(${stem})`, {
                    valence: "intransitive",
                    subject,
                    mood,
                    tense,
                });
                return [id, frame.authorizationStatus, frame.formulaRealization];
            });
        })(),
        [
            ["be-customary", "authorized", "#ti-0(ye)ni+0-0#"],
            ["be-imperfect", "authorized", "#0-0(ye)ya+0-0#"],
            ["be-future-singular", "authorized", "#ni-0(ye)z+⎕-0#"],
            ["be-future-plural", "authorized", "#an-0(ye)z+qu-eh#"],
            ["be-optative-singular", "authorized", "#xi-0(ye)0+⎕-0#"],
            ["be-optative-plural", "authorized", "#0-0(ye)0+c-ān#"],
            ["be-past-optative", "authorized", "#ti-0(ye)ni+0-h#"],
            ["be-admonitive", "authorized", "#ti-0(ye)h+⎕-0#"],
            ["be-present-singular", "authorized", "#ni-0(ca-h)0+⎕-0#"],
            ["be-present-plural", "authorized", "#ti-0(ca-t)0+⎕-eh#"],
            ["be-general-past", "authorized", "#ni-0(ca-t)ca+0-0#"],
            ["go-present-singular", "authorized", "#ni-0(ya-uh)0+0-0#"],
            ["go-present-plural", "authorized", "#ti-0(hui)0+0-h#"],
            ["go-optative-singular", "authorized", "#xi-0(ya-uh)0+⎕-0#"],
            ["go-optative-plural", "authorized", "#xi-0(hui)0+⎕-ān#"],
            ["go-general-past", "authorized", "#ni-0(hui)a+0-0#"],
            ["go-customary", "authorized", "#ni-0(yā)ni+0-0#"],
            ["go-imperfect", "authorized", "#ti-0(yā)ya+0-0#"],
            ["go-future", "authorized", "#ni-0(yā)z+⎕-0#"],
            ["go-past-optative", "authorized", "#ni-0(yā)ni+0-0#"],
            ["go-preterit", "authorized", "#ni-0(yah)0+⎕-0#"],
            ["go-distant-past", "authorized", "#ti-0(yah)ca+0-0#"],
            ["go-admonitive", "authorized", "#ti-0(yah)0+⎕-0#"],
            ["come-present", "authorized", "#ti-0(huāl-la-uh)0+0-0#"],
            ["come-present-plural", "authorized", "#an-0(huāl-hui)0+0-h#"],
            ["come-optative-plural", "authorized", "#xi-0(huāl-hui)0+⎕-ān#"],
            ["come-general-past", "authorized", "#ni-0(huāl-hui)a+0-0#"],
            ["come-customary", "authorized", "#0-0(huāl-lā)ni+0-0#"],
            ["come-preterit-plural", "authorized", "#ti-0(huāl-lah)0+qu-eh#"],
            ["come-distant-past", "authorized", "#ti-0(huāl-lah)ca+0-0#"],
            ["come-admonitive", "authorized", "#ti-0(huāl-lah)0+⎕-0#"],
        ]
    );

    s.eq(
        "Lesson 11 higher restrictions cannot be undone by lower regular generation",
        (() => {
            const bePlural = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(ye)", {
                valence: "intransitive", subject: "1pl", mood: "indicative", tense: "present",
            });
            const beSingular = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(ye)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
            });
            const forbiddenPast = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(ye)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "preterit",
            });
            const antecessivePresent = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(ih-ca)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", antecessive: true,
            });
            const ambiguousItz = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(itz)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
            });
            const alertItz = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(itz)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "preterit", lesson11LexicalReading: "alert-observant",
            });
            const motionItz = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(itz)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", lesson11LexicalReading: "motion",
            });
            return {
                bePluralFormula: bePlural.formulaRealization,
                beSingularMarkedAlternative: beSingular.optionalIrregularFormulaRealizations,
                forbiddenPast: [forbiddenPast.authorizationStatus, forbiddenPast.blockReason],
                antecessivePresent: [antecessivePresent.authorizationStatus, antecessivePresent.blockReason],
                ambiguousItz: [ambiguousItz.authorizationStatus, ambiguousItz.blockReason],
                alertItz: [alertItz.authorizationStatus, alertItz.formulaRealization],
                motionItz: [motionItz.authorizationStatus, motionItz.blockReason],
            };
        })(),
        {
            bePluralFormula: "#ti-0(ca-t)0+⎕-eh#",
            beSingularMarkedAlternative: ["#ni-0(ca-t)0+qui-0#"],
            forbiddenPast: ["blocked", "be-suppletive-past-meanings-use-general-past-cell"],
            antecessivePresent: ["blocked", "preterit-as-present-cannot-take-antecessive-order-prefix"],
            ambiguousItz: ["blocked", "itz-reading-must-distinguish-motion-from-alert-observant"],
            alertItz: ["authorized", "#n-0(itz)0+⎕-0#"],
            motionItz: ["blocked", "motion-itz-never-occurs-in-a-simple-stemmed-vnc"],
        }
    );

    s.eq(
        "Lesson 11 construction choices reach sentence structure without becoming VNC slots",
        (() => {
            const quen = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(am-i-ā)", {
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                construction: "quēn",
                sentenceType: "yes-no-question",
            });
            const quenMach = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(am-i-ā)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                construction: "quēn-mach",
            });
            const incorporatedQuen = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(am-i-ā)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "indicative",
                tense: "present",
                construction: "incorporated-quēn",
            });
            const zeroBlocked = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(i-ā)", {
                valence: "intransitive", subject: "3pl", mood: "indicative", tense: "present",
            });
            const zeroAuthorized = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(i-ā)", {
                valence: "intransitive", subject: "3pl", mood: "indicative", tense: "present",
                pronominalNncCooperationFrame: buildPronominalNncCooperationFrame("3pl"),
            });
            const zeroAuthorizedFirstPerson = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(i-ā)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
                pronominalNncCooperationFrame: buildPronominalNncCooperationFrame("1sg"),
            });
            const explicitZeroSourceAuthorized = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(0-i-ā)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
                pronominalNncCooperationFrame: buildPronominalNncCooperationFrame("1sg"),
            });
            const arbitraryZeroSourceBlocked = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(0-mati)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
            });
            const booleanOnlyBlocked = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(i-ā)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
                pronominalNncCooperation: true,
            });
            const subjectMismatchBlocked = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(i-ā)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
                pronominalNncCooperationFrame: buildPronominalNncCooperationFrame("3sg"),
            });
            const zeroLesson11Step = zeroAuthorizedFirstPerson.selectedOutputLogicFrame.steps.find((step) => (
                step.layer === "lesson11-irregular-paradigm"
            ));
            return {
                quenFormula: quen.formulaRealization,
                quenParticles: quen.sentenceSurfaceFrame.sentenceParticles,
                quenPunctuation: quen.sentenceSurfaceFrame.finalPunctuation,
                quenMachParticles: quenMach.sentenceSurfaceFrame.sentenceParticles,
                quenMachPunctuation: quenMach.sentenceSurfaceFrame.finalPunctuation,
                incorporatedQuenFormula: incorporatedQuen.formulaRealization,
                incorporatedQuenParticles: incorporatedQuen.sentenceSurfaceFrame.sentenceParticles,
                constructionParticlesBecomeSlots: quen.sentenceSurfaceFrame.sentenceParticlesBecomeFormulaSlots,
                zeroBlocked: [zeroBlocked.authorizationStatus, zeroBlocked.blockReason],
                zeroAuthorized: [zeroAuthorized.authorizationStatus, zeroAuthorized.formulaRealization],
                zeroAuthorizedFirstPerson: [
                    zeroAuthorizedFirstPerson.authorizationStatus,
                    zeroAuthorizedFirstPerson.formulaRealization,
                    zeroAuthorizedFirstPerson.selectedOutputLogicFrame.outputFillers.lesson11SelectedStem,
                    zeroAuthorizedFirstPerson.selectedOutputLogicFrame.outputFillers.lesson11ZeroRootOperationFrame?.formulaStemMember,
                ],
                explicitZeroSource: [
                    explicitZeroSourceAuthorized.authorizationStatus,
                    explicitZeroSourceAuthorized.stem,
                    explicitZeroSourceAuthorized.sourceSelectionFrame?.selectedInternalMorphs,
                    explicitZeroSourceAuthorized.zeroRootLowerLessonBridgeFrame?.lowerOrthographicCarrierStem,
                    explicitZeroSourceAuthorized.formulaRealization,
                ],
                arbitraryZeroSource: [
                    arbitraryZeroSourceBlocked.authorizationStatus,
                    arbitraryZeroSourceBlocked.blockReason,
                    arbitraryZeroSourceBlocked.zeroRootLowerLessonBridgeFrame?.authorizationStatus,
                    arbitraryZeroSourceBlocked.zeroRootLowerLessonBridgeFrame?.blockReason,
                ],
                booleanOnlyBlocked: [booleanOnlyBlocked.authorizationStatus, booleanOnlyBlocked.blockReason],
                subjectMismatchBlocked: [subjectMismatchBlocked.authorizationStatus, subjectMismatchBlocked.blockReason],
                zeroLesson11Step: zeroLesson11Step ? [
                    zeroLesson11Step.lowerOutputRole,
                    zeroLesson11Step.consumedProvisionalStem,
                    zeroLesson11Step.value,
                    zeroLesson11Step.finalizerLayer,
                ] : null,
            };
        })(),
        {
            quenFormula: "#0-0(am-i-h)0+⎕-0#",
            quenParticles: ["quēn"],
            quenPunctuation: "?",
            quenMachParticles: ["quēn", "mach"],
            quenMachPunctuation: "!",
            incorporatedQuenFormula: "#ti-0(quē-n-am-i-h)0+⎕-0#",
            incorporatedQuenParticles: [],
            constructionParticlesBecomeSlots: false,
            zeroBlocked: ["blocked", "zero-i-a-requires-pronominal-nnc-cooperation"],
            zeroAuthorized: ["authorized", "#0-0(0-i-h)0+qu-eh#"],
            zeroAuthorizedFirstPerson: ["authorized", "#n-0(0-i-h)0+⎕-0#", "0-i-h", "0-i-h"],
            explicitZeroSource: ["authorized", "0-i-ā", ["0", "i", "ā"], "i-h", "#n-0(0-i-h)0+⎕-0#"],
            arbitraryZeroSource: ["blocked", "source-zero-root-not-authorized-for-selected-verbstem", "blocked", "source-zero-root-not-authorized-for-selected-verbstem"],
            booleanOnlyBlocked: ["blocked", "zero-i-a-requires-pronominal-nnc-cooperation"],
            subjectMismatchBlocked: ["blocked", "zero-i-a-requires-pronominal-nnc-cooperation"],
            zeroLesson11Step: ["provisional-input", "i-h", "0-i-h", "Andrews Lesson 11 irregular paradigm"],
        }
    );

    s.eq(
        "Lesson 11 notes become typed contextual conditions instead of witness-shaped exceptions",
        (() => {
            const onoMatrix = ctx.buildClassicalNahuatlLesson11ParadigmPlan("on-o", {
                subject: "1sg", mood: "indicative", tense: "present", compoundBoundaryType: "connective-t",
            });
            const huitzCommand = ctx.buildClassicalNahuatlLesson11ParadigmPlan("hui-tz", {
                subject: "2sg", mood: "indicative", tense: "present",
            });
            const aPositive = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ā", {
                subject: "3sg", mood: "indicative", tense: "present", polarity: "positive",
            });
            const aNegative = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ā", {
                subject: "3sg", mood: "indicative", tense: "present", polarity: "negative",
            });
            const maniMarked = ctx.buildClassicalNahuatlLesson11ParadigmPlan("mani", {
                subject: "3sg", mood: "indicative", tense: "present", predicateReferentKind: "individual-animate",
            });
            const goImperfect = ctx.buildClassicalNahuatlLesson11ParadigmPlan("yā", {
                subject: "1sg", mood: "indicative", tense: "imperfect",
            });
            const beThere = ctx.buildClassicalNahuatlLesson11ParadigmPlan("ye", {
                subject: "3sg", mood: "indicative", tense: "present", directionalPrefix: "on",
            });
            const cenHuiPlural = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(cen-hui)", {
                valence: "intransitive", subject: "1pl", mood: "indicative", tense: "present",
            });
            const cenHuiSingular = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(cen-hui)", {
                valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present",
            });
            const nearby = ctx.buildClassicalNahuatlLesson11ParadigmPlan("cen-huica", {
                subject: "1sg", mood: "indicative", tense: "present",
            });
            return {
                onoMatrix: [onoMatrix.selectedStemOverride, onoMatrix.actions.includes("remove-fused-prefix-in-connective-t-matrix")],
                huitzCommand: [huitzCommand.contextualInterpretation, huitzCommand.authorizedSentenceRoles],
                aInterpretations: [aPositive.contextualInterpretation, aNegative.contextualInterpretation],
                maniUsage: [maniMarked.authorizationStatus, maniMarked.usageStatus],
                goImperfectUsage: goImperfect.usageStatus,
                beThere: beThere.contextualInterpretation,
                cenHuiPlural: [cenHuiPlural.authorizationStatus, cenHuiPlural.formulaRealization],
                cenHuiSingular: [cenHuiSingular.authorizationStatus, cenHuiSingular.blockReason],
                nearbyApplies: nearby.applies,
            };
        })(),
        {
            onoMatrix: ["o", true],
            huitzCommand: ["second-person-indicative-may-express-command", ["statement", "command"]],
            aInterpretations: ["be-present", "be-absent"],
            maniUsage: ["authorized", "marked-not-ordinary"],
            goImperfectUsage: "authorized-less-elegant-than-hui-general-past",
            beThere: "there-to-be",
            cenHuiPlural: ["authorized", "#ti-0(cen-hui)0+0-h#"],
            cenHuiSingular: ["blocked", "cen-hui-requires-a-plural-subject"],
            nearbyApplies: false,
        }
    );

    s.eq(
        "Lesson 11 contextual morph changes and fused come suppletion reach typed output",
        (() => {
            const itzPlan = ctx.buildClassicalNahuatlLesson11ParadigmPlan("hui-tz", {
                subject: "1sg",
                mood: "indicative",
                semanticTense: "general-past",
            });
            const typed = ctx.buildClassicalNahuatlVncSlotFrame({
                sourceFrameKind: "lesson11-hostile-k-boundary",
                sourceAuthorizationStatus: "authorized",
                stem: "hui-tz",
                personDyad: { pers1: "ni", pers2: "0" },
                tenseFrame: { tns: "ca" },
                numberDyad: { num1: "qu", num2: "0" },
            });
            const itzApplied = ctx.applyClassicalNahuatlLesson11PlanToVncSlotFrame(itzPlan, typed);
            const come = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(huāl-lā)", {
                valence: "intransitive",
                subject: "2sg",
                mood: "indicative",
                tense: "present",
                verbClass: "D",
            });
            return {
                itzStatus: itzApplied.authorizationStatus,
                itzStem: itzApplied.typedVncSlotFrame.slots.predicate.stem,
                itzTns: itzApplied.typedVncSlotFrame.slots.predicate.tns,
                itzNum1: itzApplied.typedVncSlotFrame.slots.number.num1,
                comeStatus: come.authorizationStatus,
                comeFormulaUsesSuppletiveStem: come.formulaRealization.includes("(huāl-la-uh)"),
                comeSelectedStem: come.selectedOutputLogicFrame.outputFillers.lesson11SelectedStem,
            };
        })(),
        {
            itzStatus: "authorized",
            itzStem: "hui-tz",
            itzTns: "a",
            itzNum1: "⎕",
            comeStatus: "authorized",
            comeFormulaUsesSuppletiveStem: true,
            comeSelectedStem: "huāl-la-uh",
        }
    );

    s.eq(
        "Lesson 11.6 keeps idiom authority outside ordinary VNC generation",
        (() => {
            const witnessed = ctx.buildClassicalNahuatlLesson11IdiomFrame("zan-huītz");
            const invented = ctx.buildClassicalNahuatlLesson11IdiomFrame("zan-mati");
            return {
                witnessedStatus: witnessed.authorizationStatus,
                witnessedAffectsVnc: witnessed.ordinaryVncGenerationAffected,
                witnessedPhraseSurface: witnessed.phraseSurface,
                witnessedMeaning: witnessed.phraseMeaning,
                witnessedPhraseGeneration: witnessed.phraseGenerationAllowed,
                inventedStatus: invented.authorizationStatus,
                inventedReason: invented.blockReason,
            };
        })(),
        {
            witnessedStatus: "authorized",
            witnessedAffectsVnc: false,
            witnessedPhraseSurface: "Zan huītz.",
            witnessedMeaning: "He is a foreigner; it is exotic.",
            witnessedPhraseGeneration: true,
            inventedStatus: "blocked",
            inventedReason: "idiom-not-witnessed-in-lesson11",
        }
    );

    s.eq(
        "Lesson 11 reaches selected typed output without formula-string authority",
        (() => {
            const mati = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
                formulaEcho: "#poison#",
                result: "#poison#",
                surface: "#poison#",
            });
            const ya = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(yā)", {
                valence: "intransitive",
                subject: "1pl",
                mood: "indicative",
                tense: "present",
                verbClass: "D",
            });
            const unavailable = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(ā)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "future",
                verbClass: "A",
            });
            return {
                matiStatus: mati.authorizationStatus,
                matiFormulaUsesMah: mati.formulaRealization.includes("(mah)"),
                matiRejectsPoison: !mati.formulaRealization.includes("poison"),
                matiAlternatives: mati.selectedOutputLogicFrame.outputFillers.lesson11Alternatives,
                yaStatus: ya.authorizationStatus,
                yaFormulaUsesHui: ya.formulaRealization.includes("(hui)"),
                yaSelectedStem: ya.selectedOutputLogicFrame.outputFillers.lesson11SelectedStem,
                unavailableStatus: unavailable.authorizationStatus,
                unavailableFormula: unavailable.formulaRealization,
            };
        })(),
        {
            matiStatus: "authorized",
            matiFormulaUsesMah: true,
            matiRejectsPoison: true,
            matiAlternatives: ["mat"],
            yaStatus: "authorized",
            yaFormulaUsesHui: true,
            yaSelectedStem: "hui",
            unavailableStatus: "blocked",
            unavailableFormula: "",
        }
    );

    s.eq(
        "Lesson 11 selected answer and authorized alternatives reach the Result surface",
        (() => {
            const machinery = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("(mati)", {
                valence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "preterit",
                verbClass: "B",
            });
            const output = machinery.selectedOutputLogicFrame.outputFillers;
            const rendering = fs.readFileSync(path.resolve(__dirname, "..", "ui", "rendering", "rendering.mjs"), "utf8");
            const shell = fs.readFileSync(path.resolve(__dirname, "..", "ui", "shell", "classical_shell.mjs"), "utf8");
            return {
                selectedUsesMah: machinery.formulaRealization.includes("(mah)"),
                lexemeId: output.lesson11LexemeId,
                semanticTense: output.lesson11RequestedSemanticTense,
                morphologicalTense: output.lesson11MorphologicalTense,
                alternatives: output.lesson11Alternatives,
                paradigmRelation: output.lesson11ParadigmRelation,
                paradigmGeneratedFromCanvas: output.lesson11ParadigmRelationFrame.generatedFromCanvasIdentity,
                rendersAlternativeAfterFormula: rendering.includes(
                    ": [linearFormat, lesson11Alternatives, nuclearClauseDiagram, sentenceFormulaSection, sentenceSurfaceSection]"
                ),
                rendersParadigmInResult: rendering.includes('createLesson4InspectorLine("stem paradigm", surfaceFrame.lesson11ParadigmRelation)'),
                answerFirstText: rendering.includes("Authorized alternative:"),
                generalPastTagged: shell.includes('value="general-past" data-classical-authority-option-tag="cn-option-tense-general-past"'),
                constructionControlPresent: shell.includes('id="classical-rule-logic-construction"'),
                lexicalReadingControlPresent: shell.includes('id="classical-rule-logic-lexical-reading"'),
                constructionOptionsReachMachinery: rendering.includes("pronominalNncCooperationFrame: state.pronominalNncCooperationFrame")
                    && rendering.includes("lesson11LexicalReading: state.lesson11LexicalReading"),
                tenseAvailabilityIsParadigmBound: rendering.includes("syncClassicalRuleLogicLesson11TenseOptions"),
            };
        })(),
        {
            selectedUsesMah: true,
            lexemeId: "mati",
            semanticTense: "preterit",
            morphologicalTense: "preterit",
            alternatives: ["mat"],
            paradigmRelation: "(mati) > (mat) ~ (mah)",
            paradigmGeneratedFromCanvas: true,
            rendersAlternativeAfterFormula: true,
            rendersParadigmInResult: true,
            answerFirstText: true,
            generalPastTagged: true,
            constructionControlPresent: true,
            lexicalReadingControlPresent: true,
            constructionOptionsReachMachinery: true,
            tenseAvailabilityIsParadigmBound: true,
        }
    );

    return s;
}

module.exports = { run };
