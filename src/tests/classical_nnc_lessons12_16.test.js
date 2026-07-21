"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_nnc_lessons12_16");
    const withTypedQuantitiveAuthority = (options = {}) => {
        if (options.subtype !== "quantitive") return options;
        const {
            quantitiveMatrix,
            quantitiveEmbed,
            matrixAllomorph,
            predicatePluralization,
            plainPluralVariantAuthorized,
            interrogativeMeaning,
            ...typedOptions
        } = options;
        const subject = typedOptions.subject || "3common";
        const familyKey = String(quantitiveMatrix || "");
        const matrixForm = matrixAllomorph || (familyKey === "quich" || familyKey === "qui-ch" ? "qui-ch" : "");
        const plural = subject.endsWith("pl");
        const selectedPluralization = predicatePluralization || (
            !plural ? "not-applicable"
                : (familyKey === "quich" || familyKey === "qui-ch") ? "plain-qui-ch"
                    : plainPluralVariantAuthorized === true ? "plain-variant" : "internal-n"
        );
        return {
            ...typedOptions,
            subtype: "quantitive",
            quantitiveAuthorityRecord: ctx.buildClassicalNahuatlLesson16QuantitiveAuthorityRecord({
                subject,
                matrixFamily: familyKey,
                matrixForm,
                embedStem: quantitiveEmbed,
                predicatePluralization: selectedPluralization,
                plainVariantLexicallyAuthorized: plainPluralVariantAuthorized === true,
                interrogativeMeaning: interrogativeMeaning === true,
            }),
        };
    };

    s.eq(
        "Lesson 12 realizes the four absolutive common-number class connectors from typed slots",
        [
            ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cihua", { subject: "1sg", nounClass: "tl", animacy: "animate" }),
            ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cal", { subject: "3common", nounClass: "tli", animacy: "nonanimate" }),
            ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("mich", { subject: "3sg", nounClass: "in", animacy: "animate" }),
            ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("chichi", { subject: "3sg", nounClass: "zero", animacy: "animate" }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            class: frame.numberFrame.nounClass,
            numberBelongsTo: frame.numberFrame.numberBelongsTo,
            tenseSlot: frame.nncSlotFrame.slots.predicate.tenseSlot,
        })),
        [
            { status: "authorized", formula: "#ni-0(cihua)tl-0#", class: "tl", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
            { status: "authorized", formula: "#0-0(cal)li-0#", class: "tli", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
            { status: "authorized", formula: "#0-0(mich)in-0#", class: "in", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
            { status: "authorized", formula: "#0-0(chichi)0-0#", class: "zero", numberBelongsTo: "subject-personal-pronoun", tenseSlot: "none" },
        ]
    );

    s.eq(
        "Lesson 12 plural subject uses a lexically selected connector and remains nominative",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("col", {
                subject: "1pl",
                nounClass: "tli",
                pluralConnector: "t-in",
                animacy: "animate",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                subject: frame.personFrame.subject,
                case: frame.personFrame.case,
                finalizer: frame.layerEvaluationFrame.finalizerLayerId,
                formulaStringAuthority: frame.selectedOutputLogicFrame.formulaStringAuthority,
            };
        })(),
        {
            status: "authorized",
            formula: "#ti-0(col)t-in#",
            subject: "1pl",
            case: "nominative",
            finalizer: "lesson12-absolutive-subject-state",
            formulaStringAuthority: false,
        }
    );

    s.eq(
        "NNC diagrammatic format projects absolutive Subject and Predicate from typed slots",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cihua", {
                subject: "1sg",
                nounClass: "tl",
                animacy: "animate",
            });
            const diagram = ctx.buildClassicalNahuatlNncDiagrammaticFrame(frame.nncSlotFrame);
            return {
                status: diagram.authorizationStatus,
                linear: diagram.linearFormula,
                generalLinear: diagram.generalLinearFormula,
                rows: diagram.rows.map((row) => `${row.expression} ${row.role}`),
                generalRows: diagram.generalRows.map((row) => `${row.expression} ${row.role}`),
                hierarchy: diagram.hierarchy,
                stringAuthority: diagram.formulaStringAuthority,
            };
        })(),
        {
            status: "authorized",
            linear: "#ni-0(cihua)tl-0#",
            generalLinear: "#pers¹-pers²(STEM)num¹-num²#",
            rows: ["#ni-0( ... )tl-0# Subject", "(cihua) Predicate"],
            generalRows: ["#pers¹-pers²( ... )num¹-num²# Subject", "(STEM) Predicate"],
            hierarchy: ["nounstem", "predicate", "NNC"],
            stringAuthority: false,
        }
    );

    s.eq(
        "Lesson 12 rejects nonanimate plural unless the user selects a metaphorical animate reference",
        (() => {
            const blocked = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("chimalli", {
                subject: "3pl",
                nounClass: "tl",
                pluralConnector: "m-eh",
                animacy: "nonanimate",
            });
            const metaphorical = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("chimalli", {
                subject: "3pl",
                nounClass: "tl",
                pluralConnector: "m-eh",
                animacy: "nonanimate",
                metaphoricalOverride: true,
            });
            return {
                blockedStatus: blocked.authorizationStatus,
                blockedReason: blocked.blockReason,
                metaphoricalStatus: metaphorical.authorizationStatus,
                metaphoricalFormula: metaphorical.formulaRealization,
            };
        })(),
        {
            blockedStatus: "blocked",
            blockedReason: "nonanimate-plural-requires-metaphorical-override",
            metaphoricalStatus: "authorized",
            metaphoricalFormula: "#0-0(chimalli)m-eh#",
        }
    );

    s.eq(
        "Hostile VNC tense and valence cannot enter an NNC",
        [
            ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cal", { subject: "3common", nounClass: "tli", tense: "present" }),
            ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cal", { subject: "3common", nounClass: "tli", valence: "tla" }),
        ].map((frame) => ({ status: frame.authorizationStatus, reason: frame.blockReason, formula: frame.formulaRealization })),
        [
            { status: "blocked", reason: "nnc-has-no-tense-slot", formula: "" },
            { status: "blocked", reason: "nnc-state-replaces-valence", formula: "" },
        ]
    );

    s.eq(
        "Lesson 12 preserves lexical State restrictions and does not invent tense or definiteness",
        (() => {
            const blocked = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("nan", {
                subject: "3sg",
                nounClass: "tli",
                animacy: "animate",
                stateAvailability: "possessive-only",
            });
            const ordinary = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cal", {
                subject: "3common",
                nounClass: "tli",
                animacy: "nonanimate",
            });
            return {
                blockedStatus: blocked.authorizationStatus,
                blockedReason: blocked.blockReason,
                ordinaryStatus: ordinary.authorizationStatus,
                tenseEncoded: ordinary.predicateSemanticsFrame.tenseCategoryEncoded,
                timeReferenceSource: ordinary.predicateSemanticsFrame.timeReferenceSource,
                definitenessEncoded: ordinary.predicateSemanticsFrame.definitenessEncoded,
            };
        })(),
        {
            blockedStatus: "blocked",
            blockedReason: "nounstem-restricted-to-possessive-state",
            ordinaryStatus: "authorized",
            tenseEncoded: false,
            timeReferenceSource: "discourse-context",
            definitenessEncoded: false,
        }
    );

    s.eq(
        "A lying formula string cannot authorize or alter Lesson 12 selected output",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("mich", {
                subject: "3sg",
                nounClass: "in",
                animacy: "animate",
                formulaArtifact: "#x-0+THIS-IS-NOT-AN-NNC(mich)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                artifact: frame.nncSlotFrame.sourceFormulaArtifact,
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
                containsLie: frame.formulaRealization.includes("THIS"),
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0(mich)in-0#",
            artifact: "#x-0+THIS-IS-NOT-AN-NNC(mich)past+c-an#",
            artifactAuthority: "display-only-not-authority",
            containsLie: false,
        }
    );

    s.eq(
        "Contradictory typed NNC slots fail closed and a requested higher unimplemented layer cannot freeze Lesson 12 output",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("mich", {
                subject: "3sg",
                nounClass: "in",
                animacy: "animate",
            });
            const contradictory = {
                ...frame.nncSlotFrame,
                slots: {
                    ...frame.nncSlotFrame.slots,
                    predicate: { ...frame.nncSlotFrame.slots.predicate, tenseSlot: "present" },
                },
            };
            const higher = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("mich", {
                subject: "3sg",
                nounClass: "in",
                animacy: "animate",
                highestActiveLesson: 14,
            });
            return {
                contradictoryValid: ctx.isClassicalNahuatlNncSlotFrame(contradictory),
                contradictoryFormula: ctx.renderClassicalNahuatlNncSlotFrameFormula(contradictory),
                higherStatus: higher.authorizationStatus,
                higherReason: higher.blockReason,
                lowerOutputProvisional: higher.layerEvaluationFrame.lowerOutputProvisional,
            };
        })(),
        {
            contradictoryValid: false,
            contradictoryFormula: "",
            higherStatus: "blocked",
            higherReason: "requested-nnc-layer-not-applied",
            lowerOutputProvisional: true,
        }
    );

    s.ok(
        "Lesson 12 frame stays inside the Classical firewall and carries exact witness actions",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("chichi", {
                subject: "3sg",
                nounClass: "zero",
                animacy: "animate",
            });
            return frame.ruleRefs.length === 7
                && frame.ruleRefs.every((rule) => rule.transcriptionLineStart > 0 && rule.transcriptionLineEnd >= rule.transcriptionLineStart && rule.exactWitness)
                && frame.nawatPipilSystem === "not-used"
                && frame.nawatPipilOrthographyBridge === "not-applied";
        })()
    );

    s.eq(
        "Lesson 13 realizes monadic and dyadic possessive State from typed possessor slots",
        [
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "te",
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
                animacy: "nonanimate",
            }),
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
                animacy: "nonanimate",
            }),
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("ā", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "uh",
                animacy: "nonanimate",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            arity: frame.stateFrame.arity,
            subjectAnimacy: frame.nncSlotFrame.subjectAnimacy,
            metaphoricalUse: frame.nncSlotFrame.metaphoricalUse,
            finalizer: frame.layerEvaluationFrame.finalizerLayerId,
        })),
        [
            { status: "authorized", formula: "#0-0+tē(cal)0-0#", arity: "monadic", subjectAnimacy: "nonanimate", metaphoricalUse: false, finalizer: "lesson13-possessive-state" },
            { status: "authorized", formula: "#0-0+n-o(cal)0-0#", arity: "dyadic", subjectAnimacy: "nonanimate", metaphoricalUse: false, finalizer: "lesson13-possessive-state" },
            { status: "authorized", formula: "#0-0+n-⎕(ā)uh-0#", arity: "dyadic", subjectAnimacy: "nonanimate", metaphoricalUse: false, finalizer: "lesson13-possessive-state" },
        ]
    );

    s.eq(
        "NNC diagrammatic format keeps monadic and dyadic State inside the Predicate row",
        [
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "te",
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
            }),
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
            }),
        ].map((frame) => {
            const diagram = ctx.buildClassicalNahuatlNncDiagrammaticFrame(frame.nncSlotFrame);
            return {
                arity: diagram.stateArity,
                rows: diagram.rows.map((row) => `${row.expression} ${row.role}`),
                generalLinear: diagram.generalLinearFormula,
                generalRows: diagram.generalRows.map((row) => `${row.expression} ${row.role}`),
            };
        }),
        [
            {
                arity: "monadic",
                rows: ["#0-0+ ... )0-0# Subject", "+tē(cal) Predicate"],
                generalLinear: "#pers¹-pers²+st(STEM)num¹-num²#",
                generalRows: ["#pers¹-pers²+ ... )num¹-num²# Subject", "+st(STEM) Predicate"],
            },
            {
                arity: "dyadic",
                rows: ["#0-0+ ... )0-0# Subject", "+n-o(cal) Predicate"],
                generalLinear: "#pers¹-pers²+st¹-st²(STEM)num¹-num²#",
                generalRows: ["#pers¹-pers²+ ... )num¹-num²# Subject", "+st¹-st²(STEM) Predicate"],
            },
        ]
    );

    s.eq(
        "Hostile linear formula cannot authorize an NNC diagram without typed slots",
        [
            ctx.buildClassicalNahuatlNncDiagrammaticFrame("#ni-0(FAKE)tl-0#"),
            ctx.buildClassicalNahuatlNncDiagrammaticFrame({
                kind: "classical-nahuatl-nnc-slot-frame",
                authorizationStatus: "authorized",
                formulaArtifactAuthority: "display-only-not-authority",
                formulaStringAuthority: true,
                slots: {},
            }),
        ].map((diagram) => ({
            status: diagram.authorizationStatus,
            reason: diagram.blockReason,
            rows: diagram.rows.length,
        })),
        [
            { status: "blocked", reason: "authorized-typed-nnc-slot-frame-required", rows: 0 },
            { status: "blocked", reason: "authorized-typed-nnc-slot-frame-required", rows: 0 },
        ]
    );

    s.eq(
        "Lesson 13 carries plural subject and third-person possessor categories in separate typed positions",
        [
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cihua", {
                subject: "1pl",
                possessor: "3sg",
            }),
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3sg",
                possessor: "3pl",
                thirdPluralPossessorNumberMorph: "n",
                singularConnector: "0",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            subjectNumber: frame.numberFrame.subjectNumber,
            possessor: frame.stateFrame.possessor,
            numberBelongsTo: frame.numberFrame.numberBelongsTo,
        })),
        [
            { status: "authorized", formula: "#t-0+ī-0(cihua)hu-ān#", subjectNumber: "plural", possessor: "3sg", numberBelongsTo: "subject-personal-pronoun" },
            { status: "authorized", formula: "#0-0+ī-n(cal)0-0#", subjectNumber: "singular", possessor: "3pl", numberBelongsTo: "subject-personal-pronoun" },
        ]
    );

    s.eq(
        "Lesson 13 takes plural num2 vowel length from typed Canvas authority, not a short-vowel formula artifact",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cihua", {
                subject: "1pl",
                possessor: "3sg",
                formulaArtifact: "#t-0+i-0(cihua)hu-an#",
            });
            return {
                status: frame.authorizationStatus,
                num1: frame.numberFrame.num1,
                num2: frame.numberFrame.num2,
                formula: frame.formulaRealization,
                hostileArtifact: frame.nncSlotFrame.sourceFormulaArtifact,
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
            };
        })(),
        {
            status: "authorized",
            num1: "hu",
            num2: "ān",
            formula: "#t-0+ī-0(cihua)hu-ān#",
            hostileArtifact: "#t-0+i-0(cihua)hu-an#",
            artifactAuthority: "display-only-not-authority",
        }
    );

    s.eq(
        "Lesson 13 blocks invalid State, connector, and third-plural possessor environments",
        [
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "tla",
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
            }),
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("ā", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "hui",
            }),
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "3pl",
                singularConnector: "0",
            }),
            ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
                stateAvailability: "absolutive-only",
            }),
        ].map((frame) => ({ status: frame.authorizationStatus, reason: frame.blockReason, formula: frame.formulaRealization })),
        [
            { status: "blocked", reason: "tla-possessor-requires-relational-or-analogical-derived-nounstem", formula: "" },
            { status: "blocked", reason: "possessive-singular-connector-must-match-stem-boundary-and-lexical-selection", formula: "" },
            { status: "authorized", reason: "", formula: "#0-0+ī-n(cal)0-0#" },
            { status: "blocked", reason: "nounstem-restricted-to-absolutive-state", formula: "" },
        ]
    );

    s.eq(
        "Lesson 13 ignores a lying possessive formula artifact",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "1sg",
                singularConnector: "0",
                formulaArtifact: "#x-0+tla(FAKE)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                artifact: frame.nncSlotFrame.sourceFormulaArtifact,
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
                containsFake: frame.formulaRealization.includes("FAKE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0+n-o(cal)0-0#",
            artifact: "#x-0+tla(FAKE)past+c-an#",
            artifactAuthority: "display-only-not-authority",
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 13 consumes typed tla compatibility and source-authorized third-plural m or n options",
        (() => {
            const relationalSource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("nacaz", {
                selectedState: "possessive",
                possessorCompatibility: "relational-tla",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const nOnlySource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("cal", {
                selectedState: "possessive",
                thirdPluralPossessorSt2Options: ["n"],
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const tla = ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("nacaz", {
                subject: "3common",
                possessor: "tla",
                singularConnector: "0",
                nncSourceAuthorityFrame: relationalSource,
            });
            const selectedN = ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "3pl",
                thirdPluralPossessorNumberMorph: "n",
                singularConnector: "0",
                nncSourceAuthorityFrame: nOnlySource,
            });
            const ignoredM = ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cal", {
                subject: "3common",
                possessor: "3pl",
                thirdPluralPossessorNumberMorph: "m",
                singularConnector: "0",
                nncSourceAuthorityFrame: nOnlySource,
            });
            return {
                tla: { status: tla.authorizationStatus, formula: tla.formulaRealization },
                selectedN: {
                    status: selectedN.authorizationStatus,
                    formula: selectedN.formulaRealization,
                    allowed: selectedN.stateFrame.authorizedThirdPluralPossessorSt2Options,
                },
                ignoredM: {
                    status: ignoredM.authorizationStatus,
                    reason: ignoredM.blockReason,
                    formula: ignoredM.formulaRealization,
                    suppliedAuthority: ignoredM.stateFrame.suppliedThirdPluralPossessorSt2Authority,
                },
            };
        })(),
        {
            tla: { status: "authorized", formula: "#0-0+tla(nacaz)0-0#" },
            selectedN: { status: "authorized", formula: "#0-0+ī-n(cal)0-0#", allowed: ["n"] },
            ignoredM: {
                status: "authorized",
                reason: "",
                formula: "#0-0+ī-n(cal)0-0#",
                suppliedAuthority: false,
            },
        }
    );

    s.eq(
        "Lesson 13 derives third-plural possessor st2 from the following stem sound",
        ["ā", "mā", "pīl", "cal", "teō"].map((stem) => {
            const resolution = ctx.resolveClassicalNahuatlThirdPluralPossessorSt2(stem);
            return {
                stem,
                st2: resolution.st2,
                followingSound: resolution.followingSound,
                rule: resolution.selectionRule,
                userAuthority: resolution.userSelectionAuthority,
            };
        }),
        [
            { stem: "ā", st2: "m", followingSound: "a", rule: "lesson13-st2-m-before-vowel-m-or-p", userAuthority: false },
            { stem: "mā", st2: "m", followingSound: "m", rule: "lesson13-st2-m-before-vowel-m-or-p", userAuthority: false },
            { stem: "pīl", st2: "m", followingSound: "p", rule: "lesson13-st2-m-before-vowel-m-or-p", userAuthority: false },
            { stem: "cal", st2: "n", followingSound: "c", rule: "lesson13-st2-n-outside-m-environment", userAuthority: false },
            { stem: "teō", st2: "n", followingSound: "t", rule: "lesson13-st2-n-outside-m-environment", userAuthority: false },
        ]
    );

    s.eq(
        "Lesson 13 typed source authority defeats relational spelling and loose-boolean poisoning",
        (() => {
            const ordinarySource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tla-cal", {
                selectedState: "possessive",
                possessorCompatibility: "ordinary",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                formula: "#FAKE#",
                surface: "tla-FAKE",
            });
            const frame = ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("tla-cal", {
                subject: "3common",
                possessor: "tla",
                singularConnector: "0",
                nounstemRelationKind: "relational",
                analogicalTlaDerivedStem: true,
                nncSourceAuthorityFrame: ordinarySource,
            });
            return {
                sourceStatus: ordinarySource.authorizationStatus,
                sourceCompatibility: ordinarySource.possessorCompatibility,
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                leakedFake: JSON.stringify(frame).includes("FAKE"),
            };
        })(),
        {
            sourceStatus: "authorized",
            sourceCompatibility: "ordinary",
            status: "blocked",
            reason: "tla-possessor-requires-relational-or-analogical-derived-nounstem",
            leakedFake: false,
        }
    );

    s.eq(
        "Lesson 14 treats form as class guidance and never as class authority",
        (() => {
            const vowelGuidance = ctx.getClassicalNahuatlLesson14ClassFormGuidance("cihuā");
            const consonantGuidance = ctx.getClassicalNahuatlLesson14ClassFormGuidance("cal");
            const missingSelection = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame("cihuā", {
                state: "absolutive",
            });
            const contradictorySelection = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame("cal", {
                state: "absolutive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
            });
            return {
                vowelCandidates: vowelGuidance.candidateClasses,
                consonantCandidates: consonantGuidance.candidateClasses,
                guidanceAuthorizes: vowelGuidance.classAuthorized,
                missingReason: missingSelection.blockReason,
                contradictoryReason: contradictorySelection.blockReason,
            };
        })(),
        {
            vowelCandidates: ["tl", "zero"],
            consonantCandidates: ["tli", "in", "zero"],
            guidanceAuthorizes: false,
            missingReason: "lexical-noun-class-selection-required",
            contradictoryReason: "selected-class-contradicts-canvas-form-constraint",
        }
    );
    s.eq(
        "Lesson 14 class aliases normalize spelling but cannot manufacture selection provenance",
        ["ti", "li", "null"].map((nounClass) => {
            const stem = nounClass === "ti" ? "cihuā" : "cal";
            const frame = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame(stem, {
                state: "absolutive",
                nounClass,
            });
            return {
                nounClass: frame.nounClass,
                status: frame.authorizationStatus,
                reason: frame.blockReason,
            };
        }),
        [
            { nounClass: "tl", status: "blocked", reason: "class-must-be-user-selected-or-supplied-by-external-lexical-record" },
            { nounClass: "tli", status: "blocked", reason: "class-must-be-user-selected-or-supplied-by-external-lexical-record" },
            { nounClass: "zero", status: "blocked", reason: "class-must-be-user-selected-or-supplied-by-external-lexical-record" },
        ]
    );

    s.eq(
        "Lesson 14 selects restricted versus general use and deletes only a tagged ephemeral vowel",
        (() => {
            const absolutive = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame("naca", {
                state: "absolutive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
            });
            const possessive = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame("naca", {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
            });
            const hostileUntypedDeletion = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame("naca", {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
            });
            return {
                absolutive: absolutive.selectedUseStem,
                possessive: possessive.selectedUseStem,
                action: possessive.useShapeAction,
                hostileStatus: hostileUntypedDeletion.authorizationStatus,
                hostileReason: hostileUntypedDeletion.blockReason,
            };
        })(),
        {
            absolutive: "naca",
            possessive: "nac",
            action: "delete-tagged-ephemeral-vowel",
            hostileStatus: "blocked",
            hostileReason: "truncation-requires-matching-tagged-ephemeral-a-or-i",
        }
    );

    s.eq(
        "Lesson 14 Subclass 2-C composes supportive i with k-before-i spelling after ephemeral-a deletion",
        (() => {
            const options = {
                state: "possessive",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
                truncationRepair: "supportive-i",
            };
            const source = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame("coz-ca", options);
            const selected = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("coz-ca", {
                ...options,
                subject: "3common",
                possessor: "3sg",
                tlSubclass: "2C",
            });
            const hostilePreRealizedStem = ctx.buildClassicalNahuatlLesson14NounstemSourceFrame("coz-ca", {
                ...options,
                generalUseStem: "coz-ci",
            });
            return {
                sourceStatus: source.authorizationStatus,
                sourceStem: source.generalUseStem,
                formula: selected.formulaRealization,
                supportiveRule: source.truncationRepairFrame.supportiveIFrame.selectedRuleId,
                kSpellingRule: source.truncationRepairFrame.kBeforeIFrame.selectedRuleId,
                orderedRules: source.truncationRepairFrame.orderedRuleIds,
                stringAuthority: source.truncationRepairFrame.stringConcatenationAuthority,
                containsForbiddenCozci: selected.formulaRealization.includes("coz-ci"),
                hostileStatus: hostilePreRealizedStem.authorizationStatus,
                hostileReason: hostilePreRealizedStem.blockReason,
            };
        })(),
        {
            sourceStatus: "authorized",
            sourceStem: "coz-qui",
            formula: "#0-0+ī-0(coz-qui)0-0#",
            supportiveRule: "cn-l2-25-supportive-i-kept",
            kSpellingRule: "cn-l2-25-stem-final-k-before-e-i-qu",
            orderedRules: ["cn-l2-25-supportive-i-kept", "cn-l2-25-stem-final-k-before-e-i-qu"],
            stringAuthority: false,
            containsForbiddenCozci: false,
            hostileStatus: "blocked",
            hostileReason: "truncation-requires-matching-tagged-ephemeral-a-or-i",
        }
    );

    s.eq(
        "Lesson 14 consumes Lessons 12 and 13 and finalizes class-governed NNC formulas",
        [
            ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("cal", {
                state: "absolutive",
                subject: "3common",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                animacy: "nonanimate",
            }),
            ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("naca", {
                state: "possessive",
                subject: "3common",
                possessor: "2sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
                tlSubclass: "2B",
            }),
            ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("cihuā", {
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "base",
                tlSubclass: "1A",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            consumed: frame.lowerNncFrame.kind,
            finalizer: frame.layerEvaluationFrame.finalizerLayerId,
        })),
        [
            { status: "authorized", formula: "#0-0(cal)li-0#", consumed: "classical-nahuatl-lesson12-absolutive-nnc-frame", finalizer: "lesson14-nounstem-class-use-shape" },
            { status: "authorized", formula: "#0-0+m-o(nac)0-0#", consumed: "classical-nahuatl-lesson13-possessive-nnc-frame", finalizer: "lesson14-nounstem-class-use-shape" },
            { status: "authorized", formula: "#ni-0+m-o(cihuā)uh-0#", consumed: "classical-nahuatl-lesson13-possessive-nnc-frame", finalizer: "lesson14-nounstem-class-use-shape" },
        ]
    );

    s.eq(
        "Lesson 15 preserves the specific Lesson 14 selection failure instead of hiding it behind a generic typed-frame message",
        (() => {
            const lesson14 = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("icniuh", {
                state: "possessive",
                subject: "3sg",
                possessor: "3sg",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                generalUseShape: "base",
                tlSubclass: "1A",
            });
            const lesson15 = ctx.buildClassicalNahuatlLesson15HigherNncFrame(lesson14);
            return {
                lesson14Status: lesson14.authorizationStatus,
                lesson14Reason: lesson14.blockReason,
                lesson15Status: lesson15.authorizationStatus,
                lesson15Reason: lesson15.blockReason,
            };
        })(),
        {
            lesson14Status: "blocked",
            lesson14Reason: "tli-possessive-common-subclass-selection-required",
            lesson15Status: "blocked",
            lesson15Reason: "tli-possessive-common-subclass-selection-required",
        }
    );

    s.eq(
        "Affinity and distributive formations remain one internal predicate stem and never become grammatical number",
        [
            ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("teō", {
                state: "absolutive",
                subject: "3pl",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                stemFormation: "affinity",
                pluralConnector: "0-h",
                pluralSelectionAuthority: "user-selection",
                animacy: "animate",
            }),
            ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("te", {
                state: "absolutive",
                subject: "3common",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                stemFormation: "distributive",
                animacy: "nonanimate",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            stem: frame.nncSlotFrame.slots.predicate.stem,
            derivationPosition: frame.derivedStemFrame.derivationPosition,
            grammaticalNumber: frame.derivedStemFrame.grammaticalNumberValue,
            subjectNumber: frame.nncSlotFrame.subjectNumber,
        })),
        [
            { status: "authorized", formula: "#0-0(tē-teō)0-h#", stem: "tē-teō", derivationPosition: "inside-predicate-stem", grammaticalNumber: "none", subjectNumber: "plural" },
            { status: "authorized", formula: "#0-0(teh-te)tl-0#", stem: "teh-te", derivationPosition: "inside-predicate-stem", grammaticalNumber: "none", subjectNumber: "common" },
        ]
    );

    s.eq(
        "Lesson 14.3 derives arbitrary affinity and distributive stems from Canvas rules rather than witness whitelists",
        [
            ["tah", "affinity"],
            ["cal", "affinity"],
            ["cal", "distributive-varietal"],
            ["āhui-l", "distributive-varietal"],
            ["icxi", "distributive-varietal"],
            ["xochitl", "affinity"],
        ].map(([stem, formation]) => {
            const frame = ctx.deriveClassicalNahuatlLesson143Stem(stem, formation);
            return {
                status: frame.authorizationStatus,
                operation: frame.operationId,
                result: frame.derivedStem,
                sourcePreserved: frame.sourceStemPreserved,
                formulaSlotDelta: frame.formulaSlotDelta,
                grammaticalNumber: frame.grammaticalNumberValue,
            };
        }),
        [
            { status: "authorized", operation: "lesson143-add-long-vowel-affinity-prefix", result: "tā-tah", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "lesson143-add-long-vowel-affinity-prefix", result: "cā-cal", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "lesson143-add-glottal-stop-distributive-varietal-prefix", result: "cah-cal", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "lesson143-add-glottal-stop-distributive-varietal-prefix", result: "ah-āhui-l", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "lesson143-add-glottal-stop-distributive-varietal-prefix", result: "ih-icxi", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
            { status: "authorized", operation: "lesson143-add-long-vowel-affinity-prefix", result: "xō-xochitl", sourcePreserved: true, formulaSlotDelta: 0, grammaticalNumber: "none" },
        ]
    );

    s.eq(
        "Lesson 14.3 rejects an invented finished spelling and keeps supportive i inside the one predicate stem",
        (() => {
            const contradiction = ctx.buildClassicalNahuatlLesson14DerivedStemFrame("cal", {
                stemFormation: "affinity",
                derivedStem: "witness-shaped-cal",
            });
            const supportive = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("icxi", {
                state: "absolutive",
                subject: "3common",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                stemFormation: "distributive-varietal",
                animacy: "nonanimate",
            });
            return {
                contradictionStatus: contradiction.authorizationStatus,
                contradictionReason: contradiction.blockReason,
                suppliedIsAuthority: contradiction.suppliedDerivedStemIsAuthority,
                supportiveFormula: supportive.formulaRealization,
                supportiveStem: supportive.nncSlotFrame?.slots?.predicate?.stem,
                supportiveKept: supportive.derivedStemFrame.derivationOperationFrame.supportiveInitialIKeptInSource,
                supportiveReduplicated: supportive.derivedStemFrame.derivationOperationFrame.supportiveInitialIReduplicatedAsSupportive,
            };
        })(),
        {
            contradictionStatus: "blocked",
            contradictionReason: "supplied-derived-stem-contradicts-canvas-rule-derivation",
            suppliedIsAuthority: false,
            supportiveFormula: "#0-0(ih-icxi)tl-0#",
            supportiveStem: "ih-icxi",
            supportiveKept: true,
            supportiveReduplicated: true,
        }
    );

    s.eq(
        "Lesson 14 plural class tendencies cannot invent or override lexical connector selection",
        (() => {
            const missing = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("cōl", {
                state: "absolutive",
                subject: "1pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                animacy: "animate",
            });
            const distributiveMismatch = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("tah", {
                state: "absolutive",
                subject: "3pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                stemFormation: "distributive",
                derivedStem: "tah-tah",
                pluralConnector: "m-eh",
                sourcePlainPluralConnector: "t-in",
                pluralSelectionAuthority: "user-selection",
                animacy: "animate",
            });
            const selected = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("cōl", {
                state: "absolutive",
                subject: "1pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                pluralConnector: "t-in",
                pluralSelectionAuthority: "user-selection",
                animacy: "animate",
            });
            return {
                missing: missing.blockReason,
                mismatch: distributiveMismatch.blockReason,
                selected: selected.formulaRealization,
                guidanceIsSelection: selected.connectorSelectionFrame.classGuidelineIsLexicalSelection,
            };
        })(),
        {
            missing: "lexical-plural-number-dyad-selection-required",
            mismatch: "distributive-plural-must-follow-source-stem-connector",
            selected: "#ti-0(cōl)t-in#",
            guidanceIsSelection: false,
        }
    );

    s.eq(
        "Lesson 14 supports typed subclass alternatives without allowing an unlicensed silent connector",
        (() => {
            const ordinary = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("ich", {
                state: "possessive",
                subject: "3sg",
                possessor: "2pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                tliSubclass: "2",
                singularConnector: "hui",
            });
            const silent = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("ich", {
                state: "possessive",
                subject: "3sg",
                possessor: "2pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                tliSubclass: "2",
                singularConnector: "⎕",
                silentConnectorAlternativeAuthorized: true,
            });
            const hostileSilent = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("ich", {
                state: "possessive",
                subject: "3sg",
                possessor: "2pl",
                nounClass: "tli",
                classSelectionAuthority: "user-selection",
                tliSubclass: "2",
                singularConnector: "⎕",
            });
            return {
                ordinary: ordinary.formulaRealization,
                silent: silent.formulaRealization,
                hostileStatus: hostileSilent.authorizationStatus,
                hostileReason: hostileSilent.blockReason,
            };
        })(),
        {
            ordinary: "#0-0+am-⎕(ich)hui-0#",
            silent: "#0-0+am-⎕(ich)⎕-0#",
            hostileStatus: "blocked",
            hostileReason: "tli-subclass2-requires-hui-or-lexically-authorized-silent-alternative",
        }
    );

    s.eq(
        "Lesson 14 preserves typed constituent alternatives, rejects string-only analyses, and requires selection",
        (() => {
            const analyses = [
                {
                    kind: "stem-final-uh-analysis",
                    id: "stem-final-uh",
                    slots: { stem: "teuh", num1: "0" },
                    vowelLengthAuthority: "explicit-typed-source-spelling",
                },
                "#0-0+n-o(te)uh-0#",
                {
                    kind: "num1-uh-analysis",
                    id: "num1-uh",
                    slots: { stem: "te", num1: "uh" },
                    vowelLengthAuthority: "explicit-typed-source-spelling",
                },
            ];
            const ambiguity = ctx.buildClassicalNahuatlLesson14ConstituentAnalysisFrame(analyses);
            const selected = ctx.buildClassicalNahuatlLesson14ConstituentAnalysisFrame(analyses, {
                selectedAnalysisId: "num1-uh",
                selectionAuthority: "user-selection",
            });
            return {
                status: ambiguity.authorizationStatus,
                reason: ambiguity.blockReason,
                count: ambiguity.alternativeCount,
                preserved: ambiguity.ambiguityPreserved,
                rejected: ambiguity.rejectedUntypedAnalysisCount,
                spellingSelects: ambiguity.spellingAloneSelectsAnalysis,
                selectedStatus: selected.authorizationStatus,
                selectedId: selected.selectedAnalysisId,
                selectedStem: selected.selectedAnalysis.slots.stem,
                selectedAuthority: selected.selectionAuthority,
            };
        })(),
        {
            status: "blocked",
            reason: "constituent-analysis-selection-required",
            count: 2,
            preserved: true,
            rejected: 1,
            spellingSelects: false,
            selectedStatus: "authorized",
            selectedId: "num1-uh",
            selectedStem: "te",
            selectedAuthority: "user-selection",
        }
    );

    s.eq(
        "Lesson 14.8 selected typed analysis controls boundary slots and preserves explicit vowel length",
        (() => {
            const baseOptions = {
                state: "possessive",
                subject: "3common",
                possessor: "1sg",
                nounClass: "zero",
                classSelectionAuthority: "user-selection",
                constituentAmbiguityKind: "front-o",
                constituentAlternativeStem: "mī",
                formulaArtifact: "#x-0+FAKE(wrong)0-0#",
            };
            const unresolved = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("omi", baseOptions);
            const current = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("omi", {
                ...baseOptions,
                selectedConstituentAnalysisId: "current-typed-slots",
                constituentAnalysisSelectionAuthority: "user-selection",
            });
            const alternative = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("omi", {
                ...baseOptions,
                selectedConstituentAnalysisId: "alternative-typed-slots",
                constituentAnalysisSelectionAuthority: "user-selection",
            });
            return {
                unresolved: [unresolved.authorizationStatus, unresolved.blockReason],
                current: [current.authorizationStatus, current.formulaRealization],
                alternative: [alternative.authorizationStatus, alternative.formulaRealization],
                selectedStem: alternative.ambiguityFrame.selectedAnalysis.slots.stem,
                selectedSt2: alternative.ambiguityFrame.selectedAnalysis.slots.st2,
                formulaPoisonAuthorized: alternative.formulaRealization.includes("FAKE"),
                stringAuthority: alternative.selectedOutputLogicFrame.formulaStringAuthority,
            };
        })(),
        {
            unresolved: ["blocked", "constituent-analysis-selection-required"],
            current: ["authorized", "#0-0+n-⎕(omi)0-0#"],
            alternative: ["authorized", "#0-0+n-o(mī)0-0#"],
            selectedStem: "mī",
            selectedSt2: "o",
            formulaPoisonAuthorized: false,
            stringAuthority: false,
        }
    );

    s.eq(
        "A lying formula cannot replace Lesson 14 typed class, use-stem, or selected output authority",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("naca", {
                state: "possessive",
                subject: "3common",
                possessor: "2sg",
                nounClass: "tl",
                classSelectionAuthority: "user-selection",
                generalUseShape: "truncated",
                ephemeralFinalVowel: "a",
                tlSubclass: "2B",
                formulaArtifact: "#x-0+FAKE(wrong)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                artifact: frame.nncSlotFrame.sourceFormulaArtifact,
                selectedAuthority: frame.selectedOutputLogicFrame.selectedOutputAuthority,
                containsFake: frame.formulaRealization.includes("FAKE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0+m-o(nac)0-0#",
            artifact: "#x-0+FAKE(wrong)past+c-an#",
            selectedAuthority: "typed-nnc-slots-after-lesson14-class-use-finalizer",
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 15 stem formations use one Canvas option per grammatical operation",
        (() => {
            const ids = (stem, context) => ctx.getClassicalNahuatlLesson15PredicateOptionContract(stem, context).optionIds;
            return {
                pilAbsolutive: ids("pil", { state: "absolutive" }),
                pilPossessive: ids("pil", { state: "possessive" }),
                teucOrdinary: ids("tēuc", { state: "possessive", subject: "1sg", possessor: "2sg" }),
                teucTotec: ids("tēuc", { state: "possessive", subject: "3sg", possessor: "1pl" }),
                achCauh: ids("āch-cāuh", { state: "possessive" }),
                analogical: ["māi", "ix-cuāi", "nacaz", "nel-hua"].map((stem) => ids(stem, { state: "absolutive" })),
            };
        })(),
        {
            pilAbsolutive: ["source-stem", "analogical-restricted-use"],
            pilPossessive: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            teucOrdinary: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            teucTotec: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use", "tec-title"],
            achCauh: ["source-stem", "yo-matrix", "secondary-general-use", "analogical-restricted-use"],
            analogical: [
                ["source-stem", "analogical-restricted-use"],
                ["source-stem", "analogical-restricted-use"],
                ["source-stem", "analogical-restricted-use"],
                ["source-stem", "analogical-restricted-use"],
            ],
        }
    );

    s.eq(
        "Lesson 15 stem-formation authority resolves matrix boundaries and rejects invented choices",
        (() => {
            const selected = ctx.buildClassicalNahuatlLesson15StemOperationRecord("tēuc", {
                operation: "analogical-restricted-use",
                targetStem: "tla-POISON",
                suppletiveConnector: "uh",
                predicateOptionId: "yo-matrix",
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
                selectionAuthority: "canvas-predicate-option",
            });
            const selectedPlural = ctx.buildClassicalNahuatlLesson15StemOperationRecord("tēuc", {
                predicateOptionId: "yo-matrix",
                state: "possessive",
                subject: "3pl",
                possessor: "2sg",
                selectionAuthority: "canvas-predicate-option",
            });
            const selectedLBoundary = ctx.buildClassicalNahuatlLesson15StemOperationRecord("pil", {
                predicateOptionId: "yo-matrix",
                state: "possessive",
                subject: "1sg",
                selectionAuthority: "canvas-predicate-option",
            });
            const selectedLBoundaryPlural = ctx.buildClassicalNahuatlLesson15StemOperationRecord("pil", {
                predicateOptionId: "yo-matrix",
                state: "possessive",
                subject: "3pl",
                selectionAuthority: "canvas-predicate-option",
            });
            const productivePrefix = ctx.buildClassicalNahuatlLesson15StemOperationRecord("cal", {
                predicateOptionId: "secondary-general-use",
                state: "possessive",
                selectionAuthority: "canvas-predicate-option",
            });
            const wrongTotecContext = ctx.buildClassicalNahuatlLesson15StemOperationRecord("tēuc", {
                predicateOptionId: "tec-title",
                state: "possessive",
                subject: "1sg",
                possessor: "2sg",
                selectionAuthority: "canvas-predicate-option",
            });
            const spurious = ctx.buildClassicalNahuatlLesson15StemOperationRecord("tēuc", {
                predicateOptionId: "tecu-i-yo",
                state: "possessive",
                subject: "3sg",
                possessor: "1pl",
                targetStem: "tēcuiyo",
                selectionAuthority: "canvas-predicate-option",
            });
            const retiredSurfaceOption = ctx.buildClassicalNahuatlLesson15StemOperationRecord("pil", {
                predicateOptionId: "suffix-lo",
                state: "possessive",
                selectionAuthority: "canvas-predicate-option",
            });
            return {
                selected: {
                    status: selected.authorizationStatus,
                    operation: selected.operation,
                    target: selected.targetStem,
                    connector: selected.suppletiveConnector,
                    authority: selected.selectionAuthority,
                },
                selectedPluralTarget: selectedPlural.targetStem,
                selectedLBoundaryTargets: [selectedLBoundary.targetStem, selectedLBoundaryPlural.targetStem],
                productivePrefix: [productivePrefix.authorizationStatus, productivePrefix.targetStem],
                wrongTotecContext: [wrongTotecContext.authorizationStatus, wrongTotecContext.blockReason],
                spurious: [spurious.authorizationStatus, spurious.blockReason, spurious.targetStem],
                retiredSurfaceOption: [retiredSurfaceOption.authorizationStatus, retiredSurfaceOption.blockReason],
            };
        })(),
        {
            selected: {
                status: "authorized",
                operation: "yo-matrix",
                target: "tēuc-yo",
                connector: "not-applicable",
                authority: "canvas-predicate-option",
            },
            selectedPluralTarget: "tēuc-yō",
            selectedLBoundaryTargets: ["pil-lo", "pil-lō"],
            productivePrefix: ["authorized", "tē-cal"],
            wrongTotecContext: ["blocked", "lesson15-predicate-option-not-authorized-for-source-and-context"],
            spurious: ["blocked", "lesson15-predicate-option-not-authorized-for-source-and-context", "tēuc"],
            retiredSurfaceOption: ["blocked", "lesson15-predicate-option-not-authorized-for-source-and-context"],
        }
    );

    s.eq(
        "Lesson 15 productively resolves stem-final voiceless w and n only before the possessive plural number dyad hu-ān",
        (() => {
            const eagle = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("cuāuh", {
                state: "possessive", subject: "3pl", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const mother = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("nān", {
                state: "possessive", subject: "1pl", possessor: "1pl",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const nearby = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("cal", {
                state: "possessive", subject: "3pl", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const outputs = [eagle, mother, nearby].map((frame) => ctx.buildClassicalNahuatlLesson15HigherNncFrame(frame));
            return outputs.map((frame) => ({
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                actions: frame.operationFrame.appliedActions.map((action) => action.action),
            }));
        })(),
        [
            { status: "authorized", formula: "#0-0+n-o(cuā)hu-ān#", actions: ["delete-final-voiceless-w-before-possessive-plural-number-dyad"] },
            { status: "authorized", formula: "#ti-0+t-o(nā)hu-ān#", actions: ["assimilate-final-n-before-possessive-plural-number-dyad"] },
            { status: "authorized", formula: "#0-0+n-o(cal)hu-ān#", actions: [] },
        ]
    );

    s.eq(
        "Lesson 15 keeps lexical suppletion separate from productive boundary behavior",
        (() => {
            const operationRecord = ctx.buildClassicalNahuatlLesson15StemOperationRecord("tlācoh", {
                operation: "suppletive",
                targetStem: "tlāca",
                suppletiveConnector: "uh",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const sourceAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tlācoh", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: operationRecord,
            });
            const source = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("tlācoh", {
                state: "possessive", subject: "1sg", possessor: "2sg",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                nncSourceAuthorityFrame: sourceAuthority,
            });
            const selected = ctx.buildClassicalNahuatlLesson15HigherNncFrame(source);
            const hostile = ctx.buildClassicalNahuatlLesson15HigherNncFrame(source, {
                suppletivePossessiveStem: "tlāca",
                suppletiveSingularConnector: "uh",
            });
            return {
                selectedStatus: selected.authorizationStatus,
                selectedFormula: selected.formulaRealization,
                selectedAction: selected.operationFrame.appliedActions[0].action,
                hostileReason: hostile.blockReason,
                examplesAreWhitelist: selected.operationFrame.lexicalExamplesAreRuleWhitelist,
                rejectedHistoricalOutput: selected.operationFrame.prohibitedDerivationRecords[0].rejectedOutput,
            };
        })(),
        {
            selectedStatus: "authorized",
            selectedFormula: "#ni-0+m-o(tlāca)uh-0#",
            selectedAction: "substitute-lexically-authorized-possessive-stem",
            hostileReason: "lesson15-stem-operation-requires-typed-source-record",
            examplesAreWhitelist: false,
            rejectedHistoricalOutput: "totēcuiyo",
        }
    );

    s.eq(
        "Lesson 15 secondary, analogical, and reclassification operations alter typed stems rather than formula text",
        (() => {
            const secondaryAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tah", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: ctx.buildClassicalNahuatlLesson15StemOperationRecord("tah", {
                    operation: "secondary-general-use",
                    targetStem: "tē-tah",
                    secondaryPossessorCarrier: "tē",
                    selectionAuthority: "user-supplied-lexical-analysis",
                }),
            });
            const analogicalAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("naca", {
                selectedState: "absolutive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: ctx.buildClassicalNahuatlLesson15StemOperationRecord("naca", {
                    operation: "analogical-restricted-use",
                    targetStem: "tla-naca",
                    selectionAuthority: "user-supplied-lexical-analysis",
                }),
            });
            const reclassificationAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("māi", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: ctx.buildClassicalNahuatlLesson15StemOperationRecord("māi", {
                    operation: "tl-2a-to-1a",
                    targetStem: "mā",
                    selectionAuthority: "user-supplied-lexical-analysis",
                }),
            });
            const secondarySource = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("tah", {
                state: "possessive", subject: "3sg", possessor: "3pl", thirdPluralPossessorNumberMorph: "n",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                nncSourceAuthorityFrame: secondaryAuthority,
            });
            const analogicalSource = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("naca", {
                state: "absolutive", subject: "3common",
                nounClass: "tl", classSelectionAuthority: "user-selection",
                nncSourceAuthorityFrame: analogicalAuthority,
            });
            const reclassificationSource = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("māi", {
                state: "possessive", subject: "3sg", possessor: "3sg",
                nounClass: "tl", classSelectionAuthority: "user-selection",
                generalUseShape: "truncated", ephemeralFinalVowel: "i", tlSubclass: "2A",
                nncSourceAuthorityFrame: reclassificationAuthority,
            });
            const outputs = [
                ctx.buildClassicalNahuatlLesson15HigherNncFrame(secondarySource),
                ctx.buildClassicalNahuatlLesson15HigherNncFrame(analogicalSource),
                ctx.buildClassicalNahuatlLesson15HigherNncFrame(reclassificationSource),
            ];
            return outputs.map((frame) => ({
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                stem: frame.nncSlotFrame.slots.predicate.stem,
                action: frame.operationFrame.appliedActions[0].action,
            }));
        })(),
        [
            { status: "authorized", formula: "#0-0+ī-n(tē-tah)0-0#", stem: "tē-tah", action: "downgrade-inner-possessive-predicate-to-general-use-stem" },
            { status: "authorized", formula: "#0-0(tla-naca)tl-0#", stem: "tla-naca", action: "downgrade-tla-possessive-predicate-to-restricted-use-stem" },
            { status: "authorized", formula: "#0-0+ī-0(mā)uh-0#", stem: "mā", action: "reclassify-tl-2a-as-tl-1a" },
        ]
    );

    s.eq(
        "Lesson 15 typed operation records exclude neighboring routes and preserve PDF-backed carrier length",
        (() => {
            const shortCarrier = ctx.buildClassicalNahuatlLesson15StemOperationRecord("tah", {
                operation: "secondary-general-use",
                targetStem: "te-tah",
                secondaryPossessorCarrier: "te",
                selectionAuthority: "user-supplied-lexical-analysis",
            });
            const oneOperation = ctx.buildClassicalNahuatlLesson15StemOperationRecord("tlācoh", {
                operation: "suppletive",
                targetStem: "tlāca",
                suppletiveConnector: "uh",
                selectionAuthority: "user-supplied-lexical-analysis",
                analogicalRestrictedUseStem: "tla-POISON",
                formulaArtifact: "#POISON#",
            });
            const invalidSource = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("tlācoh", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15StemOperationRecord: {
                    ...oneOperation,
                    sourceStem: "other",
                    formulaArtifact: "#POISON#",
                },
            });
            return {
                shortCarrierStatus: shortCarrier.authorizationStatus,
                shortCarrierReason: shortCarrier.blockReason,
                selectedOperation: oneOperation.operation,
                selectedTarget: oneOperation.targetStem,
                exactMacron: oneOperation.targetStem.includes("ā"),
                formulaAuthority: oneOperation.formulaStringAuthority,
                invalidSourceStatus: invalidSource.authorizationStatus,
                invalidSourceReason: invalidSource.blockReason,
            };
        })(),
        {
            shortCarrierStatus: "blocked",
            shortCarrierReason: "secondary-general-use-carrier-must-be-te-long-ti-or-t",
            selectedOperation: "suppletive",
            selectedTarget: "tlāca",
            exactMacron: true,
            formulaAuthority: false,
            invalidSourceStatus: "blocked",
            invalidSourceReason: "authorized-lesson15-stem-operation-record-required",
        }
    );

    s.eq(
        "Lesson 15 possessor reduplication duplicates the typed State dyad and keeps subject number separate",
        (() => {
            const selectedAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("pil", {
                selectedState: "possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                lesson15PossessorReduplicationSelection: ctx.buildClassicalNahuatlLesson15PossessorReduplicationSelection("pil", {
                    selected: true,
                    selectionAuthority: "user-supplied-lexical-analysis",
                }),
            });
            const source = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("pil", {
                state: "possessive", subject: "3pl", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection",
                nncSourceAuthorityFrame: selectedAuthority,
            });
            const selected = ctx.buildClassicalNahuatlLesson15HigherNncFrame(source);
            const nearby = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("pil", {
                state: "possessive", subject: "3sg", possessor: "1sg",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                nncSourceAuthorityFrame: selectedAuthority,
            });
            const hostile = ctx.buildClassicalNahuatlLesson15HigherNncFrame(nearby);
            return {
                formula: selected.formulaRealization,
                arity: selected.nncSlotFrame.slots.state.arity,
                slots: selected.nncSlotFrame.slots.state.slots.map((slot) => `${slot.role}:${slot.carrier}`),
                subjectNumber: selected.nncSlotFrame.subjectNumber,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            formula: "#0-0+n-o-n-o(pil)hu-ān#",
            arity: "reduplicated-dyadic",
            slots: ["st1:n", "st2:o", "st1:n", "st2:o"],
            subjectNumber: "plural",
            hostileReason: "possessor-reduplication-requires-dyadic-possessive-plural-subject",
        }
    );

    s.eq(
        "Lesson 15 permits a derived nonanimate possessive stem with common grammatical number",
        (() => {
            const source = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("chān", {
                state: "possessive", subject: "3common", possessor: "3pl", thirdPluralPossessorNumberMorph: "n",
                nounClass: "tli", classSelectionAuthority: "user-selection", tliSubclass: "1",
                stemFormation: "distributive", derivedStem: "chah-chān",
            });
            const frame = ctx.buildClassicalNahuatlLesson15HigherNncFrame(source, { animacy: "nonanimate" });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                relation: frame.nncSlotFrame.lesson15DerivedNonanimateReading,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0+ī-n(chah-chān)0-0#",
            relation: {
                active: true,
                subjectNumber: "common",
                EnglishPluralTranslationDoesNotChangeGrammarNumber: true,
            },
        }
    );

    s.eq(
        "Lesson 15 enforces natural-possession State restrictions but permits an explicit metaphorical override",
        (() => {
            const absolute = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("chān", {
                state: "absolutive", subject: "3common",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const possessive = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("tōnati", {
                state: "possessive", subject: "3sg", possessor: "1sg",
                nounClass: "tl", classSelectionAuthority: "user-selection", tlSubclass: "1A",
            });
            const naturalBlocked = ctx.buildClassicalNahuatlLesson15HigherNncFrame(absolute, { naturalPossessionPolicy: "naturally-possessed" });
            const neverBlocked = ctx.buildClassicalNahuatlLesson15HigherNncFrame(possessive, { naturalPossessionPolicy: "never-possessive" });
            const metaphor = ctx.buildClassicalNahuatlLesson15HigherNncFrame(possessive, {
                naturalPossessionPolicy: "never-possessive", metaphoricalOverride: true,
            });
            return {
                naturalReason: naturalBlocked.blockReason,
                neverReason: neverBlocked.blockReason,
                metaphorStatus: metaphor.authorizationStatus,
                possessorRole: metaphor.nncSlotFrame.slots.state.nuclearPossessorRole,
            };
        })(),
        {
            naturalReason: "naturally-possessed-nounstem-requires-possessive-state",
            neverReason: "nounstem-never-possessive-without-metaphorical-override",
            metaphorStatus: "authorized",
            possessorRole: "nuclear-basic-possessor",
        }
    );

    s.eq(
        "Lesson 15 hands one typed NNC to sentence authority without pretending its formula is sentence authority",
        (() => {
            const source = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("tīci", {
                state: "absolutive", subject: "1sg",
                nounClass: "tl", classSelectionAuthority: "user-selection",
            });
            const frame = ctx.buildClassicalNahuatlLesson15HigherNncFrame(source, {
                sentenceType: "wish", polarity: "negative", predicateKind: "equative",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                sentenceStatus: frame.sentenceHandoffFrame.authorizationStatus,
                sentenceType: frame.sentenceHandoffFrame.sentenceType,
                polarity: frame.sentenceHandoffFrame.polarity,
                lowerProvisional: frame.sentenceHandoffFrame.lowerNncOutputProvisional,
                formulaIsSentenceAuthority: frame.sentenceHandoffFrame.nncFormulaIsSentenceAuthority,
                sentenceSurfaceRealizedHere: frame.sentenceHandoffFrame.sentenceSurfaceRealizedHere,
                definitenessAmbiguous: frame.sentenceHandoffFrame.definitenessRemainsAmbiguous,
            };
        })(),
        {
            status: "authorized",
            formula: "#ni-0(tīci)tl-0#",
            sentenceStatus: "authorized",
            sentenceType: "wish",
            polarity: "negative",
            lowerProvisional: true,
            formulaIsSentenceAuthority: false,
            sentenceSurfaceRealizedHere: false,
            definitenessAmbiguous: true,
        }
    );

    s.eq(
        "An older Lesson 14 frame cannot freeze a Lesson 15 result by changing only the requested layer",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame("cal", {
                state: "absolutive", subject: "3common",
                nounClass: "tli", classSelectionAuthority: "user-selection",
            });
            const forged = { ...frame.nncSlotFrame, highestActiveLesson: 15 };
            const evaluation = ctx.buildClassicalNahuatlNncLayerEvaluationFrame({ nncSlotFrame: forged, highestActiveLesson: 15 });
            return {
                status: evaluation.authorizationStatus,
                reason: evaluation.blockReason,
                missing: evaluation.missingAppliedLayerIds,
            };
        })(),
        {
            status: "blocked",
            reason: "requested-nnc-layer-not-applied",
            missing: ["lesson15-higher-ordinary-nnc-conditions"],
        }
    );

    s.eq(
        "Lesson 16 pronominal NNCs are absolutive typed NNCs, not English pronoun substitutions",
        (() => {
            const personal = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-simple", subject: "1sg", EnglishPronoun: "I",
            });
            const possessive = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-simple", subject: "1sg", state: "possessive",
            });
            const relative = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "relative", subject: "3sg",
            });
            return {
                status: personal.authorizationStatus,
                formula: personal.formulaRealization,
                family: personal.nncSlotFrame.nncFamily,
                semanticKind: personal.sourceFrame.semanticKind,
                translationAuthority: personal.sourceFrame.EnglishPronounTranslationIsStructuralAuthority,
                possessiveReason: possessive.blockReason,
                relativeReason: relative.blockReason,
            };
        })(),
        {
            status: "authorized",
            formula: "#n-0(eh)0-0#",
            family: "pronominal",
            semanticKind: "entitive",
            translationAuthority: false,
            possessiveReason: "pronominal-nncs-occur-only-in-absolutive-state",
            relativeReason: "canvas-has-no-relative-pronominal-nnc-subtype",
        }
    );

    s.eq(
        "Lesson 16 carries typed pronominal noun class and referent category into selected NNC slots",
        [
            ["tl-eh-huā", { subtype: "interrogative", interrogativeKind: "tleh-huā", subject: "3sg", numberVariant: "sounded" }],
            ["eh", { subtype: "personal-simple", subject: "1sg" }],
            ["cā", { subtype: "interrogative", interrogativeKind: "cā", subject: "3sg" }],
            ["ā-0", { subtype: "interrogative", interrogativeKind: "āc", subject: "3sg" }],
            ["a-c-ah", { subtype: "indefinite", indefiniteKind: "someone", subject: "3sg" }],
            ["ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "ix" }],
            ["mo-ch-eh-huā", { subtype: "quantitive-personal-compound", subject: "3sg", quantitiveEmbed: "mo-ch", quantitivePersonalMatrix: "eh-huā", numberVariant: "sounded" }],
        ].map(([stem, options]) => {
            const frame = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority(options),
                enteredStem: stem,
                requireEnteredStem: true,
            });
            return {
                stem,
                nounClass: frame.nncSlotFrame.nounClass,
                nounClassAuthority: frame.nncSlotFrame.nounClassAuthority,
                referent: frame.nncSlotFrame.referentCategory,
                referentAuthority: frame.nncSlotFrame.referentCategoryAuthority,
            };
        }),
        [
            { stem: "tl-eh-huā", nounClass: "tl", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "entity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "eh", nounClass: "zero", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "entity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "cā", nounClass: "tl", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "entity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "ā-0", nounClass: "c", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "person", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "a-c-ah", nounClass: "zero", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "person", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "ix-qui-ch", nounClass: "zero", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "quantity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
            { stem: "mo-ch-eh-huā", nounClass: "tl", nounClassAuthority: "typed-canvas-pronominal-source-structure", referent: "quantity", referentAuthority: "typed-canvas-pronominal-semantic-kind" },
        ]
    );

    s.eq(
        "Every Canvas stem example exposed by NNC Source reaches an authorized typed output",
        (() => {
            const ordinary = [
                ["cal", "tli"],
                ["pah", "tli"],
                ["mich", "in"],
                ["chichi", "zero"],
            ].map(([stem, nounClass]) => {
                const lesson14 = ctx.buildClassicalNahuatlLesson14ClassGovernedNncFrame(stem, {
                    state: "absolutive",
                    subject: "3common",
                    nounClass,
                    classSelectionAuthority: "user-selection",
                    animacy: "animate",
                });
                const frame = ctx.buildClassicalNahuatlLesson15HigherNncFrame(lesson14, { animacy: "animate" });
                return [stem, frame.authorizationStatus, frame.formulaRealization, frame.blockReason];
            });
            const pronominalOptions = [
                ["eh", { subtype: "personal-simple", subject: "1sg" }],
                ["yeh", { subtype: "personal-simple", subject: "3sg" }],
                ["eh-huā", { subtype: "personal-compound", subject: "1sg", numberVariant: "sounded" }],
                ["yeh-huā", { subtype: "personal-compound", subject: "3sg", numberVariant: "sounded" }],
                ["yeh-yeh-huā", { subtype: "personal-compound-derived", subject: "3common", derivedPersonalStem: "yeh-yeh-huā" }],
                ["eh-eh-huā", { subtype: "personal-compound-derived", subject: "3common", derivedPersonalStem: "eh-eh-huā" }],
                ["tl-eh", { subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg" }],
                ["tl-eh-huā", { subtype: "interrogative", interrogativeKind: "tleh-huā", subject: "3sg", numberVariant: "sounded" }],
                ["cā", { subtype: "interrogative", interrogativeKind: "cā", subject: "3sg" }],
                ["cā-tl-eh", { subtype: "interrogative", interrogativeKind: "cā", compoundInterrogativeStem: "cā-tl-eh", compoundInterrogativeEmbed: "cā", compoundInterrogativeMatrix: "tl-eh", compoundInterrogativeNumberClass: "zero", subject: "3sg" }],
                ["cā-tl-e-in", { subtype: "interrogative", interrogativeKind: "cā", compoundInterrogativeStem: "cā-tl-e-in", compoundInterrogativeEmbed: "cā", compoundInterrogativeMatrix: "tl-e-in", compoundInterrogativeNumberClass: "zero", subject: "3sg" }],
                ["cā-tl-eh-huā", { subtype: "interrogative", interrogativeKind: "cā", compoundInterrogativeStem: "cā-tl-eh-huā", compoundInterrogativeEmbed: "cā", compoundInterrogativeMatrix: "tl-eh-huā", compoundInterrogativeNumberClass: "tl", subject: "3sg" }],
                ["ā-0", { subtype: "interrogative", interrogativeKind: "āc", subject: "3sg" }],
                ["īn", { subtype: "demonstrative", demonstrative: "īn", subject: "3common" }],
                ["ōn", { subtype: "demonstrative", demonstrative: "ōn", subject: "3common" }],
                ["a-c-ah", { subtype: "indefinite", indefiniteKind: "someone", subject: "3sg" }],
                ["itl-ah", { subtype: "indefinite", indefiniteKind: "something", subject: "3common" }],
                ["ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "ix" }],
                ["cem-ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "cem-ix" }],
                ["quē-x-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "quē-x", interrogativeMeaning: true }],
                ["quē-x-ix-qui-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "quich", quantitiveEmbed: "quē-x-ix", interrogativeMeaning: true }],
                ["miya-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miya", matrixAllomorph: "qui" }],
                ["miya-c", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miya", matrixAllomorph: "c" }],
                ["miye-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miye", matrixAllomorph: "qui" }],
                ["miye-c", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "miye", matrixAllomorph: "c" }],
                ["ce-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "ce", matrixAllomorph: "qui" }],
                ["iz-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "iz", matrixAllomorph: "qui" }],
                ["quē-z-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "quē-z", matrixAllomorph: "qui", interrogativeMeaning: true }],
                ["quē-c-iz-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "quē-c-iz", matrixAllomorph: "qui", interrogativeMeaning: true }],
                ["a-qui", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui", quantitiveEmbed: "a", matrixAllomorph: "qui" }],
                ["a-chi", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "a", matrixAllomorph: "chi" }],
                ["mo-chi", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "mo", matrixAllomorph: "chi" }],
                ["mo-ch", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "mo", matrixAllomorph: "ch" }],
                ["mo-ch-eh-huā", { subtype: "quantitive-personal-compound", subject: "3sg", quantitiveEmbed: "mo-ch", quantitivePersonalMatrix: "eh-huā", numberVariant: "sounded" }],
                ["ix-a-chi", { subtype: "quantitive", subject: "3common", quantitiveMatrix: "chi", quantitiveEmbed: "ix-a", matrixAllomorph: "chi" }],
            ];
            const pronominal = pronominalOptions.map(([stem, options]) => {
                const frame = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                    ...withTypedQuantitiveAuthority(options),
                    enteredStem: stem,
                    requireEnteredStem: true,
                });
                return [stem, frame.authorizationStatus, frame.formulaRealization, frame.blockReason];
            });
            return [...ordinary, ...pronominal];
        })(),
        [
            ["cal", "authorized", "#0-0(cal)li-0#", ""],
            ["pah", "authorized", "#0-0(pah)tli-0#", ""],
            ["mich", "authorized", "#0-0(mich)in-0#", ""],
            ["chichi", "authorized", "#0-0(chichi)0-0#", ""],
            ["eh", "authorized", "#n-0(eh)0-0#", ""],
            ["yeh", "authorized", "#0-0(yeh)0-0#", ""],
            ["eh-huā", "authorized", "#n-0(eh-huā)tl-0#", ""],
            ["yeh-huā", "authorized", "#0-0(yeh-huā)tl-0#", ""],
            ["yeh-yeh-huā", "authorized", "#0-0(yeh-yeh-huā)tl-0#", ""],
            ["eh-eh-huā", "authorized", "#0-0(eh-eh-huā)tl-0#", ""],
            ["tl-eh", "authorized", "#0-0(tl-eh)0-0#", ""],
            ["tl-eh-huā", "authorized", "#0-0(tl-eh-huā)tl-0#", ""],
            ["cā", "authorized", "#0-0(cā)tl-0#", ""],
            ["cā-tl-eh", "authorized", "#0-0(cā-tl-eh)0-0#", ""],
            ["cā-tl-e-in", "authorized", "#0-0(cā-tl-e-in)0-0#", ""],
            ["cā-tl-eh-huā", "authorized", "#0-0(cā-tl-eh-huā)tl-0#", ""],
            ["ā-0", "authorized", "#0-0(ā-0)c-0#", ""],
            ["īn", "authorized", "#0-0(īn)0-0#", ""],
            ["ōn", "authorized", "#0-0(ōn)0-0#", ""],
            ["a-c-ah", "authorized", "#0-0(a-c-ah)0-0#", ""],
            ["itl-ah", "authorized", "#0-0(itl-ah)0-0#", ""],
            ["ix-qui-ch", "authorized", "#0-0(ix-qui-ch)0-0#", ""],
            ["cem-ix-qui-ch", "authorized", "#0-0(cem-ix-qui-ch)0-0#", ""],
            ["quē-x-qui-ch", "authorized", "#0-0(quē-x-qui-ch)0-0#", ""],
            ["quē-x-ix-qui-ch", "authorized", "#0-0(quē-x-ix-qui-ch)0-0#", ""],
            ["miya-qui", "authorized", "#0-0(miya-qui)0-0#", ""],
            ["miya-c", "authorized", "#0-0(miya-c)0-0#", ""],
            ["miye-qui", "authorized", "#0-0(miye-qui)0-0#", ""],
            ["miye-c", "authorized", "#0-0(miye-c)0-0#", ""],
            ["ce-qui", "authorized", "#0-0(ce-qui)0-0#", ""],
            ["iz-qui", "authorized", "#0-0(iz-qui)0-0#", ""],
            ["quē-z-qui", "authorized", "#0-0(quē-z-qui)0-0#", ""],
            ["quē-c-iz-qui", "authorized", "#0-0(quē-c-iz-qui)0-0#", ""],
            ["a-qui", "authorized", "#0-0(a-qui)0-0#", ""],
            ["a-chi", "authorized", "#0-0(a-chi)0-0#", ""],
            ["mo-chi", "authorized", "#0-0(mo-chi)0-0#", ""],
            ["mo-ch", "authorized", "#0-0(mo-ch)0-0#", ""],
            ["mo-ch-eh-huā", "authorized", "#0-0(mo-ch-eh-huā)tl-0#", ""],
            ["ix-a-chi", "authorized", "#0-0(ix-a-chi)0-0#", ""],
        ]
    );

    s.eq(
        "Lesson 16 Canvas examples do not turn witnesses into a source whitelist",
        (() => {
            const nearbyUnlistedStem = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive",
                    subject: "3common",
                    quantitiveMatrix: "qui",
                    quantitiveEmbed: "nehnemi",
                    matrixAllomorph: "qui",
                }),
                enteredStem: "nehnemi-qui",
                requireEnteredStem: true,
            });
            const forbiddenEmbedOnlyStem = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive",
                    subject: "3common",
                    quantitiveMatrix: "qui",
                    quantitiveEmbed: "ce",
                    matrixAllomorph: "c",
                }),
                enteredStem: "ce-c",
                requireEnteredStem: true,
            });
            return {
                nearbyStatus: nearbyUnlistedStem.authorizationStatus,
                nearbyFormula: nearbyUnlistedStem.formulaRealization,
                embedOnlyStatus: forbiddenEmbedOnlyStem.authorizationStatus,
                embedOnlyReason: forbiddenEmbedOnlyStem.blockReason,
            };
        })(),
        {
            nearbyStatus: "authorized",
            nearbyFormula: "#0-0(nehnemi-qui)0-0#",
            embedOnlyStatus: "blocked",
            embedOnlyReason: "ce-c-is-embed-only-not-a-complete-pronominal-nnc-source",
        }
    );

    s.eq(
        "Lesson 16 Source stem must match the selected typed pronominal analysis",
        (() => {
            const matched = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-simple", subject: "3sg",
                enteredStem: "yeh", requireEnteredStem: true,
            });
            const mismatched = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-simple", subject: "3sg",
                enteredStem: "eh", requireEnteredStem: true,
            });
            const absent = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-simple", subject: "3sg",
                requireEnteredStem: true,
            });
            return {
                matched: [matched.authorizationStatus, matched.sourceFrame.enteredStemMatchesAnalysis, matched.formulaRealization],
                mismatched: [mismatched.authorizationStatus, mismatched.blockReason],
                absent: [absent.authorizationStatus, absent.blockReason],
            };
        })(),
        {
            matched: ["authorized", true, "#0-0(yeh)0-0#"],
            mismatched: ["blocked", "entered-stem-does-not-match-selected-pronominal-nnc-analysis"],
            absent: ["blocked", "pronominal-nnc-entered-stem-required"],
        }
    );

    s.eq(
        "Lesson 16 third-common personal variants remain source-selected instead of being rewritten",
        [
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-simple", subject: "3common", thirdCommonVariant: "eh",
                enteredStem: "eh", requireEnteredStem: true,
            }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-compound", subject: "3common", thirdCommonVariant: "eh",
                enteredStem: "eh-huā", requireEnteredStem: true,
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            sourceStem: frame.sourceFrame.sourceStem,
            formula: frame.formulaRealization,
        })),
        [
            { status: "authorized", sourceStem: "eh", formula: "#0-0(eh)0-0#" },
            { status: "authorized", sourceStem: "eh-huā", formula: "#0-0(eh-huā)tl-0#" },
        ]
    );

    s.eq(
        "Lesson 16 personal families keep plain plural and internal-n plural structurally distinct",
        [
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "personal-simple", subject: "3sg" }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "personal-simple", subject: "1pl" }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "personal-compound", subject: "3pl", pluralConnector: "t-in" }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "personal-compound", subject: "2pl", pluralConnector: "silent-silent" }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            stem: frame.numberFrame.predicateStem,
            internalPlural: frame.numberFrame.internalPluralMorph,
            subjectDyad: `${frame.numberFrame.num1}-${frame.numberFrame.num2}`,
        })),
        [
            { status: "authorized", formula: "#0-0(yeh)0-0#", stem: "yeh", internalPlural: "none", subjectDyad: "0-0" },
            { status: "authorized", formula: "#t-0(eh)m-eh#", stem: "eh", internalPlural: "none", subjectDyad: "m-eh" },
            { status: "authorized", formula: "#0-0(yeh-huā-n)t-in#", stem: "yeh-huā-n", internalPlural: "n-inside-stem", subjectDyad: "t-in" },
            { status: "authorized", formula: "#am-0(eh-huā-n)⎕-⎕#", stem: "eh-huā-n", internalPlural: "n-inside-stem", subjectDyad: "⎕-⎕" },
        ]
    );

    s.eq(
        "Lesson 16 personal compound number variants and doubled first plural stay explicitly conditioned",
        (() => {
            const sounded = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-compound", subject: "1sg", numberVariant: "sounded",
            });
            const silent = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-compound", subject: "1sg", numberVariant: "silent",
            });
            const doubled = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-compound", subject: "1pl", pluralConnector: "t-in",
                contextSelectionRecord: ctx.buildClassicalNahuatlLesson16ContextSelectionRecord({
                    subtype: "personal-compound", subject: "1pl", doubledFirstPluralSelected: true,
                }),
            });
            const hostile = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-compound", subject: "2pl", pluralConnector: "t-in",
                contextSelectionRecord: ctx.buildClassicalNahuatlLesson16ContextSelectionRecord({
                    subtype: "personal-compound", subject: "2pl", doubledFirstPluralSelected: true,
                }),
            });
            return {
                sounded: sounded.formulaRealization,
                silent: silent.formulaRealization,
                doubled: doubled.formulaRealization,
                doubledMeaning: doubled.personFrame.contextualMeaning,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            sounded: "#n-0(eh-huā)tl-0#",
            silent: "#n-0(eh-huā)⎕-0#",
            doubled: "#ti-t-0(eh-huā-n)t-in#",
            doubledMeaning: "member-or-members-of-our-people",
            hostileReason: "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc",
        }
    );

    s.eq(
        "Lesson 16 emits the typed personal-pronominal partner required by Lesson 11.4.7",
        (() => {
            const personal = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "personal-compound", subject: "3pl" });
            const demonstrative = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "demonstrative", demonstrative: "īn", subject: "3pl" });
            return {
                personalStatus: personal.lesson11CooperationFrame.authorizationStatus,
                personalSubject: personal.lesson11CooperationFrame.cooperatingSubject,
                requiredIdentity: personal.lesson11CooperationFrame.requiredLesson11Identity,
                booleanAuthority: personal.lesson11CooperationFrame.booleanClaimAuthority,
                demonstrativeStatus: demonstrative.lesson11CooperationFrame.authorizationStatus,
            };
        })(),
        {
            personalStatus: "authorized",
            personalSubject: "3pl",
            requiredIdentity: "defective-nnc-cooperation",
            booleanAuthority: false,
            demonstrativeStatus: "not-authorized",
        }
    );

    s.eq(
        "Lesson 16 interrogative identity stems retain typed context, restrictions, and separate adjunct writing",
        (() => {
            const positive = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", clauseInitial: true,
                contextSelectionRecord: ctx.buildClassicalNahuatlLesson16ContextSelectionRecord({
                    subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg",
                    dependentClauseIntroducedByInSelected: true,
                }),
            });
            const negative = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", polarity: "negative",
            });
            const noninitial = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", clauseInitial: false,
            });
            const who = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg",
            });
            const hostileWho = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "1sg",
            });
            const dependentSentence = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(
                positive.nncSlotFrame,
                { sentenceType: "statement", polarity: "positive", discourseFrame: positive.discourseFrame }
            );
            return {
                positiveFormula: positive.formulaRealization,
                positiveReading: positive.discourseFrame.interrogativeReadingActive,
                writing: positive.discourseFrame.adjunctWritingPolicy,
                dependentSurface: dependentSentence.sentenceSurface,
                dependentFormula: dependentSentence.sentenceFormulaDisplay,
                negativeReading: negative.discourseFrame.interrogativeReadingActive,
                negativeReason: negative.discourseFrame.noninterrogativeReason,
                noninitialReason: noninitial.discourseFrame.noninterrogativeReason,
                whoFormula: who.formulaRealization,
                hostileReason: hostileWho.blockReason,
            };
        })(),
        {
            positiveFormula: "#0-0(tl-eh)0-0#",
            positiveReading: true,
            writing: "write-pronominal-nnc-and-in-separately",
            dependentSurface: "Tleh in …?",
            dependentFormula: "#0-0(tl-eh)0-0# in …?",
            negativeReading: false,
            negativeReason: "negative-pronominal-nnc-loses-interrogative-quality",
            noninitialReason: "noninitial-pronominal-nnc-loses-interrogative-quality",
            whoFormula: "#0-0(ā-0)c-0#",
            hostileReason: "ac-interrogative-requires-third-singular-subject",
        }
    );

    s.eq(
        "Lesson 16 discourse finalizes inherent interrogative punctuation after the lower NNC formula",
        (() => {
            const positive = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", clauseInitial: true,
            });
            const negative = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", polarity: "negative",
            });
            const noninitial = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", clauseInitial: false,
            });
            const realize = (frame, polarity) => ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(
                frame.nncSlotFrame,
                {
                    sentenceType: "statement",
                    polarity,
                    discourseFrame: frame.discourseFrame,
                    formulaArtifact: "#FAKE(wrong)past#",
                }
            );
            const positiveSentence = realize(positive, "positive");
            const negativeSentence = realize(negative, "negative");
            const noninitialSentence = realize(noninitial, "positive");
            return {
                lowerFormula: positive.formulaRealization,
                positiveFormula: positiveSentence.sentenceFormulaDisplay,
                positiveSurface: positiveSentence.sentenceSurface,
                positiveFinalizer: positiveSentence.sentenceFinalizerLayer,
                negativeSurface: negativeSentence.sentenceSurface,
                noninitialSurface: noninitialSentence.sentenceSurface,
                containsFake: `${positiveSentence.sentenceFormulaDisplay}${positiveSentence.sentenceSurface}`.includes("FAKE"),
            };
        })(),
        {
            lowerFormula: "#0-0(ā-0)c-0#",
            positiveFormula: "#0-0(ā-0)c-0#?",
            positiveSurface: "Āc?",
            positiveFinalizer: "lesson16.4-pronominal-interrogative-sentence-surface",
            negativeSurface: "Ahāc.",
            noninitialSurface: "Āc.",
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 16 cā plus tl-e-in plural applies the Canvas stem alternation before fixed m-eh",
        (() => {
            const build = (pluralConnector) => ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative",
                interrogativeKind: "cā",
                compoundInterrogativeStem: "cā-tl-e-in",
                compoundInterrogativeEmbed: "cā",
                compoundInterrogativeMatrix: "tl-e-in",
                compoundInterrogativeNumberClass: "zero",
                subject: "3pl",
                pluralConnector,
                enteredStem: "cā-tl-e-in",
                requireEnteredStem: true,
            });
            const authorized = build("m-eh");
            const hostile = build("t-in");
            return {
                status: authorized.authorizationStatus,
                formula: authorized.formulaRealization,
                predicateStem: authorized.numberFrame.predicateStem,
                stemAction: authorized.numberFrame.predicateStemAction,
                witness: authorized.numberFrame.legalWitnessTagIds,
                hostileStatus: hostile.authorizationStatus,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0(cā-tl-e-i)m-eh#",
            predicateStem: "cā-tl-e-i",
            stemAction: "realize-final-in-as-i-before-m-eh",
            witness: ["cn-l16-161-pronominal-family", "cn-l16-164-identificational-interrogative", "cn-l16-1643-ca-tlein-plural"],
            hostileStatus: "blocked",
            hostileReason: "ca-tlein-plural-number-dyad-must-be-m-eh",
        }
    );

    s.eq(
        "Lesson 16 demonstratives remain invariant third-person stems while plural is reported silently by the subject",
        [
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "demonstrative", demonstrative: "īn", subject: "3sg" }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "demonstrative", demonstrative: "īn", subject: "3pl" }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({ subtype: "demonstrative", demonstrative: "ōn", subject: "3pl" }),
        ].map((frame) => ({ formula: frame.formulaRealization, internalPlural: frame.numberFrame.internalPluralMorph })),
        [
            { formula: "#0-0(īn)0-0#", internalPlural: "none" },
            { formula: "#0-0(īn)⎕-⎕#", internalPlural: "none" },
            { formula: "#0-0(ōn)⎕-⎕#", internalPlural: "none" },
        ]
    );

    s.eq(
        "Lesson 16 plural proximal demonstrative accepts the PDF stem with vowel length intact",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "demonstrative",
                demonstrative: "īn",
                subject: "3pl",
                enteredStem: "īn",
                requireEnteredStem: true,
            });
            return {
                status: frame.authorizationStatus,
                enteredStemMatches: frame.sourceFrame.enteredStemMatchesAnalysis,
                formula: frame.formulaRealization,
                blockReason: frame.blockReason,
            };
        })(),
        {
            status: "authorized",
            enteredStemMatches: true,
            formula: "#0-0(īn)⎕-⎕#",
            blockReason: "",
        }
    );

    s.eq(
        "Lesson 16 indefinite compounds expose the ah matrix and gate human itlah use",
        (() => {
            const someone = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "someone", subject: "1pl",
            });
            const blockedSomething = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "something", subject: "2sg",
            });
            const selectedSomething = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "something", subject: "2sg",
                contextSelectionRecord: ctx.buildClassicalNahuatlLesson16ContextSelectionRecord({
                    subtype: "indefinite", indefiniteKind: "something", subject: "2sg",
                    specialHumanUseSelected: true,
                }),
            });
            return {
                formula: someone.formulaRealization,
                composition: someone.sourceFrame.composition,
                blockedReason: blockedSomething.blockReason,
                selectedFormula: selectedSomething.formulaRealization,
            };
        })(),
        {
            formula: "#t-0(a-c-ah)m-eh#",
            composition: { embed: "a-c", matrix: "ah", embedVowelLengthAction: "remove-length-before-ah-matrix" },
            blockedReason: "itlah-with-human-subject-requires-special-situation-selection",
            selectedFormula: "#t-0(itl-ah)0-0#",
        }
    );

    s.eq(
        "Lesson 16 contextual choices require typed records and ignore fused or printed claims",
        (() => {
            const looseDoubled = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-compound", subject: "1pl", doubledFirstPluralPerson: true,
            });
            const looseDependent = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg",
                adjunctClausePresent: true,
            });
            const looseHuman = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "something", subject: "2sg", specialHumanUse: true,
            });
            const fusedSource = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg",
                enteredStem: "tl-e-in", requireEnteredStem: true,
                formulaArtifact: "#0-0(tl-eh)0-0# in dependent-clause",
            });
            const stringRecord = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "interrogative", interrogativeKind: "āc", subject: "3sg",
                contextSelectionRecord: "dependent-in-present",
            });
            return {
                looseDoubled: looseDoubled.blockReason,
                looseDependent: looseDependent.blockReason,
                looseHuman: looseHuman.blockReason,
                fusedSource: fusedSource.blockReason,
                fusedSelected: fusedSource.discourseFrame.dependentClauseIntroducedByIn,
                stringRecord: stringRecord.blockReason,
            };
        })(),
        {
            looseDoubled: "loose-lesson16-context-claims-are-not-authority",
            looseDependent: "loose-lesson16-context-claims-are-not-authority",
            looseHuman: "loose-lesson16-context-claims-are-not-authority",
            fusedSource: "entered-stem-does-not-match-selected-pronominal-nnc-analysis",
            fusedSelected: false,
            stringRecord: "typed-lesson16-context-selection-record-required",
        }
    );

    s.eq(
        "Lesson 15.3 realizes an NNC sentence from typed slots and ignores a hostile formula artifact",
        (() => {
            const someone = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "indefinite", indefiniteKind: "someone", subject: "1pl",
                formulaArtifact: "#FAKE(wrong)past#",
            });
            const statement = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(someone.nncSlotFrame, {
                sentenceType: "statement",
                polarity: "positive",
                formulaArtifact: "#FAKE(wrong)past#",
            });
            const question = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(someone.nncSlotFrame, {
                sentenceType: "question-cuix",
                polarity: "positive",
            });
            const negative = ctx.buildClassicalNahuatlNncSentenceSurfaceFrame(someone.nncSlotFrame, {
                sentenceType: "statement",
                polarity: "negative",
            });
            return {
                status: statement.authorizationStatus,
                formula: statement.baseNncFormula,
                sentenceFormula: statement.sentenceFormulaDisplay,
                surface: statement.sentenceSurface,
                question: question.sentenceSurface,
                negative: negative.sentenceSurface,
                stringAuthority: statement.formulaStringAuthority,
                containsFake: `${statement.sentenceFormulaDisplay}${statement.sentenceSurface}`.includes("FAKE"),
            };
        })(),
        {
            status: "authorized",
            formula: "#t-0(a-c-ah)m-eh#",
            sentenceFormula: "#t-0(a-c-ah)m-eh#.",
            surface: "Tacahmeh.",
            question: "Cuix tacahmeh?",
            negative: "Ahtacahmeh.",
            stringAuthority: false,
            containsFake: false,
        }
    );

    s.eq(
        "Lesson 16 quantitive matrices are compositional and their allomorph is typed rather than guessed",
        (() => {
            const quich = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "quich", quantitiveEmbed: "ix",
                }),
            });
            const qui = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "qui", quantitiveEmbed: "miye",
                    matrixAllomorph: "qui",
                }),
                pluralConnector: "silent-silent",
            });
            const hostile = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "qui", quantitiveEmbed: "miye",
                    matrixAllomorph: "chi",
                }),
            });
            return {
                quichFormula: quich.formulaRealization,
                quichComposition: quich.sourceFrame.composition,
                quiFormula: qui.formulaRealization,
                quiInternalPlural: qui.numberFrame.internalPluralMorph,
                hostileReason: hostile.blockReason,
            };
        })(),
        {
            quichFormula: "#t-0(ix-qui-ch)t-in#",
            quichComposition: {
                embed: "ix", matrixFamily: "qui-ch", matrixAllomorph: "qui-ch",
                matrixAllomorphSelectionAuthority: "typed-user-selection", predicatePluralization: "plain-qui-ch",
                deploymentFullyPredictable: false,
            },
            quiFormula: "#ti-0(miye-quī-n)⎕-⎕#",
            quiInternalPlural: "n-inside-stem",
            hostileReason: "selected-quantitive-matrix-form-not-authorized-for-family",
        }
    );

    s.eq(
        "Lesson 16 qui and chi families distinguish internal-n plural from lexically authorized plain variants",
        [
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "chi", quantitiveEmbed: "mo",
                    matrixAllomorph: "chi",
                }),
                pluralConnector: "t-in",
            }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "chi", quantitiveEmbed: "mo",
                    matrixAllomorph: "ch", plainPluralVariantAuthorized: true,
                }),
                pluralConnector: "t-in",
            }),
            ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                ...withTypedQuantitiveAuthority({
                    subtype: "quantitive", subject: "1pl", quantitiveMatrix: "qui", quantitiveEmbed: "iz",
                    matrixAllomorph: "quī", plainPluralVariantAuthorized: true,
                }),
                pluralConnector: "m-eh",
            }),
        ].map((frame) => ({
            status: frame.authorizationStatus,
            formula: frame.formulaRealization,
            internalPlural: frame.numberFrame.internalPluralMorph,
            subjectDyad: `${frame.numberFrame.num1}-${frame.numberFrame.num2}`,
        })),
        [
            { status: "authorized", formula: "#ti-0(mo-chī-n)t-in#", internalPlural: "n-inside-stem", subjectDyad: "t-in" },
            { status: "authorized", formula: "#ti-0(mo-ch)t-in#", internalPlural: "none", subjectDyad: "t-in" },
            { status: "authorized", formula: "#t-0(iz-quī)m-eh#", internalPlural: "none", subjectDyad: "m-eh" },
        ]
    );

    s.eq(
        "Lesson 16 quantitive authority preserves vowel truth and fails closed on strings and unauthorized plural routes",
        (() => {
            const shortForm = ctx.buildClassicalNahuatlLesson16QuantitiveAuthorityRecord({
                subject: "3common", matrixFamily: "qui", matrixForm: "qui", embedStem: "iz",
            });
            const longForm = ctx.buildClassicalNahuatlLesson16QuantitiveAuthorityRecord({
                subject: "3common", matrixFamily: "qui", matrixForm: "quī", embedStem: "iz",
            });
            const forbiddenInternalN = ctx.buildClassicalNahuatlLesson16QuantitiveAuthorityRecord({
                subject: "1pl", matrixFamily: "qui-ch", matrixForm: "qui-ch", embedStem: "ix",
                predicatePluralization: "internal-n",
            });
            const unauthorisedPlainC = ctx.buildClassicalNahuatlLesson16QuantitiveAuthorityRecord({
                subject: "1pl", matrixFamily: "qui", matrixForm: "c", embedStem: "miye",
                predicatePluralization: "plain-variant",
            });
            const typedC = ctx.buildClassicalNahuatlLesson16QuantitiveAuthorityRecord({
                subject: "3common", matrixFamily: "qui", matrixForm: "c", embedStem: "miye",
            });
            const contradictoryVisibleStem = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "quantitive", subject: "3common", quantitiveAuthorityRecord: typedC,
                enteredStem: "miye-quī", requireEnteredStem: true,
            });
            const looseStringClaim = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "quantitive", subject: "3common", quantitiveMatrix: "qui",
                quantitiveEmbed: "iz", matrixAllomorph: "quī",
            });
            return {
                shortStem: shortForm.selectedStem,
                longStem: longForm.selectedStem,
                shareTypedValue: longForm.shortAndLongIShareTypedValue,
                forbiddenInternalN: forbiddenInternalN.blockReason,
                unauthorisedPlainC: unauthorisedPlainC.blockReason,
                contradictoryVisibleStem: contradictoryVisibleStem.blockReason,
                looseStringClaim: looseStringClaim.blockReason,
            };
        })(),
        {
            shortStem: "iz-qui",
            longStem: "iz-quī",
            shareTypedValue: false,
            forbiddenInternalN: "qui-ch-matrix-cannot-acquire-internal-plural-n",
            unauthorisedPlainC: "plain-quantitive-plural-variant-requires-explicit-lexical-authorization",
            contradictoryVisibleStem: "entered-stem-does-not-match-selected-pronominal-nnc-analysis",
            looseStringClaim: "loose-lesson16-quantitive-claims-are-not-authority",
        }
    );

    s.eq(
        "Lesson 16 selected output ignores formula poison and proves the specialized active-layer path",
        (() => {
            const frame = ctx.buildClassicalNahuatlLesson16PronominalNncFrame({
                subtype: "personal-compound", subject: "3pl", pluralConnector: "t-in",
                formulaArtifact: "#x-0+FAKE(wrong)past+c-an#",
            });
            return {
                status: frame.authorizationStatus,
                formula: frame.formulaRealization,
                containsFake: frame.formulaRealization.includes("FAKE"),
                artifactAuthority: frame.nncSlotFrame.formulaArtifactAuthority,
                activeLayers: frame.layerEvaluationFrame.activeLayerIds,
                appliedLayers: frame.layerEvaluationFrame.appliedLayerIds,
                finalizer: frame.layerEvaluationFrame.finalizerLayerId,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0(yeh-huā-n)t-in#",
            containsFake: false,
            artifactAuthority: "display-only-not-authority",
            activeLayers: ["lesson12-absolutive-subject-state", "lesson16-pronominal-nnc-family"],
            appliedLayers: ["lesson12-absolutive-subject-state", "lesson16-pronominal-nnc-family"],
            finalizer: "lesson16-pronominal-nnc-family",
        }
    );

    s.eq(
        "typed NNC source authority surfaces lexical State availability and requires an explicit metaphorical exception",
        (() => {
            const natural = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("nān", {
                selectedState: "possessive",
                naturalPossessionPolicy: "naturally-possessed",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const blockedNever = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("teōtl", {
                selectedState: "possessive",
                naturalPossessionPolicy: "never-possessive",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const metaphoricalNever = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("teōtl", {
                selectedState: "possessive",
                naturalPossessionPolicy: "never-possessive",
                metaphoricalOverride: true,
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            return {
                natural: {
                    status: natural.authorizationStatus,
                    availability: natural.stateAvailability,
                    allowed: natural.allowedStateValues,
                    macron: natural.sourceStem,
                },
                blockedNever: {
                    status: blockedNever.authorizationStatus,
                    reason: blockedNever.blockReason,
                },
                metaphoricalNever: {
                    status: metaphoricalNever.authorizationStatus,
                    availability: metaphoricalNever.stateAvailability,
                    overrideUsed: metaphoricalNever.metaphoricalOverrideUsedForState,
                },
            };
        })(),
        {
            natural: {
                status: "authorized",
                availability: "possessive-only",
                allowed: ["possessive"],
                macron: "nān",
            },
            blockedNever: {
                status: "blocked",
                reason: "nounstem-never-possessive-without-metaphorical-override",
            },
            metaphoricalNever: {
                status: "authorized",
                availability: "absolutive-only",
                overrideUsed: true,
            },
        }
    );

    s.eq(
        "typed NNC source authority fails closed on contradictions and ignores formula and surface poison",
        (() => {
            const contradictory = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("āxcā", {
                selectedState: "possessive",
                naturalPossessionPolicy: "naturally-possessed",
                stateAvailability: "both",
                policySelectionAuthority: "user-supplied-lexical-analysis",
            });
            const poisoned = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("āxcā", {
                selectedState: "possessive",
                naturalPossessionPolicy: "naturally-possessed",
                policySelectionAuthority: "user-supplied-lexical-analysis",
                formula: "#FAKE#",
                surface: "FAKE",
            });
            return {
                contradiction: {
                    status: contradictory.authorizationStatus,
                    reason: contradictory.blockReason,
                },
                poisoned: {
                    status: poisoned.authorizationStatus,
                    sourceStem: poisoned.sourceStem,
                    formulaAuthority: poisoned.formulaStringAuthority,
                    surfaceAuthority: poisoned.surfaceStringAuthority,
                    leakedFake: JSON.stringify(poisoned).includes("FAKE"),
                },
            };
        })(),
        {
            contradiction: {
                status: "blocked",
                reason: "natural-possession-policy-contradicts-state-availability",
            },
            poisoned: {
                status: "authorized",
                sourceStem: "āxcā",
                formulaAuthority: false,
                surfaceAuthority: false,
                leakedFake: false,
            },
        }
    );

    return s;
}

module.exports = { run };
