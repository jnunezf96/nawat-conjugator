"use strict";

const { createSuite } = require("./runner");

function buildActiveMatiCausative(ctx) {
    const source = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mati", {
        subject: "1pl",
        mood: "indicative",
        tense: "present",
        verbClass: "B",
        perfectiveClass: "B",
        valence: "specific-projective",
        requestedSourceValence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === "mach-tiā");
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option?.optionId || "missing-mach-tiā",
        targetSubject: "3sg",
    });
    return ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "3sg",
    });
}

function buildPassiveMatiCausative(ctx, {
    tense,
    realization,
}) {
    const active = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mati", {
        subject: "3sg",
        mood: "indicative",
        tense,
        verbClass: "B",
        perfectiveClass: "B",
        valence: "specific-projective",
        requestedSourceValence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson: "3sg",
    });
    const nonactive = ctx.deriveClassicalNahuatlLesson20NonactiveStemRecord("mati", {
        verbClass: "B",
        sourceValence: "specific-projective",
        optionId: "ō:mach-ō",
    });
    const source = ctx.buildClassicalNahuatlLessons20To22DerivedVncFrame(active, {
        voice: "passive",
        nonactiveStemRecord: nonactive,
        sourceValence: "specific-projective",
        sourceSubject: "3sg",
        sourceObjectPerson: "3sg",
        mood: "indicative",
        tense,
        verbClass: "B",
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === "mach-tiā");
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option?.optionId || "missing-mach-tiā",
        targetSubject: "3sg",
        causativeSpecificShuntlineRealization: realization,
    });
    return ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense,
        targetSubject: "3sg",
    });
}

function buildNehmatcanemiliztli(ctx) {
    return ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("nehmatcānēmiliz", {
        subject: "3sg",
        nounClass: "tli",
        animacy: "nonanimate",
    });
}

function buildTeocuicatl(ctx) {
    return ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("teōcuīca", {
        subject: "3sg",
        nounClass: "tl",
        animacy: "nonanimate",
    });
}

function buildCuicatl(ctx) {
    return ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cuīca", {
        subject: "3sg",
        nounClass: "tl",
        animacy: "nonanimate",
    });
}

function buildReflexiveTransitiveMatiCausative(ctx, {
    subject,
    tense,
    objectPerson = "3sg",
    causativeReferentRelation = "coreferential",
}) {
    const source = ctx.buildClassicalNahuatlLesson7VerbstemClassFrame("mati", {
        subject,
        mood: "indicative",
        tense,
        verbClass: "B",
        perfectiveClass: "B",
        valence: "specific-projective",
        requestedSourceValence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson,
        object: objectPerson,
    });
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const option = inventory.options.find(candidate => candidate.targetStem === "mach-tiā");
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: option?.optionId || "missing-mach-tiā",
        targetSubject: subject,
        causativeReferentRelation,
    });
    return ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense,
        targetSubject: subject,
    });
}

function buildContextSupplement(ctx, principal, profileId, {
    reading = "reflexive",
    principalReferenceId = "referent:cuicatl",
    adjunctReferenceId = principalReferenceId,
    principalObjectId = "source-object-1",
    surfaceArtifact = "",
    surfaceRealization = "",
} = {}) {
    return ctx.buildClassicalNahuatlLesson253SupplementationFrame(principal, buildCuicatl(ctx), {
        profileId,
        principalObjectId,
        principalReferenceId,
        adjunctReferenceId,
        causativeObjectReading: reading,
        surfaceArtifact,
        surfaceRealization,
    });
}

function buildSupplement(ctx, principal, adjunct, profileId, referenceId = "referent:source-object", sourcePrincipalVncFrame = null) {
    return ctx.buildClassicalNahuatlLesson253SupplementationFrame(principal, adjunct, {
        profileId,
        sourcePrincipalVncFrame,
        principalObjectId: "source-object-1",
        principalReferenceId: referenceId,
        adjunctReferenceId: referenceId,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_3_supplementation");

    s.eq(
        "Lesson 25.3 has five exact typed profiles and leaves the three Lesson 25.16 profiles intact",
        {
            version: ctx.CLASSICAL_NAHUATL_LESSON25_3_SUPPLEMENTATION_VERSION,
            api: [
                typeof ctx.getClassicalNahuatlLesson253SupplementationProfileInventory,
                typeof ctx.buildClassicalNahuatlLesson253SupplementationFrame,
                typeof ctx.isClassicalNahuatlLesson253SupplementationFrame,
            ],
            profiles: ctx.getClassicalNahuatlLesson253SupplementationProfileInventory().map(profile => [
                profile.profileId,
                profile.principalSourceStem,
                profile.principalSpecificShuntlineRealization,
                profile.adjunctProfileId,
            ]),
            lesson2516Count: ctx.getClassicalNahuatlLesson2516SupplementationProfileInventory().length,
        },
        {
            version: 3,
            api: ["function", "function", "function"],
            profiles: [
                ["lesson25.3-active-mati-silent-direct-object", "mati", "", "nehmatcanemiliztli-absolutive-nnc"],
                ["lesson25.3-passive-macho-silent-shuntline", "mach-ō", "silent", "nehmatcanemiliztli-absolutive-nnc"],
                ["lesson25.3-passive-macho-sounded-shuntline-imperfect", "mach-ō", "sounded", "teocuicatl-absolutive-nnc"],
                ["lesson25.3-reflexive-transitive-mati-1pl-present-cuicatl", "mati", "", "cuicatl-absolutive-nnc"],
                ["lesson25.3-reflexive-transitive-mati-3pl-future-cuicatl", "mati", "", "cuicatl-absolutive-nnc"],
            ],
            lesson2516Count: 3,
        }
    );

    const active = buildActiveMatiCausative(ctx);
    const passiveSilent = buildPassiveMatiCausative(ctx, { tense: "present", realization: "silent" });
    const passiveSounded = buildPassiveMatiCausative(ctx, { tense: "imperfect", realization: "sounded" });
    const nehmatcanemiliztli = buildNehmatcanemiliztli(ctx);
    const teocuicatl = buildTeocuicatl(ctx);
    const examples = [
        {
            profileId: "lesson25.3-active-mati-silent-direct-object",
            principal: active,
            adjunct: nehmatcanemiliztli,
            surface: "Tēchmachtia in nehmatcānēmiliztli.",
            semanticIdentity: "0|0|t-ech|0-0|mach-tia|0|0|0",
            binding: [false, "0-0"],
            sourcePrincipal: active,
            sourceDecomposition: "Tēchmachtia. + Nehmatcānēmiliztli.",
            source: ["classical-nahuatl-lesson7-verbstem-class-machinery-frame", "mati", ""],
        },
        {
            profileId: "lesson25.3-passive-macho-silent-shuntline",
            principal: passiveSilent,
            adjunct: nehmatcanemiliztli,
            surface: "Tēmachtia in nehmatcānēmiliztli.",
            semanticIdentity: "0|0|0-0|te|mach-tia|0|0|0",
            binding: [false, "0-0"],
            sourcePrincipal: passiveSilent,
            sourceDecomposition: "Tēmachtia. + Nehmatcānēmiliztli.",
            source: ["classical-nahuatl-lessons20-22-derived-vnc-machinery-frame", "mach-ō", "passive"],
        },
        {
            profileId: "lesson25.3-passive-macho-sounded-shuntline-imperfect",
            principal: passiveSounded,
            adjunct: teocuicatl,
            surface: "Quitēmachtiāya in teōcuīcatl.",
            semanticIdentity: "0|0|qui-0|te|mach-tiā|ya|0|0",
            binding: [true, "qui-0"],
            sourcePrincipal: passiveSilent,
            sourceDecomposition: "Tēmachtia. + Teōcuīcatl.",
            source: ["classical-nahuatl-lessons20-22-derived-vnc-machinery-frame", "mach-ō", "passive"],
        },
    ];

    s.eq(
        "All three Andrews 25.3 sentences compose canonical causative principals with canonical NNC supplements",
        examples.map(example => {
            const frame = buildSupplement(ctx, example.principal, example.adjunct, example.profileId, "referent:source-object", example.sourcePrincipal);
            const source = example.principal.sourceMachineryFrame;
            return {
                principalCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(example.principal),
                adjunctCanonical: example.adjunct.authorizationStatus,
                source: [source.kind, source.stem, source.voice || ""],
                target: [example.principal.targetStem, example.principal.finalTypedVncSlotFrame.semanticIdentity],
                status: frame.authorizationStatus,
                canonical: ctx.isClassicalNahuatlLesson253SupplementationFrame(frame),
                binding: [frame.principalObjectBindingFrame.objectId, frame.principalObjectBindingFrame.sounded, frame.principalObjectBindingFrame.carrier],
                sourcePrincipal: [
                    ctx.isClassicalNahuatlDerivedVncMachineryFrame(frame.sourcePrincipalVncFrame),
                    frame.sourceDecompositionFrame.sourcePrincipalSurfaceFrame.word,
                    frame.sourceDecompositionFrame.sourcePrincipalDistinctFromFinal,
                ],
                sourceDecomposition: frame.sourceDecompositionFrame.surfaceRealization,
                tokens: frame.linearizationFrame.tokens.map(token => [token.role, token.form]),
                surface: frame.surfaceRealization,
            };
        }),
        examples.map(example => ({
            principalCanonical: true,
            adjunctCanonical: "authorized",
            source: example.source,
            target: ["mach-tiā", example.semanticIdentity],
            status: "authorized",
            canonical: true,
            binding: ["source-object-1", ...example.binding],
            sourcePrincipal: [true, example.sourceDecomposition.split(".")[0].toLowerCase(), example.sourcePrincipal.canonicalSignature !== example.principal.canonicalSignature],
            sourceDecomposition: example.sourceDecomposition,
            tokens: example.surface.startsWith("Tēch") ? [["principal", "tēchmachtia"], ["adjunctor", "in"], ["supplementary-object", "nehmatcānēmiliztli"]]
                : example.surface.startsWith("Tēm") ? [["principal", "tēmachtia"], ["adjunctor", "in"], ["supplementary-object", "nehmatcānēmiliztli"]]
                    : [["principal", "quitēmachtiāya"], ["adjunctor", "in"], ["supplementary-object", "teōcuīcatl"]],
            surface: example.surface,
        }))
    );

    s.eq(
        "The passive profiles require the matching typed silent or sounded shuntline choice and environment",
        (() => {
            const soundedAsSilent = buildSupplement(ctx, passiveSounded, teocuicatl, "lesson25.3-passive-macho-silent-shuntline");
            const silentAsSounded = buildSupplement(ctx, passiveSilent, nehmatcanemiliztli, "lesson25.3-passive-macho-sounded-shuntline-imperfect");
            return {
                soundedAsSilent: [soundedAsSilent.authorizationStatus, soundedAsSilent.blockReason, soundedAsSilent.surfaceRealization],
                silentAsSounded: [silentAsSounded.authorizationStatus, silentAsSounded.blockReason, silentAsSounded.surfaceRealization],
            };
        })(),
        {
            soundedAsSilent: ["blocked", "classical-lesson25.3-principal-vnc-profile-mismatch", ""],
            silentAsSounded: ["blocked", "classical-lesson25.3-principal-vnc-profile-mismatch", ""],
        }
    );

    s.eq(
        "Reference identity and the exact canonical NNC profile gate supplementation",
        (() => {
            const wrongReference = ctx.buildClassicalNahuatlLesson253SupplementationFrame(active, nehmatcanemiliztli, {
                profileId: "lesson25.3-active-mati-silent-direct-object",
                principalObjectId: "source-object-1",
                principalReferenceId: "referent:one",
                adjunctReferenceId: "referent:two",
            });
            const wrongAdjunct = buildSupplement(ctx, active, teocuicatl, "lesson25.3-active-mati-silent-direct-object");
            return {
                wrongReference: [wrongReference.authorizationStatus, wrongReference.blockReason],
                wrongAdjunct: [wrongAdjunct.authorizationStatus, wrongAdjunct.blockReason],
            };
        })(),
        {
            wrongReference: ["blocked", "classical-lesson25.3-reference-identity-mismatch"],
            wrongAdjunct: ["blocked", "classical-lesson25.3-canonical-profile-nnc-adjunct-required"],
        }
    );

    s.eq(
        "Forged principal and adjunct records cannot authorize a Lesson 25.3 supplement",
        (() => {
            const forgedPrincipal = { ...active, targetStem: "caller-forged-target" };
            const forgedAdjunct = { ...nehmatcanemiliztli, formulaRealization: "caller-forged-nnc" };
            const fromForgedPrincipal = buildSupplement(ctx, forgedPrincipal, nehmatcanemiliztli, "lesson25.3-active-mati-silent-direct-object");
            const fromForgedAdjunct = buildSupplement(ctx, active, forgedAdjunct, "lesson25.3-active-mati-silent-direct-object");
            return {
                forgedPrincipal: [fromForgedPrincipal.authorizationStatus, fromForgedPrincipal.blockReason],
                forgedAdjunct: [fromForgedAdjunct.authorizationStatus, fromForgedAdjunct.blockReason],
            };
        })(),
        {
            forgedPrincipal: ["blocked", "classical-lesson25.3-canonical-derived-vnc-principal-required"],
            forgedAdjunct: ["blocked", "classical-lesson25.3-canonical-profile-nnc-adjunct-required"],
        }
    );

    s.eq(
        "Caller output strings are discarded, while forging the generated output invalidates canonical authority",
        (() => {
            const generated = ctx.buildClassicalNahuatlLesson253SupplementationFrame(passiveSounded, teocuicatl, {
                profileId: "lesson25.3-passive-macho-sounded-shuntline-imperfect",
                sourcePrincipalVncFrame: passiveSilent,
                principalObjectId: "source-object-1",
                principalReferenceId: "referent:teocuicatl",
                adjunctReferenceId: "referent:teocuicatl",
                surfaceArtifact: "Caller forged a sentence.",
                surfaceRealization: "Caller forged another sentence.",
            });
            const forgedFinal = { ...generated, surfaceRealization: "Caller forged final output." };
            const forgedSource = {
                ...generated,
                sourceDecompositionFrame: {
                    ...generated.sourceDecompositionFrame,
                    surfaceRealization: "Caller forged a source decomposition.",
                },
            };
            return {
                generated: [
                    generated.sourceDecompositionFrame.surfaceRealization,
                    generated.surfaceRealization,
                    generated.requestedSurfaceArtifactDiscarded,
                    generated.callerSuppliedSurfaceAccepted,
                    ctx.isClassicalNahuatlLesson253SupplementationFrame(generated),
                ],
                forgedCanonical: [
                    ctx.isClassicalNahuatlLesson253SupplementationFrame(forgedSource),
                    ctx.isClassicalNahuatlLesson253SupplementationFrame(forgedFinal),
                ],
            };
        })(),
        {
            generated: ["Tēmachtia. + Teōcuīcatl.", "Quitēmachtiāya in teōcuīcatl.", true, false, true],
            forgedCanonical: [false, false],
        }
    );

    s.eq(
        "The sounded imperfect route requires its distinct canonical lower source-principal VNC",
        (() => {
            const missing = buildSupplement(ctx, passiveSounded, teocuicatl, "lesson25.3-passive-macho-sounded-shuntline-imperfect");
            const wrongProfile = buildSupplement(ctx, passiveSounded, teocuicatl, "lesson25.3-passive-macho-sounded-shuntline-imperfect", "referent:source-object", active);
            const forgedLower = buildSupplement(ctx, passiveSounded, teocuicatl, "lesson25.3-passive-macho-sounded-shuntline-imperfect", "referent:source-object", {
                ...passiveSilent,
                targetStem: "caller-forged-lower-source",
            });
            const generated = buildSupplement(ctx, passiveSounded, teocuicatl, "lesson25.3-passive-macho-sounded-shuntline-imperfect", "referent:source-object", passiveSilent);
            const forgedNestedSource = {
                ...generated,
                sourcePrincipalVncFrame: {
                    ...generated.sourcePrincipalVncFrame,
                    targetStem: "caller-forged-after-generation",
                },
            };
            return {
                missing: [missing.authorizationStatus, missing.blockReason],
                wrongProfile: [wrongProfile.authorizationStatus, wrongProfile.blockReason],
                forgedLower: [forgedLower.authorizationStatus, forgedLower.blockReason],
                generated: [
                    generated.sourceDecompositionFrame.sourcePrincipalSurfaceFrame.word,
                    generated.sourceDecompositionFrame.surfaceRealization,
                    generated.sourceDecompositionFrame.sourcePrincipalDistinctFromFinal,
                    generated.proofFrame.premises.find(premise => premise.layer === "canonical-lower-source-principal-vnc")?.passed,
                ],
                forgedNestedSourceCanonical: ctx.isClassicalNahuatlLesson253SupplementationFrame(forgedNestedSource),
            };
        })(),
        {
            missing: ["blocked", "classical-lesson25.3-typed-source-principal-required"],
            wrongProfile: ["blocked", "classical-lesson25.3-source-principal-profile-mismatch"],
            forgedLower: ["blocked", "classical-lesson25.3-canonical-source-principal-required"],
            generated: ["tēmachtia", "Tēmachtia. + Teōcuīcatl.", true, true],
            forgedNestedSourceCanonical: false,
        }
    );

    const contextualCases = [{
        profileId: "lesson25.3-reflexive-transitive-mati-1pl-present-cuicatl",
        subject: "1pl",
        tense: "present",
        reading: "reflexive",
        semanticIdentity: "ti|0|c-0|t-o|mach-tia|0|0|h",
        formula: "#ti-0+c-0+t-o(mach-tia)0+0-h#",
        word: "tictomachtiah",
        surface: "Tictomachtiah in cuīcatl.",
        positions: [
            ["source-object-1", "specific-projective", "3sg", "c-0", "shuntline"],
            ["causative-object", "reflexive", "1pl", "t-o", "mainline"],
        ],
        citationSlots: [
            ["causative-object", "m-o", "t-o", "causative-object"],
            ["retained-source-object", "tla", "c-0", "source-object-1"],
            ["derived-predicate", "mach-tiā", "mach-tia", ""],
        ],
    }, {
        profileId: "lesson25.3-reflexive-transitive-mati-3pl-future-cuicatl",
        subject: "3pl",
        tense: "future",
        reading: "reciprocative",
        semanticIdentity: "0|0|qui-0|m-o|mach-tī|z|qu|eh",
        formula: "#0-0+qui-0+m-o(mach-tī)z+qu-eh#",
        word: "quimomachtīzqueh",
        surface: "Quimomachtīzqueh in cuīcatl.",
        positions: [
            ["source-object-1", "specific-projective", "3sg", "qui-0", "shuntline"],
            ["causative-object", "reflexive", "3pl", "m-o", "mainline"],
        ],
        citationSlots: [
            ["causative-object", "m-o", "m-o", "causative-object"],
            ["retained-source-object", "tla", "qui-0", "source-object-1"],
            ["derived-predicate", "mach-tiā", "mach-tī", ""],
        ],
    }];

    s.eq(
        "The two contextual m-o+tla-(mach-tiā) examples compose from canonical typed VNC and cuīcatl NNC frames",
        contextualCases.map(example => {
            const principal = buildReflexiveTransitiveMatiCausative(ctx, example);
            const frame = buildContextSupplement(ctx, principal, example.profileId, {
                reading: example.reading,
            });
            return {
                principalCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(principal),
                principalFormula: principal.formulaRealization,
                principalSemanticIdentity: principal.targetTypedVncSlotFrame.semanticIdentity,
                positions: principal.targetObjectClusterFrame.positions.map(position => [
                    position.objectId,
                    position.objectKind,
                    position.objectPerson,
                    position.carrier,
                    position.prominence,
                ]),
                adjunct: [frame.adjunctNncFrame.kind, frame.adjunctNncSlotFrame.semanticIdentity],
                sourceReading: [
                    frame.principalStemReadingFrame.canonicalSourceReading,
                    frame.principalStemReadingFrame.causativeObjectReadingOptions,
                    frame.principalStemReadingFrame.selectedCausativeObjectReading,
                    frame.principalStemReadingFrame.citationSlots.map(slot => [
                        slot.slotId,
                        slot.citationCarrier,
                        slot.finiteCarrier,
                        slot.boundObjectId,
                    ]),
                ],
                reference: [
                    frame.principalObjectBindingFrame.objectId,
                    frame.referenceUnificationFrame.principalReferenceId,
                    frame.referenceUnificationFrame.adjunctReferenceId,
                    frame.referenceUnificationFrame.causativeObjectReading,
                ],
                typedSurface: [
                    frame.typedSurfaceRealizationFrame.authorizationStatus,
                    frame.typedSurfaceRealizationFrame.realizationAuthority,
                    frame.typedSurfaceRealizationFrame.principalMatchesCanvasWitness,
                    frame.typedSurfaceRealizationFrame.adjunctMatchesCanvasWitness,
                    frame.typedSurfaceRealizationFrame.canvasWitnessStringsAuthorize,
                ],
                tokens: frame.linearizationFrame.tokens.map(token => [token.role, token.form]),
                surface: frame.surfaceRealization,
                canonical: ctx.isClassicalNahuatlLesson253SupplementationFrame(frame),
            };
        }),
        contextualCases.map(example => ({
            principalCanonical: true,
            principalFormula: example.formula,
            principalSemanticIdentity: example.semanticIdentity,
            positions: example.positions,
            adjunct: ["classical-nahuatl-lesson12-absolutive-nnc-frame", "0|0|vacant|cuīca|tl|0"],
            sourceReading: [
                "m-o+tla-(mach-tiā)",
                ["reflexive", "reciprocative"],
                example.reading,
                example.citationSlots,
            ],
            reference: ["source-object-1", "referent:cuicatl", "referent:cuicatl", example.reading],
            typedSurface: ["authorized", "typed-vnc-and-nnc-slot-realizers", true, true, false],
            tokens: [["principal", example.word], ["adjunctor", "in"], ["supplementary-object", "cuīcatl"]],
            surface: example.surface,
            canonical: true,
        }))
    );

    s.eq(
        "Reflexive and reciprocative are typed readings of the same two principals, not competing result strings",
        contextualCases.map(example => {
            const principal = buildReflexiveTransitiveMatiCausative(ctx, example);
            const reflexive = buildContextSupplement(ctx, principal, example.profileId, { reading: "reflexive" });
            const reciprocative = buildContextSupplement(ctx, principal, example.profileId, { reading: "reciprocative" });
            const missing = buildContextSupplement(ctx, principal, example.profileId, { reading: "" });
            const unknown = buildContextSupplement(ctx, principal, example.profileId, { reading: "caller-invented" });
            return {
                readings: [
                    reflexive.principalStemReadingFrame.selectedCausativeObjectReading,
                    reciprocative.principalStemReadingFrame.selectedCausativeObjectReading,
                ],
                sameSurface: reflexive.surfaceRealization === reciprocative.surfaceRealization,
                distinctCanonicalSignatures: reflexive.canonicalSignature !== reciprocative.canonicalSignature,
                canonical: [
                    ctx.isClassicalNahuatlLesson253SupplementationFrame(reflexive),
                    ctx.isClassicalNahuatlLesson253SupplementationFrame(reciprocative),
                ],
                missing: [missing.authorizationStatus, missing.blockReason],
                unknown: [unknown.authorizationStatus, unknown.blockReason],
            };
        }),
        contextualCases.map(() => ({
            readings: ["reflexive", "reciprocative"],
            sameSurface: true,
            distinctCanonicalSignatures: true,
            canonical: [true, true],
            missing: ["blocked", "classical-lesson25.3-typed-reflexive-reciprocative-reading-required"],
            unknown: ["blocked", "classical-lesson25.3-reflexive-reciprocative-reading-not-recognized"],
        }))
    );

    s.eq(
        "Wrong subject, tense, object, object identity, or reference cannot enter a contextual profile",
        (() => {
            const profileId = contextualCases[0].profileId;
            const wrongSubject = buildContextSupplement(ctx, buildReflexiveTransitiveMatiCausative(ctx, {
                subject: "3pl",
                tense: "future",
            }), profileId);
            const wrongTense = buildContextSupplement(ctx, buildReflexiveTransitiveMatiCausative(ctx, {
                subject: "1pl",
                tense: "future",
            }), profileId);
            const wrongObject = buildContextSupplement(ctx, buildReflexiveTransitiveMatiCausative(ctx, {
                subject: "1pl",
                tense: "present",
                objectPerson: "3pl",
            }), profileId);
            const principal = buildReflexiveTransitiveMatiCausative(ctx, contextualCases[0]);
            const wrongObjectId = buildContextSupplement(ctx, principal, profileId, {
                principalObjectId: "causative-object",
            });
            const wrongReference = buildContextSupplement(ctx, principal, profileId, {
                principalReferenceId: "referent:one",
                adjunctReferenceId: "referent:two",
            });
            return Object.fromEntries(Object.entries({
                wrongSubject,
                wrongTense,
                wrongObject,
                wrongObjectId,
                wrongReference,
            }).map(([key, frame]) => [key, [frame.authorizationStatus, frame.blockReason]]));
        })(),
        {
            wrongSubject: ["blocked", "classical-lesson25.3-principal-vnc-profile-mismatch"],
            wrongTense: ["blocked", "classical-lesson25.3-principal-vnc-profile-mismatch"],
            wrongObject: ["blocked", "classical-lesson25.3-principal-vnc-profile-mismatch"],
            wrongObjectId: ["blocked", "classical-lesson25.3-principal-object-id-profile-mismatch"],
            wrongReference: ["blocked", "classical-lesson25.3-reference-identity-mismatch"],
        }
    );

    s.eq(
        "Rebuild validation rejects forged reading, reference, typed surface, and final result fields",
        (() => {
            const principal = buildReflexiveTransitiveMatiCausative(ctx, contextualCases[0]);
            const generated = buildContextSupplement(ctx, principal, contextualCases[0].profileId, {
                reading: "reflexive",
                surfaceArtifact: "Caller supplied source string.",
                surfaceRealization: "Caller supplied result string.",
            });
            const forgedReading = {
                ...generated,
                principalStemReadingFrame: {
                    ...generated.principalStemReadingFrame,
                    selectedCausativeObjectReading: "reciprocative",
                },
            };
            const forgedReference = {
                ...generated,
                referenceUnificationFrame: {
                    ...generated.referenceUnificationFrame,
                    adjunctReferenceId: "referent:forged",
                },
            };
            const forgedTypedSurface = {
                ...generated,
                typedSurfaceRealizationFrame: {
                    ...generated.typedSurfaceRealizationFrame,
                    principalWord: "callerforged",
                },
            };
            const forgedResult = {
                ...generated,
                surfaceRealization: "Caller forged the final result.",
            };
            return {
                generated: [
                    generated.surfaceRealization,
                    generated.requestedSurfaceArtifactDiscarded,
                    generated.callerSuppliedSurfaceAccepted,
                    ctx.isClassicalNahuatlLesson253SupplementationFrame(generated),
                ],
                forged: [forgedReading, forgedReference, forgedTypedSurface, forgedResult]
                    .map(frame => ctx.isClassicalNahuatlLesson253SupplementationFrame(frame)),
            };
        })(),
        {
            generated: ["Tictomachtiah in cuīcatl.", true, false, true],
            forged: [false, false, false, false],
        }
    );

    return s;
}

module.exports = { run };
