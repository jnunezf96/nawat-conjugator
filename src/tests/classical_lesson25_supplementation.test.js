"use strict";

const { createSuite } = require("./runner");

function jsonClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function buildBaseSource(ctx, stem, {
    subject,
    tense,
    verbClass,
    objectPerson,
}) {
    return ctx.buildClassicalNahuatlLesson7VerbstemClassFrame(stem, {
        subject,
        mood: "indicative",
        tense,
        verbClass,
        perfectiveClass: verbClass,
        valence: "specific-projective",
        transitivity: "transitive",
        objectKind: "specific-projective",
        objectPerson,
    });
}

function deriveCausative(ctx, source, targetStem, targetSubject, tense, {
    causativeReferentRelation,
} = {}) {
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const selectedOption = inventory.options.find(option => option.targetStem === targetStem);
    const operation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: selectedOption?.optionId || `missing-${targetStem}`,
        targetSubject,
        causativeReferentRelation,
    });
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, operation, {
        mood: "indicative",
        tense,
        targetSubject,
    });
    return { inventory, selectedOption, operation, machinery };
}

function buildCintliPrincipal(ctx) {
    const source = buildBaseSource(ctx, "māmā", {
        subject: "3pl",
        tense: "present",
        verbClass: "D",
        objectPerson: "3sg",
    });
    return deriveCausative(ctx, source, "māma-l-tiā", "3pl", "present", {
        causativeReferentRelation: "distinct",
    }).machinery;
}

function buildAtolliPrincipal(ctx) {
    const source = buildBaseSource(ctx, "ī", {
        subject: "1pl",
        tense: "future",
        verbClass: "A",
        objectPerson: "3sg",
    });
    return deriveCausative(ctx, source, "ī-tiā", "3pl", "future").machinery;
}

function buildTinocniuhPrincipal(ctx) {
    const source = buildBaseSource(ctx, "caqui", {
        subject: "2sg",
        tense: "preterit",
        verbClass: "B",
        objectPerson: "3sg",
    });
    const first = deriveCausative(ctx, source, "caquī-tiā", "1sg", "preterit").machinery;
    return deriveCausative(ctx, first, "caqui-ti-l-tiā", "3pl", "preterit").machinery;
}

function buildAtolliAdjunct(ctx, subject = "3sg") {
    return ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("ātōl", {
        subject,
        nounClass: "tli",
        animacy: "nonanimate",
    });
}

function buildTinocniuhAdjunct(ctx, subject = "2sg") {
    return ctx.buildClassicalNahuatlLesson13PossessiveNncFrame("cn-īuh", {
        subject,
        possessor: "1sg",
        singularConnector: subject.endsWith("sg") ? "0" : undefined,
        nounstemRelationKind: "nonrelational",
        animacy: "animate",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_supplementation");

    s.eq(
        "Lesson 25.16 exposes exactly the three typed Canvas supplementation profiles",
        {
            version: ctx.CLASSICAL_NAHUATL_LESSON25_16_SUPPLEMENTATION_VERSION,
            apiTypes: [
                typeof ctx.getClassicalNahuatlLesson2516SupplementationProfileInventory,
                typeof ctx.buildClassicalNahuatlLesson2516SupplementationFrame,
                typeof ctx.isClassicalNahuatlLesson2516SupplementationFrame,
            ],
            profiles: ctx.getClassicalNahuatlLesson2516SupplementationProfileInventory().map(profile => ({
                id: profile.profileId,
                target: profile.principalTargetStem,
                head: [profile.principalObjectId, profile.principalObjectPerson, profile.principalObjectDerivationalLevel],
                adjunct: profile.adjunctTypedSemanticIdentity,
                order: profile.constituentOrder,
            })),
        },
        {
            version: 1,
            apiTypes: ["function", "function", "function"],
            profiles: [
                {
                    id: "lesson25.16-cintli-silent-direct-object",
                    target: "māma-l-tiā",
                    head: ["source-object-1", "3sg", 1],
                    adjunct: "0|0|vacant|cin|tli|0",
                    order: ["adjunctor", "adjunct-nnc", "principal-vnc"],
                },
                {
                    id: "lesson25.16-atolli-silent-direct-object",
                    target: "ī-tiā",
                    head: ["source-object-1", "3sg", 1],
                    adjunct: "0|0|vacant|ātōl|li|0",
                    order: ["principal-vnc", "adjunctor", "adjunct-nnc"],
                },
                {
                    id: "lesson25.16-tinocniuh-silent-causative-object",
                    target: "caqui-ti-l-tiā",
                    head: ["causative-object", "2sg", 2],
                    adjunct: "ti|0|dyadic|n|o|cn-īuh|0|0",
                    order: ["principal-vnc", "adjunctor", "adjunct-nnc"],
                },
            ],
        }
    );

    const atolliPrincipal = buildAtolliPrincipal(ctx);
    const atolliAdjunct = buildAtolliAdjunct(ctx);
    const atolli = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(atolliPrincipal, atolliAdjunct, {
        profileId: "lesson25.16-atolli-silent-direct-object",
        principalObjectId: "source-object-1",
        principalReferenceId: "referent:atolli",
        adjunctReferenceId: "referent:atolli",
    });

    s.eq(
        "A canonical silent direct object and canonical Ātōlli NNC produce the typed marked supplement",
        {
            principalCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(atolliPrincipal),
            adjunctStatus: atolliAdjunct.authorizationStatus,
            status: atolli.authorizationStatus,
            canonical: ctx.isClassicalNahuatlLesson2516SupplementationFrame(atolli),
            binding: [
                atolli.principalObjectBindingFrame?.objectId,
                atolli.principalObjectBindingFrame?.objectPerson,
                atolli.principalObjectBindingFrame?.sounded,
                atolli.principalObjectBindingFrame?.carrier,
            ],
            unification: atolli.referenceUnificationFrame && {
                person: atolli.referenceUnificationFrame.person,
                number: atolli.referenceUnificationFrame.number,
                reference: atolli.referenceUnificationFrame.referenceUnified,
            },
            tokens: atolli.linearizationFrame?.tokens.map(token => [token.role, token.form]),
            surface: atolli.surfaceRealization,
            authority: [atolli.grammarGenerationAllowed, atolli.surfaceGenerationAllowed, atolli.surfaceArtifactAuthority, atolli.surfaceStringAuthority],
        },
        {
            principalCanonical: true,
            adjunctStatus: "authorized",
            status: "authorized",
            canonical: true,
            binding: ["source-object-1", "3sg", false, "0-0"],
            unification: { person: "3", number: "singular", reference: true },
            tokens: [["principal", "tēchītizqueh"], ["adjunctor", "in"], ["supplementary-object", "ātōlli"]],
            surface: "Tēchītizqueh in ātōlli.",
            authority: [true, true, true, false],
        }
    );

    const tinocniuhPrincipal = buildTinocniuhPrincipal(ctx);
    const tinocniuhAdjunct = buildTinocniuhAdjunct(ctx);
    const tinocniuh = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(tinocniuhPrincipal, tinocniuhAdjunct, {
        profileId: "lesson25.16-tinocniuh-silent-causative-object",
        principalObjectId: "causative-object",
        principalReferenceId: "referent:friend",
        adjunctReferenceId: "referent:friend",
    });

    s.eq(
        "Recursive causative composition binds the silent second-person causal object to Tinocnīuh",
        {
            principalCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(tinocniuhPrincipal),
            principalTarget: tinocniuhPrincipal.targetStem,
            adjunctFormula: tinocniuhAdjunct.formulaRealization,
            adjunctSemanticIdentity: tinocniuhAdjunct.nncSlotFrame.semanticIdentity,
            status: tinocniuh.authorizationStatus,
            canonical: ctx.isClassicalNahuatlLesson2516SupplementationFrame(tinocniuh),
            binding: [
                tinocniuh.principalObjectBindingFrame?.objectId,
                tinocniuh.principalObjectBindingFrame?.governor,
                tinocniuh.principalObjectBindingFrame?.derivationalLevel,
                tinocniuh.principalObjectBindingFrame?.sounded,
            ],
            surface: tinocniuh.surfaceRealization,
        },
        {
            principalCanonical: true,
            principalTarget: "caqui-ti-l-tiā",
            adjunctFormula: "#ti-0+n-o(cn-īuh)0-0#",
            adjunctSemanticIdentity: "ti|0|dyadic|n|o|cn-īuh|0|0",
            status: "authorized",
            canonical: true,
            binding: ["causative-object", "causative", 2, false],
            surface: "Nēchcaquitīltihqueh in tinocnīuh.",
        }
    );

    s.eq(
        "Person, number, and reference identity are independently fail-closed",
        (() => {
            const wrongPerson = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(atolliPrincipal, buildAtolliAdjunct(ctx, "2sg"), {
                profileId: "lesson25.16-atolli-silent-direct-object",
                principalObjectId: "source-object-1",
                principalReferenceId: "referent:atolli",
                adjunctReferenceId: "referent:atolli",
            });
            const wrongNumber = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(tinocniuhPrincipal, buildTinocniuhAdjunct(ctx, "2pl"), {
                profileId: "lesson25.16-tinocniuh-silent-causative-object",
                principalObjectId: "causative-object",
                principalReferenceId: "referent:friend",
                adjunctReferenceId: "referent:friend",
            });
            const wrongReference = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(atolliPrincipal, atolliAdjunct, {
                profileId: "lesson25.16-atolli-silent-direct-object",
                principalObjectId: "source-object-1",
                principalReferenceId: "referent:atolli",
                adjunctReferenceId: "referent:water",
            });
            return [wrongPerson, wrongNumber, wrongReference].map(frame => ({
                status: frame.authorizationStatus,
                reason: frame.blockReason,
                surface: frame.surfaceRealization,
                authority: [frame.grammarGenerationAllowed, frame.surfaceGenerationAllowed, frame.surfaceArtifactAuthority],
            }));
        })(),
        [
            { status: "blocked", reason: "classical-lesson25.16-person-unification-failed", surface: "", authority: [false, false, false] },
            { status: "blocked", reason: "classical-lesson25.16-number-unification-failed", surface: "", authority: [false, false, false] },
            { status: "blocked", reason: "classical-lesson25.16-reference-identity-mismatch", surface: "", authority: [false, false, false] },
        ]
    );

    s.eq(
        "Strings and forged constituents cannot authorize the final sentence",
        (() => {
            const forgedPrincipal = jsonClone(atolliPrincipal);
            forgedPrincipal.targetStem = "caller-forged-tiā";
            const forgedAdjunct = jsonClone(atolliAdjunct);
            forgedAdjunct.formulaRealization = "#caller-forged#";
            const fromForgedPrincipal = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(forgedPrincipal, atolliAdjunct, {
                profileId: "lesson25.16-atolli-silent-direct-object",
                principalObjectId: "source-object-1",
                principalReferenceId: "referent:atolli",
                adjunctReferenceId: "referent:atolli",
            });
            const fromForgedAdjunct = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(atolliPrincipal, forgedAdjunct, {
                profileId: "lesson25.16-atolli-silent-direct-object",
                principalObjectId: "source-object-1",
                principalReferenceId: "referent:atolli",
                adjunctReferenceId: "referent:atolli",
            });
            const forgedFinalSurface = { ...atolli, surfaceRealization: "Caller supplied sentence." };
            return {
                forgedPrincipal: [fromForgedPrincipal.authorizationStatus, fromForgedPrincipal.blockReason],
                forgedAdjunct: [fromForgedAdjunct.authorizationStatus, fromForgedAdjunct.blockReason],
                originalCanonical: ctx.isClassicalNahuatlLesson2516SupplementationFrame(atolli),
                forgedFinalCanonical: ctx.isClassicalNahuatlLesson2516SupplementationFrame(forgedFinalSurface),
                callerSurfaceAccepted: atolli.callerSuppliedSurfaceAccepted,
            };
        })(),
        {
            forgedPrincipal: ["blocked", "classical-lesson25.16-canonical-derived-vnc-principal-required"],
            forgedAdjunct: ["blocked", "classical-lesson25.16-canonical-profile-nnc-adjunct-required"],
            originalCanonical: true,
            forgedFinalCanonical: false,
            callerSurfaceAccepted: false,
        }
    );

    s.eq(
        "A typed distinct-referent choice authorizes the equal-category Cintli causative and its silent direct-object supplement",
        (() => {
            const principal = buildCintliPrincipal(ctx);
            const sentence = ctx.buildClassicalNahuatlLesson2516SupplementationFrame(principal, ctx.buildClassicalNahuatlLesson12AbsolutiveNncFrame("cin", {
                subject: "3sg",
                nounClass: "tli",
                animacy: "nonanimate",
            }), {
                profileId: "lesson25.16-cintli-silent-direct-object",
                principalObjectId: "source-object-1",
                principalReferenceId: "referent:maize",
                adjunctReferenceId: "referent:maize",
            });
            return {
                principalCanonical: ctx.isClassicalNahuatlDerivedVncMachineryFrame(principal),
                principalTarget: principal.targetStem,
                relation: principal.derivationOperationFrame?.participantTransformFrame?.causativeReferentRelation,
                principalStatus: principal.authorizationStatus,
                sentenceStatus: sentence.authorizationStatus,
                sentenceReason: sentence.blockReason,
                sentenceCanonical: ctx.isClassicalNahuatlLesson2516SupplementationFrame(sentence),
                binding: sentence.principalObjectBindingFrame && [
                    sentence.principalObjectBindingFrame.objectId,
                    sentence.principalObjectBindingFrame.objectPerson,
                    sentence.principalObjectBindingFrame.sounded,
                    sentence.principalObjectBindingFrame.carrier,
                ],
                surface: sentence.surfaceRealization,
                sentenceSurfaceAuthority: sentence.surfaceArtifactAuthority,
            };
        })(),
        {
            principalCanonical: true,
            principalTarget: "māma-l-tiā",
            relation: "distinct",
            principalStatus: "authorized",
            sentenceStatus: "authorized",
            sentenceReason: "",
            sentenceCanonical: true,
            binding: ["source-object-1", "3sg", false, "0-0"],
            surface: "In cintli quimmāmāltiah.",
            sentenceSurfaceAuthority: true,
        }
    );

    s.eq(
        "The Lesson 25 finalizer consumes but does not mutate Lessons 17-19 metadata-only contracts",
        {
            legacyGeneration: [
                ctx.buildSentenceLesson17PursuitFrame().generationAllowed,
                ctx.buildSentenceLesson18PursuitFrame().generationAllowed,
                ctx.buildSentenceLesson19PursuitFrame().generationAllowed,
            ],
            consumedGeneration: [
                atolli.lowerLayerFrame.lesson17SupplementationFrame.generationAllowed,
                atolli.lowerLayerFrame.lesson17SharedReferentFrame.generationAllowed,
                atolli.lowerLayerFrame.lesson18MarkedSupplementationFrame.generationAllowed,
                atolli.lowerLayerFrame.lesson18SilentSpecificObjectFrame.generationAllowed,
                atolli.lowerLayerFrame.lesson19IncludedReferentContrastFrame.generationAllowed,
            ],
            referenceMode: atolli.lowerLayerFrame.selectedReferenceMode,
            finalizerGeneration: atolli.grammarGenerationAllowed,
        },
        {
            legacyGeneration: [false, false, false],
            consumedGeneration: [false, false, false, false, false],
            referenceMode: "shared-referent-not-included-referent",
            finalizerGeneration: true,
        }
    );

    return s;
}

module.exports = { run };
