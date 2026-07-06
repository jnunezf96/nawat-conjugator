"use strict";

/**
 * Tests for src/core/particles/particles.js
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("particles");

    s.eq(
        "Lesson 3 particle API is exported",
        [
            typeof ctx.getParticlePlacementFrames,
            typeof ctx.getParticleFunctionClassFrames,
            typeof ctx.buildParticlePlacementMetadata,
            typeof ctx.classifyParticleCandidate,
            typeof ctx.buildParticleInventoryBoundaryMetadata,
            typeof ctx.buildParticleModeDisplayModel,
            typeof ctx.getAndrewsLesson3ParticleAsNawat,
            typeof ctx.getParticleSeedInventoryEntries,
            typeof ctx.getParticleLesson3InventoryGroups,
            typeof ctx.findParticleSeedInventoryEntries,
        ],
        ["function", "function", "function", "function", "function", "function", "function", "function", "function", "function"]
    );

    s.eq(
        "particle placement frames are structural metadata only",
        ctx.getParticlePlacementFrames().map((frame) => ({
            id: frame.id,
            scope: frame.scope,
            hostLayer: frame.hostLayer,
            beforePredicate: frame.beforePredicate,
            afterPredicate: frame.afterPredicate,
        })),
        [
            { id: "clause-initial", scope: "clause-initial", hostLayer: "sentence", beforePredicate: true, afterPredicate: false },
            { id: "second-position", scope: "second-position", hostLayer: "sentence", beforePredicate: null, afterPredicate: null },
            { id: "pre-predicate", scope: "pre-predicate", hostLayer: "nuclear-clause", beforePredicate: true, afterPredicate: false },
            { id: "post-predicate", scope: "post-predicate", hostLayer: "nuclear-clause", beforePredicate: false, afterPredicate: true },
            { id: "enclitic", scope: "enclitic", hostLayer: "word-output", beforePredicate: false, afterPredicate: true },
            { id: "bound-to-following", scope: "bound-to-following", hostLayer: "particle-or-nuclear-clause", beforePredicate: true, afterPredicate: false },
            { id: "bound-to-previous", scope: "bound-to-previous", hostLayer: "nominal-nuclear-clause", beforePredicate: false, afterPredicate: true },
            { id: "collocation-sequence", scope: "collocation-sequence", hostLayer: "particle-sequence", beforePredicate: null, afterPredicate: null },
            { id: "independent-utterance", scope: "independent-utterance", hostLayer: "utterance", beforePredicate: null, afterPredicate: null },
            { id: "floating", scope: "floating", hostLayer: "sentence-or-utterance", beforePredicate: null, afterPredicate: null },
        ]
    );

    s.eq(
        "particle function classes follow Andrews Lesson 3 categories",
        ctx.getParticleFunctionClassFrames().map((frame) => ({
            id: frame.id,
            scope: frame.scope,
            hostLayer: frame.hostLayer,
            canServeAsPrincipalClause: frame.canServeAsPrincipalClause,
        })),
        [
            { id: "clause-introducer", scope: "clause-introducer", hostLayer: "sentence", canServeAsPrincipalClause: false },
            { id: "adjunctor", scope: "adjunctor", hostLayer: "adjoined-clause", canServeAsPrincipalClause: false },
            { id: "conjunctor", scope: "conjunctor", hostLayer: "clause-or-sentence", canServeAsPrincipalClause: false },
            { id: "adverbial-modifier", scope: "adverbial-modifier", hostLayer: "sentence", canServeAsPrincipalClause: false },
            { id: "interjection", scope: "interjection", hostLayer: "utterance", canServeAsPrincipalClause: true },
            { id: "negation", scope: "negation", hostLayer: "particle-or-clause", canServeAsPrincipalClause: false },
            { id: "collocation", scope: "collocation", hostLayer: "particle-sequence", canServeAsPrincipalClause: false },
            { id: "honorificized", scope: "honorificized", hostLayer: "particle-or-collocation", canServeAsPrincipalClause: false },
        ]
    );

    const candidateClassification = ctx.classifyParticleCandidate("amo", {
        placementScope: "pre-predicate",
        functionScope: "negation",
    });
    s.eq(
        "particle candidate classification does not turn labels into evidence",
        {
            kind: candidateClassification.kind,
            version: candidateClassification.version,
            candidate: candidateClassification.candidate,
            matched: candidateClassification.matched,
            status: candidateClassification.status,
            placement: candidateClassification.placement,
            functionScope: candidateClassification.functionScope,
            functionClass: candidateClassification.functionClass,
            generationAllowed: candidateClassification.generationAllowed,
            diagnostics: candidateClassification.diagnostics,
            placementMetadata: candidateClassification.placementMetadata,
        },
        {
            kind: "particle-candidate-classification",
            version: 1,
            candidate: "amo",
            matched: false,
            status: "unconfirmed",
            placement: {
                id: "pre-predicate",
                label: "antes del predicado",
                scope: "pre-predicate",
                hostLayer: "nuclear-clause",
                beforePredicate: true,
                afterPredicate: false,
            },
            functionScope: "negation",
            functionClass: {
                id: "negation",
                label: "partícula negativizante",
                scope: "negation",
                hostLayer: "particle-or-clause",
                canServeAsPrincipalClause: false,
            },
            generationAllowed: false,
            diagnostics: ["particle-candidate-unconfirmed"],
            placementMetadata: ctx.buildParticlePlacementMetadata({
                candidate: "amo",
                placementScope: "pre-predicate",
                functionScope: "negation",
                source: "candidate",
            }),
        }
    );

    const boundary = ctx.buildParticleInventoryBoundaryMetadata();
    s.eq(
        "particle inventory boundary records current placeholder status",
        {
            kind: boundary.kind,
            lesson: boundary.lesson,
            status: boundary.status,
            confirmedParticles: boundary.confirmedParticles,
            hasAndrewsDerivedSeedInventory: boundary.boundaries.hasAndrewsDerivedSeedInventory,
            hasSeedPreview: boundary.andrewsDerivedParticlePreview.length > 0,
            generationAllowed: boundary.generationAllowed,
            boundaries: boundary.boundaries,
            functionClassCount: boundary.functionClassFrames.length,
        },
        {
            kind: "particle-inventory-boundary",
            lesson: 3,
            status: "partial",
            confirmedParticles: [],
            hasAndrewsDerivedSeedInventory: true,
            hasSeedPreview: true,
            generationAllowed: false,
            boundaries: {
                hasStaticParticleInventory: false,
                hasAndrewsDerivedSeedInventory: true,
                hasParticleGeneration: false,
                hasPlacementEngine: false,
                hasVisibleParticleMode: false,
                existingParticleModeIsPlaceholder: true,
            },
            functionClassCount: 8,
        }
    );

    s.eq(
        "particle metadata carries anti-conflation rules",
        ctx.getParticleAntiConflationRules(),
        [
            "particle placement metadata is not particle generation",
            "particle-looking string is not an Andrews-licensed particle source",
            "particle mode label is not a particle inventory",
            "preposed output segment is not a Lesson 3 particle engine",
            "topic/focus label is not supplementation",
            "Andrews particle categories are architecture, not Nawat/Pipil orthography authority",
            "particle categories do not occupy CNV/CNN formula slots",
        ]
    );
    s.no("particle boundary does not expose surface forms", Object.prototype.hasOwnProperty.call(boundary, "surfaceForms"));
    s.no("particle boundary does not expose generated forms", Object.prototype.hasOwnProperty.call(boundary, "generatedForms"));
    s.eq(
        "Andrews Lesson 3 seed inventory adapts only licensed Classical spellings to Nawat orthography",
        {
            tla: ctx.getAndrewsLesson3ParticleAsNawat("tla"),
            mah: ctx.getAndrewsLesson3ParticleAsNawat("mah"),
            maZo: ctx.getAndrewsLesson3ParticleAsNawat("ma zo"),
            auh: ctx.getAndrewsLesson3ParticleAsNawat("auh"),
            ahzo: ctx.getAndrewsLesson3ParticleAsNawat("ahzo"),
            ahtel: ctx.getAndrewsLesson3ParticleAsNawat("ahtel?"),
            ahzoAh: ctx.getAndrewsLesson3ParticleAsNawat("ahzo ah#"),
            ahzaZoOc: ctx.getAndrewsLesson3ParticleAsNawat("ahza zo oc"),
            zaZan: ctx.getAndrewsLesson3ParticleAsNawat("za zan"),
            zanYeNo: ctx.getAndrewsLesson3ParticleAsNawat("zan ye no"),
            auhInTlaCa: ctx.getAndrewsLesson3ParticleAsNawat("auh in tla ca#"),
            ihyoMa: ctx.getAndrewsLesson3ParticleAsNawat("ihyo ma ... !"),
            ihyoIyahua: ctx.getAndrewsLesson3ParticleAsNawat("ihyo iyahua!"),
            ihI: ctx.getAndrewsLesson3ParticleAsNawat("ih i"),
            ahcaZoAh: ctx.getAndrewsLesson3ParticleAsNawat("ahca zo ah#"),
            ahzoCaAh: ctx.getAndrewsLesson3ParticleAsNawat("ahzo ca ah#"),
            cuix: ctx.getAndrewsLesson3ParticleAsNawat("cuix?"),
            firstSeeds: ctx.getParticleSeedInventoryEntries({ limit: 3 }).map((entry) => ({
                sourceForm: entry.sourceForm,
                nawatForm: entry.nawatForm,
                generationAllowed: entry.generationAllowed,
                evidenceStatus: entry.evidenceStatus,
            })),
            maSuMatch: ctx.findParticleSeedInventoryEntries("ma su").map((entry) => ({
                sourceForm: entry.sourceForm,
                nawatForm: entry.nawatForm,
                functionScope: entry.functionScope,
            }))[0],
        },
        {
            tla: "ta",
            mah: "maj",
            maZo: "ma su",
            auh: "aw",
            ahzo: "ajsu",
            ahtel: "ajtel?",
            ahzoAh: "ajsu aj#",
            ahzaZoOc: "ajsa su uk",
            zaZan: "sa san",
            zanYeNo: "san ye nu",
            auhInTlaCa: "aw in ta ka#",
            ihyoMa: "ijyu ma ... !",
            ihyoIyahua: "ijyu iyawa!",
            ihI: "ij i",
            ahcaZoAh: "ajka su aj#",
            ahzoCaAh: "ajsu ka aj#",
            cuix: "kwish?",
            firstSeeds: [
                { sourceForm: "ca", nawatForm: "ka", generationAllowed: false, evidenceStatus: "andrews-orthography-adapted" },
                { sourceForm: "cuix?", nawatForm: "kwish?", generationAllowed: false, evidenceStatus: "andrews-orthography-adapted" },
                { sourceForm: "tla", nawatForm: "ta", generationAllowed: false, evidenceStatus: "andrews-orthography-adapted" },
            ],
            maSuMatch: {
                sourceForm: "ma zo",
                nawatForm: "ma su",
                functionScope: "collocation",
            },
        }
    );
    s.eq(
        "Andrews Lesson 3 seed inventory is grouped by visible lesson sections",
        ctx.getParticleLesson3InventoryGroups().map((group) => ({
            id: group.id,
            label: group.label,
            sectionPrefix: group.sectionPrefix,
            entryCount: group.entryCount,
            first: group.entries[0] && {
                sourceForm: group.entries[0].sourceForm,
                nawatForm: group.entries[0].nawatForm,
            },
        })),
        [
            {
                id: "lesson3-functional-classes",
                label: "3.2 Clases funcionales",
                sectionPrefix: "3.2",
                entryCount: 43,
                first: { sourceForm: "ca", nawatForm: "ka" },
            },
            {
                id: "lesson3-negation",
                label: "3.3 Negación",
                sectionPrefix: "3.3",
                entryCount: 14,
                first: { sourceForm: "ah#", nawatForm: "aj#" },
            },
            {
                id: "lesson3-collocations",
                label: "3.4 Colocaciones",
                sectionPrefix: "3.4",
                entryCount: 34,
                first: { sourceForm: "in tla", nawatForm: "in ta" },
            },
            {
                id: "lesson3-honorificized",
                label: "3.5 Honorificadas",
                sectionPrefix: "3.5",
                entryCount: 3,
                first: { sourceForm: "otzin", nawatForm: "utzin" },
            },
        ]
    );
    const particleCandidate = ctx.classifyParticleCandidate("amo", {
        placementScope: "pre-predicate",
        functionScope: "negation",
    });
    const particleFrame = particleCandidate.grammarFrame;
    s.eq(
        "particle metadata exposes non-enumerable LCM frames",
        {
            hasFrame: Boolean(particleFrame),
            routeFamily: particleFrame?.routeContract?.routeFamily || "",
            routeStage: particleFrame?.routeContract?.routeStage || "",
            generationAllowed: particleFrame?.routeContract?.generationAllowed,
            hostLayer: particleFrame?.nuclearClauseFrame?.hostLayer || "",
            andrewsRef: particleFrame?.authorityFrame?.andrewsRefs?.[0] || "",
            enumerableGrammarFrame: Object.prototype.propertyIsEnumerable.call(particleCandidate, "grammarFrame"),
        },
        {
            hasFrame: true,
            routeFamily: "particle-placement",
            routeStage: "classify-candidate",
            generationAllowed: false,
            hostLayer: "nuclear-clause",
            andrewsRef: "Andrews Lesson 3",
            enumerableGrammarFrame: false,
        }
    );

    const modeModel = ctx.buildParticleModeDisplayModel({ candidate: "ma zo" });
    s.eq(
        "particle mode display model treats collocations as diagnostics, not generation",
        {
            kind: modeModel.kind,
            candidate: modeModel.candidate,
            isCollocation: modeModel.candidateProfile.isCollocation,
            placementScope: modeModel.classification.placement.scope,
            functionScope: modeModel.classification.functionScope,
            status: modeModel.classification.status,
            candidateDisplay: modeModel.candidateDisplay,
            generationAllowed: modeModel.generationAllowed,
            unitNuclearClauseKind: modeModel.unitProfile.nuclearClauseKind,
            hasSurfaceForms: Object.prototype.hasOwnProperty.call(modeModel, "surfaceForms"),
            previewCount: modeModel.inventoryPreviewEntries.length,
            completedPdfExamples: [
                "ahza zo oc",
                "za zan",
                "zan ye no",
                "auh in tla ca#",
                "ihyo ma ... !",
                "ihyo iyahua!",
                "elele ay ay ay",
                "ih i",
                "yeya",
                "ahca zo ah#",
                "ahzo ca ah#",
            ].map((sourceForm) => {
                const entry = modeModel.inventoryGroups
                    .flatMap((group) => group.entries)
                    .find((candidate) => candidate.sourceForm === sourceForm);
                return entry && {
                    sourceForm: entry.sourceForm,
                    nawatForm: entry.nawatForm,
                    gloss: entry.gloss,
                    generationAllowed: entry.generationAllowed,
                };
            }),
            groupSummary: modeModel.inventoryGroups.map((group) => ({
                label: group.label,
                count: group.entries.length,
            })),
            firstPreview: modeModel.inventoryPreviewEntries[0] && {
                sourceForm: modeModel.inventoryPreviewEntries[0].sourceForm,
                nawatForm: modeModel.inventoryPreviewEntries[0].nawatForm,
                routeStage: modeModel.inventoryPreviewEntries[0].grammarFrame?.routeContract?.routeStage || "",
                sourceInput: modeModel.inventoryPreviewEntries[0].grammarFrame?.resultFrame?.sourceInput || "",
            },
            routeFamily: modeModel.grammarFrame?.routeContract?.routeFamily || "",
            routeStage: modeModel.grammarFrame?.routeContract?.routeStage || "",
        },
        {
            kind: "particle-mode-display-model",
            candidate: "ma zo",
            isCollocation: true,
            placementScope: "collocation-sequence",
            functionScope: "collocation",
            status: "andrews-derived",
            candidateDisplay: "ma su",
            generationAllowed: false,
            unitNuclearClauseKind: "not-vnc-or-nnc",
            hasSurfaceForms: false,
            previewCount: 34,
            completedPdfExamples: [
                { sourceForm: "ahza zo oc", nawatForm: "ajsa su uk", gloss: "quizá todavía; quizá otro", generationAllowed: false },
                { sourceForm: "za zan", nawatForm: "sa san", gloss: "de cualquier modo; tontamente; sin sentido", generationAllowed: false },
                { sourceForm: "zan ye no", nawatForm: "san ye nu", gloss: "asimismo", generationAllowed: false },
                { sourceForm: "auh in tla ca#", nawatForm: "aw in ta ka#", gloss: "y si no", generationAllowed: false },
                { sourceForm: "ihyo ma ... !", nawatForm: "ijyu ma ... !", gloss: "¡ojalá!", generationAllowed: false },
                { sourceForm: "ihyo iyahua!", nawatForm: "ijyu iyawa!", gloss: "¡ay de mí!; ¡qué desgracia!", generationAllowed: false },
                { sourceForm: "elele ay ay ay", nawatForm: "elele ay ay ay", gloss: "ay", generationAllowed: false },
                { sourceForm: "ih i", nawatForm: "ij i", gloss: "ajá; te atrapé", generationAllowed: false },
                { sourceForm: "yeya", nawatForm: "yeya", gloss: "ajá; te atrapé", generationAllowed: false },
                { sourceForm: "ahca zo ah#", nawatForm: "ajka su aj#", gloss: "quizá no; tal vez no", generationAllowed: false },
                { sourceForm: "ahzo ca ah#", nawatForm: "ajsu ka aj#", gloss: "quizá no; tal vez no", generationAllowed: false },
            ],
            groupSummary: [
                { label: "3.2 Clases funcionales", count: 43 },
                { label: "3.3 Negación", count: 14 },
                { label: "3.4 Colocaciones", count: 34 },
                { label: "3.5 Honorificadas", count: 3 },
            ],
            firstPreview: {
                sourceForm: "ma zo",
                nawatForm: "ma su",
                routeStage: "inventory-preview",
                sourceInput: "ma zo",
            },
            routeFamily: "particle-placement",
            routeStage: "render-mode",
        }
    );

    const stemSyntaxModel = ctx.buildParticleModeDisplayModel({ candidate: "(nemi)" });
    s.eq(
        "particle mode rejects parenthesized stem syntax instead of treating it as an unknown particle",
        {
            candidate: stemSyntaxModel.candidate,
            isStemSyntax: stemSyntaxModel.candidateProfile.isStemSyntax,
            syntaxClass: stemSyntaxModel.candidateProfile.syntaxClass,
            status: stemSyntaxModel.classification.status,
            outOfScopeReason: stemSyntaxModel.classification.outOfScopeReason,
            placementScope: stemSyntaxModel.classification.placement.scope,
            functionScope: stemSyntaxModel.classification.functionScope,
            unitLexicalClass: stemSyntaxModel.unitProfile.lexicalClass,
            unitNuclearClauseKind: stemSyntaxModel.unitProfile.nuclearClauseKind,
            unitRow: stemSyntaxModel.rows.find((row) => row.id === "unit")?.value || "",
            placementRow: stemSyntaxModel.rows.find((row) => row.id === "placement")?.value || "",
            functionRow: stemSyntaxModel.rows.find((row) => row.id === "function")?.value || "",
            diagnostics: stemSyntaxModel.classification.diagnostics,
            evidenceStatus: stemSyntaxModel.grammarFrame?.authorityFrame?.evidenceStatus || "",
            rejectedByParticleMode: stemSyntaxModel.grammarFrame?.nuclearClauseFrame?.rejectedByParticleMode,
            resultSurface: stemSyntaxModel.grammarFrame?.resultFrame?.surface || "",
        },
        {
            candidate: "(nemi)",
            isStemSyntax: true,
            syntaxClass: "stem-or-nuclear-clause-syntax",
            status: "out-of-scope",
            outOfScopeReason: "stem-or-nuclear-clause-syntax",
            placementScope: "unknown",
            functionScope: "unknown",
            unitLexicalClass: "not-particle",
            unitNuclearClauseKind: "stem-or-nuclear-clause-syntax",
            unitRow: "no partícula",
            placementRow: "fuera de Partícula",
            functionRow: "no partícula",
            diagnostics: [
                "particle-candidate-stem-syntax",
                "particle-mode-not-vnc-or-nnc",
                "particle-generation-disabled",
            ],
            evidenceStatus: "not-particle-syntax",
            rejectedByParticleMode: true,
            resultSurface: "",
        }
    );

    const singleParticleModel = ctx.buildParticleModeDisplayModel({ candidate: "zo" });
    s.eq(
        "particle mode display model explains one-token unbound candidates without lexical confirmation",
        {
            candidate: singleParticleModel.candidate,
            isCollocation: singleParticleModel.candidateProfile.isCollocation,
            placementScope: singleParticleModel.classification.placement.scope,
            placementLabel: singleParticleModel.classification.placement.label,
            functionScope: singleParticleModel.classification.functionScope,
            status: singleParticleModel.classification.status,
            candidateDisplay: singleParticleModel.candidateDisplay,
            generationAllowed: singleParticleModel.generationAllowed,
            candidateDetail: singleParticleModel.rows.find((row) => row.id === "candidate")?.detail || "",
        },
        {
            candidate: "zo",
            isCollocation: false,
            placementScope: "floating",
            placementLabel: "posición libre o no especificada",
            functionScope: "adverbial-modifier",
            status: "andrews-derived",
            candidateDisplay: "su",
            generationAllowed: false,
            candidateDetail: "Andrews 3.2.4; fuente zo; ortografía adaptada",
        }
    );

    return s;
}

module.exports = { run };
